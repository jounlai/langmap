#!/usr/bin/env node
/*
 * build_countries_geojson.js — self-hosted, simplified country-border layer.
 *
 * wordmap.html used to fetch the borders straight from
 *   raw.githubusercontent.com/datasets/geo-countries/.../countries.geojson
 * at full resolution: 14.6 MB (4.6 MB gzip). On slow 4G that download took
 * ~1.5 min AND L.geoJSON froze the main thread parsing ~500k vertices — the
 * word labels appeared, then vanished for a long time behind the parse.
 *
 * This regenerates a self-hosted countries.geojson simplified with
 * Douglas-Peucker (~2 km tolerance) + coordinate rounding (3 dp) + dropping
 * rings/features below ~6 km: ~1.9 MB (~0.6 MB gzip), ~115k vertices. The map
 * is a word atlas, so the country fills are decorative background; micro-states
 * and reefs whose fill is sub-pixel at world zoom are dropped, and their word
 * labels still render from LANG_DATA lat/lng.
 *
 * Run from repo root (needs network):  node tools/build_countries_geojson.js
 * Writes ./countries.geojson. Bump the ?v= on the fetch() in wordmap.html when
 * you regenerate so browsers pick up the new file.
 */
const fs = require('fs');
const { execFileSync } = require('child_process');

const SRC = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';
const TMP = '/tmp/countries_full.geojson';
const EPS = 0.02;          // Douglas-Peucker tolerance in degrees (~2 km)
const MIN_RING_AREA = 0.003; // deg^2, ~ (6 km)^2 — drop rings smaller than this
const DP = 1000;           // coordinate rounding: 3 decimal places (~110 m)

if (!fs.existsSync(TMP)) {
  console.error('Downloading full source…');
  execFileSync('curl', ['-sSL', '-f', '-o', TMP, SRC], { stdio: ['ignore', 'ignore', 'inherit'] });
}
const g = JSON.parse(fs.readFileSync(TMP, 'utf8'));

// Douglas-Peucker on an open polyline.
function dpOpen(pts, eps) {
  if (pts.length < 3) return pts;
  const keep = new Array(pts.length).fill(false);
  keep[0] = keep[pts.length - 1] = true;
  const st = [[0, pts.length - 1]];
  while (st.length) {
    const [s, e] = st.pop();
    let dmax = 0, idx = -1;
    const [x1, y1] = pts[s], [x2, y2] = pts[e];
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1e-12;
    for (let i = s + 1; i < e; i++) {
      const [px, py] = pts[i];
      const d = Math.abs((px - x1) * dy - (py - y1) * dx) / len;
      if (d > dmax) { dmax = d; idx = i; }
    }
    if (dmax > eps && idx > -1) { keep[idx] = true; st.push([s, idx], [idx, e]); }
  }
  return pts.filter((_, i) => keep[i]);
}
// DP on a closed ring: a shared start/end degenerates the perpendicular test,
// so split at the point farthest from the start and DP each half.
function dp(r, eps) {
  const closed = r.length > 1 && r[0][0] === r[r.length - 1][0] && r[0][1] === r[r.length - 1][1];
  if (!closed) return dpOpen(r, eps);
  const pts = r.slice(0, -1);
  if (pts.length < 4) return r;
  let far = 1, fd = -1;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[0][0], pts[i][1] - pts[0][1]);
    if (d > fd) { fd = d; far = i; }
  }
  const a = dpOpen(pts.slice(0, far + 1), eps), b = dpOpen(pts.slice(far), eps);
  const merged = a.concat(b.slice(1));
  merged.push([pts[0][0], pts[0][1]]);
  return merged;
}
function area(r) { let a = 0; for (let i = 0, j = r.length - 1; i < r.length; j = i++) a += (r[j][0] * r[i][1] - r[i][0] * r[j][1]); return Math.abs(a / 2); }
const rnd = v => Math.round(v * DP) / DP;
function ring(r) {
  let s = dp(r, EPS);
  if (s.length < 4) return null;
  if (area(s) < MIN_RING_AREA) return null;
  s = s.map(p => [rnd(p[0]), rnd(p[1])]);
  const f = s[0], l = s[s.length - 1];
  if (f[0] !== l[0] || f[1] !== l[1]) s.push([f[0], f[1]]);
  return s.length >= 4 ? s : null;
}
function poly(p) { const outer = ring(p[0]); if (!outer) return null; const rings = [outer]; for (let i = 1; i < p.length; i++) { const rr = ring(p[i]); if (rr) rings.push(rr); } return rings; }

for (const f of g.features) {
  const p = f.properties || {};
  f.properties = { name: p.name || p.ADMIN || p['ISO3166-1-Alpha-3'] || '' }; // wordmap only reads .name
  const gm = f.geometry;
  if (!gm) continue;
  if (gm.type === 'Polygon') gm.coordinates = poly(gm.coordinates) || [];
  else if (gm.type === 'MultiPolygon') gm.coordinates = gm.coordinates.map(poly).filter(Boolean);
}
const before = g.features.length;
g.features = g.features.filter(f => f.geometry && f.geometry.coordinates && f.geometry.coordinates.length);
const out = JSON.stringify(g);
fs.writeFileSync('countries.geojson', out);
let v = 0; const cnt = x => Array.isArray(x[0]) ? x.reduce((s, y) => s + cnt(y), 0) : 1;
for (const f of g.features) v += cnt(f.geometry.coordinates);
console.error(`countries.geojson: ${(out.length / 1024 / 1024).toFixed(2)} MB, features ${before}→${g.features.length}, vertices ${v}`);
