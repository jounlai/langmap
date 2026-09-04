#!/usr/bin/env node
/*
 * trivia_style_check.js — enforce docs/trivia-writing-guide.md where it can be
 * enforced mechanically.
 *
 * The 2026-08-31 editorial pass was reviewed by diffing, not by reading, and
 * every real defect it left behind was invisible to a reader of any single
 * page: a date that survived in 18 languages and vanished from the 19th, a
 * button label still in English underneath Japanese prose, an invented
 * quotation with a real scholar's name on it. Those are the checks here.
 *
 * Style itself is judgment and is NOT failed on — the advisory section reports
 * densities and leaves the call to a person.
 *
 *   node tools/trivia_style_check.js            hard checks + advisories
 *   node tools/trivia_style_check.js --quiet    counts only
 *
 * Exit code is non-zero only for the hard checks (§1 of the guide).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.join(__dirname, '..');
const quiet = process.argv.includes('--quiet');

function load(file, key) {
    const c = vm.createContext({});
    vm.runInContext('var window=this;', c);
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), c, { filename: file });
    return vm.runInContext('window.' + key, c) || null;
}

/* Every article as { id, file, bodies: {ui: html}, titles: {ui: string} }.
   WordMap keeps English in the main file and the rest in per-UI overlays;
   HanMap keeps all 19 in one file. */
function corpus() {
    const out = [];
    for (const f of ['wordmap_trivia.js', 'hanmap_trivia.js']) {
        for (const a of load(f, 'TRIVIA_ARTICLES') || []) {
            out.push({ id: a.id, file: f, bodies: { ...(a.body || {}) }, titles: { ...(a.title || {}) } });
        }
    }
    const byId = {};
    for (const a of out) byId[a.id] = a;
    for (const f of fs.readdirSync(ROOT).filter(f => /^wordmap_trivia_.+\.js$/.test(f))) {
        const o = load(f, 'TRIVIA_I18N') || {};
        for (const ui of Object.keys(o)) {
            for (const id of Object.keys(o[ui])) {
                if (!byId[id]) continue;
                if (o[ui][id].body) byId[id].bodies[ui] = o[ui][id].body;
                if (o[ui][id].title) byId[id].titles[ui] = o[ui][id].title;
            }
        }
    }
    return out;
}

