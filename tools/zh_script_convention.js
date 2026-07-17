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
