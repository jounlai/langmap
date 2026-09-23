#!/usr/bin/env node
/**
 * cldf_cache.js — find the CLDF datasets in the local cache, whatever they
 * happen to be named.
 *
 * WHY THIS EXISTS. The cache at ~/langmap-work/lb has been filled over months
 * by different passes, and each pass invented its own filename layout:
 *
 *     <ds>_parameters.csv  <ds>_languages.csv  <ds>_forms.csv     51 datasets
 *     <ds>_p.csv           <ds>_l.csv          <ds>_f.csv         14 datasets
 *     p_<ds>.csv           l_<ds>.csv          f_<ds>.csv         58 datasets
 *
 * cldf_candidates.js, cldf_row_sheet.js and cldf_convert.js all scanned for
 * `*_parameters.csv` and nothing else, so 38 of the 89 datasets in the cache
 * were INVISIBLE — not reported missing, not reported at all. Among them:
 * acd, the Austronesian Comparative Dictionary; transnewguineaorg;
 * polyglottaafricana; huntergatherer; diacl; csd; mcd; suntb. The tools said
 * "328 rows reachable" and were believed, because a silent skip looks exactly
 * like an absent dataset.
 *
 * That is the same shape as the export-artefact and dataset-label traps
 * recorded in docs/dev-handoff.md: the tool was answering a narrower question
 * than the one being asked, and nothing in its output said so. So this module
 * also RETURNS what it could not read, and callers print it.
 *
 * Nothing here parses or interprets; it only resolves names. The CSV reader
 * lives with it because all three callers had their own copy of the same
 * RFC4180 loop.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const LB = process.env.CLDF_DIR
    || path.join(process.env.HOME || '', 'langmap-work', 'lb');

/** The three layouts, as (suffix|prefix) triples for parameters/languages/forms. */
const LAYOUTS = [
    (d) => [`${d}_parameters.csv`, `${d}_languages.csv`, `${d}_forms.csv`],
    (d) => [`${d}_p.csv`, `${d}_l.csv`, `${d}_f.csv`],
    (d) => [`p_${d}.csv`, `l_${d}.csv`, `f_${d}.csv`],
];

/** Every dataset name the cache holds, under any layout. */
function names(dir = LB) {
    if (!fs.existsSync(dir)) return [];
    const out = new Set();
    for (const f of fs.readdirSync(dir)) {
        let m;
        if ((m = f.match(/^(.+)_parameters\.csv$/))) out.add(m[1]);
        else if ((m = f.match(/^(.+)_p\.csv$/))) out.add(m[1]);
        else if ((m = f.match(/^p_(.+)\.csv$/))) out.add(m[1]);
    }
    return [...out].sort();
}

/**
 * Resolve one dataset to its three absolute paths.
 *
 * A dataset counts only when ALL THREE files are present in the SAME layout.
 * Mixing them across layouts would be a guess about which languages.csv goes
 * with which forms.csv, and two passes months apart may have fetched
 * different releases.
 */
function resolve(ds, dir = LB) {
    for (const layout of LAYOUTS) {
        const [p, l, f] = layout(ds).map((n) => path.join(dir, n));
        if (fs.existsSync(p) && fs.existsSync(l) && fs.existsSync(f)) {
            return { ds, parameters: p, languages: l, forms: f };
        }
    }
    return null;
}

/** Every readable dataset, plus the names that could not be resolved. */
function datasets(dir = LB) {
    const ok = [], incomplete = [];
    for (const ds of names(dir)) {
        const r = resolve(ds, dir);
        if (r) ok.push(r); else incomplete.push(ds);
    }
    return { dir, datasets: ok, incomplete };
}

/** RFC4180-ish. The datasets quote commas inside forms and double their
 *  quotes, and a naive split silently truncates those rows. */
function parseCsv(file) {
    const text = fs.readFileSync(file, 'utf8');
    const rows = [];
    let cur = [], val = '', inQuote = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (inQuote) {
            if (c === '"') {
                if (text[i + 1] === '"') { val += '"'; i++; } else { inQuote = false; }
            } else { val += c; }
        } else if (c === '"') { inQuote = true; }
        else if (c === ',') { cur.push(val); val = ''; }
        else if (c === '\n') { cur.push(val); rows.push(cur); cur = []; val = ''; }
        else if (c !== '\r') { val += c; }
    }
    if (val !== '' || cur.length) { cur.push(val); rows.push(cur); }
    const head = rows.shift() || [];
    return rows.filter((r) => r.length > 1)
        .map((r) => Object.fromEntries(head.map((k, j) => [k, r[j]])));
}

module.exports = { LB, names, resolve, datasets, parseCsv };

if (require.main === module) {
    const { dir, datasets: ok, incomplete } = datasets();
    console.log(`${dir}\n${ok.length} readable datasets`);
    console.log(`  ${ok.map((d) => d.ds).join(' ')}`);
    if (incomplete.length) {
        console.log(`\n${incomplete.length} named in the cache but missing a file, so unreadable:`);
        console.log(`  ${incomplete.join(' ')}`);
    }
}
