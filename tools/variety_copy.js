#!/usr/bin/env node
/**
 * variety_copy.js — fill a variety row from its parent, but only for the
 * words the variety is never seen to change.
 *
 * WHY. Four hundred of the atlas's rows are varieties of another row, and
 * most of them copy their parent's spelling almost exactly: es_uy writes what
 * es_ar writes in all 75 cells they share, fr_sn writes what fr writes in 72
 * of 73. Those rows still have open concepts the PARENT already holds, and
 * for them no dictionary is needed — what is needed is evidence that the
 * variety does not change that particular word.
 *
 * The evidence is already in the row. A variety that differs from its parent
 * differs in specific segments, over and over: es_do aspirates coda s
 * (esˈtɾeʝa ehˈtɾeʝa, aˈros aˈroh) and drops final ɾ (aˈmoɾ amo, koˈmeɾ kome);
 * es_gt turns x into h in all seven cells that contain one; nl_be writes w
 * where nl writes ʋ; de_at unrounds nothing but replaces ʁ with r and z with
 * s; pt_mz writes final e where pt writes ɨ. Collect the segments that ever
 * move, and a parent word containing NONE of them is a word this variety is
 * not recorded as touching.
 *
 * HOW THE LOCUS IS FOUND. For every cell the two rows share with the same
 * surface but different IPA, take the multiset difference of the two IPA
 * strings both ways. What matters is which SIDE the difference falls on, and
 * the distinction is the whole tool:
 *
 *   SUBSTITUTION or DELETION — the parent loses a character. es_gt x -> h,
 *     nl_be ʋ -> w, de_at ʁ -> r, es_do final ɾ -> nothing. The parent's own
 *     character is the signal, so a parent word that does not contain it is
 *     a word this variety has no recorded reason to touch. The locus is the
 *     parent-side characters.
 *
 *   PURE ADDITION — the parent loses nothing and the child gains something.
 *     fr_be lengthens a vowel before a final obstruent: tɛt tɛːt, lɑ̃ɡ lɑ̃ːɡ,
 *     ɔʁɑ̃ʒ ɔʁɑ̃ːʒ. Nothing in the parent's string marks which words this hits
 *     — the trigger is a position, not a segment — so no character-level
 *     locus can be right, INCLUDING one that counts both sides. A row with
 *     any such divergence is refused entirely and reported.
 *
 *     Refusing rather than falling back is a correction of this tool's first
 *     version, which counted both sides and then happily offered fr_be
 *     bouche/buʃ and montagne/mɔ̃taɲ because neither string contains ː. Those
 *     two had been examined by hand a day earlier and deliberately left out:
 *     fr_be lengthens before final ʒ, so it may well lengthen before final ʃ,
 *     and the row holds no ʃ-final or ɲ-final cell to settle it. A tool that
 *     quietly reverses a decision someone made with more evidence than the
 *     tool has is worse than no tool. nl_be is refused for the same reason —
 *     it keeps a final n that nl drops, which is a morphological difference
 *     no segment inventory predicts.
 *
 *   A MIXED divergence hides an addition inside a substitution, and the
 *     pure-addition test cannot see it. en_wls cat is kæt -> kʰat: something
 *     IS lost (æ), so the divergence looks like an ordinary substitution
 *     while quietly introducing aspiration, which no parent-side locus
 *     predicts. So any character the child gains is also checked against the
 *     child's whole row: if the child writes it in at least 15% of its cells
 *     and the parent almost never does, the child has a convention the parent
 *     lacks and the row is refused.
 *     The threshold is a ratio for the reason marksStress()'s is. en_wls
 *     writes ʰ in ONE cell out of 73 while tooth, tongue, tree, two, tea and
 *     computer all begin with an unaspirated stop — one mark is an outlier in
 *     that row, not a convention, and refusing the row over it would cost
 *     four good cells to protect against a pattern the row does not have.
 *
 * Rejecting a safe word costs an empty cell. Accepting an unsafe one puts a
 * wrong pronunciation on a public map under a real language's name. The
 * asymmetry is the design.
 *
 * WHAT IT REFUSES OUTRIGHT
 *   - a row whose surfaces do not track its parent's. pt_br copies 33 and
 *     diverges 39: parent-copy is not that row's convention and the tool must
 *     not impose one. The threshold is 90% of shared cells with the same
 *     surface, over at least 20 shared cells.
 *   - route-coloured words (bear wine we foot tea orange sugar coffee blue
 *     n99), whose cells need a `family` value this tool cannot supply.
 *   - `we`, always. Clusivity is a separate claim about the language, not a
 *     pronunciation, and one unlabelled form means unknown.
 *   - a word already present in the child under ANY concept. A copied surface
 *     that collides with another of the row's cells is an intra-row duplicate
 *     and check_all rejects it; catching it here saves the rebuild.
 *
 * STILL A PERSON'S JOB: deciding whether the parent's word is even the word
 * this variety uses. The tool copies a pronunciation, never a lexical choice,
 * and it has no way to know that Ecuadorian Spanish calls the cuckoo a
 * garrapatero where Mexican Spanish says pijuy. Read what it prints.
 *
 *   node tools/variety_copy.js              every eligible row, with its locus
 *   node tools/variety_copy.js es_uy        one row, in detail
 *   node tools/variety_copy.js --tsv        apply_cells.js input for all rows
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

/** Cells needing a `family` value, which lives outside the [surface, ipa]
 *  pair this tool copies. See the route marker note in wordmap_data.js. */
const ROUTE = new Set(['bear', 'wine', 'we', 'foot', 'tea', 'orange',
    'sugar', 'coffee', 'blue', 'n99']);

