/**
 * ipa_synth/engine.js — IPA string → speech, from scratch.
 *
 *   parse(ipa)          IPA → segments with phonetic features (place, manner, voicing, tone …)
 *   plan(ipa, opts)     segments → timed phases and per-parameter keyframe tracks
 *                       (acoustic: voicing, noise, formants; articulatory: tongue, lips, velum, jaw, glottis)
 *   render(plan, opts)  tracks → Float32Array, a cascade/parallel formant synthesizer (Klatt-style)
 *   sample(plan, t)     every parameter at time t (ms), for drawing the vocal tract
 *
 * It is a rule-based approximation. Nothing here was checked by ear against a native speaker.
 * Runs in the browser (window.IPASynth) and in node (require).
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) module.exports = factory();
    else root.IPASynth = factory();
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // ------------------------------------------------------------------ symbol tables
    // vowels: [height 0 open..1 close, backness 0 front..1 back, rounded, rhotic]
    const VOWELS = {
        'i': [1, 0, 0], 'y': [1, 0, 1], 'ɨ': [1, .5, 0], 'ʉ': [1, .5, 1], 'ɯ': [1, 1, 0], 'u': [1, 1, 1],
        'ɪ': [.85, .15, 0], 'ʏ': [.85, .15, 1], 'ʊ': [.85, .85, 1], 'ɩ': [.85, .15, 0], 'ɷ': [.85, .85, 1],
        'e': [.67, 0, 0], 'ø': [.67, 0, 1], 'ɘ': [.67, .5, 0], 'ɵ': [.67, .5, 1], 'ɤ': [.67, 1, 0], 'o': [.67, 1, 1],
        'ə': [.5, .5, 0], 'ɚ': [.5, .5, 0, 1], 'ɛ': [.33, 0, 0], 'œ': [.33, 0, 1], 'ɜ': [.33, .5, 0], 'ɝ': [.33, .5, 0, 1],
        'ɞ': [.33, .5, 1], 'ʌ': [.33, 1, 0], 'ɔ': [.33, 1, 1], 'æ': [.15, 0, 0], 'ɐ': [.2, .5, 0],
        'a': [0, .15, 0], 'ɶ': [0, 0, 1], 'ɑ': [0, 1, 0], 'ɒ': [0, 1, 1], 'ᴀ': [0, .5, 0], 'ᴇ': [.5, 0, 0],
    };
    // apical ("fricative") vowels of Chinese phonology: a syllabic, buzzy coronal approximant
    const APICAL = { 'ɿ': 'AL', 'ʅ': 'RE', 'ʮ': 'AL', 'ʯ': 'RE' };  // ʮ ʯ: rounded

    // consonants: [place, manner, voiced]
    const CONS = {};
    const addC = (chars, place, manner, voiced) => { for (const c of chars) CONS[c] = [place, manner, voiced]; };
    addC('p', 'BL', 'stop', 0); addC('b', 'BL', 'stop', 1);
    addC('t', 'AL', 'stop', 0); addC('d', 'AL', 'stop', 1);
    addC('ʈ', 'RE', 'stop', 0); addC('ɖ', 'RE', 'stop', 1);
    addC('ȶ', 'AP', 'stop', 0); addC('ȡ', 'AP', 'stop', 1);
    addC('c', 'PL', 'stop', 0); addC('ɟ', 'PL', 'stop', 1);
    addC('k', 'VE', 'stop', 0); addC('gɡ', 'VE', 'stop', 1);
    addC('q', 'UV', 'stop', 0); addC('ɢ', 'UV', 'stop', 1);
    addC('ʡ', 'EP', 'stop', 0); addC('ʔ', 'GL', 'stop', 0);
    addC('m', 'BL', 'nasal', 1); addC('ɱ', 'LD', 'nasal', 1); addC('n', 'AL', 'nasal', 1); addC('ɳ', 'RE', 'nasal', 1);
    addC('ȵ', 'AP', 'nasal', 1); addC('ɲ', 'PL', 'nasal', 1); addC('ŋ', 'VE', 'nasal', 1); addC('ɴ', 'UV', 'nasal', 1);
    addC('ʙ', 'BL', 'trill', 1); addC('r', 'AL', 'trill', 1); addC('ʀ', 'UV', 'trill', 1);
    addC('ⱱ', 'LD', 'tap', 1); addC('ɾ', 'AL', 'tap', 1); addC('ɽ', 'RE', 'tap', 1); addC('ɺ', 'AL', 'ltap', 1);
    addC('ɸ', 'BL', 'fric', 0); addC('β', 'BL', 'fric', 1); addC('f', 'LD', 'fric', 0); addC('v', 'LD', 'fric', 1);
    addC('θ', 'DE', 'fric', 0); addC('ð', 'DE', 'fric', 1); addC('s', 'AL', 'fric', 0); addC('z', 'AL', 'fric', 1);
    addC('ʃ', 'PA', 'fric', 0); addC('ʒ', 'PA', 'fric', 1); addC('ʂ', 'RE', 'fric', 0); addC('ʐ', 'RE', 'fric', 1);
    addC('ɕ', 'AP', 'fric', 0); addC('ʑ', 'AP', 'fric', 1); addC('ç', 'PL', 'fric', 0); addC('ʝ', 'PL', 'fric', 1);
    addC('x', 'VE', 'fric', 0); addC('ɣ', 'VE', 'fric', 1); addC('χ', 'UV', 'fric', 0); addC('ʁ', 'UV', 'fric', 1);
    addC('ħ', 'PH', 'fric', 0); addC('ʕ', 'PH', 'fric', 1); addC('ʜ', 'EP', 'fric', 0); addC('ʢ', 'EP', 'fric', 1);
    addC('h', 'GL', 'fric', 0); addC('ɦ', 'GL', 'fric', 1); addC('ɧ', 'PA', 'fric', 0); addC('ʍ', 'LV', 'fric', 0);
    addC('ɬ', 'AL', 'latfric', 0); addC('ɮ', 'AL', 'latfric', 1);
    addC('ʋ', 'LD', 'approx', 1); addC('ɹ', 'AL', 'approx', 1); addC('ɻ', 'RE', 'approx', 1); addC('j', 'PL', 'approx', 1);
    addC('ɰ', 'VE', 'approx', 1); addC('w', 'LV', 'approx', 1); addC('ɥ', 'LP', 'approx', 1);
    addC('l', 'AL', 'lat', 1); addC('ɭ', 'RE', 'lat', 1); addC('ʎ', 'PL', 'lat', 1); addC('ʟ', 'VE', 'lat', 1); addC('ɫ', 'AL', 'lat', 1);
    addC('ɓ', 'BL', 'impl', 1); addC('ɗ', 'AL', 'impl', 1); addC('ʄ', 'PL', 'impl', 1); addC('ɠ', 'VE', 'impl', 1); addC('ʛ', 'UV', 'impl', 1);
    addC('ʘ', 'BL', 'click', 0); addC('ǀ', 'DE', 'click', 0); addC('ǃ', 'PA', 'click', 0); addC('ǂ', 'PL', 'click', 0); addC('ǁ', 'AL', 'click', 0);

    // spellings folded before parsing
    const FOLD = {
        'ʦ': 'ts', 'ʣ': 'dz', 'ʧ': 'tʃ', 'ʤ': 'dʒ', 'ʨ': 'tɕ', 'ʥ': 'dʑ', 'ǝ': 'ə', 'ε': 'ɛ', 'φ': 'ɸ', 'ɂ': 'ʔ',
        'ʻ': 'ʔ', 'ɼ': 'r', 'ʇ': 'ǀ', 'ʗ': 'ǃ', 'ʖ': 'ǁ', 'ꞎ': 'ɬ', '’': 'ʼ', 'ᵻ': 'ɨ', 'ᵿ': 'ʊ', 'ɑ': 'ɑ',
    };
    const TONE_LETTER = { '˥': 5, '˦': 4, '˧': 3, '˨': 2, '˩': 1, '꜒': 5, '꜓': 4, '꜔': 3, '꜕': 2, '꜖': 1 };
    const SUP_DIGIT = { '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9 };
    const TONE_MARK = {
        '́': [4], '̀': [2], '̄': [3], '̋': [5], '̏': [1], '̂': [5, 2], '̌': [2, 5],
        '᷄': [3, 5], '᷅': [1, 3], '᷆': [3, 1], '᷇': [5, 3], '᷈': [2, 4, 2], '᷉': [4, 2, 4],
    };
    const POST_MOD = { 'ʰ': 'asp', 'ʱ': 'basp', 'ʲ': 'pal', 'ʷ': 'lab', 'ᶣ': 'pallab', 'ˠ': 'vel', 'ˤ': 'phar', 'ˀ': 'glot', '˞': 'rhot', 'ˡ': 'latrel', 'ᵊ': 'schwa' };
    const PRENASAL = new Set(['ⁿ', 'ᵐ', 'ᵑ', 'ᶬ', 'ᶮ', 'ᶯ', 'ᶰ']);
    const SUP_VOWEL = { 'ᵃ': 'a', 'ᵉ': 'e', 'ⁱ': 'i', 'ᵒ': 'o', 'ᵘ': 'u', 'ᶦ': 'ɪ', 'ᶷ': 'ʊ', 'ᵓ': 'ɔ', 'ᵋ': 'ɛ', 'ᵚ': 'ɯ', 'ᶤ': 'ɨ', 'ᶶ': 'ʉ', 'ᵄ': 'ɐ', 'ᵆ': 'æ', 'ᶛ': 'ɒ', 'ᵅ': 'ɑ' };
    const IGNORE_MOD = new Set(['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉', '↓', '↑', '<', '>', 'ʴ', 'ᵡ', 'ᵏ', 'ᶢ', 'ˣ', 'ˢ', 'ᶻ', 'ʸ', 'ʶ', 'ᵝ', 'ᶹ', 'ᶿ', 'ᶞ', 'ᶴ', 'ᶾ', 'ᶝ', 'ᶽ', 'ᵗ', 'ᵈ', 'ᵖ', 'ᵇ', 'ʳ', 'ˑ']);
    const IGNORE_MARK = new Set(['̇', '̣', '̓', '̛', '̢', '̺', '̻', '̼', '̫', '̱', '̲', '͇', '͉', '͍', '͈', '̦', '̨']);

    const isLetter = ch => ch in VOWELS || ch in CONS || ch in APICAL;

    // ------------------------------------------------------------------ parse
    function parse(input) {
        let s = String(input || '').trim();
        s = s.split(/\s*~\s*|\s+\/\s+|\s*;\s*/)[0];            // first of "a ~ b" variants
        s = s.replace(/^[\[\/]+|[\]\/]+$/g, '').replace(/[()*\[\]\/]/g, '');
        s = s.normalize('NFD');
        // c + cedilla is ç; keep it as one letter
        s = s.replace(/ç/g, 'ç');
        let t = '';
        for (const ch of s) t += FOLD[ch] !== undefined ? FOLD[ch] : ch;
        const chars = [...t];

        const segs = [];
        const unsupported = new Map();
        const syllables = [];            // [{start, end, tone}]
        let sylStart = 0, stress = 0, join = false, pendingPrenasal = false, word = 0, register = 0;
        const closeSyl = () => {
            if (segs.length > sylStart) syllables.push({ start: sylStart, end: segs.length, tone: null });
            sylStart = segs.length;
        };
        const last = () => segs[segs.length - 1];
        const nextBase = i => { for (let k = i + 1; k < chars.length; k++) { const c = chars[k]; if (isLetter(c)) return c; if (!/[̀-ͯ᷀-᷿]/.test(c)) return null; } return null; };

        for (let i = 0; i < chars.length; i++) {
            const ch = chars[i];
            const prev = last();
            if (/\s/.test(ch) || ch === '‿' && false) { closeSyl(); if (prev) prev.wordEnd = true; word++; continue; }
            if (ch === '‿' || ch === '-' || ch === '=' || ch === '+') continue;
            if (ch === '.' ) { closeSyl(); continue; }
            if (ch === ',' || ch === '|' || ch === '‖') { closeSyl(); if (prev) { prev.wordEnd = true; prev.pause = ch === ',' ? 180 : 260; } word++; continue; }
            if (ch === 'ˈ' || ch === 'ˌ') { closeSyl(); stress = ch === 'ˈ' ? 1 : 2; continue; }
            if (ch === "'") {
                const nb = chars[i + 1];
                if (prev && prev.type === 'C' && !(prev.wordEnd) && (!nb || nb in VOWELS || /\s/.test(nb))) prev.ejective = true;
                else { closeSyl(); stress = 1; }
                continue;
            }
            if (ch === 'ʼ') { if (prev) prev.ejective = true; continue; }
            if (ch === 'ː' || ch === ':') { if (prev) prev.long = 1; continue; }
            if (ch === 'ˑ') { if (prev) prev.long = Math.max(prev.long || 0, .5); continue; }
            if (ch === 'ꜜ') { register -= .5; continue; }
            if (ch === 'ꜛ') { register += .5; continue; }
            if (ch === '↗' || ch === '↘') continue;
            // tone letters / Chao digits: a run closes the syllable it follows
            const isAsciiDigit = /[0-9]/.test(ch) && prev;
            if (ch in TONE_LETTER || ch in SUP_DIGIT || isAsciiDigit) {
                const lv = [];
                let k = i;
                for (; k < chars.length; k++) {
                    const c = chars[k];
                    if (c in TONE_LETTER) lv.push(TONE_LETTER[c]);
                    else if (c in SUP_DIGIT) lv.push(SUP_DIGIT[c]);
                    else if (/[0-9]/.test(c)) lv.push(+c);
                    else if (c === '̃' || c === '̰') continue; // stray marks inside a run
                    else break;
                }
                i = k - 1;
                const ok = lv.length && lv.length <= 4 && lv.every(v => v >= 1 && v <= 5);
                if (segs.length > sylStart) {
                    syllables.push({ start: sylStart, end: segs.length, tone: ok ? lv.map(v => v + register) : null, toneText: lv.join(''), category: !ok });
                    sylStart = segs.length;
                } else if (syllables.length && ok) {
                    syllables[syllables.length - 1].tone = lv.map(v => v + register);
                }
                continue;
            }
            if (/[̀-ͯ᷀-᷿]/.test(ch)) {
                if (!prev) continue;
                if (ch === '͡' || ch === '͜') { join = true; continue; }
                if (TONE_MARK[ch]) { prev.toneMark = TONE_MARK[ch].map(v => v + register); if (prev.type === 'C') prev.syllabic = true; continue; }
                switch (ch) {
                    case '̃': prev.nasalized = true; break;
                    case '̆': prev.short = true; break;
                    case '̈': if (prev.type === 'V') prev.b = .5 * prev.b + .25; break;
                    case '̽': if (prev.type === 'V') { prev.b = .5 * prev.b + .25; prev.h = .5 * prev.h + .25; } break;
                    case '̊': case '̥': prev.voiced = 0; prev.devoiced = true; break;
                    case '̬': prev.voiced = 1; break;
                    case '̍': case '̩': prev.syllabic = true; break;
                    case '̑': case '̯': prev.nonsyl = true; break;
                    case '̘': if (prev.type === 'V') prev.h = Math.min(1, prev.h + .05); break;
                    case '̙': if (prev.type === 'V') prev.h = Math.max(0, prev.h - .05); break;
                    case '̝': if (prev.type === 'V') prev.h = Math.min(1, prev.h + .12); else if (prev.manner === 'fric') prev.raised = true; break;
                    case '̞': if (prev.type === 'V') prev.h = Math.max(0, prev.h - .12); else if (prev.manner === 'fric') prev.manner = 'approx'; break;
                    case '̟': if (prev.type === 'V') prev.b = Math.max(0, prev.b - .12); break;
                    case '̠': if (prev.type === 'V') prev.b = Math.min(1, prev.b + .12); else if (prev.place === 'AL') prev.place = 'PA'; break;
                    case '̜': case '̹': break;
                    case '̚': prev.noRelease = true; break;
                    case '̤': prev.breathy = true; break;
                    case '̰': prev.creaky = true; break;
                    case '̪': if (prev.type === 'C' && (prev.place === 'AL' || prev.place === 'PA')) prev.place = 'DE'; break;
                    case '̴': prev.vel = true; break;
                    default:
                        if (!IGNORE_MARK.has(ch)) unsupported.set(ch, (unsupported.get(ch) || 0) + 1);
                }
                continue;
            }
            if (POST_MOD[ch] !== undefined || PRENASAL.has(ch)) {
                if (PRENASAL.has(ch) && nextBase(i) && nextBase(i) in CONS && chars[i + 1] && isLetter(chars[i + 1])) { pendingPrenasal = true; continue; }
                if (!prev) continue;
                const m = POST_MOD[ch];
                if (m === 'asp') prev.asp = true;
                else if (m === 'basp') { prev.basp = true; }
                else if (m === 'pal') prev.pal = true;
                else if (m === 'lab') prev.lab = true;
                else if (m === 'pallab') { prev.pal = true; prev.lab = true; }
                else if (m === 'vel') prev.vel = true;
                else if (m === 'phar') prev.phar = true;
                else if (m === 'glot') prev.glot = true;
                else if (m === 'rhot') prev.rhotic = true;
                continue;
            }
            if (SUP_VOWEL[ch]) {
                const [h, b, r] = VOWELS[SUP_VOWEL[ch]];
                segs.push({ sym: ch, base: SUP_VOWEL[ch], type: 'V', h, b, round: r, voiced: 1, nonsyl: true, short: true, word });
                continue;
            }
            if (IGNORE_MOD.has(ch)) continue;
            if (ch in VOWELS || ch in APICAL) {
                const seg = ch in VOWELS
                    ? (() => { const [h, b, r, rh] = VOWELS[ch]; return { sym: ch, base: ch, type: 'V', h, b, round: r, rhotic: !!rh, voiced: 1, word }; })()
                    : { sym: ch, base: ch, type: 'V', apical: APICAL[ch], h: .9, b: .5, round: ch === 'ʮ' || ch === 'ʯ' ? 1 : 0, voiced: 1, word };
                if (stress) { seg.stress = stress; stress = 0; }
                segs.push(seg);
                join = false;
                continue;
            }
            if (ch in CONS) {
                const [place, manner, voiced] = CONS[ch];
                const seg = { sym: ch, base: ch, type: 'C', place, manner, voiced, word };
                if (ch === 'ɫ') seg.vel = true;
                if (pendingPrenasal) { seg.prenasal = true; pendingPrenasal = false; }
                if (join && prev && prev.type === 'C') {
                    // tie bar: affricate (t͡s) or double articulation (k͡p, ŋ͡m)
                    join = false;
                    if ((prev.manner === 'stop' || prev.manner === 'nasal') && seg.manner === prev.manner) {
                        prev.place = 'LV'; prev.sym += '͡' + ch; prev.voiced = prev.voiced || voiced; continue;
                    }
                    if (prev.manner === 'stop' && (manner === 'fric' || manner === 'latfric')) {
                        makeAffricate(prev, seg); continue;
                    }
                }
                join = false;
                if (stress && segs.length === sylStart) { seg.stressOnset = stress; }
                segs.push(seg);
                continue;
            }
            unsupported.set(ch, (unsupported.get(ch) || 0) + 1);
        }
        closeSyl();

        // stops followed by a homorganic fricative are written as affricates without a tie too (ts, tʃ, tɕ, pf, kx)
        const AFF = /^(?:[td][szʃʒɕʑʂʐθðɬɮ]|[pb][fvɸβ]|[kg][xɣ]|[qɢ][χʁ]|[ʈɖ][ʂʐ]|[cɟ][çʝ]|[ȶȡ][ɕʑ])$/;
        for (let i = 0; i + 1 < segs.length; i++) {
            const a = segs[i], b = segs[i + 1];
            if (a.type === 'C' && b.type === 'C' && a.manner === 'stop' && !a.asp && !a.ejective && !a.wordEnd && AFF.test(a.base + b.base) && !syllables.some(sy => sy.start === i + 1)) {
                makeAffricate(a, b);
                segs.splice(i + 1, 1);
                for (const sy of syllables) { if (sy.start > i) sy.start--; if (sy.end > i) sy.end--; }
            }
        }
        // stress carried by an onset consonant goes to the next vowel
        for (let i = 0; i < segs.length; i++) if (segs[i].stressOnset) { for (let k = i; k < segs.length; k++) if (segs[k].type === 'V') { segs[k].stress = segs[k].stress || segs[i].stressOnset; break; } }
        // syllable index and tone per segment
        syllables.forEach((sy, n) => { for (let k = sy.start; k < sy.end && k < segs.length; k++) { segs[k].syl = n; if (sy.tone) segs[k].sylTone = sy.tone; if (sy.category) segs[k].toneCategory = sy.toneText; } });
        return { segs, syllables: syllables.filter(sy => sy.end > sy.start), unsupported: [...unsupported.keys()] };
    }

    function makeAffricate(stop, fric) {
        stop.manner = 'affr';
        stop.sym += fric.sym;
        stop.fricPlace = fric.place;
        stop.fricBase = fric.base;
        stop.lateral = fric.manner === 'latfric';
        stop.voiced = fric.voiced && stop.voiced;
        for (const k of ['asp', 'basp', 'pal', 'lab', 'ejective', 'wordEnd', 'pause', 'long', 'glot']) if (fric[k]) stop[k] = fric[k];
    }

    // ------------------------------------------------------------------ descriptions
    const NAMES = {
        en: {
            BL: 'bilabial', LD: 'labiodental', DE: 'dental', AL: 'alveolar', PA: 'postalveolar', RE: 'retroflex', AP: 'alveolo-palatal',
            PL: 'palatal', VE: 'velar', UV: 'uvular', PH: 'pharyngeal', EP: 'epiglottal', GL: 'glottal', LV: 'labial-velar', LP: 'labial-palatal',
            stop: 'plosive', nasal: 'nasal', trill: 'trill', tap: 'tap', ltap: 'lateral tap', fric: 'fricative', latfric: 'lateral fricative',
            approx: 'approximant', lat: 'lateral approximant', impl: 'implosive', click: 'click', affr: 'affricate',
            voiced: 'voiced', voiceless: 'voiceless', asp: 'aspirated', basp: 'breathy-voiced', ejective: 'ejective',
            pal: 'palatalized', lab: 'labialized', vel: 'velarized', phar: 'pharyngealized', glot: 'glottalized', prenasal: 'prenasalized',
            heights: ['open', 'near-open', 'open-mid', 'mid', 'close-mid', 'near-close', 'close'], front: 'front', central: 'central', back: 'back',
            rounded: 'rounded', unrounded: 'unrounded', nasalized: 'nasalized', long: 'long', stressed: 'stressed', apical: 'apical vowel',
            tone: 'tone', breathy: 'breathy', creaky: 'creaky', syllabic: 'syllabic', nonsyl: 'non-syllabic', rhotic: 'r-coloured',
        },
        ja: {
            BL: '両唇', LD: '唇歯', DE: '歯', AL: '歯茎', PA: '後部歯茎', RE: 'そり舌', AP: '歯茎硬口蓋',
            PL: '硬口蓋', VE: '軟口蓋', UV: '口蓋垂', PH: '咽頭', EP: '喉頭蓋', GL: '声門', LV: '両唇軟口蓋', LP: '両唇硬口蓋',
            stop: '破裂音', nasal: '鼻音', trill: 'ふるえ音', tap: 'はじき音', ltap: '側面はじき音', fric: '摩擦音', latfric: '側面摩擦音',
            approx: '接近音', lat: '側面接近音', impl: '入破音', click: '吸着音', affr: '破擦音',
            voiced: '有声', voiceless: '無声', asp: '有気', basp: '息もれ有気', ejective: '放出', pal: '硬口蓋化', lab: '唇音化',
            vel: '軟口蓋化', phar: '咽頭化', glot: '声門化', prenasal: '前鼻音化',
            heights: ['広', '準広', '半広', '中央', '半狭', '準狭', '狭'], front: '前舌', central: '中舌', back: '後舌',
            rounded: '円唇', unrounded: '非円唇', nasalized: '鼻母音', long: '長', stressed: '強勢', apical: '舌尖母音',
            tone: '声調', breathy: '息もれ声', creaky: 'きしみ声', syllabic: '成節', nonsyl: '非成節', rhotic: 'r音化',
        },
    };
    function describe(seg, lang) {
        const N = NAMES[lang] || NAMES.en;
        const ja = lang === 'ja';
        const parts = [];
        if (seg.type === 'V') {
            if (seg.apical) parts.push(N.apical, '(' + N[seg.apical] + ')');
            else {
                const hi = Math.round(seg.h * 6);
                parts.push(N.heights[Math.max(0, Math.min(6, hi))], seg.b < .33 ? N.front : seg.b > .66 ? N.back : N.central, seg.round ? N.rounded : N.unrounded);
            }
            if (seg.nasalized) parts.push(N.nasalized);
            if (seg.rhotic) parts.push(N.rhotic);
            if (seg.long) parts.push(N.long);
            if (seg.nonsyl) parts.push(N.nonsyl);
            if (seg.breathy) parts.push(N.breathy);
            if (seg.creaky) parts.push(N.creaky);
            if (seg.devoiced) parts.push(N.voiceless);
            if (seg.stress === 1) parts.push(N.stressed);
            return ja ? parts.join('・') + (seg.apical ? '' : '母音') : parts.join(' ') + (seg.apical ? '' : ' vowel');
        }
        if (seg.ejective) parts.push(N.ejective);
        else if (seg.manner !== 'click' && seg.manner !== 'impl') parts.push(seg.voiced ? N.voiced : N.voiceless);
        if (seg.asp) parts.push(N.asp);
        if (seg.basp) parts.push(N.basp);
        for (const k of ['prenasal', 'pal', 'lab', 'vel', 'phar', 'glot']) if (seg[k]) parts.push(N[k]);
        if (seg.syllabic) parts.push(N.syllabic);
        const place = seg.manner === 'affr' ? (seg.fricPlace || seg.place) : seg.place;
        const man = seg.manner === 'click' && seg.place === 'AL' ? N.lat + ' ' + N.click : N[seg.manner];
        if (ja) return parts.join('・') + (parts.length ? '・' : '') + N[place] + man;
        parts.push(N[place], seg.manner === 'click' && seg.place === 'AL' ? 'lateral click' : man);
        return parts.join(' ');
    }

    // ------------------------------------------------------------------ targets
    const FIELDS_A = ['AV', 'AH', 'AF', 'FF', 'FB', 'glot', 'CR'];                       // fast (amplitudes, source)
    const FIELDS_F = ['F1', 'F2', 'F3', 'F4', 'B1', 'B2', 'B3', 'FNZ'];                   // formants
    const FIELDS_R = ['cx', 'cy', 'tx', 'ty', 'curl', 'lip', 'pro', 'll', 'vel', 'jaw', 'lat'];   // articulators (drawing)
    const FIELDS = [...FIELDS_A, ...FIELDS_F, ...FIELDS_R];

    const REST = {
        AV: 0, AH: 0, AF: 0, FF: 4000, FB: 2000, glot: 1, CR: 0,
        F1: 500, F2: 1500, F3: 2500, F4: 3500, B1: 90, B2: 110, B3: 170, FNZ: 270,
        cx: 182, cy: 262, tx: 118, ty: 262, curl: 0, lip: 0.03, pro: 0, ll: 0, vel: 1, jaw: 0.08, lat: 0,
    };

    function vowelTarget(seg) {
        let { h, b, round } = seg;
        const P = Object.assign({}, REST);
        if (seg.apical) {
            // a coronal approximant with a buzz: F2 high for ɿ, lower with a low F3 for ʅ
            const re = seg.apical === 'RE';
            Object.assign(P, { F1: 340, F2: re ? 1450 : 1650, F3: re ? 2000 : 2850, B1: 90, B2: 140, AV: 0.9, AF: 0.06, FF: re ? 2600 : 5200, FB: 1800 });
            Object.assign(P, { cx: 175, cy: 240, tx: re ? 126 : 103, ty: re ? 191 : 201, curl: re ? .8 : 0, jaw: .16, lip: .3, vel: 0, glot: 0 });
            if (round) { P.F2 *= .82; P.F3 -= 150; P.lip = .15; P.pro = 1; }
            return P;
        }
        let F1 = 250 + 600 * (1 - h);
        const F2f = 1750 + 600 * h, F2b = 1050 + 300 * h;
        let F2 = F2f + (F2b - F2f) * b;
        let F3 = 2450 + 550 * h * (1 - b);
        if (round) { F2 *= 1 - (0.12 + 0.43 * b) * (0.45 + 0.55 * h); F3 -= 250 * (1 - b) + 50; F1 *= .96; }
        if (seg.rhotic) { F3 = 1650; F2 = Math.min(F2, 1350); }
        P.F1 = F1; P.F2 = F2; P.F3 = F3; P.F4 = Math.max(3400, F3 + 600);
        P.B1 = 60 + 40 * (1 - h); P.B2 = 80 + 40 * b; P.B3 = 150;
        P.AV = 1; P.AH = 0.02; P.glot = 0;
        // tongue body circle (r 46 in tract.js): top 8px under the palate for close vowels, root near the wall for ɑ
        P.cx = 150 + 62 * b + 12 * b * (1 - h); P.cy = 271 - 40 * h;
        P.tx = 96 + .25 * (P.cx - 150); P.ty = P.cy + 6;
        P.jaw = 0.08 + 0.85 * (1 - h);
        P.lip = round ? 0.12 + 0.3 * (1 - h) : 0.35 + 0.65 * (1 - h);
        P.pro = round ? 1 : 0;
        P.vel = 0;
        P.curl = seg.rhotic ? .5 : 0;
        if (seg.nasalized) { P.FNZ = 470; P.B1 *= 1.6; P.vel = .75; P.AV = .85; }
        if (seg.breathy) { P.AH = .3; P.AV = .75; P.glot = .45; }
        if (seg.creaky) { P.CR = 1; P.AV = .8; }
        if (seg.voiced === 0) { P.AV = 0; P.AH = .55; P.glot = 1; }
        if (seg.vel) { P.F2 = Math.min(P.F2, 1200); }
        return P;
    }

    // closure loci: [F1, F2, F3] at the constriction; velars take theirs from the vowel
    const LOCUS = {
        BL: [220, 850, 2200], LD: [250, 1100, 2350], DE: [250, 1600, 2600], AL: [250, 1750, 2700], PA: [250, 2000, 2550],
        RE: [250, 1650, 1900], AP: [250, 2200, 2900], PL: [250, 2300, 3000], VE: null, UV: [380, 1150, 2400],
        PH: [700, 1100, 2500], EP: [700, 1050, 2500], GL: null, LV: [230, 800, 2200], LP: [240, 1900, 2400],
    };
    // frication / burst spectrum per place: [centre Hz, bandwidth Hz, relative gain]
    // gains calibrated in node against a vowel (2026-11-10): s ≈ -8 dB, ʃ -7, x -14, f/θ -20, bursts -4..-10
    const NOISE = {
        BL: [1400, 2500, .25], LD: [5500, 4500, .043], DE: [6500, 3500, .027], AL: [6200, 1600, .081], PA: [3100, 1300, .365],
        RE: [2600, 1100, .43], AP: [3900, 1500, .22], PL: [4300, 1500, .114], VE: null, UV: [1300, 650, .79],
        PH: [1100, 900, .46], EP: [1000, 900, .6], GL: [2500, 4000, 0], LV: [1300, 1200, .48], LP: [3000, 2000, .15],
    };
    const BURST = {
        BL: [900, 1600, 2.06], LD: [5000, 4000, .1], DE: [4500, 3000, .3], AL: [4200, 2200, .425], PA: [3000, 1600, .48],
        RE: [2800, 1500, .645], AP: [3500, 1600, .53], PL: [3300, 1500, .56], VE: null, UV: [1250, 650, 1.63],
        PH: [1100, 900, .94], EP: [1100, 900, 1.18], GL: [2000, 3000, .1], LV: [1000, 1200, 1.5], LP: [2500, 2000, .5],
    };
    const CLICK_GAIN = { BL: 3.63, DE: .25, PA: .95, PL: .63, AL: .29 };
    const NASAL_ZERO = { BL: 1050, LD: 1100, DE: 1600, AL: 1650, PA: 1800, RE: 1500, AP: 2100, PL: 2100, VE: 2600, UV: 2300, LV: 1100 };
    const APPROX = {
        j: [250, 2300, 3050], w: [280, 620, 2200], ɥ: [255, 1950, 2350], ɰ: [310, 1300, 2400], ɹ: [350, 1250, 1650], ɻ: [350, 1200, 1550],
        ʋ: [320, 1400, 2350], l: [360, 1250, 2700], ɫ: [380, 900, 2600], ɭ: [360, 1350, 2100], ʎ: [270, 2100, 2850], ʟ: [330, 1100, 2500],
    };
    // semivowels: vowel-like (i, u, y) and reached at their own target, not blended toward the vowel
    const GLIDES = new Set(['j', 'w', 'ɥ', 'ɰ']);
    // contact points on the palate for coronal constrictions (drawing coordinates)
    const TIP = { DE: [84, 207], AL: [100, 194], PA: [114, 187], RE: [128, 182] };

    function velarNoise(V, g) { const c = Math.max(1300, Math.min(2600, V.F2 * 1.08)); return [c, 900, g || .6]; }

    function consTarget(seg, V, manner) {
        const P = Object.assign({}, V);
        const place = seg.place;
        manner = manner || seg.manner;
        const deg = ['stop', 'nasal', 'click', 'impl', 'tap', 'ltap', 'trill', 'affr'].includes(manner) ? 0 : (manner === 'fric' || manner === 'latfric') ? 1 : 2;
        const gap = [0, 4, 11][deg];
        // --- articulators
        P.jaw = Math.min(V.jaw, place === 'BL' || place === 'LD' || place === 'LV' ? .25 : ['DE', 'AL', 'PA', 'RE', 'AP'].includes(place) ? .14 : .25);
        P.lat = manner === 'lat' || manner === 'latfric' || manner === 'ltap' || (manner === 'click' && place === 'AL') || seg.lateral ? 1 : 0;
        P.curl = 0;
        const restTip = () => { P.tx = 96 + .25 * (P.cx - 150); P.ty = P.cy + 6; };
        if (TIP[place]) {
            const [x, y] = TIP[place];
            P.tx = x + (place === 'DE' ? -gap * .3 : 0); P.ty = y + gap;
            P.curl = place === 'RE' ? 1 : seg.base === 'ɹ' ? .35 : 0;
            if (place === 'PA') { P.cx = Math.min(P.cx, 185); P.cy = Math.min(P.cy, 240); }
            // the body follows the blade up a little
            P.cx = Math.min(Math.max(P.cx, 165), 195); P.cy = Math.min(P.cy, 246);
        } else if (place === 'AP') {
            P.cx = 160; P.cy = 222 + gap; P.tx = 96; P.ty = 232;
        } else if (place === 'PL' || place === 'LP') {
            P.cx = 165; P.cy = 222 + gap; restTip();
        } else if (place === 'VE' || place === 'LV') {
            P.cx = 192 + 22 * Math.max(0, Math.min(1, (V.cx - 150) / 65)); P.cy = 226 + gap; restTip();
        } else if (place === 'UV') {
            P.cx = 238; P.cy = 236 + gap; restTip();
        } else if (place === 'PH') {
            P.cx = 241 - gap * .5; P.cy = 262; restTip();
        } else if (place === 'EP') {
            P.cx = 243 - gap * .5; P.cy = 282; restTip();
        }
        if (place === 'BL') P.lip = [0, .06, .14][deg];
        else if (place === 'LD') { P.lip = .07; P.ll = 1; }
        else if (place === 'LV' || place === 'LP') { P.lip = deg === 0 ? 0 : .12; P.pro = 1; }
        else P.lip = Math.max(.12, Math.min(V.lip, .5)), P.ll = 0;
        if (place === 'LD') P.ll = 1; else P.ll = 0;
        P.vel = manner === 'nasal' ? 1 : 0;
        P.glot = seg.voiced ? 0 : 1;
        if (seg.pal) { P.cx = Math.min(P.cx, 168); P.cy = Math.min(P.cy, 228); }
        if (seg.vel) { P.cx = Math.max(P.cx, 205); P.cy = Math.min(P.cy, 232); }
        if (seg.phar) { P.cx = Math.max(P.cx, 230); P.cy = Math.max(P.cy, 258); }
        if (seg.lab) { P.pro = 1; if (deg) P.lip = Math.min(P.lip, .15); }
        // --- acoustics
        let L = LOCUS[place];
        if (!L) L = place === 'VE' ? [250, Math.max(1450, V.F2 * 1.05), Math.max(1900, V.F2 * 1.05 + 350)] : [V.F1, V.F2, V.F3];
        const k2 = .35, k3 = .3;
        P.F1 = deg === 0 ? 220 : deg === 1 ? 320 : P.F1;
        P.F2 = L[1] + k2 * (V.F2 - L[1]);
        P.F3 = L[2] + k3 * (V.F3 - L[2]);
        if (deg === 2 && APPROX[seg.base]) {
            [P.F1, P.F2, P.F3] = APPROX[seg.base];
            if (!GLIDES.has(seg.base)) P.F2 = P.F2 * .8 + V.F2 * .2;
        }
        if (place === 'GL') { P.F1 = V.F1; P.F2 = V.F2; P.F3 = V.F3; }
        if (place === 'PH' || place === 'EP') { P.F1 = Math.max(P.F1, 650); }
        P.B1 = deg === 0 ? 140 : 100; P.B2 = 130; P.B3 = 200;
        if (GLIDES.has(seg.base)) { P.B1 = 65; P.B2 = 95; P.B3 = 160; }   // glides are vowel-like: sharp formants
        P.FNZ = 270;
        if (seg.pal) { P.F2 = Math.max(P.F2, 2050); P.F3 = Math.max(P.F3, 2800); }
        if (seg.lab) { P.F2 *= .78; P.F3 -= 200; }
        if (seg.vel) { P.F2 = Math.min(P.F2, 1100); }
        if (seg.phar) { P.F1 += 180; P.F2 = Math.min(P.F2, 1150); }
        const N = NOISE[place] || velarNoise(V);
        P.FF = N[0]; P.FB = N[1];
        P.AV = 0; P.AH = 0; P.AF = 0; P.CR = 0;
        return P;
    }

    // ------------------------------------------------------------------ plan
    function plan(ipa, opts = {}) {
        const ds = opts.durScale || 1;
        const parsed = parse(ipa);
        const segs = parsed.segs;
        const phases = [];
        const push = (dur, P, info) => phases.push(Object.assign({ dur: dur * ds, P }, info));
        const vtarget = segs.map(s => s.type === 'V' ? vowelTarget(s) : null);
        const schwa = vowelTarget({ h: .5, b: .5, round: 0 });
        const tonal = segs.some(s => s.sylTone || s.toneMark);
        // nucleus of each syllable (first syllabic vowel, else syllabic consonant)
        // In a tone-marked syllable a run of vowels is one syllable: the most open vowel is the
        // nucleus and the others are glides (siəŋ˨˩˧ = s-i̯-ə-ŋ, not two syllables si + əŋ).
        {
            let k = 0;
            while (k < segs.length) {
                if (segs[k].type !== 'V' || segs[k].apical || !segs[k].sylTone) { k++; continue; }
                let e = k;
                while (e + 1 < segs.length && segs[e + 1].type === 'V' && !segs[e + 1].apical && segs[e + 1].syl === segs[k].syl) e++;
                if (e > k) {
                    const run = segs.slice(k, e + 1).filter(v => !v.nonsyl);
                    if (run.length > 1) {
                        let nuc = run[0];
                        for (const v of run) if (v.h < nuc.h - .01) nuc = v;
                        for (const v of run) if (v !== nuc) { v.nonsyl = true; v.autoGlide = true; }
                    }
                }
                k = e + 1;
            }
        }
        const isNucleus = s => (s.type === 'V' && !s.nonsyl) || s.syllabic;
        const lastNucleus = (() => { for (let i = segs.length - 1; i >= 0; i--) if (isNucleus(segs[i])) return i; return -1; })();
        // prominence: written stress if any; with no stress and no tone marks, each word's first
        // full (non-schwa) vowel carries it, so unmarked phrases are not read as even beats
        const REDUCED = new Set(['ə', 'ɐ', 'ɚ']);
        const markedStress = segs.some(s => s.stress);
        segs.forEach(s => { s.prom = s.stress || 0; });
        if (!markedStress && !tonal) {
            const byWord = {};
            segs.forEach(s => { if (isNucleus(s)) (byWord[s.word] = byWord[s.word] || []).push(s); });
            for (const list of Object.values(byWord)) { const v = list.find(s => !REDUCED.has(s.base)) || list[0]; v.prom = 1; }
        }
        const anyProm = segs.some(s => s.prom);
        const nucleiInWord = w => segs.filter(s => s.word === w && isNucleus(s)).length;

        const ctxVowel = i => {
            let nx = null, pv = null;
            for (let k = i + 1; k < segs.length; k++) if (segs[k].type === 'V') { nx = vtarget[k]; break; } else if (segs[k - 1] && segs[k - 1].wordEnd) break;
            for (let k = i - 1; k >= 0; k--) if (segs[k].type === 'V') { pv = vtarget[k]; break; } else if (segs[k].wordEnd) break;
            if (nx && pv) { const P = {}; for (const f of FIELDS) P[f] = .7 * nx[f] + .3 * pv[f]; return P; }
            return nx || pv || schwa;
        };
        const nextVowelP = i => { for (let k = i + 1; k < segs.length; k++) { if (segs[k].type === 'V') return vtarget[k]; if (segs[k].type === 'C' && segs[k].manner !== 'approx') break; } return null; };

        push(110, Object.assign({}, REST), { kind: 'rest', seg: -1 });
        segs.forEach((s, i) => {
            const info = { seg: i };
            const nx = segs[i + 1];
            const beforeVowel = nx && nx.type === 'V';
            const glide = () => {
                if (!beforeVowel) return;
                if (s.pal) { const P = consTarget({ place: 'PL', manner: 'approx', base: 'j', voiced: 1 }, ctxVowel(i)); P.AV = .8; P.glot = 0; push(28, P, Object.assign({ kind: 'offglide j' }, info)); }
                else if (s.lab) { const P = consTarget({ place: 'LV', manner: 'approx', base: 'w', voiced: 1 }, ctxVowel(i)); P.AV = .8; P.glot = 0; push(28, P, Object.assign({ kind: 'offglide w' }, info)); }
            };
            if (s.type === 'V') {
                const P = vtarget[i];
                // open vowels are intrinsically longer; schwa and unstressed lax vowels are short
                let d = 120 * (.85 + .35 * (1 - s.h));
                const multi = nucleiInWord(s.word) > 1;
                if (s.prom === 1) d *= 1.3; else if (s.prom === 2) d *= 1.12;
                else if (REDUCED.has(s.base) && !tonal) d = 52;
                else if (anyProm && multi) d *= ['ɪ', 'ʊ', 'ɨ'].includes(s.base) ? .62 : .8;
                if (s.long === 1) d *= 1.6; else if (s.long) d *= 1.3;
                if (s.short) d *= .6;
                if (s.nonsyl) d = Math.min(d, 65);
                const tone = s.toneMark || s.sylTone;
                if (tone && isNucleus(s)) { const contour = new Set(tone).size > 1; d = Math.max(d, contour ? 190 : 150); }
                else if (tonal && isNucleus(s)) d *= .65;     // neutral tone: a light, short syllable
                if (i === lastNucleus) d = Math.max(d * 1.3, 75);
                if (s.apical) d = Math.max(d, 150);
                // falling diphthong (eɪ̯, aʊ̯): the nucleus keeps only half of the syllable's vowel time
                // and the formants glide across the whole second half, instead of a long steady
                // vowel with a 65 ms jump at the end
                const nx = segs[i + 1];
                let edgeF = 45;
                if (!s.nonsyl && nx && nx.type === 'V' && nx.nonsyl && nx.syl === s.syl) {
                    const total = d + 65;
                    d = total * .38; nx._glide = total * .62;
                } else if (s.nonsyl && s._glide) {
                    d = s._glide; edgeF = d * .95;
                } else if (s.nonsyl && nx && nx.type === 'V' && !nx.nonsyl && nx.syl === s.syl) {
                    // rising diphthong (u̯ə, i̯ə): the glide is a passing point, not a held vowel
                    d = 55; edgeF = 18; nx._onglide = true;
                }
                if (s._onglide) edgeF = 70;
                push(d, P, Object.assign({ kind: 'vowel', edgeF }, info));
                if (s.glot) push(40, Object.assign({}, P, { AV: 0, AH: 0, glot: -0.5 }), Object.assign({ kind: 'glottal closure' }, info));
            } else {
                const V = ctxVowel(i);
                const m = s.manner;
                const gem = s.long ? 1.8 : 1;
                const syl = s.syllabic ? 2 : 1;
                if (s.prenasal) {
                    const P = consTarget(Object.assign({}, s, { manner: 'nasal' }), V, 'nasal');
                    Object.assign(P, { AV: .55, F1: 260, B1: 110, FNZ: NASAL_ZERO[s.place] || 1600, glot: 0 });
                    push(50, P, Object.assign({ kind: 'prenasal' }, info));
                }
                if (s.place === 'GL' && m === 'stop') {
                    const P = Object.assign({}, V, { AV: 0, AH: 0, AF: 0, glot: -0.5, vel: 0, CR: 0 });
                    push(55 * gem, P, Object.assign({ kind: 'glottal closure' }, info));
                } else if (m === 'stop' || m === 'affr' || m === 'impl' || m === 'click') {
                    const C = consTarget(s, V, m === 'affr' ? 'stop' : m);
                    if (m === 'click') {
                        // front and back closure: dorsum on the velum too
                        C.cx = Math.max(C.cx, 205); C.cy = Math.min(C.cy, 228);
                        if (s.place === 'BL') { C.tx = 96 + .25 * (C.cx - 150); C.ty = C.cy + 6; }
                    }
                    const closure = Object.assign({}, C);
                    closure.AV = m === 'impl' ? .55 : s.voiced ? .22 : 0;
                    if (s.ejective) closure.glot = -0.5;
                    if (m === 'click' && s.prenasal) { closure.AV = .5; closure.vel = 1; closure.FNZ = 2400; }
                    const afterPause = i === 0 || segs[i - 1].pause;
                    push((afterPause ? 45 : 62) * gem, closure, Object.assign({ kind: 'closure' }, info));
                    if (!s.noRelease) {
                        const B = BURST[s.place] || velarNoise(V, 1.08);
                        const R = Object.assign({}, closure);
                        R.FF = B[0]; R.FB = B[1];
                        R.AF = m === 'click' ? (CLICK_GAIN[s.place] || .6) * .55 : B[2] * .42 * (s.ejective ? 1.4 : m === 'impl' ? .35 : 1);
                        R.AV = s.voiced ? .35 : 0;
                        if (m === 'click') R.FB = Math.min(R.FB, 900);
                        // release: articulators already opening
                        R.tx = C.tx; R.ty = C.ty + 3; R.lip = s.place === 'BL' ? .06 : C.lip;
                        // a softer release: longer, quieter, ramped in and left to decay into the next phase
                        push(m === 'click' ? 8 : 14, R, Object.assign({ kind: 'burst', edgeA: 2, edgeF: 2 }, info));
                    }
                    if (m === 'affr') {
                        const F = consTarget(Object.assign({}, s, { place: s.fricPlace, base: s.fricBase }), V, s.lateral ? 'latfric' : 'fric');
                        const N = NOISE[s.fricPlace] || velarNoise(V);
                        F.AF = N[2] * (s.voiced ? .5 : 1); F.AV = s.voiced ? .4 : 0; F.glot = s.voiced ? 0 : 1;
                        if (s.lateral) { F.FF = 4500; F.FB = 2500; F.AF = .12; }
                        if (s.ejective) F.glot = -0.5;
                        push(65 * gem, F, Object.assign({ kind: 'frication' }, info));
                    }
                    const nv = nextVowelP(i) || V;
                    if (s.ejective) {
                        push(40, Object.assign({}, closure, { AV: 0, AF: 0, AH: 0, glot: -0.5, lip: C.lip + .1, ty: C.ty + 6 }), Object.assign({ kind: 'glottal hold' }, info));
                    } else if (s.asp) {
                        const A = Object.assign({}, nv, { AV: 0, AH: .55, AF: 0, glot: 1, F1: nv.F1 * .8, B1: 200 });
                        push(58, A, Object.assign({ kind: 'aspiration', edgeF: 8 }, info));
                    } else if (s.basp) {
                        const A = Object.assign({}, nv, { AV: .5, AH: .4, AF: 0, glot: .5, B1: 180 });
                        push(58, A, Object.assign({ kind: 'breathy release', edgeF: 8 }, info));
                    } else if (!s.voiced && !s.noRelease && m !== 'click') {
                        const A = Object.assign({}, nv, { AV: 0, AH: .18, AF: 0, glot: .6, F1: nv.F1 * .8 });
                        push(12, A, Object.assign({ kind: 'short lag', edgeF: 6 }, info));
                    } else if (m === 'click') {
                        push(18, Object.assign({}, nv, { AV: s.prenasal || s.voiced ? .6 : 0, AH: s.asp ? .5 : .08, AF: 0, glot: s.voiced ? 0 : .7 }), Object.assign({ kind: 'release', edgeF: 6 }, info));
                    }
                } else if (m === 'nasal') {
                    const P = consTarget(s, V, 'nasal');
                    Object.assign(P, { AV: s.voiced ? .6 : 0, AH: s.voiced ? 0 : .35, F1: 260, B1: 110, FNZ: NASAL_ZERO[s.place] || 1600, glot: s.voiced ? 0 : 1 });
                    const coda = !beforeVowel;
                    push((coda ? 80 : 68) * gem * syl, P, Object.assign({ kind: 'nasal' }, info));
                } else if (m === 'fric' || m === 'latfric') {
                    const P = consTarget(s, V, m);
                    if (s.place === 'GL') {
                        Object.assign(P, { AH: s.voiced ? .45 : .6, AV: s.voiced ? .35 : 0, AF: 0, glot: s.voiced ? .45 : 1, vel: 0 });
                        const nv = nextVowelP(i); if (nv) { P.F1 = nv.F1; P.F2 = nv.F2; P.F3 = nv.F3; P.cx = nv.cx; P.cy = nv.cy; P.tx = nv.tx; P.ty = nv.ty; P.lip = nv.lip; P.pro = nv.pro; }
                        push(68 * gem, P, Object.assign({ kind: 'fricative', edgeF: 10 }, info));
                    } else {
                        const N = NOISE[s.place] || velarNoise(V);
                        P.AF = (m === 'latfric' ? .7 : N[2]) * (s.voiced ? .5 : 1);
                        if (m === 'latfric') { P.FF = 4500; P.FB = 2500; P.AF = .12 * (s.voiced ? .5 : 1); }
                        if (s.base === 'ɧ') { P.FF = 2000; P.FB = 1500; P.AF = .4; P.cx = 205; P.cy = 228; }
                        P.AV = s.voiced ? .45 : 0;
                        P.AH = ['BL', 'LD', 'DE', 'PH', 'EP'].includes(s.place) && !s.voiced ? .12 : 0;
                        if (s.ejective) P.glot = -0.5;
                        push((s.voiced ? 78 : s.place === 'VE' || s.place === 'UV' ? 115 : 98) * gem * syl, P, Object.assign({ kind: 'fricative', edgeA: 18 }, info));
                    }
                } else if (m === 'approx' || m === 'lat') {
                    const P = consTarget(s, V, m);
                    P.AV = s.voiced ? .78 : 0; P.AH = s.voiced ? 0 : .45; P.glot = s.voiced ? 0 : 1;
                    if (m === 'lat') P.B2 = 220;
                    const glideSV = GLIDES.has(s.base);
                    if (glideSV) P.AV = s.voiced ? .92 : 0;
                    // a glide is a movement: reach the target slowly, leave slowly
                    push((glideSV ? 70 : beforeVowel ? 58 : 72) * gem * syl, P, Object.assign({ kind: m === 'lat' ? 'lateral' : 'approximant', edgeF: glideSV ? 32 : 22 }, info));
                } else if (m === 'tap' || m === 'ltap') {
                    const P = consTarget(s, V, m);
                    P.AV = .35; P.glot = 0;
                    push(24 * gem, P, Object.assign({ kind: 'tap', edgeF: 8, edgeR: 8 }, info));
                } else if (m === 'trill') {
                    const closed = consTarget(s, V, 'trill');
                    closed.AV = .3; closed.glot = 0;
                    const open = Object.assign({}, closed, { AV: .72, ty: closed.ty + 7, lip: s.place === 'BL' ? .1 : closed.lip, cy: s.place === 'UV' ? closed.cy + 6 : closed.cy, F1: 420 });
                    if (s.place === 'AL') { open.F2 = 1350 * .7 + V.F2 * .3; open.F3 = 2100; closed.F3 = 2100; }
                    const n = s.long ? 5 : 3;
                    for (let k = 0; k < n; k++) {
                        push(16 * gem, closed, Object.assign({ kind: 'trill contact', edgeA: 3, edgeF: 5, edgeR: 5 }, info));
                        push(20 * gem, open, Object.assign({ kind: 'trill opening', edgeA: 3, edgeF: 5, edgeR: 5 }, info));
                    }
                }
                if (s.glot && m !== 'stop') push(35, Object.assign({}, V, { AV: 0, AH: 0, AF: 0, glot: -0.5 }), Object.assign({ kind: 'glottal closure' }, info));
                glide();
            }
            if (s.pause && i < segs.length - 1) push(s.pause, Object.assign({}, REST, { vel: .5 }), { kind: 'pause', seg: -1 });
        });
        push(140, Object.assign({}, REST), { kind: 'rest', seg: -1 });

        // Silence carries no formant movement: give rest/pause phases the formants (and lip/jaw
        // pose) of the sound they lead into, or else a vowel after silence starts with a rising
        // F1/F2 sweep that is heard as a [b] ("apan" -> "bapan"). Voicing after silence fades in.
        phases.forEach((ph, k) => {
            if (ph.kind !== 'rest' && ph.kind !== 'pause') return;
            const nb = phases[k + 1] && phases[k + 1].seg >= 0 ? phases[k + 1] : phases[k - 1];
            if (!nb || nb.seg < 0) return;
            for (const f of ['F1', 'F2', 'F3', 'F4', 'B1', 'B2', 'B3', 'FNZ']) ph.P[f] = nb.P[f];
            if (nb === phases[k + 1]) {
                for (const f of ['lip', 'pro', 'jaw', 'cx', 'cy', 'tx', 'ty']) ph.P[f] = REST[f] + (nb.P[f] - REST[f]) * .6;
                if (nb.P.AV > .5 && nb.kind !== 'closure') nb.edgeA = Math.max(nb.edgeA || 0, 28);
            }
        });
        // times
        let t = 0;
        for (const ph of phases) { ph.t0 = t; t += ph.dur; ph.t1 = t; }
        const T = t;
        // keyframe tracks
        const tracks = {};
        for (const f of FIELDS) tracks[f] = [];
        for (const ph of phases) {
            const eA = Math.min((ph.edgeA != null ? ph.edgeA : 10) * ds, ph.dur / 3);
            const eF = Math.min((ph.edgeF != null ? ph.edgeF : 24) * ds, ph.dur * .5);
            const eR = Math.min((ph.edgeR != null ? ph.edgeR : 40) * ds, ph.dur * .7);
            for (const f of FIELDS) {
                const e = FIELDS_A.includes(f) ? eA : FIELDS_F.includes(f) ? eF : eR;
                tracks[f].push([ph.t0 + e, ph.P[f]], [ph.t1, ph.P[f]]);
            }
        }

        // pitch: levels 1..5 (Chao), 3 = the speaker's mid
        const pitch = [];
        const segSpan = i => { let a = Infinity, b = -Infinity; for (const ph of phases) if (ph.seg === i) { a = Math.min(a, ph.t0); b = Math.max(b, ph.t1); } return [a, b]; };
        const declin = tt => -(tonal ? .25 : .5) * tt / T;
        if (tonal) {
            // each syllable with a tone: contour over its nucleus and voiced coda
            const done = new Set();
            segs.forEach((s, i) => {
                const tone = s.toneMark || (isNucleus(s) ? s.sylTone : null);
                if (!tone || !isNucleus(s)) return;
                const key = s.toneMark ? 'm' + i : 's' + s.syl;
                if (done.has(key)) return; done.add(key);
                let [a, b] = segSpan(i);
                if (!s.toneMark) {
                    // extend over the rest of the syllable while it stays voiced
                    for (let k = i + 1; k < segs.length && segs[k].syl === s.syl; k++) { if (!segs[k].voiced) break; b = segSpan(k)[1]; }
                }
                const span = b - a;
                if (tone.length === 1) { pitch.push([a + span * .1, tone[0]], [a + span * .9, tone[0]]); }
                else tone.forEach((lv, n) => pitch.push([a + span * (.1 + .8 * n / (tone.length - 1)), lv]));
            });
            // nuclei with no tone of their own sit mid
            // A toneless syllable among toned ones is a neutral (light) tone: short, and its pitch
            // follows the tone before it (Chao's Mandarin values): after a fall it is low (51 > 1),
            // after a high level it is mid-low (55 > 2), after a rise mid (35 > 3), after a low or
            // dipping tone high (21, 214 > 4). With no toned syllable before it, it sits mid.
            let prevTone = null;
            segs.forEach((s, i) => {
                if (!isNucleus(s)) return;
                const tone = s.toneMark || s.sylTone;
                if (tone) { prevTone = tone; return; }
                const [a, b] = segSpan(i);
                let lv = 3;
                if (prevTone) {
                    const st = prevTone[0], en = prevTone[prevTone.length - 1], lo = Math.min(...prevTone);
                    if (Math.max(...prevTone) <= 2 || (lo < st && lo < en)) lv = 4;
                    else if (en < st) lv = Math.max(1, en - .3);
                    else if (en > st) lv = 3;
                    else lv = en >= 4 ? 2 : Math.max(1, en - 1);
                }
                pitch.push([a + (b - a) * .15, lv], [a + (b - a) * .85, lv - .4]);
            });
        } else {
            // a pitch peak early in each prominent vowel, unstressed syllables lower, a fall at the end
            let afterPeak = false;
            segs.forEach((s, i) => {
                if (!isNucleus(s)) return;
                const [a, b] = segSpan(i);
                if (s.prom === 1) { pitch.push([a + (b - a) * .1, 3.4], [a + (b - a) * .45, 4.1]); afterPeak = true; }
                else if (s.prom === 2) { pitch.push([a + (b - a) * .4, 3.6]); afterPeak = true; }
                else pitch.push([(a + b) / 2, afterPeak ? 2.9 : 3.1]);
                if (i === lastNucleus) pitch.push([b, 2.0]);
            });
        }
        pitch.sort((x, y) => x[0] - y[0]);
        for (const p of pitch) p[1] += declin(p[0]);
        if (!pitch.length) pitch.push([0, 3], [T, 2.6]);

        return { ipa, parsed, segs, phases, tracks, pitch, T, tonal };
    }

    // ------------------------------------------------------------------ sampling
    // S-curve between keyframes: no corners, so movements start and stop gently
    const ease = u => u * u * (3 - 2 * u);
    function valueAt(track, t, hint) {
        // track: [[t, v], ...] sorted; linear interpolation
        const n = track.length;
        if (!n) return 0;
        if (t <= track[0][0]) return track[0][1];
        if (t >= track[n - 1][0]) return track[n - 1][1];
        let lo = 0, hi = n - 1;
        if (hint && hint.i != null && hint.i < n - 1 && track[hint.i][0] <= t) {
            lo = hint.i;
            while (lo < n - 2 && track[lo + 1][0] <= t) lo++;
            hint.i = lo;
            const a = track[lo], b = track[lo + 1];
            return b[0] === a[0] ? b[1] : a[1] + (b[1] - a[1]) * ease((t - a[0]) / (b[0] - a[0]));
        }
        while (hi - lo > 1) { const m = (lo + hi) >> 1; if (track[m][0] <= t) lo = m; else hi = m; }
        if (hint) hint.i = lo;
        const a = track[lo], b = track[hi];
        return b[0] === a[0] ? b[1] : a[1] + (b[1] - a[1]) * ease((t - a[0]) / (b[0] - a[0]));
    }
    function sample(pl, t) {
        const out = {};
        for (const f of FIELDS) out[f] = valueAt(pl.tracks[f], t);
        out.level = valueAt(pl.pitch, t);
        let ph = null;
        for (const p of pl.phases) if (t >= p.t0 && t < p.t1) { ph = p; break; }
        out.phase = ph;
        return out;
    }

    // ------------------------------------------------------------------ synthesis
    class Resonator {
        constructor() { this.y1 = 0; this.y2 = 0; this.a = 1; this.b = 0; this.c = 0; }
        set(F, B, fs) {
            const r = Math.exp(-Math.PI * B / fs);
            this.c = -r * r; this.b = 2 * r * Math.cos(2 * Math.PI * F / fs); this.a = 1 - this.b - this.c;
        }
        tick(x) { const y = this.a * x + this.b * this.y1 + this.c * this.y2; this.y2 = this.y1; this.y1 = y; return y; }
    }
    class AntiResonator {
        constructor() { this.x1 = 0; this.x2 = 0; this.a = 1; this.b = 0; this.c = 0; }
        set(F, B, fs) {
            const r = Math.exp(-Math.PI * B / fs);
            const c = -r * r, b = 2 * r * Math.cos(2 * Math.PI * F / fs), a = 1 - b - c;
            this.a = 1 / a; this.b = -b / a; this.c = -c / a;
        }
        tick(x) { const y = this.a * x + this.b * this.x1 + this.c * this.x2; this.x2 = this.x1; this.x1 = x; return y; }
    }

    function mulberry(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

    const VOICES = {
        male: { f0: 112, vt: 1.0, oq: .6, tilt: .25 },
        female: { f0: 205, vt: 1.16, oq: .68, tilt: .35 },
        child: { f0: 270, vt: 1.3, oq: .7, tilt: .35 },
    };

    function render(pl, opts = {}) {
        const fs = opts.fs || 22050;
        const voice = VOICES[opts.voice] || VOICES.male;
        const N = Math.ceil(pl.T / 1000 * fs);
        const out = new Float32Array(N);
        const rnd = mulberry(12345);
        const noise = () => rnd() * 2 - 1;
        const R = [new Resonator(), new Resonator(), new Resonator(), new Resonator(), new Resonator()];
        const NP = new Resonator(), NZ = new AntiResonator(), FR = new Resonator();
        const hints = {}; for (const f of FIELDS) hints[f] = { i: 0 }; const ph = { i: 0 };
        let phase = 0, T0 = fs / voice.f0, tilt = 0, prevNoise = 0, hp = { x1: 0, y1: 0 };
        const FRAME = 32;
        let P = {}, f0 = voice.f0, f0s = 0, gF = 1, cr = 0, av = 0, ah = 0, af = 0;
        const kF0 = 1 - Math.exp(-FRAME / fs / .018), kAV = 1 - Math.exp(-1 / fs / .004), kAF = 1 - Math.exp(-1 / fs / .0025);
        for (let n = 0; n < N; n++) {
            if (n % FRAME === 0) {
                const t = n / fs * 1000;
                for (const f of FIELDS_A.concat(FIELDS_F)) P[f] = valueAt(pl.tracks[f], t, hints[f]);
                const lv = valueAt(pl.pitch, t, ph);
                cr = P.CR;
                const target = voice.f0 * Math.pow(2, (lv - 3) / 5) * (1 - .3 * cr) * (1 + .006 * Math.sin(t * .027) + .004 * Math.sin(t * .0107 + 1));
                f0s = f0s ? f0s + (target - f0s) * kF0 : target; f0 = f0s;
                const vt = voice.vt;
                R[0].set(P.F1 * vt, P.B1, fs); R[1].set(P.F2 * vt, P.B2, fs); R[2].set(P.F3 * vt, P.B3, fs);
                R[3].set(P.F4 * vt, 250, fs); R[4].set(Math.min(4500 * vt, fs * .45), 300, fs);
                NP.set(270, 100, fs); NZ.set(P.FNZ * (P.FNZ === 270 ? 1 : vt), 100, fs);
                FR.set(Math.min(P.FF * Math.sqrt(vt), fs * .46), P.FB, fs);
            }
            // glottal source: KLGLOTT88-style flow derivative
            phase += 1;
            if (phase >= T0) {
                phase -= T0;
                const jit = .01 + .25 * cr;
                T0 = fs / f0 * (1 + jit * (rnd() - .5));
                gF = 1 - .4 * cr * rnd();
            }
            const breathy = P.glot > .3;
            const Te = T0 * voice.oq * (breathy ? 1.1 : 1);
            const Ta = T0 * (breathy ? .09 : .045);
            let g = 0;
            if (phase < Te) { const x = phase / Te; g = (2 * x - 3 * x * x); }
            else g = -Math.exp(-(phase - Te) / Ta);           // return phase: the folds close softly
            const tl = voice.tilt + (breathy ? .3 : 0);
            tilt = tilt * tl + g * (1 - tl);
            av += (P.AV - av) * kAV; ah += (P.AH - ah) * kAV; af += (P.AF - af) * kAF;
            const voicing = tilt * av * gF;
            // breath noise, a little of it pulsed with the voice
            const nz = noise();
            const asp = nz * (ah + (phase < Te ? .03 * av : 0)) * .45;
            let x = voicing + asp;
            x = NZ.tick(NP.tick(x));
            for (let k = 4; k >= 0; k--) x = R[k].tick(x);
            // frication: parallel noise branch, differentiated (radiation)
            const fn = noise();
            const fr = FR.tick((fn - prevNoise) * af) * 1.06;
            prevNoise = fn;
            const y = x + fr;
            // DC block
            const o = y - hp.x1 + .995 * hp.y1; hp.x1 = y; hp.y1 = o;
            out[n] = o;
        }
        // normalize
        let peak = 0; for (let n = 0; n < N; n++) peak = Math.max(peak, Math.abs(out[n]));
        if (peak > 0) { const g = .85 / peak; for (let n = 0; n < N; n++) out[n] *= g; }
        return { samples: out, fs };
    }

    function toWav(samples, fs) {
        const N = samples.length, buf = new ArrayBuffer(44 + N * 2), v = new DataView(buf);
        const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
        w(0, 'RIFF'); v.setUint32(4, 36 + N * 2, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true);
        v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, fs, true); v.setUint32(28, fs * 2, true);
        v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, N * 2, true);
        for (let i = 0; i < N; i++) v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, samples[i])) * 32767, true);
        return buf;
    }

    return { parse, plan, render, sample, describe, toWav, VOICES, FIELDS };
});
