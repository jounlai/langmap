#!/usr/bin/env node
/*
 * ipa_ascii_g_check.js — ASCII g (U+0067) standing in for IPA ɡ (U+0261).
 *
 * Found 2026-09-17 while fixing stress marks: `words/cat.js` had
 * `es_cr: ["gato", "gato"]`, the IPA field copied straight from the surface.
 * A census turned up 160 such cells across 96 rows, and 115 of them sat in
 * rows that write ɡ correctly everywhere else — the row's own majority is the
 * evidence, no source needed.
 *
 * The trap is that plenty of these fields are NOT IPA. Wylie transliteration
 * (`xct` nag po, `bft` nagpo), Sumerological transcription, and PIE
 * reconstruction (`p_ine` *gʰegʰuǵʰ-) all write ASCII g by convention, and
 * "correcting" them would be the error. So a cell is reported only when it is
 * certainly IPA: it must carry at least one letter that appears in IPA and in
 * none of the romanizations this atlas uses — ŋ ʃ ː ʔ ə and the rest of the
 * list below. That test is what separated the 83 real ones from the 77 that
 * were left alone.
 *
 * SECOND RULE, added 2026-09-17 after rally round 4's Niger-Congo thread
 * pointed out the hole — and it is the embarrassing kind, because the cell that
 * started the whole investigation fell through it. `es_cr cat` is
 * ["gato", "gato"], and /gato/ contains no IPA-only letter, so the first rule
 * left it alone. A field that is byte-identical to its own surface was never
 * transcribed at all; it was copied. Where that happens in a row that writes
 * ɡ U+0261 correctly elsewhere, the row is its own witness and no letter test
 * is needed. That caught 29 more cells across 26 rows.
 *
 * Usage: node tools/ipa_ascii_g_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WORDS_DIR = path.resolve(__dirname, '..', 'words');

/* Reconstructions. Their notation is not IPA even where it borrows IPA
 * letters, and ASCII g is correct in all three. */
const RECONSTRUCTION = new Set(['p_viet', 'p_ine', 'pban']);

/* A letter here proves the field is IPA rather than a romanization. */
const IPA_ONLY = /[ɡŋʃʒɲʔʕɣβðθχʁɾɽɭɬɮʎɟɖʈɕʑʂʐɸʍɹɻʋɰəɐɑɒɛɔɪʊʌɤɯøœɵʉɨæːˈˌʰʲʷˠˤ͡]/;

const WORDS = (() => {
    const ctx = vm.createContext({});
    vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
    for (const f of fs.readdirSync(WORDS_DIR).filter((f) => f.endsWith('.js')))
        vm.runInContext(fs.readFileSync(path.join(WORDS_DIR, f), 'utf8'), ctx, { filename: f });
    return ctx.WORDS;
})();

/* Rows that write ɡ U+0261 somewhere, which is what makes an ASCII g in the
 * same row a slip rather than a notation. */
const ROW_HAS_SCRIPT_G = new Set();
for (const w of Object.values(WORDS)) {
    if (!w || !w.data) continue;
    for (const [code, e] of Object.entries(w.data)) {
        const ipa = Array.isArray(e) ? e[1] : (e && e.ipa);
        if (ipa && ipa.includes('\u0261')) ROW_HAS_SCRIPT_G.add(code);
    }
}

const violations = [];
for (const [id, w] of Object.entries(WORDS)) {
    if (!w || !w.data) continue;
    for (const [code, e] of Object.entries(w.data)) {
        if (RECONSTRUCTION.has(code)) continue;
        const surface = Array.isArray(e) ? e[0] : (e && e.form);
        const ipa = Array.isArray(e) ? e[1] : (e && e.ipa);
        if (!surface || surface === '—' || !ipa) continue;
        if (!/g/.test(ipa)) continue;
        // Rule 1: the field proves it is IPA. Rule 2: the field is a verbatim
        // copy of the surface, in a row that writes ɡ correctly elsewhere.
        if (!IPA_ONLY.test(ipa) && !(ipa === surface && ROW_HAS_SCRIPT_G.has(code))) continue;
        violations.push({ code, id, surface, ipa });
    }
}

if (!process.argv.includes('--check'))
    for (const v of violations)
        console.log(`  ✗ ${v.code} ${v.id} ${v.surface} /${v.ipa}/ — ASCII g, want ɡ U+0261`);
console.log(`ASCII g in IPA — violations: ${violations.length}`);
process.exitCode = violations.length ? 1 : 0;
