#!/usr/bin/env node
/* speakers_format_check.js — house style for the one-line meta.speakers figure.
 *
 * The info panel renders this as a single short line, so it holds a FIGURE,
 * not a citation. Detail (census years, sources, per-country breakdowns)
 * belongs in `description`.
 *
 * Rules for living languages:
 *   - magnitudes use ~ and K / M / B, never comma-grouped digits ("~12K", not "12,000")
 *   - ranges use an en dash and a shared suffix ("~12–15K", not "12,000-15,000" / "~12K-15K")
 *   - no prose hedges ("approximately", "about", "around") — the ~ says that
 *   - one clause: no ";"
 *   - short: <= 60 characters
 * Short qualifiers are welcome and encouraged: "~30 fluent", "~2K fluent + ~10K learners",
 * "~380M L1 + ~1.5B total (with L2)", "~5K (UNESCO: critically endangered)".
 *
 * Non-living languages carry a status phrase from a fixed vocabulary instead.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
global.window = {};
const store = {};
global.LANG_DATA = new Proxy(store, {
    get: (t, k) => { if (typeof k !== 'string') return t[k]; if (!(k in t)) t[k] = {}; return t[k]; },
    has: () => true,
});
// eslint-disable-next-line no-eval
eval(fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8'));

const NONLIVING = /^(Extinct|Historical|Reconstructed|Liturgical|Revived|Constructed|No native speakers|Unwritten)\b/;

function problems(s) {
    const out = [];
    if (/\d,\d{3}/.test(s)) out.push('comma-grouped digits — use ~NK / ~NM');
    if (/\b(approximately|approx\.?|about|around|roughly|estimated)\b/i.test(s)) out.push('prose hedge — use ~');
    // Wrong range separator: ASCII hyphen or em dash, INCLUDING when a
    // magnitude suffix sits between the figure and the dash ("600K-700K").
    // The digit-only form missed those and let 33 rows through (owner 2026-07-18).
    if (/\d\s*[KMB]?\s*[-—]\s*\d/.test(s)) out.push('ASCII hyphen / em dash in range — use en dash –');
    // A range may change magnitude ("~300K–1M"); it may not repeat one
    // ("~12K–15K" / "~600K-700K"). Catch a repeated suffix across ANY dash.
    const dup = s.match(/(\d)([KMB])\s*[-–—]\s*\d+(?:\.\d+)?([KMB])/);
    if (dup && dup[2] === dup[3]) out.push('range repeats the suffix — write ~12–15K');
    if (s.includes(';')) out.push('multi-clause — move detail to description');
    if (s.length > 60) out.push(`too long (${s.length} chars) — move detail to description`);
    if (/\bcensus\b/i.test(s) && s.length > 40) out.push('citation prose — move to description');
    return out;
}

const bad = [];
for (const [code, v] of Object.entries(store)) {
    const s = v.meta && v.meta.speakers;
    if (!s) continue;
    if (NONLIVING.test(s)) {
        if (s.length > 90) bad.push([code, s, ['non-living status too long — move detail to description']]);
        continue;
    }
    const p = problems(s);
    if (p.length) bad.push([code, s, p]);
}

// Exit 0 either way and report the count on stdout: check_all.js scrapes it.
console.log(`non-conforming: ${bad.length}`);
for (const [code, s, why] of bad) {
    console.log(`  ${code.padEnd(10)} ${why.join('; ')}\n${' '.repeat(13)}${JSON.stringify(s.slice(0, 130))}`);
}
if (!bad.length) console.log(`speakers format OK (${Object.keys(store).length} languages)`);
