/**
 * nav-short.js — the header nav labels on wide screens (>640px).
 *
 * Loaded in <head>, so it labels the nav the moment the header is parsed.
 * Each page also writes its nav text itself, but only after its own boot:
 * until then the HTML's English ("Word Map") showed, then the page's full
 * label ("単語マップ"), then the short one — a visible flicker.
 *
 * So this script decides the header label itself, from the same UI-language
 * signals the pages use (?l= / #l=, the wm_uilang cookie, then <html lang>
 * once a page sets it), and shows it through CSS: the element's own text is
 * set to font-size 0 and data-short is drawn by ::after. The page's text is
 * never edited, so the hamburger drawer (≤640px) still shows the page's own
 * full names. In the header a bare "map" suffix is dropped
 * (ja マップ, ko 맵/지도, zh 地图, yue 地圖): 単語 / 漢字 / 名前 / 暦.
 * Other languages keep the full label, since "Map" is part of the phrase.
 *
 * Labels follow WordMap's NAV_* tables (NAV_TIME = timemap_i18n navTime).
 */
(function () {
    'use strict';
    var LABELS = {
        en: {"order":"Word Order","word":"Word Map","han":"HanMap","name":"Name Map","time":"Time Map","tree":"Tree"},
        ja: {"order":"語順マップ","word":"単語マップ","han":"漢字マップ","name":"名前マップ","time":"暦マップ","tree":"系統樹"},
        ko: {"order":"어순 맵","word":"단어 맵","han":"한자 맵","name":"이름 맵","time":"달력 맵","tree":"계통수"},
        zh: {"order":"语序图","word":"词汇地图","han":"汉字地图","name":"姓名地图","time":"历法地图","tree":"谱系树"},
        yue: {"order":"語序圖","word":"詞彙地圖","han":"漢字地圖","name":"姓名地圖","time":"曆法地圖","tree":"譜系樹"},
        vi: {"order":"Trật tự từ","word":"Bản đồ từ","han":"Bản đồ Hán tự","name":"Bản đồ tên","time":"Bản đồ lịch","tree":"Cây phả hệ"},
        th: {"order":"ลำดับคำ","word":"แผนที่คำ","han":"แผนที่ตัวอักษร","name":"แผนที่ชื่อ","time":"แผนที่ปฏิทิน","tree":"แผนภูมิ"},
        id: {"order":"Urutan Kata","word":"Peta Kata","han":"Peta Hanzi","name":"Peta Nama","time":"Peta Kalender","tree":"Pohon"},
        hi: {"order":"शब्द क्रम","word":"शब्द मानचित्र","han":"हान्ज़ी मानचित्र","name":"नाम मानचित्र","time":"कैलेंडर मानचित्र","tree":"वृक्ष"},
        de: {"order":"Wortstellung","word":"Wortkarte","han":"HanMap","name":"Namenskarte","time":"Kalenderkarte","tree":"Stammbaum"},
        fr: {"order":"Ordre des mots","word":"Carte des mots","han":"Carte des hanzi","name":"Carte des prénoms","time":"Carte des calendriers","tree":"Arbre"},
        it: {"order":"Ordine parole","word":"Mappa parole","han":"Mappa hanzi","name":"Mappa dei nomi","time":"Mappa dei calendari","tree":"Albero"},
        es: {"order":"Orden de palabras","word":"Mapa de palabras","han":"Mapa de hanzi","name":"Mapa de nombres","time":"Mapa de calendarios","tree":"Árbol"},
        pt: {"order":"Ordem das palavras","word":"Mapa de palavras","han":"Mapa de hanzi","name":"Mapa de nomes","time":"Mapa de calendários","tree":"Árvore"},
        ru: {"order":"Порядок слов","word":"Карта слов","han":"Карта иероглифов","name":"Карта имён","time":"Карта календарей","tree":"Древо"},
        uk: {"order":"Порядок слів","word":"Карта слів","han":"Карта ієрогліфів","name":"Карта імен","time":"Карта календарів","tree":"Дерево"},
        ar: {"order":"ترتيب الكلمات","word":"خريطة الكلمات","han":"خريطة الحروف","name":"خريطة الأسماء","time":"خريطة التقاويم","tree":"الشجرة"},
        he: {"order":"סדר מילים","word":"מפת מילים","han":"מפת תווים","name":"מפת שמות","time":"מפת לוחות שנה","tree":"אילן"},
        sw: {"order":"Mpangilio wa maneno","word":"Ramani ya maneno","han":"Ramani ya hanzi","name":"Ramani ya majina","time":"Ramani ya kalenda","tree":"Mti"},
    };
    var RULES = [/\s*マップ$/, /\s*맵$/, /\s*지도$/, /地图$/, /地圖$/];
    function shortOf(text) {
        for (var i = 0; i < RULES.length; i++) if (RULES[i].test(text)) return text.replace(RULES[i], '').trim() || text;
        return text;
    }
    function norm(code) {
        code = String(code || '').toLowerCase().replace('_', '-');
        if (code === 'yue' || code.indexOf('zh-hk') === 0 || code.indexOf('zh-mo') === 0 || code.indexOf('yue') === 0) return 'yue';
        if (LABELS[code]) return code;
        var b = code.slice(0, 2);
        return LABELS[b] ? b : null;
    }
    function fromUrl() {
        var m = /[?#&]l=([A-Za-z_-]+)/.exec(location.search + '&' + location.hash);
        return m ? norm(m[1]) : null;
    }
    function fromCookie() {
        var m = document.cookie.match(/(?:^|;\s*)wm_uilang=([^;]+)/);
        return m ? norm(decodeURIComponent(m[1])) : null;
    }
    function fromBrowser() {
        var l = navigator.languages || [navigator.language || 'en'];
        for (var i = 0; i < l.length; i++) { var c = norm(l[i]); if (c) return c; }
        return 'en';
    }
    // <html lang> is trusted only once a page has set it: the markup's own
    // lang="en" is a placeholder written before any language is known.
    var htmlLangSet = false;
    function lang() {
        if (htmlLangSet) { var h = norm(document.documentElement.lang); if (h) return h; }
        return fromUrl() || fromCookie() || fromBrowser();
    }
    var PAGE = { 'index.html': 'order', 'wordmap.html': 'word', 'hanmap.html': 'han',
                 'namemap.html': 'name', 'timemap.html': 'time', 'tree.html': 'tree' };
    function keyOf(el) {
        var href = el.getAttribute('href');
        var file = (href || location.pathname).split(/[?#]/)[0].split('/').pop() || 'index.html';
        return PAGE[file] || null;
    }
    function run() {
        var L = LABELS[lang()] || LABELS.en;
        var items = document.querySelectorAll('.site-header-bar .header-nav > a, .site-header-bar .header-nav > span:not(.nav-sep)');
        for (var i = 0; i < items.length; i++) {
            var k = keyOf(items[i]); if (!k || !L[k]) continue;
            var s = shortOf(L[k]);
            if (items[i].getAttribute('data-short') !== s) items[i].setAttribute('data-short', s);
        }
    }
    var st = document.createElement('style');
    st.textContent = '@media (min-width: 641px) {'
        + ' .site-header-bar .header-nav [data-short] { font-size: 0; }'
        + ' .site-header-bar .header-nav [data-short]::after { content: attr(data-short); font-size: 13px; }'
        + ' }';
    document.head.appendChild(st);

    // While the page parses, label nav items as soon as they exist.
    var parseObs = new MutationObserver(function () { if (document.querySelector('.site-header-bar .header-nav')) run(); });
    parseObs.observe(document.documentElement, { childList: true, subtree: true });
    // A page announces its language by setting <html lang>; follow it from then on.
    new MutationObserver(function () { htmlLangSet = true; run(); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    function settle() {
        parseObs.disconnect();
        run();
        // Pages rewrite their nav text on a language change; re-check then too.
        var navs = document.querySelectorAll('.site-header-bar .header-nav');
        var mo = new MutationObserver(run);
        for (var i = 0; i < navs.length; i++) mo.observe(navs[i], { childList: true, characterData: true, subtree: true });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', settle); else settle();
})();
