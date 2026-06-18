#!/usr/bin/env node
/*
 * surface_ipa_check.js — deterministic field-integrity + surface↔IPA tone
 * consistency auditor for HanMap.
 *
 * CHECK A (integrity, all varieties):
 *   - IPA must not contain digits (a Chao-digit tone leaked from the surface).
 *   - SURFACE must not contain Chao tone LETTERS ˥˦˧˨˩ (an IPA fragment leaked
 *     in — e.g. the "nu²¹ /nu˨˩/" corruption rally #68 left and #69 caught).
 *
 * CHECK B (tone agreement, Chao-value varieties only):
 *   For a variety whose SURFACE encodes raw Chao pitch as superscript digits,
 *   the trailing digit run must match the IPA's trailing Chao-letter run
 *   (5↔˥ 4↔˦ 3↔˧ 2↔˨ 1↔˩). Varieties that use tone-CATEGORY numbers instead
 *   (Wugniu/Taihu Wu 1-8, Jyutping 1-6, POJ/Tâi-lô, Hakka, Sino-Korean) are
 *   auto-detected (low digit↔letter agreement) and skipped.
 *
 * Diagnostic only — does not edit data. Run: node tools/surface_ipa_check.js
 */
const fs = require('fs'), vm = require('vm'), path = require('path');

const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'hanmap_data.js'), 'utf8') +
  '\nthis.D=HAN_DATA;this.V=HAN_VARIANTS;this.L=HAN_LIST;this.LA=HAN_LANGS;', ctx);
const D = ctx.D, V = ctx.V, L = ctx.L;

const CHAO = { '5': '˥', '4': '˦', '3': '˧', '2': '˨', '1': '˩' };          // digit → Chao letter
const SUP = { '⁵': '5', '⁴': '4', '³': '3', '²': '2', '¹': '1', '⁰': '0' }; // superscript → ascii
function isDigit(c) { return (c >= 48 && c <= 57) || c === 0xB2 || c === 0xB3 || c === 0xB9 || (c >= 0x2070 && c <= 0x2079) || (c >= 0x2080 && c <= 0x2089); }
function isChao(c) { return c >= 0x2E5 && c <= 0x2E9; }
function hasDigit(s) { if (s == null) return false; for (const ch of String(s)) if (isDigit(ch.codePointAt(0))) return true; return false; }
function hasChao(s) { if (s == null) return false; for (const ch of String(s)) if (isChao(ch.codePointAt(0))) return true; return false; }
// trailing run of superscript-digit tone on the surface → normalized ascii digit string
function surfTone(s) { if (s == null) return null; const cps = [...String(s)]; let t = ''; for (let i = cps.length - 1; i >= 0; i--) { const c = cps[i]; if (SUP[c] !== undefined) t = SUP[c] + t; else if (t) break; } return t || null; }
// trailing run of Chao letters on the IPA
function ipaTone(s) { if (s == null) return null; const cps = [...String(s)]; let t = ''; for (let i = cps.length - 1; i >= 0; i--) { const c = cps[i].codePointAt(0); if (isChao(c)) t = cps[i] + t; else if (t) break; } return t || null; }
function digitsToChao(d) { let r = ''; for (const ch of d) { if (CHAO[ch] === undefined) return null; r += CHAO[ch]; } return r; }

// --- gather all cells (main + variant)
const cells = [];
for (const c of L) {
  for (const l of Object.keys(D[c].surface || {})) cells.push({ char: c, lang: l, scope: 'main', surface: (D[c].surface || {})[l], ipa: (D[c].ipa || {})[l] });
  for (const l of Object.keys(D[c].ipa || {})) if (!(l in (D[c].surface || {}))) cells.push({ char: c, lang: l, scope: 'main', surface: undefined, ipa: (D[c].ipa || {})[l] });
}
for (const c of Object.keys(V)) for (const l of Object.keys(V[c])) (V[c][l] || []).forEach((v, i) => cells.push({ char: c, lang: l, scope: 'variant', label: v.label, surface: v.surface, ipa: v.ipa }));

// --- CHECK A: integrity
const aHits = [];
for (const x of cells) {
  if (hasDigit(x.ipa)) aHits.push({ ...x, kind: 'IPA-contains-digit' });
  if (hasChao(x.surface)) aHits.push({ ...x, kind: 'SURFACE-contains-Chao-letter' });
}

