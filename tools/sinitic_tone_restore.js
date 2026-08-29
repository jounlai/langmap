#!/usr/bin/env node
/**
 * sinitic_tone_restore.js — what should this toneless cell's contour be?
 *
 * sinitic_tone_present_check.js finds Sinitic cells that have lost their Chao
 * letters and tells you to "restore each from the row's own cells of the same
 * tone class". This does the lookup. For every cell still carried in that
 * check's lock file it prints the cell, its 調類, and every OTHER
 * single-character cell in the same row belonging to the same class, with its
 * contour. Where two or more of those agree, the answer is on the line.
 *
 *   node tools/sinitic_tone_restore.js            # every locked cell
 *   node tools/sinitic_tone_restore.js '^snow$'   # one concept (regex)
 *
 * It reads the 調類 table out of sinitic_tone_class_check.js rather than
 * keeping a second copy, so the two cannot drift apart.
 *
 * Three cautions, learned by using it (see docs/dev-handoff.md #49):
 *
 *   Do not count pronouns. 我, 你 and 汝 carry 變調 and neutral tone more than
 *   any other word class, which is why the class checker excludes them too.
 *
 *   One witness is not enough when the witness may itself be copied. 白 is
 *   still toneless in thirteen rows and stays that way, because its only 陽入
 *   neighbour 舌 reads ˩˨ in four unrelated Wu lects at once — that is one
 *   value copied four times, not four independent observations.
 *
 *   入聲 in Mandarin is not a class any more, so this tool cannot help there
 *   and will happily show you six witnesses that disagree. Use the 清入 rule
 *   for the row's dialect group instead: Southwestern sends it to 陽平,
 *   Zhongyuan to 陰平, Lanyin to 去聲, and Beijing-type distributes it word by
 *   word, where 雪 goes with 百 and 铁 to 上聲.
 */
'use strict';
const fs = require('fs'), vm = require('vm'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(__dirname, 'sinitic_tone_class_check.js'), 'utf8');
const CLASS = eval('(' + src.match(/const CLASS = (\{[\s\S]*?\n\});/)[1] + ')');
const PRONOUN = new Set(['我', '你', '妳', '汝', '尔', '爾']);

const wc = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', wc);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), wc, { filename: f });
const W = wc.WORDS;
const lock = JSON.parse(fs.readFileSync(path.join(__dirname, 'sinitic_tone_present.lock.json'), 'utf8'));
const cell = (id, c) => {
  const e = W[id] && W[id].data[c];
  if (!e) return null;
  return Array.isArray(e) ? [e[0], e[1]] : [e.form, e.ipa];
};
const tone = (i) => (String(i).match(/[˥-˩]+/gu) || []).join('');
const ONLY = process.argv[2] ? new RegExp(process.argv[2]) : null;

let decidable = 0, total = 0;
for (const key of lock) {
  const [code, concept] = key.split('|');
  if (ONLY && !ONLY.test(concept)) continue;
  const c = cell(concept, code);
  if (!c) continue;
  total++;
  const cls = CLASS[c[0]];
  const same = [];
  const contours = new Set();
  for (const id of Object.keys(W)) {
    const d = cell(id, code);
    if (!d || [...d[0]].length !== 1) continue;
    if (!cls || CLASS[d[0]] !== cls || PRONOUN.has(d[0])) continue;
    const t = tone(d[1]);
    if (!t) continue;
    same.push(`${id} ${d[0]} ${t}`);
    contours.add(t);
  }
  if (contours.size === 1 && same.length > 1) decidable++;
  console.log(code.padEnd(9) + concept.padEnd(7) + `${c[0]} /${c[1]}/`.padEnd(16) +
    (cls || '??').padEnd(4) + '  ' + (same.join('  ') || '(no witness)'));
}
console.log(`\n${total} toneless cell(s); ${decidable} have two or more witnesses that agree.`);
