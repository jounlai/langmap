#!/usr/bin/env node
/**
 * chao_repeat_check.js — a Chao tone sequence must not repeat the same letter
 * three times.
 *
 * Chao letters spell a pitch CONTOUR: ˥˧ falls from 5 to 3, ˨˩˧ dips. Writing
 * the same level three times says nothing the second letter did not already
 * say, and it is not a value any tone system has. It is what a half-finished
 * edit looks like.
 *
 * Bai (bca) had nine of them, all ˨˨˨ and all on historical entering-tone
 * syllables — 一 六 十 木 足 目 肉 食 立 — which is exactly the set that shares
 * one tone, so it was one value written wrong nine times rather than nine
 * mistakes. The Han Map trivia article `bai-language-script` independently
 * writes that reading as mu²² (review 463), which settles it at ˨˨.
 *
 * Covers the Word Map, the Han Map (main readings and variants) and the
 * NameMap; the Lang Map has no IPA field.
 *
 * Usage: node tools/chao_repeat_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const TRIPLE = /([˥˦˧˨˩])\1\1/;

const violations = [];

// ---- Word Map ----
{
  const ctx = vm.createContext({});
  vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
  const dir = path.join(ROOT, 'words');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')))
    vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
  for (const id of Object.keys(ctx.WORDS))
    for (const [code, e] of Object.entries((ctx.WORDS[id] || {}).data || {})) {
      const cells = Array.isArray(e) ? [e[1] || ''] : [e.ipa || ''].concat((e.alt || []).map((a) => a.ipa || ''));
      for (const ipa of cells) if (TRIPLE.test(ipa)) violations.push({ map: 'WordMap', id: `${id}/${code}`, ipa });
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
      if (TRIPLE.test(String(ipa))) violations.push({ map: 'HanMap', id: `${ch}/${code}`, ipa });
    for (const [code, arr] of Object.entries(HV[ch] || {}))
      for (const v of arr)
        if (v.ipa && TRIPLE.test(v.ipa)) violations.push({ map: 'HanMap', id: `${ch}/${code} variant`, ipa: v.ipa });
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
        if (TRIPLE.test(String(f.ipa || ''))) violations.push({ map: 'NameMap', id: `${id}/${cell}`, ipa: f.ipa });
}

if (CHECK) {
  console.log(`violations: ${violations.length}`);
  for (const v of violations) console.log(`  [${v.map}] ${v.id}  /${v.ipa}/ — same Chao letter three times`);
  process.exit(0);
}
console.log('Chao repeat check — a tone spells a contour, not the same level three times\n');
if (!violations.length) console.log('clean — no IPA repeats a Chao letter three times.');
for (const v of violations) console.log(`  [${v.map}] ${v.id.padEnd(22)} /${v.ipa}/`);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
