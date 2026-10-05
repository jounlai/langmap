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
    // Chinese / Korean lunisolar day.
    function lunar(ca, D) {
        const n = parts('en-u-ca-' + ca, { year: 'numeric', month: 'numeric', day: 'numeric' }, D);
        return { relatedYear: +n.relatedYear, month: parseInt(n.month, 10), leap: /bis/.test(n.month), day: +n.day };
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
        { id: 'japanese', status: 'current', lat: 37.2, lng: 138.6,
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
        { id: 'roc', status: 'current', lat: 23.7, lng: 121.0,
          name: 'Minguo calendar', region: 'Taiwan', type: 'Gregorian months, Republic-era years',
          epoch: 'Founding of the Republic of China, 1912', used: 'Since 1912; official in Taiwan',
          note: 'Year = Western year − 1911. It runs in step with North Korea’s Juche year.',
          year: 'Minguo {n}', gannen: true,
          from: { y: 1912, m: 1, d: 1 },
          fmt: g => { const n = g.y - 1911;
              return { native: '民國' + (n === 1 ? '元' : n) + '年' + g.m + '月' + g.d + '日', latin: 'Minguo ' + n + ', ' + g.m + '/' + g.d, tr: trGreg(n, g.m, g.d) }; } },
        { id: 'juche', status: 'current', lat: 40.3, lng: 127.0,
          name: 'Juche calendar', region: 'North Korea', type: 'Gregorian months, Juche years',
          epoch: 'Birth of Kim Il Sung, 1912', used: 'Since 1997',
          note: 'Written with the Western year in brackets: 주체115(2026)년.',
          year: 'Juche {n}',
          from: { y: 1912, m: 1, d: 1 },
          fmt: g => { const n = g.y - 1911;
              return { native: '주체' + n + '(' + g.y + ')년 ' + g.m + '월 ' + g.d + '일', latin: 'Juche ' + n + ', ' + g.m + '/' + g.d, tr: trGreg(n, g.m, g.d) }; } },
        { id: 'buddhist', status: 'current', lat: 15.6, lng: 100.9,
          name: 'Thai solar calendar', region: 'Thailand', type: 'Solar, Buddhist Era years',
          epoch: 'Buddhist Era: the Buddha’s parinirvana, 543 BC by Thai reckoning',
          used: 'Official since 1912 (BE year), with 1 January as New Year since 1941',
          note: 'Year = Western year + 543. Sri Lanka, Myanmar and Cambodia count the Buddhist Era one year apart from Thailand.',
          year: '{n} BE',
          from: { y: 1941, m: 1, d: 1 },
          fmt: (g, D) => ({ native: thaiDigits(g.d) + ' ' + thaiMonth(D) + ' พ.ศ. ' + thaiDigits(g.y + 543), latin: g.d + '/' + g.m + '/' + (g.y + 543) + ' BE', tr: trGreg(g.y + 543, g.m, g.d) }) },
        { id: 'chinese', status: 'current', lat: 33.5, lng: 104.0,
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
        { id: 'dangi', status: 'current', lat: 35.9, lng: 128.0,
          name: 'Korean lunisolar calendar', region: 'South Korea', type: 'Lunisolar',
          epoch: 'No running year count; 60-year cycle', used: 'Fixes Seollal and Chuseok',
          note: 'Same rules as the Chinese calendar but computed for Korean time, so a new moon near midnight can start a month one day apart.',
          year: '{gzPy} year ({animal})',
          from: { y: 1, m: 1, d: 1 },
          fmt: (g, D) => { const c = lunar('dangi', D), cy = cycle(c.relatedYear);
              return { native: '음력 ' + cy.gzKo + '년 ' + (c.leap ? '윤' : '') + c.month + '월 ' + c.day + '일',
                       latin: 'lunar ' + (c.leap ? 'leap ' : '') + 'month ' + c.month + ', day ' + c.day,
                       tr: Object.assign({ kind: 'lunar', m: c.month, leap: c.leap, d: c.day }, cy) }; } },
        { id: 'hebrew', status: 'current', lat: 31.2, lng: 34.9,
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
        { id: 'islamic', status: 'current', lat: 23.6, lng: 45.0,
          name: 'Islamic (Hijri) calendar', region: 'Saudi Arabia', type: 'Lunar (no leap month)',
          epoch: 'The Hijra, Muhammad’s move to Medina, AD 622',
          used: 'Religious use worldwide; civil in Saudi Arabia (Umm al-Qura tables)',
          note: 'A year is about 354 days, so Ramadan moves about 11 days earlier each Western year and goes round the seasons in 33 years.',
          year: '{n} AH',
          from: { y: 622, m: 7, d: 19 },
          fmt: (g, D) => { const n = calNum('islamic-umalqura', D);
              return { native: fmt('ar-SA-u-ca-islamic-umalqura', { dateStyle: 'long' }).format(D), latin: n.d + '/' + n.m + '/' + n.y + ' AH',
                       tr: trList('islamic', n.y, n.m - 1, n.d) }; } },
        { id: 'persian', status: 'current', lat: 32.0, lng: 54.5,
          name: 'Solar Hijri calendar', region: 'Iran · Afghanistan', type: 'Solar (astronomical)',
          epoch: 'The Hijra, AD 622, counted in solar years',
          used: 'Official in Iran since 1925 and in Afghanistan',
          note: 'The year begins at the exact moment of the March equinox (Nowruz), which makes it one of the most accurate calendars in use.',
          year: '{n} SH',
          from: { y: 622, m: 3, d: 22 },
          fmt: (g, D) => { const n = calNum('persian', D), p = parts('fa-IR-u-ca-persian', DMY, D);
              return { native: p.day + ' ' + p.month + ' ' + p.year, latin: n.d + '/' + n.m + '/' + n.y + ' SH', tr: trList('persian', n.y, n.m - 1, n.d) }; } },
        { id: 'indian', status: 'current', lat: 22.5, lng: 78.5,
          name: 'Indian national calendar', region: 'India', type: 'Solar',
          epoch: 'Śaka era, AD 78', used: 'Official since 1957, beside the Gregorian calendar',
          note: 'A reformed, fixed calendar. Festivals still follow the many regional Hindu lunisolar calendars.',
          year: 'Śaka {n}',
          from: { y: 1957, m: 3, d: 22 },
          fmt: (g, D) => { const n = calNum('indian', D);
              return { native: SAKA_HI[n.m - 1] + ' ' + devaDigits(n.d) + ', ' + devaDigits(n.y) + ' शक', latin: n.d + '/' + n.m + '/' + n.y + ' Śaka', tr: trList('indian', n.y, n.m - 1, n.d) }; } },
        { id: 'bengali', status: 'current', lat: 23.9, lng: 90.3,
          name: 'Bengali calendar (Bangabda)', region: 'Bangladesh', type: 'Solar (fixed rules)',
          epoch: 'Bangabda, AD 593', used: 'Official in Bangladesh; the 2019 revision is shown',
          note: 'New Year, Pohela Boishakh, is fixed on 14 April. West Bengal in India keeps an older astronomical version, so dates there can differ by a day.',
          year: '{n} BS',
          from: { y: 1987, m: 4, d: 14 },
          fmt: g => { const b = bengali(g);
              return { native: localeDigits(b.d, 'bn-BD') + ' ' + BN[b.m] + ' ' + localeDigits(b.y, 'bn-BD') + ' বঙ্গাব্দ',
                       latin: b.d + '/' + (b.m + 1) + '/' + b.y + ' BS', tr: trList('bengali', b.y, b.m, b.d) }; } },
        { id: 'ethiopic', status: 'current', lat: 9.0, lng: 39.5,
          name: 'Ethiopian calendar', region: 'Ethiopia · Eritrea', type: 'Solar: 12 months of 30 days + a 13th of 5–6',
          epoch: 'Incarnation era, AD 8 by the Gregorian count', used: 'Official in Ethiopia',
          note: 'Seven or eight years behind the Western count; New Year (Enkutatash) falls on 11 September.',
          year: '{n} E.C.',
          from: { y: 8, m: 8, d: 27 },
          fmt: (g, D) => { const n = calNum('ethiopic', D), a = parts('am-u-ca-ethiopic', DMY, D);
              return { native: a.month + ' ' + n.d + ' ቀን ' + n.y + ' ዓ.ም.', latin: n.d + '/' + n.m + '/' + n.y + ' E.C.', tr: trList('ethiopic', n.y, n.m - 1, n.d) }; } },
        { id: 'coptic', status: 'current', lat: 26.6, lng: 30.6,
          name: 'Coptic calendar', region: 'Egypt', type: 'Solar: 12 × 30 days + 5–6 epagomenal days',
          epoch: 'Era of the Martyrs, AD 284 (accession of Diocletian)',
          used: 'Coptic Church; Egyptian farmers still sow by its months',
          note: 'The direct heir of the ancient Egyptian civil calendar, with a leap day added.',
          year: '{n} A.M.',
          from: { y: 284, m: 8, d: 29 },
          fmt: (g, D) => { const n = calNum('coptic', D), a = parts('ar-EG-u-ca-coptic', DMY, D);
              return { native: a.day + ' ' + a.month + ' ' + a.year + ' للشهداء', latin: n.d + '/' + n.m + '/' + n.y + ' A.M.', tr: trList('coptic', n.y, n.m - 1, n.d) }; } },
        { id: 'julian', status: 'current', lat: 58.0, lng: 45.0,
          name: 'Julian calendar (Old Style)', region: 'Russian Orthodox Church', type: 'Solar',
          epoch: 'Anno Domini', used: 'Civil in Russia until 1918; church calendar today',
          note: 'Now 13 days behind the Gregorian calendar, which is why Russian Orthodox Christmas falls on 7 January.',
          year: '{n} (Old Style)',
          from: { y: 1, m: 1, d: 1 },
          fmt: g => { const J = julianOf(g);
              return { native: J.d + ' ' + RU_GEN[J.m - 1] + ' ' + J.y + ' г. (ст. ст.)', latin: J.d + '/' + J.m + '/' + J.y + ' O.S.', tr: trGreg(J.y, J.m, J.d) }; } },
        { id: 'amazigh', status: 'current', lat: 31.5, lng: -2.0,
          name: 'Amazigh (Berber) calendar', region: 'Morocco · Algeria', type: 'Solar (Julian months)',
          epoch: 'Accession of Pharaoh Shoshenq I, 950 BC',
          used: 'Agricultural calendar; Yennayer is a public holiday in Algeria (2018) and Morocco (2024)',
          note: 'Keeps the Julian month lengths, so Yennayer 1 falls on 14 January today. The year count was proposed in 1980. Months are shown in Tifinagh, the script of Standard Moroccan Tamazight; Kabyle in Algeria writes them in Latin letters (Yennayer, Furar…).',
          from: { y: 1980, m: 1, d: 14 },
          fmt: g => { const J = julianOf(g);
              return { native: J.d + ' ' + AMZ_TFNG[J.m - 1] + ' ' + (J.y + 950), latin: J.d + ' ' + AMZ[J.m - 1] + ' ' + (J.y + 950), tr: trList('amazigh', J.y + 950, J.m - 1, J.d) }; } },

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
          note: 'Shown with Chinese-calendar months; Vietnam’s own lunar calendar is computed for UTC+7 and occasionally differs by a day.',
          year: 'Bảo Đại {n}', gannen: true,
          from: { y: 1926, m: 2, d: 13 }, endYear: 1945,
          fmt: (g, D) => { const c = lunar('chinese', D), n = c.relatedYear - 1925;
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

    const api = { CALENDARS, EN, TEXT_FIELDS, render, localize, calText, txt, fill, gregParts, toDate, gregToJdn, jdnToJulian,
                  roman, han, lunarDay, greekNum, hebrewNumeral, romanDate, maya, bengali, frenchRepublican, egyptian };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.TIMEMAP = api;
})(this);
