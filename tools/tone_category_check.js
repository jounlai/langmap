#!/usr/bin/env node
/*
 * tone_category_check.js — deterministic Middle-Chinese tone-category consistency
 * auditor for HanMap Sinitic varieties.
 *
 * Each of the 61 chars is tagged with its Middle-Chinese tone (平/上/去/入) and
 * initial class (清 voiceless obstruent / 全濁 voiced obstruent / 次濁 sonorant).
 * Within a regular topolect, all chars sharing one (tone, class) cell develop the
 * SAME citation tone, so any char whose tone signature (the run of Chao tone
 * letters in its IPA) deviates from the majority of its category-mates is a
 * candidate artifact (typically a value copied from a neighbouring dialect column).
 *
 * This is a DIAGNOSTIC: it reports candidates for review, it does not edit data.
 * Run: node tools/tone_category_check.js
 */
const fs = require('fs'), vm = require('vm'), path = require('path');

// --- 1. Middle-Chinese category per char. tone: P平 S上 Q去 R入; cls: q清 z全濁 c次濁
const MC = {
  '一':['R','q'], '二':['Q','c'], '三':['P','q'], '四':['Q','q'], '五':['S','c'],
  '六':['R','c'], '七':['R','q'], '八':['R','q'], '九':['S','q'], '十':['R','z'],
  '日':['R','c'], '月':['R','c'], '山':['P','q'], '水':['S','q'], '火':['S','q'],
  '木':['R','c'], '土':['S','q'], '天':['P','q'], '地':['Q','z'], '海':['S','q'],
  '龍':['P','c'], '虎':['S','q'], '犬':['S','q'], '馬':['S','c'],
  '魚':['P','c'], '牛':['P','c'], '羊':['P','c'], '人':['P','c'],
  // 貓 and 鳥 deliberately omitted as known irregulars: 貓 is etymologically 平次濁
  // (陽平) but surfaces as 陰平 in most modern topolects; 鳥 (端/泥母 alternation +
  // taboo deformation) takes divergent tones across lects. Both are true exceptions.
  '手':['S','q'], '足':['R','q'], '目':['R','c'], '耳':['S','c'], '口':['S','q'],
  '頭':['P','z'], '心':['P','q'], '血':['R','q'], '肉':['R','c'],
  '上':['Q','z'], '下':['Q','z'],            // locative readings (departing)
  '中:1':['P','q'], '中:2':['Q','q'],        // zhōng (level) / zhòng "hit" (departing)
  '央':['P','q'], '左':['S','q'], '右':['Q','c'], '東':['P','q'], '西':['P','q'],
  '南':['P','c'], '北':['R','q'],
  '行:1':['P','z'], '行:2':['P','z'],        // xíng / háng, both 匣母 level
  '来':['P','c'], '去':['Q','q'], '見':['Q','q'], '聞':['P','c'],
  '食':['R','z'], '飲':['S','q'], '走':['S','q'], '坐':['S','z'], '立':['R','c'],
};
const toneName = {P:'平', S:'上', Q:'去', R:'入'};
const clsName = {q:'清', z:'全濁', c:'次濁'};

// --- 2. Sinitic spoken varieties with regular MC tone correspondence.
//        Excludes reconstructions, Sino-Xenic, and non-Sinitic languages.
const EXCLUDE = new Set([
  'zh_han','zh_tang','zh_song','zh_yuan','zh_phagspa','zh_kanbun', // reconstructions / non-spoken
  'ko','ko_mid','ko_kp','ko_zai','ko_bus','ko_hun',
  'vi','vi_c','vi_s','vi_nom','vi_ohan',
  'ja','ja_kgs','ja_kun','ja_ojp','ja_okn','ja_thk',
  'txg','zkt','mnc','sjo','juc','bca','za','dng','bo_sino',
  'pst','ptb','pko','pja','ptung','paa','ptai','pmgl','phm',
]);

// --- 3. Load data.
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'hanmap_data.js'), 'utf8') +
  '\nthis.D=HAN_DATA;this.V=HAN_VARIANTS;this.L=HAN_LIST;this.LA=HAN_LANGS;', ctx);
const D = ctx.D, L = ctx.L;
const langs = ctx.LA.filter(l => !EXCLUDE.has(l));

// --- 4. Extract the tone signature = run of Chao tone letters U+02E5..U+02E9 from IPA.
function toneSig(ipa) {
  if (ipa == null) return null;
  let s = '';
  for (const ch of String(ipa)) { const c = ch.codePointAt(0); if (c >= 0x2E5 && c <= 0x2E9) s += ch; }
  return s || null;
}

// --- 5. For each variety, group chars by MC cell, find majority tone, flag outliers.
const candidates = [];
for (const lang of langs) {
  // collect {char, sig} per char that has an IPA
  const cells = [];
  for (const c of L) {
    const ipa = (D[c].ipa || {})[lang];
    const sig = toneSig(ipa);
    if (sig) cells.push({ char: c, sig, ipa, mc: MC[c] });
  }
  if (cells.length < 8) continue; // variety too sparse to judge
  // group by MC cell
  const groups = {};
  for (const x of cells) { if (!x.mc) continue; const k = x.mc[0] + x.mc[1]; (groups[k] = groups[k] || []).push(x); }
  for (const [k, arr] of Object.entries(groups)) {
    if (arr.length < 5) continue; // need a solid majority; small groups (≤4) are too noisy
    const cnt = {}; for (const x of arr) cnt[x.sig] = (cnt[x.sig] || 0) + 1;
    const sorted = Object.entries(cnt).sort((a, b) => b[1] - a[1]);
    const [majSig, majN] = sorted[0];
    if (majN < Math.ceil(arr.length * 0.7)) continue; // need ≥70% agreement to call a majority
    for (const x of arr) {
      if (x.sig !== majSig) {
        candidates.push({
          lang, char: x.char, cell: toneName[x.mc[0]] + clsName[x.mc[1]],
          got: x.sig, expected: majSig, ipa: x.ipa,
          peers: arr.filter(y => y.sig === majSig).map(y => y.char).join('') ,
          groupSize: arr.length, majN,
        });
      }
    }
  }
}

// --- 6. Report.
candidates.sort((a, b) => a.lang < b.lang ? -1 : a.lang > b.lang ? 1 : 0);
const byLang = {};
for (const c of candidates) (byLang[c.lang] = byLang[c.lang] || []).push(c);
console.log(`Scanned ${langs.length} Sinitic varieties × ${L.length} chars.`);
console.log(`Tone-category OUTLIER candidates: ${candidates.length} (across ${Object.keys(byLang).length} varieties)\n`);
for (const [lang, list] of Object.entries(byLang)) {
  console.log(`### ${lang} (${list.length})`);
  for (const c of list)
    console.log(`   ${c.char.padEnd(5)} ${c.cell}  ipa ${JSON.stringify(c.ipa).padEnd(14)} tone ${c.got} ≠ category-majority ${c.expected}  (peers ${c.peers}, ${c.majN}/${c.groupSize})`);
  console.log('');
}
fs.writeFileSync('/tmp/tone_candidates.json', JSON.stringify(candidates, null, 1));
console.log('candidates -> /tmp/tone_candidates.json');
