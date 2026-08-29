#!/usr/bin/env node
/**
 * bump_versions.js — one command to cache-bust everything you changed.
 *
 * LangMap has two cache-version systems:
 *   1. WM_ASSET_VERSION in wordmap.html — drives the lazy assetUrl() loads
 *      (words, meta, lite, per-UI i18n, …).  Guarded by asset_version_check.js.
 *   2. literal `?v=N` in every page's <script>/<link> tags — hanmap, tree,
 *      namemap, index, changelogs, ….  Guarded by page_asset_version_check.js.
 *
 * Both guards FAIL a build when a file's content changed but its number did
 * not, so a stale cache can't ship — but bumping the numbers used to be manual
 * (and was forgotten more than once). This runs the --bump auto-fix of BOTH
 * checkers: every changed asset gets its number incremented (and cross-page
 * inconsistencies unified), and both locks are re-recorded. Numbers stay simple
 * incrementing integers; you just never have to touch them by hand.
 *
 * Usage:  node tools/bump_versions.js
 * Then:   node tools/check_all.js   (should be clean), and commit.
 */
'use strict';
const { execFileSync } = require('child_process');
const path = require('path');

const run = (script) => {
  const p = path.join(__dirname, script);
  console.log(`\n=== ${script} --bump ===`);
  execFileSync('node', [p, '--bump'], { stdio: 'inherit' });
};

// WM_ASSET_VERSION first, then the literal per-page tags. They are independent
// registries; a file that appears in both (e.g. lang-filter.js) is bumped once
// in each, and because both start from the same number they stay in step.
run('asset_version_check.js');
run('page_asset_version_check.js');

// A third coupling neither checker owns. `word_manifest.js?v=` in wordmap.html
// is expected to equal WM_ASSET_VERSION.words (validate_wordmap_data.js #19),
// because the manifest and the per-word files it names must invalidate
// together — a browser holding an old manifest asks for words that the new
// one reordered. But the page checker keys off CONTENT, and adding a language
// to words/black.js does not touch word_manifest.js, so it reports "in sync"
// while WM_ASSET_VERSION.words moves on without it. Caught by the validator on
// two commits running (2026-08-29) and fixed by hand both times; do it here
// instead. Only this one tag is rewritten, and only its lock entry is patched,
// so a real drift elsewhere still has to go through --bump.
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const PAGE = path.join(ROOT, 'wordmap.html');
const LOCK = path.join(__dirname, 'page_asset_version.lock.json');
console.log('\n=== word_manifest.js?v= vs WM_ASSET_VERSION.words ===');
let page = fs.readFileSync(PAGE, 'utf8');
const want = /WM_ASSET_VERSION\s*=\s*\{[^}]*?\bwords:\s*(\d+)/.exec(page);
const has = /word_manifest\.js\?v=(\d+)/.exec(page);
if (!want || !has) {
  console.log('could not read one of the two numbers — leaving both alone');
} else if (want[1] === has[1]) {
  console.log(`already in step (${has[1]})`);
} else {
  page = page.replace(/word_manifest\.js\?v=\d+/g, `word_manifest.js?v=${want[1]}`);
  fs.writeFileSync(PAGE, page);
  const lock = JSON.parse(fs.readFileSync(LOCK, 'utf8'));
  if (lock['word_manifest.js']) lock['word_manifest.js'].version = Number(want[1]);
  fs.writeFileSync(LOCK, JSON.stringify(lock, null, 2) + '\n');
  console.log(`word_manifest.js?v=${has[1]} -> ${want[1]} (following WM_ASSET_VERSION.words)`);
}
console.log('\nDone. Run `node tools/check_all.js` to confirm clean, then commit.');
