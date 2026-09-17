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

const violations = [];
for (const [id, w] of Object.entries(WORDS)) {
    if (!w || !w.data) continue;
    for (const [code, e] of Object.entries(w.data)) {
        if (RECONSTRUCTION.has(code)) continue;
        const surface = Array.isArray(e) ? e[0] : (e && e.form);
        const ipa = Array.isArray(e) ? e[1] : (e && e.ipa);
        if (!surface || surface === '—' || !ipa) continue;
        if (!/g/.test(ipa) || !IPA_ONLY.test(ipa)) continue;
        violations.push({ code, id, surface, ipa });
    }
}

if (!process.argv.includes('--check'))
    for (const v of violations)
        console.log(`  ✗ ${v.code} ${v.id} ${v.surface} /${v.ipa}/ — ASCII g, want ɡ U+0261`);
console.log(`ASCII g in IPA — violations: ${violations.length}`);
process.exitCode = violations.length ? 1 : 0;
