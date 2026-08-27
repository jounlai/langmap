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

// Anyone thanked in a changelog entry must also be in the Contributors list at
// the bottom of changelog.html. Crediting inline and forgetting the roll-up is
// easy to do and invisible until someone notices they were left out.
s = run('contributors_check.js');
line('changelog contributors listed', num(s, /missing: (\d+)/));

s = run('font_coverage_check.js');
line('webfont coverage (astral scripts)', num(s, /scripts without a font: (\d+)/));

// NOTE: tools/script_family_check.js (surface writing system vs the rest of the
// corpus) is deliberately NOT wired in yet — it still reports real deviations
// (cuckoo haj/kry, ear otk/rhg, i kho/khb, tea kaa, orange mn_cn, rain pi_edu)
// whose native-script forms need researching. Wire it in as a blocking guard
// once those are fixed.
//
// Its unanimity rule (`refShare < 1`) is self-silencing: once a code has TWO
// romanized cells it is exempt from the check forever, so the languages
// furthest from their own script are the ones it stops watching. That is how
// akk/egy/sux/hit/pal each accumulated four Latin cells behind a comment
// claiming akk was "100% cuneiform". Tighten the rule before wiring it in.

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

// The sibling of the check above, from the other side: a row whose vitality
// fields contradict each other. Jiamao carried l1:3000 with
// speakerCount.vitality 'extinct' and a note reading "severely endangered" —
// nothing rendered wrong, so nothing flagged it. meta-vs-count disagreements
// are reported but not blocking; review 430 made meta.vitality a deliberate
// override in some rows.
s = run('vitality_consistency_check.js --check');
line('vitality field contradictions', num(s, /vitality contradictions: (\d+)/),
     `${num(s, /informational\): (\d+)/)} meta-vs-count informational`);

// meta.description translation integrity: a missing / empty / untranslated
// (same-as-English) UI-language description, or a run of English left inside a
// translation, ships a broken info panel. Length outliers and source-* notes
// are advisory (not counted here). Origin: review #425 (CODEX description audit).
s = run('description_translation_check.js --check');
line('description translation integrity', num(s, /blocking: (\d+)/));

// Chip fields cut off mid-sentence with the bracket still open. A reader found
// arp's 公用語 reading "…operates a tribal college and" on the SSR page; 92
// rows were in that state, some since import, and nothing flagged them.
s = run('meta_truncation_check.js --check');
line('meta string truncation', num(s, /truncated: (\d+)/));

// Cache-version drift: wordmap.html serves data as `?v=WM_ASSET_VERSION[key]`.
// Editing the data without bumping the key ships nothing — browsers keep the
// old copy, and every other guard still passes. A whole day of Chữ Nôm /
// Chinese-script / IPA fixes was invisible this way (owner 2026-07-17).
s = run('asset_version_check.js --check');
line('asset cache-version freshness', num(s, /violations: (\d+)/));

// The same guard for hanmap.html / namemap.html / tree.html / index.html,
// which write their ?v= numbers as literals instead of through
// WM_ASSET_VERSION and so were not covered at all — hanmap_data.js and
// namemap_*.js both had to be bumped by hand and were forgotten twice
// (reviews 01 and 432). Also catches one asset carrying different ?v= numbers
// on different pages: caching is per-URL, so the lower page serves a stale
// copy. hanmap.html was on wordmap_data.js?v=221 while wordmap.html was on 252.
s = run('page_asset_version_check.js --check');
line('page ?v= cache-buster freshness', num(s, /violations: (\d+)/));

// Trivia article buttons whose target does not exist: a data-char that is not
// one of the 61 characters, a data-code that is not a language row, a data-word
// with no cell. The click silently does nothing, and because every article body
// is duplicated per UI language, one bad attribute is nineteen dead buttons.
// Found by the 2026-08-10 trivia rally: 行 (the map splits it 行:1 / 行:2),
// ja_on and es_eu (no such rows), ine (an ISO family code, not a language).
s = run('trivia_button_check.js --check');
line('trivia button targets exist', num(s, /dead targets: (\d+)/));

