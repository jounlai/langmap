#!/usr/bin/env node
/**
 * route_era_check.js — a route-coloured word may not appear before its route did.
 *
 * The partial words are range maps: they colour only where the concept existed.
 * Review 448 removed Latin arantium and Old Irish oráiste on that ground, and
 * review 454 removed Ge'ez ብርቱካን — a word built on "Portugal", in a language
 * whose period the atlas gives as 1–10c, four centuries before the Portuguese
 * reached Ethiopia.
 *
 * The check is data-driven the same way the map is: WORDS[id].family[code] says
 * which route the cell belongs to, and each route has a date it could not
 * precede. So the only thing hard-coded here is the history, not the languages.
 *
 * Only rows carrying meta.period are considered — a living language has no
 * upper bound to violate.
 *
 * Usage: node tools/route_era_check.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// route -> the century the route itself begins, and why
const ROUTE_ERA = {
    orange: {
        naranj:   [10, 'the bitter orange reaches the Mediterranean with Arab trade'],
        portakal: [16, 'the sweet orange arrives on Portuguese ships'],
        china:    [16, 'likewise a post-Portuguese name (“China apple”)'],
    },
    tea: {
        cha:   [7,  'tea spreads overland from Tang China'],
        te:    [17, 'the Min maritime route, via the Dutch'],
    },
};

const wctx = vm.createContext({});
vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', wctx);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), wctx, { filename: f });
const lctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8').replace(/^const /gm, 'var '), lctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_meta_lite.js'), 'utf8'), lctx);
const LANG_DATA = vm.runInContext('LANG_DATA', lctx);

// "7cBCE–6cCE" / "15cBCE–21cCE" / "8–12c" -> the last century covered, CE, BCE negative
function endCentury(period) {
    const m = String(period).split(/[–—-]/);
    const last = (m[m.length - 1] || '').trim();
    const n = /(\d+)\s*c?\s*(BCE|CE)?/i.exec(last);
    if (!n) return null;
    return /BCE/i.test(n[2] || '') ? -Number(n[1]) : Number(n[1]);
}

const violations = [];
for (const [wid, routes] of Object.entries(ROUTE_ERA)) {
    const w = wctx.WORDS[wid];
    if (!w || !w.data || !w.family) continue;
    for (const [code, e] of Object.entries(w.data)) {
        const s = Array.isArray(e) ? e[0] : (e && e.form);
        if (!s || s === '—') continue;
        const route = w.family[code];
        const era = routes[route];
        if (!era) continue;
        const period = ((LANG_DATA[code] || {}).meta || {}).period;
        if (!period) continue;                       // living language, no upper bound
        const end = endCentury(period);
        if (end === null || end >= era[0]) continue;
        violations.push({ wid, code, s, route, period, need: era[0], why: era[1] });
    }
}

if (CHECK) {
    console.log(`violations: ${violations.length}`);
    for (const v of violations)
        console.log(`  ${v.wid} ${v.code} ${v.s} — route "${v.route}" starts ${v.need}c but the row ends ${v.period}`);
    process.exit(0);
}
console.log('route-era check — a route-coloured word cannot predate its route\n');
if (!violations.length) console.log('clean — every route cell sits inside a language that outlived the route.');
for (const v of violations)
    console.log(`  ${v.wid.padEnd(8)} ${v.code.padEnd(9)} ${v.s.padEnd(14)} route ${v.route} (${v.need}c: ${v.why}) vs period ${v.period}`);
console.log(`\n${violations.length} violation(s).`);
process.exit(violations.length ? 1 : 0);
