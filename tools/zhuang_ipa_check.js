#!/usr/bin/env node
/**
 * zhuang_ipa_check.js — the Zhuang rows' IPA must be what their own spelling
 * says, through the published Latin→IPA table.
 *
 * This replaces a narrower guard written the same day. tone_digit_map_check
 * catches a row that contradicts ITSELF: one digit, two Chao values. It cannot
 * catch what happened to the za row, because that failure was perfectly
 * self-consistent — all 61 cells were generated from a tone table shifted one
 * place, so every letter mapped to exactly one value and every value was
 * wrong:
 *
 *      published            Standard Zhuang (1957/1982)
 *      unmarked ˧˧          unmarked  T1  24  ˨˦
 *      z        ˨˩˧         z         T2  31  ˧˩
 *      j        ˨˩          j         T3  55  ˥
 *      x        ˧˩          x         T4  42  ˦˨
 *      q        ˦˥          q         T5  35  ˧˥
 *      h        ˨˦          h         T6  33  ˧
 *
 * The row's own description said the same thing — "z=T1, j=T2, x=T3, q=T4,
 * h=T5, unmarked=T6" — which is where it came from. A majority vote over the
 * data would have certified all of it, so this guard has no vote in it: it
 * regenerates each cell from the spelling with tools/zhuang_ipa.js and demands
 * an exact match.
 *
 * That also covers the segmental half, which was wrong in its own ways — s
 * written ɬ ten times and s once, c written ts, ae coming out aː in 七 and 日
 * but a in 北 and ɛ in 坐, ie coming out e in five cells, jɛ in 一 and i in 犬.
 *
 * A row belongs here only if its spelling determines its pronunciation. That
 * is true of Standard Zhuang by design — the 1982 alphabet is phonemic — and
 * the two rows are za (Sino-Zhuang readings) and za_sd (native words written
 * in Sawndip). Both spell in the same orthography, so both are checked.
 *
 * Run: node tools/zhuang_ipa_check.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { zhuangIpa } = require('./zhuang_ipa.js');

const ROOT = path.join(__dirname, '..');
const ROWS = ['za', 'za_sd'];

global.window = {};
// eslint-disable-next-line no-eval
eval(fs.readFileSync(path.join(ROOT, 'hanmap_data.js'), 'utf8'));
const { HAN_DATA, HAN_LIST } = window;

let checked = 0;
const bad = [];
for (const code of ROWS) {
    for (const c of HAN_LIST) {
        const w = HAN_DATA[c].surface[code];
        if (!w) continue;
        checked++;
        const want = zhuangIpa(w);
        const got = HAN_DATA[c].ipa[code];
        if (want === null) bad.push(`  ${code} ${c}  ${w} — not a legal Standard Zhuang syllable`);
        else if (want !== got) bad.push(`  ${code} ${c}  ${w}  published ${got} — the orthography gives ${want}`);
    }
}

console.log(`Zhuang IPA — ${checked} cells in ${ROWS.length} rows`);
if (bad.length) console.log(bad.join('\n'));
console.log(`wrong: ${bad.length}`);
process.exit(process.argv.includes('--strict') && bad.length ? 1 : 0);
