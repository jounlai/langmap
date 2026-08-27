#!/usr/bin/env node
/**
 * page_weight_check.js — how many bytes each page makes the reader download
 * before it can paint, and a ratchet so it cannot quietly grow.
 *
 * "Eager" here means what the HTML itself asks for: literal <script src> and
 * <link rel=stylesheet href>. Everything fetched later by loadTrivia(),
 * loadMetaI18n(), the per-word loader or the language slices is deliberately
 * out of scope — that machinery exists precisely to keep those bytes off the
 * first paint, and counting them would hide whether it is working.
 *
 * Measured 2026-08-27 (review 462), gzip -9:
 *
 *   hanmap.html    1,988 KB   <- hanmap_trivia.js alone is 943 KB of it
 *   index.html       941 KB   <- data.js 841 KB (100 sentences x 223 languages)
 *   wordmap.html     597 KB
 *   tree.html        231 KB
 *   namemap.html     124 KB
 *
 * The Han Map number is the outlier and the Word Map next door shows why: its
 * own comment says trivia is "decorative on the map … Fetch after `load` so
 * they never sit in front of first paint", and it also splits per UI
 * (wordmap_trivia.js is EN+JA, wordmap_trivia_<ui>.js loads on demand).
 * hanmap.html does neither — one eager tag carrying 40 articles in all 19 UIs.
 *
 * The lock records what each page weighs today. Growth beyond TOLERANCE fails;
 * a page that gets lighter is reported so the lock can be re-cut with --update.
 *
 * Usage: node tools/page_weight_check.js [--check] [--update]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.resolve(__dirname, '..');
const LOCK = path.join(__dirname, 'page_weight.lock.json');
const CHECK = process.argv.includes('--check');
const UPDATE = process.argv.includes('--update');
const PAGES = ['index.html', 'wordmap.html', 'hanmap.html', 'namemap.html', 'tree.html'];
const TOLERANCE = 1.05;   // 5% headroom for ordinary edits

const gz = (buf) => zlib.gzipSync(buf, { level: 9 }).length;

function weigh(page) {
    const f = path.join(ROOT, page);
    if (!fs.existsSync(f)) return null;
    const src = fs.readFileSync(f, 'utf8');
    let total = gz(Buffer.from(src, 'utf8'));
    const parts = [[page, total]];
    const urls = [];
    for (const m of src.matchAll(/<script[^>]+src=["']([^"']+)["']/g)) urls.push(m[1]);
    for (const m of src.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/g)) urls.push(m[1]);
    for (const m of src.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']stylesheet["']/g)) urls.push(m[1]);
    const seen = new Set();
    for (const u of urls) {
        if (/^https?:|^data:/.test(u)) continue;
        const rel = u.split('?')[0].replace(/^\//, '');
        if (seen.has(rel)) continue;
        seen.add(rel);
        const p = path.join(ROOT, rel);
        if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) continue;
        const n = gz(fs.readFileSync(p));
        parts.push([rel, n]);
        total += n;
    }
    parts.sort((a, b) => b[1] - a[1]);
    return { total, parts };
}

const now = {};
for (const p of PAGES) { const w = weigh(p); if (w) now[p] = w; }

if (UPDATE) {
    const lock = {};
    for (const [p, w] of Object.entries(now)) lock[p] = w.total;
    fs.writeFileSync(LOCK, JSON.stringify(lock, null, 2) + '\n');
    console.log('page_weight.lock.json updated:');
    for (const [p, n] of Object.entries(lock)) console.log('  ' + p.padEnd(15) + (n / 1024).toFixed(1) + ' KB gz');
    process.exit(0);
}

const lock = fs.existsSync(LOCK) ? JSON.parse(fs.readFileSync(LOCK, 'utf8')) : null;
const violations = [];
const lighter = [];
if (lock) {
    for (const [p, w] of Object.entries(now)) {
        const was = lock[p];
        if (was == null) { violations.push(`${p} is not in the lock — run: node tools/page_weight_check.js --update`); continue; }
        if (w.total > was * TOLERANCE)
            violations.push(`${p} eager first paint grew ${(w.total / 1024).toFixed(1)} KB vs ${(was / 1024).toFixed(1)} KB locked (+${(100 * (w.total / was - 1)).toFixed(1)}%)`);
        else if (w.total < was * 0.95) lighter.push(`${p} is ${(100 * (1 - w.total / was)).toFixed(1)}% lighter than the lock`);
    }
} else {
    violations.push('page_weight.lock.json missing — run: node tools/page_weight_check.js --update');
}

if (CHECK) {
    console.log(`violations: ${violations.length}`);
    for (const v of violations) console.log('  ' + v);
    for (const l of lighter) console.log('  note: ' + l + ' — re-cut with --update');
    if (!violations.length) {
        const heaviest = Object.entries(now).sort((a, b) => b[1].total - a[1].total)[0];
        console.log(`  heaviest: ${heaviest[0]} ${(heaviest[1].total / 1024).toFixed(0)} KB gz`);
    }
    process.exit(0);
}
console.log('page weight — bytes the HTML asks for before first paint (gzip -9)\n');
for (const [p, w] of Object.entries(now).sort((a, b) => b[1].total - a[1].total)) {
    console.log(`  ${p.padEnd(15)} ${(w.total / 1024).toFixed(1).padStart(8)} KB gz` + (lock && lock[p] != null ? `   (locked ${(lock[p] / 1024).toFixed(1)} KB)` : ''));
    for (const [n, s] of w.parts.slice(0, 3)) console.log(`        ${(s / 1024).toFixed(1).padStart(8)} KB  ${n}`);
}
console.log('');
for (const v of violations) console.log('  ' + v);
for (const l of lighter) console.log('  note: ' + l);
if (!violations.length) console.log('within the locked budgets.');
process.exit(violations.length ? 1 : 0);
