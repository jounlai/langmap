/* pv_pairs.js — all-pairs statistics over a words/ snapshot. */

const SEP = String.fromCharCode(31);

/* Candidate pairs: any two rows sharing >= minShare segment-identical cells.
   Every shape the scan scores needs segment overlap, so this loses nothing and
   turns 705k pairs into a few tens of thousands. */
function candidates(rows, minShare) {
    const idx = new Map();
    for (const [code, r] of rows) {
        for (const [w, c] of r.cells) {
            if (!c.seg) continue;
            const k = w + SEP + c.seg;
            if (!idx.has(k)) idx.set(k, []);
            idx.get(k).push(code);
        }
    }
    const cnt = new Map();
    for (const codes of idx.values()) {
        // 120+ rows sharing one form is a wanderwort (tea, coffee), not provenance.
        if (codes.length < 2 || codes.length > 120) continue;
        for (let i = 0; i < codes.length; i++) for (let j = i + 1; j < codes.length; j++) {
            const a = codes[i], b = codes[j];
            const k = a < b ? a + '|' + b : b + '|' + a;
            cnt.set(k, (cnt.get(k) || 0) + 1);
        }
    }
    const out = [];
    for (const [k, v] of cnt) if (v >= minShare) out.push(k);
    return out;
}

function pairStat(A, B) {
    let sh = 0, idS = 0, idI = 0, idSeg = 0, tsh = 0, idTone = 0;
    const toneMap = new Map();   // toneA -> Set(toneB), over segment-identical cells
    const idCells = [], diffCells = [], segIdCells = [];
    for (const [w, a] of A.cells) {
        const b = B.cells.get(w);
        if (!b) continue;
        if (!a.il && !a.sl) continue;
        if (!b.il && !b.sl) continue;
        sh++;
        const sameS = !!a.sl && a.sl === b.sl;
        const sameI = !!a.il && a.il === b.il;
        const sameSeg = !!a.seg && a.seg === b.seg;
        if (sameS) idS++;
        if (sameI) idI++;
        if (sameSeg) { idSeg++; segIdCells.push(w); }
        if (a.tone && b.tone) { tsh++; if (a.tone === b.tone) idTone++; }
        if (sameSeg && a.tone && b.tone) {
            if (!toneMap.has(a.tone)) toneMap.set(a.tone, new Set());
            toneMap.get(a.tone).add(b.tone);
        }
        if (sameI) idCells.push(w); else diffCells.push(w);
    }
    return { sh, idS, idI, idSeg, tsh, idTone, toneMap, idCells, diffCells, segIdCells };
}

module.exports = { candidates, pairStat, SEP };
