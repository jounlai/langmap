#!/usr/bin/env node
/*
 * neighbour_concept_check.js — a cell holding the NEIGHBOURING CONCEPT's word.
 *
 * Not "this row was copied from that row" (provenance_scan.js) and not "these
 * two cells are identical" (intra_row_dup_check.js, row_dup_check.js,
 * cross_row_consistency_check.js all already print that). This is the defect
 * those three cannot separate from polysemy: ONE row, TWO concepts, and the
 * word in the wrong one of them.
 *
 * Confirmed instances, every one found by accident:
 *   nmf   hand held the foot word   (fixed cc709081; Marrison gives hand=pang,
 *         foot=leg=phei, and the hand cell held phei)
 *   vai   eat held 'mother', good held 'meat', father held 'child', tree held
 *         a Mende word                                     (fixed fab5f4a2)
 *   toc   red held the WHITE word; gym sun held it too      (fixed 2026-08-24)
 *   tsi   eye = mooḵs beside that row's white = mooksk      (raised 53ec1b47)
 *   kio   bone holds the bare LEG root; crn bone ɨka beside foot ɨɨka
 *
 * WHY RAW IDENTITY IS NOT THE SIGNAL
 * ----------------------------------
 * 353 pairs of cells in this atlas are byte-identical inside their own row,
 * and the overwhelming majority are correct: Austronesian lima is five AND
 * hand, Korean 눈 is eye AND snow, Persian خواردن is eat AND drink, Mansi
 * пуӈк is head AND tooth because two Proto-Uralic etyma fell together. A
 * checker that prints those gets switched off, which is why the three existing
 * tools are advisory and why 300+ of the 353 sit frozen in
 * intra_row_dup.lock.json. This one does not re-report identity. It reports
 * identity that THREE independent facts say should not be there.
 *
 * THE RULE — a pair is reported when all four hold:
 *
 *   1. SAME ROW, IDENTICAL SURFACE. Two concepts in one language hold the same
 *      NFC-normalised, case-folded surface. 353 pairs atlas-wide.
 *
 *   2. SAME SEMANTIC CATEGORY, as WORD_CATEGORIES in word_manifest.js draws
 *      them (sky / people / body / nature / home / made / actions / numbers /
 *      greetings / colour / experimental). A gloss slip in a harvest lands on
 *      a NEIGHBOURING gloss, because lexical questionnaires are ordered by
 *      semantic field; chance homophony lands anywhere. Measured: 11.1% of the
 *      2,000,968 concept pairs that co-occur in a row are same-category, but
 *      24.9% of the 353 dups are (88 of 353) — 2.2x enrichment, which is the
 *      evidence that this dimension carries signal rather than taste. It also
 *      costs coverage: it drops eye|snow and foot|wheel, both of which the
 *      calibration below says must not be flagged, and it drops vai's
 *      eat|mother, which was a real defect. 88 pairs survive.
 *
 *   3. THE ROW'S OWN FAMILY KEEPS THEM APART. At least 3 other base languages
 *      in the row's coarse family (the family string up to the first "(")
 *      fill both concepts, and NOT ONE of them merges the two. This is the
 *      Tangkhul shape — hand = foot in nmf while every neighbour splits them —
 *      and it is what clears Korean: eight other Koreanic rows write 눈 for
 *      eye and for snow, so the merger is a fact about Korean, not about a
 *      harvest. 37 pairs survive.
 *
 *   4. THE MERGER IS NOT AN ATTESTED COLEXIFICATION. At most ONE other coarse
 *      family anywhere in the atlas shows the same pair merged. foot|wheel is
 *      merged in seven families (Arawakan, Austronesian, Semitic,
 *      Atlantic-Congo, Nilo-Saharan, Trans-New Guinea, Pama-Nyungan) because
 *      "leg extended to wheel" is a real areal pattern — 53ec1b47's own notes
 *      list Bini owe, Kikuyu kũgũrũ, Kongo dikulu, Akan ntwahonan — so the
 *      whole cluster is suppressed here and judged by hand instead.
 *
 *   => 19 pairs. ALL 19 were then read against outside sources (rally r13,
 *      2026-09-20 — a 100% sample, not a top-N): 9 genuine polysemy, 8 probable
 *      defects, 2 undecidable. False-positive rate 47.4%, precision 42%.
 *      provenance_scan.js is kept at 22.5% and this is no more of a gate
 *      than that one.
 *      Worth recording how much the sources moved: reading the 19 from inside
 *      the repo alone got SIX of them wrong in both directions. ani rain=star
 *      and night=sea look like the clearest defects on the map and the Zilo
 *      Andi dictionary says both mergers are real; win nee filling I, you and
 *      we looks like one form smeared over three cells and Lipkind 1945 says
 *      Hocąk has no person-marked independent pronoun at all; while tji
 *      blood=eye and yiz blood=heart, which the differing IPA seemed to
 *      exculpate, are both wrong (Tujia eye is lɔ²⁴-pu⁵⁵, Azhe heart is
 *      ni³³mo²²). An IPA difference is a weak defence, not an alibi.
 *
 * ONE MORE MEASUREMENT WORTH THE HEADER. Exactly two cells in words/ carry a
 * hand-written "Suspect, " annotation — ani night релъо and ksw we ပှၤ — and
 * BOTH are in the 19. Everything in the 19 is also already frozen in
 * intra_row_dup.lock.json (all 19 of 319 entries), and
 * intra_row_dup_check.js --check reports violations: 0. The ratchet is clean;
 * this rule reopens 19 of the cells the ratchet blessed.
 *
 * CALIBRATION
 *   nmf hand|foot, restored to its pre-cc709081 value ["phei","pʰei"]:
 *       REPORTED.  --calibrate replays it.
 *   ko eye|snow 눈 (real polysemy, in the lock):    not reported, rule 3.
 *   djr foot|wheel ḻuku (real polysemy, in the lock): not reported, rule 4.
 *   mey foot|wheel كراع:  not reported, rule 4 — and rule 4 WAS RIGHT, which
 *       is the most useful thing this pass learned. mey was the one of the ten
 *       wheel/foot rows everybody suspected, because all 20 other Arabic rows
 *       write عجلة or دولاب. It is correct: Elhoussein's Basic English–
 *       Hassaniya Dictionary — the source the FOOT cell already cites — has
 *       "Wheel: Kraaᶜ (wata) كراع (روته)" on p.93 and "Tire: Kraaᶜ" on p.83,
 *       and the Arabic dialect atlas gives عجلة for Egypt and Tunisia, not
 *       Mauritania. A rule tuned hard enough to catch mey would have been
 *       tuned to produce a false positive.
 *
 * WHAT IT CANNOT REACH
 *   - the defect before a collision exists. nmf's hand cell held phei while
 *     the foot cell was EMPTY; nothing inside the repo could see it until the
 *     foot fill put phei in the row twice. Three of the four Vai cells were
 *     the same: 'meat' and a Mende tree word are not concepts here, so no cell
 *     ever collided with them. This rule sees a slip only once the row holds
 *     the word twice.
 *   - near-misses. crn bone ɨka beside foot ɨɨka, tsi eye mooḵs beside white
 *     mooksk. --near runs the same four rules over forms that match only after
 *     stripping diacritics and collapsing doubled letters: 93 same-category
 *     candidates, 32 after rules 3 and 4, and exactly one known defect (crn)
 *     among them — Tibetan སྣ/སོ nose/tooth, Finnish tuli/tuuli fire/wind,
 *     Latin os/ōs bone/mouth and Kannada ಕಪ್ಪು/ಕೆಂಪು black/red are the rest.
 *     ~3% precision, so it is printed on request and never counted.
 *   - cross-category slips. vai eat = mother ꕒ was a real defect and rule 2
 *     drops it. --wide is rules 1+3+4 without the category test: 125 pairs,
 *     which is the honest cost of the 19.
 *   - the brief's candidate rule "the row's cell differs from a form its
 *     siblings agree on", which was meant to reach mey wheel كراع. Implemented
 *     and MEASURED, then dropped — and since mey turned out to be CORRECT,
 *     reaching it was never the goal it looked like.
 *     At a 60% family majority it reports 6 cells and all 6 are
 *     wrong (wuu_jx eat 吃 against Sinitic 食, bzj i "ai" against creole "mi",
 *     ctu black ikʼ against Mayan qʼeq, tar sleep kochí against cochi — an
 *     orthography difference). Relaxed to 25% it reports 58, forty of them
 *     regular sound correspondence (Austronesian rima/nima/ʻima against the
 *     modal lima). And it never reaches mey at either setting, because the
 *     coarse family "Semitic" pools Hebrew, Aramaic and Ethiosemitic against
 *     Arabic and عجلة is only 6 of 18 base languages. The comparison that
 *     looked like it convicted mey — ar_sd and ayl write كراع for FOOT and
 *     عجلة for WHEEL — turned out to convict nothing: Hassaniya is simply not
 *     those dialects. Twenty rows agreeing against one is a reason to look, not
 *     a verdict, exactly as sinitic_lexical_import_check.js's header says.
 *   - the Sinitic bare-morpheme class (b93a78e9, 8fef5a74) had ZERO internal
 *     mismatches. No intra-row test can see a cell that is the right morpheme
 *     in the wrong register.
 *
 * VERDICT: TRIAGE, NOT A GATE. Do not wire into check_all.js. It reports a
 * shortlist for a human with a dictionary, in the same spirit as
 * provenance_scan.js and sinitic_lexical_import_check.js.
 *
 * Usage (from the repo root or anywhere):
 *   node neighbour_concept_check.js            # the 19, with evidence columns
 *   node neighbour_concept_check.js --check    # "violations: N"
 *   node neighbour_concept_check.js --wide     # drop rule 2 (125)
 *   node neighbour_concept_check.js --near     # skeleton matches (32)
 *   node neighbour_concept_check.js --calibrate
 *   node neighbour_concept_check.js --json out.json
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = process.env.LANGMAP_ROOT || '/home/jounlai/langmap';
const ARGV = process.argv.slice(2);
const has = (f) => ARGV.includes(f);
const CHECK = has('--check');

/* ---- load -------------------------------------------------------------
 * wordmap_data.js declares `const LANG_DATA` at script top level. In a browser
 * that lands in the shared global lexical scope and later scripts see it; with
 * vm.runInContext it dies with the call. So everything is concatenated into one
 * script, in the order wordmap.html loads it. Never parsed by regex. */
