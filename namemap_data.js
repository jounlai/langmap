/* ============================================================================
 * namemap_data.js — data for LangMap · NameMap (namemap.html)
 *
 * NameMap visualises how a single given name spread and changed across the
 * world's languages. Same data-shape philosophy as wordmap_data.js:
 *   - NM_LANGS      : the language/country "cells" that can carry a name form
 *                     (name/native/country/lat/lng), analogous to LANG_DATA.
 *   - NM_UI         : UI strings, English + Japanese only for now.
 *   - NM_CATEGORIES : name groupings (biblical / quran / greco-roman / …).
 *   - NAMES         : the names themselves, each with origin, meaning,
 *                     cultural background, a per-cell `forms` table and an
 *                     etymology `tree` (nodes + parent edges = derivation path).
 *   - COUNTRY_PALETTE : shared with wordmap for consistent country tints.
 *
 * Frequency scale (freq): "very-common" | "common" | "moderate" | "rare".
 * Form arrays are objects: { form, rom, ipa, freq, note?, not: people[] }.
 * Etymology node: { label, script?, lang, parent? , note? } keyed by id;
 * the node without a parent is the root.
 * ========================================================================== */

/* Country tints — identical palette to wordmap for a consistent basemap. */
const COUNTRY_PALETTE = [
  'rgba(100,149,237,0.20)', // cornflower blue
  'rgba(144,238,144,0.20)', // light green
  'rgba(250,128,114,0.20)', // salmon
  'rgba(255,255,150,0.20)', // light yellow
  'rgba(221,160,221,0.20)', // plum
  'rgba(175,238,238,0.20)', // pale turquoise
];

/* ---------------------------------------------------------------------------
 * NM_LANGS — the map cells. One representative language per country/region.
 * `country` is what the label shows; `lat/lng` places the marker.
 * ------------------------------------------------------------------------- */
const NM_LANGS = {
  en:  { name:{en:'English',    ja:'英語'},      country:{en:'United States', ja:'アメリカ'},   lat:39.5, lng:-98.4 },
  gb:  { name:{en:'English',    ja:'英語'},      country:{en:'United Kingdom',ja:'イギリス'},   lat:53.0, lng:-1.5 },
  ga:  { name:{en:'Irish',      ja:'アイルランド語'}, country:{en:'Ireland',  ja:'アイルランド'}, lat:53.2, lng:-8.0 },
  fr:  { name:{en:'French',     ja:'フランス語'},  country:{en:'France',      ja:'フランス'},   lat:46.6, lng:2.4 },
  es:  { name:{en:'Spanish',    ja:'スペイン語'},  country:{en:'Spain',       ja:'スペイン'},   lat:40.2, lng:-3.7 },
  mx:  { name:{en:'Spanish',    ja:'スペイン語'},  country:{en:'Mexico',      ja:'メキシコ'},   lat:23.0, lng:-102.0 },
  pt:  { name:{en:'Portuguese', ja:'ポルトガル語'}, country:{en:'Portugal',   ja:'ポルトガル'}, lat:39.6, lng:-8.0 },
  br:  { name:{en:'Portuguese', ja:'ポルトガル語'}, country:{en:'Brazil',     ja:'ブラジル'},   lat:-10.0, lng:-52.0 },
  it:  { name:{en:'Italian',    ja:'イタリア語'},  country:{en:'Italy',       ja:'イタリア'},   lat:42.8, lng:12.8 },
  de:  { name:{en:'German',     ja:'ドイツ語'},   country:{en:'Germany',      ja:'ドイツ'},     lat:51.1, lng:10.4 },
  nl:  { name:{en:'Dutch',      ja:'オランダ語'},  country:{en:'Netherlands', ja:'オランダ'},   lat:52.2, lng:5.5 },
  sv:  { name:{en:'Swedish',    ja:'スウェーデン語'}, country:{en:'Sweden',    ja:'スウェーデン'}, lat:60.5, lng:15.0 },
  no:  { name:{en:'Norwegian',  ja:'ノルウェー語'}, country:{en:'Norway',     ja:'ノルウェー'},  lat:62.0, lng:9.5 },
  fi:  { name:{en:'Finnish',    ja:'フィンランド語'}, country:{en:'Finland',   ja:'フィンランド'}, lat:63.0, lng:26.0 },
  pl:  { name:{en:'Polish',     ja:'ポーランド語'}, country:{en:'Poland',     ja:'ポーランド'},  lat:52.1, lng:19.4 },
  cs:  { name:{en:'Czech',      ja:'チェコ語'},   country:{en:'Czechia',      ja:'チェコ'},     lat:49.8, lng:15.5 },
  hu:  { name:{en:'Hungarian',  ja:'ハンガリー語'}, country:{en:'Hungary',    ja:'ハンガリー'},  lat:47.2, lng:19.5 },
  ro:  { name:{en:'Romanian',   ja:'ルーマニア語'}, country:{en:'Romania',    ja:'ルーマニア'},  lat:45.9, lng:25.0 },
  hr:  { name:{en:'Croatian',   ja:'クロアチア語'}, country:{en:'Croatia',    ja:'クロアチア'},  lat:45.1, lng:15.5 },
  ru:  { name:{en:'Russian',    ja:'ロシア語'},   country:{en:'Russia',       ja:'ロシア'},     lat:55.5, lng:44.0 },
  uk:  { name:{en:'Ukrainian',  ja:'ウクライナ語'}, country:{en:'Ukraine',    ja:'ウクライナ'},  lat:49.0, lng:32.0 },
  el:  { name:{en:'Greek',      ja:'ギリシャ語'},  country:{en:'Greece',      ja:'ギリシャ'},   lat:39.0, lng:22.0 },
  tr:  { name:{en:'Turkish',    ja:'トルコ語'},   country:{en:'Turkey',       ja:'トルコ'},     lat:39.0, lng:35.0 },
  ka:  { name:{en:'Georgian',   ja:'ジョージア語'}, country:{en:'Georgia',    ja:'ジョージア'},  lat:42.0, lng:43.5 },
  hy:  { name:{en:'Armenian',   ja:'アルメニア語'}, country:{en:'Armenia',    ja:'アルメニア'},  lat:40.2, lng:45.0 },
  he:  { name:{en:'Hebrew',     ja:'ヘブライ語'},  country:{en:'Israel',      ja:'イスラエル'},  lat:31.4, lng:35.0 },
  ar:  { name:{en:'Arabic',     ja:'アラビア語'},  country:{en:'Egypt',       ja:'エジプト'},   lat:26.5, lng:30.0 },
  ars: { name:{en:'Arabic',     ja:'アラビア語'},  country:{en:'Saudi Arabia',ja:'サウジアラビア'}, lat:24.0, lng:45.0 },
  fa:  { name:{en:'Persian',    ja:'ペルシア語'},  country:{en:'Iran',        ja:'イラン'},     lat:32.5, lng:53.5 },
  ur:  { name:{en:'Urdu',       ja:'ウルドゥー語'}, country:{en:'Pakistan',   ja:'パキスタン'},  lat:30.0, lng:69.5 },
  hi:  { name:{en:'Hindi',      ja:'ヒンディー語'}, country:{en:'India',      ja:'インド'},     lat:22.5, lng:79.0 },
  bn:  { name:{en:'Bengali',    ja:'ベンガル語'},  country:{en:'Bangladesh',  ja:'バングラデシュ'}, lat:23.7, lng:90.3 },
  am:  { name:{en:'Amharic',    ja:'アムハラ語'},  country:{en:'Ethiopia',    ja:'エチオピア'},  lat:9.5, lng:39.5 },
  sw:  { name:{en:'Swahili',    ja:'スワヒリ語'},  country:{en:'Tanzania',    ja:'タンザニア'},  lat:-6.0, lng:35.0 },
  ha:  { name:{en:'Hausa',      ja:'ハウサ語'},   country:{en:'Nigeria',      ja:'ナイジェリア'}, lat:10.0, lng:8.0 },
  ko:  { name:{en:'Korean',     ja:'韓国語'},     country:{en:'South Korea',  ja:'韓国'},       lat:36.5, lng:127.8 },
  zh:  { name:{en:'Chinese',    ja:'中国語'},     country:{en:'China',        ja:'中国'},       lat:35.0, lng:104.0 },
  ja:  { name:{en:'Japanese',   ja:'日本語'},     country:{en:'Japan',        ja:'日本'},       lat:37.0, lng:138.0 },
  vi:  { name:{en:'Vietnamese', ja:'ベトナム語'},  country:{en:'Vietnam',     ja:'ベトナム'},   lat:16.0, lng:106.5 },
  th:  { name:{en:'Thai',       ja:'タイ語'},     country:{en:'Thailand',     ja:'タイ'},       lat:15.5, lng:101.0 },
  id:  { name:{en:'Indonesian', ja:'インドネシア語'}, country:{en:'Indonesia', ja:'インドネシア'}, lat:-2.0, lng:118.0 },
  ms:  { name:{en:'Malay',      ja:'マレー語'},   country:{en:'Malaysia',     ja:'マレーシア'},  lat:4.0, lng:102.0 },
  fil: { name:{en:'Filipino',   ja:'フィリピノ語'}, country:{en:'Philippines',ja:'フィリピン'},  lat:13.0, lng:122.0 },
};

/* ---------------------------------------------------------------------------
 * NM_UI — interface strings (English + Japanese).
 * ------------------------------------------------------------------------- */
const NM_UI = {
  en: {
    title:'Name Map', tagline:'One name across the world',
    searchPlaceholder:'Search a name…', selectName:'Select a name',
    origin:'Origin', meaning:'Meaning', originScript:'In the original script',
    background:'Background', tree:'Family tree', forms:'Around the world',
    frequency:'Usage', romanization:'Romanization', ipa:'Pronunciation (IPA)',
    region:'Region', notablePeople:'Notable people', close:'Close',
    category:'Category', noForm:'No common form', random:'Random name', details:'Details', simpleDisplay:'Simple display', settings:'Settings', fontSize:'Font size',
    cats:{ biblical:'Biblical', quran:'Qurʼanic', 'greco-roman':'Greek & Roman', hindu:'Hindu / Indic', indigenous:'Regional' },
    freq:{ 'very-common':'Very common', common:'Common', moderate:'Moderate', rare:'Rare' },
    navName:'Name Map', navOrder:'Word Order', navWord:'Word Map', navHan:'HanMap', navTree:'Tree',
    tapCountry:'Tap a country to see its form', of:'form of',
  },
  ja: {
    title:'ネームマップ', tagline:'世界に広がる一つの名前',
    searchPlaceholder:'名前を検索…', selectName:'名前を選ぶ',
    origin:'語源', meaning:'意味', originScript:'原語の表記',
    background:'背景', tree:'系統樹', forms:'世界の対応形',
    frequency:'使用頻度', romanization:'ローマ字表記', ipa:'発音（IPA）',
    region:'使用地域', notablePeople:'著名人', close:'閉じる',
    category:'分類', noForm:'一般的な対応形なし', random:'ランダムな名前', details:'詳細', simpleDisplay:'シンプル表示', settings:'設定', fontSize:'文字サイズ',
    cats:{ biblical:'聖書由来', quran:'コーラン由来', 'greco-roman':'ギリシャ・ローマ由来', hindu:'インド・ヒンドゥー由来', indigenous:'各地固有' },
    freq:{ 'very-common':'非常に多い', common:'多い', moderate:'普通', rare:'少ない' },
    navName:'ネームマップ', navOrder:'語順', navWord:'単語マップ', navHan:'漢字マップ', navTree:'ツリー',
    tapCountry:'国をタップして対応形を表示', of:'の対応形',
  },
};

