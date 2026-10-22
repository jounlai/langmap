#!/usr/bin/env node
/*
 * speaker_prose_parse_check.js — run each page's own langSpeakerCount() over
 * every row whose speaker figure is prose, and flag reads that cannot be right.
 *
 * Why (2026-10-23): the Han Map read "約 3,500万人" as 500万 — the regex started
 * after the thousands comma — so Jiao-Liao Mandarin (Qingdao), Meixian Hakka
 * and Guilin ranked as small varieties and dropped out at the widest zoom. The
 * Word Map's fallback read "Extinct (~1700s as L1 …)" as 1,700 speakers. No
 * review sees this: the number is never shown, it only decides which labels
 * survive the zoom gate and the collision thinning, and a missing label looks
 * like a design choice.
 *
 * Flags, per row:
 *   comma   the prose has a digit group like 3,500 and the parse disagrees with
 *           the grouped number (×万/億/K/M/B as written)
 *   extinct the prose says extinct / historical / proto and the parse is > 0
 *   zero    the prose has a 万/億 figure and the parse is 0
 *
 * Usage: node tools/speaker_prose_parse_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.join(__dirname, '..');

function pageFn(page) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const at = html.indexOf('function langSpeakerCount(code)');
  if (at < 0) throw new Error(page + ': langSpeakerCount not found');
  const rest = html.slice(at);
  return rest.slice(0, rest.indexOf('\n        }\n') + 10);
}

const UNIT = { '億': 1e8, '万': 1e4, k: 1e3, m: 1e6, b: 1e9 };
function grouped(s) {
  const m = s.match(/(\d{1,3}(?:,\d{3})+)(?:\.\d+)?\s*(億|万|[KMB]\b)?/i);
  if (!m) return null;
  const n = parseFloat(m[1].replace(/,/g, ''));
  return n * (m[2] ? UNIT[m[2].toLowerCase()] || UNIT[m[2]] : 1);
}
const DEAD = /^\s*(extinct|歴史言語|historical)|推定不可|祖語/i;

function check(label, codes, meta, f) {
  const bad = [];
  for (const code of codes) {
    const m = meta(code);
    if (!m || m.speakerCount) continue;
    const s = m.speakers;
    if (typeof s !== 'string') continue;
    const v = f(code);
    const g = grouped(s);
    if (g != null && Math.abs(v - g) / g > 0.01) bad.push(`${label} ${code}: comma — "${s}" parsed ${v}, grouped ${g}`);
    if (DEAD.test(s) && v > 0) bad.push(`${label} ${code}: extinct — "${s}" parsed ${v}`);
    if (/\d\s*(億|万)/.test(s) && v === 0) bad.push(`${label} ${code}: zero — "${s}" parsed 0`);
  }
  return bad;
}

// Han Map: HAN_LANG_META carries the prose; LANG_DATA meta is stubbed there.
const hc = { console }; hc.window = hc; vm.createContext(hc);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'hanmap_data.js'), 'utf8'), hc);
vm.runInContext('var LANG_DATA = {};' + pageFn('hanmap.html') + ';this.f = langSpeakerCount;', hc);
const han = check('hanmap', Object.keys(hc.HAN_LANG_META), (c) => hc.HAN_LANG_META[c], hc.f);

// Word Map: wordmap_data.js + wordmap_meta.js.
const wc = { console }; wc.window = wc; vm.createContext(wc);
for (const f of ['wordmap_data.js', 'wordmap_meta.js'])
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), wc);
vm.runInContext(pageFn('wordmap.html') + ';this.f = langSpeakerCount; this.LD = LANG_DATA;', wc);
const wm = check('wordmap', Object.keys(wc.LD), (c) => wc.LD[c] && wc.LD[c].meta, wc.f);

const bad = han.concat(wm);
console.log('speaker prose parse — each page\'s langSpeakerCount over its prose-only rows\n');
for (const b of bad) console.log('  ' + b);
console.log(`\nviolations: ${bad.length}`);
if (process.argv.includes('--check') && bad.length) process.exit(1);
