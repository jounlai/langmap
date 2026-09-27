#!/usr/bin/env node
/**
 * tone_letter_map_check.js — where a Han Map row marks tone with a FINAL
 * LETTER rather than a digit, that letter must carry the value the writing
 * system's own standard assigns it.
 *
 * tone_digit_map_check.js already catches a row that contradicts ITSELF: one
 * digit, two Chao values. It cannot catch the failure this guard exists for,
 * because that failure is perfectly self-consistent. The za row wrote every
 * one of its 61 cells from a tone table that was shifted by one position, so
 * every letter mapped to exactly one value, all 61 cells agreed with each
 * other, and all six values were wrong:
 *
 *      published            Standard Zhuang (1957/1982)
 *      unmarked ˧˧          unmarked  T1  24  ˨˦
 *      z        ˨˩˧         z         T2  31  ˧˩
 *      j        ˨˩          j         T3  55  ˥
 *      x        ˧˩          x         T4  42  ˦˨
 *      q        ˦˥          q         T5  35  ˧˥
 *      h        ˨˦          h         T6  33  ˧
 *
 * The row's own description said it too — "z=T1, j=T2, x=T3, q=T4, h=T5,
 * unmarked=T6" — which is the same table off by one, and is where the error
 * came from. So this guard hard-codes the STANDARD, not the row's majority:
 * a majority is exactly what a shifted table produces.
 *
 * Adding a row here means finding the published tone table for its
 * orthography and citing it in the comment. Do not derive one from the data.
 *
 * Run: node tools/tone_letter_map_check.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// Standard Zhuang, Latin 1982. Six tones on open syllables; checked syllables
// keep two, voicing of the written coda telling them apart.
//   en.wikipedia.org/wiki/Standard_Zhuang (tone table, 1957/1982 letters)
//   zh.wikipedia.org/wiki/壮语 — 1 陰平 24 · 2 陽平 31 z · 3 陰上 55 j ·
//   4 陽上 42 x · 5 陰去 35 q · 6 陽去 33 h · 7/9 陰入 (p,t,k) · 8 陽入 33 (b,d,g)
const ROWS = {
    za: {
        name: 'Standard Zhuang (Latin 1982)',
        open: { '': '˨˦', z: '˧˩', j: '˥', x: '˦˨', q: '˧˥', h: '˧' },
        // 陰入 is 55 on a short nucleus and 35 on a long one; in this
        // orthography only `a` and `o` are long (`ae`/`oe` are their short
        // counterparts), so a nucleus written a or o takes ˧˥.
        checkedVoiceless: (w) => (/(^|[^ae])a(?![e])|(^|[^o])o(?![e])/.test(w.slice(0, -1)) ? '˧˥' : '˥'),
        checkedVoiced: '˧',
    },
};

global.window = {};
// eslint-disable-next-line no-eval
eval(fs.readFileSync(path.join(ROOT, 'hanmap_data.js'), 'utf8'));
const { HAN_DATA, HAN_LIST } = window;

let checked = 0;
const bad = [];
for (const [code, R] of Object.entries(ROWS)) {
    for (const c of HAN_LIST) {
        const w = HAN_DATA[c].surface[code];
        if (!w) continue;
        const ipa = HAN_DATA[c].ipa[code] || '';
        checked++;
        let want;
        if (/[ptk]$/.test(w)) want = R.checkedVoiceless(w);
        else if (/[bdg]$/.test(w)) want = R.checkedVoiced;
        else {
            const m = /([zjxqh])$/.exec(w);
            want = R.open[m && /[aeiouw]/.test(w.slice(0, -1)) ? m[1] : ''];
        }
        const got = (ipa.match(/[˥-˩]+$/) || [''])[0];
        if (got !== want) bad.push(`  ${code} ${c}  ${w}  ${ipa}  — ${R.name} gives ${want}, not ${got || '(no tone)'}`);
    }
}

console.log(`tone letter map — ${checked} cells in ${Object.keys(ROWS).length} row(s)`);
if (bad.length) console.log(bad.join('\n'));
console.log(`wrong: ${bad.length}`);
process.exit(process.argv.includes('--strict') && bad.length ? 1 : 0);
