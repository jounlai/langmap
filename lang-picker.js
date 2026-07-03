/* ============================================================================
 * lang-picker.js — unified UI-language selector shared by all four pages
 * (Word Order / Word Map / Han Map / Tree).
 *
 * Each page already has a <select id="header-ui-lang"> that it populates with
 * the 19 UI languages (native names) and wires to switch the interface on
 * 'change'. This script fronts that select with a compact custom control in
 * the header — a globe + the current language CODE (JA, KO, EN…) — that opens
 * a dropdown listing "CODE  NativeName" (e.g. "JA  日本語", "KO  한국어").
 * Selecting an item drives the underlying select (value + change event), so
 * every page's existing switch logic is reused unchanged.
 * ========================================================================== */
(function () {
    'use strict';

    var GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
    var CARET = '<svg class="lang-picker-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

    function build() {
        var sel = document.getElementById('header-ui-lang');
        if (!sel) return false;
        if (sel.dataset.pickerBuilt) return true;
        if (!sel.options || !sel.options.length) return false; // wait until populated
        sel.dataset.pickerBuilt = '1';
        sel.classList.add('lang-picker-native');

        var wrap = document.createElement('div');
        wrap.className = 'lang-picker';

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lang-picker-btn';
        btn.setAttribute('aria-haspopup', 'listbox');
        btn.setAttribute('aria-expanded', 'false');
        var aria = sel.getAttribute('aria-label');
        if (aria) btn.setAttribute('aria-label', aria);
        var code = document.createElement('span');
        code.className = 'lang-picker-code';
        btn.innerHTML = GLOBE;
        btn.appendChild(code);
        btn.insertAdjacentHTML('beforeend', CARET);

        var menu = document.createElement('div');
        menu.className = 'lang-picker-menu';
        menu.setAttribute('role', 'listbox');

        Array.prototype.forEach.call(sel.options, function (o) {
            var it = document.createElement('button');
            it.type = 'button';
            it.className = 'lang-picker-item';
            it.setAttribute('role', 'option');
            it.dataset.value = o.value;
            var c = document.createElement('span');
            c.className = 'lang-picker-item-code';
            c.textContent = o.value.toUpperCase();
            var n = document.createElement('span');
            n.className = 'lang-picker-item-name';
            n.textContent = o.textContent;
            it.appendChild(c);
            it.appendChild(n);
            it.addEventListener('click', function () {
                if (sel.value !== o.value) {
                    sel.value = o.value;
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                }
                sync();
                close();
            });
            menu.appendChild(it);
        });

        wrap.appendChild(btn);
        wrap.appendChild(menu);

        // Place the picker immediately to the LEFT of the langmap.heuron.com link.
        var url = document.querySelector('.site-header-bar .header-url');
        if (url && url.parentNode) {
            url.parentNode.insertBefore(wrap, url);
        } else if (sel.parentNode) {
            sel.parentNode.insertBefore(wrap, sel);
        }

        function sync() {
            code.textContent = (sel.value || 'en').toUpperCase();
            Array.prototype.forEach.call(menu.children, function (it) {
                it.setAttribute('aria-selected', it.dataset.value === sel.value ? 'true' : 'false');
            });
        }
        function open() { menu.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); sync(); }
        function close() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (menu.classList.contains('open')) close(); else open();
        });
        document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
        // Keep the shown code in step with programmatic / external language changes.
        sel.addEventListener('change', sync);
        window.addEventListener('langmap:uichange', sync);

        sync();
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
