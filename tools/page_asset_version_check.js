#!/usr/bin/env node
/**
 * page_asset_version_check.js — the same stale-cache guard as
 * asset_version_check.js, but for every page, not just wordmap.html.
 *
 * asset_version_check.js only knows about `WM_ASSET_VERSION` in wordmap.html.
 * hanmap.html and namemap.html write their `?v=` numbers as plain literals in
 * the <script> tags, so nothing checked them at all: hanmap_data.js and
 * namemap_*.js had to be bumped by hand, and were forgotten twice in a row
 * (NameMap review 01 and review 432, both 2026-08-06).
 *
 * Two failures are caught:
 *
 *   DRIFT         the file's content changed since the lock was recorded but
 *                 its ?v= did not — browsers keep serving the cached old copy
 *                 while every other guard passes.
 *
 *   INCONSISTENT  one asset is referenced with different ?v= numbers from
 *                 different pages. Caching is per-URL, so the page with the
 *                 lower number is serving a stale copy to anyone who visited
 *                 it before. This was live: hanmap.html asked for
 *                 wordmap_data.js?v=221 while wordmap.html was on 252.
 *
 * Usage:
 *   node tools/page_asset_version_check.js           # report (exit 1 on drift)
 *   node tools/page_asset_version_check.js --check   # print "violations: N", exit 0
 *   node tools/page_asset_version_check.js --update  # re-record the lock
 *
 * Workflow when you change a file a page cache-busts:
 *   1. edit the file
 *   2. bump ?v= in EVERY page that references it (they must agree)
 *   3. node tools/page_asset_version_check.js --update   (commit the lock)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const LOCK = path.join(__dirname, 'page_asset_version.lock.json');
const argv = process.argv.slice(2);
const CHECK = argv.includes('--check');
const UPDATE = argv.includes('--update');

// Pages that are snapshots of an already-shipped state. Their ?v= numbers are
// deliberately frozen and must not be dragged along by a later bump.
const SKIP_PAGES = new Set(['_buildertest.html', '_cardtest.html']);

function scan() {
  const refs = new Map(); // asset -> [{page, version}]
  const missing = [];
  for (const page of fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort()) {
    if (SKIP_PAGES.has(page)) continue;
    const src = fs.readFileSync(path.join(ROOT, page), 'utf8');
    const re = /(?:src|href)="([^"?]+)\?v=(\d+)"/g;
    let m;
    while ((m = re.exec(src))) {
      // A leading slash is site-root, which is the repo root here.
      const asset = m[1].replace(/^\//, '');
      // wordmap.html builds some tags by concatenation
      // (src="lang_names/' + ui + '.js?v=133"). Those are not real paths; the
      // generated tags they produce are covered by validate_wordmap_data.js.
      // Report them rather than dropping them silently, so a genuine typo in a
      // static path cannot hide here.
      if (!fs.existsSync(path.join(ROOT, asset))) { missing.push({ page, asset }); continue; }
      if (!refs.has(asset)) refs.set(asset, []);
      refs.get(asset).push({ page, version: Number(m[2]) });
    }
  }
  return { refs, missing };
}

const hashOf = asset =>
  crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, asset))).digest('hex').slice(0, 16);

const { refs, missing } = scan();
const lock = fs.existsSync(LOCK) ? JSON.parse(fs.readFileSync(LOCK, 'utf8')) : {};

const drift = [];
const inconsistent = [];
const unrecorded = [];
const next = {};

for (const asset of [...refs.keys()].sort()) {
  const uses = refs.get(asset);
  const versions = [...new Set(uses.map(u => u.version))];
  const version = Math.max(...versions);
  const hash = hashOf(asset);
  next[asset] = { version, hash };

  if (versions.length > 1) {
    inconsistent.push({
      asset,
      behind: uses.filter(u => u.version < version).map(u => `${u.page}:${u.version}`),
      current: version,
    });
  }

  const prev = lock[asset];
  if (!prev) { unrecorded.push({ asset, why: 'not in lock yet' }); continue; }
  if (prev.hash === hash) {
    if (prev.version !== version) unrecorded.push({ asset, why: `version ${prev.version}→${version} but content identical` });
    continue;
  }
  if (prev.version === version) drift.push({ asset, version, pages: uses.map(u => u.page) });
  else unrecorded.push({ asset, why: `version bumped ${prev.version}→${version}` });
}

const violations = drift.length + inconsistent.length;

if (UPDATE) {
  if (violations) {
    console.error('refusing to update — fix these first:\n');
    for (const d of drift) console.error(`  ${d.asset} changed but is still ?v=${d.version} in ${d.pages.join(', ')}`);
    for (const i of inconsistent) console.error(`  ${i.asset} is ?v=${i.current} on some pages but ${i.behind.join(', ')}`);
    process.exit(1);
  }
  fs.writeFileSync(LOCK, JSON.stringify(next, null, 2) + '\n');
  console.log(`page_asset_version.lock.json updated (${Object.keys(next).length} assets).`);
  process.exit(0);
}

if (CHECK) {
  console.log(`violations: ${violations}`);
  for (const d of drift) console.log(`  ${d.asset} changed but is still ?v=${d.version} in ${d.pages.join(', ')} — stale cache`);
  for (const i of inconsistent) console.log(`  ${i.asset} is ?v=${i.current} elsewhere but ${i.behind.join(', ')} — those pages serve a stale copy`);
  if (!violations && unrecorded.length) for (const u of unrecorded) console.log(`  note: ${u.asset} — ${u.why}; run tools/page_asset_version_check.js --update`);
  process.exit(0);
}

console.log('page ?v= cache-buster guard — content hash vs the number in each <script>/<link>\n');
if (!violations && !unrecorded.length) console.log('clean — every asset\'s ?v= matches its content, and every page agrees.');
for (const d of drift) {
  console.log(`DRIFT         ${d.asset} changed, but ${d.pages.join(', ')} still ask for ?v=${d.version}.`);
  console.log(`              Bump it in those pages, then: node tools/page_asset_version_check.js --update\n`);
}
for (const i of inconsistent) {
  console.log(`INCONSISTENT  ${i.asset} is ?v=${i.current} on some pages but ${i.behind.join(', ')}.`);
  console.log(`              Caching is per-URL, so those pages serve a stale copy. Raise them to ${i.current}.\n`);
}
for (const u of unrecorded) console.log(`STALE-LOCK    ${u.asset} — ${u.why}; run: node tools/page_asset_version_check.js --update`);
if (missing.length) {
  console.log(`\nnot on disk (${missing.length}) — concatenated tags are expected here; a static path would be a typo:`);
  for (const m of missing) console.log(`  ${m.page}  ${m.asset}`);
}
process.exit(violations ? 1 : 0);
