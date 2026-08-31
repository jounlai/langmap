#!/usr/bin/env node
/*
 * korean_hist_font_check.js — Old Hangul must be readable on every page.
 *
 * The Korean historical rows write things no system font handles on its own:
 * conjoining jamo (U+1100-11FF and Ext-A/B), the archaic compatibility letters
 * ㅸ ㅭ ㅿ ㆁ ㆆ (U+3130-318F), and the 방점 tone marks U+302E-302F. Google's
 * Noto Sans/Serif KR web subsets omit the conjoining block entirely, so
 * without a self-hosted @font-face they compose wrong on desktop Chrome and
 * tofu outright on iOS.
 *
 * Three things have to line up, and each has failed in production:
 *
 *   1. the FONT has to carry the codepoint. wordmap.html and hanmap.html used
 *      to ship two different hand-cut subsets, and each was found to be one
 *      codepoint short of its OWN page (wordmap ᄄ U+1104, hanmap ᅲ U+1172).
 *   2. the @font-face unicode-range has to CLAIM the codepoint.
 *   3. the family name has to appear in the font-family CHAIN of the page
 *      that renders it — unicode-range narrows a face, it does not install
 *      one. styles.css had no @font-face at all, which is why the Lang Map
 *      sentences (Middle Korean 나ᄂᆞᆫ 새로온 ᄆᆞᄅᆞᆯ …) were broken on
 *      index.html for as long as they had existed.
 *
 * This checks all three, for every data file against every page that loads it.
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const ROOT = path.join(__dirname, '..');
const FONT = 'fonts/NotoSerifKR-OldHangul.woff2';
const FAMILY = 'Noto Serif KR Old Jamo';

const isKorHist = cp =>
    (cp >= 0x1100 && cp <= 0x11FF) || (cp >= 0x302E && cp <= 0x302F) ||
    (cp >= 0x3130 && cp <= 0x318F) || (cp >= 0xA960 && cp <= 0xA97F) ||
    (cp >= 0xD7B0 && cp <= 0xD7FF);

/* Which pages render which data. A page is responsible for every codepoint in
   every data file it loads. */
const PAGES = {
    'wordmap.html': ['wordmap_data.js', 'words'],
    'hanmap.html':  ['hanmap_data.js', 'data.js'],
    'index.html':   ['data.js'],
    'tree.html':    ['data.js'],
    'namemap.html': ['data.js'],
};
/* Pages without their own <style> get their chain from styles.css. */
const SHARED_CSS = new Set(['index.html', 'tree.html', 'namemap.html']);

function cpsIn(file) {
    const set = new Set();
    const add = t => { for (const ch of t) { const c = ch.codePointAt(0); if (isKorHist(c)) set.add(c); } };
    if (file === 'words') {
        for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter(f => f.endsWith('.js')))
            add(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'));
    } else {
        add(fs.readFileSync(path.join(ROOT, file), 'utf8'));
    }
    return set;
}

/* WOFF2 cmap, dependency-free: the compact table directory is followed by one
   brotli stream holding every table back to back. Only glyf/loca are ever
   transformed, so cmap comes out verbatim at its cumulative offset. */
