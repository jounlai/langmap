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
        what: 'Cells the owner ruled on stay as ruled: es_pr mai̯/pai̯ (dialect feature), vi_c/vi_s r = ɹ not ʐ (2026-08-31, c9d451e8), English "fire" has no ˈ (2026-07-21, 02846461), India hyw/inh persian and Germany ee/lg/kbp germania by sound (2026-11-12)',
        check: () => {
            const bad = [];
            if (!/es_pr: \["madre", "mai̯"\]/.test(read('words/mother.js'))) bad.push('words/mother.js es_pr');
            if (!/es_pr: \["padre", "pai̯"\]/.test(read('words/father.js'))) bad.push('words/father.js es_pr');
            for (const f of fs.readdirSync(path.join(ROOT, 'words'))) {
                if (!f.endsWith('.js')) continue;
                if (/^\s*["']?vi_[cs]["']?\s*:\s*\[[^\]]*ʐ/m.test(read('words/' + f))) bad.push('words/' + f + ' vi_c/vi_s ʐ');
            }
            if (/["']?en(_[a-z0-9]+)?["']?\s*:\s*\[\s*"fire",\s*"ˈ/.test(read('words/fire.js'))) bad.push('words/fire.js stress');
            // Routes by sound (owner 2026-11-12): India hyw/inh on the Persian route; Germany ee/lg/kbp from Germania.
            const fam = (w, c) => (read('words/' + w + '.js').match(new RegExp('^    ' + c + ': "([a-z_]+)",$', 'm')) || [])[1];
            for (const [w, c, r] of [['india', 'hyw', 'persian'], ['india', 'inh', 'persian'], ['germany', 'ee', 'germania'], ['germany', 'lg', 'germania'], ['germany', 'kbp', 'germania']])
                if (fam(w, c) !== r) bad.push(`words/${w}.js ${c} ≠ ${r}`);
            return bad;
        },
    },
    {
        id: 'hanmap-no-far-fling',
        what: 'At z>=6 a Han Map label that does not fit near its point hides instead of moving far (owner 2026-09-06, 675a7344). Below z=6 the second try reaches at most 80 px (owner 2026-10-19: 海陸客家語 far away at z5.5). Co-located stacks too: at z>=6 a member further than _maxR + its half-height from its dot leaves the stack (r32). Exception (owner 2026-10-23, 西 with a 日韓 filter at z6.5): with a filter on, the second try runs at every zoom, up to two label widths; and _maxR grows with the text size above fs=140',
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
            // 2026-10-28: whale 48 → 49 — the kpv кит cell exposed koi (Komi-Permyak), which no source covers.
            // 2026-10-28: turkey 49 → 51 — new kpv индюк and myv курка cells expose koi and mdf (no Komi-Permyak or Moksha source found).
            // 2026-10-28: tomato 37 → 39 — new kpv and dtp cells expose koi and dtp_kzj (Coastal Kadazan); no source for either.
            // 2026-10-28: potato 32 → 33 — the new lij patàtta cell exposes lij_t (Tabarchino), with no source.
            // 2026-10-28: monday 21 → 22 — lij lunedì exposes lij_t likewise.
            // 2026-10-29: turkey 51 → 52 — new cr ᒥᓯᐦᐁᐤ exposes crk (Plains Cree); no source.
            // 2026-10-29: pineapple 49 → 52 — new se and frr cells expose smj, sms (Lule/Skolt Sámi) and frr_amr (Öömrang); no sources.
            // 2026-10-29: tomato 39 → 40 — new cr cell exposes crk (Plains Cree); no source.
            // 2026-10-29: potato 33 → 34 — new cr ᐊᐢᑭᑇᐏ exposes crk (Plains Cree); no source.
            // 2026-10-29: whale 49 → 51 — new frr and cr cells expose frr_amr (Öömrang) and crk (Plains Cree); no sources.
            // 2026-10-29: germany 40 → 41 — new cr cell exposes crk (Plains Cree); no source.
            // 2026-10-29: china 29 → 30 — new frr Sina exposes frr_amr (Öömrang); no source.
            // 2026-10-29: korea 38 → 40 — new se Korea exposes smj and sms (Lule/Skolt Sámi); no sources.
            // 2026-10-29: greece 41 → 43 — new frr and nrf cells expose frr_amr (Öömrang) and nrf_gg (Guernésiais); no sources.
            // 2026-10-29: india 31 → 35 — 10k–100k round: new se, cr, nrf cells expose smj, sms (Lule/Skolt Sámi), crk (Plains Cree), nrf_gg (Guernésiais); no sources.
            // 2026-10-29: shootingstar 43 → 45 — new kpv and dtp cells expose koi (Komi-Permyak) and dtp_kzj (Coastal Kadazan); no sources.
            // 2026-10-29: adamsapple 60 → 61 — new nyo ekiimironko exposes ttj (Tooro); no source.
            // 2026-10-29: jellyfish 70 → 71 — new dtp bohung exposes dtp_kzj (Coastal Kadazan); no source.
            // 2026-10-29: octopus 55 → 56 — new lij pórpo exposes lij_t (Tabarchino); no source.
            // 2026-10-29: sunflower 40 → 42 — new lij and dtp cells expose lij_t (Tabarchino) and dtp_kzj (Coastal Kadazan); no sources.
            // 2026-10-29: germany 38 → 40 — new lij and dtp cells expose lij_t (Tabarchino) and dtp_kzj (Coastal Kadazan); no sources.
            // 2026-10-29: china 27 → 29 — new lij and dtp cells expose lij_t (Tabarchino) and dtp_kzj (Coastal Kadazan); no sources.
            // 2026-10-29: korea 37 → 38 — new dtp Korea Kabaatan exposes dtp_kzj (Coastal Kadazan); no source.
            // 2026-10-29: greece 38 → 41 — new nyo, lij, dtp cells expose ttj (Tooro), lij_t (Tabarchino), dtp_kzj (Coastal Kadazan); no sources.
            // 2026-10-29: india 29 → 31 — new dtp and lij India cells expose dtp_kzj (Coastal Kadazan) and lij_t (Tabarchino); no source for either.
            // 2026-10-29: adamsapple 59 → 60 — new lt Adomo obuolys exposes sgs (Samogitian); no source.
            // 2026-10-29: wisdomtooth 54 → 55 — new lt protinis dantis exposes sgs (Samogitian); no source.
            // 2026-10-29: octopus 54 → 55 — new lt aštuonkojis exposes sgs (Samogitian); no source.
            // 2026-10-29: germany 37 → 38 — new czh 德国 (Tunxi) exposes czh_wy (Wuyuan); no Wuyuan source for the name.
            // 2026-10-29: korea 36 → 37 — new lt Korėja exposes sgs (Samogitian); its Wikipedia has Kuoriejė but no stress source.
            // 2026-10-29: goosebumps 51 → 53 — new jv mrinding and hy cells expose jvn (Caribbean Javanese) and hyw (Western Armenian); no source for either.
            // 2026-11-03: ratcheted after Kansai/Hakata/Hiroshima and Jeolla/Busan cells copied from the national word.
            // 2026-11-05: new word sunday; variety rows without a source for the day name.
            // 2026-11-09: ratchet after the variety fill (review 674): uncle 121→120, lion 133→125, earthquake 129→124, wife 69→54, yellow 51→50, camel 79→76, window 91→86, week 65→63, saturday 99→69, money 76→73, paper 77→74, maize 70→66, twenty 29→28, sunday 58→54, turkey 46→45, potato 34→32, hangover 56→51, ladybird 61→58, whale 45→44, wisdomtooth 55→54, cheers 31→30, blessyou 24→23, goosebumps 53→52, octopus 49→48, shootingstar 36→35, jellyfish 71→66, pineapple 46→44, adamsapple 61→54, germany 33→31, china 27→26, korea 37→34, india 29→26, greece 36→34, cockcrow 46→42.
            // 2026-11-09: camel 73 → 79 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: cotton 113 → 114 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: earthquake 121 → 129 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: lion 123 → 133 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: maize 64 → 70 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: money 68 → 76 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: paper 71 → 77 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: soap 79 → 82 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: sunflower 36 → 38 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: tear 119 → 120 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: tobacco 81 → 82 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: twenty 27 → 29 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: uncle 117 → 121 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: week 64 → 65 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: wife 57 → 69 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: window 82 → 91 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: yellow 49 → 51 — Wiktionary gap fill, slice A (review 672): new parent cells expose variety rows; no variety-level source yet.
            // 2026-11-09: earthquake 118 → 121 — Wiktionary gap fill (review 671): new parent cells expose cjy_lv cjy_xz gan_fz gan_ja gan_yc jvn; no variety-level source yet.
            // 2026-11-09: lion 119 → 123 — Wiktionary gap fill (review 671): new parent cells expose cjy_lv cjy_xz gan_fz gan_ja gan_yc jvn lij_t; no variety-level source yet.
            // 2026-11-09: money 65 → 68 — Wiktionary gap fill (review 671): new parent cells expose cjy_lv cjy_xz gan_fz gan_ja gan_yc jvn; no variety-level source yet.
            // 2026-11-09: right 55 → 56 — Wiktionary gap fill (review 671): new parent cells expose nrf_gg; no variety-level source yet.
            // 2026-11-09: soap 78 → 79 — Wiktionary gap fill (review 671): new parent cells expose cjy_lv cjy_xz nrf_gg; no variety-level source yet.
            // 2026-11-09: sunday 52 → 58 — Wiktionary gap fill (review 671): new parent cells expose nrf_gg yue_dg yue_gz yue_nn yue_ts yue_zs; no variety-level source yet.
            // 2026-11-09: twenty 26 → 27 — Wiktionary gap fill (review 671): new parent cells expose nrf_gg; no variety-level source yet.
            // 2026-11-09: uncle 116 → 117 — Wiktionary gap fill (review 671): new parent cells expose nrf_gg; no variety-level source yet.
            // 2026-11-09: week 63 → 64 — Wiktionary gap fill (review 671): new parent cells expose nrf_gg; no variety-level source yet.
            // 2026-11-09: wife 47 → 57 — Wiktionary gap fill (review 671): new parent cells expose cjy_lv cjy_xz gan_fz gan_ja gan_yc vi_c vi_s yue_dg yue_gz yue_nn yue_ts yue_zs; no variety-level source yet.
            // 2026-11-09: cotton 112 → 113 — Wiktionary gap fill (review 671): new jv kapas exposes jvn (Caribbean Javanese); no town-level source yet.
            // 2026-11-09: earthquake 115 → 118 — Wiktionary gap fill (review 671): new cjy 地震 and jv cells expose cjy_lv, cjy_xz (Lüliang, Xinzhou Jin) and jvn; no town-level source yet.
            // 2026-11-09: lion 116 → 119 — Wiktionary gap fill (review 671): new cjy 狮子 and jv cells expose cjy_lv, cjy_xz and jvn; no town-level source yet.
            // 2026-11-09: money 62 → 65 — Wiktionary gap fill (review 671): new cjy 钱 and jv cells expose cjy_lv, cjy_xz and jvn; no town-level source yet.
            // 2026-11-09: soap 76 → 78 — Wiktionary gap fill (review 671): new cjy 胰子 exposes cjy_lv, cjy_xz; no town-level source yet.
            // 2026-11-09: wife 45 → 47 — Wiktionary gap fill (review 671): new cjy 老婆 exposes cjy_lv, cjy_xz; no town-level source yet.
            // 2026-11-09: window 80 → 82 — Wiktionary gap fill (review 671): new cjy 窗户 exposes cjy_lv, cjy_xz; no town-level source yet.
            // 2026-11-09: camel 76 → 77 — Wiktionary gap fill pass 2 (review 675): new parent cells expose koi; no variety-level source yet.
            // 2026-11-09: jellyfish 66 → 67 — Wiktionary gap fill pass 2 (review 675): new parent cells expose nrf_gg; no variety-level source yet.
            // 2026-11-09: lion 125 → 126 — Wiktionary gap fill pass 2 (review 675): new parent cells expose koi; no variety-level source yet.
            // 2026-11-09: maize 66 → 68 — Wiktionary gap fill pass 2 (review 675): new parent cells expose smj sms; no variety-level source yet.
            // 2026-11-09: money 73 → 74 — Wiktionary gap fill pass 2 (review 675): new parent cells expose lij_t; no variety-level source yet.
            // 2026-11-09: paper 74 → 77 — Wiktionary gap fill pass 2 (review 675): new parent cells expose smj sms nrf_gg; no variety-level source yet.
            // 2026-11-09: thousand 71 → 72 — Wiktionary gap fill pass 2 (review 675): new parent cells expose nrf_gg; no variety-level source yet.
            // 2026-11-09: wife 54 → 56 — Wiktionary gap fill pass 2 (review 675): new parent cells expose prs lij_t; no variety-level source yet.
            // 2026-11-09: window 86 → 89 — Wiktionary gap fill pass 2 (review 675): new parent cells expose wae gsw_w gsw_als lij_t; no variety-level source yet.
            // 2026-11-09: germany 31 → 32 — Wiktionary gap fill pass 2b (review 676): new parent cells expose rmy; no variety-level source yet.
            // 2026-11-09: maize 68 → 69 — Wiktionary gap fill pass 2b (review 676): new parent cells expose dtp_kzj; no variety-level source yet.
            // 2026-11-09: soap 82 → 83 — Wiktionary gap fill pass 2b (review 676): new parent cells expose jvn; no variety-level source yet.
            // 2026-11-09: week 63 → 65 — Wiktionary gap fill pass 2b (review 676): new parent cells expose wae gsw_w gsw_als lij_t; no variety-level source yet.
            // 2026-11-13: wisdomtooth 54 → 57 — the new th ฟันกรามซี่สุดท้าย cell (native report: ฟันคุด is 'impacted tooth') exposes th_isan, th_n, th_s; no variety-level source.
            // 2026-11-13: kiss 27 → 50 — the new zh 吻, yue 吻 and th การจูบ cells (site-language gaps, review 725) expose 20 Sinitic variety rows and th_isan, th_n, th_s; no variety-level source for the noun.
            // 2026-11-13: jetlag 40 → 53 — the new ar, th, it, uk, id cells (review 725) expose the Arabic dialect rows, th_isan/th_n/th_s and it_dan; no variety-level source (vi_c and vi_s filled by the dialect rules).
            // 2026-11-13: bubbletea 99 → 109 — the new ar, it, uk cells (review 725) expose the Arabic dialect rows and it_dan; no variety-level source.
            // 2026-11-13: usbstick 104 → 107 — the new th แฟลชไดรฟ์ cell (review 725) exposes th_isan, th_n, th_s; no source.
            const BUDGET = {usbstick: 107, jetlag: 53, cottoncandy: 71, bubbletea: 109, bread: 50, butter: 63, cheese: 56, chili: 47, east: 70, friday: 59, husband: 56, king: 70, kiss: 50, tuesday: 56, wednesday: 54, left: 60, language: 62, gold: 121, mirror: 118, island: 125, spider: 121, snake: 121, monkey: 121, elephant: 122, uncle: 120, cotton: 114, lion: 126, earthquake: 124, tear: 120, tobacco: 82, wife: 56, soap: 83, yellow: 50, camel: 77, window: 89, thousand: 72, week: 65, saturday: 69, money: 74, paper: 77, maize: 69, right: 56, twenty: 28, sunday: 54, lol: 0, turkey: 45, potato: 32, mobilephone: 43, hangover: 51, ladybird: 58, monday: 22, whale: 44, wisdomtooth: 57, cheers: 30, blessyou: 23, sunflower: 38, goosebumps: 52, octopus: 48, shootingstar: 35, jellyfish: 67, tomato: 34, pineapple: 44, adamsapple: 54, germany: 32, japan: 29, china: 26, korea: 34, india: 26, greece: 34, atsign: 30, blue: 5, cockcrow: 42, coffee: 25, computer: 8, cuckoo: 27, dopamine: 31, n99: 11, orange: 7, sugar: 11, sushi: 11, tea: 8, wifi: 26, woof: 29};
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
    {
        id: 'only-mode-no-ring',
        what: 'With Only on, compared labels show no amber ring on the Word Map and the Han Map (owner 2026-08-30 / 2026-10-21)',
        check: () => ['wordmap.html', 'hanmap.html'].filter((f) => !/body\.only-compare \.lang-label\.in-compare:not\(\.selected\)[\s\S]{0,300}box-shadow: none/.test(read(f))),
    },
    {
        id: 'master-one-medal',
        what: 'Language Master uses one SVG medal everywhere on screen (panel, map labels, game, seals), never the 🏅 emoji (owner 2026-10-22)',
        check: () => {
            const m = read('master.js'), w = read('wordmap.html');
            const bad = [];
            if (!/translate\(34 8\) scale\(1\.6\)">' \+ MEDAL_INNER/.test(m)) bad.push('master.js: seal lost its medal');
            if (/[>'(]\s*['"]?🏅 ?' \+ esc|<span aria-hidden="true">🏅<\/span>|header\('🏅/.test(m)) bad.push('master.js: 🏅 emoji back in the game UI');
            if (/lm-mt-medal" aria-hidden="true">🏅|aria-hidden="true">🏅<\/span>\s*<span class="trivia-btn-label" id="master-btn-label"/.test(w)) bad.push('wordmap.html: 🏅 emoji back');
            return bad;
        },
    },
    {
        id: 'unanalysed-word-is-plain',
        what: 'A single Word Map word with no recorded image counts as "plain", a word of its own, not "not yet determined" (owner 2026-10-31); a cell keeps that note only while it is plain',
        check: () => {
            const NOTE = 'No image is recorded for it, so it counts as a word of its own.';
            const bad = [];
            for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((x) => x.endsWith('.js'))) {
                const t = read('words/' + f);
                if (!t.includes(NOTE)) continue;
                for (const m of t.matchAll(/^\s+([a-z_0-9]+): \[.*\/\/.*$/gm)) {
                    if (!m[0].includes(NOTE)) continue;
                    const r = t.slice(t.indexOf('family:')).match(new RegExp('^\\s+' + m[1] + ': "([a-z]+)",', 'm'));
                    if (!r || r[1] !== 'plain') bad.push(`words/${f}: ${m[1]} carries the plain note but is ${r ? r[1] : 'unrouted'}`);
                }
            }
            return bad;
        },
    },
];

let problems = 0;
for (const d of DECISIONS) {
    const bad = d.check();
    if (bad.length) { problems += bad.length; console.log(`  ✗ ${d.id}: ${d.what}\n      broken in: ${bad.join(', ')}`); }
}
console.log(`owner decisions — ${DECISIONS.length} checked, problems: ${problems}`);
