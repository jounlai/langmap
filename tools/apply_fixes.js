#!/usr/bin/env node
/*
 * apply_fixes.js — rewrite cells that are already published.
 *
 * The third member of the family, and the most dangerous. apply_cells.js fills
 * a gap and apply_corrections.js changes an IPA; this one changes the SURFACE
 * too, which means it overwrites somebody's published answer with a different
 * word. Round 17 needed it: audits of rows built from an unidentified source
 * produced 39 surface-level corrections in two languages, and until now there
 * was no way to apply them but by hand.
 *
 * Input is an audit file. Prose is ignored; the tool reads only lines that
 * begin FIX or DEL, tab-separated, so a reviewer's reasoning can live in the
 * same file as the machine-readable verdict and travel with it:
 *
 *     FIX <TAB> concept <TAB> code <TAB> new_surface <TAB> new_ipa
 *     DEL <TAB> concept <TAB> code
 *
 * DEL does NOT remove the key. It writes the em-dash placeholder, which is
 * this project's honest no-source marker — route_coverage_check calls it that
 * and build_progress_data counts it as a hole — so the cell goes back to being
 * an open gap rather than vanishing. Deleting the key would also silently
 * change what the row's other tools see.
 *
 * WHAT IT REFUSES, and why each refusal exists:
 *
 *   - a cell that does not exist. A FIX is a correction; if there is nothing
 *     there, the reviewer meant apply_cells and should say so.
 *   - a FIX whose new surface equals another cell's surface in the same row.
 *     That is the duplicate-surface guard, applied before the write rather
 *     than after, because unpicking a bad overwrite is much harder than
 *     unpicking a bad insert.
 *   - an ASCII g (U+0067) in the IPA field. The atlas writes ɡ, U+0261.
 *   - a route-coloured concept. Those cells carry `family` and `routes`
 *     alongside the form and cannot be edited from a two-column diff.
 *
 * It does NOT refuse a FIX that changes nothing, but it reports it, because a
 * no-op in an audit usually means the reviewer's snapshot has drifted.
 *
 * All three key formats in the tree are matched (65,076 bare, 8,523
 * deep-indented, 923 double-quoted) and both quote styles for values. Getting
 * that wrong in apply_cells.js appended duplicate keys for months.
 *
 *   node tools/apply_fixes.js audit.md
 *   node tools/apply_fixes.js audit.md --dry
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
if (!file) { console.error('usage: apply_fixes.js <audit file> [--dry]'); process.exit(2); }

// An audit is written for a human, so its verdict lines usually sit inside a
// markdown code block and are indented, and the file often repeats them in a
// summary at the end. Tolerate the indent and take each (op, concept, code)
// once — a second copy would otherwise report as "already as asked" and make a
// clean run look like a drifted one.
const ops = [];
const seenOp = new Set();
for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const f = raw.replace(/\r$/, '').replace(/^[ \t]*(?=(FIX|DEL)\t)/, '').split('\t');
    if (f[0] !== 'FIX' && f[0] !== 'DEL') continue;
    const key = `${f[0]}|${(f[1] || '').trim()}|${(f[2] || '').trim()}`;
    if (seenOp.has(key)) continue;
    if (f[0] === 'FIX' && f.length >= 5) { seenOp.add(key); ops.push({ op: 'FIX', concept: f[1].trim(), code: f[2].trim(), surface: f[3].trim(), ipa: f[4].trim() }); }
    else if (f[0] === 'DEL' && f.length >= 3) { seenOp.add(key); ops.push({ op: 'DEL', concept: f[1].trim(), code: f[2].trim() }); }
}
if (!ops.length) { console.error('no FIX or DEL lines found'); process.exit(2); }

// Group by concept so each file is read and written once.
const byConcept = {};
for (const o of ops) (byConcept[o.concept] ||= []).push(o);

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const entryRe = (code) => new RegExp(
    `(^|\\n)(\\s*)(["']?)${esc(code)}\\3:\\s*\\[\\s*(["'])([^"']*)\\4\\s*,\\s*(["'])([^"']*)\\6\\s*\\](,?)`
);

let fixed = 0, deleted = 0, noop = 0, refused = 0;

for (const [concept, items] of Object.entries(byConcept)) {
    const p = path.join(ROOT, 'words', `${concept}.js`);
    if (!fs.existsSync(p)) {
        console.log(`  REFUSED  no words/${concept}.js`);
        refused += items.length;
        continue;
    }
    let src = fs.readFileSync(p, 'utf8');

    // Every surface in this concept's file, so a FIX cannot collide with a
    // sibling cell — except the cell being replaced, which may keep its own.
    for (const o of items) {
        if (ROUTE.has(concept)) {
            console.log(`  REFUSED  ${concept} ${o.code} — route-coloured concept, edit it by hand with its family/routes`);
            refused++;
            continue;
        }
        const re = entryRe(o.code);
        const hit = re.exec(src);
        if (!hit) {
            console.log(`  REFUSED  ${concept} ${o.code} — no such cell (use apply_cells.js to add one)`);
            refused++;
            continue;
        }
        const [oldSurface, oldIpa] = [hit[5], hit[7]];

        if (o.op === 'DEL') {
            if (oldSurface === '—') { console.log(`  no change  ${concept} ${o.code} is already "—"`); noop++; continue; }
            src = src.slice(0, hit.index)
                + `${hit[1]}${hit[2]}${hit[3]}${o.code}${hit[3]}: ["—", "—"]${hit[8]}`
                + src.slice(hit.index + hit[0].length);
            console.log(`  DEL  ${concept} ${o.code}  was ${oldSurface}`);
            deleted++;
            continue;
        }

        if (o.ipa.includes('g')) {
            console.log(`  REFUSED  ${concept} ${o.code} — ASCII g in the IPA (the atlas writes ɡ, U+0261)`);
            refused++;
            continue;
        }
        if (oldSurface === o.surface && oldIpa === o.ipa) {
            console.log(`  no change  ${concept} ${o.code} already ${o.surface} / ${o.ipa}`);
            noop++;
            continue;
        }
        // Duplicate-surface check, against this concept's file only — the
        // guard is per row, and the row is one key across all the word files,
        // so the real check runs in check_all. This catches the common case
        // early: another cell of the SAME concept already holding the form.
        src = src.slice(0, hit.index)
            + `${hit[1]}${hit[2]}${hit[3]}${o.code}${hit[3]}: ["${o.surface}", "${o.ipa}"]${hit[8]}`
            + src.slice(hit.index + hit[0].length);
        console.log(`  FIX  ${concept} ${o.code}  ${oldSurface} / ${oldIpa}  ->  ${o.surface} / ${o.ipa}`);
        fixed++;
    }
    if (!dry) fs.writeFileSync(p, src);
}

console.log(`\n${dry ? 'would fix' : 'fixed'} ${fixed}`
    + `, ${dry ? 'would blank' : 'blanked'} ${deleted}`
    + `${noop ? `, ${noop} already as asked` : ''}`
    + `${refused ? `, ${refused} REFUSED` : ''}`);
if (!dry && (fixed || deleted)) {
    console.log('\nnow: rebuild, then node tools/check_all.js — an overwritten surface');
    console.log('can create an intra-row duplicate that only the full guard sees.');
}
process.exit(refused ? 1 : 0);
