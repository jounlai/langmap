#!/usr/bin/env node
/**
 * asset_version_check.js — make a stale cache impossible to ship.
 *
 * wordmap.html serves its data through `?v=<WM_ASSET_VERSION[key]>`. The
 * existing validator only checks that the ?v= tags MATCH the version object —
 * it never checks that the version was BUMPED when the underlying file changed.
 * So editing words/*.js and leaving `words: 70` passes every guard while every
 * browser keeps serving the cached old data. That happened for a whole day of
 * Chữ Nôm / Chinese-script / IPA fixes (owner 2026-07-17).
 *
 * This guard pins each version key to a content hash of the files it serves,
 * recorded in tools/asset_version.lock.json. If the content moved but the
 * version did not, it fails.
 *
 * Usage:
 *   node tools/asset_version_check.js            # check (exit 1 on drift)
 *   node tools/asset_version_check.js --check    # check, print "violations: N", exit 0
 *   node tools/asset_version_check.js --update   # re-record the lock (requires a bumped version)
 *
 * Workflow when you change data:
 *   1. edit words/*.js
 *   2. bump WM_ASSET_VERSION.words in wordmap.html
 *   3. node tools/asset_version_check.js --update   (commit the lock with your change)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const HTML = path.join(ROOT, 'wordmap.html');
const LOCK = path.join(__dirname, 'asset_version.lock.json');
const argv = process.argv.slice(2);
const CHECK = argv.includes('--check');
const UPDATE = argv.includes('--update');

// WM_ASSET_VERSION key -> the files that key cache-busts.
// `dir` entries hash every .js in that directory (sorted, so order is stable).
const ASSETS = {
  words:            { files: ['word_manifest.js'], dirs: ['words'] },
  labels:           { files: ['word_labels.js'] },
  data:             { files: ['wordmap_data.js'] },
  filter:           { files: ['lang-filter.js'] },
  styles:           { files: ['styles.css'] },
  names:            { dirs: ['lang_names'] },
  meta:             { files: ['wordmap_meta.js'] },
  trivia:           { files: ['wordmap_trivia.js'] },
  metaI18n:         { files: ['meta_i18n_ext.js'] },
  metaI18nCoverage: { files: ['meta_i18n_coverage.js'] },
  metaI18nCoverage2:{ files: ['meta_i18n_coverage2.js'] },
  triviaI18n:       { glob: /^wordmap_trivia_[a-z]{2,3}\.js$/ },
};

function readVersions() {
  const src = fs.readFileSync(HTML, 'utf8');
  const m = src.match(/const\s+WM_ASSET_VERSION\s*=\s*\{([^}]+)\}/);
  if (!m) throw new Error('WM_ASSET_VERSION not found in wordmap.html');
  const out = {};
  for (const line of m[1].split('\n')) {
    // Key names contain digits (metaI18n, triviaI18n) — [A-Za-z]+ silently
    // skipped them, leaving those assets unguarded.
    const kv = line.match(/([A-Za-z][A-Za-z0-9]*)\s*:\s*(\d+)/);
    if (kv) out[kv[1]] = Number(kv[2]);
  }
  return out;
}

function hashOf(spec) {
  const parts = [];
  for (const f of (spec.files || [])) {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) parts.push([f, fs.readFileSync(p)]);
  }
  for (const d of (spec.dirs || [])) {
    const dir = path.join(ROOT, d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
      parts.push([d + '/' + f, fs.readFileSync(path.join(dir, f))]);
    }
  }
  if (spec.glob) {
    for (const f of fs.readdirSync(ROOT).filter(f => spec.glob.test(f)).sort()) {
      parts.push([f, fs.readFileSync(path.join(ROOT, f))]);
    }
  }
  const h = crypto.createHash('sha256');
  for (const [name, buf] of parts) { h.update(name); h.update('\0'); h.update(buf); h.update('\0'); }
  return { hash: h.digest('hex').slice(0, 16), count: parts.length };
}

const versions = readVersions();
const lock = fs.existsSync(LOCK) ? JSON.parse(fs.readFileSync(LOCK, 'utf8')) : {};

const drift = [];      // content changed, version not bumped
const unrecorded = []; // version bumped (or new key) — lock needs --update
const next = {};

for (const [key, spec] of Object.entries(ASSETS)) {
  const version = versions[key];
  if (version === undefined) continue;
  const { hash, count } = hashOf(spec);
  const prev = lock[key];
  next[key] = { version, hash, files: count };

  if (!prev) { unrecorded.push({ key, why: 'not in lock yet' }); continue; }
  if (prev.hash === hash) {
    if (prev.version !== version) unrecorded.push({ key, why: `version ${prev.version}→${version} but content identical` });
    continue;
  }
  // Content changed.
  if (prev.version === version) drift.push({ key, version, files: count });
  else unrecorded.push({ key, why: `version bumped ${prev.version}→${version}` });
}

if (UPDATE) {
  if (drift.length) {
    console.error('refusing to update — bump the version first:\n');
    for (const d of drift) console.error(`  WM_ASSET_VERSION.${d.key} is still ${d.version}, but its ${d.files} file(s) changed`);
    process.exit(1);
  }
  fs.writeFileSync(LOCK, JSON.stringify(next, null, 2) + '\n');
  console.log(`asset_version.lock.json updated (${Object.keys(next).length} keys).`);
  process.exit(0);
}

if (CHECK) {
  console.log(`violations: ${drift.length}`);
  for (const d of drift) console.log(`  WM_ASSET_VERSION.${d.key} is still ${d.version} but its ${d.files} file(s) changed — browsers will serve the stale cache`);
  if (!drift.length && unrecorded.length) for (const u of unrecorded) console.log(`  note: ${u.key} — ${u.why}; run tools/asset_version_check.js --update`);
  process.exit(0);
}

console.log('asset cache-version guard — content hash vs WM_ASSET_VERSION\n');
if (!drift.length && !unrecorded.length) console.log('clean — every version key matches its content.');
for (const d of drift) {
  console.log(`DRIFT  WM_ASSET_VERSION.${d.key} is still ${d.version}, but its ${d.files} file(s) changed.`);
  console.log(`       Browsers will keep serving the cached v=${d.version}. Bump it in wordmap.html,`);
  console.log(`       then run: node tools/asset_version_check.js --update\n`);
}
for (const u of unrecorded) console.log(`STALE-LOCK  ${u.key} — ${u.why}; run: node tools/asset_version_check.js --update`);
process.exit(drift.length ? 1 : 0);
