#!/usr/bin/env node
/*
 * sinitic_syllable_space_check.js — one Han character, one IPA syllable,
 * separated by a space.
 *
 * Owner call, 2026-09-17, from one observation: "中国方言のIPAで 1文字1文字の間に
 * スペースを入れたやつと入れてないやつが共存". The census agreed — 60 of 63
 * Sinitic rows wrote it both ways, 379 cells spaced against 678 solid, with no
 * row consistent with itself. `zh` alone had 18 spaced and 16 solid.
 *
 * The argument that settled it is specific to Chinese, and it is the 輕聲.
 * A tone letter marks the end of its own syllable, so /kʰa˦˦fei˦˦/ can in
 * principle be parsed without help — but a neutral-tone syllable carries no
 * tone letter at all, and /ma˨˦ma/ and /kuei˨˦ny/ then give the reader nothing
 * to split on. Spaces are also what the atlas already does for the other
 * scripts that do not write word gaps: Khmer, Thai, Lao, Burmese and Shan
 * account for most of the 244 non-Sinitic cells with a space in the IPA and
 * none in the surface.
 *
 * Scope is deliberately narrow — a surface of two or more characters, every one
 * of them Han. Anything with Latin or punctuation is left alone.
 *
 * ONE EXCEPTION, and it was a hole rather than a design choice. A `we` cell in a
 * clusivity row is written `inclusive / exclusive` in ONE cell, so its surface
 * carries a slash and failed the all-Han test — which exempted all 63 Sinitic
 * rows at that one concept and hid seven real defects, `zh 咱们 / 我们` among
 * them. Found 2026-09-17 by a thread looking for exactly this kind of seam.
 * Both fields are now split on `" / "` and each half tested on its own.
 *
 * ERHUA, added 2026-09-20 (owner's call). A trailing 儿/兒 can be a suffix that
 * colours the preceding rhyme instead of standing as its own syllable, so
 * Chengdu 舌頭兒 is three characters in TWO syllables, se tʻəɹ. Before this the
 * corpus had no such cell — all eleven cells containing 儿/兒 were 女儿-shaped,
 * two characters and two syllables — and the rule as written made the honest
 * spelling unwritable, which left the cell holding 舌头 instead: the word minus
 * its suffix, i.e. the very defect this concept was being repaired for.
 *
 * The allowance is deliberately not "a trailing 儿 may be silent", because that
 * would also let 女儿 be written with one syllable. The IPA has to SHOW the
 * erhua: the last syllable must carry a rhotic (ɚ, ɹ, ɻ or ˞). So a cell only
 * gets the exemption when both fields agree that erhua is what happened.
 *
 * `ja_kanbun` is EXEMPT, and it is the exception that proves the rule: its
 * readings are jukujikun, where the whole compound maps to a native Japanese
 * word rather than character by character. 杜鵑 is ほととぎす, five syllables
 * for two characters, and 算盤 is そろばん. One character, one syllable is a
 * fact about Chinese, not about the Han script.
 *
 * Usage: node tools/sinitic_syllable_space_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const HAN = /[㐀-䶿一-鿿豈-﫿]/u;

/* Readings that are not syllable-by-syllable. See the header. */
const EXEMPT = new Set(['ja_kanbun']);

const mc = vm.createContext({});
vm.runInContext('var window = this;', mc);
for (const f of ['wordmap_data.js', 'wordmap_meta.js'])
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), mc, { filename: f });
const DATA = vm.runInContext('typeof LANG_DATA !== "undefined" ? LANG_DATA : window.LANG_DATA', mc);

const wc = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', wc);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), wc, { filename: f });
const WORDS = wc.WORDS;

const SINITIC = new Set();
for (const [code, row] of Object.entries(DATA)) {
    const fam = (row && row.meta && row.meta.family) || '';
    if (/Sinitic|Chinese/i.test(fam)) SINITIC.add(code);
}

const violations = [];
for (const [id, w] of Object.entries(WORDS)) {
    if (!w || !w.data) continue;
    for (const [code, e] of Object.entries(w.data)) {
        if (!SINITIC.has(code) || EXEMPT.has(code)) continue;
        const surface = Array.isArray(e) ? e[0] : (e && e.form);
        const ipa = Array.isArray(e) ? e[1] : (e && e.ipa);
        if (!surface || surface === '—' || !ipa) continue;
        // A clusivity `we` cell holds two words in one field, `incl / excl`.
        const sParts = surface.split(' / '), iParts = ipa.split(' / ');
        if (sParts.length !== iParts.length) continue;
        for (let k = 0; k < sParts.length; k++) {
            const chars = [...sParts[k]];
            if (chars.length < 2 || !chars.every((c) => HAN.test(c))) continue;
            const pieces = iParts[k].trim().split(/\s+/).length;
            if (pieces >= chars.length) continue;
            // Erhua: a trailing 儿/兒 may be non-syllabic, but only when the
            // IPA shows it — the final syllable has to carry the rhotic.
            if (/[儿兒]$/.test(sParts[k]) && pieces === chars.length - 1) {
                const last = iParts[k].trim().split(/\s+/).pop() || '';
                if (/[\u025A\u0279\u027B\u02DE]/.test(last)) continue;
            }
            violations.push({ code, id, surface, ipa, chars: chars.length, pieces });
        }
    }
}

if (!process.argv.includes('--check'))
    for (const v of violations)
        console.log(`  ✗ ${v.code} ${v.id} ${v.surface} /${v.ipa}/ — ${v.chars} characters, ${v.pieces} IPA syllable${v.pieces > 1 ? 's' : ''}`);
console.log(`Sinitic syllables not separated — violations: ${violations.length}`);
process.exitCode = violations.length ? 1 : 0;
