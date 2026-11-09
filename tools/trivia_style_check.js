#!/usr/bin/env node
/**
 * trivia_style_check.js — mechanical slips the trivia style guide forbids
 * (trivia_style/README.md and trivia_style/<lang>.md).
 *
 * Reads data/trivia_seo.json (every article, every language) and counts:
 *   ascii-punct   ASCII , ; : ? ! between two CJK characters (zh, yue, ja)
 *   register      ja articles in です/ます, ko articles in 합니다체 (the site uses だ/である and 다체)
 *   ai-opener     stock openers the 2026-11 rereads removed, per language
 *   title-case    vi titles with a capital right after the colon (proper nouns excepted by hand)
 *
 * It cannot judge voice; it only stops the slips that were fixed by hand from coming back.
 * Usage: node tools/trivia_style_check.js [--check] [--list]
 */
const fs = require('fs');
const path = require('path');
const D = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'trivia_seo.json'), 'utf8'));
const LIST = process.argv.includes('--list');

const CJK = '぀-ヿ㐀-䶿一-鿿豈-﫿';
const ASCII_PUNCT = new RegExp(`[${CJK}][,;:?!](?=[${CJK}])`, 'g');
const strip = s => (s || '').replace(/<[^>]+>/g, '');

const OPENERS = {
    en: [/(^|[.!?]\s+)(Crucially|Interestingly|Notably),/g, /The result:/g, /\brich tapestry\b/gi, /\btestament to\b/gi, /\bdelve\b/gi, /\brace against time\b/gi],
    ja: [/興味深いことに/g, /注目すべきは/g, /と言えるでしょう/g],
    zh: [/值得一提的是/g, /有趣的是/g],
    yue: [/值得一提嘅係/g],
    ko: [/더 놀라운 점은/g, /흥미롭게도/g],
    vi: [/Điều thú vị là/g],
    id: [/Menariknya,/g],
    de: [/Interessanterweise/g],
    fr: [/[Ii]l est intéressant de noter/g],
    it: [/[Èè] interessante notare/g],
    es: [/[Cc]uriosamente,/g],
    pt: [/[Cc]uriosamente,/g],
    ru: [/[Ии]нтересно, что/g],
    uk: [/[Цц]ікаво, що/g],
};

// vi titles whose word after the colon is a proper noun (checked by hand 2026-11-10)
const VI_TITLE_OK = new Set(['jellyfish-medusa-mother', 'black-krishna-and-soot', 'father-jupiter-and-attila', 'kangxi-214-radicals', 'alexander-iskandar-sikandar']);
const hits = [];
for (const a of D.articles) {
    for (const [lang, t] of Object.entries(a.i18n || {})) {
        const text = [t.title, t.summary, strip(t.body)].join('\n');
        if (['zh', 'yue', 'ja'].includes(lang)) {
            const m = text.match(ASCII_PUNCT);
            if (m) hits.push(['ascii-punct', lang, a.id, m.length]);
        }
        if (lang === 'ja') {
            const n = (text.match(/(です|ます|ました|でした)。/g) || []).length;
            if (n >= 3) hits.push(['register', lang, a.id, n]);
        }
        if (lang === 'ko') {
            const n = (text.match(/(습니다|입니다|했습니다)[.]/g) || []).length;
            if (n >= 3) hits.push(['register', lang, a.id, n]);
        }
        for (const re of OPENERS[lang] || []) {
            const m = text.match(re);
            if (m) hits.push(['ai-opener', lang, a.id, m.length + ' ' + re.source]);
        }
        if (lang === 'vi' && !VI_TITLE_OK.has(a.id) && /:\s+[A-ZĐÂĂÊÔƠƯ][a-zàáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]/.test(t.title || '')) {
            hits.push(['title-case', lang, a.id, t.title]);
        }
    }
}

// Ratchet: counts that were already there when the check was written (2026-11-10).
// Lower these as the rereads finish; never raise them without a dated reason.
const BUDGET = { 'ascii-punct': 0, register: 0, 'ai-opener': 0, 'title-case': 0 };
const BUDGET_FILE = path.join(__dirname, 'trivia_style.budget.json');
if (fs.existsSync(BUDGET_FILE)) Object.assign(BUDGET, JSON.parse(fs.readFileSync(BUDGET_FILE, 'utf8')));

const byKind = {};
for (const h of hits) byKind[h[0]] = (byKind[h[0]] || 0) + 1;
let over = 0;
for (const k of Object.keys(BUDGET)) {
    const n = byKind[k] || 0;
    if (n > BUDGET[k]) over += n - BUDGET[k];
    console.log(`  ${k.padEnd(12)} ${String(n).padStart(4)}  (budget ${BUDGET[k]})`);
}
if (LIST) for (const h of hits) console.log('   ', h.join('  '));
console.log(`trivia style slips over budget: ${over}`);
if (process.argv.includes('--update')) {
    const b = {}; for (const k of Object.keys(BUDGET)) b[k] = byKind[k] || 0;
    fs.writeFileSync(BUDGET_FILE, JSON.stringify(b, null, 1) + '\n');
    console.log('budget written', JSON.stringify(b));
}
