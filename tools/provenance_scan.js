#!/usr/bin/env node
/*
 * provenance_scan.js — find WordMap rows that are carrying another row's data.
 *
 * Run from anywhere:
 *     node /home/jounlai/langmap-work/rally/r7/provenance_scan.js
 *     node ... --words <dir>     scan a snapshot instead of <repo>/words
 *     node ... --top N           how many pairs to print (default 40)
 *     node ... --json <file>     dump the full ranked table
 *     node ... --pair a/b        explain one pair
 *     node ... --row code        every scored pair a row appears in
 *
 * WHY NOT RAW SIMILARITY
 * ----------------------
 * Neighbouring Chinese lects share most of their basic vocabulary; Adyghe and
 * Kabardian share 28 of 65 cells legitimately; io/eo at 44 of 77 is exactly what
 * an Esperantido looks like. A scan that reports similar pairs reports a thousand
 * true cognate sets and gets switched off. So nothing here scores raw identity.
 * Every shape is identity IN A DIMENSION THE TWO ROWS CANNOT SHARE, or identity
 * that some *other* field of the row contradicts.
 *
 * Two corrections run under all of them.
 *
 * RARITY. An identical `coffee` cell is worth nothing — four hundred rows have
 * it. Every identical cell is weighted 1/(rows in the atlas holding that form),
 * so a shared wanderwort contributes ~0 and a shared idiosyncratic transcription
 * contributes ~0.5. `idW` below is that weighted count.
 *
 * CLUSTER DENSITY. Provenance is a two-row event; a dialect continuum is a
 * many-row fact. If several other rows sit almost as close to X as Y does, the
 * identity is a property of the cluster (es_*, pt_*, en_*) and carries no
 * information. Density divides the score rather than gating it, so a real defect
 * inside a dense cluster can still surface on a strong shape.
 *
 * THE SHAPES
 * ----------
 *  1 tone-inventory       the row carries the other's tone CATEGORIES, not just
 *                         its values. Two lects in different 片 cannot have the
 *                         same inventory. (cjy_lv <- Taiyuan)
 *  2 tone-substitution    the segments are identical and the tone letters are a
 *                         clean relabelling of the source's — a find-and-replace,
 *                         not a sound change. (czh_wy <- czh)
 *  3 mosaic               the row's cells are covered by TWO other rows that are
 *                         themselves unlike each other, each owning part of the
 *                         row exclusively. Assembled, not collected.
 *                         (zh_zz <- Kaifeng + Jinan)
 *  4 cliff                the best match stands far above the third-best. A row
 *                         in a real continuum sits on a plateau; a copy sits on a
 *                         cliff. Corroboration only — never enough alone.
 *  5 script-mismatch      the row's surfaces are in the source row's script and
 *                         its own `script` field names another one.
 *  6 alien-grapheme       cell-level. A grapheme the row uses ONLY in the cells
 *                         identical to the other row, where elsewhere that row's
 *                         grapheme answers to a different one of its own.
 *                         (ady bone/drink <- kbd: шъ vs щ)
 *  7 core-vocab           the identity sits in the pronouns and low numerals of a
 *                         pair that otherwise barely matches.
 *  8 subgroup-clash       the rows' own `family` fields name disjoint subgroups
 *                         and they are still this close.
 *  9 surface-without-reading  the spelling was taken and the reading was not.
 *                         (kxm <- km)
 * 10 import-spike         the pair has few cognate-looking cells and a block of
 *                         byte-identical rare ones. A real relative leaves a tail
 *                         of near-misses; an import leaves none.
 *                         (qxs <- cng, blk <- my, yuy <- Khalkha)
 * 11 cross-concept        a cell byte-identical to a different concept in the
 *                         same row. (ii star = ii dog)
 *
 * Score = the strongest shape + a quarter of each corroborating shape, divided
 * by cluster density. One shape is a lead; three agreeing is a finding.
 */
const fs = require('fs');
const path = require('path');
const L = require(path.join(__dirname, 'pv_lib.js'));
const P = require(path.join(__dirname, 'pv_pairs.js'));

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i < 0 ? d : argv[i + 1]; };
const WORDS_DIR = opt('--words', path.join(L.ROOT, 'words'));
const TOP = parseInt(opt('--top', '40'), 10);
const JSON_OUT = opt('--json', null);
const ONE_PAIR = opt('--pair', null);
const ONE_ROW = opt('--row', null);

