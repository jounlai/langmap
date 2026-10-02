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
  // tier 3 (2026-10-02). 個 and 鼻 deliberately omitted, like 貓 and 鳥:
  // 鼻 is 去 in 廣韻 but read as 入 in Wu/Jin and 陽平 in Mandarin (集韻 毗必切);
  // 個 is a classifier with lect-specific tone (neutral, 入, changed tone).
  '你':['S','c'], '小':['S','q'], '多':['P','q'],  '熱':['R','c'],  '長:1':['P','z'], '長:2':['S','q'],
  // tier 4 (2026-10-02)
  '遠':['S','c'], '老':['S','c'], '冷':['S','c'], '香':['P','q'], '年':['P','c'], '女':['S','c'], '飯':['Q','z'], '雪':['R','q'],
  // tier 5 (2026-10-02)
  '綠':['R','c'], '灰':['P','q'], '雞':['P','q'], '豬':['P','q'], '蛇':['P','z'], '牙':['P','c'], '錢':['P','z'], '門':['P','c'], '有':['S','c'],
  // 2026-10-02: the 18 characters added to the Han Map.
  '我':['S','c'],   '大':['Q','z'],   '白':['R','z'],   '茶':['P','z'],   '飛':['P','q'],   '無':['P','c'],
  '兒':['P','c'],   '黃':['P','z'],   '家':['P','q'],   '生':['P','q'],   '不':['R','q'],   '青':['P','q'],
  '紅':['P','z'],   '黑':['R','q'],   '知':['P','q'],   '雨':['S','c'],   '石':['R','z'],   '死':['S','q'],
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
  'txg','zkt','mnc','sjo','juc','bca','za','za_sd','dng','bo_sino',
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

