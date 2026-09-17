/* pv_lib.js — shared loader + normalisers for the r7 provenance scan. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = '/home/jounlai/langmap';

function load(dir) {
    const d = dir || path.join(ROOT, 'words');
    const ctx = vm.createContext({});
    vm.runInContext('this.window=this; this.WORDS=window.WORDS={};', ctx);
    for (const f of fs.readdirSync(d).filter(f => f.endsWith('.js')))
        vm.runInContext(fs.readFileSync(path.join(d, f), 'utf8'), ctx, { filename: f });
    return ctx.WORDS;
}

function loadMeta() {
    const ctx = vm.createContext({});
    vm.runInContext('this.window=this;', ctx);
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8'), ctx, { filename: 'wordmap_data.js' });
    try {
        vm.runInContext(fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8'), ctx, { filename: 'wordmap_meta.js' });
    } catch (e) { console.error('meta load warn:', e.message); }
    return vm.runInContext('typeof LANG_DATA!=="undefined"?LANG_DATA:null', ctx);
}

const EMPTY = new Set(['', '—', '-', '–', '?', 'n/a', '…']);
const norm = s => String(s == null ? '' : s).normalize('NFC').trim();
const lc = s => norm(s).toLowerCase();

/* Tone notation: Chao letters, superscript digits, tone diacritics, tone bars. */
const TONE_CHARS = '[\\u02e5-\\u02e9\\u02ea\\u02eb\\u0300\\u0301\\u0302\\u0303\\u0304\\u030b\\u030c\\u030f\\u0311\\u0330\\u0348\\u2070\\u00b9\\u00b2\\u00b3\\u2074-\\u2079]';
const RE_TONE = new RegExp(TONE_CHARS, 'gu');
const RE_NOTTONE = new RegExp('(?!' + TONE_CHARS + ').', 'gu');

/* IPA with all tone notation removed (NFD so diacritics detach). */
function seg(ipa) {
    return norm(ipa).normalize('NFD').replace(RE_TONE, '').normalize('NFC')
        .replace(/[ˈˌ\s.]/gu, '');
}
/* Only the tone notation, in order. */
function tone(ipa) {
    return norm(ipa).normalize('NFD').replace(RE_NOTTONE, '');
}
function hasTone(ipa) { return tone(ipa).length > 0; }

