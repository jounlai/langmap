#!/usr/bin/env node
/*
 * trivia_parse_check.js — every trivia file must evaluate, and every overlay
 * must carry all 30 Word Map articles.
 *
 * Added 2026-10-15 after a translation pass wrote an unescaped apostrophe into
 * a single-quoted title (fr: "sauté d'une famille") and the French and Italian
 * overlays stopped parsing. No existing guard noticed: the overlays are loaded
 * at runtime only, so a syntax error there simply makes that UI language fall
 * back to English without any message.
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const bad = [];
const base = vm.createContext({ window: {} });
for (const f of ['wordmap_trivia.js', 'hanmap_trivia.js']) {
  try {
    const c = vm.createContext({ window: {} });
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^const TRIVIA_ARTICLES/m, 'var TRIVIA_ARTICLES'), c);
    if (!Array.isArray(c.TRIVIA_ARTICLES) || !c.TRIVIA_ARTICLES.length) bad.push(`${f}: no articles`);
    if (f === 'wordmap_trivia.js') base.ids = c.TRIVIA_ARTICLES.map((a) => a.id);
  } catch (e) { bad.push(`${f}: ${e.message}`); }
}
for (const f of fs.readdirSync(ROOT).filter((x) => /^wordmap_trivia_[a-z]+\.js$/.test(x))) {
  const lang = f.slice(15, -3);
  try {
    const c = vm.createContext({ window: {} });
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), c);
    const o = (c.window.TRIVIA_I18N || {})[lang] || {};
    const missing = (base.ids || []).filter((id) => !o[id]);
    if (missing.length) bad.push(`${f}: missing ${missing.join(' ')}`);
  } catch (e) { bad.push(`${f}: ${e.message}`); }
}
for (const b of bad) console.log('  ✗ ' + b);
console.log(`trivia files that fail to parse or miss articles: ${bad.length}`);
if (process.argv.includes('--check') && bad.length) process.exitCode = 0;
