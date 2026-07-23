#!/usr/bin/env node
/*
 * Replace one or more LANG_DATA[code].meta.description objects from a JSON
 * patch.  The scanner is string-aware so braces and apostrophes inside prose
 * cannot make it touch neighbouring metadata fields.
 *
 * Patch format:
 * {
 *   "code": { "en": "...", "ja": "...", ... },
 *   "other_code": { ... }
 * }
 *
 * Usage:
 *   node tools/apply_description_patch.js path/to/patch.json
 *   node tools/apply_description_patch.js --check path/to/patch.json
 *   node tools/apply_description_patch.js --add-variants path/to/patch.json
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const args = process.argv.slice(2);
const allowedOptions = new Set(['--check', '--add-variants']);
const unknownOptions = args.filter(arg => arg.startsWith('--') && !allowedOptions.has(arg));
const positionalArgs = args.filter(arg => !arg.startsWith('--'));
if (unknownOptions.length || positionalArgs.length !== 1) {
  const detail = unknownOptions.length
    ? `Unknown option(s): ${unknownOptions.join(', ')}`
    : `Expected exactly one patch path; received ${positionalArgs.length}`;
  console.error(detail);
  console.error(
    'Usage: node tools/apply_description_patch.js [--check] [--add-variants] PATCH.json',
  );
  process.exit(2);
}
const checkOnly = args.includes('--check');
const addVariants = args.includes('--add-variants');
const patchPath = positionalArgs[0];

const ROOT = path.join(__dirname, '..');
const META_PATH = path.join(ROOT, 'wordmap_meta.js');
const REQUIRED = [
  'en', 'ja', 'ko', 'zh', 'yue', 'vi', 'th', 'id', 'hi',
  'de', 'fr', 'it', 'es', 'pt', 'ru', 'uk', 'ar', 'he', 'sw',
];
const OPTIONAL = ['es_eu', 'es_mx', 'pt_eu', 'pt_br'];

const patch = JSON.parse(fs.readFileSync(path.resolve(patchPath), 'utf8'));
if (!patch || Array.isArray(patch) || typeof patch !== 'object') {
  throw new Error('Patch root must be an object keyed by language code');
}

function scanObjectEnd(source, start) {
  if (source[start] !== '{') throw new Error(`Expected "{" at offset ${start}`);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    if (lineComment) {
      if (ch === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (ch === '*' && next === '/') {
        blockComment = false;
        i++;
      }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = '';
      continue;
    }
    if (ch === '/' && next === '/') {
      lineComment = true;
      i++;
      continue;
    }
    if (ch === '/' && next === '*') {
      blockComment = true;
      i++;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}' && --depth === 0) return i + 1;
  }
  throw new Error(`Unterminated object beginning at offset ${start}`);
}

let source = fs.readFileSync(META_PATH, 'utf8');
let changed = 0;
for (const [code, description] of Object.entries(patch)) {
  if (!description || Array.isArray(description) || typeof description !== 'object') {
    throw new Error(`${code}: description must be an object`);
  }
  const invalid = Object.entries(description)
    .filter(([, value]) => typeof value !== 'string' || value.trim() === '')
    .map(([lang]) => lang);
  const missing = REQUIRED.filter(
    lang => typeof description[lang] !== 'string' || description[lang].trim() === '',
  );
  const extras = Object.keys(description).filter(
    lang => !REQUIRED.includes(lang) && !OPTIONAL.includes(lang),
  );
  if (missing.length || extras.length || invalid.length) {
    throw new Error(
      `${code}: patch must contain all required language strings ` +
      `(missing/invalid required: ${missing.join(',') || 'none'}; ` +
      `invalid values: ${invalid.join(',') || 'none'}; ` +
      `unknown keys: ${extras.join(',') || 'none'})`,
    );
  }

  const assignments = [
    `LANG_DATA['${code}'].meta =`,
    `LANG_DATA["${code}"].meta =`,
  ];
  const assignmentAt = assignments
    .map(needle => source.indexOf(needle))
    .filter(index => index >= 0)
    .sort((a, b) => a - b)[0] ?? -1;
  if (assignmentAt < 0) throw new Error(`${code}: metadata assignment not found`);
  const nextAssignment = source.indexOf('\nLANG_DATA[', assignmentAt + 1);
  const entryEnd = nextAssignment < 0 ? source.length : nextAssignment;
  const propertyAt = source.indexOf('description:', assignmentAt);
  if (propertyAt < 0 || propertyAt >= entryEnd) {
    throw new Error(`${code}: description property not found in metadata assignment`);
  }
  const objectStart = source.indexOf('{', propertyAt + 'description:'.length);
  if (objectStart < 0 || objectStart >= entryEnd) {
    throw new Error(`${code}: description object not found`);
  }
  const objectEnd = scanObjectEnd(source, objectStart);
  if (objectEnd > entryEnd) {
    throw new Error(`${code}: description object crosses metadata entry boundary`);
  }
  const current = vm.runInNewContext(
    `(${source.slice(objectStart, objectEnd)})`,
    Object.create(null),
    { timeout: 1000 },
  );
  const output = { ...description };
  for (const variant of OPTIONAL) {
    if (Object.prototype.hasOwnProperty.call(description, variant)) continue;
    if (Object.prototype.hasOwnProperty.call(current, variant)) {
      output[variant] = current[variant];
    } else if (addVariants) {
      output[variant] = output[variant.startsWith('es_') ? 'es' : 'pt'];
    }
  }
  const replacement = JSON.stringify(output);
  if (source.slice(objectStart, objectEnd) === replacement) continue;
  source = source.slice(0, objectStart) + replacement + source.slice(objectEnd);
  changed++;
}

if (!checkOnly && changed) {
  new Function(source);
  const tempPath = `${META_PATH}.tmp-${process.pid}`;
  try {
    fs.writeFileSync(tempPath, source);
    fs.renameSync(tempPath, META_PATH);
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}
console.log(`${checkOnly ? 'Checked' : 'Applied'} ${Object.keys(patch).length} code(s); ${changed} change(s).`);
