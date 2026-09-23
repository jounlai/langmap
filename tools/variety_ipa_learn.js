#!/usr/bin/env node
/**
 * variety_ipa_learn.js — learn how a variety row rewrites its parent's IPA,
 * then fill its open cells with the result.
 *
 * WHY THIS AND NOT variety_copy.js. That tool copies a parent cell verbatim
 * when the variety is never recorded as changing any segment in it, which is
 * the right rule for es_uy and fr_sn but refuses every row that systematically
 * differs — which is every interesting one. pt_br copies 33 spellings and
 * diverges on 39, en_in differs in 55 of 65 shared cells, and variety_copy
 * declines all of them. Yet those divergences are not noise. pt_br states four
 * rules over and over (pretonic ɐ→a, pretonic u→o, final ɨ→i, coda ʃ→s) and
 * the rows say them in dozens of cells.
 *
 * So: align the parent's IPA against the child's across every cell they share
 * with the same SURFACE, read the aligned runs off as parent-token →
 * child-token, and require the row to be unanimous about each one. Then
 * rewrite the parent's form for an open concept. Same machinery as
 * cldf_convert's learn(), asked between two IPA fields instead of between a
 * spelling and an IPA.
 *
 * WHAT IT REFUSES, and each refusal is a real case:
 *   - a token the row is not unanimous about. en_au writes the PRICE diphthong
 *     three ways — nɑet in night, ɑɪ in I, ɑːe in eye — so no word containing
 *     it can be derived, and butterfly and Wi-Fi stay empty.
 *   - a token the row has never seen. If the parent's word contains a segment
 *     that appears in no shared cell, the row has not said what it does with
 *     it.
 *   - a row whose surfaces do not track the parent's at all (under 80% of
 *     shared cells), where there is no correspondence to learn.
 *   - route-coloured words, and any surface already in the child under
 *     another concept.
 *
 * WHAT IT CANNOT SEE, and the one case where that was DANGEROUS. The rules it
 * learns are SEGMENTAL, and some variety rules are POSITIONAL. The English
 * rhotic rows turn ə into ɚ only where the SPELLING has an ⟨r⟩ — water ˈwɔːtə
 * ˈwɔːɾɚ but hundred ˈhʌndɹəd unchanged — which is perfectly predictable to a
 * person holding the spelling and invisible here; those cells come out as
 * ambiguous and are refused, which is merely unhelpful.
 *
 * fr_be was not merely unhelpful. That row lengthens a vowel before a final
 * obstruent — tɛt tɛːt, lɑ̃ɡ lɑ̃ːɡ, ɔʁɑ̃ʒ ɔʁɑ̃ːʒ — and the FIRST version of this
 * tool cheerfully offered mouth bouche/buʃ, because u is unanimous in that row
 * and the tool cannot see that ʃ is word-final. That exact cell had been
 * examined by hand a day earlier and deliberately left out. A tool that
 * reverses a decision made with more evidence than the tool has is worse than
 * no tool.
 *
 * So a positional LENGTH rule is now detected from its own signature: an
 * ambiguity whose two sides differ only by a length mark, t against tː. A row
 * showing that is refused entirely, because the environment is a position and
 * no token in it is safe. The same test catches the rhotic alternations ə/ɚ
 * and ə/ɐ, which are positional for the same reason.
 *
 *   node tools/variety_ipa_learn.js                every eligible row
 *   node tools/variety_ipa_learn.js pt_br          one row, with its table
 *   node tools/variety_ipa_learn.js --tsv          apply_cells.js input
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { ipaTokens, align } = require('./cldf_convert');

const ROOT = path.join(__dirname, '..');

/** Cells needing a `family` value this tool cannot supply. */
const ROUTE = new Set(['bear', 'wine', 'we', 'foot', 'tea', 'orange',
    'sugar', 'coffee', 'blue', 'n99']);

