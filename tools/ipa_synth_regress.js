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
    // ɣ: voice damped but its formant pinch kept (TL .6-.85; .93 was heard as ð, none as l), compact noise
    gamma: p => { const g = phasesOf(p, 'ɣ')[0]; return g.P.TL >= .6 && g.P.TL <= .85 && g.P.FB <= 1200 && g.P.AF >= .2 && g.P.AF <= .4 && phasesOf(p, 'j')[0].P.F2 >= 2250; },
    burmese: p => { const e = p.phases.find(ph => ph.kind === 'vowel' && p.segs[ph.seg].base === 'e'); const i = p.segs.find(s => s.base === 'ɪ'); return e.dur <= 100 && i.nonsyl; },
    palatal: p => { const g = p.phases.filter(ph => ph.kind === 'offglide j'); return g.length === 2 && g.every(ph => ph.dur >= 40 && ph.P.F2 >= 2250); },
    capital: p => p.segs.map(x => x.base).join('') === 'dak' && p.parsed.unsupported.length === 0,
    // back fricatives: noise through the tract's F2/F3 (parallel branch), not a fixed band (whistle, f, sh)
    klox: p => { const x = phasesOf(p, 'x')[0]; return x.P.PW === 1; },
    into_ja: p => p.pitch[0][1] < p.pitch[1][1] - .7,
    into_fr: p => { const v = p.pitch.map(x => x[1]); return Math.max(...v.slice(0, -2)) >= 4 && v[v.length - 1] <= 2; },
    into_ko: p => p.pitch[0][1] >= 3.5,
    into_zh: p => { const t = p.segs.find(s => s.base === 'i').sylTone; return t[0] === 3 && t[1] === 5; },
    into_tr: p => { const v = p.segs.filter(s => s.type === 'V'); return v[v.length - 1].prom === 1 && !v[0].prom; },
    // 2026-11-11 intonation profiles: stress by syllable weight (Arabic), mora (Hawaiian), Malay
    // penult unless ə; Spanish prenuclear peak on the post-tonic syllable and a low nuclear accent;
    // Hindi word rising to its end; more fixed-stress languages (Tajik final, Tamil initial)
    into_more: () => {
        const prom = (ipa, lang) => S.plan(ipa, { lang }).segs.filter(s => s.type === 'V').map(s => s.prom ? 1 : 0).join('');
        if (prom('madrasa', 'ar') !== '100' || prom('muʕallim', 'ar') !== '010' || prom('kitaːb', 'ar') !== '01') return false;
        if (prom('aloha', 'haw') !== '010' || prom('bəsar', 'id') !== '01' || prom('rumah', 'id') !== '10') return false;
        if (prom('kitap', 'tg') !== '01' || prom('kamala', 'ta') !== '100') return false;
        const es = S.plan('ˈkasa ˈblanka', { lang: 'es' }), v = es.segs.map((s, i) => [s, i]).filter(([s]) => s.type === 'V');
        const at = t => { const P = es.pitch; let k = 0; while (k + 1 < P.length && P[k + 1][0] <= t) k++; return P[k][1]; };
        const mid = i => { const ph = es.phases.filter(q => q.seg === i); return (ph[0].t0 + ph[ph.length - 1].t1) / 2; };
        if (!(at(mid(v[1][1])) > at(mid(v[0][1])) + 1)) return false;   // peak after the stressed ka
        if (!(at(mid(v[2][1])) < at(mid(v[1][1])) - 1)) return false;   // nuclear bla low
        const hi = S.plan('meraː naːm', { lang: 'hi' }), p0 = hi.pitch.map(x => x[1]);
        return p0[1] > p0[0] + .8 && p0[p0.length - 1] < 2;
    },
    natural: p => p.micro.length > 0 && p.phases.filter(ph => ph.kind === 'vowel').pop().P.BR >= .25 && Object.values(S.VOICES).every(v => v.asp > 0 && v.fl > 0 && v.rd > 0),
    // k: burst through the velar pinch, longer than t's (plain k 14 ms vs t 9; aspirated kʰ 22)
    velar: p => { const b = p.phases.filter(ph => ph.kind === 'burst'); return b[0].P.PW === 1 && !b[0].P.RG && b[0].dur > b[1].dur && S.plan('kʰa').phases.find(q => q.kind === 'burst').dur >= 20; },
    clear_u: p => { const v = p.phases.filter(ph => ph.kind === 'vowel'); return v.every(ph => (ph.edgeF || 0) <= ph.dur * .45 + 1) && v[v.length - 1].P.BR <= .35; },
    staccato: p => { const c = p.phases.filter(ph => ph.kind === 'closure'); return c[1].edgeA >= 20 && c[1].dur <= 55 && p.phases.filter(ph => ph.kind === 'vowel').every(ph => ph.edgeA == null || ph.edgeA >= 14); },
    xwo: p => { const x = phasesOf(p, 'x')[0]; return x.P.PW === 1 && x.P.F2 <= 1400; },
    voicing_zh: p => { const z = p.segs.find(s => s.base === 'ʈ'); const fr = p.phases.find(ph => ph.kind === 'frication'); return z.voiced === 1 && z.passiveVoiced && !p.segs.find(s => s.base === 't').voiced && fr.P.TL >= .6 && p.segs[p.segs.length - 1].apical === 'RE'; },
    gamma_par: p => phasesOf(p, 'ɣ')[0].P.PW === 1,
    rise: p => { const ɑ = p.phases.find(ph => ph.kind === 'vowel' && p.segs[ph.seg].base === 'ɑ'); const pts = p.pitch.filter(x => x[0] >= ɑ.t0 && x[0] <= ɑ.t1 + 80); return pts.length >= 3 && pts[1][1] < pts[0][1] && pts[pts.length - 1][1] - pts[1][1] >= 2; },
    medial: p => phasesOf(p, 'j')[0].dur <= 40 && S.plan('ja').phases.find(ph => ph.kind === 'approximant').dur >= 60,
    // rendered: F2/F3 of a close vowel within ~30 dB of F1 (it was 35-43 dB under: muffled, n-like)
    snau: p => {
        const o = S.render(S.plan('ˈpiːta'), { voice: 'male' }), ph = S.plan('ˈpiːta').phases.find(q => q.kind === 'vowel'), c = ph.t0 + ph.dur / 2;
        const x = Array.from(o.samples.slice(Math.round((c - 25) / 1000 * o.fs), Math.round((c + 25) / 1000 * o.fs)));
        const band = (lo, hi) => { let e = 0; for (let f = lo; f <= hi; f += 25) { let re = 0, im = 0; for (let n = 0; n < x.length; n++) { const w = .5 - .5 * Math.cos(2 * Math.PI * n / x.length); re += x[n] * w * Math.cos(2 * Math.PI * f * n / o.fs); im -= x[n] * w * Math.sin(2 * Math.PI * f * n / o.fs); } e += re * re + im * im; } return 10 * Math.log10(e + 1e-12); };
        return band(1900, 3300) - band(150, 900) >= -30 && p.phases.find(q => q.kind === 'vowel').dur <= 45;
    },
    tabako: p => { const b = p.phases.filter(ph => ph.kind === 'burst'); const sl = p.phases.filter(ph => ph.kind === 'short lag'); return b.slice(1).every(ph => ph.dur <= 14) && sl.every(ph => ph.P.AH <= .1 && ph.dur <= 16); },
    // word-initial plain t keeps an audible burst (it vanished: tuần heard as uan)
    tuan: p => { const b = p.phases.find(ph => ph.kind === 'burst'); return b.dur >= 12 && b.P.AF >= .14; },
    implosive: p => { const k = p.phases.findIndex(ph => ph.kind === 'implosion'); return k > 0 && p.phases[k].P.AV > p.phases[k - 1].P.AV + .4 && p.phases.some(ph => ph.kind === 'creaky onset') && p.segs[p.segs.length - 1].noRelease === true && p.phases.filter(ph => ph.kind === 'vowel').every(ph => ph.dur <= 110) && p.phases[p.phases.length - 2].edgeA <= 4; },
    anh: p => p.phases.some(ph => ph.kind === 'offglide j' && p.segs[ph.seg].base === 'ɲ'),
    sandhi313: p => { const t = p.segs.find(s => s.base === 'i').sylTone; const t2 = p.segs.find(s => s.base === 'a').sylTone; return t[0] === 3 && t[1] === 5 && t2.length === 3; },
    xau: p => { const x = phasesOf(p, 'x')[0]; return x.P.F1 >= 450 && x.P.RG >= .5 && x.P.PW === 1; },
    glottal: p => p.phases.some(ph => ph.kind === 'glottal release' && ph.P.CR === 1 && ph.P.AV === 1),
    nga: p => { const k = p.phases.findIndex(ph => ph.kind === 'glottal break'); if (k < 0) return false; const br = p.phases[k], before = p.pitch.filter(x => x[0] < br.t0).pop(), last = p.pitch.filter(x => x[0] > br.t1).pop(); return br.P.AV <= .4 && br.P.CR > 0 && p.phases[k + 1].P.CR > 0 && last[1] - before[1] >= 2; },   // 2026-11-11: a creaky dip, not silence (Hanoi recording)
    // and shaped as the m (lips shut, velum down), not as the vowel: that was heard as "tha"
    'tʰm': p => { const a = p.phases.find(ph => ph.kind === 'aspiration'); return a.dur <= 25 && a.P.vel === 1 && a.P.F1 <= 300 && S.plan('tʰa').phases.find(ph => ph.kind === 'aspiration').dur >= 50; },
    noise_nat: p => { const f = p.phases.filter(ph => ph.kind === 'fricative'); return f.length >= 2 && f.every(ph => ph.edgeA >= 30) && f.every(ph => { const nx = p.phases[p.phases.indexOf(ph) + 1]; return nx.kind !== 'vowel' || nx.edgeA >= 20; }); },
    // rendered: s is a wide band with a steep low side (2 kHz >= 25 dB under the 5-10 kHz peak)
    noise_shape: p => {
        if (!p.phases.some(ph => ph.kind === 'breathy offset')) return false;
        const q = S.plan('asa'), f = q.phases.find(ph => ph.kind === 'fricative'), o = S.render(q, { voice: 'female' });
        const x = Array.from(o.samples.slice(Math.round((f.t0 + 30) / 1000 * o.fs), Math.round((f.t1 - 15) / 1000 * o.fs)));
        const band = (lo, hi) => { let e = 0; for (let fr = lo; fr <= hi; fr += 100) { let re = 0, im = 0; for (let n = 0; n < x.length; n++) { const w = .5 - .5 * Math.cos(2 * Math.PI * n / x.length); re += x[n] * w * Math.cos(2 * Math.PI * fr * n / o.fs); im -= x[n] * w * Math.sin(2 * Math.PI * fr * n / o.fs); } e += re * re + im * im; } return 10 * Math.log10(e / ((hi - lo) / 100 + 1) + 1e-12); };
        let pk = -1e9; for (let c = 5000; c <= 10000; c += 1000) pk = Math.max(pk, band(c - 400, c + 400));
        return pk - band(1600, 2400) >= 25;
    },
    // measured against Commons recordings 2026-11-11 (~/langmap-work/audcmp)
    measured: p => {
        const cr = p.creak && p.creak.length === 1, len = p.phases.filter(ph => ph.kind === 'vowel').reduce((t, ph) => t + ph.dur, 0) >= 280;
        const a = S.plan('a').phases.find(ph => ph.kind === 'vowel').P, u = S.plan('u').phases.find(ph => ph.kind === 'vowel').P;
        const sh = S.plan('ʃa').phases.find(ph => ph.kind === 'fricative').P, sc = S.plan('ɕa').phases.find(ph => ph.kind === 'fricative').P;
        const sandhi = !S.plan('ni˨˩˦ xaʊ̯˨˩˦', { lang: 'zh' }).creak.some(c => c[0] < 300);   // ni (→35) does not creak
        return cr && len && sandhi && a.F2 <= 1500 && u.F2 >= 700 && u.F1 >= 260 && sh.FF <= 2900 && sc.FF <= 3400;
    },
    measured2: p => {
        const av = p.tracks.AV, end = av.filter(q => q[1] > 0).pop();   // fades to <= .25 at the last voiced point
        const zh = S.plan('ma˨˩˦', { lang: 'zh' }), zend = zh.tracks.AV.filter(q => q[1] > 0).pop();   // a final rise does not fade
        const peak = Math.max(...S.plan('ˈpata', { lang: 'en' }).pitch.map(q => q[1]));
        return end[1] <= .25 && zend[1] >= .9 && peak >= 4.6;
    },
    french_r: p => { const r = phasesOf(p, 'ʁ')[0]; const g = phasesOf(S.plan('jaː˥ ɣaː˦˨'), 'ɣ')[0]; return r.P.F1 >= 650 && r.P.F2 <= 1400 && r.P.AF <= .25 && r.P.RG <= .2 && g.P.AF >= .2; },
    soleil: p => { const j = phasesOf(p, 'j')[0]; const v = p.phases.filter(ph => ph.kind === 'vowel').pop(); const avAt = t => { const tr = p.tracks.AV; for (let k = 1; k < tr.length; k++) if (tr[k][0] >= t) { const [t0, v0] = tr[k - 1], [t1, v1] = tr[k]; return v0 + (v1 - v0) * (t - t0) / Math.max(1e-9, t1 - t0); } return 0; }; return j.dur >= 100 && avAt(v.t1 - 5) >= .9 && avAt(j.t0 + j.dur * .5) >= .85; },
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
