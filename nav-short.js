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
 * Indonesian drops its prefix "Peta " the same way: Kata / Hanzi / Nama / Kalender.
 * [2026-10-06: every language now has a short header label — see SHORT.]
 * [2026-10-06: en added (Words / Hanzi / Names / Calendars); de HanMap -> Hanzi.]
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
        th: {"order":"ลำดับคำ","word":"แผนที่คำ","han":"แผนที่อักษรจีน","name":"แผนที่ชื่อ","time":"แผนที่ปฏิทิน","tree":"แผนภูมิ"},
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
    // Short header labels (wide screens only): the word for "map" is dropped
    // in every language, as ja/ko/zh/yue already were via RULES (owner,
    // 2026-10-06: vi showed "Bản đồ …", id "Peta …"). Missing keys fall back
    // to LABELS + RULES.
    var SHORT = {
        en: {"word":"Words","han":"Hanzi","name":"Names","time":"Calendars"},
        vi: {"word":"Từ","han":"Hán tự","name":"Tên","time":"Lịch"},
        th: {"word":"คำ","han":"ตัวอักษร","name":"ชื่อ","time":"ปฏิทิน"},
        id: {"word":"Kata","han":"Hanzi","name":"Nama","time":"Kalender"},
        hi: {"word":"शब्द","han":"हान्ज़ी","name":"नाम","time":"कैलेंडर"},
        de: {"order":"Wortfolge","word":"Wörter","han":"Hanzi","name":"Namen","time":"Kalender","tree":"Baum"},
        fr: {"order":"Ordre","word":"Mots","han":"Hanzi","name":"Prénoms","time":"Calendriers"},
        it: {"order":"Ordine","word":"Parole","han":"Hanzi","name":"Nomi","time":"Calendari"},
        es: {"order":"Orden","word":"Palabras","han":"Hanzi","name":"Nombres","time":"Calendarios"},
        pt: {"order":"Ordem","word":"Palavras","han":"Hanzi","name":"Nomes","time":"Calendários"},
        ru: {"word":"Слова","han":"Иероглифы","name":"Имена","time":"Календари"},
        uk: {"word":"Слова","han":"Ієрогліфи","name":"Імена","time":"Календарі"},
        ar: {"word":"الكلمات","han":"الحروف","name":"الأسماء","time":"التقاويم"},
        he: {"word":"מילים","han":"תווים","name":"שמות","time":"לוחות שנה"},
        sw: {"order":"Mpangilio","word":"Maneno","han":"Hanzi","name":"Majina","time":"Kalenda"},
    };
    // id: the 'map' word is a prefix (Peta Kata …), dropped like ja マップ (owner, 2026-10-06).
    var RULES = [/\s*マップ$/, /\s*맵$/, /\s*지도$/, /地图$/, /地圖$/, /^Peta\s+/];
    function shortOf(text) {
        for (var i = 0; i < RULES.length; i++) if (RULES[i].test(text)) return text.replace(RULES[i], '').trim() || text;
        return text;
    }
    function norm(code) {
        code = String(code || '').toLowerCase().replace('_', '-');
        if (code === 'yue' || code.indexOf('zh-hk') === 0 || code.indexOf('zh-mo') === 0 || code.indexOf('yue') === 0) return 'yue';
        var own = function (k) { return Object.prototype.hasOwnProperty.call(LABELS, k); };   // not 'constructor' (r22)
        if (own(code)) return code;
        var b = code.slice(0, 2);
        return own(b) ? b : null;
    }
    function fromUrl() {
        // ?ui= is what the pages write into shared links; l= is older.
        var m = /[?#&](?:l|ui)=([A-Za-z_-]+)/.exec(location.search + '&' + location.hash);
        return m ? norm(m[1]) : null;
    }
    function fromCookie() {
        var m = document.cookie.match(/(?:^|;\s*)wm_uilang=([^;]+)/);
        try { return m ? norm(decodeURIComponent(m[1])) : null; } catch (_) { return null; }
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
    // The hamburger's name: Name Map and Time Map never translated it.
    var MENU = { en: 'Menu', ja: 'メニュー', ko: '메뉴', zh: '菜单', yue: '選單', vi: 'Menu', th: 'เมนู',
        id: 'Menu', hi: 'मेन्यू', de: 'Menü', fr: 'Menu', it: 'Menu', es: 'Menú', pt: 'Menu', ru: 'Меню',
        uk: 'Меню', ar: 'القائمة', he: 'תפריט', sw: 'Menyu' };
    function run() {
        var hb = document.querySelector('.site-header-bar .hamburger-btn');
        var mn = MENU[lang()] || MENU.en;
        if (hb && hb.getAttribute('aria-label') !== mn) hb.setAttribute('aria-label', mn);
        var L = LABELS[lang()] || LABELS.en;
        var items = document.querySelectorAll('.site-header-bar .header-nav > a, .site-header-bar .header-nav > span:not(.nav-sep)');
        for (var i = 0; i < items.length; i++) {
            var k = keyOf(items[i]); if (!k || !L[k]) continue;
            var S = SHORT[lang()] || {};
            var s = S[k] || shortOf(L[k]);
            if (items[i].getAttribute('data-short') !== s) items[i].setAttribute('data-short', s);
            // The Tree link on the map pages has no page code writing its text: the
            // drawer (≤640px) shows the element's own text, so give it the full name (r22).
            if (items[i].id === 'nav-tree') { var tn = items[i].lastChild; if (tn && tn.nodeType === 3 && tn.nodeValue !== L[k]) tn.nodeValue = L[k]; }
            // The drawn short label is hidden from the name (alt ""), so name the
            // link with both: speech input users say what they see ("Words").
            if (items[i].tagName !== 'A') continue;   // aria-label is not allowed on a plain <span>
            // Text nodes only: the 字 icon <span> in the HanMap link is not the name.
            var full = Array.prototype.filter.call(items[i].childNodes, function (n) { return n.nodeType === 3; })
                .map(function (n) { return n.nodeValue; }).join('').trim();
            // Visible text first: an icon glyph (字), then the short label; the
            // full name after a comma (axe drops parenthesised text when matching).
            var icon = Array.prototype.filter.call(items[i].children, function (c) { return c.tagName !== 'svg' && c.tagName !== 'SVG' && c.getAttribute('aria-hidden') !== 'true'; })
                .map(function (c) { return c.textContent.trim(); }).join('');
            var vis = (icon ? icon + ' ' : '') + s;
            var nm = full && full !== s ? vis + ', ' + (icon ? icon + ' ' : '') + full : vis;
            if (items[i].getAttribute('aria-label') !== nm) items[i].setAttribute('aria-label', nm);
        }
    }
    var st = document.createElement('style');
    st.textContent = '@media (min-width: 641px) {'
        + ' .site-header-bar .header-nav [data-short] { font-size: 0; }'
        // "/ ''": the drawn short label is decoration; the link's own (font-size
        // 0) text is its name. Without it screen readers read both ("Word MapWords").
        + ' .site-header-bar .header-nav.more-end { -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 28px), transparent); mask-image: linear-gradient(to right, #000 calc(100% - 28px), transparent); }'
        + ' .site-header-bar .header-nav.more-start { -webkit-mask-image: linear-gradient(to left, #000 calc(100% - 28px), transparent); mask-image: linear-gradient(to left, #000 calc(100% - 28px), transparent); }'
        + ' .site-header-bar .header-nav.more-start.more-end { -webkit-mask-image: linear-gradient(to right, transparent, #000 28px, #000 calc(100% - 28px), transparent); mask-image: linear-gradient(to right, transparent, #000 28px, #000 calc(100% - 28px), transparent); }'
        + ' [dir="rtl"] .site-header-bar .header-nav.more-start { -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 28px), transparent); mask-image: linear-gradient(to right, #000 calc(100% - 28px), transparent); }'
        + ' @media print { .site-header-bar .header-nav { -webkit-mask-image: none !important; mask-image: none !important; } }'
        + ' [dir="rtl"] .site-header-bar .header-nav.more-end { -webkit-mask-image: linear-gradient(to left, #000 calc(100% - 28px), transparent); mask-image: linear-gradient(to left, #000 calc(100% - 28px), transparent); }'
        + ' [dir="rtl"] .site-header-bar .header-nav.more-start.more-end { -webkit-mask-image: linear-gradient(to right, transparent, #000 28px, #000 calc(100% - 28px), transparent); mask-image: linear-gradient(to right, transparent, #000 28px, #000 calc(100% - 28px), transparent); }'
        + ' .site-header-bar .header-nav [data-short]::after { content: attr(data-short); content: attr(data-short) / ""; font-size: 13px; }'
        + ' }';
    document.head.appendChild(st);

    // While the page parses, label nav items as soon as they exist.
    // Stop watching as soon as the nav has been parsed (something follows it):
    // observing the whole document through the parse of an 860 KB page fired
    // this callback thousands of times (Lighthouse long tasks, 2026-10-16).
    var parseObs = new MutationObserver(function () {
        var nav = document.querySelector('.site-header-bar .header-nav');
        if (!nav) return;
        run();
        if (nav.nextElementSibling) parseObs.disconnect();
    });
    parseObs.observe(document.documentElement, { childList: true, subtree: true });
    // A page announces its language by setting <html lang>; follow it from then on.
    new MutationObserver(function () { htmlLangSet = true; run(); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    // The header nav may scroll sideways at 641-1100px. Make that reachable:
    // a vertical wheel scrolls it, a focused link and the current page are
    // brought into view, and the edge with hidden items fades (rally r7).
    function navScroll() {
        var nav = document.querySelector('.site-header-bar .header-nav');
        if (!nav || nav._lmScroll) return;
        nav._lmScroll = true;
        function edges() {
            var max = nav.scrollWidth - nav.clientWidth, x = Math.abs(nav.scrollLeft);
            nav.classList.toggle('more-end', max > 2 && x < max - 2);
            nav.classList.toggle('more-start', max > 2 && x > 2);
        }
        nav.addEventListener('wheel', function (e) {
            if (nav.scrollWidth <= nav.clientWidth || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
            var rtl = getComputedStyle(nav).direction === 'rtl', before = nav.scrollLeft;
            nav.scrollLeft += rtl ? -e.deltaY : e.deltaY;
            // At an end the wheel goes back to the page.
            if (nav.scrollLeft !== before) e.preventDefault();
        }, { passive: false });
        nav.addEventListener('focusin', function (e) {
            if (e.target && e.target.scrollIntoView) e.target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        });
        nav.addEventListener('scroll', edges, { passive: true });
        function current() {
            var cur = nav.querySelector('.header-nav-current');
            if (cur && nav.scrollWidth > nav.clientWidth) {
                var nr = nav.getBoundingClientRect(), cr = cur.getBoundingClientRect();
                // 28px: clear of the edge fade.
                if (cr.left < nr.left + 28) nav.scrollLeft -= (nr.left + 28 - cr.left);
                else if (cr.right > nr.right - 28) nav.scrollLeft += (cr.right - (nr.right - 28));
            }
            edges();
        }
        addEventListener('resize', current);
        // The picker and share buttons arrive after DOMContentLoaded and squeeze
        // the nav; a language change rewrites its labels. Re-measure on both.
        if (window.ResizeObserver) new ResizeObserver(current).observe(nav);
        nav._lmCurrent = current;
        requestAnimationFrame(current);
    }
    function settle() {
        parseObs.disconnect();
        run();
        navScroll();
        // Pages rewrite their nav text on a language change; re-check then too.
        var navs = document.querySelectorAll('.site-header-bar .header-nav');
        // Re-measure in the next frame, once per burst: measuring inside the
        // callback forced a layout during page boot (Time Map LCP +3 s at 4x CPU).
        var pend = 0;
        var mo = new MutationObserver(function () {
            run();
            if (pend) return;
            pend = requestAnimationFrame(function () { pend = 0; var nv = document.querySelector('.site-header-bar .header-nav'); if (nv && nv._lmCurrent) nv._lmCurrent(); });
        });
        for (var i = 0; i < navs.length; i++) mo.observe(navs[i], { childList: true, characterData: true, subtree: true });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', settle); else settle();

    // A #ui= / ?ui= landing (SEO pages link that way) sets the language for this
    // page only, without the cookie, so the first click to another map came up
    // in English (r24). Carry the page's language on header-nav clicks when it
    // differs from the saved choice.
    document.addEventListener('click', function (e) {
        var a = e.target && e.target.closest && e.target.closest('.site-header-bar a[href]');
        if (!a || e.defaultPrevented || e.button !== 0) return;
        var href = a.getAttribute('href') || '';
        if (!/^[a-z0-9_-]+\.html(?:[?#].*)?$/i.test(href) || /[#&?]ui=/.test(href)) return;
        var hl = String(document.documentElement.lang || '');
        var ui = /^zh-hk$/i.test(hl) ? 'yue' : hl.replace('-', '_');
        var m = /(?:^|;\s*)wm_uilang=([^;]+)/.exec(document.cookie || '');
        var saved = m ? decodeURIComponent(m[1]) : '';
        if (!ui || ui === saved || (!saved && ui === 'en')) return;
        a.setAttribute('href', href + (href.indexOf('#') < 0 ? '#' : '&') + 'ui=' + encodeURIComponent(ui));
        setTimeout(function () { a.setAttribute('href', href); }, 0);   // a later language change must not inherit it
    }, true);

    // Header menu / display-settings toggles: a real <button data-toggle=
    // "checkbox-id"> drives a hidden checkbox, whose :checked state the CSS
    // drawers key off. (They were <label role="button">, which a label may
    // not carry — Lighthouse aria-allowed-role, rally review r4.) Keeps
    // aria-expanded in step on every page, and Escape closes an open panel
    // — namemap and timemap had no close-on-Esc of their own.
    function toggleFor(b) {
        var id = b.getAttribute('data-toggle');
        return id ? document.getElementById(id) : null;
    }
    document.addEventListener('click', function (e) {
        var b = e.target && e.target.closest && e.target.closest('button[data-toggle]');
        if (!b) return;
        var cb = toggleFor(b);
        if (cb) cb.click();   // toggles and fires change
    });
    // Something open on top of a drawer (a modal, the share sheet, the quiz)
    // owns Escape: closing the drawer underneath would move focus behind it.
    function overlayOpen() {
        var els = document.querySelectorAll('[aria-modal="true"], #trivia-modal.visible, .mylang-overlay.open, #lm-langle-box, #lm-quiz-box, .lang-picker-menu.open, #play-menu.open');
        for (var i = 0; i < els.length; i++) if (els[i].getClientRects().length) return true;
        return false;
    }
    window.__navOverlayOpen = overlayOpen;
    // Pointer vs keyboard on the map (see .leaflet-container[data-ptr] in styles.css).
    document.addEventListener('pointerdown', function (e) { var m = e.target && e.target.closest && e.target.closest('.leaflet-container'); if (m) m.setAttribute('data-ptr', ''); }, true);
    document.addEventListener('keydown', function (e) { if (e.key === 'Tab' || /^Arrow/.test(e.key)) { var ms = document.querySelectorAll('.leaflet-container[data-ptr]'); for (var i = 0; i < ms.length; i++) ms[i].removeAttribute('data-ptr'); } }, true);
    // "Made by" credit on the map pages follows <html lang> (it was English everywhere, r18).
    var CREDIT_BY = { en:'Made by', ja:'制作：', ko:'제작:', zh:'制作：', yue:'製作：', zh_hk:'製作：', vi:'Thực hiện bởi', th:'สร้างโดย', id:'Dibuat oleh', hi:'निर्माता:', de:'Erstellt von', fr:'Créé par', it:'Creato da', es:'Creado por', pt:'Criado por', ru:'Создано', uk:'Створено', ar:'من إعداد', he:'נוצר על ידי', sw:'Imeundwa na' };
    function syncCredit() {
        var l = String(document.documentElement.lang || 'en').toLowerCase().replace('-', '_');
        var v = CREDIT_BY[l] || CREDIT_BY[l.split('_')[0]] || CREDIT_BY.en;
        var els = document.querySelectorAll('.credit-by');
        for (var i = 0; i < els.length; i++) {
            if (els[i].textContent !== v) els[i].textContent = v;
            // A full-width colon already carries its own space: drop the markup's
            // space after it (a double gap in ja/zh/yue), restore it otherwise (r21).
            var nx = els[i].nextSibling;
            if (nx && nx.nodeType === 3) { var want = /：$/.test(v) ? nx.nodeValue.replace(/^\s+/, '') : (/^\s/.test(nx.nodeValue) ? nx.nodeValue : ' ' + nx.nodeValue); if (nx.nodeValue !== want) nx.nodeValue = want; }
            // ar/he read the strip right to left (credit first); the names stay LTR (styles.css).
            var wm = els[i].closest('.url-watermark');
            if (wm) { var d = /^(ar|he)/.test(l) ? 'rtl' : ''; if (wm.getAttribute('dir') !== (d || null)) { if (d) wm.setAttribute('dir', d); else wm.removeAttribute('dir'); } }
        }
    }
    // Quiz options after an answer: a visible ✓ / ✗ (colour alone told the right
    // answer apart) plus words for screen readers (r21).
    var ANS_LBL = {
        ok:   { en:'correct answer', ja:'正解', ko:'정답', zh:'正确答案', yue:'正確答案', vi:'đáp án đúng', th:'คำตอบที่ถูก', id:'jawaban benar', hi:'सही उत्तर', de:'richtige Antwort', fr:'bonne réponse', it:'risposta giusta', es:'respuesta correcta', pt:'resposta correta', ru:'правильный ответ', uk:'правильна відповідь', ar:'الإجابة الصحيحة', he:'התשובה הנכונה', sw:'jibu sahihi' },
        mine: { en:'your answer', ja:'あなたの回答', ko:'내 답', zh:'你的答案', yue:'你嘅答案', vi:'câu trả lời của bạn', th:'คำตอบของคุณ', id:'jawaban Anda', hi:'आपका उत्तर', de:'deine Antwort', fr:'votre réponse', it:'la tua risposta', es:'tu respuesta', pt:'sua resposta', ru:'ваш ответ', uk:'ваша відповідь', ar:'إجابتك', he:'התשובה שלך', sw:'jibu lako' }
    };
    window.__ansMark = function (ok, mine) {
        var l = String(document.documentElement.lang || 'en').toLowerCase().replace('-', '_'), b = l.split('_')[0];
        var words = [];
        if (ok) words.push(ANS_LBL.ok[l] || ANS_LBL.ok[b] || ANS_LBL.ok.en);
        if (mine) words.push(ANS_LBL.mine[l] || ANS_LBL.mine[b] || ANS_LBL.mine.en);
        if (!words.length) return '';
        return '<span aria-hidden="true" style="position:absolute;top:5px;inset-inline-end:9px;font-size:15px;font-weight:800;line-height:1">' + (ok ? '\u2713' : '\u2717') + '</span>'
            + '<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap">, ' + words.join(', ') + '</span>';
    };
    // Footer links to the server-rendered pages: the UI language's own pages and
    // labels (they were /en/ and English in every UI; r22).
    var SEO_LINK_LBL = { word: {"en":"Words","ja":"単語","ko":"단어","zh":"词语","yue":"詞語","vi":"Từ vựng","th":"คำศัพท์","id":"Kata","hi":"शब्द","de":"Wörter","fr":"Mots","it":"Parole","es":"Palabras","pt":"Palavras","ru":"Слова","uk":"Слова","ar":"الكلمات","he":"מילים","sw":"Maneno"},
        trivia: {"en":"Trivia","ja":"読み物","ko":"읽을거리","zh":"读物","yue":"讀物","vi":"Bài đọc","th":"บทความ","id":"Bacaan","hi":"पठन सामग्री","de":"Lesestoff","fr":"Lectures","it":"Letture","es":"Lecturas","pt":"Leituras","ru":"Статьи","uk":"Статті","ar":"مقالات","he":"מאמרים","sw":"Makala"} };
    function syncFooterLinks() {
        var as = document.querySelectorAll('footer a[data-seo-seg]');
        if (!as.length) return;
        var l = String(document.documentElement.lang || 'en').toLowerCase().replace('-', '_'), b = l.split('_')[0];
        var ui = l === 'zh_hk' ? 'yue' : b;
        if (!SEO_LINK_LBL.word[ui]) ui = 'en';
        for (var i = 0; i < as.length; i++) {
            var seg = as[i].getAttribute('data-seo-seg');
            if (!as[i].hasAttribute('data-en')) as[i].setAttribute('data-en', as[i].textContent);
            var lbl = ui === 'en' ? as[i].getAttribute('data-en')
                : (SEO_LINK_LBL[seg] ? SEO_LINK_LBL[seg][ui] : (TITLE_BY[seg] && TITLE_BY[seg][ui])) || as[i].getAttribute('data-en');
            as[i].textContent = lbl;
            as[i].setAttribute('href', '/' + ui + '/' + seg + '/');
        }
    }
    // First visit to the Word Map / Han Map: say once that labels open details
    // (r22: nothing told a newcomer the words were tappable). Gone on the first
    // label tap or ×, remembered per browser.
    var TAP_HINT = { en:'Tap a label to see the language and its pronunciation', ja:'ラベルをタップすると、言語と発音が表示されます', ko:'라벨을 누르면 언어와 발음이 표시됩니다', zh:'点按标签即可查看语言和读音', yue:'撳標籤就睇到語言同讀音', vi:'Chạm vào nhãn để xem ngôn ngữ và cách phát âm', th:'แตะป้ายเพื่อดูภาษาและการออกเสียง', id:'Ketuk label untuk melihat bahasa dan pelafalannya', hi:'भाषा और उच्चारण देखने के लिए किसी लेबल पर टैप करें', de:'Tippe auf eine Beschriftung, um Sprache und Aussprache zu sehen', fr:'Touchez une étiquette pour voir la langue et sa prononciation', it:'Tocca un’etichetta per vedere la lingua e la pronuncia', es:'Toca una etiqueta para ver el idioma y su pronunciación', pt:'Toque em um rótulo para ver o idioma e a pronúncia', ru:'Нажмите на подпись, чтобы увидеть язык и произношение', uk:'Торкніться підпису, щоб побачити мову та вимову', ar:'اضغط على أي تسمية لرؤية اللغة ونطقها', he:'הקישו על תווית כדי לראות את השפה ואת ההגייה', sw:'Gusa lebo kuona lugha na matamshi yake' };
    var CLOSE_LBL = { en:'Close', ja:'閉じる', ko:'닫기', zh:'关闭', yue:'關閉', vi:'Đóng', th:'ปิด', id:'Tutup', hi:'बंद करें', de:'Schließen', fr:'Fermer', it:'Chiudi', es:'Cerrar', pt:'Fechar', ru:'Закрыть', uk:'Закрити', ar:'إغلاق', he:'סגירה', sw:'Funga' };
    function tapHint() {
        if (!/(wordmap|hanmap)(\.html)?\/?$/.test(location.pathname) || /[#&?](lang|trivia|play|cmp)=/.test(location.hash + location.search)) return;
        var cp = document.getElementById('compare-panel'); if (cp && cp.classList.contains('visible')) return;
        try { if (localStorage.getItem('lm_taphint')) return; } catch (_) { return; }
        var map = document.getElementById('map'); if (!map) return;
        var l = String(document.documentElement.lang || 'en').toLowerCase().replace('-', '_'), b = l === 'zh_hk' ? 'yue' : l.split('_')[0];
        var box = document.createElement('div'), x = document.createElement('button');
        box.setAttribute('role', 'note');
        // Above the compare button, route legend, credit strip and footer links (r23).
        box.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:' + (/hanmap/.test(location.pathname) ? 110 : 112) + 'px;z-index:1200;display:flex;align-items:center;gap:8px;max-width:min(92vw,420px);padding:7px 8px 7px 14px;border-radius:999px;background:rgba(26,26,46,0.92);color:#fff;font-size:13px;line-height:1.35;box-shadow:0 4px 16px rgba(0,0,0,0.25)';
        var t = document.createElement('span'); t.textContent = TAP_HINT[b] || TAP_HINT.en;
        x.type = 'button'; x.textContent = '\u00d7'; x.setAttribute('aria-label', (CLOSE_LBL[b] || CLOSE_LBL.en));
        x.style.cssText = 'flex:none;min-width:28px;min-height:28px;border:0;border-radius:50%;background:rgba(255,255,255,0.15);color:#fff;font-size:18px;line-height:1;cursor:pointer';
        box.appendChild(t); box.appendChild(x); document.body.appendChild(box);
        var mo = null;
        var done = function () { box.remove(); try { localStorage.setItem('lm_taphint', '1'); } catch (_) {} document.removeEventListener('click', onClick, true); document.removeEventListener('keydown', onKey, true); document.removeEventListener('focusin', onFocus, true); if (mo) mo.disconnect(); };
        var onClick = function (e) { if (e.target === x || (e.target.closest && e.target.closest('.lang-label, .globe-label'))) done(); };
        document.addEventListener('click', onClick, true);
        // Keyboard users: it must not sit over a focused control (2.4.11); Escape or
        // focus leaving the map dismisses it (r23).
        var onKey = function (e) { if (e.key === 'Escape') done(); };
        var onFocus = function (e) { if (!(e.target.closest && e.target.closest('#map'))) done(); };
        document.addEventListener('keydown', onKey, true); document.addEventListener('focusin', onFocus, true);
        var relabel = function () { var l2 = String(document.documentElement.lang || 'en').toLowerCase().replace('-', '_'), b2 = l2 === 'zh_hk' ? 'yue' : l2.split('_')[0]; t.textContent = TAP_HINT[b2] || TAP_HINT.en; x.setAttribute('aria-label', CLOSE_LBL[b2] || CLOSE_LBL.en); };
        window.addEventListener('langmap:uichange', function () { setTimeout(relabel, 0); });
        mo = new MutationObserver(function () { var lb = document.querySelector('#lang-info.visible'); if (lb) done(); }); mo.observe(document.getElementById('lang-info') || document.body, { attributes: true, attributeFilter: ['class'] });
    }
    if (document.readyState === 'complete') setTimeout(tapHint, 2500); else window.addEventListener('load', function () { setTimeout(tapHint, 2500); });
    // Browser-tab title in the UI language (the English <title> stays for en,
    // which is what crawlers see).
    var TITLE_BY = {
        wordmap: {ja:"単語マップ",ko:"단어 맵",zh:"词汇地图",yue:"詞彙地圖",vi:"Bản đồ từ",th:"แผนที่คำ",id:"Peta Kata",hi:"शब्द मानचित्र",en:"Word Map",de:"Wortkarte",fr:"Carte des mots",it:"Mappa parole",es:"Mapa de palabras",pt:"Mapa de palavras",ru:"Карта слов",uk:"Карта слів",ar:"خريطة الكلمات",he:"מפת מילים",sw:"Ramani ya maneno"},
        hanmap: {ja:"漢字マップ",ko:"한자 맵",zh:"汉字地图",yue:"漢字地圖",vi:"Bản đồ Hán tự",th:"แผนที่อักษรจีน",id:"Peta Hanzi",hi:"हान्ज़ी मानचित्र",en:"HanMap",de:"Hanzi-Karte",fr:"Carte des hanzi",it:"Mappa hanzi",es:"Mapa de hanzi",pt:"Mapa de hanzi",ru:"Карта иероглифов",uk:"Карта ієрогліфів",ar:"خريطة الحروف",he:"מפת תווים",sw:"Ramani ya hanzi"},
        namemap: {ja:"名前マップ",ko:"이름 맵",zh:"姓名地图",yue:"姓名地圖",vi:"Bản đồ tên",th:"แผนที่ชื่อ",id:"Peta Nama",hi:"नाम मानचित्र",en:"Name Map",de:"Namenskarte",fr:"Carte des prénoms",it:"Mappa dei nomi",es:"Mapa de nombres",pt:"Mapa de nomes",ru:"Карта имён",uk:"Карта імен",ar:"خريطة الأسماء",he:"מפת שמות",sw:"Ramani ya majina"},
        timemap: {en:"Time Map",ja:"暦マップ",ko:"달력 맵",zh:"历法地图",yue:"曆法地圖",vi:"Bản đồ lịch",th:"แผนที่ปฏิทิน",id:"Peta Kalender",hi:"कैलेंडर मानचित्र",de:"Kalenderkarte",fr:"Carte des calendriers",it:"Mappa dei calendari",es:"Mapa de calendarios",pt:"Mapa de calendários",ru:"Карта календарей",uk:"Карта календарів",ar:"خريطة التقاويم",he:"מפת לוחות שנה",sw:"Ramani ya kalenda"}
    };
    var _pageKey = (location.pathname.match(/(wordmap|hanmap|namemap|timemap)(\.html)?\/?$/) || [])[1];
    var _origTitle = document.title;
    function syncTitle() {
        if (!_pageKey) {
            // Tree page: its own code sets the tab title; the heading follows LABELS.
            if (/tree(\.html)?\/?$/.test(location.pathname)) {
                var l0 = String(document.documentElement.lang || 'en').toLowerCase().replace('-', '_'), b0 = l0.split('_')[0];
                var L0 = LABELS[l0] || LABELS[b0]; syncH1(l0, b0, L0 && L0.tree);
            }
            return;
        }
        var l = String(document.documentElement.lang || 'en').toLowerCase().replace('-', '_'), b = l.split('_')[0];
        var m = TITLE_BY[_pageKey], v = m[l] || (l === 'zh_hk' && m.yue) || m[b];   // Time Map's yue UI sets lang=zh-HK (r21)
        var t = (b === 'en' || !v) ? _origTitle : 'LangMap — ' + v;
        if (document.title !== t) document.title = t;
        syncH1(l, b, v);
    }
    // The page's only heading (visually hidden) stayed English in every UI (3.1.2, r24).
    var _origH1 = null;
    function syncH1(l, b, v) {
        var h = document.querySelector('header h1, .site-header-bar h1, body > h1') || document.querySelector('h1');
        if (!h || !/^LangMap/.test(h.textContent)) return;
        if (_origH1 === null) _origH1 = h.textContent;
        var txt = (b === 'en' || !v) ? _origH1 : 'LangMap — ' + v;
        if (h.textContent !== txt) h.textContent = txt;
    }
    new MutationObserver(function () { syncCredit(); syncTitle(); syncFooterLinks(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { syncCredit(); syncTitle(); syncFooterLinks(); }); else { syncCredit(); syncTitle(); syncFooterLinks(); }
    // Tapping the dimmed backdrop closes the drawer (namemap and timemap had
    // no outside-click handler of their own).
    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList && e.target.classList.contains('header-backdrop')) closeOpen();
    });
    function closeOpen() {
        var closed = false;
        var bs = document.querySelectorAll('button[data-toggle]');
        for (var i = 0; i < bs.length; i++) {
            var cb = toggleFor(bs[i]);
            if (!cb || cb.type !== 'checkbox' || !cb.checked) continue;
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
            // Left checked from a narrower window: nothing visible closed, so the
            // Escape still belongs to the page (and there is no button to focus).
            if (!bs[i].getClientRects().length) continue;
            closed = true;
            // Back to the button only when focus was inside the panel it controls.
            var panel = document.getElementById(bs[i].getAttribute('aria-controls') || '');
            if (panel && panel.contains(document.activeElement)) bs[i].focus();
        }
        return closed;
    }
    // Tab past the last drawer item closes the drawer: focus otherwise walked
    // onto controls hidden underneath it (rally r17).
    document.addEventListener('focusout', function (e) {
        var to = e.relatedTarget;
        if (!to) return;
        var bs = document.querySelectorAll('button[data-toggle]');
        for (var i = 0; i < bs.length; i++) {
            var cb = toggleFor(bs[i]);
            if (!cb || cb.type !== 'checkbox' || !cb.checked || !bs[i].getClientRects().length) continue;
            var panel = document.getElementById(bs[i].getAttribute('aria-controls') || '');
            if (!panel || !(panel.contains(e.target) || bs[i] === e.target)) continue;
            if (panel.contains(to) || bs[i] === to || bs[i].contains(to)) continue;
            if (to.closest && to.closest('[aria-modal="true"], .lang-picker-menu')) continue;
            cb.checked = false;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape' || e.defaultPrevented || overlayOpen()) return;
        // One Escape, one layer: the page's own Escape handlers (language
        // panel, compare panel) must not also run for this key press.
        if (closeOpen()) e.stopImmediatePropagation();
    });
    // role=radiogroup switches (era, name display): arrows move the choice and
    // focus; one Tab stop (the checked option). Pages that handle their own
    // arrows call preventDefault first and are left alone.
    document.addEventListener('keydown', function (e) {
        if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || !/^Arrow(Left|Right|Up|Down)$/.test(e.key)) return;
        var r = e.target && e.target.closest && e.target.closest('[role="radiogroup"] [role="radio"]');
        if (!r) return;
        var opts = [].slice.call(r.closest('[role="radiogroup"]').querySelectorAll('[role="radio"]'));
        var i = opts.indexOf(r), d = (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 1;
        var n = opts[(i + d + opts.length) % opts.length];
        if (!n || n === r) return;
        e.preventDefault(); n.click(); n.focus();
    });
    function syncRadios() {
        var gs = document.querySelectorAll('[role="radiogroup"]');
        for (var g = 0; g < gs.length; g++) {
            var rs = gs[g].querySelectorAll('[role="radio"]'), any = false;
            for (var k = 0; k < rs.length; k++) { var on = rs[k].getAttribute('aria-checked') === 'true'; rs[k].tabIndex = on ? 0 : -1; any = any || on; }
            if (!any && rs[0]) rs[0].tabIndex = 0;
        }
    }
    new MutationObserver(syncRadios).observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['aria-checked'] });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncRadios); else syncRadios();
    function syncExpanded() {
        var bs = document.querySelectorAll('button[data-toggle]');
        for (var i = 0; i < bs.length; i++) {
            var cb = toggleFor(bs[i]);
            if (cb && cb.type === 'checkbox') bs[i].setAttribute('aria-expanded', cb.checked ? 'true' : 'false');
        }
    }
    document.addEventListener('change', function (e) {
        if (e.target && e.target.type === 'checkbox') syncExpanded();
    });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncExpanded); else syncExpanded();
})();
