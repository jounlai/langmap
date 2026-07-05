/* poster_render.js — browser-only SVG poster renderer. */
(function () {
  'use strict';
  const SVGNS = 'http://www.w3.org/2000/svg';
  const PALETTE = ['#c7dcc1', '#e6d3a3', '#cdd7e8', '#e8c9c2', '#d8cfe0', '#cfe3e0'];

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

    root.appendChild(svg);
    window.PosterRender._lastSvg = svg;
  }

  window.PosterRender = { render: render, _lastSvg: null };
})();
