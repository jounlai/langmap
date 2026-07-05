# WordMap Poster Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dedicated page `poster.html` that renders a fixed-scale, print/share-friendly world map for the word `water`: one curated language per country, characters only (romanization under non-Latin scripts), text fitted inside each country with rotation and a font-size cap, and adjacent countries colored differently.

**Architecture:** A self-contained static SVG poster renderer decoupled from the Leaflet map. Pure geo/math logic lives in `poster_geo.js` (Natural Earth projection, polylabel interior point, oriented bounding box, adjacency + greedy coloring, font-fit) and is unit-tested in Node. Curated data lives in `poster_langs.js`. Browser-only rendering/export lives in `poster_render.js`, orchestrated by `poster.html`.

**Tech Stack:** Plain ES5/ES6 browser JS (no build step, no framework, no bundler — matches the repo). Node 20 for logic tests via `node:assert`. Country polygons from the Natural Earth 10m GeoJSON already used by wordmap.

## Global Constraints

- **No external runtime dependencies / no CDN libraries.** All algorithms (projection, polylabel, coloring) are inlined. (Repo convention; the app already inlines its solvers.)
- **Dual-environment modules:** every file in `poster_geo.js` and `poster_langs.js` must load both as a browser `<script>` (attaching to `window`) AND via Node `require` (for tests). Use the UMD guard shown in Task 1.
- **No zoom / pan / 3D.** One fixed render at one scale.
- **MVP word is `water` only.** No word switching.
- **Country key = ISO 3166-1 alpha-3** (GeoJSON property `ISO3166-1-Alpha-3`, e.g. `"IDN"`; fallback to `properties.name` when the ISO field is missing or `"-99"`).
- **Projection = Natural Earth**, viewBox width `1600`, height derived (`≈ 832`).
- **Font cap** = `28` (px in poster coordinate space); romanization line = `0.55×` the native line.
- **Node tests** are plain scripts run with `node tests/<name>.test.js`; exit non-zero on failure (matches the existing `validate_wordmap_data.js` pattern). Create the `tests/` directory on first use.
- Commit message trailer for every commit: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

## File Structure

- `poster_geo.js` (new) — pure functions: `projectNaturalEarth`, `polylabel`, `orientedBox`, `buildAdjacency`, `greedyColor`, `fitFontSize`. UMD-guarded. Built up across Tasks 1–5.
- `poster_langs.js` (new) — `POSTER_LANGS` (ISO→language) and `POSTER_WORDS` (`water` data). Task 6.
- `poster_render.js` (new) — browser-only: fetch GeoJSON, project geometry, color, place text, export SVG/PNG. Tasks 7–9.
- `poster.html` (new) — page shell that loads the three scripts and runs the pipeline. Task 7.
- `tests/poster_geo.test.js` (new) — Node unit tests for the geo module. Tasks 1–5.
- `tests/poster_langs.test.js` (new) — Node shape/consistency validator for the data. Task 6.

---

## Task 1: Natural Earth projection

**Files:**
- Create: `poster_geo.js`
- Test: `tests/poster_geo.test.js`

**Interfaces:**
- Produces: `projectNaturalEarth(lng, lat, opts?) -> { x, y, height }` where `opts.width` defaults to `1600`. `x,y` are SVG-space pixels (y grows downward); `height` is the derived viewBox height for that width. Exposed on `window.PosterGeo` (browser) and `module.exports` (Node).

- [ ] **Step 1: Write the failing test**

Create `tests/poster_geo.test.js`:

```js
const assert = require('node:assert');
const G = require('../poster_geo.js');

function near(a, b, tol, msg) { assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a} vs ${b}`); }

// (0,0) maps to the horizontal center and vertical center.
const W = 1600;
const c = G.projectNaturalEarth(0, 0, { width: W });
near(c.x, W / 2, 0.001, 'origin x is centered');
near(c.y, c.height / 2, 0.001, 'origin y is centered');

