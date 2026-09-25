#!/usr/bin/env node
/*
 * apply_route_cells.js — fill a cell in a ROUTE-COLOURED concept.
 *
 * Ten concepts colour the map by a claim rather than by a word: bear, wine,
 * we, foot, tea, orange, sugar, coffee, blue and n99. Each carries a `family`
 * map beside its `data` map, and the value there is what the reader sees —
 * whether a language's 99 is 9×10+9 or 4×20+19, whether its "we" distinguishes
 * inclusive from exclusive, which trade route its word for tea came down.
 *
 * So a route-coloured cell is two writes in two different blocks of the file,
 * which is why apply_cells.js cannot do it and apply_fixes.js refuses outright.
 * Writing only the data half produces a cell the map cannot colour, and
 * route_coverage_check exists because that has happened: 76 tea rows and 77
 * n99 rows were once added with forms and no family, which does not error —
 * the language just stops being drawn.
 *
 * Input, tab-separated, one cell per line:
 *
 *     concept <TAB> code <TAB> surface <TAB> ipa <TAB> family
 *
 * `#` comments and blank lines are ignored, so the reviewer's reasoning lives
 * in the same file and becomes the commit message.
 *
 * WHAT IT REFUSES:
 *   - a concept that is not route-coloured (use apply_cells.js)
 *   - a family value the concept's own `routes` block does not define. This is
 *     the important one: a typo'd route is invisible in the data and shows up
 *     only as a language quietly losing its colour.
 *   - a cell that already holds a word, unless it is the '—' placeholder,
 *     which is this project's no-source marker and counts as a gap.
 *   - an ASCII g in the IPA (the atlas writes ɡ, U+0261).
 *
 * All three key formats in the tree are handled, and both quote styles.
 *
 *   node tools/apply_route_cells.js cells.tsv
 *   node tools/apply_route_cells.js cells.tsv --dry
 *
 * ALWAYS rebuild and run tools/check_all.js afterwards.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const ROUTE = new Set(['bear', 'wine', 'we', 'foot', 'tea', 'orange', 'sugar',
    'coffee', 'blue', 'n99']);

const file = process.argv[2];
const dry = process.argv.includes('--dry');
if (!file) { console.error('usage: apply_route_cells.js <file.tsv> [--dry]'); process.exit(2); }

// A typo'd or invented code would silently create a cell no language reads.
const KNOWN = new Set(Object.keys(
    JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'wordmap_seo.json'), 'utf8')).langs
));

const ops = [];
for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = raw.replace(/\r$/, '').trim();
    if (!line || line.startsWith('#')) continue;
    const f = line.split('\t').map((x) => x.trim());
    if (f.length < 5) { console.log(`  BAD LINE  ${line.slice(0, 60)}`); continue; }
    ops.push({ concept: f[0], code: f[1], surface: f[2], ipa: f[3], family: f[4] });
}
if (!ops.length) { console.error('no cells found'); process.exit(2); }

const byConcept = {};
for (const o of ops) (byConcept[o.concept] ||= []).push(o);

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// The value class must exclude only its own quote character — U+0027 is a
// letter in plenty of orthographies. (apply_fixes learned this the hard way.)
const dataRe = (code) => new RegExp(
    `(^|\\n)(\\s*)(["']?)${esc(code)}\\3:\\s*\\[\\s*(?:"([^"]*)"|'([^']*)')\\s*,\\s*(?:"([^"]*)"|'([^']*)')\\s*\\](,?)`
);
const famRe = (code) => new RegExp(
    `(^|\\n)(\\s*)(["']?)${esc(code)}\\3:\\s*(?:"[^"]*"|'[^']*')(,?)`
);

let added = 0, filled = 0, refused = 0;

for (const [concept, items] of Object.entries(byConcept)) {
    if (!ROUTE.has(concept)) {
        console.log(`  REFUSED  ${concept} is not route-coloured — use apply_cells.js`);
        refused += items.length;
        continue;
    }
    const p = path.join(ROOT, 'words', `${concept}.js`);
    if (!fs.existsSync(p)) { console.log(`  REFUSED  no words/${concept}.js`); refused += items.length; continue; }

    // Load the concept so its own routes block validates the family values.
    global.window = {}; global.WORDS = {};
    // eslint-disable-next-line no-eval
    eval(fs.readFileSync(p, 'utf8'));
    const legal = new Set(Object.keys((WORDS[concept] || {}).routes || {}));
    let src = fs.readFileSync(p, 'utf8');

    // Locate the two blocks. `family:` comes before `data:` in these files —
    // which is exactly why BOTH offsets must be recomputed after every write.
    // Writing the family half inserts a line ABOVE the data block, so a
    // dataStart captured once before the loop is one line too early on the
    // second cell and further out on every one after that. The first version
    // of this tool did that and wrote entries into the middle of the routes
    // block, producing a file that would not parse.
    if (src.indexOf('\n  family: {') < 0 || src.indexOf('\n  data: {') < 0) {
        console.log(`  REFUSED  ${concept}: could not find both a family and a data block`);
        refused += items.length;
        continue;
    }

    for (const o of items) {
        if (!KNOWN.has(o.code)) {
            console.log(`  REFUSED  ${concept} ${o.code} — no such language code`);
            refused++;
            continue;
        }
        if (!legal.has(o.family)) {
            console.log(`  REFUSED  ${concept} ${o.code} — route "${o.family}" is not one of: ${[...legal].join(' ')}`);
            refused++;
            continue;
        }
        if (o.ipa.includes('g')) {
            console.log(`  REFUSED  ${concept} ${o.code} — ASCII g in the IPA (the atlas writes ɡ)`);
            refused++;
            continue;
        }
        const dataStart = src.indexOf('\n  data: {');
        const hit = dataRe(o.code).exec(src.slice(dataStart));
        const old = hit && (hit[4] !== undefined ? hit[4] : hit[5]);
        if (hit && old !== '—' && old !== '-') {
            console.log(`  already there  ${concept} ${o.code} = ${old}`);
            refused++;
            continue;
        }

        // --- the data half ---
        if (hit) {
            const at = dataStart + hit.index;
            src = src.slice(0, at)
                + `${hit[1]}${hit[2]}${hit[3]}${o.code}${hit[3]}: ["${o.surface}", "${o.ipa}"]${hit[8]}`
                + src.slice(at + hit[0].length);
            filled++;
        } else {
            const ins = src.indexOf('\n', dataStart + 1) + 1;
            src = src.slice(0, ins) + `    ${o.code}: ["${o.surface}", "${o.ipa}"],\n` + src.slice(ins);
            added++;
        }

        // --- the family half, recomputed because the file just moved ---
        const fs2 = src.indexOf('\n  family: {');
        const fhit = famRe(o.code).exec(src.slice(fs2, src.indexOf('\n  },', fs2)));
        if (fhit) {
            const at = fs2 + fhit.index;
            src = src.slice(0, at)
                + `${fhit[1]}${fhit[2]}${fhit[3]}${o.code}${fhit[3]}: "${o.family}"${fhit[4]}`
                + src.slice(at + fhit[0].length);
        } else {
            const ins = src.indexOf('\n', fs2 + 1) + 1;
            src = src.slice(0, ins) + `    ${o.code}: "${o.family}",\n` + src.slice(ins);
        }
        console.log(`  ${concept} ${o.code}  ${o.surface}  [${o.family}]`);
    }
    if (!dry) fs.writeFileSync(p, src);
}

console.log(`\n${dry ? 'would add' : 'added'} ${added}`
    + `${filled ? `, ${dry ? 'would fill' : 'filled'} ${filled} "—" placeholders` : ''}`
    + `${refused ? `, ${refused} REFUSED` : ''}`);
if (!dry && (added || filled)) {
    console.log('\nnow: rebuild, then node tools/check_all.js — route_coverage_check');
    console.log('is the one that catches a cell whose colour never got written.');
}
process.exit(refused ? 1 : 0);
