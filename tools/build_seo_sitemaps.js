#!/usr/bin/env node
/*
 * build_seo_sitemaps.js — write the SEO sitemap index and its parts as static
 * files in the repo root: sitemap-seo-index.xml pointing at gzipped parts
 * sitemap-seo-1.xml.gz … (≈50 MB as plain XML; gzip is ~1% of that and is a
 * format every search engine reads).
 *
 * seo/sitemap.php renders them, and index.php routes /sitemap-seo.xml and
 * /sitemap-seo-<n>.xml to it — but production nginx only passes the index to
 * PHP, so every part 404'd and search engines got an index pointing at
 * nothing (r28). Static files are served by nginx directly.
 *
 * Run after tools/export_seo_data.js:  node tools/build_seo_sitemaps.js
 * --check prints "stale: N" (tools/check_all.js).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const ROOT = path.join(__dirname, '..');
const CHECK = process.argv.includes('--check');

const render = (part) => cp.execFileSync('php', ['-d', 'display_errors=stderr', '-r',
    `chdir(${JSON.stringify(ROOT)}); $seo_sitemap_part = ${part}; include 'seo/sitemap.php';`], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });

const zlib = require('zlib');
const index = render(0);
const parts = [...index.matchAll(/sitemap-seo-(\d+)\.xml/g)].map((m) => +m[1]);
// The static index points at the .gz parts; /sitemap-seo.xml stays the PHP one.
const files = { 'sitemap-seo-index.xml': Buffer.from(index.replace(/sitemap-seo-(\d+)\.xml/g, 'sitemap-seo-$1.xml.gz')) };
for (const n of parts) files[`sitemap-seo-${n}.xml.gz`] = zlib.gzipSync(Buffer.from(render(n)), { level: 9 });   // gzip header mtime is 0: stable bytes

let stale = 0;
for (const [f, body] of Object.entries(files)) {
    const p = path.join(ROOT, f);
    const cur = fs.existsSync(p) ? fs.readFileSync(p) : Buffer.alloc(0);
    if (Buffer.compare(cur, body) === 0) continue;
    if (CHECK) stale++; else fs.writeFileSync(p, body);
}
// Parts left over from a larger set.
for (const f of fs.readdirSync(ROOT).filter((f) => /^sitemap-seo-\d+\.xml(\.gz)?$/.test(f) && !files[f])) {
    if (CHECK) stale++; else fs.unlinkSync(path.join(ROOT, f));
}
if (CHECK) { console.log(`stale: ${stale}`); if (stale) console.log('  run: node tools/build_seo_sitemaps.js'); process.exit(0); }
console.log(`SEO sitemaps: index + ${parts.length} parts written`);
