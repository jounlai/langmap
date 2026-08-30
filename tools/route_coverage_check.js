#!/usr/bin/env node
/**
 * route_coverage_check.js — a route-coloured word must route every language it
 * has a word for.
 *
 * tea, orange and wine colour the map by where the WORD came from rather than
 * by language family. That works off a `family: { code: routeKey }` object, and
 * a language with a cell but no entry in it does not error, does not warn, and
 * does not appear in a colour — it silently stops being part of the map's point.
 *
 * This happened twice on 2026-08-29, both times while adding pluricentric rows
 * in bulk: 76 variety rows went into tea with no routes, and wine's whole
 * "Modern Europe" block was routed by walking the file's section comments rather
 * than by etymology, which left Dutch wijn as "other" while German Wein was
 * "ie". The second is not something this guard can catch — it is about which
 * route, not whether there is one — but the first is, and it is the one that
 * comes back every time someone adds cells.
 *
 * Blank cells ("—", the honest no-source marker) are exempt: there is no word to
 * route. A route key that no language uses is reported too, since it means
 * either a dead legend entry or a typo in a key.
 *
 * Usage:
 *   node tools/route_coverage_check.js           # report
 *   node tools/route_coverage_check.js --check   # print "violations: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const wc = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', wc);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), wc, { filename: f });
const W = wc.WORDS;

const blank = (e) => {
  const s = Array.isArray(e) ? e[0] : (e && e.form);
  return !s || /^[\s—–-]*$/.test(String(s));
};

// `we` colours by clusivity, and 50 of its languages have a pronoun but no
// route. That is pre-existing and not fixable by rule: deciding whether a
// language has an inclusive/exclusive contrast in its FREE pronoun — the
// project's policy, verb-marking does not count — takes a source per language.
// Carried as debt so the tree stays green and any NEW gap still fails. Work it
// down and shrink the number; the stale check below complains if it is too big.
const DEBT = { we: 49 };

let violations = 0;
const notes = [];
const routed = Object.keys(W).filter((id) => W[id].routes && W[id].family);
for (const id of routed) {
  const w = W[id];
  const keys = new Set(Object.keys(w.routes));
  const missing = [], unknown = [];
  for (const [code, cell] of Object.entries(w.data || {})) {
    if (blank(cell)) continue;
    const r = w.family[code];
    if (!r) missing.push(code);
    else if (!keys.has(r)) unknown.push(`${code}=${r}`);
  }
  // a route nobody uses is a dead legend entry or a typo in a key
  const used = new Set(Object.values(w.family));
  const unused = [...keys].filter((k) => !used.has(k));
  if (missing.length) {
    const allowed = DEBT[id] || 0;
    if (missing.length > allowed) {
      violations += missing.length - allowed;
      notes.push(`✗ ${id}: ${missing.length} language(s) have a word but no route (${allowed} carried as debt) — ${missing.slice(0, 20).join(' ')}${missing.length > 20 ? ' …' : ''}`);
    } else {
      notes.push(`· ${id}: ${missing.length} unrouted, carried as debt (allowance ${allowed})`);
      if (missing.length < allowed) notes.push(`  ⚠ debt allowance for ${id} is ${allowed} but only ${missing.length} remain — lower it`);
    }
  }
  if (unknown.length) {
    violations += unknown.length;
    notes.push(`✗ ${id}: route key not declared in routes{} — ${unknown.join(' ')}`);
  }
  if (unused.length) notes.push(`· ${id}: route declared but unused — ${unused.join(' ')}`);
}

if (CHECK) { console.log(`violations: ${violations}`); process.exit(0); }
console.log(`Route-coloured words: ${routed.join(', ') || '(none)'}\n`);
if (!notes.length) console.log('Every language with a word has a route.');
notes.forEach((n) => console.log('  ' + n));
for (const id of routed) {
  const c = {};
  Object.values(W[id].family).forEach((r) => (c[r] = (c[r] || 0) + 1));
  console.log(`  ${id}: ${Object.entries(c).map(([k, v]) => `${k} ${v}`).join(', ')}`);
}
process.exit(violations ? 1 : 0);
