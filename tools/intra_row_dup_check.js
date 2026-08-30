#!/usr/bin/env node
/*
 * intra_row_dup_check.js — find languages where two of the 25 concepts hold the
 * SAME surface form.
 *
 * This is the fingerprint of a bad bulk import: a word slides one cell over and
 * ends up in two places (Blackfoot "heart" held the dog word; Hopi "tree" held
 * the numeral one; Tiwi "mother" held the 1sg pronoun; Nuosu Yi "star" held the
 * dog glyph). It is NOT proof of an error — genuine polysemy is everywhere
 * (Wu 吃 covers drink and eat; Cia-Cia "hand" is the same word as "five"; many
 * languages greet and thank with the same phrase) — so this is a REPORTING
 * tool, not a gate. It exits 0 and prints candidates for a human to judge.
 *
 * Pairs that are polysemous often enough to be noise are suppressed by default.
 *
 * --check / --update: the ratchet. 245 candidates is a list nobody re-reads, so
 * the accepted set is frozen in intra_row_dup.lock.json and --check reports only
 * what is NEW since then. That turns "245 things to judge some day" into "3
 * things this batch added", which is the only version anyone acts on.
 *
 * This matters more than it used to. As of 2026-08-29 the concepts are being
 * filled from comparative datasets (ASJP, IDS, ABVD, NorthEuraLex, Polyglotta,
 * …) and those carry gloss slips: the agent filling `ear` found that ASJP's
 * "ear" for Wichí and for Kera was letter-for-letter each row's own `tooth`,
 * and that its "ear" for four Tibetic rows was their own `nose`. A form that
 * exactly equals another cell in the same row is the signature. Run --check
 * after every harvest batch.
 *
 * Usage:
 *   node tools/intra_row_dup_check.js            # full report
 *   node tools/intra_row_dup_check.js --all      # include the polysemy allowlist
 *   node tools/intra_row_dup_check.js --check    # print "violations: N" (new only)
 *   node tools/intra_row_dup_check.js --update   # accept the current set
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

global.window = {};
global.WORDS = {};
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter(f => f.endsWith('.js'))) {
    // eslint-disable-next-line no-eval
    eval(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'));
}

// Concept pairs that share a form in many unrelated languages — real polysemy,
// not import damage. Suppressed unless --all is passed.
const EXPECTED = new Set([
    'drink|eat',        // one verb for ingesting, very common
    'hello|thanks',     // one politeness formula
    'good|hello',       // "good (day)" as a greeting
    'love|good',        // 'like/good' overlap
    'sun|moon',         // rare but attested "heavenly body"; still worth a look
    'tree|hand',        // *kayu 'wood' vs branch — noisy in Austronesian
    'sun|fire',
    'heart|love',
]);

const norm = s => String(s || '').trim().toLowerCase().normalize('NFC');
const SHOW_ALL = process.argv.includes('--all');

const WIDS = Object.keys(WORDS).sort();
// Language codes are whatever the word tables key on — no need to load LANG_DATA.
const CODES = [...new Set(WIDS.flatMap(w => Object.keys(WORDS[w].data || {})))];
const hits = [];
for (const code of CODES) {
    const byForm = new Map();
    for (const w of WIDS) {
        const e = WORDS[w].data && WORDS[w].data[code];
        if (!e || !e[0]) continue;
        const s = norm(e[0]);
        if (!s || s === '—' || s === '-') continue;
        if (!byForm.has(s)) byForm.set(s, []);
        byForm.get(s).push(w);
    }
    for (const [form, words] of byForm) {
        if (words.length < 2) continue;
        for (let i = 0; i < words.length; i++) {
            for (let j = i + 1; j < words.length; j++) {
                const key = [words[i], words[j]].sort().join('|');
                if (!SHOW_ALL && EXPECTED.has(key)) continue;
                hits.push({ code, form, a: words[i], b: words[j] });
            }
        }
    }
}

// Group by concept pair so systematic patterns stand out from one-offs.
const byPair = {};
for (const h of hits) {
    const k = [h.a, h.b].sort().join(' = ');
    (byPair[k] ||= []).push(h);
}
const pairs = Object.entries(byPair).sort((x, y) => y[1].length - x[1].length);

// ---- ratchet ----
// 2026-08-29, second update: accepts li veer = four + we. South Limburgish has
// a set of pronouns ending in -r that no other Dutch variety has — heer, veer,
// geer — so its 'we' is veer, and its 'four' is veer as well (Dutch vier with
// the regular i > eː). Verified against Van Hout, "Limburgse voornaamwoorden".
// Genuine homophony, like the Tibeto-Burman ŋa set above.
// Lock updated 2026-08-29 to accept five more Tibeto-Burman *ŋa collisions —
// blk, lif, lis (twice) and tsj, where five, fish and 'I' are genuinely the
// same syllable. The lock already carried exactly this for my, rki, obr, lhu
// and ahk, so refusing the new four would have meant leaving four correct cells
// out to keep a number at zero. That is the failure mode a ratchet invites, and
// the reason each accepted entry should be justifiable rather than merely old.
// 2026-08-30: accepts xmf ბჟა = milk + sun, and the evidence is the sister
// language sitting in the same table. Georgian keeps მზე 'sun' and რძე 'milk'
// apart; Zan turns both into bʒa, and Laz — the other Zan language — shows the
// two halves separately, with ბჯა bdʒa for milk beside მჟორა mʒora for sun,
// where the sun word took a suffix and the milk word did not. Mingrelian let
// them fall together. So the collision is a fact about Mingrelian rather than
// about this atlas, and refusing it would have meant an empty cell to keep a
// counter at zero.
// Not accepted the same day, for the opposite reason: nxq (Naxi) milk no³³ from
// Sun's Tibeto-Burman database, which collides with that row's own 'you'. The
// doculect fails calibration — its water is dʑi³¹ where the row writes ggee
// /ɡɯ̄/, its eye is miə³¹ly³³ where the row writes nyi, its drink is thɯ³¹ where
// the row writes chil — so it is not this row's variety and its homophony says
// nothing about this row's. Left empty.
// 2026-08-30: accepts chr ᎠᎹ = salt + water. The Cherokee syllabary writes no
// vowel length and no tone, so the language's word for water and its word for
// salt are the same six strokes and are told apart by pitch alone — àmã́ against
// áːmã́ (Uchihara, A Reference Grammar of Oklahoma Cherokee, p. 57, via
// en.wiktionary's two etymologies at ᎠᎹ). The IPA fields differ; only the
// surfaces collide, which is the honest state of the writing system.
const LOCK = path.join(__dirname, 'intra_row_dup.lock.json');
const sig = (h) => `${h.code}|${[h.a, h.b].sort().join('|')}`;
const current = new Set(hits.map(sig));
if (process.argv.includes('--update')) {
    fs.writeFileSync(LOCK, JSON.stringify([...current].sort(), null, 0) + '\n');
    console.log(`accepted ${current.size} intra-row duplicates`);
    process.exit(0);
}
let known = new Set();
try { known = new Set(JSON.parse(fs.readFileSync(LOCK, 'utf8'))); } catch (_) {}
const fresh = hits.filter((h) => !known.has(sig(h)));
const gone = [...known].filter((k) => !current.has(k));
if (process.argv.includes('--check')) {
    console.log(`violations: ${fresh.length}`);
    if (gone.length) console.log(`stale: ${gone.length}`);
    process.exit(0);
}
if (fresh.length) {
    console.log(`\n⚠ NEW since the lock (${fresh.length}) — check each against the row's other cells:`);
    fresh.forEach((h) => console.log(`    ${h.code}  ${h.form}  = ${h.a} + ${h.b}`));
    console.log('');
}
if (gone.length) console.log(`(${gone.length} lock entries no longer match — run --update)\n`);

console.log(`intra-row duplicate surfaces: ${hits.length} across ${pairs.length} concept pairs`);
console.log('(informational — genuine polysemy is common; judge each one)\n');
for (const [pair, list] of pairs) {
    console.log(`  ${pair.padEnd(20)} ${String(list.length).padStart(3)}  ${list.slice(0, 8).map(h => `${h.code}:${h.form}`).join('  ')}${list.length > 8 ? ' …' : ''}`);
}
console.log(`\ncandidates: ${hits.length}`);
