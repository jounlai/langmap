/* lang_names_shim.js — receiver for the per-UI-language name tables.
 *
 * lang_names.js carries translated language names for 1,154 codes in 19 UI
 * languages (~215 KB gzipped). A reader looks at one of them, plus English as
 * the fallback. All four pages therefore load this shim and only the two files
 * they need — about 12 KB gzipped instead of 215. tools/build_lang_names.js
 * generates lang_names/<ui>.js from lang_names.js.
 *
 * Everything that reads names does so lazily (`LANG_NAMES[ui][code]`), so a UI
 * language that has not arrived yet simply falls through to English. Call
 * window.__ensureLangNames(ui) before re-rendering after a UI-language change.
 */
(function () {
    var LN = window.LANG_NAMES = window.LANG_NAMES || {};

    // Merge rather than assign. hanmap.html writes its own ko_mid overrides
    // into LANG_NAMES[ui] right after load, and __ensureLangNames() can bring a
    // slice in afterwards; assigning would silently wipe the page's entries.
    // Whatever is already there wins, because it was set deliberately.
    window.__langNamesAdd = function (ui, table) {
        var cur = LN[ui];
        if (!cur) { LN[ui] = table; return; }
        for (var k in table) if (!(k in cur)) cur[k] = table[k];
    };

    var pending = Object.create(null);
    var version = 1;
    window.__langNamesVersion = function (v) { version = v; };

    // The UI languages that have a lang_names/<ui>.js slice.
    var UIS = ['ja','en','ko','zh','fr','de','es','ru','ar','he','sw','yue',
               'vi','th','id','hi','it','pt','uk'];

    // Guess the visitor's UI language the way the apps do — cookie first, then
    // navigator — and pull that slice during parse, so the first paint is
    // already translated. A wrong guess costs one request, not a bug: every
    // reader falls through to English, and the app calls __ensureLangNames()
    // once it has decided for real.
    //
    // This lives here rather than inline in each page because it used to be
    // copy-pasted into wordmap.html with the ?v= hardcoded, and it drifted:
    // the page asked for lang_names/en.js?v=151 and lang_names/<ui>.js?v=143,
    // so every non-English reader was served a stale cached slice.
    window.__langNamesBoot = function () {
        var ui = 'en';
        try {
            var m = /(?:^|;\s*)wm_uilang=([^;]+)/.exec(document.cookie || '');
            if (m) {
                var c = decodeURIComponent(m[1]).toLowerCase();
                if (UIS.indexOf(c) !== -1) ui = c;
                else if (UIS.indexOf(c.split('_')[0]) !== -1) ui = c.split('_')[0];
            }
        } catch (_) {}
        if (ui === 'en') {
            try {
                var langs = navigator.languages || [navigator.language || 'en'];
                for (var i = 0; i < langs.length; i++) {
                    var l = String(langs[i]).replace('-', '_').toLowerCase();
                    if (l.indexOf('zh') === 0 && (l.indexOf('hk') !== -1 || l.indexOf('tw') !== -1 || l.indexOf('hant') !== -1)) { ui = 'yue'; break; }
                    var b = l.split('_')[0];
                    if (UIS.indexOf(b) !== -1) { ui = b; break; }
                }
            } catch (_) {}
        }
        if (ui !== 'en') document.write('<script src="lang_names/' + ui + '.js?v=' + version + '"><\/script>');
    };

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
