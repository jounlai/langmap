/* lang_names_shim.js — receiver for the per-UI-language name tables.
 *
 * lang_names.js carries translated language names for 1,154 codes in 19 UI
 * languages (~200 KB gzipped). A reader looks at one of them, plus English as
 * the fallback. wordmap.html therefore loads this shim and only the two files
 * it needs; tools/build_lang_names.js generates lang_names/<ui>.js from
 * lang_names.js, and index.html / tree.html / hanmap.html still load the whole
 * table as before.
 *
 * Everything that reads names does so lazily (`LANG_NAMES[ui][code]`), so a UI
 * language that has not arrived yet simply falls through to English. Call
 * window.__ensureLangNames(ui) before re-rendering after a UI-language change.
 */
(function () {
    var LN = window.LANG_NAMES = window.LANG_NAMES || {};

    window.__langNamesAdd = function (ui, table) { LN[ui] = table; };

    var pending = Object.create(null);
    var version = 1;
    window.__langNamesVersion = function (v) { version = v; };

    window.__ensureLangNames = function (ui) {
        if (!ui) return Promise.resolve();
        // A regional code like es_mx falls back to its base table.
        var base = String(ui).split('_')[0];
        var want = LN[ui] ? null : ui;
        if (!want) return Promise.resolve();
        if (pending[ui]) return pending[ui];
        pending[ui] = new Promise(function (resolve) {
            var el = document.createElement('script');
            el.src = 'lang_names/' + ui + '.js?v=' + version;
            el.async = false;
            el.onload = function () { resolve(); };
            el.onerror = function () {
                // Unknown UI code (or a 404): fall back to the base language,
                // then to English, rather than leaving callers hanging.
                if (base !== ui && !LN[base]) { window.__ensureLangNames(base).then(resolve); return; }
                resolve();
            };
            document.head.appendChild(el);
        });
        return pending[ui];
    };
})();
