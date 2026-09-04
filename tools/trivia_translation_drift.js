#!/usr/bin/env node
/**
 * trivia_translation_drift.js — find translations that state a number the
 * English does not.
 *
 * Three articles in a row turned out to have been translated from an English
 * draft that was later edited, leaving the translations asserting things the
 * article no longer says. quoc-ngu-rhodes ended, in fourteen languages, on
 * "the foundation of a writing system used by 97 million people" and "the
 * principal medium of ... communist propaganda"; hangul-sinosphere-context's
 * yue still called Hangul "one of the most rationally designed scripts in the
 * world"; tea-tea-cha-cha claimed in eighteen languages that one consonant
 * "suffices to reconstruct the 17th-century global trade network". None of
 * that is in the English any more.
 *
 * Nobody reads all nineteen languages, so this cannot be caught by reading.
 * What CAN be caught mechanically is the sharpest edge of it: a figure that
 * appears in a translation and nowhere in its English. 97 million was exactly
 * that. So was the "1500 years" heading on kanbun-yomi-invention.
 *
 * The check deliberately looks at numbers only. Prose drift needs a reader;
 * numbers are checkable, and in practice a stale draft almost always leaves
 * one behind.
 *
 * Not every extra number is a defect — a translation may legitimately write
 * "about 200 years" where the English says "two centuries", and Japanese
 * routinely spells out a figure the English leaves implicit. Those are listed
 * in ALLOW, per article, with the reason.
 *
 * Usage:
 *   node tools/trivia_translation_drift.js          # full report
 *   node tools/trivia_translation_drift.js --check  # "unexplained figures: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Additions reviewed and accepted, as {articleId: {number: why}}. Applies to
// every UI language of that article.
const ALLOW = {
    // Reviewed additions. Each is a figure the English leaves implicit or omits,
    // which the translation states — checked and correct, not draft residue.
    'min-nan-wenbai': { '2014': 'ja dates the Baxter\u2013Sagart reconstruction the English cites without a year; Old Chinese: A New Reconstruction is 2014' },
    'simplified-chinese-1956': { '1955': 'ja names the 1955 conference at which 普通话 was so named, which its Taiwan/mainland paragraph needs; the English gets there another way' },
    'piraha-no-numbers': { '700': 'ja gives the Pirah\u00e3 population as 700\u2013800, the standard figure; the English gives none' },
    'esperanto-zamenhof': { '140': 'ja says "140 years on"; arithmetic on the 1887 the English does give' },
    'guugu-yimithirr-cardinal': { '1998': 'ja dates the Haviland report the English cites without a year; Haviland, Ethos 26(1), 1998' },
    'pie-reconstruction': { '3000': 'ja says Hittite lay buried three thousand years; the English gives the decipherment date only' },
};

function load(file, pick) {
    const ctx = vm.createContext({});
    vm.runInContext('var window = this;', ctx);
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
    return pick(ctx);
}

// Collect {id, bodies:{ui:html}} for both corpora.
const arts = [];
for (const a of load('hanmap_trivia.js', c => vm.runInContext('window.TRIVIA_ARTICLES', c) || []))
    arts.push({ src: 'hanmap', id: a.id, bodies: Object.assign({}, a.body) });
{
    const base = load('wordmap_trivia.js', c => vm.runInContext('window.TRIVIA_ARTICLES', c) || []);
    const map = {};
    for (const a of base) map[a.id] = Object.assign({}, a.body);
    for (const f of fs.readdirSync(ROOT).filter(f => /^wordmap_trivia_[a-z]{2,3}\.js$/.test(f))) {
        const ui = f.match(/_([a-z]{2,3})\.js$/)[1];
        const T = load(f, c => vm.runInContext('window.TRIVIA_I18N', c) || {});
        for (const id in T) if (map[id] && typeof T[id].body === 'string') map[id][ui] = T[id].body;
    }
    for (const id in map) arts.push({ src: 'wordmap', id, bodies: map[id] });
}

// 1908–09 and 1964–66 mean 1909 and 1966. Expand before comparing, or every
// abbreviated range in the English reads as an invention in the translation.
// Magnitude words, by the factor they multiply. A figure carrying one of these
// is a claim ("97 million people"), and the same claim is written 9,700万 in
// Japanese and 97 triệu in Vietnamese — so both sides are normalised to the
// plain number before comparing, or every CJK body looks like an invention.
const MAG = [
    [1e9,  /^(billion|billones|bilhões|miljard|Milliarden|миллиард|мільярд|مليار|מיליארד|tỷ|ti|십억)$/i],
    [1e8,  null],   // 億 / 亿, handled in the CJK pass
    [1e6,  /^(million|millions|millón|millones|milione|milioni|milhão|milhões|miljoen|miljoenen|Millionen|Million|миллион|миллиона|миллионов|мільйон|мільйони|мільйонів|مليون|ملايين|מיליון|triệu|juta|milioni|मिलियन|ล้าน|백만)$/i],
];

// English spells its round figures out — "nine million people", "a thousand
// native speakers" — where the translations write 900万 and 1,000. Without
// this the English side simply has no number and every translation of it
// reads as an addition.
const WORDNUM = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
    eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30,
    forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100 };
const WORDMAG = { hundred: 100, thousand: 1e3, million: 1e6, billion: 1e9 };

function figures(html) {
    let t = String(html).replace(/<[^>]*>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
    // Thousands separators only. The separator must be a SINGLE character with
    // no space after it, or "1977, 853" in a list collapses into 1977853.
    for (let k = 0; k < 3; k++)
        t = t.replace(/(\d)([,.'   ٬’ ])(\d{3})(?![0-9])/g, '$1$3');
    // CJK myriads: 1万6千 -> 16000, 5000万 -> 50000000, 2億 -> 200000000.
    t = t.replace(/(\d+)\s*[万萬]\s*(\d+)\s*千/g, (_, a, b) => String(+a * 10000 + +b * 1000));
    t = t.replace(/(\d+)\s*[万萬](\d+)/g, (_, x, y) => String(+x * 10000 + +y));
    // "200〜300万人" and "2–3 million" attach the magnitude to the LAST number
    // only. Emit both ends, or the low end of every range reads as an addition.
    t = t.replace(/(\d+)\s*[〜~–—-]\s*(\d+)\s*([万萬])/g, (_, a, b, u) => ' ' + (+a * 10000) + ' ' + (+b) + u + ' ');
    t = t.replace(/(\d+)\s*[–—-]\s*(\d+)(\s*)(million|millions|millón|millones|milione|milioni|milhão|milhões|Millionen|миллион\p{L}*|мільйон\p{L}*|triệu|juta)\b/giu,
        (_, a, b, sp, w) => ' ' + (+a * 1e6) + ' ' + b + sp + w + ' ');
    // Korean 만 is also the particle "only": "1~6만 사용한다" means "uses only
    // 1-6", not 60,000. It counts as a myriad only when a counter follows.
    t = t.replace(/(\d+)\s*만(?=\s*(?:명|여|개|권|자|점|부|건|원|글자|음절|어휘|가지|이상|가량|정도|[~〜–—]))/g, (_, a) => String(+a * 10000));
    t = t.replace(/(\d+)\s*억(?=\s*(?:명|여|개|원|건))/g, (_, a) => String(+a * 1e8));
    // 1億2500万 is 125,000,000, not 100,000,000 beside 25,000,000.
    t = t.replace(/(\d+)\s*[億亿]\s*(\d+)\s*[万萬]/g, (_, a, b) => String(+a * 1e8 + +b * 10000));
    t = t.replace(/(\d+)\s*[億亿]/g, (_, a) => String(+a * 1e8));
    t = t.replace(/(?<![~–—-])(\d+)\s*[万萬]/g, (_, a) => String(+a * 10000));
    // "nine million", "a thousand", "half a million" -> a plain figure.
    t = t.replace(/\b(a|an|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[\s-]+(hundred|thousand|million|billion)\b/gi,
        (m, n, mag) => ' ' + String(WORDNUM[n.toLowerCase()] * WORDMAG[mag.toLowerCase()]) + ' ');
    // "four centuries" and "three millennia" are the same claim a translation
    // writes as 400年 / 3000年. Emit the year count from both sides.
    t = t.replace(/\b(\d+|a|an|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)[\s-]+(centur(?:y|ies)|millenni(?:um|a))\b/gi,
        (m, n, unit) => {
            const v = /^\d+$/.test(n) ? +n : WORDNUM[n.toLowerCase()];
            if (!v) return m;
            return ' ' + m + ' ' + String(v * (/millenni/i.test(unit) ? 1000 : 100)) + ' ';
        });
    // Latin/Cyrillic/Arabic/… magnitude words, including decimals (1.9 million).
    t = t.replace(/(\d+(?:[.,]\d+)?)\s*[^\d\s\p{L}]{0,3}\s*(\p{L}+)/gu, (m, n, w) => {
        for (const [factor, re] of MAG) if (re && re.test(w))
            return ' ' + String(Math.round(parseFloat(n.replace(',', '.')) * factor)) + ' ';
        return m;
    });
    const out = new Set();
    // 1908–09 and 1964–66 mean 1909 and 1966. Expand before comparing, or every
    // abbreviated range in the English reads as an invention in the translation.
    t = t.replace(/\b(1[0-9]{3}|20[0-9]{2})\s*[-–—~〜]\s*(\d{2})\b/g, (_, a, b) => {
        out.add(a); out.add(a.slice(0, 2) + b); return ' ';
    });
    for (const n of (t.match(/\d+/g) || [])) if (n.length >= 4 || +n >= 100) out.add(String(+n));
    return out;
}

const rows = [];
for (const a of arts) {
    const en = figures(a.bodies.en || '');
    if (!en.size) continue;
    const allow = Object.assign({}, ALLOW[a.id] || {});
    for (const ui of Object.keys(a.bodies)) {
        if (ui === 'en') continue;
        const per = Object.assign({}, allow, ALLOW[a.id + '.' + ui] || {});
        const extra = [...figures(a.bodies[ui])].filter(n => !en.has(n) && !(n in per));
        if (extra.length) rows.push({ src: a.src, id: a.id, ui, extra });
    }
}

const total = rows.reduce((n, r) => n + r.extra.length, 0);
if (CHECK) {
    console.log('unexplained figures: ' + total);
} else {
    let cur = '';
    for (const r of rows) {
        if (r.id !== cur) { cur = r.id; console.log('\n### ' + r.src + '  ' + r.id); }
        console.log('  ' + r.ui.padEnd(4) + ' ' + r.extra.join(' '));
    }
    console.log('\nunexplained figures: ' + total + ' in ' + rows.length + ' translations' +
        (total ? '\nEither the translation states something the English does not, or the figure belongs in ALLOW with a reason.' : ''));
}
