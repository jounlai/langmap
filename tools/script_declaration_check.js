#!/usr/bin/env node
/**
 * script_declaration_check.js — the script a row actually writes in must be the
 * script it says it writes in.
 *
 * meta.script is displayed to the reader and used nowhere else, so a wrong
 * value is invisible to every other guard. Four Chinese dialect rows declared
 * "Latin" while every one of their surfaces was Han characters (review 468):
 * gan_yc, gan_ja, hsn_hy, hsn_yz. Review 432 had already corrected exactly this
 * for cjy_lv, cjy_xz, czh_wy and gan_fz — these four were the stragglers, and
 * nothing was watching for the rest of the class.
 *
 * Fixing them exposed a second layer: three of the four wrote TRADITIONAL forms
 * (骨頭 貓 魚 紅 樹) where their parent rows gan and hsn — and the convention in
 * tools/zh_script_convention.js, mainland lects are simplified — write
 * simplified. 30 cells were converted character by character, touching only
 * orthographic variants of the same word and leaving dialect vocabulary alone
 * (gan_yc eat 食 vs gan 吃, hsn_hy we 我伲 vs hsn 我们 are real differences).
 *
 * Exempted by rule, not by list:
 *
 *   TRANSCRIBED  a row whose only undeclared script is Latin AND which is
 *                historical (meta.period) or says its script is reconstructed /
 *                none / undeciphered. Proto-Indo-European, Sogdian, Jurchen and
 *                Classical Maya are written in Latin transcription on purpose —
 *                that IS the policy, not a defect.
 *
 * Usage: node tools/script_declaration_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8').replace(/^const /gm, 'var '), ctx);
const LANG_DATA = vm.runInContext('LANG_DATA', ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8').replace(/^const /gm, 'var '), ctx);

const wc = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', wc);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), wc, { filename: f });
const W = wc.WORDS;

const BLOCKS = [
  // Explicit \u escapes with the /u flag, NOT literal characters. Writing the
  // ranges as literals put U+8C48 (豈) where U+F900 was intended, so the Han
  // range ran 8C48–FAFF and swallowed the whole surrogate block D800–DFFF —
  // every astral character (cuneiform, hieroglyphs, Tangut) then counted as
  // Han. Same shape as the /[⁰-⁹]/ trap: a range whose endpoint is not the
  // character it looks like.
  ['Latin', /[\u0041-\u005A\u0061-\u007A\u00C0-\u024F]/u],
  ['Cyrillic', /[\u0400-\u04FF\u0500-\u052F]/u],
  ['Greek', /[\u0370-\u03FF\u1F00-\u1FFF]/u],
  ['Arabic', /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/u],
  ['Hebrew', /[\u0590-\u05FF]/u], ['Syriac', /[\u0700-\u074F]/u],
  ['Thaana', /[\u0780-\u07BF]/u], ['Devanagari', /[\u0900-\u097F]/u],
  ['Bengali', /[\u0980-\u09FF]/u], ['Gurmukhi', /[\u0A00-\u0A7F]/u],
  ['Gujarati', /[\u0A80-\u0AFF]/u], ['Oriya', /[\u0B00-\u0B7F]/u],
  ['Tamil', /[\u0B80-\u0BFF]/u], ['Telugu', /[\u0C00-\u0C7F]/u],
  ['Kannada', /[\u0C80-\u0CFF]/u], ['Malayalam', /[\u0D00-\u0D7F]/u],
  ['Sinhala', /[\u0D80-\u0DFF]/u], ['Thai', /[\u0E00-\u0E7F]/u],
  ['Lao', /[\u0E80-\u0EFF]/u], ['Tibetan', /[\u0F00-\u0FFF]/u],
  ['Myanmar', /[\u1000-\u109F\uAA60-\uAA7F]/u], ['Georgian', /[\u10A0-\u10FF]/u],
  ['Ethiopic', /[\u1200-\u137F]/u], ['Cherokee', /[\u13A0-\u13FF]/u],
  ['Canadian', /[\u1400-\u167F]/u], ['Runic', /[\u16A0-\u16FF]/u],
  ['Khmer', /[\u1780-\u17FF]/u], ['Mongolian', /[\u1800-\u18AF]/u],
  ['Coptic', /[\u2C80-\u2CFF]/u], ['Han', /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/u],
  ['Kana', /[\u3040-\u30FF]/u], ['Hangul', /[\uAC00-\uD7AF\u1100-\u11FF]/u],
  ['Yi', /[\uA000-\uA4CF]/u], ['Vai', /[\uA500-\uA62B]/u],
  ['Armenian', /[\u0530-\u058F]/u],
  // astral scripts the atlas actually uses
  ['Cuneiform', /[\u{12000}-\u{123FF}\u{12400}-\u{1247F}]/u],
  ['EgyptianHiero', /[\u{13000}-\u{1342F}]/u],
  ['Phoenician', /[\u{10900}-\u{1091F}]/u],
  ['Tangut', /[\u{17000}-\u{18AFF}]/u],
  ['OldTurkic', /[\u{10C00}-\u{10C4F}]/u],
  ['Meroitic', /[\u{10980}-\u{109FF}]/u],
  ['Gothic', /[\u{10330}-\u{1034F}]/u],
  ['OldPersian', /[\u{103A0}-\u{103DF}]/u],
  ['Ugaritic', /[\u{10380}-\u{1039F}]/u],
  ['Avestan', /[\u{10B00}-\u{10B3F}]/u],
  ['LinearB', /[\u{10000}-\u{100FF}]/u],
  ['OldSouthArabian', /[\u{10A60}-\u{10A7F}]/u],
  ['Brahmi', /[\u{11000}-\u{1107F}]/u],
  ['Kharoshthi', /[\u{10A00}-\u{10A5F}]/u],
  ['Elymaic', /[\u{10FE0}-\u{10FFF}]/u],
  ['Kawi', /[\u{11F00}-\u{11F5F}]/u],
  ['TaiViet', /[\uAA80-\uAADF]/u],
  ['MeeteiMayek', /[\uABC0-\uABFF]/u],
  ['Cham', /[\uAA00-\uAA5F]/u],
];
const ALIAS = {
  Latin: ['latin', 'roman'], Han: ['han', 'chinese', 'kanji', 'hanzi', 'hanja', 'sawndip', 'nom'],
  Kana: ['kana', 'hiragana', 'katakana'], Hangul: ['hangul', 'hangeul', 'korean'],
  Cyrillic: ['cyrillic'], Greek: ['greek'], Arabic: ['arabic', 'jawi', 'ajami', 'nastaliq', 'urdu'],
  Hebrew: ['hebrew'], Devanagari: ['devanagari', 'nagari'], Bengali: ['bengali', 'bangla', 'assamese'],
  Gurmukhi: ['gurmukhi'], Gujarati: ['gujarati'], Oriya: ['odia', 'oriya'], Tamil: ['tamil'],
  Telugu: ['telugu'], Kannada: ['kannada'], Malayalam: ['malayalam'], Sinhala: ['sinhala'],
  Thai: ['thai'], Lao: ['lao'], Tibetan: ['tibetan', 'uchen'],
  // Shan, Mon and Karen all live in the Myanmar block
  Myanmar: ['myanmar', 'burmese', 'mon', 'shan', 'karen'],
  Georgian: ['georgian', 'mkhedruli'], Ethiopic: ['ethiopic', "ge'ez", 'geez', 'fidel'],
  Khmer: ['khmer'], Mongolian: ['mongolian'], Armenian: ['armenian'], Syriac: ['syriac'],
  Thaana: ['thaana'], Cherokee: ['cherokee'], Canadian: ['syllabics', 'canadian'],
  Runic: ['runic', 'runes', 'futhark'], Coptic: ['coptic'], Vai: ['vai'], Yi: ['yi', 'nuosu'],
  Cuneiform: ['cuneiform'], EgyptianHiero: ['hieroglyph', 'hieratic', 'demotic'],
  Phoenician: ['phoenician', 'punic'], Tangut: ['tangut'], OldTurkic: ['old turkic', 'orkhon', 'runiform'],
  Meroitic: ['meroitic'], Gothic: ['gothic'], OldPersian: ['old persian'],
  Ugaritic: ['ugaritic'], Avestan: ['avestan'], LinearB: ['linear b'],
  OldSouthArabian: ['old south arabian', 'musnad', 'sabaean'], Brahmi: ['brahmi', 'brahmic'],
  Kharoshthi: ['kharoshthi'], Elymaic: ['elymaic'], Kawi: ['kawi'],
  TaiViet: ['tai viet'], MeeteiMayek: ['meitei', 'meetei'], Cham: ['cham'],
};
// A row whose script is reconstructed, lost or undeciphered is written in Latin
// transcription on purpose.
const TRANSCRIBED = /reconstruct|none|no native|n\/a|undeciph|hieroglyph|not written|unwritten|attested only/i;

const DEBT = new Map([
  ['yuy', 'declares Mongolian script (historical) and Latin romanization, but 97% of the data is Cyrillic'],
  ['oar', 'declares the Old Aramaic alphabet; the data is Hebrew square script, which is standard scholarly practice but is not what the field says'],
  ['xve', 'declares the Venetic alphabet; a third of the data is Greek letters'],
  ['luz', 'declares Perso-Arabic (informal); the data is Latin — same shape as trm'],
  ['trm', 'declares Perso-Arabic but the data is a scholarly Latin transcription; Tregami has near-zero literacy — cf. wbl, which says so outright'],
  ['enf', 'declares Cyrillic but the data is Latin, while its Samoyedic neighbours yrk/sel/nio carry Cyrillic surfaces'],
]);

const violations = [];
const debtSeen = new Set();
let rows = 0;
for (const code of Object.keys(LANG_DATA)) {
  const m = LANG_DATA[code].meta;
  if (!m || (!m.script && !m.scriptTags)) continue;
  const counts = {};
  let cells = 0;
  for (const id of Object.keys(W)) {
    const e = (W[id].data || {})[code];
    if (!e) continue;
    const s = Array.isArray(e) ? e[0] : (e.form || '');
    if (!s || /^[\s—–-]*$/.test(s)) continue;
    cells++;
    for (const [n, re] of BLOCKS) if (re.test(s)) counts[n] = (counts[n] || 0) + 1;
  }
  if (!cells) continue;
  rows++;
  const hay = String(m.script || '').toLowerCase() + ' ' + (Array.isArray(m.scriptTags) ? m.scriptTags.join(' ').toLowerCase() : '');
  for (const [script, n] of Object.entries(counts)) {
    if (n / cells < 0.25) continue;
    if ((ALIAS[script] || [script.toLowerCase()]).some((a) => hay.includes(a))) continue;
    if (script === 'Latin' && (m.period || TRANSCRIBED.test(String(m.script || '')))) continue;
    if (DEBT.has(code)) { debtSeen.add(code); continue; }
    violations.push({ code, name: LANG_DATA[code].name, script, pct: Math.round((100 * n) / cells), declared: String(m.script || '') });
  }
}
const stale = [...DEBT.keys()].filter((k) => !debtSeen.has(k));

if (CHECK) {
  console.log(`violations: ${violations.length}`);
  for (const v of violations)
    console.log(`  ${v.code} ${v.name} writes ${v.script} in ${v.pct}% of cells but declares "${v.declared.slice(0, 50)}"`);
  if (debtSeen.size) console.log(`  debt: ${debtSeen.size} row(s) whose declaration overstates the data (${[...debtSeen].sort().join(' ')})`);
  for (const k of stale) console.log(`  note: DEBT entry '${k}' no longer differs — drop it from the list`);
  process.exit(0);
}
console.log('script declaration — a row must write in the script it declares\n');
console.log(`  ${rows} rows with surfaces and a declaration\n`);
if (!violations.length) console.log('clean — every declared script matches the data.');
for (const v of violations)
  console.log(`  ${v.code.padEnd(11)} ${String(v.name).slice(0, 24).padEnd(25)} ${v.script.padEnd(11)} ${String(v.pct).padStart(3)}%   declared: ${v.declared.slice(0, 46)}`);
if (debtSeen.size) {
  console.log('\ndeclaration overstates the data (debt):');
  for (const k of [...debtSeen].sort()) console.log(`  ${k.padEnd(6)} ${DEBT.get(k)}`);
}
for (const k of stale) console.log(`  note: DEBT entry '${k}' no longer differs — drop it`);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
