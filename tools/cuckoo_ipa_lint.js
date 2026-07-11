#!/usr/bin/env node
/*
 * cuckoo_ipa_lint.js — deterministic gate for the tone-notation error class
 * that the review rallies keep hitting (superscript-digit tones, Latin
 * acute/grave tones where Chao letters are required, tie-bar affricates, and
 * tonal-language cells with no tone at all).
 *
 * Scope: words/cuckoo.js by default; pass a JSON file of {code:[surface,ipa]}
 * as argv[2] to lint a batch of proposed cells before applying them.
 *
 * Exit 1 if any violation is found.
 */
const fs = require('path') && require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// Codes whose IPA MUST carry Chao tone letters: modern Sinitic, Tai-Kadai,
// Vietnamese, and Hmong-Mien — the branches where the atlas notates tone with
// Chao letters. Deliberately EXCLUDES Burmish/Mon/Lolo-Burmese/Tibetan (the
// atlas marks their tone/register with diacritics á à a̰, not Chao letters) and
// historical/reconstructed stages (Baxter H/X, *proto notation). Matched by
// prefix on the base code.
const TONAL_PREFIXES = [
  'zh', 'yue', 'nan', 'hak', 'gan', 'hsn', 'cjy', 'wuu', 'cdo', 'mnp', 'cpx',
  'cnp', 'czh', 'dng', 'vi', 'th', 'lo', 'za', 'shn', 'khb', 'pcc', 'tyz',
  'nut', 'blt', 'soa', 'jia', 'hmn', 'iuu',
];
// Historical/reconstructed Sinitic stages that use reconstruction notation,
// not Chao letters — exempt from the tone check even though they start "zh_".
const HISTORICAL_EXEMPT = new Set(['och', 'ltc', 'zh_song', 'zh_tang', 'zh_han', 'zh_wenyan_edu', 'vi_han', 'vi_nom']);
const RECON_MARK = /[*ˤ]|[HXꟲ]|·/;   // Baxter H/X, proto asterisk, etc.
const isTonal = (code, ipa) => {
  if (HISTORICAL_EXEMPT.has(code)) return false;
  if (RECON_MARK.test(ipa)) return false;
  return TONAL_PREFIXES.includes(code.split('_')[0]);
};

const SUPER_DIGITS = /[⁰¹²³⁴⁵⁶⁷⁸⁹]/;
const CHAO = /[˥˦˧˨˩]/;          // ˥ ˦ ˧ ˨ ˩
const TIE_BAR = /͡/;                                  // ͡ combining tie bar
// Latin vowels carrying acute/grave/caron/circumflex (precomposed or combining)
// used as tone — illegal on a tonal-language cell (Chao letters required).
const LATIN_TONE = /[áàâǎéèêěíìîǐóòôǒúùûǔýỳỹ]|[a-z][́̀̂̌]/i;

function lint(entries) {
  const problems = [];
  for (const [code, pair] of entries) {
    const ipa = Array.isArray(pair) ? pair[1] : pair;
    if (!ipa || ipa === '—') continue;
    if (SUPER_DIGITS.test(ipa)) problems.push([code, ipa, 'superscript-digit tone (use Chao letters)']);
    if (TIE_BAR.test(ipa)) problems.push([code, ipa, 'tie-bar affricate (use bare tʃ/ts/dz)']);
    if (isTonal(code, ipa)) {
      if (!CHAO.test(ipa)) problems.push([code, ipa, 'tonal language but no Chao tone letter']);
      if (LATIN_TONE.test(ipa)) problems.push([code, ipa, 'Latin acute/grave tone where Chao letters are required']);
    }
  }
  return problems;
}

function loadCuckoo() {
  global.WORDS = {};
  // eslint-disable-next-line no-eval
  eval(fs.readFileSync(path.join(ROOT, 'words', 'cuckoo.js'), 'utf8'));
  return Object.entries(WORDS.cuckoo.data);
}

// --check: exit 0 and print a scrapable "violations: N" line for check_all.js
// (mirrors build_word_labels.js --check). Default: exit 1 on any violation, so
// it works as a hard gate before applying a batch of proposed cells.
const args = process.argv.slice(2).filter(a => a !== '--check');
const checkMode = process.argv.includes('--check');
const arg = args[0];
const entries = arg
  ? Object.entries(JSON.parse(fs.readFileSync(arg, 'utf8')))
  : loadCuckoo();
const problems = lint(entries);
console.log(`violations: ${problems.length}`);
if (problems.length) {
  for (const [code, ipa, why] of problems) console.error(`  [${code}] "${ipa}" — ${why}`);
  if (!checkMode) process.exit(1);
  process.exit(0);
}
console.log(`cuckoo IPA lint: clean (${entries.length} cells checked)`);
