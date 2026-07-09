#!/usr/bin/env node
/*
 * intra_row_dup_check.js — find languages where two of the 25 concepts hold the
 * SAME surface form.
 *
 * This is the fingerprint of a bad bulk import: a word slides one cell over and
 * ends up in two places (Blackfoot "heart" held the dog word; Hopi "tree" held
 * the numeral one; Tiwi "mother" held the 1sg pronoun; Nuosu Yi "star" held the
 * dog glyph). It is NOT proof of an error — genuine polysemy is everywhere
 * (Wu 吃 covers drink and eat; Cia-Cia "hand" is the same word as "five"; many
 * languages greet and thank with the same phrase) — so this is a REPORTING
 * tool, not a gate. It exits 0 and prints candidates for a human to judge.
 *
 * Pairs that are polysemous often enough to be noise are suppressed by default.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

global.window = {};
global.WORDS = {};
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter(f => f.endsWith('.js'))) {
    // eslint-disable-next-line no-eval
    eval(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'));
}

// Concept pairs that share a form in many unrelated languages — real polysemy,
// not import damage. Suppressed unless --all is passed.
const EXPECTED = new Set([
    'drink|eat',        // one verb for ingesting, very common
    'hello|thanks',     // one politeness formula
    'good|hello',       // "good (day)" as a greeting
    'love|good',        // 'like/good' overlap
    'sun|moon',         // rare but attested "heavenly body"; still worth a look
    'tree|hand',        // *kayu 'wood' vs branch — noisy in Austronesian
    'sun|fire',
    'heart|love',
]);

const norm = s => String(s || '').trim().toLowerCase().normalize('NFC');
const SHOW_ALL = process.argv.includes('--all');

const WIDS = Object.keys(WORDS).sort();
// Language codes are whatever the word tables key on — no need to load LANG_DATA.
const CODES = [...new Set(WIDS.flatMap(w => Object.keys(WORDS[w].data || {})))];
const hits = [];
for (const code of CODES) {
    const byForm = new Map();
    for (const w of WIDS) {
        const e = WORDS[w].data && WORDS[w].data[code];
        if (!e || !e[0]) continue;
        const s = norm(e[0]);
        if (!s || s === '—' || s === '-') continue;
        if (!byForm.has(s)) byForm.set(s, []);
        byForm.get(s).push(w);
    }
    for (const [form, words] of byForm) {
        if (words.length < 2) continue;
        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                const key = [words[i], words[j]].sort().join('|');
                if (!SHOW_ALL && EXPECTED.has(key)) continue;
                hits.push({ code, form, a: words[i], b: words[j] });
            }
        }
    }
}

// Group by concept pair so systematic patterns stand out from one-offs.
const byPair = {};
for (const h of hits) {
    const k = [h.a, h.b].sort().join(' = ');
    (byPair[k] ||= []).push(h);
}
const pairs = Object.entries(byPair).sort((x, y) => y[1].length - x[1].length);

console.log(`intra-row duplicate surfaces: ${hits.length} across ${pairs.length} concept pairs`);
console.log('(informational — genuine polysemy is common; judge each one)\n');
for (const [pair, list] of pairs) {
    console.log(`  ${pair.padEnd(20)} ${String(list.length).padStart(3)}  ${list.slice(0, 8).map(h => `${h.code}:${h.form}`).join('  ')}${list.length > 8 ? ' …' : ''}`);
}
console.log(`\ncandidates: ${hits.length}`);
