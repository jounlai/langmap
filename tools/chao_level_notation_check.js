#!/usr/bin/env node
/**
 * chao_level_notation_check.js — one row writing one level tone two ways.
 *
 * ˧ and ˧˧ are the same pitch. A row that uses both is not describing two
 * tones, it is using two notations, and the minority spelling marks where the
 * row was written by a different hand or pasted from a different source.
 *
 * Found while auditing `yue_gz` (Gaozhou Yue), which the tone-inventory check
 * had flagged for overlapping every other Yue row at 73-82%. Gaozhou's own
 * convention is the doubled one — 三 saːm˥˥, 心 sɐm˥˥, 貓 maːu˥˥, 媽 maː˥˥ —
 * and it has exactly three cells with a bare level tone on an open syllable:
 *
 *   star  星 sɛŋ˥   byte-identical to yue_dg
 *   wind  风 fʊŋ˥   byte-identical to yue
 *   two   二 ji˨    byte-identical to yue, yue_dg, yue_nn and yue_zs
 *
 * Three out of three. The notation is the seam, and it shows exactly which
 * cells came in from a neighbour.
 *
 * THE ONE LEGITIMATE CASE, and it is common enough to matter: a short checked
 * syllable written with a single letter against a long open one written
 * doubled — Cantonese 陰入 ˥ against 陰平 ˥˥. So a level is NOT reported when
 * every bare use sits on a stop-final syllable and every doubled use does not.
 * That exemption is what keeps this from firing on half the Sinitic corpus for
 * doing the right thing.
 *
 * What is reported is the MINORITY spelling's cells, because the row's own
 * majority is the house convention for that row. Nothing here needs a
 * dictionary: the fix is the same tone value spelled the way the row spells it
 * everywhere else. It is left as debt rather than mass-edited because a few
 * rows are near-ties where picking a side is a house-style call, not a
 * correction — `cjy` is ˩×15 against ˩˩×13, and Taiyuan's merged 平聲 is 11
 * either way.
 *
 * Rows with fewer than 20 tone tokens are skipped as too thin to have a
 * convention.
 *
 * Usage:
 *   node tools/chao_level_notation_check.js          # full report
 *   node tools/chao_level_notation_check.js --check  # "minority-notation cells: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const MIN_TOKENS = 20;
const LEVELS = ['˥', '˦', '˧', '˨', '˩'];
// a segment run followed by its tone letters
const SYL = /([^˥˦˧˨˩\s]+)\s*([˥˦˧˨˩]+)/gu;
// stop-final: the entering-tone syllable that legitimately takes a short tone
const CHECKED = /[ptkʔ]̚?$/u;

const ctx = vm.createContext({});
vm.runInContext('var window = this; this.WORDS = window.WORDS = {};', ctx);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
    try { vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), ctx, { filename: f }); }
    catch (e) { /* another guard's problem */ }
const W = vm.runInContext('window.WORDS', ctx);

const cell = (c) => (Array.isArray(c) ? c : (c && c.form ? [c.form, c.ipa] : null));

const codes = new Set();
for (const id of Object.keys(W)) for (const k of Object.keys(W[id].data || {})) codes.add(k);

const rows = [];
let total = 0;
for (const code of [...codes].sort()) {
    const use = {}; let tokens = 0;
    for (const id of Object.keys(W)) {
        const x = cell((W[id].data || {})[code]);
        if (!x || !x[1]) continue;
        for (const m of String(x[1]).matchAll(SYL)) {
            tokens++;
            (use[m[2]] = use[m[2]] || []).push({ id, seg: m[1], checked: CHECKED.test(m[1]) });
        }
    }
    if (tokens < MIN_TOKENS) continue;

    const flags = [];
    for (const L of LEVELS) {
        const bare = use[L] || [], dbl = use[L + L] || [];
        if (!bare.length || !dbl.length) continue;
        // legitimate short-checked vs long-open contrast
        if (bare.every((x) => x.checked) && dbl.every((x) => !x.checked)) continue;
        const minorityIsBare = bare.length <= dbl.length;
        flags.push({
            level: L,
            minority: minorityIsBare ? L : L + L,
            majority: minorityIsBare ? L + L : L,
            cells: minorityIsBare ? bare : dbl,
            majorityCount: minorityIsBare ? dbl.length : bare.length,
        });
    }
    if (flags.length) {
        const n = flags.reduce((a, f) => a + f.cells.length, 0);
        total += n;
        rows.push({ code, flags, n });
    }
}
rows.sort((a, b) => b.n - a.n || a.code.localeCompare(b.code));

if (CHECK) {
    console.log('minority-notation cells: ' + total);
} else {
    console.log('A row writing one level tone two ways. Minority spelling shown; the fix is\n'
        + 'the row\'s own majority, and needs no source.\n');
    for (const r of rows) {
        console.log('### ' + r.code + '   ' + r.n + ' cell(s)');
        for (const f of r.flags)
            console.log('    ' + f.minority + ' x' + f.cells.length + '  against  ' + f.majority + ' x' + f.majorityCount
                + '   ' + f.cells.map((c) => c.id + '/' + c.seg + f.minority).join('  '));
    }
    console.log('\nrows: ' + rows.length + '\nminority-notation cells: ' + total);
}
