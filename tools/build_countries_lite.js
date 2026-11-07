#!/usr/bin/env node
/**
 * build_countries_lite.js — the country borders the browser actually downloads.
 *
 * countries.geojson stays the reference copy: the guards and the SEO minimaps
 * read it. Readers get countries_lite.js, the same 237 shapes with coordinates
 * on a 0.01 degree grid, stored as differences between neighbouring points.
 * Brotli takes it from 399 KB to about 196 KB. On slow 4G those 200 KB are a
 * full second, and the tint layer was the last thing on every map to appear.
 *
 * The grid moves a point by at most 0.005 degrees, about 3.6 px at zoom 10, the
 * deepest any map goes. Both neighbours of a border snap to the same grid
 * point, so no gap opens between them. Nothing is dropped or redrawn.
 *
 * The file is JSON, named .js so nginx gives it the immutable cache header it
 * gives scripts; .geojson gets no Cache-Control at all. map_boot.js decodes it
 * and asks for it by the hash written here, so a rebuild cannot be served stale.
 *
 * Format: [[name, [polygon...]]...]; a polygon is a list of rings, a ring is
 * [dx0, dy0, dx1, dy1, ...] in hundredths of a degree, starting from 0,0.
 *
 * Usage: node tools/build_countries_lite.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'countries_lite.js');
const BOOT = path.join(ROOT, 'map_boot.js');
const S = 100;

const g = JSON.parse(fs.readFileSync(path.join(ROOT, 'countries.geojson'), 'utf8'));
const polys = f => (f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates);
function ring(r) {
    const d = [];
    let a = 0, b = 0, first = true;
    for (const c of r) {
        const x = Math.round(c[0] * S), y = Math.round(c[1] * S);
        if (!first && x === a && y === b) continue;
        d.push(x - a, y - b);
        a = x; b = y; first = false;
    }
    return d;
}
const text = JSON.stringify(g.features.map(f => [f.properties.name, polys(f).map(p => p.map(ring))])) + '\n';
const hash = crypto.createHash('sha1').update(text).digest('hex').slice(0, 10);
const boot = fs.readFileSync(BOOT, 'utf8');
const URL_RE = /countries_lite\.js\?v=[0-9a-f]+/;

if (process.argv.includes('--check')) {
    const stale = (fs.existsSync(OUT) && fs.readFileSync(OUT, 'utf8') === text ? 0 : 1)
        + (boot.includes('countries_lite.js?v=' + hash) ? 0 : 1);
    console.log('stale: ' + stale);
} else {
    fs.writeFileSync(OUT, text);
    fs.writeFileSync(BOOT, boot.replace(URL_RE, 'countries_lite.js?v=' + hash));
    console.log(`countries_lite.js: ${(text.length / 1024).toFixed(0)} KB, v=${hash}`);
}
