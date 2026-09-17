#!/usr/bin/env node
/**
 * ipa_syllable_dot_check.js — the atlas does not write syllable boundaries.
 *
 * Found 2026-09-12 from one cell the owner pointed at: `gun` (Mbyá Guaraní)
 * had `i.ˈnum.bo` for 'drink' and `tuɣɨ` for 'blood' — 19 of its 55 cells
 * separated syllables with a dot and 36 did not. Widening the question gave
 * 228 dotted cells across 69 rows and, decisively, **zero rows where the dot
 * was the row's own convention**. It is a minority spelling everywhere it
 * appears, which makes it a defect rather than a house style.
 *
 * Stress is still marked with ˈ — that IS the convention (see
 * tools/stress_mark_check.js). Only the boundary dot goes.
 *
 * ONE exception, by rule rather than by list: a dot inside a reconstruction
 * (the string contains `*`) is structural notation, not a syllable break.
 * Old Chinese uses Baxter-Sagart preinitials — `*C.nəʔ` 耳, `*k.rˤorʔ` 卵,
 * `*[r.ŋ]a` 魚 — where the dot marks a loosely attached preinitial consonant
 * and removing it would change the reconstruction.
 *
 * ONE exception by list, added 2026-09-17: `pyx` (Pyu). Miyake writes the Pyu
 * preinitial with exactly the same dot — `r.miŋ` 'name', `n.ho(m)H` 'three',
 * `t.du(j)` 'water' — and the rule above does not reach it because the Pyu
 * cells are cited from an inscriptional corpus and carry no `*`. It is the
 * same notation for the same thing, so it gets the same exemption.
 *
 * Spaces are a different question and are left alone: `yue` moon is
 * `jyːt˨ kʷɔːŋ˥`, two words, and that is deliberate.
 *
 * Usage: node tools/ipa_syllable_dot_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const ctx = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), ctx, { filename: f });
const W = vm.runInContext('window.WORDS', ctx);

// A dot flanked by non-space, non-dot characters. A trailing period, or a dot
// with a space beside it, is not a syllable separator.
const DOT = /[^\s.]\.[^\s.]/;

const hits = [];
for (const id of Object.keys(W)) {
  const d = (W[id] || {}).data || {};
  for (const [code, e] of Object.entries(d)) {
    const ipa = Array.isArray(e) ? e[1] : (e && e.ipa);
    if (typeof ipa !== 'string' || !DOT.test(ipa)) continue;
    if (ipa.includes('*')) continue;
    // Pyu preinitials, same notation, no asterisk to key off. See the header.
    if (code === 'pyx') continue;          // reconstruction notation — see header
    hits.push({ id, code, ipa });
  }
}

if (CHECK) {
  console.log(`IPA syllable dots: ${hits.length}`);
  for (const h of hits) console.log(`  ${h.code} ${h.id} "${h.ipa}"`);
  process.exit(0);
}
console.log('IPA syllable separators — the atlas marks stress, not syllable boundaries\n');
if (!hits.length) { console.log('clean.'); process.exit(0); }
const byCode = {};
for (const h of hits) (byCode[h.code] = byCode[h.code] || []).push(h);
for (const [code, list] of Object.entries(byCode).sort((a, b) => b[1].length - a[1].length))
  console.log(`  ${code.padEnd(10)} ${String(list.length).padStart(3)}  e.g. ${list.slice(0, 3).map((h) => h.id + ':' + h.ipa).join('  ')}`);
console.log(`\n${hits.length} cells in ${Object.keys(byCode).length} rows.`);
process.exit(1);
