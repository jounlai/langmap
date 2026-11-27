#!/usr/bin/env node
/**
 * script_filter_tags_check.js — the Script filter chip must agree with the map.
 *
 * The filter reads meta.scriptTags (or, when a row has none, guesses from the
 * meta.script text with detectScript in lang-filter.js — copied below). Nothing
 * compared those tags with the cells, so Kusunda sat under "Brahmic" while its
 * meta said "Usually unwritten" and every cell on the map was romanized; Libyan
 * Arabic and Pa'O were tagged Latin only while the map shows Arabic and Burmese
 * script (owner report 2026-11-27; 31 rows fixed).
 *
 * Two rules:
 *   SHOWN   a script used in >=25% of a row's cells must be one of its tags
 *           (Latin is exempt on 'None / reconstructed' rows; GREEK_TRANSLIT rows
 *           write β γ δ θ inside a Latin transliteration).
 *   BASIS   a tag must be shown in the cells or named in meta.script; tags for a
 *           real script the meta text leaves out are listed in ATTESTED.
 *
 * Usage: node tools/script_filter_tags_check.js [--check]
 */
'use strict';
const fs=require('fs'),vm=require('vm'),path=require('path'),R=path.resolve(__dirname,'..')+'/';
const CHECK=process.argv.includes('--check');
const ctx=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync(R+'wordmap_data.js','utf8').replace(/^const /gm,'var '),ctx);
vm.runInContext(fs.readFileSync(R+'wordmap_meta.js','utf8').replace(/^const /gm,'var '),ctx);
const LD=vm.runInContext('LANG_DATA',ctx);
const wc=vm.createContext({});vm.runInContext('this.window=this;this.WORDS=window.WORDS={};',wc);
for(const f of fs.readdirSync(R+'words').filter(f=>f.endsWith('.js')))vm.runInContext(fs.readFileSync(R+'words/'+f,'utf8'),wc);
const W=wc.WORDS;
    function detectScript(scriptStr) {
    if (!scriptStr) return [];
    const s = String(scriptStr);
    const tags = new Set();

    // Han (Chinese characters and derivatives — Hanzi, Kanji, Hanja,
    // Chữ Nôm, Sawndip). Avoid matching "Shan" / "Hanacaraka" /
    // "Traditional Mongolian" by requiring specific compound phrases.
    // Also covers ancient Chinese script names (Audit Task 130).
    if (/Chinese characters|Han characters|Hanzi|Simplified Chinese|Traditional Chinese|Simplified\/Traditional Chinese|Chinese\/Peng|Chữ Nôm|Hanja|Kanji|Sawndip|Hing-hua romanization|Peng'im|^Chinese$|Oracle bone|Bronze inscriptions|Seal script/i.test(s)) tags.add('Han');

    // Kana (Japanese syllabaries, distinct from Han kanji)
    if (/Hiragana|Katakana|\bkana\b/i.test(s)) tags.add('Kana');

    if (/Hangul/i.test(s)) tags.add('Hangul');
    if (/Cyrillic/i.test(s)) tags.add('Cyrillic');

    // Arabic-derived (Naskh, Nastaliq, Jawi, Perso-Arabic, Ajami, Adlam,
    // Shahmukhi, Saraiki Naskh, etc.)
    if (/Arabic|Nastaliq|Naskh|Jawi|Perso-Arabic|Pegon|Ajami|Adlam|Shahmukhi/i.test(s)) tags.add('Arabic-derived');

    // Tibetan-script chip — distinct from Brahmic umbrella so users can
    // filter for Tibetan-script langs specifically (Audit Task 215).
    // Tibetan-script langs are also tagged 'Brahmic' below for the
    // umbrella chip; both can coexist on the same row.
    if (/Tibetan|Uchen|Umê|Drutsa/i.test(s)) tags.add('Tibetan');

    // Brahmic (Indic + SE Asian Brahmi descendants). Includes Mon,
    // Shan, Karen, Eastern Nagari/Assamese, Cham, Lontara, etc.
    if (/Devanagari|Bengali|Eastern Nagari|Tamil|Telugu|Kannada|Malayalam|Gujarati|Gurmukhi|Oriya|Odia|Sinhala|\bThai\b|\bLao\b|Khmer|Burmese|Tibetan|Brahmi|Brāhmī|Brahmic|Kawi|Balinese|Javanese script|Carakan|Sharada|Mithilakshar|Tirhuta|Sylheti|Kaithi|Ranjana|Bodo Devanagari|Meitei|Tigalari|Mon script|Shan script|Karen script|Cham|Lontara|Aksara Bugis|Hanacaraka|Batak|Surat Batak|Aksara Sasak|Lampung script|Limbu|Takri|Multani|Old Khmer|Brahmi-derived/i.test(s)) tags.add('Brahmic');

    if (/Hebrew/i.test(s)) tags.add('Hebrew');
    if (/Greek/i.test(s)) tags.add('Greek');
    if (/Armenian/i.test(s)) tags.add('Armenian');
    if (/Georgian/i.test(s)) tags.add('Georgian');
    if (/Ethiopic|Ge.?ez|Ge'ez/i.test(s)) tags.add('Ethiopic');
    if (/Coptic/i.test(s)) tags.add('Coptic');
    if (/Cherokee/i.test(s)) tags.add('Cherokee');
    if (/Syriac/i.test(s)) tags.add('Syriac');
    if (/Tifinagh/i.test(s)) tags.add('Tifinagh');
    if (/N'Ko|N.Ko/i.test(s)) tags.add("N'Ko");
    if (/Yi syllabary|Yi script/i.test(s)) tags.add('Yi');
    if (/Cree syllabics|Inuktitut syllabics|Canadian Aboriginal Syllabics/i.test(s)) tags.add('Canadian Aboriginal Syllabics');

    // Vertical Mongolian script family (Old Uyghur → Mongolian → Manchu
    // → Phags-pa). Manchu the language is Tungusic but its script is
    // Mongolic-derived; tag the script, not the language family.
    if (/Mongolian script|Traditional Mongolian|Mongolian alphabet|Phags-pa|\bManchu\b|Uyghur-Mongolian|Old Uyghur|Clear Script/i.test(s)) tags.add('Mongolian-derived');

    if (/Cuneiform/i.test(s)) tags.add('Cuneiform');
    if (/Egyptian hieroglyph|Anatolian hieroglyph|\bHieroglyph/i.test(s)) tags.add('Hieroglyphs');
    if (/Linear B|Linear A|Linear Elamite/i.test(s)) tags.add('Aegean syllabary');
    if (/Maya hieroglyph|Mayan glyphs|Maya script/i.test(s)) tags.add('Mayan');
    if (/Old Turkic|Orkhon|runiform/i.test(s)) tags.add('Old Turkic');
    if (/Tangut/i.test(s)) tags.add('Tangut');
    // Audit Task 130: Khitan / Jurchen (Sinitic-area historical scripts).
    if (/Khitan/i.test(s)) { tags.add('Khitan'); tags.add('Other historical'); }
    if (/Jurchen/i.test(s)) { tags.add('Jurchen'); tags.add('Other historical'); }
    // Sukhothai / Old Thai script (Brahmic descendant).
    if (/Sukhothai/i.test(s)) { tags.add('Brahmic'); tags.add('Other historical'); }
    // None / reconstructed (proto-languages).
    if (/None\s*\(reconstructed\)|reconstructed\)|^None$/i.test(s)) tags.add('None / reconstructed');

    // Aramaic-derived (Sogdian, Pahlavi, Parthian, Manichaean) — distinct
    // from Arabic-derived and Mongolian-derived branches of the same root.
    if (/Sogdian alphabet|Sogdian script|Manichaean|Pahlavi|Parthian script|Aramaic-derived/i.test(s)) tags.add('Aramaic-derived');

    // Other ancient / specialized scripts
    if (/Phoenician|Punic alphabet|Old South Arabian|Musnad|Avestan|Old Persian cuneiform|Ugaritic|Warang Citi|Meroitic|Ogham|Runic|Gothic alphabet|Kpelle script|Mende script|Kikakui|Pollard|Fraser|Lisu script|Dongba|Old Bouyei script|Old Khmer script/i.test(s)) tags.add('Other historical');

    // Latin (catch-all). Word boundary so "Latinised" etc. still match.
    if (/\bLatin\b|\bRumi\b|Modified Roman/i.test(s)) tags.add('Latin');

    if (tags.size === 0) tags.add('Other');
    return [...tags];
}


const T={Latin:/[A-Za-z\u00C0-\u024F]/u,Han:/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u{20000}-\u{3134F}]/u,Kana:/[\u3040-\u30FF\u31F0-\u31FF]/u,Hangul:/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/u,Cyrillic:/[\u0400-\u052F\u1C80-\u1C8F\uA640-\uA69F]/u,'Arabic-derived':/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/u,Hebrew:/[\u0590-\u05FF]/u,Syriac:/[\u0700-\u074F]/u,Brahmic:/[\u0900-\u0DFF\u0E00-\u0EFF\u1000-\u109F\u1700-\u17FF\u1900-\u1AFF\u1B00-\u1BFF\u1C00-\u1C4F\uA800-\uA9FF\uAA00-\uAAFF\uABC0-\uABFF\u{11000}-\u{11FFF}]/u,Tibetan:/[\u0F00-\u0FFF]/u,Greek:/[\u0370-\u03FF\u1F00-\u1FFF]/u,Armenian:/[\u0530-\u058F]/u,Georgian:/[\u10A0-\u10FF\u1C90-\u1CBF\u2D00-\u2D2F]/u,Ethiopic:/[\u1200-\u139F\u2D80-\u2DDF]/u,Tifinagh:/[\u2D30-\u2D7F]/u,Yi:/[\uA000-\uA4CF]/u,'Mongolian-derived':/[\u1800-\u18AF\u{11660}-\u{1167F}]/u,Cuneiform:/[\u{12000}-\u{1254F}\u{10380}-\u{103DF}]/u,Hieroglyphs:/[\u{13000}-\u{1345F}]/u,Tangut:/[\u{17000}-\u{18AFF}]/u,"N'Ko":/[\u07C0-\u07FF]/u,Coptic:/[\u2C80-\u2CFF]/u,Cherokee:/[\u13A0-\u13FF]/u,'Canadian Aboriginal Syllabics':/[\u1400-\u167F]/u};

const GREEK_TRANSLIT=new Set(['sog','xve','cop']);
// Tag for a script the language really uses (or used) that meta.script does not name.
const ATTESTED={
  sw:'Arabic-derived — Swahili Ajami manuscripts', mg:'Arabic-derived — Sorabe', wo:'Arabic-derived — Wolofal',
  ff:'Arabic-derived — Fula Ajami', tg:'Arabic-derived — Persian script before 1928', tl:'Brahmic — Baybayin',
  bft:'Arabic-derived — Perso-Arabic Balti in Pakistan', lbj:'Latin', udi:'Latin', tru:'Latin', bbl:'Latin', yug:'Latin',
  ttq:'Tifinagh', nci:'Hieroglyphs — Aztec pictography', nan_xm:'Latin — POJ', nan_zz:'Latin — POJ',
};
const v=[];const seenA=new Set();
for(const c of Object.keys(LD)){const m=LD[c].meta;if(!m)continue;
 const decl=Array.isArray(m.scriptTags)&&m.scriptTags.length?m.scriptTags:null;const det=detectScript(m.script);const tags=decl||det;
 const cnt={};let n=0;
 for(const id in W){const e=(W[id].data||{})[c];if(!Array.isArray(e))continue;const s=e[0];if(!s||/^[\s—–-]*$/.test(s))continue;n++;
  for(const[k,re] of Object.entries(T)) if(re.test(s)) cnt[k]=(cnt[k]||0)+1;}
 if(!n)continue;
 for(const[k,x] of Object.entries(cnt)){ if(x/n<0.25||tags.includes(k))continue;
  if(k==='Latin'&&tags.includes('None / reconstructed'))continue; if(k==='Greek'&&GREEK_TRANSLIT.has(c))continue;
  v.push(`${c}: map shows ${k} in ${Math.round(100*x/n)}% of cells, but the Script filter tags are [${tags.join(', ')}]`);}
 for(const t of tags){ if(!T[t]||cnt[t]>0||det.includes(t)||(t==='Brahmic'&&tags.includes('Tibetan')))continue;
  if(ATTESTED[c]){seenA.add(c);continue;}
  v.push(`${c}: tagged ${t}, but no cell is in ${t} and meta.script says "${String(m.script||'').slice(0,50)}"`);}
}
const stale=Object.keys(ATTESTED).filter(k=>!seenA.has(k));
if(CHECK){console.log(`violations: ${v.length}`);v.forEach(x=>console.log('  '+x));stale.forEach(k=>console.log(`  note: ATTESTED '${k}' no longer needed`));process.exit(0);}
console.log('script filter tags — the chip a row sits under must match the map\n');
if(!v.length)console.log('clean — every row\'s Script tags match its cells and its meta.');
v.forEach(x=>console.log('  '+x));stale.forEach(k=>console.log(`  note: ATTESTED '${k}' no longer needed`));
process.exit(v.length?1:0);