const WORDS = L.load(WORDS_DIR);
const { wids, rows } = L.buildRows(WORDS);
let META = {};
try { META = L.loadMeta() || {}; } catch (e) { /* snapshots may predate the meta file */ }

/* ---------------------------------------------------------------- helpers */
const CHAO = new RegExp('[\\u02e5-\\u02e9]+', 'gu');
function toneInventory(r) {
    const m = new Map();
    for (const c of r.cells.values()) for (const t of (c.i.match(CHAO) || [])) m.set(t, (m.get(t) || 0) + 1);
    return new Set([...m].filter(e => e[1] >= 2).map(e => e[0]));
}
function jaccard(a, b) {
    if (!a.size || !b.size) return 0;
    let inter = 0;
    for (const x of a) if (b.has(x)) inter++;
    return inter / (a.size + b.size - inter);
}
function edit(x, y) {
    const m = x.length, n = y.length;
    if (!m && !n) return 0;
    const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
    return d[m][n] / Math.max(m, n, 1);
}
function kmApart(a, b) {
    const A = META[a], B = META[b];
    if (!A || !B || A.lat == null || B.lat == null) return null;
    const R = 6371, rad = Math.PI / 180;
    const dLat = (B.lat - A.lat) * rad, dLng = (B.lng - A.lng) * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(A.lat * rad) * Math.cos(B.lat * rad) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
}
const famOf = c => (META[c] && META[c].meta && META[c].meta.family) || '';
const scriptField = c => (META[c] && META[c].meta && META[c].meta.script) || '';

/* Rarity: how many rows in the whole atlas hold this exact reading of this
 * concept. `coffee` at 400 is a wanderwort; a Jin transcription at 2 is not. */
const formCount = new Map();
for (const r of rows.values())
    for (const [w, c] of r.cells) {
        if (!c.il) continue;
        const k = w + P.SEP + c.il;
        formCount.set(k, (formCount.get(k) || 0) + 1);
    }
const weightOf = (w, il) => 1 / Math.max(1, formCount.get(w + P.SEP + il) || 1);
const surfCount = new Map();
for (const r of rows.values())
    for (const [w, c] of r.cells) {
        if (!c.sl) continue;
        const k = w + P.SEP + c.sl;
        surfCount.set(k, (surfCount.get(k) || 0) + 1);
    }
const sWeightOf = (w, sl) => 1 / Math.max(1, surfCount.get(w + P.SEP + sl) || 1);

/* Dominant script of a row's surface forms. */
const rowScript = new Map();
for (const [code, r] of rows) {
    const counts = {};
    for (const c of r.cells.values()) {
        const s = L.scriptOf(c.s);
        if (s) counts[s] = (counts[s] || 0) + 1;
    }
    let best = null, bn = 0, tot = 0;
    for (const [k, v] of Object.entries(counts)) { tot += v; if (v > bn) { bn = v; best = k; } }
    rowScript.set(code, { script: best, share: tot ? bn / tot : 0 });
}

const inv = new Map();
for (const [code, r] of rows) inv.set(code, toneInventory(r));

const CORE = ['i', 'you', 'we', 'one', 'two', 'three', 'five', 'name', 'eye', 'water', 'tooth', 'tongue'];

