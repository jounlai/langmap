#!/usr/bin/env node
/**
 * apply_corrections.js — change the IPA of cells that already exist.
 *
 * Sibling of apply_cells.js, and deliberately stricter, because this one
 * OVERWRITES. Input is one cell per line, tab-separated:
 *
 *     code <TAB> concept <TAB> surface <TAB> old_ipa <TAB> new_ipa
 *
 * The old IPA is not decoration. A correction pass runs against a snapshot of
 * the data, and by the time it is applied another pass may have touched the
 * same cell — this project has had a review agent wipe uncommitted work once
 * already. If the stored IPA is not exactly old_ipa, the line is REFUSED and
 * reported, never silently applied and never "helpfully" matched loosely. The
 * surface is checked the same way, and is never modified: this tool changes
 * the second element of the pair and nothing else.
 *
 * Blank lines and `#` comments are ignored, so a reviewer's rationale can stay
 * in the file — and it should, because those comments are the commit message.
 *
 *   node tools/apply_corrections.js fixes.tsv
 *   node tools/apply_corrections.js fixes.tsv --dry
 *
 * ALWAYS rebuild and run tools/check_all.js afterwards. Changing an IPA can
 * break the tone-policy guard, the intra-row duplicate guard and the Sinitic
 * tone guards, none of which this tool knows about.
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
        console.error('usage: node tools/apply_corrections.js <file.tsv> [--dry]');
        process.exit(2);
    }

    const rows = [];
    let bad = 0;
    for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
        const line = raw.trimEnd();
        if (!line.trim() || line.trim().startsWith('#')) continue;
        const p = line.split('\t').map((x) => x.trim());
        if (p.length !== 5 || !p.every(Boolean)) {
            console.log(`  MALFORMED  ${raw.slice(0, 90)}`);
            bad++;
            continue;
        }
        const [code, concept, surface, oldIpa, newIpa] = p;
        if (/g/.test(newIpa)) {
            console.log(`  ASCII g    ${code} ${concept} ${newIpa} — use ɡ (U+0261)`);
            bad++;
            continue;
        }
        if (oldIpa === newIpa) {
            console.log(`  NO CHANGE  ${code} ${concept}`);
            continue;
        }
        rows.push({ code, concept, surface, oldIpa, newIpa });
    }

    /* Group by concept, because that is one file each. */
    const byConcept = new Map();
    for (const r of rows) {
        if (!byConcept.has(r.concept)) byConcept.set(r.concept, []);
        byConcept.get(r.concept).push(r);
    }

    let done = 0, refused = 0;
    for (const [concept, items] of byConcept) {
        const p = path.join(ROOT, 'words', `${concept}.js`);
        if (!fs.existsSync(p)) {
            console.log(`  NO SUCH CONCEPT  ${concept}`);
            refused += items.length;
            continue;
        }
        let src = fs.readFileSync(p, 'utf8');
        for (const r of items) {
            /* Match the whole entry, so the surface is verified too and a row
               whose entry is shaped differently is refused rather than half
               rewritten. The indent is not fixed: some files nest entries.
               The KEY has three shapes in this tree — 60,157 bare, 8,522 bare
               at a deeper indent, 923 double-quoted — and an applier that
               knows only the bare one skips the quoted entries. Earlier tools
               skipped them SILENTLY, which is how a batch reports success and
               changes nothing; this one refuses loudly, and now it also
               matches all three. */
            const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const re = new RegExp(
                `(\\n\\s*["']?${esc(r.code)}["']?: \\["${esc(r.surface)}", ")${esc(r.oldIpa)}("\\])`);
            if (!re.test(src)) {
                console.log(`  REFUSED  ${r.code} ${concept}: the file does not hold`
                    + ` ["${r.surface}", "${r.oldIpa}"]`);
                refused++;
                continue;
            }
            src = src.replace(re, `$1${r.newIpa}$2`);
            done++;
            if (!dry) continue;
        }
        if (!dry) fs.writeFileSync(p, src);
    }

    console.log(`\n${dry ? 'would change' : 'changed'} ${done} cells`
        + `${refused ? `, ${refused} refused` : ''}`
        + `${bad ? `, ${bad} malformed` : ''}`);
    if (!dry && done) {
        console.log('\nnow: rebuild, then node tools/check_all.js — changing an IPA');
        console.log('can break the tone-policy and intra-row duplicate guards.');
    }
}

main();
