#!/usr/bin/env node
/*
 * affricate_tie_check.js — deterministic guard for affricate IPA notation.
 *
 * Project convention (decided 2026-06-21): affricates are written as BARE
 * digraphs (ts, tsʰ, tɕ, tʃ, tʂ, tɬ, dz, dʒ, dʑ, dʐ, qχ, pf, …) WITHOUT the IPA
 * tie bar (U+0361 ◌͡◌), across BOTH HanMap and WordMap. Both forms are valid IPA,
 * but bare is the Sinological standard, is the dataset majority, and the combining
 * tie bar renders unreliably across the many fonts the maps use.
 *
 * The tie bar IS still allowed (and required) on genuine co-articulations that are
 * NOT affricates — a stop+fricative is an affricate (gets bared), but a labial-velar
 * nasal ŋ͡m or a doubly-articulated stop k͡p is a co-articulation (keeps its tie).
 *
 * DIAGNOSTIC only: reports, does not edit. Run: node tools/affricate_tie_check.js
 */
const fs = require('fs'), vm = require('vm'), path = require('path');

// Affricate = a STOP tied to a homorganic FRICATIVE (the tie binds two
// obstruents of differing manner). Nasals (ŋ͡m) and stop+stop (k͡p) are excluded.
// ʈ ɖ were missing until 2026-07: Qʼanjobʼal star carried ʈ͡ʂʼ and slipped past.
const STOP = 'pbtdʈɖcɟkgqɢ';
const FRIC = 'ɸβfvszʃʒɕʑʂʐɬɮçʝxɣχʁθð';
const AFFRICATE_TIE = new RegExp(`([${STOP}])͡([${FRIC}])`);
const AFFRICATE_TIE_G = new RegExp(`([${STOP}])͡([${FRIC}])`, 'g');

const root = path.join(__dirname, '..');
const hits = [];

// ---- HanMap ----
{
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'hanmap_data.js'), 'utf8') +
    '\nthis.D=HAN_DATA;this.V=HAN_VARIANTS;this.L=HAN_LIST;this.LA=HAN_LANGS;', ctx);
  const { D, V, L, LA } = ctx;
  for (const ch of L) for (const lg of LA) {
    const cells = [];
    const mi = (D[ch].ipa || {})[lg];
    if (mi) cells.push({ ipa: mi, scope: 'main' });
    for (const v of ((V[ch] || {})[lg] || [])) if (v.ipa) cells.push({ ipa: v.ipa, scope: 'variant[' + (v.label || '') + ']' });
    for (const c of cells) if (AFFRICATE_TIE.test(c.ipa))
      hits.push({ map: 'HanMap', id: `${ch}/${lg}${c.scope === 'main' ? '' : ' ' + c.scope}`, ipa: c.ipa,
        tied: (c.ipa.match(AFFRICATE_TIE_G) || []).join(', ') });
  }
}

// ---- WordMap ----
{
  const ctx = { window: {} };
  vm.createContext(ctx); ctx.WORDS = {};
  for (const f of fs.readdirSync(path.join(root, 'words')).filter(x => x.endsWith('.js')))
    vm.runInContext(fs.readFileSync(path.join(root, 'words', f), 'utf8'), ctx);
  for (const w of Object.keys(ctx.WORDS)) for (const code of Object.keys(ctx.WORDS[w].data)) {
    const ipa = ctx.WORDS[w].data[code][1] || '';
    if (AFFRICATE_TIE.test(ipa))
      hits.push({ map: 'WordMap', id: `${w}/${code}`, ipa, tied: (ipa.match(AFFRICATE_TIE_G) || []).join(', ') });
  }
}

// ---- NameMap ----
// The third map was outside every IPA-convention guard until review 457, and
// eight of its 1,069 forms carried d͡ʒ (george/ar, gabriel/ar·fa·tr,
// arjun/hi·bn·id·ms) while the same affricate is bare everywhere else.
{
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const f of ['namemap_data.js', 'namemap_names_ext.js']) {
    const p = path.join(root, f);
    if (fs.existsSync(p)) vm.runInContext('var window=this;' + fs.readFileSync(p, 'utf8').replace(/^const /gm, 'var ') + ';', ctx, { filename: f });
  }
  const NAMES = ctx.NAMES || {};
  for (const id of Object.keys(NAMES)) for (const [cell, arr] of Object.entries(NAMES[id].forms || {}))
    for (const f of (Array.isArray(arr) ? arr : [arr])) {
      const ipa = String(f.ipa || '');
      if (AFFRICATE_TIE.test(ipa))
        hits.push({ map: 'NameMap', id: `${id}/${cell}`, ipa, tied: (ipa.match(AFFRICATE_TIE_G) || []).join(', ') });
    }
}

console.log('affricate tie-bars: ' + hits.length + '\n');
for (const h of hits) console.log(`   [${h.map}] ${h.id}  ${JSON.stringify(h.ipa)}  (${h.tied} → should be bare)`);
if (hits.length === 0) console.log('   (all affricates are bare across HanMap + WordMap + NameMap — clean)');
