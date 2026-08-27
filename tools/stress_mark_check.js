#!/usr/bin/env node
/**
 * stress_mark_check.js — a primary-stress mark (ˈ) on a monosyllable.
 *
 * The stress policy (owner, 2026-07-21) is: mark ˈ on polysyllabic single
 * words, leave monosyllables and multi-word phrases unmarked. A single syllable
 * has no stress to contrast with, so the mark carries no information there —
 * 129 cells across 55 languages had picked it up from transcription sources
 * that mark stress unconditionally.
 *
 * Only the unambiguous half of the policy is checked. Deciding whether a
 * polysyllabic cell OUGHT to have the mark needs to know the language's stress
 * rule, and for pitch-accent (ja, ko), French and tonal languages the answer is
 * that it should not — so that direction stays a human judgement.
 *
 * A cell is reported only when it is certainly one syllable:
 *   - exactly one vowel letter in the IPA, and
 *   - no ɚ/ɝ (a rhotic vowel this counter would otherwise miss), and
 *   - no sonorant standing without a vowel on either side (mti, crven, putns —
 *     a syllabic consonant the transcription did not mark), and
 *   - no secondary stress, and the surface is a single word.
 *
 * Usage: node tools/stress_mark_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WORDS_DIR = path.resolve(__dirname, '..', 'words');
const CHECK = process.argv.includes('--check');
const VOW = /[aeiouyɑɐɒæəɘɜɛɪɨɯɵøœɔʊʌʏɤɞʉɚɝ]/;
const VOW_G = /[aeiouyɑɐɒæəɘɜɛɪɨɯɵøœɔʊʌʏɤɞʉ]/g;
const SON = 'mnlrɫʎɲŋʀʁɹ';

const WORDS = (() => {
    const ctx = vm.createContext({});
    vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
    for (const f of fs.readdirSync(WORDS_DIR).filter((f) => f.endsWith('.js')))
        vm.runInContext(fs.readFileSync(path.join(WORDS_DIR, f), 'utf8'), ctx, { filename: f });
    return ctx.WORDS;
})();

function monosyllabic(ipa) {
    if (ipa.includes('ˌ')) return false;
    const bare = ipa.replace(/[ˈˌ]/g, '').normalize('NFD');
    if (/[\u0329\u030D]/.test(bare)) return false;          // marked syllabic consonant
    const d = bare.replace(/[\u0300-\u036f]/g, '');
    if (/[ɚɝ]/.test(d)) return false;
    if ((d.match(VOW_G) || []).length !== 1) return false;
    for (let k = 0; k < d.length; k++) {
        if (!SON.includes(d[k])) continue;
        const L = d[k - 1], R = d[k + 1];
        if (!(L && VOW.test(L)) && !(R && VOW.test(R))) return false;  // unmarked syllabic sonorant
    }
    return true;
}

const violations = [];
for (const [id, w] of Object.entries(WORDS)) {
    if (!w || !w.data) continue;
    for (const [code, e] of Object.entries(w.data)) {
        const surface = Array.isArray(e) ? e[0] : (e && e.form);
        const ipa = Array.isArray(e) ? e[1] : (e && e.ipa);
        if (!surface || surface === '—' || !ipa || !ipa.includes('ˈ')) continue;
        if (/\s/.test(surface.trim())) continue;
        if (monosyllabic(ipa)) violations.push({ code, id, surface, ipa });
    }
}

// NameMap. Given names are exactly where a stress mark matters and exactly the
// map no IPA-convention guard was reading: Hungarian György /ˈɟørɟ/ carried one
// on a single syllable (review 457).
{
    const ctx = vm.createContext({});
    for (const f of ['namemap_data.js', 'namemap_names_ext.js']) {
        const p = path.resolve(__dirname, '..', f);
        if (fs.existsSync(p)) vm.runInContext('var window=this;' + fs.readFileSync(p, 'utf8').replace(/^const /gm, 'var ') + ';', ctx, { filename: f });
    }
    const NAMES = vm.runInContext('typeof NAMES!=="undefined" ? NAMES : {}', ctx);
    for (const id of Object.keys(NAMES)) {
        for (const [cell, arr] of Object.entries(NAMES[id].forms || {})) {
            for (const f of (Array.isArray(arr) ? arr : [arr])) {
                const surface = f.rom || f.form || '';
                const ipa = String(f.ipa || '');
                if (!ipa.includes('ˈ') || /\s/.test(String(surface).trim())) continue;
                if (monosyllabic(ipa)) violations.push({ code: cell, id, surface, ipa });
            }
        }
    }
}

if (CHECK) {
    console.log(`violations: ${violations.length}`);
    for (const v of violations) console.log(`  ${v.code} ${v.id} ${v.surface} /${v.ipa}/ — ˈ on a monosyllable`);
    process.exit(0);
}
console.log('stress-mark check — ˈ marks a contrast a single syllable does not have\n');
if (!violations.length) console.log('clean — no monosyllabic cell carries a primary-stress mark.');
for (const v of violations) console.log(`  ${v.code.padEnd(9)} ${v.id.padEnd(9)} ${v.surface.padEnd(14)} /${v.ipa}/`);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