/* ------------------------------------------------------------ pair table */
const cands = P.candidates(rows, 4);
const pairs = [];
const byRow = new Map();
for (const code of rows.keys()) byRow.set(code, []);
for (const k of cands) {
    const [a, b] = k.split('|');
    const A = rows.get(a), B = rows.get(b);
    const s = P.pairStat(A, B);
    if (s.sh < 12) continue;
    let zero = 0, near = 0, idW = 0;
    for (const [w, x] of A.cells) {
        const y = B.cells.get(w);
        if (!y || !x.seg || !y.seg) continue;
        const d = edit(x.seg, y.seg);
        if (d === 0) zero++; else if (d <= 0.55) near++;
    }
    for (const w of s.idCells) idW += weightOf(w, A.cells.get(w).il);
    let idSW = 0;
    for (const [w, x] of A.cells) {
        const y = B.cells.get(w);
        if (y && x.sl && x.sl === y.sl) idSW += sWeightOf(w, x.sl);
    }
    /* Tone relabelling looks clean in whichever direction the copy went, so
     * measure both and keep the cleaner. */
    const cleanliness = (m) => {
        if (!m.size) return { fn: 0, size: 0, clean: 0 };
        let clean = 0;
        for (const [, set] of m) if (set.size === 1) clean++;
        return { fn: clean / m.size, size: m.size, clean };
    };
    const rev = new Map();
    for (const [k2, set] of s.toneMap) for (const v of set) {
        if (!rev.has(v)) rev.set(v, new Set());
        rev.get(v).add(k2);
    }
    const fwd = cleanliness(s.toneMap), bwd = cleanliness(rev);
    pairs.push({
        a, b, sh: s.sh, idS: s.idS, idI: s.idI, idSeg: s.idSeg, tsh: s.tsh, idW, idSW,
        rS: s.idS / s.sh, rI: s.idI / s.sh, rSeg: s.idSeg / s.sh,
        toneAgree: s.idSeg ? s.idI / s.idSeg : null,
        toneMap: s.toneMap, toneClean: fwd.fn >= bwd.fn ? fwd : bwd,
        idCells: s.idCells, diffCells: s.diffCells,
        zero, near, bimod: zero + near ? zero / (zero + near) : 0,
    });
}
for (const p of pairs) { byRow.get(p.a).push(p); byRow.get(p.b).push(p); }
for (const v of byRow.values()) v.sort((x, y) => y.rSeg - x.rSeg);
const pairIndex = new Map();
for (const p of pairs) pairIndex.set(p.a + '|' + p.b, p);
const getPair = (a, b) => pairIndex.get(a + '|' + b) || pairIndex.get(b + '|' + a);

/* -------------------------------------------------------------- shape 1 */
function shapeToneInventory(p) {
    const A = inv.get(p.a), B = inv.get(p.b);
    if (A.size < 4 || B.size < 4) return null;
    const j = jaccard(A, B);
    if (j < 0.62 || p.rSeg < 0.3) return null;
    const sc = Math.min(1, (j - 0.55) / 0.35) * Math.min(1, (p.rSeg - 0.25) / 0.4);
    if (sc < 0.15) return null;
    return { name: 'tone-inventory', score: sc, note: `tone inventories Jaccard ${j.toFixed(2)} — ${[...A].join(' ')} | ${[...B].join(' ')}` };
}

/* -------------------------------------------------------------- shape 2 */
function shapeToneSubstitution(p) {
    const c = p.toneClean;
    if (!c || c.size < 4 || p.idSeg < 10) return null;
    if (p.toneAgree == null || p.toneAgree > 0.62) return null;
    if (c.fn < 0.72) return null;
    const sc = Math.min(1, (c.fn - 0.6) / 0.35) * Math.min(1, (p.rSeg - 0.25) / 0.4) * Math.min(1, c.size / 5);
    if (sc < 0.15) return null;
    return {
        name: 'tone-substitution', score: sc,
        note: `${p.idSeg} cells segment-identical but only ${p.idI} identical in full: the tone letters are a ${c.clean}/${c.size} one-to-one relabelling — ` +
            [...p.toneMap].slice(0, 6).map(([k, v]) => `${k}>${[...v].join('/')}`).join(' ')
    };
}

/* -------------------------------------------------------------- shape 3 */
const mosaicByRow = new Map();
function computeMosaic() {
    for (const [code, r] of rows) {
        const mine = byRow.get(code) || [];
        if (mine.length < 2) continue;
        const cover = mine.map(p => ({ other: p.a === code ? p.b : p.a, cells: new Set(p.idCells) }))
            .filter(x => x.cells.size >= 5).sort((x, y) => y.cells.size - x.cells.size).slice(0, 10);
        if (cover.length < 2) continue;
        const n = r.cells.size;
        let best = null;
        for (let i = 0; i < cover.length; i++) for (let j = i + 1; j < cover.length; j++) {
            /* The two sources must be unlike EACH OTHER in the dimension the
             * cover is measured in. Two rows of one dialect cluster covering a
             * third twice over proves nothing. */
            const sp = getPair(cover[i].other, cover[j].other);
            if (sp && sp.rI > 0.5) continue;
            const u = new Set([...cover[i].cells, ...cover[j].cells]);
            const exI = [...cover[i].cells].filter(c => !cover[j].cells.has(c)).length;
            const exJ = [...cover[j].cells].filter(c => !cover[i].cells.has(c)).length;
            const gain = u.size - Math.max(cover[i].cells.size, cover[j].cells.size);
            if (u.size / n < 0.62 || gain < 4) continue;
            const sc = Math.min(1, (u.size / n - 0.5) / 0.4) * Math.min(1, gain / 8);
            if (!best || sc > best.score) best = {
                name: 'mosaic', score: sc, sources: [cover[i].other, cover[j].other],
                note: `${u.size}/${n} of ${code}'s cells are byte-identical to ${cover[i].other} (${cover[i].cells.size}) or ${cover[j].other} (${cover[j].cells.size}); ${exI} to ${cover[i].other} alone, ${exJ} to ${cover[j].other} alone, and the two sources agree on only ${sp ? (sp.rI * 100) | 0 : 0}% of their own cells`
            };
        }
        if (best && best.score > 0.15) mosaicByRow.set(code, best);
    }
}

