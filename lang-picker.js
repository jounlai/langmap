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
    // "Language:" label shown only in the mobile drawer, left of the picker.
    var LABELS = { en:'Language:', ja:'言語選択:', ko:'언어 선택:', zh:'语言选择:', yue:'語言選擇:', vi:'Ngôn ngữ:', th:'เลือกภาษา:', id:'Pilih bahasa:', hi:'भाषा चुनें:', de:'Sprache:', fr:'Langue :', it:'Lingua:', es:'Idioma:', pt:'Idioma:', ru:'Язык:', uk:'Мова:', ar:'اللغة:', he:'שפה:', sw:'Lugha:' };
    function labelFor(v) { v = v || 'en'; return LABELS[v] || LABELS[v.split('_')[0]] || LABELS.en; }

    // The UI-language label in every UI language (as tree.html's uilLbl).
    var UIL = {ja:'UI 言語',ko:'UI 언어',zh:'界面语言',yue:'介面語言',vi:'Ngôn ngữ giao diện',th:'ภาษาส่วนติดต่อ',id:'Bahasa antarmuka',hi:'UI भाषा',en:'UI language',de:'UI-Sprache',fr:'Langue de l\'interface',it:'Lingua dell\'interfaccia',es:'Idioma de interfaz',pt:'Idioma da interface',ru:'Язык интерфейса',uk:'Мова інтерфейсу',ar:'لغة الواجهة',he:'שפת ממשק',sw:'Lugha ya kiolesura'};
    UIL['zh-hk'] = UIL['zh-mo'] = UIL.yue;
    function build() {
        var sel = document.getElementById('header-ui-lang');
        if (!sel) return false;
        if (sel.dataset.pickerBuilt) return true;
        if (!sel.options || !sel.options.length) return false; // wait until populated
        sel.dataset.pickerBuilt = '1';
        sel.classList.add('lang-picker-native');

        var wrap = document.createElement('div');
        wrap.className = 'lang-picker';

        var label = document.createElement('span');
        label.className = 'lang-picker-label';
        wrap.appendChild(label);

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
            it.tabIndex = -1;   // one Tab stop: arrows move inside the list
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

        // Place the picker immediately to the LEFT of the langmaps.com link.
        var url = document.querySelector('.site-header-bar .header-url');
        if (url && url.parentNode) {
            url.parentNode.insertBefore(wrap, url);
        } else if (sel.parentNode) {
            sel.parentNode.insertBefore(wrap, sel);
        }

        function sync() {
            // The page relabels the select on a language change; follow it.
            // Name = the page's label plus the visible code ("UI language (RU)"),
            // so speech input matches what is shown; the listbox shares the label.
            var a = sel.getAttribute('aria-label') || 'UI language';
            // Name Map / Time Map never translate the select's label: fall back
            // to the page language's word for it.
            if (a === 'UI language') { var hl = String(document.documentElement.lang || 'en').toLowerCase(); a = UIL[hl] || UIL[hl.split('-')[0]] || a; }
            var cv = (sel.value || 'en').toUpperCase();
            // Visible code first (WCAG 2.5.3 label in name; no parentheses, which
            // axe strips when matching).
            btn.setAttribute('aria-label', cv + ', ' + a);
            menu.setAttribute('aria-label', a);
            code.textContent = cv;
            label.textContent = labelFor(sel.value);
            Array.prototype.forEach.call(menu.children, function (it) {
                it.setAttribute('aria-selected', it.dataset.value === sel.value ? 'true' : 'false');
            });
        }
        function open() {
            menu.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); sync();
            var cur = menu.querySelector('[aria-selected="true"]') || menu.firstElementChild;
            if (cur) try { cur.focus({ preventScroll: true }); cur.scrollIntoView({ block: 'nearest' }); } catch (_) {}
        }
        // Listbox keyboard model: arrows, Home/End, typeahead, Enter/Space, Tab closes.
        wrap.addEventListener('keydown', function (e) {
            if (!menu.classList.contains('open')) {
                if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && e.target === btn) { e.preventDefault(); open(); }
                return;
            }
            var items = [].slice.call(menu.children), i = items.indexOf(document.activeElement);
            var go = function (k) { var t = items[(k + items.length) % items.length]; if (t) { t.focus({ preventScroll: true }); t.scrollIntoView({ block: 'nearest' }); } };
            if (e.key === 'ArrowDown') { e.preventDefault(); go(i + 1); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); go(i < 0 ? items.length - 1 : i - 1); }
            else if (e.key === 'Home') { e.preventDefault(); go(0); }
            else if (e.key === 'End') { e.preventDefault(); go(items.length - 1); }
            else if (e.key === 'Tab') { close(); }
            else if ((e.key === 'Enter' || e.key === ' ') && i >= 0) { e.preventDefault(); items[i].click(); btn.focus(); }
            else if (e.key.length === 1 && /\S/.test(e.key)) {
                var ch = e.key.toLowerCase();
                for (var k = 1; k <= items.length; k++) {
                    var t = items[(Math.max(i, 0) + k) % items.length];
                    if ((t.dataset.value || '').toLowerCase().indexOf(ch) === 0 || (t.textContent || '').trim().toLowerCase().indexOf(ch) === 0) { e.preventDefault(); go(items.indexOf(t)); break; }
                }
            }
        });
        function close() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (menu.classList.contains('open')) close(); else open();
        });
        document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
        // Capture phase, and the key stops here: one Escape closes the menu,
        // not also the panel underneath it.
        // Focus leaving the picker closes it (it stayed open behind other controls).
        wrap.addEventListener('focusout', function (e) {
            if (menu.classList.contains('open') && e.relatedTarget && !wrap.contains(e.relatedTarget)) close();
        });
        window.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape' || !menu.classList.contains('open')) return;
            // Claim the key only when the picker has focus; otherwise it belongs to
            // the focused control (a search box clearing its results).
            var inPicker = wrap.contains(document.activeElement) || document.activeElement === document.body;
            if (!inPicker) { close(); return; }
            e.preventDefault(); e.stopImmediatePropagation();
            // Focus was on an item that is about to be hidden: back to the button.
            var had = menu.contains(document.activeElement) || document.activeElement === document.body;
            close();
            if (had) btn.focus();
        }, true);
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
