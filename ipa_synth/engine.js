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
        'i': [1, 0, 0], 'y': [1, 0, 1], 'ɨ': [1, .5, 0], 'ʉ': [1, .5, 1], 'ɯ': [.9, .95, 0], 'u': [1, 1, 1],   // ɯ: F1 ~310 (as close as i/u it sounded muffled)
       
        'ɪ': [.85, .15, 0], 'ʏ': [.85, .15, 1], 'ʊ': [.85, .85, 1], 'ɩ': [.85, .15, 0], 'ɷ': [.85, .85, 1],
        'e': [.67, 0, 0], 'ø': [.67, 0, 1], 'ɘ': [.67, .5, 0], 'ɵ': [.67, .5, 1], 'ɤ': [.67, 1, 0], 'o': [.67, 1, 1],
        'ə': [.5, .5, 0], 'ɚ': [.5, .5, 0, 1], 'ɛ': [.33, 0, 0], 'œ': [.33, 0, 1], 'ɜ': [.33, .5, 0], 'ɝ': [.33, .5, 0, 1],
        'ɞ': [.33, .5, 1], 'ʌ': [.33, 1, 0], 'ɔ': [.33, 1, 1], 'æ': [.15, 0, 0], 'ɐ': [.2, .5, 0],
        'a': [0, .4, 0], 'ɶ': [0, 0, 1], 'ɑ': [0, 1, 0], 'ɒ': [0, 1, 1], 'ᴀ': [0, .5, 0], 'ᴇ': [.5, 0, 0],
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
    // Capital letters in reconstructions are cover symbols, not IPA; read them as the sound
    // usually assumed (Old Chinese A; Proto-Austronesian C N R S L per Blust; V any vowel; H laryngeal).
    const CAPITALS = { 'A': 'a', 'E': 'e', 'I': 'i', 'O': 'o', 'U': 'u', 'V': 'ə', 'C': 'ts', 'N': 'ʎ', 'R': 'ʀ', 'S': 's', 'L': 'l', 'H': 'h' };
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
        // every form of "a ~ b", "a / b", "a; b" is read, in turn, with a pause between
        s = s.split(/\s*~\s*|\s+\/\s+|\s*;\s*/).filter(Boolean).join(' | ');
        s = s.replace(/^[\[\/]+|[\]\/]+$/g, '').replace(/[()*\[\]\/]/g, '');
        s = s.normalize('NFD');
        // c + cedilla is ç; keep it as one letter
        s = s.replace(/ç/g, 'ç');
        let t = '';
        for (const ch of s) t += FOLD[ch] !== undefined ? FOLD[ch] : CAPITALS[ch] !== undefined ? CAPITALS[ch] : ch;
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
                let k = i, brk = null;
                for (; k < chars.length; k++) {
                    const c = chars[k];
                    if (c in TONE_LETTER) lv.push(TONE_LETTER[c]);
                    else if (c in SUP_DIGIT) lv.push(SUP_DIGIT[c]);
                    else if (/[0-9]/.test(c)) lv.push(+c);
                    else if (c === '̃' || c === '̰') continue; // stray marks inside a run
                    // ˀ between tone letters (Vietnamese ngã ˧ˀ˥): the voice breaks mid-syllable
                    else if (c === 'ˀ' && lv.length && k + 1 < chars.length && chars[k + 1] in TONE_LETTER) { brk = lv.length; continue; }
                    else break;
                }
                i = k - 1;
                const ok = lv.length && lv.length <= 4 && lv.every(v => v >= 1 && v <= 5);
                if (segs.length > sylStart) {
                    syllables.push({ start: sylStart, end: segs.length, tone: ok ? lv.map(v => v + register) : null, toneText: lv.join(''), category: !ok, brk: ok ? brk : null });
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
        syllables.forEach((sy, n) => { for (let k = sy.start; k < sy.end && k < segs.length; k++) { segs[k].syl = n; if (sy.tone) segs[k].sylTone = sy.tone; if (sy.brk != null) segs[k].sylBreak = sy.brk; if (sy.category) segs[k].toneCategory = sy.toneText; } });
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
    const FIELDS_A = ['AV', 'AH', 'AF', 'FF', 'FB', 'glot', 'CR', 'TL', 'RG', 'BR', 'PW', 'A3'];   // PW: share of the noise sent through the parallel F2/F3 resonators   // BR: breathier voice (0..1)   // TL: extra low-pass on the voice (0 none)                       // fast (amplitudes, source)
    const FIELDS_F = ['F1', 'F2', 'F3', 'F4', 'B1', 'B2', 'B3', 'FNZ'];                   // formants
    const FIELDS_R = ['cx', 'cy', 'tx', 'ty', 'curl', 'lip', 'pro', 'll', 'vel', 'jaw', 'lat'];   // articulators (drawing)
    const FIELDS = [...FIELDS_A, ...FIELDS_F, ...FIELDS_R];

    const REST = {
        AV: 0, AH: 0, AF: 0, FF: 4000, FB: 2000, glot: 1, CR: 0, TL: 0, RG: 0, BR: 0, PW: 0, A3: .7,
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
        // close vowels' F1 275 (was 250) and u's F2 ~740 (was 607): measured against Commons
        // recordings (Hanoi u 360/750 male; Peterson & Barney u 300/870), the old u was too dark
        let F1 = 275 + 575 * (1 - h);
        const F2f = 1750 + 600 * h, F2b = 1050 + 300 * h;
        let F2 = F2f + (F2b - F2f) * b;
        let F3 = 2450 + 550 * h * (1 - b);
        if (round) { F2 *= 1 - (0.12 + 0.33 * b) * (0.45 + 0.55 * h); F3 -= 250 * (1 - b) + 50; F1 *= .96; }
        if (seg.rhotic) { F3 = 1650; F2 = Math.min(F2, 1350); }
        P.F1 = F1; P.F2 = F2; P.F3 = F3; P.F4 = Math.max(3400, F3 + 600);
        P.B1 = 55 + 35 * (1 - h); P.B2 = 70 + 30 * b; P.B3 = 130;   // vowels: fairly sharp formants
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
        RE: [250, 1650, 1900], AP: [250, 2200, 2900], PL: [250, 2300, 3000], VE: null, UV: [500, 1150, 2400],
        PH: [700, 1100, 2500], EP: [700, 1050, 2500], GL: null, LV: [230, 800, 2200], LP: [240, 1900, 2400],
    };
    // frication / burst spectrum per place: [centre Hz, bandwidth Hz, relative gain]
    // gains calibrated in node against a vowel (2026-11-10): s ≈ -8 dB, ʃ -7, x -14, f/θ -20, bursts -4..-10
    const NOISE = {
        BL: [1400, 2500, .25], LD: [5500, 4500, .043], DE: [6500, 3500, .027], AL: [5700, 1600, .081], PA: [2800, 1300, .365],
        RE: [2600, 1100, .43], AP: [3300, 1400, .22], PL: [3400, 1400, .114], VE: null, UV: [1300, 650, .79],
        PH: [1100, 900, .46], EP: [1000, 900, .6], GL: [2500, 4000, 0], LV: [1300, 1200, .48], LP: [3000, 2000, .15],
    };
    const BURST = {
        BL: [900, 1600, 2.06], LD: [5000, 4000, .1], DE: [4500, 3000, .3], AL: [4200, 2200, .425], PA: [3000, 1600, .48],
        RE: [2800, 1500, .645], AP: [3500, 1600, .53], PL: [3300, 1500, .56], VE: null, UV: [1250, 650, .8],
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

    // a tone whose lowest point is level 1 and that rises again after it (214, 213, 313), or
    // a Mandarin half-third / fall ending at 1
    function lowDip(s, tone) {
        if (!tone || tone.length < 2) return false;
        const m = Math.min(...tone); if (m > 1.5) return false;
        const k = tone.indexOf(m);
        return (k > 0 && k < tone.length - 1) || (s._zhLow && k === tone.length - 1);
    }
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
        // uvular and pharyngeal constrictions raise F1 (a low F1 there gave v/l-like transitions)
        if (['UV', 'PH', 'EP'].includes(place)) P.F1 = Math.max(P.F1, L[0]);
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
        P.AV = 0; P.AH = 0; P.AF = 0; P.CR = 0; P.TL = 0; P.RG = 0; P.PW = 0;
        return P;
    }

    // ------------------------------------------------------------------ language intonation
    // Only features that hold for the language as a whole are used; a row with no profile gets
    // the generic one. stress: where an unmarked word is stressed (the IPA's own ˈ always wins).
    const STRESS_INITIAL = new Set('fi hu cs sk is lv et se smn sms sma smj sju krl olo vep liv mns kca ga gd hsb dsb'.split(' '));
    const STRESS_PENULT = new Set('pl sw qu quz ay cy br eo szl csb'.split(' '));
    const STRESS_ANTEPENULT = new Set(['mk']);
    const STRESS_FINAL = new Set('tr az uz kk ky tt ba sah tk ug crh hy fa he'.split(' '));
    function langProfile(code) {
        const c = String(code || ''), b = c.split('_')[0];
        if (c === 'ja' || c === 'ja_tokyo') return { type: 'ja' };       // Tokyo: unaccented (heiban) shape
        if (b === 'ja') return { type: 'flat' };                          // other dialects: accent systems differ
        if (c === 'ko' || c === 'ko_seoul') return { type: 'ko', passiveVoicing: true, unreleasedFinal: true };   // Seoul accentual phrase
        if (b === 'ko') return { type: 'flat', passiveVoicing: true, unreleasedFinal: true };
        if (b === 'yue') return { type: 'stress', passiveVoicing: true, unreleasedFinal: true };
        if (['vi', 'th', 'lo', 'km', 'my', 'ms', 'id', 'nan', 'hak'].includes(b)) return { type: 'stress', unreleasedFinal: true };
        if (b === 'fr') return { type: 'fr', uvularR: true };
        if (['de', 'da', 'nl', 'lb'].includes(b)) return { type: 'stress', uvularR: true };   // r as an approximant ʁ (as in French)
        if (b === 'zh' || b === 'cmn') return { type: 'stress', sandhi3: true, passiveVoicing: true, mandarin: true };
        if (STRESS_INITIAL.has(b)) return { type: 'stress', stress: 'initial' };
        if (STRESS_PENULT.has(b)) return { type: 'stress', stress: 'penult' };
        if (STRESS_ANTEPENULT.has(b)) return { type: 'stress', stress: 'antepenult' };
        if (STRESS_FINAL.has(b)) return { type: 'stress', stress: 'final' };
        return { type: 'stress' };
    }

    // ------------------------------------------------------------------ plan
    function plan(ipa, opts = {}) {
        const ds = opts.durScale || 1;
        const parsed = parse(ipa);
        const segs = parsed.segs;
        const phases = [];
        const push = (dur, P, info) => phases.push(Object.assign({ dur: dur * ds, P }, info));
        const prof = langProfile(opts.lang);
        if (prof.mandarin) {
            // Mandarin realizations: x is far back, close to [χ]; "-i" after a sibilant is the
            // apical vowel (ʂɨ = [ʂʅ], sɨ = [sɿ]) whatever the cell's IPA writes
            segs.forEach((x, k) => {
                if (x.type === 'C' && x.base === 'x') x.place = 'UV';
                if (x.type === 'V' && x.base === 'ɨ' && k > 0) {
                    const c = segs[k - 1], pl = c.manner === 'affr' ? c.fricPlace : c.place;
                    if (c.type === 'C' && ['fric', 'affr'].includes(c.manner) && (pl === 'RE' || pl === 'AL')) x.apical = pl;
                }
            });
        }
        if (prof.unreleasedFinal) {
            // syllable-final stops are unreleased in these languages (Vietnamese Đức ɗɨk, Cantonese,
            // Thai, Korean …), whether or not the cell writes ̚
            segs.forEach((x, k) => {
                // syllable-final = after a vowel, and no vowel follows (directly or after a glide);
                // "next is a consonant" also caught onset clusters (twən lost its t)
                const nx = segs[k + 1], pv = segs[k - 1];
                const vowelNext = nx && (nx.type === 'V' || (GLIDES.has(nx.base) && segs[k + 2] && segs[k + 2].type === 'V'));
                if (x.type === 'C' && x.manner === 'stop' && x.place !== 'GL' && pv && pv.type === 'V' && (x.wordEnd || !vowelNext)) x.noRelease = true;
            });
        }
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
        // Likewise a run of vowels where one carries a tone diacritic (θéɪɴ): that vowel is the
        // nucleus and its unmarked neighbours in the run are glides.
        {
            let k = 0;
            while (k < segs.length) {
                if (segs[k].type !== 'V' || segs[k].apical) { k++; continue; }
                let e = k;
                while (e + 1 < segs.length && segs[e + 1].type === 'V' && !segs[e + 1].apical && segs[e + 1].syl === segs[k].syl && !segs[e].wordEnd && !segs[e + 1].stress) e++;
                const run = segs.slice(k, e + 1);
                const toned = run.filter(v => v.toneMark);
                if (run.length > 1 && toned.length === 1) for (const v of run) if (v !== toned[0] && !v.nonsyl) { v.nonsyl = true; v.autoGlide = true; }
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
        if (!markedStress && !tonal && (prof.type === 'stress' || prof.type === 'fr')) {
            const byWord = {};
            segs.forEach(s => { if (isNucleus(s)) (byWord[s.word] = byWord[s.word] || []).push(s); });
            for (const list of Object.values(byWord)) {
                const n = list.length;
                let v;
                if (prof.type === 'fr' || prof.stress === 'final') v = list[n - 1];
                else if (prof.stress === 'initial') v = list[0];
                else if (prof.stress === 'penult') v = list[Math.max(0, n - 2)];
                else if (prof.stress === 'antepenult') v = list[Math.max(0, n - 3)];
                else v = list.find(s => !REDUCED.has(s.base)) || list[0];
                v.prom = 1;
            }
        }
        const anyProm = segs.some(s => s.prom);
        // Where stops contrast aspiration, not voice (Mandarin, Cantonese, Korean lenis), an
        // unaspirated stop or affricate between voiced sounds inside a phrase is voiced
        // (ta˥˩ mu˧˩˧ ʈʂɨ˧˩˧: the ʈʂ is [ɖʐ]).
        if (prof.passiveVoicing) {
            const voicedSeg = x => x && x.voiced !== 0 && (x.type === 'V' || ['nasal', 'approx', 'lat'].includes(x.manner));
            segs.forEach((x, k) => {
                if (x.type !== 'C' || x.voiced || x.asp || x.ejective || !['stop', 'affr'].includes(x.manner) || x.place === 'GL') return;
                const pv = segs[k - 1], nx2 = segs[k + 1];
                if (voicedSeg(pv) && !pv.pause && nx2 && nx2.type === 'V') { x.voiced = 1; x.passiveVoiced = true; }
            });
        }
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
                // palatalized consonants and palatal stops/nasals/laterals release through a clear [j]:
                // the i-like glide is held briefly and the vowel enters slowly
                const palatal = s.pal || (['PL', 'AP'].includes(s.place) && ['nasal', 'stop', 'lat', 'impl'].includes(s.manner));
                if (palatal) { const P = consTarget({ place: 'PL', manner: 'approx', base: 'j', voiced: 1 }, ctxVowel(i)); P.AV = s.voiced || s.manner === 'nasal' ? .85 : .5; P.AH = s.voiced ? 0 : .2; P.glot = 0; push(s.pal ? 50 : 40, P, Object.assign({ kind: 'offglide j', edgeF: 14 }, info)); nx._onglide = true; }
                else if (s.lab) { const P = consTarget({ place: 'LV', manner: 'approx', base: 'w', voiced: 1 }, ctxVowel(i)); P.AV = .8; P.glot = 0; push(45, P, Object.assign({ kind: 'offglide w', edgeF: 14 }, info)); nx._onglide = true; }
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
                if (i === lastNucleus && tone && tone.length >= 3 && lowDip(s, tone)) d = Math.max(d, 400);   // citation 214 is long (recordings ~500 ms)
                // checked syllable (ends in an unreleased stop: ɗɨk˧˥, Cantonese entering tone): short
                {
                    let k = i + 1; while (k < segs.length && segs[k].type === 'V' && segs[k].nonsyl) k++;
                    const coda = segs[k];
                    if (coda && coda.type === 'C' && coda.manner === 'stop' && coda.noRelease && (!segs[k + 1] || coda.wordEnd || segs[k + 1].type === 'C')) { d = Math.min(d, 105); s._checked = true; }
                }
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
                    // after a consonant (ɕi̯ɑʊ̯) it is a medial: pass through it without holding, or its
                    // low F1 hold sounded like a nasal ("snau")
                    const afterC = i > 0 && segs[i - 1].type === 'C' && !segs[i - 1].pause;
                    d = afterC ? 40 : 55; edgeF = afterC ? d * .65 : 18; nx._onglide = true;
                }
                if (s._onglide) edgeF = Math.min(70, d * .4);   // keep most of the vowel steady
                if (s._glideIn) edgeF = Math.max(edgeF, Math.min(s._glideIn, d * .8));
                // voice quality varies along the utterance (Klatt & Klatt 1990): unstressed syllables
                // are softer and breathier, the last syllable breathiest
                let PV = P;
                if (s.voiced !== 0 && (i === lastNucleus || (!tonal && anyProm && !s.prom && isNucleus(s)))) {
                    PV = Object.assign({}, P);
                    if (i === lastNucleus) PV.BR = Math.max(PV.BR, .3);
                    else { PV.BR = Math.max(PV.BR, .2); PV.AV *= .85; }
                }
                const afterFric = phases.length && phases[phases.length - 1].kind === 'fricative';   // the friction fades under the voice
                const afterRelease = phases.length && ['short lag', 'aspiration', 'burst', 'breathy release', 'release'].includes(phases[phases.length - 1].kind);
                if (s._implosiveOnset) push(25, Object.assign({}, P, { CR: .6, AV: 1 }), Object.assign({ kind: 'creaky onset', edgeA: 1, edgeF: 10 }, info));
                if (s.sylBreak != null && isNucleus(s) && tone) {
                    // broken tone (ngã ˧ˀ˥): vowel, creak into a short glottal stop, creaky restart, rise
                    push(d * .42, PV, Object.assign({ kind: 'vowel', edgeF, edgeCap: s._glideIn ? .8 : .5, edgeA: afterRelease ? 16 : undefined }, info));
                    // recordings (Hanoi mũi) show no silent gap: a brief creaky, weakened stretch
                    push(18, Object.assign({}, PV, { CR: 1, AV: .7 }), Object.assign({ kind: 'creak', edgeA: 8 }, info));
                    push(30, Object.assign({}, PV, { AV: .35, CR: 1, glot: -0.3 }), Object.assign({ kind: 'glottal break', edgeA: 6 }, info));
                    push(22, Object.assign({}, PV, { CR: .7, AV: .9 }), Object.assign({ kind: 'creaky onset', edgeA: 4 }, info));
                    push(d * .48, PV, Object.assign({ kind: 'vowel', edgeA: 6 }, info));
                } else push(d, PV, Object.assign({ kind: 'vowel', edgeF, edgeCap: s._glideIn ? .8 : .5, edgeA: afterRelease ? 16 : afterFric ? 22 : undefined }, info));
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
                    // A glottal stop is heard at its edges: creak into it, a hard (instant) voice onset
                    // and a few creaky pulses out of it. After silence only the release is audible.
                    const P = Object.assign({}, V, { AV: 0, AH: 0, AF: 0, glot: -0.5, vel: 0, CR: 0 });
                    const prevV = segs[i - 1] && segs[i - 1].type === 'V';
                    if (prevV) push(30, Object.assign({}, vtarget[i - 1], { AV: .7, CR: 1 }), Object.assign({ kind: 'creak', edgeA: 8 }, info));
                    push((prevV ? 55 : 35) * gem, P, Object.assign({ kind: 'glottal closure', edgeA: 2 }, info));
                    const nv = nextVowelP(i);
                    if (nv && beforeVowel) push(35, Object.assign({}, nv, { AV: 1, CR: 1 }), Object.assign({ kind: 'glottal release', edgeA: .7, edgeF: 2 }, info));
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
                    // Not staccato: after a vowel or sonorant the voice dies away over ~25 ms into the
                    // closure instead of stopping dead, and a closure between vowels is short (~50 ms)
                    const prevVoiced = i > 0 && !segs[i - 1].pause && segs[i - 1].voiced !== 0 && (segs[i - 1].type === 'V' || ['nasal', 'approx', 'lat'].includes(segs[i - 1].manner));
                    const nextV = segs[i + 1] && segs[i + 1].type === 'V';
                    if (m === 'impl') {
                        // Implosive: the larynx drops during the closure, so the voice swells instead of
                        // fading (crescendo), then the release is almost noiseless and the vowel starts
                        // loud with a touch of creak.
                        push(30 * gem, Object.assign({}, closure, { AV: .3, F1: 230, B1: 80 }), Object.assign({ kind: 'closure', edgeA: 8 }, info));
                        push(28 * gem, Object.assign({}, closure, { AV: .95, F1: 240, B1: 80 }), Object.assign({ kind: 'implosion', edgeA: 22 }, info));
                        if (nextV) segs[i + 1]._implosiveOnset = true;
                    } else if (s.noRelease && prevVoiced && !nextV) {
                        // an unreleased final stop is a catch: the voice stops dead and the glottis closes
                        push(70 * gem, Object.assign({}, closure, { AV: 0, glot: -0.5 }), Object.assign({ kind: 'closure', edgeA: 3, edgeF: 12 }, info));
                    } else
                    push((afterPause ? 45 : prevVoiced && nextV ? 50 : 62) * gem, closure, Object.assign({ kind: 'closure', edgeA: prevVoiced ? 26 : 10 }, info));
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
                        // Velar and uvular releases are long and compact: the tongue body peels off the
                        // palate slowly, often in two or three bursts, with energy bunched near F2/F3.
                        // Short weak ones sounded like t.
                        const back = s.place === 'VE' || s.place === 'UV' || s.place === 'LV';
                        if (back && m !== 'click') { R.AF *= 2.2; R.PW = 1; R.RG = 0; R.A3 = s.place === 'UV' ? .2 : .7; }   // noise through the velar pinch itself (no flicker: it whistled)
                        // An unaspirated voiceless stop (tabako) has a brief, light release; the long
                        // strong burst suits aspirated kʰ tʰ and made plain k t sound synthetic.
                        const plain = !s.voiced && !s.asp && !s.ejective && m !== 'click' && m !== 'affr';
                        // Light only between voiced sounds: after silence the burst is the stop's only cue
                        // (tuần twən: a light t vanished and was heard as "uan" / "nuan").
                        const light = plain && prevVoiced;
                        if (light) R.AF *= .55; else if (plain) R.AF *= .9;
                        push(m === 'click' ? 8 : back ? (light ? 14 : plain ? 18 : 22) : (light ? 9 : plain ? 12 : 14), R, Object.assign({ kind: 'burst', edgeA: 2, edgeF: 2 }, info));
                    }
                    if (m === 'affr') {
                        const F = consTarget(Object.assign({}, s, { place: s.fricPlace, base: s.fricBase }), V, s.lateral ? 'latfric' : 'fric');
                        const N = NOISE[s.fricPlace] || velarNoise(V);
                        F.AF = N[2] * (s.voiced ? .75 : 1); F.AV = s.voiced ? .3 : 0; F.glot = s.voiced ? 0 : 1; if (s.voiced) F.TL = .72;   // a voiced affricate stays fricative, not nasal-like
                        if (s.lateral) { F.FF = 4500; F.FB = 2500; F.AF = .12; }
                        if (s.ejective) F.glot = -0.5;
                        push(65 * gem, F, Object.assign({ kind: 'frication' }, info));
                    }
                    const nv = nextVowelP(i) || V;
                    if (s.ejective) {
                        push(40, Object.assign({}, closure, { AV: 0, AF: 0, AH: 0, glot: -0.5, lip: C.lip + .1, ty: C.ty + 6 }), Object.assign({ kind: 'glottal hold' }, info));
                    } else if (s.asp) {
                        const A = Object.assign({}, nv, { AV: 0, AH: .55, AF: 0, glot: 1, F1: nv.F1 * .8, B1: 200 });
                        // before a consonant (Khmer tʰmɑː) only a short puff: a full 58 ms sounded like "th-ma"
                        const nxC = segs[i + 1] && segs[i + 1].type === 'C' && !segs[i + 1].pause;
                        if (nxC) {
                            // the puff is shaped by the consonant it runs into, not by the vowel: with
                            // the vowel's open F1 it was heard as "tha" and the m vanished
                            const c = segs[i + 1], N2 = consTarget(c, nv);
                            if (c.manner === 'nasal') Object.assign(N2, { F1: 260, B1: 110, FNZ: NASAL_ZERO[c.place] || 1600 });
                            push(22, Object.assign(N2, { AV: 0, AH: .3, AF: 0, glot: 1 }), Object.assign({ kind: 'aspiration', edgeF: 5 }, info));
                        } else push(['VE', 'UV'].includes(s.place) ? 70 : 58, A, Object.assign({ kind: 'aspiration', edgeF: 8 }, info));
                    } else if (s.basp) {
                        const A = Object.assign({}, nv, { AV: .5, AH: .4, AF: 0, glot: .5, B1: 180 });
                        push(58, A, Object.assign({ kind: 'breathy release', edgeF: 8 }, info));
                    } else if (!s.voiced && !s.noRelease && m !== 'click') {
                        const A = Object.assign({}, nv, { AV: 0, AH: .07, AF: 0, glot: .6, F1: nv.F1 * .8 });
                        push(['VE', 'UV'].includes(s.place) ? 16 : 10, A, Object.assign({ kind: 'short lag', edgeF: 6 }, info));
                    } else if (m === 'click') {
                        push(18, Object.assign({}, nv, { AV: s.prenasal || s.voiced ? .6 : 0, AH: s.asp ? .5 : .08, AF: 0, glot: s.voiced ? 0 : .7 }), Object.assign({ kind: 'release', edgeF: 6 }, info));
                    }
                } else if (m === 'nasal') {
                    // a palatal nasal closing a syllable (Vietnamese anh aɲ ≈ [ajŋ]): the vowel glides
                    // toward i before the nasal; otherwise it sounds like plain n
                    if ((s.place === 'PL' || s.place === 'AP') && i > 0 && segs[i - 1].type === 'V' && !beforeVowel) {
                        const G = consTarget({ place: 'PL', manner: 'approx', base: 'j', voiced: 1 }, V); G.AV = .95; G.glot = 0;
                        push(55, G, Object.assign({ kind: 'offglide j', edgeF: 40 }, info));
                    }
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
                        // voiced fricatives: real noise over a weaker, damped voice, or they turn into approximants
                        P.AF = (m === 'latfric' ? .7 : N[2]) * (s.voiced ? (s.place === 'VE' || s.place === 'UV' ? .5 : .65) : 1);
                        if (m === 'latfric') { P.FF = 4500; P.FB = 2500; P.AF = .12 * (s.voiced ? .5 : 1); }
                        if (s.base === 'ɧ') { P.FF = 2000; P.FB = 1500; P.AF = .4; P.cx = 205; P.cy = 228; }
                        // In a voiced fricative the voice survives mostly as a low buzz (the narrow channel damps
                        // its upper harmonics): strong low-pass on the voice, so F2/F3 do not ring like an
                        // approximant, and only moderate noise on top.
                        P.AV = s.voiced ? .5 : 0;
                        if (s.voiced) { P.TL = .93; P.B1 = 120; P.B2 = 200; P.B3 = 300; }
                        P.AH = ['BL', 'LD', 'DE', 'PH', 'EP'].includes(s.place) && !s.voiced ? .12 : 0;
                        // Back fricatives (x χ ħ, ɣ ʁ ʕ): a smooth noise band around 1.3 kHz sounded like
                        // a whistle. The turbulence there is rough (the uvula and back of the tongue
                        // flutter), so the band is wider and its loudness flickers irregularly (RG),
                        // with a little breath through the formants.
                        if (['VE', 'UV', 'PH', 'EP'].includes(s.place)) {
                            // Back fricatives: the noise goes through the tract's own F2/F3 (parallel
                            // branch), so it carries the velar/uvular pinch and follows the vowel. A fixed
                            // band was heard as f (before o), sh (before a) or a whistle; ɣ as v or ð.
                            P.PW = 1; P.RG = .3;
                            // velar: F2 and F3 together (the pinch); uvular/pharyngeal: mostly F2, low in the throat
                            P.A3 = s.place === 'VE' ? .7 : .35;
                            // uvular/pharyngeal friction is loud and raspy (Mandarin x is realized here)
                            if (s.place !== 'VE') { P.AF *= 1.5; P.RG = .55; }
                            P.AH = Math.max(P.AH, s.voiced ? .05 : .12);
                            if (s.voiced) { P.TL = .72; P.B1 = 110; P.B2 = 170; P.B3 = 240; }
                        }
                        if (s.ejective) P.glot = -0.5;
                        // French / German r (ʁ): an approximant with little friction. The Commons
                        // chère has F1 rising to ~800, F2 falling to ~1300, weak voice and almost
                        // no noise; the fricative ɣ-like ʁ (strong rough noise) was not heard as
                        // a French r. Next to a voiceless consonant (mɛʁsi) it is partly devoiced.
                        if (s.base === 'ʁ' && prof.uvularR) {
                            const nxv = segs[i + 1], pvv = segs[i - 1];
                            const devoice = (nxv && nxv.type === 'C' && nxv.voiced === 0) || (pvv && pvv.type === 'C' && pvv.voiced === 0);
                            Object.assign(P, { F1: 720, F2: 1300, F3: 2350, B1: 160, B2: 160, B3: 220, AV: devoice ? .45 : .7, TL: devoice ? .55 : .35, AF: devoice ? .22 : .07, RG: .15, PW: 1, A3: .35, AH: devoice ? .1 : .03, BR: .3 });
                        }
                        // natural friction swells in and fades out (rise ~40% of the fricative, overlapping
                        // the voice); an 18 ms switch to a flat level sounded like a box
                        let fd = (s.voiced ? 88 : s.place === 'VE' || s.place === 'UV' ? 115 : 98) * gem * syl;
                        // vowel into a voiceless fricative: the glottis opens a little before the
                        // tongue reaches the constriction, so the vowel ends breathy (a brief [h]
                        // colour) instead of the voice and the hiss simply crossfading
                        const pv = phases[phases.length - 1];
                        if (!s.voiced && !P.PW && pv && pv.kind === 'vowel') {   // (not the back fricatives: x was tuned on its own)
                            push(16, Object.assign({}, pv.P, { AV: .5, AH: .22, BR: .9, AF: P.AF * .25, FF: P.FF, FB: P.FB, PW: P.PW, A3: P.A3 }), Object.assign({ kind: 'breathy offset', edgeA: 8, edgeF: 10 }, info));
                            fd -= 12;
                        }
                        push(fd, P, Object.assign({ kind: 'fricative', edgeA: Math.min(38, fd * .4) }, info));
                    }
                } else if (m === 'approx' || m === 'lat') {
                    const P = consTarget(s, V, m);
                    P.AV = s.voiced ? .78 : 0; P.AH = s.voiced ? 0 : .45; P.glot = s.voiced ? 0 : 1;
                    if (m === 'lat') P.B2 = 220;
                    const glideSV = GLIDES.has(s.base);
                    if (glideSV) P.AV = s.voiced ? .92 : 0;
                    // a glide is a movement: reach the target slowly, leave slowly
                    // the slow exit is the cue: a glide leaves its target over ~95 ms; a fast one sounds like l
                    // after a consonant (Chinese medials: tʰjɛn, xwo) a glide is a quick ~35 ms passage;
                    // alone (ja, aja) it needs ~65 ms and a slow exit, or it sounds like l
                    const medial = glideSV && i > 0 && segs[i - 1].type === 'C' && !segs[i - 1].pause && !segs[i - 1].wordEnd;
                    if (glideSV && beforeVowel) nx._glideIn = medial ? 60 : 95;
                    push((glideSV ? (medial ? 35 : 65) : beforeVowel ? 58 : 72) * gem * syl, P, Object.assign({ kind: m === 'lat' ? 'lateral' : 'approximant', edgeF: glideSV ? 45 : 22, edgeCap: glideSV ? .75 : .5 }, info));
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
            const eA = Math.min((ph.edgeA != null ? ph.edgeA : 10) * ds, ph.dur * (ph.edgeA != null ? .6 : 1 / 3));
            const eF = Math.min((ph.edgeF != null ? ph.edgeF : 24) * ds, ph.dur * (ph.edgeCap || .5));
            const eR = Math.min((ph.edgeR != null ? ph.edgeR : 40) * ds, ph.dur * .7);
            for (const f of FIELDS) {
                const e = FIELDS_A.includes(f) ? eA : FIELDS_F.includes(f) ? eF : eR;
                tracks[f].push([ph.t0 + e, ph.P[f]], [ph.t1, ph.P[f]]);
            }
        }

        // Utterance-final fade: recorded words die away over their last sonorant stretch (10-25 dB),
        // where the synth held full voice and stopped. Not after a final rising tone (Mandarin
        // 214 ends loud in the recordings).
        {
            let k = phases.length - 1; while (k >= 0 && (phases[k].seg < 0 || phases[k].kind === 'rest' || phases[k].kind === 'pause')) k--;
            const last = phases[k], sg = last && segs[last.seg];
            const syl = sg ? segs.find(x => x.syl === sg.syl && isNucleus(x)) : null, tn = syl && (syl.toneMark || syl.sylTone);
            const rising = tn && tn.length > 1 && tn[tn.length - 1] > tn[0];
            if (last && last.P.AV > .3 && !rising) {
                // fade across the last two sonorant phases when the very last is short (a coda)
                let a = last.t0; if (last.dur < 120 && phases[k - 1] && phases[k - 1].P.AV > .3) a = phases[k - 1].t0 + phases[k - 1].dur * .5;
                const from = a + (last.t1 - a) * .35;
                const av = tracks.AV, cut = av.filter(p => p[0] < from);
                const vAt = (() => { const q = av.filter(p => p[0] <= from); return q.length ? q[q.length - 1][1] : last.P.AV; })();
                const rest = av.filter(p => p[0] > last.t1);
                tracks.AV = cut.concat([[from, vAt], [last.t1, vAt * .18]], rest);
                const br = tracks.BR; br.push([last.t1 - 1, Math.max(.45, last.P.BR || 0)]); br.sort((x, y) => x[0] - y[0]);
            }
        }

        // pitch: levels 1..5 (Chao), 3 = the speaker's mid
        const pitch = [], creak = [];
        const segSpan = i => { let a = Infinity, b = -Infinity; for (const ph of phases) if (ph.seg === i) { a = Math.min(a, ph.t0); b = Math.max(b, ph.t1); } return [a, b]; };
        const declin = tt => -(tonal ? .25 : .5) * tt / T;
        if (tonal && prof.sandhi3) {
            // Mandarin third tone: 214 before another 214 becomes 35; before any other syllable a
            // half third (21). The last one keeps its full contour.
            // any dipping contour is the third tone however the row writes it: ˨˩˦ 214, ˧˩˧ 313, ˨˩˧ 213
            const dip = t => t && t.length >= 3 && Math.min(...t) <= 1.5 && t[0] > Math.min(...t) && t[t.length - 1] > Math.min(...t);
            const sylList = [];
            segs.forEach(s => { if (isNucleus(s) && s.syl != null && !sylList.includes(s.syl)) sylList.push(s.syl); });
            const toneOf = sy => { const x = segs.find(s => s.syl === sy && isNucleus(s)); return x && (x.toneMark || x.sylTone); };
            const setTone = (sy, t) => segs.forEach(s => { if (s.syl === sy) { if (s.sylTone) s.sylTone = t; if (s.toneMark) s.toneMark = t; } });
            for (let k = 0; k + 1 < sylList.length; k++) {
                const t = toneOf(sylList[k]);
                if (!dip(t)) continue;
                setTone(sylList[k], dip(toneOf(sylList[k + 1])) ? [3, 5] : [2, 1]);
            }
        }
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
                // reach the tone's start by the syllable's voiced onset, so the move from the
                // previous tone happens at the boundary rather than inside the rhyme
                let on = i; while (on > 0 && segs[on - 1].syl === s.syl && segs[on - 1].voiced !== 0) on--;
                if (on < i) pitch.push([segSpan(on)[0] + 15, tone[0]]);
                const bk = s.sylBreak;
                if (bk != null && bk > 0 && bk < tone.length) {
                    const ph = phases.filter(q => q.seg === i), br = ph.find(q => q.kind === 'glottal break');
                    const pre = tone.slice(0, bk), post = tone.slice(bk);
                    pre.forEach((lv, n) => pitch.push([a + (br.t0 - a) * (.1 + .7 * n / Math.max(1, pre.length - 1)), lv]));
                    pitch.push([br.t0 - 10, pre[pre.length - 1] - .4]);
                    pitch.push([br.t1 + 5, post.length === 1 && post[0] > pre[pre.length - 1] ? pre[pre.length - 1] : post[0] - .5]);   // a single level after the catch is reached by a rise
                    post.forEach((lv, n) => pitch.push([br.t1 + 30 + (b - br.t1 - 30) * (post.length > 1 ? n / (post.length - 1) : 1) * .9, lv + .2]));
                }
                else if (tone.length === 1) { pitch.push([a + span * .1, tone[0]], [a + span * .9, tone[0]]); }
                else if (tone.length === 2 && tone[1] > tone[0]) {
                    // a rise is a slight dip, then a steep climb in the second half (Xu 1997)
                    pitch.push([a + span * .08, tone[0]], [a + span * .38, tone[0] - .35], [a + span * .92, tone[1] + .2]);
                }
                else tone.forEach((lv, n) => pitch.push([a + span * (.1 + .8 * n / (tone.length - 1)), lv]));
                // a low dipping tone (after sandhi) goes creaky and weak at its bottom: Commons
                // recordings of Mandarin 214 drop ~10 dB into creak there (Kuang 2017)
                s._zhLow = !!prof.sandhi3;
                if (lowDip(s, tone)) {
                    const lo = tone.indexOf(Math.min(...tone)), fr = .1 + .8 * lo / (tone.length - 1);
                    creak.push([a + span * Math.max(.05, fr - .2), a + span * Math.min(.97, fr + .18)]);
                }
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
            const nucByWord = {};
            segs.forEach((s, i) => { if (isNucleus(s)) (nucByWord[s.word] = nucByWord[s.word] || []).push(i); });
            const words = Object.keys(nucByWord).map(Number).sort((x, y) => x - y);
            const lastWord = words[words.length - 1];
            if (prof.type === 'ja') {
                // Tokyo unaccented shape: the first mora low, high from the second, a slight
                // fall at the end (no accent-nucleus data in the IPA, so no accented words)
                for (const w of words) {
                    const L = nucByWord[w];
                    L.forEach((i, n) => {
                        const [a, b] = segSpan(i);
                        const twoMora = segs[i].long || (segs[i + 1] && segs[i + 1].type === 'C' && segs[i + 1].manner === 'nasal' && !(segs[i + 2] && segs[i + 2].type === 'V'));
                        if (n === 0) { pitch.push([a + (b - a) * .15, 2.6]); pitch.push([twoMora || L.length === 1 ? b : a + (b - a) * .9, L.length === 1 && !twoMora ? 3.1 : 3.7]); }
                        else pitch.push([(a + b) / 2, 3.9 - .1 * n]);
                        if (i === lastNucleus) pitch.push([b, 3.2]);
                    });
                }
            } else if (prof.type === 'ko') {
                // Seoul accentual phrase: starts low, or high after an aspirated/tense consonant,
                // s or h; high on the second syllable; the utterance falls at its end
                for (const w of words) {
                    const L = nucByWord[w];
                    let k = L[0]; while (k > 0 && segs[k - 1].type === 'C' && segs[k - 1].word === w) k--;
                    const c0 = segs[k].type === 'C' ? segs[k] : null;
                    const high = c0 && (c0.asp || c0.base === 's' || c0.base === 'h' || /\u0348/.test(c0.sym) || c0.tense);
                    L.forEach((i, n) => {
                        const [a, b] = segSpan(i);
                        const lv = n === 0 ? (high ? 4.0 : 2.7) : n === 1 ? 4.1 : 3.5 - .15 * n;
                        pitch.push([(a + b) / 2, lv]);
                        if (n === L.length - 1) pitch.push([b, w === lastWord ? 2.2 : 3.9]);
                    });
                }
            } else if (prof.type === 'fr') {
                // French: the last syllable of each word carries the accent, rising inside the
                // phrase (continuation) and falling at the end of the utterance
                for (const w of words) {
                    const L = nucByWord[w];
                    L.forEach((i, n) => {
                        const [a, b] = segSpan(i);
                        if (n < L.length - 1) pitch.push([(a + b) / 2, 3.0]);
                        else if (w !== lastWord) pitch.push([a + (b - a) * .2, 3.2], [b, 4.3]);
                        else pitch.push([a + (b - a) * .2, 3.7], [b, 1.8]);
                    });
                }
            } else if (prof.type === 'flat') {
                segs.forEach((s, i) => { if (isNucleus(s)) { const [a, b] = segSpan(i); pitch.push([(a + b) / 2, 3.3]); if (i === lastNucleus) pitch.push([b, 2.5]); } });
            } else {
                // stress languages: a peak early in each prominent vowel, unstressed syllables lower,
                // a fall at the end
                let afterPeak = false;
                segs.forEach((s, i) => {
                    if (!isNucleus(s)) return;
                    const [a, b] = segSpan(i);
                    if (s.prom === 1) { pitch.push([a + (b - a) * .1, 3.6], [a + (b - a) * .45, 5.0]); afterPeak = true; }
                    else if (s.prom === 2) { pitch.push([a + (b - a) * .4, 3.7]); afterPeak = true; }
                    else pitch.push([(a + b) / 2, afterPeak ? 2.8 : 3.1]);
                    if (i === lastNucleus) pitch.push([b, 1.5]);
                });
            }
        }
        pitch.sort((x, y) => x[0] - y[0]);
        for (const p of pitch) p[1] += declin(p[0]);
        if (!pitch.length) pitch.push([0, 3], [T, 2.6]);
        // microprosody: close vowels a little higher than open ones (intrinsic F0); a vowel starts
        // higher after a voiceless obstruent and slightly lower after a voiced one, settling in ~45 ms
        const micro = [];
        phases.forEach((ph, k) => {
            if (ph.kind !== 'vowel' || ph.seg < 0) return;
            const v = segs[ph.seg];
            const intr = (v.apical ? 0 : (v.h - .5) * .5) * (tonal ? .5 : 1);
            let on = 0;
            const pc = phases[k - 1] && phases[k - 1].seg >= 0 ? segs[phases[k - 1].seg] : null;
            if (pc && pc.type === 'C' && pc.place !== 'GL' && ['stop', 'affr', 'fric', 'latfric'].includes(pc.manner)) on = pc.voiced ? -.2 : .4;
            on *= tonal ? .5 : 1;
            micro.push([ph.t0, intr + on], [ph.t0 + Math.min(45, ph.dur * .4), intr], [ph.t1, intr]);
        });
        micro.sort((x, y) => x[0] - y[0]);

        return { ipa, parsed, segs, phases, tracks, pitch, micro, creak, T, tonal };
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
    // second-order high-pass (RBJ biquad, Q 0.7)
    class HighPass {
        constructor() { this.x1 = this.x2 = this.y1 = this.y2 = 0; this.b0 = 1; this.b1 = this.b2 = this.a1 = this.a2 = 0; }
        set(F, fs) {
            const w = 2 * Math.PI * F / fs, al = Math.sin(w) / 1.4, cw = Math.cos(w), a0 = 1 + al;
            this.b0 = (1 + cw) / 2 / a0; this.b1 = -(1 + cw) / a0; this.b2 = this.b0; this.a1 = -2 * cw / a0; this.a2 = (1 - al) / a0;
        }
        tick(x) { const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2; this.x2 = this.x1; this.x1 = x; this.y2 = this.y1; this.y1 = y; return y; }
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

    // rd: Fant's (1995) glottal shape parameter (tense ~0.6 .. breathy ~2.5); asp: breath noise
    // mixed into the voice (Klatt & Klatt 1990: the main cue that keeps a voice from sounding
    // mechanical, strongest in female voices); fl: KLSYN88 flutter (slow F0 wobble).
    const VOICES = {
        male: { f0: 112, vt: 1.0, rd: 1.0, asp: .05, tilt: .2, fl: 25 },
        female: { f0: 205, vt: 1.16, rd: 1.3, asp: .12, tilt: .15, fl: 25 },
        child: { f0: 270, vt: 1.3, rd: 1.3, asp: .1, tilt: .15, fl: 25 },
    };

    // LF-model timing from Rd (Fant 1995 regressions): Ra, Rk, Rg, then Tp, Te, Ta as fractions of T0
    function rdTiming(rd) {
        rd = Math.max(.4, Math.min(2.7, rd));
        const ra = (-1 + 4.8 * rd) / 100, rk = (22.4 + 11.8 * rd) / 100;
        const rg = rk / (4 * Math.max(.02, .11 * rd / (.5 + 1.2 * rk) - ra));
        const tp = 1 / (2 * rg), te = Math.min(.95, tp * (1 + rk)), ta = Math.max(.01, ra);
        // LF open phase: g(t) = e^{a(t-te)} sin(pi t/tp) / |sin(pi te/tp)|, so g(te) = -1. Choose a so
        // the flow returns to zero: the open-phase area equals the return phase's (~ta).
        const w = Math.PI / tp, sw = Math.abs(Math.sin(w * te)) || 1e-3;
        const area = a => (Math.exp(a * te) * (a * Math.sin(w * te) - w * Math.cos(w * te)) + w) / (a * a + w * w) * Math.exp(-a * te) / sw;
        let lo = -10, hi = 60;
        for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (area(m) > ta) lo = m; else hi = m; }
        return { tp, te, ta, a: (lo + hi) / 2, w, sw };
    }

    const PAR_A2 = .24, PAR_A3 = .18;
    const SIB_B2 = -.1, SIB_G = 1.05;   // sibilant second peak, level match (calibrated against the single-peak band)   // parallel F2/F3 noise gains (calibrated: x ~ -11 dB, k burst ~ -8 dB re vowel)
    function render(pl, opts = {}) {
        const fs = opts.fs || 22050;
        const voice = VOICES[opts.voice] || VOICES.male;
        const N = Math.ceil(pl.T / 1000 * fs);
        const out = new Float32Array(N);
        const rnd = mulberry(12345);
        const noise = () => rnd() * 2 - 1;
        const R = [new Resonator(), new Resonator(), new Resonator(), new Resonator(), new Resonator()];
        const NP = new Resonator(), NZ = new AntiResonator(), FR = new Resonator(), FR2 = new Resonator(), FHP = new HighPass(), PF2 = new Resonator(), PF3 = new Resonator();
        const hints = {}; for (const f of FIELDS) hints[f] = { i: 0 }; const ph = { i: 0 };
        let phase = 0, T0 = fs / voice.f0, tilt = 0, prevNoise = 0, rough = 0, prevV = 0, hp = { x1: 0, y1: 0 }, prevAsp = 0, turb = 0, ffw = 0, sib = false;
        const FRAME = 32;
        let P = {}, f0 = voice.f0, f0s = 0, gF = 1, cr = 0, av = 0, ah = 0, af = 0, br = 0, tm = rdTiming(voice.rd), micro = 0;
        const kF0 = 1 - Math.exp(-FRAME / fs / .018), kAV = 1 - Math.exp(-1 / fs / .004), kAF = 1 - Math.exp(-1 / fs / .0025);
        const mh = { i: 0 };
        for (let n = 0; n < N; n++) {
            if (n % FRAME === 0) {
                const t = n / fs * 1000;
                for (const f of FIELDS_A.concat(FIELDS_F)) P[f] = valueAt(pl.tracks[f], t, hints[f]);
                const lv = valueAt(pl.pitch, t, ph) + (pl.micro ? valueAt(pl.micro, t, mh) : 0);
                cr = P.CR;
                // creaky stretches of low tones (plan.creak), ramped over 30 ms at each edge
                if (pl.creak) for (const [c0, c1] of pl.creak) if (t > c0 - 30 && t < c1 + 30) {
                    const k = Math.min(1, (t - c0 + 30) / 30, (c1 + 30 - t) / 30);
                    cr = Math.max(cr, .8 * k); P.AV *= 1 - .7 * k;
                }
                // flutter (KLSYN88): (FL/50)(F0/100)(sin 12.7 Hz + sin 7.1 Hz + sin 4.7 Hz), in Hz
                const base = voice.f0 * Math.pow(2, (lv - 3) / 5) * (1 - .3 * cr);
                const ts = t / 1000;
                const target = base + (voice.fl / 50) * (base / 100) * (Math.sin(2 * Math.PI * 12.7 * ts) + Math.sin(2 * Math.PI * 7.1 * ts) + Math.sin(2 * Math.PI * 4.7 * ts));
                f0s = f0s ? f0s + (target - f0s) * kF0 : target; f0 = f0s;
                const vt = voice.vt;
                R[0].set(P.F1 * vt, P.B1, fs); R[1].set(P.F2 * vt, P.B2, fs); R[2].set(P.F3 * vt, P.B3, fs);
                R[3].set(P.F4 * vt, 250, fs); R[4].set(Math.min(4500 * vt, fs * .45), 300, fs);
                NP.set(270, 100, fs); NZ.set(P.FNZ * (P.FNZ === 270 ? 1 : vt), 100, fs);
                // the friction's spectral peak wanders a little (turbulence is never stationary)
                ffw += (noise() - ffw) * .15;
                const ffc = Math.min(P.FF * Math.sqrt(vt) * (1 + .035 * ffw), fs * .46);
                FR.set(ffc, P.FB, fs);
                // sibilants and palatals: a second, broader peak above the main one (opposite
                // polarity, as in Klatt's parallel branch) and a steep low side, so the hiss is a
                // wide band with little energy under ~half its peak, not one tonal peak
                sib = P.FF >= 2500 && P.FB <= 2000;
                if (sib) { FR2.set(Math.min(ffc * 1.2, fs * .37), P.FB * 1.6, fs); FHP.set(ffc * .55, fs); }
                PF2.set(P.F2 * vt, Math.max(P.B2, 380), fs); PF3.set(Math.min(P.F3 * vt, fs * .45), Math.max(P.B3, 480), fs);   // noise formants are broad: narrow ones sounded like a soft whistle / f
            }
            // glottal source: LF-like flow derivative shaped by Rd, with jitter and shimmer
            phase += 1;
            if (phase >= T0) {
                phase -= T0;
                const jit = .005 + .25 * cr;
                T0 = fs / f0 * (1 + jit * (rnd() * 2 - 1));
                gF = (1 + .035 * (rnd() * 2 - 1)) * (1 - .4 * cr * rnd());     // shimmer ~0.3 dB
                const rd = voice.rd + (P.glot > .3 ? 1 : 0) + br * 1.1 - .5 * cr;
                tm = rdTiming(rd);
            }
            const Te = tm.te * T0, Ta = tm.ta * T0;
            let g;
            const u = phase / T0;
            if (phase < Te) g = Math.exp(tm.a * (u - tm.te)) * Math.sin(tm.w * u) / tm.sw;          // LF open phase, -1 at Te
            else g = -Math.exp(-(phase - Te) / Ta);                                                  // return phase
            const tl = Math.max(voice.tilt + (P.glot > .3 ? .3 : 0) + .25 * br, P.TL);
            tilt = tilt * tl + g * (1 - tl);
            av += (P.AV - av) * kAV; ah += (P.AH - ah) * kAV; af += (P.AF - af) * kAF; br += (P.BR - br) * kAV;
            // loudness declines a little over the utterance
            // High-shelf on the voice: the soft LF return phase cuts the spectrum above ~500 Hz, which
            // left F2/F3 of close vowels and glides 35 dB under F1 (natural ~20): i, j and i̯ sounded
            // muffled, like n ("sne", "snau"). y = (x - .8 x[-1]) / .2: flat at low frequencies,
            // about +4 dB at 1 kHz and +10 dB at 2.5 kHz.
            const vraw = tilt * av * gF * (1 - .18 * n / N);
            const voicing = (vraw - .8 * prevV) / .2; prevV = vraw;
            // breath noise: pulsed with the glottal cycle (louder while open) and high-passed, so
            // it replaces upper harmonics rather than adding a hiss underneath (Klatt & Klatt 1990)
            turb += (noise() - turb) * .004;   // turbulence (see the friction below)
            const tb = 1 + 4.5 * turb;
            const nz = noise(), nzh = nz - .7 * prevAsp; prevAsp = nz;
            const breath = (voice.asp + .22 * br) * av * (phase < Te ? 1 : .35);
            const asp = nz * ah * .63 * tb + nzh * breath * .5;
            let x = voicing + asp;
            x = NZ.tick(NP.tick(x));
            for (let k = 4; k >= 0; k--) x = R[k].tick(x);
            // frication: parallel noise branch, differentiated (radiation)
            const fn = noise();
            // roughness: the frication's loudness flickers with a slow random signal (~40-150 Hz)
            rough += (noise() - rough) * .02;
            // turbulence: slow random loudness fluctuation (~15 Hz, about ±12%) on friction and
            // aspiration, and in voiced fricatives the noise pulses with the glottal cycle (louder
            // while the folds are open; Klatt 1980, Pincas & Jackson 2004). Flat, steady noise is a
            // hallmark of synthetic speech.
            const kv = Math.min(.7, av * 1.2), oq = tm.te;
            const pulse = 1 + kv * (phase < Te ? (1 - oq) : -oq) * 1.3;
            const afr = (P.RG ? af * Math.max(0, 1 + P.RG * rough * 4) : af) * tb * pulse;
            // Parallel formant branch (Klatt 1980): back consonants' noise excites the tract's own
            // F2 and F3 (the velar/uvular pinch), so the noise moves with the formant transitions
            // instead of sitting in a fixed band (heard as f, v or sh).
            const pw = P.PW;
            const xin = (fn - prevNoise) * afr * (1 - pw);
            let band = FR.tick(xin) * 1.06;
            const b2 = FR2.tick(xin), bh = FHP.tick(band - SIB_B2 * b2);
            if (sib) band = bh * SIB_G;
            const par = pw ? (PF2.tick(fn * afr * pw) * PAR_A2 + PF3.tick(fn * afr * pw) * PAR_A3 * P.A3 / .7) : 0;
            const fr = (band + par) * 1.4 * (pw ? .7 : .56);   // +3 dB after the voice high-shelf, then -5 dB (front) / -3 dB (back): recordings put s and ʃ 15-24 dB under the vowel peak
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
