#!/usr/bin/env node
/*
 * isan_tone_check.js — every th_isan tone must be one of the six tones of the
 * cited Isan system (see the TONE SYSTEM comment above LANG_DATA['th_isan'] in
 * wordmap_meta.js: Typhoon/SCB 10X 2025, arXiv 2511.21229, Table 2 + 21).
 *
 * Why: the row was flipped three rounds running (r33 to a Wikipedia table, r34
 * to the "row majority" ˥, r36 back). Each pass was internally consistent and
 * each was wrong against the published box. A tone outside the six values
 * means someone normalised the row to something other than the source.
 * This checks the inventory, not the class × mark mapping — for that, read
 * the table in wordmap_meta.js.
 *
 * Run: node tools/isan_tone_check.js    (prints "violations: N")
 */
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'words');
const OK = new Set(['˨˦', '˨˩', '˧˥˨', '˦', '˨', '˧˩']);
const TONE = /[˥-˩]+/gu;
const CELL = /["']?th_isan["']?\s*:\s*\[\s*"([^"]*)"\s*,\s*"([^"]*)"/u;
let bad = 0, cells = 0;
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.js')).sort()) {
    for (const ln of fs.readFileSync(path.join(dir, f), 'utf8').split('\n')) {
        const m = ln.match(CELL);
        if (!m) continue;
        cells++;
        const tones = m[2].match(TONE) || [];
        const off = tones.filter(t => !OK.has(t));
        if (!tones.length || off.length) {
            bad++;
            console.log(`  ${f.replace(/\.js$/, '')}: ${m[1]} ${m[2]}` + (tones.length ? `  (not in the Isan six: ${off.join(' ')})` : '  (no tone)'));
        }
    }
}
console.log(`th_isan cells: ${cells}`);
console.log(`violations: ${bad}`);
