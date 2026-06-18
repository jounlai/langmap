#!/usr/bin/env node
/*
 * check_all.js — run every deterministic HanMap data guard and report a summary.
 * Exit code 1 if any actionable check is non-zero (CI-friendly).
 * Run: node tools/check_all.js
 */
const cp = require('child_process'), path = require('path');
const run = f => cp.execSync(`node ${path.join(__dirname, f)}`, { encoding: 'utf8' });

const num = (s, re) => { const m = s.match(re); return m ? parseInt(m[1], 10) : NaN; };
let fail = 0;
const line = (name, n, note) => { const ok = n === 0; if (!ok) fail++; console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(34)} ${n}${note ? '  (' + note + ')' : ''}`); };

console.log('LangMap project — deterministic data guards (HanMap + LangMap + WordMap)\n');

let s = run('tone_category_check.js');
line('tone-category consistency', num(s, /candidates: (\d+)/));

s = run('surface_ipa_check.js');
line('field integrity (no leaks)', num(s, /CHECK A[^\n]*?: (\d+)/));
line('surface↔IPA tone agreement', num(s, /CHECK B[^\n]*?: (\d+)/));
line('phonotactic legality', num(s, /CHECK C[^\n]*?: (\d+)/));

s = run('variant_integrity_check.js');
// actionable = COLLISION + DUP_LABEL + EMPTY_PROMOTE + EMPTY_MERGE (LONE_REDUNDANT/EMPTY_LABEL are informational)
const act = ['COLLISION', 'DUP_LABEL', 'EMPTY_PROMOTE', 'EMPTY_MERGE'].reduce((a, k) => a + (num(s, new RegExp(k + ': (\\d+)')) || 0), 0);
const info = (num(s, /LONE_REDUNDANT: (\d+)/) || 0) + (num(s, /EMPTY_LABEL: (\d+)/) || 0);
line('variant structural integrity', act, `${info} informational`);

s = run('native_script_check.js');
line('native script block', num(s, /CHECK A[^\n]*?: (\d+)/));
line('kana↔romaji skeleton', num(s, /CHECK B[^\n]*?: (\d+)/));

s = run('langmap_role_check.js');
line('LangMap role integrity', num(s, /actionable: (\d+)/), `${num(s, /UNUSED_ROLE[^\n]*?: (\d+)/)} informational`);

s = run('wordmap_check.js');
line('WordMap integrity', num(s, /actionable: (\d+)/));

console.log(`\n${fail === 0 ? '✓ all guards clean' : '✗ ' + fail + ' guard(s) failing'}`);
process.exit(fail === 0 ? 0 : 1);
