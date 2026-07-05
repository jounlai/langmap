/* poster_geo.js — pure geo/math for the WordMap poster. Browser + Node. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.PosterGeo = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  // Natural Earth forward (Šavrič polynomial, as in d3-geo-projection).
  const X_MAX = 2.73539; // |x| at (λ=±180°, φ=0)
  const Y_MAX = 1.42246; // |y| at (φ=±90°)

  function projectNaturalEarth(lng, lat, opts) {
    const width = (opts && opts.width) || 1600;
    const scale = width / (2 * X_MAX);
    const height = 2 * Y_MAX * scale;
    const l = lng * Math.PI / 180;
    const p = lat * Math.PI / 180;
    const p2 = p * p, p4 = p2 * p2;
    const nx = l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4)));
    const ny = p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)));
    return { x: nx * scale + width / 2, y: height / 2 - ny * scale, height: height };
  }

  // --- polylabel (pole of inaccessibility), after Mapbox's algorithm ---
  function pointToPolygonDist(x, y, rings) {
    let inside = false, minDistSq = Infinity;
    for (let r = 0; r < rings.length; r++) {
      const ring = rings[r];
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const a = ring[i], b = ring[j];
        if ((a[1] > y) !== (b[1] > y) &&
            x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
        minDistSq = Math.min(minDistSq, segDistSq(x, y, a, b));
      }
    }
    return (inside ? 1 : -1) * Math.sqrt(minDistSq);
  }
  function segDistSq(px, py, a, b) {
    let x = a[0], y = a[1], dx = b[0] - x, dy = b[1] - y;
    if (dx !== 0 || dy !== 0) {
      const t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) { x = b[0]; y = b[1]; }
      else if (t > 0) { x += dx * t; y += dy * t; }
    }
    dx = px - x; dy = py - y;
    return dx * dx + dy * dy;
  }
  function Cell(x, y, h, rings) {
    this.x = x; this.y = y; this.h = h;
    this.d = pointToPolygonDist(x, y, rings);
    this.max = this.d + this.h * Math.SQRT2;
  }
  function polylabel(rings, precision) {
    precision = precision || 1.0;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const outer = rings[0];
    for (const p of outer) {
      if (p[0] < minX) minX = p[0];
      if (p[1] < minY) minY = p[1];
      if (p[0] > maxX) maxX = p[0];
      if (p[1] > maxY) maxY = p[1];
    }
    const width = maxX - minX, height = maxY - minY;
    const cellSize = Math.min(width, height);
    if (cellSize === 0) return { x: minX, y: minY, distance: 0 };
    const h = cellSize / 2;
    // Priority queue (max-heap by cell.max).
    const queue = [];
    const push = (c) => { queue.push(c); let i = queue.length - 1;
      while (i > 0) { const par = (i - 1) >> 1; if (queue[par].max >= queue[i].max) break;
        [queue[par], queue[i]] = [queue[i], queue[par]]; i = par; } };
    const pop = () => { const top = queue[0], last = queue.pop();
      if (queue.length) { queue[0] = last; let i = 0;
        for (;;) { const l = 2 * i + 1, r = l + 1; let m = i;
          if (l < queue.length && queue[l].max > queue[m].max) m = l;
          if (r < queue.length && queue[r].max > queue[m].max) m = r;
          if (m === i) break; [queue[m], queue[i]] = [queue[i], queue[m]]; i = m; } }
      return top; };
    for (let x = minX; x < maxX; x += cellSize)
      for (let y = minY; y < maxY; y += cellSize) push(new Cell(x + h, y + h, h, rings));
    let best = new Cell(minX + width / 2, minY + height / 2, 0, rings);
    while (queue.length) {
      const cell = pop();
      if (cell.d > best.d) best = cell;
      if (cell.max - best.d <= precision) continue;
      const nh = cell.h / 2;
      push(new Cell(cell.x - nh, cell.y - nh, nh, rings));
      push(new Cell(cell.x + nh, cell.y - nh, nh, rings));
      push(new Cell(cell.x - nh, cell.y + nh, nh, rings));
      push(new Cell(cell.x + nh, cell.y + nh, nh, rings));
    }
    return { x: best.x, y: best.y, distance: best.d };
  }

  // Principal-axis oriented box via covariance (PCA).
  function orientedBox(points) {
    const n = points.length;
    let mx = 0, my = 0;
    for (const p of points) { mx += p[0]; my += p[1]; }
    mx /= n; my /= n;
    let cxx = 0, cxy = 0, cyy = 0;
    for (const p of points) {
      const dx = p[0] - mx, dy = p[1] - my;
      cxx += dx * dx; cxy += dx * dy; cyy += dy * dy;
    }
    cxx /= n; cxy /= n; cyy /= n;
    let angle = 0.5 * Math.atan2(2 * cxy, cxx - cyy);
    const ca = Math.cos(angle), sa = Math.sin(angle);
    let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;
    for (const p of points) {
      const dx = p[0] - mx, dy = p[1] - my;
      const u = dx * ca + dy * sa, v = -dx * sa + dy * ca;
      if (u < minU) minU = u; if (u > maxU) maxU = u;
      if (v < minV) minV = v; if (v > maxV) maxV = v;
    }
    let width = maxU - minU, height = maxV - minV;
    // Ensure width is the LONG extent; if not, rotate axis 90°.
    if (height > width) {
      angle += (angle > 0 ? -Math.PI / 2 : Math.PI / 2);
      const t = width; width = height; height = t;
    }
    return { angleRad: angle, width: width, height: height, cx: mx, cy: my };
  }

  // Adjacency graph: detects bordering countries via shared border vertices using grid-snap hash.
  function buildAdjacency(features, eps) {
    eps = eps || 0.1;
    const key = (x, y) => Math.round(x / eps) + ',' + Math.round(y / eps);
    const vertexMap = new Map();
    for (const f of features) {
      const seen = new Set();
      for (const ring of f.rings) for (const pt of ring) {
        const hk = key(pt[0], pt[1]);
        if (seen.has(hk)) continue;
        seen.add(hk);
        if (!vertexMap.has(hk)) vertexMap.set(hk, new Set());
        vertexMap.get(hk).add(f.key);
      }
    }
    const adj = new Map();
    for (const f of features) adj.set(f.key, new Set());
    for (const keys of vertexMap.values()) {
      if (keys.size < 2) continue;
      const arr = Array.from(keys);
      for (let i = 0; i < arr.length; i++)
        for (let j = i + 1; j < arr.length; j++) {
          adj.get(arr[i]).add(arr[j]);
          adj.get(arr[j]).add(arr[i]);
        }
    }
    return adj;
  }

  // Welsh–Powell greedy graph coloring.
  function greedyColor(adj) {
    const nodes = Array.from(adj.keys()).sort((a, b) => adj.get(b).size - adj.get(a).size);
    const color = new Map();
    for (const n of nodes) {
      const used = new Set();
      for (const nb of adj.get(n)) if (color.has(nb)) used.add(color.get(nb));
      let c = 0;
      while (used.has(c)) c++;
      color.set(n, c);
    }
    return color;
  }

  // Font-fit calculation: largest font size that fits text in a box.
  function fitFontSize(measureAt1px, text, boxW, boxH, lineCount, maxFont) {
    const w1 = measureAt1px(text) || 1e-6;
    const byWidth = boxW / w1;
    const byHeight = boxH / (lineCount * 1.2);
    return Math.min(byWidth, byHeight, maxFont);
  }

  // Signed clearance of a point to the polygon border (positive = inside).
  function interiorDistance(rings, x, y) { return pointToPolygonDist(x, y, rings); }

  return {
    projectNaturalEarth: projectNaturalEarth,
    polylabel: polylabel,
    orientedBox: orientedBox,
    buildAdjacency: buildAdjacency,
    greedyColor: greedyColor,
    fitFontSize: fitFontSize,
    interiorDistance: interiorDistance,
  };
});