// --- CHECK B: tone agreement on auto-detected Chao-value varieties
// classify each variety by digit↔letter agreement rate
const byLang = {};
for (const x of cells) { if (x.scope !== 'main') continue; (byLang[x.lang] = byLang[x.lang] || []).push(x); }
const bHits = []; const chaoValueLangs = [];
for (const [lang, arr] of Object.entries(byLang)) {
  let comparable = 0, agree = 0;
  for (const x of arr) {
    const st = surfTone(x.surface), it = ipaTone(x.ipa);
    if (!st || !it) continue;
    comparable++;
    if (digitsToChao(st) === it) agree++;
  }
  if (comparable < 8) continue;                 // too few Chao-value cells to classify
  const rate = agree / comparable;
  if (rate < 0.7) continue;                      // category-number system → skip
  chaoValueLangs.push(lang + `(${agree}/${comparable})`);
  for (const x of arr) {
    const st = surfTone(x.surface), it = ipaTone(x.ipa);
    if (!st || !it) continue;
    const want = digitsToChao(st);
    if (want && want !== it) bHits.push({ lang, char: x.char, surface: x.surface, ipa: x.ipa, surfaceTone: st, ipaTone: it, expectedIpaTone: want });
  }
}

// --- CHECK C: phonotactic legality (Sinitic) — a syllabic-consonant or apical
// nucleus must not carry an entering stop coda (e.g. ʂʐ̩ʔ is an impossible Wu
// syllable; caught at #73). Reconstructions / Sino-Xenic excluded.
const SINITIC = l => ['zh', 'yue', 'nan', 'cdo', 'mnp', 'cpx', 'hak', 'czh', 'cnp', 'hsn', 'gan', 'cjy', 'wuu'].includes(l.split('_')[0]);
function illegalSyllable(ip) {
  if (ip == null) return null;
  const b = String(ip).replace(/[˥˦˧˨˩]/g, '');
  if (/[mnŋlrszʐʂʑɕʮʯ]̩[ʔ]/.test(b)) return 'syllabic-consonant + glottal stop';
  if (/[ɿʅʮʯ][ʔ]/.test(b)) return 'apical vowel + glottal stop';
  if (/[mnŋ]̩[p̚t̚k̚]/.test(b)) return 'syllabic nasal + oral stop';
  return null;
}
const cHits = [];
for (const x of cells) {
  if (!SINITIC(x.lang)) continue;
  const r = illegalSyllable(x.ipa);
  if (r) cHits.push({ ...x, kind: r });
}

// --- report
console.log(`Scanned ${cells.length} cells.\n`);
console.log(`CHECK A — field integrity: ${aHits.length} issue(s)`);
for (const h of aHits) console.log(`   ${h.lang} ${h.char}${h.scope === 'variant' ? '[' + h.label + ']' : ''}  ${h.kind}  surface=${JSON.stringify(h.surface)} ipa=${JSON.stringify(h.ipa)}`);
console.log('');
console.log(`CHECK B — surface↔IPA tone agreement (${chaoValueLangs.length} Chao-value varieties): ${bHits.length} mismatch(es)`);
for (const h of bHits) console.log(`   ${h.lang} ${h.char}  surface ${JSON.stringify(h.surface)} (tone ${h.surfaceTone}→${h.expectedIpaTone}) ≠ ipa tone ${h.ipaTone}  [ipa ${JSON.stringify(h.ipa)}]`);
console.log('');
console.log(`CHECK C — phonotactic legality (Sinitic): ${cHits.length} illegal syllable(s)`);
for (const h of cHits) console.log(`   ${h.lang} ${h.char}${h.scope === 'variant' ? '[' + h.label + ']' : ''}  ipa ${JSON.stringify(h.ipa)} — ${h.kind}`);
console.log('');
fs.writeFileSync('/tmp/surface_ipa_issues.json', JSON.stringify({ A: aHits, B: bHits, C: cHits }, null, 1));
console.log(`Chao-value varieties: ${chaoValueLangs.join(', ')}`);
console.log('issues -> /tmp/surface_ipa_issues.json');
