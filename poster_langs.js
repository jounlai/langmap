/* poster_langs.js — curated one-language-per-country + word data for the poster. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) { root.POSTER_LANGS = api.POSTER_LANGS; root.POSTER_WORDS = api.POSTER_WORDS; }
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  // ISO 3166-1 alpha-3 → chosen language (code references LANG_DATA where useful).
  const POSTER_LANGS = {
    JPN: { code: 'ja' }, CHN: { code: 'zh' }, KOR: { code: 'ko' },
    FRA: { code: 'fr' }, DEU: { code: 'de' }, ITA: { code: 'it' },
    ESP: { code: 'es' }, PRT: { code: 'pt' }, GBR: { code: 'en' },
    USA: { code: 'en' }, RUS: { code: 'ru' }, UKR: { code: 'uk' },
    POL: { code: 'pl' }, NLD: { code: 'nl' }, SWE: { code: 'sv' },
    NOR: { code: 'no' }, FIN: { code: 'fi' }, GRC: { code: 'el' },
    TUR: { code: 'tr' }, IRN: { code: 'fa' }, SAU: { code: 'ar' },
    ISR: { code: 'he' }, IND: { code: 'hi' }, THA: { code: 'th' },
    VNM: { code: 'vi' }, IDN: { code: 'id' }, EGY: { code: 'ar' },
    KEN: { code: 'sw' }, BRA: { code: 'pt' }, MEX: { code: 'es' },
  };

  // MVP word. Latin-script forms omit `roman`; non-Latin carry a romanization.
  const POSTER_WORDS = {
    water: {
      JPN: { native: '水', roman: 'mizu' },
      CHN: { native: '水', roman: 'shuǐ' },
      KOR: { native: '물', roman: 'mul' },
      FRA: { native: 'eau' },
      DEU: { native: 'Wasser' },
      ITA: { native: 'acqua' },
      ESP: { native: 'agua' },
      PRT: { native: 'água' },
      GBR: { native: 'water' },
      USA: { native: 'water' },
      RUS: { native: 'вода', roman: 'voda' },
      UKR: { native: 'вода', roman: 'voda' },
      POL: { native: 'woda' },
      NLD: { native: 'water' },
      SWE: { native: 'vatten' },
      NOR: { native: 'vann' },
      FIN: { native: 'vesi' },
      GRC: { native: 'νερό', roman: 'neró' },
      TUR: { native: 'su' },
      IRN: { native: 'آب', roman: 'âb' },
      SAU: { native: 'ماء', roman: 'māʼ' },
      ISR: { native: 'מים', roman: 'mayim' },
      IND: { native: 'पानी', roman: 'pānī' },
      THA: { native: 'น้ำ', roman: 'nám' },
      VNM: { native: 'nước' },
      IDN: { native: 'air' },
      EGY: { native: 'ماء', roman: 'māʼ' },
      KEN: { native: 'maji' },
      BRA: { native: 'água' },
      MEX: { native: 'agua' },
    },
  };

  return { POSTER_LANGS: POSTER_LANGS, POSTER_WORDS: POSTER_WORDS };
});
