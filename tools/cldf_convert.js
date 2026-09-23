#!/usr/bin/env node
/**
 * cldf_convert.js — learn a row's surface→IPA correspondence from the cells
 * it already holds, then use it to convert CLDF candidates.
 *
 * WHY. cldf_row_sheet.js removed the cost of FINDING candidates; this removes
 * the cost of CONVERTING them. Both are needed, because 2,381 (row, concept)
 * pairs at a dozen minutes of hand-measurement per row is not a job anyone
 * finishes. The measurement is mechanical — Tuvaluan g is ŋ, Masaaba kh is
 * kʰ, Sangu ng is ŋɡ — and every one of those facts is sitting in the row's
 * own cells, stated dozens of times.
 *
 * HOW. Align each existing (surface, IPA) pair with a Levenshtein alignment,
 * read the aligned runs off as surface-segment → IPA-segment, and count them.
 * A segment is USABLE only when the row is unanimous about it: every
 * occurrence maps the same way. "ng" appearing once as ŋ and once as ŋɡ makes
 * ng unusable, which is the correct answer — it is what stopped Sangu's si
 * by hand, where pasilo paʃilo and umwesi umwesi disagree.
 *
 * A candidate converts only when a greedy longest-match run over it consumes
 * every character with unanimous segments. Anything else is reported as
 * blocked, with the offending characters named. There is no guessing step and
 * no fallback: the tool would rather return nothing than a plausible cell.
 *
 * WHAT IT STILL WILL NOT DO. It cannot know that Sasak biwih is the lips, or
 * that Salar ɑʁzi is possessed, or that a Bantu -domo is the wrong body part.
 * The semantic triage in words/mouth.js is still a person's job; this only
 * guarantees that a form, once accepted, is written the way the row writes.
 *
 *   node tools/cldf_convert.js myx            what the row's table looks like
 *   node tools/cldf_convert.js myx --apply    print cells ready to paste
 *   node tools/cldf_convert.js --scan 60      rows ranked by convertible count
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');

/** A surface token is a run of the SAME letter, so a doubled vowel stays
 *  whole: kamaatsi is k a m aa t s i. Without this the aligner splits
 *  aa→aː into a→a and a→ː and then calls every `a` in the row ambiguous. */
function surfaceTokens(s) {
    const out = [];
    for (const ch of s) {
        if (out.length && out[out.length - 1][0] === ch) out[out.length - 1] += ch;
        else out.push(ch);
    }
    return out;
}

/** An IPA token is a base character plus whatever rides on it — length,
 *  aspiration, nasalisation, tone letters, combining marks. */
const IPA_RIDER = /[\u02D0\u02D1\u02B0\u02B2\u02B7\u02E0\u02E4\u0303\u0301\u0300\u0302\u030C\u031A\u0325\u032A\u0348\u02E5-\u02E9\u02BC\u02C8\u02CC]/;
function ipaTokens(s) {
    const out = [];
    for (const ch of s) {
        if (out.length && IPA_RIDER.test(ch)) out[out.length - 1] += ch;
        else out.push(ch);
    }
    return out;
}

/** Levenshtein alignment, returning aligned (a-segment, b-segment) runs. */
function align(a, b) {
    const A = Array.isArray(a) ? a : [...a], B = Array.isArray(b) ? b : [...b];
    const n = A.length, m = B.length;
    const d = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
    for (let i = 0; i <= n; i++) d[i][0] = i;
    for (let j = 0; j <= m; j++) d[0][j] = j;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            d[i][j] = Math.min(
                d[i - 1][j] + 1,
                d[i][j - 1] + 1,
                d[i - 1][j - 1] + (A[i - 1] === B[j - 1] ? 0 : 1));
        }
    }
    // Walk back, collecting runs: a match flushes the pending mismatch run.
    const ops = [];
    let i = n, j = m;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && A[i - 1] === B[j - 1] && d[i][j] === d[i - 1][j - 1]) {
            ops.push(['=', A[i - 1], B[j - 1]]); i--; j--;
        } else if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + 1) {
            ops.push(['~', A[i - 1], B[j - 1]]); i--; j--;
        } else if (i > 0 && d[i][j] === d[i - 1][j] + 1) {
            ops.push(['~', A[i - 1], '']); i--;
        } else {
            ops.push(['~', '', B[j - 1]]); j--;
        }
    }
    ops.reverse();
    // Group consecutive non-matches into one segment pair.
    const runs = [];
    let sa = '', sb = '';
    for (const [kind, x, y] of ops) {
        if (kind === '=') {
            if (sa || sb) { runs.push([sa, sb]); sa = sb = ''; }
            runs.push([x, y]);
        } else { sa += x; sb += y; }
    }
    if (sa || sb) runs.push([sa, sb]);
    return runs;
}