/* -------------------------------------------------------------- shape 4 */
function cliffFor(code) {
    const mine = byRow.get(code) || [];
    if (!mine.length) return null;
    const vals = mine.map(p => ({ other: p.a === code ? p.b : p.a, r: p.rSeg }));
    const m1 = vals[0];
    const m3 = vals[2] ? vals[2].r : (vals[1] ? vals[1].r * 0.5 : 0);
    return { top: m1.other, m1: m1.r, m3, gap: m1.r - m3 };
}
function shapeCliff(p) {
    for (const [self, other] of [[p.a, p.b], [p.b, p.a]]) {
        const c = cliffFor(self);
        if (!c || c.top !== other || c.m1 < 0.45 || c.gap < 0.28) continue;
        const sc = 0.6 * Math.min(1, (c.gap - 0.2) / 0.4) * Math.min(1, (c.m1 - 0.35) / 0.35);
        if (sc < 0.12) continue;
        return { name: 'cliff', score: sc, note: `${self} matches ${other} at ${c.m1.toFixed(2)} and its third-best relative at only ${c.m3.toFixed(2)}` };
    }
    return null;
}

/* -------------------------------------------------------------- shape 5 */
const SCRIPT_WORDS = {
    Han: /chinese|han\b|hanzi|kanji|漢|汉/i, Cyrillic: /cyrillic/i,
    Arabic: /arabic|ajami|jawi|perso|nasta/i, Devanagari: /devanagari|nagari/i, Thai: /thai/i,
    Lao: /lao/i, Khmer: /khmer/i, Myanmar: /burmese|myanmar|mon\b|shan/i, Hebrew: /hebrew/i,
    Greek: /greek/i, Hangul: /hangul|korean/i, Ethiopic: /ethiopic|ge.ez|fidel/i,
    Georgian: /georgian|mkhedruli/i, Armenian: /armenian/i, Tamil: /tamil/i,
    Bengali: /bengali|assamese|nagari/i, Tibetan: /tibetan|uchen|dbu/i, Syriac: /syriac/i,
    Yi: /\byi\b|nuosu|liangshan/i, Tifinagh: /tifinagh/i, Canadian_Aboriginal: /syllabic/i,
    Sinhala: /sinhala/i, Telugu: /telugu/i, Kannada: /kannada/i, Malayalam: /malayalam/i,
    Gujarati: /gujarati/i, Gurmukhi: /gurmukhi/i, Oriya: /odia|oriya/i, Cherokee: /cherokee/i,
    Vai: /\bvai\b/i, Adlam: /adlam/i, Thaana: /thaana|dhivehi/i,
    Phoenician: /phoenician|punic/i, Hiragana: /kana|japanese/i, Katakana: /kana|japanese/i,
    // the Unicode Mongolian block also encodes Manchu, Xibe and Todo
    Mongolian: /mongolian|manchu|xibe|sibe|todo|oirat|clear script/i,
};
function shapeScript(p) {
    for (const [self, other] of [[p.a, p.b], [p.b, p.a]]) {
        const rs = rowScript.get(self), ro = rowScript.get(other);
        if (!rs || !rs.script || !ro || rs.script !== ro.script || rs.share < 0.7) continue;
        /* Latin surfaces are the atlas's romanisation policy for rows whose own
         * script is historical or unwritten — never evidence of provenance. */
        if (rs.script === 'Latin') continue;
        const decl = scriptField(self);
        const re = SCRIPT_WORDS[rs.script];
        if (!decl || !re || re.test(decl)) continue;
        if (p.rS < 0.45) continue;
        return {
            name: 'script-mismatch', score: Math.min(1, (p.rS - 0.35) / 0.45),
            note: `${self} writes ${Math.round(rs.share * 100)}% of its surfaces in ${rs.script}, the script ${other} uses, while its own script field says "${decl}"`
        };
    }
    return null;
}

