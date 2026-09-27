/*
 * zhuang_ipa.js — Standard Zhuang (Latin 1982) -> IPA, one syllable at a time.
 *
 * A port of en.wiktionary's Module:za-pron, which is itself built from
 * 壮文方案（修订案）and 壮文基础读本 and is the only complete published
 * Latin→IPA table for the orthography that is machine-readable. Two
 * deviations, both deliberate and both to stay inside the Han Map's own
 * conventions:
 *
 *   v   the module gives β. /w/ is the phoneme — [β] and [v] are Northern
 *       Zhuang realisations of it — and the za row already writes w.
 *   ptk final stops carry ̚ , as every other unreleased-stop row on this map
 *       does. The module writes them bare.
 *
 * Tones come from the same table the tone_letter_map_check guard uses:
 * 1 (none) ˨˦ · 2 z ˧˩ · 3 j ˥ · 4 x ˦˨ · 5 q ˧˥ · 6 h ˧, and a checked
 * syllable takes 7 ˥ (short) / 7: ˧˥ (long) on -p/-t/-k, 8 ˧ on -b/-d/-g.
 */
'use strict';

const INITIAL = {
    b: 'p', mb: 'ɓ', m: 'm', f: 'f', v: 'w', by: 'pʲ', my: 'mʲ',
    d: 't', nd: 'ɗ', n: 'n', l: 'l', s: 'θ',
    ny: 'ɲ', c: 'ɕ', y: 'j',
    g: 'k', ng: 'ŋ', r: 'ɣ', gy: 'kʲ', ngv: 'ŋʷ', gv: 'kʷ',
    '': 'ʔ', h: 'h',
};
// [open syllable, closed syllable]; false = that shape does not occur
const VOWEL = {
    a: ['a', 'aː'], e: ['e', 'eː'], i: ['i', 'i'], o: ['o', 'oː'],
    u: ['u', 'u'], w: ['ɯ', 'ɯ'],
    ai: ['aːi', false], ei: ['ei', false], oi: ['oːi', false],
    ui: ['uːi', false], wi: ['ɯːi', false],
    ae: ['ai', 'a'], ie: [false, 'iː'], oe: [false, 'o'],
    ue: [false, 'uː'], we: [false, 'ɯː'],
    au: ['aːu', false], aeu: ['au', false], eu: ['eːu', false],
    iu: ['iu', false], ou: ['ou', false], aw: ['aɯ', false],
};
const CODA = { '': '', m: 'm', n: 'n', ng: 'ŋ', p: 'p̚', b: 'p̚', t: 't̚', d: 't̚', k: 'k̚', g: 'k̚' };
const TONE = { 1: '˨˦', 2: '˧˩', 3: '˥', 4: '˦˨', 5: '˧˥', 6: '˧', 7: '˥', '7:': '˧˥', 8: '˧' };
const LETTER_TONE = { '': 1, z: 2, j: 3, x: 4, q: 5, h: 6 };
const INITIALS = Object.keys(INITIAL).filter(Boolean).sort((a, b) => b.length - a.length);

function zhuangIpa(word) {
    const w = String(word).toLowerCase();
    let rest = w, initial = '';
    for (const k of INITIALS) if (rest.startsWith(k) && /[aeiouw]/.test(rest.slice(k.length))) { initial = k; rest = rest.slice(k.length); break; }
    // A trailing z/j/x/q/h is the tone letter — but only if a nucleus precedes.
    let toneLetter = '';
    const t = /[zjxqh]$/.exec(rest);
    if (t && /[aeiouw]/.test(rest.slice(0, -1))) { toneLetter = t[0]; rest = rest.slice(0, -1); }
    const m = /^([aeiouw][ieu]?[uw]?)([mn]g?|ng|[pbtdkg])?$/.exec(rest);
    if (!m) return null;
    const nucleus = m[1], coda = m[2] || '';
    if (!(nucleus in VOWEL) || !(coda in CODA)) return null;
    let tone = LETTER_TONE[toneLetter];
    // coda.length guards the empty string: ''.includes() is true for every haystack
    if (coda.length === 1 && 'ptk'.includes(coda)) tone = 7;
    else if (coda.length === 1 && 'bdg'.includes(coda)) tone = 8;
    const vowel = coda === '' ? VOWEL[nucleus][0] : VOWEL[nucleus][1];
    if (vowel === false) return null;
    if (tone === 7 && vowel.includes('ː')) tone = '7:';
    return INITIAL[initial] + vowel + CODA[coda] + TONE[tone];
}

module.exports = { zhuangIpa };
if (require.main === module) for (const w of process.argv.slice(2)) console.log(w, zhuangIpa(w));
