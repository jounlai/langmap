/* map_boot.js — the order things arrive in on a slow connection.
 *
 * Every map page used to ask for its fonts, its country borders and its
 * articles at once, and they shared the line. On slow 4G the Word Map's first
 * labels waited behind 254 KB of Google font CSS, and the country tints arrived
 * after 15 s (24 s on the Han Map).
 *
 * Now the map comes first. Fonts and articles wait until the borders have been
 * drawn, or until LATE_AFTER_MS, whichever is sooner. Until then text uses the
 * reader's system fonts. On a fast line that wait is a fraction of a second.
 *
 *   <style media="print" data-late-fonts>   @font-face rules, off until release
 *   <noscript data-late-fonts>              Google font link, added at release
 *   whenMapReady(fn)                        run fn at release
 *   loadCountries()                         the borders as GeoJSON, fetched once
 */
(function () {
    'use strict';
    var COUNTRIES_URL = 'countries_lite.js?v=379b76243f';   // written by tools/build_countries_lite.js
    var LATE_AFTER_MS = 15000;
    var released = false, waiting = [], countries = null;

    function release() {
        if (released) return;
        released = true;
        var styles = document.querySelectorAll('style[data-late-fonts]');
        for (var i = 0; i < styles.length; i++) styles[i].media = 'all';
        var links = document.querySelectorAll('noscript[data-late-fonts]');
        for (var j = 0; j < links.length; j++) {
            var m = /href="([^"]+)"/.exec(links[j].textContent);
            if (!m) continue;
            var l = document.createElement('link');
            l.rel = 'stylesheet';
            l.href = m[1].replace(/&amp;/g, '&');
            document.head.appendChild(l);
        }
        var fns = waiting.splice(0);
        for (var k = 0; k < fns.length; k++) { try { fns[k](); } catch (_) {} }
    }

    function decodeRing(d) {
        var out = [], x = 0, y = 0;
        for (var i = 0; i < d.length; i += 2) {
            x += d[i]; y += d[i + 1];
            out.push([x / 100, y / 100]);
        }
        return out;
    }
    function decode(rows) {
        return {
            type: 'FeatureCollection',
            features: rows.map(function (r) {
                return {
                    type: 'Feature',
                    properties: { name: r[0] },
                    geometry: {
                        type: 'MultiPolygon',
                        coordinates: r[1].map(function (p) { return p.map(decodeRing); })
                    }
                };
            })
        };
    }

    window.loadCountries = function () {
        if (countries) return countries;
        countries = fetch(COUNTRIES_URL).then(function (r) { return r.json(); }).then(decode);
        // The tick lets the caller's own .then() draw the layer first.
        var done = function () { setTimeout(release, 0); };
        countries.then(done, done);
        return countries;
    };
    window.whenMapReady = function (fn) { if (released) fn(); else waiting.push(fn); };
    setTimeout(release, LATE_AFTER_MS);
})();
