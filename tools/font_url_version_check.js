#!/usr/bin/env node
/**
 * font_url_version_check.js — a self-hosted font's URL must change when its file does.
 *
 * fonts/ is served `public, max-age=31536000, immutable`, so a browser that has
 * fetched fonts/X.woff2?v=T once never asks for it again. build_cjk_page_subsets.py
 * and build_ipa_fonts.py write ?v=<sha256[:10]> themselves. The historic-script
 * subsets (build_historic_font_subsets.js prints its CSS without one) and the
 * Han Map's extension-B faces were re-cut and the ?v= was edited by hand, or
 * not at all: on 2026-11-14, 35 url()s on wordmap.html / hanmap.html / tree.html
 * still named an older cut — Yi fixed at its 10-29 cut through five re-cuts,
 * Sawndip 102 glyphs behind, NomNaTong-subset under three different URLs — so a
 * returning reader saw tofu for every glyph added since (rally r09).
 * build_historic_font_subsets.js --check could not see it: it opens the file on
 * disk, which was right; the browser's year-old copy was not.
 *
 * For every url('fonts/…') in the root *.html pages and styles.css:
 *   1. a ?v= must be the first 10 hex of the file's sha256 (or sha1, which the
 *      older hand-written ones used);
 *   2. a url() without ?v= is allowed only while the file is byte-identical to
 *      the copy that first shipped at that URL — UNVERSIONED below. Re-cut one
 *      and it needs a ?v= from then on;
 *   3. one file, one URL: pages that ask for the same font differently make a
 *      reader download it once per spelling.
 *
 *   node tools/font_url_version_check.js           report, exit 1 on a violation
 *   node tools/font_url_version_check.js --check   print "violations: N", exit 0
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Shipped without ?v= and never re-cut since (sha256, 16 hex). Not a list to
// add to: a new or re-cut font gets a ?v=, as the builders write it.
const UNVERSIONED = {
    'HanaMinB-NomFill2-subset.woff2': '7e107af5b485136d',
    'HanaMinB-hanmap3.woff2': '724696c045524569',
    'HanaMinB-hanmap4.woff2': 'c8257dc85dc588bc',
    'HanaMinExC-hanmap.woff2': '6c80cc0d16123a90',
    'Jigmo-hanmap.woff2': '5a363a1870aeb70a',
    'Jigmo2-hanmap.woff2': '98c3087fe2eb7746',
    'NomNaTong-hanmap2.woff2': '7259bf58aebb69d0',
    'NotoSansKR-OldHangul.woff2': '220bc7395236bc71',
    'NotoSerifKR-OldHangul.woff2': '55708cf194dae5a1',
    'PlangothicP2-hanmap2.woff2': '591b874b8f710236',
};

const hash = (algo, buf) => crypto.createHash(algo).update(buf).digest('hex');
const sources = fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort().concat(['styles.css']);
const RE = /url\(\s*(['"]?)\/?fonts\/([^'")?#\s]+)(?:\?v=([^'")#\s]*))?\1\s*\)/g;

const violations = [];
const spellings = new Map();   // font -> Map(token -> [files])
let refs = 0;
for (const f of sources) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'utf8');
    let m;
    RE.lastIndex = 0;
    while ((m = RE.exec(src))) {
        refs++;
        const name = m[2], tok = m[3] || '';
        const fp = path.join(ROOT, 'fonts', name);
        if (!fs.existsSync(fp)) { violations.push(`${f}: fonts/${name} is not on disk`); continue; }
        const buf = fs.readFileSync(fp);
        const s256 = hash('sha256', buf);
        if (tok) {
            if (!s256.startsWith(tok) && !hash('sha1', buf).startsWith(tok))
                violations.push(`${f}: fonts/${name}?v=${tok} — the file changed; browsers keep the old cut for a year. Use ?v=${s256.slice(0, 10)}`);
        } else if (UNVERSIONED[name] !== s256.slice(0, 16)) {
            violations.push(`${f}: fonts/${name} has no ?v=` + (UNVERSIONED[name] ? ' and was re-cut since it shipped' : '') + ` — use ?v=${s256.slice(0, 10)}`);
        }
        if (!spellings.has(name)) spellings.set(name, new Map());
        const sp = spellings.get(name);
        if (!sp.has(tok)) sp.set(tok, []);
        sp.get(tok).push(f);
    }
}
for (const [name, sp] of spellings) {
    if (sp.size > 1) violations.push(`fonts/${name} is asked for as ` + [...sp].map(([t, fs_]) => `${t ? '?v=' + t : '(no ?v=)'} on ${fs_.join(', ')}`).join('; ') + ' — one URL per file');
}

if (CHECK) {
    console.log(`violations: ${violations.length}`);
    for (const v of violations) console.log('  ' + v);
    process.exit(0);
}
console.log(`font url ?v= guard — ${refs} url('fonts/…') in ${sources.length} files\n`);
if (!violations.length) console.log('clean — every font URL names the file that is on disk.');
for (const v of violations) console.log('  ' + v);
process.exit(violations.length ? 1 : 0);