// Antimeridian maps near the left/right edges, equator row.
const east = G.projectNaturalEarth(180, 0, { width: W });
const west = G.projectNaturalEarth(-180, 0, { width: W });
near(east.x, W, 0.5, '+180 near right edge');
near(west.x, 0, 0.5, '-180 near left edge');
near(east.y, c.height / 2, 0.001, '+180 stays on equator row');

// North pole maps to the top (y≈0), south pole to the bottom (y≈height).
const north = G.projectNaturalEarth(0, 90, { width: W });
const south = G.projectNaturalEarth(0, -90, { width: W });
near(north.y, 0, 0.5, 'north pole at top');
near(south.y, north.height, 0.5, 'south pole at bottom');

console.log('poster_geo Task 1: OK');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/poster_geo.test.js`
Expected: FAIL — `Cannot find module '../poster_geo.js'`.

- [ ] **Step 3: Write minimal implementation**

Create `poster_geo.js`:

```js
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

  return { projectNaturalEarth: projectNaturalEarth };
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/poster_geo.test.js`
Expected: PASS — prints `poster_geo Task 1: OK`.

- [ ] **Step 5: Commit**

```bash
git add poster_geo.js tests/poster_geo.test.js
git commit -m "feat(poster): Natural Earth projection module

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Interior label point (polylabel)

**Files:**
- Modify: `poster_geo.js`
- Test: `tests/poster_geo.test.js`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `polylabel(rings, precision?) -> { x, y, distance }`. `rings` is `[outer, ...holes]`, each ring an array of `[x, y]` points in SVG space. `distance` is the radius of the largest inscribed circle centered at `(x, y)`. Added to the `PosterGeo` export.

- [ ] **Step 1: Write the failing test**

Append to `tests/poster_geo.test.js` (before the final `console.log` of Task 1, or add a new block after it):

```js
// polylabel of a unit-ish square centered at (5,5), side 10 → center ≈ (5,5), distance ≈ 5.
const sq = [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]];
const pl = G.polylabel(sq, 0.1);
near(pl.x, 5, 0.3, 'square label x centered');
near(pl.y, 5, 0.3, 'square label y centered');
near(pl.distance, 5, 0.3, 'square inscribed radius ≈ half-side');

// An L-shaped polygon must not place the point in the missing quadrant.
const L = [[[0, 0], [10, 0], [10, 4], [4, 4], [4, 10], [0, 10], [0, 0]]];
const pll = G.polylabel(L, 0.1);
assert.ok(!(pll.x > 4 && pll.y > 4), 'L-shape label avoids the notch');
assert.ok(pll.distance > 0, 'L-shape has positive inscribed radius');

console.log('poster_geo Task 2: OK');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/poster_geo.test.js`
Expected: FAIL — `G.polylabel is not a function`.

- [ ] **Step 3: Write minimal implementation**

In `poster_geo.js`, add these functions inside the factory (before `return`), and add `polylabel` to the returned object:

```js
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
```

Update the return statement to:

```js
  return {
    projectNaturalEarth: projectNaturalEarth,
    polylabel: polylabel,
  };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/poster_geo.test.js`
Expected: PASS — prints `poster_geo Task 2: OK`.

- [ ] **Step 5: Commit**

```bash
git add poster_geo.js tests/poster_geo.test.js
git commit -m "feat(poster): polylabel interior-point solver

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Oriented bounding box / major axis

**Files:**
- Modify: `poster_geo.js`
- Test: `tests/poster_geo.test.js`

**Interfaces:**
- Produces: `orientedBox(points) -> { angleRad, width, height, cx, cy }`. `points` is a flat array of `[x, y]`. `angleRad` is the major-axis angle (radians, `[-π/2, π/2]`); `width`/`height` are extents along/across that axis; `cx,cy` the centroid. Added to `PosterGeo`.

- [ ] **Step 1: Write the failing test**

Append to `tests/poster_geo.test.js`:

```js
// A horizontal 20x4 rectangle → major axis ≈ 0 rad, width≈20, height≈4.
const wide = [[0, 0], [20, 0], [20, 4], [0, 4]];
const ob = G.orientedBox(wide);
near(Math.abs(ob.angleRad), 0, 0.02, 'wide box axis ~horizontal');
near(ob.width, 20, 0.001, 'wide box long extent');
near(ob.height, 4, 0.001, 'wide box short extent');