const text = s => String(s).replace(/<[^>]*>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ');
const buttons = s => [...String(s).matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
const headings = s => [...String(s).matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)].map(m => m[1].replace(/<[^>]*>/g, '').trim());

const arts = corpus();
const hard = [];
const advisory = [];

/* ── §1.1  Quotation marks mean verbatim ────────────────────────────────────
   A quotation attributed to a named person while admitting it is not that
   person's wording. "paraphrase", 意訳, 의역, 转述… all mean the same defect. */
// Japanese marks a paraphrase with 要約 / 大意 / より要約 as readily as with 意訳,
// and all five of the invented quotations this check failed to catch in
// wordmap_trivia.js's ja bodies used 要約 or 大意.
const FAKE = /(paraphrase|paraphrased|loosely quoted|意訳|要約|大意|パラフレーズ|의역|풀어 쓴|요약|转述|轉述|概括|diễn giải|parafrase|parafras|بإعادة صياغة)/i;

// A quotation with no nameable source at all — "a saying that spread during the
// 2020 protests" — is the same defect wearing different clothes: the reader
// cannot check it and it was not said by anyone in particular. Three of these
// survived in hanmap_trivia.js after the English was cleaned.
const ANON_SOURCE = /(で広まった言葉|중 퍼진 말|中流传的话语|中流傳的話語|a saying that spread|as the saying goes|流行語)/;
for (const a of arts) {
    for (const ui of Object.keys(a.bodies)) {
        const body = String(a.bodies[ui]);
        for (const m of body.matchAll(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g)) {
            if (FAKE.test(m[1])) hard.push(`${a.id}.${ui}: blockquote presented as a quotation but marked as a paraphrase — ${text(m[1]).slice(0, 90)}…`);
            else if (ANON_SOURCE.test(m[1])) hard.push(`${a.id}.${ui}: blockquote attributed to nobody in particular, so a reader cannot check it — ${text(m[1]).slice(0, 90)}…`);
        }

        // A translation carrying MORE blockquotes than its English source is the
        // signature of an English-only cleanup: the 2026-08-31 pass pulled ten
        // invented quotations out of English and the 17 overlays and left the
        // ja bodies in wordmap_trivia.js and three in hanmap_trivia.js untouched.
        if (ui !== 'en' && a.bodies.en) {
            const enQ = (String(a.bodies.en).match(/<blockquote/g) || []).length;
            const myQ = (body.match(/<blockquote/g) || []).length;
            if (myQ > enQ) hard.push(`${a.id}.${ui}: ${myQ} blockquote(s) against ${enQ} in English — a quotation the English no longer makes`);
        }
        // Same thing outside a blockquote: "…" followed by an attribution dash.
        for (const m of body.matchAll(/["“][^"”]{25,}["”]\s*(?:—|&mdash;|――|--)\s*([^<.]{0,80})/g)) {
            if (FAKE.test(m[1])) hard.push(`${a.id}.${ui}: quoted sentence attributed to a named source but marked as a paraphrase — …${m[1].trim().slice(0, 70)}`);
        }
    }
}

/* ── §1.2  Facts survive edits ──────────────────────────────────────────────
   Restricted to 4-DIGIT YEARS, and deliberately so. Larger figures are written
   differently in different languages — English "750,000" is 「75万」in Japanese
   and "750 mil" in Portuguese — and a check that flagged those would report
   hundreds of non-problems and be switched off within a week. A year is a year
   in all nineteen: 1543 is 1543 whether the sentence around it is Japanese,
   Hebrew or Swahili.

   Two different situations share this shape, and only one of them is a defect:

   This check is ADVISORY, and that was a correction. It began as a hard check
   on the theory that a year present in English and missing from one or two
   translations meant an edit had dropped it. Two things killed that theory.

   First, the regex was wrong in two ways and both fixes changed the answer:
   \d{4} could not see a thousands separator (Thai 「2,000 ปีก่อน」, Vietnamese
   "1.700"), and \b fails between "1200" and "km" in Japanese 「約1,200km」 where
   it holds in English's "1,200 km". Every finding before those fixes was
   suspect.

   Second, once they were fixed the findings were not edit slips at all. The
   HanMap translations are systematically shorter than their English — 235 of
   them run under 45% of the English length — so a year they skip is a
   translation that was never finished, not a fact somebody deleted. Filtering
   to bodies at full length still left only borderline cases.

   And the one real instance we know of ran the other way: kokugo-versus-kango
   lost 1543 from ENGLISH while all 18 translations kept it, which this check
   cannot see by construction. It was found by diffing against git.

   So: count it, name the few worth a look, and do not fail on it.

   The cut is at two, not four, and that was measured rather than guessed.
   Once the year regex was fixed (see below), 15 of 20 findings were "missing
   in exactly four" and the four were the same cluster every time — ar, es, he,
   it — which is a set of shorter translations, not an edit that dropped
   something. Only the 1-2 cases had the shape of a slip.
     missing in most or all        the English body has a fact the translations
                                   never had. Real work, but it is translation
                                   backlog, not a regression, and there are
                                   ~250 of them. ADVISORY, counted not listed. */
const years = s => {
    const out = new Set();
    // Collapse a thousands separator before matching. Thai writes the same year
    // as「2,000 ปีก่อนคริสตกาล」and Vietnamese as "1.700", and a bare \d{4}
    // match reported both as missing when the fact was plainly there — that is
    // how sumerian-first-writing.th was flagged as a dropped date it never
    // dropped. Only a separator followed by exactly three digits is collapsed,
    // so ordinary decimals are left alone.
    const flat = text(s).replace(/(\d)[,.\u00A0\u202F ](?=\d{3}(?!\d))/g, '$1');
    // Digit lookarounds, not \b: Japanese writes 「約1,200km」 with no space, and
    // \b fails between "1200" and "km" while it holds in English's "1,200 km".
    // That reported ja and ko as having dropped a figure both plainly carry.
    for (const m of flat.matchAll(/(?<!\d)(1[0-9]{3}|20[0-9]{2})(?!\d)/g)) out.add(m[1]);
    return out;
};
let yearBacklog = 0;
const backlogArts = new Set();
const yearNotable = [];
// A body that is much shorter than its English source is a summary, and a
// summary is *expected* to omit facts — flagging every year it skips buries the
// one case that matters. So a missing year only counts as a dropped fact when
// that body is otherwise a full translation. 0.6 of the English character count
// separates the two populations cleanly here; below it are the ar/he/it/es
// bodies that run 25-50% of the English and skip whole sentences.
const dense = s => String(s).replace(/<[^>]*>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s/g, '').length;
const FULL_ENOUGH = 0.6;
for (const a of arts) {
    const en = a.bodies.en;
    if (!en) continue;
    const want = years(en);
    const uis = Object.keys(a.bodies).filter(u => u !== 'en');
    if (!want.size || uis.length < 5) continue;
    const enLen = dense(en);
    const full = new Set(uis.filter(u => dense(a.bodies[u]) / enLen >= FULL_ENOUGH));
    for (const y of want) {
        const missing = uis.filter(u => !years(a.bodies[u]).has(y));
        if (!missing.length) continue;
        const fullMissing = missing.filter(u => full.has(u));
        yearBacklog++;
        backlogArts.add(a.id);
        if (fullMissing.length && fullMissing.length <= 2) {
            yearNotable.push(`${a.id}: ${y} missing from ${fullMissing.join(', ')}, which is otherwise a full-length translation`);
        }
    }
}

/* ── §1.3  Button labels are translated too ─────────────────────────────── */
for (const a of arts) {
    const en = buttons(a.bodies.en || '');
    if (!en.length) continue;
    for (const ui of Object.keys(a.bodies)) {
        if (ui === 'en') continue;
        const mine = buttons(a.bodies[ui]);
        const same = mine.filter((t, i) => en[i] !== undefined && t === en[i] && /[A-Za-z]{4}/.test(t));
        if (same.length) hard.push(`${a.id}.${ui}: ${same.length} button label(s) still in English — "${same[0].slice(0, 60)}"`);
    }
}

/* ── §5  Nineteen languages, not one (advisory) ─────────────────────────────
   Titles carrying an unhedged superlative, per language. When English reads 1
   and Japanese reads 14, the de-hyping was done in English only. Patterns are
   written for the six languages they can be written reliably for; the other
   thirteen are NOT checked and are named below so the gap is visible. */
const HYPE = {
    en:  /\b(the only|the most|one of the most|the world's|the greatest|the largest|never|nobody|no one)\b/i,
    ja:  /(世界最|最も|最大の|唯一|驚異|驚くべき|誰も|決して)/,
    ko:  /(세계 최|가장|유일|놀라운|아무도)/,
    zh:  /(世界最|最[大多强]|唯一|惊人|无人|沒有人|没有人)/,
    yue: /(世界最|最[大多強]|唯一|驚人|冇人)/,
    vi:  /(nhất thế giới|duy nhất|kinh ngạc|không ai)/i,
};
const UNCHECKED = ['th', 'id', 'hi', 'de', 'fr', 'it', 'es', 'pt', 'ru', 'uk', 'ar', 'he', 'sw'];
const hypeTitles = {};
for (const a of arts) {
    for (const ui of Object.keys(HYPE)) {
        if (a.titles[ui] && HYPE[ui].test(a.titles[ui])) (hypeTitles[ui] = hypeTitles[ui] || []).push(a.id);
    }
}

/* ── §2  Hedge density (advisory) ───────────────────────────────────────── */
const HEDGE = /\b(often|generally|typically|broadly|commonly|arguably|relatively|somewhat|tends? to|can be|may be|is (?:widely|often) (?:used|described|discussed|considered|regarded))\b/gi;
const hedged = [];
let hedgeTotal = 0, wordTotal = 0;
for (const a of arts) {
    const t = text(a.bodies.en || '');
    const w = t.split(' ').length;
    const h = (t.match(HEDGE) || []).length;
    hedgeTotal += h; wordTotal += w;
    if (w > 200) hedged.push({ id: a.id, per10k: h / w * 10000, h });
}
hedged.sort((x, y) => y.per10k - x.per10k);

/* ── §4  Headings whose claim needs checking against the body (advisory) ── */
const headHype = [];
for (const a of arts) {
    for (const h of headings(a.bodies.en || '')) {
        if (HYPE.en.test(h)) headHype.push(`${a.id}: “${h}”`);
    }
}

/* ── report ─────────────────────────────────────────────────────────────── */
if (!quiet) {
    console.log('Trivia style check — docs/trivia-writing-guide.md\n');
    console.log(`  §1 hard checks: ${hard.length} problem(s)`);
    for (const h of hard.slice(0, 40)) console.log('    ✗ ' + h);
    if (hard.length > 40) console.log(`    … and ${hard.length - 40} more`);

    console.log(`\n  §1.2 translation backlog (advisory): ${yearBacklog} year(s) the English body`);
    console.log(`       carries and some translation does not, across ${backlogArts.size} article(s).`);
    if (yearNotable.length) {
        console.log(`       Of those, ${yearNotable.length} sit in a body that is otherwise full length —`);
        console.log('       the likeliest to be a real omission rather than an unfinished translation:');
        for (const x of yearNotable.slice(0, 8)) console.log('         ' + x);
    }

    console.log(`\n  §2 hedge density (English): ${(hedgeTotal / wordTotal * 10000).toFixed(1)} per 10k words`);
    console.log('     heaviest articles:');
    for (const x of hedged.slice(0, 5)) console.log(`       ${x.per10k.toFixed(1)}/10k  (${x.h})  ${x.id}`);

    console.log(`\n  §4 English headings making a superlative claim — check the body still earns it: ${headHype.length}`);
    for (const h of headHype) console.log('       ' + h);

    console.log('\n  §5 titles with an unhedged superlative, by language:');
    for (const ui of Object.keys(HYPE)) {
        const n = (hypeTitles[ui] || []).length;
        console.log(`       ${ui.padEnd(4)} ${String(n).padStart(3)}${n ? '  e.g. ' + hypeTitles[ui].slice(0, 2).join(', ') : ''}`);
    }
    console.log(`       not checked (no pattern written): ${UNCHECKED.join(' ')}`);
    console.log('       A large gap between en and the rest means the pass was English-only.');
    console.log('');
}
console.log(`trivia style: hard problems: ${hard.length}`);
process.exitCode = hard.length ? 1 : 0;