const NM_CATEGORY_ORDER = ['biblical','quran','greco-roman','hindu','indigenous'];

/* ---------------------------------------------------------------------------
 * NAMES — the dataset. The four entries below are hand-authored and act as the
 * schema reference; further names are appended (see namemap_names_*.js merges
 * or additional NAMES[...] assignments).
 * ------------------------------------------------------------------------- */
const NAMES = {};

/* ===== JOHN (Biblical) — gold-standard reference entry ===================== */
NAMES.john = {
  id:'john', category:'biblical',
  display:{ en:'John', ja:'ヨハネ / ジョン' },
  origin:{
    lang:{ en:'Hebrew', ja:'ヘブライ語' },
    native:'יוֹחָנָן', // יוֹחָנָן
    rom:'Yōḥānān',
    meaning:{ en:'“Yahweh is gracious”', ja:'「ヤハウェは恵み深い」' },
  },
  background:{
    en:'One of the most widespread names on Earth. The Hebrew Yōḥānān, borne by John the Baptist and John the Apostle, entered Greek as Iōánnēs and Latin as Iohannes, then fanned out across Christendom. Western Europe kept the initial J/G (John, Jean, Juan, Giovanni); the Eastern Slavic world reshaped it into Ivan; and the Qurʼan preserves a parallel Arabic form, Yaḥyā, for the same prophet.',
    ja:'地球上で最も広く使われる名前の一つ。ヘブライ語のヨーハーナーン（洗礼者ヨハネ、使徒ヨハネの名）はギリシャ語イオアンネス、ラテン語ヨハンネスを経てキリスト教世界全体に広がった。西欧では語頭のJ/Gを保ち（John, Jean, Juan, Giovanni）、東スラヴ世界ではイヴァンへと変化。コーランは同じ預言者をヤフヤーというアラビア語形で伝える。',
  },
  forms:{
    en:  { form:'John',      rom:'John',       ipa:'dʒɒn',      freq:'very-common', people:['John Lennon','John F. Kennedy','John Locke'] },
    gb:  { form:'John',      rom:'John',       ipa:'dʒɒn',      freq:'very-common', people:['John Milton','John Maynard Keynes'] },
    ga:  { form:'Seán',  rom:'Seán',  ipa:'ʃɔːn',  freq:'common',      people:['Seán Lemass','Seán OʼCasey'] },
    fr:  { form:'Jean',      rom:'Jean',       ipa:'ʒɑ̃',   freq:'common',      people:['Jean-Paul Sartre','Jean Reno'] },
    es:  { form:'Juan',      rom:'Juan',       ipa:'xwan',                freq:'very-common', people:['Juan Carlos I','Juan Perón'] },
    mx:  { form:'Juan',      rom:'Juan',       ipa:'xwan',                freq:'very-common', people:['Juan Rulfo'] },
    pt:  { form:'João', rom:'João',  ipa:'ʒuɐ̃w', freq:'very-common', people:['João Gilberto'] },
    br:  { form:'João', rom:'João',  ipa:'ʒuɐ̃w', freq:'very-common', people:['João Havelange'] },
    it:  { form:'Giovanni',  rom:'Giovanni',   ipa:'dʒoˈvanni',  freq:'common',      people:['Giovanni Boccaccio'] },
    de:  { form:'Johannes',  rom:'Johannes',   ipa:'joˈhanəs',   freq:'common',      note:{en:'short form Hans',ja:'短縮形ハンス'}, people:['Johann Sebastian Bach','Johannes Kepler'] },
    nl:  { form:'Jan',       rom:'Jan',        ipa:'jɑn',            freq:'common',      people:['Jan Steen'] },
    sv:  { form:'Johan',     rom:'Johan',      ipa:'ˈjuːan',    freq:'common',      people:['Johan III'] },
    no:  { form:'Johan',     rom:'Johan',      ipa:'ˈjuːan',    freq:'common' },
    fi:  { form:'Juhani',    rom:'Juhani',     ipa:'ˈjuhɑni',   freq:'common',      note:{en:'also Jussi, Hannu',ja:'ユッシ・ハンヌとも'} },
    pl:  { form:'Jan',       rom:'Jan',        ipa:'jan',                 freq:'very-common', people:['Jan III Sobieski','Jan Matejko'] },
    cs:  { form:'Jan',       rom:'Jan',        ipa:'jan',                 freq:'very-common', people:['Jan Hus'] },
    hu:  { form:'János', rom:'János', ipa:'ˈjaːnoʃ', freq:'common',  people:['János Kádár'] },
    ro:  { form:'Ioan',      rom:'Ioan',       ipa:'iˈo̯an',          freq:'common',      note:{en:'also Ion',ja:'イオンとも'}, people:['Ion Creangă'] },
    hr:  { form:'Ivan',      rom:'Ivan',       ipa:'ˈiʋan',     freq:'very-common', people:['Ivan Gundulić'] },
    ru:  { form:'Иван', rom:'Ivan', ipa:'ɨˈvan', freq:'very-common', people:['Ivan the Terrible','Ivan Turgenev'] },
    uk:  { form:'Іван', rom:'Ivan', ipa:'iˈwɑn', freq:'very-common', people:['Ivan Franko'] },
    el:  { form:'Ιωάννης', rom:'Ioánnis', ipa:'i.oˈa.nis', freq:'very-common', note:{en:'familiar Giannis',ja:'愛称ヤニス'}, people:['Giannis Antetokounmpo'] },
    ka:  { form:'იოანე', rom:'Ioane', ipa:'ioɑne', freq:'moderate' },
    hy:  { form:'Հովհաննես', rom:'Hovhannēs', ipa:'hovhɑnˈnes', freq:'common', people:['Hovhannes Tumanyan'] },
    he:  { form:'יוֹחָנָן', rom:'Yoḥanan', ipa:'joχaˈnan', freq:'moderate', note:{en:'the original',ja:'原形'} },
    ar:  { form:'يوحنا', rom:'Yūḥannā', ipa:'juːˈħan.naː', freq:'moderate', note:{en:'Christian; Islamic Yaḥyā يحيى',ja:'キリスト教形。イスラムではヤフヤー'} },
    fa:  { form:'یحیی', rom:'Yahyā', ipa:'jæhˈjɒː', freq:'common', note:{en:'Qurʼanic prophet',ja:'コーランの預言者'} },
    am:  { form:'ዮሐንስ', rom:'Yoḥannis', ipa:'joˈħannis', freq:'common', people:['Yohannes IV'] },
    ko:  { form:'요한', rom:'Yohan', ipa:'jo.han', freq:'moderate', note:{en:'a real Korean given name (Christian baptismal)',ja:'実在する韓国人の名（キリスト教の洗礼名）'} },
    vi:  { form:'Gioan', rom:'Gioan', ipa:'zawn', freq:'moderate', note:{en:'Catholic',ja:'カトリック'} },
    id:  { form:'Yohanes', rom:'Yohanes', ipa:'joˈhanɛs', freq:'moderate', note:{en:'Christian; Islamic Yahya',ja:'キリスト教形。イスラムはヤヒヤ'} },
    fil: { form:'Juan', rom:'Juan', ipa:'hwan', freq:'very-common', note:{en:'the everyman “Juan dela Cruz”',ja:'国民の代名詞フアン・デラ・クルス'} },
  },
  tree:{
    yohanan:  { label:'Yōḥānān', script:'יוֹחָנָן', lang:{en:'Hebrew',ja:'ヘブライ語'} },
    ioannes:  { label:'Iōánnēs', script:'Ἰωάννης', lang:{en:'Greek',ja:'ギリシャ語'}, parent:'yohanan' },
    iohannes: { label:'Iohannes', lang:{en:'Latin',ja:'ラテン語'}, parent:'ioannes' },
    john:     { label:'John', lang:{en:'English',ja:'英語'}, parent:'iohannes' },
    jean:     { label:'Jean', lang:{en:'French',ja:'フランス語'}, parent:'iohannes' },
    juan:     { label:'Juan', lang:{en:'Spanish',ja:'スペイン語'}, parent:'iohannes' },
    joao:     { label:'João', lang:{en:'Portuguese',ja:'ポルトガル語'}, parent:'iohannes' },
    giovanni: { label:'Giovanni', lang:{en:'Italian',ja:'イタリア語'}, parent:'iohannes' },
    johann:   { label:'Johannes / Hans', lang:{en:'German',ja:'ドイツ語'}, parent:'iohannes' },
    jan:      { label:'Jan', lang:{en:'Dutch / Polish',ja:'オランダ・ポーランド語'}, parent:'iohannes' },
    janos:    { label:'János', lang:{en:'Hungarian',ja:'ハンガリー語'}, parent:'iohannes' },
    ivan:     { label:'Ivan', script:'Иван', lang:{en:'East Slavic',ja:'東スラヴ語'}, parent:'ioannes' },
    ioannis:  { label:'Ioánnis / Giannis', lang:{en:'Modern Greek',ja:'現代ギリシャ語'}, parent:'ioannes' },
    hovhannes:{ label:'Hovhannēs', lang:{en:'Armenian',ja:'アルメニア語'}, parent:'ioannes' },
    yahya:    { label:'Yaḥyā', script:'يحيى', lang:{en:'Arabic (Qurʼan)',ja:'アラビア語（コーラン）'}, parent:'yohanan', note:{en:'parallel Islamic line',ja:'イスラムの並行系統'} },
  },
};

