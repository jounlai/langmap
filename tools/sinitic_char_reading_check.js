#!/usr/bin/env node
/*
 * sinitic_char_reading_check.js — inside one Sinitic row, the same character
 * should be read the same way in every cell.
 *
 * For each Sinitic row it builds a character → syllable table from all the
 * row's cells (a cell counts when its IPA has exactly one space-separated
 * syllable per Han character) and reports every cell that reads a character
 * differently from the row's MAJORITY reading of that character (the majority
 * must occur at least twice and strictly outnumber every other reading).
 *
 * A mismatch is NOT proof of an error. Literary/colloquial pairs (文白) and
 * lexical changed tone are real, so this is a REPORTING tool with a ratchet:
 * --update freezes the accepted set in a lock file, --check reports only what
 * is NEW since then. Found 2026-11-04 in a review pass: gan_ja 喝 hot˥ /
 * 吃 tɕʰiat˥ / 脚 tɕio˥ carried stop codas and one-letter tones in a row whose
 * other entering-tone syllables are ˧˧˦ with no coda; wuu 阿拉 had laʔ˦ where
 * the row's sandhi pattern writes ˦˦.
 *
 * Exclusions (each is a convention, not a slip):
 *   - suffix characters after the first position (子 兒 儿 頭 头 仔 囝): often
 *     neutral-tone;
 *   - the second and later syllables of a reduplication (奶奶, 哥哥, 星星):
 *     neutral tone in many Mandarin-type rows;
 *   - rows written in tone-sandhi form (SANDHI_ROWS), where a character's tone
 *     legitimately depends on its neighbour;
 *   - Yue-type rows (yue, yue_*): tone-only differences where the minority tone
 *     is a changed tone (˧˥, ˨˩˥, ˥, ˥˥) — 八爪魚 jyː˧˥ beside 魚 jyː˨˩;
 *   - cells whose inline comment mentions a literary/colloquial or sandhi
 *     reading (白, 文, literary, colloquial, vernacular, sandhi, changed tone).
 *
 * Usage:
 *   node tools/sinitic_char_reading_check.js              # full report
 *   node tools/sinitic_char_reading_check.js --check      # "violations: N" (new only); exit 1 if N>0
 *   node tools/sinitic_char_reading_check.js --update     # accept the current set
 * Options: --root=<repo>  (default: the directory above this file)
 *          --lock=<file>  (default: sinitic_char_reading.lock.json beside this file)
 */
const fs = require('fs');
const path = require('path');

const arg = (k) => { const a = process.argv.find(x => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : null; };
let ROOT = arg('root');
if (!ROOT) ROOT = path.join(__dirname, '..');
const LOCK = arg('lock') || path.join(__dirname, 'sinitic_char_reading.lock.json');

global.window = {};
global.WORDS = {};
const SRC = {};
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter(f => f.endsWith('.js'))) {
    const t = fs.readFileSync(path.join(ROOT, 'words', f), 'utf8');
    SRC[f.slice(0, -3)] = t;
    // eslint-disable-next-line no-eval
    eval(t);
}

const SINITIC = /^(zh_|yue|nan|hak|wuu|gan|hsn|cjy|cdo|cpx|mnp|czh|cnp|mnz|msj|csp)/;
const HISTORICAL = new Set(['zh_yuan', 'zh_wenyan_edu', 'zh_han', 'zh_tang', 'och', 'ltc', 'zh_ltc']);
const SANDHI_ROWS = new Set(['wuu', 'wuu_nb']);
const SUFFIX = new Set([...'子兒儿頭头仔囝']);
const CHANGED_TONES = new Set(['˧˥', '˨˩˥', '˥', '˥˥']);
const NOTE_OK = /白|文讀|文读|literary|colloquial|vernacular|sandhi|changed tone|變調|变调/i;
const HAN = /^[\u3400-\u9FFF\uF900-\uFAFF\u{20000}-\u{3134F}]+$/u;

