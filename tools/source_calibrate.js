#!/usr/bin/env node
/**
 * source_calibrate.js — before you copy a form out of a comparative dataset,
 * check that the dataset row is actually the same language as the atlas row.
 *
 * Prints, side by side, the atlas row's existing cells for ~40 concepts and the
 * SAME source doculect's values for those concepts. If they agree on most of
 * them, the join is sound and you can trust the one cell you actually wanted.
 * If they disagree on half, you are looking at a different doculect — or a
 * different language.
 *
 * Written by the agent that filled `wind` on 2026-08-29, which reported that
 * this killed about a third of its candidates outright and settled the
 * orthography for most of the rest. Promoted out of scratch because every
 * concept pass since has hit the same class of problem:
 *
 *   ABVD's "Bulu" is bjl, Bulu of Papua New Guinea, not Cameroonian bum.
 *   TransNewGuinea's "Mende" is sim, Mende of PNG, not Sierra Leonean men.
 *   ABVD's only jya doculect is Japhug, not Situ rGyalrong.
 *   tuled's asu is Asuriní Tocantins, not Bantu Asu.
 *   ASJP/iecor's "Walliser German" rows are Bernese.
 *
 * It also catches the subtler case the name check cannot: a source that IS the
 * right language but a different variety, where half the basic vocabulary
 * quietly disagrees with the row you are filling.
 *
 * The datasets live in ~/langmap-work (durable; /tmp is tmpfs and loses them).
 * Note for the next pass: ASJP, Polyglotta Africana, Williamson and dravlex
 * carry no WIND concept at all, so absence there means nothing.
 *
 * Usage:
 *   node tools/source_calibrate.js <concept> <code>:<DATASET>:<doculect regex> ...
 *   node tools/source_calibrate.js wind bnn:ABVD:Bunun ale:NEL:Aleut
 */
const fs=require('fs'),vm=require('vm'),path=require('path');
const D='/home/jounlai/langmap-work/',ROOT=path.resolve(__dirname,'..')+'/';
function parseCSV(t){const rows=[];let f='',r=[],q=false;for(let i=0;i<t.length;i++){const c=t[i];
 if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=c}
 else{if(c==='"')q=true;else if(c===','){r.push(f);f=''}else if(c==='\n'){r.push(f);rows.push(r);r=[];f=''}else if(c!=='\r')f+=c}}
 if(f!==''||r.length){r.push(f);rows.push(r)}return rows}
function load(p){const rows=parseCSV(fs.readFileSync(D+p,'utf8'));const h=rows[0];return rows.slice(1).filter(r=>r.length>1).map(r=>{const o={};h.forEach((k,i)=>o[k]=r[i]);return o})}
// atlas
const wc=vm.createContext({});vm.runInContext('this.window=this;this.WORDS=window.WORDS={};',wc);
for(const f of fs.readdirSync(ROOT+'words').filter(f=>f.endsWith('.js'))){try{vm.runInContext(fs.readFileSync(ROOT+'words/'+f,'utf8'),wc,{filename:f})}catch(e){}}
const W=wc.WORDS;
const cell=(id,k)=>{const e=W[id]&&W[id].data?W[id].data[k]:null;if(!e)return null;const s=Array.isArray(e)?e[0]:e.form,i=Array.isArray(e)?e[1]:e.ipa;return s&&!/^[\s—–-]*$/.test(s)?s+' /'+i+'/':null};
const CONC=['rain','water','moon','fire','stone','night','sun','tree','bone','ear','nose','eye','bird','egg','snow','tongue','tooth','star','earth','name','black','white','red','good','five','two','three','one','hand','heart','blood','dog','fish','mother','father','house','sleep','eat','drink'];

