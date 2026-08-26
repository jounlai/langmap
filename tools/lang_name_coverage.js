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

const gaps = [];

for (const [map, codes] of targets) {
  for (const code of codes) {
    for (const ui of UIS) {
      if (!(LANG_NAMES[ui] || {})[code]) gaps.push({ map, code, ui });
    }
  }
}

if (CHECK) {
  console.log(`violations: ${gaps.length}`);
  for (const v of gaps) console.log(`  ${v.map} ${v.code} — no ${v.ui} name`);
  process.exit(0);
}

console.log('language-name coverage — every map row needs a name in every UI\n');
if (!gaps.length) console.log(`clean — all ${UIS.length} UIs cover both maps.`);
for (const v of gaps) console.log(`  ${v.map.padEnd(9)} ${v.code.padEnd(10)} missing ${v.ui}`);
console.log(`\n${gaps.length} violation(s).`);
process.exit(gaps.length ? 1 : 0);
