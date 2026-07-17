#!/usr/bin/env node
/**
 * script_family_check.js — for every language code, compare the writing system
 * a word file uses against the writing system the REST of the corpus uses for
 * that same code. Catches cells that fall back to Latin romanization (or any
 * other script) where the atlas has settled on a native script — e.g. Old
 * Javanese `kaw` is written in Javanese script (ꦄꦏꦸ) everywhere, so a
 * romanized "ḍeṅ" is a deviation.
 *
 * Also flags parenthetical romanization inside a surface ("𩻐 (mắm)"), which the
 * atlas keeps out of the surface field.
 *
 * Usage: node tools/script_family_check.js [--check] [word ...]
 *   --check  print "violations: N" and exit 0 (for check_all)
 *   word...  restrict the audited words (default: every word)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const WORDS_DIR = path.join(ROOT, 'words');
const argv = process.argv.slice(2);
const CHECK = argv.includes('--check');
const ONLY = argv.filter(a => !a.startsWith('--'));

// Scripts we can tell apart. Order matters only for reporting.
const SCRIPTS = ['Latin','Han','Hiragana','Katakana','Hangul','Javanese','Balinese',
  'Sundanese','Tagalog','Buhid','Hanunoo','Tagbanwa','Thai','Lao','Khmer','Myanmar',
  'Tai_Tham','Tai_Viet','New_Tai_Lue','Cham','Arabic','Hebrew','Syriac','Cyrillic',
  'Greek','Coptic','Devanagari','Bengali','Gurmukhi','Gujarati','Oriya','Tamil',
  'Telugu','Kannada','Malayalam','Sinhala','Tibetan','Mongolian','Georgian',
  'Armenian','Ethiopic','Cherokee','Cuneiform','Egyptian_Hieroglyphs','Old_Persian',
  'Ugaritic','Phoenician','Gothic','Runic','Ogham','Avestan','Brahmi','Kharoshthi',
  'Linear_B','Old_Turkic','Phags_Pa','Yi','Vai','Nko','Thaana','Adlam','Bopomofo',
  'Meroitic_Cursive','Old_South_Arabian','Inscriptional_Pahlavi','Manichaean',
  'Sogdian','Tangut','Khitan_Small_Script','Nushu','Limbu','Mandaic','Samaritan'];
const RE = {};
for (const s of SCRIPTS) { try { RE[s] = new RegExp(`\\p{Script=${s}}`, 'u'); } catch (e) {} }

function scriptsOf(str) {
  const counts = {};
  for (const ch of str) {
    if (/[\s\p{P}\p{S}\p{N}]/u.test(ch)) continue;   // punctuation/space/digits/symbols
    for (const s of SCRIPTS) { if (RE[s] && RE[s].test(ch)) { counts[s] = (counts[s] || 0) + 1; break; } }
  }
  return counts;
}
function dominant(counts) {
  let best = null, n = 0;
  for (const k of Object.keys(counts)) if (counts[k] > n) { n = counts[k]; best = k; }
  return best;
}

function loadWords() {
  const ctx = vm.createContext({});
  vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
  for (const f of fs.readdirSync(WORDS_DIR).filter(f => f.endsWith('.js'))) {
    vm.runInContext(fs.readFileSync(path.join(WORDS_DIR, f), 'utf8'), ctx, { filename: f });
  }
  return ctx.WORDS;
}
// Collect surfaces per code. Skips label/def prose (those are keyed by UI lang,
// not language code, and live under `label`/`def`).
const SKIP_TOP = new Set(['label', 'def', 'note', 'partial', 'source', 'sources']);
function collect(node, out, keyHint) {
  if (Array.isArray(node)) {
    if (typeof node[0] === 'string' && keyHint) (out[keyHint] = out[keyHint] || []).push(node[0]);
    return;
  }
  if (node && typeof node === 'object') {
    if (typeof node.form === 'string' && keyHint) (out[keyHint] = out[keyHint] || []).push(node.form);
    for (const k of Object.keys(node)) collect(node[k], out, k);
  }
}
function cellsOf(wordObj) {
  const per = {};
  for (const k of Object.keys(wordObj)) {
    if (SKIP_TOP.has(k)) continue;
    collect(wordObj[k], per, k);
  }
  return per;
}

const WORDS = loadWords();
const ids = Object.keys(WORDS);
const audited = ONLY.length ? ONLY : ids;

// Reference: the script each code uses across every word EXCEPT the one audited.
const refCounts = {};   // code -> {script: n}
const perWord = {};     // wid -> {code: [surfaces]}
for (const id of ids) perWord[id] = cellsOf(WORDS[id]);

const violations = [];
for (const wid of audited) {
  for (const code of Object.keys(perWord[wid] || {})) {
    // Build reference from the other words.
    const ref = {};
    for (const other of ids) {
      if (other === wid) continue;
      for (const s of (perWord[other][code] || [])) {
        const c = scriptsOf(s);
        for (const k of Object.keys(c)) ref[k] = (ref[k] || 0) + c[k];
      }
    }
    const refScript = dominant(ref);
    if (!refScript) continue;                       // no evidence elsewhere
    const refTotal = Object.values(ref).reduce((a, b) => a + b, 0);
    const refShare = ref[refScript] / refTotal;
    // Only enforce where the corpus is UNANIMOUS for this code. Many codes mix
    // scripts on purpose — za (Latin + Sawndip 古壮字), zkt (Latin + Khitan
    // small script), ja_kanbun / ojp (Han + kana), blt, kho … — and a majority
    // rule flags those deliberate cells as errors. The real bugs this catches
    // (akk 100% cuneiform, kaw 100% Javanese) are unanimous, so demand that.
    if (refShare < 1 || refTotal < 4) continue;

    for (const surf of new Set(perWord[wid][code] || [])) {
      if (surf === '—' || !surf.trim()) continue;
      const got = dominant(scriptsOf(surf));
      if (!got) continue;
      if (got !== refScript) {
        violations.push({ wid, code, surf, got, want: refScript,
          why: `corpus writes ${code} in ${refScript} (${Math.round(refShare*100)}% of ${refTotal} chars)` });
      } else if (/\([\p{Script=Latin} .'ʼ-]+\)/u.test(surf) && refScript !== 'Latin') {
        violations.push({ wid, code, surf, got, want: refScript,
          why: 'parenthetical Latin romanization inside a non-Latin surface' });
      }
    }
  }
}

if (CHECK) {
  console.log(`violations: ${violations.length}`);
  if (violations.length) for (const v of violations) console.log(`  ${v.wid} ${v.code} "${v.surf}" — ${v.got}, expected ${v.want} (${v.why})`);
  process.exit(0);
}
console.log('script-family check — surface writing system vs the rest of the corpus\n');
if (!violations.length) console.log('clean — every audited surface matches the corpus script for its code.');
for (const v of violations) {
  console.log(`${v.wid.padEnd(9)} ${v.code.padEnd(10)} "${v.surf}"`);
  console.log(`          got ${v.got}, expected ${v.want} — ${v.why}\n`);
}
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
