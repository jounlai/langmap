#!/usr/bin/env node
/*
 * contributors_check.js — every person thanked in a changelog entry must also
 * appear in the Contributors list at the bottom of changelog.html.
 *
 * Why this exists: crediting a reporter inline in the entry you are writing is
 * the natural thing to do, and updating the roll-up list at the bottom of a
 * different file is the thing everyone forgets. It went unnoticed for three
 * contributors (@iru_han2, @avzaagzonunaada, @Soda_Limer) before a reader
 * asked. People who take the time to send corrections should not fall out of
 * the credits because of bookkeeping.
 *
 * Compares handles linked from x.com / github.com in the changelog bodies
 * against the handles linked from the Contributors section.
 *
 * Run: node tools/contributors_check.js  [--strict]
 *
 * Exits 0 even when someone is missing, and reports the count as
 * "missing: N" — check_all.js parses that and turns it into a FAIL. This
 * matches the other guards in tools/: check_all's run() uses execSync, which
 * throws on a non-zero exit, so a guard that exits 1 crashes the runner with a
 * stack dump instead of printing FAIL. Use --strict to get exit 1 when calling
 * this directly from CI.
 */
const fs = require('fs'), path = require('path');

const ROOT = path.join(__dirname, '..');
const MAIN = 'changelog.html';
const HEADING = 'Contributors</h2>';
// The repo owner is not a contributor to their own project; PR-bot / org links
// would go here too if any appeared.
const NOT_CONTRIBUTORS = new Set(['jounlai']);

const handles = str => new Set(
    [...str.matchAll(/(?:x\.com|twitter\.com|github\.com)\/([A-Za-z0-9_.-]+)/g)]
        .map(m => m[1])
        .filter(h => !NOT_CONTRIBUTORS.has(h))
);

const mainHtml = fs.readFileSync(path.join(ROOT, MAIN), 'utf8');
const cut = mainHtml.indexOf(HEADING);
if (cut < 0) {
    console.log(`contributors guard — FAILED TO PARSE`);
    console.log(`  '${HEADING}' not found in ${MAIN}. If the section was renamed,`);
    console.log(`  update HEADING in tools/contributors_check.js.`);
    console.log('missing: 1');
    process.exit(process.argv.includes('--strict') ? 1 : 0);
}
const listed = handles(mainHtml.slice(cut));

// Changelog bodies: the main file above the Contributors section, plus the
// per-month archives.
const bodies = [['changelog.html', mainHtml.slice(0, cut)]];
for (const f of fs.readdirSync(ROOT).filter(f => /^changelog-\d+\.html$/.test(f)).sort()) {
    bodies.push([f, fs.readFileSync(path.join(ROOT, f), 'utf8')]);
}

const credited = new Map();          // handle -> Set of files
for (const [file, body] of bodies) {
    for (const h of handles(body)) {
        if (!credited.has(h)) credited.set(h, new Set());
        credited.get(h).add(file);
    }
}

const missing = [...credited.entries()].filter(([h]) => !listed.has(h));

console.log('contributors guard — thanked in an entry vs listed under Contributors\n');
console.log(`  credited in entries: ${credited.size}`);
console.log(`  listed under Contributors: ${listed.size}`);
for (const [h, files] of missing) {
    console.log(`  MISSING  @${h}  (thanked in ${[...files].sort().join(', ')})`);
}
if (missing.length) {
    console.log(`\n  Add them to the Contributors list at the bottom of ${MAIN}:`);
    console.log(`    <li>Name (<a href="https://x.com/HANDLE" target="_blank" rel="noopener">@HANDLE</a>) — what they contributed</li>`);
}
console.log(`\nmissing: ${missing.length}`);
process.exit(missing.length && process.argv.includes('--strict') ? 1 : 0);
