#!/usr/bin/env node
/*
 * affricate_tie_check.js — deterministic guard for affricate IPA notation.
 *
 * Project convention (decided 2026-06-21): affricates are written as BARE
 * digraphs (ts, tsʰ, tɕ, tʃ, tʂ, tɬ, dz, dʒ, dʑ, dʐ) WITHOUT the IPA tie bar
 * (U+0361 ◌͡◌). Both forms are valid IPA, but bare is the Sinological standard,
 * is already the dataset majority, and the combining tie bar renders unreliably
 * across the many fonts the map uses. The tie bar IS still allowed on genuine
 * co-articulations that are not affricates (e.g. the labial-velar nasal ŋ͡m).
 *
 * This checker flags any affricate written WITH a tie bar so the bare
 * convention can't silently regress. It is a DIAGNOSTIC: it reports, it does
 * not edit. Run: node tools/affricate_tie_check.js
 */
const fs = require('fs'), vm = require('vm'), path = require('path');

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(
  fs.readFileSync(path.join(__dirname, '..', 'hanmap_data.js'), 'utf8') +
  '\nthis.D=HAN_DATA;this.V=HAN_VARIANTS;this.L=HAN_LIST;this.LA=HAN_LANGS;', ctx);
const { D, V, L, LA } = ctx;

// Affricate = a coronal stop (t/d) tied to a sibilant or lateral fricative.
const AFFRICATE_TIE = /([td])͡([szʃʒɕʑʂʐɬ])/;
const AFFRICATE_TIE_G = /([td])͡([szʃʒɕʑʂʐɬ])/g;

const hits = [];
for (const ch of L) {
  for (const lg of LA) {
    const cells = [];
    const mi = (D[ch].ipa || {})[lg];
    if (mi) cells.push({ ipa: mi, scope: 'main' });
    for (const v of ((V[ch] || {})[lg] || [])) {
      if (v.ipa) cells.push({ ipa: v.ipa, scope: 'variant[' + (v.label || '') + ']' });
    }
    for (const c of cells) {
      if (AFFRICATE_TIE.test(c.ipa)) {
        const tied = (c.ipa.match(AFFRICATE_TIE_G) || []).join(', ');
        hits.push({ ch, lg, scope: c.scope, ipa: c.ipa, tied });
      }
    }
  }
}

console.log(`Scanned ${L.length} chars × ${LA.length} varieties (HanMap).`);
console.log(`affricate tie-bars: ${hits.length}\n`);
for (const h of hits) {
  console.log(`   ${h.ch}/${h.lg}${h.scope === 'main' ? '' : ' ' + h.scope}  ${JSON.stringify(h.ipa)}  (${h.tied} → should be bare)`);
}
if (hits.length === 0) console.log('   (all affricates are bare — clean)');