// A vertical 4x20 rectangle → axis ≈ ±π/2, width≈20 (long), height≈4.
const tall = [[0, 0], [4, 0], [4, 20], [0, 20]];
const ot = G.orientedBox(tall);
near(Math.abs(ot.angleRad), Math.PI / 2, 0.02, 'tall box axis ~vertical');
near(ot.width, 20, 0.001, 'tall box long extent');

console.log('poster_geo Task 3: OK');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/poster_geo.test.js`
Expected: FAIL — `G.orientedBox is not a function`.

- [ ] **Step 3: Write minimal implementation**

Add to `poster_geo.js` (inside factory, before `return`):

```js
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
```

Add `orientedBox: orientedBox,` to the return object.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/poster_geo.test.js`
Expected: PASS — prints `poster_geo Task 3: OK`.

- [ ] **Step 5: Commit**

```bash
git add poster_geo.js tests/poster_geo.test.js
git commit -m "feat(poster): oriented bounding box / major axis

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Adjacency graph + greedy coloring

**Files:**
- Modify: `poster_geo.js`
- Test: `tests/poster_geo.test.js`

**Interfaces:**
- Produces:
  - `buildAdjacency(features, eps?) -> Map<key, Set<key>>`. `features` is `[{ key, rings }]` where `rings` is `[[ [lng,lat], ... ]]` (raw coordinates). `eps` (default `0.1`, in coordinate units/degrees) is the grid-snap tolerance for detecting shared border vertices.
  - `greedyColor(adj) -> Map<key, number>` — Welsh–Powell greedy; color index `0..k`. Both added to `PosterGeo`.

- [ ] **Step 1: Write the failing test**

Append to `tests/poster_geo.test.js`:

```js
// Three unit squares in a row: A|B|C. A–B adjacent, B–C adjacent, A–C NOT.
const A = { key: 'A', rings: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] };
const B = { key: 'B', rings: [[[1, 0], [2, 0], [2, 1], [1, 1], [1, 0]]] };
const Cc = { key: 'C', rings: [[[2, 0], [3, 0], [3, 1], [2, 1], [2, 0]]] };
const adj = G.buildAdjacency([A, B, Cc], 0.1);
assert.ok(adj.get('A').has('B'), 'A adjacent B');
assert.ok(adj.get('B').has('C'), 'B adjacent C');
assert.ok(!adj.get('A').has('C'), 'A not adjacent C');

const colors = G.greedyColor(adj);
assert.notStrictEqual(colors.get('A'), colors.get('B'), 'A,B differ');
assert.notStrictEqual(colors.get('B'), colors.get('C'), 'B,C differ');

console.log('poster_geo Task 4: OK');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/poster_geo.test.js`
Expected: FAIL — `G.buildAdjacency is not a function`.

- [ ] **Step 3: Write minimal implementation**

Add to `poster_geo.js` (inside factory, before `return`):

```js
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
```

Add `buildAdjacency: buildAdjacency, greedyColor: greedyColor,` to the return object.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/poster_geo.test.js`
Expected: PASS — prints `poster_geo Task 4: OK`.

- [ ] **Step 5: Commit**

