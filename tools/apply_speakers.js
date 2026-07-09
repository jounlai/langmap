#!/usr/bin/env node
/* apply_speakers.js — apply a [{code, after}] patch list to meta.speakers in
 * wordmap_meta.js. Refuses to touch a code whose current value it cannot find
 * exactly once, so a bad regex fails loudly rather than corrupting the file.
 *   node tools/apply_speakers.js patch.json [--write]
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'wordmap_meta.js');
const patch = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const WRITE = process.argv.includes('--write');

let src = fs.readFileSync(FILE, 'utf8');
let done = 0;
const fail = [];

for (const { code, after } of patch) {
    if (!after) { fail.push([code, 'null replacement']); continue; }
    const esc = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // The meta assignment for this code, then its speakers:"..." within it.
    const re = new RegExp(
        `(LANG_DATA\\[(['"])${esc}\\2\\][^\\n]{0,400}?["']?\\bspeakers\\b["']?\\s*:\\s*)(['"])((?:\\\\.|(?!\\3)[^\\\\])*)\\3`
    );
    const m = src.match(re);
    if (!m) { fail.push([code, 'no speakers field found']); continue; }
    const q = m[3];
    // Re-quote: prefer double quotes unless the text has one.
    const outQ = after.includes('"') ? "'" : '"';
    const body = after.replace(new RegExp(outQ, 'g'), '\\' + outQ);
    src = src.replace(re, `$1${outQ}${body}${outQ}`);
    done++;
}

if (fail.length) {
    console.error(`FAILED (${fail.length}):`);
    for (const [c, why] of fail) console.error(`  ${c}: ${why}`);
}
console.log(`${done}/${patch.length} rewritten${WRITE ? '' : ' (dry run)'}`);
if (WRITE) { fs.writeFileSync(FILE, src); console.log('wrote', FILE); }