/* ===== MARY (Biblical) ==================================================== */
NAMES.mary = {
  id:'mary', category:'biblical',
  display:{ en:'Mary', ja:'マリア' },
  origin:{
    lang:{ en:'Hebrew', ja:'ヘブライ語' },
    native:'מִרְיָם', // מִרְיָם
    rom:'Miryām',
    meaning:{ en:'Uncertain — “beloved”, “bitterness”, or “wished-for child”', ja:'不明 — 「愛される者」「苦い」「望まれた子」など諸説' },
  },
  background:{
    en:'The name of the mother of Jesus and of Miriam the sister of Moses, and through them one of the most honoured female names in the world. Greek Maria and Latin Maria spread it across every Christian language; the Qurʼan gives Maryam, the only woman named in it, so the name is equally central in the Islamic world.',
    ja:'イエスの母、そしてモーセの姉ミリアムの名。キリスト教世界全体で最も敬われる女性名の一つとなった。ギリシャ語・ラテン語のマリアを経て各言語へ広がり、コーランでは唯一名前で登場する女性マルヤムとして、イスラム世界でも中心的な名前である。',
  },
  forms:{
    en:  { form:'Mary',   rom:'Mary',   ipa:'ˈmɛəri', freq:'very-common', note:{en:'also Maria, Marie',ja:'マリア・マリーとも'}, people:['Mary Shelley','Mary I of England'] },
    fr:  { form:'Marie',  rom:'Marie',  ipa:'maˈʁi',       freq:'very-common', people:['Marie Curie','Marie Antoinette'] },
    es:  { form:'María', rom:'María', ipa:'maˈɾi.a', freq:'very-common', people:['María Zambrano'] },
    mx:  { form:'María', rom:'María', ipa:'maˈɾi.a', freq:'very-common' },
    pt:  { form:'Maria',  rom:'Maria',  ipa:'mɐˈɾiɐ', freq:'very-common' },
    br:  { form:'Maria',  rom:'Maria',  ipa:'maˈɾiɐ', freq:'very-common' },
    it:  { form:'Maria',  rom:'Maria',  ipa:'maˈri.a',          freq:'very-common', people:['Maria Montessori'] },
    de:  { form:'Maria',  rom:'Maria',  ipa:'maˈʁiːa', freq:'very-common' },
    nl:  { form:'Maria',  rom:'Maria',  ipa:'maˈriːja',    freq:'common' },
    pl:  { form:'Maria',  rom:'Maria',  ipa:'ˈmarja',           freq:'very-common', note:{en:'Marzena, Maryla dim.',ja:'愛称マジェナ等'} },
    ru:  { form:'Мария', rom:'Mariya', ipa:'mɐˈrʲijə', freq:'very-common', note:{en:'Masha dim.',ja:'愛称マーシャ'}, people:['Maria Sharapova'] },
    uk:  { form:'Марія', rom:'Mariia', ipa:'mɑˈrʲijɑ', freq:'very-common' },
    el:  { form:'Μαρία', rom:'María', ipa:'maˈri.a', freq:'very-common' },
    he:  { form:'מִרְיָם', rom:'Miryam', ipa:'miʁˈjam', freq:'common', note:{en:'the original',ja:'原形'} },
    ar:  { form:'مريم', rom:'Maryam', ipa:'ˈmar.jam', freq:'very-common', note:{en:'the only woman named in the Qurʼan',ja:'コーランで唯一名前を持つ女性'} },
    fa:  { form:'مریم', rom:'Maryam', ipa:'mærˈjæm', freq:'very-common', people:['Maryam Mirzakhani'] },
    tr:  { form:'Meryem', rom:'Meryem', ipa:'meɾˈjem', freq:'common' },
    ur:  { form:'مریم', rom:'Maryam', ipa:'mərjəm', freq:'common' },
    am:  { form:'ማርያም', rom:'Maryam', ipa:'marjam', freq:'very-common' },
    sw:  { form:'Maryamu', rom:'Maryamu', ipa:'marjamu', freq:'common' },
    ko:  { form:'마리아', rom:'Maria', ipa:'ma.ɾi.a', freq:'moderate', note:{en:'a real Korean given name (Catholic baptismal)',ja:'実在する韓国人の名（カトリックの洗礼名）'} },
    ja:  { form:'真理亜', rom:'Maria', ipa:'maɾia', freq:'rare', note:{en:'a real (modern, marginal) Japanese given name; various kanji e.g. 真理亜 / 万里愛',ja:'実在する日本人の名「まりあ」（真理亜・万里愛など様々な漢字表記）'} },
    vi:  { form:'Maria', rom:'Maria', ipa:'ma˧˧ zi˧˧ a˧˧', freq:'moderate', note:{en:'Catholic',ja:'カトリック'} },
    fil: { form:'Maria', rom:'Maria', ipa:'maˈɾi.a', freq:'very-common', note:{en:'“Maria Clara” ideal',ja:'マリア・クララの理想像'} },
  },
  tree:{
    miryam:  { label:'Miryām', script:'מִרְיָם', lang:{en:'Hebrew',ja:'ヘブライ語'} },
    mariam:  { label:'Mariám', script:'Μαριάμ', lang:{en:'Greek',ja:'ギリシャ語'}, parent:'miryam' },
    maria_la:{ label:'Maria', lang:{en:'Latin',ja:'ラテン語'}, parent:'mariam' },
    mary:    { label:'Mary', lang:{en:'English',ja:'英語'}, parent:'maria_la' },
    marie:   { label:'Marie', lang:{en:'French',ja:'フランス語'}, parent:'maria_la' },
    maria_es:{ label:'María', lang:{en:'Spanish',ja:'スペイン語'}, parent:'maria_la' },
    mariya:  { label:'Mariya', script:'Мария', lang:{en:'Slavic',ja:'スラヴ語'}, parent:'mariam' },
    maryam:  { label:'Maryam', script:'مريم', lang:{en:'Arabic (Qurʼan)',ja:'アラビア語（コーラン）'}, parent:'miryam', note:{en:'parallel Islamic line',ja:'イスラムの並行系統'} },
  },
};

/* ===== MUHAMMAD (Qurʼanic) =========================================== */
NAMES.muhammad = {
  id:'muhammad', category:'quran',
  display:{ en:'Muhammad', ja:'ムハンマド' },
  origin:{
    lang:{ en:'Arabic', ja:'アラビア語' },
    native:'محمد', // محمد
    rom:'Muḥammad',
    meaning:{ en:'“The praised one”, “praiseworthy”', ja:'「称賛される者」' },
  },
  background:{
    en:'The name of the Prophet of Islam, and by many counts the most common given name on Earth. From Arabic muḥammad (root ḥ-m-d, “to praise”) it travelled with Islam into every language of the Muslim world, each reshaping its sounds: Turkish Mehmet, Persian/Urdu Mohammad, Bosnian Muhamed, West African Mamadou, Southeast Asian Muhammad/Mohd.',
    ja:'イスラムの預言者の名であり、地球上で最も多い男性名ともいわれる。アラビア語のムハンマド（語根 ḥ-m-d「称賛する」）はイスラムとともにムスリム世界の各言語へ広がり、それぞれ音を変えた。トルコ語メフメト、ペルシア・ウルドゥー語モハンマド、ボスニア語ムハメド、西アフリカのママドゥ、東南アジアのムハンマド／モハメドなど。',
  },
  forms:{
    ar:  { form:'محمد', rom:'Muḥammad', ipa:'muˈħam.mad', freq:'very-common', note:{en:'the original',ja:'原形'}, people:['Prophet Muhammad'] },
    ars: { form:'محمد', rom:'Muḥammad', ipa:'muˈħam.mad', freq:'very-common' },
    fa:  { form:'محمد', rom:'Mohammad', ipa:'mohæmˈmæd', freq:'very-common' },
    ur:  { form:'محمد', rom:'Muhammad', ipa:'məɦəmməd̪', freq:'very-common', note:{en:'often prefixed to a call-name',ja:'常用名の前に付くことが多い'} },
    tr:  { form:'Mehmet', rom:'Mehmet', ipa:'mehˈmet', freq:'very-common', note:{en:'also Muhammed',ja:'ムハンメドとも'}, people:['Mehmet the Conqueror'] },
    hi:  { form:'मुहम्मद', rom:'Muhammad', ipa:'mʉɦəmməd̪', freq:'common' },
    bn:  { form:'মুহাম্মদ', rom:'Muhammad', ipa:'muɦammɔd̪', freq:'very-common' },
    id:  { form:'Muhammad', rom:'Muhammad', ipa:'muˈhammad', freq:'very-common', note:{en:'also Muhamad, Mohd.',ja:'ムハマド等の綴りも'} },
    ms:  { form:'Muhammad', rom:'Muhammad', ipa:'muˈhammad', freq:'very-common' },
    sw:  { form:'Mohammed', rom:'Mohammed', ipa:'mohamedi', freq:'common' },
    ha:  { form:'Muhammadu', rom:'Muhammadu', ipa:'muhammadu', freq:'very-common', note:{en:'call-forms Mamman, Audu',ja:'愛称ママン・アウドゥ'}, people:['Muhammadu Buhari'] },
    hr:  { form:'Muhamed', rom:'Muhamed', ipa:'ˈmuxamed', freq:'common', note:{en:'Bosnian usage',ja:'ボスニアで使用'} },
    fr:  { form:'Mohamed', rom:'Mohamed', ipa:'mɔamɛd', freq:'common', note:{en:'via North African diaspora',ja:'北アフリカ系移民経由'} },
    gb:  { form:'Muhammad', rom:'Muhammad', ipa:'mʊˈhaməd', freq:'common', note:{en:'a top boysʼ name (all spellings)',ja:'全綴り合算で人気上位'} },
    ru:  { form:'Магомед', rom:'Magomed', ipa:'məɡɐˈmʲet', freq:'common', note:{en:'Caucasus form',ja:'カフカスの形'} },
    zh:  { form:'穆罕默德', rom:'Mùhǎnmòdé', ipa:'mu˥˩xan˨˩˦mo˥˩tɤ˧˥', freq:'moderate', note:{en:'Hui Muslim name',ja:'回族ムスリムの名'} },
    fil: { form:'Mohammad', rom:'Mohammad', ipa:'moˈhammad', freq:'moderate', note:{en:'Moro communities',ja:'モロ人社会'} },
  },
  tree:{
    muhammad_ar:{ label:'Muḥammad', script:'محمد', lang:{en:'Arabic',ja:'アラビア語'} },
    mohammad:   { label:'Mohammad', lang:{en:'Persian / Urdu',ja:'ペルシア・ウルドゥー語'}, parent:'muhammad_ar' },
    mehmet:     { label:'Mehmet', lang:{en:'Turkish',ja:'トルコ語'}, parent:'muhammad_ar' },
    muhamed:    { label:'Muhamed', lang:{en:'Bosnian',ja:'ボスニア語'}, parent:'muhammad_ar' },
    mohamed:    { label:'Mohamed', lang:{en:'Maghrebi / French',ja:'マグレブ・フランス語'}, parent:'muhammad_ar' },
    mamadou:    { label:'Mamadou', lang:{en:'West African',ja:'西アフリカ'}, parent:'muhammad_ar' },
    magomed:    { label:'Magomed', script:'Магомед', lang:{en:'Caucasus',ja:'カフカス'}, parent:'muhammad_ar' },
  },
};

