#!/usr/bin/env node
/**
 * latin_cyrillic_fusion_check.js — one word containing both Latin and Cyrillic
 * letters.
 *
 * script_fusion_check.js already finds two NON-Latin scripts fused into one
 * word, and says so in its own header: "Latin is ignored — transliterations and
 * HTML entities legitimately mix it with everything." That exemption is a hole,
 * and on 2026-09-05 it turned out to be holding 40 corrupted words:
 *
 *   Franконia Timur          (id, vmf)      should be Franconia
 *   Saksония Hilir           (id, stq)      should be Saksonia
 *   bahasa Algonkия Tengah   (id, pot)      should be Algonkia
 *   kayu ebони               (id, kde)      should be eboni
 *   Latinh/Rôман             (vi, ia)       should be Rôman
 *   позднестароjaponским     (ru, ja_chu)   should be позднестарояпонским
 *   «Чuyện Kiều»             (uk, trivia)   should be «Truyện Kiều»
 *   Конфедерации Haудiнoсауни (ru, trivia)  should be Хауденосауни
 *
 * They sit in the middle of a Russian, Ukrainian or Indonesian sentence that
 * nobody with the relevant language reads, and they survive every other check
 * because each is a single well-formed word in no language at all.
 *
 * Latin+Cyrillic is the pair worth gating at zero. Latin+Greek is not: IPA
 * writes θe, βeð, aχ and the Udeγe ethnonym takes a real gamma. Cyrillic has no
 * such role, so a Latin letter inside a Cyrillic word, or the reverse, is
 * always either a typo or a half-finished replace.
 *
 * THREE EXEMPTIONS, all real orthography:
 *   - The Caucasian palochka. Avar, Khvarshi, Tsakhur and their neighbours
 *     write цIа, чIаь, кIотIу with a letter that is usually typed as ASCII I.
 *   - Proto-Slavic and Old Church Slavonic reconstructions, which put the
 *     Cyrillic yers on a Latin stem: *dъždžь, *čьrvь, *sněgъ, *medъ.
 *   - Ossetian æ, which is a letter of that language's Cyrillic alphabet.
 *
 * Chuvash is NOT exempt, and is why the check is worth having beyond prose:
 * 59 of the 64 `cv` word cells used the Cyrillic ӑ ӗ ҫ and five used the Latin
 * lookalikes ă ĕ ç (кайăк, çӑмарта, тăваттă, тимĕр, çывӑр). The row's own
 * majority settled all five without a dictionary.
 *
 * Usage:
 *   node tools/latin_cyrillic_fusion_check.js          # full report
 *   node tools/latin_cyrillic_fusion_check.js --check  # "latin+cyrillic words: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const LATIN = /[A-Za-zÀ-ÖØ-öø-ÿĀ-ſ]/u;
const CYRIL = /[Ѐ-ӿԀ-ԯ]/u;
const TOKEN = /[^\s\p{P}\p{S}<>]+/gu;

// Reviewed and kept. Each is a writing system that genuinely mixes the two.
const legitimate = (t) =>
    // Caucasian palochka, typed as ASCII I or as Ӏ (U+04C0)
    (/[IӀ]/.test(t) && /^[Ѐ-ӿIӀ]+$/u.test(t)) ||
    // Proto-Slavic / OCS: Latin stem carrying the Cyrillic yers
    (/[ъь]/.test(t) && /^[A-Za-zÀ-ÿĀ-ſ̀-ͯъьěђ]+$/u.test(t)) ||
    // Ossetian æ is a letter of its Cyrillic alphabet
    (/^[Ѐ-ӿæÆ]+$/u.test(t));

// Known and unresolved: a native-name field whose correct spelling needs a
// source rather than a majority vote. Counted separately so the gate is 0.
const UNRESOLVED = {
    'Шöльӄумыт': 'Selkup autonym. Selkup Cyrillic has ӧ (U+04E7); this is a Latin ö. '
        + 'It is quoted as the autonym in the English description and in wordmap_data.js, '
        + 'so it needs a Selkup orthography source, not a guess.',
    'мāʼ': 'Nganasan `house`. Latin ā where Cyrillic а with a combining macron may belong. '
        + 'Needs a Nganasan orthography source.',
    'ЦӀаIхна': 'Tsakhur autonym, and it uses BOTH palochka forms in one word — Ӏ (U+04C0) '
        + 'and ASCII I. One of them is wrong; which one is a house-convention call.',
    'цIə': 'Hunzib `fire`. Palochka plus a Latin ə where Cyrillic ә (U+04D9) may belong — '
        + 'its Khvarshi neighbour writes цIа with a Cyrillic а. Hunzib is largely unwritten, '
        + 'so this needs a source on which alphabet the corpus is following.',
};

const files = ['wordmap_meta.js', 'wordmap_data.js', 'lang_names.js',
    'hanmap_trivia.js', 'wordmap_trivia.js']
    .concat(fs.readdirSync(ROOT).filter((f) => /^wordmap_trivia_[a-z]+\.js$/.test(f)).sort())
    .concat(fs.readdirSync(path.join(ROOT, 'words')).sort().map((f) => 'words/' + f));

const hits = [], known = [];
for (const f of files) {
    let s;
    try { s = fs.readFileSync(path.join(ROOT, f), 'utf8'); } catch (e) { continue; }
    const seen = new Set();
    for (const m of s.matchAll(TOKEN)) {
        const t = m[0];
        if (!(LATIN.test(t) && CYRIL.test(t))) continue;
        if (legitimate(t)) continue;
        if (seen.has(t)) continue;
        seen.add(t);
        const ctx = s.slice(Math.max(0, m.index - 45), m.index + t.length + 45).replace(/\s+/g, ' ');
        (UNRESOLVED[t] ? known : hits).push({ f, t, ctx });
    }
}

if (CHECK) {
    console.log('latin+cyrillic words: ' + hits.length);
    console.log('unresolved (needs a source): ' + known.length);
} else {
    for (const h of hits) { console.log(h.f + '   ' + h.t); console.log('   …' + h.ctx + '…'); }
    if (known.length) {
        console.log('\n-- known, needs a source rather than a majority vote --');
        for (const h of known) console.log('  ' + h.f.padEnd(22) + h.t + '\n      ' + UNRESOLVED[h.t]);
    }
    console.log('\nlatin+cyrillic words: ' + hits.length
        + '\nunresolved (needs a source): ' + known.length
        + '\nscanned ' + files.length + ' file(s)');
}