/* -------------------------------------------------------------- shape 6 */
function grams(s) {
    const out = new Set();
    const t = L.lc(s);
    for (let i = 0; i < t.length; i++) { out.add(t[i]); if (i + 1 < t.length) out.add(t.slice(i, i + 2)); }
    return out;
}
function shapeAlienGrapheme(p) {
    const hits = [];
    for (const [self, other] of [[p.a, p.b], [p.b, p.a]]) {
        const S = rows.get(self), O = rows.get(other);
        const idSet = new Set(p.idCells);
        if (idSet.size < 2 || idSet.size > S.cells.size * 0.8 || S.cells.size < 20) continue;
        const inId = new Map(), inRest = new Set();
        for (const [w, c] of S.cells) {
            const g = grams(c.s);
            if (idSet.has(w)) { for (const x of g) { if (!inId.has(x)) inId.set(x, []); inId.get(x).push(w); } }
            else for (const x of g) inRest.add(x);
        }
        const oCells = new Map();
        for (const [w, c] of O.cells) {
            if (idSet.has(w)) continue;
            for (const x of grams(c.s)) { if (!oCells.has(x)) oCells.set(x, []); oCells.get(x).push(w); }
        }
        for (const [g, cells] of inId) {
            if (g.length < 2 || inRest.has(g) || cells.length > 6) continue;
            const oc = (oCells.get(g) || []).filter(w => S.cells.has(w));
            if (oc.length < 3) continue;
            /* The correspondence test. Where the other row writes g and this row
             * does not, does this row write a fixed counterpart of its own? */
            const counts = new Map();
            for (const w of oc) {
                const c = S.cells.get(w), og = grams(O.cells.get(w).s);
                for (const x of grams(c.s)) if (x.length > 1 && !og.has(x)) counts.set(x, (counts.get(x) || 0) + 1);
            }
            let best = null, bn = 0;
            for (const [x, n] of counts) if (n > bn) { bn = n; best = x; }
            const support = oc.length ? bn / oc.length : 0;
            if (support < 0.5 || bn < 2) continue;
            hits.push({ self, other, g, counter: best, support, cells, oCount: oc.length });
        }
    }
    if (!hits.length) return null;
    hits.sort((x, y) => (y.support * y.oCount) - (x.support * x.oCount));
    const h = hits[0];
    const cells = [...new Set(hits.filter(x => x.self === h.self && x.counter === h.counter).flatMap(x => x.cells))];
    const sc = Math.min(1, cells.length / 5) * Math.min(1, h.oCount / 6) * h.support;
    if (sc < 0.12) return null;
    return {
        name: 'alien-grapheme', score: sc, self: h.self, cells,
        note: `${h.self} writes <${h.g}> only in the ${cells.length} cell(s) identical to ${h.other} (${cells.join(', ')}); elsewhere ${h.other}'s <${h.g}> answers to ${h.self}'s <${h.counter}> in ${Math.round(h.support * 100)}% of ${h.oCount} cells`
    };
}

/* -------------------------------------------------------------- shape 7 */
function shapeCoreVocab(p) {
    if (p.rSeg > 0.5 || p.rSeg < 0.08) return null;
    const core = p.idCells.filter(c => CORE.includes(c));
    if (core.length < 3) return null;
    const both = CORE.filter(c => rows.get(p.a).cells.has(c) && rows.get(p.b).cells.has(c)).length;
    if (core.length < p.rI * both * 1.7) return null;
    const sc = Math.min(1, (core.length - 2) / 5) * Math.min(1, (0.55 - p.rSeg) / 0.4);
    if (sc < 0.12) return null;
    return { name: 'core-vocab', score: sc, note: `${core.length} core cells byte-identical (${core.join(', ')}) though the pair agrees on only ${(p.rSeg * 100) | 0}% of the lexicon` };
}

