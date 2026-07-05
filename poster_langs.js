/* poster_langs.js — curated one-language-per-country + word data for the poster.
 *
 * Selection rule: each country's OFFICIAL language; when several are official,
 * the most-populous one (provisional — several picks are judgment calls that
 * should go through the 5-run cross-validation pass, e.g. ZAF=Zulu, HKG=Cantonese,
 * BWA/NGA/UGA=English-as-official over larger indigenous languages).
 * Latin-script `native` omits `roman`; every non-Latin `native` carries a `roman`.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) { root.POSTER_LANGS = api.POSTER_LANGS; root.POSTER_WORDS = api.POSTER_WORDS; }
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  // ISO 3166-1 alpha-3 → chosen language code (label only; not a LANG_DATA key).
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
    // Middle East & North Africa
    SAU: { code: 'ar' }, EGY: { code: 'ar' }, DZA: { code: 'ar' }, MAR: { code: 'ar' },
    TUN: { code: 'ar' }, LBY: { code: 'ar' }, SDN: { code: 'ar' }, IRQ: { code: 'ar' },
    SYR: { code: 'ar' }, JOR: { code: 'ar' }, LBN: { code: 'ar' }, YEM: { code: 'ar' },
    KWT: { code: 'ar' }, QAT: { code: 'ar' }, ARE: { code: 'ar' }, OMN: { code: 'ar' },
    BHR: { code: 'ar' }, PSE: { code: 'ar' }, MRT: { code: 'ar' }, IRN: { code: 'fa' },
    ISR: { code: 'he' },
    // Sub-Saharan Africa
    NGA: { code: 'en' }, GHA: { code: 'en' }, KEN: { code: 'sw' }, TZA: { code: 'sw' },
    UGA: { code: 'en' }, ETH: { code: 'am' }, SOM: { code: 'so' }, RWA: { code: 'rw' },
    BDI: { code: 'rn' }, ZAF: { code: 'zu' }, ZWE: { code: 'en' }, ZMB: { code: 'en' },
    MWI: { code: 'ny' }, MOZ: { code: 'pt' }, AGO: { code: 'pt' }, NAM: { code: 'en' },
    BWA: { code: 'en' }, LSO: { code: 'st' }, SWZ: { code: 'en' }, MDG: { code: 'mg' },
    SEN: { code: 'fr' }, CIV: { code: 'fr' }, CMR: { code: 'fr' }, COD: { code: 'fr' },
    COG: { code: 'fr' }, GAB: { code: 'fr' }, MLI: { code: 'fr' }, NER: { code: 'fr' },
    TCD: { code: 'fr' }, BFA: { code: 'fr' }, GIN: { code: 'fr' }, BEN: { code: 'fr' },
    TGO: { code: 'fr' }, CAF: { code: 'fr' }, GNB: { code: 'pt' }, LBR: { code: 'en' },
    SLE: { code: 'en' }, GMB: { code: 'en' },
    // Asia
    CHN: { code: 'zh' }, TWN: { code: 'zh' }, HKG: { code: 'yue' }, JPN: { code: 'ja' },
    KOR: { code: 'ko' }, PRK: { code: 'ko' }, MNG: { code: 'mn' }, VNM: { code: 'vi' }, THA: { code: 'th' },
    LAO: { code: 'lo' }, KHM: { code: 'km' }, MMR: { code: 'my' }, MYS: { code: 'ms' },
    IDN: { code: 'id' }, PHL: { code: 'tl' }, SGP: { code: 'en' }, BRN: { code: 'ms' },
    TLS: { code: 'pt' }, IND: { code: 'hi' }, PAK: { code: 'ur' }, BGD: { code: 'bn' },
    NPL: { code: 'ne' }, LKA: { code: 'si' }, BTN: { code: 'dz' }, KAZ: { code: 'kk' },
    UZB: { code: 'uz' }, TKM: { code: 'tk' }, KGZ: { code: 'ky' }, TJK: { code: 'tg' },
    AFG: { code: 'fa' }, AZE: { code: 'az' }, GEO: { code: 'ka' }, ARM: { code: 'hy' },
    // Oceania
    AUS: { code: 'en' }, NZL: { code: 'en' }, PNG: { code: 'en' }, FJI: { code: 'en' },
    SLB: { code: 'en' }, VUT: { code: 'en' }, WSM: { code: 'sm' }, TON: { code: 'to' },
  };

  // MVP word: "water". Latin-script forms omit `roman`; non-Latin carry a romanization.
  const POSTER_WORDS = {
    water: {
      // Europe
      GBR: { native: 'water' }, IRL: { native: 'uisce' }, FRA: { native: 'eau' },
      DEU: { native: 'Wasser' }, AUT: { native: 'Wasser' }, CHE: { native: 'Wasser' },
      LIE: { native: 'Wasser' }, BEL: { native: 'water' }, NLD: { native: 'water' },
      LUX: { native: 'Waasser' }, ESP: { native: 'agua' }, PRT: { native: 'água' },
      AND: { native: 'aigua' }, ITA: { native: 'acqua' }, SMR: { native: 'acqua' },
      MLT: { native: 'ilma' }, GRC: { native: 'νερό', roman: 'neró' },
      CYP: { native: 'νερό', roman: 'neró' }, DNK: { native: 'vand' }, NOR: { native: 'vann' },
      SWE: { native: 'vatten' }, FIN: { native: 'vesi' }, ISL: { native: 'vatn' },
      EST: { native: 'vesi' }, LVA: { native: 'ūdens' }, LTU: { native: 'vanduo' },
      POL: { native: 'woda' }, CZE: { native: 'voda' }, SVK: { native: 'voda' },
      HUN: { native: 'víz' }, ROU: { native: 'apă' }, MDA: { native: 'apă' },
      BGR: { native: 'вода', roman: 'voda' }, SVN: { native: 'voda' }, HRV: { native: 'voda' },
      BIH: { native: 'voda' }, SRB: { native: 'вода', roman: 'voda' }, MNE: { native: 'voda' },
      MKD: { native: 'вода', roman: 'voda' }, ALB: { native: 'ujë' },
      RUS: { native: 'вода', roman: 'voda' }, UKR: { native: 'вода', roman: 'voda' },
      BLR: { native: 'вада', roman: 'vada' }, TUR: { native: 'su' },
      // Americas
      USA: { native: 'water' }, CAN: { native: 'water' }, MEX: { native: 'agua' },
      GTM: { native: 'agua' }, BLZ: { native: 'water' }, SLV: { native: 'agua' },
      HND: { native: 'agua' }, NIC: { native: 'agua' }, CRI: { native: 'agua' },
      PAN: { native: 'agua' }, CUB: { native: 'agua' }, DOM: { native: 'agua' },
      HTI: { native: 'dlo' }, JAM: { native: 'water' }, TTO: { native: 'water' },
      BHS: { native: 'water' }, COL: { native: 'agua' }, VEN: { native: 'agua' },
      ECU: { native: 'agua' }, PER: { native: 'agua' }, BOL: { native: 'agua' },
      BRA: { native: 'água' }, PRY: { native: 'agua' }, URY: { native: 'agua' },
      ARG: { native: 'agua' }, CHL: { native: 'agua' }, GUY: { native: 'water' },
      SUR: { native: 'water' },
      // Middle East & North Africa
      SAU: { native: 'ماء', roman: 'māʼ' }, EGY: { native: 'ماء', roman: 'māʼ' },
      DZA: { native: 'ماء', roman: 'māʼ' }, MAR: { native: 'ماء', roman: 'māʼ' },
      TUN: { native: 'ماء', roman: 'māʼ' }, LBY: { native: 'ماء', roman: 'māʼ' },
      SDN: { native: 'ماء', roman: 'māʼ' }, IRQ: { native: 'ماء', roman: 'māʼ' },
      SYR: { native: 'ماء', roman: 'māʼ' }, JOR: { native: 'ماء', roman: 'māʼ' },
      LBN: { native: 'ماء', roman: 'māʼ' }, YEM: { native: 'ماء', roman: 'māʼ' },
      KWT: { native: 'ماء', roman: 'māʼ' }, QAT: { native: 'ماء', roman: 'māʼ' },
      ARE: { native: 'ماء', roman: 'māʼ' }, OMN: { native: 'ماء', roman: 'māʼ' },
      BHR: { native: 'ماء', roman: 'māʼ' }, PSE: { native: 'ماء', roman: 'māʼ' },
      MRT: { native: 'ماء', roman: 'māʼ' }, IRN: { native: 'آب', roman: 'âb' },
      ISR: { native: 'מים', roman: 'mayim' },
      // Sub-Saharan Africa
      NGA: { native: 'water' }, GHA: { native: 'water' }, KEN: { native: 'maji' },
      TZA: { native: 'maji' }, UGA: { native: 'water' }, ETH: { native: 'ውሃ', roman: 'wuha' },
      SOM: { native: 'biyo' }, RWA: { native: 'amazi' }, BDI: { native: 'amazi' },
      ZAF: { native: 'amanzi' }, ZWE: { native: 'water' }, ZMB: { native: 'water' },
      MWI: { native: 'madzi' }, MOZ: { native: 'água' }, AGO: { native: 'água' },
      NAM: { native: 'water' }, BWA: { native: 'water' }, LSO: { native: 'metsi' },
      SWZ: { native: 'water' }, MDG: { native: 'rano' }, SEN: { native: 'eau' },
      CIV: { native: 'eau' }, CMR: { native: 'eau' }, COD: { native: 'eau' },
      COG: { native: 'eau' }, GAB: { native: 'eau' }, MLI: { native: 'eau' },
      NER: { native: 'eau' }, TCD: { native: 'eau' }, BFA: { native: 'eau' },
      GIN: { native: 'eau' }, BEN: { native: 'eau' }, TGO: { native: 'eau' },
      CAF: { native: 'eau' }, GNB: { native: 'água' }, LBR: { native: 'water' },
      SLE: { native: 'water' }, GMB: { native: 'water' },
      // Asia
      CHN: { native: '水', roman: 'shuǐ' }, TWN: { native: '水', roman: 'shuǐ' },
      HKG: { native: '水', roman: 'séui' }, JPN: { native: '水', roman: 'mizu' },
      KOR: { native: '물', roman: 'mul' }, PRK: { native: '물', roman: 'mul' },
      MNG: { native: 'ус', roman: 'us' },
      VNM: { native: 'nước' }, THA: { native: 'น้ำ', roman: 'nám' },
      LAO: { native: 'ນ້ຳ', roman: 'nam' }, KHM: { native: 'ទឹក', roman: 'tuk' },
      MMR: { native: 'ရေ', roman: 'ye' }, MYS: { native: 'air' }, IDN: { native: 'air' },
      PHL: { native: 'tubig' }, SGP: { native: 'water' }, BRN: { native: 'air' },
      TLS: { native: 'água' }, IND: { native: 'पानी', roman: 'pānī' },
      PAK: { native: 'پانی', roman: 'pānī' }, BGD: { native: 'পানি', roman: 'pani' },
      NPL: { native: 'पानी', roman: 'pānī' }, LKA: { native: 'වතුර', roman: 'vatura' },
      BTN: { native: 'ཆུ', roman: 'chu' }, KAZ: { native: 'су', roman: 'su' },
      UZB: { native: 'suv' }, TKM: { native: 'suw' }, KGZ: { native: 'суу', roman: 'suu' },
      TJK: { native: 'об', roman: 'ob' }, AFG: { native: 'آب', roman: 'âb' },
      AZE: { native: 'su' }, GEO: { native: 'წყალი', roman: 'tsqali' },
      ARM: { native: 'ջուր', roman: 'jur' },
      // Oceania
      AUS: { native: 'water' }, NZL: { native: 'water' }, PNG: { native: 'water' },
      FJI: { native: 'water' }, SLB: { native: 'water' }, VUT: { native: 'water' },
      WSM: { native: 'vai' }, TON: { native: 'vai' },
    },
  };

  return { POSTER_LANGS: POSTER_LANGS, POSTER_WORDS: POSTER_WORDS };
});
