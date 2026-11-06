#!/usr/bin/env node
/*
 * trivia_count_check.js — route and cell counts quoted in Word Map stories.
 *
 * A story says "59 languages take the road through Persian"; the map moves on
 * as cells are added, and the sentence does not. Numbers in prose cannot be
 * tied to a route by parsing, so the lock records which numbers matched a
 * count when it was seeded: article, word, what was counted, the number.
 *
 * Report only: adding cells must not block a commit. It prints the numbers
 * that have drifted, and the story wants a refresh when it is next touched.
 *
 *   node tools/trivia_count_check.js          report
 *   node tools/trivia_count_check.js --seed   rewrite the lock from today's text
 */
const fs = require('fs'), path = require('path');
const R = path.join(__dirname, '..'), LOCK = path.join(__dirname, 'trivia_count.lock.json');
const arts = new Function(fs.readFileSync(path.join(R, 'wordmap_trivia.js'), 'utf8') + ';return TRIVIA_ARTICLES')();
function counts(id) {
  const f = path.join(R, 'words', id + '.js');
  if (!fs.existsSync(f)) return null;
  const W = {};
  new Function('WORDS', fs.readFileSync(f, 'utf8'))(W);
  const w = W[id]; if (!w) return null;
  const c = { cells: Object.values(w.data).filter(v => !(Array.isArray(v) && v[0] === '—')).length };
  for (const r of Object.values(w.family || {})) c['route:' + r] = (c['route:' + r] || 0) + 1;
  return c;
}
const cache = {};
const C = id => (id in cache ? cache[id] : (cache[id] = counts(id)));
if (process.argv.includes('--seed')) {
  const out = [];
  for (const a of arts) {
    const en = a.body && a.body.en; if (!en) continue;
    const words = [...new Set([...en.matchAll(/data-word="([^"]+)"/g)].map(m => m[1]))];
    const text = en.replace(/<[^>]+>/g, ' ');
    const nums = new Set([...text.matchAll(/(?<![\d.,:–-])\b(\d{2,4})\b(?![\d:–-]|th|st|nd|rd)(?=\s+(?:of|rows?|languages?|cells?|others?|more|take|say|use|have|are|go|sit|keep|map|varieties))/g)].map(m => +m[1]));
    for (const id of words) { const c = C(id); if (!c) continue;
      for (const [k, v] of Object.entries(c)) if (nums.has(v)) out.push({ article: a.id, word: id, count: k, value: v });
    }
  }
  fs.writeFileSync(LOCK, JSON.stringify(out, null, 0).replace(/},/g, '},\n') + '\n');
  console.log('seeded', out.length);
  process.exit(0);
}
const lock = JSON.parse(fs.readFileSync(LOCK, 'utf8'));
const drift = lock.filter(e => { const c = C(e.word); return !c || c[e.count] !== e.value; });
for (const e of drift) console.log(`  ${e.article}: says ${e.value}, ${e.word} ${e.count} is now ${(C(e.word) || {})[e.count]}`);
console.log(`trivia counts: ${lock.length} tracked, ${drift.length} drifted (report only)`);
