#!/usr/bin/env node
/*
 * proto_form_leak_check.js — a reconstruction published as an attested word.
 *
 * The defect: someone needs a word for an ancient row, the row's own corpus
 * does not have one, the proto row directly above it in the file does — and
 * the proto form goes in with the asterisk and the prefix filed off. The cell
 * then reads as an attestation, usually with `evidence: 'direct'` beside it.
 *
 * Found on `pyx` (Pyu) on 2026-09-20, review 546, where thirteen cells cited a
 * work that does not exist ("Miyake 2024") and eleven held forms with zero
 * occurrences in the entire 7303-token Pyu corpus. Five were byte-identical to
 * LangMap's own p_sit row with * and prefix removed:
 *
 *     eye  mik  <- *s-mik      hand lak  <- *lak      star kar <- *s-kar
 *     tree siŋ  <- *siŋ        you  naŋ  <- *naŋ
 *
 * review_543 recommended this scan, review_546 recommended it again, and the
 * second time it was because the first recommendation had not been built.
 *
 * ONLY WHERE THE CORPUS CANNOT ANSWER BACK
 * ----------------------------------------
 * Within-family matching still printed 338, and they are almost all the normal
 * case: Balti and Dzongkha eye `mik` from *s-mik, Evenki `bi` from *bi, Irula
 * water `nīr` from *nīr. A LIVING language matching its reconstruction is the
 * reconstruction working. There is a speaker, a dictionary and a fieldworker
 * standing behind the cell, so the match tells you nothing.
 *
 * What made pyx different is that Pyu has roughly sixty securely glossed words
 * and no speakers. When a row's whole evidence base is a fragmentary corpus, a
 * form that matches the proto row exactly and appears nowhere in that corpus
 * has only one plausible origin. So the GATE is narrowed to rows whose
 * meta.languageKind is 'historical-attested' — extinct, corpus-only languages
 * where nobody can check a cell by asking. Everything else is still counted
 * and printed as a tally, and is available with --all, but it does not gate.
 *
 * WHY THIS NEEDS A LOCK FILE AND NOT A THRESHOLD
 * ----------------------------------------------
 * A daughter language keeping its proto form unchanged is not an error, it is
 * the single most ordinary thing in historical linguistics. Lithuanian, Old
 * Church Slavonic, Sanskrit, Gothic and Old Irish all sit close enough to
 * their reconstructions that exact matches are expected, and a reconstruction
 * is in any case BUILT from those forms — the match is the method working, not
 * a leak. So raw identity is a lead, never a verdict, and the only thing this
 * tool can do honestly is enumerate the leads once, let a human rule on each,
 * and then hold the line so that NEW ones surface.
 *
 * Everything in proto_form_leak.lock.json has been ruled on. A match not in
 * the lock is an error. Adding to the lock means writing down which of the two
 * it is:
 *
 *   "inherited"  the daughter genuinely has this form, attested, and it
 *                happens to equal the reconstruction. Normal.
 *   "circular"   the reconstruction is built on this very form, so of course
 *                they agree. Also normal, and worth marking separately
 *                because it means the cell supports the proto row rather than
 *                the other way round.
 *   "leak"       the cell has no independent attestation and the form came
 *                FROM the proto row. A defect that has not been fixed yet.
 *                Should be empty most of the time.
 *   "UNRULED"    seeded but not yet decided. Printed as a warning every run so
 *                it cannot quietly become the resting state. Sixteen are open
 *                as of review 546, on four rows: omx (Old Mon, whose IPA is in
 *                Proto-Austroasiatic house notation — implosive ɗaːk for
 *                inscriptional ḍāk), juc (five Tungusic-shaped cells with no
 *                evidence entry, on a row that elsewhere declares Manchu
 *                substitutions honestly as `proxy`), zkt (Khitan, only
 *                partially deciphered) and emy (Mayan forms written in modern
 *                orthography rather than an epigraphic transliteration).
 *
 * WHAT COUNTS AS A PROTO ROW
 * --------------------------
 * meta.languageKind === 'reconstructed-proto', plus any code matching /^p_/.
 * Both, because the field is only set on some rows and the prefix is only a
 * convention. A row that is one but not the other is reported at the bottom so
 * the two can be reconciled.
 *
 * ONLY WITHIN THE FAMILY
 * ----------------------
 * The first run of this compared every row against every proto row and printed
 * 426 matches, most of them noise of a very specific kind: Cebuano red `pula`
 * against Proto-Tungusic *pula, Ainu bone `pone` against Proto-Japonic *pone,
 * Bikol and Bahasa against Tungusic. Those are chance collisions between
 * unrelated families, and they crowd out the thing being looked for — nobody
 * reaches for the Proto-Tungusic row to fill an Austronesian cell, but people
 * do reach for Proto-Sino-Tibetan to fill Pyu.
 *
 * So a match only counts when the row belongs to a family the proto row is
 * ancestral to. That mapping has to be written out by hand (DESCENDANTS below)
 * because proto rows all carry family 'Proto-language', and because LangMap's
 * family field is granular in a way that puts Romance, Germanic, Slavic,
 * Celtic, Iranian, Indo-Aryan, Baltic, Hellenic and Anatolian at top level
 * rather than under Indo-European.
 *
 * STRIPPING
 * ---------
 * Deterministic and deliberately shallow: drop a leading '*', then drop any
 * number of leading single-segment prefixes written 'X-' or 'X.' (so *s-mik,
 * *r.miŋ and *d-kʷəy all yield their base). Nothing else is normalised — no
 * transcription folding, no diacritic stripping — because a match has to be
 * something a person could have produced by deleting characters, which is what
 * actually happened on pyx. Anything looser reports coincidence.
 *
 * Both the surface and the IPA column are compared, and a hit in either is
 * reported, because the pyx row put the stripped form in both.
 *
 * Usage:
 *   node tools/proto_form_leak_check.js            # report
 *   node tools/proto_form_leak_check.js --check    # print "violations: N"
 *   node tools/proto_form_leak_check.js --seed     # rewrite the lock (once)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const ALL = process.argv.includes('--all');
const SEED = process.argv.includes('--seed');
const LOCK = path.join(__dirname, 'proto_form_leak.lock.json');

function load() {
    const parts = ['this.window = this; var WORDS = this.WORDS = window.WORDS = {};'];
    parts.push(fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8'));
    for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')).sort())
        parts.push(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'));
    parts.push(fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8'));
    parts.push('this.LANG_DATA = LANG_DATA;');
    const ctx = vm.createContext({ console });
    vm.runInContext(parts.join('\n;\n'), ctx, { filename: 'wordmap-bundle.js' });
    return ctx;
}

const BLANK = (s) => !s || /^[\s—–\-?]*$/.test(String(s));
const cell = (c) => Array.isArray(c) ? [c[0], c[1]] : (c && typeof c === 'object' ? [c.form, c.ipa] : [c, '']);

/* '*s-mik' -> 'mik'. Leading star, then 'X-' / 'X.' prefixes, repeatedly. */
function strip(form) {
    let s = String(form || '').trim();
    if (!s.startsWith('*')) return null;         // only reconstructions
    s = s.slice(1);
    let prev;
    do { prev = s; s = s.replace(/^[^\s\-.]{1,2}[-.]/u, ''); } while (s !== prev && s);
    return s.trim() || null;
}

