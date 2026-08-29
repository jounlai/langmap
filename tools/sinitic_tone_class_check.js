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
 * Usage:
 *   node tools/sinitic_tone_class_check.js           # report
 *   node tools/sinitic_tone_class_check.js --check   # print "violations: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

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
];

// The backlog this guard found on the day it was written. Recording it as debt
// rather than as failure is the point: the number is visible, the tree stays
// green, and any NEW disagreement — a row or class not on this list — fails.
// Work the list down and delete entries; the stale check below will complain if
// an entry stops matching, so a fix cannot hide behind its own note.
//
// hak_cn 陽平 is the one to start with, and the instructive one: its MAJORITY is
// wrong. 紅 魚 鹽 all say ˨˦ and only 名 says ˩, but Meixian 陽平 is 11 and
// hak_tw writes all four that way. See docs/dev-handoff.md item 27.
//
// Already fixed and therefore absent: the 15 `orange` cells that carried
// Beijing's 陽平 ˧˥ into rows whose own 陽平 is something else, and nan 紅.
const DEBT = [
  { code: 'hak_cn', cls: '陽平',
    why: 'the majority is the wrong one — Meixian 陽平 is 11, which only 名 and 茶 write. Start here.' },
  { code: 'zh_song', cls: '陽平' },
  { code: 'zh_song', cls: '陰平' },
  { code: 'wuu', cls: '陽平' },
  { code: 'cdo', cls: '陽平' },
  { code: 'cpx', cls: '陰平' },
  { code: 'cpx', cls: '陽平' },
  { code: 'nan_zz', cls: '陰平' },
  { code: 'gan_yc', cls: '陰平' },
  { code: 'gan_ja', cls: '陰平' },
  { code: 'cjy_xz', cls: '陽平' },
  { code: 'cjy_xz', cls: '陰平' },
  { code: 'czh_wy', cls: '陰平' },
  { code: 'gan', cls: '陽平' },
  { code: 'mnp', cls: '陽平' },
  { code: 'mnp', cls: '陰平' },
  { code: 'czh', cls: '陽平' },
  { code: 'cnp', cls: '陽平' },
  { code: 'cnp', cls: '陰平' },
  { code: 'zh_jh', cls: '陽平' },
  { code: 'zh_jh', cls: '陰平' },
  { code: 'nan_pn', cls: '陽平' },
  { code: 'nan_pn', cls: '陰平' },
  { code: 'wuu_nb', cls: '陽平' },
  { code: 'wuu_sz', cls: '陽平' },
  { code: 'wuu_hz', cls: '陽平' },
  { code: 'wuu_hz', cls: '陰平' },
  { code: 'wuu_jh', cls: '陽平' },
  { code: 'wuu_jh', cls: '陰平' },
  { code: 'wuu_jx', cls: '陽平' },
  { code: 'wuu_jx', cls: '陰平' },
  { code: 'yue_zs', cls: '陽平' },
  { code: 'zh_cd', cls: '陰平' },
  { code: 'zh_hf', cls: '陰平' },
  { code: 'zh_nj', cls: '陽平' },
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

const seen = {};   // code -> class -> {contour -> [concepts]}
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
    if (!/^[陰陽](平|入)$/.test(cls)) continue;          // see SCOPE above
    if (ALLOW.some((a) => a.code.test(code) && a.ch === surf)) continue;
    const t = norm(toneOf(ipa));
    if (!t) continue;
    if (/入$/.test(cls) && /[ptkʔ]̚?$/.test(String(surf ? ipa : ''))) checked.add(code);
    ((seen[code] = seen[code] || {})[cls] = seen[code][cls] || {});
    (seen[code][cls][t] = seen[code][cls][t] || []).push(`${id} ${surf}`);
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
process.exit(hits.length ? 1 : 0);
