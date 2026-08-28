#!/usr/bin/env node
/**
 * source_link_check.js — a citation must point at the language it is cited for.
 *
 * meta.sources is where the atlas shows its work, and nothing checked it. The
 * shape was sound — 2,249 entries, every one an object with a title — but the
 * links were not (review 467).
 *
 * Three rows cited a Glottolog page for a DIFFERENT language, and all three
 * failed the same way: a glottocode is the first four letters of a name plus
 * digits, so two languages that start alike collide and a guessed code lands on
 * the wrong one. Each was confirmed at glottolog.org before being changed:
 *
 *   ohu Old Hungarian   cited oldh1241 = Old High German   -> oldh1242
 *   olo Livvi-Karelian  cited livv1244 = Liv (Livonian)    -> livv1243
 *   xqa Karakhanid      cited kara1467 = Kara-Kalpak       -> qara1244
 *
 * The tell was in the titles: the wrong rows carried the bare code as their
 * title ("Glottolog: kara1467") rather than a language name.
 *
 * Two patterns are NOT violations and are exempted by rule, not by list:
 *
 *   MACROLANGUAGE  ms/fa/sw/mg/yi carry the macrolanguage in iso6393 (msa,
 *                  fas, swa, mlg, yid) while the Ethnologue link points at the
 *                  individual language Ethnologue actually documents (zsm,
 *                  pes, swh, plt, ydd). Uniform across all five.
 *   HISTORICAL     a row with meta.period links to the modern language:
 *                  ja_heian, ja_chu and ja_edo are iso6393 'ojp' and link to
 *                  jpn, because ISO has no code for Middle or Early Modern
 *                  Japanese. Applied consistently across all three.
 *
 * 301 rows have meta but no sources at all. That is reported as debt rather
 * than failure — it is a gap to fill, not a regression to block on.
 *
 * Usage: node tools/source_link_check.js [--check]
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

// iso6393 holds the macrolanguage; Ethnologue documents the member.
const MACRO = { msa: 'zsm', fas: 'pes', swa: 'swh', mlg: 'plt', yid: 'ydd' };

const violations = [];
let entries = 0, sourceless = 0;
const glottoBy = new Map();

for (const code of Object.keys(LANG_DATA)) {
  const m = LANG_DATA[code].meta;
  if (!m) continue;
  const s = m.sources;
  if (!Array.isArray(s) || !s.length) { sourceless++; continue; }
  for (const e of s) {
    entries++;
    if (typeof e !== 'object' || e === null) { violations.push(`${code} source entry is not an object: ${JSON.stringify(e).slice(0, 50)}`); continue; }
    if (!e.title || !String(e.title).trim()) violations.push(`${code} source entry has no title: ${JSON.stringify(e).slice(0, 60)}`);
    if (!e.url) continue;
    if (!/^https?:\/\/[^\s"'<>]+$/.test(e.url)) { violations.push(`${code} malformed source url: ${JSON.stringify(e.url)}`); continue; }

    const eth = e.url.match(/ethnologue\.com\/language\/([a-z]{3})/i);
    if (eth && m.iso6393) {
      const iso = String(m.iso6393).toLowerCase(), id = eth[1].toLowerCase();
      const macroOk = MACRO[iso] === id;
      const historicalOk = Boolean(m.period);
      if (iso !== id && !macroOk && !historicalOk)
        violations.push(`${code} Ethnologue link is /${id}/ but meta.iso6393 is ${iso}`);
    }
    const glo = e.url.match(/glottolog\.org\/resource\/languoid\/id\/([a-z0-9]{8})/i);
    if (glo) {
      const id = glo[1].toLowerCase();
      if (!glottoBy.has(id)) glottoBy.set(id, []);
      glottoBy.get(id).push({ code, iso: m.iso6393 ? String(m.iso6393).toLowerCase() : null });
    }
  }
}

// One Glottolog languoid cited by two rows with DIFFERENT ISO codes means one
// of them is pointing at the other's language. Dialect rows of one language
// share an iso6393 and are fine.
for (const [id, rows] of glottoBy) {
  const isos = new Set(rows.map((r) => r.iso).filter(Boolean));
  if (isos.size > 1)
    violations.push(`glottocode ${id} is cited by rows with different iso6393: ` +
      rows.map((r) => r.code + '(' + (r.iso || '?') + ')').join(' '));
}

if (CHECK) {
  console.log(`violations: ${violations.length}`);
  for (const v of violations) console.log('  ' + v);
  console.log(`  debt: ${sourceless} row(s) have meta but no sources at all`);
  process.exit(0);
}
console.log('source link check — a citation must point at the language it is cited for\n');
console.log(`  ${entries} source entries checked\n  ${sourceless} rows with meta but no sources (debt)\n`);
if (!violations.length) console.log('clean — every catalogue link matches its row.');
for (const v of violations) console.log('  ' + v);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
