#!/usr/bin/env node
/*
 * timemap_tibetan_subset_check.js — Time Map self-hosts a subset of Noto Serif
 * Tibetan (fonts/NotoSerifTibetan-timemap*.woff2), and its @font-face
 * unicode-range names exactly the characters that subset carries.
 *
 * A Tibetan word added later with a sign the subset lacks does not fall back
 * cleanly: a stack cannot be shaped across two fonts, so the one missing
 * subjoined letter or vowel shows as a dotted circle. This lists every
 * Tibetan codepoint the page can print — the literal text in timemap.html,
 * timemap_calendars.js and timemap_i18n/, plus the digits U+0F20-0F29 built
 * at runtime — and fails on any the unicode-range does not claim, or when the
 * two weights' ranges disagree. (Rally review r2, 2026-10-17.)
 *
 * Fix: re-run pyftsubset with the new characters for both weights and list
 * them in both unicode-range descriptors.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const html = fs.readFileSync(path.join(ROOT, 'timemap.html'), 'utf8');
const ranges = [...html.matchAll(/NotoSerifTibetan-timemap[^)]*\)[^;]*;\s*unicode-range:\s*([^;]+);/g)].map((m) => m[1].trim());
const claimed = new Set();
for (const part of (ranges[0] || '').split(',')) {
    const m = /U\+([0-9A-F]+)(?:-([0-9A-F]+))?/i.exec(part.trim());
    if (!m) continue;
    const a = parseInt(m[1], 16), b = parseInt(m[2] || m[1], 16);
    for (let c = a; c <= b; c++) claimed.add(c);
}

const files = ['timemap.html', 'timemap_calendars.js'];
const i18n = path.join(ROOT, 'timemap_i18n');
if (fs.existsSync(i18n)) for (const f of fs.readdirSync(i18n)) if (f.endsWith('.js')) files.push('timemap_i18n/' + f);
const used = new Map();
for (const f of files) {
    const s = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const ch of s.match(/[ༀ-࿿]/gu) || []) {
        const c = ch.codePointAt(0);
        if (!used.has(c)) used.set(c, f);
    }
    for (const m of s.matchAll(/\\u0[fF]([0-9a-fA-F]{2})/g)) {
        const c = 0x0F00 + parseInt(m[1], 16);
        if (!used.has(c)) used.set(c, f + ' (escape)');
    }
}
for (let c = 0x0F20; c <= 0x0F29; c++) if (!used.has(c)) used.set(c, 'runtime digits');

let problems = 0;
if (ranges.length !== 2) { console.log('expected 2 @font-face rules for the Tibetan subset, found ' + ranges.length); problems++; }
else if (ranges[0] !== ranges[1]) { console.log('the 400 and 700 Tibetan @font-face rules claim different unicode-ranges'); problems++; }
for (const [c, f] of [...used].sort((x, y) => x[0] - y[0])) {
    if (claimed.has(c)) continue;
    console.log('  U+' + c.toString(16).toUpperCase().padStart(4, '0') + ' (' + String.fromCodePoint(c) + ') in ' + f + ' is not in the subset');
    problems++;
}
console.log(used.size + ' Tibetan codepoints printed, ' + claimed.size + ' claimed');
console.log('problems: ' + problems);
