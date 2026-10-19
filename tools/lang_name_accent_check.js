#!/usr/bin/env node
/**
 * lang_name_accent_check.js — no language name may carry a combining acute
 * accent (U+0301).
 *
 * Rally r37 a4#1: the Ukrainian names of three Chinese varieties were written
 * with dictionary stress marks — "Нанкі́нський діалект", "Кайфе́нський",
 * "Ченду́ський" — and the Word Map printed the accent on the map label.
 * Stress marks belong in a dictionary, not in a name. In NFC text a letter
 * that takes an acute is precomposed (é, á, ś), so a bare U+0301 left over
 * after NFC is a stress mark, never part of the spelling.
 *
 * Scans every place a language name is written: lang_names.js (all UIs),
 * lang_nicknames.js, and the Han Map's own name table (OV in hanmap.html).
 *
 * Usage: node tools/lang_name_accent_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const ACUTE = /́/u;
const bad = [];

const scan = (where, tbl) => {
  for (const [ui, m] of Object.entries(tbl || {})) {
    if (!m || typeof m !== 'object') continue;
    for (const [code, name] of Object.entries(m)) {
      if (typeof name === 'string' && ACUTE.test(name.normalize('NFC'))) {
        bad.push(`${where} ${ui}.${code} = ${JSON.stringify(name)}`);
      }
    }
  }
};

const c = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(ROOT, 'lang_names.js'), 'utf8').replace(/^const /gm, 'var ')
  + '\nthis.N = LANG_NAMES;', c);
scan('lang_names.js', c.N);

scan('lang_nicknames.js', require(path.join(ROOT, 'lang_nicknames.js')));

// The Han Map's per-UI override table: a literal object, read as text.
const hm = fs.readFileSync(path.join(ROOT, 'hanmap.html'), 'utf8');
const m = hm.match(/const OV = (\{[\s\S]*?\n\s*\});/);
if (!m) bad.push('hanmap.html: OV name table not found (guard needs updating)');
else {
  try { scan('hanmap.html OV', vm.runInNewContext('(' + m[1] + ')')); }
  catch (e) { bad.push('hanmap.html: OV name table did not parse: ' + e.message); }
}

if (!CHECK) {
  if (bad.length) {
    console.error('✗ lang-name-accent: ' + bad.length + ' name(s) with a combining acute (U+0301):');
    for (const b of bad) console.error('  ' + b);
  } else console.log('✓ lang-name-accent: no stress marks (U+0301) in any language name');
}
console.log('violations: ' + bad.length);
process.exit(CHECK ? 0 : (bad.length ? 1 : 0));
