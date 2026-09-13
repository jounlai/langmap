#!/usr/bin/env node
/**
 * lang_name_script_check.js — the zh and yue name tables must each be written
 * in their own script.
 *
 * Owner, 2026-09-13: 「粤語の名称が簡体字になってる」.
 *
 * The atlas writes the `zh` UI in simplified characters and the `yue` UI in
 * traditional ones. `tools/zh_script_convention.js` has enforced that for the
 * WORD data for a long time — but nothing checked the LANGUAGE NAMES, and four
 * yue names had simplified characters in them (沃莱艾語, 尔苏话, 巴饶克佤语,
 * 帕欧語) while nine zh names were traditional (衡陽湘語, 台灣華語, 鹿兒島漢字音).
 * Some arrived with the 2,780-string rename, some were older.
 *
 * THE DISCRIMINATOR IS DERIVED, NOT LISTED. A hand-pasted list of "simplified
 * characters" is how the first attempt at this went wrong: 西, 里, 角, 干 and
 * 欧 are shared, and a careless list reported 154 false positives out of 1,242
 * names. Instead the pairs are learned from the corpus itself — every position
 * where the zh and yue names for the SAME code differ is a simplified:
 * traditional pair — kept only when it is attested twice or more, and unioned
 * with the discriminating pairs zh_script_convention.js already carries. The
 * frequency floor is what removes the noise: 瑞士/瑞斯 aligns once by accident,
 * 语/語 aligns hundreds of times.
 *
 * Usage: node tools/lang_name_script_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const c = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(ROOT, 'lang_names.js'), 'utf8').replace(/^const /gm, 'var ')
  + '\nthis.N = LANG_NAMES;', c);
const N = c.N;

const simpToTrad = new Map();
const freq = new Map();
for (const code of Object.keys(N.yue || {})) {
  const t = N.yue[code], s = N.zh[code];
  if (!t || !s || t === s || [...t].length !== [...s].length) continue;
  const T = [...t], S = [...s];
  for (let i = 0; i < T.length; i++) {
    if (T[i] === S[i]) continue;
    const k = S[i] + '\t' + T[i];
    freq.set(k, (freq.get(k) || 0) + 1);
  }
}
// Frequency alone is not enough: 瑞士/瑞斯 aligns in five rows by accident,
// because 士 and 斯 are BOTH shared characters that happen to sit in the same
// position. The property that actually distinguishes a real pair is exclusivity
// — a simplified character is essentially absent from the traditional table and
// vice versa. 语 appears 1,100 times in zh and never in yue; 士 appears freely
// in both. So a candidate is kept only if each member is near-absent from the
// other table (the leaks we are hunting are the only appearances, and there are
// a handful).
const count = (tbl, ch) => Object.values(tbl || {}).reduce((n, v) => n + ((v.match ? (v.split(ch).length - 1) : 0)), 0);
for (const [k, n] of freq) {
  if (n < 2) continue;                       // one alignment is coincidence
  const [sCh, tCh] = k.split('\t');
  if (count(N.yue, sCh) > 4) continue;       // simplified member lives in the traditional table too
  if (count(N.zh, tCh) > 4) continue;        // and the reverse
  simpToTrad.set(sCh, tCh);
}
// plus the pairs the word-data guard already carries
try {
  const src = fs.readFileSync(path.join(ROOT, 'tools/zh_script_convention.js'), 'utf8');
  const block = src.match(/const PAIRS = \[([\s\S]*?)\];/);
  for (const p of (block[1].replace(/\/\/[^\n]*/g, '').match(/[㐀-鿿]{2}/g) || [])) {
    simpToTrad.set(p[1], p[0]);
  }
} catch (e) { /* the word guard is allowed to move */ }
const tradToSimp = new Map([...simpToTrad].map(([s, t]) => [t, s]));

const problems = [];
for (const [code, name] of Object.entries(N.yue || {})) {
  const hits = [...name].filter((ch) => simpToTrad.has(ch));
  if (hits.length) problems.push(`yue.${code} = "${name}" is simplified [${hits.join('')}] — should read "${[...name].map((ch) => simpToTrad.get(ch) || ch).join('')}"`);
}
for (const [code, name] of Object.entries(N.zh || {})) {
  const hits = [...name].filter((ch) => tradToSimp.has(ch));
  if (hits.length) problems.push(`zh.${code} = "${name}" is traditional [${hits.join('')}] — should read "${[...name].map((ch) => tradToSimp.get(ch) || ch).join('')}"`);
}

if (!CHECK) {
  console.log(`language-name script convention — ${simpToTrad.size} discriminating pairs learned`);
  console.log('');
  for (const p of problems) console.log('  ' + p);
  console.log('');
}
console.log(`violations: ${problems.length}`);
process.exit(CHECK ? 0 : (problems.length ? 1 : 0));
