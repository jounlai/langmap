#!/usr/bin/env node
/**
 * ipa_notation_check.js — one sound, two notations, inside a single row.
 *
 * WHY. The atlas's IPA field has no declared depth, and rows were filled by
 * different passes from different sources over months. Two opposite failures
 * result, and the owner spotted one of each:
 *
 *   TOO SHALLOW. Truku wrote the rhotic as a trill r in ten cells and a tap ɾ
 *   in two. Truku Seediq /r/ is a tap, so the MAJORITY was the error — a
 *   warning against ever normalising these to the commoner form. The row
 *   cannot tell you which of its two spellings is right; only the literature
 *   can. This tool finds the disagreement and stops there.
 *
 *   TOO DEEP, UNEVENLY. Irish writes the slender velars three ways — c in
 *   uisce, ceann, ceathair and céad, ɟ in gealach, farraige and cúig, kʲ in
 *   cré — and marks broad consonants with ˠ in 38 of 85 cells while leaving
 *   crann, cat, madra, aon and a dozen others plain. Broad and slender is the
 *   central contrast of Irish, so the answer is not to strip the marks; it is
 *   to finish them. Either way the row currently contradicts itself.
 *
 * WHAT IT CHECKS. Pairs of IPA notations that denote the same sound, or that
 * a single language almost never contrasts. If a row uses both members, it is
 * reported with the cells on each side.
 *
 * WHAT IT CANNOT DECIDE, and does not try to. Some rows contrast a pair
 * genuinely — Spanish r and ɾ are separate phonemes (pero/perro), Portuguese
 * has both a tap and a guttural rhotic, and English varieties write ɾ for the
 * flapped /t/ in water, which has nothing to do with their /r/. So this
 * prints evidence, never a verdict, and the rhotic pair is only reported when
 * the SURFACE spells both with the same plain letter — which is what makes a
 * split suspicious rather than phonemic.
 *
 *   node tools/ipa_notation_check.js           every row, worst first
 *   node tools/ipa_notation_check.js ga        one row, in detail
 *   node tools/ipa_notation_check.js --check   "violations: N" for check_all
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

/**
 * [label, A, B, sameSurfaceLetter]
 *
 * A and B are notations for one sound. When sameSurfaceLetter is set, the
 * pair is only reported if the row spells BOTH with that letter — the guard
 * against Spanish pero/perro and against English flapping.
 */
const PAIRS = [
    ['slender velar stop',   /c(?!ʰ|̚)/u, /kʲ/u,  null],
    ['slender velar stop',   /ɟ/u,        /ɡʲ/u,  null],
    ['palatal nasal',        /ɲ/u,        /nʲ/u,  null],
    ['palatal lateral',      /ʎ/u,        /lʲ/u,  null],
    ['alveolo-palatal fric', /ɕ/u,        /sʲ/u,  null],
    ['alveolo-palatal fric', /ʑ/u,        /zʲ/u,  null],
    ['rhotic',               /r/u,        /ɾ/u,   'r'],
    ['rhotic',               /r/u,        /ɹ/u,   'r'],
    ['labialised velar',     /kʷ/u,       /kw/u,  null],
    ['labialised velar',     /ɡʷ/u,       /ɡw/u,  null],
];

function cellsOf(lang) {
    return Object.entries(lang.words || {})
        .filter(([, e]) => e && e[0] && e[0] !== '—' && e[1]);
}

function findings(code, lang) {
    const cells = cellsOf(lang);
    if (cells.length < 12) return [];
    const out = [];
    for (const [label, A, B, letter] of PAIRS) {
        const a = [], b = [];
        for (const [k, e] of cells) {
            if (letter && !new RegExp(letter, 'i').test(e[0])) continue;
            if (A.test(e[1])) a.push(`${k}=${e[0]}/${e[1]}`);
            else if (B.test(e[1])) b.push(`${k}=${e[0]}/${e[1]}`);
        }
        if (a.length && b.length) out.push({ label, a, b });
    }
    return out;
}

function main() {
    const args = process.argv.slice(2);
    const check = args.includes('--check');
    const one = args.find((x) => !x.startsWith('--'));

    const data = JSON.parse(fs.readFileSync(
        path.join(ROOT, 'data/wordmap_seo.json'), 'utf8'));

    const rows = [];
    for (const [code, lang] of Object.entries(data.langs)) {
        if (one && code !== one) continue;
        const f = findings(code, lang);
        if (f.length) rows.push([code, lang.name, f]);
    }

    if (check) {
        console.log(`violations: ${rows.length}`);
        return;
    }

    if (one) {
        if (!rows.length) { console.log(`${one}: no split notations`); return; }
        const [code, name, f] = rows[0];
        console.log(`${code}  ${name}\n`);
        for (const x of f) {
            console.log(`  ${x.label}`);
            console.log(`    ${String(x.a.length).padStart(3)}  ${x.a.slice(0, 8).join('  ')}`);
            console.log(`    ${String(x.b.length).padStart(3)}  ${x.b.slice(0, 8).join('  ')}\n`);
        }
        return;
    }

    /* Worst first, by how lopsided the smaller side is: a lone exception in a
       row of thirty is a likelier defect than an even split, which is
       likelier to be a real contrast. */
    rows.sort((p, q) => {
        const m = (r) => Math.min(...r[2].map((x) => Math.min(x.a.length, x.b.length)));
        return m(p) - m(q);
    });
    console.log(`${rows.length} rows write one sound two ways\n`);
    for (const [code, name, f] of rows.slice(0, 40)) {
        const worst = f.reduce((p, x) =>
            Math.min(x.a.length, x.b.length) < Math.min(p.a.length, p.b.length) ? x : p);
        console.log(`  ${code.padEnd(10)}${(name || '').slice(0, 24).padEnd(25)}`
            + `${worst.label.padEnd(21)}${worst.a.length} vs ${worst.b.length}`);
    }
}

main();
