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
  // 2026-09-10. Everything below was missing, and the omission did not merely
  // hide rows — it INVERTED them. A script script() cannot name counts as no
  // script at all, so Tai Dam's 35 Tai Viet surfaces were invisible and its 9
  // untransliterated Latin cells became the majority: the row was reported as
  // "Latin×9" with a single Lao outlier, i.e. the nine defects were the
  // baseline and the true script was not there. Any row in one of these
  // scripts had the same shape.
  if(cp>=0xAA80&&cp<=0xAADF)return"TaiViet";
  if(cp>=0xA000&&cp<=0xA4CF)return"Yi";
  if(cp>=0xA500&&cp<=0xA62B)return"Vai";
  if(cp>=0xAA00&&cp<=0xAA5F)return"Cham";
  if(cp>=0xABC0&&cp<=0xABFF)return"MeeteiMayek";
  if(cp>=0x1800&&cp<=0x18AF)return"Mongolian";
  if(cp>=0xA840&&cp<=0xA87F)return"Phagspa";
  if(cp>=0x700&&cp<=0x74F)return"Syriac";
  if(cp>=0x780&&cp<=0x7BF)return"Thaana";
  if(cp>=0x7C0&&cp<=0x7FF)return"NKo";
  if(cp>=0x2C80&&cp<=0x2CFF||cp>=0x3E2&&cp<=0x3EF)return"Coptic";
  if(cp>=0x16A0&&cp<=0x16FF)return"Runic";
  if(cp>=0x13A0&&cp<=0x13FF||cp>=0xAB70&&cp<=0xABBF)return"Cherokee";
  if(cp>=0x2D30&&cp<=0x2D7F)return"Tifinagh";
  if(cp>=0x1700&&cp<=0x171F)return"Tagalog";
  if(cp>=0x1B80&&cp<=0x1BBF)return"Sundanese";
  if(cp>=0xA980&&cp<=0xA9DF)return"Javanese";
  if(cp>=0x1A20&&cp<=0x1AAF)return"TaiTham";
  if(cp>=0x1950&&cp<=0x197F)return"TaiLe";
  if(cp>=0x1980&&cp<=0x19DF)return"NewTaiLue";
  if(cp>=0x1900&&cp<=0x194F)return"Limbu";
  if(cp>=0xA900&&cp<=0xA92F)return"KayahLi";
  if(cp>=0x10280&&cp<=0x1029F)return"Lycian";
  if(cp>=0x10300&&cp<=0x1032F)return"OldItalic";
  if(cp>=0x10330&&cp<=0x1034F)return"Gothic";
  if(cp>=0x10380&&cp<=0x1039F)return"Ugaritic";
  if(cp>=0x103A0&&cp<=0x103DF)return"OldPersian";
  if(cp>=0x10800&&cp<=0x1083F)return"CyproMinoan";
  if(cp>=0x10840&&cp<=0x1085F)return"ImperialAramaic";
  if(cp>=0x10900&&cp<=0x1091F)return"Phoenician";
  if(cp>=0x10980&&cp<=0x109FF)return"Meroitic";
  if(cp>=0x10A00&&cp<=0x10A5F)return"Kharoshthi";
  if(cp>=0x10A60&&cp<=0x10A7F)return"OldSouthArabian";
  if(cp>=0x10B00&&cp<=0x10B3F)return"Avestan";
  if(cp>=0x10B60&&cp<=0x10B7F)return"InscPahlavi";
  if(cp>=0x10C00&&cp<=0x10C4F)return"OldTurkic";
  if(cp>=0x10FE0&&cp<=0x10FFF)return"Elymaic";
  if(cp>=0x11000&&cp<=0x1107F)return"Brahmi";
  if(cp>=0x11F00&&cp<=0x11F5F)return"Kawi";
  if(cp>=0x12000&&cp<=0x1247F)return"Cuneiform";
  if(cp>=0x13000&&cp<=0x1342F)return"EgyptianHiero";
  if(cp>=0x14400&&cp<=0x1467F)return"AnatolianHiero";
  if(cp>=0x10000&&cp<=0x100FF)return"LinearB";
  if(cp>=0x17000&&cp<=0x18AFF)return"Tangut";
  if(cp>=0x18B00&&cp<=0x18CFF)return"Khitan";
  if(cp>=0x20000&&cp<=0x2FFFF)return"Han";   // CJK Ext B+ — Nôm, Sawndip
  return null;}
