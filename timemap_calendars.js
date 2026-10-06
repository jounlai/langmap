/**
 * timemap_calendars.js — calendar definitions + date engine for TimeMap.
 *
 * Every calendar takes one Gregorian day {y, m, d} and returns
 *   { native, latin, tr }  — the date as its own users write it, a Latin
 *   reading, and `tr`, the pieces localize() needs to say the same date in
 *   the reader's UI language — or null before the calendar existed.
 *
 * Intl (`ca=` keys) supplies the arithmetic for japanese, roc, buddhist,
 * chinese, dangi, hebrew, islamic-umalqura, persian, indian, ethiopic and
 * coptic, so leap months and month lengths are ICU's. Intl is NOT trusted
 * for wording: Chrome prints "ERA1" for the Ethiopian era and "M08" for
 * Chinese months in most locales, so every UI-language string is built
 * from timemap_i18n/<lang>.js (month names, year templates, date order).
 * The rest is arithmetic: Julian, Roman, Byzantine, Amazigh, Maya,
 * Bengali (Bangladesh 2019 rule), French Republican (Romme rule).
 *
 * status: 'current'    — in civil or religious use today
 *         'historical' — abandoned; shown as if it had kept counting
 *         'gregorian'  — the world standard, shown only at a few places
 *
 * Loaded by timemap.html; also require()-able from Node for checks.
 */
