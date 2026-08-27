#!/usr/bin/env node
/**
 * slice_version_check.js — the per-UI slice loaders must ask for the same
 * version as the file they sit next to.
 *
 * Four pages now load a per-UI slice at runtime, and each tells its shim the
 * cache version through a function call rather than a <script src> attribute:
 *
 *     <script src="lang_names/en.js?v=152"></script>
 *     <script>window.__langNamesVersion(152); window.__langNamesBoot();</script>
 *
 * page_asset_version_check.js only sees the literal tag. The number inside the
 * call is invisible to it, and on 2026-08-26 the two had drifted on
 * wordmap.html — en.js was requested at v=151 while every other UI was still
 * asked for at v=143, so every non-English reader was served a stale cached
 * slice with nothing to say so. Moving the loader into the shim removed the
 * copy-paste, but the number is still written by hand on four pages.
 *
 * The same applies to __nmI18nVersion on namemap.html.
 *
 * Usage: node tools/slice_version_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// page -> [ the <script src> whose ?v= is authoritative, the call that must match ]
const PAIRS = [
    ['wordmap.html', /lang_names\/en\.js\?v=(\d+)/, /__langNamesVersion\((\d+)\)/, '__langNamesVersion'],
    ['index.html',   /lang_names\/en\.js\?v=(\d+)/, /__langNamesVersion\((\d+)\)/, '__langNamesVersion'],
    ['tree.html',    /lang_names\/en\.js\?v=(\d+)/, /__langNamesVersion\((\d+)\)/, '__langNamesVersion'],
    ['hanmap.html',  /lang_names\/en\.js\?v=(\d+)/, /__langNamesVersion\((\d+)\)/, '__langNamesVersion'],
    ['namemap.html', /namemap_i18n_shim\.js\?v=(\d+)/, /__nmI18nVersion\((\d+)\)/, '__nmI18nVersion'],
];

const violations = [];
for (const [page, tagRx, callRx, name] of PAIRS) {
    const p = path.join(ROOT, page);
    if (!fs.existsSync(p)) continue;
    const s = fs.readFileSync(p, 'utf8');
    const tag = tagRx.exec(s), call = callRx.exec(s);
    if (!call) continue;                       // page does not use the shim
    if (!tag) { violations.push({ page, name, msg: 'the call is there but the tag it should track is not' }); continue; }
    if (name === '__nmI18nVersion') continue;  // shim version is its own thing; checked below
    if (tag[1] !== call[1])
        violations.push({ page, name, msg: `${name}(${call[1]}) but the tag asks for ?v=${tag[1]}` });
}
// namemap_i18n/<ui>.js is fetched through document.write, so no <script src>
// literal exists for page_asset_version_check.js to lock on and NOTHING tracked
// the slice version at all. Hash the directory here instead: if its contents
// change and __nmI18nVersion is not bumped, every reader keeps the cached slice.
{
    const crypto = require('crypto');
    const dir = path.join(ROOT, 'namemap_i18n');
    const lockPath = path.join(__dirname, 'slice_version.lock.json');
    if (fs.existsSync(dir)) {
        const h = crypto.createHash('sha1');
        for (const f of fs.readdirSync(dir).sort()) h.update(f).update(fs.readFileSync(path.join(dir, f)));
        const hash = h.digest('hex').slice(0, 16);
        const s = fs.readFileSync(path.join(ROOT, 'namemap.html'), 'utf8');
        const call = /__nmI18nVersion\((\d+)\)/.exec(s);
        const version = call ? call[1] : null;
        const lock = fs.existsSync(lockPath) ? JSON.parse(fs.readFileSync(lockPath, 'utf8')) : {};
        if (process.argv.includes('--update')) {
            lock.namemap_i18n = { version, hash };
            fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
            console.log('slice_version.lock.json: namemap_i18n v=' + version);
        } else {
        const prev = lock.namemap_i18n;
        if (!prev) violations.push({ page: 'namemap.html', name: '__nmI18nVersion',
            msg: 'namemap_i18n/ not in the lock yet; run: node tools/slice_version_check.js --update' });
        else if (prev.hash !== hash && prev.version === version)
            violations.push({ page: 'namemap.html', name: '__nmI18nVersion',
                msg: `namemap_i18n/ changed but __nmI18nVersion is still ${version}` });
        }
    }
}

// countries.geojson (1.95 MB) is pulled by fetch(), not a <script src>, so no
// lock tracked it either — and tools/build_countries_geojson.js just tells the
// reader to "bump the ?v= in wordmap.html when you regenerate". Same hash test.
{
    const crypto = require('crypto');
    const f = path.join(ROOT, 'countries.geojson');
    const lockPath = path.join(__dirname, 'slice_version.lock.json');
    if (fs.existsSync(f)) {
        const hash = crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex').slice(0, 16);
        const s = fs.readFileSync(path.join(ROOT, 'wordmap.html'), 'utf8');
        const call = /countries\.geojson\?v=(\d+)/.exec(s);
        const version = call ? call[1] : null;
        const lock = fs.existsSync(lockPath) ? JSON.parse(fs.readFileSync(lockPath, 'utf8')) : {};
        if (process.argv.includes('--update')) {
            lock['countries.geojson'] = { version, hash };
            fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
        } else {
            const prev = lock['countries.geojson'];
            if (!prev) violations.push({ page: 'wordmap.html', name: 'countries.geojson',
                msg: 'countries.geojson not in the lock yet; run: node tools/slice_version_check.js --update' });
            else if (prev.hash !== hash && prev.version === version)
                violations.push({ page: 'wordmap.html', name: 'countries.geojson',
                    msg: `countries.geojson changed but its fetch is still ?v=${version}` });
        }
    }
}

// meta_i18n/<ui>.js + meta_i18n_engine.js are lazy-loaded by three pages.
// wordmap.html asks through assetUrl(), so its ?v= tracks the registry — but
// tree.html and hanmap.html have "?v=1" written into the string literal, and
// hanmap.html's own WM_ASSET_VERSION has no metaI18nEngine/metaI18nUi key to
// read (review 459). So those two pages would keep serving a cached slice
// after a regeneration while Word Map readers got the new one. Hash the set
// and hold the literal against it.
{
    const crypto = require('crypto');
    const dir = path.join(ROOT, 'meta_i18n');
    const engine = path.join(ROOT, 'meta_i18n_engine.js');
    const lockPath = path.join(__dirname, 'slice_version.lock.json');
    if (fs.existsSync(dir) && fs.existsSync(engine)) {
        const h = crypto.createHash('sha1');
        for (const f of fs.readdirSync(dir).sort()) h.update(f).update(fs.readFileSync(path.join(dir, f)));
        h.update(fs.readFileSync(engine));
        const hash = h.digest('hex').slice(0, 16);
        const vOf = (page) => {
            const src = fs.readFileSync(path.join(ROOT, page), 'utf8');
            const m = /meta_i18n\/' \+ ui \+ '\.js\?v=(\d+)/.exec(src);
            return m ? m[1] : null;
        };
        const tv = vOf('tree.html'), hv = vOf('hanmap.html');
        const version = tv;
        const lock = fs.existsSync(lockPath) ? JSON.parse(fs.readFileSync(lockPath, 'utf8')) : {};
        if (process.argv.includes('--update')) {
            lock.meta_i18n = { version, hash };
            fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');
            console.log('slice_version.lock.json: meta_i18n v=' + version);
        } else {
            if (tv && hv && tv !== hv) violations.push({ page: 'tree.html/hanmap.html', name: 'meta_i18n',
                msg: `meta_i18n/<ui>.js is asked for at ?v=${tv} on tree.html but ?v=${hv} on hanmap.html` });
            const prev = lock.meta_i18n;
            if (!prev) violations.push({ page: 'tree.html', name: 'meta_i18n',
                msg: 'meta_i18n/ not in the lock yet; run: node tools/slice_version_check.js --update' });
            else if (prev.hash !== hash && prev.version === version)
                violations.push({ page: 'tree.html + hanmap.html', name: 'meta_i18n',
                    msg: `meta_i18n/ changed but both pages still ask for ?v=${version}` });
        }
    }
}

if (process.argv.includes('--update')) { console.log('slice_version.lock.json updated.'); process.exit(0); }

if (CHECK) {
    console.log(`violations: ${violations.length}`);
    for (const v of violations) console.log(`  ${v.page}: ${v.msg}`);
    process.exit(0);
}
console.log('slice-loader version guard — the hand-written version must match its tag\n');
if (!violations.length) console.log('clean — every shim is told the version its own <script src> asks for.');
for (const v of violations) console.log(`  ${v.page.padEnd(14)} ${v.msg}`);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
