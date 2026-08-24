#!/usr/bin/env node
/**
 * ipa_tone_digit_check.js — tone in the IPA field is written with Chao letters
 * (˥ ˦ ˧ ˨ ˩, U+02E5–U+02E9), never with digits. This is the mirror of
 * surface_tone_check.js, which stops Chao letters leaking the other way into a
 * surface.
 *
 * Two notations get caught:
 *   - superscript digits, the Sinological convention: 风 "fɵŋ³³"  (yue_ts)
 *   - bare ASCII digits, usually a form field pasted into the IPA one:
 *     一 "ʒa21"  (atb, whose surface "ra21" carries the same leak)
 *
 * Both were invisible to every other guard, including the tone-category
 * consistency check, which cannot compare a digit string against a Chao string
 * and so silently passed the row.
 *
 * Superscript LETTERS are untouched — ʰ ʷ ʲ ⁿ ᶹ are ordinary IPA.
 *
 * NOT wired into check_all.js yet: two rows (cjy_xz Xinzhou Jin, atb Zaiwa) are
 * still non-conforming and cannot be fixed by notation alone. cjy_xz mixes two
 * incompatible tone systems — its superscript cells say 上聲 = 53 (水, 手, 眼, 好)
 * while its Chao cells say 上聲 = 313 (土, 耳) — so converting the digits would
 * just freeze a contradiction. atb writes tone digits into the SURFACE too
 * ("tui21", "my51") where Zaiwa orthography marks tone with final letters, so
 * that row needs re-romanising, not re-transcribing. Wire this in once both are
 * sourced; run it by hand until then.
 *
 * Usage: node tools/ipa_tone_digit_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WORDS_DIR = path.resolve(__dirname, '..', 'words');
const CHECK = process.argv.includes('--check');
const SUPER = /[⁰¹²³⁴-⁹]/;   // ⁰¹²³⁴⁵⁶⁷⁸⁹
const ASCII = /[0-9]/;

function loadWords() {
  const ctx = vm.createContext({});
  vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
  for (const f of fs.readdirSync(WORDS_DIR).filter(f => f.endsWith('.js'))) {
    vm.runInContext(fs.readFileSync(path.join(WORDS_DIR, f), 'utf8'), ctx, { filename: f });
  }
  return ctx.WORDS;
}

// An IPA is field 1 of an array cell, or `.ipa` of an object cell.
function ipasOf(node, code, out) {
  if (Array.isArray(node)) {
    if (typeof node[1] === 'string' && code) out.push([code, node[1]]);
    return;
  }
  if (node && typeof node === 'object') {
    if (typeof node.ipa === 'string' && code) out.push([code, node.ipa]);
    for (const k of Object.keys(node)) ipasOf(node[k], k, out);
  }
}

const WORDS = loadWords();
const SKIP = new Set(['label', 'def', 'definition', 'note', 'partial', 'source', 'sources', 'routes']);
const violations = [];
for (const id of Object.keys(WORDS)) {
  const w = WORDS[id];
  for (const k of Object.keys(w)) {
    if (SKIP.has(k)) continue;
    const out = [];
    ipasOf(w[k], k, out);
    for (const [code, ipa] of out) {
      if (SUPER.test(ipa)) violations.push({ word: id, code, ipa, kind: 'superscript digit' });
      else if (ASCII.test(ipa)) violations.push({ word: id, code, ipa, kind: 'ASCII digit' });
    }
  }
}

if (CHECK) {
  console.log(`violations: ${violations.length}`);
  for (const v of violations) console.log(`  ${v.word} ${v.code} "${v.ipa}" — ${v.kind} in IPA`);
  process.exit(0);
}
console.log('IPA tone-digit check — tone in IPA is written with Chao letters, not digits\n');
if (!violations.length) console.log('clean — no IPA field carries a tone digit.');
const byRow = {};
for (const v of violations) (byRow[v.code] = byRow[v.code] || []).push(v);
for (const [code, vs] of Object.entries(byRow).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${code}  (${vs.length})`);
  for (const v of vs) console.log(`      ${v.word.padEnd(10)} "${v.ipa}"  ${v.kind}`);
}
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
