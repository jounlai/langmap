#!/usr/bin/env node
/**
 * apply_cells.js — write a reviewed list of cells into words/*.js.
 *
 * Input is one cell per line, tab-separated, which is what the CLDF review
 * pipeline produces:
 *
 *     concept <TAB> code <TAB> surface <TAB> ipa
 *
 * Lines may carry a leading "ACCEPT<TAB>", which is stripped. Blank lines and
 * anything starting `#` are ignored, so a reviewer's notes can stay in the
 * file. A cell whose (concept, code) already exists is skipped and reported,
 * never overwritten: this tool only fills gaps.
 *
 *   node tools/apply_cells.js proposals.tsv
 *   node tools/apply_cells.js proposals.tsv --dry
 *
 * WHERE THE CELL GOES, and why this is not a one-liner. Each insert appends
 * to the END of that word's `data` block, which is where new work belongs —
 * the files are not ordered by family (horse.js runs en, de, nl, sv … fa,
 * ta, ar, he, tr, sw), and an earlier pass that anchored on `data: {` put two
 * Bantu rows ahead of `en` in eleven files. Two things make appending
 * fiddly, and both have broken a run before:
 *
 *   - the block has TWO closers. Most files end `  },`; horse, person,
 *     mountain and mouth end `  }`. Matching only the first crashed halfway
 *     and left the tree half-written.
 *   - the last entry may carry no trailing comma, so the old last line needs
 *     one added and the new last line needs its own removed.
 *
 * ALWAYS run the build and `node tools/check_all.js` afterwards. The guards
 * catch three classes this tool cannot: a surface that duplicates another
 * concept in the same row, a route-coloured word (bear, wine, we, foot, tea,
 * orange, sugar, coffee, blue, n99) whose cells need a `family` value, and a
 * Chao-tone row handed a toneless form.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function main() {
    const args = process.argv.slice(2);
    const file = args.find((a) => !a.startsWith('--'));
    const dry = args.includes('--dry');
    if (!file) {
        console.error('usage: node tools/apply_cells.js <file.tsv> [--dry]');
        process.exit(2);
    }

    /* The code must name a row that exists. A typo'd or invented code would
       otherwise sit in the data file forever, invisible: nothing reads a
       key that no language has, so no guard would ever mention it. */
    const known = new Set(Object.keys(
        JSON.parse(fs.readFileSync(path.join(ROOT, 'data/wordmap_seo.json'), 'utf8')).langs));

    const wanted = new Map();          // concept -> [[code, surface, ipa], …]
    const seenPair = new Set();
    let bad = 0;
    for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
        const line = raw.replace(/^ACCEPT\t/, '').trimEnd();
        if (!line.trim() || line.trim().startsWith('#')) continue;
        const parts = line.split('\t').map((p) => p.trim());
        if (parts.length !== 4 || !parts.every(Boolean)) {
            console.log(`  MALFORMED  ${raw.slice(0, 80)}`);
            bad++;
            continue;
        }
        const [concept, code, surface, ipa] = parts;
        if (/[a-z]/.test(ipa) && /(?<![a-z])g(?![a-z])|g/.test(ipa) && ipa.includes('g')) {
            console.log(`  ASCII g    ${concept} ${code} ${ipa}  — use ɡ (U+0261)`);
            bad++;
            continue;
        }
        if (!known.has(code)) {
            console.log(`  NO SUCH ROW  ${concept} ${code}`);
            bad++;
            continue;
        }
        const key = `${concept}\u0000${code}`;
        if (seenPair.has(key)) { console.log(`  DUPLICATE in input  ${concept} ${code}`); continue; }
        seenPair.add(key);
        if (!wanted.has(concept)) wanted.set(concept, []);
        wanted.get(concept).push([code, surface, ipa]);
    }

    let added = 0, present = 0, missingFile = 0;
    for (const [concept, items] of wanted) {
        const p = path.join(ROOT, 'words', `${concept}.js`);
        if (!fs.existsSync(p)) {
            console.log(`  NO SUCH CONCEPT  ${concept}`);
            missingFile += items.length;
            continue;
        }
        const src = fs.readFileSync(p, 'utf8');
        const open = src.indexOf('\n  data: {\n');
        if (open < 0) { console.log(`  NO data BLOCK  ${concept}`); continue; }
        const start = open + '\n  data: {\n'.length;
        const m = /\n  \},?\n\};/.exec(src.slice(start));
        if (!m) { console.log(`  NO BLOCK END  ${concept}`); continue; }
        const end = start + m.index + 1;
        const block = src.slice(start, end);

        const fresh = [];
        for (const [code, surface, ipa] of items) {
            if (new RegExp(`\\n    ${code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}: \\[`).test(`\n${block}`)) {
                console.log(`  already there  ${concept} ${code}`);
                present++;
                continue;
            }
            fresh.push(`    ${code}: ["${surface}", "${ipa}"],`);
        }
        if (!fresh.length) continue;
        added += fresh.length;
        if (dry) { console.log(`  would add ${fresh.length} to ${concept}`); continue; }

        const lines = block.split('\n');
        while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
        if (lines.length && !lines[lines.length - 1].trimEnd().endsWith(',')) {
            lines[lines.length - 1] = `${lines[lines.length - 1].trimEnd()},`;
        }
        fresh[fresh.length - 1] = fresh[fresh.length - 1].replace(/,$/, '');
        lines.push(...fresh, '');
        fs.writeFileSync(p, src.slice(0, start) + lines.join('\n') + src.slice(end));
    }

    console.log(`\n${dry ? 'would add' : 'added'} ${added} cells`
        + `${present ? `, ${present} already present` : ''}`
        + `${bad ? `, ${bad} rejected` : ''}`
        + `${missingFile ? `, ${missingFile} for unknown concepts` : ''}`);
    if (!dry && added) {
        console.log('\nnow: rebuild, then node tools/check_all.js — the guards catch');
        console.log('intra-row duplicates, route-coloured words, and toneless Chao cells.');
    }
}

main();
