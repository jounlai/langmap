#!/usr/bin/env node
/**
 * extinct_classification_check.js — catch languages that are EXTINCT (no living
 * speakers) and carry a meta.period, yet are displayed as MODERN rather than
 * historical.
 *
 * Origin: owner 2026-07-21 — "Mochica (Yunga) has 0 speakers and period
 * metadata, yet it is classified as a modern language. Investigate & fix this
 * class of problem."
 *
 * Display classification (mirrors wordmap.html):
 *   historical  ⇔  code ∈ keys(HIST_DESCENDANT)  AND  code ∉ LIVING_FRAGMENTARY_CODES
 *   modern      ⇔  everything else (that is not EXCLUDED_CODES)
 *
 * A language is "extinct" here when it has NO living speakers: speakerCount
 * vitality 'extinct', an l1/total of 0, or a meta.speakers string that opens
 * with Extinct / Historical / Liturgical / Reconstructed / 0. Moribund
 * languages that still have a handful of L1 speakers (mnc, itl…) are NOT
 * extinct and legitimately stay modern.
 *
 * FLAG = extinct AND has meta.period AND shown as modern.  Such a language
 * belongs on the historical map. The usual fix is to drop it from
 * LIVING_FRAGMENTARY_CODES (it is already a HIST_DESCENDANT key).
 *
 * Run:  node tools/extinct_classification_check.js
 * Exit: non-zero if any language is flagged (so check_all can gate on it).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// --- load LANG_DATA meta + the two data tables from the data/meta layer ---
global.window = {};
const store = {};
global.LANG_DATA = new Proxy(store, {
  get: (t, k) => { if (typeof k !== 'string') return t[k]; if (!(k in t)) t[k] = {}; return t[k]; },
  has: () => true,
});
// const HIST_DESCENDANT / DATA_STATUS_OVERRIDES / EXCLUDED_CODES don't leak out
// of eval scope — rewrite the declarations to global assignments so we can read
// them here.
let dataSrc = fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8');
dataSrc = dataSrc
  .replace(/\bconst\s+HIST_DESCENDANT\s*=/, 'global.__HIST_DESCENDANT =')
  .replace(/\bconst\s+DATA_STATUS_OVERRIDES\s*=/, 'global.__DATA_STATUS_OVERRIDES =')
  .replace(/\bconst\s+EXCLUDED_CODES\s*=/, 'global.__EXCLUDED_CODES =');
eval(dataSrc);
eval(fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8'));

const HIST_DESCENDANT = global.__HIST_DESCENDANT || {};
const EXCLUDED = global.__EXCLUDED_CODES instanceof Set
  ? global.__EXCLUDED_CODES
  : new Set(Object.keys(global.__EXCLUDED_CODES || {}));

// --- LIVING_FRAGMENTARY_CODES lives in wordmap.html (view layer) ---
const html = fs.readFileSync(path.join(ROOT, 'wordmap.html'), 'utf8');
const lfBlock = html.match(/LIVING_FRAGMENTARY_CODES\s*=\s*new Set\(\[([\s\S]*?)\]\)/);
if (!lfBlock) { console.error('could not find LIVING_FRAGMENTARY_CODES in wordmap.html'); process.exit(2); }
const LIVING = new Set([...lfBlock[1].matchAll(/'([a-z_0-9]+)'/g)].map(m => m[1]));

const histKeys = new Set(Object.keys(HIST_DESCENDANT));
const shownHistorical = c => histKeys.has(c) && !LIVING.has(c);

function isExtinct(m) {
  if (!m) return false;
  const sc = m.speakerCount || {};
  if (sc.vitality === 'extinct') return true;
  if (typeof sc.l1 === 'number' && sc.l1 === 0 &&
      (sc.total === 0 || sc.total === undefined) &&
      (sc.rangeMax === 0 || sc.rangeMax === undefined)) return true;
  const s = (m.speakers || '').trim();
  if (/^(extinct|historical|liturgical|reconstructed|dormant)\b/i.test(s)) return true;
  if (/^0\b/.test(s)) return true;
  return false;
}

const flagged = [];
for (const [code, v] of Object.entries(store)) {
  const m = v.meta;
  if (!m) continue;
  if (EXCLUDED.has(code)) continue;      // not displayed at all
  if (!m.period) continue;               // owner's criterion: must carry a period
  if (!isExtinct(m)) continue;           // must have no living speakers
  if (shownHistorical(code)) continue;   // already correct
  flagged.push({
    code, period: m.period, speakers: m.speakers,
    inLiving: LIVING.has(code), inHist: histKeys.has(code),
  });
}

if (flagged.length === 0) {
  console.log('extinct-as-modern: 0  ✓ every extinct language with a period is shown as historical');
  process.exit(0);
}
console.log(`extinct-as-modern: ${flagged.length}  (extinct + has period + shown as MODERN)`);
for (const f of flagged) {
  const fix = f.inHist
    ? 'drop from LIVING_FRAGMENTARY_CODES'
    : 'add to HIST_DESCENDANT (+ a descendant or null)';
  console.log(`  ${f.code.padEnd(9)} period=${String(f.period).padEnd(12)} speakers=${String(f.speakers || '-').slice(0, 40).padEnd(40)} → ${fix}`);
}
process.exit(1);