const ctx = load();
const { WORDS, LANG_DATA } = ctx;

/* Which coarse families each proto row is ancestral to. LangMap's family
 * field splits Indo-European across nine top-level labels, so IE is a list. */
const IE = ['Indo-European', 'Romance', 'Germanic', 'Slavic', 'Celtic', 'Iranian',
    'Indo-Aryan', 'Baltic', 'Hellenic', 'Anatolian', 'Paleo-Balkan'];
const DESCENDANTS = {
    p_sit:  ['Sino-Tibetan', 'Sinitic'],
    p_ine:  IE,
    p_toc:  IE,                       // Tocharian A/B carry 'Indo-European'
    p_tun:  ['Tungusic'],
    p_jpn:  ['Japonic'],
    p_ryu:  ['Japonic'],
    p_jpk:  ['Japonic', 'Koreanic'],
    p_kor:  ['Koreanic'],
    p_aav:  ['Austroasiatic'],
    p_viet: ['Austroasiatic'],
    p_dra:  ['Dravidian'],
    p_hmx:  ['Hmong-Mien'],
    // The eleven rows below use a `pXXX` spelling rather than `p_XXX` and were
    // invisible to the first version of this file for exactly that reason —
    // they matched on languageKind but had no DESCENDANTS entry, so nothing was
    // ever compared against them. Between them they cover Austronesian, Bantu,
    // Turkic and Uralic, which is a large share of the atlas.
    ptrk:   ['Turkic'],
    pmng:   ['Mongolic'],
    ptai:   ['Kra-Dai'],
    pafa:   ['Afro-Asiatic', 'Semitic', 'Cushitic'],
    psem:   ['Semitic', 'Afro-Asiatic'],
    pkar:   ['Kartvelian'],
    pmay:   ['Mayan'],
    puaz:   ['Uto-Aztecan'],
    pban:   ['Bantu', 'Atlantic-Congo', 'Niger-Congo'],
    pura:   ['Uralic'],
    paus:   ['Austronesian'],
};

