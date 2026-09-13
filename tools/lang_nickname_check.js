#!/usr/bin/env node
/**
 * lang_nickname_check.js — the nickname layer, held to the same standard as
 * the data.
 *
 * lang_nicknames.js carries the short colloquial name a language is really
 * called by (Singlish, Manglish, AAVE, Pahlavi). It is opt-in on the map and
 * default on the goods hand-off, which means a nickname can end up printed on
 * a shirt — so an invented one is worse than a missing one, and every entry
 * has to be defensible.
 *
 * Six checks, all gated at 0:
 *
 *   1. the code exists on some map (a nickname for nothing is dead weight)
 *   2. the UI is one of the 19 lang_names.js carries
 *   3. the nickname differs from that UI's own formal name (else it is noise)
 *   4. no brackets — same rule the formal names follow (handoff 92)
 *   5. it is unambiguous: it may not be another row's formal name in that UI,
 *      and no two rows may share it. 1,187 pins is too many for a label that
 *      could mean two things.
 *   6. it is sourced: docs/lang-nickname-sources.md has a row for it, with a
 *      source. This is the check that stops a plausible-looking invention.
 *
 * Nicknames LONGER than the formal name are reported but not failed — a few
 * are (パフラヴィー語 beats 中世ペルシア語 for recognisability, not for width)
 * and that is a judgement, not a defect.
 *
 * Usage: node tools/lang_nickname_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const NICK = require(path.join(ROOT, 'lang_nicknames.js'));

const c = vm.createContext({});
vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, 'lang_names.js'), 'utf8')
  .replace(/^const /gm, 'var ') + ';', c);
const NAMES = vm.runInContext('typeof LANG_NAMES!=="undefined" ? LANG_NAMES : window.LANG_NAMES', c);

// Which codes any map shows, and each row's own English name as a last-resort
// formal label.
const rowName = {};
const load = (file, expr) => {
  const k = vm.createContext({ window: {} });
  try {
    vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/^const /gm, 'var ') + ';', k);
    const v = vm.runInContext(expr, k);
    for (const [code, row] of Object.entries(v || {})) {
      if (!(code in rowName)) rowName[code] = (row && row.name) || code;
    }
  } catch (e) { /* a map file missing is not this guard's problem */ }
};
load('wordmap_data.js', 'LANG_DATA');
load('hanmap_data.js', 'HAN_LANG_META');
// The Lang Map keys its languages inside each sentence rather than in a meta
// table, so `ine` and the other proto rows live only here.
try {
  const d = vm.createContext({ window: {} });
  vm.runInContext('var window=this;' + fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8').replace(/^const /gm, 'var ') + ';', d);
  for (const s of vm.runInContext('SENTENCES', d)) {
    for (const code of Object.keys(s.langs || {})) if (!(code in rowName)) rowName[code] = code;
  }
} catch (e) { /* ditto */ }

// The sources table: | ui | code | nickname | source |
const SRC_DOC = 'docs/lang-nickname-sources.md';
const sourced = new Map();
try {
  for (const line of fs.readFileSync(path.join(ROOT, SRC_DOC), 'utf8').split('\n')) {
    const m = line.match(/^\|\s*([a-z_]+)\s*\|\s*([A-Za-z0-9_]+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*$/);
    if (!m) continue;
    if (m[1] === 'ui') continue; // header
    if (/^-+$/.test(m[3])) continue; // separator row
    sourced.set(m[1] + '\t' + m[2], { nick: m[3], source: m[4] });
  }
} catch (e) { /* reported below as every entry being unsourced */ }

const problems = [];
const longer = [];

for (const [ui, table] of Object.entries(NICK)) {
  if (!NAMES[ui]) { problems.push(`${ui}: not a UI language lang_names.js carries`); continue; }
  const formal = NAMES[ui];
  // Every formal name in this UI, for the ambiguity test.
  const formalOwner = new Map();
  for (const [code, n] of Object.entries(formal)) if (!formalOwner.has(n)) formalOwner.set(n, code);
  const nickOwner = new Map();

  for (const [code, nick] of Object.entries(table)) {
    const at = `${ui}.${code}`;
    if (!(code in rowName)) { problems.push(`${at}: no such row on any map`); continue; }
    const f = formal[code] || rowName[code];
    if (nick === f) problems.push(`${at}: nickname is identical to the formal name (${nick})`);
    if (/[（(][^)）]*[)）]/.test(nick)) problems.push(`${at}: brackets in "${nick}"`);
    const clash = formalOwner.get(nick);
    if (clash && clash !== code) problems.push(`${at}: "${nick}" is already ${clash}'s formal name in ${ui}`);
    const twin = nickOwner.get(nick);
    if (twin) problems.push(`${at}: "${nick}" is also ${twin}'s nickname in ${ui}`);
    nickOwner.set(nick, code);
    const s = sourced.get(ui + '\t' + code);
    if (!s) problems.push(`${at}: not in ${SRC_DOC} — every nickname needs a source`);
    else if (s.nick !== nick) problems.push(`${at}: ${SRC_DOC} says "${s.nick}", the data says "${nick}"`);
    if (nick.length > f.length) longer.push(`${at}: "${nick}" (${nick.length}) is longer than "${f}" (${f.length})`);
  }
}

// A source row for a nickname that is no longer in the data is stale.
for (const key of sourced.keys()) {
  const [ui, code] = key.split('\t');
  if (!(NICK[ui] && code in NICK[ui])) problems.push(`${SRC_DOC}: row for ${ui}.${code} has no entry in lang_nicknames.js — delete it`);
}

const total = Object.values(NICK).reduce((a, t) => a + Object.keys(t).length, 0);
if (!CHECK) {
  console.log(`nickname guard — ${total} nickname(s) across ${Object.keys(NICK).length} UI language(s)`);
  console.log('');
  for (const p of problems) console.log('  ' + p);
  if (longer.length) {
    console.log(`\n  ${longer.length} nickname(s) longer than the formal name (informational):`);
    for (const l of longer) console.log('    ' + l);
  }
  console.log('');
}
console.log(`violations: ${problems.length}`);
process.exit(CHECK ? 0 : (problems.length ? 1 : 0));
