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
 * THIS CANNOT DECIDE, and the direction is not always the same. Of the 29
 * cells it first reported, 21 turned out to be the check misfiring and one was
 * a real error — and the misfires all pointed the same way: the flagship row
 * was right and its SIBLINGS were the unsourced ones.
 *
 * The largest cluster was `sun`: yue, wuu, wuu_sz and cjy_xz all say 太陽 while
 * every sibling says 日頭. Four flagship rows carrying the Mandarin word is the
 * exact shape of an import — but the dialect tables list 太陽 first for Hong
 * Kong, give it for Shanghai with 日頭 marked dated, and give it for Suzhou and
 * Xinzhou too. Meanwhile 日頭 is not listed at all for Dongguan, Zhongshan,
 * Hangzhou, Wenzhou or Lishi, which is where this corpus puts it. The
 * characteristically Yue word is 熱頭, and nothing in the corpus has it.
 *
 * So the check finds a disagreement and nothing more. Read the ALLOW block
 * below before trusting any finding here: every entry in it is a cell this
 * check accused and a dictionary cleared.
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
// Every entry below was checked on 2026-09-05 against Wiktionary's Chinese
// dialectal-synonym tables (Module:zh/data/dial-syn/<word>), which reproduce the
// point-by-point fieldwork of 《漢語方言詞匯》 and 《現代漢語方言大詞典》. The
// location key for each row: yue=Hong Kong, wuu=Shanghai, wuu_sz=Suzhou,
// wuu_hz=Hangzhou, wuu_wz=Wenzhou, gan=Nanchang, cjy=Taiyuan, cjy_xz=Xinzhou,
// hak_cn=Meixian.
//
// Caveat worth keeping in mind: that fieldwork is mid-20th-century, so a form
// it omits may still be current speech today. Absence there is a reason to
// look, not a verdict on its own.
const ALLOW = {
    // 你 is the MOE's recommended character for Taiwanese lí; the 汝 the other
    // Hokkien rows use is the etymological spelling, not a different word.
    'you|nan': true,

    // --- sun: the whole cluster is the check being wrong, in both directions.
    // Hong Kong lists 太陽 FIRST (太陽/熱頭/日頭); Shanghai gives 太陽 with 日頭
    // marked dated; Suzhou 太陽/日頭; Xinzhou 太陽/爺爺. All four flagship rows
    // are right. It is five of their SIBLINGS that are unsourced — see the
    // handoff. 熱頭, not 日頭, is the characteristically Yue word.
    'sun|yue': true, 'sun|wuu': true, 'sun|wuu_sz': true, 'sun|cjy_xz': true,

    // --- father: 爸爸 is listed at every one of these points.
    // HK 阿爸/爸爸/爸/爹哋; Shanghai 爸爸/老爸; Hangzhou 爹/阿伯/爸爸;
    // Nanchang 爸爸/爺. The siblings' 阿爸 and 爹爹 are alternatives, not
    // corrections.
    'father|yue': true, 'father|wuu': true, 'father|wuu_hz': true,
    'father|gan': true,

    // --- mother: HK 媽咪/阿媽/媽媽; Hangzhou 姆媽/媽媽/娘. Both listed.
    // `gan` was NOT: Nanchang gives 姆媽/娘 and no 媽媽, so that cell was
    // changed to 姆妈 (Wiktionary Gan reading of 姆媽 is m1 ma = m̩˦˨ ma).
    'mother|yue': true, 'mother|wuu_hz': true,

    // --- you, and therefore hello. The 2sg pronoun tables give Hangzhou 你 and
    // Wenzhou 你 outright — against Shanghai 儂, Suzhou 倷, Ningbo 諾/爾. So
    // 你 is these two lects' own pronoun and 你好 is their own greeting, not
    // Mandarin leaking in. Hangzhou Wu is Mandarin-shaped for a historical
    // reason: the Southern Song court moved there.
    'you|wuu_hz': true, 'you|wuu_wz': true,
    'hello|wuu_hz': true, 'hello|wuu_wz': true,

    // --- house. 房子 is listed for Hangzhou; 家 has no Hangzhou entry at all,
    // so the 屋里 its siblings carry is the unsourced side here. The concept
    // gloss allows both readings ("in some varieties this surfaces as a
    // locative compound … lexicalized as house/home").
    'house|wuu_hz': true,

    // --- egg. HK is 雞蛋 (雞春 marked dated). The bare 蛋 in all five sibling
    // rows is what no source gives: Taishan/Gaozhou/Nanning are 雞蛋 too, and
    // Dongguan/Zhongshan are 雞春.
    'egg|yue': true,

    // --- eat, eye. Nanchang is 吃 and 眼睛. Gan is one of the Sinitic groups
    // that genuinely took 吃 rather than 食; the agreement with Mandarin is the
    // language, not a copy.
    'eat|gan': true, 'eye|gan': true,

    // --- tree. Meixian is 樹, bare. The 仔 in hak_tw/hak_hl 樹仔 is Taiwan
    // Hakka's suffix, not something Meixian dropped.
    'tree|hak_cn': true,

    // --- love. Wiktionary gives Meixian 愛 oi4 = /oɪ⁵³/, matching this row's
    // IPA exactly, and lists "to love" among its Hakka senses alongside the
    // regional "to want / must". hak_tw/hak_hl 惜 siak is the doting word — a
    // different shade, not a correction.
    'love|hak_cn': true,

    // --- we. Xinzhou has the clusivity pair outright: 咱們 inclusive against
    // 我們/俺們/俺 exclusive. Its agreement with Mandarin IS the distinction.
    // (Taiyuan has 咱們/咱 too and `cjy` carries only 我们 — the reverse gap,
    // logged in the handoff.)
    'we|cjy_xz': true,
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
