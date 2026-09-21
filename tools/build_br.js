#!/usr/bin/env node
/**
 * build_br.js — pre-compressed Brotli copies of the biggest shipped files.
 *
 * WHY. The host is nginx and now has ngx_brotli (2026-09-22). Dynamic brotli
 * runs at quality 5, because quality 11 costs 1.2 seconds of CPU on
 * wordmap.html and that cannot happen per request. Quality 11 done ahead of
 * time costs nothing per request and is 13-15% smaller again:
 *
 *     wordmap.html        221,863 -> 191,214
 *     hanmap.html         213,482 -> 184,156
 *     wordmap_data.js     165,291 -> 141,966
 *     word_labels.js      155,635 -> 132,847
 *     wordmap_meta_lite.js 179,145 -> 156,085
 *
 * `brotli_static on` in the nginx config serves <file>.br to any client that
 * accepts br, and falls back to compressing dynamically when there is none.
 *
 * WHY THE .br FILES ARE COMMITTED. Deployment is a bare `git pull`, so
 * whatever is in the repo is what the server serves. Generating them on the
 * server instead would mean a second command to remember, and nginx serves
 * <file>.br WITHOUT checking that it is newer than <file> — a forgotten
 * regeneration would serve the previous version of the page to every visitor,
 * silently, which is the same shape as the ?v=1 freeze. Committing them puts
 * the check where it can be enforced: br_freshness_check.js runs in
 * check_all.js, so a stale pair cannot be committed at all.
 *
 * WHICH FILES. Only those where quality 11 saves at least ~4 KB over the
 * quality 5 nginx would produce anyway. Every .br is a binary blob that
 * changes whenever its source does, and the small pages (index.html,
 * word_manifest.js, lang_names_shim.js) together save about 1.5 KB for
 * roughly 12 KB of churn per change. Not worth it.
 *
 * The per-language and per-word directories are deliberately absent:
 * lang_words/ alone is 1,188 files, they are small, and they are served
 * immutable behind ?v=, so the dynamic pass is fine for them.
 *
 * RUN IT LAST. bump_versions.js rewrites the ?v= numbers inside wordmap.html
 * and hanmap.html, so a .br built before it is stale the moment it finishes.
 *
 *   node tools/build_br.js           regenerate what changed
 *   node tools/build_br.js --check   report staleness, write nothing
 */

'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');

/** Sources that get a pre-compressed sibling. See WHICH FILES above. */
const FILES = [
    'wordmap.html',
    'hanmap.html',
    'wordmap_data.js',
    'word_labels.js',
    'wordmap_meta_lite.js',
    'lang-filter.js',
    'my-languages.js',
];

const QUALITY = 11;

/**
 * Is <file>.br the compressed form of <file>, right now?
 *
 * Answered by decompressing and comparing the bytes, not by a hash recorded
 * in a lock file. There is nothing to drift, and it catches a truncated or
 * corrupted .br as well as a stale one — which a lock keyed on the SOURCE
 * could not, because the source would still match.
 */
function isFresh(src, brPath) {
    if (!fs.existsSync(brPath)) return false;
    try {
        return zlib.brotliDecompressSync(fs.readFileSync(brPath)).equals(src);
    } catch {
        return false;
    }
}

function main() {
    const check = process.argv.includes('--check');
    const stale = [];
    let wrote = 0;
    let bytesSrc = 0;
    let bytesBr = 0;

    for (const rel of FILES) {
        const abs = path.join(ROOT, rel);
        if (!fs.existsSync(abs)) {
            console.log(`  MISSING SOURCE  ${rel}`);
            stale.push(rel);
            continue;
        }
        const src = fs.readFileSync(abs);
        const brPath = `${abs}.br`;

        if (isFresh(src, brPath)) {
            const n = fs.statSync(brPath).size;
            bytesSrc += src.length;
            bytesBr += n;
            if (!check) console.log(`  ok    ${rel}.br  ${n.toLocaleString()}`);
            continue;
        }

        stale.push(rel);
        if (check) continue;

        const out = zlib.brotliCompressSync(src, {
            params: {
                [zlib.constants.BROTLI_PARAM_QUALITY]: QUALITY,
                [zlib.constants.BROTLI_PARAM_SIZE_HINT]: src.length,
            },
        });
        fs.writeFileSync(brPath, out);
        wrote++;
        bytesSrc += src.length;
        bytesBr += out.length;
        console.log(`  BUILT ${rel}.br  ${src.length.toLocaleString()} -> ${out.length.toLocaleString()}`);
    }

    if (check) {
        console.log(`stale: ${stale.length}`);
        if (stale.length) {
            console.log(`  ${stale.join(', ')}`);
            console.log('  Run: node tools/build_br.js   (after bump_versions.js)');
        }
        process.exit(0);
    }

    console.log(`\n${FILES.length} files, ${wrote} rebuilt — `
        + `${bytesSrc.toLocaleString()} -> ${bytesBr.toLocaleString()} bytes`);
}

main();
