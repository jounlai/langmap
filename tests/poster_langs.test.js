const assert = require('node:assert');
const { POSTER_LANGS, POSTER_WORDS } = require('../poster_langs.js');

// Shape: every POSTER_LANGS entry has a string `code`; keys are 3-letter ISO.
for (const [iso, v] of Object.entries(POSTER_LANGS)) {
  assert.match(iso, /^[A-Z]{3}$/, `ISO key looks alpha-3: ${iso}`);
  assert.strictEqual(typeof v.code, 'string', `${iso}.code is a string`);
}

// `water` exists and every country in it is declared in POSTER_LANGS.
assert.ok(POSTER_WORDS.water, 'water word present');
for (const [iso, w] of Object.entries(POSTER_WORDS.water)) {
  assert.ok(POSTER_LANGS[iso], `water[${iso}] has a POSTER_LANGS entry`);
  assert.strictEqual(typeof w.native, 'string', `water[${iso}].native is a string`);
  if ('roman' in w) assert.strictEqual(typeof w.roman, 'string', `water[${iso}].roman is a string`);
}

// Non-Latin native forms MUST carry a romanization line.
const hasLatinOnly = (s) => /^[\p{Script=Latin}\p{P}\p{Zs}0-9]+$/u.test(s);
for (const [iso, w] of Object.entries(POSTER_WORDS.water)) {
  if (!hasLatinOnly(w.native)) assert.ok('roman' in w, `non-Latin water[${iso}] needs roman`);
}

console.log('poster_langs: OK');
