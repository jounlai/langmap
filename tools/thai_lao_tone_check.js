#!/usr/bin/env node
/*
 * thai_lao_tone_check.js — for th (Standard Thai) and lo (Vientiane Lao), the
 * Chao tone of every one-syllable word must be the one its spelling gives in
 * that row: initial-consonant class (with ห/ຫ- and อย-leading), tone mark,
 * live/dead syllable, and — where the tone depends on it — vowel length.
 *
 * Why: round-9 review (2026-11-04) found th อึ written ʔɯː˥˩ (long, falling),
 * which the spelling cannot give (mid class, short dead -> low ˨˩). Every
 * other parsed syllable agreed, so the class x mark x live/dead table below is
 * both the textbook rule and this atlas's practice.
 *
 * TABLE: measured 2026-11-04 on the current cells (thai_lao_tone_check dev run,
 * ~/langmap-work/par1104/ml/tl/dev.js): every key was unanimous; counts in
 * brackets. Key = class (M/H/L) + mark (0 none, 1 ่ , 2 ้ , 3 ๊ , 4 ๋) +
 * d(ead)/v(live) + s/l (short/long; Thai low class dead unmarked only, Lao all
 * dead unmarked). Keys with no current cell are filled from the standard rules
 * and marked (rule).
 *
 * SCOPE: only space-separated tokens that parse as ONE syllable are checked
 * (a token whose consonants cannot be assigned unambiguously to one syllable
 * is skipped and counted, never guessed). th_isan has its own guard
 * (isan_tone_check.js); th_n is not covered (its convention is not
 * established: Wiktionary gives two dialect readings in Tai Tham).
 *
 * Run: node tools/thai_lao_tone_check.js [--check] [--verbose]
 *      prints "violations: N"; --check exits 1 when N > 0; --verbose lists skips.
 */
const fs = require('fs'), path = require('path');
const dir = process.env.WORDS_DIR || path.join(__dirname, '..', 'words');

const S = {
  th: {
    C: /[\u0E01-\u0E2E]/u, LV: /[\u0E40-\u0E44]/u, VOW: /[\u0E30-\u0E3A\u0E47]/u,
    MARKS: { '่': '1', '้': '2', '๊': '3', '๋': '4' },
    MID: 'กจฎฏดตบปอ',
    HIGH: 'ขฃฉฐถผฝศษสห',
    SON: 'งญนมยรลวณฬ',
    STOP: 'กขคฆบปพฟภดตถทธฎฏฐฑฒจชซศษส',
    CLUS: 'รลว', H: 'ห', O: 'อ', Y: 'ย', CARR: 'อวย',
    AM: 'ำ', CANCEL: '์', SA: 'ะ',
    SHORT: /[\u0E30\u0E31\u0E34\u0E36\u0E38\u0E47]/u, OPENSHORT: /[\u0E34\u0E36\u0E38\u0E47]/u,
    LONGV: /[\u0E32\u0E35\u0E37\u0E39\u0E2D]/u, LENKEY: k => k === 'L',
    TABLE: { M0v: '˧' /*11*/, H0v: '˩˩˦' /*12*/, L0v: '˧' /*13*/,
             M0d: '˨˩' /*4*/, H0d: '˨˩' /*1*/, L0ds: '˦˥' /*2*/, L0dl: '˥˩' /*1*/,
             M1v: '˨˩' /*1*/, H1v: '˨˩' /*4*/, L1v: '˥˩' /*5*/, M1d: '˨˩' /*rule*/, H1d: '˨˩' /*rule*/, L1d: '˥˩' /*rule*/,
             M2v: '˥˩' /*1*/, H2v: '˥˩' /*3*/, L2v: '˦˥' /*7*/, M2d: '˥˩' /*rule*/, H2d: '˥˩' /*rule*/, L2d: '˦˥' /*rule*/,
             M3v: '˦˥' /*rule*/, M3d: '˦˥' /*rule*/, M4v: '˩˩˦' /*rule*/, M4d: '˩˩˦' /*rule*/ },
  },
  lo: {
    C: /[\u0E81-\u0EAE\u0EDC\u0EDD]/u, LV: /[\u0EC0-\u0EC4]/u, VOW: /[\u0EB0-\u0EBD\u0ECD]/u,
    MARKS: { '່': '1', '້': '2', '໊': '3', '໋': '4' },
    MID: 'ກຈດຕບປຢອ',
    HIGH: 'ຂສຖຜຝຫໜໝ',
    SON: 'ງຍນມຣລວ',
    STOP: 'ກຂຄບປພຟດຕຖທຈຊສ',
    CLUS: 'ຣລວຼ', H: 'ຫ', O: 'ອ', Y: '', CARR: 'ອວຍ',
    AM: 'ຳ', CANCEL: '໌', SA: 'ະ',
    SHORT: /[\u0EB0\u0EB1\u0EB4\u0EB6\u0EB8\u0EBB]/u, OPENSHORT: /[\u0EB4\u0EB6\u0EB8]/u,
    LONGV: /[\u0EB2\u0EB5\u0EB7\u0EB9\u0EAD\u0EBD\u0ECD]/u, LENKEY: () => true,
    TABLE: { M0v: '˩˧' /*14*/, H0v: '˩˧' /*11*/, L0v: '˧˥' /*12*/,
             M0ds: '˧˥' /*1*/, H0ds: '˧˥' /*1*/, M0dl: '˧˩' /*1*/, H0dl: '˧˩' /*rule*/, L0ds: '˧' /*2*/, L0dl: '˥˨' /*1*/,
             M1v: '˧' /*1*/, H1v: '˧' /*4*/, L1v: '˧' /*3 + ພໍ່*/, M1d: '˧' /*rule*/, H1d: '˧' /*rule*/, L1d: '˧' /*rule*/,
             M2v: '˥˨' /*3*/, H2v: '˧˩' /*5*/, L2v: '˥˨' /*5*/, M2d: '˥˨' /*rule*/, H2d: '˧˩' /*rule*/, L2d: '˥˨' /*rule*/ },
  },
};

