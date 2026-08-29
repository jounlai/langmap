#!/usr/bin/env node
/**
 * sinitic_tone_present_check.js — a tonal row must not drop its tone letters.
 *
 * Every modern Sinitic lect on this map is tonal, and every one of them writes
 * Chao letters. But 145 single-character cells across 50 rows had none: 五 with
 * no tone in half the Min rows, 雪 with none across a dozen, 鳥 and 风 the same.
 * It reads as one drafting batch that lost the letters on its way in, and
 * nothing noticed, because a missing tone is not a wrong tone — every other
 * guard was satisfied.
 *
 * Found 2026-08-29 by the agent filling `honey`, which needed those rows' 陰平
 * values and could not read them. 79 were restorable from the row's own cells
 * of the same Middle Chinese tone class, and were restored the same day. The
 * remaining 66 are frozen in the lock below.
 *
 * NOT flagged, deliberately:
 *   - och, zh_tang, zh_han, zh_song and zh_wenyan_edu. Old and Middle Chinese
 *     reconstructions use category labels and asterisked notation, not Chao
 *     letters, and are right not to have them.
 *   - anything that is not a single Han character. Compounds undergo sandhi and
 *     their notation is a separate question.
 *
 * Usage:
 *   node tools/sinitic_tone_present_check.js           # report
 *   node tools/sinitic_tone_present_check.js --check   # print "violations: N"
 *   node tools/sinitic_tone_present_check.js --update  # accept the current set
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const LOCK = path.join(__dirname, 'sinitic_tone_present.lock.json');

const wc = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', wc);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), wc, { filename: f });
const W = wc.WORDS;
const c = vm.createContext({ window: {} });
for (const f of ['wordmap_data.js', 'wordmap_meta.js'])
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^const /gm, 'var '), c);
const LANG_DATA = vm.runInContext('LANG_DATA', c);

// Reconstructions, which legitimately carry no Chao letters.
const RECONSTRUCTED = new Set(['och', 'zh_tang', 'zh_han', 'zh_song', 'zh_wenyan_edu']);
const HAN = /^[一-鿿]$/u;
const TONE = /[˥-˩]/u;

const rows = Object.keys(LANG_DATA).filter((k) =>
  /Sinitic/.test(String((LANG_DATA[k].meta || {}).family || '')) &&
  !/^vi_/.test(k) && !RECONSTRUCTED.has(k));

const hits = [];
for (const id of Object.keys(W)) {
  const data = W[id].data || {};
  for (const code of rows) {
    const e = data[code];
    if (!e) continue;
    const surf = Array.isArray(e) ? e[0] : e.form;
    const ipa = String(Array.isArray(e) ? e[1] : e.ipa);
    if (!surf || !HAN.test(surf)) continue;
    if (TONE.test(ipa)) continue;
    hits.push({ code, id, surf, ipa });
  }
}
const sig = (h) => `${h.code}|${h.id}`;
if (process.argv.includes('--update')) {
  fs.writeFileSync(LOCK, JSON.stringify(hits.map(sig).sort(), null, 0) + '\n');
  console.log(`accepted ${hits.length} toneless cells`);
  process.exit(0);
}
let known = new Set();
try { known = new Set(JSON.parse(fs.readFileSync(LOCK, 'utf8'))); } catch (_) {}
const fresh = hits.filter((h) => !known.has(sig(h)));
const gone = [...known].filter((k) => !hits.some((h) => sig(h) === k));
if (process.argv.includes('--check')) {
  console.log(`violations: ${fresh.length}`);
  if (gone.length) console.log(`stale: ${gone.length}`);
  process.exit(0);
}
console.log(`${rows.length} modern Sinitic rows checked.\n`);
if (fresh.length) {
  console.log(`✗ NEW toneless Han cells (${fresh.length}):`);
  fresh.forEach((h) => console.log(`    ${h.code.padEnd(10)} ${h.id.padEnd(10)} ${h.surf} /${h.ipa}/`));
} else {
  console.log('No new toneless cells.');
}
if (hits.length) console.log(`\n${hits.length} carried as debt. Restore each from the row's own cells of the same tone class — tools/sinitic_tone_class_check.js has the 調類 table.`);
if (gone.length) console.log(`\n${gone.length} lock entries no longer match — run --update.`);
process.exit(fresh.length ? 1 : 0);
