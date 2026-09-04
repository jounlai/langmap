#!/usr/bin/env node
/*
 * description_translation_check.js
 *
 * Static sanity checks for wordmap_meta.js description translations. This does
 * NOT judge translation quality; it catches structural defects worth handing to
 * a reviewer:
 *   - missing / empty / wrong-type UI-language descriptions
 *   - a target string identical to the English source (untranslated)
 *   - a long verbatim run of the English source left inside a translation
 *   - a truncated-looking translation (much shorter than that language's own
 *     typical length — calibrated per language, see below)
 *   - an English source that looks cut off mid-sentence
 *
 * Length note: an absolute target/English character-ratio threshold is useless
 * here because scripts differ enormously in density — a faithful Chinese or
 * Thai rendering of a 900-char English sentence is a fraction of its length, so
 * a fixed ratio floods with false positives (this check used to emit ~2,500).
 * Comparing to English is also unreliable: some entries simply have a verbose
 * English source, which then flags all 18 translations at once. So the length
 * check works ENTIRELY WITHIN each entry: divide every translation's length by
 * that language's corpus-median density to get a script-neutral "content size",
 * then flag a language only when its content size is a small fraction of the
 * SAME entry's median — i.e. one language got a stub while the others are full.
 *
 * Run:
 *   node tools/description_translation_check.js            # list findings
 *   node tools/description_translation_check.js --summary  # counts by kind
 *   node tools/description_translation_check.js --json
 *   node tools/description_translation_check.js --kind missing
 *   node tools/description_translation_check.js --check    # gate: print "blocking: N"
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.join(__dirname, '..');

const context = { window: {}, console: { log() {}, warn() {}, error() {} } };
vm.createContext(context);
vm.runInContext(
  fs.readFileSync(path.join(ROOT, 'wordmap_data.js'), 'utf8') +
  '\n' +
  fs.readFileSync(path.join(ROOT, 'wordmap_meta.js'), 'utf8') +
  '\n;globalThis.__LANG_DATA__ = LANG_DATA;',
  context,
);
const store = context.__LANG_DATA__;

// UI languages a description is expected to carry. es/pt are the neutral base
// forms; es_eu/es_mx/pt_eu/pt_br are optional regional variants layered on top.
const DIRECT_LANGS = [
  'ja', 'ko', 'zh', 'yue', 'vi', 'th', 'id', 'hi',
  'de', 'fr', 'it', 'es', 'pt', 'ru', 'uk', 'ar', 'he', 'sw',
];
const OPTIONAL_LANGS = ['es_eu', 'es_mx', 'pt_eu', 'pt_br'];
const ALL_LANGS = ['en', ...DIRECT_LANGS, ...OPTIONAL_LANGS];
const LENGTHY_LANGS = [...DIRECT_LANGS, ...OPTIONAL_LANGS];

// Thresholds. MIN_EN_LEN: only length-check when the English is long enough to
// make a ratio meaningful. SHORT/LONG_REL: fraction of the language's own median
// ratio below/above which a translation looks truncated / bloated.
const MIN_EN_LEN = 150;
const SHORT_REL = 0.5;
const LONG_REL = 2.0;
const MIN_SAMPLES = 8; // don't calibrate a language with too few data points

function normalise(text) {
  return String(text).replace(/\s+/g, ' ').trim();
}

function median(nums) {
  if (!nums.length) return NaN;
  const s = [...nums].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function longestEnglishRun(en, target) {
  const chunks = en.match(/[A-Za-z][A-Za-z0-9'’.,;:() /+–—-]{39,}/g) || [];
  return chunks
    .map(chunk => chunk.trim())
    .filter(chunk => target.includes(chunk))
    .filter(chunk => (chunk.match(/[A-Za-z]+/g) || []).length >= 8)
    .filter(chunk => /\b(?:the|and|with|spoken|language|is|are|of|in|from|by|for)\b/i.test(chunk))
    .sort((a, b) => b.length - a.length)[0] || '';
}

// ---- Pass 1: learn each language's typical target/en length ratio ----
const ratioSamples = {};
for (const lang of LENGTHY_LANGS) ratioSamples[lang] = [];
for (const [, entry] of Object.entries(store)) {
  const desc = entry.meta && entry.meta.description;
  if (!desc || typeof desc !== 'object' || typeof desc.en !== 'string') continue;
  const enLen = normalise(desc.en).length;
  if (enLen < MIN_EN_LEN) continue;
  for (const lang of LENGTHY_LANGS) {
    if (typeof desc[lang] !== 'string') continue;
    const t = normalise(desc[lang]);
    if (!t) continue;
    ratioSamples[lang].push(t.length / enLen);
  }
}
const medianRatio = {};
for (const lang of LENGTHY_LANGS) {
  medianRatio[lang] = ratioSamples[lang].length >= MIN_SAMPLES ? median(ratioSamples[lang]) : NaN;
}

// ---- Pass 2: findings ----
const issues = [];
for (const [code, entry] of Object.entries(store)) {
  if (!entry.meta) continue;
  const desc = entry.meta.description;
  if (!desc || typeof desc !== 'object') {
    issues.push({ code, lang: '*', kind: 'missing-object', detail: '' });
    continue;
  }

  // presence / type of every expected language (en + direct; optional langs are
  // only checked for type when present)
  for (const lang of ALL_LANGS) {
    const has = Object.prototype.hasOwnProperty.call(desc, lang);
    if (!has) {
      if (lang === 'en' || DIRECT_LANGS.includes(lang)) {
        issues.push({ code, lang, kind: 'missing', detail: '' });
      }
      continue;
    }
    if (typeof desc[lang] !== 'string') {
      issues.push({ code, lang, kind: 'invalid-type', detail: typeof desc[lang] });
      continue;
    }
    // These fields are plain text — nothing renders them as HTML. An entity
    // written into one shows up as its literal characters. Twice in one
    // afternoon I typed &nbsp; into a French description out of habit; before
    // that there were none in the whole corpus.
    if (/&(?:[a-zA-Z]+|#\d+);/.test(desc[lang])) {
      const m = desc[lang].match(/&(?:[a-zA-Z]+|#\d+);/)[0];
      issues.push({ code, lang, kind: 'html-entity', detail: m });
    }
    if (!desc[lang].trim()) {
      issues.push({ code, lang, kind: 'missing', detail: '' });
    }
  }

  if (typeof desc.en !== 'string' || !normalise(desc.en)) continue;
  const en = normalise(desc.en);

  if (/\[Provisional - limited documentation;/i.test(en)) {
    issues.push({ code, lang: 'en', kind: 'source-audit-note', detail: en.slice(-120) });
  }
  if (en.length >= 100 && !/[.!?'"”’」』)\]]$/.test(en)) {
    issues.push({ code, lang: 'en', kind: 'source-incomplete', detail: en.slice(-120) });
  }

  // same-as-en + english-fragment (per language, independent of length)
  for (const lang of LENGTHY_LANGS) {
    if (typeof desc[lang] !== 'string') continue;
    const target = normalise(desc[lang]);
    if (!target) continue;
    if (target === en) { issues.push({ code, lang, kind: 'same-as-en', detail: '' }); continue; }
    const copied = longestEnglishRun(en, target);
    if (copied.length >= 40) {
      issues.push({ code, lang, kind: 'english-fragment', detail: copied.slice(0, 120) });
    }
  }

  // length outliers WITHIN this entry: a language's script-neutral content size
  // (its char length ÷ that language's corpus-median density) vs the entry's own
  // median. Flags one stubbed/bloated translation among otherwise-full ones;
  // a uniformly short/long entry (verbose English) flags nothing.
  if (en.length >= MIN_EN_LEN) {
    const norm = {}; // lang -> content-size estimate
    // Only the DIRECT langs: es_eu/es_mx/pt_eu/pt_br are byte-for-byte copies of
    // es/pt, present in a subset of entries, so their density estimate is skewed
    // and they add no signal to a length check.
    for (const lang of DIRECT_LANGS) {
      if (typeof desc[lang] !== 'string') continue;
      const t = normalise(desc[lang]);
      if (!t || t === en) continue;
      if (!Number.isFinite(medianRatio[lang]) || medianRatio[lang] <= 0) continue;
      norm[lang] = t.length / medianRatio[lang];
    }
    const vals = Object.values(norm);
    if (vals.length >= 6) {
      const mid = median(vals);
      if (mid > 0) {
        // Only flag the SHORT side: a stub/truncated translation is a real
        // defect, whereas a longer-than-average rendering usually just reflects a
        // fuller style and is not wrong. (Flagging "long" also double-counts a
        // bimodal entry — the same stub that drops one language pulls the median
        // down and makes the full ones look long.)
        for (const [lang, nl] of Object.entries(norm)) {
          if (nl / mid < SHORT_REL) {
            issues.push({ code, lang, kind: 'very-short', detail: `${((nl / mid) * 100).toFixed(0)}% of this entry's other languages` });
          }
        }
      }
    }
  }
}

// findings that should BLOCK a build (structural / clearly-wrong); length
// outliers and the source-* notes are advisory.
const BLOCKING = new Set([
  'missing-object', 'missing', 'invalid-type', 'same-as-en', 'english-fragment',
  'html-entity',
]);

// ---- CLI ----
const argv = process.argv.slice(2);
const knownOptions = new Set(['--json', '--summary', '--kind', '--check']);
const kindArg = argv.indexOf('--kind');
const unknownOptions = argv.filter((arg, index) =>
  (arg.startsWith('--') && !knownOptions.has(arg)) ||
  (!arg.startsWith('--') && argv[index - 1] !== '--kind'));
if (unknownOptions.length || (kindArg >= 0 && !argv[kindArg + 1])) {
  console.error(unknownOptions.length
    ? `Unknown argument(s): ${unknownOptions.join(', ')}`
    : '--kind requires a finding kind');
  process.exit(2);
}
const requestedKind = kindArg >= 0 ? argv[kindArg + 1] : '';
const knownKinds = new Set(issues.map(i => i.kind));
if (requestedKind && !knownKinds.has(requestedKind)) {
  // absent kind is not an error — it just means zero findings of that kind
  process.stdout.write(argv.includes('--json') ? '[]\n' : '');
  process.exit(0);
}
const shown = requestedKind ? issues.filter(i => i.kind === requestedKind) : issues;
const blockingCount = issues.filter(i => BLOCKING.has(i.kind)).length;

if (argv.includes('--check')) {
  process.stdout.write(`blocking: ${blockingCount}\n`);
} else if (argv.includes('--json')) {
  process.stdout.write(JSON.stringify(shown, null, 2) + '\n');
} else if (argv.includes('--summary')) {
  const counts = {};
  for (const i of shown) counts[i.kind] = (counts[i.kind] || 0) + 1;
  process.stdout.write(`${shown.length} finding(s): ${JSON.stringify(counts)}\n`);
} else {
  for (const i of shown) {
    process.stdout.write(`${i.kind.padEnd(16)} ${i.code.padEnd(16)} ${i.lang}${i.detail ? ` — ${i.detail}` : ''}\n`);
  }
}

process.exitCode = blockingCount ? 1 : 0;
