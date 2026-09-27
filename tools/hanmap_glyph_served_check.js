#!/usr/bin/env node
/**
 * hanmap_glyph_served_check.js — every rare CJK character the Han Map shows in
 * a `native` cell must be claimed by a self-hosted font on hanmap.html.
 *
 * font_coverage_check.js audits wordmap.html. The Han Map loads a different
 * set of subsets, so a glyph can be served on one page and be tofu on the
 * other, and nothing noticed: 中's Chữ Nôm 𡧲 giữa had been printed on the Han
 * Map with no font behind it, found by hand on 2026-09-27 while verifying the
 * Nôm and Sawndip rows.
 *
 * "Rare" means outside the CJK Unified block (U+4E00–U+9FFF), which every CJK
 * device font carries — and which, per font_range_overreach_check, a subset
 * must not claim anyway. Everything from Ext A upward has to be served.
 *
 * Run: node tools/hanmap_glyph_served_check.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const html = fs.readFileSync(path.join(ROOT, 'hanmap.html'), 'utf8');
const served = new Set();
for (const m of html.matchAll(/unicode-range:([^;]*);/g)) {
    for (const t of m[1].matchAll(/U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?/g)) {
        const a = parseInt(t[1], 16), z = t[2] ? parseInt(t[2], 16) : a;
        if (z - a < 6000) for (let c = a; c <= z; c++) served.add(c);
    }
}
const rareCJK = (cp) =>
    (cp >= 0x3400 && cp <= 0x4DBF) || (cp >= 0x20000 && cp <= 0x323AF);

global.window = {};
// eslint-disable-next-line no-eval
eval(fs.readFileSync(path.join(ROOT, 'hanmap_data.js'), 'utf8'));
const { HAN_DATA, HAN_LIST } = window;

let checked = 0;
const bad = [];
for (const c of HAN_LIST) {
    const nat = HAN_DATA[c].native || {};
    for (const [row, g] of Object.entries(nat)) {
        for (const ch of String(g)) {
            const cp = ch.codePointAt(0);
            if (!rareCJK(cp)) continue;
            checked++;
            if (!served.has(cp)) bad.push(`  ${row} ${c}  ${ch} U+${cp.toString(16).toUpperCase()}`);
        }
    }
}
console.log(`Han Map rare-CJK glyphs — ${checked} checked against hanmap.html's subsets`);
if (bad.length) console.log(bad.join('\n'));
console.log(`unserved: ${bad.length}`);
process.exit(process.argv.includes('--strict') && bad.length ? 1 : 0);
