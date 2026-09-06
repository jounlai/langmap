/**
 * Word Map Data — 20 key words × 1165 languages/varieties (incl. ~80 historical)
 * Each language has: coordinates (primary city), native name, and word entries with IPA
 */


// Excluded codes: hidden from the default modern view. Includes:
//   - Historical / classical / extinct languages (Latin, Old English, Akkadian, …)
//   - Liturgical-only varieties (Pali, Coptic, Aramaic continuum)
//   - Pedagogical reconstructions of older registers (ja_edo, ko_mid, vi_nom)
//   - Genuine reconstructions (Proto-Indo-European)
//   - Critically endangered or revived (Manchu, Sanskrit-as-classical)
//   - Constructed / artificial languages can also live here
// Per wordmap-check-3.md §8: not all entries here are strictly "extinct";
// some have small modern speaker communities (e.g. Manchu, Aramaic dialects,
// liturgical Sanskrit). The shared property is "hidden from the modern view by default".
const EXCLUDED_CODES = new Set([
  'ja_edo','ja_heian','ja_kanbun','ko_mid','ko_em','la','egy','sux','akk','hit','nci','emy','p_ine','p_toc','p_jpn','p_kor','ptrk','pmng','p_tun','p_aav','ptai','p_hmx','pafa','pkar','pmay','puaz','pban','p_sit','psem','pura','p_dra','paus',
  'non','enm','en_em','got','cu','pi','pi_edu','cop','arc','el_grc','el_kath','zh_song','zh_han','zh_tang','zh_wenyan_edu',
  'vi_nom','vi_han','sa','sa_edu','ar_qur',
  'de_lut','es_sgl','fr_class',
  // Phase 4: historical / ancient
  'peo','ave','xto','txb','phn','uga','xlu','pal','fa_clas','syc','fro','it_dan','goh','gez',
  'he_mis','hy_grab',
  // Phase 4B: more historical
  'gmy','xct','xct_litpr','xpu','xhu','elx','xsa','kaw','kho','gmh','osp','okz','osx',
  // Phase 5 historical
  'xpr','xqa','sga',
  // Phase 6 historical
  'mga','hbo',
  // Phase 8 historical
  'xng',
  // Phase 13: ancient Asian additions
  'och','ojp','h_vedic','txg','sog','otk',
  // Phase 13b: NE Asian + SE Asian ancient
  'zkt','juc','omx','pyx','obr','ocm',
  // Phase 13c: Russia / Thailand / Africa / Americas / Indonesia / Philippines ancient
  'orv','xsc','sukh','xmr','onw','qwc','chb','omy','osn','h_tagalog',
  // Reconstructed proto / hypothetical
  'p_jpk',
  // Korean Peninsula historical
  'oko', 'h_goguryeo', 'ko_gor',
  // Japonic historical / proto
  'ja_chu', 'p_ryu',
  // Pass 35: 5 historical additions
  'ota', 'cmg', 'ett', 'xht', 'txr',
  // Batches 48 & 54: Messapic + Maharastri Prakrit additions
  'cms', 'pmh',
  // Batch 60: Old Frisian
  'ofs',
  // Ubykh — Northwest Caucasian, extinct since 7 October 1992 (last fully fluent
  // speaker Tevfik Esenç died in Hacıosman, Turkey). dataStatus:'attested' via
  // Dumézil/Vogt corpus; classified historical so excluded from the modern map.
  // Damin — secret ceremonial men's register of Lardil; effectively dormant since
  // ~1980 when the last Warama initiations stopped. Classed as historical via
  // HIST_DESCENDANT['lbz_damin']='lbz' so excluded from the modern map.
  'lbz_damin',
  // 2026-05-18: 4 historical-named langs that were defaulting to modern.
  // See HIST_DESCENDANT comment for details. `prg` Old Prussian is classified
  // historical (fragmentary) — keep separate from EXCLUDED_CODES if it's marked
  // fragmentary elsewhere; ang/ohu/myz are well-attested.
  'ang', 'ohu', 'myz',
  // 2026-06-09: 8 extinct languages that were still defaulting to modern.
  // All have speakers:'0 ...' or 'Extinct ...' in wordmap_meta.js.
  //   xum — Umbrian (Sabellic, extinct ~1c CE; Iguvine Tablets)
  //   osc — Oscan (Sabellic, extinct by ~1c CE; Pompeii inscriptions)
  //   xfa — Faliscan (Italic, extinct ~150 BCE)
  //   xve — Venetic (Italic, extinct ~1c BCE)
  //   xpg — Phrygian (Indo-European isolate branch, extinct ~5c CE)
  //   oar — Old Aramaic (ancestor of Imperial Aramaic)
  //   tup — Tupinambá (extinct as L1 ~1700s; basis of Língua Geral/Nheengatu)
  //   yug — Yug (Yeniseian, last L1 speaker died early 2000s)
  'xum', 'osc', 'xfa', 'xve', 'xpg', 'oar', 'tpn', // 2026-06-09 follow-up: 4 more extinct langs missed by the first sweep
  // (they use the '†extinct' dagger-prefixed speakers value or 'Extinct'
  // without the leading '0', which the initial filter missed).
  //   xib — Iberian (Paleo-Hispanic isolate, †extinct ~1c CE)
  //   xli — Liburnian (Adriatic Italic-area, †extinct ~1c CE, Romanized)
  //   xag — Caucasian Albanian (†extinct as literary language ~12c CE;
  //         modern descendant Udi `udi` remains living)
  //   bzg — Babuza/Favorlang (Formosan, dormant since early 20c.)
  // prg (Old Prussian) is intentionally *not* added — it's classified
  // historical via dataStatus:'fragmentary', the other exclusion path.
  // mer (Meru) is a living Bantu language; its meta is wrongly stamped
  // with Meroitic info — separate data bug, fixed in wordmap_meta.js.
  'xib', 'xli', 'xag', ]);

const LANG_DATA = {
  "es_cr": { "name": "Costa Rican Spanish", "native": "Español costarricense", "lat": 9.93, "lng": -84.08 },
  "es_hn": { "name": "Honduran Spanish", "native": "español", "lat": 14.07, "lng": -87.19 },
  "es_ni": { "name": "Nicaraguan Spanish", "native": "Español nicaragüense", "lat": 12.11, "lng": -86.24 },
  "es_sv": { "name": "Salvadoran Spanish", "native": "Español salvadoreño", "lat": 13.69, "lng": -89.19 },
  "ar_jo": { "name": "Jordanian Arabic", "native": "اللهجة الأردنية", "lat": 31.95, "lng": 35.93 },
  "ar_ps": { "name": "Palestinian Arabic", "native": "Palestinian Arabic", "lat": 31.9, "lng": 35.2 },
  "fr_lu": { "name": "Luxembourg French", "native": "Français", "lat": 49.61, "lng": 6.13 },
  "fr_cm": { "name": "Cameroonian French", "native": "Français camerounais", "lat": 3.85, "lng": 11.5 },
  "de_lu": { "name": "Luxembourg Standard German", "native": "Luxembourg Standard German", "lat": 49.61, "lng": 6.13 },
  "en_ng2": { "name": "Ghanaian English", "native": "Ghanaian English", "lat": 5.6, "lng": -0.19 },
  "pt_mo": { "name": "Macanese Portuguese", "native": "Português Macaense", "lat": 22.2, "lng": 113.54 },
  "lb": { "name": "Luxembourgish", "native": "Lëtzebuergesch", "lat": 49.61, "lng": 6.13 },
  "gcr": { "name": "Guianese Creole", "native": "Kriyòl", "lat": 4.92, "lng": -52.33 },
  "acf": { "name": "Saint Lucian Creole", "native": "Kwéyòl", "lat": 14.01, "lng": -60.99 },
  "gan_yc": { "name": "Gan Chinese (Yichun)", "native": "宜春話", "lat": 27.81, "lng": 114.42 },
  "gan_ja": { "name": "Gan Chinese (Jiʼan)", "native": "吉安贛語", "lat": 27.11, "lng": 114.99 },
  "gan_fz": { "name": "Gan Chinese (Fuzhou)", "native": "Gan Chinese (Fuzhou)", "lat": 27.95, "lng": 116.36 },
  "cjy_lv": { "name": "Jin Chinese (Lishi/Lüliang)", "native": "吕梁晋语", "lat": 37.52, "lng": 111.13 },
  "cjy_xz": { "name": "Jin Chinese (Xinzhou)", "native": "Jin Chinese (Xinzhou)", "lat": 38.42, "lng": 112.73 },
  "hsn_hy": { "name": "Xiang Chinese (Hengyang)", "native": "衡州話 / 衡陽湘語", "lat": 26.89, "lng": 112.57 },
  "hsn_yz": { "name": "Xiang Chinese (Yongzhou)", "native": "Xiang Chinese (Yongzhou)", "lat": 26.42, "lng": 111.61 },
  "czh_wy": { "name": "Hui Chinese (Wuyuan)", "native": "徽州话（婺源）", "lat": 29.25, "lng": 117.86 },
  "bla": { "name": "Blackfoot", "native": "Siksiká Iʼksistamiʼkssin", "lat": 49, "lng": -112 },
  "hop": { "name": "Hopi", "native": "Hopílavayi", "lat": 35.907, "lng": -110.6093,
    "wordEvidence": {
      "tree": { "evidence": "direct", "source": "hopidictionary.com — Hotski 'tree', with the example Hotski mokingpu '(The) tree (is) green'", "note": "replaces suukya, which was a copy of this row's own one cell (suukya' 'one', confirmed by native-languages.org). WEAK SOURCE: one online dictionary, and neither the Hopi Dictionary Project's Third Mesa volume nor Wiktionary was reachable to cross-check the orthography — Wiktionary's nearest Hopi lemma is koho 'wood, firewood, stick'" },
      "good": { "evidence": "direct", "source": "Wiktionary Hopi lemma hopi 'civilised, well-behaved; polite, peaceable'", "note": "the ethnonym and the adjective are the same word" },
      "water": { "evidence": "direct", "source": "Wiktionary Hopi lemma paahu 'water; spring'", "note": "native-languages.org gives kuuyi for water; paahu is natural/spring water and kuuyi is drawn water. Both are defensible; paahu kept" }
    } },
  // Comanche — review 433 row sweep. The row had been carrying several words
  // that are not Comanche at all; the ones replaced below are sourced cell by
  // cell. Surface forms follow the Comanche orthography (ʉ = /ɨ/), IPA uses ɨ.
  "com": { "name": "Comanche", "native": "nʉmʉnʉʉ", "lat": 34.75, "lng": -98.5,
    "wordEvidence": {
      "dog":    { "evidence": "direct", "source": "Wiktionary Comanche lemma sarii 'dog'; Comanche Nation Language Department, 'Comanche Word of the Day: sarii/dog'; ASJP wordlist (Canonge) sati7", "note": "replaces sʉwʉ, which is not a Comanche word for dog" },
      "moon":   { "evidence": "direct", "source": "Wiktionary Comanche lemma mʉa 'moon'; native-languages.org Comanche word list, Moon: Mua", "note": "replaces poʰa — puha/poha is 'medicine, spiritual power', the same stem that was also sitting in the good cell" },
      "good":   { "evidence": "direct", "source": "Omniglot Comanche phrases — Tsaatʉ̱ as the reply to 'How are you?'; ASJP wordlist glosses ca (tsaa) 'good'", "note": "replaces puʰa; see the moon note" },
      "hello":  { "evidence": "direct", "source": "Omniglot Comanche phrases — Marʉ́awe 'hello' (haa marʉ́awe 'hi')", "formType": "greeting-formula", "note": "replaces haʊ, which is the English-language 'how' stereotype of Plains speech, not a Comanche word" },
      "thanks": { "evidence": "direct", "source": "Omniglot Comanche phrases — Ʉra / Ʉrako 'thank you'", "formType": "thanks-formula", "note": "cell was empty" },
      "house":  { "evidence": "direct", "source": "Wiktionary Comanche lemma kahni 'house'", "note": "replaces tua" },
      "tree":   { "evidence": "direct", "source": "ASJP wordlist (Canonge) hupi 'tree'; Numic *huupi 'wood, tree'", "note": "replaces piʰe" },
      "mother": { "evidence": "direct", "source": "Wiktionary Comanche lemma pia 'mother'", "note": "replaces miʰa" },
      "father": { "evidence": "direct", "source": "Wiktionary Comanche lemma ahpʉ 'father'", "note": "replaces pʊ" },
      "star":   { "evidence": "direct", "source": "Wiktionary Comanche lemma tatsinuupi 'star (celestial body)'; ASJP tacinupi", "note": "orthography corrected from tatsinʉʉpʉ — two independent sources write -uupi" },
      "hand":   { "evidence": "direct", "source": "native-languages.org Comanche body-part chart — mo'o; Wiktionary glosses nami, the form this cell used to hold, as 'younger sister'" },
      "cat":    { "evidence": "disputed", "source": "no source found", "note": "ɨsʉ mixes ɨ and ʉ in a row that otherwise writes ʉ throughout, and its IPA ɪsɨ uses /ɪ/, which Comanche does not have. Numic isa is 'wolf, coyote'. Left as-is only because no Comanche word for the domestic cat could be sourced" },
      "love":   { "evidence": "disputed", "source": "no source found", "note": "wʊʊʰa is not in Wiktionary, ASJP or the Comanche Nation materials. Left as-is pending a source" }
    } },
  "one": { "name": "Oneida", "native": "Onʌyota'káhkahʌ", "lat": 43, "lng": -75.5 },
  "ono": { "name": "Onondaga", "native": "Onoñdaʼgegáʼ nigaweñoʼdeñʼ", "lat": 42.95, "lng": -76.2 },
  "win": { "name": "Ho-Chunk (Winnebago)", "native": "Ho-Chunk (Winnebago)", "lat": 44.31, "lng": -90.8 },
  "cro": { "name": "Crow", "native": "Apsáalooke", "lat": 45.6, "lng": -107.5 },
  "hai": { "name": "Haida", "native": "Haidax", "lat": 54, "lng": -132.5 },
  "cic": { "name": "Chickasaw", "native": "Chikashshanompa'", "lat": 34.774, "lng": -96.678 },
  "ik": { "name": "Iñupiaq", "native": "Iñupiatun", "lat": 71.29, "lng": -156.79 },
  "na": { "name": "Nauruan", "native": "dorerin Naoero", "lat": -0.53, "lng": 166.93 },
  "es_bo": { "name": "Bolivian Spanish", "native": "Español boliviano", "lat": -17, "lng": -65.3 },
  "es_py": { "name": "Paraguayan Spanish", "native": "español paraguayo", "lat": -25.27, "lng": -57.65 },
  "es_pa": { "name": "Panamanian Spanish", "native": "español panameño", "lat": 8.5, "lng": -80 },
  "en_my": { "name": "Malaysian English", "native": "Malaysian English", "lat": 4.21, "lng": 101.69 },
  "pt_gw": { "name": "Guinea-Bissau Portuguese/Kriol", "native": "Kriol", "lat": 11.9, "lng": -15.05 },
  "tsz": { "name": "Purépecha", "native": "P'urhépecha", "lat": 19.52, "lng": -101.6 },
  "nez": { "name": "Nez Perce", "native": "Nimipuutímt", "lat": 46.4, "lng": -116.8 },
  "woe": { "name": "Woleaian", "native": "Woleaian", "lat": 7.3667, "lng": 143.9 },
  "pmt": { "name": "Tuamotuan", "native": "Reʻo Paʻumotu", "lat": -18.7963, "lng": -141.584 },
  "bin": { "name": "Edo (Bini)", "native": "Ẹ̀dó", "lat": 6.34, "lng": 5.62 },
  "khw": { "name": "Khowar", "native": "کھوار", "lat": 35.85, "lng": 71.8 },
  "xav": { "name": "Xavante", "native": "A'ũwe", "lat": -14.5, "lng": -52.5 },
  "ter": { "name": "Terena", "native": "Terêna", "lat": -20.32, "lng": -55.5 },
  "bor": { "name": "Bororo", "native": "Bɔrɔ", "lat": -15.8, "lng": -56.5 },
  "trn": { "name": "Trinitario Mojeño", "native": "Mojeño Trinitario", "lat": -15.33, "lng": -65.41 },
  "ake": { "name": "Akawaio", "native": "Akawaio", "lat": 6.16, "lng": -60.86 },
  "aoc": { "name": "Pemón", "native": "Pemon", "lat": 4.5, "lng": -62 },
  "gun": { "name": "Mbyá Guaraní", "native": "Mbyá Guaraní", "lat": -25.5, "lng": -54.5 },
  "zdj": { "name": "Comorian (Shikomori)", "native": "Comorian (Shikomori)", "lat": -11.7, "lng": 43.26 },
  "ayl": { "name": "Libyan Arabic", "native": "اللهجة الليبية", "lat": 32.89, "lng": 13.19 },
  "abv": { "name": "Bahrani Arabic", "native": "العربية البحرانية / Baħrāni", "lat": 26.22, "lng": 50.58 },
  "afb": { "name": "Gulf Arabic (Qatari)", "native": "خليجي", "lat": 25.29, "lng": 51.53 },
  "acw": { "name": "Hijazi Arabic", "native": "الحجازية", "lat": 21.49, "lng": 39.19 },
  "swb": { "name": "Maore Comorian (Mahorais)", "native": "Shimaore", "lat": -12.78, "lng": 45.23 },
  "adx": { "name": "Amdo Tibetan", "native": "ཨ་མདོའི་སྐད་", "lat": 36.62, "lng": 101.76 },
  "qxs": { "name": "Southern Qiang", "native": "Southern Qiang", "lat": 32.8, "lng": 103.6 },
  "duu": { "name": "Drung (Dulong)", "native": "Tvrung kvt", "lat": 27.741, "lng": 98.666 },
  "jya": { "name": "Situ rGyalrong", "native": "Situ", "lat": 32, "lng": 102 },
  "ers": { "name": "Ersu", "native": "ěrsū / 尔苏", "lat": 28.976, "lng": 102.7745 },
  "bca": { "name": "Central Bai", "native": "白语", "lat": 25.92, "lng": 100.31 },
  "atb": { "name": "Zaiwa (Atsi)", "native": "tsau³¹va⁵¹", "lat": 24.43, "lng": 98.58 },
  "prk": { "name": "Parauk Wa", "native": "pa̠rauk", "lat": 23.5, "lng": 99.5 },
  "slr": { "name": "Salar", "native": "salırça", "lat": 35.8512, "lng": 102.4891 },
  "ybe": { "name": "Western Yugur", "native": "Western Yugur", "lat": 37.9, "lng": 100.5 },
  "yuy": { "name": "Eastern Yugur", "native": "ئۇيغۇر", "lat": 39.3, "lng": 99.7 },
  "mjg": { "name": "Monguor (Tu)", "native": "Mongghul", "lat": 36.32, "lng": 102.83 },
  "sce": { "name": "Dongxiang (Santa)", "native": "Santa", "lat": 35.6, "lng": 103.2 },
  "cjs": { "name": "Shor", "native": "Шор тили", "lat": 53.26, "lng": 88.54 },
  "dlg": { "name": "Dolgan", "native": "Долган тили", "lat": 71, "lng": 102.3 },
  "kdt": { "name": "Kuy", "native": "Kuy", "lat": 13.75, "lng": 105 },
  "blk": { "name": "Pa’O", "native": "ပအိုဝ်ႏဘာႏသာႏ", "lat": 19, "lng": 97.15 },
  "njo": { "name": "Ao Naga", "native": "Ao (Chungli Ao: Ao, Mongsen Ao: Aa)", "lat": 26.17, "lng": 94.51 },
  "srb": { "name": "Sora", "native": "Sora", "lat": 19, "lng": 84 },
  "kjg": { "name": "Khmu", "native": "Kmhmu'", "lat": 19.89, "lng": 102.13 },
  "mro": { "name": "Mru", "native": "Mru (ꯃꯔꯨ in Mru script)", "lat": 21.775, "lng": 92.2 },
  "gon": { "name": "Gondi", "native": "गोंडी / కోయం (Gōṇḍī / Koitur)", "lat": 20.5, "lng": 79 },
  "bfq": { "name": "Badaga", "native": "Badaga", "lat": 11.417, "lng": 76.683 },
  "har": { "name": "Harari", "native": "Gēy Sinan", "lat": 9.3126, "lng": 42.1227 },
  "es_pr": { "name": "Puerto Rican Spanish", "native": "Español puertorriqueño", "lat": 18.47, "lng": -66.11 },
  "es_do": { "name": "Dominican Spanish", "native": "Español dominicano", "lat": 18.49, "lng": -69.93 },
  "es_gt": { "name": "Guatemalan Spanish", "native": "Español guatemalteco", "lat": 14.63, "lng": -90.51 },
  "es_ec": { "name": "Ecuadorian Spanish", "native": "Español ecuatoriano", "lat": -0.18, "lng": -78.47 },
  "es_uy": { "name": "Uruguayan Spanish", "native": "Español uruguayo", "lat": -34.9, "lng": -56.16 },
  "ar_sy": { "name": "Syrian Arabic", "native": "اللهجة السورية", "lat": 33.51, "lng": 36.29 },
  "ar_ye": { "name": "Yemeni Arabic", "native": "اللهجة اليمنية", "lat": 15.35, "lng": 44.21 },
  "ar_sa": { "name": "Najdi Arabic", "native": "اللهجة النجدية", "lat": 24.71, "lng": 46.68 },
  "ar_lb": { "name": "Lebanese Arabic", "native": "اللهجة اللبنانية", "lat": 33.89, "lng": 35.5 },
  "en_wls": { "name": "Welsh English", "native": "English (Welsh)", "lat": 51.48, "lng": -3.18 },
  "en_jam": { "name": "Jamaican English", "native": "English (Jamaican)", "lat": 18.01, "lng": -76.79 },
  "en_ng": { "name": "Nigerian English", "native": "English (Nigerian)", "lat": 6.52, "lng": 3.38 },
  "en_ph": { "name": "Philippine English", "native": "English (Philippine)", "lat": 14.6, "lng": 120.98 },
  "en_ke": { "name": "Kenyan English", "native": "English (Kenyan)", "lat": -1.29, "lng": 36.82 },
  "fr_sn": { "name": "Senegalese French", "native": "Français sénégalais", "lat": 14.69, "lng": -17.44 },
  "fr_ci": { "name": "Ivorian French", "native": "Français ivoirien", "lat": 5.36, "lng": -4.01 },
  "fr_ht": { "name": "Haitian French", "native": "Français haïtien", "lat": 18.59, "lng": -72.31 },
  "pt_mz": { "name": "Mozambican Portuguese", "native": "Português moçambicano", "lat": -25.97, "lng": 32.58 },
  "pt_cv": { "name": "Cape Verdean Portuguese", "native": "Português cabo-verdiano", "lat": 14.93, "lng": -23.51 },
  "nl_be": { "name": "Belgian Dutch (Flemish)", "native": "Vlaams", "lat": 51.22, "lng": 4.4 },
  "en_us": { "name": "General American English", "native": "English (American)", "lat": 39.1, "lng": -94.6 },
  "en_ca": { "name": "Canadian English", "native": "English (Canadian)", "lat": 43.65, "lng": -79.38 },
  "en_za": { "name": "South African English", "native": "English (South African)", "lat": -26.2, "lng": 28.05 },
  "de_ch": { "name": "Swiss Standard German", "native": "Schweizer Hochdeutsch", "lat": 47.37, "lng": 8.54 },
  "pt_ao": { "name": "Angolan Portuguese", "native": "Português angolano", "lat": -8.84, "lng": 13.23 },
  "es_ve": { "name": "Venezuelan Spanish", "native": "Español venezolano", "lat": 10.49, "lng": -66.88 },
  "ca_va": { "name": "Valencian", "native": "Valencià", "lat": 39.47, "lng": -0.38 },
  // === East Asian ===
  ja: { name: 'Japanese', native: '日本語', lat: 35.68, lng: 139.69, // Tokyo

    // Audit Task 200: full per-cell wordEvidence for source-checked
    // row. Sources: NHK発音アクセント新辞典 (2016) for IPA accent
    // patterns; 大辞林 第四版 (2019) for orthographic citation forms;
    // Wiktionary Japanese pronunciation entries for cross-validation.
    // The IPA values use the standard Tokyo broadcast register (NHK
    // 標準語) — consistent with the row's `pronunciationType: 'ipa'`.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'NHK 2016; Daijirin 4 — 水 mizu, Tokyo /miꜜzɯ/ flat-low' },
      fire:   { evidence: 'direct', source: 'NHK 2016; Daijirin 4 — 火 hi, monosyllabic flat tone' },
      sun:    { evidence: 'direct', source: 'NHK 2016; Daijirin 4 — 日 hi (homophone of fire — both /hi/, distinguished by context)', note: 'lexical overlap with fire: 日 hi "sun" and 火 hi "fire" are homophones in modern Tokyo Japanese' },
      moon:   { evidence: 'direct', source: 'NHK 2016 — 月 tsuki /t͡sɯki/' },
      mother: { evidence: 'direct', source: 'Daijirin 4 — 母 haha, neutral citation; informal おかあさん okāsan and かあちゃん kāchan are register variants', note: 'citation form is the lexical 母 haha; family-register forms 母さん/お母さん documented in meta.coverageNote scope' },
      father: { evidence: 'direct', source: 'Daijirin 4 — 父 chichi (literary citation); /t͡ɕit͡ɕi/ palatalized', note: 'parallel to mother: lexical citation form 父 chichi; お父さん otōsan is the everyday informal' },
      eat:    { evidence: 'direct', source: 'NHK 2016 — 食べる taberu (-ru verb infinitive citation form)', formType: 'inflected-form' },
      drink:  { evidence: 'direct', source: 'NHK 2016 — 飲む nomu (consonant-stem -u verb infinitive)', formType: 'inflected-form' },
      love:   { evidence: 'direct', source: 'Daijirin 4 — 愛 ai (Sino-Japanese noun); native 恋 koi covers romantic love specifically', note: 'concept default per WORD_LIST.definition: emotional love, covers both 愛 (encompassing) and 恋 (romantic)' },
      heart:  { evidence: 'direct', source: 'Daijirin 4 — 心 kokoro (emotional/cognitive heart per WORD_LIST.definition); anatomical 心臓 shinzō is a separate compound', note: 'matches WORD_LIST.definition default: emotional 心 not anatomical 心臓' },
      tree:   { evidence: 'direct', source: 'NHK 2016 — 木 ki, monosyllabic' },
      house:  { evidence: 'direct', source: 'NHK 2016 — 家 ie (native reading); Sino-Japanese 家 ka in compounds' },
      dog:    { evidence: 'direct', source: 'NHK 2016 — 犬 inu /inɯ/' },
      cat:    { evidence: 'direct', source: 'NHK 2016 — 猫 neko' },
      hand:   { evidence: 'direct', source: 'NHK 2016 — 手 te, monosyllabic' },
      eye:    { evidence: 'direct', source: 'NHK 2016 — 目 me; the singular 目 me is preferred per WORD_LIST.definition (eye policy)' },
      hello:  { evidence: 'direct', source: 'Daijirin 4 — こんにちは konnichiwa (afternoon-default neutral greeting); morning おはよう ohayō, evening こんばんは konbanwa', formType: 'greeting-formula' },
      thanks: { evidence: 'direct', source: 'Daijirin 4 — ありがとう arigatō (informal/neutral); formal ありがとうございます arigatō gozaimasu omitted for the row', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: 'NHK 2016 — 一 ichi (Sino-Japanese counter); native ひとつ hitotsu is the noun-classifier form', note: 'numeral citation per WORD_LIST.definition: cardinal/default form. Sino-Japanese 一 ichi chosen over native ひとつ hitotsu as the dictionary citation' },
      good:   { evidence: 'direct', source: 'NHK 2016 — 良い yoi (literary) / いい ii (colloquial); attributive citation form per WORD_LIST.definition.good' },
    } },
  ja_osa: { name: 'Japanese (Osaka)', native: '日本語(大阪)', lat: 34.69, lng: 135.50,
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — Kansai dialect; 〜て form. 食べる→食べて, 飲む→飲んで (撥音便), ええ/良え→良うて (ウ音便)', formType: 'connective-te', note: 'citation: 食べる; connective 〜て per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — Kansai dialect; 〜て form. 食べる→食べて, 飲む→飲んで (撥音便), ええ/良え→良うて (ウ音便)', formType: 'connective-te', note: 'citation: 飲む; connective 〜て per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — Kansai dialect; 〜て form. 食べる→食べて, 飲む→飲んで (撥音便), ええ/良え→良うて (ウ音便)', formType: 'connective-te', note: 'citation form ええ/良え; connective 〜て (ウ音便) per regional-variety policy' },
    } },
  ja_aom: { name: 'Japanese (Aomori)', native: '日本語(青森)', lat: 40.82, lng: 140.74,
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 津軽弁; 〜て form. 食う→食って (促音便), 飲む→飲んで (撥音便), 良い→良くて', formType: 'connective-te', note: 'citation: 食べる; connective 〜て per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 津軽弁; 〜て form. 食う→食って (促音便), 飲む→飲んで (撥音便), 良い→良くて', formType: 'connective-te', note: 'citation: 飲む; connective 〜て per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 津軽弁; 〜て form. 食う→食って (促音便), 飲む→飲んで (撥音便), 良い→良くて', formType: 'connective-te', note: 'citation form 良い/いい; connective 〜くて per regional-variety policy' },
    } },
  ja_oki: { name: 'Okinawan', native: 'うちなーぐち', lat: 26.33, lng: 127.80,
    wordEvidence: {
      woof:  { evidence: 'direct', source: '国立国語研究所『沖縄語辞典』(首里方言) — 「いぬ〔犬〕」の項に ～の鳴き声 \'wauwau。native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online reported the same form independently', note: 'new cell; dictionary and speaker agree' },
      eat:   { evidence: 'direct', source: '国立国語研究所『沖縄語辞典』(首里方言) — headword ka=nuN 他=maN,=di「食う。食べる」, i.e. citation かぬん kanuN with 連用形 かでぃ kadi', formType: 'connective-te', note: 'citation: かぬん kanuN (NOT 食む kamun — the earlier note here was wrong even though the displayed connective 食でぃ kadi was right; the dictionary conjugation code =maN,=di confirms kadi)' },
      drink: { evidence: 'direct', source: '国立国語研究所『沖縄語辞典』(首里方言) — headword nu=nuN 他=maN,=di「飲む」, i.e. citation ぬぬん nunuN with 連用形 ぬでぃ nudi', formType: 'connective-te', note: 'citation: ぬぬん nunuN (NOT 飲む numun — same correction as eat; displayed 飲でぃ nudi is confirmed by the =di conjugation code)' },
      love:  { evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08, who reports 情き nasaki as the form they use. 国立国語研究所『沖縄語辞典』corroborates it as a word for 情/愛: nasaki 名「1.〔文〕情。あわれむ心。2.愛のしるし。男女間の贈り物」, and its 「なさけ〔情〕」index lists nasaki first; the 「あいじょう〔愛情〕」index heads with sinasaki「なさけ。思いやり。また,男女の愛情。情愛」and cross-references なさけ', note: 'replaces 愛 eː, which was simply wrong — the dictionary lists ?ee as an interjection「おい。もし」, as「うち(のうち)」and as「藍」(indigo). This cell briefly displayed しなさき sinasaki after the 愛情 index, but that overrode the speaker on the strength of a 1976 headword and was inconsistent with ja_rys, where the same reporter\'s 情き nasaki had been accepted. Speaker attestation wins per the CONTRIBUTING section on native-speaker sources; sinasaki is kept here as the dictionary\'s 愛情 headword' },
      good:  { evidence: 'direct', source: '国立国語研究所『沖縄語辞典』(首里方言) — ゆたしゃん (dictionary romanization \'jutasjaN) 形「1.よい。いい。よろしい。良好である。善良である」', note: 'kana reading ユタサン is confirmed in BOTH directions of 大琉球語辞典: the 和琉 search (いい / 良い) returns 首里 ユタサン, and the reverse 琉和 search on ユタサン returns exactly one hit, 首里 — while 琉和 on ユタシャン returns only 与論 entries. So ユタサン is Okinawan and ユタシャン is Yoron. The 沖縄語辞典 romanization field reads \'jutasjaN, which invites the reading ゆたしゃん; that is a trap — the kana headword wins. (The 連用形 ゆたしく has ɕ only before /i/, where it is automatic, so it does not argue for ɕ before /a/.) Replaces まし maɕi, which that same dictionary lists as a NOUN — masi ①名「まし。一方よりまさること。一方よりよいこと」— i.e. "better/preferable", not the general adjective "good". Citation form: adjectives are outside the Ryukyuan connective extension (verbs only).' },
    } },
  ja_hak: { name: 'Japanese (Hakata)', native: '日本語(博多)', lat: 33.59, lng: 130.40,
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 博多弁; 〜て form with 九州ウ音便. 食う→食うて, 飲む→飲うで, 良か→良かって', formType: 'connective-te', note: 'citation: 食べる; connective 〜て per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 博多弁; 〜て form with 九州ウ音便. 食う→食うて, 飲む→飲うで, 良か→良かって', formType: 'connective-te', note: 'citation: 飲む; connective 〜て per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 博多弁; 〜て form with 九州ウ音便. 食う→食うて, 飲む→飲うで, 良か→良かって', formType: 'connective-te', note: 'citation form 良か; connective 〜かって per regional-variety policy' },
    } },
  ja_kyo: { name: 'Japanese (Kyoto)', native: '日本語(京都)', lat: 35.01, lng: 135.77,
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 京言葉; 〜て form. 食べる→食べて, 飲む→飲んで, ええ→良うて (replaces pre-existing 宜し)', formType: 'connective-te', note: 'citation: 食べる; connective 〜て per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 京言葉; 〜て form. 食べる→食べて, 飲む→飲んで, ええ→良うて (replaces pre-existing 宜し)', formType: 'connective-te', note: 'citation: 飲む; connective 〜て per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 京言葉; 〜て form. 食べる→食べて, 飲む→飲んで, ええ→良うて (replaces pre-existing 宜し)', formType: 'connective-te', note: 'citation form ええ (previous 宜し was incorrect Kyoto form); connective 〜て (ウ音便) per regional-variety policy' },
    } },
  ja_hir: { name: 'Japanese (Hiroshima)', native: '日本語(広島)', lat: 34.39, lng: 132.46,
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 広島弁 (Kansai-adjacent); 〜て form. 食べる→食べて, 飲む→飲んで, 良え→良うて (ウ音便)', formType: 'connective-te', note: 'citation: 食べる; connective 〜て per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 広島弁 (Kansai-adjacent); 〜て form. 食べる→食べて, 飲む→飲んで, 良え→良うて (ウ音便)', formType: 'connective-te', note: 'citation: 飲む; connective 〜て per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 広島弁 (Kansai-adjacent); 〜て form. 食べる→食べて, 飲む→飲んで, 良え→良うて (ウ音便)', formType: 'connective-te', note: 'citation form ええ/良え; connective 〜て (ウ音便) per regional-variety policy' },
    } },
  ja_mvi: { name: 'Miyako', native: '宮古語', lat: 24.79, lng: 125.28,
    wordEvidence: {
      mother:{ evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online', note: 'replaces あんま amma, which was identical to the Yaeyama cell and Okinawan-shaped' },
      good:  { evidence: 'direct', source: '琉球大学「大琉球語辞典」(横断検索) — 伊良部方言辞典 —「よい【良い】(形容詞) ぞーはン」よい。よろしい。好ましい。元気である。(同辞典は短い「ぞー」上。よい。上等の。と「いー」も併記)', note: 'replaces まし maɕi. Chose the -ハン predicative adjective to parallel the -サン form used for Okinawan. The Irabu dictionary is Miyako-area but not Hirara; the Hirara greeting ぞーかりうらまい゚な reported by @Soda_Limer independently shows the same ぞー root' },
      love:  { evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online', note: 'replaces 愛 ai, a Japanese loan' },
      cat:   { evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online', note: 'replaces 猫 majaː copied from Okinawan' },
      one:   { evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online' },
      hello: { evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online', note: 'replaces んみゃーち n̩mjaːtɕi, which is the welcome formula rather than the neutral everyday greeting this concept asks for. The contributor also offers the fuller ぞーかりうらまい゚な dzoːkaɾiɯɾamaɨnaː' },
      woof:  { evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online' },
      eat:   { evidence: 'inferred', source: 'stem from ja.wikipedia 宮古語 (終止形 foː「食う」, C類 長母音終止形); 連用形 fai per reader report from @Soda_Limer on X (2026-08); consistent with that stem (食(く)ふ → fa-i)', formType: 'connective-te', note: 'the earlier 食み kami was built on 噛む kamu — wrong lexeme. Miyako "eat" reflects 食(く)ふ with the Southern Ryukyuan p→f shift. Connective form kept per the Ryukyuan verb policy; 連用形 itself is reader-reported, not dictionary-confirmed' },
      drink: { evidence: 'inferred', source: 'Miyako (Hirara) 連用形 numi — Southern Ryukyuan 〜み pattern', formType: 'connective-te', note: 'restored after a brief revert to citation 飲む numu; reader report from @Soda_Limer on X (2026-08); did not flag this cell, which is weak positive evidence for it. Still not dictionary-confirmed' },
    } },
  ja_rys: { name: 'Yaeyama', native: '八重山語', lat: 24.34, lng: 124.16,
    wordEvidence: {
      mother:{ evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online', note: 'replaces あんま amma, which was identical to the Miyako cell and Okinawan-shaped' },
      good:  { evidence: 'direct', source: '琉球大学「大琉球語辞典」(横断検索) — 宮城信勇『石垣方言辞典』—「よい【良い】(形容詞) カイシャーン」①美しい。きれいだ。②状態が良好である。③良い意味にひろく使われる', note: 'replaces まし maɕi, which was inherited and matched neither dictionary. Sense ③ (broadly used in a positive sense) covers the general good this concept asks for; the word derives from かぎ/かげ (beauty, light)' },
      father:{ evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online', note: 'replaces うや uja — うや is the generic "parent" word and was identical to the Miyako cell' },
      love:  { evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online', note: 'replaces 愛 ai, a Japanese loan sitting in both southern Ryukyuan rows' },
      cat:   { evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online', note: 'short final vowel; replaces 猫 majaː copied from Okinawan まやー majaː' },
      one:   { evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online' },
      woof:  { evidence: 'direct', source: 'native-speaker attestation — @Soda_Limer (X), 2026-08. The contributor states they are reporting their own everyday usage rather than copying a dictionary, and notes that the published dictionaries also list synonyms they do not use. Published counterparts they cite: 宮城信勇『石垣方言辞典 文法・索引編』(沖縄タイムス社, 2003) for Yaeyama, 国立国語研究所『沖縄語辞典』(大蔵省印刷局, 1976) for Okinawan — both searchable via 琉球大学「大琉球語辞典」 — and 渡真利章良編著『宮古島の方言集』(ボーダーインク, 2020) for Miyako, which is not online', note: 'new cell; matches the Okinawan form the 沖縄語辞典 independently confirms' },
      eat:   { evidence: 'inferred', source: 'stem from ja.wikipedia 八重山語 (石垣方言 活用表:「食う」語幹 hwa-, 終止形1 hoː / 終止形2 hoːN); 連用形 ɸai per reader report from @Soda_Limer on X (2026-08); which matches that stem (hwa- + -i)', formType: 'connective-te', note: 'the earlier 食でぃ kadi was copied from Okinawan on the mistaken premise that Yaeyama is Northern Ryukyuan — it is SOUTHERN Ryukyuan (Macro-Yaeyama), closest to Miyako, and the shared f/h-initial reflex of 食(く)ふ confirms that. 連用形 is reader-reported, not dictionary-confirmed' },
      drink: { evidence: 'inferred', source: '連用形 numi per reader report from @Soda_Limer on X (2026-08); replacing the Okinawan copy 飲でぃ nudi', formType: 'connective-te', note: 'the previous value came from the Northern-Ryukyuan misclassification. 飲む is not in the online 石垣方言 conjugation table, so this is reader-reported only; a dictionary source (e.g. 宮城信勇『石垣方言辞典』) would still be worth having' },
    } },
  ko: { name: 'Korean', native: '한국어', lat: 37.57, lng: 126.98, // Seoul
},
  ko_kp: { name: 'Korean (DPRK)', native: '조선말', lat: 39.02, lng: 125.75, // Pyongyang
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 평양/문화어; 〜아/어 form. 먹다→먹어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 먹다; connective 〜아/어 per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 평양/문화어; 〜아/어 form. 먹다→먹어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 마시다; connective 〜아/어 (마시+어 縮約) per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 평양/문화어; 〜아/어 form. 먹다→먹어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 좋다; connective 〜아/어 per regional-variety policy' },
    } },
  ko_bus: { name: 'Korean (Busan)', native: '한국어(부산)', lat: 35.18, lng: 129.08,
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 부산/경상도 방언; 〜아/어 form with stem variant 묵 for 먹. 묵다→묵어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 묵다 (Busan stem variant of 먹다); connective 묵 + 〜어 per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 부산/경상도 방언; 〜아/어 form with stem variant 묵 for 먹. 묵다→묵어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 마시다; connective 〜아/어 (마시+어 縮約) per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 부산/경상도 방언; 〜아/어 form with stem variant 묵 for 먹. 묵다→묵어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 좋다; connective 〜아/어 per regional-variety policy' },
    } },
  ko_jeju: { name: 'Jeju', native: '제주어', lat: 33.50, lng: 126.53,
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'Jeju Koreanic connective form (sister-language policy) — 제주어 〜앙/엉 form (Jeju equivalent of Standard Korean 〜아/어). 먹다→먹엉, 마시다→마셩, 좋다→좋앙', formType: 'connective-eo-a', note: 'citation: 먹다; Jeju connective 〜엉 (sister to Korean 〜어) — terminal ŋ is the Jeju hallmark feature' },
      drink: { evidence: 'direct', source: 'Jeju Koreanic connective form (sister-language policy) — 제주어 〜앙/엉 form. 마시다→마셩 (마시+엉 縮約)', formType: 'connective-eo-a', note: 'citation: 마시다; Jeju connective 마셩 (sister to Korean 마셔)' },
      good:  { evidence: 'direct', source: 'Jeju Koreanic connective form (sister-language policy) — 제주어 〜앙/엉 form. 좋다→좋앙', formType: 'connective-eo-a', note: 'citation: 좋다; Jeju connective 〜앙 (sister to Korean 〜아)' },
    } },
  ko_yb: { name: 'Yanbian Korean', native: '연변조선어', lat: 42.90, lng: 129.51,
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 연변 조선어; 〜아/어 form. 먹다→먹어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 먹다; connective 〜아/어 per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 연변 조선어; 〜아/어 form. 먹다→먹어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 마시다; connective 〜아/어 (마시+어 縮約) per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 연변 조선어; 〜아/어 form. 먹다→먹어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 좋다; connective 〜아/어 per regional-variety policy' },
    } },
  zh: { name: 'Chinese (Mandarin)', native: '中文', lat: 39.90, lng: 116.40, // Beijing

    // Audit Task 200: full per-cell wordEvidence for source-checked
    // row. Sources: 现代汉语词典 第7版 (Modern Chinese Dictionary 7th
    // ed., 2016) for orthographic citation forms; GB/T 16159-2012
    // (Pinyin standard) for romanization-to-IPA mapping; Wiktionary
    // Mandarin entries for Chao tone notation. Tones shown are
    // citation tones (per CONTRIBUTING C3 Mandarin sandhi policy:
    // citation form takes priority over surface sandhi).
    wordEvidence: {
      water:  { evidence: 'direct', source: '现代汉语词典 7 — 水 shuǐ (third tone, dipping)' },
      fire:   { evidence: 'direct', source: '现代汉语词典 7 — 火 huǒ (third tone)' },
      sun:    { evidence: 'direct', source: '现代汉语词典 7 — 太·阳 tài·yáng (compound: 太 "great" + 阳 "yang/sun"); dictionary · marker indicates 阳 is everyday neutral tone (轻声), realized as low after 4th tone; single-character 日 rì is literary/written-only', note: 'compound 太阳 chosen as everyday spoken form per WORD_LIST.definition.sun; 阳 neutral-tone reading matches 月亮 yuèliang / 谢谢 xièxie / 爸爸 bàba elsewhere in this row' },
      moon:   { evidence: 'direct', source: '现代汉语词典 7 — 月亮 yuèliang (compound; 月 yuè alone is literary or "month")', note: 'compound 月亮 chosen — single 月 alone has the calendar-month sense per WORD_LIST.definition.moon' },
      mother: { evidence: 'direct', source: '现代汉语词典 7 — 妈妈 māma (informal/everyday); literary 母亲 mǔqīn omitted', note: 'informal 妈妈 chosen per CONTRIBUTING C3: child/familiar register acceptable when formal counterpart is rare in everyday speech' },
      father: { evidence: 'direct', source: '现代汉语词典 7 — 爸爸 bàba (informal/everyday); literary 父亲 fùqīn omitted', note: 'parallel to mother: informal 爸爸 chosen per CONTRIBUTING C3 family-register policy' },
      eat:    { evidence: 'direct', source: '现代汉语词典 7 — 吃 chī (verbal monosyllable, dictionary citation form)' },
      drink:  { evidence: 'direct', source: '现代汉语词典 7 — 喝 hē (verbal monosyllable; cf. drink-tea 喝茶 hē chá)' },
      love:   { evidence: 'direct', source: '现代汉语词典 7 — 爱 ài (verb/noun); fourth tone, falling' },
      heart:  { evidence: 'direct', source: '现代汉语词典 7 — 心 xīn (covers both anatomical and emotional senses; default per WORD_LIST.definition is emotional)' },
      tree:   { evidence: 'direct', source: '现代汉语词典 7 — 树 shù (compound 树木 shùmù also acceptable; bare 树 shù is the citation form)' },
      house:  { evidence: 'direct', source: '现代汉语词典 7 — 房子 fángzi (compound with 子 zi suffix; bare 房 fáng is morpheme)' },
      dog:    { evidence: 'direct', source: '现代汉语词典 7 — 狗 gǒu (third tone)' },
      cat:    { evidence: 'direct', source: '现代汉语词典 7 — 猫 māo (first tone); compound 猫咪 māomī common in casual speech' },
      hand:   { evidence: 'direct', source: '现代汉语词典 7 — 手 shǒu', note: 'Mandarin distinguishes 手 (hand) from 胳膊 gēbo (arm); matches WORD_LIST.definition.hand distal-limb default' },
      eye:    { evidence: 'direct', source: '现代汉语词典 7 — 眼睛 yǎnjing (compound; bare 眼 yǎn is morphemic)' },
      hello:  { evidence: 'direct', source: '现代汉语词典 7 — 你好 nǐhǎo (citation reading: dipping + dipping; surface sandhi gives ni˧˥xaʊ̯˨˩˦ — citation tones kept per CONTRIBUTING C3 policy)', formType: 'greeting-formula', note: 'documented in CONTRIBUTING C3: citation tones (third+third) kept in IPA column despite predictable third-tone sandhi' },
      thanks: { evidence: 'direct', source: '现代汉语词典 7 — 谢谢 xièxie (compound reduplication; second 谢 toneless)', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: '现代汉语词典 7 — 一 yī (citation tone first / yī; sandhi values yí/yì in compound contexts kept out per citation policy)' },
      good:   { evidence: 'direct', source: '现代汉语词典 7 — 好 hǎo (third tone, dipping); WORD_LIST.definition.good attributive form' },
      atsign: { evidence: 'direct', source: 'Wiktionary 艾特 — àitè, Sinological IPA /ˀaɪ̯⁵¹⁻⁵³ tʰɤ⁵¹/; CC-CEDICT 艾特 ài tè. Not in 现代汉语词典 7 (post-2010 internet coinage, so no PRC-standard 轻声 marking exists)', note: 'reader report (2026-08) that 特 here is 轻声: checked, not adopted. No dictionary marks it neutral, and 特 has no lexicalized neutral-tone role — unlike 眼睛 yǎnjing / 月亮 yuèliang / 太阳 tàiyang / 谢谢 xièxie elsewhere in this row, all of which 现汉7 marks 轻声. The weakening heard in casual speech is surface reduction of the epenthetic syllable that carries the English coda -t, and citation tones take priority per CONTRIBUTING C3' },
    } },
  yue: { name: 'Cantonese', native: '廣東話', lat: 22.28, lng: 114.16, // Hong Kong
},
  nan: { name: 'Taiwanese', native: '台語', lat: 25.03, lng: 121.57, // Taipei
},
  zh_tw: { name: 'Taiwan Mandarin', native: '國語', lat: 25.10, lng: 121.52, // Taipei
},
  wuu: { name: 'Wu Chinese', native: '吳語', lat: 31.23, lng: 121.47,

    // Audit Task 173: per-cell wordEvidence for source-checked Wu/Shanghainese
    // row. Sources: 上海话大词典 (吴连生主编, 上海辞书出版社 2008) for orthographic and
    // phonological citation; 钱乃荣《上海方言》(上海大学出版社 2007) for tone sandhi
    // and segment values; Wiktionary Shanghainese IPA conventions for 5-tone
    // citation system (T1=˥, T2=˩˧, T3=˧˩, T4=ʔ˥, T5=ʔ˩˨, simplified to citation).
    wordEvidence: {
      water:  { evidence: 'direct', source: '上海话大词典 (2008) — 水 sɿ "water"; apical vowel /ɿ/ after /s/ per Shanghai pronunciation' },
      fire:   { evidence: 'direct', source: '上海话大词典 (2008) — 火 hu (third tone, dipping) "fire"' },
      sun:    { evidence: 'direct', source: '上海话大词典 (2008) — 太阳 da-jã "sun" (cognate with Mandarin 太阳); 太 reflects Wu voiced initial *d-', note: 'compound 太阳 chosen as everyday term per WORD_LIST.definition.sun; literary 日 nyɪʔ omitted' },
      moon:   { evidence: 'direct', source: '上海话大词典 (2008) — 月亮 nyœʔ-liã "moon" (compound; 月 alone is also "month")', formType: 'compound', note: 'compound chosen — single 月 alone has month sense, parallel to Mandarin' },
      mother: { evidence: 'direct', source: '上海话大词典 (2008) — 姆妈 m̩-ma (Wu-distinctive informal kinship); literary/standard 母亲 mu-tɕʰin omitted', note: 'Wu uses syllabic nasal m̩ as first syllable — a hallmark of Shanghainese kinship terminology' },
      father: { evidence: 'direct', source: '上海话大词典 (2008) — 爸爸 pa-pa (everyday informal); literary 父亲 vu-tɕʰin omitted per CONTRIBUTING C3 family-register policy' },
      eat:    { evidence: 'direct', source: '上海话大词典 (2008) — 吃 tɕʰiʔ (entering tone, glottal-final); single character verbal citation' },
      drink:  { evidence: 'direct', source: '上海话大词典 (2008) — 喝 hueʔ (entering tone); cognate with Mandarin 喝 hē with Wu glottal-final entering reflex' },
      love:   { evidence: 'direct', source: '上海话大词典 (2008) — 爱 ɛ (third tone, dipping)' },
      heart:  { evidence: 'direct', source: '上海话大词典 (2008) — 心 ɕin (first tone, high)' },
      tree:   { evidence: 'direct', source: '上海话大词典 (2008) — 树 zɿ (low tone with Wu voiced sibilant /z/ — preserves Middle Chinese voiced initial lost in Mandarin)' },
      house:  { evidence: 'direct', source: '上海话大词典 (2008) — 屋里 oʔ-li (compound: 屋 "house" + 里 locative; everyday term for "home"); bare 屋 oʔ also used', formType: 'compound', note: 'Wu prefers compound 屋里 "in-the-house" as everyday "home/house"; cognate with Mandarin 屋里 wūli "inside the house"' },
      dog:    { evidence: 'direct', source: '上海话大词典 (2008) — 狗 kɤ (third tone, dipping)' },
      cat:    { evidence: 'direct', source: '上海话大词典 (2008) — 猫 mɔ (first tone)' },
      hand:   { evidence: 'direct', source: '上海话大词典 (2008) — 手 sɤ (third tone, dipping)' },
      eye:    { evidence: 'direct', source: '上海话大词典 (2008) — 眼睛 ŋɛ-tɕin (compound with velar nasal /ŋ/ initial; bare 眼 ŋɛ is morphemic)' },
      hello:  { evidence: 'direct', source: '钱乃荣《上海方言》(2007) — 侬好 noŋ-hɔ "you-good"; Wu 侬 noŋ "you" replaces Mandarin 你 nǐ; canonical Shanghainese greeting', formType: 'greeting-formula', note: 'Wu uses 侬 "you" (cognate Old Chinese 儂); the greeting parallels Mandarin 你好 but with the Wu 2nd-person pronoun' },
      thanks: { evidence: 'direct', source: '上海话大词典 (2008) — 谢谢 ʑia-ʑia (reduplication; Wu palatal /ʑ/ from Middle Chinese voiced /z/)', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: '上海话大词典 (2008) — 一 iʔ (entering tone, glottal-final, reflecting Middle Chinese 入声)' },
      good:   { evidence: 'direct', source: '上海话大词典 (2008) — 好 hɔ (third tone, dipping)' },
    } },
  hak_cn: { name: 'Hakka', native: '客家话', lat: 24.30, lng: 116.12, // Meizhou
},
  vi: { name: 'Vietnamese', native: 'Tiếng Việt', lat: 21.03, lng: 105.85, // Hanoi (Northern)
},
  vi_c: { name: 'Vietnamese (Central)', native: 'Tiếng Việt (Miền Trung)', lat: 16.46, lng: 107.60, // Huế
},
  vi_s: { name: 'Vietnamese (Southern)', native: 'Tiếng Việt (Miền Nam)', lat: 10.82, lng: 106.63, // Ho Chi Minh
},
  th: { name: 'Thai', native: 'ไทย', lat: 13.76, lng: 100.50, // Bangkok
},
  id: { name: 'Indonesian', native: 'Bahasa Indonesia', lat: -6.21, lng: 106.85, // Jakarta
},
  ms: { name: 'Malay', native: 'Bahasa Melayu', lat: 3.14, lng: 101.69, // Kuala Lumpur
},
  // === South Asian ===
  hi: { name: 'Hindi', native: 'हिन्दी', lat: 28.61, lng: 77.21, // Delhi
},
  // Caribbean Hindustani (Sarnami) — Indo-European Indo-Aryan Bhojpuri-based contact variety (descended from the Bhojpuri/Awadhi-speaking indentured laborers brought to the Caribbean by British and Dutch colonial powers between the 1830s and 1917 to work on sugar plantations after the abolition of slavery; closer to Bhojpuri bho than to Standard Hindi hi), ~150K-180K, Suriname (Sarnami Hindustani is the major variety, ~150K speakers — the largest community of Caribbean Hindustani in the world); Trinidad and Tobago (~5K declining); Guyana (~1K declining); diaspora (Netherlands ~30K).
  // Sources: Ethnologue 27 'hns'; Glottolog cari1276; Mohan (1990) Trinidad Bhojpuri.
  hns: { name: 'Caribbean Hindustani', native: 'Sarnāmi', lat: 5.83, lng: -55.17, // Paramaribo, Suriname (Sarnami heartland)
},
  // Modern Spoken Sanskrit (सरल संस्कृतम्) — the pedagogically simplified,
  // actively oral form of Sanskrit cultivated by the Samskrita Bharati
  // movement (1981–) and similar revival institutions. Distinct from
  // canonical Classical Sanskrit (sa) by: simplified sandhi (avoiding
  // complex Paninian fusions for clarity), conversational lexical
  // preferences (snehaḥ over prema, kukkuraḥ over śvā, akṣi over netram),
  // modern technical coinages (saṅgaṇaka "computer", dūrabhāṣa "phone"),
  // and active spoken pedagogy targeting ~25K self-claimed L1 speakers
  // and tens of thousands of L2 learners. Distinct from Vedic Sanskrit
  // (vsa) and from the historical Pāṇinian/Classical corpus (sa).
  // Anchored at Bangalore, Samskrita Bharati headquarters.
  sa_edu: { name: 'Modern Spoken Sanskrit', native: 'सरल संस्कृतम्', lat: 12.97, lng: 77.59,
},
  sa: { name: 'Sanskrit', native: 'संस्कृतम्', lat: 27.18, lng: 78.02, // Agra (historical center)

    // Audit Task 200: full per-cell wordEvidence for source-checked
    // row. Sources: Monier-Williams Sanskrit-English Dictionary
    // (1899) for Devanagari + traditional gloss; Whitney's Sanskrit
    // Grammar (1889) for declension/conjugation citation forms;
    // Apte's Practical Sanskrit-English Dictionary (1890) for
    // Classical-period attestation. IPA values reflect Classical
    // Sanskrit phonology (Pāṇinian standard) — not Vedic Sanskrit
    // which has separate row vsa. Visarga ḥ rendered /ɦ/ per the
    // Indo-Aryanist convention.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Monier-Williams — जल jala (n.) "water"; nominative singular जलम् jalam', formType: 'inflected-form', note: 'neuter nominative singular form per Sanskrit lexicographic citation convention' },
      fire:   { evidence: 'direct', source: 'Monier-Williams — अग्नि agni (m.) "fire, the deified element"; nominative singular अग्निः agniḥ', formType: 'inflected-form', note: 'masculine nominative singular; visarga ḥ → IPA ɦ' },
      sun:    { evidence: 'direct', source: 'Monier-Williams — सूर्य sūrya (m.) "the sun, sun-god"; nominative singular सूर्यः sūryaḥ', formType: 'inflected-form' },
      moon:   { evidence: 'direct', source: 'Monier-Williams — चन्द्र candra (m.) "the moon"; nominative singular चन्द्रः candraḥ', formType: 'inflected-form' },
      mother: { evidence: 'direct', source: 'Monier-Williams — मातृ mātṛ "mother"; nominative singular माता mātā (consonant-stem declension)', formType: 'inflected-form' },
      father: { evidence: 'direct', source: 'Monier-Williams — पितृ pitṛ "father"; nominative singular पिता pitā (parallel mātṛ declension)', formType: 'inflected-form' },
      eat:    { evidence: 'direct', source: 'Whitney §750 — root खाद् khād "eat"; 3rd singular present indicative खादति khādati (Class I)', formType: 'inflected-form', note: 'Sanskrit verbs are cited by 3rd-singular present indicative per traditional convention; cf. Whitney §730' },
      drink:  { evidence: 'direct', source: 'Whitney §750 — root पा pā "drink"; 3rd singular present पिबति pibati (Class I, reduplicated stem)', formType: 'inflected-form', note: 'reduplicated present pibati from root pā per Whitney §745' },
      love:   { evidence: 'direct', source: 'Monier-Williams — प्रेमन् preman (n.) "love, affection"; nominative singular प्रेम prema', formType: 'inflected-form' },
      heart:  { evidence: 'direct', source: 'Monier-Williams — हृदय hṛdaya (n.) "heart, mind, soul"; nominative singular हृदयम् hṛdayam', formType: 'inflected-form', note: 'covers both anatomical heart and emotional/cognitive seat — matches WORD_LIST.definition.heart default' },
      tree:   { evidence: 'direct', source: 'Monier-Williams — वृक्ष vṛkṣa (m.) "tree"; nominative singular वृक्षः vṛkṣaḥ', formType: 'inflected-form' },
      house:  { evidence: 'direct', source: 'Monier-Williams — गृह gṛha (n.) "house, dwelling"; nominative singular गृहम् gṛham', formType: 'inflected-form' },
      dog:    { evidence: 'direct', source: 'Monier-Williams — श्वन् śvan (m.) "dog"; nominative singular श्वा śvā', formType: 'inflected-form', note: 'irregular consonant stem; cognate with English hound, Latin canis' },
      cat:    { evidence: 'direct', source: 'Monier-Williams — मार्जार mārjāra (m.) "cat" (lit. "the cleaning one"); nominative singular मार्जारः mārjāraḥ', formType: 'inflected-form', note: 'derived from √mṛj "to clean" referring to feline grooming behavior' },
      hand:   { evidence: 'direct', source: 'Monier-Williams — हस्त hasta (m.) "hand"; nominative singular हस्तः hastaḥ', formType: 'inflected-form' },
      eye:    { evidence: 'direct', source: 'Monier-Williams — नेत्र netra (n.) "eye"; nominative singular नेत्रम् netram', formType: 'inflected-form', note: 'literary/poetic; everyday Vedic/Classical also uses अक्षि akṣi' },
      hello:  { evidence: 'direct', source: 'Apte — नमस्ते namaste, contraction of namaḥ + te "salutation to thee"; canonical greeting from Vedic period', formType: 'greeting-formula', note: 'literally "salutation to you (sg.)"; widely retained in modern Indo-Aryan languages' },
      thanks: { evidence: 'direct', source: 'Monier-Williams — धन्यवाद dhanyavāda (m.) "thanks, expression of gratitude"; nominative singular धन्यवादः dhanyavādaḥ', formType: 'inflected-form', note: 'compound: dhanya "fortunate" + vāda "speech"; modern Hindi धन्यवाद dhanyavād descends from this' },
      one:    { evidence: 'direct', source: 'Monier-Williams — एक eka "one"; nominative singular neuter एकम् ekam (also masculine एकः ekaḥ)', formType: 'inflected-form', note: 'neuter form chosen as the citation default; masculine एकः and feminine एका are gender variants' },
      good:   { evidence: 'direct', source: 'Monier-Williams — उत्तम uttama "best, highest, excellent" (superlative of ud "high"); nominative singular neuter उत्तमम् uttamam', formType: 'inflected-form', note: 'superlative form chosen for emphatic "good"; positive degree साधु sādhu also acceptable' },
    } },
  bn: { name: 'Bengali', native: 'বাংলা', lat: 23.81, lng: 90.41, // Dhaka
},
  // Rangpuri (Kamtapuri) — Indo-Aryan Eastern, ~15M speakers, NW Bangladesh + N Bengal/Assam India.
  // Sources: Ethnologue 27 'rkt'; Glottolog rang1265; Wilde (2008) Sociolinguistic Survey of Rangpuri.
  rkt: { name: 'Rangpuri', native: 'রংপুরী', lat: 25.74, lng: 89.28, // Rangpur, Bangladesh
},
  ur: { name: 'Urdu', native: 'اردو', lat: 31.56, lng: 74.35, // Lahore
},
  ta: { name: 'Tamil', native: 'தமிழ்', lat: 13.08, lng: 80.27, // Chennai
},
  // Irula — Dravidian Southern (Tamil-Kannada), ~200K speakers, Tamil Nadu/Kerala/Karnataka. Distinctive Adivasi tribal language.
  // Sources: Ethnologue 27 'iru'; Glottolog irul1241; Zvelebil (1973) Comparative Dravidian Phonology.
  iru: { name: 'Irula', native: 'இருளர் மொழி', lat: 11.45, lng: 76.71, // Nilgiri Hills (Irula heartland)
},
  // === European ===
  en: { name: 'English', native: 'English', lat: 51.51, lng: -0.13, // London
},
  de: { name: 'German', native: 'Deutsch', lat: 52.52, lng: 13.41, // Berlin
},
  fr: { name: 'French', native: 'Français', lat: 48.86, lng: 2.35, // Paris
},
  // Picard (Ch'ti) — Indo-European Italic Romance Oïl (sister to French fr and Walloon wln within the Oïl sub-branch; preserves Old Northern French features lost in Standard French — most famously Latin /k/ before /a/ remained as /k/ rather than becoming /ʃ/ in French), ~700K, France (Hauts-de-France region — Nord, Pas-de-Calais, Somme) + Belgium (Hainaut — Mons, Tournai). Famously the Ch'ti dialect of the popular 2008 film "Bienvenue chez les Ch'tis".
  // Sources: Ethnologue 27 'pcd'; Glottolog pica1241; Pooley (1996) Chtimi: The Urban Vernaculars of Northern France.
  pcd: { name: 'Picard', native: 'Picard', lat: 50.63, lng: 3.05, // Lille (Northern Picard zone — Lille/Tourcoing/Roubaix area)
},
  // Norman (Jèrriais / Guernésiais / Norman of mainland) — Indo-European Italic Romance Oïl (sister to French fr and Picard pcd within the Oïl sub-branch; preserves Old Norman features lost in Standard French including Latin /k/ before /a/ → /k/ rather than /ʃ/ — same conservatism as Picard), ~50K, UK Channel Islands (Jersey ~3K Jèrriais; Guernsey ~200 Guernésiais speakers) + France (Normandy mainland — Cotentin ~10-30K).
  // Sources: Ethnologue 27 'nrf' macrolanguage covers Jèrriais, Guernésiais, Cotentinais; Glottolog norm1245; Liddicoat (1994) A Grammar of the Norman French of the Channel Islands.
  nrf: { name: 'Norman', native: 'Nouormand', lat: 49.19, lng: -2.11, // Saint Helier, Jersey (largest surviving Norman speech community)
},
  it: { name: 'Italian', native: 'Italiano', lat: 41.90, lng: 12.50, // Rome
},
  es: { name: 'Spanish', native: 'Español', lat: 40.42, lng: -3.70, // Madrid
},
  es_mx: { name: 'Spanish (Mexico)', native: 'Español (México)', lat: 19.43, lng: -99.13, // Mexico City
},
  pt: { name: 'Portuguese', native: 'Português', lat: 38.72, lng: -9.14, // Lisbon
},
  pt_br: { name: 'Portuguese (Brazil)', native: 'Português (Brasil)', lat: -23.55, lng: -46.63, // São Paulo
},
  ru: { name: 'Russian', native: 'Русский', lat: 55.76, lng: 37.62, // Moscow
},
  // Quranic / Classical Arabic (العربية الفصحى التراثية) — the Arabic of the
  // Qurʾān (610-632 CE revelation; codified ʿUthmānic codex c. 650), pre-Islamic
  // poetry (al-mu'allaqāt), and classical exegesis. Distinct from Modern Standard
  // Arabic (ar) in that it preserves Classical morphology fully and is taught
  // with Tajwid (تجويد) — the codified phonetic recitation rules including
  // imāla, tafkhīm, idghām, qalqalah. The canonical pedagogical reading tradition
  // of every madrasa worldwide. Anchored at Mecca (Makkah), site of the Qur'anic
  // revelation and the linguistic prestige center.
  ar_qur: { name: 'Quranic Arabic', native: 'العربية الفصحى التراثية', lat: 21.42, lng: 39.83,
},
  ar: { name: 'Arabic (MSA)', native: 'العربية الفصحى', lat: 24.71, lng: 46.68, // Riyadh (MSA centroid)

    wordEvidence: {
      eat:   { evidence: 'direct', note: 'Arabic dictionary citation form: 3rd person masculine singular perfective (akala "he ate"); MSA has no infinitive equivalent' },
      drink: { evidence: 'direct', note: 'Arabic dictionary citation form: 3rd person masculine singular perfective (shariba "he drank"); MSA has no infinitive equivalent' },
      one:   { evidence: 'direct', note: 'Masculine singular form (wāḥid); feminine is wāḥida' },
    } },
  he: { name: 'Hebrew', native: 'עברית', lat: 32.07, lng: 34.78, // Tel Aviv
},
  tr: { name: 'Turkish', native: 'Türkçe', lat: 41.01, lng: 28.98, // Istanbul
},
  fa: { name: 'Persian', native: 'فارسی', lat: 35.69, lng: 51.39, // Tehran
},
  // Judeo-Persian — Iranian Jewish, ~60K, Iran/Israel/USA. Persian written in Hebrew script.
  // Sources: Ethnologue 27 'jpr'; Glottolog jude1257; Lazard (1968) Judeo-Persian texts.
  jpr: { name: 'Judeo-Persian', native: 'פארסי יהודי', lat: 32.65, lng: 51.67, // Isfahan (historic Iranian Jewish center)
},
  // Dari — Eastern Persian, ~12M, Afghanistan. Lingua franca; preserves classical vowel distinctions ē/ī, ō/ū lost in Iranian Persian.
  // Sources: Ethnologue 27 'prs'; Glottolog dari1249; Farhadi (1955) Le Persan Parlé en Afghanistan; Kieffer (2003).
  prs: { name: 'Dari', native: 'دری', lat: 34.53, lng: 69.17, // Kabul
},
  // Tregami (Trēgāmī) — Nuristani (sister to Kati and Waigali within the small Nuristani family of Indo-Iranian), ~3.5K, Afghanistan (Nuristan Province — Tregam Valley).
  // Sources: Ethnologue 27 'trm'; Glottolog treg1245; Morgenstierne (1973) Notes on Tregami.
  trm: { name: 'Tregami', native: 'Trēgāmī', lat: 35.31, lng: 70.47, // Tregam Valley, Nuristan Province, Afghanistan
},
  sw: { name: 'Swahili', native: 'Kiswahili', lat: -6.79, lng: 39.28, // Dar es Salaam
},
  // Sukuma — Bantu F21, ~5M speakers, Tanzania's largest single Bantu language by speaker count.
  // Sources: Ethnologue 27 'suk'; Glottolog suku1261; Maganga & Schadeberg (1992) Kanuri Comparative Lexicon.
  suk: { name: 'Sukuma', native: 'Kisukuma', lat: -2.52, lng: 32.90, // Mwanza
},
  // Nyamwezi — Bantu F22, sister to Sukuma in dialect continuum, ~1M speakers, Tanzania (Tabora region).
  // Sources: Ethnologue 27 'nym'; Glottolog nyam1276; Maganga & Schadeberg (1992).
  nym: { name: 'Nyamwezi', native: 'Kinyamwezi', lat: -5.07, lng: 32.83, // Tabora
},
  // Nyaturu (Kirimi) — Bantu F32, ~570K, Singida Region central Tanzania. Closest neighbours nym Nyamwezi (F22) and lag Langi.
  // Sources: Ethnologue 27 'rim'; Glottolog nyat1247; Olson (1964) The Structure of Nyaturu.
  rim: { name: 'Nyaturu', native: 'Kirimi', lat: -4.82, lng: 34.74, // Singida, Tanzania
},
  // Shambala — Bantu G23, ~660K speakers, Tanga region NE Tanzania (Usambara mountains).
  // Sources: Ethnologue 27 'ksb'; Glottolog sham1283; Roehl (1911) Wörterbuch der Schambala-Sprache.
  ksb: { name: 'Shambala', native: 'Kishambaa', lat: -4.76, lng: 38.30, // Lushoto, Usambara mts
},
  // Machame — Bantu E60 (Chaga), ~470K speakers, Mt Kilimanjaro southern slopes (Tanzania).
  // Sources: Ethnologue 27 'jmc'; Glottolog mach1266; Augustiny (1914) Kichagga grammar.
  jmc: { name: 'Machame', native: 'Kimashami', lat: -3.20, lng: 37.27, // Machame village, Kilimanjaro
},
  // Sangu — Bantu F13, ~75K speakers, Mbeya region SW Tanzania (Usangu plains).
  // Sources: Ethnologue 27 'sbp'; Glottolog sang1336; Stirnimann (1983) Praktische Grammatik der Sangu-Sprache.
  sbp: { name: 'Sangu', native: 'Eshisango', lat: -8.91, lng: 33.46, // Mbeya, Tanzania
},
  // Rwa (North Pare) — Bantu E.301 Pare cluster, ~140K speakers, Tanzania (Mwanga / Same districts, North Pare mountains).
  // Sources: Ethnologue 27 'rwk'; Glottolog rwac1239; Mreta (1998) Rwa grammar; Schadeberg/Sebonego (2010).
  rwk: { name: 'Rwa', native: 'Kirwa', lat: -3.35, lng: 36.75, // Mwanga district, Kilimanjaro Region
},
  // Asu (Pare, Chasu) — Bantu E.31 (sister to rwk Rwa within Pare cluster), ~500K, Tanzania (Kilimanjaro Region — South Pare mountains, Same District).
  // Sources: Ethnologue 27 'asu'; Glottolog pare1247; Mreta (1998) Asu phonology and grammar.
  asu: { name: 'Asu', native: 'Chasu', lat: -4.07, lng: 37.74, // Same, Kilimanjaro Region, Tanzania
},
  tl: { name: 'Tagalog', native: 'Tagalog', lat: 14.60, lng: 120.98, // Manila
},
  // Central Cagayan Agta — Austronesian (Malayo-Polynesian, Northern Philippine — Negrito-associated speech of Cagayan/Isabela hunter-gatherer communities; one of the small Northern Luzon Agta languages), ~600 (UNESCO: severely endangered), Philippines (Northern Luzon — Cagayan Valley, Isabela Province, Sierra Madre foothills).
  // Sources: Ethnologue 27 'agt'; Glottolog cent2079; Mayfield (1972) Central Cagayan Agta texts (SIL); Reid (2013) Negrito linguistic prehistory.
  agt: { name: 'Central Cagayan Agta', native: 'Agta', lat: 17.70, lng: 121.72, // Cagayan Valley, Isabela Province, Northern Luzon
},
  mn: { name: 'Mongolian', native: 'Монгол', lat: 47.91, lng: 106.91, // Ulaanbaatar
},
  // === Russian Far East / Siberia ===
  // Siberian Turkic
  sah: { name: 'Sakha', native: 'Саха тыла', lat: 62.03, lng: 129.73, // Yakutsk
},
  tyv: { name: 'Tuvan', native: 'Тыва дыл', lat: 51.72, lng: 94.43, // Kyzyl
},
  kjh: { name: 'Khakas', native: 'Хакас тілі', lat: 53.72, lng: 91.44, // Abakan
},
  alt: { name: 'Altai', native: 'Алтай тил', lat: 51.96, lng: 85.96, // Gorno-Altaysk
},
  // Oghur Turkic — sole surviving branch (Audit Task 141)
  cv: { name: 'Chuvash', native: 'Чӑваш чӗлхи', lat: 56.13, lng: 47.25, // Cheboksary
},
  // Siberian Mongolic
  bxr: { name: 'Buryat', native: 'Буряад хэлэн', lat: 51.83, lng: 107.61, // Ulan-Ude
},
  // Mongghul (Mangghuer/Tu) — Mongolic Shirongol, ~150K speakers, Qinghai/Gansu China.
  // Sources: Ethnologue 27 'mvf'; Glottolog mongh1252 / mong1330; Slater (2003) Mangghuer Reference Grammar.
  mvf: { name: 'Mongghul', native: 'Mongghul', lat: 36.83, lng: 102.40, // Huzhu Tu Autonomous County, Qinghai
},
  // Tungusic
  evn: { name: 'Evenki', native: 'Эвэды̄ турэ̄н', lat: 64.27, lng: 100.22, // Tura, Evenkia
},
  eve: { name: 'Even', native: 'Эвэды торэн', lat: 59.57, lng: 150.80, // Magadan
},
  // Nanai (Hezhen in China) — Tungusic Southern, ~1500 speakers, lower Amur River. Sister to Manchu.
  // Sources: Ethnologue 27 'gld'; Glottolog nana1257; Avrorin (1959) Grammar of Nanai.
  gld: { name: 'Nanai', native: 'Нанай', lat: 50.55, lng: 137.0, // Naikhin/Khabarovsk Krai
},
  // Udege (Удэгейцы) — Tungusic Northern (Udege-Oroch subgroup, sister to Oroch and Negidal), ~100, Russia (Primorsky/Khabarovsk Krai). Severely endangered; tiger-and-taiga hunters.
  // Sources: Ethnologue 27 'ude'; Glottolog udih1248; Schneider (1936) Udege grammar; Nikolaeva & Tolskaya (2001).
  ude: { name: 'Udege', native: 'удиэ кэйэвэни', lat: 45.95, lng: 137.04, // Krasnyy Yar (Bikin valley, Primorye — main Udege village)
},
  // Uralic Siberian (Samoyedic + Ob-Ugric)
  yrk: { name: 'Nenets', native: 'Ненэцяˮ вада', lat: 67.64, lng: 53.01, // Naryan-Mar
},
  // Forest Enets — Uralic Samoyedic Northern (sister to Tundra Enets enh and Tundra Nenets yrk within the Northern Samoyedic branch; the Forest Enets community lives in the taiga forest zone south of the Tundra Enets), ~30 fluent (critically endangered — UNESCO critically endangered; on the verge of extinction with only elderly speakers remaining), Russia (Krasnoyarsk Krai — Taymyr Dolgan-Nenets District; Potapovo and Vorontsovo settlements on the lower Yenisei River).
  // Sources: Ethnologue 27 'enf'; Glottolog fore1281; Sorokina (1995) Forest Enets Reference Grammar.
  enf: { name: 'Forest Enets', native: 'Бай тоны', lat: 68.71, lng: 86.17, // Potapovo, Taymyr Dolgan-Nenets District, Krasnoyarsk Krai
},
  // Nganasan — Samoyedic, ~125 speakers, Taymyr Peninsula. Northernmost Eurasian language.
  // Sources: Ethnologue 27 'nio'; Glottolog ngan1291; Helimski (1998) Nganasan grammar.
  nio: { name: 'Nganasan', native: 'Ӈаасан', lat: 71.97, lng: 102.50, // Volochanka, Taymyr
},
  // Selkup — Uralic (Samoyedic, Southern), ~1K, Russia (Tomsk/Krasnoyarsk Krai/Yamalo-Nenets — Taz/Yenisei river basins).
  // Sources: Ethnologue 27 'sel'; Glottolog selk1253; Helimski (1998) Selkup; Kazakevich (2002) Selkup descriptive sketch.
  sel: { name: 'Selkup', native: 'Шöльӄумыт әты', lat: 65.40, lng: 80.50, // Krasnoselkup (Yamalo-Nenets, Taz River — northern Selkup)
},
  kca: { name: 'Khanty', native: 'Ханты ясаӈ', lat: 61.00, lng: 69.00, // Khanty-Mansiysk
},
  // Chukotko-Kamchatkan
  ckt: { name: 'Chukchi', native: 'Ԓыгъоравэтԓьэн йиԓыйиԓ', lat: 64.73, lng: 177.49, // Anadyr
},
  // Koryak (Корякский) — Chukotko-Kamchatkan (Northern, sister to Chukchi ckt + Kerek), ~1.5K, Russia (Kamchatka — Tigilsky and Karaginsky Districts).
  // Sources: Ethnologue 27 'kpy'; Glottolog kory1246; Bogoras (1922) Koryak; Zhukova (1972) Koryak grammar.
  kpy: { name: 'Koryak', native: 'Чавчывэн йиԓыйиԓ', lat: 60.40, lng: 166.65, // Tigil, Kamchatka Krai
},
  // Audit Task 142 (Tier 2 optional): Itelmen — sister branch of Chukchi
  // within Chukotko-Kamchatkan, ~80 fluent speakers (UNESCO: critically
  // endangered). Western Itelmen standard (Sedanka). Cells with confident
  // sourcing only (Volodin & Khaloimova 2001 dictionary); rest unattested.
  itl: { name: 'Itelmen', native: 'Итэнмэн', lat: 56.25, lng: 156.83, // Tigil, Kamchatka
},
  // Audit Task 142 (Tier 2 optional): Tundra Yukaghir — Yukaghir family
  // (or possibly Yukaghir-Uralic, contested), ~370 speakers, Sakha Republic
  // (Lower Kolyma). Most confident-sourced cells from Maslova (2003) "A
  // Grammar of Kolyma Yukaghir" + community Yukaghir-Russian materials.
  ykg: { name: 'Tundra Yukaghir', native: 'Wadul aruu', lat: 68.74, lng: 161.30, // Andryushkino
},
  // Kolyma Yukaghir (Forest / Upper Kolyma Yukaghir) — Yukaghir family (sister to Tundra Yukaghir ykg), ~30-50, Russia (Sakha Republic — Upper Kolyma River). Severely endangered.
  // Sources: Ethnologue 27 'yux'; Glottolog koly1245; Maslova (2003) A Grammar of Kolyma Yukaghir.
  yux: { name: 'Kolyma Yukaghir', native: 'Odul aruu', lat: 65.74, lng: 152.33, // Nelemnoye, Verkhnekolymsky District, Sakha
},
  // Language isolate
  niv: { name: 'Nivkh', native: 'Нивхгу диф', lat: 51.83, lng: 143.16, // Nogliki, Sakhalin
},
  // Yeniseian (last surviving)
  ket: { name: 'Ket', native: 'Остыган ка', lat: 62.55, lng: 86.97, // Kellog (Ket cultural center)
},
  // Audit Task 146: Burmese tone notation normalized per Cambridge JIPA
  // (Watkins 2001) and Wiktionary Burmese IPA conventions. 4-tone system:
  // low (̀), high (́), creaky (̰), checked (final ʔ). Plain/toneless rows
  // (water/fire/sun/moon/eat/mother/father) now have tone marks added.
  my: { name: 'Burmese', native: 'မြန်မာ', lat: 16.87, lng: 96.20, // Yangon

    // Audit Task 173: per-cell wordEvidence for source-checked Burmese row.
    // Sources: Watkins (2001) "Burmese" JIPA 31(2) for the 4-tone system;
    // Myanmar Language Commission Dictionary (မြန်မာအဘိဓာန်, 1991, မြန်မာစာ
    // အဖွဲ့) for orthographic citation; Wiktionary Burmese IPA conventions
    // for tone notation. Tones: low ̀ / high ́ / creaky ̰ / checked ʔ-final
    // (entering tone). Standard Yangon (Rangoon) prestige variety.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'MLC Dictionary (1991) — ရေ jè "water"; low tone /è/' },
      fire:   { evidence: 'direct', source: 'MLC Dictionary (1991) — မီး mí "fire"; high tone marked by visible diacritic း (ဝစ္စပေါက်)' },
      sun:    { evidence: 'direct', source: 'MLC Dictionary (1991) — နေ nè "sun"; low tone; homophonous with နေ "to live/stay" — context disambiguates', note: 'Burmese has lexical homophony between နေ "sun" and နေ "to dwell"; both are well-established and the dictionary treats them as separate entries' },
      moon:   { evidence: 'direct', source: 'MLC Dictionary (1991) — လ la̰ "moon"; creaky tone marked by underdot diacritic ့ (ောက်မြစ်)' },
      mother: { evidence: 'direct', source: 'MLC Dictionary (1991) — အမေ ʔəmè "mother"; ə- prefix (အ-) is a nominal prefix attached to kinship terms', formType: 'compound', note: 'အ- prefix per Watkins 2001 §3.1 nominal-prefix derivation' },
      father: { evidence: 'direct', source: 'MLC Dictionary (1991) — အဖေ ʔəpʰé "father"; parallel to အမေ with ə- prefix', formType: 'compound' },
      eat:    { evidence: 'direct', source: 'MLC Dictionary (1991) — စား sá "to eat"; high tone bare verb stem (Burmese verb citation form is the bare stem, no infinitive marker)' },
      drink:  { evidence: 'direct', source: 'MLC Dictionary (1991) — သောက် θauʔ "to drink"; checked/entering tone (final ʔ from historical *-k)' },
      love:   { evidence: 'direct', source: 'MLC Dictionary (1991) — အချစ် ʔətɕʰiʔ "love" (n.); ə- nominal prefix on verb stem ချစ် "to love"', formType: 'compound', note: 'noun derived from verb ချစ် "to love" via ə- nominalization — Watkins 2001 §3.1' },
      heart:  { evidence: 'direct', source: 'MLC Dictionary (1991) — နှလုံး n̥əlóuɴ "heart" (anatomical and emotional); aspirated /n̥/ < နှ + ə + lóuɴ', formType: 'compound', note: 'covers both anatomical and emotional senses per WORD_LIST.definition.heart default' },
      tree:   { evidence: 'direct', source: 'MLC Dictionary (1991) — သစ်ပင် θiʔpìɴ "tree"; compound သစ် "wood" + ပင် "plant/stem"', formType: 'compound' },
      house:  { evidence: 'direct', source: 'MLC Dictionary (1991) — အိမ် ʔèiɴ "house"; nasalized monosyllable with low tone' },
      dog:    { evidence: 'direct', source: 'MLC Dictionary (1991) — ခွေး kʰwé "dog"; high tone' },
      cat:    { evidence: 'direct', source: 'MLC Dictionary (1991) — ကြောင် tɕàuɴ "cat"; nasalized rhyme; low tone' },
      hand:   { evidence: 'direct', source: 'MLC Dictionary (1991) — လက် lɛʔ "hand"; checked/entering tone' },
      eye:    { evidence: 'direct', source: 'MLC Dictionary (1991) — မျက်စိ mjɛʔ sḭ "eye"; compound မျက် "eye" + စိ (specifier; creaky)', formType: 'compound', note: 'Burmese typically uses two-syllable compound for "eye"; bare မျက် mjɛʔ is morphemic' },
      hello:  { evidence: 'direct', source: 'MLC Dictionary (1991) — မင်္ဂလာပါ mìɴɡəlà bà "blessed greetings"; from Pali maṅgala "auspicious" + polite particle ပါ', formType: 'greeting-formula', note: 'Pali borrowing — modern formal greeting; informal contexts use နေကောင်းလား "are you well"' },
      thanks: { evidence: 'direct', source: 'MLC Dictionary (1991) — ကျေးဇူးတင်ပါတယ် tɕézú tìɴ bà dɛ̀ "thanks be (placed) [polite-final]"; ကျေးဇူး < Pali kuśala "merit"', formType: 'thanks-formula', note: 'lit. "(your) kindness is placed (on me)"; full polite form with ပါ politeness particle and တယ် sentence-final' },
      one:    { evidence: 'direct', source: 'MLC Dictionary (1991) — တစ် tɪʔ "one"; checked tone; preceding numeral classifier in counting contexts' },
      good:   { evidence: 'direct', source: 'MLC Dictionary (1991) — ကောင်း káuɴ "good"; high tone; verb-adjective predicate (Burmese has no clear adjective class)' },
    } },
  // Audit Task 146: Khmer IPA rebuilt per Wiktionary Khmer IPA
  // conventions. Replaced romanization-style forms (preah/mae/snaehaː/
  // beh/pteah) with IPA. Phnom Penh standard.
  km: { name: 'Khmer', native: 'ខ្មែរ', lat: 11.56, lng: 104.92, // Phnom Penh

    // Audit Task 173: per-cell wordEvidence for source-checked Khmer row.
    // Sources: Royal Academy of Cambodia វចនានុក្រមខ្មែរ (Chuon Nath Khmer
    // Dictionary, 5th ed. 1967, reprinted 2007) for orthographic citation;
    // Headley et al. (1977) Cambodian-English Dictionary for IPA equivalents;
    // Wiktionary Khmer IPA conventions; Huffman (1970) Cambodian System of
    // Writing for register/voice quality. Phnom Penh standard. Khmer is
    // non-tonal but has a register/voice-quality distinction (1st vs 2nd
    // register vowels) inherited from historical voicing contrasts.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Chuon Nath Dictionary — ទឹក tɨk "water"; 1st-register monosyllable' },
      fire:   { evidence: 'direct', source: 'Chuon Nath Dictionary — ភ្លើង pʰlɤːŋ "fire"; aspirated cluster pʰl- (orthographic ភ្ល-)' },
      sun:    { evidence: 'direct', source: 'Chuon Nath Dictionary — ព្រះអាទិត្យ prĕəh ʔaːtɨt "the sun"; ព្រះ "sacred" + Sanskrit ādityaḥ "sun"', formType: 'compound', note: 'literary/elevated form using ព្រះ honorific prefix; informal ថ្ងៃ tʰŋaj "day/sun" also widely used' },
      moon:   { evidence: 'direct', source: 'Chuon Nath Dictionary — ព្រះចន្ទ prĕəh cɑn "the moon"; ព្រះ "sacred" + Sanskrit candraḥ "moon"', formType: 'compound', note: 'parallel to sun: literary form with ព្រះ honorific; informal លោកខែ lokə kʰae also used' },
      mother: { evidence: 'direct', source: 'Chuon Nath Dictionary — ម៉ែ mæː "mama/mother" (informal-affectionate); literary ម្ដាយ mdaːj omitted', note: 'colloquial Phnom Penh form; ម្ដាយ mdaːj is the literary equivalent' },
      father: { evidence: 'direct', source: 'Chuon Nath Dictionary — ប៉ា paː "papa/father" (informal-affectionate); literary ឪពុក ʔəw puk omitted', note: 'colloquial Phnom Penh form, parallel to ម៉ែ; ឪពុក is literary' },
      eat:    { evidence: 'direct', source: 'Chuon Nath Dictionary — ញ៉ាំ ɲam "to eat" (informal/everyday); polite ពិសា pisaː and royal ស្រវ៉ឹង srawəŋ omitted per CONTRIBUTING C3 register policy' },
      drink:  { evidence: 'direct', source: 'Chuon Nath Dictionary — ផឹក pʰək "to drink"; aspirated initial pʰ- (orthographic ផ-)' },
      love:   { evidence: 'direct', source: 'Chuon Nath Dictionary — ស្នេហា sneːhaː "love, affection"; from Sanskrit sneha "oil/love"', note: 'Sanskrit borrowing; native verb ស្រឡាញ់ sralaɲ "to love" also common' },
      heart:  { evidence: 'direct', source: 'Chuon Nath Dictionary — បេះដូង bɛh doːŋ "heart"; compound បេះ "heart" + ដូង (specifier)', formType: 'compound', note: 'covers anatomical sense per WORD_LIST.definition.heart; emotional "heart" often expressed via ចិត្ត cɨt "mind"' },
      tree:   { evidence: 'direct', source: 'Chuon Nath Dictionary — ដើមឈើ daəm cʰɤː "tree"; compound ដើម "trunk/origin" + ឈើ "wood"', formType: 'compound', note: 'standard compound; ឈើ alone means "wood/timber", ដើម alone means "trunk/stem"' },
      house:  { evidence: 'direct', source: 'Chuon Nath Dictionary — ផ្ទះ pdɛəh "house"; aspirated cluster pt- with diphthong rhyme' },
      dog:    { evidence: 'direct', source: 'Chuon Nath Dictionary — ឆ្កែ cʰkæː "dog"; aspirated cluster cʰk-' },
      cat:    { evidence: 'direct', source: 'Chuon Nath Dictionary — ឆ្មា cʰmaː "cat"; aspirated cluster cʰm-' },
      hand:   { evidence: 'direct', source: 'Chuon Nath Dictionary — ដៃ daj "hand"; 1st-register monosyllable' },
      eye:    { evidence: 'direct', source: 'Chuon Nath Dictionary — ភ្នែក pnɛːk "eye"; aspirated cluster pn-' },
      hello:  { evidence: 'direct', source: 'Chuon Nath Dictionary — សួស្តី suəsdəj "hello, greetings"; from Pali sotthi "well-being", cognate Sanskrit svasti', formType: 'greeting-formula', note: 'Pali/Sanskrit borrowing; modern context-neutral greeting' },
      thanks: { evidence: 'direct', source: 'Chuon Nath Dictionary — អរគុណ ʔɔːkun "thanks"; compound អរ "joy" + គុណ Sanskrit guṇa "merit/quality"', formType: 'thanks-formula', note: 'lit. "joyful for (your) merit"; standard everyday thanks expression' },
      one:    { evidence: 'direct', source: 'Chuon Nath Dictionary — មួយ muəj "one"; diphthong rhyme uə' },
      good:   { evidence: 'direct', source: 'Chuon Nath Dictionary — ល្អ lʔɑː "good"; cluster lʔ- with 2nd-register vowel /ɑː/', note: 'Khmer verb-adjective; same form predicates and modifies' },
    } },
  // Audit Task 146: Lao tones added per Wiktionary Vientiane standard (6-tone
  // system, Chao tone letters consistent with the Thai row above).
  lo: { name: 'Lao', native: 'ລາວ', lat: 17.97, lng: 102.63, // Vientiane

    // Audit Task 173: per-cell wordEvidence for source-checked Lao row.
    // Sources: Enfield (2007) "A Grammar of Lao" (Mouton de Gruyter) for
    // tone system and segment values; Reinhorn (1970) Dictionnaire
    // laotien-français for orthographic citation; Wiktionary Lao IPA
    // conventions for the Vientiane 6-tone system (Chao notation).
    // Vientiane standard. Lao tone system: T1 mid ˧ / T2 high-falling ˥˩ /
    // T3 low ˩ / T4 high ˥ / T5 rising ˩˧ / T6 low-rising ˨˩˧.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Reinhorn (1970) — ນ້ຳ naːm "water"; high-falling tone (T2) marked by ້' },
      fire:   { evidence: 'direct', source: 'Reinhorn (1970) — ໄຟ faj "fire"; rising tone (T5)' },
      sun:    { evidence: 'direct', source: 'Reinhorn (1970) — ຕາເວັນ taːwen "sun"; compound ຕາ "eye" + ເວັນ "day" — eye-of-day metaphor common in Tai-Kadai', formType: 'compound', note: 'tā-wēn ("eye-of-day") metaphor; cognate Thai ตะวัน tà-wan' },
      moon:   { evidence: 'direct', source: 'Reinhorn (1970) — ດວງເດືອນ duaŋ-dɯːan "the moon"; classifier ດວງ "round-object" + ເດືອນ "month/moon"', formType: 'compound', note: 'classifier-prefixed form; bare ເດືອນ also means "month" — disambiguated by ດວງ classifier' },
      mother: { evidence: 'direct', source: 'Reinhorn (1970) — ແມ່ mɛː "mother"; low tone (T3) marked by ່; cognate Thai แม่' },
      father: { evidence: 'direct', source: 'Reinhorn (1970) — ພໍ່ pʰɔː "father"; aspirated pʰ- + low tone (T3); cognate Thai พ่อ' },
      eat:    { evidence: 'direct', source: 'Reinhorn (1970) — ກິນ kin "to eat"; rising tone (T5); cognate Thai กิน', note: 'Lao verb citation form is the bare stem (no infinitive marker)' },
      drink:  { evidence: 'direct', source: 'Reinhorn (1970) — ດື່ມ dɯːm "to drink"; low tone (T3); cognate Thai ดื่ม' },
      love:   { evidence: 'direct', source: 'Reinhorn (1970) — ຮັກ hak "to love"; high tone (T4); cognate Thai รัก' },
      heart:  { evidence: 'direct', source: 'Reinhorn (1970) — ໃຈ t͡ɕaj "heart, mind"; rising tone (T5); covers emotional/cognitive sense', note: 'matches WORD_LIST.definition.heart emotional default; anatomical heart is ຫົວໃຈ huə-t͡ɕaj' },
      tree:   { evidence: 'direct', source: 'Reinhorn (1970) — ຕົ້ນໄມ້ ton-maj "tree"; compound ຕົ້ນ "stem/classifier" + ໄມ້ "wood"', formType: 'compound' },
      house:  { evidence: 'direct', source: 'Reinhorn (1970) — ເຮືອນ hɯːan "house"; high tone (T4); cognate Thai เรือน (literary; everyday Thai is บ้าน)' },
      dog:    { evidence: 'direct', source: 'Reinhorn (1970) — ໝາ maː "dog"; rising tone (T5); ໝ digraph for high-class /m/' },
      cat:    { evidence: 'direct', source: 'Reinhorn (1970) — ແມວ mɛːw "cat"; high tone (T4)' },
      hand:   { evidence: 'direct', source: 'Reinhorn (1970) — ມື mɯː "hand"; high tone (T4); cognate Thai มือ', note: 'Tai languages systematically conflate "hand" and "arm" — ມື covers both per WORD_LIST.definition.hand convention for Tai' },
      eye:    { evidence: 'direct', source: 'Reinhorn (1970) — ຕາ taː "eye"; rising tone (T5); homophonous with ຕາ "maternal grandfather" — distinguished by context' },
      hello:  { evidence: 'direct', source: 'Reinhorn (1970) — ສະບາຍດີ sabaːjdiː "hello, well-being"; lit. "comfortably good"; from Pali sabba "all" + Lao native ດີ', formType: 'greeting-formula', note: 'parallel to Thai สวัสดี (Sanskrit-derived); Lao chose this Pali-derived alternative' },
      thanks: { evidence: 'direct', source: 'Reinhorn (1970) — ຂອບໃຈ kʰɔːpt͡ɕaj "thanks"; lit. "edge-of-heart" — gratitude metaphor', formType: 'thanks-formula', note: 'compound ຂອບ "edge/border" + ໃຈ "heart"; native Tai expression (not Indic-derived); cognate Thai ขอบใจ' },
      one:    { evidence: 'direct', source: 'Reinhorn (1970) — ໜຶ່ງ nɯŋ "one"; low tone (T3); ໜ digraph for high-class /n/' },
      good:   { evidence: 'direct', source: 'Reinhorn (1970) — ດີ diː "good"; rising tone (T5); cognate Thai ดี' },
    } },
  // Thai Song (Lao Song, Song Dam) — Tai-Kadai (Southwestern Tai, Black Tai diaspora; sister to bj_blk Black Tai of Vietnam), ~32K, Thailand (central + western — Petchaburi, Suphanburi, Nakhon Pathom).
  // Sources: Ethnologue 27 'soa'; Glottolog thai1267; Hartmann (1986) Sons of Soung; Theraphan (2007) Tai dialect study.
  soa: { name: 'Thai Song', native: 'ภาษาไทยซง / Tai Sǒng', lat: 13.85, lng: 100.13, // Nakhon Pathom (Thai Song heartland in Thailand)
},
  // === African ===
  yo: { name: 'Yoruba', native: 'Yorùbá', lat: 7.39, lng: 3.93, // Ibadan (Yoruba historical/cultural center)
    wordEvidence: {
      n99: { evidence: 'inferred',
             source: "Wikipedia, 'Yoruba numerals' — states the rule (\"units in 5-9 are created by subtracting from the next decade\") and tabulates both the base, 100 = ọgọ́rùn-ún (20x5), and the exact template one decade down, 19 = ọ̀kàndínlógún (20-1)",
             note: "not attested whole anywhere reachable: this is the documented productive rule applied to the documented base, ọ̀kàn 'one' + dín 'subtract' + l- + ọ́gọ́rùn-ún '100'. Replace if a directly attested form turns up. Yoruba subtracts throughout — even its 90 is àádọ́rùn-ún, 20x5-10" }
    } },
  zu: { name: 'Zulu', native: 'isiZulu', lat: -29.86, lng: 31.02, // Durban
    wordEvidence: {
      n99: { evidence: 'inferred',
             source: "Wiktionary Zulu lemmas isishiyagalolunye 'nine' (literally 'leave one'), isishiyagalombili 'eight' ('leave two') and ishumi 'ten' — each confirmed separately",
             note: "the whole numeral is not attested anywhere reachable; this is the regular Bantu composition, amashumi 'tens' with class concord plus the unit. The concord is generated here, which is why it is marked inferred rather than treated as juxtaposition. Kept because Zulu is the only row on the map that builds the UNIT by subtraction — nine is 'leave one', on top of isithupha 'six', literally 'thumb'" }
    },
},
  am: { name: 'Amharic', native: 'አማርኛ', lat: 9.02, lng: 38.75, // Addis Ababa
},
  // Aari (Aramado) — Afro-Asiatic Omotic Aroid (sister to Hamer-Banna and Dime within the Aroid sub-branch; Omotic is the most divergent branch of Afro-Asiatic, with debate over whether it should even be classified within Afro-Asiatic), ~150K, Ethiopia (Southern Nations, Nationalities, and Peoples Region — South Omo Zone, Aari woreda; Bako, Sako, Wubahamer kebeles).
  // Sources: Ethnologue 27 'aiw'; Glottolog aari1239; Hayward (1990) Notes on the Aari Language.
  aiw: { name: 'Aari', native: 'Aramado', lat: 6.05, lng: 36.77, // Bako, Aari woreda, South Omo, Ethiopia
},
  // Sebat Bet Gurage — Ethiopian Semitic, ~440K speakers, Gurage Zone Ethiopia. "Seven Houses" macrolanguage.
  // Sources: Ethnologue 27 'sgw'; Glottolog seba1240; Hetzron (1972) Ethiopian Semitic.
  sgw: { name: 'Sebat Bet Gurage', native: 'ሰባት ቤት ጉራጌ', lat: 8.20, lng: 38.20, // Welkite, Gurage Zone
},
  mg: { name: 'Malagasy', native: 'Malagasy', lat: -18.91, lng: 47.52, // Antananarivo
},
  // === Others ===
  ain: { name: 'Ainu', native: 'アイヌ語', lat: 43.06, lng: 141.35, // Sapporo
},
  fi: { name: 'Finnish', native: 'Suomi', lat: 60.17, lng: 24.94, // Helsinki
},
  hu: { name: 'Hungarian', native: 'Magyar', lat: 47.50, lng: 19.04, // Budapest
},
  // Old Hungarian (Ómagyar) — Uralic Finno-Ugric Hungarian, ~9th-15th c. (Pannonian Basin). Reconstructed from Halotti beszéd (1192-1195) + Ómagyar Mária-siralom (~1300) + early codices.
  // Sources: Ethnologue 27 'ohu'; Glottolog oldh1241; Bárczi (1958) Magyar hangtörténet; Benkő (1980).
  ohu: { name: 'Old Hungarian', native: 'Ómagyar', lat: 47.79, lng: 18.74, // Esztergom (medieval Hungarian royal capital — distinct from modern hu Budapest for [#14] coord cluster)
},
  el: { name: 'Greek', native: 'Ελληνικά', lat: 37.98, lng: 23.73, // Athens
},
  nl: { name: 'Dutch', native: 'Nederlands', lat: 52.37, lng: 4.90, // Amsterdam
},
  pl: { name: 'Polish', native: 'Polski', lat: 52.23, lng: 21.01, // Warsaw
},
  // Silesian — West Slavic (Lechitic), ~509K (2011 census), Poland (Upper Silesia). Officially recognized as a regional language in 2024.
  // Sources: Ethnologue 27 'szl'; Glottolog sile1253; Steuer (1934) alphabet; Tambor (2008) Mowa Górnoślązaków.
  szl: { name: 'Silesian', native: 'Ślōnskŏ gŏdka', lat: 50.27, lng: 19.04, // Katowice
},
  uk: { name: 'Ukrainian', native: 'Українська', lat: 50.45, lng: 30.52, // Kyiv
},
  sv: { name: 'Swedish', native: 'Svenska', lat: 59.33, lng: 18.07, // Stockholm
},
  no: { name: 'Norwegian', native: 'Norsk', lat: 59.91, lng: 10.75, // Oslo
},
  da: { name: 'Danish', native: 'Dansk', lat: 55.68, lng: 12.57, // Copenhagen
},
  ro: { name: 'Romanian', native: 'Română', lat: 44.43, lng: 26.10, // Bucharest
},
  ga: { name: 'Irish', native: 'Gaeilge', lat: 53.35, lng: -6.26, // Dublin
},
  eu: { name: 'Basque', native: 'Euskara', lat: 43.26, lng: -2.93, // Bilbao
},
  cy: { name: 'Welsh', native: 'Cymraeg', lat: 51.48, lng: -3.18, // Cardiff
},
  ka: { name: 'Georgian', native: 'ქართული', lat: 41.72, lng: 44.79, // Tbilisi
},
  // Laz (Lazuri) — Kartvelian Zan (sister to Mingrelian xmf within the Zan branch; closer to Mingrelian than to Georgian; together with Mingrelian forms the Zan branch of Kartvelian alongside Georgian and Svan), ~150K, Turkey (Black Sea coast — Rize, Artvin provinces, Pazar/Ardeşen/Hopa/Arhavi districts) + Georgia (Adjara — Sarpi border village; small populations).
  // Sources: Ethnologue 27 'lzz'; Glottolog lazz1240; Lacroix (2009) Description du dialecte laze d'Arhavi; Holisky (1991) Laz.
  lzz: { name: 'Laz', native: 'Lazuri', lat: 41.04, lng: 41.41, // Pazar, Rize, Turkey (Laz heartland)
},
  // Svan — Kartvelian (sister to Zan-Georgian branch), ~14-30K, Svaneti highlands of NW Georgia. Most divergent Kartvelian.
  // Sources: Ethnologue 27 'sva'; Glottolog svan1245; Tuite (1997) Svan; Schmidt (1991) Kartvelian phonology.
  sva: { name: 'Svan', native: 'ლუშნუ ნინ', lat: 43.00, lng: 42.72, // Mestia, Svaneti
},
  hy: { name: 'Armenian', native: 'Հայերեն', lat: 40.18, lng: 44.51, // Yerevan
},
  // Western Armenian (Արեւմտահայերէն Arevmdahayerēn) — Indo-European Armenian (sister to hy Eastern Armenian; the two diverged after the Armenian Genocide of 1915 displaced Western speakers from Anatolian homeland), ~1M+ in diaspora.
  // Sources: Ethnologue 27 'hyw'; Glottolog west2348; Donabédian (2018) Western Armenian grammar.
  hyw: { name: 'Western Armenian', native: 'Արեւմտահայերէն', lat: 40.99, lng: 28.96, // Istanbul (largest historical Western Armenian center)
},
  nv: { name: 'Navajo', native: 'Diné bizaad', lat: 36.17, lng: -109.51, // Window Rock

    // Audit Task 173: per-cell wordEvidence backfill for source-checked
    // Navajo (Diné bizaad) row. Sources: Young & Morgan (1987) "The Navajo
    // Language: A Grammar and Colloquial Dictionary" (UNM Press) for
    // citation forms and verb paradigms; Wilhelm (2014) Diné Bizaad
    // Bínáhooʼaah (Salina Bookshelf); Wiktionary Navajo phonology for IPA.
    // Navajo is famously polysynthetic — many "words" are full verb forms.
    // Tone marks: high ́ / low (unmarked) / falling on long vowels.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Young & Morgan (1987) — tó (n.) "water"; monosyllable with high tone' },
      fire:   { evidence: 'direct', source: 'Young & Morgan (1987) — kǫʼ (n.) "fire"; nasalized vowel /õː/ + glottal stop final', note: 'ogonek ǫ marks nasal vowel; final ʼ is glottal stop' },
      sun:    { evidence: 'direct', source: 'Young & Morgan (1987) — jóhonaaʼéí (n.) "sun"; literally "the one which carries the day around"', formType: 'compound', note: 'descriptive nominalization; literally "round-day-mover"; standard term for the sun' },
      moon:   { evidence: 'direct', source: 'Young & Morgan (1987) — tłʼéhonaaʼéí (n.) "moon"; literally "the one which carries the night around" (parallel to sun)', formType: 'compound', note: 'parallel formation to jóhonaaʼéí; tłʼé "night" replaces jó "day"' },
      mother: { evidence: 'direct', source: 'Young & Morgan (1987) — shimá "my mother"; possessed form (shi- "my" + má "mother"); kinship terms cited with possessor in Navajo', formType: 'inflected-form', note: 'Navajo kinship terms are obligatorily possessed — bare -má cannot stand alone; shi- "my" is the citation default' },
      father: { evidence: 'direct', source: 'Young & Morgan (1987) — shizhéʼé "my father"; possessed (shi- "my" + zhéʼé "father")', formType: 'inflected-form', note: 'parallel to shimá; obligatorily possessed kinship term' },
      eat:    { evidence: 'direct', source: 'Young & Morgan (1987) — yishą́ "I eat (it)"; 1st-singular imperfective of root -YĮĮ́ "eat"; verb dictionary citation', formType: 'inflected-form', note: 'Navajo verbs cited by 1st-singular imperfective per Young-Morgan convention; the abstract root is -YĮĮ́' },
      drink:  { evidence: 'direct', source: 'Young & Morgan (1987) — yishdlą́ "I drink (it)"; 1st-singular imperfective of root -DLĄ́Ą́ʼ "drink"', formType: 'inflected-form', note: 'parallel structure to yishą́ "I eat"; bare root -DLĄ́Ą́ʼ' },
      love:   { evidence: 'direct', source: 'Young & Morgan (1987) — ayóóʼánóshní "I love him/her/it greatly"; ayóó "very/greatly" + ánóshní "I think well of"', formType: 'inflected-form', note: 'lit. "I think highly of (him/her)"; canonical expression of love in Navajo' },
      heart:  { evidence: 'direct', source: 'Young & Morgan (1987) — ajéí (n.) "heart" (anatomical); from a- "indefinite possessor" + jéí "heart"', formType: 'compound', note: 'a- prefix marks indefinite possession (since body parts in Navajo require a possessor); shijéí = "my heart"' },
      tree:   { evidence: 'direct', source: 'Young & Morgan (1987) — tsin (n.) "tree, log, wood, stick"; broad-coverage term' },
      house:  { evidence: 'direct', source: 'Young & Morgan (1987) — hooghan (n.) "home, hogan (traditional dwelling)"; the eight-sided traditional Navajo home', note: 'specifically denotes the traditional Navajo dwelling; modern English "hogan" borrows this' },
      dog:    { evidence: 'direct', source: 'Young & Morgan (1987) — łééchąąʼí (n.) "dog"; lit. "the one with [matted] hair-feet" descriptive', note: 'lateral fricative ł, glottalized rhyme; descriptive nominalization' },
      cat:    { evidence: 'direct', source: 'Young & Morgan (1987) — mósí (n.) "cat"; loanword from Spanish "moza" / English "moggy" via 19th-c. contact', note: 'one of the few non-descriptive nominal loans in Navajo; introduced with the animal' },
      hand:   { evidence: 'direct', source: 'Young & Morgan (1987) — -la "hand" (bound stem); cited as la in dictionaries but always appears with possessive prefix (shíla "my hand")', formType: 'bound-stem', note: 'body-part stems in Navajo are obligatorily possessed; bare la is the dictionary citation' },
      eye:    { evidence: 'direct', source: 'Young & Morgan (1987) — -naá "eye" (bound stem); cited as naá; possessed forms shináá "my eye"', formType: 'bound-stem' },
      hello:  { evidence: 'direct', source: 'Young & Morgan (1987) — yáʼátʼééh "hello (lit. it is good)"; canonical greeting drawn from the impersonal verb "it is good"', formType: 'greeting-formula', note: 'lexical overlap with good: yáʼátʼééh literally "it is good", canonical greeting' },
      thanks: { evidence: 'direct', source: 'Young & Morgan (1987) — ahéheeʼ "thanks"; sometimes spelled ahéhéeʼ; native expression of gratitude', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: 'Young & Morgan (1987) — tʼááłáʼí "one"; tʼáá "just" + łáʼí "one (counting form)"', formType: 'compound', note: 'emphatic "just one"; bare łáʼí also used in counting paradigms' },
      good:   { evidence: 'direct', source: 'Young & Morgan (1987) — yáʼátʼééh "it is good" (impersonal verb form); same as the greeting', formType: 'inflected-form', note: 'lexical overlap with hello: yáʼátʼééh = "it is good" used as both greeting and adjective' },
    } },
  // Koyukon — Na-Dené Athabaskan (Northern), ~65 speakers, central Alaska along the Yukon-Koyukuk-Tanana rivers.
  // Sources: Ethnologue 27 'koy'; Glottolog koyu1242; Jones (2000) Koyukon Athabaskan Dictionary.
  koy: { name: 'Koyukon', native: 'Denaakkʼe', lat: 64.74, lng: -156.96, // Galena, Alaska (Yukon River)
},
  haw: { name: 'Hawaiian', native: 'ʻŌlelo Hawaiʻi', lat: 21.31, lng: -157.86, // Honolulu

    // Audit Task 200: full per-cell wordEvidence for source-checked
    // row. Sources: Pukui & Elbert (1986) Hawaiian Dictionary
    // (wehewehe.org); Elbert & Pukui (1979) Hawaiian Grammar for
    // citation-form conventions; Schütz (1994) Voices of Eden for
    // historical phonology. ʻokina /ʔ/ is a phonemic glottal stop;
    // kahakō macron marks long vowel /Vː/. Hawaiian has only
    // 8 consonants and 5 vowel qualities — minimal phonological inventory.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Pukui & Elbert — wai (n.) "water, liquid (any non-saltwater)"; cognate Proto-Polynesian *wai' },
      fire:   { evidence: 'direct', source: 'Pukui & Elbert — ahi (n.) "fire"; cognate PPn *afi (Hawaiian regular f→h sound change)' },
      sun:    { evidence: 'direct', source: 'Pukui & Elbert — lā (n.) "sun, day"; long vowel /aː/; cognate PPn *laʔaa', note: 'covers both "sun" and "day" (calendar) per WORD_LIST.definition.sun common Polynesian polysemy' },
      moon:   { evidence: 'direct', source: 'Pukui & Elbert — mahina (n.) "moon, month"; cognate PPn *masina (Hawaiian s→h)', note: 'also denotes lunar month, as commonly across Polynesian languages' },
      mother: { evidence: 'direct', source: 'Pukui & Elbert — makuahine (n.) "mother"; compound makua "parent" + hine "female"', formType: 'compound', note: 'kinship term; informal māmā also widely used in modern colloquial Hawaiian (English-influenced)' },
      father: { evidence: 'direct', source: 'Pukui & Elbert — makua kāne (n.) "father"; compound makua "parent" + kāne "male"', formType: 'compound', note: 'parallel to makuahine; informal pāpā also common in modern colloquial use' },
      eat:    { evidence: 'direct', source: 'Pukui & Elbert — ʻai (vt.) "to eat, food"; both verb and noun; ʻokina /ʔ/ initial (cognate PPn *kai with regular k→ʔ)' },
      drink:  { evidence: 'direct', source: 'Pukui & Elbert — inu (vt.) "to drink"; cognate PPn *inu', note: 'no initial ʻokina (contrast ʻai); reflects PPn vowel-initial *inu' },
      love:   { evidence: 'direct', source: 'Pukui & Elbert — aloha (n./v./interj.) "love, affection, mercy, greeting, farewell"; the central concept of Hawaiian cultural philosophy', note: 'lexical overlap with hello: aloha encompasses love, affection, greeting, and farewell (Hawaiian cultural concept)' },
      heart:  { evidence: 'direct', source: 'Pukui & Elbert — puʻuwai (n.) "heart" (anatomical and emotional); compound puʻu "hill, mound" + wai "water"', formType: 'compound', note: 'literal: "water-hill" — descriptive of the cardiac mound; both anatomical and emotional senses per WORD_LIST.definition.heart' },
      tree:   { evidence: 'direct', source: 'Pukui & Elbert — lāʻau (n.) "tree, plant, wood, timber"; compound lā "long object" + ʻau "stem"', formType: 'compound', note: 'broad term covering trees, plants, and wood — matches WORD_LIST.definition.tree default scope' },
      house:  { evidence: 'direct', source: 'Pukui & Elbert — hale (n.) "house, dwelling, building"; cognate PPn *fale' },
      dog:    { evidence: 'direct', source: 'Pukui & Elbert — ʻīlio (n.) "dog"; long ī /iː/; PPn *ʔuli or distinct local development', note: 'native Hawaiian poi dog now extinct; modern usage covers all dogs' },
      cat:    { evidence: 'direct', source: 'Pukui & Elbert — pōpoki (n.) "cat"; long ō /oː/; etymology unclear (possibly onomatopoeic from English "poor pussy" per Pukui & Elbert)', note: 'cats introduced post-contact (late 18th c.); pōpoki adopted as a uniquely Hawaiian-formed term rather than direct English borrowing' },
      hand:   { evidence: 'direct', source: 'Pukui & Elbert — lima (n.) "hand, arm, sleeve, also: five"; cognate PPn *lima (also "5", from finger-counting)', note: 'lima also means "five" — pan-Polynesian polysemy from finger-based numeration' },
      eye:    { evidence: 'direct', source: 'Pukui & Elbert — maka (n.) "eye, face, point, edge"; cognate PPn *mata (Hawaiian regular t→k)', note: 'broad term — eye, face, point, edge — sun (mata o ka lā "eye of the sun"). The "eye" sense is the WORD_LIST.definition default' },
      hello:  { evidence: 'direct', source: 'Pukui & Elbert — aloha (interj.) "greetings, love"; same lexeme as love entry', note: 'lexical overlap with love: aloha is the canonical multi-purpose greeting/love expression' },
      thanks: { evidence: 'direct', source: 'Pukui & Elbert — mahalo (n./v.) "thanks, gratitude, admiration, praise"; the standard expression of thanks', formType: 'thanks-formula', note: 'extended form mahalo nui loa "many thanks"; widely adopted into Hawaii English and tourism vocabulary' },
      one:    { evidence: 'direct', source: 'Pukui & Elbert — ʻekahi (num.) "one"; ʻe- prefix marks numerals 1-9 in counting paradigm; kahi "one, single"', formType: 'inflected-form', note: 'bare kahi also used; ʻekahi is the citation counting form per Elbert & Pukui Grammar §3.5' },
      good:   { evidence: 'direct', source: 'Pukui & Elbert — maikaʻi (adj.) "good, fine, well, beautiful"; medial ʻokina /ʔ/' },
    } },
  mi: { name: 'Māori', native: 'Te Reo Māori', lat: -36.85, lng: 174.76, // Auckland
},
  qu: { name: 'Quechua', native: 'Runasimi', lat: -13.52, lng: -71.97, // Cusco
},
  zh_db: { name: 'Chinese (Dongbei)', native: '东北话', lat: 41.80, lng: 123.43,
},
  zh_sc: { name: 'Chinese (Sichuan)', native: '四川话', lat: 30.57, lng: 104.07,
},
  cdo: { name: 'Min Dong', native: '闽东语', lat: 26.07, lng: 119.30,
},
  // Audit Task 146: Lhasa Tibetan tones added per Wiktionary (Tournadre
  // binary HIGH/LOW notation, written-initial-derived). Voiced initials
  // → ˩˧ (low); voiceless/aspirated initials → ˥ (high).
  bo: { name: 'Tibetan', native: 'བོད་སྐད', lat: 29.65, lng: 91.10,

    // Audit Task 173: per-cell wordEvidence for source-checked Tibetan
    // (Lhasa Central Tibetan) row. Sources: Tournadre & Sangda Dorje (2003)
    // "Manual of Standard Tibetan" (Snow Lion); Goldstein (2001) The New
    // Tibetan-English Dictionary of Modern Tibetan (UC Press); Wiktionary
    // Lhasa Tibetan IPA conventions. Lhasa has a binary HIGH/LOW tone
    // system derived from written initials: voiced initials → ˩˧ (low);
    // voiceless/aspirated initials → ˥ (high).
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Goldstein (2001) — ཆུ chu /t͡ɕʰu˥/ "water"; aspirated initial → high tone' },
      fire:   { evidence: 'direct', source: 'Goldstein (2001) — མེ me /me˩˧/ "fire"; voiced /m/ initial → low tone per Lhasa rules' },
      sun:    { evidence: 'direct', source: 'Goldstein (2001) — ཉི་མ nyi-ma /ɲima˩˧/ "sun, day"; nasal initial /ɲ/ → low tone', formType: 'compound', note: 'covers both "sun" and "day" — typical Tibeto-Burman polysemy; Tournadre §2.1' },
      moon:   { evidence: 'direct', source: 'Goldstein (2001) — ཟླ་བ zla-ba /tawa˩˧/ "moon, month"; ZL- prefix-cluster simplifies in modern speech', formType: 'compound', note: 'classical orthography zla-ba retained; modern pronunciation drops the prefix; covers "month" sense too' },
      mother: { evidence: 'direct', source: 'Goldstein (2001) — ཨ་མ a-ma /ama˥/ "mother"; informal/everyday; honorific is ཨ་མ་ལགས a-ma-lags', note: 'CONTRIBUTING C3: family-register form chosen; literary མ་མ ma-ma omitted' },
      father: { evidence: 'direct', source: 'Goldstein (2001) — ཨ་ཕ a-pha /apʰa˥/ "father"; informal everyday; honorific ཕ་ལགས pha-lags', note: 'parallel to ama; family-register form per CONTRIBUTING C3' },
      eat:    { evidence: 'direct', source: 'Goldstein (2001) — ཟ za /sa˩˧/ "to eat"; bare verb stem (Tibetan dictionary citation)', note: 'verb root form per Tournadre §11; honorific མཆོད mchod omitted' },
      drink:  { evidence: 'direct', source: 'Goldstein (2001) — འཐུང ʼthung /tʰuŋ˥/ "to drink"; aspirated initial → high tone; ʼ pre-radical lost in modern pronunciation', note: 'classical orthography ʼthung retained; modern pronounce as plain tʰuŋ' },
      love:   { evidence: 'direct', source: 'Goldstein (2001) — དགའ་པོ dga-po /kapo˩˧/ "loving, fond"; from verb དགའ dgaʼ "to like" + adjectivizer པོ -po', formType: 'compound', note: 'attributive form; the bare verb དགའ dgaʼ /ka/ is also used' },
      heart:  { evidence: 'direct', source: 'Goldstein (2001) — སྙིང snying /ɲiŋ˥/ "heart" (anatomical and emotional); palatal nasal /ɲ/' },
      tree:   { evidence: 'direct', source: 'Goldstein (2001) — ཤིང་སྡོང shing-sdong /ɕiŋtoŋ/ "tree"; compound ཤིང "wood/timber" + སྡོང "trunk/stem"', formType: 'compound', note: 'standard compound; bare ཤིང shing also means "wood/timber"' },
      house:  { evidence: 'direct', source: 'Goldstein (2001) — ཁང་པ khang-pa /kʰaŋpa˥/ "house"; aspirated initial → high tone' },
      dog:    { evidence: 'direct', source: 'Goldstein (2001) — ཁྱི khyi /kʰi˥/ "dog"; aspirated palatalized initial' },
      cat:    { evidence: 'direct', source: 'Goldstein (2001); Tournadre & Dorje (2003) — ཞི་མི zhi-mi /ɕimi˩˧/ "cat"; written initial ཞ /ʑ/ → modern voiceless /ɕ/ with low tone (Lhasa devoicing preserves the original low-register reflex)', note: 'parallel to ཟ za /sa˩˧/ "eat" above: historically voiced fricative initials devoice in Lhasa but retain the low tone of the voiced-series register per Tournadre §1.4' },
      hand:   { evidence: 'direct', source: 'Goldstein (2001) — ལག་པ lag-pa /lakpa˩˧/ "hand, arm"; classical ལག + nominalizer པ', formType: 'compound', note: 'covers both hand and arm; voiced initial /l/ → low tone' },
      eye:    { evidence: 'direct', source: 'Goldstein (2001) — མིག mig /mik˩˧/ "eye"; voiced /m/ initial → low tone' },
      hello:  { evidence: 'direct', source: 'Goldstein (2001) — བཀྲ་ཤིས་བདེ་ལེགས bkra-shis bde-legs /t͡ʂaɕi˥ telek˩˧/ "auspicious blessings"', formType: 'greeting-formula', note: 'literally "auspicious goodness"; pan-Tibetan greeting formula, also used in Bhutan/Ladakh' },
      thanks: { evidence: 'direct', source: 'Goldstein (2001) — ཐུགས་རྗེ་ཆེ thugs-rje che /tʰuːt͡ɕi˥ t͡ɕʰe˥/ "thanks"; lit. "great compassion"', formType: 'thanks-formula', note: 'honorific compound: ཐུགས་རྗེ "compassion (hon.)" + ཆེ "great"; standard polite thanks' },
      one:    { evidence: 'direct', source: 'Goldstein (2001) — གཅིག gcig /t͡ɕik˥/ "one"; aspirated palatal /t͡ɕ/ → high tone' },
      good:   { evidence: 'direct', source: 'Goldstein (2001) — ཡག་པོ yag-po /jakpo˩˧/ "good"; ཡག + adjectivizer པོ; voiced /j/ initial → low tone', formType: 'compound' },
    } },
  // Balti — Sino-Tibetan Bodish (Western Tibetic, Ladakhi-Balti subgroup), ~440K, Pakistan (Gilgit-Baltistan — Skardu, Ghanche) + India (Kargil district, Ladakh).
  // Sources: Ethnologue 27 'bft'; Glottolog balt1258; Read (1934) Balti Grammar; Bielmeier (1985).
  bft: { name: 'Balti', native: 'བལ་ཏི་སྐད', lat: 35.30, lng: 75.63, // Skardu, Gilgit-Baltistan
},
  // Ladakhi — Sino-Tibetan Bodish (Western Tibetic, Ladakhi-Balti subgroup — sister to bft Balti within Western Tibetic), ~110K, India (Ladakh — Leh district + lower Kargil; small Tibetan-region populations).
  // Sources: Ethnologue 27 'lbj'; Glottolog lada1255; Koshal (1979) Ladakhi Grammar; Norman (2010) Ladakhi-English Dictionary.
  lbj: { name: 'Ladakhi', native: 'ལ་དྭགས་སྐད', lat: 34.16, lng: 77.58, // Leh, Ladakh
},
  // Khams Tibetan — Sino-Tibetan Bodish, ~1.5M speakers, eastern Tibet (Kham region) + western Sichuan + NW Yunnan + SE Qinghai.
  // Sources: Ethnologue 27 'khg'; Glottolog kham1284; Suzuki (2009) Khams Tibetan dialectology.
  khg: { name: 'Khams Tibetan', native: 'ཁམས་སྐད', lat: 30.04, lng: 99.10, // Kandze (Garzê), Sichuan
},
  // Northern Qiang — Sino-Tibetan (Tibeto-Burman, Qiangic — sister to cng Central Qiang and other Qiangic varieties), ~57K, China (Sichuan — Mao County, Wenchuan, Heishui Aba Tibetan AP).
  // Sources: Ethnologue 27 'cng'/'cng'; Glottolog nort2722; LaPolla & Huang (2003) A Grammar of Qiang.
  cng: { name: 'Northern Qiang', native: 'Rrmea', lat: 31.68, lng: 103.82, // Mao County, Aba Tibetan-Qiang AP, Sichuan
},
  ii: { name: 'Yi (Nuosu)', native: 'ꆈꌠꉙ', lat: 27.90, lng: 102.26,
},
  // Azhe — Sino-Tibetan (Tibeto-Burman, Loloish, Southeastern), ~50K, China (Yunnan — Mile and Yiliang counties around Honghe Hani-Yi Autonomous Prefecture).
  // Sources: Ethnologue 27 'yiz'; Glottolog azhe1239; Wang & Yu (1994) Yi/Lolo-Burmese phonology.
  yiz: { name: 'Azhe', native: 'Azhepu', lat: 24.41, lng: 103.41, // Mile County, Honghe Prefecture, Yunnan
},
  // Hani — Sino-Tibetan (Tibeto-Burman, Loloish, Southeastern — sister to Akha ahk and Bisu within Hanoid Loloish), ~1.5M, China (Yunnan — Honghe + Pu'er prefectures) + Vietnam (Lào Cai) + Laos (Phongsaly).
  // Sources: Ethnologue 27 'hni'; Glottolog hani1247; Lewis (1989) Akha-English Dictionary (Hani context).
  hni: { name: 'Hani', native: 'Haqniqdoq', lat: 23.37, lng: 102.42, // Honghe County, Yunnan (Hani heartland)
},
  th_isan: { name: 'Thai (Isan)', native: 'ภาษาอีสาน', lat: 16.43, lng: 102.83,
},
  th_n: { name: 'Thai (Northern)', native: 'คำเมือง', lat: 18.79, lng: 98.98,
},
  th_s: { name: 'Thai (Southern)', native: 'ภาษาใต้', lat: 7.88, lng: 98.39,
},
  za: { name: 'Zhuang', native: 'Vahcuengh', lat: 23.16, lng: 108.27, // Wuming (western Guangxi Zhuang heartland)
    // scriptDisplayPolicy — Zhuang has two living orthographies:
    //   (1) Sawndip (古壮字 / 方块壮字, "immature characters"), a Chinese-character-
    //       based logographic system used by Zhuang singers, shamans, and
    //       scribes for >1000 years (Tang dynasty onward; first dictionary
    //       Sawndip Sawdenj 1989 with 4,900 entries / 10,000+ characters);
    //   (2) Sawcuengh, the 1957/1982 Latin official orthography.
    // Per Zhang Yuansheng (via Wikipedia Sawndip article), ~80% of Sawndip
    // text consists of unmodified Han characters used semantically; the
    // remaining ~20% are Zhuang-invented composite logograms (often encoded
    // in CJK Unified Ideographs Extension B/C/D/E). The script is
    // unstandardised — many morphosyllables have a dozen+ variant glyphs.
    //
    // Surface column is MIXED following the Khitan (zkt) precedent (commit
    // 80aed8c): cells with a source-confirmed Sawndip glyph (water, fire,
    // sun, moon, mother, love, house, one — 8 cells) show that glyph;
    // remaining cells show the Sawcuengh Latin form because no specific
    // Sawndip mapping was confidently sourced. The IPA slot always carries
    // the actual IPA transcription.
    scriptDisplayPolicy: {
        primary: 'modern-standard',
        secondary: 'traditional-script',
        note: {
            en: 'Surface column is mixed: 8 cells (water, fire, sun, moon, mother, love, house, one) show source-confirmed Sawndip (古壮字) glyphs per za.wikipedia.org per-word entries (Raemx, Ndwen, Vunz, Gyaez, Ranz) and Han-character direct borrowings standard in Sawndip per Zhang Yuansheng (~80% of Sawndip text is unmodified Han characters used semantically; cited in Wikipedia "Sawndip" article). Remaining 12 cells show the Sawcuengh Latin form (1957/1982 official orthography) because no specific Sawndip glyph was confidently sourced — per task constraint, no auto-generation from romanization.',
            ja: '表示形は混在: 8セル (water, fire, sun, moon, mother, love, house, one) は出典確認済みのサウンディップ (古壮字) を表示 (za.wikipedia.org 各語項目および Wikipedia "Sawndip" 記事で Zhang Yuansheng が指摘する「サウンディップ文書の約80%は意味的に流用された漢字」)。残り12セルは具体的なサウンディップ字形が未確認のため Sawcuengh ラテン正書法 (1957/1982年) を表示。ローマ字からの自動生成は行わない。',
            ko: '표시 형은 혼합: 8개 셀 (water, fire, sun, moon, mother, love, house, one)은 출처가 확인된 사운딥 (古壮字) 글리프를 표시 (za.wikipedia.org 각 단어 항목 및 Wikipedia "Sawndip" 문서에서 Zhang Yuansheng이 지적한 "사운딥 텍스트의 약 80%는 의미적으로 차용된 한자"). 나머지 12개 셀은 구체적인 사운딥 글리프 미확인으로 Sawcuengh 라틴 정자법 (1957/1982년)을 표시. 로마자 기반 자동 생성은 하지 않음.',
            zh: '表面列为混合: 8个单元格 (water, fire, sun, moon, mother, love, house, one) 显示来源已确认的古壮字 (Sawndip) 字形 (za.wikipedia.org 各词条 Raemx、Ndwen、Vunz、Gyaez、Ranz 以及 Wikipedia "Sawndip" 条目所引张元生关于 "古壮字文本约80%为语义借用未改汉字" 的论述)。其余12个单元格因未确证具体古壮字字形而显示 Sawcuengh 拉丁正字法 (1957/1982年)。不从罗马字自动生成。',
        },
    },
    // altWordForms — Sawcuengh Latin (1957/1982) for cells whose surface
    // slot now carries a Sawndip glyph, plus Sawndip variant glyphs for
    // cells where multiple regional forms are attested. Sawndip is
    // regionally unstandardised, so multiple variants per word are normal.
    // Sources: za.wikipedia.org per-word entries; Sawndip Sawdenj 1989
    // (古壮字字典); Wikipedia "Sawndip" article (which cites the 1989
    // dictionary as the only published Sawndip lexicon).


    wordEvidence: {
      water:  { evidence: 'direct',   source: 'Sawndip 淰 (phonetic + 氵 water radical) per za.wikipedia.org Raemx entry which lists it as the primary form; also cited in 2020 壮布依语书写推荐用字字表 (Recommended Sawndip List for Zhuang/Bouyei).' },
      fire:   { evidence: 'direct',   source: 'Sawndip 火 — direct Han-character semantic borrowing. Per Zhang Yuansheng (via Wikipedia "Sawndip" article), ~80% of Sawndip text consists of unmodified Han characters used semantically; 火 is the standard Sawndip form for feiz (fire).' },
      sun:    { evidence: 'direct',   source: 'Sawndip 日 — direct Han-character semantic borrowing for daengngoenz (sun/day). Per Zhang Yuansheng (via Wikipedia "Sawndip" article), Han-character semantic borrowings dominate Sawndip writing; za.wikipedia.org Daengngoenz article also uses the astronomical symbol ☉.' },
      moon:   { evidence: 'direct',   source: 'Sawndip 月 — explicitly listed in za.wikipedia.org Ndwen article as the character form for the Zhuang word for moon/month; direct Han-character semantic borrowing.' },
      mother: { evidence: 'direct',   source: 'Sawndip 𫱆 (U+2BC46, Zhuang-invented composite logogram, CJK Extension E) per za.wikipedia.org Vunz article ("𭑫𫱆" = "father-mother" compound). One of multiple regional forms for meh.' },
      father: { evidence: 'inferred', source: 'Sawcuengh Latin "boh" retained — no specific Sawndip glyph confidently sourced from za.wikipedia.org or Wikipedia "Sawndip" article. Sawndip Sawdenj 1989 likely contains an entry but not directly verified in this audit.' },
      eat:    { evidence: 'inferred', source: 'Sawcuengh Latin "gwn" retained — no specific Sawndip glyph confidently sourced. Sawndip Sawdenj 1989 likely contains an entry but not directly verified in this audit.' },
      drink:  { evidence: 'inferred', source: 'Sawcuengh Latin "gwnraemx" retained — no specific Sawndip glyph confidently sourced. As a compound (eat + water), the form is unlikely to have a single dedicated logogram.' },
      love:   { evidence: 'direct',   source: 'Sawndip 𭝚 (CJK Extension F) per za.wikipedia.org Gyaez article which lists 𭝚、𠮹、𢟋、𢠿 as Sawndip variants for gyaez; 𭝚 is the first form listed.' },
      heart:  { evidence: 'inferred', source: 'Sawcuengh Latin "sim" retained — no specific Sawndip glyph confidently sourced from za.wikipedia.org or Wikipedia "Sawndip" article. Direct Han borrowing 心 is plausible but not source-confirmed in this audit.' },
      tree:   { evidence: 'inferred', source: 'Sawcuengh Latin "faex" retained — no specific Sawndip glyph confidently sourced. Direct Han borrowing 木 is plausible but not source-confirmed.' },
      house:  { evidence: 'direct',   source: 'Sawndip 𭓨 (U+2D4E8, CJK Extension F, Zhuang-invented logogram) per za.wikipedia.org Ranz article and Wikipedia "Sawndip" article which cites it as the single most-attested Sawndip form across multiple modern Pingguo manuscript sources.' },
      dog:    { evidence: 'inferred', source: 'Sawcuengh Latin "ma" retained — no specific Sawndip glyph confidently sourced. The phonetic-borrowing candidate 馬 (Mandarin mǎ) is plausible but not source-confirmed in this audit.' },
      cat:    { evidence: 'inferred', source: 'Sawcuengh Latin "meuz" retained — no specific Sawndip glyph confidently sourced. Phonetic borrowings like 貓 are plausible but not directly verified.' },
      hand:   { evidence: 'inferred', source: 'Sawcuengh Latin "fwngz" retained — no specific Sawndip glyph confidently sourced. Direct Han borrowing 手 is plausible but not source-confirmed.' },
      eye:    { evidence: 'inferred', source: 'Sawcuengh Latin "da" retained — no specific Sawndip glyph confidently sourced. Direct Han borrowing 眼 is plausible but not source-confirmed.' },
      hello:  { evidence: 'inferred', source: 'Sawcuengh Latin "mwngz ndei" retained — this is a modern greeting formula calqued on Mandarin 你好, unlikely to have an attested Sawndip-script tradition.' },
      thanks: { evidence: 'inferred', source: 'Sawcuengh Latin "dwgrengz mwngz" retained — modern formula, no Sawndip-script tradition expected.' },
      one:    { evidence: 'direct',   source: 'Sawndip 一 — direct Han-character semantic borrowing for the numeral one (it). Per Zhang Yuansheng (via Wikipedia "Sawndip" article), Han numerals are the standard Sawndip writing for numbers; 一 corresponds to Zhuang "it" (cognate with Sinitic numeral one).' },
      good:   { evidence: 'inferred', source: 'Sawcuengh Latin "ndei" retained — no specific Sawndip glyph confidently sourced from za.wikipedia.org Ndei article (which renders content in Sawcuengh romanization only).' },
    } },
  hmn: { name: 'Hmong', native: 'Hmoob', lat: 26.65, lng: 104.25,
},
  jv: { name: 'Javanese', native: 'ꦧꦱꦗꦮ', lat: -7.25, lng: 112.75,
},
  // Caribbean Javanese — Suriname Javanese diaspora, ~60K speakers, Suriname + Netherlands.
  // Sources: Ethnologue 27 'jvn'; Glottolog cari1280; Vruggink (1990) Caribbean Javanese.
  jvn: { name: 'Caribbean Javanese', native: 'Bahasa Jawa Suriname', lat: 5.85, lng: -55.20, // Paramaribo, Suriname
},
  su: { name: 'Sundanese', native: 'ᮘᮞ ᮞᮥᮔ᮪ᮓ', lat: -6.91, lng: 107.61,
},
  ceb: { name: 'Cebuano', native: 'Sinugbuanon', lat: 10.31, lng: 123.89,
},
  ilo: { name: 'Ilocano', native: 'Ilokano', lat: 16.62, lng: 120.32,
},
  fj: { name: 'Fijian', native: 'Na vosa vakaviti', lat: -18.14, lng: 178.44,
},
  // Rotuman — Polynesian outlier with strong Melanesian/Western Polynesian admixture, Rotuma Island (Fiji).
  // Sources: Ethnologue 27 'rtm'; Glottolog rotu1241; Churchward (1940) Rotuman Grammar.
  rtm: { name: 'Rotuman', native: 'Fäeag Rotuạm', lat: -12.50, lng: 177.07, // Rotuma Island, Fiji
},
  sm: { name: 'Samoan', native: 'Gagana Sāmoa', lat: -13.83, lng: -171.76,
},
  // Tahitian: existing `ty` (ISO 639-1) covers this; `tah` (ISO 639-3) was
  // a duplicate added in error and removed per Audit Task 149 verification.
  to: { name: 'Tongan', native: 'Lea faka-Tonga', lat: -21.21, lng: -175.15,
},
  pau: { name: 'Palauan', native: 'A tekoi er a Belau', lat: 7.50, lng: 134.62,
},

  sd: { name: 'Sindhi', native: 'سنڌي', lat: 25.40, lng: 68.37,
},
  pa: { name: 'Punjabi', native: 'ਪੰਜਾਬੀ', lat: 30.90, lng: 75.85,
},
  // Western Punjabi (Lahnda) — Indo-European Indo-Aryan Northwestern (sister to Eastern Punjabi pa within the broader Punjabi macrolanguage; the official ISO macrolanguage code 'pnb' refers to the Pakistani Punjabi variety, while 'pa' is the Indian variety written in Gurmukhi; ISO 639-3 separates them due to script and dialect differences), ~64M (one of the largest languages in the world that is rarely covered in international media), Pakistan (Punjab province — Lahore, Faisalabad, Multan, Rawalpindi; the dominant native language of Pakistan with ~38% of the population) + small populations in India and the Pakistani diaspora.
  // Sources: Ethnologue 27 'pnb'; Glottolog west2386; Bhatia (1993) Punjabi; Shackle (1972) Lahnda and Lahndi.
  pnb: { name: 'Western Punjabi', native: 'پنجابی', lat: 31.55, lng: 74.34, // Lahore, Punjab, Pakistan
},
  ne: { name: 'Nepali', native: 'नेपाली', lat: 27.72, lng: 85.32,
},
  // Dotyali — Indo-Aryan, ~800K speakers, far-western Nepal. Recognized as separate language since 2018.
  // Sources: Ethnologue 27 'dty'; Glottolog doty1234; Eppele (2004) Far-Western Nepal sociolinguistic survey.
  dty: { name: 'Dotyali', native: 'डोटेली', lat: 29.27, lng: 80.59, // Dadeldhura, Far-Western Nepal
},
  // Kullui — Indo-European Indo-Aryan (Northern, Western Pahari, Kullu Valley dialect), ~196K, India (Himachal Pradesh — Kullu District, Beas River valley).
  // Sources: Ethnologue 27 'kfx'; Glottolog kull1236; Sharma (1980) Kullui Phonology.
  kfx: { name: 'Kullui', native: 'कुल्लूई', lat: 31.96, lng: 77.11, // Kullu, Himachal Pradesh
},
  mr: { name: 'Marathi', native: 'मराठी', lat: 19.08, lng: 72.88,
},
  // Lambadi (Banjari, Gor Boli) — Indo-European Indo-Aryan (Northwestern, Rajasthani group; classified Romani-related by some), ~3.6M, India (Andhra Pradesh, Karnataka, Telangana, Maharashtra — diaspora of nomadic Banjara traders).
  // Sources: Ethnologue 27 'lmn'; Glottolog lamb1271; Trail (1968) Lamani Phonology and Grammar.
  lmn: { name: 'Lambadi', native: 'गोर बोली', lat: 17.39, lng: 78.49, // Hyderabad / Telangana (Banjara cultural anchor)
},
  gu: { name: 'Gujarati', native: 'ગુજરાતી', lat: 23.02, lng: 72.57,
},
  si: { name: 'Sinhala', native: 'සිංහල', lat: 6.93, lng: 79.85,
},
  // Dhivehi/Maldivian — island Indo-Aryan, Thaana script (RTL); distinct
  // island-state development from Sinhala. Audit Task 141.
  dv: { name: 'Dhivehi', native: 'ދިވެހިބަސް', lat: 4.18, lng: 73.51, // Malé
},
  te: { name: 'Telugu', native: 'తెలుగు', lat: 17.39, lng: 78.49,
},
  kn: { name: 'Kannada', native: 'ಕನ್ನಡ', lat: 12.97, lng: 77.59,
},
  ml: { name: 'Malayalam', native: 'മലയാളം', lat: 8.52, lng: 76.94,
},
  tg: { name: 'Tajik', native: 'Тоҷикӣ', lat: 38.56, lng: 68.77,
},
  ku: { name: 'Kurdish', native: 'Kurmancî', lat: 37.22, lng: 43.00,
},
  ckb: { name: 'Kurdish (Sorani)', native: 'سۆرانی', lat: 36.19, lng: 44.01,
},
  // Southern Kurdish (Kermashani / Pehlewani / Kelhori / Lekî) — Iranian (Northwest), ~3M, western Iran (Kermanshah, Ilam) + Iraqi border.
  // Sources: Ethnologue 27 'sdh'; Glottolog sout2664; Fattah (2000) Les Dialectes Kurdes Méridionaux.
  sdh: { name: 'Southern Kurdish', native: 'کوردیی خوارین', lat: 34.31, lng: 47.07, // Kermanshah
},
  ps: { name: 'Pashto', native: 'پښتو', lat: 34.52, lng: 69.17,
},
  az: { name: 'Azerbaijani', native: 'Azərbaycanca', lat: 40.41, lng: 49.87,
},
  azb: { name: 'South Azerbaijani', native: 'تۆرکجه', lat: 38.08, lng: 46.30, // Tabriz
},
  gag: { name: 'Gagauz', native: 'Gagauz dili', lat: 46.30, lng: 28.66, // Comrat
},
  ug: { name: 'Uyghur', native: 'ئۇيغۇرچە', lat: 43.83, lng: 87.58,
},
  kk: { name: 'Kazakh', native: 'Қазақша', lat: 51.17, lng: 71.43,
},
  ky: { name: 'Kyrgyz', native: 'Кыргызча', lat: 42.87, lng: 74.59,
},
  uz: { name: 'Uzbek', native: "Oʻzbekcha", lat: 41.30, lng: 69.28,
},
  tk: { name: 'Turkmen', native: 'Türkmençe', lat: 37.95, lng: 58.38,
},
  mn_cn: { name: 'Mongolian (Inner)', native: 'ᠮᠣᠩᠭᠣᠯ', lat: 40.84, lng: 111.75,
},
  mnc: { name: 'Manchu', native: 'ᠮᠠᠨᠵᡠ', lat: 45.75, lng: 126.65,
},
  // Xibe (Sibe) — Tungusic Manchu-Nanai (sister/dialect of Manchu, mutually intelligible to varying degrees), ~30K, Xinjiang Ili Kazakh AP. Only living Manchu-related language with active literacy.
  // Sources: Ethnologue 27 'sjo'; Glottolog xibe1242; Norman (1974) The Xibe People; Jin (2000) Xibe Yu Yufa.
  sjo: { name: 'Xibe', native: 'ᠰᡞᠪᡝ ᡤᡞᠰᡠᠨ', lat: 43.93, lng: 81.32, // Qapqal Xibe AP, Yili, Xinjiang
},

  ar_eg: { name: 'Arabic (Egyptian)', native: 'مصري', lat: 30.04, lng: 31.24,
},
  ar_lev: { name: 'Arabic (Levantine)', native: 'شامي', lat: 33.89, lng: 35.50,
},
  ar_gulf: { name: 'Arabic (Gulf)', native: 'خليجي', lat: 25.28, lng: 55.30,
},
  ar_iq: { name: 'Arabic (Iraqi)', native: 'عراقي', lat: 33.31, lng: 44.37,
},
  ar_ma: { name: 'Arabic (Moroccan)', native: 'دارجة', lat: 33.97, lng: -6.85,
},
  arq: { name: 'Arabic (Algerian)', native: 'الدارجة الجزائرية', lat: 36.75, lng: 3.06, // Algiers
},
  mey: { name: 'Hassaniya Arabic', native: 'حسانية', lat: 18.08, lng: -15.98, // Nouakchott
},
  ar_tn: { name: 'Arabic (Tunisian)', native: 'تونسي', lat: 36.81, lng: 10.18,
},
  ar_sd: { name: 'Arabic (Sudanese)', native: 'سوداني', lat: 15.59, lng: 32.53,
},
  ti: { name: 'Tigrinya', native: 'ትግርኛ', lat: 15.34, lng: 38.93,
},
  mt: { name: 'Maltese', native: 'Malti', lat: 35.90, lng: 14.51,
},
  ig: { name: 'Igbo', native: 'Igbo', lat: 6.17, lng: 6.79, // Onitsha (Igbo historical/commercial center)
},
  // Berom (Birom) — Niger-Congo Atlantic-Congo Benue-Congo Plateau (sister to other Plateau languages of Nigeria's Jos Plateau region; the largest of the Plateau languages, with the Berom people being one of the major indigenous groups of Plateau State around Jos), ~1M, Nigeria (Plateau State — Jos South, Barkin Ladi, Riyom, Jos North local government areas; small populations in southern Kaduna and Bauchi states).
  // Sources: Ethnologue 27 'bom'; Glottolog bero1242; Bouquiaux (1970) La langue Birom.
  bom: { name: 'Berom', native: 'Cẹn Bẹrom', lat: 9.92, lng: 8.89, // Jos, Plateau State, Nigeria (Berom heartland)
},
  // Tiv — Niger-Congo (Atlantic-Congo, Bantoid, Tivoid — sister to other Tivoid Cameroonian languages but historically isolated in Nigeria), ~5M, Nigeria (Benue State — Gboko, Makurdi).
  // Sources: Ethnologue 27 'tiv'; Glottolog tivv1240; Abraham (1940) Tiv-English Dictionary.
  tiv: { name: 'Tiv', native: 'Tiv', lat: 7.34, lng: 9.00, // Gboko, Benue State, Nigeria
},
  // Efik — Niger-Congo (Atlantic-Congo, Cross River, Lower Cross — sister to ibibio ibb and other Lower Cross), ~2M, Nigeria (Cross River State — Calabar, Akwa Ibom). Historic SE Nigerian literary language.
  // Sources: Ethnologue 27 'efi'; Glottolog efik1245; Goldie (1862) Dictionary of the Efik Language.
  efi: { name: 'Efik', native: 'Usem Efik', lat: 4.96, lng: 8.32, // Calabar, Cross River State (historic Efik kingdom)
},
  // Ekpeye — Niger-Congo (Atlantic-Congo, Volta-Niger, Igboid — sister to ig Igbo within Igboid; classified as separate language under Igboid by Ethnologue), ~50K, Nigeria (Rivers State — Ahoada West, Ahoada East).
  // Sources: Ethnologue 27 'ekp'; Glottolog ekpe1248; Williamson (1989) Niger-Congo classification.
  ekp: { name: 'Ekpeye', native: 'Ekpeye', lat: 5.05, lng: 6.52, // Ahoada, Rivers State, Nigeria
},
  // Izii — Niger-Congo (Atlantic-Congo, Volta-Niger, Igboid — sister to ig Igbo and ekp Ekpeye within Igboid; classified as separate language by Ethnologue), ~600K, Nigeria (Ebonyi State — Abakaliki, Izzi LGA).
  // Sources: Ethnologue 27 'izz'; Glottolog izii1238; Williamson (1989) Niger-Congo classification.
  izz: { name: 'Izii', native: 'Izi', lat: 6.32, lng: 8.11, // Abakaliki, Ebonyi State, Nigeria
},
  // Ibibio — Cross River, ~5M speakers, southeastern Nigeria. Major Niger-Congo language.
  // Sources: Ethnologue 27 'ibb'; Glottolog ibib1240; Essien (1990) Grammar of Ibibio.
  ibb: { name: 'Ibibio', native: 'Ibibio', lat: 5.04, lng: 7.91, // Uyo, Akwa Ibom State
},
  // Urhobo — Niger-Congo Edoid, ~550K speakers, Delta State Nigeria.
  // Sources: Ethnologue 27 'urh'; Glottolog urho1239; Aziza (2003) Urhobo Phonetics.
  urh: { name: 'Urhobo', native: 'Urhobo', lat: 5.51, lng: 5.76, // Ughelli/Delta State, Nigeria
},
  // Degema — Niger-Congo Edoid (Delta-Edoid sub-branch, sister to Engenni and Epie), ~25K, Nigeria (Rivers State — Bonny Local Government Area).
  // Sources: Ethnologue 27 'deg'; Glottolog dege1246; Kari (2004) A Reference Grammar of Degema; Williamson (1989).
  deg: { name: 'Degema', native: 'Atala-mọ', lat: 4.75, lng: 6.75, // Bonny, Rivers State, Nigeria
},
  // Yekhee (Etsako, formerly Etsako proper) — Niger-Congo Edoid (North-Central, sister to bin Edo and other Edoid; Yekhee cluster includes Auchi, Avianwu, Uzairue), ~660K, Nigeria (Edo State — Etsako).
  // Sources: Ethnologue 27 'ets'; Glottolog yekh1235; Williamson (1989) Niger-Congo classification.
  ets: { name: 'Yekhee', native: 'Yekhee', lat: 7.07, lng: 6.27, // Auchi, Etsako, Edo State, Nigeria
},
  // Isoko — Niger-Congo Edoid, ~600K speakers, Delta State Nigeria. Sister to Urhobo (urh).
  // Sources: Ethnologue 27 'iso'; Glottolog isok1238; Williamson (1972) Isoko phonology.
  iso: { name: 'Isoko', native: 'Isoko', lat: 5.66, lng: 6.24, // Oleh, Delta State (Isoko heartland)
},
  ha: { name: 'Hausa', native: 'Hausa', lat: 12.00, lng: 8.52,
},
  // Hdi — Chadic (Central, Mafa-Bata subgroup), ~30K, Cameroon (Far North Region — Mokolo) + Nigeria border. Famous for ATR vowel harmony and rich glottal-consonant inventory.
  // Sources: Ethnologue 27 'xed'; Glottolog hdii1240; Frajzyngier (2002) A Grammar of Hdi.
  xed: { name: 'Hdi', native: 'Hədi', lat: 10.74, lng: 13.80, // Mokolo, Cameroon (Mandara Mountains)
},
  // Kera — Afro-Asiatic (Chadic, East, A subgroup), ~50K, Chad (Mayo-Kebbi East prefecture) + Cameroon (Far North border).
  // Sources: Ethnologue 27 'ker'; Glottolog kera1252; Ebert (1979) Sprache und Tradition der Kera.
  ker: { name: 'Kera', native: 'kura kera', lat: 10.05, lng: 15.42, // Léré, Mayo-Kebbi East, Chad
},
  // Daba — Afro-Asiatic (Chadic, Central, Daba subgroup), ~30K, Cameroon (Far North Region) + Nigeria (Adamawa State).
  // Sources: Ethnologue 27 'dbq'; Glottolog daba1262; Mouchet (1966) Le parler daba.
  dbq: { name: 'Daba', native: 'mə-daba', lat: 10.65, lng: 13.97, // Mokolo area, Cameroon
},
  wo: { name: 'Wolof', native: 'Wolof', lat: 14.69, lng: -17.44,
    wordEvidence: {
      n99: { evidence: 'inferred',
             source: "Wiktionary Wolof lemmas juróom 'five', ñeent 'four', fukk 'ten' — all three confirmed individually",
             note: "the whole numeral is not attested anywhere reachable; this is the regular Wolof composition, 9x10 + 9 where 9 is itself juróom-ñeent 'five-four'. Kept because it is the quinary sub-base again, the same shape as Khmer ប្រាំបួន, on the other side of the world" }
    },
},
  // Serer — Niger-Congo (Atlantic, Senegambian — sister to Fula and Wolof but Cangin subgroup), ~1.4M, Senegal (Sine-Saloum + Petite Côte). Tonal, ~12 noun classes.
  // Sources: Ethnologue 27 'srr'; Glottolog sere1260; Faye (1980) Lexique Sereer-Sine; McLaughlin (1992).
  srr: { name: 'Serer', native: 'Seereer', lat: 14.41, lng: -16.97, // Diourbel / Sine-Saloum, Senegal
},
  so: { name: 'Somali', native: 'Soomaali', lat: 2.05, lng: 45.32,
},
  om: { name: 'Oromo', native: 'Afaan Oromoo', lat: 8.55, lng: 39.27, // Adama (Oromia regional center)
},
  // Konso — Cushitic East (Lowland), ~250K, Ethiopia (SNNPR — Konso Special Woreda). Famous for terraced agriculture and stone tower-stelae (UNESCO heritage 2011).
  // Sources: Ethnologue 27 'kxc'; Glottolog kons1241; Ongaye (2013) Konso grammar; Sasse (1976) East Cushitic.
  // Review 433: this row cited Ongaye (2013) above while actually holding
  // Oromo. 19 of 25 cells were Oromo or unidentifiable; every replacement
  // below is a page-level citation from the grammar itself. The tell was
  // phonological — Konso has no voiced stops and no ejectives (it has the
  // implosives ɓ ɗ ʄ ʛ instead), yet the row's IPA was full of /b/, /d/, /ɡ/,
  // /dʒ/ and /kʼ/.
  kxc: { name: 'Konso', native: 'Af kawooti', lat: 5.34, lng: 37.43, // Konso town, SNNPR Ethiopia
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Ongaye (2013) §2.1.1 (2), /p/ example — piʃaa \'water\'', note: 'already correct; review 432 had fixed it from inanta, which is \'the girl\' in the grammar\'s own example sentences' },
      house:  { evidence: 'direct', source: 'Ongaye (2013) §2.1.1 (7), /t/ example — tika \'house\', pl. tikkaa', note: 'replaces mana (Oromo)' },
      dog:    { evidence: 'direct', source: 'Ongaye (2013) §2.1.1 (7) and the noun appendix — kuta (M), pl. kuttaa \'dog\'', note: 'replaces kareta' },
      fire:   { evidence: 'direct', source: 'Ongaye (2013) §2 — apitta (M) \'fire\'', note: 'replaces iya' },
      eye:    { evidence: 'direct', source: 'Ongaye (2013) §2.2 (31), /i/ example — ilta \'eye\'; root il-, plurative ilɗaa', note: 'corrected from ila' },
      heart:  { evidence: 'direct', source: 'Ongaye (2013) §2.7 — /sataʔta/ [sataatḁ] \'heart\'', note: 'replaces onna (Oromo onnee)' },
      tree:   { evidence: 'direct', source: 'Ongaye (2013), the /ʛ/ uvular-implosive example — ʛoyra (M), pl. ʛoraa \'tree\'', note: 'replaces ergaa' },
      star:   { evidence: 'direct', source: 'Ongaye (2013) noun appendix — hikkitta (M), pl. hikkiyyaa \'star\'', note: 'replaces urjii (Oromo)' },
      sun:    { evidence: 'direct', source: 'Ongaye (2013) noun appendix — piirtuta (F), pl. piirtuwwaa \'sun\'', note: 'replaces kawa' },
      moon:   { evidence: 'inferred', source: 'Ongaye (2013) noun appendix — leya (M), pl. leyaɗɗaa, glossed \'month\'', note: 'WEAKEST CELL IN THE ROW. The grammar has no entry glossed \'moon\' anywhere, and Glosbe has no Konso moon either. leya is used because moon and month are the same lexeme across much of Lowland East Cushitic (cf. Oromo jiʼa) — but not all of it: Somali separates dayax \'moon\' from bil \'month\'. Replaces ayeena, which is not moon in Konso or in Oromo. Needs a speaker or the 2022 English–Afaa Xonso school dictionary' },
      mother: { evidence: 'direct', source: 'Ongaye (2013) §2.1, stated outright: "in Konso the word for \'mother\' is aayyaa"; also the kinship table', note: 'replaces eedda' },
      father: { evidence: 'direct', source: 'Ongaye (2013) kinship table — aappaa \'father\'', note: 'replaces abba (Oromo abbaa); Konso has no voiced stops' },
      cat:    { evidence: 'direct', source: 'Ongaye (2013) §13, conative interjections — aturr \'call to a cat\' <aturraata \'cat\'>', note: 'replaces adurree (Oromo)' },
      name:   { evidence: 'direct', source: 'Ongaye (2013) §2.1.1 — maχχa \'name\'', note: 'replaces maqaa (Oromo), whose IPA /makʼaː/ used an ejective Konso does not have' },
      i:      { evidence: 'direct', source: 'Ongaye (2013) Table 1, independent personal pronouns — anti 1SG.NOM', note: 'replaces ani (Oromo)' },
      you:    { evidence: 'direct', source: 'Ongaye (2013) Table 1 — atti 2SG.NOM', note: 'already correct' },
      one:    { evidence: 'direct', source: 'Ongaye (2013) §2.1.1 — takka \'one\'', note: 'already correct; Oromo is tokko' },
      two:    { evidence: 'direct', source: 'Ongaye (2013) §2.1.1, /l/ example — lakki \'two\'', note: 'already correct; Oromo is lama. IPA corrected to lakːi for the geminate' },
      hand:   { evidence: 'direct', source: 'Ongaye (2013) §2.1.1, /h/ example — harka \'hand\'', note: 'already correct; IPA corrected from haɾka — the Konso rhotic is the trill /r/' },
      good:   { evidence: 'direct', source: 'Ongaye (2013) §7.1 adjectival roots — paʛaar- \'to be good, beautiful\'; predicative i=paʛaar-i', note: 'Konso adjectives are stative verbs, so the predicative paʛaari is the citable form. Replaces fayye (Oromo fayya)' },
      hello:  { evidence: 'direct', source: 'Ongaye (2013) §13.3.1 — general greetings are built on nakaytaa \'health, peace\'', formType: 'greeting-formula', note: 'replaces akkam (Oromo)' },
      eat:    { evidence: 'direct', source: 'Ongaye (2013) — root ɗam- \'to eat\'; the infinitive ɗam-iyaa is printed in the grammar', formType: 'inflected-form', note: 'replaces ihaa. Infinitive chosen to parallel Oromo dhuguu / nyaachuu in this dataset' },
      drink:  { evidence: 'inferred', source: 'Ongaye (2013) — root ik- ~ ikk- \'to drink\'', formType: 'inflected-form', note: 'the root is attested; the -iyaa infinitive is the regular pattern of ɗam-iyaa but ikiyaa itself is not printed in the grammar. Replaces inakkaa (Oromo)' },
      love:   { evidence: 'inferred', source: 'Ongaye (2013) §5 (16) — ʄaalaɗ- \'to choose, love\'', formType: 'inflected-form', note: 'same caveat as drink: the root is attested, the infinitive is regular but not printed. Replaces jaalla, whose IPA /dʒaːlːa/ used a phoneme Konso does not have' },
    } },
  // Gedeo (Derasa) — Afro-Asiatic Cushitic East (Highland — sister to sid Sidamo, omx Hadiyya, kbr Kembata), ~1.8M, Ethiopia (SNNPR — Gedeo Zone south of Awasa).
  // Sources: Ethnologue 27 'drs'; Glottolog gede1242; Hudson (1989) Highland East Cushitic Dictionary.
  drs: { name: 'Gedeo', native: 'Gedeʼuffa', lat: 6.10, lng: 38.30, // Dilla, Gedeo Zone, SNNPR
},
  // Daasanach — Cushitic East (Lowland), ~50K, Kenya/Ethiopia border (Lake Turkana/Omo Delta). Distinctive cattle-pastoral culture (Murle-Daasanach).
  // Sources: Ethnologue 27 'dsh'; Glottolog daas1239; Tosco (2001) The Dhaasanac Language.
  dsh: { name: 'Daasanach', native: 'Daasanach', lat: 4.55, lng: 36.04, // Omorate, South Omo, Ethiopia (centroid Kenya/Ethiopia border)
},
  rw: { name: 'Kinyarwanda', native: 'Ikinyarwanda', lat: -1.94, lng: 30.06,
},
  // Kirundi (Rundi) — Bantu JE61, sister to Kinyarwanda. National language of Burundi.
  // Sources: Ethnologue 27 'run'; Glottolog rund1242; Cox (1969) Outline of Kirundi Grammar.
  rn: { name: 'Kirundi', native: 'Ikirundi', lat: -3.38, lng: 29.36, // Bujumbura
},
  xh: { name: 'Xhosa', native: 'isiXhosa', lat: -33.02, lng: 27.91, // East London (Eastern Cape Xhosa heartland)
},
  sn: { name: 'Shona', native: 'chiShona', lat: -17.83, lng: 31.05,
},
  // Manyika — Bantu S13a, ~2M, eastern Zimbabwe (Manicaland Province) + western Mozambique. Sister to Shona (sn) — historically classified as a Shona dialect, but increasingly recognised as a distinct cluster member.
  // Sources: Ethnologue 27 'mxc'; Glottolog many1257; Doke (1931) Report on the Unification of the Shona Dialects.
  mxc: { name: 'Manyika', native: 'chiManyika', lat: -18.97, lng: 32.67, // Mutare, Manicaland (Manyika heartland)
},
  ln: { name: 'Lingala', native: 'Lingála', lat: -4.32, lng: 15.31,
},
  ny: { name: 'Chichewa', native: 'Chicheŵa', lat: -13.96, lng: 33.79,
},
  // Yao (Chiyao) — Bantu P21, ~3M, Mozambique + Malawi + Tanzania. Major historical trade lingua franca of Lake Malawi region.
  // Sources: Ethnologue 27 'yao'; Glottolog yao1252; Sanderson (1922) Yao Grammar.
  yao: { name: 'Yao', native: 'Chiyao', lat: -15.07, lng: 35.71, // Zomba/Mangochi border (Yao heartland)
},
  en_aave: { name: 'English (AAVE)', native: 'English (AAVE)', lat: 33.75, lng: -84.39,
},
  // New Zealand English (Audit Task 149) — distinctive front-vowel raising
  en_nz: { name: 'English (New Zealand)', native: 'English (NZ) / Reo Pākehā', lat: -36.85, lng: 174.76, // Auckland
},
  en_au: { name: 'English (Australian)', native: 'English (Australian)', lat: -33.87, lng: 151.21,
},
  sco: { name: 'Scots', native: 'Scots', lat: 55.86, lng: -4.25,
},
  af: { name: 'Afrikaans', native: 'Afrikaans', lat: -33.93, lng: 18.42,
},
  de_at: { name: 'Austrian German', native: 'Österreichisch', lat: 48.21, lng: 16.37,
},
  // Swiss German — Alemannic German cluster, ~5M speakers, Switzerland (de facto national variety) + Liechtenstein.
  // Sources: Christen et al. (2010) Kleiner Sprachatlas der deutschen Schweiz; SDS (Sprachatlas der deutschen Schweiz).
  gsw: { name: 'Swiss German', native: 'Schwiizerdütsch', lat: 47.37, lng: 8.54, // Zürich
},
  // Swabian (Schwäbisch) — Indo-European Germanic Upper German Alemannic (sister to Swiss German gsw and Alsatian within the Alemannic branch; the prestige variety of southwestern Germany), ~800K, Germany (Baden-Württemberg — Stuttgart region, Schwarzwald, Schwäbische Alb; Bavarian Swabia — Augsburg area). Famously the dialect of Stuttgart and the Mercedes-Benz/Porsche industrial heartland.
  // Sources: Ethnologue 27 'swg'; Glottolog swab1242; Frey (1989) Schwäbisches Wörterbuch.
  swg: { name: 'Swabian', native: 'Schwäbisch', lat: 48.78, lng: 9.18, // Stuttgart, Baden-Württemberg
},
  // Bavarian (Boarisch) — Indo-European Germanic Upper German (Austro-Bavarian; sister to East Franconian and Alemannic; co-territorial with Standard German de but distinct vocabulary/phonology), ~14M, Germany (Bavaria) + Austria (most regions) + Italy (South Tyrol).
  // Sources: Ethnologue 27 'bar'; Glottolog bava1246; Merkle (1976) Bairische Grammatik.
  bar: { name: 'Bavarian', native: 'Boarisch', lat: 49.01, lng: 12.10, // Regensburg, Bayern (representative point distinct from de_by München marker)
},
  // East Franconian (Mainfränkisch) — High German Upper East dialect, Bavaria/Thuringia/Hesse.
  // Sources: Ethnologue 27 'vmf'; Glottolog main1267; Wagner (1987) Bairisch-Fränkische Wörterbücher.
  vmf: { name: 'East Franconian', native: 'Mainfränkisch', lat: 49.79, lng: 9.93, // Würzburg (Mainfränkisch heartland)
},
  // Walser — Highest Alemannic German, ~22K speakers, scattered Alpine communities (Switzerland/Italy/Austria/Liechtenstein).
  // Sources: Ethnologue 27 'wae'; Glottolog wals1238; Bohnenberger (1913) Walser-Wörterbuch.
  wae: { name: 'Walser', native: 'Wallisertiitsch', lat: 46.30, lng: 7.99, // Saas-Fee, Valais (Walser heartland)
},
  nds: { name: 'Low German', native: 'Plattdüütsch', lat: 53.55, lng: 9.99,
},
  // Kölsch — Ripuarian Franconian (West Central German), Cologne, ~250K speakers.
  // Sources: Ethnologue 27 'ksh'; Glottolog kols1241; Bhatt & Lindlar (1998) Kölsch Wörterbuch.
  ksh: { name: 'Kölsch', native: 'Kölsch', lat: 50.94, lng: 6.96, // Cologne
},
  // Pennsylvania German — High German (Palatinate origin), spoken by
  // Amish/Mennonite communities across PA/OH/IN/Ontario. Distinct from
  // Standard German with English loanwords + Palatine-German base.
  pdc: { name: 'Pennsylvania German', native: 'Pennsilfaanisch Deitsch', lat: 40.04, lng: -76.30, // Lancaster PA
},
  // Plautdietsch (Mennonite Low German) — Indo-European Germanic West Germanic Low German (sister to Low Saxon nds; specifically the Mennonite religious diaspora variety descended from 16th c West Prussian Vistula Plautdietsch), ~400K, Russia (~50K Volga Mennonites) + Germany (~80K post-Soviet Aussiedler) + Canada (~80K Manitoba/Saskatchewan Mennonite settlements) + USA (Kansas/Oklahoma) + Mexico (~50K Chihuahua/Durango Old Colony) + Paraguay (~15K Filadelfia) + Brazil (~3K Santa Catarina) + Bolivia (~70K).
  // Sources: Ethnologue 27 'pdt'; Glottolog plau1238; Mitzka (1968) Niederpreussisch; Epp (1996) Old Colony Plattdietsch.
  pdt: { name: 'Plautdietsch', native: 'Plautdietsch', lat: 28.55, lng: -106.97, // Cuauhtémoc, Chihuahua, Mexico (largest Old Colony settlement)
},
  yi: { name: 'Yiddish', native: 'ייִדיש', lat: 40.71, lng: -74.01,
},
  is: { name: 'Icelandic', native: 'Íslenska', lat: 64.15, lng: -21.94,
},
  gd: { name: 'Scottish Gaelic', native: 'Gàidhlig', lat: 57.48, lng: -7.36,
},
  br: { name: 'Breton', native: 'Brezhoneg', lat: 48.39, lng: -4.49,
},
  nap: { name: 'Neapolitan', native: 'Napulitano', lat: 40.85, lng: 14.27,
},
  scn: { name: 'Sicilian', native: 'Sicilianu', lat: 38.12, lng: 13.36,
},
  vec: { name: 'Venetian', native: 'Vèneto', lat: 45.44, lng: 12.34,
},
  // Corsican — Italo-Dalmatian Romance, ~150K, France (Corsica). Italian-
  // descended but with French orthographic conventions; closest to
  // central-southern Italian dialects.
  co: { name: 'Corsican', native: 'Corsu', lat: 41.92, lng: 8.74, // Ajaccio
},
  // Ligurian — Gallo-Italic Romance, ~500K, Italy (Liguria + Mediterranean
  // diaspora). Conservative final-vowel reduction and distinctive
  // pronunciation. Reference: Genoese standard.
  lij: { name: 'Ligurian', native: 'Lìgure', lat: 44.41, lng: 8.93, // Genoa
},
  // Romagnol (Rumagnòl) — Italian regional Gallo-Italic, ~1.1M, Italy (Emilia-Romagna — Romagna sub-region: Forlì, Cesena, Ravenna, Rimini).
  // Sources: Ethnologue 27 'rgn'; Glottolog roma1328; Foresti (1988) Lessico romagnolo; Manzelli (2007).
  rgn: { name: 'Romagnol', native: 'Rumagnòl', lat: 44.14, lng: 12.24, // Forlì, Romagna
},
  // Emilian (Emiliàn) — Italic Romance Gallo-Italic, ~2M, Italy (Emilia-Romagna western part — Bologna, Modena, Reggio, Parma, Piacenza). Distinct from sister Romagnol (rgn).
  // Sources: Ethnologue 27 'egl'; Glottolog emil1241; Foresti (1988) Lessico bolognese; Foresti (2010) Profilo linguistico dell'Emilia-Romagna.
  egl: { name: 'Emilian', native: 'Emiliàn', lat: 44.49, lng: 11.34, // Bologna, Emilia
},
  // Arpitan / Franco-Provençal — Gallo-Romance, ~150K, France/Italy/Switzerland.
  // Distinct from both French and Occitan; UNESCO endangered. Reference
  // Orthographe de Référence B (ORB).
  frp: { name: 'Arpitan', native: 'Arpitan', lat: 45.74, lng: 4.84, // Lyon
},
  ca: { name: 'Catalan', native: 'Català', lat: 41.39, lng: 2.17,
},
  gl: { name: 'Galician', native: 'Galego', lat: 42.88, lng: -8.54,
},
  oc: { name: 'Occitan', native: 'Occitan', lat: 43.60, lng: 1.44,
},
  be: { name: 'Belarusian', native: 'Беларуская', lat: 53.90, lng: 27.57,
},
  cs: { name: 'Czech', native: 'Čeština', lat: 50.08, lng: 14.44,
},
  sk: { name: 'Slovak', native: 'Slovenčina', lat: 48.15, lng: 17.11,
},
  sl: { name: 'Slovenian', native: 'Slovenščina', lat: 46.06, lng: 14.51,
},
  sr: { name: 'Serbian', native: 'Српски', lat: 44.79, lng: 20.47,
},
  bg: { name: 'Bulgarian', native: 'Български', lat: 42.70, lng: 23.32,
},
  lt: { name: 'Lithuanian', native: 'Lietuvių', lat: 54.69, lng: 25.28,
},
  // Samogitian — Baltic, ~500K, NW Lithuania (Žemaitija). Sister to Lithuanian; preserves archaic features.
  // Sources: Ethnologue 27 'sgs'; Glottolog samo1265; Pabrėža (2009) Žemaičių rašyba.
  sgs: { name: 'Samogitian', native: 'Žemaitiu kalba', lat: 55.72, lng: 21.86, // Telšiai (Samogitian cultural center)
},
  lv: { name: 'Latvian', native: 'Latviešu', lat: 56.95, lng: 24.11,
},
  // Old Prussian (Pruzziska) — Baltic (Western, sister to East Baltic Lithuanian/Latvian), historical (extinct early 18th c.). Reconstructed from 14th-16th c. Catechisms.
  // Sources: Ethnologue 27 'prg'; Glottolog prus1238; Mažiulis (1981) Old Prussian Etymological Dictionary; Schmalstieg (1976).
  prg: { name: 'Old Prussian', native: 'Prūsiska bila', lat: 54.71, lng: 20.51, // Königsberg / Kaliningrad (historical Pruzzia heartland)
},
  sq: { name: 'Albanian', native: 'Shqip', lat: 41.33, lng: 19.82,
},
  // Arbëresh (Italo-Albanian) — Indo-European Albanian Tosk (sister to Tosk Albanian sq within the Albanian Tosk branch; preserves Old Tosk features lost in Standard Albanian, descended from 15th-century refugees fleeing Ottoman conquest), ~80K, Italy (~50 villages across Calabria, Sicily, Basilicata, Molise, Puglia, Abruzzo, Campania — concentrated in Cosenza Province).
  // Sources: Ethnologue 27 'aae'; Glottolog arbe1236; Altimari & Savoia (1994) I dialetti italo-albanesi.
  aae: { name: 'Arbëresh', native: 'Arbërisht', lat: 39.55, lng: 16.27, // San Demetrio Corone, Cosenza, Calabria (largest Arbëresh comune)
},
  et: { name: 'Estonian', native: 'Eesti', lat: 59.44, lng: 24.75,
},
  ht: { name: 'Haitian Creole', native: 'Kreyòl ayisyen', lat: 18.54, lng: -72.34,
},
  jam: { name: 'Jamaican Patois', native: 'Patwa', lat: 18.00, lng: -76.79,
},
  // Bahamian Creole (Bahamian Dialect) — English-based creole (Atlantic, Western Caribbean — sister to bzj Belize Kriol and jam Jamaican Patois), ~400K, Bahamas.
  // Sources: Ethnologue 27 'bah'; Glottolog baha1262; Holm & Shilling (1982) Dictionary of Bahamian English.
  bah: { name: 'Bahamian Creole', native: 'Bahamian Dialect', lat: 25.05, lng: -77.35, // Nassau, Bahamas
},
  // Belize Kriol — English-based creole, ~170K (~70K L1 + ~100K L2), Belize. National lingua franca, distinct from Jamaican Patois.
  // Sources: Ethnologue 27 'bzj'; Glottolog beli1260; Decker (2005) The Song of Kriol; National Kriol Council Belize.
  bzj: { name: 'Belize Kriol', native: 'Bileez Kriol', lat: 17.50, lng: -88.20, // Belize City
},
  pap: { name: 'Papiamento', native: 'Papiamentu', lat: 12.17, lng: -68.98,
},
  // Cape Verdean Creole (Audit Task 149 Batch 2 partial). Largest
  // Portuguese-based creole, ALUPEC orthography (Santiago/Sotavento).
  kea: { name: 'Cape Verdean Creole', native: 'Kabuverdianu', lat: 14.92, lng: -23.51, // Praia
},
  rom: { name: 'Romani', native: 'Romani čhib', lat: 42.68, lng: 26.32, // Sliven, Bulgaria (Romani cultural heartland in the Balkans — distinct from hu Budapest anchor for [#14])
},
  // Vlax Romani — most-spoken Romani dialect (Audit Task 141), Kalderash
  // base. Distinct from the macro `rom` row (which uses pan-Romani forms).
  rmy: { name: 'Vlax Romani', native: 'romani čhib (Kalderash)', lat: 44.43, lng: 26.10, // Bucharest area
},
  // Finnish Romani (Kaale) — Northern Romani (Romanichal-Kaale subgroup), ~10K speakers, Finland (largest concentration in Europe of NorthRomani branch).
  // Sources: Ethnologue 27 'rmf'; Glottolog kalo1259; Granqvist (2007) Suomen romanit ja heidän kielensä.
  rmf: { name: 'Finnish Romani', native: 'romaniska tšimb / Kaale', lat: 60.17, lng: 24.94, // Helsinki (cultural center of Finnish Roma)
},
  pcm: { name: 'Nigerian Pidgin', native: 'Naijá', lat: 6.45, lng: 3.40, // Lagos (commercial/media center)
},
  tpi: { name: 'Tok Pisin', native: 'Tok Pisin', lat: -6.73, lng: 147.00,
},
  // Hiri Motu (Police Motu) — Austronesian Oceanic Motu-based pidgin/contact variety (descended from a simplified Motu used as a contact language with European explorers and the colonial police force; one of three official languages of Papua New Guinea), ~120K L2 + ~10K L1, Papua New Guinea (Central Province around Port Moresby; Gulf, Western, and Oro provinces).
  // Sources: Ethnologue 27 'ho'; Glottolog hiri1237; Dutton (1985) Police Motu; Lister-Turner & Clark (1931) A Grammar of the Motu Language.
  ho: { name: 'Hiri Motu', native: 'Hiri Motu', lat: -8.78, lng: 148.45, // Popondetta, Oro Province (representative point distinct from hmo Port Moresby marker)
},
  // Kalam — Trans-New Guinea (Madang, Kalam-Kobon), ~15K-20K, PNG (Madang/Western Highlands border, Schrader Range). Famous for "pandanus language" ritual register and exhaustive ethnobiological lexicon.
  // Sources: Ethnologue 27 'kmh'; Glottolog kala1397; Pawley & Bulmer (2011) Dictionary of Kalam (with ethnographic notes 1500+ pages).
  kmh: { name: 'Kalam', native: 'Kalam', lat: -5.05, lng: 144.55, // Schrader Range, Madang, PNG
},
  // Neko — Trans-New Guinea (Madang, Rai Coast — Yaganon family, close to Kalam-Kobon area), ~640 speakers, PNG (Madang Province — Rai Coast District). SOV word order, Latin script.
  // Sources: Ethnologue 27 'nej'; Glottolog neko1242; Wiktionary; transnewguinea.org/language/neko.
  nej: { name: 'Neko', native: 'Neko', lat: -5.85, lng: 145.95, // Rai Coast, Madang, PNG
},
  // Kanite — Trans-New Guinea (Kainantu-Goroka, Kainantu — sister to Kamano, Yagaria, Gadsup within the Kainantu branch of Eastern Highlands), ~6K, PNG (Eastern Highlands Province — Kainantu District around Kanite hamlet/Henganofi area).
  // Sources: Ethnologue 27 'kmu'; Glottolog kani1281; McCarthy (1965) Kanite Phonology (SIL); Wurm (1975) Eastern Highlands languages.
  kmu: { name: 'Kanite', native: 'Kanite', lat: -6.30, lng: 145.85, // Kainantu/Henganofi area, Eastern Highlands, PNG
},
  // Mapos Buang — Austronesian (Malayo-Polynesian, Oceanic, Western Oceanic, Buang), ~10K, PNG (Morobe Province — Snake River valley, Mumeng District).
  // Sources: Ethnologue 27 'bzh'; Glottolog mapo1252; Hooley (2002) The Buang of Papua New Guinea.
  // Mussau-Emira — Austronesian (Oceanic, Western Oceanic, Mussau-Emira), ~5K, PNG (St Matthias Group — Mussau Island, Emira Island, north of New Ireland).
  // Sources: Ethnologue 27 'emi'; Glottolog muss1246; Ross (1988) Proto Oceanic and the Austronesian Languages of Western Melanesia.
  emi: { name: 'Mussau-Emira', native: 'Mussau', lat: -1.51, lng: 149.62, // Mussau Island, St Matthias Group, PNG
},
  // Hote — Austronesian (Oceanic, Western Oceanic, North Huon Gulf — sister to bzh Mapos Buang and other Western Oceanic of PNG), ~3K, PNG (Morobe Province — Mumeng District, Lae area).
  // Sources: Ethnologue 27 'hot'; Glottolog hote1244; Hooley (2002) Western Oceanic linguistics.
  hot: { name: 'Hote', native: 'Hote', lat: -6.85, lng: 147.05, // Lae area, Morobe Province, PNG
},
  // Nalca — Trans-New Guinea (Mek family, sister to other Mek languages of central Highlands New Guinea), ~10K, Indonesia (Papua Highlands — Yahukimo Regency).
  // Sources: Ethnologue 27 'nlc'; Glottolog nalc1238; Heeschen (1992) The Mek Languages of Irian Jaya.
  // Faiwol — Trans-New Guinea (Ok family — sister to Telefol, Mian, Bimin within Ok), ~5K, PNG (Western Province — Olsobip area, Star Mountains).
  // Sources: Ethnologue 27 'fai'; Glottolog faiw1238; Healey (1964) The Ok Family; Mecklenburg (1974) Faiwol Phonology.
  fai: { name: 'Faiwol', native: 'Faiwol', lat: -5.42, lng: 141.08, // Olsobip, Star Mountains, Western Province, PNG
},
  nlc: { name: 'Nalca', native: 'Nalca', lat: -4.50, lng: 139.63, // Yahukimo Regency, Highlands Papua, Indonesia
},
  bzh: { name: 'Mapos Buang', native: 'Buang', lat: -7.00, lng: 146.85, // Mumeng, Morobe Province, PNG
},
  // Torres Strait Creole (Yumplatok) — English-based creole, ~25K speakers, Torres Strait Islands (Australia).
  // Sources: Ethnologue 27 'tcs'; Glottolog torr1261; Shnukal (1988) Broken: Torres Strait Creole.
  tcs: { name: 'Torres Strait Creole', native: 'Yumplatok', lat: -10.59, lng: 142.21, // Thursday Island
},
  // Solomons Pijin — Melanesian Pijin sister to Tok Pisin / Bislama
  // (Audit Task 149 Batch 2 partial). Sources: SIL Pijin Wordlist.
  pis: { name: 'Pijin', native: 'Pijin', lat: -9.43, lng: 159.95, // Honiara
},
  hwc: { name: 'Hawaiian Creole', native: 'Pidgin', lat: 21.31, lng: -157.86,
},
  se: { name: 'Northern Sámi', native: 'Davvisámegiella', lat: 69.65, lng: 18.96,
},
  sma: { name: 'Southern Sámi', native: 'Åarjelsaemien gïele', lat: 64.25, lng: 12.38, // Snåase / Snåsa
},
  // Saami sub-branch completion (Audit Task 142): Lule, Inari, Skolt
  smj: { name: 'Lule Sámi', native: 'Julevsámegiella', lat: 67.86, lng: 20.22, // Jokkmokk
},
  smn: { name: 'Inari Sámi', native: 'anarâškielâ', lat: 68.91, lng: 27.03, // Inari
},
  sms: { name: 'Skolt Sámi', native: 'sääʹmǩiõll', lat: 68.49, lng: 28.22, // Sevettijärvi
},
  // Kildin Sámi — Uralic (Sami, Eastern), ~340 speakers, Russia (Kola Peninsula). Only Russian-territory Sami language with ongoing literacy program.
  // Sources: Ethnologue 27 'sjd'; Glottolog kild1236; Kuruch (1985) Russian-Kildin Sami Dictionary; Itkonen (1958).
  sjd: { name: 'Kildin Sámi', native: 'Кӣллт са̄мь кӣлл', lat: 67.65, lng: 33.40, // Lovozero, Murmansk Oblast (cultural center of Kola Sami)
},
  vro: { name: 'Võro', native: 'võro kiil', lat: 57.83, lng: 27.02, // Võru
},
  gn: { name: 'Guarani', native: "Avañe'ẽ", lat: -25.26, lng: -57.58,
},
  // Nheengatu (Língua Geral Amazônica, "Modern Tupi") — Tupi-Guarani (Tupinambá-Tupinambá branch — historical lingua franca of Amazonia derived from extinct Coastal Tupinambá), ~6K, Brazil (upper Rio Negro — São Gabriel da Cachoeira) + Colombia + Venezuela.
  // Sources: Ethnologue 27 'yrl'; Glottolog yrl1239; Cruz (2011) Fonologia e Gramática do Nheengatú.
  yrl: { name: 'Nheengatu', native: 'Nheengatú', lat: -0.13, lng: -67.09, // São Gabriel da Cachoeira, Amazonas, Brazil
},
  chr: { name: 'Cherokee', native: 'ᏣᎳᎩ', lat: 35.51, lng: -83.52,
},
  // Cayuga — Iroquoian Northern, ~30 fluent, Six Nations Reserve Ontario.
  // Sources: Ethnologue 27 'cay'; Glottolog cayu1262; Mithun (1999) Languages of Native North America.
  cay: { name: 'Cayuga', native: 'Gayogo̱hó:nǫʼ', lat: 42.93, lng: -80.10, // Six Nations of the Grand River
},
  // Onondaga — Iroquoian Northern, ~20 fluent, Six Nations Reserve + Onondaga Nation NY.
  // Sources: Ethnologue 27 'ono'; Glottolog onon1246; Woodbury (2003) Onondaga grammar.
  // Tuscarora — Iroquoian Northern, ~10 fluent, NC homeland → Six Nations Reserve ON.
  // Sources: Ethnologue 27 'tus'; Glottolog tusc1257; Williams (1976) Tuscarora Vocabulary.
  tus: { name: 'Tuscarora', native: 'Skarù:rę\'', lat: 43.16, lng: -78.96, // Tuscarora Reservation, NY
},

  as: { name: 'Assamese', native: 'অসমীয়া', lat: 26.14, lng: 91.74,
},
  or: { name: 'Odia', native: 'ଓଡ଼ିଆ', lat: 20.30, lng: 85.83,
},
  bho: { name: 'Bhojpuri', native: 'भोजपुरी', lat: 25.32, lng: 83.01,
},
  en_south: { name: 'English (Southern US)', native: 'English (Southern)', lat: 33.52, lng: -86.81,
},
  en_app: { name: 'English (Appalachian)', native: 'English (Appalachian)', lat: 37.78, lng: -81.19,
},
  en_in: { name: 'English (Indian)', native: 'English (Indian)', lat: 28.61, lng: 77.21, // New Delhi (national-administrative center — distinct from mr Mumbai anchor for [#14] coord cluster)
},
  en_ie: { name: 'English (Irish)', native: 'English (Irish)', lat: 53.35, lng: -6.26,
},
  en_sco: { name: 'English (Scottish)', native: 'English (Scottish)', lat: 55.86, lng: -4.25,
},
  en_yk: { name: 'English (Yorkshire)', native: 'English (Yorkshire)', lat: 53.80, lng: -1.55,
},
  // Audit Task 161: shifted from London center to Bow / East End — the
  // working-class East London where Cockney is anchored.
  en_ck: { name: 'English (Cockney)', native: 'English (Cockney)', lat: 51.53, lng: -0.02,
},
  // British regional accents (owner 2026-07-21, "subdivide British English").
  // Base `en` already carries Received Pronunciation; these are the major
  // distinct regional accents anchored to their home cities.
  en_scouse:  { name: 'English (Scouse)',        native: 'English (Scouse)',        lat: 53.41, lng: -2.99, // Liverpool
},
  en_geordie: { name: 'English (Geordie)',       native: 'English (Geordie)',       lat: 54.97, lng: -1.61, // Newcastle upon Tyne
},
  en_brum:    { name: 'English (Brummie)',       native: 'English (Brummie)',       lat: 52.48, lng: -1.90, // Birmingham
},
  en_manc:    { name: 'English (Mancunian)',     native: 'English (Mancunian)',     lat: 53.48, lng: -2.24, // Manchester
},
  en_wc:      { name: 'English (West Country)',  native: 'English (West Country)',  lat: 51.45, lng: -2.59, // Bristol
},
  en_est:     { name: 'English (Estuary)',       native: 'English (Estuary)',       lat: 51.54, lng: 0.71, // Thames Estuary (Southend)
},
  en_sg: { name: 'Singlish', native: 'Singlish', lat: 1.35, lng: 103.82,
},
  fy: { name: 'West Frisian', native: 'Frysk', lat: 53.20, lng: 5.80,
},
  // North Frisian (Frasch/Fering/Halunder/Mooring) — Indo-European Germanic Anglo-Frisian (sister to fy West Frisian and stq Saterland Frisian), ~10K, Germany (Schleswig-Holstein, North Frisian Islands).
  // Sources: Ethnologue 27 'frr'; Glottolog nort2626; Walker (1990) The Languages of Schleswig.
  frr: { name: 'North Frisian', native: 'Frasch', lat: 54.50, lng: 8.40, // Husum / Bredstedt, Nordfriesland
},
  // Öömrang — the North Frisian dialect of Amrum island (Föhr-Amrum / insular
  // group), a variety of frr distinct from the mainland Mooring form. Forms
  // sourced from Wiktionary (Föhr-Amrum tags), frr.wikipedia (Öömrang), and the
  // Fering-Öömrang Wurdenbök. Contributed via @avzaagzonunaada.
  frr_amr: { name: 'North Frisian (Öömrang)', native: 'Öömrang', lat: 54.63, lng: 8.34, // Amrum island (Nebel)
},
  // Limburgish — West Germanic, ~1.3M, NL Limburg + Belgium + Germany.
  // Tonal (uniquely among major Germanic varieties — pitch accent like
  // Norwegian/Swedish but contrastive). Maastricht standard.
  li: { name: 'Limburgish', native: 'Limburgs', lat: 50.85, lng: 5.69, // Maastricht
},
  nn: { name: 'Norwegian Nynorsk', native: 'Nynorsk', lat: 60.39, lng: 5.32,
},
  fo: { name: 'Faroese', native: 'Føroyskt', lat: 62.01, lng: -6.77,
},
  fr_qc: { name: 'Quebec French', native: 'Québécois', lat: 46.81, lng: -71.21,
},
  fr_af: { name: 'African French', native: 'Français africain', lat: 6.37, lng: 2.43,
},
  fr_be: { name: 'Belgian French', native: 'Français belge', lat: 50.85, lng: 4.35,
},
  fr_ch: { name: 'Swiss French', native: 'Français suisse', lat: 46.52, lng: 6.63,
},
  es_co: { name: 'Colombian Spanish', native: 'Español colombiano', lat: 4.71, lng: -74.07,
},
  es_cl: { name: 'Chilean Spanish', native: 'Español chileno', lat: -33.45, lng: -70.67,
},
  es_ar: { name: 'Argentine Spanish', native: 'Español argentino', lat: -34.60, lng: -58.38,
},
  es_cu: { name: 'Cuban Spanish', native: 'Español cubano', lat: 23.11, lng: -82.37,
},
  es_pe: { name: 'Peruvian Spanish', native: 'Español peruano', lat: -12.05, lng: -77.04,
},
  es_an: { name: 'Andalusian Spanish', native: 'Español andaluz', lat: 37.39, lng: -5.98,
},
  lad: { name: 'Ladino', native: 'Djudeo-Espanyol', lat: 41.01, lng: 28.98,
},
  rm: { name: 'Romansh', native: 'Rumantsch', lat: 46.85, lng: 9.53,
},
  sc: { name: 'Sardinian', native: 'Sardu', lat: 39.22, lng: 9.12,
},
  iu: { name: 'Inuktitut', native: 'ᐃᓄᒃᑎᑐᑦ', lat: 63.75, lng: -68.52,
},
  // === Historical & Ancient Languages ===
  la: { name: 'Latin', native: 'Latina', lat: 41.90, lng: 12.50,

    // Audit Task 200: full per-cell wordEvidence for source-checked
    // row. Sources: Lewis & Short (1879) A Latin Dictionary for orthography
    // and gloss; Allen (1965) Vox Latina for Classical Latin pronunciation;
    // Wiktionary Latin entries (cross-referenced with L&S) for citation forms.
    // IPA values reflect Classical Latin (Late Republic to early Empire);
    // long vowels marked with macron orthographically and ː phonetically.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Lewis & Short — aqua, -ae f. "water"; nominative singular citation form (1st declension)' },
      fire:   { evidence: 'direct', source: 'Lewis & Short — ignis, -is m. "fire"; nominative singular (3rd declension i-stem)', note: 'IPA /iŋnis/ reflects assimilation of /gn/ → [ŋn] per Allen Vox Latina §III' },
      sun:    { evidence: 'direct', source: 'Lewis & Short — sōl, sōlis m. "the sun"; nominative singular (3rd declension monosyllable, long ō)', formType: 'inflected-form' },
      moon:   { evidence: 'direct', source: 'Lewis & Short — lūna, -ae f. "the moon"; nominative singular (1st declension)' },
      mother: { evidence: 'direct', source: 'Lewis & Short — māter, mātris f. "mother"; nominative singular (3rd declension)', formType: 'inflected-form' },
      father: { evidence: 'direct', source: 'Lewis & Short — pater, patris m. "father"; nominative singular (3rd declension; cognate with mātēr)', formType: 'inflected-form' },
      eat:    { evidence: 'direct', source: 'Lewis & Short — edō, edere "to eat"; present infinitive citation form (3rd conjugation)', formType: 'inflected-form', note: 'Latin verbs cited by present infinitive per dictionary convention; 1st-singular present indicative is edō' },
      drink:  { evidence: 'direct', source: 'Lewis & Short — bibō, bibere "to drink"; present infinitive (3rd conjugation, reduplicated stem from PIE *peh3-)', formType: 'inflected-form' },
      love:   { evidence: 'direct', source: 'Lewis & Short — amor, amōris m. "love, affection"; nominative singular noun citation', note: 'concept default per WORD_LIST.definition: emotional/affective love (noun); the verb amō, amāre is also widely attested' },
      heart:  { evidence: 'direct', source: 'Lewis & Short — cor, cordis n. "heart" (anatomical and emotional/seat-of-mind senses); nominative singular (3rd declension neuter)', note: 'covers both emotional (sedes anim) and anatomical senses per WORD_LIST.definition.heart default' },
      tree:   { evidence: 'direct', source: 'Lewis & Short — arbor, arboris f. "tree"; nominative singular (3rd declension)' },
      house:  { evidence: 'direct', source: 'Lewis & Short — domus, -ūs f. "house, dwelling"; nominative singular (4th declension irregular, also genitive -ī)' },
      dog:    { evidence: 'direct', source: 'Lewis & Short — canis, -is c. "dog" (common gender); nominative singular (3rd declension)' },
      cat:    { evidence: 'direct', source: 'Lewis & Short — fēlēs (also fēlis), -is f. "cat, marten, polecat"; nominative singular (3rd declension)', note: 'fēlēs in Classical period denoted any small carnivore including domestic cat (introduced to Rome late Republic)' },
      hand:   { evidence: 'direct', source: 'Lewis & Short — manus, -ūs f. "hand"; nominative singular (4th declension feminine)' },
      eye:    { evidence: 'direct', source: 'Lewis & Short — oculus, -ī m. "eye"; nominative singular (2nd declension); diminutive of *oqʷ-)' },
      hello:  { evidence: 'direct', source: 'Lewis & Short — salvē "hail!, greetings!"; 2nd-singular imperative of salveō "to be in good health"', formType: 'greeting-formula', note: 'standard Roman greeting; plural form salvēte for multiple addressees' },
      thanks: { evidence: 'direct', source: 'Lewis & Short — grātiās agere "to give thanks"; grātiās is accusative plural of grātia "favor, gratitude"', formType: 'thanks-formula', note: 'short form grātiās is the conventional dictionary citation for "thanks"; full phrase grātiās tibi agō "I give you thanks"' },
      one:    { evidence: 'direct', source: 'Lewis & Short — ūnus, -a, -um "one"; masculine nominative singular citation form (irregular pronominal declension)', formType: 'inflected-form' },
      good:   { evidence: 'direct', source: 'Lewis & Short — bonus, -a, -um "good"; masculine nominative singular (1st/2nd declension adjective; suppletive comparative melior)', formType: 'inflected-form' },
    } },
  el_grc: { name: 'Ancient Greek', native: 'Ἑλληνική', lat: 37.97, lng: 23.73,

    // Audit Task 200: full per-cell wordEvidence for source-checked
    // row. Sources: Liddell-Scott-Jones (LSJ) Greek-English Lexicon
    // (lsj.gr) for Attic/Classical citation forms; Smyth (1920) Greek
    // Grammar §§28-39 for pitch accent and §§102-180 for declensions;
    // Allen (1987) Vox Graeca for Classical Attic phonology. IPA values
    // reflect Classical Attic of the 5th-4th c. BCE (rough breathing /h/
    // preserved; circumflex realised as long-falling pitch).
    wordEvidence: {
      water:  { evidence: 'direct', source: 'LSJ — ὕδωρ, ὕδατος (n.) "water"; nominative singular (3rd declension r-stem)', formType: 'inflected-form' },
      fire:   { evidence: 'direct', source: 'LSJ — πῦρ, πυρός (n.) "fire"; nominative singular (3rd declension r-stem; circumflex on long ῡ)', formType: 'inflected-form' },
      sun:    { evidence: 'direct', source: 'LSJ — ἥλιος, -ου (m.) "the sun"; nominative singular (2nd declension); the sun-god Helios', formType: 'inflected-form' },
      moon:   { evidence: 'direct', source: 'LSJ — σελήνη, -ης (f.) "the moon"; nominative singular (1st declension; from σέλας "brightness")', formType: 'inflected-form' },
      mother: { evidence: 'direct', source: 'LSJ — μήτηρ, μητρός (f.) "mother"; nominative singular (3rd declension r-stem; cognate with Latin māter)', formType: 'inflected-form' },
      father: { evidence: 'direct', source: 'LSJ — πατήρ, πατρός (m.) "father"; nominative singular (3rd declension r-stem; parallel μήτηρ)', formType: 'inflected-form' },
      eat:    { evidence: 'direct', source: 'LSJ — ἐσθίω "eat"; present infinitive ἐσθίειν (suppletive paradigm with aorist ἔφαγον)', formType: 'inflected-form', note: 'Greek verbs cited by 1st-singular present indicative ἐσθίω in lexica; infinitive given here for consistency with Latin row' },
      drink:  { evidence: 'direct', source: 'LSJ — πίνω "drink"; present infinitive πίνειν (root *peh3- shared with Latin bibere)', formType: 'inflected-form' },
      love:   { evidence: 'direct', source: 'LSJ — ἔρως, ἔρωτος (m.) "love, desire (esp. erotic)"; nominative singular (3rd declension)', formType: 'inflected-form', note: 'Greek distinguishes ἔρως (erotic), φιλία (affection), ἀγάπη (selfless); ἔρως chosen as the prototypical "love" noun' },
      heart:  { evidence: 'direct', source: 'LSJ — καρδία, -ας (f.) "heart" (anatomical, also seat of emotion/intellect); nominative singular (1st declension)', note: 'Homeric κῆρ also exists; καρδία is the prose Attic citation form per LSJ' },
      tree:   { evidence: 'direct', source: 'LSJ — δένδρον, -ου (n.) "tree"; nominative singular (2nd declension neuter; epic δένδρεον)' },
      house:  { evidence: 'direct', source: 'LSJ — οἶκος, -ου (m.) "house, dwelling, household"; nominative singular (2nd declension; circumflex on diphthong)', formType: 'inflected-form' },
      dog:    { evidence: 'direct', source: 'LSJ — κύων, κυνός (c.) "dog" (common gender); nominative singular (3rd declension n-stem; cognate Latin canis)', formType: 'inflected-form' },
      cat:    { evidence: 'direct', source: 'LSJ — αἴλουρος, -ου (m.) "cat" (later also "weasel"); nominative singular (2nd declension)', note: 'cats were introduced to Greece relatively late; αἴλουρος originally denoted weasels and similar mustelids' },
      hand:   { evidence: 'direct', source: 'LSJ — χείρ, χειρός (f.) "hand"; nominative singular (3rd declension r-stem irregular)', formType: 'inflected-form' },
      eye:    { evidence: 'direct', source: 'LSJ — ὀφθαλμός, -οῦ (m.) "eye"; nominative singular (2nd declension; from ὄψ + θαλμ)', formType: 'inflected-form' },
      hello:  { evidence: 'direct', source: 'LSJ — χαῖρε "hail!, rejoice!"; 2nd-singular imperative of χαίρω "rejoice"; standard Greek greeting formula', formType: 'greeting-formula', note: 'plural χαίρετε for multiple addressees; common in Plato dialogues and inscriptions' },
      thanks: { evidence: 'direct', source: 'LSJ — εὐχαριστέω "give thanks"; 1st-singular present εὐχαριστῶ (contracted); the noun εὐχαριστία gives English "Eucharist"', formType: 'thanks-formula', note: 'εὐχαριστῶ is post-Classical (Hellenistic and NT Greek); Classical Attic preferred χάριν ἔχω' },
      one:    { evidence: 'direct', source: 'LSJ — εἷς, μία, ἕν "one"; masculine nominative singular εἷς (irregular declension; Smyth §349)', formType: 'inflected-form' },
      good:   { evidence: 'direct', source: 'LSJ — ἀγαθός, -ή, -όν "good, brave, noble"; masculine nominative singular (1st/2nd declension; suppletive comparative ἀμείνων/βελτίων)', formType: 'inflected-form' },
    } },
  // Katharevousa (καθαρεύουσα "the purifying [language]") — puristic literary
  // register of Greek, official language of the Greek state 1834-1976 until
  // Demotic (vernacular) replaced it. Developed by Adamantios Korais and
  // others during the Greek Enlightenment to archaize Modern Greek morpho-
  // syntax and lexicon toward Ancient/Koine norms (classical declensions,
  // dative case, optative, Ancient-derived vocab replacing Turkish/Italian/
  // Slavic loans). Polytonic script until 1982 monotonic reform. Pedagogical
  // stage: the form taught for reading 19c.-20c. Greek lit (Roidis, Papadia-
  // mantis), official documents, and ecclesiastical Greek.
  el_kath: { name: 'Greek (Katharevousa)', native: 'Καθαρεύουσα', lat: 37.98, lng: 23.73, // Athens (state administration center)
},
  egy: { name: 'Ancient Egyptian', native: '𓂋 𓈖 𓆎𓅓𓏏', lat: 25.69, lng: 32.64,
    wordEvidence: {
      n99: { evidence: 'direct',
             source: "宮川創・吉野宏志・永井正勝, 「古代エジプト語のヒエログリフ入門」第15回 (ひつじ書房, 2019-11-28), citing Gardiner 1957 and Hoch 1997: 9 = psḏ 慣読 pesedj, 90 = psḏyw 慣読 pesedjiu, and two-digit numbers are written 大きい位から順に (larger place first), with 13, 37 and 89 given as worked examples",
             note: "the IPA is the Egyptological conventional reading, not a reconstruction - which is what most of this row already uses (sḏt sedʒet, msḏr mesedʒer, fnḏ fenedʒ, nfr nefeɾ, and ḫmt(w) as xamtu). Surface is the composed sign groups U+1338E (nine V20) and U+13402 (nine Z1), matching how the row writes 𓏼 three and 𓏾 five. A reconstructed vocalisation would need Loprieno 37-39 or Allen §9.1.2 p.142, neither reachable" }
    } },
  // Audit Task 161: shifted from London to Canterbury (Chaucer-era southern
  // dialect tradition; Canterbury Tales pilgrims reflect Middle English speech).
  enm: { name: 'Middle English', native: 'Englisch', lat: 51.28, lng: 1.08,
},
  // Early Modern English (~1500–1700) — Shakespearean/King James era. Pedagogical
  // stage: the form taught for reading Shakespeare's First Folio (1623), the
  // King James Bible (1611), and Marlowe/Donne/Jonson. Pronunciation reconstructions
  // follow David Crystal's Original Pronunciation (OP) work: Great Vowel Shift
  // mid-process (long /aː oː uː/ partially shifted, /iː uː/ → diphthongs in
  // progress), pre-FOOT-STRUT split, retained /r/ in all positions.
  // Spellings standardized to Folio orthography (loue=love, fyre=fire, etc.).
  // Location: Shakespeare's Globe Theatre, Bankside, London.
  en_em: { name: 'Early Modern English', native: 'Early Moderne English', lat: 51.51, lng: -0.10,
},
  // Old English (Anglo-Saxon, Englisċ) — Germanic Western Anglo-Saxon, ~5-12th c. (extinct as L1 with Norman Conquest 1066). Reconstructed from extensive Anglo-Saxon corpus (Beowulf, Anglo-Saxon Chronicle, etc.).
  // Sources: Ethnologue 27 'ang'; Glottolog olde1238; Bosworth-Toller Anglo-Saxon Dictionary; Mitchell & Robinson (1992) Guide to Old English.
  ang: { name: 'Old English', native: 'Englisċ', lat: 51.75, lng: -1.26, // Oxford / Wessex (heartland of West Saxon literary standard)
},
  // Old Frisian — Indo-European Germanic Anglo-Frisian (sister to ang Old English; together they form the Anglo-Frisian subgroup of West Germanic). Historical (~1100-1500). Reconstructed from law codes (Skeltana-Riucht), the Riustringer Manuscript.
  // Sources: Ethnologue 27 'ofs'; Glottolog oldf1241; Bremmer (2009) An Introduction to Old Frisian.
  ofs: { name: 'Old Frisian', native: 'Aldfrysk', lat: 53.20, lng: 5.80, // Leeuwarden, Friesland (Frisian heartland)
},
  non: { name: 'Old Norse', native: 'Norrǿnt mál', lat: 59.91, lng: 10.75,

    // Audit Task 200: full per-cell wordEvidence for source-checked
    // row. Sources: Cleasby & Vigfusson (1874) Icelandic-English
    // Dictionary (cleasby-vigfusson-dictionary.vercel.app) for citation
    // forms; Faarlund (2004) The Syntax of Old Norse for grammatical
    // categorisation; Gordon (1957) Introduction to Old Norse for
    // phonology and declensions. Citation forms reflect Classical Old
    // Norse (the West Norse / Old Icelandic prestige form of the
    // 12th-13th c. saga literature). The hooked ǫ /ɔ/ and ǿ /øː/
    // diacritics follow standard normalised orthography.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Cleasby-Vigfusson — vatn (n.) "water"; nominative singular neuter strong noun' },
      fire:   { evidence: 'direct', source: 'Cleasby-Vigfusson — eldr (m.) "fire"; nominative singular masculine strong noun (a-stem with -r ending)', formType: 'inflected-form' },
      sun:    { evidence: 'direct', source: 'Cleasby-Vigfusson — sól (f.) "the sun"; nominative singular feminine i-stem; cognate Latin sōl, OE sunne' },
      moon:   { evidence: 'direct', source: 'Cleasby-Vigfusson — máni (m.) "moon, the personified Moon"; nominative singular weak masculine n-stem', formType: 'inflected-form' },
      mother: { evidence: 'direct', source: 'Cleasby-Vigfusson — móðir (f.) "mother"; nominative singular r-stem (cognate Latin māter, OE mōdor)', formType: 'inflected-form' },
      father: { evidence: 'direct', source: 'Cleasby-Vigfusson — faðir (m.) "father"; nominative singular r-stem (parallel móðir; cognate Latin pater)', formType: 'inflected-form' },
      eat:    { evidence: 'direct', source: 'Cleasby-Vigfusson — eta (V) "to eat"; infinitive of strong class V verb (preterite át, etinn)', formType: 'inflected-form', note: 'ON verbs cited by infinitive (-a / -ja); cognate OE etan, German essen' },
      drink:  { evidence: 'direct', source: 'Cleasby-Vigfusson — drekka (III) "to drink"; infinitive of strong class III verb (preterite drakk, drukku)', formType: 'inflected-form', note: 'medial geminate /kː/ from Proto-Germanic *drinkanan with later assimilation /nk/ → /kː/' },
      love:   { evidence: 'direct', source: 'Cleasby-Vigfusson — ást (f.) "love, affection"; nominative singular feminine i-stem; long ā', note: 'noun citation; the verb elska "to love" is also widely attested in saga prose' },
      heart:  { evidence: 'direct', source: 'Cleasby-Vigfusson — hjarta (n.) "heart" (anatomical and emotional); nominative singular weak neuter n-stem; breaking hj- /j/ glide', formType: 'inflected-form' },
      tree:   { evidence: 'direct', source: 'Cleasby-Vigfusson — tré (n.) "tree, wood, beam"; nominative singular neuter (irregular ja-stem); cognate OE trēow' },
      house:  { evidence: 'direct', source: 'Cleasby-Vigfusson — hús (n.) "house, dwelling"; nominative singular neuter a-stem; cognate OE hūs, German Haus' },
      dog:    { evidence: 'direct', source: 'Cleasby-Vigfusson — hundr (m.) "dog, hound"; nominative singular masculine a-stem with -r ending; cognate OE hund', formType: 'inflected-form' },
      cat:    { evidence: 'direct', source: 'Cleasby-Vigfusson — kǫttr (m.) "cat, tom-cat"; nominative singular masculine; hooked ǫ /ɔ/ from u-umlaut of /a/; geminate /tː/ from *kattuz', formType: 'inflected-form', note: 'borrowed via Latin cattus (parallel OE catt, German Katze) before the Viking Age' },
      hand:   { evidence: 'direct', source: 'Cleasby-Vigfusson — hǫnd (f.) "hand"; nominative singular feminine consonant-stem; hooked ǫ /ɔ/ from u-umlaut', formType: 'inflected-form' },
      eye:    { evidence: 'direct', source: 'Cleasby-Vigfusson — auga (n.) "eye"; nominative singular weak neuter n-stem; medial /ɣ/ intervocalic g per Gordon §61', formType: 'inflected-form' },
      hello:  { evidence: 'direct', source: 'Cleasby-Vigfusson — heill (adj.) "whole, sound, healthy"; element of greeting heill ok sæll "hale and happy"', formType: 'greeting-formula', note: 'parallel to OE wes hāl (later "wassail"); shared Germanic greeting formula based on the *health* root' },
      thanks: { evidence: 'direct', source: 'Cleasby-Vigfusson — þǫkk (f.) "thanks, gratitude"; nominative singular feminine consonant-stem; hooked ǫ from u-umlaut', formType: 'inflected-form', note: 'cognate OE þanc; pl. þakkir also common in idioms (hafa þakkir "have thanks")' },
      one:    { evidence: 'direct', source: 'Cleasby-Vigfusson — einn (num.) "one"; nominative singular masculine strong adjective; geminate /nː/ from *ainaz', formType: 'inflected-form', note: 'feminine ein, neuter eitt; cognate OE ān (whence Mod. Eng. one/an)' },
      good:   { evidence: 'direct', source: 'Cleasby-Vigfusson — góðr (adj.) "good"; nominative singular masculine strong adjective; long ó; suppletive comparative betri', formType: 'inflected-form' },
    } },
  got: { name: 'Gothic', native: '𐌲𐌿𐍄𐌹𐍃𐌺', lat: 45.05, lng: 34.10,
},
  cu: { name: 'Old Church Slavonic', native: 'Словѣньскъ', lat: 42.70, lng: 23.32,
},
  pi: { name: 'Pali', native: 'पालि', lat: 25.28, lng: 83 },
  // Pedagogical Pali (Theravada monastic recitation) — the form of Pali
  // actively recited and taught in Theravada monasteries today across Sri
  // Lanka, Myanmar, Thailand, Cambodia, Laos, and Western Buddhist centers.
  // Distinct from canonical Pali (pi, historical-attested Tipitaka corpus
  // typically written in Devanagari for academic study) by: (1) Romanized
  // notation common in international monastic pedagogy; (2) loving-kindness
  // (mettā) vocabulary preferences from canonical chanting; (3) standardized
  // pronunciation conventions taught in modern bhikkhu/bhikkhuni training,
  // distinct from regional vernacular pronunciation (Sinhala-Pali, Burmese-
  // Pali, Thai-Pali). Anchored at Anuradhapura, Sri Lanka — the historical
  // center of Theravada scholasticism where Buddhaghosa compiled the
  // Visuddhimagga commentary tradition.
  pi_edu: { name: 'Pedagogical Pali', native: 'Pāli (Theravāda)', lat: 8.31, lng: 80.40,
},
  // Maharastri Prakrit — Indo-European Indo-Aryan (Middle Indic, ~1st BCE-13th CE; main literary Prakrit alongside Pali pi). Reconstructed from Jain Agamas, Jaina Maharashtri texts.
  // Sources: Ethnologue 27 'pmh'; Glottolog maha1305; Pischel (1900) Grammatik der Prakrit-Sprachen.
  pmh: { name: 'Maharastri Prakrit', native: 'महाराष्ट्री प्राकृत', lat: 19.48, lng: 75.38, // Pratishthan/Paithan (ancient Satavahana capital and Maharastri historical literary heartland — distinct from mr Mumbai for [#14])
},
  cop: { name: 'Coptic', native: 'ⲙⲉⲧⲣⲉⲙⲛⲕⲏⲙⲉ', lat: 31.20, lng: 29.92,
    wordEvidence: {
      n99: { evidence: 'direct',
             source: "Coptic Dictionary Online (KELLIA/TLA), lemma C2921 ⲡⲥⲧⲁⲓⲟⲩ 'ninety' (Sahidic, NUM; CD 273b, CED 129, KoptHWb 153, DELC 248, ChLCS 38b), whose cited examples contain the exact numeral: ⲡⲓⲡⲥⲧⲁⲓⲟⲩⲯⲓⲥ 'the ninety-nine' in Matthew 18:12 and Luke 15:4 and 15:7",
             note: "attested whole, in running text - the parable of the lost sheep. Written as one word, ⲡⲥⲧⲁⲓⲟⲩ 90 plus ⲯⲓⲥ 9 (Sahidic; Bohairic has ⲯⲓⲧ)" }
    },
},
  arc: { name: 'Aramaic', native: 'ܐܪܡܝܐ', lat: 33.51, lng: 36.29,
},
  // Western Neo-Aramaic (Maaloula Aramaic) — Afro-Asiatic Semitic Northwest Semitic Aramaic Western (the only surviving Western Aramaic variety; sister to Eastern Aramaic varieties such as Assyrian Neo-Aramaic aii, Chaldean Neo-Aramaic, Turoyo within the broader Aramaic continuum), ~3K (critically endangered — UNESCO critically endangered after the 2013-14 Syrian War battle of Maaloula displaced most speakers), Syria (Maaloula village, Bakhah, Jubb'adin in the Anti-Lebanon mountains north of Damascus); small post-2014 refugee diaspora (Lebanon, Germany, Sweden).
  // Sources: Ethnologue 27 'amw'; Glottolog west2466; Arnold (1989-91) Das Neuwestaramäische.
  amw: { name: 'Western Neo-Aramaic', native: 'ܐܪܡܝܬ', lat: 33.83, lng: 36.55, // Maaloula village, Anti-Lebanon, Syria
},
  // Assyrian Neo-Aramaic — Eastern Aramaic, ~600K worldwide, Iraq/Iran/Syria/diaspora (USA, Sweden, Australia). Largest living Aramaic.
  // Sources: Ethnologue 27 'aii'; Glottolog assy1241; Maclean (1895) Grammar of the Dialects of Vernacular Syriac; Khan (2008) NENA studies.
  aii: { name: 'Assyrian Neo-Aramaic', native: 'ܠܫܢܐ ܐܫܘܪܝܐ', lat: 36.34, lng: 43.13, // Mosul / Nineveh Plains (historical homeland)
},
  // Turoyo (Surayt) — Central Neo-Aramaic (sister to aii Assyrian Neo-Aramaic and other Eastern Neo-Aramaic varieties), ~50K-100K, Tur Abdin Turkey homeland + Sweden/Germany/Netherlands diaspora.
  // Sources: Ethnologue 27 'tru'/'tru'; Glottolog turo1239; Jastrow (1992) Lehrbuch der Ṭuroyo-Sprache.
  tru: { name: 'Turoyo', native: 'ܛܘܪܝܐ', lat: 37.45, lng: 41.50, // Midyat, Tur Abdin, Turkey (Mardin Province)
},
  sux: { name: 'Sumerian', native: '𒅴𒂠', lat: 30.96, lng: 46.1,
    wordEvidence: {
      n99: { evidence: 'inferred',
             source: "Components from the Wikipedia Sumerian numerals table, which cites Jagersma 2010: 242-246, Sallaberger 2023 and Foxvog 2016: ilimmu 9 (explained there as ia2 'five' + limmu 'four'), ušu3 30, ĝeš2(d) 60. Composition from sumerian.neocities.org/nouns4, whose counting table runs 61-599 as the 60-sign plus the rest and states outright that 𒐕𒌋 is 70, not 600",
             note: "the whole numeral is not attested in any scholarly source I could reach - Foxvog's grammar 404s and the Leiden copy of Jagersma serves a viewer page, not the PDF. So the three parts are solidly sourced and the stacking is not. Kept because Sumerian is the only base-60 row on the map, and it stacks three systems at once: ten is a subbase, the units are quinary, and nimin 40 and ninnu 50 are subtractive" }
    } },
  akk: { name: 'Akkadian', native: '𒀝𒅗𒁺𒌝', lat: 33.34, lng: 44.4 },
  hit: { name: 'Hittite', native: '𒉈𒅆𒇷', lat: 40.02, lng: 34.61 },
  nci: { name: 'Classical Nahuatl', native: 'Nāhuatl', lat: 19.43, lng: -99.13,
    wordEvidence: {
      n99: { evidence: 'inferred',
             source: "Wiktionary Appendix:Classical Nahuatl numerals — the table gives 80 nāppōhualli, 95 nāppōhualli oncaxtōlli (80+15) and 19 caxtōlli onnāhui (15+4), but stops before 96-99",
             note: "composed from those three rows: 99 = 80 + 15 + 4, nāppōhualli oncaxtōlli onnāhui, with the on- linker the table uses at both joins. Replace if a directly attested form turns up. Worth having because it is the only row on the map that counts on fifteen: caxtōlli is a sub-base, and nine is chiucnāhui, 5+4" }
    },
},
  // Isthmus-Cosoleacaque Nahuatl (also Mecayapan-Pajapan Nahuatl) — Uto-Aztecan Nahuan, ~25K, Mexico (Veracruz — Cosoleacaque, Pajapan, Mecayapan in the Isthmus of Tehuantepec).
  // Sources: Ethnologue 27 'nhx'; Glottolog isth1238; Wolgemuth (1981) Gramática Náhuatl de Mecayapan.
  nhx: { name: 'Isthmus Nahuatl', native: 'Mexicaneru', lat: 18.00, lng: -94.63, // Mecayapan, Veracruz
},
  // Central Huasteca Nahuatl — Uto-Aztecan (Nahuan, Central Huasteca; sister to nhe Eastern Huasteca Nahuatl), ~210K, Mexico (Hidalgo — Atlapexco; Veracruz — small populations).
  // Sources: Ethnologue 27 'nch'; Glottolog cent2129; Beller & Beller (1979) Central Huasteca Nahuatl.
  nch: { name: 'Central Huasteca Nahuatl', native: 'Nahuatl', lat: 21.02, lng: -98.40, // Atlapexco, Hidalgo
},
  // Western Huasteca Nahuatl — Uto-Aztecan (Nahuan, Western Huasteca; sister to nhe/nch within Huasteca cluster), ~450K, Mexico (San Luis Potosí — Tamazunchale, Tampamolón).
  // Sources: Ethnologue 27 'nhw'; Glottolog west2632; Stiles (1985) Western Huasteca Nahuatl.
  nhw: { name: 'Western Huasteca Nahuatl', native: 'Nahuatl', lat: 21.27, lng: -98.79, // Tamazunchale, San Luis Potosí
},
  // Eastern Huasteca Nahuatl — Uto-Aztecan (Nahuan, Eastern; one of the largest modern Nahuatl varieties), ~410K, Mexico (Veracruz — Huasteca; Hidalgo — Tantoyuca, Huejutla; San Luis Potosí).
  // Sources: Ethnologue 27 'nhe'; Glottolog east2541; Hasler (1979) Eastern Huasteca Nahuatl Grammar.
  nhe: { name: 'Eastern Huasteca Nahuatl', native: 'Mexicaneru', lat: 21.42, lng: -98.25, // Tantoyuca, Veracruz Huasteca
},
  // Wixarika (Huichol) — Uto-Aztecan Corachol (sister to Cora crn within the Corachol sub-branch; more distantly related to Nahuan and Numic), ~50K, Mexico (Sierra Madre Occidental — Jalisco, Nayarit, Durango, Zacatecas highlands).
  // Sources: Ethnologue 27 'hch'; Glottolog huic1243; Iturrioz Leza & Gómez López (2006) Gramática Huichola.
  hch: { name: 'Wixarika', native: 'Wixárika niukieya', lat: 22.13, lng: -104.50, // San Andrés Cohamiata, Jalisco
},
  // Guerrero Nahuatl — Uto-Aztecan Nahuan Central (sister to Classical Nahuatl nci and Huasteca varieties nch/nhw/nhe; the major southern variety preserving Postclassic Nahuatl features), ~150K, Mexico (Guerrero state — Sierra Norte/La Montaña region — Tlapa, Olinalá, Atlixtac, Copanatoyac, Acatepec municipalities; small populations in Puebla and Morelos border areas).
  // Sources: Ethnologue 27 'ngu'; Glottolog guer1235; Lastra (1986) Las áreas dialectales del náhuatl moderno.
  ngu: { name: 'Guerrero Nahuatl', native: 'Náhuatl', lat: 17.55, lng: -98.57, // Tlapa de Comonfort, Guerrero
},
  // Nawat (Pipil) — Uto-Aztecan Nahuan (sister to other Nahuan varieties; survived as a "post-Classical" Nahuan offshoot in El Salvador for 800 years before nearly going extinct in the 1932 La Matanza massacre that targeted indigenous Salvadorans), ~500-2000 fluent (critically endangered — UNESCO critically endangered; revival via El Salvador Pipil Communities and IRIN-USAID educational programs), El Salvador (Sonsonate department — Nahuizalco, Santo Domingo de Guzmán, Cuisnahuat municipalities).
  // Sources: Ethnologue 27 'ppl'; Glottolog pipi1250; Campbell (1985) The Pipil Language of El Salvador.
  ppl: { name: 'Nawat', native: 'Nawat', lat: 13.78, lng: -89.74, // Santo Domingo de Guzmán, Sonsonate, El Salvador
},
  // Cora — Uto-Aztecan Corachol (sister to Wixarika hch within the Corachol sub-branch), ~17K, Mexico (Nayarit — Sierra del Nayar; small Jalisco populations).
  // Sources: Ethnologue 27 'crn'; Glottolog cora1260; Casad (1984) Cora.
  crn: { name: 'Cora', native: 'Naáyarite', lat: 22.13, lng: -104.93, // Jesús María, Nayarit
},
  emy: { name: 'Classical Maya', native: 'Maaya Tzij', lat: 17.22, lng: -89.62,
},
  p_ine: { name: 'Proto-Indo-European', native: 'Proto-Indo-European', lat: 47.00, lng: 39.00,
},
  // Placed north of the Tianshan rather than on either daughter's oasis. Toch A
  // sits at Karashahr (41.6, 84.9) and Toch B at Kucha (41.7, 82.95); putting
  // their common ancestor on top of one of them would read as "same place, same
  // time", which is the misreading this row exists to prevent. Tocharian
  // speakers are generally held to have entered the Tarim from the north, so
  // the round coordinates mark that approach, hypothetically — locationBasis is
  // 'approx-region', as for every other proto row.
  p_toc: { name: 'Proto-Tocharian', native: 'Proto-Tocharian', lat: 44.00, lng: 87.00,
},
  p_jpn: { name: 'Proto-Japonic', native: 'Proto-Japonic', lat: 33.60, lng: 130.40,
},
  p_kor: { name: 'Proto-Koreanic', native: 'Proto-Koreanic', lat: 37.00, lng: 127.50,
},
  ptrk: { name: 'Proto-Turkic', native: 'Proto-Turkic', lat: 48.00, lng: 100.00,
},
  pmng: { name: 'Proto-Mongolic', native: 'Proto-Mongolic', lat: 47.00, lng: 113.00,
},
  p_tun: { name: 'Proto-Tungusic', native: 'Proto-Tungusic', lat: 48.00, lng: 128.00,
},
  p_aav: { name: 'Proto-Austroasiatic', native: 'Proto-Austroasiatic', lat: 17.00, lng: 105.00,
},
  // Relabelled from Proto-Kra-Dai on 2026-08-26. The cells were Pittayaporn
  // (2009) Proto-Tai throughout except for five that were Ostapirat's Proto-
  // Kra-Dai (*balaː fish, *lipan tooth, *(ʔ)idaŋ nose, *Kudɤːk bone, *(C)əmaː
  // tongue) — Wiktionary derives the Proto-Tai *plaː and *wan from the first
  // two of those, so the row held both an ancestor and its own descendant.
  // Coordinates match the Han Map's ptai row.
  ptai: { name: 'Proto-Tai', native: 'Proto-Tai', lat: 23.00, lng: 108.00,
},
  p_hmx: { name: 'Proto-Hmong-Mien', native: 'Proto-Hmong-Mien', lat: 28.00, lng: 111.00,
},
  pafa: { name: 'Proto-Afroasiatic', native: 'Proto-Afroasiatic', lat: 13.00, lng: 40.00,
},
  pkar: { name: 'Proto-Kartvelian', native: 'Proto-Kartvelian', lat: 42.00, lng: 43.00,
},
  pmay: { name: 'Proto-Mayan', native: 'Proto-Mayan', lat: 15.50, lng: -91.00,
},
  puaz: { name: 'Proto-Uto-Aztecan', native: 'Proto-Uto-Aztecan', lat: 30.00, lng: -110.00,
},
  pban: { name: 'Proto-Bantu', native: 'Proto-Bantu', lat: 6.00, lng: 10.00,
},
  p_sit: { name: 'Proto-Sino-Tibetan', native: 'Proto-Sino-Tibetan', lat: 33.00, lng: 100.00,
},
  psem: { name: 'Proto-Semitic', native: 'Proto-Semitic', lat: 31.00, lng: 40.00,
},
  pura: { name: 'Proto-Uralic', native: 'Proto-Uralic', lat: 58.00, lng: 54.00,
},
  p_dra: { name: 'Proto-Dravidian', native: 'Proto-Dravidian', lat: 16.00, lng: 78.00,
},
  paus: { name: 'Proto-Austronesian', native: 'Proto-Austronesian', lat: 23.70, lng: 121.00,
},
  zh_song: { name: 'Classical Chinese (Song)', native: '文言(宋)', lat: 34.80, lng: 114.31,
},
  // Classroom Classical Chinese (Cantonese pedagogical reading) — the
  // standard Cantonese reading of 文言文 (Literary Chinese) as taught in
  // Hong Kong and overseas Cantonese-medium Chinese schools. Distinct from:
  // (1) zh_han / zh_tang (reconstructed Old/Middle Chinese pronunciations
  // for historical-linguistic study); (2) zh_song (de-facto Mandarin
  // pedagogical reading of Classical Chinese, despite the "Song" label);
  // and (3) ja_kanbun (Japanese kun-yomi rendering). The Cantonese 文言
  // reading is the canonical Sinitic pedagogical reading tradition outside
  // Mandarin and preserves more Middle Chinese-derived phonological
  // distinctions than Mandarin (tonal contrasts, final consonants -k/-t/-p).
  zh_wenyan_edu: { name: 'Classical Chinese (Cantonese pedagogical)', native: '文言文(粵音)', lat: 22.32, lng: 114.17, // Hong Kong
},
  zh_han: { name: 'Han Chinese', native: '漢語(漢代)', lat: 34.26, lng: 108.94,
},
  zh_tang: { name: 'Tang Chinese', native: '漢語(唐代)', lat: 34.26, lng: 108.94,
},
  ja_edo: { name: 'Japanese (Edo)', native: '江戸言葉', lat: 35.68, lng: 139.69,
},
  // Japanese Kanbun Reading (漢文訓読) — Japanese pedagogical reading tradition
  // for Classical Chinese texts (文言文) via kun-yomi (semantic readings),
  // okurigana (送り仮名 inflectional kana), and kaeriten (返り点 return marks).
  // A hybrid form: source text is Literary Chinese (lzh) but rendering follows
  // Japanese morphology, particles, and word order. Distinct from any actual
  // Chinese reading tradition and from any single stage of Japanese. Active
  // school pedagogy in modern Japan (高校漢文) and historically the channel
  // through which Confucian, Buddhist, and Tang/Song literature entered Japan
  // 8c.-19c. Anchored at Yushima Seidō (湯島聖堂), the Tokugawa Confucian
  // academy in Edo where kanbun pedagogy was institutionalized.
  ja_kanbun: { name: 'Japanese Kanbun Reading', native: '漢文訓読', lat: 35.7008, lng: 139.7679,
},
  // Audit Task 148: shifted from Kyoto Gosho (35.01, 135.77) to Heian-kyō
  // historical western palace area so ja_heian / ja_kyo / ja_chu no longer
  // cluster on a single coordinate. Heian-jingū / former 平安宮 site.
  ja_heian: { name: 'Japanese (Heian)', native: '平安京言葉', lat: 35.05, lng: 135.74,
    wordEvidence: {
      n99: { evidence: 'direct',
             source: "ja.wiktionary 九十九 lists つくも as its 和語 reading and glosses the number as 「百より一少ない数。99」, 'the number one less than a hundred'; つくもがみ is glossed 「老女のしらが」, an old woman's white hair. Locus classicus: 伊勢物語 63段, 「百年に一年たらぬつくも髪」 — hair one year short of a hundred years",
             note: "NOT the counting numeral. Heian Japanese counted 99 the way Old Japanese did, ここのそあまりここのつ (see the ojp row). つくも is a lexicalised word for the quantity, and it is here because of what it says about the number rather than how anyone counted to it: the usual etymology is 次百 tsugu-momo, 'next to a hundred', so the word names 99 by pointing at 100 — the same move as undecentum and ଅନେଶୋତ, in a language whose numerals are otherwise strictly additive" }
    },
},
  // Middle Japanese (中世日本語) — Kamakura-Muromachi (1185-1603).
  // Best attested via Heike Monogatari (~1240), Tsurezuregusa (1330),
  // and especially Vocabulario da Lingoa de Iapam (1603) compiled by
  // Jesuit missionaries — first systematic phonetic record of Japanese.
  // Phonological transitions: p- → ɸ- (and later h-); -e- diphthong-
  // simplification; verb conjugation regularization.
  // Audit Task 148: shifted to Kamakura (Kamakura-period political/cultural
  // center, ~1185-1333) since Heike Monogatari is the principal source for
  // this row. Splits the cluster of three Japanese-stage rows at Kyoto.
  ja_chu: { name: 'Middle Japanese', native: '中世日本語', lat: 35.32, lng: 139.55, // Kamakura
},
  // Proto-Ryukyuan (PR) — reconstructed common ancestor of all Ryukyuan
  // languages (Okinawan, Miyako, Yaeyama, Yonaguni). Diverged from
  // mainland Japonic ~7-8c. CE per Pellard (2015), Thorpe (1983).
  // Distinctive innovations: *teda 'sun' (vs Japonic *pi), *kimu
  // 'heart/liver' (vs Japonic *kokoro), *maja 'cat' (vs *neko).
  // CITATION AUDIT 2026-08-07. This row cited "Pellard 2015" on seven
  // reconstructions and on its divergence date. The full text of that chapter
  // (open access, hal-01289257) contains NONE of the forms: amma, teda, maja,
  // kimu, pitu, ura all appear zero times. Its asterisked forms are crop and
  // livestock vocabulary (*awa millet, *ine rice, *uma horse, *usi cow,
  // *patake field), which is what an archaeology chapter would use.
  // Nor does it date the split to 7-8c: it argues the split cannot be LATER
  // than the 10th century, lists estimates from 500 CE (Hattori) to 996 CE
  // (Unger), and ties settlement to the Proto-Gusuku period, 10-12th c.
  // The forms themselves look sound — the modern reflexes are real — but the
  // attributions were not. Raised by the owner from a reader question.
  // The dating in the description was corrected in all 19 languages the same
  // day; the per-cell attributions were corrected first.
  p_ryu: { name: 'Proto-Ryukyuan', native: 'Proto-Ryukyuan', lat: 28.40, lng: 129.50, // Amami area (Japonic-Ryukyuan boundary; geographic midpoint of Ryukyuan dispersal)

    wordEvidence: {
      sun:    { evidence: 'reconstructed', source: 'reconstructed from the modern reflexes; cf. Okinawan tida, Miyako tida (distinctive Ryukyuan; mainland Japonic uses *pi)' },
      heart:  { evidence: 'reconstructed', source: 'Thorpe 1983 — *kimu (肝 "liver/heart"); cf. Miyako kimu (Ryukyuan retains "liver" semantics where mainland Japonic shifted to kokoro)' },
      cat:    { evidence: 'reconstructed', source: 'reconstructed from the modern reflexes; cf. Okinawan/Miyako majaː (distinctive Ryukyuan; not cognate to mainland *neko)' },
      mother: { evidence: 'reconstructed', source: 'reconstructed from the modern reflexes; cf. Okinawan ammaː, Miyako amma' },
      water:  { evidence: 'reconstructed', source: 'Cognate with Japonic *midu' },
      one:    { evidence: 'reconstructed', source: 'reconstructed from the modern reflexes; cf. OJ pïtötu, modern Japanese hitotsu' },
    } },
  // Audit Task 161: shifted from Seoul (37.57, 126.98) to Gaegyeong/Kaesong
  // (Goryeo dynasty capital, where Middle Korean was the prestige variety)
  ko_mid: { name: 'Medieval Korean', native: '中世韓國語', lat: 37.97, lng: 126.55,
},
  // Old Korean (Silla period, 7-10c.) — direct ancestor of Korean.
  // Attested via 25 hyangga (郷歌) poems in Samguk Yusa + Gyunyeo's
  // biography, plus idu/hyangchal records and personal/place names
  // in Samguk Sagi. Hyangchal used Chinese characters for both
  // semantic and phonetic readings; reconstruction follows Lee KM
  // (1993, 2003), Sohn (1999), Whitman (2015).
  oko: { name: 'Old Korean (Silla)', native: '古代韓國語', lat: 35.85, lng: 129.22, // Gyeongju (Silla capital)
    // Surface uses Hyangchal/Idu 当て字 (phonetic borrowings) where attested
    // in idu/hyangga corpus; semantic borrowings + phonetic suffix where the
    // hybrid pattern is well-documented (e.g. 一等 for hʌnah). Pure semantic
    // characters used only where no phonetic attestation exists.

    wordEvidence: {
      water:  { evidence: 'reconstructed', source: 'Wiktionary/Old Korean 勿 *mul, a water element in first-millennium southern place names; Jilin leishi (1103) writes it 沒', note: 'was *muɾu. The final vowel had no support. 勿 is a single phonogram (MC *mjut, Sino-Korean 물) with NO 末音添記 — under that convention a disyllable would be spelled 勿理 or the like, exactly as this row spells moon 月羅理 and two 二肹. The row\'s own fire 弗 *puɾ is the same kind of graph and carries no final vowel. It was also the only stage with one: pko is *mɨr and ko_mid is 믈 mɯl, so the vowel appeared and vanished again. Disyllabic pre-Korean reconstructions of this word do exist, but they belong to the proto stage, not to 7-10c Silla, and the open-syllable hypothesis for Old Korean is itself contested (coda consonants are attested early)' },
      moon:   { evidence: 'reconstructed', source: 'Lee KM 2003 — *tʌrh attested in hyangga 月隠 → MK ᄃᆞᆯ → 달' },
      one:    { evidence: 'reconstructed', source: 'Hyangga 一念惡寸; → MK ᄒᆞ나 → 하나' },
      house:  { evidence: 'direct', source: 'Idu/hyangchal 家=cip; → MK 집' },
      heart:  { evidence: 'reconstructed', source: 'Hyangga 心音 (logogram + 音 as 末音添記 for the -m coda) → MK ᄆᆞᅀᆞᆷ mʌzʌm → 마음', note: 'was *məsʌm. 心音 spells no vowels at all, so both are projected back from MK ᄆᆞᅀᆞᆷ, which has ㆍ in both syllables — the cell disagreed with its own second syllable and with pko *mʌzʌm. The s (not z) is kept: ᅀ is generally taken to postdate this stage' },
      mother: { evidence: 'direct', source: '伊藤英人 (2012)「古代・前期中世朝鮮語における名詞化」東京外国語大学論集 85, ex. 45 — glosses 安民歌 (756) 臣隠愛賜尸母史也 as 臣-ɨn tʌz-ʌ-si-r əzi-i-ə, 「臣は愛しなさる親であり」. 母史 = 末音添記, logogram 母 + phonogram 史', note: 'THE LEXEME IS BROADER THAN THE CELL. Itō glosses əzi as 親 "parent", and that is what it becomes in MK (어시). The mother reading here rests on the line\'s own contrast — 君隱父也 against 臣隱…母史也 — and on the scribe choosing 母 as the semantic character. The word for "mother" proper, 어미, is first attested as 丫彌 in the 鷄林類事 (1103) and sits on ko_gor. History of this cell: it read 阿米 *əmi, which is attested nowhere; it was then briefly blanked on the false belief that Silla attested nothing; then restored as *əsi. Now *əzi — Itō writes z, so the ᅀ of MK 어△ㅣ is taken to be already present at this stage, which is the opposite of the call made for ko_mid 食 and is worth revisiting there. Raised by @Gutascii (X); the Itō paper supplied by the owner' },
      father: { evidence: 'reconstructed', source: '安民歌 (756 CE) — 君隱父也, 父 as a logogram; reading projected from MK 아비 àpí', note: 'the cell previously read 阿比, which is not attested. 父 here is a pure semantic character with no phonogram attached, so it fixes the meaning and the date but not the pronunciation — per this row\'s stated convention, semantic characters are used where no phonetic attestation exists. *api matches MK 아비 (ㅏ), which is genuinely a different vowel from mother\'s ㅓ' },
      cat:    { evidence: 'disputed', note: 'no Old Korean form attested; later 고양이 < 高揚 + suffix is post-medieval' },
      hello:  { evidence: 'disputed', note: 'Silla/Old Korean greeting formula not preserved in hyangga corpus' },
      thanks: { evidence: 'disputed', note: 'no Old Korean thanks formula attested; native 고맙- < later strata' },
    } },
  // Goguryeo (高句麗) — extinct language of the northern Three Kingdoms
  // state (1c. BCE - 668 CE). Status hotly debated: Beckwith (2004),
  // Vovin (2013), Whitman (2011) propose Japonic affiliation based on
  // famous numeral cognates (3=密 mil ↔ OJ mi; 5=于次 uci ↔ OJ itu;
  // 7=難隱 nanǝn ↔ OJ nana; 10=徳 tǝk ↔ OJ töwo); other scholars
  // (Lee, Vovin earlier) place it as a sister to Korean. Corpus is
  // ~80 toponyms in Samguk Sagi (Geography vol. 37) — almost no
  // basic-vocabulary attestation. Most cells deliberately '—' to
  // honestly reflect this fragmentary state.
  h_goguryeo: { name: 'Goguryeo', native: '高句麗語', lat: 41.13, lng: 126.19, // Gungnae-seong (Ji'an, early Goguryeo capital)

    wordEvidence: {
      water: { evidence: 'reconstructed', source: 'Samguk Sagi vol. 37 — 水谷城 (買旦忽); 買 read as Goguryeo *mai/*me — debated cognate (Whitman 2011: ↔ Old Japanese *mey "water"; Lee 1993: ↔ Tungusic mu)' },
    } },
  // Goryeo Korean (Early Middle Korean, 918-1392). Primary corpus is
  // 鶏林類事 (Gyerim Yusa, 1103) by 孫穆 — ~350 Korean words transcribed
  // in Chinese characters as a Chinese-Korean glossary. Reconstructions
  // follow Lee KM, Sasse (1976), Sohn (1999).
  // mother 丫彌 and father 丫秘 were added 2026-08-07 from the 鷄林類事,
  // the same source every other cell in this row comes from. They had been
  // sitting on the Silla row under invented graphs (阿米 / 阿比); reported by
  // @Gutascii (X).
  ko_gor: { name: 'Goryeo Korean (Early Middle)', native: '高麗時代韓國語', lat: 37.97, lng: 126.55, // Kaesong (Goryeo capital)
    wordEvidence: {
      n99:    { evidence: 'inferred',
                source: "鷄林類事 (1103) 九曰鴉好 ahop 'nine' and 九十曰鴉訓 ahon 'ninety', in a decade run reading 十曰噎, 二十曰戌沒, 三十曰實漢 … 八十曰逸頓, 九十曰鴉訓, 百曰醞",
                note: "the source gives 90 and 9 separately and has NO entry for 99 — the run jumps from 九十 straight to 百 — so this cell is the two joined. Same shape at every later stage: Middle Korean 아ᄒᆞᆫ아홉, modern 아흔아홉. Old Korean is left empty on purpose: per Lee & Ramsey only 1, 2 and 1000 have a recoverable Silla-period pronunciation, so nine and ninety cannot be carried back that far" },
      water:  { evidence: 'direct', source: '鶏林類事 (1103) 沒 mwol; cf. MK 믈 → 물' },
      fire:   { evidence: 'direct', source: '鶏林類事 孛 pwol; cf. MK 블 → 불' },
      sun:    { evidence: 'direct', source: '鶏林類事 姮 (= 害) hai; cf. modern 해' },
      moon:   { evidence: 'direct', source: '鶏林類事 突 twol; cf. MK ᄃᆞᆯ → 달' },
      tree:   { evidence: 'direct', source: '鶏林類事 南記 nam-ki; cf. MK 나모 → 나무' },
      house:  { evidence: 'direct', source: '鶏林類事 集 cip; cf. MK 집' },
      dog:    { evidence: 'direct', source: '鶏林類事 家稀 ka-hi; cf. MK 가히 → 개' },
      hand:   { evidence: 'direct', source: '鶏林類事 遜 swon; cf. MK 손' },
      eye:    { evidence: 'direct', source: '鶏林類事 嫩 nwun; cf. MK 눈' },
      one:    { evidence: 'direct', source: '鶏林類事 河屯 ha-twun; cf. MK ᄒᆞ나 → 하나' },
    } },
  // Audit Task 161: shifted from Seoul (37.57, 126.98) to Suwon (Joseon-era
  // regional prestige center) so Korean stages no longer cluster at Seoul.
  ko_em: { name: 'Early Modern Korean', native: '近世韓國語', lat: 37.27, lng: 127.01,
},
  // Vietnamese Sino-reading of Classical Chinese (Hán văn) — the Sino-
  // Vietnamese pronunciation tradition for reading Literary Chinese (lzh)
  // texts in pre-modern Vietnam. The third major East Asian Sino-reading
  // tradition alongside Japanese kanbun (ja_kanbun), Korean hanmun, and
  // Cantonese pedagogical (zh_wenyan_edu). Distinct from chữ Nôm (vi_nom,
  // the demotic Sino-Vietnamese script for native Vietnamese morphemes)
  // — vi_han reads Chinese characters in Classical Chinese order with
  // Sino-Vietnamese pronunciation, not Vietnamese morphology. Used in
  // Confucian education at Văn Miếu Quốc Tử Giám (Temple of Literature,
  // Hanoi) from the 11th c. to 1919 abolition; survives in modern
  // Vietnamese historical-Confucian curriculum.
  vi_han: { name: 'Vietnamese Hán văn (Sino-reading)', native: 'Hán văn (漢文)', lat: 21.03, lng: 105.84, // Văn Miếu, Hanoi
},
  vi_nom: { name: 'Vietnamese Chữ Nôm', native: 'Tiếng Việt (Chữ Nôm)', lat: 21.03, lng: 105.85,
},
  // === Constructed Languages ===
  eo: { name: 'Esperanto', native: 'Esperanto', lat: 53.13, lng: 23.16, // Białystok, Poland (L. L. Zamenhof's birthplace)
},
  // Volapük — first widely-adopted IAL (Schleyer 1879, predates Esperanto)
  vo: { name: 'Volapük', native: 'Volapük', lat: 47.71, lng: 9.20, // Litzelstetten (Schleyer's home)
},
  // Interlingua — naturalistic IAL (IALA 1951)
  ia: { name: 'Interlingua', native: 'Interlingua', lat: 40.75, lng: -73.99, // New York Midtown (slight offset from ina ISO 639-3 anchor for [#15] visual separation; same language)
},
  tok: { name: 'Toki Pona', native: 'toki pona', lat: 43.65, lng: -79.38, // Toronto (Sonja Lang's residence)
},
  tlh: { name: 'Klingon', native: 'tlhIngan Hol', lat: 34.10, lng: -118.34, // Hollywood / Paramount Pictures (Star Trek franchise origin)
},
  jbo: { name: 'Lojban', native: 'la .lojban.', lat: 38.85, lng: -77.31, // Fairfax, Virginia (Logical Language Group HQ)
},
  // === Phase 2: high-population missing languages ===
  // Sinitic (Chinese varieties)
  cjy: { name: 'Jin (Shanxi)', native: '晋语', lat: 37.87, lng: 112.55, // Taiyuan
},
  hsn: { name: 'Xiang (Hunan)', native: '湘语', lat: 28.20, lng: 112.97, // Changsha
},
  gan: { name: 'Gan (Jiangxi)', native: '赣语', lat: 28.68, lng: 115.86, // Nanchang
},
  // Indo-Aryan (large missing)
  mai: { name: 'Maithili', native: 'मैथिली', lat: 26.15, lng: 85.90, // Darbhanga
},
  // Angika — Indo-European Indo-Aryan (Magadhan, sister to mai Maithili and bho Bhojpuri), ~7M, India (Bihar — Bhagalpur, Munger; Jharkhand — Santhal Pargana; small Nepal Terai).
  // Sources: Ethnologue 27 'anp'; Glottolog angi1238; Yadav (1996) Maithili-Angika comparative grammar.
  anp: { name: 'Angika', native: 'अंगिका', lat: 25.24, lng: 86.97, // Bhagalpur, Bihar (historical Anga kingdom)
},
  awa: { name: 'Awadhi', native: 'अवधी', lat: 26.78, lng: 82.13, // Ayodhya
},
  // Tharu (Rana Tharu / Dangaura Tharu) — Indo-European Indo-Aryan (closely related to Bhojpuri bho, Maithili mai, Awadhi awa within Eastern Indo-Aryan; some scholars classify as Outer Indo-Aryan due to peripheral position), ~2M, Nepal (Terai lowlands — Dang, Banke, Bardiya, Kailali, Kanchanpur districts) + India (Uttar Pradesh, Uttarakhand Terai). Dialect cluster spanning multiple ISO codes ('thr' Rana, 'thq' Kochila, 'thl' Dangaura, etc.).
  // Sources: Ethnologue 27 'thr'; Glottolog rana1247 / dang1240; Boehm (1998) The Tharu of Bardiya National Park.
  thr: { name: 'Tharu', native: 'थारू', lat: 28.10, lng: 81.62, // Tulsipur, Dang District, Nepal
},
  // Braj Bhasha — Indo-Aryan, Krishna-devotional literary language of medieval North India.
  // Sources: Ethnologue 27 'bra'; Glottolog braj1242; Snell (1991) The Hindi Classical Tradition.
  bra: { name: 'Braj Bhasha', native: 'ब्रज भाषा', lat: 27.50, lng: 77.67, // Mathura/Vrindavan (Krishna heartland)
},
  skr: { name: 'Saraiki', native: 'سرائیکی', lat: 30.20, lng: 71.47, // Multan
},
  // Munda (Austroasiatic)
  sat: { name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', lat: 24.27, lng: 87.25, // Dumka, Jharkhand
},
  // Kurukh — Northern Dravidian, ~2M speakers, Jharkhand/West Bengal/Odisha + Bangladesh + Nepal.
  // Sources: Ethnologue 27 'kru'; Glottolog kuru1301; Hahn (1900) Kurukh Grammar.
  kru: { name: 'Kurukh', native: 'कुड़ुख', lat: 23.34, lng: 85.31, // Ranchi, Jharkhand
},
  // Austronesian — Indonesia & Philippines
  mad: { name: 'Madurese', native: 'Madhurâ', lat: -7.16, lng: 113.47, // Pamekasan
},
  hil: { name: 'Hiligaynon', native: 'Ilonggo', lat: 10.72, lng: 122.56, // Iloilo
},
  // Chavacano (Zamboangueño) — Spanish-based creole (only Asian Spanish creole), ~700K, Philippines (Zamboanga City + Mindanao).
  // Sources: Ethnologue 27 'cbk'; Glottolog chav1241; Lipski (2001) Chabacano/Spanish; Forman (1972) Zamboangueño Texts.
  cbk: { name: 'Chavacano', native: 'Chavacano', lat: 6.92, lng: 122.07, // Zamboanga City
},
  // Iranian
  bal: { name: 'Balochi', native: 'بلوچی', lat: 30.18, lng: 67.00, // Quetta
},
  // Niger-Congo (West African)
  ak: { name: 'Akan (Twi)', native: 'Akan', lat: 6.69, lng: -1.62, // Kumasi
},
  // Adangme — Niger-Congo Kwa (Ga-Adangme), ~1M speakers, southeastern Ghana coastal plain.
  // Sources: Ethnologue 27 'ada'; Glottolog adan1247; Kropp Dakubu (1987) Adangme grammar.
  ada: { name: 'Adangme', native: 'Dangme', lat: 6.07, lng: 0.10, // Ada Foah, Greater Accra
},
  // Ga — Niger-Congo Kwa (Ga-Adangme, sister to Adangme ada within the Ga-Adangme branch; the urban prestige variety of southern Ghana, especially Greater Accra), ~750K, Ghana (Greater Accra Region — Accra, Tema, surrounding Ga traditional areas; small Togo border populations).
  // Sources: Ethnologue 27 'gaa'; Glottolog gaaa1244; Kropp Dakubu (2002) Ga English Dictionary.
  gaa: { name: 'Ga', native: 'Gã', lat: 5.55, lng: -0.20, // Accra (Ga heartland)
},
  // Nzima — Niger-Congo Kwa Bia (sister to Ahanta and more distantly to ak Akan within the Bia/Volta-Comoé branch), ~330K, Ghana (Western Region — Nzema East/West districts) + Côte d'Ivoire (Aboisso area).
  // Sources: Ethnologue 27 'nzi'; Glottolog nzim1241; Annan (1994) Nzema Phonology and Morphology.
  nzi: { name: 'Nzima', native: 'Nzɛma', lat: 4.85, lng: -2.49, // Axim, Western Region, Ghana
},
  // South Slavic
  mk: { name: 'Macedonian', native: 'Македонски', lat: 41.99, lng: 21.43, // Skopje
},
  // === Phase 3A: African languages (Bantu, West African, Berber) ===
  // Bantu (East / Southern / Central)
  lg: { name: 'Luganda', native: 'Luganda', lat: 0.31, lng: 32.58, // Kampala
},
  // Zande — Niger-Congo Ubangian (sister to Nzakara and the Ngbandi-Sango cluster within Ubangian; not Bantu despite Central African location), ~1.1M, South Sudan (Western Equatoria, Yambio area) + Democratic Republic of Congo (Bas-Uélé/Haut-Uélé) + Central African Republic (Mbomou Prefecture). Famous as the subject of E.E. Evans-Pritchard's classic 1937 anthropological monograph "Witchcraft, Oracles and Magic Among the Azande".
  // Sources: Ethnologue 27 'zne'; Glottolog zand1257; Tucker (1959) Le Groupe Linguistique Zandé.
  zne: { name: 'Zande', native: 'Pa-Zande', lat: 4.57, lng: 28.40, // Yambio, Western Equatoria, South Sudan
},
  // Masaaba (Lugisu) — Bantu JE31, ~3M, Mt Elgon eastern Uganda. 4th-largest Ugandan language.
  // Sources: Ethnologue 27 'myx'; Glottolog masa1320; Brown (1972) Lumasaaba grammar.
  myx: { name: 'Masaaba', native: 'Lumasaaba', lat: 1.08, lng: 34.18, // Mbale, Mt Elgon
},
  // Bukusu (Lubukusu) — Bantu JE31c (Luhya cluster), ~750K-1.4M, Bungoma County Kenya. Sister to Masaaba (myx).
  // Sources: Ethnologue 27 'bxk'; Glottolog buku1249; Mutonyi (2000) Aspects of Bukusu morphology.
  bxk: { name: 'Bukusu', native: 'Lubukusu', lat: 0.57, lng: 34.56, // Bungoma, Kenya
},
  ki: { name: 'Kikuyu', native: 'Gĩkũyũ', lat: -1.17, lng: 36.83, // Kiambu, Kenya
},
  // Meru — Bantu E54, Kenya, ~2M speakers; closely related to Kikuyu (ki) within the
  // Kenyan Mount-Kenya Bantu cluster. Sources: Lindblom (1914); Bennett (1985).
  mer: { name: 'Meru', native: 'Kĩmĩĩru', lat: 0.05, lng: 37.65, // Meru town
},
  // Kamba — Kenyan Bantu E70 (Audit Task 149 Batch 3 partial)
  kam: { name: 'Kamba', native: 'Kĩkamba', lat: -1.52, lng: 37.27, // Machakos
},
  // Embu — Bantu E52, Mount Kenya cluster, ~430K speakers, Kenya. Sister to Meru (mer) and Kikuyu (ki).
  // Sources: Ethnologue 27 'ebu'; Glottolog embu1242.
  ebu: { name: 'Embu', native: 'Kĩembu', lat: -0.53, lng: 37.45, // Embu
},
  tn: { name: 'Tswana', native: 'Setswana', lat: -24.65, lng: 25.91, // Gaborone
},
  st: { name: 'Sesotho', native: 'Sesotho', lat: -29.31, lng: 27.49, // Maseru
},
  ts: { name: 'Tsonga', native: 'Xitsonga', lat: -23.30, lng: 30.71, // Giyani (Limpopo Tsonga heartland)
},
  ve: { name: 'Venda', native: 'Tshivenḓa', lat: -22.95, lng: 30.49, // Thohoyandou
},
  bem: { name: 'Bemba', native: 'ChiBemba', lat: -10.21, lng: 31.18, // Kasama
},
  // Kaonde (Kikaonde) — Bantu L41, ~400K, North-Western Province Zambia. National language of Zambia.
  // Sources: Ethnologue 27 'kqn'; Glottolog kaon1241; Wright (1985) Kaonde-English Dictionary.
  kqn: { name: 'Kaonde', native: 'Kikaonde', lat: -13.99, lng: 25.83, // Solwezi, NW Zambia
},
  lua: { name: 'Luba-Kasai', native: 'Cilubà', lat: -6.13, lng: 23.59, // Mbuji-Mayi
},
  kg: { name: 'Kikongo', native: 'Kikongo', lat: -5.81, lng: 13.46, // Matadi
},
  // Mongo (Lomongo) — Bantu C61, Equateur Province DRC, ~400K-500K speakers along the Congo River.
  // Sources: Ethnologue 27 'lol'; Glottolog mong1338; Hulstaert (1957) Dictionnaire Lomongo-français.
  lol: { name: 'Mongo', native: 'Lomongo', lat: 0.51, lng: 18.97, // Mbandaka
},
  // Tetela — Bantu C71, ~750K, Sankuru region central DRC. Patrice Lumumba's mother tongue.
  // Sources: Ethnologue 27 'tll'; Glottolog tete1259; Hagendorens (1956) Dictionnaire Otetela.
  tll: { name: 'Tetela', native: 'Otetela', lat: -4.74, lng: 24.05, // Kindu/Lodja, Kasai-Oriental
},
  // West African (Niger-Congo Atlantic / Mande)
  ff: { name: 'Fula', native: 'Fulfulde', lat: 12.65, lng: -7.99, // Bamako (representative)
},
  bm: { name: 'Bambara', native: 'Bamanankan', lat: 12.65, lng: -7.99, // Bamako
},
  // Donno So (Kamba So) — Niger-Congo Atlantic-Congo Dogon (sister to Toro So, Toro Tegu, Tommo So within the Dogon family of Mali — Dogon is a small distinctive language family of central Mali on the Bandiagara escarpment, with ~13 distinct Dogon languages historically; the type-language for the Dogon people internationally famous for their Bandiagara cliff dwellings, traditional cosmology, and the role of French anthropologist Marcel Griaule's mid-20th c ethnography), ~50K, Mali (Mopti region — Bandiagara escarpment, Dourou, Sangha villages).
  // Sources: Ethnologue 27 'dds'; Glottolog donn1238; Plungian (1995) Dogon.
  // Code corrected ddn -> dds on 2026-08-26: ISO 639-3 'ddn' is Dendi, a Songhay
  // language of Benin. Three cells (blood, tongue, tooth) had been filled from the
  // Songhay rows and a fourth (night) from Dendi itself; all four re-sourced from
  // four independent Donno So wordlists in ASJP (sources 2277/2323/2324/2325).
  dds: { name: 'Donno So', native: 'Dogosò', lat: 14.35, lng: -3.61, // Bandiagara, Mali (Dogon cultural heart along the escarpment)
},
  // Eastern Maninka — Niger-Congo Mande Western Manding (sister to Bambara bm and Western Maninka mlq within the Manding cluster; the prestige variety of Guinea — basis of Guinean state cultural projects), ~3M+, Guinea (Upper Guinea — Kankan, Faranah, Siguiri prefectures, the historical Mali Empire heartland) + small populations in Mali, Côte d'Ivoire, Senegal, Liberia, Sierra Leone.
  // Sources: Ethnologue 27 'emk'; Glottolog east2542; Spears (1965) The Structure of Faranah-Maninka.
  emk: { name: 'Eastern Maninka', native: 'Maninkakan', lat: 10.39, lng: -9.31, // Kankan, Upper Guinea (Maninka heartland)
},
  // Xaasongaxango (Khassonké, Xaasonga) — Niger-Congo Mande Western (sister to Bambara/Maninka in the Manding cluster), ~120K, Mali (Kayes Region — Khasso area).
  // Sources: Ethnologue 27 'kao'; Glottolog xaas1235; Tellier (1898) Khassonké lexicon.
  kao: { name: 'Xaasongaxango', native: 'Xaasongaxango', lat: 14.45, lng: -11.43, // Kayes, Mali
},
  // Soninke — Niger-Congo Mande, ~2.1M speakers, Mali/Senegal/Mauritania Sahel.
  // Sources: Ethnologue 27 'snk'; Glottolog soni1259; Diagana (1995) Soninke phonology.
  snk: { name: 'Soninke', native: 'Sooninkanxannen', lat: 14.92, lng: -10.81, // Kayes, Mali (Soninke heartland)
},
  // Kita Maninkakan — Niger-Congo Mande Western Manding (sister to Bambara/Maninka/Dyula/Kao), ~430K, Mali (Kita Region — south-central, Cercle de Kita).
  // Sources: Ethnologue 27 'mwk'; Glottolog kita1244; Vydrin (2009) Manding language family.
  mwk: { name: 'Kita Maninkakan', native: 'Maninkakan', lat: 13.04, lng: -9.49, // Kita, Mali
},
  // Western Maninkakan (Maninka of Guinea) — Niger-Congo Mande Western Manding (sister to bm Bambara/mwk Kita Maninka), ~750K-1M, Mali (south) + Guinea (Kankan, Faranah) + Senegal (Tambacounda).
  // Sources: Ethnologue 27 'mlq'; Glottolog west2421; Vydrin (2009) Manding language family.
  mlq: { name: 'Western Maninkakan', native: 'Maninkakan', lat: 10.39, lng: -9.30, // Kankan, Guinea (Maninka cultural center)
},
  // Mano (Maa) — Niger-Congo Mande Southeast (Eastern Mande, sister to dnj Dan Yacouba), ~400K, Liberia (Nimba County) + Guinea (Forest Region) + Côte d'Ivoire (border).
  // Sources: Ethnologue 27 'mev'; Glottolog mano1276; Khachaturyan (2015) A Grammar of Mano.
  mev: { name: 'Mano', native: 'Maa', lat: 7.68, lng: -8.88, // Sanniquellie, Nimba County, Liberia
},
  // Dan (Yacouba) — Niger-Congo Mande, ~1.6M speakers, western Côte d'Ivoire + Liberia.
  // Sources: Ethnologue 27 'dnj'; Glottolog yacu1238; Erman (2005) Dan tone system.
  dnj: { name: 'Dan', native: 'Yacouba', lat: 7.41, lng: -7.55, // Man, Côte d'Ivoire (Dan heartland)
},
  // Koyraboro Senni (Eastern Songhai) — Mali, Saharan trade-corridor
  // (Audit Task 149 Batch 3). Heath (1999) per cell.
  ses: { name: 'Koyraboro Senni', native: 'Koyraboro Senni', lat: 16.27, lng: -0.05, // Gao
},
  // Koyra Chiini (Western Songhai) — Songhai (sister to Eastern Songhai including ses Koyraboro Senni and zarma), ~200K, Mali (Timbuktu region — Niger River bend).
  // Sources: Ethnologue 27 'khq'; Glottolog koyr1240; Heath (1999) A Grammar of Koyra Chiini.
  khq: { name: 'Koyra Chiini', native: 'Koyra Chiini', lat: 16.77, lng: -3.01, // Timbuktu, Mali
},
  // Zarma — Southern Songhai, ~3M speakers, Niger; sister to Koyraboro Senni (Eastern Songhai).
  // Sources: Tersis (1972) Le Zarma; SIL Niger language survey.
  dje: { name: 'Zarma', native: 'Zarmaciine', lat: 13.51, lng: 2.11, // Niamey
},
  // Berber (Afro-Asiatic)
  kab: { name: 'Kabyle', native: 'Taqbaylit', lat: 36.71, lng: 4.05, // Tizi Ouzou
},
  // === Phase 3C: Indigenous Americas ===
  // Mayan
  // (quc K'iche' / kek Q'eqchi' moved to later block — see end of LANG_DATA, audit §6.28 dedup Session 4)
  yua: { name: 'Yucatec Maya', native: 'Maya tʼaan', lat: 20.97, lng: -89.62, // Mérida
},
  // Deaf-community sign language (Central America, no genetic relation to other sign languages)
  // Nicaraguan Sign Language (ISN, Idioma de Señas de Nicaragua) is the most studied case of a brand-new
  // language emerging in real time: it arose SPONTANEOUSLY in the late 1970s / early 1980s when Nicaragua
  // first concentrated deaf children in newly established schools in Managua. The first cohort developed
  // a rudimentary contact pidgin; each subsequent generation of children — receiving that input from older
  // peers — added grammatical structure (verb agreement, spatial reference, classifier morphology) until
  // by the early 1990s a fully structured natural language with native signers had emerged from scratch.
  // (Kegl, Senghas & Coppola 1999; Senghas, Kita & Özyürek 2004; Pyers, Shusterman, Senghas, Spelke &
  // Emmorey 2010.) The community is ~3000-5000 signers, centered on Managua. ISN has no everyday written
  // form — academic writing uses SignWriting or glossed Spanish; the basic-vocab cells are NOT meaningfully
  // representable as written single strings, so every cell is left '—' under dataStatus:'fragmentary'.
  // Sources: Kegl, Judy, Ann Senghas & Marie Coppola (1999) "Creation through contact: Sign language
  // emergence and sign language change in Nicaragua" in DeGraff (ed.) Language Creation and Language
  // Change (MIT Press); Senghas, Ann, Sotaro Kita & Asli Özyürek (2004) "Children creating core
  // properties of language: Evidence from an emerging sign language in Nicaragua" Science 305:1779-1782;
  // Pyers et al. (2010) "Number cognition and the language of Nicaraguan signers" Psychological Science;
  // Glottolog nica1238; Ethnologue 27 'ncs'.
  ncs: { name: 'Nicaraguan Sign Language', native: 'Idioma de Señas de Nicaragua', lat: 12.13, lng: -86.25, // Managua
},
  // Itzá Maya — Mayan Yucatecan (sister to Yucatec yua and Mopan within the Yucatecan branch; the language of the historic Itzá Maya kingdom of Tayasal that was the last independent Maya state until Spanish conquest in 1697 — Tayasal/Petén Itzá fell 200+ years after the rest of the Maya world), ~1K (critically endangered — UNESCO critically endangered; only elderly speakers remain, primarily in San José village), Guatemala (Petén department — San José Petén, the last Itzá-speaking village on the Petén Itzá lake).
  // Sources: Ethnologue 27 'itz'; Glottolog itza1241; Hofling (1991) Itzá Maya Texts.
  itz: { name: 'Itzá Maya', native: "Itzaj T'an", lat: 16.97, lng: -89.95, // San José, Petén, Guatemala (the historic Tayasal site on Lake Petén Itzá)
},
  // Uspanteko — Mayan K'ichean (sister to K'iche', Tz'utujil, Kaqchikel, Sakapulteko within the K'ichean branch; the only Mayan language with grammatical tone), ~5K (endangered — UNESCO definitely endangered), Guatemala (El Quiché department — Uspantán municipality in the highlands north of Sacapulas).
  // Sources: Ethnologue 27 'usp'; Glottolog uspa1245; Bennett (2009) Uspanteko Phonology and Phonetics.
  usp: { name: 'Uspanteko', native: "Tz'unun K'iche'", lat: 15.34, lng: -90.87, // Uspantán, El Quiché, Guatemala
},
  tzo: { name: 'Tzotzil', native: 'Batsʼi kʼop', lat: 16.74, lng: -92.64, // San Cristóbal
},
  // Tzeltal — direct Mayan sister to Tzotzil (Audit Task 141)
  tzh: { name: 'Tzeltal', native: 'Batsʼil kʼop', lat: 16.91, lng: -92.10, // Ocosingo
},
  // Oto-Manguean
  mixtec: { name: 'Mixtec', native: 'Tu\'un Sávi', lat: 17.27, lng: -97.69, // Tlaxiaco
},
  zap: { name: 'Zapotec', native: 'Diidxazá', lat: 16.43, lng: -95.02, // Juchitán
},
  // Tlacolula Zapotec (San Juan Guelavía / Valley Zapotec) — Otomanguean (Zapotecan, Central Zapotec — sister to Isthmus zap and Sierra Norte varieties within the Zapotec language complex), ~6K, Mexico (Oaxaca — Tlacolula Valley east of Oaxaca City; San Juan Guelavía, Tlacolula de Matamoros).
  // Sources: Ethnologue 27 'zts'; Glottolog tlac1241; Munro & Lopez et al. (1999) Di'csyonaary X:tee'n Dii'zh Sah Sann Lu'uc (San Lucas Quiaviní Zapotec dictionary).
  zts: { name: "Tlacolula Zapotec", native: "Dizhsa", lat: 16.95, lng: -96.48, // Tlacolula de Matamoros, Oaxaca, Mexico
},
  // Mazahua (Jñatjo) — Otomanguean Otomi-Mazahua (sister to Otomi varieties such as ote, ots, otq within the Otomian sub-branch; closely related Otomi-Mazahua family is the second-largest branch of Otomanguean by speakers), ~150K, Mexico (Estado de México — Jocotitlán, Atlacomulco, San Felipe del Progreso, Ixtapan del Oro; small Michoacán populations).
  // Sources: Ethnologue 27 'maz'; Glottolog maza1273; Stewart (1966) Mazahua phonology and morphology.
  maz: { name: 'Mazahua', native: 'Jñatjo', lat: 19.71, lng: -99.92, // San Felipe del Progreso, Estado de México (Mazahua heartland)
},
  // Mixtepec Mixtec — Otomanguean (Mixtecan, Eastern Mixtec — sister to mix Mixtec macro-language varieties), ~7K, Mexico (Oaxaca — San Juan Mixtepec area, Sierra Sur).
  // Sources: Ethnologue 27 'mix'; Glottolog mixt1422; Pankratz & Pike (1967) Phonology and morphotonemics of Ayutla Mixtec.
  mix: { name: 'Mixtepec Mixtec', native: 'Sa\'an Sàvǐ Sa San Juan Mixtepec', lat: 16.64, lng: -97.92, // San Juan Mixtepec, Oaxaca
},
  // Metlatónoc Mixtec — Otomanguean (Mixtecan, Mixtec — sister variety to mix Mixtec macrolanguage and xtm Mixtepec Mixtec; spoken in Guerrero highlands rather than Oaxaca core area).
  // Sources: Ethnologue 27 'mxv'; Glottolog metl1240; Caballero (2008) Choices and constraints in the analysis of mountain Mixtec.
  mxv: { name: "Metlatónoc Mixtec", native: "Tu'un Sávi", lat: 17.20, lng: -98.50, // Metlatónoc, Guerrero, Mexico
},
  // Coyutla Totonac — Totonacan (Totonac branch, Northern/Sierra Totonac — sister to Papantla and Misantla Totonac varieties; the Totonacan family is small and centered in central Mexican Gulf coast), ~50K, Mexico (Veracruz — Coyutla, Coahuitlán, Filomeno Mata, Mecatlán municipalities, north-central Sierra de Papantla).
  // Sources: Ethnologue 27 'toc'; Glottolog coyu1238; Levy (1987) Fonología del totonaco de Papantla.
  toc: { name: "Coyutla Totonac", native: "Tachiwíin", lat: 20.25, lng: -97.45, // Coyutla, Veracruz, Mexico
},
  // Huave (San Mateo del Mar Huave, Umbeyajts) — language isolate (no proven genealogical relatives, despite areal Mesoamerican features), ~12K, Mexico (Oaxaca — San Mateo del Mar municipality, Pacific coast lagoon system on Tehuantepec Isthmus).
  // Sources: Ethnologue 27 'huv'; Glottolog sanm1284; Stairs Kreger & Scharfe de Stairs (1981) Diccionario huave de San Mateo del Mar.
  huv: { name: "San Mateo del Mar Huave", native: "Umbeyajts", lat: 16.21, lng: -94.99, // San Mateo del Mar, Oaxaca, Mexico
},
  // Quechuan / Aymaran
  ay: { name: 'Aymara', native: 'Aymar aru', lat: -16.49, lng: -68.15, // La Paz
},
  // Jaqaru — Aymaran (Tupe-Cauqui branch — sister to Aymara within Aymaran family), ~700, Yauyos Province, Peru.
  // Sources: Ethnologue 27 'jqr'; Glottolog jaqa1251; Belleza (1995) Vocabulario Jaqaru-Castellano; Hardman (1983) Jaqaru.
  jqr: { name: 'Jaqaru', native: 'Jaqaru aru', lat: -12.31, lng: -75.83, // Tupe district, Yauyos, Peru
},
  // Asháninka — Arawakan (Kampan), Peruvian Amazon, ~25K-50K speakers. Largest Arawakan in Peru.
  // Sources: Ethnologue 27 'cni'; Glottolog asha1243; Mihas (2010) Asháninka grammar.
  cni: { name: 'Asháninka', native: 'Asháninka', lat: -10.85, lng: -73.81, // Satipo, Peru
},
  // Yanesha (Amuesha) — Arawakan (Western, isolated within Arawakan but part of broader Maipurean macrofamily), ~9K, Peru (Amazon basin — Pasco, Junín, Huánuco regions; Andes-Amazon ecotone).
  // Sources: Ethnologue 27 'ame'; Glottolog yane1238; Duff-Tripp (1997) Gramática del Idioma Yanesha'.
  ame: { name: 'Yanesha', native: "Yanesha'", lat: -10.62, lng: -75.21, // Villa Rica, Pasco Region, Peru
},
  // Ngäbere (Guaymí) — Chibchan (Magdalenic, sister to Buglere/Bocotá), ~170K, Panama (Ngäbe-Buglé Comarca) + Costa Rica (Cordillera de Talamanca). Largest Chibchan language by speakers.
  // Sources: Ethnologue 27 'gym'; Glottolog ngab1239; Murillo (2008) Diccionario Bilingüe Ngäbere-Español.
  gym: { name: 'Ngäbere', native: 'Ngäbere', lat: 8.43, lng: -82.13, // Llano Tugrí, Panama (Ngäbe-Buglé capital)
},
  // Sumo (Mayangna) — Misumalpan (sister to Miskito within the small Misumalpan family of Central America), ~10K, Nicaragua (Bonanza, Rosita) + Honduras (Mosquitia).
  // Sources: Ethnologue 27 'yan'; Glottolog mayy1239; Norwood (1997) Mayangna grammar.
  yan: { name: 'Sumo', native: 'Mayangna', lat: 14.18, lng: -84.62, // Bonanza, Nicaragua (Mayangna heartland)
},
  // Shuar — Jivaroan, ~35K speakers, Ecuadorian + Peruvian Amazon. Famous historically for tsantsa (shrunken heads).
  // Sources: Ethnologue 27 'jiv'; Glottolog shua1257; Pellizzaro & Náwech (2005) Chicham Shuar.
  jiv: { name: 'Shuar', native: 'Shuar Chicham', lat: -2.50, lng: -78.07, // Macas, Ecuador
},
  // Aguaruna (Awajún) — Jivaroan, ~55K (Peru ~50K + Ecuador ~5K), Amazon Andes ecotone (Marañón River basin). Largest Jivaroan.
  // Sources: Ethnologue 27 'agr'; Glottolog agua1253; Wipio (1978) Diccionario Aguaruna-Castellano.
  agr: { name: 'Aguaruna', native: 'Awajún chichám', lat: -5.13, lng: -78.44, // Bagua / Condorcanqui, Peru
},
  // Achuar (also Achuar-Shiwiar) — Jivaroan, ~5K (Peru ~3K + Ecuador ~2K), Marañón–Pastaza ecotone. Cousin to Shuar (jiv) and Aguaruna (agr).
  // Sources: Ethnologue 27 'acu'; Glottolog achu1248; Fast et al. (1996) Diccionario achuar-shiwiar/castellano.
  acu: { name: 'Achuar', native: 'Achuar Chicham', lat: -2.30, lng: -77.45, // Wasakentsa, Morona-Santiago, Ecuador
},
  // Galibi Carib (Kari'na) — Cariban (Northern, Coastal Cariban — sister to other Northern Cariban languages such as Macushi, Pemon, Yukpa within the Cariban family; the type-language for the entire Cariban language family which got its name from Spanish "caribe", which in turn became the source of the toponym Caribbean), ~7K, Suriname (~3K) + French Guiana (~3K) + Venezuela (~5K) + Guyana (~500) + Brazil northern (small populations).
  // Sources: Ethnologue 27 'car'; Glottolog gali1262; Hoff (1968) The Carib Language; Mosonyi (1978) Diccionario Karina-Castellano.
  car: { name: 'Galibi Carib', native: "Kari'na", lat: 5.93, lng: -55.13, // Galibi, Suriname (Marowijne river mouth — Carib heartland in Suriname)
},
  // Páez (Nasa Yuwe) — language isolate, Cauca Colombia, ~60K. Tonal, indigenous to pre-Inca Andes.
  // Sources: Ethnologue 27 'pbb'; Glottolog paez1247; Rojas Curieux (1998) Lengua páez.
  pbb: { name: 'Páez', native: 'Nasa Yuwe', lat: 2.55, lng: -76.32, // Popayán/Tierradentro, Cauca
},
  // Misak (Guambiano, Wam) — Barbacoan (sister to Awa Pit, Cha\'palaa, Tsafiki within the Barbacoan family of southwestern Colombia and northwestern Ecuador), ~25K, Colombia (Cauca Department — Silvia, Totoró, Jambaló municipalities; Misak Resguardo de Guambía).
  // Sources: Ethnologue 27 'gum'; Glottolog guam1247; Vásquez de Ruiz (1988) La predicación en Guambiano.
  gum: { name: 'Misak', native: 'Wam', lat: 2.61, lng: -76.39, // Silvia, Cauca, Colombia (Misak heartland)
},
  // Araucanian
  arn: { name: 'Mapudungun', native: 'Mapuzugun', lat: -38.74, lng: -72.59, // Temuco
},
  // Algonquian (North America)
  cr: { name: 'Cree', native: 'ᓀᐦᐃᔭᐍᐏᐣ', lat: 52.13, lng: -106.67, // Saskatoon
},
  // Chipewyan (Dëne Sųłıné) — Na-Dene Athabaskan Northern (sister to Slavey, Dogrib, Sahtu Dene within the Northern Athabaskan branch; Athabaskan family stretches from northern Canada to Navajo nv and Apache languages of the US Southwest), ~12K, Canada (Northwest Territories — Łutsel K'e, Fort Smith; Northern Saskatchewan — La Loche, Black Lake; Northern Alberta — Cold Lake; Northern Manitoba — Brochet).
  // Sources: Ethnologue 27 'chp'; Glottolog chip1261; Cook (2004) A Grammar of Dëne Sųłıné.
  chp: { name: 'Chipewyan', native: 'Dëne Sųłıné', lat: 60.08, lng: -111.88, // Fort Smith, NWT
},
  oj: { name: 'Ojibwe', native: 'Anishinaabemowin', lat: 46.50, lng: -84.34, // Sault Ste. Marie
},
  // Atikamekw (Atikamekw Nehiromowin) — Algonquian (Cree branch, distinct R-dialect), ~6K-7K, Quebec (Mauricie region — Manawan, Wemotaci, Opitciwan).
  // Sources: Ethnologue 27 'atj'; Glottolog atik1240; Atikamekw Conseil de la Nation; Béland (1978) Phonologie atikamekw.
  atj: { name: 'Atikamekw', native: 'Atikamekw Nehiromowin', lat: 47.40, lng: -73.97, // Wemotaci, Mauricie, Quebec
},
  // Mi'kmaq — Algic, Atlantic Canada + Maine, ~7K speakers. Has its own historical syllabary.
  // Sources: Ethnologue 27 'mic'; Glottolog mikm1235; Inglis (1991) Mi'kmaq Online Dictionary.
  mic: { name: "Mi'kmaq", native: "Mi'kmawi'simk", lat: 46.10, lng: -64.78, // Eskasoni / Cape Breton
},
  // Maliseet-Passamaquoddy (Wolastoqey-Passamaquoddy) — Algonquian (Eastern, Abenakian — sister to Penobscot abe), ~500-600, Maine USA (Passamaquoddy Bay) + New Brunswick (Wolastoq/Saint John River).
  // Sources: Ethnologue 27 'pqm'; Glottolog male1292; Leavitt (1996) Passamaquoddy-Maliseet grammar.
  pqm: { name: 'Maliseet-Passamaquoddy', native: 'Wolastoqey latuwewakon', lat: 45.96, lng: -67.04, // Tobique First Nation, NB / Pleasant Point, ME
},
  // Western Abenaki — Algonquian Eastern Abenakian (sister to Maliseet-Passamaquoddy pqm and Penobscot-Eastern Abenaki within the Abenakian sub-branch; the western variety is the more thoroughly studied Abenakian language thanks to Daniel Day's 1995 dictionary), ~10 fluent (critically endangered — UNESCO critically endangered; vibrant heritage revival via Odanak community language program), Canada (Quebec — Odanak/Saint-François First Nation; Wolinak First Nation) + USA (Vermont — Missisquoi, Cowassuck heritage groups).
  // Sources: Ethnologue 27 'abe'; Glottolog west2630; Day (1995) Western Abenaki Dictionary; Laurent (1884) New Familiar Abenakis and English Dialogues.
  abe: { name: 'Western Abenaki', native: 'Aln8baôdwawôgan', lat: 46.05, lng: -72.83, // Odanak/Saint-François, Quebec
},
  // Munsee — Algonquian Eastern (Lenape branch), critically endangered (~2 fluent), heritage-revival.
  // Sources: Ethnologue 27 'umu'; Glottolog muns1238; Goddard (1979) Munsee Phonology.
  umu: { name: 'Munsee', native: 'Lunaapeew', lat: 42.78, lng: -82.05, // Moraviantown, Ontario (Munsee Delaware Nation)
},
  // Plains Cree (Y-dialect / Nēhiyawēwin) — Algonquian (Cree-Innu), ~26K, Alberta/Saskatchewan/Manitoba. Largest Cree variety.
  // Sources: Ethnologue 27 'crk'; Glottolog plai1258; Wolfart (1973) Plains Cree: A Grammatical Study; Wolvengrey (2001) ito Pikiskwêwina.
  crk: { name: 'Plains Cree', native: 'ᓀᐦᐃᔭᐍᐏᐣ', lat: 53.55, lng: -113.49, // Edmonton, Alberta (regional center)
},
  // Yurok — Algic family but distantly related (Algic = Algonquian + Wiyot + Yurok; Yurok-Wiyot called "Ritwan" branch). ~250 speakers, NW California (Klamath River).
  // Sources: Ethnologue 27 'yur'; Glottolog yuro1248; Robins (1958) The Yurok Language; Garrett (2014) Basic Yurok.
  yur: { name: 'Yurok', native: 'Pulik\'la\'', lat: 41.50, lng: -124.04, // Klamath, Yurok Reservation, NW California
},
  // Siouan
  lkt: { name: 'Lakota', native: 'Lakȟótiyapi', lat: 43.02, lng: -102.55, // Pine Ridge
},
  // Eskimo-Aleut (Greenlandic)
  kl: { name: 'Greenlandic', native: 'Kalaallisut', lat: 64.18, lng: -51.74, // Nuuk
},
  // === Phase 3D: Caucasus ===
  // Northeast Caucasian (Nakh-Daghestanian)
  ce: { name: 'Chechen', native: 'Нохчийн мотт', lat: 43.32, lng: 45.69, // Grozny
},
  inh: { name: 'Ingush', native: 'Гӏалгӏай мотт', lat: 43.16, lng: 44.81, // Magas
},
  av: { name: 'Avar', native: 'Авар мацӀ', lat: 42.98, lng: 47.50, // Makhachkala
},
  lez: { name: 'Lezgian', native: 'Лезги чӏал', lat: 41.79, lng: 48.16, // Derbent area
},
  dar: { name: 'Dargwa', native: 'Дарган мез', lat: 42.36, lng: 47.51, // Sergokala
},
  // Aghul — Northeast Caucasian Lezgic (sister to Lezgian lez and Tabasaran tab within the Lezgic branch), ~30K, Russia (Dagestan — Agulsky and Kurakhsky districts in mountainous southeastern Dagestan).
  // Sources: Ethnologue 27 'agx'; Glottolog aghu1253; Magometov (1970) Aghul'skij jazyk.
  agx: { name: 'Aghul', native: 'агъул чӏал', lat: 41.82, lng: 47.69, // Tpig, Agulsky District, Dagestan
},
  // Tsez (Dido) — Northeast Caucasian Tsezic (sister to Hinukh, Khwarshi, Bezhta, Hunzib within the Tsezic branch; one of the most case-rich languages in the world with ~64 case forms), ~15K, Russia (Dagestan — Tsuntinsky District in mountainous western Dagestan).
  // Sources: Ethnologue 27 'ddo'; Glottolog dido1241; Polinsky (2015) Tsez Syntax.
  ddo: { name: 'Tsez', native: 'цез мец', lat: 42.20, lng: 46.15, // Tsunta, Tsuntinsky District, Dagestan
},
  lbe: { name: 'Lak', native: 'Лакку маз', lat: 42.10, lng: 47.13, // Kumukh
},
  tab: { name: 'Tabasaran', native: 'Табасаран чӀал', lat: 41.93, lng: 48.04, // Khiv
},
  // Archi — NE Caucasian (Lezgic, isolated within Lezgic), ~1K, Russia (Daghestan — Charoda District, Archi village). One of world's most morphologically complex languages: ~1.5M possible verb forms.
  // Sources: Ethnologue 27 'aqc'; Glottolog arch1244; Kibrik (1977) Archi: Phonology & Morphology; Chumakina (2008).
  aqc: { name: 'Archi', native: 'Аршаттен чӀат', lat: 42.18, lng: 46.73, // Archi village, Charoda District, Daghestan
},
  // Udi — NE Caucasian (Lezgic), ~6K, Azerbaijan (Niž village, Qabala) + Georgia. Linear descendant of Caucasian Albanian (5th c. literary language).
  // Sources: Ethnologue 27 'udi'; Glottolog udii1243; Schulze (1982) Die Sprache der Uden; Maisak (2008).
  udi: { name: 'Udi', native: 'удин муз', lat: 41.30, lng: 48.31, // Niž (Nij), Qabala District, Azerbaijan
},
  // Tsakhur (Yiqby) — NE Caucasian (Lezgic, Aghul-Tabasaran-Tsakhur subgroup), ~13K, Russia (Daghestan southern villages) + Azerbaijan (Zaqatala/Qax raions).
  // Sources: Ethnologue 27 'tkr'; Glottolog tsak1249; Schulze-Fürhoff (1994); Kibrik & Kodzasov (1990).
  tkr: { name: 'Tsakhur', native: 'ЦӀаIхна миз', lat: 41.49, lng: 47.05, // Tsakhur village, Rutul District, Daghestan
},
  // Kumyk — Kipchak Turkic, ~440K, Daghestan Russia. Northern lingua franca historically.
  // Sources: Ethnologue 27 'kum'; Glottolog kumy1244; Bammatov (1969) Kumyk-Russian Dictionary.
  kum: { name: 'Kumyk', native: 'Къумукъ тил', lat: 42.98, lng: 47.50, // Makhachkala area
},
  // Nogai — Turkic Kipchak Nogai (sister to Karakalpak kaa and Kazakh kk within the Kipchak-Nogai sub-branch; closely related to Crimean Tatar crh and Kumyk kum), ~90K, Russia (Karachay-Cherkessia, Stavropol Krai, Dagestan, Astrakhan Oblast — three distinct regional subgroups: Karanogai, Akhnogai, Kuban-Nogai); Romania (~5K Dobruja); Turkey (Tatar diaspora).
  // Sources: Ethnologue 27 'nog'; Glottolog noga1249; Baskakov (1940) Nogai language and grammar.
  nog: { name: 'Nogai', native: 'Ногай тили', lat: 43.96, lng: 41.93, // Karachayevsk / Cherkessk area, Karachay-Cherkessia (Akhnogai)
},
  // Northwest Caucasian
  ady: { name: 'Adyghe', native: 'Адыгабзэ', lat: 44.61, lng: 40.10, // Maykop
},
  kbd: { name: 'Kabardian', native: 'Адыгэбзэ', lat: 43.49, lng: 43.62, // Nalchik
},
  ab: { name: 'Abkhaz', native: 'Аҧсуа бызшәа', lat: 43.00, lng: 41.02, // Sukhumi
},
  // Abaza — NW Caucasian (Abkhaz-Adyghe, Abaza-Abkhaz subgroup; sister to Abkhaz ab), ~50K, Russia (Karachay-Cherkess Republic — Inzhich-Chukun area).
  // Sources: Ethnologue 27 'abq'; Glottolog abaz1241; Tabulova (1976) Grammar of Abaza; Genko (1955).
  abq: { name: 'Abaza', native: 'Абаза бызшва', lat: 44.07, lng: 41.95, // Inzhich-Chukun area, Karachay-Cherkessia
},
  // Ubykh — Northwest Caucasian (extinct since 7 October 1992, last fully fluent speaker Tevfik Esenç).
  // Originally spoken on the NE coast of the Black Sea around Sochi; following the Russian conquest of
  // 1864 the Ubykhs were deported en masse to Ottoman Anatolia, where the language survived for four
  // generations before dying out in Hacıosman village (Manyas district, near the Sea of Marmara, Turkey).
  // Famous in phonological typology for having the largest documented consonant inventory of any
  // language with only ~2 phonemic vowels (a, ə) — Dumézil (1965) counts 84 consonants, including
  // ejectives, pharyngealized, labialized, and palatalized series. Never had its own orthography;
  // all forms below are in Latin/IPA transcription per Vogt (1963) and Dumézil's grammar.
  // Vocabulary partial: only cells with confident Vogt (1963) dictionary attestation are filled;
  // the remainder are marked '—' under dataStatus:'attested' (DATA_STATUS_OVERRIDES) rather than
  // fabricated. Sources: Dumézil (1931, 1965, 1975); Vogt (1963) Dictionnaire de la langue Oubykh;
  // Hewitt (2004); Glottolog ubyk1235.
  uby: { name: 'Ubykh', native: 'tʷaχəbzɜ', lat: 40.07, lng: 28.05, // Hacıosman, Manyas district, Balıkesir Province, Turkey (where Tevfik Esenç lived)

    wordEvidence: {
      water:  { evidence: 'direct', source: 'Vogt (1963) Dictionnaire de la langue Oubykh — bzə [bzə]' },
      fire:   { evidence: 'direct', source: 'Vogt (1963) Dictionnaire de la langue Oubykh — mzʼə (palatalized ejective)' },
      sun:    { evidence: 'direct', source: 'Vogt (1963) Dictionnaire de la langue Oubykh — dəɣʷa' },
      moon:   { evidence: 'direct', source: 'Vogt (1963) Dictionnaire de la langue Oubykh — mazə' },
      mother: { evidence: 'direct', source: 'Vogt (1963) — nan (also short an); standard kinship term' },
      father: { evidence: 'direct', source: 'Vogt (1963) — tʷə (labialized stop)' },
      heart:  { evidence: 'direct', source: 'Vogt (1963) — gʷə; cognate with Adyghe ady/Kabardian kbd гу/гу' },
      house:  { evidence: 'direct', source: 'Vogt (1963) — tʷəna; cognate with Adyghe унэ /wəna/' },
      dog:    { evidence: 'direct', source: 'Vogt (1963) — la; cognate with Abaza la / Abkhaz а-ла' },
      hand:   { evidence: 'direct', source: 'Vogt (1963) — ʔa (glottal stop + a); cognate with Adyghe/Kabardian ӏэ /ʔa/' },
      eye:    { evidence: 'direct', source: 'Vogt (1963) — bla; cognate with Abkhaz абла, Abaza la' },
      one:    { evidence: 'direct', source: 'Vogt (1963) — za; cognate with Adyghe/Kabardian зы /zə/' }
    }},
  // Kartvelian
  xmf: { name: 'Mingrelian', native: 'მარგალური ნინა', lat: 42.50, lng: 41.87, // Zugdidi
},
  // Iranian (in Caucasus)
  os: { name: 'Ossetian', native: 'Ирон ӕвзаг', lat: 43.02, lng: 44.68, // Vladikavkaz
},
  // === Phase 3E: Pacific & Australia ===
  // Polynesian
  ty: { name: 'Tahitian', native: 'Reo Tahiti', lat: -17.54, lng: -149.57, // Papeete
},
  niu: { name: 'Niuean', native: 'Vagahau Niue', lat: -19.05, lng: -169.92, // Alofi
},
  tvl: { name: 'Tuvaluan', native: 'Te ggana Tuuvalu', lat: -8.52, lng: 179.20, // Funafuti
},
  rap: { name: 'Rapanui', native: 'Vananga Rapa Nui', lat: -27.15, lng: -109.43, // Hanga Roa
},
  rar: { name: 'Cook Islands Māori', native: 'Reo Māori Kuki Āirani', lat: -21.21, lng: -159.79, // Rarotonga
},
  // Micronesian
  mh: { name: 'Marshallese', native: 'Kajin Majeḷ', lat: 7.09, lng: 171.38, // Majuro
},
  gil: { name: 'Gilbertese', native: 'Taetae ni Kiribati', lat: 1.45, lng: 173.04, // Tarawa
},
  ch: { name: 'Chamorro', native: 'Chamoru', lat: 13.47, lng: 144.75, // Hagåtña
},
  // Austronesian (Timor)
  tet: { name: 'Tetum', native: 'Tetun', lat: -8.56, lng: 125.58, // Dili
},
  // Atoni (Uab Meto) — Austronesian Central Malayo-Polynesian, ~700K speakers, West Timor (Indonesian).
  // Sources: Ethnologue 27 'aoz'; Glottolog uabm1238; Steinhauer (1996) Atoni grammar.
  aoz: { name: 'Atoni', native: 'Uab Meto', lat: -9.66, lng: 124.10, // Soe, NTT (Atoni heartland)
},
  // English-based creole (Vanuatu)
  bi: { name: 'Bislama', native: 'Bislama', lat: -17.74, lng: 168.31, // Port Vila
},
  pjt: { name: 'Pitjantjatjara', native: 'Pitjantjatjara', lat: -25.34, lng: 131.04, // Yulara/Uluru

    // Audit Task 173: per-cell wordEvidence for source-checked Pitjantjatjara
    // row. Sources: Goddard (1985, 1996) "A Grammar of Yankunytjatjara" and
    // "Pitjantjatjara/Yankunytjatjara to English Dictionary" (IAD Press,
    // 2nd ed.); Eckert & Hudson (1988) Wangka Wiru: A Handbook for the
    // Pitjantjatjara Language Learner. Pitjantjatjara is non-tonal with
    // retroflex consonants ("rd, rl, rn") and one of three vowels (i, a, u).
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Goddard (1996) — kapi (n.) "water, drinking-water"; foundational vocabulary' },
      fire:   { evidence: 'direct', source: 'Goddard (1996) — waru (n.) "fire, firewood"; medial /ɻ/ retroflex glide' },
      sun:    { evidence: 'direct', source: 'Goddard (1996) — tjintu (n.) "sun, day"; palatal stop /c/', note: 'covers both sun and day per Australian Aboriginal polysemy convention' },
      moon:   { evidence: 'direct', source: 'Goddard (1996) — pira (n.) "moon, month"', note: 'covers month sense too — common Aboriginal pattern' },
      mother: { evidence: 'direct', source: 'Goddard (1996) — ngunytju (n.) "mother"; palatal nasal /ɲ/ + palatal stop /c/' },
      father: { evidence: 'direct', source: 'Goddard (1996) — mama (n.) "father"; reduplicated kinship term' },
      eat:    { evidence: 'direct', source: 'Goddard (1996) — ngalku- "to eat" + present-tense -ni; ngalkuni "is eating/eats"', formType: 'inflected-form', note: 'verbs cited in present-tense -ni form per Goddard convention; bare root ngalku- is the verbal stem' },
      drink:  { evidence: 'direct', source: 'Goddard (1996) — tjiki- "to drink" + present -ni; tjikini "is drinking/drinks"', formType: 'inflected-form' },
      love:   { evidence: 'direct', source: 'Goddard (1996) — mukulya (adj.) "loving, affectionate"; "to like, love" verb is mukulyaringkunyi', formType: 'inflected-form', note: 'mukulya is the attributive/citation form; verbal "to feel love" uses ringkunyi inceptive suffix' },
      heart:  { evidence: 'direct', source: 'Goddard (1996) — kurunpa (n.) "heart, spirit, life-force"; covers anatomical and spiritual senses', note: 'broader than English "heart" — includes spirit/life-essence; matches WORD_LIST.definition.heart (emotional/cognitive default)' },
      tree:   { evidence: 'direct', source: 'Goddard (1996) — punu (n.) "tree, wood, stick"; broad coverage' },
      house:  { evidence: 'direct', source: 'Goddard (1996) — ngura (n.) "camp, home, country, place"', note: 'broader than "house" — refers to traditional camp/home/country including the wider land area; modern Pitjantjatjara also uses English-derived haus' },
      dog:    { evidence: 'direct', source: 'Goddard (1996) — papa (n.) "dog (incl. dingo)"; pre-contact form covers both domestic dog and dingo' },
      cat:    { evidence: 'direct', source: 'Goddard (1996) — ngaya (n.) "cat"; post-contact loan adapted to Pitjantjatjara phonotactics (initial /ŋ/ added)', note: 'feral cats arrived with European settlement; the term is firmly established in modern Pitjantjatjara' },
      hand:   { evidence: 'direct', source: 'Goddard (1996) — mara (n.) "hand"; medial /ɻ/ retroflex glide', note: 'distinguishes from arm: pampu "arm, upper limb"' },
      eye:    { evidence: 'direct', source: 'Goddard (1996) — kuru (n.) "eye"; medial /ɻ/' },
      hello:  { evidence: 'direct', source: 'Goddard (1996) — palya (adj./interj.) "good, well, fine, OK"; canonical multipurpose affirmation/greeting', formType: 'greeting-formula', note: 'lexical overlap with thanks/good: palya (good/well/OK) is the canonical Pitjantjatjara multi-purpose affirmation and greeting' },
      thanks: { evidence: 'direct', source: 'Goddard (1996) — palya used as thanks expression; Pitjantjatjara has no separate dedicated "thanks" lexeme', formType: 'thanks-formula', note: 'lexical overlap with hello/good: palya serves as thanks via its core "good" meaning; English "thank you" is also widely used in modern bilingual contexts' },
      one:    { evidence: 'direct', source: 'Goddard (1996) — kutju (num.) "one, alone"; palatal stop /c/', note: 'Pitjantjatjara has limited native numerals: one, two, three, then "many"; English numbers used for higher counting' },
      good:   { evidence: 'direct', source: 'Goddard (1996) — palya (adj.) "good, well, fine"; primary meaning', note: 'lexical overlap with hello/thanks: palya = "good/well", primary meaning' },
    } },
  wbp: { name: 'Warlpiri', native: 'Warlpiri', lat: -22.26, lng: 131.79, // Yuendumu
},
  // Pintupi-Luritja — Pama-Nyungan Western Desert (sister to Pitjantjatjara pjt within the Western Desert dialect cluster; the easternmost Western Desert variety, with Luritja being a contact lect with Arrernte aer), ~1K, Australia (Northern Territory — Papunya, Mt Liebig, Kintore Walungurru; small Western Australia border populations); the homeland Pintupi people emerged from the Gibson Desert into Western Desert settlements in the 1950s-60s.
  // Sources: Ethnologue 27 'piu'; Glottolog pint1250; Hansen & Hansen (1992) Pintupi/Luritja Dictionary.
  piu: { name: 'Pintupi-Luritja', native: 'Pintupi-Luritja', lat: -23.25, lng: 131.85, // Papunya, Northern Territory
},
  // Eastern Arrernte (Mparntwe Arrernte) — Pama-Nyungan Arandic (sister to Western Arrernte/Anmatyerr/Alyawarr/Kaytetye within the Arandic sub-branch; the prestige variety of central Australia's Arandic continuum), ~4K, Australia (Northern Territory — Alice Springs/Mparntwe area, MacDonnell Ranges, Plenty Highway settlements).
  // Sources: Ethnologue 27 'aer'; Glottolog east2375; Wilkins (1989) Mparntwe Arrernte; Henderson & Dobson (1994) Arrernte Picture Dictionary.
  aer: { name: 'Eastern Arrernte', native: 'Mparntwe Arrernte', lat: -23.70, lng: 133.88, // Alice Springs / Mparntwe, NT
},
  // Nhanda — Pama-Nyungan (Kartu, Western Australia), ~30 fluent + ~60 partial speakers, Australia (Murchison-Gascoyne, mid-coast WA — Geraldton/Kalbarri area).
  // Sources: Ethnologue 27 'nha'; Glottolog nhan1238; Blevins (2001) Nhanda Aboriginal Language; Pama-Nyungan reconstructions.
  nha: { name: 'Nhanda', native: 'Nhanda', lat: -28.78, lng: 114.61, // Geraldton, Western Australia
},
  // Adnyamathanha — Pama-Nyungan (Thura-Yura, sister to Kaurna), ~10 fluent + ~150 partial speakers, Australia (South Australia — Flinders Ranges, Nepabunna).
  // Sources: Ethnologue 27 'adt'; Glottolog adny1238; Schebeck (1973) Texts on the Social System of the Atyñamatana People.
  // Olkol — Pama-Nyungan (Paman, Northern — sister to Yir-Yoront and other Cape York Peninsula Paman), ~50 fluent + heritage learners, Australia (Queensland — Cape York Peninsula, Coen, Pormpuraaw).
  // Sources: Ethnologue 27 'olk'; Glottolog olko1239; Sutton (1976) Cape York Peninsula linguistic survey.
  olk: { name: 'Olkol', native: 'Olkol', lat: -13.94, lng: 143.20, // Coen, Cape York Peninsula, Queensland
},
  adt: { name: 'Adnyamathanha', native: 'Adnyamathanha-na yarta', lat: -30.78, lng: 138.83, // Nepabunna, Flinders Ranges, SA
},
  // Noongar (Nyungar) — Pama-Nyungan (South-West, sister to Murchison-Gascoyne but heavily diverged), ~370 fluent + ~3K partial, SW Australia (Perth → Esperance Albany → Geraldton).
  // Sources: Ethnologue 27 'nys'; Glottolog noon1242; Douglas (1968) The Aboriginal Languages of the South-West of Australia.
  nys: { name: 'Noongar', native: 'Noongar wangkiny', lat: -31.95, lng: 115.86, // Perth, Western Australia (cultural center)
},
  // Ngunnawal — Pama-Nyungan (Yuin-Kuric, ACT region), ~5K heritage learners, Australia (ACT — Canberra; SE NSW). Critically endangered with active community-led revival since 1990s.
  // Sources: Ethnologue 27 'xul'; Glottolog ngun1242; Koch & Hercus (2009) Aboriginal Placenames.
  xul: { name: 'Ngunnawal', native: 'Ngunnawal', lat: -35.28, lng: 149.13, // Canberra, ACT (traditional Ngunnawal country)
},
  // Warnman — Pama-Nyungan (Western Desert, sister to wbp Warlpiri and pjt Pitjantjatjara within Western Desert subgroup), ~50, Australia (WA — Pilbara/Western Desert).
  // Sources: Ethnologue 27 'wbt'; Glottolog warn1238; Tindale (1974) Aboriginal Tribes of Australia.
  wbt: { name: 'Warnman', native: 'Warnman', lat: -22.50, lng: 122.00, // Punmu / Karlamilyi National Park, Western Desert, WA
},
  // === Phase 3F: Tibeto-Burman, Indonesian/Philippine, misc ===
  // Tibeto-Burman
  mni: { name: 'Meitei', native: 'ꯃꯩꯇꯩꯂꯣꯟ', lat: 24.81, lng: 93.94, // Imphal
},
  // Bishnupriya Manipuri — Indo-European Indo-Aryan (Eastern, sister to as Assamese; despite the "Manipuri" name, it's Indo-Aryan, NOT Tibeto-Burman like Meitei/mni), ~120K, India NE (Assam, Tripura) + Bangladesh (Sylhet) + Myanmar.
  // Sources: Ethnologue 27 'bpy'; Glottolog bish1244; Sinha (1986) The Bishnupriya Manipuri Language.
  bpy: { name: 'Bishnupriya Manipuri', native: 'বিষ্ণুপ্রিয়া মণিপুরী', lat: 24.34, lng: 92.87, // Cachar district, Assam (Bishnupriya heartland)
},
  new: { name: 'Newari', native: 'नेपाल भाषा', lat: 27.71, lng: 85.32, // Kathmandu
},
  // Limbu — Sino-Tibetan (Kiranti), ~340K speakers, eastern Nepal + Sikkim. Has its own native Sirijanga script (Unicode 5.1).
  // Sources: Ethnologue 27 'lif'; Glottolog limb1266; van Driem (1987) A Grammar of Limbu.
  lif: { name: 'Limbu', native: 'ᤕᤰᤌᤢᤱ ᤐᤠᤴ', lat: 26.66, lng: 87.27, // Dhankuta
},
  // Thulung — Sino-Tibetan Western Kiranti, ~33K speakers, Solu-Khumbu region E Nepal.
  // Sources: Ethnologue 27 'tdh'; Glottolog thul1244; Allen (1975) Thulung grammar.
  tdh: { name: 'Thulung', native: 'थुलुङ', lat: 27.45, lng: 86.65, // Solukhumbu (Thulung heartland)
},
  brx: { name: 'Bodo', native: 'बर\'', lat: 26.40, lng: 90.27, // Kokrajhar, Assam
},
  // Adi — Sino-Tibetan Tani, ~250K speakers, Arunachal Pradesh + Assam India + adjoining China.
  // Sources: Ethnologue 27 'adi'; Glottolog adii1235; Sun (1993) Tani branch grammars.
  adi: { name: 'Adi', native: 'Adi Agom', lat: 28.05, lng: 95.32, // Pasighat, Arunachal Pradesh
},
  // Nagamese — Assamese-based pidgin/creole, Naga lingua franca, ~30K L1 + 1.4M L2.
  // Sources: Ethnologue 27 'nag'; Glottolog naga1394; Sreedhar (1974) Naga Pidgin.
  nag: { name: 'Nagamese', native: 'Nagamese', lat: 25.67, lng: 94.11, // Kohima, Nagaland
},
  // Zeme Naga — Sino-Tibetan (Tibeto-Burman, Kuki-Chin-Naga, Zeme group), ~70K, India (Nagaland — Peren District, Manipur — Tamenglong, Assam — Dima Hasao).
  // Sources: Ethnologue 27 'nzm'; Glottolog zeme1240; Konow (1903) Linguistic Survey of India Vol. 3.
  nzm: { name: 'Zeme Naga', native: 'Zeme', lat: 25.45, lng: 93.75, // Peren, Nagaland
},
  // Tangkhul Naga — Sino-Tibetan (Tibeto-Burman, Kuki-Chin-Naga, Tangkhulic — sister to other Naga and to Kuki-Chin), ~140K, India (Manipur — Ukhrul District) + Myanmar (Sagaing).
  // Sources: Ethnologue 27 'nmf'; Glottolog tang1346; Arokianathan (1987) Tangkhul Naga Phonology.
  nmf: { name: 'Tangkhul Naga', native: 'Tangkhul', lat: 25.10, lng: 94.36, // Ukhrul, Manipur (Tangkhul cultural center)
},
  lus: { name: 'Mizo', native: 'Mizo ṭawng', lat: 23.73, lng: 92.72, // Aizawl

    wordEvidence: {
      drink: { evidence: 'direct', note: 'Mizo "in" verb "to drink" — homophone with noun "in" (house); distinct lexemes (Audit Task 120)' },
      house: { evidence: 'direct', note: 'Mizo "in" noun "house" — homophone with verb "in" (to drink); distinct lexemes (Audit Task 120)' }
    }},
  dz: { name: 'Dzongkha', native: 'རྫོང་ཁ', lat: 27.47, lng: 89.64, // Thimphu
},
  // Sherpa (Sharpa, Khumbu) — Sino-Tibetan Tibetic (sister to Standard Tibetan bo and Dzongkha dz within the Tibetic branch; the language of the Sherpa people of the Khumbu Mt Everest region — internationally famous as the elite mountaineers and porters who have accompanied virtually every successful Everest summit since the 1953 Hillary-Tenzing Norgay expedition), ~200K, Nepal (Solukhumbu, Sankhuwasabha, Taplejung, Sindhupalchowk districts) + India (Sikkim, Darjeeling) + Bhutan + Tibet (China) borderlands; significant diaspora (USA, UK, France).
  // Sources: Ethnologue 27 'xsr'; Glottolog shar1245; Schöttelndreyer (1980) Sherpa Texts.
  xsr: { name: 'Sherpa', native: 'ཤར་པའི་སྐད་ཡིག', lat: 27.81, lng: 86.71, // Namche Bazaar, Solukhumbu, Nepal (Sherpa heartland in the Mt Everest region)
},
  // Kurtöp — Sino-Tibetan East Bodish (sister to Bumthang, Khengkha, Chocha-ngachakha within East Bodish — distinct from Tibetic dz Dzongkha despite Bhutan location), ~10K, Bhutan (Lhuntse Dzongkhag — Kurtoe gewog, eastern Bhutan highlands).
  // Sources: Ethnologue 27 'xkz'; Glottolog kurt1248; Hyslop (2017) A Grammar of Kurtöp.
  xkz: { name: 'Kurtöp', native: 'Kurtöp', lat: 27.66, lng: 91.18, // Lhuntse, Bhutan
},
  // Sikkimese (Drenjongke) — Tibetic, ~70K speakers, Sikkim India. Closely related to Dzongkha (dz) and Standard Tibetan (bo).
  // Sources: Ethnologue 27 'sip'; Glottolog sikk1242; van Driem (1992) Bumthang grammar (regional reference).
  sip: { name: 'Sikkimese', native: 'འབྲས་ལྗོངས་སྐད', lat: 27.33, lng: 88.61, // Gangtok, Sikkim
},
  // Indonesian (large regional)
  min: { name: 'Minangkabau', native: 'Baso Minangkabau', lat: -0.95, lng: 100.35, // Padang
},
  // Nias — Austronesian (Malayo-Polynesian, Sundic, Nias-Mentawai), ~770K, Indonesia (Nias Island, North Sumatra). Megalithic stone-jumping culture; Nias Latin orthography.
  // Sources: Ethnologue 27 'nia'; Glottolog nias1242; Brown (2001) A Grammar of Nias Selatan.
  nia: { name: 'Nias', native: 'Li Niha', lat: 1.27, lng: 97.62, // Gunungsitoli, Nias
},
  ban: { name: 'Balinese', native: 'Basa Bali', lat: -8.65, lng: 115.21, // Denpasar
},
  ace: { name: 'Acehnese', native: 'Bahsa Acèh', lat: 5.55, lng: 95.33, // Banda Aceh
},
  // Gayo — Austronesian (Northwest Sumatra), ~85K speakers, central Aceh highlands.
  // Sources: Ethnologue 27 'gay'; Glottolog gayo1244; Eades (2005) Gayo grammar.
  gay: { name: 'Gayo', native: 'Basa Gayo', lat: 4.62, lng: 96.85, // Takengon, Aceh Tengah
},
  bug: { name: 'Buginese', native: 'Basa Ugi', lat: -4.13, lng: 120.00, // Sengkang (Bugis heartland, Wajo regency)
},
  // Mandar — Austronesian South Sulawesi, ~200K speakers, West Sulawesi province Indonesia.
  // Sources: Ethnologue 27 'mdr'; Glottolog mand1442; Strømme (1988) Mandar grammar.
  mdr: { name: 'Mandar', native: 'Bahasa Mandar', lat: -3.55, lng: 118.95, // Majene/Polewali, West Sulawesi
},
  // Cia-Cia — Austronesian (Celebic, Muna-Buton), southern Buton Island, Indonesia.
  // Internationally known for the 2009 Hangul orthography experiment in Baubau.
  // Sources: van den Berg (1991) Preliminary notes on the Cia-Cia language;
  // Mead (2017) Wasambua word list (Sulang Language Data); Glottolog ciac1237.
  cia: { name: 'Cia-Cia', native: 'Bahasa Ciacia', lat: -5.47, lng: 122.62, // Baubau, Buton Island, SE Sulawesi
},
  // Philippine (Visayan/Bikolano)
  war: { name: 'Waray', native: 'Wináray', lat: 11.24, lng: 124.99, // Tacloban
},
  bik: { name: 'Bikol Central', native: 'Bikol', lat: 13.62, lng: 123.18, // Naga
},
  // Iriga Bicolano (Rinconada Bikol) — Austronesian (Malayo-Polynesian, Greater Central Philippine, Bikol — sister to bik Bikol Central within the Bikol cluster; distinct dialect group of Rinconada district, southern Camarines Sur), ~250K, Philippines (Camarines Sur — Iriga, Bato, Buhi, Baao, Bula, Nabua, Balatan; Rinconada is its own subgroup not mutually intelligible with bik).
  // Sources: Ethnologue 27 'bto'; Glottolog rinc1238; McFarland (1974) Bikol dialect survey; Lobel (2013) Philippine and North Bornean languages.
  bto: { name: 'Iriga Bicolano', native: 'Rinconada Bikol', lat: 13.43, lng: 123.41, // Iriga City, Camarines Sur
},
  // Bantu (filling Phase 3A gap)
  tum: { name: 'Tumbuka', native: 'ChiTumbuka', lat: -11.46, lng: 34.02, // Mzuzu
},
  // Makonde — Bantu P23, ~2M speakers across Tanzania/Mozambique. Famous for ebony carving tradition.
  // Sources: Ethnologue 27 'kde'; Glottolog mako1247; Leach (2010) Makonde Reference Grammar.
  kde: { name: 'Makonde', native: 'Chimakonde', lat: -10.66, lng: 39.27, // Mtwara, Tanzania
},
  // Lomwe — Bantu P32, ~1.5M+ speakers, northern Mozambique + adjoining Malawi.
  // Sources: Ethnologue 27 'ngl'; Glottolog lomw1238; Kröger (2009) Lomwe-English Dictionary.
  // Sena — Bantu N44, ~1.4M, central Mozambique + adjoining Malawi.
  // Sources: Ethnologue 27 'seh'; Glottolog sena1262; Funnell (2004) Sena Grammar.
  seh: { name: 'Sena', native: 'Cisena', lat: -17.88, lng: 35.04, // Beira/Sofala area, Mozambique
},
  ngl: { name: 'Lomwe', native: 'Elomwe', lat: -15.10, lng: 39.27, // Nampula, Mozambique
},
  // === Phase 3G: African Nilotic/Cushitic/Berber + South Asian Indo-Aryan ===
  // Nilo-Saharan (Nilotic)
  din: { name: 'Dinka', native: 'Thuɔŋjäŋ', lat: 4.85, lng: 31.58, // Juba area
},
  nus: { name: 'Nuer', native: 'Thok Nath', lat: 9.56, lng: 31.63, // Bentiu/Malakal
},
  // Anuak (Anywaa) — Western Nilotic Lwoo, ~250K, lower Sobat River basin (South Sudan + Ethiopia Gambela). Closely related to Acholi (ach), Lango (laj), Luo (luo) within Lwoo branch.
  // Sources: Ethnologue 27 'anu'; Glottolog anua1242; Reh (1996) Anywa Language: Description and Internal Reconstructions.
  anu: { name: 'Anuak', native: 'Dha-Anywaa', lat: 8.25, lng: 34.59, // Gambela, Ethiopia (Anuak heartland)
},
  luo: { name: 'Luo', native: 'Dholuo', lat: -0.10, lng: 34.75, // Kisumu
},
  mas: { name: 'Maasai', native: 'ɔl Maa', lat: -1.08, lng: 35.86, // Narok
},
  // Samburu — Eastern Nilotic (Maa cluster, sister to Maasai mas), ~150K, Kenya (Samburu/Marsabit Counties — semi-nomadic pastoralists in Northern Frontier).
  // Sources: Ethnologue 27 'saq'; Glottolog samb1300; Heine (1980) Samburu Texts; Payne (1995) Samburu phonology.
  // Bari — Nilotic Eastern (sister to Maasai mas, Samburu saq within Maa cluster), ~600K, South Sudan (Central Equatoria — Juba region) + Uganda (West Nile — Moyo District).
  // Sources: Ethnologue 27 'bfa'; Glottolog bari1284; Owen (1908) Bari Grammar.
  bfa: { name: 'Bari', native: 'Karo Bari', lat: 4.85, lng: 31.61, // Juba, South Sudan (Bari heartland)
},
  saq: { name: 'Samburu', native: 'Sampur', lat: 1.05, lng: 36.69, // Maralal, Samburu County, Kenya
},
  // Afro-Asiatic (Cushitic)
  // (sid Sidamo moved to later block — see end of LANG_DATA, audit §6.28 dedup Session 4)
  aa: { name: 'Afar', native: 'Qafaraf', lat: 11.57, lng: 41.43, // Asaita
},
  // Afro-Asiatic (Berber, Morocco)
  shi: { name: 'Tashelhit', native: 'Tashelḥit', lat: 30.42, lng: -9.60, // Agadir
},
  rif: { name: 'Tarifit', native: 'Tarifiyt', lat: 35.25, lng: -3.93, // Al Hoceima
},
  // Shawiya (Tachawit, Chaouia) — Afro-Asiatic Berber Northern Berber Zenati (sister to Tarifit rif, Tashelhit shi, Chenoua within the Zenati branch; closely related to Kabyle kab but with distinct lexicon and palatalization patterns), ~2M, Algeria (Aurès Mountains — Batna, Khenchela, Oum El Bouaghi, Souk Ahras, Tébessa wilayas).
  // Sources: Ethnologue 27 'shy'; Glottolog tach1249; Penchoen (1973) Tamazight of the Ayt Ndhir; Mercier (1896) Le Chaouia de l'Aurès.
  shy: { name: 'Shawiya', native: 'Tacawit', lat: 35.55, lng: 6.17, // Batna, Aurès, Algeria
},
  // Indo-Aryan (large missing)
  mwr: { name: 'Marwari', native: 'मारवाड़ी', lat: 26.24, lng: 73.02, // Jodhpur
},
  bgc: { name: 'Haryanvi', native: 'हरयाणवी', lat: 28.90, lng: 76.59, // Rohtak
},
  ks: { name: 'Kashmiri', native: 'کٲشُر', lat: 34.08, lng: 74.80, // Srinagar
},
  kok: { name: 'Konkani', native: 'कोंकणी', lat: 15.50, lng: 73.83, // Panaji, Goa
},
  // === Phase 3H: Sinitic (Chinese) varieties ===
  // Min branch
  mnp: { name: 'Min Bei (Northern Min)', native: '建瓯话', lat: 27.04, lng: 118.30, // Jian'ou
},
  // (cpx Pu-Xian Min moved to later block — see end of LANG_DATA, audit §6.28 dedup Session 4)
  nan_te: { name: 'Teochew', native: '潮州话', lat: 23.35, lng: 116.68, // Shantou
},
  // Yue (Cantonese branch)
  yue_ts: { name: 'Taishanese', native: '台山话', lat: 22.25, lng: 112.79, // Taishan
},
  // Wu branch (additional varieties — wuu_wz / wuu_sz moved to later block, audit §6.28 dedup Session 4)
  // Independent / regional Sinitic
  czh: { name: 'Hui Chinese', native: '徽州话', lat: 29.71, lng: 118.32, // Tunxi (Huangshan)
},
  cnp: { name: 'Pinghua', native: '平话', lat: 22.82, lng: 108.26, // Nanning (W; separated from yue_nn Nanning Baihua which shares the city — both were at 108.32 and collided)
},
  // Mandarin sub-varieties
  zh_jh: { name: 'Jianghuai Mandarin', native: '江淮官话', lat: 32.06, lng: 118.80, // Nanjing
},
  zh_tj: { name: 'Tianjin Mandarin', native: '天津话', lat: 39.13, lng: 117.20, // Tianjin
},
  zh_lz: { name: 'Lanyin Mandarin', native: '兰银官话', lat: 36.06, lng: 103.83, // Lanzhou
},
  // Dungan (Mandarin in Cyrillic, Central Asia)
  dng: { name: 'Dungan', native: 'Хуэйзў йүян', lat: 42.84, lng: 75.30, // Tokmok, Kyrgyzstan
},
  // === Phase 3I: European minority + Uralic minority ===
  // West Slavic minor
  hsb: { name: 'Upper Sorbian', native: 'Hornjoserbšćina', lat: 51.18, lng: 14.42, // Bautzen
},
  csb: { name: 'Kashubian', native: 'Kaszëbsczi', lat: 54.35, lng: 18.65, // Gdańsk area
},
  // Rusyn — East Slavic, ~600K speakers across Slovakia, Ukraine (Transcarpathia), Poland, Serbia (Vojvodina).
  // Sources: Ethnologue 27 'rue'; Glottolog rusy1239; Plišková (2007) Rusyn Language in Slovakia.
  rue: { name: 'Rusyn', native: 'Русиньскый язык', lat: 49.07, lng: 21.74, // Prešov, Slovakia (codified standard)
},
  // Romance minor
  fur: { name: 'Friulian', native: 'Furlan', lat: 46.06, lng: 13.23, // Udine
},
  ast: { name: 'Asturian', native: 'Asturianu', lat: 43.36, lng: -5.85, // Oviedo
},
  // Extremaduran (Estremeñu) — Iberian-Romance, ~200K speakers, Extremadura Spain.
  // Sources: Ethnologue 27 'ext'; Glottolog extr1244; Viudas Camarasa (1988) Diccionario Extremeño.
  ext: { name: 'Extremaduran', native: 'Estremeñu', lat: 39.47, lng: -6.37, // Cáceres, Extremadura
},
  // Fala (A Fala de Xálima, Galician-Asturian-Portuguese transition, sometimes "the third Spanish language") — Iberian Romance, ~10K, Spain (Cáceres, Extremadura — Vall de Xálima).
  // Sources: Ethnologue 27 'fax'; Glottolog fala1241; Costas González (1999) Fala phonology.
  fax: { name: 'Fala', native: 'A Fala', lat: 40.10, lng: -6.79, // San Martín de Trevejo, Extremadura
},
  an: { name: 'Aragonese', native: 'Aragonés', lat: 42.57, lng: -0.55, // Jaca
},
  rup: { name: 'Aromanian', native: 'Armâneashti', lat: 40.52, lng: 22.20, // Veria area
},
  // Megleno-Romanian — Eastern Romance (sister to ro Romanian and rup Aromanian, third smallest of 4 Eastern Romance branches), ~5K, Greece (Meglen Valley) + small Republic of North Macedonia.
  // Sources: Ethnologue 27 'ruq'; Glottolog megl1237; Atanasov (1990) Meglenoromâna.
  ruq: { name: 'Megleno-Romanian', native: 'Vlaheşte', lat: 41.08, lng: 22.18, // Notia, Pella regional unit (Meglen valley), Greece
},
  wa: { name: 'Walloon', native: 'Walon', lat: 50.63, lng: 5.57, // Liège
},
  // Uralic minor (Russia) — Audit Task 179: kv (ISO 639-1 macro for Komi)
  // removed; kpv (ISO 639-3 Komi-Zyrian) is the canonical specific code.
  // koi Komi-Permyak below is a distinct Permic language.
  kpv: { name: 'Komi-Zyrian', native: 'Коми кыв', lat: 61.67, lng: 50.84, // Syktyvkar
},
  koi: { name: 'Komi-Permyak', native: 'Перем коми кыв', lat: 60.40, lng: 56.10, // Kudymkar
},
  udm: { name: 'Udmurt', native: 'удмурт кыл', lat: 56.85, lng: 53.22, // Izhevsk
},
  mhr: { name: 'Meadow Mari', native: 'марий йылме', lat: 56.63, lng: 47.89, // Yoshkar-Ola
},
  // Audit Task 142 (Tier 2): Hill Mari sister to Meadow Mari (mhr).
  // Mutually intelligible to limited degree but treated as distinct
  // standard varieties; Hill Mari uses Cyrillic with extra letters
  // ä/ö/ü/ӓ/ӧ/ӱ.
  mrj: { name: 'Hill Mari', native: 'мары йӹлмӹ', lat: 56.20, lng: 46.04, // Kozmodemyansk
},
  myv: { name: 'Erzya', native: 'эрзянь кель', lat: 54.18, lng: 45.18, // Saransk
},
  // Mordvinic pair (Audit Task 141): Moksha sister to Erzya, mutually
  // distinct enough that linguists treat them as separate languages.
  mdf: { name: 'Moksha', native: 'мокшень кяль', lat: 54.18, lng: 45.18, // Saransk
},
  krl: { name: 'Karelian', native: 'Karjalan kieli', lat: 61.79, lng: 34.36, // Petrozavodsk
},
  // Livvi-Karelian (Olonets, Aunus) — Uralic Finnic (sister to krl Karelian; some classifications treat as one Karelian language with sub-dialects), ~14K, Russia (Karelia — Olonets/Aunus south of Lake Ladoga).
  // Sources: Ethnologue 27 'olo'; Glottolog livv1244; Pyöli (1996) Russian-Karelian Dictionary (Olonets).
  olo: { name: 'Livvi-Karelian', native: 'Livvinkarjala', lat: 61.00, lng: 32.99, // Olonets, Republic of Karelia
},
  // Endangered Finnic (Audit Task 142): Veps + Votic
  vep: { name: 'Veps', native: 'vepsän kel\'', lat: 60.33, lng: 35.63, // Sheltozero
},
  vot: { name: 'Votic', native: 'vaďďa tšeeli', lat: 59.55, lng: 28.20, // Krakolye
},
  // Livonian — UNESCO critically endangered Finnic language of Latvia,
  // ~30 partial speakers (last fluent native died 2013). Latin script
  // with macron/breve diacritics. Source: Viitso 1998 + EKI Livonian
  // dictionary.
  liv: { name: 'Livonian', native: 'Līvõ kēļ', lat: 57.69, lng: 22.32, // Mazirbe, Latvia
},
  // === Phase 3J: Iranian + Turkic + Tibeto-Burman ===
  // Iranian (Caspian + Zagros)
  mzn: { name: 'Mazandarani', native: 'مازرونی', lat: 36.57, lng: 53.06, // Sari
},
  glk: { name: 'Gilaki', native: 'گیلکی', lat: 37.28, lng: 49.59, // Rasht

    // Audit Task 200/173: full per-cell wordEvidence for source-checked
    // Gilaki row. Sources: Stilo, Donald (2001) "Caspian and Tatic" in
    // The Iranian Languages (Routledge, ed. Windfuhr); Rastorgueva &
    // Kerimova (1971) "Gilyanskij Jazyk" (Moscow, Iranian Academy);
    // Borjian, Habib (2005) "Gilan x. Languages" Encyclopaedia Iranica;
    // Christensen (1930) Contributions à la dialectologie iranienne.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Stilo (2001) Caspian and Tatic — Gilaki âb/ɒːb "water"; Caspian retention of Old Iranian *āp-', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'Rastorgueva & Kerimova (1971) Gilyanskij Jazyk — täš "fire"; Caspian Iranian *taxš-', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Stilo (2001) — āftāb "sun"; Persian loan widely adopted in Caspian languages alongside native xor', formType: 'free-word', note: 'native Caspian xor still used in compounds; āftāb is the modern citation form' },
      moon:   { evidence: 'direct', source: 'Stilo (2001) — māh "moon, month"; cf. Persian māh', formType: 'free-word' },
      mother: { evidence: 'direct', source: 'Borjian (2005) Encyclopaedia Iranica "Gilan x. Languages" — māri "mother"; distinct from Persian mādar (Caspian feminine -i suffix)', formType: 'free-word' },
      father: { evidence: 'direct', source: 'Stilo (2001) — pär "father"; cf. Old Iranian *pitar- with Caspian apocope', formType: 'free-word' },
      eat:    { evidence: 'direct', source: 'Rastorgueva & Kerimova (1971) — xordän infinitive "to eat"; West Iranian *xwar-', formType: 'free-word', note: 'lexical overlap with drink: West Iranian *xwar- "consume" covers both eating and drinking' },
      drink:  { evidence: 'direct', source: 'Rastorgueva & Kerimova (1971) — xordän infinitive "to drink"; same root as eat', formType: 'free-word', note: 'lexical overlap with eat: West Iranian *xwar- "consume" covers both eating and drinking' },
      love:   { evidence: 'direct', source: 'Borjian (2005) — ešq "love"; Arabic loan as in Persian', formType: 'free-word', note: 'pre-modern Caspian had native dūsi but ešq is now the citation form' },
      heart:  { evidence: 'direct', source: 'Stilo (2001) — del "heart"; pan-Iranian *dṛd-', formType: 'free-word' },
      tree:   { evidence: 'direct', source: 'Stilo (2001) — dār "tree, wood"; Old Iranian *dāru-', formType: 'free-word' },
      house:  { evidence: 'direct', source: 'Borjian (2005) — xäne "house"; Caspian reflex of Old Iranian *xāna-', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Stilo (2001) — säg "dog"; pan-Iranian *spaka-', formType: 'free-word' },
      cat:    { evidence: 'direct', source: 'Borjian (2005) — piši "cat"; nursery/onomatopoeic form parallel to Persian pišī', formType: 'free-word' },
      hand:   { evidence: 'direct', source: 'Stilo (2001) — däs "hand"; Caspian apocope of *dast', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'Borjian (2005) — čum "eye"; distinctive Caspian retention vs. Persian čašm', formType: 'free-word', note: 'characteristic Gilaki/Mazandarani feature: čum < *čaxšman- via different shortening than Persian' },
      hello:  { evidence: 'direct', source: 'Stilo (2001) — salām "hello"; Arabic-Persian loan as in all Iranian languages', formType: 'greeting-formula' },
      thanks: { evidence: 'direct', source: 'Borjian (2005) — mersi "thanks"; French loan via Persian (modern Caspian usage)', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: 'Rastorgueva & Kerimova (1971) — i-tā "one"; Caspian numeral with -tā classifier (cf. Persian yek)', formType: 'free-word', note: 'compound: i (numeral) + tā (classifier) — characteristic Caspian numeral construction' },
      good:   { evidence: 'direct', source: 'Stilo (2001) — xub "good"; Persian loan in widespread Caspian use', formType: 'free-word' },
    } },
   // ISO 639-3 lrc denotes NORTHERN Luri specifically. This row is kept as the
  // Lurish cover entry (~5M, all varieties) because Southern Luri (luz) and
  // Bakhtiari (bqi) have their own rows; see review phase 3, 2026-08-07.
 lrc: { name: 'Lurish', native: 'لۊری', lat: 33.49, lng: 48.36, // Khorramabad

    // Audit Task 200/173: full per-cell wordEvidence for source-checked
    // Northern Lurish row. Sources: Anonby, Erik (2003) "Update on Luri:
    // How many languages?" (JRAS 13.2); MacKinnon, Colin (2002) "Luri
    // Language and Literature" Encyclopaedia Iranica; Amanolahi, Sekandar
    // & Thackston, Wheeler (1986) Tales from Luristan (Harvard Iranian
    // Series 4); Lurish Documentation Project (Lori Language and Cultural
    // Foundation, ongoing).
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Anonby (2003) "Update on Luri" (JRAS) — āw "water"; Northwest Iranian *āp- with characteristic Lurish vowel lowering', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'MacKinnon (2002) Encyclopaedia Iranica "Luri Language" — täš "fire"; cf. Persian ātaš', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Amanolahi & Thackston (1986) Tales from Luristan — hovär "sun"; Lurish reflex of Old Iranian *hwar-', formType: 'free-word', note: 'distinctive Lurish form vs. Persian ḵoršid; preserves initial h- where Persian dropped' },
      moon:   { evidence: 'direct', source: 'Anonby (2003) — māng "moon"; cf. Persian māh, with Lurish nasal extension shared with Kurdish', formType: 'free-word' },
      mother: { evidence: 'direct', source: 'MacKinnon (2002) — dā "mother"; characteristic Lurish nursery form vs. Persian mādar', formType: 'free-word', note: 'shared with Kurdish dāyik and other Northwest Iranian — preserves *dāy-' },
      father: { evidence: 'direct', source: 'MacKinnon (2002) — buwā "father"; characteristic Lurish form (cf. Persian pedar)', formType: 'free-word' },
      eat:    { evidence: 'direct', source: 'Anonby (2003) — xwārdän infinitive "to eat"; West Iranian *xwar-', formType: 'free-word', note: 'lexical overlap with drink: West Iranian *xwar- "consume" covers both eating and drinking' },
      drink:  { evidence: 'direct', source: 'Anonby (2003) — xwārdän infinitive "to drink"; same root as eat', formType: 'free-word', note: 'lexical overlap with eat: West Iranian *xwar- "consume" covers both eating and drinking' },
      love:   { evidence: 'direct', source: 'MacKinnon (2002) — ešq "love"; Arabic loan as throughout Iranian', formType: 'free-word' },
      heart:  { evidence: 'direct', source: 'Anonby (2003) — del "heart"; pan-Iranian *dṛd-', formType: 'free-word' },
      tree:   { evidence: 'direct', source: 'Anonby (2003) — dār "tree, wood"; Old Iranian *dāru-', formType: 'free-word' },
      house:  { evidence: 'direct', source: 'MacKinnon (2002) — hune "house"; Lurish development with initial h- (vs. Persian xāna)', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Anonby (2003) — säg "dog"; pan-Iranian *spaka-', formType: 'free-word' },
      cat:    { evidence: 'direct', source: 'MacKinnon (2002) — pešile "cat"; characteristic Lurish/Bakhtiari diminutive form', formType: 'free-word', note: '-ile diminutive suffix common in Zagros Iranian languages' },
      hand:   { evidence: 'direct', source: 'Anonby (2003) — däs "hand"; Lurish apocope of *dast (shared with Caspian)', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'Anonby (2003) — čäš "eye"; pan-Iranian *čašm-', formType: 'free-word' },
      hello:  { evidence: 'direct', source: 'MacKinnon (2002) — salām "hello"; Arabic-Persian loan ubiquitous in Iranian', formType: 'greeting-formula' },
      thanks: { evidence: 'direct', source: 'MacKinnon (2002) — mersi "thanks"; French loan via Persian standard usage', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: 'Anonby (2003) — yäk "one"; Old Iranian *aiwa- with West Iranian *yak development', formType: 'free-word' },
      good:   { evidence: 'direct', source: 'MacKinnon (2002) — xās "good"; characteristic Lurish/Bakhtiari form (cf. Persian xub)', formType: 'free-word', note: 'distinctive Lurish-area lexeme vs. Persian xub; cognate with classical xāṣ "noble, choice"' },
    } },
  // Turkic (additional)
  crh: { name: 'Crimean Tatar', native: 'Qırımtatar tili', lat: 44.95, lng: 34.10, // Simferopol
},
  tt: { name: 'Tatar', native: 'татар теле', lat: 55.79, lng: 49.12, // Kazan
},
  ba: { name: 'Bashkir', native: 'башҡорт теле', lat: 54.74, lng: 55.97, // Ufa
},
  krc: { name: 'Karachay-Balkar', native: 'къарачай-малкъар тил', lat: 44.23, lng: 42.05, // Cherkessk area
},
  // Tibeto-Burman / Karen (Kra-Dai for shn)
  ksw: { name: 'Sgaw Karen', native: 'ကညီကျိာ်', lat: 16.89, lng: 97.63, // Hpa-an
},
  // Western Pwo Karen — Sino-Tibetan Karenic Pwo (sister to Sgaw Karen ksw within the Karenic branch; Pwo is more conservative phonologically), ~1.6M, Myanmar (Irrawaddy Delta and Bago Region) + Thailand (Tak, Mae Hong Son, Kanchanaburi).
  // Sources: Ethnologue 27 'pwo'; Glottolog wpwo1238; Phillips (2009) Pwo Karen Phonology and Lexicon.
  pwo: { name: 'Western Pwo Karen', native: 'ဖျိၣ်ၤ', lat: 17.34, lng: 96.49, // Pathein, Ayeyarwady Region, Myanmar
},
  // Audit Task 146: Lahu surface normalized to consistent Matisoff
  // romanization with POST-vowel tone markers (no combining diacritics
  // in surface). Matisoff conventions: ˆ = high, ˇ = low, ˉ = mid,
  // unmarked = mid. IPA column unchanged (combining diacritics OK there).
  lhu: { name: 'Lahu', native: 'Lahu hkâw', lat: 22.97, lng: 100.05, // Mengmang
},
  lis: { name: 'Lisu', native: 'Lisu', lat: 25.85, lng: 98.86, // Nujiang
},
  nxq: { name: 'Naxi', native: 'Naqxi', lat: 26.86, lng: 100.23, // Lijiang

    // Audit Task 200/173: full per-cell wordEvidence for source-checked
    // Naxi (Western/Lijiang) row. Sources: He Jiren & Jiang Zhuyi (1985)
    // Naxiyu Jianzhi (北京: 民族出版社, "A Sketch of Naxi"); Pinson, Thomas
    // M. (2012) A Naxi-Chinese-English Dictionary (Yunnan Nationalities
    // Pub.); Naxi Pinyin orthography (1957/1981 official Lijiang dialect
    // standard, used in Naxi-Chinese-English dictionaries and SIL
    // documentation). Pinyin tone letters: -l = ˥ high, -q = ˨˩ low,
    // -x = ˧˩ falling, plain = ˧ mid (per Pinson 2012 §1.3).
    wordEvidence: {
      water:  { evidence: 'direct', source: 'He Jiren & Jiang Zhuyi (1985) Naxiyu Jianzhi — gee/ɡɯ˧ "water"; common Tibeto-Burman *kwi/*gji', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'Pinson (2012) Naxi-Chinese-English Dictionary — mee/mɯ˧ "fire"; Tibeto-Burman *mey', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'He & Jiang (1985) — ny-mei/nĩ˧mi˧ "sun" (lit. "day-fem"); compound noun', formType: 'compound', note: 'compound with -mei "female/diminutive" classifier on celestial bodies' },
      moon:   { evidence: 'direct', source: 'He & Jiang (1985) — he-mei/hɯ˧mi˧ "moon"; compound parallel to ny-mei', formType: 'compound' },
      mother: { evidence: 'direct', source: 'Pinson (2012) — mei/mi˧ "mother"; basic kinship term', formType: 'free-word' },
      father: { evidence: 'direct', source: 'Pinson (2012) — av/a˧ "father"; basic kinship term, often appearing with -v marker', formType: 'free-word' },
      eat:    { evidence: 'direct', source: 'He & Jiang (1985) — zo/d͡zo˧ "to eat"; Tibeto-Burman *dza', formType: 'free-word' },
      drink:  { evidence: 'direct', source: 'Pinson (2012) — chil/t͡ʂʰi˥ "to drink"; Naxi pinyin -l = high tone ˥', formType: 'free-word' },
      love:   { evidence: 'direct', source: 'Pinson (2012) — lai/lɑ˧ "to love, like"; basic verb', formType: 'free-word' },
      heart:  { evidence: 'direct', source: 'He & Jiang (1985) — see-zai/sɯ˧d͡zɑ˧ "heart"; compound see "interior" + zai "core/seed"', formType: 'compound' },
      tree:   { evidence: 'direct', source: 'Pinson (2012) — si/si˧ "tree"; Tibeto-Burman *siŋ', formType: 'free-word' },
      house:  { evidence: 'direct', source: 'He & Jiang (1985) — pee-mei/pɯ˧mi˧ "house"; compound with classifier -mei', formType: 'compound' },
      dog:    { evidence: 'direct', source: 'Pinson (2012) — kee/kʰɯ˧ "dog"; Tibeto-Burman *kwəy', formType: 'free-word' },
      cat:    { evidence: 'direct', source: 'Pinson (2012) — lai-mei/lɑ˧mi˧ "cat"; compound (lai "feline" + -mei classifier)', formType: 'compound' },
      hand:   { evidence: 'direct', source: 'Pinson (2012) — lel/lɯ˥ "hand"; Naxi pinyin -l = high tone ˥', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'Pinson (2012) — nyi/ɲi˧ "eye"; Tibeto-Burman *myik', formType: 'free-word' },
      hello:  { evidence: 'direct', source: 'Pinson (2012) Naxi-Chinese-English Dictionary — nyel-bbeq "be well/peaceful"; nyel(-l ˥) + bbeq(-q ˨˩) = greeting formula', formType: 'greeting-formula' },
      thanks: { evidence: 'direct', source: 'Pinson (2012) — jjuq jjuq "thanks"; reduplication of jjuq (cf. attested compound jjuq cee) for emphasis', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: 'He & Jiang (1985) — ddee/dɯ˧ "one"; Lijiang/Dayan dialect numeral (corroborated by Omniglot Naxi numerals page)', formType: 'free-word' },
      good:   { evidence: 'direct', source: 'Pinson (2012) — ai/ɑ˧ "good"; basic adjective', formType: 'free-word' },
    } },
  // Tai (Kra-Dai, Myanmar)
  shn: { name: 'Shan', native: 'လိၵ်ႈတႆး', lat: 20.78, lng: 97.04, // Taunggyi
},
  // Jiamao (Jiamao Hlai) — Tai-Kadai (Kra-Dai) Hlaic (a divergent member of the Hlai branch of Kra-Dai; some classifications place Jiamao outside Hlai due to its substantial divergence from other Hlai varieties; the Hlai/Li are the indigenous people of Hainan island, distinct from the Han Chinese majority), ~3K (severely endangered — UNESCO severely endangered; on the verge of extinction with only elderly speakers remaining), China (Hainan province — Baoting Li and Miao Autonomous County, Lingshui Li Autonomous County in southern Hainan).
  // Sources: Ethnologue 27 'jio'; Glottolog jiam1236; Ouyang & Zheng (1980) Jiamao Hlai linguistic studies.
  jio: { name: 'Jiamao', native: 'Jiamao', lat: 18.62, lng: 109.70, // Baoting, Hainan, China
},
  // === Phase 3K: African Bantu/Khoisan/W. African (more) ===
  // Niger-Congo (Kwa, additional)
  // Kabiye — Gur language, ~1.2M, Togo (one of two national languages alongside Ewe).
  // Sources: Ethnologue 27 'kbp'; Glottolog kabi1261.
  kbp: { name: 'Kabiye', native: 'Kabɩyɛ', lat: 9.55, lng: 1.18, // Kara, Togo
},
  ee: { name: 'Ewe', native: 'Eʋegbe', lat: 6.13, lng: 1.22, // Lomé
},
  // Gen (Mina) — Niger-Congo Kwa Gbe, ~400-500K, Maritime Region Togo (Aného area). Sister to Ewe (ee) within the Gbe cluster.
  // Sources: Ethnologue 27 'gej'; Glottolog mina1268; Bole-Richard (1983) Description du gen.
  gej: { name: 'Gen', native: 'Gengbe', lat: 6.23, lng: 1.59, // Aného, Togo (Mina/Gen heartland)
},
  // Aja (Adja-Gbe) — Niger-Congo Volta-Niger Gbe (sister to Ewe ee, Fon fon, Gen gej within the Gbe branch; the historical "ancestral" Gbe variety from which the Ewe and Fon migrated southward in the 17th century), ~600K, Benin (Couffo, Mono, Plateau departments — Aplahoué, Klouékanmè, Dogbo) + Togo (Plateaux Region).
  // Sources: Ethnologue 27 'aja'; Glottolog ajag1239; Capo (1991) A Comparative Phonology of Gbe.
  aja: { name: 'Aja', native: 'Ajagbe', lat: 6.93, lng: 1.78, // Aplahoué, Couffo Department, Benin
},
  // Niger-Congo (Bantu, additional)
  nyn: { name: 'Runyankole', native: 'Runyankore', lat: -0.61, lng: 30.66, // Mbarara
},
  // Runyakitara cluster (Audit Task 150 Batch F): Chiga, Tooro, Nyoro
  cgg: { name: 'Chiga', native: 'Rukiga', lat: -1.25, lng: 29.98, // Kabale
},
  ttj: { name: 'Tooro', native: 'Rutooro', lat: 0.66, lng: 30.27, // Fort Portal
},
  nyo: { name: 'Nyoro', native: 'Runyoro', lat: 1.43, lng: 31.34, // Hoima
},
  luy: { name: 'Luhya', native: 'Oluluhia', lat: 0.28, lng: 34.75, // Kakamega
},
  ssw: { name: 'Swazi', native: 'siSwati', lat: -26.31, lng: 31.13, // Mbabane
},
  nbl: { name: 'Southern Ndebele', native: 'isiNdebele', lat: -25.69, lng: 28.85, // KwaNdebele
},
  // Northern Ndebele — Bantu Nguni, ~1.6M, Zimbabwe official language. Distinct from Southern Ndebele (nbl) of South Africa.
  // Sources: Ethnologue 27 'nde'; Pelling (1971) Ndebele-English Dictionary.
  nd: { name: 'Northern Ndebele', native: 'isiNdebele', lat: -20.16, lng: 28.58, // Bulawayo
},
  nso: { name: 'Northern Sotho', native: 'Sesotho sa Leboa', lat: -23.90, lng: 29.45, // Polokwane
},
  // Niger-Congo (Bantu, A zone)
  fan: { name: 'Fang', native: 'Fang', lat: 0.39, lng: 9.45, // Libreville
},
  // Khoisan (with click consonants)
  naq: { name: 'Nama (Khoekhoe)', native: 'Khoekhoegowab', lat: -22.55, lng: 17.08, // Windhoek
},
  hts: { name: 'Hadza', native: 'Hadzane', lat: -3.65, lng: 35.05, // Lake Eyasi
},
  // Tuu (formerly classified as Southern Khoisan). Taa / !Xóõ is the world record-holder for
  // documented phoneme inventory size — Anthony Traill (1985, 1994) describes ~159 phonemes
  // including five primary click types: dental (ǀ), alveolar (ǃ), lateral (ǁ), palatal (ǂ),
  // and the rare bilabial (ʘ), plus pulmonic and click clusters with multiple accompaniments.
  // Vocabulary partial: only cells with confident Traill (1994) attestation are filled; the
  // remainder are marked '—' under dataStatus:'fragmentary' (DATA_STATUS_OVERRIDES) rather
  // than fabricated. Sources: Traill (1985) "Phonetic and Phonological Studies of !XÓÕ
  // Bushman"; Traill (1994) "A !Xóõ Dictionary"; Glottolog taaa1242.
  nmn: { name: 'Taa', native: 'Taa', lat: -22.00, lng: 22.00, // eastern Ghanzi District, Botswana
    // Cell-by-cell forms below are reconciled to the Traill (1994) !Xóõ Dictionary
    // forms preserved in the Wiktionary !Xóõ Swadesh appendix (which cites Traill
    // 1994 explicitly). Earlier auto-generated forms (ʘnâa for "one", ǂnúm for
    // "eye") were not located in Traill 1994 and have been replaced with the
    // sourced ones (ǂʼûã / ǃʼûĩ). The Wikipedia Taa article also confirms
    // ǂʼûã = "one" (cf. ǂnûm = "two", ǁâe = "three"; numerals above three are
    // Tswana/Kgalagadi loans).

    wordEvidence: {
      water:  { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #62 water)' },
      fire:   { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #83 fire) — dental click with ejective accompaniment' },
      sun:    { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #58 sun) — lateral click with ejective and nasalised vowel' },
      moon:   { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #59 moon) — alveolar click with aspirated uvular accompaniment and nasalised vowel' },
      mother: { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #14 mother)' },
      father: { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #13 father) — creaky-voiced low vowel' },
      eat:    { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #93 eat) — glottal stop + nasalised vowel' },
      drink:  { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #92 drink) — velar ejective affricate' },
      heart:  { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #75 heart) — dental click with ejective uvular accompaniment' },
      tree:   { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #43 tree) — bilabial click (ʘ), one of the rare languages with phonemic bilabial clicks' },
      dog:    { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #45 dog) — palatal click with aspirated uvular accompaniment' },
      hand:   { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #71 hand) — dental click with velar ejective accompaniment' },
      eye:    { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #68 eye) — alveolar click with ejective and nasalised vowel; supersedes prior ǂnúm form which corresponds to "two" not "eye" per Wikipedia Taa article' },
      one:    { evidence: 'direct', source: 'Traill (1994) A !Xóõ Dictionary (via Wiktionary !Xóõ Swadesh appendix, item #5 one; confirmed by Wikipedia Taa article) — palatal click with ejective and nasalised vowel; supersedes prior ʘnâa form which was not found in Traill 1994' }
    }},
  // Nilo-Saharan / Saharan
  kr: { name: 'Kanuri', native: 'Kanuri', lat: 11.85, lng: 13.16, // Maiduguri
},
  // Niger-Congo (Mande, Atlantic)
  men: { name: 'Mende', native: 'Mende', lat: 7.96, lng: -11.74, // Bo, Sierra Leone
},
  // Vai — Mande, ~120K speakers, Liberia + Sierra Leone. Has its own indigenous syllabary (Unicode 5.1).
  // Sources: Ethnologue 27 'vai'; Glottolog vaii1239; Welmers (1976) Reference Grammar of Vai.
  vai: { name: 'Vai', native: 'ꕙꔤ', lat: 6.84, lng: -11.36, // Robertsport, Liberia
},
  // Themne — Atlantic-Congo Mel branch, Sierra Leone (Audit Task 149 Batch 3)
  tem: { name: 'Themne', native: 'KʌThemnɛ', lat: 8.88, lng: -12.05, // Makeni
},
  dyu: { name: 'Dyula', native: 'Julakan', lat: 11.18, lng: -4.30, // Bobo-Dioulasso
},
  // Konabéré (Konabéré-Sangué, "Bobo Konabéré") — Niger-Congo Mande Western (Bobo-Konabéré subgroup), ~32K, Burkina Faso (around Bobo-Dioulasso).
  // Sources: Ethnologue 27 'bbo'; Glottolog kona1268; Le Bris (1986) Bobo Konabéré phonology.
  bbo: { name: 'Konabéré', native: 'Konabéré', lat: 11.17, lng: -4.30, // Bobo-Dioulasso area, Burkina Faso
},
  // Senoufo Supyire (Suppire) — Niger-Congo (Atlantic-Congo, Senufo, Senari — sister to Mamara, Sicite, and other Senufo cluster), ~750K, Mali (Sikasso Region — Sikasso, Koutiala) + small Burkina Faso border.
  // Sources: Ethnologue 27 'spp'; Glottolog supy1237; Carlson (1994) A Grammar of Supyire.
  spp: { name: 'Senoufo Supyire', native: 'Suppire', lat: 11.32, lng: -5.67, // Sikasso, Mali (Senufo cultural center)
},
  // Susu (Soso) — Mande, ~1.2M speakers, coastal Guinea + Sierra Leone. National language of Guinea.
  // Sources: Ethnologue 27 'sus'; Glottolog susu1250; Houis (1963) Etude descriptive de la langue Susu.
  sus: { name: 'Susu', native: 'Sosokuye', lat: 9.51, lng: -13.71, // Conakry, Guinea
},
  // === Phase 3L: more Indigenous Americas + remaining S Asian/SE Asian ===
  // Indo-Aryan (more)
  syl: { name: 'Sylheti', native: 'ꠍꠤꠟꠐꠤ', lat: 24.89, lng: 91.87, // Sylhet
},
  // Audit Task 142 (Tier 2): Rohingya — Indo-Aryan, ~1.8M, Myanmar
  // (Rakhine) and Bangladesh (Cox's Bazar refugee camps). Hanifi
  // Rohingya script primary today (Hanifi, 1980s); Latin Rohingyalish
  // common online; Bengali-script attestation also exists. Surface
  // here uses Latin Rohingyalish for cross-platform compatibility.
  // Tonal — unusual among Indo-Aryan languages.
  rhg: { name: 'Rohingya', native: 'Ruáingga', lat: 21.43, lng: 91.99, // Cox's Bazar
},
  // Audit Task 142 (Tier 2): Chittagonian — Eastern Indo-Aryan, ~13M.
  // Frequently raised in macrolanguage debates: spoken in Chittagong
  // Division of Bangladesh, often classified as a Bengali (bn) dialect
  // by Bangladeshi linguistic policy but as a separate language by
  // Glottolog and Ethnologue (ISO 639-3 ctg distinct from ben).
  ctg: { name: 'Chittagonian', native: 'চাটগাঁইয়া বুলি', lat: 22.36, lng: 91.83, // Chittagong
},
  mag: { name: 'Magahi', native: 'मगही', lat: 25.59, lng: 85.14, // Patna
},
  doi: { name: 'Dogri', native: 'डोगरी', lat: 32.73, lng: 74.86, // Jammu
},
  // Austroasiatic (Mon-Khmer additional)
  // mon (incorrect ISO code; conflicts with ISO 639-1 'mon' = Mongolian)
  // removed Session 51 — canonical Mon-language entry is `mnw` (ISO 639-3).
  // omx Old Mon HIST_DESCENDANT updated to point at mnw.
  // Iroquoian (NE North America)
  moh: { name: 'Mohawk', native: 'Kanien\'kéha', lat: 45.42, lng: -73.66, // Kahnawake
},
  // Muskogean (SE North America)
  cho: { name: 'Choctaw', native: 'Chahta anumpa', lat: 32.30, lng: -89.69, // Mississippi Choctaw
},
  // Muscogee (Creek) — Muskogean, ~4K speakers, Oklahoma + Florida (Seminole). Sister to Choctaw (cho).
  // Sources: Ethnologue 27 'mus'; Glottolog cree1271; Martin (2011) Grammar of Creek (Muskogee).
  mus: { name: 'Muscogee (Creek)', native: 'Mvskoke', lat: 35.85, lng: -95.94, // Okmulgee, OK (Muscogee Nation HQ)
},
  // Eskimo-Aleut (Yupik + Inupiaq)
  esu: { name: 'Central Alaskan Yupik', native: 'Yugtun', lat: 60.79, lng: -161.76, // Bethel
},
  // Central Siberian Yupik (Yupik, Saint Lawrence Island/Chukchi) — Eskimo-Aleut, ~1K, Russia (Chukotka Coast) + USA (Alaska, Saint Lawrence Island Gambell, Savoonga).
  // Sources: Ethnologue 27 'ess'; Glottolog cent2127; Jacobson (2001) A Practical Grammar of the Central Yupʼik Eskimo Language.
  ess: { name: 'Central Siberian Yupik', native: 'Юпик ситвэлкэн', lat: 63.78, lng: -171.74, // Gambell, Saint Lawrence Island
},
  // Aleut — sole surviving Aleut branch of Eskimo-Aleut family,
  // ~150 speakers (severely endangered) split between Alaska
  // (Aleutian/Pribilof Islands) and Russia (Commander Islands —
  // Bering/Mednyj). Dominant Eastern dialect (Atka standard).
  // Source: Bergsland (1994) Aleut dictionary; community materials.
  ale: { name: 'Aleut', native: 'Унаӈан тунуу', lat: 52.20, lng: -174.20, // Atka, AK
},
  // Athabaskan
  apw: { name: 'Western Apache', native: 'Ndee bizaa', lat: 33.84, lng: -109.96, // Whiteriver, AZ
},
  // Siouan / Algonquian (more)
  dak: { name: 'Dakota', native: 'Dakhótiyapi', lat: 45.66, lng: -97.05, // Sisseton, SD
},
  chy: { name: 'Cheyenne', native: 'Tsêhésenêstsestôtse', lat: 45.62, lng: -106.66, // Lame Deer
},
  // Arapaho — Algonquian Plains (sister to Cheyenne chy and Gros Ventre within the Arapahoan sub-branch), ~1K (critically endangered — UNESCO critically endangered), USA (Wyoming — Wind River Indian Reservation; Oklahoma — Anadarko/Concho area).
  // Sources: Ethnologue 27 'arp'; Glottolog arap1274; Salzmann (1956) Arapaho grammar.
  arp: { name: 'Arapaho', native: 'Hinónoʼeitíít', lat: 43.06, lng: -108.64, // Wind River Reservation, Wyoming
},
  // Kiowa — Kiowa-Tanoan family (sister to Tanoan languages: Tewa, Tiwa, Towa), ~20-100 (heritage learners), Oklahoma USA (Kiowa Tribe headquarters at Carnegie).
  // Sources: Ethnologue 27 'kio'; Glottolog kiow1267; Watkins (1984) A Grammar of Kiowa.
  kio: { name: 'Kiowa', native: 'Cáuijògà', lat: 35.10, lng: -98.60, // Carnegie, Oklahoma (Kiowa Tribe headquarters)
},
  // === Phase 3M: Italian regional + S Asian + Pacific ===
  // Romance (Italian regional)
  lmo: { name: 'Lombard', native: 'Lombard', lat: 45.46, lng: 9.19, // Milan
},
  pms: { name: 'Piedmontese', native: 'Piemontèis', lat: 45.07, lng: 7.69, // Turin
},
  mwl: { name: 'Mirandese', native: 'Mirandés', lat: 41.50, lng: -6.27, // Miranda do Douro
},
  // Hellenic (regional)
  pnt: { name: 'Pontic Greek', native: 'Ποντιακά', lat: 40.64, lng: 22.94, // Thessaloniki diaspora
},
  // Indo-Aryan (additional)
  hno: { name: 'Hindko', native: 'ہندکو', lat: 34.02, lng: 71.58, // Peshawar
},
  bhb: { name: 'Bhili', native: 'भीली', lat: 23.55, lng: 74.45, // Banswara
},
  // Chamic (Austronesian). Two Cham languages: Western Cham (cja, Muslim
  // communities of Cambodia / An Giang, written in Jawi Arabic script) and
  // Eastern Cham (cjm, Ninh Thuận/Bình Thuận Vietnam, written in the Cham
  // Brahmic script Akhar Thrah). cja formerly sat at Phan Rang — that is
  // Eastern Cham territory, so it moved west and cjm took the coastal spot.
  cja: { name: 'Western Cham', native: 'چام', lat: 10.70, lng: 105.11, // Châu Đốc, An Giang
},
  cjm: { name: 'Eastern Cham', native: 'ꨌꩌ', lat: 11.57, lng: 108.99, // Phan Rang, Ninh Thuận
},
  // Motu — Austronesian Oceanic, ~14K speakers, Central Province PNG. Pure form, distinct from Hiri Motu pidgin (hmo).
  // Sources: Ethnologue 27 'meu'; Glottolog motu1246; Lister-Turner & Clark (1931) Grammar of the Motu Language.
  meu: { name: 'Motu', native: 'Motu', lat: -9.50, lng: 147.20, // Hanuabada (Motu heartland) near Port Moresby
},
  pon: { name: 'Pohnpeian', native: 'Lokaiahn Pohnpei', lat: 6.96, lng: 158.21, // Kolonia
},
  // Kosraean — Micronesian, ~8K speakers, Kosrae state of FSM. Most divergent surviving Micronesian language.
  // Sources: Ethnologue 27 'kos'; Glottolog kosr1238; Lee (1976) Kosraean Reference Grammar.
  kos: { name: 'Kosraean', native: 'Kahnka Kosrae', lat: 5.31, lng: 162.98, // Tofol, Kosrae
},
  // Old Greek branch + Aramaic Modern
  // syr: removed 2026-05-13 — duplicate of `aii` (Assyrian Neo-Aramaic),
  // same coords / 18 of 20 surface forms identical. aii is the canonical
  // ISO 639-3 entry for the modern spoken language; Classical Syriac
  // remains covered separately by `syc`.
  // Mandaic (Classical) — Aramaic, ~5K liturgical (~50 fluent), Iraq + Iran + diaspora. Unique Mandaic script.
  // Sources: Ethnologue 27 'myz'; Glottolog clas1252; Macuch (1965) Handbook of Classical and Modern Mandaic.
  myz: { name: 'Classical Mandaic', native: 'ࡌࡀࡍࡃࡀࡉࡉࡀ', lat: 32.76, lng: 47.08, // Khuzestan, Iran (modern Mandaean homeland)
},
  // Bantu Eastern (Mozambique)
  vmw: { name: 'Makhuwa', native: 'eMakhuwa', lat: -15.12, lng: 39.27, // Nampula
},
  // === Phase 3N: rare/iconic — small Slavic, Celtic revival, isolates, S American ===
  // Slavic minor (Lower Sorbian)
  dsb: { name: 'Lower Sorbian', native: 'Dolnoserbšćina', lat: 51.76, lng: 14.33, // Cottbus
},
  // Celtic revival
  gv: { name: 'Manx', native: 'Gaelg', lat: 54.15, lng: -4.49, // Douglas, IoM
},
  kw: { name: 'Cornish', native: 'Kernewek', lat: 50.27, lng: -5.05, // Truro
},
  // Iranian (Zaza-Gorani branch)
  zza: { name: 'Zaza', native: 'Zazakî', lat: 39.11, lng: 39.55, // Tunceli (Dersim)
},
  // Dravidian (Pakistan outlier)
  brh: { name: 'Brahui', native: 'براہوئی', lat: 30.18, lng: 67.00, // Quetta
},
  // Polynesian (Marquesan)
  mrq: { name: 'Marquesan', native: 'ʻEo Enana', lat: -8.85, lng: -140.10, // Nuku Hiva
},
  // Australian Aboriginal (more)
  tiw: { name: 'Tiwi', native: 'Tiwi', lat: -11.77, lng: 130.62, // Bathurst Island
},
  // Tangkic (Tangkic-Pama) — small non-Pama-Nyungan family on the Wellesley Islands of the Gulf of
  // Carpentaria. Lardil is the host language of Damin, the famous secret men's auxiliary register
  // containing the only known click consonants in any Australian language. Effectively dormant
  // today (~1-2 fluent L1 speakers); documented by Ken Hale's 1960s-80s field work and the
  // community Ngakulmungan Kangka Leman dictionary project. Vocabulary partial: only cells with
  // confident Hale / Ngakulmungan Kangka Leman (1996) attestation are filled; the remaining cells
  // are left '—' under dataStatus:'fragmentary' rather than fabricated. Sources: Hale (1973,
  // 1997) on Lardil and Damin; Klokeid (1976) "Topics in Lardil Grammar"; Ngakulmungan Kangka
  // Leman (1996) "Lardil Dictionary"; Glottolog lard1248.
  lbz: { name: 'Lardil', native: 'Leerdil', lat: -16.65, lng: 139.45, // Mornington Island, Queensland

    wordEvidence: {
      water: { evidence: 'direct', source: 'Ngakulmungan Kangka Leman (1996) Lardil Dictionary — kantha (salt water / sea); freshwater is a separate term (wungal)' },
      fire:  { evidence: 'direct', source: 'Richards (2012) "Leerdil Yuujmen bana Yanangarr (Old and New Lardil)" — surface jalul, underlying /jalulu/ (trimoraic apocope); cited in Wikipedia Lardil phonology and MIT/Norvin Richards Leerdil materials. ASJP wordlist (Hale et al. 1996) gives the variant nyud/nyid' },
      sun:   { evidence: 'direct', source: 'Ngakulmungan Kangka Leman (1996) Lardil Dictionary — thurara; also ASJP wordlist (Hale et al. 1996) variant warku' },
      moon:  { evidence: 'direct', source: 'Richards (Old/New Lardil) — kirdikir / kirdikirdi; also Capell (1942) Tangkic comparative table giɖigiɽ' },
      mother:{ evidence: 'direct', source: 'Ngakulmungan Kangka Leman (1996) Lardil Dictionary kinship — ngama "Mo, MoSi, SoWi, BrSoWi"; also Capell (1942) ŋama' },
      eat:   { evidence: 'direct', source: 'Richards (Old/New Lardil) — verb root jitha "eat"; cited in Klokeid (1976) and Hale field notes; ASJP wordlist (Hale et al. 1996) jita' },
      tree:  { evidence: 'direct', source: 'ASJP wordlist for Lardil (Hale et al. 1996, A Preliminary Dictionary of Lardil) — tungal "tree"' },
      dog:   { evidence: 'direct', source: 'ASJP wordlist for Lardil (Hale et al. 1996) — ngawu "dog"' },
      hand:  { evidence: 'direct', source: 'ASJP wordlist for Lardil (Hale et al. 1996) — mar "hand"; surface here given as marra (citation form with absolutive ending)', formType: 'inflected-form' },
      eye:   { evidence: 'direct', source: 'Ngakulmungan Kangka Leman (1996) Lardil Dictionary — mela; also attested in Klokeid (1976) Topics in Lardil Grammar. (Cf. ASJP wordlist which gives kuwu for eye and lists mela as a variant for water — likely reflects dialectal polysemy)' },
      one:   { evidence: 'direct', source: 'ASJP wordlist for Lardil (Hale et al. 1996) — wangi "one"' }
    }},
  // Damin (Demiin) — secret ceremonial men's auxiliary register of Lardil (and historically also
  // Yangkaal). Not a separate language: shares Lardil grammar wholesale but has its own ~200-item
  // lexicon, each entry semantically compressing a whole class of ordinary Lardil meanings (e.g.
  // n!aa = any kin of one's own moiety, didi = anyone of the opposite moiety). Phonologically
  // exotic and deliberately designed to contrast with Lardil's plain phonology: contains click
  // stops (incl. bilabial ʘ — otherwise only Khoisan and isolated ritual registers), an ingressive
  // lateral fricative unique cross-linguistically, ejectives, and a nasalised egressive labio-
  // lingual trill — none of which exist in any other Australian language. Taught only to men who
  // had completed the second-stage Warama initiation; the last initiations stopped by ~1980 and
  // the register is now dormant (no active users; some elderly memory). Placed slightly offset
  // from Lardil's marker so the label doesn't overlap. Words: only ~2-3 of the 20 Swadesh cells
  // have a defensible Damin form because Damin's 200-item lexicon abstracts semantic CLASSES
  // rather than naming Swadesh basic-vocab items 1:1 — most cells are left '—' with explanatory
  // wordEvidence notes. Sources: Hale (1973) "Deep–surface canonical disparities" in Sebeok ed.,
  // Current Trends in Linguistics 11; Hale & Nash (1997) "Damin and Lardil phonotactics" in
  // Tryon & Walsh eds., Boundary Rider (Pacific Linguistics); Evans (1995) A Grammar of Kayardild
  // (historical-comparative Tangkic background).
  lbz_damin: { name: 'Damin', native: 'Damin', lat: -16.62, lng: 139.50, // offset from Lardil so labels don't overlap

    wordEvidence: {
      fire:   { evidence: 'direct', source: 'Hale (1973) "Deep–surface canonical disparities…", Current Trends in Linguistics 11; Hale & Nash (1997) "Damin and Lardil phonotactics" — Damin l!ii covers fire/burning; note: l! denotes a click-stop-onset characteristic of the register', note: 'Damin\'s ~200 items each abstract a class of ordinary Lardil meanings; "l!ii" is one of the few items that maps cleanly onto a single Swadesh concept.' },
      water:  { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      sun:    { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      moon:   { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      mother: { evidence: 'inferred', note: 'Damin doesn\'t lexicalize a single "mother" lexeme — the closest Damin kin term n!aa abstracts over all same-moiety male kin (the inverse term didi covers opposite-moiety kin), so it cross-cuts the Swadesh "mother/father" axis (Hale 1973; Hale & Nash 1997).' },
      father: { evidence: 'inferred', note: 'Damin doesn\'t lexicalize a single "father" lexeme — Damin kin terms (n!aa, didi) abstract over moiety membership rather than the Swadesh "mother/father" axis (Hale 1973; Hale & Nash 1997).' },
      eat:    { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      drink:  { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      love:   { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      heart:  { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      tree:   { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      house:  { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      dog:    { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      cat:    { evidence: 'inferred', note: 'Cats post-date Damin\'s active use and were never integrated into the register; no attested Damin form.' },
      hand:   { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      eye:    { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      hello:  { evidence: 'inferred', note: 'Damin is a ceremonial register confined to post-Warama-initiation seclusion; no Swadesh-style greeting formula is documented (Hale 1973; Hale & Nash 1997).' },
      thanks: { evidence: 'inferred', note: 'Damin is a ceremonial register confined to post-Warama-initiation seclusion; no Swadesh-style thanks formula is documented (Hale 1973; Hale & Nash 1997).' },
      one:    { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' },
      good:   { evidence: 'inferred', note: 'Damin doesn\'t lexicalize this concept directly — its 200-item lexicon abstracts semantic classes rather than naming Swadesh basic-vocab items (Hale 1973; Hale & Nash 1997).' }
    }},
  // Tangkic — closely related to Lardil; spoken on Forsyth Island and adjacent north-eastern
  // Wellesley Islands. Effectively dormant (~1 fluent L1 speaker). Yangkaal and Lardil were the
  // only two languages whose male speakers used the Damin secret auxiliary register. Yangkaal-
  // specific lexical forms are extremely sparsely documented (most published Tangkic material
  // focuses on Lardil and Kayardild); the only attested Yangkaal vocabulary for Swadesh-type
  // concepts comes from Capell (1942)'s short Tangkic comparative table — those forms are
  // filled below, with the remaining cells left '—' under dataStatus:'fragmentary'. Evans
  // (1985, 1995) places Yangkaal in the Southern Tangkic branch (with Kayardild, Yukulta,
  // Ganggalida) — separate from Lardil (Northern Tangkic) — which explains why the Yangkaal
  // forms below differ systematically from the Lardil ones above (e.g. eye miibul vs Lardil
  // mela, water ngogo vs Lardil kantha). Sources: Capell (1942) "Languages of Arnhem Land,
  // North Australia" Oceania 12-13; Evans (1995) "A Grammar of Kayardild, with Historical-
  // Comparative Notes on Tangkic"; Hale field notes; Glottolog yang1294.
  nny: { name: 'Yangkaal', native: 'Yangkaal', lat: -16.60, lng: 139.10, // Forsyth Island, north-eastern Wellesley Islands, Queensland

    wordEvidence: {
      water: { evidence: 'direct', source: 'Capell (1942) "Languages of Arnhem Land, North Australia" Oceania 12-13 — Tangkic comparative vocabulary table, Yangkaal (Neːmarang) ŋogo' },
      fire:  { evidence: 'direct', source: 'Capell (1942) Tangkic comparative vocabulary — Yangkaal ŋida' },
      sun:   { evidence: 'direct', source: 'Capell (1942) Tangkic comparative vocabulary — Yangkaal wargu' },
      moon:  { evidence: 'direct', source: 'Capell (1942) Tangkic comparative vocabulary — Yangkaal waldar' },
      mother:{ evidence: 'direct', source: 'Wikipedia Yangkaal (citing Capell 1942) — ŋama; one of the 4 attested Yangkaal vocabulary items along with bidinaŋga (man), magudaŋga (woman), ganda (father)' },
      father:{ evidence: 'direct', source: 'Wikipedia Yangkaal (citing Capell 1942) — ganda; also confirmed in Capell (1942) Tangkic comparative table' },
      eye:   { evidence: 'direct', source: 'Capell (1942) Tangkic comparative vocabulary — Yangkaal miːbul (distinct from Lardil gɔa, showing the Northern/Southern Tangkic split documented by Evans 1995)' }
    }},
  // Pama-Nyungan (Paman, eastern Cape York). Guugu Yimithirr is famous in cognitive linguistics
  // for its absolute-direction reference system: speakers use the cardinal terms gungga (north),
  // jiba (south), naga (east), guwa (west) instead of egocentric left/right (see Levinson 1992,
  // 1997 on absolute spatial cognition). The language also gave English the word "kangaroo"
  // (gangurru, the eastern-grey species). Spoken at Hopevale (north of Cooktown) with ~700-800
  // speakers. Vocabulary partial: only cells with confident Haviland (1979) attestation are
  // filled; the remaining cells are left '—' under dataStatus:'fragmentary' rather than
  // fabricated. Sources: Haviland (1979) "Guugu Yimidhirr" in Dixon & Blake (eds.) Handbook of
  // Australian Languages vol. 1; Haviland (1979) "Guugu Yimidhirr Sketch Grammar"; Levinson
  // (1997) "Language and Cognition: The Cognitive Consequences of Spatial Description in Guugu
  // Yimithirr"; Glottolog gugu1255.
  kky: { name: 'Guugu Yimithirr', native: 'Guugu Yimidhirr', lat: -15.30, lng: 145.10, // Hopevale, north of Cooktown, Far North Queensland

    wordEvidence: {
      water: { evidence: 'direct', source: 'Haviland (1979) Guugu Yimidhirr — buurraay "(fresh) water"' },
      fire:  { evidence: 'direct', source: 'Pama Language Centre learn-to-read-and-write Guugu Yimithirr — yugu glosses "tree, wood, fire" (single polysemous root); also cited in Haviland (1979) sketch grammar', note: 'Same root used for "tree" — polysemy "tree/wood/fire" common in Pama-Nyungan' },
      sun:   { evidence: 'direct', source: 'Wikipedia Guugu Yimithirr article (citing Haviland 1979 sketch grammar) — ngalan "sun"' },
      moon:  { evidence: 'direct', source: 'Pama Language Centre Guugu Yimithirr materials — giitha (Dhalundhirr coastal dialect, Hopevale); waarigan in Waguurrga inland dialect' },
      mother:{ evidence: 'direct', source: 'Pama Language Centre Guugu Yimithirr Lesson 5 — ngamu "mother" (also classificatory MoSi); confirmed in Haviland (1979) kinship section' },
      father:{ evidence: 'direct', source: 'Pama Language Centre Guugu Yimithirr Lesson 5 — biiba "father"; confirmed in Haviland (1979) sketch grammar' },
      eat:   { evidence: 'direct', source: 'Pama Language Centre Guugu Yimithirr learn-to-read — budal "to eat" (verb stem)' },
      tree:  { evidence: 'direct', source: 'Pama Language Centre Guugu Yimithirr Lesson 6 — yugu "tree, wood" (same root as "fire")', note: 'Same root used for "fire/wood" — polysemy "tree/wood/fire" common in Pama-Nyungan' },
      house: { evidence: 'direct', source: 'Pama Language Centre Guugu Yimithirr Lesson 5 — bayan "house"' },
      dog:   { evidence: 'direct', source: 'Pama Language Centre + ASJP wordlist (Hunter-Gatherer Language Database) — gudaa "dog"' },
      cat:   { evidence: 'direct', source: 'Pama Language Centre Guugu Yimithirr Lesson 3 — buthigan "cat" (English loan via "pussycat")', note: 'Phonologically nativized English loan (pussycat → buthigan); pre-contact Guugu Yimithirr had no domesticated felids' },
      hand:  { evidence: 'direct', source: 'Pama Language Centre Guugu Yimithirr learn-to-read — mungal "hand"' },
      eye:   { evidence: 'direct', source: 'Pama Language Centre Guugu Yimithirr learn-to-read — miil "eye"' },
      one:   { evidence: 'direct', source: 'Haviland (1979) Guugu Yimidhirr numerals — nubuun "one" (also nyubun in some sources); cited in The Language Closet article on Guugu Yimithirr' },
      good:  { evidence: 'direct', source: 'Pama Language Centre Guugu Yimithirr materials — awuun "good"' }
    }},
  // Arawakan (Caribbean coast)
  guc: { name: 'Wayuu', native: 'Wayuunaiki', lat: 11.54, lng: -72.91, // Riohacha
},
  // Maquiritari (Ye'kwana, Yekuana) — Cariban (Northern), ~6K, Venezuela (Bolívar/Amazonas states — Orinoco/Caura headwaters) + Brazil (Roraima — Auaris, Surucucu villages).
  // Sources: Ethnologue 27 'mch'; Glottolog yekw1242; Hall (1988) The Morphosyntax of Discourse in De'kwana Carib.
  mch: { name: "Maquiritari", native: "Ye'kwana", lat: 4.45, lng: -64.42, // Auaris, Brazil (Yekuana center)
},
  // Warao — language isolate, ~28K (largest isolate in northern South America), Venezuela (Orinoco Delta) + small Guyana/Suriname border population.
  // Sources: Ethnologue 27 'wba'; Glottolog wara1303; Romero-Figueroa (1997) A Reference Grammar of Warao; Vaquero (1965) Idioma Warao.
  wba: { name: 'Warao', native: 'Warao', lat: 9.07, lng: -62.05, // Tucupita, Delta Amacuro (Orinoco Delta)
},
  // Wichí — Matacoan (Mataco-Mataguayan family, Wichí branch — sister to Maká, Chorote, Nivaclé), ~50K, Argentina (Salta, Formosa, Chaco) + Bolivia (Tarija) + Paraguay (Boquerón).
  // Sources: Ethnologue 27 'mzh'; Glottolog wich1264; Terraza (2009) Gramática del Wichi.
  mzh: { name: 'Wichí', native: 'Wichí Lhamtés', lat: -22.93, lng: -63.27, // Yacuiba area / Bermejo border, Salta-Tarija
},
  // Southern Jê (Macro-Jê); ~27,000 speakers in Rio Grande do Sul / Santa Catarina /
  // Paraná / São Paulo, Brazil (2022 census) — one of Brazil's most-spoken Indigenous
  // languages. Word data from the UT Austin Hunter-Gatherer Language Database (#91),
  // based on U. Wiesemann's documentation (Dicionário Kaingang-Português, 2011). Only
  // sourced core-vocabulary cells are filled; culturally-specific / modern words left '—'.
  kgp: { name: 'Kaingang', native: 'Kanhgág', lat: -27.00, lng: -51.50 }, // southern Brazil
  // Guaicuruan (Gran Chaco); ~120,000 speakers, mainly Argentine Chaco/Formosa/
  // Salta plus Paraguay & Bolivia — one of the region's most vital Indigenous
  // languages. Word data: UT Austin Hunter-Gatherer Language Database #391
  // (Americanist notation converted to IPA; surface===ipa). Spanish-loan numerals left '—'.
  tob: { name: 'Toba', native: 'Qom', lat: -26.5, lng: -59.5 }, // Gran Chaco, Argentina
  // Guaicuruan (Gran Chaco); ~4,000 speakers on the Pilcomayo/Bermejo rivers,
  // Formosa Province, Argentina. Word data: UT Austin Hunter-Gatherer Language DB
  // #390 (Americanist notation → IPA; surface===ipa). Spanish-loan numerals left '—'.
  plg: { name: 'Pilagá', native: 'Pilagá', lat: -24.9, lng: -60.0 }, // Formosa, Argentina
  // Guaicuruan (Gran Chaco); a few thousand speakers in Chaco & Santa Fe
  // provinces, Argentina. Word data: UT Austin Hunter-Gatherer Language DB #389
  // (Americanist notation → IPA; surface===ipa). Spanish-loan numerals left '—'.
  moc: { name: 'Mocoví', native: 'Moqoit', lat: -28.5, lng: -60.0 }, // Chaco/Santa Fe, Argentina
  // Cariban; ~30,000 speakers in the Roraima savannas (N Brazil) and across the
  // border in Guyana and Venezuela — the most widely spoken northern-Amazonian
  // Cariban language. Word data: UT Austin Hunter-Gatherer Language DB #75
  // (orthographic y = IPA j; inalienable nouns cited without the 1sg prefix).
  mbc: { name: 'Makuxi', native: 'Makuxi', lat: 3.8, lng: -60.2 }, // Roraima, Brazil
  // Macro-Jê (Karajá); ~3,000 speakers along the Araguaia river and Bananal
  // Island, central Brazil. Notable for men's vs women's speech differences.
  // Word data: UT Austin Hunter-Gatherer Language DB #386 (phonetic; surface===ipa).
  kpj: { name: 'Karajá', native: 'Iny rybè', lat: -11.2, lng: -50.7 }, // Bananal I., Brazil
  // Yanomaman; ~20–35K speakers in Roraima/Amazonas (Brazil) and Venezuela —
  // among the most populous isolated-forest peoples of the Amazon. Word data: UT
  // Austin Hunter-Gatherer Language DB #162 (phonemic; surface===ipa; generic
  // 'pei' relational prefix dropped on body parts).
  guu: { name: 'Yanomami', native: 'Yąnomamö', lat: 2.5, lng: -63.5 }, // Roraima/Amazonas, Brazil
  // Arawakan (Içana river, NW Amazon); ~6–12K speakers in Brazil, Colombia and
  // Venezuela. Word data: UT Austin Hunter-Gatherer Language DB #52 (orthographic
  // surface, phonemic IPA; leading possessive '-' dropped on inalienable nouns).
  bwi: { name: 'Baniwa', native: 'Baniwa', lat: 1.5, lng: -68.0 }, // Içana river, NW Amazon
  // Matacoan (Gran Chaco); ~12K speakers in Paraguay & NW Argentina. Word data:
  // UT Austin Hunter-Gatherer Language DB #398 (phonetic; surface===ipa; inalienable
  // nouns cited without the possessive prefix).
  cag: { name: 'Nivaclé', native: 'Nivaclé', lat: -23.4, lng: -60.3 }, // Gran Chaco (Paraguay/Argentina)
  // Matacoan (Gran Chaco); ~2–3K speakers in Salta (Argentina), Paraguay & Bolivia.
  // Word data: UT Austin Hunter-Gatherer Language DB #396 (phonetic; surface===ipa).
  crt: { name: 'Chorote', native: 'Iyojwaʼja', lat: -22.6, lng: -62.6 }, // Gran Chaco, Argentina
  // Isolate of the Upper Xingu, Mato Grosso, Brazil; ~of a few dozen–hundred
  // speakers. Word data: UT Austin Hunter-Gatherer Language DB #382 (phonetic;
  // surface===ipa; (ha)- possessive prefix dropped on body parts).
  tpy: { name: 'Trumai', native: 'Trumai', lat: -11.9, lng: -53.4 }, // Upper Xingu, Brazil
  // Nadahup (upper Rio Negro), NW Amazon; ~1,500 speakers in Amazonas, Brazil
  // (+ Colombia). Word data: UT Austin Hunter-Gatherer Language DB #120 (phonemic;
  // surface===ipa; tone marked; nasal-spread prefix notation dropped).
  jup: { name: 'Hup', native: 'Hup', lat: 0.3, lng: -68.5 }, // upper Rio Negro, Brazil
  // Nadahup (middle Rio Negro), NW Amazon; ~140 speakers near São Gabriel da
  // Cachoeira, Amazonas, Brazil — endangered. Word data: UT Austin Hunter-Gatherer
  // Language DB #119 (phonemic; surface===ipa; tone marked).
  kwa: { name: 'Dâw', native: 'Dâw', lat: -0.1, lng: -67.0 }, // middle Rio Negro, Brazil
  // Mura (linguistic isolate, Amazonia)
  myp: { name: 'Pirahã', native: 'Xapagí', lat: -7.70, lng: -62.30, // Maici River

    wordEvidence: {
      heart: { evidence: 'inferred', note: 'Pirahã "aoʔaago" reflects emotional/inner-state concept; same form appears for "good" — pending source confirmation (Audit Task 120)' },
      good:  { evidence: 'inferred', note: 'Pirahã "aoʔaago" — same form as "heart"; semantic overlap pending source confirmation (Audit Task 120)' }
    }},
  // Tukanoan (Eastern Tukanoan — NW Amazon Vaupés / Papurí river basin)
  // Tuyuca is the canonical textbook example of OBLIGATORY EVIDENTIALITY: every finite verb form must specify
  // the speaker's source of information through one of five evidential markers — visual (you saw it),
  // non-visual (heard / felt / smelled), inferred (from observed evidence), assumed (general knowledge),
  // and reportative (someone told you). Equivalents of plain English "John played soccer" cannot be expressed
  // without simultaneously encoding HOW the speaker knows. (Barnes 1984; Aikhenvald 2004.)
  // ~800-1000 speakers in NW Amazon (Colombia / Brazil border, Vaupés / Papurí river area). The Tuyuca
  // are part of the multilingual Vaupés exogamy network — wives must come from a different language group.
  // Vocabulary coverage is intentionally minimal: full Swadesh-list attestation is not confidently sourced
  // here, so every cell is left '—' under dataStatus:'fragmentary' rather than fabricated. The typological
  // claim to fame (evidentiality) is a verbal-morphology property, not a basic-vocab one.
  // Sources: Barnes, Janet (1984) "Evidentials in the Tuyuca verb" IJAL 50:255-271; Aikhenvald, Alexandra Y.
  // (2004) Evidentiality (Oxford); Stenzel, Kristine (2007) "The semantics of serial verb constructions in
  // two Eastern Tukanoan languages" (Boletim do Museu Paraense Emílio Goeldi); Glottolog tuyu1244;
  // Ethnologue 27 'tue'.
  tue: { name: 'Tuyuca', native: 'Dohkapuara', lat: 0.50, lng: -69.00, // Vaupés / Papurí river area, Colombia/Brazil
    // Basic-vocab cells filled from the ASJP Database wordlist for Tuyuca (Brown
    // compiler, sourcing Barnes & Malone via SIL Colombia materials). ASJPcode is
    // converted to IPA-style transcription here: `3` = ɨ, asterisks mark nasalisation
    // of the preceding vowel. The Wikipedia Tuyuca article (citing Barnes 1996
    // "Autosegments with three-way lexical contrasts in Tuyuca" IJAL 62) supplies
    // pakó /pakó/ "mother" with high pitch on the final syllable. Verb stems are
    // cited in their bare-stem form (Tuyuca finite verbs additionally inflect for
    // person and obligatory evidentiality, so the Swadesh-list cell is the root).

    wordEvidence: {
      water:  { evidence: 'direct', source: 'ASJP Database wordlist Tuyuca (Brown comp.) — `oko` "water"; cf. Proto-Tukanoan *okko per Chacon (2014, IJAL 80:275-322)', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'ASJP Database wordlist Tuyuca — `pekabe*` decoded as /pekãbẽ/ "fire"; root peka- + classifier -bẽ "round/cluster", cf. Proto-Tukanoan *peka (Chacon 2014)', formType: 'compound', note: 'ASJP forms the citation as the full surface form; the bare lexical root is peka-' },
      mother: { evidence: 'direct', source: 'Wikipedia Tuyuca language (citing Barnes 1996 "Autosegments with three-way lexical contrasts in Tuyuca" IJAL 62:31-58) — pakó /pakó/ "mom"; example of word-final high pitch', formType: 'free-word' },
      drink:  { evidence: 'direct', source: 'ASJP Database wordlist Tuyuca — `si*di*` decoded as /sĩdĩ/ "drink"; verb stem', formType: 'root' },
      tree:   { evidence: 'direct', source: 'ASJP Database wordlist Tuyuca — `yuk3g3` decoded as /yukɨgɨ/ "tree"; cf. Proto-Tukanoan *tjũkkɨ (Chacon 2014)', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'ASJP Database wordlist Tuyuca — `diayi` /diaji/ "dog"; widely cited Tukanoan canine root', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'ASJP Database wordlist Tuyuca — `kapea` "eye"', formType: 'free-word' },
      one:    { evidence: 'direct', source: 'ASJP Database wordlist Tuyuca — `sika` "one"', formType: 'free-word', note: 'distinct from the commonly cited Tukanoan /nĩkã/ form found in some related languages; ASJP records sika for Tuyuca specifically' }
    }},
  // Chocoan (NW South America)
  emp: { name: 'Northern Embera', native: 'Eperã pedea', lat: 5.69, lng: -76.66, // Quibdó
},
  // Niger-Congo (Mande, Liberia/Guinea)
  kpe: { name: 'Kpelle', native: 'Kpɛlɛɛ', lat: 7.07, lng: -9.50, // Liberian-Guinean border
},
  // Bassa — Niger-Congo (Kru, Eastern), ~600K, Liberia (coastal Bassa County, Grand Cape Mount). Has indigenous Vah script (1900s, distinctly Kru).
  // Sources: Ethnologue 27 'bsq'; Glottolog bass1262; Hobley (1965) Bassa-English Dictionary; Vah script documented 1907.
  bsq: { name: 'Bassa', native: 'Bassa wuɖu', lat: 6.40, lng: -10.10, // Buchanan, Bassa County, Liberia
},
  // Bantu (Zambia, Lozi)
  loz: { name: 'Lozi', native: 'siLozi', lat: -15.25, lng: 23.14, // Mongu
},
  // === Phase 3O: Indonesian/Philippine + Pahari + Micronesian ===
  // Austronesian (Indonesia, additional)
  bbc: { name: 'Toba Batak', native: 'Batak Toba', lat: -2.62, lng: 98.83, // Balige, Lake Toba
},
  // Simalungun Batak — Austronesian Malayo-Polynesian Batak (sister to Toba Batak bbc and Karo Batak btx within the Batak cluster; the language of Simalungun Regency on the eastern shore of Lake Toba), ~1.2M, Indonesia (North Sumatra province — Simalungun Regency around Pematangsiantar; small populations in surrounding regencies).
  // Sources: Ethnologue 27 'bts'; Glottolog sima1278; Saragih (1989) Bahasa Simalungun.
  bts: { name: 'Simalungun Batak', native: 'Hata Simalungun', lat: 2.96, lng: 99.07, // Pematangsiantar, North Sumatra (Simalungun Regency seat)
},
  // Batak Angkola — Austronesian Sumatran (Batak cluster, sister to bbc Toba and btx Karo), ~750K, Indonesia (North Sumatra — Tapanuli Selatan / Padang Sidempuan).
  // Sources: Ethnologue 27 'akb'; Glottolog batt1247; Eades & Hajek (2006) Batak Angkola Phonology; van der Tuuk (1864).
  akb: { name: 'Batak Angkola', native: 'Hata Angkola', lat: 1.38, lng: 99.27, // Padang Sidempuan, North Sumatra
},
  bjn: { name: 'Banjar', native: 'Bahasa Banjar', lat: -3.32, lng: 114.59, // Banjarmasin
},
  // Ambon Malay (Bahasa Melayu Ambon) — Austronesian Malayo-Polynesian Malay-based contact variety (Malay-Polynesian Maluku-mediated; descended from Malay traders' lingua franca that became the predominant language of the eastern Maluku archipelago after Dutch colonialism replaced indigenous Maluku Austronesian languages), ~250K L1 + ~1.4M L2, Indonesia (Maluku province — Ambon, Lease, Buru, Seram islands; Ambon City is the cultural capital).
  // Sources: Ethnologue 27 'abs'; Glottolog ambo1250; van Minde (1997) Malayu Ambong: Phonology, Morphology, Syntax.
  abs: { name: 'Ambon Malay', native: 'Bahasa Melayu Ambon', lat: -3.69, lng: 128.18, // Ambon City, Maluku, Indonesia
},
  // North Moluccan Malay (Bahasa Pasar Ternate) — Austronesian Malayo-Polynesian Malay-based contact variety (sister to Ambon Malay abs and Manado Malay; descended from Malay-traders\' lingua franca, became the predominant language of the northern Maluku archipelago after Dutch colonial rule replaced indigenous Halmaheran Papuan and West Papuan languages), ~700K L1 + 1M L2, Indonesia (North Maluku province — Ternate, Tidore, Halmahera islands; the Sultanate of Ternate was a major historical Maluku spice-trade power).
  // Sources: Ethnologue 27 'max'; Glottolog nort2828; Voorhoeve (1983) North Maluku Malay.
  max: { name: 'North Moluccan Malay', native: 'Bahasa Pasar Ternate', lat: 0.78, lng: 127.37, // Ternate City, North Maluku, Indonesia
},
  // Musi (Palembang Malay) — Austronesian Malayo-Polynesian Malayic (sister to Standard Malay/Indonesian and other Malay varieties; the regional Malay variety of South Sumatra centered on Palembang, the historical capital of the Srivijaya Empire), ~3.1M, Indonesia (South Sumatra province — Palembang city and surrounding regencies; small Lampung border populations).
  // Sources: Ethnologue 27 'mui'; Glottolog musi1242; Adelaar (2005) Malay-Indonesian-related languages.
  mui: { name: 'Musi', native: 'Baso Pelembang', lat: -2.99, lng: 104.76, // Palembang, South Sumatra (historical Srivijaya capital)
},
  sas: { name: 'Sasak', native: 'Bahasa Sasak', lat: -8.58, lng: 116.10, // Mataram
},
  // Austroasiatic (Mon-Khmer, India NE)
  kha: { name: 'Khasi', native: 'Khasi', lat: 25.58, lng: 91.89, // Shillong
},
  // Uralic (Ob-Ugric, sister to Khanty)
  mns: { name: 'Mansi', native: 'маньси', lat: 61.00, lng: 69.00, // Khanty-Mansiysk
},
  // Austronesian (Philippines)
  mrw: { name: 'Maranao', native: 'Mëranaw', lat: 8.00, lng: 124.30, // Marawi
},
  tsg: { name: 'Tausug', native: 'Bahasa Sūg', lat: 6.05, lng: 121.00, // Jolo
},
  // Micronesian (additional)
  yap: { name: 'Yapese', native: 'Yapese', lat: 9.51, lng: 138.13, // Colonia, Yap
},
  chk: { name: 'Chuukese', native: 'Chuukese', lat: 7.45, lng: 151.85, // Weno
},
  // Indo-Aryan (Pahari/Central)
  gbm: { name: 'Garhwali', native: 'गढ़वाली', lat: 30.32, lng: 78.03, // Dehradun
},
  kfy: { name: 'Kumaoni', native: 'कुमाऊँनी', lat: 29.60, lng: 79.66, // Almora
},
  xnr: { name: 'Kangri', native: 'कांगड़ी', lat: 32.22, lng: 76.32, // Dharamshala
},
  // === Phase 3P: BCS split + Borneo + Berber + Angola + Mongolic + W/C African ===
  // Slavic (BCS standardization split)
  hr: { name: 'Croatian', native: 'hrvatski', lat: 45.81, lng: 15.98, // Zagreb
},
  bs: { name: 'Bosnian', native: 'bosanski', lat: 43.86, lng: 18.41, // Sarajevo
},
  // Austronesian (Borneo + Sumatra)
  iba: { name: 'Iban', native: 'jaku Iban', lat: 1.55, lng: 110.34, // Kuching
},
  ljp: { name: 'Lampung', native: 'Bahasa Lampung', lat: -5.43, lng: 105.27, // Bandar Lampung
},
  // Berber (Morocco standard)
  tzm: { name: 'Central Atlas Tamazight', native: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', lat: 32.93, lng: -5.66, // Khenifra
},
  tmh: { name: 'Tamasheq (Tuareg)', native: 'Tamaceq', lat: 22.78, lng: 5.52, // Tamanrasset (Tahaggart)
},
  // Bantu (Namibia/Angola)
  ng: { name: 'Ndonga', native: 'Oshindonga', lat: -17.78, lng: 15.69, // Oshakati
},
  // Kuanyama / Oshikwanyama — Bantu R21, sister to Ndonga (ng) within the Oshiwambo macrolanguage cluster.
  // Sources: Ethnologue 27 'kua'; Glottolog kuan1252.
  kj: { name: 'Kuanyama', native: 'Oshikwanyama', lat: -17.78, lng: 15.78, // Oshikango (border with Angola)
},
  umb: { name: 'Umbundu', native: 'Umbundu', lat: -12.78, lng: 15.74, // Huambo
},
  kmb: { name: 'Kimbundu', native: 'Kimbundu', lat: -8.84, lng: 13.23, // Luanda
},
  // Luvale — Bantu K14, ~600K, Angola/Zambia. National language of both countries (Zambia recognises 7 regional Bantu).
  // Sources: Ethnologue 27 'lue'; Glottolog luva1239; Horton (1949) A Grammar of Luvale.
  lue: { name: 'Luvale', native: 'Chiluvale', lat: -11.78, lng: 22.70, // Lukulu, Zambia
},
  her: { name: 'Herero', native: 'Otjiherero', lat: -20.46, lng: 16.65, // Otjiwarongo
},
  // Mongolic (Russia, Caspian)
  xal: { name: 'Kalmyk', native: 'Хальмг келн', lat: 46.31, lng: 44.27, // Elista
},
  // Adamawa-Ubangian (CAR lingua franca)
  sg: { name: 'Sango', native: 'Sängö', lat: 4.39, lng: 18.55, // Bangui
},
  // Bantu (Zambia)
  toi: { name: 'Tonga (Zambia)', native: 'Chitonga', lat: -16.81, lng: 26.99, // Choma
},
  // === Phase 4: Historical / Ancient Languages ===
  // Indo-European (Old Iranian)
  peo: { name: 'Old Persian', native: '𐎠𐎼𐎹', lat: 29.94, lng: 52.89 },
  ave: { name: 'Avestan', native: '𐬀𐬬𐬈𐬯𐬙𐬁', lat: 32.5, lng: 60 },
  xto: { name: 'Tocharian A', native: '𑀆𑀭𑁆𑀰𑀺 𑀓𑀾𑀦𑁆𑀢𑁆𑀯𑁄', lat: 41.6, lng: 84.9 },
  txb: { name: 'Tocharian B', native: '𑀓𑀼𑀰𑀺𑀜𑁆𑀜𑁂 𑀓𑀾𑀦𑁆𑀢𑁂', lat: 41.7, lng: 82.95 },
  phn: { name: 'Phoenician', native: '𐤃𐤁𐤓𐤉𐤌 𐤊𐤍𐤏𐤍𐤉𐤌', lat: 33.27, lng: 35.20, // Tyre
},
  uga: { name: 'Ugaritic', native: '𐎜𐎂𐎗𐎚', lat: 35.60, lng: 35.78, // Ras Shamra
},
  // Indo-European (Anatolian, Hittite-cousin)
  xlu: { name: 'Luwian', native: 'Luwili', lat: 38.4, lng: 33.5 },
  pal: { name: 'Middle Persian', native: '𐭯𐭠𐭫𐭮𐭩𐭪', lat: 32.65, lng: 51.67 },
  // Classical Persian (پارسی, fārsi-ye kelāsik) — the literary New Persian of
  // the Samanid (819-999), Ghaznavid, Seljuk, and Timurid courts; the
  // language of Ferdowsi's Shahnameh (~1010), Rumi's Masnavi (~1273), Saadi's
  // Gulistan (~1258), and Hafez's Divan (~1370). Distinguished from Modern
  // Persian (fa) by: preserved /xʷ/ (later merged with /x/), preserved
  // /ē oː/ ~ /iː uː/ contrast (lost in Tehrani, retained in Dari/Tajiki),
  // preserved /ɣ/ vs /q/ distinction, short /i u/ in syllables that later
  // lowered to /e o/ (pidar→pedar, dil→del, gurba→gorbe). Taught canonically
  // throughout Iran, Tajikistan, and Afghanistan; the foundation of Persianate
  // poetic education from medieval to modern times. Location: Tus, Khorasan
  // (Ferdowsi's home and Shahnameh composition site).
  fa_clas: { name: 'Classical Persian', native: 'پارسی', lat: 36.49, lng: 59.55,
},
  syc: { name: 'Classical Syriac', native: 'ܠܫܢܐ ܣܘܪܝܝܐ', lat: 37.16, lng: 38.78, // Edessa
},
  // Old Romance / Old Germanic
  fro: { name: 'Old French', native: 'romans', lat: 48.86, lng: 2.35, // Île-de-France
    wordEvidence: {
      n99: { evidence: 'direct',
             source: "Le Couronnement de Louis, verse 12: 'Quant Deus eslist nonante et nuef reiames, / Tot le meillor torna en dolce France.' Ernest Langlois's 1888 edition (archive.org lecouronnementd01langgoog, line 7755); a second manuscript printed in the same volume gives the variant with the numeral in Roman figures, 'nonante et .ix. reaumes'",
             note: "attested whole, in verse, which is why the conjunction is there: nonante ET nuef. And nuef rather than neuf - Wiktionary has nuef as the Old French numeral, /ˈnu̯ɛf/, with no Old French section for neuf at all, and its own descendants line runs nuef > Middle French neuf > Modern French neuf" }
    },
},
  // Classical French / French of the Grand Siècle (17c., "Le Bel Usage")
  // — the French of Racine, Corneille, Molière, La Fontaine, Pascal,
  // Bossuet, La Bruyère, Madame de Sévigné. Codified by the Académie
  // française (founded 1635) and Vaugelas's Remarques sur la langue
  // françoise (1647), the authoritative grammar of the period. Distinct
  // from Old French (fro, 9-14c.) and from Modern French (fr) by:
  // preserved /we/ for <oi> (le roi as /lœrwe/, became /lœrwa/ ca. 1700),
  // active liaison of word-final consonants, distinct vowel length
  // distinctions (chat /ʃaː/ vs cha-cha /ʃa/), formal "vous" vs intimate
  // "tu" sharply enforced, pre-pejoration of many lexical items
  // (honnête "decent" still had full positive valence). Anchored at
  // Versailles — Louis XIV's court, where "le bel usage" was the
  // linguistic norm of cultured French.
  fr_class: { name: 'Classical French (17c., Bel Usage)', native: 'Français classique', lat: 48.80, lng: 2.13, // Versailles
},
  // Old Italian (Italiano antico) / Dantesque Tuscan — the literary Florentine
  // of Dante's Divine Comedy (~1308–1320), Petrarch's Canzoniere (~1350),
  // and Boccaccio's Decameron (~1353). Foundational to the Italian literary
  // canon and the basis on which Pietro Bembo's Prose della volgar lingua
  // (1525) standardized modern Italian. Pedagogical distinctives vs Modern
  // Italian: foco (vs fuoco), bevere (vs bere), core (vs cuore), mercede
  // (vs grazie), passato remoto-heavy syntax, archaic articles (lo, li). Coordinate: Florence (Firenze), Dante's birthplace and Tuscan literary center.
  it_dan: { name: 'Old Italian (Dantesque)', native: 'volgare illustre', lat: 43.77, lng: 11.25,
},
  goh: { name: 'Old High German', native: 'diutisk', lat: 49.99, lng: 8.27, // Mainz
},
  // South Semitic (Classical Ethiopic)
  gez: { name: 'Ge\'ez', native: 'ግዕዝ', lat: 14.13, lng: 38.72, // Aksum
},
  // === Phase 4B: more Historical / Ancient Languages ===
  // Pre-Greek
  gmy: { name: 'Mycenaean Greek', native: '𐀀𐀐𐀊', lat: 37.73, lng: 22.76 },
  // Liturgical Classical Tibetan (Dharma-recitation tradition) — the form
  // of Classical Tibetan recited in Tibetan Buddhist monasteries (Geluk,
  // Nyingma, Kagyu, Sakya) and taught in modern Tibetan Buddhist
  // institutions in Dharamsala and Western dharma centers. Distinct from
  // scholarly Classical Tibetan (xct, historical-attested literary form)
  // by: (1) honorific/Buddhist liturgical vocabulary (yab vs pha "father",
  // byams-pa vs dga'-ba "love/loving-kindness", khang-pa vs khyim "house")
  // preferred for canonical sutra recitation; (2) Dharamsala-standardized
  // Lhasa pronunciation taught to international students. The Tibetan
  // Buddhist counterpart of Quranic Arabic recitation and Pali monastic
  // chanting traditions. Anchored at Dharamsala (Indian-exile Tibetan
  // pedagogical center; modern Geluk authoritative tradition).
  xct_litpr: { name: 'Liturgical Classical Tibetan', native: 'ཆོས་སྐད (གྲྭ་པའི)', lat: 32.22, lng: 76.32,
},
  xct: { name: 'Classical Tibetan', native: 'ཆོས་སྐད', lat: 29.65, lng: 91.10, // Lhasa area

    // Audit Task 173: per-cell wordEvidence for source-checked Classical
    // Tibetan (Chos-skad / Literary Tibetan) row. Sources: Jäschke (1881)
    // "A Tibetan-English Dictionary" (the canonical Classical Tibetan
    // lexicon); Hahn (2003) "Lehrbuch der klassischen tibetischen
    // Schriftsprache" for grammar and citation; Hill (2010) "A Lexicon of
    // Tibetan Verb Stems as Reported by the Grammatical Tradition". IPA
    // values reflect pre-Lhasa "spelling pronunciations" preserving
    // written-Tibetan consonant clusters that were lost in modern speech.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Jäschke (1881) — ཆུ chu "water"; aspirated /tɕʰ/' },
      fire:   { evidence: 'direct', source: 'Jäschke (1881) — མེ me "fire"' },
      sun:    { evidence: 'direct', source: 'Jäschke (1881) — ཉི་མ nyi-ma "sun, day"' },
      moon:   { evidence: 'direct', source: 'Jäschke (1881) — ཟླ་བ zla-ba "moon, month"; classical zl- cluster preserved with reading dawa', note: 'classical orthography retains the zl- prefix-cluster that simplifies in modern Lhasa speech' },
      mother: { evidence: 'direct', source: 'Jäschke (1881) — ཨ་མ a-ma "mother"; bare informal kinship; honorific ཨ་མ་ལགས a-ma-lags' },
      father: { evidence: 'direct', source: 'Jäschke (1881) — ཕ pha "father"; bare classical form (later prefixed with ཨ a- in modern speech)', note: 'classical bare ཕ ph- → modern speech regularly prefixes ཨ a- like other kinship terms' },
      eat:    { evidence: 'direct', source: 'Jäschke (1881) — བཟའ bzaʼ "to eat"; with prefix b- (perfect/future); present-stem ཟ za', formType: 'inflected-form', note: 'classical Tibetan verbs have multiple stem forms; bzaʼ is the perfect-tense citation per Hill 2010' },
      drink:  { evidence: 'direct', source: 'Jäschke (1881) — འཐུང ʼthung "to drink"; ʼa-prefix + thung; aspirated /tʰ/' },
      love:   { evidence: 'direct', source: 'Jäschke (1881) — དགའ་བ dgaʼ-ba "loving, fond"; verb dgaʼ "to like, rejoice" + nominalizer -ba', formType: 'compound', note: 'classical written-form preserves dg- prefix-cluster; modern Lhasa says simply ka' },
      heart:  { evidence: 'direct', source: 'Jäschke (1881) — སྙིང snying "heart"; palatal nasal /ɲ/' },
      tree:   { evidence: 'direct', source: 'Jäschke (1881) — ཤིང shing "tree, wood, timber"; in modern Tibetan often compounded as shing-sdong', note: 'classical bare ཤིང; broader sense than modern ཤིང་སྡོང compound' },
      house:  { evidence: 'direct', source: 'Jäschke (1881) — ཁྱིམ khyim "house, home"; aspirated palatalized /tɕʰ/ → spelling pronounced /tɕim/ in dictionary tradition', note: 'classical ཁྱིམ vs modern Lhasa colloquial ཁང་པ khang-pa — different lexemes' },
      dog:    { evidence: 'direct', source: 'Jäschke (1881) — ཁྱི khyi "dog"; aspirated palatalized; cf. modern Lhasa /kʰi/' },
      cat:    { evidence: 'direct', source: 'Jäschke (1881) — བྱི་ལ byi-la "cat"; classical loan from Sanskrit biḍāla', note: 'modern Lhasa ཞི་མི zhi-mi competes with this older Sanskrit-derived form' },
      hand:   { evidence: 'direct', source: 'Jäschke (1881) — ལག་པ lag-pa "hand, arm"; nominal-suffix -pa', formType: 'compound' },
      eye:    { evidence: 'direct', source: 'Jäschke (1881) — མིག mig "eye"' },
      hello:  { evidence: 'direct', source: 'Jäschke (1881) — བཀྲ་ཤིས་བདེ་ལེགས bkra-shis bde-legs "auspicious well-being"', formType: 'greeting-formula', note: 'pan-Tibetan formula; Buddhist context; the greeting formula does not appear before the spread of Buddhist culture in 7th c. CE' },
      thanks: { evidence: 'direct', source: 'Jäschke (1881) — ཐུགས་རྗེ་ཆེ thugs-rje che "thanks"; lit. "great compassion"', formType: 'thanks-formula', note: 'honorific compound thugs-rje "compassion (hon. for sems-rje)" + che "great"' },
      one:    { evidence: 'direct', source: 'Jäschke (1881) — གཅིག gcig "one"; written cluster gc- pronounced /tɕ/ via Tibetan reading conventions' },
      good:   { evidence: 'direct', source: 'Jäschke (1881) — ཡག་པོ yag-po "good"; nominal-suffix -po; literary alternative བཟང bzang' },
    } },
  // Late Phoenician (Carthage)
  xpu: { name: 'Punic', native: '𐤐𐤍𐤊', lat: 36.87, lng: 10.32, // Carthage
},
  // Ancient Near East (isolates / poorly classified)
  xhu: { name: 'Hurrian', native: '𒄩𒌨𒊑𒇷', lat: 36.86, lng: 40.04 },
  elx: {
    "name": "Elamite",
    "native": "𒁹𒋾𒈠𒋾",
    "lat": 32.19,
    "lng": 48.26,
    "words": {
      "water": [
        "𒄭",
        "hi"
      ],
      "fire": [
        "𒉺𒅈",
        "par"
      ],
      "sun": [
        "𒀭𒈾𒄴𒄭𒌅",
        "nahhunte"
      ],
      "moon": [
        "𒀭𒈾𒁉𒅕",
        "napir"
      ],
      "mother": [
        "𒀀𒈠",
        "amma"
      ],
      "father": [
        "𒀜𒋫",
        "atta"
      ],
      "eat": [
        "𒄩𒊭",
        "haʃ"
      ],
      "drink": [
        "𒉡",
        "nu"
      ],
      "love": [
        "𒇷𒅗",
        "lik"
      ],
      "heart": [
        "𒌋𒄭",
        "ulhi"
      ],
      "tree": [
        "𒄷𒌅𒆪",
        "hutk"
      ],
      "house": [
        "𒄩𒀠",
        "hal"
      ],
      "dog": [
        "𒆪𒌅",
        "kut"
      ],
      "cat": [
        "𒋾𒅗𒊏",
        "tiɡra"
      ],
      "hand": [
        "𒆪𒋗",
        "kuʃu"
      ],
      "eye": [
        "𒌅𒆠",
        "tukːi"
      ],
      "hello": [
        "𒅆𒅋𒄩",
        "ʃilha"
      ],
      "thanks": [
        "𒇷𒄩𒊑",
        "lihari"
      ],
      "one": [
        "𒆠𒅕",
        "kir"
      ],
      "good": [
        "𒊒𒄷",
        "ruːhuː"
      ]
    },
    // elx Elamite wordEvidence: per Codex 2 / Session 18 #1, partly-understood lang.
    // Royal/religious/concrete cells better attested than abstracts.
    "wordEvidence": {
      "water":  { "evidence": "direct", "source": "Royal Achaemenid trilingual texts" },
      "fire":   { "evidence": "direct", "source": "Royal/religious texts" },
      "sun":    { "evidence": "direct", "source": "Nahhunte (sun god) — divine name" },
      "moon":   { "evidence": "direct", "source": "Napir (moon god) — divine name" },
      "mother": { "evidence": "direct", "source": "Basic kinship (Old Elamite)" },
      "father": { "evidence": "direct", "source": "Basic kinship" },
      "eat":    { "evidence": "inferred", "source": "Verbal stem from context" },
      "drink":  { "evidence": "disputed", "source": "Brief verbal stem; semantic uncertain" },
      "love":   { "evidence": "inferred", "source": "Royal inscriptional context" },
      "heart":  { "evidence": "inferred", "source": "Body/abstract" },
      "tree":   { "evidence": "direct", "source": "Royal inscriptions" },
      "house":  { "evidence": "direct", "source": "Royal inscriptions" },
      "dog":    { "evidence": "inferred", "source": "Lexical lists" },
      "cat":    { "evidence": "disputed", "source": "Lexical/semantic uncertain" },
      "hand":   { "evidence": "direct", "source": "Body part (basic)" },
      "eye":    { "evidence": "direct", "source": "Body part" },
      "hello":  { "evidence": "inferred", "source": "Royal greeting formula context" },
      "thanks": { "evidence": "inferred", "source": "Royal context" },
      "one":    { "evidence": "direct", "source": "Numerals (well-attested)" },
      "good":   { "evidence": "inferred", "source": "Royal inscriptions" }
    }
  },
  xsa: { name: 'Sabaean', native: '𐩪𐩨𐩱', lat: 15.45, lng: 45.35, // Marib
},
  // Old Javanese
  kaw: { name: 'Old Javanese (Kawi)', native: 'ꦨꦴꦰꦏꦮꦶ', lat: -7.79, lng: 110.36 },
  kho: { name: 'Khotanese', native: '𑀳𑁆𑀯𑀢𑀦𑀽', lat: 37.11, lng: 79.93 },
  // Early New High German / Luther-era German (Frühneuhochdeutsch, ENHG,
  // ~1350-1650) — the German of Luther's Bible (1522 NT, 1534 complete,
  // 1545 final), of the Protestant Reformation, of the Sachsenspiegel
  // and ENHG literary corpus. Foundational to Modern Standard German:
  // Luther's East Central German (ostmitteldeutsch) prose became the
  // basis on which Hochdeutsch was standardized. Distinct from gmh
  // (Middle High German, 1050-1350) by the New High German Diphthongization
  // (MHG mîn → ENHG mein, MHG hûs → ENHG haus, MHG iuwer → ENHG euer)
  // and from Modern German by archaic spellings (Hauß, Danck, Hertz,
  // Bawm) and pre-standard regional variation. Anchored at Wittenberg —
  // Luther's home, posting of the 95 Theses (1517), center of the
  // Reformation and ENHG literary prestige.
  de_lut: { name: 'Early New High German (Luther-era)', native: 'Frühneuhochdeutsch (Luthers Sprache)', lat: 51.87, lng: 12.65, // Wittenberg
},
  gmh: { name: 'Middle High German', native: 'diutsch', lat: 50.00, lng: 8.27, // Mainz / Rhine
},
  // Old Spanish (Castilian)
  // Golden Age Spanish / Spanish of the Siglo de Oro (~1500-1681) — the
  // Castilian of Cervantes (Don Quijote, 1605-1615), Lope de Vega, Calderón
  // de la Barca, Quevedo, Góngora, Santa Teresa, San Juan de la Cruz.
  // Distinct from Old Spanish (osp, 12-15c.) and from Modern Spanish (es_eu)
  // by: pre-merger 4-way sibilant system (s vs ç /t͡s/ vs z /d͡z/ vs ss /s/);
  // distinct b vs v phonemes pre-merger; preserved /ʃ/ in <x>/<j> pre-shift
  // to /x/ (Cervantes pronounced his name /miˈɣel de θeɾˈβantes saaˈβeðɾa/
  // with /ʃ/ for j/x); active formal usted etymon "vuestra merced" still
  // in transition. Anchored at Madrid, Habsburg court center of the
  // Siglo de Oro literary world.
  es_sgl: { name: 'Golden Age Spanish (Siglo de Oro)', native: 'Castellano del Siglo de Oro', lat: 40.42, lng: -3.70, // Madrid (Habsburg court)
},
  osp: { name: 'Old Spanish', native: 'castellano', lat: 42.34, lng: -3.70, // Burgos
},
  // Old Khmer (Angkor era)
  okz: { name: 'Old Khmer', native: 'ខ្មែរបុរាណ', lat: 13.41, lng: 103.87, // Angkor
},
  // Old Saxon (Heliand era)
  osx: { name: 'Old Saxon', native: 'sahsisk', lat: 51.96, lng: 7.62, // Westphalia (Münster)
},
  // Niger-Congo Gur (Burkina Faso)
  mos: { name: 'Mooré', native: 'Mòoré', lat: 12.37, lng: -1.52, // Ouagadougou
},
  // Mampruli — Niger-Congo Atlantic-Congo Gur (sister to Mooré mos and Dagbani within the Oti-Volta Mole-Gurma branch; the language of the Mamprusi people of northern Ghana, descendants of the medieval Mamprussi Kingdom that gave rise to the Dagomba and Nanumba kingdoms), ~330K, Ghana (Northern Region — Walewale, Gambaga, Nalerigu) + Burkina Faso (small populations along southern border).
  // Sources: Ethnologue 27 'maw'; Glottolog mamp1244; Naden (1988) Mampruli phonology and grammar.
  maw: { name: 'Mampruli', native: 'Mampruli', lat: 10.60, lng: -0.85, // Walewale, Northern Region, Ghana
},
  // Nilo-Saharan (Kenya)
  kln: { name: 'Kalenjin', native: 'Kalenjin', lat: 0.51, lng: 35.27, // Eldoret
},
  // French-based creole (Indian Ocean)
  mfe: { name: 'Mauritian Creole', native: 'Kreol Morisien', lat: -20.16, lng: 57.49, // Port Louis
},
  // Indian Ocean French-based creole triad (Audit Task 149 Batch 2):
  // Réunion + Seychellois pair with Mauritian above.
  rcf: { name: 'Réunion Creole', native: 'Kreol Réyoné', lat: -20.88, lng: 55.45, // Saint-Denis
},
  crs: { name: 'Seychellois Creole', native: 'Kreol Seselwa', lat: -4.62, lng: 55.45, // Victoria, Mahé
},
  // Caribbean French-based creole anchor
  gcf: { name: 'Guadeloupean Creole', native: 'Kréyòl Gwadloupéyen', lat: 16.24, lng: -61.53, // Pointe-à-Pitre
},
  // Niger-Congo Mande (Senegal/Gambia)
  mnk: { name: 'Mandinka', native: 'Mandinka', lat: 13.45, lng: -16.58, // Banjul
},
  // Iranian (Bakhtiari, distinct from Lurish)
  bqi: { name: 'Bakhtiari', native: 'بختیاری', lat: 32.32, lng: 50.85, // Shahrekord

    // Audit Task 200/173: full per-cell wordEvidence for source-checked
    // Bakhtiari row. Sources: Anonby, Erik & Asadi, Ashraf (2014)
    // Bakhtiari Studies: Phonology, Text, Lexicon (Acta Universitatis
    // Upsaliensis, Studia Iranica Upsaliensia 24); Anonby (2003) "Update
    // on Luri" (JRAS 13.2); Lecoq, Pierre (1989) "Le bakhtiari" in
    // Compendium Linguarum Iranicarum (Wiesbaden); MacKinnon, Colin (2002)
    // "Luri Language and Literature" Encyclopaedia Iranica.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Anonby & Asadi (2014) Bakhtiari Studies §lexicon — āw "water"; characteristic Lurish-area form', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'Anonby & Asadi (2014) — teš "fire"; cf. Persian ātaš', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Anonby & Asadi (2014) — xor "sun"; preserves Old Iranian *hwar- (cf. Persian xoršid)', formType: 'free-word', note: 'distinctive Lurish-area retention of bare *xwar- where Persian uses compound xoršid' },
      moon:   { evidence: 'direct', source: 'Anonby & Asadi (2014) — māng "moon"; nasal-extended form shared with Lurish', formType: 'free-word' },
      mother: { evidence: 'direct', source: 'Anonby & Asadi (2014) — dā "mother"; Lurish-area nursery form', formType: 'free-word', note: 'shared across Lurish, Bakhtiari and Kurdish dāyik; Northwest Iranian *dāy-' },
      father: { evidence: 'direct', source: 'Anonby & Asadi (2014) — bowā "father"; characteristic Bakhtiari form', formType: 'free-word' },
      eat:    { evidence: 'direct', source: 'Anonby & Asadi (2014) §verb-paradigms — xwārdan infinitive "to eat"; West Iranian *xwar-', formType: 'free-word', note: 'lexical overlap with drink: West Iranian *xwar- "consume" covers both eating and drinking' },
      drink:  { evidence: 'direct', source: 'Anonby & Asadi (2014) — xwārdan infinitive "to drink"; same root as eat', formType: 'free-word', note: 'lexical overlap with eat: West Iranian *xwar- "consume" covers both eating and drinking' },
      love:   { evidence: 'direct', source: 'Anonby & Asadi (2014) — ešq "love"; Arabic loan, ubiquitous in Iranian languages', formType: 'free-word' },
      heart:  { evidence: 'direct', source: 'Anonby & Asadi (2014) — del "heart"; pan-Iranian *dṛd-', formType: 'free-word' },
      tree:   { evidence: 'direct', source: 'Anonby & Asadi (2014) — tow "tree" (cf. Persian deraxt); preserves OIr *tauu- "wood, beam"', formType: 'free-word', note: 'Bakhtiari uses tow where Persian uses dār/deraxt — distinctive Lurish-area lexeme' },
      house:  { evidence: 'direct', source: 'Anonby & Asadi (2014) — xune "house"; Bakhtiari development of Old Iranian *xāna-', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Anonby & Asadi (2014) — kočok "dog (puppy/small dog)"; characteristic Bakhtiari form', formType: 'free-word', note: 'cognate with Persian kuček "small"; semantic shift from "small one" → "dog"' },
      cat:    { evidence: 'direct', source: 'Anonby & Asadi (2014) — peši "cat"; nursery/onomatopoeic form', formType: 'free-word' },
      hand:   { evidence: 'direct', source: 'Anonby & Asadi (2014) — das "hand"; apocope of *dast', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'Anonby & Asadi (2014) — tiya "eye"; characteristic Bakhtiari/Lurish form (cf. Persian čašm)', formType: 'free-word' },
      hello:  { evidence: 'direct', source: 'Anonby & Asadi (2014) — salām "hello"; Arabic-Persian loan ubiquitous in Iranian', formType: 'greeting-formula' },
      thanks: { evidence: 'direct', source: 'Anonby & Asadi (2014) — mamnun "thanks"; Arabic-Persian loan (mamnūn "obliged")', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: 'Anonby & Asadi (2014) — ye "one"; reduced form of yek', formType: 'free-word' },
      good:   { evidence: 'direct', source: 'Anonby & Asadi (2014) — xās "good"; characteristic Bakhtiari/Lurish lexeme (cf. Persian xub)', formType: 'free-word', note: 'distinctive Lurish-area form vs. Persian xub' },
    } },
  // Munda (Austroasiatic)
  unr: { name: 'Mundari', native: 'मुण्डारी', lat: 23.34, lng: 85.31, // Ranchi
},
  hoc: { name: 'Ho', native: 'Ho', lat: 22.55, lng: 85.81, // Chaibasa
},
  // Trans-New Guinea (first Papuan language)
  enq: { name: 'Enga', native: 'Enga', lat: -5.47, lng: 143.71, // Wabag

    wordEvidence: {
      fire: { evidence: 'inferred', note: 'Enga "ita" — same form as "tree" (firewood/tree polysemy possible); pending source confirmation (Audit Task 120)' },
      tree: { evidence: 'inferred', note: 'Enga "ita" — same form as "fire" (firewood/tree polysemy possible); pending source confirmation (Audit Task 120)' }
    }},
  // Middle Iranian (Parthian, distinct from Pahlavi)
  // xpr Parthian wordEvidence: per Codex review 6, most cells are Iranian
  // cognate / Middle Persian projection; Parthian-specific direct attestation
  // (e.g., Manichaean Parthian texts, Nisa ostraca) requires per-cell verification
  // in Durkin-Meisterernst Dictionary or MPCD. Conservative: all proxy.
  xpr: { name: 'Parthian', native: 'Pārthawānīg', lat: 37.97, lng: 58.20, // Nisa, Turkmenistan

    wordEvidence: {
      water:  { evidence: 'proxy', source: 'Iranian cognate (Middle Persian āb)' },
      fire:   { evidence: 'proxy', source: 'Iranian cognate (MP ādar)' },
      sun:    { evidence: 'proxy', source: 'Iranian cognate (Avestan hvar)' },
      moon:   { evidence: 'proxy', source: 'Iranian cognate (MP māh)' },
      mother: { evidence: 'proxy', source: 'Iranian cognate (MP mād)' },
      father: { evidence: 'proxy', source: 'Iranian cognate (MP pid/pidar)' },
      eat:    { evidence: 'proxy', source: 'Iranian cognate (MP xwardan); verbal stem' },
      drink:  { evidence: 'proxy', source: 'Iranian cognate (MP nōšīdan); verbal stem' },
      love:   { evidence: 'proxy', source: 'Iranian cognate (MP frīyādan)' },
      heart:  { evidence: 'proxy', source: 'Iranian cognate (MP dil)' },
      tree:   { evidence: 'proxy', source: 'Iranian cognate (MP dār)' },
      house:  { evidence: 'proxy', source: 'Iranian cognate (MP xānag)' },
      dog:    { evidence: 'proxy', source: 'Iranian cognate (MP sag)' },
      hand:   { evidence: 'proxy', source: 'Iranian cognate (MP dast)' },
      eye:    { evidence: 'proxy', source: 'Iranian cognate (MP čašm)' },
      hello:  { evidence: 'proxy', source: 'Middle Iranian greeting (MP drōd); Parthian citation pending' },
      thanks: { evidence: 'proxy', source: 'Middle Iranian (MP spās); Parthian citation pending' },
      one:    { evidence: 'proxy', source: 'Iranian cognate (MP ēw)' },
      good:   { evidence: 'proxy', source: 'Iranian cognate (MP nēw); confusion with NP risk' },
    } },
  // Karakhanid (Old Turkic of Kashgar)
  xqa: { name: 'Karakhanid', native: 'تركي', lat: 39.47, lng: 75.99, // Kashgar
},
  // Old Irish (Goidelic, c. 600-900 CE)
  sga: { name: 'Old Irish', native: 'Goídelc', lat: 54.35, lng: -6.65, // Armagh
},
  // === Phase 6: filling final major gaps ===
  // Language isolate (Karakoram)
  bsk: { name: 'Burushaski', native: 'بُروشَسکی', lat: 36.32, lng: 74.65, // Hunza
},
  // Iranian (Sogdian descendant)
  yai: { name: 'Yaghnobi', native: 'yaġnobí zivók', lat: 39.15, lng: 68.50, // Yaghnob Valley
},
  // English-based creole (Suriname)
  srn: { name: 'Sranan Tongo', native: 'Sranan Tongo', lat: 5.85, lng: -55.20, // Paramaribo
},
  // Aukan / Ndyuka — English-based maroon creole, ~30K, Suriname (Tapanahony River) + French Guiana. Distinct from Sranan; main maroon language.
  // Sources: Ethnologue 27 'djk'; Glottolog ndyu1242; Huttar & Huttar (1994) Ndyuka grammar.
  djk: { name: 'Aukan (Ndyuka)', native: 'Okanisi tongo', lat: 4.20, lng: -54.45, // Drietabbetje, upper Tapanahony River
},
  // Saramaccan — English-/Portuguese-based maroon creole (~50% English / ~35% Portuguese / ~15% African substrate), ~26K, Suriname (Suriname River) + French Guiana.
  // Sources: Ethnologue 27 'srm'; Glottolog sara1340; Smith (1987) The Genesis of the Creole Languages of Surinam; Aboh & Smith (2009).
  srm: { name: 'Saramaccan', native: 'Saamaka tongo', lat: 4.05, lng: -55.50, // Brokopondo / upper Suriname River
},
  // Wakashan (Pacific Northwest Coast)
  kwk: { name: 'Kwak\'wala', native: 'Kwak\'wala', lat: 50.62, lng: -126.93, // Vancouver Island

    // Audit Task 200/173: full per-cell wordEvidence for source-checked
    // Kwak'wala (Wakashan) row. Sources: Boas, Franz (1947) "Kwakiutl
    // Grammar with a Glossary of the Suffixes" (Trans. Amer. Phil. Soc.
    // n.s. 37); Grubb, David McC. (1977) A Practical Writing System and
    // Short Dictionary of Kwakw'ala (National Museum of Man, Mercury
    // Series CES Paper 34); FirstVoices Kwak'wala community archive
    // (https://www.firstvoices.com/explore/FV/sections/Data/Kwak%27wala);
    // U'mista Cultural Society Kwak'wala teaching materials (Alert Bay).
    // Surface uses U'mista/Liq'wala orthography with macron-under for
    // velar/uvular distinction. Glottal stops are written as plain '.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Grubb (1977) Practical Writing System §lexicon — \'wap/ʔwap "water"; standard noun', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'Grubb (1977) — lax̱ "fire"; uvular x̱ (= /x/) per U\'mista orthography', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Boas (1947) Kwakiutl Grammar §glossary — ƛ\'isa̱la "sun, daylight"; lateral ejective tłʼ', formType: 'free-word' },
      moon:   { evidence: 'direct', source: 'Grubb (1977) — \'mukwa "moon"; glottalized nasal-initial', formType: 'free-word' },
      mother: { evidence: 'direct', source: 'Grubb (1977) — abe(mp) "mother"; vocative shortened to abe in everyday use', formType: 'free-word' },
      father: { evidence: 'direct', source: 'Grubb (1977) — o̱mp "father"; basic kinship term', formType: 'free-word' },
      eat:    { evidence: 'direct', source: 'Boas (1947) — ha\'map "to eat" (root ham- + suffix -ap general activity); attested as inflected stem', formType: 'free-word' },
      drink:  { evidence: 'direct', source: 'Boas (1947) — na\'qa "to drink"; attested verbal stem', formType: 'free-word' },
      love:   { evidence: 'direct', source: 'Grubb (1977) — \'ya̱x̱is "to love, like"; glottalized y-initial', formType: 'free-word' },
      heart:  { evidence: 'direct', source: 'Boas (1947) — ts\'iłas "heart"; ejective ts\'-', formType: 'free-word' },
      tree:   { evidence: 'direct', source: 'Grubb (1977) — x̱o̱kwa "tree"; uvular x̱', formType: 'free-word' },
      house:  { evidence: 'direct', source: 'Boas (1947) — g̱ukw "house"; foundational noun (cf. Boas\'s ethnographic discussions of Kwakwaka\'wakw house types)', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Grubb (1977) — \'wa̱ts\'i "dog"; glottalized w + ejective ts\'', formType: 'free-word' },
      cat:    { evidence: 'direct', source: 'FirstVoices Kwak\'wala — pi̱s "cat"; post-contact loan (likely from English "puss")', formType: 'free-word' },
      hand:   { evidence: 'direct', source: 'Grubb (1977) — \'wała "hand"; lateral ł', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'Boas (1947) — gigayu "eye"; basic noun', formType: 'free-word' },
      hello:  { evidence: 'direct', source: 'FirstVoices Kwak\'wala / U\'mista Cultural Society — gilakas\'la "welcome, thank you, hello"; canonical multipurpose greeting', formType: 'greeting-formula', note: 'lexical overlap with thanks: gilakas\'la is the canonical multipurpose greeting/thanks formula in U\'mista community usage' },
      thanks: { evidence: 'direct', source: 'FirstVoices Kwak\'wala / U\'mista Cultural Society — gilakas\'la "thank you, welcome"; same multipurpose form', formType: 'thanks-formula', note: 'lexical overlap with hello: gilakas\'la is the canonical multipurpose greeting/thanks formula' },
      one:    { evidence: 'direct', source: 'Grubb (1977) — \'na̱m "one"; glottalized n + schwa', formType: 'free-word' },
      good:   { evidence: 'direct', source: 'Grubb (1977) — ek\' "good, well"; basic adjective', formType: 'free-word' },
    } },
  // Salishan (Pacific Northwest Coast — central British Columbia coast)
  // Nuxalk (also Bella Coola) is the sole surviving Salishan language of the central BC coast and one of the most
  // typologically remarkable phonologies on record: it tolerates ENTIRE WORDS with no phonemic vowels (e.g. the
  // oft-cited xłp̓x̣ʷłtłpłłskʷc̓ "then he had had in his possession a bunchberry plant"), with obstruents acting
  // as syllabic nuclei (Bagemihl 1991). ~17 fluent first-language speakers remain; community revitalization
  // (Nuxalk Nation, Acwsalcta School, FirstVoices Nuxalk) is active.
  // Vocabulary coverage is intentionally minimal: the 20-cell Swadesh-style basic-vocab list does NOT map cleanly
  // onto the all-consonant forms for which Nuxalk is famous, and full Swadesh attestation in Nater (1984) is not
  // confidently accessible here, so every cell is left '—' under dataStatus:'fragmentary' rather than fabricated.
  // Sources: Nater, H.F. (1984) The Bella Coola Language (Canadian Museum of Civilization, Mercury Series 92);
  // Bagemihl, Bruce (1991) "Syllable structure in Bella Coola" Linguistic Inquiry 22:589-646; Nuxalk Nation
  // language program / FirstVoices Nuxalk archive; Glottolog bell1243; Ethnologue 27 'blc'.
  blc: { name: 'Nuxalk', native: 'Nuxalk', lat: 52.40, lng: -126.75, // Bella Coola valley, central BC coast
    // Cells filled from forms attested in Nater (1990) A Concise Nuxalk-English
    // Dictionary as quoted in (a) the basic-vocab summary on Native-Languages.org
    // /nuxalk_words.htm (water, sun, moon, one) and (b) examples cited in the
    // Wikipedia Nuxalk language article (dog ƛ̓ikm) and in Mellesmoen (2021)
    // "Syllables and Reduplication in Bella Coola (Nuxalk)" (ICSNL 56:226-243),
    // which directly references Nater (1990) for additional forms. The
    // word /qāχla/ "drink" is attested as the verb-stem citation in the same
    // Wikipedia example set. Most remaining Swadesh cells (mother, father,
    // house, eat, hand, eye, heart, hello, thanks, love, good, cat, fire) remain
    // unfilled because Nater 1984/1990 is not openly accessible here and we
    // do not have a confident attestation; per Audit Task 162 they are flagged
    // as `unsourced` in meta.unattestedReason.

    wordEvidence: {
      water:  { evidence: 'direct', source: 'Nater (1990) A Concise Nuxalk-English Dictionary, via Native-Languages.org Nuxalk basic-vocab list — qla "water"', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Nater (1990) A Concise Nuxalk-English Dictionary, via Native-Languages.org Nuxalk basic-vocab list — snx "sun"; an obstruent-only word (no phonemic vowel) per Bagemihl (1991:589-646)', formType: 'free-word', note: 'Nuxalk allows fricatives as syllabic nuclei; here /s/ is the syllable peak (Bagemihl 1991, Mellesmoen 2021)' },
      moon:   { evidence: 'direct', source: 'Nater (1990) A Concise Nuxalk-English Dictionary, via Native-Languages.org Nuxalk basic-vocab list — tlʼuk "moon"', formType: 'free-word' },
      drink:  { evidence: 'direct', source: 'Nater (1990) Nuxalk-English Dictionary — qāχla "to drink"; cited in Wikipedia Nuxalk language article phonology examples', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Wikipedia Nuxalk language article (citing Nater 1984/1990) — ƛ̓ikm "dog"; the lateral ejective affricate ƛ̓ = tɬʼ', formType: 'free-word' },
      one:    { evidence: 'direct', source: 'Nater (1990) A Concise Nuxalk-English Dictionary, via Native-Languages.org Nuxalk basic-vocab list — maw "one"', formType: 'free-word' }
    }},
  // Khoisan (Tanzania, distinct from Hadza)
  sad: { name: 'Sandawe', native: 'Sandawe', lat: -4.91, lng: 35.78, // Kondoa
},
  // Tai-Kadai (China, related to Zhuang)
  pcc: { name: 'Bouyei', native: 'Haausqyaix', lat: 26.58, lng: 106.71, // Anshun

    // Audit Task 200/173: full per-cell wordEvidence for source-checked
    // Bouyei (Wangmo dialect / standard) row. Sources: Snyder, Wil C.
    // (2008) "Bouyei Phonology and Orthography Development" (SIL Mainland
    // Southeast Asia Group); Greenhill, Blust & Gray Austronesian Basic
    // Vocabulary Database (ABVD) — Wangmo Bouyei (id=731); Wei Qingwen
    // (Vy Cinwen, 1986) Brief Description of Bouyei (Beijing); Bouyei
    // Pinyin orthography (1956 official; revised 1981, used in PRC
    // education materials). Pinyin tone letters: plain = tone 1 (˨˦),
    // -z = tone 2 (˩˩), -j = tone 3 (˥˧), -x = tone 4 (˧˩), -l = tone 5
    // (˧˥), -s = tone 6 (˥˧), -h = tone 7 (˧˩ short), -q = tone 8 (˧˧).
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Snyder (2008) Bouyei Phonology — raamx/raːm˧˩ "water"; -x = tone 4 (˧˩); Tai *raːm', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'Snyder (2008) — feih/fei˧˩ "fire"; -h = tone 7 (˧˩ short)', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Wei Qingwen (1986) Brief Description of Bouyei — ngonzbyaaiz/ŋon˩˩pjaːi˩˩ "sun"; compound ngonz "day" + byaaiz', formType: 'compound', note: 'compound noun: literally "day-sun" — typical Tai-Kadai compound for celestial bodies' },
      moon:   { evidence: 'direct', source: 'Snyder (2008) — ronh/roːn˧˩ "moon"; tone 7', formType: 'free-word' },
      mother: { evidence: 'direct', source: 'Wei Qingwen (1986) — meeh/meː˧˩ "mother"; basic kinship', formType: 'free-word' },
      father: { evidence: 'direct', source: 'Wei Qingwen (1986) — poh/poː˧˩ "father"; basic kinship', formType: 'free-word' },
      eat:    { evidence: 'direct', source: 'Snyder (2008) — gianl/ɡian˧˥ "to eat"; -l = tone 5 (˧˥); Tai *kin', formType: 'free-word' },
      drink:  { evidence: 'direct', source: 'Snyder (2008) — gunl/ɡuŋ˧˥ "to drink"; -l = tone 5; cf. Standard Zhuang gwn', formType: 'free-word' },
      love:   { evidence: 'direct', source: 'Wei Qingwen (1986) — gaais/ɡaːi˥˧ "to love"; -s = tone 6', formType: 'free-word' },
      heart:  { evidence: 'direct', source: 'Wei Qingwen (1986) — saamh/saːm˧˩ "heart"; tone 7; Tai *cǎj/saːm', formType: 'free-word' },
      tree:   { evidence: 'direct', source: 'Snyder (2008) — faix/fai˧˩ "tree, wood"; -x = tone 4; Tai *vaːj', formType: 'free-word' },
      house:  { evidence: 'direct', source: 'Wei Qingwen (1986) — ranz/raŋ˩˩ "house"; -z = tone 2', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Snyder (2008) — ma/ma˨˦ "dog"; tone 1 (unmarked); Tai *hmaː', formType: 'free-word' },
      cat:    { evidence: 'direct', source: 'Wei Qingwen (1986) — meeuq/meːu˧˧ "cat"; -q = tone 8 (˧˧); Tai *meːw onomatopoeic', formType: 'free-word' },
      hand:   { evidence: 'direct', source: 'Snyder (2008) — faengz/faŋ˩˩ "hand"; -z = tone 2', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'Wei Qingwen (1986) — daa/daː˨˦ "eye"; tone 1; Tai *daː', formType: 'free-word' },
      hello:  { evidence: 'direct', source: 'Wei Qingwen (1986) — meez ndil "hello" (lit. "well/good"); standard greeting formula', formType: 'greeting-formula', autoTag: 'task-194-multi-word' },
      thanks: { evidence: 'direct', source: 'Wei Qingwen (1986) — gangzhainh/ɡaŋ˩˩haiŋ˧˩ "thanks, gratitude"; compound expression', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: 'ABVD Wangmo Bouyei (id=731) — ndeeul/ndeːu˧˥ "one"; tone 5 (from -l ending); Tai *ʔdiaw', formType: 'free-word' },
      good:   { evidence: 'direct', source: 'Snyder (2008) — ndil/ndi˧˥ "good"; tone 5; Tai *ʔdiː', formType: 'free-word' },
    } },
  // Hmong-Mien (Yao branch)
  ium: { name: 'Iu Mien', native: 'Iu Mienh', lat: 22.0, lng: 103.0, // Vietnam-Laos-China border

    // Audit Task 200/173: full per-cell wordEvidence for source-checked
    // Iu Mien row. Sources: Court, Christopher (1986) "A Fleeting
    // Encounter with the Iu Mien (Yao) of Northern Thailand"; Purnell,
    // Herbert C. (2012) An Iu-Mienh — English Dictionary (Silkworm
    // Books, Chiang Mai); Lombard, Sylvia J. (1968) Yao-English
    // Dictionary (Cornell SE Asia Program); IMUS (Iu Mien Unified
    // Script) tone letter conventions: plain = tone 1 (˧ mid),
    // -v = tone 2 (˦ high), -c = tone 3 (˨˩ low), -h = tone 4 (˨˧ low
    // rise) ... -z = tone 5 (˨˧), -x = tone 6 (˨˧). The IMUS romanization
    // was developed by missionaries in Thailand in the 1930s and revised
    // in 1984 at a unification conference in Portland, Oregon.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Purnell (2012) Iu-Mienh English Dictionary — wuom/wuom˧ "water"; mid tone (plain)', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'Purnell (2012) — douz/dou˨˧ "fire"; -z = tone 5 (˨˧)', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Purnell (2012) — hnoi/hnoi˧ "sun, day"; mid tone; voiceless h-nasal cluster', formType: 'free-word', note: 'covers both sun and day per Mien polysemy convention' },
      moon:   { evidence: 'direct', source: 'Purnell (2012) — hlaax/hlaː˨˧ "moon"; -x = tone 6 (˨˧); voiceless h-lateral cluster', formType: 'free-word' },
      mother: { evidence: 'direct', source: 'Purnell (2012) — maa/maː˧ "mother"; mid tone (plain)', formType: 'free-word' },
      father: { evidence: 'direct', source: 'Purnell (2012) — diex/die˨˧ "father"; -x = tone 6', formType: 'free-word' },
      eat:    { evidence: 'direct', source: 'Purnell (2012) — nyanc/ɲan˨˩ "to eat"; -c = tone 3 (low ˨˩)', formType: 'free-word' },
      drink:  { evidence: 'direct', source: 'Purnell (2012) — hopv/hop˦ "to drink"; -v = tone 2 (high ˦)', formType: 'free-word' },
      love:   { evidence: 'direct', source: 'Purnell (2012) — hnamv/hnam˦ "to love"; -v = tone 2 (high)', formType: 'free-word' },
      heart:  { evidence: 'direct', source: 'Purnell (2012) — mba\'y-fim/mbai˧fim˧ "heart"; compound (mbai "centre" + fim "heart")', formType: 'compound' },
      tree:   { evidence: 'direct', source: 'Purnell (2012) — ndiangx/ndiaŋ˨˧ "tree"; -x = tone 6; prenasalized stop nd-', formType: 'free-word' },
      house:  { evidence: 'direct', source: 'Purnell (2012) — biauv/biau˦ "house"; -v = tone 2 (high)', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Purnell (2012) — juv/d͡ʒu˦ "dog"; -v = tone 2', formType: 'free-word' },
      cat:    { evidence: 'direct', source: 'Purnell (2012) — mbao/mbao˧ "cat"; mid tone; prenasalized mb-; onomatopoeic', formType: 'free-word' },
      hand:   { evidence: 'direct', source: 'Purnell (2012) — buoz/buo˨˧ "hand"; -z = tone 5', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'Purnell (2012) — m\'zing/m̩ziŋ˧ "eye"; mid tone; syllabic m-', formType: 'free-word' },
      hello:  { evidence: 'direct', source: 'Purnell (2012) — yiem-longx "hello" (lit. "be-well"); standard Mien greeting compound', formType: 'greeting-formula', autoTag: 'task-194-multi-word' },
      thanks: { evidence: 'direct', source: 'Purnell (2012) — laengz/laŋ˨˧ "thank, accept"; basic gratitude verb', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: 'Purnell (2012) — yietc/jiet˨˩ "one"; -c = tone 3 (low)', formType: 'free-word' },
      good:   { evidence: 'direct', source: 'Purnell (2012) — longx/loŋ˨˧ "good"; -x = tone 6', formType: 'free-word' },
    } },
  // Trans-New Guinea (additional)
  hui: { name: 'Huli', native: 'Huli', lat: -5.85, lng: 142.95, // Tari
},
  // Polynesian (Tokelau)
  tkl: { name: 'Tokelauan', native: 'Tokelau', lat: -8.55, lng: -172.50, // Atafu
},
  // Salishan (Pacific Northwest Coast)
  squ: { name: 'Squamish', native: 'Sḵwx̱wú7mesh sníchim', lat: 49.70, lng: -123.16, // Squamish, BC
},
  // Middle Irish (between Old Irish and Modern Irish)
  mga: { name: 'Middle Irish', native: 'Gáedelg', lat: 53.59, lng: -6.62, // Tara/Dublin
},
  // Biblical/Ancient Hebrew (distinct from Modern Hebrew)
  hbo: { name: 'Biblical Hebrew', native: 'עברית מקראית', lat: 31.78, lng: 35.21, // Jerusalem
},
  // Mishnaic Hebrew (לשון חכמים "language of the sages", ~70-200 CE) —
  // post-Biblical Hebrew of the Mishnah (compiled c. 200 CE by Judah ha-Nasi),
  // Tosefta, early Midrashim, and the Hebrew portions of the Talmud.
  // Distinct from Biblical Hebrew (hbo): heavy Aramaic and Greek loans
  // (אילן for "tree", חתול for "cat" — neither in BH), simplified verb
  // system, fixed word order shifting toward SVO, gemara-era vocabulary.
  // Survived as written/scholarly language after extinction as vernacular
  // ~200 CE. Coordinate: Yavne, formative center under Yochanan ben Zakkai
  // post-70 CE before the Galilean transition.
  he_mis: { name: 'Mishnaic Hebrew', native: 'לשון חכמים', lat: 31.88, lng: 34.74,
},
  // Classical Armenian (Grabar, Գրաբար "written language", 5th-12th c. CE) —
  // standardized literary form of Armenian established by Mesrop Mashtots's
  // alphabet (~405 CE) and the Bible translation that followed. Continued
  // as the liturgical language of the Armenian Apostolic Church to this day,
  // and as the scholarly/literary language alongside Eastern (hye) and
  // Western (hyw) Modern Armenian. Coordinate: Vagharshapat (Etchmiadzin),
  // seat of the Armenian Catholicos and where Mashtots's Bible was first
  // read aloud.
  hy_grab: { name: 'Classical Armenian (Grabar)', native: 'Գրաբար', lat: 40.16, lng: 44.30,
},
  // === Phase 7: regional gap-fillers ===
  // Trans-New Guinea (Papuan)
  mpt: { name: 'Mian', native: 'Mian', lat: -5.13, lng: 141.61, // Telefomin

    wordEvidence: {
      sun:    { evidence: 'inferred', note: 'Mian "kep" — same form as "good"; pending source confirmation (Audit Task 120)' },
      good:   { evidence: 'inferred', note: 'Mian "kep" — same form as "sun" (sunlight/positive polysemy possible); pending source confirmation (Audit Task 120)' },
      mother: { evidence: 'inferred', note: 'Mian "na" — same form as "love"; pending source confirmation (Audit Task 120)' },
      love:   { evidence: 'inferred', note: 'Mian "na" — same form as "mother" (kinship/affection polysemy possible); pending source confirmation (Audit Task 120)' }
    }},
  ygr: { name: 'Yagaria', native: 'Yagaria', lat: -6.58, lng: 145.39, // Eastern Highlands

    wordEvidence: {
      love:  { evidence: 'inferred', note: 'Yagaria "amige" — same form as greeting "hello" (affectionate greeting overlap possible); pending source confirmation (Audit Task 120)' },
      hello: { evidence: 'inferred', note: 'Yagaria "amige" — same form as "love"; greeting/affection overlap pending source confirmation (Audit Task 120)' }
    }},
  // North Bougainville (isolate-like; non-Austronesian Papuan, formerly grouped under the now-disused "East Papuan")
  // Rotokas is celebrated for one of the world's smallest phoneme inventories (central dialect: 6 consonants p t k β ɾ ɡ + 5 vowels — no nasals).
  // Vocabulary partial: only the cells with confident Firchow & Firchow (1973) / Robinson (2006, 2011) attestation are filled;
  // the remaining cells are marked '—' under dataStatus:'fragmentary' (DATA_STATUS_OVERRIDES) rather than fabricated.
  // Sources: Firchow & Firchow (1973) SIL "Vocabulary of Rotokas-Pidgin-English"; Robinson (2006) "Phoneme Inventory of the Aita Dialect of Rotokas" (Oceanic Linguistics 45:1); Glottolog roto1249.
  roo: { name: 'Rotokas', native: 'Rotokas', lat: -6.30, lng: 155.20, // central Bougainville highlands, Papua New Guinea
    // Cells reconciled to the actual entries in Firchow, Firchow & Akoitai
    // (1973) "Vocabulary of Rotokas-Pidgin-English" (Summer Institute of
    // Linguistics, Papua New Guinea), copy available on Internet Archive as
    // "Rotokas dictionary" (Rotokas Proper / central dialect). Several earlier
    // forms in this row (oeai, kakae, raviva, kuari, ipa, kavu, roru, upi,
    // uvure, arue) were not found in the published Firchow dictionary and in
    // some cases were attested for unrelated meanings (kakae = "small", ipa =
    // "climb", kavu = "leave/lose", upi only in compound "evao upi" = "core of
    // tree"). The cells below now use the forms that appear verbatim in the
    // Firchow 1973 dictionary with their Pidgin/English glosses.

    wordEvidence: {
      water:  { evidence: 'direct', source: 'Firchow & Firchow (1973) — ovi "wara" (liquid, juice, water)', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'Firchow & Firchow (1973) — erava "paia" (fire)', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Firchow & Firchow (1973) — ravireo "san" (sun, sunshine)', formType: 'free-word' },
      moon:   { evidence: 'direct', source: 'Firchow & Firchow (1973) — kekira "mun" (moon, month)', formType: 'free-word' },
      mother: { evidence: 'direct', source: 'Firchow & Firchow (1973) — aako "mama" (mother; also classifier-kin FaBrWi)', formType: 'free-word' },
      father: { evidence: 'direct', source: 'Firchow & Firchow (1973) — aite "papa" (father; also classifier-kin MoSiHu, FaBr)', formType: 'free-word' },
      eat:    { evidence: 'direct', source: 'Firchow & Firchow (1973) — aio "kaikai" (to eat); alternant gatasia also attested', formType: 'root' },
      tree:   { evidence: 'direct', source: 'Firchow & Firchow (1973) — evaova "tri, diwai" (tree)', formType: 'free-word' },
      house:  { evidence: 'direct', source: 'Firchow & Firchow (1973) — kepa "haus, kebin" (house, cabin, building)', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Firchow & Firchow (1973) — kaakau "dok" (dog)', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'Firchow & Firchow (1973) — osireito "ai" (eye)', formType: 'free-word' },
      hello:  { evidence: 'direct', source: 'Firchow & Firchow (1973) — ega "welkam, sekan" (to greet, welcome); used as greeting formula', formType: 'greeting-formula' },
      one:    { evidence: 'direct', source: 'Firchow & Firchow (1973) — katai "wan, wanpela" (one)', formType: 'free-word' },
      good:   { evidence: 'direct', source: 'Firchow & Firchow (1973) — rekoreko "gutpela" (good); alternant rekoto "gutpela man" = "a good man"', formType: 'free-word' }
    }},
  // Quechuan (specific varieties)
  quz: { name: 'Cusco Quechua', native: 'Qhichwa', lat: -13.53, lng: -71.97, // Cusco
},
  quy: { name: 'Ayacucho Quechua', native: 'Chanka Runasimi', lat: -13.16, lng: -74.22, // Ayacucho
},
  // Shipibo-Conibo — Pano family, ~26K, Peru (Ucayali River basin).
  // Documented for unique 'song-design' tradition (kené) and complex
  // evidentiality system.
  shp: { name: 'Shipibo-Conibo', native: 'Jonibo', lat: -8.39, lng: -74.55, // Pucallpa, Ucayali
},
  // Arawakan (Caribbean)
  cab: { name: 'Garifuna', native: 'Karifuna', lat: 15.77, lng: -86.79, // La Ceiba
},
  // Athabaskan (BC, Canada)
  crx: { name: 'Carrier', native: 'Dakelh', lat: 53.92, lng: -122.75, // Prince George
},
  // Tsimshianic (Pacific Northwest Coast)
  tsi: { name: 'Coast Tsimshian', native: 'Sm\'algyax', lat: 54.31, lng: -130.32, // Prince Rupert
},
  // Thompson (Nlaka'pamuctsin) — Salishan (Interior, Northern — sister to Lillooet, Shuswap, Okanagan within Northern Interior Salish), ~200 fluent + ~500 partial, Canada (British Columbia — Thompson and Fraser canyons).
  // Sources: Ethnologue 27 'thp'; Glottolog thom1242; Thompson & Thompson (1992) The Thompson Language.
  thp: { name: 'Thompson', native: "Nlaka'pamuctsin", lat: 50.21, lng: -121.59, // Lytton, BC (Nlaka'pamux territory confluence of Thompson + Fraser rivers)
},
  // Iranian (Pamir)
  wbl: { name: 'Wakhi', native: 'x̌ikwor zik', lat: 36.95, lng: 73.52, // Wakhan
},
  // Indo-Aryan (Dardic, Afghanistan)
  psi: { name: 'Pashai', native: 'pâšâî', lat: 35.0, lng: 69.5, // Kapisa
},
  // Indo-Aryan (Rajasthani)
  bgq: { name: 'Bagri', native: 'बागड़ी', lat: 28.02, lng: 73.31, // Bikaner
},
  // Nilo-Saharan (Western Nilotic, Luo)
  // Lango — Western Nilotic, Northern Uganda (Audit Task 150 Batch F)
  laj: { name: 'Lango', native: 'Lëblaŋo', lat: 2.24, lng: 32.90, // Lira
},
  ach: { name: 'Acholi', native: 'Lwoo', lat: 2.78, lng: 32.30, // Gulu
},
  // Audit Task 181: lag row removed — was a copy-paste duplicate of laj Lango.
  // ISO 639-3 'lag' is Langi (Rangi), Bantu of Tanzania (~370K speakers in
  // Kondoa District), totally different language. Re-add as a proper Langi row
  // when sourced data is available (Stegen 2002 or similar).
  // === Phase 8: East / SE Asian major dialects ===
  // Burmese variety
  rki: { name: 'Rakhine', native: 'ရခိုင်ဘာသာ', lat: 20.15, lng: 92.90, // Sittwe
},
  // Hakha Chin (Lai) — Sino-Tibetan Kuki-Chin, ~125K speakers, Chin State Myanmar + Mizoram India.
  // Sources: Ethnologue 27 'cnh'; Glottolog haka1240; King (2010) Hakha Lai Grammar.
  cnh: { name: 'Hakha Chin', native: 'Lai Holh', lat: 22.65, lng: 93.61, // Hakha, Chin State, Myanmar
},
  // Khmer variety (Thailand-Cambodia border)
  kxm: { name: 'Northern Khmer', native: 'ភាសាខ្មែរ (Surin)', lat: 14.88, lng: 103.49, // Surin
},
  // Mongolian (historical)
  // Middle Mongolian. Co-located with Old Turkic at the Orkhon valley
  // (Karakorum area) — the wordmap's coordGroup logic auto-stacks labels
  // sharing the same lat/lng so they don't overlap visually.
  // Word forms use Traditional Mongolian script (vertical) with Latin
  // transliteration in the IPA field.
  xng: { name: 'Middle Mongolian', native: 'ᠮᠣᠩᠭᠣᠯ', lat: 47.20, lng: 102.83, // Karakorum / Orkhon valley
},
  // Japanese dialects (additional)
  ja_kg: { name: 'Japanese (Kagoshima)', native: '日本語(鹿児島)', lat: 31.59, lng: 130.55, // Kagoshima
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 鹿児島弁; 〜て form with 九州ウ音便. 食う→食うて, 飲む→飲うで, 良か→良かって', formType: 'connective-te', note: 'citation: 食べる; connective 〜て per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 鹿児島弁; 〜て form with 九州ウ音便. 食う→食うて, 飲む→飲うで, 良か→良かって', formType: 'connective-te', note: 'citation: 飲む; connective 〜て per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 鹿児島弁; 〜て form with 九州ウ音便. 食う→食うて, 飲む→飲うで, 良か→良かって', formType: 'connective-te', note: 'citation form 良か; connective 〜かって per regional-variety policy' },
    } },
  ja_sd: { name: 'Japanese (Sendai)', native: '日本語(仙台)', lat: 38.27, lng: 140.87, // Sendai
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 仙台弁 (Tohoku); 〜て form. 食う→食って (促音便), 飲む→飲んで (撥音便), いい→良くて', formType: 'connective-te', note: 'citation: 食べる; connective 〜て per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 仙台弁 (Tohoku); 〜て form. 食う→食って (促音便), 飲む→飲んで (撥音便), いい→良くて', formType: 'connective-te', note: 'citation: 飲む; connective 〜て per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 仙台弁 (Tohoku); 〜て form. 食う→食って (促音便), 飲む→飲んで (撥音便), いい→良くて', formType: 'connective-te', note: 'citation form 良い/いい; connective 〜くて per regional-variety policy' },
    } },
  // Korean dialects (additional)
  ko_hg: { name: 'Korean (Hamgyong)', native: '함경방언', lat: 39.92, lng: 127.54, // Hamhung
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 함경도 방언; 〜아/어 form. 먹다→먹어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 먹다; connective 〜아/어 per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 함경도 방언; 〜아/어 form. 먹다→먹어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 마시다; connective 〜아/어 (마시+어 縮約) per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 함경도 방언; 〜아/어 form. 먹다→먹어, 마시다→마셔, 좋다→좋아', formType: 'connective-eo-a', note: 'citation: 좋다; connective 〜아/어 per regional-variety policy' },
    } },
  ko_jl: { name: 'Korean (Jeolla)', native: '전라방언', lat: 35.16, lng: 126.85, // Gwangju
    wordEvidence: {
      eat:   { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 전라도 방언; 〜아/어 form with 보조용언 부러 (완료강조). 묵어 (stem 묵), 마셔 (마시+어 縮約), 좋아부러 (좋아 + 부러)', formType: 'connective-eo-a', note: 'citation: 묵다 (Jeolla stem variant of 먹다); connective 묵 + 〜어 per regional-variety policy' },
      drink: { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 전라도 방언; 〜아/어 form with 보조용언 부러 (완료강조). 묵어 (stem 묵), 마셔 (마시+어 縮約), 좋아부러 (좋아 + 부러)', formType: 'connective-eo-a', note: 'citation: 마시다; connective 〜아/어 (마시+어 縮約) per regional-variety policy' },
      good:  { evidence: 'direct', source: 'regional-variety policy (CONTRIBUTING C3) — 전라도 방언; 〜아/어 form with 보조용언 부러 (완료강조). 묵어 (stem 묵), 마셔 (마시+어 縮約), 좋아부러 (좋아 + 부러)', formType: 'connective-eo-a', note: 'citation: 좋다; connective 〜아 + 보조용언 부러 (Jeolla emphatic/completive) per regional-variety policy' },
    } },
  // Chinese diaspora variant
  nan_pn: { name: 'Penang Hokkien', native: '庇能福建話', lat: 5.41, lng: 100.34, // George Town
},
  // Mlabri (Northern Thailand hunter-gatherer)
  mra: { name: 'Mlabri', native: 'Mlabri', lat: 19.46, lng: 100.86, // Nan
},
  // Wu Chinese (Ningbo)
  wuu_nb: { name: 'Ningbo Wu', native: '宁波话', lat: 29.87, lng: 121.55, // Ningbo
},
  // Yue Chinese (Western Guangdong)
  yue_gz: { name: 'Gaozhou Yue', native: '高州话', lat: 21.92, lng: 110.85, // Gaozhou
},
  // Tai Lue (Sipsongpanna)
  khb: { name: 'Tai Lue', native: 'ᦅᧄᦺᦑᦟᦹᧉ', lat: 22.01, lng: 100.80, // Jinghong, Sipsongpanna
},
  // Tai Dam (Black Tai) — Tai-Kadai, ~750K speakers, Vietnam (Sơn La, Lai Châu) + Laos + China.
  // Sources: Ethnologue 27 'blt'; Glottolog taid1247; Fippinger (1971) Tai Dam phonology.
  blt: { name: 'Tai Dam', native: 'ꪼꪕꪒꪾ', lat: 21.33, lng: 103.92, // Sơn La, NW Vietnam
},
  // === Phase 9: African + Filipino gap-fillers ===
  pam: { name: 'Kapampangan', native: 'Kapampangan', lat: 15.03, lng: 120.69, // San Fernando
},
  pag: { name: 'Pangasinan', native: 'Pangasinan', lat: 16.04, lng: 120.34, // Dagupan
},
  mdh: { name: 'Maguindanao', native: 'Magindanaw', lat: 7.22, lng: 124.25, // Cotabato
},
  gor: { name: 'Gorontalo', native: 'Bahasa Hulontalo', lat: 0.54, lng: 123.06, // Gorontalo
},
  mak: { name: 'Makassarese', native: 'ᨅᨔ ᨆᨀᨔᨑ', lat: -5.13, lng: 119.41, // Makassar
},
  fon: { name: 'Fon', native: 'Fɔ̀ngbè', lat: 7.18, lng: 1.99, // Abomey
},
  kri: { name: 'Krio', native: 'Krio', lat: 8.48, lng: -13.23, // Freetown
},
  dag: { name: 'Dagbani', native: 'Dagbanli', lat: 9.41, lng: -0.84, // Tamale
},
  xog: { name: 'Soga', native: 'Lusoga', lat: 0.45, lng: 33.20, // Jinja
},
  teo: { name: 'Ateso', native: 'Ateso', lat: 1.72, lng: 33.61, // Soroti
},
  dyo: { name: 'Jola-Fonyi', native: 'Kujamaat', lat: 12.58, lng: -16.27, // Ziguinchor
},
  bci: { name: 'Baoulé', native: 'Wawle', lat: 7.69, lng: -5.03, // Bouaké
},
  // === Phase 10: South Asian / Central Asian / East African / Mesoamerican gap-fillers ===
  tcy: { name: 'Tulu', native: 'ತುಳು', lat: 12.91, lng: 74.86, // Mangalore
},
  haz: { name: 'Hazaragi', native: 'هزارگی', lat: 34.82, lng: 67.83, // Bamiyan
},
  tly: { name: 'Talysh', native: 'Tolışi', lat: 38.75, lng: 48.85, // Lankaran
},
  kaa: { name: 'Karakalpak', native: 'Qaraqalpaqsha', lat: 42.45, lng: 59.61, // Nukus
},
  bej: { name: 'Beja', native: 'Bidhaawyeet', lat: 19.62, lng: 37.22, // Port Sudan
},
  tig: { name: 'Tigre', native: 'ትግረ', lat: 16.3, lng: 37.8, // Keren
},
  // Blin/Bilen — Cushitic Agaw, Eritrea (Audit Task 150 Batch G).
  // Eritrea's only Agaw branch language. Sandgren (1991) + EMoE materials.
  byn: { name: 'Blin', native: 'ብሊና', lat: 15.78, lng: 38.46, // Keren
},
  ssy: { name: 'Saho', native: 'Saaho', lat: 15.20, lng: 39.40, // Foro
},
  ewo: { name: 'Ewondo', native: 'Kɔlɔ', lat: 3.85, lng: 11.50, // Yaoundé
},
  bum: { name: 'Bulu', native: 'Bulu', lat: 2.93, lng: 11.99, // Sangmélima
},
  // Aghem — Cameroon Grassfields Bantu (Ring), ~30K speakers, NW Region.
  // Sources: Ethnologue 27 'agq'; Glottolog aghe1239; Hyman (1979) Aghem Grammatical Structure.
  agq: { name: 'Aghem', native: 'Aghem', lat: 6.16, lng: 10.10, // Wum, Cameroon
},
  // Meta' (Menemo) — Niger-Congo Bantu (Grassfields, Ring sub-branch — sister to agq Aghem within Western Grassfields), ~50K, Cameroon (Northwest Region — Mbengwi, Bali).
  // Sources: Ethnologue 27 'mgo'; Glottolog meta1238; Welmers (1973) African Language Structures.
  mgo: { name: "Meta'", native: "Meta'", lat: 6.05, lng: 10.04, // Mbengwi, NW Region, Cameroon
},
  // Dii (Duru, Dourou) — Niger-Congo Adamawa, ~50K speakers, North Cameroon (Adamaoua region).
  // Sources: Ethnologue 27 'dur'; Glottolog dury1238; Bohnhoff (1986) Yag Dii grammar.
  dur: { name: 'Dii', native: 'Yag Dii', lat: 7.32, lng: 13.58, // Ngaoundéré, Adamawa Cameroon
},
  ndc: { name: 'Ndau', native: 'ChiNdau', lat: -19.12, lng: 33.48, // Chimoio
},
  ote: { name: 'Otomi', native: 'Hñähñu', lat: 20.48, lng: -99.22, // Ixmiquilpan
},
  // Querétaro Otomi (Hñöñho) — Otomanguean Otomi-Mazahua Otomi (sister to ote Mezquital Otomi within the Otomi macrolanguage; one of the most-vibrant Otomi varieties), ~30K, Mexico (Querétaro state — Amealco de Bonfil, Tolimán, Cadereyta, Ezequiel Montes municipalities).
  // Sources: Ethnologue 27 'otq'; Glottolog quer1238; Hekking & Andrés de Jesús (1989) Diccionario Hñähñu-Español Querétaro.
  otq: { name: 'Querétaro Otomi', native: 'Hñöñho', lat: 20.18, lng: -100.14, // Amealco de Bonfil, Querétaro
},
  tar: { name: 'Tarahumara', native: 'Rarámuri', lat: 27.75, lng: -107.63, // Creel
},

  // === Phase 13c: Russia / Thailand / Africa / Americas / Indonesia / Philippines ancient ===
  // Old East Slavic — Kievan Rus' (10-15c.), ancestor of Russian/Ukrainian/Belarusian.
  // Old Cyrillic with archaic letters (yus, yer, yat).
  orv: { name: 'Old East Slavic', native: 'рꙋсьскъ ꙗꙁꙑкъ', lat: 50.45, lng: 30.52, // Kyiv
},
  // Scythian — Iranian, NE/SE European steppes (~7c. BCE - 4c. CE). Very fragmentary;
  // mostly known through Greek transcriptions of names + Ossetian cognates. Many entries
  // are reconstructed proxies based on Avestan/Old Iranian.
  // === wordEvidence (Schema Revolution Phase 2) ===
  // Per-cell evidence overlay. Schema:
  //   wordEvidence: { <concept>: { evidence: 'direct'|'proxy'|'reconstructed'|'inferred'|'disputed'|'pedagogical', source?: string, note?: string } }
  // Cells without an entry inherit the lang-level dataStatus (from DATA_STATUS_OVERRIDES).
  // xsc Scythian is the pilot: per Iranica, only `spaka` (dog) is directly attested
  // via the personal name Išpakaia; all other cells are Old Iranian/Avestan proxy.
  xsc: { name: 'Scythian', native: 'Skuda', lat: 47.00, lng: 35.00, // Pontic steppe

    wordEvidence: {
      dog:    { evidence: 'direct', source: 'Iranica via personal name Išpakaia' },
      water:  { evidence: 'proxy',  source: 'Old Iranian *āp- (Avestan ap-)' },
      fire:   { evidence: 'proxy',  source: 'Avestan ātar-' },
      sun:    { evidence: 'proxy',  source: 'Avestan hvar-' },
      moon:   { evidence: 'proxy',  source: 'Old Iranian māh-' },
      mother: { evidence: 'proxy',  source: 'Old Iranian mātar-' },
      father: { evidence: 'proxy',  source: 'Old Iranian pitar-' },
      eat:    { evidence: 'proxy',  source: 'Old Iranian *xwar-' },
      heart:  { evidence: 'proxy',  source: 'Old Iranian zard-' },
      hand:   { evidence: 'proxy',  source: 'Old Iranian zasta' },
      eye:    { evidence: 'proxy',  source: 'Old Iranian čašm-' },
      one:    { evidence: 'proxy',  source: 'Old Iranian *aiwa-' },
      good:   { evidence: 'proxy',  source: 'Avestan vohu-' },
    } },
  // Old Thai (Sukhothai era) — 13c. Ramkhamhaeng inscription (1283), the earliest
  // attested Thai. Sukhothai script, ancestor of modern Thai. Many words cognate
  // with modern Thai.
  sukh: { name: 'Old Thai (Sukhothai)', native: 'ภาสาไทย (สุโขทัย)', lat: 17.02, lng: 99.82,

    wordEvidence: {
      eat:   { evidence: 'inferred', note: 'Old Thai "กิน" broad consume verb covers eat/drink in Sukhothai-era texts; pending detailed source verification (Audit Task 120)' },
      drink: { evidence: 'inferred', note: 'Old Thai "กิน" broad consume verb covers eat/drink in Sukhothai-era texts; pending detailed source verification (Audit Task 120)' }
    }},
  // Meroitic — Kingdom of Kush / Meroe (Sudan, ~3c. BCE - 4c. CE). Two scripts
  // (Hieroglyphic U+10980, Cursive U+109A0). Script deciphered (Griffith), but
  // language still poorly understood; many entries are titles, names, or unknown.
  // xmr Meroitic wordEvidence: 5 cells filled, all from Rilly's deciphered Meroitic
  // lexicon. Most basic vocabulary remains undeciphered; only inscription-level
  // royal terms are well-attested.
  xmr: { name: 'Meroitic', native: '𐦨𐦫𐦡𐦴𐦢𐦤', lat: 16.94, lng: 33.72, // Meroe

    wordEvidence: {
      water:  { evidence: 'direct', source: 'Rilly Meroitic lexicon (royal inscriptions)' },
      sun:    { evidence: 'direct', source: 'Rilly Meroitic lexicon' },
      mother: { evidence: 'direct', source: 'Rilly: kdke = "queen mother" (royal title)' },
      father: { evidence: 'direct', source: 'Rilly: qor = "ruler/king" (royal context)' },
      good:   { evidence: 'inferred', source: 'Inscriptional context (Rilly)' },
    } },
  // Old Nubian — Christian Nubian kingdoms (Makuria, Alodia; 8-15c.). Coptic-derived
  // alphabet with extra Nubian letters; well-attested via translations of biblical and
  // liturgical texts.
  onw: { name: 'Old Nubian', native: 'ⲛⲟⲩⲃⲓⲁ ⲡⲁⲡⲁⲗⲁ', lat: 18.70, lng: 30.80, // Old Dongola
},
  // Classical Quechua — lingua franca of the Inca Empire (~15-16c.). Latin script
  // (Spanish friars). Well-attested; Cuzco Quechua is the closest modern descendant.
  qwc: { name: 'Classical Quechua', native: 'Runa simi', lat: -13.53, lng: -71.97, // Cuzco
},
  // Mochica / Yunga — pre-Columbian Pacific coast Peru. No native script; vocabulary
  // recorded by Carrera Daza (1644). Limited attestation; many entries are tentative.
  // omc Mochica wordEvidence: 13 non-empty cells all direct from 17c. Spanish-era
  // grammars (Carrera de la Vega 1644 "Arte de la lengua yunga", with Lugo 1607
  // also covering some lexical items). Despite fragmentary status (limited corpus),
  // individual cells ARE direct from these primary grammars.
  omc: { name: 'Mochica', native: 'Yunga', lat: -8.11, lng: -79.03, // Trujillo / Chan Chan

    wordEvidence: {
      water:  { evidence: 'direct', source: 'Carrera de la Vega 1644 (Arte de la lengua yunga)' },
      fire:   { evidence: 'direct', source: 'Carrera 1644' },
      sun:    { evidence: 'direct', source: 'Carrera 1644' },
      moon:   { evidence: 'direct', source: 'Carrera 1644' },
      mother: { evidence: 'direct', source: 'Carrera 1644' },
      father: { evidence: 'direct', source: 'Carrera 1644' },
      heart:  { evidence: 'direct', source: 'Carrera 1644' },
      house:  { evidence: 'direct', source: 'Carrera 1644' },
      dog:    { evidence: 'direct', source: 'Carrera 1644' },
      hand:   { evidence: 'direct', source: 'Carrera 1644' },
      eye:    { evidence: 'direct', source: 'Carrera 1644' },
      one:    { evidence: 'direct', source: 'Carrera 1644' },
      good:   { evidence: 'direct', source: 'Carrera 1644' },
    } },
  // Chibcha / Muisca — pre-Columbian Andean Colombia. Recorded in Lugo's grammar
  // (1619) and the Anonymous grammar (early 17c.). Latin transcription.
  // chb Chibcha wordEvidence: 19 non-empty cells all direct from 17c. Spanish-era
  // grammars: Lugo 1619 "Gramática y diccionario en la lengua general del Nuevo
  // Reyno, llamada Mosca" + Anonymous early-17c. grammar. Despite fragmentary
  // status (limited corpus), individual cells ARE direct from these grammars.
  chb: { name: 'Chibcha', native: 'Muysccubun', lat: 5.00, lng: -73.10, // Bogotá highlands

    wordEvidence: {
      water:  { evidence: 'direct', source: 'Lugo 1619' },
      fire:   { evidence: 'direct', source: 'Lugo 1619' },
      sun:    { evidence: 'direct', source: 'Lugo 1619' },
      moon:   { evidence: 'direct', source: 'Lugo 1619' },
      mother: { evidence: 'direct', source: 'Lugo 1619' },
      father: { evidence: 'direct', source: 'Lugo 1619' },
      eat:    { evidence: 'direct', source: 'Lugo 1619' },
      drink:  { evidence: 'direct', source: 'Lugo 1619' },
      love:   { evidence: 'direct', source: 'Lugo 1619' },
      heart:  { evidence: 'direct', source: 'Lugo 1619' },
      tree:   { evidence: 'direct', source: 'Lugo 1619' },
      house:  { evidence: 'direct', source: 'Lugo 1619' },
      dog:    { evidence: 'direct', source: 'Lugo 1619' },
      hand:   { evidence: 'direct', source: 'Lugo 1619' },
      eye:    { evidence: 'direct', source: 'Lugo 1619' },
      hello:  { evidence: 'direct', source: 'Lugo 1619' },
      thanks: { evidence: 'direct', source: 'Lugo 1619' },
      one:    { evidence: 'direct', source: 'Lugo 1619' },
      good:   { evidence: 'direct', source: 'Lugo 1619' },
    } },
  // Old Malay — Srivijaya inscriptions (7c. CE+); the Kedukan Bukit (683) is the
  // earliest. Pallava-derived Brahmi script; many words cognate with modern Malay.
  omy: { name: 'Old Malay', native: 'bhāṣā Mlayu kuna', lat: -2.99, lng: 104.76, // Palembang
},
  // Old Sundanese — Sunda Kingdom / Pajajaran (14-16c.). Old Sundanese script
  // (Brahmic; ancestor of modern Sundanese script).
  osn: { name: 'Old Sundanese', native: 'basa Sunda buhun', lat: -6.59, lng: 106.80, // Pakuan Pajajaran
},
  // Old Tagalog (pre-Hispanic) — used Baybayin script (Tagalog block U+1700).
  // Vocabulary attested via early Spanish-era dictionaries (Pedro de San Buenaventura,
  // 1613). Many words still in modern Tagalog.
  h_tagalog: { name: 'Old Tagalog', native: 'ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔', lat: 14.60, lng: 120.98, // Manila / Tondo
},

  // === Phase 13b: Northeast Asian + SE Asian ancient languages ===
  // Khitan — Liao dynasty (907-1125). Khitan Small Script (U+18B00-U+18CFF)
  // is partially deciphered; many words use Latin transliteration based on
  // Kane (2009) and Aisin Gioro reconstructions.
  // zkt Khitan wordEvidence: Codex 3 noted 17/20 cells are too strong for partly-
  // understood lang. Cells from Kane 2009 + Aisin Gioro / Wu Yingzhe research.
  // Concrete nouns are reasonably attested; abstracts (love/heart/good) are inferred.
  //
  // 2026-05-17 update: four cells (sun, moon, one, dog) now carry source-
  // confirmed Khitan Small Script glyphs in the surface slot. Glyphs are
  // taken from Kane (2009) Index of Graphs as transcribed on BabelStone
  // (https://www.babelstone.co.uk/Khitan/Kane2009List.html) and from West's
  // "A Mirror on the Khitan Language" (BabelStone Blog, 2011):
  //   sun   *nair  → 𘲺  (Kane #159, glossed "DAY"; same word as sun)
  //   moon  *sair  → 𘭧  (Kane #081, glossed "MONTH"; same word as moon)
  //   one          → 𘬣  (Kane #026, glossed "ONE")
  //   dog   *ñiqo  → 𘰕𘯛 (polygram ńi.qo per West 2011)
  // All remaining 16 cells stay in Latin transliteration — no confidently
  // sourced glyph mapping exists for water/fire/mother/father/eat/drink/
  // love/heart/tree/house/cat/hand/eye/hello/thanks/good in either Kane
  // (2009) or West/BabelStone, so no characters are fabricated.
  zkt: { name: 'Khitan', native: 'mos diau-d', lat: 43.97, lng: 119.41,
    // scriptDisplayPolicy (Audit Task 119): Khitan Small Script
    // (U+18B00–U+18CFF, Unicode 13.0, ~470 chars in the Noto Sans Khitan
    // Small Script font) is only partially deciphered. Most published
    // character tables (Kane 2009; Aisin Gioro 2004; Wu Yingzhe 2010)
    // cover Liao-dynasty royal titles, kin terms, dynastic names, and
    // numerals — NOT the everyday Swadesh-style vocabulary used here.
    //
    // Per Audit Task 119: do NOT auto-generate characters from the
    // romanization. The surface column is therefore MIXED: cells with
    // a source-confirmed glyph (sun, moon, one, dog — see comment above)
    // show the Khitan Small Script character; all other cells fall back
    // to the scholarly Latin reading (Kane 2009 system). The IPA-slot
    // always carries the Latin reading.
    //
    // Khitan Large Script (separate; ~3000 logographs, not in Unicode)
    // is even less systematically deciphered.
    scriptDisplayPolicy: {
        primary: 'scholarly-transcription',
        secondary: 'historical-script',
        note: {
            en: 'Surface column is mixed: 4 cells (sun, moon, one, dog) show source-confirmed Khitan Small Script glyphs (Kane 2009 Index of Graphs; West 2011 "Mirror on the Khitan Language"). Remaining cells show the Kane (2009) Latin reconstruction because no confidently attested glyph mapping exists. Audit Task 119 forbids auto-generation from romanization.',
            ja: '表示形は混在: 4セル (sun, moon, one, dog) は出典確認済みの契丹小字グリフ (Kane 2009 Index of Graphs; West 2011 "Mirror on the Khitan Language") を表示。残りのセルは確実に対応する字形が未確認のため Kane (2009) のラテン文字再構を表示。ローマ字からの自動生成は監査方針 (Task 119) で禁止。',
            ko: '표시 형은 혼합: 4개 셀 (sun, moon, one, dog)은 출처가 확인된 거란소자 글리프 (Kane 2009 Index of Graphs; West 2011 "Mirror on the Khitan Language")를 표시. 나머지 셀은 확실히 대응하는 글리프가 미확인이므로 Kane (2009)의 로마자 재구를 표시. 로마자 기반 자동 생성은 감사 정책 (Task 119)에서 금지.',
            zh: '表面列为混合: 4个单元格 (sun, moon, one, dog) 显示来源已确认的契丹小字字形 (Kane 2009 Index of Graphs; West 2011 "Mirror on the Khitan Language")。其余单元格因尚无确证字形对应而显示 Kane (2009) 的拉丁字母重构。审核政策 (Task 119) 禁止从罗马字自动生成。',
        },
    },
    // altWordForms — Latin (Kane 2009) reconstructed reading for the
    // four cells whose surface column now holds the Khitan Small
    // Script glyph (sun / moon / one / dog). Earlier this section
    // duplicated the glyph; the romanization is the useful complement
    // because the main `words` map already shows the Khitan glyph.


    wordEvidence: {
      water:  { evidence: 'inferred', source: 'Kane 2009 Latin reading "muri"; Khitan Small Script glyph for water not confidently attested in Kane (2009) Index of Graphs or West (BabelStone) — surface left as Latin transliteration.' },
      fire:   { evidence: 'inferred', source: 'Kane 2009 Latin reading "niár"; Khitan Small Script glyph for fire not confidently attested in Kane (2009) Index of Graphs or West (BabelStone) — surface left as Latin transliteration.' },
      sun:    { evidence: 'direct', source: 'Kane 2009 Index of Graphs #159 (glyph 𘲺 U+18CBA, glossed DAY); Khitan *nair = sun/day, cognate Mongolic nara. Per West 2011 (BabelStone Blog, "A Mirror on the Khitan Language") and BabelStone Kane2009List transcription.' },
      moon:   { evidence: 'direct', source: 'Kane 2009 Index of Graphs #081 (glyph 𘭧 U+18B67, glossed MONTH); Khitan *sair = moon/month, cognate Mongolic sara. Per West 2011 (BabelStone Blog, "A Mirror on the Khitan Language") and BabelStone Kane2009List transcription.' },
      mother: { evidence: 'inferred', source: 'Kane 2009 Latin reading "eme" (cf. Mongolic eme); Khitan Small Script glyph for mother not confidently attested — surface left as Latin transliteration.' },
      father: { evidence: 'inferred', source: 'Kane 2009 Latin reading "mai"; Khitan Small Script glyph for father not confidently attested — surface left as Latin transliteration.' },
      eat:    { evidence: 'inferred', source: 'Kane 2009 verbal stem; Khitan Small Script glyph for eat not confidently attested — surface left as Latin transliteration.' },
      drink:  { evidence: 'inferred', source: 'Kane 2009 verbal stem; Khitan Small Script glyph for drink not confidently attested — surface left as Latin transliteration.' },
      love:   { evidence: 'disputed', source: 'Kane 2009; semantic uncertain; no Khitan Small Script glyph mapping — surface left as Latin transliteration.' },
      heart:  { evidence: 'inferred', source: 'Kane 2009; Khitan Small Script glyph for heart not confidently attested — surface left as Latin transliteration.' },
      tree:   { evidence: 'inferred', source: 'Kane 2009 Latin reading "mau"; Khitan Small Script glyph for tree not confidently attested — surface left as Latin transliteration.' },
      house:  { evidence: 'inferred', source: 'Kane 2009 (cf. Mongolic ger); Khitan Small Script glyph for house not confidently attested — surface left as Latin transliteration.' },
      dog:    { evidence: 'direct', source: 'Khitan Small Script polygram 𘰕𘯛 (ńi.qo, U+18C15 U+18BDB) per West 2011 (BabelStone Blog, "A Mirror on the Khitan Language"). Latin reading "niaqan" follows Kane (2009).' },
      hand:   { evidence: 'inferred', source: 'Kane 2009 Latin reading "ɣar" (cf. Mongolic gar); Khitan Small Script glyph for hand not confidently attested — surface left as Latin transliteration.' },
      eye:    { evidence: 'inferred', source: 'Kane 2009 Latin reading "nït"; Khitan Small Script glyph for eye not confidently attested — surface left as Latin transliteration.' },
      one:    { evidence: 'direct', source: 'Kane 2009 Index of Graphs #026 (glyph 𘬣 U+18B23, glossed ONE) per BabelStone Kane2009List transcription. Latin reading "omsu" follows Kane (2009).' },
      good:   { evidence: 'disputed', source: 'Kane 2009; semantic boundary unclear; no Khitan Small Script glyph mapping — surface left as Latin transliteration.' },
    } },
  // Jurchen — Jin dynasty (1115-1234), ancestor of Manchu. Jurchen script is
  // not in Unicode; Latin transliteration after Kane (1989), Jin (1984).
  // juc Jurchen wordEvidence: per Codex review 4, all 18 cells are essentially
  // Manchu projection. Direct Jurchen attestation requires Kane 1989 Sino-Jurchen
  // vocabulary verification (not done online). All cells marked proxy from Manchu.
  juc: { name: 'Jurchen', native: 'jušen gisun', lat: 45.55, lng: 126.97,
    // altWordForms: 女真譯語 (Hua-Yi Yiyu, c. 1500 Ming-era Chinese-character
    // transliterations of Jurchen). Coverage is partial — only those entries
    // widely cited in standard secondary sources. The Jurchen script proper
    // is not yet in Unicode; these Chinese-character renderings are the
    // primary written record for most basic vocabulary.


    wordEvidence: {
      water:  { evidence: 'direct', source: '女真訳語 (1380s 四夷館編) 漢字音訳「沒可」 (mu-ke); + Manchu cognate muke' },
      fire:   { evidence: 'direct', source: '女真訳語 漢字音訳「脱瓦」 (to-wa); + Manchu cognate tuwa' },
      sun:    { evidence: 'direct', source: '女真訳語 漢字音訳「順」 (šun); + Manchu cognate šun' },
      moon:   { evidence: 'direct', source: '女真訳語 漢字音訳「必牙」 (bi-ya); + Manchu cognate biya' },
      mother: { evidence: 'direct', source: '女真訳語 漢字音訳「額墨」 (e-me); + Manchu cognate eme' },
      father: { evidence: 'direct', source: '女真訳語 漢字音訳「阿瑪」 (a-ma); + Manchu cognate ama' },
      eat:    { evidence: 'proxy', source: 'Manchu jefu (basic verb stem; Jurchen-script transcription not directly attested in 女真訳語 lexical sample)' },
      drink:  { evidence: 'proxy', source: 'Manchu omi' },
      love:   { evidence: 'proxy', source: 'Manchu gosi' },
      heart:  { evidence: 'proxy', source: 'Manchu niyaman' },
      tree:   { evidence: 'proxy', source: 'Manchu mo' },
      house:  { evidence: 'proxy', source: 'Manchu boo' },
      dog:    { evidence: 'proxy', source: 'Manchu indahūn' },
      cat:    { evidence: 'proxy', source: 'Manchu kesike' },
      hand:   { evidence: 'proxy', source: 'Manchu gala' },
      eye:    { evidence: 'proxy', source: 'Manchu yasa' },
      hello:  { evidence: 'disputed', note: 'no Jurchen greeting formula attested in 女真譯語 (1380s); Manchu equivalent saiyūn "are you well?" is not a reconstructed Jurchen ancestral form — surface "—" indicates lacuna in the Ming-era Hua-Yi Yiyu lexical sample' },
      thanks: { evidence: 'disputed', note: 'no Jurchen thanks formula attested in 女真譯語; Manchu baniha "thanks" is a later Sino-Manchu Qing-period formation (probably from Mongolian) — surface "—" indicates the absence in the Ming Jurchen corpus' },
      one:    { evidence: 'proxy', source: 'Manchu emu' },
      good:   { evidence: 'proxy', source: 'Manchu sain' },
    } },
  // Old Mon — Dvaravati / Pagan-era Mon (6-11c.). Mon script (Brahmic).
  // Reconstructions follow Shorto (1971) and Diffloth.
  omx: { name: 'Old Mon', native: 'ဘာသာ မန်', lat: 16.92, lng: 97.36, // Thaton
},
  // Pyu — ancient Burma (4-12c.), Sino-Tibetan. Pyu script (Brahmic-derived,
  // incompletely deciphered). Most words tentative; many entries marked '—'.
  // pyx Pyu wordEvidence: 13 cells filled. Per Codex 4: Myazedi (1113) inscription
  // is the key Pyu-decipherment source. Concrete nouns mostly direct via Myazedi/
  // Luce/Blagden. Some verbal/abstract cells inferred via Tibeto-Burman comparison.
  pyx: { name: 'Pyu', native: 'Pyu', lat: 18.81, lng: 95.21, // Sri Ksetra (Pyay)

    wordEvidence: {
      water:  { evidence: 'direct', source: 'Miyake 2024 / Luce / Myazedi inscription' },
      fire:   { evidence: 'direct', source: 'Miyake 2024 / Myazedi' },
      sun:    { evidence: 'direct', source: 'Miyake 2024 / Myazedi' },
      moon:   { evidence: 'direct', source: 'Miyake 2024' },
      mother: { evidence: 'direct', source: 'Miyake 2024 (basic kinship)' },
      father: { evidence: 'direct', source: 'Miyake 2024' },
      eat:    { evidence: 'inferred', source: 'Tibeto-Burman comparative' },
      tree:   { evidence: 'direct', source: 'Miyake 2024' },
      house:  { evidence: 'direct', source: 'Miyake 2024 / Myazedi' },
      dog:    { evidence: 'direct', source: 'Miyake 2024' },
      hand:   { evidence: 'direct', source: 'Miyake 2024' },
      eye:    { evidence: 'direct', source: 'Miyake 2024' },
      one:    { evidence: 'direct', source: 'Miyake 2024 numerals (Myazedi)' },
    } },
  // Old Burmese — Pagan period (11-16c.). Pagan-era Burmese script, ancestor
  // of modern Burmese script.
  obr: { name: 'Old Burmese', native: 'ပုဂံ ဘာသာ', lat: 21.17, lng: 94.86, // Bagan
},
  // Old Cham — Champa kingdom inscriptions (~4c. CE+). Cham script (Brahmic);
  // Latin transliteration used for portability. Mỹ Sơn sanctuary area.
  ocm: { name: 'Old Cham', native: 'aksara cam', lat: 15.76, lng: 108.12,
},

  // === Ancient Asian languages (Phase 13) ===
  // Old Chinese — Baxter-Sagart 2014 reconstructions. Anyang (Shang capital area).
  // Reconstruction convention (set 2026-08-26): every och cell is Baxter–Sagart
  // (2014) verbatim, with the leading * and with their brackets kept — [x] is an
  // uncertain segment, (x) an optional one, <x> an infix. The row used to mix
  // three systems: BS 2014, BS 2011 (dog *kʷʰˤinʔ for *[k]ʷʰˤ[e][n]ʔ, fish *ŋ(r)a
  // for *[r.ŋ]a) and Zhengzhang (five *ŋaːʔ, white *braːk, sleep *mids, cuckoo
  // *paːs kloːɡ — ː is a Zhengzhang marker BS never uses), and 21 of 49 cells had
  // no * at all. 父 was Zhengzhang *baʔ where BS glosses *[N-p](r)aʔ 'father',
  // and 謝 read *s.ɢAk-s, which is 夜 *[ɢ]Ak-s with an initial swapped in — BS has
  // *sə-lAk-s (glossed 'decline, renounce'; the 'thank' sense is post-Han).
  // 籌 *dru and 鮓 *tsˤraʔ are not in the BS 2014 list and keep their BS-style forms.
  och: { name: 'Old Chinese', native: '上古漢語', lat: 36.10, lng: 114.40,
    wordEvidence: {
      n99: { evidence: 'direct',
             source: "逸周書·世俘解 (ctext.org/lost-book-of-zhou/shi-fu): 武王遂征四方，凡憝國九十有九國 — 'ninety-nine states'. The same passage uses 有 as the connective throughout: 二十有一, 百一十有八, 三百五十有二, 三千五百有八, 七千七百七十有九",
             note: "有 here is not 'to have' but the linker 又; Wiktionary's 有 entry glosses exactly this use and marks the reading yòu, quoting 出師表 二十有{yòu}一年. The reconstruction is Baxter-Sagart 2014 (九 *[k]uʔ, 十 *t.[ɡ]əp, and for the connective the reading 又 *[ɢ]ʷəʔ-s rather than 有 *[ɢ]ʷəʔ — Wiktionary gives 又 Middle Chinese hjuwH against 有's hjuwX, and the -s is what yields that 去聲), matching this row's dominant notation - brackets for uncertain segments as in 夜 *[ɢ]Ak-s, tight-junction dots as in 舌 *mə.lat. The Michigan B-S site would not resolve from here, so the forms are cited rather than re-verified; they are consistent with the Zhengzhang forms Wiktionary does show for the same characters (有 *ɢʷɯʔ, 十 *ɡjub)" }
    },
},
  // Old Japanese (Asuka-Nara, 7-8c.) — Manyōshū / Kojiki period. Heijō-kyō (Nara).
  // Hiragana did not yet exist (developed from man'yōgana cursive in late
  // Heian, ~9-10c.); OJ orthography is man'yōgana (Chinese characters used
  // phonetically) and semantic kanji. Per user request 2026-05-06: replace
  // anachronistic hiragana suffixes (食ぶ・飲む・愛し・一つ・良し) with
  // man'yōgana attested in Man'yōshū / Kojiki / Nihon Shoki.
  ojp: { name: 'Old Japanese', native: '上代日本語', lat: 34.69, lng: 135.83,

    wordEvidence: {
      eat:   { evidence: 'direct', source: 'Man\'yōgana 多夫 (ta-bu) for OJ tabu "to eat" — attested in Man\'yōshū' },
      drink: { evidence: 'direct', source: 'Man\'yōgana 能牟 (nö-mu) for OJ nömu "to drink" — attested in Man\'yōshū phonetic spellings' },
      love:  { evidence: 'direct', source: 'Man\'yōgana 加奈志 (ka-na-si) for OJ kanasi "dear/poignantly loved" — attested in Man\'yōshū' },
      one:   { evidence: 'direct', source: 'Man\'yōgana 比登都 (pi-tö-tu) for OJ pïtötu "one" — attested in Kojiki/Man\'yōshū' },
      good:  { evidence: 'direct', source: 'Man\'yōgana 与之 (yö-si) for OJ yösi "good" — attested in Man\'yōshū' },
    }},
  // Proto-Japonic-Koreanic (PJK) — hypothesized common ancestor of
  // Japanese and Korean. Status disputed: Vovin (2010) rejects the
  // family connection; Whitman (2012) and Robbeets (2015) propose it
  // as part of Transeurasian/Macro-Altaic. Crucially, attested cognate
  // sets concentrate on cultural/farming vocabulary (rice, paddy,
  // millet, silkworm) — basic Swadesh-style words like water/fire/sun
  // do NOT show clear cognates between Japonic and Koreanic, which
  // is itself a major argument against the hypothesis. We therefore
  // leave most cells unattested ('—') and mark the few proposed
  // basic-vocabulary cognates with `disputed` evidence.
  p_jpk: { name: 'Proto-Japonic-Koreanic', native: 'Proto-Japonic-Koreanic', lat: 38.50, lng: 134.00, // Sea of Japan (symbolic — between hypothetical Korean Peninsula homeland and the Japanese archipelago)

    wordEvidence: {
      mother: { evidence: 'disputed', source: 'Whitman 2012 — childish *ma/əma; cross-linguistic baby-talk root, weak phylogenetic value' },
      father: { evidence: 'disputed', source: 'Whitman 2012 — childish *əpa; cf. OJ titi but Korean apa is also baby-talk; weak phylogenetic value' },
    } },
  // Vedic Sanskrit — Rigveda period (~1500-500 BCE). Sapta Sindhu (Punjab/Saraswati basin).
  h_vedic: { name: 'Vedic Sanskrit', native: 'वैदिक संस्कृतम्', lat: 30.50, lng: 75.00,
},
  // Tangut (Western Xia, 11-13c.) — Sofronov / Gong reconstructions; tones 1=level (˧), 2=rising (˧˥).
  // Tangut script chars are Unicode block U+17000-U+187FF; some readings are scholarly approximations.
  txg: { name: 'Tangut', native: '𗼇𗟲', lat: 38.50, lng: 106.27,
},
  // Sogdian — Silk Road lingua franca (5-9c.). Manichaean / Buddhist Sogdian. Samarkand.
  // Latin transliteration shown; native Sogdian script (Aramaic-derived) is U+10F30.
  sog: { name: 'Sogdian', native: 'sγwδyk', lat: 39.65, lng: 66.97,
},
  // Old Turkic — Orkhon inscriptions (8c.). Earliest Turkic written record.
  // Co-located with Middle Mongolian at Karakorum/Orkhon (47.20, 102.83);
  // the wordmap auto-stacks shared-coord labels.
  // Orthography in Old Turkic script (U+10C00-U+10C4F) where attested; Latin in IPA field.
  otk: { name: 'Old Turkic', native: '𐱅𐰇𐰼𐰰', lat: 47.20, lng: 102.83,
},

  // === Phase 14: Taiwan minority languages (Formosan + Taiwanese Hakka) ===
  // 7 Formosan languages (Austronesian, indigenous to Taiwan) + Taiwanese
  // Hakka (distinct from mainland Hakka). Forms reflect the most common
  // standard dialect of each: Amis = Central Amis (Hualien); Paiwan =
  // northern; Atayal = Squliq; Bunun = Isbukun; Truku = Truku/Seediq;
  // Tsou = Cou; Tao = Yami (Lanyu); Hakka = Sixian (Miaoli/Pingtung).
  ami: { name: 'Amis', native: 'Pangcah', lat: 23.96, lng: 121.60, // Hualien
},
  pwn: { name: 'Paiwan', native: 'Pinayuanan', lat: 22.30, lng: 120.62, // Pingtung

    // Audit Task 200/173: full per-cell wordEvidence for source-checked
    // Paiwan row. Sources: Ferrell, Raleigh (1982) Paiwan Dictionary
    // (Pacific Linguistics C-73, Australian National University); Egli,
    // Hans (1990) Paiwangrammatik (Wiesbaden: Harrassowitz); Council of
    // Indigenous Peoples (CIP, Taiwan) Indigenous Languages e-Dictionary
    // (https://e-dictionary.ilrdf.org.tw/pwn/) — official orthography
    // adopted 2005, used in CIP textbooks and language proficiency tests.
    // Paiwan is one of the most divergent Austronesian languages and is
    // central to the "Out of Taiwan" Austronesian dispersal hypothesis.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Ferrell (1982) Paiwan Dictionary — zaljum "water"; PAn *daNum reflex with regular *N > lj', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'Ferrell (1982) — sapuy "fire"; PAn *Sapuy reflex (cf. Tagalog apoy, Malay api)', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Ferrell (1982) — qadaw "sun, day"; basic noun', formType: 'free-word', note: 'covers both sun and day per general Austronesian polysemy' },
      moon:   { evidence: 'direct', source: 'Ferrell (1982) — qiljas "moon, month"; PAn *bulaN reflex (irregular)', formType: 'free-word' },
      mother: { evidence: 'direct', source: 'Ferrell (1982) — kina "mother"; basic kinship', formType: 'free-word' },
      father: { evidence: 'direct', source: 'Ferrell (1982) — kama "father"; basic kinship (cf. Amis ama, Tagalog ama)', formType: 'free-word' },
      eat:    { evidence: 'direct', source: 'Egli (1990) Paiwangrammatik — keman "eat" (root kan- + Actor Voice infix -em-); citation form', formType: 'inflected-form', note: 'Paiwan verbs cited in Actor Voice (AV) form; bare root kan- requires voice morphology' },
      drink:  { evidence: 'direct', source: 'Egli (1990) — temekel "drink" (root tekel- + AV infix -em-); citation form', formType: 'inflected-form' },
      love:   { evidence: 'direct', source: 'Ferrell (1982) — nasaqaqa "love, beloved"; reduplicated form', formType: 'free-word' },
      heart:  { evidence: 'direct', source: 'Ferrell (1982) — varung "heart, mind, feelings"; covers anatomical and emotional senses', formType: 'free-word' },
      tree:   { evidence: 'direct', source: 'Ferrell (1982) — kasiw "tree, wood"; PAn *kahiw reflex', formType: 'free-word' },
      house:  { evidence: 'direct', source: 'Ferrell (1982) — umaq "house"; PAn *Rumaq reflex (cf. Malay rumah, Tagalog bahay < *balay)', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Ferrell (1982) — vatu "dog"; PAn *asu reflex (irregular initial)', formType: 'free-word' },
      cat:    { evidence: 'direct', source: 'CIP Indigenous Languages Dictionary — ngiaw "cat"; onomatopoeic, post-contact', formType: 'free-word' },
      hand:   { evidence: 'direct', source: 'Ferrell (1982) — lima "hand, five"; PAn *lima', formType: 'free-word', note: 'PAn polysemy: same root for "hand" and "five" (counted on one hand)' },
      eye:    { evidence: 'direct', source: 'Ferrell (1982) — maca "eye"; PAn *maCa reflex', formType: 'free-word' },
      hello:  { evidence: 'direct', source: 'CIP Indigenous Languages Dictionary — masalu "thank you, hello"; canonical Paiwan multipurpose greeting/thanks form', formType: 'greeting-formula', note: 'lexical overlap with thanks: masalu serves as both greeting and thanks (Formosan polysemy pattern)' },
      thanks: { evidence: 'direct', source: 'CIP Indigenous Languages Dictionary — masalu "thank you, hello"; same multipurpose form', formType: 'thanks-formula', note: 'lexical overlap with hello: masalu serves as both greeting and thanks (Formosan polysemy pattern)' },
      one:    { evidence: 'direct', source: 'Ferrell (1982) — ita "one"; basic numeral (cf. PAn *esa)', formType: 'free-word' },
      good:   { evidence: 'direct', source: 'Ferrell (1982) — nguanguaq "good"; reduplicated adjective form', formType: 'free-word' },
    } },
  tay: { name: 'Atayal', native: 'Tayal', lat: 24.86, lng: 121.55, // Wulai
},
  bnn: { name: 'Bunun', native: 'Bunun', lat: 23.83, lng: 121.05, // Nantou/Bunun area

    // Audit Task 200/173: full per-cell wordEvidence for source-checked
    // Bunun row. Sources: Nojima, Motoyasu (1996) Bunun Lexicon (Tokyo
    // University of Foreign Studies); Li, Paul Jen-kuei (1988) "A
    // Comparative Study of Bunun Dialects" (BIHP 59); Council of
    // Indigenous Peoples (CIP, Taiwan) Indigenous Languages e-Dictionary
    // (https://e-dictionary.ilrdf.org.tw/bnn/) — official Bunun
    // orthography. Bunun is highly conservative and central to PAn
    // reconstruction; it preserves several PAn distinctions lost in most
    // other Formosan and Malayo-Polynesian languages.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Nojima (1996) Bunun Lexicon — danum "water"; PAn *daNum reflex with regular *N > n', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'Nojima (1996) — sapuz "fire"; PAn *Sapuy reflex (final -z reflects fortition)', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Li (1988) Bunun Dialects — vali "sun, day"; cf. PAn *waRi (Tagalog araw, Malay hari)', formType: 'free-word', note: 'covers both sun and day per Austronesian polysemy' },
      moon:   { evidence: 'direct', source: 'Nojima (1996) — buan "moon"; PAn *bulaN reflex with regular *N-loss', formType: 'free-word' },
      mother: { evidence: 'direct', source: 'Nojima (1996) — tina "mother"; PAn *t-ina', formType: 'free-word' },
      father: { evidence: 'direct', source: 'Nojima (1996) — tama "father"; PAn *t-ama', formType: 'free-word' },
      eat:    { evidence: 'direct', source: 'Nojima (1996) — maun "eat"; AV form (cf. root kaun-)', formType: 'inflected-form' },
      drink:  { evidence: 'direct', source: 'Nojima (1996) — muqun "drink"; AV form (cf. root ququn-)', formType: 'inflected-form' },
      love:   { evidence: 'direct', source: 'Nojima (1996) — madaidaz "to love, treasure"; ma- stative + reduplicated daidaz "treasure"', formType: 'free-word' },
      heart:  { evidence: 'direct', source: 'Nojima (1996) — is-ang "heart, mind, feelings"; covers anatomical and emotional senses', formType: 'free-word' },
      tree:   { evidence: 'direct', source: 'Nojima (1996) — kahu "tree"; cf. PAn *kahiw "tree, wood"', formType: 'free-word' },
      house:  { evidence: 'direct', source: 'Nojima (1996) — lumaq "house"; PAn *Rumaq reflex with *R > l', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Nojima (1996) — asu "dog"; PAn *asu retained directly', formType: 'free-word', note: 'Bunun preserves PAn *asu unchanged — one of the most conservative reflexes in Austronesian' },
      cat:    { evidence: 'direct', source: 'CIP Indigenous Languages Dictionary — ngingiyaw "cat"; reduplicated onomatopoeic form, post-contact', formType: 'free-word' },
      hand:   { evidence: 'direct', source: 'Nojima (1996) — ima "hand"; cf. PAn *lima (Bunun loses initial l-)', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'Nojima (1996) — mata "eye"; PAn *maCa reflex', formType: 'free-word' },
      hello:  { evidence: 'direct', source: 'CIP Indigenous Languages Dictionary — uninang "thank you, hello"; canonical Bunun multipurpose form', formType: 'greeting-formula', note: 'lexical overlap with thanks: uninang serves as both greeting and thanks (Formosan polysemy pattern)' },
      thanks: { evidence: 'direct', source: 'CIP Indigenous Languages Dictionary — uninang "thank you, hello"; same multipurpose form', formType: 'thanks-formula', note: 'lexical overlap with hello: uninang serves as both greeting and thanks (Formosan polysemy pattern)' },
      one:    { evidence: 'direct', source: 'Nojima (1996) — tasa "one"; basic numeral (Bunun has unusual numeral system without simple PAn reflexes)', formType: 'free-word' },
      good:   { evidence: 'direct', source: 'Nojima (1996) — masial "good"; ma- stative prefix on root sial', formType: 'free-word' },
    } },
  trv: { name: 'Truku (Seediq)', native: 'Seediq Truku', lat: 24.16, lng: 121.62, // Hualien (Taroko)

    // Audit Task 200/173: full per-cell wordEvidence for source-checked
    // Truku (Seediq) row. Sources: Sakuma, Pei-Ling (2004) Seediq
    // (Truku) — A Sketch Grammar (Univ. of Hawai\'i Press); Pecoraro,
    // Ferdinando (1977) Essai de dictionnaire Seediq-Français du Taroko
    // (École des Hautes Études en Sciences Sociales); Holmer, Arthur
    // (1996) A Parametric Grammar of Seediq (Lund Univ. Press); Council
    // of Indigenous Peoples (CIP, Taiwan) Indigenous Languages
    // e-Dictionary (https://e-dictionary.ilrdf.org.tw/trv/). Truku is one
    // of three Seediq dialects (Truku, Tgdaya, Toda) recognized by the
    // Taiwan Council of Indigenous Peoples since 2008.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Pecoraro (1977) Seediq-Français — qsiya "water"; uvular q + voiceless s', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'Pecoraro (1977) — puniq "fire"; basic noun', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Sakuma (2004) Seediq Sketch Grammar — hidaw "sun"; basic noun', formType: 'free-word' },
      moon:   { evidence: 'direct', source: 'Sakuma (2004) — idas "moon"; basic noun', formType: 'free-word' },
      mother: { evidence: 'direct', source: 'Pecoraro (1977) — bubu "mother"; basic kinship', formType: 'free-word' },
      father: { evidence: 'direct', source: 'Pecoraro (1977) — tama "father"; PAn *t-ama (shared with most Formosan)', formType: 'free-word' },
      eat:    { evidence: 'direct', source: 'Holmer (1996) Parametric Grammar of Seediq — meekan "to eat" (AV form of root kan-)', formType: 'inflected-form' },
      drink:  { evidence: 'direct', source: 'Holmer (1996) — mimah "to drink" (AV form of root mah-)', formType: 'inflected-form' },
      love:   { evidence: 'direct', source: 'Sakuma (2004) — gmalu "to love, pity, care for"; AV form g- prefix', formType: 'inflected-form' },
      heart:  { evidence: 'direct', source: 'Pecoraro (1977) — lnglungan "heart, mind, thoughts"; nominalized form covering emotional/cognitive senses', formType: 'free-word' },
      tree:   { evidence: 'direct', source: 'Pecoraro (1977) — qhuni "tree"; cf. PAn *kahiw with *k > qh', formType: 'free-word' },
      house:  { evidence: 'direct', source: 'Sakuma (2004) — sapah "house"; basic noun', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Pecoraro (1977) — huling "dog"; PAn *asu (Truku replaces inherited form)', formType: 'free-word' },
      cat:    { evidence: 'direct', source: 'CIP Indigenous Languages Dictionary — ngiyaw "cat"; onomatopoeic, post-contact', formType: 'free-word' },
      hand:   { evidence: 'direct', source: 'Pecoraro (1977) — baga "hand"; cf. PAn *baRa "shoulder/arm" with semantic shift', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'Pecoraro (1977) — dowriq "eye"; basic noun', formType: 'free-word' },
      hello:  { evidence: 'direct', source: 'CIP Indigenous Languages Dictionary — malu "good, well; greeting"; canonical Truku greeting use of "good"', formType: 'greeting-formula', note: 'lexical overlap with good: malu = "good/well" used as greeting (Formosan greeting-as-affirmation pattern)' },
      thanks: { evidence: 'direct', source: 'CIP Indigenous Languages Dictionary — mhuway "thanks, gratitude"; AV form of huway-', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: 'Sakuma (2004) — kingal "one"; basic numeral', formType: 'free-word' },
      good:   { evidence: 'direct', source: 'Pecoraro (1977) — malu "good, well"; primary adjectival meaning', formType: 'free-word', note: 'lexical overlap with hello: malu primary meaning "good" extends to greeting use' },
    } },
  tsu: { name: 'Tsou', native: 'Cou', lat: 23.51, lng: 120.80, // Alishan
},
  tao: { name: 'Tao (Yami)', native: 'Tao', lat: 22.04, lng: 121.55, // Orchid Island (Lanyu)
},
  // Puyuma (Pinuyumayan) — Austronesian Formosan (one of the 9 primary Austronesian branches; Puyuma is one of the most divergent), ~3K, Taiwan (East Coast — Taitung County, Beinan Township).
  // Sources: Ethnologue 27 'pyu'; Glottolog puyu1239; Cauquelin (2004) The Aborigines of Taiwan: The Puyuma.
  pyu: { name: 'Puyuma', native: 'Pinuyumayan', lat: 22.78, lng: 121.13, // Taitung, East Taiwan
},
  // Sakizaya — Austronesian Formosan (recognized as Taiwan\\'s 13th aboriginal nation 2007; previously classified within Amis ami), ~600 fluent + ~3K partial, Taiwan (East Coast — Hualien).
  // Sources: Ethnologue 27 'szy'; Glottolog saki1259; Aboriginal Languages of Taiwan Council Report.
  szy: { name: 'Sakizaya', native: 'Sakizaya', lat: 23.97, lng: 121.61, // Hualien, East Taiwan
},
  // Thao (Sao) — Austronesian Formosan (one of the smallest Formosan languages; classified as Western Plains Formosan), ~5 fluent + ~600 ethnic Thao, Taiwan (Sun Moon Lake — Yuchi Township, Nantou County).
  // Sources: Ethnologue 27 'ssf'; Glottolog thao1240; Blust (2003) Thao Dictionary.
  ssf: { name: 'Thao', native: 'Thaw a tnaw', lat: 23.85, lng: 120.92, // Sun Moon Lake (Lake Candidius), Nantou
},
  hak_tw: { name: 'Taiwanese Hakka (Sixian)', native: '台灣客家話 (四縣腔)', lat: 24.55, lng: 120.93, // Miaoli (Sixian heartland)
},

  // === Phase 15: more Chinese dialects ===
  // 8 additions covering major gaps: Suzhou & Wenzhou Wu, Quanzhou Hokkien
  // & Hainanese (Min Nan branches), Wuhan & Zhengzhou Mandarin (SW + Zhongyuan
  // groups), Hailu Taiwanese Hakka, and Pu-Xian Min. Tones use Chao numbers
  // converted to Chao tone letters where standard; some sources differ on
  // narrow tone values for these underdocumented varieties.
  wuu_sz: { name: 'Wu (Suzhou)', native: '苏州话', lat: 31.30, lng: 120.59, // Suzhou
},
  wuu_wz: { name: 'Wu (Wenzhou)', native: '温州话', lat: 27.99, lng: 120.66, // Wenzhou
},
  nan_qz: { name: 'Min Nan (Quanzhou)', native: '泉州話', lat: 24.87, lng: 118.68, // Quanzhou
},
  nan_hai: { name: 'Hainanese', native: '海南话', lat: 20.04, lng: 110.32, // Haikou
},
  zh_wh: { name: 'Mandarin (Wuhan)', native: '武汉话', lat: 30.59, lng: 114.30, // Wuhan
},
  zh_zz: { name: 'Mandarin (Zhongyuan)', native: '郑州话', lat: 34.75, lng: 113.62, // Zhengzhou
},
  hak_hl: { name: 'Taiwanese Hakka (Hailu)', native: '台灣客家話 (海陸腔)', lat: 24.81, lng: 120.97, // Hsinchu (Hailu heartland)
},
  cpx: { name: 'Pu-Xian Min (Hinghwa)', native: '莆仙话', lat: 25.43, lng: 119.00, // Putian
},

  // === Phase 16: SE Asian high-population minority languages ===
  // 8 additions covering significant gaps: Patani Malay (S. Thailand), Mường
  // (sister of Vietnamese), Tày (Tai-Kadai of N. Vietnam), Pwo Karen (Karen
  // branch distinct from Sgaw), Jingpo/Kachin (Myanmar), Wa (Burma-Yunnan
  // Palaungic), Akha (Loloish, Yunnan/Myanmar/Thailand), Kadazan-Dusun (Sabah).
  // Word data and IPA reflect commonly cited forms in standard reference
  // works; tone marking is approximate for the lesser-documented varieties.
  mfa: { name: 'Patani Malay', native: 'Bahasa Melayu Patani', lat: 6.87, lng: 101.25, // Pattani
},
  mtq: { name: 'Mường', native: 'Tiếng Mường', lat: 20.81, lng: 105.34, // Hòa Bình
},
  tyz: { name: 'Tày', native: 'Cần Tày', lat: 22.66, lng: 106.25, // Cao Bằng
},
  kjp: { name: 'Pwo Karen', native: 'ဖျိၣ်', lat: 16.71, lng: 98.57, // Mae Sot area (Pwo communities)
},
  kac: { name: 'Jingpo (Kachin)', native: 'Jinghpaw', lat: 25.38, lng: 97.40, // Myitkyina
},
  wbm: { name: 'Wa', native: 'Vāx', lat: 22.07, lng: 99.21, // Pangsang/Wa State
},
  // Shwe Palaung (Ta-ang) — Mon-Khmer (Palaungic, Palaung — sister to Wa wbm, Eastern Lawa lwl within Palaungic; distinct from Wa cluster), ~560K, Myanmar (northern Shan State — Namhsan/Ta-ang region) + China (Yunnan — Dehong, small populations) + Thailand (border refugee communities).
  // Sources: Ethnologue 27 'pll'; Glottolog shwe1235; Milne (1921) Elementary Palaung Grammar; Janzen (1976) Shwe Palaung phonology.
  pll: { name: 'Shwe Palaung', native: 'Ta-ang', lat: 23.07, lng: 97.40, // Namhsan, northern Shan State, Myanmar
},
  ahk: { name: 'Akha', native: 'Akhazà', lat: 20.50, lng: 100.07, // Chiang Rai area
},
  dtp: { name: 'Kadazan-Dusun', native: 'Boros Dusun', lat: 5.96, lng: 116.07, // Penampang
},

  // === Phase 17: 12 more 100K+ minority languages ===
  // Spread across India (Chhattisgarhi, Garo), SE Asia (Mon, Nùng, Ngaju,
  // Toraja-Sa'dan), Mesoamerica (K'iche', Q'eqchi', Mam — three of the
  // largest Mayan languages), Ethiopia (Wolaytta, Sidama), and China
  // (Tujia). All have 500K+ speakers; several are major regional lingua
  // francas without prior coverage in the map.
  hne: { name: 'Chhattisgarhi', native: 'छत्तीसगढ़ी', lat: 21.25, lng: 81.63, // Raipur
},
  mnw: { name: 'Mon', native: 'ဘာသာ မန်', lat: 16.49, lng: 97.62, // Mawlamyine
},
  // Eastern Bru — Austroasiatic Mon-Khmer Katuic (sister to Western Bru and Khua within the Bru-So sub-branch; Katuic is a major branch of Mon-Khmer alongside Mon, Khmer, and Vietic), ~135K, Vietnam (Quảng Trị, Quảng Bình provinces — Trường Sơn highlands; ~55K Vietnamese Bru) + Laos (Savannakhet, Khammouane provinces — Phin, Sepon districts; ~75K Lao Bru) + Thailand (small populations along Mukdahan border).
  // Sources: Ethnologue 27 'bru'; Glottolog east2563; Miller & Miller (1996) The Eastern Bru of Vietnam.
  bru: { name: 'Eastern Bru', native: 'Bruu', lat: 16.55, lng: 105.78, // Sepon (Tchepone), Savannakhet, Laos (Lao Bru heartland)
},
  // Bahnar — Austroasiatic Mon-Khmer Bahnaric (sister to Sedang, Hre, Halang within the North Bahnaric branch; Bahnaric is one of the major branches of Mon-Khmer alongside Mon, Khmer, Vietic, and Katuic; Bahnar is the historically most-prestigious Bahnaric language and was the first to receive a Latin orthography in the 1860s), ~250K, Vietnam (Central Highlands — Gia Lai, Kon Tum provinces — Pleiku, An Khê area; small populations in Bình Định and Phú Yên coastal provinces); Cambodia (Mondulkiri small populations).
  // Sources: Ethnologue 27 'bdq'; Glottolog bahn1262; Banker (1979) Bahnar Phonology; Côté Sang Bana Manh (1988) Tự điển Bahnar-Việt-Anh.
  bdq: { name: 'Bahnar', native: "Bahnar", lat: 13.98, lng: 108.00, // Pleiku, Gia Lai, Vietnam (Bahnar heartland)
},
  // Eastern Lawa (Lavüa Lavüa) — Mon-Khmer (Palaungic, Eastern — sister to Western Lawa within Lawa cluster), ~17K, Thailand (Mae Hong Son, Chiang Mai — northern hilltribe).
  // Sources: Ethnologue 27 'lwl'; Glottolog east2333; Mitani (1972) Eastern Lawa Phonology.
  lwl: { name: 'Eastern Lawa', native: 'Lavüa', lat: 18.30, lng: 98.05, // Bo Luang, Chiang Mai Province
},
  grt: { name: 'Garo', native: 'A·chik', lat: 25.51, lng: 90.21, // Tura, Meghalaya
},
  nut: { name: 'Nùng', native: 'Cần Nùng', lat: 21.85, lng: 106.76, // Lạng Sơn
},
  quc: { name: 'Kʼicheʼ', native: 'Qatzijobʼal', lat: 14.84, lng: -91.52, // Quetzaltenango
},
  // Kaqchikel — Mayan K'ichean, ~400K speakers, central Guatemalan highlands. Sister to Kʼicheʼ (quc).
  // Sources: Ethnologue 27 'cak'; Glottolog kaqc1271; Brown et al. (2006) Kaqchikel-English Dictionary.
  cak: { name: 'Kaqchikel', native: 'Kaqchikel', lat: 14.74, lng: -90.64, // Patzún (Kaqchikel cultural center)
},
  kek: { name: 'Qʼeqchiʼ', native: 'Qʼeqchiʼ', lat: 15.47, lng: -90.37, // Cobán
},
  // Poqomchi' — Mayan (Quichean-Mamean, Pocomam — sister to Pocomchi'-East and Pocomam other varieties), ~50K, Guatemala (Alta Verapaz, Baja Verapaz).
  // Sources: Ethnologue 27 'poh'; Glottolog poco1241; Brown (1979) Pocomchi grammar.
  poh: { name: "Poqomchi'", native: "Poqomchi'", lat: 15.36, lng: -90.32, // Tactic, Alta Verapaz, Guatemala
},
  // Q'anjob'al — Mayan (Q'anjob'alan-Chujean, sister to Akatec, Jakaltek, Chuj), ~80K, Guatemala (Huehuetenango — Santa Eulalia, Soloma).
  // Sources: Ethnologue 27 'kjb'; Glottolog east2557; Mateo-Toledo (2008) The Family of Complement Constructions in Q'anjob'al.
  kjb: { name: "Q'anjob'al", native: "Q'anjob'al", lat: 15.83, lng: -91.30, // Santa Eulalia, Huehuetenango, Guatemala
},
  // Chol (Ch'ol) — Mayan (Cholan-Tzeltalan, Cholan — sister to Chontal Maya chf and Tzeltal/Tzotzil), ~250K, Mexico (Chiapas — Tila, Tumbalá, Sabanilla).
  // Sources: Ethnologue 27 'ctu'; Glottolog chol1282; Warkentin & Scott (1980) Gramática Ch'ol.
  ctu: { name: "Chol", native: "Lakty'añ", lat: 17.30, lng: -92.42, // Tila, Chiapas, Mexico
},
  // Tojolabal — Mayan (Q'anjob'alan-Chujean, Chujean — sister to Chuj cac within the Chujean sub-branch; closer to Chuj than to Q'anjob'al kjb), ~70K, Mexico (Chiapas — Las Margaritas, Comitán, Altamirano municipalities; some Guatemala border populations).
  // Sources: Ethnologue 27 'toj'; Glottolog tojo1241; Furbee-Losee (1976) The Correct Language: Tojolabal.
  toj: { name: 'Tojolabal', native: "Tojol-ab'al", lat: 16.31, lng: -91.98, // Las Margaritas, Chiapas, Mexico
},
  // Bribri — Chibchan Talamanca (sister to Cabécar cjp within the Talamanca sub-branch), ~7K, Costa Rica (Talamanca canton, Limón Province + Buenos Aires canton, Puntarenas; small Panama border populations).
  // Sources: Ethnologue 27 'bzd'; Glottolog brib1243; Constenla Umaña (1998) Gramática de la lengua guatuso (comparative Chibchan reference).
  bzd: { name: 'Bribri', native: "I-ñe' yiwö", lat: 9.53, lng: -82.94, // Suretka, Talamanca, Costa Rica
},
  // San Blas Kuna (Guna) — Chibchan Kuna (sister to Border Kuna of Colombia/Panama border; the only living Kuna language; not closely related to other Chibchan languages — most distant Chibchan branch), ~60K, Panama (Guna Yala / San Blas Comarca — 49 inhabited islands and adjacent mainland; small Colombia border populations) + USA diaspora (mostly Florida).
  // Sources: Ethnologue 27 'cuk'; Glottolog sanb1242; Holmer (1947) Critical and Comparative Grammar of the Cuna Language.
  cuk: { name: 'San Blas Kuna', native: 'Tule', lat: 9.34, lng: -78.74, // El Porvenir / Gardi Sugdup, Guna Yala, Panama
},
  // Tabasco Chontal (Yokot'an) — Mayan (Cholan-Tzeltalan, Cholan — sister to Chol ctu within the Cholan branch), ~36K, Mexico (Tabasco — Nacajuca, Centla, Centro, Macuspana municipalities; lowland Gulf coast).
  // Sources: Ethnologue 27 'chf'; Glottolog tabz1238; Knowles (1984) A descriptive grammar of Chontal Maya.
  chf: { name: "Tabasco Chontal", native: "Yokot'an", lat: 18.17, lng: -93.02, // Nacajuca, Tabasco, Mexico
},
  // Aguacateco (Awakateko) — Mayan (Quichean-Mamean, Mam-Awakateko branch — sister to Mam mam and Ixil ixl), ~17K, Guatemala (Huehuetenango — Aguacatán).
  // Sources: Ethnologue 27 'agu'; Glottolog awak1244; McArthur & McArthur (1956) Aguacatec phonology.
  agu: { name: "Aguacateco", native: "Awakateko", lat: 15.34, lng: -91.32, // Aguacatán, Huehuetenango, Guatemala
},
  // Ixil — Mayan Mamean, ~70K speakers, Cuchumatanes mountains (Guatemala). Survivors of 1980s genocide.
  // Sources: Ethnologue 27 'ixl'; Glottolog ixil1251; Ayres (1991) Ixil Verb Morphology.
  ixl: { name: 'Ixil', native: "Ixil", lat: 15.40, lng: -91.06, // Nebaj, Quiché
},
  mam: { name: 'Mam', native: 'Qyool Mam', lat: 15.32, lng: -91.47, // Huehuetenango
},
  // Central Mam — Mayan (Quichean-Mamean, Mamean — sister variety to Mam mam macrolanguage; spoken in central Huehuetenango department), ~520K, Guatemala (Huehuetenango — Todos Santos Cuchumatán, San Juan Atitán, Concepción Huista, Santiago Chimaltenango).
  // Sources: Ethnologue 27 'mvc'; Glottolog cent2152; England (1983) A Grammar of Mam, a Mayan Language.
  wal: { name: 'Wolaytta', native: 'Wolayttattuwaa', lat: 6.85, lng: 37.76, // Wolaita Sodo
},
  sid: { name: 'Sidamo', native: 'Sidaamu Afoo', lat: 7.06, lng: 38.48, // Hawassa
},
  tji: { name: 'Tujia', native: 'Bizisa', lat: 29.31, lng: 109.49, // Zhangjiajie/Enshi

    // Audit Task 200/173: full per-cell wordEvidence for source-checked
    // Northern Tujia row. Sources: Brassett, Cecilia & Brassett, Philip K.
    // (2005) "The Tujia Language" (LINCOM Studies in Asian Linguistics 56);
    // Tian Desheng, He Tianzhen, Chen Kang, Li Jingzhong, Xie Zhimin (1986)
    // Tujiayu Jianzhi 土家语简志 (Beijing: Minzu Chubanshe); Brassett & Lu
    // (2006) Tujia-English Dictionary; Pulleyblank (1991) Lexicon of
    // Reconstructed Pronunciation. Citation forms reflect Northern Tujia
    // (Longshan/Yongshun, Hunan), the larger of two divergent branches.
    wordEvidence: {
      water:  { evidence: 'direct', source: 'Tian et al. (1986) Tujiayu Jianzhi — zi/t͡sɨ˥˧ "water"; falling tone', formType: 'free-word' },
      fire:   { evidence: 'direct', source: 'Tian et al. (1986) — mi/mi˥˧ "fire"; falling tone; Tibeto-Burman *mey', formType: 'free-word' },
      sun:    { evidence: 'direct', source: 'Brassett & Brassett (2005) Tujia Language — ni/ni˧˥ "sun, day"; rising tone', formType: 'free-word', note: 'covers both sun and day per Tibeto-Burman polysemy' },
      moon:   { evidence: 'direct', source: 'Brassett & Brassett (2005) — nie/nie˧˥ "moon"; rising tone', formType: 'free-word' },
      mother: { evidence: 'direct', source: 'Tian et al. (1986) — a-mie/a˧mie˧ "mother"; a- kinship prefix + mie root', formType: 'compound' },
      father: { evidence: 'direct', source: 'Tian et al. (1986) — a-pa/a˧pa˧ "father"; a- kinship prefix + pa root', formType: 'compound' },
      eat:    { evidence: 'direct', source: 'Brassett & Brassett (2005) — za/t͡sa˨˩ "eat"; low tone; Tibeto-Burman *dza', formType: 'free-word' },
      drink:  { evidence: 'direct', source: 'Brassett & Brassett (2005) — da/ta˧ "drink"; mid tone', formType: 'free-word' },
      love:   { evidence: 'direct', source: 'Brassett & Brassett (2005) — aci/a˧˥t͡si˥ "love, like"; rising + high tones', formType: 'free-word' },
      heart:  { evidence: 'direct', source: 'Tian et al. (1986) — xin/ɕin˧ "heart"; mid tone; Chinese loan (xīn 心) widespread in Tujia', formType: 'free-word', note: 'Mandarin xīn loan replacing native form; characteristic of contact-influenced Tujia vocabulary' },
      tree:   { evidence: 'direct', source: 'Brassett & Brassett (2005) — si/sɨ˧˥ "tree"; rising tone', formType: 'free-word' },
      house:  { evidence: 'direct', source: 'Tian et al. (1986) — li/li˧˥ "house"; rising tone', formType: 'free-word' },
      dog:    { evidence: 'direct', source: 'Brassett & Brassett (2005) — kvʼ/kʰə˨˩ "dog"; aspirated kʰ + low tone; Tibeto-Burman *kwəy', formType: 'free-word' },
      cat:    { evidence: 'direct', source: 'Tian et al. (1986) — mau/mau˧ "cat"; mid tone; onomatopoeic (cf. Mandarin māo)', formType: 'free-word' },
      hand:   { evidence: 'direct', source: 'Brassett & Brassett (2005) — lo/lo˨˩ "hand"; low tone', formType: 'free-word' },
      eye:    { evidence: 'direct', source: 'Brassett & Brassett (2005) — mie/mie˨˩ "eye"; low tone; Tibeto-Burman *myik', formType: 'free-word' },
      hello:  { evidence: 'direct', source: 'Brassett & Brassett (2005) — shu shu "hello"; reduplicated greeting form, mid tones', formType: 'greeting-formula', autoTag: 'task-194-multi-word' },
      thanks: { evidence: 'direct', source: 'Brassett & Brassett (2005) — angzai/aŋ˧˥t͡sai˥ "thanks"; rising + high tones', formType: 'thanks-formula' },
      one:    { evidence: 'direct', source: 'Tian et al. (1986) — lao/lao˧˥ "one"; rising tone (Northern Tujia numeral)', formType: 'free-word' },
      good:   { evidence: 'direct', source: 'Brassett & Brassett (2005) — ngaq/ŋaʔ˧˥ "good"; rising tone with final glottal stop', formType: 'free-word' },
    }},
  nij: { name: 'Ngaju', native: 'Basa Ngaju', lat: -2.21, lng: 113.92, // Palangka Raya
},
  sda: { name: "Toraja-Sa'dan", native: "Basa Toraya", lat: -2.97, lng: 119.90, // Rantepao
},

  // === Pass 35: 10-language batch additions (5 modern endangered + 5 historical) ===

  // Ladin (Dolomite Romance, ~30K speakers in 5 valleys; co-official in Italy's
  // South Tyrol and Trentino provinces). Sister to Romansh and Friulian within
  // the Rhaeto-Romance group.
  lld: { name: 'Ladin', native: 'Lingaz Ladin', lat: 46.57, lng: 11.67, // Ortisei / Urtijëi (Val Gardena)
},

  // Saterland Frisian (East Frisian, ~2K speakers in 4 villages of Saterland,
  // Lower Saxony). The only living East Frisian variety; West Frisian (fy) is
  // separate, North Frisian also separate.
  stq: { name: 'Saterland Frisian', native: 'Seeltersk', lat: 53.05, lng: 7.65, // Ramsloh / Saterland
},

  // Wymysorys (Vilamovian) — endangered Germanic island in Wilamowice, southern
  // Poland. ~50 speakers, mostly elderly; revitalisation efforts ongoing.
  // Distinct from neighbouring Polish; resembles Bavarian-Austrian dialects.
  wym: { name: 'Wymysorys', native: 'Wymysiöeryś', lat: 49.92, lng: 19.15, // Wilamowice
},

  // Yuchi (Euchee) — language isolate of the southeastern US (Oklahoma after
  // Trail of Tears). Critically endangered, fewer than 5 fluent first-language
  // speakers. Project documented by Mary Linn (Yuchi grammatical sketch, 2001)
  // and earlier by Wagner (1934).
  yuc: { name: 'Yuchi', native: 'Tsoyaha', lat: 35.99, lng: -96.10, // Sapulpa, Oklahoma
},

  // Kusunda — language isolate of mid-western Nepal. ~3 partial speakers; the
  // last fluent speaker died in 2024. Documented in Watters (2006) "Notes on
  // Kusunda grammar". Lexical set extracted from Watters' field notes.
  kgg: { name: 'Kusunda', native: 'Mihaq', lat: 28.0, lng: 82.5, // mid-western Nepal (Dang district approx.)
},

  // Ottoman Turkish — Turkic Oghuz literary register used 1300-1928, written
  // in a modified Arabic script (Ottoman alphabet). Distinct from modern
  // Turkish (tr) by extensive Arabic and Persian vocabulary and orthography.
  ota: { name: 'Ottoman Turkish', native: 'لسان عثمانی', lat: 41.01, lng: 28.97, // Istanbul
},

  // Classical Mongolian — Mongolic literary register written in vertical
  // Mongolian script, used 17-20c. Distinct from xng (Middle Mongol, 13-15c)
  // and modern Khalkha (mn). Lessing (1960) "Mongolian-English Dictionary"
  // is the principal reference.
  cmg: { name: 'Classical Mongolian', native: 'ᠮᠣᠩᠭᠣᠯ ᠬᠡᠯᠡ', lat: 40.84, lng: 111.75, // Hohhot (Inner Mongolia, surviving classical-script tradition)
},

  // Etruscan — language isolate of pre-Roman northern Italy (~700 BCE-1c CE),
  // attested in ~13,000 inscriptions but partly understood. Most basic-vocab
  // cells unattested in surviving corpus. Reference: Bonfante & Bonfante
  // (2002) "The Etruscan Language: An Introduction" + Pallottino (1968).
  ett: { name: 'Etruscan', native: 'Mech Rasnal', lat: 42.25, lng: 11.76, // Tarquinia (major Etruscan city)
},
  // Messapic — Italic-Illyrian (Indo-European, classified Italic by some, Illyrian by others — debated). Extinct ~1st c. BCE. Southern Italy (Apulia/Calabria).
  // Sources: Ethnologue 27 'cms'; Glottolog mess1244; Untermann (2000) Wörterbuch des Oskisch-Umbrischen; De Simone (2017) Messapic.
  cms: { name: 'Messapic', native: 'Messapus', lat: 40.62, lng: 17.93, // Brindisi (Brundisium — major Messapic city)
},

  // Hattic — language isolate of pre-Hittite central Anatolia (~2400-1700 BCE).
  // Preserved only in Hittite-Hattic bilingual ritual texts; very small attested
  // corpus. Reference: Soysal (2004) "Hattischer Wortschatz". Most cells
  // unattested or contested.
  xht: { name: 'Hattic', native: 'Hatti', lat: 40.02, lng: 34.62, // Hattusa
},

  // Tartessian — language of pre-Roman southwestern Iberia (~7-5c BCE),
  // attested in ~95 stelae inscriptions in the Tartessian (SW) script.
  // Decipherment is partial and disputed (Koch 2009 argues Celtic affiliation;
  // Untermann 1997 treats as non-IE). Most cells unattested as basic vocabulary.
  txr: { name: 'Tartessian', native: 'Tartessos', lat: 37.64, lng: -7.66, // Mértola, Portugal (main inscription area)
},


// === Pass 65: 42 new languages added via parallel agents ===
  aau: { name: 'Abau', native: 'Abau', lat: -3.95, lng: 141.45,
},
  ani: { name: 'Andi', native: 'Кӏваннав миццӏи', lat: 42.74, lng: 46.3,
},
  bdk: { name: 'Budukh', native: 'Будад мез', lat: 41.05, lng: 48.36,
},
  sdo: { name: 'Bukar-Sadong Bidayuh', native: 'Bidayuh Bukar-Sadong', lat: 1.35, lng: 110.43,
},
  dbl: { name: 'Dyirbal', native: 'Jirrbal', lat: -17.85, lng: 145.65,
},
  nrf_gg: { name: 'Guernésiais', native: 'Dgèrnésiais', lat: 49.45, lng: -2.58,
},
  fra_jer: { name: 'Jèrriais', native: 'Jèrriais', lat: 49.21, lng: -2.13,
},
  gsw_w: { name: 'Walliser German', native: 'Wallisertiitsch', lat: 46.32, lng: 7.99,
},
  huz: { name: 'Hunzib', native: 'гьонкьос мыц', lat: 42.16, lng: 46.17,
},
  khv: { name: 'Khvarshi', native: 'аорсилъи мец', lat: 42.3, lng: 46.18,
},
  kjj: { name: 'Khinalug', native: 'Кетш мицI', lat: 41.18, lng: 48.07,
},
  kpf: { name: 'Komba', native: 'Komba', lat: -6.14, lng: 147.28,
},
  kqz: { name: 'Korana', native: '!Ora', lat: -28.74, lng: 24.77,
},
  ktz: { name: 'Juǀ\'hoan', native: 'Juǀ\'hoansi', lat: -19.59, lng: 20.5,
},
  kxv: { name: 'Kuvi', native: 'Kūvi', lat: 19.2, lng: 83.42,
},
  lhm: { name: 'Lhomi', native: 'ལྷོ་མི་སྐད', lat: 27.8, lng: 87.6,
},
  lij_t: { name: 'Tabarchino', native: 'Tabarchin', lat: 39.14, lng: 8.3,
},
  mcf: { name: 'Matsés', native: 'Matses', lat: -5.93, lng: -73.32,
},
  mkz: { name: 'Makasae', native: 'Makasae', lat: -8.55, lng: 126.45,
},
  mpj: { name: 'Martu Wangka', native: 'Martu Wangka', lat: -23.4, lng: 122.5,
},
  oar: { name: 'Old Aramaic', native: '𐡀𐡓𐡌𐡉𐡀', lat: 36.83, lng: 40.04,
},
  pao: { name: 'Northern Paiute', native: 'Numu', lat: 39.53, lng: -119.81,
},
  rut: { name: 'Rutul', native: 'МыхӀабишды чӀел', lat: 41.55, lng: 47.3,
},
  kim: { name: 'Tofa', native: 'тоъфа дыл', lat: 54.3, lng: 99.1,
},
  tpn: { name: 'Tupinambá', native: 'Tupinambá / Nhe\'engatú', lat: -22.91, lng: -43.17,
},
  uln: { name: 'Unserdeutsch', native: 'Unserdeutsch', lat: -4.2, lng: 152.2,
},
  wmt: { name: 'Walmajarri', native: 'Walmajarri', lat: -19.3, lng: 126.8,
},
  wuu_hz: { name: 'Hangzhou Wu', native: '杭州话', lat: 30.27, lng: 120.16,
},
  xag: { name: 'Caucasian Albanian', native: 'Aluank', lat: 41.2, lng: 47.2,
},
  xfa: { name: 'Faliscan', native: 'Faliscus', lat: 42.28, lng: 12.41,
},
  xib: { name: 'Iberian', native: 'iltiŕ', lat: 41.65, lng: 0.88,
},
  xli: { name: 'Liburnian', native: 'Liburni', lat: 44.12, lng: 15.23,
},
  xpg: { name: 'Phrygian', native: 'Φρυγιστί', lat: 39.65, lng: 31.99,
},
  xum: { name: 'Umbrian', native: 'Iguvinas', lat: 43.35, lng: 12.58,
},
  xve: { name: 'Venetic', native: 'Venetkens', lat: 45.23, lng: 11.66,
},
  yle: { name: 'Yele', native: 'Yélî Dnye', lat: -11.4, lng: 154.2,
},
  yue_dg: { name: 'Dongguan Yue', native: '莞寶粵語', lat: 23.02, lng: 113.75,
},
  yue_nn: { name: 'Nanning Yue', native: '南宁白话', lat: 22.82, lng: 108.38, // Nanning (E; separated from cnp Pinghua, both were at 108.32)
},
  zh_cq: { name: 'Chinese (Chongqing)', native: '重庆话', lat: 29.56, lng: 106.55,
},
  zh_jn: { name: 'Chinese (Jinan)', native: '济南话', lat: 36.65, lng: 117,
},
  zh_km: { name: 'Kunming Mandarin', native: '昆明话', lat: 25.04, lng: 102.72,
},
  zh_xa: { name: 'Xi\'an Mandarin', native: '西安话', lat: 34.27, lng: 108.93,
},


// === Pass 65: 42 new languages added via parallel agents ===
  bbl: { name: 'Bats', native: 'ბაცბური მოტტ', lat: 42.1, lng: 45.65,
},
  bzg: { name: 'Babuza', native: 'Favorlang', lat: 23.95, lng: 120.46,
},
  dru: { name: 'Rukai', native: 'Drekay', lat: 22.74, lng: 120.71,
},
  hup: { name: 'Hupa', native: 'Na:tinixwe Mixine:whe’', lat: 41.1, lng: -123.65,
},
  kfa: { name: 'Kodava', native: 'ಕೊಡವ ತಕ್ಕ್', lat: 12.42, lng: 75.74,
},
  kfr: { name: 'Kachhi', native: 'કચ્છી', lat: 23.25, lng: 69.66,
},
  kry: { name: 'Kryts', native: 'кърыцӀаз кьеланджи', lat: 41.19, lng: 48.27,
},
  luz: { name: 'Southern Luri', native: 'لوری جنوبی', lat: 30.4, lng: 51.55,
},
  osc: { name: 'Oscan', native: 'Oscan', lat: 40.75, lng: 14.49,
},
  pkp: { name: 'Pukapukan', native: 'Te Reo Pukapuka', lat: -10.88, lng: -165.83,
},
  qxq: { name: 'Qashqai', native: 'Qašqāyī (قشقایی)', lat: 29.62, lng: 52.54,
},
  wls: { name: 'Wallisian', native: 'Faka\'uvea', lat: -13.28, lng: -176.18,
},
  yug: { name: 'Yugh', native: 'Дюк', lat: 60.5, lng: 88.5,
},



// === Pass 65: 42 new languages added via parallel agents ===
  alq: { name: 'Algonquin', native: 'Anishinàbemiwin', lat: 47.45, lng: -78.8,
},
  ckv: { name: 'Kavalan', native: 'Kebalan', lat: 24.32, lng: 121.81,
},
  haj: { name: 'Hajong', native: 'হাজং', lat: 25.5, lng: 90.27,
},
  dtp_kzj: { name: 'Coastal Kadazan', native: 'Boos Momogun', lat: 5.97, lng: 116.07,
},
  mez: { name: 'Menominee', native: 'Mamāceqtaw', lat: 44.91, lng: -88.74,
},
  nan_xm: { name: 'Xiamen Hokkien', native: '厦门话', lat: 24.48, lng: 118.1,
},
  nan_zz: { name: 'Zhangzhou Hokkien', native: '漳州话', lat: 24.51, lng: 117.65,
},
  osa: { name: 'Osage', native: '𐓏𐓘𐓻𐓘𐓻𐓟 𐒻𐓟', lat: 36.69, lng: -96.34,
},
  pmy: { name: 'Papuan Malay', native: 'Bahasa Melayu Papua', lat: -2.53, lng: 140.72,
},
  pot: { name: 'Potawatomi', native: 'Bodéwadmimwen', lat: 39.04, lng: -95.74,
},
  pzh: { name: 'Pazeh', native: 'Pazeh', lat: 23.97, lng: 120.97,
},
  wic: { name: 'Wichita', native: 'Kirikirʔis', lat: 35.05, lng: -98.4,
},
  wuu_jh: { name: 'Jinhua Wu', native: '金华话', lat: 29.08, lng: 119.65,
},
  wuu_jx: { name: 'Jiaxing Wu', native: '嘉兴话', lat: 30.75, lng: 120.76,
},
  yue_zs: { name: 'Zhongshan Yue', native: '中山白话', lat: 22.52, lng: 113.39,
},
  zh_cd: { name: 'Chengdu Mandarin', native: '成都话', lat: 30.67, lng: 104.07,
},
  zh_hf: { name: 'Hefei Mandarin', native: '合肥话', lat: 31.82, lng: 117.23,
},
  zh_kf: { name: 'Kaifeng Mandarin', native: '开封话', lat: 34.8, lng: 114.31,
},
  zh_nj: { name: 'Nanjing Mandarin', native: '南京话', lat: 32.06, lng: 118.8,
},

  // === Phase 4/5 additions (review 2026-08-07) ==========================
  // 20 languages authored with an explicit "leave it blank rather than
  // guess" rule, so several carry 22-27 of the 31 concepts. The gaps are
  // the honest state of the documentation, not work left undone.
  bew: { name: "Betawi", native: "Basa Betawi", lat: -6.18, lng: 106.83 }, // central Jakarta (Monas), the historic core of the Betawi speech area, which today extends across Greater Jakarta into Depok, Bekasi and Tangerang
  ltg: { name: "Latgalian", native: "Latgalīšu volūda", lat: 56.51, lng: 27.33 }, // Rēzekne, the main town and cultural centre of Latgale in south-eastern Latvia
  djr: { name: "Djambarrpuyngu", native: "Djambarrpuyŋu", lat: -12.02, lng: 135.57 }, // Galiwin'ku on Elcho Island, the largest Djambarrpuyŋu-speaking community in north-east Arnhem Land
  ie: { name: "Interlingue", native: "Interlingue", lat: 59.3, lng: 24.6 }, // near Tallinn — Edgar de Wahl published Occidental there in 1922; offset so the pin does not sit on Estonian
  io: { name: "Ido", native: "Ido", lat: 48.7, lng: 2.2 }, // near Paris — the 1907 Delegation for the Adoption of an International Auxiliary Language met there; offset so the pin does not sit on French
  vls: { name: "West Flemish", native: "West-Vlams", lat: 51.21, lng: 3.22 }, // Bruges (Brugge), capital of the Belgian province of West Flanders and the main town of the core speech area
  fkv: { name: "Kven Finnish", native: "kväänin kieli", lat: 70.32, lng: 25.55 }, // Børselv (Kven: Pyssyjoki), Porsanger in Troms og Finnmark, seat of the Kven Institute (Kainun institutti) and the centre of Kven language standardisation
  fit: { name: "Meänkieli", native: "meänkieli", lat: 67.21, lng: 23.37 }, // Pajala, one of the five Meänkieli administrative-area municipalities and the cultural centre of the Torne Valley
  hif: { name: "Fiji Hindi", native: "Fiji Baat", lat: -17.61, lng: 177.45 }, // Lautoka, Fiji's "Sugar City" on western Viti Levu and the largest town of the Indo-Fijian cane belt
  zgh: { name: "Standard Moroccan Tamazight", native: "ⵜⴰⵎⴰⵣⵉⵖⵜ ⵜⴰⵏⴰⵡⴰⵢⵜ", lat: 34.02, lng: -6.84 }, // Rabat, seat of IRCAM (Institut Royal de la Culture Amazighe), the body that built and maintains the standard
  aln: { name: "Gheg Albanian", native: "gegnisht", lat: 42.67, lng: 21.17 }, // Prishtina, the largest Gheg-speaking city and the reference point IE-CoR uses for northeastern Gheg
  rmt: { name: "Domari", native: "Dōmʋārī", lat: 31.7767, lng: 35.2345 }, // the Old City of Jerusalem, home of the Dom community whose dialect is the only fully described variety of the language
  fia: { name: "Nobiin", native: "Nòbíín", lat: 21.8, lng: 31.34 }, // Wadi Halfa on the Sudanese Nile, the main town of the Nobiin-speaking stretch of the river between Aswan and the Kerma basin
  fvr: { name: "Fur", native: "Foor'íŋ belé", lat: 12.95, lng: 24.27 }, // the Jebel Marra massif in central Darfur, the historic Fur heartland
  fud: { name: "East Futunan", native: "Fakafutuna", lat: -14.2967, lng: -178.1583 }, // Leava, the port and administrative village of Sigave district on Futuna island, Wallis and Futuna
  tca: { name: "Ticuna", native: "Duüxügu", lat: -4.2153, lng: -69.9406 }, // the Tabatinga–Leticia conurbation on the Brazil–Colombia–Peru tri-border, the main urban centre of a Ticuna area stretching some 1,000 km along the Solimões/Amazon
  wrh: { name: "Wiradjuri", native: "Wiradjuri", lat: -33.0864, lng: 147.1481 }, // Condobolin on the Kalari (Lachlan) River, seat of the Wiradjuri Study Centre and near the centre of Wiradjuri country in central New South Wales
  lun: { name: "Lunda", native: "Chilunda", lat: -11.7386, lng: 24.4272 }, // Mwinilunga, the district town at the centre of the Lunda-speaking area in Zambia's North-Western Province
  tsj: { name: "Tshangla", native: "Tshangla", lat: 27.3333, lng: 91.55 }, // Trashigang, the main town of eastern Bhutan and home of the prestige Trashigang dialect
  lep: { name: "Lepcha", native: "ᰛᰩᰵᰛᰧᰵᰶ", lat: 27.06, lng: 88.47 }, // Kalimpong, West Bengal — the main town of the Támsángmú Lepcha community; the other centre is the Dzongu Lepcha reserve in North Sikkim, about 60 km north

};

// === Data-status overrides for historical / reconstructed languages ===
// Per wordmap-check-2.md §8 — moved from wordmap.html to the data layer so
// the validator and other consumers can read it. Modern languages default
// to status 'modern'; historical languages get 'attested' or auto-derived
// 'fragmentary' (≥30% '—' entries) unless overridden here.
//
// Reclassifications per wordmap-check-3.md §6 — the previous pass was too
// generous with 'reconstructed' / 'undeciphered'. 'reconstructed' is now
// reserved for genuine comparative reconstructions with no direct text
// record (PIE only). Languages with substantial direct attestation move
// to 'attested' even if their phonology has scholarly reconstructions.
// 'partly-understood' is added for languages whose script is read but
// whose vocabulary/grammar is only partially known (e.g. Elamite).
const DATA_STATUS_OVERRIDES = {
    // Genuinely reconstructed (no direct text record):
    p_ine:       'reconstructed',  // Proto-Indo-European — comparative reconstruction
    p_toc:       'reconstructed',  // Proto-Tocharian — reconstructed from Tocharian A and B only
    p_jpk:       'reconstructed',  // Proto-Japonic-Koreanic — disputed hypothesis (Whitman/Robbeets)
    p_jpn: 'reconstructed',  // Proto-Japonic
    p_kor: 'reconstructed',  // Proto-Koreanic
    ptrk: 'reconstructed',  // Proto-Turkic
    pmng: 'reconstructed',  // Proto-Mongolic
    p_tun: 'reconstructed',  // Proto-Tungusic
    p_aav: 'reconstructed',  // Proto-Austroasiatic
    ptai: 'reconstructed',  // Proto-Tai
    p_hmx: 'reconstructed',  // Proto-Hmong-Mien
    pafa: 'reconstructed',  // Proto-Afroasiatic
    pkar: 'reconstructed',  // Proto-Kartvelian
    pmay: 'reconstructed',  // Proto-Mayan
    puaz: 'reconstructed',  // Proto-Uto-Aztecan
    pban: 'reconstructed',  // Proto-Bantu
    p_sit: 'reconstructed',  // Proto-Sino-Tibetan
    psem: 'reconstructed',  // Proto-Semitic
    pura: 'reconstructed',  // Proto-Uralic
    p_dra: 'reconstructed',  // Proto-Dravidian
    paus: 'reconstructed',  // Proto-Austronesian
    // Critically endangered modern languages — sparse Swadesh-list coverage
    // (audit Task 142 Tier 2 optional additions, sourced cells only,
    // many '—' placeholders).
    itl:       'fragmentary',    // Itelmen — ~80 fluent speakers, Volodin & Khaloimova partial
    ykg:       'fragmentary',    // Tundra Yukaghir — ~370 speakers, Maslova partial
    roo:       'fragmentary',    // Rotokas — Firchow 1973 / Robinson 2011
    nmn:       'fragmentary',    // Taa / !Xóõ — Traill 1994
    lbz:       'fragmentary',    // Lardil — host language of Damin
    lbz_damin: 'fragmentary',    // Damin — secret ceremonial men's register of Lardil; ~200 items, only ~1 cell maps cleanly to Swadesh
    nny:       'fragmentary',    // Yangkaal — sister of Lardil
    kky:       'fragmentary',    // Guugu Yimithirr — absolute cardinal-direction reference (Levinson)
    blc:       'fragmentary',    // Nuxalk (Bella Coola) — Salishan, all-consonant words (Nater 1984)
    tue:       'fragmentary',    // Tuyuca — Tukanoan, obligatory evidentiality (Barnes 1984)
    ncs:       'fragmentary',    // Nicaraguan Sign Language — spontaneous emergence (Kegl 1999)
    // 2026-07-09 (reviews #407, #409): both languages had a bulk import of
    // prestige-language citation forms (Sanskrit tatsamas for Tregami, Tajik
    // dictionary forms mis-slotted for Yaghnobi). The fabricated cells were
    // replaced with sourced forms where a source exists and blanked where none
    // does. Both are LIVING languages — see LIVING_FRAGMENTARY_CODES in
    // wordmap.html, which suppresses the misleading "fragmentary" badge.
    trm:       'fragmentary',    // Tregami — Morgenstierne (1973) is the only substantial wordlist; 6 cells unattested
    yai:       'fragmentary',    // Yaghnobi — Andreyev–Peshchereva / Novák lexicons have no headword for 'love'
    uby:       'fragmentary',       // Ubykh — extinct 1992 (Esenç d. 7 Oct 1992); Dumézil 1931 + Vogt 1963 + Hewitt 2004  [reclassified modern 2026-07: fragmentary 25-word coverage]
    // Attested in primary text records (despite scholarly phonological reconstruction):
    h_vedic:       'attested',       // Vedic Sanskrit — Rigveda et al. directly transmitted
    xto:       'attested',       // Tocharian A — 5-8c. CE manuscripts
    txb:       'attested',       // Tocharian B — same
    xlu:       'attested',       // Luwian — cuneiform + hieroglyphic Luwian texts
    xpu:       'attested',       // Punic — Phoenician-script inscriptions, Carthage texts
    sux:       'attested',       // Sumerian — earliest extensive text record (~3100 BCE+)
    xhu:       'attested',       // Hurrian — extensive cuneiform incl. bilingual texts
    // Per Session 27: bulk normalization of well-attested historical languages
    // that were defaulting to 'modern' due to missing override (HIST_DESCENDANT
    // membership doesn't auto-promote). All have continuous primary text corpus.
    // Indo-European Old:
    la:        'attested',       // Latin — extensive Classical/Medieval corpus
    el_grc:    'attested',       // Ancient Greek — Homer + Classical + Hellenistic corpus
    enm:       'attested',       // Middle English — Canterbury Tales, etc.
    non:       'attested',       // Old Norse — Eddas, sagas
    got:       'attested',       // Gothic — Wulfila Bible
    cu:        'attested',       // Old Church Slavonic — liturgical corpus
    sa:        'attested',       // Sanskrit — vast classical corpus
    peo:       'attested',       // Old Persian — Achaemenid royal inscriptions
    ave:       'attested',       // Avestan — Avesta corpus (Zoroastrian)
    pal:       'attested',       // Middle Persian (Pahlavi) — Zoroastrian/Manichaean
    fro:       'attested',       // Old French — Chanson de Roland, Roman de la Rose
    goh:       'attested',       // Old High German — Hildebrandslied, etc.
    gmh:       'attested',       // Middle High German — Nibelungenlied, Minnesang
    osp:       'attested',       // Old Spanish — Cantar de Mio Cid, El Conde Lucanor
    osx:       'attested',       // Old Saxon — Heliand
    sga:       'attested',       // Old Irish — glosses, sagas
    mga:       'attested',       // Middle Irish — Lebor Gabála Érenn, Táin
    hit:       'attested',       // Hittite — extensive cuneiform tablets
    gmy:       'attested',       // Mycenaean Greek — Linear B tablets (palace records)
    hbo:       'attested',       // Biblical Hebrew — Hebrew Bible
    sukh:      'attested',       // Old Thai (Sukhothai) — Ramkhamhaeng inscription (1283)
    orv:       'attested',       // Old East Slavic — Russian Primary Chronicle, Igor's Tale
    xct:       'attested',       // Classical Tibetan — Buddhist canon, royal annals
    // Afro-Asiatic / Semitic Old:
    egy:       'attested',       // Ancient Egyptian — vast hieroglyphic corpus (Old/Middle/Late)
    cop:       'attested',       // Coptic — Christian/Gnostic corpus, Nag Hammadi
    arc:       'attested',       // Aramaic — biblical + Targums + Talmudic
    phn:       'attested',       // Phoenician — inscriptions + Punic
    uga:       'attested',       // Ugaritic — Ras Shamra texts
    syc:       'attested',       // Classical Syriac — Christian corpus + Peshitta
    gez:       'attested',       // Ge'ez — Ethiopic Christian corpus
    xsa:       'attested',       // Sabaean — South Arabian inscriptions
    // Pali / Buddhist:
    pi:        'attested',       // Pali — Theravada Buddhist canon (Tipitaka)
    // Iranian:
    xqa:       'attested',       // Karakhanid — Dīwān Lughāt al-Turk (Mahmud al-Kashgari, 11c.)
    // Mesoamerican / Classical American:
    nci:       'attested',       // Classical Nahuatl — codices + Spanish-era documentation
    emy:       'attested',       // Classical Maya — hieroglyphic inscriptions + codices
    qwc:       'attested',       // Classical Quechua — colonial-era documentation
    // Mainland SE Asia / Insular SE Asia historical:
    kaw:       'attested',       // Old Javanese (Kawi) — Brahmic inscriptions, kakawin literature
    kho:       'attested',       // Khotanese — Buddhist + secular Saka manuscripts
    okz:       'attested',       // Old Khmer — Angkor inscriptions
    omx:       'attested',       // Old Mon — Dvaravati / Pagan inscriptions
    obr:       'attested',       // Old Burmese — Myazedi (1113) + Pagan inscriptions
    ocm:       'attested',       // Old Cham — Champa kingdom inscriptions
    omy:       'attested',       // Old Malay — Srivijaya inscriptions (Kedukan Bukit 683)
    osn:       'attested',       // Old Sundanese — Sunda Kingdom / Pajajaran inscriptions
    h_tagalog:       'attested',       // Old Tagalog — pre-Spanish Baybayin inscriptions
    onw:       'attested',       // Old Nubian — Christian Nubian Christian texts
    // East Asian / Inner Asian historical:
    och:       'attested',       // Old Chinese — pre-Han inscriptions + Shijing/Shujing
    ojp:       'attested',       // Old Japanese — Man'yōshū, Kojiki, Nihon Shoki
    txg:       'attested',       // Tangut — Buddhist canon + literary corpus
    sog:       'attested',       // Sogdian — Manichaean/Christian/Buddhist texts
    otk:       'attested',       // Old Turkic — Orkhon/Yenisei inscriptions
    xng:       'attested',       // Middle Mongolian — Secret History of the Mongols
    // Tungusic / Akkadian:
    mnc:       'attested',       // Manchu — extensive Qing-era corpus (Veritable Records, etc.)
    akk:       'attested',       // Akkadian — extensive cuneiform from ~2350 BCE (Sumerian period)
    // Partially understood (script readable; lexicon/grammar incomplete):
    // Reclassified from 'undeciphered' per wordmap-full-audit.md §6.21 —
    // for all four, the script is read and basic vocabulary is known,
    // even if much of the lexicon and grammar remains unclear.
    xmr:       'partly-understood', // Meroitic
    zkt:       'partly-understood', // Khitan
    pyx:       'partly-understood', // Pyu
    elx:       'partly-understood', // Elamite
    // Fragmentary (no continuous texts; mostly names + isolated words via
    // Greek/other-language sources, basic vocab via Old Iranian/Avestan proxy):
    // Per Codex review 3 / Session 17 #1.
    xsc:       'fragmentary',       // Scythian — only `spaka`=dog directly attested via
                                    // Iranica `Išpakaia`; rest are Old Iranian/Avestan proxy
    juc:       'fragmentary',       // Jurchen — Britannica: "almost nothing is known".
                                    // Limited inscriptions + Sino-Jurchen vocabulary (Kane 1989);
                                    // most cells are Manchu projection. Per Codex review 4.
    xpr:       'fragmentary',       // Parthian — corpus is limited (Manichaean texts, ostraca,
                                    // inscriptions); many basic vocabulary cells are Middle Persian
                                    // projection rather than Parthian-specific attestation.
                                    // Per Codex review 6 / Session 21 #4 / Session 22 #4.
    omc:       'fragmentary',       // Mochica/Yunga — Pre-Columbian Andean. Documentation limited
                                    // to Carrera de la Vega's "Arte de la lengua yunga" (1644)
                                    // and Lugo's "Arte de la lengua mochica" (1607). 7/20 cells
                                    // are `—`. Per Codex review 4 / Session 18 #1.
    chb:       'fragmentary',       // Chibcha/Muisca — Pre-Columbian Andean Colombia. Documented
                                    // in Lugo (1619) and Anonymous (early 17c.) grammars; 17c.
                                    // Spanish missionary corpus only. Per Codex review 4 / Session 18 #1.
    // Pedagogical reconstructions (not attested forms; teaching approximations):
    ja_edo:    'pedagogical',
    ja_heian:  'pedagogical',
    ko_mid:    'pedagogical',
    ko_em:     'pedagogical',
    en_em:     'pedagogical',      // Early Modern English (Shakespeare-era; OP reconstruction)
    el_kath:   'pedagogical',      // Katharevousa Greek (puristic literary register, 1834-1976)
    fa_clas:   'pedagogical',      // Classical Persian (Shahnameh-era, ~800-1500 CE; taught canonically in Iran/Tajikistan/Afghanistan)
    it_dan:    'pedagogical',      // Old Italian / Dantesque Tuscan (13c.-14c., literary canon)
    hy_grab:   'pedagogical',      // Classical Armenian / Grabar (5c.-12c. CE; liturgical & literary canon)
    he_mis:    'pedagogical',      // Mishnaic Hebrew (~70-200 CE; Talmudic/rabbinic canon)
    ja_kanbun: 'pedagogical',      // Japanese kanbun reading (漢文訓読; pedagogical rendering of Literary Chinese)
    ar_qur:    'pedagogical',      // Quranic Arabic (Tajwid recitation tradition; classical canon)
    sa_edu:    'pedagogical',      // Modern Spoken Sanskrit (Samskrita Bharati / simplified-sandhi pedagogy)
    pi_edu:    'pedagogical',      // Pedagogical Pali (Theravada monastic recitation tradition)
    xct_litpr: 'pedagogical',      // Liturgical Classical Tibetan (Dharamsala-Lhasa Buddhist recitation)
    zh_wenyan_edu: 'pedagogical',  // Classical Chinese with Cantonese pedagogical reading (Hong Kong tradition)
    vi_han:    'pedagogical',      // Sino-Vietnamese pedagogical reading of Literary Chinese (Hán văn)
    de_lut:    'pedagogical',      // Early New High German / Luther-era German (Reformation pedagogical canon)
    es_sgl:    'pedagogical',      // Golden Age Spanish (Siglo de Oro literary canon — Cervantes, Lope, Calderón)
    fr_class:  'pedagogical',      // Classical French / Grand Siècle (Académie française "le bel usage")
    oko:       'attested',         // Old Korean (Silla) — hyangga corpus + idu
    h_goguryeo:       'fragmentary',      // Goguryeo — ~80 toponyms only
    ko_gor:    'attested',         // Goryeo Korean — 鶏林類事 corpus
    ja_chu:    'pedagogical',      // Middle Japanese — period reconstruction (Heike + Vocabulario)
    p_ryu:       'reconstructed',    // Proto-Ryukyuan — comparative reconstruction
    vi_nom:    'pedagogical',
    // Well-attested historical Sinitic:
    zh_song:   'attested',
    zh_han:    'attested',
    zh_tang:   'attested',
    // Pass 35: 5 historical additions
    ota:       'attested',         // Ottoman Turkish — extensive 1300-1928 corpus
    cmg:       'attested',         // Classical Mongolian — vertical-script literary tradition
    ett:       'fragmentary',      // Etruscan — ~13K inscriptions, partly understood
    xht:       'fragmentary',      // Hattic — Hittite-Hattic bilinguals only
    txr:       'fragmentary',      // Tartessian — ~95 inscriptions, decipherment disputed
    cms:       'fragmentary',      // Messapic — ~600 inscriptions, partial decipherment
    pmh:       'attested',         // Maharastri Prakrit — extensive Jain literary corpus 1st BCE-13th CE
    ofs:       'attested',         // Old Frisian — extensive medieval law-code corpus 1100-1500 CE
    // Pass 35: 2 critically-endangered isolates with fragmentary documentation
    yuc:       'fragmentary',      // Yuchi — ~5 fluent speakers; Linn 2001 + Wagner 1934 only
    kgg:       'fragmentary',      // Kusunda — ~3 partial speakers; Watters 2006 only
    // 2026-05-18: 4 historical codes that were missing both HIST_DESCENDANT
    // and DATA_STATUS_OVERRIDES — see HIST_DESCENDANT comment below for context.
    ang:       'attested',         // Old English (ISO code; duplicate with en_ang)
    ohu:       'attested',         // Old Hungarian — Funeral Sermon (c. 1192) + medieval corpus
    prg:       'fragmentary',      // Old Prussian — Elbing Vocabulary + 3 catechisms only
    myz:       'attested',         // Classical Mandaic — Ginza Rabba + extensive religious corpus
};

// === HIST_DESCENDANT (Audit Task 122) ================================
// Map historical-language code -> modern descendant code (or null when no
// single descendant exists). Used to (a) classify codes into the
// historical-mode era set; (b) draw "modern descendant" cross-links in the
// language modal; (c) drive validator invariants (#9, #16, #17).
//
// Moved from wordmap.html to the data layer so the validator does not need
// to regex-scrape JS source. The browser also reads this constant.
const HIST_DESCENDANT = {
    la:'it', el_grc:'el', el_kath:'el', egy:'ar_eg', enm:'en', en_em:'en', non:'is',
    got:'de', cu:'bg', pi:'si', cop:null, arc:'he',
    sa:'hi', sux:null, akk:null, hit:'tr', nci:'es_mx', emy:'es_mx',
    p_ine:null, p_toc:null, p_jpk:null, p_jpn:null, p_kor:null, ptrk:null, pmng:null, p_tun:null, p_aav:null, ptai:null, p_hmx:null, pafa:null, pkar:null, pmay:null, puaz:null, pban:null, p_sit:null, psem:null, pura:null, p_dra:null, paus:null, zh_song:'zh', zh_han:'zh', zh_tang:'zh',
    ja_edo:'ja', ja_heian:'ja', ja_kanbun:'ja', ko_mid:'ko', ko_em:'ko', vi_nom:'vi',
    ar_qur:'ar', sa_edu:'hi', pi_edu:'si', xct_litpr:'bo', zh_wenyan_edu:'yue',
    vi_han:'vi', de_lut:'de', es_sgl:'es', fr_class:'fr',
    oko:'ko', h_goguryeo:null, ko_gor:'ko', ja_chu:'ja', p_ryu:'ja_oki',
    // Phase 4: historical
    peo:'fa', ave:'fa', xto:null, txb:null, phn:'he', uga:'he',
    xlu:null, pal:'fa', fa_clas:'fa', syc:'syr', fro:'fr', it_dan:'it', goh:'de', gez:'am',
    he_mis:'he', hy_grab:'hy',
    // Phase 4B: more historical
    gmy:'el', xct:'bo', xpu:'ar', xhu:null, elx:null, xsa:'ar',
    kaw:'jv', kho:null, gmh:'de', osp:'es', okz:'km', osx:'nds',
    // Phase 5 historical
    xpr:'fa', xqa:'ug', sga:'ga',
    // Phase 6 historical
    mga:'ga', hbo:'he',
    // Phase 8 historical
    xng:'mn',
    // Phase 13: ancient Asian additions
    och:'zh', ojp:'ja', h_vedic:'hi', txg:null, sog:'tg', otk:'tr',
    // Phase 13b: NE Asian + SE Asian ancient
    zkt:null, juc:'mnc', omx:'mnw', pyx:'my', obr:'my', ocm:'cja',
    // Phase 13c: Russia / Thailand / Africa / Americas / Indonesia / Philippines ancient
    orv:'ru', xsc:null, sukh:'th', xmr:null, onw:null, qwc:'qu',
    omc:null, chb:null, omy:'ms', osn:'su', h_tagalog:'tl',
    // 2026-07-21 (owner, extinct-as-modern audit): Kulon-Pazeh (Formosan) is
    // dormant — last fluent speaker died 2010, ~0 L1 — and carries a period
    // (18–21c), so it belongs on the historical map, not the modern one.
    pzh:null,
    // Pass 35: 5 historical additions (Ottoman→Turkish, Classical Mongolian→Mongolian,
    // Etruscan/Hattic/Tartessian = isolates with no living descendant)
    ota:'tr', cmg:'mn', ett:null, xht:null, txr:null, cms:null, pmh:'mr', ofs:'fy',
    // Audit Task 199 (2026-05-07): yuc Yuchi + kgg Kusunda are
    // critically-endangered isolates flagged `dataStatus: 'fragmentary'`
    // by DATA_STATUS_OVERRIDES. Adding them here with `null` descendant
    // (both are linguistic isolates with no genealogical heir) clears
    // [#17] Session-29 inverse-invariant warnings — "fragmentary but
    // not in HIST_DESCENDANT". Yuchi (Oklahoma, ~5 elderly L1) and
    // Kusunda (Nepal, ~1-2 L1) are still living languages so they will
    // continue to show on the modern overlay; the HIST_DESCENDANT entry
    // only signals the validator, not the UI era classification.
    yuc:null, kgg:null,
    uby:null,    // Ubykh — modern era (last speaker d.1992); fragmentary coverage, shown on modern via carve-out
    // Audit Task 203 (2026-05-07): itl Itelmen + ykg Tundra Yukaghir
    // are the remaining `dataStatus: 'fragmentary'` rows still flagged
    // by [#17]. itl (~80 fluent, Kamchatka — Chukotko-Kamchatkan) and
    // ykg (~370, Sakha Republic — Yukaghir) are likewise living
    // languages, so the [#9] EXCLUDED_CODES carve-out for fragmentary
    // rows (added in Round 2) keeps them visible on the modern map.
    itl:null, ykg:null,
    // 2026-05-18: 4 historical-named langs were missing from HIST_DESCENDANT
    // and therefore showing on the modern map. Per user report ("古英語が
    // 現代言語に分類されている"). The `ang` ISO code coexists with the
    // in a follow-up.
    ang:'en',      // Old English ISO code (legacy duplicate `en_ang` already mapped above)
    ohu:'hu',      // Old Hungarian → modern Hungarian
    prg:null,      // Old Prussian — extinct Baltic branch, no direct living descendant
    myz:null,      // Classical Mandaic — Modern Mandaic (mid) is the living descendant but not in our data; null for now
    // Living fragmentary languages added 2026-05-16/17 with partial Swadesh
    // coverage. Null descendant clears [#17] inverse invariant — same pattern
    // as itl/ykg/yuc/kgg.
    roo:null,    // Rotokas — Firchow 1973 / Robinson 2011
    nmn:null,    // Taa / !Xóõ — Traill 1994
    lbz:null,    // Lardil — host language of Damin
    lbz_damin:'lbz', // Damin descends to its parent Lardil (both effectively dormant); puts Damin in historical era per user spec
    nny:null,    // Yangkaal — sister of Lardil
    kky:null,    // Guugu Yimithirr — absolute cardinal-direction reference
    blc:null,    // Nuxalk (Bella Coola) — all-consonant words
    tue:null,    // Tuyuca — obligatory evidentiality
    ncs:null,    // Nicaraguan Sign Language — spontaneous emergence
    // 2026-06-09: 12 extinct languages added to EXCLUDED_CODES also need
    // HIST_DESCENDANT entries so the era-counter classifies them as
    // Historical (HIST_CODE_SET is derived from this map) and they
    // appear in historical mode. `null` = no direct living linguistic
    // descendant; otherwise the closest modern relative present in our
    // data.
    xum:null,    // Umbrian — Sabellic, displaced by Latin
    osc:null,    // Oscan — Sabellic, displaced by Latin
    xfa:null,    // Faliscan — Italic, displaced by Latin
    xve:null,    // Venetic — Italic, displaced by Latin
    xpg:null,    // Phrygian — IE isolate branch, no living descendant
    oar:null,    // Old Aramaic — ancestor of arc (which → he)
    tpn:'yrl',   // Tupinambá — Nheengatu (yrl) is its direct continuation
    yug:'ket',   // Yug — Ket is the only other surviving Yeniseian language
    xib:null,    // Iberian — Paleo-Hispanic isolate, undeciphered
    xli:null,    // Liburnian — extinct Adriatic, no living descendant
    xag:'udi',   // Caucasian Albanian — Udi is the direct living descendant
    bzg:null,    // Babuza — extinct Formosan, no living descendant
};

// Six-color palette for country fills (pastel, semi-transparent)
const COUNTRY_PALETTE = [
  'rgba(100,149,237,0.20)', // cornflower blue
  'rgba(144,238,144,0.20)', // light green
  'rgba(250,128,114,0.20)', // salmon
  'rgba(255,255,150,0.20)', // light yellow
  'rgba(221,160,221,0.20)', // plum
  'rgba(175,238,238,0.20)', // pale turquoise
];

// === UI translations for Word Map ===
const WM_UI = {
  ja: { native:'現地名', size:'サイズ', word:'表記', ipa:'発音', ipaCol:'発音/転写', wordCol:'表記', concept:'概念', name:'言語名', onlyCompare:'選択のみ', onlyCompareCol:'比較リストの言語だけ表示', pins:'ピン', back:'← LangMap', family:'語族', speakers:'話者数', countries:'使用国', official:'公用語', script:'文字', url:'langmap.heuron.com/wordmap.html', modern:'現代言語', historical:'歴史言語' },
  ko: { native:'현지어', size:'크기', word:'표기', ipa:'발음', ipaCol:'발음/전사', wordCol:'표기', concept:'개념', name:'언어명', onlyCompare:'선택만', onlyCompareCol:'비교 목록의 언어만 표시', pins:'핀', back:'← LangMap', family:'어족', speakers:'화자 수', countries:'사용 국가', official:'공용어', script:'문자', url:'langmap.heuron.com/wordmap.html', modern:'현대 언어', historical:'역사 언어' },
  zh: { native:'当地语', size:'大小', word:'写法', ipa:'发音', ipaCol:'发音/转写', wordCol:'写法', concept:'概念', name:'语言名', onlyCompare:'仅所选', onlyCompareCol:'只显示对比列表中的语言', pins:'地点', back:'← LangMap', family:'语族', speakers:'使用人数', countries:'使用国家', official:'官方语言', script:'文字', url:'langmap.heuron.com/wordmap.html', modern:'现代语言', historical:'历史语言' },
  yue: { native:'當地語', size:'大細', word:'寫法', ipa:'發音', ipaCol:'發音/轉寫', wordCol:'寫法', concept:'概念', name:'語言名', onlyCompare:'淨係揀嘅', onlyCompareCol:'淨係顯示對比清單入面嘅語言', pins:'地點', back:'← LangMap', family:'語族', speakers:'使用人數', countries:'使用國家', official:'官方語言', script:'文字', url:'langmap.heuron.com/wordmap.html', modern:'現代語言', historical:'歷史語言' },
  vi: { native:'Bản địa', size:'Cỡ', word:'Chữ viết', ipa:'Phiên âm', ipaCol:'Phiên âm / Ký âm', wordCol:'Chữ viết / Phiên tự', concept:'Khái niệm', name:'Tên ngôn ngữ', onlyCompare:'Chỉ chọn', onlyCompareCol:'Chỉ hiện các ngôn ngữ trong danh sách so sánh', pins:'Ghim', back:'← LangMap', family:'Ngữ hệ', speakers:'Số người nói', countries:'Quốc gia', official:'Ngôn ngữ chính thức', script:'Chữ viết', url:'langmap.heuron.com/wordmap.html', modern:'Hiện đại', historical:'Ngôn ngữ lịch sử' },
  th: { native:'ท้องถิ่น', size:'ขนาด', word:'รูปเขียน', ipa:'สัทอักษร', ipaCol:'สัทอักษร / ถ่ายถอด', wordCol:'รูปเขียน', concept:'ความหมาย', name:'ชื่อภาษา', onlyCompare:'เฉพาะที่เลือก', onlyCompareCol:'แสดงเฉพาะภาษาในรายการเปรียบเทียบ', pins:'หมุด', back:'← LangMap', family:'ตระกูลภาษา', speakers:'ผู้พูด', countries:'ประเทศ', official:'ภาษาราชการ', script:'อักษร', url:'langmap.heuron.com/wordmap.html', modern:'สมัยใหม่', historical:'ภาษาประวัติศาสตร์' },
  id: { native:'Lokal', size:'Ukuran', word:'Ejaan', ipa:'Lafal', ipaCol:'IPA / Transkripsi', wordCol:'Ejaan / Transliterasi', concept:'Konsep', name:'Nama bahasa', onlyCompare:'Hanya', onlyCompareCol:'Hanya tampilkan bahasa dalam daftar perbandingan', pins:'Pin', back:'← LangMap', family:'Rumpun bahasa', speakers:'Penutur', countries:'Negara', official:'Bahasa resmi', script:'Aksara', url:'langmap.heuron.com/wordmap.html', modern:'Modern', historical:'Bahasa historis' },
  hi: { native:'स्थानीय', size:'आकार', word:'लेखन', ipa:'उच्चारण', ipaCol:'उच्चारण / लिप्यंतरण', wordCol:'लेखन / लिप्यंतरण', concept:'अवधारणा', name:'भाषा नाम', onlyCompare:'केवल चयनित', onlyCompareCol:'केवल तुलना सूची की भाषाएँ दिखाएँ', pins:'पिन', back:'← LangMap', family:'भाषा परिवार', speakers:'वक्ता', countries:'देश', official:'राजभाषा', script:'लिपि', url:'langmap.heuron.com/wordmap.html', modern:'आधुनिक', historical:'ऐतिहासिक भाषा' },
  en: { native:'Native', size:'Size', word:'Form', ipa:'Pron.', ipaCol:'IPA / Transcription', wordCol:'Form / Transliteration', concept:'Concept', name:'Name', onlyCompare:'Only', onlyCompareCol:'Show only the languages in the comparison list', pins:'Pins', back:'← LangMap', family:'Language family', speakers:'Speakers', countries:'Countries', official:'Official in', script:'Script', url:'langmap.heuron.com/wordmap.html', modern:'Modern', historical:'Historical' },
  de: { native:'Einheimisch', size:'Größe', word:'Form', ipa:'Aussprache', ipaCol:'IPA / Transkription', wordCol:'Form / Transliteration', concept:'Konzept', name:'Sprache', onlyCompare:'Nur', onlyCompareCol:'Nur die Sprachen aus der Vergleichsliste zeigen', pins:'Pins', back:'← LangMap', family:'Sprachfamilie', speakers:'Sprecher', countries:'Länder', official:'Amtssprache', script:'Schrift', url:'langmap.heuron.com/wordmap.html', modern:'Modern', historical:'Historisch' },
  fr: { native:'Locale', size:'Taille', word:'Forme', ipa:'API', ipaCol:'API / Transcription', wordCol:'Forme / Translittération', concept:'Concept', name:'Nom', onlyCompare:'Seuls', onlyCompareCol:"N'afficher que les langues de la liste de comparaison", pins:'Repères', back:'← LangMap', family:'Famille', speakers:'Locuteurs', countries:'Pays', official:'Langue officielle', script:'Écriture', url:'langmap.heuron.com/wordmap.html', modern:'Moderne', historical:'Historique' },
  it: { native:'Locale', size:'Dimensione', word:'Forma', ipa:'IPA', ipaCol:'IPA / Trascrizione', wordCol:'Forma / Traslitterazione', concept:'Concetto', name:'Nome', onlyCompare:'Solo', onlyCompareCol:"Mostra solo le lingue nell'elenco di confronto", pins:'Punti', back:'← LangMap', family:'Famiglia linguistica', speakers:'Parlanti', countries:'Paesi', official:'Lingua ufficiale', script:'Scrittura', url:'langmap.heuron.com/wordmap.html', modern:'Moderno', historical:'Storico' },
  es_eu: { native:'Local', size:'Tamaño', word:'Forma', ipa:'AFI', ipaCol:'AFI / Transcripción', wordCol:'Forma / Transliteración', concept:'Concepto', name:'Nombre', onlyCompare:'Solo', onlyCompareCol:'Mostrar solo los idiomas de la lista de comparación', pins:'Puntos', back:'← LangMap', family:'Familia lingüística', speakers:'Hablantes', countries:'Países', official:'Idioma oficial', script:'Escritura', url:'langmap.heuron.com/wordmap.html', modern:'Moderno', historical:'Histórico' },
  es_mx: { native:'Local', size:'Tamaño', word:'Forma', ipa:'AFI', ipaCol:'AFI / Transcripción', wordCol:'Forma / Transliteración', concept:'Concepto', name:'Nombre', onlyCompare:'Solo', onlyCompareCol:'Mostrar solo los idiomas de la lista de comparación', pins:'Puntos', back:'← LangMap', family:'Familia lingüística', speakers:'Hablantes', countries:'Países', official:'Idioma oficial', script:'Escritura', url:'langmap.heuron.com/wordmap.html', modern:'Moderno', historical:'Histórico' },
  pt_eu: { native:'Local', size:'Tamanho', word:'Forma', ipa:'AFI', ipaCol:'AFI / Transcrição', wordCol:'Forma / Transliteração', concept:'Conceito', name:'Nome', onlyCompare:'Só', onlyCompareCol:'Mostrar apenas as línguas da lista de comparação', pins:'Pontos', back:'← LangMap', family:'Família linguística', speakers:'Falantes', countries:'Países', official:'Língua oficial', script:'Escrita', url:'langmap.heuron.com/wordmap.html', modern:'Moderno', historical:'Histórico' },
  pt_br: { native:'Local', size:'Tamanho', word:'Forma', ipa:'AFI', ipaCol:'AFI / Transcrição', wordCol:'Forma / Transliteração', concept:'Conceito', name:'Nome', onlyCompare:'Só', onlyCompareCol:'Mostrar apenas os idiomas da lista de comparação', pins:'Pontos', back:'← LangMap', family:'Família linguística', speakers:'Falantes', countries:'Países', official:'Língua oficial', script:'Escrita', url:'langmap.heuron.com/wordmap.html', modern:'Moderno', historical:'Histórico' },
  ru: { native:'Местный', size:'Размер', word:'Форма', ipa:'МФА', ipaCol:'МФА / Транскрипция', wordCol:'Форма / Транслитерация', concept:'Понятие', name:'Название', onlyCompare:'Только', onlyCompareCol:'Показывать только языки из списка сравнения', pins:'Точки', back:'← LangMap', family:'Языковая семья', speakers:'Носители', countries:'Страны', official:'Официальный', script:'Письменность', url:'langmap.heuron.com/wordmap.html', modern:'Современные', historical:'Исторические' },
  uk: { native:'Місцева', size:'Розмір', word:'Форма', ipa:'МФА', ipaCol:'МФА / Транскрипція', wordCol:'Форма / Транслітерація', concept:'Поняття', name:'Назва', onlyCompare:'Лише', onlyCompareCol:'Показувати лише мови зі списку порівняння', pins:'Точки', back:'← LangMap', family:'Мовна сім\'я', speakers:'Носії', countries:'Країни', official:'Офіційна', script:'Писемність', url:'langmap.heuron.com/wordmap.html', modern:'Сучасні', historical:'Історичні' },
  ar: { native:'محلي', size:'الحجم', word:'كتابة', ipa:'صوتي', ipaCol:'صوتي / نسخ', wordCol:'كتابة / حرفنة', concept:'مفهوم', name:'الاسم', onlyCompare:'المحددة فقط', onlyCompareCol:'إظهار لغات قائمة المقارنة فقط', pins:'نقاط', back:'← LangMap', family:'عائلة اللغة', speakers:'المتحدثون', countries:'البلدان', official:'رسمية في', script:'الخط', url:'langmap.heuron.com/wordmap.html', modern:'حديثة', historical:'تاريخية' },
  he: { native:'מקומי', size:'גודל', word:'כתיב', ipa:'תעתיק', ipaCol:'תעתיק / תמלול', wordCol:'כתיב / תעתיק', concept:'מושג', name:'שם', onlyCompare:'רק אלה', onlyCompareCol:'להציג רק את השפות שברשימת ההשוואה', pins:'נקודות', back:'← LangMap', family:'משפחת שפות', speakers:'דוברים', countries:'מדינות', official:'רשמית ב', script:'כתב', url:'langmap.heuron.com/wordmap.html', modern:'מודרניות', historical:'היסטוריות' },
  sw: { native:'Asili', size:'Ukubwa', word:'Umbo', ipa:'IPA', ipaCol:'IPA / Unukuzi', wordCol:'Umbo / Tafsiri', concept:'Dhana', name:'Jina', onlyCompare:'Zilizochaguliwa', onlyCompareCol:'Onyesha lugha za orodha ya kulinganisha pekee', pins:'Vituo', back:'← LangMap', family:'Familia ya lugha', speakers:'Wasemaji', countries:'Nchi', official:'Rasmi katika', script:'Hati', url:'langmap.heuron.com/wordmap.html', modern:'Kisasa', historical:'Lugha za kihistoria' },
};
const WM_UI_LABELS = { ja:'日本語', ko:'한국어', zh:'中文', yue:'粤语', vi:'Tiếng Việt', th:'ไทย', id:'Indonesia', hi:'हिन्दी', en:'English', de:'Deutsch', fr:'Français', it:'Italiano', es:'Español', pt:'Português', ru:'Русский', uk:'Українська', ar:'العربية', he:'עברית', sw:'Kiswahili' };



// === Lazy-loaded data ===
// Per-language metadata, multilingual descriptions, and meta-attribute translations
// live in wordmap_meta.js. wordmap.html loads it on first modal open.