// Inline comment for a code's line in a word file (the cell's note, if any).
const noteOf = (word, code) => {
    const m = SRC[word].match(new RegExp(`^\\s*["']?${code}["']?\\s*:\\s*\\[[^\\n]*?\\][^\\n]*?//(.*)$`, 'm'));
    return m ? m[1] : '';
};
const tone = (syl) => (syl.match(/[˥˦˧˨˩]+$/) || [''])[0];
const seg = (syl) => syl.replace(/[˥˦˧˨˩]+$/, '');

const WIDS = Object.keys(WORDS).sort();
const CODES = [...new Set(WIDS.flatMap(w => Object.keys(WORDS[w].data || {})))]
    .filter(c => SINITIC.test(c) && !HISTORICAL.has(c)).sort();

const hits = [];
for (const code of CODES) {
    if (SANDHI_ROWS.has(code)) continue;
    const table = new Map(); // char -> [{syl, word, surface, ipa}]
    for (const w of WIDS) {
        const e = WORDS[w].data && WORDS[w].data[code];
        if (!e) continue;
        const [s, ipa] = Array.isArray(e) ? e : [e.form, e.ipa];
        if (!s || !ipa || s === '—') continue;
        const chars = [...s];
        const syls = String(ipa).trim().split(/\s+/);
        if (!HAN.test(s) || chars.length !== syls.length) continue;
        chars.forEach((ch, i) => {
            if (i > 0 && SUFFIX.has(ch)) return;
            if (i > 0 && chars[i - 1] === ch) return;
            if (!table.has(ch)) table.set(ch, []);
            table.get(ch).push({ syl: syls[i], word: w, surface: s, ipa });
        });
    }
    for (const [ch, list] of table) {
        const cnt = new Map();
        for (const x of list) cnt.set(x.syl, (cnt.get(x.syl) || 0) + 1);
        if (cnt.size < 2) continue;
        const ranked = [...cnt].sort((a, b) => b[1] - a[1]);
        const [maj, n] = ranked[0];
        if (n < 2 || (ranked[1] && ranked[1][1] === n)) continue;
        for (const x of list) {
            if (x.syl === maj) continue;
            if (/^yue/.test(code) && seg(x.syl) === seg(maj) && CHANGED_TONES.has(tone(x.syl))) continue;
            if (NOTE_OK.test(noteOf(x.word, code))) continue;
            hits.push({ code, word: x.word, ch, syl: x.syl, maj, n, total: list.length, surface: x.surface, ipa: x.ipa });
        }
    }
}

// ---- ratchet ----
const sig = (h) => `${h.code}|${h.word}|${h.ch}|${h.syl}`;
const current = new Set(hits.map(sig));
if (process.argv.includes('--update')) {
    fs.writeFileSync(LOCK, JSON.stringify([...current].sort(), null, 0) + '\n');
    console.log(`accepted ${current.size} Sinitic character-reading mismatches → ${LOCK}`);
    process.exit(0);
}
let known = new Set();
try { known = new Set(JSON.parse(fs.readFileSync(LOCK, 'utf8'))); } catch (_) {}
const fresh = hits.filter((h) => !known.has(sig(h)));
const gone = [...known].filter((k) => !current.has(k));
const line = (h) => `    ${h.code.padEnd(8)} ${h.word.padEnd(13)} ${h.surface} /${h.ipa}/  ${h.ch} = ${h.syl}, row majority ${h.maj} (${h.n}/${h.total})`;
if (process.argv.includes('--check')) {
    console.log(`violations: ${fresh.length}`);
    fresh.forEach((h) => console.log(line(h)));
    if (gone.length) console.log(`stale: ${gone.length}`);
    process.exit(fresh.length ? 1 : 0);
}
if (fresh.length) {
    console.log(`\n⚠ NEW since the lock (${fresh.length}):`);
    fresh.forEach((h) => console.log(line(h)));
    console.log('');
}
if (gone.length) console.log(`(${gone.length} lock entries no longer match — run --update)\n`);
console.log(`Sinitic rows checked: ${CODES.length - [...SANDHI_ROWS].filter(c => CODES.includes(c)).length}; mismatches: ${hits.length}`);
hits.forEach((h) => console.log(line(h)));
