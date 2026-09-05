#!/usr/bin/env node
/**
 * sinitic_tone_system_share_check.js — two lects in one group using the SAME
 * SET of tone contours and nothing else.
 *
 * Why this and not "the rows look alike". A first pass compared rows on how
 * often the whole IPA string was character-for-character identical. Inside
 * Sinitic that pointed straight at `cjy` / `cjy_lv` (39 of 51). Run over the
 * rest of the corpus it drowned: es_ar / es_uy is 66 of 67 and fr_af / fr_ht is
 * 67 of 67, because those rows ARE the same phonology with a different
 * lexicon. Identical IPA is not evidence of anything on its own.
 *
 * What IS evidence, for tonal lects specifically: the tone inventory. Two
 * varieties that a corpus keeps as separate rows are being kept apart because
 * they sound different, and for Sinitic that difference lives first in the tone
 * system. A row's inventory — every distinct Chao contour it uses anywhere —
 * is a property of the LECT, not of which words happen to be filled in. When
 * two rows in one group have the same inventory down to the last contour, one
 * of them was very likely toned from the other.
 *
 * The check is deliberately blunt: set equality, nothing weighted, nothing
 * fuzzy. Rows with fewer than 25 tone tokens are skipped as too thin to have an
 * inventory.
 *
 * Across all nine Sinitic groups exactly two pairs come out identical:
 *
 *   zh / zh_tw    6 of 6.  ALLOWED. Beijing and Taiwan Mandarin are one
 *                 standard language with one set of tone categories; they part
 *                 company on lexicon (41 of 66 surfaces differ), not tones.
 *
 *   cjy / cjy_lv  9 of 9.  NOT credible, and the reason is structural rather
 *                 than statistical. Taiyuan (并州片) MERGES 陰平 and 陽平 into
 *                 one 平聲 11. The 呂梁片, which is where Lishi is, SPLITS
 *                 them — every 呂梁 point in Wikipedia's tone table does:
 *                 汾陽 324/22, 吳堡 213/33, 興縣 324/55, 嵐縣 214/44. A Lishi
 *                 row cannot have Taiyuan's inventory, and this one has it
 *                 exactly, all nine contours. See handoff item 23.
 *
 * For contrast, what a properly differentiated pair looks like: yue / yue_ts
 * shares 7 of 11 (Taishanese really does have its own system), wuu / wuu_sz
 * 5 of 20, nan / nan_te 6 of 15.
 *
 * The full ranked table is advisory and worth reading — `yue_gz` sits at 73-82%
 * against every other Yue row including Taishanese, which no genuine Gaozhou
 * row should, and it is independently on the lexical check's unresolved list.
 *
 * Usage:
 *   node tools/sinitic_tone_system_share_check.js          # full report
 *   node tools/sinitic_tone_system_share_check.js --check  # "shared tone systems: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Reviewed and kept, with the reason.
const ALLOW = {
    // One standard language, one set of tone categories. The rows differ where
    // they should: 41 of 66 surfaces.
    'zh|zh_tw': true,
};

// Known debt: real, cannot be fixed without a source. Counted separately so the
// gate can sit at 0 for anything NEW.
const DEBT = {
    'cjy|cjy_lv': 'Lishi carries Taiyuan\'s tone system. 呂梁片 splits 平聲; '
        + '并州片 merges it. Needs published Lishi (離石) Chao values — Wikipedia\'s '
        + 'Jin tone table omits the point, and borrowing 臨縣\'s or 汾陽\'s would '
        + 'repeat the error. See handoff 23.',
};

const GROUPS = {
    nan: /^nan(_|$)/, hak: /^hak(_|$)/, yue: /^yue(_|$)/, wuu: /^wuu(_|$)/,
    gan: /^gan(_|$)/, cjy: /^cjy(_|$)/, hsn: /^hsn(_|$)/, cdo: /^cdo(_|$)/,
    zh: /^zh(_|$)/,
};

const MIN_TOKENS = 25;          // below this a row has no inventory worth naming
const ADVISORY_FLOOR = 0.60;    // what the ranked table prints

const CHAO = /[˥-˩]+/gu;

const ctx = vm.createContext({});
vm.runInContext('var window = this; this.WORDS = window.WORDS = {};', ctx);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
    try { vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), ctx, { filename: f }); }
    catch (e) { /* another guard's problem */ }
const W = vm.runInContext('window.WORDS', ctx);

const cell = (c) => (Array.isArray(c) ? c : (c && c.form ? [c.form, c.ipa] : null));

const codes = new Set();
for (const id of Object.keys(W)) for (const k of Object.keys(W[id].data || {})) codes.add(k);

const inv = {};
for (const c of codes) {
    const set = new Set(); let n = 0;
    for (const id of Object.keys(W)) {
        const x = cell((W[id].data || {})[c]);
        if (!x || !x[1]) continue;
        for (const t of String(x[1]).match(CHAO) || []) { set.add(t); n++; }
    }
    if (n >= MIN_TOKENS) inv[c] = set;
}

const pairs = [];
for (const re of Object.values(GROUPS)) {
    const m = [...codes].filter((k) => re.test(k) && inv[k]).sort();
    for (let i = 0; i < m.length; i++) for (let j = i + 1; j < m.length; j++) {
        const A = inv[m[i]], B = inv[m[j]];
        const shared = [...A].filter((x) => B.has(x)).length;
        const union = new Set([...A, ...B]).size;
        pairs.push({ key: m[i] + '|' + m[j], a: m[i], b: m[j], sa: A.size, sb: B.size, shared, union, j: shared / union });
    }
}
pairs.sort((x, y) => y.j - x.j);

const identical = pairs.filter((p) => p.j === 1 && !ALLOW[p.key]);
const New = identical.filter((p) => !DEBT[p.key]);

if (CHECK) {
    console.log('shared tone systems: ' + New.length);
    console.log('known debt: ' + identical.filter((p) => DEBT[p.key]).length);
} else {
    console.log('Rows in one Sinitic group sharing a tone-contour inventory.\n');
    for (const p of identical) {
        console.log('### ' + p.a + ' / ' + p.b + '  — identical, ' + p.shared + ' of ' + p.shared + ' contours'
            + (DEBT[p.key] ? '  [known debt]' : '  [NEW]'));
        console.log('    ' + [...inv[p.a]].join(' '));
        if (DEBT[p.key]) console.log('    ' + DEBT[p.key].replace(/\s+/g, ' '));
        console.log('');
    }
    console.log('Ranked overlap (advisory, >= ' + (ADVISORY_FLOOR * 100) + '%):');
    console.log('  ' + 'pair'.padEnd(24) + '|A| |B| shared  union  overlap');
    for (const p of pairs.filter((p) => p.j >= ADVISORY_FLOOR))
        console.log('  ' + (p.a + ' / ' + p.b).padEnd(24) + String(p.sa).padEnd(4) + String(p.sb).padEnd(4)
            + String(p.shared).padEnd(8) + String(p.union).padEnd(7) + (p.j * 100).toFixed(0) + '%'
            + (ALLOW[p.key] ? '  (allowed)' : DEBT[p.key] ? '  (known debt)' : ''));
    console.log('\nshared tone systems: ' + New.length + ' new, ' + identical.filter((p) => DEBT[p.key]).length + ' known');
}
