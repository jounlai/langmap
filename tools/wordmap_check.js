#!/usr/bin/env node
/*
 * wordmap_check.js — deterministic integrity guard for WordMap (words/*.js).
 *
 *   DUP_KEY   a language code used ≥2× inside one word's `data` block (raw-text,
 *             depth-aware — JS object parsing would silently dedupe). Regression
 *             guard for the 919 duplicate keys removed earlier.
 *   BAD_SHAPE a cell that is neither [surface, ipa] (2 non-empty strings) nor a
 *             rich {form, ipa, …} evidence object.
 *   GAP       a cell with an empty surface or ipa.
 *
 * Diagnostic only. Run: node tools/wordmap_check.js
 */
const fs = require('fs'), vm = require('vm'), path = require('path');
const DIR = path.join(__dirname, '..', 'words');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js'));

// Line comments are stripped before any of this runs. The scan is raw-text, so a
// comment reads exactly like source: `// --- Turkic: one word ...` was counted as
// a key named `Turkic`, and `hit: [...],  // cuneiform mi-li-it: IT sign missing`
// as a second `it`. Both fired as DUP_KEY against real keys elsewhere in the file
// (2026-08-29, three times in one afternoon). A comment can also carry an unpaired
// brace, which would desynchronise the depth counter, so strip first and scan after.
function stripLineComments(txt) {
  let out = '', inStr = false, q = '', esc = false;
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (inStr) {
      out += c;
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === q) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; q = c; out += c; continue; }
    if (c === '/' && txt[i + 1] === '/') {          // run to end of line, keep the newline
      while (i < txt.length && txt[i] !== '\n') i++;
      out += '\n';
      continue;
    }
    out += c;
  }
  return out;
}

// --- raw-text duplicate-key scan inside each word's `data: { ... }` block
function dataBlock(rawTxt) {
  const txt = stripLineComments(rawTxt);
  const m = /(?:^|[^A-Za-z_])data\s*:\s*\{/.exec(txt);
  if (!m) return null;
  const open = txt.indexOf('{', m.index);
  let d = 0, inStr = false, esc = false, q = '';
  for (let i = open; i < txt.length; i++) {
    const c = txt[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (inStr) { if (c === q) inStr = false; continue; }
    if (c === '"' || c === "'") { inStr = true; q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) return { body: txt.slice(open + 1, i), start: open }; }
  }
  return null;
}
function topKeys(body) { // keys at relative depth 0 of the data object body
  const keys = []; let d = 0, inStr = false, esc = false, q = '', expectKey = true, buf = '';
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (inStr) { if (c === q) inStr = false; else if (d === 0 && expectKey) buf += c; continue; }
    if (c === '"' || c === "'") { inStr = true; q = c; if (d === 0 && expectKey) buf = ''; continue; }
    if (c === '{' || c === '[' || c === '(') { d++; continue; }
    if (c === '}' || c === ']' || c === ')') { d--; continue; }
    if (d === 0) {
      if (c === ':' && expectKey) { if (buf.trim()) keys.push(buf.trim()); expectKey = false; buf = ''; }
      else if (c === ',') { expectKey = true; buf = ''; }
      else if (expectKey && /[A-Za-z0-9_]/.test(c)) buf += c;
      else if (expectKey && !/\s/.test(c)) buf = ''; // reset on stray char
    }
  }
  return keys;
}

const dupHits = [];
for (const f of files) {
  const txt = fs.readFileSync(path.join(DIR, f), 'utf8');
  const blk = dataBlock(txt); if (!blk) { console.log(`! ${f}: no data block`); continue; }
  const keys = topKeys(blk.body);
  const seen = {}; for (const k of keys) seen[k] = (seen[k] || 0) + 1;
  for (const [k, n] of Object.entries(seen)) if (n > 1) dupHits.push({ file: f, key: k, count: n });
}

// --- shape / gap scan via parsed objects
const ctx = {}; vm.createContext(ctx); ctx.window = ctx; ctx.WORDS = {};
for (const f of files) vm.runInContext(fs.readFileSync(path.join(DIR, f), 'utf8'), ctx);
const W = ctx.WORDS;
const badShape = [], gaps = []; let cells = 0;
for (const wd of Object.keys(W)) {
  const d = W[wd].data || {};
  for (const l of Object.keys(d)) {
    cells++; const c = d[l];
    if (Array.isArray(c)) {
      if (c.length !== 2 || typeof c[0] !== 'string' || typeof c[1] !== 'string') badShape.push({ word: wd, lang: l, val: JSON.stringify(c).slice(0, 60) });
      else if (!c[0] || !c[1]) gaps.push({ word: wd, lang: l, val: JSON.stringify(c) });
    } else if (c && typeof c === 'object') {
      if (!c.form || !c.ipa) badShape.push({ word: wd, lang: l, val: 'object missing form/ipa: ' + JSON.stringify(c).slice(0, 60) });
    } else badShape.push({ word: wd, lang: l, val: JSON.stringify(c) });
  }
}

const report = (name, list, fmt) => { console.log(`${name}: ${list.length}`); for (const x of list.slice(0, 40)) console.log('   ' + fmt(x)); if (list.length > 40) console.log(`   …(+${list.length - 40})`); console.log(''); };
console.log(`Scanned ${files.length} word files, ${cells} cells.\n`);
report('DUP_KEY (duplicate lang code in a data block)', dupHits, h => `${h.file}  ${h.key} ×${h.count}`);
report('BAD_SHAPE', badShape, h => `${h.word}/${h.lang}  ${h.val}`);
report('GAP (empty surface or ipa)', gaps, h => `${h.word}/${h.lang}  ${h.val}`);
fs.writeFileSync('/tmp/wordmap_issues.json', JSON.stringify({ dupHits, badShape, gaps }, null, 1));
console.log(`actionable: ${dupHits.length + badShape.length + gaps.length}`);