/* -------------------------------------------------------------- shape 8 */
function famTokens(f) {
    const m = /\(([^)]*)\)/.exec(f);
    return new Set((m ? m[1] : f).split(/[,—–/;]/).map(x => x.trim().toLowerCase()).filter(x => x.length > 2));
}
function shapeSubgroupClash(p) {
    const fa = famOf(p.a), fb = famOf(p.b);
    if (!fa || !fb || p.rSeg < 0.55) return null;
    const A = famTokens(fa), B = famTokens(fb);
    if (!A.size || !B.size) return null;
    let inter = 0;
    for (const x of A) if (B.has(x)) inter++;
    if (inter === Math.min(A.size, B.size)) return null;     // subset = depth, not disagreement
    if (inter / Math.min(A.size, B.size) > 0.34) return null;
    const w = 0.6 * Math.min(1, (p.rSeg - 0.5) / 0.4);
    if (w < 0.15) return null;
    return { name: 'subgroup-clash', score: w, note: `declared subgroups share no label — "${fa}" vs "${fb}" — yet ${(p.rSeg * 100) | 0}% of segments are identical` };
}

/* -------------------------------------------------------------- shape 9 */
function declaredScript(code) {
    const f = scriptField(code);
    if (!f) return null;
    for (const [name, re] of Object.entries(SCRIPT_WORDS)) if (re.test(f)) return name;
    return /latin|roman/i.test(f) ? 'Latin' : null;
}
function shapeSurfaceWithoutReading(p) {
    /* Measured in rarity-weighted cells rather than rates: a shared `coffee`
     * spelling is not evidence and a shared idiosyncratic one is.
     *
     * And gated on the two rows not being SUPPOSED to spell alike. Catalan and
     * Valencian, Eastern and Western Armenian, Modern and Mishnaic Hebrew,
     * Burmese and Rakhine all share one orthography and differ only in how it is
     * read; that is the atlas's design, not a copy. The shape means something
     * only when the rows' own script fields name different scripts. */
    const sa = declaredScript(p.a), sb = declaredScript(p.b);
    if (!sa || !sb || sa === sb) return null;
    const gap = p.idSW - p.idW;
    if (p.idSW < 3.5 || gap < 2.5) return null;
    if (p.rS < 0.4) return null;
    if (rowScript.get(p.a).script === 'Han' && rowScript.get(p.b).script === 'Han') return null;
    const sc = Math.min(1, (gap - 1.5) / 4) * Math.min(1, (p.idSW - 2) / 6) * Math.min(1, (p.rS - 0.3) / 0.35);
    if (sc < 0.12) return null;
    return {
        name: 'surface-without-reading', score: sc,
        note: `${p.idS}/${p.sh} surfaces identical (weighted ${p.idSW.toFixed(1)}) but only ${p.idI} readings (weighted ${p.idW.toFixed(1)}) — the spelling travelled and the transcription did not`
    };
}

/* ------------------------------------------------------------- shape 10 */
/* A genuine relative leaves a tail of near-misses: cognates worn down by regular
 * change. An import leaves none — a block of byte-identical cells and then a
 * cliff to unrelated words. Weighted by rarity so shared wanderworts (coffee,
 * wifi, chocolate) contribute nothing. */
function shapeImportSpike(p) {
    if (p.rSeg > 0.55 || p.idI < 4 || p.idW < 3 || p.bimod < 0.45) return null;
    const sc = Math.min(1, (p.bimod - 0.38) / 0.4) * Math.min(1, (p.idW - 2) / 5) * Math.min(1, (0.6 - p.rSeg) / 0.35);
    if (sc < 0.15) return null;
    return {
        name: 'import-spike', score: sc,
        note: `${p.zero} cells byte-identical against only ${p.near} merely-similar ones (weighted identity ${p.idW.toFixed(1)}), at ${(p.rSeg * 100) | 0}% overall agreement — identity without a cognate tail`
    };
}

/* ------------------------------------------------------------- shape 12 */
/* NOTATION-ONLY TWIN. The sharpest version of shape 2. Two lects can share a
 * regular tone correspondence — that is what tone categories ARE — so a clean
 * one-to-one tone map is not by itself evidence. What is evidence is a map that
 * turns out to be the IDENTITY once notation is normalised away: Chao letters
 * doubled (˥ written ˥˥), vowel length dropped, release diacritics added. A row
 * that differs from another only in how the same values are typed was produced
 * from it by reformatting, not collected from a speaker.
 *
 * yue_gz against yue: 34 of 55 cells segment-identical, only 20 identical in
 * full, and every one of the 15 tone correspondences is ˥>˥˥, ˧>˧˧, ˨>˨˨. */