/* A row that marks STRESS cannot be converted mechanically. Stress is not a
   grapheme correspondence — it depends on where the syllables fall — so the
   aligner attaches ˈ to whatever consonant happens to follow it and then
   reproduces it in the wrong place. Left unguarded this produced Spanish sea
   mar → maˈɾ, a stress mark on a monosyllable, which the atlas has a guard
   against, and Cora tyényi → tˈjenˈji, which is simply nonsense. Such rows
   are reported and skipped; their conversions need a person. */
function marksStress(lang) {
    let withMark = 0, total = 0;
    for (const e of Object.values(lang.words || {})) {
        if (!e || !e[1]) continue;
        total++;
        if (/[\u02C8\u02CC]/.test(e[1])) withMark++;
    }
    return total > 0 && withMark > 0;
}

/* A row that writes Chao tone letters will not take a toneless candidate:
   check_all's tone-policy guard counts that as a violation and it is right
   to. Blang was the case — a Chao row, and the dataset's klai and kaiŋ carry
   no tone at all, so two cells went in and had to come straight back out.
   The dataset simply does not hold what that row needs. */
function writesChaoTone(lang) {
    let withTone = 0, total = 0;
    for (const e of Object.values(lang.words || {})) {
        if (!e || !e[1]) continue;
        total++;
        if (/[\u02E5-\u02E9]/.test(e[1])) withTone++;
    }
    return total >= 10 && withTone / total >= 0.15;
}

function learn(lang) {
    const seen = new Map();          // surface segment -> Map(ipa segment -> count)
    for (const e of Object.values(lang.words || {})) {
        if (!e || !e[0] || e[0] === '—' || !e[1]) continue;
        const s = e[0], p = e[1];
        // Skip cells whose surface is not the same script as a Latin-ish IPA:
        // a Han or Arabic surface teaches nothing about letter correspondence.
        if (!/[a-zA-Z]/.test(s)) continue;
        for (const [x, y] of align(surfaceTokens(s), ipaTokens(p))) {
            if (!x) continue;                       // pure insertion: not a rule
            if (!seen.has(x)) seen.set(x, new Map());
            const m = seen.get(x);
            m.set(y, (m.get(y) || 0) + 1);
        }
    }
    const table = new Map();
    const ambiguous = new Map();
    for (const [x, m] of seen) {
        if (m.size === 1) table.set(x, [...m.keys()][0]);
        else ambiguous.set(x, [...m.entries()].sort((a, b) => b[1] - a[1]));
    }
    return { table, ambiguous };
}

/* Every two-letter sequence in a candidate must be one the row has actually
   written. Without this, a row that happens to know k and h separately will
   silently accept an unknown kh: Sangu has no kh anywhere and still converted
   ilikhakha as identity, because the greedy match fell back to single
   letters. An unattested bigram means the row has never had to decide what
   that sequence sounds like, so the tool has no business deciding either. */
/* Only sequences that a language might treat as ONE sound are worth this
   check. Requiring every bigram to be attested was far too strict — a row
   holds fifty words, so most legitimate pairs have simply never come up, and
   it cut the automatic slice from 115 cells to 35. These are the shapes that
   actually hide a digraph: a consonant plus h, n plus g or y, and a
   consonant plus y. */
const DIGRAPH_RISK = /^(?:[bcdfghjklmnpqrstvwxz]h|n[gy]|[bdfgklmnpstvz]y|ts|dz|tl|kw|gw|ph|ng|qh|xh)$/;

function bigrams(lang) {
    const set = new Set();
    for (const e of Object.values(lang.words || {})) {
        if (!e || !e[0] || e[0] === '\u2014') continue;
        const s = e[0].toLowerCase();
        for (let i = 0; i + 1 < s.length; i++) set.add(s.slice(i, i + 2));
    }
    return set;
}