/** parent token -> child token, where the row is unanimous. */
function learnPair(child, parent) {
    const seen = new Map();
    let shared = 0, sameSurface = 0;
    for (const [k, pe] of Object.entries(parent)) {
        const ce = child[k];
        if (!pe || !pe[0] || pe[0] === '—' || !pe[1]) continue;
        if (!ce || !ce[0] || ce[0] === '—' || !ce[1]) continue;
        shared++;
        if (ce[0] !== pe[0]) continue;        // a different WORD teaches nothing
        sameSurface++;
        for (const [x, y] of align(ipaTokens(pe[1]), ipaTokens(ce[1]))) {
            if (!x) continue;                 // pure insertion: not a rule
            if (!seen.has(x)) seen.set(x, new Map());
            const m = seen.get(x);
            m.set(y, (m.get(y) || 0) + 1);
        }
    }
    const table = new Map(), ambiguous = new Map();
    for (const [x, m] of seen) {
        if (m.size === 1) table.set(x, [...m.keys()][0]);
        else ambiguous.set(x, [...m].sort((a, b) => b[1] - a[1]));
    }

    /* The signature of a POSITIONAL rule: one token alternating with itself
       plus a length mark, or a schwa alternating with an r-coloured one. See
       the fr_be note in the docstring — this is the test that stops the tool
       reversing a hand decision. */
    const positional = [];
    for (const [x, v] of ambiguous) {
        const forms = v.map(([y]) => y);
        for (const a of forms) for (const b of forms) {
            if (a === b) continue;
            if (b === `${a}\u02D0` || b === `${a}\u02D0`.normalize()) positional.push(`${x}: ${a}/${b}`);
            else if ((a === '\u0259' && (b === '\u025A' || b === '\u0250'))) positional.push(`${x}: ${a}/${b}`);
        }
    }
    return { table, ambiguous, shared, sameSurface, positional: [...new Set(positional)] };
}

/** Rewrite a parent IPA, or say which token stopped it. */
function rewrite(ipa, table) {
    let out = '';
    const blocked = new Set();
    for (const t of ipaTokens(ipa)) {
        if (!table.has(t)) { blocked.add(t); continue; }
        out += table.get(t);
    }
    return blocked.size ? { ipa: null, blocked: [...blocked] } : { ipa: out, blocked: [] };
}

function main() {
    const args = process.argv.slice(2);
    const tsv = args.includes('--tsv');
    const one = args.find((a) => !a.startsWith('--'));

    const data = JSON.parse(fs.readFileSync(
        path.join(ROOT, 'data/wordmap_seo.json'), 'utf8'));
    const L = data.langs;

    let total = 0;
    for (const [code, lang] of Object.entries(L)) {
        if (one && code !== one) continue;
        const parent = lang.meta && lang.meta.parentCode;
        if (!parent || !L[parent]) continue;
        const cw = lang.words || {}, pw = L[parent].words || {};

        const { table, ambiguous, shared, sameSurface, positional } = learnPair(cw, pw);
        if (shared < 20 || sameSurface / shared < 0.8) continue;
        if (table.size < 8) continue;
        if (positional.length) {
            if (one || !tsv) {
                console.log(`\n${code} < ${parent}   REFUSED — a positional rule: `
                    + `${positional.join(', ')}. The environment is a position, not a segment,`
                    + ' so no token is safe. This row needs a person.');
            }
            continue;
        }

        const held = new Set(Object.values(cw)
            .filter((e) => e && e[0] && e[0] !== '—').map((e) => e[0]));

        const take = [], skip = [];
        for (const [k, pe] of Object.entries(pw)) {
            if (cw[k] && cw[k][0] && cw[k][0] !== '—') continue;
            if (!pe || !pe[0] || pe[0] === '—' || !pe[1]) continue;
            if (ROUTE.has(k)) { skip.push(`${k} (route-coloured)`); continue; }
            if (held.has(pe[0])) { skip.push(`${k} (${pe[0]} already in this row)`); continue; }
            const r = rewrite(pe[1], table);
            if (r.ipa) take.push([k, pe[0], r.ipa, pe[1]]);
            else skip.push(`${k} (${r.blocked.join(' ')})`);
        }
        if (!take.length && !one) continue;
        total += take.length;

        if (tsv) {
            for (const [k, s, ipa] of take) console.log(`${k}\t${code}\t${s}\t${ipa}`);
            continue;
        }
        console.log(`\n${code} < ${parent}   ${sameSurface}/${shared} same surface, `
            + `${table.size} unanimous tokens, ${ambiguous.size} ambiguous`);
        if (ambiguous.size) {
            console.log(`  ambiguous: ${[...ambiguous].slice(0, 8)
                .map(([x, v]) => `${x}→${v.map(([y, n]) => `${y || '∅'}×${n}`).join('/')}`).join('  ')}`);
        }
        const changed = [...table].filter(([x, y]) => x !== y);
        if (changed.length) {
            console.log(`  rules: ${changed.map(([x, y]) => `${x}→${y || '∅'}`).join('  ')}`);
        }
        console.log(`  TAKE (${take.length}): ${take.map(([k, s, ipa, p]) =>
            `${k}=${s}/${ipa}${ipa === p ? '' : ` (parent ${p})`}`).join('  ') || '—'}`);
        if (skip.length) console.log(`  skip (${skip.length}): ${skip.join(', ')}`);
    }
    if (!tsv) console.log(`\n${total} cells`);
}

main();
