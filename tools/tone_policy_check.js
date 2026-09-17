#!/usr/bin/env node
/**
 * tone_policy_check.js — a row that marks tone must not drop it, and must not
 * write it two ways. The half of the tone question that is decidable inside
 * the corpus.
 *
 * WHAT THE ROUNDS KEPT HOLDING. Rally rounds 3, 4 and 5 each ended holding the
 * same item in a different family: "does this row mark tone at all?" — a tonal
 * language whose IPA carries a tone mark on a minority of its cells. The census
 * behind this file (1,188 rows, 66,248 cells with both fields filled):
 *
 *     rows judged tonal                              375
 *       every eligible cell marked                    70
 *       some cells marked                            147   4,536 cells bare
 *       no cell marked at all                        158   7,555 cells bare
 *
 * Marking all 12,091 is a per-cell sourcing job, and a checker cannot ask for
 * it without inviting invented tone values. Doing nothing leaves a partial row
 * indistinguishable from a damaged one. So this guard asks only the question
 * the row already answers about itself.
 *
 * WHY THE RULE SPLITS ON NOTATION, WHICH IS THE WHOLE TRICK. Of the 114 rows
 * that notate tone with Chao letters, 70 mark every cell. Of the 95 that use
 * diacritics, NOT ONE does, and the mean marked rate is 21%. That is not 95
 * damaged rows. Chao letters are EXHAUSTIVE: a transcription that uses them
 * puts one on every toned syllable, so a bare cell in a Chao row is a hole.
 * Diacritics are usually PRIVATIVE: they mark one tone and leave the others
 * bare, and there a bare cell is a fact, not a gap. Measured, not assumed —
 * Navajo marks high only (`nv` 50/70 IPA
 * cells marked, and the 20 bare ones are bare in standard Navajo orthography
 * too: shash, tsʼin, zas); Yoruba marks high and low and leaves mid bare
 * (`yo` 47/72). Requiring "all or none" of those rows would be requiring them
 * to be wrong. So:
 *
 *   RULE A applies only to Chao rows, and asks for completeness.
 *   RULE B applies to any row, and asks only that the IPA not drop a tone the
 *          row's own SURFACE field already records — no completeness claim.
 *
 * RULE A — a Chao row with a bare cell.
 * A row qualifies when Chao letters are its notation and it has committed to
 * them: ≥20 eligible cells, Chao on ≥60% of them, and ≥80% of its marked cells
 * Chao. 102 rows qualify; 205 cells in 32 of them carry no Chao letter.
 *   - the 60% floor is where the evidence stops being the row's own. Below it
 *     sit `lis` 43%, `shn` 35%, `khb` 25%, `duu` 14%, `qxs` 5% — and duu
 *     (Dulong) and qxs (S. Qiang) are languages whose tonality the literature
 *     actually disputes, so flagging their bare cells would be asserting a
 *     linguistic fact, not reading one. At 60% with 23+ Chao cells no such
 *     assertion is needed: the row has already said, 23 times, that its cells
 *     carry tone.
 *   - the 80% notation floor drops the mixed rows — `kjp` 23 Chao/9 diacritic,
 *     `ksw` 8/7, `blk` 4/9, `ers` 6/5, `lhu` 1/28. In those the notation itself
 *     is the open question and neither field is the majority witness.
 *   - the rule is per CELL, not per syllable. A per-syllable version flags 214
 *     cells, and they are the Mandarin neutral tone: 骨头 /ku˨˩˦ tʰou/, 耳朵
 *     /ɑɻ˨˩˦ tu̯ɔ/, 妈妈 /ma˥ ma/, plus Wu words that take one contour across the
 *     whole word (wuu_nb 屋里 /oʔ˥˥ li/). All correct. That measurement is the
 *     reason the threshold is where it is.
 *   A2 is the same rule's other half: a cell in a Chao row that writes its tone
 *   with a diacritic instead, 29 of the 205 — th/th_s/th_n/th_isan/soa all
 *   share `bird นก /nók/` and bo/lhm/khg all share `i ང /ŋà/`. One imported
 *   cell, five rows and three. The row's majority is the convention, and
 *   nothing outside the row is needed to see it.
 *
 * RULE B — the surface records a tone the IPA does not.
 * `cro blood íre /iɾe/` sits four lines from `cro name iláshe /iláʃe/`. The
 * value is already in the cell, in the other field. 237 cells in 36 rows.
 * Three guards, and they are what separate this from a 2,341-cell false alarm:
 *   - the row's IPA must use THAT SAME diacritic on a vowel ≥3 times. Without
 *     it the rule fires 1,485 more times, on Hungarian and Irish and Icelandic
 *     length (hu 23, ga 21, is 21) and on Khoekhoe `naq`, whose surface
 *     circumflex is nasalisation — ǀgôas /ǀɡõas/, and the IPA has it right.
 *   - the IPA must not already carry ˈ or ˌ: 744 cells, nearly all Spanish and
 *     Portuguese, where the surface acute is the stress the IPA already wrote.
 *   - the surface must be Latin (57 cells skipped): an accent inside a Burmese
 *     or Tibetan surface cannot be aligned to a vowel in the IPA.
 * Rows whose IPA marks tone where the surface does not are NOT reported. That
 * is the normal case for an orthography that does not write tone (`fvr` 25 IPA
 * against 24 surface, `lhu` 17 such cells, `nv` 9) and it is not a defect.
 *
 * MACRON IS NOT COUNTED AS TONE outside a Chao row. Vowel macron is length in
 * every row that uses it alone — p_tun, ptrk, p_dra, psem (reconstructions),
 * mch, sog, xpr, bbl. Inside a Chao row it is a tone — yiz fire mi /mī/, ahk
 * heart nui ma /nēmā/ — and A2 does report it. Nuosu `ii` had four such cells
 * when this census was taken, and another session converted them to ŋɯ˧˧,
 * ʑɿ˧˧, hɛ˧˧ma˥ and ŋa˧˧ the same afternoon, on its own. That is the only
 * outside confirmation available that these are defects and not a convention.
 *
 * ALLOW: rows whose family says reconstruction (Proto-*, Old/Middle Chinese).
 * Their accent is reconstruction accent and their "IPA" is normalised
 * reconstruction, not transcription — p_ine *h₁óh₃s /h₁oh₃s/ is not a dropped
 * tone. That exempts 9 p_ine + 7 pban cells from B and zh_song/zh_tang from A.
 *
 * NOT WIRED INTO check_all.js. The 442 cells it reports are real and none of
 * them is fixable by this tool: 176 need a source, 266 need a five-second look
 * at the cell's own surface. Wire it in once the ledger is paid or frozen, the
 * way tools/sinitic_tone_present_check.js froze its 66.
 *
 * Usage:
 *   node tools/tone_policy_check.js            # full report + the debt table
 *   node tools/tone_policy_check.js --check    # "violations: N"
 *   node tools/tone_policy_check.js --debt     # rows below the gate, with counts
 *   node tools/tone_policy_check.js --json     # the same findings as JSON
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Runs from the repo root (node tools/tone_policy_check.js) or from anywhere
// with LANGMAP_ROOT set; falls back to the parent of this file, which is where
// it lands once it moves into tools/.
const ROOT = process.env.LANGMAP_ROOT
    || (fs.existsSync(path.join(process.cwd(), 'words')) ? process.cwd() : path.resolve(__dirname, '..'));

const CHECK = process.argv.includes('--check');
const DEBT_ONLY = process.argv.includes('--debt');
const JSON_OUT = process.argv.includes('--json');   // machine-readable dump, for the review write-up

const CHAO = /[˥-˫]/;                       // ˥ ˦ ˧ ˨ ˩ and the global rise/fall
const TONE_DIAC = '̀́̂̋̌̏᷄᷅᷆᷇᷈᷉';
const MACRON = '̄';
const COMBINING = /[̀-ͯ᷀-᷿]/;
const VOWEL = new Set('aeiouyɑɐɒæəɘɜɛɪɨɯɵøœɔʊʌʏɤɞʉɚɝɶ'.split(''));
const LATIN = (s) => /[A-Za-z]/.test(s) && !/[Ѐ-ӿ԰-ۿऀ-᫿ᬀ-῿Ⰰ-퟿]/.test(s);
const RECONSTRUCTION = /Proto-language|reconstructed|Middle Chinese|Old Chinese/i;

// Tone marks in one field. A diacritic counts only when it sits on a VOWEL:
// the caron in Kryts čʼěbiǯ and the macron in Udi k̄ul are transliteration
// letters, and 14 NE Caucasian rows drop out on that test alone.
function toneMarks(s) {
    const t = String(s).normalize('NFD');
    const out = { chao: CHAO.test(t), diac: [], macron: false };
    for (let k = 0; k < t.length; k++) {
        const ch = t[k];
        const isTone = TONE_DIAC.includes(ch), isMac = ch === MACRON;
        if (!isTone && !isMac) continue;
        let j = k - 1;
        while (j >= 0 && COMBINING.test(t[j])) j--;
        if (j < 0 || !VOWEL.has(t[j].toLowerCase())) continue;
        if (isMac) out.macron = true; else out.diac.push(ch);
    }
    return out;
}
const marked = (m) => m.chao || m.diac.length > 0;      // macron excluded: length, not tone
const anyMark = (m) => m.chao || m.diac.length > 0 || m.macron;

// --- load
const WORDS = (() => {
    const ctx = vm.createContext({});
    vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
    for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
        try { vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), ctx, { filename: f }); }
        catch (e) { /* another guard's problem */ }
    return ctx.WORDS;
})();
const FAMILY = (() => {
    const ctx = vm.createContext({ window: {} });
    for (const f of ['wordmap_data.js', 'wordmap_meta.js']) {
        const p = path.join(ROOT, f);
        if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8').replace(/^const /gm, 'var '), ctx, { filename: f });
    }
    const L = vm.runInContext('typeof LANG_DATA !== "undefined" ? LANG_DATA : {}', ctx);
    const out = {};
    for (const k of Object.keys(L)) out[k] = String((L[k].meta || {}).family || '');
    return out;
})();

