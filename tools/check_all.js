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

s = run('korean_hist_font_check.js');
line('Old Hangul font coverage', num(s, /problems: (\d+)/));

// The SSR trivia pages inline these; a new "pan to here" control with no
// pre-rendered map silently falls back to a bare link.
s = run('build_seo_minimaps.js --check');
line('trivia locator maps fresh', num(s, /stale: (\d+)/));

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

// A declared Han Map lect must not be a copy of its group's parent row. Every
// genuinely researched sub-dialect sits 0–69% identical to its parent; six rows
// sit at 95–100% because they were declared but never separately sourced. Those
// six are listed as debt inside the tool (green, but visible); a SEVENTH copy
// appearing is a violation.
// Tone is written with Chao letters, never digits — the digits belong to a
// romanization, which is what the surface field is for. cjy_xz and atb each
// wrote BOTH inside one row (bird niau˥˧ vs cat miau⁵³), 40 cells (review 458).
// /sitemap-seo.xml was at 94.9% of the 50MB limit (review 460) — over it, search
// engines reject the WHOLE file rather than the excess, so every SSR page loses
// its entry at once. 2026-09-04 it became a sitemap index over 250-page parts,
// so growth adds parts instead of bytes; the guard now checks every part, and
// that the index lists exactly the parts that exist.
// Eager first-paint weight per page, ratcheted. hanmap.html was 1,988 KB gz,
// 943 KB of it hanmap_trivia.js in front of the map — 2026-09-04 that file is
// injected on demand the way wordmap.html has always done it, and the page is
// 1,052 KB. The lock came down with it; the guard stops it growing back.
// The CARTO free tier is granted in exchange for keeping the CARTO AND
// OpenStreetMap credit visible. The default `flat` layer on both map pages
// credited only CARTO (owner 2026-08-27).
// The pin is the most visible claim the atlas makes and nothing checked it.
// Real point-in-polygon against countries.geojson; four rows stood in a country
// their own meta.description named but meta.countries omitted (review 466).
// meta.sources is where the atlas shows its work. Three rows cited a Glottolog
// page for a different language — glottocodes collide on the first four letters
// of a name, so a guessed code lands on a neighbour (review 467).
// meta.script is shown to the reader and read by nothing else, so a wrong value
// is invisible to every other guard. Four Chinese dialect rows declared "Latin"
// while writing Han (review 468); review 432 had fixed four siblings already.
// Nine languages exist twice under different codes because the three maps grew
// separate conventions for reconstructed languages; 35 of their names had
// diverged, so one language read two ways depending on the map (review 469).
// codeType / languageKind / dataStatus / varietyRole / period describe one
// language from different angles; a row can satisfy each separately while
// contradicting itself. These held by discipline until now (review 470).
s = run('meta_invariant_check.js --check');
line('meta fields agree', num(s, /violations: (\d+)/));

s = run('paired_code_name_check.js --check');
line('paired codes name alike', num(s, /violations: (\d+)/),
    (s.match(/note: (\d+) pair/) || [])[1] ? ((s.match(/note: (\d+) pair/))[1] + ' ISO aliases') : '');

s = run('script_declaration_check.js --check');
line('script declared matches data', num(s, /violations: (\d+)/),
    (s.match(/debt: (\d+)/) || [])[1] ? ((s.match(/debt: (\d+)/))[1] + ' overstated') : '');

s = run('source_link_check.js --check');
line('citations point at the row', num(s, /violations: (\d+)/),
    (s.match(/debt: (\d+)/) || [])[1] ? ((s.match(/debt: (\d+)/))[1] + ' rows with no sources') : '');

s = run('coord_country_check.js --check');
line('pin inside a declared country', num(s, /violations: (\d+)/),
    (s.match(/boundary: (\d+)/) || [])[1] ? ((s.match(/boundary: (\d+)/))[1] + ' basemap boundary') : '');

s = run('map_attribution_check.js --check');
line('map attribution complete', num(s, /violations: (\d+)/));

s = run('page_weight_check.js --check');
line('page weight ratchet', num(s, /violations: (\d+)/),
    (s.match(/heaviest: ([^\n]+)/) || [])[1] || '');

// Every root .html is a public URL. It must be in sitemap.xml or say noindex —
// _buildertest.html and _cardtest.html were neither, and each pulls
// wordmap_meta.js (7 MB gz) to render a test canvas (review 464).
s = run('page_indexability_check.js --check');
line('root pages indexable or noindex', num(s, /violations: (\d+)/));

// A screen-reader user navigates by headings. tree.html and poster.html had
// none at all — not one h1..h6 — and wordmap/hanmap jumped h1 to h3 (review
// 461). The h1 on the map pages is visually hidden on purpose: a full-bleed map
// has nowhere to print a title, and a hidden h1 is a normal way to name a page.
s = run('heading_order_check.js --check');
line('page headings', num(s, /heading problems: (\d+)/));

