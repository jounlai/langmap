#!/usr/bin/env node
/*
 * native_script_check.js — deterministic native-glyph script-block validator.
 *
 * Each variety's `native` field should be written in one expected script. This
 * flags any native cell containing a character outside that script (a wrong-
 * script glyph pasted in — e.g. a Tibetan ཞ where ཤ was meant, or a stray Latin
 * letter in a Hangul cell). Shared punctuation/marks and the "—" no-glyph
 * placeholder are allowed everywhere.
 *
 * Diagnostic only. Run: node tools/native_script_check.js
 */
const fs = require('fs'), vm = require('vm'), path = require('path');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'hanmap_data.js'), 'utf8') +
  '\nthis.D=HAN_DATA;this.L=HAN_LIST;', ctx);
const D = ctx.D, L = ctx.L;

// expected script per variety (by base or exact code)
const SCRIPT = {
  vi: 'Latin', vi_c: 'Latin', vi_s: 'Latin',
  ko: 'Hangul', ko_kp: 'Hangul', ko_zai: 'Hangul', ko_bus: 'Hangul', ko_hun: 'Hangul', ko_mid: 'Hangul',
  ja: 'Kana', ja_kgs: 'Kana', ja_okn: 'Kana', ja_thk: 'Kana', ja_ojp: 'Kana', ja_kun: 'Kana',
  zh_phagspa: 'Phagspa', txg: 'Tangut', mnc: 'Mongolian', sjo: 'Mongolian',
  juc: 'Mongolian', zkt: 'Khitan',           // both mostly "—" placeholder
  vi_nom: 'CJK', dng: 'Cyrillic', bo_sino: 'Tibetan', th: 'Thai',
  yue_gz: 'CJK', yue_ts: 'CJK', yue_dg: 'CJK', yue_nn: 'CJK', yue_zs: 'CJK',
};
function blockOf(cp) {
  if ((cp >= 0x1100 && cp <= 0x11FF) || (cp >= 0xAC00 && cp <= 0xD7A3) || (cp >= 0x3130 && cp <= 0x318F) || (cp >= 0xA960 && cp <= 0xA97F) || (cp >= 0xD7B0 && cp <= 0xD7FF)) return 'Hangul';
  if ((cp >= 0x3040 && cp <= 0x30FF) || (cp >= 0x31F0 && cp <= 0x31FF) || cp === 0x30FC) return 'Kana';
  if (cp >= 0xA840 && cp <= 0xA87F) return 'Phagspa';
  if ((cp >= 0x17000 && cp <= 0x187FF) || (cp >= 0x18800 && cp <= 0x18AFF) || (cp >= 0x18D00 && cp <= 0x18D7F)) return 'Tangut';
  if (cp >= 0x1800 && cp <= 0x18AF) return 'Mongolian';
  if (cp >= 0x18B00 && cp <= 0x18CFF) return 'Khitan';
  if (cp >= 0x0400 && cp <= 0x04FF) return 'Cyrillic';
  if (cp >= 0x0F00 && cp <= 0x0FFF) return 'Tibetan';
  if (cp >= 0x0E00 && cp <= 0x0E7F) return 'Thai';
  if ((cp >= 0x4E00 && cp <= 0x9FFF) || (cp >= 0x3400 && cp <= 0x4DBF) || (cp >= 0x20000 && cp <= 0x2FFFF) || (cp >= 0xF900 && cp <= 0xFAFF)) return 'CJK';
  if ((cp >= 0x41 && cp <= 0x5A) || (cp >= 0x61 && cp <= 0x7A) || (cp >= 0xC0 && cp <= 0x24F) || (cp >= 0x1E00 && cp <= 0x1EFF)) return 'Latin';
  return null; // punctuation / marks / unknown
}
// chars allowed in ANY native field (separators, placeholders, tone dots, combining marks)
const ALLOW = new Set([' ', '·', '・', '—', '–', '-', 'ː', 'ʼ', 'ʔ', '.', '·']);
function allowedCommon(cp) {
  if (cp === 0x2014 || cp === 0x2013 || cp === 0x00B7 || cp === 0x30FB) return true; // — – · ・
  if (cp === 0x3A) return true;                        // ':' = Middle-Korean 上聲 傍점 (double-dot tone mark, partner of '·' 去聲)
  if (cp >= 0x0300 && cp <= 0x036F) return true;     // combining diacritics
  if (cp >= 0x1100 && cp <= 0x11FF) return true;      // Hangul jamo (used in old-Hangul ko_mid)
  if (cp === 0x20 || cp === 0x2E) return true;
  return false;
}

