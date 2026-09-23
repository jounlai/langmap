#!/usr/bin/env node
/**
 * cldf_candidates.js — for one concept, every atlas row the cached CLDF
 * datasets can reach, printed next to that row's own cells.
 *
 * WHY IT EXISTS. The FILLING_IN core words are the real gap in the atlas —
 * sea 286/1188, mountain 308, book 336, green 338, mouth 345 — and searching
 * for them one language at a time is hopeless: a round of web search buys one
 * cell. The 236 MB of CLDF datasets in ~/langmap-work/lb reach 183 of the 880
 * rows missing `mountain` in a single pass.
 *
 * WHAT IT DOES NOT DO, and why there is no --apply. The datasets carry ONE
 * phonetic transcription per form; this atlas carries a practical surface AND
 * an IPA, in the row's own conventions. Converting one into the other needs
 * information the dataset does not hold. Two attempts to find a shortcut both
 * failed on measurement, which is why they are written down here:
 *
 *   - "trust a form when two independent datasets agree" — of 183 reachable
 *     rows only FOUR have two datasets giving the same string, and two of
 *     those pairs (chaconcolumbian / hubercolumbian) are probably not
 *     independent sources at all.
 *   - "trust rows that keep no orthography/IPA split, where the dataset form
 *     can serve as both" — 21 rows out of 1,188. The atlas splits almost
 *     everywhere.
 *
 * So the candidate is a LEAD and the conversion is human work. What this tool
 * removes is the expensive part of that work: finding the candidate, and
 * putting the row's own conventions in front of you at the same moment, so
 * the form can be read against cells whose shape is already settled. Compare
 * before converting — see dataset-labels-vs-forms: a dataset's language label
 * can be wrong where its forms are right, and the way to tell is to check its
 * other words against cells the atlas already holds.
 *
 *   node tools/cldf_candidates.js mountain
 *   node tools/cldf_candidates.js sea --limit 40
 *   node tools/cldf_candidates.js mouth --code kru
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { LB, datasets, parseCsv } = require('./cldf_cache');
const ROOT = path.join(__dirname, '..');

/** Cells shown from the row itself, so the candidate can be read against
 *  forms whose transcription is already decided. Short, concrete, and
 *  unlikely to be missing: if a row has anything it has these. */
const WITNESS = ['water', 'fire', 'stone', 'tree', 'sun', 'one', 'two'];

function main() {
    const args = process.argv.slice(2);
    const concept = args.find((a) => !a.startsWith('--'));
    if (!concept) {
        console.error('usage: node tools/cldf_candidates.js <concept> [--limit N] [--code xxx]');
        process.exit(2);
    }
    const limit = Number((args.find((a) => a.startsWith('--limit')) || '').split('=')[1]
        || args[args.indexOf('--limit') + 1] || 0) || Infinity;
    const only = args.includes('--code') ? args[args.indexOf('--code') + 1] : null;

    if (!fs.existsSync(LB)) {
        console.error(`No CLDF cache at ${LB}. Set CLDF_DIR.`);
        process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/wordmap_seo.json'), 'utf8'));

    // Rows that LACK the concept, indexed by ISO 639-3. Glottocode would be
    // the better key — it is what CLDF is built on — but the SEO export
    // carries iso6393 for 660 of the 880 rows and glottocode for 81.
    const wanted = new Map();
    let missing = 0;
    for (const [code, lang] of Object.entries(data.langs)) {
        const cell = (lang.words && lang.words[concept] && lang.words[concept][0]) || '';
        if (cell && cell !== '—') continue;
        missing++;
        const iso = (lang.meta && lang.meta.iso6393) || '';
        if (!iso) continue;
        if (!wanted.has(iso)) wanted.set(iso, []);
        wanted.get(iso).push(code);
    }

    const found = new Map();   // atlas code -> Map(form -> Set(dataset))
    let scanned = 0;
    const cache = datasets();
    for (const entry of cache.datasets) {
        const ds = entry.ds;
        let params, langs, forms;
        try {
            params = parseCsv(entry.parameters);
            langs = parseCsv(entry.languages);
            forms = parseCsv(entry.forms);
        } catch { continue; }

        // Match on Concepticon gloss first — it is the normalised one — and
        // fall back to the dataset's own parameter name.
        const want = concept.toUpperCase();
        const pids = new Set(params
            .filter((p) => (p.Concepticon_Gloss || '').trim().toUpperCase() === want
                || (p.Name || '').trim().toUpperCase() === want)
            .map((p) => p.ID));
        if (!pids.size) continue;
        scanned++;

        const isoOf = new Map();
        for (const l of langs) {
            const iso = (l.ISO639P3code || l.Iso || '').trim();
            if (iso) isoOf.set(l.ID, iso);
        }
        for (const f of forms) {
            if (!pids.has(f.Parameter_ID)) continue;
            const iso = isoOf.get(f.Language_ID);
            if (!iso || !wanted.has(iso)) continue;
            const form = (f.Form || f.Value || '').trim();
            if (!form) continue;
            for (const code of wanted.get(iso)) {
                if (only && code !== only) continue;
                if (!found.has(code)) found.set(code, new Map());
                const m = found.get(code);
                if (!m.has(form)) m.set(form, new Set());
                m.get(form).add(ds);
            }
        }
    }

    console.log(`${concept}: ${missing} rows missing it, ${scanned} of `
        + `${cache.datasets.length} datasets carry the concept, ${found.size} rows reachable`
        + `${cache.incomplete.length ? `  (${cache.incomplete.length} cached datasets unreadable)` : ''}\n`);

    let n = 0;
    for (const [code, forms] of found) {
        if (n++ >= limit) break;
        const lang = data.langs[code];
        const name = (lang.name || code).slice(0, 26);
        console.log(`${code}  ${name}`);
        console.log(`    family   ${((lang.meta && lang.meta.family) || '').slice(0, 60)}`);
        for (const [form, dss] of forms) {
            const mark = dss.size >= 2 ? ' **' : '';
            console.log(`    CANDIDATE ${form}${mark}   [${[...dss].join(', ')}]`);
        }
        const witness = WITNESS
            .map((w) => {
                const e = lang.words && lang.words[w];
                return e && e[0] && e[0] !== '—' ? `${w}=${e[0]}/${e[1] || ''}` : null;
            })
            .filter(Boolean);
        console.log(`    row says ${witness.join('  ') || '(no witness cells)'}`);
        console.log();
    }
    if (found.size > limit) console.log(`… ${found.size - limit} more (raise --limit)`);
}

main();