```bash
git add poster_geo.js tests/poster_geo.test.js
git commit -m "feat(poster): border adjacency graph + greedy coloring

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Font-fit calculation

**Files:**
- Modify: `poster_geo.js`
- Test: `tests/poster_geo.test.js`

**Interfaces:**
- Produces: `fitFontSize(measureAt1px, text, boxW, boxH, lineCount, maxFont) -> number`. `measureAt1px(text)` returns the text width at font-size 1px. Returns the largest font size (≤ `maxFont`) such that `size*width ≤ boxW` and `lineCount*1.2*size ≤ boxH`. Added to `PosterGeo`.

- [ ] **Step 1: Write the failing test**

Append to `tests/poster_geo.test.js`:

```js
// Fake monospace measurer: width at 1px = 0.6 * charCount.
const measure = (t) => 0.6 * t.length;
// "abcd" (w1=2.4). Box 24 wide, 100 tall, 1 line, cap 40 → width-bound: 24/2.4 = 10.
near(G.fitFontSize(measure, 'abcd', 24, 100, 1, 40), 10, 1e-9, 'width-bound fit');
// Tall-limited: box 1000 wide, 24 tall, 2 lines → 24/(2*1.2)=10.
near(G.fitFontSize(measure, 'abcd', 1000, 24, 2, 40), 10, 1e-9, 'height-bound fit');
// Cap applies: huge box → clamps to maxFont.
near(G.fitFontSize(measure, 'abcd', 1e6, 1e6, 1, 28), 28, 1e-9, 'font cap applied');

console.log('poster_geo Task 5: OK');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/poster_geo.test.js`
Expected: FAIL — `G.fitFontSize is not a function`.

- [ ] **Step 3: Write minimal implementation**

Add to `poster_geo.js` (inside factory, before `return`):

```js
  function fitFontSize(measureAt1px, text, boxW, boxH, lineCount, maxFont) {
    const w1 = measureAt1px(text) || 1e-6;
    const byWidth = boxW / w1;
    const byHeight = boxH / (lineCount * 1.2);
    return Math.min(byWidth, byHeight, maxFont);
  }
```

Add `fitFontSize: fitFontSize,` to the return object.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/poster_geo.test.js`
Expected: PASS — prints `poster_geo Task 5: OK`.

- [ ] **Step 5: Commit**

```bash
git add poster_geo.js tests/poster_geo.test.js
git commit -m "feat(poster): font-fit calculation

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Curation data + validator

**Files:**
- Create: `poster_langs.js`
- Test: `tests/poster_langs.test.js`

**Interfaces:**
- Produces: `POSTER_LANGS` (`{ [ISO3]: { code } }`), `POSTER_WORDS` (`{ water: { [ISO3]: { native, roman? } } }`). Exposed on `window` (browser) and `module.exports` (Node).

This task seeds a **starter set** of ~30 well-known countries so the pipeline is testable end-to-end; the full ~150-country curation is a follow-on data pass using the same shape (run through the project's 5-run cross-validation pipeline).

- [ ] **Step 1: Write the failing test**

Create `tests/poster_langs.test.js`:

```js
const assert = require('node:assert');
const { POSTER_LANGS, POSTER_WORDS } = require('../poster_langs.js');

// Shape: every POSTER_LANGS entry has a string `code`; keys are 3-letter ISO.
for (const [iso, v] of Object.entries(POSTER_LANGS)) {
  assert.match(iso, /^[A-Z]{3}$/, `ISO key looks alpha-3: ${iso}`);
  assert.strictEqual(typeof v.code, 'string', `${iso}.code is a string`);
}

// `water` exists and every country in it is declared in POSTER_LANGS.
assert.ok(POSTER_WORDS.water, 'water word present');
for (const [iso, w] of Object.entries(POSTER_WORDS.water)) {
  assert.ok(POSTER_LANGS[iso], `water[${iso}] has a POSTER_LANGS entry`);
  assert.strictEqual(typeof w.native, 'string', `water[${iso}].native is a string`);
  if ('roman' in w) assert.strictEqual(typeof w.roman, 'string', `water[${iso}].roman is a string`);
}

// Non-Latin native forms MUST carry a romanization line.
const hasLatinOnly = (s) => /^[\p{Script=Latin}\p{P}\p{Zs}0-9]+$/u.test(s);
for (const [iso, w] of Object.entries(POSTER_WORDS.water)) {
  if (!hasLatinOnly(w.native)) assert.ok('roman' in w, `non-Latin water[${iso}] needs roman`);
}

