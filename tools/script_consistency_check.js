#!/usr/bin/env node
// Script-consistency guard: flags a WordMap surface written in a different
// writing system than the rest of its language (e.g. a lone Latin word among
// Perso-Arabic, a stray Bengali word among Latin romanizations). These are
// almost always an un-converted leftover. Run: node tools/script_consistency_check.js
const fs=require("fs"),vm=require("vm"),path=require("path");
const ROOT=path.resolve(__dirname,"..");
const c={window:{}};vm.createContext(c);c.WORDS={};
for(const f of fs.readdirSync(path.join(ROOT,"words")).filter(x=>x.endsWith(".js")))vm.runInContext(fs.readFileSync(path.join(ROOT,"words",f),"utf8"),c);
vm.runInContext(fs.readFileSync(path.join(ROOT,"wordmap_data.js"),"utf8"),c);vm.runInContext("this.LD=LANG_DATA;",c);
const W=c.WORDS,WORDS=Object.keys(W),LD=c.LD;
// Known-OK outliers: 'lang|word'. Languages whose orthography legitimately
// mixes scripts within a single word are handled by the Japanese rule below;
// list here only genuine per-cell exceptions confirmed by hand.
const EXCEPTIONS=new Set([
  "huz|fire", // Hunzib цIə — palochka typed as Latin I + schwa ə, used consistently across the whole huz entry (not a stray cell)
]);
function script(ch){const cp=ch.codePointAt(0);
  if((cp>=0x41&&cp<=0x5A)||(cp>=0x61&&cp<=0x7A)||(cp>=0xC0&&cp<=0x24F)||(cp>=0x1E00&&cp<=0x1EFF)||(cp>=0x250&&cp<=0x2AF))return"Latin";
  if(cp>=0x600&&cp<=0x6FF||cp>=0x750&&cp<=0x77F||cp>=0xFB50&&cp<=0xFDFF||cp>=0xFE70&&cp<=0xFEFF)return"Arabic";
  if(cp>=0x400&&cp<=0x52F)return"Cyrillic";
  if(cp>=0x4E00&&cp<=0x9FFF||cp>=0x3400&&cp<=0x4DBF||cp>=0xF900&&cp<=0xFAFF)return"Han";
  if(cp>=0x3040&&cp<=0x309F)return"Hiragana";if(cp>=0x30A0&&cp<=0x30FF)return"Katakana";
  if(cp>=0xAC00&&cp<=0xD7AF||cp>=0x1100&&cp<=0x11FF)return"Hangul";
  if(cp>=0x900&&cp<=0x97F)return"Devanagari";if(cp>=0x980&&cp<=0x9FF)return"Bengali";
  if(cp>=0xA00&&cp<=0xA7F)return"Gurmukhi";if(cp>=0xA80&&cp<=0xAFF)return"Gujarati";
  if(cp>=0xB00&&cp<=0xB7F)return"Odia";if(cp>=0xB80&&cp<=0xBFF)return"Tamil";
  if(cp>=0xC00&&cp<=0xC7F)return"Telugu";if(cp>=0xC80&&cp<=0xCFF)return"Kannada";
  if(cp>=0xD00&&cp<=0xD7F)return"Malayalam";if(cp>=0xD80&&cp<=0xDFF)return"Sinhala";
  if(cp>=0x590&&cp<=0x5FF)return"Hebrew";if(cp>=0xE00&&cp<=0xE7F)return"Thai";if(cp>=0xE80&&cp<=0xEFF)return"Lao";
  if(cp>=0x370&&cp<=0x3FF||cp>=0x1F00&&cp<=0x1FFF)return"Greek";if(cp>=0x530&&cp<=0x58F)return"Armenian";
  if(cp>=0x10A0&&cp<=0x10FF)return"Georgian";if(cp>=0xF00&&cp<=0xFFF)return"Tibetan";
  if(cp>=0x1000&&cp<=0x109F)return"Myanmar";if(cp>=0x1780&&cp<=0x17FF)return"Khmer";
  if(cp>=0x1200&&cp<=0x137F)return"Ethiopic";if(cp>=0x1400&&cp<=0x167F)return"Canadian";
  return null;}
function surfScript(s){const cnt={};for(const ch of String(s)){const sc=script(ch);if(sc)cnt[sc]=(cnt[sc]||0)+1;}let best=null,bn=0;for(const[k,v] of Object.entries(cnt)){if(v>bn){bn=v;best=k;}}return best;}
const flags=[];
for(const[code,d] of Object.entries(LD)){
  const per={},wScr={};
  for(const w of WORDS){const e=W[w].data[code];if(!e||e[0]==='—')continue;const b=surfScript(e[0]);if(!b)continue;wScr[w]=b;per[b]=(per[b]||0)+1;}
  const scripts=Object.entries(per).sort((a,b)=>b[1]-a[1]);if(scripts.length<2)continue;
  const[dom,domN]=scripts[0];if(domN<5)continue;
  for(const[sc,n] of scripts.slice(1)){
    if(n>3)continue;
    // Japanese & friends legitimately mix kana with kanji
    if(dom==="Han"&&(sc==="Hiragana"||sc==="Katakana"))continue;
    for(const[w,ws] of Object.entries(wScr)){if(ws!==sc)continue;if(EXCEPTIONS.has(code+"|"+w))continue;
      flags.push({code,name:d.name,word:w,surface:W[w].data[code][0],outlier:sc,dom,domN});}
  }
}
if(flags.length){
  console.error("✗ script-consistency: "+flags.length+" surface(s) in a different script than their language:");
  for(const f of flags)console.error("  "+f.code+" / "+f.word+" = "+JSON.stringify(f.surface)+"  ("+f.outlier+" among "+f.dom+"×"+f.domN+")");
  process.exit(1);
}
console.log("✓ script-consistency: no stray-script surfaces");
