/* ============================================================================
 * my-languages.js — "話せる言語 / My languages" feature for the Word Map.
 *
 * Lets a visitor pick the languages they speak (each with a CEFR level A1–C2,
 * plus Native), plots them on the live map, tallies how many people those
 * languages reach worldwide, and generates a shareable, SNS-friendly PNG card
 * (a Natural-Earth world map with their languages glowing on it + the stats).
 *
 * Self-contained: reuses window.PosterGeo.projectNaturalEarth (poster_geo.js)
 * for the card's map, window.__langmap.setSpotlight() for the live-map plot,
 * and LANG_DATA/meta already loaded by the page. The card is drawn entirely
 * with vector primitives, so canvas.toBlob() is never tainted.
 * ========================================================================== */
(function () {
    'use strict';

    // Capture our hash param at the earliest possible moment (script parse),
    // before any of the page's event-driven updateHash() calls could rewrite
    // the hash without it — so a reloaded selection is never lost to a race.
    var _bootParam = (function () { try { return new URLSearchParams((location.hash || '').replace(/^#/, '')).get('ml'); } catch (e) { return null; } })();

    // ---- constants ---------------------------------------------------------
    var WORLD_POP = 8.1e9;                       // ~2024 world population
    // Country-outline GeoJSON, same source the poster uses. Fetched lazily and
    // cached; the card degrades to a graticule-only backdrop if it can't load.
    var GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';
    // Multi-script font stack (mirrors poster_render.js) for card labels.
    var CARD_FONT = "'Noto Sans','Noto Sans JP','Noto Sans KR','Noto Sans SC'," +
        "'Noto Sans Arabic','Noto Sans Hebrew','Noto Sans Devanagari','Noto Sans Bengali'," +
        "'Noto Sans Thai','Noto Sans Khmer','Noto Sans Myanmar','Noto Sans Georgian'," +
        "'Noto Sans Armenian','Noto Sans Ethiopic',sans-serif";

    // CEFR proficiency levels, cool→warm; colour also drives the map-dot glow.
    var LEVELS = [
        { key: 'A1', color: '#6fa8dc' },
        { key: 'A2', color: '#68c4c9' },
        { key: 'B1', color: '#7bd191' },
        { key: 'B2', color: '#c7d15e' },
        { key: 'C1', color: '#e8a94e' },
        { key: 'C2', color: '#e8734e' },
        { key: 'Native', color: '#ffd24a' },
    ];
    function levelColor(k) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].key === k) return LEVELS[i].color; return '#7bd191'; }
    function levelRank(k) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].key === k) return i; return 2; }
    // Plain, what-you-can-actually-do descriptors per CEFR level, localized
    // (en/ja/ko/zh; other UI languages fall back to English).
    var LEVEL_DESC = {
        en: { A1: 'A few words & greetings', A2: 'Simple everyday exchanges', B1: 'Can hold an everyday conversation', B2: 'Comfortable with complex & work topics', C1: 'Fluent in almost any situation', C2: 'Near-native command' },
        ja: { A1: '単語やあいさつが少し', A2: '簡単なやりとりができる', B1: '日常会話ができる', B2: '仕事や複雑な話もできる', C1: 'ほぼどんな場面でも流暢', C2: '母語話者に近い' },
        ko: { A1: '단어·인사 조금', A2: '간단한 일상 대화', B1: '일상 대화가 가능', B2: '업무·복잡한 주제도 가능', C1: '거의 모든 상황에서 유창', C2: '원어민에 가까움' },
        zh: { A1: '几个单词和问候', A2: '简单的日常交流', B1: '能进行日常对话', B2: '能应对复杂和工作话题', C1: '几乎任何场合都流利', C2: '接近母语水平' },
    };
    function levelDesc(k) {
        var u = ui().split('_')[0], d = LEVEL_DESC[u] || LEVEL_DESC.en;
        return (d && d[k]) || (LEVEL_DESC.en[k] || '');
    }
    function levelOptionLabel(k) { return k === 'Native' ? nativeLabel() : (k + ' · ' + levelDesc(k)); }

    // ---- i18n (en/ja + major locales; others fall back to English) ---------
    var NATIVE = { en: 'Native', ja: '母語', ko: '모어', zh: '母语', yue: '母語', es: 'Nativo', fr: 'Natif', de: 'Muttersprache', it: 'Madrelingua', pt: 'Nativo', ru: 'Родной', id: 'Asli' };
    var STR = {
        en: { btn: 'My languages', title: 'Languages I speak', name_ph: 'Your name (optional)', add_ph: 'Add a language you speak…', no_results: 'No matching language', empty: 'Add the languages you speak to see how many people you can reach.', s_langs: 'languages', s_reach: 'people reached', s_world: 'of the world', s_countries: 'countries', s_families: 'families', plot: 'Plot on map', clear_plot: 'Clear map', make_img: 'Create image', download: 'Download', share: 'Share', close: 'Close', folded: '≈ counted within {name}', card_my: 'My languages', card_of: 'languages', card_reach: 'people I can reach', card_world: 'of the world', card_note: 'cumulative reach — overlaps possible', card_countries: 'countries', card_families: 'families' },
        ja: { btn: '話せる言語', title: '話せる言語', name_ph: 'お名前（任意）', add_ph: '話せる言語を追加…', no_results: '該当する言語がありません', empty: '話せる言語を追加すると、世界で何人に届くかがわかります。', s_langs: '言語', s_reach: 'カバー人口', s_world: '世界人口比', s_countries: 'か国', s_families: '語族', plot: '地図にプロット', clear_plot: '地図をクリア', make_img: '画像を作成', download: '保存', share: '共有', close: '閉じる', folded: '≈ {name}に含む', card_my: '話せる言語', card_of: '言語', card_reach: '届く人の数', card_world: '世界人口の', card_note: '延べ人数（重複あり）', card_countries: 'か国', card_families: '語族' },
        ko: { btn: '할 수 있는 언어', title: '구사하는 언어', name_ph: '이름 (선택)', add_ph: '구사하는 언어 추가…', no_results: '일치하는 언어 없음', empty: '구사하는 언어를 추가하면 전 세계 몇 명에게 닿는지 알 수 있어요.', s_langs: '개 언어', s_reach: '도달 인구', s_world: '세계 인구 대비', s_countries: '개국', s_families: '어족', plot: '지도에 표시', clear_plot: '지도 지우기', make_img: '이미지 생성', download: '저장', share: '공유', close: '닫기', folded: '≈ {name}에 포함', card_my: '구사하는 언어', card_of: '개 언어', card_reach: '내가 닿는 사람 수', card_world: '세계 인구의', card_note: '누적 (중복 가능)', card_countries: '개국', card_families: '어족' },
        zh: { btn: '我会的语言', title: '我会的语言', name_ph: '你的名字（可选）', add_ph: '添加你会的语言…', no_results: '无匹配语言', empty: '添加你会的语言，看看你能触达全球多少人。', s_langs: '种语言', s_reach: '覆盖人口', s_world: '占世界人口', s_countries: '个国家', s_families: '语系', plot: '在地图上标注', clear_plot: '清除地图', make_img: '生成图片', download: '下载', share: '分享', close: '关闭', folded: '≈ 已计入{name}', card_my: '我会的语言', card_of: '种语言', card_reach: '我能触达的人数', card_world: '占世界人口', card_note: '累计（可能重叠）', card_countries: '个国家', card_families: '语系' },
    };
    function ui() {
        var g = (window.__langmap && window.__langmap.uiLang) ||
            (document.getElementById('header-ui-lang') && document.getElementById('header-ui-lang').value) || 'en';
        return String(g);
    }
    function T(k, vars) {
        var u = ui(), base = u.split('_')[0];
        var d = STR[u] || STR[base] || STR.en;
        var s = (d && d[k] != null) ? d[k] : STR.en[k];
        if (vars) for (var p in vars) s = s.replace('{' + p + '}', vars[p]);
        return s;
    }
    function nativeLabel() { var u = ui().split('_')[0]; return NATIVE[u] || NATIVE.en; }

    // ---- data helpers ------------------------------------------------------
    function LD() { return (typeof LANG_DATA !== 'undefined') ? LANG_DATA : (window.LANG_DATA || {}); }
    function metaOf(code) { var l = LD()[code]; return (l && l.meta) || {}; }

    // Reach = how many people you could reach (L2-inclusive). Prefer the curated
    // numeric meta.speakerCount object; fall back to parsing the prose string.
    function parseReach(s) {
        if (!s || typeof s !== 'string') return 0;
        if (/Extinct|Reconstruct|no speakers|proto-language/i.test(s)) return 0;
        var U = { b: 1e9, billion: 1e9, m: 1e6, million: 1e6, k: 1e3, thousand: 1e3 };
        var re = /([0-9][0-9.,]*)\s*(?:[–\-]\s*([0-9][0-9.,]*))?\s*(billion|million|thousand|B|M|K)?/gi, m, max = 0;
        while ((m = re.exec(s))) {
            if (!m[1]) { re.lastIndex++; continue; }
            var unit = m[3] ? U[m[3].toLowerCase()] : 1;
            var lo = parseFloat(m[1].replace(/,/g, '')), hi = m[2] ? parseFloat(m[2].replace(/,/g, '')) : lo;
            var v = Math.max(lo, hi) * unit;
            if (isFinite(v) && v > max) max = v;
            if (m.index === re.lastIndex) re.lastIndex++;
        }
        return max;
    }
    function reachOf(code) {
        var m = metaOf(code), sc = m.speakerCount;
        if (sc && typeof sc === 'object') {
            var keys = ['total', 'l1', 'l1RangeMax', 'l1RangeMin'];
            for (var i = 0; i < keys.length; i++) if (typeof sc[keys[i]] === 'number') return sc[keys[i]];
        }
        return parseReach(m.speakers);
    }
    function countriesOf(code) {
        var s = metaOf(code).countries;
        if (!s || typeof s !== 'string') return [];
        return s.split(',').map(function (x) { return x.trim(); })
            .filter(function (x) { return x && !/^(Africa|worldwide|various|diaspora|global|the )/i.test(x); });
    }
    function familyTop(code) {
        var f = metaOf(code).family;
        if (!f || typeof f !== 'string') return null;
        return f.split(/[>,;(]/)[0].trim() || null;
    }
    function displayName(code) {
        var l = LD()[code] || {};
        return l.native || l.name || code;
    }
    function romanName(code) {
        var l = LD()[code] || {};
        return l.name || code;
    }

    // Compact, locale-aware big-number formatting for the "映え" figure.
    function trim1(n) { var s = (Math.round(n * 10) / 10).toFixed(1); return s.replace(/\.0$/, ''); }
    function fmtBig(n) {
        n = Math.max(0, Math.round(n));
        var u = ui().split('_')[0];
        if (u === 'ja' || u === 'yue') { if (n >= 1e8) return trim1(n / 1e8) + '億'; if (n >= 1e4) return trim1(n / 1e4) + '万'; return String(n); }
        if (u === 'zh') { if (n >= 1e8) return trim1(n / 1e8) + '亿'; if (n >= 1e4) return trim1(n / 1e4) + '万'; return String(n); }
        if (u === 'ko') { if (n >= 1e8) return trim1(n / 1e8) + '억'; if (n >= 1e4) return trim1(n / 1e4) + '만'; return String(n); }
        if (n >= 1e9) return trim1(n / 1e9) + 'B';
        if (n >= 1e6) return trim1(n / 1e6) + 'M';
        if (n >= 1e3) return trim1(n / 1e3) + 'K';
        return String(n);
    }

    // Deduplication: a variety and its parent (Japanese + Kansai/Osaka, English
    // + Indian English…) must not double-count their speakers. Group codes that
    // are the same language: by ISO 639-3 where present, else by the base name
    // ("Japanese (Osaka)" → "Japanese"), mapping that base back to the parent's
    // ISO so ISO-less dialects fold into the ISO-bearing parent. Okinawan
    // ("Okinawan", ISO ryu) or Edo Japanese (ISO ojp) keep distinct keys.
    function baseName(code) { var n = (LD()[code] || {}).name || code; return String(n).split(' (')[0].trim(); }
    var _baseIso = null;
    function baseIsoMap() {
        if (_baseIso) return _baseIso;
        _baseIso = {}; var ld = LD();
        for (var c in ld) { var m = (ld[c] && ld[c].meta) || {}; if (m.iso6393) { var b = baseName(c); if (!_baseIso[b]) _baseIso[b] = m.iso6393; } }
        return _baseIso;
    }
    function dedupKey(code) { var m = metaOf(code); return m.iso6393 || baseIsoMap()[baseName(code)] || baseName(code); }
    // For each dedup group among the SELECTED langs, the representative is the
    // highest-reach member; the others are "folded" (their population already
    // counted within the representative). Returns { foldedInto: {code:repCode} }.
    function foldInfo() {
        var best = {};   // key -> {code, reach}
        state.langs.forEach(function (x) {
            var k = dedupKey(x.code), r = reachOf(x.code);
            if (!best[k] || r > best[k].reach) best[k] = { code: x.code, reach: r };
        });
        var foldedInto = {};
        state.langs.forEach(function (x) {
            var rep = best[dedupKey(x.code)];
            if (rep && rep.code !== x.code) foldedInto[x.code] = rep.code;
        });
        return { foldedInto: foldedInto };
    }

    // ---- state -------------------------------------------------------------
    var state = { name: '', langs: [] };         // langs: [{code, level}]
    function hasCode(code) { return state.langs.some(function (x) { return x.code === code; }); }
    function stats() {
        var groups = {}, countries = {}, fams = {};
        state.langs.forEach(function (x) {
            var k = dedupKey(x.code), r = reachOf(x.code);
            if (!(k in groups) || r > groups[k]) groups[k] = r;   // count each language once (its max variety)
            countriesOf(x.code).forEach(function (c) { countries[c] = 1; });
            var f = familyTop(x.code); if (f) fams[f] = 1;
        });
        var reach = 0; for (var k in groups) reach += groups[k];
        return { reach: reach, langs: state.langs.length, countries: Object.keys(countries).length, families: Object.keys(fams).length,
            worldPct: reach / WORLD_POP * 100 };
    }

    // ---- URL persistence ---------------------------------------------------
    // The page (wordmap.html updateHash) appends our param verbatim via
    // getMyLangHashParam and rewrites the hash when we call syncHash(), so the
    // selection survives reloads and travels in shareable links.
    function validLevel(k) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].key === k) return k; return 'B2'; }
    function getMyLangHashParam() {
        if (!state.langs.length) return '';
        var payload = { n: state.name || '', p: _plotted ? 1 : 0, l: state.langs.map(function (x) { return [x.code, x.level]; }) };
        return 'ml=' + encodeURIComponent(JSON.stringify(payload));
    }
    function syncHash() { try { if (window.__langmap && window.__langmap.updateHash) window.__langmap.updateHash(); } catch (e) {} }
    function restoreFromHash() {
        try {
            var raw = _bootParam || new URLSearchParams((location.hash || '').replace(/^#/, '')).get('ml');
            if (!raw) return;
            var obj = JSON.parse(raw);
            if (!obj || !Array.isArray(obj.l)) return;
            state.name = typeof obj.n === 'string' ? obj.n : '';
            state.langs = obj.l.filter(function (p) { return p && p[0] && LD()[p[0]]; })
                .map(function (p) { return { code: p[0], level: validLevel(p[1]) }; });
            if (obj.p && state.langs.length) { _plotted = true; replotWithRetry(0); }
        } catch (e) {}
    }
    // The map/updateMarkers may not be ready the instant we restore; retry a few
    // times so a reloaded "plotted" view lights up once the map is live.
    function replotWithRetry(n) {
        if (!_plotted || !state.langs.length) return;   // user cleared → stop
        if (window.__langmap && typeof window.__langmap.setSpotlight === 'function') {
            window.__langmap.setSpotlight(state.langs.map(function (x) { return x.code; }));
        }
        if (n < 8) setTimeout(function () { replotWithRetry(n + 1); }, 350);
    }

    // ---- DOM: styles -------------------------------------------------------
    function injectStyles() {
        if (document.getElementById('mylang-styles')) return;
        var css = [
            '.mylang-overlay{position:fixed;inset:0;background:rgba(15,20,30,.55);z-index:4000;display:none;align-items:flex-start;justify-content:center;padding:24px 12px;overflow:auto}',
            '.mylang-overlay.open{display:flex}',
            '.mylang-panel{background:#fff;color:#1a2230;width:min(560px,100%);border-radius:16px;box-shadow:0 18px 60px rgba(0,0,0,.35);overflow:hidden;font-size:14px}',
            '@media (prefers-color-scheme:dark){.mylang-panel{background:#1c2432;color:#eef2f8}}',
            '.mylang-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid rgba(128,128,128,.2)}',
            '.mylang-head h2{margin:0;font-size:16px;font-weight:700}',
            '.mylang-x{background:none;border:0;font-size:22px;line-height:1;cursor:pointer;color:inherit;opacity:.6}',
            '.mylang-x:hover{opacity:1}',
            '.mylang-body{padding:14px 16px;display:flex;flex-direction:column;gap:12px}',
            '.mylang-name{width:100%;box-sizing:border-box;padding:9px 11px;border:1px solid rgba(128,128,128,.35);border-radius:9px;font:inherit;background:transparent;color:inherit}',
            '.mylang-addwrap{position:relative}',
            '.mylang-add{width:100%;box-sizing:border-box;padding:9px 11px;border:1px solid rgba(128,128,128,.35);border-radius:9px;font:inherit;background:transparent;color:inherit}',
            '.mylang-sugg{position:absolute;left:0;right:0;top:calc(100% + 4px);background:#fff;color:#1a2230;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.25);max-height:240px;overflow:auto;z-index:5;display:none}',
            '@media (prefers-color-scheme:dark){.mylang-sugg{background:#232d3d;color:#eef2f8}}',
            '.mylang-sugg.open{display:block}',
            '.mylang-sugg-item{padding:8px 11px;cursor:pointer;display:flex;gap:8px;align-items:baseline}',
            '.mylang-sugg-item:hover,.mylang-sugg-item.active{background:rgba(90,140,220,.16)}',
            '.mylang-sugg-native{font-weight:600}',
            '.mylang-sugg-rom{opacity:.6;font-size:12px}',
            '.mylang-list{display:flex;flex-direction:column;gap:6px}',
            // One line: dot + name (grows, keeps a min width) + level select
            // (shrinkable, capped so it can never crush the name or overflow) +
            // delete. Guarantees all three stay on the same row and visible.
            '.mylang-row{display:flex;align-items:center;gap:8px;padding:8px 10px;border:1px solid rgba(128,128,128,.22);border-radius:10px}',
            '.mylang-dot{width:13px;height:13px;border-radius:50%;flex:0 0 auto;box-shadow:0 0 6px currentColor}',
            '.mylang-row-name{flex:1 1 auto;min-width:56px;overflow:hidden}',
            '.mylang-level{flex:0 1 auto;min-width:0;max-width:56%;box-sizing:border-box;font:inherit;font-size:12px;padding:5px 6px;border:1px solid rgba(128,128,128,.35);border-radius:7px;background:transparent;color:inherit}',
            '.mylang-del{flex:0 0 auto;background:none;border:0;cursor:pointer;color:inherit;opacity:.5;font-size:19px;line-height:1;padding:0 3px}',
            '.mylang-del:hover{opacity:1;color:#d9534f}',
            '.mylang-empty{opacity:.6;text-align:center;padding:14px 4px;font-size:13px}',
            '.mylang-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
            '.mylang-stat{background:rgba(90,140,220,.1);border-radius:10px;padding:9px 11px}',
            '.mylang-stat.big{grid-column:1/-1;background:linear-gradient(135deg,rgba(90,140,220,.18),rgba(120,90,200,.14))}',
            '.mylang-stat .v{font-size:22px;font-weight:800;line-height:1.1}',
            '.mylang-stat.big .v{font-size:30px}',
            '.mylang-stat .l{font-size:11px;opacity:.7;margin-top:2px}',
            '.mylang-actions{display:flex;flex-wrap:wrap;gap:8px}',
            '.mylang-act{flex:1;min-width:120px;padding:10px;border-radius:10px;border:1px solid rgba(128,128,128,.3);background:transparent;color:inherit;font:inherit;font-weight:600;cursor:pointer}',
            '.mylang-act:hover{background:rgba(90,140,220,.12)}',
            '.mylang-act.primary{background:#3f6fd6;border-color:#3f6fd6;color:#fff}',
            '.mylang-act.primary:hover{background:#345cb3}',
            '.mylang-act:disabled{opacity:.45;cursor:default}',
            '.mylang-imgwrap{display:flex;flex-direction:column;gap:12px;align-items:center}',
            '.mylang-imgwrap img{max-width:100%;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.3)}',
            '.mylang-note{font-size:11px;opacity:.6;text-align:center}',
        ].join('\n');
        var st = document.createElement('style'); st.id = 'mylang-styles'; st.textContent = css;
        document.head.appendChild(st);
    }

    // ---- DOM: panel --------------------------------------------------------
    var overlay, panelBody, nameInput, addInput, suggBox, listEl, statsEl, actionsEl, activeSugg = -1, suggData = [];

    function buildPanel() {
        overlay = document.createElement('div');
        overlay.className = 'mylang-overlay';
        overlay.innerHTML =
            '<div class="mylang-panel" role="dialog" aria-modal="true">' +
            '<div class="mylang-head"><h2></h2><button class="mylang-x" aria-label="close">×</button></div>' +
            '<div class="mylang-body"></div></div>';
        panelBody = overlay.querySelector('.mylang-body');
        overlay.querySelector('.mylang-x').addEventListener('click', close);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });
        document.body.appendChild(overlay);
        renderBuilder();
    }

    // The default "builder" view (name + add + list + stats + actions).
    function renderBuilder() {
        overlay.querySelector('.mylang-head h2').textContent = T('title');
        panelBody.innerHTML = '';

        nameInput = el('input', 'mylang-name');
        nameInput.type = 'text'; nameInput.placeholder = T('name_ph'); nameInput.value = state.name;
        nameInput.addEventListener('input', function () { state.name = nameInput.value; syncHash(); });
        panelBody.appendChild(nameInput);

        var aw = el('div', 'mylang-addwrap');
        addInput = el('input', 'mylang-add');
        addInput.type = 'text'; addInput.placeholder = T('add_ph'); addInput.autocomplete = 'off';
        suggBox = el('div', 'mylang-sugg');
        addInput.addEventListener('input', onSearch);
        addInput.addEventListener('keydown', onSearchKey);
        addInput.addEventListener('focus', onSearch);
        aw.appendChild(addInput); aw.appendChild(suggBox);
        panelBody.appendChild(aw);

        listEl = el('div', 'mylang-list'); panelBody.appendChild(listEl);
        statsEl = el('div', 'mylang-stats'); panelBody.appendChild(statsEl);
        actionsEl = el('div', 'mylang-actions'); panelBody.appendChild(actionsEl);

        renderList(); renderStats(); renderActions();
    }

    function renderList() {
        listEl.innerHTML = '';
        if (!state.langs.length) {
            var e = el('div', 'mylang-empty'); e.textContent = T('empty'); listEl.appendChild(e); return;
        }
        var fi = foldInfo();
        var dark = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        var mainCol = dark ? '#eef2f8' : '#1a2230';
        state.langs.forEach(function (item, idx) {
            // One line: dot + name + level select + delete.
            var row = el('div', 'mylang-row');
            var dot = el('span', 'mylang-dot'); dot.style.color = levelColor(item.level); dot.style.background = levelColor(item.level);
            // Name (native + romanized, inline). Colours set INLINE so no page CSS
            // cascade can hide it; nowrap+ellipsis keeps it to one line.
            var nm = el('div', 'mylang-row-name');
            nm.style.cssText = 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:' + mainCol + ';-webkit-text-fill-color:' + mainCol;
            var nat = el('span', 'mylang-native'); nat.textContent = displayName(item.code);
            nat.style.cssText = 'font-size:14px;font-weight:700;color:' + mainCol + ';-webkit-text-fill-color:' + mainCol;
            nm.appendChild(nat);
            var rom = romanName(item.code);
            if (rom && rom !== displayName(item.code)) {
                var rr = el('span', 'mylang-rom'); rr.textContent = ' ' + rom;
                rr.style.cssText = 'font-size:11px;opacity:.6;color:' + mainCol + ';-webkit-text-fill-color:' + mainCol;
                nm.appendChild(rr);
            }
            // Overlap note (dialect folded into its parent), appended inline.
            if (fi.foldedInto[item.code]) {
                var fn = el('span', 'mylang-fold'); fn.textContent = '  ' + T('folded', { name: displayName(fi.foldedInto[item.code]) });
                fn.style.cssText = 'font-size:10px;opacity:.5;color:' + mainCol + ';-webkit-text-fill-color:' + mainCol;
                nm.appendChild(fn);
            }
            var sel = el('select', 'mylang-level');
            LEVELS.forEach(function (lv) {
                var o = document.createElement('option'); o.value = lv.key;
                o.textContent = levelOptionLabel(lv.key);
                if (lv.key === item.level) o.selected = true;
                sel.appendChild(o);
            });
            sel.addEventListener('change', function () { item.level = sel.value; dot.style.color = dot.style.background = levelColor(item.level); syncHash(); });
            var del = el('button', 'mylang-del'); del.innerHTML = '×'; del.setAttribute('aria-label', 'remove'); del.title = 'remove';
            del.style.color = mainCol;
            del.addEventListener('click', function () { state.langs.splice(idx, 1); renderList(); renderStats(); renderActions(); plotIfActive(); syncHash(); });
            row.appendChild(dot); row.appendChild(nm); row.appendChild(sel); row.appendChild(del);
            listEl.appendChild(row);
        });
    }

    function renderStats() {
        var s = stats();
        var pct = s.worldPct >= 100 ? '100%+' : (s.worldPct >= 10 ? Math.round(s.worldPct) : s.worldPct.toFixed(1)) + '%';
        statsEl.innerHTML = '';
        statsEl.appendChild(statCard(fmtBig(s.reach), T('s_reach'), true));
        statsEl.appendChild(statCard(pct, T('s_world')));
        statsEl.appendChild(statCard(String(s.langs), T('s_langs')));
        statsEl.appendChild(statCard(String(s.countries), T('s_countries')));
    }
    function statCard(v, l, big) {
        var c = el('div', 'mylang-stat' + (big ? ' big' : ''));
        var vv = el('div', 'v'); vv.textContent = v;
        var ll = el('div', 'l'); ll.textContent = l;
        c.appendChild(vv); c.appendChild(ll); return c;
    }

    function renderActions() {
        actionsEl.innerHTML = '';
        var none = state.langs.length === 0;
        var plot = el('button', 'mylang-act'); plot.textContent = _plotted ? T('clear_plot') : T('plot'); plot.disabled = none;
        plot.addEventListener('click', function () { _plotted ? clearPlot() : doPlot(); renderActions(); });
        var img = el('button', 'mylang-act primary'); img.textContent = T('make_img'); img.disabled = none;
        img.addEventListener('click', openImage);
        actionsEl.appendChild(plot); actionsEl.appendChild(img);
    }

    // ---- language search (typeahead) --------------------------------------
    function onSearch() {
        var q = addInput.value.trim().toLowerCase();
        suggData = []; activeSugg = -1;
        if (!q) { suggBox.classList.remove('open'); return; }
        var ld = LD(), codes = Object.keys(ld), out = [];
        for (var i = 0; i < codes.length && out.length < 40; i++) {
            var c = codes[i]; if (hasCode(c)) continue;
            var l = ld[c]; if (!l) continue;
            var hay = ((l.name || '') + ' ' + (l.native || '') + ' ' + c).toLowerCase();
            if (hay.indexOf(q) !== -1) out.push(c);
        }
        // prefer prefix matches on name/native, then by reach (prominent first)
        out.sort(function (a, b) {
            var la = ld[a], lb = ld[b];
            var pa = ((la.name || '').toLowerCase().indexOf(q) === 0 || (la.native || '').toLowerCase().indexOf(q) === 0) ? 0 : 1;
            var pb = ((lb.name || '').toLowerCase().indexOf(q) === 0 || (lb.native || '').toLowerCase().indexOf(q) === 0) ? 0 : 1;
            if (pa !== pb) return pa - pb;
            return reachOf(b) - reachOf(a);
        });
        suggData = out.slice(0, 8);
        renderSugg();
    }
    function renderSugg() {
        suggBox.innerHTML = '';
        if (!suggData.length) {
            var e = el('div', 'mylang-sugg-item'); e.style.opacity = '.6'; e.textContent = T('no_results');
            suggBox.appendChild(e); suggBox.classList.add('open'); return;
        }
        suggData.forEach(function (code, i) {
            var it = el('div', 'mylang-sugg-item' + (i === activeSugg ? ' active' : ''));
            it.innerHTML = '<span class="mylang-sugg-native">' + esc(displayName(code)) + '</span>' +
                '<span class="mylang-sugg-rom">' + esc(romanName(code)) + '</span>';
            it.addEventListener('mousedown', function (ev) { ev.preventDefault(); addLang(code); });
            suggBox.appendChild(it);
        });
        suggBox.classList.add('open');
    }
    function onSearchKey(e) {
        if (!suggBox.classList.contains('open') || !suggData.length) return;
        if (e.key === 'ArrowDown') { activeSugg = Math.min(suggData.length - 1, activeSugg + 1); renderSugg(); e.preventDefault(); }
        else if (e.key === 'ArrowUp') { activeSugg = Math.max(0, activeSugg - 1); renderSugg(); e.preventDefault(); }
        else if (e.key === 'Enter') { if (activeSugg >= 0) { addLang(suggData[activeSugg]); e.preventDefault(); } else if (suggData.length) { addLang(suggData[0]); e.preventDefault(); } }
    }
    function addLang(code) {
        if (!code || hasCode(code)) return;
        state.langs.push({ code: code, level: 'B2' });
        addInput.value = ''; suggData = []; suggBox.classList.remove('open');
        renderList(); renderStats(); renderActions(); plotIfActive(); syncHash();
        addInput.focus();
    }

    // ---- live-map plotting -------------------------------------------------
    var _plotted = false;
    function doPlot() {
        if (!(window.__langmap && window.__langmap.setSpotlight)) return;
        window.__langmap.setSpotlight(state.langs.map(function (x) { return x.code; }));
        _plotted = true; syncHash();
        close();   // reveal the map behind the panel so the plot is visible
    }
    function clearPlot() {
        if (window.__langmap && window.__langmap.clearSpotlight) window.__langmap.clearSpotlight();
        _plotted = false; syncHash();
    }
    function plotIfActive() { if (_plotted) { if (window.__langmap && window.__langmap.setSpotlight) window.__langmap.setSpotlight(state.langs.map(function (x) { return x.code; })); } }

    // ---- world geojson (lazy, cached) -------------------------------------
    var _geoPromise = null;
    function loadGeo() {
        if (_geoPromise) return _geoPromise;
        _geoPromise = fetch(GEOJSON_URL).then(function (r) { return r.json(); }).catch(function () { return null; });
        return _geoPromise;
    }

    // ---- country distribution ---------------------------------------------
    // A widely-spoken language (English, French, Spanish…) shouldn't sit as a
    // single dot on its "home" city — it should scatter across the countries it
    // is spoken in. We derive a centroid per country from the same GeoJSON the
    // card draws, and plot a dot at each of a language's meta.countries.
    var COUNTRY_ALIAS = {
        'uk': 'united kingdom', 'u.k.': 'united kingdom', 'great britain': 'united kingdom',
        'usa': 'united states of america', 'u.s.a.': 'united states of america', 'us': 'united states of america', 'u.s.': 'united states of america', 'united states': 'united states of america',
        'uae': 'united arab emirates', 'drc': 'democratic republic of the congo', 'dr congo': 'democratic republic of the congo', 'congo-kinshasa': 'democratic republic of the congo', 'congo (kinshasa)': 'democratic republic of the congo', 'congo-brazzaville': 'republic of congo', 'republic of the congo': 'republic of congo',
        'ivory coast': "côte d'ivoire", 'czech republic': 'czechia', 'burma': 'myanmar', 'east timor': 'timor-leste', 'cape verde': 'cabo verde', 'swaziland': 'eswatini', 'macedonia': 'north macedonia', 'south korea': 'south korea', 'north korea': 'north korea', 'russia': 'russia', 'tanzania': 'united republic of tanzania', 'laos': 'laos', 'syria': 'syria', 'bolivia': 'bolivia', 'iran': 'iran', 'vietnam': 'vietnam', 'brunei': 'brunei', 'moldova': 'moldova',
    };
    var _cents = null;
    function ringCentroid(ring) {
        var a = 0, cx = 0, cy = 0;
        for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
            var x0 = ring[j][0], y0 = ring[j][1], x1 = ring[i][0], y1 = ring[i][1];
            var f = x0 * y1 - x1 * y0; a += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f;
        }
        if (Math.abs(a) < 1e-9) { var sx = 0, sy = 0; ring.forEach(function (p) { sx += p[0]; sy += p[1]; }); return [sx / ring.length, sy / ring.length]; }
        return [cx / (3 * a), cy / (3 * a)];
    }
    function ringBBoxArea(ring) { var a = 1e9, b = 1e9, c = -1e9, d = -1e9; ring.forEach(function (p) { if (p[0] < a) a = p[0]; if (p[0] > c) c = p[0]; if (p[1] < b) b = p[1]; if (p[1] > d) d = p[1]; }); return (c - a) * (d - b); }
    function buildCentroids(geo) {
        if (_cents) return _cents;
        _cents = {};
        if (!geo || !geo.features) return _cents;
        geo.features.forEach(function (f) {
            var nm = f.properties && f.properties.name; var gm = f.geometry; if (!nm || !gm) return;
            var polys = gm.type === 'Polygon' ? [gm.coordinates] : gm.type === 'MultiPolygon' ? gm.coordinates : [];
            var best = null, bestA = -1;
            polys.forEach(function (poly) { var r = poly[0]; if (!r) return; var ar = ringBBoxArea(r); if (ar > bestA) { bestA = ar; best = r; } });
            if (!best) return;
            var c = ringCentroid(best);
            _cents[String(nm).toLowerCase()] = { lng: c[0], lat: c[1] };
        });
        return _cents;
    }
    function countryPoint(token, cents) {
        var t = String(token).toLowerCase().trim();
        return cents[COUNTRY_ALIAS[t] || t] || cents[t] || null;
    }
    // Where to draw a language: its countries' centroids when it spans 2+, else
    // its precise home coordinate (so localized dialects stay put).
    function pointsForLang(code, cents) {
        var l = LD()[code] || {}, pts = [];
        countriesOf(code).forEach(function (name) { var p = countryPoint(name, cents); if (p) pts.push(p); });
        if (pts.length >= 2) return pts.slice(0, 16);
        if (typeof l.lat === 'number' && typeof l.lng === 'number') return [{ lng: l.lng, lat: l.lat }];
        return pts;
    }

    // ---- share card (canvas) ----------------------------------------------
    var CARD_W = 1080, CARD_H = 1350;

    function openImage() {
        loadGeo();   // ensure fetch is underway
        // Show a "generating" state, then the image.
        overlay.querySelector('.mylang-head h2').textContent = T('make_img');
        panelBody.innerHTML = '<div class="mylang-empty">…</div>';
        drawCard().then(function (canvas) {
            renderImageView(canvas);
        }).catch(function () {
            renderImageView(null);
        });
    }

    function renderImageView(canvas) {
        overlay.querySelector('.mylang-head h2').textContent = T('make_img');
        panelBody.innerHTML = '';
        var wrap = el('div', 'mylang-imgwrap');
        if (canvas) {
            var img = new Image();
            try { img.src = canvas.toDataURL('image/png'); } catch (e) {}
            wrap.appendChild(img);
            var acts = el('div', 'mylang-actions'); acts.style.width = '100%';
            var dl = el('button', 'mylang-act primary'); dl.textContent = T('download');
            dl.addEventListener('click', function () { downloadCanvas(canvas); });
            acts.appendChild(dl);
            if (navigator.canShare) {
                var sh = el('button', 'mylang-act'); sh.textContent = T('share');
                sh.addEventListener('click', function () { shareCanvas(canvas); });
                acts.appendChild(sh);
            }
            var back = el('button', 'mylang-act'); back.textContent = '←';
            back.addEventListener('click', renderBuilder);
            acts.appendChild(back);
            wrap.appendChild(acts);
            var note = el('div', 'mylang-note'); note.textContent = T('card_note'); wrap.appendChild(note);
        } else {
            var e = el('div', 'mylang-empty'); e.textContent = '⚠'; wrap.appendChild(e);
            var back2 = el('button', 'mylang-act'); back2.textContent = '←'; back2.addEventListener('click', renderBuilder); wrap.appendChild(back2);
        }
        panelBody.appendChild(wrap);
    }

    function fileName() {
        var n = (state.name || 'my').replace(/[^\w぀-ヿ一-鿿가-힣-]+/g, '_').slice(0, 24) || 'my';
        return 'langmap_' + n + '_languages.png';
    }
    function downloadCanvas(canvas) {
        canvas.toBlob(function (blob) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a'); a.href = url; a.download = fileName();
            document.body.appendChild(a); a.click(); a.remove();
            setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
        }, 'image/png');
    }
    function shareCanvas(canvas) {
        canvas.toBlob(function (blob) {
            var file = new File([blob], fileName(), { type: 'image/png' });
            var data = { files: [file], title: T('card_my') };
            if (navigator.canShare && navigator.canShare(data)) {
                navigator.share(data).catch(function () {});
            } else { downloadCanvas(canvas); }
        }, 'image/png');
    }

    // Draw the whole card. Returns a Promise<canvas>.
    function drawCard() {
        return loadGeo().then(function (geo) {
            var c = document.createElement('canvas'); c.width = CARD_W; c.height = CARD_H;
            var g = c.getContext('2d');
            var s = stats();

            // background
            var bg = g.createLinearGradient(0, 0, 0, CARD_H);
            bg.addColorStop(0, '#101a2b'); bg.addColorStop(0.55, '#0c1422'); bg.addColorStop(1, '#0a0f1a');
            g.fillStyle = bg; g.fillRect(0, 0, CARD_W, CARD_H);

            // header text
            var uiName = (state.name || '').trim();
            var title = uiName ? uiName : T('card_my');
            g.textBaseline = 'alphabetic';
            g.fillStyle = '#ffffff'; g.font = '700 54px ' + CARD_FONT; g.textAlign = 'left';
            g.fillText(clip(g, title, CARD_W - 120), 60, 108);
            if (uiName) {
                g.fillStyle = 'rgba(255,255,255,.62)'; g.font = '500 26px ' + CARD_FONT;
                g.fillText(T('title'), 62, 146);
            }

            // ---- map band ----
            var mapY = uiName ? 176 : 150;
            var mapW = CARD_W - 80, mapX = 40;
            var proj = window.PosterGeo && window.PosterGeo.projectNaturalEarth;
            var mapH = proj ? proj(0, 0, { width: mapW }).height : mapW * 0.52;
            // clip map to a rounded region
            g.save();
            roundRect(g, mapX, mapY, mapW, mapH, 18); g.clip();
            var mg = g.createLinearGradient(0, mapY, 0, mapY + mapH);
            mg.addColorStop(0, '#12203a'); mg.addColorStop(1, '#0e1830');
            g.fillStyle = mg; g.fillRect(mapX, mapY, mapW, mapH);
            // land polygons
            if (geo && geo.features && proj) {
                g.fillStyle = 'rgba(120,150,190,.20)';
                g.strokeStyle = 'rgba(140,170,210,.16)'; g.lineWidth = 0.6;
                geo.features.forEach(function (f) {
                    var gm = f.geometry; if (!gm) return;
                    var polys = gm.type === 'Polygon' ? [gm.coordinates] : gm.type === 'MultiPolygon' ? gm.coordinates : [];
                    polys.forEach(function (poly) {
                        g.beginPath();
                        poly.forEach(function (ring) {
                            for (var i = 0; i < ring.length; i++) {
                                var p = proj(ring[i][0], ring[i][1], { width: mapW });
                                var x = mapX + p.x, y = mapY + p.y;
                                if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
                            }
                            g.closePath();
                        });
                        g.fill('evenodd'); g.stroke();
                    });
                });
            } else {
                // graticule fallback
                g.strokeStyle = 'rgba(140,170,210,.14)'; g.lineWidth = 1;
                for (var la = -60; la <= 60; la += 30) { var yy = mapY + mapH * (0.5 - la / 180); g.beginPath(); g.moveTo(mapX, yy); g.lineTo(mapX + mapW, yy); g.stroke(); }
                for (var lo = -150; lo <= 150; lo += 30) { var xx = mapX + mapW * (0.5 + lo / 360); g.beginPath(); g.moveTo(xx, mapY); g.lineTo(xx, mapY + mapH); g.stroke(); }
            }
            // language dots (glow) — one per country for widely-spoken langs,
            // else at the language's home coordinate.
            var cents = buildCentroids(geo);
            var pts = [];
            state.langs.forEach(function (item) {
                var col = levelColor(item.level), rank = levelRank(item.level);
                pointsForLang(item.code, cents).forEach(function (loc) {
                    var p = proj ? proj(loc.lng, loc.lat, { width: mapW }) : { x: mapW * (0.5 + loc.lng / 360), y: mapH * (0.5 - loc.lat / 180) };
                    pts.push({ x: mapX + p.x, y: mapY + p.y, color: col, code: item.code, rank: rank });
                });
            });
            pts.forEach(function (pt) {
                var glow = g.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 26);
                glow.addColorStop(0, pt.color); glow.addColorStop(0.4, hexA(pt.color, .5)); glow.addColorStop(1, hexA(pt.color, 0));
                g.fillStyle = glow; g.beginPath(); g.arc(pt.x, pt.y, 26, 0, 7); g.fill();
            });
            pts.forEach(function (pt) {
                g.fillStyle = pt.color; g.beginPath(); g.arc(pt.x, pt.y, 6 + pt.rank * 0.6, 0, 7); g.fill();
                g.fillStyle = 'rgba(255,255,255,.9)'; g.beginPath(); g.arc(pt.x, pt.y, 2.2, 0, 7); g.fill();
            });
            g.restore();

            // ---- big reach number ----
            var by = mapY + mapH + 92;
            g.textAlign = 'center';
            g.fillStyle = '#ffd24a'; g.font = '800 108px ' + CARD_FONT;
            g.fillText(fmtBig(s.reach), CARD_W / 2, by);
            g.fillStyle = 'rgba(255,255,255,.85)'; g.font = '600 30px ' + CARD_FONT;
            g.fillText(T('card_reach'), CARD_W / 2, by + 44);
            var pctTxt = (s.worldPct >= 100 ? '100%+' : (s.worldPct >= 10 ? Math.round(s.worldPct) : s.worldPct.toFixed(1)) + '%');
            g.fillStyle = 'rgba(140,190,255,.9)'; g.font = '700 34px ' + CARD_FONT;
            g.fillText(T('card_world') + ' ' + pctTxt, CARD_W / 2, by + 92);

            // ---- sub-stats row ----
            var ry = by + 158;
            drawMini(g, CARD_W * 0.28, ry, String(s.langs), T('card_of'));
            drawMini(g, CARD_W * 0.5, ry, String(s.countries), T('card_countries'));
            drawMini(g, CARD_W * 0.72, ry, String(s.families), T('card_families'));

            // ---- language chips ----
            var chipsY = ry + 78;
            drawChips(g, chipsY, mapW, mapX);

            // ---- footer ----
            g.textAlign = 'center'; g.fillStyle = 'rgba(255,255,255,.5)'; g.font = '600 26px ' + CARD_FONT;
            g.fillText('langmap.heuron.com', CARD_W / 2, CARD_H - 42);

            return c;
        });
    }

    function drawMini(g, x, y, v, l) {
        g.textAlign = 'center';
        g.fillStyle = '#ffffff'; g.font = '800 48px ' + CARD_FONT; g.fillText(v, x, y);
        g.fillStyle = 'rgba(255,255,255,.6)'; g.font = '500 22px ' + CARD_FONT; g.fillText(l, x, y + 30);
    }

    // Language name chips, wrapped, centered, with a level-coloured dot.
    function drawChips(g, y, mapW, mapX) {
        var items = state.langs.slice(0, 24);
        g.font = '600 26px ' + CARD_FONT; g.textBaseline = 'middle';
        var padX = 16, gap = 10, dot = 12, h = 44, lineGap = 12;
        // measure
        var chips = items.map(function (it) {
            var label = displayName(it.code);
            var w = dot + 8 + g.measureText(label).width + padX * 2;
            return { it: it, label: label, w: w };
        });
        var maxW = mapW; var lines = [[]], lineW = [0];
        chips.forEach(function (ch) {
            var li = lines.length - 1;
            if (lineW[li] + ch.w + gap > maxW && lines[li].length) { lines.push([]); lineW.push(0); li++; }
            lines[li].push(ch); lineW[li] += ch.w + gap;
        });
        lines = lines.slice(0, 4);
        lines.forEach(function (line, li) {
            var total = line.reduce(function (a, c) { return a + c.w + gap; }, 0) - gap;
            var x = (mapX + mapW / 2) - total / 2;
            var cy = y + li * (h + lineGap);
            line.forEach(function (ch) {
                roundRect(g, x, cy - h / 2, ch.w, h, h / 2);
                g.fillStyle = 'rgba(255,255,255,.07)'; g.fill();
                g.strokeStyle = hexA(levelColor(ch.it.level), .55); g.lineWidth = 1.5; g.stroke();
                g.fillStyle = levelColor(ch.it.level); g.beginPath(); g.arc(x + padX + dot / 2, cy, dot / 2, 0, 7); g.fill();
                g.fillStyle = 'rgba(255,255,255,.92)'; g.textAlign = 'left';
                g.fillText(ch.label, x + padX + dot + 8, cy + 1);
                x += ch.w + gap;
            });
        });
        g.textBaseline = 'alphabetic';
    }

    // ---- small canvas/dom utils -------------------------------------------
    function roundRect(g, x, y, w, h, r) {
        r = Math.min(r, w / 2, h / 2);
        g.beginPath();
        g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
        g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
    }
    function hexA(hex, a) {
        var m = /^#?([0-9a-f]{6})$/i.exec(hex); if (!m) return hex;
        var n = parseInt(m[1], 16);
        return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
    }
    function clip(g, text, maxW) {
        if (g.measureText(text).width <= maxW) return text;
        var t = text; while (t.length && g.measureText(t + '…').width > maxW) t = t.slice(0, -1);
        return t + '…';
    }
    function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

    // ---- open/close + mount -----------------------------------------------
    function open() { if (!overlay) buildPanel(); else renderBuilder(); overlay.classList.add('open'); setTimeout(function () { if (nameInput) addInput.focus(); }, 30); }
    function close() { if (overlay) overlay.classList.remove('open'); }

    // Register as a hidden .game-btn so the page's "Play ▾ (あそぶ)" menu lists us
    // alongside the other launchers. styles.css hides .game-btn; the menu builder
    // in wordmap.html enumerates every .game-btn and mirrors it into the dropdown.
    function mountButton() {
        var anchor = document.getElementById('quiz-open') || document.getElementById('langle-open') || document.getElementById('trivia-open');
        var container = anchor && anchor.parentNode;
        if (!container) return false;
        if (document.getElementById('mylang-open')) return true;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'mylang-open';
        btn.className = 'trivia-btn game-btn';
        btn.title = T('btn');
        btn.innerHTML = '<span aria-hidden="true">🌍</span><span class="trivia-btn-label">' + esc(T('btn')) + '</span>';
        btn.addEventListener('click', open);
        container.insertBefore(btn, anchor.nextSibling);   // sit after the last game launcher
        return true;
    }

    function relocalize() {
        var b = document.getElementById('mylang-open');
        if (b) { b.title = T('btn'); var l = b.querySelector('.trivia-btn-label'); if (l) l.textContent = T('btn'); }
        if (overlay && overlay.classList.contains('open')) renderBuilder();
    }

    function init() {
        injectStyles();
        // Expose our hash-param provider before the page first writes the hash.
        window.__langmap = window.__langmap || {};
        window.__langmap.getMyLangHashParam = getMyLangHashParam;
        restoreFromHash();
        if (!mountButton()) {
            var tries = 0, iv = setInterval(function () { if (mountButton() || ++tries > 40) clearInterval(iv); }, 150);
        }
        window.addEventListener('langmap:uichange', relocalize);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