/** Greedy longest-match. Returns the IPA, or null plus the blocking chars. */
function convert(form, table, known, chaoRow) {
    if (chaoRow && !/[\u02E5-\u02E9]/.test(form) && !/[0-9]/.test(form)) {
        return { ipa: null, blocked: ['no tone, and this row writes Chao'] };
    }
    if (known) {
        const f = form.toLowerCase();
        const bad = [];
        for (let i = 0; i + 1 < f.length; i++) {
            const bg = f.slice(i, i + 2);
            if (DIGRAPH_RISK.test(bg) && !known.has(bg)) bad.push(bg);
        }
        if (bad.length) return { ipa: null, blocked: [...new Set(bad)] };
    }
    return convertInner(form, table);
}

function convertInner(form, table) {
    const keys = [...table.keys()].sort((a, b) => b.length - a.length);
    let out = '', i = 0;
    const blocked = new Set();
    while (i < form.length) {
        let hit = null;
        for (const k of keys) {
            if (k && form.startsWith(k, i)) { hit = k; break; }
        }
        if (!hit) { blocked.add(form[i]); i++; continue; }
        out += table.get(hit);
        i += hit.length;
    }
    return blocked.size ? { ipa: null, blocked: [...blocked] } : { ipa: out, blocked: [] };
}

/* The index, built ONCE. Shelling out to cldf_row_sheet.js per row cost five
   seconds a row and turned a scan of 344 rows into half an hour. */
let INDEX = null;
function buildIndex(data) {
    if (INDEX) return INDEX;
    const concepts = fillingIn();
    const isoTo = new Map(), needs = new Map();
    for (const [code, lang] of Object.entries(data.langs)) {
        const gap = new Set();
        for (const c of concepts) {
            const cell = (lang.words && lang.words[c] && lang.words[c][0]) || '';
            if (!cell || cell === '\u2014') gap.add(c);
        }
        needs.set(code, gap);
        const iso = (lang.meta && lang.meta.iso6393) || '';
        if (!iso) continue;
        if (!isoTo.has(iso)) isoTo.set(iso, []);
        isoTo.get(iso).push(code);
    }
    const sheet = new Map();
    for (const file of fs.readdirSync(LB).filter((f) => f.endsWith('_parameters.csv'))) {
        const ds = file.replace('_parameters.csv', '');
        let params, langs, forms;
        try {
            params = parseCsv(path.join(LB, file));
            langs = parseCsv(path.join(LB, `${ds}_languages.csv`));
            forms = parseCsv(path.join(LB, `${ds}_forms.csv`));
        } catch { continue; }
        const pidTo = new Map();
        for (const p of params) {
            const g = ((p.Concepticon_Gloss || p.Name || '').trim()).toLowerCase();
            if (concepts.has(g)) pidTo.set(p.ID, g);
        }
        if (!pidTo.size) continue;
        const isoOf = new Map();
        for (const l of langs) {
            const iso = (l.ISO639P3code || l.Iso || '').trim();
            if (iso) isoOf.set(l.ID, iso);
        }
        for (const f of forms) {
            const concept = pidTo.get(f.Parameter_ID);
            if (!concept) continue;
            const iso = isoOf.get(f.Language_ID);
            if (!iso || !isoTo.has(iso)) continue;
            const form = (f.Form || f.Value || '').trim();
            if (!form) continue;
            for (const code of isoTo.get(iso)) {
                if (!needs.get(code).has(concept)) continue;
                if (!sheet.has(code)) sheet.set(code, new Map());
                const byC = sheet.get(code);
                if (!byC.has(concept)) byC.set(concept, new Set());
                byC.get(concept).add(form);
            }
        }
    }
    INDEX = sheet;
    return sheet;
}

function sheetFor(code, data) {
    const byC = buildIndex(data).get(code);
    if (!byC) return [];
    return [...byC].sort().map(([concept, forms]) => [concept, [...forms]]);
}

const LB = process.env.CLDF_DIR
    || path.join(process.env.HOME || '', 'langmap-work', 'lb');

