#!/usr/bin/env node
// trivia_dup_sentence_check.js — a translation repair can paste back a sentence or paragraph that was
// already there (4e305ae7f printed 51 sentences twice across 14 languages; rally 2026-11-14, review 31).
// No other guard reads for that. This one flags, in every trivia article of all four maps and every
// language: (1) a span of 15+ characters ending in sentence punctuation repeated immediately, and
// (2) a <p>/<li>/<h3>/<blockquote> block whose text appears twice in the same article text.
// Usage: node tools/trivia_dup_sentence_check.js [--check]   (prints "violations: N")
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const arts = [];
function loadBase(f) {
    const c = vm.createContext({ window: {}, console });
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^const TRIVIA_ARTICLES/m, 'var TRIVIA_ARTICLES'), c);
    return c;
}
for (const f of ['hanmap_trivia.js', 'namemap_trivia.js', 'timemap_trivia.js']) {
    for (const a of loadBase(f).TRIVIA_ARTICLES) arts.push({ file: f, id: a.id, title: a.title, summary: a.summary, body: a.body });
}
{
    const c = loadBase('wordmap_trivia.js');
    for (const f of fs.readdirSync(ROOT).filter(x => /^wordmap_trivia_[a-z]+\.js$/.test(x))) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), c);
    const ov = c.window.TRIVIA_I18N || {};
    for (const a of c.TRIVIA_ARTICLES) {
        const o = { file: 'wordmap_trivia*.js', id: a.id, title: { ...a.title }, summary: { ...a.summary }, body: { ...a.body } };
        for (const [l, m] of Object.entries(ov)) if (m[a.id]) for (const k of ['title', 'summary', 'body']) if (m[a.id][k]) o[k][l] = m[a.id][k];
        arts.push(o);
    }
}
const out = [];
const strip = s => s.replace(/<[^>]+>/g, '').trim();
for (const a of arts) for (const k of ['title', 'summary', 'body']) for (const [l, t] of Object.entries(a[k] || {})) {
    if (typeof t !== 'string') continue;
    for (const m of t.matchAll(/((?:[^<>]|<\/?(?:em|strong)>){15,400}?[.。!?！？।۔;；]|\s?)\s?\1/gu)) {
        if (strip(m[1]).length < 12) continue;
        out.push(`${a.file} ${a.id} ${l} ${k}: repeated "${strip(m[1]).slice(0, 60)}"`);
    }
    const seen = new Map();
    for (const m of t.matchAll(/<(p|li|h3|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
        const inner = m[2].trim(); if (strip(inner).length < 15) continue;
        if (seen.has(inner)) out.push(`${a.file} ${a.id} ${l} ${k}: block twice "${strip(inner).slice(0, 60)}"`); else seen.set(inner, 1);
    }
}
if (!process.argv.includes('--check') || out.length) out.slice(0, 40).forEach(x => console.log('  ' + x));
console.log(`articles: ${arts.length}`);
console.log(`violations: ${out.length}`);
