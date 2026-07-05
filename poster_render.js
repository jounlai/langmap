/* poster_render.js — browser-only SVG poster renderer. */
(function () {
  'use strict';
  const SVGNS = 'http://www.w3.org/2000/svg';
  const PALETTE = ['#c7dcc1', '#e6d3a3', '#cdd7e8', '#e8c9c2', '#d8cfe0', '#cfe3e0'];
  // Single source of truth for the Noto script families (poster.html reuses this
  // for font preloading, so the two can't drift out of sync). FONT is derived.
  const FAMILIES = ['Noto Sans', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans SC',
    'Noto Sans Arabic', 'Noto Sans Hebrew', 'Noto Sans Devanagari', 'Noto Sans Bengali',
    'Noto Sans Thai', 'Noto Sans Lao', 'Noto Sans Khmer', 'Noto Sans Myanmar',
    'Noto Sans Georgian', 'Noto Sans Armenian', 'Noto Sans Ethiopic', 'Noto Sans Sinhala',
    'Noto Serif Tibetan'];
  const FONT = FAMILIES.map(f => "'" + f + "'").join(',') + ',sans-serif';
  const MAX_FONT = 28;

  // Measure a string at font-size 1 (from a 100px sample for precision): width
  // plus real ascent/descent so the fit rectangle's HEIGHT tracks the actual
  // glyph ink — tall stacked scripts (Thai, Tibetan, Devanagari) get a taller
  // box, not a fixed Latin-sized guess.
  const _ctx = document.createElement('canvas').getContext('2d');
  function measureBox(text) {
    _ctx.font = '100px ' + FONT;
    const m = _ctx.measureText(text);
    const asc = m.actualBoundingBoxAscent, desc = m.actualBoundingBoxDescent;
    const ok = typeof asc === 'number' && typeof desc === 'number' && (asc + desc) > 0;
    return { w: m.width / 100, asc: ok ? asc / 100 : 0.8, desc: ok ? desc / 100 : 0.2 };
  }

  // Normalize Polygon/MultiPolygon → array of polygons, each [outer, ...holes].
  function polygonsOf(geom) {
    if (!geom) return [];
    if (geom.type === 'Polygon') return [geom.coordinates];
    if (geom.type === 'MultiPolygon') return geom.coordinates;
    return [];
  }
  function ringArea(ring) { // shoelace, absolute
    let s = 0;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++)
      s += (ring[j][0] * ring[i][1]) - (ring[i][0] * ring[j][1]);
    return Math.abs(s / 2);
  }
  // Area centroid of a projected ring (the visual "middle" of the landmass).
  function ringCentroid(pts) {
    let a = 0, cx = 0, cy = 0;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const x0 = pts[j][0], y0 = pts[j][1], x1 = pts[i][0], y1 = pts[i][1];
      const f = x0 * y1 - x1 * y0;
      a += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f;
    }
    if (Math.abs(a) < 1e-9) return [pts[0][0], pts[0][1]];
    return [cx / (3 * a), cy / (3 * a)];
  }

  // Natural Earth stamps ISO_A3 as "-99" for a few sovereign states (a known
  // quirk); recover their alpha-3 from the country name so their labels resolve.
  const NAME_TO_ISO = { France: 'FRA', Norway: 'NOR', Kosovo: 'XKX' };
  function isoOf(feature) {
    const p = feature.properties || {};
    const iso = p['ISO3166-1-Alpha-3'];
    if (iso && iso !== '-99') return iso;
    if (p.name && NAME_TO_ISO[p.name]) return NAME_TO_ISO[p.name];
    return p.name || null;
  }

  // Word-independent geometry (projection, adjacency+coloring, per-country label
  // rings/polylabel/box/centroid, fill paths) computed ONCE and cached, so
  // switching words re-runs only the per-word text fit — not the whole pipeline.
  let _prep = null;
  const EXCLUDE = { ATA: 1 }; // Antarctica: uninhabited, no language to show.

  function prepare(geojson, width, G) {
    const raw = geojson.features
      .map(f => ({ iso: isoOf(f), geom: f.geometry }))
      .filter(f => f.iso && f.geom && !EXCLUDE[f.iso]);

    // Adjacency uses ALL rings (outer + holes) in raw lng/lat, so an enclave and
    // the country surrounding it share border vertices and get different colors.
    const adjInput = raw.map(f => {
      const rings = [];
      for (const poly of polygonsOf(f.geom)) for (const ring of poly) rings.push(ring);
      return { key: f.iso, rings: rings };
    });
    const colorIdx = G.greedyColor(G.buildAdjacency(adjInput, 0.1));

    const height = G.projectNaturalEarth(0, 0, { width }).height;
    const feats = raw.map(f => {
      // Project every ring of every polygon ONCE; reuse for fill + labels.
      const polys = polygonsOf(f.geom).map(poly => poly.map(ring => ring.map(c => {
        const p = G.projectNaturalEarth(c[0], c[1], { width });
        return [p.x, p.y];
      })));
      // Fill path over all rings (evenodd punches the holes).
      let d = '';
      for (const rings of polys) for (const ring of rings) {
        for (let i = 0; i < ring.length; i++) d += (i === 0 ? 'M' : 'L') + ring[i][0].toFixed(1) + ' ' + ring[i][1].toFixed(1);
        d += 'Z';
      }
      // Largest polygon by PROJECTED outer-ring area → label geometry. Keep ALL
      // its rings (outer + holes) so polylabel/rectInPolygon avoid enclaves.
      let labelRings = null, ba = -1;
      for (const rings of polys) { const a = ringArea(rings[0]); if (a > ba) { ba = a; labelRings = rings; } }
      let pl = null, ob = null, centroid = null;
      if (labelRings && labelRings[0].length >= 3) {
        pl = G.polylabel(labelRings, 1.0);
        ob = G.orientedBox(labelRings[0]);
        centroid = ringCentroid(labelRings[0]);
      }
      return { iso: f.iso, d: d, ci: (colorIdx.get(f.iso) || 0) % PALETTE.length, labelRings: labelRings, pl: pl, ob: ob, centroid: centroid };
    });
    return { width: width, height: height, geojson: geojson, feats: feats };
  }

  function render(geojson, opts) {
    const width = (opts && opts.width) || 1600;
    const word = (opts && opts.word) || 'water';
    const G = window.PosterGeo;
    if (!_prep || _prep.geojson !== geojson || _prep.width !== width) _prep = prepare(geojson, width, G);
    const P = _prep;

    const root = document.getElementById('poster-root');
    root.innerHTML = '';
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${Math.round(P.height)}`);
    svg.setAttribute('xmlns', SVGNS);
    const bg = document.createElementNS(SVGNS, 'rect');
    bg.setAttribute('x', 0); bg.setAttribute('y', 0);
    bg.setAttribute('width', width); bg.setAttribute('height', Math.round(P.height));
    bg.setAttribute('fill', '#eef3f6');
    svg.appendChild(bg);

    // Country fills (cached paths).
    for (const f of P.feats) {
      if (!f.d) continue;
      const path = document.createElementNS(SVGNS, 'path');
      path.setAttribute('d', f.d);
      path.setAttribute('fill', PALETTE[f.ci]);
      path.setAttribute('fill-rule', 'evenodd');
      path.setAttribute('stroke', '#8a8f96');
      path.setAttribute('stroke-width', '0.6');
      svg.appendChild(path);
    }

    // Labels for the selected word (per-word: measure + fit).
    const words = (window.POSTER_WORDS || {})[word] || {};
    const langs = window.POSTER_LANGS || {};
    for (const f of P.feats) {
      const lang = langs[f.iso];
      if (!lang) continue;
      const entry = words[lang.code]; // word data is keyed by language code
      if (!entry || !f.labelRings || !f.pl || f.pl.distance <= 0) continue;
      const rings = f.labelRings, ob = f.ob, pl = f.pl, c = f.centroid;

      const hasRoman = typeof entry.roman === 'string' && entry.roman.length > 0;
      const nB = measureBox(entry.native);
      const rB = hasRoman ? measureBox(entry.roman) : { w: 0, asc: 0, desc: 0 };
      const w1 = Math.max(nB.w, 0.55 * rB.w) || 1e-6;   // widest line at size 1
      const GAP = 0.15;                                  // gap between the two lines
      // Total block height at size 1; the block is centred on the anchor, so the
      // fit rectangle (half-height H/2) contains the real glyph ink exactly.
      const H = hasRoman
        ? (nB.asc + nB.desc + GAP + 0.55 * (rB.asc + rB.desc))
        : (nB.asc + nB.desc);
      const PAD = 1.06;                                  // safety gap from the border

      // Largest font whose (rotated) text rectangle is PROVABLY inside the
      // polygon (holes included) — binary-searched against the exact containment
      // test, so the label is as large as possible yet never overflows.
      const maxSizeAt = (cx, cy, ang) => {
        let lo = 0, hi = MAX_FONT;
        for (let it = 0; it < 13; it++) {
          const mid = (lo + hi) / 2;
          if (G.rectInPolygon(rings, cx, cy, mid * w1 * PAD / 2, mid * H * PAD / 2, ang)) lo = mid; else hi = mid;
        }
        return lo;
      };

      // Anchors: area centroid (central) + pole of inaccessibility (roomiest).
      // Best upright fit, plus the major-axis fit for elongated countries; stay
      // upright unless rotating is clearly bigger (compact ones never tilt).
      const aspect = ob.width / Math.max(ob.height, 1e-6);
      const anchors = [[c[0], c[1]], [pl.x, pl.y]];
      let bestH = null, bestR = null;
      for (const a of anchors) {
        if (G.interiorDistance(rings, a[0], a[1]) <= 0) continue;
        const sh = maxSizeAt(a[0], a[1], 0);
        if (!bestH || sh > bestH.size) bestH = { size: sh, ax: a[0], ay: a[1], deg: 0 };
        if (aspect >= 1.8) {
          const sr = maxSizeAt(a[0], a[1], ob.angleRad);
          if (!bestR || sr > bestR.size) bestR = { size: sr, ax: a[0], ay: a[1], deg: ob.angleRad * 180 / Math.PI };
        }
      }
      let best = bestH;
      if (bestR && bestR.size > (bestH ? bestH.size * 1.12 : 0)) best = bestR;
      if (!best || best.size < 3) continue; // nothing legible fits → omit (v2: external placement)
      const size = best.size;

      // Place the block centred on the anchor: native baseline at the top slot,
      // romanization (0.55×) below it. Matches the fitted rectangle exactly.
      const dyN = -H / 2 + nB.asc;
      const g = document.createElementNS(SVGNS, 'g');
      g.setAttribute('data-iso', f.iso);
      g.setAttribute('transform', `translate(${best.ax.toFixed(1)} ${best.ay.toFixed(1)}) rotate(${best.deg.toFixed(1)})`);

      const native = document.createElementNS(SVGNS, 'text');
      native.setAttribute('text-anchor', 'middle');
      native.setAttribute('font-family', FONT);
      native.setAttribute('font-size', size.toFixed(1));
      native.setAttribute('fill', '#20242a');
      native.setAttribute('dy', (dyN * size).toFixed(1));
      native.textContent = entry.native;
      g.appendChild(native);

      if (hasRoman) {
        const dyR = dyN + nB.desc + GAP + 0.55 * rB.asc;
        const roman = document.createElementNS(SVGNS, 'text');
        roman.setAttribute('text-anchor', 'middle');
        roman.setAttribute('font-family', FONT);
        roman.setAttribute('font-size', (size * 0.55).toFixed(1));
        roman.setAttribute('fill', '#555b63');
        roman.setAttribute('dy', (dyR * size).toFixed(1));
        roman.textContent = entry.roman;
        g.appendChild(roman);
      }
      svg.appendChild(g);
    }

    root.appendChild(svg);
    window.PosterRender._lastSvg = svg;
  }

  window.PosterRender = { render: render, _lastSvg: null, version: 13, FAMILIES: FAMILIES };
})();
