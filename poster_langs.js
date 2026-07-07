/* poster_langs.js — curated one-language-per-country + word data for the poster.
 *
 * POSTER_LANGS : ISO 3166-1 alpha-3 → { code } (the country's official language;
 *   most-populous when several are official — provisional, several are judgment
 *   calls for the 5-run cross-validation pass, e.g. ZAF=zu, HKG=yue, NGA/UGA=en).
 * POSTER_WORDS : word → { <language code> → { native, roman? } }, keyed by the
 *   POSTER_LANGS code (countries sharing a language share the entry). Latin-script
 *   `native` omits `roman`; every non-Latin `native` carries a `roman`.
 *   `water` covers all 81 languages; `fire`/`sun`/`moon` cover the major ones
 *   (countries whose language lacks an entry are simply skipped for that word —
 *   fill the gaps via the validation pipeline).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) { root.POSTER_LANGS = api.POSTER_LANGS; root.POSTER_WORDS = api.POSTER_WORDS; }
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  const POSTER_LANGS = {
    // Europe
    GBR: { code: 'en' }, IRL: { code: 'ga' }, FRA: { code: 'fr' }, DEU: { code: 'de' },
    AUT: { code: 'de' }, CHE: { code: 'de' }, LIE: { code: 'de' }, BEL: { code: 'nl' },
    NLD: { code: 'nl' }, LUX: { code: 'lb' }, ESP: { code: 'es' }, PRT: { code: 'pt' },
    AND: { code: 'ca' }, ITA: { code: 'it' }, SMR: { code: 'it' }, MLT: { code: 'mt' },
    GRC: { code: 'el' }, CYP: { code: 'el' }, DNK: { code: 'da' }, NOR: { code: 'no' },
    SWE: { code: 'sv' }, FIN: { code: 'fi' }, ISL: { code: 'is' }, EST: { code: 'et' },
    LVA: { code: 'lv' }, LTU: { code: 'lt' }, POL: { code: 'pl' }, CZE: { code: 'cs' },
    SVK: { code: 'sk' }, HUN: { code: 'hu' }, ROU: { code: 'ro' }, MDA: { code: 'ro' },
    BGR: { code: 'bg' }, SVN: { code: 'sl' }, HRV: { code: 'hr' }, BIH: { code: 'bs' },
    SRB: { code: 'sr' }, MNE: { code: 'cnr' }, MKD: { code: 'mk' }, ALB: { code: 'sq' },
    RUS: { code: 'ru' }, UKR: { code: 'uk' }, BLR: { code: 'be' }, TUR: { code: 'tr' },
    // Americas
    USA: { code: 'en' }, CAN: { code: 'en' }, MEX: { code: 'es' }, GTM: { code: 'es' },
    BLZ: { code: 'en' }, SLV: { code: 'es' }, HND: { code: 'es' }, NIC: { code: 'es' },
    CRI: { code: 'es' }, PAN: { code: 'es' }, CUB: { code: 'es' }, DOM: { code: 'es' },
    HTI: { code: 'ht' }, JAM: { code: 'en' }, TTO: { code: 'en' }, BHS: { code: 'en' },
    COL: { code: 'es' }, VEN: { code: 'es' }, ECU: { code: 'es' }, PER: { code: 'es' },
    BOL: { code: 'es' }, BRA: { code: 'pt' }, PRY: { code: 'es' }, URY: { code: 'es' },
    ARG: { code: 'es' }, CHL: { code: 'es' }, GUY: { code: 'en' }, SUR: { code: 'nl' },
    GRL: { code: 'kl' },
    // Middle East & North Africa
    SAU: { code: 'ar' }, EGY: { code: 'ar' }, DZA: { code: 'ar' }, MAR: { code: 'ar' },
    TUN: { code: 'ar' }, LBY: { code: 'ar' }, SDN: { code: 'ar' }, IRQ: { code: 'ar' },
    SYR: { code: 'ar' }, JOR: { code: 'ar' }, LBN: { code: 'ar' }, YEM: { code: 'ar' },
    KWT: { code: 'ar' }, QAT: { code: 'ar' }, ARE: { code: 'ar' }, OMN: { code: 'ar' },
    BHR: { code: 'ar' }, PSE: { code: 'ar' }, MRT: { code: 'ar' }, ESH: { code: 'ar' },
    IRN: { code: 'fa' }, ISR: { code: 'he' },
    // Sub-Saharan Africa
    NGA: { code: 'en' }, GHA: { code: 'en' }, KEN: { code: 'sw' }, TZA: { code: 'sw' },
    UGA: { code: 'en' }, ETH: { code: 'am' }, ERI: { code: 'ti' }, SOM: { code: 'so' },
    DJI: { code: 'fr' }, SSD: { code: 'en' }, RWA: { code: 'rw' }, BDI: { code: 'rn' },
    ZAF: { code: 'zu' }, ZWE: { code: 'en' }, ZMB: { code: 'en' }, MWI: { code: 'ny' },
    MOZ: { code: 'pt' }, AGO: { code: 'pt' }, NAM: { code: 'en' }, BWA: { code: 'en' },
    LSO: { code: 'st' }, SWZ: { code: 'en' }, MDG: { code: 'mg' }, SEN: { code: 'fr' },
    CIV: { code: 'fr' }, CMR: { code: 'fr' }, COD: { code: 'fr' }, COG: { code: 'fr' },
    GAB: { code: 'fr' }, MLI: { code: 'fr' }, NER: { code: 'fr' }, TCD: { code: 'fr' },
    BFA: { code: 'fr' }, GIN: { code: 'fr' }, BEN: { code: 'fr' }, TGO: { code: 'fr' },
    CAF: { code: 'fr' }, GNB: { code: 'pt' }, GNQ: { code: 'es' }, LBR: { code: 'en' },
    SLE: { code: 'en' }, GMB: { code: 'en' },
    // Asia
    CHN: { code: 'zh' }, TWN: { code: 'zh' }, HKG: { code: 'yue' }, JPN: { code: 'ja' },
    KOR: { code: 'ko' }, PRK: { code: 'ko' }, MNG: { code: 'mn' }, VNM: { code: 'vi' },
    THA: { code: 'th' }, LAO: { code: 'lo' }, KHM: { code: 'km' }, MMR: { code: 'my' },
    MYS: { code: 'ms' }, IDN: { code: 'id' }, PHL: { code: 'tl' }, SGP: { code: 'en' },
    BRN: { code: 'ms' }, TLS: { code: 'pt' }, IND: { code: 'hi' }, PAK: { code: 'ur' },
    BGD: { code: 'bn' }, NPL: { code: 'ne' }, LKA: { code: 'si' }, BTN: { code: 'dz' },
    KAZ: { code: 'kk' }, UZB: { code: 'uz' }, TKM: { code: 'tk' }, KGZ: { code: 'ky' },
    TJK: { code: 'tg' }, AFG: { code: 'fa' }, AZE: { code: 'az' }, GEO: { code: 'ka' },
    ARM: { code: 'hy' },
    // Oceania
    AUS: { code: 'en' }, NZL: { code: 'en' }, PNG: { code: 'en' }, FJI: { code: 'en' },
    SLB: { code: 'en' }, VUT: { code: 'en' }, WSM: { code: 'sm' }, TON: { code: 'to' },
  };

  const POSTER_WORDS = {
    water: {
      am: { native: 'ውሃ', roman: 'wuha' }, ar: { native: 'ماء', roman: 'māʼ' }, az: { native: 'su' },
      be: { native: 'вада', roman: 'vada' }, bg: { native: 'вода', roman: 'voda' }, bn: { native: 'পানি', roman: 'pani' },
      bs: { native: 'voda' }, ca: { native: 'aigua' }, cnr: { native: 'voda' }, cs: { native: 'voda' },
      da: { native: 'vand' }, de: { native: 'Wasser' }, dz: { native: 'ཆུ', roman: 'chu' }, el: { native: 'νερό', roman: 'neró' },
      en: { native: 'water' }, es: { native: 'agua' }, et: { native: 'vesi' }, fa: { native: 'آب', roman: 'âb' },
      fi: { native: 'vesi' }, fr: { native: 'eau' }, ga: { native: 'uisce' }, he: { native: 'מים', roman: 'mayim' },
      hi: { native: 'पानी', roman: 'pānī' }, hr: { native: 'voda' }, ht: { native: 'dlo' }, hu: { native: 'víz' },
      hy: { native: 'ջուր', roman: 'jur' }, id: { native: 'air' }, is: { native: 'vatn' }, it: { native: 'acqua' },
      ja: { native: '水', roman: 'mizu' }, ka: { native: 'წყალი', roman: 'tsqali' }, kk: { native: 'су', roman: 'su' },
      kl: { native: 'imeq' }, km: { native: 'ទឹក', roman: 'tuk' }, ko: { native: '물', roman: 'mul' },
      ky: { native: 'суу', roman: 'suu' }, lb: { native: 'Waasser' }, lo: { native: 'ນ້ຳ', roman: 'nam' },
      lt: { native: 'vanduo' }, lv: { native: 'ūdens' }, mg: { native: 'rano' }, mk: { native: 'вода', roman: 'voda' },
      mn: { native: 'ус', roman: 'us' }, ms: { native: 'air' }, mt: { native: 'ilma' }, my: { native: 'ရေ', roman: 'ye' },
      ne: { native: 'पानी', roman: 'pānī' }, nl: { native: 'water' }, no: { native: 'vann' }, ny: { native: 'madzi' },
      pl: { native: 'woda' }, pt: { native: 'água' }, rn: { native: 'amazi' }, ro: { native: 'apă' },
      ru: { native: 'вода', roman: 'voda' }, rw: { native: 'amazi' }, si: { native: 'වතුර', roman: 'vatura' },
      sk: { native: 'voda' }, sl: { native: 'voda' }, sm: { native: 'vai' }, so: { native: 'biyo' },
      sq: { native: 'ujë' }, sr: { native: 'вода', roman: 'voda' }, st: { native: 'metsi' }, sv: { native: 'vatten' },
      sw: { native: 'maji' }, tg: { native: 'об', roman: 'ob' }, th: { native: 'น้ำ', roman: 'nám' }, ti: { native: 'ማይ', roman: 'may' },
      tk: { native: 'suw' }, tl: { native: 'tubig' }, to: { native: 'vai' }, tr: { native: 'su' },
      uk: { native: 'вода', roman: 'voda' }, ur: { native: 'پانی', roman: 'pānī' }, uz: { native: 'suv' },
      vi: { native: 'nước' }, yue: { native: '水', roman: 'séui' }, zh: { native: '水', roman: 'shuǐ' }, zu: { native: 'amanzi' },
    },
    fire: {
      en: { native: 'fire' }, es: { native: 'fuego' }, pt: { native: 'fogo' }, fr: { native: 'feu' },
      de: { native: 'Feuer' }, it: { native: 'fuoco' }, nl: { native: 'vuur' }, ca: { native: 'foc' },
      ro: { native: 'foc' }, ru: { native: 'огонь', roman: 'ogónʹ' }, uk: { native: 'вогонь', roman: 'vohónʹ' },
      be: { native: 'агонь', roman: 'ahónʹ' }, bg: { native: 'огън', roman: 'ogán' }, sr: { native: 'ватра', roman: 'vatra' },
      mk: { native: 'оган', roman: 'ogan' }, hr: { native: 'vatra' }, bs: { native: 'vatra' }, cnr: { native: 'vatra' },
      sl: { native: 'ogenj' }, sk: { native: 'oheň' }, cs: { native: 'oheň' }, pl: { native: 'ogień' },
      hu: { native: 'tűz' }, el: { native: 'φωτιά', roman: 'fotiá' }, tr: { native: 'ateş' }, sq: { native: 'zjarr' },
      fi: { native: 'tuli' }, et: { native: 'tuli' }, sv: { native: 'eld' }, da: { native: 'ild' }, no: { native: 'ild' },
      is: { native: 'eldur' }, lv: { native: 'uguns' }, lt: { native: 'ugnis' }, ga: { native: 'tine' }, mt: { native: 'nar' },
      ar: { native: 'نار', roman: 'nār' }, fa: { native: 'آتش', roman: 'âtaš' }, he: { native: 'אש', roman: 'esh' },
      hi: { native: 'आग', roman: 'āg' }, ur: { native: 'آگ', roman: 'āg' }, bn: { native: 'আগুন', roman: 'agun' },
      ne: { native: 'आगो', roman: 'āgo' }, zh: { native: '火', roman: 'huǒ' }, yue: { native: '火', roman: 'fó' },
      ja: { native: '火', roman: 'hi' }, ko: { native: '불', roman: 'bul' }, th: { native: 'ไฟ', roman: 'fai' },
      vi: { native: 'lửa' }, id: { native: 'api' }, ms: { native: 'api' }, tl: { native: 'apoy' },
      sw: { native: 'moto' }, so: { native: 'dab' }, am: { native: 'እሳት', roman: 'isat' }, zu: { native: 'umlilo' },
      mn: { native: 'гал', roman: 'gal' }, kk: { native: 'от', roman: 'ot' }, ka: { native: 'ცეცხლი', roman: 'tsetskhli' },
      hy: { native: 'կրակ', roman: 'krak' }, km: { native: 'ភ្លើង', roman: 'phleung' }, my: { native: 'မီး', roman: 'mi' },
      lo: { native: 'ໄຟ', roman: 'fai' }, si: { native: 'ගින්න', roman: 'ginna' },
    },
    sun: {
      en: { native: 'sun' }, es: { native: 'sol' }, pt: { native: 'sol' }, fr: { native: 'soleil' },
      de: { native: 'Sonne' }, it: { native: 'sole' }, nl: { native: 'zon' }, ca: { native: 'sol' },
      ro: { native: 'soare' }, ru: { native: 'солнце', roman: 'sólntse' }, uk: { native: 'сонце', roman: 'sóntse' },
      be: { native: 'сонца', roman: 'sóntsa' }, bg: { native: 'слънце', roman: 'slǎntse' }, sr: { native: 'сунце', roman: 'sunce' },
      mk: { native: 'сонце', roman: 'sonce' }, hr: { native: 'sunce' }, bs: { native: 'sunce' }, cnr: { native: 'sunce' },
      sl: { native: 'sonce' }, sk: { native: 'slnko' }, cs: { native: 'slunce' }, pl: { native: 'słońce' },
      hu: { native: 'nap' }, el: { native: 'ήλιος', roman: 'ílios' }, tr: { native: 'güneş' }, sq: { native: 'diell' },
      fi: { native: 'aurinko' }, et: { native: 'päike' }, sv: { native: 'sol' }, da: { native: 'sol' }, no: { native: 'sol' },
      is: { native: 'sól' }, lv: { native: 'saule' }, lt: { native: 'saulė' }, ga: { native: 'grian' }, mt: { native: 'xemx' },
      ar: { native: 'شمس', roman: 'shams' }, fa: { native: 'خورشید', roman: 'xoršid' }, he: { native: 'שמש', roman: 'shemesh' },
      hi: { native: 'सूरज', roman: 'sūraj' }, ur: { native: 'سورج', roman: 'sūraj' }, bn: { native: 'সূর্য', roman: 'surjo' },
      ne: { native: 'सूर्य', roman: 'sūrya' }, zh: { native: '太阳', roman: 'tàiyáng' }, yue: { native: '太陽', roman: 'taaiyèung' },
      ja: { native: '太陽', roman: 'taiyō' }, ko: { native: '해', roman: 'hae' }, th: { native: 'ดวงอาทิตย์', roman: 'duang-athit' },
      vi: { native: 'mặt trời' }, id: { native: 'matahari' }, ms: { native: 'matahari' }, tl: { native: 'araw' },
      sw: { native: 'jua' }, so: { native: 'qorrax' }, am: { native: 'ፀሐይ', roman: 'tsehay' }, zu: { native: 'ilanga' },
      mn: { native: 'нар', roman: 'nar' }, kk: { native: 'күн', roman: 'kün' }, ka: { native: 'მზე', roman: 'mze' },
      hy: { native: 'արև', roman: 'arev' }, km: { native: 'ព្រះអាទិត្យ', roman: 'preah-atit' }, my: { native: 'နေ', roman: 'ne' },
      lo: { native: 'ຕາເວັນ', roman: 'tawen' }, si: { native: 'ඉර', roman: 'ira' },
    },
    moon: {
      en: { native: 'moon' }, es: { native: 'luna' }, pt: { native: 'lua' }, fr: { native: 'lune' },
      de: { native: 'Mond' }, it: { native: 'luna' }, nl: { native: 'maan' }, ca: { native: 'lluna' },
      ro: { native: 'lună' }, ru: { native: 'луна', roman: 'luná' }, uk: { native: 'місяць', roman: 'mísyatsʹ' },
      be: { native: 'месяц', roman: 'mésyats' }, bg: { native: 'луна', roman: 'luná' }, sr: { native: 'месец', roman: 'mesec' },
      mk: { native: 'месечина', roman: 'mesečina' }, hr: { native: 'mjesec' }, bs: { native: 'mjesec' }, cnr: { native: 'mjesec' },
      sl: { native: 'luna' }, sk: { native: 'mesiac' }, cs: { native: 'měsíc' }, pl: { native: 'księżyc' },
      hu: { native: 'hold' }, el: { native: 'φεγγάρι', roman: 'fengári' }, tr: { native: 'ay' }, sq: { native: 'hënë' },
      fi: { native: 'kuu' }, et: { native: 'kuu' }, sv: { native: 'måne' }, da: { native: 'måne' }, no: { native: 'måne' },
      is: { native: 'tungl' }, lv: { native: 'mēness' }, lt: { native: 'mėnulis' }, ga: { native: 'gealach' }, mt: { native: 'qamar' },
      ar: { native: 'قمر', roman: 'qamar' }, fa: { native: 'ماه', roman: 'mâh' }, he: { native: 'ירח', roman: 'yareaḥ' },
      hi: { native: 'चाँद', roman: 'cā̃d' }, ur: { native: 'چاند', roman: 'cānd' }, bn: { native: 'চাঁদ', roman: 'chãd' },
      ne: { native: 'चन्द्र', roman: 'candra' }, zh: { native: '月亮', roman: 'yuèliang' }, yue: { native: '月亮', roman: 'yuhtleuhng' },
      ja: { native: '月', roman: 'tsuki' }, ko: { native: '달', roman: 'dal' }, th: { native: 'ดวงจันทร์', roman: 'duang-chan' },
      vi: { native: 'mặt trăng' }, id: { native: 'bulan' }, ms: { native: 'bulan' }, tl: { native: 'buwan' },
      sw: { native: 'mwezi' }, so: { native: 'dayax' }, am: { native: 'ጨረቃ', roman: 'chereqa' }, zu: { native: 'inyanga' },
      mn: { native: 'сар', roman: 'sar' }, kk: { native: 'ай', roman: 'ay' }, ka: { native: 'მთვარე', roman: 'mtvare' },
      hy: { native: 'լուսին', roman: 'lusin' }, km: { native: 'ព្រះចន្ទ', roman: 'preah-chan' }, my: { native: 'လ', roman: 'la' },
      lo: { native: 'ດວງຈັນ', roman: 'duang-chan' }, si: { native: 'හඳ', roman: 'handa' },
    },
  };

  return { POSTER_LANGS: POSTER_LANGS, POSTER_WORDS: POSTER_WORDS };
});
