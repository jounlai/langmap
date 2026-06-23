#!/usr/bin/env node
// Guard: localized language names should be uppercase-first in every cased UI
// (en, fr, de, es, it, pt, sw, vi, id, ru, uk) — the dataset's established
// convention (e.g. Anglais, Inglés, Английский, Tiếng …, Bahasa …). Also flags
// any leftover "undefined" in a name (a broken base-name lookup). Bulk language
// additions tend to reintroduce lowercase names, so run this after them.
const fs=require("fs"),vm=require("vm"),path=require("path");
const ROOT=path.resolve(__dirname,"..");
const c={};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(ROOT,"lang_names.js"),"utf8")+"\nthis.N=LANG_NAMES;",c);
const N=c.N;
const CASED=["en","fr","de","es","it","pt","sw","vi","id","ru","uk"];
const bad=[];
for(const ui of Object.keys(N)){
  for(const[code,name] of Object.entries(N[ui])){
    if(/undefined/i.test(name))bad.push(ui+"."+code+" = "+JSON.stringify(name)+"  (undefined in name)");
    else if(CASED.includes(ui)&&/^\p{Ll}/u.test(name))bad.push(ui+"."+code+" = "+JSON.stringify(name)+"  (lowercase first letter)");
  }
}
if(bad.length){
  console.error("✗ lang-name-case: "+bad.length+" issue(s):");
  for(const b of bad.slice(0,40))console.error("  "+b);
  if(bad.length>40)console.error("  …and "+(bad.length-40)+" more");
  process.exit(1);
}
console.log("✓ lang-name-case: all localized names uppercase-first, no 'undefined'");
