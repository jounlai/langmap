/* ============================================================================
 * share-button.js — a single icon-only "Share" control for all four pages
 * (Word Order / Word Map / Han Map / Tree).
 *
 * Inserts a small share icon into the header (left of the language picker).
 * On click it delegates to a page's rich share when one is exposed
 * (window.__langmap.share, e.g. Word Map's word-specific text), otherwise it
 * falls back to the Web Share API or a compact copy-link / X / Facebook / LINE
 * popover built around the current URL. No button chrome — just the icon.
 * ========================================================================== */
(function () {
    'use strict';

    var SHARE  = { en:'Share', ja:'共有', ko:'공유', zh:'分享', yue:'分享', vi:'Chia sẻ', th:'แชร์', id:'Bagikan', hi:'साझा करें', de:'Teilen', fr:'Partager', it:'Condividi', es:'Compartir', pt:'Partilhar', ru:'Поделиться', uk:'Поділитися', ar:'مشاركة', he:'שיתוף', sw:'Shiriki' };
    var COPY   = { en:'Copy link', ja:'リンクをコピー', ko:'링크 복사', zh:'复制链接', yue:'複製連結', vi:'Sao chép liên kết', th:'คัดลอกลิงก์', id:'Salin tautan', hi:'लिंक कॉपी करें', de:'Link kopieren', fr:'Copier le lien', it:'Copia link', es:'Copiar enlace', pt:'Copiar ligação', ru:'Скопировать ссылку', uk:'Скопіювати посилання', ar:'نسخ الرابط', he:'העתקת קישור', sw:'Nakili kiungo' };
    var COPIED = { en:'Link copied!', ja:'リンクをコピーしました', ko:'링크를 복사했습니다', zh:'已复制链接', yue:'已複製連結', vi:'Đã sao chép liên kết', th:'คัดลอกลิงก์แล้ว', id:'Tautan disalin', hi:'लिंक कॉपी हो गया', de:'Link kopiert', fr:'Lien copié', it:'Link copiato', es:'Enlace copiado', pt:'Ligação copiada', ru:'Ссылка скопирована', uk:'Посилання скопійовано', ar:'تم نسخ الرابط', he:'הקישור הועתק', sw:'Kiungo kimenakiliwa' };
    var CLOSE  = { en:'Close', ja:'閉じる', ko:'닫기', zh:'关闭', yue:'閂', vi:'Đóng', th:'ปิด', id:'Tutup', hi:'बंद करें', de:'Schließen', fr:'Fermer', it:'Chiudi', es:'Cerrar', pt:'Fechar', ru:'Закрыть', uk:'Закрити', ar:'إغلاق', he:'סגירה', sw:'Funga' };

    var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';

    function ui() {
        var g = (window.__langmap && window.__langmap.uiLang);
        if (g) return g;
        var sel = document.getElementById('header-ui-lang');
        return (sel && sel.value) || 'en';
    }
    function L(m) { var u = ui(); return m[u] || m[String(u).split('_')[0]] || m.en; }

    function toast(msg) {
        var t = document.createElement('div');
        t.textContent = msg;
        t.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:100003;background:#222;color:#fff;padding:9px 16px;border-radius:999px;font-size:13px;box-shadow:0 4px 16px rgba(0,0,0,.25)';
        document.body.appendChild(t);
        setTimeout(function () { t.remove(); }, 1800);
    }

    function popover(url) {
        var enc = encodeURIComponent;
        var title = document.title || 'LangMap';
        var targets = [
            { label: 'X', color: '#000', href: 'https://twitter.com/intent/tweet?text=' + enc(title) + '&url=' + enc(url) },
            { label: 'Facebook', color: '#1877f2', href: 'https://www.facebook.com/sharer/sharer.php?u=' + enc(url) },
            { label: 'LINE', color: '#06c755', href: 'https://social-plugins.line.me/lineit/share?url=' + enc(url) + '&text=' + enc(title) }
        ];
        var back = document.createElement('div');
        back.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100001;display:flex;align-items:center;justify-content:center;padding:20px;font-family:inherit';
        var box = document.createElement('div');
        box.style.cssText = 'background:#fff;border-radius:14px;padding:20px;max-width:340px;width:100%;box-shadow:0 12px 40px rgba(0,0,0,.3)';
        box.innerHTML = '<div style="font-weight:700;font-size:15px;margin-bottom:14px">' + L(SHARE) + '</div>';
        var grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px';
        targets.forEach(function (t) {
            var a = document.createElement('a');
            a.href = t.href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = t.label;
            a.style.cssText = 'display:block;text-align:center;padding:11px 6px;border-radius:9px;background:' + t.color + ';color:#fff;text-decoration:none;font-size:13px;font-weight:600';
            a.addEventListener('click', function () { setTimeout(function () { back.remove(); }, 50); });
            grid.appendChild(a);
        });
        box.appendChild(grid);
        var copy = document.createElement('button');
        copy.type = 'button';
        copy.textContent = L(COPY);
        copy.style.cssText = 'margin-top:8px;width:100%;padding:11px;border:1px solid #d0d3dc;border-radius:9px;background:#f6f7f9;cursor:pointer;font-size:14px;font-weight:600;color:#333';
        copy.addEventListener('click', function () {
            (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject())
                .then(function () { toast(L(COPIED)); back.remove(); })
                .catch(function () { window.prompt(L(COPY), url); });
        });
        box.appendChild(copy);
        var close = document.createElement('button');
        close.type = 'button';
        close.textContent = L(CLOSE);
        close.style.cssText = 'margin-top:10px;width:100%;padding:8px;border:0;background:none;cursor:pointer;font-size:13px;color:#888';
        close.addEventListener('click', function () { back.remove(); });
        box.appendChild(close);
        back.appendChild(box);
        back.addEventListener('click', function (e) { if (e.target === back) back.remove(); });
        document.body.appendChild(back);
    }

    function onClick() {
        // Prefer a page's own rich share (e.g. Word Map's word-specific text).
        if (window.__langmap && typeof window.__langmap.share === 'function') {
            try { window.__langmap.share(); return; } catch (_) {}
        }
        var url = location.href;
        if (navigator.share) { navigator.share({ title: document.title, url: url }).catch(function () {}); return; }
        popover(url);
    }

    function build() {
        var header = document.querySelector('.site-header-bar');
        if (!header) return false;
        if (header.querySelector('.share-icon-btn')) return true;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'share-icon-btn';
        btn.setAttribute('aria-label', L(SHARE));
        btn.title = L(SHARE);
        btn.innerHTML = ICON;
        btn.addEventListener('click', onClick);
        // Place just left of the language picker (falls back to the URL link).
        var anchor = header.querySelector('.lang-picker') || header.querySelector('.header-url');
        if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(btn, anchor);
        else header.appendChild(btn);
        function relabel() { btn.title = L(SHARE); btn.setAttribute('aria-label', L(SHARE)); }
        window.addEventListener('langmap:uichange', relabel);
        var sel = document.getElementById('header-ui-lang');
        if (sel) sel.addEventListener('change', function () { setTimeout(relabel, 0); });
        return true;
    }

    function start() {
        var tries = 0;
        (function wait() {
            if (build()) return;
            if (tries++ < 100) setTimeout(wait, 100);
        })();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
