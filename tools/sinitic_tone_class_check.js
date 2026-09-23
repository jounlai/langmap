#!/usr/bin/env node
/**
 * sinitic_tone_class_check.js — one 調類, one contour, within one row.
 *
 * Every Sinitic lect assigns a single pitch contour to each Middle Chinese tone
 * class. So within one row, every 陽平 syllable must carry the same Chao
 * letters, every 陰入 the same, and so on. A row that writes 紅 as ˨˦ and 名 as
 * ˩ is not showing a dialect subtlety — one of the two cells is wrong.
 *
 * This is the WordMap counterpart of tools/tone_category_check.js, which does
 * the same job for the Han Map. It was written after a 2026-08-29 pass turned
 * up two real errors that no existing guard could see:
 *
 *   nan     紅 /aŋ˧˥/ against its own 魚, 名 and 鹽 at ˨˦ (fixed: one cell,
 *           five independent agreements against it)
 *   hak_cn  紅, 魚 and 鹽 at ˨˦ against 名 at ˩ — and here the MAJORITY is
 *           wrong: Meixian 陽平 is 11, which is what hak_tw writes for all
 *           four. Carried as DEBT below rather than half-fixed.
 *
 * SCOPE. The naive version of this check drowns in false positives, so it is
 * deliberately narrow:
 *
 *   Only 平聲 and 入聲. 上聲 and 去聲 are excluded because the rows vary in
 *   NOTATION there far more than in substance — ˨˩˦ against ˧˩˧ for Mandarin
 *   third tone is one row writing the full contour and the same row writing the
 *   half-third, not a claim about two different tones.
 *
 *   入聲 only where the row still HAS it, detected from the data: if no
 *   入-class cell in that row ends in a checked coda, the lect has merged 入 into
 *   the other tones (every Mandarin row) and the class no longer predicts a
 *   contour. 黑 hēi, 血 xuè, 百 bǎi and 铁 tiě are all 陰入 and all different in
 *   Beijing, and that is correct.
 *
 *   A bare tone letter is read as its doubled form, so ˥ and ˥˥ are the same
 *   claim written two ways and not a violation.
 *
 * Only SINGLE-CHARACTER cells are checked. A compound's non-final syllables
 * undergo sandhi in most of these lects, so 名字 tells you nothing about 名.
 * Characters with two Middle Chinese readings in different classes (貓, 父) are
 * left out of the table entirely rather than guessed at; so are dialect-only
 * graphs (啉, 脷, 倷) with no Qieyun ancestry to look up.
 *
 * WIDE MODE (--wide) lifts the 平/入-only restriction and reports 上聲 and 去聲
 * too, comparing contours prefix-tolerantly so that ˨˩˦ and ˨˩ — the full and
 * half third tone — count as the same claim. It is ADVISORY and deliberately
 * not wired into check_all: it currently prints ~112 disagreements, and most of
 * them are notation or sandhi rather than error. It is still the fastest way to
 * find the real ones. What it found on the day it was written was zh_lz, whose
 * 三 ˧˩, 红 ˥˧, 五 ˦˦˨ and 二 ˩˧ are exactly Lanzhou's four tones while eleven
 * other cells in the same row ignored them.
 *
 * Reading the wide output, in descending order of "probably not a bug":
 *
 *   鳥 against the rest of 陰上. 廣韻 has it 都了切, 端母, so 陰上 — but the n-
 *     of niǎo / niu5 comes from a 泥母 variant, which is 次濁 and therefore 陽上.
 *     Both readings are live in different lects. Not a witness; excluded below.
 *   我, 你, 汝 against 五 in 陽上. Pronouns carry 變調 and neutral tone more than
 *     any other word class, and rows often take them from conversational
 *     sources. Excluded.
 *   好 and 狗 in Min at ˧˥ where the row's other 陰上 is ˥˧. That is Taiwanese
 *     sandhi, not a second tone. Not excluded — a compound cell would be, but
 *     these are single characters and worth a human look.
 *   樹 against 二 in 陽去. Real often enough to keep: 二 has a 文/白 split in Wu
 *     and Min, so check which reading the row means before trusting either.
 *
 * Usage:
 *   node tools/sinitic_tone_class_check.js           # report
 *   node tools/sinitic_tone_class_check.js --check   # print "violations: N"
 *   node tools/sinitic_tone_class_check.js --wide    # advisory 上/去 report too
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const WIDE = process.argv.includes('--wide');

// Characters that are not usable as 上/去 witnesses. Each has two live readings
// in different tone classes, or a tone that regularly changes, so a row that
// writes it differently from its neighbours is not necessarily wrong.
const NOT_A_WITNESS = new Set([
  '鳥', '鸟',        // 端母 陰上 in 廣韻, but the n- readings continue a 泥母 (次濁) variant
  '善',              // 全濁上, which goes to 去聲 across Mandarin and much else
  '我', '你', '妳', '汝', '尔', '爾',   // pronouns: 變調 and neutral tone more than any other class
]);

// 調類 by Middle Chinese initial voicing + tone. 陰 = voiceless initial, 陽 =
// voiced. Read off the Qieyun categories, not off any modern reading.
const CLASS = {
  // 陰平
  三: '陰平', 心: '陰平', 星: '陰平', 風: '陰平', 风: '陰平', 烏: '陰平', 家: '陰平',
  // 陽平
  紅: '陽平', 红: '陽平', 魚: '陽平', 鱼: '陽平', 名: '陽平', 鹽: '陽平', 盐: '陽平',
  茶: '陽平', 橙: '陽平', 泥: '陽平', 房: '陽平', 熊: '陽平', 牙: '陽平', 娘: '陽平',
  儂: '陽平', 侬: '陽平', 暝: '陽平', 輪: '陽平', 疼: '陽平',
  // 陰上
  水: '陰上', 火: '陰上', 手: '陰上', 好: '陰上', 土: '陰上', 屎: '陰上',
  狗: '陰上', 犬: '陰上', 鳥: '陰上', 鸟: '陰上', 飲: '陰上', 饮: '陰上',
  // 陽上
  五: '陽上', 我: '陽上', 耳: '陽上', 眼: '陽上', 母: '陽上', 雨: '陽上',
  女: '陽上', 你: '陽上', 卵: '陽上', 汝: '陽上', 尔: '陽上', 乳: '陽上', 善: '陽上',
  // 陰去
  四: '陰去', 愛: '陰去', 爱: '陰去', 睏: '陰去', 厝: '陰去', 糞: '陰去',
  // 陽去
  夜: '陽去', 謝: '陽去', 谢: '陽去', 二: '陽去', 鼻: '陽去', 睡: '陽去',
  樹: '陽去', 树: '陽去', 寐: '陽去',
  // 陰入
  一: '陰入', 黑: '陰入', 骨: '陰入', 血: '陰入', 雪: '陰入', 屋: '陰入',
  鐵: '陰入', 铁: '陰入', 惜: '陰入', 吃: '陰入', 喝: '陰入', 赤: '陰入', 百: '陰入',
  // 陽入
  白: '陽入', 石: '陽入', 食: '陽入', 目: '陽入', 月: '陽入', 日: '陽入',
  舌: '陽入', 木: '陽入', 蜜: '陽入',
};

// Rows whose disagreement is known and not yet resolved. Each entry names the
// row, the class, and why it is still open — so a fix removes the entry rather
// than the entry hiding a fix.
// Genuine 變調: a colloquial reading whose tone is regularly changed. These are
// correct data, not row inconsistency, so they are excluded from the class
// rather than carried as debt.
const ALLOW = [
  { code: /^yue/, ch: '名', why: 'colloquial meng2 — 陽上變調 to 35, the regular Cantonese changed tone' },
  { code: /^yue/, ch: '橙', why: 'caang2 — the same 變調' },
  // Checked against Wiktionary's 各地讀音 on 2026-08-31 and NOT an error: both
  // members of the pair are attested at these values, so the row is right and
  // the class simply does not predict one contour in these two lects.
  { code: /^wuu_jx$/, ch: '雨', why: 'Jiaxing: 五 is 213 and 雨 is 433, both as printed' },
  { code: /^mnp$/,    ch: '雨', why: "Jian'ou: 五 is 42 and 雨 xy- is 55; a 文/白 pair, both printed" },
];

// The backlog this guard found on the day it was written. Recording it as debt
// rather than as failure is the point: the number is visible, the tree stays
// green, and any NEW disagreement — a row or class not on this list — fails.
// Work the list down and delete entries; the stale check below will complain if
// an entry stops matching, so a fix cannot hide behind its own note.
//
// hak_cn 陽平 was the first one worked down, and the instructive one: its
// MAJORITY was wrong. 紅 魚 鹽 said ˨˦ and only 名 and 茶 said ˩, but this row
// is Meizhou by its own description and its own latitude, Meixian 陽平 is 11,
// and hak_tw — Sixian, descended from Meixian — writes all six that way.
// Resolved 2026-08-29; the lesson is that counting cells is a heuristic and
// the row's identity is the evidence.
//
// Already fixed and therefore absent: the 15 `orange` cells that carried
// Beijing's 陽平 ˧˥ into rows whose own 陽平 is something else, and nan 紅.
// PAID 2026-09-17, review 541: gan_yc/gan_ja 陰平, cjy_xz 陰平+陽平, zh_jh 陽平,
// wuu_jh 陰平+陽平 and wuu_jx 陰平 were re-cut against their own MCPDict
// syllabaries (宜春, 吉安, 忻州秀容, 南京, 金華, 嘉興) and no longer disagree.
// === 入聲, opened 2026-09-21 =================================================
// The 入聲 half of this guard had never run: the coda test required the IPA to
// END in a stop, and every modern row ends in a tone letter, so `checked` never
// filled. Fixing the regex turned up 23 findings at once. They are parked here
// rather than "fixed", because MOST OF THEM ARE NOT ERRORS — this table maps a
// character to its Middle Chinese class, and several lects split that class.
// Do not go and flatten these rows to one value each; that would destroy real
// data. What each group needs:
//
//   THE YUE SPLIT IS REAL AND THE DATA IS RIGHT — 6 rows.
//   yue, yue_gz, yue_dg, yue_nn, yue_zs, zh_wenyan_edu (Cantonese-read) all put
//   一 骨 屋 黑 high and 血 百 鐵 雪 mid. That is 上陰入 against 中入, the standard
//   Cantonese split of 陰入 into two tones; it is lexical and every description
//   has it. The fix belongs in the CLASS TABLE above — 陰入 needs to be two
//   classes for these rows — not in the data.
//
//   THE MIN SPLIT TRACKS THE CODA — 7 rows.
//   nan, nan_te, nan_pn, nan_qz, nan_zz, nan_hai, cdo, plus hak_cn, all write
//   白 (-ʔ final) differently from 食 目 (-p/-t/-k final). A glottal-final 入聲
//   syllable really does behave differently from a stopped one in Min, so this
//   may be correct too — but unlike the Yue case nobody has checked it against
//   a source, and nan_zz's values (˩˨˩ against ˦˦) look too far apart to be the
//   same phenomenon. Needs one pass with a Min phonology to hand.
//
//   hak_cn IS PROBABLY A REAL ERROR and is the one to look at first. It writes
//   陰入 ˧ throughout, and 陽入 ˧ in 食 目 but ˥ in 白. Writing 陽入 as ˧ merges it
//   with 陰入, which Meixian distinguishes, and both descendant rows (hak_tw ˥,
//   hak_hl ˥˥) have the high value. 食 and 目 look wrong. The 力 of 朱古力 added
//   on 2026-09-21 was written ˥ for this reason.
//
//   UNEXAMINED — gan_yc, gan_fz, czh, czh_wy, cjy_xz, hsn_yz, yue_ts.
//   yue_ts is already reported by --wide for a self-contradictory 陰上 and is
//   blocking a 朱古力 cell; fixing that row settles both at once.
const DEBT = [
  // Added 2026-09-24, and these two are a different shape from the rest of the
  // 入聲 list: here the NEW cells are the correct ones and the row is wrong.
  //
  // yue_ts 陰入 — the row writes ˥˥ for black, blood, bone, house, one and
  //   snow, but the reviewer's source puts Taishanese 陰入 at 33 and the
  //   dictionary's own tone chart uses 口 as its exemplar of 55 and 頭 of 22.
  //   hundred and iron came in at ˧˧ from that source. Degrading them to the
  //   row's ˥˥ would make two right cells wrong to spare a guard; the row has
  //   to be re-based as a whole.
  // cpx 陰入 — the same, stated by the reviewer up front: "the cpx row writes
  //   every 入聲 as ˥˥, right for 陽入 but wrong for 陰入". Puxian 陰入 is a low
  //   contour, and the new iron cell is ˩˩ accordingly.
  { code: 'yue_ts', cls: '陰入' },
  { code: 'cpx', cls: '陰入' },

  // 入聲 — see the block above before touching any of these.
  { code: 'yue', cls: '陰入' },
  { code: 'yue_gz', cls: '陰入' },
  { code: 'yue_dg', cls: '陰入' },
  { code: 'yue_nn', cls: '陰入' },
  { code: 'yue_zs', cls: '陰入' },
  { code: 'zh_wenyan_edu', cls: '陰入' },
  { code: 'nan', cls: '陰入' },
  { code: 'nan_zz', cls: '陰入' },
  { code: 'nan_zz', cls: '陽入' },
  { code: 'nan_te', cls: '陽入' },
  { code: 'nan_pn', cls: '陽入' },
  { code: 'nan_qz', cls: '陽入' },
  { code: 'nan_hai', cls: '陽入' },
  { code: 'cdo', cls: '陽入' },
  { code: 'hak_cn', cls: '陽入' },
  { code: 'gan_yc', cls: '陰入' },
  { code: 'gan_fz', cls: '陰入' },
  { code: 'czh', cls: '陽入' },
  { code: 'czh_wy', cls: '陰入' },
  { code: 'cjy_xz', cls: '陽入' },
  { code: 'hsn_yz', cls: '陰入' },
  { code: 'hsn_yz', cls: '陽入' },
  { code: 'yue_ts', cls: '陽入' },
  // 平聲 — the original list.
  { code: 'zh_song', cls: '陽平' },
  { code: 'zh_song', cls: '陰平' },
  { code: 'cpx', cls: '陰平' },
  { code: 'czh_wy', cls: '陰平' },
  { code: 'czh', cls: '陽平' },
  { code: 'cnp', cls: '陰平' },
  { code: 'zh_jh', cls: '陰平' },
  { code: 'nan_pn', cls: '陽平' },
  { code: 'nan_pn', cls: '陰平' },
  { code: 'wuu_nb', cls: '陽平' },
  { code: 'wuu_hz', cls: '陽平' },
];

const wc = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', wc);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), wc, { filename: f });
const W = wc.WORDS;
const c = vm.createContext({ window: {} });
for (const f of ['wordmap_data.js', 'wordmap_meta.js'])
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^const /gm, 'var '), c);
const LANG_DATA = vm.runInContext('LANG_DATA', c);

// Sino-Vietnamese is excluded: its tone is not a function of 調類 alone. 陽平
// goes to huyền after an obstruent but to ngang after a sonorant, so 熊 hùng
// and 魚 ngư are both correct and both 陽平. Same caveat would apply to any
// other Sinoxenic row read this way.
const SKIP_ROWS = new Set(['vi_han', 'vi_nom']);
const sinitic = Object.keys(LANG_DATA).filter((k) =>
  /Sinitic/.test(String((LANG_DATA[k].meta || {}).family || '')) && !SKIP_ROWS.has(k));

// tone letters only; a cell with none is simply not evidence either way
const toneOf = (ipa) => (String(ipa).match(/[\u02E5-\u02E9]+/gu) || []).join('');
// ˥ and ˥˥ are the same claim; doubling a lone letter makes them compare equal
const norm = (t) => (t.length === 1 ? t + t : t);
const checked = new Set();   // rows that still have a checked coda on 入 cells

const seen = {};   // code -> class -> {contour -> [concepts]}  — 平/入, blocking
const wide = {};   // the same for 上/去 — advisory only, never counted
for (const id of Object.keys(W)) {
  const data = W[id].data || {};
  for (const code of sinitic) {
    const e = data[code];
    if (!e) continue;
    const surf = Array.isArray(e) ? e[0] : e.form;
    const ipa = Array.isArray(e) ? e[1] : e.ipa;
    if (!surf || [...surf].length !== 1) continue;      // single character only
    const cls = CLASS[surf];
    if (!cls) continue;
    const isWide = /^[陰陽](上|去)$/.test(cls);
    if (!/^[陰陽](平|入)$/.test(cls) && !(WIDE && isWide)) continue;   // see SCOPE above
    if (isWide && NOT_A_WITNESS.has(surf)) continue;
    if (ALLOW.some((a) => a.code.test(code) && a.ch === surf)) continue;
    const t = norm(toneOf(ipa));
    if (!t) continue;
    // The coda test has to allow the TONE LETTERS that follow it. Written
    // without them this required the IPA to end in the stop itself, which
    // only the rows that write no tone at all ever do — och, zh_tang,
    // zh_song, zh_han, oko. Measured before the fix: of 1048 入-class cells
    // just 61 matched, so `checked` never filled for any of the 58 modern
    // Sinitic rows and the 入聲 guard below skipped every one of them,
    // silently, while this file's header advertised that it checks 平 and 入.
    // Found 2026-09-21 while adding 力 to hak_cn. Ranges are \u-escaped with
    // the /u flag on purpose: tone letters are U+02E5..U+02E9 and a literal
    // range of them is unreadable and easy to mis-copy.
    if (/入$/.test(cls) && /[ptk\u0294]\u031A?[\u02E5-\u02E9]*$/u.test(String(surf ? ipa : ''))) checked.add(code);
    const store = isWide ? wide : seen;
    ((store[code] = store[code] || {})[cls] = store[code][cls] || {});
    (store[code][cls][t] = store[code][cls][t] || []).push(`${id} ${surf}`);
  }
}

const isDebt = (code, cls) => DEBT.some((d) => d.code === code && d.cls === cls);
const hits = [];
const debtHits = [];
for (const code of Object.keys(seen)) {
  for (const cls of Object.keys(seen[code])) {
    // a lect that merged 入 away cannot be held to a 入 contour
    if (/入$/.test(cls) && !checked.has(code)) continue;
    const contours = Object.keys(seen[code][cls]);
    if (contours.length < 2) continue;
    const detail = contours.map((t) => `${t} (${seen[code][cls][t].join(', ')})`).join('  vs  ');
    (isDebt(code, cls) ? debtHits : hits).push(
      `${code} ${LANG_DATA[code].name}: ${cls} written ${contours.length} ways — ${detail}`);
  }
}

// A DEBT entry that no longer matches anything is worse than no entry: it means
// the row was fixed and the note now lies about the data.
const stale = DEBT.filter((d) =>
  !(seen[d.code] && seen[d.code][d.cls] && Object.keys(seen[d.code][d.cls]).length > 1));

if (CHECK) {
  console.log(`violations: ${hits.length}`);
  if (stale.length) console.log(`stale: ${stale.length}`);
  process.exit(0);
}
console.log(`Checked ${sinitic.length} Sinitic rows against ${Object.keys(CLASS).length} characters.\n`);
if (!hits.length) console.log('No row disagrees with itself about a tone class.');
hits.forEach((h) => console.log('  ✗ ' + h));
if (debtHits.length) {
  console.log('\nKnown and unresolved (not counted):');
  debtHits.forEach((h) => console.log('  · ' + h));
  DEBT.filter((d) => d.why).forEach((d) => console.log(`    ${d.code} ${d.cls}: ${d.why}`));
}
if (stale.length) {
  console.log('\n⚠ DEBT entries that no longer match the data — delete them:');
  stale.forEach((d) => console.log(`    ${d.code} ${d.cls}`));
}

// ADVISORY. ˨˩˦ and ˨˩ are one tone written two ways, so a contour that is a
// prefix of another is not a disagreement. Never added to `hits`.
if (WIDE) {
  const compat = (a, b) => a.startsWith(b) || b.startsWith(a);
  const wideHits = [];
  for (const code of Object.keys(wide)) {
    for (const cls of Object.keys(wide[code])) {
      const contours = Object.keys(wide[code][cls]);
      if (contours.length < 2) continue;
      if (!contours.some((a) => contours.some((b) => !compat(a, b)))) continue;
      wideHits.push(`${code} ${LANG_DATA[code].name}: ${cls} — ` +
        contours.map((t) => `${t} (${wide[code][cls][t].join(', ')})`).join('  vs  '));
    }
  }
  wideHits.sort();
  console.log(`\n上/去, advisory (${wideHits.length}) — not counted, see the header for how to read it:`);
  wideHits.forEach((h) => console.log('  ~ ' + h));
}
process.exit(hits.length ? 1 : 0);