// --- transpose to rows
const rows = new Map();
for (const [id, w] of Object.entries(WORDS)) {
    if (!w || !w.data) continue;
    for (const [code, e] of Object.entries(w.data)) {
        const surface = Array.isArray(e) ? e[0] : (e && e.form);
        const ipa = Array.isArray(e) ? e[1] : (e && e.ipa);
        if (!surface || surface === '—' || !ipa || ipa === '—') continue;
        if (!rows.has(code)) rows.set(code, { code, cells: [] });
        rows.get(code).cells.push({ id, surface: String(surface), ipa: String(ipa) });
    }
}

const violations = [];
const debt = [];
for (const r of [...rows.values()].sort((a, b) => a.code.localeCompare(b.code))) {
    const recon = RECONSTRUCTION.test(FAMILY[r.code] || '');
    let chao = 0, mk = 0;
    const ev = {};
    for (const c of r.cells) {
        const m = toneMarks(c.ipa);
        if (m.chao) chao++;
        if (marked(m)) mk++;
        for (const d of m.diac) ev[d] = (ev[d] || 0) + 1;
    }
    const n = r.cells.length;

    // RULE A — Chao is this row's notation and the row has committed to it.
    const gated = !recon && n >= 20 && chao >= 0.6 * n && chao >= 0.8 * mk;
    if (gated) {
        for (const c of r.cells) {
            const m = toneMarks(c.ipa);
            if (m.chao) continue;
            violations.push({ rule: anyMark(m) ? 'A2' : 'A1', code: r.code, id: c.id, surface: c.surface, ipa: c.ipa,
                note: anyMark(m) ? 'tone written with a diacritic in a Chao row' : 'no tone in a row that marks ' + chao + '/' + n });
        }
    } else if (chao > 0) {
        const why = [];
        if (recon) why.push('reconstruction');
        if (n < 20) why.push('only ' + n + ' cells');
        if (chao < 0.6 * n) why.push('Chao on ' + Math.round(100 * chao / n) + '% of cells');
        if (chao < 0.8 * mk) why.push('mixed notation ' + chao + ' Chao / ' + (mk - chao) + ' diacritic');
        debt.push({ code: r.code, chao, marked: mk, cells: n, bare: n - mk, why: why.join(' + ') });
    }

    // RULE B — the surface carries a tone the IPA dropped.
    if (recon) continue;
    for (const c of r.cells) {
        const mi = toneMarks(c.ipa);
        if (anyMark(mi)) continue;
        if (/[ˈˌ]/.test(c.ipa)) continue;
        if (!LATIN(c.surface)) continue;
        const ds = toneMarks(c.surface).diac.filter((d) => (ev[d] || 0) >= 3);
        if (!ds.length) continue;
        violations.push({ rule: 'B', code: r.code, id: c.id, surface: c.surface, ipa: c.ipa,
            note: 'surface marks tone (' + ds.map((d) => 'U+' + d.codePointAt(0).toString(16).toUpperCase()).join(',') + '), IPA does not; row marks it in ' + Math.max(...ds.map((d) => ev[d])) + ' other cells' });
    }
}

