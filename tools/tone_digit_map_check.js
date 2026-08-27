#!/usr/bin/env node
/**
 * tone_digit_map_check.js — where a Han Map row writes a tone digit on the
 * surface, one digit must mean one Chao value throughout that row.
 *
 * 23 rows romanize with a final tone digit (`mux6`, `chi1`, `tsa51`). The digit
 * and the IPA are two statements about the same tone, so the row itself defines
 * a digit → value map, and a cell that breaks its own row's map is wrong
 * whichever half you trust. No knowledge of the language is needed to see it —
 * which is the point: this found `bca` 七 after 44 other guards had passed it.
 *
 *   bca  60 of 61 cells honoured the map; 七 was written `chi1` (digit 1 = ˥
 *        everywhere else) with the IPA ˦˦, a contour the row never uses again.
 *        七 is 質韻 清入, and its 清入 siblings 一 `it6` and 足 `jvx6` are both
 *        digit 6 / ˨˨ — so the cell became `chi6` /tɕʰi˨˨/ (review 465).
 *        ˦˦ IS a real Bai tone, but Jianchuan's; this row is Central/Dali Bai,
 *        whose inventory here is ˥ ˧˥ ˨˩˦ ˨˩ ˨˨.
 *
 * Only rows with a STRICT map are judged. Min and Wu rows map one digit to
 * several values because a syllable takes its sandhi tone inside a compound
 * (nan_lei 64%, wuu_jx 59%), and four Yue rows write one level two ways
 * (˥ / ˥˥); those sit far below the threshold and are skipped rather than
 * whitelisted cell by cell. The count of skipped rows is printed so the
 * exemption stays visible.
 *
 * Usage: node tools/tone_digit_map_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const MIN_CELLS = 20;      // fewer than this and a "majority" means nothing
const STRICT = 0.95;       // at or above, the row HAS a map and a stray is an error

// Outliers inside a strict row that are not settled yet. Reported as debt, not
// as failure, so the tree stays green and the gap stays in view.
const DEBT = new Map([
    ['nan_th|行:1', 'Thai-Chinese Hokkien 行 ˥˥ against the row\'s ˧˥ for digit 5 — sandhi or a real value, needs a native check'],
    ['nan_th|行:2', 'same cell, literary reading'],
]);

const ctx = vm.createContext({});
vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, 'hanmap_data.js'), 'utf8')
    .replace(/^const /gm, 'var ') + ';', ctx);
const HD = vm.runInContext('HAN_DATA', ctx);
const HM = vm.runInContext('HAN_LANG_META', ctx);
const chars = Object.keys(HD);

const violations = [];
const debtSeen = new Set();
let strictRows = 0, looseRows = 0;
const loose = [];

for (const code of Object.keys(HM)) {
    const cells = [];
    for (const ch of chars) {
        const s = (HD[ch].surface || {})[code];
        const i = (HD[ch].ipa || {})[code];
        if (!s || !i) continue;
        const d = (String(s).match(/([0-9])$/) || [])[1];
        const t = (String(i).match(/[˥-˩]+$/) || [])[0];
        if (!d || !t) continue;
        cells.push({ ch, s, d, t, i });
    }
    if (cells.length < MIN_CELLS) continue;
    const byDigit = {};
    for (const x of cells) ((byDigit[x.d] = byDigit[x.d] || {})[x.t] = (byDigit[x.d][x.t] || 0) + 1);
    const maj = {};
    for (const d of Object.keys(byDigit)) maj[d] = Object.entries(byDigit[d]).sort((a, b) => b[1] - a[1])[0][0];
    const bad = cells.filter((x) => x.t !== maj[x.d]);
    const ratio = (cells.length - bad.length) / cells.length;
    if (ratio < STRICT) { looseRows++; loose.push(`${code} ${(100 * ratio).toFixed(0)}%`); continue; }
    strictRows++;
    for (const x of bad) {
        const key = code + '|' + x.ch;
        if (DEBT.has(key)) { debtSeen.add(key); continue; }
        violations.push({ code, ch: x.ch, s: x.s, got: x.t, want: maj[x.d], ipa: x.i });
    }
}

const staleDebt = [...DEBT.keys()].filter((k) => !debtSeen.has(k));

if (CHECK) {
    console.log(`violations: ${violations.length}`);
    for (const v of violations)
        console.log(`  ${v.code} ${v.ch} "${v.s}" /${v.ipa}/ ends ${v.got} but digit ${v.s.slice(-1)} is ${v.want} elsewhere in the row`);
    if (debtSeen.size) console.log(`  debt: ${debtSeen.size} unsettled outlier(s) in strict rows`);
    console.log(`  ${strictRows} row(s) hold a strict digit→tone map; ${looseRows} skipped (tone sandhi / one level spelled two ways)`);
    for (const k of staleDebt) console.log(`  note: DEBT entry '${k}' no longer matches — drop it from the list`);
    process.exit(0);
}
console.log('tone-digit map check — one digit, one Chao value, within a row\n');
console.log(`${strictRows} row(s) with a strict map, ${looseRows} skipped: ${loose.join('  ')}\n`);
if (!violations.length) console.log('clean — every strict row honours its own digit→tone map.');
for (const v of violations)
    console.log(`  ${v.code.padEnd(9)} ${v.ch}  "${v.s}"  /${v.ipa}/  ends ${v.got}, digit says ${v.want}`);
if (debtSeen.size) {
    console.log('\nunsettled outliers (debt, not a regression):');
    for (const k of [...debtSeen].sort()) console.log(`  ${k.padEnd(14)} ${DEBT.get(k)}`);
}
for (const k of staleDebt) console.log(`  note: DEBT entry '${k}' no longer matches — drop it from the list`);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
