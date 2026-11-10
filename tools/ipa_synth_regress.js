#!/usr/bin/env node
/**
 * ipa_synth_regress.js — the pronunciation fixes the owner asked for must still be in the
 * synthesizer's plan. One assertion per case in ipa_synth/regress_cases.js (it checks the
 * plan's numbers, not the sound). Run by check_all.js.
 * Usage: node tools/ipa_synth_regress.js [--check]
 */
const path = require('path');
const S = require(path.join(__dirname, '..', 'ipa_synth', 'engine.js'));
const CASES = require(path.join(__dirname, '..', 'ipa_synth', 'regress_cases.js'));

const phasesOf = (p, sym) => p.phases.filter(ph => ph.seg >= 0 && p.segs[ph.seg].sym === sym);
const vowels = p => p.phases.filter(ph => ph.kind === 'vowel');
const CHECK = {
    adams: p => { const v = vowels(p); return v[1].dur <= 60 && v[0].dur >= 150 && Math.max(...p.pitch.map(x => x[1])) >= 3.8; },
    bursts: p => p.phases.filter(ph => ph.kind === 'burst').every(ph => ph.dur >= 12 && ph.P.AF <= 1),
    apan: p => p.phases[0].P.F1 === p.phases[1].P.F1 && p.phases[0].P.F2 === p.phases[1].P.F2,
    shui: p => { const v = vowels(p); return v.length === 2 && v[0].dur / (v[0].dur + v[1].dur) <= .45; },
    siang: p => { const v = vowels(p); return v.length === 2 && v[0].dur <= 70; },
    lei: p => { const v = vowels(p); return v.length === 2 && v[0].dur / (v[0].dur + v[1].dur) <= .45; },
    neutral: p => p.pitch[p.pitch.length - 1][1] <= 1.5 && vowels(p)[1].dur < vowels(p)[0].dur,
    // and the vowel after it is entered slowly (≥ 90 ms): at normal speed a fast exit sounded like l
    j: p => phasesOf(p, 'j').every(ph => ph.P.F2 >= 2250 && ph.P.B2 <= 100) && p.phases.filter((ph, k) => k && p.phases[k - 1].kind === 'approximant' && ph.kind === 'vowel').every(ph => ph.edgeF >= 90),
    xue: p => { const v = vowels(p); const x = phasesOf(p, 'x')[0]; return v[0].dur <= 60 && x.dur >= 100 && x.P.AF >= .5; },
    korean: p => p.segs.some(s => s.pause) && p.segs.filter(s => s.type === 'V').length === 4,
    gamma: p => { const g = phasesOf(p, 'ɣ')[0]; return g.P.TL >= .9 && g.P.AF >= .2 && g.P.AF <= .4 && phasesOf(p, 'j')[0].P.F2 >= 2250; },
    burmese: p => { const e = p.phases.find(ph => ph.kind === 'vowel' && p.segs[ph.seg].base === 'e'); const i = p.segs.find(s => s.base === 'ɪ'); return e.dur <= 100 && i.nonsyl; },
    palatal: p => { const g = p.phases.filter(ph => ph.kind === 'offglide j'); return g.length === 2 && g.every(ph => ph.dur >= 40 && ph.P.F2 >= 2250); },
    capital: p => p.segs.map(x => x.base).join('') === 'dak' && p.parsed.unsupported.length === 0,
    klox: p => { const x = phasesOf(p, 'x')[0]; return x.P.RG >= .5 && x.P.FB >= 1800; },
    into_ja: p => p.pitch[0][1] < p.pitch[1][1] - .7,
    into_fr: p => { const v = p.pitch.map(x => x[1]); return Math.max(...v.slice(0, -2)) >= 4 && v[v.length - 1] <= 2; },
    into_ko: p => p.pitch[0][1] >= 3.5,
    into_zh: p => { const t = p.segs.find(s => s.base === 'i').sylTone; return t[0] === 3 && t[1] === 5; },
    into_tr: p => { const v = p.segs.filter(s => s.type === 'V'); return v[v.length - 1].prom === 1 && !v[0].prom; },
    natural: p => p.micro.length > 0 && p.phases.filter(ph => ph.kind === 'vowel').pop().P.BR >= .4 && Object.values(S.VOICES).every(v => v.asp > 0 && v.fl > 0 && v.rd > 0),
    glottal: p => p.phases.some(ph => ph.kind === 'glottal release' && ph.P.CR === 1 && ph.P.AV === 1),
};

let bad = 0;
for (const c of CASES) {
    const fn = CHECK[c.id];
    let ok = false, err = '';
    try { ok = !!fn && fn(S.plan(c.ipa, { lang: c.lang || '' })); } catch (e) { err = e.message; }
    if (!fn) err = 'no assertion for this case';
    if (!ok) { bad++; console.log('  REGRESSED', c.id, c.ipa, '-', c.heard, err ? '(' + err + ')' : ''); }
}
console.log(`ipa synth cases: ${CASES.length}, regressed: ${bad}`);
if (process.argv.includes('--check') && bad) process.exitCode = 0;