console.log('poster_langs: OK');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/poster_langs.test.js`
Expected: FAIL — `Cannot find module '../poster_langs.js'`.

- [ ] **Step 3: Write minimal implementation**

Create `poster_langs.js`:

```js
/* poster_langs.js — curated one-language-per-country + word data for the poster. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) { root.POSTER_LANGS = api.POSTER_LANGS; root.POSTER_WORDS = api.POSTER_WORDS; }
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  // ISO 3166-1 alpha-3 → chosen language (code references LANG_DATA where useful).
  const POSTER_LANGS = {
    JPN: { code: 'ja' }, CHN: { code: 'zh' }, KOR: { code: 'ko' },
    FRA: { code: 'fr' }, DEU: { code: 'de' }, ITA: { code: 'it' },
    ESP: { code: 'es' }, PRT: { code: 'pt' }, GBR: { code: 'en' },
    USA: { code: 'en' }, RUS: { code: 'ru' }, UKR: { code: 'uk' },
    POL: { code: 'pl' }, NLD: { code: 'nl' }, SWE: { code: 'sv' },
    NOR: { code: 'no' }, FIN: { code: 'fi' }, GRC: { code: 'el' },
    TUR: { code: 'tr' }, IRN: { code: 'fa' }, SAU: { code: 'ar' },
    ISR: { code: 'he' }, IND: { code: 'hi' }, THA: { code: 'th' },
    VNM: { code: 'vi' }, IDN: { code: 'id' }, EGY: { code: 'ar' },
    KEN: { code: 'sw' }, BRA: { code: 'pt' }, MEX: { code: 'es' },
  };

  // MVP word. Latin-script forms omit `roman`; non-Latin carry a romanization.
  const POSTER_WORDS = {
    water: {
      JPN: { native: '水', roman: 'mizu' },
      CHN: { native: '水', roman: 'shuǐ' },
      KOR: { native: '물', roman: 'mul' },
      FRA: { native: 'eau' },
      DEU: { native: 'Wasser' },
      ITA: { native: 'acqua' },
      ESP: { native: 'agua' },
      PRT: { native: 'água' },
      GBR: { native: 'water' },
      USA: { native: 'water' },
      RUS: { native: 'вода', roman: 'voda' },
      UKR: { native: 'вода', roman: 'voda' },
      POL: { native: 'woda' },
      NLD: { native: 'water' },
      SWE: { native: 'vatten' },
      NOR: { native: 'vann' },
      FIN: { native: 'vesi' },
      GRC: { native: 'νερό', roman: 'neró' },
      TUR: { native: 'su' },
      IRN: { native: 'آب', roman: 'âb' },
      SAU: { native: 'ماء', roman: 'māʼ' },
      ISR: { native: 'מים', roman: 'mayim' },
      IND: { native: 'पानी', roman: 'pānī' },
      THA: { native: 'น้ำ', roman: 'nám' },
      VNM: { native: 'nước' },
      IDN: { native: 'air' },
      EGY: { native: 'ماء', roman: 'māʼ' },
      KEN: { native: 'maji' },
      BRA: { native: 'água' },
      MEX: { native: 'agua' },
    },
  };

  return { POSTER_LANGS: POSTER_LANGS, POSTER_WORDS: POSTER_WORDS };
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/poster_langs.test.js`
Expected: PASS — prints `poster_langs: OK`.

- [ ] **Step 5: Commit**

```bash
git add poster_langs.js tests/poster_langs.test.js
git commit -m "feat(poster): curated language + water-word starter data

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Page shell + colored country polygons

**Files:**
- Create: `poster.html`
- Create: `poster_render.js`

**Interfaces:**
- Consumes: `window.PosterGeo` (Tasks 1–5), `window.POSTER_LANGS` / `window.POSTER_WORDS` (Task 6).
- Produces: `window.PosterRender.render(geojson, opts)` which builds the SVG into `#poster-root`. This task renders **polygons + coloring only**; text comes in Task 8.

- [ ] **Step 1: Create the page shell**

Create `poster.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WordMap Poster — water</title>
  <style>
    html, body { margin: 0; background: #f4f4f2; font-family: system-ui, sans-serif; }
    #bar { padding: 10px 14px; display: flex; gap: 10px; align-items: center; }
    #bar button { border: 1px solid #ccc; background: #fff; border-radius: 6px; padding: 7px 14px; cursor: pointer; font-size: 14px; }
    #poster-wrap { width: 100%; overflow-x: auto; }
    #poster-root svg { display: block; width: 100%; height: auto; max-width: 1600px; margin: 0 auto; }
  </style>
</head>
<body>
  <div id="bar">
    <strong>WordMap Poster — “water”</strong>
    <button id="dl-svg" type="button">Download SVG</button>
    <button id="dl-png" type="button">Download PNG</button>
  </div>
  <div id="poster-wrap"><div id="poster-root"></div></div>

  <script src="poster_geo.js"></script>
  <script src="poster_langs.js"></script>
  <script src="poster_render.js"></script>
  <script>
    (function () {
      const SRC = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';
      fetch(SRC).then(r => r.json()).then(geojson => {
        window.PosterRender.render(geojson, { word: 'water', width: 1600 });
      }).catch(err => {
        document.getElementById('poster-root').textContent = 'Could not load country data: ' + err;
      });
    })();
  </script>
</body>
</html>
```

- [ ] **Step 2: Create the renderer (polygons + coloring)**

Create `poster_render.js`:

```js
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
```

- [ ] **Step 3: Manual verification**

Serve the repo root and open the page:

```bash
python3 -m http.server 8765
```

Open `http://localhost:8765/poster.html`. Expected:
- A full-world Natural Earth map fills the width.
- Every country is filled from the pastel palette.
- **No two bordering countries share a fill color** (spot-check France/Germany/Spain, USA/Canada/Mexico).
- No console errors.

- [ ] **Step 4: Commit**

```bash
git add poster.html poster_render.js
git commit -m "feat(poster): page shell + adjacency-colored country polygons

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Fitted, rotated text with romanization

**Files:**
- Modify: `poster_render.js`

**Interfaces:**
- Consumes: `PosterGeo.polylabel`, `PosterGeo.orientedBox`, `PosterGeo.fitFontSize`, `POSTER_LANGS`, `POSTER_WORDS`.
- Produces: text layer inside the same SVG built in Task 7.

- [ ] **Step 1: Add a browser text measurer and the label pass**

In `poster_render.js`, add a measurer near the top (after `PALETTE`):

```js
  // Measure text width at font-size 1px using a shared offscreen canvas.
  const _ctx = document.createElement('canvas').getContext('2d');
  function measureAt1px(text, fontFamily) {
    _ctx.font = '1px ' + (fontFamily || 'system-ui, sans-serif');
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
```

- [ ] **Step 2: Append the text pass inside `render`**

In `render`, immediately before `root.appendChild(svg);`, insert:

```js
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

      // Inscribed box from the largest inscribed circle, biased to the major axis.
      const boxLong = Math.min(ob.width, pl.distance * 2 * 1.6);
      const boxShort = Math.min(ob.height, pl.distance * 2);
      const hasRoman = typeof entry.roman === 'string' && entry.roman.length > 0;
      const lineCount = hasRoman ? 1.55 : 1; // roman line is 0.55× tall

      const size = G.fitFontSize(measureAt1px, entry.native, boxLong, boxShort, lineCount, MAX_FONT);
      if (size < 4) continue; // too small to be legible in MVP → omit (v2 handles tiny)

      // Rotate to the major axis, but keep near-horizontal upright.
      let deg = ob.angleRad * 180 / Math.PI;
      if (Math.abs(deg) < 12) deg = 0;

      const g = document.createElementNS(SVGNS, 'g');
      g.setAttribute('transform', `translate(${pl.x.toFixed(1)} ${pl.y.toFixed(1)}) rotate(${deg.toFixed(1)})`);

      const native = document.createElementNS(SVGNS, 'text');
      native.setAttribute('text-anchor', 'middle');
      native.setAttribute('font-family', 'system-ui, sans-serif');
      native.setAttribute('font-size', size.toFixed(1));
      native.setAttribute('fill', '#20242a');
      native.setAttribute('dy', hasRoman ? (-size * 0.15).toFixed(1) : (size * 0.35).toFixed(1));
      native.textContent = entry.native;
      g.appendChild(native);

      if (hasRoman) {
        const roman = document.createElementNS(SVGNS, 'text');
        roman.setAttribute('text-anchor', 'middle');
        roman.setAttribute('font-family', 'system-ui, sans-serif');
        roman.setAttribute('font-size', (size * 0.55).toFixed(1));
        roman.setAttribute('fill', '#555b63');
        roman.setAttribute('dy', (size * 0.7).toFixed(1));
        roman.textContent = entry.roman;
        g.appendChild(roman);
      }
      svg.appendChild(g);
    }
```

- [ ] **Step 3: Manual verification**

Reload `http://localhost:8765/poster.html`. Expected:
- Japan shows `水` with `mizu` beneath it; China `水`/`shuǐ`; Russia `вода`/`voda`.
- Latin countries (France `eau`, Germany `Wasser`) show a single line, no romanization.
- Each label sits inside its country and does **not** overflow the border.
- Large countries (Russia, USA) are **capped** (no giant text); labels are legible.
- Console has no errors.

- [ ] **Step 4: Commit**

```bash
git add poster_render.js
git commit -m "feat(poster): fitted, rotated country labels with romanization

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: SVG + PNG export

**Files:**
- Modify: `poster_render.js`
- Modify: `poster.html`

**Interfaces:**
- Consumes: `window.PosterRender._lastSvg`.
- Produces: `window.PosterRender.downloadSVG()` and `window.PosterRender.downloadPNG(scale?)`.

- [ ] **Step 1: Add exporters to `poster_render.js`**

Before the final `window.PosterRender = {...}` line, add:

```js
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
```

Update the export object to:

```js
  window.PosterRender = {
    render: render, _lastSvg: null,
    downloadSVG: downloadSVG, downloadPNG: downloadPNG,
  };
```

- [ ] **Step 2: Wire the buttons in `poster.html`**

In `poster.html`, inside the final inline `<script>`'s IIFE, after the `fetch(...).then(...)` chain, add:

```js
      document.getElementById('dl-svg').addEventListener('click', () => window.PosterRender.downloadSVG());
      document.getElementById('dl-png').addEventListener('click', () => window.PosterRender.downloadPNG(2));
```

- [ ] **Step 3: Manual verification**

Reload `http://localhost:8765/poster.html`.
- Click **Download SVG** → a `.svg` downloads; open it — it renders identically (colors + labels) in a browser/vector viewer.
- Click **Download PNG** → a `.png` (~3200×1664) downloads with crisp text and no clipped labels.

- [ ] **Step 4: Commit**

```bash
git add poster_render.js poster.html
git commit -m "feat(poster): SVG + high-DPI PNG export

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Verification Summary

- **Node logic tests** (`node tests/poster_geo.test.js && node tests/poster_langs.test.js`) — projection, polylabel, oriented box, adjacency+coloring, font-fit, and data shape all pass.
- **Coloring invariant** — verified structurally by Task 4's test and visually in Task 7.
- **Fit invariant** — labels stay inside borders; verified visually in Task 8 (a headless automated bbox check is a v2 hardening item; the fit math is unit-tested in Task 5).
- **Export** — SVG and PNG both reproduce the poster (Task 9).

## Deferred to v2 (not in this plan)

- Requirement 5: tiny-country / island external label placement over sea/neighbors with collision avoidance (adapt the SA solver from `2026-05-31-sa-label-placement-design.md`).
- Full ~150-country curation of `POSTER_LANGS` / `POSTER_WORDS.water` (data pass through the 5-run pipeline).
- Multiple words / in-page word switching.
- Automated headless "no label overflows its country" assertion.
- Optional bundled simplified TopoJSON to remove the runtime GeoJSON fetch.