/* ===== ALEXANDER (Greek & Roman) ========================================= */
NAMES.alexander = {
  id:'alexander', category:'greco-roman',
  display:{ en:'Alexander', ja:'アレクサンドロス' },
  origin:{
    lang:{ en:'Greek', ja:'ギリシャ語' },
    native:'Ἀλέξανδρος', // Ἀλέξανδρος
    rom:'Aléxandros',
    meaning:{ en:'“Defender of men” (aléxō “defend” + anḗr “man”)', ja:'「人々を守る者」（aléxō「守る」＋ anḗr「人」）' },
  },
  background:{
    en:'Carried across three continents by Alexander the Great, whose conquests planted the name from Greece to India. Christianity later spread it further through saints and popes. It shortens affectionately almost everywhere — Alex, Sasha, Sander, Xander, Ale, Iskandar — and even entered the Islamic world as Iskandar/Sikandar.',
    ja:'アレクサンドロス大王の遠征により、ギリシャからインドまで三大陸に広まった名。後にキリスト教の聖人・教皇を通じてさらに拡大した。ほぼ全ての言語で愛称化し（Alex, サーシャ, Sander, Xander, Ale, イスカンダル）、イスラム世界にもイスカンダル／シカンダルとして入った。',
  },
  forms:{
    en:  { form:'Alexander', rom:'Alexander', ipa:'ˌælɪɡˈzɑːndə', freq:'very-common', note:{en:'Alex, Xander dim.',ja:'愛称アレックス・ザンダー'}, people:['Alexander Hamilton','Alexander Fleming'] },
    fr:  { form:'Alexandre', rom:'Alexandre', ipa:'alɛksɑ̃dʁ', freq:'common', people:['Alexandre Dumas'] },
    es:  { form:'Alejandro', rom:'Alejandro', ipa:'aleˈxandɾo', freq:'very-common', note:{en:'Ale, Jandro dim.',ja:'愛称アレ・ハンドロ'} },
    pt:  { form:'Alexandre', rom:'Alexandre', ipa:'ɐlɨˈʃɐ̃dɾɨ', freq:'common' },
    it:  { form:'Alessandro', rom:'Alessandro', ipa:'alesˈsandro', freq:'very-common', people:['Alessandro Volta'] },
    de:  { form:'Alexander', rom:'Alexander', ipa:'alɛˈksandɐ', freq:'very-common' },
    ru:  { form:'Александр', rom:'Aleksandr', ipa:'ɐlʲɪˈksandr', freq:'very-common', note:{en:'Sasha, Shura dim.',ja:'愛称サーシャ・シューラ'}, people:['Alexander Pushkin'] },
    uk:  { form:'Олександр', rom:'Oleksandr', ipa:'olekˈsɑndr', freq:'very-common', note:{en:'Sashko dim.',ja:'愛称サシュコ'} },
    el:  { form:'Αλέξανδρος', rom:'Aléxandros', ipa:'aˈleksanðros', freq:'common', note:{en:'the original',ja:'原形'}, people:['Alexander the Great'] },
    pl:  { form:'Aleksander', rom:'Aleksander', ipa:'alɛkˈsandɛr', freq:'common', note:{en:'Olek dim.',ja:'愛称オレク'} },
    hu:  { form:'Sándor', rom:'Sándor', ipa:'ˈʃaːndor', freq:'common', people:['Sándor Petőfi'] },
    nl:  { form:'Alexander', rom:'Alexander', ipa:'ɑlɛkˈsɑndər', freq:'common', note:{en:'Sander dim.',ja:'愛称サンダー'} },
    sv:  { form:'Alexander', rom:'Alexander', ipa:'alɛksˈandɛr', freq:'common' },
    ka:  { form:'ალექსანდრე', rom:'Aleksandre', ipa:'aleksandre', freq:'common', note:{en:'Sandro dim.',ja:'愛称サンドロ'} },
    hy:  { form:'Ալեքսանդր', rom:'Aleksandr', ipa:'aleksandr', freq:'common' },
    ar:  { form:'إسكندر', rom:'Iskandar', ipa:'isˈkandar', freq:'common', note:{en:'via the Alexander Romance',ja:'アレクサンドロス物語経由'} },
    fa:  { form:'اسکندر', rom:'Eskandar', ipa:'esˈkændær', freq:'common' },
    ur:  { form:'سکندر', rom:'Sikandar', ipa:'sɪkəndər', freq:'common' },
    id:  { form:'Iskandar', rom:'Iskandar', ipa:'isˈkandar', freq:'common' },
    ms:  { form:'Iskandar', rom:'Iskandar', ipa:'isˈkandar', freq:'common' },
    hi:  { form:'सिकंदर', rom:'Sikandar', ipa:'sɪkənd̪əɾ', freq:'moderate' },
  },
  tree:{
    alexandros:{ label:'Aléxandros', script:'Ἀλέξανδρος', lang:{en:'Greek',ja:'ギリシャ語'} },
    alexander_la:{ label:'Alexander', lang:{en:'Latin',ja:'ラテン語'}, parent:'alexandros' },
    alexander_en:{ label:'Alexander', lang:{en:'English / German',ja:'英・独語'}, parent:'alexander_la' },
    alexandre: { label:'Alexandre', lang:{en:'French / Portuguese',ja:'仏・葡語'}, parent:'alexander_la' },
    alejandro: { label:'Alejandro', lang:{en:'Spanish',ja:'スペイン語'}, parent:'alexander_la' },
    alessandro:{ label:'Alessandro', lang:{en:'Italian',ja:'イタリア語'}, parent:'alexander_la' },
    aleksandr: { label:'Aleksandr / Sasha', script:'Александр', lang:{en:'Russian',ja:'ロシア語'}, parent:'alexandros' },
    sandor:    { label:'Sándor', lang:{en:'Hungarian',ja:'ハンガリー語'}, parent:'alexander_la' },
    iskandar:  { label:'Iskandar / Sikandar', script:'إسكندر', lang:{en:'Arabic / Persian',ja:'アラビア・ペルシア語'}, parent:'alexandros', note:{en:'Islamic line via the Alexander Romance',ja:'アレクサンドロス物語経由のイスラム系統'} },
  },
};

/* ===== FATIMA (Qurʼanic) ================================================== */
NAMES.fatima = {
  id:'fatima', category:'quran',
  display:{ en:'Fatima', ja:'ファーティマ' },
  origin:{
    lang:{ en:'Arabic', ja:'アラビア語' },
    native:'فاطمة', // فاطمة
    rom:'Fāṭima',
    meaning:{ en:'“One who weans / abstains” (root f-ṭ-m)', ja:'「乳離れさせる者・断つ者」（語根 f-ṭ-m）' },
  },
  background:{
    en:'The name of Fāṭima al-Zahrāʼ, daughter of the Prophet Muhammad and wife of ʿAlī, and thus one of the most honoured female names in Islam — especially in Shia tradition, where she is the mother of the imams. From the Arabic root f-ṭ-m (“to wean”) it spread with Islam and softened along the way: Turkish clips it to Fatma, Persian rounds the ending to Fāṭeme, and South and Southeast Asia keep the fuller Fatimah. In the Balkans it lives on as Fatima with the pet-form Fata.',
    ja:'預言者ムハンマドの娘でありアリーの妻、ファーティマ・アッ＝ザフラーの名。イスラム、とりわけ歴代イマームの母とされるシーア派の伝統で最も敬われる女性名の一つ。アラビア語の語根 f-ṭ-m「乳離れさせる」に由来し、イスラムとともに広がる中で音を変えた。トルコ語では縮めてファトマ、ペルシア語では語尾が丸まってファーテメ、南アジア・東南アジアではより長いファティマ形を保つ。バルカンではファティマ（愛称ファタ）として残る。',
  },
  forms:{
    ar:  { form:'فاطمة', rom:'Fāṭima', ipa:'ˈfaːtˤima', freq:'very-common', note:{en:'the original',ja:'原形'}, people:['Fatimah bint Muhammad','Fatima al-Fihri'] },
    ars: { form:'فاطمة', rom:'Fāṭima', ipa:'ˈfaːtˤima', freq:'very-common' },
    fa:  { form:'فاطمه', rom:'Fāṭeme', ipa:'fɒːteˈme', freq:'very-common', note:{en:'also transliterated Fatemeh',ja:'ファーテメ／Fatemehとも'}, people:['Fatemeh Motamed-Arya'] },
    ur:  { form:'فاطمہ', rom:'Fāṭima', ipa:'faːt̪ɪma', freq:'very-common', people:['Fatima Jinnah'] },
    tr:  { form:'Fatma', rom:'Fatma', ipa:'fatˈma', freq:'very-common', note:{en:'clipped Turkish form; also Fatmagül',ja:'トルコ語の短縮形。ファトマギュルとも'}, people:['Fatma Aliye','Fatma Girik'] },
    hi:  { form:'फ़ातिमा', rom:'Fātimā', ipa:'faːt̪ɪmaː', freq:'common' },
    bn:  { form:'ফাতেমা', rom:'Fatema', ipa:'fatema', freq:'very-common', note:{en:'also ফাতিমা Fatima',ja:'ফাতিমাの綴りも'} },
    id:  { form:'Fatimah', rom:'Fatimah', ipa:'faˈtimah', freq:'common', note:{en:'also Fatima, Siti Fatimah',ja:'ファティマ、シティ・ファティマとも'} },
    ms:  { form:'Fatimah', rom:'Fatimah', ipa:'faˈtimah', freq:'common' },
    ha:  { form:'Fatima', rom:'Fatima', ipa:'faːtima', freq:'very-common', note:{en:'call-form Fati',ja:'愛称ファティ'} },
    sw:  { form:'Fatuma', rom:'Fatuma', ipa:'fɑˈtuma', freq:'common', note:{en:'East African form; also Fatma',ja:'東アフリカ形。ファトマとも'} },
    hr:  { form:'Fatima', rom:'Fatima', ipa:'ˈfatima', freq:'common', note:{en:'Bosnian usage; pet-form Fata',ja:'ボスニアで使用。愛称ファタ'} },
    fr:  { form:'Fatima', rom:'Fatima', ipa:'fatima', freq:'common', note:{en:'via North African diaspora',ja:'北アフリカ系移民経由'} },
    de:  { form:'Fatima', rom:'Fatima', ipa:'ˈfaːtima', freq:'moderate', note:{en:'via Turkish community',ja:'トルコ系社会経由'} },
    gb:  { form:'Fatima', rom:'Fatima', ipa:'ˈfatɪmə', freq:'moderate' },
    zh:  { form:'法蒂玛', rom:'Fǎdìmǎ', ipa:'fa˨˩˦ti˥˩ma˨˩˦', freq:'moderate', note:{en:'Hui Muslim name',ja:'回族ムスリムの名'} },
    fil: { form:'Fatima', rom:'Fatima', ipa:'faˈtima', freq:'moderate', note:{en:'Moro communities; also a Marian toponym',ja:'モロ人社会。聖母の地名としても'} },
  },
  tree:{
    fatima_ar:{ label:'Fāṭima', script:'فاطمة', lang:{en:'Arabic',ja:'アラビア語'} },
    fatma:    { label:'Fatma', lang:{en:'Turkish',ja:'トルコ語'}, parent:'fatima_ar' },
    fateme:   { label:'Fāṭeme', script:'فاطمه', lang:{en:'Persian',ja:'ペルシア語'}, parent:'fatima_ar' },
    fatima_sa:{ label:'Fātima', script:'فاطمہ', lang:{en:'Urdu / South Asian',ja:'ウルドゥー・南アジア'}, parent:'fatima_ar' },
    fatimah_se:{ label:'Fatimah', lang:{en:'Malay / Indonesian',ja:'マレー・インドネシア語'}, parent:'fatima_ar' },
    fatuma:   { label:'Fatuma', lang:{en:'Swahili',ja:'スワヒリ語'}, parent:'fatima_ar' },
    fatima_bs:{ label:'Fatima / Fata', lang:{en:'Bosnian',ja:'ボスニア語'}, parent:'fatima_ar' },
  },
};

