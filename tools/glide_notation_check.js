#!/usr/bin/env node
/**
 * glide_notation_check.js — one row, one letter for the palatal glide.
 *
 * In IPA /j/ is the glide and /y/ is the close front rounded vowel. Ten rows
 * had both standing for the glide — Aguaruna wrote the same word yumi as
 * /jumi/ under "water" and /yumi/ under "rain" (owner 2026-08-27) — which came
 * from sources that use the Americanist y.
 *
 * The check is narrow on purpose, because y is a legitimate vowel almost
 * everywhere it appears:
 * It needs no phonological judgement, which is the point: it looks only at
 * cells whose LATIN SURFACE has a y before a vowel letter, and asks whether the
 * row transcribes that y as j in some cells and as y in others. So the y that
 * stands for a front rounded vowel is never involved — Finnish syödä /syødæ/,
 * Cantonese 水 /sɵy/, Song Chinese 血 /xyɛt/ have no surface y at all — and a
 * row that uses y throughout (Proto-Semitic *ʕayn-, Old Burmese klyit) is
 * consistent and passes.
 *
 * Usage: node tools/glide_notation_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const WORDS_DIR = path.resolve(__dirname, '..', 'words');
const CHECK = process.argv.includes('--check');
const V = 'aeiouɑɐɒæəɘɜɛɪɨɯɵøœɔʊʌɤɞʉ';

const ctx = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
for (const f of fs.readdirSync(WORDS_DIR).filter((f) => f.endsWith('.js')))
    vm.runInContext(fs.readFileSync(path.join(WORDS_DIR, f), 'utf8'), ctx, { filename: f });

const rows = new Map();
for (const [id, w] of Object.entries(ctx.WORDS)) {
    if (!w || !w.data) continue;
    for (const [code, e] of Object.entries(w.data)) {
        const s = Array.isArray(e) ? e[0] : (e && e.form);
        const i = Array.isArray(e) ? e[1] : (e && e.ipa);
        if (!s || s === '—' || !i || i === '—') continue;
        if (!rows.has(code)) rows.set(code, []);
        rows.get(code).push({ id, s, i });
    }
}
const violations = [];
// The sound test needs no phonology: within ONE row, take the cells whose LATIN
// surface has a y before a vowel letter, and see how that y is transcribed. If
// some of them put j there and others put y, the row is spelling one thing two
// ways — which is the Aguaruna case, where yumi was /jumi/ under "water" and
// /yumi/ under "rain". A row that consistently uses y (a reconstruction or an
// Americanist transcription) is never flagged, and neither is a y that stands
// for the front rounded vowel, because that y is not in the surface.
const SURF_Y = /y[aeiouáàâäãåéèêëíìîïóòôöõúùûüāēīōū]/i;
for (const [code, cells] of rows) {
    const cand = cells.filter((c) => SURF_Y.test(c.s));
    if (cand.length < 2) continue;
    const toJ = cand.filter((c) => /j/.test(c.i));
    const toY = cand.filter((c) => !/j/.test(c.i) && /y/.test(c.i));
    if (toJ.length && toY.length)
        for (const c of toY) violations.push({ code, id: c.id, s: c.s, i: c.i,
            other: toJ[0].s + ' /' + toJ[0].i + '/' });
}

if (CHECK) {
    console.log(`violations: ${violations.length}`);
    for (const v of violations) console.log(`  ${v.code} ${v.id} ${v.s} /${v.i}/ — the same row writes ${v.other}`);
    process.exit(0);
}
console.log('glide-notation check — j is the glide, y is a vowel\n');
if (!violations.length) console.log('clean — no row spells the palatal glide both ways.');
for (const v of violations) console.log(`  ${v.code.padEnd(9)} ${v.id.padEnd(9)} ${v.s.padEnd(16)} /${v.i}/   vs ${v.other}`);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
