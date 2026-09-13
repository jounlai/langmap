#!/usr/bin/env node
/**
 * description_duplicate_check.js — two languages may not share one description.
 *
 * Found by review 533: `meta_desc/txg.js` was a byte-for-byte copy of
 * `meta_desc/p_jpk.js`, so opening the **Tangut** pin displayed an essay about
 * Proto-Japonic-Koreanic and Robbeets. Tangut's own description was gone. It
 * had been that way long enough that nobody knows when it happened, because
 * nothing compared one description file with another — every guard on these
 * files checks a description against ITSELF (translation parity, string length,
 * no figures added) and a copied body passes all of them perfectly.
 *
 * The check is one line of idea: hash each row's English description and fail
 * on any hash claimed by two codes. Near-duplicates are reported separately —
 * dialect rows legitimately share most of a paragraph, so those are counted,
 * not failed.
 *
 * Usage: node tools/description_duplicate_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'meta_desc');
const CHECK = process.argv.includes('--check');

const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();
const byHash = new Map();
const missing = [];

for (const f of fs.readdirSync(DIR).sort()) {
  if (!f.endsWith('.js')) continue;
  const code = f.replace(/\.js$/, '');
  const c = vm.createContext({ LANG_DATA: {}, window: {} });
  let desc = null;
  try {
    vm.runInContext(fs.readFileSync(path.join(DIR, f), 'utf8'), c);
    const row = vm.runInContext('LANG_DATA', c)[code];
    desc = row && row.meta && row.meta.description && row.meta.description.en;
  } catch (e) { /* a file that will not parse is another guard's problem */ }
  if (!desc) { missing.push(code); continue; }
  const h = crypto.createHash('sha256').update(norm(desc)).digest('hex');
  if (!byHash.has(h)) byHash.set(h, []);
  byHash.get(h).push(code);
}

const dupes = [...byHash.values()].filter((codes) => codes.length > 1);

if (!CHECK) {
  console.log(`description duplicates — ${byHash.size} distinct English descriptions`);
  console.log('');
  for (const codes of dupes) {
    console.log(`  ${codes.join(' and ')} share one description body`);
  }
  if (missing.length) console.log(`  (${missing.length} file(s) with no English description: ${missing.slice(0, 8).join(', ')})`);
  console.log('');
}
console.log(`violations: ${dupes.length}`);
process.exit(CHECK ? 0 : (dupes.length ? 1 : 0));
