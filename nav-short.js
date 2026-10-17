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
        de: {"word":"Wörter","han":"Hanzi","name":"Namen","time":"Kalender"},
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
        if (LABELS[code]) return code;
        var b = code.slice(0, 2);
        return LABELS[b] ? b : null;
    }
    function fromUrl() {
        // ?ui= is what the pages write into shared links; l= is older.
        var m = /[?#&](?:l|ui)=([A-Za-z_-]+)/.exec(location.search + '&' + location.hash);
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
