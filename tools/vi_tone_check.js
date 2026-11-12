#!/usr/bin/env node
/*
 * vi_tone_check.js — every Vietnamese syllable's Chao tone must be the one its
 * quốc ngữ tone mark gives in THAT row (vi = Hà Nội, vi_c = Huế, vi_s = Saigon),
 * and vi_nom must carry exactly the pronunciation of the vi cell it spells.
 *
 * Why: round-9 review (2026-11-04) found slips that no other guard sees:
 * vi_c sắc written with the checked-syllable value (thứ ˧˦ for ˨˦), vi_nom
 * Nhật with the huyền value, vi_nom mặt read as mật. Each row is internally
 * regular, so a per-row table catches them deterministically.
 *
 * TABLE: measured 2026-11-04 with ~/langmap-work/esea1103/vitone.py, which
 * counts, for every cell whose surface and IPA have the same number of
 * syllables, the tone letters written for each tone class. After the round-9
 * fixes every class is unanimous in its row (counts in brackets). "_stop" =
 * a syllable ending in -p, -t, -c or -ch; sắc and nặng split on it.
 *
 * Run: node vi_tone_check.js            (lists violations, prints "violations: N")
 *      node vi_tone_check.js --check    (same, exits 1 when N > 0)
 */
const fs = require('fs'), path = require('path');
const dir = process.env.WORDS_DIR || path.join(__dirname, '..', 'words');

const TABLE = {
  vi:   { ngang: '˧' /*63*/, huyen: '˨˩' /*24*/, sac: '˧˥' /*33*/, sac_stop: '˧˥' /*14*/,
          hoi: '˧˩˧' /*6*/, nga: '˧ˀ˥' /*3*/, nang: '˧˨ʔ' /*13*/, nang_stop: '˧˨ʔ' /*9*/ },
  vi_c: { ngang: '˥' /*68*/, huyen: '˦˨' /*24*/, sac: '˨˦' /*35*/, sac_stop: '˧˦' /*13*/,
          hoi: '˧˩˨' /*6*/, nga: '˧˩˨' /*3*/, nang: '˧˩' /*14*/, nang_stop: '˧˩' /*9*/ },
  vi_s: { ngang: '˧' /*68*/, huyen: '˨˩' /*24*/, sac: '˧˥' /*33*/, sac_stop: '˧˥' /*13*/,
          hoi: '˨˩˦' /*6*/, nga: '˨˩˦' /*3*/, nang: '˨˩˨' /*12*/, nang_stop: '˨˩' /*9*/ },
};

// Cells that legitimately break the rule. Key "word:code".
const ALLOW = {
  'you:vi_nom': 'vi_nom writes 眉 mày, a different (familiar) pronoun from the vi cell bạn',
  'butterfly:vi_nom': '𧊉 spells the single syllable bướm of vi bươm bướm',
  'computer:vi_nom': '盤倂 bàn tính, the older word (abacus, reckoning board), kept for the Nôm row instead of the modern máy tính',
  'bread:vi_nom': '餅西 bánh tây, the older Nôm-era word for Western bread; vi has bánh mì',
  'sushi:vi_nom': '𩻐 mắm, the fermented-fish counterpart chosen for the Nôm row; vi has the loan sushi',
};

function toneClass(syl) {
  const d = syl.toLowerCase().normalize('NFD');
  let t = 'ngang';
  if (d.includes('̀')) t = 'huyen';
  else if (d.includes('́')) t = 'sac';
  else if (d.includes('̉')) t = 'hoi';
  else if (d.includes('̃')) t = 'nga';
  else if (d.includes('̣')) t = 'nang';
  const base = d.replace(/\p{M}/gu, '').normalize('NFC');
  if ((t === 'sac' || t === 'nang') && /(p|t|c|ch)$/u.test(base)) t += '_stop';
  return t;
}

// One cell per line in all three entry formats: code: ["s", "ipa"], "code": [...], code: { form: "s", ipa: "ipa" }
const cellRe = code => new RegExp(
  `^\\s*["']?${code}["']?\\s*:\\s*(?:\\[\\s*"([^"]*)"\\s*,\\s*"([^"]*)"|\\{[^}]*?form\\s*:\\s*"([^"]*)"[^}]*?ipa\\s*:\\s*"([^"]*)")`, 'u');
const TONES = /[\u02E5-\u02E9][\u02E5-\u02E9\u0294\u02C0]*/gu;   // ˥..˩ then ˥..˩ ʔ ˀ
const VI_LETTERS = /^[a-zA-Z\u00C0-\u1EF9\u0110\u0111]+$/u;

function readCells(code) {
  const out = {};
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.js')).sort()) {
    const re = cellRe(code);
    for (const ln of fs.readFileSync(path.join(dir, f), 'utf8').split('\n')) {
      const m = ln.match(re);
      if (!m) continue;
      const s = m[1] !== undefined ? m[1] : m[3], i = m[2] !== undefined ? m[2] : m[4];
      out[f.replace(/\.js$/, '')] = [s, i];
      break;
    }
  }
  return out;
}

let bad = 0, checked = 0, skipped = 0;
const report = (w, code, msg) => {
  if (ALLOW[`${w}:${code}`]) return;
  bad++; console.log(`  ${w} ${code}: ${msg}`);
};

const vi = readCells('vi');
for (const code of ['vi', 'vi_c', 'vi_s']) {
  const T = TABLE[code], cells = code === 'vi' ? vi : readCells(code);
  for (const [w, [s, ipa]] of Object.entries(cells)) {
    if (!s || s === '—' || !ipa || ipa === '—') continue;
    // "a / b" cells hold alternatives; check them pairwise
    const S = s.split(/\s+\/\s+/u), I = ipa.split(/\s+\/\s+/u);
    const pairs = S.length === I.length ? S.map((x, k) => [x, I[k]]) : [[s, ipa]];
    let ok = true;
    for (const [ss, ii] of pairs) {
      const syls = ss.split(/[\s-]+/u).filter(Boolean), tones = ii.match(TONES) || [];
      if (!syls.every(x => VI_LETTERS.test(x)) || syls.length !== tones.length) { ok = false; break; }
    }
    if (!ok) { skipped++; if (process.argv.includes('--verbose')) console.log(`  (skipped) ${w} ${code}: ${s} /${ipa}/`); continue; }
    checked++;
    for (const [ss, ii] of pairs) {
      const syls = ss.split(/[\s-]+/u).filter(Boolean), tones = ii.match(TONES) || [];
      syls.forEach((x, k) => {
        const want = T[toneClass(x)];
        if (tones[k] !== want) report(w, code, `${s} /${ipa}/ — ${x} is ${toneClass(x)}, row writes ${want}, cell has ${tones[k]}`);
      });
    }
  }
}
for (const [w, [s, ipa]] of Object.entries(readCells('vi_nom'))) {
  if (!s || s === '—' || !vi[w]) continue;
  checked++;
  if (vi[w][1] !== ipa) report(w, 'vi_nom', `${s} /${ipa}/ differs from vi ${vi[w][0]} /${vi[w][1]}/`);
}
console.log(`cells checked: ${checked} (skipped, syllables not countable: ${skipped})`);
console.log(`violations: ${bad}`);
if (process.argv.includes('--check') && bad > 0) process.exit(1);
