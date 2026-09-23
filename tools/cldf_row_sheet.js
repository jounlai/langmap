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

const LB = process.env.CLDF_DIR
    || path.join(process.env.HOME || '', 'langmap-work', 'lb');
const ROOT = path.join(__dirname, '..');

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

    // code -> concept -> Map(form -> Set(dataset))
    const sheet = new Map();
    for (const file of fs.readdirSync(LB).filter((f) => f.endsWith('_parameters.csv'))) {
        const ds = file.replace('_parameters.csv', '');
        let params, langs, forms;
        try {
            params = parseCsv(path.join(LB, file));
            langs = parseCsv(path.join(LB, `${ds}_languages.csv`));
            forms = parseCsv(path.join(LB, `${ds}_forms.csv`));
        } catch { continue; }

        const pidTo = new Map();
        for (const p of params) {
            const gloss = ((p.Concepticon_Gloss || p.Name || '').trim()).toLowerCase();
            if (concepts.has(gloss)) pidTo.set(p.ID, gloss);
        }
        if (!pidTo.size) continue;

        const isoOf = new Map();
        for (const l of langs) {
            const iso = (l.ISO639P3code || l.Iso || '').trim();
            if (iso) isoOf.set(l.ID, iso);
        }
        for (const f of forms) {
            const concept = pidTo.get(f.Parameter_ID);
            if (!concept) continue;
            const iso = isoOf.get(f.Language_ID);
            if (!iso || !isoTo.has(iso)) continue;
            const form = (f.Form || f.Value || '').trim();
            if (!form) continue;
            for (const code of isoTo.get(iso)) {
                if (!needs.get(code).has(concept)) continue;   // already filled
                if (!sheet.has(code)) sheet.set(code, new Map());
                const byC = sheet.get(code);
                if (!byC.has(concept)) byC.set(concept, new Map());
                const byF = byC.get(concept);
                if (!byF.has(form)) byF.set(form, new Set());
                byF.get(form).add(ds);
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
        out.push('', `CANDIDATES (${byC.size} concepts)`);
        for (const [concept, forms] of [...byC].sort()) {
            const list = [...forms].map(([f, ds]) =>
                `${f}${ds.size >= 2 ? ' **' : ''} [${[...ds].join(',')}]`).join('   ');
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
    const lang = data.langs[one];
    if (!lang) { console.error(`no row ${one}`); process.exit(1); }
    const byC = sheet.get(one);
    console.log(`${one}  ${lang.name}`);
    console.log(`family  ${(lang.meta && lang.meta.family) || ''}`);

    // What the row already writes, so the conventions are visible once.
    const held = Object.entries(lang.words || {})
        .filter(([, e]) => e && e[0] && e[0] !== '—' && e[1])
        .slice(0, 18)
        .map(([k, e]) => `${k}=${e[0]}/${e[1]}`);
    console.log(`\nTHE ROW ALREADY WRITES\n  ${held.join('\n  ')}`);

    if (!byC || !byC.size) { console.log('\nno candidates'); return; }
    console.log(`\nCANDIDATES (${byC.size} concepts)`);
    for (const [concept, forms] of [...byC].sort()) {
        const list = [...forms].map(([f, ds]) =>
            `${f}${ds.size >= 2 ? ' **' : ''} [${[...ds].join(',')}]`).join('   ');
        console.log(`  ${concept.padEnd(11)}${list}`);
    }
}

main();
