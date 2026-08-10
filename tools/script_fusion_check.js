#!/usr/bin/env node
/**
 * script_fusion_check.js — find words with two different non-Latin scripts
 * fused into them.
 *
 * Every trivia article body exists in 19 UI languages, and nobody reads all 19.
 * Two corruptions from the original generation pass sat in the tree unnoticed
 * until 2026-08-10:
 *
 *   th  hakka-diaspora-language      ...ที่ดูแลทополกต์ซินิติกเดียว
 *       the Thai rendering of "topolect" half-overwritten by Cyrillic
 *   hi  sino-vietnamese-han-viet     ...चीनी ध्वनि विज्ञान को놀랍도록 बनाए रखा है
 *       the Hindi adverb replaced by the Korean word 놀랍도록 "remarkably"
 *
 * Neither is visible to a spell-checker, an HTML validator or a reviewer who
 * reads only English and Japanese. Both are obvious the moment you ask whether
 * a single word mixes two writing systems.
 *
 * What counts as a hit: one whitespace-and-punctuation-delimited token
 * containing letters from two different non-Latin scripts. Latin is ignored —
 * transliterations and HTML entities legitimately mix it with everything.
 * Thai+Hangul and Arabic+Hangul pairs are ignored too: Thai writes without
 * spaces and Arabic glues its conjunction to the next word, so a Korean proper
 * noun quoted mid-sentence legitimately fuses with its neighbour there.
 *
 * A sentence quoting чай, شاي and चाय side by side is fine — that is the tea
 * article doing its job. The defect is two scripts inside ONE word.
 *
 * Usage:
 *   node tools/script_fusion_check.js          # full report
 *   node tools/script_fusion_check.js --check  # "fusions: N", exit 0
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

const RANGES = [
  ['CYRILLIC', /[Ѐ-ӿ]/],
  ['GREEK', /[Ͱ-Ͽ]/],
  ['HEBREW', /[֐-׿]/],
  ['ARABIC', /[؀-ۿݐ-ݿ]/],
  ['DEVANAGARI', /[ऀ-ॿ]/],
  ['THAI', /[฀-๿]/],
  ['HANGUL', /[가-힯ᄀ-ᇿ㄰-㆏]/],
];
// Pairs that legitimately fuse because one of the scripts does not use spaces.
const ALLOWED = new Set(['ARABIC+HANGUL', 'HANGUL+THAI']);

// Punctuation lives inside its script's Unicode block — the Devanagari danda
// ।, the Arabic comma ، — so a Korean letter followed by a danda would read as
// a Hangul+Devanagari fusion. Delimit on those too, or every quoted jamo in the
// Hindi article is a false positive.
const TOKEN = /[^\s<>"'/,.;:!?()[\]{}=\-—–|·、。，：；！？「」『』《》&#0-9।॥،؛؟۔٫٬٪۝־׃׆]{2,}/g;

const files = ['hanmap_trivia.js', 'wordmap_trivia.js']
  .concat(fs.readdirSync(ROOT).filter((f) => /^wordmap_trivia_[a-z]+\.js$/.test(f)).sort());

const hits = [];
for (const f of files) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  for (const m of src.matchAll(TOKEN)) {
    const t = m[0];
    const found = RANGES.filter(([, re]) => re.test(t)).map(([n]) => n);
    if (found.length < 2) continue;
    if (found.length === 2 && ALLOWED.has(found.slice().sort().join('+'))) continue;
    hits.push({ file: f, scripts: found.sort(), token: t.slice(0, 70) });
  }
}

if (CHECK) {
  console.log('fusions: ' + hits.length);
  for (const h of hits) console.log('  ' + h.file + '  [' + h.scripts.join('+') + ']  ' + h.token);
  process.exit(0);
}

console.log('script-fusion guard — two non-Latin scripts inside one word\n');
console.log('scanned ' + files.length + ' file(s)\n');
console.log(hits.length + ' fusion(s)\n');
for (const h of hits) console.log('[' + h.file + '] ' + h.scripts.join(' + ') + '\n  ' + h.token + '\n');