function fontCmap(file) {
    const raw = fs.readFileSync(path.join(ROOT, file));
    const KNOWN = ['cmap','head','hhea','hmtx','maxp','name','OS/2','post','cvt ','fpgm','glyf','loca','prep','CFF ','VORG','EBDT','EBLC','gasp','hdmx','kern','LTSH','PCLT','VDMX','vhea','vmtx','BASE','GDEF','GPOS','GSUB','EBSC','JSTF','MATH','CBDT','CBLC','COLR','CPAL','SVG ','sbix','acnt','avar','bdat','bloc','bsln','cvar','fdsc','feat','fmtx','fvar','gvar','hsty','just','lcar','mort','morx','opbd','prop','trak','Zapf','Silf','Glat','Gloc','Feat','Sill'];
    let o = 48;
    const numTables = raw.readUInt16BE(12);
    const base128 = () => { let v = 0; for (let i = 0; i < 5; i++) { const by = raw[o++]; v = (v << 7) | (by & 0x7f); if (!(by & 0x80)) break; } return v >>> 0; };
    const dir = [];
    for (let i = 0; i < numTables; i++) {
        const flags = raw[o++], idx = flags & 0x3f;
        const tag = idx === 0x3f ? raw.toString('ascii', o, (o += 4)) : KNOWN[idx];
        const origLen = base128();
        const ver = (flags >> 6) & 0x3;
        const transformed = (tag === 'glyf' || tag === 'loca') ? ver !== 3 : ver !== 0;
        dir.push({ tag, len: transformed ? base128() : origLen });
    }
    const b = zlib.brotliDecompressSync(raw.subarray(o));
    let off = -1, cursor = 0;
    for (const t of dir) { if (t.tag === 'cmap') { off = cursor; break; } cursor += t.len; }
    if (off < 0) return null;
    const u16 = x => b.readUInt16BE(x), u32 = x => b.readUInt32BE(x);
    const nSub = u16(off + 2);
    let best = 0, bestFmt = -1;
    for (let i = 0; i < nSub; i++) {
        const p = off + 4 + i * 8, plat = u16(p), enc = u16(p + 2), sub = u32(p + 4), fmt = u16(off + sub);
        if (((plat === 3 && (enc === 1 || enc === 10)) || plat === 0) && fmt >= bestFmt) { bestFmt = fmt; best = off + sub; }
    }
    const set = new Set(), fmt = u16(best);
    if (fmt === 4) {
        const segX2 = u16(best + 6), segc = segX2 / 2, endO = best + 14, startO = endO + segX2 + 2, deltaO = startO + segX2, rangeO = deltaO + segX2;
        for (let s = 0; s < segc; s++) {
            const end = u16(endO + s * 2), start = u16(startO + s * 2), delta = u16(deltaO + s * 2), ro = u16(rangeO + s * 2);
            for (let c = start; c <= end && c !== 0xffff; c++) {
                let g;
                if (ro === 0) g = (c + delta) & 0xffff;
                else { const gi = rangeO + s * 2 + ro + (c - start) * 2; if (gi + 1 >= b.length) continue; g = u16(gi); if (g) g = (g + delta) & 0xffff; }
                if (g) set.add(c);
            }
        }
    } else if (fmt === 12) {
        const ng = u32(best + 12);
        for (let g = 0; g < ng; g++) { const p = best + 16 + g * 12, sc = u32(p), ec = u32(p + 4); for (let c = sc; c <= ec; c++) set.add(c); }
    }
    return set;
}

/* Codepoints claimed by the @font-face whose src is our font file. */
function declaredRange(css) {
    const covered = new Set(), rngs = [];
    for (const blk of css.match(/@font-face\s*{[^}]*}/g) || []) {
        if (!blk.includes(path.basename(FONT))) continue;
        const ur = blk.match(/unicode-range:\s*([^;]+);/i);
        if (!ur) continue;
        for (const tok of ur[1].split(',')) {
            const m = tok.trim().match(/^U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?$/);
            if (!m) continue;
            const lo = parseInt(m[1], 16);
            if (m[2]) rngs.push([lo, parseInt(m[2], 16)]); else covered.add(lo);
        }
    }
    if (!covered.size && !rngs.length) return null;
    return cp => covered.has(cp) || rngs.some(([a, b]) => cp >= a && cp <= b);
}

const hex = cp => 'U+' + cp.toString(16).toUpperCase().padStart(4, '0') + ' ' + String.fromCodePoint(cp);
const problems = [];

const cmap = fontCmap(FONT);
if (!cmap) problems.push(`${FONT}: could not read its cmap`);

const styles = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
for (const page of Object.keys(PAGES)) {
    const need = new Set();
    for (const src of PAGES[page]) for (const c of cpsIn(src)) need.add(c);
    if (!need.size) continue;

    const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
    const css = SHARED_CSS.has(page) ? html + '\n' + styles : html;

    const inRange = declaredRange(css);
    if (!inRange) { problems.push(`${page}: renders ${need.size} Korean historical codepoints but declares no @font-face for ${FONT}`); continue; }
    // The family name inside the @font-face block itself does not install
    // anything — strip the declarations before looking for a real chain.
    const chains = css.replace(/@font-face\s*{[^}]*}/g, '');
    if (!chains.includes(FAMILY)) { problems.push(`${page}: declares the @font-face but never names '${FAMILY}' in a font-family chain, so the browser will never use it`); continue; }

    for (const cp of [...need].sort((a, b) => a - b)) {
        if (cmap && !cmap.has(cp)) problems.push(`${page}: ${hex(cp)} is in its data but NOT in ${FONT}`);
        else if (!inRange(cp)) problems.push(`${page}: ${hex(cp)} is in its data but outside the @font-face unicode-range`);
    }
}

for (const p of problems) console.log('  ✗ ' + p);
console.log(`Korean historical font coverage — problems: ${problems.length}`);
process.exitCode = problems.length ? 1 : 0;
