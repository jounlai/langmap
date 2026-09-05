#!/usr/bin/env node
/**
 * sinitic_lexical_import_check.js — a lect that agrees with Mandarin where its
 * own siblings do not has probably been filled from Mandarin.
 *
 * The tone version of this (sinitic_tone_outlier_check.js) works because tone
 * inventories are closed sets. Lexicon is not, so this uses the other signal
 * from the same 2026-09-05 reader report: `nan` said 爸爸 and 媽媽 while
 * `nan_xm` — the SAME language — said 老爸 and 老母, and the MOE Taiwanese
 * dictionary has no entry for 爸爸 at all.
 *
 * The rule: within a group of varieties of one language, flag a row whose
 * surface equals Mandarin's when at least two of its siblings differ. One or
 * two rows agreeing with Mandarin against four or five siblings is the shape
 * of an import.
 *
 * Traditional and simplified are normalised away first. Without that the report
 * is 41 findings and half of them are `hak_cn` 铁 against `hak_tw` 鐵, which is
 * the documented per-code script convention doing exactly what it should.
 *
 * THIS CANNOT DECIDE, and the direction is not always the same. The largest
 * cluster it finds is `sun`: yue, wuu, wuu_sz and cjy_xz all say 太陽 while
 * every one of their siblings says 日頭. That looks like four flagship rows
 * filled from Mandarin — until you check, and Wiktionary gives Cantonese 日頭
 * as DAYTIME, not the sun. So in the Yue group the flagship row is right and
 * the five dialect rows are the suspects, which is the reverse of the Hokkien
 * case that prompted this. The check finds the disagreement; it does not know
 * which side is wrong.
 *
 * It produces a shortlist for a human with a dictionary.
 * `nan` you 你 against six siblings' 汝 is on the list and is CORRECT — 你 is
 * the Ministry of Education's recommended character for Taiwanese lí. A row is
 * allowed to agree with Mandarin; the check only says which agreements are
 * worth a second look.
 *
 * Usage:
 *   node tools/sinitic_lexical_import_check.js          # full report
 *   node tools/sinitic_lexical_import_check.js --check  # "mandarin-shaped cells: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Reviewed and kept, with the reason. A row on this list agrees with Mandarin
// because that is what the language does, not because a cell was copied.
const ALLOW = {
    // 你 is the MOE's recommended character for Taiwanese lí; the 汝 the other
    // Hokkien rows use is the etymological spelling, not a different word.
    'you|nan': true,
};

// Varieties of one language. Historical stages (zh_song, zh_han …) are left out
// on purpose: they are not varieties of modern Mandarin and would flood this.
const GROUPS = {
    nan: /^nan(_|$)/, hak: /^hak(_|$)/, yue: /^yue(_|$)/, wuu: /^wuu(_|$)/,
    gan: /^gan(_|$)/, cjy: /^cjy(_|$)/, hsn: /^hsn(_|$)/, cdo: /^cdo(_|$)/,
};

// Traditional -> simplified, enough to normalise the surfaces this corpus uses.
const PAIRS = ('樹树愛爱謝谢電电腦脑壽寿兩两學学國国說说話话飲饮買买賣卖車车馬马魚鱼鳥鸟門门陽阳陰阴語语'
    + '東东頭头龍龙農农銀银錢钱鐵铁長长風风飛飞對对會会來来時时這这個个們们麼么兒儿點点燒烧熱热'
    + '開开關关聽听覺觉讀读書书現现樣样過过進进遠远應应燈灯蟲虫雞鸡鴨鸭鵝鹅蝦虾島岛灣湾醫医藥药'
    + '團团圓圆邊边紅红綠绿號号萬万與与雲云穀谷鳩鸠貓猫華华漢汉廣广韓韩體体發发舊旧觀观歡欢樂乐'
    + '機机業业傳传專专轉转節节聲声葉叶蘭兰嶺岭歲岁氣气種种稱称親亲豬猪雙双雜杂驢驴鹽盐貴贵齒齿'
    + '媽妈爺爷嬤嬷屋屋兒儿窩窝');
const T2S = new Map();
for (let i = 0; i + 1 < PAIRS.length; i += 2) T2S.set(PAIRS[i], PAIRS[i + 1]);
const norm = (s) => String(s).replace(/[㐀-鿿]/g, (ch) => T2S.get(ch) || ch);

const ctx = vm.createContext({});
vm.runInContext('var window = this; this.WORDS = window.WORDS = {};', ctx);
for (const f of fs.readdirSync(path.join(ROOT, 'words')).filter((f) => f.endsWith('.js')))
    try { vm.runInContext(fs.readFileSync(path.join(ROOT, 'words', f), 'utf8'), ctx, { filename: f }); }
    catch (e) { /* another guard's problem */ }
const W = vm.runInContext('window.WORDS', ctx);

const raw = (cell) => (Array.isArray(cell) ? cell[0] : (cell && cell.form)) || null;
const surf = (cell) => { const s = raw(cell); return s ? norm(s) : null; };

const codes = new Set();
for (const id of Object.keys(W)) for (const k of Object.keys(W[id].data || {})) codes.add(k);
const members = {};
for (const [g, re] of Object.entries(GROUPS)) members[g] = [...codes].filter((k) => re.test(k));

const findings = [];
for (const id of Object.keys(W).sort()) {
    const d = W[id].data || {};
    const z = surf(d.zh);
    if (!z) continue;
    for (const g of Object.keys(members)) {
        const sib = members[g].filter((k) => surf(d[k]));
        if (sib.length < 3) continue;                 // too few to have a majority
        const same = sib.filter((k) => surf(d[k]) === z);
        const diff = sib.filter((k) => surf(d[k]) !== z);
        if (!same.length || same.length > 2 || diff.length < 2) continue;
        for (const code of same) {
            if (ALLOW[id + '|' + code]) continue;
            findings.push({ id, code, mandarin: raw(d.zh), mine: raw(d[code]),
                others: diff.map((k) => k + '=' + raw(d[k])).join(' ') });
        }
    }
}

if (CHECK) {
    console.log('mandarin-shaped cells: ' + findings.length);
} else {
    let cur = '';
    for (const f of findings) {
        if (f.id !== cur) { cur = f.id; console.log('\n### ' + f.id + '   Mandarin: ' + f.mandarin); }
        console.log('  ' + f.code.padEnd(9) + String(f.mine).padEnd(10) + 'siblings: ' + f.others);
    }
    console.log('\nmandarin-shaped cells: ' + findings.length
        + '\nEach needs a dictionary before it is changed; a row may legitimately agree with Mandarin.');
}
