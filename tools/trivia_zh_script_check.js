#!/usr/bin/env node
/**
 * trivia_zh_script_check.js — the zh trivia must be written in SIMPLIFIED
 * characters.
 *
 * Every other zh surface in the atlas is simplified: the UI chrome
 * ("汉字地图", "现代后裔"), the language names, and all 70 WordMap trivia
 * articles (2,913 simplified characters, 0 traditional). HanMap's trivia was
 * the exception — 30 of 30 articles carried traditional text and 18 of them
 * were traditional end to end, so more than half the Han Map corpus reached a
 * mainland reader in the wrong script. Nothing caught it: the existing
 * zh_script_convention.js guard reads word CELLS, never article prose.
 *
 * The one thing a blanket conversion must not do is flatten a character that
 * the sentence is CITING as a written form. Those are listed in CITED below,
 * with the reason each one has to stay traditional. Converting them silently
 * makes the sentence false — 「體 → 体」 becomes 「体 → 体」, the coin stops
 * bearing the four characters the article says are cast on it, and a
 * data-char button stops matching the character it opens.
 *
 * Usage:
 *   node tools/trivia_zh_script_check.js          # full report
 *   node tools/trivia_zh_script_check.js --check  # "traditional zh characters: N"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');

// Characters that exist only in traditional orthography. Derived from the
// OpenCC t2s table over this corpus, minus the written-Cantonese characters
// (嘅 唔 咁 啲 冇 係 嗰 佢 咗 哋 睇 嘢 諗 攞 乜 嚟 喺), which are quoted
// Cantonese words rather than traditional spellings of Mandarin ones.
const TRAD = new Set((
    "並乾亂亞佈佔併來侶個們偉側傑備傳傷傾僅價儀儘償優內兩冊凍凱別則剛創劃劇劍勁動務勝勞勢區協卻參吳員" +
    "問啓啟單嘆嘖嘗嘩嚇嚴國圍園圓圖團執堅報場塊塗墳壓壞壟壩壯壽夠夢夾奪娛婁婦媽孫學宮實寧寫寶將專尋對" +
    "導屢層屬岡島嶇巔師帳帶幣幫幹幾庫廈廢廣張強彈彙彫後徑從復徵徹愛態慣慮慶憂憐憑憲憶應懸戰戲戶捨捲掛" +
    "採揀揚換損搵搶撈擁擇擋擔據擬擴擺敗敵數斃斷於時晉暢暫曆曉曖書會東査條棄業極榮構樂標樞樣樹機橫檔檻" +
    "櫻欄權歎歐歡歲歷歸殘殺氣汎決沒沖況涼淨減測準溝溫滅滲滿漁漢潰濁濃濟瀕灣為烏無煙煩熱燈營爛爭爾牆狀" +
    "獄獨獲獻現瑪環璽甌產産畢畫異當疇疊癢發盡監盤眾矯碩確碼礎禪禮種稱穌積穩竪競筆箇箏節範築簡籠籤粵紀" +
    "約納紐純紙級紛細終組結絕絡給統絲絶綁經綠綢維綱網綴緊緑緒線締緣編緩緬練緻縛縣縫縮縱總績織繞繪繫繰" +
    "繹繼續罰羅義習翹聖聞聯聲職聽脈脣脫膠膽臨與興舉舊茲莊華萊萬葉葦蒼蓋蕩藍蘇蘋蘭處虛虜號蝕蠻衆術衛衝" +
    "裏補裝裡製複襲見規視親覺觀觸訂計訊討訓記訛訣訪設許訴註証詔評詞詠試詩詰話該詳誇誌認誕語誠誤誦說説" +
    "誰課調談論諜諧諷諸諺諾謀謂謎謔講謠謳證識譜譯議護讀變讓讚豎豐貞負財貢貧貨貫責貴貶買費貼貿資賓賞賢" +
    "賦質賴賽贈趕跡躍車軌軍軟軸軼較載輔輕輩輪輯輸輾轉轍辦辭辯農逕這連週進遊運過達違遞遠遡適遲遷選遺遼" +
    "邁還邊邏鄉鄧鄭鄰醫釋針鈔鉤鉸銀銃銅銘銜銳銷鋏鋭錄錢錨錫錯録鍛鍵鎖鎮鏈鏡鐫鐵鑄鑊鑒鑿長門閉開間閩閱" +
    "闊關陣陰陸陽隊階際隨險隱隻雖雙雛雜雞離難雲電靚靜韓韻響頁頃項順須預頒頗領頭頻題額顎顏顔願類顧顯風" +
    "飛飯飲飼飾養餘館饅馬駁駐騰驅驗驚體鬆鬱魚魯鮮鱈鳥鳴鴻鶻麗麼黃點黨齊齒齦龍龐龔").split(''));

// Traditional strings that are quoted AS characters and must not be converted.
const CITED = {
    // 万葉仮名 is the Japanese spelling, given beside the Chinese 万叶假名.
    'kanbun-yomi-invention': ['万葉仮名'],
    // Japanese kundoku renderings and the kanji the kaeriten example acts on:
    // 「読書」 read as 「書ヲ読ム」. 見 also has to match its data-char button.
    'kanbun-kaeriten-system': ['「我汝ヲ愛ス」', '「読書」', '「書ヲ読ム」', '「書」', '「見」', 'data-char=\'見\'', 'data-char="見"'],
    // 饅頭 is the Japanese word glossed manjū; 東 matches its data-char button.
    'go-on-kan-on-to-on': ['<strong>饅頭</strong>', '「東」', 'data-char=\'東\'', 'data-char="東"'],
    // 鱈 is the kokuji the sentence is about (glossed 鳕鱼); 葉 is the character
    // 笹 is said to be a reduction of.
    'kokuji-japan-made-chars': ['鱈', '“葉”', '「葉」'],
    // The kyūjitai→shinjitai pairs. Simplify the left side and the comparison
    // collapses into 「广 → 広」, 「铁 → 鉄」, 「体 → 体」.
    'japanese-shinjitai-postwar': ['廣 → 広', '鐵 → 鉄', '體 → 体', '「鐵」', '現鐵與', '呈现鐵与'],
    // The four characters cast on the coin. 开元通宝 was never on it.
    'tang-empire-multilingual-coins': ['開元通寶'],
    // Min Nan / Taiwan writes 兩; the sentence says so explicitly.
    'min-nan-wenbai': ['<strong>兩</strong>', '写作兩'],
    // 業 is the kanji whose go-on ごう and kan-on ぎょう are being compared.
    'japanese-go-on-bias': ['業吴音读', '業吳音讀', '業吳音读'],
};

function articles(file, pick) {
    const ctx = vm.createContext({});
    vm.runInContext('var window = this;', ctx);
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
    return pick(ctx);
}

const rows = [];
function scan(id, where, s) {
    if (!s) return;
    let text = String(s);
    for (const cite of (CITED[id] || [])) text = text.split(cite).join(' ');
    for (let i = 0; i < text.length; i++) {
        if (!TRAD.has(text[i])) continue;
        rows.push({ id, where, ch: text[i], ctx: text.slice(Math.max(0, i - 22), i + 22).replace(/\s+/g, ' ') });
    }
}

const han = articles('hanmap_trivia.js', c => vm.runInContext('window.TRIVIA_ARTICLES', c) || []);
for (const a of han)
    for (const f of ['title', 'summary', 'body'])
        if (a[f] && a[f].zh) scan(a.id, f, a[f].zh);

// The WordMap zh overlay is a flat {id: {title, summary, body}} map.
const wm = articles('wordmap_trivia_zh.js', c => vm.runInContext('window.TRIVIA_I18N', c) || {});
for (const [id, a] of Object.entries(wm))
    for (const f of ['title', 'summary', 'body'])
        if (a && typeof a[f] === 'string') scan(id, f, a[f]);

if (CHECK) {
    console.log('traditional zh characters: ' + rows.length);
} else {
    let cur = '';
    for (const r of rows) {
        if (r.id !== cur) { cur = r.id; console.log('\n### ' + cur); }
        console.log('  [' + r.where + '] ' + r.ch + '   …' + r.ctx + '…');
    }
    console.log('\ntraditional zh characters: ' + rows.length +
        (rows.length ? '\nEach is either prose that should be simplified, or a cited form that belongs in CITED with a reason.' : ''));
}
