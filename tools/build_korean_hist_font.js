#!/usr/bin/env node
/*
 * build_korean_hist_font.js — cut the two Old Hangul subsets from Noto CJK KR.
 *
 * The Korean historical rows write conjoining jamo (U+1100-11FF, Ext-A/B), the
 * archaic compatibility letters (U+3130-318F) and the 방점 marks (U+302E-302F).
 * Google's Noto web subsets omit the conjoining block, so without a self-hosted
 * face those compose wrong on desktop Chrome and tofu on iOS.
 *
 * TWO faces, because the pages are not all set in the same typeface:
 *   serif — wordmap.html / hanmap.html, whose word displays are serif
 *   sans  — index.html (Word Order) / tree.html / namemap.html, which are sans
 * A page that used the wrong one renders a word in two typefaces. That is what
 * was reported on the Word Order map on 2026-09-15: Middle Korean 나ᄂᆞᆫ came
 * out with 나 in the UI sans and ᄂᆞᆫ in the serif face, one word, two fonts.
 *
 * THE PART THAT IS EASY TO GET WRONG, and cost an afternoon:
 *
 *   The subset must also carry every PRECOMPOSED syllable (U+AC00-D7A3) that
 *   the data puts next to jamo. Not for coverage — the system font has those —
 *   but for shaping. When the font at the front of the chain lacks the
 *   syllable, HarfBuzz's Hangul shaper DECOMPOSES it into jamo and expects the
 *   same font to recompose them; split across two fonts, that recomposition
 *   never happens and 나 renders as ㄴ ㅏ side by side. Covering the syllables
 *   keeps the whole Korean run inside one font, which is the only arrangement
 *   that composes.
 *
 * Source: notofonts/noto-cjk (SIL OFL) via jsDelivr — the full 16 MB OTFs, not
 * the web subsets. Run from the repo root:
 *   node tools/build_korean_hist_font.js
 * Requires pyftsubset (fonttools) and network access, and prints the
 * unicode-range to paste into styles.css / wordmap.html / hanmap.html.
 *
 * --layout-features=* is not optional: ljmo / vjmo / tjmo are what stack the
 * jamo into syllable blocks. Without them the letters sit in a row.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TMP = process.env.FONTBUILD_TMP || path.join(process.env.HOME, 'langmap-work/fontbuild');
fs.mkdirSync(TMP, { recursive: true });

const RANGES = [[0x1100, 0x11FF], [0x302E, 0x302F], [0x3130, 0x318F],
                [0xA960, 0xA97F], [0xD7B0, 0xD7FF]];
const isJamo = cp => RANGES.some(([lo, hi]) => cp >= lo && cp <= hi);
const isSyllable = cp => cp >= 0xAC00 && cp <= 0xD7A3;

const FACES = [
    {
        out: 'fonts/NotoSerifKR-OldHangul.woff2',
        family: 'Noto Serif KR Old Jamo',
        src: 'NotoSerifCJKkr-Regular.otf',
        // jsDelivr refuses this one — "Package size exceeded the config", the
        // Serif CJK OTF being larger than the Sans. Fetch it by hand from the
        // GitHub release (notofonts/noto-cjk, Serif2.003, 10_NotoSerifCJKkr.zip)
        // and drop NotoSerifCJKkr-Regular.otf into FONTBUILD_TMP; the face is
        // skipped rather than rebuilt from nothing when it is absent.
        url: null,
        data: ['wordmap_data.js', 'hanmap_data.js', 'words'],
    },
    {
        out: 'fonts/NotoSansKR-OldHangul.woff2',
        family: 'Noto Sans KR Old Jamo',
        src: 'NotoSansCJKkr-Regular.otf',
        url: 'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/OTF/Korean/NotoSansCJKkr-Regular.otf',
        data: ['data.js'],
    },
];

function readData(spec) {
    if (spec !== 'words') return fs.readFileSync(path.join(ROOT, spec), 'utf8');
    return fs.readdirSync(path.join(ROOT, 'words')).filter(f => f.endsWith('.js'))
        .map(f => fs.readFileSync(path.join(ROOT, 'words', f), 'utf8')).join('\n');
}

/* Every precomposed syllable in the data, not only the ones that share a word
 * with jamo.
 *
 * The shaping rule needs only the latter — 125 of them. Taking all 477 costs
 * 33 KB more and buys something worth more than that: the modern Korean row
 * and the Middle Korean row directly under it are then set in the SAME face.
 * With the minimal set they would be one font apart, which is a quieter
 * version of the defect being fixed. */
function syllablesIn(text) {
    const out = new Set();
    for (const ch of text) {
        const cp = ch.codePointAt(0);
        if (isSyllable(cp)) out.add(cp);
    }
    return out;
}

for (const face of FACES) {
    const src = path.join(TMP, face.src);
    if (!fs.existsSync(src) && face.url) {
        console.error(`  fetching ${face.src} …`);
        execFileSync('curl', ['-sSL', '-f', '--max-time', '600', '-o', src, face.url],
            { stdio: ['ignore', 'ignore', 'inherit'] });
    }
    if (!fs.existsSync(src)) {
        console.error(`  SKIP ${face.family}: ${face.src} not in ${TMP} (see the comment on its url)`);
        console.error(`       ${face.out} left as it is.`);
        continue;
    }

    const syl = new Set();
    for (const spec of face.data) for (const cp of syllablesIn(readData(spec))) syl.add(cp);
    const sylList = [...syl].sort((a, b) => a - b);

    const unicodes = RANGES.map(([lo, hi]) => `U+${lo.toString(16).toUpperCase()}-${hi.toString(16).toUpperCase()}`)
        .concat(sylList.map(c => 'U+' + c.toString(16).toUpperCase()));
    const out = path.join(ROOT, face.out);
    execFileSync(path.join(process.env.HOME, '.local/bin/pyftsubset'), [src,
        `--unicodes=${unicodes.join(',')}`,
        '--layout-features=*',
        '--flavor=woff2',
        `--output-file=${out}`], { stdio: ['ignore', 'ignore', 'inherit'] });

    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    console.error(`  ${face.family.padEnd(22)} ${sylList.length} syllables + 5 jamo blocks -> ${path.basename(face.out)} (${kb} KB)`);
    console.log(`/* ${face.family} */`);
    console.log(`unicode-range: ${unicodes.join(', ')};`);
    console.log('');
}
