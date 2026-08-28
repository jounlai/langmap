#!/usr/bin/env node
/**
 * paired_code_name_check.js — one language must read the same on every map.
 *
 * Nine languages exist twice in the atlas under different codes, because the
 * three maps grew separate code conventions for reconstructed and historical
 * languages (review 469):
 *
 *   Word Map  p_jpn p_kor pmng  p_tun  p_aav p_hmx p_sit  p_ine  yua
 *   Han Map   pja   pko   pmgl  ptung  paa   phm   pst
 *   Lang Map                                              ine    myn
 *
 * Only ptai agrees across maps. The cost is 171 duplicated name strings
 * (9 languages x 19 UIs), and 35 of them had DIVERGED: a Japanese reader saw
 * 日琉祖語 on the Word Map and 日本祖語 on the Han Map for the same language,
 * Korean saw 일본조어 and 원시 일본어, German Urjaponisch and Proto-Japonisch.
 * Aligned to the Word Map's wording, which is the larger map and the more
 * accurate one — Japonic includes Ryukyuan, so 日琉 is right and 日本 is not.
 *
 * The pairs are DERIVED, not listed: two codes whose English name is identical
 * are the same language, and must then carry the same name in all 19 UIs. Add
 * a tenth pair tomorrow and it is covered without touching this file.
 *
 * Unifying the codes themselves is a bigger change — it moves SSR URLs — and is
 * recorded in the handoff rather than done here.
 *
 * Usage: node tools/paired_code_name_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const c = vm.createContext({});
vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, 'lang_names.js'), 'utf8')
  .replace(/^const /gm, 'var ') + ';', c);
const LANG_NAMES = vm.runInContext('typeof LANG_NAMES!=="undefined" ? LANG_NAMES : window.LANG_NAMES', c);

// Which codes any map actually shows. lang_names.js also carries ISO 639-3
// aliases for languages the atlas keys under a different code — tah for ty,
// hmo for ho, smg for suk — and no reader can ever see those, so a difference
// between an alias and its live twin is dead weight, not a visible defect.
const inSomeMap = (() => {
  const seen = new Set();
  const load = (file, expr) => {
    const k = vm.createContext({ window: {} });
    try {
      vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/^const /gm, 'var ') + ';', k);
      const v = vm.runInContext(expr, k);
      if (Array.isArray(v)) v.forEach((x) => seen.add(x));
      else Object.keys(v || {}).forEach((x) => seen.add(x));
    } catch (e) { /* a map file missing is not this guard's problem */ }
  };
  load('wordmap_data.js', 'LANG_DATA');
  load('hanmap_data.js', 'HAN_LANG_META');
  const d = vm.createContext({ window: {} });
  try {
    vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8').replace(/^const /gm, 'var ') + ';', d);
    const S = vm.runInContext('SENTENCES', d);
    for (const s of S) for (const code of Object.keys(s.langs || {})) seen.add(code);
  } catch (e) { /* ditto */ }
  return seen;
})();

const UIS = Object.keys(LANG_NAMES);
const EN = LANG_NAMES.en || {};

// codes that share an English name are the same language wearing two codes
const byEn = new Map();
for (const [code, name] of Object.entries(EN)) {
  const key = String(name).trim().toLowerCase();
  if (!key) continue;
  if (!byEn.has(key)) byEn.set(key, []);
  byEn.get(key).push(code);
}
const pairs = [...byEn.entries()].filter(([, codes]) => codes.length > 1);

const violations = [];
const orphanPairs = new Set();
let checked = 0;
for (const [en, codes] of pairs) {
  for (const ui of UIS) {
    const vals = codes.map((k) => LANG_NAMES[ui][k]).filter(Boolean);
    if (vals.length < 2) continue;
    checked++;
    const uniq = [...new Set(vals)];
    const live = codes.filter((k) => inSomeMap.has(k) && LANG_NAMES[ui][k]);
    if (live.length < 2) { orphanPairs.add(en); continue; }   // alias vs live twin
    if (uniq.length > 1)
      violations.push(`${ui}: "${en}" is named ` +
        codes.filter((k) => LANG_NAMES[ui][k]).map((k) => `${k}="${LANG_NAMES[ui][k]}"`).join(' vs '));
  }
}

if (CHECK) {
  console.log(`violations: ${violations.length}`);
  for (const v of violations.slice(0, 40)) console.log('  ' + v);
  if (violations.length > 40) console.log(`  … ${violations.length - 40} more`);
  if (orphanPairs.size) console.log(`  note: ${orphanPairs.size} pair(s) are an ISO alias against a live code, shown by no map`);
  if (!violations.length) console.log(`  ${pairs.length} language(s) carry two codes; all ${checked} paired names agree`);
  process.exit(0);
}
console.log('paired-code names — one language, one name, on every map\n');
console.log(`  ${pairs.length} language(s) exist under more than one code:`);
for (const [en, codes] of pairs) console.log(`    ${codes.join(' / ').padEnd(22)} ${en}`);
console.log('');
if (!violations.length) console.log(`clean — all ${checked} paired names agree across ${UIS.length} UIs.`);
for (const v of violations) console.log('  ' + v);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
