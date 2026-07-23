#!/usr/bin/env node
/* get_desc.js — print the English meta.description for one or more language
 * codes (and optionally another UI language). Used by the description-audit
 * rally so agents can fetch the exact current text instead of it being embedded.
 *
 *   node tools/get_desc.js vai km sa            # en for each
 *   node tools/get_desc.js --lang ja vai        # ja translation for vai
 *   node tools/get_desc.js --all-flagged        # every code whose en has a superlative
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
global.window = {};
const store = {};
global.LANG_DATA = new Proxy(store, {
  get: (t, k) => { if (typeof k !== 'string') return t[k]; if (!(k in t)) t[k] = {}; return t[k]; },
  has: () => true,
});
eval(fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8'));
eval(fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8'));

const args = process.argv.slice(2);
let lang = 'en';
const li = args.indexOf('--lang');
if (li >= 0) { lang = args[li + 1]; args.splice(li, 2); }

const SUP = /\b(the only|only one|oldest|the first|earliest|the largest|largest|the smallest|the most|most \w+ language|unique|uniquely|purest|never|no other|sole|solely|exclusively|world'?s (?:oldest|largest|first|only)|one of the (?:oldest|first|only))\b/i;

let codes = args.filter(a => !a.startsWith('--'));
if (args.includes('--all-flagged')) {
  codes = Object.keys(store).filter(c => {
    const m = store[c].meta; if (!m || !m.description) return false;
    const en = (typeof m.description === 'object' ? m.description.en : m.description) || '';
    return SUP.test(en);
  });
}

const audit = args.includes('--audit');
for (const c of codes) {
  const m = store[c] && store[c].meta;
  const d = m && m.description;
  const name = (store[c] && store[c].name) || c;
  if (audit) {
    // Machine-friendly: the target language list + the English source, so a
    // rewrite agent knows exactly which languages to (re)produce.
    const langs = (d && typeof d === 'object') ? Object.keys(d) : ['en'];
    const en = d ? (typeof d === 'object' ? d.en : d) || '' : '';
    process.stdout.write(`### ${c} — ${name}\nLANGS: ${langs.join(',')}\nEN: ${en}\n\n`);
    continue;
  }
  let text = '';
  if (d) text = (typeof d === 'object' ? (d[lang] || d.en) : d) || '';
  process.stdout.write(`### ${c} — ${name}\n${text}\n\n`);
}