/* ===== ALI (Qurʼanic) ==================================================== */
NAMES.ali = {
  id:'ali', category:'quran',
  display:{ en:'Ali', ja:'アリー' },
  origin:{
    lang:{ en:'Arabic', ja:'アラビア語' },
    native:'عليّ', // عليّ
    rom:'ʿAlī',
    meaning:{ en:'“High, exalted, sublime” (root ʿ-l-w)', ja:'「高い・崇高な」（語根 ʿ-l-w）' },
  },
  background:{
    en:'The name of ʿAlī ibn Abī Ṭālib, cousin and son-in-law of the Prophet Muhammad, fourth caliph in Sunni tradition and the first imam of Shia Islam — which makes Ali one of the central names of the Muslim world, and also one of the “beautiful names” as al-ʿAlī is an attribute of God. From Arabic ʿAlī (root ʿ-l-w, “to be high”) the sounds carry almost unchanged across languages: Turkish and Persian Ali, Urdu Ali, Bosnian Alija, West African Aliyu. In the West it is best known through the boxer Muhammad Ali.',
    ja:'預言者ムハンマドの従弟であり娘婿、スンナ派では第4代カリフ、シーア派では初代イマームであるアリー・イブン・アビー・ターリブの名。ムスリム世界の中心的な名前であり、アル＝アリーが神の属性であることから「美しき御名」の一つでもある。アラビア語のアリー（語根 ʿ-l-w「高い」）はほぼ音を変えずに各言語へ広がった。トルコ語・ペルシア語のアリー、ウルドゥー語のアリー、ボスニア語のアリヤ、西アフリカのアリユなど。西洋ではボクサーのモハメド・アリでよく知られる。',
  },
  forms:{
    ar:  { form:'عليّ', rom:'ʿAlī', ipa:'ʕaˈliː', freq:'very-common', note:{en:'the original',ja:'原形'}, people:['Ali ibn Abi Talib'] },
    ars: { form:'علي', rom:'ʿAlī', ipa:'ʕaˈliː', freq:'very-common' },
    fa:  { form:'علی', rom:'Ali', ipa:'ʔæˈliː', freq:'very-common', people:['Ali Khamenei','Ali Daei'] },
    ur:  { form:'علی', rom:'Ali', ipa:'əˈliː', freq:'very-common', note:{en:'honorific Hazrat Ali',ja:'尊称ハズラト・アリー'} },
    tr:  { form:'Ali', rom:'Ali', ipa:'aˈli', freq:'very-common', people:['Ali Kuşçu'] },
    hi:  { form:'अली', rom:'Alī', ipa:'əliː', freq:'common' },
    bn:  { form:'আলী', rom:'Ali', ipa:'ali', freq:'very-common' },
    id:  { form:'Ali', rom:'Ali', ipa:'ˈali', freq:'common', note:{en:'also as element, e.g. Alimuddin',ja:'アリムディン等の構成要素にも'} },
    ms:  { form:'Ali', rom:'Ali', ipa:'ˈali', freq:'common' },
    ha:  { form:'Aliyu', rom:'Aliyu', ipa:'aliju', freq:'very-common', note:{en:'call-form Ali',ja:'愛称アリ'} },
    sw:  { form:'Ali', rom:'Ali', ipa:'ˈali', freq:'common', people:['Ali Hassan Mwinyi'] },
    hr:  { form:'Alija', rom:'Alija', ipa:'ˈalija', freq:'common', note:{en:'Bosnian usage',ja:'ボスニアで使用'}, people:['Alija Izetbegović'] },
    fr:  { form:'Ali', rom:'Ali', ipa:'ali', freq:'common', note:{en:'via North African diaspora',ja:'北アフリカ系移民経由'} },
    de:  { form:'Ali', rom:'Ali', ipa:'ˈali', freq:'moderate', note:{en:'via Turkish community',ja:'トルコ系社会経由'} },
    gb:  { form:'Ali', rom:'Ali', ipa:'ˈali', freq:'moderate' },
    en:  { form:'Ali', rom:'Ali', ipa:'ˈɑːli', freq:'moderate', people:['Muhammad Ali'] },
    zh:  { form:'阿里', rom:'Ālǐ', ipa:'a˥li˨˩˦', freq:'moderate', note:{en:'Hui Muslim name',ja:'回族ムスリムの名'} },
    fil: { form:'Ali', rom:'Ali', ipa:'ˈali', freq:'moderate', note:{en:'Moro communities',ja:'モロ人社会'} },
  },
  tree:{
    ali_ar:  { label:'ʿAlī', script:'عليّ', lang:{en:'Arabic',ja:'アラビア語'} },
    ali_fa:  { label:'Ali', script:'علی', lang:{en:'Persian',ja:'ペルシア語'}, parent:'ali_ar' },
    ali_ur:  { label:'Ali', script:'علی', lang:{en:'Urdu / South Asian',ja:'ウルドゥー・南アジア'}, parent:'ali_ar' },
    ali_tr:  { label:'Ali', lang:{en:'Turkish',ja:'トルコ語'}, parent:'ali_ar' },
    alija:   { label:'Alija', lang:{en:'Bosnian',ja:'ボスニア語'}, parent:'ali_ar' },
    aliyu:   { label:'Aliyu', lang:{en:'Hausa / West African',ja:'ハウサ・西アフリカ'}, parent:'ali_ar' },
    ali_se:  { label:'Ali', lang:{en:'Malay / Indonesian',ja:'マレー・インドネシア語'}, parent:'ali_ar' },
  },
};

/* ===== JOSEPH (Biblical) ================================================== */
NAMES.joseph = {
  id:'joseph', category:'biblical',
  display:{ en:'Joseph', ja:'ヨセフ / ジョセフ' },
  origin:{
    lang:{ en:'Hebrew', ja:'ヘブライ語' },
    native:'יוֹסֵף',
    rom:'Yōsēf',
    meaning:{ en:'“He will add” / “may God add”', ja:'「（神が）加えられますように」' },
  },
  background:{
    en:'The name of the patriarch Joseph, sold into Egypt, and of Saint Joseph, husband of Mary. Hebrew Yōsēf passed through Greek Iōsḗph and Latin Ioseph into every Christian language, contracting to José in Iberia, Giuseppe in Italy and Josef in the German and Slavic worlds. The Qurʼan tells the same patriarchʼs story under the parallel Arabic form Yūsuf, which spread with Islam from West Africa to Indonesia.',
    ja:'エジプトに売られた族長ヨセフ、そしてマリアの夫・聖ヨセフの名。ヘブライ語ヨーセーフはギリシャ語イオーセーフ、ラテン語ヨセフを経てキリスト教世界の各言語へ広まり、イベリアではホセ、イタリアではジュゼッペ、ドイツ・スラヴ圏ではヨーゼフへと縮約した。コーランは同じ族長の物語を並行形ユースフとして伝え、この形は西アフリカからインドネシアまでイスラムとともに広がった。',
  },
  forms:{
    en:  { form:'Joseph', rom:'Joseph', ipa:'ˈdʒoʊzəf', freq:'very-common', note:{en:'Joe, Joey dim.',ja:'愛称ジョー・ジョーイ'}, people:['Joseph Pulitzer','Joseph Smith'] },
    gb:  { form:'Joseph', rom:'Joseph', ipa:'ˈdʒəʊzɪf', freq:'very-common', people:['Joseph Priestley','Joseph Conrad'] },
    ga:  { form:'Seosamh', rom:'Seosamh', ipa:'ˈʃɔsəv', freq:'moderate' },
    fr:  { form:'Joseph', rom:'Joseph', ipa:'ʒozɛf', freq:'common', people:['Joseph Fourier'] },
    es:  { form:'José', rom:'José', ipa:'xoˈse', freq:'very-common', note:{en:'Pepe dim.',ja:'愛称ペペ'}, people:['José de San Martín'] },
    pt:  { form:'José', rom:'José', ipa:'ʒuˈzɛ', freq:'very-common', note:{en:'Zé dim.',ja:'愛称ゼー'}, people:['José Saramago'] },
    it:  { form:'Giuseppe', rom:'Giuseppe', ipa:'dʒuˈzɛppe', freq:'very-common', note:{en:'Beppe, Peppino dim.',ja:'愛称ベッペ・ペッピーノ'}, people:['Giuseppe Verdi','Giuseppe Garibaldi'] },
    de:  { form:'Josef', rom:'Josef', ipa:'ˈjoːzɛf', freq:'common', note:{en:'Bavarian Sepp',ja:'バイエルンの愛称ゼップ'}, people:['Josef Strauss'] },
    pl:  { form:'Józef', rom:'Józef', ipa:'ˈjuzɛf', freq:'common', people:['Józef Piłsudski'] },
    cs:  { form:'Josef', rom:'Josef', ipa:'ˈjozɛf', freq:'common', note:{en:'Pepa dim.',ja:'愛称ペパ'}, people:['Josef Čapek'] },
    hu:  { form:'József', rom:'József', ipa:'ˈjoːʒɛf', freq:'common', people:['József Antall'] },
    hr:  { form:'Josip', rom:'Josip', ipa:'ˈjosip', freq:'common', people:['Josip Broz Tito'] },
    ru:  { form:'Иосиф', rom:'Iosif', ipa:'ɨˈosʲɪf', freq:'moderate', note:{en:'Osip variant',ja:'異形オシプ'}, people:['Iosif Brodsky'] },
    uk:  { form:'Йосип', rom:'Yosyp', ipa:'ˈjɔsɪp', freq:'moderate' },
    el:  { form:'Ιωσήφ', rom:'Iōsíf', ipa:'ioˈsif', freq:'moderate', note:{en:'biblical',ja:'聖書形'} },
    tr:  { form:'Yusuf', rom:'Yusuf', ipa:'juˈsuf', freq:'very-common', note:{en:'Islamic; the Qurʼanic prophet',ja:'イスラム形。コーランの預言者'}, people:['Yusuf İslam'] },
    ka:  { form:'იოსებ', rom:'Ioseb', ipa:'iɔsɛb', freq:'moderate', note:{en:'Soso dim.',ja:'愛称ソソ'} },
    hy:  { form:'Հովսեփ', rom:'Hovsep', ipa:'hovˈsɛpʰ', freq:'moderate', people:['Hovsep Pushman'] },
    he:  { form:'יוֹסֵף', rom:'Yosef', ipa:'joˈsef', freq:'common', note:{en:'the original',ja:'原形'}, people:['Yosef Karo'] },
    ar:  { form:'يوسف', rom:'Yūsuf', ipa:'ˈjuː.suf', freq:'very-common', note:{en:'shared by Christians and Muslims; Qurʼanic prophet',ja:'キリスト教・イスラム共通。コーランの預言者'} },
    fa:  { form:'یوسف', rom:'Yusof', ipa:'juːˈsof', freq:'very-common' },
    am:  { form:'ዮሴፍ', rom:'Yosēf', ipa:'joˈsef', freq:'common' },
    ko:  { form:'요셉', rom:'Yoseb', ipa:'jo.sʌp', freq:'moderate', note:{en:'a real Korean given name (Christian baptismal)',ja:'実在する韓国人の名（キリスト教の洗礼名）'} },
    vi:  { form:'Giuse', rom:'Giuse', ipa:'ziw.sɛ', freq:'moderate', note:{en:'Catholic',ja:'カトリック'} },
    fil: { form:'Jose', rom:'Jose', ipa:'hoˈse', freq:'very-common', people:['José Rizal'] },
  },
  tree:{
    yosef:     { label:'Yōsēf', script:'יוֹסֵף', lang:{en:'Hebrew',ja:'ヘブライ語'} },
    ioseph_gr: { label:'Iōsḗph', script:'Ἰωσήφ', lang:{en:'Greek',ja:'ギリシャ語'}, parent:'yosef' },
    ioseph_la: { label:'Ioseph', lang:{en:'Latin',ja:'ラテン語'}, parent:'ioseph_gr' },
    joseph_en: { label:'Joseph', lang:{en:'English / French',ja:'英・仏語'}, parent:'ioseph_la' },
    jose:      { label:'José', lang:{en:'Spanish / Portuguese',ja:'スペイン・ポルトガル語'}, parent:'ioseph_la' },
    giuseppe:  { label:'Giuseppe', lang:{en:'Italian',ja:'イタリア語'}, parent:'ioseph_la' },
    josef:     { label:'Josef / Józef', lang:{en:'German / West Slavic',ja:'ドイツ・西スラヴ語'}, parent:'ioseph_la' },
    iosif:     { label:'Iosif', script:'Иосиф', lang:{en:'East Slavic',ja:'東スラヴ語'}, parent:'ioseph_gr' },
    yusuf:     { label:'Yūsuf', script:'يوسف', lang:{en:'Arabic (Qurʼan)',ja:'アラビア語（コーラン）'}, parent:'yosef', note:{en:'parallel Islamic line',ja:'イスラムの並行系統'} },
  },
};

