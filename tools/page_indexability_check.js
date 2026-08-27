#!/usr/bin/env node
/**
 * page_indexability_check.js — every HTML page at the web root must either be
 * in sitemap.xml or say noindex. There is no third state.
 *
 * The root is served as-is, so anything with a .html on it is a public URL
 * whether or not a link points at it. The project already applies the rule by
 * hand — changelog.html and the four monthly changelogs carry
 * <meta name="robots" content="noindex, follow"> and changelog.html is also
 * Disallow'd — but three pages had slipped through (review 464):
 *
 *   _buildertest.html   bare harness, pulls wordmap_meta.js (18.7 MB raw)
 *   _cardtest.html      the same
 *   poster.html         a real tool, but linked from nowhere
 *
 * A crawler reaching either harness would have fetched 7 MB gzipped of
 * language metadata to render a test canvas.
 *
 * "In the sitemap" is checked against the STATIC sitemap.xml, which is the one
 * robots.txt declares. The SSR pages under /{ui}/… are generated, not files,
 * and are out of scope here.
 *
 * Usage: node tools/page_indexability_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const sitemap = fs.existsSync(path.join(ROOT, 'sitemap.xml'))
  ? fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8') : '';
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const inSitemap = (file) => {
  if (file === 'index.html') return locs.some((l) => /\/$/.test(l));
  return locs.some((l) => l.endsWith('/' + file));
};

const violations = [];
const ok = [];
for (const f of fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const head = src.slice(0, src.indexOf('</head>') + 1 || 4000);
  const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(head);
  const listed = inSitemap(f);
  if (listed && noindex) violations.push(`${f} is in sitemap.xml AND says noindex — pick one`);
  else if (!listed && !noindex) violations.push(`${f} is neither in sitemap.xml nor noindex — it is a public, indexable page nothing links to`);
  else ok.push(`${f}: ${listed ? 'sitemap' : 'noindex'}`);
}

if (CHECK) {
  console.log(`violations: ${violations.length}`);
  for (const v of violations) console.log('  ' + v);
  process.exit(0);
}
console.log('page indexability — every root .html is in sitemap.xml or is noindex\n');
for (const o of ok) console.log('  ' + o);
console.log('');
for (const v of violations) console.log('  ' + v);
if (!violations.length) console.log('clean.');
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
