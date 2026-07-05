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

// interiorDistance: signed clearance to the border (positive inside).
const sq10 = [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]];
near(G.interiorDistance(sq10, 5, 5), 5, 0.3, 'center clearance ≈ half-side');
assert.ok(G.interiorDistance(sq10, -1, 5) < 0, 'outside point is negative');

// rectInPolygon: exact rotated-rectangle containment (the real fit predicate).
assert.ok(G.rectInPolygon(sq10, 5, 5, 2, 2, 0), '4×4 box fits inside 10×10');
assert.ok(!G.rectInPolygon(sq10, 5, 5, 6, 6, 0), '12×12 box does not fit');

// HOLE handling (enclave): a point inside a hole is OUTSIDE the polygon, and a
// rectangle overlapping the hole is rejected — this is what keeps a country's
// label from spilling into an enclave carved out of it.
const holed = [
  [[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]],   // outer
  [[4, 4], [6, 4], [6, 6], [4, 6], [4, 4]],        // hole
];
assert.ok(G.interiorDistance(holed, 5, 5) < 0, 'point in the hole is outside');
assert.ok(!G.rectInPolygon(holed, 5, 5, 2, 2, 0), 'box over the hole is rejected');
assert.ok(G.rectInPolygon(holed, 2, 2, 1, 1, 0), 'box clear of the hole fits');

console.log('poster_geo Task 5: OK (interiorDistance + rectInPolygon + holes)');