// Cells that legitimately break the rule, "word:code" -> reason.
const ALLOW = {};

const TONE = /[\u02E5-\u02E9]+/gu;
const klass = (c, R) => R.MID.includes(c) ? 'M' : R.HIGH.includes(c) ? 'H' : 'L';

// Key for a token that is unambiguously one syllable, else null.
function key(tok, code) {
  const R = S[code], ch = [...tok];
  let i = 0, lv = false;
  if (R.LV.test(ch[0] || '')) { lv = true; i++; }
  if (!R.C.test(ch[i] || '')) return null;
  const c1 = ch[i++]; let k = klass(c1, R);
  if (c1 === R.H && R.SON.includes(ch[i] || '')) { k = 'H'; i++; }            // ห/ຫ-leading
  else if (R.Y && c1 === R.O && ch[i] === R.Y) { k = 'M'; i++; }               // อย-leading
  else if (R.CLUS.includes(ch[i] || '') && !R.C.test(ch[i + 1] || '')) i++;   // C + ร/ล/ว cluster
  let mark = '0'; const body = [];
  for (const x of ch.slice(i)) { if (R.MARKS[x]) mark = R.MARKS[x]; else body.push(x); }
  const cons = body.filter(x => R.C.test(x));
  if (cons.length > 2) return null;
  const last = body.filter(x => x !== R.CANCEL), lastc = last[last.length - 1];
  const fin = lastc && R.C.test(lastc) ? lastc : null;
  if (cons.length === 2 && !R.CARR.includes(cons[0])) return null;             // only vowel-carrier + final
  if (cons.length === 1 && !fin) return null;                                  // consonant then vowel sign: 2nd syllable
  const b = body.join('');
  if (!(R.VOW.test(b) || lv || b.includes(R.AM)) && !fin) return null;         // bare consonant: ambiguous
  let dead = !!(fin && !R.CARR.includes(fin) && R.STOP.includes(fin));
  if ((!fin || R.CARR.includes(fin)) && !b.includes(R.AM)) {
    if (b.includes(R.SA) || (!fin && R.OPENSHORT.test(b) && !R.LONGV.test(b))) dead = true;
  }
  let len = '';
  if (dead && mark === '0' && R.LENKEY(k)) len = (R.SHORT.test(b) || (fin && !R.LONGV.test(b) && !lv)) ? 's' : 'l';
  return k + mark + (dead ? 'd' : 'v') + len;
}

const verbose = process.argv.includes('--verbose');
let bad = 0, checked = 0, skipped = 0;
for (const code of ['th', 'lo']) {
  const cellRe = new RegExp(`^\\s*["']?${code}["']?\\s*:\\s*(?:\\[\\s*"([^"]*)"\\s*,\\s*"([^"]*)"|\\{[^}]*?form\\s*:\\s*"([^"]*)"[^}]*?ipa\\s*:\\s*"([^"]*)")`, 'u');
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.js')).sort()) {
    for (const ln of fs.readFileSync(path.join(dir, f), 'utf8').split('\n')) {
      const m = ln.match(cellRe); if (!m) continue;
      const w = f.replace(/\.js$/, ''), s = m[1] ?? m[3], ipa = m[2] ?? m[4];
      if (!s || s === '—') break;
      const toks = s.split(/\s+/u), tones = ipa.match(TONE) || [];
      if (toks.length !== tones.length) { skipped += toks.length; if (verbose) console.log(`  (skipped) ${w} ${code}: ${s} /${ipa}/`); break; }
      toks.forEach((t, n) => {
        const kk = key(t, code), want = kk && S[code].TABLE[kk];
        if (!want) { skipped++; if (verbose) console.log(`  (skipped) ${w} ${code}: ${t} in ${s} /${ipa}/`); return; }
        checked++;
        if (tones[n] !== want && !ALLOW[`${w}:${code}`]) {
          bad++; console.log(`  ${w} ${code}: ${s} /${ipa}/ — ${t} is ${kk}, row writes ${want}, cell has ${tones[n]}`);
        }
      });
      break;
    }
  }
}
console.log(`syllables checked: ${checked} (skipped, not one parseable syllable: ${skipped})`);
console.log(`violations: ${bad}`);
if (process.argv.includes('--check') && bad > 0) process.exit(1);
