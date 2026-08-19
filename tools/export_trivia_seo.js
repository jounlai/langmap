#!/usr/bin/env node
/**
 * export_trivia_seo.js — emit canonical JSON for the SSR trivia ("読み物") pages.
 *
 * The 70 trivia articles are the only long-form prose on the site, and they
 * were reachable exclusively through a JS modal — invisible to crawlers. This
 * step serialises them the same way export_seo_data.js does for the maps: load
 * the real JS in a Node `vm` context, merge the per-UI-language overlays, and
 * write one JSON file PHP can read without a build step on the host.
 *
 * Two different shapes have to be reconciled:
 *   wordmap_trivia.js   — 30 articles, base carries en + ja only; the other
 *                         seventeen UI languages arrive as lazy-loaded overlays
 *                         wordmap_trivia_<ui>.js setting TRIVIA_I18N[ui][id].
 *   hanmap_trivia.js    — 40 articles, all 19 UI languages inline.
 *
 * The article bodies keep their raw HTML, including the <button
 * data-action="focus" …> map controls. Those are rewritten into real <a> links
 * at render time by seo/trivia.php, because the target URL depends on the UI
 * language of the page being rendered.
 *
 * Re-run whenever the trivia files change:
 *
 *     node tools/export_trivia_seo.js
 *
 * Output:
 *     data/trivia_seo.json
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'data');

const UI_LANGS = ['en', 'ja', 'ko', 'zh', 'yue', 'vi', 'th', 'id', 'hi', 'de',
  'fr', 'it', 'es', 'pt', 'ru', 'uk', 'ar', 'he', 'sw'];

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

/**
 * Load one trivia file into the context.
 *
 * The base files declare `const TRIVIA_ARTICLES = [...]`, and a top-level
 * `const` in a vm script is lexically scoped — it never lands on the context
 * object. Append an explicit hand-off so the value escapes the script, the
 * same trick the other tools use.
 */
function loadTrivia(file, ctx) {
  const src = read(file) +
    '\n;try{ this.TRIVIA_ARTICLES = TRIVIA_ARTICLES; }catch(e){}';
  vm.runInContext(src, ctx);
  return ctx;
}

function articlesOf(file, overlays) {
  const ctx = vm.createContext({ window: {}, console });
  ctx.window.TRIVIA_I18N = ctx.window.TRIVIA_I18N || {};
  loadTrivia(file, ctx);
  for (const ov of overlays) loadTrivia(ov, ctx);

  const base = ctx.TRIVIA_ARTICLES;
  if (!Array.isArray(base)) throw new Error(`${file}: TRIVIA_ARTICLES not found`);
  const i18n = ctx.window.TRIVIA_I18N || {};

  return base.map((a) => {
    const per = {};
    for (const ui of UI_LANGS) {
      // Base file wins where it has the language inline (Han Map); otherwise
      // the overlay supplies it (Word Map). Missing languages fall back to
      // English at render time, not here — the page needs to know it fell back
      // so it can leave that locale out of hreflang if we ever want to.
      const o = (i18n[ui] || {})[a.id] || {};
      const title = (a.title && a.title[ui]) || o.title;
      const summary = (a.summary && a.summary[ui]) || o.summary;
      const body = (a.body && a.body[ui]) || o.body;
      if (title || summary || body) {
        per[ui] = {
          title: title || '',
          summary: summary || '',
          body: (body || '').trim(),
        };
      }
    }
    return {
      id: a.id,
      icon: a.icon || '',
      tags: Array.isArray(a.tags) ? a.tags : [],
      sources: Array.isArray(a.sources) ? a.sources : [],
      i18n: per,
    };
  });
}

function main() {
  const overlays = UI_LANGS
    .map((ui) => `wordmap_trivia_${ui}.js`)
    .filter((f) => fs.existsSync(path.join(ROOT, f)));

  const wm = articlesOf('wordmap_trivia.js', overlays).map((a) => ({ ...a, map: 'wordmap' }));
  const hm = articlesOf('hanmap_trivia.js', []).map((a) => ({ ...a, map: 'hanmap' }));

  const seen = new Set();
  const all = [];
  for (const a of [...wm, ...hm]) {
    if (seen.has(a.id)) {
      console.error(`  ! duplicate article id across maps: ${a.id} — skipped`);
      continue;
    }
    seen.add(a.id);
    all.push(a);
  }

  // Tag index, so the hub can group without PHP re-scanning every article.
  const tags = {};
  for (const a of all) for (const t of a.tags) (tags[t] = tags[t] || []).push(a.id);

  // Names for the language codes the article buttons point at. seo/trivia.php
  // turns those buttons into links, and a link reading "myp" helps nobody —
  // it needs "Pirahã". Pulling only the referenced codes keeps this file small
  // instead of dragging in the 23 MB wordmap export at request time.
  const referenced = new Set();
  for (const a of all) {
    for (const per of Object.values(a.i18n)) {
      const body = per.body || '';
      for (const m of body.matchAll(/data-codes?\s*=\s*"([^"]*)"/g)) {
        for (const c of m[1].split(/[,\s]+/)) if (c) referenced.add(c);
      }
    }
  }
  const names = {};
  for (const which of ['wordmap', 'hanmap']) {
    const f = path.join(OUT_DIR, `${which}_seo.json`);
    if (!fs.existsSync(f)) {
      console.error(`  ! ${which}_seo.json missing — run tools/export_seo_data.js first`);
      continue;
    }
    const d = JSON.parse(fs.readFileSync(f, 'utf8'));
    for (const code of referenced) {
      const l = (d.langs || {})[code];
      if (!l) continue;
      names[code] = names[code] || {};
      for (const ui of UI_LANGS) {
        const n = (l.names || {})[ui] || l.name;
        if (n && !names[code][ui]) names[code][ui] = n;
      }
    }
  }
  const missing = [...referenced].filter((c) => !names[c]);

  const out = { articles: all, tags, names, uiLangs: UI_LANGS };
  fs.writeFileSync(path.join(OUT_DIR, 'trivia_seo.json'), JSON.stringify(out));

  const coverage = {};
  for (const ui of UI_LANGS) coverage[ui] = all.filter((a) => a.i18n[ui] && a.i18n[ui].body).length;
  console.log(`data/trivia_seo.json — ${all.length} articles ` +
    `(wordmap ${wm.length}, hanmap ${hm.length}), ${Object.keys(tags).length} tags`);
  console.log('  per-UI body coverage: ' +
    UI_LANGS.map((u) => `${u}:${coverage[u]}`).join(' '));
  console.log(`  button link targets: ${referenced.size} codes, ` +
    `${Object.keys(names).length} named` +
    (missing.length ? ` (no name for: ${missing.join(' ')})` : ''));
}

main();
