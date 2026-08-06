#!/usr/bin/env node
/**
 * meta_truncation_check.js — catch metadata strings that were cut off.
 *
 * A reader opened /ja/wordmap/arp and found the 公用語 chip reading
 *
 *     USA (no federal status; Northern Arapaho Tribe operates a tribal college and
 *
 * — a sentence that stops mid-clause with the bracket still open (2026-08-06).
 * A sweep found **92** of them across `official`, `script` and `countries`,
 * some sitting there since the rows were first imported. Nothing flagged them:
 * they are valid strings, correctly quoted, and every other guard passed.
 *
 * An unclosed bracket is the reliable signature. It cannot be a style choice —
 * these fields are prose with parenthetical qualifiers, so `(` without `)` is
 * always damage. Checking the reverse direction too catches a stray `)`.
 *
 * Deliberately NOT checked: a trailing conjunction ("… recognized as"). It is
 * a genuine truncation signal, but "No" and "Yes" are extremely common values
 * and any word-list broad enough to be useful produced dozens of false hits.
 * Every real case found in the 2026-08-06 sweep also had an unbalanced
 * bracket, so the cheap test loses nothing.
 *
 * Usage:
 *   node tools/meta_truncation_check.js           # report (exit 1 if any)
 *   node tools/meta_truncation_check.js --check   # print "truncated: N", exit 0
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Prose fields shown as chips on the language page. `description` is excluded:
// it is long-form text in 19 languages where a bracket may legitimately span a
// clause boundary, and it has its own guard (description_translation_check.js).
const FIELDS = ['family', 'speakers', 'countries', 'official', 'script', 'region'];

const ctx = { console, window: {} };
vm.createContext(ctx);
for (const f of ['wordmap_data.js', 'wordmap_meta.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx);
}
vm.runInContext('this.__D = (typeof LANG_DATA !== "undefined") ? LANG_DATA : window.LANG_DATA;', ctx);
const LANG_DATA = ctx.__D;

const bad = [];
for (const [code, ld] of Object.entries(LANG_DATA)) {
  const meta = (ld && ld.meta) || {};
  for (const field of FIELDS) {
    const v = meta[field];
    if (!v || typeof v !== 'string') continue;
    const depth = (v.match(/\(/g) || []).length - (v.match(/\)/g) || []).length;
    if (depth !== 0) bad.push({ code, field, depth, value: v });
  }
}

if (CHECK) {
  console.log(`truncated: ${bad.length}`);
  for (const b of bad) {
    console.log(`  ${b.code}.meta.${b.field} — ${b.depth > 0 ? 'unclosed' : 'stray closing'} bracket: ${b.value.slice(0, 90)}`);
  }
  process.exit(0);
}

console.log('metadata truncation guard — unbalanced brackets in chip fields\n');
if (!bad.length) console.log(`clean — ${Object.keys(LANG_DATA).length} languages × ${FIELDS.length} fields.`);
for (const b of bad) {
  console.log(`${b.depth > 0 ? 'UNCLOSED' : 'STRAY  )'}  ${b.code}.meta.${b.field}`);
  console.log(`          ${b.value}\n`);
}
process.exit(bad.length ? 1 : 0);
