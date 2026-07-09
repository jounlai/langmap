#!/usr/bin/env node
/* apply_word_patch.js — apply {code: {word: [surface, ipa]}} to words/<word>.js.
 *   node tools/apply_word_patch.js patch.json [--write]
 * Refuses to touch a cell whose existing entry it cannot locate exactly.
 */
const fs = require('fs');
const path = require('path');
const WORDS_DIR = path.join(__dirname, '..', 'words');
const patch = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const WRITE = process.argv.includes('--write');

// Invert: word -> [{code, pair}]
const byWord = {};
for (const [code, cells] of Object.entries(patch)) {
    for (const [word, pair] of Object.entries(cells)) (byWord[word] ||= []).push({ code, pair });
}

let done = 0;
const fail = [];
for (const [word, edits] of Object.entries(byWord)) {
    const file = path.join(WORDS_DIR, `${word}.js`);
    if (!fs.existsSync(file)) { edits.forEach(e => fail.push([e.code, word, 'no such word file'])); continue; }
    let src = fs.readFileSync(file, 'utf8');
    for (const { code, pair } of edits) {
        const esc = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`^(\\s*)${esc}:\\s*\\[[^\\]]*\\],`, 'm');
        if (!re.test(src)) { fail.push([code, word, 'entry not found']); continue; }
        const [s, ipa] = pair;
        src = src.replace(re, (_, indent) => `${indent}${code}: [${JSON.stringify(s)}, ${JSON.stringify(ipa)}],`);
        done++;
    }
    if (WRITE) fs.writeFileSync(file, src);
}

if (fail.length) { console.error(`FAILED (${fail.length}):`); fail.forEach(f => console.error('  ' + f.join(' / '))); }
console.log(`${done} cells rewritten${WRITE ? '' : ' (dry run)'}`);
