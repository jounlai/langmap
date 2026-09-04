#!/usr/bin/env node
/**
 * trivia_section_parity.js — a translation must have as many sections as its
 * English.
 *
 * The trivia articles are written in <h3> sections, and a translation with
 * fewer of them is not a shorter rendering of the same article: it is the same
 * article with sections missing. ko-mid-eastguk-jeongun's Vietnamese had one
 * heading where the English has four — three whole sections gone, in a body
 * long enough to pass every length check.
 *
 * This is the counting check, not a semantic one. It cannot tell whether the
 * headings correspond, only whether they are all there. In practice that is
 * what goes wrong: sections are dropped wholesale during summarisation, never
 * reordered.
 *
 * Usage:
 *   node tools/trivia_section_parity.js          # full report
 *   node tools/trivia_section_parity.js --check  # "missing sections: N"
 *   node tools/trivia_section_parity.js --summary
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const SUMMARY = process.argv.includes('--summary');

// Articles where a language legitimately has a different section count.
// Empty: a reader in any language is entitled to every section.
const ALLOW = {};

function load(file, pick) {
    const ctx = vm.createContext({});
    vm.runInContext('var window = this;', ctx);
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
    return pick(ctx);
}

const arts = [];
for (const a of load('hanmap_trivia.js', c => vm.runInContext('window.TRIVIA_ARTICLES', c) || []))
    arts.push({ src: 'hanmap', id: a.id, bodies: Object.assign({}, a.body) });
{
    const map = {};
    for (const a of load('wordmap_trivia.js', c => vm.runInContext('window.TRIVIA_ARTICLES', c) || []))
        map[a.id] = Object.assign({}, a.body);
    for (const f of fs.readdirSync(ROOT).filter(f => /^wordmap_trivia_[a-z]{2,3}\.js$/.test(f))) {
        const ui = f.match(/_([a-z]{2,3})\.js$/)[1];
        const T = load(f, c => vm.runInContext('window.TRIVIA_I18N', c) || {});
        for (const id in T) if (map[id] && typeof T[id].body === 'string') map[id][ui] = T[id].body;
    }
    for (const id in map) arts.push({ src: 'wordmap', id, bodies: map[id] });
}

const heads = html => (String(html).match(/<h3[ >]/g) || []).length;
const titles = html => (String(html).match(/<h3[^>]*>([\s\S]*?)<\/h3>/g) || [])
    .map(h => h.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());

const rows = [];
for (const a of arts) {
    const en = heads(a.bodies.en || '');
    if (!en) continue;
    const allow = ALLOW[a.id] || {};
    for (const ui of Object.keys(a.bodies)) {
        if (ui === 'en') continue;
        const n = heads(a.bodies[ui]);
        if (n < en && allow[ui] !== n) rows.push({ src: a.src, id: a.id, ui, n, en, have: titles(a.bodies[ui]) });
    }
}

const total = rows.reduce((s, r) => s + (r.en - r.n), 0);
if (CHECK) {
    console.log('missing sections: ' + total);
} else if (SUMMARY) {
    const per = {};
    for (const r of rows) {
        per[r.id] = per[r.id] || { n: 0, langs: [], en: r.en };
        per[r.id].n += r.en - r.n; per[r.id].langs.push(r.ui + '(' + r.n + ')');
    }
    for (const [id, v] of Object.entries(per).sort((a, b) => b[1].n - a[1].n))
        console.log(String(v.n).padStart(4) + '  ' + id.padEnd(34) + 'en has ' + v.en + '  ' + v.langs.join(' '));
    console.log('\nmissing sections: ' + total + ' across ' + Object.keys(per).length + ' articles');
} else {
    let cur = '';
    for (const r of rows) {
        if (r.id !== cur) { cur = r.id; console.log('\n### ' + r.src + '  ' + r.id + '  (English: ' + r.en + ' sections)'); }
        console.log('  ' + r.ui.padEnd(4) + r.n + '  ' + r.have.join(' | '));
    }
    console.log('\nmissing sections: ' + total + ' in ' + rows.length + ' translations');
}
