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
    // The UI-language list, in one place: order and names as on index, Word Map
    // and Han Map (wordmap_data.js WM_UI_LABELS). Name Map, Time Map and the tree
    // had their own lists, English first and "Bahasa Indonesia" (r32).
    window.LM_UI_LANGS = [['ja','日本語'],['ko','한국어'],['zh','中文'],['yue','粵語'],['vi','Tiếng Việt'],
        ['th','ไทย'],['id','Indonesia'],['hi','हिन्दी'],['en','English'],['de','Deutsch'],['fr','Français'],
        ['it','Italiano'],['es','Español'],['pt','Português'],['ru','Русский'],['uk','Українська'],
        ['ar','العربية'],['he','עברית'],['sw','Kiswahili']];
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
        var a = e.target && e.target.closest && e.target.closest('.site-header-bar a[href], #lm-credit-pop a[href]');
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

    // ---- One history entry per overlay (r28) -------------------------------
    // Rule, the same on every page: opening an overlay (dialog, sheet, drawer,
    // popup, panel, picker) adds ONE history entry; Back closes only that
    // overlay and never changes the map / word / date under it; closing it by
    // hand steps back over its entry; Forward reopens it; the URL always shows
    // the live state. Content and view changes (word, date, pan…) replace.
    // Pages register an overlay with __lmOverlay(id, { isOpen, close, open }),
    // or let watch() detect it from the element. The entry carries the open
    // overlays as state.lmOv; replaceState/pushState keep it (wrapped below).
    // Every entry also carries its place in the session, state.lmN (r29): Back
    // and Forward are told apart by it, and an overlay knows which entry is its
    // own (ovN), so closing it never steps back over an entry a page pushed.
    // fresh: this load is a new landing (no state yet), not a reload or a return.
    // dead: entries left behind that name nothing live (r31), by lmN; an entry
    // is also marked on itself (state.lmDead). Back and Forward step over them.
    var LMH = window.__lmHistory = { reg: {}, stack: [], selfBack: 0, quiet: false, lastURL: location.href, n: 0, ovN: {}, fresh: !history.state, dead: {} };
    var lmhPending = {};
    var ovList = function () { return LMH.stack.length ? LMH.stack.slice() : undefined; };
    // A new entry at n drops whatever was forward of it, dead marks included.
    // Called just before the push, on the entry being left.
    function lmhDropDead(n) {
        for (var k in LMH.dead) if (+k >= n) delete LMH.dead[k];
        var c = history.state;
        if (c && c.lmDeadNext) { var c2 = Object.assign({}, c); delete c2.lmDeadNext; try { LMH._rep(c2, '', location.href); } catch (_) {} }
    }
    // The entry after the current one is dead. Kept on this entry too
    // (lmDeadNext), as the next one cannot be written from here and a reload
    // or a return from another page forgets LMH.dead.
    function lmhDeadNext() {
        LMH.dead[LMH.n + 1] = 1;
        try { LMH._rep(Object.assign({}, history.state || {}, { lmDeadNext: 1 }), '', location.href); } catch (_) {}
    }
    // ---- Deep landings (r31) ----
    // A fresh landing whose URL opens overlays (lang=, cmp=, trivia=, play=,
    // in any mix) gets a base entry without any of those keys, then one entry
    // per overlay in the order they open. Only the first opener used to get
    // the base entry: with lang= and cmp= the panel had none and Back left the
    // site with it open. deepOn: still landing (no input, no Back/Forward yet).
    var DEEP = ['lang', 'cmp', 'trivia', 'play'], OVKEY = { compare: 'cmp', trivia: 'trivia' };
    LMH.deepOn = LMH.fresh; LMH.deepPend = null;
    (function () {
        if (!LMH.deepOn) return;
        var end = function (e) { if (e && e.isTrusted === false) return; LMH.deepOn = false; };
        ['pointerdown', 'keydown', 'touchstart', 'wheel'].forEach(function (t) { window.addEventListener(t, end, { capture: true, passive: true }); });
        window.addEventListener('popstate', function () { end(); });
        setTimeout(end, 15000);
    })();
    // q: the query to use (the base entry's rewrite changes location's).
    function lmhStripURL(keys, h, q) {
        var strip = function (s, lead) {
            var p = String(s || '').replace(/^[?#]/, '').split('&').filter(function (kv) { return kv && keys.indexOf(kv.split('=')[0]) < 0; });
            return p.length ? lead + p.join('&') : '';
        };
        return location.pathname + strip(q != null ? q : location.search, '?') + strip(h != null ? h : location.hash, '#');
    }
    function lmhDeepStart(h) {
        var hh = h != null ? h : location.hash, pend = [];
        (location.search.replace(/^\?/, '') + '&' + String(hh).replace(/^#/, '')).split('&').forEach(function (kv) {
            var k = kv.split('=')[0]; if (DEEP.indexOf(k) >= 0 && pend.indexOf(k) < 0) pend.push(k);
        });
        LMH.deepPend = pend;
        LMH._rep(Object.assign({}, history.state || {}, { lmOv: undefined, lmN: LMH.n }), '', lmhStripURL(pend, hh));
    }
    // This overlay's keys are open now: the URL for its entry keeps them and
    // drops the keys of the overlays still to open.
    function lmhDeepOwn(keys) { if (LMH.deepPend) LMH.deepPend = LMH.deepPend.filter(function (k) { return keys.indexOf(k) < 0; }); return LMH.deepPend || []; }
    (function () {
        var _push0 = history.pushState.bind(history), _rep0 = history.replaceState.bind(history);
        // lastSt: the state of the entry shown, for the popstate that leaves it (r32).
        var _push = function (s, t, u) { var r = _push0(s, t, u); LMH.lastSt = history.state; return r; };
        var _rep = function (s, t, u) { var r = _rep0(s, t, u); LMH.lastSt = history.state; return r; };
        LMH._rep = _rep; LMH._push = _push; LMH.lastSt = history.state;
        // A page's new entry while the top overlay is closing (closed in this task,
        // its step back still pending: a game started from the Play menu or the
        // phone menu) takes that overlay's entry instead of going above it. The
        // step back undid the page's entry: a dead Back, then the next one left
        // the site with the game open (r29).
        history.pushState = function (st, t, u) {
            var s = Object.assign({}, st || {}), r;
            LMH.fresh = false;
            if (lmhTakeClosingTop()) { s.lmOv = ovList(); s.lmN = LMH.n; r = _rep(s, t, u); }
            else { s.lmOv = ovList(); s.lmN = ++LMH.n; lmhDropDead(LMH.n); r = _push(s, t, u); }
            LMH.lastURL = location.href; return r;
        };
        history.replaceState = function (st, t, u) {
            var cur = history.state || {}, s = Object.assign({}, st || {});
            if (!('lmOv' in s) && cur.lmOv) s.lmOv = cur.lmOv;
            if (cur.lmDead) s.lmDead = 1;   // r31: a dead entry stays dead while shown
            if (cur.lmDeadNext) s.lmDeadNext = 1;
            s.lmN = cur.lmN != null ? cur.lmN : LMH.n;
            var r = _rep(s, t, u); LMH.lastURL = location.href; return r;
        };
    })();
    // Overlays on top of the stack that are closing, whose own entry is the
    // current one: drop them (no step back) and say the entry can be reused.
    function lmhTakeClosingTop() {
        var cur = history.state || {}, took = false;
        while (LMH.stack.length) {
            var id = LMH.stack[LMH.stack.length - 1], o = LMH.reg[id];
            if (!(lmhPending[id] || (o && !o.isOpen()))) break;
            if (cur.lmN == null || LMH.ovN[id] !== cur.lmN) break;
            if (lmhPending[id]) { clearTimeout(lmhPending[id]); delete lmhPending[id]; }
            LMH.stack.pop(); took = true;
        }
        return took;
    }
    // take: the overlay replaces a page panel whose own entry is the current one
    // (Trivia over the language panel), so it takes that entry instead of going
    // above it. With a closing overlay above that entry (the phone menu), its
    // step back runs first and the overlay takes the entry it lands on (r30).
    function lmhOpened(id, take) {
        if (LMH.quiet || LMH.takeOnLand === id) return;
        if (lmhPending[id]) { clearTimeout(lmhPending[id]); delete lmhPending[id]; return; }   // closed and reopened in one task (popup A -> B): keep the entry
        if (LMH.stack.indexOf(id) >= 0) return;
        if (take) {
            var cur0 = history.state || {}, top = LMH.stack[LMH.stack.length - 1], ot = top && LMH.reg[top];
            if (top && (lmhPending[top] || (ot && !ot.isOpen())) && cur0.lmN != null && LMH.ovN[top] === cur0.lmN) {
                LMH.takeOnLand = id; LMH.takeFrom = cur0.lmN;
                setTimeout(function () { if (LMH.takeOnLand === id) { LMH.takeOnLand = null; lmhOpened(id); } }, 1500);
                return;
            }
            // The menu it was chosen from closed and stepped back first, and the
            // article came later (its data loads first): the menu's entry is left
            // forward and a Forward reopened the menu over the article (r31).
            var lc = LMH.lastClosed;
            if (lc && cur0.lmN != null && lc.n === cur0.lmN + 1 && LMH.n === cur0.lmN && Date.now() - lc.t < 10000) { LMH.lastClosed = null; lmhDeadNext(); }
        }
        // Reopened after a reload (or a return from another page) on the entry
        // that was its own: take that entry back instead of pushing a second one,
        // which left a dead Back (r30).
        var ri = LMH.restore && (history.state || {}).lmN === LMH.restoreN ? LMH.restore.indexOf(id) : -1;
        if (ri >= 0) LMH.restore.splice(ri, 1);
        var reuse = lmhTakeClosingTop() || !!take || ri >= 0;   // phone menu -> Trivia: Trivia takes the menu's entry
        LMH.stack.push(id);
        if (ri >= 0) {
            var ord = function (x) { var k = LMH.restoreAll.indexOf(x); return k < 0 ? 1e9 : k; };
            LMH.stack.sort(function (a, b) { return ord(a) - ord(b); });
        }
        try {
            // The first overlay a fresh landing opens from its URL (cmp=, trivia=):
            // the entry under it loses the deep keys (r31).
            var h0 = location.hash, q0 = location.search, href0 = location.href;
            if (!reuse && LMH.fresh) lmhDeepStart();
            var s = Object.assign({}, history.state || {}, { lmOv: LMH.stack.slice() });
            delete s.lmDead; if (reuse) LMH.curDead = null;   // a live overlay's entry is not dead
            LMH.fresh = false;
            if (reuse) { s.lmN = LMH.n; LMH._rep(s, '', location.href); }
            else {
                var rest = LMH.deepPend && LMH.deepOn && OVKEY[id] ? lmhDeepOwn([OVKEY[id]]) : null;
                s.lmN = ++LMH.n; lmhDropDead(LMH.n); LMH._push(s, '', rest ? lmhStripURL(rest, h0, q0) : href0);
            }
            // A restored overlay below the top one has its own entry under this one.
            LMH.ovN[id] = ri >= 0 ? LMH.n - (LMH.restoreAll.length - 1 - LMH.restoreAll.indexOf(id)) : LMH.n;
        } catch (_) {}
    }
    function lmhSelfGo(d) {
        LMH.selfBack++;
        try { history.go(d); } catch (_) { LMH.selfBack--; return; }
        // At an end of the history nothing happens: do not let the count leak
        // onto the reader's next Back.
        var tok = LMH.selfTok = (LMH.selfTok || 0) + 1;
        setTimeout(function () { if (LMH.selfTok === tok) LMH.selfBack = 0; }, 1500);
    }
    // Step on past the current entry (dead), in the direction of travel. st is
    // what the entry keeps, marked dead; it takes the URL of the screen still
    // showing. At the end of the history there is nothing past it: go back to
    // where the press came from, so the press does nothing at all.
    // st null: the entry is not dead itself, only the same screen as the dead
    // one just left (the URL is still put back on it).
    function lmhStepOver(st, dir, prevURL) {
        var dn = st ? st.lmN : LMH.n;
        window.__lmPopHandled = true;
        try { if (st) st.lmDead = 1; LMH._rep(st || history.state, '', prevURL); LMH.lastURL = prevURL; } catch (_) {}
        window.__lmSkipHash = location.hash;
        setTimeout(function () { window.__lmPopHandled = false; }, 0);
        setTimeout(function () { window.__lmSkipHash = null; }, 400);
        var nav = window.navigation, can = nav && typeof nav.canGoForward === 'boolean' ? (dir > 0 ? nav.canGoForward : nav.canGoBack) : null;
        if (can === false) { if (st) { LMH.selfBack = 0; lmhSelfGo(-dir); } return; }
        if (dir > 0) { var fn = LMH.fwdOver = dn; setTimeout(function () { if (LMH.fwdOver === fn) LMH.fwdOver = null; }, 1500); }
        lmhSelfGo(dir);
        if (can === null && st) setTimeout(function () { if ((history.state || {}).lmN === dn && LMH.n === dn) { LMH.selfBack = 0; lmhSelfGo(-dir); } }, 450);
    }
    // The entry a reload (or a return from another page) landed on, whose
    // overlays none came back: it shows the same screen as the entry under it.
    // One the URL still names (cmp=, trivia=) may only be slow to load.
    function lmhRestoreDead(n, url) {
        if (LMH.curDead != null && LMH.curDead === n) return true;
        if (!LMH.restore || !LMH.restoreAll || n == null || n <= 0 || n !== LMH.restoreN || LMH.n !== n || LMH.stack.length) return false;
        var hp = new URLSearchParams(String(url != null ? url : location.href).split('#')[1] || '');
        return !LMH.restoreAll.some(function (id) { return OVKEY[id] && hp.get(OVKEY[id]); });
    }
    function lmhClosed(id) {
        if (LMH.quiet) return;
        var at = LMH.stack.indexOf(id); if (at < 0) return;
        // Deferred: Leaflet closes popup A and opens B in the same task.
        lmhPending[id] = setTimeout(function () {
            delete lmhPending[id];
            var at2 = LMH.stack.indexOf(id); if (at2 < 0) return;
            LMH.stack.splice(at2, 1);
            var cur = history.state || {};
            // Step back only over the overlay's own entry. One a page pushed above
            // it (a game, the language panel) stays; the overlay just leaves it.
            if (at2 === LMH.stack.length && cur.lmN != null && cur.lmN === LMH.ovN[id]) { LMH.lastClosed = { n: cur.lmN, t: Date.now() }; lmhSelfGo(-1); }
            else { try { LMH._rep(Object.assign({}, cur, { lmOv: ovList() }), '', location.href); } catch (_) {} }
        }, 0);
    }
    window.__lmOverlay = function (id, o) {
        LMH.reg[id] = o;
        if (o.el && window.MutationObserver) {
            var was = !!o.isOpen();
            new MutationObserver(function () { var now = !!o.isOpen(); if (now === was) return; was = now; if (now) lmhOpened(id); else lmhClosed(id); })
                .observe(o.el, { attributes: true, attributeFilter: o.attrs || ['class', 'hidden', 'style', 'open'] });
            if (was) lmhOpened(id);
        }
        return { opened: function (o) { lmhOpened(id, !!(o && o.take)); }, closed: function () { lmhClosed(id); } };
    };
    // The overlay's own entry is the current one and nothing is above it: a
    // hand close steps back over it, so the page should not rewrite its URL
    // first. Rewritten without cmp=, a reload forgot the shared list and
    // Forward could not bring Compare back (r32).
    window.__lmOwnEntry = function (id) {
        if (LMH.quiet) return false;
        var cur = history.state || {};
        return LMH.stack[LMH.stack.length - 1] === id && cur.lmN != null && LMH.ovN[id] === cur.lmN;
    };
    // A page panel with an entry of its own (the Word / Han Map language panel)
    // is not an overlay here; Back off its entry is the page's to apply.
    var PAGE_PANEL = ['wmPanel', 'hmPanel'];
    var hasPagePanel = function (s) { return !!s && PAGE_PANEL.some(function (k) { return s[k]; }); };
    window.__lmPopHandled = false;
    window.addEventListener('popstate', function () {
        var prevURL = LMH.lastURL, entryURL = location.href;
        LMH.lastURL = location.href;
        var prevSt = LMH.lastSt; LMH.lastSt = history.state;
        var st = history.state || {};
        var want = st.lmOv || [];
        // Leaving a dead entry we stood on (its overlays did not come back after
        // a reload): the one under it shows the same screen.
        var prevN = LMH.n, leftDead = lmhRestoreDead(prevN, prevURL);
        LMH.curDead = null;
        LMH.fresh = false; LMH.restore = null;
        var self = LMH.selfBack > 0; if (self) LMH.selfBack--;
        // Direction from the entries' places; an entry without one is new (the
        // reader edited the hash): number it after the current one.
        var dir;
        if (st.lmN == null) { dir = 1; LMH.n++; try { LMH._rep(Object.assign({}, st, { lmN: LMH.n }), '', location.href); } catch (_) {} }
        else { dir = st.lmN < LMH.n ? -1 : (st.lmN > LMH.n ? 1 : 0); LMH.n = st.lmN; }
        if (st.lmDeadNext) LMH.dead[st.lmN + 1] = 1;
        // A dead entry (left behind by a take, stepped over before, or one whose
        // overlays could not come back after a reload): step on past it the same
        // way, opening and closing nothing. Left plain it was a dead press (r31).
        if (dir !== 0 && (st.lmDead || LMH.dead[st.lmN])) { lmhStepOver(Object.assign({}, st, { lmOv: ovList() }), dir, prevURL); return; }
        // Back from that dead entry: this press would change nothing on screen,
        // so it goes one further; Forward later steps over the dead one (r31).
        if (leftDead && dir < 0 && st.lmN === prevN - 1 && !LMH.stack.length) { lmhDeadNext(); lmhStepOver(null, -1, prevURL); return; }
        var changed = self, stale = [], reopened = 0;
        LMH.quiet = true;
        try {
            for (var i = LMH.stack.length - 1; i >= 0; i--) {
                var id = LMH.stack[i];
                if (want.indexOf(id) < 0) { changed = true; var o = LMH.reg[id]; if (o && o.isOpen()) try { o.close(); } catch (_) {} }
            }
            for (var j = 0; j < want.length; j++) {
                if (LMH.stack.indexOf(want[j]) >= 0) continue;
                if (want[j] === 'about' && !LMH.reg.about && typeof creditHist === 'function') creditHist();   // registered on first open
                var o2 = LMH.reg[want[j]];
                if (o2 && o2.isOpen()) continue;   // open already: just track it
                // Forward reopens an overlay. Back never does: an entry naming an
                // overlay that is not open (closed by hand under another one, or
                // before a reload) is a dead step (r29).
                // An open() that returns false could not reopen it (its marker is gone).
                var ok = false;
                if (dir > 0 && o2 && o2.open) { try { ok = o2.open() !== false; } catch (_) { ok = false; } }
                // Reopened under LMH.quiet, so lmhOpened did not note its entry:
                // its own × then left a dead Back (r30). One entry per overlay,
                // the top one on this entry.
                if (ok) { changed = true; reopened++; LMH.ovN[want[j]] = LMH.n - (want.length - 1 - j); } else stale.push(want[j]);
            }
        } finally { LMH.quiet = false; }
        LMH.stack = want.filter(function (x) { return stale.indexOf(x) < 0; });
        // Only when none of its overlays came back: one that did (the settings
        // popover over a popup that cannot) keeps the entry, cut down to it.
        // Stepping over it closed the popover again at the end of the history (r32).
        if (stale.length && dir !== 0 && !reopened) {
            // Mark this entry dead and step on past it; the page ignores this
            // stop, and the next one keeps the live URL (self). Left plain, it
            // cost a dead press the next time either way (r31).
            // Back from the page's language panel entry: the landing is the
            // page's to apply (it closes the panel, keeping the live word).
            // Kept as the screen, the panel stayed open over a lang= URL and
            // the next Back left the site with it (r32).
            if (dir < 0 && hasPagePanel(prevSt) && !hasPagePanel(st)) {
                var pn = LMH.pageLeave = LMH.n;
                setTimeout(function () { if (LMH.pageLeave === pn) LMH.pageLeave = null; }, 1500);
            }
            lmhStepOver(Object.assign({}, st, { lmOv: ovList(), lmN: LMH.n }), dir, prevURL);
            return;
        }
        if (stale.length) { try { LMH._rep(Object.assign({}, st, { lmOv: ovList() }), '', location.href); } catch (_) {} }
        // The step back a taking overlay waited for (lmhOpened take) has landed.
        if (LMH.takeOnLand && LMH.selfBack === 0) {
            var tid = LMH.takeOnLand, to = LMH.reg[tid]; LMH.takeOnLand = null;
            // The entry stepped back off (the menu's) still names the menu: a
            // Forward reopened it over the article (r31).
            if (LMH.takeFrom === LMH.n + 1) lmhDeadNext();
            LMH.takeFrom = null;
            if (to && to.isOpen() && LMH.stack.indexOf(tid) < 0) {
                LMH.stack.push(tid); LMH.ovN[tid] = LMH.n; changed = true;
                try { LMH._rep(Object.assign({}, history.state || {}, { lmOv: ovList() }), '', location.href); } catch (_) {}
            }
        }
        if (!changed) return;
        // Landed from the step over the stale entry under the page's panel
        // entry: carry the live URL, but let the page handle this stop.
        if (self && LMH.pageLeave != null && st.lmN < LMH.pageLeave && !hasPagePanel(st)) {
            LMH.pageLeave = null;
            try { LMH._rep(history.state, '', prevURL); LMH.lastURL = prevURL; } catch (_) {}
            window.__lmPopHandled = false; window.__lmSkipHash = null;
            return;
        }
        // Forward over a dead entry onto the page's language panel entry: the
        // page reopens the panel from that entry's own URL. Given the URL of
        // the screen left, the press changed nothing (r32).
        if (self && dir > 0 && LMH.fwdOver != null && st.lmN > LMH.fwdOver && hasPagePanel(st) && !hasPagePanel(prevSt)) {
            LMH.fwdOver = null;
            window.__lmPopHandled = false; window.__lmSkipHash = null;
            return;
        }
        // A jump of several entries (history.go(±n), a long-pressed Back) across
        // the page's language panel entry: the page closes or reopens the panel
        // from this entry's own URL. Taken here, Compare closed but the panel
        // stayed open over a lang= URL, or reopened Compare without it (r33).
        if (!self && ((dir < 0 && hasPagePanel(prevSt) && !hasPagePanel(st)) || (dir > 0 && hasPagePanel(st) && !hasPagePanel(prevSt)))) {
            // An overlay reopened above the panel (Compare) rewrote the URL and
            // state before the page read them, dropping lang= and the panel's
            // mark: give the page this entry's own URL and mark back.
            if (dir > 0) {
                var ks = {}; PAGE_PANEL.forEach(function (k) { if (st[k]) ks[k] = st[k]; });
                try { LMH._rep(Object.assign({}, history.state || {}, ks), '', entryURL); LMH.lastURL = entryURL; } catch (_) {}
                // Pages that rewrite the URL when an overlay's element changes
                // (an observer, run before the page's own popstate) wait for it.
                window.__lmPageLand = true; setTimeout(function () { window.__lmPageLand = false; }, 0);
            }
            window.__lmPopHandled = false; window.__lmSkipHash = null;
            return;
        }
        // An overlay opened or closed: the content under it stays as it is now.
        // Put the live URL back on this entry and tell the page not to re-apply
        // the older hash it would otherwise read (popstate + hashchange).
        window.__lmPopHandled = true;
        try { LMH._rep(history.state, '', prevURL); LMH.lastURL = prevURL; } catch (_) {}
        if (typeof window.__lmRewriteHash === 'function') { try { window.__lmRewriteHash(); } catch (_) {} }
        // The page's rewrite drops its panel mark when the panel it is reopening
        // from this entry's URL has not shown yet (fast Forward presses): keep
        // the mark, or a later × or Back off that entry did nothing (r33).
        var keepPanel = {}, lostPanel = false, curSt = history.state || {};
        PAGE_PANEL.forEach(function (k) { if (st[k] && !curSt[k]) { keepPanel[k] = st[k]; lostPanel = true; } });
        if (lostPanel) { try { LMH._rep(Object.assign({}, curSt, keepPanel), '', location.href); } catch (_) {} }
        window.__lmSkipHash = location.hash;
        setTimeout(function () { window.__lmPopHandled = false; }, 0);
        setTimeout(function () { window.__lmSkipHash = null; }, 400);
    });
    // Shared check for the pages' own popstate / hashchange handlers.
    window.__lmPopSkip = function () { return window.__lmPopHandled || (window.__lmSkipHash != null && window.__lmSkipHash === location.hash); };
    // An entry carrying overlays that are not open (reload, or back from a link
    // followed inside one): drop the marker so it is not a dead step (r28).
    // Its overlays are put back on it: the ones the URL restores (cmp=, trivia=)
    // or the browser restores (a checked drawer box) take it back when they open
    // (lmhOpened); the rest are reopened once the page has settled. Leaving the
    // entry plain made one Back dead, as it sat over an entry with the same
    // screen (r30).
    try {
        var st0 = Object.assign({}, history.state || {});
        if (st0.lmN != null) LMH.n = st0.lmN; else st0.lmN = LMH.n;
        if (st0.lmDeadNext) LMH.dead[st0.lmN + 1] = 1;   // r31
        if (st0.lmDead) LMH.curDead = st0.lmN;
        if (st0.lmOv && st0.lmOv.length) { LMH.restore = st0.lmOv.slice(); LMH.restoreAll = st0.lmOv.slice(); LMH.restoreN = st0.lmN; }
        delete st0.lmOv;
        LMH._rep(st0, '', location.href);
    } catch (_) {}
    (function () {
        if (!LMH.restore) return;
        // Open already (a drawer box the browser put back): track it.
        var track = function () {
            (LMH.restore || []).slice().forEach(function (id) { var o = LMH.reg[id]; if (o && o.isOpen() && LMH.stack.indexOf(id) < 0) lmhOpened(id); });
        };
        var rest = function () {
            track();
            var ids = (LMH.restore || []).slice();
            for (var i = 0; i < ids.length; i++) {
                if (ids[i] === 'about' && !LMH.reg.about && typeof creditHist === 'function') creditHist();   // registered on first open
                var o = LMH.reg[ids[i]];
                if (!o || !o.open || o.isOpen() || LMH.stack.indexOf(ids[i]) >= 0) continue;
                try { o.open(); } catch (_) {}
            }
            // Whatever could not reopen leaves the entry plain; a later open pushes.
            // When none of them came back, the entry shows the same screen as the
            // one under it (r31): mark it dead, so Forward steps over it and Back
            // from it steps over the one under it too (lmhRestoreDead).
            setTimeout(function () {
                var cur = history.state || {};
                if (lmhRestoreDead(cur.lmN)) { try { LMH._rep(Object.assign({}, cur, { lmDead: 1 }), '', location.href); } catch (_) {} LMH.curDead = cur.lmN; }
            }, 1000);
            setTimeout(function () { LMH.restore = null; }, 4000);
        };
        var start = function () { setTimeout(track, 0); setTimeout(rest, 1200); };
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
        window.addEventListener('load', track);
    })();
    window.addEventListener('pageshow', function (e) { if (e.persisted) { LMH.lastSt = history.state; LMH.stack = (history.state && history.state.lmOv) || []; if (history.state && history.state.lmN != null) LMH.n = history.state.lmN; LMH.curDead = history.state && history.state.lmDead ? LMH.n : null; } });
    // An overlay above the page's language panel owns the current entry (its
    // own entry is the one shown). Compare opened before the panel sits below
    // it and does not (r33).
    window.__lmOvAbove = function () {
        var cur = history.state || {}, t = LMH.stack[LMH.stack.length - 1];
        return !!t && cur.lmN != null && LMH.ovN[t] === cur.lmN;
    };
    // The panel closed by hand under such an overlay (Compare): the panel's
    // entry, just under the lowest overlay above it, now shows the same screen
    // as the one under it. Back and Forward step over it (r33).
    window.__lmPanelLeft = function () {
        // The overlays above the panel: from the top, one entry each, down to
        // the first gap (an overlay opened before the panel, under it).
        var cur = history.state || {}, m = cur.lmN, i = LMH.stack.length - 1;
        if (m == null || i < 0 || LMH.ovN[LMH.stack[i]] !== m) return false;
        while (i > 0 && LMH.ovN[LMH.stack[i - 1]] === m - 1) { i--; m--; }
        if (m - 1 < 1) return false;
        LMH.dead[m - 1] = 1;
        return true;
    };
    // A landing that opens an overlay from the URL (a shared #play=, #lang=,
    // #trivia= link) gets an entry under it, the same URL without those keys, so
    // Back closes the overlay and stays on the site; it left the site with the
    // overlay open (r29). Once, on a fresh landing, before any other push.
    // r31: the base entry drops every deep key, and the later openers of the
    // same landing (lang= after cmp= or trivia=) get an entry each too.
    window.__lmDeepBase = function (keys, st, hash) {
        var h = hash != null ? hash : location.hash, q = location.search;
        if (LMH.fresh) { LMH.fresh = false; try { lmhDeepStart(h); } catch (_) { return false; } }
        else if (!(LMH.deepPend && LMH.deepOn)) return false;
        try { history.pushState(st || null, '', lmhStripURL(lmhDeepOwn(keys), h, q)); } catch (_) { return false; }
        return true;
    };

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
    function registerDrawers() {
        var bs = document.querySelectorAll('button[data-toggle]');
        for (var i = 0; i < bs.length; i++) (function (b) {
            var cb = toggleFor(b); if (!cb || cb.type !== 'checkbox' || cb.__lmReg) return; cb.__lmReg = true;
            var h = window.__lmOverlay('drawer:' + cb.id, {
                isOpen: function () { return cb.checked; },
                close: function () { cb.checked = false; cb.dispatchEvent(new Event('change', { bubbles: true })); },
                open: function () { cb.checked = true; cb.dispatchEvent(new Event('change', { bubbles: true })); }
            });
            cb.addEventListener('change', function () { if (cb.checked) h.opened(); else h.closed(); });
            // Checked already: the browser put the box back (Back from a link
            // followed in the phone menu). Untracked, it cost a dead Back (r30).
            if (cb.checked) h.opened();
        })(bs[i]);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', registerDrawers); else registerDrawers();
    // Pickers, filters, menus and share sheets that had no history entry: the
    // phone Back gesture left the site with them open (r28). Detected from the
    // element (visible or not); closed with its own close button, else Escape.
    function lmVisible(el) {
        if (!el || !el.isConnected || el.hidden) return false;
        var cs = getComputedStyle(el);
        return cs.display !== 'none' && cs.visibility !== 'hidden' && el.getClientRects().length > 0;
    }
    function lmCloseEl(el) {
        // The UI-language menu: its own button (an Escape sent to the page would
        // also reach the panel under it).
        if (el.classList.contains('lang-picker-menu')) { var pb = el.parentNode && el.parentNode.querySelector('.lang-picker-btn'); if (pb) { pb.click(); return; } }
        var b =el.querySelector('.char-modal-close, #hm-lang-filter-close, .lf-close, .modal-close, .close-btn, [data-close], button[aria-label="Close"]');
        if (b && lmVisible(b)) { b.click(); return; }
        if (el.classList.contains('wm-overlay')) { el.dispatchEvent(new MouseEvent('click', { bubbles: true })); if (!el.isConnected) return; }
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    }
    // opener: the control that opens it (an element, or a selector): Forward
    // clicks it to reopen the overlay (it stayed shut and left a dead Back, r29).
    function lmWatch(id, el, opener) {
        if (el.__lmWatched) return; el.__lmWatched = true;
        var reopen = opener ? function () {
            var b = typeof opener === 'string' ? document.querySelector(opener) : opener;
            if (b && b.isConnected) b.click();
        } : undefined;
        var h = window.__lmOverlay(id, { isOpen: function () { return lmVisible(el); }, close: function () { lmCloseEl(el); }, open: reopen });
        var was = lmVisible(el);
        var check = function () { var now = lmVisible(el); if (now === was) return; was = now; if (now) h.opened(); else h.closed(); };
        new MutationObserver(function () { check(); setTimeout(check, 350); }).observe(el, { attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
        if (was) h.opened();
        return { check: check };
    }
    window.__lmWatch = lmWatch;   // lang-picker.js builds its menu after autoOverlays() ran (r29)
    var OPENERS = { '#word-modal': '#word-current-btn', '.lf-panel': '.lf-fab', '#char-modal': '#char-current-btn',
        '#hm-lang-filter-modal': '#hm-lang-filter-btn', '#play-menu': '#play-menu-btn', '#langModalOverlay': '#btnOpenLangModal',
        '#nm-settings-pop': '#nm-settings-btn', '#tm-settings-pop': '#tm-settings-btn', '.lang-picker-menu': '.lang-picker-btn' };
    // The control last clicked: what a share sheet created on open came from.
    var lastClicked = null;
    document.addEventListener('click', function (e) { var b = e.target && e.target.closest && e.target.closest('button, a, [role="button"]'); if (b) lastClicked = b; }, true);
    // A game or Trivia started from the phone menu closes the menu first; it
    // stayed open under the game and needed another Back (r29).
    document.addEventListener('click', function (e) {
        var g = e.target && e.target.closest && e.target.closest('.header-collapse .game-btn, .header-collapse #play-menu .play-menu-item');
        if (!g) return;
        var cb = document.getElementById('hdr-menu-toggle');
        if (cb && cb.checked) { cb.checked = false; cb.dispatchEvent(new Event('change', { bubbles: true })); }
    }, true);
    function autoOverlays() {
        Object.keys(OPENERS)
            .forEach(function (sel) { document.querySelectorAll(sel).forEach(function (el, i) { lmWatch(sel + (i ? i : ''), el, OPENERS[sel]); }); });
        // Share sheets are created on open and removed on close.
        var n = 0;
        new MutationObserver(function (muts) {
            muts.forEach(function (m) {
                m.addedNodes.forEach(function (el) {
                    if (el.nodeType !== 1) return;
                    if (el.classList.contains('lf-panel')) { lmWatch('.lf-panel', el, OPENERS['.lf-panel']); return; }
                    if (!el.classList.contains('wm-overlay') || el.querySelector('#lm-langle-box, #lm-quiz-box')) return;
                    // Named after its opener: the sheet Forward rebuilds is the same overlay.
                    var op = lastClicked && lastClicked.isConnected ? lastClicked : null;
                    var id = 'share:' + (op ? (op.id || String(op.className) || op.tagName) : ++n), w = lmWatch(id, el, op);
                    var gone = new MutationObserver(function () { if (!el.isConnected) { gone.disconnect(); w.check(); } });
                    gone.observe(document.body, { childList: true });
                });
            });
        }).observe(document.body, { childList: true });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoOverlays); else autoOverlays();
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
        // Changelog / Coverage icons beside the credit on every map page (r26).
        var b = l === 'zh_hk' ? 'yue' : l.split('_')[0];
        var ic = document.querySelectorAll('.credit-icon[data-k]');
        for (var k = 0; k < ic.length; k++) {
            var t = (CREDIT_ICON[ic[k].getAttribute('data-k')] || {});
            var lab = t[b] || t.en;
            if (lab && ic[k].getAttribute('aria-label') !== lab) { ic[k].setAttribute('aria-label', lab); ic[k].title = lab; }
        }
    }
    var CREDIT_ICON = {
        changelog: {ja:'更新履歴',ko:'변경 내역',zh:'更新日志',yue:'更新日誌',vi:'Nhật ký thay đổi',th:'บันทึกการเปลี่ยนแปลง',id:'Catatan perubahan',hi:'बदलाव सूची',en:'Changelog',de:'Änderungen',fr:'Journal des modifications',it:'Novità',es:'Novedades',pt:'Novidades',ru:'История изменений',uk:'Історія змін',ar:'سجل التغييرات',he:'יומן שינויים',sw:'Kumbukumbu ya mabadiliko'},
        progress: {ja:'収録状況',ko:'수록 현황',zh:'收录情况',yue:'收錄情況',vi:'Độ phủ',th:'ความครอบคลุม',id:'Cakupan',hi:'कवरेज',en:'Coverage',de:'Abdeckung',fr:'Couverture',it:'Copertura',es:'Cobertura',pt:'Cobertura',ru:'Охват',uk:'Охоплення',ar:'التغطية',he:'כיסוי',sw:'Uenezi'}
    };
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
        // Not over an open phone menu or dialog (it covered the UI-language
        // select): try again later, at most 10 times (r30).
        var busy = document.querySelector('.hamburger-btn[aria-expanded="true"]');
        if (!busy) { var ms = document.querySelectorAll('[aria-modal="true"]'); for (var mi = 0; mi < ms.length; mi++) { if (ms[mi].getClientRects().length && !ms[mi].hidden && getComputedStyle(ms[mi]).visibility !== 'hidden') { busy = ms[mi]; break; } } }
        if (busy) { tapHint._n = (tapHint._n || 0) + 1; if (tapHint._n <= 10) setTimeout(tapHint, 3000); return; }
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
        // and the Han Map dialect legend: the hint (z 1200) sat over its rows (r32)
        var onClick = function (e) { if (e.target === x || (e.target.closest && e.target.closest('.lang-label, .globe-label, .hamburger-btn, #dialect-legend-toggle'))) done(); };
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
        hanmap: {ja:"漢字マップ",ko:"한자 맵",zh:"汉字地图",yue:"漢字地圖",vi:"Bản đồ Hán tự",th:"แผนที่อักษรจีน",id:"Peta Hanzi",hi:"हान्ज़ी मानचित्र",en:"Han Map",de:"Hanzi-Karte",fr:"Carte des hanzi",it:"Mappa hanzi",es:"Mapa de hanzi",pt:"Mapa de hanzi",ru:"Карта иероглифов",uk:"Карта ієрогліфів",ar:"خريطة الحروف",he:"מפת תווים",sw:"Ramani ya hanzi"},
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
    // A page's main data file failing to load left a blank map with no word of
    // explanation (Han / Name / Time Map, Word Order, Tree). Say so, with Reload (r27).
    // The Word Map handles its own word files (loadFailToast).
    var DATA_FAIL = {en:"Couldn't load the map data. Check your connection and reload.",ja:'地図のデータを読み込めませんでした。接続を確認して再読み込みしてください。',ko:'지도 데이터를 불러오지 못했습니다. 연결을 확인한 뒤 새로고침하세요.',zh:'无法加载地图数据。请检查网络连接后重新加载。',yue:'載入唔到地圖數據。請檢查網絡連線再重新載入。',vi:'Không tải được dữ liệu bản đồ. Hãy kiểm tra kết nối rồi tải lại.',th:'โหลดข้อมูลแผนที่ไม่ได้ ตรวจสอบการเชื่อมต่อแล้วโหลดใหม่',id:'Data peta gagal dimuat. Periksa koneksi, lalu muat ulang.',hi:'नक्शे का डेटा लोड नहीं हो सका। कनेक्शन जाँचकर पेज फिर से लोड करें।',de:'Die Kartendaten konnten nicht geladen werden. Prüfe die Verbindung und lade neu.',fr:'Impossible de charger les données de la carte. Vérifiez la connexion et rechargez.',it:'Impossibile caricare i dati della mappa. Controlla la connessione e ricarica.',es:'No se pudieron cargar los datos del mapa. Revisa la conexión y recarga.',pt:'Não foi possível carregar os dados do mapa. Verifique a conexão e recarregue.',ru:'Не удалось загрузить данные карты. Проверьте подключение и перезагрузите страницу.',uk:'Не вдалося завантажити дані карти. Перевірте з’єднання й перезавантажте сторінку.',ar:'تعذّر تحميل بيانات الخريطة. تحقّق من الاتصال ثم أعد التحميل.',he:'לא ניתן לטעון את נתוני המפה. בדקו את החיבור וטענו מחדש.',sw:'Imeshindwa kupakia data ya ramani. Angalia muunganisho kisha upakie upya.'};
    var DATA_RELOAD = {en:'Reload',ja:'再読み込み',ko:'새로고침',zh:'重新加载',yue:'重新載入',vi:'Tải lại',th:'โหลดใหม่',id:'Muat ulang',hi:'फिर से लोड करें',de:'Neu laden',fr:'Recharger',it:'Ricarica',es:'Recargar',pt:'Recarregar',ru:'Перезагрузить',uk:'Перезавантажити',ar:'إعادة التحميل',he:'טעינה מחדש',sw:'Pakia upya'};
    var DATA_FILES = /\/(data|hanmap_data|namemap_data|namemap_names_ext|timemap_calendars|wordmap_data|lang_names_shim)\.js(\?|$)/;
    window.addEventListener('error', function (e) {
        var t = e && e.target;
        if (!t || t.tagName !== 'SCRIPT' || !DATA_FILES.test(t.src || '') || /\/wordmap\.html$/.test(location.pathname) || document.getElementById('lm-data-fail')) return;
        var show = function () {
            // The page script that sets <html lang> has failed: take the language
            // from the saved choice, then the browser (r28).
            var b = (function () {
                var m = /(?:^|;\s*)wm_uilang=([^;]+)/.exec(document.cookie || ''), c = m ? decodeURIComponent(m[1]).toLowerCase() : '';
                var cand = [c].concat((navigator.languages || [navigator.language || 'en']).map(function (x) { x = String(x).toLowerCase(); return /^zh-(hk|mo)|^yue/.test(x) ? 'yue' : x.split('-')[0]; }));
                for (var i = 0; i < cand.length; i++) { var k = String(cand[i] || '').split('_')[0]; if (DATA_FAIL[k]) return k; }
                return creditLang();
            })(), box = document.createElement('div');
            box.id = 'lm-data-fail'; box.setAttribute('role', 'alert');
            box.dir = /^(ar|he)$/.test(b) ? 'rtl' : 'ltr';
            box.style.cssText = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:100020;width:min(360px,calc(100vw - 32px));box-sizing:border-box;background:#222;color:#fff;border-radius:12px;padding:14px 16px;font:14px/1.45 system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.3);display:flex;flex-direction:column;gap:10px';
            var msg = document.createElement('div'); msg.textContent = DATA_FAIL[b] || DATA_FAIL.en;
            var btn = document.createElement('button'); btn.type = 'button'; btn.textContent = DATA_RELOAD[b] || DATA_RELOAD.en;
            btn.style.cssText = 'align-self:flex-end;min-height:40px;padding:6px 16px;border:1px solid rgba(255,255,255,.6);border-radius:8px;background:transparent;color:#fff;font:inherit;cursor:pointer';
            btn.addEventListener('click', function () { location.reload(); });
            box.appendChild(msg); box.appendChild(btn); document.body.appendChild(box);
            var st2 = document.createElement('style'); st2.textContent = 'body:has(#lm-data-fail) [role="note"]{display:none!important}'; document.head.appendChild(st2);   // the tap hint arrives later
        };
        if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
    }, true);
    // Name Map / Time Map, PC: the left panel's details fold away so the map shows
    // behind it; the date / name controls stay (owner, r28). Remembered per page.
    var PANEL_HIDE = {en:'Hide details',ja:'詳細を閉じる',ko:'상세 정보 접기',zh:'收起详情',yue:'收埋詳情',vi:'Ẩn chi tiết',th:'ซ่อนรายละเอียด',id:'Sembunyikan detail',hi:'विवरण छिपाएँ',de:'Details ausblenden',fr:'Masquer les détails',it:'Nascondi dettagli',es:'Ocultar detalles',pt:'Ocultar detalhes',ru:'Скрыть подробности',uk:'Сховати подробиці',ar:'إخفاء التفاصيل',he:'הסתרת הפרטים',sw:'Ficha maelezo'};
    var PANEL_SHOW = {en:'Show details',ja:'詳細を開く',ko:'상세 정보 펼치기',zh:'展开详情',yue:'展開詳情',vi:'Hiện chi tiết',th:'แสดงรายละเอียด',id:'Tampilkan detail',hi:'विवरण दिखाएँ',de:'Details einblenden',fr:'Afficher les détails',it:'Mostra dettagli',es:'Mostrar detalles',pt:'Mostrar detalhes',ru:'Показать подробности',uk:'Показати подробиці',ar:'إظهار التفاصيل',he:'הצגת הפרטים',sw:'Onyesha maelezo'};
    function panelFold() {
        var pn = document.getElementById('nm-panel') || document.getElementById('tm-panel');
        if (!pn || pn.__lmFold) return;
        var ctl = pn.querySelector('.nm-controls, .tm-controls'), body = document.getElementById(pn.id === 'nm-panel' ? 'nm-info' : 'tm-info');
        if (!ctl || !body) return;
        pn.__lmFold = true;
        var key = 'lm_fold_' + pn.id, st = document.createElement('style');
        st.textContent = '.lm-fold-btn{display:none}'
            + '@media (min-width:781px){.lm-fold-btn{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;min-height:30px;margin:6px 0 -4px;padding:2px 8px;border:0;border-top:1px solid rgba(0,0,0,.08);background:transparent;color:#5f6368;font:inherit;font-size:12px;cursor:pointer;border-radius:0 0 8px 8px}'
            + '.lm-fold-btn:hover{color:#202124;background:rgba(0,0,0,.04)}'
            + '.lm-fold-btn svg{transition:transform .15s}'
            + '.lm-folded .lm-fold-btn svg{transform:rotate(180deg)}'
            + '#nm-panel.lm-folded,#tm-panel.lm-folded{bottom:auto!important}'
            + '#nm-panel.lm-folded #nm-info,#tm-panel.lm-folded #tm-info{display:none!important}}';
        document.head.appendChild(st);
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'lm-fold-btn'; btn.setAttribute('aria-controls', body.id);
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg><span></span>';
        ctl.appendChild(btn);
        var label = function () {
            var b = creditLang(), folded = pn.classList.contains('lm-folded');
            btn.querySelector('span').textContent = (folded ? PANEL_SHOW : PANEL_HIDE)[b] || (folded ? PANEL_SHOW : PANEL_HIDE).en;
            btn.setAttribute('aria-expanded', folded ? 'false' : 'true');
        };
        var set = function (folded) {
            pn.classList.toggle('lm-folded', folded);
            try { localStorage.setItem(key, folded ? '1' : '0'); } catch (_) {}
            label();
        };
        btn.addEventListener('click', function () { set(!pn.classList.contains('lm-folded')); });
        var saved = '0'; try { saved = localStorage.getItem(key) || '0'; } catch (_) {}
        set(saved === '1');
        window.addEventListener('langmap:uichange', function () { setTimeout(label, 0); });
        new MutationObserver(label).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }
    // Compact credit (r26): the strip "Made by … @Heuron Inc. GitHub · 🌳 · ⟲ · 📊"
    // ran wider than a phone. It becomes one short button; the links move into
    // a small dialog. The page's own markup stays as the no-script fallback.
    var CREDIT_TREE = {en:'Language tree',ja:'言語系統樹',ko:'언어 계통수',zh:'语言谱系树',yue:'語言譜系樹',vi:'Cây ngôn ngữ',th:'แผนภูมิภาษา',id:'Pohon bahasa',hi:'भाषा वृक्ष',de:'Sprachstammbaum',fr:'Arbre des langues',it:'Albero delle lingue',es:'Árbol de lenguas',pt:'Árvore das línguas',ru:'Древо языков',uk:'Дерево мов',ar:'شجرة اللغات',he:'עץ השפות',sw:'Mti wa lugha'};
    var CREDIT_ABOUT = {en:'About LangMap',ja:'LangMapについて',ko:'LangMap 정보',zh:'关于 LangMap',yue:'關於 LangMap',vi:'Giới thiệu LangMap',th:'เกี่ยวกับ LangMap',id:'Tentang LangMap',hi:'LangMap के बारे में',de:'Über LangMap',fr:'À propos de LangMap',it:'Informazioni su LangMap',es:'Acerca de LangMap',pt:'Sobre o LangMap',ru:'О LangMap',uk:'Про LangMap',ar:'حول LangMap',he:'אודות LangMap',sw:'Kuhusu LangMap'};
    var CREDIT_TRIVIA = {ja:'読み物',ko:'읽을거리',zh:'语言趣谈',yue:'語言趣談',vi:'Bài đọc',th:'บทความ',id:'Bacaan',hi:'लेख',en:'Trivia',de:'Lesestoff',fr:'À lire',it:'Da leggere',es:'Lecturas',pt:'Leituras',ru:'Статьи',uk:'Статті',ar:'مقالات',he:'קריאה',sw:'Makala'};
    var CREDIT_MAIL = {ja:'お問い合わせ',ko:'문의',zh:'联系我们',yue:'聯絡我哋',vi:'Liên hệ',th:'ติดต่อ',id:'Kontak',hi:'संपर्क',en:'Contact',de:'Kontakt',fr:'Contact',it:'Contatti',es:'Contacto',pt:'Contato',ru:'Связаться',uk:"Зв'язатися",ar:'اتصل بنا',he:'צור קשר',sw:'Wasiliana'};
    var ABOUT = {"intro":{"en":"LangMap puts the world's languages side by side on maps: word order, everyday words, readings of Chinese characters, names and calendars.","ja":"LangMapは、世界の言語を地図の上で見比べるサイトです。語順、身近な単語、漢字の読み、名前、暦を収録しています。","ko":"LangMap은 세계의 언어를 지도 위에서 나란히 비교하는 사이트입니다. 어순, 일상 단어, 한자 읽기, 이름, 달력을 담고 있습니다.","zh":"LangMap 在地图上并列比较世界各地的语言，内容包括语序、日常词汇、汉字读音、人名和历法。","yue":"LangMap 喺地圖上並排比較世界各地嘅語言，內容包括語序、日常詞彙、漢字讀音、人名同曆法。","vi":"LangMap đặt các ngôn ngữ trên thế giới cạnh nhau trên bản đồ: trật tự từ, từ ngữ thường ngày, cách đọc chữ Hán, tên người và lịch.","th":"LangMap นำภาษาต่าง ๆ ทั่วโลกมาเทียบกันบนแผนที่ ทั้งลำดับคำ คำในชีวิตประจำวัน การอ่านอักษรจีน ชื่อคน และปฏิทิน","id":"LangMap menyandingkan bahasa-bahasa dunia di atas peta: urutan kata, kata sehari-hari, bacaan aksara Han, nama, dan kalender.","hi":"LangMap दुनिया की भाषाओं को मानचित्रों पर साथ-साथ दिखाता है: शब्द-क्रम, रोज़मर्रा के शब्द, चीनी अक्षरों के उच्चारण, नाम और पंचांग।","de":"LangMap stellt die Sprachen der Welt auf Karten nebeneinander: Wortstellung, Alltagswörter, Lesungen chinesischer Schriftzeichen, Namen und Kalender.","fr":"LangMap compare les langues du monde sur des cartes : ordre des mots, mots du quotidien, lectures des caractères chinois, prénoms et calendriers.","it":"LangMap mette a confronto le lingue del mondo su mappe: ordine delle parole, parole di tutti i giorni, letture dei caratteri cinesi, nomi e calendari.","es":"LangMap compara las lenguas del mundo en mapas: orden de las palabras, palabras cotidianas, lecturas de los caracteres chinos, nombres y calendarios.","pt":"O LangMap compara as línguas do mundo em mapas: ordem das palavras, palavras do dia a dia, leituras dos caracteres chineses, nomes e calendários.","ru":"LangMap сравнивает языки мира на картах: порядок слов, повседневные слова, чтения китайских иероглифов, имена и календари.","uk":"LangMap порівнює мови світу на картах: порядок слів, повсякденні слова, читання китайських ієрогліфів, імена й календарі.","ar":"يضع LangMap لغات العالم جنبًا إلى جنب على الخرائط: ترتيب الكلمات، والكلمات اليومية، وقراءات الحروف الصينية، والأسماء، والتقاويم.","he":"LangMap מציבה את שפות העולם זו לצד זו על גבי מפות: סדר מילים, מילים יומיומיות, קריאות של סימנים סיניים, שמות ולוחות שנה.","sw":"LangMap inalinganisha lugha za dunia kwenye ramani: mpangilio wa maneno, maneno ya kila siku, usomaji wa herufi za Kichina, majina na kalenda."},"h_made":{"en":"Made by","ja":"制作","ko":"만든 사람","zh":"制作","yue":"製作","vi":"Thực hiện","th":"ผู้จัดทำ","id":"Dibuat oleh","hi":"निर्माता","de":"Erstellt von","fr":"Réalisé par","it":"Realizzato da","es":"Creado por","pt":"Criado por","ru":"Создатели","uk":"Створено","ar":"من إعداد","he":"יוצר","sw":"Imeundwa na"},"d_x":{"en":"News and updates on X","ja":"X で更新情報をお知らせしています","ko":"X에서 소식과 업데이트를 알립니다","zh":"在 X 上发布更新消息","yue":"喺 X 發佈更新消息","vi":"Tin tức và cập nhật trên X","th":"ข่าวและอัปเดตบน X","id":"Kabar dan pembaruan di X","hi":"X पर ख़बरें और अपडेट","de":"Neuigkeiten und Updates auf X","fr":"Actualités et mises à jour sur X","it":"Novità e aggiornamenti su X","es":"Noticias y novedades en X","pt":"Novidades e atualizações no X","ru":"Новости и обновления в X","uk":"Новини й оновлення в X","ar":"الأخبار والتحديثات على X","he":"חדשות ועדכונים ב־X","sw":"Habari na masasisho kwenye X"},"d_org":{"en":"The company behind LangMap","ja":"LangMap の運営会社","ko":"LangMap을 운영하는 회사","zh":"LangMap 的运营公司","yue":"LangMap 嘅營運公司","vi":"Công ty vận hành LangMap","th":"บริษัทผู้ดูแล LangMap","id":"Perusahaan di balik LangMap","hi":"LangMap को चलाने वाली कंपनी","de":"Das Unternehmen hinter LangMap","fr":"L'entreprise derrière LangMap","it":"L'azienda dietro LangMap","es":"La empresa detrás de LangMap","pt":"A empresa por trás do LangMap","ru":"Компания, которая делает LangMap","uk":"Компанія, що створює LangMap","ar":"الشركة التي تقف وراء LangMap","he":"החברה שמאחורי LangMap","sw":"Kampuni inayoendesha LangMap"},"h_fix":{"en":"Corrections welcome","ja":"ご指摘・ご意見","ko":"오류 제보와 의견","zh":"欢迎指正","yue":"歡迎指正","vi":"Góp ý và sửa lỗi","th":"แจ้งข้อผิดพลาด","id":"Koreksi dan saran","hi":"सुधार और सुझाव","de":"Korrekturen willkommen","fr":"Corrections bienvenues","it":"Correzioni benvenute","es":"Correcciones bienvenidas","pt":"Correções são bem-vindas","ru":"Исправления и предложения","uk":"Виправлення й пропозиції","ar":"نرحب بالتصحيحات","he":"תיקונים יתקבלו בברכה","sw":"Masahihisho yanakaribishwa"},"d_gh":{"en":"Source code and data. Open an issue or a pull request to fix something.","ja":"ソースコードとデータを公開しています。Issue や Pull Request で修正を提案できます。","ko":"소스 코드와 데이터를 공개합니다. Issue나 Pull Request로 수정을 제안할 수 있습니다.","zh":"源代码和数据公开在这里，可通过 Issue 或 Pull Request 提出修改。","yue":"原始碼同數據公開喺呢度，可以用 Issue 或 Pull Request 提出修改。","vi":"Mã nguồn và dữ liệu. Mở issue hoặc pull request để đề xuất sửa.","th":"ซอร์สโค้ดและข้อมูล เปิด Issue หรือ Pull Request เพื่อเสนอแก้ไข","id":"Kode sumber dan data. Buka issue atau pull request untuk mengusulkan perbaikan.","hi":"सोर्स कोड और डेटा। सुधार सुझाने के लिए issue या pull request खोलें।","de":"Quellcode und Daten. Korrekturen per Issue oder Pull Request.","fr":"Code source et données. Ouvrez une issue ou une pull request pour proposer une correction.","it":"Codice sorgente e dati. Apri una issue o una pull request per proporre una correzione.","es":"Código fuente y datos. Abre un issue o un pull request para proponer una corrección.","pt":"Código-fonte e dados. Abra uma issue ou um pull request para sugerir uma correção.","ru":"Исходный код и данные. Исправления — через issue или pull request.","uk":"Вихідний код і дані. Виправлення — через issue або pull request.","ar":"الشيفرة المصدرية والبيانات. افتح issue أو pull request لاقتراح تصحيح.","he":"קוד המקור והנתונים. פתחו issue או pull request כדי להציע תיקון.","sw":"Msimbo chanzo na data. Fungua issue au pull request kupendekeza sahihisho."},"d_mail":{"en":"Write to the author","ja":"作者にメールで連絡する","ko":"만든 사람에게 메일 보내기","zh":"给作者发邮件","yue":"寄電郵畀作者","vi":"Gửi thư cho tác giả","th":"ส่งอีเมลถึงผู้จัดทำ","id":"Kirim surel ke pembuat","hi":"लेखक को ईमेल करें","de":"Dem Autor schreiben","fr":"Écrire à l'auteur","it":"Scrivi all'autore","es":"Escribir al autor","pt":"Escrever ao autor","ru":"Написать автору","uk":"Написати авторові","ar":"راسل المؤلف","he":"כתבו ליוצר","sw":"Mwandikie mwandishi"},"h_more":{"en":"More to explore","ja":"もっと見る","ko":"더 둘러보기","zh":"更多内容","yue":"更多內容","vi":"Khám phá thêm","th":"สำรวจเพิ่มเติม","id":"Jelajahi lagi","hi":"और देखें","de":"Mehr entdecken","fr":"À explorer aussi","it":"Da esplorare","es":"Más para explorar","pt":"Mais para explorar","ru":"Ещё на сайте","uk":"Ще на сайті","ar":"المزيد لاستكشافه","he":"עוד לגלות","sw":"Gundua zaidi"},"d_tree":{"en":"Every language on the site, grouped by family","ja":"収録しているすべての言語を語族ごとに","ko":"수록된 모든 언어를 어족별로","zh":"按语系列出站内所有语言","yue":"按語系列出網站所有語言","vi":"Mọi ngôn ngữ trên trang, xếp theo ngữ hệ","th":"ทุกภาษาบนเว็บไซต์ จัดตามตระกูลภาษา","id":"Semua bahasa di situs, dikelompokkan per rumpun","hi":"साइट की सभी भाषाएँ, परिवार के अनुसार","de":"Alle Sprachen der Seite, nach Familien geordnet","fr":"Toutes les langues du site, classées par famille","it":"Tutte le lingue del sito, raggruppate per famiglia","es":"Todas las lenguas del sitio, agrupadas por familia","pt":"Todas as línguas do site, agrupadas por família","ru":"Все языки сайта по семьям","uk":"Усі мови сайту за родинами","ar":"كل لغات الموقع مصنفة حسب الأسرة","he":"כל השפות באתר, לפי משפחות","sw":"Lugha zote za tovuti, kwa familia"},"d_changelog":{"en":"What changed and when","ja":"いつ何が変わったか","ko":"언제 무엇이 바뀌었는지","zh":"何时更新了什么","yue":"幾時更新咗乜嘢","vi":"Thay đổi gì và khi nào","th":"มีอะไรเปลี่ยนเมื่อไร","id":"Apa yang berubah dan kapan","hi":"कब क्या बदला","de":"Was sich wann geändert hat","fr":"Ce qui a changé, et quand","it":"Che cosa è cambiato e quando","es":"Qué cambió y cuándo","pt":"O que mudou e quando","ru":"Что и когда изменилось","uk":"Що і коли змінилося","ar":"ما الذي تغيّر ومتى","he":"מה השתנה ומתי","sw":"Kilichobadilika na lini"},"d_progress":{"en":"How complete each map is","ja":"各マップの収録状況","ko":"지도별 수록 현황","zh":"各地图的完成度","yue":"各地圖嘅完成度","vi":"Mức độ hoàn thiện của từng bản đồ","th":"ความครบถ้วนของแต่ละแผนที่","id":"Seberapa lengkap tiap peta","hi":"हर मानचित्र कितना पूरा है","de":"Wie vollständig jede Karte ist","fr":"Où en est chaque carte","it":"Quanto è completa ogni mappa","es":"Cuán completo está cada mapa","pt":"Quão completo está cada mapa","ru":"Насколько заполнена каждая карта","uk":"Наскільки заповнена кожна карта","ar":"مدى اكتمال كل خريطة","he":"עד כמה כל מפה מלאה","sw":"Kila ramani imekamilika kwa kiasi gani"},"d_trivia":{"en":"Short articles about languages","ja":"言語にまつわる短い読み物","ko":"언어에 관한 짧은 읽을거리","zh":"关于语言的短文","yue":"關於語言嘅短文","vi":"Bài viết ngắn về ngôn ngữ","th":"บทความสั้นเกี่ยวกับภาษา","id":"Artikel singkat tentang bahasa","hi":"भाषाओं पर छोटे लेख","de":"Kurze Artikel über Sprachen","fr":"De courts articles sur les langues","it":"Brevi articoli sulle lingue","es":"Artículos breves sobre lenguas","pt":"Artigos curtos sobre línguas","ru":"Короткие статьи о языках","uk":"Короткі статті про мови","ar":"مقالات قصيرة عن اللغات","he":"מאמרים קצרים על שפות","sw":"Makala fupi kuhusu lugha"},"disclaimer":{"ja":"本サイトは学習・娯楽を目的としたもので、言語学的な厳密さは保証しません。誤りや改善点に気づいたら、GitHubで修正を提案するか、作者までご連絡ください。","ko":"본 사이트는 학습·오락 목적으로 제작되었으며 언어학적 엄밀성을 보장하지 않습니다. 오류나 개선점을 발견하시면 GitHub에서 수정하시거나 작성자에게 연락해 주시기 바랍니다.","zh":"本站为学习和娱乐目的而制作，不保证语言学上的严谨性。如发现错误或改进建议，请通过 GitHub 提交或联系作者。","yue":"本站係為咗學習同娛樂而整，唔保證語言學上嘅嚴謹性。如發現錯誤或有改進建議，請經 GitHub 提交或聯絡作者。","vi":"Trang này được tạo nhằm mục đích học tập và giải trí, không đảm bảo tính chính xác về mặt ngôn ngữ học. Nếu bạn phát hiện lỗi hoặc có góp ý, vui lòng gửi chỉnh sửa qua GitHub hoặc liên hệ tác giả.","th":"เว็บไซต์นี้จัดทำขึ้นเพื่อการเรียนรู้และความบันเทิง ไม่ได้รับรองความถูกต้องทางภาษาศาสตร์ หากพบข้อผิดพลาดหรือมีข้อเสนอแนะ กรุณาแก้ไขผ่าน GitHub หรือติดต่อผู้จัดทำ","id":"Situs ini dibuat untuk tujuan pembelajaran dan hiburan, dan tidak menjamin ketelitian linguistik. Jika Anda menemukan kesalahan atau memiliki saran, silakan kirim koreksi melalui GitHub atau hubungi penulis.","hi":"यह साइट सीखने और मनोरंजन के उद्देश्य से बनाई गई है और भाषावैज्ञानिक सटीकता की गारंटी नहीं देती। त्रुटियाँ या सुझाव मिलने पर कृपया GitHub पर सुधार भेजें या लेखक से संपर्क करें।","en":"This site is made for learning and entertainment purposes and does not guarantee linguistic rigor. If you notice errors or have suggestions, please submit a correction via GitHub or contact the author.","de":"Diese Seite wurde zu Lern- und Unterhaltungszwecken erstellt und erhebt keinen Anspruch auf linguistische Genauigkeit. Wenn Sie Fehler oder Verbesserungsvorschläge entdecken, reichen Sie bitte eine Korrektur über GitHub ein oder kontaktieren Sie den Autor.","fr":"Ce site a été créé à des fins d'apprentissage et de divertissement et ne garantit pas la rigueur linguistique. Si vous remarquez des erreurs ou avez des suggestions, veuillez soumettre une correction via GitHub ou contacter l'auteur.","it":"Questo sito è realizzato a scopo didattico e di intrattenimento e non garantisce il rigore linguistico. Se notate errori o avete suggerimenti, inviate una correzione tramite GitHub o contattate l’autore.","es":"Este sitio se creó con fines de aprendizaje y entretenimiento y no garantiza el rigor lingüístico. Si detectas errores o tienes sugerencias, envía una corrección a través de GitHub o contacta al autor.","pt":"Este site foi criado para fins de aprendizado e entretenimento e não garante rigor linguístico. Se notar erros ou tiver sugestões, envie uma correção pelo GitHub ou entre em contato com o autor.","ru":"Этот сайт создан для обучения и развлечения и не гарантирует лингвистической строгости. Если вы заметили ошибки или у вас есть предложения, отправьте исправление через GitHub или свяжитесь с автором.","uk":"Цей сайт створено для навчальних і розважальних цілей і не гарантує лінгвістичної точності. Якщо ви помітили помилки або маєте пропозиції, надішліть виправлення через GitHub або зв’яжіться з автором.","ar":"هذا الموقع مُعَدّ لأغراض التعلم والترفيه ولا يضمن الدقة اللغوية. إذا لاحظت أخطاء أو لديك اقتراحات، يُرجى إرسال تصحيح عبر GitHub أو التواصل مع المؤلف.","he":"אתר זה נוצר למטרות למידה ובידור ואינו מתחייב לדיוק לשוני. אם נתקלתם בטעויות או שיש לכם הצעות, שלחו תיקון דרך GitHub או צרו קשר עם היוצר.","sw":"Tovuti hii imeundwa kwa madhumuni ya kujifunza na burudani na haithibitishi usahihi wa kiisimu. Ukigundua makosa au una mapendekezo, tafadhali tuma marekebisho kupitia GitHub au wasiliana na mwandishi."},"h_maps":{"en":"Maps","ja":"マップ","ko":"지도","zh":"地图","yue":"地圖","vi":"Bản đồ","th":"แผนที่","id":"Peta","hi":"मानचित्र","de":"Karten","fr":"Cartes","it":"Mappe","es":"Mapas","pt":"Mapas","ru":"Карты","uk":"Карти","ar":"الخرائط","he":"מפות","sw":"Ramani"},"n_wo":{"en":"Word Order","ja":"語順マップ","ko":"어순 맵","zh":"语序地图","yue":"語序地圖","vi":"Bản đồ trật tự từ","th":"แผนที่ลำดับคำ","id":"Peta Urutan Kata","hi":"शब्द-क्रम नक़्शा","de":"Wortstellung","fr":"Ordre des mots","it":"Ordine delle parole","es":"Orden de palabras","pt":"Ordem das palavras","ru":"Порядок слов","uk":"Порядок слів","ar":"ترتيب الكلمات","he":"סדר מילים","sw":"Mpangilio wa maneno"},"d_wo":{"en":"The same sentence in many languages, word by word","ja":"同じ文を多くの言語で、語ごとに見比べる","ko":"같은 문장을 여러 언어로, 단어별로 비교","zh":"同一句话在多种语言中逐词对照","yue":"同一句說話喺多種語言入面逐字對照","vi":"Cùng một câu trong nhiều ngôn ngữ, so từng từ","th":"ประโยคเดียวกันในหลายภาษา เทียบทีละคำ","id":"Kalimat yang sama dalam banyak bahasa, kata demi kata","hi":"एक ही वाक्य कई भाषाओं में, शब्द-दर-शब्द","de":"Derselbe Satz in vielen Sprachen, Wort für Wort","fr":"La même phrase dans de nombreuses langues, mot à mot","it":"La stessa frase in molte lingue, parola per parola","es":"La misma frase en muchas lenguas, palabra por palabra","pt":"A mesma frase em muitas línguas, palavra por palavra","ru":"Одно предложение на многих языках, слово за словом","uk":"Одне речення багатьма мовами, слово за словом","ar":"الجملة نفسها بلغات كثيرة، كلمةً كلمة","he":"אותו משפט בשפות רבות, מילה אחר מילה","sw":"Sentensi ileile katika lugha nyingi, neno kwa neno"},"d_wm":{"en":"Everyday words in over 1,000 languages","ja":"1,000以上の言語の身近な単語","ko":"1,000개가 넘는 언어의 일상 단어","zh":"一千多种语言的日常词汇","yue":"一千幾種語言嘅日常詞彙","vi":"Từ thường ngày trong hơn 1.000 ngôn ngữ","th":"คำในชีวิตประจำวันกว่า 1,000 ภาษา","id":"Kata sehari-hari dalam lebih dari 1.000 bahasa","hi":"1,000 से ज़्यादा भाषाओं के रोज़मर्रा के शब्द","de":"Alltagswörter in über 1.000 Sprachen","fr":"Des mots du quotidien dans plus de 1 000 langues","it":"Parole quotidiane in oltre 1.000 lingue","es":"Palabras cotidianas en más de 1000 lenguas","pt":"Palavras do dia a dia em mais de 1.000 línguas","ru":"Повседневные слова более чем на 1000 языках","uk":"Повсякденні слова понад 1000 мовами","ar":"كلمات يومية بأكثر من 1000 لغة","he":"מילים יומיומיות ביותר מ־1,000 שפות","sw":"Maneno ya kila siku katika lugha zaidi ya 1,000"},"d_hm":{"en":"How languages across Asia read the same Chinese characters","ja":"同じ漢字をアジア各地の言語がどう読むか","ko":"같은 한자를 아시아 각지의 언어가 어떻게 읽는지","zh":"同一个汉字在亚洲各地语言中的读法","yue":"同一個漢字喺亞洲各地語言點讀","vi":"Cùng một chữ Hán được các ngôn ngữ châu Á đọc ra sao","th":"ภาษาต่าง ๆ ในเอเชียอ่านอักษรจีนตัวเดียวกันอย่างไร","id":"Bagaimana bahasa-bahasa Asia membaca aksara Han yang sama","hi":"एशिया की भाषाएँ एक ही चीनी अक्षर को कैसे पढ़ती हैं","de":"Wie Sprachen in Asien dieselben chinesischen Schriftzeichen lesen","fr":"Comment les langues d'Asie lisent les mêmes caractères chinois","it":"Come le lingue dell'Asia leggono gli stessi caratteri cinesi","es":"Cómo leen las lenguas de Asia los mismos caracteres chinos","pt":"Como as línguas da Ásia leem os mesmos caracteres chineses","ru":"Как языки Азии читают одни и те же иероглифы","uk":"Як мови Азії читають ті самі ієрогліфи","ar":"كيف تقرأ لغات آسيا الحروف الصينية نفسها","he":"איך שפות אסיה קוראות את אותם סימנים סיניים","sw":"Jinsi lugha za Asia zinavyosoma herufi zilezile za Kichina"},"d_nm":{"en":"One name, many languages","ja":"ひとつの名前を多くの言語で","ko":"하나의 이름, 여러 언어","zh":"同一个名字的多种语言形式","yue":"同一個名喺多種語言嘅寫法","vi":"Một cái tên, nhiều ngôn ngữ","th":"ชื่อเดียว หลายภาษา","id":"Satu nama, banyak bahasa","hi":"एक नाम, कई भाषाएँ","de":"Ein Name, viele Sprachen","fr":"Un prénom, de nombreuses langues","it":"Un nome, molte lingue","es":"Un nombre, muchas lenguas","pt":"Um nome, muitas línguas","ru":"Одно имя на многих языках","uk":"Одне ім'я багатьма мовами","ar":"اسم واحد بلغات كثيرة","he":"שם אחד, שפות רבות","sw":"Jina moja, lugha nyingi"},"d_tm":{"en":"Today's date in calendars around the world","ja":"今日の日付を世界の暦で","ko":"오늘 날짜를 세계의 달력으로","zh":"用世界各地的历法看今天的日期","yue":"用世界各地嘅曆法睇今日日期","vi":"Ngày hôm nay theo các lịch trên thế giới","th":"วันนี้ในปฏิทินต่าง ๆ ทั่วโลก","id":"Tanggal hari ini dalam kalender dunia","hi":"आज की तारीख़ दुनिया के पंचांगों में","de":"Das heutige Datum in Kalendern der Welt","fr":"La date du jour dans les calendriers du monde","it":"La data di oggi nei calendari del mondo","es":"La fecha de hoy en calendarios del mundo","pt":"A data de hoje em calendários do mundo","ru":"Сегодняшняя дата в календарях мира","uk":"Сьогоднішня дата в календарях світу","ar":"تاريخ اليوم في تقاويم العالم","he":"התאריך של היום בלוחות שנה מרחבי העולם","sw":"Tarehe ya leo katika kalenda za dunia"},"h_pages":{"en":"Pages for reading","ja":"読み物・一覧ページ","ko":"읽기 페이지","zh":"文字版页面","yue":"文字版頁面","vi":"Trang đọc","th":"หน้าสำหรับอ่าน","id":"Halaman bacaan","hi":"पढ़ने के पेज","de":"Seiten zum Lesen","fr":"Pages à lire","it":"Pagine da leggere","es":"Páginas para leer","pt":"Páginas para ler","ru":"Страницы для чтения","uk":"Сторінки для читання","ar":"صفحات للقراءة","he":"דפים לקריאה","sw":"Kurasa za kusoma"},"n_index":{"en":"Text index","ja":"テキスト版トップ","ko":"텍스트 색인","zh":"文字版首页","yue":"文字版首頁","vi":"Mục lục văn bản","th":"ดัชนีแบบข้อความ","id":"Indeks teks","hi":"पाठ सूची","de":"Textübersicht","fr":"Index texte","it":"Indice testuale","es":"Índice en texto","pt":"Índice em texto","ru":"Текстовый указатель","uk":"Текстовий покажчик","ar":"الفهرس النصي","he":"אינדקס טקסט","sw":"Faharasa ya maandishi"},"d_index":{"en":"The maps as plain pages, easy to read and search","ja":"マップの内容を読みやすいページで","ko":"지도 내용을 읽기 쉬운 페이지로","zh":"以便于阅读和搜索的页面呈现地图内容","yue":"用易讀易搜尋嘅頁面睇地圖內容","vi":"Nội dung bản đồ dưới dạng trang dễ đọc, dễ tìm","th":"เนื้อหาแผนที่ในรูปแบบหน้าอ่านง่าย ค้นหาง่าย","id":"Isi peta sebagai halaman yang mudah dibaca dan dicari","hi":"मानचित्रों की सामग्री पढ़ने-खोजने में आसान पेजों में","de":"Die Karten als einfache Seiten zum Lesen und Suchen","fr":"Le contenu des cartes en pages simples à lire et à chercher","it":"Le mappe come pagine semplici da leggere e cercare","es":"Los mapas como páginas sencillas de leer y buscar","pt":"Os mapas como páginas simples de ler e pesquisar","ru":"Содержимое карт в виде простых страниц","uk":"Вміст карт у вигляді простих сторінок","ar":"محتوى الخرائط في صفحات سهلة القراءة والبحث","he":"תוכן המפות בדפים פשוטים לקריאה ולחיפוש","sw":"Maudhui ya ramani kama kurasa rahisi kusoma na kutafuta"},"n_pwm":{"en":"Word Map: by language","ja":"単語マップ：言語別","ko":"단어 맵: 언어별","zh":"词汇地图：按语言","yue":"詞彙地圖：按語言","vi":"Bản đồ từ: theo ngôn ngữ","th":"แผนที่คำ: ตามภาษา","id":"Peta Kata: per bahasa","hi":"शब्द मानचित्र: भाषा अनुसार","de":"Wortkarte: nach Sprache","fr":"Carte des mots : par langue","it":"Mappa parole: per lingua","es":"Mapa de palabras: por lengua","pt":"Mapa de palavras: por língua","ru":"Карта слов: по языкам","uk":"Карта слів: за мовами","ar":"خريطة الكلمات: حسب اللغة","he":"מפת מילים: לפי שפה","sw":"Ramani ya maneno: kwa lugha"},"d_pwm":{"en":"A page for each language and its words","ja":"言語ごとの単語ページ","ko":"언어마다 단어를 모은 페이지","zh":"每种语言一页，列出其词汇","yue":"每種語言一頁，列出佢嘅詞彙","vi":"Mỗi ngôn ngữ một trang với các từ của nó","th":"หน้าละหนึ่งภาษาพร้อมคำศัพท์","id":"Satu halaman untuk tiap bahasa dan kata-katanya","hi":"हर भाषा और उसके शब्दों का एक पेज","de":"Eine Seite pro Sprache mit ihren Wörtern","fr":"Une page par langue avec ses mots","it":"Una pagina per ogni lingua con le sue parole","es":"Una página por lengua con sus palabras","pt":"Uma página por língua com suas palavras","ru":"Страница каждого языка с его словами","uk":"Сторінка кожної мови з її словами","ar":"صفحة لكل لغة وكلماتها","he":"דף לכל שפה ולמילים שלה","sw":"Ukurasa kwa kila lugha na maneno yake"},"n_phm":{"en":"Han Map: by language","ja":"漢字マップ：言語別","ko":"한자 맵: 언어별","zh":"汉字地图：按语言","yue":"漢字地圖：按語言","vi":"Bản đồ Hán tự: theo ngôn ngữ","th":"แผนที่อักษรจีน: ตามภาษา","id":"Peta Hanzi: per bahasa","hi":"हान्ज़ी मानचित्र: भाषा अनुसार","de":"Hanzi-Karte: nach Sprache","fr":"Carte des hanzi : par langue","it":"Mappa hanzi: per lingua","es":"Mapa de hanzi: por lengua","pt":"Mapa de hanzi: por língua","ru":"Карта иероглифов: по языкам","uk":"Карта ієрогліфів: за мовами","ar":"خريطة الحروف: حسب اللغة","he":"מפת תווים: לפי שפה","sw":"Ramani ya hanzi: kwa lugha"},"d_phm":{"en":"A page for each language's character readings","ja":"言語ごとの漢字の読みのページ","ko":"언어마다 한자 읽기를 모은 페이지","zh":"每种语言一页，列出汉字读音","yue":"每種語言一頁，列出漢字讀音","vi":"Mỗi ngôn ngữ một trang về cách đọc chữ Hán","th":"หน้าละหนึ่งภาษาพร้อมการอ่านอักษรจีน","id":"Satu halaman untuk bacaan aksara Han tiap bahasa","hi":"हर भाषा के अक्षर-उच्चारणों का एक पेज","de":"Eine Seite pro Sprache mit ihren Zeichenlesungen","fr":"Une page par langue avec ses lectures des caractères","it":"Una pagina per lingua con le letture dei caratteri","es":"Una página por lengua con sus lecturas de caracteres","pt":"Uma página por língua com suas leituras de caracteres","ru":"Страница каждого языка с чтениями иероглифов","uk":"Сторінка кожної мови з читаннями ієрогліфів","ar":"صفحة لكل لغة وقراءاتها للحروف","he":"דף לכל שפה וקריאות התווים שלה","sw":"Ukurasa kwa kila lugha na usomaji wake wa herufi"},"n_pword":{"en":"Word Map: by word","ja":"単語マップ：単語別","ko":"단어 맵: 단어별","zh":"词汇地图：按单词","yue":"詞彙地圖：按詞語","vi":"Bản đồ từ: theo từ","th":"แผนที่คำ: ตามคำ","id":"Peta Kata: per kata","hi":"शब्द मानचित्र: शब्द अनुसार","de":"Wortkarte: nach Wort","fr":"Carte des mots : par mot","it":"Mappa parole: per parola","es":"Mapa de palabras: por palabra","pt":"Mapa de palavras: por palavra","ru":"Карта слов: по словам","uk":"Карта слів: за словами","ar":"خريطة الكلمات: حسب الكلمة","he":"מפת מילים: לפי מילה","sw":"Ramani ya maneno: kwa neno"},"d_pword":{"en":"One word in every language","ja":"ひとつの単語をすべての言語で","ko":"하나의 단어를 모든 언어로","zh":"一个词在所有语言中的说法","yue":"一個詞喺所有語言點講","vi":"Một từ trong mọi ngôn ngữ","th":"คำเดียวในทุกภาษา","id":"Satu kata dalam semua bahasa","hi":"एक शब्द हर भाषा में","de":"Ein Wort in allen Sprachen","fr":"Un mot dans toutes les langues","it":"Una parola in tutte le lingue","es":"Una palabra en todas las lenguas","pt":"Uma palavra em todas as línguas","ru":"Одно слово на всех языках","uk":"Одне слово всіма мовами","ar":"كلمة واحدة بكل اللغات","he":"מילה אחת בכל השפות","sw":"Neno moja katika lugha zote"}};
    var SVG = {
        x: '<path fill="currentColor" stroke="none" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
        org: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>',
        gh: '<path fill="currentColor" stroke="none" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/>',
        tree: '<circle cx="12" cy="4" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="20" r="2"/><path d="M12 6v2M12 8h-6M12 8h6M6 14v4M18 14v4"/>',
        changelog: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 2"/>',
        progress: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
        info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
        map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
        doc: '<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h8"/>',
        book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5"/>',
        mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
    };
    function svg(k, n) { return '<svg width="' + (n || 16) + '" height="' + (n || 16) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + SVG[k] + '</svg>'; }
    function creditLang() { var l = String(document.documentElement.lang || 'en').toLowerCase().replace('-', '_'); return l === 'zh_hk' ? 'yue' : l.split('_')[0]; }
    var _creditDlg = null, _creditRet = null;
    function creditSections() {
        var b = creditLang(), here = location.pathname.split('/').pop() || 'index.html';
        var t = function (k) { return (ABOUT[k] && (ABOUT[k][b] || ABOUT[k].en)) || ''; };
        var tt = function (k) { return (TITLE_BY[k] && (TITLE_BY[k][b] || TITLE_BY[k].en)) || ''; };
        var ui = CREDIT_TRIVIA[b] ? b : 'en';
        var maps = [['index.html', 'map', t('n_wo'), t('d_wo')], ['wordmap.html', 'map', tt('wordmap'), t('d_wm')], ['hanmap.html', 'map', tt('hanmap'), t('d_hm')],
            ['namemap.html', 'map', tt('namemap'), t('d_nm')], ['timemap.html', 'map', tt('timemap'), t('d_tm')]].filter(function (r) { return r[0] !== here; });
        if (here !== 'tree.html') maps.push(['tree.html', 'tree', CREDIT_TREE[b] || CREDIT_TREE.en, '']);
        var pages = [['/' + ui + '/', 'doc', t('n_index'), ''], ['/' + ui + '/wordmap/', 'doc', t('n_pwm'), ''],
            ['/' + ui + '/word/', 'doc', t('n_pword'), ''], ['/' + ui + '/hanmap/', 'doc', t('n_phm'), ''],
            ['/' + ui + '/trivia/', 'book', CREDIT_TRIVIA[b] || CREDIT_TRIVIA.en, '']];
        var more = [['changelog.html', 'changelog', CREDIT_ICON.changelog[b] || CREDIT_ICON.changelog.en, ''],
            ['progress.html', 'progress', CREDIT_ICON.progress[b] || CREDIT_ICON.progress.en, '']];
        return [
            [t('h_maps'), maps],
            [t('h_pages'), pages],
            [t('h_more'), more],
            [t('h_fix'), [['https://github.com/jounlai/langmap', 'gh', 'GitHub', '', 1], ['mailto:cho@heuron.com', 'mail', CREDIT_MAIL[b] || CREDIT_MAIL.en, '', 0]]],
            [t('h_made'), [['https://x.com/jounlai', 'x', 'Jounlai Cho (@jounlai)', '', 1], ['https://heuron.com', 'org', 'Heuron Inc.', '', 1]]]
        ];
    }
    var _creditH = null;
    function creditHist() { return _creditH || (_creditH = window.__lmOverlay('about', { isOpen: function () { return !!(_creditDlg && !_creditDlg.hidden); }, close: function () { closeCredit(); }, open: function () { var b = document.querySelector('.lm-credit-btn'); if (b) openCredit(b); } })); }
    document.addEventListener('keydown', function (e) {
        // On the document, not the dialog: a click on its text moved focus to body
        // and Escape stopped reaching it (r27).
        if (e.key === 'Escape' && _creditDlg && !_creditDlg.hidden) { e.stopPropagation(); e.preventDefault(); closeCredit(); }
    }, true);
    function closeCredit() {
        if (!_creditDlg || _creditDlg.hidden) return;
        creditHist().closed();
        _creditDlg.hidden = true;
        var bd = document.getElementById('lm-credit-backdrop'); if (bd) bd.hidden = true;
        if (_creditRet && _creditRet.isConnected) try { _creditRet.focus(); } catch (_) {}
    }
    function openCredit(btn) {
        var b = creditLang();
        if (!_creditDlg) {
            var bd = document.createElement('div'); bd.id = 'lm-credit-backdrop'; bd.hidden = true;
            bd.addEventListener('click', closeCredit);
            _creditDlg = document.createElement('div'); _creditDlg.id = 'lm-credit-pop'; _creditDlg.hidden = true;
            _creditDlg.setAttribute('role', 'dialog'); _creditDlg.tabIndex = -1; _creditDlg.setAttribute('aria-modal', 'true'); _creditDlg.setAttribute('aria-labelledby', 'lm-credit-h');
            _creditDlg.addEventListener('keydown', function (e) {
                if (e.key !== 'Tab') return;
                var f = _creditDlg.querySelectorAll('a,button'); if (!f.length) return;
                if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
                else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
            });
            document.body.appendChild(bd); document.body.appendChild(_creditDlg);
        }
        _creditDlg.dir = /^(ar|he)$/.test(b) ? 'rtl' : 'ltr';
        var esc = function (x) { return String(x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
        var tx = function (k) { return esc((ABOUT[k] && (ABOUT[k][b] || ABOUT[k].en)) || ''); };
        var h = '<h2 id="lm-credit-h">' + esc(CREDIT_ABOUT[b] || CREDIT_ABOUT.en) + '</h2>'
            + '<button type="button" class="lm-credit-x" aria-label="' + esc(CLOSE_LBL[b] || CLOSE_LBL.en) + '">×</button>'
            + '<div class="lm-credit-body"><p class="lm-credit-intro">' + tx('intro') + '</p>';
        creditSections().forEach(function (sec) {
            // Self-explanatory links carry no description (owner 2026-10-19: compact).
            h += '<h3>' + esc(sec[0]) + '</h3><ul' + (sec[1].every(function (r) { return !r[3]; }) ? ' class="lm-credit-compact"' : '') + '>';
            sec[1].forEach(function (r) {
                h += '<li><a href="' + r[0] + '"' + (/^https?:/.test(r[0]) ? ' target="_blank" rel="noopener"' : '') + '>' + svg(r[1], 18)
                    + '<span class="lm-credit-t"><b' + (r[4] ? ' dir="ltr"' : '') + '>' + esc(r[2]) + '</b>' + (r[3] ? '<small>' + esc(r[3]) + '</small>' : '') + '</span></a></li>';
            });
            h += '</ul>';
        });
        h += '<p class="lm-credit-note">' + tx('disclaimer') + '</p></div>';
        _creditDlg.innerHTML = h;
        _creditDlg.querySelector('.lm-credit-x').addEventListener('click', closeCredit);
        _creditRet = btn;
        creditHist().opened();
        document.getElementById('lm-credit-backdrop').hidden = false;
        _creditDlg.hidden = false;
        setTimeout(function () { var a = _creditDlg.querySelector('a'); if (a) a.focus(); }, 0);
    }
    // Font-size +/−: press and hold to keep stepping, faster the longer the
    // hold (owner 2026-10-19: max size took dozens of clicks). A tap is still
    // one step. Delegated, so every page's .size-step-btn gets it.
    (function sizeHold() {
        var t = null, btn = null, held = null, n = 0, done = 0, fired = false, log = [], firstAt = Infinity;
        var stop = function () { if (t) clearTimeout(t); t = null; btn = null; };
        var rangeOf = function (b) { var id = b.getAttribute('aria-controls'), r = id && document.getElementById(id); return r && r.type === 'range' ? r : null; };
        // On a slow phone each step relayouts for up to ~0.9 s, so the next
        // step's timer runs before the queued pointerup and the hold overshoots
        // (r36). The pointerup's timeStamp is the real release time: undo every
        // step that finished after it.
        var release = function (e) {
            // held, not btn: a hold that reached max/min has already stopped.
            var b = held, ts = e.timeStamp;
            stop(); held = null;
            if (!b || !log.length || !(ts > 0)) return;
            var i = 0; while (i < log.length && log[i][0] <= ts) i++;
            if (i === 0 && log.length) i = 1;   // a press always moves at least one step (r37: 0.4-0.8 s holds did nothing)
            var extra = log.slice(i); log = log.slice(0, i);
            if (extra.length) {
                var rng = rangeOf(b);
                if (rng) {
                    rng.value = String(extra[0][1]);
                    rng.dispatchEvent(new Event('input')); rng.dispatchEvent(new Event('change'));
                } else {
                    var opp = document.getElementById(b.id.replace(/inc|dec|up|down/, function (m) { return { inc: 'dec', dec: 'inc', up: 'down', down: 'up' }[m]; }));
                    if (opp) extra.forEach(function () { opp.click(); });
                }
            }
            // Released before the first step began: it was a tap, let its click
            // step once. A step that began before but finished after the
            // release was a hold the screen had not caught up with: no step.
            if (!(firstAt <= ts)) fired = false;
        };
        var tick = function () {
            if (!btn || btn.disabled) return stop();
            fired = true; if (!n++) firstAt = performance.now();
            // Word/Han Map: each step redraws every label (~0.3 s), so clicks
            // alone cannot go fast. Grow the jump instead: 1,2,4,7,10 steps.
            // A step is stamped when its own work is done: one still being laid
            // out when the finger lifted was not on screen yet, so it is undone.
            var rng = rangeOf(btn);
            if (rng) {
                // On a slow phone one redraw takes ~1 s, so also keep pace with
                // the clock: at least 15 steps a second since the first step
                // (Word Map at 4x CPU needed 6 s+ to reach max, r36).
                var k = Math.max([1, 2, 4, 7, 10][Math.min(4, n - 1)], Math.floor(1 + (performance.now() - firstAt) * 0.015) - done), st = 10;
                done += k;
                var dir = /up|inc/.test(btn.id) ? 1 : -1;
                var v = Math.max(+rng.min, Math.min(+rng.max, (+rng.value) + dir * k * st)), was = rng.value;
                if (v !== +rng.value) { rng.value = String(v); rng.dispatchEvent(new Event('input')); rng.dispatchEvent(new Event('change')); log.push([performance.now(), was]); }
                if (v === +rng.min || v === +rng.max) return stop();
            } else { btn.click(); log.push([performance.now(), null]); }
            t = setTimeout(tick, Math.max(45, 160 - n * 18));   // 160 → 45 ms
        };
        document.addEventListener('pointerdown', function (e) {
            var b = e.target.closest && e.target.closest('.size-step-btn');
            if (!b || b.disabled || e.button > 0) return;
            stop(); btn = held = b; n = 0; done = 0; fired = false; log = []; firstAt = Infinity;
            t = setTimeout(tick, 380);
        }, true);
        ['pointerup', 'pointercancel'].forEach(function (ev) { document.addEventListener(ev, release, true); });
        // pointerleave does not bubble: watch the held button itself. A capture
        // blur on window heard the gear losing focus to the size button and
        // stopped the first mouse hold (r36).
        document.addEventListener('pointerout', function (e) { if (held && e.target === held && !held.contains(e.relatedTarget)) { release(e); fired = false; } }, true);
        window.addEventListener('blur', function (e) { if (e.target === window) { stop(); fired = false; } });
        // The click that ends a hold must not add one more step.
        document.addEventListener('click', function (e) {
            if (!e.isTrusted) return;                      // the hold's own steps and undos
            if (!e.detail) { fired = false; return; }      // keyboard click: never swallowed
            if (!fired) return;
            var b = e.target.closest && e.target.closest('.size-step-btn'); if (!b) return;
            fired = false; e.stopImmediatePropagation(); e.preventDefault();
        }, true);
        document.addEventListener('contextmenu', function (e) { if (e.target.closest && e.target.closest('.size-step-btn')) e.preventDefault(); }, true);
    })();
    // EXPERIMENT (owner 2026-10-19): stand the credit's little dancer on the
    // text baseline. The text and globe stay where the flex centring puts them;
    // only the dancer moves. The baseline depends on the reader's font, so it
    // is measured: the text's content box top + the font's ascent.
    function placeDancer(btn) {
        var d = btn && btn.querySelector('.lm-dancer'), bl = btn && btn.querySelector('.lm-bl'); if (!bl) return;
        if (!d) d = document.createElement('span');
        // .lm-bl is a zero-size inline-block on the text's baseline, so this is
        // the baseline as the reader's own fonts render it (Windows differs).
        var fit = function () {
            if (!btn.getClientRects().length) return;
            var base = bl.getBoundingClientRect().top;
            d.style.top = '0px';
            // A touch above the baseline reads as standing on it (owner 2026-10-19).
            d.style.top = (base - d.getBoundingClientRect().bottom - parseFloat(getComputedStyle(btn).fontSize) * 0.05).toFixed(2) + 'px';
            // The globe centres on the capital letters, not on the line box
            // (flex centring put it visibly high; owner 2026-10-19).
            var g = btn.querySelector('.lm-credit-ico');
            if (g) {
                g.style.position = 'relative'; g.style.top = '0px';
                var gr = g.getBoundingClientRect(), cap = parseFloat(getComputedStyle(btn).fontSize) * 0.71;
                g.style.top = (base - cap / 2 - (gr.top + gr.height / 2)).toFixed(2) + 'px';
            }
        };
        fit();
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
        window.addEventListener('resize', fit);
        if (window.ResizeObserver) try { new ResizeObserver(fit).observe(btn); } catch (_) {}
    }
    function compactCredit() {
        var wm = document.querySelector('.url-watermark, .tree-credit, .site-footer-links');   // .site-footer-links: the Word Order footer (r26)
        if (!wm || wm.__lmCompact) return;
        wm.__lmCompact = true;
        // The button's own style must exist before the first tap: the strip is
        // pointer-events:none, and the button inherited it.
        var st = document.createElement('style');
        st.textContent = '#lm-credit-pop[hidden],#lm-credit-backdrop[hidden]{display:none!important}'
            + '#lm-credit-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.25);z-index:100010}'
                + '#lm-credit-pop{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:100011;width:min(640px,calc(100vw - 32px));max-height:calc(100dvh - 32px);display:flex;flex-direction:column;box-sizing:border-box;background:#fff;color:#202124;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.25);padding:14px 12px 10px;font:14px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}'
                + '#lm-credit-pop .lm-credit-body{overflow-y:auto;padding:0 4px}'
                + '#lm-credit-pop .lm-credit-intro{margin:0 0 4px;color:#3c4043;font-size:13px}'
                + '#lm-credit-pop h3{font-size:12px;font-weight:600;color:#5f6368;margin:10px 6px 2px;text-transform:none}'
                + '#lm-credit-pop .lm-credit-t{display:flex;flex-direction:column;min-width:0}'
                + '#lm-credit-pop .lm-credit-t b{font-weight:600}'
                + '#lm-credit-pop .lm-credit-t small{font-size:12px;line-height:1.3;color:#5f6368}'
                + '#lm-credit-pop svg{flex:none;color:#5f6368}'
                + '#lm-credit-pop .lm-credit-note{margin:10px 6px 2px;padding-top:8px;border-top:1px solid #e8eaed;font-size:12px;color:#5f6368}'
                + '#lm-credit-pop h2{font-size:17px;margin-block:0 4px;margin-inline:4px 44px}'
                + '#lm-credit-pop ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));column-gap:4px}'
                + '#lm-credit-pop ul.lm-credit-compact{grid-template-columns:repeat(auto-fill,minmax(145px,1fr))}'
                + '#lm-credit-pop ul.lm-credit-compact a{min-height:36px;padding:2px 6px}'
                + '#lm-credit-pop .lm-credit-t b{font-weight:600;line-height:1.3}'
                + '#lm-credit-pop a{display:flex;align-items:center;gap:10px;min-height:40px;padding:3px 6px;border-radius:8px;color:inherit;text-decoration:none}'
                + '#lm-credit-pop a:hover,#lm-credit-pop a:focus-visible{background:#f1f3f4}'
                + '#lm-credit-pop .lm-credit-x{position:absolute;top:8px;inset-inline-end:8px;width:40px;height:40px;border:0;background:none;font-size:22px;line-height:1;cursor:pointer;color:#5f6368;border-radius:8px}'
                + '.lm-credit-btn{all:unset;cursor:pointer;pointer-events:auto;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center;min-height:32px;padding:0 6px;margin:-10px 0}'
                + '.lm-credit-btn:focus-visible{outline:2px solid #1a73e8;outline-offset:2px;border-radius:4px}'
;
        document.head.appendChild(st);
        // The pages now ship this button in their HTML, so a reload no longer
        // flashes the old long credit before the swap (owner 2026-10-19). Build
        // it only for a page that still has the old markup.
        var btn = wm.querySelector('.lm-credit-btn');
        if (!btn) {
            btn = document.createElement('button');
            btn.type = 'button'; btn.className = 'lm-credit-btn'; btn.setAttribute('aria-haspopup', 'dialog');
            btn.dir = 'ltr'; btn.lang = 'en';   // read in an English voice in every UI (3.1.2)
            btn.textContent = 'LangMap | © Jounlai Cho';   // one fixed English line, all of it the link (owner, r26; © and globe 2026-10-19)
            wm.textContent = '';
            wm.appendChild(btn);
        }
        btn.addEventListener('click', function () { openCredit(btn); });
        placeDancer(btn);
        var dc = document.getElementById('disclaimer'); if (dc) dc.hidden = true;   // now in the About dialog
        syncCredit();
    }
    // The map container is a Tab stop; without a role and name a screen reader
    // read every label on it as its name (827-2,337 characters) (r26).
    var MAP_LBL = {en:'Map. Arrow keys pan, + and − zoom.',ja:'地図。矢印キーで移動、+ と − で拡大縮小。',ko:'지도. 화살표 키로 이동, + 와 − 로 확대·축소.',zh:'地图。方向键移动，+ 和 − 缩放。',yue:'地圖。方向鍵移動，+ 同 − 縮放。',vi:'Bản đồ. Phím mũi tên để di chuyển, + và − để thu phóng.',th:'แผนที่ ใช้ปุ่มลูกศรเลื่อน + และ − ซูม',id:'Peta. Tombol panah untuk menggeser, + dan − untuk zoom.',hi:'मानचित्र। तीर कुंजियों से खिसकाएँ, + और − से ज़ूम करें।',de:'Karte. Pfeiltasten verschieben, + und − zoomen.',fr:'Carte. Flèches pour se déplacer, + et − pour zoomer.',it:'Mappa. Frecce per spostarsi, + e − per lo zoom.',es:'Mapa. Flechas para desplazar, + y − para acercar o alejar.',pt:'Mapa. Setas para mover, + e − para zoom.',ru:'Карта. Стрелки — перемещение, + и − — масштаб.',uk:'Карта. Стрілки — переміщення, + і − — масштаб.',ar:'خريطة. مفاتيح الأسهم للتحريك، و+ و− للتكبير والتصغير.',he:'מפה. מקשי החצים להזזה, + ו־− לזום.',sw:'Ramani. Vitufe vya mishale kusogeza, + na − kukuza.'};
    var MAP_ROLE = {en:'map',ja:'地図',ko:'지도',zh:'地图',yue:'地圖',vi:'bản đồ',th:'แผนที่',id:'peta',hi:'मानचित्र',de:'Karte',fr:'carte',it:'mappa',es:'mapa',pt:'mapa',ru:'карта',uk:'карта',ar:'خريطة',he:'מפה',sw:'ramani'};
    function syncMapLabel() {
        var m = document.querySelector('.leaflet-container[tabindex]'); if (!m) return;
        var b = creditLang();
        m.setAttribute('role', 'region');
        m.setAttribute('aria-roledescription', MAP_ROLE[b] || MAP_ROLE.en);
        m.setAttribute('aria-label', MAP_LBL[b] || MAP_LBL.en);
    }
    window.addEventListener('load', syncMapLabel);
    new MutationObserver(function () { syncCredit(); syncTitle(); syncFooterLinks(); syncMapLabel(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { compactCredit(); panelFold(); syncCredit(); syncTitle(); syncFooterLinks(); }); else { compactCredit(); panelFold(); syncCredit(); syncTitle(); syncFooterLinks(); }
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
