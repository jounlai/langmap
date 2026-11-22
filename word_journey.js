/**
 * word_journey.js — "the journey of a word": plays a route word's borrowing chain
 * as arrows on the flat Word Map.
 *
 * Data: WORDS[id].journey[route] = { steps: [[[from, to], …], …], sources: [{title, url}] }
 * (see words/coffee.js; validated by tools/word_journey_check.js). Every label shows
 * the map's own cell for that language — the journey adds arrows, never forms.
 *
 * Host hooks come from wordmap.html as window.__langmap.journeyHost:
 *   map()        the Leaflet map           is3D()   true on the globe (no journey there)
 *   langs()      LANG_DATA (a const, so not on window)
 *   word()       the current word id       blink(r) blink every label on route r
 *   nameOf(c)    localized language name   count(r) languages on route r in the current era
 * The legend's ▶ button calls window.__wmJourney.play(route); the page calls
 * window.__wmJourney.sync() on every legend redraw (stops after a word change) and
 * window.__wmJourney.stop() when the globe is switched on.
 */
(function () {
    'use strict';
    const STR = {
        play:    { en: 'Watch the journey', ja: '旅路を再生', ko: '여정 재생', zh: '播放传播路线', yue: '播放傳播路線', vi: 'Xem hành trình', th: 'ดูเส้นทาง', id: 'Lihat perjalanannya', hi: 'सफ़र देखें', de: 'Reise abspielen', fr: 'Voir le voyage', it: 'Guarda il viaggio', es: 'Ver el viaje', pt: 'Ver a viagem', ru: 'Показать путь', uk: 'Показати шлях', ar: 'شاهد الرحلة', he: 'צפו במסע', sw: 'Tazama safari' },
        replay:  { en: 'Replay', ja: 'もう一度', ko: '다시 보기', zh: '重播', yue: '重播', vi: 'Xem lại', th: 'เล่นอีกครั้ง', id: 'Ulangi', hi: 'फिर से देखें', de: 'Nochmal', fr: 'Revoir', it: 'Rivedi', es: 'Repetir', pt: 'Repetir', ru: 'Повторить', uk: 'Повторити', ar: 'إعادة', he: 'שוב', sw: 'Rudia' },
        close:   { en: 'Close', ja: '閉じる', ko: '닫기', zh: '关闭', yue: '閂', vi: 'Đóng', th: 'ปิด', id: 'Tutup', hi: 'बंद करें', de: 'Schließen', fr: 'Fermer', it: 'Chiudi', es: 'Cerrar', pt: 'Fechar', ru: 'Закрыть', uk: 'Закрити', ar: 'إغلاق', he: 'סגירה', sw: 'Funga' },
        sources: { en: 'Sources', ja: '出典', ko: '출처', zh: '出处', yue: '出處', vi: 'Nguồn', th: 'แหล่งอ้างอิง', id: 'Sumber', hi: 'स्रोत', de: 'Quellen', fr: 'Sources', it: 'Fonti', es: 'Fuentes', pt: 'Fontes', ru: 'Источники', uk: 'Джерела', ar: 'المصادر', he: 'מקורות', sw: 'Vyanzo' },
        note:    { en: 'Each arrow is a borrowing as the sources give it; the words are the map’s own entries.', ja: '矢印は出典に書かれた借用の向き。語形は地図のデータそのもの。', ko: '화살표는 출처에 적힌 차용 방향입니다. 낱말은 지도의 데이터 그대로입니다.', zh: '箭头表示出处所载的借用方向；词形取自地图本身的数据。', yue: '箭咀係出處記載嘅借用方向；詞形取自地圖本身嘅數據。', vi: 'Mỗi mũi tên là một lần vay mượn theo các nguồn; từ ngữ lấy từ dữ liệu của bản đồ.', th: 'ลูกศรแต่ละเส้นคือการยืมคำตามแหล่งอ้างอิง คำที่แสดงมาจากข้อมูลของแผนที่เอง', id: 'Tiap panah adalah peminjaman menurut sumber; kata-katanya diambil dari data peta ini.', hi: 'हर तीर स्रोतों में दिया गया एक उधार है; शब्द इसी मानचित्र के आँकड़ों से हैं।', de: 'Jeder Pfeil ist eine Entlehnung laut den Quellen; die Wörter sind die Einträge der Karte.', fr: 'Chaque flèche est un emprunt tel que le donnent les sources ; les mots sont ceux de la carte.', it: 'Ogni freccia è un prestito come lo riportano le fonti; le parole sono quelle della mappa.', es: 'Cada flecha es un préstamo según las fuentes; las palabras son las del propio mapa.', pt: 'Cada seta é um empréstimo segundo as fontes; as palavras são as do próprio mapa.', ru: 'Каждая стрелка — заимствование по источникам; слова взяты из данных карты.', uk: 'Кожна стрілка — запозичення за джерелами; слова взято з даних мапи.', ar: 'كل سهم اقتراضٌ كما تذكره المصادر، والكلمات من بيانات الخريطة نفسها.', he: 'כל חץ הוא שאילה כפי שהיא מופיעה במקורות; המילים הן הערכים של המפה עצמה.', sw: 'Kila mshale ni ukopaji kama ulivyoelezwa na vyanzo; maneno ni ya data ya ramani yenyewe.' },
        total:   { en: 'Languages on the map with a word from this route: {n}', ja: 'この経路の語を持つ言語：地図上に {n}', ko: '이 경로의 낱말을 쓰는 언어: 지도에 {n}개', zh: '地图上使用这条路线词语的语言：{n} 种', yue: '地圖上用呢條路線詞語嘅語言：{n} 種', vi: 'Số ngôn ngữ trên bản đồ có từ thuộc tuyến này: {n}', th: 'ภาษาบนแผนที่ที่ใช้คำจากเส้นทางนี้: {n}', id: 'Bahasa di peta dengan kata dari jalur ini: {n}', hi: 'मानचित्र पर इस मार्ग का शब्द रखने वाली भाषाएँ: {n}', de: 'Sprachen auf der Karte mit einem Wort dieses Wegs: {n}', fr: 'Langues de la carte ayant un mot de cette route : {n}', it: 'Lingue sulla mappa con una parola di questa via: {n}', es: 'Idiomas del mapa con una palabra de esta ruta: {n}', pt: 'Línguas no mapa com uma palavra desta rota: {n}', ru: 'Языков на карте со словом этого пути: {n}', uk: 'Мов на мапі зі словом цього шляху: {n}', ar: 'اللغات على الخريطة التي تستعمل كلمة من هذا الطريق: {n}', he: 'שפות במפה עם מילה מהדרך הזאת: {n}', sw: 'Lugha kwenye ramani zenye neno la njia hii: {n}' },
    };
    const ui = () => (window.__langmap && window.__langmap.uiLang) || 'en';
    const pk = (m) => m[ui()] || m[ui().split('_')[0]] || m.en;
    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const host = () => (window.__langmap && window.__langmap.journeyHost) || null;
    const reduced = () => { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) { return false; } };

    const STEP_MS = 1500, DRAW_MS = 900;
    let layer = null, panel = null, timers = [], playing = null, lastFocus = null;

    function formOf(w, code) {
        const e = w.data && w.data[code];
        return Array.isArray(e) ? e[0] : (e && e.form) || '';
    }
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

    function stop() {
        timers.forEach(clearTimeout); timers = [];
        const h = host(), map = h && h.map();
        if (layer && map) map.removeLayer(layer);
        layer = null;
        if (panel) { panel.remove(); panel = null; }
        document.body.classList.remove('wm-journey-on', 'wm-journey-dim');
        if (playing && lastFocus && document.contains(lastFocus)) { try { lastFocus.focus(); } catch (_) {} }
        playing = null; lastFocus = null;
    }

    // Longitudes unwrapped the way fitCodes does, so a chain across the Pacific
    // draws the short way.
    function points(codes) {
        const LD = host().langs() || {};
        const lngs = codes.map((c) => LD[c].lng);
        const ul = (window.__langmap && window.__langmap.unwrapLngs) ? window.__langmap.unwrapLngs(lngs) : lngs;
        const out = {};
        codes.forEach((c, i) => { out[c] = [LD[c].lat, ul[i]]; });
        return out;
    }
    // A gentle arc: quadratic Bézier with the control point pushed sideways by a
    // fifth of the chord, sampled in lat/lng.
    function arc(a, b) {
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
        const dx = b[0] - a[0], dy = b[1] - a[1];
        const cx = mx - dy * 0.2, cy = my + dx * 0.2;
        const pts = [];
        for (let i = 0; i <= 24; i++) {
            const t = i / 24, u = 1 - t;
            pts.push([u * u * a[0] + 2 * u * t * cx + t * t * b[0], u * u * a[1] + 2 * u * t * cy + t * t * b[1]]);
        }
        return pts;
    }

    function tag(map, code, ll, color, origin) {
        const h = host(), w = window.WORDS[h.word()];
        const html = `<span class="wm-jdot" style="background:${esc(color)}"></span>`
            + `<span class="wm-jtag-box${origin ? ' origin' : ''}"><b dir="auto">${esc(formOf(w, code))}</b>`
            + `<span class="wm-jtag-name">${esc(h.nameOf(code))}</span></span>`;
        L.marker(ll, {
            pane: 'wmJourneyTags', interactive: false, keyboard: false,
            icon: L.divIcon({ className: 'wm-jtag', html, iconSize: null }),
        }).addTo(layer);
    }

    function line(map, a, b, color, animate) {
        const pts = arc(a, b);
        const pl = L.polyline(pts, { pane: 'wmJourney', color, weight: 3, opacity: 0.9, interactive: false, className: 'wm-jline' }).addTo(layer);
        // Arrowhead: the screen angle of the last segment. Mercator is conformal,
        // so the angle survives zoom and pan and needs no redraw.
        const p1 = map.latLngToLayerPoint(pts[pts.length - 3]), p2 = map.latLngToLayerPoint(pts[pts.length - 1]);
        const deg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
        const head = L.marker(b, {
            pane: 'wmJourney', interactive: false, keyboard: false,
            icon: L.divIcon({ className: 'wm-jhead', iconSize: [14, 14], iconAnchor: [7, 7],
                html: `<svg viewBox="0 0 14 14" width="14" height="14" style="transform:rotate(${deg}deg)"><path d="M2 2 L13 7 L2 12 Z" fill="${esc(color)}"/></svg>` }),
        });
        const path = pl.getElement && pl.getElement();
        if (animate && path && path.getTotalLength) {
            const len = path.getTotalLength();
            path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
            void path.getBoundingClientRect();
            path.style.transition = `stroke-dashoffset ${DRAW_MS}ms ease-in-out`;
            path.style.strokeDashoffset = '0';
            // Leaflet re-renders the path on zoom; drop the dash so it is never
            // left half-drawn at the new scale.
            later(() => { path.style.transition = ''; path.style.strokeDasharray = ''; path.style.strokeDashoffset = ''; }, DRAW_MS + 50);
            later(() => { if (layer) head.addTo(layer); }, DRAW_MS - 80);
        } else head.addTo(layer);
    }

    function renderPanel(w, route, j, stepIx, done) {
        const h = host();
        const r = (w.routes && w.routes[route]) || {};
        const color = r.color || '#888';
        const name = (c) => h.nameOf(c);
        const rows = [];
        const upto = done ? j.steps.length : stepIx + 1;
        for (let i = 0; i < upto; i++) {
            const arrows = j.steps[i].map(([a, b]) =>
                `<span class="wm-jp-arrow"><span>${esc(name(a))} <b dir="auto">${esc(formOf(w, a))}</b></span>`
                + `<span class="wm-jp-to" aria-hidden="true">→</span>`
                + `<span>${esc(name(b))} <b dir="auto">${esc(formOf(w, b))}</b></span></span>`).join('');
            rows.push(`<li class="${i === upto - 1 && !done ? 'cur' : ''}"><span class="wm-jp-n">${i + 1}</span><span class="wm-jp-arrows">${arrows}</span></li>`);
        }
        const label = r[ui()] || r[ui().split('_')[0]] || r.en || route;
        if (!panel.querySelector('.wm-jp-steps')) {
            const src = (j.sources || []).map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a></li>`).join('');
            panel.innerHTML =
                `<div class="wm-jp-head"><span class="sw" style="background:${esc(color)}"></span>`
                + `<span class="wm-jp-title">${esc((w.emoji ? w.emoji + ' ' : '') + label)}</span>`
                + `<span class="wm-jp-step"></span>`
                + `<button type="button" class="wm-jp-x" aria-label="${esc(pk(STR.close))}" title="${esc(pk(STR.close))}">×</button></div>`
                + `<ol class="wm-jp-steps"></ol>`
                + `<p class="wm-jp-total" hidden></p>`
                + `<p class="wm-jp-note">${esc(pk(STR.note))}</p>`
                + `<div class="wm-jp-foot"><button type="button" class="wm-jp-replay">${esc(pk(STR.replay))}</button>`
                + `<details class="wm-jp-src"><summary>${esc(pk(STR.sources))} (${(j.sources || []).length})</summary><ul>${src}</ul></details></div>`;
        }
        panel.querySelector('.wm-jp-step').textContent = `${Math.min(upto, j.steps.length)} / ${j.steps.length}`;
        const ol = panel.querySelector('.wm-jp-steps');
        ol.innerHTML = rows.join('');
        ol.scrollTop = ol.scrollHeight;
        const tot = panel.querySelector('.wm-jp-total');
        tot.hidden = !done;
        if (done) tot.textContent = pk(STR.total).replace('{n}', h.count(route));
    }

    function play(route) {
        const h = host();
        if (!h || h.is3D() || typeof L === 'undefined') return;
        const map = h.map(), id = h.word(), w = window.WORDS && window.WORDS[id];
        const j = w && w.journey && w.journey[route];
        if (!map || !j) return;
        const keepFocus = (playing ? lastFocus : null) || document.activeElement;
        stop();
        lastFocus = keepFocus;
        playing = { id, route };
        const LD = host().langs() || {};
        const codes = [];
        j.steps.forEach((s) => s.forEach(([a, b]) => { [a, b].forEach((c) => { if (LD[c] && !codes.includes(c)) codes.push(c); }); }));
        const P = points(codes);
        if (!map.getPane('wmJourney')) { const p = map.createPane('wmJourney'); p.style.zIndex = 640; p.style.pointerEvents = 'none'; }
        if (!map.getPane('wmJourneyTags')) { const p = map.createPane('wmJourneyTags'); p.style.zIndex = 660; p.style.pointerEvents = 'none'; }
        layer = L.layerGroup().addTo(map);
        document.body.classList.add('wm-journey-on', 'wm-journey-dim');

        panel = document.createElement('section');
        panel.className = 'wm-journey-panel';
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-label', pk(STR.play));
        panel.setAttribute('aria-live', 'polite');
        if (/^(ar|he)/.test(ui())) panel.dir = 'rtl';
        document.body.appendChild(panel);
        panel.addEventListener('click', (ev) => {
            if (ev.target.closest('.wm-jp-x')) stop();
            else if (ev.target.closest('.wm-jp-replay')) play(route);
        });

        const color = (w.routes && w.routes[route] && w.routes[route].color) || '#888';
        const pts = codes.map((c) => P[c]);
        const small = window.innerWidth < 700;
        if (pts.length > 1) map.fitBounds(pts, { paddingTopLeft: [small ? 24 : 60, small ? 150 : 170], paddingBottomRight: [small ? 24 : 90, small ? 330 : 300], maxZoom: 5, animate: !reduced() });

        const still = reduced();
        const origins = [...new Set(j.steps[0].map((p) => p[0]))];
        const run = () => {
            origins.forEach((c) => tag(map, c, P[c], color, true));
            renderPanel(w, route, j, 0, false);
            j.steps.forEach((step, si) => {
                const go = () => {
                    if (!layer) return;
                    step.forEach(([a, b]) => line(map, P[a], P[b], color, !still));
                    if (still) step.forEach(([, b]) => tag(map, b, P[b], color, false));
                    else later(() => { if (layer) step.forEach(([, b]) => tag(map, b, P[b], color, false)); }, DRAW_MS);
                    renderPanel(w, route, j, si, false);
                };
                if (still) go(); else later(go, 500 + si * STEP_MS);
            });
            const finish = () => { if (!layer) return; renderPanel(w, route, j, j.steps.length - 1, true); document.body.classList.remove('wm-journey-dim'); h.blink(route); };
            if (still) finish(); else later(finish, 500 + j.steps.length * STEP_MS);
        };
        // Start once the camera has settled, or the first arrows draw mid-flight.
        if (still || pts.length < 2) run();
        else { let started = false; const go = () => { if (started) return; started = true; run(); }; map.once('moveend', go); later(go, 1200); }
        const x = panel.querySelector('.wm-jp-x');
        if (x) x.focus({ preventScroll: true });
    }

    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && playing) stop(); });
    // Called on every legend redraw: stop only when the word has changed.
    function sync() { const h = host(); if (playing && h && h.word() !== playing.id) stop(); }
    window.__wmJourney = { play, stop, sync, label: () => pk(STR.play), isPlaying: () => !!playing };
})();