const collapse = (t) => t.replace(/(.)\1+/gu, '$1');
/* Only the Chao letters are normalised, and only for doubling. Normalising
 * vowel length too turns every pair where one row marks length and the other
 * does not into a hit — a real notation problem, but not this one. */
const loose = (c) => L.norm(c.i).replace(new RegExp('([\\u02e5-\\u02e9])\\1+', 'gu'), '$1').toLowerCase();
function shapeNotationTwin(p) {
    const A = rows.get(p.a), B = rows.get(p.b);
    let both = 0, strict = 0, loosely = 0;
    for (const [w, x] of A.cells) {
        const y = B.cells.get(w);
        if (!y || !x.il || !y.il) continue;
        both++;
        if (x.il === y.il) strict++;
        if (loose(x) === loose(y)) loosely++;
    }
    if (both < 15) return null;
    const gain = (loosely - strict) / both;
    if (loosely / both < 0.5 || gain < 0.12) return null;
    const sc = Math.min(1, (loosely / both - 0.4) / 0.4) * Math.min(1, gain / 0.25);
    if (sc < 0.2) return null;
    return {
        name: 'notation-twin', score: sc,
        note: `${strict}/${both} cells identical as written, but ${loosely}/${both} once repeated Chao letters are collapsed (˥˥ to ˥) — the tone VALUES are the other row's, retyped`
    };
}

/* ------------------------------------------------------------- shape 11 */
function crossConcept() {
    const out = [];
    for (const [code, r] of rows) {
        const byForm = new Map();
        for (const [w, c] of r.cells) {
            if (!c.sl) continue;
            const k = c.sl + P.SEP + c.il;
            if (!byForm.has(k)) byForm.set(k, []);
            byForm.get(k).push(w);
        }
        for (const [k, ws] of byForm) {
            if (ws.length < 2) continue;
            out.push({ code, form: k.split(P.SEP)[0], ipa: k.split(P.SEP)[1], concepts: ws });
        }
    }
    return out;
}

/* ------------------------------------------------- expectation, from the row */
/* The rows say out loud when they are supposed to look alike. "closely related
 * to Nung", "often considered a single cluster", "the same language written in
 * Nom", "the standard variety used in Austria" — a pair whose own prose names
 * the other row in those terms is a declared sibling, and identity between them
 * is the atlas working, not a defect. This is shape 8 run in reverse, and it is
 * what keeps io/eo, nut/tyz, ho/meu and el/pnt off the top of the list. */
const SIB = /closely related|mutually intelligible|often (?:considered|analyzed|analysed|treated)|single (?:cluster|language)|dialect (?:of|continuum)|variety of|varieties of|standard variet|same language|descend(?:s|ed) from|derived from|based on|written in|national standard/i;
function nameOf(c) { return (META[c] && META[c].name) || ''; }
function declaredSibling(a, b) {
    for (const [x, y] of [[a, b], [b, a]]) {
        const d = (META[x] && META[x].meta && META[x].meta.description && META[x].meta.description.en) || '';
        if (!d) continue;
        const n = nameOf(y);
        if (!n || n.length < 3) continue;
        const i = d.indexOf(n);
        if (i < 0) continue;
        const window = d.slice(Math.max(0, i - 160), i + 160);
        if (SIB.test(window)) return `${nameOf(x)}'s own description names ${n} as a close relative`;
    }
    return null;
}
/* Sibling code shape: `xx` and `xx_yy`, or `xx_a` and `xx_b`. The atlas uses it
 * for national and regional varieties of one language, which are identical by
 * construction. It is only an attenuator, never a gate — cjy/cjy_lv has exactly
 * this shape and was a real defect. */
function sameBase(a, b) {
    const ba = a.split('_')[0], bb = b.split('_')[0];
    return ba === bb && a !== b;
}

/* ----------------------------------------------------------------- score */
computeMosaic();
const SHAPES = [shapeToneInventory, shapeToneSubstitution, shapeCliff, shapeScript,
    shapeAlienGrapheme, shapeCoreVocab, shapeSubgroupClash, shapeSurfaceWithoutReading, shapeImportSpike, shapeNotationTwin];
