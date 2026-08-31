#!/usr/bin/env node
/**
 * build_trivia_index_links.js — write the crawlable article list into the
 * static app pages.
 *
 * The trivia articles now have real SSR pages at /{ui}/trivia/{slug}, but a
 * crawler cannot reach them from the apps: the article modal is JavaScript, and
 * a sitemap alone is a weak discovery signal. The three static pages that are
 * already indexed (index.html, wordmap.html, hanmap.html) therefore carry a
 * plain <details> block of real <a> links — present in the HTML source, not
 * built at runtime.
 *
 * Scope per page follows topical relevance:
 *   wordmap.html  the 30 Word Map articles
 *   hanmap.html   the 40 Han Map articles
 *   index.html    none — see the note in PAGES below
 *
 * Links point at /en/… like the existing footer index links do: that is the
 * x-default of the hreflang cluster, and the SSR page hands a reader on to
 * their own language from there.
 *
 * The block lives between markers so this stays regenerable:
 *
 *   <!-- TRIVIA-INDEX:START --> … <!-- TRIVIA-INDEX:END -->
 *
 * Usage:
 *   node tools/build_trivia_index_links.js          # rewrite the blocks
 *   node tools/build_trivia_index_links.js --check  # report drift, exit 1
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data', 'trivia_seo.json');
const START = '<!-- TRIVIA-INDEX:START -->';
const END = '<!-- TRIVIA-INDEX:END -->';

const TARGETS = [
  // index.html was here until 2026-08-31 and is deliberately not any more.
  // Owner report: a <details> holding 70 links, sitting in the site footer under
  // a label that reads like a section of the site, is not somewhere a reader
  // looks for an article — it reads as a malfunction. The crawl path is not
  // weakened by removing it: the footer now carries a single link to
  // /{ui}/trivia/, which is a real SSR hub page listing all 70 with their own
  // links, so index → hub → article is an ordinary two-hop internal path rather
  // than the sitemap-only discovery this file was written to avoid.
  //
  // wordmap.html and hanmap.html keep their blocks, where the list is topical
  // (30 and 40) rather than the whole catalogue — but the same UI objection
  // applies to them and they should probably go the same way.
  { file: 'wordmap.html', maps: ['wordmap'], label: '読み物（言語学の記事）' },
  { file: 'hanmap.html', maps: ['hanmap'], label: '読み物（文字と漢字音の記事）' },
];

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

function block(articles, label) {
  const items = articles.map((a) => {
    const t = (a.i18n.ja && a.i18n.ja.title) || (a.i18n.en && a.i18n.en.title) || a.id;
    const en = (a.i18n.en && a.i18n.en.title) || '';
    // Japanese chrome, but keep the English title in the title attribute so the
    // link still describes itself to an English-reading crawler.
    return `<li><a href="/en/trivia/${encodeURIComponent(a.id)}"`
      + (en ? ` title="${esc(en)}"` : '') + `>${esc((a.icon ? a.icon + ' ' : '') + t)}</a></li>`;
  });
  return [
    START,
    `<details class="trivia-index-seo">`,
    `<summary>${esc(label)} (${articles.length})</summary>`,
    `<ul>`,
    ...items,
    `</ul>`,
    `</details>`,
    END,
  ].join('\n');
}

function main() {
  const check = process.argv.includes('--check');
  if (!fs.existsSync(DATA)) {
    console.error('data/trivia_seo.json missing — run: node tools/export_trivia_seo.js');
    process.exit(1);
  }
  const all = JSON.parse(fs.readFileSync(DATA, 'utf8')).articles || [];
  let stale = 0;

  for (const t of TARGETS) {
    const p = path.join(ROOT, t.file);
    let s = fs.readFileSync(p, 'utf8');
    const arts = all.filter((a) => t.maps.includes(a.map));
    const want = block(arts, t.label);

    const i = s.indexOf(START);
    const j = s.indexOf(END);
    if (i < 0 || j < 0) {
      console.error(`${t.file}: markers not found — add ${START} / ${END} to the footer first`);
      process.exit(1);
    }
    const have = s.slice(i, j + END.length);
    if (have === want) {
      console.log(`${t.file}: up to date (${arts.length} articles)`);
      continue;
    }
    stale++;
    if (check) {
      console.log(`${t.file}: STALE (${arts.length} articles)`);
      continue;
    }
    s = s.slice(0, i) + want + s.slice(j + END.length);
    fs.writeFileSync(p, s);
    console.log(`${t.file}: written (${arts.length} articles)`);
  }

  if (check) {
    console.log(`stale: ${stale}`);
    process.exit(stale ? 1 : 0);
  }
}

main();