const count = (k) => violations.filter((v) => v.rule === k).length;

if (JSON_OUT) {
    console.log(JSON.stringify({ violations, debt }));
    process.exit(0);
}
if (CHECK) {
    console.log('violations: ' + violations.length);
    process.exit(0);
}
if (!DEBT_ONLY) {
    console.log('tone policy — a row that marks tone must not drop it, and must not write it two ways\n');
    for (const rule of ['A1', 'A2', 'B']) {
        const v = violations.filter((x) => x.rule === rule);
        const title = { A1: 'A1  Chao row, cell has no tone', A2: 'A2  Chao row, cell writes tone as a diacritic', B: 'B   surface marks tone, IPA does not' }[rule];
        console.log('### ' + title + '   ' + v.length + ' cell(s)');
        let last = '';
        for (const x of v) {
            if (x.code !== last) { console.log('  ' + x.code); last = x.code; }
            console.log('      ' + x.id.padEnd(11) + x.surface + ' /' + x.ipa + '/');
        }
        console.log('');
    }
}
console.log('### debt — rows that use Chao letters but are below the gate, left unflagged');
for (const d of debt.sort((a, b) => b.chao / b.cells - a.chao / a.cells))
    console.log('  ' + d.code.padEnd(10) + ('Chao ' + d.chao + '/' + d.cells).padEnd(14) + (d.bare + ' bare').padEnd(9) + d.why);
console.log('\nA1 ' + count('A1') + '   A2 ' + count('A2') + '   B ' + count('B'));
console.log('violations: ' + violations.length);
process.exitCode = 0;
