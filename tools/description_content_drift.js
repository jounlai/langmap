#!/usr/bin/env node
/**
 * description_content_drift.js — a language's description must say the same
 * thing in every UI language.
 *
 * description_translation_check.js already looks for missing, untranslated,
 * truncated and stub descriptions. It cannot see this one: 67 rows were
 * REWRITTEN in English, Japanese, Korean and Chinese and left at their older,
 * much shorter text in the other 19 languages. Every one of those 19 is a
 * fluent, well-formed description — of a thinner article than the one the
 * English now carries.
 *
 * Tamil is the clearest case. English, Japanese, Korean and Chinese give ~80M
 * speakers, Tamil Nadu and Puducherry, Sri Lanka and the diaspora of the
 * 1983-2009 civil war, Singapore and Malaysia. French and Russian give one
 * sentence about a two-thousand-year literary tradition. Both are true; they
 * are not the same description.
 *
 * The length check inside description_translation_check.js is defeated by
 * exactly this shape, and it is worth saying why: it compares each language
 * against the MEDIAN of the same entry's other languages. When 19 of 23 are
 * short, the median is short, and the four full ones look like the outliers.
 *
 * What is checkable without a reader is the figures. A description that shares
 * none of its English's numbers, and is also much shorter, is not a translation
 * of it. Both signals are required — some languages legitimately spell a figure
 * out, and a short description is fine if it says the same things.
 *
 * Usage:
 *   node tools/description_content_drift.js           # full report
 *   node tools/description_content_drift.js --check   # "drifted descriptions: N"
 *   node tools/description_content_drift.js --summary
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const SUMMARY = process.argv.includes('--summary');

const ctx = vm.createContext({});
vm.runInContext('var window = this;', ctx);
for (const f of ['wordmap_data.js', 'wordmap_meta.js'])
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
const LANG = vm.runInContext('LANG_DATA', ctx);

// Figures worth comparing: three digits or more, thousands separators collapsed.
// Anything smaller is a century number or a list index and appears everywhere.
function figures(s) {
    let t = String(s);
    for (let k = 0; k < 3; k++)
        t = t.replace(/(\d)([,.    '])(\d{3})(?![0-9])/g, '$1$3');
    return new Set((t.match(/\d+/g) || []).filter((x) => x.length >= 3).map((x) => String(+x)));
}
// Script-neutral size: characters, whitespace and markup removed.
const size = (s) => String(s).replace(/<[^>]*>/g, '').replace(/\s+/g, '').length;

const rows = [];
for (const code of Object.keys(LANG)) {
    const d = LANG[code].meta && LANG[code].meta.description;
    if (!d || !d.en) continue;
    const en = figures(d.en);
    if (en.size < 3) continue;              // too few figures to judge by
    const enSize = size(d.en);
    for (const ui of Object.keys(d)) {
        if (ui === 'en') continue;
        const t = figures(d[ui]);
        let shared = 0;
        for (const n of en) if (t.has(n)) shared++;
        const ratio = size(d[ui]) / (enSize || 1);
        // Chinese and Japanese say the same thing in roughly half the
        // characters, so "much shorter" has to mean much shorter than that.
        if (shared === 0 && ratio < 0.35) rows.push({ code, ui, ratio, en: [...en].join(' ') });
    }
}

const per = {};
for (const r of rows) (per[r.code] = per[r.code] || []).push(r.ui);
const list = Object.entries(per).sort((a, b) => b[1].length - a[1].length);

if (CHECK) {
    console.log('drifted descriptions: ' + rows.length);
} else if (SUMMARY) {
    for (const [code, uis] of list)
        console.log(String(uis.length).padStart(3) + '  ' + code.padEnd(12) + uis.join(' '));
    console.log('\ndrifted descriptions: ' + rows.length + ' across ' + list.length + ' languages');
} else {
    for (const [code, uis] of list) {
        const d = LANG[code].meta.description;
        console.log('\n### ' + code + '  (' + uis.length + ' languages)');
        console.log('  en  ' + d.en.replace(/\s+/g, ' ').slice(0, 150));
        console.log('  ' + uis[0].padEnd(3) + ' ' + d[uis[0]].replace(/\s+/g, ' ').slice(0, 150));
    }
    console.log('\ndrifted descriptions: ' + rows.length + ' across ' + list.length + ' languages');
}
