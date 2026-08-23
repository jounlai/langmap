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
console.log('\nDone. Run `node tools/check_all.js` to confirm clean, then commit.');
