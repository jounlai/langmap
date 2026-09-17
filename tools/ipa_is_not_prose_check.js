#!/usr/bin/env node
/*
 * ipa_is_not_prose_check.js — the IPA field holds a transcription, not a note.
 *
 * Owner found this cell on 2026-09-17:
 *
 *     kjg: ["mham", "hmam or m̥am — one notation, not three"]
 *
 * and two more like it, `egy ear` and `tca white`. All three came from one
 * rally patch. The auditor had spotted a real notation problem in each row,
 * could not decide the value, and wrote its reasoning into the `ipa` slot
 * instead of leaving it null and filing the item under `held`. The applier took
 * the string literally and wrote prose into the data.
 *
 * The applier was the first thing at fault and now validates before writing.
 * This is the second line: whatever route a value arrives by, an IPA field that
 * reads like a sentence must not survive to a commit.
 *
 * The three tests are chosen to have no false positives against the corpus as
 * it stands, which was measured rather than assumed:
 *
 *   - a comma, semicolon, em dash or en dash. The corpus contains **none** in
 *     any IPA field. Slash, hyphen, asterisk, brackets, parentheses, the
 *     subscript laryngeal digits and the superscript sandhi arrow all DO occur
 *     and are all legitimate, so none of them is tested.
 *   - " or " with spaces on both sides. Zero occurrences. A bare \bor\b cannot
 *     be used: word boundaries fire inside IPA letters, so /ʃaˈħor/ and /ɸone/
 *     match and the test is useless.
 *   - longer than 50 characters. The longest legitimate field is 44,
 *     `zu` n99 /amaʃumi ajisiʃijaɡaloˈluɲe nesiʃijaɡaloˈluɲe/.
 *
 * Each of the three bad cells trips at least one. Two trip the comma alone.
 *
 * Usage: node tools/ipa_is_not_prose_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const MAX = 50;
const PUNCT = /[,;—–]/;
/* An arrow or an ellipsis means the field is describing a change rather than
 * recording a value: `ʒaˈʒɨ → taˈʒɨ` and `anaˈtapu → aŋaˈtapu` both reached a commit
 * that way. Angle brackets are NOT tested: Baxter-Sagart writes the Old Chinese
 * infix as `*m-ɢˠ<r>a`, and that string carries its own `*`.
 *
 * The vertical arrows are NOT tested. ↑ U+2191 and ↓ U+2193 are IPA
 * suprasegmentals — upstep and downstep, and in some traditions ↓ marks an
 * ingressive airstream, which is exactly what `lbz_damin star` needs. Blocking
 * them was this guard being over-broad: it was written to catch a prose arrow
 * in `ʒaˈʒɨ → taˈʒɨ`, and a horizontal arrow is the only shape that means that.
 */

const ARROW = /[\u2190-\u2190\u2192-\u2192\u2194-\u21ff\u27f0-\u27ff\u2900-\u297f]|\.\.\.|\u2026/;

const ctx = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), ctx, { filename: f });
const WORDS = ctx.WORDS;

const violations = [];
for (const [id, w] of Object.entries(WORDS)) {
    if (!w || !w.data) continue;
    for (const [code, e] of Object.entries(w.data)) {
        const surface = Array.isArray(e) ? e[0] : (e && e.form);
        const ipa = Array.isArray(e) ? e[1] : (e && e.ipa);
        if (!surface || surface === '—' || !ipa) continue;
        const why = PUNCT.test(ipa) ? 'sentence punctuation'
            : ARROW.test(ipa) ? 'an arrow or ellipsis — a description, not a value'
            : / or /.test(ipa) ? 'the word "or"'
            : [...ipa].length > MAX ? `${[...ipa].length} characters, cap ${MAX}`
            : null;
        if (why) violations.push({ code, id, surface, ipa, why });
    }
}

if (!process.argv.includes('--check'))
    for (const v of violations)
        console.log(`  ✗ ${v.code} ${v.id} ${v.surface} — ${v.why}\n      /${v.ipa}/`);
console.log(`IPA fields that read like prose — violations: ${violations.length}`);
process.exit(violations.length ? 1 : 0);
