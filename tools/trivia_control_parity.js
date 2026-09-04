#!/usr/bin/env node
/**
 * trivia_control_parity.js — every language of an article must carry the same
 * interactive controls as its English.
 *
 * The trivia buttons are the whole reason the articles sit inside the map: they
 * focus a language, pan somewhere, load a character or a word. A reader who
 * loses them is left with an essay and no way back to the atlas.
 *
 * They are being lost in translation, wholesale. Nine HanMap articles have
 * buttons ONLY in English — all eighteen other languages have none at all —
 * and many more are partial: go-on-kan-on-to-on has nine controls in English
 * and three in thirteen languages; min-nan-wenbai has ten and four. This went
 * unnoticed because the existing guard, "trivia button targets exist", checks
 * that a button POINTS at something real. It never asked whether the button is
 * there.
 *
 * What is compared is the control's target, not its label: the data-action plus
 * whichever of data-code / data-char / data-word / data-lat,lng,zoom it
 * carries. Labels must be translated and so cannot be compared; targets must
 * not be.
 *
 * Usage:
 *   node tools/trivia_control_parity.js          # full report
 *   node tools/trivia_control_parity.js --check  # "missing controls: N"
 *   node tools/trivia_control_parity.js --summary
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const SUMMARY = process.argv.includes('--summary');

// Articles whose English controls are deliberately not carried into the other
// languages. Empty: there is no reason for a reader of any language to lose a
// button, and a control that should not exist should be removed from the
// English instead.
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

const attr = (tag, name) => {
    const m = tag.match(new RegExp(name + '=["\']([^"\']*)["\']'));
    return m ? m[1] : '';
};
// A control's identity is what it DOES, not what it says.
function controls(html) {
    const out = [];
    for (const tag of String(html).match(/<button[^>]*class=["']trivia-action["'][^>]*>/g) || []) {
        const act = attr(tag, 'data-action');
        const key = act === 'panto'
            ? 'panto:' + attr(tag, 'data-lat') + ',' + attr(tag, 'data-lng') + ',' + attr(tag, 'data-zoom')
            : act + ':' + (attr(tag, 'data-code') || attr(tag, 'data-codes') ||
                           attr(tag, 'data-char') || attr(tag, 'data-word'));
        out.push(key);
    }
    return out;
}

const rows = [];
for (const a of arts) {
    const en = controls(a.bodies.en || '');
    if (!en.length) continue;
    const allow = new Set(ALLOW[a.id] || []);
    for (const ui of Object.keys(a.bodies)) {
        if (ui === 'en') continue;
        const have = controls(a.bodies[ui]);
        const pool = have.slice();
        const missing = [];
        for (const k of en) {
            const i = pool.indexOf(k);
            if (i >= 0) pool.splice(i, 1);
            else if (!allow.has(k)) missing.push(k);
        }
        if (missing.length || pool.length)
            rows.push({ src: a.src, id: a.id, ui, missing, extra: pool });
    }
}

const total = rows.reduce((n, r) => n + r.missing.length, 0);
if (CHECK) {
    console.log('missing controls: ' + total);
} else if (SUMMARY) {
    const per = {};
    for (const r of rows) (per[r.id] = per[r.id] || { n: 0, langs: [] }).n += r.missing.length,
        per[r.id].langs.push(r.ui);
    for (const [id, v] of Object.entries(per).sort((a, b) => b[1].n - a[1].n))
        console.log(String(v.n).padStart(4) + '  ' + id.padEnd(34) + v.langs.length + ' languages');
    console.log('\nmissing controls: ' + total + ' across ' + Object.keys(per).length + ' articles');
} else {
    let cur = '';
    for (const r of rows) {
        if (r.id !== cur) { cur = r.id; console.log('\n### ' + r.src + '  ' + r.id); }
        console.log('  ' + r.ui.padEnd(4) +
            (r.missing.length ? ' missing: ' + r.missing.join('  ') : '') +
            (r.extra.length ? '  EXTRA: ' + r.extra.join('  ') : ''));
    }
    console.log('\nmissing controls: ' + total + ' in ' + rows.length + ' translations');
}
