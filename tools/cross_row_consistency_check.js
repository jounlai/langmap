#!/usr/bin/env node
/*
 * cross_row_consistency_check.js — deterministic per-language consistency audit.
 *
 * A language row in words/ is written by many hands over many sessions, so the
 * classic defect is not a wrong word but an INCONSISTENT one: a cell in the
 * wrong script for that row, a tone left off in a row that marks tones (or a
 * tone added in a row that never does), or the same surface sitting in two
 * different concepts (the copy-paste tell).
 *
 * For every language, the OTHER concepts define the row's convention; each
 * concept under test is then compared against it:
 *   script  — cell's script block vs the row's majority script
 *   tone    — Chao tone letters present/absent vs the row's habit (>=70% / 0%)
 *   dup     — identical surface shared with a different concept in the same row
 *
 * Genuine homophony exists (Norwegian tre = three/tree, Ainu re = three/name,
 * Tibeto-Burman ŋa = fish/I), so `dup` is a REVIEW list, not an error list.
 *
 * Usage: node tools/cross_row_consistency_check.js [word ...]
 *        (no args = audit every concept against all the others)
 */
const fs=require('fs'),vm=require('vm'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const ctx={WORDS:{},window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(ROOT+'/word_manifest.js','utf8')+'\nthis.ORD=WORD_ORDER;',ctx);
for(const f of fs.readdirSync(ROOT+'/words')) vm.runInContext(fs.readFileSync(ROOT+'/words/'+f,'utf8'),ctx);
const LANG_DATA=(0,eval)(fs.readFileSync(ROOT+'/wordmap_data.js','utf8').replace(/^const /gm,'var ')+';LANG_DATA');
const ARGS=process.argv.slice(2);
const NEW=ARGS.length?ARGS:ctx.ORD.slice();
// With no args every concept is audited, so each one must be compared against
// the OTHERS rather than against an empty set.
const othersOf=w=>ctx.ORD.filter(x=>x!==w);
const OLD=ARGS.length?ctx.ORD.filter(w=>!NEW.includes(w)):null;
const form=v=>Array.isArray(v)?v[0]:(v&&v.form)||'';
const ipa =v=>Array.isArray(v)?v[1]:(v&&v.ipa)||'';
// --- script blocks
const BLOCKS=[['Latin',/[A-Za-zÀ-ÖØ-öø-ɏ]/],['Cyrillic',/[Ѐ-ӿԀ-ԯ]/],['Greek',/[Ͱ-Ͽἀ-῿]/],
 ['Arabic',/[؀-ۿݐ-ݿ]/],['Hebrew',/[֐-׿]/],['Devanagari',/[ऀ-ॿ]/],['Bengali',/[ঀ-৿]/],
 ['Gurmukhi',/[਀-੿]/],['Gujarati',/[઀-૿]/],['Oriya',/[଀-୿]/],['Tamil',/[஀-௿]/],
 ['Telugu',/[ఀ-౿]/],['Kannada',/[ಀ-೿]/],['Malayalam',/[ഀ-ൿ]/],['Sinhala',/[඀-෿]/],
 ['Thai',/[฀-๿]/],['Lao',/[຀-໿]/],['Tibetan',/[ༀ-࿿]/],['Myanmar',/[က-႟]/],
 ['Georgian',/[Ⴀ-ჿ]/],['Ethiopic',/[ሀ-፿]/],['Khmer',/[ក-៿]/],['Mongolian',/[᠀-᢯]/],
 ['Han',/[㐀-鿿豈-﫿]|[\uD840-\uD87F][\uDC00-\uDFFF]/],['Kana',/[぀-ヿ]/],['Hangul',/[가-힯ᄀ-ᇿ]/],
 ['Cherokee',/[Ꭰ-᏿]/],['Canadian',/[᐀-ᙿ]/],['Tifinagh',/[ⴰ-⵿]/],['Yi',/[ꀀ-꒏]/],
 ['Syriac',/[܀-ݏ]/],['Thaana',/[ހ-޿]/],['Javanese',/[ꦀ-꧟]/],['Limbu',/[ᤀ-᥏]/],
 ['NewTaiLue',/[ᦀ-᧟]/],['TaiViet',/[ꪀ-꫟]/],['Cham',/[ꨀ-꩟]/],['Lepcha',/[ᰀ-ᱏ]/],
 ['Meetei',/[ꯀ-꯿]/],['Olchiki',/[᱐-᱿]/],['Tagalog',/[ᜀ-ᜟ]/],['Lisu',/[ꓐ-꓿]/],
 ['Sundanese',/[ᮀ-ᮿ]/],['Batak',/[ᯀ-᯿]/],['Runic',/[ᚠ-᛿]/],['Gothic',/[\uD800][\uDF30-\uDF4F]/],
 ['Cuneiform',/[\uD808-\uD809][\uDC00-\uDFFF]/],['Egyptian',/[\uD80C-\uD80D][\uDC00-\uDFFF]/],['Coptic',/[Ⲁ-⳿]/],
 ['Brahmi',/[\uD804][\uDC00-\uDC7F]/],['Avestan',/[\uD802][\uDF00-\uDF3F]/],['OldPersian',/[\uD800][\uDFA0-\uDFDF]/],
 ['Phoenician',/[\uD802][\uDD00-\uDD1F]/],['Ugaritic',/[\uD800][\uDF80-\uDF9F]/],['OldTurkic',/[\uD803][\uDC00-\uDC4F]/],
 ['LinearB',/[\uD800][\uDC00-\uDC7F]/],['Mandaic',/[ࡀ-࡟]/],['Tangut',/[\uD81C-\uD821][\uDC00-\uDFFF]/],['Nko',/[߀-߿]/]];
// Japanese mixes Han+Kana and Korean mixes Hangul+Han by design, so those
// pairs are one writing system for this audit, not two.
const MERGE={Kana:'JpMix',Han:'JpMix',Hangul:'JpMix'};
const scripts=s=>[...new Set(BLOCKS.filter(([n,re])=>re.test(s)).map(([n])=>MERGE[n]||n))];
const TONE=/[˥-˩]/;
const STRESS=/[ˈˌ]/;
const out={script:[],tone:[],dup:[],stress:[],emptyish:[]};
for(const code of Object.keys(LANG_DATA)){
  const baseFor=w=>(OLD||othersOf(w));
  const anyCells=baseFor(NEW[0]).map(x=>ctx.WORDS[x]&&ctx.WORDS[x].data[code]).filter(Boolean);
  if(!anyCells.length) continue;
  for(const w of NEW){
    const oldCells=baseFor(w).map(x=>ctx.WORDS[x]&&ctx.WORDS[x].data[code]).filter(Boolean);
    if(!oldCells.length) continue;
    const tally={};
    for(const c of oldCells){const f=form(c); if(f==='—')continue; for(const s of scripts(f)) tally[s]=(tally[s]||0)+1;}
    const total=oldCells.filter(c=>form(c)!=='—').length;
    const common=Object.entries(tally).filter(([,n])=>n>=total*0.6).map(([s])=>s);
    const toneRows=oldCells.filter(c=>TONE.test(ipa(c))).length;
    const cell=ctx.WORDS[w].data[code]; if(!cell)continue;
    const f=form(cell), i=ipa(cell);
    if(f==='—') continue;
    const sc=scripts(f);
    if(common.length && sc.length && !sc.some(s=>common.includes(s)))
      out.script.push(`${code}/${w}: "${f}" is ${sc.join('+')||'?'} but this row is normally ${common.join('+')}`);
    if(toneRows>=total*0.7 && !TONE.test(i))
      out.tone.push(`${code}/${w}: row marks Chao tones on ${toneRows}/${total} old cells but "${i}" has none`);
    if(toneRows===0 && TONE.test(i))
      out.tone.push(`${code}/${w}: row never marks Chao tones but "${i}" does`);
    // intra-row duplicate against a DIFFERENT concept
    for(const ow of baseFor(w)){
      const oc=ctx.WORDS[ow]&&ctx.WORDS[ow].data[code]; if(!oc)continue;
      if(form(oc)!=='—' && form(oc)===f) out.dup.push(`${code}: ${w} and ${ow} are both "${f}"`);
    }
    if(!i||!f) out.emptyish.push(`${code}/${w}: empty field`);
  }
}
for(const k of Object.keys(out)){
  console.log(`\n=== ${k} (${out[k].length}) ===`);
  console.log(out[k].slice(0,200).join('\n'));
  if(out[k].length>200) console.log(`… ${out[k].length-200} more`);
}
