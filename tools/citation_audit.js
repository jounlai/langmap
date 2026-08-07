#!/usr/bin/env node
/**
 * citation_audit.js — inventory every "Author Year" citation in the dataset.
 *
 * Three clusters of fabricated attributions turned up on 2026-08-07, all with
 * the same shape: a real scholar, a plausible year, and a claim the work does
 * not make.
 *
 *   oko water   "Lee KM 2003 — pre-MK *muru"   the standard reconstruction is *mul
 *   oko father  "Lee KM 1993 — *əpi"          contradicted by the graph and by MK
 *   p_ryu ×7    "Pellard 2015 — *amma"        that chapter contains none of the
 *                                             forms cited to it; its own
 *                                             reconstructions are crop and
 *                                             livestock vocabulary
 *
 * A citation is not self-verifying, and nothing in the pipeline ever checked
 * one. This tool cannot check them either — that needs the source in hand —
 * but it can list them, count them, and show which ones carry the most weight,
 * so the checking has somewhere to start.
 *
 * Usage:
 *   node tools/citation_audit.js            # full report
 *   node tools/citation_audit.js --check    # print "citations: N", exit 0
 *   node tools/citation_audit.js --unsourced  # cells asserting a form with no
 *                                              # citation at all
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const CHECK = argv.includes('--check');
const UNSOURCED = argv.includes('--unsourced');

const ctx = { console: { log() {} }, window: {}, WORDS: {} };
vm.createContext(ctx);
for (const f of ['wordmap_data.js', 'wordmap_meta.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx);
}
vm.runInContext('this.__D = (typeof LANG_DATA !== "undefined") ? LANG_DATA : window.LANG_DATA;', ctx);
const LANG_DATA = ctx.__D;

// "Lee KM 2003", "Pellard 2015", "Thorpe (1983)", "Ongaye (2013)", "NHK 2016".
// Deliberately loose: the point is to over-collect and let a human triage.
const CITE = /\b([A-ZÀ-Þ][\wÀ-ÿ'’\-]*(?:\s+(?:&|and|et al\.?|de|van|von)\s+[A-ZÀ-Þ][\wÀ-ÿ'’\-]*|\s+[A-Z]{1,3}\b)?)\s*\(?((?:1[5-9]|20)\d{2})\)?/g;

const found = new Map();   // "Author Year" -> [{code, word, where}]
const add = (key, hit) => {
  if (!found.has(key)) found.set(key, []);
  found.get(key).push(hit);
};

let cellsWithForm = 0, cellsWithSource = 0;
const noSource = [];

for (const [code, ld] of Object.entries(LANG_DATA)) {
  const we = ld.wordEvidence || {};
  for (const [word, ev] of Object.entries(we)) {
    const txt = [ev.source, ev.note].filter(Boolean).join(' ');
    // An evidence entry that asserts a form should say where it comes from.
    if (ev.evidence && ev.evidence !== 'disputed') {
      cellsWithForm++;
      if (ev.source) cellsWithSource++;
      else noSource.push(code + '.' + word + '  (evidence: ' + ev.evidence + ')');
    }
    let m;
    CITE.lastIndex = 0;
    while ((m = CITE.exec(txt))) add(m[1].trim() + ' ' + m[2], { code, word, where: 'wordEvidence' });
  }
  const meta = ld.meta || {};
  for (const s of (meta.sources || [])) {
    let m;
    CITE.lastIndex = 0;
    while ((m = CITE.exec(String(s.title || '')))) add(m[1].trim() + ' ' + m[2], { code, word: '—', where: 'meta.sources' });
  }
  // The English description is the one a reader sees; the other 18 are its
  // translations and would triple-count every citation.
  const en = (meta.description || {}).en;
  if (en) {
    let m;
    CITE.lastIndex = 0;
    while ((m = CITE.exec(en))) add(m[1].trim() + ' ' + m[2], { code, word: '—', where: 'description' });
  }
}

// The one thing here that IS mechanically checkable: a row whose description
// cites a work by short form while the row carries no bibliography, so the
// reader has no way to look it up. p_ryu was in that state while citing two
// works in nineteen languages.
const citesNoBib = [];
for (const [code, ld] of Object.entries(LANG_DATA)) {
  const meta = ld.meta || {};
  const en = (meta.description || {}).en || '';
  CITE.lastIndex = 0;
  if (CITE.test(en) && !(meta.sources || []).length) citesNoBib.push(code);
}

if (CHECK) {
  console.log('citations: ' + found.size);
  console.log('cites-without-bibliography: ' + citesNoBib.length);
  for (const c of citesNoBib) console.log('  ' + c + ': description names a work, meta.sources is empty');
  process.exit(0);
}

if (UNSOURCED) {
  console.log('Evidence entries asserting a form with no source string (' + noSource.length + '):\n');
  for (const x of noSource) console.log('  ' + x);
  process.exit(0);
}

const rows = [...found.entries()].sort((a, b) => b[1].length - a[1].length);
console.log('Citation inventory — ' + found.size + ' distinct "Author Year" strings, '
  + rows.reduce((a, r) => a + r[1].length, 0) + ' uses\n');
console.log('A citation used on many cells is worth checking first: one wrong');
console.log('attribution there is wrong everywhere it appears.\n');
console.log('  uses  citation                        rows / where');
for (const [cite, hits] of rows) {
  const codes = [...new Set(hits.map((h) => h.code))];
  const wheres = [...new Set(hits.map((h) => h.where))].join('+');
  console.log('  ' + String(hits.length).padStart(4) + '  ' + cite.padEnd(30)
    + ' ' + codes.slice(0, 6).join(',') + (codes.length > 6 ? ' +' + (codes.length - 6) : '')
    + '  [' + wheres + ']');
}
console.log('\nEvidence entries asserting a form: ' + cellsWithForm
  + ', of which ' + cellsWithSource + ' name a source ('
  + Math.round(100 * cellsWithSource / Math.max(1, cellsWithForm)) + '%).');
console.log('Run with --unsourced to list the rest.');
console.log('\nRows citing a work in the description with no meta.sources: ' + citesNoBib.length);
for (const c of citesNoBib) console.log('  ' + c);