/* ===== MICHAEL (Biblical) ================================================= */
NAMES.michael = {
  id:'michael', category:'biblical',
  display:{ en:'Michael', ja:'ミカエル / マイケル' },
  origin:{
    lang:{ en:'Hebrew', ja:'ヘブライ語' },
    native:'מִיכָאֵל',
    rom:'Mīḵāʼēl',
    meaning:{ en:'“Who is like God?”', ja:'「神に似た者が誰かいるだろうか」' },
  },
  background:{
    en:'Originally the name of the archangel Michael, the warrior leader of the heavenly host, whose cult carried the name across all of Christendom. Greek Michaḗl and Latin Michael branched into Michel, Miguel, Michele, Michael and Slavic Mikhail, softening the Hebrew guttural ḵ to a k or h sound along the way. The Qurʼan names the same angel Mīkāʼīl, giving a parallel Islamic form used from Iran to West Africa.',
    ja:'もとは天軍を率いる戦士・大天使ミカエルの名で、その崇敬とともにキリスト教世界全体に広まった。ギリシャ語ミハエル、ラテン語ミカエルからミシェル、ミゲル、ミケーレ、マイケル、スラヴのミハイルへと分かれ、その過程でヘブライ語の喉音ḵはkやhの音へと和らいだ。コーランは同じ天使をミーカーイールと呼び、イランから西アフリカまで用いられる並行イスラム形を生んだ。',
  },
  forms:{
    en:  { form:'Michael', rom:'Michael', ipa:'ˈmaɪkəl', freq:'very-common', note:{en:'Mike, Mikey dim.',ja:'愛称マイク・マイキー'}, people:['Michael Jackson','Michael Faraday'] },
    gb:  { form:'Michael', rom:'Michael', ipa:'ˈmaɪkəl', freq:'very-common', people:['Michael Caine'] },
    ga:  { form:'Mícheál', rom:'Mícheál', ipa:'ˈmʲiːçaːl', freq:'common', people:['Mícheál Martin'] },
    fr:  { form:'Michel', rom:'Michel', ipa:'miʃɛl', freq:'common', people:['Michel Foucault','Michel Platini'] },
    es:  { form:'Miguel', rom:'Miguel', ipa:'miˈɣel', freq:'very-common', note:{en:'Miki dim.',ja:'愛称ミキ'}, people:['Miguel de Cervantes'] },
    pt:  { form:'Miguel', rom:'Miguel', ipa:'miˈɣɛɫ', freq:'very-common' },
    it:  { form:'Michele', rom:'Michele', ipa:'miˈkɛːle', freq:'common', people:['Michele Ferrero'] },
    de:  { form:'Michael', rom:'Michael', ipa:'ˈmɪçaeːl', freq:'very-common', note:{en:'Michi dim.',ja:'愛称ミヒ'}, people:['Michael Schumacher','Michael Ende'] },
    nl:  { form:'Michiel', rom:'Michiel', ipa:'miˈxil', freq:'common', people:['Michiel de Ruyter'] },
    pl:  { form:'Michał', rom:'Michał', ipa:'ˈmixaw', freq:'common', people:['Michał Kalecki'] },
    hu:  { form:'Mihály', rom:'Mihály', ipa:'ˈmihaːj', freq:'common', people:['Mihály Csíkszentmihályi','Mihály Munkácsy'] },
    ro:  { form:'Mihai', rom:'Mihai', ipa:'miˈhaj', freq:'common', people:['Mihai Eminescu'] },
    hr:  { form:'Mihael', rom:'Mihael', ipa:'ˈmixael', freq:'moderate', note:{en:'also Mihovil',ja:'ミホヴィルとも'} },
    ru:  { form:'Михаил', rom:'Mikhail', ipa:'mʲɪxɐˈil', freq:'very-common', note:{en:'Misha dim.',ja:'愛称ミーシャ'}, people:['Mikhail Gorbachev','Mikhail Bulgakov'] },
    uk:  { form:'Михайло', rom:'Mykhailo', ipa:'mɪxɐjˈlɔ', freq:'very-common', people:['Mykhailo Hrushevsky'] },
    el:  { form:'Μιχαήλ', rom:'Michaḗl', ipa:'mixaˈil', freq:'common', note:{en:'familiar Michalis',ja:'愛称ミハリス'} },
    tr:  { form:'Mikail', rom:'Mikail', ipa:'miːkɑˈil', freq:'moderate', note:{en:'Islamic; the Qurʼanic angel',ja:'イスラム形。コーランの天使'} },
    ka:  { form:'მიხეილ', rom:'Mikheil', ipa:'mixɛil', freq:'common', people:['Mikheil Saakashvili'] },
    hy:  { form:'Միքայել', rom:'Mikayel', ipa:'mikʰaˈjɛl', freq:'common' },
    he:  { form:'מִיכָאֵל', rom:'Mikhaʼel', ipa:'mixaˈʔel', freq:'common', note:{en:'the original',ja:'原形'} },
    ar:  { form:'ميكائيل', rom:'Mīkāʼīl', ipa:'miːkaːˈʔiːl', freq:'moderate', note:{en:'the Qurʼanic angel; Christian Mīkhāʼīl ميخائيل',ja:'コーランの天使。キリスト教形はミハーイール'} },
    fa:  { form:'میکائیل', rom:'Mikaʼil', ipa:'miːkɒːˈʔiːl', freq:'moderate' },
    am:  { form:'ሚካኤል', rom:'Mikaʼel', ipa:'mikaˈʔel', freq:'very-common', note:{en:'the archangel is deeply venerated in Ethiopia',ja:'エチオピアで篤く崇敬される大天使'} },
    ko:  { form:'미카엘', rom:'Mikael', ipa:'mi.kʰa.el', freq:'moderate', note:{en:'a real Korean given name (Catholic baptismal; Protestant 미가엘)',ja:'実在する韓国人の名（カトリックの洗礼名。プロテスタントは미가엘）'} },
    fil: { form:'Miguel', rom:'Miguel', ipa:'miˈɡɛl', freq:'common', note:{en:'also Michael directly',ja:'そのままMichaelとも'} },
  },
  tree:{
    mikael_he: { label:'Mīḵāʼēl', script:'מִיכָאֵל', lang:{en:'Hebrew',ja:'ヘブライ語'} },
    michael_gr:{ label:'Michaḗl', script:'Μιχαήλ', lang:{en:'Greek',ja:'ギリシャ語'}, parent:'mikael_he' },
    michael_la:{ label:'Michael', lang:{en:'Latin',ja:'ラテン語'}, parent:'michael_gr' },
    michael_en:{ label:'Michael', lang:{en:'English / German',ja:'英・独語'}, parent:'michael_la' },
    michel:    { label:'Michel', lang:{en:'French',ja:'フランス語'}, parent:'michael_la' },
    miguel:    { label:'Miguel', lang:{en:'Spanish / Portuguese',ja:'スペイン・ポルトガル語'}, parent:'michael_la' },
    michele:   { label:'Michele', lang:{en:'Italian',ja:'イタリア語'}, parent:'michael_la' },
    mihaly:    { label:'Mihály', lang:{en:'Hungarian',ja:'ハンガリー語'}, parent:'michael_la' },
    mikhail:   { label:'Mikhail', script:'Михаил', lang:{en:'East Slavic',ja:'東スラヴ語'}, parent:'michael_gr' },
    mikail:    { label:'Mīkāʼīl', script:'ميكائيل', lang:{en:'Arabic (Qurʼan)',ja:'アラビア語（コーラン）'}, parent:'mikael_he', note:{en:'parallel Islamic line',ja:'イスラムの並行系統'} },
  },
};

