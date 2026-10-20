#!/usr/bin/env node
/*
 * owner_decisions_check.js — decisions the owner made that later work must not
 * undo. Review rallies optimise for reach, speed or consistency and have put
 * back things the owner removed on purpose (the family tree in the header nav:
 * removed 2026-10-16, re-added by rally r22, removed again 2026-10-18). Each
 * entry names the decision, where it came from, and a check on the files.
 *
 * Changing one of these needs the owner's say-so: edit the entry in the same
 * commit and say so in the message.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const MAPS = ['index.html', 'wordmap.html', 'hanmap.html', 'namemap.html', 'timemap.html'];

const DECISIONS = [
    {
        id: 'tree-not-in-header',
        what: 'The family tree is not in the header nav (owner 2026-10-16, 18068966; re-removed 1ad563f6)',
        check: () => MAPS.filter((f) => /<nav[^>]*header-nav[\s\S]*?href="tree\.html"[\s\S]*?<\/nav>/.test(read(f)) || /href="tree\.html" class="header-nav-link"/.test(read(f))),
    },
    {
        id: 'compact-credit',
        what: 'The site credit is one link "[globe] LangMap | © Jounlai Cho" opening the About window, shipped in the HTML (owner 2026-10-18; © and black globe 2026-10-19)',
        check: () => {
            const bad = /btn\.textContent = 'LangMap \| © Jounlai Cho'/.test(read('nav-short.js')) ? [] : ['nav-short.js'];
            // Shipped in the HTML so a reload shows no old credit first (owner 2026-10-19).
            for (const f of ['wordmap.html', 'hanmap.html', 'namemap.html', 'timemap.html', 'tree.html', 'index.html']) {
                const h = read(f);
                if (!/class="lm-credit-btn"[^>]*><svg class="lm-credit-ico"[^]*?<\/svg>(?:<span class="lm-credit-txt">)?LangMap \| © Jounlai Cho</.test(h) || /class="credit-by"/.test(h)) bad.push(f);
            }
            return bad;
        },
    },
    {
        id: 'simple-mode-url',
        what: 'In simple mode on PC the site URL stays on the right of the header at every width (owner 2026-05-26, 983d33ae; hidden at 641-1100px by rally r6 3ed29641, restored 2026-10-18)',
        check: () => /body\.chrome-hidden \.site-header-bar \.header-url,\s*html\[data-wm-chrome="hidden"\] body \.site-header-bar \.header-url \{[^}]*display: inline !important/.test(read('styles.css')) ? [] : ['styles.css'],
    },
    {
        id: 'settings-drawer-above-compare',
        what: 'The Word Map and Han Map settings drawers stop above the 比較 button in every layout (owner 2026-09-13, fd04ef72; skipped on short landscape phones by rally r20 4f86ecfe, restored 2026-10-18; Han Map never had it until r31)',
        check: () => ['wordmap.html', 'hanmap.html'].filter((f) => {
            const m = read(f).match(/function positionSettingsDrawer\(\) \{([\s\S]*?)\n        \}/);
            if (!m) return true;
            // every early return, and the end of the function, must come after
            // a compare-fab measurement; the drawer must also re-measure when
            // the compare button appears or goes
            const body = m[1], rets = [...body.matchAll(/\n\s*return;/g)].map((x) => x.index).concat([body.length]);
            const afterFab = (i) => body.slice(0, i).lastIndexOf('compare-fab') > body.slice(0, i).lastIndexOf('if (r.height === 0)');
            return !rets.every(afterFab) || !/new MutationObserver\(positionSettingsDrawer\)/.test(read(f));
        }),
    },
    {
        id: 'hanmap-names-no-brackets',
        what: 'Han Map language names carry no brackets in any UI (owner 2026-09-13; zh_jh/yue_gz brought them back in 1ce1de3a, removed 2026-10-18)',
        check: () => {
            const h = read('hanmap.html'), a = h.indexOf('const OV = {'), b = h.indexOf('};', a);
            const bad = a < 0 ? ['hanmap.html'] : (/[（(]/.test(h.slice(a, b).replace(/\/\/.*$/gm, '')) ? ['hanmap.html override table'] : []);
            if (/"native": "[^"]*[（(]/.test(read('hanmap_data.js'))) bad.push('hanmap_data.js native');
            // the dialect legend's family names too (r32: "Yue (Cantonese)", "관화(만다린)")
            const la = h.indexOf('        var LBL = {\n            mandarin:'), lb = h.indexOf('var TITLE', la);
            if (la < 0 || lb < 0 || /[（(]/.test(h.slice(la, lb))) bad.push('hanmap.html dialect legend');
            return bad;
        },
    },
    {
        id: 'historical-mode-only-historical',
        what: 'The Word Map historical view shows historical languages only, and its help text says so (owner 2026-07-19, c1ede01b)',
        check: () => {
            const w = read('wordmap.html'), a = w.indexOf('eraHelpHistorical: {');
            return a < 0 || /descendant|後裔|후손|赤色|red\)/i.test(w.slice(a, w.indexOf('},', a))) ? ['wordmap.html'] : [];
        },
    },
    {
        id: 'seo-sitemap-not-declared',
        what: 'robots.txt does not declare the SEO-page sitemap; those pages are found through links (owner 2026-06-15, restated 2026-10-16; declared by a9b0a0e5, removed 2026-10-18)',
        check: () => /^Sitemap:.*sitemap-seo/m.test(read('robots.txt')) ? ['robots.txt'] : [],
    },
    {
        id: 'seo-language-lists-no-underline',
        what: 'Language-name lists on the SEO pages have no underline until hover (owner 2026-09-21; underlined by rallies r4/r5b, restored 2026-10-18)',
        check: () => {
            const l = read('seo/lib.php');
            return ['.seo-index-list a {', '.seo-siblings a {'].filter((sel) => { const i = l.indexOf(sel); return i < 0 || !/text-decoration: none/.test(l.slice(i, l.indexOf('}', i))); });
        },
    },
    {
        id: 'nav-labels-same-everywhere',
        what: 'Map names in the menus read the same on every page (owner 2026-05-06 「文言をすべて統一」): tree.html navHan follows nav-short.js',
        check: () => {
            const L = eval('(' + read('nav-short.js').match(/var LABELS = (\{[\s\S]*?\n    \});/)[1] + ')');
            const bad = [];
            for (const line of read('tree.html').split('\n')) {
                const k = line.match(/^\s+'?([a-z-]+)'?\s*:\s*\{\s*title:/), h = line.match(/navHan:'([^']*)'/);
                if (k && h && L[k[1]] && L[k[1]].han !== h[1]) bad.push('tree.html ' + k[1]);
            }
            return bad;
        },
    },
    {
        id: 'names-no-brackets',
        what: 'No brackets in any language name or endonym (owner 2026-09-13, 18e524af/8b872725; zh_song, yue_gz, xct_litpr brought them back, removed 2026-10-18)',
        check: () => {
            const bad = [];
            if (/:"[^"]*[（(][^"]*"/.test(read('lang_names.js'))) bad.push('lang_names.js');
            if (/native: '[^']*[（(][^']*'/.test(read('wordmap_data.js'))) bad.push('wordmap_data.js native');
            return bad;
        },
    },
    {
        id: 'owner-pinned-cells',
        what: 'Cells the owner ruled on stay as ruled: es_pr mai̯/pai̯ (dialect feature), vi_c/vi_s r = ɹ not ʐ (2026-08-31, c9d451e8), English "fire" has no ˈ (2026-07-21, 02846461)',
        check: () => {
            const bad = [];
            if (!/es_pr: \["madre", "mai̯"\]/.test(read('words/mother.js'))) bad.push('words/mother.js es_pr');
            if (!/es_pr: \["padre", "pai̯"\]/.test(read('words/father.js'))) bad.push('words/father.js es_pr');
            for (const f of fs.readdirSync(path.join(ROOT, 'words'))) {
                if (!f.endsWith('.js')) continue;
                if (/^\s*["']?vi_[cs]["']?\s*:\s*\[[^\]]*ʐ/m.test(read('words/' + f))) bad.push('words/' + f + ' vi_c/vi_s ʐ');
            }
            if (/["']?en(_[a-z0-9]+)?["']?\s*:\s*\[\s*"fire",\s*"ˈ/.test(read('words/fire.js'))) bad.push('words/fire.js stress');
            return bad;
        },
    },
    {
        id: 'hanmap-no-far-fling',
        what: 'At z>=6 a Han Map label that does not fit near its point hides instead of moving far (owner 2026-09-06, 675a7344). Below z=6 the second try reaches at most 80 px (owner 2026-10-19: 海陸客家語 far away at z5.5). Co-located stacks too: at z>=6 a member further than _maxR + its half-height from its dot leaves the stack (r32)',
        check: () => {
            const h = read('hanmap.html'), bad = [];
            if (!/const _rescueR = zoom < 6 \?/.test(h)) bad.push('hanmap.html solo rescue');
            const rp = h.match(/const RESCUE_PX = (\d+);/);
            if (!rp || +rp[1] > 80 || !/Math\.min\(RESCUE_PX \* _rescueK/.test(h)) bad.push('hanmap.html rescue radius > 80 px');
            if (!/const _tooFar = [^\n]*> _maxR \+ hhs\[i\]\)/.test(h) || !/if \(zoom >= 6 && members\.length > 1 && dy != null && _tooFar\(dy\)\)/.test(h)) bad.push('hanmap.html stack path');
            return bad;
        },
    },
    {
        id: 'partial-word-dialect-parity',
        what: 'Partial words keep dialect parity: a living variety row has its own cell where its parent has one (owner 2026-07-11). lol is complete; the older gaps in other partial words may only shrink (budget per word)',
        check: () => {
            const L = JSON.parse(read('data/wordmap_seo.json')).langs;
            // Separate languages that only share a code prefix (Ryukyuan, Jejueo, Guinea-Bissau Kriol).
            const SEP = new Set(['ja_oki', 'ja_mvi', 'ja_rys', 'ko_jeju', 'pt_gw']);
            const BUDGET = { lol: 0, atsign: 29, blue: 5, cockcrow: 45, coffee: 25, computer: 8, cuckoo: 26, dopamine: 31, n99: 11, orange: 6, sugar: 11, sushi: 11, tea: 8, wifi: 25, woof: 29 };
            const bad = [];
            for (const f of fs.readdirSync(path.join(ROOT, 'words'))) {
                if (!f.endsWith('.js') || !/partial:\s*true/.test(read('words/' + f))) continue;
                const w = f.slice(0, -3), miss = [];
                for (const [c, l] of Object.entries(L)) {
                    const m = l.meta || {};
                    if ((l.words && l.words[w]) || m.period || SEP.has(c)) continue;
                    const p = m.parentCode || (c.includes('_') ? c.split('_')[0] : '');
                    if (p && L[p] && L[p].words && L[p].words[w]) miss.push(c);
                }
                if (miss.length > (BUDGET[w] || 0)) bad.push(`words/${f} (${miss.length} > ${BUDGET[w] || 0}: ${miss.slice(0, 6).join(' ')})`);
            }
            if (/only where the variety demonstrably/.test(read('words/lol.js'))) bad.push('words/lol.js header');
            return bad;
        },
    },
    {
        id: 'hanmap-names-everywhere',
        what: 'The Han Map language pages and ui= links use the Han Map names (short, no brackets): the SEO export applies the hanmap.html override table, and ui= loads the names file (r30)',
        check: () => {
            const bad = [], L = JSON.parse(read('data/hanmap_seo.json')).langs;
            const get = (c) => (Array.isArray(L) ? L.find((r) => r.code === c) : L[c]) || {};
            if ((get('ko_mid').names || {}).ja !== '中世韓国語') bad.push('data/hanmap_seo.json ko_mid');
            if ((get('zh_jh').names || {}).ja !== '揚州話') bad.push('data/hanmap_seo.json zh_jh');
            for (const [c, r] of Object.entries(L)) for (const [ui, n] of Object.entries(r.names || {})) if (/[（(]/.test(n)) { bad.push('data/hanmap_seo.json ' + c + ' ' + ui); break; }
            if (!/__ensureLangNames\(uiLang\)/.test(read('hanmap.html'))) bad.push('hanmap.html ui= branch');
            return bad;
        },
    },
    {
        id: 'timemap-labels-sans',
        what: 'Time Map labels are sans-serif: no Noto Serif JP/SC/KR in .tm-script (owner 2026-10-21)',
        check: () => { const m = read('timemap.html').match(/\.tm-script \{ font-family:([^}]*)\}/); return !m || /Noto Serif (JP|SC|KR)/.test(m[1]) ? ['timemap.html'] : []; },
    },
];

let problems = 0;
for (const d of DECISIONS) {
    const bad = d.check();
    if (bad.length) { problems += bad.length; console.log(`  ✗ ${d.id}: ${d.what}\n      broken in: ${bad.join(', ')}`); }
}
console.log(`owner decisions — ${DECISIONS.length} checked, problems: ${problems}`);
