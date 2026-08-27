#!/usr/bin/env node
/**
 * map_attribution_check.js — every CARTO basemap layer must credit BOTH CARTO
 * and OpenStreetMap.
 *
 * This is a licence condition, not a style preference: the CARTO free tier
 * (5M tile requests a month) is granted in exchange for keeping the CARTO and
 * OpenStreetMap attribution visible, and the tiles are OSM-derived. The Word
 * Map and Han Map default to their `flat` layer, and that layer credited only
 * CARTO — so the view almost every reader sees carried half the required
 * attribution (owner 2026-08-27). The `labels` layer next to it had both,
 * which is how it went unnoticed.
 *
 * Checked per tile URL rather than per page, because a page can define several
 * layers and only one of them is on screen at a time.
 *
 * Only the CARTO layers are judged. OpenTopoMap is a different provider with
 * its own line, already correct.
 *
 * Usage: node tools/map_attribution_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const PAGES = ['wordmap.html', 'hanmap.html', 'namemap.html'];

const violations = [];
let layers = 0;

for (const page of PAGES) {
    const p = path.join(ROOT, page);
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'utf8');
    const lines = src.split('\n');
    lines.forEach((line, i) => {
        if (!/cartocdn\.com/.test(line)) return;
        layers++;
        // The attribution sits either on the same line (L.tileLayer(url, {...}))
        // or within the next few lines (the TILE_LAYERS { url, opts } shape).
        const window = lines.slice(i, i + 4).join(' ');
        const m = window.match(/attribution:\s*'([^']*)'/);
        const attr = m ? m[1] : null;
        const where = `${page}:${i + 1}`;
        if (!attr) { violations.push(`${where} CARTO tile layer with no attribution within 4 lines`); return; }
        const hasCarto = /carto/i.test(attr);
        const hasOsm = /openstreetmap|\bOSM\b/i.test(attr);
        if (!hasCarto) violations.push(`${where} attribution does not credit CARTO: "${attr.slice(0, 70)}"`);
        if (!hasOsm) violations.push(`${where} attribution does not credit OpenStreetMap: "${attr.slice(0, 70)}"`);
    });
}

if (CHECK) {
    console.log(`violations: ${violations.length}`);
    for (const v of violations) console.log('  ' + v);
    if (!violations.length) console.log(`  ${layers} CARTO layer(s) credit both CARTO and OpenStreetMap`);
    process.exit(0);
}
console.log('map attribution — every CARTO layer credits CARTO and OpenStreetMap\n');
if (!violations.length) console.log(`clean — ${layers} CARTO tile layer(s), all crediting both.`);
for (const v of violations) console.log('  ' + v);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