s = run('sitemap_size_check.js --check');
line('sitemap within limits', num(s, /violations: (\d+)/),
    (s.split('\n').find((l) => / parts, /.test(l)) || '').trim());

// Chao letters spell a contour; the same level three times is a half-finished
// edit. bca wrote ˨˨˨ on all nine of its entering-tone cells (review 463).
// A tone digit on the surface and the Chao value in the IPA are two statements
// about one tone, so a row defines its own digit→value map. bca 七 broke its
// row's map and 44 other guards had passed it (review 465).
s = run('tone_digit_map_check.js --check');
line('tone-digit map per row', num(s, /violations: (\d+)/),
    (s.match(/debt: (\d+)/) || [])[1] ? ((s.match(/debt: (\d+)/))[1] + ' unsettled') : '');

s = run('chao_repeat_check.js --check');
line('no repeated Chao level', num(s, /violations: (\d+)/));

s = run('ipa_digit_check.js --check');
line('no digit tone in IPA', num(s, /violations: (\d+)/));

s = run('hanmap_dup_row_check.js --check');
line('no copied Han Map row', num(s, /violations: (\d+)/),
    (s.match(/debt: (\d+)/) || [])[1] ? (s.match(/debt: (\d+)/)[1] + ' known undifferentiated') : '');

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
// 67 rows were rewritten in en/ja/ko/zh and left at their older, much shorter
// text in the other 19 UI languages — a German reader looking up German gets two
// lines where an English reader gets a full profile. The length check above
// cannot see it: it compares each language against the median of the entry's
// others, and when 19 of 23 are short the median is short. Ratcheted.
const DESC_DRIFT_DEBT = 972;
s = run('description_content_drift.js --check');
{
    const n = num(s, /drifted descriptions: (\d+)/);
    line('descriptions say the same thing', n > DESC_DRIFT_DEBT ? n - DESC_DRIFT_DEBT : 0,
        n + ' drifted, budget ' + DESC_DRIFT_DEBT);
}

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

// The guard above reads word CELLS. It never looked at article prose, and 30 of
// 30 HanMap trivia articles turned out to carry traditional zh — 18 of them end
// to end — while every WordMap article and all the UI chrome is simplified.
// Cited forms (the 體→体 pair, the 開元通寶 coin legend, kokuji, data-char
// button targets) are exempted by name inside the checker.
s = run('trivia_zh_script_check.js --check');
line('trivia zh is simplified', num(s, /traditional zh characters: (\d+)/));

// Three articles in a row were translated from an English draft that was later
// edited, leaving the translations asserting things the article no longer says
// — 97 million speakers, "communist propaganda", "1,500 years in the character
// 生". Nobody reads all nineteen languages, so prose drift needs a checker;
// this catches its sharpest edge, a FIGURE that appears in a translation and
// nowhere in its English.
s = run('trivia_translation_drift.js --check');
line('translations add no figures', num(s, /unexplained figures: (\d+)/));

// Controls are being lost in translation. Nine HanMap articles had buttons ONLY
// in English; go-on-kan-on-to-on has nine and thirteen languages had three. The
// older "trivia button targets exist" guard checks that a button points at
// something real, never that the button is there at all. All 608 are restored;
// this holds every language at parity with its English.
s = run('trivia_control_parity.js --check');
line('trivia controls in translations', num(s, /missing controls: (\d+)/));

// Sections, same story as the controls: a translation with fewer <h3> than its
// English is that article with sections MISSING, not a shorter rendering of it.
// ko-mid-eastguk-jeongun's Vietnamese had one heading against four. The five
// languages of the backfill (ja/ko/zh/yue/vi) are at parity; the other thirteen
// are still summaries in many articles, and that debt is a ratchet — it may
// come down, never up.
const SECTION_DEBT = 509;
s = run('trivia_section_parity.js --check');
{
    const n = num(s, /missing sections: (\d+)/);
    line('trivia sections in translations', n > SECTION_DEBT ? n - SECTION_DEBT : 0,
        n + ' missing, budget ' + SECTION_DEBT + ' (ja/ko/zh/yue/vi at parity)');
}

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

// The partial words are range maps. A route-coloured cell may not sit in a
// language that died before the route existed — Ge'ez ብርቱካን is built on
// "Portugal" in a row whose period ends in the 10th century.
s = run('route_era_check.js --check');
line('route vs language era', num(s, /violations: (\d+)/));

// wordmap_meta_lite.js + meta_desc/ (11 MB) + meta_i18n/ (5.8 MB) are the
// largest generated set here and nothing guarded them: editing wordmap_meta.js
// without rerunning left the site serving the old metadata, and the only thing
// that noticed was the content-hash version lock, which gets --updated routinely.
s = run('build_meta_split.js --check');
line('meta split freshness', num(s, /stale: (\d+)/));

// In IPA j is the palatal glide and y is a vowel. Ten rows spelled the glide
// both ways, from sources that use the Americanist y.
s = run('glide_notation_check.js --check');
line('glide notation (j vs y)', num(s, /violations: (\d+)/));

