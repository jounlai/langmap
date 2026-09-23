#!/usr/bin/env node
/**
 * cldf_row_sheet.js — everything the CLDF cache can offer ONE row, across
 * every FILLING_IN concept at once, printed next to what that row already
 * writes.
 *
 * WHY, and why it is not cldf_candidates.js. That tool is concept-first:
 * pick `mouth`, get 270 rows. It works, but it charges the expensive step
 * once per cell. The expensive step is not finding a candidate — it is
 * working out how a row spells things: that Tuvaluan writes ŋ as g, that
 * Gorontalo marks penult stress, that Coastal Kadazan stresses the second
 * syllable and Kadazan-Dusun marks nothing, that a row wants ɡ and not g.
 * Measuring that takes minutes and then applies to EVERY concept in the row.
 *
 * So this tool is row-first. Measure Oroqen once, fill Oroqen's mouth, ear,
 * nose, stone, bird, egg and salt in the same sitting. 38 FILLING_IN
 * concepts, 20,425 empty (row, concept) pairs — the arithmetic is the whole
 * argument.
 *
 *   node tools/cldf_row_sheet.js --top 40     rows ranked by how many
 *                                             concepts are reachable at once
 *   node tools/cldf_row_sheet.js orh          the sheet for one row
 *   node tools/cldf_row_sheet.js --sheets DIR --top 60
 *                                             the top 60 sheets, one file per
 *                                             row, from a SINGLE scan
 *
 * The last form exists because the scan is the whole cost: reading 48 datasets
 * takes about six seconds and is identical no matter which row is being asked
 * about, so sixty rows one at a time is six minutes of re-reading the same
 * CSVs. Written out as files they can also be handed to parallel reviewers,
 * which is the only way the 2,039 reachable pairs get looked at this decade.
 *
 * EVERY SHEET WARNS WHERE THE SOURCE'S OWN GLOSS IS NOT THE CONCEPT. CLDF
 * datasets carry two names per parameter: the Concepticon gloss, which is
 * normalised and is what this tool matches on, and the dataset's own Name,
 * which is what the fieldworker actually elicited. They are frequently not
 * the same question, and the gap is invisible once the gloss has done its
 * job. amazonianvoices parameter 170 is named "fabric" and is mapped to
 * SILK — so every Amazonian row in this atlas was being offered a CLOTH word
 * for its silk cell, and two of them nearly went in. It is not an isolated
 * case: barlowlote maps "mountain; temple (of the head)" to MOUNTAIN,
 * ideobank maps "very black" and "A blackness that stands out from its
 * surroundings" to BLACK, mcelhanonhuon maps "(its) head" to HEAD — a
 * possessed form — and robinsonap maps "new (house)" to NEW. Several
 * datasets map "pounded rice" or "husked rice" to RICE, which is the grain
 * and not the plant, and several map "(be) black" and "(be) new", which are
 * stative verbs that may carry a verbal prefix.
 *
 * The sheet cannot decide any of that. It can refuse to hide it, so it prints
 * the source's own wording whenever it differs from the concept.
 *
 * `**` MEANS TWO INDEPENDENT SOURCES AGREE, AND INDEPENDENCE IS MEASURED,
 * NOT ASSUMED. Two dataset names are not two sources. Measured by comparing
 * every (ISO, concept) pair the two hold in common:
 *
 *     sabor / wold              7,028 shared, 7,028 byte-identical   100.0%
 *     diacl / iecor             5,323 shared, 2,178 byte-identical    40.9%
 *     huntergatherer / ids      6,491 shared, 2,006 byte-identical    30.9%
 *
 * sabor is WOLD repackaged — not overlapping, IDENTICAL, down to the curly
 * apostrophe in Q'eqchi' xchu’i_keh. It is therefore treated as the same
 * source and can never raise a `**` with wold. diacl/iecor and
 * huntergatherer/ids are partly derivative rather than wholly, so a `**`
 * between them is printed with a warning instead of being suppressed: a
 * reviewer found huntergatherer:258 prints "(IDS)" in its Value column
 * against every form because it reprints ids:174.
 *
 * Two lects inside ONE dataset were never corroboration either, and the tag
 * already carries the dataset name so that case is handled by construction.
 * For the extinct rows the whole idea inverts: Old Prussian's `**` pairs are
 * two normalisations agreeing while the lone iecor:108 carries the attested
 * Elbing spellings, so there `**` is a reason for suspicion. Agreement
 * between two reconstructions is not attestation.
 *
 * A FORM IS SHOWN WITH ITS RAW Value WHEN THE TWO DISAGREE. CLDF carries the
 * cleaned `Form` and the source's original `Value`, and some exports cut the
 * Form at an apostrophe. huntergatherer does it to 7,412 of its 64,607 forms
 * — 11.5%: Galibi Carib person is exported as `kari` where the Value reads
 * `kari'nja`, head as `upu` for `upu'po`, sleep as `o` for `o'ny`, one as `o`
 * for `o'win`. Five candidates in one row were amputated words that look
 * perfectly pronounceable. robinsonap does it to 3.2% and zhoubizic to 5.0%.
 * The Value is also where several datasets keep the practical orthography a
 * row actually writes, and where a variant the Form column dropped survives —
 * a Romagnol `mownt` turned out to be `mownt {mônt} ~ munt-ˈãɲ-a {muntâgna}`.
 * So the sheet prints it and lets the reviewer decide. See the export-artefact
 * note in docs/dev-handoff.md: an export artefact is not a language fact.
 *
 * EACH FORM IS LABELLED WITH ITS DOCULECT, not just its dataset, because a
 * row is matched to CLDF by ISO code and an ISO code is not a doculect. ABVD
 * files FOURTEEN Lampung wordlists under `ljp` and none of them is the atlas
 * row; its only `nut` list is Lungchow, a Guangxi lect, not Vietnamese Nùng;
 * `acn` has two sources sharing a glottocode of which exactly one is the row.
 * Pooling them under one ISO makes a form from the wrong lect look like
 * corroboration for a form from the right one — five blocks of a five-way
 * review died on this, and the reviewer had to re-open the raw CSVs by hand to
 * see it. The label is `dataset:Language_ID`, which is what you grep for.
 *
 * The sheet prints, per concept: the candidate(s), and the cell the row
 * already holds for a NEIGHBOURING concept so the conversion can be read off
 * settled material. Everything cldf_candidates.js says about there being no
 * --apply holds here too, and the triage rules live in words/mouth.js.
 *
 * WHERE TO PUT THE CELL once you have it: at the END of that word's `data`
 * block. The first run of this pattern inserted at the top, which put two
 * Bantu rows ahead of `en` in eleven files before the owner spotted it. The
 * files are not ordered by family — horse.js runs en, de, nl, sv … fa, ta,
 * ar, he, tr, sw — so there is no family slot to aim for, and new work goes
 * last. Two closers exist, `  },` and `  }`, and the last entry may carry no
 * comma; both need handling by anything that appends.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { datasets, parseCsv } = require('./cldf_cache');
const ROOT = path.join(__dirname, '..');

/** Datasets that are the same source under two names, so they can never
 *  corroborate each other. See the measurement in the docstring. */
