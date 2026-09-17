#!/usr/bin/env node
/*
 * apostrophe_consistency_check.js — one row, one apostrophe character.
 *
 * Written 2026-09-17 after rally round 3 noticed that `ty` wrote the ʻokina
 * U+02BB in eight cells and an ASCII apostrophe in one. The census was worse:
 * **97 of 243 rows with an apostrophe-like mark used more than one**, and the
 * split was usually lopsided — cak 41 U+02BC against 4 ASCII, nv 40 against 1.
 *
 * This is the palochka question of review 537 in another alphabet, and it has
 * the same answer: **published sources settle whether a mark is there, not
 * which codepoint encodes it.** That is a house convention, and the corpus had
 * already chosen — U+02BC MODIFIER LETTER APOSTROPHE, 1,228 against 633 ASCII
 * before this pass. U+02BC is also the only defensible choice technically: it
 * is a Letter, so word selection, search tokenisation and sorting treat the
 * word as one word, where ASCII U+0027 is punctuation and breaks all three.
 *
 * Three kinds of row are NOT swept into U+02BC, and getting these wrong would
 * have been the real damage:
 *
 *   1. **The mark is not a glottal stop.** Breton c'h is a trigraph for /x/;
 *      Veps, Livonian, Inari Sami and Olonets Karelian mark palatalisation;
 *      Ukrainian and Belarusian use it as a separating sign; Assamese marks a
 *      vowel with it; and `en_au g'day`, `nap 'recchia`, `vmf Vergelt's Gott`
 *      are ordinary elision. Every Indo-European and Uralic row is therefore
 *      out of scope.
 *   2. **The row has already chosen a different letter.** Polynesian writes the
 *      ʻokina U+02BB (rar, rtm), Mexican orthographies the saltillo U+A78C
 *      (otq), Karakalpak the turned comma it shares with Uzbek (kaa). Where a
 *      row already used one of those anywhere, its ASCII went there instead —
 *      the row's own evidence beats any classification from outside.
 *   3. **Constructed languages whose published orthography names the ASCII
 *      character**: Klingon and Lojban. Those were normalised the other way,
 *      to ASCII throughout.
 *
 * 463 cells converted, plus 84 earlier where a row's own majority was already a
 * modifier letter. The census went from 97 mixed rows to 4.
 *
 * Usage: node tools/apostrophe_consistency_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

const MARKS = new Map([
    [0x0027, "' ASCII apostrophe"], [0x2019, '’ right single quote'],
    [0x2018, '‘ left single quote'], [0x00B4, '´ acute'], [0x0060, '` grave'],
    [0x02BC, 'ʼ modifier apostrophe'], [0x02BB, 'ʻ okina'],
    [0xA78C, 'ꞌ saltillo'], [0x02BE, 'ʾ half ring'], [0x02BF, 'ʿ reversed half ring'],
]);

/* Rows where more than one mark is CORRECT, because they are different letters.
 * Semitic transcription needs both ʾ alef U+02BE and ʿ ayin U+02BF, and they
 * contrast — collapsing them would destroy a distinction, not tidy one. */
const ALLOW = new Set(['psem']);

/* Unresolved, and each needs an orthography decision rather than a vote:
 *   liv — Livonian palatalisation, 2 U+02BC / 2 U+2019 / 1 ASCII, a three-way tie
 *   uk  — the Ukrainian apostrophe; DSTU and Unicode both name U+02BC, but the
 *         row is 4 ASCII to 1 U+2019 and `be` next door is consistently ASCII
 *   as  — Assamese marks a vowel with it; the row has one of each, in two cells
 */
const DEBT = new Set(['liv', 'uk', 'as']);

const ctx = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), ctx, { filename: f });
const WORDS = ctx.WORDS;

const perRow = new Map();
for (const w of Object.values(WORDS)) {
    if (!w || !w.data) continue;
    for (const [code, e] of Object.entries(w.data)) {
        const surface = Array.isArray(e) ? e[0] : (e && e.form);
        if (!surface || surface === '—') continue;
        for (const ch of surface) {
            const cp = ch.codePointAt(0);
            if (!MARKS.has(cp)) continue;
            if (!perRow.has(code)) perRow.set(code, new Map());
            const m = perRow.get(code);
            m.set(cp, (m.get(cp) || 0) + 1);
        }
    }
}

const fresh = [];
const seen = new Set();
for (const [code, m] of perRow) {
    if (m.size < 2 || ALLOW.has(code)) continue;
    seen.add(code);
    if (DEBT.has(code)) continue;
    const spread = [...m].sort((a, b) => b[1] - a[1])
        .map(([cp, n]) => `U+${cp.toString(16).toUpperCase().padStart(4, '0')}×${n}`).join('  ');
    fresh.push(`${code}: ${spread}`);
}
const stale = [...DEBT].filter((c) => !seen.has(c));

if (!process.argv.includes('--check')) {
    for (const f of fresh) console.log(`  ✗ ${f} — one row, one apostrophe character`);
    if (stale.length) console.log(`\nDEBT entries that no longer match — delete them:\n    ${stale.join('\n    ')}`);
}
console.log(`rows mixing apostrophe characters — violations: ${fresh.length + stale.length}`);
process.exitCode = fresh.length + stale.length ? 1 : 0;
