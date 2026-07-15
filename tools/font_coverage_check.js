#!/usr/bin/env node
/*
 * font_coverage_check.js — every script used in a word surface must have a font.
 *
 * Desktop Linux ships the Noto historic fonts, so a missing @font-face is
 * invisible to whoever added the data. iOS and Windows ship almost none of
 * them: the reader just sees □□□. Luwian (Anatolian Hieroglyphs) shipped that
 * way, and so had Cuneiform, Brahmi, Linear B, Old Persian, Avestan, Old South
 * Arabian, Inscriptional Pahlavi, Phoenician, Gothic and Ugaritic.
 *
 * Scope: astral-plane (>= U+10000) codepoints, which is where the historic
 * scripts live. BMP scripts (Arabic, Devanagari, Thai…) are covered by system
 * fonts everywhere and are not checked.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

global.window = {};
global.WORDS = {};
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter(f => f.endsWith('.js'))) {
    // eslint-disable-next-line no-eval
    eval(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'));
}
const html = fs.readFileSync(path.join(ROOT, 'wordmap.html'), 'utf8');

// block name -> the font-family that must appear in wordmap.html.
//
// BMP blocks are listed only when the script needs a webfont — iOS and Windows
// do not ship Mandaic, Vai, Limbu, Javanese, Tai Viet, New Tai Lue, Tagalog,
// Sundanese, Phags-pa or Coptic. (Arabic, Devanagari, Thai, Han, Cyrillic and
// friends are everywhere and are deliberately absent from this list.)
const BLOCKS = [
    ['Mandaic',                 0x0840, 0x085F, 'Noto Sans Mandaic'],
    ['Tagalog',                 0x1700, 0x171F, 'Noto Sans Tagalog'],
    ['Mongolian',               0x1800, 0x18AF, 'Noto Sans Mongolian'],
    ['Limbu',                   0x1900, 0x194F, 'Noto Sans Limbu'],
    ['New Tai Lue',             0x1980, 0x19DF, 'Noto Sans New Tai Lue'],
    ['Sundanese',               0x1B80, 0x1BBF, 'Noto Sans Sundanese'],
    ['Coptic',                  0x2C80, 0x2CFF, 'Noto Sans Coptic'],
    ['Yi Syllables',            0xA000, 0xA48F, 'Noto Sans Yi'],
    ['Yi Radicals',             0xA490, 0xA4CF, 'Noto Sans Yi'],
    ['Vai',                     0xA500, 0xA63F, 'Noto Sans Vai'],
    ['Phags-pa',                0xA840, 0xA87F, 'Noto Sans Phags Pa'],
    ['Javanese',                0xA980, 0xA9DF, 'Noto Sans Javanese'],
    ['Tai Viet',                0xAA80, 0xAADF, 'Noto Sans Tai Viet'],
    ['Linear B Syllabary',      0x10000, 0x1007F, 'Noto Sans Linear B'],
    ['Linear B Ideograms',      0x10080, 0x100FF, 'Noto Sans Linear B'],
    ['Aegean Numbers',          0x10100, 0x1013F, 'Noto Sans Linear B'],
    ['Old Italic',              0x10300, 0x1032F, 'Noto Sans Old Italic'],
    ['Gothic',                  0x10330, 0x1034F, 'Noto Sans Gothic'],
    ['Ugaritic',                0x10380, 0x1039F, 'Noto Sans Ugaritic'],
    ['Old Persian',             0x103A0, 0x103DF, 'Noto Sans Old Persian'],
    ['Osage',                   0x104B0, 0x104FF, 'Noto Sans Osage'],
    ['Elbasan',                 0x10500, 0x1052F, 'Noto Sans Elbasan'],
    ['Caucasian Albanian',      0x10530, 0x1056F, 'Noto Sans Caucasian Albanian'],
    ['Linear A',                0x10600, 0x1077F, 'Noto Sans Linear A'],
    ['Cypriot',                 0x10800, 0x1083F, 'Noto Sans Cypriot'],
    ['Imperial Aramaic',        0x10840, 0x1085F, 'Noto Sans Imperial Aramaic'],
    ['Phoenician',              0x10900, 0x1091F, 'Noto Sans Phoenician'],
    ['Lydian',                  0x10920, 0x1093F, 'Noto Sans Lydian'],
    ['Meroitic Hieroglyphs',    0x10980, 0x1099F, 'Noto Sans Meroitic'],
    ['Meroitic Cursive',        0x109A0, 0x109FF, 'Noto Sans Meroitic'],
    ['Kharoshthi',              0x10A00, 0x10A5F, 'Noto Sans Kharoshthi'],
    ['Old South Arabian',       0x10A60, 0x10A7F, 'Noto Sans Old South Arabian'],
    ['Manichaean',              0x10AC0, 0x10AFF, 'Noto Sans Manichaean'],
    ['Avestan',                 0x10B00, 0x10B3F, 'Noto Sans Avestan'],
    ['Inscriptional Parthian',  0x10B40, 0x10B5F, 'Noto Sans Inscriptional Parthian'],
    ['Inscriptional Pahlavi',   0x10B60, 0x10B7F, 'Noto Sans Inscriptional Pahlavi'],
    ['Psalter Pahlavi',         0x10B80, 0x10BAF, 'Noto Sans Psalter Pahlavi'],
    ['Old Turkic',              0x10C00, 0x10C4F, 'Noto Sans Old Turkic'],
    ['Old Sogdian',             0x10F00, 0x10F2F, 'Noto Sans Old Sogdian'],
    ['Sogdian',                 0x10F30, 0x10F6F, 'Noto Sans Sogdian'],
    ['Brahmi',                  0x11000, 0x1107F, 'Noto Sans Brahmi'],
    ['Cuneiform',              0x12000, 0x123FF, 'Noto Sans Cuneiform'],
    ['Cuneiform Numbers',       0x12400, 0x1247F, 'Noto Sans Cuneiform'],
    ['Egyptian Hieroglyphs',    0x13000, 0x1342F, 'Noto Sans Egyptian Hieroglyphs'],
    ['Anatolian Hieroglyphs',   0x14400, 0x1467F, 'Noto Sans Anatolian Hieroglyphs'],
    ['Tangut',                  0x17000, 0x187FF, 'Noto Serif Tangut'],
    ['Tangut Components',       0x18800, 0x18AFF, 'Noto Serif Tangut'],
    ['Khitan Small Script',     0x18B00, 0x18CFF, 'Noto Serif Khitan Small Script'],
    ['Adlam',                   0x1E900, 0x1E95F, 'Noto Sans Adlam'],
    // The Chữ Nôm CJK extensions are served by the self-hosted subsets, which
    // are scoped by an explicit unicode-range listing every codepoint we use.
    ['CJK Ext B',               0x20000, 0x2A6DF, 'Nom Serif Subset'],
    ['CJK Ext C',               0x2A700, 0x2B73F, 'Nom Serif Subset'],
    ['CJK Ext D',               0x2B740, 0x2B81F, 'Nom Serif Subset'],
    ['CJK Ext E',               0x2B820, 0x2CEAF, 'Nom Serif Subset'],
    // Ext F carries the Zhuang Sawndip glyphs (𭓨 house, 𭝚 love …), served by
    // the BabelStone-Han Sawndip subset added to the same family.
    ['CJK Ext F',               0x2CEB0, 0x2EBEF, 'Nom Serif Subset'],
];

// The Nôm subsets are unicode-range scoped, so a codepoint they claim must
// actually be listed there — otherwise the font never loads for it. There are
// TWO @font-face blocks under this family (the NomNaTong subset, and a
// HanaMin B subset filling the two glyphs NomNaTong lacks); union both ranges.
const NOM_RANGE = [...html.matchAll(/font-family: 'Nom Serif Subset'[\s\S]*?unicode-range:([\s\S]*?);/g)]
    .map(m => m[1]).join(' ');

const found = new Map(); // block -> {font, codes:Set}
const unscoped = [];     // Nôm codepoints the subset's unicode-range omits
for (const w of Object.keys(WORDS)) {
    const data = WORDS[w].data || {};
    for (const code of Object.keys(data)) {
        // Cells are either ["surface","ipa"] arrays or rich {form,ipa,alt}
        // objects (e.g. Zhuang/Jurchen). Read the displayed surface from both —
        // reading only [0] silently skipped object cells, which let an astral
        // Sawndip glyph (𭓨 U+2D4E8) ship as tofu. (alt forms are reference-only
        // and may carry rarer glyphs, so they are not scanned.)
        const cell = data[code];
        const surf = Array.isArray(cell) ? cell[0] : (cell && cell.form);
        if (!surf) continue;
        for (const ch of surf) {
            const cp = ch.codePointAt(0);
            const b = BLOCKS.find(b => cp >= b[1] && cp <= b[2]);
            // BMP codepoints outside the curated list are covered by system
            // fonts everywhere; only astral ones are an unmapped-block error.
            if (!b && cp < 0x10000) continue;
            const key = b ? b[0] : `UNMAPPED U+${cp.toString(16).toUpperCase()}`;
            if (!found.has(key)) found.set(key, { font: b && b[3], codes: new Set() });
            found.get(key).codes.add(code);
            if (b && b[3] === 'Nom Serif Subset') {
                const hex = 'U+' + cp.toString(16).toUpperCase();
                if (!NOM_RANGE.includes(hex)) unscoped.push(`${hex} (${code}.${w})`);
            }
        }
    }
}

// Word surfaces are rendered by FOUR separate font-family chains. Listing a
// font in only some of them is the failure mode that shipped: the map label
// rendered Luwian while the info-panel table showed tofu, because `.wm-form`
// was missed. Each chain must carry every font.
const CHAINS = ['.lang-label, .globe-label', '.wm-form', '.lang-info-panel .native-name', '.compare-table thead .native-name'];
function chainBodies() {
    // Grab each selector's declaration block.
    return CHAINS.map(sel => {
        const i = html.indexOf(sel + ' {');
        if (i < 0) return { sel, body: null };
        const end = html.indexOf('\n        }', i);
        return { sel, body: html.slice(i, end < 0 ? i + 4000 : end) };
    });
}
const chains = chainBodies();

const missing = [];
for (const [block, info] of found) {
    if (!info.font) { missing.push([block, '(no font mapping in this checker)', [...info.codes]]); continue; }
    // The self-hosted Nôm subsets are only referenced from .wm-form and the
    // label chain; @font-face + one chain is enough for them.
    if (info.font === 'Nom Serif Subset') {
        if (!html.includes(`'${info.font}'`)) missing.push([block, info.font, [...info.codes]]);
        continue;
    }
    for (const { sel, body } of chains) {
        if (body === null) { missing.push([block, `chain "${sel}" not found in wordmap.html`, []]); continue; }
        if (!body.includes(`"${info.font}"`)) missing.push([block, `${info.font} — missing from chain ${sel}`, [...info.codes]]);
    }
}
for (const u of unscoped) missing.push(['Nôm subset unicode-range', `add ${u}`, []]);

console.log(`scripts without a font: ${missing.length}`);
for (const [block, font, codes] of missing) {
    console.log(`  ${block.padEnd(24)} needs ${font}   (languages: ${codes.slice(0, 8).join(', ')}${codes.length > 8 ? ', …' : ''})`);
}
if (!missing.length) console.log(`  (all ${found.size} astral-plane scripts in the data have a font in wordmap.html)`);