function parseCsv(file) {
    const text = fs.readFileSync(file, 'utf8');
    const rows = [];
    let cur = [], val = '', inQuote = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (inQuote) {
            if (c === '"') { if (text[i + 1] === '"') { val += '"'; i++; } else { inQuote = false; } }
            else { val += c; }
        } else if (c === '"') { inQuote = true; }
        else if (c === ',') { cur.push(val); val = ''; }
        else if (c === '\n') { cur.push(val); rows.push(cur); cur = []; val = ''; }
        else if (c !== '\r') { val += c; }
    }
    if (val !== '' || cur.length) { cur.push(val); rows.push(cur); }
    const head = rows.shift() || [];
    return rows.filter((r) => r.length > 1)
        .map((r) => Object.fromEntries(head.map((k, j) => [k, r[j]])));
}

function fillingIn() {
    const src = fs.readFileSync(path.join(ROOT, 'validate_wordmap_data.js'), 'utf8');
    const m = src.match(/const FILLING_IN = new Set\(\[([\s\S]*?)\]\)/);
    return new Set([...m[1].matchAll(/'([a-z0-9_]+)'/g)].map((x) => x[1]));
}

function main() {
    const args = process.argv.slice(2);
    const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/wordmap_seo.json'), 'utf8'));

    if (args.includes('--scan')) {
        const n = Number(args[args.indexOf('--scan') + 1]) || 40;
        const out = [];
        for (const code of buildIndex(data).keys()) {
            const lang = data.langs[code]; if (!lang) continue;
            if (marksStress(lang)) continue;
            const { table } = learn(lang);
            if (table.size < 8) continue;
            const known = bigrams(lang); const chao = writesChaoTone(lang);
            let ok = 0;
            for (const [, forms] of sheetFor(code, data)) {
                if (forms.length !== 1) continue;
                const r = convert(forms[0], table, known, chao);
                if (r.ipa) ok++;
            }
            if (ok) out.push([ok, code, lang.name]);
        }
        out.sort((a, b) => b[0] - a[0]);
        console.log(`rows with cleanly convertible candidates: ${out.length}`);
        console.log(`cells they would yield: ${out.reduce((s, r) => s + r[0], 0)}\n`);
        for (const [k, code, name] of out.slice(0, n)) {
            console.log(`  ${String(k).padStart(3)}  ${code.padEnd(10)}${(name || '').slice(0, 30)}`);
        }
        return;
    }

    const code = args.find((a) => !a.startsWith('--'));
    if (!code) { console.error('usage: cldf_convert.js <code> [--apply] | --scan N'); process.exit(2); }
    const lang = data.langs[code];
    if (!lang) { console.error(`no row ${code}`); process.exit(1); }
    const { table, ambiguous } = learn(lang);
    if (marksStress(lang) && !args.includes('--force')) {
        console.log(`${code}  ${lang.name}\n\nThis row marks stress, so mechanical conversion is unsafe — see marksStress().\nUse --force to see the table anyway, but place ˈ by hand.`);
        return;
    }

    if (!args.includes('--apply')) {
        console.log(`${code}  ${lang.name}\n`);
        console.log(`LEARNED (${table.size} unanimous segments)`);
        const interesting = [...table].filter(([k, v]) => k !== v);
        console.log('  ' + (interesting.map(([k, v]) => `${k}→${v || '∅'}`).join('  ') || '(all identity)'));
        if (ambiguous.size) {
            console.log(`\nAMBIGUOUS, so unusable (${ambiguous.size})`);
            for (const [k, v] of ambiguous) {
                console.log(`  ${k} → ${v.map(([y, n]) => `${y || '∅'}×${n}`).join('  ')}`);
            }
        }
    }

    console.log(`${args.includes('--apply') ? '' : '\n'}CANDIDATES`);
    for (const [concept, forms] of sheetFor(code, data)) {
        if (forms.length !== 1) {
            if (!args.includes('--apply')) console.log(`  ${concept.padEnd(11)}(${forms.length} candidates — resolve by hand)`);
            continue;
        }
        const r = convert(forms[0], table, bigrams(lang), writesChaoTone(lang));
        if (r.ipa) console.log(`    ${code}: ["${forms[0]}", "${r.ipa}"],   // ${concept}`);
        else if (!args.includes('--apply')) console.log(`  ${concept.padEnd(11)}BLOCKED ${forms[0]} — no rule for ${r.blocked.join(' ')}`);
    }
}

main();
