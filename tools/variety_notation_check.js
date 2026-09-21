#!/usr/bin/env node
/*
 * variety_notation_check.js — one variety writing its IPA a way none of its
 * siblings do.
 *
 * Not "this row disagrees with its parent about the word" (provenance_scan,
 * neighbour_concept_check) and not "this tone is wrong for this lect"
 * (sinitic_tone_class_check). This is narrower and duller: a row that says
 * the SAME thing as its siblings but NOTATES it differently — a missing
 * stress mark, a diacritic nobody else in the family uses.
 *
 * Found 2026-09-22 from a reader report. Guatemalan Spanish wrote water
 * aɣ̞wa where fourteen other Spanish rows write ˈaɣwa: no stress mark, and a
 * lowered diacritic that NO other Spanish row used even once. Four cells,
 * one authoring session, invisible for as long as nobody compared varieties
 * side by side. The word pages made it visible by merging identical forms —
 * es_gt sat alone in its own line while fourteen siblings shared one — which
 * is the only reason it surfaced at all.
 *
 * THE RULE. Inside a parent group (parentCode resolved to the root), a cell
 * is reported when BOTH hold:
 *
 *   1. Some sibling writes the same SURFACE, and the two IPAs are identical
 *      once stress marks and combining diacritics are removed. That is what
 *      makes it a notation difference rather than a real one — the phones
 *      agree and only the marks differ.
 *   2. Enough siblings agree on the other spelling. MIN_AGREE below; one
 *      sibling disagreeing with one other is not evidence of anything.
 *
 * Condition 1 is what keeps this quiet. German ä against a, Portuguese ã
 * against a and the Spanish h/x split are real phonemic differences, and
 * they survive the strip, so they are never reported.
 *
 * Usage:
 *   node tools/variety_notation_check.js           # report
 *   node tools/variety_notation_check.js --check   # print "violations: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

/*
 * Ruled REAL and left alone. Condition 1 strips every combining mark, which
 * is what keeps German ä and Portuguese ã out of the report — but it also
 * strips marks that carry genuine phonetics, so the strip cannot tell those
 * two apart on its own. That is what this list is for. Add an entry only
 * after deciding the difference is a fact about the lect.
 */
const ALLOW = {
    // Kagoshima devoices a final high vowel. The ring is the fact, not a slip.
    'ja_kg|poop': 'final-vowel devoicing is real in Kagoshima',
    // Brazilian Portuguese stresses this loan on the second syllable where
    // European Portuguese takes the first. A placement difference, not a
    // missing mark: both rows write a stress, in different places.
    'pt_br|sushi': 'BP suˈʃi against EP ˈsuʃi — real placement difference',
};

/** How many siblings must agree before a lone spelling counts as the odd one. */
const MIN_AGREE = 4;

function load() {
    const parts = ['this.window = this; var WORDS = this.WORDS = window.WORDS = {};'];
    parts.push(fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8'));
    for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')).sort())
        parts.push(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'));
    parts.push(fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8'));
    parts.push('this.LANG_DATA = LANG_DATA;');
    const ctx = vm.createContext({ console });
    vm.runInContext(parts.join('\n;\n'), ctx, { filename: 'bundle.js' });
    return ctx;
}

const { WORDS, LANG_DATA } = load();
const meta = (c) => (LANG_DATA[c] || {}).meta || {};
const root = (c) => {
    const seen = new Set();
    while (meta(c).parentCode && !seen.has(c)) { seen.add(c); c = meta(c).parentCode; }
    return c;
};
const BLANK = (s) => !s || /^[\s—–\-?]*$/.test(String(s));
const cell = (w, c) => {
    const x = ((WORDS[w] || {}).data || {})[c];
    if (!x) return null;
    const f = Array.isArray(x) ? x[0] : x.form;
    const i = Array.isArray(x) ? x[1] : x.ipa;
    return BLANK(f) ? null : { form: String(f), ipa: String(i || '') };
};
/* Strip the marks this guard is about: stress/secondary stress, and every
 * combining mark. What survives is the sequence of base phones. */
const bare = (s) => String(s).replace(/[ˈˌ]/g, '').normalize('NFD')
    .replace(/\p{M}/gu, '').normalize('NFC');

const hits = [];
for (const w of Object.keys(WORDS)) {
    const byGroup = {};
    for (const code of Object.keys((WORDS[w] || {}).data || {})) {
        const c = cell(w, code);
        if (c) (byGroup[root(code)] = byGroup[root(code)] || []).push([code, c]);
    }
    for (const [g, rows] of Object.entries(byGroup)) {
        if (rows.length < MIN_AGREE + 1) continue;
        for (const [code, c] of rows) {
            const twins = rows.filter(([o, s]) =>
                o !== code && s.form === c.form && bare(s.ipa) === bare(c.ipa) && s.ipa !== c.ipa);
            if (!twins.length) continue;
            const tally = {};
            for (const [, s] of twins) tally[s.ipa] = (tally[s.ipa] || 0) + 1;
            const [best, n] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
            if (n < MIN_AGREE) continue;
            if (ALLOW[`${code}|${w}`]) continue;
            hits.push({ w, code, group: g, form: c.form, is: c.ipa, should: best, n });
        }
    }
}
hits.sort((a, b) => b.n - a.n || a.code.localeCompare(b.code));

if (CHECK) { console.log(`violations: ${hits.length}`); process.exit(0); }
console.log(`Varieties notating a shared form differently (>= ${MIN_AGREE} siblings agree): ${hits.length}\n`);
for (const h of hits)
    console.log(`  ✗ ${h.code.padEnd(10)} ${h.w.padEnd(11)} ${h.form.padEnd(14)} /${h.is}/  vs  /${h.should}/  (${h.n} siblings)`);
if (!hits.length) console.log('  none.');
const allowed = Object.keys(ALLOW).length;
if (allowed) console.log(`\n· ${allowed} ruled real and skipped: ` + Object.entries(ALLOW)
    .map(([k, why]) => `${k} (${why})`).join('; '));
process.exit(hits.length ? 1 : 0);