const hits = [];
for (const c of L) {
  for (const l of Object.keys(D[c].native || {})) {
    const v = D[c].native[l]; if (v == null || v === '') continue;
    const exp = SCRIPT[l]; if (!exp) { hits.push({ char: c, lang: l, kind: 'unmapped-variety', val: v }); continue; }
    for (const ch of String(v)) {
      const cp = ch.codePointAt(0);
      if (ALLOW.has(ch) || allowedCommon(cp)) continue;
      const b = blockOf(cp);
      if (b !== exp) hits.push({ char: c, lang: l, kind: 'wrong-script', val: v, bad: ch, badBlock: b || ('U+' + cp.toString(16)), expected: exp });
    }
  }
}
const byKind = {}; for (const h of hits) (byKind[h.kind] = byKind[h.kind] || []).push(h);
console.log(`CHECK A — native-script block: ${hits.length} issue(s)`);
for (const [k, list] of Object.entries(byKind)) {
  console.log(`  ${k}: ${list.length}`);
  for (const h of list) console.log(`     ${h.char} ${h.lang}  ${JSON.stringify(h.val)}  ${h.bad ? `bad ${JSON.stringify(h.bad)} (${h.badBlock}, expected ${h.expected})` : ''}`);
}
console.log('');

// --- CHECK B: kana ↔ romaji vowel-skeleton agreement (modern ja varieties).
// ja_ojp is excluded: its kana is historical 字音仮名遣 orthography (e.g. サム=sam,
// グヮ=gwa, ヰ=wi), not a phonetic transcription of the romanized reading.
const KANA_LANGS = ['ja', 'ja_kgs', 'ja_okn', 'ja_thk', 'ja_kun'];
const KV = {}; const rows = { a: 'アカサタナハマヤラワガザダバパ', i: 'イキシチニヒミリギジヂビピ', u: 'ウクスツヌフムユルグズヅブプ', e: 'エケセテネヘメレゲゼデベペ', o: 'オコソトノホモヨロヲゴゾドボポ' };
for (const [v, s] of Object.entries(rows)) for (const ch of s) KV[ch] = v;
const smallV = { 'ャ': 'a', 'ュ': 'u', 'ョ': 'o', 'ァ': 'a', 'ィ': 'i', 'ゥ': 'u', 'ェ': 'e', 'ォ': 'o', 'ヮ': 'a' };
function kataVowels(s) {
  s = s.replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60)); // hira→kata
  let out = [];
  for (const ch of s) {
    if (ch === 'ー') { if (out.length) out.push(out[out.length - 1]); continue; }
    if (ch === 'ッ' || ch === 'ン' || ch === '・') continue;             // sokuon / moraic n / dot
    if (smallV[ch]) { out[out.length - 1] = smallV[ch]; continue; }       // yōon: replace preceding vowel
    if (KV[ch]) out.push(KV[ch]);
  }
  return out.join('');
}
function romaVowels(r) {
  r = String(r).toLowerCase().replace(/[āâ]/g, 'a').replace(/[īî]/g, 'i').replace(/[ūû]/g, 'u').replace(/[ēê]/g, 'e').replace(/[ōô]/g, 'o');
  return (r.match(/[aiueo]/g) || []).join('');
}
const norm = x => x.replace(/ou/g, 'o').replace(/uu/g, 'u').replace(/ei/g, 'e').replace(/(.)\1+/g, '$1'); // long-vowel orthography
const bHits = [];
for (const c of L) for (const l of KANA_LANGS) {
  const s = (D[c].surface || {})[l], nat = (D[c].native || {})[l];
  if (!s || !nat) continue;
  const kv = norm(kataVowels(nat)), rv = norm(romaVowels(s));
  if (kv !== rv) bHits.push({ char: c, lang: l, surface: s, native: nat, kanaV: kv, romaV: rv });
}
console.log(`CHECK B — kana↔romaji vowel skeleton (${KANA_LANGS.join('/')}): ${bHits.length} mismatch(es)`);
for (const h of bHits) console.log(`     ${h.char} ${h.lang}  surface ${JSON.stringify(h.surface)} (${h.romaV}) vs native ${JSON.stringify(h.native)} (${h.kanaV})`);
console.log('');

fs.writeFileSync('/tmp/native_issues.json', JSON.stringify({ A: hits, B: bHits }, null, 1));
console.log('issues -> /tmp/native_issues.json');
