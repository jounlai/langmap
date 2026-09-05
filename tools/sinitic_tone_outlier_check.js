#!/usr/bin/env node
/**
 * sinitic_tone_outlier_check.js — a Chao value a Sinitic row almost never uses
 * is usually a neighbour's value copied in.
 *
 * A lect has a fixed, small tone inventory. Every cell in its row should draw
 * from it. So a contour that appears once or twice in a row of sixty cells is
 * not a subtlety — it is a cell filled from the wrong language.
 *
 * Found by a reader report on 2026-09-05 (酒井亨: Taiwanese says 齒 khí, not
 * 牙 gê). Fixing that one cell exposed ten more in the same row, all with the
 * same signature — nan carrying Mandarin's ˧˥ and ˥˩, or Xiamen's ˨˨ and ˦˦,
 * while nan_xm, the SAME language, had the right value all along:
 *
 *   hello 你好 li˧˥ho˧˥       i 我 ɡua˥˩        moon 月娘 …niũ˧˥
 *   sun 日頭 …tʰau˧˥          we 咱/阮 lan˥˩     you 你 li˥˩
 *   thanks 多謝 …sia˨˨ (Xiamen 陽去)            milk 牛奶 …nĩ˦˦ (Xiamen 陰平)
 *
 * sinitic_tone_class_check.js could not see any of them, by design: it checks
 * 平聲 and 入聲 only (上/去 vary too much in NOTATION between rows to compare),
 * and it reads single-character surfaces only, so 月娘, 日頭 and 你好 are
 * invisible to it. This check ignores tone class and syllable count entirely
 * and asks one question instead: does this row use this contour anywhere else?
 *
 * Loanwords are exempt where the row says so — a Japanese borrowing can carry a
 * shape the native inventory does not have.
 *
 * Tuned to contours used EXACTLY ONCE in a row of at least 30 tone tokens.
 * At "twice or fewer" the report doubles to 244 and starts including real
 * notational variation; at once, 126 remain and the ones spot-checked are
 * genuine.
 *
 * Usage:
 *   node tools/sinitic_tone_outlier_check.js          # full report
 *   node tools/sinitic_tone_outlier_check.js --check  # "tone outliers: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Reviewed and accepted: a contour that is rare in the row for a real reason.
const ALLOW = {
    // 壽司 is a Japanese borrowing written with its sandhi (su˥˧⁻˦) and a final
    // shape the native inventory does not have. Not a copied cell.
    'sushi|nan': ['˧˨'],
};

const SINITIC = /^(zh|yue|nan|hak|wuu|cdo|cpx|mnp|hsn|gan|cjy|czh|cnp|min|zhx|dng)(_|$)/;
const MIN_TOKENS = 30;   // a row too thin to have an inventory tells us nothing
const RARE = 1;          // used exactly this often = outlier

const ctx = vm.createContext({});
vm.runInContext('var window = this; this.WORDS = window.WORDS = {};', ctx);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
    try { vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), ctx, { filename: f }); }
    catch (e) { /* a word that will not load is another guard's problem */ }
const W = vm.runInContext('window.WORDS', ctx);

const CHAO = /[˥˦˧˨˩]+/g;
const ipaOf = (cell) => (Array.isArray(cell) ? cell[1] : (cell && cell.ipa)) || '';

// row -> contour -> [word ids]
const rows = {};
for (const id of Object.keys(W)) {
    const data = W[id].data || {};
    for (const code of Object.keys(data)) {
        if (!SINITIC.test(code)) continue;
        const ipa = ipaOf(data[code]);
        if (!ipa) continue;
        const seen = new Set(String(ipa).match(CHAO) || []);
        for (const t of seen) {
            rows[code] = rows[code] || {};
            (rows[code][t] = rows[code][t] || []).push(id);
        }
    }
}

const findings = [];
for (const code of Object.keys(rows).sort()) {
    const total = Object.values(rows[code]).reduce((n, a) => n + a.length, 0);
    if (total < MIN_TOKENS) continue;
    const common = Object.entries(rows[code]).filter(([, a]) => a.length > RARE).map(([t]) => t);
    for (const [tone, ids] of Object.entries(rows[code])) {
        if (ids.length > RARE) continue;
        for (const id of ids) {
            if ((ALLOW[id + '|' + code] || []).includes(tone)) continue;
            // Which other Sinitic row uses this contour freely? That is the
            // likeliest source, and it is what makes the finding actionable.
            const from = Object.keys(rows).filter((o) => o !== code
                && (rows[o][tone] || []).length > RARE).slice(0, 3);
            findings.push({ code, tone, id, ipa: ipaOf((W[id].data || {})[code]),
                common: common.join(' '), from: from.join(' ') });
        }
    }
}

if (CHECK) {
    console.log('tone outliers: ' + findings.length);
} else {
    let cur = '';
    for (const f of findings) {
        if (f.code !== cur) { cur = f.code; console.log('\n### ' + f.code + '   inventory: ' + f.common); }
        console.log('  ' + f.tone.padEnd(5) + f.id.padEnd(12) + f.ipa.padEnd(22)
            + (f.from ? 'used freely by: ' + f.from : 'used by no other row'));
    }
    console.log('\ntone outliers: ' + findings.length);
}
