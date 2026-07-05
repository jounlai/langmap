/* poster_render.js — browser-only SVG poster renderer. */
(function () {
  'use strict';
  const SVGNS = 'http://www.w3.org/2000/svg';
  const PALETTE = ['#c7dcc1', '#e6d3a3', '#cdd7e8', '#e8c9c2', '#d8cfe0', '#cfe3e0'];
  // Single font stack for the whole poster (labels + measurement must match).
  // Noto Sans across every script the labels use; falls back to sans-serif.
  const FONT = "'Noto Sans','Noto Sans JP','Noto Sans KR','Noto Sans SC'," +
    "'Noto Sans Arabic','Noto Sans Hebrew','Noto Sans Devanagari','Noto Sans Bengali'," +
    "'Noto Sans Thai','Noto Sans Lao','Noto Sans Khmer','Noto Sans Myanmar'," +
    "'Noto Sans Georgian','Noto Sans Armenian','Noto Sans Ethiopic','Noto Sans Sinhala'," +
    "'Noto Serif Tibetan',sans-serif";

  // Measure text width at font-size 1px using a shared offscreen canvas.
  const _ctx = document.createElement('canvas').getContext('2d');
  function measureAt1px(text, fontFamily) {
    _ctx.font = '1px ' + (fontFamily || FONT);
    return _ctx.measureText(text).width;
  }
  const MAX_FONT = 28;

  // Largest-area projected outer ring for a feature → points + rings for polylabel.
  function largestProjectedRing(geom, width, G) {
    let best = null, bestArea = -1;
    for (const poly of polygonsOf(geom)) {
      const a = ringArea(poly[0]);
      if (a > bestArea) { bestArea = a; best = poly[0]; }
    }
    if (!best) return null;
    const pts = best.map(c => {
      const p = G.projectNaturalEarth(c[0], c[1], { width });
      return [p.x, p.y];
    });
    return pts;
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
  // Normalize Polygon/MultiPolygon → array of rings-groups: [ [outer, ...holes], ... ]
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

  function render(geojson, opts) {
    const width = (opts && opts.width) || 1600;
    const G = window.PosterGeo;
    const root = document.getElementById('poster-root');
    root.innerHTML = '';

    // Keep only features we can key and that have geometry.
    const feats = geojson.features
      .map(f => ({ iso: isoOf(f), geom: f.geometry }))
      .filter(f => f.iso && f.geom);

    // Adjacency uses raw lng/lat outer rings.
    const adjInput = feats.map(f => ({
      key: f.iso,
      rings: polygonsOf(f.geom).map(poly => poly[0]),
    }));
    const adj = G.buildAdjacency(adjInput, 0.1);
    const colorIdx = G.greedyColor(adj);

    const height = G.projectNaturalEarth(0, 0, { width }).height;
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${Math.round(height)}`);
    svg.setAttribute('xmlns', SVGNS);
    const bg = document.createElementNS(SVGNS, 'rect');
    bg.setAttribute('x', 0); bg.setAttribute('y', 0);
    bg.setAttribute('width', width); bg.setAttribute('height', Math.round(height));
    bg.setAttribute('fill', '#eef3f6');
    svg.appendChild(bg);

    for (const f of feats) {
      const ci = (colorIdx.get(f.iso) || 0) % PALETTE.length;
      let d = '';
      for (const poly of polygonsOf(f.geom)) {
        for (const ring of poly) {
          for (let i = 0; i < ring.length; i++) {
            const pt = G.projectNaturalEarth(ring[i][0], ring[i][1], { width });
            d += (i === 0 ? 'M' : 'L') + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1);
          }
          d += 'Z';
        }
      }
      if (!d) continue;
      const path = document.createElementNS(SVGNS, 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', PALETTE[ci]);
      path.setAttribute('fill-rule', 'evenodd');
      path.setAttribute('stroke', '#8a8f96');
      path.setAttribute('stroke-width', '0.6');
      svg.appendChild(path);
    }

    const words = (window.POSTER_WORDS || {})[(opts && opts.word) || 'water'] || {};
    const langs = window.POSTER_LANGS || {};
    for (const f of feats) {
      const entry = words[f.iso];
      if (!entry || !langs[f.iso]) continue;
      const pts = largestProjectedRing(f.geom, width, G);
      if (!pts || pts.length < 3) continue;
      const pl = G.polylabel([pts], 1.0);
      const ob = G.orientedBox(pts);
      if (pl.distance <= 0) continue;

      const hasRoman = typeof entry.roman === 'string' && entry.roman.length > 0;
      const lineCount = hasRoman ? 1.55 : 1; // roman line is 0.55× tall
      const wNative = measureAt1px(entry.native);
      const wRoman = hasRoman ? 0.55 * measureAt1px(entry.roman) : 0;
      const w1 = Math.max(wNative, wRoman) || 1e-6; // widest line at font-size 1
      const hFactor = lineCount * 1.2;              // text-block height at font-size 1
      const PAD = 1.06;                             // safety gap kept clear of the border

      // Largest font whose (rotated) text rectangle is PROVABLY inside the
      // polygon — binary-searched against an exact containment test, so the
      // label is as large as possible yet can never overflow the border.
      const maxSizeAt = (cx, cy, ang) => {
        let lo = 0, hi = MAX_FONT;
        for (let it = 0; it < 13; it++) {
          const mid = (lo + hi) / 2;
          const hw = mid * w1 * PAD / 2, hh = mid * hFactor * PAD / 2;
          if (G.rectInPolygon([pts], cx, cy, hw, hh, ang)) lo = mid; else hi = mid;
        }
        return lo;
      };

      // Anchors: area centroid (central) + pole of inaccessibility (roomiest).
      // Find the best UPRIGHT fit and, for elongated countries, the best fit
      // along the major axis. Stay upright unless rotating is clearly bigger,
      // so compact countries are never needlessly tilted.
      const c = ringCentroid(pts);
      const aspect = ob.width / Math.max(ob.height, 1e-6);
      const anchors = [[c[0], c[1]], [pl.x, pl.y]];
      let bestH = null, bestR = null;
      for (const a of anchors) {
        if (G.interiorDistance([pts], a[0], a[1]) <= 0) continue;
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
      const size = best.size, deg = best.deg;

      const g = document.createElementNS(SVGNS, 'g');
      g.setAttribute('transform', `translate(${best.ax.toFixed(1)} ${best.ay.toFixed(1)}) rotate(${deg.toFixed(1)})`);

      const native = document.createElementNS(SVGNS, 'text');
      native.setAttribute('text-anchor', 'middle');
      native.setAttribute('font-family', FONT);
      native.setAttribute('font-size', size.toFixed(1));
      native.setAttribute('fill', '#20242a');
      native.setAttribute('dy', hasRoman ? (-size * 0.10).toFixed(1) : (size * 0.35).toFixed(1));
      native.textContent = entry.native;
      g.appendChild(native);

      if (hasRoman) {
        const roman = document.createElementNS(SVGNS, 'text');
        roman.setAttribute('text-anchor', 'middle');
        roman.setAttribute('font-family', FONT);
        roman.setAttribute('font-size', (size * 0.55).toFixed(1));
        roman.setAttribute('fill', '#555b63');
        roman.setAttribute('dy', (size * 0.56).toFixed(1));
        roman.textContent = entry.roman;
        g.appendChild(roman);
      }
      svg.appendChild(g);
    }

    root.appendChild(svg);
    window.PosterRender._lastSvg = svg;
  }

  window.PosterRender = { render: render, _lastSvg: null };
})();