function surfScript(s){const cnt={};for(const ch of String(s)){const sc=script(ch);if(sc)cnt[sc]=(cnt[sc]||0)+1;}let best=null,bn=0;for(const[k,v] of Object.entries(cnt)){if(v>bn){bn=v;best=k;}}return best;}
const CHECK=process.argv.includes("--check");

// Two tiers, one defect. A minority script in a row is either a stray cell
// (<=3) or a row that never finished being converted (4+). The old code
// dropped the second silently — `if(n>3)continue;` — on the theory that more
// than three cells must be deliberate. Tai Dam is why that theory is wrong: 9
// of its 45 surfaces sat in untransliterated Latin (earth i name rain snow
// stone we wheel white) among 35 in Tai Viet, and the cap said nothing. The
// bigger the leak, the quieter this guard was.
//
// Japonic orthography genuinely mixes kanji and kana, and every ja_* row does
// it. That is the one exemption, and it is a rule rather than a list.
const JAPONIC=/^(ja|ja_[a-z0-9]+)$/;
function japonicMix(code,dom,sc){
  if(!JAPONIC.test(code))return false;
  const kana=x=>x==="Hiragana"||x==="Katakana";
  return (dom==="Han"&&kana(sc))||(kana(dom)&&(sc==="Han"||kana(sc)));
}

const flags=[],partial=[];
for(const[code,d] of Object.entries(LD)){
  const per={},wScr={};
  // A cell is either [surface, ipa] or a rich {form, ipa, …} evidence object.
  // Reading e[0] on the 22 rich cells yielded undefined, which stringifies to the
  // Latin word "undefined" — that is where `och / n99 = undefined  (Latin among
  // Han×56)` came from. A checker defect, not a data one (2026-08-30 review).
  const surfOf = (e) => (Array.isArray(e) ? e[0] : (e && e.form));
  for(const w of WORDS){const e=W[w].data[code];const sf=surfOf(e);if(!sf||sf==='—')continue;const b=surfScript(sf);if(!b)continue;wScr[w]=b;per[b]=(per[b]||0)+1;}
  const scripts=Object.entries(per).sort((a,b)=>b[1]-a[1]);if(scripts.length<2)continue;
  const[dom,domN]=scripts[0];if(domN<5)continue;
  for(const[sc,n] of scripts.slice(1)){
    if(dom==="Han"&&(sc==="Hiragana"||sc==="Katakana")&&!JAPONIC.test(code))continue; // zh/ko rows quoting kana
    if(japonicMix(code,dom,sc))continue;
    const words=Object.entries(wScr).filter(([w,ws])=>ws===sc).map(([w])=>w)
      .filter(w=>!EXCEPTIONS.has(code+"|"+w));
    if(!words.length)continue;
    if(n>3){partial.push({code,name:d.name,outlier:sc,n,dom,domN,words});continue;}
    for(const w of words)flags.push({code,name:d.name,word:w,surface:surfOf(W[w].data[code]),outlier:sc,dom,domN});
  }
}
const partialCells=partial.reduce((a,p)=>a+p.words.length,0);

if(CHECK){
  console.log("stray-script surfaces: "+flags.length);
  console.log("partially-converted rows: "+partial.length+" ("+partialCells+" cells)");
  for(const f of flags)console.log("  "+f.code+" / "+f.word+" = "+JSON.stringify(f.surface)+"  ("+f.outlier+" among "+f.dom+"×"+f.domN+")");
  for(const p of partial)console.log("  * "+p.code+" "+p.name+": "+p.outlier+"×"+p.n+" among "+p.dom+"×"+p.domN+" — "+p.words.join(" "));
  process.exit(0);
}
console.log("script consistency — a surface must be written in its row's script\n");
console.log("STRAY (<=3 cells in a foreign script): "+flags.length);
for(const f of flags)console.log("  "+f.code+" / "+f.word+" = "+JSON.stringify(f.surface)+"  ("+f.outlier+" among "+f.dom+"×"+f.domN+")");
console.log("\nPARTIALLY CONVERTED (4+ cells, the tier the old cap hid): "+partial.length+" row(s), "+partialCells+" cells");
for(const p of partial)console.log("  "+p.code.padEnd(10)+String(p.name).slice(0,26).padEnd(27)+p.outlier+"×"+p.n+" among "+p.dom+"×"+p.domN+"\n"+" ".repeat(12)+p.words.join(" "));