function load(patch) {
    const parts = ['this.window = this; var WORDS = this.WORDS = window.WORDS = {};'];
    parts.push(fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8'));
    for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')).sort())
        parts.push(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'));
    parts.push(fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8'));
    parts.push(fs.readFileSync(path.join(ROOT, 'word_manifest.js'), 'utf8'));
    parts.push('this.LANG_DATA = LANG_DATA; this.CATS = WORD_CATEGORIES;');
    const ctx = vm.createContext({ console });
    vm.runInContext(parts.join('\n;\n'), ctx, { filename: 'wordmap-bundle.js' });
    if (patch) for (const [id, code, val] of patch)
        if (ctx.WORDS[id] && ctx.WORDS[id].data) ctx.WORDS[id].data[code] = val;
    return ctx;
}

const NORM = (s) => String(s == null ? '' : s).trim().toLowerCase().normalize('NFC');
const BLANK = new Set(['', '—', '-', '–', '?', 'n/a']);
/* diacritics gone, non-letters gone, doubled letters collapsed */
const SKEL = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').replace(/[^\p{L}]/gu, '')
    .toLowerCase().replace(/(.)\1+/gu, '$1');

function analyse(ctx, opts) {
    const { WORDS, LANG_DATA, CATS } = ctx;
    const near = !!(opts && opts.near);
    const wide = !!(opts && opts.wide);
    const CAT = {};
    for (const c of CATS) for (const w of c.words) CAT[w] = c.key;

    const cells = {};                       // code -> concept -> [surface, ipa]
    for (const [id, w] of Object.entries(WORDS)) {
        if (!w || !w.data) continue;
        for (const [code, e] of Object.entries(w.data)) {
            const s = Array.isArray(e) ? e[0] : (e && e.form);
            const ipa = Array.isArray(e) ? e[1] : (e && e.ipa);
            if (!s || BLANK.has(NORM(s))) continue;
            (cells[code] ||= {})[id] = [s, ipa || ''];
        }
    }
    const coarse = (c) => String((LANG_DATA[c] && LANG_DATA[c].meta || {}).family || '?').split(' (')[0].trim();
    const baseLang = (c) => c.split('_')[0];
    const FAM = {};
    for (const c of Object.keys(cells)) (FAM[coarse(c)] ||= []).push(c);
    const KEY = near ? ((s) => SKEL(s)) : ((s) => NORM(s));

    /* rule 1 (+2) — candidates */
    const cand = [];
    for (const [code, m] of Object.entries(cells)) {
        const ks = Object.keys(m).sort();
        for (let i = 0; i < ks.length; i++) for (let j = i + 1; j < ks.length; j++) {
            const a = ks[i], b = ks[j];
            const ka = KEY(m[a][0]), kb = KEY(m[b][0]);
            if (!ka || ka !== kb) continue;
            if (near && NORM(m[a][0]) === NORM(m[b][0])) continue;  // that is the identical tier
            cand.push({ code, a, b, forms: [m[a][0], m[b][0]], ipa: [m[a][1], m[b][1]],
                ipaSame: m[a][1] === m[b][1], cat: CAT[a], same: CAT[a] === CAT[b], fam: coarse(code) });
        }
    }
    const pairKey = (r) => [r.a, r.b].sort().join('|');
    const famsByPair = {};
    for (const r of cand) (famsByPair[pairKey(r)] ||= new Set()).add(r.fam);

    /* rules 3 and 4 */
    for (const r of cand) {
        const sibs = (FAM[r.fam] || []).filter((c) => c !== r.code);
        const both = new Set(), merged = new Set();
        for (const s of sibs) {
            const m = cells[s];
            if (!m || !m[r.a] || !m[r.b]) continue;
            both.add(baseLang(s));
            if (KEY(m[r.a][0]) === KEY(m[r.b][0])) merged.add(baseLang(s));
        }
        r.sibsBoth = both.size;
        r.sibsMerged = merged.size;
        r.otherFamilies = famsByPair[pairKey(r)].size - 1;
        r.rowDups = 0;
    }
    for (const r of cand) r.rowDups = cand.filter((x) => x.code === r.code).length;

    const passes = (r) => (wide || r.same) && r.sibsMerged === 0 && r.sibsBoth >= 3 && r.otherFamilies <= 1;
    return { cand, hits: cand.filter(passes).sort((x, y) => y.sibsBoth - x.sibsBoth), cells };
}

/* which commit last wrote each of the two cells — two cells seeded by one bulk
 * harvest can be a copy; two cells written by different sessions from different
 * sources that still agree are independent corroboration. */
function blame(concept, code) {
    try {
        const file = path.join(ROOT, 'words', concept + '.js');
        const lines = fs.readFileSync(file, 'utf8').split('\n');
        const re = new RegExp('^\\s*(?:"' + code + '"|\'' + code + '\'|' + code + ')\\s*:');
        const n = lines.findIndex((l) => re.test(l));
        if (n < 0) return '?';
        const out = execFileSync('git', ['blame', '-L', (n + 1) + ',' + (n + 1), '--porcelain', '--', file],
            { cwd: ROOT, encoding: 'utf8' });
        return out.slice(0, 8);
    } catch (_) { return '?'; }
}

const ctx = load();
const { hits, cand } = analyse(ctx, { near: has('--near'), wide: has('--wide') });

if (CHECK) { console.log(`violations: ${hits.length}`); process.exit(0); }

if (has('--calibrate')) {
    const rows = [];
    const probe = (label, code, a, b, o) => {
        const r = analyse(o.ctx, o).hits.find((h) => h.code === code && [h.a, h.b].sort().join('|') === [a, b].sort().join('|'));
        rows.push([label, r ? 'REPORTED' : 'not reported']);
    };
    // nmf as it stood before cc709081: the hand cell holding the foot word.
    const pre = load([['hand', 'nmf', ['phei', 'pʰei']]]);
    probe('nmf hand=foot phei (pre-cc709081, MUST report)', 'nmf', 'hand', 'foot', { ctx: pre });
    // vai as it stood before fab5f4a2.
    const vai = load([['eat', 'vai', ['ꕒ', 'fa']], ['father', 'vai', ['ꕝ', 'dɛ']],
                      ['good', 'vai', ['ꖝꖢ', 'sue']], ['tree', 'vai', ['ꕘ', 'wuɾu']]]);
    probe('vai eat=mother ꕒ (pre-fab5f4a2, cross-category)', 'vai', 'eat', 'mother', { ctx: vai });
    probe('vai eat=mother ꕒ  — with --wide', 'vai', 'eat', 'mother', { ctx: vai, wide: true });
    probe('ko eye=snow 눈 (polysemy, MUST NOT report)', 'ko', 'eye', 'snow', { ctx });
    probe('djr foot=wheel ḻuku (polysemy, MUST NOT report)', 'djr', 'foot', 'wheel', { ctx });
    probe('mey foot=wheel كراع (CORRECT — rule 4 was right)', 'mey', 'foot', 'wheel', { ctx });
    probe('crn bone ɨka / foot ɨɨka — with --near', 'crn', 'bone', 'foot', { ctx, near: true });
    for (const [l, v] of rows) console.log(`  ${v === 'REPORTED' ? '✓' : '·'} ${l.padEnd(52)} ${v}`);
    process.exit(0);
}

const withGit = !has('--no-git') && hits.length <= 60;
for (const h of hits) {
    if (withGit) { h.commitA = blame(h.a, h.code); h.commitB = blame(h.b, h.code); h.coSeeded = h.commitA === h.commitB; }
    const co = withGit ? (h.coSeeded ? `  co-seeded ${h.commitA}` : `  ${h.commitA}/${h.commitB}`) : '';
    console.log(`  ${h.code.padEnd(12)} ${(h.a + ' = ' + h.b).padEnd(22)} ${h.forms[0]}${h.forms[1] !== h.forms[0] ? ' / ' + h.forms[1] : ''}`
        + `\n${''.padEnd(16)}${h.cat}, ${h.fam}: ${h.sibsBoth} siblings fill both and none merges; `
        + `${h.otherFamilies} other famil${h.otherFamilies === 1 ? 'y' : 'ies'} merge it; ${h.rowDups} dup${h.rowDups === 1 ? '' : 's'} in this row; `
        + `IPA ${h.ipaSame ? 'identical' : 'differs (' + h.ipa[0] + ' / ' + h.ipa[1] + ')'}${co}`);
}
const jsonAt = ARGV.indexOf('--json');
if (jsonAt >= 0 && ARGV[jsonAt + 1]) fs.writeFileSync(ARGV[jsonAt + 1], JSON.stringify(hits, null, 1) + '\n');
console.log(`\ncandidates: ${cand.length}   neighbour-concept suspects: ${hits.length}`);
console.log('(triage, not a gate — read every line before touching a cell)');
process.exitCode = 0;
