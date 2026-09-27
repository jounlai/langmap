#!/usr/bin/env node
/**
 * font_range_overreach_check.js — a self-hosted subset may not claim a
 * character that ordinary device fonts already have.
 *
 * These subsets exist so rare glyphs stop rendering as tofu, and every one of
 * them is declared AHEAD of Noto Serif in the font chains. That position is
 * what makes them work, and it is also the trap: a unicode-range entry does
 * not mean "use this if nothing else has the glyph", it means "use this".
 * Claim 猫 and every 猫 on the page is drawn by a Chữ Nôm woodblock face while
 * the character beside it is Noto Serif. Nobody sees a missing glyph; they see
 * one character that looks subtly wrong, which is far harder to report.
 *
 * It happened twice, found on 2026-09-27 when the owner said the 猫 on the
 * Word Map looked off:
 *   NomNaTong (Chữ Nôm)  had been claiming 卒 嘲 恩 感 猫 茹 坦 耒 頭 since
 *                        the subsets were built.
 *   BabelStone Han       picked up 69 more the same day — 一 九 五 六 日 月
 *                        火 馬 名 字 … — because the Sawndip forms that use
 *                        ordinary characters were collected with the rest.
 *
 * THE TEST is coverage, not rarity: a codepoint that encodes in GB 2312 or
 * JIS X 0208 is in every CJK font ever shipped, so a subset must not claim it.
 * A Big5-only character like 渃 (nước) or 蹎 stays, because a GB- or JIS-only
 * device font really can lack it. Kana, Hangul syllables, Latin, Greek and
 * Cyrillic are treated the same way.
 *
 * ONE EXEMPTION, and it is a real one. The Old Hangul face has to claim the
 * precomposed syllables it also carries: a font at the front of the chain that
 * lacks 나 makes HarfBuzz decompose it to ㄴ + ㅏ and then fail to recompose
 * across the font boundary. styles.css says so at the declaration.
 *
 * Run: node tools/font_range_overreach_check.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// Families allowed to claim common codepoints, with the reason.
const EXEMPT = {
    'Noto Sans KR Old Jamo': 'must claim the syllables it carries or HarfBuzz splits them — see styles.css',
    'Noto Serif KR Old Jamo': 'same reason',
};

// A range wider than this is a whole-block claim (e.g. U+1100-11FF), not a
// cherry-picked list, and is not what this guard is about.
const BULK = 4000;

// Node cannot encode to GB 2312 or JIS X 0208, so the membership test is a
// generated table: tools/common_cjk.json, the 9,788 URO codepoints that encode
// in either standard. Regenerate with Python's
// codecs (see the generator note below); if it is absent, fall back to
// refusing the whole URO, which is
// stricter and errs the safe way.
let COMMON_CJK = null;
const tablePath = path.join(__dirname, 'common_cjk.json');
if (fs.existsSync(tablePath)) COMMON_CJK = new Set(JSON.parse(fs.readFileSync(tablePath, 'utf8')));

function commonBlock(cp) {
    if (cp <= 0x024F) return 'Latin';
    if (cp >= 0x0370 && cp <= 0x03FF) return 'Greek';
    if (cp >= 0x0400 && cp <= 0x04FF) return 'Cyrillic';
    if (cp >= 0x3040 && cp <= 0x30FF) return 'kana';
    if (cp >= 0xAC00 && cp <= 0xD7A3) return 'Hangul syllable';
    if (cp >= 0x4E00 && cp <= 0x9FFF) {
        if (!COMMON_CJK) return 'CJK (no coverage table — refusing all of the URO)';
        return COMMON_CJK.has(cp) ? 'CJK in GB 2312 / JIS X 0208' : null;
    }
    return null;
}

const FILES = fs.readdirSync(ROOT).filter((f) => /\.(html|css)$/.test(f));
let faces = 0;
const bad = [];
for (const f of FILES) {
    const s = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const m of s.matchAll(/@font-face\s*\{([\s\S]*?)\}/g)) {
        const body = m[1];
        const fam = (/font-family:\s*['"]([^'"]+)['"]/.exec(body) || [])[1];
        const range = (/unicode-range:\s*([^;]+);/.exec(body) || [])[1];
        if (!fam || !range) continue;
        faces++;
        if (EXEMPT[fam]) continue;
        for (const t of range.matchAll(/U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?/g)) {
            const a = parseInt(t[1], 16);
            const z = t[2] ? parseInt(t[2], 16) : a;
            if (z - a > BULK) continue;
            for (let cp = a; cp <= z; cp++) {
                const why = commonBlock(cp);
                if (why) bad.push(`  ${f}  '${fam}'  ${String.fromCodePoint(cp)} U+${cp.toString(16).toUpperCase()} — ${why}`);
            }
        }
    }
}
console.log(`font range overreach — ${faces} @font-face declarations with a unicode-range`);
if (bad.length) console.log(bad.join('\n'));
console.log(`overreaching: ${bad.length}`);
process.exit(process.argv.includes('--strict') && bad.length ? 1 : 0);
