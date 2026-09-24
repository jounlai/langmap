#!/usr/bin/env node
/*
 * implausible_polysemy_check.js — the narrow half of intra_row_dup_check.
 *
 * Its sibling reports every pair of concepts that share a surface inside one
 * row. That is 310 candidates, and a list of 310 is a list nobody re-reads:
 * the lock froze it in one `--update` and the report became wallpaper. The
 * proof is `foot = wheel`, which sat in the lock across ten unrelated rows —
 * Bari, Djambarrpuyngu, Fijian, Wayuu, Huli, Kikuyu, Lozi, Maasai, Hassaniya
 * Arabic and Samburu — all arriving in one commit (53ec1b47, 2026-08-31,
 * "harvested from two stalled agents"). Nobody had to judge them, so nobody
 * did.
 *
 * The fix is not a stricter gate. It is a POPULATION FILTER applied before the
 * lock rather than after it: most of those 310 are genuine polysemy and always
 * will be, so this tool only ever looks at the pairs where sharing a form is a
 * claim about the language rather than a commonplace.
 *
 * Two rules decide what counts as a claim:
 *
 *  1. CLOSED SETS. Two members of one closed semantic set — two numerals, two
 *     basic colours, two body parts, two kin terms, two personal pronouns, two
 *     things in the sky — very rarely share a word. When they do it is a real
 *     and interesting fact (Mansi пуӈк is head AND tooth because two Uralic
 *     roots fell together; Mingrelian ბჟა is milk AND sun; Mapudungun foro is
 *     bone AND tooth), which is exactly why it should be written down instead
 *     of assumed.
 *
 *  2. NAMED CROSS PAIRS. A short list of cross-set pairs that cannot be
 *     polysemy at all, each with its reason. A manufactured turning disc is
 *     not a body part.
 *
 * Everything the rules catch is then checked against ACCEPTED below, which is
 * this file's whole point: each entry carries the evidence that made it
 * genuine. An entry nobody can justify does not belong there, and the tool is
 * a worse tool the moment ACCEPTED becomes a place to put things.
 *
 * Usage:
 *   node tools/implausible_polysemy_check.js          # the open list
 *   node tools/implausible_polysemy_check.js --all    # including ACCEPTED
 *   node tools/implausible_polysemy_check.js --check  # "violations: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

global.window = {};
global.WORDS = {};
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js'))) {
    // eslint-disable-next-line no-eval
    eval(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'));
}

// ---- rule 1: the closed sets ----
// A set is closed when its members are mutually exclusive by definition, so a
// shared form is a merger rather than a shade of meaning. `leg` and `foot` sit
// in the body set together and genuinely do merge in many languages — the set
// does not assert they cannot, only that it is worth one look.
const SETS = {
    numeral: ['one', 'two', 'three', 'four', 'five', 'hundred', 'n99'],
    colour: ['black', 'white', 'red', 'green', 'blue'],
    body: ['head', 'eye', 'ear', 'nose', 'mouth', 'tooth', 'tongue', 'hand',
        'foot', 'leg', 'bone', 'heart', 'blood', 'hair'],
    kin: ['mother', 'father', 'daughter', 'son'],
    pronoun: ['i', 'we', 'you'],
    sky: ['sun', 'moon', 'star'],
};
const SET_OF = {};
for (const [k, v] of Object.entries(SETS)) for (const w of v) SET_OF[w] = k;

// ---- rule 2: cross-set pairs that are not polysemy ----
// Each needs a reason, and the reason is the entry. Adding a pair here without
// one makes this file exactly as unreadable as the lock it replaces.
const CROSS = {
    'foot|wheel': 'a manufactured turning disc is not a leg; where a language '
        + 'really says "the cart\'s foot" the cell wants the whole phrase, not '
        + 'the bare body part',
    'leg|wheel': 'same',
    'book|tooth': 'no shared etymology is plausible; the signature of a '
        + 'wordlist read one row off',
};

// ---- what has been judged, and on what evidence ----
// Keyed `concept|concept` for a whole pair, or `code:concept|concept` for one
// row. Prefer the row-level key: "this pair is fine everywhere" is a much
// stronger claim than it looks, and grue is the only one this atlas can make.
const ACCEPTED = {
    'blue|green': 'grue. A single term covering both is one of the most common '
        + 'colour systems on earth, and the atlas records the language rather '
        + 'than splitting it. 31 rows across Bantu, Uto-Aztecan, Algonquian, '
        + 'Athabaskan, Berber, Mayan, Iranian and Austronesian — the spread '
        + 'itself is the argument.',
    'black|blue': 'the dark end of the same macro-term, in Akan and Yoruba. '
        + 'Yoruba dúdú covers black and dark blue, and the indigo the language '
        + 'is famous for dyeing is named with it.',
    'i|we': 'rows whose 1sg and 1pl free pronouns are the same word, with '
        + 'number carried on the verb — five Iroquoian rows, Kiowa, Winnebago, '
        + 'Old Chinese and the Damin register. See the clusivity policy: a '
        + 'pronoun the language does not distinguish is not one this atlas '
        + 'invents.',
    'mns:head|tooth': 'Northern Mansi пуӈк is the regular reflex of two '
        + 'Proto-Uralic etyma that fell together, *päŋe "head" (Finnish pää) '
        + 'and *piŋi "tooth" (Finnish pii). Both cells are right; judged in '
        + 'full in intra_row_dup_check.js.',
    'arn:bone|tooth': 'Mapudungun foro is both, in every dictionary of it.',
    'nny:bone|tooth': 'Nyangga, from the same source that gives the row its '
        + 'other body parts; Australian languages commonly use one term.',
    'xmf:milk|sun': 'Mingrelian ბჟა. Georgian keeps მზე "sun" and რძე "milk" '
        + 'apart and Laz shows the two halves separately; Mingrelian let them '
        + 'fall together. Judged in full in intra_row_dup_check.js.',
    'li:four|we': 'South Limburgish veer is both — the -r pronoun series (heer, '
        + 'veer, geer) meets Dutch vier with the regular i > eː.',
    'jup:moon|sun': 'Hupdë, one term for the heavenly body, distinguished by '
        + 'context; the source glosses it that way.',
    'kwa:moon|sun': 'Dâw, as above and from the same survey.',
    'win:i|you': 'Winnebago; the row\'s pronouns come from one source that '
        + 'gives the same free form for both, number and person on the verb.',
    'win:we|you': 'as above.',
    'niu:bone|foot': 'Niuean ivi is the bone word and the source gives it for '
        + 'both; Polynesian body-part terms extend this way.',
    'blc:star|sun': 'Bella Coola, one source, one form for both luminaries.',

    // --- the foot = wheel class, audited 2026-09-24 ---
    // The guard was written around these ten rows and expected most of them to
    // be import damage. Nine were not. The bulk import that produced them
    // happened to land on languages that really do extend the foot word to the
    // wheel, and only Kikuyu was wrong — which is why the pair stays in CROSS
    // and each row gets its own entry instead of one blanket exemption.
    // (ki is not listed: its cell was corrected to kĩgaragari, so it no longer
    // matches. Benson 1964 files the wheel sense under the class-shifted
    // kĩgũrũ/mũgũrũ, not under kũgũrũ, and both Kikuyu Bibles say "kũgũrũ kwa
    // ngaari", a cart's LEG, with the 1965 Union Version writing "ta kwa",
    // "such as".)
    'fj:foot|wheel': 'Fijian yava. Gatty, Fijian-English Dictionary (2009), '
        + 'gives "yava-na 2. n. wheel" as its own numbered sense of the bare '
        + 'noun, with "yava ni lori" truck wheel and "yava ni motoka" '
        + 'motor-car wheel. Post-contact — Hazlewood 1890 has only "the feet" '
        + 'and no Wheel headword — but lexicalised now.',
    'loz:foot|wheel': 'Lozi lihutu. Jalla, Silozi-English Dictionary: "(ma-) '
        + 'n. (1) foot, leg, paw; (2) wheel (wagon, car, etc...) / lihutu la '
        + 'koloi, wagon wheel." Jalla also has the English loan "wili (li- or '
        + 'ma-) n. Eng. wheel" — a round-13 pass proposed it as a replacement '
        + '— but the dictionary files the concept under lihutu.',
    'mas:foot|wheel': 'Maasai ɛnkɛjʉ́. Payne & Ole-Kotikash, Maa Dictionary, '
        + 'sense 2: "Wheel or tyre of a vehicle, bicycle, etc."; the '
        + 'English-Maa index gives "wheel → ɛn-kɛjʉ́" with no competitor.',
    'saq:foot|wheel': 'Samburu nkɛjʉ́, the same entry in the same dictionary — '
        + 'its title covers Maasai AND Samburu, and sense 2\'s second example '
        + 'is the Samburu one, "nkɛjʉ́ ɛ́ nkárrì, tyre of a car (SN)".',
    'guc:foot|wheel': 'Wayuu ooʼui. SIL Wayuu dictionary (2019) sense 5 "tire '
        + '/ llanta (de carro)", English index "tire → ooʼui 5"; Captain & '
        + 'Captain (2005) give "ooʼui ... 4. llanta" and, the other way round, '
        + '"llanta n.f. ooʼui".',
    'djr:foot|wheel': 'Djambarrpuyŋu ḻuku. Zorc, Yolŋu-Matha Dictionary '
        + '(1986) p.163: "foot, feet, toe(s); footprint; [Ext] ... anchor; '
        + 'wheel, tyre", [Ext] being the dictionary\'s own "extension of '
        + 'meaning"; ratified in the CDU Yolŋu Matha Dictionary entry 4645. '
        + 'The synonym djalkiri shows the same extension and the dictionary '
        + 'has no loan for wheel at all.',
    'bfa:foot|wheel': 'Bari moköt (pl. mokosi). No dictionary reachable — Owen '
        + '1908 predates the wheel, Spagnolo 1960 is lending-restricted — but '
        + 'the Bari Bible uses the bare noun at FIRST mention, not only '
        + 'anaphorically: Ezekiel 10:9 "mokosi iŋwan ... moköt geleŋ gwon i '
        + 'merete lo keruba", four wheels, one wheel by one cherub, no vehicle '
        + 'named. Where a vehicle is named it is "moköt lo arabia", and arabia '
        + 'is the Arabic loan for the CART.',
    'mey:foot|wheel': 'Hassaniya كراع krāʕ. Elhoussein, Basic English-Hassaniya '
        + 'Dictionary p.93: "Wheel : Kraaᶜ (wata)", the lemma being kraaʕ with '
        + '"car" parenthesised as an optional specifier; the same book gives '
        + 'Foot : Kraaᶜ and Leg : Gaayma, so the pair really is foot-wheel. '
        + 'Peace Corps Mauritanian Arabic (1979) p.288: "tire → الكراع الواتة". '
        + 'Taine-Cheikh cannot be cited here — her dictionary never published '
        + 'the kāf volume.',
    'hui:foot|wheel': 'Huli ge, and the weakest of the ten. No lexicon was '
        + 'reachable; the Huli Bible uses bare ge at first mention — 1 Kings '
        + '7:30 "gene maria", four bronze wheels with no vehicle noun; Nahum '
        + '3:2; Exodus 14:25 — while Ezekiel\'s "garo ge" is the cart\'s wheel '
        + '(garo = cart, Numbers 7:7-8). Revisit if a Huli dictionary surfaces.',
};

const norm = (s) => String(s || '').trim().toLowerCase().normalize('NFC');
const SHOW_ALL = process.argv.includes('--all');

const WIDS = Object.keys(WORDS).sort();
const CODES = [...new Set(WIDS.flatMap((w) => Object.keys(WORDS[w].data || {})))];

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
                const [a, b] = [words[i], words[j]].sort();
                const pair = `${a}|${b}`;
                let why = null;
                if (SET_OF[a] && SET_OF[a] === SET_OF[b]) why = `both ${SET_OF[a]}`;
                else if (CROSS[pair]) why = CROSS[pair];
                if (!why) continue;
                const ok = ACCEPTED[pair] || ACCEPTED[`${code}:${pair}`];
                if (ok && !SHOW_ALL) continue;
                hits.push({ code, form, pair, why, accepted: !!ok });
            }
        }
    }
}

if (process.argv.includes('--check')) {
    console.log(`violations: ${hits.filter((h) => !h.accepted).length}`);
    process.exit(0);
}

const byPair = {};
for (const h of hits) (byPair[h.pair] ||= []).push(h);
const open = hits.filter((h) => !h.accepted).length;

console.log(`implausible shared forms: ${open} open`
    + (SHOW_ALL ? ` (${hits.length - open} accepted, shown)` : '')
    + `\n(a shared form here is a claim about the language — write the evidence`
    + ` into ACCEPTED, or fix the cell)\n`);
for (const [pair, list] of Object.entries(byPair).sort((x, y) => y[1].length - x[1].length)) {
    console.log(`  ${pair.replace('|', ' = ').padEnd(22)} ${String(list.length).padStart(3)}  ${list[0].why}`);
    for (const h of list) {
        console.log(`      ${h.accepted ? '·' : '?'} ${h.code.padEnd(8)} ${h.form}`);
    }
}
if (!open) console.log('  (nothing open)');
