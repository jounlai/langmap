#!/usr/bin/env node
/**
 * meta_field_usage_check.js — every meta field must have a reader.
 *
 * Written 2026-09-10, after an audit found three fields that nothing read:
 * `extinct` (a boolean four rows carried beside — or, on bzg and osc, instead
 * of — vitality, so the two disagreed and the redundant one was the silent
 * winner), and `extinctionDate` / `lastSpeaker`, which existed on uby alone
 * and said in structured form what uby's own description already said in
 * prose. A field with no reader is not neutral: it looks like data, gets
 * maintained like data, and quietly diverges from the field that is real.
 *
 * A reader is a property access — `.field`, `['field']`, `["field"]` — in a
 * page, an exporter, a validator or a checker. Plain word matches don't
 * count: `coverage`, `period`, `family` and `script` are ordinary English
 * and appear in prose and comments all over the tree.
 *
 * Fields whose only reader is the validator or a checker are reported as
 * "shape-checked only" — not a failure (glottocode and textDirection are
 * genuine identifiers/inputs, not display data) but worth seeing, because a
 * field that only a guard reads is one render away from being useful.
 *
 * Usage: node tools/meta_field_usage_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const ctx = vm.createContext({ window: {} });
for (const f of ['wordmap_data.js', 'wordmap_meta.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^const /gm, 'var '), ctx);
}
const LANG_DATA = vm.runInContext('LANG_DATA', ctx);

const counts = new Map();
for (const code of Object.keys(LANG_DATA)) {
  const meta = LANG_DATA[code].meta || {};
  for (const k of Object.keys(meta)) counts.set(k, (counts.get(k) || 0) + 1);
}

// Consumers: the pages, the tools, the validator. Changelogs are prose.
// wordmap_meta.js itself is the data, not a reader of it.
const files = [];
for (const f of fs.readdirSync(ROOT)) {
  if (f.endsWith('.html') && !f.startsWith('changelog')) files.push(f);
}
files.push('validate_wordmap_data.js');
for (const f of fs.readdirSync(path.join(ROOT, 'tools'))) {
  if (f.endsWith('.js') && f !== 'meta_field_usage_check.js') files.push('tools/' + f);
}
const texts = files.map(f => [f, fs.readFileSync(path.join(ROOT, f), 'utf8')]);

// build_meta_split.js names every field in a list, which is a registry, not a
// read. Excluding it is what makes "nothing reads this" detectable at all.
const REGISTRY_ONLY = new Set(['tools/build_meta_split.js']);
const GUARD = /^(validate_wordmap_data\.js|tools\/.*(check|validate).*\.js)$/;

const unread = [];
const guardOnly = [];
for (const field of [...counts.keys()].sort()) {
  const re = new RegExp('\\.' + field + '\\b|\\[\'' + field + '\'\\]|\\["' + field + '"\\]');
  const readers = texts.filter(([f, t]) => !REGISTRY_ONLY.has(f) && re.test(t)).map(([f]) => f);
  if (!readers.length) unread.push([field, counts.get(field)]);
  else if (readers.every(f => GUARD.test(f))) guardOnly.push([field, readers]);
}

if (CHECK) {
  console.log(`meta fields with no reader: ${unread.length}`);
  for (const [f, n] of unread) console.log(`  ${f} (${n} rows)`);
  process.exit(0);
}

console.log(`${counts.size} meta fields over ${Object.keys(LANG_DATA).length} rows.`);
if (unread.length) {
  console.log('\nNO READER — stored, never used:');
  for (const [f, n] of unread) console.log(`  ${f.padEnd(20)} ${n} row(s)`);
} else {
  console.log('\nEvery field has a reader.');
}
if (guardOnly.length) {
  console.log('\nShape-checked only (a guard reads it; no page or exporter does):');
  for (const [f, r] of guardOnly) console.log(`  ${f.padEnd(20)} ${r.join(', ')}`);
}