const isProto = (code) => /^p_/.test(code) ||
    String(((LANG_DATA[code] || {}).meta || {}).languageKind || '') === 'reconstructed-proto';

const kind = (c) => String(((LANG_DATA[c] || {}).meta || {}).languageKind || '');
const gated = (c) => kind(c) === 'historical-attested';
const fam = (c) => String(((LANG_DATA[c] || {}).meta || {}).family || '?').split(' (')[0].trim();
const protoCodes = Object.keys(LANG_DATA).filter(isProto);
const unmapped = protoCodes.filter((c) => !DESCENDANTS[c]);
const byKind = protoCodes.filter((c) => !/^p_/.test(c));
const byPrefix = protoCodes.filter((c) => String(((LANG_DATA[c] || {}).meta || {}).languageKind || '') !== 'reconstructed-proto');

const hits = [];
for (const [id, w] of Object.entries(WORDS)) {
    const data = w.data || {};
    // stripped proto form -> [proto codes]
    const stripped = {};
    for (const p of protoCodes) {
        if (!data[p] || !DESCENDANTS[p]) continue;
        const [surf, ipa] = cell(data[p]);
        for (const v of [strip(surf), strip(ipa)]) {
            if (!v || BLANK(v)) continue;
            (stripped[v] = stripped[v] || new Set()).add(p);
        }
    }
    if (!Object.keys(stripped).length) continue;
    for (const [code, c] of Object.entries(data)) {
        if (isProto(code)) continue;
        const f = fam(code);
        const [surf, ipa] = cell(c);
        for (const [col, val] of [['surface', surf], ['ipa', ipa]]) {
            const v = String(val || '').trim();
            if (BLANK(v) || !stripped[v]) continue;
            // only a proto row this language actually descends from
            const rel = [...stripped[v]].filter((p) => DESCENDANTS[p].includes(f)).sort();
            if (!rel.length) continue;
            hits.push({ concept: id, code, col, form: v, protos: rel });
        }
    }
}
// one line per concept+code+form, surface preferred over ipa
const seen = new Set();
const uniq = hits.sort((a, b) => (a.col === 'surface' ? -1 : 1) - (b.col === 'surface' ? -1 : 1))
    .filter((h) => { const k = `${h.concept}|${h.code}|${h.form}`; if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => a.code.localeCompare(b.code) || a.concept.localeCompare(b.concept));

const key = (h) => `${h.code}|${h.concept}`;
const inGate = uniq.filter((h) => gated(h.code));
const outside = uniq.filter((h) => !gated(h.code));

if (SEED) {
    const lock = {};
    for (const h of inGate) lock[key(h)] = { form: h.form, proto: h.protos.join(','), ruling: 'UNRULED', note: '' };
    fs.writeFileSync(LOCK, JSON.stringify(lock, null, 2) + '\n');
    console.log(`seeded ${Object.keys(lock).length} entries into ${path.relative(ROOT, LOCK)}`);
    process.exit(0);
}

const lock = fs.existsSync(LOCK) ? JSON.parse(fs.readFileSync(LOCK, 'utf8')) : {};
const unlocked = inGate.filter((h) => !lock[key(h)]);
const drifted = inGate.filter((h) => lock[key(h)] && lock[key(h)].form !== h.form);
const stale = Object.keys(lock).filter((k) => !inGate.some((h) => key(h) === k));
const leaks = inGate.filter((h) => lock[key(h)] && lock[key(h)].ruling === 'leak');
const unruled = inGate.filter((h) => lock[key(h)] && lock[key(h)].ruling === 'UNRULED');
const violations = unlocked.length + drifted.length;

if (CHECK) { console.log(`violations: ${violations}`); process.exit(0); }

console.log(`Proto rows: ${protoCodes.length}  (matched by prefix and kind; ` +
    `${byKind.length} by languageKind only, ${byPrefix.length} by p_ prefix only)`);
console.log(`Cells byte-identical to a stripped proto form of their own family: ${uniq.length}`);
console.log(`  ${inGate.length} on corpus-only rows (gated), ${outside.length} on living rows (inheritance, informational)\n`);
const tally = {};
for (const h of inGate) tally[(lock[key(h)] || {}).ruling || 'UNLOCKED'] = (tally[(lock[key(h)] || {}).ruling || 'UNLOCKED'] || 0) + 1;
for (const [r, n] of Object.entries(tally).sort((a, b) => b[1] - a[1])) console.log(`  ${r.padEnd(10)} ${n}`);

if (unlocked.length) {
    console.log(`\n✗ ${unlocked.length} match(es) not in the lock — rule on each:`);
    for (const h of unlocked) console.log(`    ${h.code.padEnd(8)} ${h.concept.padEnd(10)} ${h.col.padEnd(7)} "${h.form}"  <- ${h.protos.join(' ')}`);
}
if (drifted.length) {
    console.log(`\n✗ ${drifted.length} locked match(es) whose form changed — re-rule:`);
    for (const h of drifted) console.log(`    ${h.code} ${h.concept}: lock says "${lock[key(h)].form}", data has "${h.form}"`);
}
if (unruled.length) {
    console.log(`\n⚠ ${unruled.length} in the lock but not yet ruled on (open work, not a gate):`);
    for (const h of unruled) console.log(`    ${h.code.padEnd(6)} ${h.concept.padEnd(8)} "${h.form}" — ${(lock[key(h)].note || '').split('.')[0]}.`);
}
if (leaks.length) {
    console.log(`\n⚠ ${leaks.length} ruled 'leak' and still in the data (a known defect, not a gate):`);
    for (const h of leaks) console.log(`    ${h.code} ${h.concept} "${h.form}" — ${lock[key(h)].note || '(no note)'}`);
}
if (stale.length) console.log(`\n· ${stale.length} lock entr(ies) no longer match anything — prune: ${stale.slice(0, 12).join(' ')}${stale.length > 12 ? ' …' : ''}`);
if (ALL && outside.length) {
    console.log(`\n· ${outside.length} match(es) on living rows — expected inheritance, not gated:`);
    for (const h of outside) console.log(`    ${h.code.padEnd(8)} ${h.concept.padEnd(10)} ${h.col.padEnd(7)} "${h.form}"  <- ${h.protos.join(' ')}`);
}
if (unmapped.length) console.log(`\n· proto row with no DESCENDANTS entry (never compared): ${unmapped.join(' ')}`);
if (byKind.length) console.log(`\n· proto by languageKind but not p_ prefix: ${byKind.join(' ')}`);
if (byPrefix.length) console.log(`· p_ prefix but languageKind not 'reconstructed-proto': ${byPrefix.join(' ')}`);

if (!violations) console.log('\nEvery proto-form match has been ruled on.');
process.exit(violations ? 1 : 0);
