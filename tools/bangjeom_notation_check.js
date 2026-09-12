#!/usr/bin/env node
/**
 * bangjeom_notation_check.js — one notation for the Middle Korean 방점.
 *
 * Middle Korean marks pitch with 방점, dots written beside the syllable:
 * one dot = 거성, two = 상성, none = 평성. The atlas writes them as a PREFIX,
 * '·' before the syllable for 거성 and ':' for 상성 — hanmap_data.js does this
 * in all 183 of its ko_mid entries, and 16 of wordmap's 19 did too.
 *
 * Three did not. bone, daughter and wheel carried U+302E HANGUL SINGLE DOT
 * TONE MARK *after* the syllable instead, and on 2026-09-12 that showed up as
 * a rendering bug the owner could see: 바회〮 is a precomposed 회 followed by a
 * combining mark, and font fallback runs per grapheme cluster, not per
 * codepoint. Our self-hosted Old Hangul subset has U+302E but not 회, so iOS
 * had to find one font carrying both — a Myeongjo — and rendered 회 in serif
 * while 바, its own cluster, stayed in the body face. One word, two fonts.
 * The prefix notation has no combining mark and therefore no cluster to split.
 *
 * Moving the mark is a notational identity, not a claim: U+302E after
 * syllable X is the same statement as '·' before syllable X. The one thing to
 * get right is what "the syllable" is — for conjoining jamo it is the whole
 * L+V+T run, so the dot goes before the LEADING consonant. Inserting before
 * the last codepoint instead splits ᄲᅧ into ᄲ·ᅧ, which is what my first
 * attempt did.
 *
 * Usage: node tools/bangjeom_notation_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// The Middle Korean rows. ko_em is the Early Modern stage; both are written
// in the same convention.
const ROWS = ['ko_mid', 'ko_em'];
const TONE_MARKS = /[〮〯]/u;

const wc = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', wc);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), wc, { filename: f });
const W = wc.WORDS;

const hits = [];
let cells = 0;
for (const id of Object.keys(W)) {
  const d = (W[id] || {}).data || {};
  for (const code of ROWS) {
    const e = d[code];
    if (!e) continue;
    const s = Array.isArray(e) ? e[0] : (e.form || '');
    if (!s || s === '—') continue;
    cells++;
    if (TONE_MARKS.test(s)) {
      const cp = [...s].find((c) => TONE_MARKS.test(c)).codePointAt(0);
      hits.push({ id, code, s, cp });
    }
  }
}

// The same convention on the Han Map side, so the two cannot drift apart.
let hanHits = [];
try {
  const hc = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'hanmap_data.js'), 'utf8')
    + '\nthis.D = HAN_DATA; this.L = HAN_LIST;', hc);
  for (const ch of hc.L) {
    const nat = (hc.D[ch] || {}).native || {};
    for (const code of ROWS) {
      const v = nat[code];
      if (typeof v === 'string' && TONE_MARKS.test(v)) hanHits.push({ id: ch, code, s: v });
    }
  }
} catch (_) { /* hanmap_data.js optional */ }

const total = hits.length + hanHits.length;
if (CHECK) {
  console.log(`combining 방점 (U+302E/302F) instead of the ·/: prefix: ${total}`);
  for (const h of hits) console.log(`  words/${h.id}.js ${h.code} "${h.s}"`);
  for (const h of hanHits) console.log(`  hanmap ${h.id} ${h.code} "${h.s}"`);
  process.exit(0);
}
console.log(`방점 notation — ${cells} Middle/Early-Modern Korean word cells\n`);
if (!total) { console.log('clean — every 방점 is written as a ·/: prefix.'); process.exit(0); }
for (const h of hits) console.log(`  words/${h.id}.js ${h.code} "${h.s}" carries U+${h.cp.toString(16).toUpperCase()}`);
for (const h of hanHits) console.log(`  hanmap ${h.id} ${h.code} "${h.s}"`);
process.exit(1);