const SAME_SOURCE = [['sabor', 'wold']];

/** Datasets that partly reprint each other: a `**` between them is printed
 *  with a warning rather than suppressed. */
const PARTLY_DERIVED = [['diacl', 'iecor'], ['huntergatherer', 'ids']];

/** Collapse a set of dataset names to one name per independent source. */
function independent(dss) {
    const out = new Set(dss);
    for (const group of SAME_SOURCE) {
        const hit = group.filter((g) => out.has(g));
        if (hit.length > 1) for (const g of hit.slice(1)) out.delete(g);
    }
    return out;
}

/** Is this `**` between two datasets known to reprint each other in part? */
function suspectPair(dss) {
    return PARTLY_DERIVED.some((g) => g.every((x) => dss.has(x)));
}

/** The WIP core words. Read from the validator so the two cannot drift. */
function fillingIn() {
    const src = fs.readFileSync(path.join(ROOT, 'validate_wordmap_data.js'), 'utf8');
    const m = src.match(/const FILLING_IN = new Set\(\[([\s\S]*?)\]\)/);
    return new Set([...m[1].matchAll(/'([a-z0-9_]+)'/g)].map((x) => x[1]));
}

function main() {
    const args = process.argv.slice(2);
    const one = args.find((a) => !a.startsWith('--'));
    const top = args.includes('--top') ? Number(args[args.indexOf('--top') + 1]) || 40 : 0;
    const sheetDir = args.includes('--sheets') ? args[args.indexOf('--sheets') + 1] : null;

    const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/wordmap_seo.json'), 'utf8'));
    const concepts = fillingIn();

    // iso -> [atlas codes], and the set of concepts each still needs
    const isoTo = new Map();
    const needs = new Map();
    for (const [code, lang] of Object.entries(data.langs)) {
        const iso = (lang.meta && lang.meta.iso6393) || '';
        const gap = new Set();
        for (const c of concepts) {
            const cell = (lang.words && lang.words[c] && lang.words[c][0]) || '';
            if (!cell || cell === '—') gap.add(c);
        }
        needs.set(code, gap);
        if (!iso) continue;
        if (!isoTo.has(iso)) isoTo.set(iso, []);
        isoTo.get(iso).push(code);
    }

    // code -> concept -> Map(form -> Set('dataset:Language_ID'))
    const sheet = new Map();
    const doculect = new Map();     // 'dataset:Language_ID' -> its Name
    const glossOdd = new Map();     // 'dataset\0concept' -> Set(the source's own wording)
    const rawValue = new Map();     // 'dataset\0form' -> the uncleaned Value
    const cache = datasets();
    for (const entry of cache.datasets) {
        const ds = entry.ds;
        let params, langs, forms;
        try {
            params = parseCsv(entry.parameters);
            langs = parseCsv(entry.languages);
            forms = parseCsv(entry.forms);
        } catch { continue; }

        const pidTo = new Map();
        for (const p of params) {
            const gloss = ((p.Concepticon_Gloss || p.Name || '').trim()).toLowerCase();
            if (!concepts.has(gloss)) continue;
            pidTo.set(p.ID, gloss);
            /* Record the source's OWN wording when it is not the concept.
               See the warning note in the docstring. */
            const own = (p.Name || '').trim();
            const norm = own.toLowerCase().replace(/^(the|a) /, '').replace(/[^a-z ]/g, '').trim();
            if (own && norm !== gloss) {
                const k = `${ds}\u0000${gloss}`;
                if (!glossOdd.has(k)) glossOdd.set(k, new Set());
                glossOdd.get(k).add(own);
            }
        }
        if (!pidTo.size) continue;

        const isoOf = new Map(), nameOf = new Map();
        for (const l of langs) {
            const iso = (l.ISO639P3code || l.Iso || '').trim();
            if (iso) isoOf.set(l.ID, iso);
            nameOf.set(l.ID, (l.Name || l.ID || '').trim());
        }
        for (const f of forms) {
            const concept = pidTo.get(f.Parameter_ID);
            if (!concept) continue;
            const iso = isoOf.get(f.Language_ID);
            if (!iso || !isoTo.has(iso)) continue;
            const form = (f.Form || f.Value || '').trim();
            if (!form) continue;
            /* Keep the source's own string when the export cleaned it into
               something shorter. See the Value note in the docstring. */
            const value = (f.Value || '').trim();
            if (value && value !== form && value.length > form.length) {
                rawValue.set(`${ds}\u0000${form}`, value);
            }
            /* dataset:Language_ID, not just the dataset. See the docstring:
               an ISO code pools doculects and hides the one that matters. */
            const tag = `${ds}:${f.Language_ID}`;
            doculect.set(tag, nameOf.get(f.Language_ID) || '');
            for (const code of isoTo.get(iso)) {
                if (!needs.get(code).has(concept)) continue;   // already filled
                if (!sheet.has(code)) sheet.set(code, new Map());
                const byC = sheet.get(code);
                if (!byC.has(concept)) byC.set(concept, new Map());
                const byF = byC.get(concept);
                if (!byF.has(form)) byF.set(form, new Set());
                byF.get(form).add(tag);
            }
        }
    }

    /** One row's sheet as text. Shared by the single-row path and --sheets so
     *  a reviewer reading a file and a reviewer reading a terminal are looking
     *  at exactly the same thing. */
    const render = (code) => {
        const lang = data.langs[code];
        const byC = sheet.get(code);
        const out = [`${code}  ${lang.name}`,
            `family  ${(lang.meta && lang.meta.family) || ''}`];
        const held = Object.entries(lang.words || {})
            .filter(([, e]) => e && e[0] && e[0] !== '\u2014' && e[1])
            .slice(0, 18)
            .map(([k, e]) => `${k}=${e[0]}/${e[1]}`);
        out.push('', 'THE ROW ALREADY WRITES', `  ${held.join('\n  ')}`);
        if (!byC || !byC.size) { out.push('', 'no candidates'); return out.join('\n'); }

        /* Every doculect this sheet draws on, named. Compare its OTHER forms
           against cells the row already holds before trusting any of them. */
        const tags = new Set();
        for (const forms of byC.values()) for (const ds of forms.values()) for (const t of ds) tags.add(t);
        out.push('', `DOCULECTS (${tags.size}) — an ISO code is not a doculect; check each one`);
        for (const t of [...tags].sort()) out.push(`  ${t.padEnd(34)}${doculect.get(t) || ''}`);

        /* Where the source asked a different question from the concept. */
        const warn = [];
        for (const [concept, forms] of [...byC].sort()) {
            const dss = new Set();
            for (const tags of forms.values()) for (const t of tags) dss.add(t.split(':')[0]);
            for (const ds of dss) {
                const own = glossOdd.get(`${ds}\u0000${concept}`);
                if (own) warn.push(`  ${concept.padEnd(11)}${ds} calls it "${[...own].join('" / "')}"`);
            }
        }
        if (warn.length) {
            out.push('', 'THE SOURCE\'S OWN GLOSS IS NOT THE CONCEPT — read these before trusting the form');
            out.push(...warn);
        }

        out.push('', `CANDIDATES (${byC.size} concepts)`);
        for (const [concept, forms] of [...byC].sort()) {
            const list = [...forms].map(([f, ds]) => {
                /* ** means two INDEPENDENT datasets agree. Two lects inside one
                   dataset are one source and must not read as corroboration. */
                const indep = independent([...ds].map((t) => t.split(':')[0]));
                /* If any source's raw Value is longer than the cleaned Form,
                   show it: the Form may be an amputated word. */
                const raws = new Set();
                for (const t of indep) {
                    const v = rawValue.get(`${t}\u0000${f}`);
                    if (v) raws.add(v);
                }
                const shown = raws.size ? `${f} ⟨${[...raws].join(' / ')}⟩` : f;
                const mark = indep.size >= 2 ? (suspectPair(indep) ? ' **?' : ' **') : '';
                return `${shown}${mark} [${[...ds].join(',')}]`;
            }).join('   ');
            out.push(`  ${concept.padEnd(11)}${list}`);
        }
        return out.join('\n');
    };

    if (sheetDir) {
        fs.mkdirSync(sheetDir, { recursive: true });
        const ranked = [...sheet.entries()]
            .map(([code, byC]) => [byC.size, code])
            .sort((a, b) => b[0] - a[0])
            .slice(0, top || sheet.size);
        for (const [, code] of ranked) {
            fs.writeFileSync(path.join(sheetDir, `${code}.txt`), `${render(code)}\n`);
        }
        console.log(`${ranked.length} sheets written to ${sheetDir}`);
        return;
    }

    if (top) {
        const ranked = [...sheet.entries()]
            .map(([code, byC]) => [byC.size, code])
            .sort((a, b) => b[0] - a[0]);
        const total = ranked.reduce((s, r) => s + r[0], 0);
        console.log(`${cache.datasets.length} datasets read`
            + `${cache.incomplete.length ? `, ${cache.incomplete.length} in the cache unreadable `
                + `(${cache.incomplete.join(' ')})` : ''}`);
        console.log(`${sheet.size} rows reachable, ${total} (row, concept) pairs offered\n`);
        for (const [n, code] of ranked.slice(0, top)) {
            const lang = data.langs[code];
            console.log(`  ${String(n).padStart(3)}  ${code.padEnd(10)}`
                + `${(lang.name || '').slice(0, 28).padEnd(29)}`
                + `${((lang.meta && lang.meta.family) || '').slice(0, 34)}`);
        }
        return;
    }

    if (!one) {
        console.error('usage: node tools/cldf_row_sheet.js <code> | --top N');
        process.exit(2);
    }
    if (!data.langs[one]) { console.error(`no row ${one}`); process.exit(1); }
    console.log(render(one));
}

main();
