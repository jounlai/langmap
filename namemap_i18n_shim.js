/* namemap_i18n_shim.js — loader for the per-UI NameMap content slices.
 *
 * namemap_content_i18n.js carries country names, language names, and every
 * name's meaning and background paragraph in all 19 UI languages at once —
 * 584 KB, 217 KB gzipped. A reader sees one of them, and English is the source
 * text already present in namemap_data.js, so there is no English slice.
 *
 * Each slice re-runs the same Object.assign merge, which is additive: pulling a
 * second one after a language switch adds its strings without disturbing the
 * first. Call window.__ensureNmI18n(ui) before repainting after a switch.
 *
 * Must load AFTER namemap_data.js / namemap_i18n.js / namemap_names_ext.js,
 * exactly where the whole file used to be.
 */
(function () {
    // The UI languages that have a slice. English is the source and has none.
    var UIS = ['ar','de','es','fr','he','hi','id','it','ko','pt','ru','sw','th','uk','vi','yue','zh'];

    var loaded = Object.create(null);
    var pending = Object.create(null);
    var version = 1;

    window.__nmI18nVersion = function (v) { version = v; };
    window.__nmI18nLoaded = function (ui) { loaded[ui] = true; };

    function pick() {
        try {
            var m = /(?:^|;\s*)wm_uilang=([^;]+)/.exec(document.cookie || '');
            if (m) {
                var c = decodeURIComponent(m[1]).toLowerCase();
                if (UIS.indexOf(c) !== -1) return c;
                if (UIS.indexOf(c.split('_')[0]) !== -1) return c.split('_')[0];
            }
        } catch (_) {}
        try {
            var langs = navigator.languages || [navigator.language || 'en'];
            for (var i = 0; i < langs.length; i++) {
                var l = String(langs[i]).replace('-', '_').toLowerCase();
                if (l.indexOf('zh') === 0 && (l.indexOf('hk') !== -1 || l.indexOf('tw') !== -1 || l.indexOf('hant') !== -1)) return 'yue';
                var b = l.split('_')[0];
                if (UIS.indexOf(b) !== -1) return b;
            }
        } catch (_) {}
        return 'en';
    }

    // Fetched during parse so the first paint is already localized. A wrong
    // guess costs one request: the page calls __ensureNmI18n() once it has read
    // the URL state and knows the real UI language.
    window.__nmI18nBoot = function () {
        var ui = pick();
        if (ui !== 'en') document.write('<script src="namemap_i18n/' + ui + '.js?v=' + version + '"><\/script>');
    };

    window.__ensureNmI18n = function (ui) {
        if (!ui || ui === 'en') return Promise.resolve();
        var base = String(ui).split('_')[0];
        if (UIS.indexOf(ui) === -1) ui = base;
        if (UIS.indexOf(ui) === -1 || loaded[ui]) return Promise.resolve();
        if (pending[ui]) return pending[ui];
        pending[ui] = new Promise(function (resolve) {
            var el = document.createElement('script');
            el.src = 'namemap_i18n/' + ui + '.js?v=' + version;
            el.async = false;
            el.onload = function () { resolve(); };
            el.onerror = function () { resolve(); };   // stay on English rather than hang
            document.head.appendChild(el);
        });
        return pending[ui];
    };
})();
