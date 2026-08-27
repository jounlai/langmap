#!/usr/bin/env node
/**
 * family_string_check.js — meta.family is a grouping key, not prose.
 *
 * Two things read it as a key rather than as text:
 *   tree.html      parseFamilyPath() takes everything before "(" as the TOP-LEVEL
 *                  node, so "Indo-European > Italic > Latino-Faliscan" becomes a
 *                  sibling of "Indo-European" instead of a branch inside it.
 *                  16 languages were floating that way (owner 2026-08-27).
 *   my-languages.js familyTop() splits on [>,;(] and counts the distinct results,
 *                  so a reader who speaks two Oto-Manguean languages was told they
 *                  knew two families when the atlas spelled one "Oto-Manguean"
 *                  and the other "Otomanguean".
 *
 * House form: `Stock (sub, sub, …)` — 557 of the 637 distinct strings already.
 * The check is deliberately narrow, because the parenthetical is free text:
 *   1. no ">" or "/" or "?" before the "(" — that is where the key lives
 *   1b. no arrow separator (> \u203a \u2192 \u00bb) ANYWHERE, and no nested "(":
 *       both defeat parseFamilyPath. Six rows did (review 459) — ess, fud and
 *       wrh each became a private root sitting next to the real Eskimo-Aleut,
 *       Austronesian and Pama-Nyungan; wbl, gsw_w and lij_t collapsed a
 *       five-level chain into one label.
 *   2. no two top-level names that differ only in case, spacing or hyphens
 *
 * Usage: node tools/family_string_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8').replace(/^const /gm, 'var '), ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_meta_lite.js'), 'utf8'), ctx);
const LANG_DATA = vm.runInContext('LANG_DATA', ctx);

const topOf = (f) => {
    const m = String(f).match(/^([^()]+?)(?:\s*\(([^)]+)\))?$/);
    return (m ? m[1] : String(f)).trim();
};

const violations = [];
const byTop = new Map();
for (const [code, v] of Object.entries(LANG_DATA)) {
    const f = ((v && v.meta) || {}).family;
    if (!f || typeof f !== 'string') continue;
    const top = topOf(f);
    if (/[>/?\u203a\u2192\u00bb]/.test(top))
        violations.push({ code, msg: `top-level key "${top}" contains an arrow or / or ? — it will become its own family node` });
    // The parenthetical is free text, but an arrow inside it collapses the whole
    // chain into ONE node: gsw_w read "Germanic → West → Upper German →
    // Alemannic → Höchstalemannisch" and landed five levels of tree in a single
    // label instead of joining gsw's Alemannic branch (review 459).
    if (/[\u203a\u2192\u00bb>]/.test(f))
        violations.push({ code, msg: `family "${f}" uses an arrow separator — the house form is "Stock (sub, sub, …)"` });
    // A nested "(" makes parseFamilyPath fail its match entirely and return the
    // whole string as a top-level node: ess sat beside Eskimo-Aleut, not in it.
    if (/\(.*\(/.test(f))
        violations.push({ code, msg: `family "${f}" has nested parentheses — parseFamilyPath cannot read it` });
    const key = top.toLowerCase().replace(/[^a-z]/g, '');
    if (!byTop.has(key)) byTop.set(key, new Map());
    const m = byTop.get(key);
    m.set(top, (m.get(top) || 0) + 1);
}
for (const [, spellings] of byTop) {
    if (spellings.size < 2) continue;
    const list = [...spellings.entries()].map(([s, n]) => `${s} (${n})`).join('  vs  ');
    violations.push({ code: '—', msg: `same family spelled two ways: ${list}` });
}

if (CHECK) {
    console.log(`violations: ${violations.length}`);
    for (const v of violations) console.log(`  ${v.code} ${v.msg}`);
    process.exit(0);
}
console.log('family-string check — meta.family is the family tree\'s grouping key\n');
if (!violations.length) console.log(`clean — ${byTop.size} distinct top-level families, each spelled one way.`);
for (const v of violations) console.log(`  ${String(v.code).padEnd(9)} ${v.msg}`);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
