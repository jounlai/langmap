#!/usr/bin/env node
/*
 * check_all.js — run every deterministic HanMap data guard and report a summary.
 * Exit code 1 if any actionable check is non-zero (CI-friendly).
 * Run: node tools/check_all.js
 */
const cp = require('child_process'), path = require('path');
const run = f => cp.execSync(`node ${path.join(__dirname, f)}`, { encoding: 'utf8' });
// validate_wordmap_data.js lives at the repo root and exits 1 when it has
// errors, so capture its output instead of letting execSync throw.
// WM_VALIDATE_STRICT=1 mirrors CI: it promotes [#19] cache-buster drift from a
// warning to an error. Without it the hook is laxer than the pipeline and lets
// a stale ?v=N through, which is exactly how one shipped.
const runRoot = (f, env) => {
    const opts = { encoding: 'utf8', env: { ...process.env, ...env } };
    try { return cp.execSync(`node ${path.join(__dirname, '..', f)} 2>&1`, opts); }
    catch (e) { return String(e.stdout || '') + String(e.stderr || ''); }
};

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

s = run('affricate_tie_check.js');
line('affricate tie-bar (bare convention)', num(s, /affricate tie-bars: (\d+)/));

// Tone-notation gate for the cuckoo partial word: no superscript-digit tones,
// no Latin acute/grave tones where Chao letters are required, no tie-bars, and
// no tonal-language cell left without a tone. --check scrapes the count.
s = run('cuckoo_ipa_lint.js --check');
line('cuckoo IPA tone notation', num(s, /violations: (\d+)/));

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

s = run('speakers_format_check.js');
line('speaker-count house style', num(s, /non-conforming: (\d+)/));

s = run('font_coverage_check.js');
line('webfont coverage (astral scripts)', num(s, /scripts without a font: (\d+)/));

// NOTE: tools/script_family_check.js (surface writing system vs the rest of the
// corpus) is deliberately NOT wired in yet — it currently reports 6 real
// deviations (cuckoo haj/kry/lzz/ojp/yug, i khb) that need their native-script
// forms researched. Wire it in as a blocking guard once those are fixed.

// Chao tone letters (˥˦˧˨˩) belong in IPA, never in a surface/orthography.
// Ersu was writing them into the headword (sun "ȵo˥ma˥").
s = run('surface_tone_check.js --check');
line('no Chao tone in surface', num(s, /violations: (\d+)/));

// A language that is fully extinct (no living speakers) AND carries a
// meta.period belongs on the historical map, not shown as a modern language.
// Mochica (omc) slipped through as modern despite 0 speakers + a period
// (owner 2026-07-21). Guards the LIVING_FRAGMENTARY_CODES / HIST_DESCENDANT split.
s = run('extinct_classification_check.js');
line('extinct-as-modern classification', num(s, /extinct-as-modern: (\d+)/));

// Cache-version drift: wordmap.html serves data as `?v=WM_ASSET_VERSION[key]`.
// Editing the data without bumping the key ships nothing — browsers keep the
// old copy, and every other guard still passes. A whole day of Chữ Nôm /
// Chinese-script / IPA fixes was invisible this way (owner 2026-07-17).
s = run('asset_version_check.js --check');
line('asset cache-version freshness', num(s, /violations: (\d+)/));

// Generated bundles: wordmap.html loads word_labels.js and lang_names/<ui>.js
// instead of the full per-word and per-UI tables. If a label, definition or
// language name changes, those files must be rebuilt or the site serves the
// old text with no other symptom.
s = run('build_word_labels.js --check');
line('word_labels.js freshness', num(s, /stale: (\d+)/));

// docs/words/LANG_CODES.md is generated from LANG_DATA/LANG_NAMES/meta. It used
// to stamp the run date, so it was permanently dirty and its real diffs went
// uncommitted (owner 2026-07-17). The stamp is gone; this keeps it in sync.
s = cp.execSync(`node ${path.join(__dirname, 'generate_lang_codes_md.mjs')} --check`, { encoding: 'utf8' });
line('LANG_CODES.md freshness', num(s, /stale: (\d+)/));

s = run('build_lang_names.js --check');
line('lang_names/ freshness', num(s, /stale: (\d+)/));

// The full validator. Its warnings are advisory; its ERRORS block the commit.
// This is what catches a bumped WM_ASSET_VERSION whose <script src=?v=N> was
// left behind — a stale-cache bug that CI, not the pre-commit hook, used to
// find. Wiring it in here means the hook finds it first.
s = runRoot('validate_wordmap_data.js', { WM_VALIDATE_STRICT: '1' });
line('wordmap_data validator (errors)', num(s, /^ERRORS \((\d+)\)/m));

console.log(`\n${fail === 0 ? '✓ all guards clean' : '✗ ' + fail + ' guard(s) failing'}`);
process.exit(fail === 0 ? 0 : 1);