/* ===== GEORGE (Greek & Roman) ============================================ */
NAMES.george = {
  id:'george', category:'greco-roman',
  display:{ en:'George', ja:'ゲオルギオス / ジョージ' },
  origin:{
    lang:{ en:'Greek', ja:'ギリシャ語' },
    native:'Γεώργιος',
    rom:'Geṓrgios',
    meaning:{ en:'“Farmer, earth-worker” (gē “earth” + ergon “work”)', ja:'「農夫・大地を耕す者」（gē「大地」＋ ergon「働く」）' },
  },
  background:{
    en:'From Greek Geōrgios, built on geōrgós “farmer, earth-worker”, the name owes its vast reach to Saint George, the dragon-slaying martyr venerated across Christendom and the patron of England, Georgia and Ethiopia. It fans out as Jorge, Giorgio, Georg and Jerzy, and the East Slavic world split it into two living names — the learned Georgy and the everyday Yuri. In the Caucasus it is a national favourite: Georgian Giorgi and Armenian Gevorg.',
    ja:'ギリシャ語ゲオルギオス、geōrgós「農夫・大地を耕す者」に由来する。竜を退治した殉教者・聖ゲオルギオスがキリスト教世界全体で崇敬され、イングランド・ジョージア・エチオピアの守護聖人となったことで広く普及した。ホルヘ、ジョルジョ、ゲオルク、イェジと各地に展開し、東スラヴ世界では学問的なゲオルギーと日常的なユーリーの二つの名に分かれた。カフカスでは国民的人気を誇り、ジョージア語ギオルギ、アルメニア語ゲヴォルグとなる。',
  },
  forms:{
    en:  { form:'George',   rom:'George',   ipa:'dʒɔːrdʒ', freq:'very-common', people:['George Washington','George Gershwin'] },
    gb:  { form:'George',   rom:'George',   ipa:'dʒɔːdʒ',  freq:'very-common', people:['King George VI','George Harrison','George Orwell'] },
    fr:  { form:'Georges',  rom:'Georges',  ipa:'ʒɔʁʒ',    freq:'common',      people:['Georges Bizet','Georges Pompidou'] },
    es:  { form:'Jorge',    rom:'Jorge',    ipa:'ˈxoɾxe',  freq:'very-common', people:['Jorge Manrique','Jorge Semprún'] },
    mx:  { form:'Jorge',    rom:'Jorge',    ipa:'ˈxoɾxe',  freq:'very-common', people:['Jorge Ramos','Jorge Campos'] },
    pt:  { form:'Jorge',    rom:'Jorge',    ipa:'ˈʒɔɾʒɨ',  freq:'common',      people:['Jorge Sampaio'] },
    br:  { form:'Jorge',    rom:'Jorge',    ipa:'ˈʒɔʁʒi',  freq:'common',      people:['Jorge Amado','Jorge Ben Jor'] },
    it:  { form:'Giorgio',  rom:'Giorgio',  ipa:'ˈdʒordʒo', freq:'common',     people:['Giorgio Armani','Giorgio Napolitano'] },
    de:  { form:'Georg',    rom:'Georg',    ipa:'ˈɡeːɔʁk', freq:'common',      note:{en:'also Jürgen',ja:'ユルゲンとも'}, people:['Georg Wilhelm Friedrich Hegel','Georg Cantor'] },
    nl:  { form:'Joris',    rom:'Joris',    ipa:'ˈjoːrɪs', freq:'moderate',    note:{en:'also Sjors',ja:'スヨルスとも'}, people:['Joris Ivens'] },
    sv:  { form:'Georg',    rom:'Georg',    ipa:'ˈɡeːɔrj', freq:'moderate',    note:{en:'native form Örjan',ja:'土着形エリャン'} },
    fi:  { form:'Yrjö',     rom:'Yrjö',     ipa:'ˈyrjø',   freq:'moderate',    people:['Yrjö Väisälä'] },
    pl:  { form:'Jerzy',    rom:'Jerzy',    ipa:'ˈjɛʐɨ',   freq:'common',      note:{en:'Jurek dim.',ja:'愛称ユレク'}, people:['Jerzy Kosiński','Jerzy Grotowski'] },
    cs:  { form:'Jiří',     rom:'Jiří',     ipa:'ˈjɪr̝iː',  freq:'very-common', people:['Jiří z Poděbrad','Jiří Trnka'] },
    hu:  { form:'György',   rom:'György',   ipa:'ˈɟørɟ',   freq:'common',      note:{en:'Gyuri dim.',ja:'愛称ジュリ'}, people:['György Ligeti','György Lukács'] },
    ro:  { form:'Gheorghe', rom:'Gheorghe', ipa:'ˈɟe̯orɡe', freq:'common',     note:{en:'Gigi, Gică dim.',ja:'愛称ジジ・ギカ'}, people:['Gheorghe Hagi','Gheorghe Zamfir'] },
    hr:  { form:'Juraj',    rom:'Juraj',    ipa:'ˈjurai̯',  freq:'common',      note:{en:'also Đuro',ja:'ジュロとも'}, people:['Juraj Dalmatinac'] },
    ru:  { form:'Юрий / Георгий', rom:'Yuri / Georgy', ipa:'ˈjurʲɪj', freq:'very-common', note:{en:'a living doublet — both descend from Georgios; Yegor too',ja:'ユーリーとゲオルギーはともにゲオルギオス由来の二重語。エゴールも'}, people:['Yuri Gagarin','Georgy Zhukov'] },
    uk:  { form:'Юрій',     rom:'Yuriy',    ipa:'ˈjurʲij', freq:'very-common', note:{en:'learned form Heorhiy',ja:'学問的形ヘオルヒー'}, people:['Yuriy Andrukhovych'] },
    el:  { form:'Γεώργιος', rom:'Geórgios', ipa:'ʝeˈorʝios', freq:'very-common', note:{en:'the original; familiar Giorgos',ja:'原形。愛称ヨルゴス'}, people:['Georgios Papanikolaou','Giorgos Seferis'] },
    ka:  { form:'გიორგი',   rom:'Giorgi',   ipa:'ɡiɔrɡi',  freq:'very-common', note:{en:'the most popular name in Georgia',ja:'ジョージアで最も多い名'}, people:['Giorgi Saakadze'] },
    hy:  { form:'Գևորգ',    rom:'Gevorg',   ipa:'ɡɛvɔrɡ',  freq:'common',      note:{en:'Western Armenian Kevork',ja:'西アルメニア語ケヴォルク'}, people:['Gevorg Chaush'] },
    ar:  { form:'جرجس',     rom:'Jirjis',   ipa:'d͡ʒird͡ʒis', freq:'moderate',  note:{en:'Saint George (Mār Jirjis); Christians also use Jūrj جورج',ja:'聖ゲオルギオス（マール・ジルジス）。キリスト教徒はジュルジ جورج も'} },
    am:  { form:'ጊዮርጊስ',   rom:'Giyorgis', ipa:'ɡijorɡis', freq:'common',     note:{en:'St George is a patron of Ethiopia',ja:'聖ゲオルギオスはエチオピアの守護聖人'} },
  },
  tree:{
    georgios:   { label:'Geṓrgios', script:'Γεώργιος', lang:{en:'Greek',ja:'ギリシャ語'} },
    georgius_la:{ label:'Georgius', lang:{en:'Latin',ja:'ラテン語'}, parent:'georgios' },
    george_en:  { label:'George', lang:{en:'English',ja:'英語'}, parent:'georgius_la' },
    georges_fr: { label:'Georges', lang:{en:'French',ja:'フランス語'}, parent:'georgius_la' },
    jorge:      { label:'Jorge', lang:{en:'Spanish / Portuguese',ja:'西・葡語'}, parent:'georgius_la' },
    giorgio:    { label:'Giorgio', lang:{en:'Italian',ja:'イタリア語'}, parent:'georgius_la' },
    georg:      { label:'Georg', lang:{en:'German',ja:'ドイツ語'}, parent:'georgius_la' },
    jerzy:      { label:'Jerzy', lang:{en:'Polish',ja:'ポーランド語'}, parent:'georgius_la' },
    yuri:       { label:'Yuri / Georgy', script:'Юрий', lang:{en:'East Slavic',ja:'東スラヴ語'}, parent:'georgios', note:{en:'a doublet grown from the Greek/Slavic branch',ja:'ギリシャ・スラヴ系統から生じた二重語'} },
    giorgi:     { label:'Giorgi', script:'გიორგი', lang:{en:'Georgian',ja:'ジョージア語'}, parent:'georgios' },
    gevorg:     { label:'Gevorg', script:'Գևորգ', lang:{en:'Armenian',ja:'アルメニア語'}, parent:'georgios' },
  },
};

/* ===== SOPHIA (Greek & Roman) ============================================ */
NAMES.sophia = {
  id:'sophia', category:'greco-roman',
  display:{ en:'Sophia', ja:'ソフィア' },
  origin:{
    lang:{ en:'Greek', ja:'ギリシャ語' },
    native:'Σοφία',
    rom:'Sophía',
    meaning:{ en:'“Wisdom”', ja:'「知恵」' },
  },
  background:{
    en:'Greek sophía means simply “wisdom”, personified as a virtue and enshrined in Constantinople’s great church of Hagia Sophia, “Holy Wisdom”. Carried through Byzantine and Orthodox tradition and borne by empresses and saints, it spread as Sofia, Sophie, Zsófia and Zofia. Today it is one of the most popular girls’ names in the world, topping birth charts across Europe and the Americas; Russian gives it the tender diminutive Sonya.',
    ja:'ギリシャ語ソフィアは文字どおり「知恵」を意味し、美徳として擬人化され、コンスタンティノープルの大聖堂ハギア・ソフィア（「聖なる知恵」）に祀られた。ビザンツ・正教の伝統を通じて皇后や聖人の名として広まり、ソフィア・ソフィー・ジョーフィア・ゾフィアなどの形をとった。今日では世界で最も人気のある女性名の一つで、欧米各国の出生名ランキング上位を占める。ロシア語では愛称ソーニャで親しまれる。',
  },
  forms:{
    en:  { form:'Sophia',  rom:'Sophia',  ipa:'soʊˈfiːə', freq:'very-common', note:{en:'also Sofia, Sophie',ja:'ソフィア・ソフィーの綴りも'}, people:['Sophia Bush'] },
    gb:  { form:'Sophie',  rom:'Sophie',  ipa:'ˈsəʊfi',   freq:'very-common', people:['Sophie Turner','Sophie Ellis-Bextor'] },
    fr:  { form:'Sophie',  rom:'Sophie',  ipa:'sɔˈfi',    freq:'very-common', people:['Sophie Marceau','Sophie Germain'] },
    es:  { form:'Sofía',   rom:'Sofía',   ipa:'soˈfi.a',  freq:'very-common', people:['Queen Sofía of Spain','Sofía Vergara'] },
    mx:  { form:'Sofía',   rom:'Sofía',   ipa:'soˈfi.a',  freq:'very-common' },
    pt:  { form:'Sofia',   rom:'Sofia',   ipa:'suˈfiɐ',   freq:'common' },
    br:  { form:'Sofia',   rom:'Sofia',   ipa:'soˈfiɐ',   freq:'very-common' },
    it:  { form:'Sofia',   rom:'Sofia',   ipa:'soˈfiːa',  freq:'very-common', note:{en:'Sophia Loren kept the Greek spelling',ja:'ソフィア・ローレンは希語綴りを保持'}, people:['Sophia Loren'] },
    de:  { form:'Sophie',  rom:'Sophie',  ipa:'zoˈfiː',   freq:'very-common', note:{en:'also Sofia',ja:'ゾフィアとも'}, people:['Sophie Scholl'] },
    nl:  { form:'Sofie',   rom:'Sofie',   ipa:'soːˈfi',   freq:'common' },
    sv:  { form:'Sofia',   rom:'Sofia',   ipa:'sʊˈfiːa',  freq:'common',      people:['Princess Sofia of Sweden'] },
    fi:  { form:'Sofia',   rom:'Sofia',   ipa:'ˈsofiɑ',   freq:'common' },
    pl:  { form:'Zofia',   rom:'Zofia',   ipa:'ˈzɔfja',   freq:'common',      note:{en:'Zosia dim.',ja:'愛称ゾシャ'}, people:['Zofia Nałkowska'] },
    cs:  { form:'Žofie',   rom:'Žofie',   ipa:'ˈʒofɪjɛ',  freq:'moderate' },
    hu:  { form:'Zsófia',  rom:'Zsófia',  ipa:'ˈʒoːfiɒ',  freq:'common',      note:{en:'Zsófi dim.',ja:'愛称ジョーフィ'} },
    ru:  { form:'София',   rom:'Sofia',   ipa:'sɐˈfʲijə', freq:'very-common', note:{en:'diminutive Sonya / Sonia (Соня)',ja:'愛称ソーニャ（Соня）'}, people:['Sofia Kovalevskaya'] },
    uk:  { form:'Софія',   rom:'Sofiia',  ipa:'soˈfʲijɐ', freq:'very-common' },
    el:  { form:'Σοφία',   rom:'Sofía',   ipa:'soˈfi.a',  freq:'very-common', note:{en:'the original',ja:'原形'} },
    ka:  { form:'სოფიო',   rom:'Sopio',   ipa:'sɔpʰiɔ',   freq:'common',      note:{en:'Georgian form',ja:'ジョージア語形'} },
    ar:  { form:'صوفيا',   rom:'Ṣūfiyā',  ipa:'sˤuːˈfijaː', freq:'moderate',  note:{en:'transliteration',ja:'音訳'} },
    ko:  { form:'소피아',  rom:'Sopia',   ipa:'so.pʰi.a', freq:'moderate',    note:{en:'a real Korean given name (Catholic/Orthodox baptismal)',ja:'実在する韓国人の名（カトリック・正教の洗礼名）'} },
  },
  tree:{
    sophia_gr: { label:'Sophía', script:'Σοφία', lang:{en:'Greek',ja:'ギリシャ語'} },
    sophia_la: { label:'Sophia', lang:{en:'Latin',ja:'ラテン語'}, parent:'sophia_gr' },
    sophia_en: { label:'Sophia', lang:{en:'English',ja:'英語'}, parent:'sophia_la' },
    sophie_fr: { label:'Sophie', lang:{en:'French',ja:'フランス語'}, parent:'sophia_la' },
    sofia_ro:  { label:'Sofia / Sofía', lang:{en:'Italian / Spanish',ja:'伊・西語'}, parent:'sophia_la' },
    sophie_de: { label:'Sophie', lang:{en:'German',ja:'ドイツ語'}, parent:'sophia_la' },
    zofia:     { label:'Zofia', lang:{en:'Polish',ja:'ポーランド語'}, parent:'sophia_la' },
    zsofia:    { label:'Zsófia', lang:{en:'Hungarian',ja:'ハンガリー語'}, parent:'sophia_la' },
    sofiya:    { label:'Sofia / Sonya', script:'София', lang:{en:'East Slavic',ja:'東スラヴ語'}, parent:'sophia_gr' },
    sopio:     { label:'Sopio', script:'სოფიო', lang:{en:'Georgian',ja:'ジョージア語'}, parent:'sophia_gr' },
  },
};

