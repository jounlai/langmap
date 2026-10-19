#!/usr/bin/env node
/*
 * cjk_note_spacing_check.js — no space between two CJK words in the ja / zh /
 * yue text of a Han Map row (HAN_LANG_META: description, readingType, notes).
 *
 * Those strings feed the SEO meta descriptions, so "MCPDict（漢字音典）の 揚州
 * 字表による。これは 慕禃 が編んだ" went out as the Japanese snippet (r36 a2).
 * The r35 word-salad guard in export_seo_data.js only looked at the chip
 * fields. A cited table name goes in 《》, an example character in 「」 (zh
 * “”), and a person's name simply runs on — see the r36 fixes for the forms.
 *
 * A space before Latin / IPA / digits is fine ("如“水”ʃy²¹", "阴平 213"); only
 * CJK SPACE CJK is reported. Prints "violations: N".
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'hanmap_data.js'), 'utf8') +
  '\nthis.M = HAN_LANG_META;', ctx);

const CJK = '\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}ー々〆';
const RE = new RegExp('[' + CJK + '（）「」『』《》、。・：；][\\s\\u3000]+[' + CJK + '（「『《]', 'gu');

const bad = [];
const walk = (o, p) => {
  if (typeof o === 'string') {
    if (!/\.(ja|zh|yue|zh-hant)$/.test(p)) return;
    for (const m of o.matchAll(RE)) bad.push(p + ': …' + o.slice(Math.max(0, m.index - 10), m.index + 14) + '…');
  } else if (o && typeof o === 'object') {
    for (const [k, v] of Object.entries(o)) walk(v, p + '.' + k);
  }
};
walk(ctx.M, 'HAN_LANG_META');

for (const b of bad.slice(0, 30)) console.log('  ' + b);
console.log('violations: ' + bad.length);
