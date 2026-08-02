/* ============================================================================
 * my-languages.js — "言語パスポート / Language Passport" feature for the Word Map.
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
    // Banded by CEFR level: A = blue, B = green, C = orange, Native = gold.
    var LEVELS = [
        { key: 'A1', color: '#6aa6dd' },
        { key: 'A2', color: '#4d8fd0' },
        { key: 'B1', color: '#67bd6a' },
        { key: 'B2', color: '#4faa53' },
        { key: 'C1', color: '#ef9a3c' },
        { key: 'C2', color: '#e87a3d' },
        { key: 'Native', color: '#f4b62f' },
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
        en: { btn: 'Language Passport', title: 'Language Passport', name_ph: 'Your name (optional)', add_ph: 'Add a language you speak…', no_results: 'No matching language', empty: 'Add the languages you speak to see how many people you can reach.', intro: 'Pick the languages you speak and see how much of the world you can reach — then share your Language Passport.', s_langs: 'languages', s_reach: 'people reached', s_world: 'of the world', s_countries: 'countries', s_families: 'families', plot: 'Plot on map', clear_plot: 'Clear map', make_img: 'Create my passport', download: 'Download', share: 'Share', close: 'Close', back: 'Back', folded: '≈ counted within {name}', card_my: 'My Language Passport', card_of: 'languages', card_reach: 'people I can reach', card_world: 'of the world', card_note: 'cumulative reach — overlaps possible', card_countries: 'countries', card_families: 'families', spk: 'speakers', res_ph: 'Where you live (optional)', card_langs: 'Languages', card_more: '+{n} more', card_foot: 'As many worlds as the words you speak. Where to next?', share_text: 'My Language Passport 🌍 I can reach {pct} of the world!', copy: 'Copy link', copied: 'Link copied!', share_img: 'Share image' },
        ja: { btn: '言語パスポート', title: '言語パスポート', name_ph: 'お名前（任意）', add_ph: '話せる言語を追加…', no_results: '該当する言語がありません', empty: '話せる言語を追加すると、世界で何人に届くかがわかります。', intro: '話せる言語を選ぶと、世界のどれだけの人に「ことばが届く」かがわかります。あなたの言語パスポートをシェアしよう。', s_langs: '言語', s_reach: 'カバー人口', s_world: '世界人口比', s_countries: 'か国', s_families: '語族', plot: '地図にプロット', clear_plot: '地図をクリア', make_img: 'パスポートを作成', download: '保存', share: '共有', close: '閉じる', back: 'もどる', folded: '≈ {name}に含む', card_my: '言語パスポート', card_of: '言語', card_reach: '届く人の数', card_world: '世界人口の', card_note: '延べ人数（重複あり）', card_countries: 'か国', card_families: '語族', spk: '話者', res_ph: '現在の居住地（任意）', card_langs: '話せることば', card_more: '他 {n} 言語', card_foot: 'ことばの数だけ、出会える世界がある。次はどこへ？', share_text: '私の言語パスポート🌍 世界人口の{pct}に届く！', copy: 'リンクをコピー', copied: 'コピーしました', share_img: '画像で共有' },
        ko: { btn: '언어 여권', title: '언어 여권', name_ph: '이름 (선택)', add_ph: '구사하는 언어 추가…', no_results: '일치하는 언어 없음', empty: '구사하는 언어를 추가하면 전 세계 몇 명에게 닿는지 알 수 있어요.', intro: '구사하는 언어를 고르면 세계 몇 명에게 닿는지 알 수 있어요. 나의 언어 여권을 공유해 보세요.', s_langs: '개 언어', s_reach: '도달 인구', s_world: '세계 인구 대비', s_countries: '개국', s_families: '어족', plot: '지도에 표시', clear_plot: '지도 지우기', make_img: '여권 만들기', download: '저장', share: '공유', close: '닫기', back: '뒤로', folded: '≈ {name}에 포함', card_my: '언어 여권', card_of: '개 언어', card_reach: '내가 닿는 사람 수', card_world: '세계 인구의', card_note: '누적 (중복 가능)', card_countries: '개국', card_families: '어족', spk: '화자', res_ph: '거주지 (선택)', card_langs: '언어', card_more: '외 {n}개', card_foot: '아는 언어만큼 넓어지는 세계. 다음 여행지는?', share_text: '나의 언어 여권 🌍 세계 인구의 {pct}에게 닿아요!', copy: '링크 복사', copied: '링크 복사됨', share_img: '이미지 공유' },
        zh: { btn: '语言护照', title: '语言护照', name_ph: '你的名字（可选）', add_ph: '添加你会的语言…', no_results: '无匹配语言', empty: '添加你会的语言，看看你能触达全球多少人。', intro: '选择你会的语言，看看你的话能触达世界多少人，分享你的语言护照吧。', s_langs: '种语言', s_reach: '覆盖人口', s_world: '占世界人口', s_countries: '个国家', s_families: '语系', plot: '在地图上标注', clear_plot: '清除地图', make_img: '生成护照', download: '下载', share: '分享', close: '关闭', back: '返回', folded: '≈ 已计入{name}', card_my: '语言护照', card_of: '种语言', card_reach: '我能触达的人数', card_world: '占世界人口', card_note: '累计（可能重叠）', card_countries: '个国家', card_families: '语系', spk: '使用者', res_ph: '现居地（可选）', card_langs: '语言', card_more: '等 {n} 种', card_foot: '你会的语言，就是你能遇见的世界。下一站去哪？', share_text: '我的语言护照 🌍 可触达世界{pct}人口！', copy: '复制链接', copied: '已复制', share_img: '分享图片' },
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
    // Localized (UI-language) display name, via the LANG_NAMES table the page
    // loads per UI language; falls back to the English/roman name.
    function localName(code) {
        var u = ui(), base = u.split('_')[0];
        var LN = window.LANG_NAMES || {};
        var names = LN[u] || LN[base] || LN.en || {};
        return names[code] || romanName(code);
    }
    // Some localized names are shared by two codes — regional variants whose
    // qualifier is missing (fr_lu vs fr) or genuine duplicate entries (ono/onn).
    // dispName() keeps the plain localized name when it is unique, and appends a
    // distinguisher (primary country, else the code) only when it would collide,
    // so the picker never shows two identical rows. Memoized per UI language.
    var _dispMemo = null, _dispUi = null;
    function buildDisp() {
        var u = ui(); if (_dispMemo && _dispUi === u) return _dispMemo;
        var ld = LD(), byName = {};
        for (var c in ld) { var n = localName(c); (byName[n] = byName[n] || []).push(c); }
        var out = {};
        for (var name in byName) {
            var group = byName[name];
            if (group.length < 2) { out[group[0]] = name; continue; }
            var countries = group.map(primaryCountry);
            var uniqueCountry = countries.every(function (x, i) { return x && countries.indexOf(x) === i; });
            group.forEach(function (code, i) {
                var q = uniqueCountry ? countries[i] : code;
                out[code] = name + ' (' + q + ')';
            });
        }
        _dispMemo = out; _dispUi = u; return out;
    }
    function dispName(code) { return buildDisp()[code] || localName(code); }

    // ---- country flags -----------------------------------------------------
    // Map the entry's primary country to an ISO-3166 alpha-2, then to a flag
    // emoji (regional-indicator pair). Historical/ancient/regional homelands
    // (Roman Empire, Ancient Greece, "Levant"…) have no modern flag → ''.
    var C2 = {
        'China':'CN','Russia':'RU','India':'IN','Indonesia':'ID','Mexico':'MX','USA':'US','United States':'US','US':'US',
        'Canada':'CA','Australia':'AU','Italy':'IT','Papua New Guinea':'PG','Taiwan':'TW','Nigeria':'NG','Philippines':'PH',
        'Japan':'JP','Guatemala':'GT','Vietnam':'VN','Germany':'DE','Tanzania':'TZ','Myanmar':'MM','Pakistan':'PK','Kenya':'KE',
        'Spain':'ES','Peru':'PE','Iran':'IR','Ethiopia':'ET','United Kingdom':'GB','UK':'GB','Uganda':'UG','South Africa':'ZA',
        'Thailand':'TH','Nepal':'NP','Mali':'ML','Cameroon':'CM','Ghana':'GH','Azerbaijan':'AZ','Mozambique':'MZ',
        'Switzerland':'CH','Malaysia':'MY','Suriname':'SR','France':'FR','Afghanistan':'AF','Colombia':'CO','Senegal':'SN',
        'Greece':'GR','Turkey':'TR','Türkiye':'TR','South Sudan':'SS','Zambia':'ZM','Namibia':'NA','Algeria':'DZ',
        'South Korea':'KR','Bangladesh':'BD','Brazil':'BR','Israel':'IL','Finland':'FI','Poland':'PL','Norway':'NO','Ireland':'IE',
        'Georgia':'GE','Morocco':'MA','Eritrea':'ER','DR Congo':'CD','DRC':'CD','Liberia':'LR','Federated States of Micronesia':'FM',
        'Nicaragua':'NI','Luxembourg':'LU','Saudi Arabia':'SA','Ecuador':'EC','Lebanon':'LB',"Côte d'Ivoire":'CI','Belgium':'BE',
        'Angola':'AO','Venezuela':'VE','Netherlands':'NL','Iraq':'IQ','Zimbabwe':'ZW','Chile':'CL','Guinea':'GN','Sierra Leone':'SL',
        'Burkina Faso':'BF','Costa Rica':'CR','El Salvador':'SV','Syria':'SY','Jamaica':'JM','Haiti':'HT','North Korea':'KP',
        'Portugal':'PT','Mongolia':'MN','Laos':'LA','Ukraine':'UA','Sweden':'SE','Romania':'RO','New Zealand':'NZ','Fiji':'FJ',
        'Sri Lanka':'LK','Tajikistan':'TJ','Kyrgyzstan':'KG','Uzbekistan':'UZ','Sudan':'SD','Malawi':'MW','Slovakia':'SK',
        'Lithuania':'LT','Latvia':'LV','Estonia':'EE','Belize':'BZ','Argentina':'AR','Botswana':'BW','Panama':'PA',
        'French Polynesia':'PF','Cook Islands':'CK','Timor-Leste':'TL','Bhutan':'BT','Togo':'TG','Benin':'BJ','Croatia':'HR',
        'Honduras':'HN','Jordan':'JO','Palestine':'PS','Macau':'MO','French Guiana':'GF','Saint Lucia':'LC','Comoros':'KM',
        'Libya':'LY','Bahrain':'BH','Qatar':'QA','Mayotte':'YT','Puerto Rico':'PR','Dominican Republic':'DO','Uruguay':'UY',
        'Yemen':'YE','Wales':'GB','Cape Verde':'CV','Cabo Verde':'CV','Madagascar':'MG','Hungary':'HU','Denmark':'DK',
        'Armenia':'AM','Samoa':'WS','Tonga':'TO','Palau':'PW','Maldives':'MV','Moldova':'MD','Kazakhstan':'KZ','Turkmenistan':'TM',
        'Egypt':'EG','Mauritania':'MR','Tunisia':'TN','Malta':'MT','Chad':'TD','Somalia':'SO','Rwanda':'RW','Burundi':'BI',
        'Austria':'AT','Iceland':'IS','Belarus':'BY','Czech Republic':'CZ','Slovenia':'SI','Serbia':'RS','Bulgaria':'BG',
        'Albania':'AL','Bahamas':'BS','Aruba':'AW','Solomon Islands':'SB','Paraguay':'PY','Singapore':'SG','Faroe Islands':'FO',
        'Cuba':'CU','North Macedonia':'MK','Lesotho':'LS','Niger':'NE','Bolivia':'BO','Greenland':'GL','Niue':'NU','Tuvalu':'TV',
        'Marshall Islands':'MH','Kiribati':'KI','Guam':'GU','Vanuatu':'VU','Eswatini':'SZ','Equatorial Guinea':'GQ','Cambodia':'KH',
        'Isle of Man':'IM','Mauritius':'MU','Réunion':'RE','Seychelles':'SC','Guadeloupe':'GP','Tokelau':'TK','Hong Kong':'HK',
        'Wallis & Futuna':'WF','Central African Republic':'CF','Bosnia and Herzegovina':'BA','Djibouti':'DJ','Gabon':'GA',
        'Republic of the Congo':'CG','Guyana':'GY','Trinidad and Tobago':'TT','Nauru':'NR'
    };
    function iso2flag(cc) {
        if (!/^[A-Za-z]{2}$/.test(cc)) return '';
        cc = cc.toUpperCase();
        return String.fromCodePoint(0x1F1E6 + cc.charCodeAt(0) - 65) + String.fromCodePoint(0x1F1E6 + cc.charCodeAt(1) - 65);
    }
    function primaryCountry(code) {
        var s = metaOf(code).countries;
        if (!s || typeof s !== 'string') return '';
        var first = s.split(/[,/(]/)[0].replace(/^(Historical:|Originally|Greater|Across the)\s*/i, '').trim();
        return first;
    }
    function flagOf(code) { var cc = C2[primaryCountry(code)]; return cc ? iso2flag(cc) : ''; }
    function iso2Of(code) { return C2[primaryCountry(code)] || ''; }
    // Whether this browser actually renders flag emoji in colour (mobile: yes;
    // many desktops: no — they show the 2-letter code). Probed once by drawing a
    // flag to an offscreen canvas and checking for colour. Lets the card fall back
    // to a clean code badge where flags won't render.
    var _flagOK = null;
    function flagsSupported() {
        if (_flagOK !== null) return _flagOK;
        try {
            var cv = document.createElement('canvas'); cv.width = cv.height = 20;
            var cx = cv.getContext('2d'); cx.textBaseline = 'top'; cx.font = '18px ' + CARD_FONT;
            cx.fillText('🇯🇵', 0, 0);   // 🇯🇵
            var d = cx.getImageData(0, 0, 20, 20).data, colour = false;
            for (var i = 0; i < d.length; i += 4) {
                if (d[i + 3] > 0 && (Math.abs(d[i] - d[i + 1]) > 24 || Math.abs(d[i + 1] - d[i + 2]) > 24)) { colour = true; break; }
            }
            _flagOK = colour;
        } catch (e) { _flagOK = false; }
        return _flagOK;
    }

    // Short "N speakers" string in the UI language; '' when unknown (proto/extinct).
    function reachStr(code) {
        var r = reachOf(code);
        if (!r || r < 1) return '';
        return fmtBig(r) + ' ' + T('spk');
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
    // Pluricentric languages: regional standard varieties (fr_lu, en_in, es_mx,
    // pt_br…) are mutually intelligible with their parent, so they must fold into
    // one group and not multiply reach — "if you speak French you already reach
    // African/Belgian/Quebec French". Many such variety codes lack an explicit
    // iso6393, so fold them by code prefix. Excludes Arabic (ar_*: its "dialects"
    // are distinct ISO languages) and Chinese (zh_*: already grouped via iso).
    var PLURI = { fr: 'fra', en: 'eng', es: 'spa', pt: 'por', de: 'deu', nl: 'nld', it: 'ita' };
    function dedupKey(code) {
        var m = metaOf(code);
        if (m.iso6393) return m.iso6393;
        var pre = code.split('_')[0];
        if (PLURI[pre] && code.indexOf('_') > 0) return PLURI[pre];
        return baseIsoMap()[baseName(code)] || baseName(code);
    }
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
    var state = { name: '', residence: '', langs: [] };   // langs: [{code, level}]
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
    function levelIdx(k) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].key === k) return i; return 3; }
    function levelFromIdx(d) { var i = parseInt(d, 10); return (i >= 0 && i < LEVELS.length) ? LEVELS[i].key : 'B2'; }
    // URL-safe base64 of a Unicode string (no %-encoding, so CJK names stay short).
    function b64u(str) { try { return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); } catch (e) { return ''; } }
    function unb64u(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return decodeURIComponent(escape(atob(s))); }
    // Compact share param: base64url of "<p>\x1f<code+lvl joined by .>\x1f<name>\x1f<residence>",
    // e.g. "0\x1fko6.zh3.ja4\x1f趙\x1f東京". Tiny vs the old percent-encoded JSON.
    // \x1f (unit separator) can't occur in user text, so no escaping is needed.
    function getMyLangHashParam() {
        if (!state.langs.length) return '';
        var langs = state.langs.map(function (x) { return x.code + levelIdx(x.level); }).join('.');
        var parts = [_plotted ? 1 : 0, langs, state.name || '', state.residence || ''];
        while (parts.length > 2 && parts[parts.length - 1] === '') parts.pop();
        return 'ml=' + b64u(parts.join('\u001f'));
    }
    function syncHash() { try { if (window.__langmap && window.__langmap.updateHash) window.__langmap.updateHash(); } catch (e) {} }
    function rawMlParam() { var m = /(?:^|[#&])ml=([^&]*)/.exec(location.hash || ''); return m ? m[1] : null; }
    function restoreFromHash() {
        try {
            var raw = _bootParam || rawMlParam();
            if (!raw) return;
            if (/%|^\{/.test(raw) || /^%7B/i.test(raw)) {   // legacy percent-encoded JSON
                var obj = JSON.parse(decodeURIComponent(raw));
                if (!obj || !Array.isArray(obj.l)) return;
                state.name = typeof obj.n === 'string' ? obj.n : '';
                state.residence = typeof obj.r === 'string' ? obj.r : '';
                state.langs = obj.l.filter(function (p) { return p && p[0] && LD()[p[0]]; })
                    .map(function (p) { return { code: p[0], level: validLevel(p[1]) }; });
                if (obj.p && state.langs.length) { _plotted = true; replotWithRetry(0); }
                return;
            }
            var parts = unb64u(raw).split('\u001f');
            var langStr = parts[1] || '';
            state.langs = langStr ? langStr.split('.').filter(Boolean).map(function (tok) {
                return { code: tok.slice(0, -1), level: levelFromIdx(tok.slice(-1)) };
            }).filter(function (x) { return x.code && LD()[x.code]; }) : [];
            state.name = parts[2] != null ? parts[2] : '';
            state.residence = parts[3] != null ? parts[3] : '';
            if (parts[0] === '1' && state.langs.length) { _plotted = true; replotWithRetry(0); }
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
            '.mylang-head-left{display:flex;align-items:center;gap:10px;min-width:0}',
            '.mylang-head h2{margin:0;font-size:16px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
            '.mylang-back{display:inline-flex;align-items:center;gap:3px;background:none;border:0;cursor:pointer;color:inherit;font:inherit;font-size:14px;font-weight:600;padding:4px 6px;border-radius:8px;flex:none}',
            '.mylang-back:hover{background:rgba(90,140,220,.14)}',
            '.mylang-back svg{width:16px;height:16px}',
            '.mylang-x{background:none;border:0;font-size:22px;line-height:1;cursor:pointer;color:inherit;opacity:.6;flex:none}',
            '.mylang-x:hover{opacity:1}',
            '.mylang-body{padding:14px 16px;display:flex;flex-direction:column;gap:12px}',
            '.mylang-intro{font-size:13px;line-height:1.55;opacity:.72;margin:-2px 0 2px}',
            '.mylang-idrow{display:flex;gap:8px}',
            '.mylang-name{width:100%;min-width:0;box-sizing:border-box;padding:9px 11px;border:1px solid rgba(128,128,128,.35);border-radius:9px;font:inherit;background:transparent;color:inherit}',
            '@media (max-width:420px){.mylang-idrow{flex-direction:column}}',
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
            '.mylang-act{flex:1;min-width:120px;padding:11px;border-radius:10px;border:1px solid rgba(128,128,128,.3);background:transparent;color:inherit;font:inherit;font-weight:700;cursor:pointer;text-align:center}',
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
    var overlay, panelBody, nameInput, resInput, addInput, suggBox, listEl, statsEl, actionsEl, activeSugg = -1, suggData = [];

    function buildPanel() {
        overlay = document.createElement('div');
        overlay.className = 'mylang-overlay';
        overlay.innerHTML =
            '<div class="mylang-panel" role="dialog" aria-modal="true">' +
            '<div class="mylang-head"><div class="mylang-head-left">' +
            '<button class="mylang-back" type="button" style="display:none"></button><h2></h2>' +
            '</div><button class="mylang-x" aria-label="close">×</button></div>' +
            '<div class="mylang-body"></div></div>';
        panelBody = overlay.querySelector('.mylang-body');
        overlay.querySelector('.mylang-x').addEventListener('click', close);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });
        document.body.appendChild(overlay);
        renderBuilder();
    }

    // Header back button (‹ もどる): shown only in sub-views (e.g. the image
    // preview). onClick=null hides it.
    var BACK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';
    function showBack(onClick) {
        var b = overlay.querySelector('.mylang-back'); if (!b) return;
        if (onClick) {
            b.innerHTML = BACK_ICON + '<span>' + esc(T('back')) + '</span>';
            b.style.display = '';
            b.onclick = onClick;
        } else { b.style.display = 'none'; b.onclick = null; }
    }

    // The default "builder" view (name + add + list + stats + actions).
    function renderBuilder() {
        overlay.querySelector('.mylang-head h2').textContent = T('title');
        showBack(null);
        panelBody.innerHTML = '';

        // What is this? A one-line explanation of the passport's purpose.
        var intro = el('div', 'mylang-intro'); intro.textContent = T('intro');
        panelBody.appendChild(intro);

        // Name + residence, side by side (compact on mobile).
        var idRow = el('div', 'mylang-idrow');
        nameInput = el('input', 'mylang-name');
        nameInput.type = 'text'; nameInput.placeholder = T('name_ph'); nameInput.value = state.name;
        nameInput.addEventListener('input', function () { state.name = nameInput.value; syncHash(); });
        resInput = el('input', 'mylang-name');
        resInput.type = 'text'; resInput.placeholder = T('res_ph'); resInput.value = state.residence || '';
        resInput.addEventListener('input', function () { state.residence = resInput.value; syncHash(); });
        idRow.appendChild(nameInput); idRow.appendChild(resInput);
        panelBody.appendChild(idRow);

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
            nm.style.cssText = 'overflow:hidden;color:' + mainCol + ';-webkit-text-fill-color:' + mainCol;
            // Line 1: flag + UI-language name. Line 2: speaker count (kept minimal
            // for a clean mobile list — native script shows in the search picker).
            var loc = dispName(item.code), rc = reachStr(item.code), flag = flagOf(item.code);
            var nat = el('div', 'mylang-native'); nat.textContent = (flag ? flag + ' ' : '') + loc;
            nat.style.cssText = 'display:block;font-size:14px;font-weight:700;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:' + mainCol + ';-webkit-text-fill-color:' + mainCol;
            nm.appendChild(nat);
            if (rc) {
                var rr = el('div', 'mylang-rom'); rr.textContent = rc;
                rr.style.cssText = 'display:block;font-size:11px;line-height:1.2;opacity:.6;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:' + mainCol + ';-webkit-text-fill-color:' + mainCol;
                nm.appendChild(rr);
            }
            // Overlap note (dialect folded into its parent), on its own line.
            if (fi.foldedInto[item.code]) {
                var fn = el('div', 'mylang-fold'); fn.textContent = T('folded', { name: localName(fi.foldedInto[item.code]) });
                fn.style.cssText = 'display:block;font-size:10px;line-height:1.2;opacity:.5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:' + mainCol + ';-webkit-text-fill-color:' + mainCol;
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
        var img = el('button', 'mylang-act primary'); img.textContent = T('make_img'); img.disabled = state.langs.length === 0;
        img.addEventListener('click', openImage);
        actionsEl.appendChild(img);
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
            // Match on English name, native, the UI-language name, and code.
            var hay = ((l.name || '') + ' ' + (l.native || '') + ' ' + localName(c) + ' ' + c).toLowerCase();
            if (hay.indexOf(q) !== -1) out.push(c);
        }
        // prefer prefix matches on any displayed name, then by reach (prominent first)
        function isPrefix(code) {
            var l = ld[code];
            return (l.name || '').toLowerCase().indexOf(q) === 0 ||
                (l.native || '').toLowerCase().indexOf(q) === 0 ||
                localName(code).toLowerCase().indexOf(q) === 0;
        }
        out.sort(function (a, b) {
            var pa = isPrefix(a) ? 0 : 1, pb = isPrefix(b) ? 0 : 1;
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
            var flag = flagOf(code), loc = dispName(code), nat = displayName(code), rc = reachStr(code);
            var sub = [];
            if (nat && nat !== loc && nat !== localName(code)) sub.push(nat);
            if (rc) sub.push(rc);
            it.innerHTML = '<span class="mylang-sugg-native">' + (flag ? esc(flag) + ' ' : '') + esc(loc) + '</span>' +
                '<span class="mylang-sugg-rom">' + esc(sub.join(' · ')) + '</span>';
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
        // Show a "generating" state, then the image.
        overlay.querySelector('.mylang-head h2').textContent = T('make_img');
        panelBody.innerHTML = '<div class="mylang-empty">…</div>';
        drawCard().then(function (canvas) {
            renderImageView(canvas);
        }).catch(function () {
            renderImageView(null);
        });
    }

    // Whether this browser can actually share an image FILE (mostly mobile;
    // desktop Chrome/Firefox return false, so we hide Share there and rely on
    // Download instead of offering a button that silently does nothing).
    function canShareImage() {
        try { return !!(navigator.canShare && navigator.canShare({ files: [new File([new Blob([''], { type: 'image/png' })], 'a.png', { type: 'image/png' })] })); }
        catch (e) { return false; }
    }

    function renderImageView(canvas) {
        overlay.querySelector('.mylang-head h2').textContent = T('make_img');
        showBack(renderBuilder);   // ‹ もどる lives in the header now
        panelBody.innerHTML = '';
        var wrap = el('div', 'mylang-imgwrap');
        if (canvas) {
            var img = new Image();
            try { img.src = canvas.toDataURL('image/png'); } catch (e) {}
            wrap.appendChild(img);
            var acts = el('div', 'mylang-actions'); acts.style.width = '100%';
            var dl = el('button', 'mylang-act primary'); dl.textContent = T('download');
            dl.addEventListener('click', function () { downloadCanvas(canvas); });
            var sh = el('button', 'mylang-act'); sh.textContent = T('share');
            sh.addEventListener('click', function () { openSharePopover(canvas); });
            acts.appendChild(dl); acts.appendChild(sh);
            wrap.appendChild(acts);
            var note = el('div', 'mylang-note'); note.textContent = T('card_note'); wrap.appendChild(note);
        } else {
            var e = el('div', 'mylang-empty'); e.textContent = '⚠'; wrap.appendChild(e);
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
            var data = { files: [file], title: T('card_my'), text: shareText() };
            if (navigator.canShare && navigator.canShare(data)) {
                navigator.share(data).catch(function () {});
            } else { downloadCanvas(canvas); }
        }, 'image/png');
    }

    // Shareable passport URL (the #ml= hash reconstructs the selection) + text.
    function passportUrl() {
        var p = getMyLangHashParam();
        return location.origin + location.pathname + (p ? '#' + p : '');
    }
    function shareText() {
        var s = stats();
        var pct = s.worldPct >= 100 ? '100%+' : (s.worldPct >= 10 ? Math.round(s.worldPct) : s.worldPct.toFixed(1)) + '%';
        return T('share_text', { pct: pct, reach: fmtBig(s.reach) });
    }
    function toast(msg) {
        var t = document.createElement('div');
        t.textContent = msg;
        t.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:100003;background:#222;color:#fff;padding:9px 16px;border-radius:999px;font-size:13px;box-shadow:0 4px 16px rgba(0,0,0,.25)';
        document.body.appendChild(t); setTimeout(function () { t.remove(); }, 1800);
    }
    // Per-network share links (works on desktop, unlike the Web Share API) plus
    // copy-link and — where supported — native image share.
    function openSharePopover(canvas) {
        var url = passportUrl(), text = shareText(), enc = encodeURIComponent;
        var targets = [
            { label: 'X', color: '#000', href: 'https://twitter.com/intent/tweet?text=' + enc(text) + '&url=' + enc(url) },
            { label: 'Facebook', color: '#1877f2', href: 'https://www.facebook.com/sharer/sharer.php?u=' + enc(url) },
            { label: 'LINE', color: '#06c755', href: 'https://social-plugins.line.me/lineit/share?url=' + enc(url) + '&text=' + enc(text) }
        ];
        var back = document.createElement('div');
        back.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:100001;display:flex;align-items:center;justify-content:center;padding:20px;font-family:inherit';
        var box = document.createElement('div');
        box.style.cssText = 'background:#fff;color:#1a2230;border-radius:14px;padding:20px;max-width:340px;width:100%;box-shadow:0 12px 40px rgba(0,0,0,.3)';
        box.innerHTML = '<div style="font-weight:700;font-size:15px;margin-bottom:14px">' + esc(T('share')) + '</div>';
        var grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px';
        targets.forEach(function (t) {
            var a = document.createElement('a');
            a.href = t.href; a.target = '_blank'; a.rel = 'noopener'; a.textContent = t.label;
            a.style.cssText = 'display:block;text-align:center;padding:12px 6px;border-radius:9px;background:' + t.color + ';color:#fff;text-decoration:none;font-size:13px;font-weight:700';
            a.addEventListener('click', function () { setTimeout(function () { back.remove(); }, 50); });
            grid.appendChild(a);
        });
        box.appendChild(grid);
        function fullBtn(label, cb, primary) {
            var b = document.createElement('button'); b.type = 'button'; b.textContent = label;
            b.style.cssText = 'margin-top:8px;width:100%;padding:11px;border-radius:9px;cursor:pointer;font-size:14px;font-weight:600;' +
                (primary ? 'border:0;background:#3f6fd6;color:#fff' : 'border:1px solid #d0d3dc;background:#f6f7f9;color:#333');
            b.addEventListener('click', cb); box.appendChild(b); return b;
        }
        if (canShareImage()) fullBtn(T('share_img'), function () { back.remove(); shareCanvas(canvas); }, true);
        fullBtn(T('copy'), function () {
            (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject())
                .then(function () { toast(T('copied')); back.remove(); })
                .catch(function () { window.prompt(T('copy'), url); });
        });
        fullBtn(T('close'), function () { back.remove(); });
        back.appendChild(box);
        back.addEventListener('click', function (e) { if (e.target === back) back.remove(); });
        document.body.appendChild(back);
    }

    // Card palette — warm "passport" look.
    var CREAM = '#f7f1e3', INK = '#173a5b', MUTE = '#8f887a', GOLD = '#f4b62f', ORANGE = '#e8823a', STAMP = '#d38a7c';

    // Locale "approximately" prefix for speaker counts.
    function approx() { var u = ui().split('_')[0]; return u === 'ja' || u === 'yue' ? '約' : u === 'zh' ? '约' : u === 'ko' ? '약 ' : '~'; }

    // Draw the whole card. Returns a Promise<canvas>. Pure 2D canvas, no external
    // assets: the only emoji are flags (+ nothing else); every other glyph — earth,
    // stamp, pin, person, chevron, suitcase, sparkles — is drawn, so it renders the
    // same everywhere.
    function drawCard() {
        var c = document.createElement('canvas'); c.width = CARD_W; c.height = CARD_H;
        var g = c.getContext('2d');
        var s = stats();
        var pad = 60;

        // rounded cream page (transparent corners)
        g.clearRect(0, 0, CARD_W, CARD_H);
        g.save(); roundRect(g, 0, 0, CARD_W, CARD_H, 46); g.clip();
        g.fillStyle = CREAM; g.fillRect(0, 0, CARD_W, CARD_H);

        var uiName = (state.name || '').trim(), res = (state.residence || '').trim();

        // ---- header: tag, name, residence, stamp ----
        g.textAlign = 'left'; g.textBaseline = 'alphabetic';
        g.font = '800 33px ' + CARD_FONT; g.fillStyle = ORANGE;
        g.fillText(T('title'), pad, 78);
        drawSparkle(g, pad + g.measureText(T('title')).width + 24, 58, 15, GOLD);
        g.fillStyle = INK; g.font = '800 90px ' + CARD_FONT;
        g.fillText(clip(g, uiName || T('card_my'), 540), pad, 178);
        if (res) {
            drawPin(g, pad + 11, 206, 21, '#e0574b');
            g.fillStyle = MUTE; g.font = '600 34px ' + CARD_FONT; g.textAlign = 'left'; g.textBaseline = 'alphabetic';
            g.fillText(clip(g, res, 430), pad + 34, 217);
        }
        drawStamp(g, CARD_W - 350, 44, 292, 168);

        // ---- hero panel: reach text (left) + earth (right) ----
        var hx = pad, hy = 246, hw = CARD_W - pad * 2, hh = 236;
        softPanel(g, hx, hy, hw, hh, 26, '#fffaf0');
        var tx = hx + 44, mid = hy + hh / 2;
        g.textAlign = 'left'; g.fillStyle = INK; g.font = '600 30px ' + CARD_FONT;
        g.fillText(T('card_world'), tx, mid - 52);
        var num = fmtBig(s.reach);
        g.font = '800 82px ' + CARD_FONT; g.fillText(num, tx, mid + 22);
        var nw = g.measureText(num).width;
        g.strokeStyle = GOLD; g.lineWidth = 9; g.lineCap = 'round';
        g.beginPath(); g.moveTo(tx, mid + 34); g.lineTo(tx + nw, mid + 34); g.stroke(); g.lineCap = 'butt';
        g.fillStyle = MUTE; g.font = '600 26px ' + CARD_FONT; g.fillText(T('card_reach'), tx, mid + 74);
        drawEarth(g, hx + hw - 148, mid, 92, s.worldPct);

        // ---- language list (the star) ----
        var listY = hy + hh + 58;
        drawMiniGlobe(g, pad + 15, listY - 21, 17, INK);
        g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillStyle = INK; g.font = '800 34px ' + CARD_FONT;
        g.fillText(T('card_langs'), pad + 42, listY - 8);
        var rowsBottom = drawLangRows(g, pad, listY + 12, CARD_W - pad * 2, CARD_H - 210);

        // ---- footer tagline box (hugs the list) ----
        var fh = 100, fy = rowsBottom + 18, fx = pad, fw = CARD_W - pad * 2;
        softPanel(g, fx, fy, fw, fh, 24, '#f0e6cf');
        drawMiniGlobe(g, fx + 44, fy + fh / 2, 21, '#3f7fc4');
        g.fillStyle = INK; g.font = '600 27px ' + CARD_FONT; g.textAlign = 'left'; g.textBaseline = 'middle';
        wrapText(g, T('card_foot'), fx + 82, fy + fh / 2, fw - 220, 34);
        drawSuitcase(g, fx + fw - 92, fy + fh / 2 - 4, 58);
        drawSparkle(g, fx + fw - 44, fy + 28, 10, GOLD);

        // ---- brand footer ----
        g.textBaseline = 'alphabetic';
        var brand = 'LangMap', dom = 'langmap.heuron.com';
        g.font = '800 30px ' + CARD_FONT; var bw = g.measureText(brand).width;
        g.font = '500 26px ' + CARD_FONT; var dw = g.measureText(dom).width;
        var totalW = 30 + 12 + bw + 26 + dw, startX = (CARD_W - totalW) / 2, byy = Math.min(CARD_H - 46, fy + fh + 56);
        drawPinLogo(g, startX + 14, byy - 8, 15);
        g.textAlign = 'left'; g.fillStyle = INK; g.font = '800 30px ' + CARD_FONT;
        g.fillText(brand, startX + 42, byy);
        g.fillStyle = MUTE; g.font = '500 26px ' + CARD_FONT;
        g.fillText(dom, startX + 42 + bw + 26, byy);

        g.restore();
        return Promise.resolve(c);
    }

    // Language rows — flag tile + name (left), level pill + speaker count + chevron
    // (right). Returns the y at which the list ends (so the footer can hug it).
    function drawLangRows(g, x, y, w, maxBottom) {
        if (!state.langs.length) return y;
        var rh = 80, gap = 12;
        var maxRows = Math.max(1, Math.floor((maxBottom - y) / rh));
        var show = state.langs, extra = 0;
        if (state.langs.length > maxRows) { show = state.langs.slice(0, maxRows - 1); extra = state.langs.length - show.length; }
        // Fixed columns so the pills and counts line up down the list.
        var pillX = x + w - 372;        // level pill left edge
        var countRightX = x + w - 52;   // speaker count right edge
        var personCX = x + w - 26;      // person icon
        var flags = flagsSupported();
        show.forEach(function (it, i) {
            var top = y + i * rh, cy = top + (rh - gap) / 2, col = levelColor(it.level);
            softPanel(g, x, top, w, rh - gap, 20, '#ffffff');
            // flag / code tile
            g.fillStyle = '#f3efe6'; roundRect(g, x + 16, cy - 26, 52, 52, 14); g.fill();
            var iso2 = iso2Of(it.code);
            g.textAlign = 'center'; g.textBaseline = 'middle';
            if (flags && flagOf(it.code)) { g.font = '34px ' + CARD_FONT; g.fillStyle = INK; g.fillText(flagOf(it.code), x + 42, cy + 1); }
            else if (iso2) { g.font = '700 24px ' + CARD_FONT; g.fillStyle = '#6b6455'; g.fillText(iso2, x + 42, cy + 1); }
            else { drawMiniGlobe(g, x + 42, cy, 15, '#9bb5c9'); }
            // name (clipped to the pill column)
            g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = INK; g.font = '700 33px ' + CARD_FONT;
            g.fillText(clip(g, dispName(it.code), pillX - (x + 88) - 18), x + 88, cy + 1);
            // level pill (fixed left edge)
            g.font = '700 26px ' + CARD_FONT;
            var pillW = g.measureText(it.level).width + 36;
            roundRect(g, pillX, cy - 21, pillW, 42, 21); g.fillStyle = col; g.fill();
            g.fillStyle = '#ffffff'; g.textAlign = 'center'; g.fillText(it.level, pillX + pillW / 2, cy + 1);
            // speaker count (fixed right edge) + person icon
            if (reachOf(it.code) > 0) {
                g.textAlign = 'right'; g.fillStyle = MUTE; g.font = '500 26px ' + CARD_FONT;
                g.fillText(approx() + fmtBig(reachOf(it.code)), countRightX, cy + 1);
                drawPerson(g, personCX, cy, 26, '#b6af9d');
            }
        });
        if (extra > 0) {
            var ey = y + show.length * rh + (rh - gap) / 2;
            g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillStyle = MUTE; g.font = '600 28px ' + CARD_FONT;
            g.fillText(T('card_more', { n: extra }), x + 24, ey);
        }
        g.textBaseline = 'alphabetic';
        return y + (show.length + (extra > 0 ? 1 : 0)) * rh - gap;
    }

    // ---- card drawing primitives ------------------------------------------
    function softPanel(g, x, y, w, h, r, fill) {
        g.save(); g.shadowColor = 'rgba(70,55,25,0.12)'; g.shadowBlur = 16; g.shadowOffsetY = 5;
        roundRect(g, x, y, w, h, r); g.fillStyle = fill; g.fill(); g.restore();
    }
    // Simplified continent outlines ([lon, lat]), orthographically projected onto
    // the globe so the earth reads as real land (Africa-centred view).
    var CONTINENTS = [
        // Africa
        [[-6, 35], [10, 37], [24, 32], [32, 31], [35, 23], [38, 15], [43, 11], [51, 12], [45, 5], [42, -1], [40, -10], [35, -22], [26, -34], [19, -35], [13, -23], [12, -17], [9, -5], [8, 4], [3, 6], [-8, 4], [-12, 8], [-16, 14], [-17, 21], [-13, 28], [-10, 31], [-6, 35]],
        // Eurasia (Europe + Asia + Arabia + India)
        [[-9, 43], [-2, 49], [3, 52], [8, 54], [8, 58], [13, 55], [20, 55], [22, 60], [15, 65], [24, 71], [38, 66], [45, 68], [60, 70], [73, 73], [90, 75], [105, 77], [130, 73], [142, 72], [160, 69], [163, 61], [155, 58], [142, 54], [135, 48], [130, 43], [128, 38], [122, 40], [121, 31], [110, 22], [106, 21], [108, 15], [105, 9], [103, 2], [100, 7], [98, 16], [92, 22], [89, 22], [80, 13], [78, 8], [73, 17], [68, 24], [61, 25], [57, 25], [50, 20], [45, 13], [43, 12], [40, 15], [35, 23], [34, 29], [36, 37], [28, 41], [22, 40], [19, 42], [13, 45], [8, 44], [3, 43], [-9, 43]],
        // Madagascar
        [[46, -12], [50, -15], [49, -25], [45, -25], [43, -18], [46, -12]],
        // Greenland
        [[-45, 60], [-22, 70], [-20, 76], [-45, 83], [-58, 76], [-52, 66], [-45, 60]],
        // South America (eastern part, left limb)
        [[-35, -6], [-40, -14], [-48, -25], [-58, -34], [-72, -45], [-70, -20], [-62, -5], [-52, 2], [-50, 6], [-42, 0], [-35, -6]]
    ];
    var _toRad = Math.PI / 180;
    function drawContinent(g, poly, lon0, lat0, R, cx, cy) {
        var a0 = lat0 * _toRad, b0 = lon0 * _toRad, started = false;
        g.beginPath();
        for (var i = 0; i < poly.length; i++) {
            var lo = poly[i][0] * _toRad, la = poly[i][1] * _toRad;
            var cosc = Math.sin(a0) * Math.sin(la) + Math.cos(a0) * Math.cos(la) * Math.cos(lo - b0);
            if (cosc < 0.03) { started = false; continue; }   // back hemisphere / limb
            var x = cx + R * Math.cos(la) * Math.sin(lo - b0);
            var y = cy - R * (Math.cos(a0) * Math.sin(la) - Math.sin(a0) * Math.cos(la) * Math.cos(lo - b0));
            if (!started) { g.moveTo(x, y); started = true; } else g.lineTo(x, y);
        }
        g.fill();
    }
    // Earth: blue ocean + projected continents + sphere shading + gold ring + %.
    function drawEarth(g, cx, cy, r, pct) {
        var oc = g.createRadialGradient(cx - r * 0.32, cy - r * 0.36, r * 0.15, cx, cy, r);
        oc.addColorStop(0, '#5aa9e2'); oc.addColorStop(1, '#2b6fbf');
        g.fillStyle = oc; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill();
        g.save(); g.beginPath(); g.arc(cx, cy, r, 0, 7); g.clip();
        var R = r * 0.99, lon0 = 20, lat0 = 8;
        g.fillStyle = '#5bb85a';
        for (var k = 0; k < CONTINENTS.length; k++) drawContinent(g, CONTINENTS[k], lon0, lat0, R, cx, cy);
        // specular highlight (upper-left) + depth shadow (lower-right)
        var hl = g.createRadialGradient(cx - r * 0.34, cy - r * 0.4, 0, cx - r * 0.34, cy - r * 0.4, r);
        hl.addColorStop(0, 'rgba(255,255,255,.30)'); hl.addColorStop(0.55, 'rgba(255,255,255,0)');
        g.fillStyle = hl; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill();
        var sh = g.createRadialGradient(cx + r * 0.4, cy + r * 0.46, r * 0.2, cx, cy, r * 1.15);
        sh.addColorStop(0, 'rgba(2,18,45,0)'); sh.addColorStop(1, 'rgba(2,14,38,.36)');
        g.fillStyle = sh; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill();
        g.restore();
        var frac = Math.max(0, Math.min(1, pct / 100));
        g.lineWidth = 14; g.lineCap = 'round';
        g.strokeStyle = 'rgba(0,0,0,.07)'; g.beginPath(); g.arc(cx, cy, r + 15, 0, 7); g.stroke();
        if (frac > 0) { g.strokeStyle = GOLD; g.beginPath(); g.arc(cx, cy, r + 15, -Math.PI / 2, -Math.PI / 2 + frac * 2 * Math.PI); g.stroke(); }
        g.lineCap = 'butt';
        var t = (pct >= 100 ? '100%+' : (pct >= 10 ? Math.round(pct) : pct.toFixed(1)) + '%');
        g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '800 ' + Math.round(r * 0.52) + 'px ' + CARD_FONT;
        g.save(); g.shadowColor = 'rgba(0,0,0,.28)'; g.shadowBlur = 8; g.fillStyle = '#ffffff'; g.fillText(t, cx, cy + 2); g.restore();
        g.textBaseline = 'alphabetic';
    }
    function drawMiniGlobe(g, cx, cy, r, color) {
        g.fillStyle = color; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill();
        g.save(); g.beginPath(); g.arc(cx, cy, r, 0, 7); g.clip();
        g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 1.6;
        g.beginPath(); g.moveTo(cx - r, cy); g.lineTo(cx + r, cy); g.stroke();
        g.beginPath(); if (g.ellipse) g.ellipse(cx, cy, r * 0.5, r, 0, 0, 7); g.stroke();
        g.restore();
    }
    function drawStamp(g, x, y, w, h) {
        g.save(); g.translate(x + w / 2, y + h / 2); g.rotate(-0.07); g.translate(-(x + w / 2), -(y + h / 2));
        g.globalAlpha = 0.9; g.strokeStyle = STAMP; g.fillStyle = STAMP;
        if (g.setLineDash) g.setLineDash([2, 7]); g.lineWidth = 3; roundRect(g, x, y, w, h, 16); g.stroke();
        if (g.setLineDash) g.setLineDash([]); g.lineWidth = 2; roundRect(g, x + 11, y + 11, w - 22, h - 22, 11); g.stroke();
        g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = '800 27px ' + CARD_FONT;
        g.fillText('LANGUAGE', x + w / 2, y + 36); g.fillText('PASSPORT', x + w / 2, y + h - 34);
        var mx = x + w / 2, my = y + h / 2 + 2;
        g.lineWidth = 2.4; g.beginPath(); g.arc(mx, my, 25, 0, 7); g.stroke();
        g.beginPath(); g.moveTo(mx - 25, my); g.lineTo(mx + 25, my); g.stroke();
        g.beginPath(); if (g.ellipse) g.ellipse(mx, my, 12, 25, 0, 0, 7); g.stroke();
        g.restore();
    }
    function drawSparkle(g, cx, cy, s, color) {
        g.fillStyle = color; g.beginPath();
        g.moveTo(cx, cy - s); g.quadraticCurveTo(cx + s * 0.16, cy - s * 0.16, cx + s, cy);
        g.quadraticCurveTo(cx + s * 0.16, cy + s * 0.16, cx, cy + s); g.quadraticCurveTo(cx - s * 0.16, cy + s * 0.16, cx - s, cy);
        g.quadraticCurveTo(cx - s * 0.16, cy - s * 0.16, cx, cy - s); g.closePath(); g.fill();
    }
    function drawPin(g, cx, cy, s, color) {
        g.fillStyle = color;
        g.beginPath(); g.arc(cx, cy - s * 0.3, s * 0.55, 0, 7); g.fill();
        g.beginPath(); g.moveTo(cx - s * 0.42, cy - s * 0.12); g.lineTo(cx + s * 0.42, cy - s * 0.12); g.lineTo(cx, cy + s * 0.72); g.closePath(); g.fill();
        g.fillStyle = '#ffffff'; g.beginPath(); g.arc(cx, cy - s * 0.3, s * 0.2, 0, 7); g.fill();
    }
    function drawPinLogo(g, cx, cy, s) {
        var grd = g.createLinearGradient(cx - s, cy - s, cx + s, cy + s);
        grd.addColorStop(0, '#3f7fc4'); grd.addColorStop(1, '#5cb85a');
        g.fillStyle = grd;
        g.beginPath(); g.arc(cx, cy - s * 0.3, s * 0.6, 0, 7); g.fill();
        g.beginPath(); g.moveTo(cx - s * 0.46, cy - s * 0.1); g.lineTo(cx + s * 0.46, cy - s * 0.1); g.lineTo(cx, cy + s * 0.8); g.closePath(); g.fill();
        g.fillStyle = '#ffffff'; g.beginPath(); g.arc(cx, cy - s * 0.3, s * 0.22, 0, 7); g.fill();
    }
    function drawPerson(g, cx, cy, size, color) {
        g.fillStyle = color;
        g.beginPath(); g.arc(cx, cy - size * 0.24, size * 0.2, 0, 7); g.fill();
        g.beginPath(); g.arc(cx, cy + size * 0.34, size * 0.42, Math.PI, 2 * Math.PI); g.fill();
    }
    function drawChevron(g, x, cy, s, color) {
        g.strokeStyle = color; g.lineWidth = 4; g.lineCap = 'round'; g.lineJoin = 'round';
        g.beginPath(); g.moveTo(x - s * 0.5, cy - s * 0.62); g.lineTo(x + s * 0.25, cy); g.lineTo(x - s * 0.5, cy + s * 0.62); g.stroke();
        g.lineCap = 'butt';
    }
    function drawSuitcase(g, cx, cy, size) {
        var w = size, h = size * 0.82;
        g.strokeStyle = '#8a5a3c'; g.lineWidth = 5; g.lineCap = 'round';
        g.beginPath(); g.arc(cx, cy - h * 0.5, w * 0.2, Math.PI, 2 * Math.PI); g.stroke(); g.lineCap = 'butt';
        g.fillStyle = '#b5794a'; roundRect(g, cx - w / 2, cy - h * 0.36, w, h, 10); g.fill();
        g.strokeStyle = '#8a5a3c'; g.lineWidth = 3; roundRect(g, cx - w / 2, cy - h * 0.36, w, h, 10); g.stroke();
        g.beginPath(); g.moveTo(cx - w / 2, cy + h * 0.06); g.lineTo(cx + w / 2, cy + h * 0.06); g.stroke();
    }
    // Wrap text into up to 2 lines (char-based; fine for CJK + short latin), centred on cy.
    function wrapText(g, text, x, cy, maxW, lineH) {
        var lines = [], cur = '';
        for (var i = 0; i < text.length; i++) {
            var t = cur + text[i];
            if (g.measureText(t).width > maxW && cur) { lines.push(cur); cur = text[i]; } else cur = t;
        }
        if (cur) lines.push(cur);
        lines = lines.slice(0, 2);
        var startY = cy - (lines.length - 1) * lineH / 2;
        for (var k = 0; k < lines.length; k++) g.fillText(lines[k], x, startY + k * lineH);
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
        try { if (/mldebug/.test(location.hash + location.search)) window.__mlTest = { drawCard: drawCard, state: state }; } catch (e) {}
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
