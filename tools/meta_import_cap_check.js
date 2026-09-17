#!/usr/bin/env node
/*
 * meta_import_cap_check.js — a metadata string cut at exactly 70 characters.
 *
 * Found 2026-09-17 in rally round 3, from the Austronesian thread: `pmt` and
 * `woe` both had a `script` field ending mid-word. A census found 27 rows whose
 * script field is exactly 70 characters long, most of them cut in the middle of
 * a word — "no special diacritics beyond stan", "written using Thai alpha",
 * "Ge'ez (Ethiopic) script …; Latin roman".
 *
 * There is no cap in the code. The longest script field in the repo is 263
 * characters and `countries` and `official` each have three at exactly 70 too,
 * so this is an artefact of whatever imported the batch, not a rule anything
 * enforces now. Twenty-seven rows landing on the same length out of 1,188 is
 * not a coincidence.
 *
 * `meta_truncation_check.js` reports these clean because it checks bracket
 * balance — a truncated sentence closes no brackets, so it passes.
 *
 * Length alone is not enough, and the first draft of this check proved it:
 * seven fields land on 70 characters by coincidence — "Cambodia; Vietnam
 * (Khmer Krom in Mekong Delta); Thailand (Khmer Surin)" is a complete sentence.
 * Every one of those seven ends with a closing parenthesis, and every genuinely
 * cut field ends mid-word or on a trailing space. So the test is length AND no
 * terminal punctuation, which separates the two sets exactly.
 *
 * The check is a ratchet, not a fixer: repairing a field means finding out what
 * the script actually is, one row at a time. What it does is stop the class
 * growing and keep the list visible. Delete an entry from DEBT when the field
 * is rewritten; the stale check below complains if you forget, so a repair
 * cannot hide behind its own note.
 *
 * Usage: node tools/meta_import_cap_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CAP = 70;

/* Rows whose field was already this length on the day the check was written.
 * `field|code`. Nine of these read as complete sentences that happen to be 70
 * characters; the rest are cut mid-word. Both are listed, because the length
 * is the only deterministic signal and sorting them needs a human. */
/* Rows whose field was already cut on the day the check was written.
 * `field|code`. A few of these may turn out to be complete sentences that
 * simply end without a full stop (rcf, osn, kry, fia); they are listed anyway,
 * because sorting those from the truncations needs a human and the length is
 * the only thing a machine can see. */
const DEBT = new Set([
    // PAID 2026-09-17, review 544. All 21 were rewritten from sources, and six
    // of the inherited claims turned out to be WRONG rather than merely short:
    // har's "official orthography since 1999" traces to one diaspora school's
    // recollection on Omniglot against a peer-reviewed 1986; gun's "33-letter
    // Achegety" is Paraguayan Guarani's alphabet, not Mbya's; bfq's Tamil-script
    // claim describes a script Unicode L2/22220 records as separate and
    // unadopted; sce's "official romanization since 2003" is neither official
    // nor 2003; mjg's "31 letters", slr's "TB5000" and jya's "Situ Pinyin"
    // exist in no source; rcf's "SudEL standard" is unsourceable.
    //
    // Leave the table here and empty. The class is an import artefact and the
    // next one will look exactly like these: a finished-sounding sentence that
    // happens to stop at 70 characters.
]);

/* A field that ends here was finished, not cut. */
const CLOSED = /[).!?\]"\u201d\u2019\u3002\uff09]$/;

const ctx = vm.createContext({});
vm.runInContext('var window = this;', ctx);
for (const f of ['wordmap_data.js', 'wordmap_meta.js'])
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
const DATA = vm.runInContext('typeof LANG_DATA !== "undefined" ? LANG_DATA : window.LANG_DATA', ctx);

const found = new Set();
const fresh = [];
for (const [code, row] of Object.entries(DATA)) {
    if (!row || !row.meta) continue;
    for (const [field, value] of Object.entries(row.meta)) {
        if (typeof value !== 'string' || [...value].length !== CAP) continue;
        if (CLOSED.test(value)) continue;
        const key = `${field}|${code}`;
        found.add(key);
        if (!DEBT.has(key)) fresh.push({ key, value });
    }
}

const stale = [...DEBT].filter((k) => !found.has(k));

if (!process.argv.includes('--check')) {
    for (const f of fresh) console.log(`  ✗ ${f.key} is exactly ${CAP} chars — "${f.value}"`);
    if (stale.length) {
        console.log(`\nDEBT entries that no longer match — delete them:`);
        for (const k of stale) console.log(`    ${k}`);
    }
    console.log(`\ncarried: ${DEBT.size - stale.length} of ${DEBT.size}`);
}
console.log(`meta strings at the import cap — violations: ${fresh.length + stale.length}`);
process.exitCode = fresh.length + stale.length ? 1 : 0;