/* Dominant Unicode block of a string's letters. */
const BLOCKS = [
    ['Latin', /\p{Script=Latin}/u], ['Han', /\p{Script=Han}/u], ['Cyrillic', /\p{Script=Cyrillic}/u],
    ['Arabic', /\p{Script=Arabic}/u], ['Devanagari', /\p{Script=Devanagari}/u], ['Thai', /\p{Script=Thai}/u],
    ['Lao', /\p{Script=Lao}/u], ['Khmer', /\p{Script=Khmer}/u], ['Myanmar', /\p{Script=Myanmar}/u],
    ['Hebrew', /\p{Script=Hebrew}/u], ['Greek', /\p{Script=Greek}/u], ['Hangul', /\p{Script=Hangul}/u],
    ['Hiragana', /\p{Script=Hiragana}/u], ['Katakana', /\p{Script=Katakana}/u], ['Ethiopic', /\p{Script=Ethiopic}/u],
    ['Georgian', /\p{Script=Georgian}/u], ['Armenian', /\p{Script=Armenian}/u], ['Tamil', /\p{Script=Tamil}/u],
    ['Bengali', /\p{Script=Bengali}/u], ['Tibetan', /\p{Script=Tibetan}/u], ['Syriac', /\p{Script=Syriac}/u],
    ['Phoenician', /\p{Script=Phoenician}/u], ['Yi', /\p{Script=Yi}/u], ['Cherokee', /\p{Script=Cherokee}/u],
    ['Mongolian', /\p{Script=Mongolian}/u], ['Tifinagh', /\p{Script=Tifinagh}/u], ['Nko', /\p{Script=Nko}/u],
    ['Canadian_Aboriginal', /\p{Script=Canadian_Aboriginal}/u], ['Sinhala', /\p{Script=Sinhala}/u],
    ['Telugu', /\p{Script=Telugu}/u], ['Kannada', /\p{Script=Kannada}/u], ['Malayalam', /\p{Script=Malayalam}/u],
    ['Gujarati', /\p{Script=Gujarati}/u], ['Gurmukhi', /\p{Script=Gurmukhi}/u], ['Oriya', /\p{Script=Oriya}/u],
    ['Cuneiform', /\p{Script=Cuneiform}/u], ['Egyptian_Hieroglyphs', /\p{Script=Egyptian_Hieroglyphs}/u],
    ['Old_Italic', /\p{Script=Old_Italic}/u], ['Runic', /\p{Script=Runic}/u], ['Gothic', /\p{Script=Gothic}/u],
    ['Coptic', /\p{Script=Coptic}/u], ['Javanese', /\p{Script=Javanese}/u], ['Balinese', /\p{Script=Balinese}/u],
    ['Tai_Tham', /\p{Script=Tai_Tham}/u], ['Tai_Le', /\p{Script=Tai_Le}/u], ['New_Tai_Lue', /\p{Script=New_Tai_Lue}/u],
    ['Lepcha', /\p{Script=Lepcha}/u], ['Limbu', /\p{Script=Limbu}/u], ['Vai', /\p{Script=Vai}/u],
    ['Adlam', /\p{Script=Adlam}/u], ['Osage', /\p{Script=Osage}/u], ['Bopomofo', /\p{Script=Bopomofo}/u],
    ['Thaana', /\p{Script=Thaana}/u], ['Ol_Chiki', /\p{Script=Ol_Chiki}/u], ['Cham', /\p{Script=Cham}/u],
    ['Batak', /\p{Script=Batak}/u], ['Buginese', /\p{Script=Buginese}/u], ['Tagalog', /\p{Script=Tagalog}/u],
    ['Mandaic', /\p{Script=Mandaic}/u], ['Samaritan', /\p{Script=Samaritan}/u], ['Avestan', /\p{Script=Avestan}/u],
    ['Old_Persian', /\p{Script=Old_Persian}/u], ['Ugaritic', /\p{Script=Ugaritic}/u], ['Brahmi', /\p{Script=Brahmi}/u],
    ['Kharoshthi', /\p{Script=Kharoshthi}/u], ['Osmanya', /\p{Script=Osmanya}/u], ['Meetei_Mayek', /\p{Script=Meetei_Mayek}/u],
    ['Nushu', /\p{Script=Nushu}/u], ['Yezidi', /\p{Script=Yezidi}/u], ['Linear_B', /\p{Script=Linear_B}/u],
    ['Anatolian_Hieroglyphs', /\p{Script=Anatolian_Hieroglyphs}/u], ['Imperial_Aramaic', /\p{Script=Imperial_Aramaic}/u],
    ['Hanunoo', /\p{Script=Hanunoo}/u], ['Buhid', /\p{Script=Buhid}/u], ['Tagbanwa', /\p{Script=Tagbanwa}/u],
    ['Sundanese', /\p{Script=Sundanese}/u], ['Rejang', /\p{Script=Rejang}/u], ['Saurashtra', /\p{Script=Saurashtra}/u],
    ['Syloti_Nagri', /\p{Script=Syloti_Nagri}/u], ['Chakma', /\p{Script=Chakma}/u], ['Mro', /\p{Script=Mro}/u],
    ['Tirhuta', /\p{Script=Tirhuta}/u], ['Modi', /\p{Script=Modi}/u], ['Takri', /\p{Script=Takri}/u],
    ['Bamum', /\p{Script=Bamum}/u], ['Bassa_Vah', /\p{Script=Bassa_Vah}/u], ['Medefaidrin', /\p{Script=Medefaidrin}/u],
];
function scriptOf(s) {
    const counts = {};
    for (const ch of norm(s)) {
        if (!/\p{L}/u.test(ch)) continue;
        for (const [n, re] of BLOCKS) if (re.test(ch)) { counts[n] = (counts[n] || 0) + 1; break; }
    }
    let best = null, bn = 0;
    for (const [k, v] of Object.entries(counts)) if (v > bn) { bn = v; best = k; }
    return best;
}

function buildRows(WORDS) {
    const wids = Object.keys(WORDS).sort();
    const rows = new Map();
    for (const w of wids) {
        for (const [code, e] of Object.entries(WORDS[w].data || {})) {
            const s = Array.isArray(e) ? e[0] : e.form;
            const i = Array.isArray(e) ? e[1] : e.ipa;
            if (!rows.has(code)) rows.set(code, { code, cells: new Map() });
            const S = norm(s), I = norm(i);
            if (EMPTY.has(S) && EMPTY.has(I)) continue;
            rows.get(code).cells.set(w, { s: S, i: I, sl: lc(S), il: lc(I), seg: seg(I), tone: tone(I) });
        }
    }
    return { wids, rows };
}

module.exports = { ROOT, load, loadMeta, norm, lc, seg, tone, hasTone, scriptOf, buildRows, EMPTY };
