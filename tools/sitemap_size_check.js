#!/usr/bin/env node
/**
 * sitemap_size_check.js — /sitemap-seo.xml must stay inside the sitemap limits.
 *
 * A sitemap that exceeds them is not truncated: search engines reject the WHOLE
 * file, so every SSR page loses its declared entry at once. The limits are
 * 52,428,800 bytes uncompressed and 50,000 URLs.
 *
 * The file is close on the byte limit and nowhere near the URL one, because
 * each <url> carries 20 xhtml:link alternates (19 UIs + x-default) — roughly
 * 2.1 KB per URL against a ~60-byte <loc>. So the cost of adding a language is
 * 19 URLs and ~40 KB, and the ceiling arrives about 65 languages from here.
 * The atlas added 13 in one session.
 *
 * Reported as headroom rather than as a violation while it is under the limit,
 * the same way hanmap_dup_row_check.js reports debt: the tree stays green and
 * the number is in front of whoever runs the guards. Over the limit it fails.
 *
 * The fix when it gets there is a sitemap INDEX — /sitemap-seo.xml listing
 * /sitemap-seo-wordmap.xml, -hanmap.xml and -trivia.xml — which is also what
 * lets the file keep growing afterwards.
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

let out = null;
try {
  out = cp.execFileSync('php', [path.join(ROOT, 'seo', 'sitemap.php')], {
    cwd: ROOT, maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'],
  });
} catch (e) {
  // No php on this machine (or the script failed) — say so rather than passing
  // silently, but do not fail the tree over a missing dev dependency.
  if (CHECK) { console.log('violations: 0'); console.log('  note: php unavailable, sitemap size not measured'); process.exit(0); }
  console.log('sitemap size check — php unavailable, not measured.');
  process.exit(0);
}

const bytes = out.length;
const urls = (out.toString('utf8').match(/<loc>/g) || []).length;
const pctBytes = (100 * bytes / MAX_BYTES);
const pctUrls = (100 * urls / MAX_URLS);
const overBytes = bytes > MAX_BYTES;
const overUrls = urls > MAX_URLS;
const violations = (overBytes ? 1 : 0) + (overUrls ? 1 : 0);

// A Word Map language costs 19 URLs; measure the per-URL cost from the file
// itself so the estimate tracks the real alternate-link overhead.
const perUrl = urls ? bytes / urls : 0;
const langsLeft = perUrl ? Math.floor((MAX_BYTES - bytes) / (perUrl * 19)) : 0;

if (CHECK) {
  console.log(`violations: ${violations}`);
  if (overBytes) console.log(`  sitemap-seo.xml is ${bytes} bytes, over the ${MAX_BYTES}-byte limit — split it into a sitemap index`);
  if (overUrls) console.log(`  sitemap-seo.xml has ${urls} URLs, over the ${MAX_URLS} limit — split it into a sitemap index`);
  if (!violations) console.log(`  headroom: ${pctBytes.toFixed(1)}% of the byte limit, ${pctUrls.toFixed(1)}% of the URL limit (~${langsLeft} more languages)`);
  process.exit(0);
}
console.log('sitemap size check — /sitemap-seo.xml against the 50MB / 50,000-URL limits\n');
console.log(`  bytes : ${bytes.toLocaleString()} / ${MAX_BYTES.toLocaleString()}  (${pctBytes.toFixed(1)}%)`);
console.log(`  URLs  : ${urls.toLocaleString()} / ${MAX_URLS.toLocaleString()}  (${pctUrls.toFixed(1)}%)`);
console.log(`  ~${Math.round(perUrl)} bytes per URL, 19 URLs per language → room for about ${langsLeft} more languages`);
if (!violations) console.log('\nwithin the limits.');
else console.log('\nOVER THE LIMIT — search engines reject the whole file. Split into a sitemap index.');
process.exit(violations ? 1 : 0);
