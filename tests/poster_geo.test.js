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
