#!/usr/bin/env node
/**
 * heading_order_check.js — every public page needs exactly one <h1>, and its
 * headings must not skip a level.
 *
 * A screen-reader user navigates a page by its headings. tree.html and
 * poster.html had NONE — not one h1 through h6 — so there was nothing to
 * navigate by at all, and no announced page title beyond the browser tab.
 * wordmap.html and hanmap.html jumped h1 to h3: the comparison dialog's own
 * heading was an <h3> with no <h2> anywhere before it (review 461).
 *
 * The h1 on the four map pages is deliberately visually hidden — these are
 * full-bleed map applications with no room for a printed title — which is a
 * normal way to give a page an accessible name, not a workaround.
 *
 * What this does NOT check is whether the heading TEXT is right, or whether a
 * hidden h1 is the correct choice for a given page. Those are judgement calls.
 * Skipped levels and missing h1s are not.
 *
 * Usage: node tools/heading_order_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Public pages plus poster.html, which is noindex but still a page people open.
// changelog-*.html are generated month archives with the same shape as
// changelog.html and are covered by it.
const SKIP = /^(changelog-\d+|_buildertest|_cardtest)\.html$/;

const problems = [];
for (const page of fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort()) {
    if (SKIP.test(page)) continue;
    const src = fs.readFileSync(path.join(ROOT, page), 'utf8');
    // Headings written by JS into an empty container (e.g. <h2 id="trivia-heading"></h2>)
    // still count: the element is in the document and screen readers see it.
    const levels = [...src.matchAll(/<h([1-6])[\s>]/g)].map(m => Number(m[1]));
    const h1s = levels.filter(n => n === 1).length;
    if (!levels.length) problems.push(`${page}: no heading at all (needs an <h1>, visually hidden is fine)`);
    else if (h1s === 0) problems.push(`${page}: ${levels.length} heading(s) but no <h1>`);
    else if (h1s > 1) problems.push(`${page}: ${h1s} <h1> elements; a page has one`);
    // A heading may go one level deeper than the one before it, never two.
    let prev = 0;
    for (const n of levels) {
        if (prev && n > prev + 1) { problems.push(`${page}: h${prev} is followed by h${n} — a level is skipped`); break; }
        prev = n;
    }
}

if (CHECK) {
    console.log('heading problems: ' + problems.length);
    for (const p of problems) console.log('  ' + p);
    process.exit(0);
}
console.log('heading order — one <h1> per page, no skipped levels\n');
if (!problems.length) console.log('  every page has an h1 and no level is skipped.');
for (const p of problems) console.log('  ✗ ' + p);
console.log('\n' + problems.length + ' problem(s).');
