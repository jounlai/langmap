#!/usr/bin/env node
/**
 * zh_script_fix.js — align sushi.js / computer.js Chinese-variety surfaces to
 * the script (simplified vs traditional) that the EXISTING corpus uses for the
 * same language code. Re-derives the per-code convention exactly like
 * zh_script_convention.js, then rewrites only the mismatched array cells,
 * converting the surface character-by-character (word choice is preserved —
 * only 壽↔寿, 電↔电, 腦↔脑, etc. flip). IPA is never touched.
 *
 * Dry run:  node tools/zh_script_fix.js
 * Apply:    node tools/zh_script_fix.js --write
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const WORDS_DIR = path.join(ROOT, 'words');
const WRITE = process.argv.includes('--write');

const PAIRS = [
  '樹树','愛爱','謝谢','電电','腦脑','壽寿','兩两','學学','國国','說说','話话',
  '飲饮','買买','賣卖','車车','馬马','魚鱼','鳥鸟','門门','陽阳','陰阴','語语',
  '東东','頭头','龍龙','農农','銀银','錢钱','鐵铁','長长','風风','飛飞','對对',
  '會会','來来','時时','這这','個个','們们','麼么','兒儿','點点','燒烧','熱热',
  '開开','關关','聽听','覺觉','讀读','書书','現现','樣样','過过','進进','遠远',
  '應应','燈灯','蟲虫','雞鸡','鴨鸭','鵝鹅','蝦虾','島岛','灣湾','醫医','藥药',
  '團团','圓圆','邊边','紅红','綠绿','號号','萬万','與与','雲云',
];
const TRAD = new Set(), SIMP = new Set();
const T2S = {}, S2T = {};
for (const p of PAIRS) { TRAD.add(p[0]); SIMP.add(p[1]); T2S[p[0]] = p[1]; S2T[p[1]] = p[0]; }

const SINITIC_RE = /^(zh|yue|nan|wuu|hak|hsn|gan|cjy|cdo|cpx|mnp|czh|lzh|och|ltc|min|zhx)(_|$)/;
const NEW = ['sushi', 'computer'];

function loadWords() {
  const ctx = vm.createContext({});
  vm.runInContext('this.window = this; this.WORDS = window.WORDS = {};', ctx);
  for (const f of fs.readdirSync(WORDS_DIR).filter(f => f.endsWith('.js'))) {
    vm.runInContext(fs.readFileSync(path.join(WORDS_DIR, f), 'utf8'), ctx, { filename: f });
  }
  return ctx.WORDS;
}
function collect(node, out, keyHint) {
  if (Array.isArray(node)) {
    if (typeof node[0] === 'string' && keyHint) (out[keyHint] = out[keyHint] || []).push(node[0]);
    return;
  }
  if (node && typeof node === 'object') {
    if (typeof node.form === 'string' && keyHint) (out[keyHint] = out[keyHint] || []).push(node.form);
    for (const k of Object.keys(node)) collect(node[k], out, k);
  }
}
function verdictOf(surfaces) {
  let t = 0, s = 0;
  for (const str of surfaces) for (const ch of str) { if (TRAD.has(ch)) t++; else if (SIMP.has(ch)) s++; }
  return t > s ? 'traditional' : (s > t ? 'simplified' : 'unknown');
}
function surfScript(str) {
  let t = 0, s = 0;
  for (const ch of str) { if (TRAD.has(ch)) t++; else if (SIMP.has(ch)) s++; }
  return t > s ? 'traditional' : (s > t ? 'simplified' : 'neutral');
}
function convert(str, target) {
  let out = '';
  for (const ch of str) {
    if (target === 'simplified' && T2S[ch]) out += T2S[ch];
    else if (target === 'traditional' && S2T[ch]) out += S2T[ch];
    else out += ch;
  }
  return out;
}

const WORDS = loadWords();
// Existing convention (all words except the two under review).
const existing = {};
for (const id of Object.keys(WORDS)) {
  if (NEW.includes(id)) continue;
  const per = {}; collect(WORDS[id], per, null);
  for (const code of Object.keys(per)) if (SINITIC_RE.test(code)) (existing[code] = existing[code] || []).push(...per[code]);
}
const conv = {};
for (const code of Object.keys(existing)) conv[code] = verdictOf(existing[code]);

let total = 0;
for (const wid of NEW) {
  const file = path.join(WORDS_DIR, wid + '.js');
  let text = fs.readFileSync(file, 'utf8');
  const per = {}; collect(WORDS[wid], per, null);
  const edits = [];
  for (const code of Object.keys(per)) {
    if (!SINITIC_RE.test(code)) continue;
    const want = conv[code];
    if (!want || want === 'unknown') continue;
    for (const surf of new Set(per[code])) {
      const sc = surfScript(surf);
      if (sc === 'neutral' || sc === want) continue;
      const fixed = convert(surf, want);
      if (fixed === surf) continue;
      // Replace only the array-cell surface for this exact code.
      const re = new RegExp('(["\']' + code + '["\']\\s*:\\s*\\[\\s*["\'])' + surf.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const before = text;
      text = text.replace(re, '$1' + fixed);
      const n = (before.match(re) || []).length;
      if (n) { edits.push(`${code}: ${surf} -> ${fixed}  (${want}, ${n} cell)`); total += n; }
    }
  }
  console.log(`\n=== ${wid}.js: ${edits.length} code(s) ===`);
  edits.forEach(e => console.log('  ' + e));
  if (WRITE && edits.length) { fs.writeFileSync(file, text); console.log('  written.'); }
}
console.log(`\n${WRITE ? 'APPLIED' : 'DRY-RUN'} — ${total} cell(s).`);
