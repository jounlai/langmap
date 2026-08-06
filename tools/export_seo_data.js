#!/usr/bin/env node
/**
 * export_seo_data.js — emit canonical JSON for the SSR SEO "big-text" pages.
 *
 * The Word Map / Han Map data lives in JS files that declare browser globals
 * (LANG_DATA, WORDS, HAN_DATA, ...). PHP cannot safely parse those object
 * literals (comments, new Set(), unquoted keys, trailing commas), so this
 * step loads the *real* JS in a Node `vm` context — exactly the way the
 * browser does — and serialises the canonical shape PHP reads.
 *
 * The JS files remain the single source of truth. Re-run this whenever the
 * underlying data changes:
 *
 *     node tools/export_seo_data.js
 *
 * Outputs:
 *     data/wordmap_seo.json
 *     data/hanmap_seo.json
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'data');

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

// UI languages we keep multilingual text for (description / labels / names).
// Mirrors WM_UI_LABELS in wordmap_data.js plus 'en'.
const UI_LANGS = ['en', 'ja', 'ko', 'zh', 'yue', 'vi', 'th', 'id', 'hi', 'de',
  'fr', 'it', 'es', 'pt', 'ru', 'uk', 'ar', 'he', 'sw'];

function pickLangs(obj) {
  if (!obj || typeof obj !== 'object') return {};
  const out = {};
  for (const k of UI_LANGS) if (obj[k] != null) out[k] = obj[k];
  return out;
}

// ---------------------------------------------------------------------------
// WM_UI_LABELS — uiCode -> endonym (日本語, 한국어, …). Used by the PHP SEO
// pages for the language-picker option labels and the switch popup wording.
// ---------------------------------------------------------------------------
function loadUiLangNames() {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext('var window=this;\n' + read('wordmap_data.js') +
    '\nthis.__UIN = (typeof WM_UI_LABELS!=="undefined") ? WM_UI_LABELS : ' +
    '(window.WM_UI_LABELS||{});', ctx);
  const src = ctx.__UIN || {};
  const out = {};
  for (const k of UI_LANGS) if (src[k] != null) out[k] = src[k];
  return out;
}

// ---------------------------------------------------------------------------
// Load LANG_NAMES (translated language display names) — shared by both maps.
// ---------------------------------------------------------------------------
function loadLangNames() {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext('var window=this;\n' + read('lang_names.js') +
    '\nthis.__LN = (typeof LANG_NAMES!=="undefined") ? LANG_NAMES : window.LANG_NAMES;', ctx);
  return ctx.__LN || {};
}

// Build a per-code name map: { code: { en, ja, ... } } from LANG_NAMES[ui][code].
function buildNameIndex(LN) {
  const idx = {};
  for (const ui of Object.keys(LN)) {
    if (!UI_LANGS.includes(ui)) continue;
    for (const [code, name] of Object.entries(LN[ui] || {})) {
      (idx[code] || (idx[code] = {}))[ui] = name;
    }
  }
  return idx;
}

// ---------------------------------------------------------------------------
// Word order (sentences) — data.js declares `const SENTENCES = [...]`.
// For each lang code we emit its available sentences as
//   { id, title, segs: [[role, text, color], ...] }
// resolving each segment's color from the sentence's `segments[role].color`.
// Keyed by lang code in a top-level `wordorder` map (added to BOTH JSONs).
// ---------------------------------------------------------------------------
function loadSentences() {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext('var window=this;\n' + read('data.js') +
    '\nthis.__S = (typeof SENTENCES!=="undefined") ? SENTENCES : (window.SENTENCES||[]);', ctx);
  return ctx.__S || [];
}

function buildWordOrder() {
  const SENTENCES = loadSentences();
  const out = {}; // code -> [ { id, title, segs:[[role,text,color],…] } ]
  for (const s of SENTENCES) {
    const segMap = s.segments || {};
    const langs = s.langs || {};
    for (const code of Object.keys(langs)) {
      const pairs = langs[code];
      if (!Array.isArray(pairs) || !pairs.length) continue;
      const segs = [];
      for (const p of pairs) {
        if (!Array.isArray(p)) continue;
        const role = p[0] != null ? String(p[0]) : '';
        const text = p[1] != null ? String(p[1]) : '';
        if (text === '') continue;
        // A segment may carry a compound role like "A|E" (it fills two slots).
        // segMap is keyed by single role letters, so resolve the colour from the
        // first sub-role that has one — matching the main app's split('|') logic.
        let color = (segMap[role] && segMap[role].color) || '';
        if (color === '' && role.indexOf('|') !== -1) {
          for (const r of role.split('|')) {
            if (segMap[r] && segMap[r].color) { color = segMap[r].color; break; }
          }
        }
        segs.push([role, text, color]);
      }
      if (!segs.length) continue;
      (out[code] || (out[code] = [])).push({
        id: s.id,
        title: s.title || '',
        segs,
      });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Word Map
// ---------------------------------------------------------------------------
function loadWordMap() {
  let src = 'var window=this;var WORDS={};\n';
  src += read('wordmap_data.js') + '\n';
  src += read('word_manifest.js') + '\n';
  // Per-word files mutate WORDS.<id>; load in WORD_ORDER for determinism.
  // (Order does not matter for correctness here, but keep it explicit.)
  const wordFiles = fs.readdirSync(path.join(ROOT, 'words'))
    .filter((f) => f.endsWith('.js')).sort();
  for (const f of wordFiles) src += read(path.join('words', f)) + '\n';
  // wordmap_meta.js sets LANG_DATA[code].meta — must load AFTER LANG_DATA.
  src += read('wordmap_meta.js') + '\n';
  src += 'this.__LANG_DATA = LANG_DATA;\n';
  src += 'this.__WORDS = WORDS;\n';
  src += 'this.__WORD_ORDER = (typeof WORD_ORDER!=="undefined") ? WORD_ORDER : [];\n';
  src += 'this.__EXCLUDED = (typeof EXCLUDED_CODES!=="undefined") ? Array.from(EXCLUDED_CODES) : [];\n';

  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return {
    LANG_DATA: ctx.__LANG_DATA,
    WORDS: ctx.__WORDS,
    WORD_ORDER: ctx.__WORD_ORDER,
    EXCLUDED: new Set(ctx.__EXCLUDED),
  };
}

function buildWordMapJSON(nameIndex) {
  const { LANG_DATA, WORDS, WORD_ORDER, EXCLUDED } = loadWordMap();

  // Concept metadata (id -> { label{}, definition{} }) in display order.
  const words = WORD_ORDER.map((id) => {
    const w = WORDS[id] || {};
    return { id, label: pickLangs(w.label), definition: pickLangs(w.definition) };
  });

  const langs = {};
  for (const [code, ld] of Object.entries(LANG_DATA)) {
    if (!ld || typeof ld !== 'object') continue;
    // Word Map entries live in WORDS[id].data[code]; LANG_DATA[code].words is
    // populated only in the browser by _mergeWordsIntoLangData(). Rebuild it
    // here from the per-word files so the export is self-contained.
    const entries = {};
    for (const id of WORD_ORDER) {
      const w = WORDS[id];
      const e = w && w.data && w.data[code];
      if (!e) continue;
      let surface = '', ipa = '';
      if (Array.isArray(e)) { surface = e[0] || ''; ipa = e[1] || ''; }
      else { surface = e.form || ''; ipa = e.ipa || ''; }
      if (surface || ipa) entries[id] = [surface, ipa];
    }

    const meta = ld.meta || {};
    langs[code] = {
      code,
      name: ld.name || code,
      native: ld.native || '',
      lat: typeof ld.lat === 'number' ? ld.lat : null,
      lng: typeof ld.lng === 'number' ? ld.lng : null,
      names: nameIndex[code] || {},
      excluded: EXCLUDED.has(code),
      words: entries,
      meta: {
        family: meta.family || '',
        speakers: meta.speakers || '',
        countries: meta.countries || '',
        official: meta.official || '',
        script: meta.script || '',
        region: meta.region || '',
        iso6393: meta.iso6393 || '',
        glottocode: meta.glottocode || '',
        vitality: meta.vitality || '',
        aliases: Array.isArray(meta.aliases)
          ? meta.aliases.filter((a) => a != null && a !== '').map(String)
          : (meta.aliases ? [String(meta.aliases)] : []),
        description: pickLangs(meta.description),
        sources: Array.isArray(meta.sources)
          ? meta.sources.map((s) => ({
              title: s.title || '', url: s.url || '', type: s.type || '',
            }))
          : [],
      },
    };
  }

  return {
    generated: new Date().toISOString(),
    site: 'https://langmap.heuron.com',
    words,
    langs,
  };
}

// ---------------------------------------------------------------------------
// Han Map
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Metadata i18n for the SSR pages
//
// The interactive map translates family / speakers / countries / official /
// script through translateMetaSmart() (meta_i18n_ext.js + the three coverage
// layers) at render time. The SSR pages had no equivalent, so /ja/wordmap/arp
// showed "Algonquian", "Latin", "USA (Wyoming, Oklahoma)" in English while the
// chip labels beside them were Japanese (reader report, 2026-08-06).
//
// Running the same translator here and shipping a shared phrase table keeps
// one source of truth. The table is keyed by the English string rather than by
// language code because these strings repeat heavily across rows — ~3,300
// distinct values for 1,135 languages — so a per-row copy would be several
// times larger. Entries identical to English are omitted.
//
// It goes in its own file, not into wordmap_seo.json, because only the
// language-detail page needs it and that blob is already ~23 MB.
// ---------------------------------------------------------------------------
const META_I18N_FIELDS = ['family', 'speakers', 'countries', 'official', 'script', 'region'];

function buildMetaI18n(LANG_DATA, hanLangs) {
  let src = 'var window=this;\n';
  // wordmap_meta.js declares META_I18N, the exact-match table the coverage
  // batches augment and translateMetaSmart consults BEFORE composing atoms.
  // Without it those batches hit their `if (typeof META_I18N === 'undefined')
  // return;` guard and silently do nothing, so whole-clause translations were
  // present in the browser and missing from the SSR pages.
  src += read('wordmap_meta.js') + '\n';
  src += read('meta_i18n_ext.js') + '\n';
  src += read('meta_i18n_coverage.js') + '\n';
  src += read('meta_i18n_coverage2.js') + '\n';
  src += read('meta_i18n_coverage3.js') + '\n';
  src += 'this.__T = translateMetaSmart;\n';
  const ctx = { LANG_DATA };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  const translate = ctx.__T;

  const values = new Set();
  for (const ld of Object.values(LANG_DATA)) {
    const m = (ld && ld.meta) || {};
    for (const f of META_I18N_FIELDS) if (m[f]) values.add(String(m[f]));
  }
  // Han Map chips read HAN_LANG_META (family / speakers / region), which is a
  // separate table from LANG_DATA.meta — its region strings in particular
  // appear nowhere in the Word Map corpus.
  for (const l of Object.values(hanLangs || {})) {
    for (const f of ['family', 'speakers', 'region']) if (l[f]) values.add(String(l[f]));
  }

  const fields = {};
  let translated = 0;
  for (const en of values) {
    const row = {};
    for (const ui of UI_LANGS) {
      if (ui === 'en') continue;
      const t = translate(en, ui);
      if (t && t !== en) row[ui] = t;
    }
    if (Object.keys(row).length) { fields[en] = row; translated++; }
  }

  // vitality is a kebab-case enum, not prose, so translateMetaSmart never had
  // a chance at it — the SSR page was printing "critically-endangered" raw.
  // Mirrors SC_VITALITY_LBL in wordmap.html.
  const vitality = loadVitalityLabels();

  console.log('Meta i18n: ' + translated + '/' + values.size +
    ' distinct strings have at least one translation; ' +
    Object.keys(vitality).length + ' vitality values');
  return { fields, vitality };
}

// Parse SC_VITALITY_LBL out of wordmap.html so the two cannot drift.
function loadVitalityLabels() {
  const html = read('wordmap.html');
  const m = html.match(/const\s+SC_VITALITY_LBL\s*=\s*(\{[\s\S]*?\n\s*\};)/);
  if (!m) throw new Error('SC_VITALITY_LBL not found in wordmap.html');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext('this.__V = ' + m[1].replace(/;$/, ''), ctx);
  return ctx.__V;
}

function loadHanMap() {
  // wordmap_data.js supplies coordinates for codes shared with the Word Map.
  let src = 'var window=this;var WORDS={};\n';
  src += read('wordmap_data.js') + '\n';
  src += read('hanmap_data.js') + '\n';
  src += 'this.__LANG_DATA = LANG_DATA;\n';
  src += 'this.__HAN_DATA = (typeof HAN_DATA!=="undefined") ? HAN_DATA : window.HAN_DATA;\n';
  src += 'this.__HAN_LIST = (typeof HAN_LIST!=="undefined") ? HAN_LIST : window.HAN_LIST;\n';
  src += 'this.__HAN_CATEGORIES = (typeof HAN_CATEGORIES!=="undefined") ? HAN_CATEGORIES : window.HAN_CATEGORIES;\n';
  src += 'this.__HAN_LANG_META = (typeof HAN_LANG_META!=="undefined") ? HAN_LANG_META : window.HAN_LANG_META;\n';
  src += 'this.__HAN_LANGS = (typeof HAN_LANGS!=="undefined") ? HAN_LANGS : window.HAN_LANGS;\n';
  src += 'this.__HAN_VARIANTS = (typeof HAN_VARIANTS!=="undefined") ? HAN_VARIANTS : (window.HAN_VARIANTS||{});\n';
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return {
    LANG_DATA: ctx.__LANG_DATA,
    HAN_DATA: ctx.__HAN_DATA,
    HAN_LIST: ctx.__HAN_LIST,
    HAN_CATEGORIES: ctx.__HAN_CATEGORIES,
    HAN_LANG_META: ctx.__HAN_LANG_META,
    HAN_LANGS: ctx.__HAN_LANGS,
    HAN_VARIANTS: ctx.__HAN_VARIANTS || {},
  };
}

const HAN_EMPTY = (v) => !v || v === '—' || v === '-' || v === '';

function buildHanMapJSON(nameIndex) {
  const { LANG_DATA, HAN_DATA, HAN_LIST, HAN_CATEGORIES, HAN_LANG_META, HAN_LANGS, HAN_VARIANTS } = loadHanMap();

  // Character list metadata. HAN_LIST may carry disambiguators ("中:1").
  const chars = HAN_LIST.map((ch) => {
    const cd = HAN_DATA[ch] || {};
    const display = ch.includes(':') ? ch.split(':')[0] : ch;
    return {
      key: ch,
      char: display,
      gloss: (cd.en && cd.en.gloss) || (cd.gloss) || '',
    };
  });

  // Union of HAN_LANGS and HAN_LANG_META keys.
  const codes = new Set([...(HAN_LANGS || []), ...Object.keys(HAN_LANG_META || {})]);

  const langs = {};
  for (const code of codes) {
    const m = HAN_LANG_META[code] || {};
    const ld = LANG_DATA[code] || {};
    // Coordinates: prefer Word Map LANG_DATA, fall back to HAN_LANG_META.
    let lat = typeof ld.lat === 'number' ? ld.lat
      : (typeof m.lat === 'number' ? m.lat : null);
    let lng = typeof ld.lng === 'number' ? ld.lng
      : (typeof m.lng === 'number' ? m.lng : null);

    const entries = {};
    for (const ch of HAN_LIST) {
      const cd = HAN_DATA[ch];
      if (!cd) continue;
      // Per the app invariant, HAN_VARIANTS (文白異讀 / 呉音漢音 etc.) OWNS the
      // readings when present; otherwise fall back to the single main reading.
      const vs = (HAN_VARIANTS[ch] && HAN_VARIANTS[ch][code]) || null;
      let readings = [];
      // native = the native-script glyph (kana / hangul / Chữ Nôm / Tangut /
      // Phags-pa / Manchu …); surface = romanization. Keep both.
      const mainNative = (cd.native && cd.native[code]) || '';
      if (Array.isArray(vs) && vs.length) {
        readings = vs
          .map((v) => ({
            native: HAN_EMPTY(v.native) ? (HAN_EMPTY(mainNative) ? '' : mainNative) : v.native,
            surface: HAN_EMPTY(v.surface) ? '' : v.surface,
            ipa: HAN_EMPTY(v.ipa) ? '' : v.ipa,
            label: v.label || '',
          }))
          .filter((r) => r.surface || r.ipa || r.native);
      } else {
        let surf = (cd.surface && cd.surface[code]) || '';
        let ipa = (cd.ipa && cd.ipa[code]) || '';
        if (HAN_EMPTY(surf)) surf = '';
        if (HAN_EMPTY(ipa)) ipa = '';
        const nat = HAN_EMPTY(mainNative) ? '' : mainNative;
        if (surf || ipa || nat) readings = [{ native: nat, surface: surf, ipa, label: '' }];
      }
      if (readings.length) entries[ch] = readings;
    }
    if (!Object.keys(entries).length) continue; // skip codes with no readings

    langs[code] = {
      code,
      name: m.name || ld.name || code,
      native: m.native || ld.native || '',
      family: m.family || ld.family || '',
      speakers: m.speakers || (ld.meta && ld.meta.speakers) || '',
      region: m.region || '',
      romanization: (m.romanization && m.romanization.name) ? m.romanization.name : '',
      lat, lng,
      names: nameIndex[code] || {},
      readingType: pickLangs(m.reading_type),
      description: pickLangs(m.description),
      sources: Array.isArray(m.sources)
        ? m.sources.map((s) => (typeof s === 'string' ? { title: s, url: '' }
            : { title: s.title || '', url: s.url || '' }))
        : [],
      readings: entries,
    };
  }

  return {
    generated: new Date().toISOString(),
    site: 'https://langmap.heuron.com',
    chars,
    categories: HAN_CATEGORIES,
    langs,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const LN = loadLangNames();
  const nameIndex = buildNameIndex(LN);
  const uiLangNames = loadUiLangNames();

  const wm = buildWordMapJSON(nameIndex);
  const hm = buildHanMapJSON(nameIndex);
  wm.uiLangNames = uiLangNames;
  hm.uiLangNames = uiLangNames;

  // Word-order (sentence) data, keyed by lang code — shared by both pages.
  const wordorder = buildWordOrder();
  wm.wordorder = wordorder;
  hm.wordorder = wordorder;
  console.log('Word-order languages: ' + Object.keys(wordorder).length +
    ' (sentences source: ' + (wordorder.ja ? wordorder.ja.length : 0) + ' for ja)');

  fs.writeFileSync(path.join(OUT_DIR, 'wordmap_seo.json'), JSON.stringify(wm));
  fs.writeFileSync(path.join(OUT_DIR, 'hanmap_seo.json'), JSON.stringify(hm));

  const metaI18n = buildMetaI18n(loadWordMap().LANG_DATA, hm.langs);
  fs.writeFileSync(path.join(OUT_DIR, 'meta_i18n_seo.json'), JSON.stringify(metaI18n));

  // Spot-check.
  const checks = [
    ['wordmap', wm.langs, 'ja'],
    ['wordmap', wm.langs, 'yue_hk'],
    ['hanmap', hm.langs, 'cjy'],
    ['hanmap', hm.langs, 'yue_hk'],
  ];
  console.log('Word Map languages: ' + Object.keys(wm.langs).length +
    ' (concepts: ' + wm.words.length + ')');
  console.log('Han Map languages:  ' + Object.keys(hm.langs).length +
    ' (characters: ' + hm.chars.length + ')');
  for (const [map, set, code] of checks) {
    const l = set[code];
    if (!l) { console.log('  ! ' + map + '/' + code + ' MISSING'); continue; }
    const n = map === 'wordmap' ? Object.keys(l.words).length
      : Object.keys(l.readings).length;
    console.log('  ok ' + map + '/' + code + ' -> ' + l.name +
      ' (' + l.native + '), ' + n + ' entries, lat ' + l.lat + ' lng ' + l.lng);
  }
}

main();
