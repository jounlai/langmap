#!/usr/bin/env node
/*
 * row_dup_check.js — within ONE language row, two different concepts holding an
 * identical surface form.
 *
 * Origin: the 2026-08-24 `white` fill. Three rows turned out to have a cell
 * holding the wrong concept's word, and each was found the same way — the new
 * `white` cell came out byte-identical to a cell already in that row:
 *   toi Tonga      red = salala      (salala is WHITE; red is subila)
 *   toc Totonac    red = snapapa     (snapapa is WHITE; red is tsutsokgo)
 *   gym Ngäbere    sun = ngwen       (ngwen is WHITE; sun is ñänä)
 * A fourth, blk Pa'O, shows up here as red = two = we, all နီ — which is Pa'O
 * for "two".
 *
 * ADVISORY, NOT BLOCKING. Real homophony is common and most hits are genuine:
 * Austronesian lima = five/hand, Bambara i ni ce = hello/thanks, Persian
 * خواردن = eat/drink. Read it as a lead list, not a defect list. A few
 * legitimately-shared pairs are suppressed below; extend that set rather than
 * silencing a row.
 *
 * Run:  node tools/row_dup_check.js
 */
// identical surface is almost always a mis-glossed source (toc red=white,
// gym sun=white, toi red=white were all found this way).
const fs=require('fs'); const ROOT='/home/jounlai/langmap';
const ws=fs.readdirSync(ROOT+'/words').filter(f=>f.endsWith('.js')).map(f=>f.replace(/\.js$/,''));
const D={}; for(const w of ws){const W={};new Function('WORDS',fs.readFileSync(ROOT+'/words/'+w+'.js','utf8'))(W);D[w]=(W[w]&&W[w].data)||{};}
// concept pairs that legitimately share a form in many languages
const OK=new Set(['sun|moon','sun|day','eye|face','tree|wood','hand|arm','fire|light',
                  'i|we','you|we','poop|drink','eat|drink','rain|water','snow|white']);
const rows={};
for(const w of ws) for(const [c,v] of Object.entries(D[w])){
  if(!v[0]||v[0]==='—') continue;
  (rows[c]=rows[c]||{})[w]=v[0];
}
const out=[];
for(const [c,m] of Object.entries(rows)){
  const by={};
  for(const [w,s] of Object.entries(m)) (by[s]=by[s]||[]).push(w);
  for(const [s,list] of Object.entries(by)){
    if(list.length<2) continue;
    const key=list.slice().sort().join('|');
    if(OK.has(key)) continue;
    out.push(`${c.padEnd(12)} ${list.join(' = ')}   "${s}"`);
  }
}
console.log('rows where two concepts share one form: '+out.length);
out.sort().forEach(x=>console.log('  '+x));