/* ===== KRISHNA (Hindu / Indic) =========================================== */
NAMES.krishna = {
  id:'krishna', category:'hindu',
  display:{ en:'Krishna', ja:'クリシュナ' },
  origin:{
    lang:{ en:'Sanskrit', ja:'サンスクリット' },
    native:'कृष्ण',
    rom:'Kṛṣṇa',
    meaning:{ en:'“Dark, black” (of the deityʼs blue-black complexion)', ja:'「黒い・暗い」（神の青黒い肌の色に由来）' },
  },
  background:{
    en:'Krishna is the eighth avatar of Vishnu and one of the most beloved deities of Hinduism — the flute-playing cowherd of Vrindavan and the charioteer-sage of the Bhagavad Gita. The Sanskrit kṛṣṇa literally means “dark, black”, describing his complexion, and yields tender by-forms such as Kanha and Tamil Kannan. As a given name it is common across India and the whole Hindu diaspora; its Southeast-Asian spread runs through the wayang shadow-theatre and the Mahabharata.',
    ja:'クリシュナはヴィシュヌ神の第八の化身で、ヒンドゥー教で最も愛される神格の一つ。ヴリンダーヴァンで笛を吹く牛飼いであり、『バガヴァッド・ギーター』で御者として賢者アルジュナを導く。サンスクリットのクリシュナは文字どおり「黒い・暗い」を意味し、その肌の色を表すとともに、カーナ（Kanha）やタミル語のカンナン（Kannan）といった親しみを込めた形を生んだ。人名としてインド全域とヒンドゥー系ディアスポラで広く使われ、東南アジアへはワヤン影絵劇とマハーバーラタを通じて広がった。',
  },
  forms:{
    en:  { form:'Krishna', rom:'Krishna', ipa:'ˈkrɪʃnə', freq:'common', note:{en:'international / diaspora romanization',ja:'国際・ディアスポラのローマ字形'}, people:['Krishna Das'] },
    gb:  { form:'Krishna', rom:'Krishna', ipa:'ˈkrɪʃnə', freq:'moderate', note:{en:'Hindu communities; Hare Krishna movement',ja:'ヒンドゥー系社会。ハレ・クリシュナ運動'} },
    hi:  { form:'कृष्ण', rom:'Kṛṣṇa', ipa:'ˈkr̩ʂɳə', freq:'very-common', note:{en:'the original; pet-form Kanha कान्हा',ja:'原形。愛称カーナ कान्हा'}, people:['Ghattamaneni Krishna','Prasidh Krishna'] },
    bn:  { form:'কৃষ্ণ', rom:'Krishno', ipa:'ˈkriʃno', freq:'common' },
    ur:  { form:'کرشن', rom:'Krishan', ipa:'ˈkɪrʃən', freq:'moderate', note:{en:'Hindu name; Muslim contexts do not use it',ja:'ヒンドゥー教徒の名。ムスリム社会では使われない'} },
    th:  { form:'กฤษณะ', rom:'Kritsana', ipa:'krìt.sà.náʔ', freq:'moderate', note:{en:'from the deity Krishna; also the boysʼ name Krit',ja:'クリシュナ神に由来。男子名クリットの形も'} },
    id:  { form:'Krisna', rom:'Krisna', ipa:'ˈkrɪsna', freq:'common', note:{en:'Javanese/Balinese Kresna, the wayang hero',ja:'ジャワ・バリのクレスナ。ワヤンの英雄'} },
    ms:  { form:'Krishna', rom:'Krishna', ipa:'ˈkrɪʃna', freq:'moderate', note:{en:'Malaysian-Indian Hindu communities',ja:'マレーシア系インド人ヒンドゥー社会'} },
  },
  tree:{
    krsna:    { label:'Kṛṣṇa', script:'कृष्ण', lang:{en:'Sanskrit',ja:'サンスクリット'} },
    kanha:    { label:'Kanha / Kānhā', script:'कान्हा', lang:{en:'Hindi (pet-form)',ja:'ヒンディー語（愛称）'}, parent:'krsna' },
    kannan:   { label:'Kaṇṇan', lang:{en:'Prakrit / Tamil',ja:'プラークリット・タミル語'}, parent:'krsna', note:{en:'via Pali kaṇha “dark”',ja:'パーリ語カンハ「黒」経由'} },
    krishno:  { label:'Krishno', script:'কৃষ্ণ', lang:{en:'Bengali',ja:'ベンガル語'}, parent:'krsna' },
    kresna:   { label:'Kresna / Krisna', lang:{en:'Javanese / Indonesian',ja:'ジャワ・インドネシア語'}, parent:'krsna', note:{en:'via the wayang / Mahabharata tradition',ja:'ワヤン／マハーバーラタの伝統による'} },
    kritsana: { label:'Kritsana', script:'กฤษณะ', lang:{en:'Thai',ja:'タイ語'}, parent:'krsna' },
    krishna_int:{ label:'Krishna', lang:{en:'International romanization',ja:'国際ローマ字形'}, parent:'krsna' },
  },
};

/* ===== RAMA (Hindu / Indic) ============================================== */
NAMES.rama = {
  id:'rama', category:'hindu',
  display:{ en:'Rama', ja:'ラーマ' },
  origin:{
    lang:{ en:'Sanskrit', ja:'サンスクリット' },
    native:'राम',
    rom:'Rāma',
    meaning:{ en:'“Pleasing, charming, delightful” (root ram- “to please, delight”)', ja:'「快い・魅力的な・喜ばせる」（語根 ram-「喜ばせる」）' },
  },
  background:{
    en:'Rama is an avatar of Vishnu and the hero of the Ramayana, the ideal king of Ayodhya whose story is among the most retold in the world. The Sanskrit rāma means “pleasing, charming”. Above all it was the epic that carried the name across Southeast Asia: the Thai kings of the Chakri dynasty all take the regnal name Rama, Ayutthaya itself was named after Ramaʼs birthplace Ayodhya, and Rama lives on in the Cambodian Reamker (as Preah Ream), the Javanese and Balinese wayang, and the Lao Phra Lak Phra Ram.',
    ja:'ラーマはヴィシュヌ神の化身であり、叙事詩『ラーマーヤナ』の主人公。アヨーディヤーの理想の王で、その物語は世界で最も繰り返し語られる物語の一つである。サンスクリットのラーマは「快い・魅力的な」を意味する。とりわけこの叙事詩が名を東南アジア全域へ運んだ——タイのチャクリー朝の歴代王はみな「ラーマ」を王号とし、アユタヤという都名もラーマの生地アヨーディヤーに由来する。ラーマはカンボジアの『リアムケー』（プレア・リアム）、ジャワ・バリのワヤン、ラオスの『プラ・ラク・プラ・ラム』にも生き続けている。',
  },
  forms:{
    en:  { form:'Rama', rom:'Rama', ipa:'ˈrɑːmə', freq:'moderate', note:{en:'international / diaspora romanization',ja:'国際・ディアスポラのローマ字形'} },
    gb:  { form:'Rama', rom:'Rama', ipa:'ˈrɑːmə', freq:'moderate', note:{en:'Hindu communities',ja:'ヒンドゥー系社会'} },
    hi:  { form:'राम', rom:'Rām', ipa:'raːm', freq:'very-common', note:{en:'the original; countless compounds (Ramesh, Ramkumar)',ja:'原形。複合名多数（ラメーシュ、ラームクマール）'}, people:['Ram Nath Kovind'] },
    bn:  { form:'রাম', rom:'Ram', ipa:'ram', freq:'common' },
    ur:  { form:'رام', rom:'Ram', ipa:'raːm', freq:'moderate', note:{en:'Hindu name; not used in Muslim contexts',ja:'ヒンドゥー教徒の名。ムスリム社会では使わない'} },
    th:  { form:'พระราม', rom:'Phra Ram', ipa:'pʰráʔ raːm', freq:'common', note:{en:'Thai kings all reign as “Rama”',ja:'タイの歴代王はみな王号「ラーマ」を名乗る'}, people:['Rama IX (Bhumibol)','Rama X (Vajiralongkorn)'] },
    id:  { form:'Rama', rom:'Rama', ipa:'ˈrama', freq:'common', note:{en:'via the Ramayana / wayang; Javanese hero',ja:'ラーマーヤナ／ワヤン経由。ジャワの英雄'} },
    ms:  { form:'Rama', rom:'Rama', ipa:'ˈrama', freq:'moderate', note:{en:'Malay Hikayat Seri Rama tradition',ja:'マレーの『ヒカヤット・スリ・ラーマ』の伝統'} },
  },
  tree:{
    rama:     { label:'Rāma', script:'राम', lang:{en:'Sanskrit',ja:'サンスクリット'} },
    ram_hi:   { label:'Rām', script:'राम', lang:{en:'Hindi / Urdu',ja:'ヒンディー・ウルドゥー語'}, parent:'rama' },
    ram_bn:   { label:'Ram', script:'রাম', lang:{en:'Bengali',ja:'ベンガル語'}, parent:'rama' },
    phraram:  { label:'Phra Ram / Rama', script:'พระราม', lang:{en:'Thai',ja:'タイ語'}, parent:'rama', note:{en:'spread via the Ramayana epic',ja:'ラーマーヤナ叙事詩による伝播'} },
    ream:     { label:'Preah Ream', lang:{en:'Khmer (Reamker)',ja:'クメール語（リアムケー）'}, parent:'rama' },
    rama_id:  { label:'Rama', lang:{en:'Javanese / Indonesian',ja:'ジャワ・インドネシア語'}, parent:'rama' },
    rama_int: { label:'Rama', lang:{en:'International romanization',ja:'国際ローマ字形'}, parent:'rama' },
  },
};

/* Expose the corpus to the page. */
if (typeof window !== 'undefined') {
  window.NM_LANGS = NM_LANGS;
  window.NM_UI = NM_UI;
  window.NM_CATEGORY_ORDER = NM_CATEGORY_ORDER;
  window.NAMES = NAMES;
  window.COUNTRY_PALETTE = COUNTRY_PALETTE;
}
