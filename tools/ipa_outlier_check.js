#!/usr/bin/env node
/**
 * ipa_outlier_check.js — hold every row to its OWN transcription table, and
 * report the cells that break it.
 *
 * WHY. cldf_convert.js learns, from a row's existing cells, how that row
 * spells itself: Asu writes sh as ʃ, Northern Paiute writes ü as ɨ, Truku
 * writes ng as ŋ. It uses the table to convert NEW candidates. This tool asks
 * the same question in the other direction — does the row already contain
 * something it would not write? — and that turns out to find real defects,
 * because a cell added by a different pass, from a different source, in a
 * different year, does not know what the rest of the row does.
 *
 * The case that prompted it. Truku bird was published as qbhni / qbhəni. The
 * ə is not in the spelling; it is the epenthetic schwa Seediq inserts in
 * clusters, and the row writes it in FOUR cells — pngrah pŋərah, dxgal
 * dəxɡal, bhgay bhəɡaj, qbhni qbhəni — while leaving it out of ten others
 * with the same shape: btunux btunux, bgihur bɡihur, gsilung ɡsiluŋ, dgiyaq
 * dɡijaq, lnglungan lŋluŋan, mtaqi mtaqi, gmalu ɡmalu, qhuni qhuni. Both
 * halves came from ABVD, which is itself inconsistent about it. Nothing in
 * the guard suite could see that, because every individual cell is
 * well-formed; only the row taken together is wrong.
 *
 * WHAT IT REPORTS. For each row, learn the table, then re-derive each cell's
 * IPA from its own surface. A cell is an OUTLIER when the derivation succeeds
 * — every segment covered by a rule the row is unanimous about — and comes
 * out different from what is stored. That is the row contradicting itself in
 * a way that cannot be a coincidence of orthography.
 *
 * WHAT IT DOES NOT REPORT, on purpose:
 *   - cells the table cannot cover. An unconvertible cell is not evidence of
 *     anything; it is usually a segment that appears once.
 *   - rows that mark stress, whose ˈ the aligner attaches to the wrong
 *     consonant. Same reason cldf_convert refuses them.
 *   - a difference that is ONLY a stress or length mark, which is a notation
 *     choice rather than a contradiction, unless --strict.
 *
 * A REPORT IS NOT A VERDICT. The stored cell may be the right one and the
 * majority wrong — that is exactly what happened in Embu, where ĩ is written
 * i in eighteen cells and ɪ in four, and the FOUR are the correct ones.
 * Read the row before changing it, and never overwrite a cell that was placed
 * by hand without saying so.
 *
 *   node tools/ipa_outlier_check.js              every row, ranked
 *   node tools/ipa_outlier_check.js trv          one row, with its table
 *   node tools/ipa_outlier_check.js --strict     count mark-only differences
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { learn, marksStress, convertInner } = require('./cldf_convert');

const ROOT = path.join(__dirname, '..');

/** Marks whose presence or absence is a notation choice, not a contradiction.
 *  Stress and length are placed per-cell by a person; a row may legitimately
 *  mark them where it knows them and leave them off where it does not. */
const SOFT = /[ˈˌː]/g;

function main() {
    const args = process.argv.slice(2);
    const strict = args.includes('--strict');
    const one = args.find((a) => !a.startsWith('--'));

    const data = JSON.parse(fs.readFileSync(
        path.join(ROOT, 'data/wordmap_seo.json'), 'utf8'));

    const rows = [];
    for (const [code, lang] of Object.entries(data.langs)) {
        if (one && code !== one) continue;
        const words = lang.words || {};
        const cells = Object.entries(words)
            .filter(([, e]) => e && e[0] && e[0] !== '—' && e[1] && /[a-zA-Z]/.test(e[0]));
        if (cells.length < 15) continue;
        if (marksStress(lang)) continue;

        const { table } = learn(lang);
        if (table.size < 8) continue;

        const out = [];
        for (const [concept, e] of cells) {
            const r = convertInner(e[0], table);
            if (!r.ipa) continue;                  // not covered: says nothing
            let got = r.ipa, want = e[1];
            if (!strict) { got = got.replace(SOFT, ''); want = want.replace(SOFT, ''); }
            if (got === want) continue;
            out.push([concept, e[0], e[1], r.ipa]);
        }
        if (out.length) rows.push([out.length, cells.length, code, lang.name, out, table]);
    }

    rows.sort((a, b) => b[0] / b[1] - a[0] / a[1]);

    if (one) {
        if (!rows.length) { console.log(`${one}: no outliers`); return; }
        const [n, total, code, name, out, table] = rows[0];
        console.log(`${code}  ${name}   ${n} outliers in ${total} convertible cells\n`);
        console.log(`TABLE (${table.size} unanimous segments)`);
        console.log(`  ${[...table].filter(([k, v]) => k !== v).map(([k, v]) => `${k}→${v}`).join('  ')}\n`);
        for (const [c, s, stored, derived] of out) {
            console.log(`  ${c.padEnd(11)}${s.padEnd(16)}row says ${stored.padEnd(18)}table says ${derived}`);
        }
        return;
    }

    const cells = rows.reduce((s, r) => s + r[0], 0);
    console.log(`${rows.length} rows contradict their own table, ${cells} cells\n`);
    for (const [n, total, code, name] of rows.slice(0, 45)) {
        console.log(`  ${String(n).padStart(3)}/${String(total).padEnd(4)}`
            + `${(100 * n / total).toFixed(0).padStart(3)}%  ${code.padEnd(10)}${(name || '').slice(0, 30)}`);
    }
}

main();