/** Characters that carry no phonetic content and so cannot be a locus. */
const NOISE = new Set([' ', '/', '-', 'ˈ', 'ˌ', '.']);

/** The segments this variety is ever recorded as changing. Blunt on purpose;
 *  see HOW THE LOCUS IS FOUND. */
function locus(childWords, parentWords) {
    const parentSide = new Set(), childSide = new Set();
    let shared = 0, sameSurface = 0, diverged = 0, additions = 0;
    for (const [k, pe] of Object.entries(parentWords)) {
        const ce = childWords[k];
        if (!pe || !pe[0] || pe[0] === '—' || !pe[1]) continue;
        if (!ce || !ce[0] || ce[0] === '—' || !ce[1]) continue;
        shared++;
        if (ce[0] !== pe[0]) continue;          // a different WORD, not a sound
        sameSurface++;
        if (ce[1] === pe[1]) continue;
        diverged++;
        /* Multiset difference both ways: what the parent has and the child
           does not, and the reverse. A character that survives in equal
           numbers on both sides did not move and does not join the locus. */
        const count = (s) => {
            const m = new Map();
            for (const ch of s.normalize('NFD')) m.set(ch, (m.get(ch) || 0) + 1);
            return m;
        };
        const a = count(pe[1]), b = count(ce[1]);
        const lost = [], gained = [];
        for (const [ch, n] of a) if (n > (b.get(ch) || 0) && !NOISE.has(ch)) lost.push(ch);
        for (const [ch, n] of b) if (n > (a.get(ch) || 0) && !NOISE.has(ch)) gained.push(ch);
        if (!lost.length && gained.length) additions++;
        for (const ch of lost) parentSide.add(ch);
        for (const ch of gained) childSide.add(ch);
    }
    /* A gained character that the child writes as a CONVENTION is a rule the
       parent's strings cannot signal. See the MIXED divergence note above. */
    const freq = (words, ch) => {
        let n = 0, t = 0;
        for (const e of Object.values(words)) {
            if (!e || !e[1]) continue;
            t++;
            if (e[1].normalize('NFD').includes(ch)) n++;
        }
        return t ? n / t : 0;
    };
    const conventions = [...childSide].filter((ch) =>
        freq(childWords, ch) >= 0.15 && freq(parentWords, ch) < 0.05);

    return { chars: parentSide, shared, sameSurface, diverged, additions, conventions };
}

function main() {
    const args = process.argv.slice(2);
    const tsv = args.includes('--tsv');
    const one = args.find((a) => !a.startsWith('--'));

    const data = JSON.parse(fs.readFileSync(
        path.join(ROOT, 'data/wordmap_seo.json'), 'utf8'));
    const L = data.langs;

    let totalCells = 0;
    for (const [code, lang] of Object.entries(L)) {
        if (one && code !== one) continue;
        const parent = lang.meta && lang.meta.parentCode;
        if (!parent || !L[parent]) continue;
        const cw = lang.words || {}, pw = L[parent].words || {};

        const { chars, shared, sameSurface, diverged, additions, conventions } = locus(cw, pw);
        if (shared < 20) continue;
        if (sameSurface / shared < 0.9) continue;   // not a copying row
        if (additions || conventions.length) {
            if (one || !tsv) {
                const why = additions
                    ? `${additions} divergence(s) add a segment the parent does not have, so the`
                      + ' trigger is a position and no character-level locus is valid'
                    : `this row writes ${conventions.join(' ')} as a convention and its parent`
                      + ' does not, so the parent\'s strings cannot say where it falls';
                console.log(`\n${code} < ${parent}   REFUSED — ${why}. This row needs a person.`);
            }
            continue;
        }

        /* Every surface the child already holds, so a copy cannot collide
           with one of its own cells under a different concept. */
        const held = new Set(Object.values(cw)
            .filter((e) => e && e[0] && e[0] !== '—').map((e) => e[0]));

        const take = [], skip = [];
        for (const [k, pe] of Object.entries(pw)) {
            if (cw[k] && cw[k][0] && cw[k][0] !== '—') continue;
            if (!pe || !pe[0] || pe[0] === '—' || !pe[1]) continue;
            if (ROUTE.has(k)) { skip.push(`${k} (route-coloured)`); continue; }
            if (held.has(pe[0])) { skip.push(`${k} (${pe[0]} already in this row)`); continue; }
            const hit = [...pe[1].normalize('NFD')].filter((ch) => chars.has(ch));
            if (hit.length) { skip.push(`${k} (${[...new Set(hit)].join('')})`); continue; }
            take.push([k, pe[0], pe[1]]);
        }
        if (!take.length && !one) continue;
        totalCells += take.length;

        if (tsv) {
            for (const [k, s, p] of take) console.log(`${k}\t${code}\t${s}\t${p}`);
            continue;
        }
        console.log(`\n${code} < ${parent}   ${sameSurface}/${shared} same surface, `
            + `${diverged} diverge`);
        console.log(`  locus: ${[...chars].join(' ') || '(none — this row never diverges)'}`);
        if (additions) {
            console.log(`  ${additions} divergence(s) ADD a segment the parent does not have,`
                + ' so no parent-side signal exists and both sides count — see the docstring.');
        }
        console.log(`  TAKE (${take.length}): ${take.map(([k, s, p]) => `${k}=${s}/${p}`).join('  ') || '—'}`);
        if (skip.length) console.log(`  skip (${skip.length}): ${skip.join(', ')}`);
    }
    if (!tsv) console.log(`\n${totalCells} cells`);
}

main();