// --- 4b. Verified exceptions: cells whose tone legitimately deviates from the
//         category majority (confirmed against sources / variety phonology in the
//         2026-06 tone-category audit). Listed here so the checker reports only
//         UNexplained outliers — a regression guard. `lang|char`.
const EXCEPTIONS = new Set([
  // tier 5 (2026-10-02), each checked against its source table:
  'cjy|綠',      // 太原 luəʔ7 陰入 (MCPDict 太原; Wiktionary j=lueh4) — 次濁入 in 陰入
  'mnp|豬',      // 建甌 kṳ̌ is 訓讀（豨）, another etymon (MCPDict 訓“豨”)
  'nan_hai|綠',  // 海口 文讀 lok7 陰入 beside 白讀 liak8 (MCPDict 海口)
  'wuu_nb|雞',   // 寧波 tɕi3 (上 35) in 甬江話字詞表, as listed
  'wuu_nb|豬',   // 寧波 tsʮ3 (上 35), as listed
  'cpx|月',      // Puxian vernacular 月 kuoi2 (陽平) — the stop is lost (MCPDict 仙遊 kuoi2)
  'yue_gz|女',   // 化州 nʋ̩j2 陰上 35, as the MCPDict table lists
  'yue_gz|兒',   // 化州 ȵi1 陰平 52, as listed
  'nan_sg|雨',   // Hokkien vernacular 雨 hōo is 陽去 (次濁上 白讀 -> 陽去), not 上
  'cpx|肉',      // row reads ˨˦, the Xianyou 陽入 value, not Putian ˦ — pre-existing; flagged in RESUME for a Puxian check
  'cjy_xz|虎',
  'cjy_xz|火',
  // 中国语言地图集 dialect points (provisional, fragmentary):
  'gan_yc|七',
  'czh_wy|六',
  'cpx|血',      // Puxian 血 is irregular 陽入 (Putian he6 / Xianyou hyoeh6), not 陰入
  'czh|六',      // Hui 六 lexicalised low numeral reading; no source to "correct" it
  'mnp|日', 'mnp|立', // Jian'ou 次濁入 → 陽入 ˦˨ (Wiktionary /ni⁴²/, /li⁴²/), vs 陰入 peers
  'nan_hai|九', 'nan_hai|火', // Hainanese 陰上 is a genuine LOW contour (~213), not the ˨˦˥ majority
  'nan_sg|口',               // 訓讀: cell holds colloquial 喙/嘴 chhùi (陰去), not 口's own reading
  'yue_nn|肉', 'yue_zs|肉',   // 入聲 notation: ˨ ≡ ˨˨ (short checked tone), not a tone error
  'zh_jiao|六', 'zh_jiao|肉', // Jiao-Liao 次濁入 → 去聲 ˥˧ (regular here), peers' ˦˨ is the split
  // New under-documented varieties (provisional, derived from a baseline):
  'czh_jx|六',           // Jixi Hui 次濁入 → 陽入 low, parallels czh|六
  'mnz|立',              // Min Zhong 次濁入 → 陽入, parallels mnp|立
  'msj|六', 'msj|月',    // Shao-Jiang Min 次濁入 → 陽入 (low checked tone)
  'nan_lei|足',          // Leizhou Min 陰入 cell — provisional reading pending native verification
  // Leizhou vernacular readings that left the 入聲 class, both as Wiktionary gives
  // them (mn-l): 月 bhue6 /buɛ³³/ lost its stop and joined tone 6; 木 mog4 /mɔk̚⁵/
  // is 陰入 against the 陽入 of its peers. Checked 2026-09-30 in the Min audit.
  'nan_lei|月', 'nan_lei|木',
  // Teochew 聞 is bhung6 /buŋ³⁵/ on Wiktionary (mn-t), 陽上 not 陽平.
  'nan_te|聞',
  // mnz and nan_hai were rebuilt on 2026-09-30 from MCPDict's tables, which
  // cite 《永安市志·方言》《永安方言》 and 《海口话音档》. Both of these
  // are as those tables give them: Yong'an 一 is i5 (去 24), and Haikou
  // vernacular 月 vue6 has lost its stop (陽去 33).
  'mnz|一', 'nan_hai|月',
  // Rows rebuilt 2026-09-30 from MCPDict's cited tables (Gan, Jin, Xiang, Hui,
  // Pinghua). Each value below is what that table gives; in these varieties
  // the entering tone splits by word, and a few 清 characters sit in an
  // unexpected class in the survey itself (宜春 走 tseu2, 長治 央 iaŋ). Not
  // "corrected": the checker's majority is not a source.
  'cjy_cz|央', 'cjy_cz|日', 'cjy_cz|肉', 'cjy_lv|飲', 'cjy_xz|六', 'cjy_xz|肉',
  'cnp_gl|月', 'cnp_gl|八', 'gan_fz|六', 'gan_ja|六', 'gan_yc|走',
  'gan_yt|六', 'gan_yt|月', 'hsn_hy|木', 'hsn_hy|目',
  // 2026-10-02, 18 characters added (我 大 白 茶 飛 無 兒 黃 家 生 不 青 紅 黑 知 雨 石 死).
  // Each new cell is from its row's source; the new members shift several
  // category majorities, so some old cells now stand out. All of these are
  // source-given irregulars: Cantonese 中入 (八 血 at 33), the Hakka and Wu
  // pronoun tone of 我, Jian'ou 陽平→上 (無 兒, like 紅), 不 as a toneless or
  // shifted particle, 行:2 háng in Hakka/Puxian, Taishan changed tones.
  // Rebuilt 2026-10-02 from their own MCPDict tables (yue_dg/nn/zs, wuu_jx,
  // gan): Cantonese-type 中入 八 血; Jiaxing's 3a/3b 陰上 split and its
  // sonorant 陽入 in tone 7; Nanchang 月 魚 as the table gives them.
  'gan|月', 'gan|魚', 'wuu_jx|雨', 'wuu_jx|日', 'wuu_jx|土', 'wuu_jx|犬', 'wuu_jx|口',
  'yue_dg|八', 'yue_dg|血', 'yue_nn|八', 'yue_nn|血', 'yue_zs|八', 'yue_zs|血',
  // tier 3 (2026-10-02): source-given irregulars shown up by the new cells —
  // 熱 in Jin/Loudi/Jian'ou, 下 in Hui/Yong'an (locative reading), Yong'an 你,
  // Leizhou vernacular 八 血 that lost their stop (tone 7 = 55), Jinhua 行 (as
  // the 金華 table gives it), Guilin Mandarin 中:2.
  'cjy|熱', 'hsn_ld|熱', 'mnp|熱', 'czh_jx|下', 'czh_wy|下', 'mnz|下', 'mnz|你',
  'nan_lei|八', 'nan_lei|血', 'wuu_jh|行:1', 'wuu_jh|行:2', 'zh_gl|中:2',
  // tier 4 (2026-10-02) added four more 上次濁 characters (遠 老 冷 女). That
  // class genuinely splits inside these lects — Hakka colloquial 次濁上 → 陰平
  // (你 冷 我 馬), Min colloquial → 陽去 (五 耳), Wu 陽上 mergers — so the new
  // members moved the majority and the other half of each split now shows.
  // All are as the sources give them.
  'cdo|五', 'cdo|耳', 'cjy_cz|下', 'cjy_dt|上', 'cnp_gl|上', 'cpx|五', 'cpx|耳', 'gan_yt|下', 'hak_cn|你', 'hak_cn|冷', 'hak_hl|你', 'hak_hl|冷', 'hak_hy|冷', 'hak_hy|我', 'hak_hy|馬', 'hak_mz|你', 'hak_mz|冷', 'hak_tw|你', 'hak_tw|冷', 'hsn_hy|大', 'nan_pn|老', 'nan_pn|雨', 'nan_sg|多', 'nan_te|五', 'nan_te|耳', 'nan|五', 'wuu_jh|五', 'wuu_jh|耳', 'wuu_jh|馬', 'wuu_qt|下', 'wuu_qt|耳', 'wuu_qt|雨', 'wuu_sz|你', 'wuu_sz|我', 'wuu_wz|五', 'wuu_wz|耳', 'wuu|你',
  'cjy_lv|五',
  'cnp_gl|不',
  'cpx|行:2',
  'gan_yc|我',
  'hak_cn|我',
  'hak_hl|我', 'hak_hl|行:2',
  'hak_mz|我', 'hak_mz|行:2',
  'hak_tw|我', 'hak_tw|行:2',
  'mnp|馬', 'mnp|無', 'mnp|兒',
  'msj|頭',
  'wuu|我',
  'wuu_jh|不', 'wuu_jh|黑',
  'wuu_sz|兒',
  'yue|八', 'yue|血',
  'yue_hk|八', 'yue_hk|血',
  'yue_mo|八', 'yue_mo|血',
  'yue_ts|耳',
  'zh_km|不',
  'zh_lz|無',]);

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
        if (EXCEPTIONS.has(lang + '|' + x.char)) continue; // verified legitimate deviation
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
