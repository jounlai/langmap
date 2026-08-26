#!/usr/bin/env node
/**
 * lang_name_coverage.js — every language on either map must have a name in
 * every UI language.
 *
 * When LANG_NAMES[ui][code] is missing, nothing breaks and nothing is logged:
 * the page falls back to the English (or native) name, so a Korean reader gets
 * a comparison table reading 민북어 · 푸셴 민어 · Min Zhong (Yong'an) · 민동어 ·
 * Guibei Pinghua (Guilin) — three rows in Korean and three in English, with no
 * way to tell from the Japanese or English page that anything is wrong. Fifteen
 * Han Map varieties had been added that way (owner 2026-08-26).
 *
 * es and pt were 350 Word Map rows behind when this was written, held on a
 * ratchet; they were filled in the same day and the exception is gone. All 19
 * UIs now cover both maps, and any omission fails immediately.
 *
 * It also rejects duplicate keys. A JS object literal accepts the same key
 * twice and silently keeps the last one, so lang_names.js had 14 codes written
 * out twice per UI — 76 of those pairs disagreeing — and which spelling reached
 * the reader was decided by file order rather than by anyone (owner 2026-08-26).
 *
 * Usage: node tools/lang_name_coverage.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

function ctxOf(file, prep) {
  const c = vm.createContext({});
  vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, file), 'utf8')
    .replace(/^const /gm, 'var ') + ';' + (prep || ''), c);
  return c;
}

const LANG_NAMES = vm.runInContext(
  'typeof LANG_NAMES!=="undefined" ? LANG_NAMES : window.LANG_NAMES', ctxOf('lang_names.js'));
const LANG_DATA = vm.runInContext('LANG_DATA', ctxOf('wordmap_data.js'));
const HAN_LANGS = vm.runInContext('HAN_LANGS', ctxOf('hanmap_data.js'));

const hanCodes = Array.isArray(HAN_LANGS)
  ? HAN_LANGS.map((x) => (typeof x === 'string' ? x : x.code))
  : Object.keys(HAN_LANGS);

const UIS = Object.keys(LANG_NAMES);
const targets = [
  ['Word Map', Object.keys(LANG_DATA)],
  ['Han Map', hanCodes],
];

// LANG_NAMES read through the vm sees only the surviving value, so duplicates
// have to be found in the source text.
function duplicateKeys() {
  const src = fs.readFileSync(path.join(ROOT, 'lang_names.js'), 'utf8');
  const body = src.slice(src.indexOf('const LANG_NAMES = {'));
  const heads = [...body.matchAll(/\n    ([a-z_]{2,5}): \{/g)];
  const dups = [];
  heads.forEach((h, i) => {
    const end = i + 1 < heads.length ? heads[i + 1].index : body.indexOf('\n};', h.index);
    const seen = new Set();
    for (const m of body.slice(h.index, end)
        .matchAll(/[{,]\s*([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(["'])(?:\\.|(?!\2).)*\2/g)) {
      if (seen.has(m[1])) dups.push({ ui: h[1], code: m[1] });
      seen.add(m[1]);
    }
  });
  return dups;
}

const dups = duplicateKeys();
const gaps = [];

for (const [map, codes] of targets) {
  for (const code of codes) {
    for (const ui of UIS) {
      if (!(LANG_NAMES[ui] || {})[code]) gaps.push({ map, code, ui });
    }
  }
}

const total = gaps.length + dups.length;

if (CHECK) {
  console.log(`violations: ${total}`);
  for (const v of gaps) console.log(`  ${v.map} ${v.code} — no ${v.ui} name`);
  for (const d of dups) console.log(`  ${d.ui}.${d.code} — written twice; the later one silently wins`);
  process.exit(0);
}

console.log('language-name coverage — every map row needs a name in every UI\n');
if (!total) console.log(`clean — all ${UIS.length} UIs cover both maps, one entry per code.`);
for (const v of gaps) console.log(`  ${v.map.padEnd(9)} ${v.code.padEnd(10)} missing ${v.ui}`);
for (const d of dups) console.log(`  duplicate  ${d.ui.padEnd(4)} ${d.code.padEnd(10)} written twice`);
console.log(`\n${total} violation(s).`);
process.exit(total ? 1 : 0);