const MAPS={
 IDS:{l:'ids_lang.csv',f:'ids_forms.csv',p:{wind:'1-720',rain:'1-73',water:'1-31',moon:'1-32',fire:'1-81',stone:'1-21',night:'1-63',sun:'1-3',sky:'1-1',air:'1-4',breath:'4-32'}},
 NEL:{l:'b_northeuralex_l.csv',f:'b_nel_f.csv',p:{wind:'61_wind'}},
 ABVD:{l:'al3_abvd_lang.csv',f:'al3_abvd_forms.csv',p:{wind:'136_wind'}},
 TNG:{l:'b_transnewguineaorg_l.csv',f:'b_tng_f.csv',p:{wind:'200_wind'}},
 LAM:{l:'b_lam_l.csv',f:'b_lam_f.csv',p:{wind:'12_wind'}},
 SUNTB:{l:'snow316_suntb_lang.csv',f:'snow316_suntb_forms.csv',p:{wind:'7_wind'}},
 WOLD:{l:'snow316_wold_lang.csv',f:'snow316_wold_forms.csv',p:{wind:'1-72'}},
 GRAV:{l:'b_gravinachadic_l.csv',f:'we0194_grav_forms.csv',p:{wind:'695_wind'}},
 KRAFT:{l:'b_kraftchadic_l.csv',f:'b_kraft_f.csv',p:{wind:'112_wind'}},
};
// build param name index per dataset from its param file
const PARF={IDS:'ids_par.csv',NEL:'b_northeuralex_p.csv',ABVD:'al3_abvd_par.csv',TNG:'b_transnewguineaorg_p.csv',LAM:'b_lam_p.csv',SUNTB:'snow316_suntb_par.csv',WOLD:'snow316_wold_par.csv',GRAV:'b_gravinachadic_p.csv',KRAFT:'b_kraftchadic_p.csv'};
const GLOSS={rain:'RAIN (PRECIPITATION)|RAIN',water:'WATER',moon:'MOON',fire:'FIRE',stone:'STONE',night:'NIGHT',sun:'SUN',tree:'TREE',bone:'BONE',ear:'EAR',nose:'NOSE',eye:'EYE',bird:'BIRD',egg:'EGG',snow:'SNOW',tongue:'TONGUE',tooth:'TOOTH',star:'STAR',earth:'EARTH (SOIL)|SOIL',name:'NAME',black:'BLACK',white:'WHITE',red:'RED',good:'GOOD',five:'FIVE',two:'TWO',three:'THREE',one:'ONE',hand:'HAND',heart:'HEART',blood:'BLOOD',dog:'DOG',fish:'FISH',mother:'MOTHER',father:'FATHER',house:'HOUSE',sleep:'SLEEP',eat:'EAT',drink:'DRINK',wind:'WIND',sky:'SKY',air:'AIR',breath:'BREATH|BREATHE'};
// First argument is the concept being filled; the rest are candidates.
const TARGET = process.argv[2];
const args = process.argv.slice(3);   // code:DATASET:doculectRegex
if (!TARGET || !args.length) {
  console.log([
    'source_calibrate.js — is this dataset row really this language?',
    '',
    'Usage:  node tools/source_calibrate.js <concept> <code>:<DATASET>:<doculect regex> ...',
    'e.g.    node tools/source_calibrate.js wind bnn:ABVD:Bunun  ale:NEL:Aleut',
    '',
    'Datasets: ' + Object.keys(MAPS).join(' '),
    'Concepts: ' + Object.keys(GLOSS).join(' '),
  ].join('\n'));
  process.exit(0);
}
const cacheL={},cacheF={},cacheP={};
function pset(tag){if(cacheP[tag])return cacheP[tag];const rows=load(PARF[tag]);const m={};
 for(const k in GLOSS){const re=new RegExp('^('+GLOSS[k]+')$','i');const hit=rows.filter(r=>re.test(r.Concepticon_Gloss||''));if(hit.length)m[k]=hit.map(h=>h.ID)}
 return cacheP[tag]=m}
for(const a of args){
 const [code,tag,dre]=a.split(':');
 const M=MAPS[tag];if(!M){console.log('?? '+a);continue}
 const langs=cacheL[tag]||(cacheL[tag]=load(M.l));
 const forms=cacheF[tag]||(cacheF[tag]=load(M.f));
 const P=pset(tag);
 const re=new RegExp(dre,'i');
 const sel=langs.filter(l=>re.test(l.Name||''));
 const ids=new Set(sel.map(l=>l.ID));
 const LI={};for(const l of sel)LI[l.ID]=l.Name;
 const byP={};
 for(const f of forms){if(!ids.has(f.Language_ID))continue;(byP[f.Parameter_ID]=byP[f.Parameter_ID]||[]).push(LI[f.Language_ID]+'='+f.Value)}
 console.log('==== '+code+'  ['+tag+'] '+sel.map(s=>s.Name).join(' | '));
 for(const c of [TARGET].concat(CONC.filter(x=>x!==TARGET))){
  const pid=(P[c]||[]);const vals=[].concat(...pid.map(p=>byP[p]||[]));
  const at=cell(c,code);
  if(!vals.length&&!at)continue;
  console.log('  '+c.padEnd(8)+' atlas: '+(at||'-').padEnd(34)+' src: '+[...new Set(vals)].join('; ').slice(0,120));
 }
}
