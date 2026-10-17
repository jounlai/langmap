#!/usr/bin/env node
/*
 * timemap_tibetan_subset_check.js — Time Map self-hosts a subset of Noto Serif
 * Tibetan (fonts/NotoSerifTibetan-timemap*.woff2), and its @font-face
 * unicode-range names exactly the characters that subset carries.
 *
 * A Tibetan word added later with a sign the subset lacks does not fall back
 * cleanly: a stack cannot be shaped across two fonts, so the one missing
 * subjoined letter or vowel shows as a dotted circle. This lists every
 * Tibetan codepoint the page can print — the literal text in timemap.html,
 * timemap_calendars.js and timemap_i18n/, plus the digits U+0F20-0F29 built
 * at runtime — and fails on any the unicode-range does not claim, when the
 * two weights' ranges disagree, or when a range claims a codepoint its woff2
 * file does not map (read from the file's cmap). (Rally review r2, 2026-10-17.)
 *
 * Fix: re-run pyftsubset with the new characters for both weights and list
 * them in both unicode-range descriptors.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const html = fs.readFileSync(path.join(ROOT, 'timemap.html'), 'utf8');
// Each @font-face of the subset: its src file and its unicode-range, in
// either order inside the rule.
const rules = [...html.matchAll(/@font-face\s*\{[^}]*\}/g)].map((m) => m[0])
    .filter((r) => /NotoSerifTibetan-timemap/.test(r))
    .map((r) => ({
        file: (/url\(['"]?([^'")]+)/.exec(r) || [])[1] || '',
        set: parseRange((/unicode-range:\s*([^;}]+)/.exec(r) || [])[1] || ''),
    }));
function parseRange(txt) {
    const out = new Set();
    for (const part of txt.split(',')) {
        const m = /U\+([0-9A-F]+)(?:-([0-9A-F]+))?/i.exec(part.trim());
        if (!m) continue;
        const a = parseInt(m[1], 16), b = parseInt(m[2] || m[1], 16);
        for (let c = a; c <= b; c++) out.add(c);
    }
    return out;
}
const claimed = rules.length ? rules[0].set : new Set();

// The codepoints a WOFF2 file maps (its cmap). WOFF2 never transforms cmap,
// so it is the brotli stream's first bytes from the table's offset on.
function woff2Cmap(file) {
    const zlib = require('zlib');
    const b = fs.readFileSync(file);
    if (b.toString('latin1', 0, 4) !== 'wOF2') throw new Error(file + ': not WOFF2');
    const numTables = b.readUInt16BE(12);
    const compLen = b.readUInt32BE(20);
    let o = 48;
    const base128 = () => { let v = 0; for (let i = 0; i < 5; i++) { const x = b[o++]; v = v * 128 + (x & 0x7f); if (!(x & 0x80)) return v; } throw new Error('bad UIntBase128'); };
    const dir = [];
    for (let i = 0; i < numTables; i++) {
        const flags = b[o++];
        let tag = flags & 0x3f;
        if (tag === 63) { tag = b.toString('latin1', o, o + 4); o += 4; }
        const ver = (flags >> 6) & 3;
        const orig = base128();
        const transformed = (tag === 10 || tag === 11) ? ver === 0 : ver !== 0;
        const len = transformed ? base128() : orig;
        dir.push({ tag, len });
    }
    const data = zlib.brotliDecompressSync(b.subarray(o, o + compLen));
    let off = 0, cmap = null;
    for (const t of dir) { if (t.tag === 0) cmap = data.subarray(off, off + t.len); off += t.len; }
    if (!cmap) throw new Error(file + ': no cmap');
    const out = new Set();
    const n = cmap.readUInt16BE(2);
    for (let i = 0; i < n; i++) {
        const so = cmap.readUInt32BE(4 + i * 8 + 4);
        const fmt = cmap.readUInt16BE(so);
        if (fmt === 4) {
            const segX2 = cmap.readUInt16BE(so + 6), ends = so + 14, starts = ends + segX2 + 2;
            const deltas = starts + segX2, ros = deltas + segX2;
            for (let s = 0; s < segX2; s += 2) {
                const end = cmap.readUInt16BE(ends + s), start = cmap.readUInt16BE(starts + s);
                const delta = cmap.readInt16BE(deltas + s), ro = cmap.readUInt16BE(ros + s);
                for (let c = start; c <= end && c !== 0xFFFF; c++) {
                    let g;
                    if (ro === 0) g = (c + delta) & 0xFFFF;
                    else { g = cmap.readUInt16BE(ros + s + ro + (c - start) * 2); if (g) g = (g + delta) & 0xFFFF; }
                    if (g) out.add(c);
                }
            }
        } else if (fmt === 12) {
            const ng = cmap.readUInt32BE(so + 12);
            for (let k = 0; k < ng; k++) {
                const a = cmap.readUInt32BE(so + 16 + k * 12), z = cmap.readUInt32BE(so + 20 + k * 12);
                if (cmap.readUInt32BE(so + 24 + k * 12)) for (let c = a; c <= z; c++) out.add(c); else for (let c = a + 1; c <= z; c++) out.add(c);
            }
        }
    }
    return out;
}

const files = ['timemap.html', 'timemap_calendars.js'];
const i18n = path.join(ROOT, 'timemap_i18n');
if (fs.existsSync(i18n)) for (const f of fs.readdirSync(i18n)) if (f.endsWith('.js')) files.push('timemap_i18n/' + f);
const used = new Map();
for (const f of files) {
    const s = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const ch of s.match(/[\u0F00-\u0FFF]/gu) || []) {
        const c = ch.codePointAt(0);
        if (!used.has(c)) used.set(c, f);
    }
    // \u{F40} escapes and HTML references (&#xF40; / &#3904;) too.
    for (const m of s.matchAll(/\\u\{0*[fF]([0-9a-fA-F]{2})\}|&#[xX]0*[fF]([0-9a-fA-F]{2});|&#(\d{4});/g)) {
        const c = m[3] ? parseInt(m[3], 10) : 0x0F00 + parseInt(m[1] || m[2], 16);
        if (c < 0x0F00 || c > 0x0FFF) continue;
        if (!used.has(c)) used.set(c, f + ' (escape)');
    }
    for (const m of s.matchAll(/\\u0[fF]([0-9a-fA-F]{2})/g)) {
        const c = 0x0F00 + parseInt(m[1], 16);
        if (!used.has(c)) used.set(c, f + ' (escape)');
    }
}
for (let c = 0x0F20; c <= 0x0F29; c++) if (!used.has(c)) used.set(c, 'runtime digits');

let problems = 0;
const same = (a, b) => a.size === b.size && [...a].every((c) => b.has(c));
const hex = (c) => 'U+' + c.toString(16).toUpperCase().padStart(4, '0');
if (rules.length !== 2) { console.log('expected 2 @font-face rules for the Tibetan subset, found ' + rules.length); problems++; }
else if (!same(rules[0].set, rules[1].set)) { console.log('the 400 and 700 Tibetan @font-face rules claim different unicode-ranges'); problems++; }
// The range must name exactly what each file maps: a claimed codepoint the
// file lacks is sent to a font with no glyph for it.
for (const r of rules) {
    let cm;
    try { cm = woff2Cmap(path.join(ROOT, r.file)); } catch (e) { console.log('  ' + r.file + ': ' + e.message); problems++; continue; }
    for (const c of r.set) if (!cm.has(c)) { console.log('  ' + hex(c) + ' is in the unicode-range but not in ' + r.file); problems++; }
    for (const c of cm) if (c >= 0x0F00 && c <= 0x0FFF && !r.set.has(c)) { console.log('  ' + hex(c) + ' is in ' + r.file + ' but not claimed by its unicode-range'); problems++; }
}
for (const [c, f] of [...used].sort((x, y) => x[0] - y[0])) {
    if (claimed.has(c)) continue;
    console.log('  ' + hex(c) + ' (' + String.fromCodePoint(c) + ') in ' + f + ' is not in the subset');
    problems++;
}
console.log(used.size + ' Tibetan codepoints printed, ' + claimed.size + ' claimed');
console.log('problems: ' + problems);
