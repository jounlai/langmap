/**
 * nav-short.js — shorter header nav labels on wide screens.
 *
 * In the header bar the word "Map" is redundant: every link is a map, so
 * 単語マップ / 名前マップ / 暦マップ read as 単語 / 名前 / 暦. The hamburger
 * drawer (≤640px) keeps the full names.
 *
 * Each page sets its nav text itself (its own i18n tables, on load and on a
 * UI-language change), so this script never edits that text. It watches the
 * nav and copies a shortened form into data-short; CSS hides the full text
 * (font-size:0) and shows the short one through ::after. Icons are untouched.
 *
 * Only suffixes that are a bare "map" are dropped (ja マップ, ko 맵/지도,
 * zh 地图, yue 地圖). Languages where "Map" is part of the phrase
 * ("Carte des prénoms", "Name Map") keep their full label.
 */
(function () {
    'use strict';
    var RULES = [/\s*マップ$/, /\s*맵$/, /\s*지도$/, /地图$/, /地圖$/];
    function shortOf(text) {
        for (var i = 0; i < RULES.length; i++) {
            if (RULES[i].test(text)) { var s = text.replace(RULES[i], '').trim(); return s || null; }
        }
        return null;
    }
    function ownText(el) {
        var s = '';
        for (var i = 0; i < el.childNodes.length; i++) if (el.childNodes[i].nodeType === 3) s += el.childNodes[i].textContent;
        return s.trim();
    }
    function run() {
        var items = document.querySelectorAll('.site-header-bar .header-nav > a, .site-header-bar .header-nav > span:not(.nav-sep)');
        for (var i = 0; i < items.length; i++) {
            var el = items[i], s = shortOf(ownText(el));
            if (s) { if (el.getAttribute('data-short') !== s) el.setAttribute('data-short', s); }
            else if (el.hasAttribute('data-short')) el.removeAttribute('data-short');
        }
    }
    var css = '@media (min-width: 641px) {'
        + ' .site-header-bar .header-nav [data-short] { font-size: 0; }'
        + ' .site-header-bar .header-nav [data-short]::after { content: attr(data-short); font-size: 13px; }'
        + ' }';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    function start() {
        run();
        var navs = document.querySelectorAll('.site-header-bar .header-nav');
        // attributes:false, so setting data-short does not re-trigger the observer
        var mo = new MutationObserver(run);
        for (var i = 0; i < navs.length; i++) mo.observe(navs[i], { childList: true, characterData: true, subtree: true });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