(function (root) {
    'use strict';

    /* ---------- Day arithmetic ---------- */
    // Julian Day Number of a proleptic Gregorian date.
    function gregToJdn(y, m, d) {
        const a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
        return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4)
            - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
    }
    function jdnToJulian(j) {
        const c = j + 32082, d = Math.floor((4 * c + 3) / 1461), e = c - Math.floor(1461 * d / 4);
        const m = Math.floor((5 * e + 2) / 153);
        return { y: d - 4800 + Math.floor(m / 10), m: m + 3 - 12 * Math.floor(m / 10), d: e - Math.floor((153 * m + 2) / 5) + 1 };
    }
    const julianOf = g => jdnToJulian(gregToJdn(g.y, g.m, g.d));
    const isGregLeap = y => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    const mod = (a, n) => ((a % n) + n) % n;
    // UTC noon, so no time zone can push the day across midnight.
    const toDate = g => { const t = new Date(Date.UTC(2000, g.m - 1, g.d, 12)); t.setUTCFullYear(g.y); return t; };

    /* ---------- Numerals ---------- */
    function roman(n) {
        if (n <= 0 || n >= 4000) return String(n);
        const R = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
        let s = ''; for (const [v, r] of R) while (n >= v) { s += r; n -= v; } return s;
    }
    // Chinese numerals, "一百一十八" / "一百零一" style (not the 百十八 shorthand).
    function han(n) {
        const D = '〇一二三四五六七八九';
        if (n < 10) return D[n];
        let s = '', zero = false, started = false;
        for (const [v, u] of [[1000,'千'],[100,'百'],[10,'十']]) {
            const q = Math.floor(n / v); n %= v;
            if (q) { if (zero) s += '零'; s += D[q] + u; zero = false; started = true; }
            else if (started) zero = true;
        }
        if (n) { if (zero) s += '零'; s += D[n]; }
        if (s.startsWith('一十')) s = s.slice(1);   // 十八, not 一十八
        return s;
    }
    // Lunar day names 初一 … 三十.
    function lunarDay(d) {
        const D = '一二三四五六七八九十';
        if (d <= 10) return '初' + D[d - 1];
        if (d < 20) return '十' + D[d - 11];
        if (d === 20) return '二十';
        if (d < 30) return '廿' + D[d - 21];
        return '三十';
    }
    const lunarMonthHan = m => m === 1 ? '正' : han(m);
    // Greek alphabetic numerals with keraia (͵ for thousands).
    function greekNum(n) {
        const U = ['', 'α','β','γ','δ','ε','ϛ','ζ','η','θ'], T = ['', 'ι','κ','λ','μ','ν','ξ','ο','π','ϟ'],
              H = ['', 'ρ','σ','τ','υ','φ','χ','ψ','ω','ϡ'];
        let s = '';
        if (n >= 1000) { s += '͵' + U[Math.floor(n / 1000)]; n %= 1000; }
        s += H[Math.floor(n / 100)] + T[Math.floor(n / 10) % 10] + U[n % 10];
        return s + 'ʹ';
    }
    // Hebrew letter numerals as used in dates: 24 = כ״ד, 787 = תשפ״ז.
    // 15 and 16 are written ט״ו / ט״ז to avoid spelling a divine name.
    function hebrewNumeral(n) {
        const H = [[400,'ת'],[300,'ש'],[200,'ר'],[100,'ק'],[90,'צ'],[80,'פ'],[70,'ע'],[60,'ס'],[50,'נ'],[40,'מ'],[30,'ל'],[20,'כ'],[10,'י'],
                   [9,'ט'],[8,'ח'],[7,'ז'],[6,'ו'],[5,'ה'],[4,'ד'],[3,'ג'],[2,'ב'],[1,'א']];
        let s = '';
        const r = n % 100;
        if (r === 15 || r === 16) n -= r;
        for (const [v, c] of H) while (n >= v) { s += c; n -= v; }
        if (r === 15) s += 'טו'; else if (r === 16) s += 'טז';
        return s.length === 1 ? s + '׳' : s.slice(0, -1) + '״' + s.slice(-1);
    }
    const localeDigits = (n, loc) => Number(n).toLocaleString(loc, { useGrouping: false });
    const thaiDigits = n => localeDigits(n, 'th-TH-u-nu-thai');
    const devaDigits = n => localeDigits(n, 'hi-IN-u-nu-deva');
    const thaiMonth = D => fmt('th-TH', { day: 'numeric', month: 'long' }).formatToParts(D).find(p => p.type === 'month').value;

    /* ---------- Intl helpers (arithmetic only) ---------- */
    const fmtCache = {};
    function fmt(locale, opts) {
        const k = locale + JSON.stringify(opts);
        return fmtCache[k] || (fmtCache[k] = new Intl.DateTimeFormat(locale, Object.assign({ timeZone: 'UTC' }, opts)));
    }
    const parts = (locale, opts, date) => {
        const o = {}; fmt(locale, opts).formatToParts(date).forEach(p => { o[p.type] = p.value; }); return o;
    };
    const DMY = { day: 'numeric', month: 'long', year: 'numeric' };
    const NUM = { day: 'numeric', month: 'numeric', year: 'numeric' };
    // Numeric {y, m, d} in an Intl calendar. Month is the ordinal in the year.
    const calNum = (ca, D) => { const p = parts('en-u-ca-' + ca, NUM, D); return { y: +p.year, m: parseInt(p.month, 10), d: +p.day }; };
    /* ---------- Lunisolar (Chinese-type) calendars ----------
       ICU's Chinese calendar misplaces some months (CNY 2027 on 7 Feb, not
       6 Feb; CNY 2030 on 2 Feb, not 3 Feb; no leap 6th month in 1987), so it
       is not used. China comes from a month table built from lunar-javascript
       (寿星 algorithms, 1900-01-31 … 2100); Korea (UTC+9) and Vietnam (UTC+7)
       from Hồ Ngọc Đức's algorithm, which matches that table on every day
       1929–2099 at UTC+8 except one month in 2057 (a new moon at midnight). */
    const INT = Math.floor, PI = Math.PI;
    function newMoonDay(k, tz) {
        const T = k / 1236.85, T2 = T * T, T3 = T2 * T, dr = PI / 180;
        let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
        Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
        const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
        const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
        const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
        let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
        C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
        C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
        C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
        C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
        C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
        C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
        const deltat = T < -11
            ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
            : -0.000278 + 0.000265 * T + 0.000262 * T2;
        return INT(Jd1 + C1 - deltat + 0.5 + tz / 24);
    }
    function sunLongitude(jdn, tz) {
        const T = (jdn - 2451545.5 - tz / 24) / 36525, T2 = T * T, dr = PI / 180;
        const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
        const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
        let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
        DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
        let L = (L0 + DL) * dr;
        L = L - PI * 2 * INT(L / (PI * 2));
        return INT(L / PI * 6);
    }
    function lunarMonth11(yy, tz) {
        const off = gregToJdn(yy, 12, 31) - 2415021, k = INT(off / 29.530588853);
        let nm = newMoonDay(k, tz);
        if (sunLongitude(nm, tz) >= 9) nm = newMoonDay(k - 1, tz);
        return nm;
    }
    function leapMonthOffset(a11, tz) {
        const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
        let last, i = 1, arc = sunLongitude(newMoonDay(k + i, tz), tz);
        do { last = arc; i++; arc = sunLongitude(newMoonDay(k + i, tz), tz); } while (arc !== last && i < 14);
        return i - 1;
    }
    function solarToLunar(dd, mm, yy, tz) {
        const day = gregToJdn(yy, mm, dd), k = INT((day - 2415021.076998695) / 29.530588853);
        // k is only an estimate: step back until the new moon is on or before the day
        let kk = k + 1, monthStart = newMoonDay(kk, tz);
        while (monthStart > day) monthStart = newMoonDay(--kk, tz);
        let a11 = lunarMonth11(yy, tz), b11 = a11, lunarYear;
        if (a11 >= monthStart) { lunarYear = yy; a11 = lunarMonth11(yy - 1, tz); }
        else { lunarYear = yy + 1; b11 = lunarMonth11(yy + 1, tz); }
        const lunarDay = day - monthStart + 1, diff = INT((monthStart - a11) / 29);
        let leap = false, month = diff + 11;
        if (b11 - a11 > 365) {
            const lm = leapMonthOffset(a11, tz);
            if (diff >= lm) { month = diff + 10; if (diff === lm) leap = true; }
        }
        if (month > 12) month -= 12;
        if (month >= 11 && diff < 4) lunarYear -= 1;
        return { d: lunarDay, m: month, y: lunarYear, leap };
    }
    // One char per lunar month from 1 正月 1900 (JDN 2415051): a = 29 days,
    // b = 30, c = leap month of 29, d = leap month of 30.
    const CN_START = 2415051, CN_MONTHS = 'abaababbcbbababaabababbbababaabababbbababacbaabbabbbabaabaabbabbabbaababababbadabababababababbabababaabbababbababcabababbbababaabababbbababaabcabbabbbabaabaabbabbbabaabaababbbabadabaababbabbabababaabbababbabababacbabbabbababaabababbabbabaabaadbabbbabaabaababbbbabaabaababbbabbacbaababbabbababaabababbabbababaababadbabbababaabababbabbabaababababbbabcabaababbbbabaabaababbbabbaabcababbabbababaabababbbababaabababbabdababaabababbababbabaabababbabbabaadaabbabbbabaabaababbbabbaabaadabbabbbaabaabababbbababaabababbabbadaababababbabababababababbababababadababbabbaabaababbbabbaabaababbabbbcabaabababbbababaabababbabbabacbabababbabbaababababbababababababadabbabababaabbabbabababaababbabbabadaabababbbababaabababbbababaabcbababbbabaababababbabababababababbcbababababababbabababaababbabbababacbababbbababaabababbbababaabaabbabbbcbaabaabbabbabbaabababababbabcbabababababbabababaababbabbababaabcbabbbababaabababbabbabaabaabbabbbabcabaabbabbbabaabaababbbabababcababbabbabababaababbabbabababaababdabbababaabababbabbabaabaabbabbbabacbaababbbbabaabaababbbabbaabaabcbbabbababaabababbabbababaabababbcbbabaababababbabbabaababababbbabaabcababbbbabaabaababbbabbaabaababbabbcbabaabababbbababaabababbababbcababababbababbaababababbabbabaabacbbabbabbaabaababbbabbaabaababbabbabcbaabababbbababaabababbabbabaabababcbbabababababababbababababababcbbabbaabaababbbabbaabaababbabbbaabcabababbbababaabababbabbabaababababbcbababababababbabababababababbcbababaababbbabababaababbabbababaadababbbababaabababbbababaabaabbabbbcbaababababbabababababababbababababcabbabbabababaababbabbababaabcbabbbababaabaabbbabbabaabaabbabbbabcabaabbabbabababaabbababbabababaabbcbabbabababaababbabbababaabababbbcbabaabababbabbabaabaabbabbbabaadaababbbbabaabaababbbabababaababbabbcbababaababbababbabaabababbabbababcabababbabbabaabaabbabbbabaabacbabbbbabaabaababbbabababaababbabbadabaabababbabbabaababababbabbabaabadababbabbabaabaabbabbbabaabaabcbbbbabaabaababbbabbaabaababbabbabadaabababbbababaabababbababbaabababadabbabbaabababababbbabaabaababbbabbacbaababbbabbaabaababbabbababacbababbbababaabababbabbabaababababbcbababababababbababababaabbabbabababcababbbabababaababbabbababaabcbabbbababaabababbabbabaababababbabcbabababababbabababababababbabababacbabbbabababaababbabbababaabababbbabcbaabaabbbabbabaabaabbabbbaabcbaabbabbabababababababbababababaabdabbabababaababbabbababaabababbbababcabaabbbabbabaaababbabbbabaabcabbabbabababaababbabbabababaabbabadbababaabababbabbababaabababbbababacbaabbbabbabaaababbabbbabaaabababbbcbbaabaababbbabababaab';
    function cnTable(j) {
        if (j < CN_START) return null;
        let start = CN_START, y = 1900, m = 0;
        for (let i = 0; i < CN_MONTHS.length; i++) {
            const c = CN_MONTHS.charCodeAt(i) - 97, len = 29 + (c & 1), leap = c >= 2;
            if (!leap) { m++; if (m > 12) { m = 1; y++; } }
            if (j < start + len) return { relatedYear: y, month: m, leap, day: j - start + 1 };
            start += len;
        }
        return null;
    }
    function lunarAt(g, tz) { const r = solarToLunar(g.d, g.m, g.y, tz); return { relatedYear: r.y, month: r.m, leap: r.leap, day: r.d }; }
    // ca: 'chinese' (China), 'dangi' (Korea), 'vietnamese' (Vietnam).
    function lunar(ca, D) {
        const g = { y: D.getUTCFullYear(), m: D.getUTCMonth() + 1, d: D.getUTCDate() };
        if (ca === 'chinese') return cnTable(gregToJdn(g.y, g.m, g.d)) || lunarAt(g, 8);
        if (ca === 'vietnamese') {
            // North Vietnam moved its lunar calendar to UTC+7 from 1968; before that it followed China's.
            return g.y >= 1968 ? lunarAt(g, 7) : (cnTable(gregToJdn(g.y, g.m, g.d)) || lunarAt(g, 8));
        }
        // Korea: UTC+8:30 in 1954–1961 and before 1912, otherwise UTC+9.
        const j = gregToJdn(g.y, g.m, g.d);
        const tz = (g.y < 1912 || (j >= gregToJdn(1954, 3, 21) && j < gregToJdn(1961, 8, 10))) ? 8.5 : 9;
        return lunarAt(g, tz);
    }
    // Sexagenary year index 0–59 (甲子 = 0) from the Gregorian year the lunar year starts in.
    const cycleIdx = relatedYear => mod(relatedYear - 4, 60);
    const STEM = '甲乙丙丁戊己庚辛壬癸', BRANCH = '子丑寅卯辰巳午未申酉戌亥';
    const STEM_KO = '갑을병정무기경신임계', BRANCH_KO = '자축인묘진사오미신유술해';
    const STEM_VI = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
    const BRANCH_VI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
    const STEM_PY = ['jiǎ','yǐ','bǐng','dīng','wù','jǐ','gēng','xīn','rén','guǐ'];
    const BRANCH_PY = ['zǐ','chǒu','yín','mǎo','chén','sì','wǔ','wèi','shēn','yǒu','xū','hài'];
    function cycle(relatedYear) {
        const i = cycleIdx(relatedYear), s = i % 10, b = i % 12;
        return { gz: STEM[s] + BRANCH[b], gzKo: STEM_KO[s] + BRANCH_KO[b], gzVi: STEM_VI[s] + ' ' + BRANCH_VI[b],
                 gzPy: STEM_PY[s] + '-' + BRANCH_PY[b], animal: b };
    }

    /* ---------- Month name keys ---------- */
    // ICU's English Hebrew month names → our 14-slot list (Adar I / Adar / Adar II).
    const HEB_ICU = ['Tishri','Heshvan','Kislev','Tevet','Shevat','Adar I','Adar','Adar II','Nisan','Iyar','Sivan','Tamuz','Av','Elul'];
    const RU_GEN = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    const LAT_GEN = ['Ianuarii','Februarii','Martii','Aprilis','Maii','Iunii','Iulii','Augusti','Septembris','Octobris','Novembris','Decembris'];
    const LAT_ABBR = ['Ian.','Feb.','Mart.','Apr.','Mai.','Iun.','Iul.','Aug.','Sept.','Oct.','Nov.','Dec.'];
    const GR_GEN = ['Ἰανουαρίου','Φεβρουαρίου','Μαρτίου','Ἀπριλίου','Μαΐου','Ἰουνίου','Ἰουλίου','Αὐγούστου','Σεπτεμβρίου','Ὀκτωβρίου','Νοεμβρίου','Δεκεμβρίου'];
    // Standard Moroccan Tamazight month names in Tifinagh (CLDR zgh; Chrome ships no zgh data).
    const AMZ_TFNG = ['ⵉⵏⵏⴰⵢⵔ','ⴱⵕⴰⵢⵕ','ⵎⴰⵕⵚ','ⵉⴱⵔⵉⵔ','ⵎⴰⵢⵢⵓ','ⵢⵓⵏⵢⵓ','ⵢⵓⵍⵢⵓⵣ','ⵖⵓⵛⵜ','ⵛⵓⵜⴰⵏⴱⵉⵔ','ⴽⵜⵓⴱⵔ','ⵏⵓⵡⴰⵏⴱⵉⵔ','ⴷⵓⵊⴰⵏⴱⵉⵔ'];
    // Indian national calendar months as the Hindi Gazette spells them.
    const SAKA_HI = ['चैत्र','वैशाख','ज्येष्ठ','आषाढ़','श्रावण','भाद्र','आश्विन','कार्तिक','अग्रहायण','पौष','माघ','फाल्गुन'];
    const AMZ = ['Yennayer','Furar','Meɣres','Yebrir','Mayyu','Yunyu','Yulyu','Ɣuct','Ctembeṛ','Tubeṛ','Wambeṛ','Dujembeṛ'];
    const BN = ['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'];
    const TZOLKIN = ["Imix","Ik'","Ak'bal","K'an","Chikchan","Kimi","Manik'","Lamat","Muluk","Ok","Chuwen","Eb","Ben","Ix","Men","Kib","Kaban","Etz'nab","Kawak","Ajaw"];
    const HAAB = ["Pop","Wo","Sip","Sotz'","Sek","Xul","Yaxk'in","Mol","Ch'en","Yax","Sak'","Keh","Mak","K'ank'in","Muwan","Pax","K'ayab","Kumk'u","Wayeb"];
    const AZTEC = ['Cipactli','Ehecatl','Calli','Cuetzpalin','Coatl','Miquiztli','Mazatl','Tochtli','Atl','Itzcuintli','Ozomatli','Malinalli','Acatl','Ocelotl','Cuauhtli','Cozcacuauhtli','Ollin','Tecpatl','Quiahuitl','Xochitl'];
    const AZTEC_NUM = ['Ce','Ome','Yei','Nahui','Macuilli','Chicuace','Chicome','Chicuei','Chicnahui','Mahtlactli','Mahtlactli once','Mahtlactli omome','Mahtlactli omei'];
    const FR_MONTHS = ['Vendémiaire','Brumaire','Frimaire','Nivôse','Pluviôse','Ventôse','Germinal','Floréal','Prairial','Messidor','Thermidor','Fructidor'];
    const FR_DECADI = ['Primidi','Duodi','Tridi','Quartidi','Quintidi','Sextidi','Septidi','Octidi','Nonidi','Décadi'];
    const FR_SANS = ['Jour de la Vertu','Jour du Génie','Jour du Travail','Jour de l’Opinion','Jour des Récompenses','Jour de la Révolution'];

    /* ---------- Arithmetic calendars ---------- */
    function romanDate(jy, jm, jd) {
        const leap = jy % 4 === 0;
        const nonesDay = [3, 5, 7, 10].includes(jm) ? 7 : 5, idesDay = nonesDay + 8;
        const dim = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][jm - 1];
        const next = LAT_ABBR[jm % 12], cur = LAT_ABBR[jm - 1];
        const count = (n, what) => n === 2 ? 'prid. ' + what : 'a.d. ' + roman(n) + ' ' + what;
        if (jd === 1) return 'Kal. ' + cur;
        if (jd < nonesDay) return count(nonesDay - jd + 1, 'Non. ' + cur);
        if (jd === nonesDay) return 'Non. ' + cur;
        if (jd < idesDay) return count(idesDay - jd + 1, 'Id. ' + cur);
        if (jd === idesDay) return 'Id. ' + cur;
        if (jm === 2 && leap) {            // the doubled sixth day before the Kalends of March
            if (jd === 24) return 'a.d. bis VI Kal. Mart.';
            if (jd > 24) return count(31 - jd, 'Kal. Mart.');
            return count(30 - jd, 'Kal. Mart.');
        }
        return count(dim - jd + 2, 'Kal. ' + next);
    }
    function maya(j) {
        const days = j - 584283;            // GMT correlation: 0.0.0.0.0 = JDN 584283
        if (days < 0) return null;
        const lc = [144000, 7200, 360, 20, 1].map((u, i, a) => i === 0 ? Math.floor(days / u) : Math.floor(mod(days, a[i - 1]) / u));
        const hp = mod(days + 348, 365);
        // Inscriptions write each place as a bar-and-dot numeral (Unicode Mayan
        // Numerals, U+1D2E0 = 0 … U+1D2F3 = 19); the dotted form is modern notation.
        return { glyphs: lc.map(v => String.fromCodePoint(0x1D2E0 + v)).join(' '), lc: lc.join('.'), tz: (mod(days + 3, 13) + 1) + ' ' + TZOLKIN[mod(days + 19, 20)], haab: (hp % 20) + ' ' + HAAB[Math.floor(hp / 20)] };
    }
    // Egyptian civil calendar: 12 × 30 days + 5 epagomenal, no leap day, counted
    // in Ptolemy's Nabonassar era (1 Thoth year 1 = 26 February 747 BC Julian).
    const EGY_EPOCH = 1448638;
    function egyptian(j) {
        const days = j - EGY_EPOCH; if (days < 0) return null;
        const doy = mod(days, 365);
        return { y: Math.floor(days / 365) + 1, m: Math.floor(doy / 30), d: doy % 30 + 1 };
    }
    // Bangladesh revised calendar (2019): 1 Boishakh = 14 April; Boishakh–Ashwin 31
    // days, Falgun 30 in a Gregorian leap year (else 29), the rest 30.
    function bengali(g) {
        const j = gregToJdn(g.y, g.m, g.d);
        let by = g.y - 593, start = gregToJdn(g.y, 4, 14);
        if (j < start) { by -= 1; start = gregToJdn(g.y - 1, 4, 14); }
        const lens = [31,31,31,31,31,31,30,30,30,30, isGregLeap(by + 594) ? 30 : 29, 30];
        let off = j - start, m = 0;
        while (off >= lens[m]) { off -= lens[m]; m++; }
        return { y: by, m, d: off + 1 };
    }
    // French Republican calendar, Romme rule: years 3, 7, 11, 15 sextile as
    // decreed; from year 20 every fourth year, minus centuries not divisible by 400.
    function frRepSextile(y) {
        if (y < 20) return [3, 7, 11, 15].includes(y);
        return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
    }
    const FR_EPOCH = gregToJdn(1792, 9, 22);
    function frenchRepublican(j) {
        let off = j - FR_EPOCH; if (off < 0) return null;
        let y = 1;
        while (true) { const len = frRepSextile(y) ? 366 : 365; if (off < len) break; off -= len; y++; }
        return { y, m: Math.floor(off / 30), d: off % 30 + 1, decadi: off % 10 };
    }


    /* ---------- Living calendars added from the 2026-10 survey ---------- */
    const TWI_DAYS = ['Kwasiada','Dwoada','Benada','Wukuada','Yawoada','Fiada','Memeneda'];          // Sun..Sat
    const JAV_DAYS = ['Ahad','Senèn','Selasa','Rebo','Kemis','Jemuwah','Setu'];                      // Sun..Sat
    const BALI_DAYS = ['Redite','Soma','Anggara','Buda','Wraspati','Sukra','Saniscara'];             // Sun..Sat
    const IS_DAYS = ['sunnudagur','mánudagur','þriðjudagur','miðvikudagur','fimmtudagur','föstudagur','laugardagur'];
    const PASARAN = ['Legi','Pahing','Pon','Wage','Kliwon'];          // index = JDN mod 5 (checked: 27 Jun 2025 = Kliwon)
    const PANCAWARA = ['Umanis','Paing','Pon','Wage','Kliwon'];       // the same 5-day week, Balinese names
    const weekday = j => mod(j + 1, 7);                               // 0 = Sunday
    const JAV_MONTHS = ['Sura','Sapar','Mulud','Bakda Mulud','Jumadilawal','Jumadilakir','Rejeb','Ruwah','Pasa','Sawal','Sela','Besar'];
    const JAV_YEARS = ['Alip','Ehe','Jimawal','Je','Dal','Be','Wawu','Jimakir'];
    const WUKU = ['Sinta','Landep','Ukir','Kulantir','Tolu','Gumbreg','Wariga','Warigadean','Julungwangi','Sungsang','Dungulan','Kuningan',
                  'Langkir','Medangsia','Pujut','Pahang','Krulut','Merakih','Tambir','Medangkungan','Matal','Uye','Menail','Prangbakat',
                  'Bala','Ugu','Wayang','Kelawu','Dukut','Watugunung'];
    const KICHE_DAYS = ["Imox","Iq'","Aq'ab'al","K'at","Kan","Kame","Kej","Q'anil","Toj","Tz'i'","B'atz'","E","Aj","I'x","Tz'ikin","Ajmaq","No'j","Tijax","Kawoq","Ajpu"];
    const KICHE_NUM = ["Jun","Keb'","Oxib'","Kajib'","Job'","Waqib'","Wuqub'","Wajxaqib'","B'elejeb'","Lajuj","Junlajuj","Kablajuj","Oxlajuj"];
    const KU_MONTHS = ['خاکەلێوە','گوڵان','جۆزەردان','پووشپەڕ','گەلاوێژ','خەرمانان','ڕەزبەر','گەڵاڕێزان','سەرماوەز','بەفرانبار','ڕێبەندان','ڕەشەمە'];
    const NP_MONTHS = ['बैशाख','जेठ','असार','साउन','भदौ','असोज','कात्तिक','मंसिर','पुस','माघ','फागुन','चैत'];
    const BAHAI_FA = ['بهاء','جلال','جمال','عظمت','نور','رحمت','کلمات','کمال','اسماء','عزّت','مشیّت','علم','قدرت','قول','مسائل','شرف','سلطان','ملک','ایّام‌ها','علاء'];
    const BAHAI_LAT = ['Bahá','Jalál','Jamál','ʻAẓamat','Núr','Raḥmat','Kalimát','Kamál','Asmáʼ','ʻIzzat','Mashíyyat','ʻIlm','Qudrat','Qawl','Masáʼil','Sharaf','Sulṭán','Mulk','Ayyám-i-Há','ʻAláʼ'];
    const PARSI_ROJ = ['Hormazd','Bahman','Ardibehesht','Shehrevar','Aspandad','Khordad','Amardad','Dae-pa-Adar','Adar','Avan','Khorshed','Mohor','Tir','Gosh','Dae-pa-Meher',
                       'Meher','Srosh','Rashne','Fravardin','Behram','Ram','Govad','Dae-pa-Din','Din','Ashishvangh','Ashtad','Asman','Zamyad','Mareshpand','Aneran'];
    const PARSI_MAH = ['Fravardin','Ardibehesht','Khordad','Tir','Amardad','Shehrevar','Meher','Avan','Adar','Dae','Bahman','Aspandarmad'];
    const PARSI_GATHA = ['Ahunavad','Ushtavad','Spentomad','Vohukshathra','Vahishtoisht'];
    const AR_MONTHS = ['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'];
    const IS_MONTHS_GEN = ['hörpu','skerplu','sólmánaðar','heyanna','tvímánaðar','haustmánaðar','gormánaðar','ýlis','mörsugs','þorra','góu','einmánaðar'];
    const arabDigits = n => localeDigits(n, 'ar-EG');
    const yearOfJdn = j => jdnToGreg(j).y;
    function jdnToGreg(j) {
        const a = j + 32044, b = Math.floor((4 * a + 3) / 146097), c = a - Math.floor(146097 * b / 4);
        const d = Math.floor((4 * c + 3) / 1461), e = c - Math.floor(1461 * d / 4), m = Math.floor((5 * e + 2) / 153);
        return { y: 100 * b + d - 4800 + Math.floor(m / 10), m: m + 3 - 12 * Math.floor(m / 10), d: e - Math.floor((153 * m + 2) / 5) + 1 };
    }

    // Javanese calendar, kurup Asapon: 1 Sura Alip 1867 AJ = Tuesday Pon, 24 March 1936.
    // 8-year windu; Ehe, Dal and Jimakir have 355 days (checked: 1 Sura 1959 = 27 Jun 2025,
    // 1 Sura 1960 = 17 Jun 2026, Rabu Kliwon). The kurup runs 120 years, to 1986 AJ.
    const JAV_EPOCH = gregToJdn(1936, 3, 24), JAV_LEN = [354, 355, 354, 354, 355, 354, 354, 355];
    function javanese(j) {
        if (j < JAV_EPOCH) return null;
        let y = 1867, start = JAV_EPOCH;
        while (j >= start + JAV_LEN[(y - 1867) % 8]) { start += JAV_LEN[(y - 1867) % 8]; y++; if (y > 1986) return null; }
        let d = j - start, m = 0;
        const longYear = JAV_LEN[(y - 1867) % 8] === 355;
        for (;;) { const len = m % 2 === 0 || (m === 11 && longYear) ? 30 : 29; if (d < len) break; d -= len; m++; }
        return { y, m, d: d + 1, yearName: JAV_YEARS[(y - 1867) % 8] };
    }
    // Balinese Pawukon: 210-day cycle of 30 seven-day wuku. Galungan (Buda Kliwon Dungulan)
    // fell on 23 Apr 2025 and 17 Jun 2026, so wuku Sinta began on Sunday 9 Feb 2025.
    const WUKU_EPOCH = gregToJdn(2025, 2, 9);
    const pawukon = j => { const k = mod(j - WUKU_EPOCH, 210); return { wuku: Math.floor(k / 7), day: k % 7 }; };
    // Akan 42-day cycle: Akwasidae (day 28) on Sunday 15 Mar 2026; also 8 Jan 1978, 409 cycles earlier.
    const AKAN_REF = gregToJdn(2026, 3, 15);
    const akanDay = j => mod(j - AKAN_REF + 27, 42) + 1;   // 1..42; 1 Fɔdwo, 10 Awukudae, 19 Fofi, 28 Akwasidae
    const AKAN_DABONE = { 1: 'Fɔdwo', 10: 'Awukudae', 19: 'Fofi', 28: 'Akwasidae' };
    // Nepal's Vikram Samvat: month lengths (29 + digit) as fixed by the Nepal Panchanga
    // Nirnayak Samiti, 2000–2083 BS, from the bikram-sambat library and cross-checked against
    // nepali-date-converter (they disagree from 2084, not yet fixed). 1 Baisakh 2000 = 14 Apr 1943.
    const NP_START = gregToJdn(1943, 4, 14), NP_TABLE = '132321110102223222101011223321101011232321110012132321110102223222101011223321101011232321110012222322011002223222101011223321101011232321110012222322011011223222101011223321101011232321110012222322011011223222101011232321101011232321110102222322101011223222101011232321110011232321110102222322101011223222101011232321110012132321110102223222101011223231101011232321110012132321110102223222101011223321101011232321110012132322011002223222101011223321101011232321110012222322011011223222101011223321101011232321110012222322011011223222101011232321101011232321110012222322101011223222101011232321110011232321110102222322101011223222101011232321110011232321110102223222101011223231101011232321110012132321110102223222101011223321101011232321110012132322010102223222101011223321101011232321110012222322011002223222101011223321101011232321110012222322011011223222101011232321101011232321110012222322101011223222101011232321110011232321110102222322101011223222101011232321110011232321110102223222101011223222101011';
    function nepali(j) {
        let off = j - NP_START; if (off < 0) return null;
        for (let i = 0; i < NP_TABLE.length; i++) {
            const len = 29 + (+NP_TABLE[i]);
            if (off < len) return { y: 2000 + Math.floor(i / 12), m: i % 12, d: off + 1 };
            off -= len;
        }
        return null;
    }
    // Bahá'í (Badíʿ) calendar. Since 172 BE (2015) Naw-Rúz is fixed by astronomy at Tehran; the
    // Bahá'í World Centre's table "Badíʿ dates 172 to 221 BE" gives each (digit: 1 = 20 March,
    // 2 = 21 March). Before 2015 the calendar was tied to the Gregorian: Naw-Rúz on 21 March.
    const BAHAI_NR = '21122112211221112111211121112111211121112111111111';
    function bahaiNawRuz(be) {
        if (be < 172) return gregToJdn(be + 1843, 3, 21);
        if (be - 172 < BAHAI_NR.length) return gregToJdn(be + 1843, 3, 19 + (+BAHAI_NR[be - 172]));
        return null;
    }
    function bahai(j) {
        let be = yearOfJdn(j) - 1843; const nr = bahaiNawRuz(be);
        if (nr == null) return null;
        if (j < nr) be--;
        if (be < 1) return null;
        const start = bahaiNawRuz(be), next = bahaiNawRuz(be + 1), off = j - start;
        if (off < 342) return { y: be, m: Math.floor(off / 19), d: off % 19 + 1 };
        if (next == null) return null;
        const ayyam = next - start - 361;
        if (off < 342 + ayyam) return { y: be, m: 18, d: off - 341 };
        return { y: be, m: 19, d: off - 342 - ayyam + 1 };
    }
    // Parsi Shahanshahi: 12 × 30 days + 5 Gatha days, no leap day; Navroz of year Y (Yazdegerdi)
    // = JDN 1952093 + 365 (Y − 1) — 15 Aug 2025 = 1395, 15 Aug 2026 = 1396.
    function parsi(j) {
        const off = j - 1952093; if (off < 0) return null;
        const y = Math.floor(off / 365) + 1, doy = off % 365;
        return doy < 360 ? { y, m: Math.floor(doy / 30), d: doy % 30 + 1 } : { y, m: 12, d: doy - 359 };
    }
    // Dawoodi Bohra (Fatimid) Hijri: tabular, leap years 2, 5, 8, 10, 13, 16, 19, 21, 24, 27, 29
    // of 30, epoch Thursday 15 Jul 622 (JDN 1948439). 1 Shawwal 1445 = 9 Apr 2024, 1446 = 30 Mar 2025.
    const BOHRA_LEAP = [2, 5, 8, 10, 13, 16, 19, 21, 24, 27, 29];
    function bohra(j) {
        let off = j - 1948439; if (off < 0) return null;
        let y = 1 + 30 * Math.floor(off / 10631); off %= 10631;
        const isLeap = yy => BOHRA_LEAP.includes(mod(yy - 1, 30) + 1);
        for (;;) { const len = isLeap(y) ? 355 : 354; if (off < len) break; off -= len; y++; }
        let m = 0;
        for (;;) { const len = m % 2 === 0 || (m === 11 && isLeap(y)) ? 30 : 29; if (off < len) break; off -= len; m++; }
        return { y, m, d: off + 1 };
    }
    // Old Icelandic calendar (Janson, "The Icelandic Calendar"): summer begins on the Thursday
    // 19–25 April and winter on the Saturday 180 days before the next summer. Months of 30 days;
    // between Sólmánuður and Heyannir come the 4 aukanætur, plus the 7-day sumarauki in long years.
    const firstSummerDay = y => { const a = gregToJdn(y, 4, 19); return a + mod(4 - weekday(a), 7); };
    function iceland(j) {
        const gy = yearOfJdn(j);
        let S = firstSummerDay(gy); if (j < S) S = firstSummerDay(gy - 1);
        const W = firstSummerDay(yearOfJdn(S) + 1) - 180;
        if (j < W) {
            const off = j - S, H = W - 90, week = Math.floor(off / 7) + 1;
            if (off < 90) return { season: 0, week, m: Math.floor(off / 30), d: off % 30 + 1 };
            if (j < H) return { season: 0, week, m: 12, d: off - 89 };      // aukanætur (+ sumarauki)
            const h = j - H; return { season: 0, week, m: 3 + Math.floor(h / 30), d: h % 30 + 1 };
        }
        const off = j - W;
        return { season: 1, week: Math.floor(off / 7) + 1, m: 6 + Math.floor(off / 30), d: off % 30 + 1 };
    }


    /* ---------- Tibetan family (Janson, "Tibetan Calendar Mathematics", 2014) ----------
       Phugpa (Tibet), New Genden (Mongolia, App. A.3), Bhutan (App. A.4). Checked against the
       paper's Table 9 (New Year 2000–2030, all three) and Table 8 (every skipped and repeated day
       of 2012, all three). */
    const TIB_VARIANTS = {
        // Y0/M0 epoch month, beta = initial intercalation index, c = rounding constant (65 − L),
        // leap: 'before' (leap month precedes regular month M, same number) when ix ∈ {L, L+1};
        //       'after'  (Bhutan: leap follows regular month M, same number) when ix ∈ {57, 58}.
        phugpa:  { Y0: 806,  M0: 3, beta: 61, c: 17, leap: 'before', L: 48, m0: 2015501 + 4783 / 5656, s0: 743 / 804, a0: 475 / 3528 },
        mongol:  { Y0: 1747, M0: 3, beta: 10, c: 19, leap: 'before', L: 46, m0: 2359237 + 2603 / 2828, s0: 397 / 402, a0: 1523 / 1764 },
        bhutan:  { Y0: 1754, M0: 3, beta: 2,  c: 6,  leap: 'after',  L: 57, m0: 2361807 + 52 / 707,    s0: 1 / 67,    a0: 17 / 147 },
    };
    const tm1 = 167025 / 5656, tm2 = tm1 / 30, s1 = 65 / 804, s2 = s1 / 30, a1 = 253 / 3528, a2 = 1 / 28;
    const MOON = [0, 5, 10, 15, 19, 22, 24, 25], SUN = [0, 6, 10, 11];
    const frac = x => x - Math.floor(x);
    function tibTab(table, quarter, x) {          // periodic table: rises over `quarter` steps, period 4·quarter
        const P = quarter * 4, t = mod(x, P);
        const at = i => { i = mod(i, P); if (i <= quarter) return table[i]; if (i <= 2 * quarter) return table[2 * quarter - i]; return -at(i - 2 * quarter); };
        const i = Math.floor(t), f = t - i;
        return at(i) + (at(i + 1) - at(i)) * f;
    }
    function tibTrueDate(V, d, n) {
        const mean = n * tm1 + d * tm2 + V.m0;
        const anM = frac(n * a1 + d * a2 + V.a0);
        const sun = frac(n * s1 + d * s2 + V.s0);
        const moonEqu = tibTab(MOON, 7, 28 * anM);
        const sunEqu = tibTab(SUN, 3, 12 * frac(sun - 0.25));
        return mean + moonEqu / 60 - sunEqu / 60;
    }
    // True month count of (Y, M, leap) and whether a leap month M exists in year Y.
    function tibMonthInfo(V, Y, M) {
        const Ms = 12 * (Y - V.Y0) + M - V.M0, ix = mod(2 * Ms + V.beta, 65);
        const n = Math.floor((67 * Ms + V.beta + V.c) / 65);
        const hasLeap = ix === V.L || ix === V.L + 1;
        return { n, hasLeap, leapN: V.leap === 'before' ? n - 1 : n + 1 };
    }
    // Calendar day JD -> { Y, M, leap, d }.
    function tibFromJd(V, J, gy) {
        // months around the Gregorian year, in order
        const seq = [];
        for (let Y = gy - 1; Y <= gy + 1; Y++) for (let M = 1; M <= 12; M++) {
            const mi = tibMonthInfo(V, Y, M);
            if (mi.hasLeap && V.leap === 'before') seq.push({ Y, M, leap: true, n: mi.leapN });
            seq.push({ Y, M, leap: false, n: mi.n });
            if (mi.hasLeap && V.leap === 'after') seq.push({ Y, M, leap: true, n: mi.leapN });
        }
        for (const mo of seq) {
            const start = Math.floor(tibTrueDate(V, 30, mo.n - 1)), end = Math.floor(tibTrueDate(V, 30, mo.n));
            if (J > start && J <= end) {
                let d = 1; while (Math.floor(tibTrueDate(V, d, mo.n)) < J) d++;
                return { Y: mo.Y, M: mo.M, leap: mo.leap, d, n: mo.n };
            }
        }
        return null;
    }

    /* ---------- Myanmar (Yan Naing Aye) and Khmer chhankitek ----------
       Ported from mm-cal-js and @thyrith/momentkh (both MIT); identical to them on every day
       1950–2039. Myanmar ME 1388 = 2026; the Calendar Advisory Board can still adjust future years. */
    // Myanmar calendar: Yan Naing Aye's algorithm (port of mm-cal-js, MIT), modern eras only.
    const SY = 1577917828 / 4320000, LM = 1577917828 / 53433336, MO = 1954168.050623;
    function mmConstants(my) {
        let EI, WO, NM, EW = 0, fme, wte;
        if (my > 1312) { EI = 3; WO = -0.5; NM = 8; fme = [[1377, 1]]; wte = [1344, 1345]; }
        else if (my >= 1217) { EI = 2; WO = -1; NM = 4; fme = [[1234, 1], [1261, -1]]; wte = [1263, 1264]; }
        else if (my >= 1100) { EI = 1.3; WO = -0.85; NM = -1; fme = [[1120, 1], [1126, -1], [1150, 1], [1172, -1], [1207, 1]]; wte = [1201, 1202]; }
        else return null;
        const f = fme.find(x => x[0] === my); if (f) WO += f[1];
        if (wte.includes(my)) EW = 1;
        return { EI, WO, NM, EW };
    }
    function mmWatat(my) {
        const c = mmConstants(my);
        const TA = (SY / 12 - LM) * (12 - c.NM);
        let ed = (SY * (my + 3739)) % LM;
        if (ed < TA) ed += LM;
        const fm = Math.round(SY * my + MO - ed + 4.5 * LM + c.WO);
        let watat = 0;
        if (c.EI >= 2) { const TW = LM - (SY / 12 - LM) * c.NM; if (ed >= TW) watat = 1; }
        else { watat = ((my * 7 + 2) % 19 + 19) % 19; watat = Math.floor(watat / 12); }
        watat ^= c.EW;
        return { fm, watat };
    }
    function mmYear(my) {
        const y2 = mmWatat(my); let myt = y2.watat, yd = 0, y1;
        do { yd++; y1 = mmWatat(my - yd); } while (y1.watat === 0 && yd < 3);
        if (myt) { const nd = (y2.fm - y1.fm) % 354; myt = Math.floor(nd / 31) + 1; }
        return { myt, tg1: y1.fm + 354 * yd - 102 };
    }
    // jdn -> { my, mm (0 = 1st Waso, 1..12 Tagu..Tabaung, 13/14 late Tagu/Kason, 4 = (2nd) Waso), md, ml, myt }
    function myanmar(jdn) {
        const my = Math.floor((jdn - 0.5 - MO) / SY);
        if (my < 1100) return null;
        const yo = mmYear(my);
        let dd = jdn - yo.tg1 + 1;
        const b = Math.floor(yo.myt / 2), c = Math.floor(1 / (yo.myt + 1));
        const myl = 354 + (1 - c) * 30 + b;
        const mmt = Math.floor((dd - 1) / myl);
        dd -= mmt * myl;
        const a = Math.floor((dd + 423) / 512);
        let mm = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544);
        const e = Math.floor((mm + 12) / 16), f = Math.floor((mm + 11) / 16);
        const md = dd - Math.floor(29.544 * mm - 29.26) - b * e + c * f * 30;
        mm += f * 3 - e * 4 + 12 * mmt;
        let ml = 30 - (mm % 2);
        if (mm === 3) ml += b;
        // moon phase 0 waxing, 1 full moon, 2 waning, 3 new moon; fortnight day 1..15
        const mp = Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / ml);
        const fd = md - 15 * Math.floor(md / 16);
        return { my, mm, md, ml, myt: yo.myt, mp, fd };
    }

    // Khmer chhankitek (port of momentkh's month/day arithmetic, MIT). BE year only.
    const aharkun = be => Math.floor((be * 292207 + 499) / 800) + 4;
    const kromthupul = be => 800 - ((be * 292207 + 499) % 800);
    const avoman = be => (aharkun(be) * 11 + 25) % 692;
    const bodithey = be => { const a = aharkun(be); return (Math.floor((a * 11 + 25) / 692) + a + 29) % 30; };
    const solarLeap = be => kromthupul(be) <= 207;
    function leapDayCalc(be) {
        const av = avoman(be);
        if (av === 0 && avoman(be - 1) === 137) return true;
        if (solarLeap(be)) return av < 127;
        if (av === 137 && avoman(be + 1) === 0) return false;
        return av < 138;
    }
    function leapMonth(be) {
        const b = bodithey(be), bn = bodithey(be + 1);
        if (b === 25 && bn === 5) return false;
        return (b === 24 && bn === 6) || b >= 25 || b < 6;
    }
    function leapType(be) {
        if (leapMonth(be)) return 1;
        if (leapDayCalc(be)) return 2;
        if (leapMonth(be - 1)) { let p = be - 1; for (;;) { if (leapDayCalc(p)) return 2; p--; if (!leapMonth(p)) return 0; } }
        return 0;
    }
    // month index: 0 Migasir … 5 Pisakh, 6 Jesth, 7 Asadh … 11 Kadeuk; 12/13 Pathamasadh / Tutiyasadh
    function khMonthDays(m, be) { const t = leapType(be); if (m === 6 && t === 2) return 30; if (m === 12 || m === 13) return t === 1 ? 30 : 0; return m % 2 === 0 ? 29 : 30; }
    const khYearDays = be => { const t = leapType(be); return t === 1 ? 384 : t === 2 ? 355 : 354; };
    function khNext(m, be) { const t = leapType(be); if (m === 6 && t === 1) return 12; if (m === 11) return 0; if (m === 12) return 13; if (m === 13) return 8; return m + 1; }
    const maybeBE = (y, m) => m <= 4 ? y + 543 : y + 544;
    function khmerLunar(jdn) {
        let epoch = 2415021;                 // 1 Jan 1900 = 1 kaet Bos (month 1)
        let month = 1, diff = jdn - epoch;
        if (diff < 0) return null;
        for (;;) { const g = jdnToGreg(epoch), n = khYearDays(maybeBE(g.y + 1, g.m)); if (diff > n) { diff -= n; epoch += n; } else break; }
        for (;;) { const g = jdnToGreg(epoch), be = maybeBE(g.y, g.m), n = khMonthDays(month, be); if (diff > n) { diff -= n; epoch += n; month = khNext(month, be); } else break; }
        const t = jdnToGreg(jdn), finalBE = maybeBE(t.y, t.m), tot = khMonthDays(month, finalBE);
        if (diff >= tot) { diff = diff % tot; month = khNext(month, finalBE); }
        return { month, dayNum: diff };     // dayNum 0..29: 0–14 kaet (waxing) 1–15, 15–29 roch (waning) 1–15
    }


    const digitsIn = zero => n => String(n).replace(/[0-9]/g, c => String.fromCharCode(zero + (+c)));
    const tibDigits = digitsIn(0x0F20), mmDigits = digitsIn(0x1040), khDigits = digitsIn(0x17E0);
    const TIB_ELEM = ['ཤིང', 'མེ', 'ས', 'ལྕགས', 'ཆུ'];
    const TIB_ANIMAL = ['བྱི', 'གླང', 'སྟག', 'ཡོས', 'འབྲུག', 'སྦྲུལ', 'རྟ', 'ལུག', 'སྤྲེལ', 'བྱ', 'ཁྱི', 'ཕག'];
    // e.g. 2026 = མེ་ཕོ་རྟ་ལོ (fire-male-horse year)
    const tibYearName = Y => { const i = cycleIdx(Y); return TIB_ELEM[(i % 10) >> 1] + '་' + (i % 2 ? 'མོ' : 'ཕོ') + '་' + TIB_ANIMAL[i % 12] + '་ལོ'; };
    const MN_COLOUR = ['Хөх', 'Улаан', 'Шар', 'Цагаан', 'Хар'];     // wood, fire, earth, iron, water
    const MN_ANIMAL = ['хулганан', 'үхэр', 'бар', 'туулай', 'луу', 'могой', 'морин', 'хонин', 'бичин', 'тахиа', 'нохой', 'гахай'];
    const MM_MONTHS = ['ပဌမဝါဆို', 'တန်ခူး', 'ကဆုန်', 'နယုန်', 'ဝါဆို', 'ဝါခေါင်', 'တော်သလင်း', 'သီတင်းကျွတ်', 'တန်ဆောင်မုန်း', 'နတ်တော်', 'ပြာသို',
                       'တပို့တွဲ', 'တပေါင်း', 'နှောင်းတန်ခူး', 'နှောင်းကဆုန်', 'ဒုတိယဝါဆို'];
    const KH_MONTHS = ['មិគសិរ', 'បុស្ស', 'មាឃ', 'ផល្គុន', 'ចេត្រ', 'ពិសាខ', 'ជេស្ឋ', 'អាសាឍ', 'ស្រាពណ៍', 'ភទ្របទ', 'អស្សុជ', 'កត្ដិក', 'បឋមាសាឍ', 'ទុតិយាសាឍ'];
    const KH_DAYS = ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
    // Tibetan-family date for a Gregorian day; the calendar year Y is the Gregorian year Losar falls in.
    function tibDate(variant, g) {
        const r = tibFromJd(TIB_VARIANTS[variant], gregToJdn(g.y, g.m, g.d), g.y);
        return r && { Y: r.Y, M: r.M, leap: r.leap, d: r.d };
    }
    // Khmer BE turns on 1 roch Pisakh (the day after Visak Bochea).
    const khBEcache = {};
    function khmerBE(j) {
        const y = jdnToGreg(j).y;
        if (khBEcache[y] == null) {
            khBEcache[y] = Infinity;
            for (let x = gregToJdn(y, 4, 1); x < gregToJdn(y, 7, 1); x++) { const k = khmerLunar(x); if (k && k.month === 5 && k.dayNum === 15) { khBEcache[y] = x; break; } }
        }
        return j >= khBEcache[y] ? y + 544 : y + 543;
    }

    /* ---------- tr builders ----------
       tr.kind: 'list'  — month from the UI language's months[list][mi]
                'greg'  — month from months.gregorian[gm-1] (Gregorian or Julian)
                'lunar' — Chinese-type month: lunarMonth / leapMonth templates
                'named' — a whole-day name (French sansculottides), dayName template
                'sign'  — Aztec number + day sign, signFmt
                'fixed' — language-independent text (Maya)
                'full'  — the plain Gregorian date in the UI language
       tr.n is the year number fed to the calendar's `year` template. */
    const trList = (list, n, mi, d) => ({ kind: 'list', list, n, mi, d });
    const trGreg = (n, gm, d) => ({ kind: 'greg', n, gm, d });

    /* ---------- Calendar list ----------
       English text lives here; other languages override it from
       timemap_i18n/<lang>.js under cal.<id>. `year` is the year template
       ({n} = number; {era}, {gz}… where noted); omitted = the language's
       yearDefault. */
    const CALENDARS = [
        /* ===== Gregorian, at a few places only ===== */
        { id: 'greg_va', status: 'gregorian', lat: 41.9, lng: 12.45,
          name: 'Gregorian calendar (origin)', region: 'Vatican City / Rome', type: 'Solar',
          epoch: 'Anno Domini — the traditional year of Christ’s birth',
          used: 'Since 15 October 1582 (bull Inter gravissimas, Pope Gregory XIII)',
          note: 'Fixed the Julian calendar’s drift by skipping 10 days (4 October 1582 was followed by 15 October) and dropping three leap days every 400 years.',
          from: { y: 1582, m: 10, d: 15 },
          fmt: (g, D) => ({ native: fmt('it-IT', DMY).format(D), latin: 'die ' + g.d + ' mensis ' + LAT_GEN[g.m - 1] + ' anno Domini ' + g.y, tr: { kind: 'full' } }) },
        { id: 'greg_uk', status: 'gregorian', lat: 52.6, lng: -1.6,
          name: 'Gregorian calendar', region: 'United Kingdom', type: 'Solar', epoch: 'Anno Domini',
          used: 'Since 14 September 1752 (3–13 September 1752 never happened)',
          note: 'Britain and its colonies switched 170 years after Rome; the same act moved New Year’s Day from 25 March to 1 January.',
          from: { y: 1752, m: 9, d: 14 },
          fmt: (g, D) => ({ native: fmt('en-GB', DMY).format(D), latin: 'day · month · year', tr: { kind: 'full' } }) },
        { id: 'greg_us', status: 'gregorian', lat: 39.5, lng: -98.5,
          name: 'Gregorian calendar', region: 'United States', type: 'Solar', epoch: 'Anno Domini',
          used: 'Since 1752, as British colonies',
          note: 'Same calendar as Britain, written month-first: 10/5 is 5 October in the US and 10 May in the UK.',
          from: { y: 1752, m: 9, d: 14 },
          fmt: (g, D) => ({ native: fmt('en-US', DMY).format(D), latin: 'month · day · year', tr: { kind: 'full' } }) },
        { id: 'greg_jp', status: 'gregorian', lat: 33.2, lng: 141.5,
          name: 'Gregorian calendar', region: 'Japan', type: 'Solar', epoch: 'Anno Domini',
          used: 'Since 1 January 1873 (Meiji 6), replacing the lunisolar Tenpō calendar',
          note: 'Japan changed overnight: 3 December Meiji 5 became 1 January Meiji 6. Era names (令和) are still used alongside the Western year.',
          from: { y: 1873, m: 1, d: 1 },
          fmt: (g, D) => ({ native: fmt('ja-JP', DMY).format(D), latin: 'year · month · day', tr: { kind: 'full' } }) },

        /* ===== In use today ===== */
        { id: 'japanese', status: 'current', use: 'official', lat: 37.2, lng: 138.6,
          name: 'Japanese era (gengō)', region: 'Japan', type: 'Gregorian months, imperial era years',
          epoch: 'Accession of the current emperor (Reiwa 1 = 2019)',
          used: 'Since 645 (Taika); one era per reign since 1868',
          note: 'Used on official forms, coins and newspapers. The first year of an era is written 元年 (gannen), not 1年.',
          year: '{era} {n}', gannen: true,
          from: { y: 1873, m: 1, d: 1 },
          fmt: (g, D) => { const p = parts('ja-JP-u-ca-japanese', { era: 'long', year: 'numeric' }, D);
              const n = +p.year, eraJa = p.era, ERA_EN = { '明治': 'Meiji', '大正': 'Taishō', '昭和': 'Shōwa', '平成': 'Heisei', '令和': 'Reiwa' };
              return { native: eraJa + (n === 1 ? '元' : n) + '年' + g.m + '月' + g.d + '日',
                       latin: (ERA_EN[eraJa] || eraJa) + ' ' + n + ', ' + g.m + '/' + g.d,
                       tr: Object.assign(trGreg(n, g.m, g.d), { era: eraJa, eraKey: ERA_EN[eraJa] || eraJa }) }; } },
        { id: 'roc', status: 'current', use: 'official', lat: 23.7, lng: 121.0,
          name: 'Minguo calendar', region: 'Taiwan', type: 'Gregorian months, Republic-era years',
          epoch: 'Founding of the Republic of China, 1912', used: 'Since 1912; official in Taiwan',
          note: 'Year = Western year − 1911. It runs in step with North Korea’s Juche year.',
          year: 'Minguo {n}', gannen: true,
          from: { y: 1912, m: 1, d: 1 },
          fmt: g => { const n = g.y - 1911;
              return { native: '民國' + (n === 1 ? '元' : n) + '年' + g.m + '月' + g.d + '日', latin: 'Minguo ' + n + ', ' + g.m + '/' + g.d, tr: trGreg(n, g.m, g.d) }; } },
        { id: 'juche', status: 'historical', lat: 40.3, lng: 127.0,
          name: 'Juche calendar', region: 'North Korea', type: 'Gregorian months, Juche years',
          epoch: 'Birth of Kim Il Sung, 1912', used: '1997–2024: North Korea stopped printing the Juche year in October 2024',
          note: 'Written with the Western year in brackets: 주체115(2026)년.',
          year: 'Juche {n}',
          from: { y: 1912, m: 1, d: 1 }, endYear: 2024,
          fmt: g => { const n = g.y - 1911;
              return { native: '주체' + n + '(' + g.y + ')년 ' + g.m + '월 ' + g.d + '일', latin: 'Juche ' + n + ', ' + g.m + '/' + g.d, tr: trGreg(n, g.m, g.d) }; } },
        { id: 'buddhist', status: 'current', use: 'official', lat: 15.6, lng: 100.9,
          name: 'Thai solar calendar', region: 'Thailand', type: 'Solar, Buddhist Era years',
          epoch: 'Buddhist Era: the Buddha’s parinirvana, 543 BC by Thai reckoning',
          used: 'Official since 1912 (BE year), with 1 January as New Year since 1941',
          note: 'Year = Western year + 543. Sri Lanka, Myanmar and Cambodia count the Buddhist Era one year apart from Thailand.',
          year: '{n} BE',
          from: { y: 1941, m: 1, d: 1 },
          fmt: (g, D) => ({ native: thaiDigits(g.d) + ' ' + thaiMonth(D) + ' พ.ศ. ' + thaiDigits(g.y + 543), latin: g.d + '/' + g.m + '/' + (g.y + 543) + ' BE', tr: trGreg(g.y + 543, g.m, g.d) }) },
        { id: 'chinese', status: 'current', use: 'popular', lat: 33.5, lng: 104.0,
          name: 'Chinese lunisolar calendar', region: 'China', type: 'Lunisolar',
          epoch: 'No running year count; years cycle through 60 stem–branch names',
          used: 'Fixes the Spring Festival, Mid-Autumn and other holidays',
          note: 'Months follow the new moon at Beijing; a leap month is added about 7 times in 19 years.',
          year: '{gzPy} year ({animal})',
          from: { y: 1, m: 1, d: 1 },
          fmt: (g, D) => { const c = lunar('chinese', D), cy = cycle(c.relatedYear);
              return { native: '农历' + cy.gz + '年' + (c.leap ? '闰' : '') + lunarMonthHan(c.month) + '月' + lunarDay(c.day),
                       latin: cy.gzPy + ' year, ' + (c.leap ? 'leap ' : '') + 'month ' + c.month + ', day ' + c.day,
                       tr: Object.assign({ kind: 'lunar', m: c.month, leap: c.leap, d: c.day }, cy) }; } },
        { id: 'dangi', status: 'current', use: 'popular', lat: 35.9, lng: 128.0,
          name: 'Korean lunisolar calendar', region: 'South Korea', type: 'Lunisolar',
          epoch: 'No running year count; 60-year cycle', used: 'Fixes Seollal and Chuseok',
          note: 'Same rules as the Chinese calendar but computed for Korean time, so a new moon near midnight can start a month one day apart.',
          year: '{gzPy} year ({animal})',
          from: { y: 1, m: 1, d: 1 },
          fmt: (g, D) => { const c = lunar('dangi', D), cy = cycle(c.relatedYear);
              return { native: '음력 ' + cy.gzKo + '년 ' + (c.leap ? '윤' : '') + c.month + '월 ' + c.day + '일',
                       latin: 'lunar ' + (c.leap ? 'leap ' : '') + 'month ' + c.month + ', day ' + c.day,
                       tr: Object.assign({ kind: 'lunar', m: c.month, leap: c.leap, d: c.day }, cy) }; } },
        { id: 'hebrew', status: 'current', use: 'official', lat: 31.2, lng: 34.9,
          name: 'Hebrew calendar', region: 'Israel', type: 'Lunisolar',
          epoch: 'Anno Mundi: the traditional date of Creation, 3761 BC',
          used: 'Official in Israel alongside the Gregorian calendar',
          note: 'Years and days are written in Hebrew letters (תשפ״ז = 787). The year starts in autumn at Rosh Hashanah.',
          from: { y: 1, m: 1, d: 1 },
          fmt: (g, D) => { const h = parts('he-u-ca-hebrew', DMY, D), e = parts('en-u-ca-hebrew', DMY, D);
              const mi = HEB_ICU.indexOf(e.month);
              return { native: hebrewNumeral(+h.day) + ' ב' + h.month + ' ' + hebrewNumeral(+h.year % 1000),
                       latin: e.day + ' ' + e.month + ' ' + e.year,
                       tr: mi < 0 ? { kind: 'fixed', text: e.day + ' ' + e.month + ' ' + e.year } : trList('hebrew', +e.year, mi, +e.day) }; } },
        { id: 'islamic', status: 'current', use: 'official', lat: 23.6, lng: 45.0,
          name: 'Islamic (Hijri) calendar', region: 'Saudi Arabia', type: 'Lunar (no leap month)',
          epoch: 'The Hijra, Muhammad’s move to Medina, AD 622',
          used: 'Religious use worldwide; civil in Saudi Arabia (Umm al-Qura tables)',
          note: 'A year is about 354 days, so Ramadan moves about 11 days earlier each Western year and goes round the seasons in 33 years.',
          year: '{n} AH',
          from: { y: 622, m: 7, d: 19 },
          fmt: (g, D) => { const n = calNum('islamic-umalqura', D);
              return { native: fmt('ar-SA-u-ca-islamic-umalqura', { dateStyle: 'long' }).format(D), latin: n.d + '/' + n.m + '/' + n.y + ' AH',
                       tr: trList('islamic', n.y, n.m - 1, n.d) }; } },
        { id: 'persian', status: 'current', use: 'official', lat: 32.0, lng: 54.5,
          name: 'Solar Hijri calendar', region: 'Iran', type: 'Solar (astronomical)',
          epoch: 'The Hijra, AD 622, counted in solar years',
          used: 'Official in Iran since 1925. Afghanistan used it officially until 2022, when the government moved to the lunar Hijri; people there still use it',
          note: 'The year begins at the exact moment of the March equinox (Nowruz), which makes it one of the most accurate calendars in use.',
          year: '{n} SH',
          from: { y: 622, m: 3, d: 22 },
          fmt: (g, D) => { const n = calNum('persian', D), p = parts('fa-IR-u-ca-persian', DMY, D);
              return { native: p.day + ' ' + p.month + ' ' + p.year, latin: n.d + '/' + n.m + '/' + n.y + ' SH', tr: trList('persian', n.y, n.m - 1, n.d) }; } },
        { id: 'indian', status: 'current', use: 'official', lat: 22.5, lng: 78.5,
          name: 'Indian national calendar', region: 'India', type: 'Solar',
          epoch: 'Śaka era, AD 78', used: 'Official since 1957, beside the Gregorian calendar',
          note: 'A reformed, fixed calendar. Festivals still follow the many regional Hindu lunisolar calendars.',
          year: 'Śaka {n}',
          from: { y: 1957, m: 3, d: 22 },
          fmt: (g, D) => { const n = calNum('indian', D);
              return { native: SAKA_HI[n.m - 1] + ' ' + devaDigits(n.d) + ', ' + devaDigits(n.y) + ' शक', latin: n.d + '/' + n.m + '/' + n.y + ' Śaka', tr: trList('indian', n.y, n.m - 1, n.d) }; } },
        { id: 'bengali', status: 'current', use: 'official', lat: 23.9, lng: 90.3,
          name: 'Bengali calendar (Bangabda)', region: 'Bangladesh', type: 'Solar (fixed rules)',
          epoch: 'Bangabda, AD 593', used: 'Official in Bangladesh; the 2019 revision is shown',
          note: 'New Year, Pohela Boishakh, is fixed on 14 April. West Bengal in India keeps an older astronomical version, so dates there can differ by a day.',
          year: '{n} BS',
          from: { y: 1987, m: 4, d: 14 },
          fmt: g => { const b = bengali(g);
              return { native: localeDigits(b.d, 'bn-BD') + ' ' + BN[b.m] + ' ' + localeDigits(b.y, 'bn-BD') + ' বঙ্গাব্দ',
                       latin: b.d + '/' + (b.m + 1) + '/' + b.y + ' BS', tr: trList('bengali', b.y, b.m, b.d) }; } },
        { id: 'ethiopic', status: 'current', use: 'official', lat: 9.0, lng: 39.5,
          name: 'Ethiopian calendar', region: 'Ethiopia · Eritrea', type: 'Solar: 12 months of 30 days + a 13th of 5–6',
          epoch: 'Incarnation era, AD 8 by the Gregorian count', used: 'Official in Ethiopia',
          note: 'Seven or eight years behind the Western count; New Year (Enkutatash) falls on 11 September.',
          year: '{n} E.C.',
          from: { y: 8, m: 8, d: 27 },
          fmt: (g, D) => { const n = calNum('ethiopic', D), a = parts('am-u-ca-ethiopic', DMY, D);
              return { native: a.month + ' ' + n.d + ' ቀን ' + n.y + ' ዓ.ም.', latin: n.d + '/' + n.m + '/' + n.y + ' E.C.', tr: trList('ethiopic', n.y, n.m - 1, n.d) }; } },
        { id: 'coptic', status: 'current', use: 'religious', lat: 26.6, lng: 30.6,
          name: 'Coptic calendar', region: 'Egypt', type: 'Solar: 12 × 30 days + 5–6 epagomenal days',
          epoch: 'Era of the Martyrs, AD 284 (accession of Diocletian)',
          used: 'Coptic Church; Egyptian farmers still sow by its months',
          note: 'The direct heir of the ancient Egyptian civil calendar, with a leap day added.',
          year: '{n} A.M.',
          from: { y: 284, m: 8, d: 29 },
          fmt: (g, D) => { const n = calNum('coptic', D), a = parts('ar-EG-u-ca-coptic', DMY, D);
              return { native: a.day + ' ' + a.month + ' ' + a.year + ' للشهداء', latin: n.d + '/' + n.m + '/' + n.y + ' A.M.', tr: trList('coptic', n.y, n.m - 1, n.d) }; } },
        { id: 'julian', status: 'current', use: 'religious', lat: 58.0, lng: 45.0,
          name: 'Julian calendar (Old Style)', region: 'Russian Orthodox Church', type: 'Solar',
          epoch: 'Anno Domini', used: 'Civil in Russia until 1918; today the church calendar of the Russian, Serbian, Georgian and Jerusalem Orthodox churches and Mount Athos',
          note: 'Now 13 days behind the Gregorian calendar, which is why Russian Orthodox Christmas falls on 7 January.',
          year: '{n} (Old Style)',
          from: { y: 1, m: 1, d: 1 },
          fmt: g => { const J = julianOf(g);
              return { native: J.d + ' ' + RU_GEN[J.m - 1] + ' ' + J.y + ' г. (ст. ст.)', latin: J.d + '/' + J.m + '/' + J.y + ' O.S.', tr: trGreg(J.y, J.m, J.d) }; } },
        { id: 'amazigh', status: 'current', use: 'popular', lat: 31.5, lng: -2.0,
          name: 'Amazigh (Berber) calendar', region: 'Morocco · Algeria', type: 'Solar (Julian months)',
          epoch: 'Accession of Pharaoh Shoshenq I, 950 BC',
          used: 'Agricultural calendar; Yennayer is a public holiday in Algeria (2018) and Morocco (2024)',
          note: 'Keeps the Julian month lengths, so Yennayer 1 falls on 14 January today. The year count was proposed in 1980. Months are shown in Tifinagh, the script of Standard Moroccan Tamazight; Kabyle in Algeria writes them in Latin letters (Yennayer, Furar…). Algeria keeps Yennayer as a public holiday on 12 January, Morocco on 14 January.',
          from: { y: 1980, m: 1, d: 14 },
          fmt: g => { const J = julianOf(g);
              return { native: J.d + ' ' + AMZ_TFNG[J.m - 1] + ' ' + (J.y + 950), latin: J.d + ' ' + AMZ[J.m - 1] + ' ' + (J.y + 950), tr: trList('amazigh', J.y + 950, J.m - 1, J.d) }; } },

        { id: 'nepali', status: 'current', use: 'official', lat: 27.7, lng: 85.3,
          name: 'Vikram Samvat (Nepal)', region: 'Nepal', type: 'Solar (sidereal), month lengths fixed each year',
          epoch: 'Vikram Samvat, 57 BC', used: 'Official calendar of Nepal: government documents, citizenship papers, the fiscal and school year',
          note: 'Months run 29 to 32 days and are fixed in advance by Nepal’s calendar committee (Nepal Panchanga Nirnayak Samiti), so dates come from its published tables — available here to the end of 2083 VS (April 2027).',
          year: '{n} VS',
          from: { y: 1943, m: 4, d: 14 },
          fmt: g => { const n = nepali(gregToJdn(g.y, g.m, g.d)); if (!n) return null;
              return { native: 'वि.सं. ' + devaDigits(n.y) + ' ' + NP_MONTHS[n.m] + ' ' + devaDigits(n.d) + ' गते', latin: n.d + '/' + (n.m + 1) + '/' + n.y + ' VS', tr: trList('nepali', n.y, n.m, n.d) }; } },
        { id: 'vietnamese', status: 'current', use: 'popular', lat: 21.0, lng: 105.8,
          name: 'Vietnamese lunisolar calendar (âm lịch)', region: 'Vietnam', type: 'Lunisolar',
          epoch: 'No running year count; years cycle through 60 stem–branch names',
          used: 'Not the state calendar (Gregorian is, by decree since 1967), but it fixes Tết, the Hùng Kings’ day and family anniversaries',
          note: 'Computed for Vietnam’s own time zone (UTC+7), so a month can start a day earlier than in China — in 1985 Tết came a whole month earlier (21 January, against 20 February in China).',
          year: 'year {gzVi}',
          from: { y: 1, m: 1, d: 1 },
          fmt: (g, D) => { const c = lunar('vietnamese', D), cy = cycle(c.relatedYear);
              return { native: 'ngày ' + c.day + ' tháng ' + c.month + (c.leap ? ' nhuận' : '') + ' năm ' + cy.gzVi,
                       latin: (c.leap ? 'leap ' : '') + 'month ' + c.month + ', day ' + c.day + ', ' + cy.gzVi,
                       tr: Object.assign({ kind: 'lunar', m: c.month, leap: c.leap, d: c.day }, cy) }; } },
        { id: 'javanese', status: 'current', use: 'popular', lat: -7.8, lng: 110.4,
          name: 'Javanese calendar', region: 'Java, Indonesia', type: 'Lunar (arithmetic, 8-year windu) with a 5-day market week',
          epoch: 'Anno Javanico: continued from the Saka year 1555 when Sultan Agung created it in 1633',
          used: 'Popular in Java: weddings, selamatan and market days are chosen by weton — the weekday plus the pasaran day',
          note: 'Shown with the weekday and the pasaran day (Legi, Pahing, Pon, Wage, Kliwon). Javanese year = Hijri year + 512, but the arithmetic year can start a day apart from the Islamic one (1 Sura 1960 fell on 17 June 2026, 1 Muharram on 16 June).',
          year: '{n} AJ',
          from: { y: 1936, m: 3, d: 24 },
          fmt: g => { const j = gregToJdn(g.y, g.m, g.d), v = javanese(j); if (!v) return null;
              return { native: JAV_DAYS[weekday(j)] + ' ' + PASARAN[mod(j, 5)] + ', ' + v.d + ' ' + JAV_MONTHS[v.m] + ' ' + v.y + ' ' + v.yearName,
                       latin: JAV_DAYS[weekday(j)] + ' ' + PASARAN[mod(j, 5)] + ', ' + v.d + ' ' + JAV_MONTHS[v.m] + ' ' + v.y + ' AJ', tr: trList('javanese', v.y, v.m, v.d) }; } },
        { id: 'pawukon', status: 'current', use: 'popular', lat: -8.45, lng: 115.25,
          name: 'Balinese Pawukon', region: 'Bali, Indonesia', type: '210-day cycle: 30 wuku weeks of 7 days, with 5-day and other weeks running alongside',
          epoch: 'No year count: the cycle simply repeats',
          used: 'Bali’s Hindu festivals and temple anniversaries; Galungan falls every 210 days on Buda Kliwon Dungulan',
          note: 'Shown as the 7-day weekday, the 5-day weekday and the wuku. Bali also keeps a lunisolar Saka year, whose new year (Nyepi) is a national holiday.',
          from: { y: 1, m: 1, d: 1 },
          fmt: g => { const j = gregToJdn(g.y, g.m, g.d), p = pawukon(j);
              const nat = BALI_DAYS[weekday(j)] + ' ' + PANCAWARA[mod(j, 5)] + ' · wuku ' + WUKU[p.wuku];
              return { native: nat, latin: nat, tr: { kind: 'wuku', n: p.wuku + 1, wuku: WUKU[p.wuku] } }; } },
        { id: 'kurdish', status: 'current', use: 'popular', lat: 36.2, lng: 44.0,
          name: 'Kurdish calendar', region: 'Kurdistan Region, Iraq', type: 'Solar (Solar Hijri months under Kurdish names)',
          epoch: 'The Median era, 700 BC: year = Solar Hijri year + 1321',
          used: 'Cultural use among Kurds; Newroz (21 March), its new year, is an official holiday in the Kurdistan Region',
          note: 'The months match the Iranian calendar one for one — Rezber is Mehr — so it shares the Iranian new year at the March equinox.',
          year: '{n} (Kurdish)',
          from: { y: 622, m: 3, d: 22 },
          fmt: (g, D) => { const n = calNum('persian', D), y = n.y + 1321;
              return { native: arabDigits(n.d) + ' ' + KU_MONTHS[n.m - 1] + ' ' + arabDigits(y), latin: n.d + '/' + n.m + '/' + y + ' (Kurdish)', tr: trList('kurdish', y, n.m - 1, n.d) }; } },
        { id: 'akan', status: 'current', use: 'popular', lat: 6.7, lng: -1.6,
          name: 'Akan calendar (Adaduanan)', region: 'Asante, Ghana', type: '42-day cycle: a 6-day week turning against the 7-day week',
          epoch: 'No year count: the 42-day cycle runs continuously',
          used: 'Sets the Adae festivals of the Asante and other Akan states; Akan day names (Kwasi, Kofi…) come from the 7-day week',
          note: 'Akwasidae, the main Adae, falls on a Sunday every 42 days and is held at Manhyia Palace in Kumasi; Awukudae falls on a Wednesday.',
          from: { y: 1, m: 1, d: 1 },
          fmt: (g, D) => { const j = gregToJdn(g.y, g.m, g.d), k = akanDay(j), dab = AKAN_DABONE[k];
              const toNext = mod(28 - k, 42), next = jdnToGreg(j + toNext);
              return { native: TWI_DAYS[weekday(j)] + (dab ? ' · ' + dab : ''), latin: TWI_DAYS[weekday(j)] + ', day ' + k + ' of 42',
                       tr: { kind: 'akan', today: dab || null, n: toNext, next } }; } },
        { id: 'iceland', status: 'current', use: 'popular', lat: 64.9, lng: -18.5,
          name: 'Old Icelandic calendar', region: 'Iceland', type: 'Solar: 52 weeks + a leap week, counted in weeks of summer and winter',
          epoch: 'No year count of its own',
          used: 'Printed every year in the University of Iceland’s almanac; the First Day of Summer is a public holiday, and Bóndadagur (1 Þorri) and Konudagur (1 Góa) are widely kept',
          note: 'Summer begins on the Thursday between 19 and 25 April, winter on a Saturday in late October. Between Sólmánuður and Heyannir come four “extra nights”, and a leap week (sumarauki) in some years.',
          from: { y: 1700, m: 4, d: 19 },
          fmt: g => { const j = gregToJdn(g.y, g.m, g.d), r = iceland(j);
              const nat = IS_DAYS[weekday(j)] + ' í ' + r.week + '. viku ' + (r.season ? 'vetrar' : 'sumars') + (r.m === 12 ? ', aukanætur' : ', ' + r.d + '. dagur ' + IS_MONTHS_GEN[r.m]);
              return { native: nat, latin: (r.season ? 'winter' : 'summer') + ' week ' + r.week, tr: { kind: 'iceland', w: r.week, season: r.season, m: r.m, d: r.d } }; } },
        { id: 'bahai', status: 'current', use: 'religious', lat: 32.8, lng: 34.99,
          name: 'Bahá’í calendar (Badíʿ)', region: 'Bahá’í World Centre, Haifa', type: 'Solar: 19 months of 19 days + 4–5 intercalary days',
          epoch: 'The Báb’s declaration, 1844 (year 1 BE)',
          used: 'Bahá’ís worldwide, for feasts, holy days and the 19-day Fast',
          note: 'Since 2015 the year begins at the March equinox as seen in Tehran; dates here follow the Bahá’í World Centre’s official table to 2065. The intercalary days, Ayyám-i-Há, come before the last month, the month of fasting.',
          year: '{n} BE',
          from: { y: 1844, m: 3, d: 21 },
          fmt: g => { const b = bahai(gregToJdn(g.y, g.m, g.d)); if (!b) return null;
              const fa = n => localeDigits(n, 'fa-IR');
              return { native: fa(b.d) + ' ' + BAHAI_FA[b.m] + ' ' + fa(b.y) + ' بدیع', latin: b.d + ' ' + BAHAI_LAT[b.m] + ' ' + b.y + ' B.E.', tr: trList('bahai', b.y, b.m, b.d) }; } },
        { id: 'parsi', status: 'current', use: 'religious', lat: 19.0, lng: 72.85,
          name: 'Parsi calendar (Shahanshahi)', region: 'Parsis, Mumbai', type: 'Solar, 365 days with no leap day: 12 × 30 + 5 Gatha days',
          epoch: 'Accession of Yazdegerd III, AD 632 (Yazdegerdi era, Y.Z.)',
          used: 'The Parsi Zoroastrians of India; Parsi New Year (Navroz) is a public holiday in Maharashtra and Gujarat',
          note: 'Each of the 30 days has its own name (roj), as each month (mah) does. With no leap day, Navroz moves a day earlier every four years; the minority Qadimi reckoning runs 30 days ahead.',
          year: '{n} Y.Z.',
          from: { y: 632, m: 6, d: 16 },
          fmt: g => { const p = parsi(gregToJdn(g.y, g.m, g.d)); if (!p) return null;
              const nat = p.m < 12 ? 'Roj ' + PARSI_ROJ[p.d - 1] + ', Mah ' + PARSI_MAH[p.m] + ', ' + p.y + ' Y.Z.' : 'Gatha ' + PARSI_GATHA[p.d - 1] + ', ' + p.y + ' Y.Z.';
              return { native: nat, latin: nat, tr: trList('parsi', p.y, p.m, p.d) }; } },
        { id: 'bohra', status: 'current', use: 'religious', lat: 21.19, lng: 72.83,
          name: 'Dawoodi Bohra Hijri (Fatimid)', region: 'Dawoodi Bohras, Surat', type: 'Lunar, tabular: months of 30 and 29 days, 11 leap years in 30',
          epoch: 'The Hijra, AD 622',
          used: 'The Dawoodi Bohra community worldwide (about one million), for Ramadan, Eid and all religious dates',
          note: 'A fixed arithmetic calendar inherited from the Fatimids, so the Bohras’ Eid can come a day before the moon-sighted one — Eid al-Fitr 1445 was on 9 April 2024.',
          year: '{n} AH',
          from: { y: 622, m: 7, d: 15 },
          fmt: g => { const b = bohra(gregToJdn(g.y, g.m, g.d)); if (!b) return null;
              return { native: arabDigits(b.d) + ' ' + AR_MONTHS[b.m] + ' ' + arabDigits(b.y) + ' هـ', latin: b.d + '/' + (b.m + 1) + '/' + b.y + ' AH', tr: trList('islamic', b.y, b.m, b.d) }; } },
        { id: 'kiche', status: 'current', use: 'religious', lat: 14.94, lng: -91.11,
          name: 'K’iche’ Maya day count (Cholq’ij)', region: 'Guatemalan highlands', type: '260-day count: 13 numbers × 20 day names',
          epoch: 'No year 1: the count has run unbroken since the Classic Maya',
          used: 'Maya daykeepers (ajq’ijab’) for ceremonies, divination and naming; Wajxaqib’ B’atz’ (8 B’atz’) opens their new cycle',
          note: 'The living count is the ancient one without a break: it falls on the same day as the classic Tzolk’in in the Long Count correlation used here. Wajxaqib’ B’atz’ fell on 18 January 2025 and 22 June 2026.',
          from: { y: 1, m: 1, d: 1 },
          fmt: g => { const days = gregToJdn(g.y, g.m, g.d) - 584283, n = mod(days + 3, 13), s = mod(days + 19, 20);
              return { native: KICHE_NUM[n] + ' ' + KICHE_DAYS[s], latin: (n + 1) + ' ' + KICHE_DAYS[s], tr: { kind: 'fixed', text: (n + 1) + ' ' + KICHE_DAYS[s] } }; } },

        { id: 'tibetan', status: 'current', use: 'popular', lat: 29.65, lng: 91.1,
          name: 'Tibetan calendar (Phugpa)', region: 'Tibet · Tibetans in exile', type: 'Lunisolar, with skipped and doubled days',
          epoch: 'Tibetan royal year: the first king, 127 BC (2026–27 is 2153)',
          used: 'Tibetans in China and in exile, Ladakh, Sikkim and Himalayan Buddhists; Losar, its new year, is a holiday in the Tibet Autonomous Region',
          note: 'Each calendar day takes the number of the lunar day current at dawn, so a number can be skipped or repeated. Computed after Svante Janson’s “Tibetan Calendar Mathematics”, checked against his tables of New Years and of every skipped and repeated day in 2012.',
          year: 'Tibetan year {n} ({animal})',
          from: { y: 1027, m: 2, d: 1 },
          fmt: (g, D) => { const t = tibDate('phugpa', g); if (!t) return null;
              return { native: 'བོད་ལོ་' + tibDigits(t.Y + 127) + ' ' + tibYearName(t.Y) + '། ཟླ་' + tibDigits(t.M) + (t.leap ? ' ལྷག' : '') + ' ཚེས་' + tibDigits(t.d),
                       latin: 'Tibetan year ' + (t.Y + 127) + ', ' + (t.leap ? 'leap ' : '') + 'month ' + t.M + ', day ' + t.d,
                       tr: Object.assign({ kind: 'lunar', n: t.Y + 127, m: t.M, leap: t.leap, d: t.d }, cycle(t.Y)) }; } },
        { id: 'mongolian', status: 'current', use: 'popular', lat: 47.9, lng: 106.9,
          name: 'Mongolian lunar calendar', region: 'Mongolia', type: 'Lunisolar, with skipped and doubled days (Tibetan type)',
          epoch: 'No running year count; years named by element and animal in a 60-year cycle',
          used: 'Not the state calendar (Gregorian is, since 1948), but it sets Tsagaan Sar, the new year, and Chinggis Khaan’s birthday, both public holidays',
          note: 'The New Genden (Tögs Buyant) version of the Tibetan calendar, created in 1786; it can start the year a day or a month apart from Tibet — Tsagaan Sar 2025 fell on 1 March, Losar on 28 February.',
          year: '{animal} year',
          from: { y: 1747, m: 4, d: 9 },
          fmt: (g, D) => { const t = tibDate('mongol', g); if (!t) return null;
              return { native: MN_COLOUR[cycleIdx(t.Y) % 10 >> 1] + ' ' + MN_ANIMAL[cycleIdx(t.Y) % 12] + ' жилийн ' + (t.leap ? 'илүү ' : '') + t.M + '-р сарын ' + t.d,
                       latin: (t.leap ? 'leap ' : '') + 'month ' + t.M + ', day ' + t.d,
                       tr: Object.assign({ kind: 'lunar', m: t.M, leap: t.leap, d: t.d }, cycle(t.Y)) }; } },
        { id: 'bhutanese', status: 'current', use: 'official', lat: 27.47, lng: 89.64,
          name: 'Bhutanese calendar', region: 'Bhutan', type: 'Lunisolar, with skipped and doubled days (Tibetan type)',
          epoch: 'No running year count; years named by element, gender and animal',
          used: 'Co-official: Bhutan’s Acts carry both the Bhutanese and the Gregorian date; Losar and Buddhist holidays follow it',
          note: 'Unlike Tibet, a leap month takes the number of the month before it, and the Bhutanese weekday names run one day apart from Tibet’s.',
          year: '{animal} year',
          from: { y: 1754, m: 4, d: 22 },
          fmt: (g, D) => { const t = tibDate('bhutan', g); if (!t) return null;
              return { native: tibYearName(t.Y) + '། ཟླ་' + tibDigits(t.M) + (t.leap ? ' ལྷག' : '') + ' ཚེས་' + tibDigits(t.d),
                       latin: (t.leap ? 'leap ' : '') + 'month ' + t.M + ', day ' + t.d,
                       tr: Object.assign({ kind: 'lunar', m: t.M, leap: t.leap, d: t.d }, cycle(t.Y)) }; } },
        { id: 'myanmar', status: 'current', use: 'official', lat: 19.75, lng: 96.1,
          name: 'Myanmar calendar', region: 'Myanmar', type: 'Lunisolar: 12 months, with a 13th (2nd Waso) and an extra day in some years',
          epoch: 'Myanmar Era (ME), AD 638',
          used: 'Co-official: government documents carry the Myanmar date beside the Gregorian; Thingyan (new year) and the full-moon festivals follow it',
          note: 'Months count the waxing and waning moon separately, 1–15 each. Computed with Yan Naing Aye’s method; the Calendar Advisory Board can still adjust years ahead, so future dates are provisional.',
          year: '{n} ME',
          from: { y: 1738, m: 4, d: 10 },
          fmt: g => { const m = myanmar(gregToJdn(g.y, g.m, g.d)); if (!m) return null;
              const mi = m.mm === 4 && m.myt ? 15 : m.mm, mname = MM_MONTHS[mi];
              const phase = m.mp === 0 ? 'လဆန်း ' + mmDigits(m.fd) + ' ရက်' : m.mp === 1 ? 'လပြည့်' : m.mp === 2 ? 'လဆုတ် ' + mmDigits(m.fd) + ' ရက်' : 'လကွယ်';
              return { native: mmDigits(m.my) + ' ခုနှစ်၊ ' + mname + phase, latin: 'ME ' + m.my + ', month ' + mi + ', ' + ['waxing', 'full moon', 'waning', 'new moon'][m.mp] + ' ' + m.fd,
                       tr: { kind: 'myanmar', n: m.my, mi, mp: m.mp, fd: m.fd } }; } },
        { id: 'khmer', status: 'current', use: 'popular', lat: 11.55, lng: 104.92,
          name: 'Khmer lunar calendar (chhankitek)', region: 'Cambodia', type: 'Lunisolar, with a leap month or leap day in some years',
          epoch: 'Buddhist Era: the year turns the day after Visak Bochea, one year ahead of Thailand’s count',
          used: 'Sets Visak Bochea, Pchum Ben, the Water Festival and other public holidays',
          note: 'Days are counted 1–15 in the waxing half (កើត) and 1–15 in the waning half (រោច). Computed with the chhankitek arithmetic, the same as the momentkh library.',
          from: { y: 1900, m: 1, d: 1 },
          fmt: g => { const j = gregToJdn(g.y, g.m, g.d), k = khmerLunar(j); if (!k) return null;
              const be = khmerBE(j), d = k.dayNum % 15 + 1, waning = k.dayNum >= 15;
              return { native: 'ថ្ងៃ' + KH_DAYS[weekday(j)] + ' ' + khDigits(d) + (waning ? 'រោច' : 'កើត') + ' ខែ' + KH_MONTHS[k.month] + ' ព.ស. ' + khDigits(be),
                       latin: d + (waning ? ' roch' : ' kaet') + ', month ' + k.month + ', BE ' + be,
                       tr: { kind: 'khmer', n: be, mi: k.month, waning, d } }; } },

        /* ===== Historical — as if they had kept counting ===== */
        { id: 'yuan', status: 'historical', lat: 42.4, lng: 116.2,
          name: 'Yuan dynasty era: Zhizheng', region: 'Yuan China (Shangdu)', type: 'Lunisolar, imperial era years',
          epoch: 'Zhizheng 1 = 1341, Emperor Huizong (Toghon Temür)', used: '1341–1368, the last Yuan era in China',
          note: 'The Yuan astronomer Guo Shoujing’s Shoushi calendar (1281) used a year of 365.2425 days — the Gregorian value, 300 years before Gregory. Months here follow today’s Chinese calendar.',
          year: 'Zhizheng {n}', gannen: true,
          from: { y: 1341, m: 2, d: 17 }, endYear: 1368,
          fmt: (g, D) => { const c = lunar('chinese', D), n = c.relatedYear - 1340;
              return { native: '至正' + (n === 1 ? '元' : han(n)) + '年' + (c.leap ? '閏' : '') + lunarMonthHan(c.month) + '月' + lunarDay(c.day) + '日',
                       latin: 'Zhizheng ' + n + ', ' + (c.leap ? 'leap ' : '') + 'month ' + c.month + ', day ' + c.day,
                       tr: { kind: 'lunar', n, m: c.month, leap: c.leap, d: c.day } }; } },
        { id: 'ming', status: 'historical', lat: 39.9, lng: 116.4,
          name: 'Ming dynasty era: Chongzhen', region: 'Beijing', type: 'Lunisolar, imperial era years',
          epoch: 'Chongzhen 1 = 1628, the last Ming era in Beijing',
          used: '1628–1644; Joseon Korea kept counting years “after Chongzhen” for over two centuries',
          note: 'Month and day follow today’s Chinese calendar. The Ming used the older Datong rules, which could place a leap month differently.',
          year: 'Chongzhen {n}', gannen: true,
          from: { y: 1628, m: 2, d: 5 }, endYear: 1644,
          fmt: (g, D) => { const c = lunar('chinese', D), n = c.relatedYear - 1627;
              return { native: '崇禎' + (n === 1 ? '元' : han(n)) + '年' + (c.leap ? '閏' : '') + lunarMonthHan(c.month) + '月' + lunarDay(c.day) + '日',
                       latin: 'Chongzhen ' + n + ', ' + (c.leap ? 'leap ' : '') + 'month ' + c.month + ', day ' + c.day,
                       tr: { kind: 'lunar', n, m: c.month, leap: c.leap, d: c.day } }; } },
        { id: 'qing', status: 'historical', lat: 44.0, lng: 125.0,
          name: 'Qing dynasty era: Xuantong', region: 'Qing China', type: 'Lunisolar, imperial era years',
          epoch: 'Xuantong 1 = 1909, reign of Puyi', used: '1909–1912, the last imperial era of China',
          note: 'Puyi abdicated in Xuantong 3; the court inside the Forbidden City kept using the era until 1924.',
          year: 'Xuantong {n}', gannen: true,
          from: { y: 1909, m: 1, d: 22 }, endYear: 1912,
          fmt: (g, D) => { const c = lunar('chinese', D), n = c.relatedYear - 1908;
              return { native: '宣統' + (n === 1 ? '元' : han(n)) + '年' + (c.leap ? '閏' : '') + lunarMonthHan(c.month) + '月' + lunarDay(c.day) + '日',
                       latin: 'Xuantong ' + n + ', ' + (c.leap ? 'leap ' : '') + 'month ' + c.month + ', day ' + c.day,
                       tr: { kind: 'lunar', n, m: c.month, leap: c.leap, d: c.day } }; } },
        { id: 'ryukyu', status: 'historical', lat: 26.22, lng: 127.72,
          name: 'Ryukyu Kingdom: Qing era Guangxu', region: 'Shuri, Ryukyu', type: 'Lunisolar, Chinese era years',
          epoch: 'Guangxu 1 = 1875; Ryukyu had no era names of its own and dated by Ming, then Qing eras',
          used: 'Until the kingdom was annexed by Japan in 1879; the court kept using Guangxu after Tokyo ordered it to adopt Meiji in 1875',
          note: 'Ryukyu took its almanac from the Qing court along with its era names, so its dates followed the Chinese lunisolar calendar. Month and day here follow today’s Chinese calendar.',
          year: 'Guangxu {n}', gannen: true,
          from: { y: 1875, m: 2, d: 6 }, endYear: 1879,
          fmt: (g, D) => { const c = lunar('chinese', D), n = c.relatedYear - 1874;
              return { native: '光緒' + (n === 1 ? '元' : han(n)) + '年' + (c.leap ? '閏' : '') + lunarMonthHan(c.month) + '月' + lunarDay(c.day) + '日',
                       latin: 'Guangxu ' + n + ', ' + (c.leap ? 'leap ' : '') + 'month ' + c.month + ', day ' + c.day,
                       tr: { kind: 'lunar', n, m: c.month, leap: c.leap, d: c.day } }; } },
        { id: 'korean_empire', status: 'historical', lat: 37.4, lng: 126.2,
          name: 'Korean Empire era: Yunghui', region: 'Seoul', type: 'Gregorian months, imperial era years',
          epoch: 'Yunghui 1 = 1907, Emperor Sunjong', used: '3 August 1907 – 29 August 1910, the last Korean era name',
          note: 'Korea switched to the solar calendar on 1 January 1896 (era Geonyang, “adopting the sun”), so Korean Empire dates are Gregorian, not lunar.',
          year: 'Yunghui {n}', gannen: true,
          from: { y: 1907, m: 8, d: 3 }, endYear: 1910,
          fmt: g => { const n = g.y - 1906;
              return { native: '隆熙' + (n === 1 ? '元' : han(n)) + '年' + han(g.m) + '月' + han(g.d) + '日', latin: 'Yunghui ' + n + ', ' + g.m + '/' + g.d, tr: trGreg(n, g.m, g.d) }; } },
        { id: 'joseon', status: 'historical', lat: 38.6, lng: 125.2,
          name: 'Joseon dynasty: Founding era (Gaeguk)', region: 'Joseon Korea', type: 'Lunisolar, years from the dynasty’s founding',
          epoch: 'Founding of Joseon, 1392 = Gaeguk 1',
          used: 'Official 1894–1895 (Gabo Reform); before that Joseon dated by Ming, then Qing era names',
          note: 'Joseon kept the Chinese-style lunisolar calendar (Siheon-ryeok) until Korea switched to the solar calendar on 1 January 1896.',
          year: 'Gaeguk {n}',
          from: { y: 1392, m: 8, d: 5 }, endYear: 1895,
          fmt: (g, D) => { const c = lunar('dangi', D), n = c.relatedYear - 1391;
              return { native: '開國' + han(n) + '年' + (c.leap ? '閏' : '') + lunarMonthHan(c.month) + '月' + han(c.day) + '日',
                       latin: 'Gaeguk ' + n + ', ' + (c.leap ? 'leap ' : '') + 'month ' + c.month + ', day ' + c.day,
                       tr: { kind: 'lunar', n, m: c.month, leap: c.leap, d: c.day } }; } },
        { id: 'nguyen', status: 'historical', lat: 16.5, lng: 107.6,
          name: 'Nguyễn dynasty era: Bảo Đại', region: 'Huế, Vietnam', type: 'Lunisolar, imperial era years',
          epoch: 'Bảo Đại 1 = 1926', used: '1926–1945, the last era of Vietnam’s last dynasty',
          note: 'Months follow the Vietnamese lunar calendar, which tracked China’s until North Vietnam moved it to UTC+7 in 1968; since then a month can start a day earlier than in China.',
          year: 'Bảo Đại {n}', gannen: true,
          from: { y: 1926, m: 2, d: 13 }, endYear: 1945,
          fmt: (g, D) => { const c = lunar('vietnamese', D), n = c.relatedYear - 1925;
              return { native: '保大' + (n === 1 ? '元' : han(n)) + '年' + (c.leap ? '閏' : '') + lunarMonthHan(c.month) + '月' + lunarDay(c.day) + '日',
                       latin: 'Bảo Đại ' + n + ', ' + (c.leap ? 'leap ' : '') + 'month ' + c.month + ', day ' + c.day,
                       tr: { kind: 'lunar', n, m: c.month, leap: c.leap, d: c.day } }; } },
        { id: 'koki', status: 'historical', lat: 34.7, lng: 133.0,
          name: 'Japanese imperial year (Kōki)', region: 'Japan', type: 'Gregorian months, imperial-foundation years',
          epoch: 'Legendary accession of Emperor Jimmu, 660 BC',
          used: '1872–1945 in official use; the Zero fighter is named for the year 2600 (1940)',
          note: 'Year = Western year + 660.',
          year: 'Kōki {n}',
          from: { y: 1873, m: 1, d: 1 }, endYear: 1945,
          fmt: g => ({ native: '皇紀' + (g.y + 660) + '年' + g.m + '月' + g.d + '日', latin: 'Kōki ' + (g.y + 660) + ', ' + g.m + '/' + g.d, tr: trGreg(g.y + 660, g.m, g.d) }) },
        { id: 'rattanakosin', status: 'historical', lat: 12.6, lng: 99.3,
          name: 'Rattanakosin Era', region: 'Siam (Thailand)', type: 'Solar, years from the founding of Bangkok',
          epoch: 'Founding of Bangkok, 1782', used: '1889–1912, under Kings Chulalongkorn and Vajiravudh',
          note: 'The year began on 1 April, as Thai years did until 1941.',
          year: 'R.S. {n}',
          from: { y: 1889, m: 4, d: 1 }, endYear: 1912,
          fmt: (g, D) => { const rs = g.m >= 4 ? g.y - 1781 : g.y - 1782;
              return { native: thaiDigits(g.d) + ' ' + thaiMonth(D) + ' ร.ศ. ' + thaiDigits(rs),
                       latin: 'R.S. ' + rs + ', ' + g.m + '/' + g.d, tr: trGreg(rs, g.m, g.d) }; } },
        { id: 'iran_imperial', status: 'historical', lat: 35.7, lng: 51.4,
          name: 'Iranian Imperial calendar', region: 'Tehran', type: 'Solar (Solar Hijri months)',
          epoch: 'Accession of Cyrus the Great, 559 BC', used: 'March 1976 – August 1978 only',
          note: 'The Shah swapped the Islamic epoch for a monarchic one overnight (1355 → 2535); it was reversed two years later.',
          year: '{n} Imperial',
          from: { y: 1976, m: 3, d: 21 }, endYear: 1978,
          fmt: (g, D) => { const n = calNum('persian', D), p = parts('fa-IR-u-ca-persian', DMY, D), y = n.y + 1180;
              return { native: p.day + ' ' + p.month + ' ' + localeDigits(y, 'fa-IR') + ' شاهنشاهی', latin: n.d + '/' + n.m + '/' + y, tr: trList('persian', y, n.m - 1, n.d) }; } },
        { id: 'french_rep', status: 'historical', lat: 47.5, lng: 2.5,
          name: 'French Republican calendar', region: 'France', type: 'Solar: 12 months of three 10-day weeks + 5–6 festival days',
          epoch: 'Proclamation of the Republic, 22 September 1792',
          used: '1793–1805, and 18 days in the Paris Commune of 1871',
          note: 'Months are named for the weather (Brumaire = fog, Thermidor = heat). Leap years after year 20 follow Romme’s proposed rule.',
          year: 'year {n} of the Republic',
          from: { y: 1792, m: 9, d: 22 }, endYear: 1805,
          fmt: g => { const f = frenchRepublican(gregToJdn(g.y, g.m, g.d)); if (!f) return null;
              if (f.m === 12) return { native: FR_SANS[f.d - 1] + ', an ' + roman(f.y), latin: 'Sansculottides ' + f.d + ', year ' + f.y, tr: { kind: 'named', list: 'frenchSans', n: f.y, mi: f.d - 1 } };
              return { native: FR_DECADI[f.decadi] + ' ' + f.d + ' ' + FR_MONTHS[f.m] + ' an ' + roman(f.y), latin: f.d + ' ' + FR_MONTHS[f.m] + ', year ' + f.y, tr: trList('french', f.y, f.m, f.d) }; } },

        /* ===== Ancient ===== */
        { id: 'egyptian', status: 'historical', lat: 25.7, lng: 32.6,
          name: 'Ancient Egyptian civil calendar', region: 'Egypt (Thebes)', type: 'Solar, 365 days with no leap day: 3 seasons × 4 months of 30 days + 5 extra days',
          epoch: 'Era of Nabonassar, 747 BC, as used by Ptolemy’s astronomy',
          used: 'From the early 3rd millennium BC; Egyptians themselves counted years by the king’s reign',
          note: 'With no leap day it drifts one day every four years against the seasons, and comes back round after about 1,460 years (the Sothic cycle). The seasons are Akhet (flood), Peret (growing) and Shemu (harvest).',
          year: 'Nabonassar {n}',
          from: { y: 1, m: 1, d: 1 },
          fmt: g => { const e = egyptian(gregToJdn(g.y, g.m, g.d)); if (!e) return null;
              const SEASON = ['ꜣḫt', 'prt', 'šmw'];
              const nat = e.m === 12 ? 'ḥryw rnpt ' + e.d : roman(e.m % 4 + 1) + ' ' + SEASON[Math.floor(e.m / 4)] + ' ' + e.d;
              return { native: nat, latin: (e.m === 12 ? 'epagomenal day ' + e.d : roman(e.m % 4 + 1) + ' ' + ['Akhet', 'Peret', 'Shemu'][Math.floor(e.m / 4)] + ' ' + e.d) + ', Nabonassar ' + e.y,
                       tr: trList('egyptian', e.y, e.m, e.d) }; } },
        { id: 'roman', status: 'historical', lat: 41.0, lng: 15.5,
          name: 'Roman calendar (AUC)', region: 'Rome', type: 'Solar (Julian), counted back from Kalends, Nones and Ides',
          epoch: 'Ab urbe condita: founding of Rome, 753 BC',
          used: 'Julian calendar from 45 BC; AUC year numbers were mostly a scholars’ count',
          note: 'Romans counted days down to the next marker, inclusively: “a.d. III Non. Oct.” is the third day before the Nones of October.',
          year: '{n} AUC',
          from: { y: 1, m: 1, d: 1 }, endYear: 476,
          fmt: g => { const J = julianOf(g);
              return { native: romanDate(J.y, J.m, J.d) + ' ' + roman(J.y + 753) + ' a.u.c.', latin: J.d + '/' + J.m + ' (Julian), ' + (J.y + 753) + ' AUC', tr: trGreg(J.y + 753, J.m, J.d) }; } },
        { id: 'byzantine', status: 'historical', lat: 41.0, lng: 28.98,
          name: 'Byzantine calendar', region: 'Constantinople', type: 'Solar (Julian), year from 1 September',
          epoch: 'Creation of the world, 5509 BC',
          used: 'Official in the Byzantine Empire 988–1453; Russia until 1700',
          note: 'Years are written in Greek letters: ͵ζφλεʹ = 7535.',
          year: '{n} Anno Mundi',
          from: { y: 1, m: 1, d: 1 }, endYear: 1453,
          fmt: g => { const J = julianOf(g), am = J.y + (J.m >= 9 ? 5509 : 5508);
              return { native: greekNum(J.d) + ' ' + GR_GEN[J.m - 1] + ', ἔτους ' + greekNum(am), latin: J.d + '/' + J.m + ' (Julian), ' + am + ' AM', tr: trGreg(am, J.m, J.d) }; } },
        { id: 'aztec', status: 'historical', lat: 19.43, lng: -99.13,
          name: 'Aztec day count (tonalpohualli)', region: 'Tenochtitlan (Mexico City)', type: '260-day ritual count: 13 numbers × 20 day signs',
          epoch: 'No year 1: the count cycles endlessly; years were named in a 52-year round',
          used: 'Central Mexico until the Spanish conquest (1521); the same 260-day count as the Maya Tzolk’in',
          note: 'Tenochtitlan fell on 1 Coatl (1 Serpent), 13 August 1521 Julian — the anchor of the Caso correlation used here. Which day the 365-day year began is still debated, so only the day sign is shown. The Aztecs painted day signs as pictures, which Unicode does not encode; Nahuatl has been written in Latin letters since the 16th century, and that is how the day is shown.',
          from: { y: 1, m: 1, d: 1 }, endYear: 1521,
          fmt: g => { const days = gregToJdn(g.y, g.m, g.d) - 584283, num = mod(days + 3, 13), sign = mod(days + 19, 20);
              return { native: AZTEC_NUM[num] + ' ' + AZTEC[sign], latin: (num + 1) + ' ' + AZTEC[sign], tr: { kind: 'sign', num: num + 1, mi: sign } }; } },
        { id: 'maya', status: 'historical', lat: 17.2, lng: -89.6,
          name: 'Maya Long Count', region: 'Maya area (Tikal)', type: 'Day count + 260-day Tzolk’in + 365-day Haab’',
          epoch: '13.0.0.0.0 4 Ajaw 8 Kumk’u = 11 August 3114 BC (GMT correlation)',
          used: 'Classic Maya inscriptions, about AD 250–909; the 260-day count is still kept in the Guatemalan highlands',
          note: 'Shown in Maya bar-and-dot numerals (a dot is 1, a bar is 5, a shell is 0); the dotted 13.0.13.17.16 is the modern way of writing the same count. On monuments each number stood beside a glyph naming its period (b’ak’tun, k’atun, tun, winal, k’in), which Unicode does not encode. A new b’ak’tun began on 21 December 2012 — the “end of the world” that wasn’t.',
          from: { y: 1, m: 1, d: 1 }, endYear: 909,
          fmt: g => { const m = maya(gregToJdn(g.y, g.m, g.d)); if (!m) return null;
              return { native: m.glyphs, latin: m.lc + ' · ' + m.tz + ' · ' + m.haab, tr: { kind: 'fixed', text: m.lc + ' · ' + m.tz + ' · ' + m.haab } }; } },
    ];

    /* ---------- English strings (the source every translation follows) ---------- */
    const EN = {
        ui: {
            title: 'Time Map', tagline: 'One day, in the world’s calendars — and in the ones that stopped counting.',
            today: 'Today', prevDay: 'Previous day', nextDay: 'Next day', details: 'Details',
            fCurrent: 'In use', fHist: 'Historical', fGreg: 'Gregorian',
            hCurrent: 'In use today', hHist: 'If they had kept counting', hGreg: 'Gregorian calendar',
            subHist: 'These calendars were abandoned. The date shows what they would read today.',
            subGreg: 'The world standard, shown at its birthplace and a few countries.',
            notYet: 'Not yet in use on this date',
            type: 'Type', epoch: 'Year 1', used: 'In use', ended: 'Ended {n} — continued count',
            simpleDisplay: 'Simple display', settings: 'Settings', fontSize: 'Font Size',
            navOrder: 'Word Order', navWord: 'Word Map', navHan: 'HanMap', navName: 'Name Map', navTime: 'Time Map', navTree: 'Tree',
            hOfficial: 'Official calendars', hPopular: 'Popular calendars (not official)', hReligious: 'Religious and community calendars',
            status: 'Status',
        },
        // Order of a full date. {y} is the calendar's year text, {month} the month name, {d} the day.
        dateFmt: '{d} {month} {y}',
        yearDefault: '{n}',
        // Chinese-type months: {m} = number, {han} = Chinese numeral (正 for 1).
        lunarMonth: 'month {m}', leapMonth: 'leap month {m}',
        // Optional order for Chinese-type dates; falls back to dateFmt.
        lunarFmt: 'day {d} of {month}, {y}',
        // A day that has its own name instead of a month and day (French sansculottides).
        dayName: '{name}, {y}',
        // A day of the Aztec 260-day count: number + day sign.
        signFmt: '{num} {name}',
        // Balinese Pawukon: {wuku} = week name, {n} = its place in the 30.
        wukuFmt: 'wuku {wuku} (week {n} of 30)',
        // Akan: {date} = next Akwasidae, {n} = days until it; {name} = today's Adae.
        akanNext: 'next Akwasidae: {date} (in {n} days)', akanToday: 'today is {name}',
        // Old Icelandic: {w} = week number, {season} from iceSeasons, {d} {month} = day of month.
        iceFmt: 'week {w} of {season}, day {d} of {month}', iceExtra: 'week {w} of {season}, {month}',
        iceSeasons: ['summer', 'winter'],
        // Myanmar: {phase} from mmPhases (waxing, full moon, waning, new moon), {d} = day of the fortnight.
        mmFmt: '{phase} day {d} of {month}, {y}', mmMoonFmt: '{phase} of {month}, {y}',
        mmPhases: ['waxing', 'full moon', 'waning', 'new moon'],
        // Khmer: {d} 1–15 of the waxing or waning half, {n} = Buddhist Era year.
        khFmt: '{phase} day {d} of {month}, BE {n}', khPhases: ['waxing', 'waning'],
        months: {
            gregorian: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            hebrew: ['Tishri','Heshvan','Kislev','Tevet','Shevat','Adar I','Adar','Adar II','Nisan','Iyar','Sivan','Tammuz','Av','Elul'],
            islamic: ['Muharram','Safar','Rabiʻ I','Rabiʻ II','Jumada I','Jumada II','Rajab','Shaʻban','Ramadan','Shawwal','Dhu al-Qiʻdah','Dhu al-Hijjah'],
            persian: ['Farvardin','Ordibehesht','Khordad','Tir','Mordad','Shahrivar','Mehr','Aban','Azar','Dey','Bahman','Esfand'],
            indian: ['Chaitra','Vaishakha','Jyeshtha','Ashadha','Shravana','Bhadra','Ashvin','Kartika','Agrahayana','Pausha','Magha','Phalguna'],
            bengali: ['Boishakh','Joishtho','Asharh','Srabon','Bhadro','Ashwin','Kartik','Ogrohayon','Poush','Magh','Falgun','Choitro'],
            ethiopic: ['Meskerem','Tikimt','Hidar','Tahsas','Tir','Yekatit','Megabit','Miyazya','Ginbot','Sene','Hamle','Nehase','Pagume'],
            coptic: ['Thout','Paopi','Hathor','Koiak','Tobi','Meshir','Paremhat','Parmouti','Pashons','Paoni','Epip','Mesori','Pi Kogi Enavot'],
            amazigh: ['Yennayer','Furar','Meɣres','Yebrir','Mayyu','Yunyu','Yulyu','Ɣuct','Ctembeṛ','Tubeṛ','Wambeṛ','Dujembeṛ'],
            french: ['Vendémiaire','Brumaire','Frimaire','Nivôse','Pluviôse','Ventôse','Germinal','Floréal','Prairial','Messidor','Thermidor','Fructidor'],
            frenchSans: ['Virtue Day','Genius Day','Labour Day','Opinion Day','Rewards Day','Revolution Day'],
            egyptian: ['Thoth','Phaophi','Athyr','Choiak','Tybi','Mechir','Phamenoth','Pharmuthi','Pachon','Payni','Epiphi','Mesore','epagomenal days'],
            aztec: ['Crocodile','Wind','House','Lizard','Serpent','Death','Deer','Rabbit','Water','Dog','Monkey','Grass','Reed','Jaguar','Eagle','Vulture','Movement','Flint','Rain','Flower'],
            javanese: ['Sura','Sapar','Mulud','Bakda Mulud','Jumadilawal','Jumadilakir','Rejeb','Ruwah','Pasa','Sawal','Sela','Besar'],
            nepali: ['Baisakh','Jestha','Asar','Shrawan','Bhadau','Asoj','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra'],
            kurdish: ['Xakelêwe','Gulan','Cozerdan','Pûşper','Gelawêj','Xermanan','Rezber','Gelarêzan','Sermawez','Befranbar','Rêbendan','Reşeme'],
            bahai: ['Bahá','Jalál','Jamál','ʻAẓamat','Núr','Raḥmat','Kalimát','Kamál','Asmáʼ','ʻIzzat','Mashíyyat','ʻIlm','Qudrat','Qawl','Masáʼil','Sharaf','Sulṭán','Mulk','Ayyám-i-Há','ʻAláʼ'],
            parsi: ['Fravardin','Ardibehesht','Khordad','Tir','Amardad','Shehrevar','Meher','Avan','Adar','Dae','Bahman','Aspandarmad','Gatha days'],
            iceland: ['Harpa','Skerpla','Sólmánuður','Heyannir','Tvímánuður','Haustmánuður','Gormánuður','Ýlir','Mörsugur','Þorri','Góa','Einmánuður','the extra nights (aukanætur)'],
            myanmar: ['First Waso','Tagu','Kason','Nayon','Waso','Wagaung','Tawthalin','Thadingyut','Tazaungmon','Nadaw','Pyatho','Tabodwe','Tabaung','Late Tagu','Late Kason','Second Waso'],
            khmer: ['Mikasar','Boss','Meak','Phalkun','Chet','Pisakh','Jesth','Asadh','Srap','Phatrobot','Assoch','Kadeuk','First Asadh','Second Asadh'],
            zodiac: ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'],
        },
        // Japanese era names as the UI language writes them.
        eras: { Meiji: 'Meiji', 'Taishō': 'Taishō', 'Shōwa': 'Shōwa', Heisei: 'Heisei', Reiwa: 'Reiwa' },
        // Intl locale for the plain Gregorian date ('full').
        intlLocale: 'en-GB',
        // Use 元 for year 1 where a calendar is marked gannen.
        gannen: false,
    };
    const TEXT_FIELDS = ['name', 'region', 'type', 'epoch', 'used', 'note', 'year'];

    /* ---------- Localization ---------- */
    const pick = (L, path) => path.reduce((o, k) => (o == null ? o : o[k]), L);
    // L = a timemap_i18n language object (may be partial); falls back to EN per key.
    function txt(L, path) { const v = L && pick(L, path); return v != null && v !== '' ? v : pick(EN, path); }
    function calText(cal, field, L) {
        const v = L && L.cal && L.cal[cal.id] && L.cal[cal.id][field];
        return v != null && v !== '' ? v : cal[field];
    }
    const fill = (tpl, vars) => String(tpl).replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
    function localize(cal, r, L, D) {
        const tr = r && r.tr; if (!tr) return '';
        if (tr.kind === 'fixed') return tr.text;
        if (tr.kind === 'full') return fmt(txt(L, ['intlLocale']), DMY).format(D);
        if (tr.kind === 'sign') return fill(txt(L, ['signFmt']), { num: tr.num, name: txt(L, ['months', 'aztec'])[tr.mi] });
        if (tr.kind === 'myanmar') {
            const v = { y: fill(calText(cal, 'year', L) || txt(L, ['yearDefault']), { n: tr.n }), month: txt(L, ['months', 'myanmar'])[tr.mi],
                        phase: txt(L, ['mmPhases'])[tr.mp], d: tr.fd };
            return fill(txt(L, [tr.mp === 0 || tr.mp === 2 ? 'mmFmt' : 'mmMoonFmt']), v);
        }
        if (tr.kind === 'khmer') return fill(txt(L, ['khFmt']), { d: tr.d, phase: txt(L, ['khPhases'])[tr.waning ? 1 : 0], month: txt(L, ['months', 'khmer'])[tr.mi], n: tr.n });
        if (tr.kind === 'wuku') return fill(txt(L, ['wukuFmt']), { n: tr.n, wuku: tr.wuku });
        if (tr.kind === 'akan') {
            if (tr.today) return fill(txt(L, ['akanToday']), { name: tr.today });
            return fill(txt(L, ['akanNext']), { n: tr.n, date: fmt(txt(L, ['intlLocale']), { month: 'long', day: 'numeric' }).format(toDate(tr.next)) });
        }
        if (tr.kind === 'iceland') {
            const v = { w: tr.w, season: txt(L, ['iceSeasons'])[tr.season], d: tr.d, month: txt(L, ['months', 'iceland'])[tr.m] };
            return fill(txt(L, [tr.m === 12 ? 'iceExtra' : 'iceFmt']), v);
        }
        const n = (tr.n === 1 && cal.gannen && txt(L, ['gannen'])) ? '元' : tr.n;
        const zodiac = txt(L, ['months', 'zodiac']);
        const vars = { n, gz: tr.gz, gzKo: tr.gzKo, gzVi: tr.gzVi, gzPy: tr.gzPy, animal: tr.animal != null ? zodiac[tr.animal] : '',
                       era: tr.eraKey ? (txt(L, ['eras', tr.eraKey]) || tr.era) : '' };
        const y = fill(calText(cal, 'year', L) || txt(L, ['yearDefault']), vars);
        if (tr.kind === 'named') return fill(txt(L, ['dayName']), { name: txt(L, ['months', tr.list])[tr.mi], y });
        let month;
        if (tr.kind === 'list') month = txt(L, ['months', tr.list])[tr.mi];
        else if (tr.kind === 'greg') month = txt(L, ['months', 'gregorian'])[tr.gm - 1];
        else if (tr.kind === 'lunar') month = fill(txt(L, [tr.leap ? 'leapMonth' : 'lunarMonth']), { m: tr.m, han: lunarMonthHan(tr.m) });
        // lunarFmt is optional per language: without one, that language's own dateFmt (not English's lunarFmt).
        const order = tr.kind === 'lunar' ? (L ? (L.lunarFmt || L.dateFmt || EN.lunarFmt) : EN.lunarFmt) : txt(L, ['dateFmt']);
        // Some languages write the first of the month as an ordinal (fr 1er, it 1º).
        const d = tr.d === 1 && L && L.dayOne ? L.dayOne : tr.d;
        return fill(order, { y, month, d });
    }

    function gregParts(dateStr) {
        const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr || ''); if (!m) return null;
        return { y: +m[1], m: +m[2], d: +m[3] };
    }
    const cmp = (a, b) => (a.y - b.y) || (a.m - b.m) || (a.d - b.d);
    function render(cal, g) {
        if (cal.from && cmp(g, cal.from) < 0) return null;
        try { return cal.fmt(g, toDate(g)); } catch (e) { return null; }
    }

    const api = { CALENDARS, EN, TEXT_FIELDS, render, localize, jdnToGreg, calText, txt, fill, gregParts, toDate, gregToJdn, jdnToJulian,
                  roman, han, lunarDay, greekNum, hebrewNumeral, romanDate, maya, bengali, frenchRepublican, egyptian, javanese, pawukon, akanDay, nepali, bahai, parsi, bohra, iceland };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.TIMEMAP = api;
})(this);
