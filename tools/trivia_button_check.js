#!/usr/bin/env node
/**
 * trivia_button_check.js — verify every interactive button embedded in the
 * trivia article bodies points at a target that actually exists.
 *
 *   wordmap_trivia.js
 *     data-action="focus" / "panto" / "compare"  -> data-code / data-codes must be LANG_DATA keys
 *     data-action="setword"                      -> data-word must be a WORDS id (word_manifest / words/*.js)
 *                                                   and, when data-code is present, that language must
 *                                                   have a non-"—" cell for that word.
 *   hanmap_trivia.js
 *     data-action="setchar"                      -> data-char must be in HAN_LIST / HAN_DATA
 *     data-action="focus" / "panto"              -> data-code must be a HanMap language code
 *
 * Every article body is duplicated per UI language, and so is every button, so
 * a dead target is a dead target nineteen times over. Both the base files and
 * the seventeen wordmap_trivia_<lang>.js overlays are scanned.
 *
 * What this cannot see: a button whose target exists but is the wrong one — a
 * label promising 元 while the payload passes 行, or a Khitan article focusing
 * the Mandarin column. Those need a reader.
 *
 * Usage:
 *   node tools/trivia_button_check.js          # full report
 *   node tools/trivia_button_check.js --check  # "dead targets: N", exit 0
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const R = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

function load(files, tail) {
  const ctx = { WORDS: {} };
  vm.createContext(ctx);
  for (const f of files) vm.runInContext(R(f), ctx, { filename: f });
  vm.runInContext(tail, ctx);
  return ctx.__OUT;
}

// ---------- reference data ----------
const wm = load(['wordmap_data.js', 'word_manifest.js'],
  '__OUT = { LANG_DATA, WORD_ORDER };');
const wordFiles = fs.readdirSync(path.join(ROOT, 'words')).filter(f => f.endsWith('.js'));
const WORDS = load(wordFiles.map(f => 'words/' + f), '__OUT = WORDS;');
const han = load(['hanmap_data.js'],
  '__OUT = { HAN_LIST, HAN_DATA, HAN_LANGS, HAN_LANG_META };');

const LANG_CODES = new Set(Object.keys(wm.LANG_DATA));
const WORD_IDS = new Set(Object.keys(WORDS));
const MANIFEST = new Set(wm.WORD_ORDER);
const HAN_CHARS = new Set(han.HAN_LIST.concat(Object.keys(han.HAN_DATA)));
const HAN_CODES = new Set(han.HAN_LANGS.concat(Object.keys(han.HAN_LANG_META)));

const UNATTESTED = v => {
  if (v === undefined || v === null) return true;
  const s = Array.isArray(v) ? String(v[0] ?? '') : String(v);
  return s.trim() === '' || s.trim() === '—' || s.trim() === '-' || s.trim() === '?';
};
function wordCell(word, code) {
  const w = WORDS[word];
  if (!w) return { missingWord: true };
  const d = w.data || w.entries || {};
  if (!(code in d)) return { missingCell: true };
  if (UNATTESTED(d[code])) return { unattested: true, value: JSON.stringify(d[code]) };
  return { ok: true, value: JSON.stringify(d[code]) };
}

// ---------- button extraction ----------
const BTN = /<button\b[^>]*data-action=[^>]*>.*?<\/button>|<button\b[^>]*data-action=[^>]*\/?>/gs;
const ATTR = n => new RegExp('\\b' + n + '\\s*=\\s*"([^"]*)"|\\b' + n + "\\s*=\\s*'([^']*)'");
function attr(html, name) {
  const m = html.match(ATTR(name));
  return m ? (m[1] !== undefined ? m[1] : m[2]) : undefined;
}
function buttons(article) {
  const out = [];
  for (const [lang, html] of Object.entries(article.body || {})) {
    if (typeof html !== 'string') continue;
    for (const m of html.matchAll(BTN)) out.push({ lang, html: m[0] });
  }
  return out;
}
function loadArticles(file) {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(R(file) + '\n;__OUT = TRIVIA_ARTICLES;', ctx, { filename: file });
  return ctx.__OUT;
}

// The 30 WordMap articles keep only en + ja in wordmap_trivia.js; the other 17
// UI languages live in wordmap_trivia_<lang>.js as window.TRIVIA_I18N overlays,
// each carrying its OWN copy of every button. Checking only the base file
// therefore misses 17/19 of every wordmap defect — which is how es_eu and ine
// survived a pass that did look at this file. Fold the overlays in so an
// article's buttons are checked in every language a reader can select.
function loadWordmapOverlays() {
  const files = fs.readdirSync(ROOT).filter(f => /^wordmap_trivia_[a-z]+\.js$/.test(f)).sort();
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const f of files) vm.runInContext(R(f), ctx, { filename: f });
  const i18n = ctx.window.TRIVIA_I18N || {};
  const out = [];
  for (const lang of Object.keys(i18n)) {
    for (const [id, art] of Object.entries(i18n[lang] || {})) {
      out.push({ id, body: { [lang]: art.body } });
    }
  }
  return { articles: out, files };
}

const findings = [];
const add = (f, id, lang, html, problem) => findings.push({ file: f, id, lang, html, problem });
const stats = {};
const bump = k => (stats[k] = (stats[k] || 0) + 1);

// ---------- wordmap (base en+ja, plus the 17 per-language overlays) ----------
const overlays = loadWordmapOverlays();
// en and ja live in the base file; every other language in its own overlay.
const wmFile = lang => (lang === 'en' || lang === 'ja') ? 'wordmap_trivia.js' : `wordmap_trivia_${lang}.js`;
for (const a of loadArticles('wordmap_trivia.js').concat(overlays.articles)) {
  for (const { lang, html } of buttons(a)) {
    const action = attr(html, 'data-action');
    bump('wm:' + action);
    const code = attr(html, 'data-code');
    const codes = attr(html, 'data-codes');
    if (action === 'focus' || action === 'panto' || action === 'compare') {
      for (const c of [].concat(code ? [code] : [], codes ? codes.split(/[,\s]+/) : []).filter(Boolean)) {
        if (!LANG_CODES.has(c)) add(wmFile(lang), a.id, lang, html, `language code "${c}" is not a key in LANG_DATA`);
      }
    }
    if (action === 'setword') {
      const w = attr(html, 'data-word');
      if (!w) { add(wmFile(lang), a.id, lang, html, 'setword button has no data-word'); continue; }
      if (!WORD_IDS.has(w)) { add(wmFile(lang), a.id, lang, html, `word id "${w}" has no words/${w}.js`); continue; }
      if (!MANIFEST.has(w)) add(wmFile(lang), a.id, lang, html, `word id "${w}" is not listed in WORD_ORDER (word_manifest.js)`);
      if (code) {
        if (!LANG_CODES.has(code)) { add(wmFile(lang), a.id, lang, html, `language code "${code}" is not a key in LANG_DATA`); continue; }
        const cell = wordCell(w, code);
        if (cell.missingCell) add(wmFile(lang), a.id, lang, html, `words/${w}.js has no cell for "${code}" (${wm.LANG_DATA[code].name}) — button lands on an empty row`);
        else if (cell.unattested) add(wmFile(lang), a.id, lang, html, `words/${w}.js cell for "${code}" (${wm.LANG_DATA[code].name}) is unattested ${cell.value} — button lands on an empty row`);
      }
    }
  }
}

// ---------- hanmap ----------
for (const a of loadArticles('hanmap_trivia.js')) {
  for (const { lang, html } of buttons(a)) {
    const action = attr(html, 'data-action');
    bump('han:' + action);
    if (action === 'setchar') {
      const c = attr(html, 'data-char');
      if (!c) { add('hanmap_trivia.js', a.id, lang, html, 'setchar button has no data-char'); continue; }
      if (!HAN_CHARS.has(c)) add('hanmap_trivia.js', a.id, lang, html, `character "${c}" is not one of the 61 HAN_LIST characters`);
    }
    if (action === 'focus' || action === 'panto') {
      const code = attr(html, 'data-code');
      if (code && !HAN_CODES.has(code)) add('hanmap_trivia.js', a.id, lang, html, `language code "${code}" is not in HAN_LANGS / HAN_LANG_META`);
    }
  }
}

const CHECK = process.argv.includes('--check');
if (CHECK) {
  console.log('dead targets: ' + findings.length);
  for (const f of findings) console.log(`  ${f.file} ${f.id} (${f.lang}): ${f.problem}`);
  process.exit(0);
}
console.log('button counts:', JSON.stringify(stats, null, 1));
console.log('LANG_DATA codes:', LANG_CODES.size, '| word ids:', WORD_IDS.size, '| han chars:', HAN_CHARS.size, '| han codes:', HAN_CODES.size);
console.log('scanned: wordmap_trivia.js + ' + overlays.files.length + ' language overlays + hanmap_trivia.js');
console.log('\n' + findings.length + ' dead target(s)\n');
for (const f of findings) console.log(`[${f.file}] ${f.id} (${f.lang})\n  ${f.problem}\n  ${f.html}\n`);
