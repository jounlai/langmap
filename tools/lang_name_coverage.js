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
 * es and pt are a separate, older gap: 350 Word Map rows were added without
 * them. That is tracked with a ratchet rather than ignored — the count may go
 * down but never up, so the two languages can be filled in at leisure while a
 * new omission still fails immediately. Set the baseline to 0 and delete the
 * exception once they are complete.
 *
 * Usage: node tools/lang_name_coverage.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Word Map rows still owed a Spanish and Portuguese name. Ratchet: lower it as
// they are filled in; never raise it.
const ESPT_BASELINE = 350;

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

const hard = [];       // any UI other than es/pt
let espt = 0;          // the tracked es/pt backlog
const esptCodes = new Set();

for (const [map, codes] of targets) {
  for (const code of codes) {
    for (const ui of UIS) {
      if ((LANG_NAMES[ui] || {})[code]) continue;
      if (ui === 'es' || ui === 'pt') { espt++; esptCodes.add(code); continue; }
      hard.push({ map, code, ui });
    }
  }
}

const regressed = espt > ESPT_BASELINE * 2 ? espt : 0;  // 350 codes x {es, pt}
const violations = hard.length + (regressed ? 1 : 0);

if (CHECK) {
  console.log(`violations: ${violations}`);
  for (const v of hard) console.log(`  ${v.map} ${v.code} — no ${v.ui} name`);
  if (regressed) console.log(`  es/pt backlog grew to ${esptCodes.size} codes (baseline ${ESPT_BASELINE})`);
  process.exit(0);
}

console.log('language-name coverage — every map row needs a name in every UI\n');
if (!hard.length) console.log('clean — all 17 fully-translated UIs cover both maps.');
for (const v of hard) console.log(`  ${v.map.padEnd(9)} ${v.code.padEnd(10)} missing ${v.ui}`);
console.log(`\nes/pt backlog: ${esptCodes.size} Word Map rows (baseline ${ESPT_BASELINE})`
  + (regressed ? ' — GREW, this is a failure' : ''));
console.log(`${violations} violation(s).`);
process.exit(violations ? 1 : 0);
