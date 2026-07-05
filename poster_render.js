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
    "'Noto Sans Georgian','Noto Sans Armenian','Noto Sans Ethiopic','Noto Sans Sinhala',sans-serif";

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

  function isoOf(feature) {
    const p = feature.properties || {};
    const iso = p['ISO3166-1-Alpha-3'];
    if (iso && iso !== '-99') return iso;
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

      const FIT_MARGIN = 0.9;
      const hasRoman = typeof entry.roman === 'string' && entry.roman.length > 0;
      const lineCount = hasRoman ? 1.55 : 1; // roman line is 0.55× tall

      // Largest font that fits a given box, honoring the romanization line width.
      const fitFor = (boxW, boxH) => {
        let s = G.fitFontSize(measureAt1px, entry.native, boxW, boxH, lineCount, MAX_FONT);
        if (hasRoman) s = Math.min(s, boxW / (0.55 * (measureAt1px(entry.roman) || 1e-6)));
        return s;
      };

      // Default: upright text bounded by the inscribed circle (centered on the
      // pole-of-inaccessibility, so the safe half-extent in any direction is the
      // inscribed radius → never overflows the border).
      const insc = pl.distance * 2 * FIT_MARGIN;
      let size = fitFor(insc, insc);
      let deg = 0;

      // Rotate ONLY for a decidedly tall/narrow country whose upright text came
      // out too small — then run the text along the long axis to use the extra
      // length. Compact countries are never tilted.
      const aspect = ob.width / Math.max(ob.height, 1e-6);
      const MIN_UPRIGHT = 10; // px; below this, upright text is cramped
      if (size < MIN_UPRIGHT && aspect >= 2.2) {
        const longBox = Math.min(ob.width, pl.distance * 6) * FIT_MARGIN; // exploit length
        const shortBox = pl.distance * 2 * FIT_MARGIN;                    // still bounded across
        const rotSize = fitFor(longBox, shortBox);
        if (rotSize > size) {
          size = rotSize;
          deg = ob.angleRad * 180 / Math.PI; // major axis, ∈ [-90, 90]
        }
      }
      if (size < 4) continue; // too small to be legible in MVP → omit (v2 handles tiny)

      const g = document.createElementNS(SVGNS, 'g');
      g.setAttribute('transform', `translate(${pl.x.toFixed(1)} ${pl.y.toFixed(1)}) rotate(${deg.toFixed(1)})`);

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

  function _serialize() {
    const svg = window.PosterRender._lastSvg;
    if (!svg) return null;
    const clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', SVGNS);
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(clone);
  }
  function _download(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function downloadSVG() {
    const s = _serialize();
    if (s) _download(new Blob([s], { type: 'image/svg+xml' }), 'wordmap-poster-water.svg');
  }
  function downloadPNG(scale) {
    const s = _serialize();
    const svg = window.PosterRender._lastSvg;
    if (!s || !svg) return;
    scale = scale || 2;
    const vb = svg.getAttribute('viewBox').split(/\s+/).map(Number);
    const w = vb[2] * scale, h = vb[3] * scale;
    const img = new Image();
    img.onload = function () {
      const cv = document.createElement('canvas');
      cv.width = w; cv.height = h;
      const cx = cv.getContext('2d');
      cx.drawImage(img, 0, 0, w, h);
      cv.toBlob(b => { if (b) _download(b, 'wordmap-poster-water.png'); }, 'image/png');
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(s)));
  }

  window.PosterRender = {
    render: render, _lastSvg: null,
    downloadSVG: downloadSVG, downloadPNG: downloadPNG,
  };
})();
