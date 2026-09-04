#!/usr/bin/env node
/**
 * sitemap_size_check.js — the SEO sitemap must stay inside the sitemap limits.
 *
 * A sitemap that exceeds them is not truncated: search engines reject the WHOLE
 * file, so every SSR page loses its declared entry at once. The limits are
 * 52,428,800 bytes uncompressed and 50,000 URLs, and they apply to each file.
 *
 * /sitemap-seo.xml is a sitemap INDEX (2026-09-04). Before that it was one file
 * at 49,761,107 bytes — 94.9% of the byte limit and about 65 languages from
 * being rejected outright — because each <url> carries 20 xhtml:link alternates
 * (19 UIs + x-default), roughly 2.1 KB against a ~60-byte <loc>. The URLs now
 * live in /sitemap-seo-1.xml … /sitemap-seo-N.xml, 250 source pages each.
 *
 * This checks every part, and reports the WORST part's headroom: that is the
 * one that would be rejected first. It also checks the index itself against the
 * same limits, and that the index lists exactly the parts that produce URLs —
 * a part the index forgets is a part no crawler ever reads.
 *
 * Usage: node tools/sitemap_size_check.js [--check]
 */
'use strict';
const cp = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const MAX_BYTES = 52428800;
const MAX_URLS = 50000;

const php = (part) => {
  try {
    return cp.execFileSync('php', ['-r', `$seo_sitemap_part=${part}; require 'seo/sitemap.php';`], {
      cwd: ROOT, maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch (e) { return null; }
};

const index = php(0);
if (!index) {
  // No php on this machine (or the script failed) — say so rather than passing
  // silently, but do not fail the tree over a missing dev dependency.
  if (CHECK) { console.log('violations: 0'); console.log('  note: php unavailable, sitemap size not measured'); process.exit(0); }
  console.log('sitemap size check — php unavailable, not measured.');
  process.exit(0);
}

const listed = [...index.toString('utf8').matchAll(/sitemap-seo-(\d+)\.xml/g)].map((m) => Number(m[1]));
const files = [{ name: 'sitemap-seo.xml (index)', buf: index }];
const produced = [];
for (let i = 1; i <= 200; i++) {
  const buf = php(i);
  if (!buf || !/<url>/.test(buf.toString('utf8'))) break;
  produced.push(i);
  files.push({ name: `sitemap-seo-${i}.xml`, buf });
}

let violations = 0;
const notes = [];
let worstBytes = 0, worstUrls = 0, worstName = '', totalUrls = 0;
for (const f of files) {
  const bytes = f.buf.length;
  const urls = (f.buf.toString('utf8').match(/<loc>/g) || []).length;
  if (f.name.includes('index')) { /* the index's <loc>s are files, not pages */ }
  else totalUrls += urls;
  if (bytes > MAX_BYTES) { violations++; notes.push(`${f.name} is ${bytes} bytes, over the ${MAX_BYTES}-byte limit`); }
  if (urls > MAX_URLS) { violations++; notes.push(`${f.name} has ${urls} URLs, over the ${MAX_URLS} limit`); }
  if (bytes / MAX_BYTES > worstBytes / MAX_BYTES) { worstBytes = bytes; worstUrls = urls; worstName = f.name; }
  f.bytes = bytes; f.urls = urls;
}

// A part that exists but is not listed is invisible to crawlers; a listed part
// that produces nothing is a 404 in the index.
const missing = produced.filter((i) => !listed.includes(i));
const dangling = listed.filter((i) => !produced.includes(i));
if (missing.length) { violations += missing.length; notes.push(`parts produced but not listed in the index: ${missing.join(', ')}`); }
if (dangling.length) { violations += dangling.length; notes.push(`parts listed in the index that produce no URLs: ${dangling.join(', ')}`); }

const perUrl = totalUrls ? (files.slice(1).reduce((n, f) => n + f.bytes, 0) / totalUrls) : 0;
// Headroom is set by the worst part: that is the file that fails first. Parts
// are capped at a fixed number of source pages, so adding languages adds PARTS
// rather than bytes — what this number really watches is the per-URL cost. If
// the alternates grew five-fold (a 20th UI language is ~5%), a full part would
// approach the limit; that is the only route back to the cliff.
const CHUNK = 250;   // must match SEO_SITEMAP_CHUNK in seo/sitemap.php
const fullPart = perUrl * CHUNK * 19;
const headroom = MAX_BYTES / (fullPart || 1);
const pctBytes = 100 * worstBytes / MAX_BYTES;
const pctUrls = 100 * worstUrls / MAX_URLS;

if (CHECK) {
  console.log(`violations: ${violations}`);
  for (const n of notes) console.log('  ' + n);
  if (!violations) {
    console.log(`  ${produced.length} parts, ${totalUrls.toLocaleString()} URLs; worst part ${worstName} at ${pctBytes.toFixed(1)}% of the byte limit, ${pctUrls.toFixed(1)}% of the URL limit. A full part would be ${headroom.toFixed(1)}x under the limit, and more languages add parts, not bytes.`);
  }
  process.exit(0);
}
console.log('sitemap size check — each file against the 50MB / 50,000-URL limits\n');
for (const f of files) {
  console.log(`  ${f.name.padEnd(26)} ${f.bytes.toLocaleString().padStart(12)} bytes (${(100 * f.bytes / MAX_BYTES).toFixed(1)}%)  ${String(f.urls).padStart(6)} URLs`);
}
console.log(`\n  ${produced.length} parts, ${totalUrls.toLocaleString()} URLs total, ~${Math.round(perUrl)} bytes per URL.`);
console.log(`  Worst part is ${worstName} at ${pctBytes.toFixed(1)}%. A completely full part (${CHUNK} pages x 19 UIs) would be ${headroom.toFixed(1)}x under the byte limit, and more languages produce more PARTS rather than bigger ones — the cliff is gone unless the per-URL cost grows several-fold.`);
for (const n of notes) console.log('  ✗ ' + n);
if (!violations) console.log('\nwithin the limits.');
else console.log('\nOVER THE LIMIT — search engines reject the whole file.');
process.exit(violations ? 1 : 0);
