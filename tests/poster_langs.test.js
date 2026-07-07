const assert = require('node:assert');
const { POSTER_LANGS, POSTER_WORDS } = require('../poster_langs.js');

// Shape: every POSTER_LANGS entry has a string `code`; keys are 3-letter ISO.
const codes = new Set();
for (const [iso, v] of Object.entries(POSTER_LANGS)) {
  assert.match(iso, /^[A-Z]{3}$/, `ISO key looks alpha-3: ${iso}`);
  assert.strictEqual(typeof v.code, 'string', `${iso}.code is a string`);
  codes.add(v.code);
}

const hasLatinOnly = (s) => /^[\p{Script=Latin}\p{P}\p{Zs}0-9]+$/u.test(s);

// Word data is keyed by language code. `water` must cover EVERY language in use;
// other words may be partial (countries with no entry are skipped for that word).
assert.ok(POSTER_WORDS.water, 'water word present');
for (const code of codes) {
  assert.ok(POSTER_WORDS.water[code], `water covers language "${code}"`);
}

for (const [word, table] of Object.entries(POSTER_WORDS)) {
  for (const [code, w] of Object.entries(table)) {
    assert.strictEqual(typeof w.native, 'string', `${word}[${code}].native is a string`);
    assert.ok(w.native.length > 0, `${word}[${code}].native non-empty`);
    if ('roman' in w) assert.strictEqual(typeof w.roman, 'string', `${word}[${code}].roman is a string`);
    // Non-Latin native forms MUST carry a romanization line.
    if (!hasLatinOnly(w.native)) assert.ok('roman' in w, `non-Latin ${word}[${code}] needs roman`);
  }
}

console.log('poster_langs: OK (' + Object.keys(POSTER_WORDS).length + ' words, ' + codes.size + ' languages)');
