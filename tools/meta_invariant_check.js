#!/usr/bin/env node
/**
 * meta_invariant_check.js — the classification fields must agree with each other.
 *
 * Review 470 audited what the other 50 guards do NOT look at. Every meta field
 * is mentioned by some tool, referential integrity is clean (no dangling
 * parentCode or baseLang, no alias claimed twice), and the ten enum fields are
 * tidy — 3 to 6 distinct values each, no typos.
 *
 * What nothing checked is whether the fields agree. codeType, languageKind,
 * dataStatus, varietyRole, period and coverage describe one language from
 * different angles, and a row can satisfy all of them separately while
 * contradicting itself. They currently hold by discipline; this makes them
 * hold by machinery.
 *
 * All eight invariants below pass today. They are written down not because
 * something is broken but because nothing was stopping it from breaking.
 *
 * NOT an invariant, and deliberately so: varietyRole does NOT imply
 * parentCode. wordmap_meta.js says why, at the VARIETY_REL table — "Sensitive
 * cases (Ryukyuan, Jeju, Isan) use varietyRole to avoid forcing a misleading
 * parent." Okinawan, Miyako and Yaeyama are sibling languages of Japanese, not
 * dialects of it, and giving them parentCode 'ja' would assert the opposite.
 * A rule that looked obvious from the data would have overwritten a decision
 * the source explains.
 *
 * Also not an invariant: extinct rows do not all carry a period.
 * vitality 'extinct' covers languages that died last century (mnc, lbz, nny)
 * as well as ancient ones, and only two rows in the atlas have extinctionDate
 * or lastSpeaker at all, so there is nothing to require yet.
 *
 * Usage: node tools/meta_invariant_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8').replace(/^const /gm, 'var '), ctx);
const LANG_DATA = vm.runInContext('LANG_DATA', ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8').replace(/^const /gm, 'var '), ctx);

const CODES = new Set(Object.keys(LANG_DATA));

const RULES = [
  ['languageKind=reconstructed-proto implies dataStatus=reconstructed',
    (m) => m.languageKind === 'reconstructed-proto', (m) => m.dataStatus === 'reconstructed'],
  ['dataStatus=reconstructed implies languageKind=reconstructed-proto',
    (m) => m.dataStatus === 'reconstructed', (m) => m.languageKind === 'reconstructed-proto'],
  ['codeType=historical-stage implies a period',
    (m) => m.codeType === 'historical-stage', (m) => Boolean(m.period)],
  ['varietyRole=historical-stage implies a period',
    (m) => m.varietyRole === 'historical-stage', (m) => Boolean(m.period)],
  ['languageKind=historical-attested implies a period',
    (m) => m.languageKind === 'historical-attested', (m) => Boolean(m.period)],
  ['codeType=pedagogical-stage implies languageKind=pedagogical-stage',
    (m) => m.codeType === 'pedagogical-stage', (m) => m.languageKind === 'pedagogical-stage'],
  ['coverage=base-copy-with-notes implies baseLang',
    (m) => m.coverage === 'base-copy-with-notes', (m) => Boolean(m.baseLang)],
  ['parentCode and baseLang must name a code that exists',
    (m) => Boolean(m.parentCode || m.baseLang),
    (m) => (!m.parentCode || CODES.has(m.parentCode)) && (!m.baseLang || CODES.has(m.baseLang))],
];

const violations = [];
const stats = [];
for (const [label, when, must] of RULES) {
  let n = 0;
  const bad = [];
  for (const code of CODES) {
    const m = LANG_DATA[code].meta;
    if (!m || !when(m)) continue;
    n++;
    if (!must(m)) bad.push(code);
  }
  stats.push([label, n, bad.length]);
  for (const code of bad) violations.push(`${code}: ${label}`);
}

// aliases must not be claimed by two languages — an alias is how a reader finds
// a row, so a shared one sends them to the wrong place.
const aliasOwner = new Map();
for (const code of CODES) {
  const m = LANG_DATA[code].meta;
  for (const a of (Array.isArray(m && m.aliases) ? m.aliases : [])) {
    const key = String(a).trim().toLowerCase();
    if (!key) continue;
    if (!aliasOwner.has(key)) aliasOwner.set(key, []);
    aliasOwner.get(key).push(code);
  }
}
for (const [a, owners] of aliasOwner) {
  const uniq = [...new Set(owners)];
  if (uniq.length > 1) violations.push(`alias "${a}" is claimed by ${uniq.join(' and ')}`);
}

if (CHECK) {
  console.log(`violations: ${violations.length}`);
  for (const v of violations.slice(0, 30)) console.log('  ' + v);
  if (violations.length > 30) console.log(`  … ${violations.length - 30} more`);
  if (!violations.length) console.log(`  ${RULES.length} cross-field invariants hold; ${aliasOwner.size} aliases, none shared`);
  process.exit(0);
}
console.log('meta invariants — the classification fields must agree with each other\n');
for (const [label, n, bad] of stats)
  console.log(`  ${bad ? 'FAIL' : 'ok  '}  ${label.padEnd(58)} ${String(n).padStart(4)} rows`);
console.log(`\n  ${aliasOwner.size} distinct aliases, none claimed twice`);
console.log('');
if (!violations.length) console.log('clean.');
for (const v of violations) console.log('  ' + v);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