// Two writing systems fused inside one word — the signature of a generation or
// hand-edit accident in a language nobody on the project reads. Two sat in the
// tree from the day the articles shipped: the Thai for "topolect" half
// overwritten by Cyrillic, and a Hindi adverb replaced by Korean 놀랍도록.
s = run('script_fusion_check.js --check');
line('no fused-script words', num(s, /fusions: (\d+)/));

// Simplified/traditional consistency per language code. Was scoped to the two
// words it was written for (sushi, computer) and so missed six traditional-
// script cuckoo cells in mainland rows (review 432). --all checks every word
// against a per-code majority baseline.
s = run('zh_script_convention.js --all');
line('zh simplified/traditional convention', num(s, /mismatches: (\d+)/));

// Generated bundles: wordmap.html loads word_labels.js and lang_names/<ui>.js
// instead of the full per-word and per-UI tables. If a label, definition or
// language name changes, those files must be rebuilt or the site serves the
// old text with no other symptom.
s = run('build_word_labels.js --check');
line('word_labels.js freshness', num(s, /stale: (\d+)/));

// The three indexed static pages carry a plain-HTML list of every trivia
// article, because a crawler cannot open the JS modal and reach the SSR pages
// any other way. Adding an article without rebuilding leaves it undiscoverable.
s = run('build_trivia_index_links.js --check');
line('trivia index links freshness', num(s, /stale: (\d+)/));

// docs/words/LANG_CODES.md is generated from LANG_DATA/LANG_NAMES/meta. It used
// to stamp the run date, so it was permanently dirty and its real diffs went
// uncommitted (owner 2026-07-17). The stamp is gone; this keeps it in sync.
s = cp.execSync(`node ${path.join(__dirname, 'generate_lang_codes_md.mjs')} --check`, { encoding: 'utf8' });
line('LANG_CODES.md freshness', num(s, /stale: (\d+)/));

s = run('build_lang_names.js --check');
line('lang_names/ freshness', num(s, /stale: (\d+)/));

// lang_words/<code>.js is the per-language transpose of words/*.js, and it is
// what the language modal reads instead of downloading the whole corpus. Edit a
// cell without rebuilding and the map shows the new value while the modal shows
// the old one, with nothing else to give it away.
s = run('build_lang_words.js --check');
line('lang_words/ freshness', num(s, /stale: (\d+)/));

// namemap_i18n/<ui>.js is the per-UI split of namemap_content_i18n.js, which
// namemap.html no longer loads. Edit a country name or a background paragraph
// in the source without rebuilding and the page keeps showing the old text.
s = run('build_namemap_i18n.js --check');
line('namemap_i18n/ freshness', num(s, /stale: (\d+)/));

// A language with no LANG_NAMES entry falls back to English with no warning,
// so a Korean or Thai page can show half its comparison table in English and
// look fine from the Japanese one. Fifteen Han Map varieties shipped that way.
s = run('lang_name_coverage.js --check');
line('language-name coverage', num(s, /violations: (\d+)/));

// data/*_seo.json is what index.php serves for /{ui}/wordmap/{code} at request
// time. Nothing in the browser reads it, so a forgotten export is invisible
// locally — localhost shows the new data while langmap.heuron.com serves the
// old. Adding this is what a session that shipped 11 new concepts to the map
// and none of them to the site cost (owner 2026-08-26).
s = run('export_seo_data.js --check');
line('data/*_seo.json freshness', num(s, /stale: (\d+)/));

// The full validator. Its warnings are advisory; its ERRORS block the commit.
// This is what catches a bumped WM_ASSET_VERSION whose <script src=?v=N> was
// left behind — a stale-cache bug that CI, not the pre-commit hook, used to
// find. Wiring it in here means the hook finds it first.
s = runRoot('validate_wordmap_data.js', { WM_VALIDATE_STRICT: '1' });
line('wordmap_data validator (errors)', num(s, /^ERRORS \((\d+)\)/m));

console.log(`\n${fail === 0 ? '✓ all guards clean' : '✗ ' + fail + ' guard(s) failing'}`);
process.exit(fail === 0 ? 0 : 1);