// meta.family is the family tree's grouping key: tree.html takes everything
// before "(" as the top-level node and my-languages.js counts the distinct
// values. A ">" chain or a second spelling forks the family.
s = run('family_string_check.js --check');
line('family grouping key', num(s, /violations: (\d+)/));

// Four pages hand the per-UI shim its cache version through a function call,
// which page_asset_version_check.js cannot see — that is how wordmap.html came
// to ask for en.js?v=151 and every other UI at ?v=143.
s = run('slice_version_check.js --check');
line('slice-loader versions', num(s, /violations: (\d+)/));

// ˈ on a monosyllable marks a contrast that is not there. Half the stress
// policy is checkable; the other half — whether a polysyllable SHOULD carry it
// — depends on the language and stays a judgement call.
s = run('stress_mark_check.js --check');
line('stress mark on monosyllables', num(s, /violations: (\d+)/));

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
// One 調類, one contour, within one row. Written 2026-08-29 after two real
// errors turned up that nothing else could see: nan wrote 紅 as ˧˥ where its own
// 魚 名 鹽 all said ˨˦, and fifteen `orange` cells carried Beijing's 陽平 ˧˥ into
// rows whose 陽平 is something else entirely. Both fixed; the rest of what it
// found is carried as debt inside the tool so new drift still fails.
// A route-coloured word must route every language it has a word for. Written
// 2026-08-29 after the same mistake twice in an afternoon: 76 tea rows and 77
// n99 rows added with cells and no `family` entry, which does not error — the
// language just stops being drawn in a colour. Found two more the moment it ran.
// A form that exactly equals another cell in the same row is the signature of a
// gloss slip in a source. Ratcheted 2026-08-29: 245 existing pairs are almost
// all real polysemy (Korean 눈 eye/snow, Old English hund dog/hundred) and are
// frozen in the lock; only NEW ones fail. This is the guard for the comparative-
// dataset harvests — ASJP's "ear" for Wichí and Kera was each row's own "tooth",
// and its "ear" for four Tibetic rows was their own "nose".
s = run('intra_row_dup_check.js --check');
line('no new intra-row duplicate', num(s, /violations: (\d+)/), num(s, /stale: (\d+)/) ? `${num(s, /stale: (\d+)/)} lock entries stale` : '');

s = run('route_coverage_check.js --check');
line('route colouring complete', num(s, /violations: (\d+)/));

// A tonal row must not drop its Chao letters. 145 single-character cells had
// none — 五 in half the Min rows, 雪 across a dozen, 鳥 and 风 the same — which
// no other guard could see, because a missing tone is not a wrong tone. 79 were
// restored from each row's own cells of the same 調類; the rest are frozen.
s = run('sinitic_tone_present_check.js --check');
line('Sinitic tone letters present', num(s, /violations: (\d+)/), num(s, /stale: (\d+)/) ? `${num(s, /stale: (\d+)/)} lock entries stale` : '');

// A contour a Sinitic row uses exactly once is usually a neighbour's value
// copied in. Found from a reader report (齒 khí): fixing that one cell exposed
// ten more in `nan` alone, carrying Mandarin's ˧˥ and ˥˩ or Xiamen's ˨˨ and ˦˦
// while nan_xm — the same language — had the right value. The class check above
// cannot see them: it reads single-character surfaces and skips 上/去 by design.
// Ratcheted; 126 remain across the other rows.
// The lexical counterpart: a row that agrees with Mandarin where two or more of
// its own siblings do not. Caught 爸爸/媽媽 in `nan` against nan_xm's 老爸/老母.
// Traditional/simplified is normalised away first or half the report is the
// script convention behaving correctly. It cannot decide which side is wrong —
// `nan` you 你 against six siblings' 汝 is on the list and is CORRECT — so this
// is a shortlist, ratcheted.
const LEXICAL_IMPORT_DEBT = 7;
s = run('sinitic_lexical_import_check.js --check');
{
    const n = num(s, /mandarin-shaped cells: (\d+)/);
    line('Sinitic cells shaped like Mandarin', n > LEXICAL_IMPORT_DEBT ? n - LEXICAL_IMPORT_DEBT : 0,
        n + ' to review, budget ' + LEXICAL_IMPORT_DEBT);
}

const TONE_OUTLIER_DEBT = 126;
s = run('sinitic_tone_outlier_check.js --check');
{
    const n = num(s, /tone outliers: (\d+)/);
    line('Sinitic tone outliers', n > TONE_OUTLIER_DEBT ? n - TONE_OUTLIER_DEBT : 0,
        n + ' outliers, budget ' + TONE_OUTLIER_DEBT);
}

s = run('sinitic_tone_class_check.js --check');
line('Sinitic tone class per row', num(s, /violations: (\d+)/), num(s, /stale: (\d+)/) ? `${num(s, /stale: (\d+)/)} stale debt entries` : '');

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
