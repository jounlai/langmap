#!/usr/bin/env node
/**
 * ipa_digit_check.js — an IPA field must not write tone as a digit.
 *
 * The house convention is Chao tone letters (˥˦˧˨˩) in the IPA and nothing
 * else; digits belong to a romanization, which is what the SURFACE field is
 * for. Two Word Map rows were writing them anyway, and both were inconsistent
 * with themselves rather than following a different convention:
 *
 *   cjy_xz  bird niau˥˧   but  cat miau⁵³      — same tone, two notations
 *   atb     fish ŋa˥      but  sun ni⁵⁵
 *
 * 40 cells across those two rows (review 458). The Han Map had none, so this
 * never showed up as a cross-map difference either — only as a per-row split.
 *
 * The check is notation-only: it does not care WHICH tone is written, just
 * that it is not written with a digit. The conversion is 1:1
 * (1→˩ 2→˨ 3→˧ 4→˦ 5→˥) and carries no linguistic judgement.
 *
 * Covers all four datasets: Word Map, Han Map (main + variants), NameMap, and
 * the Lang Map has no IPA field.
 *
 * Usage: node tools/ipa_digit_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const DIGIT = /[0-9⁰¹²³⁴⁵⁶⁷⁸⁹]/;

const violations = [];

// ---- Word Map ----
{
  const ctx = vm.createContext({});
  vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
  const dir = path.join(ROOT, 'words');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')))
    vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
  for (const id of Object.keys(ctx.WORDS)) {
    for (const [code, e] of Object.entries((ctx.WORDS[id] || {}).data || {})) {
      const cells = Array.isArray(e)
        ? [e[1] || '']
        : [e.ipa || ''].concat((e.alt || []).map((a) => a.ipa || ''));
      for (const ipa of cells) if (DIGIT.test(ipa)) violations.push({ map: 'WordMap', id: `${id}/${code}`, ipa });
    }
  }
}

// ---- Han Map ----
{
  const ctx = vm.createContext({});
  vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, 'hanmap_data.js'), 'utf8')
    .replace(/^const /gm, 'var ') + ';', ctx);
  const HD = vm.runInContext('HAN_DATA', ctx);
  const HV = vm.runInContext('HAN_VARIANTS', ctx);
  for (const ch of Object.keys(HD)) {
    for (const [code, ipa] of Object.entries(HD[ch].ipa || {}))
      if (DIGIT.test(String(ipa))) violations.push({ map: 'HanMap', id: `${ch}/${code}`, ipa });
    for (const [code, arr] of Object.entries(HV[ch] || {}))
      for (const v of arr)
        if (v.ipa && DIGIT.test(v.ipa)) violations.push({ map: 'HanMap', id: `${ch}/${code} variant`, ipa: v.ipa });
  }
}

// ---- NameMap ----
{
  const ctx = vm.createContext({});
  for (const f of ['namemap_data.js', 'namemap_names_ext.js']) {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) vm.runInContext('var window=this;' + fs.readFileSync(p, 'utf8').replace(/^const /gm, 'var ') + ';', ctx, { filename: f });
  }
  const NAMES = vm.runInContext('typeof NAMES!=="undefined" ? NAMES : {}', ctx);
  for (const id of Object.keys(NAMES))
    for (const [cell, arr] of Object.entries(NAMES[id].forms || {}))
      for (const f of (Array.isArray(arr) ? arr : [arr]))
        if (DIGIT.test(String(f.ipa || ''))) violations.push({ map: 'NameMap', id: `${id}/${cell}`, ipa: f.ipa });
}

if (CHECK) {
  console.log(`violations: ${violations.length}`);
  for (const v of violations) console.log(`  [${v.map}] ${v.id}  /${v.ipa}/ — digit tone in IPA, use Chao letters`);
  process.exit(0);
}
console.log('IPA digit check — tone is written with Chao letters, never digits\n');
if (!violations.length) console.log('clean — no IPA field carries a digit (WordMap + HanMap + NameMap).');
for (const v of violations) console.log(`  [${v.map}] ${v.id.padEnd(22)} /${v.ipa}/`);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
