/*
 * trivia_reader.js — the trivia ("読み物") window for Name Map and Time Map.
 *
 * Word Map and Han Map each carry their own trivia code inline; the two newer
 * maps share this one. The look (amber card, compact corner mode after a map
 * action, prev/next rows) and the URL/history behaviour (#trivia=<id>, one
 * history entry through nav-short.js __lmOverlay) follow hanmap.html.
 *
 * The articles come from <map>_trivia_rt/, GENERATED from <map>_trivia.js by
 * tools/build_trivia_rt.js: base.js holds every article with titles and
 * summaries in all languages and the English bodies; <ui>.js holds the bodies
 * in one other language. Nothing is fetched until the reader opens the window.
 *
 * A page mounts it once:
 *   <script type="text/plain" id="trivia-src" src="namemap_trivia_rt/base.js?v=N"></script>
 *   (the page may load this file itself later; pass initialHash: the URL hash at page start)
 *   LMTrivia.mount({
 *     map: 'namemap', label: {en,…}, getLang: () => uiLang, seo: true,
 *     actions: { setname(btn) {…}, panto(btn) {…} },
 *     onHash: updateHash,                     // page rewrites its URL; it asks LMTrivia.hashPart()
 *   });
 */
(function () {
    'use strict';
    if (window.LMTrivia) return;

    // The deep link as the page was opened, before anything rewrites the hash.
    const INITIAL_HASH = location.hash;

    const CSS = `
.trivia-btn{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;white-space:nowrap;padding:5px 12px;border:1px solid #d9a441;border-radius:20px;background:linear-gradient(135deg,#fff6dc,#ffe7b0);color:#6a4c1c;cursor:pointer;box-shadow:0 1px 3px rgba(180,130,30,.18);transition:all .2s ease;margin-left:8px;font-family:inherit;-webkit-appearance:none;appearance:none}
.trivia-btn:hover{background:linear-gradient(135deg,#ffeec1,#ffd98a);box-shadow:0 2px 6px rgba(180,130,30,.28)}
.trivia-btn:focus-visible{outline:2px solid #8a5a0e;outline-offset:2px}
.trivia-backdrop{position:fixed;inset:0;z-index:1500;background:rgba(40,30,15,.5);backdrop-filter:blur(2px);display:none}
.trivia-backdrop.visible{display:block}
.trivia-backdrop.transparent{background:transparent;backdrop-filter:none;pointer-events:none}
.trivia-modal{position:fixed;z-index:1501;top:50%;left:50%;transform:translate(-50%,-50%);width:min(680px,calc(100vw - 32px));max-height:calc(100vh - 64px);background:linear-gradient(135deg,rgba(255,251,235,.985),rgba(252,243,221,.985));border:1px solid #d9a441;border-left:5px solid #b8860b;border-radius:12px;box-shadow:0 12px 40px rgba(60,40,10,.35);color:#3a2e1a;font-size:14px;line-height:1.7;display:none;flex-direction:column;overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif}
.trivia-modal.visible{display:flex}
.trivia-modal[dir=rtl]{border-left:1px solid #d9a441;border-right:5px solid #b8860b}
.trivia-modal button{-webkit-appearance:none;appearance:none}
.trivia-modal-tools{flex:0 0 auto;display:flex;justify-content:flex-end;align-items:center;gap:6px;padding:6px 10px}
.trivia-scroll{flex:1 1 auto;min-height:0;overflow-y:auto;padding:8px 32px 28px;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:rgba(120,90,30,.38) transparent}
.trivia-modal.compact{top:auto;bottom:24px;left:12px;transform:none;width:min(380px,calc(100vw - 24px));max-height:min(60vh,calc(100vh - 310px));box-shadow:0 6px 24px rgba(60,40,10,.30)}
.trivia-modal.compact .trivia-scroll{padding:4px 22px 22px}
.trivia-modal.compact h2{font-size:18px}
.trivia-modal.compact .trivia-summary{font-size:12px}
.trivia-back,.trivia-expand{height:26px;font-size:12px;font-weight:600;line-height:1;padding:0 10px;border:1px solid rgba(180,130,30,.45);border-radius:12px;background:rgba(255,247,225,.85);color:#6a4c1c;cursor:pointer;align-items:center;justify-content:center;font-family:inherit;display:none}
.trivia-back{margin-inline-end:auto}
.trivia-modal[data-view=article] .trivia-back{display:inline-flex}
.trivia-modal.compact .trivia-expand{display:inline-flex;font-size:14px;min-width:28px}
.trivia-back:hover,.trivia-expand:hover{background:rgba(255,235,180,.95);border-color:#b8860b}
.trivia-modal .close-btn{background:none;border:none;width:28px;height:26px;font-size:22px;line-height:1;cursor:pointer;color:#7a5a1e;display:inline-flex;align-items:center;justify-content:center;padding:0}
.trivia-modal .close-btn:hover{color:#5a3f15}
@media (pointer:coarse){.trivia-expand,.trivia-modal .close-btn{min-width:40px;min-height:40px}}
.trivia-modal .trivia-eyebrow{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#7a5a1e;margin-bottom:6px}
.trivia-modal h2{font-size:22px;line-height:1.3;margin:0 0 6px;color:#4a3416;font-weight:700}
.trivia-modal h2:focus{outline:none}
.trivia-modal .trivia-icon{font-size:22px;margin-inline-end:6px;vertical-align:-1px}
.trivia-modal .trivia-summary{font-size:14px;font-style:italic;color:#6a4c1c;border-inline-start:2px solid #d9a441;padding:6px 0;padding-inline-start:12px;margin:10px 0 18px;background:rgba(255,240,200,.4)}
.trivia-modal .trivia-body h3{font-size:15px;margin:18px 0 6px;color:#4a3416}
.trivia-modal .trivia-body p{margin:0 0 12px}
.trivia-modal .trivia-body ul{margin:0 0 14px;padding-inline-start:22px}
.trivia-modal .trivia-body li{margin-bottom:6px}
.trivia-modal .trivia-body strong{color:#4a3416}
.trivia-modal .trivia-body em{color:#6a4c1c}
.trivia-modal .trivia-body blockquote{margin:14px 0;padding:10px 14px;border-inline-start:3px solid #b8860b;background:rgba(255,237,190,.55);font-style:italic;color:#5a3f15}
.trivia-actions{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}
.trivia-action{display:inline-flex;align-items:center;gap:4px;font-size:12.5px;font-weight:600;padding:4px 11px;margin:2px;border:1px solid #c8932f;border-radius:14px;background:linear-gradient(135deg,#ffefc4,#ffd98a);color:#5a3f15;cursor:pointer;line-height:1.3;transition:all .18s ease;font-family:inherit;text-align:start}
.trivia-action:hover{background:linear-gradient(135deg,#ffe49a,#ffc760);border-color:#a87a1c;transform:translateY(-1px);box-shadow:0 2px 6px rgba(180,130,30,.32)}
.trivia-action:focus-visible,.trivia-card:focus-visible{outline:2px solid #8a5a0e;outline-offset:2px}
.trivia-modal .trivia-sources{margin-top:22px;padding:12px 14px;background:rgba(255,240,200,.35);border-inline-start:2px solid rgba(180,130,30,.4);font-size:11.5px;line-height:1.55;color:#4a3416}
.trivia-modal .trivia-sources-label{display:block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#7a5a1e;margin-bottom:6px}
.trivia-modal .trivia-sources ul{margin:0;padding-inline-start:18px;list-style:square}
.trivia-modal .trivia-sources li{margin-bottom:3px;overflow-wrap:anywhere}
.trivia-modal .trivia-sources a{color:#5a3f15;text-decoration:underline;text-decoration-color:rgba(120,90,30,.4)}
.trivia-modal .trivia-tags{margin-top:18px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.trivia-modal .trivia-tag{font-size:10px;padding:2px 8px;border-radius:10px;background:rgba(180,130,30,.12);color:#6a4c1c;border:1px solid rgba(180,130,30,.25)}
.trivia-modal .trivia-seo-link{display:inline-block;margin-inline-start:auto;font-size:12px;font-weight:600;color:#3a5ce5;text-decoration:none;white-space:nowrap}
.trivia-modal .trivia-seo-link:hover{text-decoration:underline}
.trivia-index{display:flex;flex-direction:column;gap:4px;padding-top:4px}
.trivia-index[hidden],.trivia-article-nav[hidden],.trivia-article-nav button[hidden]{display:none}
.trivia-index-intro{font-size:13px;color:#6a4c1c;margin:0 0 14px;font-style:italic}
.trivia-card{display:block;width:100%;text-align:start;background:transparent;border:none;padding:8px 4px;cursor:pointer;font-family:inherit;color:#3a2e1a}
.trivia-card:hover{background:rgba(255,235,180,.55)}
.trivia-card-title{font-size:14px;font-weight:700;color:#4a3416;margin:0 0 4px;line-height:1.3}
.trivia-card-num{display:inline-block;font-size:10px;font-weight:700;color:#7a5a1e;margin-inline-end:4px}
.trivia-card-summary{font-size:11.5px;line-height:1.45;color:#6a4c1c;margin:0;display:-webkit-box;-webkit-line-clamp:3;line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.trivia-article-nav{display:flex;flex-direction:column;gap:8px;margin-top:22px;padding-top:16px;border-top:1px solid rgba(180,130,30,.25)}
.trivia-article-nav button{display:block;width:100%;text-align:start;background:rgba(255,243,205,.55);border:1px solid rgba(180,130,30,.28);border-radius:8px;padding:8px 12px;cursor:pointer;font-family:inherit;color:#3a2e1a}
.trivia-article-nav button:hover{background:rgba(255,235,180,.85);border-color:#b8860b}
.trivia-article-nav .nav-dir{display:block;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#7a5a1e;margin-bottom:2px}
.trivia-article-nav .nav-title{display:block;font-size:13px;font-weight:600;color:#4a3416;line-height:1.3}
.trivia-article-nav button.to-index{background:rgba(255,253,240,.6);border-style:dashed;text-align:center;padding:7px 12px}
.trivia-article-nav button.to-index .nav-dir{margin:0;font-size:12px;text-transform:none;letter-spacing:.3px;color:#6a4c1c}
@media (max-width:720px){.trivia-modal.compact{top:auto;bottom:0;left:0;width:100%;max-height:45vh;border-radius:12px 12px 0 0;border-left:1px solid #d9a441;border-right:1px solid #d9a441;border-top:5px solid #b8860b}}
@media (max-width:600px){.trivia-modal{width:calc(100vw - 16px);font-size:14.5px}.trivia-modal h2{font-size:18px}.trivia-scroll{padding:6px 16px 18px}.trivia-modal.compact .trivia-scroll{padding:4px 14px 16px}.trivia-modal-tools{padding:4px 8px}.trivia-modal .trivia-sources{font-size:10px;line-height:1.45;padding:9px 11px;margin-top:16px}}
@media (max-width:640px){.site-header-bar>.trivia-btn{margin-left:6px;margin-right:0;padding:5px 9px;gap:3px}.site-header-bar>.trivia-btn .trivia-btn-label{font-size:11px}}
`;

    // Window chrome, the same words as on Han Map.
    const UI = {
        short: { en: 'Trivia', ja: '豆知識', ko: '토막상식', zh: '小知识', yue: '小知識', vi: 'Thú vị', th: 'เกร็ด', id: 'Trivia', hi: 'रोचक तथ्य', de: 'Trivia', fr: 'Anecdotes', it: 'Curiosità', es: 'Curiosidades', pt: 'Curiosidades', ru: 'Факты', uk: 'Факти', ar: 'طرائف', he: 'טריוויה', sw: 'Mambo' },
        close: { en: 'Close', ja: '閉じる', ko: '닫기', zh: '关闭', yue: '關閉', vi: 'Đóng', th: 'ปิด', id: 'Tutup', hi: 'बंद करें', de: 'Schließen', fr: 'Fermer', it: 'Chiudi', es: 'Cerrar', pt: 'Fechar', ru: 'Закрыть', uk: 'Закрити', ar: 'إغلاق', he: 'סגירה', sw: 'Funga' },
        back: { en: '← Articles', ja: '← 記事一覧', ko: '← 글 목록', zh: '← 文章列表', yue: '← 文章列表', vi: '← Bài viết', th: '← รายการบทความ', id: '← Daftar artikel', hi: '← लेख सूची', de: '← Artikel', fr: '← Articles', it: '← Articoli', es: '← Artículos', pt: '← Artigos', ru: '← Статьи', uk: '← Статті', ar: '→ قائمة المقالات', he: '→ רשימת מאמרים', sw: '← Makala' },
        intro: { en: 'Pick a topic to dive in.', ja: '気になるテーマを選んでください。', ko: '관심 가는 주제를 골라보세요.', zh: '挑一个感兴趣的话题。', yue: '揀一個感興趣嘅話題。', vi: 'Chọn một chủ đề.', th: 'เลือกหัวข้อที่สนใจ', id: 'Pilih topik.', hi: 'कोई विषय चुनें।', de: 'Wähle ein Thema.', fr: 'Choisissez un sujet.', it: 'Scegli un argomento.', es: 'Elige un tema.', pt: 'Escolha um tema.', ru: 'Выберите тему.', uk: 'Виберіть тему.', ar: 'اختر موضوعًا.', he: 'בחרו נושא.', sw: 'Chagua mada.' },
        prev: { en: '← Previous', ja: '← 前の記事', ko: '← 이전 글', zh: '← 上一篇', yue: '← 上一篇', vi: '← Trước', th: '← ก่อนหน้า', id: '← Sebelumnya', hi: '← पिछला', de: '← Vorheriger', fr: '← Précédent', it: '← Precedente', es: '← Anterior', pt: '← Anterior', ru: '← Назад', uk: '← Назад', ar: '→ السابق', he: '→ הקודם', sw: '← Iliyotangulia' },
        next: { en: 'Next →', ja: '次の記事 →', ko: '다음 글 →', zh: '下一篇 →', yue: '下一篇 →', vi: 'Tiếp →', th: 'ถัดไป →', id: 'Berikutnya →', hi: 'अगला →', de: 'Nächster →', fr: 'Suivant →', it: 'Successivo →', es: 'Siguiente →', pt: 'Próximo →', ru: 'Далее →', uk: 'Далі →', ar: 'التالي ←', he: 'הבא ←', sw: 'Inayofuata →' },
        page: { en: 'Article page', ja: '記事ページ', ko: '기사 페이지', zh: '文章页面', yue: '文章頁面', vi: 'Trang bài viết', th: 'หน้าบทความ', id: 'Halaman artikel', hi: 'लेख पृष्ठ', de: 'Artikelseite', fr: 'Page de l’article', it: 'Pagina dell’articolo', es: 'Página del artículo', pt: 'Página do artigo', ru: 'Страница статьи', uk: 'Сторінка статті', ar: 'صفحة المقالة', he: 'עמוד המאמר', sw: 'Ukurasa wa makala' },
        sources: { en: 'Sources & further reading', ja: '出典・参考文献', ko: '출처 · 참고문헌', zh: '参考资料', yue: '參考資料', vi: 'Nguồn & tài liệu tham khảo', th: 'แหล่งอ้างอิงและอ่านเพิ่มเติม', id: 'Sumber & bacaan lanjutan', hi: 'स्रोत और संदर्भ', de: 'Quellen & Lektüre', fr: 'Sources & lectures', it: 'Fonti & approfondimenti', es: 'Fuentes y lecturas', pt: 'Fontes e leituras', ru: 'Источники и литература', uk: 'Джерела й література', ar: 'المصادر والقراءات الإضافية', he: 'מקורות וקריאה נוספת', sw: 'Vyanzo na masomo zaidi' },
        expand: { en: 'Expand article back to full screen', ja: '記事を全画面に広げる', ko: '글을 전체 화면으로 펼치기', zh: '将文章展开到全屏', yue: '將文章展開到全螢幕', vi: 'Mở rộng bài viết toàn màn hình', th: 'ขยายบทความเต็มหน้าจอ', id: 'Perluas artikel ke layar penuh', hi: 'लेख को पूरी स्क्रीन तक विस्तार करें', de: 'Artikel auf Vollbild erweitern', fr: 'Agrandir l\'article en plein écran', it: 'Espandi l\'articolo a schermo intero', es: 'Expandir el artículo a pantalla completa', pt: 'Expandir o artigo para tela cheia', ru: 'Развернуть статью на весь экран', uk: 'Розгорнути статтю на весь екран', ar: 'توسيع المقالة إلى ملء الشاشة', he: 'הרחבת המאמר למסך מלא', sw: 'Panua makala kwa skrini nzima' },
    };

    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const hashParam = (h, k) => { for (const kv of String(h || '').replace(/^#/, '').split('&')) { const i = kv.indexOf('='); if (i > 0 && kv.slice(0, i) === k) { try { return decodeURIComponent(kv.slice(i + 1)); } catch (e) { return kv.slice(i + 1); } } } return null; };
    const isRTL = (l) => /^(ar|he)/.test(String(l || ''));

    let cfg = null, modal, backdrop, scroll, btn, hist = null;
    let curId = null, view = null, opener = null, lastId = null, pending = null;
    const loaded = {}, loading = {};

    function L() { return String((cfg && cfg.getLang && cfg.getLang()) || 'en').split('_')[0]; }
    function t(k) { const o = UI[k] || {}; return o[L()] || o.en || ''; }
    function pick(o) { return (o && (o[L()] || o.en)) || ''; }
    function articles() { return (window.LMT_ARTICLES && window.LMT_ARTICLES[cfg.map]) || []; }
    function bodyOf(a) {
        const ui = L();
        if (ui === 'en' || !a) return (a && a.body && a.body.en) || '';
        const per = window.LMT_BODY && window.LMT_BODY[cfg.map] && window.LMT_BODY[cfg.map][ui];
        return (per && per[a.id]) || (a.body && a.body.en) || '';
    }

    function loadScript(src) {
        if (loading[src]) return loading[src];
        return loading[src] = new Promise((res) => {
            const s = document.createElement('script');
            s.src = src; s.onload = () => res(true); s.onerror = () => { console.warn('trivia: failed to load', src); res(false); };
            document.head.appendChild(s);
        });
    }
    // base.js is named by an inert <script type="text/plain" id="trivia-src">
    // tag, so its ?v= is kept by tools/page_asset_version_check.js like any
    // other asset; the language files ride on the build hash base.js carries.
    function ensureLoaded() {
        const tag = document.getElementById('trivia-src');
        const base = (tag && tag.getAttribute('src')) || (cfg.map + '_trivia_rt/base.js');
        const dir = base.replace(/[^/]*$/, '');
        return loadScript(base).then(() => {
            const ui = L(), langs = (window.LMT_LANGS && window.LMT_LANGS[cfg.map]) || [];
            if (ui === 'en' || langs.indexOf(ui) < 0 || loaded[ui]) return;
            const v = '?v=' + encodeURIComponent((window.LMT_BUILD && window.LMT_BUILD[cfg.map]) || '1');
            return loadScript(dir + ui + '.js' + v).then((ok) => { if (ok) loaded[ui] = true; });
        });
    }

    function build() {
        const st = document.createElement('style');
        st.id = 'trivia-reader-css'; st.textContent = CSS;
        document.head.appendChild(st);
        backdrop = document.createElement('div');
        backdrop.className = 'trivia-backdrop'; backdrop.id = 'trivia-backdrop'; backdrop.setAttribute('aria-hidden', 'true');
        modal = document.createElement('div');
        modal.className = 'trivia-modal'; modal.id = 'trivia-modal';
        modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'trivia-heading'); modal.tabIndex = -1;
        modal.innerHTML =
            '<div class="trivia-modal-tools">' +
            '<button type="button" class="trivia-back" id="trivia-back"></button>' +
            '<button type="button" class="trivia-expand" id="trivia-expand">⤢</button>' +
            '<button type="button" class="close-btn" id="trivia-close">&times;</button></div>' +
            '<div class="trivia-scroll" id="trivia-scroll">' +
            '<div class="trivia-eyebrow" id="trivia-eyebrow"></div>' +
            '<h2 id="trivia-heading" tabindex="-1"></h2>' +
            '<div class="trivia-summary" id="trivia-summary"></div>' +
            '<div class="trivia-body" id="trivia-body"></div>' +
            '<div class="trivia-sources" id="trivia-sources" hidden></div>' +
            '<div class="trivia-tags" id="trivia-tags"></div>' +
            '<nav class="trivia-article-nav" id="trivia-article-nav" hidden>' +
            '<button type="button" class="next" id="trivia-nav-next"><span class="nav-dir"></span><span class="nav-title"></span></button>' +
            '<button type="button" class="prev" id="trivia-nav-prev"><span class="nav-dir"></span><span class="nav-title"></span></button>' +
            '<button type="button" class="to-index" id="trivia-nav-index"><span class="nav-dir"></span></button></nav>' +
            '<div class="trivia-index" id="trivia-index" hidden></div></div>';
        document.body.appendChild(backdrop);
        document.body.appendChild(modal);
        scroll = modal.querySelector('#trivia-scroll');

        modal.querySelector('#trivia-close').addEventListener('click', () => close());
        modal.querySelector('#trivia-back').addEventListener('click', () => showIndex());
        modal.querySelector('#trivia-nav-index').addEventListener('click', () => showIndex());
        modal.querySelector('#trivia-expand').addEventListener('click', () => setCompact(false));
        modal.querySelector('#trivia-nav-next').addEventListener('click', (e) => { const id = e.currentTarget.dataset.id; if (id) go(id); });
        modal.querySelector('#trivia-nav-prev').addEventListener('click', (e) => { const id = e.currentTarget.dataset.id; if (id) go(id); });
        modal.querySelector('#trivia-index').addEventListener('click', (e) => { const c = e.target.closest('.trivia-card'); if (c) go(c.dataset.articleId); });
        modal.querySelector('#trivia-body').addEventListener('click', onAction);
        backdrop.addEventListener('click', () => close());
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
            if (e.key !== 'Tab' || modal.classList.contains('compact')) return;
            const f = [...modal.querySelectorAll('button, a[href], [tabindex="0"]')].filter((x) => !x.disabled && x.getClientRects().length);
            if (!f.length) return;
            const first = f[0], last = f[f.length - 1];
            if (e.shiftKey && (document.activeElement === first || document.activeElement === modal)) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });

        if (window.__lmOverlay) {
            hist = window.__lmOverlay('trivia', {
                el: modal, attrs: ['class'],
                isOpen: () => modal.classList.contains('visible'),
                close: () => close(),
                open: () => { const id = hashParam(location.hash, 'trivia') || modal._lmLast; open(id && id !== 'index' ? id : undefined, { fromHash: true }); },
            });
        }
    }

    function placeButton() {
        const bar = document.querySelector('.site-header-bar');
        if (!bar || !btn) return;
        const narrow = window.matchMedia('(max-width: 640px)').matches;
        if (narrow) {
            const logo = bar.querySelector(':scope > .logo');
            if (btn.parentNode !== bar && logo) logo.after(btn);
        } else {
            const nav = bar.querySelector('.header-nav');
            if (nav && btn.previousElementSibling !== nav) nav.after(btn);
        }
        const lab = btn.querySelector('.trivia-btn-label');
        if (lab) lab.textContent = narrow ? t('short') : pick(cfg.label);
    }

    function applyLang() {
        if (!modal) return;
        const ui = L();
        modal.dir = isRTL(ui) ? 'rtl' : 'ltr';
        modal.lang = ui;
        modal.querySelector('#trivia-back').textContent = t('back');
        modal.querySelector('#trivia-close').setAttribute('aria-label', t('close'));
        const ex = modal.querySelector('#trivia-expand'); ex.title = t('expand'); ex.setAttribute('aria-label', t('expand'));
        modal.querySelector('#trivia-nav-next .nav-dir').textContent = t('next');
        modal.querySelector('#trivia-nav-prev .nav-dir').textContent = t('prev');
        modal.querySelector('#trivia-nav-index .nav-dir').textContent = t('back');
        modal.querySelector('#trivia-eyebrow').textContent = pick(cfg.label);
        if (btn) { btn.title = pick(cfg.label); placeButton(); }
        if (modal.classList.contains('visible')) {
            ensureLoaded().then(() => { if (view === 'article' && curId) renderArticle(curId); else if (view === 'index') renderIndex(); });
        }
    }

    function renderIndex() {
        const list = articles();
        view = 'index'; curId = null;
        modal.dataset.view = 'index'; modal.dataset.articleId = 'index';
        modal.querySelector('#trivia-heading').textContent = pick(cfg.label);
        modal.querySelector('#trivia-eyebrow').textContent = '';
        const sm = modal.querySelector('#trivia-summary'); sm.textContent = ''; sm.hidden = true;
        modal.querySelector('#trivia-body').innerHTML = '';
        modal.querySelector('#trivia-sources').hidden = true;
        modal.querySelector('#trivia-tags').innerHTML = '';
        modal.querySelector('#trivia-article-nav').hidden = true;
        const idx = modal.querySelector('#trivia-index');
        idx.hidden = false;
        idx.innerHTML = '<p class="trivia-index-intro">' + esc(t('intro')) + '</p>' + list.map((a, i) =>
            '<button type="button" class="trivia-card" data-article-id="' + esc(a.id) + '">' +
            '<div class="trivia-card-title"><span class="trivia-card-num">' + (i + 1) + '.</span>' +
            (a.icon ? '<span aria-hidden="true">' + esc(a.icon) + '</span> ' : '') + esc(pick(a.title)) + '</div>' +
            '<p class="trivia-card-summary">' + esc(pick(a.summary)) + '</p></button>').join('');
    }

    function renderArticle(id) {
        const list = articles(), i = list.findIndex((a) => a.id === id);
        if (i < 0) return renderIndex();
        const a = list[i];
        view = 'article'; curId = id; lastId = id;
        modal.dataset.view = 'article'; modal.dataset.articleId = id;
        modal.querySelector('#trivia-index').hidden = true;
        modal.querySelector('#trivia-eyebrow').textContent = pick(cfg.label);
        modal.querySelector('#trivia-heading').innerHTML = (a.icon ? '<span class="trivia-icon" aria-hidden="true">' + esc(a.icon) + '</span>' : '') + esc(pick(a.title));
        const sm = modal.querySelector('#trivia-summary'); sm.textContent = pick(a.summary); sm.hidden = false;
        modal.querySelector('#trivia-body').innerHTML = bodyOf(a);   // author-controlled HTML
        const src = modal.querySelector('#trivia-sources');
        if (a.sources && a.sources.length) {
            src.hidden = false;
            src.innerHTML = '<span class="trivia-sources-label">' + esc(t('sources')) + '</span><ul>' + a.sources.map((s) =>
                '<li>' + (s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.text) + '</a>' : esc(s.text)) + '</li>').join('') + '</ul>';
        } else src.hidden = true;
        const ui = L();
        modal.querySelector('#trivia-tags').innerHTML = (a.tags || []).map((g) => '<span class="trivia-tag">' + esc(g) + '</span>').join('') +
            (cfg.seo ? '<a class="trivia-seo-link" href="/' + esc(ui) + '/trivia/' + esc(id) + '">' + esc(t('page')) + ' ↗</a>' : '');
        const nav = modal.querySelector('#trivia-article-nav'); nav.hidden = false;
        const nx = list[i + 1], pv = list[i - 1];
        const nb = modal.querySelector('#trivia-nav-next'), pb = modal.querySelector('#trivia-nav-prev');
        nb.hidden = !nx; if (nx) { nb.dataset.id = nx.id; nb.querySelector('.nav-title').textContent = pick(nx.title); }
        pb.hidden = !pv; if (pv) { pb.dataset.id = pv.id; pb.querySelector('.nav-title').textContent = pick(pv.title); }
    }

    function setCompact(on) {
        modal.classList.toggle('compact', !!on);
        backdrop.classList.toggle('transparent', !!on);
        modal.setAttribute('aria-modal', on ? 'false' : 'true');
    }

    function onAction(e) {
        const b = e.target.closest('.trivia-action');
        if (!b) return;
        e.preventDefault();
        const act = b.dataset.action;
        if (act === 'article') { if (b.dataset.id) go(b.dataset.id); return; }
        const fn = cfg.actions && cfg.actions[act];
        if (typeof fn !== 'function') { console.warn('trivia: unknown action', act); return; }
        setCompact(true);
        try { fn(b); } catch (err) { console.warn('trivia action', act, err); }
    }

    function go(id) {
        const wasCompact = modal.classList.contains('compact');
        renderArticle(id);
        if (!wasCompact) setCompact(false);
        scroll.scrollTop = 0;
        const h = modal.querySelector('#trivia-heading'); if (h) h.focus({ preventScroll: true });
        if (cfg.onHash) cfg.onHash();
    }
    function showIndex() {
        renderIndex();
        setCompact(false);
        scroll.scrollTop = 0;
        const c = lastId && modal.querySelector('.trivia-card[data-article-id="' + CSS.escape(lastId) + '"]');
        if (c) c.focus({ preventScroll: true }); else modal.querySelector('#trivia-heading').focus({ preventScroll: true });
        if (cfg.onHash) cfg.onHash();
    }

    function open(id, opts) {
        const fromHash = !!(opts && opts.fromHash);
        const wasOpen = modal.classList.contains('visible');
        if (fromHash && wasOpen && (modal.dataset.articleId || 'index') === (id || 'index')) return;
        if (!wasOpen) opener = document.activeElement;
        pending = { id: id, fromHash: fromHash };
        ensureLoaded().then(() => {
            const want = pending; pending = null;
            if (!want) return;   // closed while loading
            if (!articles().length) return;
            const match = want.id && articles().some((a) => a.id === want.id);
            if (match) renderArticle(want.id); else renderIndex();
            setCompact(false);
            const already = modal.classList.contains('visible');
            backdrop.classList.add('visible'); backdrop.setAttribute('aria-hidden', 'false');
            modal.classList.add('visible');
            scroll.scrollTop = 0;
            setTimeout(() => modal.focus(), 0);
            if (!want.fromHash && !already && hist) hist.opened();
            // From a link or Back/Forward the helper sees the window open through
            // its class observer (a microtask): write trivia= after it has
            // pushed, or the entry under the article kept it and Back reopened it.
            if (cfg.onHash) { if (want.fromHash) setTimeout(cfg.onHash, 0); else cfg.onHash(); }
        });
    }

    function close() {
        pending = null;
        if (!modal.classList.contains('visible')) return;
        modal._lmLast = modal.dataset.articleId || '';
        modal.classList.remove('visible');
        setCompact(false);
        backdrop.classList.remove('visible'); backdrop.setAttribute('aria-hidden', 'true');
        delete modal.dataset.articleId;
        view = null; curId = null;
        const r = opener; opener = null;
        if (r && r.isConnected && r.getClientRects().length && r !== document.body) setTimeout(() => { try { r.focus(); } catch (_) {} }, 0);
        else if (btn) setTimeout(() => { try { btn.focus(); } catch (_) {} }, 0);
        // No hist.closed(): the helper watches the class and steps back over the entry.
        if (cfg.onHash) cfg.onHash();
        if (cfg.onClose) cfg.onClose();
    }

    function mount(c) {
        if (cfg) return;
        cfg = c;
        build();
        btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'trivia-btn'; btn.id = 'trivia-open';
        btn.setAttribute('aria-haspopup', 'dialog'); btn.setAttribute('aria-controls', 'trivia-modal');
        btn.innerHTML = '<span aria-hidden="true">📚</span><span class="trivia-btn-label"></span>';
        btn.addEventListener('click', () => open());
        placeButton();
        window.matchMedia('(max-width: 640px)').addEventListener('change', placeButton);
        applyLang();
        window.addEventListener('langmap:uichange', () => setTimeout(applyLang, 0));
        // A hand-edited hash (#trivia=<id>) opens that article.
        window.addEventListener('hashchange', () => {
            if (window.__lmPopSkip && window.__lmPopSkip()) return;   // the helper's own Back/Forward
            const id = hashParam(location.hash, 'trivia');
            if (id && !modal.classList.contains('visible')) open(id === 'index' ? undefined : id, { fromHash: true });
        });
        // A shared link: open once the page has drawn its map.
        const id0 = hashParam(cfg.initialHash != null ? cfg.initialHash : INITIAL_HASH, 'trivia');
        if (id0) setTimeout(() => open(id0 === 'index' ? undefined : id0, { fromHash: true }), 150);
    }

    window.LMTrivia = {
        mount: mount,
        open: (id) => open(id),
        close: () => close(),
        isOpen: () => !!(modal && modal.classList.contains('visible')),
        // The page's URL writer appends this while the window is open.
        hashPart: () => (modal && modal.classList.contains('visible') && modal.dataset.articleId) ? 'trivia=' + encodeURIComponent(modal.dataset.articleId) : '',
        // Mobile: a map action should land in the part of the map above the compact window.
        compactInset: () => (modal && modal.classList.contains('visible') && modal.classList.contains('compact')) ? modal.getBoundingClientRect() : null,
    };
})();
