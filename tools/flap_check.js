#!/usr/bin/env node
/**
 * flap_check.js — North American and Australian English write the flap.
 *
 * Owner 2026-11-13: in American English and its dialects a t between vowels sounds like
 * Japanese ラ ([ɾ], water ˈwɔɾɚ), and the speak button must play it that way. Most cells
 * already wrote ɾ; butter and Saturday in en_south / en_aave / en_au and computer in en_ca /
 * en_au still had a plain t, which the synthesizer plays as a burst. This guard fails when a
 * t stands after a vowel (or ɹ) and before an unstressed vowel or syllabic l in these rows,
 * and in the Name Map's US English (en) forms.
 * Not flapped, and not flagged: t starting a stressed syllable (ˈt), t before n̩ or a final ən (cotton,
 * a glottal stop), nt (twenty — dictionaries cite the t), a t at the end of a word.
 * Usage: node tools/flap_check.js [--check]
 */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const ROWS = new Set(['en_us', 'en_ca', 'en_south', 'en_app', 'en_aave', 'en_au']);
const V = 'aeiouæɑɒɔəɚɝɛɜɪʊʌɐʉ';
const RX = new RegExp('(?<=[' + V + 'ːɹ])t(?=[' + V + ']|l̩)(?!ən(?:$|\\s))', 'u');  // cotton ˈkɔtən: a glottal stop, not a flap
const bad = [];
const test = (where, ipa) => { const m = RX.exec(ipa); if (m && !/[ˈˌ]$/.test(ipa.slice(0, m.index))) bad.push(`${where} ${ipa}`); };
for (const f of fs.readdirSync(path.join(ROOT, 'words'))) {
    if (!f.endsWith('.js')) continue;
    const t = fs.readFileSync(path.join(ROOT, 'words', f), 'utf8');
    for (const m of t.matchAll(/^\s+"?([a-z0-9_]+)"?: *\["([^"]*)", "([^"]*)"\]/gm)) if (ROWS.has(m[1])) test(`words/${f} ${m[1]} ${m[2]}`, m[3]);
}
for (const f of ['namemap_data.js', 'namemap_names_ext.js']) {
    const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const m of t.matchAll(/\n\s+en:\s*\{\s*form:'([^']*)'[^\n]*?ipa:'([^']*)'/g)) test(`${f} en ${m[1]}`, m[2]);
}
if (process.argv.includes('--check')) { console.log(`violations: ${bad.length}`); process.exit(0); }
bad.forEach(b => console.log('  ' + b));
console.log(`flap_check: ${bad.length} unflapped t`);