function density(self, r) {
    let n = 0;
    for (const q of byRow.get(self) || []) if (q.rSeg >= r * 0.78) n++;
    return Math.max(0, n - 1);
}
for (const p of pairs) {
    const found = [];
    for (const f of SHAPES) { const r = f(p); if (r) found.push(r); }
    for (const [self, other] of [[p.a, p.b], [p.b, p.a]]) {
        const m = mosaicByRow.get(self);
        if (m && m.sources.includes(other)) found.push({ ...m, self });
    }
    found.sort((x, y) => y.score - x.score);
    p.shapes = found;
    p.dens = Math.min(density(p.a, p.rSeg), density(p.b, p.rSeg));
    p.raw = found.length ? found[0].score + 0.25 * found.slice(1).reduce((s, x) => s + x.score, 0) : 0;
    p.sibling = declaredSibling(p.a, p.b);
    p.sameBase = sameBase(p.a, p.b);
    /* A shape that reads the row's *notation* — its tone system, its script —
     * survives the sibling discount, because two declared varieties of one
     * language still cannot share one lect's tone categories. A shape that only
     * reads the lexicon does not. */
    const hard = p.shapes.some(x => x.name === 'tone-inventory' || x.name === 'tone-substitution' || x.name === 'script-mismatch' || x.name === 'notation-twin');
    let att = 1;
    if (!hard && p.sibling) att *= 0.6;
    if (!hard && p.sameBase) att *= 0.65;
    p.att = att;
    p.score = att * p.raw / (1 + 0.55 * p.dens);
}
pairs.sort((x, y) => y.score - x.score);

/* ---------------------------------------------------------------- output */
function explain(p) {
    const d = kmApart(p.a, p.b);
    const lines = [
        `${p.a} / ${p.b}   score ${p.score.toFixed(3)}   [raw ${p.raw.toFixed(2)} / density ${p.dens}` +
        (p.att < 1 ? ` / discounted x${p.att.toFixed(2)}` : '') + `]` +
        (p.sibling ? `\n  (declared sibling: ${p.sibling})` : ''),
        `  shared=${p.sh} surface=${p.idS} ipa=${p.idI} segments=${p.idSeg} idW=${p.idW.toFixed(1)} idSW=${p.idSW.toFixed(1)}` +
        `  rSeg=${p.rSeg.toFixed(2)} rI=${p.rI.toFixed(2)}` +
        (p.toneAgree != null ? ` toneAgree=${p.toneAgree.toFixed(2)}` : '') +
        `  bimod=${p.bimod.toFixed(2)}` + (d != null ? ` ${Math.round(d)}km` : ''),
    ];
    for (const s of p.shapes) lines.push(`  [${s.name} ${s.score.toFixed(2)}] ${s.note}`);
    return lines.join('\n');
}

if (ONE_PAIR) {
    const [a, b] = ONE_PAIR.split('/');
    const p = getPair(a, b);
    console.log(p ? explain(p) : `no candidate pair ${ONE_PAIR}`);
    process.exit(0);
}
if (ONE_ROW) {
    for (const p of pairs) if (p.a === ONE_ROW || p.b === ONE_ROW) console.log(explain(p) + '\n');
    process.exit(0);
}

console.log(`# provenance scan — ${rows.size} rows, ${wids.length} concepts, ${pairs.length} candidate pairs\n`);
console.log(`## ranked pairs (top ${TOP})\n`);
let n = 0;
for (const p of pairs) {
    if (p.score <= 0 || n >= TOP) break;
    console.log(`${String(++n).padStart(3)}. ${explain(p)}\n`);
}
const cc = crossConcept();
console.log(`## cross-concept: ${cc.length} rows hold one form AND one reading in two concepts`);
for (const x of cc.slice(0, 60)) console.log(`  ${x.code}: ${x.concepts.join(' = ')}  "${x.form}" /${x.ipa}/`);

if (JSON_OUT) {
    fs.writeFileSync(JSON_OUT, JSON.stringify({
        pairs: pairs.filter(p => p.score > 0).map(p => ({
            a: p.a, b: p.b, score: p.score, raw: p.raw, dens: p.dens, att: p.att, sibling: p.sibling, sameBase: p.sameBase, sh: p.sh,
            idS: p.idS, idI: p.idI, idSeg: p.idSeg, idW: p.idW, idSW: p.idSW,
            rS: p.rS, rI: p.rI, rSeg: p.rSeg, toneAgree: p.toneAgree, bimod: p.bimod,
            shapes: p.shapes.map(s => ({ name: s.name, score: s.score, note: s.note, self: s.self, cells: s.cells })),
            idCells: p.idCells,
        })),
        crossConcept: cc,
    }, null, 1));
}
module.exports = { pairs, rows, wids, META, getPair };
