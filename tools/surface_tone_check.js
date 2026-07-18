#!/usr/bin/env node
/**
 * surface_tone_check.js — Chao tone letters (˥ ˦ ˧ ˨ ˩, U+02E5–U+02E9) belong in
 * the IPA field, never in the SURFACE. A surface is an orthography or a
 * romanization; it does not carry phonetician's pitch-contour letters. Ersu was
 * the only language doing this (sun "ȵo˥ma˥", moon "ɬa˥pʰɛ˥"), which read as a
 * malformed headword and diverged from every sibling Qiangic language.
 *
 * (Acute/grave and other tone DIACRITICS are deliberately NOT flagged — they are
 * legitimate orthography in Vietnamese, Pinyin-with-marks, Yoruba, etc. Only the
 * Chao letters, which are an IPA-only device, are caught here.)
 *
 * Usage: node tools/surface_tone_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WORDS_DIR = path.resolve(__dirname, '..', 'words');
const CHECK = process.argv.includes('--check');
const CHAO = /[˥-˩]/;   // ˥ ˦ ˧ ˨ ˩

function loadWords() {
  const ctx = vm.createContext({});
  vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
  for (const f of fs.readdirSync(WORDS_DIR).filter(f => f.endsWith('.js'))) {
    vm.runInContext(fs.readFileSync(path.join(WORDS_DIR, f), 'utf8'), ctx, { filename: f });
  }
  return ctx.WORDS;
}

// A surface is field 0 of an array cell, or `.form` of an object cell.
function surfacesOf(node, code, out) {
  if (Array.isArray(node)) {
    if (typeof node[0] === 'string' && code) out.push([code, node[0]]);
    return;
  }
  if (node && typeof node === 'object') {
    if (typeof node.form === 'string' && code) out.push([code, node.form]);
    for (const k of Object.keys(node)) surfacesOf(node[k], k, out);
  }
}

const WORDS = loadWords();
const SKIP = new Set(['label', 'def', 'definition', 'note', 'partial', 'source', 'sources']);
const violations = [];
for (const id of Object.keys(WORDS)) {
  const w = WORDS[id];
  for (const k of Object.keys(w)) {
    if (SKIP.has(k)) continue;
    const out = [];
    surfacesOf(w[k], k, out);
    for (const [code, surf] of out) {
      if (CHAO.test(surf)) violations.push({ word: id, code, surf });
    }
  }
}

if (CHECK) {
  console.log(`violations: ${violations.length}`);
  for (const v of violations) console.log(`  ${v.word} ${v.code} "${v.surf}" — Chao tone letter in surface`);
  process.exit(0);
}
console.log('surface tone-letter check — Chao letters (˥˦˧˨˩) must not appear in a surface\n');
if (!violations.length) console.log('clean — no surface carries Chao tone letters.');
for (const v of violations) console.log(`  ${v.word.padEnd(10)} ${v.code.padEnd(8)} "${v.surf}"`);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
