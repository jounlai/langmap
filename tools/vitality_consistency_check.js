#!/usr/bin/env node
/**
 * vitality_consistency_check.js — catch a language whose vitality fields
 * contradict each other.
 *
 * Origin: owner 2026-08-19 — Old Prussian appeared among the modern languages.
 * The classification data turned out to be right, but the scan that followed
 * found Jiamao carrying `speakerCount: { l1: 3000, vitality: 'extinct' }` with
 * `meta.vitality: 'severely-endangered'` and a note reading "severely
 * endangered". Three fields, two answers.
 *
 * Nothing rendered wrong from it — which is the problem. `speakerCount.vitality`
 * feeds the endangerment filter and the map's era logic reads related fields, so
 * a contradiction sits there until something downstream quietly uses the wrong
 * half.
 *
 * Checks, all mechanical:
 *   A  speakerCount.vitality === 'extinct'  but a positive speaker count
 *   B  speakerCount.vitality !== 'extinct'  but the count is explicitly 0
 *   C  meta.vitality and speakerCount.vitality disagree — INFORMATIONAL, not
 *      blocking: review 430 established meta.vitality as a deliberate override
 *      where UNESCO is gloomier than the raw count, so a disagreement is often
 *      intended. Which field wins is a policy question, not a bug.
 *   D  speakerCount.notes opens with a vitality word that contradicts
 *      speakerCount.vitality (the Jiamao case)
 *
 * Reconstructed/historical rows legitimately carry l1:0 + 'extinct', so B only
 * fires when the row is NOT one of those.
 *
 * Run:  node tools/vitality_consistency_check.js
 *       node tools/vitality_consistency_check.js --check   # count only
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
let dataSrc = fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8')
  .replace(/\bconst\s+EXCLUDED_CODES\s*=/, 'global.__EX =');
eval(dataSrc);
eval(fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8'));
const EX = global.__EX instanceof Set ? global.__EX : new Set(Object.keys(global.__EX || {}));

const NOTE_VITALITY = [
  [/^extinct\b/i, 'extinct'],
  [/^critically[ -]endangered\b/i, 'critically-endangered'],
  [/^severely[ -]endangered\b/i, 'severely-endangered'],
  [/^definitely[ -]endangered\b/i, 'definitely-endangered'],
  [/^vulnerable\b/i, 'vulnerable'],
];

const findings = [];
for (const [code, v] of Object.entries(store)) {
  const m = v.meta;
  if (!m || EX.has(code)) continue;
  const sc = m.speakerCount;
  if (!sc) continue;

  const counts = [sc.l1, sc.total, sc.rangeMax].filter((x) => typeof x === 'number');
  const positive = counts.some((x) => x > 0);
  const zero = counts.length > 0 && counts.every((x) => x === 0);
  const kind = m.languageKind || '';
  const reconstructedOrHistorical =
    /reconstructed|historical|pedagogical/.test(kind) || !!m.period;

  if (sc.vitality === 'extinct' && positive) {
    findings.push([code, 'A', `speakerCount.vitality=extinct but l1/total=${counts.join('/')}`]);
  }
  if (sc.vitality && sc.vitality !== 'extinct' && zero && !reconstructedOrHistorical) {
    findings.push([code, 'B', `speakerCount says ${sc.vitality} but the count is 0`]);
  }
  if (m.vitality && sc.vitality && m.vitality !== sc.vitality) {
    findings.push([code, 'C', `meta.vitality=${m.vitality} vs speakerCount.vitality=${sc.vitality}`]);
  }
  const note = (sc.notes || '').trim();
  if (note && sc.vitality) {
    // A note that names MORE THAN ONE level is describing a split situation
    // ("vulnerable in Suriname, severely endangered in Trinidad"), and picking
    // the worse one for the field is an editorial call, not a contradiction.
    // Only an unambiguous note can contradict the field.
    const mentioned = new Set();
    for (const [, implied] of NOTE_VITALITY) {
      const bare = implied.replace(/-/g, '[ -]');
      if (new RegExp(bare, 'i').test(note)) mentioned.add(implied);
    }
    if (mentioned.size === 1) {
      for (const [re, implied] of NOTE_VITALITY) {
        if (re.test(note) && implied !== sc.vitality) {
          findings.push([code, 'D', `notes open "${note.slice(0, 32)}…" but vitality=${sc.vitality}`]);
          break;
        }
      }
    }
  }
}

const blocking = findings.filter(([, cls]) => cls !== 'C');
const info = findings.filter(([, cls]) => cls === 'C');

if (process.argv.includes('--check')) {
  console.log(`vitality contradictions: ${blocking.length}`);
  console.log(`meta-vs-count vitality disagreements (informational): ${info.length}`);
  process.exit(0);
}

console.log(`vitality contradictions: ${blocking.length}`);
for (const [code, cls, msg] of blocking) {
  console.log(`  [${cls}] ${code.padEnd(10)} ${msg}`);
}
console.log(`\nmeta.vitality vs speakerCount.vitality disagreements (informational): ${info.length}`);
for (const [code, , msg] of info) {
  console.log(`  [C] ${code.padEnd(10)} ${msg}`);
}
process.exit(blocking.length ? 1 : 0);
