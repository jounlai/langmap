#!/usr/bin/env node
/**
 * zh_script_convention.js — derive, from the EXISTING word corpus, whether each
 * Chinese-variety language code is written in simplified or traditional
 * characters, then report how the two newest words (sushi, computer) line up
 * with that convention.
 *
 * The atlas convention (confirmed from tree/love/thanks): mainland topolects
 * (Wu, Jin, Gan, Xiang, mainland Hakka, mainland Min city dialects, and every
 * zh_* Mandarin city) are written SIMPLIFIED; standard Cantonese (yue), Taiwan
 * Hokkien/Hakka (nan*, hak_tw, hak_hl) and the historical stages are TRADITIONAL.
 * [2026-10-05: 'nan*' above means the Taiwan/overseas rows (nan, nan_ph, nan_pn).
 *  The mainland Hokkien city rows nan_zz, nan_xm, nan_qz were converted to
 *  simplified like nan_te, nan_hai and the other mainland Min rows; 睏 is kept.]
 * Rather than hard-code that, we MEASURE it per code from the shipped data so
 * sushi/computer can be aligned to whatever each code actually uses elsewhere.
 *
 * Usage: node tools/zh_script_convention.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const WORDS_DIR = path.join(ROOT, 'words');

// Traditional : simplified discriminating pairs. Only characters that DIFFER
// between the two scripts are useful; shared glyphs (水, 司, 星…) are ignored.
const PAIRS = [
  '樹树','愛爱','謝谢','電电','腦脑','壽寿','兩两','學学','國国','說说','話话',
  '飲饮','買买','賣卖','車车','馬马','魚鱼','鳥鸟','門门','陽阳','陰阴','語语',
  '東东','頭头','龍龙','農农','銀银','錢钱','鐵铁','長长','風风','飛飞','對对',
  '會会','來来','時时','這这','個个','們们','麼么','兒儿','點点','燒烧','熱热',
  '開开','關关','聽听','覺觉','讀读','書书','現现','樣样','過过','進进','遠远',
  '應应','燈灯','蟲虫','雞鸡','鴨鸭','鵝鹅','蝦虾','島岛','灣湾','醫医','藥药',
  '團团','圓圆','邊边','紅红','綠绿','號号','萬万','與与','雲云','電电','腦脑',
  // added 2026-08 after the review rally: 布穀/布谷 and 伏鳩仔/伏鸠仔 slipped
  // through because these pairs were missing, so the cells read as 'neutral'.
  // '雀雀' removed 2026-10-14: 雀 is the same character in both scripts, so the
  // pair put it in TRAD and called Taishanese 雀仔 (bird) traditional.
  '穀谷','鳩鸠','貓猫','華华','漢汉','廣广','韓韩','體体','發发','舊旧',
  '觀观','歡欢','樂乐','機机','業业','傳传','專专','轉转','節节','聲声','葉叶',
  '蘭兰','嶺岭','歲岁','氣气','種种','稱称','親亲','豬猪','雙双','雜杂','驢驴',
  // added 2026-09-05 after a reader question about 齒: the same gap as the
  // 穀谷/鳩鸠 one above. 齒齿, 烏乌 and 儂侬 were all missing, so seven cells
  // sat in mainland-simplified rows reading as 'neutral' — including a row
  // whose own sibling wrote the simplified form (wuu 儂 against wuu_nb 侬).
  // The remaining pairs are every other trad/simp character the Sinitic
  // corpus actually uses, so the blind spot is closed rather than patched.
  '齒齿','烏乌','儂侬','媽妈','鹽盐','盤盘','輪轮','鮓鲊','鵑鹃','籌筹','諸诸',
];
const TRAD = new Set(), SIMP = new Set();
for (const p of PAIRS) { TRAD.add(p[0]); SIMP.add(p[1]); }

// Which codes are "Chinese varieties" we care about (Sinitic). Heuristic:
// zh*, yue*, nan*, wuu*, hak*, hsn*, gan*, cjy*, cdo*, cpx*, mnp*, czh*, lzh,
// och, ltc, and the historical zh_song/han/tang. We simply test the prefix.
const SINITIC_RE = /^(zh|yue|nan|wuu|hak|hsn|gan|cjy|cdo|cpx|mnp|czh|lzh|och|ltc|min|hsn|zhx)(_|$)/;

function loadWords() {
  const ctx = vm.createContext({});
  vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
  for (const f of fs.readdirSync(WORDS_DIR).filter(f => f.endsWith('.js'))) {
    try { vm.runInContext(fs.readFileSync(path.join(WORDS_DIR, f), 'utf8'), ctx, { filename: f }); }
    catch (e) { console.error('load fail', f, e.message); }
  }
  return ctx.WORDS;
}

// Recursively collect surface strings keyed by language code. A "cell" is
// either [surface, ipa] or {form, ipa,...}. Keys that look like codes map to
// their surface. We walk everything so nested dialect groups are included.
function collect(node, out, keyHint) {
  if (Array.isArray(node)) {
    if (typeof node[0] === 'string' && keyHint) {
      (out[keyHint] = out[keyHint] || []).push(node[0]);
    }
    return;
  }
  if (node && typeof node === 'object') {
    if (typeof node.form === 'string' && keyHint) {
      (out[keyHint] = out[keyHint] || []).push(node.form);
    }
    for (const k of Object.keys(node)) collect(node[k], out, k);
  }
}

function scriptOf(surfaces) {
  let t = 0, s = 0;
  for (const str of surfaces) for (const ch of str) {
    if (TRAD.has(ch)) t++; else if (SIMP.has(ch)) s++;
  }
  let verdict = 'unknown';
  if (t > s) verdict = 'traditional';
  else if (s > t) verdict = 'simplified';
  return { t, s, verdict };
}

const WORDS = loadWords();
const ids = Object.keys(WORDS);
const NEW = new Set(['sushi', 'computer']);
const ALL = process.argv.includes('--all');

// --all: check EVERY word, not just the two this tool was written for. For each
// code the convention is the majority verdict over all its cells, so one deviant
// cell cannot flip its own baseline. Added after a review rally found 布穀 /
// 陽雀子 / 伏鳩仔 sitting in mainland-simplified rows (cuckoo), which the
// sushi/computer-only scope could not see.
// ---------------------------------------------------------------------------
// Description prose (added 2026-10-19, review r34). The guard above reads word
// CELLS only. The zh UI is Simplified, yet about 50 Han Map descriptions
// (hanmap_data.js description.zh) and a dozen Word Map ones (wordmap_meta.js
// meta.description.zh) were written in Traditional, so /zh/hanmap/zh opened
// with 「以北京話為基礎…」. They were converted with OpenCC t2s; this check keeps
// them converted. Spans that must stay in their original script are exempt:
//   - 《book titles》 and 〈〉
//   - Han-only parentheticals that gloss the preceding term in its original
//     script (扬州（揚州）) or follow a Latin name (MCPDict（漢字音典）)
//   - MCPDict table names (的 揚州 字表)
//   - a 1-2 character cited form followed by its reading (飛 pe, 豬 tu), and
//     romanized native names (廣東話 gwóngdūng wá)
//   - parentheticals in Japanese-row descriptions (日本語 is Japanese, not
//     Traditional Chinese) and 日语電話
//   - on Han Map rows, a Han Map character cited as a standalone token
//     (所以 魚 在这里读) — the atlas lists its characters in Traditional.
// Usage: node tools/zh_script_convention.js --desc  (also part of --all)
const DESC_TRAD = new Set((
  "並乾亂亞佈佔併來侶個們倫偉側傑備傳傷傾僅僑價儀儘償優兒內兩冊凍凱別則剛創劃劇劍勁動務勝勞勢區協卻參吳呂員問啓啟單嘆嘖嘗嘩" +
  "嚇嚴國圍園圓圖團執堅報場塊塗墳壓壞壟壠壩壯壽夠夢夾奧奪娛婁婦媽孫學宮實寧寫寶將專尋對導屢層屬岡島嶇巔師帳帶幣幫幹幾庫廈廟" +
  "廢廣張強彈彙彫後徑從復徵徹愛態慣慮慶憂憐憑憲憶應懸戰戲戶捨捲掛採揀揚換損搵搶撈撫擁擇擋擔據擬擴擺敗敵數斃斷於時晉暢暫曆曉" +
  "曖書會東査條棄業極榮構樂標樞樣樹機橫檔檻櫻欄權歎歐歡歲歷歸殘殺氣汎決沒沖況涼淨淺減測準溝溫滅滲滿漁漢潯潰濁濃濟瀏瀕灣為烏" +
  "無煙煩熱燈營爛爭爾牆狀獄獨獲獻現瑪環璽甌產産畢畫異當疇疊癢發盡監盤眾矯碩確碼礎禪禮種稱穌積穩竪競筆箇箏節範築簡籠籤粵紀約" +
  "納紐純紙級紛細終組結絕絡給絨統絲絶綁經綠綢維綱網綴緊緑緒線締緣編緩緬練緻縛縣縫縮縱總績織繞繪繫繰繹繼續罰羅義習翹聖聞聯聲" +
  "職聽肅脈脣脫膠膽臘臨臺與興舉舊茲莊華萊萬葉葦蒼蓋蕩薩藍蘇蘋蘭處虛虜號蝕蠻衆術衛衝裏補裝裡製複襲見規視親覺觀觸訂計訊討訓記" +
  "訛訣訪設許訴註証詔評詞詠試詩詰話該詳誇誌認誕語誠誤誦說説誰課調談論諜諧諷諸諺諾謀謂謎謔講謠謳證識譜譯議護讀變讓讚豎豐貝貞" +
  "負財貢貧貨貫責貴貶買費貼貿資賓賞賢賦質賴賽贈趕跡躍車軌軍軟軸軼較載輔輕輩輪輯輸輾轉轍辦辭辯農逕這連週進遊運過達違遞遠遡適" +
  "遲遷選遺遼邁還邊邏鄉鄧鄭鄰醫釋針鈔鉤鉸銀銃銅銘銜銳銷鋏鋭錄錢錦錨錫錯録鍛鍵鎖鎮鏈鏡鐫鐵鑄鑊鑒鑿長門閉開間閩閱闊關陣陰陳陸" +
  "陽隊階際隨險隱隻雖雙雛雜雞離難雲電靚靜韓韻響頁頃項順須預頒頗領頭頻題額顎顏顔願類顧顯風飛飯飲飼飾養餘館饅馬駁駐騰驅驗驚體" +
  "鬆鬱魚魯鮮鱈鳥鳴鴉鴻鶻鷹麗麼黃點黨齊齒齡齦龍龐龔"
).split(''));
DESC_TRAD.delete('昇'); // 昇 is kept in names (张日昇) by the 通用规范汉字表
const H = '[\\u3400-\\u9fff\\uf900-\\ufaff\\u3005\\u{20000}-\\u{3134f}]';
const ROM = '[A-Za-z\\u00c0-\\u024f\\u0250-\\u02af\\u1e00-\\u1eff*]';
const NATIVE = ['廣東話', '粵語', '國語', '華語', '臺灣華語', '漢文'];
const FUNC = new Set('與並為於對將及和或是讀作在而以把'.split(''));
function protectedSpans(s, src, code) {
  const P = [];
  const add = (a, b) => P.push([a, b]);
  for (const m of s.matchAll(/《[^》]*》|〈[^〉]*〉/gu)) add(m.index, m.index + m[0].length);
  const paren = new RegExp('[（(](' + H + '+(?:[、／/·]' + H + '+)*)[)）]', 'gu');
  for (const m of s.matchAll(paren)) {
    const inner = m[1], before = s.slice(0, m.index);
    // gloss: the preceding few characters spell the same term, character for
    // character, with a traditional character allowed to face its partner.
    const ic = [...inner], bc = [...before];
    let gloss = false;
    for (let off = 0; off <= 3 && !gloss; off++) {
      const tail = bc.slice(bc.length - off - ic.length, bc.length - off);
      if (tail.length === ic.length && ic.every((c, i) => c === tail[i] || DESC_TRAD.has(c))) gloss = true;
    }
    if (gloss ||
        /[A-Za-z]{3,}\s*$/.test(before)) add(m.index, m.index + m[0].length);
  }
  for (const m of s.matchAll(new RegExp('(?<= )' + H + '+(?= (?:字表|表|同音字表))', 'gu'))) add(m.index, m.index + m[0].length);
  for (const m of s.matchAll(new RegExp('(?<=MCPDict (?:的 )?)' + H + '+(?= )', 'gu'))) add(m.index, m.index + m[0].length);
  for (const m of s.matchAll(new RegExp('(?:^|(?<=[ （(、／/=「，,]))' + H + '{1,2}(?= ' + ROM + ')', 'gu'))) {
    if ([...m[0]].some(c => FUNC.has(c))) continue;
    add(m.index, m.index + m[0].length);
  }
  for (const w of NATIVE) for (const m of s.matchAll(new RegExp(w + '(?= ' + ROM + ')', 'gu'))) add(m.index, m.index + w.length);
  if (src === 'wordmap' && (code === 'ja' || code.startsWith('ja_')))
    for (const m of s.matchAll(new RegExp('(?<=[（(、，])' + H + '+', 'gu'))) add(m.index, m.index + m[0].length);
  for (const m of s.matchAll(/(?<=日[语語])電話/gu)) add(m.index, m.index + 2);
  if (src === 'hanmap')
    for (const m of s.matchAll(new RegExp('(?:^|(?<=[ 、（「。，]))(' + H + ')(?=[ 、）」])', 'gu')))
      if (HAN_LIST_CHARS.has(m[1])) add(m.index, m.index + m[0].length);
  return P;
}
function loadDescriptions() {
  const out = [];
  const hctx = vm.createContext({});
  vm.runInContext('var window=this;var WORDS={};var LANG_DATA={};' +
    fs.readFileSync(path.join(ROOT, 'hanmap_data.js'), 'utf8') +
    '\nthis.__M = HAN_LANG_META; this.__HL = HAN_LIST;', hctx);
  for (const [code, m] of Object.entries(hctx.__M || {}))
    if (m && m.description && m.description.zh) out.push({ src: 'hanmap', code, zh: m.description.zh });
  const wctx = vm.createContext({});
  vm.runInContext('var window=this;var LANG_DATA=new Proxy({},{get:(t,k)=>(k in t?t[k]:(typeof k==="string"?(t[k]={}):undefined))});' +
    fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8') + '\nthis.__L = LANG_DATA;', wctx);
  for (const [code, d] of Object.entries(wctx.__L))
    if (d && d.meta && d.meta.description && d.meta.description.zh) out.push({ src: 'wordmap', code, zh: d.meta.description.zh });
  return { out, hanList: hctx.__HL || [] };
}
const _descData = (process.argv.includes('--desc') || ALL) ? loadDescriptions() : { out: [], hanList: [] };
const HAN_LIST_CHARS = new Set(_descData.hanList.map(c => c.split(':')[0]));
function descriptionViolations() {
  const bad = [];
  for (const d of _descData.out) {
    const P = protectedSpans(d.zh, d.src, d.code);
    const chars = [...d.zh];
    // map code-unit offsets to code points
    let cu = 0; const hits = [];
    for (const ch of chars) {
      const inP = P.some(([a, b]) => cu >= a && cu < b);
      if (!inP && DESC_TRAD.has(ch)) hits.push(ch);
      cu += ch.length;
    }
    if (hits.length) bad.push({ src: d.src, code: d.code, hits: hits.join('') });
  }
  return bad;
}
if (process.argv.includes('--desc') && !ALL) {
  const bad = descriptionViolations();
  for (const b of bad) console.log(`  ${b.src.padEnd(8)} ${b.code.padEnd(14)} ${b.hits}`);
  console.log(`\ndescription mismatches: ${bad.length}`);
  process.exit(0);
}

if (ALL) {
  const per = {};                       // code -> [{word, surf}]
  for (const id of ids) {
    const m = {}; collect(WORDS[id], m, null);
    for (const code of Object.keys(m)) {
      if (!SINITIC_RE.test(code)) continue;
      for (const surf of m[code]) (per[code] = per[code] || []).push({ word: id, surf });
    }
  }
  const bad = [];
  for (const code of Object.keys(per).sort()) {
    const cells = per[code];
    const v = scriptOf(cells.map(c => c.surf));
    if (v.verdict === 'unknown') continue;
    for (const c of cells) {
      let t = 0, sm = 0;
      for (const ch of c.surf) { if (TRAD.has(ch)) t++; else if (SIMP.has(ch)) sm++; }
      const sc = t > sm ? 'traditional' : (sm > t ? 'simplified' : 'neutral');
      if (sc !== 'neutral' && sc !== v.verdict) bad.push({ code, word: c.word, surf: c.surf, is: sc, want: v.verdict, ev: `${v.t}/${v.s}` });
    }
  }
  console.log('zh script convention — every word, per-code majority baseline\n');
  for (const b2 of bad) console.log(`  ${b2.code.padEnd(10)} ${b2.word.padEnd(10)} ${b2.surf.padEnd(8)} is ${b2.is}, code is ${b2.want} (${b2.ev})`);
  const dbad = descriptionViolations();
  console.log('\nzh description prose (Han Map + Word Map) — traditional characters outside cited spans\n');
  for (const b2 of dbad) console.log(`  ${b2.src.padEnd(8)} ${b2.code.padEnd(14)} ${b2.hits}`);
  console.log(`description mismatches: ${dbad.length}`);
  console.log(`\nmismatches: ${bad.length + dbad.length}`);
  process.exit(0);
}

// Convention from existing words (excluding the two under review).
const existing = {};   // code -> surfaces[]
const current = {};    // code -> { sushi:surface, computer:surface }
for (const id of ids) {
  const per = {};
  collect(WORDS[id], per, null);
  for (const code of Object.keys(per)) {
    if (!SINITIC_RE.test(code)) continue;
    if (NEW.has(id)) {
      current[code] = current[code] || {};
      current[code][id] = per[code][per[code].length - 1];
    } else {
      (existing[code] = existing[code] || []).push(...per[code]);
    }
  }
}

const conv = {};
for (const code of Object.keys(existing)) conv[code] = scriptOf(existing[code]);

// Report: codes used by sushi/computer, with the existing-corpus verdict and a
// mismatch flag when the new word's surface script disagrees.
function surfScript(str) {
  let t = 0, s = 0;
  for (const ch of (str || '')) { if (TRAD.has(ch)) t++; else if (SIMP.has(ch)) s++; }
  return t > s ? 'traditional' : (s > t ? 'simplified' : 'neutral');
}

console.log('code        | existing(trad/simp)=verdict      | sushi        | computer     | MISMATCH');
console.log('------------+----------------------------------+--------------+--------------+---------');
const rows = Object.keys(current).sort();
const mismatches = [];
for (const code of rows) {
  const c = conv[code];
  const verdict = c ? c.verdict : 'NO-EXISTING-DATA';
  const ev = c ? `${c.t}/${c.s}` : '-';
  const su = current[code].sushi || '';
  const co = current[code].computer || '';
  const flags = [];
  for (const [wid, surf] of [['sushi', su], ['computer', co]]) {
    if (!surf) continue;
    const sc = surfScript(surf);
    if (c && c.verdict !== 'unknown' && sc !== 'neutral' && sc !== c.verdict) {
      flags.push(`${wid}:${sc}->${c.verdict}`);
      mismatches.push({ code, wid, surf, want: c.verdict, ev });
    }
  }
  console.log(
    code.padEnd(11) + ' | ' +
    `${verdict}(${ev})`.padEnd(32) + ' | ' +
    su.padEnd(12) + ' | ' + co.padEnd(12) + ' | ' + flags.join(' '));
}

console.log('\n=== MISMATCHES (new word uses wrong script for this code) ===');
if (!mismatches.length) console.log('(none)');
for (const m of mismatches) {
  console.log(`${m.wid}  ${m.code}  "${m.surf}"  should be ${m.want}  (existing evidence ${m.ev})`);
}
console.log(`\n${mismatches.length} mismatch cell(s).`);
