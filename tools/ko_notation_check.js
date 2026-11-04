#!/usr/bin/env node
/*
 * ko_notation_check.js — deterministic guard for Koreanic IPA notation in WordMap.
 *
 * For every Koreanic row (ko, ko_* and oko) it checks three conventions. The
 * rule each row follows is measured from that row's own cells, not imposed
 * from outside:
 *   (a) FLAP   intervocalic ㄹ is written ɾ, not r. Plain r between two vowels
 *              is flagged unless the row's own majority is r.
 *   (b) UNREL  a word-final ㄱ/ㄷ/ㅂ stop (IPA p/t/k at the end of a word)
 *              carries ̚ (U+031A) if most of the row's final stops do, and lacks
 *              it if most do not. Medial stops (먹다 mək̚t͈a) are not counted:
 *              rows disagree on them by design.
 *   (c) EO     ㅓ (also ㅕ, ㅝ, ㅔ excluded) is written with the row's majority letter,
 *              ʌ or ə. A cell whose Hangul has ㅓ-family vowels and whose IPA
 *              uses only the row's minority letter is flagged.
 * Rows with too little evidence (fewer than 5 data points for a test) are
 * skipped for that test.
 *
 * ALLOW (reasoned exceptions):
 *   ko_gor, oko  reconstructions (Gyerim yusa / Old Korean). The values copy
 *                the cited reconstruction's own notation and are not phonetic
 *                transcriptions of Hangul. All tests are off.
 *   ko_mid       (c) off: Middle Korean writes ㆍ as ʌ and ㅓ as ə, so both
 *                letters are expected, often in the same word.
 *   ko_hg        (c) off: Hamgyong cells mix ʌ and ə (13 vs 4). This follows
 *                its sources and is a dialect matter, not a slip.
 *
 * Usage: node tools/ko_notation_check.js           list violations
 *        node tools/ko_notation_check.js --check   print "violations: N", exit 1 if N>0
 * Read-only: it never edits words/*.js.
 */
const fs = require('fs'), vm = require('vm'), path = require('path');
const ROOT = process.env.LANGMAP_ROOT || path.join(__dirname, '..');
const ALLOW = {
  ko_gor: { a: 1, b: 1, c: 1 },
  oko: { a: 1, b: 1, c: 1 },
  ko_mid: { c: 1 },
  ko_hg: { c: 1 },
};
const V = 'aeiouɯɨʌəɛøyɐɤæ';
const RE_R = new RegExp(`[${V}][ː]?r(?=[${V}jwɰ])`);           // r between vowels (a glide may follow)
const RE_FINAL = /[ptk](̚)?(?=$|[\s\/,])/g;                      // word-final p/t/k, with or without ̚

function load() {
  const ctx = { window: {} }; vm.createContext(ctx); const W = {}; ctx.WORDS = W;
  for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter(f => f.endsWith('.js')).sort()) {
    try { vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), ctx); } catch (e) {}
  }
  const rows = {};
  for (const [w, o] of Object.entries(W)) {
    if (!o || !o.data) continue;
    for (const [c, v] of Object.entries(o.data)) {
      if (!/^(ko(_|$)|oko$)/.test(c) || v == null) continue;
      const s = Array.isArray(v) ? v[0] : v.form, i = Array.isArray(v) ? v[1] : v.ipa;
      if (!i || s === '—') continue;
      (rows[c] ||= []).push({ w, s: String(s), i: String(i).normalize('NFC') });
    }
  }
  return rows;
}
// ㅓ-family medial vowels (ㅓ ㅕ ㅝ) in precomposed syllables
function eoCount(s) {
  let n = 0;
  for (const ch of s) {
    const o = ch.codePointAt(0);
    if (o >= 0xAC00 && o <= 0xD7A3) { const v = Math.floor((o - 0xAC00) / 28) % 21; if (v === 4 || v === 6 || v === 14) n++; }
  }
  return n;
}

const rows = load();
const out = [];
for (const [code, cells] of Object.entries(rows).sort()) {
  const al = ALLOW[code] || {};
  // (a) flap
  if (!al.a) {
    const flap = cells.filter(x => new RegExp(`[${V}]ɾ`).test(x.i)).length;
    const rr = cells.filter(x => RE_R.test(x.i));
    if (flap + rr.length >= 5 && flap >= rr.length)
      for (const x of rr) out.push(`${code} ${x.w} ${x.s} /${x.i}/  (a) intervocalic r; the row writes ɾ (${flap} cells)`);
  }
  // (b) unreleased finals
  if (!al.b) {
    let withU = 0, without = 0; const per = [];
    for (const x of cells) {
      let m; RE_FINAL.lastIndex = 0; let u = 0, b = 0;
      while ((m = RE_FINAL.exec(x.i))) { if (m[1]) u++; else b++; }
      withU += u; without += b; per.push([x, u, b]);
    }
    if (withU + without >= 5) {
      const majU = withU >= without;
      for (const [x, u, b] of per) {
        if (majU && b) out.push(`${code} ${x.w} ${x.s} /${x.i}/  (b) final stop without ̚; ${withU} of ${withU + without} finals in the row carry it`);
        if (!majU && u) out.push(`${code} ${x.w} ${x.s} /${x.i}/  (b) final ̚ in a row that leaves ${without} of ${withU + without} finals bare`);
      }
    }
  }
  // (c) ㅓ letter
  if (!al.c) {
    const eo = cells.filter(x => eoCount(x.s) > 0);
    const nA = eo.filter(x => /ʌ/.test(x.i)).length, nE = eo.filter(x => /ə/.test(x.i)).length;
    if (nA + nE >= 5) {
      const maj = nA >= nE ? 'ʌ' : 'ə', min = maj === 'ʌ' ? 'ə' : 'ʌ';
      for (const x of eo) if (x.i.includes(min) && !x.i.includes(maj))
        out.push(`${code} ${x.w} ${x.s} /${x.i}/  (c) ㅓ written ${min}; the row writes ${maj} (${Math.max(nA, nE)} cells)`);
    }
  }
}
if (process.argv.includes('--check')) {
  if (out.length) console.log(out.join('\n'));
  console.log('violations: ' + out.length);
  process.exit(out.length ? 1 : 0);
} else {
  console.log(out.join('\n') || '(none)');
  console.log('violations: ' + out.length + ' | rows: ' + Object.keys(rows).length);
}
