/*
 * meta_i18n_coverage3.js — third meta-i18n coverage batch (family sub-branches).
 *
 * Adds ATOM translations for prominent family / sub-branch names that were
 * still rendering in English across UI languages (most visible in the family
 * tree: Ryukyuan, Tibetic, Cariban, Otomanguean, …). Loaded AFTER
 * meta_i18n_coverage2.js; merges into META_I18N_ATOMS so both wordmap.html and
 * tree.html pick them up via translateMetaSmart. Object.assign-style: later
 * wins. es→es_eu/es_mx and pt→pt_eu/pt_br mirrored for the regional UIs.
 */
(function () {
  if (typeof META_I18N_ATOMS === 'undefined') return;
  const LANGS = ["ja","ko","zh","yue","vi","th","id","hi","de","fr","it","es","pt","ru","uk","ar","he","sw"];
  const A = {
    "Ryukyuan": {ja:"琉球諸語",ko:"류큐어파",zh:"琉球语",yue:"琉球語",vi:"nhóm Ryukyu",th:"กลุ่มภาษาริวกิว",id:"Ryukyu",hi:"रयूक्यू",de:"Ryūkyū",fr:"ryukyu",it:"ryukyu",es:"ryukyuense",pt:"riquiuana",ru:"рюкюские",uk:"рюкюські",ar:"الريوكيوية",he:"ריוקיו",sw:"Kiryukyu"},
    "Tibetic": {ja:"チベット諸語",ko:"티베트어군",zh:"藏语群",yue:"藏語群",vi:"nhóm Tạng",th:"กลุ่มภาษาทิเบต",id:"Tibetik",hi:"तिब्बती समूह",de:"tibetisch",fr:"tibétique",it:"tibetico",es:"tibético",pt:"tibético",ru:"тибетские",uk:"тибетські",ar:"التبتية",he:"טיבטי",sw:"Kitibeti"},
    "Qiangic": {ja:"チャン諸語",ko:"창어군",zh:"羌语支",yue:"羌語支",vi:"nhóm Khương",th:"กลุ่มภาษาเชียง",id:"Qiang",hi:"छ्यांगी",de:"qiangisch",fr:"qianguique",it:"qiangico",es:"qiángico",pt:"qiângico",ru:"цянские",uk:"цянські",ar:"التشيانغية",he:"צ'יאנגי",sw:"Kiqiang"},
    "Cariban": {ja:"カリブ語族",ko:"카리브어족",zh:"加勒比语系",yue:"加勒比語系",vi:"ngữ hệ Carib",th:"ตระกูลภาษาการิบ",id:"Karibia",hi:"कैरिबन",de:"karibisch",fr:"caribe",it:"caribico",es:"caribe",pt:"caribe",ru:"карибские",uk:"карибські",ar:"الكاريبية",he:"קאריבי",sw:"Kikariban"},
    "Otomanguean": {ja:"オト・マンゲ語族",ko:"오토망게어족",zh:"奥托曼格语系",yue:"奧托曼格語系",vi:"ngữ hệ Oto-Mangue",th:"ตระกูลภาษาโอโตมันเก",id:"Oto-Mangue",hi:"ओटोमांगीयन",de:"otomanguisch",fr:"oto-mangue",it:"otomangue",es:"otomangue",pt:"otomangue",ru:"отомангские",uk:"отомангські",ar:"الأوتومانغية",he:"אוטומנגי",sw:"Kioto-Mangue"},
    "Indo-Iranian": {ja:"インド・イラン語派",ko:"인도이란어파",zh:"印度-伊朗语族",yue:"印度-伊朗語族",vi:"nhánh Ấn-Iran",th:"สาขาอินโด-อิเรเนียน",id:"Indo-Iran",hi:"भारत-ईरानी",de:"indoiranisch",fr:"indo-iranien",it:"indoiranico",es:"indoiranio",pt:"indo-iraniano",ru:"индоиранские",uk:"індоіранські",ar:"الهندوإيرانية",he:"הודו-איראני",sw:"Kihindi-Irani"},
    "Finno-Ugric": {ja:"フィン・ウゴル語派",ko:"핀우그리아어파",zh:"芬兰-乌戈尔语族",yue:"芬蘭-烏戈爾語族",vi:"nhánh Finn-Ugor",th:"สาขาฟินโน-อูกริก",id:"Finno-Ugrik",hi:"फ़िनो-उग्रिक",de:"finno-ugrisch",fr:"finno-ougrien",it:"ugrofinnico",es:"fino-úgrico",pt:"fino-úgrico",ru:"финно-угорские",uk:"фіно-угорські",ar:"الفنلندية الأوغرية",he:"פינו-אוגרי",sw:"Kifinno-Ugric"},
    "Northeast Caucasian": {ja:"北東コーカサス語族",ko:"북동캅카스어족",zh:"东北高加索语系",yue:"東北高加索語系",vi:"ngữ hệ Đông Bắc Kavkaz",th:"ตระกูลภาษาคอเคซัสตะวันออกเฉียงเหนือ",id:"Kaukasus Timur Laut",hi:"पूर्वोत्तर कॉकेशियाई",de:"nordostkaukasisch",fr:"caucasien du nord-est",it:"caucasico nordorientale",es:"caucásico nororiental",pt:"caucasiano do nordeste",ru:"нахско-дагестанские",uk:"нахсько-дагестанські",ar:"القوقازية الشمالية الشرقية",he:"קווקזי צפון-מזרחי",sw:"Kikaukasi cha Kaskazini-Mashariki"},
    "Albanian": {ja:"アルバニア語派",ko:"알바니아어파",zh:"阿尔巴尼亚语族",yue:"阿爾巴尼亞語族",vi:"nhánh Albania",th:"สาขาแอลเบเนีย",id:"Albania",hi:"अल्बानियाई",de:"albanisch",fr:"albanais",it:"albanese",es:"albanés",pt:"albanês",ru:"албанские",uk:"албанські",ar:"الألبانية",he:"אלבני",sw:"Kialbania"},
    "Egyptian": {ja:"エジプト語派",ko:"이집트어파",zh:"埃及语族",yue:"埃及語族",vi:"nhánh Ai Cập",th:"สาขาอียิปต์",id:"Mesir",hi:"मिस्री",de:"ägyptisch",fr:"égyptien",it:"egizio",es:"egipcio",pt:"egípcio",ru:"египетские",uk:"єгипетські",ar:"المصرية",he:"מצרי",sw:"Kimisri"},
    "Kurdish": {ja:"クルド語",ko:"쿠르드어",zh:"库尔德语",yue:"庫爾德語",vi:"tiếng Kurd",th:"ภาษาเคิร์ด",id:"Kurdi",hi:"कुर्दी",de:"kurdisch",fr:"kurde",it:"curdo",es:"kurdo",pt:"curdo",ru:"курдские",uk:"курдські",ar:"الكردية",he:"כורדי",sw:"Kikurdi"},
    "High German": {ja:"高地ドイツ語",ko:"고지 독일어",zh:"高地德语",yue:"高地德語",vi:"tiếng Đức thượng",th:"เยอรมันสูง",id:"Jerman Hulu",hi:"उच्च जर्मन",de:"Hochdeutsch",fr:"haut-allemand",it:"alto-tedesco",es:"alto alemán",pt:"alto-alemão",ru:"верхненемецкие",uk:"верхньонімецькі",ar:"الألمانية العليا",he:"גרמנית עילית",sw:"Kijerumani cha Juu"},
    "Low German": {ja:"低地ドイツ語",ko:"저지 독일어",zh:"低地德语",yue:"低地德語",vi:"tiếng Đức hạ",th:"เยอรมันต่ำ",id:"Jerman Hilir",hi:"निम्न जर्मन",de:"Niederdeutsch",fr:"bas-allemand",it:"basso-tedesco",es:"bajo alemán",pt:"baixo-alemão",ru:"нижненемецкие",uk:"нижньонімецькі",ar:"الألمانية الدنيا",he:"גרמנית תחתית",sw:"Kijerumani cha Chini"},
    "Ibero-Romance": {ja:"イベロ・ロマンス語群",ko:"이베리아로망스어군",zh:"伊比利亚罗曼语支",yue:"伊比利亞羅曼語支",vi:"nhóm Rôman Iberia",th:"กลุ่มโรมานซ์ไอบีเรีย",id:"Roman Iberia",hi:"इबेरो-रोमांस",de:"iberoromanisch",fr:"ibéro-roman",it:"iberoromanzo",es:"iberorromance",pt:"ibero-romance",ru:"иберо-романские",uk:"іберо-романські",ar:"الرومانسية الأيبيرية",he:"איברו-רומאני",sw:"Kiromance cha Iberia"},
    "Vietnamese": {ja:"ベトナム語",ko:"베트남어",zh:"越南语",yue:"越南語",vi:"tiếng Việt",th:"ภาษาเวียดนาม",id:"Vietnam",hi:"वियतनामी",de:"vietnamesisch",fr:"vietnamien",it:"vietnamita",es:"vietnamita",pt:"vietnamita",ru:"вьетнамский",uk:"в'єтнамська",ar:"الفيتنامية",he:"וייטנאמית",sw:"Kivietinamu"},
    "Manchu-Tungus": {ja:"満洲・ツングース語派",ko:"만주퉁구스어파",zh:"满-通古斯语族",yue:"滿-通古斯語族",vi:"nhánh Mãn-Tungus",th:"สาขาแมนจู-ตุงกุส",id:"Manchu-Tungus",hi:"मंचू-तुंगुस",de:"mandschu-tungusisch",fr:"mandchou-toungouse",it:"manciù-tunguso",es:"manchú-tungús",pt:"manchu-tungúsico",ru:"тунгусо-маньчжурские",uk:"тунгусо-маньчжурські",ar:"المانشو-التنغوسية",he:"מנצ'ו-טונגוסי",sw:"Kimanchu-Tungus"},
    "Siberian": {ja:"シベリア諸語",ko:"시베리아 제어",zh:"西伯利亚语群",yue:"西伯利亞語群",vi:"nhóm Siberia",th:"กลุ่มไซบีเรีย",id:"Siberia",hi:"साइबेरियाई",de:"sibirisch",fr:"sibérien",it:"siberiano",es:"siberiano",pt:"siberiano",ru:"сибирские",uk:"сибірські",ar:"السيبيرية",he:"סיביר",sw:"Kisiberia"},
  };
  const dup = { es_eu:"es", es_mx:"es", pt_eu:"pt", pt_br:"pt" };
  for (const [term, tr] of Object.entries(A)) {
    for (const lang of LANGS) {
      if (!tr[lang]) continue;
      if (!META_I18N_ATOMS[lang]) META_I18N_ATOMS[lang] = {};
      META_I18N_ATOMS[lang][term] = tr[lang];
    }
    for (const [rl, base] of Object.entries(dup)) {
      if (!tr[base]) continue;
      if (!META_I18N_ATOMS[rl]) META_I18N_ATOMS[rl] = {};
      META_I18N_ATOMS[rl][term] = tr[base];
    }
  }
})();

/*
 * Batch 4 — the long tail translateMetaSmart still left in English.
 *
 * Measured rather than guessed at: with ja as the UI, 207 of ~5,645 metadata
 * field-instances still had 15+ characters of English in them after the first
 * three batches. Most of that was one-off proper nouns — Wyoming, Mopti
 * region, Six Nations of the Grand River — each appearing in exactly one row,
 * plus the status vocabulary ("dormant", "vibrant", "declining") and the
 * "X is the official language" frames introduced by the official-field pass.
 *
 * Produced by nine parallel translators, one per pair of UI languages, then
 * filtered here: an entry is dropped if it echoes the English back (a term
 * that is conventionally left in the Latin alphabet does not need a dictionary
 * entry) or if the term does not actually occur in the metadata corpus.
 */
(function () {
  if (typeof META_I18N_ATOMS === 'undefined') return;
  const LANGS = ["ja","ko","zh","yue","vi","th","id","hi","de","fr","it","es","pt","ru","uk","ar","he","sw"];
  const A = {
    "20-letter basic set": {ja:"20文字の基本セット",ko:"20자 기본 세트",zh:"20个字母的基本字母表",yue:"20個字母嘅基本字母表",vi:"bộ cơ bản 20 chữ cái",th:"ชุดพื้นฐาน 20 ตัวอักษร",id:"set dasar 20 huruf",hi:"20 अक्षरों का मूल समुच्चय",de:"Grundbestand von 20 Buchstaben",fr:"jeu de base de 20 lettres",it:"set base di 20 lettere",es:"conjunto básico de 20 letras",pt:"conjunto básico de 20 letras",ru:"базовый набор из 20 букв",uk:"базовий набір із 20 літер",ar:"مجموعة أساسية من 20 حرفًا",he:"מערכת בסיסית של 20 אותיות",sw:"seti ya msingi ya herufi 20"},
    "Active Han-Nôm scholarly use": {ja:"漢喃研究で活発に使用",ko:"한놈 학술 연구에서 활발히 사용",zh:"汉喃学术研究仍活跃",yue:"漢喃學術研究仍活躍",vi:"Đang được dùng trong nghiên cứu Hán-Nôm",id:"Penggunaan akademis Han-Nôm yang aktif",hi:"हान-नोम का सक्रिय विद्वत्तापूर्ण उपयोग",de:"Aktiver wissenschaftlicher Han-Nôm-Gebrauch",fr:"Usage savant actif du Han-Nôm",it:"Uso erudito attivo del Han-Nôm",es:"Uso académico activo del Han-Nôm",pt:"Uso acadêmico ativo do Hán-Nôm",uk:"Активне наукове використання ханному",he:"שימוש מחקרי פעיל בהאן-נום",sw:"Matumizi hai ya kitaaluma ya Han-Nôm"},
    "Active liturgical": {zh:"礼仪中活跃使用",yue:"禮儀中活躍使用",vi:"Đang dùng trong phụng vụ",th:"ใช้ในพิธีกรรมอยู่",id:"Liturgis aktif",pt:"Uso litúrgico ativo",ru:"Активное литургическое использование",he:"ליטורגי פעיל",sw:"Kiliturujia hai"},
    "Active liturgical + pedagogical use": {ja:"典礼・教育目的で活発に使用",ko:"전례 및 교육 목적으로 활발히 사용",zh:"礼仪及教学中活跃使用",yue:"禮儀及教學中活躍使用",vi:"Đang dùng trong phụng vụ và giảng dạy",th:"ใช้ในพิธีกรรมและการเรียนการสอนอยู่",id:"Penggunaan liturgis + pedagogis aktif",hi:"सक्रिय धर्मविधिक + शैक्षणिक उपयोग",de:"Aktiver liturgischer + pädagogischer Gebrauch",fr:"Usage liturgique + pédagogique actif",it:"Uso liturgico e didattico attivo",es:"Uso litúrgico y pedagógico activo",pt:"Uso litúrgico e pedagógico ativo",ru:"Активное литургическое и педагогическое использование",uk:"Активне літургійне та навчальне використання",ar:"استخدام ليتورجي وتعليمي نشط",he:"שימוש ליטורגי ופדגוגי פעיל",sw:"Matumizi hai ya kiliturujia na ya kielimu"},
    "Active monastic": {zh:"寺院中活跃使用",yue:"寺院中活躍使用",vi:"Đang dùng trong tu viện",th:"ใช้ในคณะสงฆ์อยู่",id:"Monastik aktif",pt:"Uso monástico ativo",ru:"Активное монастырское использование",he:"נזירי פעיל",sw:"Kimonasteri hai"},
    "Active pedagogical use": {ja:"教育目的で活発に使用",ko:"교육 목적으로 활발히 사용",zh:"积极用于教学",yue:"積極用於教學",vi:"Đang được sử dụng trong giảng dạy",th:"มีการใช้ในการเรียนการสอนอยู่",id:"Penggunaan pedagogis aktif",hi:"सक्रिय शैक्षणिक उपयोग",de:"Aktiver pädagogischer Gebrauch",fr:"Usage pédagogique actif",it:"Uso didattico attivo",es:"Uso pedagógico activo",pt:"Uso pedagógico ativo",ru:"Активное педагогическое использование",uk:"Активне навчальне використання",ar:"استخدام تعليمي نشط",he:"שימוש פדגוגי פעיל",sw:"Matumizi hai ya kielimu"},
    "Angika has Bihar government recognition": {ja:"アンギカ語はビハール州政府の認定を受けている",ko:"앙기카어는 비하르주 정부의 인정을 받음",zh:"昂加语获比哈尔邦政府承认",yue:"昂加語獲比哈爾邦政府承認",vi:"Tiếng Angika được chính quyền bang Bihar công nhận",th:"ภาษาอังคิกาได้รับการรับรองจากรัฐบาลรัฐพิหาร",id:"Angika memiliki pengakuan pemerintah Bihar",hi:"अंगिका को बिहार सरकार की मान्यता प्राप्त है",de:"Angika ist von der Regierung Bihars anerkannt",fr:"l'angika est reconnu par le gouvernement du Bihar",it:"l'angika è riconosciuta dal governo del Bihar",es:"el angika cuenta con reconocimiento del gobierno de Bihar",pt:"o angika tem reconhecimento do governo de Bihar",ru:"ангика признан правительством штата Бихар",he:"אנגיקה מוכרת על ידי ממשלת ביהאר",sw:"Angika inatambuliwa na serikali ya Bihar"},
    "Arumeru District": {vi:"Huyện Arumeru",th:"เขตอารูเมรู",de:"Distrikt Arumeru",fr:"district d'Arumeru",it:"distretto di Arumeru",es:"distrito de Arumeru",pt:"Distrito de Arumeru",uk:"округ Арумеру",he:"מחוז ארומרו",sw:"Wilaya ya Arumeru"},
    "Australian Indigenous language": {ja:"オーストラリア先住民言語",ko:"호주 원주민 언어",zh:"澳大利亚原住民语言",yue:"澳洲原住民語言",vi:"ngôn ngữ bản địa Úc",th:"ภาษาพื้นเมืองออสเตรเลีย",id:"bahasa pribumi Australia",hi:"ऑस्ट्रेलियाई आदिवासी भाषा",de:"australische indigene Sprache",fr:"langue autochtone australienne",it:"lingua indigena australiana",es:"lengua indígena australiana",pt:"língua indígena australiana",ru:"язык коренных народов Австралии",uk:"мова корінних народів Австралії",ar:"لغة أسترالية أصلية",he:"שפה ילידית אוסטרלית",sw:"Lugha asilia ya Australia"},
    "Bassa": {ru:"басса",uk:"басса",he:"באסה"},
    "Bassa is a major vernacular": {vi:"Tiếng Bassa là một ngôn ngữ bản địa chính",id:"Bassa adalah bahasa sehari-hari utama",de:"Bassa ist eine bedeutende Volkssprache",fr:"le bassa est une langue vernaculaire majeure",pt:"o bassa é um vernáculo importante",ru:"басса — один из основных разговорных языков"},
    "Bavaria": {ja:"バイエルン州",ko:"바이에른주",zh:"巴伐利亚",yue:"巴伐利亞",th:"รัฐบาวาเรีย",hi:"बवेरिया",de:"Bayern",fr:"Bavière",it:"Baviera",es:"Baviera",pt:"Baviera",ru:"Бавария",uk:"Баварія",ar:"بافاريا",he:"בוואריה"},
    "Beni": {ru:"Бени"},
    "Bhili cluster": {vi:"nhóm ngôn ngữ Bhili",id:"kelompok Bhili",hi:"भीली समूह",de:"Bhili-Gruppe",fr:"groupe bhili",it:"gruppo bhili",es:"grupo bhili",pt:"grupo bhili",ru:"группа бхили",he:"אשכול בהילי",sw:"kundi la Bhili"},
    "Birmingham": {ja:"バーミンガム",ko:"버밍엄",zh:"伯明翰",yue:"伯明翰",th:"เบอร์มิงแฮม",hi:"बर्मिंघम",ru:"Бирмингем",uk:"Бірмінгем",ar:"برمنغهام",he:"ברמינגהם"},
    "Bobo": {ru:"бобо"},
    "Bungoma & Trans-Nzoia counties": {ja:"ブンゴマ郡およびトランスンゾイア郡",vi:"các hạt Bungoma và Trans-Nzoia",id:"kabupaten Bungoma & Trans-Nzoia",de:"Countys Bungoma und Trans-Nzoia",fr:"comtés de Bungoma et Trans-Nzoia",it:"contee di Bungoma e Trans-Nzoia",es:"condados de Bungoma y Trans-Nzoia",pt:"condados de Bungoma e Trans-Nzoia",uk:"округи Бунгома та Транс-Нзоя",he:"מחוזות בונגומה וטרנס-נזויה",sw:"kaunti za Bungoma na Trans-Nzoia"},
    "Cajamarca": {ja:"カハマルカ",ko:"카하마르카",zh:"卡哈马卡",yue:"卡哈馬卡",ru:"Кахамарка",uk:"Кахамарка",ar:"كاخاماركا"},
    "Cameroon–Nigeria borderland": {ja:"カメルーン・ナイジェリア国境地帯",ko:"카메룬–나이지리아 접경지대",zh:"喀麦隆–尼日利亚边境地带",yue:"喀麥隆–尼日利亞邊境地帶",vi:"vùng biên giới Cameroon–Nigeria",th:"พื้นที่ชายแดนแคเมอรูน–ไนจีเรีย",id:"wilayah perbatasan Kamerun–Nigeria",hi:"कैमरून–नाइजीरिया सीमावर्ती क्षेत्र",de:"Grenzgebiet Kamerun–Nigeria",fr:"zone frontalière Cameroun–Nigeria",it:"zona di confine tra Camerun e Nigeria",es:"zona fronteriza entre Camerún y Nigeria",pt:"faixa fronteiriça Camarões–Nigéria",ru:"пограничье Камеруна и Нигерии",uk:"прикордоння Камеруну та Нігерії",ar:"المنطقة الحدودية بين الكاميرون ونيجيريا",he:"אזור הגבול קמרון–ניגריה",sw:"eneo la mpaka wa Kamerun na Nigeria"},
    "Chengdu city + plain": {ja:"成都市＋成都平原",ko:"청두시 + 청두 평원",zh:"成都市及成都平原",yue:"成都市及成都平原",vi:"thành phố Thành Đô và đồng bằng",th:"เมืองเฉิงตูและที่ราบ",id:"kota + dataran Chengdu",hi:"चेंगदू शहर + मैदान",de:"Stadt + Ebene von Chengdu",fr:"ville + plaine de Chengdu",it:"città e pianura di Chengdu",es:"ciudad y llanura de Chengdu",pt:"cidade e planície de Chengdu",ru:"город Чэнду и равнина",uk:"місто Ченду + рівнина",ar:"مدينة تشنغدو + السهل",he:"העיר צ'נגדו והמישור",sw:"jiji la Chengdu na uwanda wake"},
    "Chichewa in Malawi": {ja:"マラウイではチェワ語",ko:"말라위에서는 치체와어",zh:"马拉维使用齐切瓦语",yue:"馬拉維使用齊切瓦語",vi:"Tiếng Chichewa ở Malawi",th:"ภาษาชิเชวาในมาลาวี",id:"Chichewa di Malawi",hi:"मलावी में चिचेवा",fr:"le chichewa au Malawi",it:"chichewa in Malawi",es:"chichewa en Malaui",pt:"chichewa no Malawi",ru:"чичева в Малави",uk:"чичева в Малаві",ar:"التشيتشيوا في مالاوي",he:"צ'יצ'ווה במלאווי",sw:"Chichewa nchini Malawi"},
    "Chokwe-Luchazi": {ru:"чокве-лучази"},
    "Chongqing + eastern Sichuan": {ja:"重慶＋四川省東部",ko:"충칭 + 쓰촨성 동부",zh:"重庆及川东",yue:"重慶及川東",vi:"Trùng Khánh và miền đông Tứ Xuyên",th:"ฉงชิ่งและเสฉวนตะวันออก",id:"Chongqing + Sichuan timur",de:"Chongqing + östliches Sichuan",fr:"Chongqing + est du Sichuan",it:"Chongqing e Sichuan orientale",es:"Chongqing y el este de Sichuan",pt:"Chongqing e leste de Sichuan",ru:"Чунцин и восточная Сычуань",uk:"Чунцін + східна Сичуань",ar:"تشونغتشينغ + شرق سيتشوان",he:"צ'ונגצ'ינג ומזרח סצ'ואן",sw:"Chongqing na mashariki mwa Sichuan"},
    "Dormant": {ja:"休眠状態",ko:"휴면 상태",zh:"休眠",yue:"休眠",vi:"Ngủ yên",th:"อยู่ในภาวะหยุดใช้",id:"Dorman",hi:"सुप्त",de:"Schlafend",fr:"Dormante",it:"Dormiente",es:"Dormida",pt:"Adormecido",ru:"Спящий",uk:"Спляча",ar:"خاملة",he:"רדומה",sw:"Imelala"},
    "Drung alphabet developed 1983": {zh:"独龙文于1983年创制",yue:"獨龍文於1983年創制",vi:"Bảng chữ cái Drung được phát triển năm 1983",id:"abjad Drung dikembangkan tahun 1983",de:"Drung-Alphabet 1983 entwickelt",fr:"alphabet drung mis au point en 1983",it:"alfabeto drung sviluppato nel 1983",es:"alfabeto drung desarrollado en 1983",pt:"alfabeto drung criado em 1983",uk:"алфавіт друнг розроблено 1983 року",he:"אלפבית דרונג פותח ב-1983",sw:"alfabeti ya Drung ilitengenezwa mwaka 1983"},
    "E Saudi": {ja:"サウジアラビア東部",ko:"사우디아라비아 동부",zh:"沙特东部",yue:"沙特東部",vi:"miền đông Ả Rập Xê Út",th:"ซาอุดีอาระเบียตะวันออก",id:"Arab Saudi timur",hi:"पूर्वी सऊदी अरब",it:"Arabia Saudita orientale",es:"Arabia Saudí oriental",pt:"leste da Arábia Saudita",ru:"восток Саудовской Аравии",uk:"схід Саудівської Аравії",ar:"شرق السعودية",he:"מזרח סעודיה",sw:"mashariki mwa Saudi"},
    "East London": {ja:"イースト・ロンドン",ko:"이스트런던",zh:"东伦敦",yue:"東倫敦",vi:"Đông London",th:"อีสต์ลอนดอน",id:"London Timur",hi:"पूर्वी लंदन",pt:"leste de Londres",ru:"восточный Лондон",uk:"Східний Лондон",ar:"شرق لندن",he:"מזרח לונדון",sw:"mashariki mwa London"},
    "Emilian is recognized regionally": {ja:"エミリア語は地域的に認定",ko:"에밀리아어는 지역적으로 인정",zh:"艾米利亚语获地区性承认",yue:"艾米利亞語獲地區性承認",vi:"Tiếng Emilia được công nhận ở cấp vùng",th:"ภาษาเอมีเลียได้รับการรับรองในระดับภูมิภาค",id:"Emilian diakui di tingkat regional",hi:"एमिलियन को क्षेत्रीय स्तर पर मान्यता प्राप्त है",de:"Emilianisch ist regional anerkannt",fr:"l'émilien est reconnu au niveau régional",it:"l'emiliano è riconosciuto a livello regionale",es:"el emiliano está reconocido a nivel regional",pt:"o emiliano é reconhecido regionalmente",ru:"эмилианский признан на региональном уровне",uk:"емільянська визнана на регіональному рівні",he:"אמיליאנית מוכרת ברמה האזורית",sw:"Emilian inatambuliwa katika ngazi ya kikanda"},
    "English is the official language": {ja:"英語が公用語",ko:"영어가 공용어",zh:"英语为官方语言",yue:"英語為官方語言",vi:"Tiếng Anh là ngôn ngữ chính thức",th:"ภาษาอังกฤษเป็นภาษาราชการ",id:"bahasa Inggris adalah bahasa resmi",hi:"अंग्रेज़ी आधिकारिक भाषा है",de:"Englisch ist die Amtssprache",fr:"l'anglais est la langue officielle",it:"l'inglese è la lingua ufficiale",es:"el inglés es la lengua oficial",pt:"o inglês é a língua oficial",ru:"английский — официальный язык",uk:"англійська — офіційна мова",ar:"الإنجليزية هي اللغة الرسمية",he:"אנגלית היא השפה הרשמית",sw:"Kiingereza ndiyo lugha rasmi"},
    "English is widely used": {zh:"英语广泛使用",yue:"英語廣泛使用",vi:"Tiếng Anh được sử dụng rộng rãi",th:"ภาษาอังกฤษถูกใช้อย่างแพร่หลาย",de:"Englisch ist weit verbreitet",fr:"l'anglais est largement utilisé",pt:"o inglês é amplamente usado",ru:"английский широко используется",uk:"англійська широко використовується",ar:"الإنجليزية مستخدمة على نطاق واسع"},
    "Ethnologue 6b: threatened": {vi:"Ethnologue 6b: bị đe dọa",th:"Ethnologue 6b: ถูกคุกคาม",id:"Ethnologue 6b: terancam",hi:"एथ्नोलॉग 6b: संकटग्रस्त",de:"Ethnologue 6b: bedroht",fr:"Ethnologue 6b : menacée",it:"Ethnologue 6b: minacciata",es:"Ethnologue 6b: amenazada",pt:"Ethnologue 6b: ameaçado",ru:"Ethnologue 6b: под угрозой",uk:"Ethnologue 6b: під загрозою",he:"אתנולוג 6b: מאוימת",sw:"Ethnologue 6b: iko hatarini"},
    "Filipino and English are official": {ja:"フィリピノ語と英語が公用語",ko:"필리핀어와 영어가 공용어",zh:"菲律宾语和英语为官方语言",yue:"菲律賓語及英語為官方語言",vi:"Tiếng Filipino và tiếng Anh là ngôn ngữ chính thức",th:"ภาษาฟิลิปิโนและภาษาอังกฤษเป็นภาษาราชการ",id:"bahasa Filipino dan Inggris adalah bahasa resmi",hi:"फ़िलिपीनो और अंग्रेज़ी आधिकारिक भाषाएँ हैं",de:"Filipino und Englisch sind Amtssprachen",fr:"le filipino et l'anglais sont langues officielles",it:"il filippino e l'inglese sono ufficiali",es:"el filipino y el inglés son oficiales",pt:"o filipino e o inglês são oficiais",ru:"филиппинский и английский — официальные языки",uk:"філіппінська та англійська є офіційними",ar:"الفلبينية والإنجليزية لغتان رسميتان",he:"פיליפינית ואנגלית הן שפות רשמיות",sw:"Kifilipino na Kiingereza ni lugha rasmi"},
    "Finnish-Swedish minority": {zh:"芬兰的瑞典语少数群体",yue:"芬蘭嘅瑞典語少數群體",vi:"cộng đồng thiểu số Phần Lan–Thụy Điển",th:"ชนกลุ่มน้อยฟินแลนด์–สวีเดน",id:"minoritas Finlandia-Swedia",hi:"फ़िनिश-स्वीडिश अल्पसंख्यक",de:"finnisch-schwedische Minderheit",fr:"minorité finno-suédoise",uk:"шведськомовна меншина Фінляндії",ar:"الأقلية السويدية في فنلندا",he:"מיעוט פיני-שוודי"},
    "French Guiana": {ja:"フランス領ギアナ",ko:"프랑스령 기아나",zh:"法属圭亚那",yue:"法屬圭亞那",vi:"Guyane thuộc Pháp",th:"เฟรนช์เกียนา",id:"Guyana Prancis",hi:"फ़्रेंच गुयाना",de:"Französisch-Guayana",fr:"Guyane française",it:"Guyana francese",es:"Guayana Francesa",pt:"Guiana Francesa",ru:"Французская Гвиана",uk:"Французька Гвіана",ar:"غويانا الفرنسية",he:"גיאנה הצרפתית",sw:"Guyana ya Kifaransa"},
    "French is co-official in Aosta": {ja:"アオスタではフランス語が共同公用語",ko:"아오스타에서 프랑스어가 공동 공용어",zh:"法语在奥斯塔为共同官方语言",yue:"法語喺奧斯塔為共同官方語言",vi:"Tiếng Pháp là đồng ngôn ngữ chính thức ở Aosta",th:"ภาษาฝรั่งเศสเป็นภาษาราชการร่วมในอาออสตา",id:"bahasa Prancis berstatus ko-resmi di Aosta",hi:"आओस्ता में फ़्रेंच सह-आधिकारिक है",de:"Französisch ist in Aosta Ko-Amtssprache",fr:"le français est co-officiel à Aoste",it:"il francese è coufficiale in Valle d'Aosta",es:"el francés es cooficial en Aosta",pt:"o francês é cooficial em Aosta",ru:"французский — один из официальных языков в Аосте",uk:"французька є співофіційною в Аості",ar:"الفرنسية لغة رسمية مشتركة في وادي أوستا",he:"צרפתית היא שפה רשמית שותפה באאוסטה",sw:"Kifaransa pia ni lugha rasmi huko Aosta"},
    "Frühneuhochdeutsch": {ja:"初期新高ドイツ語",ko:"초기 신고지 독일어",zh:"早期新高地德语",yue:"早期新高地德語",ru:"ранненововерхненемецкий"},
    "Fuzhou Gan": {ja:"撫州贛語",ko:"푸저우 간어",zh:"抚州赣语",yue:"撫州贛語",it:"gan di Fuzhou",es:"gan de Fuzhou",ru:"гань Фучжоу"},
    "Gajica": {ru:"гаевица"},
    "German is the official language": {ja:"ドイツ語が公用語",ko:"독일어가 공용어",zh:"德语为官方语言",yue:"德語為官方語言",vi:"Tiếng Đức là ngôn ngữ chính thức",th:"ภาษาเยอรมันเป็นภาษาราชการ",id:"bahasa Jerman adalah bahasa resmi",hi:"जर्मन आधिकारिक भाषा है",de:"Deutsch ist die Amtssprache",fr:"l'allemand est la langue officielle",it:"il tedesco è la lingua ufficiale",es:"el alemán es la lengua oficial",pt:"o alemão é a língua oficial",ru:"немецкий — официальный язык",uk:"німецька — офіційна мова",ar:"الألمانية هي اللغة الرسمية",he:"גרמנית היא השפה הרשמית",sw:"Kijerumani ndiyo lugha rasmi"},
    "Gilgit-Baltistan": {ja:"ギルギット・バルティスタン",ko:"길기트발티스탄",zh:"吉尔吉特-巴尔蒂斯坦",yue:"吉爾吉特-巴爾蒂斯坦",th:"กิลกิต-บัลติสถาน",hi:"गिलगित-बल्तिस्तान",ru:"Гилгит-Балтистан",uk:"Гілгіт-Балтистан",ar:"جلجت بلتستان",he:"גילגיט-בלטיסטן"},
    "Grand Siècle": {ja:"大世紀"},
    "Grande Comore": {ja:"グランドコモロ島",ko:"그랑드코모르섬",zh:"大科摩罗岛",yue:"大科摩羅島",es:"Gran Comora",ru:"Гранд-Комор",uk:"Гранд-Комор",ar:"القمر الكبرى",sw:"Ngazija"},
    "Greater Manchester": {ja:"グレーター・マンチェスター",ko:"그레이터맨체스터",zh:"大曼彻斯特",yue:"大曼徹斯特",th:"เกรตเตอร์แมนเชสเตอร์",hi:"ग्रेटर मैनचेस्टर",ru:"Большой Манчестер",uk:"Великий Манчестер",ar:"مانشستر الكبرى",he:"מנצ'סטר רבתי"},
    "Guatemala + significant USA diaspora": {ja:"グアテマラ＋米国の大規模ディアスポラ",ko:"과테말라 + 상당한 규모의 미국 디아스포라",zh:"危地马拉及大量美国侨民",yue:"危地馬拉及大量美國僑民",vi:"Guatemala và cộng đồng hải ngoại đáng kể ở Hoa Kỳ",th:"กัวเตมาลาและชาวพลัดถิ่นจำนวนมากในสหรัฐฯ",id:"Guatemala + diaspora AS yang signifikan",hi:"ग्वाटेमाला + बड़ी अमेरिकी प्रवासी आबादी",de:"Guatemala + bedeutende Diaspora in den USA",fr:"Guatemala + importante diaspora aux États-Unis",it:"Guatemala e importante diaspora negli USA",es:"Guatemala y una diáspora importante en EE. UU.",pt:"Guatemala e diáspora significativa nos EUA",ru:"Гватемала и значительная диаспора в США",uk:"Гватемала + значна діаспора в США",ar:"غواتيمالا + شتات كبير في الولايات المتحدة",he:"גואטמלה ותפוצה משמעותית בארה\"ב",sw:"Guatemala na wahamiaji wengi nchini Marekani"},
    "Guatemalan highlands": {ja:"グアテマラ高地",ko:"과테말라 고지대",zh:"危地马拉高地",yue:"危地馬拉高地",vi:"vùng cao nguyên Guatemala",th:"ที่ราบสูงกัวเตมาลา",id:"dataran tinggi Guatemala",hi:"ग्वाटेमाला का पर्वतीय क्षेत्र",de:"guatemaltekisches Hochland",fr:"hautes terres du Guatemala",it:"altopiani del Guatemala",es:"altiplano de Guatemala",pt:"altiplano guatemalteco",ru:"нагорья Гватемалы",uk:"гватемальське нагір'я",ar:"مرتفعات غواتيمالا",he:"רמות גואטמלה",sw:"nyanda za juu za Guatemala"},
    "Gulf Arabic": {ja:"湾岸アラビア語",ko:"걸프 아랍어",zh:"海湾阿拉伯语",yue:"海灣阿拉伯語",vi:"Tiếng Ả Rập vùng Vịnh",th:"ภาษาอาหรับถิ่นอ่าวเปอร์เซีย",id:"bahasa Arab Teluk",hi:"खाड़ी अरबी",de:"Golfarabisch",fr:"arabe du Golfe",it:"arabo del Golfo",es:"árabe del Golfo",pt:"árabe do Golfo",ru:"арабский диалект Персидского залива",uk:"арабська Перської затоки",ar:"العربية الخليجية",he:"ערבית המפרץ",sw:"Kiarabu cha Ghuba"},
    "Guyana": {ja:"ガイアナ",ko:"가이아나",zh:"圭亚那",yue:"圭亞那",th:"กายอานา",hi:"गुयाना",pt:"Guiana",ru:"Гайана",uk:"Гаяна",ar:"غيانا",he:"גיאנה"},
    "Han-tự": {vi:"Hán tự"},
    "Hejaz": {ja:"ヒジャーズ",ko:"헤자즈",zh:"汉志",yue:"漢志",th:"ฮิญาซ",id:"Hijaz",hi:"हिजाज़",de:"Hedschas",fr:"Hedjaz",ru:"Хиджаз",uk:"Хіджаз",ar:"الحجاز",he:"חיג'אז"},
    "Hejaz: Jeddah": {ja:"ヒジャーズ：ジッダ",ko:"헤자즈: 제다",zh:"汉志：吉达",yue:"漢志：吉達",th:"ฮิญาซ: เจดดาห์",id:"Hijaz: Jeddah",hi:"हिजाज़: जेद्दा",de:"Hedschas: Dschidda",fr:"Hedjaz : Djeddah",ru:"Хиджаз: Джидда",uk:"Хіджаз: Джидда",ar:"الحجاز: جدة",he:"חיג'אז: ג'דה"},
    "Hengyang City": {ja:"衡陽市",ko:"헝양시",zh:"衡阳市",yue:"衡陽市",vi:"thành phố Hành Dương",th:"เมืองเหิงหยาง",id:"Kota Hengyang",de:"Stadt Hengyang",fr:"ville de Hengyang",it:"città di Hengyang",es:"ciudad de Hengyang",pt:"cidade de Hengyang",ru:"город Хэнъян",uk:"місто Хеньян",he:"העיר הנגיאנג",sw:"Jiji la Hengyang"},
    "Hiri Motu official": {ja:"ヒリモツ語が公用語",ko:"히리모투어 공용어",zh:"希里莫图语为官方语言",yue:"希里莫圖語為官方語言",vi:"Tiếng Hiri Motu là ngôn ngữ chính thức",th:"ภาษาฮีรีโมตูเป็นภาษาราชการ",id:"Hiri Motu resmi",hi:"हिरी मोटू आधिकारिक",de:"Hiri Motu ist Amtssprache",fr:"le hiri motu est langue officielle",it:"Hiri Motu ufficiale",es:"Hiri Motu oficial",pt:"hiri motu é oficial",ru:"хири-моту — официальный язык",uk:"хірі-моту — офіційна",ar:"هيري موتو لغة رسمية",he:"הירי מוטו רשמית",sw:"Hiri Motu ni lugha rasmi"},
    "Historical": {ja:"歴史的",ko:"역사적",zh:"历史",yue:"歷史",vi:"Lịch sử",th:"เชิงประวัติศาสตร์",id:"Historis",hi:"ऐतिहासिक",de:"Historisch",fr:"Historique",it:"Storica",es:"Histórica",pt:"Histórico",ru:"Исторический",uk:"Історична",ar:"تاريخية",he:"היסטורית",sw:"Ya kihistoria"},
    "Historical literary form": {ja:"歴史的な文語形",ko:"역사적 문어 형태",zh:"历史文学语体",yue:"歷史文學語體",vi:"Dạng văn học lịch sử",th:"รูปแบบวรรณกรรมเชิงประวัติศาสตร์",id:"Bentuk sastra historis",hi:"ऐतिहासिक साहित्यिक रूप",de:"Historische Literaturform",fr:"Forme littéraire historique",it:"Forma letteraria storica",es:"Forma literaria histórica",pt:"Forma literária histórica",ru:"историческая литературная форма",uk:"Історична літературна форма",ar:"صيغة أدبية تاريخية",he:"צורה ספרותית היסטורית",sw:"Muundo wa kifasihi wa kihistoria"},
    "Historical literary register": {ja:"歴史的な文語体",ko:"역사적 문어체",zh:"历史文学语域",yue:"歷史文學語域",vi:"Ngữ vực văn chương lịch sử",th:"ระดับภาษาเชิงวรรณกรรมในประวัติศาสตร์",id:"Register sastra historis",hi:"ऐतिहासिक साहित्यिक रजिस्टर",de:"Historisches literarisches Register",fr:"registre littéraire historique",it:"Registro letterario storico",es:"Registro literario histórico",pt:"Registro literário histórico",ru:"исторический литературный регистр",uk:"Історичний літературний регістр",ar:"سجل أدبي تاريخي",he:"מִשלב ספרותי היסטורי",sw:"rejista ya kifasihi ya kihistoria"},
    "Horn": {uk:"Ріг Африки",ar:"القرن الأفريقي"},
    "Huánuco regions": {ja:"ワヌコ地方",ko:"우아누코 지역",zh:"瓦努科大区",yue:"瓦努科大區",id:"wilayah Huánuco",pt:"regiões de Huánuco",ru:"регионы Уануко",sw:"mikoa ya Huánuco"},
    "Italian is the official language": {ja:"イタリア語が公用語",ko:"이탈리아어가 공용어",zh:"意大利语为官方语言",yue:"意大利語為官方語言",vi:"Tiếng Ý là ngôn ngữ chính thức",th:"ภาษาอิตาลีเป็นภาษาราชการ",id:"bahasa Italia adalah bahasa resmi",hi:"इतालवी आधिकारिक भाषा है",de:"Italienisch ist die Amtssprache",fr:"l'italien est la langue officielle",it:"l'italiano è la lingua ufficiale",es:"el italiano es la lengua oficial",pt:"o italiano é a língua oficial",ru:"итальянский — официальный язык",uk:"італійська — офіційна мова",ar:"الإيطالية هي اللغة الرسمية",he:"איטלקית היא השפה הרשמית",sw:"Kiitaliano ndiyo lugha rasmi"},
    "Japanese secondary schools 漢文": {ja:"日本の中等教育の漢文",ko:"일본 중등학교 한문",zh:"日本中学汉文课程",yue:"日本中學漢文課程",vi:"môn Hán văn (漢文) ở trường trung học Nhật Bản",th:"วิชาคันบุน (漢文) ในโรงเรียนมัธยมของญี่ปุ่น",id:"sekolah menengah Jepang 漢文",hi:"जापानी माध्यमिक विद्यालयों में 漢文",de:"japanische Sekundarschulen 漢文",fr:"établissements secondaires japonais 漢文",it:"漢文 nelle scuole secondarie giapponesi",es:"漢文 en las escuelas secundarias japonesas",pt:"漢文 no ensino médio japonês",ru:"漢文 в японской средней школе"},
    "Junín": {ja:"フニン",ko:"후닌",zh:"胡宁",yue:"胡寧",ru:"Хунин",uk:"Хунін",ar:"خونين"},
    "Kaifeng city + prefecture": {ja:"開封市＋開封地区",ko:"카이펑시 + 카이펑 지구",zh:"开封市及所辖地区",yue:"開封市及所轄地區",vi:"thành phố Khai Phong và địa cấp thị",th:"เมืองไคเฟิงและเขตปกครอง",id:"kota + prefektur Kaifeng",de:"Stadt + Bezirk Kaifeng",fr:"ville + préfecture de Kaifeng",it:"città e prefettura di Kaifeng",es:"ciudad y prefectura de Kaifeng",pt:"cidade e prefeitura de Kaifeng",ru:"город и округ Кайфын",uk:"місто Кайфин + округ",ar:"مدينة كايفنغ + المحافظة",he:"העיר קאיפנג והמחוז",sw:"jiji la Kaifeng na wilaya yake"},
    "Kankan Region": {ja:"カンカン地方",ko:"칸칸 지역",zh:"康康大区",yue:"康康大區",vi:"vùng Kankan",id:"Wilayah Kankan",de:"Region Kankan",fr:"région de Kankan",it:"regione di Kankan",es:"región de Kankan",pt:"Região de Kankan",ru:"область Канкан",uk:"область Канкан",ar:"إقليم كانكان",he:"אזור קנקן",sw:"Mkoa wa Kankan"},
    "Khams is regional": {vi:"Tiếng Khams là ngôn ngữ cấp khu vực",id:"Khams bersifat regional",de:"Khams ist regional",fr:"le khams est régional",it:"il khams è regionale",es:"el khams es regional",pt:"o khams é regional"},
    "Kiowa Tribe federally recognized": {ja:"カイオワ族は連邦政府公認",ko:"카이오와 부족은 연방 인정",zh:"基奥瓦部落获联邦承认",yue:"基奧瓦部落獲聯邦承認",vi:"Bộ lạc Kiowa được liên bang công nhận",th:"ชนเผ่าไคโอวาได้รับการรับรองจากรัฐบาลกลาง",id:"Suku Kiowa diakui secara federal",de:"Kiowa-Stamm vom Bund anerkannt",fr:"tribu kiowa reconnue au niveau fédéral",it:"Tribù Kiowa riconosciuta a livello federale",es:"Tribu Kiowa reconocida federalmente",pt:"Tribo Kiowa reconhecida federalmente",ru:"племя кайова признано федерально",uk:"Плем'я кайова федерально визнане",he:"שבט קיווה מוכר פדרלית",sw:"Kabila la Kiowa linatambuliwa na serikali ya shirikisho"},
    "Korean peninsula": {ja:"朝鮮半島",ko:"한반도",zh:"朝鲜半岛",yue:"朝鮮半島",vi:"bán đảo Triều Tiên",th:"คาบสมุทรเกาหลี",id:"Semenanjung Korea",hi:"कोरियाई प्रायद्वीप",de:"Koreanische Halbinsel",fr:"péninsule coréenne",it:"penisola coreana",es:"península de Corea",pt:"península coreana",ru:"Корейский полуостров",uk:"Корейський півострів",ar:"شبه الجزيرة الكورية",he:"חצי האי הקוריאני",sw:"rasi ya Korea"},
    "Ladakh — Kargil": {ja:"ラダック—カルギル",ko:"라다크 — 카르길",zh:"拉达克—卡吉尔",yue:"拉達克—卡吉爾",th:"ลาดัก — คาร์กิล",hi:"लद्दाख — कारगिल",ru:"Ладакх — Каргил",uk:"Ладакх — Каргіл",ar:"لاداخ — كارغيل",he:"לדאק — קרגיל"},
    "Ladakhi has no scheduled status": {ja:"ラダック語は指定言語の地位を持たない",ko:"라다크어는 지정 언어 지위가 없음",zh:"拉达克语未列入宪法附表语言",yue:"拉達克語未列入憲法附表語言",vi:"Tiếng Ladakh không thuộc danh sách ngôn ngữ được Hiến pháp công nhận",th:"ภาษาลาดักไม่ได้อยู่ในบัญชีภาษาที่รัฐธรรมนูญรับรอง",id:"bahasa Ladakhi tidak berstatus bahasa terjadwal",hi:"लद्दाखी को अनुसूचित भाषा का दर्जा नहीं है",pt:"o ladakhi não consta no Oitavo Anexo da Constituição",ru:"ладакхский не входит в Восьмое приложение Конституции"},
    "Latin alphabet with diacritics: grave": {id:"alfabet Latin dengan diakritik: grave",hi:"विशेषक चिह्नों सहित लैटिन वर्णमाला: ग्रेव",de:"lateinisches Alphabet mit Diakritika: Gravis",fr:"alphabet latin avec diacritiques : accent grave",pt:"alfabeto latino com diacríticos: grave",ru:"латинский алфавит с диакритикой: гравис"},
    "Latin-based with diacritics": {ja:"発音区別符号付きラテン文字",ko:"발음 구별 부호가 있는 라틴 문자",zh:"带附加符号的拉丁字母",yue:"帶附加符號嘅拉丁字母",vi:"dựa trên chữ Latinh có dấu phụ",th:"อักษรละตินที่มีเครื่องหมายกำกับ",id:"berbasis Latin dengan diakritik",hi:"लैटिन-आधारित, विशेषक चिह्नों सहित",de:"lateinbasiert mit Diakritika",fr:"à base latine avec diacritiques",it:"a base latina con diacritici",es:"de base latina con diacríticos",pt:"de base latina com diacríticos",ru:"на основе латиницы с диакритикой",uk:"на основі латиниці з діакритиками",ar:"قائمة على الحروف اللاتينية مع علامات تشكيل",he:"מבוסס לטינית עם סימנים דיאקריטיים",sw:"yenye msingi wa Kilatini pamoja na alama za lafudhi"},
    "Laz has no official status": {ja:"ラズ語は公的地位を持たない",ko:"라즈어는 공식 지위가 없음",zh:"拉兹语无官方地位",yue:"拉茲語無官方地位",vi:"Tiếng Laz không có quy chế chính thức",th:"ภาษาลาซไม่มีสถานะทางการ",id:"bahasa Laz tidak memiliki status resmi",hi:"लाज़ को कोई आधिकारिक दर्जा नहीं है",de:"Lasisch hat keinen offiziellen Status",fr:"le laze n'a aucun statut officiel",it:"il laz non ha alcuno status ufficiale",es:"el laz no tiene estatus oficial",pt:"o laz não tem status oficial",ru:"лазский не имеет официального статуса",uk:"лазька не має офіційного статусу",ar:"اللازية ليس لها وضع رسمي",he:"ללאזית אין מעמד רשמי",sw:"Laz haina hadhi rasmi"},
    "Leh": {ja:"レー",ko:"레",zh:"列城",yue:"列城",th:"เลห์",hi:"लेह",ru:"Лех",uk:"Лех",ar:"ليه"},
    "Lemkivshchyna": {ru:"Лемковщина",uk:"Лемківщина"},
    "Level 3 of 5": {ja:"5段階中のレベル3",ko:"5단계 중 3단계",zh:"五级中的第3级",yue:"五級中嘅第3級",vi:"Mức 3 trên 5",th:"ระดับ 3 จาก 5",id:"Tingkat 3 dari 5",hi:"5 में से स्तर 3",de:"Stufe 3 von 5",fr:"niveau 3 sur 5",it:"Livello 3 di 5",es:"Nivel 3 de 5",pt:"Nível 3 de 5",ru:"Уровень 3 из 5",uk:"Рівень 3 з 5",ar:"المستوى 3 من 5",he:"רמה 3 מתוך 5",sw:"Kiwango cha 3 kati ya 5"},
    "Liuhe": {ja:"六合",ko:"류허",zh:"六合",yue:"六合",th:"ลิ่วเหอ",ru:"Люхэ",uk:"Люхе"},
    "Loreto regions": {ja:"ロレト地方",ko:"로레토 지역",zh:"洛雷托大区",yue:"洛雷托大區",id:"wilayah Loreto",pt:"regiões de Loreto",ru:"регионы Лорето",sw:"mikoa ya Loreto"},
    "Lüliang": {ja:"呂梁",ko:"뤼량",zh:"吕梁",yue:"呂梁",vi:"Lữ Lương",ru:"Люйлян",uk:"Люйлян"},
    "Maine": {ja:"メイン州",ko:"메인주",zh:"缅因州",yue:"緬因州",th:"รัฐเมน",ru:"штат Мэн",uk:"Мен",ar:"مين",he:"מיין"},
    "Manyika is a Shona variety": {ja:"マニカ語はショナ語の変種",ko:"마니카어는 쇼나어의 변종",vi:"Tiếng Manyika là một biến thể của tiếng Shona",th:"ภาษามันยิกาเป็นภาษาถิ่นของโชนา",id:"Manyika adalah ragam bahasa Shona",de:"Manyika ist eine Shona-Varietät",fr:"le manyika est une variété du shona",it:"il manyika è una varietà dello shona",es:"el manyika es una variedad del shona",pt:"o manyika é uma variedade do shona",ru:"маньика — разновидность шона",uk:"маніка — різновид шона",he:"מניקה היא ניב של שונה",sw:"Manyika ni lahaja ya Kishona"},
    "Marwari group": {ja:"マールワーリー語群",ko:"마르와리어군",zh:"马尔瓦里语群",yue:"馬爾瓦里語群",vi:"nhóm Marwari",th:"กลุ่มภาษามารวารี",id:"kelompok Marwari",hi:"मारवाड़ी समूह",de:"Marwari-Gruppe",fr:"groupe marwari",it:"gruppo marwari",es:"grupo marwari",pt:"grupo marwari",ru:"группа марвари",he:"קבוצת מארוארי",sw:"kundi la Marwari"},
    "Mayo-Kebbi East prefecture": {ja:"マヨ・ケビ・エスト州",ko:"마요케비에스트주",vi:"tỉnh Mayo-Kebbi Đông",id:"prefektur Mayo-Kebbi Timur",de:"Präfektur Mayo-Kebbi Est",fr:"préfecture du Mayo-Kebbi Est",it:"prefettura del Mayo-Kebbi Est",es:"prefectura de Mayo-Kebbi Este",pt:"prefeitura de Mayo-Kebbi Leste",uk:"префектура Майо-Кеббі Східний",ar:"إقليم مايو كيبي الشرقي",sw:"wilaya ya Mayo-Kebbi Mashariki"},
    "Mecca": {ja:"メッカ",ko:"메카",zh:"麦加",yue:"麥加",th:"มักกะฮ์",id:"Mekah",hi:"मक्का",de:"Mekka",fr:"La Mecque",it:"La Mecca",es:"La Meca",pt:"Meca",ru:"Мекка",uk:"Мекка",ar:"مكة",he:"מכה",sw:"Makka"},
    "Medina": {ja:"メディナ",ko:"메디나",zh:"麦地那",yue:"麥地那",th:"มะดีนะฮ์",id:"Madinah",hi:"मदीना",fr:"Médine",ru:"Медина",uk:"Медіна",ar:"المدينة المنورة",he:"אל-מדינה",sw:"Madina"},
    "Merseyside": {ja:"マージーサイド",ko:"머지사이드",zh:"默西赛德",yue:"默西賽德",th:"เมอร์ซีย์ไซด์",ru:"Мерсисайд",uk:"Мерсісайд",ar:"ميرسيسايد",he:"מרסיסייד"},
    "Middle Mekong": {ja:"メコン川中流域",ko:"메콩강 중류",zh:"湄公河中游",yue:"湄公河中游",vi:"trung lưu sông Mekong",th:"แม่น้ำโขงตอนกลาง",id:"Mekong Tengah",hi:"मध्य मेकांग",de:"mittlerer Mekong",fr:"moyen Mékong",it:"medio Mekong",es:"Mekong medio",pt:"médio Mekong",ru:"среднее течение Меконга",uk:"середня течія Меконгу",ar:"وسط نهر الميكونغ",he:"המקונג התיכון",sw:"Mekong ya Kati"},
    "Middle Yangtze": {ja:"長江中流域",ko:"양쯔강 중류",zh:"长江中游",yue:"長江中游",vi:"trung lưu Trường Giang",th:"แม่น้ำแยงซีตอนกลาง",id:"Yangtze Tengah",de:"mittlerer Jangtse",fr:"moyen Yangtsé",it:"medio Yangtze",es:"curso medio del Yangtsé",pt:"médio Yangtzé",ru:"среднее течение Янцзы",uk:"середня течія Янцзи",ar:"وسط نهر اليانغتسي",he:"היאנגצה התיכון",sw:"Yangtze ya Kati"},
    "Modern Mandaic": {ja:"現代マンダ語",ko:"현대 만다어",zh:"现代曼达语",yue:"現代曼達語",vi:"Tiếng Mandaic hiện đại",th:"ภาษาแมนดาอิกสมัยใหม่",de:"Neumandäisch",fr:"mandéen moderne",it:"mandeo moderno",es:"mandeo moderno",pt:"mandaico moderno",ru:"современный мандейский",uk:"сучасна мандейська",ar:"المندائية الحديثة",he:"מנדעית מודרנית",sw:"Mandaic ya kisasa"},
    "Mopti region": {ja:"モプティ地方",ko:"모프티 지역",zh:"莫普提大区",yue:"莫普提大區",vi:"vùng Mopti",id:"wilayah Mopti",de:"Region Mopti",fr:"région de Mopti",it:"regione di Mopti",es:"región de Mopti",pt:"região de Mopti",ru:"область Мопти",uk:"область Мопті",ar:"إقليم موبتي",he:"אזור מופטי",sw:"mkoa wa Mopti"},
    "Muscogee Nation recognized": {ja:"マスコギー・ネーション公認",ko:"머스코기 네이션 인정",zh:"马斯科吉族获承认",yue:"馬斯科吉族獲承認",vi:"Muscogee Nation được công nhận",th:"ชาติมัสโกกีได้รับการรับรอง",id:"Muscogee Nation diakui",de:"Muscogee Nation anerkannt",fr:"Nation muscogee reconnue",it:"riconosciuta dalla Muscogee Nation",es:"reconocida por la Muscogee Nation",pt:"Nação Muscogee reconhecida",ru:"признана Нация мускоги",he:"אומת מסקוגי מוכרת",sw:"Taifa la Muscogee linatambuliwa"},
    "Mussau-Emira is recognized regionally": {vi:"Tiếng Mussau-Emira được công nhận ở cấp khu vực",id:"Mussau-Emira diakui di tingkat regional",de:"Mussau-Emira ist regional anerkannt",fr:"le mussau-emira est reconnu au niveau régional",it:"il mussau-emira è riconosciuto a livello regionale",es:"el mussau-emira está reconocido a nivel regional",pt:"o mussau-emira é reconhecido regionalmente",uk:"муссау-еміра визнана на регіональному рівні",he:"מוסאו-אמירה מוכרת ברמה האזורית",sw:"Mussau-Emira inatambuliwa kikanda"},
    "Najdi is the spoken vernacular": {zh:"内志方言为日常口语",yue:"內志方言為日常口語",vi:"Tiếng Najd là khẩu ngữ thông dụng",th:"ภาษาถิ่นนัจญ์ดีเป็นภาษาพูดในชีวิตประจำวัน",id:"Najdi adalah bahasa sehari-hari yang dituturkan",hi:"नज्दी बोलचाल की भाषा है",de:"Najdi ist die gesprochene Umgangssprache",fr:"le najdi est la langue vernaculaire parlée",it:"il najdi è il vernacolo parlato",es:"el najdi es la lengua vernácula hablada",pt:"o najdi é o vernáculo falado",uk:"неджійська — розмовна говірка",ar:"النجدية هي اللهجة المحكية",he:"הנג'דית היא הלהג המדובר",sw:"Najdi ndiyo lahaja inayozungumzwa"},
    "Nanjing city + Jiangning": {ja:"南京市＋江寧",ko:"난징시 + 장닝",zh:"南京市及江宁",yue:"南京市及江寧",vi:"thành phố Nam Kinh và Giang Ninh",th:"เมืองหนานจิงและเจียงหนิง",id:"kota Nanjing + Jiangning",de:"Stadt Nanjing + Jiangning",fr:"ville de Nankin + Jiangning",it:"città di Nanchino e Jiangning",es:"ciudad de Nankín y Jiangning",pt:"cidade de Nanquim + Jiangning",ru:"город Нанкин и Цзяннин",uk:"місто Нанкін + Цзяннін",he:"העיר נאנג'ינג וג'יאנגנינג",sw:"jiji la Nanjing na Jiangning"},
    "National language of Bolivia": {ja:"ボリビアの国語",ko:"볼리비아의 국가 언어",zh:"玻利维亚国家语言",yue:"玻利維亞國家語言",vi:"Ngôn ngữ quốc gia của Bolivia",th:"ภาษาประจำชาติของโบลิเวีย",id:"Bahasa nasional Bolivia",hi:"बोलीविया की राष्ट्रीय भाषा",de:"Nationalsprache Boliviens",fr:"langue nationale de la Bolivie",it:"Lingua nazionale della Bolivia",es:"Lengua nacional de Bolivia",pt:"Língua nacional da Bolívia",ru:"Национальный язык Боливии",uk:"Національна мова Болівії",ar:"لغة وطنية في بوليفيا",he:"שפה לאומית של בוליביה",sw:"Lugha ya taifa ya Bolivia"},
    "Nepali is the official language": {ja:"ネパール語が公用語",ko:"네팔어가 공용어",zh:"尼泊尔语为官方语言",yue:"尼泊爾語為官方語言",vi:"Tiếng Nepal là ngôn ngữ chính thức",th:"ภาษาเนปาลเป็นภาษาราชการ",id:"bahasa Nepali adalah bahasa resmi",hi:"नेपाली आधिकारिक भाषा है",de:"Nepali ist die Amtssprache",fr:"le népalais est la langue officielle",it:"il nepalese è la lingua ufficiale",es:"el nepalí es la lengua oficial",pt:"o nepali é a língua oficial",ru:"непальский — официальный язык",uk:"непальська — офіційна мова",ar:"النيبالية هي اللغة الرسمية",he:"נפאלית היא השפה הרשמית",sw:"Kinepali ndiyo lugha rasmi"},
    "New Brunswick": {ja:"ニューブランズウィック州",ko:"뉴브런즈윅주",zh:"新不伦瑞克省",yue:"新不倫瑞克省",th:"รัฐนิวบรันสวิก",hi:"न्यू ब्रंसविक",fr:"Nouveau-Brunswick",it:"Nuovo Brunswick",es:"Nuevo Brunswick",ru:"Нью-Брансуик",uk:"Нью-Брансвік",ar:"نيو برونزويك",he:"ניו ברונסוויק"},
    "Nheengatu": {ja:"ニェエンガトゥ語",zh:"内恩加图语",yue:"內恩加圖語"},
    "Northeast Africa": {ja:"北東アフリカ",ko:"북동아프리카",zh:"非洲东北部",yue:"非洲東北部",vi:"Đông Bắc Phi",th:"แอฟริกาตะวันออกเฉียงเหนือ",id:"Afrika Timur Laut",hi:"पूर्वोत्तर अफ़्रीका",de:"Nordostafrika",fr:"Afrique du Nord-Est",it:"Africa nordorientale",es:"África nororiental",pt:"Nordeste da África",ru:"Северо-Восточная Африка",uk:"Північно-Східна Африка",ar:"شمال شرق أفريقيا",he:"צפון-מזרח אפריקה",sw:"Afrika ya Kaskazini-Mashariki"},
    "Not officially recognized": {ja:"公的に認定されていない",ko:"공식적으로 인정되지 않음",zh:"未获官方承认",yue:"未獲官方承認",vi:"Không được công nhận chính thức",th:"ไม่ได้รับการรับรองอย่างเป็นทางการ",id:"Tidak diakui secara resmi",hi:"आधिकारिक रूप से मान्यता प्राप्त नहीं",de:"Nicht offiziell anerkannt",fr:"Non officiellement reconnue",it:"Non riconosciuta ufficialmente",es:"No reconocida oficialmente",pt:"Não reconhecido oficialmente",ru:"Официально не признан",uk:"Офіційно не визнана",ar:"غير معترف بها رسميًا",he:"אינה מוכרת רשמית",sw:"Haitambuliwi rasmi"},
    "Nubra Valley": {ja:"ヌブラ渓谷",ko:"누브라 계곡",zh:"努布拉谷",yue:"努布拉谷",vi:"thung lũng Nubra",th:"หุบเขานูบรา",id:"Lembah Nubra",hi:"नुब्रा घाटी",de:"Nubra-Tal",fr:"vallée de la Nubra",it:"valle di Nubra",es:"valle de Nubra",pt:"vale de Nubra",ru:"долина Нубра",uk:"долина Нубра",ar:"وادي نوبرا",he:"עמק נוברה",sw:"Bonde la Nubra"},
    "Oklahoma recognizes 39 Indigenous languages": {ja:"オクラホマ州は39の先住民言語を承認",ko:"오클라호마주는 39개 원주민 언어를 인정",zh:"俄克拉何马州承认39种原住民语言",yue:"奧克拉荷馬州承認39種原住民語言",vi:"Oklahoma công nhận 39 ngôn ngữ bản địa",th:"รัฐโอคลาโฮมารับรองภาษาพื้นเมือง 39 ภาษา",id:"Oklahoma mengakui 39 bahasa pribumi",hi:"ओक्लाहोमा 39 स्वदेशी भाषाओं को मान्यता देता है",de:"Oklahoma erkennt 39 indigene Sprachen an",fr:"l'Oklahoma reconnaît 39 langues autochtones",it:"l'Oklahoma riconosce 39 lingue indigene",es:"Oklahoma reconoce 39 lenguas indígenas",pt:"Oklahoma reconhece 39 línguas indígenas",ru:"Оклахома признаёт 39 языков коренных народов",uk:"Оклахома визнає 39 корінних мов",ar:"أوكلاهوما تعترف بـ39 لغة أصلية",he:"אוקלהומה מכירה ב-39 שפות ילידיות",sw:"Oklahoma inatambua lugha 39 za asili"},
    "Onondaga Nation Reservation": {ja:"オノンダガ・ネーション居留地",ko:"오논다가 네이션 보호구역",vi:"Khu bảo lưu của bộ tộc Onondaga",th:"เขตสงวนของชนเผ่าโอนันดากา",id:"Reservasi Bangsa Onondaga",de:"Reservat der Onondaga Nation",fr:"réserve de la Nation onondaga",it:"riserva della Onondaga Nation",es:"reserva de la Nación Onondaga",pt:"Reserva da Nação Onondaga",ru:"резервация нации онондага",uk:"Резервація нації онондага",he:"שמורת אומת אונונדגה"},
    "Palestinian territories + diaspora": {ja:"パレスチナ自治区＋ディアスポラ",ko:"팔레스타인 지역 + 디아스포라",zh:"巴勒斯坦地区及侨民社群",yue:"巴勒斯坦地區及僑民社群",vi:"các vùng lãnh thổ Palestine và cộng đồng hải ngoại",th:"ดินแดนปาเลสไตน์และชาวพลัดถิ่น",id:"wilayah Palestina + diaspora",hi:"फ़िलिस्तीनी क्षेत्र + प्रवासी समुदाय",de:"Palästinensische Gebiete + Diaspora",fr:"Territoires palestiniens + diaspora",it:"territori palestinesi e diaspora",es:"territorios palestinos y diáspora",pt:"territórios palestinos e diáspora",ru:"палестинские территории и диаспора",uk:"Палестинські території + діаспора",ar:"الأراضي الفلسطينية + الشتات",he:"השטחים הפלסטיניים והתפוצה",sw:"maeneo ya Palestina na diaspora"},
    "Panamanian Academy of Language": {ja:"パナマ言語アカデミー",ko:"파나마 언어 아카데미",zh:"巴拿马语言学院",yue:"巴拿馬語言學院",vi:"Viện Hàn lâm Ngôn ngữ Panama",th:"สถาบันภาษาแห่งปานามา",id:"Akademi Bahasa Panama",hi:"पनामा भाषा अकादमी",de:"Panamaische Sprachakademie",fr:"Académie panaméenne de la langue",it:"Accademia Panamense della Lingua",es:"Academia Panameña de la Lengua",pt:"Academia Panamenha da Língua",ru:"Панамская академия языка",uk:"Панамська академія мови",ar:"أكاديمية اللغة البنمية",he:"האקדמיה הפנמית ללשון",sw:"Chuo cha Lugha cha Panama"},
    "Pasco": {ja:"パスコ",ko:"파스코",zh:"帕斯科",yue:"帕斯科",ru:"Паско",uk:"Паско",ar:"باسكو"},
    "Peru recognizes constitutional bilingualism": {ja:"ペルーは憲法上の二言語主義を認めている",ko:"페루는 헌법상 이중언어주의를 인정",zh:"秘鲁宪法承认双语制",yue:"秘魯憲法承認雙語制",vi:"Peru công nhận chế độ song ngữ theo hiến pháp",th:"เปรูรับรองการใช้สองภาษาตามรัฐธรรมนูญ",id:"Peru mengakui dwibahasa konstitusional",hi:"पेरू संवैधानिक द्विभाषिकता को मान्यता देता है",de:"Peru erkennt verfassungsmäßige Zweisprachigkeit an",fr:"le Pérou reconnaît le bilinguisme constitutionnel",it:"il Perù riconosce il bilinguismo costituzionale",es:"Perú reconoce el bilingüismo constitucional",pt:"o Peru reconhece o bilinguismo constitucional",ru:"Перу конституционно признаёт двуязычие",uk:"Перу визнає конституційну двомовність",ar:"بيرو تعترف بالثنائية اللغوية الدستورية",he:"פרו מכירה בדו-לשוניות חוקתית",sw:"Peru inatambua uwili-lugha kikatiba"},
    "Portuguese in Mozambique": {ja:"モザンビークではポルトガル語",ko:"모잠비크에서는 포르투갈어",zh:"莫桑比克使用葡萄牙语",yue:"莫桑比克使用葡萄牙語",vi:"Tiếng Bồ Đào Nha ở Mozambique",th:"ภาษาโปรตุเกสในโมซัมบิก",id:"bahasa Portugis di Mozambik",hi:"मोज़ाम्बिक में पुर्तगाली",de:"Portugiesisch in Mosambik",fr:"le portugais au Mozambique",it:"portoghese in Mozambico",es:"portugués en Mozambique",pt:"português em Moçambique",ru:"португальский в Мозамбике",uk:"португальська в Мозамбіку",ar:"البرتغالية في موزمبيق",he:"פורטוגזית במוזמביק",sw:"Kireno nchini Msumbiji"},
    "Ram Khamhaeng": {ja:"ラームカムヘーン",ko:"람캄행",zh:"兰甘亨",yue:"蘭甘亨",th:"รามคำแหง",uk:"Рамкхамхенг"},
    "Reformation": {ja:"宗教改革",ko:"종교개혁",zh:"宗教改革",yue:"宗教改革",vi:"Cải cách Tin Lành",th:"การปฏิรูปศาสนา",id:"Reformasi",hi:"धर्मसुधार आंदोलन",fr:"Réforme",it:"Riforma",es:"Reforma",pt:"Reforma",ru:"Реформация",uk:"Реформація",ar:"الإصلاح البروتستانتي",he:"הרפורמציה",sw:"Matengenezo ya Kanisa"},
    "Rivers State": {ja:"リバーズ州",ko:"리버스주",zh:"河流州",yue:"河流州",vi:"bang Rivers",th:"รัฐริเวอร์ส",id:"Negara Bagian Rivers",de:"Bundesstaat Rivers",fr:"État de Rivers",it:"Stato di Rivers",es:"estado de Rivers",pt:"estado de Rivers",ru:"штат Риверс",uk:"штат Ріверс",ar:"ولاية ريفرز",he:"מדינת ריברס",sw:"Jimbo la Rivers"},
    "Romanized": {ja:"ローマ字化",ko:"로마자화",zh:"罗马化",yue:"羅馬化",vi:"La-tinh hóa",th:"เขียนด้วยอักษรโรมัน",id:"Diromanisasi",hi:"रोमनीकृत",de:"Romanisiert",fr:"romanisé",it:"romanizzata",es:"romanizada",pt:"romanizado",ru:"латинизированный",uk:"латинізована",ar:"مكتوبة بالحروف اللاتينية",he:"בתעתיק לטיני",sw:"kwa herufi za Kilatini"},
    "San Martín": {ja:"サンマルティン",ko:"산마르틴",zh:"圣马丁",yue:"聖馬丁",ru:"Сан-Мартин",uk:"Сан-Мартін",ar:"سان مارتين"},
    "Siglo de Oro": {ja:"黄金世紀",ko:"황금세기",zh:"黄金世纪",yue:"黃金世紀",pt:"Século de Ouro",ru:"Золотой век",he:"תור הזהב הספרדי"},
    "Sikasso Region": {ja:"シカソ地方",ko:"시카소 지역",zh:"锡卡索大区",yue:"錫卡索大區",vi:"vùng Sikasso",id:"Wilayah Sikasso",de:"Region Sikasso",fr:"région de Sikasso",it:"regione di Sikasso",es:"región de Sikasso",pt:"Região de Sikasso",ru:"область Сикасо",uk:"область Сікассо",ar:"إقليم سيكاسو",he:"אזור סיקאסו",sw:"Mkoa wa Sikasso"},
    "Southern China coast": {ja:"中国南部沿岸",ko:"중국 남부 해안",zh:"华南沿海",yue:"華南沿海",vi:"vùng duyên hải Nam Trung Quốc",th:"ชายฝั่งจีนตอนใต้",id:"pesisir Tiongkok selatan",hi:"दक्षिणी चीन का तट",de:"südchinesische Küste",fr:"côte du sud de la Chine",it:"costa della Cina meridionale",es:"costa del sur de China",pt:"costa do sul da China",ru:"побережье Южного Китая",uk:"узбережжя Південного Китаю",ar:"ساحل جنوب الصين",he:"חוף דרום סין",sw:"pwani ya kusini mwa China"},
    "Spanish is official": {ja:"スペイン語が公用語",ko:"스페인어가 공용어",zh:"西班牙语为官方语言",yue:"西班牙語為官方語言",vi:"Tiếng Tây Ban Nha là ngôn ngữ chính thức",th:"ภาษาสเปนเป็นภาษาราชการ",id:"bahasa Spanyol adalah bahasa resmi",hi:"स्पेनिश आधिकारिक भाषा है",de:"Spanisch ist Amtssprache",fr:"l'espagnol est langue officielle",it:"lo spagnolo è ufficiale",es:"el español es oficial",pt:"o espanhol é oficial",ru:"испанский — официальный язык",uk:"іспанська є офіційною",ar:"الإسبانية لغة رسمية",he:"ספרדית היא שפה רשמית",sw:"Kihispania ni lugha rasmi"},
    "Sukhothai Kingdom": {ja:"スコータイ王朝",ko:"수코타이 왕국",zh:"素可泰王国",yue:"素可泰王國",vi:"Vương quốc Sukhothai",th:"อาณาจักรสุโขทัย",id:"Kerajaan Sukhothai",hi:"सुखोथाई साम्राज्य",de:"Königreich Sukhothai",fr:"royaume de Sukhothaï",it:"Regno di Sukhothai",es:"Reino de Sukhothai",pt:"Reino de Sukhothai",ru:"Сукхотайское королевство",uk:"Королівство Сукхотай",ar:"مملكة سوخوتاي",he:"ממלכת סוקהותאי",sw:"Ufalme wa Sukhothai"},
    "Suriname": {ja:"スリナム",ko:"수리남",zh:"苏里南",yue:"蘇里南",th:"ซูรินาม",hi:"सूरीनाम",es:"Surinam",ru:"Суринам",uk:"Суринам",ar:"سورينام",he:"סורינאם"},
    "Swahili and English are official": {ja:"スワヒリ語と英語が公用語",ko:"스와힐리어와 영어가 공용어",zh:"斯瓦希里语和英语为官方语言",yue:"斯瓦希里語及英語為官方語言",vi:"Tiếng Swahili và tiếng Anh là ngôn ngữ chính thức",th:"ภาษาสวาฮีลีและภาษาอังกฤษเป็นภาษาราชการ",id:"bahasa Swahili dan Inggris adalah bahasa resmi",hi:"स्वाहिली और अंग्रेज़ी आधिकारिक भाषाएँ हैं",de:"Swahili und Englisch sind Amtssprachen",fr:"le swahili et l'anglais sont langues officielles",it:"lo swahili e l'inglese sono ufficiali",es:"el suajili y el inglés son oficiales",pt:"o suaíli e o inglês são oficiais",ru:"суахили и английский — официальные языки",uk:"суахілі та англійська є офіційними",ar:"السواحيلية والإنجليزية لغتان رسميتان",he:"סווהילית ואנגלית הן שפות רשמיות",sw:"Kiswahili na Kiingereza ni lugha rasmi"},
    "Swahili in Tanzania": {ja:"タンザニアではスワヒリ語",ko:"탄자니아에서는 스와힐리어",zh:"坦桑尼亚使用斯瓦希里语",yue:"坦桑尼亞使用斯瓦希里語",vi:"Tiếng Swahili ở Tanzania",th:"ภาษาสวาฮีลีในแทนซาเนีย",id:"bahasa Swahili di Tanzania",hi:"तंज़ानिया में स्वाहिली",de:"Swahili in Tansania",fr:"le swahili en Tanzanie",it:"swahili in Tanzania",es:"suajili en Tanzania",pt:"suaíli na Tanzânia",ru:"суахили в Танзании",uk:"суахілі в Танзанії",ar:"السواحيلية في تنزانيا",he:"סווהילית בטנזניה",sw:"Kiswahili nchini Tanzania"},
    "Sächsische Kanzleisprache": {ja:"ザクセン官房語",fr:"langue de la chancellerie saxonne",ru:"саксонский канцелярский язык"},
    "Taif": {ja:"ターイフ",ko:"타이프",zh:"塔伊夫",yue:"塔伊夫",hi:"ताइफ़",ru:"Таиф",uk:"Таїф",ar:"الطائف",he:"טאיף"},
    "Taishan + global diaspora": {ja:"台山＋世界のディアスポラ",ko:"타이산 + 전 세계 디아스포라",zh:"台山及全球侨民",yue:"台山及全球僑民",vi:"Đài Sơn và cộng đồng hải ngoại toàn cầu",th:"ไถซานและชาวพลัดถิ่นทั่วโลก",id:"Taishan + diaspora global",de:"Taishan + weltweite Diaspora",fr:"Taishan + diaspora mondiale",it:"Taishan e diaspora globale",es:"Taishan y diáspora global",pt:"Taishan e diáspora global",ru:"Тайшань и мировая диаспора",uk:"Тайшань + світова діаспора",he:"טאישאן והתפוצה העולמית",sw:"Taishan na diaspora ya kimataifa"},
    "Tangkhul is recognized regionally": {ja:"タンクル語は地域的に認定",ko:"탕쿨어는 지역적으로 인정",vi:"Tiếng Tangkhul được công nhận ở cấp khu vực",id:"Tangkhul diakui di tingkat regional",hi:"तांगखुल को क्षेत्रीय स्तर पर मान्यता प्राप्त है",de:"Tangkhul ist regional anerkannt",fr:"le tangkhul est reconnu au niveau régional",it:"il tangkhul è riconosciuto a livello regionale",es:"el tangkhul está reconocido a nivel regional",pt:"o tangkhul é reconhecido regionalmente",uk:"тангкхул визнана на регіональному рівні",sw:"Tangkhul inatambuliwa kikanda"},
    "Thai": {vi:"Thái",th:"ไทย",hi:"थाई",fr:"thaï",it:"thai",es:"tailandés",pt:"tailandês",ru:"тайский",uk:"тайська",ar:"التايلاندية",he:"תאית",sw:"Kithai"},
    "Theravada": {ja:"上座部仏教",ko:"상좌부 불교",zh:"上座部佛教",yue:"上座部佛教",vi:"Thượng tọa bộ",th:"เถรวาท",hi:"थेरवाद",ru:"тхеравада",uk:"Тхеравада",ar:"ثيرافادا"},
    "Tok Pisin": {ja:"トク・ピシン",ko:"톡피신",zh:"托克皮辛语",yue:"托克皮辛語",hi:"टोक पिसिन",ru:"ток-писин",uk:"ток-пісін",ar:"توك بيسين",he:"טוק פיסין"},
    "Tornedalian Finnish in Norrbotten": {ja:"ノールボッテンのトルネダール・フィンランド語",vi:"Tiếng Phần Lan Tornedal ở Norrbotten",de:"Tornedalfinnisch in Norrbotten",it:"finlandese di Tornedalen nel Norrbotten",es:"finés de Tornedalen en Norrbotten",pt:"finlandês de Tornedalen em Norrbotten",ru:"торнедальский финский в Норрботтене",uk:"торнедальська фінська в Норрботтені",he:"פינית טורנדאלית בנורבוטן",sw:"Kifini cha Tornedalen huko Norrbotten"},
    "Transcarpathia": {ja:"ザカルパッチャ",ko:"자카르파탸",zh:"外喀尔巴阡",yue:"外喀爾巴阡",de:"Transkarpatien",fr:"Transcarpatie",it:"Transcarpazia",es:"Transcarpatia",pt:"Transcarpácia",ru:"Закарпатье",uk:"Закарпаття",ar:"زاكارباتيا"},
    "Turkey: no formal recognition": {ja:"トルコ：公式な承認なし",ko:"튀르키예: 공식 인정 없음",zh:"土耳其：无正式承认",yue:"土耳其：無正式承認",vi:"Thổ Nhĩ Kỳ: không có sự công nhận chính thức",th:"ตุรกี: ไม่มีการรับรองอย่างเป็นทางการ",id:"Turki: tanpa pengakuan resmi",hi:"तुर्की: कोई औपचारिक मान्यता नहीं",de:"Türkei: keine formelle Anerkennung",fr:"Turquie : aucune reconnaissance officielle",it:"Turchia: nessun riconoscimento formale",es:"Turquía: sin reconocimiento formal",pt:"Turquia: sem reconhecimento formal",ru:"Турция: официального признания нет",uk:"Туреччина: офіційного визнання немає",ar:"تركيا: لا اعتراف رسمي",he:"טורקיה: ללא הכרה רשמית",sw:"Uturuki: hakuna utambuzi rasmi"},
    "Tyneside": {ja:"タインサイド",ko:"타인사이드",zh:"泰恩赛德",yue:"泰恩賽德",th:"ไทน์ไซด์",ru:"Тайнсайд",uk:"Тайнсайд",ar:"تاينسايد",he:"טיינסייד"},
    "UNESCO": {ja:"ユネスコ",ko:"유네스코",zh:"联合国教科文组织",yue:"聯合國教科文組織",th:"ยูเนสโก",hi:"यूनेस्को",ru:"ЮНЕСКО",uk:"ЮНЕСКО",ar:"اليونسكو",he:"אונסק\"ו"},
    "UNESCO: vulnerable": {ja:"ユネスコ：脆弱",ko:"유네스코: 취약",zh:"联合国教科文组织：脆弱",yue:"聯合國教科文組織：脆弱",vi:"UNESCO: dễ bị tổn thương",th:"ยูเนสโก: เสี่ยงต่อการสูญหาย",id:"UNESCO: rentan",hi:"यूनेस्को: असुरक्षित",de:"UNESCO: gefährdet",fr:"UNESCO : vulnérable",it:"UNESCO: vulnerabile",pt:"UNESCO: vulnerável",ru:"ЮНЕСКО: уязвимый",uk:"ЮНЕСКО: вразлива",ar:"اليونسكو: معرضة للخطر",he:"אונסק\"ו: פגיעה",sw:"UNESCO: katika hatari"},
    "USA: federally recognized tribes": {ja:"米国：連邦公認部族",ko:"미국: 연방 인정 부족",zh:"美国：联邦承认部落",yue:"美國：聯邦承認部落",vi:"Hoa Kỳ: các bộ lạc được liên bang công nhận",th:"สหรัฐฯ: ชนเผ่าที่รัฐบาลกลางรับรอง",id:"AS: suku-suku yang diakui secara federal",hi:"अमेरिका: संघीय मान्यता प्राप्त जनजातियाँ",de:"USA: bundesweit anerkannte Stämme",fr:"États-Unis : tribus reconnues au niveau fédéral",it:"USA: tribù riconosciute a livello federale",es:"EE. UU.: tribus reconocidas federalmente",pt:"EUA: tribos reconhecidas federalmente",ru:"США: федерально признанные племена",uk:"США: федерально визнані племена",ar:"الولايات المتحدة: قبائل معترف بها فيدراليًا",he:"ארה\"ב: שבטים מוכרים פדרלית",sw:"Marekani: makabila yanayotambuliwa na serikali ya shirikisho"},
    "Upper Yellow River": {ja:"黄河上流域",ko:"황허 상류",zh:"黄河上游",yue:"黃河上游",vi:"thượng lưu Hoàng Hà",th:"แม่น้ำหวงเหอตอนบน",id:"hulu Sungai Kuning",de:"oberer Gelber Fluss",fr:"cours supérieur du fleuve Jaune",it:"alto corso del Fiume Giallo",es:"curso alto del río Amarillo",pt:"alto rio Amarelo",ru:"верхнее течение Хуанхэ",uk:"верхня течія Хуанхе",ar:"أعالي النهر الأصفر",he:"הנהר הצהוב העליון",sw:"sehemu ya juu ya Mto Njano"},
    "Ural region": {ja:"ウラル地方",ko:"우랄 지역",zh:"乌拉尔地区",yue:"烏拉爾地區",vi:"vùng Ural",th:"ภูมิภาคอูราล",id:"wilayah Ural",hi:"उराल क्षेत्र",de:"Uralregion",fr:"région de l'Oural",it:"regione degli Urali",es:"región de los Urales",pt:"região dos Urais",ru:"Уральский регион",uk:"Уральський регіон",ar:"منطقة الأورال",he:"אזור אורל",sw:"eneo la Ural"},
    "Wabanaki Confederacy recognized": {ja:"ワバナキ連合公認",ko:"와바나키 연맹 인정",vi:"Liên minh Wabanaki được công nhận",th:"สมาพันธ์วาบานากิได้รับการรับรอง",id:"Konfederasi Wabanaki diakui",de:"Wabanaki-Konföderation anerkannt",fr:"Confédération wabanaki reconnue",it:"riconosciuta dalla Confederazione Wabanaki",es:"reconocida por la Confederación Wabanaki",pt:"Confederação Wabanaki reconhecida",ru:"признана Конфедерация вабанаки",uk:"Конфедерація вабанакі визнана",he:"קונפדרציית ואבנאקי מוכרת",sw:"Shirikisho la Wabanaki linatambuliwa"},
    "Wuyuan county": {ja:"婺源県",ko:"우위안현",zh:"婺源县",yue:"婺源縣",vi:"huyện Vụ Nguyên",th:"อำเภออู้หยวน",id:"kabupaten Wuyuan",de:"Kreis Wuyuan",fr:"district de Wuyuan",it:"contea di Wuyuan",es:"condado de Wuyuan",pt:"condado de Wuyuan",ru:"уезд Уюань",uk:"повіт Уюань",sw:"wilaya ya Wuyuan"},
    "Wyoming": {ja:"ワイオミング州",ko:"와이오밍주",zh:"怀俄明州",yue:"懷俄明州",th:"รัฐไวโอมิง",hi:"व्योमिंग",ru:"Вайоминг",uk:"Вайомінг",ar:"وايومنغ",he:"ויומינג"},
    "Xinzhou": {ja:"忻州",ko:"신저우",zh:"忻州",yue:"忻州",vi:"Hân Châu",th:"ซินโจว",ru:"Синьчжоу",uk:"Сіньчжоу",he:"שינג'ואו"},
    "Yanbu": {ja:"ヤンブー",ko:"얀부",zh:"延布",yue:"延布",ru:"Янбу",uk:"Янбу",ar:"ينبع"},
    "Yanesha bilingual education programmes exist": {ja:"ヤネシャ語のバイリンガル教育プログラムが存在",ko:"야네샤어 이중언어 교육 프로그램 존재",vi:"Có các chương trình giáo dục song ngữ tiếng Yanesha",id:"terdapat program pendidikan dwibahasa Yanesha",de:"Es gibt zweisprachige Bildungsprogramme auf Yanesha",fr:"il existe des programmes d'éducation bilingue en yanesha",it:"esistono programmi di educazione bilingue in yanesha",es:"existen programas de educación bilingüe en yanesha",pt:"existem programas de educação bilíngue em yanesha",ru:"существуют программы двуязычного образования на янеша",uk:"існують програми двомовної освіти янеша",he:"קיימות תוכניות חינוך דו-לשוני ביאנשה",sw:"kuna programu za elimu ya lugha mbili za Yanesha"},
    "Yichun": {ja:"宜春",ko:"이춘",zh:"宜春",yue:"宜春",ru:"Ичунь",uk:"Ічунь"},
    "Yongzhou subdialect": {ja:"永州の下位方言",ko:"융저우 하위 방언",zh:"永州次方言",yue:"永州次方言",vi:"phương ngữ nhánh Vĩnh Châu",th:"ภาษาถิ่นย่อยหย่งโจว",id:"subdialek Yongzhou",de:"Yongzhou-Subdialekt",fr:"sous-dialecte de Yongzhou",it:"sottodialetto di Yongzhou",es:"subdialecto de Yongzhou",pt:"subdialeto de Yongzhou",ru:"юнчжоуский говор",uk:"піддіалект Юнчжоу",sw:"lahaja ndogo ya Yongzhou"},
    "Zhangzhou prefecture and diaspora": {ja:"漳州地区とディアスポラ",ko:"장저우 지구 및 디아스포라",zh:"漳州地区及海外侨民",yue:"漳州地區及海外僑民",vi:"địa cấp thị Chương Châu và cộng đồng hải ngoại",th:"เขตจางโจวและชาวพลัดถิ่น",id:"prefektur Zhangzhou dan diasporanya",de:"Präfektur Zhangzhou und Diaspora",fr:"préfecture de Zhangzhou et diaspora",it:"prefettura di Zhangzhou e diaspora",es:"prefectura de Zhangzhou y diáspora",pt:"prefeitura de Zhangzhou e diáspora",ru:"округ Чжанчжоу и диаспора",uk:"округ Чжанчжоу та діаспора",he:"מחוז ג'אנגג'ואו והתפוצה",sw:"wilaya ya Zhangzhou na diaspora"},
    "academically": {ja:"学術的に",ko:"학술적으로",zh:"学术上",yue:"學術上",vi:"trong học thuật",th:"ในเชิงวิชาการ",id:"secara akademis",hi:"अकादमिक रूप से",de:"akademisch",fr:"en milieu universitaire",it:"in ambito accademico",es:"en el ámbito académico",pt:"academicamente",ru:"в академической среде",he:"אקדמית",sw:"kitaaluma"},
    "active Armenian Apostolic liturgical use": {ja:"アルメニア使徒教会の典礼で活発に使用",ko:"아르메니아 사도교회 전례에서 활발히 사용",zh:"亚美尼亚使徒教会礼仪中仍活跃使用",yue:"亞美尼亞使徒教會禮儀中仍活躍使用",vi:"đang được dùng trong phụng vụ của Giáo hội Tông truyền Armenia",th:"มีการใช้ในพิธีกรรมของคริสตจักรอาร์เมเนียอัครทูตอยู่",id:"penggunaan liturgis Apostolik Armenia yang aktif",hi:"अर्मेनियाई अपोस्तोलिक धर्मविधि में सक्रिय उपयोग",de:"aktiver liturgischer Gebrauch in der Armenisch-Apostolischen Kirche",fr:"usage liturgique actif dans l'Église apostolique arménienne",it:"uso liturgico attivo nella Chiesa apostolica armena",es:"uso litúrgico activo en la Iglesia apostólica armenia",pt:"uso litúrgico ativo na Igreja Apostólica Armênia",ru:"активное литургическое использование в Армянской апостольской церкви",uk:"активне літургійне використання у Вірменській апостольській церкві",ar:"استخدام ليتورجي نشط في الكنيسة الأرمنية الرسولية",he:"שימוש ליטורגי פעיל בכנסייה הארמנית האפוסטולית",sw:"matumizi hai ya kiliturujia katika Kanisa la Kitume la Armenia"},
    "active religious": {zh:"宗教场合活跃使用",yue:"宗教場合活躍使用",vi:"đang dùng trong tôn giáo",th:"ใช้ในทางศาสนาอยู่",id:"religius aktif",hi:"सक्रिय धार्मिक",pt:"uso religioso ativo",ru:"активное религиозное использование",he:"דתי פעיל",sw:"kidini hai"},
    "active speakers far fewer": {ja:"実際の話者数ははるかに少ない",ko:"실제 사용 화자는 훨씬 적음",zh:"实际使用者远少于此",yue:"實際使用者遠少於此",vi:"số người nói tích cực ít hơn nhiều",th:"ผู้พูดที่ใช้จริงมีน้อยกว่ามาก",id:"penutur aktif jauh lebih sedikit",hi:"सक्रिय वक्ता कहीं कम",de:"aktive Sprecher deutlich weniger",fr:"locuteurs actifs bien moins nombreux",it:"i parlanti attivi sono molto meno numerosi",es:"los hablantes activos son muchos menos",pt:"falantes ativos são bem menos numerosos",ru:"активных носителей значительно меньше",uk:"активних мовців значно менше",ar:"عدد المتحدثين النشطين أقل بكثير",he:"מספר הדוברים הפעילים נמוך בהרבה",sw:"wasemaji hai ni wachache zaidi"},
    "all bilingual in Georgian": {ja:"全員がジョージア語とのバイリンガル",ko:"모두 조지아어 이중언어 사용자",zh:"全部兼通格鲁吉亚语",yue:"全部兼通格魯吉亞語",vi:"tất cả đều song ngữ với tiếng Gruzia",th:"ผู้พูดทั้งหมดพูดภาษาจอร์เจียได้ด้วย",id:"semua dwibahasa dalam bahasa Georgia",hi:"सभी जॉर्जियाई में द्विभाषी",de:"alle zweisprachig mit Georgisch",fr:"tous bilingues avec le géorgien",it:"tutti bilingui in georgiano",es:"todos bilingües en georgiano",pt:"todos bilíngues em georgiano",ru:"все двуязычны с грузинским",uk:"усі двомовні з грузинською",ar:"جميعهم ثنائيو اللغة مع الجورجية",he:"כולם דו-לשוניים גם בגאורגית",sw:"wote huzungumza pia Kijojia"},
    "also Rodrigues": {zh:"另有罗德里格斯岛",yue:"另有羅德里格斯島",vi:"cũng có ở Rodrigues",id:"juga Rodrigues",de:"auch Rodrigues",fr:"aussi Rodrigues",it:"anche Rodrigues",es:"también Rodrigues",pt:"também Rodrigues",ru:"также Родригес",he:"גם רודריגס",sw:"pia Rodrigues"},
    "ancestor of Imperial Aramaic": {ja:"帝国アラム語の祖先",ko:"제국 아람어의 조상",zh:"帝国阿拉米语的祖先",yue:"帝國阿拉米語的祖先",vi:"tổ tiên của tiếng Aram Đế quốc",th:"บรรพบุรุษของภาษาอราเมอิกจักรวรรดิ",id:"leluhur bahasa Aram Kekaisaran",de:"Vorläufer des Reichsaramäischen",fr:"ancêtre de l'araméen d'empire",it:"antenato dell'aramaico imperiale",es:"antepasado del arameo imperial",pt:"ancestral do aramaico imperial",ru:"предок имперского арамейского",uk:"предок імперської арамейської",ar:"سلف الآرامية الإمبراطورية",he:"אב-קדמון של הארמית הרשמית",sw:"asili ya Kiaramu cha Kifalme"},
    "ancestor of Low German": {ja:"低地ドイツ語の祖先",ko:"저지 독일어의 조상",zh:"低地德语的祖先",yue:"低地德語的祖先",vi:"tổ tiên của tiếng Hạ Đức",th:"บรรพบุรุษของภาษาเยอรมันต่ำ",de:"Vorläufer des Niederdeutschen",fr:"ancêtre du bas allemand",it:"antenato del basso tedesco",es:"antepasado del bajo alemán",pt:"ancestral do baixo-alemão",ru:"предок нижненемецкого",uk:"предок нижньонімецької",ar:"سلف الألمانية السفلى",he:"אב-קדמון של הגרמנית התחתית",sw:"asili ya Kijerumani cha Chini"},
    "basis of Língua Geral": {ja:"リングア・ジェラルの基礎",ko:"링구아 제랄의 기반",vi:"nền tảng của Língua Geral",id:"dasar Língua Geral",de:"Grundlage der Língua Geral",fr:"base de la língua geral",it:"base della Língua Geral",es:"base de la Língua Geral",pt:"base da Língua Geral",sw:"msingi wa Língua Geral"},
    "declining": {ja:"衰退中",ko:"쇠퇴 중",zh:"衰退中",yue:"衰退中",vi:"đang suy giảm",th:"กำลังลดลง",id:"menurun",hi:"घटती हुई",de:"rückläufig",fr:"en déclin",it:"in declino",es:"en declive",pt:"em declínio",ru:"в упадке",uk:"занепадає",ar:"في تراجع",he:"בדעיכה",sw:"inapungua"},
    "dormant": {ja:"休眠状態",ko:"휴면 상태",zh:"休眠",yue:"休眠",vi:"ngủ yên",th:"อยู่ในภาวะหยุดใช้",id:"dorman",hi:"सुप्त",de:"schlafend",fr:"dormante",it:"dormiente",es:"dormida",pt:"adormecido",ru:"спящий",uk:"спляча",ar:"خاملة",he:"רדומה",sw:"imelala"},
    "dormant since ~1980": {ja:"1980年頃から休眠状態",ko:"1980년경부터 휴면 상태",zh:"约1980年起休眠",yue:"約1980年起休眠",vi:"ngủ yên từ khoảng năm 1980",th:"หยุดใช้ตั้งแต่ราวปี 1980",id:"dorman sejak ~1980",hi:"~1980 से सुप्त",de:"schlafend seit ~1980",fr:"dormante depuis ~1980",it:"dormiente dal ~1980",es:"dormida desde ~1980",pt:"adormecido desde cerca de 1980",ru:"спящий примерно с 1980 года",uk:"спляча приблизно з 1980 року",ar:"خاملة منذ نحو 1980",he:"רדומה מאז ~1980",sw:"imelala tangu ~1980"},
    "eastern Central Asia": {ja:"中央アジア東部",ko:"중앙아시아 동부",zh:"中亚东部",yue:"中亞東部",vi:"miền đông Trung Á",th:"เอเชียกลางตะวันออก",id:"Asia Tengah timur",hi:"पूर्वी मध्य एशिया",de:"östliches Zentralasien",fr:"Asie centrale orientale",it:"Asia centrale orientale",es:"Asia Central oriental",pt:"leste da Ásia Central",ru:"восточная Центральная Азия",uk:"східна Центральна Азія",ar:"شرق آسيا الوسطى",he:"מזרח מרכז אסיה",sw:"mashariki mwa Asia ya Kati"},
    "eastern Himalaya": {ja:"東ヒマラヤ",ko:"히말라야 동부",zh:"喜马拉雅东部",yue:"喜馬拉雅東部",vi:"đông Himalaya",th:"เทือกเขาหิมาลัยตะวันออก",id:"Himalaya timur",hi:"पूर्वी हिमालय",de:"östlicher Himalaya",fr:"Himalaya oriental",it:"Himalaya orientale",es:"Himalaya oriental",pt:"leste do Himalaia",ru:"восточные Гималаи",uk:"східні Гімалаї",ar:"شرق الهيمالايا",he:"מזרח ההימלאיה",sw:"mashariki mwa Himalaya"},
    "eastern Siberia": {ja:"東シベリア",ko:"동시베리아",zh:"西伯利亚东部",yue:"西伯利亞東部",vi:"đông Siberia",th:"ไซบีเรียตะวันออก",id:"Siberia timur",hi:"पूर्वी साइबेरिया",de:"Ostsibirien",fr:"Sibérie orientale",it:"Siberia orientale",es:"Siberia oriental",pt:"leste da Sibéria",ru:"восточная Сибирь",uk:"східний Сибір",ar:"شرق سيبيريا",he:"מזרח סיביר",sw:"mashariki mwa Siberia"},
    "eastern Zimbabwe + adjacent Mozambique": {ja:"ジンバブエ東部＋隣接するモザンビーク",ko:"짐바브웨 동부 + 인접 모잠비크",zh:"津巴布韦东部及邻近莫桑比克",yue:"津巴布韋東部及鄰近莫桑比克",vi:"miền đông Zimbabwe và vùng Mozambique lân cận",th:"ซิมบับเวตะวันออกและโมซัมบิกที่อยู่ติดกัน",id:"Zimbabwe timur + Mozambik yang bersebelahan",hi:"पूर्वी ज़िम्बाब्वे + निकटवर्ती मोज़ाम्बिक",de:"östliches Simbabwe + angrenzendes Mosambik",fr:"est du Zimbabwe + Mozambique adjacent",it:"Zimbabwe orientale e Mozambico adiacente",es:"este de Zimbabue y zonas adyacentes de Mozambique",pt:"leste do Zimbábue e Moçambique adjacente",ru:"восточное Зимбабве и прилегающий Мозамбик",uk:"східне Зімбабве + прилеглий Мозамбік",ar:"شرق زيمبابوي + المناطق المجاورة من موزمبيق",he:"מזרח זימבבואה ומוזמביק הסמוכה",sw:"mashariki mwa Zimbabwe na Msumbiji jirani"},
    "effectively dormant": {ja:"事実上の休眠状態",ko:"사실상 휴면 상태",zh:"实际上已休眠",yue:"實際上已休眠",vi:"gần như ngủ yên",th:"แทบไม่มีการใช้แล้ว",id:"praktis dorman",hi:"व्यावहारिक रूप से सुप्त",de:"faktisch schlafend",fr:"pratiquement dormante",it:"di fatto dormiente",es:"prácticamente dormida",pt:"praticamente adormecido",ru:"фактически спящий",uk:"фактично спляча",ar:"خاملة فعليًا",he:"רדומה למעשה",sw:"kimsingi imelala"},
    "elderly memory only": {ja:"高齢者の記憶のみ",ko:"고령자의 기억으로만 남음",zh:"仅存于老年人的记忆中",yue:"僅存於老年人嘅記憶中",vi:"chỉ còn trong ký ức của người cao tuổi",th:"เหลืออยู่เพียงในความทรงจำของผู้สูงอายุ",id:"hanya dalam ingatan orang lanjut usia",hi:"केवल बुज़ुर्गों की स्मृति में",de:"nur noch in der Erinnerung Älterer",fr:"seulement dans la mémoire des anciens",it:"solo nella memoria degli anziani",es:"solo en la memoria de los ancianos",pt:"apenas na memória dos idosos",ru:"только в памяти пожилых",uk:"лише в пам'яті старшого покоління",ar:"في ذاكرة كبار السن فقط",he:"בזיכרון קשישים בלבד",sw:"katika kumbukumbu za wazee tu"},
    "established 2008": {ja:"2008年制定",ko:"2008년 제정",zh:"2008年确立",yue:"2008年確立",vi:"được thành lập năm 2008",th:"ก่อตั้งเมื่อปี 2008",id:"didirikan tahun 2008",hi:"2008 में स्थापित",it:"istituito nel 2008",es:"establecido en 2008",pt:"criado em 2008",ru:"создан в 2008 году",uk:"запроваджено 2008 року",ar:"أُنشئ عام 2008",he:"נוסד ב-2008",sw:"ilianzishwa mwaka 2008"},
    "extinct": {ja:"消滅",ko:"소멸",zh:"已消亡",yue:"已消亡",vi:"đã tuyệt chủng",th:"สูญหายแล้ว",id:"punah",hi:"विलुप्त",de:"ausgestorben",fr:"éteinte",it:"estinta",es:"extinta",pt:"extinto",ru:"вымерший",uk:"вимерла",ar:"منقرضة",he:"נכחדה",sw:"imetoweka"},
    "extinct 7 October 1992": {ja:"1992年10月7日に消滅",ko:"1992년 10월 7일 소멸",zh:"1992年10月7日消亡",yue:"1992年10月7日消亡",vi:"tuyệt chủng ngày 7 tháng 10 năm 1992",th:"สูญหายเมื่อ 7 ตุลาคม 1992",id:"punah 7 Oktober 1992",hi:"7 अक्टूबर 1992 को विलुप्त",de:"ausgestorben am 7. Oktober 1992",fr:"éteinte le 7 octobre 1992",it:"estinta il 7 ottobre 1992",es:"extinta el 7 de octubre de 1992",pt:"extinto em 7 de outubro de 1992",ru:"вымер 7 октября 1992 года",uk:"вимерла 7 жовтня 1992 року",ar:"انقرضت في 7 أكتوبر 1992",he:"נכחדה ב-7 באוקטובר 1992",sw:"ilitoweka tarehe 7 Oktoba 1992"},
    "extinct as L1": {ja:"第一言語としては消滅",ko:"제1언어로서는 소멸",zh:"作为第一语言已消亡",yue:"作為第一語言已消亡",vi:"tuyệt chủng với tư cách tiếng mẹ đẻ",th:"สูญหายในฐานะภาษาแม่",id:"punah sebagai L1",hi:"L1 के रूप में विलुप्त",de:"als L1 ausgestorben",fr:"éteinte en tant que L1",it:"estinta come L1",es:"extinta como L1",pt:"extinto como língua materna",ru:"вымер как родной язык",uk:"вимерла як рідна (L1)",ar:"منقرضة كلغة أولى",he:"נכחדה כשפת אם",sw:"imetoweka kama lugha ya kwanza"},
    "extinct as L1 c. 1100": {ja:"1100年頃に第一言語として消滅",ko:"1100년경 제1언어로서 소멸",zh:"约1100年起不再有母语者",yue:"約1100年起不再有母語者",vi:"tuyệt chủng với tư cách tiếng mẹ đẻ khoảng năm 1100",th:"สูญหายในฐานะภาษาแม่ราวปี 1100",id:"punah sebagai L1 sekitar 1100",hi:"लगभग 1100 में L1 के रूप में विलुप्त",de:"als L1 um 1100 ausgestorben",fr:"éteinte en tant que L1 vers 1100",it:"estinta come L1 verso il 1100",es:"extinta como L1 hacia 1100",pt:"extinto como língua materna por volta de 1100",ru:"вымер как родной язык около 1100 года",uk:"вимерла як рідна бл. 1100 року",ar:"منقرضة كلغة أولى نحو عام 1100",he:"נכחדה כשפת אם בסביבות שנת 1100",sw:"ilitoweka kama lugha ya kwanza takriban mwaka 1100"},
    "extinct early 18th century": {ja:"18世紀初頭に消滅",ko:"18세기 초 소멸",zh:"18世纪初消亡",yue:"18世紀初消亡",vi:"tuyệt chủng đầu thế kỷ 18",th:"สูญหายช่วงต้นคริสต์ศตวรรษที่ 18",id:"punah pada awal abad ke-18",hi:"18वीं सदी के आरंभ में विलुप्त",de:"ausgestorben Anfang des 18. Jahrhunderts",fr:"éteinte au début du XVIIIe siècle",it:"estinta all'inizio del XVIII secolo",es:"extinta a principios del siglo XVIII",pt:"extinto no início do século XVIII",ru:"вымер в начале XVIII века",uk:"вимерла на початку XVIII століття",ar:"انقرضت في أوائل القرن الثامن عشر",he:"נכחדה בתחילת המאה ה-18",sw:"ilitoweka mwanzoni mwa karne ya 18"},
    "extinct since early 20th c.": {ja:"20世紀初頭以降消滅",ko:"20세기 초 이후 소멸",zh:"自20世纪初起消亡",yue:"自20世紀初起消亡",vi:"tuyệt chủng từ đầu thế kỷ 20",th:"สูญหายตั้งแต่ต้นคริสต์ศตวรรษที่ 20",id:"punah sejak awal abad ke-20",hi:"20वीं सदी के आरंभ से विलुप्त",de:"ausgestorben seit Anfang des 20. Jh.",fr:"éteinte depuis le début du XXe s.",it:"estinta dall'inizio del XX sec.",es:"extinta desde principios del s. XX",pt:"extinto desde o início do século XX",ru:"вымер с начала XX века",uk:"вимерла з початку XX ст.",ar:"منقرضة منذ أوائل القرن العشرين",he:"נכחדה מאז תחילת המאה ה-20",sw:"imetoweka tangu mwanzoni mwa karne ya 20"},
    "extinct ~150 BCE": {ja:"紀元前150年頃に消滅",ko:"기원전 150년경 소멸",zh:"约公元前150年消亡",yue:"約公元前150年消亡",vi:"tuyệt chủng khoảng năm 150 TCN",th:"สูญหายราว 150 ปีก่อนคริสตกาล",id:"punah ~150 SM",hi:"~150 ईसा पूर्व विलुप्त",de:"ausgestorben ~150 v. Chr.",fr:"éteinte ~150 av. J.-C.",it:"estinta ~150 a.C.",es:"extinta ~150 a. C.",pt:"extinto por volta de 150 a.C.",ru:"вымер около 150 г. до н. э.",uk:"вимерла бл. 150 р. до н. е.",ar:"منقرضة نحو 150 ق.م",he:"נכחדה בסביבות 150 לפנה\"ס",sw:"ilitoweka takriban 150 KK"},
    "extinct ~1st c. BCE": {ja:"紀元前1世紀頃に消滅",ko:"기원전 1세기경 소멸",zh:"约公元前1世纪消亡",yue:"約公元前1世紀消亡",vi:"tuyệt chủng khoảng thế kỷ 1 TCN",th:"สูญหายราวศตวรรษที่ 1 ก่อนคริสตกาล",id:"punah ~abad ke-1 SM",hi:"~पहली सदी ईसा पूर्व विलुप्त",de:"ausgestorben ~1. Jh. v. Chr.",fr:"éteinte ~Ier s. av. J.-C.",it:"estinta ~I sec. a.C.",es:"extinta ~s. I a. C.",pt:"extinto por volta do séc. I a.C.",ru:"вымер около I в. до н. э.",uk:"вимерла бл. I ст. до н. е.",ar:"منقرضة نحو القرن الأول ق.م",he:"נכחדה בערך במאה ה-1 לפנה\"ס",sw:"ilitoweka takriban karne ya 1 KK"},
    "extinct ~1st c. CE": {ja:"紀元1世紀頃に消滅",ko:"서기 1세기경 소멸",zh:"约公元1世纪消亡",yue:"約公元1世紀消亡",vi:"tuyệt chủng khoảng thế kỷ 1 CN",th:"สูญหายราวคริสต์ศตวรรษที่ 1",id:"punah ~abad ke-1 M",hi:"~पहली सदी ईस्वी विलुप्त",de:"ausgestorben ~1. Jh. n. Chr.",fr:"éteinte ~Ier s. apr. J.-C.",it:"estinta ~I sec. d.C.",es:"extinta ~s. I d. C.",pt:"extinto por volta do séc. I d.C.",ru:"вымер около I в. н. э.",uk:"вимерла бл. I ст. н. е.",ar:"منقرضة نحو القرن الأول م",he:"נכחדה בערך במאה ה-1 לספירה",sw:"ilitoweka takriban karne ya 1 BK"},
    "federally recognized tribe with sovereignty": {ja:"主権を有する連邦公認部族",ko:"주권을 지닌 연방 인정 부족",zh:"拥有主权的联邦承认部落",yue:"擁有主權嘅聯邦承認部落",vi:"bộ lạc được liên bang công nhận và có chủ quyền",th:"ชนเผ่าที่รัฐบาลกลางรับรองและมีอำนาจอธิปไตย",id:"suku yang diakui secara federal dengan kedaulatan",hi:"संप्रभुता सहित संघीय मान्यता प्राप्त जनजाति",de:"vom Bund anerkannter Stamm mit Souveränität",fr:"tribu reconnue au niveau fédéral avec souveraineté",it:"tribù riconosciuta a livello federale con sovranità",es:"tribu reconocida federalmente con soberanía",pt:"tribo reconhecida federalmente com soberania",ru:"федерально признанное племя с суверенитетом",uk:"федерально визнане плем'я із суверенітетом",ar:"قبيلة معترف بها فيدراليًا وذات سيادة",he:"שבט מוכר פדרלית בעל ריבונות",sw:"kabila linalotambuliwa na serikali ya shirikisho lenye mamlaka ya kujitawala"},
    "highly endangered": {ja:"非常に危機的",ko:"매우 심각한 위기",zh:"高度濒危",yue:"高度瀕危",vi:"cực kỳ nguy cấp",th:"ใกล้สูญหายอย่างยิ่ง",id:"sangat terancam punah",hi:"अत्यधिक संकटग्रस्त",de:"hochgradig gefährdet",fr:"fortement menacée",it:"in grave pericolo",es:"en grave peligro",pt:"altamente ameaçado",ru:"под серьёзной угрозой исчезновения",uk:"під серйозною загрозою зникнення",ar:"مهددة بشدة بالانقراض",he:"בסכנת הכחדה חמורה",sw:"katika hatari kubwa"},
    "included in Bolivia's 2009 Constitution": {ja:"2009年ボリビア憲法に明記",ko:"2009년 볼리비아 헌법에 명시",zh:"列入玻利维亚2009年宪法",yue:"列入玻利維亞2009年憲法",vi:"được đưa vào Hiến pháp Bolivia năm 2009",th:"บรรจุอยู่ในรัฐธรรมนูญโบลิเวีย ค.ศ. 2009",id:"termasuk dalam Konstitusi Bolivia 2009",hi:"बोलीविया के 2009 के संविधान में शामिल",de:"in der bolivianischen Verfassung von 2009 verankert",fr:"inscrite dans la Constitution bolivienne de 2009",it:"inclusa nella Costituzione boliviana del 2009",es:"incluida en la Constitución de Bolivia de 2009",pt:"incluído na Constituição da Bolívia de 2009",ru:"включён в Конституцию Боливии 2009 года",uk:"включена до Конституції Болівії 2009 року",ar:"مُدرجة في دستور بوليفيا لعام 2009",he:"נכללת בחוקת בוליביה מ-2009",sw:"imejumuishwa katika Katiba ya Bolivia ya 2009"},
    "indigenous Mende script": {ja:"在来のメンデ文字",ko:"토착 멘데 문자",zh:"门德族本土文字",yue:"門德族本土文字",vi:"chữ viết bản địa Mende",th:"อักษรพื้นเมืองเมนเด",id:"aksara Mende asli",hi:"स्वदेशी मेंडे लिपि",de:"indigene Mende-Schrift",fr:"écriture mendé autochtone",it:"scrittura indigena mende",es:"escritura indígena mende",pt:"escrita própria dos mende",ru:"самобытное письмо менде",uk:"автохтонне письмо менде",ar:"الخط المندي الأصلي",he:"כתב מנדה ילידי",sw:"hati asilia ya Kimende"},
    "invented 1936 by Mangei Gomango": {vi:"do Mangei Gomango sáng tạo năm 1936",th:"ประดิษฐ์ขึ้นในปี 1936 โดย Mangei Gomango",id:"diciptakan tahun 1936 oleh Mangei Gomango",de:"1936 von Mangei Gomango erfunden",fr:"inventée en 1936 par Mangei Gomango",it:"inventata nel 1936 da Mangei Gomango",es:"inventada en 1936 por Mangei Gomango",pt:"criado em 1936 por Mangei Gomango",sw:"ilibuniwa mwaka 1936 na Mangei Gomango"},
    "largely undercounted in censuses": {ja:"国勢調査で大幅に過少計上",ko:"인구조사에서 크게 과소 집계됨",zh:"在人口普查中被严重低估",yue:"喺人口普查中被嚴重低估",vi:"phần lớn bị thống kê thiếu trong các cuộc điều tra dân số",th:"มักถูกนับต่ำกว่าความเป็นจริงในสำมะโนประชากร",id:"sebagian besar tidak terhitung dalam sensus",hi:"जनगणनाओं में काफ़ी कम गिनी गई",de:"in Volkszählungen stark untererfasst",fr:"largement sous-estimée dans les recensements",it:"ampiamente sottostimata nei censimenti",es:"muy subestimada en los censos",pt:"amplamente subestimado nos censos",ru:"во многом недоучтён в переписях",uk:"значно недооблікована в переписах",ar:"غير محسوبة بدقة في التعدادات",he:"מיוצגת בחסר במפקדי אוכלוסין",sw:"haihesabiwi ipasavyo katika sensa"},
    "largest Chibchan language by speakers": {ja:"話者数で最大のチブチャ語族言語",ko:"화자 수 기준 최대 치브차어족 언어",zh:"奇布查语系中使用人数最多的语言",yue:"奇布查語系中使用人數最多嘅語言",vi:"ngôn ngữ Chibcha lớn nhất theo số người nói",th:"ภาษาชิบชันที่มีผู้พูดมากที่สุด",id:"bahasa Chibcha terbesar berdasarkan jumlah penutur",hi:"वक्ताओं की संख्या के अनुसार सबसे बड़ी चिब्चन भाषा",de:"größte Chibcha-Sprache nach Sprecherzahl",fr:"plus grande langue chibcha par le nombre de locuteurs",it:"la lingua chibcha più parlata",es:"la lengua chibcha con más hablantes",pt:"maior língua chibcha em número de falantes",ru:"крупнейший чибчанский язык по числу носителей",uk:"найбільша чибчанська мова за кількістю мовців",ar:"أكبر لغة تشيبتشية من حيث عدد المتحدثين",he:"השפה הצ'יבצ'אנית הגדולה ביותר במספר דוברים",sw:"lugha kubwa zaidi ya familia ya Kichibcha kwa idadi ya wasemaji"},
    "last attested 2nd millennium BCE": {ja:"最後の記録は紀元前2千年紀",ko:"마지막 기록은 기원전 2천년기",zh:"最后见于公元前两千纪",yue:"最後見於公元前兩千紀",vi:"được chứng thực lần cuối vào thiên niên kỷ 2 TCN",th:"พบหลักฐานครั้งสุดท้ายในสหัสวรรษที่ 2 ก่อนคริสตกาล",id:"terakhir dibuktikan pada milenium ke-2 SM",hi:"अंतिम प्रमाण दूसरी सहस्राब्दी ईसा पूर्व",de:"zuletzt belegt im 2. Jahrtausend v. Chr.",fr:"dernière attestation au IIe millénaire av. J.-C.",it:"ultima attestazione II millennio a.C.",es:"última atestiguación en el II milenio a. C.",pt:"última atestação no 2º milênio a.C.",ru:"последние свидетельства — II тысячелетие до н. э.",uk:"останні свідчення — II тис. до н. е.",ar:"آخر شواهد لها من الألفية الثانية ق.م",he:"העדות האחרונה מהאלף השני לפנה\"ס",sw:"ushahidi wa mwisho ni wa milenia ya 2 KK"},
    "last inscriptions pre-79 CE": {ja:"最後の碑文は紀元79年以前",ko:"마지막 비문은 서기 79년 이전",zh:"最后的铭文早于公元79年",yue:"最後嘅銘文早於公元79年",vi:"các bi ký cuối cùng có trước năm 79 CN",th:"จารึกสุดท้ายก่อน ค.ศ. 79",id:"prasasti terakhir sebelum 79 M",hi:"अंतिम शिलालेख 79 ईस्वी से पहले",de:"letzte Inschriften vor 79 n. Chr.",fr:"dernières inscriptions avant 79 apr. J.-C.",it:"ultime iscrizioni anteriori al 79 d.C.",es:"últimas inscripciones anteriores al 79 d. C.",pt:"últimas inscrições anteriores a 79 d.C.",ru:"последние надписи — до 79 г. н. э.",uk:"останні написи до 79 р. н. е.",ar:"آخر النقوش قبل عام 79 م",he:"הכתובות האחרונות מלפני שנת 79 לספירה",sw:"maandishi ya mwisho ni ya kabla ya mwaka 79 BK"},
    "last speaker d. 2016": {ja:"最後の話者は2016年に死去",ko:"마지막 화자 2016년 사망",zh:"最后一位使用者于2016年去世",yue:"最後一位使用者於2016年去世",vi:"người nói cuối cùng mất năm 2016",th:"ผู้พูดคนสุดท้ายเสียชีวิตปี 2016",id:"penutur terakhir meninggal 2016",hi:"अंतिम वक्ता का निधन 2016",de:"letzter Sprecher gest. 2016",fr:"dernier locuteur mort en 2016",it:"ultimo parlante morto nel 2016",es:"último hablante fallecido en 2016",pt:"último falante faleceu em 2016",ru:"последний носитель умер в 2016 году",uk:"останній носій помер 2016 року",ar:"توفي آخر متحدث بها عام 2016",he:"הדובר האחרון נפטר ב-2016",sw:"msemaji wa mwisho alifariki 2016"},
    "last speaker died 2010": {ja:"最後の話者は2010年に死去",ko:"마지막 화자 2010년 사망",zh:"最后一位使用者于2010年去世",yue:"最後一位使用者於2010年去世",vi:"người nói cuối cùng mất năm 2010",th:"ผู้พูดคนสุดท้ายเสียชีวิตปี 2010",id:"penutur terakhir meninggal tahun 2010",hi:"अंतिम वक्ता का निधन 2010 में",de:"letzter Sprecher starb 2010",fr:"dernier locuteur mort en 2010",it:"ultimo parlante morto nel 2010",es:"último hablante fallecido en 2010",pt:"último falante faleceu em 2010",ru:"последний носитель умер в 2010 году",uk:"останній носій помер 2010 року",ar:"توفي آخر متحدث بها عام 2010",he:"הדובר האחרון נפטר ב-2010",sw:"msemaji wa mwisho alifariki 2010"},
    "lay pedagogical use": {zh:"世俗教学用途",yue:"世俗教學用途",vi:"dùng để giảng dạy cho người thế tục",th:"ใช้สอนแก่ฆราวาส",id:"penggunaan pedagogis oleh kalangan awam",de:"pädagogischer Gebrauch durch Laien",fr:"usage pédagogique par des laïcs",it:"uso didattico laico",es:"uso pedagógico laico",pt:"uso pedagógico laico",ru:"светское педагогическое использование",he:"שימוש פדגוגי חילוני",sw:"matumizi ya kielimu kwa walei"},
    "mainland Fiji": {ja:"フィジー本島部",ko:"피지 본섬",zh:"斐济本土",yue:"斐濟本土",vi:"đảo chính Fiji",th:"แผ่นดินใหญ่ฟิจิ",id:"Fiji daratan",hi:"मुख्य भूमि फ़िजी",de:"Fidschi-Festland",fr:"Fidji continentale",it:"Figi continentale",es:"Fiyi continental",pt:"Fiji continental",ru:"основной остров Фиджи",he:"פיג'י היבשתית",sw:"sehemu kuu ya Fiji"},
    "merged into Manchu": {ja:"満洲語に統合",ko:"만주어에 통합",zh:"已并入满语",yue:"已併入滿語",vi:"đã hợp nhất vào tiếng Mãn",th:"ถูกรวมเข้ากับภาษาแมนจู",id:"melebur ke dalam bahasa Manchu",hi:"मंचू में विलीन",de:"im Mandschurischen aufgegangen",fr:"absorbée par le mandchou",it:"confluita nel manciù",es:"fusionada con el manchú",pt:"fundiu-se no manchu",ru:"слился с маньчжурским",uk:"злилася з маньчжурською",ar:"اندمجت في المانشو",he:"התמזגה במנצ'ורית",sw:"iliungana na Kimanchu"},
    "middle Volga": {ja:"ヴォルガ川中流域",ko:"볼가강 중류",zh:"伏尔加河中游",yue:"伏爾加河中游",vi:"trung lưu sông Volga",th:"แม่น้ำวอลกาตอนกลาง",id:"Volga tengah",hi:"मध्य वोल्गा",de:"mittlere Wolga",fr:"moyenne Volga",it:"medio Volga",es:"Volga medio",pt:"médio Volga",ru:"среднее Поволжье",uk:"середнє Поволжя",ar:"منطقة الفولغا الوسطى",he:"הוולגה התיכונה",sw:"Volga ya Kati"},
    "mostly Singida Region central Tanzania": {ja:"主にタンザニア中部のシンギダ州",ko:"주로 탄자니아 중부 싱기다주",zh:"主要在坦桑尼亚中部辛吉达大区",yue:"主要喺坦桑尼亞中部辛吉達大區",vi:"chủ yếu ở vùng Singida, miền trung Tanzania",th:"ส่วนใหญ่อยู่ในภูมิภาคซิงกีดา ตอนกลางของแทนซาเนีย",id:"sebagian besar Wilayah Singida, Tanzania tengah",hi:"मुख्यतः सिंगिडा क्षेत्र, मध्य तंज़ानिया",de:"überwiegend Region Singida, Zentraltansania",fr:"surtout la région de Singida, au centre de la Tanzanie",it:"principalmente regione di Singida, Tanzania centrale",es:"principalmente la región de Singida, en el centro de Tanzania",pt:"principalmente a região de Singida, no centro da Tanzânia",ru:"в основном область Сингида в центральной Танзании",uk:"переважно область Сінгіда, центральна Танзанія",he:"בעיקר מחוז סינגידה במרכז טנזניה",sw:"hasa Mkoa wa Singida katikati mwa Tanzania"},
    "mostly elderly": {ja:"大半が高齢者",ko:"대부분 고령자",zh:"使用者多为老年人",yue:"使用者多為老年人",vi:"chủ yếu là người cao tuổi",th:"ส่วนใหญ่เป็นผู้สูงอายุ",id:"sebagian besar lanjut usia",hi:"ज़्यादातर बुज़ुर्ग",de:"überwiegend ältere Menschen",fr:"surtout des personnes âgées",it:"per lo più anziani",es:"en su mayoría ancianos",pt:"majoritariamente idosos",ru:"в основном пожилые",uk:"переважно люди старшого віку",ar:"معظمهم من كبار السن",he:"רובם קשישים",sw:"wengi ni wazee"},
    "no federal status": {ja:"連邦レベルでの地位なし",ko:"연방 차원의 지위 없음",zh:"无联邦地位",yue:"無聯邦地位",vi:"không có quy chế liên bang",th:"ไม่มีสถานะระดับรัฐบาลกลาง",id:"tanpa status federal",hi:"कोई संघीय दर्जा नहीं",de:"kein bundesweiter Status",fr:"aucun statut fédéral",it:"nessuno status federale",es:"sin estatus federal",pt:"sem status federal",ru:"федерального статуса нет",uk:"немає федерального статусу",ar:"لا وضع فيدرالي لها",he:"ללא מעמד פדרלי",sw:"bila hadhi ya shirikisho"},
    "no national language status": {ja:"国語としての地位なし",ko:"국어 지위 없음",zh:"无国家语言地位",yue:"無國家語言地位",vi:"không có quy chế ngôn ngữ quốc gia",th:"ไม่มีสถานะภาษาประจำชาติ",id:"tanpa status bahasa nasional",hi:"कोई राष्ट्रभाषा का दर्जा नहीं",de:"kein Status als Nationalsprache",fr:"aucun statut de langue nationale",it:"nessuno status di lingua nazionale",es:"sin estatus de lengua nacional",pt:"sem status de língua nacional",ru:"статуса национального языка нет",uk:"немає статусу національної мови",ar:"لا وضع لها كلغة وطنية",he:"ללא מעמד של שפה לאומית",sw:"bila hadhi ya lugha ya taifa"},
    "northern Arabia": {ja:"北アラビア",ko:"북부 아라비아",zh:"阿拉伯半岛北部",yue:"阿拉伯半島北部",vi:"bắc bán đảo Ả Rập",th:"ตอนเหนือของคาบสมุทรอาหรับ",id:"Arabia utara",hi:"उत्तरी अरब",de:"Nordarabien",fr:"Arabie du Nord",it:"Arabia settentrionale",es:"norte de Arabia",pt:"norte da Arábia",ru:"северная Аравия",uk:"Північна Аравія",ar:"شمال الجزيرة العربية",he:"צפון ערב",sw:"kaskazini mwa Arabia"},
    "not official federally": {ja:"連邦レベルでは公用語ではない",ko:"연방 차원에서는 공용어 아님",zh:"非联邦官方语言",yue:"非聯邦官方語言",vi:"không chính thức ở cấp liên bang",th:"ไม่เป็นภาษาราชการในระดับรัฐบาลกลาง",id:"tidak resmi di tingkat federal",hi:"संघीय स्तर पर आधिकारिक नहीं",de:"auf Bundesebene nicht amtlich",fr:"non officielle au niveau fédéral",it:"non ufficiale a livello federale",es:"no oficial a nivel federal",pt:"não é oficial em nível federal",ru:"не является официальным на федеральном уровне",uk:"не є офіційною на федеральному рівні",ar:"ليست رسمية على المستوى الفيدرالي",he:"אינה רשמית ברמה הפדרלית",sw:"si rasmi katika ngazi ya shirikisho"},
    "not separately documented": {ja:"個別には記録されていない",ko:"별도로 기록되지 않음",zh:"未单独记录",yue:"未單獨記錄",vi:"không được ghi chép riêng",th:"ไม่มีการบันทึกแยกต่างหาก",id:"tidak didokumentasikan secara terpisah",hi:"अलग से प्रलेखित नहीं",de:"nicht gesondert dokumentiert",fr:"non documentée séparément",it:"non documentata separatamente",es:"no documentada por separado",pt:"não documentado separadamente",ru:"отдельно не документирован",uk:"окремо не задокументована",ar:"غير موثقة بشكل منفصل",he:"אינה מתועדת בנפרד",sw:"haijarekodiwa kando"},
    "official language of Costa Rica": {ja:"コスタリカの公用語",ko:"코스타리카의 공용어",zh:"哥斯达黎加官方语言",yue:"哥斯達黎加官方語言",vi:"ngôn ngữ chính thức của Costa Rica",th:"ภาษาราชการของคอสตาริกา",id:"bahasa resmi Kosta Rika",hi:"कोस्टा रिका की आधिकारिक भाषा",de:"Amtssprache Costa Ricas",fr:"langue officielle du Costa Rica",it:"lingua ufficiale della Costa Rica",es:"lengua oficial de Costa Rica",pt:"língua oficial da Costa Rica",ru:"официальный язык Коста-Рики",uk:"офіційна мова Коста-Рики",ar:"اللغة الرسمية لكوستاريكا",he:"שפה רשמית של קוסטה ריקה",sw:"lugha rasmi ya Costa Rica"},
    "on Rotuma": {zh:"在罗图马岛",yue:"喺羅圖馬島",vi:"trên đảo Rotuma",th:"บนเกาะโรตูมา",id:"di Rotuma",de:"auf Rotuma",fr:"à Rotuma",it:"a Rotuma",es:"en Rotuma",pt:"em Rotuma",ru:"на Ротуме",he:"ברוטומה",sw:"huko Rotuma"},
    "pedagogical use": {ja:"教育目的での使用",ko:"교육 목적 사용",zh:"用于教学",yue:"用於教學",vi:"sử dụng trong giảng dạy",th:"ใช้ในการเรียนการสอน",id:"penggunaan pedagogis",hi:"शैक्षणिक उपयोग",de:"pädagogischer Gebrauch",fr:"usage pédagogique",it:"uso didattico",es:"uso pedagógico",pt:"uso pedagógico",ru:"педагогическое использование",uk:"навчальне використання",ar:"استخدام تعليمي",he:"שימוש פדגוגי",sw:"matumizi ya kielimu"},
    "pedagogical use in Spanish lit": {ja:"スペイン文学教育での使用",ko:"스페인 문학 교육에서 사용",zh:"用于西班牙文学教学",yue:"用於西班牙文學教學",vi:"dùng trong giảng dạy văn học Tây Ban Nha",th:"ใช้ในการเรียนการสอนวรรณคดีสเปน",id:"penggunaan pedagogis dalam sastra Spanyol",hi:"स्पेनिश साहित्य में शैक्षणिक उपयोग",de:"pädagogischer Gebrauch in der spanischen Literatur",fr:"usage pédagogique en littérature espagnole",it:"uso didattico nella letteratura spagnola",es:"uso pedagógico en la literatura española",pt:"uso pedagógico na literatura espanhola",ru:"используется при изучении испанской литературы",uk:"навчальне використання в іспанській літературі",ar:"استخدام تعليمي في الأدب الإسباني",he:"שימוש פדגוגי בשיעורי ספרות ספרדית",sw:"matumizi ya kielimu katika fasihi ya Kihispania"},
    "plus digraphs": {zh:"另加双字母组合",yue:"另加雙字母組合",vi:"cộng thêm các chữ ghép",th:"รวมทั้งอักษรคู่",id:"ditambah digraf",hi:"साथ ही द्विअक्षर",de:"plus Digraphen",fr:"plus les digrammes",it:"più i digrammi",es:"más los dígrafos",pt:"mais dígrafos",ru:"плюс диграфы",uk:"плюс диграфи",he:"בתוספת דיגרפים",sw:"pamoja na michanganyiko ya herufi mbili"},
    "plus semi-speakers": {zh:"另有半语者",yue:"另有半語者",vi:"cộng thêm những người nói bán phần",th:"รวมผู้พูดกึ่งคล่อง",id:"ditambah semi-penutur",hi:"साथ ही अर्ध-वक्ता",de:"plus Halbsprecher",fr:"plus les semi-locuteurs",it:"più i semiparlanti",es:"más los semihablantes",pt:"mais semifalantes",ru:"плюс полуносители",uk:"плюс напівносії",ar:"بالإضافة إلى أشباه المتحدثين",he:"בתוספת דוברים חלקיים",sw:"pamoja na wasemaji wasio kamili"},
    "proposed macro-family": {ja:"提唱されている大語族",ko:"제안된 대어족",zh:"拟议中的宏语系",yue:"擬議中嘅宏語系",vi:"ngữ hệ vĩ mô được đề xuất",th:"ตระกูลภาษาขนาดใหญ่ที่ยังเป็นข้อเสนอ",id:"makro-rumpun yang diusulkan",hi:"प्रस्तावित वृहद् भाषा-परिवार",de:"vorgeschlagene Makrofamilie",fr:"macro-famille proposée",it:"macrofamiglia proposta",es:"macrofamilia propuesta",pt:"macrofamília proposta",ru:"предполагаемая макросемья",uk:"запропонована макросім'я",ar:"عائلة كبرى مقترحة",he:"מקרו-משפחה מוצעת",sw:"familia-kuu inayopendekezwa"},
    "recognised minority language": {ja:"公認の少数言語",ko:"인정된 소수 언어",zh:"受官方承认的少数民族语言",yue:"受官方承認嘅少數族裔語言",vi:"ngôn ngữ thiểu số được công nhận",th:"ภาษาชนกลุ่มน้อยที่ได้รับการรับรอง",id:"bahasa minoritas yang diakui",hi:"मान्यता प्राप्त अल्पसंख्यक भाषा",de:"anerkannte Minderheitensprache",fr:"langue minoritaire reconnue",it:"lingua minoritaria riconosciuta",es:"lengua minoritaria reconocida",pt:"língua minoritária reconhecida",ru:"признанный язык меньшинства",uk:"визнана мова меншини",ar:"لغة أقلية معترف بها",he:"שפת מיעוט מוכרת",sw:"lugha ya wachache inayotambuliwa"},
    "recognized national language alongside Bambara": {ja:"バンバラ語と並ぶ公認の国民言語",ko:"밤바라어와 함께 인정된 국민 언어",zh:"与班巴拉语并列的国家语言",yue:"與班巴拉語並列嘅國家語言",vi:"được công nhận là ngôn ngữ quốc gia cùng với tiếng Bambara",th:"ได้รับการรับรองเป็นภาษาประจำชาติร่วมกับภาษาบัมบารา",id:"bahasa nasional yang diakui bersama Bambara",hi:"बंबारा के साथ मान्यता प्राप्त राष्ट्रीय भाषा",de:"neben Bambara anerkannte Nationalsprache",fr:"langue nationale reconnue aux côtés du bambara",it:"lingua nazionale riconosciuta accanto al bambara",es:"lengua nacional reconocida junto al bambara",pt:"língua nacional reconhecida ao lado do bambara",ru:"признанный национальный язык наряду с бамбара",uk:"визнана національна мова поряд із бамбара",ar:"لغة وطنية معترف بها إلى جانب البامبارا",he:"שפה לאומית מוכרת לצד במברה",sw:"lugha ya taifa inayotambuliwa sambamba na Kibambara"},
    "recognized through Native Title": {ja:"先住権原（ネイティブ・タイトル）により認定",ko:"원주민 권원(Native Title)을 통해 인정",zh:"通过原住民土地权获得承认",yue:"透過原住民土地權獲得承認",vi:"được công nhận qua Native Title (quyền sở hữu đất bản địa)",th:"ได้รับการรับรองผ่าน Native Title (สิทธิในที่ดินของชนพื้นเมือง)",id:"diakui melalui Native Title",de:"durch Native Title anerkannt",fr:"reconnue par le Native Title",it:"riconosciuta tramite il Native Title",es:"reconocida mediante el Native Title"},
    "recognized through state-level cultural programmes": {ja:"州レベルの文化事業を通じて認定",ko:"주 차원의 문화 프로그램을 통해 인정",zh:"通过州级文化项目获得承认",yue:"透過州級文化計劃獲得承認",vi:"được công nhận qua các chương trình văn hóa cấp bang",th:"ได้รับการรับรองผ่านโครงการทางวัฒนธรรมระดับรัฐ",id:"diakui melalui program budaya tingkat negara bagian",hi:"राज्य-स्तरीय सांस्कृतिक कार्यक्रमों के माध्यम से मान्यता प्राप्त",de:"anerkannt durch Kulturprogramme auf Bundesstaatsebene",fr:"reconnue par des programmes culturels au niveau des États",it:"riconosciuta tramite programmi culturali a livello statale",es:"reconocida mediante programas culturales a nivel estatal",pt:"reconhecido por meio de programas culturais estaduais",ru:"признан через культурные программы на уровне штата",uk:"визнана через культурні програми на рівні штату",ar:"معترف بها من خلال برامج ثقافية على مستوى الولاية",he:"מוכרת באמצעות תוכניות תרבות ברמת המדינה",sw:"inatambuliwa kupitia programu za kitamaduni za ngazi ya jimbo"},
    "remnant communities in Russia": {ja:"ロシアに残る残存コミュニティ",ko:"러시아 내 잔존 공동체",zh:"俄罗斯境内的残存社群",yue:"俄羅斯境內嘅殘存社群",vi:"các cộng đồng còn sót lại ở Nga",th:"ชุมชนที่หลงเหลืออยู่ในรัสเซีย",id:"komunitas sisa di Rusia",hi:"रूस में शेष समुदाय",de:"Restgemeinschaften in Russland",fr:"communautés résiduelles en Russie",it:"comunità residue in Russia",es:"comunidades remanentes en Rusia",pt:"comunidades remanescentes na Rússia",ru:"сохранившиеся общины в России",uk:"залишкові громади в Росії",ar:"مجتمعات متبقية في روسيا",he:"קהילות שריד ברוסיה",sw:"jamii chache zilizosalia nchini Urusi"},
    "revitalization active": {ja:"再活性化が進行中",ko:"부흥 활동 활발",zh:"复兴工作进行中",yue:"復興工作進行中",vi:"công tác phục hồi đang diễn ra",th:"มีการฟื้นฟูภาษาอยู่",id:"revitalisasi aktif",hi:"पुनरुज्जीवन सक्रिय",de:"Revitalisierung aktiv",fr:"revitalisation active",it:"rivitalizzazione in corso",es:"revitalización en curso",pt:"revitalização ativa",ru:"идёт активная ревитализация",uk:"триває ревіталізація",ar:"جهود إحياء نشطة",he:"תהליך החייאה פעיל",sw:"juhudi za uhuishaji zinaendelea"},
    "revival in Changhua": {ja:"彰化での復興",ko:"장화에서의 부흥",zh:"彰化正在复兴",yue:"彰化正在復興",vi:"đang phục hồi ở Chương Hóa",id:"kebangkitan di Changhua",de:"Wiederbelebung in Changhua",fr:"renaissance à Changhua",it:"rinascita a Changhua",es:"resurgimiento en Changhua",pt:"revitalização em Changhua",ru:"возрождение в Чжанхуа",uk:"відродження в Чжанхуа",he:"החייאה בצ'אנגחואה",sw:"juhudi za uhuishaji huko Changhua"},
    "revival underway": {ja:"復興が進行中",ko:"부흥 진행 중",zh:"复兴进行中",yue:"復興進行中",vi:"đang được phục hồi",th:"อยู่ระหว่างการฟื้นฟู",id:"kebangkitan sedang berlangsung",hi:"पुनरुद्धार जारी",de:"Wiederbelebung im Gange",fr:"renaissance en cours",it:"rinascita in corso",es:"resurgimiento en curso",pt:"revitalização em curso",ru:"идёт возрождение",uk:"триває відродження",ar:"الإحياء جارٍ",he:"החייאה בעיצומה",sw:"uhuishaji unaendelea"},
    "royal Achaemenid": {ja:"アケメネス朝王室",ko:"아케메네스 왕실",zh:"阿契美尼德王室",yue:"阿契美尼德王室",vi:"hoàng gia Achaemenid",th:"ราชสำนักอะคีเมนิด",de:"königlich-achämenidisch",fr:"achéménide royal",it:"reale achemenide",es:"real aqueménida",pt:"aquemênida real",ru:"царский ахеменидский",uk:"царська ахеменідська",ar:"الأخمينية الملكية",he:"אחמנית מלכותית"},
    "self-identified": {zh:"自我认同",yue:"自我認同",vi:"tự nhận",th:"ระบุตนเอง",id:"menurut identifikasi diri",hi:"स्व-घोषित",de:"nach Selbstangabe",fr:"selon l'auto-identification",it:"autodichiarati",es:"autoidentificados",pt:"autodeclarado",ru:"по самоидентификации",uk:"за самоідентифікацією",ar:"حسب التعريف الذاتي",he:"על פי הגדרה עצמית",sw:"kwa kujitambulisha wenyewe"},
    "severely endangered for island varieties": {ja:"島嶼部の変種は重大な危機",ko:"도서 지역 변종은 심각한 위기",zh:"岛屿变体严重濒危",yue:"島嶼變體嚴重瀕危",vi:"cực kỳ nguy cấp đối với các biến thể trên đảo",th:"ใกล้สูญหายอย่างรุนแรงสำหรับภาษาถิ่นบนเกาะ",id:"sangat terancam punah untuk ragam kepulauan",hi:"द्वीपीय किस्मों के लिए गंभीर रूप से संकटग्रस्त",de:"stark gefährdet für die Inselvarietäten",fr:"sérieusement en danger pour les variétés insulaires",it:"gravemente in pericolo per le varietà insulari",es:"en peligro grave para las variedades insulares",pt:"gravemente ameaçado nas variedades insulares",ru:"в серьёзной опасности для островных разновидностей",he:"בסכנת הכחדה חמורה בזני האיים",sw:"katika hatari kubwa sana kwa lahaja za visiwani"},
    "severely endangered for some dialects": {ja:"一部の方言は重大な危機",ko:"일부 방언은 심각한 위기",zh:"部分方言严重濒危",yue:"部分方言嚴重瀕危",vi:"cực kỳ nguy cấp đối với một số phương ngữ",th:"ใกล้สูญหายอย่างรุนแรงในบางภาษาถิ่น",id:"sangat terancam punah untuk sebagian dialek",hi:"कुछ बोलियों के लिए गंभीर रूप से संकटग्रस्त",de:"stark gefährdet für einige Dialekte",fr:"sérieusement en danger pour certains dialectes",it:"gravemente in pericolo per alcuni dialetti",es:"en peligro grave para algunos dialectos",pt:"gravemente ameaçado em alguns dialetos",ru:"в серьёзной опасности для некоторых диалектов",he:"בסכנת הכחדה חמורה בחלק מהניבים",sw:"katika hatari kubwa sana kwa baadhi ya lahaja"},
    "shifting": {ja:"言語交替が進行中",ko:"언어 전환 진행 중",zh:"语言转用中",yue:"語言轉用中",vi:"đang chuyển đổi ngôn ngữ",th:"กำลังเปลี่ยนไปใช้ภาษาอื่น",id:"sedang bergeser",de:"im Sprachwechsel begriffen",fr:"en cours de substitution linguistique",it:"in fase di sostituzione linguistica",es:"en proceso de sustitución lingüística",pt:"em processo de substituição linguística",ru:"идёт языковой сдвиг",uk:"триває мовний зсув",ar:"في طور التحول اللغوي",he:"בתהליך נטישה"},
    "southern Korean peninsula": {ja:"朝鮮半島南部",ko:"한반도 남부",zh:"朝鲜半岛南部",yue:"朝鮮半島南部",vi:"nam bán đảo Triều Tiên",th:"ตอนใต้ของคาบสมุทรเกาหลี",id:"Semenanjung Korea bagian selatan",hi:"दक्षिणी कोरियाई प्रायद्वीप",de:"südliche Koreanische Halbinsel",fr:"sud de la péninsule coréenne",it:"penisola coreana meridionale",es:"sur de la península de Corea",pt:"sul da península coreana",ru:"юг Корейского полуострова",uk:"південь Корейського півострова",ar:"جنوب شبه الجزيرة الكورية",he:"דרום חצי האי הקוריאני",sw:"kusini mwa rasi ya Korea"},
    "southwestern Hunan": {ja:"湖南省南西部",ko:"후난성 남서부",zh:"湘西南",yue:"湘西南",vi:"tây nam Hồ Nam",th:"หูหนานตะวันตกเฉียงใต้",id:"Hunan barat daya",hi:"दक्षिण-पश्चिमी हुनान",de:"südwestliches Hunan",fr:"sud-ouest du Hunan",it:"Hunan sudoccidentale",es:"suroeste de Hunan",pt:"sudoeste de Hunan",ru:"юго-западная Хунань",uk:"південно-західна Хунань",ar:"جنوب غرب هونان",he:"דרום-מערב הונאן",sw:"kusini-magharibi mwa Hunan"},
    "split from Japonic ~7–8c. CE": {ja:"7〜8世紀に日琉語族から分岐",ko:"7~8세기에 일본어족에서 분화",zh:"约公元7–8世纪从日语族分出",yue:"約公元7–8世紀從日語族分出",vi:"tách khỏi ngữ hệ Nhật Bản khoảng thế kỷ 7–8 CN",th:"แยกจากตระกูลภาษาญี่ปุ่นราวคริสต์ศตวรรษที่ 7–8",id:"terpisah dari Japonik ~abad ke-7–8 M",de:"Abspaltung vom Japonischen ~7.–8. Jh. n. Chr.",fr:"séparée du japonique ~VIIe–VIIIe s. apr. J.-C.",it:"separatasi dal giapponico ~VII–VIII sec. d.C.",es:"se separó del japónico ~s. VII–VIII d. C.",pt:"separou-se do japônico por volta dos séc. VII–VIII d.C.",ru:"отделился от японской семьи около VII–VIII вв. н. э.",he:"התפצלה מהיפונית בסביבות המאות ה-7–8 לספירה",sw:"ilijitenga na Kijaponiki takriban karne ya 7–8 BK"},
    "studied liturgically": {ja:"典礼のために学習されている",ko:"전례 목적으로 학습됨",zh:"用于礼仪研习",yue:"用於禮儀研習",vi:"được nghiên cứu trong phụng vụ",th:"ศึกษาในเชิงพิธีกรรม",id:"dipelajari secara liturgis",hi:"धर्मविधि के लिए अध्ययन किया जाता है",de:"liturgisch studiert",fr:"étudiée dans un cadre liturgique",it:"studiata in ambito liturgico",es:"estudiada con fines litúrgicos",pt:"estudado liturgicamente",ru:"изучается в литургических целях",he:"נלמדת בהקשר ליטורגי",sw:"hujifunzwa kwa madhumuni ya kiliturujia"},
    "unconfirmed": {ja:"未確認",ko:"미확인",zh:"未经证实",yue:"未經證實",vi:"chưa được xác nhận",th:"ยังไม่ได้รับการยืนยัน",id:"belum dikonfirmasi",hi:"अपुष्ट",de:"unbestätigt",fr:"non confirmé",it:"non confermato",es:"sin confirmar",pt:"não confirmado",ru:"не подтверждено",uk:"непідтверджено",ar:"غير مؤكد",he:"לא מאושר",sw:"haijathibitishwa"},
    "upper Niger valley": {ja:"ニジェール川上流域",ko:"니제르강 상류 유역",zh:"尼日尔河上游河谷",yue:"尼日爾河上游河谷",vi:"thượng lưu thung lũng sông Niger",th:"ลุ่มน้ำไนเจอร์ตอนบน",id:"lembah Niger hulu",hi:"ऊपरी नाइजर घाटी",de:"oberes Nigertal",fr:"haute vallée du Niger",it:"alta valle del Niger",es:"alto valle del Níger",pt:"alto vale do Níger",ru:"долина верхнего Нигера",uk:"долина верхнього Нігеру",ar:"وادي النيجر الأعلى",he:"עמק הניז'ר העליון",sw:"bonde la juu la Mto Niger"},
    "used in the Sikasso Region": {ja:"シカソ地方で使用",ko:"시카소 지역에서 사용",zh:"用于锡卡索大区",yue:"用於錫卡索大區",vi:"được sử dụng ở vùng Sikasso",id:"digunakan di Wilayah Sikasso",de:"in der Region Sikasso verwendet",fr:"utilisé dans la région de Sikasso",it:"usata nella regione di Sikasso",es:"usada en la región de Sikasso",pt:"usado na Região de Sikasso",ru:"используется в области Сикасо",he:"בשימוש באזור סיקאסו",sw:"hutumika katika Mkoa wa Sikasso"},
    "vibrant": {ja:"活発",ko:"활발",zh:"充满活力",yue:"充滿活力",vi:"sống động",th:"มีชีวิตชีวา",id:"hidup",hi:"जीवंत",de:"lebendig",fr:"vivante",it:"vitale",es:"vital",pt:"vibrante",ru:"активно используемый",uk:"життєздатна",ar:"حيوية",he:"משגשגת",sw:"inashamiri"},
    "vibrant for Dangaura": {ja:"ダンガウラ方言は活発",ko:"당가우라 방언은 활발",vi:"sống động ở nhóm Dangaura",id:"hidup untuk ragam Dangaura",de:"lebendig für Dangaura",fr:"vivante pour le dangaura",it:"vitale per il dangaura",es:"vital para el dangaura",pt:"vibrante para o dangaura",he:"משגשגת בקרב הדנגאורה",sw:"inashamiri kwa Dangaura"},
    "vulnerable": {ja:"脆弱",ko:"취약",zh:"脆弱",yue:"脆弱",vi:"dễ bị tổn thương",th:"เสี่ยงต่อการสูญหาย",id:"rentan",hi:"असुरक्षित",de:"gefährdet",fr:"vulnérable",it:"vulnerabile",pt:"vulnerável",ru:"уязвимый",uk:"вразлива",ar:"معرضة للخطر",he:"פגיעה",sw:"katika hatari"},
    "widely taught today": {ja:"現在も広く教えられている",ko:"오늘날 널리 교육됨",zh:"今日广泛教授",yue:"今日廣泛教授",vi:"được giảng dạy rộng rãi ngày nay",th:"มีการสอนอย่างแพร่หลายในปัจจุบัน",id:"diajarkan secara luas saat ini",hi:"आज व्यापक रूप से पढ़ाई जाती है",de:"heute weithin unterrichtet",fr:"largement enseignée aujourd'hui",it:"ampiamente insegnata oggi",es:"ampliamente enseñada en la actualidad",pt:"amplamente ensinado hoje",ru:"широко преподаётся сегодня",uk:"сьогодні широко викладається",ar:"تُدرَّس على نطاق واسع اليوم",he:"נלמדת באופן נרחב כיום",sw:"hufundishwa kwa wingi leo"},
    "à = low tone": {ja:"à＝低声調",ko:"à = 저성조",zh:"à = 低调",yue:"à = 低調",vi:"à = thanh thấp",th:"à = เสียงต่ำ",id:"à = nada rendah",hi:"à = निम्न स्वर",de:"à = Tiefton",fr:"à = ton bas",it:"à = tono basso",es:"à = tono bajo",pt:"à = tom baixo",ru:"à = низкий тон",uk:"à = низький тон",ar:"à = نغمة منخفضة",he:"à = טון נמוך",sw:"à = toni ya chini"},
    "á = high tone": {ja:"á＝高声調",ko:"á = 고성조",zh:"á = 高调",yue:"á = 高調",vi:"á = thanh cao",th:"á = เสียงสูง",id:"á = nada tinggi",hi:"á = उच्च स्वर",de:"á = Hochton",fr:"á = ton haut",it:"á = tono alto",es:"á = tono alto",pt:"á = tom alto",ru:"á = высокий тон",uk:"á = високий тон",ar:"á = نغمة مرتفعة",he:"á = טון גבוה",sw:"á = toni ya juu"},
    "†extinct": {ja:"†消滅",ko:"†소멸",zh:"†已消亡",yue:"†已消亡",vi:"†đã tuyệt chủng",th:"†สูญหายแล้ว",id:"†punah",hi:"†विलुप्त",de:"†ausgestorben",fr:"†éteinte",it:"†estinta",es:"†extinta",pt:"†extinto",ru:"†вымерший",uk:"†вимерла",ar:"†منقرضة",he:"†נכחדה",sw:"†imetoweka"},
  };
  const dup = { es_eu:"es", es_mx:"es", pt_eu:"pt", pt_br:"pt" };
  for (const [term, tr] of Object.entries(A)) {
    for (const lang of LANGS) {
      if (!tr[lang]) continue;
      if (!META_I18N_ATOMS[lang]) META_I18N_ATOMS[lang] = {};
      META_I18N_ATOMS[lang][term] = tr[lang];
    }
    for (const [rl, base] of Object.entries(dup)) {
      if (!tr[base]) continue;
      if (!META_I18N_ATOMS[rl]) META_I18N_ATOMS[rl] = {};
      META_I18N_ATOMS[rl][term] = tr[base];
    }
  }
})();

/*
 * Batch 5 — whole-clause metadata translations.
 *
 * These go into META_I18N (exact-match, checked BEFORE atom composition), not
 * META_I18N_ATOMS. They are the 161 strings that composition cannot reach by
 * design: full clauses in `official` like "No (Spanish is the official
 * language of Guatemala; recognized as a national language under the 2003 Ley
 * de Idiomas Nacionales)", where the meaning lives in the sentence rather than
 * in any reusable part of it. After batch 4 these were 149 of the 198
 * remaining dirty field-instances.
 *
 * Translated by nine parallel agents, one per pair of UI languages, then
 * checked here for (a) byte-identical keys — an exact-match table silently
 * never fires on a key the translator tidied — and (b) whether the leading
 * negation survived, since "recognized as a national language" turning into
 * "is an official language" would undo the official-field pass that produced
 * most of these strings.
 */
(function () {
  if (typeof META_I18N === 'undefined') return;
  const LANGS = ["ja","ko","zh","yue","vi","th","id","hi","de","fr","it","es","pt","ru","uk","ar","he","sw"];
  const T = {
    "Not official; recognized as regional language (langue de France) since 2012": {ja:"公用語ではない。2012年より地域言語（langue de France）として認定",ko:"공용어 아님. 2012년부터 지역 언어(langue de France)로 인정",zh:"非官方语言；2012年起获认定为地区语言（langue de France）",yue:"非官方語言；2012年起獲認定為地區語言（langue de France）",vi:"Không chính thức; được công nhận là ngôn ngữ vùng (langue de France) từ năm 2012",th:"ไม่เป็นภาษาราชการ แต่ได้รับการรับรองเป็นภาษาประจำภูมิภาค (langue de France) ตั้งแต่ปี 2012",id:"Tidak resmi; diakui sebagai bahasa daerah (langue de France) sejak 2012",hi:"आधिकारिक नहीं; 2012 से क्षेत्रीय भाषा (langue de France) के रूप में मान्यता प्राप्त",de:"Nicht amtlich; seit 2012 als Regionalsprache (langue de France) anerkannt",fr:"Non officielle ; reconnue comme langue régionale (langue de France) depuis 2012",it:"Non ufficiale; riconosciuta come lingua regionale (langue de France) dal 2012",es:"No oficial; reconocida como lengua regional (langue de France) desde 2012",pt:"Não oficial; reconhecida como língua regional (langue de France) desde 2012",ru:"Не официальный; с 2012 года признан региональным языком (langue de France)",uk:"Не офіційна; від 2012 року визнана регіональною мовою (langue de France)",ar:"غير رسمية؛ معترف بها لغةً إقليمية (langue de France) منذ عام 2012",he:"אינה רשמית; מוכרת כשפה אזורית (langue de France) מאז 2012",sw:"Si rasmi; inatambuliwa kama lugha ya kanda (langue de France) tangu 2012"},
    "Latin (modern orthography developed by linguists with the community)": {ja:"ラテン文字（言語学者が共同体と共同で開発した現代正書法）",ko:"라틴 문자(언어학자가 공동체와 함께 개발한 현대 정서법)",zh:"拉丁字母（现代正字法由语言学家与社群共同制定）",yue:"拉丁字母（現代正字法由語言學家同社群一齊制定）",vi:"Latinh (chính tả hiện đại do các nhà ngôn ngữ học xây dựng cùng cộng đồng)",th:"อักษรละติน (อักขรวิธีสมัยใหม่ที่นักภาษาศาสตร์พัฒนาร่วมกับชุมชน)",id:"Latin (ortografi modern yang dikembangkan oleh para linguis bersama komunitas)",hi:"लैटिन (आधुनिक वर्तनी, जिसे भाषाविदों ने समुदाय के साथ मिलकर विकसित किया)",de:"Lateinisch (moderne Orthographie, von Linguisten gemeinsam mit der Gemeinschaft entwickelt)",fr:"Latin (orthographe moderne élaborée par des linguistes avec la communauté)",it:"Latino (ortografia moderna elaborata da linguisti insieme alla comunità)",es:"Latino (ortografía moderna desarrollada por lingüistas junto con la comunidad)",pt:"Latino (ortografia moderna desenvolvida por linguistas em conjunto com a comunidade)",ru:"Латиница (современная орфография, разработанная лингвистами совместно с общиной)",uk:"Латиниця (сучасна орфографія, розроблена мовознавцями разом із громадою)",ar:"اللاتينية (إملاء حديث وضعه لغويون بالتعاون مع المجتمع المحلي)",he:"לטיני (כתיב מודרני שפותח על ידי בלשנים יחד עם הקהילה)",sw:"Kilatini (tahajia ya kisasa iliyobuniwa na wanaisimu pamoja na jamii)"},
    "Latin alphabet (modified orthography with accent marks and a glottal-stop letter)": {ja:"ラテン文字（アクセント記号と声門閉鎖音の文字を加えた改良正書法）",ko:"라틴 문자(악센트 부호와 성문 폐쇄음 문자를 더한 수정 정서법)",zh:"拉丁字母（改良正字法，含附加符号及一个喉塞音字母）",yue:"拉丁字母（改良正字法，含附加符號同一個喉塞音字母）",vi:"Bảng chữ cái Latinh (chính tả cải biên có dấu phụ và một chữ cái biểu thị âm tắc thanh hầu)",th:"อักษรละติน (อักขรวิธีดัดแปลง มีเครื่องหมายเสริมและตัวอักษรแทนเสียงกักเส้นเสียง)",id:"Alfabet Latin (ortografi termodifikasi dengan tanda aksen dan huruf hentian glotal)",hi:"लैटिन वर्णमाला (संशोधित वर्तनी: उच्चारण-चिह्न और एक ग्लॉटल-स्टॉप अक्षर सहित)",de:"Lateinisches Alphabet (modifizierte Orthographie mit Akzentzeichen und einem Buchstaben für den Glottisverschluss)",fr:"Alphabet latin (orthographe modifiée avec signes accentués et une lettre pour le coup de glotte)",it:"Alfabeto latino (ortografia modificata con segni di accento e una lettera per l'occlusiva glottidale)",es:"Alfabeto latino (ortografía modificada con signos de acento y una letra para la oclusiva glotal)",pt:"Alfabeto latino (ortografia modificada com acentos e uma letra para a oclusiva glotal)",ru:"Латинский алфавит (изменённая орфография с диакритическими знаками и буквой для гортанной смычки)",uk:"Латинська абетка (модифікована орфографія з надрядковими знаками та літерою для гортанної змички)",ar:"الأبجدية اللاتينية (إملاء معدَّل بعلامات تشكيل وحرف للوقفة الحنجرية)",he:"אלפבית לטיני (כתיב מותאם עם סימני הטעמה ואות לעיצור סדקי)",sw:"Alfabeti ya Kilatini (tahajia iliyorekebishwa yenye alama za lafudhi na herufi ya kizuizi cha koo)"},
    "~20 fluent + heritage learners": {ja:"流暢な話者約20人＋継承語学習者",ko:"유창한 화자 약 20명 + 계승어 학습자",zh:"约20人流利，另有传承语学习者",yue:"約20人流利，另有傳承語學習者",vi:"~20 người nói thành thạo + người học kế thừa",th:"~20 คนพูดคล่อง + ผู้เรียนเชื้อสาย",id:"~20 penutur fasih + pembelajar bahasa warisan",hi:"~20 धाराप्रवाह वक्ता + विरासत-भाषा शिक्षार्थी",de:"~20 fließende Sprecher + Herkunftssprachenlernende",fr:"~20 locuteurs courants + apprenants de langue d'héritage",it:"~20 parlanti fluenti + apprendenti di eredità",es:"~20 hablantes fluidos + aprendices de herencia",pt:"~20 falantes fluentes + aprendizes de herança",ru:"~20 свободно владеющих + изучающие как наследственный язык",uk:"~20 вільно володіють + спадкові учні",ar:"~20 متحدثًا بطلاقة + متعلمون من أبناء التراث",he:"~20 דוברים שוטפים + לומדי מורשת",sw:"~20 wasemaji fasaha + wanafunzi wa urithi"},
    "USA (Onondaga Nation Reservation, NY), Canada (Six Nations of the Grand River)": {ja:"アメリカ合衆国（ニューヨーク州オノンダガ・ネーション居留地）、カナダ（シックス・ネーションズ・オブ・ザ・グランド・リバー）",ko:"미국(뉴욕주 오논다가 네이션 보호구역), 캐나다(그랜드리버 식스 네이션스)",zh:"美国（纽约州奥农达加族保留地）、加拿大（大河六族保留地）",yue:"美國（紐約州奧農達加族保留地）、加拿大（大河六族保留地）",vi:"Hoa Kỳ (Khu bảo tồn Onondaga Nation, bang New York), Canada (Six Nations of the Grand River)",th:"สหรัฐอเมริกา (เขตสงวนชนชาติโอนันดากา รัฐนิวยอร์ก) แคนาดา (Six Nations of the Grand River)",id:"AS (Reservasi Onondaga Nation, NY), Kanada (Six Nations of the Grand River)",hi:"अमेरिका (ओनोंडागा नेशन रिज़र्वेशन, न्यूयॉर्क), कनाडा (सिक्स नेशंस ऑफ़ द ग्रैंड रिवर)",de:"USA (Onondaga Nation Reservation, New York), Kanada (Six Nations of the Grand River)",fr:"États-Unis (réserve de la Nation onondaga, New York), Canada (Six Nations of the Grand River)",it:"USA (riserva della Nazione Onondaga, NY), Canada (Six Nations of the Grand River)",es:"EE. UU. (reserva de la Nación Onondaga, NY), Canadá (Six Nations of the Grand River)",pt:"EUA (Reserva da Nação Onondaga, Nova York), Canadá (Six Nations of the Grand River)",ru:"США (резервация нации онондага, штат Нью-Йорк), Канада (Шесть наций реки Гранд)",uk:"США (резервація нації Онондага, штат Нью-Йорк), Канада (Шість націй ріки Гранд)",ar:"الولايات المتحدة (محمية أمة أونونداغا، نيويورك)، كندا (الأمم الست لنهر غراند)",he:"ארצות הברית (שמורת אומת האונונדאגה, ניו יורק), קנדה (שש האומות של נהר גרנד)",sw:"Marekani (Onondaga Nation Reservation, New York), Kanada (Six Nations of the Grand River)"},
    "No (the Onondaga Nation is sovereign and the language is used ceremonially in its governance and law; it is integral to religious and political life)": {ja:"公用語ではない（オノンダガ・ネーションは主権を有し、その統治と法において儀礼的に用いられる。宗教的・政治的生活に不可欠）",ko:"공용어 아님(오논다가 네이션은 주권을 가지며, 그 통치와 법에서 의례적으로 사용됨. 종교적·정치적 생활에 필수적)",zh:"否（奥农达加族拥有主权，该语言在其治理与法律中用于礼仪场合，是宗教与政治生活不可或缺的部分）",yue:"否（奧農達加族擁有主權，該語言喺佢哋嘅管治同法律入面用於禮儀場合，係宗教同政治生活不可或缺嘅部分）",vi:"Không (Onondaga Nation có chủ quyền và ngôn ngữ được dùng theo nghi thức trong quản trị và luật pháp của họ; nó gắn liền với đời sống tôn giáo và chính trị)",th:"ไม่ (ชนชาติโอนันดากามีอธิปไตยของตนเอง และใช้ภาษานี้ในพิธีการด้านการปกครองและกฎหมาย ทั้งเป็นส่วนสำคัญของชีวิตทางศาสนาและการเมือง)",id:"Tidak (Onondaga Nation berdaulat dan bahasanya digunakan secara seremonial dalam pemerintahan dan hukumnya; bahasa ini menyatu dengan kehidupan keagamaan dan politik)",hi:"नहीं (ओनोंडागा नेशन संप्रभु है और यह भाषा उसके शासन तथा कानून में औपचारिक रूप से प्रयुक्त होती है; यह धार्मिक व राजनीतिक जीवन का अभिन्न अंग है)",de:"Nein (die Onondaga Nation ist souverän, und die Sprache wird zeremoniell in ihrer Regierung und ihrem Recht verwendet; sie ist fester Bestandteil des religiösen und politischen Lebens)",fr:"Non (la Nation onondaga est souveraine et la langue est employée de façon cérémonielle dans sa gouvernance et son droit ; elle fait partie intégrante de la vie religieuse et politique)",it:"No (la Nazione Onondaga è sovrana e la lingua è usata in forma cerimoniale nel suo governo e nel suo diritto; è parte integrante della vita religiosa e politica)",es:"No (la Nación Onondaga es soberana y la lengua se usa de forma ceremonial en su gobierno y su derecho; es parte integral de la vida religiosa y política)",pt:"Não (a Nação Onondaga é soberana e a língua é usada cerimonialmente em seu governo e em suas leis; é parte integrante da vida religiosa e política)",ru:"Нет (нация онондага суверенна, и язык церемониально используется в её управлении и праве; он неотъемлем от религиозной и политической жизни)",uk:"Ні (нація Онондага є суверенною, і мова церемоніально вживається в її врядуванні та праві; вона невіддільна від релігійного і політичного життя)",ar:"لا (أمة أونونداغا ذات سيادة، وتُستخدم اللغة طقسيًا في حكمها وقانونها؛ وهي جزء لا يتجزأ من الحياة الدينية والسياسية)",he:"לא (אומת האונונדאגה היא ריבונית והשפה משמשת בטקסים בממשל ובמשפט שלה; היא חלק בלתי נפרד מהחיים הדתיים והפוליטיים)",sw:"Hapana (Onondaga Nation ni taifa huru na lugha hutumika kisherehe katika utawala na sheria yake; ni sehemu muhimu ya maisha ya kidini na kisiasa)"},
    "Latin alphabet-based, derived from Americanist IPA (adopted 1994 by the Ho-Chunk Nation)": {ja:"ラテン文字ベース、アメリカ式音声表記に由来（1994年にホーチャンク・ネーションが採用）",ko:"라틴 문자 기반, 미국식 음성 표기에서 유래(1994년 호청크 네이션 채택)",zh:"以拉丁字母为基础，源自美洲学派音标（1994年由 Ho-Chunk 族采用）",yue:"以拉丁字母為基礎，源自美洲學派音標（1994年由 Ho-Chunk 族採用）",vi:"Dựa trên bảng chữ cái Latinh, phái sinh từ IPA kiểu Mỹ (được Ho-Chunk Nation thông qua năm 1994)",th:"อิงอักษรละติน พัฒนาจากสัทอักษรแบบอเมริกัน (ชนชาติโฮชังก์รับมาใช้ในปี 1994)",id:"Berbasis alfabet Latin, diturunkan dari IPA Amerikanis (diadopsi 1994 oleh Ho-Chunk Nation)",hi:"लैटिन वर्णमाला पर आधारित, अमेरिकनिस्ट IPA से व्युत्पन्न (1994 में हो-चंक नेशन द्वारा अपनाई गई)",de:"Auf dem lateinischen Alphabet basierend, abgeleitet vom amerikanistischen IPA (1994 von der Ho-Chunk Nation angenommen)",fr:"Fondé sur l'alphabet latin, dérivé de l'API américaniste (adopté en 1994 par la Ho-Chunk Nation)",it:"Basato sull'alfabeto latino, derivato dall'IPA americanista (adottato nel 1994 dalla Nazione Ho-Chunk)",es:"Basado en el alfabeto latino, derivado del AFI americanista (adoptado en 1994 por la Nación Ho-Chunk)",pt:"Baseado no alfabeto latino, derivado do AFI americanista (adotado em 1994 pela Nação Ho-Chunk)",ru:"На основе латинского алфавита, восходит к американистской фонетической транскрипции (принят нацией хо-чанк в 1994 году)",uk:"На основі латинської абетки, походить від американістської фонетичної транскрипції (прийнята 1994 року нацією Го-Чанк)",ar:"قائم على الأبجدية اللاتينية، مشتق من الأبجدية الصوتية الأمريكانية (اعتمدته أمة هو-تشنك عام 1994)",he:"מבוסס אלפבית לטיני, נגזר מהתעתיק הפונטי האמריקניסטי (אומץ ב-1994 על ידי אומת ההו-צ׳אנק)",sw:"Yenye msingi wa alfabeti ya Kilatini, imetokana na IPA ya Kiamerika (ilipitishwa 1994 na Ho-Chunk Nation)"},
    "~3–4K L1 (plus semi-speakers)": {ja:"L1約3〜4K（ほかに半話者）",ko:"L1 약 3~4K(그 외 반화자)",zh:"约3–4K母语使用者（另有半通晓者）",yue:"約3–4K母語使用者（另有半通曉者）",vi:"~3–4K L1 (cùng với những người nói bán phần)",th:"~3–4K คน L1 (และผู้พูดกึ่งคล่อง)",id:"~3–4K L1 (ditambah semi-penutur)",hi:"~3–4K L1 (साथ ही अर्ध-वक्ता)",de:"~3–4K L1 (zzgl. Halbsprecher)",fr:"~3–4K L1 (plus des semi-locuteurs)",it:"~3–4K L1 (più semiparlanti)",es:"~3–4K L1 (más semihablantes)",pt:"~3–4K L1 (mais semifalantes)",ru:"~3–4K L1 (плюс полуносители)",uk:"~3–4K носіїв (плюс напівносії)",ar:"~3–4K متحدث أصلي (إضافة إلى أشباه المتحدثين)",he:"~3–4K דוברי שפת אם (בנוסף לדוברים חלקיים)",sw:"~3–4K wenye lugha ya kwanza (pamoja na wanaoimudu kwa sehemu)"},
    "No (English is the official language; Iñupiaq is one of the 20 official languages of Alaska under HB 216, 2014)": {ja:"公用語ではない（英語が公用語。イヌピアック語は2014年のHB 216によりアラスカ州の20の公用語の一つ）",ko:"공용어 아님(영어가 공용어. 이누피아크어는 2014년 HB 216에 따라 알래스카주의 20개 공용어 중 하나)",zh:"否（英语为官方语言；根据2014年 HB 216，伊努皮克语是阿拉斯加州20种官方语言之一）",yue:"否（英語係官方語言；根據2014年 HB 216，伊努皮克語係阿拉斯加州20種官方語言之一）",vi:"Không (tiếng Anh là ngôn ngữ chính thức; tiếng Iñupiaq là một trong 20 ngôn ngữ chính thức của bang Alaska theo HB 216, 2014)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการ ส่วนภาษาอีนูเปียกเป็นหนึ่งใน 20 ภาษาราชการของรัฐอะแลสกาตาม HB 216 ปี 2014)",id:"Tidak (bahasa Inggris adalah bahasa resmi; Iñupiaq merupakan salah satu dari 20 bahasa resmi Alaska berdasarkan HB 216, 2014)",hi:"नहीं (अंग्रेज़ी आधिकारिक भाषा है; इनुपियाक HB 216, 2014 के तहत अलास्का की 20 आधिकारिक भाषाओं में से एक है)",de:"Nein (Englisch ist die Amtssprache; Iñupiaq ist gemäß HB 216 von 2014 eine der 20 Amtssprachen Alaskas)",fr:"Non (l'anglais est la langue officielle ; l'iñupiaq est l'une des 20 langues officielles de l'Alaska en vertu de HB 216, 2014)",it:"No (l'inglese è la lingua ufficiale; l'iñupiaq è una delle 20 lingue ufficiali dell'Alaska ai sensi della HB 216 del 2014)",es:"No (el inglés es la lengua oficial; el iñupiaq es una de las 20 lenguas oficiales de Alaska en virtud de la HB 216 de 2014)",pt:"Não (o inglês é a língua oficial; o iñupiaq é uma das 20 línguas oficiais do Alasca nos termos da HB 216, de 2014)",ru:"Нет (официальный язык — английский; иньюпиак — один из 20 официальных языков Аляски согласно HB 216, 2014)",uk:"Ні (офіційна мова — англійська; інупіак є однією з 20 офіційних мов Аляски згідно з HB 216, 2014)",ar:"لا (الإنجليزية هي اللغة الرسمية؛ والإنيوبياك إحدى اللغات الرسمية العشرين في ألاسكا بموجب HB 216 لعام 2014)",he:"לא (אנגלית היא השפה הרשמית; אינופיאק היא אחת מ-20 השפות הרשמיות של אלסקה לפי HB 216, 2014)",sw:"Hapana (Kiingereza ndiyo lugha rasmi; Kiiñupiaq ni mojawapo ya lugha 20 rasmi za Alaska chini ya HB 216, 2014)"},
    "Latin alphabet; the modern standard orthography uses 30 letters": {ja:"ラテン文字。現代の標準正書法は30文字を用いる",ko:"라틴 문자. 현대 표준 정서법은 30자를 사용",zh:"拉丁字母；现代标准正字法使用30个字母",yue:"拉丁字母；現代標準正字法用30個字母",vi:"Bảng chữ cái Latinh; chính tả chuẩn hiện đại dùng 30 chữ cái",th:"อักษรละติน อักขรวิธีมาตรฐานสมัยใหม่ใช้ 30 ตัวอักษร",id:"Alfabet Latin; ortografi standar modern menggunakan 30 huruf",hi:"लैटिन वर्णमाला; आधुनिक मानक वर्तनी में 30 अक्षर हैं",de:"Lateinisches Alphabet; die moderne Standardorthographie verwendet 30 Buchstaben",fr:"Alphabet latin ; l'orthographe standard moderne compte 30 lettres",it:"Alfabeto latino; l'ortografia standard moderna usa 30 lettere",es:"Alfabeto latino; la ortografía estándar moderna emplea 30 letras",pt:"Alfabeto latino; a ortografia padrão moderna usa 30 letras",ru:"Латинский алфавит; современная стандартная орфография использует 30 букв",uk:"Латинська абетка; сучасна стандартна орфографія використовує 30 літер",ar:"الأبجدية اللاتينية؛ ويستخدم الإملاء المعياري الحديث 30 حرفًا",he:"אלפבית לטיני; הכתיב התקני המודרני משתמש ב-30 אותיות",sw:"Alfabeti ya Kilatini; tahajia sanifu ya kisasa hutumia herufi 30"},
    "Co-official language of Paraguay (Constitution 1992); regulated by Academia Paraguaya de la Lengua Española": {ja:"パラグアイの共同公用語（1992年憲法）。Academia Paraguaya de la Lengua Españolaが規範を管理",ko:"파라과이의 공동 공용어(1992년 헌법). Academia Paraguaya de la Lengua Española가 규범을 관리",zh:"巴拉圭共同官方语言（1992年宪法）；由 Academia Paraguaya de la Lengua Española 规范",yue:"巴拉圭共同官方語言（1992年憲法）；由 Academia Paraguaya de la Lengua Española 規範",vi:"Đồng ngôn ngữ chính thức của Paraguay (Hiến pháp 1992); được quy chuẩn bởi Academia Paraguaya de la Lengua Española",th:"ภาษาราชการร่วมของปารากวัย (รัฐธรรมนูญ ปี 1992) กำกับดูแลโดย Academia Paraguaya de la Lengua Española",id:"Bahasa ko-resmi Paraguay (Konstitusi 1992); diatur oleh Academia Paraguaya de la Lengua Española",hi:"पैराग्वे की सह-आधिकारिक भाषा (संविधान 1992); Academia Paraguaya de la Lengua Española द्वारा विनियमित",de:"Ko-Amtssprache Paraguays (Verfassung von 1992); geregelt von der Academia Paraguaya de la Lengua Española",fr:"Langue co-officielle du Paraguay (Constitution de 1992) ; régie par l'Academia Paraguaya de la Lengua Española",it:"Lingua co-ufficiale del Paraguay (Costituzione del 1992); regolata dall'Academia Paraguaya de la Lengua Española",es:"Lengua cooficial de Paraguay (Constitución de 1992); regulada por la Academia Paraguaya de la Lengua Española",pt:"Língua cooficial do Paraguai (Constituição de 1992); regulada pela Academia Paraguaya de la Lengua Española",ru:"Со-официальный язык Парагвая (Конституция 1992 года); регулируется Academia Paraguaya de la Lengua Española",uk:"Співофіційна мова Парагваю (Конституція 1992 року); регулюється Academia Paraguaya de la Lengua Española",ar:"لغة رسمية مشتركة في باراغواي (دستور 1992)؛ تنظمها Academia Paraguaya de la Lengua Española",he:"שפה רשמית משותפת של פרגוואי (חוקת 1992); מוסדרת על ידי Academia Paraguaya de la Lengua Española",sw:"Lugha rasmi mwenza ya Paraguay (Katiba ya 1992); inasimamiwa na Academia Paraguaya de la Lengua Española"},
    "Official language of the Republic of Panama since 1903; regulated by the Academia Panameña de la Lengua (Panamanian Academy of Language)": {ja:"1903年よりパナマ共和国の公用語。Academia Panameña de la Lengua（パナマ言語アカデミー）が規範を管理",ko:"1903년부터 파나마 공화국의 공용어. Academia Panameña de la Lengua(파나마 언어 아카데미)가 규범을 관리",zh:"自1903年起为巴拿马共和国官方语言；由 Academia Panameña de la Lengua（巴拿马语言学院）规范",yue:"自1903年起為巴拿馬共和國官方語言；由 Academia Panameña de la Lengua（巴拿馬語言學院）規範",vi:"Ngôn ngữ chính thức của Cộng hòa Panama từ năm 1903; được quy chuẩn bởi Academia Panameña de la Lengua (Viện Hàn lâm Ngôn ngữ Panama)",th:"ภาษาราชการของสาธารณรัฐปานามาตั้งแต่ปี 1903 กำกับดูแลโดย Academia Panameña de la Lengua (ราชบัณฑิตยสภาภาษาแห่งปานามา)",id:"Bahasa resmi Republik Panama sejak 1903; diatur oleh Academia Panameña de la Lengua (Akademi Bahasa Panama)",hi:"1903 से पनामा गणराज्य की आधिकारिक भाषा; Academia Panameña de la Lengua (पनामा भाषा अकादमी) द्वारा विनियमित",de:"Seit 1903 Amtssprache der Republik Panama; geregelt von der Academia Panameña de la Lengua (Panamaische Sprachakademie)",fr:"Langue officielle de la République du Panama depuis 1903 ; régie par l'Academia Panameña de la Lengua (Académie panaméenne de la langue)",it:"Lingua ufficiale della Repubblica di Panama dal 1903; regolata dall'Academia Panameña de la Lengua (Accademia panamense della lingua)",es:"Lengua oficial de la República de Panamá desde 1903; regulada por la Academia Panameña de la Lengua",pt:"Língua oficial da República do Panamá desde 1903; regulada pela Academia Panameña de la Lengua (Academia Panamenha da Língua)",ru:"Официальный язык Республики Панама с 1903 года; регулируется Academia Panameña de la Lengua (Панамская академия языка)",uk:"Офіційна мова Республіки Панама від 1903 року; регулюється Academia Panameña de la Lengua (Панамська академія мови)",ar:"اللغة الرسمية لجمهورية بنما منذ عام 1903؛ تنظمها Academia Panameña de la Lengua (أكاديمية بنما للغة)",he:"שפה רשמית של רפובליקת פנמה מאז 1903; מוסדרת על ידי Academia Panameña de la Lengua (האקדמיה הפנמית ללשון)",sw:"Lugha rasmi ya Jamhuri ya Panama tangu 1903; inasimamiwa na Academia Panameña de la Lengua (Akademia ya Lugha ya Panama)"},
    "Latin alphabet: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ": {ja:"ラテン文字：a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ",ko:"라틴 문자: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ",zh:"拉丁字母：a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",yue:"拉丁字母：a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",vi:"Bảng chữ cái Latinh: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",th:"อักษรละติน: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",id:"Alfabet Latin: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",hi:"लैटिन वर्णमाला: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",de:"Lateinisches Alphabet: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",fr:"Alphabet latin : a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",it:"Alfabeto latino: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",es:"Alfabeto latino: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",pt:"Alfabeto latino: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",ru:"Латинский алфавит: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",uk:"Латинська абетка: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",ar:"الأبجدية اللاتينية: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",he:"אלפבית לטיני: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ ",sw:"Alfabeti ya Kilatini: a b ch chʼ d e g i ï j k kʼ m n nh o p pʼ r rh s t tʼ "},
    "Recognized regional language in French Polynesia; not official but monitored by Académie pa'umotu (Kāruru vānaga, established 2008)": {ja:"フランス領ポリネシアで地域言語として認定。公用語ではないが Académie pa'umotu（Kāruru vānaga、2008年設立）が管理",ko:"프랑스령 폴리네시아에서 지역 언어로 인정. 공용어는 아니지만 Académie pa'umotu(Kāruru vānaga, 2008년 설립)가 관리",zh:"法属波利尼西亚受承认的地区语言；非官方语言，但由 Académie pa'umotu（Kāruru vānaga，2008年成立）负责监管",yue:"法屬波利尼西亞獲承認嘅地區語言；非官方語言，但由 Académie pa'umotu（Kāruru vānaga，2008年成立）負責監管",vi:"Ngôn ngữ vùng được công nhận tại Polynésie thuộc Pháp; không chính thức nhưng do Académie pa'umotu (Kāruru vānaga, thành lập 2008) theo dõi",th:"เป็นภาษาประจำภูมิภาคที่ได้รับการรับรองในเฟรนช์โปลินีเซีย ไม่ใช่ภาษาราชการแต่มี Académie pa'umotu (Kāruru vānaga ก่อตั้งปี 2008) เป็นผู้ดูแล",id:"Bahasa daerah yang diakui di Polinesia Prancis; tidak resmi, tetapi diawasi oleh Académie pa'umotu (Kāruru vānaga, didirikan 2008)",hi:"फ़्रेंच पॉलिनेशिया में मान्यता प्राप्त क्षेत्रीय भाषा; आधिकारिक नहीं, पर Académie pa'umotu (Kāruru vānaga, स्थापना 2008) द्वारा देखरेख",de:"Anerkannte Regionalsprache in Französisch-Polynesien; nicht amtlich, aber von der Académie pa'umotu (Kāruru vānaga, gegründet 2008) betreut",fr:"Langue régionale reconnue en Polynésie française ; non officielle mais suivie par l'Académie pa'umotu (Kāruru vānaga, créée en 2008)",it:"Lingua regionale riconosciuta nella Polinesia francese; non ufficiale ma seguita dall'Académie pa'umotu (Kāruru vānaga, istituita nel 2008)",es:"Lengua regional reconocida en la Polinesia Francesa; no oficial, pero supervisada por la Académie pa'umotu (Kāruru vānaga, creada en 2008)",pt:"Língua regional reconhecida na Polinésia Francesa; não oficial, mas acompanhada pela Académie pa'umotu (Kāruru vānaga, criada em 2008)",ru:"Признанный региональный язык Французской Полинезии; не официальный, но курируется Académie pa'umotu (Kāruru vānaga, основана в 2008 году)",uk:"Визнана регіональна мова Французької Полінезії; не офіційна, але за нею наглядає Académie pa'umotu (Kāruru vānaga, засн. 2008)",ar:"لغة إقليمية معترف بها في بولينيزيا الفرنسية؛ غير رسمية لكن ترعاها Académie pa'umotu (Kāruru vānaga، تأسست عام 2008)",he:"שפה אזורית מוכרת בפולינזיה הצרפתית; אינה רשמית אך מפוקחת על ידי Académie pa'umotu (Kāruru vānaga, שהוקמה ב-2008)",sw:"Lugha ya kanda inayotambuliwa katika Polinesia ya Kifaransa; si rasmi lakini inasimamiwa na Académie pa'umotu (Kāruru vānaga, ilianzishwa 2008)"},
    "Latin alphabet with diacritics: grave (à = low tone), acute (á = high tone)": {ja:"補助記号付きラテン文字：グレイブ（à＝低声調）、アキュート（á＝高声調）",ko:"발음 구별 부호가 있는 라틴 문자: 그레이브(à = 저조), 아큐트(á = 고조)",zh:"带附加符号的拉丁字母：低音符（à = 低调）、高音符（á = 高调）",yue:"帶附加符號嘅拉丁字母：低音符（à = 低調）、高音符（á = 高調）",vi:"Bảng chữ cái Latinh có dấu phụ: dấu huyền (à = thanh thấp), dấu sắc (á = thanh cao)",th:"อักษรละตินพร้อมเครื่องหมายเสริม: เกรฟ (à = เสียงต่ำ) และอะคิวต์ (á = เสียงสูง)",id:"Alfabet Latin dengan diakritik: grave (à = nada rendah), akut (á = nada tinggi)",hi:"विशेषक चिह्नों सहित लैटिन वर्णमाला: ग्रेव (à = निम्न टोन), एक्यूट (á = उच्च टोन)",de:"Lateinisches Alphabet mit Diakritika: Gravis (à = tiefer Ton), Akut (á = hoher Ton)",fr:"Alphabet latin avec diacritiques : accent grave (à = ton bas), accent aigu (á = ton haut)",it:"Alfabeto latino con diacritici: accento grave (à = tono basso), acuto (á = tono alto)",es:"Alfabeto latino con diacríticos: acento grave (à = tono bajo), agudo (á = tono alto)",pt:"Alfabeto latino com diacríticos: grave (à = tom baixo), agudo (á = tom alto)",ru:"Латинский алфавит с диакритикой: гравис (à = низкий тон), акут (á = высокий тон)",uk:"Латинська абетка з діакритиками: гравіс (à = низький тон), акут (á = високий тон)",ar:"الأبجدية اللاتينية مع علامات تشكيل: علامة الخفض à (نغمة منخفضة)، وعلامة الرفع á (نغمة مرتفعة)",he:"אלפבית לטיני עם סימנים דיאקריטיים: גרביס (à = טון נמוך), אקוט (á = טון גבוה)",sw:"Alfabeti ya Kilatini yenye alama za lafudhi: grave (à = toni ya chini), acute (á = toni ya juu)"},
    "No official status; Portuguese is the only official language of Brazil. UNESCO classifies it as severely endangered (Level 3 of 5)": {ja:"公的地位なし。ブラジルの公用語はポルトガル語のみ。ユネスコは重大な危機（5段階中レベル3）に分類",ko:"공적 지위 없음. 브라질의 공용어는 포르투갈어뿐. 유네스코는 심각한 위기(5단계 중 3단계)로 분류",zh:"无官方地位；葡萄牙语是巴西唯一的官方语言。联合国教科文组织将其列为严重濒危（5级中的第3级）",yue:"冇官方地位；葡萄牙語係巴西唯一嘅官方語言。聯合國教科文組織將佢列為嚴重瀕危（5級之中嘅第3級）",vi:"Không có quy chế chính thức; tiếng Bồ Đào Nha là ngôn ngữ chính thức duy nhất của Brazil. UNESCO xếp loại nguy cấp nghiêm trọng (mức 3 trên 5)",th:"ไม่มีสถานะทางการ ภาษาโปรตุเกสเป็นภาษาราชการเพียงภาษาเดียวของบราซิล ยูเนสโกจัดว่าใกล้สูญอย่างรุนแรง (ระดับ 3 จาก 5)",id:"Tanpa status resmi; bahasa Portugis adalah satu-satunya bahasa resmi Brasil. UNESCO menggolongkannya sangat terancam punah (Tingkat 3 dari 5)",hi:"कोई आधिकारिक दर्जा नहीं; पुर्तगाली ब्राज़ील की एकमात्र आधिकारिक भाषा है। यूनेस्को इसे अत्यधिक संकटग्रस्त वर्गीकृत करता है (5 में से स्तर 3)",de:"Kein amtlicher Status; Portugiesisch ist die einzige Amtssprache Brasiliens. Die UNESCO stuft sie als stark gefährdet ein (Stufe 3 von 5)",fr:"Aucun statut officiel ; le portugais est la seule langue officielle du Brésil. L'UNESCO la classe comme sévèrement en danger (niveau 3 sur 5)",it:"Nessuno status ufficiale; il portoghese è l'unica lingua ufficiale del Brasile. L'UNESCO la classifica come gravemente in pericolo (livello 3 di 5)",es:"Sin estatus oficial; el portugués es la única lengua oficial de Brasil. La UNESCO la clasifica como seriamente en peligro (nivel 3 de 5)",pt:"Sem estatuto oficial; o português é a única língua oficial do Brasil. A UNESCO a classifica como seriamente ameaçada (nível 3 de 5)",ru:"Официального статуса нет; португальский — единственный официальный язык Бразилии. ЮНЕСКО относит его к языкам в серьёзной опасности (уровень 3 из 5)",uk:"Не має офіційного статусу; єдина офіційна мова Бразилії — португальська. ЮНЕСКО класифікує її як таку, що перебуває під серйозною загрозою (рівень 3 з 5)",ar:"لا وضع رسمي؛ البرتغالية هي اللغة الرسمية الوحيدة في البرازيل. وتصنفها اليونسكو لغةً مهددة بالانقراض بشدة (المستوى 3 من 5)",he:"אין מעמד רשמי; פורטוגזית היא השפה הרשמית היחידה של ברזיל. אונסק״ו מסווגת אותה כנמצאת בסכנת הכחדה חמורה (רמה 3 מתוך 5)",sw:"Hakuna hadhi rasmi; Kireno ndiyo lugha pekee rasmi ya Brazili. UNESCO inaiainisha kuwa iko hatarini kubwa ya kutoweka (Kiwango cha 3 kati ya 5)"},
    "National language of Bolivia (recognized in Supreme Decree No. 25894, 2000; included in Bolivia's 2009 Constitution)": {ja:"ボリビアの国家言語（2000年最高令第25894号で認定。2009年ボリビア憲法に明記）",ko:"볼리비아의 국가 언어(2000년 최고령 제25894호로 인정. 2009년 볼리비아 헌법에 포함)",zh:"玻利维亚国家语言（2000年第25894号最高法令确认；载入玻利维亚2009年宪法）",yue:"玻利維亞國家語言（2000年第25894號最高法令確認；載入玻利維亞2009年憲法）",vi:"Ngôn ngữ quốc gia của Bolivia (được công nhận trong Sắc lệnh Tối cao số 25894, năm 2000; đưa vào Hiến pháp Bolivia 2009)",th:"ภาษาประจำชาติของโบลิเวีย (รับรองในรัฐกฤษฎีกาสูงสุดเลขที่ 25894 ปี 2000 และบรรจุไว้ในรัฐธรรมนูญโบลิเวีย ปี 2009)",id:"Bahasa nasional Bolivia (diakui dalam Dekret Tertinggi No. 25894, 2000; tercantum dalam Konstitusi Bolivia 2009)",hi:"बोलीविया की राष्ट्रीय भाषा (सर्वोच्च आदेश सं. 25894, 2000 में मान्यता प्राप्त; बोलीविया के 2009 के संविधान में सम्मिलित)",de:"Nationalsprache Boliviens (anerkannt im Obersten Dekret Nr. 25894 von 2000; in die bolivianische Verfassung von 2009 aufgenommen)",fr:"Langue nationale de la Bolivie (reconnue par le décret suprême nº 25894 de 2000 ; inscrite dans la Constitution bolivienne de 2009)",it:"Lingua nazionale della Bolivia (riconosciuta dal Decreto Supremo n. 25894 del 2000; inclusa nella Costituzione boliviana del 2009)",es:"Idioma nacional de Bolivia (reconocido en el Decreto Supremo N.º 25894 de 2000; incluido en la Constitución boliviana de 2009)",pt:"Língua nacional da Bolívia (reconhecida no Decreto Supremo n.º 25894, de 2000; incluída na Constituição boliviana de 2009)",ru:"Национальный язык Боливии (признан Верховным декретом № 25894 от 2000 года; включён в Конституцию Боливии 2009 года)",uk:"Національна мова Болівії (визнана Верховним декретом № 25894, 2000; внесена до Конституції Болівії 2009 року)",ar:"لغة وطنية في بوليفيا (معترف بها في المرسوم السامي رقم 25894 لعام 2000؛ ومُدرجة في دستور بوليفيا لعام 2009)",he:"שפה לאומית של בוליביה (הוכרה בצו העליון מס׳ 25894, 2000; נכללה בחוקת בוליביה מ-2009)",sw:"Lugha ya taifa ya Bolivia (ilitambuliwa katika Amri Kuu Na. 25894, 2000; imejumuishwa katika Katiba ya Bolivia ya 2009)"},
    "Romanized Latin script (practical orthography for documentation and education)": {ja:"ローマ字化したラテン文字（記録と教育のための実用正書法）",ko:"로마자화한 라틴 문자(기록과 교육을 위한 실용 정서법)",zh:"拉丁转写文字（用于记录与教育的实用正字法）",yue:"拉丁轉寫文字（用於記錄同教育嘅實用正字法）",vi:"Chữ Latinh La Mã hóa (chính tả thực dụng dùng cho tư liệu hóa và giáo dục)",th:"อักษรละตินแบบถอดเสียง (อักขรวิธีใช้งานจริงสำหรับการบันทึกและการศึกษา)",id:"Aksara Latin romanisasi (ortografi praktis untuk dokumentasi dan pendidikan)",hi:"रोमनीकृत लैटिन लिपि (प्रलेखन और शिक्षा के लिए व्यावहारिक वर्तनी)",de:"Romanisierte lateinische Schrift (praktische Orthographie für Dokumentation und Bildung)",fr:"Écriture latine romanisée (orthographe pratique pour la documentation et l'enseignement)",it:"Scrittura latina romanizzata (ortografia pratica per la documentazione e l'istruzione)",es:"Escritura latina romanizada (ortografía práctica para la documentación y la enseñanza)",pt:"Escrita latina romanizada (ortografia prática para documentação e ensino)",ru:"Латиница (романизация; практическая орфография для документации и обучения)",uk:"Латинська графіка (практична орфографія для документування та освіти)",ar:"كتابة لاتينية مُرومَنة (إملاء عملي للتوثيق والتعليم)",he:"כתב לטיני מרומן (כתיב מעשי לתיעוד ולחינוך)",sw:"Hati ya Kilatini (tahajia ya vitendo kwa uwekaji kumbukumbu na elimu)"},
    "No official co-status; recognized as cultural heritage by Brazil's IPHAN (Institute of National Historic and Artistic Heritage)": {ja:"公用語としての地位なし。ブラジルのIPHAN（国立歴史芸術遺産研究所）が文化遺産として認定",ko:"공용어 지위 없음. 브라질의 IPHAN(국립 역사예술 유산연구소)이 문화유산으로 인정",zh:"无共同官方地位；获巴西 IPHAN（国家历史与艺术遗产研究所）认定为文化遗产",yue:"冇共同官方地位；獲巴西 IPHAN（國家歷史與藝術遺產研究所）認定為文化遺產",vi:"Không có quy chế đồng chính thức; được IPHAN của Brazil (Viện Di sản Lịch sử và Nghệ thuật Quốc gia) công nhận là di sản văn hóa",th:"ไม่มีสถานะราชการร่วม แต่ได้รับการรับรองเป็นมรดกทางวัฒนธรรมโดย IPHAN ของบราซิล (สถาบันมรดกทางประวัติศาสตร์และศิลปะแห่งชาติ)",id:"Tanpa status ko-resmi; diakui sebagai warisan budaya oleh IPHAN Brasil (Institut Warisan Sejarah dan Artistik Nasional)",hi:"कोई सह-आधिकारिक दर्जा नहीं; ब्राज़ील के IPHAN (राष्ट्रीय ऐतिहासिक एवं कलात्मक धरोहर संस्थान) द्वारा सांस्कृतिक धरोहर के रूप में मान्यता प्राप्त",de:"Kein amtlicher Ko-Status; vom brasilianischen IPHAN (Institut für nationales historisches und künstlerisches Erbe) als Kulturerbe anerkannt",fr:"Aucun co-statut officiel ; reconnue comme patrimoine culturel par l'IPHAN brésilien (Institut du patrimoine historique et artistique national)",it:"Nessun co-status ufficiale; riconosciuta come patrimonio culturale dall'IPHAN brasiliano (Istituto del patrimonio storico e artistico nazionale)",es:"Sin cooficialidad; reconocida como patrimonio cultural por el IPHAN de Brasil (Instituto del Patrimonio Histórico y Artístico Nacional)",pt:"Sem cooficialidade; reconhecida como patrimônio cultural pelo IPHAN (Instituto do Patrimônio Histórico e Artístico Nacional) do Brasil",ru:"Со-официального статуса нет; признан культурным наследием бразильским институтом IPHAN (Институт национального историко-художественного наследия)",uk:"Не має офіційного співстатусу; визнана культурною спадщиною бразильським IPHAN (Інститут національної історичної та мистецької спадщини)",ar:"لا وضع رسمي مشترك؛ معترف بها تراثًا ثقافيًا لدى IPHAN البرازيلي (معهد التراث التاريخي والفني الوطني)",he:"אין מעמד רשמי משותף; מוכרת כמורשת תרבותית על ידי IPHAN הברזילאי (המכון למורשת ההיסטורית והאמנותית הלאומית)",sw:"Hakuna hadhi rasmi mwenza; inatambuliwa kama urithi wa kitamaduni na IPHAN ya Brazili (Taasisi ya Urithi wa Kihistoria na Kisanaa wa Kitaifa)"},
    "No (Modern Standard Arabic is the official written standard)": {ja:"公用語ではない（現代標準アラビア語が公式の書記標準）",ko:"공용어 아님(현대 표준 아랍어가 공식 문어 표준)",zh:"否（现代标准阿拉伯语为官方书面标准）",yue:"否（現代標準阿拉伯語係官方書面標準）",vi:"Không (tiếng Ả Rập chuẩn hiện đại là chuẩn viết chính thức)",th:"ไม่ (ภาษาอาหรับมาตรฐานสมัยใหม่เป็นมาตรฐานการเขียนที่เป็นทางการ)",id:"Tidak (bahasa Arab Standar Modern adalah standar tulis resmi)",hi:"नहीं (आधुनिक मानक अरबी आधिकारिक लिखित मानक है)",de:"Nein (Modernes Hocharabisch ist der amtliche Schriftstandard)",fr:"Non (l'arabe standard moderne est la norme écrite officielle)",it:"No (l'arabo standard moderno è lo standard scritto ufficiale)",es:"No (el árabe estándar moderno es el estándar escrito oficial)",pt:"Não (o árabe padrão moderno é o padrão escrito oficial)",ru:"Нет (современный литературный арабский — официальный письменный стандарт)",uk:"Ні (офіційним писемним стандартом є сучасна стандартна арабська)",ar:"لا (العربية الفصحى الحديثة هي المعيار الكتابي الرسمي)",he:"לא (ערבית ספרותית מודרנית היא התקן הכתוב הרשמי)",sw:"Hapana (Kiarabu Sanifu cha Kisasa ndicho kiwango rasmi cha maandishi)"},
    "Tibetan script (Uchen/dbu-can abugida, derived from Brahmi via Indian scripts)": {ja:"チベット文字（ウチェン体／dbu-canのアブギダ。インド系文字を経てブラーフミー文字に由来）",ko:"티베트 문자(우첸/dbu-can 아부기다, 인도계 문자를 거쳐 브라흐미 문자에서 유래)",zh:"藏文（乌金体／dbu-can 元音附标文字，经印度诸文字源自婆罗米文）",yue:"藏文（烏金體／dbu-can 元音附標文字，經印度諸文字源自婆羅米文）",vi:"Chữ Tạng (abugida Uchen/dbu-can, phái sinh từ chữ Brahmi qua các hệ chữ Ấn Độ)",th:"อักษรทิเบต (อักษรสระประกอบแบบอูเจน/dbu-can พัฒนาจากอักษรพราหมีผ่านอักษรอินเดีย)",id:"Aksara Tibet (abugida Uchen/dbu-can, diturunkan dari Brahmi melalui aksara-aksara India)",hi:"तिब्बती लिपि (उचेन/dbu-can अबुगिदा, भारतीय लिपियों के माध्यम से ब्राह्मी से व्युत्पन्न)",de:"Tibetische Schrift (Uchen/dbu-can-Abugida, über indische Schriften von der Brahmi abgeleitet)",fr:"Écriture tibétaine (abugida uchen/dbu-can, dérivé de la brahmi via les écritures indiennes)",it:"Scrittura tibetana (abugida uchen/dbu-can, derivata dal brahmi tramite le scritture indiane)",es:"Escritura tibetana (abugida uchen/dbu-can, derivada del brahmi a través de las escrituras indias)",pt:"Escrita tibetana (abugida uchen/dbu-can, derivada do brâhmi por via das escritas indianas)",ru:"Тибетское письмо (абугида учен/dbu-can, восходит к брахми через индийские письменности)",uk:"Тибетське письмо (абугіда учен/dbu-can, походить від брахмі через індійські писемності)",ar:"الكتابة التبتية (أبجدية مقطعية أوتشين/dbu-can، مشتقة من البراهمية عبر الكتابات الهندية)",he:"כתב טיבטי (אבוגידה אוצ׳ן/dbu-can, שנגזרה מברהמי דרך כתבים הודיים)",sw:"Hati ya Kitibeti (abugida ya Uchen/dbu-can, iliyotokana na Brahmi kupitia hati za Kihindi)"},
    "Not officially recognized; historically unwritten with notches on wooden logs. Latin-based alphabet developed 1983 but not widely ": {ja:"公的に認定されていない。歴史的には文字を持たず、木片の刻み目で記録した。1983年にラテン文字系のアルファベットが作られたが広くは普及していない",ko:"공식적으로 인정되지 않음. 역사적으로 문자가 없어 나무에 새긴 눈금으로 기록. 1983년 라틴 문자 기반 알파벳이 만들어졌으나 널리 쓰이지는 않음",zh:"未获官方承认；历史上无文字，以刻木记事。1983年制定拉丁字母方案，但未广泛 ",yue:"未獲官方承認；歷史上冇文字，以刻木記事。1983年制定拉丁字母方案，但未廣泛 ",vi:"Không được công nhận chính thức; trong lịch sử không có chữ viết, chỉ khắc dấu trên khúc gỗ. Bảng chữ cái dựa trên Latinh được xây dựng năm 1983 nhưng chưa phổ biến rộng ",th:"ไม่ได้รับการรับรองอย่างเป็นทางการ ในอดีตไม่มีตัวเขียน ใช้การบากรอยบนท่อนไม้ มีการพัฒนาอักษรฐานละตินในปี 1983 แต่ยังไม่แพร่หลาย ",id:"Tidak diakui secara resmi; secara historis tidak ditulis, hanya takik pada balok kayu. Alfabet berbasis Latin dikembangkan 1983 tetapi tidak luas ",hi:"आधिकारिक रूप से मान्यता प्राप्त नहीं; ऐतिहासिक रूप से अलिखित, लकड़ी के लट्ठों पर खाँचों के साथ। लैटिन-आधारित वर्णमाला 1983 में विकसित, पर व्यापक रूप से नहीं ",de:"Nicht amtlich anerkannt; historisch schriftlos, mit Kerben in Holzstäben. 1983 wurde ein lateinbasiertes Alphabet entwickelt, aber nicht weit ",fr:"Non officiellement reconnue ; historiquement non écrite, notée par des encoches sur des bûches de bois. Alphabet à base latine élaboré en 1983 mais peu ",it:"Non riconosciuta ufficialmente; storicamente non scritta, con tacche su ceppi di legno. Alfabeto di base latina sviluppato nel 1983 ma non ampiamente ",es:"Sin reconocimiento oficial; históricamente sin escritura, con muescas en troncos de madera. Alfabeto de base latina desarrollado en 1983, pero no ampliamente ",pt:"Não reconhecida oficialmente; historicamente sem escrita, com registros feitos por entalhes em toras de madeira. Alfabeto de base latina desenvolvido em 1983, mas pouco difundido ",ru:"Официально не признан; исторически бесписьменный, записи велись зарубками на деревянных брусках. Алфавит на латинской основе создан в 1983 году, но широкого распространения не получил ",uk:"Офіційно не визнана; історично безписемна, із зарубками на дерев'яних колодах. Абетку на латинській основі розроблено 1983 року, але вона не набула широкого ",ar:"غير معترف بها رسميًا؛ كانت تاريخيًا بلا كتابة وتُسجَّل بحزوز على جذوع خشبية. وُضعت أبجدية لاتينية الأساس عام 1983 لكنها لم تنتشر ",he:"אינה מוכרת רשמית; היסטורית לא נכתבה, למעט חריצים על בולי עץ. אלפבית מבוסס לטינית פותח ב-1983 אך אינו נפוץ ",sw:"Haitambuliwi rasmi; kihistoria haikuandikwa bali ilitumia mikato kwenye magogo ya mbao. Alfabeti yenye msingi wa Kilatini ilibuniwa 1983 lakini haijaenea "},
    "Latin script (Drung alphabet developed 1983, Latin-based with diacritics)": {ja:"ラテン文字（1983年に作られたドゥルン文字。ラテン文字ベースで補助記号付き）",ko:"라틴 문자(1983년 제정된 드룽 알파벳, 라틴 문자 기반에 발음 구별 부호 사용)",zh:"拉丁文字（1983年制定的独龙文，以拉丁字母为基础并带附加符号）",yue:"拉丁文字（1983年制定嘅獨龍文，以拉丁字母為基礎並帶附加符號）",vi:"Chữ Latinh (bảng chữ cái Drung xây dựng năm 1983, dựa trên Latinh có dấu phụ)",th:"อักษรละติน (อักษรดรุงพัฒนาขึ้นปี 1983 อิงอักษรละตินและมีเครื่องหมายเสริม)",id:"Aksara Latin (alfabet Drung dikembangkan 1983, berbasis Latin dengan diakritik)",hi:"लैटिन लिपि (द्रुंग वर्णमाला 1983 में विकसित, लैटिन-आधारित, विशेषक चिह्नों सहित)",de:"Lateinische Schrift (Drung-Alphabet von 1983, lateinbasiert mit Diakritika)",fr:"Écriture latine (alphabet drung élaboré en 1983, à base latine avec diacritiques)",it:"Scrittura latina (alfabeto drung sviluppato nel 1983, di base latina con diacritici)",es:"Escritura latina (alfabeto drung desarrollado en 1983, de base latina con diacríticos)",pt:"Escrita latina (alfabeto drung criado em 1983, de base latina e com diacríticos)",ru:"Латиница (алфавит дулун создан в 1983 году, на латинской основе с диакритикой)",uk:"Латинське письмо (абетка друнг, розроблена 1983 року, на латинській основі з діакритиками)",ar:"كتابة لاتينية (أبجدية درونغ الموضوعة عام 1983، لاتينية الأساس مع علامات تشكيل)",he:"כתב לטיני (אלפבית דרונג שפותח ב-1983, מבוסס לטינית עם סימנים דיאקריטיים)",sw:"Hati ya Kilatini (alfabeti ya Kidrung iliyobuniwa 1983, yenye msingi wa Kilatini na alama za lafudhi)"},
    "Cyrillic (38-letter modern alphabet with additional characters)": {ja:"キリル文字（追加文字を含む38字の現代アルファベット）",ko:"키릴 문자(추가 문자를 포함한 38자 현대 알파벳)",zh:"西里尔字母（38个字母的现代字母表，含附加字母）",yue:"西里爾字母（38個字母嘅現代字母表，含附加字母）",vi:"Chữ Kirin (bảng chữ cái hiện đại 38 chữ cái, có thêm ký tự riêng)",th:"อักษรซีริลลิก (อักษรสมัยใหม่ 38 ตัว มีอักขระเพิ่มเติม)",id:"Kiril (alfabet modern 38 huruf dengan karakter tambahan)",hi:"सिरिलिक (38 अक्षरों की आधुनिक वर्णमाला, अतिरिक्त संकेतों सहित)",de:"Kyrillisch (modernes Alphabet mit 38 Buchstaben und Zusatzzeichen)",fr:"Cyrillique (alphabet moderne de 38 lettres avec caractères additionnels)",it:"Cirillico (alfabeto moderno di 38 lettere con caratteri aggiuntivi)",es:"Cirílico (alfabeto moderno de 38 letras con caracteres adicionales)",pt:"Cirílico (alfabeto moderno de 38 letras, com caracteres adicionais)",ru:"Кириллица (современный алфавит из 38 букв с дополнительными знаками)",uk:"Кирилиця (сучасна 38-літерна абетка з додатковими знаками)",ar:"السيريلية (أبجدية حديثة من 38 حرفًا مع محارف إضافية)",he:"קירילי (אלפבית מודרני בן 38 אותיות עם תווים נוספים)",sw:"Kikrili (alfabeti ya kisasa ya herufi 38 yenye vibambo vya ziada)"},
    "Latin alphabet (20-letter basic set, no tone marking in the standard orthography)": {ja:"ラテン文字（基本20字。標準正書法では声調を表記しない）",ko:"라틴 문자(기본 20자, 표준 정서법에서는 성조를 표기하지 않음)",zh:"拉丁字母（20个基本字母，标准正字法不标声调）",yue:"拉丁字母（20個基本字母，標準正字法唔標聲調）",vi:"Bảng chữ cái Latinh (bộ cơ bản 20 chữ cái, chính tả chuẩn không ghi thanh điệu)",th:"อักษรละติน (ชุดพื้นฐาน 20 ตัว อักขรวิธีมาตรฐานไม่กำกับวรรณยุกต์)",id:"Alfabet Latin (himpunan dasar 20 huruf, tanpa penandaan nada dalam ortografi standar)",hi:"लैटिन वर्णमाला (20 अक्षरों का मूल समुच्चय; मानक वर्तनी में टोन-चिह्न नहीं)",de:"Lateinisches Alphabet (Grundbestand von 20 Buchstaben, keine Tonmarkierung in der Standardorthographie)",fr:"Alphabet latin (jeu de base de 20 lettres, pas de notation des tons dans l'orthographe standard)",it:"Alfabeto latino (set di base di 20 lettere, nessuna notazione tonale nell'ortografia standard)",es:"Alfabeto latino (conjunto básico de 20 letras, sin marcación tonal en la ortografía estándar)",pt:"Alfabeto latino (conjunto básico de 20 letras, sem marcação de tom na ortografia padrão)",ru:"Латинский алфавит (базовый набор из 20 букв, тон в стандартной орфографии не обозначается)",uk:"Латинська абетка (базовий набір із 20 літер, без позначення тонів у стандартній орфографії)",ar:"الأبجدية اللاتينية (مجموعة أساسية من 20 حرفًا، دون تعليم النغمات في الإملاء المعياري)",he:"אלפבית לטיני (מערך בסיסי בן 20 אותיות, ללא סימון טונים בכתיב התקני)",sw:"Alfabeti ya Kilatini (seti ya msingi ya herufi 20, hakuna alama za toni katika tahajia sanifu)"},
    "Sorang Sompeng script (invented 1936 by Mangei Gomango); also written ": {ja:"ソラング・ソンペング文字（1936年にマンゲイ・ゴマンゴが考案）。ほかの文字でも表記される",ko:"소랑솜펭 문자(1936년 망게이 고망고가 고안). 다른 문자로도 표기됨",zh:"Sorang Sompeng 文字（1936年由 Mangei Gomango 创制）；亦书写为 ",yue:"Sorang Sompeng 文字（1936年由 Mangei Gomango 創制）；亦書寫為 ",vi:"Chữ Sorang Sompeng (do Mangei Gomango sáng chế năm 1936); cũng được viết bằng ",th:"อักษรโซรังซมเปง (มังเก โกมังโก ประดิษฐ์ขึ้นในปี 1936) และยังเขียนด้วย ",id:"Aksara Sorang Sompeng (diciptakan 1936 oleh Mangei Gomango); juga ditulis ",hi:"सोरंग सोम्पेंग लिपि (1936 में मंगेई गोमांगो द्वारा आविष्कृत); इसके अलावा लिखी जाती है ",de:"Sorang-Sompeng-Schrift (1936 von Mangei Gomango erfunden); auch geschrieben ",fr:"Écriture sorang sompeng (inventée en 1936 par Mangei Gomango) ; également écrite ",it:"Scrittura sorang sompeng (inventata nel 1936 da Mangei Gomango); scritta anche ",es:"Escritura sorang sompeng (inventada en 1936 por Mangei Gomango); también se escribe ",pt:"Escrita sorang sompeng (criada em 1936 por Mangei Gomango); também escrita ",ru:"Письмо соранг сомпенг (создано в 1936 году Мангеи Гоманго); также записывается ",uk:"Письмо соранг сомпенг (створене 1936 року Мангеєм Гоманго); також записується ",ar:"كتابة سورانغ سومبينغ (ابتكرها مانغي غومانغو عام 1936)؛ وتُكتب أيضًا ",he:"כתב סורנג סומפנג (הומצא ב-1936 על ידי מנגיי גומנגו); נכתבת גם ",sw:"Hati ya Sorang Sompeng (ilibuniwa 1936 na Mangei Gomango); pia huandikwa "},
    "No (Lao is the sole official language of Laos; Khmu is a recognized minority language)": {ja:"公用語ではない（ラオスの公用語はラオ語のみ。クム語は少数民族言語として認定）",ko:"공용어 아님(라오스의 유일한 공용어는 라오어. 크무어는 인정된 소수민족 언어)",zh:"否（老挝语是老挝唯一的官方语言；克木语为受承认的少数民族语言）",yue:"否（老撾語係老撾唯一嘅官方語言；克木語係獲承認嘅少數族裔語言）",vi:"Không (tiếng Lào là ngôn ngữ chính thức duy nhất của Lào; tiếng Khmu là ngôn ngữ thiểu số được công nhận)",th:"ไม่ (ภาษาลาวเป็นภาษาราชการเพียงภาษาเดียวของลาว ส่วนภาษาขมุเป็นภาษาชนกลุ่มน้อยที่ได้รับการรับรอง)",id:"Tidak (bahasa Lao adalah satu-satunya bahasa resmi Laos; Khmu adalah bahasa minoritas yang diakui)",hi:"नहीं (लाओ लाओस की एकमात्र आधिकारिक भाषा है; ख्मू एक मान्यता प्राप्त अल्पसंख्यक भाषा है)",de:"Nein (Laotisch ist die einzige Amtssprache von Laos; Khmu ist eine anerkannte Minderheitensprache)",fr:"Non (le lao est la seule langue officielle du Laos ; le khmou est une langue minoritaire reconnue)",it:"No (il lao è l'unica lingua ufficiale del Laos; il khmu è una lingua minoritaria riconosciuta)",es:"No (el lao es la única lengua oficial de Laos; el khmu es una lengua minoritaria reconocida)",pt:"Não (o lao é a única língua oficial do Laos; o khmu é uma língua minoritária reconhecida)",ru:"Нет (лаосский — единственный официальный язык Лаоса; кхму — признанный язык меньшинства)",uk:"Ні (єдина офіційна мова Лаосу — лаоська; кхму є визнаною мовою меншини)",ar:"لا (اللاوية هي اللغة الرسمية الوحيدة في لاوس؛ والخمو لغة أقلية معترف بها)",he:"לא (לאו היא השפה הרשמית היחידה של לאוס; חמו היא שפת מיעוט מוכרת)",sw:"Hapana (Kilao ndiyo lugha pekee rasmi ya Laos; Kikhmu ni lugha ya wachache inayotambuliwa)"},
    "No (Modern Standard Arabic is the official language of Saudi Arabia; Najdi is the spoken vernacular)": {ja:"公用語ではない（サウジアラビアの公用語は現代標準アラビア語。ナジュド方言は話し言葉）",ko:"공용어 아님(사우디아라비아의 공용어는 현대 표준 아랍어. 나즈드 방언은 구어)",zh:"否（现代标准阿拉伯语是沙特阿拉伯的官方语言；内志方言为口语变体）",yue:"否（現代標準阿拉伯語係沙特阿拉伯嘅官方語言；內志方言係口語變體）",vi:"Không (tiếng Ả Rập chuẩn hiện đại là ngôn ngữ chính thức của Ả Rập Xê Út; Najdi là khẩu ngữ bản địa)",th:"ไม่ (ภาษาอาหรับมาตรฐานสมัยใหม่เป็นภาษาราชการของซาอุดีอาระเบีย ส่วนภาษานัจญ์ดีเป็นภาษาพูดพื้นถิ่น)",id:"Tidak (bahasa Arab Standar Modern adalah bahasa resmi Arab Saudi; Najdi adalah ragam lisan sehari-hari)",hi:"नहीं (आधुनिक मानक अरबी सऊदी अरब की आधिकारिक भाषा है; नज्दी बोलचाल की भाषा है)",de:"Nein (Modernes Hocharabisch ist die Amtssprache Saudi-Arabiens; Nadschdi ist die gesprochene Umgangssprache)",fr:"Non (l'arabe standard moderne est la langue officielle de l'Arabie saoudite ; le nadjdi est le vernaculaire parlé)",it:"No (l'arabo standard moderno è la lingua ufficiale dell'Arabia Saudita; il najdi è il vernacolo parlato)",es:"No (el árabe estándar moderno es la lengua oficial de Arabia Saudita; el najdí es el vernáculo hablado)",pt:"Não (o árabe padrão moderno é a língua oficial da Arábia Saudita; o najdi é o vernáculo falado)",ru:"Нет (современный литературный арабский — официальный язык Саудовской Аравии; недждийский — разговорный вариант)",uk:"Ні (офіційна мова Саудівської Аравії — сучасна стандартна арабська; неджді є розмовним варіантом)",ar:"لا (العربية الفصحى الحديثة هي اللغة الرسمية في السعودية؛ والنجدية هي العامية المنطوقة)",he:"לא (ערבית ספרותית מודרנית היא השפה הרשמית של ערב הסעודית; נג׳דית היא הלשון המדוברת)",sw:"Hapana (Kiarabu Sanifu cha Kisasa ndiyo lugha rasmi ya Saudi Arabia; Kinajdi ni lahaja inayozungumzwa)"},
    "~345M L1 (~600M Hindustani total)": {ja:"L1約345M（ヒンドゥスターニー語全体で約600M）",ko:"L1 약 345M(힌두스탄어 전체 약 600M)",zh:"约345M母语使用者（印度斯坦语合计约600M）",yue:"約345M母語使用者（印度斯坦語合計約600M）",vi:"~345M L1 (~600M tổng số tiếng Hindustani)",th:"~345M คน L1 (รวมภาษาฮินดูสตานีทั้งหมด ~600M)",id:"~345M L1 (~600M Hindustani total)",hi:"~345M L1 (कुल हिंदुस्तानी ~600M)",de:"~345M L1 (~600M Hindustani insgesamt)",fr:"~345M L1 (~600M hindoustani au total)",it:"~345M L1 (~600M hindustani in totale)",es:"~345M L1 (~600M de hindustaní en total)",pt:"~345M L1 (~600M de hindustani no total)",ru:"~345M L1 (~600M хиндустани в целом)",uk:"~345M носіїв (~600M гіндустані загалом)",ar:"~345M متحدث أصلي (~600M للهندوستانية إجمالًا)",he:"~345M דוברי שפת אם (~600M הינדוסטנית בסך הכול)",sw:"~345M wenye lugha ya kwanza (~600M Kihindustani kwa jumla)"},
    "No (Dutch is the sole official language of Suriname; Sarnami is a widely spoken home language)": {ja:"公用語ではない（スリナムの公用語はオランダ語のみ。サルナーミ語は広く使われる家庭言語）",ko:"공용어 아님(수리남의 유일한 공용어는 네덜란드어. 사르나미어는 널리 쓰이는 가정 언어)",zh:"否（荷兰语是苏里南唯一的官方语言；Sarnami 是广泛使用的家庭用语）",yue:"否（荷蘭語係蘇里南唯一嘅官方語言；Sarnami 係廣泛使用嘅家庭用語）",vi:"Không (tiếng Hà Lan là ngôn ngữ chính thức duy nhất của Suriname; Sarnami là ngôn ngữ gia đình được nói rộng rãi)",th:"ไม่ (ภาษาดัตช์เป็นภาษาราชการเพียงภาษาเดียวของซูรินาม ส่วนภาษาซาร์นามีเป็นภาษาที่ใช้ในบ้านอย่างแพร่หลาย)",id:"Tidak (bahasa Belanda adalah satu-satunya bahasa resmi Suriname; Sarnami adalah bahasa rumah yang dituturkan secara luas)",hi:"नहीं (डच सूरीनाम की एकमात्र आधिकारिक भाषा है; सरनामी व्यापक रूप से बोली जाने वाली घरेलू भाषा है)",de:"Nein (Niederländisch ist die einzige Amtssprache Surinames; Sarnami ist eine weit verbreitete Haussprache)",fr:"Non (le néerlandais est la seule langue officielle du Suriname ; le sarnami est une langue domestique largement parlée)",it:"No (il neerlandese è l'unica lingua ufficiale del Suriname; il sarnami è una lingua domestica ampiamente parlata)",es:"No (el neerlandés es la única lengua oficial de Surinam; el sarnami es una lengua doméstica muy hablada)",pt:"Não (o neerlandês é a única língua oficial do Suriname; o sarnami é uma língua doméstica amplamente falada)",ru:"Нет (нидерландский — единственный официальный язык Суринама; сарнами — широко распространённый домашний язык)",uk:"Ні (єдина офіційна мова Суринаму — нідерландська; сарнамі є поширеною домашньою мовою)",ar:"لا (الهولندية هي اللغة الرسمية الوحيدة في سورينام؛ والسارنامية لغة منزلية واسعة الانتشار)",he:"לא (הולנדית היא השפה הרשמית היחידה של סורינאם; סרנאמי היא שפת בית מדוברת נפוצה)",sw:"Hapana (Kiholanzi ndiyo lugha pekee rasmi ya Suriname; Kisarnami ni lugha ya nyumbani inayozungumzwa sana)"},
    "~25K L1 self-claimed + tens of thousands L2 learners": {ja:"自己申告によるL1約25K＋数万人のL2学習者",ko:"자기 신고 기준 L1 약 25K + 수만 명의 L2 학습자",zh:"约25K人自报为母语使用者，另有数万第二语言学习者",yue:"約25K人自報為母語使用者，另有數萬第二語言學習者",vi:"~25K người tự nhận là L1 + hàng chục nghìn người học L2",th:"~25K คนที่ระบุตนเองเป็น L1 + ผู้เรียน L2 อีกหลายหมื่นคน",id:"~25K L1 menurut klaim sendiri + puluhan ribu pembelajar L2",hi:"~25K L1 (स्वयं घोषित) + दसियों हज़ार L2 शिक्षार्थी",de:"~25K L1 nach Selbstangabe + Zehntausende L2-Lernende",fr:"~25K L1 déclarés + des dizaines de milliers d'apprenants L2",it:"~25K L1 autodichiarati + decine di migliaia di apprendenti L2",es:"~25K L1 autodeclarados + decenas de miles de aprendices L2",pt:"~25K L1 autodeclarados + dezenas de milhares de aprendizes de L2",ru:"~25K L1 по самооценке + десятки тысяч изучающих как L2",uk:"~25K заявлених носіїв + десятки тисяч тих, хто вивчає її як другу",ar:"~25K متحدث أصلي حسب التعريف الذاتي + عشرات الآلاف من متعلميها لغةً ثانية",he:"~25K דוברי שפת אם על פי דיווח עצמי + עשרות אלפי לומדי שפה שנייה",sw:"~25K wenye lugha ya kwanza kwa kujitambulisha + makumi ya maelfu ya wanafunzi wa lugha ya pili"},
    "No (French is the sole official language; Picard is recognised as a langue de France)": {ja:"公用語ではない（公用語はフランス語のみ。ピカール語はlangue de Franceとして認定）",ko:"공용어 아님(유일한 공용어는 프랑스어. 피카르어는 langue de France로 인정)",zh:"否（法语是唯一的官方语言；皮卡第语获认定为 langue de France）",yue:"否（法語係唯一嘅官方語言；皮卡第語獲認定為 langue de France）",vi:"Không (tiếng Pháp là ngôn ngữ chính thức duy nhất; tiếng Picard được công nhận là langue de France)",th:"ไม่ (ภาษาฝรั่งเศสเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาปีการ์ได้รับการรับรองเป็น langue de France)",id:"Tidak (bahasa Prancis adalah satu-satunya bahasa resmi; Picard diakui sebagai langue de France)",hi:"नहीं (फ़्रेंच एकमात्र आधिकारिक भाषा है; पिकार्ड को langue de France के रूप में मान्यता प्राप्त है)",de:"Nein (Französisch ist die einzige Amtssprache; Picardisch ist als langue de France anerkannt)",fr:"Non (le français est la seule langue officielle ; le picard est reconnu comme langue de France)",it:"No (il francese è l'unica lingua ufficiale; il piccardo è riconosciuto come langue de France)",es:"No (el francés es la única lengua oficial; el picardo está reconocido como langue de France)",pt:"Não (o francês é a única língua oficial; o picardo é reconhecido como langue de France)",ru:"Нет (французский — единственный официальный язык; пикардский признан как langue de France)",uk:"Ні (єдина офіційна мова — французька; пікардська визнана як langue de France)",ar:"لا (الفرنسية هي اللغة الرسمية الوحيدة؛ والبيكاردية معترف بها بوصفها langue de France)",he:"לא (צרפתית היא השפה הרשמית היחידה; פיקרדית מוכרת כ-langue de France)",sw:"Hapana (Kifaransa ndiyo lugha pekee rasmi; Kipikardi kinatambuliwa kama langue de France)"},
    "UK (Bailiwick of Jersey: Jèrriais recognized as a regional language with public support)": {ja:"イギリス（ジャージー代官管轄区：ジェリエ語は公的支援を受ける地域言語として認定）",ko:"영국(저지 관할구: 저리에어가 공적 지원을 받는 지역 언어로 인정)",zh:"英国（泽西行政区：Jèrriais 获认定为地区语言并获公共支持）",yue:"英國（澤西行政區：Jèrriais 獲認定為地區語言並獲公共支持）",vi:"Vương quốc Anh (Bailiwick of Jersey: tiếng Jèrriais được công nhận là ngôn ngữ vùng và được nhà nước hỗ trợ)",th:"สหราชอาณาจักร (เขตปกครองเจอร์ซีย์: ภาษาเฌร์รีเยส์ได้รับการรับรองเป็นภาษาประจำภูมิภาคและได้รับการสนับสนุนจากภาครัฐ)",id:"Britania Raya (Bailiwick of Jersey: Jèrriais diakui sebagai bahasa daerah dengan dukungan publik)",hi:"यूनाइटेड किंगडम (बेलिविक ऑफ़ जर्सी: जेरिये को सार्वजनिक समर्थन सहित क्षेत्रीय भाषा के रूप में मान्यता प्राप्त)",de:"Vereinigtes Königreich (Vogtei Jersey: Jèrriais als Regionalsprache mit öffentlicher Förderung anerkannt)",fr:"Royaume-Uni (bailliage de Jersey : le jèrriais est reconnu comme langue régionale et bénéficie d'un soutien public)",it:"Regno Unito (Baliato di Jersey: il jèrriais è riconosciuto come lingua regionale con sostegno pubblico)",es:"Reino Unido (Bailía de Jersey: el jèrriais está reconocido como lengua regional con apoyo público)",pt:"Reino Unido (Bailiado de Jersey: o jèrriais é reconhecido como língua regional com apoio público)",ru:"Великобритания (бейливик Джерси: джерсийский признан региональным языком, пользующимся государственной поддержкой)",uk:"Велика Британія (бейлівік Джерсі: джерріє визнана регіональною мовою з державною підтримкою)",ar:"المملكة المتحدة (بيليفية جيرزي: الجيرية معترف بها لغةً إقليمية بدعم رسمي)",he:"בריטניה (בייליוויק ג׳רזי: ג׳רייה מוכרת כשפה אזורית עם תמיכה ציבורית)",sw:"Uingereza (Bailiwick ya Jersey: Kijèrriais kinatambuliwa kama lugha ya kanda yenye msaada wa umma)"},
    "Active liturgical/pedagogical use (no L1 community)": {ja:"典礼・教育の場で現用（L1話者の共同体はなし）",ko:"전례·교육 목적으로 현재 사용(L1 공동체 없음)",zh:"仍活跃于礼仪与教学用途（无母语社群）",yue:"仍活躍於禮儀同教學用途（冇母語社群）",vi:"Vẫn được dùng trong phụng vụ/giảng dạy (không còn cộng đồng L1)",th:"ยังใช้ในพิธีกรรมและการเรียนการสอน (ไม่มีชุมชนผู้พูด L1)",id:"Aktif digunakan secara liturgis/pedagogis (tanpa komunitas L1)",hi:"सक्रिय धार्मिक-अनुष्ठानिक/शैक्षिक उपयोग (कोई L1 समुदाय नहीं)",de:"Aktiver liturgischer/pädagogischer Gebrauch (keine L1-Gemeinschaft)",fr:"Usage liturgique et pédagogique actif (aucune communauté L1)",it:"Uso liturgico/didattico attivo (nessuna comunità L1)",es:"Uso litúrgico y pedagógico activo (sin comunidad L1)",pt:"Uso litúrgico/pedagógico ativo (sem comunidade de L1)",ru:"Активное литургическое и учебное использование (сообщества носителей L1 нет)",uk:"Активне літургійне/навчальне вживання (без спільноти носіїв)",ar:"استخدام طقسي/تعليمي نشط (دون مجتمع متحدثين أصليين)",he:"שימוש ליטורגי/לימודי פעיל (ללא קהילת דוברי שפת אם)",sw:"Matumizi hai ya kiliturujia na kimafundisho (hakuna jamii ya wenye lugha ya kwanza)"},
    "No (Swahili sw is the sole official language of Tanzania)": {ja:"公用語ではない（タンザニアの公用語はスワヒリ語 sw のみ）",ko:"공용어 아님(탄자니아의 유일한 공용어는 스와힐리어 sw)",zh:"否（斯瓦希里语 sw 是坦桑尼亚唯一的官方语言）",yue:"否（斯瓦希里語 sw 係坦桑尼亞唯一嘅官方語言）",vi:"Không (tiếng Swahili sw là ngôn ngữ chính thức duy nhất của Tanzania)",th:"ไม่ (ภาษาสวาฮีลี sw เป็นภาษาราชการเพียงภาษาเดียวของแทนซาเนีย)",id:"Tidak (bahasa Swahili sw adalah satu-satunya bahasa resmi Tanzania)",hi:"नहीं (स्वाहिली sw तंज़ानिया की एकमात्र आधिकारिक भाषा है)",de:"Nein (Swahili sw ist die einzige Amtssprache Tansanias)",fr:"Non (le swahili sw est la seule langue officielle de la Tanzanie)",it:"No (lo swahili sw è l'unica lingua ufficiale della Tanzania)",es:"No (el suajili sw es la única lengua oficial de Tanzania)",pt:"Não (o suaíli sw é a única língua oficial da Tanzânia)",ru:"Нет (суахили sw — единственный официальный язык Танзании)",uk:"Ні (єдина офіційна мова Танзанії — суахілі sw)",ar:"لا (السواحيلية sw هي اللغة الرسمية الوحيدة في تنزانيا)",he:"לא (סווהילית sw היא השפה הרשמית היחידה של טנזניה)",sw:"Hapana (Kiswahili sw ndiyo lugha pekee rasmi ya Tanzania)"},
    "Tanzania (Arumeru District, Arusha Region — slopes of Mount Meru)": {ja:"タンザニア（アルーシャ州アルメル県 ― メルー山の山腹）",ko:"탄자니아(아루샤주 아루메루현 — 메루산 기슭)",zh:"坦桑尼亚（阿鲁沙省阿鲁梅鲁县——梅鲁山山坡）",yue:"坦桑尼亞（阿魯沙省阿魯梅魯縣——梅魯山山坡）",vi:"Tanzania (huyện Arumeru, vùng Arusha — sườn núi Meru)",th:"แทนซาเนีย (อำเภออารูเมรู เขตอารูชา — เชิงเขาเมรู)",id:"Tanzania (Distrik Arumeru, Wilayah Arusha — lereng Gunung Meru)",hi:"तंज़ानिया (अरुमेरु ज़िला, अरूशा क्षेत्र — मेरु पर्वत की ढलानें)",de:"Tansania (Distrikt Arumeru, Region Arusha — Hänge des Mount Meru)",fr:"Tanzanie (district d'Arumeru, région d'Arusha — pentes du mont Meru)",it:"Tanzania (distretto di Arumeru, regione di Arusha — pendici del monte Meru)",es:"Tanzania (distrito de Arumeru, región de Arusha — laderas del monte Meru)",pt:"Tanzânia (Distrito de Arumeru, Região de Arusha — encostas do Monte Meru)",ru:"Танзания (округ Арумеру, область Аруша — склоны горы Меру)",uk:"Танзанія (округ Арумеру, область Аруша — схили гори Меру)",ar:"تنزانيا (مقاطعة أروميرو، إقليم أروشا — سفوح جبل ميرو)",he:"טנזניה (מחוז ארומרו, אזור ארושה — מדרונות הר מרו)",sw:"Tanzania (Wilaya ya Arumeru, Mkoa wa Arusha — miteremko ya Mlima Meru)"},
    "No (Filipino/English official; Agta languages recognized as community languages)": {ja:"公用語ではない（フィリピノ語・英語が公用語。アグタ諸語は地域共同体の言語として認定）",ko:"공용어 아님(필리핀어·영어가 공용어. 아그타 제어는 공동체 언어로 인정)",zh:"否（菲律宾语／英语为官方语言；Agta 诸语言获认定为社区语言）",yue:"否（菲律賓語／英語係官方語言；Agta 諸語言獲認定為社區語言）",vi:"Không (tiếng Filipino/tiếng Anh là chính thức; các ngôn ngữ Agta được công nhận là ngôn ngữ cộng đồng)",th:"ไม่ (ภาษาฟิลิปิโนและภาษาอังกฤษเป็นภาษาราชการ ส่วนกลุ่มภาษาอักตาได้รับการรับรองเป็นภาษาชุมชน)",id:"Tidak (Filipino/Inggris resmi; bahasa-bahasa Agta diakui sebagai bahasa komunitas)",hi:"नहीं (फ़िलिपीनो/अंग्रेज़ी आधिकारिक; आग्ता भाषाओं को सामुदायिक भाषाओं के रूप में मान्यता प्राप्त)",de:"Nein (Filipino/Englisch amtlich; die Agta-Sprachen sind als Gemeinschaftssprachen anerkannt)",fr:"Non (le filipino et l'anglais sont officiels ; les langues agta sont reconnues comme langues communautaires)",it:"No (filippino/inglese ufficiali; le lingue agta sono riconosciute come lingue comunitarie)",es:"No (filipino/inglés oficiales; las lenguas agta están reconocidas como lenguas comunitarias)",pt:"Não (filipino/inglês são oficiais; as línguas agta são reconhecidas como línguas comunitárias)",ru:"Нет (официальные — филиппинский и английский; языки агта признаны языками общин)",uk:"Ні (офіційні — філіппінська/англійська; мови агта визнані мовами громад)",ar:"لا (الفلبينية والإنجليزية رسميتان؛ ولغات الأغتا معترف بها لغاتٍ مجتمعية)",he:"לא (פיליפינית/אנגלית רשמיות; שפות אגטה מוכרות כשפות קהילתיות)",sw:"Hapana (Kifilipino/Kiingereza ni rasmi; lugha za Agta zinatambuliwa kama lugha za jamii)"},
    "No (Mandarin and Standard Tibetan are the regional languages; Mongghul is a recognized indigenous language)": {ja:"公用語ではない（地域言語は標準中国語と標準チベット語。モングォル語は先住民言語として認定）",ko:"공용어 아님(지역 언어는 표준 중국어와 표준 티베트어. 몽구오르어는 토착어로 인정)",zh:"否（普通话与标准藏语为当地通行语言；蒙古尔语为受承认的原住民语言）",yue:"否（普通話同標準藏語係當地通行語言；蒙古爾語係獲承認嘅原住民語言）",vi:"Không (tiếng Quan Thoại và tiếng Tạng chuẩn là ngôn ngữ vùng; tiếng Mongghul là ngôn ngữ bản địa được công nhận)",th:"ไม่ (ภาษาจีนกลางและภาษาทิเบตมาตรฐานเป็นภาษาประจำภูมิภาค ส่วนภาษามงกูลเป็นภาษาชนพื้นเมืองที่ได้รับการรับรอง)",id:"Tidak (bahasa Mandarin dan Tibet Standar adalah bahasa regional di sana; Mongghul adalah bahasa pribumi yang diakui)",hi:"नहीं (मंदारिन और मानक तिब्बती वहाँ की क्षेत्रीय भाषाएँ हैं; मोंग्घुल एक मान्यता प्राप्त देशज भाषा है)",de:"Nein (Mandarin und Standardtibetisch sind die Regionalsprachen; Mongghul ist eine anerkannte indigene Sprache)",fr:"Non (le mandarin et le tibétain standard sont les langues régionales ; le mongghul est une langue autochtone reconnue)",it:"No (il mandarino e il tibetano standard sono le lingue regionali; il mongghul è una lingua indigena riconosciuta)",es:"No (el mandarín y el tibetano estándar son las lenguas regionales; el mongghul es una lengua indígena reconocida)",pt:"Não (o mandarim e o tibetano padrão são as línguas regionais; o mongghul é uma língua indígena reconhecida)",ru:"Нет (региональные языки — путунхуа и стандартный тибетский; монгхул — признанный коренной язык)",uk:"Ні (регіональні мови — путунхуа та стандартна тибетська; монгхул є визнаною корінною мовою)",ar:"لا (الماندرينية والتبتية المعيارية هما اللغتان الإقليميتان؛ والمونغهول لغة أصلية معترف بها)",he:"לא (מנדרינית וטיבטית תקנית הן השפות האזוריות; מונגהול היא שפת ילידים מוכרת)",sw:"Hapana (Kimandarini na Kitibeti Sanifu ndizo lugha za kanda; Kimongghul ni lugha ya asili inayotambuliwa)"},
    "No (Thai is the sole official language)": {ja:"公用語ではない（公用語はタイ語のみ）",ko:"공용어 아님(유일한 공용어는 태국어)",zh:"否（泰语是唯一的官方语言）",yue:"否（泰語係唯一嘅官方語言）",vi:"Không (tiếng Thái là ngôn ngữ chính thức duy nhất)",th:"ไม่ (ภาษาไทยเป็นภาษาราชการเพียงภาษาเดียว)",id:"Tidak (bahasa Thai adalah satu-satunya bahasa resmi)",hi:"नहीं (थाई एकमात्र आधिकारिक भाषा है)",de:"Nein (Thai ist die einzige Amtssprache)",fr:"Non (le thaï est la seule langue officielle)",it:"No (il thai è l'unica lingua ufficiale)",es:"No (el tailandés es la única lengua oficial)",pt:"Não (o tailandês é a única língua oficial)",ru:"Нет (тайский — единственный официальный язык)",uk:"Ні (єдина офіційна мова — тайська)",ar:"لا (التايلاندية هي اللغة الرسمية الوحيدة)",he:"לא (תאית היא השפה הרשמית היחידה)",sw:"Hapana (Kithai ndiyo lugha pekee rasmi)"},
    "Thai (modern adaptation of the standard Thai script; Black Tai script historically)": {ja:"タイ文字（標準タイ文字の現代的な翻案。歴史的には黒タイ文字）",ko:"태국 문자(표준 태국 문자를 현대적으로 적용. 역사적으로는 흑타이 문자)",zh:"泰文（标准泰文的现代改编；历史上使用黑傣文）",yue:"泰文（標準泰文嘅現代改編；歷史上用黑傣文）",vi:"Chữ Thái (bản cải biên hiện đại của chữ Thái chuẩn; trong lịch sử dùng chữ Thái Đen)",th:"อักษรไทย (ดัดแปลงจากอักษรไทยมาตรฐานในยุคปัจจุบัน ในอดีตใช้อักษรไทดำ)",id:"Thai (adaptasi modern aksara Thai standar; secara historis aksara Tai Hitam)",hi:"थाई (मानक थाई लिपि का आधुनिक रूपांतर; ऐतिहासिक रूप से ब्लैक ताई लिपि)",de:"Thai (moderne Anpassung der thailändischen Standardschrift; historisch die Schwarz-Tai-Schrift)",fr:"Thaï (adaptation moderne de l'écriture thaïe standard ; historiquement l'écriture tai dam)",it:"Thai (adattamento moderno della scrittura thai standard; storicamente scrittura tai dam)",es:"Tailandesa (adaptación moderna de la escritura tailandesa estándar; históricamente la escritura tai dam)",pt:"Tailandesa (adaptação moderna da escrita tailandesa padrão; historicamente, escrita tai preta)",ru:"Тайское письмо (современная адаптация стандартного тайского письма; исторически — письмо чёрных тай)",uk:"Тайське письмо (сучасна адаптація стандартного тайського письма; історично — письмо чорних тай)",ar:"الكتابة التايلاندية (تكييف حديث للكتابة التايلاندية المعيارية؛ وكتابة التاي السود تاريخيًا)",he:"תאי (התאמה מודרנית של הכתב התאי התקני; היסטורית כתב טאי שחור)",sw:"Kithai (marekebisho ya kisasa ya hati sanifu ya Kithai; kihistoria hati ya Tai Nyeusi)"},
    "No (Amharic is the federal working language; Ethiopia's 1995 Constitution gives all languages equal state recognition)": {ja:"公用語ではない（連邦の実務言語はアムハラ語。1995年エチオピア憲法はすべての言語に平等な国家的承認を与えている）",ko:"공용어 아님(연방 실무 언어는 암하라어. 1995년 에티오피아 헌법은 모든 언어에 동등한 국가적 승인을 부여)",zh:"否（阿姆哈拉语为联邦工作语言；埃塞俄比亚1995年宪法给予所有语言同等的国家承认）",yue:"否（阿姆哈拉語係聯邦工作語言；埃塞俄比亞1995年憲法畀予所有語言同等嘅國家承認）",vi:"Không (tiếng Amhara là ngôn ngữ làm việc liên bang; Hiến pháp Ethiopia 1995 dành cho mọi ngôn ngữ sự thừa nhận ngang nhau của nhà nước)",th:"ไม่ (ภาษาอัมฮาราเป็นภาษาราชการในการทำงานระดับสหพันธ์ ส่วนรัฐธรรมนูญเอธิโอเปีย ปี 1995 ให้การรับรองทุกภาษาโดยรัฐอย่างเท่าเทียมกัน)",id:"Tidak (bahasa Amhara adalah bahasa kerja federal; Konstitusi Etiopia 1995 memberikan pengakuan negara yang setara kepada semua bahasa)",hi:"नहीं (अम्हारिक संघीय कामकाजी भाषा है; इथियोपिया का 1995 का संविधान सभी भाषाओं को समान राजकीय मान्यता देता है)",de:"Nein (Amharisch ist die föderale Arbeitssprache; die äthiopische Verfassung von 1995 gewährt allen Sprachen gleiche staatliche Anerkennung)",fr:"Non (l'amharique est la langue de travail fédérale ; la Constitution éthiopienne de 1995 accorde à toutes les langues une reconnaissance étatique égale)",it:"No (l'amarico è la lingua di lavoro federale; la Costituzione etiope del 1995 accorda a tutte le lingue pari riconoscimento statale)",es:"No (el amárico es la lengua de trabajo federal; la Constitución etíope de 1995 concede a todas las lenguas igual reconocimiento estatal)",pt:"Não (o amárico é a língua de trabalho federal; a Constituição etíope de 1995 concede a todas as línguas igual reconhecimento estatal)",ru:"Нет (амхарский — федеральный рабочий язык; Конституция Эфиопии 1995 года предоставляет всем языкам равное государственное признание)",uk:"Ні (федеральна робоча мова — амхарська; Конституція Ефіопії 1995 року надає всім мовам рівне державне визнання)",ar:"لا (الأمهرية هي لغة العمل الاتحادية؛ ويمنح دستور إثيوبيا لعام 1995 جميع اللغات اعترافًا حكوميًا متساويًا)",he:"לא (אמהרית היא שפת העבודה הפדרלית; חוקת אתיופיה מ-1995 מעניקה לכל השפות הכרה ממלכתית שווה)",sw:"Hapana (Kiamhari ndiyo lugha ya kazi ya shirikisho; Katiba ya Ethiopia ya 1995 inazipa lugha zote utambuzi sawa wa kiserikali)"},
    "Finland, Sweden (Finnish-Swedish minority; Tornedalian Finnish in Norrbotten)": {ja:"フィンランド、スウェーデン（フィンランド系スウェーデン人の少数派。ノルボッテン県のトルネダール・フィンランド語）",ko:"핀란드, 스웨덴(핀란드계 스웨덴 소수집단. 노르보텐주의 토르네달렌 핀란드어)",zh:"芬兰、瑞典（芬兰-瑞典少数族群；北博滕省的托尔讷河谷芬兰语）",yue:"芬蘭、瑞典（芬蘭-瑞典少數族裔；北博滕省嘅托爾訥河谷芬蘭語）",vi:"Phần Lan, Thụy Điển (nhóm thiểu số Phần Lan – Thụy Điển; tiếng Phần Lan Tornedalen ở Norrbotten)",th:"ฟินแลนด์ สวีเดน (ชนกลุ่มน้อยฟินแลนด์-สวีเดน และภาษาฟินแลนด์ตอร์เนดาเลนในนอร์บอตเทน)",id:"Finlandia, Swedia (minoritas Finlandia-Swedia; Finlandia Tornedal di Norrbotten)",hi:"फ़िनलैंड, स्वीडन (फ़िनिश-स्वीडिश अल्पसंख्यक; नॉरबॉटन में टोर्नेडाल फ़िनिश)",de:"Finnland, Schweden (finnlandschwedische Minderheit; Tornedalfinnisch in Norrbotten)",fr:"Finlande, Suède (minorité finno-suédoise ; finnois de la vallée du Torne en Norrbotten)",it:"Finlandia, Svezia (minoranza finno-svedese; finlandese di Tornedalen nel Norrbotten)",es:"Finlandia, Suecia (minoría finlandesa-sueca; finés de Tornedalen en Norrbotten)",pt:"Finlândia, Suécia (minoria finlandesa-sueca; finlandês de Tornedalen em Norrbotten)",ru:"Финляндия, Швеция (финско-шведское меньшинство; торнедальский финский в Норрботтене)",uk:"Фінляндія, Швеція (фінсько-шведська меншина; торнедальська фінська в Норрботтені)",ar:"فنلندا والسويد (الأقلية الفنلندية السويدية؛ والفنلندية التورنيدالية في نوربوتن)",he:"פינלנד, שוודיה (מיעוט פיני-שוודי; פינית טורנדאלית בנורבוטן)",sw:"Ufini, Uswidi (wachache wa Kifini-Kiswidi; Kifini cha Tornedalen huko Norrbotten)"},
    "~509K (self-identified)": {ja:"約509K（自己申告）",ko:"약 509K(자기 신고)",zh:"约509K（自我认同人数）",yue:"約509K（自我認同人數）",vi:"~509K (tự nhận)",th:"~509K คน (ระบุตนเอง)",id:"~509K (menurut identifikasi diri)",hi:"~509K (स्व-घोषित)",de:"~509K (Selbstangabe)",fr:"~509K (auto-déclarés)",it:"~509K (autodichiarati)",es:"~509K (autodeclarados)",pt:"~509K (autodeclarados)",ru:"~509K (по самоидентификации)",uk:"~509K (за самоідентифікацією)",ar:"~509K (حسب التعريف الذاتي)",he:"~509K (על פי הגדרה עצמית)",sw:"~509K (waliojitambulisha wenyewe)"},
    "No (Polish is the sole official language; a 2024 bill recognizing Silesian as a regional language was vetoed)": {ja:"公用語ではない（公用語はポーランド語のみ。シレジア語を地域言語として認める2024年の法案は拒否権により否決）",ko:"공용어 아님(유일한 공용어는 폴란드어. 실레시아어를 지역 언어로 인정하는 2024년 법안은 거부권 행사로 무산)",zh:"否（波兰语是唯一的官方语言；2024年承认西里西亚语为地区语言的法案遭否决）",yue:"否（波蘭語係唯一嘅官方語言；2024年承認西里西亞語為地區語言嘅法案遭否決）",vi:"Không (tiếng Ba Lan là ngôn ngữ chính thức duy nhất; dự luật năm 2024 công nhận tiếng Silesia là ngôn ngữ vùng đã bị phủ quyết)",th:"ไม่ (ภาษาโปแลนด์เป็นภาษาราชการเพียงภาษาเดียว ร่างกฎหมายปี 2024 ที่รับรองภาษาไซลีเซียเป็นภาษาประจำภูมิภาคถูกวีโต)",id:"Tidak (bahasa Polandia adalah satu-satunya bahasa resmi; RUU 2024 yang mengakui bahasa Silesia sebagai bahasa daerah diveto)",hi:"नहीं (पोलिश एकमात्र आधिकारिक भाषा है; सिलेसियन को क्षेत्रीय भाषा की मान्यता देने वाले 2024 के विधेयक पर वीटो लगा दिया गया)",de:"Nein (Polnisch ist die einzige Amtssprache; ein Gesetzentwurf von 2024 zur Anerkennung des Schlesischen als Regionalsprache wurde per Veto gestoppt)",fr:"Non (le polonais est la seule langue officielle ; un projet de loi de 2024 reconnaissant le silésien comme langue régionale a fait l'objet d'un veto)",it:"No (il polacco è l'unica lingua ufficiale; una proposta di legge del 2024 che riconosceva lo slesiano come lingua regionale è stata respinta con veto)",es:"No (el polaco es la única lengua oficial; un proyecto de ley de 2024 que reconocía el silesio como lengua regional fue vetado)",pt:"Não (o polonês é a única língua oficial; um projeto de lei de 2024 que reconhecia o silesiano como língua regional foi vetado)",ru:"Нет (польский — единственный официальный язык; законопроект 2024 года о признании силезского региональным языком был отклонён вето)",uk:"Ні (єдина офіційна мова — польська; законопроєкт 2024 року про визнання сілезької регіональною мовою було ветовано)",ar:"لا (البولندية هي اللغة الرسمية الوحيدة؛ ومشروع قانون عام 2024 للاعتراف بالسيليزية لغةً إقليمية جرى نقضه)",he:"לא (פולנית היא השפה הרשמית היחידה; על הצעת חוק מ-2024 להכרה בשלזית כשפה אזורית הוטל וטו)",sw:"Hapana (Kipolandi ndiyo lugha pekee rasmi; mswada wa 2024 wa kutambua Kisilesia kama lugha ya kanda ulipigwa kura ya turufu)"},
    "No (Turkish is the sole official language; Laz has no official status)": {ja:"公用語ではない（公用語はトルコ語のみ。ラズ語に公的地位はない）",ko:"공용어 아님(유일한 공용어는 튀르키예어. 라즈어에는 공적 지위가 없음)",zh:"否（土耳其语是唯一的官方语言；拉兹语无官方地位）",yue:"否（土耳其語係唯一嘅官方語言；拉茲語冇官方地位）",vi:"Không (tiếng Thổ Nhĩ Kỳ là ngôn ngữ chính thức duy nhất; tiếng Laz không có quy chế chính thức)",th:"ไม่ (ภาษาตุรกีเป็นภาษาราชการเพียงภาษาเดียว ภาษาลาซไม่มีสถานะทางการ)",id:"Tidak (bahasa Turki adalah satu-satunya bahasa resmi; Laz tidak berstatus resmi)",hi:"नहीं (तुर्की एकमात्र आधिकारिक भाषा है; लाज़ का कोई आधिकारिक दर्जा नहीं)",de:"Nein (Türkisch ist die einzige Amtssprache; Lasisch hat keinen amtlichen Status)",fr:"Non (le turc est la seule langue officielle ; le laze n'a aucun statut officiel)",it:"No (il turco è l'unica lingua ufficiale; il laz non ha alcuno status ufficiale)",es:"No (el turco es la única lengua oficial; el laz no tiene ningún estatus oficial)",pt:"Não (o turco é a única língua oficial; o laz não tem estatuto oficial)",ru:"Нет (турецкий — единственный официальный язык; лазский не имеет официального статуса)",uk:"Ні (єдина офіційна мова — турецька; лазька не має офіційного статусу)",ar:"لا (التركية هي اللغة الرسمية الوحيدة؛ واللازية بلا وضع رسمي)",he:"לא (טורקית היא השפה הרשמית היחידה; ללאזית אין מעמד רשמי)",sw:"Hapana (Kituruki ndiyo lugha pekee rasmi; Kilazi hakina hadhi rasmi)"},
    "No (Hindi and English are the Union official languages; Ladakhi has no scheduled status)": {ja:"公用語ではない（連邦の公用語はヒンディー語と英語。ラダック語は指定言語ではない）",ko:"공용어 아님(연방 공용어는 힌디어와 영어. 라다크어는 지정 언어 지위가 없음)",zh:"否（印地语与英语为联邦官方语言；拉达克语未列入宪法附表）",yue:"否（印地語同英語係聯邦官方語言；拉達克語未列入憲法附表）",vi:"Không (tiếng Hindi và tiếng Anh là ngôn ngữ chính thức của Liên bang; tiếng Ladakh không có quy chế ngôn ngữ trong danh mục Phụ lục)",th:"ไม่ (ภาษาฮินดีและภาษาอังกฤษเป็นภาษาราชการของสหภาพอินเดีย ภาษาลาดักไม่มีสถานะเป็นภาษาในบัญชีแนบท้ายรัฐธรรมนูญ)",id:"Tidak (bahasa Hindi dan Inggris adalah bahasa resmi Uni India; Ladakhi tidak berstatus bahasa terjadwal)",hi:"नहीं (हिन्दी और अंग्रेज़ी संघ की राजभाषाएँ हैं; लद्दाखी को अनुसूचित भाषा का दर्जा प्राप्त नहीं)",de:"Nein (Hindi und Englisch sind die Amtssprachen der Union; Ladakhi hat keinen Status als gelistete Sprache)",fr:"Non (le hindi et l'anglais sont les langues officielles de l'Union ; le ladakhi n'a pas le statut de langue répertoriée)",it:"No (l'hindi e l'inglese sono le lingue ufficiali dell'Unione; il ladakhi non ha lo status di lingua dell'Ottavo Elenco)",es:"No (el hindi y el inglés son las lenguas oficiales de la Unión; el ladakhi no tiene estatus de lengua del Octavo Anexo)",pt:"Não (o hindi e o inglês são as línguas oficiais da União; o ladakhi não consta do Oitavo Anexo da Constituição)",ru:"Нет (хинди и английский — официальные языки Союза; ладакхи не включён в Восьмое приложение Конституции)",uk:"Ні (офіційні мови Союзу — гінді та англійська; ладакська не має статусу мови з переліку Конституції)",ar:"لا (الهندية والإنجليزية هما اللغتان الرسميتان للاتحاد؛ واللاداخية ليست من اللغات المجدولة)",he:"לא (הינדי ואנגלית הן השפות הרשמיות של האיחוד; ללדאקית אין מעמד של שפה בתוספת השמינית)",sw:"Hapana (Kihindi na Kiingereza ndizo lugha rasmi za Muungano; Kiladakhi hakina hadhi ya lugha iliyoorodheshwa katika Ratiba ya Nane)"},
    "No (Standard Tibetan is the official literary language; Khams is regional)": {ja:"公用語ではない（公式の文語は標準チベット語。カム方言は地域的なもの）",ko:"공용어 아님(공식 문어는 표준 티베트어. 캄 방언은 지역어)",zh:"否（标准藏语为官方书面语；康方言属地区变体）",yue:"否（標準藏語係官方書面語；康方言屬地區變體）",vi:"Không (tiếng Tạng chuẩn là ngôn ngữ văn học chính thức; tiếng Khams mang tính vùng miền)",th:"ไม่ (ภาษาทิเบตมาตรฐานเป็นภาษาเขียนทางการ ส่วนภาษาคามเป็นภาษาประจำภูมิภาค)",id:"Tidak (bahasa Tibet Standar adalah bahasa sastra resmi; Khams bersifat regional)",hi:"नहीं (मानक तिब्बती आधिकारिक साहित्यिक भाषा है; खाम क्षेत्रीय है)",de:"Nein (Standardtibetisch ist die amtliche Literatursprache; Khams ist regional)",fr:"Non (le tibétain standard est la langue littéraire officielle ; le khams est régional)",it:"No (il tibetano standard è la lingua letteraria ufficiale; il khams è regionale)",es:"No (el tibetano estándar es la lengua literaria oficial; el khams es regional)",pt:"Não (o tibetano padrão é a língua literária oficial; o khams é regional)",ru:"Нет (стандартный тибетский — официальный литературный язык; кхамский — региональный)",uk:"Ні (офіційна літературна мова — стандартна тибетська; кхамська є регіональною)",ar:"لا (التبتية المعيارية هي اللغة الأدبية الرسمية؛ والخامية إقليمية)",he:"לא (טיבטית תקנית היא השפה הספרותית הרשמית; חאם היא אזורית)",sw:"Hapana (Kitibeti Sanifu ndiyo lugha rasmi ya kifasihi; Kikhams ni cha kanda)"},
    "~57K (~52K Mao County + ~5K dispersed)": {ja:"約57K（茂県に約52K＋各地に分散して約5K）",ko:"약 57K(마오현 약 52K + 각지에 분산 약 5K)",zh:"约57K（茂县约52K，散居约5K）",yue:"約57K（茂縣約52K，散居約5K）",vi:"~57K (~52K ở huyện Mao + ~5K phân tán)",th:"~57K คน (~52K ในอำเภอเหมา + ~5K กระจัดกระจาย)",id:"~57K (~52K Kabupaten Mao + ~5K tersebar)",hi:"~57K (~52K माओ काउंटी + ~5K बिखरे हुए)",de:"~57K (~52K Kreis Mao + ~5K verstreut)",fr:"~57K (~52K dans le xian de Mao + ~5K dispersés)",it:"~57K (~52K nella contea di Mao + ~5K dispersi)",es:"~57K (~52K en el condado de Mao + ~5K dispersos)",pt:"~57K (~52K no Condado de Mao + ~5K dispersos)",ru:"~57K (~52K уезд Мао + ~5K рассеянно)",uk:"~57K (~52K повіт Мао + ~5K розпорошено)",ar:"~57K (~52K في مقاطعة ماو + ~5K متفرقون)",he:"~57K (~52K במחוז מאו + ~5K מפוזרים)",sw:"~57K (~52K Kaunti ya Mao + ~5K waliotawanyika)"},
    "No (Standard Chinese is the national language; minority languages are protected under Article 4 of the Constitution)": {ja:"公用語ではない（国家共通語は標準中国語。少数民族言語は憲法第4条により保護）",ko:"공용어 아님(국가 공통어는 표준 중국어. 소수민족 언어는 헌법 제4조에 따라 보호)",zh:"否（国家通用语言为普通话；少数民族语言受宪法第四条保护）",yue:"否（國家通用語言係普通話；少數民族語言受憲法第四條保護）",vi:"Không (tiếng Trung chuẩn là ngôn ngữ quốc gia; các ngôn ngữ thiểu số được bảo hộ theo Điều 4 Hiến pháp)",th:"ไม่ (ภาษาจีนมาตรฐานเป็นภาษาประจำชาติ ภาษาชนกลุ่มน้อยได้รับความคุ้มครองตามมาตรา 4 ของรัฐธรรมนูญ)",id:"Tidak (bahasa Tionghoa Standar adalah bahasa nasional; bahasa minoritas dilindungi berdasarkan Pasal 4 Konstitusi)",hi:"नहीं (मानक चीनी राष्ट्रीय भाषा है; अल्पसंख्यक भाषाएँ संविधान के अनुच्छेद 4 के तहत संरक्षित हैं)",de:"Nein (Standardchinesisch ist die Nationalsprache; Minderheitensprachen sind nach Artikel 4 der Verfassung geschützt)",fr:"Non (le chinois standard est la langue nationale ; les langues minoritaires sont protégées par l'article 4 de la Constitution)",it:"No (il cinese standard è la lingua nazionale; le lingue minoritarie sono tutelate dall'articolo 4 della Costituzione)",es:"No (el chino estándar es la lengua nacional; las lenguas minoritarias están protegidas por el artículo 4 de la Constitución)",pt:"Não (o chinês padrão é a língua nacional; as línguas minoritárias são protegidas pelo Artigo 4.º da Constituição)",ru:"Нет (стандартный китайский — национальный язык; языки меньшинств защищены статьёй 4 Конституции)",uk:"Ні (національна мова — стандартна китайська; мови меншин захищені статтею 4 Конституції)",ar:"لا (الصينية المعيارية هي اللغة الوطنية؛ ولغات الأقليات محمية بموجب المادة 4 من الدستور)",he:"לא (סינית תקנית היא השפה הלאומית; שפות מיעוטים מוגנות לפי סעיף 4 לחוקה)",sw:"Hapana (Kichina Sanifu ndiyo lugha ya taifa; lugha za wachache zinalindwa chini ya Kifungu cha 4 cha Katiba)"},
    "~7K (on Rotuma) + ~10K diaspora (mainland Fiji)": {ja:"約7K（ロツマ島）＋ディアスポラ約10K（フィジー本島）",ko:"약 7K(로투마섬) + 디아스포라 약 10K(피지 본섬)",zh:"约7K（罗图马岛）＋约10K侨居者（斐济本岛）",yue:"約7K（羅圖馬島）＋約10K僑居者（斐濟本島）",vi:"~7K (trên đảo Rotuma) + ~10K hải ngoại (trên đất liền Fiji)",th:"~7K คน (บนเกาะโรตูมา) + ~10K คนพลัดถิ่น (ในฟิจิแผ่นดินใหญ่)",id:"~7K (di Rotuma) + ~10K diaspora (Fiji daratan)",hi:"~7K (रोटुमा में) + ~10K प्रवासी (मुख्य भूमि फ़िजी)",de:"~7K (auf Rotuma) + ~10K Diaspora (Hauptinseln Fidschis)",fr:"~7K (à Rotuma) + ~10K dans la diaspora (Fidji continentales)",it:"~7K (a Rotuma) + ~10K nella diaspora (Figi continentale)",es:"~7K (en Rotuma) + ~10K en la diáspora (Fiyi continental)",pt:"~7K (em Rotuma) + ~10K na diáspora (Fiji continental)",ru:"~7K (на Ротуме) + ~10K диаспоры (основные острова Фиджи)",uk:"~7K (на Ротумі) + ~10K діаспори (основна територія Фіджі)",ar:"~7K (في روتوما) + ~10K في الشتات (فيجي القارية)",he:"~7K (ברוטומה) + ~10K בתפוצות (פיג׳י היבשתית)",sw:"~7K (Rotuma) + ~10K ughaibuni (Fiji bara)"},
    "No (Urdu and English are the official languages of Pakistan)": {ja:"公用語ではない（パキスタンの公用語はウルドゥー語と英語）",ko:"공용어 아님(파키스탄의 공용어는 우르두어와 영어)",zh:"否（乌尔都语与英语是巴基斯坦的官方语言）",yue:"否（烏爾都語同英語係巴基斯坦嘅官方語言）",vi:"Không (tiếng Urdu và tiếng Anh là ngôn ngữ chính thức của Pakistan)",th:"ไม่ (ภาษาอูรดูและภาษาอังกฤษเป็นภาษาราชการของปากีสถาน)",id:"Tidak (bahasa Urdu dan Inggris adalah bahasa resmi Pakistan)",hi:"नहीं (उर्दू और अंग्रेज़ी पाकिस्तान की आधिकारिक भाषाएँ हैं)",de:"Nein (Urdu und Englisch sind die Amtssprachen Pakistans)",fr:"Non (l'ourdou et l'anglais sont les langues officielles du Pakistan)",it:"No (l'urdu e l'inglese sono le lingue ufficiali del Pakistan)",es:"No (el urdu y el inglés son las lenguas oficiales de Pakistán)",pt:"Não (o urdu e o inglês são as línguas oficiais do Paquistão)",ru:"Нет (урду и английский — официальные языки Пакистана)",uk:"Ні (офіційні мови Пакистану — урду та англійська)",ar:"لا (الأردية والإنجليزية هما اللغتان الرسميتان في باكستان)",he:"לא (אורדו ואנגלית הן השפות הרשמיות של פקיסטן)",sw:"Hapana (Kiurdu na Kiingereza ndizo lugha rasmi za Pakistani)"},
    "No (Hindi is the sole official language of Himachal Pradesh)": {ja:"公用語ではない（ヒマーチャル・プラデーシュ州の公用語はヒンディー語のみ）",ko:"공용어 아님(히마찰프라데시주의 유일한 공용어는 힌디어)",zh:"否（印地语是喜马偕尔邦唯一的官方语言）",yue:"否（印地語係喜馬偕爾邦唯一嘅官方語言）",vi:"Không (tiếng Hindi là ngôn ngữ chính thức duy nhất của bang Himachal Pradesh)",th:"ไม่ (ภาษาฮินดีเป็นภาษาราชการเพียงภาษาเดียวของรัฐหิมาจัลประเทศ)",id:"Tidak (bahasa Hindi adalah satu-satunya bahasa resmi Himachal Pradesh)",hi:"नहीं (हिन्दी हिमाचल प्रदेश की एकमात्र राजभाषा है)",de:"Nein (Hindi ist die einzige Amtssprache von Himachal Pradesh)",fr:"Non (le hindi est la seule langue officielle de l'Himachal Pradesh)",it:"No (l'hindi è l'unica lingua ufficiale dell'Himachal Pradesh)",es:"No (el hindi es la única lengua oficial de Himachal Pradesh)",pt:"Não (o hindi é a única língua oficial de Himachal Pradesh)",ru:"Нет (хинди — единственный официальный язык штата Химачал-Прадеш)",uk:"Ні (єдина офіційна мова Хімачал-Прадешу — гінді)",ar:"لا (الهندية هي اللغة الرسمية الوحيدة في هيماتشال براديش)",he:"לא (הינדי היא השפה הרשמית היחידה של הימאצ׳ל פראדש)",sw:"Hapana (Kihindi ndiyo lugha pekee rasmi ya Himachal Pradesh)"},
    "No (not a scheduled language of India)": {ja:"公用語ではない（インドの指定言語ではない）",ko:"공용어 아님(인도의 지정 언어가 아님)",zh:"否（非印度宪法附表语言）",yue:"否（並非印度憲法附表語言）",vi:"Không (không thuộc danh mục ngôn ngữ được liệt kê trong Hiến pháp Ấn Độ)",th:"ไม่ (ไม่ใช่ภาษาในบัญชีแนบท้ายรัฐธรรมนูญอินเดีย)",id:"Tidak (bukan bahasa terjadwal India)",hi:"नहीं (भारत की अनुसूचित भाषा नहीं)",de:"Nein (keine gelistete Sprache Indiens)",fr:"Non (ne figure pas parmi les langues répertoriées de l'Inde)",it:"No (non è una lingua dell'Ottavo Elenco dell'India)",es:"No (no es una lengua del Octavo Anexo de la India)",pt:"Não (não é uma língua do Oitavo Anexo da Constituição da Índia)",ru:"Нет (не входит в Восьмое приложение Конституции Индии)",uk:"Ні (не належить до мов з переліку Конституції Індії)",ar:"لا (ليست من اللغات المجدولة في الهند)",he:"לא (אינה שפה שבתוספת השמינית של הודו)",sw:"Hapana (si lugha iliyoorodheshwa katika Ratiba ya Nane ya India)"},
    "No (Iran does not recognize regional Kurdish standards beyond Sorani)": {ja:"公用語ではない（イランはソラニー語以外の地域クルド語標準を認めていない）",ko:"공용어 아님(이란은 소라니어 외의 지역 쿠르드어 표준을 인정하지 않음)",zh:"否（伊朗除索拉尼语外不承认其他库尔德语地区标准语）",yue:"否（伊朗除索拉尼語之外唔承認其他庫爾德語地區標準語）",vi:"Không (Iran không công nhận các chuẩn tiếng Kurd vùng miền ngoài Sorani)",th:"ไม่ (อิหร่านไม่รับรองภาษาเคิร์ดมาตรฐานประจำภูมิภาคอื่นนอกจากโซรานี)",id:"Tidak (Iran tidak mengakui standar Kurdi regional selain Sorani)",hi:"नहीं (ईरान सोरानी के अलावा किसी क्षेत्रीय कुर्दी मानक को मान्यता नहीं देता)",de:"Nein (Iran erkennt außer Sorani keine regionalen kurdischen Standardvarietäten an)",fr:"Non (l'Iran ne reconnaît aucun standard kurde régional en dehors du sorani)",it:"No (l'Iran non riconosce standard curdi regionali oltre al sorani)",es:"No (Irán no reconoce estándares kurdos regionales más allá del sorani)",pt:"Não (o Irã não reconhece padrões curdos regionais além do sorani)",ru:"Нет (Иран не признаёт региональные курдские стандарты, кроме сорани)",uk:"Ні (Іран не визнає регіональних курдських стандартів, окрім сорані)",ar:"لا (لا تعترف إيران بمعايير كردية إقليمية غير السورانية)",he:"לא (איראן אינה מכירה בתקנים כורדיים אזוריים מעבר לסוראני)",sw:"Hapana (Iran haitambui viwango vya kanda vya Kikurdi zaidi ya Kisorani)"},
    "No (Standard Chinese is the national language; Xibe is used in education in the Qapqal Xibe Autonomous County)": {ja:"公用語ではない（国家共通語は標準中国語。シベ語はチャプチャル・シベ自治県の教育で使用）",ko:"공용어 아님(국가 공통어는 표준 중국어. 시버어는 차부차얼 시버 자치현의 교육에서 사용)",zh:"否（国家通用语言为普通话；锡伯语用于察布查尔锡伯自治县的教育）",yue:"否（國家通用語言係普通話；錫伯語用於察布查爾錫伯自治縣嘅教育）",vi:"Không (tiếng Trung chuẩn là ngôn ngữ quốc gia; tiếng Xibe được dùng trong giáo dục tại huyện tự trị dân tộc Xibe Qapqal)",th:"ไม่ (ภาษาจีนมาตรฐานเป็นภาษาประจำชาติ ส่วนภาษาซีเบใช้ในการศึกษาในเขตปกครองตนเองชนชาติซีเบ Qapqal)",id:"Tidak (bahasa Tionghoa Standar adalah bahasa nasional; Xibe digunakan dalam pendidikan di Kabupaten Otonom Xibe Qapqal)",hi:"नहीं (मानक चीनी राष्ट्रीय भाषा है; शिबे का प्रयोग चापचाल शिबे स्वायत्त काउंटी में शिक्षा में होता है)",de:"Nein (Standardchinesisch ist die Nationalsprache; Xibe wird im Bildungswesen des Autonomen Kreises Qapqal der Xibe verwendet)",fr:"Non (le chinois standard est la langue nationale ; le xibe est employé dans l'enseignement du xian autonome xibe de Qapqal)",it:"No (il cinese standard è la lingua nazionale; il xibe è usato nell'istruzione nella contea autonoma xibe di Qapqal)",es:"No (el chino estándar es la lengua nacional; el xibe se usa en la enseñanza en el condado autónomo xibe de Qapqal)",pt:"Não (o chinês padrão é a língua nacional; o xibe é usado no ensino no Condado Autônomo Xibe de Qapqal)",ru:"Нет (стандартный китайский — национальный язык; сибо используется в образовании в Чапчал-Сибоском автономном уезде)",uk:"Ні (національна мова — стандартна китайська; сибінська вживається в освіті в Чапчал-Сибінському автономному повіті)",ar:"لا (الصينية المعيارية هي اللغة الوطنية؛ وتُستخدم السيبية في التعليم في محافظة تشابتشال السيبية ذاتية الحكم)",he:"לא (סינית תקנית היא השפה הלאומית; שיבה משמשת בחינוך במחוז האוטונומי צ׳אפצ׳אל שיבה)",sw:"Hapana (Kichina Sanifu ndiyo lugha ya taifa; Kixibe hutumika katika elimu katika Kaunti Huru ya Qapqal Xibe)"},
    "No (English is the official language of Nigeria)": {ja:"公用語ではない（ナイジェリアの公用語は英語）",ko:"공용어 아님(나이지리아의 공용어는 영어)",zh:"否（英语是尼日利亚的官方语言）",yue:"否（英語係尼日利亞嘅官方語言）",vi:"Không (tiếng Anh là ngôn ngữ chính thức của Nigeria)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการของไนจีเรีย)",id:"Tidak (bahasa Inggris adalah bahasa resmi Nigeria)",hi:"नहीं (अंग्रेज़ी नाइजीरिया की आधिकारिक भाषा है)",de:"Nein (Englisch ist die Amtssprache Nigerias)",fr:"Non (l'anglais est la langue officielle du Nigeria)",it:"No (l'inglese è la lingua ufficiale della Nigeria)",es:"No (el inglés es la lengua oficial de Nigeria)",pt:"Não (o inglês é a língua oficial da Nigéria)",ru:"Нет (английский — официальный язык Нигерии)",uk:"Ні (офіційна мова Нігерії — англійська)",ar:"لا (الإنجليزية هي اللغة الرسمية في نيجيريا)",he:"לא (אנגלית היא השפה הרשמית של ניגריה)",sw:"Hapana (Kiingereza ndiyo lugha rasmi ya Nigeria)"},
    "~2M (Cross River + Akwa Ibom Nigeria)": {ja:"約2M（ナイジェリアのクロスリバー州＋アクワイボム州）",ko:"약 2M(나이지리아 크로스리버주 + 아크와이봄주)",zh:"约2M（尼日利亚克罗斯河州与阿夸伊博姆州）",yue:"約2M（尼日利亞克羅斯河州同阿夸伊博姆州）",vi:"~2M (bang Cross River + Akwa Ibom, Nigeria)",th:"~2M คน (รัฐครอสริเวอร์ + อักวาอิบอม ไนจีเรีย)",id:"~2M (Cross River + Akwa Ibom, Nigeria)",hi:"~2M (क्रॉस रिवर + अक्वा इबोम, नाइजीरिया)",de:"~2M (Cross River + Akwa Ibom, Nigeria)",fr:"~2M (Cross River + Akwa Ibom, Nigeria)",it:"~2M (Cross River + Akwa Ibom, Nigeria)",es:"~2M (Cross River + Akwa Ibom, Nigeria)",pt:"~2M (Cross River + Akwa Ibom, Nigéria)",ru:"~2M (штаты Кросс-Ривер и Аква-Ибом, Нигерия)",uk:"~2M (штати Кросс-Ривер + Аква-Ібом, Нігерія)",ar:"~2M (ولايتا كروس ريفر وأكوا إيبوم في نيجيريا)",he:"~2M (קרוס ריבר + אקווה איבום, ניגריה)",sw:"~2M (Cross River + Akwa Ibom, Nigeria)"},
    "No (English is the sole official language; Ekpeye is a recognized community indigenous language)": {ja:"公用語ではない（公用語は英語のみ。エクペイェ語は地域共同体の先住民言語として認定）",ko:"공용어 아님(유일한 공용어는 영어. 에크페예어는 인정된 공동체 토착어)",zh:"否（英语是唯一的官方语言；Ekpeye 为受承认的社区原住民语言）",yue:"否（英語係唯一嘅官方語言；Ekpeye 係獲承認嘅社區原住民語言）",vi:"Không (tiếng Anh là ngôn ngữ chính thức duy nhất; tiếng Ekpeye là ngôn ngữ bản địa cộng đồng được công nhận)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาเอกเปเยเป็นภาษาชนพื้นเมืองประจำชุมชนที่ได้รับการรับรอง)",id:"Tidak (bahasa Inggris adalah satu-satunya bahasa resmi; Ekpeye adalah bahasa pribumi komunitas yang diakui)",hi:"नहीं (अंग्रेज़ी एकमात्र आधिकारिक भाषा है; एकपेये एक मान्यता प्राप्त सामुदायिक देशज भाषा है)",de:"Nein (Englisch ist die einzige Amtssprache; Ekpeye ist eine anerkannte indigene Gemeinschaftssprache)",fr:"Non (l'anglais est la seule langue officielle ; l'ekpeye est une langue autochtone communautaire reconnue)",it:"No (l'inglese è l'unica lingua ufficiale; l'ekpeye è una lingua indigena comunitaria riconosciuta)",es:"No (el inglés es la única lengua oficial; el ekpeye es una lengua indígena comunitaria reconocida)",pt:"Não (o inglês é a única língua oficial; o ekpeye é uma língua indígena comunitária reconhecida)",ru:"Нет (английский — единственный официальный язык; экпейе — признанный коренной язык общины)",uk:"Ні (єдина офіційна мова — англійська; екпеє є визнаною корінною мовою громади)",ar:"لا (الإنجليزية هي اللغة الرسمية الوحيدة؛ والإكبيي لغة أصلية مجتمعية معترف بها)",he:"לא (אנגלית היא השפה הרשמית היחידה; אקפייה היא שפת ילידים קהילתית מוכרת)",sw:"Hapana (Kiingereza ndiyo lugha pekee rasmi; Kiekpeye ni lugha ya asili ya jamii inayotambuliwa)"},
    "No (English is the sole official language; Izii is a recognized community Igboid language)": {ja:"公用語ではない（公用語は英語のみ。イジ語は地域共同体のイボイド系言語として認定）",ko:"공용어 아님(유일한 공용어는 영어. 이지어는 인정된 공동체 이보이드계 언어)",zh:"否（英语是唯一的官方语言；Izii 为受承认的社区伊博语群语言）",yue:"否（英語係唯一嘅官方語言；Izii 係獲承認嘅社區伊博語群語言）",vi:"Không (tiếng Anh là ngôn ngữ chính thức duy nhất; tiếng Izii là ngôn ngữ nhóm Igbo của cộng đồng được công nhận)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาอีซีเป็นภาษากลุ่มอิกโบประจำชุมชนที่ได้รับการรับรอง)",id:"Tidak (bahasa Inggris adalah satu-satunya bahasa resmi; Izii adalah bahasa Igboid komunitas yang diakui)",hi:"नहीं (अंग्रेज़ी एकमात्र आधिकारिक भाषा है; इज़ी एक मान्यता प्राप्त सामुदायिक इग्बोइड भाषा है)",de:"Nein (Englisch ist die einzige Amtssprache; Izii ist eine anerkannte igboide Gemeinschaftssprache)",fr:"Non (l'anglais est la seule langue officielle ; l'izii est une langue igboïde communautaire reconnue)",it:"No (l'inglese è l'unica lingua ufficiale; l'izii è una lingua igboide comunitaria riconosciuta)",es:"No (el inglés es la única lengua oficial; el izii es una lengua igboide comunitaria reconocida)",pt:"Não (o inglês é a única língua oficial; o izii é uma língua igboide comunitária reconhecida)",ru:"Нет (английский — единственный официальный язык; изии — признанный игбоидный язык общины)",uk:"Ні (єдина офіційна мова — англійська; ізії є визнаною ігбоїдною мовою громади)",ar:"لا (الإنجليزية هي اللغة الرسمية الوحيدة؛ والإيزي لغة إغبوية مجتمعية معترف بها)",he:"לא (אנגלית היא השפה הרשמית היחידה; איזי היא שפה איגבואידית קהילתית מוכרת)",sw:"Hapana (Kiingereza ndiyo lugha pekee rasmi; Kiizii ni lugha ya jamii ya kundi la Kiigbo inayotambuliwa)"},
    "Nigeria (Degema LGA — Degema and Usokun-Degema towns, Rivers State)": {ja:"ナイジェリア（リバーズ州デゲマ地方行政区 ― デゲマおよびウソクン・デゲマの町）",ko:"나이지리아(리버스주 데게마 지방정부구역 — 데게마·우소쿤데게마 마을)",zh:"尼日利亚（河流州 Degema 地方政府区——Degema 与 Usokun-Degema 两镇）",yue:"尼日利亞（河流州 Degema 地方政府區——Degema 同 Usokun-Degema 兩鎮）",vi:"Nigeria (khu vực chính quyền địa phương Degema — thị trấn Degema và Usokun-Degema, bang Rivers)",th:"ไนจีเรีย (เขตปกครองท้องถิ่นเดเกมา — เมืองเดเกมาและอูโซคุน-เดเกมา รัฐริเวอส์)",id:"Nigeria (LGA Degema — kota Degema dan Usokun-Degema, Negara Bagian Rivers)",hi:"नाइजीरिया (डेगेमा एलजीए — डेगेमा और उसोकुन-डेगेमा कस्बे, रिवर्स राज्य)",de:"Nigeria (LGA Degema — Städte Degema und Usokun-Degema, Bundesstaat Rivers)",fr:"Nigeria (LGA de Degema — villes de Degema et d'Usokun-Degema, État de Rivers)",it:"Nigeria (LGA di Degema — città di Degema e Usokun-Degema, stato di Rivers)",es:"Nigeria (LGA de Degema — localidades de Degema y Usokun-Degema, estado de Rivers)",pt:"Nigéria (LGA de Degema — cidades de Degema e Usokun-Degema, Estado de Rivers)",ru:"Нигерия (район Дегема — города Дегема и Усокун-Дегема, штат Риверс)",uk:"Нігерія (район місцевого самоврядування Дегема — міста Дегема й Усокун-Дегема, штат Риверс)",ar:"نيجيريا (منطقة الحكم المحلي ديغيما — بلدتا ديغيما وأوسوكون-ديغيما، ولاية ريفرز)",he:"ניגריה (מועצה מקומית דגמה — העיירות דגמה ואוסוקון-דגמה, מדינת ריברס)",sw:"Nigeria (Halmashauri ya Degema — miji ya Degema na Usokun-Degema, Jimbo la Rivers)"},
    "No (English is the sole official language; Degema is a recognized community indigenous language)": {ja:"公用語ではない（公用語は英語のみ。デゲマ語は地域共同体の先住民言語として認定）",ko:"공용어 아님(유일한 공용어는 영어. 데게마어는 인정된 공동체 토착어)",zh:"否（英语是唯一的官方语言；Degema 为受承认的社区原住民语言）",yue:"否（英語係唯一嘅官方語言；Degema 係獲承認嘅社區原住民語言）",vi:"Không (tiếng Anh là ngôn ngữ chính thức duy nhất; tiếng Degema là ngôn ngữ bản địa cộng đồng được công nhận)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาเดเกมาเป็นภาษาชนพื้นเมืองประจำชุมชนที่ได้รับการรับรอง)",id:"Tidak (bahasa Inggris adalah satu-satunya bahasa resmi; Degema adalah bahasa pribumi komunitas yang diakui)",hi:"नहीं (अंग्रेज़ी एकमात्र आधिकारिक भाषा है; डेगेमा एक मान्यता प्राप्त सामुदायिक देशज भाषा है)",de:"Nein (Englisch ist die einzige Amtssprache; Degema ist eine anerkannte indigene Gemeinschaftssprache)",fr:"Non (l'anglais est la seule langue officielle ; le degema est une langue autochtone communautaire reconnue)",it:"No (l'inglese è l'unica lingua ufficiale; il degema è una lingua indigena comunitaria riconosciuta)",es:"No (el inglés es la única lengua oficial; el degema es una lengua indígena comunitaria reconocida)",pt:"Não (o inglês é a única língua oficial; o degema é uma língua indígena comunitária reconhecida)",ru:"Нет (английский — единственный официальный язык; дегема — признанный коренной язык общины)",uk:"Ні (єдина офіційна мова — англійська; дегема є визнаною корінною мовою громади)",ar:"لا (الإنجليزية هي اللغة الرسمية الوحيدة؛ والديغيما لغة أصلية مجتمعية معترف بها)",he:"לא (אנגלית היא השפה הרשמית היחידה; דגמה היא שפת ילידים קהילתית מוכרת)",sw:"Hapana (Kiingereza ndiyo lugha pekee rasmi; Kidegema ni lugha ya asili ya jamii inayotambuliwa)"},
    "No (English is the sole official language; Yekhee is a recognized community indigenous language)": {ja:"公用語ではない（公用語は英語のみ。イェキー語は地域共同体の先住民言語として認定）",ko:"공용어 아님(유일한 공용어는 영어. 예키어는 인정된 공동체 토착어)",zh:"否（英语是唯一的官方语言；Yekhee 为受承认的社区原住民语言）",yue:"否（英語係唯一嘅官方語言；Yekhee 係獲承認嘅社區原住民語言）",vi:"Không (tiếng Anh là ngôn ngữ chính thức duy nhất; tiếng Yekhee là ngôn ngữ bản địa cộng đồng được công nhận)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาเยคีเป็นภาษาชนพื้นเมืองประจำชุมชนที่ได้รับการรับรอง)",id:"Tidak (bahasa Inggris adalah satu-satunya bahasa resmi; Yekhee adalah bahasa pribumi komunitas yang diakui)",hi:"नहीं (अंग्रेज़ी एकमात्र आधिकारिक भाषा है; येखी एक मान्यता प्राप्त सामुदायिक देशज भाषा है)",de:"Nein (Englisch ist die einzige Amtssprache; Yekhee ist eine anerkannte indigene Gemeinschaftssprache)",fr:"Non (l'anglais est la seule langue officielle ; le yekhee est une langue autochtone communautaire reconnue)",it:"No (l'inglese è l'unica lingua ufficiale; lo yekhee è una lingua indigena comunitaria riconosciuta)",es:"No (el inglés es la única lengua oficial; el yekhee es una lengua indígena comunitaria reconocida)",pt:"Não (o inglês é a única língua oficial; o yekhee é uma língua indígena comunitária reconhecida)",ru:"Нет (английский — единственный официальный язык; йекхе — признанный коренной язык общины)",uk:"Ні (єдина офіційна мова — англійська; єкхе є визнаною корінною мовою громади)",ar:"لا (الإنجليزية هي اللغة الرسمية الوحيدة؛ واليخي لغة أصلية مجتمعية معترف بها)",he:"לא (אנגלית היא השפה הרשמית היחידה; יקהי היא שפת ילידים קהילתית מוכרת)",sw:"Hapana (Kiingereza ndiyo lugha pekee rasmi; Kiyekhee ni lugha ya asili ya jamii inayotambuliwa)"},
    "No (English and French are official in Cameroon; Daba is a recognized community language)": {ja:"公用語ではない（カメルーンの公用語は英語とフランス語。ダバ語は地域共同体の言語として認定）",ko:"공용어 아님(카메룬의 공용어는 영어와 프랑스어. 다바어는 인정된 공동체 언어)",zh:"否（英语与法语为喀麦隆官方语言；Daba 为受承认的社区语言）",yue:"否（英語同法語係喀麥隆官方語言；Daba 係獲承認嘅社區語言）",vi:"Không (tiếng Anh và tiếng Pháp là ngôn ngữ chính thức ở Cameroon; tiếng Daba là ngôn ngữ cộng đồng được công nhận)",th:"ไม่ (ภาษาอังกฤษและภาษาฝรั่งเศสเป็นภาษาราชการในแคเมอรูน ส่วนภาษาดาบาเป็นภาษาชุมชนที่ได้รับการรับรอง)",id:"Tidak (bahasa Inggris dan Prancis resmi di Kamerun; Daba adalah bahasa komunitas yang diakui)",hi:"नहीं (कैमरून में अंग्रेज़ी और फ़्रेंच आधिकारिक हैं; डाबा एक मान्यता प्राप्त सामुदायिक भाषा है)",de:"Nein (Englisch und Französisch sind in Kamerun amtlich; Daba ist eine anerkannte Gemeinschaftssprache)",fr:"Non (l'anglais et le français sont officiels au Cameroun ; le daba est une langue communautaire reconnue)",it:"No (l'inglese e il francese sono ufficiali in Camerun; il daba è una lingua comunitaria riconosciuta)",es:"No (el inglés y el francés son oficiales en Camerún; el daba es una lengua comunitaria reconocida)",pt:"Não (o inglês e o francês são oficiais nos Camarões; o daba é uma língua comunitária reconhecida)",ru:"Нет (английский и французский — официальные языки Камеруна; даба — признанный язык общины)",uk:"Ні (офіційні мови Камеруну — англійська та французька; даба є визнаною мовою громади)",ar:"لا (الإنجليزية والفرنسية رسميتان في الكاميرون؛ والدابا لغة مجتمعية معترف بها)",he:"לא (אנגלית וצרפתית רשמיות בקמרון; דאבה היא שפה קהילתית מוכרת)",sw:"Hapana (Kiingereza na Kifaransa ni rasmi nchini Kameruni; Kidaba ni lugha ya jamii inayotambuliwa)"},
    "No (Manyika is a Shona variety; Shona is one of Zimbabwe's 16 official languages)": {ja:"公用語ではない（マニカ語はショナ語の変種。ショナ語はジンバブエの16の公用語の一つ）",ko:"공용어 아님(마니카어는 쇼나어의 변종. 쇼나어는 짐바브웨의 16개 공용어 중 하나)",zh:"否（曼伊卡语是绍纳语的一种变体；绍纳语是津巴布韦16种官方语言之一）",yue:"否（曼伊卡語係紹納語嘅一種變體；紹納語係津巴布韋16種官方語言之一）",vi:"Không (Manyika là một biến thể của tiếng Shona; tiếng Shona là một trong 16 ngôn ngữ chính thức của Zimbabwe)",th:"ไม่ (ภาษามันยิกาเป็นภาษาย่อยของโชนา และภาษาโชนาเป็นหนึ่งใน 16 ภาษาราชการของซิมบับเว)",id:"Tidak (Manyika adalah ragam bahasa Shona; Shona merupakan salah satu dari 16 bahasa resmi Zimbabwe)",hi:"नहीं (मान्यिका शोना की एक किस्म है; शोना ज़िम्बाब्वे की 16 आधिकारिक भाषाओं में से एक है)",de:"Nein (Manyika ist eine Shona-Varietät; Shona ist eine der 16 Amtssprachen Simbabwes)",fr:"Non (le manyika est une variété du shona ; le shona est l'une des 16 langues officielles du Zimbabwe)",it:"No (il manyika è una varietà dello shona; lo shona è una delle 16 lingue ufficiali dello Zimbabwe)",es:"No (el manyika es una variedad del shona; el shona es una de las 16 lenguas oficiales de Zimbabue)",pt:"Não (o manyika é uma variedade do xona; o xona é uma das 16 línguas oficiais do Zimbábue)",ru:"Нет (маньика — вариант языка шона; шона — один из 16 официальных языков Зимбабве)",uk:"Ні (маньїка є різновидом шона; шона — одна з 16 офіційних мов Зімбабве)",ar:"لا (المانييكية صنف من الشونا؛ والشونا إحدى اللغات الرسمية الست عشرة في زيمبابوي)",he:"לא (מניקה היא ניב של שונה; שונה היא אחת מ-16 השפות הרשמיות של זימבבואה)",sw:"Hapana (Kimanyika ni lahaja ya Kishona; Kishona ni mojawapo ya lugha 16 rasmi za Zimbabwe)"},
    "No (Standard German is the official written language of the German-speaking cantons; Swiss German is the spoken vernacular)": {ja:"公用語ではない（ドイツ語圏の州の公式な文語は標準ドイツ語。スイスドイツ語は話し言葉）",ko:"공용어 아님(독일어권 칸톤의 공식 문어는 표준 독일어. 스위스 독일어는 구어)",zh:"否（标准德语是德语区各州的官方书面语；瑞士德语为口语变体）",yue:"否（標準德語係德語區各州嘅官方書面語；瑞士德語係口語變體）",vi:"Không (tiếng Đức chuẩn là ngôn ngữ viết chính thức của các bang nói tiếng Đức; tiếng Đức Thụy Sĩ là khẩu ngữ)",th:"ไม่ (ภาษาเยอรมันมาตรฐานเป็นภาษาเขียนทางการของรัฐที่ใช้ภาษาเยอรมัน ส่วนภาษาเยอรมันสวิสเป็นภาษาพูดพื้นถิ่น)",id:"Tidak (bahasa Jerman Standar adalah bahasa tulis resmi kanton-kanton berbahasa Jerman; Jerman Swiss adalah ragam lisan sehari-hari)",hi:"नहीं (मानक जर्मन जर्मन-भाषी कैंटनों की आधिकारिक लिखित भाषा है; स्विस जर्मन बोलचाल की भाषा है)",de:"Nein (Standarddeutsch ist die amtliche Schriftsprache der deutschsprachigen Kantone; Schweizerdeutsch ist die gesprochene Umgangssprache)",fr:"Non (l'allemand standard est la langue écrite officielle des cantons germanophones ; le suisse allemand est le vernaculaire parlé)",it:"No (il tedesco standard è la lingua scritta ufficiale dei cantoni germanofoni; il tedesco svizzero è il vernacolo parlato)",es:"No (el alemán estándar es la lengua escrita oficial de los cantones germanófonos; el alemán suizo es el vernáculo hablado)",pt:"Não (o alemão padrão é a língua escrita oficial dos cantões germanófonos; o alemão suíço é o vernáculo falado)",ru:"Нет (стандартный немецкий — официальный письменный язык немецкоязычных кантонов; швейцарский немецкий — разговорный вариант)",uk:"Ні (офіційна писемна мова німецькомовних кантонів — стандартна німецька; швейцарська німецька є розмовним варіантом)",ar:"لا (الألمانية المعيارية هي لغة الكتابة الرسمية في الكانتونات الناطقة بالألمانية؛ والألمانية السويسرية هي العامية المنطوقة)",he:"לא (גרמנית תקנית היא השפה הכתובה הרשמית של הקנטונים דוברי הגרמנית; גרמנית שווייצרית היא הלשון המדוברת)",sw:"Hapana (Kijerumani Sanifu ndiyo lugha rasmi ya maandishi ya kantoni zinazozungumza Kijerumani; Kijerumani cha Uswisi ndiyo lugha inayozungumzwa)"},
    "No (Standard German is the official language)": {ja:"公用語ではない（公用語は標準ドイツ語）",ko:"공용어 아님(공용어는 표준 독일어)",zh:"否（标准德语为官方语言）",yue:"否（標準德語係官方語言）",vi:"Không (tiếng Đức chuẩn là ngôn ngữ chính thức)",th:"ไม่ (ภาษาเยอรมันมาตรฐานเป็นภาษาราชการ)",id:"Tidak (bahasa Jerman Standar adalah bahasa resmi)",hi:"नहीं (मानक जर्मन आधिकारिक भाषा है)",de:"Nein (Standarddeutsch ist die Amtssprache)",fr:"Non (l'allemand standard est la langue officielle)",it:"No (il tedesco standard è la lingua ufficiale)",es:"No (el alemán estándar es la lengua oficial)",pt:"Não (o alemão padrão é a língua oficial)",ru:"Нет (стандартный немецкий — официальный язык)",uk:"Ні (офіційна мова — стандартна німецька)",ar:"لا (الألمانية المعيارية هي اللغة الرسمية)",he:"לא (גרמנית תקנית היא השפה הרשמית)",sw:"Hapana (Kijerumani Sanifu ndiyo lugha rasmi)"},
    "No (Standard German is official; recognised as a minority language in South Tyrol)": {ja:"公用語ではない（公用語は標準ドイツ語。南チロルで少数言語として認定）",ko:"공용어 아님(공용어는 표준 독일어. 남티롤에서 소수 언어로 인정)",zh:"否（标准德语为官方语言；在南蒂罗尔获认定为少数民族语言）",yue:"否（標準德語係官方語言；喺南蒂羅爾獲認定為少數族裔語言）",vi:"Không (tiếng Đức chuẩn là ngôn ngữ chính thức; được công nhận là ngôn ngữ thiểu số ở Nam Tyrol)",th:"ไม่ (ภาษาเยอรมันมาตรฐานเป็นภาษาราชการ ภาษานี้ได้รับการรับรองเป็นภาษาชนกลุ่มน้อยในเซาท์ทีโรล)",id:"Tidak (bahasa Jerman Standar resmi; diakui sebagai bahasa minoritas di Tirol Selatan)",hi:"नहीं (मानक जर्मन आधिकारिक है; दक्षिण टिरोल में अल्पसंख्यक भाषा के रूप में मान्यता प्राप्त)",de:"Nein (Standarddeutsch ist amtlich; in Südtirol als Minderheitensprache anerkannt)",fr:"Non (l'allemand standard est officiel ; reconnue comme langue minoritaire au Tyrol du Sud)",it:"No (il tedesco standard è ufficiale; riconosciuta come lingua minoritaria in Alto Adige)",es:"No (el alemán estándar es oficial; reconocida como lengua minoritaria en Tirol del Sur)",pt:"Não (o alemão padrão é oficial; reconhecido como língua minoritária no Tirol do Sul)",ru:"Нет (официальный — стандартный немецкий; признан языком меньшинства в Южном Тироле)",uk:"Ні (офіційна — стандартна німецька; визнана мовою меншини в Південному Тіролі)",ar:"لا (الألمانية المعيارية هي الرسمية؛ ومعترف بها لغة أقلية في جنوب تيرول)",he:"לא (גרמנית תקנית היא הרשמית; מוכרת כשפת מיעוט בדרום טירול)",sw:"Hapana (Kijerumani Sanifu ni rasmi; kinatambuliwa kama lugha ya wachache Tirol Kusini)"},
    "No (Standard German is the sole official language; Kölsch is recognized regional cultural heritage)": {ja:"公用語ではない（公用語は標準ドイツ語のみ。ケルシュ語は地域の文化遺産として認定）",ko:"공용어 아님(유일한 공용어는 표준 독일어. 쾰슈어는 지역 문화유산으로 인정)",zh:"否（标准德语是唯一的官方语言；科隆方言获认定为地区文化遗产）",yue:"否（標準德語係唯一嘅官方語言；科隆方言獲認定為地區文化遺產）",vi:"Không (tiếng Đức chuẩn là ngôn ngữ chính thức duy nhất; tiếng Kölsch được công nhận là di sản văn hóa vùng)",th:"ไม่ (ภาษาเยอรมันมาตรฐานเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาเคิลช์ได้รับการรับรองเป็นมรดกวัฒนธรรมประจำภูมิภาค)",id:"Tidak (bahasa Jerman Standar adalah satu-satunya bahasa resmi; Kölsch diakui sebagai warisan budaya daerah)",hi:"नहीं (मानक जर्मन एकमात्र आधिकारिक भाषा है; कोल्श मान्यता प्राप्त क्षेत्रीय सांस्कृतिक धरोहर है)",de:"Nein (Standarddeutsch ist die einzige Amtssprache; Kölsch ist anerkanntes regionales Kulturerbe)",fr:"Non (l'allemand standard est la seule langue officielle ; le kölsch est reconnu comme patrimoine culturel régional)",it:"No (il tedesco standard è l'unica lingua ufficiale; il kölsch è riconosciuto come patrimonio culturale regionale)",es:"No (el alemán estándar es la única lengua oficial; el kölsch está reconocido como patrimonio cultural regional)",pt:"Não (o alemão padrão é a única língua oficial; o kölsch é reconhecido como patrimônio cultural regional)",ru:"Нет (стандартный немецкий — единственный официальный язык; кёльш признан региональным культурным наследием)",uk:"Ні (єдина офіційна мова — стандартна німецька; кельш визнано регіональною культурною спадщиною)",ar:"لا (الألمانية المعيارية هي اللغة الرسمية الوحيدة؛ والكولشية معترف بها تراثًا ثقافيًا إقليميًا)",he:"לא (גרמנית תקנית היא השפה הרשמית היחידה; קלש מוכרת כמורשת תרבותית אזורית)",sw:"Hapana (Kijerumani Sanifu ndiyo lugha pekee rasmi; Kikölsch kinatambuliwa kama urithi wa kitamaduni wa kanda)"},
    "No (no jurisdiction has Plautdietsch as an official language)": {ja:"公用語ではない（プラウトディーチュ語を公用語とする行政区域はない）",ko:"공용어 아님(플라우트디치어를 공용어로 삼는 관할 구역은 없음)",zh:"否（无任何司法管辖区将 Plautdietsch 定为官方语言）",yue:"否（冇任何司法管轄區將 Plautdietsch 定為官方語言）",vi:"Không (không có khu vực tài phán nào lấy tiếng Plautdietsch làm ngôn ngữ chính thức)",th:"ไม่ (ไม่มีเขตอำนาจใดกำหนดให้ภาษาเพลาท์ดีทช์เป็นภาษาราชการ)",id:"Tidak (tidak ada yurisdiksi yang menjadikan Plautdietsch bahasa resmi)",hi:"नहीं (किसी भी क्षेत्राधिकार में प्लाउटडीच आधिकारिक भाषा नहीं है)",de:"Nein (in keiner Jurisdiktion ist Plautdietsch Amtssprache)",fr:"Non (aucune juridiction n'a le plautdietsch pour langue officielle)",it:"No (nessuna giurisdizione ha il plautdietsch come lingua ufficiale)",es:"No (ninguna jurisdicción tiene el plautdietsch como lengua oficial)",pt:"Não (nenhuma jurisdição tem o plautdietsch como língua oficial)",ru:"Нет (ни в одной юрисдикции плаутдич не имеет статуса официального языка)",uk:"Ні (жодна юрисдикція не має плаутдіч офіційною мовою)",ar:"لا (لا توجد ولاية قضائية تتخذ البلاوتديتش لغةً رسمية)",he:"לא (אין רשות שיפוט שבה פלאוטדיטש היא שפה רשמית)",sw:"Hapana (hakuna mamlaka yoyote yenye Kiplautdietsch kama lugha rasmi)"},
    "No (Italy: Italian is the sole national official language; Romagnol is a recognized regional language)": {ja:"公用語ではない（イタリア：国の公用語はイタリア語のみ。ロマーニャ語は地域言語として認定）",ko:"공용어 아님(이탈리아: 국가 공용어는 이탈리아어뿐. 로마뇰어는 지역 언어로 인정)",zh:"否（意大利：意大利语是唯一的国家官方语言；罗马涅语为受承认的地区语言）",yue:"否（意大利：意大利語係唯一嘅國家官方語言；羅馬涅語係獲承認嘅地區語言）",vi:"Không (Ý: tiếng Ý là ngôn ngữ chính thức quốc gia duy nhất; tiếng Romagnol là ngôn ngữ vùng được công nhận)",th:"ไม่ (อิตาลี: ภาษาอิตาลีเป็นภาษาราชการระดับชาติเพียงภาษาเดียว ส่วนภาษาโรมัญญอลเป็นภาษาประจำภูมิภาคที่ได้รับการรับรอง)",id:"Tidak (Italia: bahasa Italia adalah satu-satunya bahasa resmi nasional; Romagnol adalah bahasa daerah yang diakui)",hi:"नहीं (इटली: इतालवी एकमात्र राष्ट्रीय आधिकारिक भाषा है; रोमान्योल एक मान्यता प्राप्त क्षेत्रीय भाषा है)",de:"Nein (Italien: Italienisch ist die einzige nationale Amtssprache; Romagnolisch ist eine anerkannte Regionalsprache)",fr:"Non (Italie : l'italien est la seule langue officielle nationale ; le romagnol est une langue régionale reconnue)",it:"No (Italia: l'italiano è l'unica lingua ufficiale nazionale; il romagnolo è una lingua regionale riconosciuta)",es:"No (Italia: el italiano es la única lengua oficial nacional; el romañol es una lengua regional reconocida)",pt:"Não (Itália: o italiano é a única língua oficial nacional; o romanhol é uma língua regional reconhecida)",ru:"Нет (Италия: итальянский — единственный общенациональный официальный язык; романьольский — признанный региональный язык)",uk:"Ні (Італія: єдина загальнодержавна офіційна мова — італійська; романьйольська є визнаною регіональною мовою)",ar:"لا (إيطاليا: الإيطالية هي اللغة الرسمية الوطنية الوحيدة؛ والرومانيولية لغة إقليمية معترف بها)",he:"לא (איטליה: איטלקית היא השפה הרשמית הלאומית היחידה; רומאניולית היא שפה אזורית מוכרת)",sw:"Hapana (Italia: Kiitaliano ndiyo lugha pekee rasmi ya kitaifa; Kiromagnol ni lugha ya kanda inayotambuliwa)"},
    "No (Italy: Italian is the sole national official language; Emilian is recognized regionally)": {ja:"公用語ではない（イタリア：国の公用語はイタリア語のみ。エミリア語は地域レベルで認定）",ko:"공용어 아님(이탈리아: 국가 공용어는 이탈리아어뿐. 에밀리아어는 지역 차원에서 인정)",zh:"否（意大利：意大利语是唯一的国家官方语言；艾米利亚语在地区层面获承认）",yue:"否（意大利：意大利語係唯一嘅國家官方語言；艾米利亞語喺地區層面獲承認）",vi:"Không (Ý: tiếng Ý là ngôn ngữ chính thức quốc gia duy nhất; tiếng Emilia được công nhận ở cấp vùng)",th:"ไม่ (อิตาลี: ภาษาอิตาลีเป็นภาษาราชการระดับชาติเพียงภาษาเดียว ส่วนภาษาเอมีเลียได้รับการรับรองในระดับภูมิภาค)",id:"Tidak (Italia: bahasa Italia adalah satu-satunya bahasa resmi nasional; Emilian diakui secara regional)",hi:"नहीं (इटली: इतालवी एकमात्र राष्ट्रीय आधिकारिक भाषा है; एमिलियन को क्षेत्रीय स्तर पर मान्यता प्राप्त है)",de:"Nein (Italien: Italienisch ist die einzige nationale Amtssprache; Emilianisch ist regional anerkannt)",fr:"Non (Italie : l'italien est la seule langue officielle nationale ; l'émilien est reconnu au niveau régional)",it:"No (Italia: l'italiano è l'unica lingua ufficiale nazionale; l'emiliano è riconosciuto a livello regionale)",es:"No (Italia: el italiano es la única lengua oficial nacional; el emiliano está reconocido a nivel regional)",pt:"Não (Itália: o italiano é a única língua oficial nacional; o emiliano é reconhecido regionalmente)",ru:"Нет (Италия: итальянский — единственный общенациональный официальный язык; эмилианский признан на региональном уровне)",uk:"Ні (Італія: єдина загальнодержавна офіційна мова — італійська; емільянська визнана на регіональному рівні)",ar:"لا (إيطاليا: الإيطالية هي اللغة الرسمية الوطنية الوحيدة؛ والإميلية معترف بها إقليميًا)",he:"לא (איטליה: איטלקית היא השפה הרשמית הלאומית היחידה; אמיליאנית מוכרת ברמה האזורית)",sw:"Hapana (Italia: Kiitaliano ndiyo lugha pekee rasmi ya kitaifa; Kiemilia kinatambuliwa kikanda)"},
    "No (recognised minority language in Italy under law 482/1999 — Aosta Valley and Piedmont; French is co-official in Aosta)": {ja:"公用語ではない（イタリアの1999年第482号法により少数言語として認定 ― ヴァッレ・ダオスタ州とピエモンテ州。アオスタではフランス語が共同公用語）",ko:"공용어 아님(이탈리아 482/1999법에 따라 소수 언어로 인정 — 발레다오스타주와 피에몬테주. 아오스타에서는 프랑스어가 공동 공용어)",zh:"否（依意大利482/1999号法律获认定为少数民族语言——瓦莱达奥斯塔与皮埃蒙特；法语在瓦莱达奥斯塔为共同官方语言）",yue:"否（依意大利482/1999號法律獲認定為少數族裔語言——瓦萊達奧斯塔同皮埃蒙特；法語喺瓦萊達奧斯塔係共同官方語言）",vi:"Không (là ngôn ngữ thiểu số được công nhận ở Ý theo luật 482/1999 — Thung lũng Aosta và Piemonte; tiếng Pháp là đồng ngôn ngữ chính thức ở Aosta)",th:"ไม่ (เป็นภาษาชนกลุ่มน้อยที่ได้รับการรับรองในอิตาลีตามกฎหมาย 482/1999 — หุบเขาอาออสตาและปีเยมอนเต ส่วนภาษาฝรั่งเศสเป็นภาษาราชการร่วมในอาออสตา)",id:"Tidak (bahasa minoritas yang diakui di Italia berdasarkan undang-undang 482/1999 — Lembah Aosta dan Piedmont; bahasa Prancis ko-resmi di Aosta)",hi:"नहीं (इटली में कानून 482/1999 के तहत मान्यता प्राप्त अल्पसंख्यक भाषा — आओस्ता घाटी और पीडमोंट; आओस्ता में फ़्रेंच सह-आधिकारिक है)",de:"Nein (in Italien nach Gesetz 482/1999 als Minderheitensprache anerkannt — Aostatal und Piemont; Französisch ist in Aosta ko-amtlich)",fr:"Non (langue minoritaire reconnue en Italie par la loi 482/1999 — Vallée d'Aoste et Piémont ; le français est co-officiel à Aoste)",it:"No (lingua minoritaria riconosciuta in Italia dalla legge 482/1999 — Valle d'Aosta e Piemonte; il francese è co-ufficiale in Valle d'Aosta)",es:"No (lengua minoritaria reconocida en Italia por la ley 482/1999 — Valle de Aosta y Piamonte; el francés es cooficial en Aosta)",pt:"Não (língua minoritária reconhecida na Itália pela lei 482/1999 — Vale de Aosta e Piemonte; o francês é cooficial em Aosta)",ru:"Нет (признанный язык меньшинства в Италии по закону 482/1999 — Валле-д’Аоста и Пьемонт; французский со-официален в Аосте)",uk:"Ні (визнана мовою меншини в Італії згідно із законом 482/1999 — Валле-д'Аоста і П'ємонт; французька є співофіційною в Аості)",ar:"لا (لغة أقلية معترف بها في إيطاليا بموجب القانون 482/1999 — وادي أوستا وبييمونتي؛ والفرنسية رسمية مشتركة في أوستا)",he:"לא (שפת מיעוט מוכרת באיטליה לפי חוק 482/1999 — עמק אאוסטה ופיימונטה; צרפתית היא שפה רשמית משותפת באאוסטה)",sw:"Hapana (lugha ya wachache inayotambuliwa nchini Italia chini ya sheria 482/1999 — Bonde la Aosta na Piedmont; Kifaransa ni rasmi mwenza Aosta)"},
    "No (Italian is the official language; Arbëresh is protected under Law 482/1999)": {ja:"公用語ではない（公用語はイタリア語。アルバレシュ語は1999年第482号法により保護）",ko:"공용어 아님(공용어는 이탈리아어. 아르버레시어는 482/1999법에 따라 보호)",zh:"否（意大利语为官方语言；阿尔贝雷什语受482/1999号法律保护）",yue:"否（意大利語係官方語言；阿爾貝雷什語受482/1999號法律保護）",vi:"Không (tiếng Ý là ngôn ngữ chính thức; tiếng Arbëresh được bảo hộ theo Luật 482/1999)",th:"ไม่ (ภาษาอิตาลีเป็นภาษาราชการ ส่วนภาษาอาร์บือเรชได้รับความคุ้มครองตามกฎหมาย 482/1999)",id:"Tidak (bahasa Italia adalah bahasa resmi; Arbëresh dilindungi berdasarkan Undang-Undang 482/1999)",hi:"नहीं (इतालवी आधिकारिक भाषा है; अर्बरेश कानून 482/1999 के तहत संरक्षित है)",de:"Nein (Italienisch ist die Amtssprache; Arbëresh ist durch Gesetz 482/1999 geschützt)",fr:"Non (l'italien est la langue officielle ; l'arbëresh est protégé par la loi 482/1999)",it:"No (l'italiano è la lingua ufficiale; l'arbëresh è tutelato dalla legge 482/1999)",es:"No (el italiano es la lengua oficial; el arbëresh está protegido por la Ley 482/1999)",pt:"Não (o italiano é a língua oficial; o arbëresh é protegido pela Lei 482/1999)",ru:"Нет (итальянский — официальный язык; арбереш защищён законом 482/1999)",uk:"Ні (офіційна мова — італійська; арбереш захищена законом 482/1999)",ar:"لا (الإيطالية هي اللغة الرسمية؛ والأربريشية محمية بموجب القانون 482/1999)",he:"לא (איטלקית היא השפה הרשמית; ארברשה מוגנת לפי חוק 482/1999)",sw:"Hapana (Kiitaliano ndiyo lugha rasmi; Kiarbëresh kinalindwa chini ya Sheria 482/1999)"},
    "No (Standard English is the sole official language; Bahamian Dialect is the oral vernacular)": {ja:"公用語ではない（公用語は標準英語のみ。バハマ方言は口語）",ko:"공용어 아님(유일한 공용어는 표준 영어. 바하마 방언은 구어)",zh:"否（标准英语是唯一的官方语言；巴哈马方言为口语变体）",yue:"否（標準英語係唯一嘅官方語言；巴哈馬方言係口語變體）",vi:"Không (tiếng Anh chuẩn là ngôn ngữ chính thức duy nhất; phương ngữ Bahamas là khẩu ngữ)",th:"ไม่ (ภาษาอังกฤษมาตรฐานเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาถิ่นบาฮามาสเป็นภาษาพูดพื้นถิ่น)",id:"Tidak (bahasa Inggris Standar adalah satu-satunya bahasa resmi; Dialek Bahama adalah ragam lisan sehari-hari)",hi:"नहीं (मानक अंग्रेज़ी एकमात्र आधिकारिक भाषा है; बहामियन बोली मौखिक बोलचाल की भाषा है)",de:"Nein (Standardenglisch ist die einzige Amtssprache; der bahamaische Dialekt ist die mündliche Umgangssprache)",fr:"Non (l'anglais standard est la seule langue officielle ; le dialecte bahaméen est le vernaculaire oral)",it:"No (l'inglese standard è l'unica lingua ufficiale; il dialetto bahamense è il vernacolo orale)",es:"No (el inglés estándar es la única lengua oficial; el dialecto bahameño es el vernáculo oral)",pt:"Não (o inglês padrão é a única língua oficial; o dialeto bahamense é o vernáculo oral)",ru:"Нет (стандартный английский — единственный официальный язык; багамский диалект — устный разговорный вариант)",uk:"Ні (єдина офіційна мова — стандартна англійська; багамський діалект є усним розмовним варіантом)",ar:"لا (الإنجليزية المعيارية هي اللغة الرسمية الوحيدة؛ واللهجة الباهامية هي العامية الشفوية)",he:"לא (אנגלית תקנית היא השפה הרשמית היחידה; הניב הבהאמי הוא הלשון המדוברת)",sw:"Hapana (Kiingereza Sanifu ndiyo lugha pekee rasmi; Lahaja ya Kibahama ndiyo lugha ya mazungumzo)"},
    "No (English is the sole official language; Belize Kriol is widely used in informal contexts)": {ja:"公用語ではない（公用語は英語のみ。ベリーズ・クリオール語は非公式な場面で広く使用）",ko:"공용어 아님(유일한 공용어는 영어. 벨리즈 크리올어는 비공식적인 상황에서 널리 사용)",zh:"否（英语是唯一的官方语言；伯利兹克里奥尔语广泛用于非正式场合）",yue:"否（英語係唯一嘅官方語言；伯利茲克里奧爾語廣泛用於非正式場合）",vi:"Không (tiếng Anh là ngôn ngữ chính thức duy nhất; tiếng Kriol Belize được dùng rộng rãi trong bối cảnh phi chính thức)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาครีโอลเบลีซใช้อย่างแพร่หลายในบริบทไม่เป็นทางการ)",id:"Tidak (bahasa Inggris adalah satu-satunya bahasa resmi; Belize Kriol banyak dipakai dalam konteks informal)",hi:"नहीं (अंग्रेज़ी एकमात्र आधिकारिक भाषा है; बेलीज़ क्रिओल अनौपचारिक संदर्भों में व्यापक रूप से प्रयुक्त होती है)",de:"Nein (Englisch ist die einzige Amtssprache; Belize-Kriol wird in informellen Kontexten breit verwendet)",fr:"Non (l'anglais est la seule langue officielle ; le kriol du Belize est largement employé dans les contextes informels)",it:"No (l'inglese è l'unica lingua ufficiale; il kriol del Belize è ampiamente usato nei contesti informali)",es:"No (el inglés es la única lengua oficial; el kriol beliceño se usa ampliamente en contextos informales)",pt:"Não (o inglês é a única língua oficial; o crioulo de Belize é amplamente usado em contextos informais)",ru:"Нет (английский — единственный официальный язык; белизский криол широко используется в неформальном общении)",uk:"Ні (єдина офіційна мова — англійська; белізький креол широко вживається в неформальних контекстах)",ar:"لا (الإنجليزية هي اللغة الرسمية الوحيدة؛ وكريول بليز مستخدمة على نطاق واسع في السياقات غير الرسمية)",he:"לא (אנגלית היא השפה הרשמית היחידה; קריאול של בליז נפוצה בהקשרים לא פורמליים)",sw:"Hapana (Kiingereza ndiyo lugha pekee rasmi; Kikriol cha Belize hutumika sana katika mazingira yasiyo rasmi)"},
    "No (English/Tok Pisin/Hiri Motu official; Kanite is a recognized community language)": {ja:"公用語ではない（英語・トク・ピシン・ヒリモツが公用語。カニテ語は地域共同体の言語として認定）",ko:"공용어 아님(영어·톡피신·히리모투가 공용어. 카니테어는 인정된 공동체 언어)",zh:"否（英语／托克皮辛语／希里莫图语为官方语言；Kanite 为受承认的社区语言）",yue:"否（英語／托克皮辛語／希里莫圖語係官方語言；Kanite 係獲承認嘅社區語言）",vi:"Không (tiếng Anh/Tok Pisin/Hiri Motu là chính thức; tiếng Kanite là ngôn ngữ cộng đồng được công nhận)",th:"ไม่ (ภาษาอังกฤษ ต็อกปีซิน และฮีรีโมตูเป็นภาษาราชการ ส่วนภาษาคานีเตเป็นภาษาชุมชนที่ได้รับการรับรอง)",id:"Tidak (Inggris/Tok Pisin/Hiri Motu resmi; Kanite adalah bahasa komunitas yang diakui)",hi:"नहीं (अंग्रेज़ी/टोक पिसिन/हिरी मोटू आधिकारिक; कानिते एक मान्यता प्राप्त सामुदायिक भाषा है)",de:"Nein (Englisch/Tok Pisin/Hiri Motu amtlich; Kanite ist eine anerkannte Gemeinschaftssprache)",fr:"Non (anglais/tok pisin/hiri motu officiels ; le kanite est une langue communautaire reconnue)",it:"No (inglese/tok pisin/hiri motu ufficiali; il kanite è una lingua comunitaria riconosciuta)",es:"No (inglés/tok pisin/hiri motu oficiales; el kanite es una lengua comunitaria reconocida)",pt:"Não (inglês/tok pisin/hiri motu são oficiais; o kanite é uma língua comunitária reconhecida)",ru:"Нет (официальные — английский, ток-писин и хири-моту; каните — признанный язык общины)",uk:"Ні (офіційні — англійська/ток-пісін/хірі-моту; каніте є визнаною мовою громади)",ar:"لا (الإنجليزية وتوك بيسين وهيري موتو رسمية؛ والكانيتية لغة مجتمعية معترف بها)",he:"לא (אנגלית/טוק פיסין/הירי מוטו רשמיות; קניטה היא שפה קהילתית מוכרת)",sw:"Hapana (Kiingereza/Tok Pisin/Hiri Motu ni rasmi; Kikanite ni lugha ya jamii inayotambuliwa)"},
    "No (English/Tok Pisin/Hiri Motu official; Mussau-Emira is recognized regionally)": {ja:"公用語ではない（英語・トク・ピシン・ヒリモツが公用語。ムサウ・エミラ語は地域レベルで認定）",ko:"공용어 아님(영어·톡피신·히리모투가 공용어. 무사우에미라어는 지역 차원에서 인정)",zh:"否（英语／托克皮辛语／希里莫图语为官方语言；Mussau-Emira 在地区层面获承认）",yue:"否（英語／托克皮辛語／希里莫圖語係官方語言；Mussau-Emira 喺地區層面獲承認）",vi:"Không (tiếng Anh/Tok Pisin/Hiri Motu là chính thức; tiếng Mussau-Emira được công nhận ở cấp vùng)",th:"ไม่ (ภาษาอังกฤษ ต็อกปีซิน และฮีรีโมตูเป็นภาษาราชการ ส่วนภาษามุสเซา-เอมีราได้รับการรับรองในระดับภูมิภาค)",id:"Tidak (Inggris/Tok Pisin/Hiri Motu resmi; Mussau-Emira diakui secara regional)",hi:"नहीं (अंग्रेज़ी/टोक पिसिन/हिरी मोटू आधिकारिक; मुस्साउ-एमिरा को क्षेत्रीय स्तर पर मान्यता प्राप्त है)",de:"Nein (Englisch/Tok Pisin/Hiri Motu amtlich; Mussau-Emira ist regional anerkannt)",fr:"Non (anglais/tok pisin/hiri motu officiels ; le mussau-emira est reconnu au niveau régional)",it:"No (inglese/tok pisin/hiri motu ufficiali; il mussau-emira è riconosciuto a livello regionale)",es:"No (inglés/tok pisin/hiri motu oficiales; el mussau-emira está reconocido a nivel regional)",pt:"Não (inglês/tok pisin/hiri motu são oficiais; o mussau-emira é reconhecido regionalmente)",ru:"Нет (официальные — английский, ток-писин и хири-моту; муссау-эмира признан на региональном уровне)",uk:"Ні (офіційні — англійська/ток-пісін/хірі-моту; муссау-еміра визнана на регіональному рівні)",ar:"لا (الإنجليزية وتوك بيسين وهيري موتو رسمية؛ والموساو-إميرا معترف بها إقليميًا)",he:"לא (אנגלית/טוק פיסין/הירי מוטו רשמיות; מוסאו-אמירה מוכרת ברמה האזורית)",sw:"Hapana (Kiingereza/Tok Pisin/Hiri Motu ni rasmi; Kimussau-Emira kinatambuliwa kikanda)"},
    "No (Indonesian is the sole official language; Nalca is a recognized community Mek language)": {ja:"公用語ではない（公用語はインドネシア語のみ。ナルカ語は地域共同体のメク系言語として認定）",ko:"공용어 아님(유일한 공용어는 인도네시아어. 날카어는 인정된 공동체 메크계 언어)",zh:"否（印尼语是唯一的官方语言；Nalca 为受承认的社区 Mek 语群语言）",yue:"否（印尼語係唯一嘅官方語言；Nalca 係獲承認嘅社區 Mek 語群語言）",vi:"Không (tiếng Indonesia là ngôn ngữ chính thức duy nhất; tiếng Nalca là ngôn ngữ nhóm Mek của cộng đồng được công nhận)",th:"ไม่ (ภาษาอินโดนีเซียเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษานัลกาเป็นภาษากลุ่มเม็กประจำชุมชนที่ได้รับการรับรอง)",id:"Tidak (bahasa Indonesia adalah satu-satunya bahasa resmi; Nalca adalah bahasa Mek komunitas yang diakui)",hi:"नहीं (इंडोनेशियाई एकमात्र आधिकारिक भाषा है; नाल्का एक मान्यता प्राप्त सामुदायिक मेक भाषा है)",de:"Nein (Indonesisch ist die einzige Amtssprache; Nalca ist eine anerkannte Mek-Gemeinschaftssprache)",fr:"Non (l'indonésien est la seule langue officielle ; le nalca est une langue mek communautaire reconnue)",it:"No (l'indonesiano è l'unica lingua ufficiale; il nalca è una lingua mek comunitaria riconosciuta)",es:"No (el indonesio es la única lengua oficial; el nalca es una lengua mek comunitaria reconocida)",pt:"Não (o indonésio é a única língua oficial; o nalca é uma língua mek comunitária reconhecida)",ru:"Нет (индонезийский — единственный официальный язык; налка — признанный мекский язык общины)",uk:"Ні (єдина офіційна мова — індонезійська; налка є визнаною мовою громади з групи мек)",ar:"لا (الإندونيسية هي اللغة الرسمية الوحيدة؛ والنالكا لغة مجتمعية معترف بها من مجموعة ميك)",he:"לא (אינדונזית היא השפה הרשמית היחידה; נאלקה היא שפת מק קהילתית מוכרת)",sw:"Hapana (Kiindonesia ndiyo lugha pekee rasmi; Kinalca ni lugha ya jamii ya kundi la Mek inayotambuliwa)"},
    "No nationally (Portuguese is the official language of Brazil; Nheengatu is co-official in the municipality of São Gabriel da Cachoeira since 2002)": {ja:"国レベルでは公用語ではない（ブラジルの公用語はポルトガル語。ニェエンガトゥ語は2002年よりサン・ガブリエル・ダ・カショエイラ市の共同公用語）",ko:"국가 차원에서는 공용어 아님(브라질의 공용어는 포르투갈어. 녱가투어는 2002년부터 상가브리에우다카쇼에이라시의 공동 공용어)",zh:"全国范围内否（葡萄牙语是巴西的官方语言；内恩加图语自2002年起在 São Gabriel da Cachoeira 市为共同官方语言）",yue:"全國範圍內否（葡萄牙語係巴西嘅官方語言；內恩加圖語自2002年起喺 São Gabriel da Cachoeira 市係共同官方語言）",vi:"Không ở cấp quốc gia (tiếng Bồ Đào Nha là ngôn ngữ chính thức của Brazil; tiếng Nheengatu là đồng ngôn ngữ chính thức ở đô thị São Gabriel da Cachoeira từ năm 2002)",th:"ไม่ในระดับประเทศ (ภาษาโปรตุเกสเป็นภาษาราชการของบราซิล ส่วนภาษาเญเองกาตูเป็นภาษาราชการร่วมในเทศบาลเซากาบรีแยลดากาโชเอย์รา ตั้งแต่ปี 2002)",id:"Tidak secara nasional (bahasa Portugis adalah bahasa resmi Brasil; Nheengatu ko-resmi di munisipalitas São Gabriel da Cachoeira sejak 2002)",hi:"राष्ट्रीय स्तर पर नहीं (पुर्तगाली ब्राज़ील की आधिकारिक भाषा है; न्येंगातू 2002 से साओ गैब्रिएल दा काशोएरा नगरपालिका में सह-आधिकारिक है)",de:"National nein (Portugiesisch ist die Amtssprache Brasiliens; Nheengatu ist seit 2002 ko-amtlich in der Gemeinde São Gabriel da Cachoeira)",fr:"Non au niveau national (le portugais est la langue officielle du Brésil ; le nheengatu est co-officiel dans la municipalité de São Gabriel da Cachoeira depuis 2002)",it:"Non a livello nazionale (il portoghese è la lingua ufficiale del Brasile; il nheengatu è co-ufficiale nel comune di São Gabriel da Cachoeira dal 2002)",es:"No a nivel nacional (el portugués es la lengua oficial de Brasil; el ñeengatú es cooficial en el municipio de São Gabriel da Cachoeira desde 2002)",pt:"Não em âmbito nacional (o português é a língua oficial do Brasil; o nheengatu é cooficial no município de São Gabriel da Cachoeira desde 2002)",ru:"Нет на общенациональном уровне (португальский — официальный язык Бразилии; ньенгату со-официален в муниципалитете Сан-Габриэл-да-Кашуэйра с 2002 года)",uk:"Ні на загальнодержавному рівні (офіційна мова Бразилії — португальська; ньєенгату є співофіційною в муніципалітеті Сан-Габріел-да-Кашуейра від 2002 року)",ar:"لا على المستوى الوطني (البرتغالية هي اللغة الرسمية في البرازيل؛ والنينغاتو لغة رسمية مشتركة في بلدية ساو غابرييل دا كاشويرا منذ عام 2002)",he:"לא ברמה הלאומית (פורטוגזית היא השפה הרשמית של ברזיל; ניינגאטו היא שפה רשמית משותפת בעיריית סאו גבריאל דה קשואירה מאז 2002)",sw:"Hapana kitaifa (Kireno ndiyo lugha rasmi ya Brazili; Kinheengatu ni rasmi mwenza katika manispaa ya São Gabriel da Cachoeira tangu 2002)"},
    "~10 fluent + heritage learners": {ja:"流暢な話者約10人＋継承語学習者",ko:"유창한 화자 약 10명 + 계승어 학습자",zh:"约10人流利，另有传承语学习者",yue:"約10人流利，另有傳承語學習者",vi:"~10 người nói thành thạo + người học kế thừa",th:"~10 คนพูดคล่อง + ผู้เรียนเชื้อสาย",id:"~10 penutur fasih + pembelajar bahasa warisan",hi:"~10 धाराप्रवाह वक्ता + विरासत-भाषा शिक्षार्थी",de:"~10 fließende Sprecher + Herkunftssprachenlernende",fr:"~10 locuteurs courants + apprenants de langue d'héritage",it:"~10 parlanti fluenti + apprendenti di eredità",es:"~10 hablantes fluidos + aprendices de herencia",pt:"~10 falantes fluentes + aprendizes de herança",ru:"~10 свободно владеющих + изучающие как наследственный язык",uk:"~10 вільно володіють + спадкові учні",ar:"~10 متحدثين بطلاقة + متعلمون من أبناء التراث",he:"~10 דוברים שוטפים + לומדי מורשת",sw:"~10 wasemaji fasaha + wanafunzi wa urithi"},
    "No (German is the official language; North Frisian is a recognized minority language in Schleswig-Holstein)": {ja:"公用語ではない（公用語はドイツ語。北フリジア語はシュレースヴィヒ＝ホルシュタイン州で少数言語として認定）",ko:"공용어 아님(공용어는 독일어. 북프리지아어는 슐레스비히홀슈타인주에서 소수 언어로 인정)",zh:"否（德语为官方语言；北弗里西亚语在石勒苏益格-荷尔斯泰因州获认定为少数民族语言）",yue:"否（德語係官方語言；北弗里西亞語喺石勒蘇益格-荷爾斯泰因州獲認定為少數族裔語言）",vi:"Không (tiếng Đức là ngôn ngữ chính thức; tiếng Frisia Bắc là ngôn ngữ thiểu số được công nhận ở Schleswig-Holstein)",th:"ไม่ (ภาษาเยอรมันเป็นภาษาราชการ ส่วนภาษาฟรีเซียนเหนือเป็นภาษาชนกลุ่มน้อยที่ได้รับการรับรองในชเลสวิช-โฮลชไตน์)",id:"Tidak (bahasa Jerman adalah bahasa resmi; Frisia Utara adalah bahasa minoritas yang diakui di Schleswig-Holstein)",hi:"नहीं (जर्मन आधिकारिक भाषा है; उत्तरी फ़्रिसियाई श्लेस्विग-होल्श्टाइन में मान्यता प्राप्त अल्पसंख्यक भाषा है)",de:"Nein (Deutsch ist die Amtssprache; Nordfriesisch ist eine anerkannte Minderheitensprache in Schleswig-Holstein)",fr:"Non (l'allemand est la langue officielle ; le frison septentrional est une langue minoritaire reconnue dans le Schleswig-Holstein)",it:"No (il tedesco è la lingua ufficiale; il frisone settentrionale è una lingua minoritaria riconosciuta nello Schleswig-Holstein)",es:"No (el alemán es la lengua oficial; el frisón septentrional es una lengua minoritaria reconocida en Schleswig-Holstein)",pt:"Não (o alemão é a língua oficial; o frísio setentrional é uma língua minoritária reconhecida em Schleswig-Holstein)",ru:"Нет (немецкий — официальный язык; севернофризский — признанный язык меньшинства в земле Шлезвиг-Гольштейн)",uk:"Ні (офіційна мова — німецька; північнофризька є визнаною мовою меншини в Шлезвіг-Гольштейні)",ar:"لا (الألمانية هي اللغة الرسمية؛ والفريزية الشمالية لغة أقلية معترف بها في شليسفيغ-هولشتاين)",he:"לא (גרמנית היא השפה הרשמית; פריזית צפונית היא שפת מיעוט מוכרת בשלזוויג-הולשטיין)",sw:"Hapana (Kijerumani ndiyo lugha rasmi; Kifrisia cha Kaskazini ni lugha ya wachache inayotambuliwa Schleswig-Holstein)"},
    "Historical — the administrative, monumental and religious language of pharaonic Egypt": {ja:"歴史言語 ― ファラオ時代エジプトの行政・記念碑・宗教の言語",ko:"역사 언어 — 파라오 시대 이집트의 행정·기념비·종교 언어",zh:"历史语言——法老时代埃及的行政、碑铭与宗教语言",yue:"歷史語言——法老時代埃及嘅行政、碑銘同宗教語言",vi:"Ngôn ngữ lịch sử — ngôn ngữ hành chính, bi ký và tôn giáo của Ai Cập thời các pharaoh",th:"ภาษาในประวัติศาสตร์ — ภาษาที่ใช้ในการปกครอง จารึกอนุสรณ์ และศาสนาของอียิปต์ยุคฟาโรห์",id:"Historis — bahasa administrasi, monumental, dan keagamaan Mesir firaun",hi:"ऐतिहासिक — फ़ैरोनिक मिस्र की प्रशासनिक, स्मारकीय और धार्मिक भाषा",de:"Historisch — die Verwaltungs-, Monumental- und Religionssprache des pharaonischen Ägypten",fr:"Historique — langue administrative, monumentale et religieuse de l'Égypte pharaonique",it:"Storica — lingua amministrativa, monumentale e religiosa dell'Egitto faraonico",es:"Histórica — lengua administrativa, monumental y religiosa del Egipto faraónico",pt:"Histórica — língua administrativa, monumental e religiosa do Egito faraônico",ru:"Исторический — административный, монументальный и религиозный язык фараоновского Египта",uk:"Історична — адміністративна, монументальна та релігійна мова фараонівського Єгипту",ar:"تاريخية — لغة الإدارة والنقوش التذكارية والدين في مصر الفرعونية",he:"היסטורית — שפת המנהל, הכתובות המונומנטליות והדת של מצרים הפרעונית",sw:"Ya kihistoria — lugha ya utawala, ya maandishi ya makumbusho na ya dini ya Misri ya mafarao"},
    "Active monastic/lay pedagogical use (Theravada)": {ja:"僧院・在家の教育の場で現用（上座部仏教）",ko:"승원·재가 교육 목적으로 현재 사용(상좌부 불교)",zh:"仍活跃于僧团与在家众的教学用途（上座部）",yue:"仍活躍於僧團同在家眾嘅教學用途（上座部）",vi:"Vẫn được dùng trong giảng dạy cho tăng sĩ và cư sĩ (Phật giáo Theravada)",th:"ยังใช้ในการเรียนการสอนของพระสงฆ์และฆราวาส (เถรวาท)",id:"Aktif digunakan dalam pengajaran monastik/awam (Theravada)",hi:"सक्रिय मठीय/गृहस्थ शैक्षिक उपयोग (थेरवाद)",de:"Aktiver monastischer und laienpädagogischer Gebrauch (Theravada)",fr:"Usage pédagogique monastique et laïc actif (theravāda)",it:"Uso didattico attivo, monastico e laico (Theravāda)",es:"Uso pedagógico activo, monástico y laico (Theravāda)",pt:"Uso pedagógico monástico e laico ativo (teravada)",ru:"Активное монашеское и мирское учебное использование (тхеравада)",uk:"Активне чернече/мирянське навчальне вживання (тхеравада)",ar:"استخدام تعليمي نشط في الأوساط الرهبانية والعلمانية (ثيرافادا)",he:"שימוש לימודי פעיל במנזרים ובקרב הדיוטות (תרוואדה)",sw:"Matumizi hai ya kimafundisho kwa watawa na waumini wa kawaida (Theravada)"},
    "No (extinct; modern Marathi mr occupies its original territory)": {ja:"公用語ではない（死語。元の分布域は現代のマラーティー語 mr が占める）",ko:"공용어 아님(사멸. 원래 분포 지역은 현대 마라티어 mr가 차지)",zh:"否（已消亡；现代马拉地语 mr 占据其原有分布区）",yue:"否（已消亡；現代馬拉地語 mr 佔據其原有分佈區）",vi:"Không (đã tuyệt chủng; tiếng Marathi hiện đại mr chiếm lĩnh địa bàn ban đầu của nó)",th:"ไม่ (สูญแล้ว ภาษามราฐีสมัยใหม่ mr ใช้อยู่ในดินแดนเดิมของภาษานี้)",id:"Tidak (punah; bahasa Marathi modern mr menempati wilayah asalnya)",hi:"नहीं (विलुप्त; आधुनिक मराठी mr इसके मूल क्षेत्र में स्थित है)",de:"Nein (ausgestorben; das moderne Marathi mr nimmt ihr ursprüngliches Gebiet ein)",fr:"Non (éteinte ; le marathi moderne mr occupe son territoire d'origine)",it:"No (estinta; il marathi moderno mr occupa il suo territorio originario)",es:"No (extinta; el maratí moderno mr ocupa su territorio original)",pt:"Não (extinta; o marati moderno mr ocupa o seu território original)",ru:"Нет (мёртвый; современный маратхи mr занимает его исконную территорию)",uk:"Ні (мертва; сучасна маратхі mr посідає її первісну територію)",ar:"لا (منقرضة؛ والماراثية الحديثة mr تشغل موطنها الأصلي)",he:"לא (נכחדה; מראטהית מודרנית mr תופסת את שטחה המקורי)",sw:"Hapana (imetoweka; Kimarathi cha kisasa mr kinatumika katika eneo lake la asili)"},
    "No (Arabic is the sole official language of Syria)": {ja:"公用語ではない（シリアの公用語はアラビア語のみ）",ko:"공용어 아님(시리아의 유일한 공용어는 아랍어)",zh:"否（阿拉伯语是叙利亚唯一的官方语言）",yue:"否（阿拉伯語係敘利亞唯一嘅官方語言）",vi:"Không (tiếng Ả Rập là ngôn ngữ chính thức duy nhất của Syria)",th:"ไม่ (ภาษาอาหรับเป็นภาษาราชการเพียงภาษาเดียวของซีเรีย)",id:"Tidak (bahasa Arab adalah satu-satunya bahasa resmi Suriah)",hi:"नहीं (अरबी सीरिया की एकमात्र आधिकारिक भाषा है)",de:"Nein (Arabisch ist die einzige Amtssprache Syriens)",fr:"Non (l'arabe est la seule langue officielle de la Syrie)",it:"No (l'arabo è l'unica lingua ufficiale della Siria)",es:"No (el árabe es la única lengua oficial de Siria)",pt:"Não (o árabe é a única língua oficial da Síria)",ru:"Нет (арабский — единственный официальный язык Сирии)",uk:"Ні (єдина офіційна мова Сирії — арабська)",ar:"لا (العربية هي اللغة الرسمية الوحيدة في سوريا)",he:"לא (ערבית היא השפה הרשמית היחידה של סוריה)",sw:"Hapana (Kiarabu ndiyo lugha pekee rasmi ya Syria)"},
    "No nationally (recognized as a national language of Mexico under the 2003 LGDLPI, with the same validity as Spanish in its own territory)": {ja:"国レベルでは公用語ではない（2003年のLGDLPIによりメキシコの国家言語として認定され、その分布域内ではスペイン語と同等の効力を持つ）",ko:"국가 차원에서는 공용어 아님(2003년 LGDLPI에 따라 멕시코의 국가 언어로 인정되며, 그 분포 지역 내에서는 스페인어와 동등한 효력을 가짐)",zh:"全国范围内否（根据2003年 LGDLPI 获认定为墨西哥的国家语言，在其自身分布区域内与西班牙语具有同等效力）",yue:"全國範圍內否（根據2003年 LGDLPI 獲認定為墨西哥嘅國家語言，喺其自身分佈區域內同西班牙語具有同等效力）",vi:"Không ở cấp quốc gia (được công nhận là một ngôn ngữ quốc gia của Mexico theo LGDLPI năm 2003, có giá trị pháp lý ngang tiếng Tây Ban Nha trên địa bàn của mình)",th:"ไม่ในระดับประเทศ (ได้รับการรับรองเป็นภาษาประจำชาติภาษาหนึ่งของเม็กซิโกตาม LGDLPI ปี 2003 โดยมีผลบังคับเท่าเทียมกับภาษาสเปนในเขตพื้นที่ของตน)",id:"Tidak secara nasional (diakui sebagai bahasa nasional Meksiko berdasarkan LGDLPI 2003, dengan keabsahan yang sama dengan bahasa Spanyol di wilayahnya sendiri)",hi:"राष्ट्रीय स्तर पर नहीं (2003 के LGDLPI के तहत मेक्सिको की राष्ट्रीय भाषा के रूप में मान्यता प्राप्त, अपने क्षेत्र में स्पेनिश के समान वैधता के साथ)",de:"National nein (nach dem LGDLPI von 2003 als Nationalsprache Mexikos anerkannt, mit derselben Gültigkeit wie Spanisch in ihrem eigenen Gebiet)",fr:"Non au niveau national (reconnue comme langue nationale du Mexique par la LGDLPI de 2003, avec la même validité que l'espagnol sur son propre territoire)",it:"Non a livello nazionale (riconosciuta come lingua nazionale del Messico dalla LGDLPI del 2003, con la stessa validità dello spagnolo nel proprio territorio)",es:"No a nivel nacional (reconocida como lengua nacional de México por la LGDLPI de 2003, con la misma validez que el español en su propio territorio)",pt:"Não em âmbito nacional (reconhecida como língua nacional do México pela LGDLPI de 2003, com a mesma validade do espanhol em seu próprio território)",ru:"Нет на общенациональном уровне (признан национальным языком Мексики по LGDLPI 2003 года и имеет ту же юридическую силу, что и испанский, на своей территории)",uk:"Ні на загальнодержавному рівні (визнана національною мовою Мексики згідно з LGDLPI 2003 року, з тією самою чинністю, що й іспанська, на власній території)",ar:"لا على المستوى الوطني (معترف بها لغةً وطنية في المكسيك بموجب LGDLPI لعام 2003، ولها الحجية نفسها التي للإسبانية داخل إقليمها)",he:"לא ברמה הלאומית (מוכרת כשפה לאומית של מקסיקו לפי LGDLPI משנת 2003, בעלת אותו תוקף כמו ספרדית בשטחה שלה)",sw:"Hapana kitaifa (inatambuliwa kama lugha ya taifa ya Meksiko chini ya LGDLPI ya 2003, yenye uhalali sawa na Kihispania katika eneo lake)"},
    "No (Spanish is the official language of El Salvador; Nawat is recognized as national cultural heritage)": {ja:"公用語ではない（エルサルバドルの公用語はスペイン語。ナワト語は国の文化遺産として認定）",ko:"공용어 아님(엘살바도르의 공용어는 스페인어. 나와트어는 국가 문화유산으로 인정)",zh:"否（西班牙语是萨尔瓦多的官方语言；纳瓦特语获认定为国家文化遗产）",yue:"否（西班牙語係薩爾瓦多嘅官方語言；納瓦特語獲認定為國家文化遺產）",vi:"Không (tiếng Tây Ban Nha là ngôn ngữ chính thức của El Salvador; tiếng Nawat được công nhận là di sản văn hóa quốc gia)",th:"ไม่ (ภาษาสเปนเป็นภาษาราชการของเอลซัลวาดอร์ ส่วนภาษานาวัตได้รับการรับรองเป็นมรดกทางวัฒนธรรมของชาติ)",id:"Tidak (bahasa Spanyol adalah bahasa resmi El Salvador; Nawat diakui sebagai warisan budaya nasional)",hi:"नहीं (स्पेनिश एल साल्वाडोर की आधिकारिक भाषा है; नावात को राष्ट्रीय सांस्कृतिक धरोहर के रूप में मान्यता प्राप्त है)",de:"Nein (Spanisch ist die Amtssprache El Salvadors; Nawat ist als nationales Kulturerbe anerkannt)",fr:"Non (l'espagnol est la langue officielle du Salvador ; le nawat est reconnu comme patrimoine culturel national)",it:"No (lo spagnolo è la lingua ufficiale di El Salvador; il nawat è riconosciuto come patrimonio culturale nazionale)",es:"No (el español es la lengua oficial de El Salvador; el náhuat está reconocido como patrimonio cultural nacional)",pt:"Não (o espanhol é a língua oficial de El Salvador; o nawat é reconhecido como patrimônio cultural nacional)",ru:"Нет (испанский — официальный язык Сальвадора; науат признан национальным культурным наследием)",uk:"Ні (офіційна мова Сальвадору — іспанська; науат визнано національною культурною спадщиною)",ar:"لا (الإسبانية هي اللغة الرسمية في السلفادور؛ والناواتية معترف بها تراثًا ثقافيًا وطنيًا)",he:"לא (ספרדית היא השפה הרשמית של אל סלוודור; נאוואט מוכרת כמורשת תרבותית לאומית)",sw:"Hapana (Kihispania ndiyo lugha rasmi ya El Salvador; Kinawat kinatambuliwa kama urithi wa kitamaduni wa taifa)"},
    "No (Hindi is the sole official language; Angika has Bihar government recognition)": {ja:"公用語ではない（公用語はヒンディー語のみ。アンギカ語はビハール州政府の承認を受けている）",ko:"공용어 아님(유일한 공용어는 힌디어. 앙기카어는 비하르주 정부의 인정을 받음)",zh:"否（印地语是唯一的官方语言；昂加语获比哈尔邦政府承认）",yue:"否（印地語係唯一嘅官方語言；昂加語獲比哈爾邦政府承認）",vi:"Không (tiếng Hindi là ngôn ngữ chính thức duy nhất; tiếng Angika được chính quyền bang Bihar công nhận)",th:"ไม่ (ภาษาฮินดีเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาอังกิกาได้รับการรับรองจากรัฐบาลรัฐพิหาร)",id:"Tidak (bahasa Hindi adalah satu-satunya bahasa resmi; Angika memperoleh pengakuan pemerintah Bihar)",hi:"नहीं (हिन्दी एकमात्र राजभाषा है; अंगिका को बिहार सरकार की मान्यता प्राप्त है)",de:"Nein (Hindi ist die einzige Amtssprache; Angika ist von der Regierung Bihars anerkannt)",fr:"Non (le hindi est la seule langue officielle ; l'angika bénéficie d'une reconnaissance du gouvernement du Bihar)",it:"No (l'hindi è l'unica lingua ufficiale; l'angika gode del riconoscimento del governo del Bihar)",es:"No (el hindi es la única lengua oficial; el angika cuenta con el reconocimiento del gobierno de Bihar)",pt:"Não (o hindi é a única língua oficial; o angika tem reconhecimento do governo de Bihar)",ru:"Нет (хинди — единственный официальный язык; ангика признан правительством штата Бихар)",uk:"Ні (єдина офіційна мова — гінді; ангіка має визнання уряду Біхару)",ar:"لا (الهندية هي اللغة الرسمية الوحيدة؛ والأنغيكية تحظى باعتراف حكومة بيهار)",he:"לא (הינדי היא השפה הרשמית היחידה; אנגיקה זוכה להכרה של ממשלת ביהאר)",sw:"Hapana (Kihindi ndiyo lugha pekee rasmi; Kiangika kinatambuliwa na serikali ya Bihar)"},
    "No (Nepali is the official language; all mother tongues are languages of the nation under the 2015 Constitution)": {ja:"公用語ではない（公用語はネパール語。2015年憲法によりすべての母語が国家の言語とされる）",ko:"공용어 아님(공용어는 네팔어. 2015년 헌법에 따라 모든 모어가 국가의 언어)",zh:"否（尼泊尔语为官方语言；依2015年宪法，所有母语均为国家的语言）",yue:"否（尼泊爾語係官方語言；依2015年憲法，所有母語都係國家嘅語言）",vi:"Không (tiếng Nepal là ngôn ngữ chính thức; theo Hiến pháp 2015, mọi tiếng mẹ đẻ đều là ngôn ngữ của quốc gia)",th:"ไม่ (ภาษาเนปาลเป็นภาษาราชการ ส่วนภาษาแม่ทุกภาษาถือเป็นภาษาของชาติตามรัฐธรรมนูญปี 2015)",id:"Tidak (bahasa Nepali adalah bahasa resmi; semua bahasa ibu berstatus bahasa bangsa berdasarkan Konstitusi 2015)",hi:"नहीं (नेपाली आधिकारिक भाषा है; 2015 के संविधान के तहत सभी मातृभाषाएँ राष्ट्रभाषाएँ हैं)",de:"Nein (Nepali ist die Amtssprache; nach der Verfassung von 2015 sind alle Muttersprachen Sprachen der Nation)",fr:"Non (le népalais est la langue officielle ; selon la Constitution de 2015, toutes les langues maternelles sont des langues de la nation)",it:"No (il nepalese è la lingua ufficiale; tutte le lingue madri sono lingue della nazione ai sensi della Costituzione del 2015)",es:"No (el nepalí es la lengua oficial; todas las lenguas maternas son lenguas de la nación según la Constitución de 2015)",pt:"Não (o nepali é a língua oficial; todas as línguas maternas são línguas da nação pela Constituição de 2015)",ru:"Нет (непальский — официальный язык; все родные языки являются языками нации по Конституции 2015 года)",uk:"Ні (офіційна мова — непальська; усі рідні мови є мовами нації згідно з Конституцією 2015 року)",ar:"لا (النيبالية هي اللغة الرسمية؛ وجميع اللغات الأم لغاتُ الأمة بموجب دستور 2015)",he:"לא (נפאלית היא השפה הרשמית; כל שפות האם הן שפות האומה לפי חוקת 2015)",sw:"Hapana (Kinepali ndiyo lugha rasmi; lugha zote za mama ni lugha za taifa chini ya Katiba ya 2015)"},
    "No (Filipino and English are official; Chavacano is an auxiliary regional language in Zamboanga)": {ja:"公用語ではない（フィリピノ語と英語が公用語。チャバカノ語はサンボアンガの補助的な地域言語）",ko:"공용어 아님(필리핀어와 영어가 공용어. 차바카노어는 삼보앙가의 보조 지역 언어)",zh:"否（菲律宾语与英语为官方语言；查瓦卡诺语在三宝颜是辅助性地区语言）",yue:"否（菲律賓語同英語係官方語言；查瓦卡諾語喺三寶顏係輔助性地區語言）",vi:"Không (tiếng Filipino và tiếng Anh là chính thức; tiếng Chavacano là ngôn ngữ vùng bổ trợ ở Zamboanga)",th:"ไม่ (ภาษาฟิลิปิโนและภาษาอังกฤษเป็นภาษาราชการ ส่วนภาษาชาบากาโนเป็นภาษาประจำภูมิภาคที่ใช้เสริมในซัมบวงกา)",id:"Tidak (Filipino dan Inggris resmi; Chavacano adalah bahasa daerah penunjang di Zamboanga)",hi:"नहीं (फ़िलिपीनो और अंग्रेज़ी आधिकारिक हैं; चावाकानो ज़ाम्बोआंगा में सहायक क्षेत्रीय भाषा है)",de:"Nein (Filipino und Englisch sind amtlich; Chavacano ist in Zamboanga eine regionale Hilfssprache)",fr:"Non (le filipino et l'anglais sont officiels ; le chavacano est une langue régionale auxiliaire à Zamboanga)",it:"No (il filippino e l'inglese sono ufficiali; il chavacano è lingua regionale ausiliaria a Zamboanga)",es:"No (el filipino y el inglés son oficiales; el chabacano es lengua regional auxiliar en Zamboanga)",pt:"Não (o filipino e o inglês são oficiais; o chavacano é língua regional auxiliar em Zamboanga)",ru:"Нет (официальные — филиппинский и английский; чавакано — вспомогательный региональный язык в Замбоанге)",uk:"Ні (офіційні — філіппінська та англійська; чабакано є допоміжною регіональною мовою в Замбоанзі)",ar:"لا (الفلبينية والإنجليزية رسميتان؛ والتشابكانو لغة إقليمية مساعدة في زامبوانغا)",he:"לא (פיליפינית ואנגלית רשמיות; צ׳בקנו היא שפה אזורית עזר בזמבואנגה)",sw:"Hapana (Kifilipino na Kiingereza ni rasmi; Kichavacano ni lugha saidizi ya kanda huko Zamboanga)"},
    "No (English is the official language of Ghana; Ga is one of the government-sponsored languages)": {ja:"公用語ではない（ガーナの公用語は英語。ガ語は政府が支援する言語の一つ）",ko:"공용어 아님(가나의 공용어는 영어. 가어는 정부가 지원하는 언어 중 하나)",zh:"否（英语是加纳的官方语言；Ga 语是政府扶持语言之一）",yue:"否（英語係加納嘅官方語言；Ga 語係政府扶持語言之一）",vi:"Không (tiếng Anh là ngôn ngữ chính thức của Ghana; tiếng Ga là một trong các ngôn ngữ được chính phủ bảo trợ)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการของกานา ส่วนภาษากาเป็นหนึ่งในภาษาที่รัฐบาลให้การสนับสนุน)",id:"Tidak (bahasa Inggris adalah bahasa resmi Ghana; Ga merupakan salah satu bahasa yang disponsori pemerintah)",hi:"नहीं (अंग्रेज़ी घाना की आधिकारिक भाषा है; गा सरकार द्वारा प्रायोजित भाषाओं में से एक है)",de:"Nein (Englisch ist die Amtssprache Ghanas; Ga ist eine der staatlich geförderten Sprachen)",fr:"Non (l'anglais est la langue officielle du Ghana ; le ga est l'une des langues soutenues par l'État)",it:"No (l'inglese è la lingua ufficiale del Ghana; il ga è una delle lingue promosse dal governo)",es:"No (el inglés es la lengua oficial de Ghana; el ga es una de las lenguas patrocinadas por el gobierno)",pt:"Não (o inglês é a língua oficial do Gana; o ga é uma das línguas patrocinadas pelo governo)",ru:"Нет (английский — официальный язык Ганы; га — один из языков, поддерживаемых государством)",uk:"Ні (офіційна мова Гани — англійська; га є однією з мов, підтримуваних урядом)",ar:"لا (الإنجليزية هي اللغة الرسمية في غانا؛ والغا إحدى اللغات التي ترعاها الحكومة)",he:"לא (אנגלית היא השפה הרשמית של גאנה; גא היא אחת השפות הנתמכות על ידי הממשלה)",sw:"Hapana (Kiingereza ndiyo lugha rasmi ya Ghana; Kiga ni mojawapo ya lugha zinazofadhiliwa na serikali)"},
    "No (English is the official language of Ghana; Nzema is one of the government-sponsored languages)": {ja:"公用語ではない（ガーナの公用語は英語。ンゼマ語は政府が支援する言語の一つ）",ko:"공용어 아님(가나의 공용어는 영어. 은제마어는 정부가 지원하는 언어 중 하나)",zh:"否（英语是加纳的官方语言；恩泽马语是政府扶持语言之一）",yue:"否（英語係加納嘅官方語言；恩澤馬語係政府扶持語言之一）",vi:"Không (tiếng Anh là ngôn ngữ chính thức của Ghana; tiếng Nzema là một trong các ngôn ngữ được chính phủ bảo trợ)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการของกานา ส่วนภาษาเอ็นเซมาเป็นหนึ่งในภาษาที่รัฐบาลให้การสนับสนุน)",id:"Tidak (bahasa Inggris adalah bahasa resmi Ghana; Nzema merupakan salah satu bahasa yang disponsori pemerintah)",hi:"नहीं (अंग्रेज़ी घाना की आधिकारिक भाषा है; न्ज़ेमा सरकार द्वारा प्रायोजित भाषाओं में से एक है)",de:"Nein (Englisch ist die Amtssprache Ghanas; Nzema ist eine der staatlich geförderten Sprachen)",fr:"Non (l'anglais est la langue officielle du Ghana ; le nzema est l'une des langues soutenues par l'État)",it:"No (l'inglese è la lingua ufficiale del Ghana; il nzema è una delle lingue promosse dal governo)",es:"No (el inglés es la lengua oficial de Ghana; el nzema es una de las lenguas patrocinadas por el gobierno)",pt:"Não (o inglês é a língua oficial do Gana; o nzema é uma das línguas patrocinadas pelo governo)",ru:"Нет (английский — официальный язык Ганы; нзема — один из языков, поддерживаемых государством)",uk:"Ні (офіційна мова Гани — англійська; нзема є однією з мов, підтримуваних урядом)",ar:"لا (الإنجليزية هي اللغة الرسمية في غانا؛ والنزيمية إحدى اللغات التي ترعاها الحكومة)",he:"לא (אנגלית היא השפה הרשמית של גאנה; נזמה היא אחת השפות הנתמכות על ידי הממשלה)",sw:"Hapana (Kiingereza ndiyo lugha rasmi ya Ghana; Kinzema ni mojawapo ya lugha zinazofadhiliwa na serikali)"},
    "No (Swahili and English are the official languages of Kenya)": {ja:"公用語ではない（ケニアの公用語はスワヒリ語と英語）",ko:"공용어 아님(케냐의 공용어는 스와힐리어와 영어)",zh:"否（斯瓦希里语与英语是肯尼亚的官方语言）",yue:"否（斯瓦希里語同英語係肯尼亞嘅官方語言）",vi:"Không (tiếng Swahili và tiếng Anh là ngôn ngữ chính thức của Kenya)",th:"ไม่ (ภาษาสวาฮีลีและภาษาอังกฤษเป็นภาษาราชการของเคนยา)",id:"Tidak (bahasa Swahili dan Inggris adalah bahasa resmi Kenya)",hi:"नहीं (स्वाहिली और अंग्रेज़ी केन्या की आधिकारिक भाषाएँ हैं)",de:"Nein (Swahili und Englisch sind die Amtssprachen Kenias)",fr:"Non (le swahili et l'anglais sont les langues officielles du Kenya)",it:"No (lo swahili e l'inglese sono le lingue ufficiali del Kenya)",es:"No (el suajili y el inglés son las lenguas oficiales de Kenia)",pt:"Não (o suaíli e o inglês são as línguas oficiais do Quênia)",ru:"Нет (суахили и английский — официальные языки Кении)",uk:"Ні (офіційні мови Кенії — суахілі та англійська)",ar:"لا (السواحيلية والإنجليزية هما اللغتان الرسميتان في كينيا)",he:"לא (סווהילית ואנגלית הן השפות הרשמיות של קניה)",sw:"Hapana (Kiswahili na Kiingereza ndizo lugha rasmi za Kenya)"},
    "No (Swahili and English are official; recognized as one of Kenya's indigenous languages)": {ja:"公用語ではない（スワヒリ語と英語が公用語。ケニアの先住民言語の一つとして認定）",ko:"공용어 아님(스와힐리어와 영어가 공용어. 케냐의 토착어 중 하나로 인정)",zh:"否（斯瓦希里语与英语为官方语言；获认定为肯尼亚原住民语言之一）",yue:"否（斯瓦希里語同英語係官方語言；獲認定為肯尼亞原住民語言之一）",vi:"Không (tiếng Swahili và tiếng Anh là chính thức; được công nhận là một trong các ngôn ngữ bản địa của Kenya)",th:"ไม่ (ภาษาสวาฮีลีและภาษาอังกฤษเป็นภาษาราชการ ภาษานี้ได้รับการรับรองเป็นหนึ่งในภาษาชนพื้นเมืองของเคนยา)",id:"Tidak (bahasa Swahili dan Inggris resmi; diakui sebagai salah satu bahasa pribumi Kenya)",hi:"नहीं (स्वाहिली और अंग्रेज़ी आधिकारिक हैं; केन्या की देशज भाषाओं में से एक के रूप में मान्यता प्राप्त)",de:"Nein (Swahili und Englisch sind amtlich; als eine der indigenen Sprachen Kenias anerkannt)",fr:"Non (le swahili et l'anglais sont officiels ; reconnue comme l'une des langues autochtones du Kenya)",it:"No (lo swahili e l'inglese sono ufficiali; riconosciuta come una delle lingue indigene del Kenya)",es:"No (el suajili y el inglés son oficiales; reconocida como una de las lenguas indígenas de Kenia)",pt:"Não (o suaíli e o inglês são oficiais; reconhecida como uma das línguas indígenas do Quênia)",ru:"Нет (официальные — суахили и английский; признан одним из коренных языков Кении)",uk:"Ні (офіційні — суахілі та англійська; визнана однією з корінних мов Кенії)",ar:"لا (السواحيلية والإنجليزية رسميتان؛ ومعترف بها إحدى اللغات الأصلية في كينيا)",he:"לא (סווהילית ואנגלית רשמיות; מוכרת כאחת משפות הילידים של קניה)",sw:"Hapana (Kiswahili na Kiingereza ni rasmi; inatambuliwa kama mojawapo ya lugha za asili za Kenya)"},
    "No (English is the official language of Zambia; Kaonde is one of seven recognized regional languages)": {ja:"公用語ではない（ザンビアの公用語は英語。カオンデ語は認定された7つの地域言語の一つ）",ko:"공용어 아님(잠비아의 공용어는 영어. 카온데어는 인정된 7개 지역 언어 중 하나)",zh:"否（英语是赞比亚的官方语言；卡翁德语是七种受承认的地区语言之一）",yue:"否（英語係贊比亞嘅官方語言；卡翁德語係七種獲承認嘅地區語言之一）",vi:"Không (tiếng Anh là ngôn ngữ chính thức của Zambia; tiếng Kaonde là một trong bảy ngôn ngữ vùng được công nhận)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการของแซมเบีย ส่วนภาษาคาโอนเดเป็นหนึ่งในเจ็ดภาษาประจำภูมิภาคที่ได้รับการรับรอง)",id:"Tidak (bahasa Inggris adalah bahasa resmi Zambia; Kaonde merupakan salah satu dari tujuh bahasa daerah yang diakui)",hi:"नहीं (अंग्रेज़ी ज़ाम्बिया की आधिकारिक भाषा है; काओंदे सात मान्यता प्राप्त क्षेत्रीय भाषाओं में से एक है)",de:"Nein (Englisch ist die Amtssprache Sambias; Kaonde ist eine von sieben anerkannten Regionalsprachen)",fr:"Non (l'anglais est la langue officielle de la Zambie ; le kaonde est l'une des sept langues régionales reconnues)",it:"No (l'inglese è la lingua ufficiale dello Zambia; il kaonde è una delle sette lingue regionali riconosciute)",es:"No (el inglés es la lengua oficial de Zambia; el kaonde es una de las siete lenguas regionales reconocidas)",pt:"Não (o inglês é a língua oficial da Zâmbia; o kaonde é uma das sete línguas regionais reconhecidas)",ru:"Нет (английский — официальный язык Замбии; каонде — один из семи признанных региональных языков)",uk:"Ні (офіційна мова Замбії — англійська; каонде є однією із семи визнаних регіональних мов)",ar:"لا (الإنجليزية هي اللغة الرسمية في زامبيا؛ والكاوندية إحدى سبع لغات إقليمية معترف بها)",he:"לא (אנגלית היא השפה הרשמית של זמביה; קאונדה היא אחת משבע השפות האזוריות המוכרות)",sw:"Hapana (Kiingereza ndiyo lugha rasmi ya Zambia; Kikaonde ni mojawapo ya lugha saba za kanda zinazotambuliwa)"},
    "No (French is the official language of Guinea; Maninka is one of the national languages)": {ja:"公用語ではない（ギニアの公用語はフランス語。マニンカ語は国家言語の一つ）",ko:"공용어 아님(기니의 공용어는 프랑스어. 마닌카어는 국가 언어 중 하나)",zh:"否（法语是几内亚的官方语言；曼宁卡语是国家语言之一）",yue:"否（法語係幾內亞嘅官方語言；曼寧卡語係國家語言之一）",vi:"Không (tiếng Pháp là ngôn ngữ chính thức của Guinée; tiếng Maninka là một trong các ngôn ngữ quốc gia)",th:"ไม่ (ภาษาฝรั่งเศสเป็นภาษาราชการของกินี ส่วนภาษามานินคาเป็นหนึ่งในภาษาประจำชาติ)",id:"Tidak (bahasa Prancis adalah bahasa resmi Guinea; Maninka merupakan salah satu bahasa nasional)",hi:"नहीं (फ़्रेंच गिनी की आधिकारिक भाषा है; मानिंका राष्ट्रीय भाषाओं में से एक है)",de:"Nein (Französisch ist die Amtssprache Guineas; Maninka ist eine der Nationalsprachen)",fr:"Non (le français est la langue officielle de la Guinée ; le maninka est l'une des langues nationales)",it:"No (il francese è la lingua ufficiale della Guinea; il maninka è una delle lingue nazionali)",es:"No (el francés es la lengua oficial de Guinea; el maninka es una de las lenguas nacionales)",pt:"Não (o francês é a língua oficial da Guiné; o maninka é uma das línguas nacionais)",ru:"Нет (французский — официальный язык Гвинеи; манинка — один из национальных языков)",uk:"Ні (офіційна мова Гвінеї — французька; манінка є однією з національних мов)",ar:"لا (الفرنسية هي اللغة الرسمية في غينيا؛ والمانينكية إحدى اللغات الوطنية)",he:"לא (צרפתית היא השפה הרשמית של גינאה; מנינקה היא אחת השפות הלאומיות)",sw:"Hapana (Kifaransa ndiyo lugha rasmi ya Guinea; Kimaninka ni mojawapo ya lugha za taifa)"},
    "Mali (recognized national language as part of the broader Manding cluster)": {ja:"マリ（より広いマンディング語群の一部として国家言語に認定）",ko:"말리(더 넓은 만딩어군의 일부로서 국가 언어로 인정)",zh:"马里（作为广义曼丁语群的一部分获认定为国家语言）",yue:"馬里（作為廣義曼丁語群嘅一部分獲認定為國家語言）",vi:"Mali (ngôn ngữ quốc gia được công nhận, trong khuôn khổ cụm Manding rộng hơn)",th:"มาลี (ภาษาประจำชาติที่ได้รับการรับรองในฐานะส่วนหนึ่งของกลุ่มภาษามันดิงที่กว้างกว่า)",id:"Mali (bahasa nasional yang diakui sebagai bagian dari rumpun Manding yang lebih luas)",hi:"माली (व्यापक मांडिंग समूह के हिस्से के रूप में मान्यता प्राप्त राष्ट्रीय भाषा)",de:"Mali (anerkannte Nationalsprache als Teil der weiteren Manding-Gruppe)",fr:"Mali (langue nationale reconnue au sein de l'ensemble mandingue au sens large)",it:"Mali (lingua nazionale riconosciuta nell'ambito del più ampio insieme mandingo)",es:"Malí (lengua nacional reconocida dentro del conjunto mandinga más amplio)",pt:"Mali (língua nacional reconhecida como parte do conjunto mandinga mais amplo)",ru:"Мали (признан национальным языком в составе более широкого мандингского кластера)",uk:"Малі (визнана національна мова у складі ширшого мандінгського кластера)",ar:"مالي (لغة وطنية معترف بها ضمن مجموعة الماندينغ الأوسع)",he:"מאלי (שפה לאומית מוכרת כחלק מאשכול המנדינג הרחב)",sw:"Mali (lugha ya taifa inayotambuliwa kama sehemu ya kundi pana la Kimanding)"},
    "Mali (recognized national language as part of the broader Songhai cluster)": {ja:"マリ（より広いソンガイ語群の一部として国家言語に認定）",ko:"말리(더 넓은 송가이어군의 일부로서 국가 언어로 인정)",zh:"马里（作为广义桑海语群的一部分获认定为国家语言）",yue:"馬里（作為廣義桑海語群嘅一部分獲認定為國家語言）",vi:"Mali (ngôn ngữ quốc gia được công nhận, trong khuôn khổ cụm Songhai rộng hơn)",th:"มาลี (ภาษาประจำชาติที่ได้รับการรับรองในฐานะส่วนหนึ่งของกลุ่มภาษาซงไฮที่กว้างกว่า)",id:"Mali (bahasa nasional yang diakui sebagai bagian dari rumpun Songhai yang lebih luas)",hi:"माली (व्यापक सोंघाई समूह के हिस्से के रूप में मान्यता प्राप्त राष्ट्रीय भाषा)",de:"Mali (anerkannte Nationalsprache als Teil der weiteren Songhai-Gruppe)",fr:"Mali (langue nationale reconnue au sein de l'ensemble songhaï au sens large)",it:"Mali (lingua nazionale riconosciuta nell'ambito del più ampio insieme songhai)",es:"Malí (lengua nacional reconocida dentro del conjunto songhay más amplio)",pt:"Mali (língua nacional reconhecida como parte do conjunto songai mais amplo)",ru:"Мали (признан национальным языком в составе более широкого сонгайского кластера)",uk:"Малі (визнана національна мова у складі ширшого сонгайського кластера)",ar:"مالي (لغة وطنية معترف بها ضمن مجموعة السنغاي الأوسع)",he:"מאלי (שפה לאומית מוכרת כחלק מאשכול הסונגהאי הרחב)",sw:"Mali (lugha ya taifa inayotambuliwa kama sehemu ya kundi pana la Kisonghai)"},
    "No (Spanish is the official language of Guatemala; recognized as a national language under the 2003 Ley de Idiomas Nacionales)": {ja:"公用語ではない（グアテマラの公用語はスペイン語。2003年のLey de Idiomas Nacionalesにより国家言語として認定）",ko:"공용어 아님(과테말라의 공용어는 스페인어. 2003년 Ley de Idiomas Nacionales에 따라 국가 언어로 인정)",zh:"否（西班牙语是危地马拉的官方语言；依2003年 Ley de Idiomas Nacionales 获认定为国家语言）",yue:"否（西班牙語係危地馬拉嘅官方語言；依2003年 Ley de Idiomas Nacionales 獲認定為國家語言）",vi:"Không (tiếng Tây Ban Nha là ngôn ngữ chính thức của Guatemala; được công nhận là ngôn ngữ quốc gia theo Ley de Idiomas Nacionales năm 2003)",th:"ไม่ (ภาษาสเปนเป็นภาษาราชการของกัวเตมาลา ภาษานี้ได้รับการรับรองเป็นภาษาประจำชาติตาม Ley de Idiomas Nacionales ปี 2003)",id:"Tidak (bahasa Spanyol adalah bahasa resmi Guatemala; diakui sebagai bahasa nasional berdasarkan Ley de Idiomas Nacionales 2003)",hi:"नहीं (स्पेनिश ग्वाटेमाला की आधिकारिक भाषा है; 2003 के Ley de Idiomas Nacionales के तहत राष्ट्रीय भाषा के रूप में मान्यता प्राप्त)",de:"Nein (Spanisch ist die Amtssprache Guatemalas; nach dem Ley de Idiomas Nacionales von 2003 als Nationalsprache anerkannt)",fr:"Non (l'espagnol est la langue officielle du Guatemala ; reconnue comme langue nationale par la Ley de Idiomas Nacionales de 2003)",it:"No (lo spagnolo è la lingua ufficiale del Guatemala; riconosciuta come lingua nazionale dalla Ley de Idiomas Nacionales del 2003)",es:"No (el español es la lengua oficial de Guatemala; reconocida como idioma nacional por la Ley de Idiomas Nacionales de 2003)",pt:"Não (o espanhol é a língua oficial da Guatemala; reconhecida como língua nacional pela Ley de Idiomas Nacionales de 2003)",ru:"Нет (испанский — официальный язык Гватемалы; признан национальным языком по Ley de Idiomas Nacionales 2003 года)",uk:"Ні (офіційна мова Гватемали — іспанська; визнана національною мовою згідно з Ley de Idiomas Nacionales 2003 року)",ar:"لا (الإسبانية هي اللغة الرسمية في غواتيمالا؛ ومعترف بها لغةً وطنية بموجب Ley de Idiomas Nacionales لعام 2003)",he:"לא (ספרדית היא השפה הרשמית של גוואטמלה; מוכרת כשפה לאומית לפי Ley de Idiomas Nacionales משנת 2003)",sw:"Hapana (Kihispania ndiyo lugha rasmi ya Guatemala; inatambuliwa kama lugha ya taifa chini ya Ley de Idiomas Nacionales ya 2003)"},
    "No (Peru recognizes constitutional bilingualism; Aymara is widely used)": {ja:"公用語ではない（ペルーは憲法上の二言語併用を認めている。アイマラ語は広く使われている）",ko:"공용어 아님(페루는 헌법상의 이중언어주의를 인정. 아이마라어는 널리 사용됨)",zh:"否（秘鲁在宪法上承认双语制；艾马拉语使用广泛）",yue:"否（秘魯喺憲法上承認雙語制；艾馬拉語使用廣泛）",vi:"Không (Peru công nhận chế độ song ngữ theo hiến pháp; tiếng Aymara được dùng rộng rãi)",th:"ไม่ (เปรูรับรองการใช้สองภาษาตามรัฐธรรมนูญ และภาษาไอมาราถูกใช้อย่างแพร่หลาย)",id:"Tidak (Peru mengakui kedwibahasaan konstitusional; Aymara digunakan secara luas)",hi:"नहीं (पेरू संवैधानिक द्विभाषिकता को मान्यता देता है; आयमारा व्यापक रूप से प्रयुक्त होती है)",de:"Nein (Peru erkennt verfassungsmäßige Zweisprachigkeit an; Aymara ist weit verbreitet im Gebrauch)",fr:"Non (le Pérou reconnaît un bilinguisme constitutionnel ; l'aymara est largement employé)",it:"No (il Perù riconosce il bilinguismo costituzionale; l'aymara è ampiamente usato)",es:"No (Perú reconoce el bilingüismo constitucional; el aimara es de uso extendido)",pt:"Não (o Peru reconhece o bilinguismo constitucional; o aimará é amplamente usado)",ru:"Нет (Перу признаёт конституционное двуязычие; аймара широко используется)",uk:"Ні (Перу визнає конституційну двомовність; аймара широко вживана)",ar:"لا (تعترف بيرو بثنائية اللغة الدستورية؛ والأيمارا مستخدمة على نطاق واسع)",he:"לא (פרו מכירה בדו-לשוניות חוקתית; איימרה בשימוש נרחב)",sw:"Hapana (Peru inatambua uwili-lugha wa kikatiba; Kiaymara kinatumika sana)"},
    "Peru (recognized regional language under Article 48 of the 1993 Constitution)": {ja:"ペルー（1993年憲法第48条により地域言語として認定）",ko:"페루(1993년 헌법 제48조에 따라 지역 언어로 인정)",zh:"秘鲁（依1993年宪法第48条获认定为地区语言）",yue:"秘魯（依1993年憲法第48條獲認定為地區語言）",vi:"Peru (ngôn ngữ vùng được công nhận theo Điều 48 Hiến pháp 1993)",th:"เปรู (ภาษาประจำภูมิภาคที่ได้รับการรับรองตามมาตรา 48 ของรัฐธรรมนูญปี 1993)",id:"Peru (bahasa daerah yang diakui berdasarkan Pasal 48 Konstitusi 1993)",hi:"पेरू (1993 के संविधान के अनुच्छेद 48 के तहत मान्यता प्राप्त क्षेत्रीय भाषा)",de:"Peru (nach Artikel 48 der Verfassung von 1993 anerkannte Regionalsprache)",fr:"Pérou (langue régionale reconnue en vertu de l'article 48 de la Constitution de 1993)",it:"Perù (lingua regionale riconosciuta dall'articolo 48 della Costituzione del 1993)",es:"Perú (lengua regional reconocida por el artículo 48 de la Constitución de 1993)",pt:"Peru (língua regional reconhecida pelo Artigo 48 da Constituição de 1993)",ru:"Перу (признанный региональный язык согласно статье 48 Конституции 1993 года)",uk:"Перу (визнана регіональна мова згідно зі статтею 48 Конституції 1993 року)",ar:"بيرو (لغة إقليمية معترف بها بموجب المادة 48 من دستور 1993)",he:"פרו (שפה אזורית מוכרת לפי סעיף 48 לחוקת 1993)",sw:"Peru (lugha ya kanda inayotambuliwa chini ya Kifungu cha 48 cha Katiba ya 1993)"},
    "No nationally (Spanish is official; indigenous languages are official in their own territories under Article 10 of the 1991 Colombian Constitution)": {ja:"国レベルでは公用語ではない（公用語はスペイン語。1991年コロンビア憲法第10条により、先住民言語はそれぞれの領域内で公用語）",ko:"국가 차원에서는 공용어 아님(공용어는 스페인어. 1991년 콜롬비아 헌법 제10조에 따라 토착어는 각자의 영역 내에서 공용어)",zh:"全国范围内否（西班牙语为官方语言；依1991年哥伦比亚宪法第10条，原住民语言在其自身领地内为官方语言）",yue:"全國範圍內否（西班牙語係官方語言；依1991年哥倫比亞憲法第10條，原住民語言喺其自身領地內係官方語言）",vi:"Không ở cấp quốc gia (tiếng Tây Ban Nha là chính thức; các ngôn ngữ bản địa là ngôn ngữ chính thức trên lãnh thổ của chính mình theo Điều 10 Hiến pháp Colombia 1991)",th:"ไม่ในระดับประเทศ (ภาษาสเปนเป็นภาษาราชการ ส่วนภาษาชนพื้นเมืองเป็นภาษาราชการในดินแดนของตนเองตามมาตรา 10 ของรัฐธรรมนูญโคลอมเบีย ปี 1991)",id:"Tidak secara nasional (bahasa Spanyol resmi; bahasa-bahasa pribumi bersifat resmi di wilayahnya sendiri berdasarkan Pasal 10 Konstitusi Kolombia 1991)",hi:"राष्ट्रीय स्तर पर नहीं (स्पेनिश आधिकारिक है; 1991 के कोलंबियाई संविधान के अनुच्छेद 10 के तहत देशज भाषाएँ अपने-अपने क्षेत्रों में आधिकारिक हैं)",de:"National nein (Spanisch ist amtlich; indigene Sprachen sind nach Artikel 10 der kolumbianischen Verfassung von 1991 in ihren eigenen Gebieten amtlich)",fr:"Non au niveau national (l'espagnol est officiel ; les langues autochtones sont officielles sur leurs propres territoires en vertu de l'article 10 de la Constitution colombienne de 1991)",it:"Non a livello nazionale (lo spagnolo è ufficiale; le lingue indigene sono ufficiali nei rispettivi territori ai sensi dell'articolo 10 della Costituzione colombiana del 1991)",es:"No a nivel nacional (el español es oficial; las lenguas indígenas son oficiales en sus propios territorios según el artículo 10 de la Constitución colombiana de 1991)",pt:"Não em âmbito nacional (o espanhol é oficial; as línguas indígenas são oficiais em seus próprios territórios pelo Artigo 10 da Constituição colombiana de 1991)",ru:"Нет на общенациональном уровне (официальный — испанский; языки коренных народов официальны на их собственных территориях согласно статье 10 Конституции Колумбии 1991 года)",uk:"Ні на загальнодержавному рівні (офіційна — іспанська; корінні мови є офіційними на власних територіях згідно зі статтею 10 Конституції Колумбії 1991 року)",ar:"لا على المستوى الوطني (الإسبانية هي الرسمية؛ واللغات الأصلية رسمية في أقاليمها بموجب المادة 10 من الدستور الكولومبي لعام 1991)",he:"לא ברמה הלאומית (ספרדית היא הרשמית; שפות ילידים הן רשמיות בשטחיהן שלהן לפי סעיף 10 לחוקת קולומביה מ-1991)",sw:"Hapana kitaifa (Kihispania ni rasmi; lugha za asili ni rasmi katika maeneo yao wenyewe chini ya Kifungu cha 10 cha Katiba ya Kolombia ya 1991)"},
    "Canada (Dëne Sųłiné is one of the 11 official languages of the Northwest Territories; not official federally)": {ja:"カナダ（デネ・スリネ語はノースウェスト準州の11の公用語の一つ。連邦レベルでは公用語ではない）",ko:"캐나다(데네술리네어는 노스웨스트 준주의 11개 공용어 중 하나. 연방 차원에서는 공용어 아님)",zh:"加拿大（Dëne Sųłiné 是西北地区11种官方语言之一；在联邦层面非官方语言）",yue:"加拿大（Dëne Sųłiné 係西北地區11種官方語言之一；喺聯邦層面唔係官方語言）",vi:"Canada (Dëne Sųłiné là một trong 11 ngôn ngữ chính thức của Lãnh thổ Tây Bắc; không chính thức ở cấp liên bang)",th:"แคนาดา (Dëne Sųłiné เป็นหนึ่งใน 11 ภาษาราชการของนอร์ทเวสต์เทร์ริทอรีส์ แต่ไม่เป็นภาษาราชการระดับสหพันธรัฐ)",id:"Kanada (Dëne Sųłiné merupakan salah satu dari 11 bahasa resmi Northwest Territories; tidak resmi di tingkat federal)",hi:"कनाडा (Dëne Sųłiné नॉर्थवेस्ट टेरिटरीज़ की 11 आधिकारिक भाषाओं में से एक है; संघीय स्तर पर आधिकारिक नहीं)",de:"Kanada (Dëne Sųłiné ist eine der 11 Amtssprachen der Nordwest-Territorien; auf Bundesebene nicht amtlich)",fr:"Canada (le dëne sųłiné est l'une des 11 langues officielles des Territoires du Nord-Ouest ; non officielle au niveau fédéral)",it:"Canada (il dëne sųłiné è una delle 11 lingue ufficiali dei Territori del Nord-Ovest; non è ufficiale a livello federale)",es:"Canadá (el dëne sųłiné es una de las 11 lenguas oficiales de los Territorios del Noroeste; no es oficial a nivel federal)",pt:"Canadá (o Dëne Sųłiné é uma das 11 línguas oficiais dos Territórios do Noroeste; não é oficial em âmbito federal)",ru:"Канада (Dëne Sųłiné — один из 11 официальных языков Северо-Западных территорий; на федеральном уровне не официален)",uk:"Канада (дене-суліне — одна з 11 офіційних мов Північно-Західних територій; не офіційна на федеральному рівні)",ar:"كندا (الدينيه سوليني إحدى اللغات الرسمية الإحدى عشرة في الأقاليم الشمالية الغربية؛ وليست رسمية اتحاديًا)",he:"קנדה (דנה סולינה היא אחת מ-11 השפות הרשמיות של הטריטוריות הצפון-מערביות; אינה רשמית ברמה הפדרלית)",sw:"Kanada (Dëne Sųłiné ni mojawapo ya lugha 11 rasmi za Northwest Territories; si rasmi katika ngazi ya shirikisho)"},
    "No (Wabanaki Confederacy recognized; Maine recognizes it as a state heritage language)": {ja:"公用語ではない（ワバナキ連合が承認されている。メイン州は州の継承言語として認定）",ko:"공용어 아님(와바나키 연맹이 인정됨. 메인주는 주 계승 언어로 인정)",zh:"否（瓦巴纳基联盟获承认；缅因州将其认定为州传承语言）",yue:"否（瓦巴納基聯盟獲承認；緬因州將佢認定為州傳承語言）",vi:"Không (Liên minh Wabanaki được công nhận; bang Maine công nhận đây là ngôn ngữ di sản của bang)",th:"ไม่ (สมาพันธ์วาบานากิได้รับการรับรอง และรัฐเมนรับรองภาษานี้เป็นภาษามรดกของรัฐ)",id:"Tidak (Konfederasi Wabanaki diakui; Maine mengakuinya sebagai bahasa warisan negara bagian)",hi:"नहीं (वाबानाकी परिसंघ मान्यता प्राप्त है; मेन इसे राज्य की विरासत भाषा के रूप में मान्यता देता है)",de:"Nein (Anerkennung durch die Wabanaki-Konföderation; Maine erkennt sie als Erbsprache des Bundesstaates an)",fr:"Non (reconnue par la Confédération wabanaki ; le Maine la reconnaît comme langue patrimoniale de l'État)",it:"No (Confederazione Wabanaki riconosciuta; il Maine la riconosce come lingua del patrimonio statale)",es:"No (la Confederación Wabanaki está reconocida; Maine la reconoce como lengua patrimonial del estado)",pt:"Não (a Confederação Wabanaki é reconhecida; o Maine a reconhece como língua de herança do estado)",ru:"Нет (Вабанакская конфедерация признана; штат Мэн признаёт его языком наследия штата)",uk:"Ні (Конфедерацію Вабанакі визнано; штат Мен визнає її мовою спадщини штату)",ar:"لا (اتحاد واباناكي معترف به؛ وولاية مين تعترف بها لغة تراث للولاية)",he:"לא (קונפדרציית הוואבנאקי מוכרת; מדינת מיין מכירה בה כשפת מורשת של המדינה)",sw:"Hapana (Shirikisho la Wabanaki linatambuliwa; Maine inaitambua kama lugha ya urithi ya jimbo)"},
    "No (English and French are the official languages of Canada)": {ja:"公用語ではない（カナダの公用語は英語とフランス語）",ko:"공용어 아님(캐나다의 공용어는 영어와 프랑스어)",zh:"否（英语与法语是加拿大的官方语言）",yue:"否（英語同法語係加拿大嘅官方語言）",vi:"Không (tiếng Anh và tiếng Pháp là ngôn ngữ chính thức của Canada)",th:"ไม่ (ภาษาอังกฤษและภาษาฝรั่งเศสเป็นภาษาราชการของแคนาดา)",id:"Tidak (bahasa Inggris dan Prancis adalah bahasa resmi Kanada)",hi:"नहीं (अंग्रेज़ी और फ़्रेंच कनाडा की आधिकारिक भाषाएँ हैं)",de:"Nein (Englisch und Französisch sind die Amtssprachen Kanadas)",fr:"Non (l'anglais et le français sont les langues officielles du Canada)",it:"No (l'inglese e il francese sono le lingue ufficiali del Canada)",es:"No (el inglés y el francés son las lenguas oficiales de Canadá)",pt:"Não (o inglês e o francês são as línguas oficiais do Canadá)",ru:"Нет (английский и французский — официальные языки Канады)",uk:"Ні (офіційні мови Канади — англійська та французька)",ar:"لا (الإنجليزية والفرنسية هما اللغتان الرسميتان في كندا)",he:"לא (אנגלית וצרפתית הן השפות הרשמיות של קנדה)",sw:"Hapana (Kiingereza na Kifaransa ndizo lugha rasmi za Kanada)"},
    "~26K Plains Cree (~96K all Cree dialects)": {ja:"平原クリー語約26K（クリー語の全方言で約96K）",ko:"평원 크리어 약 26K(크리어 전체 방언 약 96K)",zh:"平原克里语约26K（克里语各方言合计约96K）",yue:"平原克里語約26K（克里語各方言合計約96K）",vi:"~26K tiếng Cree Đồng bằng (~96K toàn bộ các phương ngữ Cree)",th:"~26K คน ภาษาครีที่ราบ (~96K รวมทุกสำเนียงครี)",id:"~26K Cree Dataran (~96K seluruh dialek Cree)",hi:"~26K प्लेन्स क्री (~96K सभी क्री बोलियाँ)",de:"~26K Plains-Cree (~96K alle Cree-Dialekte)",fr:"~26K cri des Plaines (~96K tous dialectes cris confondus)",it:"~26K cree delle pianure (~96K tutti i dialetti cree)",es:"~26K cree de las llanuras (~96K todos los dialectos cree)",pt:"~26K de cree das planícies (~96K somando todos os dialetos cree)",ru:"~26K равнинный кри (~96K все диалекты кри)",uk:"~26K рівнинна крі (~96K усі діалекти крі)",ar:"~26K للكرية السهلية (~96K لجميع لهجات الكرية)",he:"~26K קרי של המישורים (~96K כלל ניבי הקרי)",sw:"~26K Cree ya Nyanda (~96K lahaja zote za Cree)"},
    "No (federally recognized tribe with sovereignty; California recognizes it as a heritage language)": {ja:"公用語ではない（主権を有する連邦公認部族。カリフォルニア州は継承言語として認定）",ko:"공용어 아님(주권을 가진 연방 인정 부족. 캘리포니아주는 계승 언어로 인정)",zh:"否（联邦承认并拥有主权的部落；加利福尼亚州将其认定为传承语言）",yue:"否（聯邦承認並擁有主權嘅部落；加利福尼亞州將佢認定為傳承語言）",vi:"Không (bộ tộc được liên bang công nhận và có chủ quyền; bang California công nhận đây là ngôn ngữ di sản)",th:"ไม่ (เป็นชนเผ่าที่รัฐบาลกลางรับรองและมีอธิปไตยของตน รัฐแคลิฟอร์เนียรับรองภาษานี้เป็นภาษามรดก)",id:"Tidak (suku yang diakui federal dan berdaulat; California mengakuinya sebagai bahasa warisan)",hi:"नहीं (संघीय रूप से मान्यता प्राप्त संप्रभु जनजाति; कैलिफ़ोर्निया इसे विरासत भाषा के रूप में मान्यता देता है)",de:"Nein (auf Bundesebene anerkannter Stamm mit Souveränität; Kalifornien erkennt sie als Erbsprache an)",fr:"Non (tribu souveraine reconnue au niveau fédéral ; la Californie la reconnaît comme langue patrimoniale)",it:"No (tribù riconosciuta a livello federale e dotata di sovranità; la California la riconosce come lingua del patrimonio)",es:"No (tribu reconocida a nivel federal con soberanía; California la reconoce como lengua patrimonial)",pt:"Não (tribo reconhecida federalmente e dotada de soberania; a Califórnia a reconhece como língua de herança)",ru:"Нет (племя признано на федеральном уровне и обладает суверенитетом; Калифорния признаёт его языком наследия)",uk:"Ні (федерально визнане плем'я із суверенітетом; Каліфорнія визнає її мовою спадщини)",ar:"لا (قبيلة معترف بها اتحاديًا وذات سيادة؛ وكاليفورنيا تعترف بها لغة تراث)",he:"לא (שבט מוכר פדרלית בעל ריבונות; קליפורניה מכירה בה כשפת מורשת)",sw:"Hapana (kabila linalotambuliwa na serikali ya shirikisho lenye mamlaka yake; California inaitambua kama lugha ya urithi)"},
    "Latin (with retroflexes rd, rl, rn, rt)": {ja:"ラテン文字（そり舌音の rd、rl、rn、rt を含む）",ko:"라틴 문자(권설음 rd, rl, rn, rt 포함)",zh:"拉丁字母（含卷舌音 rd、rl、rn、rt）",yue:"拉丁字母（含捲舌音 rd、rl、rn、rt）",vi:"Latinh (có các phụ âm quặt lưỡi rd, rl, rn, rt)",th:"อักษรละติน (มีเสียงม้วนลิ้น rd, rl, rn, rt)",id:"Latin (dengan retrofleks rd, rl, rn, rt)",hi:"लैटिन (मूर्धन्य rd, rl, rn, rt सहित)",de:"Lateinisch (mit den Retroflexen rd, rl, rn, rt)",fr:"Latin (avec les rétroflexes rd, rl, rn, rt)",it:"Latino (con le retroflesse rd, rl, rn, rt)",es:"Latino (con las retroflejas rd, rl, rn, rt)",pt:"Latino (com as retroflexas rd, rl, rn, rt)",ru:"Латиница (с ретрофлексными rd, rl, rn, rt)",uk:"Латиниця (з ретрофлексними rd, rl, rn, rt)",ar:"اللاتينية (مع الأصوات الالتوائية rd وrl وrn وrt)",he:"לטיני (עם העיצורים הרטרופלקסיים rd, rl, rn, rt)",sw:"Kilatini (chenye viretrofleksi rd, rl, rn, rt)"},
    "No (Australia has no official language at federal level; English is the de facto national language)": {ja:"公用語ではない（オーストラリアには連邦レベルの公用語がない。英語が事実上の国語）",ko:"공용어 아님(호주는 연방 차원의 공용어가 없음. 영어가 사실상의 국가 언어)",zh:"否（澳大利亚在联邦层面无官方语言；英语是事实上的国家语言）",yue:"否（澳洲喺聯邦層面冇官方語言；英語係事實上嘅國家語言）",vi:"Không (Úc không có ngôn ngữ chính thức ở cấp liên bang; tiếng Anh là ngôn ngữ quốc gia trên thực tế)",th:"ไม่ (ออสเตรเลียไม่มีภาษาราชการในระดับสหพันธรัฐ ภาษาอังกฤษเป็นภาษาประจำชาติโดยพฤตินัย)",id:"Tidak (Australia tidak memiliki bahasa resmi di tingkat federal; bahasa Inggris adalah bahasa nasional de facto)",hi:"नहीं (ऑस्ट्रेलिया में संघीय स्तर पर कोई आधिकारिक भाषा नहीं है; अंग्रेज़ी वस्तुतः (de facto) राष्ट्रीय भाषा है)",de:"Nein (Australien hat auf Bundesebene keine Amtssprache; Englisch ist de facto die Nationalsprache)",fr:"Non (l'Australie n'a pas de langue officielle au niveau fédéral ; l'anglais est de facto la langue nationale)",it:"No (l'Australia non ha una lingua ufficiale a livello federale; l'inglese è la lingua nazionale de facto)",es:"No (Australia no tiene lengua oficial a nivel federal; el inglés es la lengua nacional de facto)",pt:"Não (a Austrália não tem língua oficial em âmbito federal; o inglês é a língua nacional de facto)",ru:"Нет (в Австралии нет официального языка на федеральном уровне; английский — де-факто национальный язык)",uk:"Ні (Австралія не має офіційної мови на федеральному рівні; англійська є фактичною національною мовою)",ar:"لا (ليس لأستراليا لغة رسمية على المستوى الاتحادي؛ والإنجليزية هي اللغة الوطنية بحكم الأمر الواقع)",he:"לא (לאוסטרליה אין שפה רשמית ברמה הפדרלית; אנגלית היא השפה הלאומית דה פקטו)",sw:"Hapana (Australia haina lugha rasmi katika ngazi ya shirikisho; Kiingereza ndiyo lugha ya taifa kwa uhalisia)"},
    "~50 fluent + heritage learners": {ja:"流暢な話者約50人＋継承語学習者",ko:"유창한 화자 약 50명 + 계승어 학습자",zh:"约50人流利，另有传承语学习者",yue:"約50人流利，另有傳承語學習者",vi:"~50 người nói thành thạo + người học kế thừa",th:"~50 คนพูดคล่อง + ผู้เรียนเชื้อสาย",id:"~50 penutur fasih + pembelajar bahasa warisan",hi:"~50 धाराप्रवाह वक्ता + विरासत-भाषा शिक्षार्थी",de:"~50 fließende Sprecher + Herkunftssprachenlernende",fr:"~50 locuteurs courants + apprenants de langue d'héritage",it:"~50 parlanti fluenti + apprendenti di eredità",es:"~50 hablantes fluidos + aprendices de herencia",pt:"~50 falantes fluentes + aprendizes de herança",ru:"~50 свободно владеющих + изучающие как наследственный язык",uk:"~50 вільно володіють + спадкові учні",ar:"~50 متحدثًا بطلاقة + متعلمون من أبناء التراث",he:"~50 דוברים שוטפים + לומדי מורשת",sw:"~50 wasemaji fasaha + wanafunzi wa urithi"},
    "~5K heritage learners": {ja:"継承語学習者約5K",ko:"계승어 학습자 약 5K",zh:"约5K传承语学习者",yue:"約5K傳承語學習者",vi:"~5K người học kế thừa",th:"~5K ผู้เรียนเชื้อสาย",id:"~5K pembelajar bahasa warisan",hi:"~5K विरासत-भाषा शिक्षार्थी",de:"~5K Herkunftssprachenlernende",fr:"~5K apprenants de langue d'héritage",it:"~5K apprendenti di eredità",es:"~5K aprendices de herencia",pt:"~5K aprendizes de herança",ru:"~5K изучающих как наследственный язык",uk:"~5K спадкових учнів",ar:"~5K من متعلمي لغة التراث",he:"~5K לומדי מורשת",sw:"~5K wanafunzi wa urithi"},
    "No (Assamese is the sole official language of Assam)": {ja:"公用語ではない（アッサム州の公用語はアッサム語のみ）",ko:"공용어 아님(아삼주의 유일한 공용어는 아삼어)",zh:"否（阿萨姆语是阿萨姆邦唯一的官方语言）",yue:"否（阿薩姆語係阿薩姆邦唯一嘅官方語言）",vi:"Không (tiếng Assam là ngôn ngữ chính thức duy nhất của bang Assam)",th:"ไม่ (ภาษาอัสสัมเป็นภาษาราชการเพียงภาษาเดียวของรัฐอัสสัม)",id:"Tidak (bahasa Assam adalah satu-satunya bahasa resmi Assam)",hi:"नहीं (असमिया असम की एकमात्र राजभाषा है)",de:"Nein (Assamesisch ist die einzige Amtssprache von Assam)",fr:"Non (l'assamais est la seule langue officielle de l'Assam)",it:"No (l'assamese è l'unica lingua ufficiale dell'Assam)",es:"No (el asamés es la única lengua oficial de Assam)",pt:"Não (o assamês é a única língua oficial de Assam)",ru:"Нет (ассамский — единственный официальный язык штата Ассам)",uk:"Ні (єдина офіційна мова Ассаму — ассамська)",ar:"لا (الأسامية هي اللغة الرسمية الوحيدة في ولاية آسام)",he:"לא (אסאמית היא השפה הרשמית היחידה של אסאם)",sw:"Hapana (Kiassam ndiyo lugha pekee rasmi ya Assam)"},
    "No (Standard Hindi is the sole official language of Arunachal Pradesh; English is widely used)": {ja:"公用語ではない（アルナーチャル・プラデーシュ州の公用語は標準ヒンディー語のみ。英語も広く使われる）",ko:"공용어 아님(아루나찰프라데시주의 유일한 공용어는 표준 힌디어. 영어도 널리 쓰임)",zh:"否（标准印地语是阿鲁纳恰尔邦唯一的官方语言；英语使用广泛）",yue:"否（標準印地語係阿魯納恰爾邦唯一嘅官方語言；英語使用廣泛）",vi:"Không (tiếng Hindi chuẩn là ngôn ngữ chính thức duy nhất của bang Arunachal Pradesh; tiếng Anh được dùng rộng rãi)",th:"ไม่ (ภาษาฮินดีมาตรฐานเป็นภาษาราชการเพียงภาษาเดียวของรัฐอรุณาจัลประเทศ ส่วนภาษาอังกฤษใช้กันอย่างแพร่หลาย)",id:"Tidak (bahasa Hindi Standar adalah satu-satunya bahasa resmi Arunachal Pradesh; bahasa Inggris digunakan secara luas)",hi:"नहीं (मानक हिन्दी अरुणाचल प्रदेश की एकमात्र राजभाषा है; अंग्रेज़ी का व्यापक प्रयोग होता है)",de:"Nein (Standard-Hindi ist die einzige Amtssprache von Arunachal Pradesh; Englisch ist weit verbreitet)",fr:"Non (le hindi standard est la seule langue officielle de l'Arunachal Pradesh ; l'anglais est largement employé)",it:"No (l'hindi standard è l'unica lingua ufficiale dell'Arunachal Pradesh; l'inglese è ampiamente usato)",es:"No (el hindi estándar es la única lengua oficial de Arunachal Pradesh; el inglés es de uso extendido)",pt:"Não (o hindi padrão é a única língua oficial de Arunachal Pradesh; o inglês é amplamente usado)",ru:"Нет (стандартный хинди — единственный официальный язык штата Аруначал-Прадеш; английский широко используется)",uk:"Ні (єдина офіційна мова Аруначал-Прадешу — стандартна гінді; англійська широко вживана)",ar:"لا (الهندية المعيارية هي اللغة الرسمية الوحيدة في أروناتشال براديش؛ والإنجليزية مستخدمة على نطاق واسع)",he:"לא (הינדי תקנית היא השפה הרשמית היחידה של ארונאצ׳ל פראדש; אנגלית בשימוש נרחב)",sw:"Hapana (Kihindi Sanifu ndiyo lugha pekee rasmi ya Arunachal Pradesh; Kiingereza hutumika sana)"},
    "No (Manipuri is the sole state official language in Manipur; Tangkhul is recognized regionally)": {ja:"公用語ではない（マニプル州の州公用語はマニプリ語のみ。タンクル語は地域レベルで認定）",ko:"공용어 아님(마니푸르주의 유일한 주 공용어는 마니푸르어. 탕쿨어는 지역 차원에서 인정)",zh:"否（曼尼普尔语是曼尼普尔邦唯一的邦官方语言；唐库尔语在地区层面获承认）",yue:"否（曼尼普爾語係曼尼普爾邦唯一嘅邦官方語言；唐庫爾語喺地區層面獲承認）",vi:"Không (tiếng Manipuri là ngôn ngữ chính thức duy nhất của bang Manipur; tiếng Tangkhul được công nhận ở cấp vùng)",th:"ไม่ (ภาษามณีปุระเป็นภาษาราชการของรัฐเพียงภาษาเดียวในรัฐมณีปุระ ส่วนภาษาตังคุลได้รับการรับรองในระดับภูมิภาค)",id:"Tidak (bahasa Manipuri adalah satu-satunya bahasa resmi negara bagian di Manipur; Tangkhul diakui secara regional)",hi:"नहीं (मणिपुरी मणिपुर की एकमात्र राज्य राजभाषा है; तांगखुल को क्षेत्रीय स्तर पर मान्यता प्राप्त है)",de:"Nein (Manipuri ist die einzige Amtssprache des Bundesstaates Manipur; Tangkhul ist regional anerkannt)",fr:"Non (le manipuri est la seule langue officielle de l'État du Manipur ; le tangkhul est reconnu au niveau régional)",it:"No (il manipuri è l'unica lingua ufficiale statale nel Manipur; il tangkhul è riconosciuto a livello regionale)",es:"No (el manipuri es la única lengua oficial del estado de Manipur; el tangkhul está reconocido a nivel regional)",pt:"Não (o manipuri é a única língua oficial do estado de Manipur; o tangkhul é reconhecido regionalmente)",ru:"Нет (манипури — единственный официальный язык штата Манипур; тангкхул признан на региональном уровне)",uk:"Ні (єдина офіційна мова штату Маніпур — маніпурі; тангкхул визнана на регіональному рівні)",ar:"لا (المانيبورية هي اللغة الرسمية الوحيدة لولاية مانيبور؛ والتانغخولية معترف بها إقليميًا)",he:"לא (מניפורית היא השפה הרשמית היחידה של מדינת מניפור; טנגחול מוכרת ברמה האזורית)",sw:"Hapana (Kimanipuri ndiyo lugha pekee rasmi ya jimbo la Manipur; Kitangkhul kinatambuliwa kikanda)"},
    "No (Dzongkha is the sole national language of Bhutan)": {ja:"公用語ではない（ブータンの国語はゾンカ語のみ）",ko:"공용어 아님(부탄의 유일한 국가 언어는 종카어)",zh:"否（宗卡语是不丹唯一的国家语言）",yue:"否（宗卡語係不丹唯一嘅國家語言）",vi:"Không (tiếng Dzongkha là ngôn ngữ quốc gia duy nhất của Bhutan)",th:"ไม่ (ภาษาซองคาเป็นภาษาประจำชาติเพียงภาษาเดียวของภูฏาน)",id:"Tidak (bahasa Dzongkha adalah satu-satunya bahasa nasional Bhutan)",hi:"नहीं (ज़ोंगखा भूटान की एकमात्र राष्ट्रीय भाषा है)",de:"Nein (Dzongkha ist die einzige Nationalsprache Bhutans)",fr:"Non (le dzongkha est la seule langue nationale du Bhoutan)",it:"No (il dzongkha è l'unica lingua nazionale del Bhutan)",es:"No (el dzongkha es la única lengua nacional de Bután)",pt:"Não (o dzongkha é a única língua nacional do Butão)",ru:"Нет (дзонг-кэ — единственный национальный язык Бутана)",uk:"Ні (єдина національна мова Бутану — дзонг-ке)",ar:"لا (الدزونغخا هي اللغة الوطنية الوحيدة في بوتان)",he:"לא (דזונגקה היא השפה הלאומית היחידה של בהוטן)",sw:"Hapana (Kidzongkha ndiyo lugha pekee ya taifa ya Bhutan)"},
    "No (Indonesian is the sole official language; regional languages are protected under Article 32 of the Constitution)": {ja:"公用語ではない（公用語はインドネシア語のみ。地域言語は憲法第32条により保護）",ko:"공용어 아님(유일한 공용어는 인도네시아어. 지역 언어는 헌법 제32조에 따라 보호)",zh:"否（印尼语是唯一的官方语言；地方语言受宪法第32条保护）",yue:"否（印尼語係唯一嘅官方語言；地方語言受憲法第32條保護）",vi:"Không (tiếng Indonesia là ngôn ngữ chính thức duy nhất; các ngôn ngữ vùng được bảo hộ theo Điều 32 Hiến pháp)",th:"ไม่ (ภาษาอินโดนีเซียเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาประจำภูมิภาคได้รับความคุ้มครองตามมาตรา 32 ของรัฐธรรมนูญ)",id:"Tidak (bahasa Indonesia adalah satu-satunya bahasa resmi; bahasa daerah dilindungi berdasarkan Pasal 32 UUD)",hi:"नहीं (इंडोनेशियाई एकमात्र आधिकारिक भाषा है; क्षेत्रीय भाषाएँ संविधान के अनुच्छेद 32 के तहत संरक्षित हैं)",de:"Nein (Indonesisch ist die einzige Amtssprache; Regionalsprachen sind nach Artikel 32 der Verfassung geschützt)",fr:"Non (l'indonésien est la seule langue officielle ; les langues régionales sont protégées par l'article 32 de la Constitution)",it:"No (l'indonesiano è l'unica lingua ufficiale; le lingue regionali sono tutelate dall'articolo 32 della Costituzione)",es:"No (el indonesio es la única lengua oficial; las lenguas regionales están protegidas por el artículo 32 de la Constitución)",pt:"Não (o indonésio é a única língua oficial; as línguas regionais são protegidas pelo Artigo 32 da Constituição)",ru:"Нет (индонезийский — единственный официальный язык; региональные языки защищены статьёй 32 Конституции)",uk:"Ні (єдина офіційна мова — індонезійська; регіональні мови захищені статтею 32 Конституції)",ar:"لا (الإندونيسية هي اللغة الرسمية الوحيدة؛ واللغات الإقليمية محمية بموجب المادة 32 من الدستور)",he:"לא (אינדונזית היא השפה הרשמית היחידה; שפות אזוריות מוגנות לפי סעיף 32 לחוקה)",sw:"Hapana (Kiindonesia ndiyo lugha pekee rasmi; lugha za kanda zinalindwa chini ya Kifungu cha 32 cha Katiba)"},
    "~80–105K (Ethnologue 6b: threatened)": {ja:"約80〜105K（Ethnologue 6b：脅威にさらされている）",ko:"약 80~105K(Ethnologue 6b: 위협받는 단계)",zh:"约80–105K（Ethnologue 6b：受威胁）",yue:"約80–105K（Ethnologue 6b：受威脅）",vi:"~80–105K (Ethnologue 6b: bị đe dọa)",th:"~80–105K คน (Ethnologue ระดับ 6b: ถูกคุกคาม)",id:"~80–105K (Ethnologue 6b: terancam)",hi:"~80–105K (Ethnologue 6b: संकटग्रस्त)",de:"~80–105K (Ethnologue 6b: bedroht)",fr:"~80–105K (Ethnologue 6b : menacée)",it:"~80–105K (Ethnologue 6b: minacciata)",es:"~80–105K (Ethnologue 6b: amenazada)",pt:"~80–105K (Ethnologue 6b: ameaçada)",ru:"~80–105K (Ethnologue 6b: под угрозой)",uk:"~80–105K (Ethnologue 6b: під загрозою)",ar:"~80–105K (Ethnologue 6b: مهددة)",he:"~80–105K (Ethnologue 6b: בסכנה)",sw:"~80–105K (Ethnologue 6b: iko hatarini)"},
    "No (Filipino/English official; Bikol Central bik is regionally recognized)": {ja:"公用語ではない（フィリピノ語・英語が公用語。中部ビコール語 bik は地域レベルで認定）",ko:"공용어 아님(필리핀어·영어가 공용어. 중부 비콜어 bik는 지역 차원에서 인정)",zh:"否（菲律宾语／英语为官方语言；中比科尔语 bik 在地区层面获承认）",yue:"否（菲律賓語／英語係官方語言；中比科爾語 bik 喺地區層面獲承認）",vi:"Không (tiếng Filipino/tiếng Anh là chính thức; tiếng Bikol Trung tâm bik được công nhận ở cấp vùng)",th:"ไม่ (ภาษาฟิลิปิโนและภาษาอังกฤษเป็นภาษาราชการ ส่วนภาษาบีโกลกลาง bik ได้รับการรับรองในระดับภูมิภาค)",id:"Tidak (Filipino/Inggris resmi; Bikol Central bik diakui secara regional)",hi:"नहीं (फ़िलिपीनो/अंग्रेज़ी आधिकारिक; बिकोल सेंट्रल bik को क्षेत्रीय स्तर पर मान्यता प्राप्त है)",de:"Nein (Filipino/Englisch amtlich; Zentral-Bikol bik ist regional anerkannt)",fr:"Non (le filipino et l'anglais sont officiels ; le bikol central bik est reconnu au niveau régional)",it:"No (filippino/inglese ufficiali; il bikol centrale bik è riconosciuto a livello regionale)",es:"No (filipino/inglés oficiales; el bicolano central bik está reconocido a nivel regional)",pt:"Não (filipino/inglês são oficiais; o bikol central bik é reconhecido regionalmente)",ru:"Нет (официальные — филиппинский и английский; центральный бикольский bik признан на региональном уровне)",uk:"Ні (офіційні — філіппінська/англійська; центральна бікольська bik визнана на регіональному рівні)",ar:"لا (الفلبينية والإنجليزية رسميتان؛ والبيكولية الوسطى bik معترف بها إقليميًا)",he:"לא (פיליפינית/אנגלית רשמיות; ביקול מרכזית bik מוכרת ברמה האזורית)",sw:"Hapana (Kifilipino/Kiingereza ni rasmi; Bikol Central bik inatambuliwa kikanda)"},
    "No (English is the official language of South Sudan; indigenous languages are national languages under the 2011 Constitution)": {ja:"公用語ではない（南スーダンの公用語は英語。2011年憲法により先住民言語は国家言語とされる）",ko:"공용어 아님(남수단의 공용어는 영어. 2011년 헌법에 따라 토착어는 국가 언어)",zh:"否（英语是南苏丹的官方语言；依2011年宪法，原住民语言为国家语言）",yue:"否（英語係南蘇丹嘅官方語言；依2011年憲法，原住民語言係國家語言）",vi:"Không (tiếng Anh là ngôn ngữ chính thức của Nam Sudan; các ngôn ngữ bản địa là ngôn ngữ quốc gia theo Hiến pháp 2011)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการของเซาท์ซูดาน ส่วนภาษาชนพื้นเมืองเป็นภาษาประจำชาติตามรัฐธรรมนูญปี 2011)",id:"Tidak (bahasa Inggris adalah bahasa resmi Sudan Selatan; bahasa-bahasa pribumi berstatus bahasa nasional berdasarkan Konstitusi 2011)",hi:"नहीं (अंग्रेज़ी दक्षिण सूडान की आधिकारिक भाषा है; 2011 के संविधान के तहत देशज भाषाएँ राष्ट्रीय भाषाएँ हैं)",de:"Nein (Englisch ist die Amtssprache des Südsudan; indigene Sprachen sind nach der Verfassung von 2011 Nationalsprachen)",fr:"Non (l'anglais est la langue officielle du Soudan du Sud ; les langues autochtones sont des langues nationales en vertu de la Constitution de 2011)",it:"No (l'inglese è la lingua ufficiale del Sud Sudan; le lingue indigene sono lingue nazionali ai sensi della Costituzione del 2011)",es:"No (el inglés es la lengua oficial de Sudán del Sur; las lenguas indígenas son lenguas nacionales según la Constitución de 2011)",pt:"Não (o inglês é a língua oficial do Sudão do Sul; as línguas indígenas são línguas nacionais pela Constituição de 2011)",ru:"Нет (английский — официальный язык Южного Судана; языки коренных народов являются национальными языками по Конституции 2011 года)",uk:"Ні (офіційна мова Південного Судану — англійська; корінні мови є національними мовами згідно з Конституцією 2011 року)",ar:"لا (الإنجليزية هي اللغة الرسمية في جنوب السودان؛ واللغات الأصلية لغات وطنية بموجب دستور 2011)",he:"לא (אנגלית היא השפה הרשמית של דרום סודן; שפות הילידים הן שפות לאומיות לפי חוקת 2011)",sw:"Hapana (Kiingereza ndiyo lugha rasmi ya Sudan Kusini; lugha za asili ni lugha za taifa chini ya Katiba ya 2011)"},
    "No (Arabic and Tamazight are official in Algeria; Shawiya is a Tamazight variety with no separate status)": {ja:"公用語ではない（アルジェリアではアラビア語とタマジクト語が公用語。シャウイ語はタマジクト語の変種で、独自の地位はない）",ko:"공용어 아님(알제리에서는 아랍어와 타마지그트어가 공용어. 샤위아어는 타마지그트어의 변종으로 별도의 지위는 없음)",zh:"否（阿拉伯语与塔马齐格特语为阿尔及利亚官方语言；沙维亚语属塔马齐格特语变体，无独立地位）",yue:"否（阿拉伯語同塔馬齊格特語係阿爾及利亞官方語言；沙維亞語屬塔馬齊格特語變體，冇獨立地位）",vi:"Không (tiếng Ả Rập và tiếng Tamazight là chính thức ở Algérie; tiếng Shawiya là một biến thể Tamazight, không có quy chế riêng)",th:"ไม่ (ภาษาอาหรับและภาษาทามาไซต์เป็นภาษาราชการในแอลจีเรีย ส่วนภาษาชาวียาเป็นภาษาย่อยของทามาไซต์ที่ไม่มีสถานะแยกต่างหาก)",id:"Tidak (bahasa Arab dan Tamazight resmi di Aljazair; Shawiya adalah ragam Tamazight tanpa status tersendiri)",hi:"नहीं (अल्जीरिया में अरबी और तमाज़ीत आधिकारिक हैं; शाविया तमाज़ीत की एक किस्म है जिसका अलग दर्जा नहीं है)",de:"Nein (Arabisch und Tamazight sind in Algerien amtlich; Schawiya ist eine Tamazight-Varietät ohne eigenen Status)",fr:"Non (l'arabe et le tamazight sont officiels en Algérie ; le chaoui est une variété du tamazight sans statut distinct)",it:"No (l'arabo e il tamazight sono ufficiali in Algeria; lo shawiya è una varietà tamazight priva di status autonomo)",es:"No (el árabe y el tamazight son oficiales en Argelia; el chaui es una variedad tamazight sin estatus propio)",pt:"Não (o árabe e o tamazigue são oficiais na Argélia; o chauia é uma variedade do tamazigue sem estatuto próprio)",ru:"Нет (арабский и тамазигхт — официальные языки Алжира; шауия — вариант тамазигхта без отдельного статуса)",uk:"Ні (офіційні в Алжирі — арабська та тамазігт; шавія є різновидом тамазігт без окремого статусу)",ar:"لا (العربية والأمازيغية رسميتان في الجزائر؛ والشاوية صنف أمازيغي بلا وضع مستقل)",he:"לא (ערבית ותמאזיגת רשמיות באלג׳יריה; שאוויה היא ניב של תמאזיגת ללא מעמד נפרד)",sw:"Hapana (Kiarabu na Kitamazight ni rasmi nchini Algeria; Kishawiya ni lahaja ya Kitamazight isiyo na hadhi yake tofauti)"},
    "~100–450K (depending on definition)": {ja:"約100〜450K（定義により異なる）",ko:"약 100~450K(정의에 따라 다름)",zh:"约100–450K（视定义而定）",yue:"約100–450K（視乎定義而定）",vi:"~100–450K (tùy cách định nghĩa)",th:"~100–450K คน (ขึ้นกับนิยาม)",id:"~100–450K (tergantung definisi)",hi:"~100–450K (परिभाषा पर निर्भर)",de:"~100–450K (je nach Definition)",fr:"~100–450K (selon la définition)",it:"~100–450K (a seconda della definizione)",es:"~100–450K (según la definición)",pt:"~100–450K (dependendo da definição)",ru:"~100–450K (в зависимости от определения)",uk:"~100–450K (залежно від визначення)",ar:"~100–450K (بحسب التعريف)",he:"~100–450K (תלוי בהגדרה)",sw:"~100–450K (kutegemea ufafanuzi)"},
    "No (Spanish is official; Fala has protected status in Extremadura)": {ja:"公用語ではない（公用語はスペイン語。ファラ語はエストレマドゥーラ州で保護される地位を持つ）",ko:"공용어 아님(공용어는 스페인어. 팔라어는 엑스트레마두라주에서 보호 지위를 가짐)",zh:"否（西班牙语为官方语言；法拉语在埃斯特雷马杜拉享有受保护地位）",yue:"否（西班牙語係官方語言；法拉語喺埃斯特雷馬杜拉享有受保護地位）",vi:"Không (tiếng Tây Ban Nha là chính thức; tiếng Fala có quy chế được bảo hộ ở Extremadura)",th:"ไม่ (ภาษาสเปนเป็นภาษาราชการ ส่วนภาษาฟาลามีสถานะได้รับความคุ้มครองในเอกซ์เตรมาดูรา)",id:"Tidak (bahasa Spanyol resmi; Fala berstatus dilindungi di Extremadura)",hi:"नहीं (स्पेनिश आधिकारिक है; एक्स्ट्रेमादुरा में फ़ाला को संरक्षित दर्जा प्राप्त है)",de:"Nein (Spanisch ist amtlich; Fala hat in der Extremadura Schutzstatus)",fr:"Non (l'espagnol est officiel ; le fala bénéficie d'un statut de protection en Estrémadure)",it:"No (lo spagnolo è ufficiale; la fala gode di uno status di tutela in Estremadura)",es:"No (el español es oficial; la fala tiene estatus de protección en Extremadura)",pt:"Não (o espanhol é oficial; o fala tem estatuto de proteção na Estremadura)",ru:"Нет (официальный — испанский; фала имеет статус охраняемого языка в Эстремадуре)",uk:"Ні (офіційна — іспанська; фала має статус захищеної в Естремадурі)",ar:"لا (الإسبانية هي الرسمية؛ وللفالا وضع محمي في إكستريمادورا)",he:"לא (ספרדית היא הרשמית; לפאלה יש מעמד מוגן באקסטרמדורה)",sw:"Hapana (Kihispania ni rasmi; Kifala kina hadhi ya kulindwa Extremadura)"},
    "No (Burmese is the sole official language of Myanmar)": {ja:"公用語ではない（ミャンマーの公用語はビルマ語のみ）",ko:"공용어 아님(미얀마의 유일한 공용어는 버마어)",zh:"否（缅甸语是缅甸唯一的官方语言）",yue:"否（緬甸語係緬甸唯一嘅官方語言）",vi:"Không (tiếng Miến Điện là ngôn ngữ chính thức duy nhất của Myanmar)",th:"ไม่ (ภาษาพม่าเป็นภาษาราชการเพียงภาษาเดียวของเมียนมา)",id:"Tidak (bahasa Burma adalah satu-satunya bahasa resmi Myanmar)",hi:"नहीं (बर्मी म्यांमार की एकमात्र आधिकारिक भाषा है)",de:"Nein (Birmanisch ist die einzige Amtssprache Myanmars)",fr:"Non (le birman est la seule langue officielle du Myanmar)",it:"No (il birmano è l'unica lingua ufficiale del Myanmar)",es:"No (el birmano es la única lengua oficial de Myanmar)",pt:"Não (o birmanês é a única língua oficial de Mianmar)",ru:"Нет (бирманский — единственный официальный язык Мьянмы)",uk:"Ні (єдина офіційна мова М'янми — бірманська)",ar:"لا (البورمية هي اللغة الرسمية الوحيدة في ميانمار)",he:"לא (בורמזית היא השפה הרשמית היחידה של מיאנמר)",sw:"Hapana (Kiburma ndiyo lugha pekee rasmi ya Myanmar)"},
    "Togo (recognized national language alongside Ewe ee and Kabiye kbp)": {ja:"トーゴ（エウェ語 ee、カビエ語 kbp とともに国家言語に認定）",ko:"토고(에웨어 ee, 카비예어 kbp와 함께 국가 언어로 인정)",zh:"多哥（与埃维语 ee 及卡比耶语 kbp 同为受承认的国家语言）",yue:"多哥（同埃維語 ee 及卡比耶語 kbp 一樣係獲承認嘅國家語言）",vi:"Togo (ngôn ngữ quốc gia được công nhận, cùng với tiếng Ewe ee và Kabiye kbp)",th:"โตโก (ภาษาประจำชาติที่ได้รับการรับรอง ร่วมกับภาษาเอเว ee และคาบิเย kbp)",id:"Togo (bahasa nasional yang diakui bersama Ewe ee dan Kabiye kbp)",hi:"टोगो (एवे ee और काबिये kbp के साथ मान्यता प्राप्त राष्ट्रीय भाषा)",de:"Togo (anerkannte Nationalsprache neben Ewe ee und Kabiye kbp)",fr:"Togo (langue nationale reconnue aux côtés de l'éwé ee et du kabiyè kbp)",it:"Togo (lingua nazionale riconosciuta accanto all'ewe ee e al kabiyè kbp)",es:"Togo (lengua nacional reconocida junto al ewé ee y el kabiyé kbp)",pt:"Togo (língua nacional reconhecida ao lado do ewe ee e do kabiyé kbp)",ru:"Того (признанный национальный язык наряду с эве ee и кабье kbp)",uk:"Того (визнана національна мова поряд з еве ee та кабіє kbp)",ar:"توغو (لغة وطنية معترف بها إلى جانب الإيوي ee والكابيي kbp)",he:"טוגו (שפה לאומית מוכרת לצד אווה ee וקביה kbp)",sw:"Togo (lugha ya taifa inayotambuliwa pamoja na Ewe ee na Kabiye kbp)"},
    "No (French is the official language of Benin; Aja is a recognized national language)": {ja:"公用語ではない（ベナンの公用語はフランス語。アジャ語は国家言語として認定）",ko:"공용어 아님(베냉의 공용어는 프랑스어. 아자어는 국가 언어로 인정)",zh:"否（法语是贝宁的官方语言；阿贾语为受承认的国家语言）",yue:"否（法語係貝寧嘅官方語言；阿賈語係獲承認嘅國家語言）",vi:"Không (tiếng Pháp là ngôn ngữ chính thức của Bénin; tiếng Aja là ngôn ngữ quốc gia được công nhận)",th:"ไม่ (ภาษาฝรั่งเศสเป็นภาษาราชการของเบนิน ส่วนภาษาอาจาเป็นภาษาประจำชาติที่ได้รับการรับรอง)",id:"Tidak (bahasa Prancis adalah bahasa resmi Benin; Aja adalah bahasa nasional yang diakui)",hi:"नहीं (फ़्रेंच बेनिन की आधिकारिक भाषा है; अजा एक मान्यता प्राप्त राष्ट्रीय भाषा है)",de:"Nein (Französisch ist die Amtssprache Benins; Aja ist eine anerkannte Nationalsprache)",fr:"Non (le français est la langue officielle du Bénin ; l'adja est une langue nationale reconnue)",it:"No (il francese è la lingua ufficiale del Benin; l'aja è una lingua nazionale riconosciuta)",es:"No (el francés es la lengua oficial de Benín; el aja es una lengua nacional reconocida)",pt:"Não (o francês é a língua oficial do Benim; o aja é uma língua nacional reconhecida)",ru:"Нет (французский — официальный язык Бенина; аджа — признанный национальный язык)",uk:"Ні (офіційна мова Беніну — французька; аджа є визнаною національною мовою)",ar:"لا (الفرنسية هي اللغة الرسمية في بنين؛ والأجا لغة وطنية معترف بها)",he:"לא (צרפתית היא השפה הרשמית של בנין; אג׳ה היא שפה לאומית מוכרת)",sw:"Hapana (Kifaransa ndiyo lugha rasmi ya Benin; Kiaja ni lugha ya taifa inayotambuliwa)"},
    "No (French is the sole official language; Konabéré is a recognized national language)": {ja:"公用語ではない（公用語はフランス語のみ。コナベレ語は国家言語として認定）",ko:"공용어 아님(유일한 공용어는 프랑스어. 코나베레어는 국가 언어로 인정)",zh:"否（法语是唯一的官方语言；Konabéré 为受承认的国家语言）",yue:"否（法語係唯一嘅官方語言；Konabéré 係獲承認嘅國家語言）",vi:"Không (tiếng Pháp là ngôn ngữ chính thức duy nhất; tiếng Konabéré là ngôn ngữ quốc gia được công nhận)",th:"ไม่ (ภาษาฝรั่งเศสเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาโกนาเบเรเป็นภาษาประจำชาติที่ได้รับการรับรอง)",id:"Tidak (bahasa Prancis adalah satu-satunya bahasa resmi; Konabéré adalah bahasa nasional yang diakui)",hi:"नहीं (फ़्रेंच एकमात्र आधिकारिक भाषा है; कोनाबेरे एक मान्यता प्राप्त राष्ट्रीय भाषा है)",de:"Nein (Französisch ist die einzige Amtssprache; Konabéré ist eine anerkannte Nationalsprache)",fr:"Non (le français est la seule langue officielle ; le konabéré est une langue nationale reconnue)",it:"No (il francese è l'unica lingua ufficiale; il konabéré è una lingua nazionale riconosciuta)",es:"No (el francés es la única lengua oficial; el konabéré es una lengua nacional reconocida)",pt:"Não (o francês é a única língua oficial; o konabéré é uma língua nacional reconhecida)",ru:"Нет (французский — единственный официальный язык; конабере — признанный национальный язык)",uk:"Ні (єдина офіційна мова — французька; конабере є визнаною національною мовою)",ar:"لا (الفرنسية هي اللغة الرسمية الوحيدة؛ والكونابيري لغة وطنية معترف بها)",he:"לא (צרפתית היא השפה הרשמית היחידה; קונאברה היא שפה לאומית מוכרת)",sw:"Hapana (Kifaransa ndiyo lugha pekee rasmi; Kikonabéré ni lugha ya taifa inayotambuliwa)"},
    "No (Muscogee Nation recognized; also spoken by the Seminole Tribe of Florida)": {ja:"公用語ではない（マスコギー・ネーションが承認されている。フロリダのセミノール族でも話される）",ko:"공용어 아님(머스코지 네이션이 인정됨. 플로리다 세미놀 부족도 사용)",zh:"否（马斯科吉族获承认；佛罗里达塞米诺尔族亦有使用）",yue:"否（馬斯科吉族獲承認；佛羅里達塞米諾爾族亦有使用）",vi:"Không (Muscogee Nation được công nhận; cũng được bộ tộc Seminole ở Florida sử dụng)",th:"ไม่ (ชนชาติมัสโกกีได้รับการรับรอง และมีผู้พูดในเผ่าเซมิโนลแห่งรัฐฟลอริดาด้วย)",id:"Tidak (Muscogee Nation diakui; juga dituturkan oleh Seminole Tribe of Florida)",hi:"नहीं (मस्कोगी नेशन मान्यता प्राप्त है; फ़्लोरिडा की सेमिनोल जनजाति भी इसे बोलती है)",de:"Nein (Anerkennung durch die Muscogee Nation; auch vom Seminole Tribe of Florida gesprochen)",fr:"Non (reconnue par la Muscogee Nation ; également parlée par la Seminole Tribe of Florida)",it:"No (la Nazione Muscogee è riconosciuta; parlata anche dalla Tribù Seminole della Florida)",es:"No (la Nación Muscogee está reconocida; también la habla la Tribu Seminola de Florida)",pt:"Não (a Nação Muscogee é reconhecida; também falada pela Tribo Seminole da Flórida)",ru:"Нет (нация маскоги признана; на языке говорит также племя семинолов Флориды)",uk:"Ні (націю Маскогі визнано; нею також говорить плем'я семінолів Флориди)",ar:"لا (أمة الماسكوغي معترف بها؛ وتتحدثها أيضًا قبيلة السيمينول في فلوريدا)",he:"לא (אומת המסקוגי מוכרת; מדוברת גם על ידי שבט הסמינולים של פלורידה)",sw:"Hapana (Muscogee Nation inatambuliwa; pia inazungumzwa na kabila la Seminole la Florida)"},
    "USA (Alaska — St. Lawrence Island), Russia (Chukotka)": {ja:"アメリカ合衆国（アラスカ州 ― セントローレンス島）、ロシア（チュコトカ）",ko:"미국(알래스카주 — 세인트로렌스섬), 러시아(추코트카)",zh:"美国（阿拉斯加州——圣劳伦斯岛）、俄罗斯（楚科奇）",yue:"美國（阿拉斯加州——聖勞倫斯島）、俄羅斯（楚科奇）",vi:"Hoa Kỳ (Alaska — đảo St. Lawrence), Nga (Chukotka)",th:"สหรัฐอเมริกา (รัฐอะแลสกา — เกาะเซนต์ลอว์เรนซ์) รัสเซีย (ชูคอตคา)",id:"AS (Alaska — Pulau St. Lawrence), Rusia (Chukotka)",hi:"अमेरिका (अलास्का — सेंट लॉरेंस द्वीप), रूस (चुकोतका)",de:"USA (Alaska — St.-Lorenz-Insel), Russland (Tschukotka)",fr:"États-Unis (Alaska — île Saint-Laurent), Russie (Tchoukotka)",it:"USA (Alaska — isola di San Lorenzo), Russia (Čukotka)",es:"EE. UU. (Alaska — isla de San Lorenzo), Rusia (Chukotka)",pt:"EUA (Alasca — Ilha de São Lourenço), Rússia (Chukotka)",ru:"США (Аляска — остров Святого Лаврентия), Россия (Чукотка)",uk:"США (Аляска — острів Святого Лаврентія), Росія (Чукотка)",ar:"الولايات المتحدة (ألاسكا — جزيرة سانت لورانس)، روسيا (تشوكوتكا)",he:"ארצות הברית (אלסקה — האי סנט לורנס), רוסיה (צ׳וקוטקה)",sw:"Marekani (Alaska — Kisiwa cha St. Lawrence), Urusi (Chukotka)"},
    "No (Russia: recognized indigenous people of the Russian North; USA: federally recognized tribes)": {ja:"公用語ではない（ロシア：ロシア北方の先住少数民族として認定。アメリカ：連邦公認部族）",ko:"공용어 아님(러시아: 러시아 북방의 소수 토착민으로 인정. 미국: 연방 인정 부족)",zh:"否（俄罗斯：受承认的俄罗斯北方原住民族；美国：联邦承认的部落）",yue:"否（俄羅斯：獲承認嘅俄羅斯北方原住民族；美國：聯邦承認嘅部落）",vi:"Không (Nga: được công nhận là dân tộc bản địa của miền Bắc Nga; Hoa Kỳ: các bộ tộc được liên bang công nhận)",th:"ไม่ (รัสเซีย: ได้รับการรับรองเป็นชนพื้นเมืองแห่งภาคเหนือของรัสเซีย สหรัฐอเมริกา: เป็นชนเผ่าที่รัฐบาลกลางรับรอง)",id:"Tidak (Rusia: diakui sebagai masyarakat adat Utara Rusia; AS: suku-suku yang diakui federal)",hi:"नहीं (रूस: रूसी उत्तर के मान्यता प्राप्त मूलनिवासी; अमेरिका: संघीय रूप से मान्यता प्राप्त जनजातियाँ)",de:"Nein (Russland: anerkanntes indigenes Volk des russischen Nordens; USA: auf Bundesebene anerkannte Stämme)",fr:"Non (Russie : peuple autochtone reconnu du Nord russe ; États-Unis : tribus reconnues au niveau fédéral)",it:"No (Russia: popolo indigeno riconosciuto del Nord russo; USA: tribù riconosciute a livello federale)",es:"No (Rusia: pueblo indígena reconocido del Norte ruso; EE. UU.: tribus reconocidas a nivel federal)",pt:"Não (Rússia: povo indígena reconhecido do Norte russo; EUA: tribos reconhecidas federalmente)",ru:"Нет (Россия: признанный коренной малочисленный народ Севера; США: племена, признанные на федеральном уровне)",uk:"Ні (Росія: визнаний корінний народ Російської Півночі; США: федерально визнані племена)",ar:"لا (روسيا: شعب أصلي معترف به من شعوب الشمال الروسي؛ الولايات المتحدة: قبائل معترف بها اتحاديًا)",he:"לא (רוסיה: עם ילידי מוכר של הצפון הרוסי; ארצות הברית: שבטים מוכרים פדרלית)",sw:"Hapana (Urusi: watu wa asili wanaotambuliwa wa Kaskazini mwa Urusi; Marekani: makabila yanayotambuliwa na serikali ya shirikisho)"},
    "No (no federal status; the Northern Arapaho Tribe operates a tribal college and immersion schools)": {ja:"公用語ではない（連邦レベルの地位はない。ノーザン・アラパホ族が部族大学とイマージョン校を運営）",ko:"공용어 아님(연방 차원의 지위는 없음. 노던 아라파호 부족이 부족 대학과 몰입 학교를 운영)",zh:"否（无联邦地位；北阿拉帕霍族设有部落学院与沉浸式学校）",yue:"否（冇聯邦地位；北阿拉帕霍族設有部落學院同沉浸式學校）",vi:"Không (không có quy chế liên bang; bộ tộc Arapaho Bắc vận hành một trường cao đẳng bộ tộc và các trường học đắm mình ngôn ngữ)",th:"ไม่ (ไม่มีสถานะระดับสหพันธรัฐ เผ่าอาราปาโฮเหนือเปิดวิทยาลัยของชนเผ่าและโรงเรียนสอนแบบใช้ภาษาเต็มรูปแบบ)",id:"Tidak (tanpa status federal; Northern Arapaho Tribe menyelenggarakan perguruan tinggi suku dan sekolah imersi)",hi:"नहीं (कोई संघीय दर्जा नहीं; नॉर्दर्न अरापाहो जनजाति एक जनजातीय कॉलेज और इमर्शन स्कूल चलाती है)",de:"Nein (kein Status auf Bundesebene; der Northern Arapaho Tribe betreibt ein Stammescollege und Immersionsschulen)",fr:"Non (aucun statut fédéral ; la Northern Arapaho Tribe gère un collège tribal et des écoles d'immersion)",it:"No (nessuno status federale; la Tribù Arapaho Settentrionale gestisce un college tribale e scuole a immersione)",es:"No (sin estatus federal; la Tribu Arapajó del Norte gestiona un colegio tribal y escuelas de inmersión)",pt:"Não (sem estatuto federal; a Tribo Arapaho do Norte mantém uma faculdade tribal e escolas de imersão)",ru:"Нет (федерального статуса нет; племя северных арапахо содержит племенной колледж и школы языкового погружения)",uk:"Ні (немає федерального статусу; плем'я північних арапахо утримує племінний коледж і школи мовного занурення)",ar:"لا (لا وضع اتحادي؛ وتدير قبيلة أراباهو الشمالية كلية قبلية ومدارس انغماس لغوي)",he:"לא (אין מעמד פדרלי; שבט הארפאהו הצפוני מפעיל מכללה שבטית ובתי ספר בשיטת ההטמעה הלשונית)",sw:"Hapana (hakuna hadhi ya shirikisho; kabila la Arapaho ya Kaskazini linaendesha chuo cha kikabila na shule za kuzamishwa katika lugha)"},
    "No (recognized scheduled tribes)": {ja:"公用語ではない（指定部族として認定されている）",ko:"공용어 아님(지정 부족으로 인정)",zh:"否（属受承认的表列部落）",yue:"否（屬獲承認嘅表列部落）",vi:"Không (được công nhận là bộ tộc trong danh mục Scheduled Tribes)",th:"ไม่ (ได้รับการรับรองเป็นชนเผ่าในบัญชีแนบท้ายรัฐธรรมนูญ)",id:"Tidak (suku terjadwal yang diakui)",hi:"नहीं (मान्यता प्राप्त अनुसूचित जनजातियाँ)",de:"Nein (anerkannte Scheduled Tribes)",fr:"Non (tribus répertoriées reconnues)",it:"No (tribù riconosciute come Scheduled Tribes)",es:"No (tribus reconocidas como Scheduled Tribes)",pt:"Não (reconhecidas como tribos registradas — Scheduled Tribes)",ru:"Нет (признаны зарегистрированными племенами — Scheduled Tribes)",uk:"Ні (визнані як зареєстровані племена)",ar:"لا (قبائل مجدولة معترف بها)",he:"לא (שבטים רשומים מוכרים)",sw:"Hapana (makabila yaliyoorodheshwa yanayotambuliwa)"},
    "No nationally (Spanish is official; indigenous languages are official for indigenous peoples under Article 9 of the 1999 Venezuelan Constitution)": {ja:"国レベルでは公用語ではない（公用語はスペイン語。1999年ベネズエラ憲法第9条により、先住民言語は先住民にとって公用語）",ko:"국가 차원에서는 공용어 아님(공용어는 스페인어. 1999년 베네수엘라 헌법 제9조에 따라 토착어는 토착민에게 공용어)",zh:"全国范围内否（西班牙语为官方语言；依1999年委内瑞拉宪法第9条，原住民语言对原住民族而言为官方语言）",yue:"全國範圍內否（西班牙語係官方語言；依1999年委內瑞拉憲法第9條，原住民語言對原住民族而言係官方語言）",vi:"Không ở cấp quốc gia (tiếng Tây Ban Nha là chính thức; các ngôn ngữ bản địa là ngôn ngữ chính thức đối với các dân tộc bản địa theo Điều 9 Hiến pháp Venezuela 1999)",th:"ไม่ในระดับประเทศ (ภาษาสเปนเป็นภาษาราชการ ส่วนภาษาชนพื้นเมืองเป็นภาษาราชการสำหรับชนพื้นเมืองตามมาตรา 9 ของรัฐธรรมนูญเวเนซุเอลา ปี 1999)",id:"Tidak secara nasional (bahasa Spanyol resmi; bahasa-bahasa pribumi bersifat resmi bagi masyarakat adat berdasarkan Pasal 9 Konstitusi Venezuela 1999)",hi:"राष्ट्रीय स्तर पर नहीं (स्पेनिश आधिकारिक है; 1999 के वेनेज़ुएला संविधान के अनुच्छेद 9 के तहत देशज भाषाएँ मूलनिवासी लोगों के लिए आधिकारिक हैं)",de:"National nein (Spanisch ist amtlich; indigene Sprachen sind nach Artikel 9 der venezolanischen Verfassung von 1999 für indigene Völker amtlich)",fr:"Non au niveau national (l'espagnol est officiel ; les langues autochtones sont officielles pour les peuples autochtones en vertu de l'article 9 de la Constitution vénézuélienne de 1999)",it:"Non a livello nazionale (lo spagnolo è ufficiale; le lingue indigene sono ufficiali per i popoli indigeni ai sensi dell'articolo 9 della Costituzione venezuelana del 1999)",es:"No a nivel nacional (el español es oficial; las lenguas indígenas son oficiales para los pueblos indígenas según el artículo 9 de la Constitución venezolana de 1999)",pt:"Não em âmbito nacional (o espanhol é oficial; as línguas indígenas são oficiais para os povos indígenas pelo Artigo 9 da Constituição venezuelana de 1999)",ru:"Нет на общенациональном уровне (официальный — испанский; языки коренных народов официальны для коренных народов согласно статье 9 Конституции Венесуэлы 1999 года)",uk:"Ні на загальнодержавному рівні (офіційна — іспанська; корінні мови є офіційними для корінних народів згідно зі статтею 9 Конституції Венесуели 1999 року)",ar:"لا على المستوى الوطني (الإسبانية هي الرسمية؛ واللغات الأصلية رسمية للشعوب الأصلية بموجب المادة 9 من الدستور الفنزويلي لعام 1999)",he:"לא ברמה הלאומית (ספרדית היא הרשמית; שפות ילידים הן רשמיות עבור העמים הילידים לפי סעיף 9 לחוקת ונצואלה מ-1999)",sw:"Hapana kitaifa (Kihispania ni rasmi; lugha za asili ni rasmi kwa watu wa asili chini ya Kifungu cha 9 cha Katiba ya Venezuela ya 1999)"},
    "No (English is the sole official language of Liberia; Bassa is a major vernacular)": {ja:"公用語ではない（リベリアの公用語は英語のみ。バサ語は主要な日常語）",ko:"공용어 아님(라이베리아의 유일한 공용어는 영어. 바사어는 주요 일상어)",zh:"否（英语是利比里亚唯一的官方语言；巴萨语为主要口语）",yue:"否（英語係利比里亞唯一嘅官方語言；巴薩語係主要口語）",vi:"Không (tiếng Anh là ngôn ngữ chính thức duy nhất của Liberia; tiếng Bassa là một khẩu ngữ lớn)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการเพียงภาษาเดียวของไลบีเรีย ส่วนภาษาบาสซาเป็นภาษาพื้นถิ่นหลักภาษาหนึ่ง)",id:"Tidak (bahasa Inggris adalah satu-satunya bahasa resmi Liberia; Bassa adalah bahasa sehari-hari utama)",hi:"नहीं (अंग्रेज़ी लाइबेरिया की एकमात्र आधिकारिक भाषा है; बासा एक प्रमुख बोलचाल की भाषा है)",de:"Nein (Englisch ist die einzige Amtssprache Liberias; Bassa ist eine bedeutende Umgangssprache)",fr:"Non (l'anglais est la seule langue officielle du Liberia ; le bassa est un vernaculaire majeur)",it:"No (l'inglese è l'unica lingua ufficiale della Liberia; il bassa è un importante vernacolo)",es:"No (el inglés es la única lengua oficial de Liberia; el bassa es un vernáculo importante)",pt:"Não (o inglês é a única língua oficial da Libéria; o bassa é um dos principais vernáculos)",ru:"Нет (английский — единственный официальный язык Либерии; басса — один из основных разговорных языков)",uk:"Ні (єдина офіційна мова Ліберії — англійська; басса є однією з основних розмовних мов)",ar:"لا (الإنجليزية هي اللغة الرسمية الوحيدة في ليبيريا؛ والباسا لغة منطوقة رئيسية)",he:"לא (אנגלית היא השפה הרשמית היחידה של ליבריה; באסה היא לשון מדוברת מרכזית)",sw:"Hapana (Kiingereza ndiyo lugha pekee rasmi ya Liberia; Kibassa ni lugha kuu ya mazungumzo)"},
    "No (Indonesian is the sole official language; Ambon Malay is the regional lingua franca)": {ja:"公用語ではない（公用語はインドネシア語のみ。アンボン・マレー語は地域の共通語）",ko:"공용어 아님(유일한 공용어는 인도네시아어. 암본 말레이어는 지역 공통어)",zh:"否（印尼语是唯一的官方语言；安汶马来语为当地通用语）",yue:"否（印尼語係唯一嘅官方語言；安汶馬來語係當地通用語）",vi:"Không (tiếng Indonesia là ngôn ngữ chính thức duy nhất; tiếng Mã Lai Ambon là ngôn ngữ giao tiếp chung của vùng)",th:"ไม่ (ภาษาอินโดนีเซียเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษามลายูอัมบนเป็นภาษากลางประจำภูมิภาค)",id:"Tidak (bahasa Indonesia adalah satu-satunya bahasa resmi; Melayu Ambon adalah lingua franca regional)",hi:"नहीं (इंडोनेशियाई एकमात्र आधिकारिक भाषा है; अंबोन मलय क्षेत्रीय संपर्क भाषा (lingua franca) है)",de:"Nein (Indonesisch ist die einzige Amtssprache; Ambon-Malaiisch ist die regionale Verkehrssprache)",fr:"Non (l'indonésien est la seule langue officielle ; le malais d'Ambon est la lingua franca régionale)",it:"No (l'indonesiano è l'unica lingua ufficiale; il malese di Ambon è la lingua franca regionale)",es:"No (el indonesio es la única lengua oficial; el malayo de Ambon es la lengua franca regional)",pt:"Não (o indonésio é a única língua oficial; o malaio de Ambon é a língua franca regional)",ru:"Нет (индонезийский — единственный официальный язык; амбонский малайский — региональный лингва франка)",uk:"Ні (єдина офіційна мова — індонезійська; амбонська малайська є регіональною лінгва франка)",ar:"لا (الإندونيسية هي اللغة الرسمية الوحيدة؛ والمالايوية الأمبونية هي لغة التخاطب المشتركة إقليميًا)",he:"לא (אינדונזית היא השפה הרשמית היחידה; מלאית אמבון היא הלינגואה פרנקה האזורית)",sw:"Hapana (Kiindonesia ndiyo lugha pekee rasmi; Kimalei cha Ambon ndiyo lugha ya mawasiliano ya kanda)"},
    "No (Indonesian is the sole official language; North Moluccan Malay is the regional lingua franca)": {ja:"公用語ではない（公用語はインドネシア語のみ。北マルク・マレー語は地域の共通語）",ko:"공용어 아님(유일한 공용어는 인도네시아어. 북말루쿠 말레이어는 지역 공통어)",zh:"否（印尼语是唯一的官方语言；北马鲁古马来语为当地通用语）",yue:"否（印尼語係唯一嘅官方語言；北馬魯古馬來語係當地通用語）",vi:"Không (tiếng Indonesia là ngôn ngữ chính thức duy nhất; tiếng Mã Lai Bắc Maluku là ngôn ngữ giao tiếp chung của vùng)",th:"ไม่ (ภาษาอินโดนีเซียเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษามลายูโมลุกกะเหนือเป็นภาษากลางประจำภูมิภาค)",id:"Tidak (bahasa Indonesia adalah satu-satunya bahasa resmi; Melayu Maluku Utara adalah lingua franca regional)",hi:"नहीं (इंडोनेशियाई एकमात्र आधिकारिक भाषा है; उत्तरी मोलुकन मलय क्षेत्रीय संपर्क भाषा (lingua franca) है)",de:"Nein (Indonesisch ist die einzige Amtssprache; Nordmolukken-Malaiisch ist die regionale Verkehrssprache)",fr:"Non (l'indonésien est la seule langue officielle ; le malais des Moluques du Nord est la lingua franca régionale)",it:"No (l'indonesiano è l'unica lingua ufficiale; il malese delle Molucche settentrionali è la lingua franca regionale)",es:"No (el indonesio es la única lengua oficial; el malayo de las Molucas Septentrionales es la lengua franca regional)",pt:"Não (o indonésio é a única língua oficial; o malaio das Molucas do Norte é a língua franca regional)",ru:"Нет (индонезийский — единственный официальный язык; северомолуккский малайский — региональный лингва франка)",uk:"Ні (єдина офіційна мова — індонезійська; північномолуккська малайська є регіональною лінгва франка)",ar:"لا (الإندونيسية هي اللغة الرسمية الوحيدة؛ والمالايوية المولوكية الشمالية هي لغة التخاطب المشتركة إقليميًا)",he:"לא (אינדונזית היא השפה הרשמית היחידה; מלאית מולוקו הצפונית היא הלינגואה פרנקה האזורית)",sw:"Hapana (Kiindonesia ndiyo lugha pekee rasmi; Kimalei cha Maluku ya Kaskazini ndiyo lugha ya mawasiliano ya kanda)"},
    "Latin (with thaa, dh, w', q for special phonemes)": {ja:"ラテン文字（特殊音素に thaa、dh、w'、q を使用）",ko:"라틴 문자(특수 음소에 thaa, dh, w', q 사용)",zh:"拉丁字母（以 thaa、dh、w'、q 表示特殊音位）",yue:"拉丁字母（以 thaa、dh、w'、q 表示特殊音位）",vi:"Latinh (dùng thaa, dh, w', q cho các âm vị đặc biệt)",th:"อักษรละติน (ใช้ thaa, dh, w', q แทนหน่วยเสียงพิเศษ)",id:"Latin (dengan thaa, dh, w', q untuk fonem khusus)",hi:"लैटिन (विशेष स्वनिमों के लिए thaa, dh, w', q सहित)",de:"Lateinisch (mit thaa, dh, w', q für Sonderphoneme)",fr:"Latin (avec thaa, dh, w', q pour les phonèmes particuliers)",it:"Latino (con thaa, dh, w', q per i fonemi speciali)",es:"Latino (con thaa, dh, w', q para los fonemas especiales)",pt:"Latino (com thaa, dh, w', q para fonemas especiais)",ru:"Латиница (с thaa, dh, w', q для особых фонем)",uk:"Латиниця (з thaa, dh, w', q для особливих фонем)",ar:"اللاتينية (مع thaa وdh وw' وq للأصوات الخاصة)",he:"לטיני (עם thaa, dh, w', q לפונמות מיוחדות)",sw:"Kilatini (chenye thaa, dh, w', q kwa fonimu maalum)"},
    "Atlantic-Congo (Bantu, Chokwe-Luchazi / K.10 group)": {ja:"大西洋コンゴ語族（バントゥ、チョクウェ・ルチャジ／K.10群）",ko:"대서양콩고어족(반투, 초크웨루차지 / K.10군)",zh:"大西洋-刚果语系（班图语族，Chokwe-Luchazi／K.10 组）",yue:"大西洋-剛果語系（班圖語族，Chokwe-Luchazi／K.10 組）",vi:"Đại Tây Dương – Congo (Bantu, nhóm Chokwe-Luchazi / K.10)",th:"แอตแลนติก-คองโก (บันตู กลุ่มโชกเว-ลูชาซี / K.10)",id:"Atlantik-Kongo (Bantu, kelompok Chokwe-Luchazi / K.10)",hi:"अटलांटिक-कांगो (बंटू, चोकवे-लुचाज़ी / K.10 समूह)",de:"Atlantik-Kongo (Bantu, Chokwe-Luchazi / Gruppe K.10)",fr:"Atlantique-Congo (bantou, chokwe-luchazi / groupe K.10)",it:"Atlantico-congolese (bantu, gruppo chokwe-luchazi / K.10)",es:"Atlántico-congoleña (bantú, grupo chokwe-luchazi / K.10)",pt:"Atlântico-Congo (banto, grupo chokwe-luchazi / K.10)",ru:"Атлантическо-конголезская (банту, группа чокве-лучази / K.10)",uk:"Атлантично-конголезька (банту, чокве-лучазі / група K.10)",ar:"الأطلسية-الكونغوية (البانتوية، مجموعة تشوكوي-لوتشازي / K.10)",he:"אטלנטי-קונגו (בנטו, צ׳וקווה-לוצ׳אזי / קבוצת K.10)",sw:"Atlantic-Congo (Kibantu, kundi la Chokwe-Luchazi / K.10)"},
    "Indo-European (Germanic, West, Frühneuhochdeutsch / Early New High German)": {ja:"インド・ヨーロッパ語族（ゲルマン、西、Frühneuhochdeutsch／初期新高ドイツ語）",ko:"인도유럽어족(게르만, 서게르만, Frühneuhochdeutsch / 초기 신고지 독일어)",zh:"印欧语系（日耳曼语族，西支，Frühneuhochdeutsch／早期新高地德语）",yue:"印歐語系（日耳曼語族，西支，Frühneuhochdeutsch／早期新高地德語）",vi:"Ấn-Âu (German, nhánh Tây, Frühneuhochdeutsch / tiếng Đức Cao địa Tân kỳ sơ kỳ)",th:"อินโด-ยูโรเปียน (เจอร์แมนิก สาขาตะวันตก Frühneuhochdeutsch / ภาษาเยอรมันสูงยุคใหม่ตอนต้น)",id:"Indo-Eropa (Jermanik, Barat, Frühneuhochdeutsch / Jerman Tinggi Baru Awal)",hi:"भारोपीय (जर्मैनिक, पश्चिमी, Frühneuhochdeutsch / प्रारंभिक नव उच्च जर्मन)",de:"Indogermanisch (Germanisch, West, Frühneuhochdeutsch)",fr:"Indo-européen (germanique, occidental, Frühneuhochdeutsch / haut allemand protomoderne)",it:"Indoeuropea (germanica, occidentale, Frühneuhochdeutsch / alto tedesco protomoderno)",es:"Indoeuropea (germánica, occidental, Frühneuhochdeutsch / alto alemán moderno temprano)",pt:"Indo-europeia (germânica, ocidental, Frühneuhochdeutsch / alto-alemão protomoderno)",ru:"Индоевропейская (германская, западная, Frühneuhochdeutsch / ранненововерхненемецкий)",uk:"Індоєвропейська (германська, західна, Frühneuhochdeutsch / рання нововерхньонімецька)",ar:"الهندية الأوروبية (الجرمانية، الغربية، Frühneuhochdeutsch / الألمانية العليا الحديثة المبكرة)",he:"הודו-אירופית (גרמאנית, מערבית, Frühneuhochdeutsch / גרמנית עילית חדשה מוקדמת)",sw:"Kihindi-Ulaya (Kijerumaniki, Magharibi, Frühneuhochdeutsch / Kijerumani cha Juu Kipya cha Awali)"},
    "Saxon chancery (Sächsische Kanzleisprache); de-facto standard of Reformation-era German": {ja:"ザクセン官房語（Sächsische Kanzleisprache）。宗教改革期ドイツ語の事実上の標準",ko:"작센 관방어(Sächsische Kanzleisprache). 종교개혁기 독일어의 사실상 표준",zh:"萨克森官厅语（Sächsische Kanzleisprache）；宗教改革时期德语事实上的标准",yue:"薩克森官廳語（Sächsische Kanzleisprache）；宗教改革時期德語事實上嘅標準",vi:"Văn phong công đường Saxon (Sächsische Kanzleisprache); chuẩn mực trên thực tế của tiếng Đức thời Cải cách Tôn giáo",th:"ภาษาราชสำนักแซกโซนี (Sächsische Kanzleisprache) เป็นมาตรฐานโดยพฤตินัยของภาษาเยอรมันยุคปฏิรูปศาสนา",id:"Bahasa kanselari Sachsen (Sächsische Kanzleisprache); standar de facto bahasa Jerman era Reformasi",hi:"सैक्सन कार्यालयी भाषा (Sächsische Kanzleisprache); सुधार-कालीन जर्मन का वस्तुतः (de facto) मानक",de:"Sächsische Kanzleisprache; De-facto-Standard des Deutschen der Reformationszeit",fr:"Chancellerie saxonne (Sächsische Kanzleisprache) ; standard de facto de l'allemand de l'époque de la Réforme",it:"Cancelleria sassone (Sächsische Kanzleisprache); standard de facto del tedesco dell'età della Riforma",es:"Cancillería sajona (Sächsische Kanzleisprache); estándar de facto del alemán de la época de la Reforma",pt:"Chancelaria saxã (Sächsische Kanzleisprache); padrão de facto do alemão da era da Reforma",ru:"Саксонский канцелярский язык (Sächsische Kanzleisprache); де-факто стандарт немецкого языка эпохи Реформации",uk:"Саксонська канцелярська мова (Sächsische Kanzleisprache); фактичний стандарт німецької доби Реформації",ar:"لغة الديوان السكسوني (Sächsische Kanzleisprache)؛ المعيار الفعلي للألمانية في عصر الإصلاح",he:"לשון הלשכה הסקסונית (Sächsische Kanzleisprache); התקן דה פקטו של הגרמנית בתקופת הרפורמציה",sw:"Lugha ya ofisi ya Saxony (Sächsische Kanzleisprache); kiwango cha uhalisia cha Kijerumani cha enzi ya Matengenezo ya Kanisa"},
    "No (English is the official language of Ghana; Mampruli is used in local education)": {ja:"公用語ではない（ガーナの公用語は英語。マンプルリ語は地元の教育で使用）",ko:"공용어 아님(가나의 공용어는 영어. 맘프룰리어는 지역 교육에서 사용)",zh:"否（英语是加纳的官方语言；曼普鲁利语用于当地教育）",yue:"否（英語係加納嘅官方語言；曼普魯利語用於當地教育）",vi:"Không (tiếng Anh là ngôn ngữ chính thức của Ghana; tiếng Mampruli được dùng trong giáo dục địa phương)",th:"ไม่ (ภาษาอังกฤษเป็นภาษาราชการของกานา ส่วนภาษามัมปรูลีใช้ในการศึกษาระดับท้องถิ่น)",id:"Tidak (bahasa Inggris adalah bahasa resmi Ghana; Mampruli digunakan dalam pendidikan lokal)",hi:"नहीं (अंग्रेज़ी घाना की आधिकारिक भाषा है; माम्प्रुली का प्रयोग स्थानीय शिक्षा में होता है)",de:"Nein (Englisch ist die Amtssprache Ghanas; Mampruli wird im lokalen Bildungswesen verwendet)",fr:"Non (l'anglais est la langue officielle du Ghana ; le mampruli est employé dans l'enseignement local)",it:"No (l'inglese è la lingua ufficiale del Ghana; il mampruli è usato nell'istruzione locale)",es:"No (el inglés es la lengua oficial de Ghana; el mampruli se usa en la enseñanza local)",pt:"Não (o inglês é a língua oficial do Gana; o mampruli é usado no ensino local)",ru:"Нет (английский — официальный язык Ганы; мампрули используется в местном образовании)",uk:"Ні (офіційна мова Гани — англійська; мампрулі вживається в місцевій освіті)",ar:"لا (الإنجليزية هي اللغة الرسمية في غانا؛ والمامبرولية تُستخدم في التعليم المحلي)",he:"לא (אנגלית היא השפה הרשמית של גאנה; מאמפרולי משמשת בחינוך המקומי)",sw:"Hapana (Kiingereza ndiyo lugha rasmi ya Ghana; Kimampruli hutumika katika elimu ya mtaa)"},
    "Mauritius (also Rodrigues; diaspora communities)": {ja:"モーリシャス（ロドリゲス島も。ディアスポラ共同体）",ko:"모리셔스(로드리게스섬 포함. 디아스포라 공동체)",zh:"毛里求斯（另及罗德里格斯岛；以及侨居社群）",yue:"毛里求斯（另有羅德里格斯島；以及僑居社群）",vi:"Mauritius (cả đảo Rodrigues; các cộng đồng hải ngoại)",th:"มอริเชียส (รวมถึงโรดริเกส และชุมชนพลัดถิ่น)",id:"Mauritius (juga Rodrigues; komunitas diaspora)",hi:"मॉरीशस (रॉड्रिग्स भी; प्रवासी समुदाय)",de:"Mauritius (auch Rodrigues; Diasporagemeinschaften)",fr:"Maurice (également Rodrigues ; communautés de la diaspora)",it:"Mauritius (anche Rodrigues; comunità della diaspora)",es:"Mauricio (también Rodrigues; comunidades de la diáspora)",pt:"Maurício (também Rodrigues; comunidades da diáspora)",ru:"Маврикий (также Родригес; общины диаспоры)",uk:"Маврикій (також Родрігес; діаспорні громади)",ar:"موريشيوس (وكذلك رودريغيس؛ ومجتمعات الشتات)",he:"מאוריציוס (וגם רודריגס; קהילות בתפוצות)",sw:"Morisi (pia Rodrigues; jamii za ughaibuni)"},
    "Historical literary form (~70-200 CE); active religious/scholarly use": {ja:"歴史的な文語形（紀元70〜200年頃）。宗教・学術の場で現用",ko:"역사적 문어 형태(서기 70~200년경). 종교·학술 목적으로 현재 사용",zh:"历史书面语形式（约公元70-200年）；仍活跃于宗教与学术用途",yue:"歷史書面語形式（約公元70-200年）；仍活躍於宗教同學術用途",vi:"Dạng văn học lịch sử (~70-200 CN); vẫn được dùng trong tôn giáo và học thuật",th:"รูปแบบวรรณกรรมในประวัติศาสตร์ (~70-200 CE) ยังใช้ในทางศาสนาและวิชาการ",id:"Bentuk sastra historis (~70-200 M); aktif digunakan secara keagamaan/keilmuan",hi:"ऐतिहासिक साहित्यिक रूप (~70-200 ईस्वी); सक्रिय धार्मिक/विद्वत्तापूर्ण उपयोग",de:"Historische Literaturform (~70-200 n. Chr.); aktiver religiöser/wissenschaftlicher Gebrauch",fr:"Forme littéraire historique (~70-200 apr. J.-C.) ; usage religieux et savant actif",it:"Forma letteraria storica (~70-200 d.C.); uso religioso ed erudito attivo",es:"Forma literaria histórica (~70-200 d. C.); uso religioso y erudito activo",pt:"Forma literária histórica (~70-200 d.C.); uso religioso e erudito ativo",ru:"Историческая литературная форма (~70-200 н. э.); активное религиозное и научное использование",uk:"Історична літературна форма (~70-200 рр. н. е.); активне релігійне/наукове вживання",ar:"شكل أدبي تاريخي (~70-200 م)؛ استخدام ديني/علمي نشط",he:"צורה ספרותית היסטורית (~70-200 לספירה); שימוש דתי/מחקרי פעיל",sw:"Umbo la kifasihi la kihistoria (~70-200 BK); matumizi hai ya kidini na kitaaluma"},
    "No (Burmese is the sole official language of Myanmar; Hakha Chin is used in Chin State education)": {ja:"公用語ではない（ミャンマーの公用語はビルマ語のみ。ハカ・チン語はチン州の教育で使用）",ko:"공용어 아님(미얀마의 유일한 공용어는 버마어. 하카친어는 친주 교육에서 사용)",zh:"否（缅甸语是缅甸唯一的官方语言；哈卡钦语用于钦邦的教育）",yue:"否（緬甸語係緬甸唯一嘅官方語言；哈卡欽語用於欽邦嘅教育）",vi:"Không (tiếng Miến Điện là ngôn ngữ chính thức duy nhất của Myanmar; tiếng Hakha Chin được dùng trong giáo dục ở bang Chin)",th:"ไม่ (ภาษาพม่าเป็นภาษาราชการเพียงภาษาเดียวของเมียนมา ส่วนภาษาฮะคาชินใช้ในการศึกษาในรัฐชิน)",id:"Tidak (bahasa Burma adalah satu-satunya bahasa resmi Myanmar; Hakha Chin digunakan dalam pendidikan di Negara Bagian Chin)",hi:"नहीं (बर्मी म्यांमार की एकमात्र आधिकारिक भाषा है; हाखा चिन का प्रयोग चिन राज्य की शिक्षा में होता है)",de:"Nein (Birmanisch ist die einzige Amtssprache Myanmars; Hakha-Chin wird im Bildungswesen des Chin-Staates verwendet)",fr:"Non (le birman est la seule langue officielle du Myanmar ; le hakha chin est employé dans l'enseignement de l'État Chin)",it:"No (il birmano è l'unica lingua ufficiale del Myanmar; l'hakha chin è usato nell'istruzione dello Stato Chin)",es:"No (el birmano es la única lengua oficial de Myanmar; el hakha chin se usa en la enseñanza del estado de Chin)",pt:"Não (o birmanês é a única língua oficial de Mianmar; o hakha chin é usado no ensino no Estado de Chin)",ru:"Нет (бирманский — единственный официальный язык Мьянмы; хакха-чин используется в образовании в штате Чин)",uk:"Ні (єдина офіційна мова М'янми — бірманська; хака-чін вживається в освіті штату Чін)",ar:"لا (البورمية هي اللغة الرسمية الوحيدة في ميانمار؛ وتُستخدم الهاخا تشين في التعليم بولاية تشين)",he:"לא (בורמזית היא השפה הרשמית היחידה של מיאנמר; האקה צ׳ין משמשת בחינוך במדינת צ׳ין)",sw:"Hapana (Kiburma ndiyo lugha pekee rasmi ya Myanmar; Hakha Chin hutumika katika elimu ya Jimbo la Chin)"},
    "No (Eritrea has no official languages but recognizes nine national languages)": {ja:"公用語ではない（エリトリアには公用語がなく、9つの国家言語を認めている）",ko:"공용어 아님(에리트레아는 공용어가 없으며 9개 국가 언어를 인정)",zh:"否（厄立特里亚无官方语言，但承认九种国家语言）",yue:"否（厄立特里亞冇官方語言，但承認九種國家語言）",vi:"Không (Eritrea không có ngôn ngữ chính thức nhưng công nhận chín ngôn ngữ quốc gia)",th:"ไม่ (เอริเทรียไม่มีภาษาราชการ แต่รับรองภาษาประจำชาติเก้าภาษา)",id:"Tidak (Eritrea tidak memiliki bahasa resmi, tetapi mengakui sembilan bahasa nasional)",hi:"नहीं (एरिट्रिया की कोई आधिकारिक भाषा नहीं है, पर वह नौ राष्ट्रीय भाषाओं को मान्यता देता है)",de:"Nein (Eritrea hat keine Amtssprachen, erkennt aber neun Nationalsprachen an)",fr:"Non (l'Érythrée n'a pas de langues officielles mais reconnaît neuf langues nationales)",it:"No (l'Eritrea non ha lingue ufficiali ma riconosce nove lingue nazionali)",es:"No (Eritrea no tiene lenguas oficiales, pero reconoce nueve lenguas nacionales)",pt:"Não (a Eritreia não tem línguas oficiais, mas reconhece nove línguas nacionais)",ru:"Нет (в Эритрее нет официальных языков, но признаны девять национальных языков)",uk:"Ні (Еритрея не має офіційних мов, але визнає дев'ять національних мов)",ar:"لا (ليس لإريتريا لغات رسمية لكنها تعترف بتسع لغات وطنية)",he:"לא (לאריתריאה אין שפות רשמיות אך היא מכירה בתשע שפות לאומיות)",sw:"Hapana (Eritrea haina lugha rasmi lakini inatambua lugha tisa za taifa)"},
    "No (Mandarin is the de facto official language; Formosan languages are national languages under the 2017 Indigenous Languages Development Act)": {ja:"公用語ではない（事実上の公用語は標準中国語。台湾原住民諸語は2017年の原住民族言語発展法により国家言語）",ko:"공용어 아님(사실상의 공용어는 중국어. 대만 원주민 제어는 2017년 원주민족 언어 발전법에 따라 국가 언어)",zh:"否（华语是事实上的官方语言；依2017年《原住民族语言发展法》，台湾南岛语言为国家语言）",yue:"否（華語係事實上嘅官方語言；依2017年《原住民族語言發展法》，台灣南島語言係國家語言）",vi:"Không (tiếng Quan Thoại là ngôn ngữ chính thức trên thực tế; các ngôn ngữ Formosa là ngôn ngữ quốc gia theo Đạo luật Phát triển Ngôn ngữ Bản địa 2017)",th:"ไม่ (ภาษาจีนกลางเป็นภาษาราชการโดยพฤตินัย ส่วนกลุ่มภาษาฟอร์โมซาเป็นภาษาประจำชาติตามพระราชบัญญัติพัฒนาภาษาชนพื้นเมือง ปี 2017)",id:"Tidak (bahasa Mandarin adalah bahasa resmi de facto; bahasa-bahasa Formosa berstatus bahasa nasional berdasarkan Undang-Undang Pengembangan Bahasa Pribumi 2017)",hi:"नहीं (मंदारिन वस्तुतः (de facto) आधिकारिक भाषा है; 2017 के देशज भाषा विकास अधिनियम के तहत फ़ॉर्मोसन भाषाएँ राष्ट्रीय भाषाएँ हैं)",de:"Nein (Mandarin ist de facto die Amtssprache; die Formosa-Sprachen sind nach dem Indigenous Languages Development Act von 2017 Nationalsprachen)",fr:"Non (le mandarin est la langue officielle de facto ; les langues formosanes sont des langues nationales en vertu de l'Indigenous Languages Development Act de 2017)",it:"No (il mandarino è la lingua ufficiale de facto; le lingue formosane sono lingue nazionali ai sensi della legge del 2017 sullo sviluppo delle lingue indigene)",es:"No (el mandarín es la lengua oficial de facto; las lenguas formosanas son lenguas nacionales según la Ley de Desarrollo de las Lenguas Indígenas de 2017)",pt:"Não (o mandarim é a língua oficial de facto; as línguas formosanas são línguas nacionais pela Lei de Desenvolvimento das Línguas Indígenas de 2017)",ru:"Нет (путунхуа — де-факто официальный язык; формозские языки признаны национальными языками по Закону о развитии языков коренных народов 2017 года)",uk:"Ні (фактична офіційна мова — путунхуа; формозькі мови є національними мовами згідно із Законом про розвиток мов корінних народів 2017 року)",ar:"لا (الماندرينية هي اللغة الرسمية بحكم الأمر الواقع؛ ولغات فورموزا لغات وطنية بموجب قانون تطوير لغات الشعوب الأصلية لعام 2017)",he:"לא (מנדרינית היא השפה הרשמית דה פקטו; השפות הפורמוזיות הן שפות לאומיות לפי חוק פיתוח שפות הילידים משנת 2017)",sw:"Hapana (Kimandarini ndiyo lugha rasmi kwa uhalisia; lugha za Formosa ni lugha za taifa chini ya Sheria ya Maendeleo ya Lugha za Asili ya 2017)"},
    "No (Burmese is the sole official language of Myanmar; Palaung is a recognized community language)": {ja:"公用語ではない（ミャンマーの公用語はビルマ語のみ。パラウン語は地域共同体の言語として認定）",ko:"공용어 아님(미얀마의 유일한 공용어는 버마어. 팔라웅어는 인정된 공동체 언어)",zh:"否（缅甸语是缅甸唯一的官方语言；Palaung 语为受承认的社区语言）",yue:"否（緬甸語係緬甸唯一嘅官方語言；Palaung 語係獲承認嘅社區語言）",vi:"Không (tiếng Miến Điện là ngôn ngữ chính thức duy nhất của Myanmar; tiếng Palaung là ngôn ngữ cộng đồng được công nhận)",th:"ไม่ (ภาษาพม่าเป็นภาษาราชการเพียงภาษาเดียวของเมียนมา ส่วนภาษาปะหล่องเป็นภาษาชุมชนที่ได้รับการรับรอง)",id:"Tidak (bahasa Burma adalah satu-satunya bahasa resmi Myanmar; Palaung adalah bahasa komunitas yang diakui)",hi:"नहीं (बर्मी म्यांमार की एकमात्र आधिकारिक भाषा है; पलाउंग एक मान्यता प्राप्त सामुदायिक भाषा है)",de:"Nein (Birmanisch ist die einzige Amtssprache Myanmars; Palaung ist eine anerkannte Gemeinschaftssprache)",fr:"Non (le birman est la seule langue officielle du Myanmar ; le palaung est une langue communautaire reconnue)",it:"No (il birmano è l'unica lingua ufficiale del Myanmar; il palaung è una lingua comunitaria riconosciuta)",es:"No (el birmano es la única lengua oficial de Myanmar; el palaung es una lengua comunitaria reconocida)",pt:"Não (o birmanês é a única língua oficial de Mianmar; o palaung é uma língua comunitária reconhecida)",ru:"Нет (бирманский — единственный официальный язык Мьянмы; палаунг — признанный язык общины)",uk:"Ні (єдина офіційна мова М'янми — бірманська; палаунг є визнаною мовою громади)",ar:"لا (البورمية هي اللغة الرسمية الوحيدة في ميانمار؛ والبالاونغية لغة مجتمعية معترف بها)",he:"לא (בורמזית היא השפה הרשמית היחידה של מיאנמר; פלאונג היא שפה קהילתית מוכרת)",sw:"Hapana (Kiburma ndiyo lugha pekee rasmi ya Myanmar; Kipalaung ni lugha ya jamii inayotambuliwa)"},
    "No (Vietnamese is the sole official language)": {ja:"公用語ではない（公用語はベトナム語のみ）",ko:"공용어 아님(유일한 공용어는 베트남어)",zh:"否（越南语是唯一的官方语言）",yue:"否（越南語係唯一嘅官方語言）",vi:"Không (tiếng Việt là ngôn ngữ chính thức duy nhất)",th:"ไม่ (ภาษาเวียดนามเป็นภาษาราชการเพียงภาษาเดียว)",id:"Tidak (bahasa Vietnam adalah satu-satunya bahasa resmi)",hi:"नहीं (वियतनामी एकमात्र आधिकारिक भाषा है)",de:"Nein (Vietnamesisch ist die einzige Amtssprache)",fr:"Non (le vietnamien est la seule langue officielle)",it:"No (il vietnamita è l'unica lingua ufficiale)",es:"No (el vietnamita es la única lengua oficial)",pt:"Não (o vietnamita é a única língua oficial)",ru:"Нет (вьетнамский — единственный официальный язык)",uk:"Ні (єдина офіційна мова — в'єтнамська)",ar:"لا (الفيتنامية هي اللغة الرسمية الوحيدة)",he:"לא (וייטנאמית היא השפה הרשמית היחידה)",sw:"Hapana (Kivietinamu ndiyo lugha pekee rasmi)"},
    "No (Thai is the sole official language; Lawa is a recognized community hilltribe language)": {ja:"公用語ではない（公用語はタイ語のみ。ラワ語は山地民の共同体言語として認定）",ko:"공용어 아님(유일한 공용어는 태국어. 라와어는 인정된 산악민 공동체 언어)",zh:"否（泰语是唯一的官方语言；拉瓦语为受承认的山地民族社区语言）",yue:"否（泰語係唯一嘅官方語言；拉瓦語係獲承認嘅山地民族社區語言）",vi:"Không (tiếng Thái là ngôn ngữ chính thức duy nhất; tiếng Lawa là ngôn ngữ cộng đồng dân tộc miền núi được công nhận)",th:"ไม่ (ภาษาไทยเป็นภาษาราชการเพียงภาษาเดียว ส่วนภาษาละว้าเป็นภาษาชุมชนชาวเขาที่ได้รับการรับรอง)",id:"Tidak (bahasa Thai adalah satu-satunya bahasa resmi; Lawa adalah bahasa komunitas suku pegunungan yang diakui)",hi:"नहीं (थाई एकमात्र आधिकारिक भाषा है; लावा एक मान्यता प्राप्त सामुदायिक पहाड़ी-जनजातीय भाषा है)",de:"Nein (Thai ist die einzige Amtssprache; Lawa ist eine anerkannte Gemeinschaftssprache eines Bergvolks)",fr:"Non (le thaï est la seule langue officielle ; le lawa est une langue communautaire reconnue d'une ethnie montagnarde)",it:"No (il thai è l'unica lingua ufficiale; il lawa è una lingua comunitaria riconosciuta delle tribù delle colline)",es:"No (el tailandés es la única lengua oficial; el lawa es una lengua comunitaria reconocida de las tribus de las montañas)",pt:"Não (o tailandês é a única língua oficial; o lawa é uma língua comunitária reconhecida das tribos das montanhas)",ru:"Нет (тайский — единственный официальный язык; лава — признанный язык горных племён)",uk:"Ні (єдина офіційна мова — тайська; лава є визнаною мовою гірської народності)",ar:"لا (التايلاندية هي اللغة الرسمية الوحيدة؛ واللاوا لغة مجتمعية معترف بها من لغات قبائل الجبال)",he:"לא (תאית היא השפה הרשמית היחידה; לאווה היא שפה קהילתית מוכרת של שבטי ההרים)",sw:"Hapana (Kithai ndiyo lugha pekee rasmi; Kilawa ni lugha ya jamii ya makabila ya milimani inayotambuliwa)"},
    "~50K (Alta Verapaz + Baja Verapaz Guatemala)": {ja:"約50K（グアテマラのアルタ・ベラパス県＋バハ・ベラパス県）",ko:"약 50K(과테말라 알타베라파스주 + 바하베라파스주)",zh:"约50K（危地马拉上韦拉帕斯省与下韦拉帕斯省）",yue:"約50K（危地馬拉上韋拉帕斯省同下韋拉帕斯省）",vi:"~50K (Alta Verapaz + Baja Verapaz, Guatemala)",th:"~50K คน (อัลตาเบราปัซ + บาฮาเบราปัซ กัวเตมาลา)",id:"~50K (Alta Verapaz + Baja Verapaz, Guatemala)",hi:"~50K (आल्टा वेरापाज़ + बाहा वेरापाज़, ग्वाटेमाला)",de:"~50K (Alta Verapaz + Baja Verapaz, Guatemala)",fr:"~50K (Alta Verapaz + Baja Verapaz, Guatemala)",it:"~50K (Alta Verapaz + Baja Verapaz, Guatemala)",es:"~50K (Alta Verapaz + Baja Verapaz, Guatemala)",pt:"~50K (Alta Verapaz + Baja Verapaz, Guatemala)",ru:"~50K (Альта-Верапас и Баха-Верапас, Гватемала)",uk:"~50K (Альта-Верапас + Баха-Верапас, Гватемала)",ar:"~50K (ألتا فيراباز وباخا فيراباز في غواتيمالا)",he:"~50K (אלטה ורפאס + באחה ורפאס, גוואטמלה)",sw:"~50K (Alta Verapaz + Baja Verapaz, Guatemala)"},
    "No (Spanish is the official language of Costa Rica; indigenous languages are protected under Article 76 of the Constitution)": {ja:"公用語ではない（コスタリカの公用語はスペイン語。先住民言語は憲法第76条により保護）",ko:"공용어 아님(코스타리카의 공용어는 스페인어. 토착어는 헌법 제76조에 따라 보호)",zh:"否（西班牙语是哥斯达黎加的官方语言；原住民语言受宪法第76条保护）",yue:"否（西班牙語係哥斯達黎加嘅官方語言；原住民語言受憲法第76條保護）",vi:"Không (tiếng Tây Ban Nha là ngôn ngữ chính thức của Costa Rica; các ngôn ngữ bản địa được bảo hộ theo Điều 76 Hiến pháp)",th:"ไม่ (ภาษาสเปนเป็นภาษาราชการของคอสตาริกา ส่วนภาษาชนพื้นเมืองได้รับความคุ้มครองตามมาตรา 76 ของรัฐธรรมนูญ)",id:"Tidak (bahasa Spanyol adalah bahasa resmi Kosta Rika; bahasa-bahasa pribumi dilindungi berdasarkan Pasal 76 Konstitusi)",hi:"नहीं (स्पेनिश कोस्टा रीका की आधिकारिक भाषा है; देशज भाषाएँ संविधान के अनुच्छेद 76 के तहत संरक्षित हैं)",de:"Nein (Spanisch ist die Amtssprache Costa Ricas; indigene Sprachen sind nach Artikel 76 der Verfassung geschützt)",fr:"Non (l'espagnol est la langue officielle du Costa Rica ; les langues autochtones sont protégées par l'article 76 de la Constitution)",it:"No (lo spagnolo è la lingua ufficiale della Costa Rica; le lingue indigene sono tutelate dall'articolo 76 della Costituzione)",es:"No (el español es la lengua oficial de Costa Rica; las lenguas indígenas están protegidas por el artículo 76 de la Constitución)",pt:"Não (o espanhol é a língua oficial da Costa Rica; as línguas indígenas são protegidas pelo Artigo 76 da Constituição)",ru:"Нет (испанский — официальный язык Коста-Рики; языки коренных народов защищены статьёй 76 Конституции)",uk:"Ні (офіційна мова Коста-Рики — іспанська; корінні мови захищені статтею 76 Конституції)",ar:"لا (الإسبانية هي اللغة الرسمية في كوستاريكا؛ واللغات الأصلية محمية بموجب المادة 76 من الدستور)",he:"לא (ספרדית היא השפה הרשמית של קוסטה ריקה; שפות ילידים מוגנות לפי סעיף 76 לחוקה)",sw:"Hapana (Kihispania ndiyo lugha rasmi ya Kosta Rika; lugha za asili zinalindwa chini ya Kifungu cha 76 cha Katiba)"},
    "No (Spanish is the official language of Panama; Guna is used in the Guna Yala comarca and in bilingual education)": {ja:"公用語ではない（パナマの公用語はスペイン語。グナ語はグナ・ヤラ特別区と二言語教育で使用）",ko:"공용어 아님(파나마의 공용어는 스페인어. 구나어는 구나얄라 자치구와 이중언어 교육에서 사용)",zh:"否（西班牙语是巴拿马的官方语言；古纳语用于古纳亚拉自治区及双语教育）",yue:"否（西班牙語係巴拿馬嘅官方語言；古納語用於古納亞拉自治區同雙語教育）",vi:"Không (tiếng Tây Ban Nha là ngôn ngữ chính thức của Panama; tiếng Guna được dùng ở khu tự trị Guna Yala và trong giáo dục song ngữ)",th:"ไม่ (ภาษาสเปนเป็นภาษาราชการของปานามา ส่วนภาษากูนาใช้ในเขตปกครองกูนายาลาและในการศึกษาสองภาษา)",id:"Tidak (bahasa Spanyol adalah bahasa resmi Panama; Guna digunakan di comarca Guna Yala dan dalam pendidikan dwibahasa)",hi:"नहीं (स्पेनिश पनामा की आधिकारिक भाषा है; गुना का प्रयोग गुना याला कोमार्का में और द्विभाषी शिक्षा में होता है)",de:"Nein (Spanisch ist die Amtssprache Panamas; Guna wird in der Comarca Guna Yala und im zweisprachigen Unterricht verwendet)",fr:"Non (l'espagnol est la langue officielle du Panama ; le guna est employé dans la comarca de Guna Yala et dans l'enseignement bilingue)",it:"No (lo spagnolo è la lingua ufficiale di Panama; il guna è usato nella comarca di Guna Yala e nell'istruzione bilingue)",es:"No (el español es la lengua oficial de Panamá; el guna se usa en la comarca de Guna Yala y en la educación bilingüe)",pt:"Não (o espanhol é a língua oficial do Panamá; o guna é usado na comarca de Guna Yala e no ensino bilíngue)",ru:"Нет (испанский — официальный язык Панамы; куна используется в комарке Гуна-Яла и в двуязычном образовании)",uk:"Ні (офіційна мова Панами — іспанська; гуна вживається в комарці Гуна-Яла та у двомовній освіті)",ar:"لا (الإسبانية هي اللغة الرسمية في بنما؛ وتُستخدم الغونا في كوماركا غونا يالا وفي التعليم الثنائي اللغة)",he:"לא (ספרדית היא השפה הרשמית של פנמה; גונה משמשת בקומרקה גונה יאלה ובחינוך דו-לשוני)",sw:"Hapana (Kihispania ndiyo lugha rasmi ya Panama; Kiguna hutumika katika comarca ya Guna Yala na katika elimu ya lugha mbili)"},
    "No (German is the official language; Saterland Frisian is a recognized minority language and is co-official in the Saterland municipality)": {ja:"公用語ではない（公用語はドイツ語。ザーターラント・フリジア語は少数言語として認定され、ザーターラント自治体では共同公用語）",ko:"공용어 아님(공용어는 독일어. 자터란트 프리지아어는 소수 언어로 인정되며 자터란트 지자체에서는 공동 공용어)",zh:"否（德语为官方语言；萨特兰弗里西亚语为受承认的少数民族语言，并在萨特兰市镇为共同官方语言）",yue:"否（德語係官方語言；薩特蘭弗里西亞語係獲承認嘅少數族裔語言，並喺薩特蘭市鎮係共同官方語言）",vi:"Không (tiếng Đức là ngôn ngữ chính thức; tiếng Frisia Saterland là ngôn ngữ thiểu số được công nhận và là đồng ngôn ngữ chính thức tại đô thị Saterland)",th:"ไม่ (ภาษาเยอรมันเป็นภาษาราชการ ส่วนภาษาฟรีเซียนซาเทอร์ลันด์เป็นภาษาชนกลุ่มน้อยที่ได้รับการรับรอง และเป็นภาษาราชการร่วมในเทศบาลซาเทอร์ลันด์)",id:"Tidak (bahasa Jerman adalah bahasa resmi; Frisia Saterland adalah bahasa minoritas yang diakui dan ko-resmi di munisipalitas Saterland)",hi:"नहीं (जर्मन आधिकारिक भाषा है; ज़ाटरलैंड फ़्रिसियाई एक मान्यता प्राप्त अल्पसंख्यक भाषा है और ज़ाटरलैंड नगरपालिका में सह-आधिकारिक है)",de:"Nein (Deutsch ist die Amtssprache; Saterfriesisch ist eine anerkannte Minderheitensprache und in der Gemeinde Saterland ko-amtlich)",fr:"Non (l'allemand est la langue officielle ; le frison de Saterland est une langue minoritaire reconnue et co-officielle dans la commune de Saterland)",it:"No (il tedesco è la lingua ufficiale; il frisone del Saterland è una lingua minoritaria riconosciuta ed è co-ufficiale nel comune di Saterland)",es:"No (el alemán es la lengua oficial; el frisón de Saterland es una lengua minoritaria reconocida y es cooficial en el municipio de Saterland)",pt:"Não (o alemão é a língua oficial; o frísio de Saterland é uma língua minoritária reconhecida e é cooficial no município de Saterland)",ru:"Нет (немецкий — официальный язык; затерландский фризский — признанный язык меньшинства и со-официален в общине Затерланд)",uk:"Ні (офіційна мова — німецька; затерландська фризька є визнаною мовою меншини та співофіційною в громаді Затерланд)",ar:"لا (الألمانية هي اللغة الرسمية؛ والفريزية الساترلاندية لغة أقلية معترف بها ورسمية مشتركة في بلدية ساترلاند)",he:"לא (גרמנית היא השפה הרשמית; פריזית זאטרלנד היא שפת מיעוט מוכרת ורשמית משותפת ברשות המקומית זאטרלנד)",sw:"Hapana (Kijerumani ndiyo lugha rasmi; Kifrisia cha Saterland ni lugha ya wachache inayotambuliwa na ni rasmi mwenza katika manispaa ya Saterland)"},
    "Extinct (~1st c. BCE; ~600 documented inscriptions)": {ja:"死語（紀元前1世紀頃。約600点の碑文が記録されている）",ko:"사멸(기원전 1세기경. 약 600점의 비문이 기록됨)",zh:"已消亡（约公元前1世纪；约600件有记录的铭文）",yue:"已消亡（約公元前1世紀；約600件有記錄嘅銘文）",vi:"Đã tuyệt chủng (~thế kỷ 1 TCN; ~600 bi ký được ghi nhận)",th:"สูญแล้ว (~ศตวรรษที่ 1 ก่อน ค.ศ. มีจารึกที่บันทึกไว้ ~600 ชิ้น)",id:"Punah (~abad ke-1 SM; ~600 prasasti terdokumentasi)",hi:"विलुप्त (~पहली शताब्दी ईसा पूर्व; ~600 प्रलेखित अभिलेख)",de:"Ausgestorben (~1. Jh. v. Chr.; ~600 dokumentierte Inschriften)",fr:"Éteinte (~Ier s. av. J.-C. ; ~600 inscriptions documentées)",it:"Estinta (~I sec. a.C.; ~600 iscrizioni documentate)",es:"Extinta (~s. I a. C.; ~600 inscripciones documentadas)",pt:"Extinta (~séc. I a.C.; ~600 inscrições documentadas)",ru:"Мёртвый (~I в. до н. э.; ~600 задокументированных надписей)",uk:"Мертва (~I ст. до н. е.; ~600 задокументованих написів)",ar:"منقرضة (~القرن الأول ق.م؛ ~600 نقش موثق)",he:"נכחדה (~המאה ה-1 לפנה״ס; ~600 כתובות מתועדות)",sw:"Imetoweka (~karne ya 1 KK; ~maandishi 600 yaliyohifadhiwa)"},
    "No (Scheduled Tribe language; some Odia-script literacy)": {ja:"公用語ではない（指定部族の言語。一部でオディア文字による読み書きが行われる）",ko:"공용어 아님(지정 부족 언어. 일부 오디아 문자 문해 활동 존재)",zh:"否（表列部落语言；有一定的奥里亚文识字使用）",yue:"否（表列部落語言；有一定嘅奧里亞文識字使用）",vi:"Không (ngôn ngữ của một Scheduled Tribe; có một mức độ biết chữ bằng chữ Odia)",th:"ไม่ (เป็นภาษาของชนเผ่าในบัญชีแนบท้ายรัฐธรรมนูญ มีการรู้หนังสือด้วยอักษรโอเดียอยู่บ้าง)",id:"Tidak (bahasa Suku Terjadwal; sebagian melek huruf beraksara Odia)",hi:"नहीं (अनुसूचित जनजाति की भाषा; कुछ हद तक ओड़िया लिपि में साक्षरता)",de:"Nein (Sprache einer Scheduled Tribe; teilweise Alphabetisierung in Odia-Schrift)",fr:"Non (langue de tribu répertoriée ; alphabétisation partielle en écriture odia)",it:"No (lingua di una Scheduled Tribe; qualche alfabetizzazione in scrittura odia)",es:"No (lengua de una Scheduled Tribe; cierta alfabetización en escritura odia)",pt:"Não (língua de Scheduled Tribe; alguma alfabetização em escrita odia)",ru:"Нет (язык зарегистрированного племени — Scheduled Tribe; отчасти грамотность на письме ория)",uk:"Ні (мова зареєстрованого племені; часткова письменність письмом орія)",ar:"لا (لغة قبيلة مجدولة؛ مع بعض الإلمام بالقراءة بالكتابة الأورية)",he:"לא (שפה של שבט רשום; אוריינות מסוימת בכתב אודיה)",sw:"Hapana (lugha ya Kabila Lililoorodheshwa; kuna kusoma na kuandika kiasi kwa hati ya Kiodia)"},
    "No (community language; used in bilingual education and Wangka Maya PALC materials)": {ja:"公用語ではない（地域共同体の言語。二言語教育やWangka Maya PALCの教材で使用）",ko:"공용어 아님(공동체 언어. 이중언어 교육과 Wangka Maya PALC 자료에서 사용)",zh:"否（社区语言；用于双语教育及 Wangka Maya PALC 教材）",yue:"否（社區語言；用於雙語教育同 Wangka Maya PALC 教材）",vi:"Không (ngôn ngữ cộng đồng; được dùng trong giáo dục song ngữ và tài liệu của Wangka Maya PALC)",th:"ไม่ (เป็นภาษาชุมชน ใช้ในการศึกษาสองภาษาและในสื่อของ Wangka Maya PALC)",id:"Tidak (bahasa komunitas; digunakan dalam pendidikan dwibahasa dan materi Wangka Maya PALC)",hi:"नहीं (सामुदायिक भाषा; द्विभाषी शिक्षा और Wangka Maya PALC की सामग्री में प्रयुक्त)",de:"Nein (Gemeinschaftssprache; im zweisprachigen Unterricht und in Materialien des Wangka Maya PALC verwendet)",fr:"Non (langue communautaire ; employée dans l'enseignement bilingue et dans les supports du Wangka Maya PALC)",it:"No (lingua comunitaria; usata nell'istruzione bilingue e nei materiali del Wangka Maya PALC)",es:"No (lengua comunitaria; se usa en la educación bilingüe y en los materiales del Wangka Maya PALC)",pt:"Não (língua comunitária; usada no ensino bilíngue e em materiais do Wangka Maya PALC)",ru:"Нет (язык общины; используется в двуязычном образовании и в материалах Wangka Maya PALC)",uk:"Ні (мова громади; вживається у двомовній освіті та в матеріалах Wangka Maya PALC)",ar:"لا (لغة مجتمعية؛ تُستخدم في التعليم الثنائي اللغة وفي مواد Wangka Maya PALC)",he:"לא (שפה קהילתית; משמשת בחינוך דו-לשוני ובחומרי Wangka Maya PALC)",sw:"Hapana (lugha ya jamii; hutumika katika elimu ya lugha mbili na katika machapisho ya Wangka Maya PALC)"},
    "Extinct as literary language (~12c CE, descendant Udi ~6K)": {ja:"文語としては死語（紀元12世紀頃。後継のウディ語は約6K）",ko:"문어로서는 사멸(서기 12세기경, 후계 언어 우디어 약 6K)",zh:"作为书面语已消亡（约公元12世纪，后裔语言乌迪语约6K人）",yue:"作為書面語已消亡（約公元12世紀，後裔語言烏迪語約6K人）",vi:"Đã tuyệt chủng với tư cách ngôn ngữ văn học (~thế kỷ 12 CN, hậu duệ là tiếng Udi ~6K)",th:"สูญแล้วในฐานะภาษาวรรณกรรม (~ศตวรรษที่ 12 หลัง ค.ศ. ภาษาลูกหลานคือภาษาอูดี ~6K คน)",id:"Punah sebagai bahasa sastra (~abad ke-12 M; keturunannya, Udi, ~6K)",hi:"साहित्यिक भाषा के रूप में विलुप्त (~12वीं शताब्दी ईस्वी; वंशज उदी ~6K)",de:"Als Literatursprache ausgestorben (~12. Jh. n. Chr.; Nachfahre Udi ~6K)",fr:"Éteinte comme langue littéraire (~XIIe s. apr. J.-C., descendant oudi ~6K)",it:"Estinta come lingua letteraria (~XII sec. d.C.; discendente udi ~6K)",es:"Extinta como lengua literaria (~s. XII d. C.; descendiente udi ~6K)",pt:"Extinta como língua literária (~séc. XII d.C.; descendente udi ~6K)",ru:"Мёртвый как литературный язык (~XII в. н. э.; потомок — удинский, ~6K)",uk:"Мертва як літературна мова (~XII ст. н. е.; нащадок — удинська, ~6K)",ar:"منقرضة كلغة أدبية (~القرن 12 م، والسليلة الأودية ~6K)",he:"נכחדה כשפה ספרותית (~המאה ה-12 לספירה, צאצאתה אודי ~6K)",sw:"Imetoweka kama lugha ya kifasihi (~karne ya 12 BK, mrithi wake Kiudi ~6K)"},
    "Extinct (last attested c. 5th c. CE)": {ja:"死語（最後の記録は紀元5世紀頃）",ko:"사멸(마지막 기록은 서기 5세기경)",zh:"已消亡（最后见证约为公元5世纪）",yue:"已消亡（最後見證約為公元5世紀）",vi:"Đã tuyệt chủng (chứng tích cuối cùng khoảng thế kỷ 5 CN)",th:"สูญแล้ว (มีหลักฐานครั้งสุดท้ายราวศตวรรษที่ 5 หลัง ค.ศ.)",id:"Punah (terakhir tercatat sekitar abad ke-5 M)",hi:"विलुप्त (अंतिम प्रमाण लगभग 5वीं शताब्दी ईस्वी)",de:"Ausgestorben (zuletzt bezeugt um das 5. Jh. n. Chr.)",fr:"Éteinte (dernière attestation vers le Ve s. apr. J.-C.)",it:"Estinta (ultima attestazione intorno al V sec. d.C.)",es:"Extinta (última atestiguación hacia el s. V d. C.)",pt:"Extinta (última atestação por volta do séc. V d.C.)",ru:"Мёртвый (последняя фиксация ок. V в. н. э.)",uk:"Мертва (останні засвідчення бл. V ст. н. е.)",ar:"منقرضة (آخر شاهد عليها نحو القرن الخامس م)",he:"נכחדה (עדות אחרונה בסביבות המאה ה-5 לספירה)",sw:"Imetoweka (ushahidi wa mwisho takriban karne ya 5 BK)"},
    "~7M (urban Jinan and surrounding Lu prefectures)": {ja:"約7M（済南の市街地および周辺の魯（山東）地区）",ko:"약 7M(지난 도심과 주변 루(산둥) 지역)",zh:"约7M（济南市区及周边鲁地各府）",yue:"約7M（濟南市區及周邊魯地各府）",vi:"~7M (đô thị Tế Nam và các phủ Lỗ lân cận)",th:"~7M คน (เขตเมืองจี่หนานและหัวเมืองแถบหลู่โดยรอบ)",id:"~7M (perkotaan Jinan dan prefektur-prefektur Lu di sekitarnya)",hi:"~7M (शहरी जीनान और आसपास के लू प्रीफ़ेक्चर)",de:"~7M (Stadtgebiet Jinan und umliegende Präfekturen von Lu)",fr:"~7M (Jinan urbain et préfectures environnantes du Lu)",it:"~7M (area urbana di Jinan e prefetture Lu circostanti)",es:"~7M (zona urbana de Jinan y prefecturas Lu circundantes)",pt:"~7M (Jinan urbana e prefeituras vizinhas de Lu)",ru:"~7M (городской Цзинань и окрестные округа Лу)",uk:"~7M (міський Цзінань та навколишні префектури Лу)",ar:"~7M (مدينة جينان وما حولها من أقاليم لو)",he:"~7M (העיר ג׳ינאן ומחוזות לו הסובבים)",sw:"~7M (mji wa Jinan na wilaya za Lu zinazozunguka)"},
    "Extinct (last L1 speaker died early 2000s)": {ja:"死語（最後のL1話者は2000年代初頭に死去）",ko:"사멸(마지막 L1 화자가 2000년대 초에 사망)",zh:"已消亡（最后一位母语使用者于2000年代初去世）",yue:"已消亡（最後一位母語使用者喺2000年代初去世）",vi:"Đã tuyệt chủng (người nói L1 cuối cùng mất vào đầu thập niên 2000)",th:"สูญแล้ว (ผู้พูด L1 คนสุดท้ายเสียชีวิตในช่วงต้นทศวรรษ 2000)",id:"Punah (penutur L1 terakhir meninggal awal 2000-an)",hi:"विलुप्त (अंतिम L1 वक्ता का निधन 2000 के दशक के आरंभ में हुआ)",de:"Ausgestorben (letzter L1-Sprecher starb Anfang der 2000er Jahre)",fr:"Éteinte (dernier locuteur L1 mort au début des années 2000)",it:"Estinta (l'ultimo parlante L1 è morto nei primi anni 2000)",es:"Extinta (el último hablante L1 murió a principios de la década de 2000)",pt:"Extinta (o último falante de L1 morreu no início dos anos 2000)",ru:"Мёртвый (последний носитель L1 умер в начале 2000-х годов)",uk:"Мертва (останній носій помер на початку 2000-х)",ar:"منقرضة (تُوفي آخر متحدث أصلي في مطلع الألفية الثالثة)",he:"נכחדה (דובר שפת האם האחרון נפטר בתחילת שנות ה-2000)",sw:"Imetoweka (msemaji wa mwisho wa lugha ya kwanza alifariki mwanzoni mwa miaka ya 2000)"},
    "~35 L1 + revitalization L2": {ja:"L1約35人＋復興運動によるL2",ko:"L1 약 35명 + 부흥 운동에 따른 L2",zh:"约35位母语使用者，另有复兴运动中的第二语言使用者",yue:"約35位母語使用者，另有復興運動中嘅第二語言使用者",vi:"~35 người L1 + người L2 từ phong trào phục hồi",th:"~35 คน L1 + ผู้พูด L2 จากการฟื้นฟูภาษา",id:"~35 L1 + L2 revitalisasi",hi:"~35 L1 + पुनरुज्जीवन के L2 वक्ता",de:"~35 L1 + L2 aus Revitalisierung",fr:"~35 L1 + L2 issus de la revitalisation",it:"~35 L1 + L2 da revitalizzazione",es:"~35 L1 + L2 de revitalización",pt:"~35 L1 + L2 de revitalização",ru:"~35 L1 + L2 в рамках ревитализации",uk:"~35 носіїв + ті, хто вивчає її в рамках відродження",ar:"~35 متحدثًا أصليًا + متعلمون ضمن جهود الإحياء",he:"~35 דוברי שפת אם + דוברי שפה שנייה בתהליך החייאה",sw:"~35 wenye lugha ya kwanza + wa lugha ya pili katika uhuishaji"},
    "~15 L1 + active revitalization L2": {ja:"L1約15人＋活発な復興運動によるL2",ko:"L1 약 15명 + 활발한 부흥 운동에 따른 L2",zh:"约15位母语使用者，另有活跃的复兴第二语言使用者",yue:"約15位母語使用者，另有活躍嘅復興第二語言使用者",vi:"~15 người L1 + người L2 từ phong trào phục hồi đang diễn ra",th:"~15 คน L1 + ผู้พูด L2 จากการฟื้นฟูภาษาที่ดำเนินอยู่",id:"~15 L1 + L2 revitalisasi aktif",hi:"~15 L1 + सक्रिय पुनरुज्जीवन के L2 वक्ता",de:"~15 L1 + L2 aus aktiver Revitalisierung",fr:"~15 L1 + L2 issus d'une revitalisation active",it:"~15 L1 + L2 da revitalizzazione attiva",es:"~15 L1 + L2 de revitalización activa",pt:"~15 L1 + L2 de revitalização ativa",ru:"~15 L1 + активные L2 в рамках ревитализации",uk:"~15 носіїв + активне вивчення в рамках відродження",ar:"~15 متحدثًا أصليًا + متعلمون ضمن إحياء نشط",he:"~15 דוברי שפת אם + דוברי שפה שנייה בהחייאה פעילה",sw:"~15 wenye lugha ya kwanza + wa lugha ya pili katika uhuishaji hai"},
  };
  const dup = { es_eu:"es", es_mx:"es", pt_eu:"pt", pt_br:"pt" };
  for (const [src, tr] of Object.entries(T)) {
    for (const lang of LANGS) {
      if (!tr[lang]) continue;
      if (!META_I18N[lang]) META_I18N[lang] = {};
      META_I18N[lang][src] = tr[lang];
    }
    for (const [rl, base] of Object.entries(dup)) {
      if (!tr[base]) continue;
      if (!META_I18N[rl]) META_I18N[rl] = {};
      META_I18N[rl][src] = tr[base];
    }
  }
})();

/*
 * Rally r21: notes inside family paths that the tree draws as nodes
 * ("reconstructed", "branch debated", …) were English in th/hi/ru/ar/vi/id/sw/de.
 * Only fills gaps: an existing translation wins.
 */
(function () {
  if (typeof META_I18N_ATOMS === 'undefined') return;
  const A = {
    "reconstructed": {th:"สืบสร้าง",hi:"पुनर्निर्मित",ru:"реконструированный",ar:"مُعاد بناؤها",id:"rekonstruksi",sw:"iliyoundwa upya",de:"rekonstruiert"},
    "creolized": {th:"กลายเป็นครีโอล",hi:"क्रियोलीकृत",ru:"креолизованный",ar:"مُكرْيَلة",ja:"クレオール化",vi:"đã creole hóa",id:"terkreolisasi",sw:"iliyogeuka krioli",de:"kreolisiert"},
    "branch debated": {th:"สาขายังเป็นที่ถกเถียง",hi:"शाखा विवादित",ru:"ветвь спорна",ar:"الفرع موضع خلاف",ja:"下位分類に議論あり",vi:"nhánh còn tranh cãi",id:"cabang diperdebatkan",sw:"tawi lina utata",de:"Zweig umstritten"},
    "heavily restructured": {th:"ปรับโครงสร้างอย่างมาก",hi:"अत्यधिक पुनर्गठित",ru:"сильно перестроенный",ar:"أُعيدت هيكلته بشدة",ja:"大幅に再構造化",vi:"tái cấu trúc mạnh",id:"sangat terstruktur ulang",sw:"imebadilishwa muundo sana",de:"stark umgebaut"},
    "likely isolate": {th:"น่าจะเป็นภาษาเดี่ยว",hi:"संभवतः पृथक भाषा",ru:"вероятно, изолят",ar:"معزولة على الأرجح",ja:"孤立言語の可能性",vi:"có lẽ là ngôn ngữ biệt lập",id:"kemungkinan isolat",sw:"huenda ni lugha pweke",de:"wahrscheinlich isolierte Sprache"},
    "isolate": {id:"isolat",sw:"lugha pweke",de:"isolierte Sprache"},
    "isolate or small family": {id:"isolat atau rumpun kecil",sw:"lugha pweke au familia ndogo",de:"isolierte Sprache oder kleine Familie"},
    "German-based": {th:"ฐานภาษาเยอรมัน",hi:"जर्मन-आधारित",ru:"на немецкой основе",ar:"قائمة على الألمانية",ja:"ドイツ語ベース",vi:"gốc tiếng Đức",id:"berbasis bahasa Jerman",sw:"yenye msingi wa Kijerumani",de:"deutschbasiert"},
    "possibly pre-IE": {th:"อาจเก่ากว่าอินโด-ยูโรเปียน",hi:"संभवतः पूर्व-भारोपीय",ru:"возможно, доиндоевропейский",ar:"ربما سابقة للهندوأوروبية",ja:"印欧語以前の可能性",vi:"có thể tiền Ấn-Âu",id:"mungkin pra-Indo-Eropa",sw:"huenda ni kabla ya Kihindi-Kiulaya",de:"möglicherweise vorindogermanisch"},
    "sometimes grouped as Paezan": {th:"บางครั้งจัดอยู่ในกลุ่มปาเอซ",hi:"कभी-कभी पाएज़ समूह में",ru:"иногда относят к паэсским",ar:"تُصنَّف أحيانًا ضمن البايزية",ja:"パエス語族に含める説あり",vi:"đôi khi xếp vào nhóm Paez",id:"kadang dikelompokkan ke Paezan",sw:"wakati mwingine huwekwa katika Paezan",de:"manchmal zu Paez gestellt"},
    "usually treated as a language isolate": {th:"มักถือเป็นภาษาเดี่ยว",hi:"आमतौर पर पृथक भाषा मानी जाती है",ru:"обычно считается изолятом",ar:"تُعدّ عادةً لغة معزولة",ja:"通常は孤立言語とされる",vi:"thường coi là ngôn ngữ biệt lập",id:"biasanya dianggap bahasa isolat",sw:"kwa kawaida huchukuliwa kuwa lugha pweke",de:"meist als isolierte Sprache betrachtet"},
    "its only relative Yuri being extinct": {th:"ญาติเพียงภาษาเดียวคือยูรีสูญไปแล้ว",hi:"इसकी एकमात्र संबंधी यूरी विलुप्त है",ru:"единственный родственный язык, юри, вымер",ar:"قريبتها الوحيدة يوري منقرضة",ja:"唯一の同系言語ユリ語は消滅",vi:"họ hàng duy nhất là tiếng Yuri đã tuyệt chủng",id:"satu-satunya kerabatnya, Yuri, telah punah",sw:"jamaa yake pekee, Kiyuri, imetoweka",de:"einziger Verwandter Yuri ausgestorben"},
    "schematic": {th:"เชิงแบบแผน",hi:"योजनाबद्ध",ru:"схематический",ar:"تخطيطية",vi:"sơ đồ",id:"skematik",sw:"kimpangilio",de:"schematisch"},
    "a posteriori": {th:"อะโพสเทอริโอริ",hi:"उत्तरानुभविक",ru:"апостериорный",ar:"بَعدية",vi:"hậu nghiệm",id:"a posteriori",sw:"a posteriori",de:"a posteriori"},
    "artistic": {th:"เชิงศิลปะ",hi:"कलात्मक",ru:"художественный",ar:"فنية",vi:"nghệ thuật",id:"artistik",sw:"kisanaa",de:"künstlerisch"},
    "logical": {th:"เชิงตรรกะ",hi:"तार्किक",ru:"логический",ar:"منطقية",vi:"logic",id:"logis",sw:"kimantiki",de:"logisch"},
    "philosophical": {th:"เชิงปรัชญา",hi:"दार्शनिक",ru:"философский",ar:"فلسفية",vi:"triết học",id:"filosofis",sw:"kifalsafa",de:"philosophisch"},
  };
  for (const [term, tr] of Object.entries(A)) {
    for (const [lang, v] of Object.entries(tr)) {
      if (!META_I18N_ATOMS[lang]) META_I18N_ATOMS[lang] = {};
      if (!(term in META_I18N_ATOMS[lang])) META_I18N_ATOMS[lang][term] = v;
    }
  }
})();

/*
 * Rally r22: family-tree sub-branch names and notes still shown in English in
 * th/hi/ru/ar (and ~40 in ja). Atoms for the reusable names, whole strings for
 * notes that do not decompose. "Mel" replaces an English placeholder.
 */
(function () {
  if (typeof META_I18N_ATOMS === 'undefined') return;
  const A = {
 "Balto-Slavic": {
  "th": "บอลโต-สลาฟ",
  "hi": "बाल्तो-स्लाविक",
  "ru": "Балто-славянская",
  "ar": "بلطيقية-سلافية",
  "ja": "バルト・スラヴ語派"
 },
 "Benue-Congo": {
  "th": "เบนูเว-คองโก",
  "hi": "बेन्यू-कांगो",
  "ru": "Бенуэ-конголезская",
  "ar": "بنوي-كونغو"
 },
 "Bikol": {
  "th": "บีโกล",
  "hi": "बिकोल",
  "ru": "Бикольская",
  "ar": "بيكولية"
 },
 "Caribbean": {
  "th": "แคริบเบียน",
  "hi": "कैरिबियाई",
  "ru": "Карибская",
  "ar": "كاريبية"
 },
 "Castilian": {
  "th": "กัสติยา",
  "hi": "कास्तीलियाई",
  "ru": "Кастильская",
  "ar": "قشتالية"
 },
 "Chadic": {
  "th": "ชาด",
  "hi": "चाडिक",
  "ru": "Чадская",
  "ar": "تشادية"
 },
 "Chaga": {
  "th": "ชักกา",
  "hi": "चग्गा",
  "ru": "Чагга",
  "ar": "تشاغا"
 },
 "Cross River": {
  "th": "ครอสริเวอร์",
  "hi": "क्रॉस रिवर",
  "ru": "Кросс-риверская",
  "ar": "كروس ريفر"
 },
 "Danao": {
  "th": "ดานาว",
  "hi": "दानाओ",
  "ru": "Данао",
  "ar": "داناو"
 },
 "Dhuwal": {
  "th": "ดุวัล",
  "hi": "धुवाल",
  "ru": "Дхувал",
  "ar": "دهوال",
  "ja": "ドゥワル"
 },
 "Eastern Indo-Aryan": {
  "th": "อินโด-อารยันตะวันออก",
  "hi": "पूर्वी हिंद-आर्य",
  "ru": "Восточноиндоарийская",
  "ar": "هندية آرية شرقية"
 },
 "Eastern Oti-Volta": {
  "th": "โอติ-วอลตาตะวันออก",
  "hi": "पूर्वी ओटी-वोल्टा",
  "ru": "Восточная оти-вольта",
  "ar": "أوتي-فولتا الشرقية"
 },
 "Edoid": {
  "th": "เอโดอิด",
  "hi": "एडोइड",
  "ru": "Эдоидная",
  "ar": "إيدوية"
 },
 "Esperantido": {
  "th": "เอสเปรันติโด",
  "hi": "एस्पेरान्तिदो",
  "ru": "Эсперантидо",
  "ar": "إسبرانتيدو",
  "ja": "エスペランティード"
 },
 "Ethio-Semitic": {
  "th": "เซมิติกเอธิโอเปีย",
  "hi": "इथियो-सेमिटिक",
  "ru": "Эфиосемитская",
  "ar": "سامية إثيوبية"
 },
 "Five Nations": {
  "th": "ห้าชาติ",
  "hi": "पाँच राष्ट्र",
  "ru": "Пять наций",
  "ar": "الأمم الخمس"
 },
 "Fula": {
  "th": "ฟูลา",
  "hi": "फुला",
  "ru": "Фула",
  "ar": "فولانية"
 },
 "Fur": {
  "th": "ฟูร์",
  "hi": "फ़ूर",
  "ru": "Фур",
  "ar": "فور",
  "ja": "フル諸語"
 },
 "Ga-Adangme": {
  "th": "กา-อาดังเม",
  "hi": "गा-अदांग्मे",
  "ru": "Га-адангме",
  "ar": "غا-أدانغمي"
 },
 "Gan": {
  "th": "ภาษาก้าน",
  "hi": "गान",
  "ru": "Гань",
  "ar": "غان"
 },
 "Jin": {
  "th": "ภาษาจิ้น",
  "hi": "जिन",
  "ru": "Цзинь",
  "ar": "جين"
 },
 "Xiang": {
  "th": "ภาษาเซียง",
  "hi": "शियांग",
  "ru": "Сян",
  "ar": "شيانغ"
 },
 "German": {
  "th": "เยอรมัน",
  "hi": "जर्मन",
  "ru": "Немецкий",
  "ar": "الألمانية"
 },
 "Gorontalo-Mongondow": {
  "th": "โกรอนตาโล-มองกนโดว์",
  "hi": "गोरोन्तालो-मोंगोंडो",
  "ar": "غورونتالو-مونغوندو"
 },
 "Grassfields": {
  "th": "กราสฟิลด์",
  "hi": "ग्रासफ़ील्ड्स",
  "ru": "Грассфилдс",
  "ar": "غراسفيلدز"
 },
 "Greater Mamean": {
  "th": "มาเมียนใหญ่",
  "hi": "बृहत् मामियन",
  "ru": "Большая мамская",
  "ar": "المامية الكبرى",
  "ja": "大マム諸語"
 },
 "Ixilan": {
  "th": "อิชิล",
  "hi": "इशिलान",
  "ru": "Ишильская",
  "ar": "إشيلية"
 },
 "Guaicuruan": {
  "th": "กวยกูรู",
  "hi": "ग्वाइकुरू",
  "ru": "Гуайкуруанская",
  "ar": "غوايكورية",
  "ja": "グアイクル語族"
 },
 "Gurage": {
  "th": "กูราเก",
  "hi": "गुरागे",
  "ru": "Гураге",
  "ar": "غوراغية"
 },
 "Herero": {
  "th": "เฮเรโร",
  "hi": "हेरेरो",
  "ru": "Гереро",
  "ar": "هيريرو"
 },
 "Hlai": {
  "th": "หลี",
  "hi": "ह्लाई",
  "ru": "Ли",
  "ar": "هلاي"
 },
 "Indo-Aryan-lexified": {
  "th": "ใช้คำศัพท์อินโด-อารยัน",
  "hi": "हिंद-आर्य शब्दावली-आधारित",
  "ru": "с индоарийской лексикой",
  "ar": "ذات معجم هندي آري"
 },
 "Insular": {
  "th": "เกาะ",
  "hi": "द्वीपीय",
  "ru": "Островная",
  "ar": "جزرية"
 },
 "Italo-Romance": {
  "th": "อิตาโล-โรแมนซ์",
  "hi": "इतालो-रोमांस",
  "ru": "Итало-романская",
  "ar": "إيطالية رومانسية"
 },
 "Jurchen-Manchu": {
  "th": "จูร์เชน-แมนจู",
  "hi": "जुर्चेन-मांचू",
  "ru": "Чжурчжэньско-маньчжурская",
  "ar": "جورشنية-منشورية"
 },
 "Kalam-Kobon": {
  "th": "กาลัม-โกบอน",
  "hi": "कलाम-कोबोन",
  "ru": "Калам-кобон",
  "ar": "كالام-كوبون"
 },
 "Kam-Sui": {
  "th": "คำ-สุ่ย",
  "hi": "काम-सुई",
  "ru": "Кам-суйская",
  "ar": "كام-سوي"
 },
 "Kampan": {
  "th": "กัมปา",
  "hi": "काम्पा",
  "ru": "Кампа",
  "ar": "كامبية"
 },
 "Kaqchikelan": {
  "th": "กักชิเกล",
  "hi": "काक्चिकेल",
  "ru": "Какчикельская",
  "ar": "كاكتشيكيلية"
 },
 "Karajá": {
  "th": "การาจา",
  "hi": "काराजा",
  "ru": "Караджа",
  "ar": "كاراجا",
  "ja": "カラジャ語"
 },
 "Kipchak-Cuman": {
  "th": "คิปชัก-คูมัน",
  "hi": "किपचक-कुमन",
  "ru": "Кыпчакско-половецкая",
  "ar": "قبجاقية-كومانية"
 },
 "Kiranti": {
  "th": "กีรันตี",
  "hi": "किरांती",
  "ru": "Киранти",
  "ar": "كيرانتية"
 },
 "Kola Sami": {
  "th": "ซามีโกลา",
  "hi": "कोला सामी",
  "ru": "Кольские саамские",
  "ar": "سامي كولا"
 },
 "Sami": {
  "th": "ซามี",
  "hi": "सामी",
  "ru": "Саамская",
  "ar": "سامي"
 },
 "Kra": {
  "th": "ขร้า",
  "hi": "क्रा",
  "ru": "Кра",
  "ar": "كرا",
  "ja": "クラ語群"
 },
 "Kru": {
  "th": "ครู",
  "hi": "क्रू",
  "ru": "Кру",
  "ar": "كرو"
 },
 "Lenape": {
  "th": "เลนาปี",
  "hi": "लेनापे",
  "ru": "Ленапе",
  "ar": "لينابي"
 },
 "Lolo-Burmese": {
  "th": "โลโล-พม่า",
  "hi": "लोलो-बर्मी",
  "ru": "Лоло-бирманская",
  "ar": "لولو-بورمية",
  "ja": "ロロ・ビルマ語群"
 },
 "Low Franconian": {
  "th": "ฟรังโกเนียต่ำ",
  "hi": "निम्न फ़्रैंकोनियाई",
  "ru": "Нижнефранкская",
  "ar": "فرنكونية سفلى",
  "ja": "低地フランク語"
 },
 "Lower Cross": {
  "th": "โลเวอร์ครอส",
  "hi": "लोअर क्रॉस",
  "ru": "Нижнекросская",
  "ar": "كروس السفلى"
 },
 "Macro-Jê": {
  "th": "มาโคร-เจ",
  "hi": "मैक्रो-जे",
  "ru": "Макро-же",
  "ar": "ماكرو-جي",
  "ja": "マクロ・ジェ語族"
 },
 "Madang": {
  "th": "มาดัง",
  "hi": "मदांग",
  "ru": "Маданг",
  "ar": "مادانغ"
 },
 "Makua-Lomwe": {
  "th": "มากัว-ลอมเว",
  "hi": "मकुआ-लोम्वे",
  "ru": "Макуа-ломве",
  "ar": "ماكوا-لوموي"
 },
 "Mamean": {
  "th": "มาเมียน",
  "hi": "मामियन",
  "ru": "Мамская",
  "ar": "مامية"
 },
 "Manchu-Nanai": {
  "th": "แมนจู-นาไน",
  "hi": "मांचू-नानाई",
  "ru": "Маньчжурско-нанайская",
  "ar": "منشورية-ناناي"
 },
 "Masaba-Luhya": {
  "th": "มาซาบา-ลูเฮีย",
  "hi": "मसाबा-लुह्या",
  "ru": "Масаба-лухья",
  "ar": "ماسابا-لوهيا"
 },
 "Matacoan": {
  "th": "มาตาโก",
  "hi": "माताको",
  "ru": "Матакская",
  "ar": "ماتاكوية",
  "ja": "マタコ語族"
 },
 "Mbum-Day": {
  "th": "อึมบุม-ดาย",
  "hi": "म्बुम-दाय",
  "ru": "Мбум-дай",
  "ar": "مبوم-داي"
 },
 "Mel": {
  "th": "เมล",
  "hi": "मेल",
  "ru": "Мел",
  "ar": "ميل"
 },
 "Mongo": {
  "th": "มองโก",
  "hi": "मोंगो",
  "ru": "Монго",
  "ar": "مونغو"
 },
 "Nadahup": {
  "th": "นาดาฮุป",
  "hi": "नादाहुप",
  "ru": "Надахуп",
  "ar": "ناداهوب",
  "ja": "ナダフップ語族"
 },
 "Nahuan": {
  "th": "นาวา",
  "hi": "नाहुआ",
  "ru": "Науанская",
  "ar": "ناواتلية"
 },
 "Northeast Coast": {
  "th": "ชายฝั่งตะวันออกเฉียงเหนือ",
  "hi": "पूर्वोत्तर तटीय",
  "ar": "الساحل الشمالي الشرقي"
 },
 "Northwest Sumatra-Barrier Islands": {
  "th": "สุมาตราตะวันตกเฉียงเหนือ-หมู่เกาะแบร์ริเออร์",
  "hi": "पश्चिमोत्तर सुमात्रा–बैरियर द्वीप",
  "ru": "Северо-западная суматранская — барьерных островов",
  "ar": "شمال غرب سومطرة-الجزر الحاجزة"
 },
 "Nubian": {
  "th": "นูเบีย",
  "hi": "नूबियाई",
  "ru": "Нубийская",
  "ar": "نوبية",
  "ja": "ヌビア語群"
 },
 "Nuclear Polynesian": {
  "th": "พอลินีเซียนแกน",
  "hi": "केंद्रीय पॉलिनेशियन",
  "ru": "Ядерно-полинезийская",
  "ar": "بولينيزية نووية"
 },
 "Oirat-Kalmyk": {
  "th": "โออิรัต-คัลมืยค์",
  "hi": "ओइरात-कल्मिक",
  "ru": "Ойратско-калмыцкая",
  "ar": "أويراتية-كالميكية"
 },
 "Omotic": {
  "th": "โอโมติก",
  "hi": "ओमोटिक"
 },
 "Oshiwambo": {
  "th": "โอชิวัมโบ",
  "hi": "ओशिवाम्बो",
  "ru": "Ошивамбо",
  "ar": "أوشيوامبو"
 },
 "Pacific Coast": {
  "th": "ชายฝั่งแปซิฟิก",
  "hi": "प्रशांत तटीय",
  "ar": "ساحل المحيط الهادئ"
 },
 "Paiwanic": {
  "th": "ไผวัน",
  "hi": "पाइवानिक",
  "ar": "بايوانية"
 },
 "Papuan Tip": {
  "th": "ปลายแหลมปาปัว",
  "hi": "पापुआ टिप",
  "ru": "Папуа-Тип",
  "ar": "طرف بابوا"
 },
 "Philippine": {
  "th": "ฟิลิปปินส์",
  "hi": "फ़िलीपीनी",
  "ru": "Филиппинская",
  "ar": "فلبينية"
 },
 "Ring": {
  "th": "ริง",
  "hi": "रिंग",
  "ru": "Ринг",
  "ar": "رينغ"
 },
 "Senegambian": {
  "th": "เซเนแกมเบีย",
  "hi": "सेनेगाम्बियाई",
  "ru": "Сенегамбийская",
  "ar": "سنغامبية"
 },
 "Senga-Sena": {
  "th": "เซงกา-เซนา",
  "hi": "सेंगा-सेना",
  "ru": "Сенга-сена",
  "ar": "سنغا-سينا"
 },
 "Shirongolic": {
  "th": "ชีรงโกล",
  "hi": "शिरोंगोलिक",
  "ru": "Широнгольская",
  "ar": "شيرونغولية",
  "ja": "シロンゴル語群"
 },
 "Shughni-Yazgulami": {
  "th": "ชุฆนี-ยัซกุลามี",
  "hi": "शुग़नी-यज़्गुलामी",
  "ru": "Шугнано-язгулямская",
  "ar": "شغنية-يزغلامية",
  "ja": "シュグニー・ヤズグラム語群"
 },
 "Southeastern": {
  "th": "ตะวันออกเฉียงใต้",
  "hi": "दक्षिण-पूर्वी",
  "ar": "جنوبية شرقية"
 },
 "Southern Indo-Aryan": {
  "th": "อินโด-อารยันใต้",
  "hi": "दक्षिणी हिंद-आर्य",
  "ru": "Южноиндоарийская",
  "ar": "هندية آرية جنوبية"
 },
 "Sukuma-Nyamwezi": {
  "th": "ซูกูมา-เนียมเวซี",
  "hi": "सुकुमा-न्यामवेज़ी",
  "ru": "Сукума-ньямвези",
  "ar": "سوكوما-نياموزي"
 },
 "Sundic": {
  "th": "ซุนดา",
  "hi": "सुंडिक",
  "ru": "Сундская",
  "ar": "سوندية"
 },
 "Susu-Yalunka": {
  "th": "ซูซู-ยาลุงกา",
  "hi": "सुसु-यालुंका",
  "ru": "Сусу-ялунка",
  "ar": "سوسو-يالونكا"
 },
 "Tani": {
  "th": "ตานี",
  "hi": "तानी",
  "ru": "Тани",
  "ar": "تاني"
 },
 "Tetela": {
  "th": "เตเตลา",
  "hi": "तेतेला",
  "ru": "Тетела",
  "ar": "تيتيلا"
 },
 "Bangi-Tetela": {
  "th": "บังกี-เตเตลา",
  "hi": "बांगी-तेतेला",
  "ru": "Банги-тетела",
  "ar": "بانغي-تيتيلا"
 },
 "Ticuna–Yuri": {
  "th": "ติกูนา-ยูรี",
  "hi": "टिकुना-यूरी",
  "ru": "Тикуна-юри",
  "ar": "تيكونا-يوري",
  "ja": "ティクナ・ユリ語族"
 },
 "Timor-Babar": {
  "th": "ติมอร์-บาบาร์",
  "hi": "तिमोर-बाबर",
  "ru": "Тимор-бабарская",
  "ar": "تيمور-بابار"
 },
 "Tonga-Lenje": {
  "th": "ตองกา-เลนเจ",
  "hi": "टोंगा-लेंजे",
  "ru": "Тонга-ленье",
  "ar": "تونغا-لينجي"
 },
 "Trumai": {
  "th": "ตรูไม",
  "hi": "त्रुमाई",
  "ru": "Трумай",
  "ar": "تروماي",
  "ja": "トゥルマイ語"
 },
 "Tuareg": {
  "th": "ทัวเร็ก",
  "hi": "तुआरेग"
 },
 "Tuscarora-Nottoway": {
  "th": "ทัสคาโรรา-นอตโตเวย์",
  "hi": "टस्करोरा-नॉटोवे",
  "ru": "Тускарора-ноттовей",
  "ar": "توسكارورا-نوتواي"
 },
 "Vai-Kono": {
  "th": "ไว-โกโน",
  "hi": "वाई-कोनो",
  "ru": "Ваи-коно",
  "ar": "فاي-كونو"
 },
 "Waic": {
  "th": "ว้า",
  "hi": "वा",
  "ru": "Ваская",
  "ar": "وائية",
  "ja": "ワ語群"
 },
 "Western Caribbean": {
  "th": "แคริบเบียนตะวันตก",
  "hi": "पश्चिमी कैरिबियाई",
  "ru": "Западнокарибская",
  "ar": "كاريبية غربية"
 },
 "Western Desert": {
  "th": "ทะเลทรายตะวันตก",
  "hi": "पश्चिमी मरुस्थल",
  "ru": "Западной пустыни",
  "ar": "الصحراء الغربية"
 },
 "Western Indo-Aryan": {
  "th": "อินโด-อารยันตะวันตก",
  "hi": "पश्चिमी हिंद-आर्य",
  "ru": "Западноиндоарийская",
  "ar": "هندية آرية غربية"
 },
 "Wiradhuric": {
  "th": "วิราจูรี",
  "hi": "विराजुरी",
  "ru": "Вираджурийская",
  "ar": "ويراجورية",
  "ja": "ウィラジュリ語群"
 },
 "Yanomaman": {
  "th": "ยาโนมามิ",
  "hi": "यानोमामी",
  "ru": "Яномамская",
  "ar": "يانومامية",
  "ja": "ヤノマミ語族"
 },
 "Yao-Makonde": {
  "th": "เยา-มาคอนเด",
  "hi": "याओ-माकोंडे",
  "ru": "Яо-маконде",
  "ar": "ياو-ماكوندي"
 },
 "Yolŋu": {
  "th": "ยอลงู",
  "hi": "योल्ङु",
  "ru": "Йолнгу",
  "ar": "يولنغو",
  "ja": "ヨルング語群"
 },
 "Central New South Wales": {
  "th": "นิวเซาท์เวลส์ตอนกลาง",
  "hi": "मध्य न्यू साउथ वेल्स",
  "ru": "Центрального Нового Южного Уэльса",
  "ar": "نيو ساوث ويلز الوسطى",
  "ja": "ニューサウスウェールズ中部"
 },
 "Bassa": {
  "th": "บาสซา",
  "hi": "बस्सा",
  "ar": "باسا",
  "ja": "バサ語"
 }
};
  const F = {
 "A subgroup — Kera-Kwang sub-cluster": {
  "th": "กลุ่มย่อย A — กลุ่มย่อยเกรา-กวัง",
  "hi": "उपसमूह A — केरा-क्वांग उप-समूह",
  "ru": "подгруппа A — кластер кера-кванг",
  "ar": "المجموعة الفرعية A — عنقود كيرا-كوانغ"
 },
 "Aghul-Tabasaran-Tsakhur subgroup": {
  "th": "กลุ่มย่อยอากุล-ตาบาซารัน-ซาคูร์",
  "hi": "अगुल-तबासरान-त्साखुर उपसमूह",
  "ru": "агульско-табасаранско-цахурская подгруппа",
  "ar": "المجموعة الفرعية الأغولية-الطباسرانية-التساخورية"
 },
 "Awadhi–Bhojpuri-based koiné": {
  "th": "ภาษากลางแบบโคอิเนที่มีพื้นฐานจากอวธี–โภชปุรี",
  "hi": "अवधी–भोजपुरी आधारित कोइने",
  "ru": "койне на основе авадхи и бходжпури",
  "ar": "لغة مشتركة قائمة على الأودية والبوجبورية",
  "ja": "アワディー語・ボージュプリー語ベースのコイネー"
 },
 "Bantu; Guthrie Zone H.20 — North Mbundu": {
  "th": "บันตู; โซนกัทรี H.20 — มบุนดูเหนือ",
  "hi": "बंटू; गथरी ज़ोन H.20 — उत्तरी म्बुंडु",
  "ru": "банту; зона Гатри H.20 — северный мбунду",
  "ar": "بانتو؛ منطقة غوثري H.20 — مبوندو الشمالية",
  "ja": "バントゥー語群; ガスリー分類 H.20 — 北ムブンドゥ"
 },
 "Bodish — close to but not descended from Classical Tibetan": {
  "th": "โบดิก — ใกล้เคียงแต่ไม่ได้สืบทอดจากภาษาทิเบตคลาสสิก",
  "hi": "बोडिक — शास्त्रीय तिब्बती के निकट, पर उससे व्युत्पन्न नहीं",
  "ru": "бодские — близки к классическому тибетскому, но не происходят от него",
  "ar": "البودية — قريبة من التبتية الكلاسيكية لكنها لا تنحدر منها",
  "ja": "チベット語群 — 古典チベット語に近いが、その子孫ではない"
 },
 "Central Atlas Tamazight and Tarifit": {
  "th": "ทามาไซต์แอตลาสกลางและตารีฟิต",
  "hi": "मध्य एटलस तमाज़ाइट और तारिफ़ित",
  "ru": "центральноатласский тамазигхт и тарифит",
  "ar": "الأمازيغية الأطلسية الوسطى والريفية",
  "ja": "中央アトラス・タマジグト語とリーフ語"
 },
 "Central zone — Eastern Hindi": {
  "th": "เขตกลาง — ฮินดีตะวันออก",
  "hi": "मध्य क्षेत्र — पूर्वी हिन्दी",
  "ru": "центральная зона — восточный хинди",
  "ar": "المنطقة الوسطى — الهندية الشرقية",
  "ja": "中央グループ — 東部ヒンディー語"
 },
 "Chokwe-Luchazi / K.10 group": {
  "th": "โชกเว-ลูชาซี / กลุ่ม K.10",
  "hi": "चोकवे-लुचाज़ी / K.10 समूह",
  "ru": "чокве-лучази / группа K.10",
  "ar": "تشوكوي-لوتشازي / مجموعة K.10",
  "ja": "チョクウェ・ルチャジ / K.10群"
 },
 "Digarish; \"Mishmi\" is areal": {
  "th": "ดีการิช; \"มิชมี\" เป็นชื่อเรียกตามพื้นที่",
  "hi": "दिगारिश; \"मिश्मी\" एक क्षेत्रीय नाम है",
  "ru": "дигарские; «мишми» — ареальное название",
  "ar": "الديغارية؛ «ميشمي» تسمية جغرافية",
  "ja": "ディガロ諸語; 「ミシュミ」は地域名"
 },
 "Gheg — one of the two primary dialect groups alongside Tosk": {
  "th": "เกก — หนึ่งในสองกลุ่มภาษาถิ่นหลัก ร่วมกับโตสก์",
  "hi": "गेग — तोस्क के साथ दो प्रमुख बोली-समूहों में से एक",
  "ru": "гегский — одна из двух основных групп диалектов наряду с тоскским",
  "ar": "الغيغية — إحدى مجموعتي اللهجات الرئيسيتين إلى جانب التوسكية",
  "ja": "ゲグ方言 — トスク方言と並ぶ二大方言群の一つ"
 },
 "Guthrie zone L.52": {
  "th": "โซนกัทรี L.52",
  "hi": "गथरी ज़ोन L.52",
  "ru": "зона Гатри L.52",
  "ar": "منطقة غوثري L.52",
  "ja": "ガスリー分類 L.52"
 },
 "Himalayish — isolated within it; sometimes linked to Mahakiranti": {
  "th": "หิมาลัย — แยกโดดเดี่ยวในกลุ่มนี้; บางครั้งจัดรวมกับมหากีรันตี",
  "hi": "हिमालयी — इसके भीतर पृथक; कभी-कभी महाकिरांती से जोड़ी जाती है",
  "ru": "гималайские — обособлен внутри группы; иногда связывается с махакиранти",
  "ar": "الهيمالائية — معزولة داخلها؛ تُربط أحيانًا بالماهاكيرانتية",
  "ja": "ヒマラヤ諸語 — その中で孤立; マハキランティ諸語と結びつけられることもある"
 },
 "Hungarian — historical stage of modern Hungarian hu": {
  "th": "ฮังการี — ภาษาฮังการีสมัยใหม่ (hu) ในระยะประวัติศาสตร์",
  "hi": "हंगेरियाई — आधुनिक हंगेरियाई (hu) का ऐतिहासिक चरण",
  "ru": "венгерская — исторический этап современного венгерского (hu)",
  "ar": "المجرية — مرحلة تاريخية من المجرية الحديثة (hu)"
 },
 "Indo-European Celtic per Koch 2009; non-IE per Untermann 1997": {
  "th": "เคลติก อินโด-ยูโรเปียน ตาม Koch 2009; ไม่ใช่อินโด-ยูโรเปียน ตาม Untermann 1997",
  "hi": "Koch 2009 के अनुसार भारोपीय केल्टिक; Untermann 1997 के अनुसार गैर-भारोपीय",
  "ru": "индоевропейский кельтский по Koch 2009; неиндоевропейский по Untermann 1997",
  "ar": "كلتية هندية أوروبية حسب Koch 2009؛ غير هندية أوروبية حسب Untermann 1997"
 },
 "Maa cluster — sister to Maasai mas": {
  "th": "กลุ่มมาอา — สาขาพี่น้องของมาไซ (mas)",
  "hi": "मा समूह — मसाई (mas) की सहोदर",
  "ru": "кластер маа — родственен масаи (mas)",
  "ar": "عنقود الماا — شقيق للماساي (mas)"
 },
 "Mafa-Bata subgroup": {
  "th": "กลุ่มย่อยมาฟา-บาตา",
  "hi": "माफ़ा-बाटा उपसमूह",
  "ru": "подгруппа мафа-бата",
  "ar": "المجموعة الفرعية مافا-باتا"
 },
 "Mafa-Bata — Daba subgroup": {
  "th": "มาฟา-บาตา — กลุ่มย่อยดาบา",
  "hi": "माफ़ा-बाटा — दाबा उपसमूह",
  "ru": "мафа-бата — подгруппа даба",
  "ar": "مافا-باتا — المجموعة الفرعية دابا"
 },
 "Malayic — Malay-based": {
  "th": "มลายิก — มีพื้นฐานจากภาษามลายู",
  "hi": "मलयिक — मलय-आधारित",
  "ru": "малайская — на основе малайского",
  "ar": "مالايية — قائمة على الملايوية",
  "ja": "マライ諸語 — マレー語ベース"
 },
 "Melanesian Pijin family": {
  "th": "ตระกูลพิจินเมลานีเซีย",
  "hi": "मेलानेशियाई पिजिन परिवार",
  "ru": "семья меланезийских пиджинов",
  "ar": "عائلة البيدجن الميلانيزية"
 },
 "Northern Berber; planned standard pooling Tashelhiyt": {
  "th": "เบอร์เบอร์เหนือ; ภาษามาตรฐานที่วางแผนรวมทาเชลฮีต",
  "hi": "उत्तरी बेर्बेर; ताशेल्हीत को मिलाकर प्रस्तावित मानक",
  "ru": "северноберберские; планируемый стандарт, объединяющий ташельхит",
  "ar": "البربرية الشمالية؛ معيار مخطط يجمع تاشلحيت",
  "ja": "北ベルベル諸語; タシェルヒート語を統合する計画中の標準語"
 },
 "Rai Coast — Yaganon": {
  "th": "ชายฝั่งไร — ยากานอน",
  "hi": "राय तट — यागानोन",
  "ar": "ساحل راي — ياغانون"
 },
 "Romanichal-Kaale subgroup": {
  "th": "กลุ่มย่อยโรมานิชัล-คาเล",
  "hi": "रोमानिचल-काले उपसमूह",
  "ru": "подгруппа романичал-кале",
  "ar": "المجموعة الفرعية رومانيتشال-كالي"
 },
 "Svan branch — sister to Zan-Georgian": {
  "th": "สาขาสวาน — สาขาพี่น้องของซาน-จอร์เจีย",
  "hi": "स्वान शाखा — ज़ान-जॉर्जियाई की सहोदर",
  "ru": "сванская ветвь — родственна занско-грузинской",
  "ar": "الفرع السفاني — شقيق للزانية-الجورجية"
 },
 "Udege-Oroch subgroup — sister to Oroch and Negidal": {
  "th": "กลุ่มย่อยอูเดเก-โอรอช — สาขาพี่น้องของโอรอชและเนกิดัล",
  "hi": "उदेगे-ओरोच उपसमूह — ओरोच और नेगिदाल की सहोदर",
  "ru": "удэгейско-орочская подгруппа — родственна орочскому и негидальскому",
  "ar": "المجموعة الفرعية الأوديغية-الأوروتشية — شقيقة للأوروتشية والنيغيدالية"
 },
 "debated; possibly Eastern Sudanic": {
  "th": "ยังเป็นที่ถกเถียง; อาจเป็นซูดานตะวันออก",
  "hi": "विवादित; संभवतः पूर्वी सूडानी",
  "ru": "спорно; возможно, восточносуданская",
  "ar": "موضع خلاف؛ ربما سودانية شرقية",
  "ja": "議論あり; 東スーダン諸語の可能性"
 },
 "language isolate within Italy": {
  "th": "ภาษาโดดเดี่ยวในอิตาลี",
  "hi": "इटली के भीतर एक पृथक भाषा",
  "ru": "изолированный язык на территории Италии",
  "ar": "لغة معزولة داخل إيطاليا"
 },
 "or an independent IE branch — debated": {
  "th": "หรือเป็นสาขาอิสระของอินโด-ยูโรเปียน — ยังเป็นที่ถกเถียง",
  "hi": "या एक स्वतंत्र भारोपीय शाखा — विवादित",
  "ru": "или самостоятельная индоевропейская ветвь — спорно",
  "ar": "أو فرع هندي أوروبي مستقل — موضع خلاف",
  "ja": "または独立したインド・ヨーロッパ語派 — 議論あり"
 },
 "separate from IE/Semitic": {
  "th": "แยกจากอินโด-ยูโรเปียนและเซมิติก",
  "hi": "भारोपीय/सेमिटिक से अलग",
  "ru": "отдельно от индоевропейских и семитских",
  "ar": "منفصلة عن الهندية الأوروبية والسامية"
 },
 "unclassified; possibly Indo-European and Illyrian-related": {
  "th": "ไม่ได้จำแนก; อาจเป็นอินโด-ยูโรเปียนและเกี่ยวข้องกับอิลลิเรีย",
  "hi": "अवर्गीकृत; संभवतः भारोपीय और इलिरियाई से संबंधित",
  "ru": "не классифицирован; возможно, индоевропейский и родственный иллирийскому",
  "ar": "غير مصنفة؛ ربما هندية أوروبية وذات صلة بالإليرية",
  "ja": "未分類; インド・ヨーロッパ語族でイリュリア語と関連する可能性"
 }
};
  for (const [term, tr] of Object.entries(A)) for (const [lang, v] of Object.entries(tr)) {
    if (!META_I18N_ATOMS[lang]) META_I18N_ATOMS[lang] = {};
    const cur = META_I18N_ATOMS[lang][term];
    if (cur === undefined || cur === term) META_I18N_ATOMS[lang][term] = v;
  }
  if (typeof META_I18N === 'undefined') return;
  for (const [src, tr] of Object.entries(F)) for (const [lang, v] of Object.entries(tr)) {
    if (!META_I18N[lang]) META_I18N[lang] = {};
    if (!(src in META_I18N[lang])) META_I18N[lang][src] = v;
  }
})();

// r24: language-tree branch names for ko zh yue uk he vi de fr es it pt id sw.
// These override earlier entries: the agents that wrote them checked every
// tree level and every other meta string before and after, and replaced
// word-by-word compositions ("West- Germanisch", "东部 印地语") and a few
// plainly wrong hand entries (zh 缅彝 for Burmish, sw Kijerumani for Germanic).
(function () {
  if (typeof META_I18N_ATOMS === 'undefined') return;
  const A = {
 "Udege-Oroch subgroup": {
  "ko": "우데게-오로치 하위군",
  "zh": "乌德盖-奥罗奇亚群",
  "yue": "烏德蓋-奧羅奇亞群",
  "uk": "удейсько-орочська підгрупа",
  "he": "תת-קבוצת אודגה-אורוץ׳"
 },
 "sister to Oroch and Negidal": {
  "ko": "오로치어·네기달어와 자매 관계",
  "zh": "与奥罗奇语、涅吉达尔语为姊妹语",
  "yue": "同奧羅奇語、涅吉達爾語係姊妹語",
  "uk": "споріднена з орочською та негідальською",
  "he": "אחות לאורוץ׳ ולנגידל"
 },
 "Hungarian": {
  "ko": "헝가리어",
  "zh": "匈牙利语",
  "yue": "匈牙利語",
  "uk": "угорська",
  "he": "הונגרית"
 },
 "Svan branch": {
  "ko": "스반어파",
  "zh": "斯万语支",
  "yue": "斯萬語支",
  "uk": "сванська гілка",
  "he": "הענף הסוואני"
 },
 "sister to Zan-Georgian": {
  "ko": "잔-조지아어군과 자매 관계",
  "zh": "与赞-格鲁吉亚语支为姊妹",
  "yue": "同贊-格魯吉亞語支係姊妹",
  "uk": "сестринська до зансько-грузинської",
  "he": "אחות לזאנית-גאורגית"
 },
 "Kam-Sui": {
  "ko": "캄수이어군",
  "zh": "侗水语支",
  "yue": "侗水語支",
  "uk": "кам-суйський",
  "he": "קאם-סואי",
  "vi": "nhóm Đồng-Thủy"
 },
 "Waic": {
  "ko": "와어군",
  "zh": "佤语支",
  "yue": "佤語支",
  "uk": "васький",
  "he": "קבוצת וא",
  "de": "Wa-Sprachen",
  "es": "lenguas wa",
  "it": "lingue wa",
  "pt": "wa",
  "id": "Wa",
  "fr": "Langues wa",
  "vi": "nhóm Wa",
  "sw": "lugha za Wa"
 },
 "Shughni-Yazgulami": {
  "ko": "슈그니-야즈굴라미어군",
  "zh": "舒格南-亚兹古拉米语支",
  "yue": "舒格南-亞茲古拉米語支",
  "uk": "шугнансько-язгулямський",
  "he": "שוגני-יזגולאמי"
 },
 "Kra": {
  "ko": "크라어군",
  "zh": "仡央语支",
  "yue": "仡央語支",
  "uk": "кра",
  "he": "קרא"
 },
 "Hlai": {
  "ko": "흘라이어군",
  "zh": "黎语支",
  "yue": "黎語支",
  "uk": "хлайський",
  "he": "הלאי"
 },
 "Shirongolic": {
  "ko": "시롱골어군",
  "zh": "甘青蒙古语支",
  "yue": "甘青蒙古語支",
  "uk": "широнгольський",
  "he": "שירונגולית",
  "de": "Shirongolisch",
  "pt": "shirongólica",
  "id": "Shirongolik",
  "fr": "Shirongol",
  "vi": "Shirongol",
  "sw": "Shirongol"
 },
 "Lolo-Burmese": {
  "ko": "로로버마어파",
  "zh": "缅彝语群",
  "yue": "緬彝語群",
  "uk": "лоло-бірманський",
  "he": "לולו-בורמזית",
  "es": "lolo-birmana",
  "it": "lolo-birmana",
  "vi": "nhóm Lô Lô-Miến",
  "sw": "Kilolo-Kiburma"
 },
 "branch debated": {
  "ko": "계통 논쟁 중",
  "zh": "分支有争议",
  "yue": "分支有爭議",
  "uk": "гілка дискусійна",
  "he": "הענף שנוי במחלוקת"
 },
 "Digarish": {
  "ko": "디가로어군",
  "zh": "迪加罗语支",
  "yue": "迪加羅語支",
  "uk": "дігарський",
  "he": "דיגארית",
  "pt": "digárica",
  "id": "Digaro"
 },
 "\"Mishmi\" is areal": {
  "ko": "‘미시미’는 지역적 명칭",
  "zh": "“米什米”为地域名称",
  "yue": "「米什米」係地域名稱",
  "uk": "«мішмі» — ареальна назва",
  "he": "„מישמי” הוא כינוי אזורי"
 },
 "Mafa-Bata subgroup": {
  "ko": "마파-바타 하위군",
  "zh": "马法-巴塔亚群",
  "yue": "馬法-巴塔亞群",
  "uk": "мафа-батська підгрупа",
  "he": "תת-קבוצת מאפה-באטה"
 },
 "Kera-Kwang sub-cluster": {
  "ko": "케라-쾅 소군집",
  "zh": "克拉-夸恩小群",
  "yue": "克拉-夸恩小群",
  "uk": "кластер кера-кванг",
  "he": "אשכול קרה-קוואנג"
 },
 "Mafa-Bata": {
  "ko": "마파-바타",
  "zh": "马法-巴塔",
  "yue": "馬法-巴塔",
  "uk": "мафа-бата",
  "he": "מאפה-באטה"
 },
 "Daba subgroup": {
  "ko": "다바 하위군",
  "zh": "达巴亚群",
  "yue": "達巴亞群",
  "uk": "підгрупа даба",
  "he": "תת-קבוצת דאבה"
 },
 "Bangi-Tetela": {
  "ko": "방기-테텔라어군",
  "zh": "班吉-特特拉语群",
  "yue": "班吉-特特拉語群",
  "uk": "бангі-тетела",
  "he": "באנגי-טטלה"
 },
 "Western Caribbean": {
  "ko": "서카리브",
  "zh": "西加勒比",
  "yue": "西加勒比",
  "uk": "західнокарибський",
  "he": "קריבית מערבית"
 },
 "Romanichal-Kaale subgroup": {
  "ko": "로마니찰-칼레 하위군",
  "zh": "罗曼尼查尔-卡莱亚群",
  "yue": "羅曼尼查爾-卡萊亞群",
  "uk": "підгрупа романічал-кале",
  "he": "תת-קבוצת רומניצ׳ל-קאלה"
 },
 "Kalam-Kobon": {
  "ko": "칼람-코본어군",
  "zh": "卡拉姆-科邦语群",
  "yue": "卡拉姆-科邦語群",
  "uk": "калам-кобон",
  "he": "קלאם-קובון"
 },
 "Pacific": {
  "ko": "태평양",
  "fr": "Pacifique",
  "vi": "Thái Bình Dương",
  "sw": "Pasifiki"
 },
 "Melanesian Pijin family": {
  "ko": "멜라네시아 피진어군",
  "zh": "美拉尼西亚皮钦语族",
  "yue": "美拉尼西亞皮欽語族",
  "uk": "меланезійські піджини",
  "he": "משפחת הפיג׳ין המלנזי"
 },
 "Tuscarora-Nottoway": {
  "ko": "터스커로라-노터웨이어군",
  "zh": "塔斯卡洛拉-诺托韦语支",
  "yue": "塔斯卡洛拉-諾托韋語支",
  "uk": "тускарора-нотавей",
  "he": "טוסקרורה-נוטוויי"
 },
 "a posteriori": {
  "ko": "아 포스테리오리",
  "zh": "后验语",
  "yue": "後驗語",
  "uk": "апостеріорна",
  "he": "א-פוסטריורית",
  "sw": "inayotokana na lugha zilizopo"
 },
 "schematic": {
  "ko": "도식적",
  "zh": "图式型",
  "yue": "圖式型",
  "uk": "схематична",
  "he": "סכמטית"
 },
 "philosophical": {
  "ko": "철학적",
  "zh": "哲学",
  "yue": "哲學",
  "uk": "філософська",
  "he": "פילוסופית"
 },
 "artistic": {
  "ko": "예술적",
  "zh": "艺术",
  "yue": "藝術",
  "uk": "художня",
  "he": "אמנותית"
 },
 "logical": {
  "ko": "논리적",
  "zh": "逻辑",
  "yue": "邏輯",
  "uk": "логічна",
  "he": "לוגית"
 },
 "Central zone": {
  "ko": "중앙 지대",
  "zh": "中部区",
  "yue": "中部區",
  "uk": "центральна зона",
  "he": "האזור המרכזי"
 },
 "Ga-Adangme": {
  "ko": "가-아당메어군",
  "zh": "加-阿当梅语支",
  "yue": "加-阿當梅語支",
  "uk": "га-адангме",
  "he": "גא-אדנגמה"
 },
 "Masaba-Luhya": {
  "ko": "마사바-루햐어군",
  "zh": "马萨巴-卢希亚语群",
  "yue": "馬薩巴-盧希亞語群",
  "uk": "масаба-лух'я",
  "he": "מסאבה-לוהיה"
 },
 "Mongo": {
  "ko": "몽고어군",
  "zh": "蒙戈语群",
  "yue": "蒙戈語群",
  "uk": "монго",
  "he": "מונגו",
  "sw": "Kimongo"
 },
 "Tetela": {
  "ko": "테텔라",
  "zh": "特特拉",
  "yue": "特特拉",
  "uk": "тетела",
  "he": "טטלה",
  "sw": "Kitetela"
 },
 "Senegambian": {
  "ko": "세네감비아어군",
  "zh": "塞内冈比亚语支",
  "yue": "塞內岡比亞語支",
  "uk": "сенегамбійський",
  "he": "סנגמבית",
  "de": "Senegambisch",
  "es": "senegambiana",
  "it": "senegambiana",
  "pt": "senegambiana",
  "id": "Senegambia",
  "fr": "Sénégambien",
  "vi": "nhóm Senegambia",
  "sw": "lugha za Senegambia"
 },
 "Kampan": {
  "ko": "캄파어군",
  "zh": "坎帕语支",
  "yue": "坎帕語支",
  "uk": "кампа",
  "he": "קמפה",
  "de": "Kampa-Sprachen",
  "pt": "campa",
  "fr": "Campa",
  "vi": "nhóm Kampa",
  "sw": "lugha za Kampa"
 },
 "sometimes grouped as Paezan": {
  "ko": "때때로 파에스어족으로 묶임",
  "zh": "有时归入派埃斯语系",
  "yue": "有時歸入派埃斯語系",
  "uk": "іноді відносять до паесських мов",
  "he": "לעתים מסווגת עם הפאאסיות"
 },
 "Lenape": {
  "ko": "레나페어",
  "zh": "德拉瓦语支",
  "yue": "德拉瓦語支",
  "uk": "ленапе",
  "he": "לנאפה"
 },
 "Aghul-Tabasaran-Tsakhur subgroup": {
  "ko": "아굴-타바사란-차후르 하위군",
  "zh": "阿古尔-塔巴萨兰-查胡尔亚群",
  "yue": "阿古爾-塔巴薩蘭-查胡爾亞群",
  "uk": "агульсько-табасарансько-цахурська підгрупа",
  "he": "תת-קבוצת אגול-טבסרן-צחור"
 },
 "Kipchak-Cuman": {
  "ko": "킵차크-쿠만어군",
  "zh": "钦察-库曼语支",
  "yue": "欽察-庫曼語支",
  "uk": "кипчацько-половецький",
  "he": "קיפצ׳קית-קומאנית",
  "de": "Kiptschakisch-Kumanisch",
  "fr": "Kiptchak-coumane"
 },
 "Timor-Babar": {
  "ko": "티모르-바바르어군",
  "zh": "帝汶-巴巴尔语群",
  "yue": "帝汶-巴巴爾語群",
  "uk": "тимор-бабарський",
  "he": "טימור-בבאר"
 },
 "Western Desert": {
  "ko": "서부 사막어",
  "zh": "西部沙漠语",
  "yue": "西部沙漠語",
  "uk": "мова Західної пустелі",
  "he": "שפת המדבר המערבי"
 },
 "Indo-Aryan-lexified": {
  "ko": "인도아리아어 어휘 기반",
  "zh": "以印度-雅利安语为词汇来源",
  "yue": "以印度-雅利安語為詞彙來源",
  "uk": "з індоарійською лексикою",
  "he": "בעלת לקסיקון הודו-ארי"
 },
 "Northwest Sumatra-Barrier Islands": {
  "ko": "북서 수마트라-방벽 제도어군",
  "zh": "西北苏门答腊-堰洲群岛语群",
  "yue": "西北蘇門答臘-堰洲群島語群",
  "uk": "північно-західносуматранський і бар'єрних островів",
  "he": "צפון-מערב סומטרה–איי המחסום"
 },
 "Senga-Sena": {
  "ko": "셍가-세나어군",
  "zh": "森加-塞纳语群",
  "yue": "森加-塞納語群",
  "uk": "сенга-сена",
  "he": "סנגה-סנה"
 },
 "Makua-Lomwe": {
  "ko": "마쿠아-로므웨어군",
  "zh": "马库阿-洛姆韦语群",
  "yue": "馬庫阿-洛姆韋語群",
  "uk": "макуа-ломве",
  "he": "מקואה-לומווה"
 },
 "Maa cluster": {
  "ko": "마아어군",
  "zh": "马阿语群",
  "yue": "馬阿語群",
  "uk": "кластер маа",
  "he": "אשכול מאא"
 },
 "sister to Maasai mas": {
  "ko": "마사이어(mas)와 자매 관계",
  "zh": "与马赛语（mas）为姊妹语",
  "yue": "同馬賽語（mas）係姊妹語",
  "uk": "сестринська до масаї (mas)",
  "he": "אחות למסאי (mas)"
 },
 "Western Indo-Aryan": {
  "ko": "서부 인도아리아어파",
  "zh": "西部印度-雅利安语支",
  "yue": "西部印度-雅利安語支",
  "uk": "західноіндоарійський",
  "he": "הודו-ארית מערבית"
 },
 "Eastern Oti-Volta": {
  "ko": "동부 오티-볼타어군",
  "zh": "东奥蒂-沃尔特语支",
  "yue": "東奧蒂-沃爾特語支",
  "uk": "східний оті-вольта",
  "he": "אוטי-וולטה מזרחית"
 },
 "Vai-Kono": {
  "ko": "바이-코노어군",
  "zh": "瓦伊-科诺语支",
  "yue": "瓦伊-科諾語支",
  "uk": "ваї-коно",
  "he": "וואי-קונו"
 },
 "Susu-Yalunka": {
  "ko": "수수-얄룽카어군",
  "zh": "苏苏-亚隆卡语支",
  "yue": "蘇蘇-亞隆卡語支",
  "uk": "сусу-ялунка",
  "he": "סוסו-יאלונקה"
 },
 "Papuan Tip": {
  "ko": "파푸아 팁어군",
  "zh": "巴布亚尖端语群",
  "yue": "巴布亞尖端語群",
  "uk": "група Папуан-Тіп",
  "he": "קצה פפואה"
 },
 "Guaicuruan": {
  "ko": "과이쿠루어족",
  "zh": "瓜伊库鲁语系",
  "yue": "瓜伊庫魯語系",
  "uk": "Гуайкуруська",
  "he": "גואיקורואית",
  "de": "Guaicurú-Sprachen",
  "es": "guaicurú",
  "it": "guaicurú",
  "pt": "guaicuru",
  "id": "Guaykuru",
  "fr": "Guaicuru",
  "vi": "ngữ hệ Guaicuru",
  "sw": "familia ya Guaicuru"
 },
 "Karajá": {
  "ko": "카라자어",
  "zh": "卡拉雅语",
  "yue": "卡拉雅語",
  "uk": "караджа",
  "he": "קרג׳ה"
 },
 "Yanomaman": {
  "ko": "야노마미어족",
  "zh": "亚诺马米语系",
  "yue": "亞諾馬米語系",
  "uk": "Яномамська",
  "he": "יאנומאמית",
  "de": "Yanomami-Sprachen",
  "es": "yanomami",
  "it": "yanomami",
  "pt": "ianomâmi",
  "id": "Yanomami",
  "fr": "Yanomami",
  "vi": "ngữ hệ Yanomami",
  "sw": "familia ya Yanomami"
 },
 "Matacoan": {
  "ko": "마타코어족",
  "zh": "马塔科语系",
  "yue": "馬塔科語系",
  "uk": "Матако-матагуайська",
  "he": "מטאקואית",
  "de": "Mataco-Sprachen",
  "pt": "mataco",
  "id": "Mataco",
  "fr": "Mataco",
  "vi": "ngữ hệ Mataco",
  "sw": "familia ya Mataco"
 },
 "Trumai": {
  "ko": "트루마이어",
  "zh": "特鲁迈语",
  "yue": "特魯邁語",
  "uk": "трумаї",
  "he": "טרומאי"
 },
 "Nadahup": {
  "ko": "나다훕어족",
  "zh": "纳达胡普语系",
  "yue": "納達胡普語系",
  "uk": "Надахуп",
  "he": "נאדאהופ"
 },
 "Bassa": {
  "ko": "바사어",
  "zh": "巴萨语",
  "yue": "巴薩語",
  "sw": "Kibassa"
 },
 "Oshiwambo": {
  "ko": "오시왐보어",
  "zh": "奥万博语",
  "yue": "奧萬博語",
  "uk": "ошівамбо",
  "he": "אושיוומבו"
 },
 "Guthrie Zone H.20": {
  "ko": "거스리 구역 H.20",
  "zh": "格思里分区 H.20",
  "yue": "格思里分區 H.20",
  "uk": "зона Гатрі H.20",
  "he": "אזור גת׳רי H.20"
 },
 "Chokwe-Luchazi": {
  "ko": "초퀘-루차지어군",
  "zh": "乔奎-卢查齐语群",
  "yue": "喬奎-盧查齊語群",
  "uk": "чокве-лучазі",
  "he": "צ׳וקווה-לוצ׳אזי"
 },
 "Oirat-Kalmyk": {
  "ko": "오이라트-칼미크어",
  "zh": "卫拉特-卡尔梅克语",
  "yue": "衛拉特-卡爾梅克語",
  "uk": "ойратсько-калмицький",
  "he": "אויראטית-קלמיקית",
  "de": "Oiratisch-Kalmückisch",
  "fr": "Oïrat-kalmouk"
 },
 "creolized": {
  "ko": "크리올화",
  "zh": "克里奥尔化",
  "yue": "克里奧爾化",
  "uk": "креолізований",
  "he": "שעברה קריאוליזציה"
 },
 "Tonga-Lenje": {
  "ko": "통가-렌제어군",
  "zh": "汤加-伦杰语群",
  "yue": "湯加-倫傑語群",
  "uk": "тонга-ленже",
  "he": "טונגה-לנג׳ה"
 },
 "Castilian": {
  "ko": "카스티야어",
  "zh": "卡斯蒂利亚语",
  "yue": "卡斯蒂利亞語",
  "uk": "кастильська",
  "he": "קסטיליאנית",
  "de": "Kastilisch",
  "pt": "castelhano",
  "id": "Kastilia",
  "fr": "Castillan",
  "vi": "tiếng Castilla",
  "sw": "Kikastilia"
 },
 "Insular": {
  "ko": "도서",
  "zh": "海岛",
  "yue": "海島",
  "uk": "острівний",
  "he": "איים",
  "vi": "nhóm Celt hải đảo",
  "sw": "Kikelti cha Visiwani"
 },
 "Caribbean": {
  "ko": "카리브",
  "zh": "加勒比",
  "yue": "加勒比",
  "uk": "карибський",
  "he": "קריבית",
  "de": "Karibisch",
  "fr": "Caraïbe",
  "vi": "Caribe",
  "sw": "Karibi"
 },
 "Ring": {
  "ko": "링어군",
  "zh": "林语群",
  "yue": "林語群",
  "uk": "рінг",
  "he": "רינג"
 },
 "Mbum-Day": {
  "ko": "음붐-다이어군",
  "zh": "姆布姆-戴语支",
  "yue": "姆布姆-戴語支",
  "uk": "мбум-дай",
  "he": "מבום-דאי"
 },
 "likely isolate": {
  "ko": "고립어일 가능성이 높음",
  "zh": "可能为孤立语言",
  "yue": "可能係孤立語言",
  "uk": "імовірно ізольована",
  "he": "כנראה שפה מבודדת"
 },
 "Jurchen-Manchu": {
  "ko": "여진-만주어",
  "zh": "女真-满语",
  "yue": "女真-滿語",
  "uk": "чжурчженьсько-маньчжурський",
  "he": "ג׳ורצ׳נית-מנצ׳ורית",
  "de": "Dschurchisch-Mandschurisch",
  "fr": "Djurtchète-mandchou",
  "vi": "nhóm Nữ Chân-Mãn",
  "sw": "Kijurchen-Kimanchu"
 },
 "Kaqchikelan": {
  "ko": "칵치켈어군",
  "zh": "卡克奇克尔语支",
  "yue": "卡克奇克爾語支",
  "uk": "какчикельський",
  "he": "קקצ׳יקלית",
  "de": "Kaqchikel-Sprachen",
  "pt": "kaqchikel",
  "id": "Kaqchikel",
  "fr": "Kaqchikel",
  "vi": "nhóm Kaqchikel",
  "sw": "lugha za Kaqchikel"
 },
 "Mamean": {
  "ko": "맘어군",
  "zh": "马姆语支",
  "yue": "馬姆語支",
  "uk": "мамський",
  "he": "מאמית",
  "de": "Mam-Sprachen",
  "es": "mameana",
  "it": "mameana",
  "pt": "mameana",
  "id": "Mam",
  "fr": "Mam",
  "vi": "nhóm Mam",
  "sw": "lugha za Mam"
 },
 "Greater Mamean": {
  "ko": "대맘어군",
  "zh": "大马姆语支",
  "yue": "大馬姆語支",
  "uk": "великий мамський",
  "he": "מאמית רבתי"
 },
 "Ixilan": {
  "ko": "익실어군",
  "zh": "伊西尔语支",
  "yue": "伊西爾語支",
  "uk": "ішильський",
  "he": "אישילית"
 },
 "language isolate within Italy": {
  "ko": "이탈리아 안의 고립어",
  "zh": "意大利境内的孤立语言",
  "yue": "意大利境內嘅孤立語言",
  "uk": "ізольована мова в межах Італії",
  "he": "שפה מבודדת בתוך איטליה"
 },
 "Indo-European Celtic per Koch 2009": {
  "ko": "코흐(Koch 2009)에 따르면 인도유럽어족 켈트어파",
  "zh": "据Koch 2009为印欧语系凯尔特语族",
  "yue": "據Koch 2009係印歐語系凱爾特語族",
  "uk": "індоєвропейська кельтська за Koch 2009",
  "he": "הודו-אירופית קלטית לפי Koch 2009"
 },
 "non-IE per Untermann 1997": {
  "ko": "운터만(Untermann 1997)에 따르면 비인도유럽어",
  "zh": "据Untermann 1997为非印欧语",
  "yue": "據Untermann 1997係非印歐語",
  "uk": "неіндоєвропейська за Untermann 1997",
  "he": "לא הודו-אירופית לפי Untermann 1997"
 },
 "German-based": {
  "ko": "독일어 기반",
  "zh": "以德语为基础",
  "yue": "以德語為基礎",
  "uk": "на німецькій основі",
  "he": "מבוססת גרמנית"
 },
 "possibly Indo-European and Illyrian-related": {
  "ko": "인도유럽어족이며 일리리아어와 관련되었을 가능성",
  "zh": "可能属印欧语系并与伊利里亚语有关",
  "yue": "可能屬印歐語系並同伊利里亞語有關",
  "uk": "можливо, індоєвропейська й споріднена з іллірійською",
  "he": "אולי הודו-אירופית וקשורה לאילירית"
 },
 "possibly pre-IE": {
  "ko": "인도유럽어 이전 언어일 가능성",
  "zh": "可能为前印欧语",
  "yue": "可能係前印歐語",
  "uk": "можливо, доіндоєвропейська",
  "he": "אולי קדם-הודו-אירופית"
 },
 "or an independent IE branch": {
  "ko": "또는 독립된 인도유럽어파",
  "zh": "或为独立的印欧语族",
  "yue": "或為獨立嘅印歐語族",
  "uk": "або окрема індоєвропейська гілка",
  "he": "או ענף הודו-אירופי עצמאי"
 },
 "Pacific Coast": {
  "ko": "태평양 연안",
  "he": "חוף האוקיינוס השקט"
 },
 "Malay-based": {
  "ko": "말레이어 기반",
  "zh": "以马来语为基础",
  "yue": "以馬來語為基礎",
  "uk": "на малайській основі",
  "he": "מבוססת מלאית"
 },
 "heavily restructured": {
  "ko": "크게 재구조화됨",
  "zh": "经过大幅重构",
  "yue": "經過大幅重構",
  "uk": "значно перебудована",
  "he": "עברה ארגון מחדש ניכר"
 },
 "Balto-Slavic": {
  "ko": "발트슬라브어파",
  "zh": "波罗的-斯拉夫语族",
  "yue": "波羅的-斯拉夫語族",
  "uk": "балто-слов'янський",
  "he": "בלטו-סלאבית",
  "de": "Baltoslawisch",
  "fr": "Balto-slave",
  "vi": "nhóm Balt-Slav",
  "sw": "Kibaltiki-Kislaviki"
 },
 "Yolŋu": {
  "ko": "욜릉우어군",
  "zh": "约尔努语群",
  "yue": "約爾努語群",
  "uk": "йолнгу",
  "he": "יולנגו",
  "de": "Yolŋu"
 },
 "Dhuwal": {
  "ko": "두왈어",
  "zh": "杜瓦尔语",
  "yue": "杜瓦爾語",
  "uk": "дувал",
  "he": "דוואל"
 },
 "Esperantido": {
  "ko": "에스페란티도",
  "zh": "世界语衍生语",
  "yue": "世界語衍生語",
  "uk": "есперантидо",
  "he": "אספרנטידו",
  "fr": "Espérantide"
 },
 "Low Franconian": {
  "ko": "저지 프랑크어",
  "zh": "低地法兰克语",
  "yue": "低地法蘭克語",
  "uk": "нижньофранкський",
  "he": "פרנקית תחתית"
 },
 "Awadhi–Bhojpuri-based koiné": {
  "ko": "아와디어·보지푸리어 기반 코이네",
  "zh": "以阿瓦德语–博杰普尔语为基础的共通语",
  "yue": "以阿瓦德語–博傑普爾語為基礎嘅共通語",
  "uk": "койне на основі авадхі та бходжпурі",
  "he": "קוינה מבוססת אוודהי–בוג׳פורי"
 },
 "planned standard pooling Tashelhiyt": {
  "ko": "타셸히트어를 통합한 계획 표준어",
  "zh": "整合希尔哈语的规划标准语",
  "yue": "整合希爾哈語嘅規劃標準語",
  "uk": "запланований стандарт, що об'єднує ташельхіт",
  "he": "תקן מתוכנן המאגד תשלחית"
 },
 "Central Atlas Tamazight and Tarifit": {
  "ko": "중앙 아틀라스 타마지트어 및 타리피트어",
  "zh": "中阿特拉斯柏柏尔语及里夫语",
  "yue": "中阿特拉斯柏柏爾語同里夫語",
  "uk": "центральноатласький тамазігт і тарифіт",
  "he": "תמזיגת של האטלס המרכזי וריפית"
 },
 "Gheg": {
  "ko": "게그어",
  "zh": "盖格方言",
  "yue": "蓋格方言",
  "uk": "гегський",
  "he": "גגית"
 },
 "one of the two primary dialect groups alongside Tosk": {
  "ko": "토스크어와 함께 두 주요 방언군 중 하나",
  "zh": "与托斯克方言并列的两大方言群之一",
  "yue": "同托斯克方言並列嘅兩大方言群之一",
  "uk": "одна з двох основних діалектних груп поряд із тоскською",
  "he": "אחת משתי קבוצות הניבים העיקריות לצד הטוסקית"
 },
 "Nubian": {
  "ko": "누비아어군",
  "zh": "努比亚语支",
  "yue": "努比亞語支",
  "uk": "нубійський",
  "he": "נובית",
  "de": "Nubisch",
  "pt": "núbia",
  "id": "Nubia",
  "fr": "Nubien",
  "vi": "nhóm Nubia",
  "sw": "lugha za Kinubi"
 },
 "Fur": {
  "ko": "푸르어",
  "zh": "富尔语",
  "yue": "富爾語",
  "uk": "фур",
  "he": "פור",
  "fr": "Four",
  "sw": "Kifur"
 },
 "Nuclear Polynesian": {
  "ko": "핵심 폴리네시아어군",
  "zh": "核心波利尼西亚语支",
  "yue": "核心波利尼西亞語支",
  "uk": "ядерний полінезійський",
  "he": "פולינזית גרעינית"
 },
 "Ticuna–Yuri": {
  "ko": "티쿠나-유리어족",
  "zh": "提库纳-尤里语系",
  "yue": "提庫納-尤里語系",
  "uk": "Тікуна-юрі",
  "he": "טיקונה–יורי"
 },
 "usually treated as a language isolate": {
  "ko": "보통 고립어로 취급",
  "zh": "通常视为孤立语言",
  "yue": "通常視為孤立語言",
  "uk": "зазвичай вважається ізольованою мовою",
  "he": "בדרך כלל נחשבת לשפה מבודדת"
 },
 "its only relative Yuri being extinct": {
  "ko": "유일한 친족어인 유리어는 사멸",
  "zh": "其唯一亲属语言尤里语已消亡",
  "yue": "佢唯一嘅親屬語言尤里語已經消亡",
  "uk": "її єдина споріднена мова юрі вимерла",
  "he": "קרובתה היחידה, יורי, נכחדה"
 },
 "Wiradhuric": {
  "ko": "위라주리어군",
  "zh": "威拉朱里语群",
  "yue": "威拉朱里語群",
  "uk": "віраджурійський",
  "he": "וירדג׳ורית",
  "de": "Wiradjuri-Sprachen",
  "es": "wiradhuri",
  "it": "wiradhuri",
  "pt": "wiradhúrica",
  "id": "Wiradhurik",
  "fr": "Wiradjuri",
  "vi": "nhóm Wiradhuri",
  "sw": "lugha za Wiradhuri"
 },
 "Benue-Congo": {
  "ko": "베누에콩고어파",
  "zh": "贝努埃-刚果语支",
  "yue": "貝努埃-剛果語支",
  "uk": "бенуе-конголезький",
  "he": "בנואה-קונגו",
  "de": "Benue-Kongo",
  "fr": "Bénoué-congo",
  "sw": "Benue-Kongo"
 },
 "Guthrie zone L.52": {
  "ko": "거스리 구역 L.52",
  "zh": "格思里分区 L.52",
  "yue": "格思里分區 L.52",
  "uk": "зона Гатрі L.52",
  "he": "אזור גת׳רי L.52"
 },
 "close to but not descended from Classical Tibetan": {
  "ko": "고전 티베트어와 가깝지만 그 후손은 아님",
  "zh": "接近古典藏语但并非其后裔",
  "yue": "接近古典藏語但唔係佢嘅後裔",
  "uk": "близькі до класичної тибетської, але не походять від неї",
  "he": "קרובה לטיבטית הקלאסית אך אינה צאצאית שלה"
 },
 "Himalayish": {
  "ko": "히말라야어군",
  "zh": "喜马拉雅语支",
  "yue": "喜馬拉雅語支",
  "uk": "гімалайський",
  "he": "הימלאית"
 },
 "isolated within it": {
  "ko": "그 안에서 고립됨",
  "zh": "在其中处于孤立地位",
  "yue": "喺其中處於孤立地位",
  "uk": "ізольована в її межах",
  "he": "מבודדת בתוכה"
 },
 "sometimes linked to Mahakiranti": {
  "ko": "때때로 마하키란티어군과 연결됨",
  "zh": "有时与大基兰蒂语支相联系",
  "yue": "有時同大基蘭蒂語支相聯繫",
  "uk": "іноді пов'язується з магакіранті",
  "he": "לעתים מקושרת למהאקירנטי"
 },
 "Five Nations": {
  "zh": "五族语支",
  "yue": "五族語支",
  "uk": "п'ять націй",
  "he": "חמש האומות"
 },
 "Edoid": {
  "zh": "埃多语支",
  "yue": "埃多語支",
  "uk": "едоїдний",
  "he": "אדואידית",
  "de": "Edoide Sprachen",
  "es": "edoide",
  "it": "edoide",
  "pt": "edoide",
  "fr": "Edoïde",
  "vi": "nhóm Edo",
  "sw": "lugha za Edo"
 },
 "Macro-Jê": {
  "zh": "大热语系",
  "yue": "大熱語系",
  "uk": "Макро-же",
  "he": "מאקרו-ז׳ה",
  "de": "Makro-Ge",
  "es": "macro-yê",
  "it": "macro-gê",
  "fr": "Macro-jê"
 },
 "Sukuma-Nyamwezi": {
  "zh": "苏库马-尼扬韦齐语群",
  "yue": "蘇庫馬-尼揚韋齊語群",
  "uk": "сукума-ньямвезі",
  "he": "סוקומה-ניאמווזי"
 },
 "Chaga": {
  "zh": "查加语群",
  "yue": "查加語群",
  "uk": "чага",
  "he": "צ׳אגה",
  "de": "Chagga",
  "sw": "Kichagga"
 },
 "Manchu-Nanai": {
  "zh": "满-那乃语支",
  "yue": "滿-那乃語支",
  "uk": "маньчжуро-нанайський",
  "he": "מנצ׳ו-ננאי",
  "vi": "nhóm Mãn-Nanai"
 },
 "Gurage": {
  "zh": "古拉格语群",
  "yue": "古拉格語群",
  "uk": "гураге",
  "he": "גוראגה"
 },
 "Southern Indo-Aryan": {
  "zh": "南部印度-雅利安语支",
  "yue": "南部印度-雅利安語支",
  "uk": "південноіндоарійський",
  "he": "הודו-ארית דרומית"
 },
 "Cross River": {
  "zh": "克罗斯河语支",
  "yue": "克羅斯河語支",
  "uk": "крос-ріверський",
  "he": "קרוס ריבר"
 },
 "Lower Cross": {
  "zh": "下克罗斯语群",
  "yue": "下克羅斯語群",
  "uk": "нижньокроський",
  "he": "קרוס התחתונה"
 },
 "Yao-Makonde": {
  "zh": "尧-马孔德语群",
  "yue": "堯-馬孔德語群",
  "uk": "яо-маконде",
  "he": "יאו-מקונדה"
 },
 "German": {
  "zh": "德语",
  "yue": "德語",
  "uk": "німецька",
  "he": "גרמנית",
  "vi": "tiếng Đức"
 },
 "Italo-Romance": {
  "zh": "意大利-罗曼语支",
  "yue": "意大利-羅曼語支",
  "uk": "італо-романський",
  "he": "רומאנית איטלקית",
  "de": "Italoromanisch",
  "fr": "Italo-roman",
  "vi": "nhóm Ý-Rôman",
  "sw": "Kiitalo-Kiromance"
 },
 "Madang": {
  "zh": "马当语群",
  "yue": "馬當語群",
  "uk": "маданг",
  "he": "מדאנג"
 },
 "Sami": {
  "zh": "萨米语支",
  "yue": "薩米語支",
  "uk": "саамський",
  "he": "סאמית",
  "de": "Samisch",
  "fr": "Same",
  "vi": "nhóm Sami",
  "sw": "Kisami"
 },
 "Kola Sami": {
  "zh": "科拉萨米语",
  "yue": "科拉薩米語",
  "uk": "кольська саамська",
  "he": "סאמית של קולה"
 },
 "Nahuan": {
  "zh": "纳瓦语支",
  "yue": "納瓦語支",
  "uk": "науанський",
  "he": "נאוואית",
  "de": "Nahua-Sprachen",
  "es": "nahua",
  "it": "nahua",
  "pt": "nahua",
  "id": "Nahua",
  "fr": "Nahua",
  "vi": "nhóm Nahua",
  "sw": "lugha za Kinahua"
 },
 "Jin": {
  "zh": "晋语",
  "yue": "晉語",
  "uk": "цзінь",
  "he": "ג׳ין",
  "vi": "tiếng Tấn",
  "sw": "Kichina cha Jin"
 },
 "Xiang": {
  "zh": "湘语",
  "yue": "湘語",
  "uk": "сян",
  "he": "שיאנג",
  "vi": "tiếng Tương",
  "sw": "Kichina cha Xiang"
 },
 "Gan": {
  "zh": "赣语",
  "yue": "贛語",
  "uk": "гань",
  "he": "גאן",
  "vi": "tiếng Cám",
  "sw": "Kichina cha Gan"
 },
 "Fula": {
  "zh": "富拉语",
  "yue": "富拉語",
  "uk": "фула",
  "he": "פולה",
  "de": "Fulfulde",
  "fr": "Peul",
  "sw": "Kifula"
 },
 "Kiranti": {
  "zh": "基兰蒂语支",
  "yue": "基蘭蒂語支",
  "uk": "кіранті",
  "he": "קירנטי"
 },
 "Tani": {
  "zh": "塔尼语支",
  "yue": "塔尼語支",
  "uk": "тані",
  "he": "טאני"
 },
 "Bikol": {
  "zh": "比科尔语群",
  "yue": "比科爾語群",
  "uk": "бікольський",
  "he": "ביקול"
 },
 "Mel": {
  "zh": "梅尔语支",
  "yue": "梅爾語支",
  "uk": "мел",
  "he": "מל"
 },
 "Kru": {
  "zh": "克鲁语支",
  "yue": "克魯語支",
  "uk": "кру",
  "he": "קרו",
  "sw": "Kikru"
 },
 "Herero": {
  "zh": "赫雷罗语",
  "yue": "赫雷羅語",
  "uk": "гереро",
  "he": "הררו",
  "sw": "Kiherero"
 },
 "Ethio-Semitic": {
  "zh": "埃塞俄比亚闪米特语支",
  "yue": "埃塞俄比亞閃米特語支",
  "uk": "ефіосемітський",
  "he": "שמית אתיופית",
  "de": "Äthiosemitisch",
  "fr": "Éthiosémitique",
  "vi": "nhóm Semit Ethiopia",
  "sw": "Kisemiti cha Ethiopia"
 },
 "separate from IE": {
  "zh": "独立于印欧语",
  "yue": "獨立於印歐語",
  "uk": "окремо від індоєвропейських",
  "he": "נפרדת מההודו-אירופית"
 },
 "Sundic": {
  "zh": "巽他语群",
  "yue": "巽他語群",
  "uk": "зондський",
  "he": "סונדית",
  "de": "Sundisch",
  "es": "súndica",
  "it": "sundica",
  "pt": "súndica",
  "id": "Sundik",
  "fr": "Sondique",
  "vi": "nhóm Sunda",
  "sw": "lugha za Kisunda"
 },
 "Grassfields": {
  "zh": "草原班图语群",
  "yue": "草原班圖語群",
  "uk": "грасфілдс",
  "he": "גראספילדס",
  "de": "Grasland-Sprachen"
 },
 "possibly Eastern Sudanic": {
  "zh": "可能属东苏丹语族",
  "yue": "可能屬東蘇丹語族",
  "uk": "можливо, східносуданська",
  "he": "אולי סודנית מזרחית"
 },
 "Eastern Indo-Aryan": {
  "zh": "东部印度-雅利安语支",
  "yue": "東部印度-雅利安語支",
  "uk": "східноіндоарійський",
  "he": "הודו-ארית מזרחית"
 },
 "Danao": {
  "yue": "達瑙語群",
  "uk": "данао",
  "he": "דנאו"
 },
 "Philippine": {
  "yue": "菲律賓語群",
  "uk": "філіппінський",
  "he": "פיליפינית",
  "de": "Philippinisch",
  "fr": "Philippin",
  "vi": "nhóm Philippines",
  "sw": "lugha za Ufilipino"
 },
 "Central New South Wales": {
  "yue": "新南威爾士中部語群",
  "uk": "центральний Новий Південний Уельс",
  "he": "מרכז ניו סאות׳ ויילס"
 },
 "Chadic": {
  "uk": "чадський",
  "he": "צ׳אדית",
  "de": "Tschadisch",
  "es": "chádica",
  "it": "ciadica",
  "pt": "chádica",
  "id": "Chadik",
  "fr": "Tchadique",
  "vi": "ngữ tộc Tchad",
  "sw": "lugha za Kichadi"
 },
 "Southeastern": {
  "uk": "південно-східний",
  "he": "דרום-מזרחית",
  "vi": "Đông Nam",
  "sw": "Kusini-Mashariki"
 },
 "debated": {
  "uk": "дискусійно",
  "he": "שנוי במחלוקת"
 },
 "Northeast Coast": {
  "he": "החוף הצפון-מזרחי"
 },
 "Rai Coast": {
  "he": "חוף ראי"
 },
 "reconstructed": {
  "he": "משוחזרת"
 },
 "Tuareg": {
  "he": "טוארגית",
  "pt": "tuaregue",
  "fr": "Touareg",
  "sw": "Kituareg"
 },
 "Gorontalo-Mongondow": {
  "he": "גורונטלו-מונגונדאו"
 },
 "Paiwanic": {
  "he": "פאיוואנית",
  "de": "Paiwan-Sprachen",
  "es": "paiwánica",
  "it": "paiwanica",
  "pt": "paiwânica",
  "id": "Paiwanik",
  "fr": "Paiwanique",
  "vi": "nhóm Paiwan",
  "sw": "lugha za Paiwan"
 },
 "Omotic": {
  "he": "אומוטית",
  "de": "Omotisch",
  "es": "omótica",
  "it": "omotica",
  "pt": "omótica",
  "id": "Omotik",
  "fr": "Omotique",
  "vi": "ngữ tộc Omo",
  "sw": "lugha za Kiomo"
 },
 "Algonquian": {
  "de": "Algonkin",
  "es": "algonquina",
  "it": "algonchina",
  "pt": "algonquina",
  "id": "Algonkin",
  "fr": "Algonquien",
  "vi": "Algonquin",
  "sw": "lugha za Algonquin"
 },
 "Micronesian": {
  "de": "Mikronesisch",
  "es": "micronesia",
  "it": "micronesiana",
  "pt": "micronésia",
  "id": "Mikronesia",
  "fr": "Micronésien",
  "sw": "lugha za Kimikronesia"
 },
 "Dardic": {
  "de": "Dardisch",
  "es": "dárdica",
  "it": "dardica",
  "pt": "dárdica",
  "id": "Dardik",
  "fr": "Dardique",
  "vi": "nhóm Dard",
  "sw": "lugha za Kidardi"
 },
 "Bodish": {
  "de": "Bodisch",
  "es": "bódica",
  "it": "bodica",
  "pt": "bódica",
  "id": "Bodik",
  "fr": "Bodique",
  "vi": "nhóm Bod",
  "sw": "lugha za Bod"
 },
 "Oghuz": {
  "de": "Oghusisch",
  "pt": "oguz",
  "fr": "Oghouze"
 },
 "Kipchak": {
  "de": "Kiptschakisch",
  "pt": "quipchaca",
  "fr": "Kiptchak"
 },
 "Oghur": {
  "de": "Oghurisch",
  "pt": "ogúrica",
  "fr": "Oghour"
 },
 "Shirongol": {
  "de": "Shirongolisch",
  "fr": "Shirongol"
 },
 "Monguoric": {
  "de": "Monguorisch",
  "pt": "monguórica",
  "id": "Monguorik",
  "fr": "Monguor",
  "sw": "lugha za Monguor"
 },
 "Samoyedic": {
  "de": "Samojedisch",
  "es": "samoyeda",
  "it": "samoieda",
  "pt": "samoieda",
  "id": "Samoyedik",
  "fr": "Samoyède",
  "vi": "nhóm Samoyed",
  "sw": "lugha za Kisamoyedi"
 },
 "Ob-Ugric": {
  "de": "Obugrisch",
  "vi": "nhánh Ugor Ob",
  "sw": "Kiugori cha Ob"
 },
 "Kamchatkan": {
  "de": "Kamtschadalisch",
  "pt": "kamchatkana",
  "id": "Kamchatka",
  "fr": "Kamtchatkien",
  "sw": "Kikamchatka"
 },
 "Yukaghir": {
  "de": "Jukagirisch",
  "es": "yukaguir",
  "it": "iukaghira",
  "pt": "iucaguir",
  "fr": "Youkaguir"
 },
 "Lechitic": {
  "de": "Lechisch",
  "es": "lequítica",
  "it": "lechitica",
  "pt": "lequítica",
  "id": "Lekhitik",
  "fr": "Léchitique",
  "vi": "nhóm Lechit",
  "sw": "lugha za Lechiti"
 },
 "Athabaskan": {
  "de": "Athapaskisch",
  "es": "atabascana",
  "it": "athabaska",
  "pt": "atabascana",
  "id": "Athabaska",
  "fr": "Athapascan",
  "vi": "nhóm Athabasca",
  "sw": "lugha za Athabaska"
 },
 "Loloish": {
  "de": "Loloisch",
  "es": "lolo",
  "it": "lolo",
  "pt": "lolo",
  "id": "Lolo",
  "fr": "Loloïque",
  "sw": "lugha za Lolo"
 },
 "Italo-Dalmatian": {
  "de": "Italodalmatisch",
  "fr": "Italo-dalmate",
  "sw": "Kiitalo-Dalmatia"
 },
 "Gallo-Romance": {
  "de": "Galloromanisch",
  "fr": "Gallo-roman",
  "sw": "Kigallo-Kiromance"
 },
 "Finnic": {
  "de": "Ostseefinnisch",
  "es": "fínica",
  "it": "finnica",
  "pt": "fínica",
  "id": "Finnik",
  "fr": "Fennique",
  "vi": "nhóm Finn",
  "sw": "lugha za Kifini"
 },
 "Rhaeto-Romance": {
  "de": "Rätoromanisch",
  "fr": "Rhéto-roman",
  "sw": "Kiretoromani"
 },
 "Yucatecan": {
  "de": "Yukatekisch",
  "pt": "iucateca",
  "id": "Yukatek",
  "fr": "Yucatèque",
  "vi": "nhóm Yucatec",
  "sw": "lugha za Yukatani"
 },
 "Mixtecan": {
  "de": "Mixtekisch",
  "es": "mixtecana",
  "it": "mixtecana",
  "pt": "mixteca",
  "id": "Mixtek",
  "fr": "Mixtèque",
  "vi": "nhóm Mixtec",
  "sw": "lugha za Mixtec"
 },
 "Zapotecan": {
  "de": "Zapotekisch",
  "es": "zapotecana",
  "it": "zapotecana",
  "pt": "zapoteca",
  "id": "Zapotek",
  "fr": "Zapotèque",
  "vi": "nhóm Zapotec",
  "sw": "lugha za Zapotec"
 },
 "Nakh": {
  "de": "Nachisch"
 },
 "Lezgic": {
  "de": "Lesgisch",
  "es": "lezguica",
  "it": "lezgica",
  "pt": "lezguiana",
  "id": "Lezgik",
  "fr": "Lezguien",
  "vi": "nhóm Lezgi",
  "sw": "lugha za Kilezgi"
 },
 "Dargic": {
  "de": "Darginisch",
  "es": "darguina",
  "it": "dargica",
  "pt": "darguínica",
  "id": "Dargik",
  "fr": "Darguine",
  "vi": "nhóm Dargin",
  "sw": "lugha za Dargin"
 },
 "Circassian": {
  "de": "Tscherkessisch",
  "pt": "circassiana",
  "id": "Sirkasia",
  "fr": "Circassien",
  "vi": "nhóm Circassia",
  "sw": "lugha za Kisirkasia"
 },
 "Tahitic": {
  "de": "Tahitisch",
  "es": "tahítica",
  "it": "tahitica",
  "pt": "taitiana",
  "id": "Tahiti",
  "fr": "Tahitique",
  "sw": "lugha za Kitahiti"
 },
 "Malayic": {
  "de": "Malaiisch",
  "pt": "malaica",
  "id": "Melayik",
  "fr": "Malaïque",
  "sw": "lugha za Kimalay"
 },
 "Chamic": {
  "de": "Chamisch",
  "es": "chámica",
  "it": "chamica",
  "pt": "châmica",
  "id": "Chamik",
  "fr": "Chamique",
  "sw": "lugha za Kichamu"
 },
 "Sorbian": {
  "de": "Sorbisch",
  "es": "soraba",
  "it": "soraba",
  "pt": "sorábia",
  "id": "Sorbia",
  "fr": "Sorabe",
  "vi": "nhóm Sorb",
  "sw": "Kisorbia"
 },
 "Astur-Leonese": {
  "de": "Asturleonesisch",
  "fr": "Asturo-léonais",
  "vi": "nhóm Astur-León",
  "sw": "Kiasturia-Leoni"
 },
 "Pyrenean": {
  "de": "Pyrenäisch",
  "pt": "pirenaica",
  "id": "Pirenia",
  "fr": "Pyrénéen",
  "vi": "nhóm Pyrénées",
  "sw": "lugha za Pirenei"
 },
 "Permic": {
  "de": "Permisch",
  "es": "pérmica",
  "it": "permica",
  "pt": "pérmica",
  "id": "Permik",
  "fr": "Permien",
  "vi": "nhóm Perm",
  "sw": "lugha za Kiperm"
 },
 "Mordvinic": {
  "de": "Mordwinisch",
  "es": "mordvina",
  "it": "mordvinica",
  "pt": "mordovínica",
  "id": "Mordvinik",
  "fr": "Mordve",
  "vi": "nhóm Mordvin",
  "sw": "lugha za Kimordvin"
 },
 "Oceanic": {
  "de": "Ozeanisch",
  "es": "oceánica",
  "it": "oceanica",
  "pt": "oceânica",
  "id": "Oseania",
  "fr": "Océanien",
  "sw": "lugha za Kiosheania"
 },
 "Aramaic": {
  "de": "Aramäisch",
  "pt": "aramaica",
  "id": "Aram",
  "fr": "Araméen",
  "sw": "Kiaramu"
 },
 "Goidelic": {
  "de": "Goidelisch",
  "es": "goidélica",
  "it": "goidelica",
  "pt": "goidélica",
  "id": "Goidelik",
  "fr": "Goïdélique",
  "vi": "nhóm Goidel",
  "sw": "lugha za Kigaeli"
 },
 "Brythonic": {
  "de": "Britannisch",
  "es": "britónica",
  "it": "brittonica",
  "pt": "britônica",
  "id": "Britonik",
  "fr": "Brittonique",
  "vi": "nhóm Britton",
  "sw": "lugha za Kibritoni"
 },
 "Ubangian": {
  "de": "Ubangisch",
  "es": "ubangiana",
  "it": "ubangiana",
  "pt": "ubangiana",
  "id": "Ubangi",
  "fr": "Oubanguien",
  "vi": "nhóm Ubangi",
  "sw": "lugha za Ubangi"
 },
 "Canaanite": {
  "de": "Kanaanäisch",
  "pt": "cananeia",
  "id": "Kanaan",
  "fr": "Cananéen",
  "vi": "nhóm Canaan",
  "sw": "lugha za Kikanaani"
 },
 "Elamite": {
  "de": "Elamisch",
  "pt": "elamita",
  "id": "Elam",
  "fr": "Élamite",
  "sw": "Kielami"
 },
 "Nilotic": {
  "de": "Nilotisch",
  "es": "nilótica",
  "it": "nilotica",
  "pt": "nilótica",
  "id": "Nilotik",
  "fr": "Nilotique",
  "vi": "nhóm Nin",
  "sw": "Kiniloti"
 },
 "Lurish": {
  "de": "Lurisch",
  "pt": "luri",
  "id": "Luri",
  "fr": "Lori",
  "vi": "nhóm Lur",
  "sw": "Kiluri"
 },
 "Karluk": {
  "de": "Karlukisch",
  "pt": "carluque",
  "fr": "Karlouk"
 },
 "Scythian": {
  "de": "Skythisch",
  "pt": "cita",
  "id": "Skithia",
  "fr": "Scythe",
  "vi": "tiếng Scythia",
  "sw": "Kiskithi"
 },
 "Frisian": {
  "de": "Friesisch",
  "pt": "frísia",
  "id": "Frisia",
  "fr": "Frison",
  "sw": "Kifrisia"
 },
 "Tyrsenian": {
  "de": "Tyrsenisch",
  "es": "tirsénica",
  "it": "tirrenica",
  "pt": "tirsênica",
  "id": "Tirsenia",
  "fr": "Tyrsénien",
  "sw": "familia ya Tyrsenia"
 },
 "Formosan": {
  "de": "Formosanisch",
  "es": "formosana",
  "it": "formosana",
  "pt": "formosana",
  "id": "Formosa",
  "vi": "nhóm Đài Loan",
  "sw": "lugha za Kiformosa"
 },
 "Vietic": {
  "de": "Vietisch",
  "es": "viética",
  "it": "vietica",
  "pt": "viética",
  "id": "Vietik",
  "fr": "Viétique",
  "sw": "lugha za Kivietinamu"
 },
 "Saami": {
  "de": "Samisch",
  "fr": "Same",
  "vi": "nhóm Sami",
  "sw": "Kisami"
 },
 "Aleut": {
  "de": "Aleutisch",
  "pt": "aleúte",
  "fr": "Aléoute"
 },
 "Avar-Andic": {
  "de": "Awarisch-Andisch",
  "fr": "Avaro-andi",
  "vi": "nhóm Avar-Andi",
  "sw": "lugha za Avar-Andi"
 },
 "Lak-Dargic": {
  "de": "Lakisch-Darginisch",
  "fr": "Lak-darguine",
  "vi": "nhóm Lak-Dargin",
  "sw": "lugha za Lak-Dargin"
 },
 "Abkhaz-Abaza": {
  "de": "Abchasisch-Abasinisch",
  "fr": "Abkhaze-abaza"
 },
 "Tongic": {
  "de": "Tongaisch",
  "es": "tongana",
  "it": "tongana",
  "pt": "tongana",
  "id": "Tonga",
  "fr": "Tongique",
  "sw": "lugha za Tonga"
 },
 "Ethiopian": {
  "de": "Äthiopisch",
  "id": "Etiopia",
  "fr": "Éthiopien",
  "vi": "nhóm Ethiopia",
  "sw": "lugha za Kiethiopia"
 },
 "Azerbaijani": {
  "de": "Aserbaidschanisch",
  "pt": "azerbaijano",
  "id": "Azerbaijan",
  "fr": "Azéri",
  "vi": "tiếng Azerbaijan",
  "sw": "Kiazeri"
 },
 "Dutch": {
  "de": "Niederländisch",
  "fr": "Néerlandais",
  "sw": "Kiholanzi"
 },
 "Saharan": {
  "de": "Saharanisch",
  "pt": "saariana",
  "id": "Sahara",
  "fr": "Saharien",
  "vi": "nhóm Sahara",
  "sw": "lugha za Sahara"
 },
 "Caspian": {
  "de": "Kaspisch",
  "fr": "Caspien",
  "vi": "nhóm Caspi",
  "sw": "lugha za Kaspi"
 },
 "Visayan": {
  "de": "Visaya-Sprachen",
  "pt": "bisaia",
  "id": "Bisaya",
  "fr": "Bisaya",
  "sw": "lugha za Kibisaya"
 },
 "Burmish": {
  "de": "Birmanische Sprachen",
  "es": "birmana",
  "it": "birmana",
  "pt": "birmânica",
  "id": "Burmik",
  "fr": "Langues birmanes",
  "vi": "nhóm Miến",
  "sw": "lugha za Kiburma"
 },
 "Burmic": {
  "de": "Burmisch",
  "es": "birmánica",
  "it": "birmanica",
  "pt": "birmânica",
  "id": "Burmik",
  "fr": "Birmique",
  "vi": "nhóm Miến",
  "sw": "lugha za Kiburma"
 },
 "Karenic": {
  "de": "Karen-Sprachen",
  "es": "lenguas karen",
  "it": "lingue karen",
  "pt": "karênica",
  "id": "Karenik",
  "fr": "Langues karens",
  "vi": "nhóm Karen",
  "sw": "lugha za Karen"
 },
 "Palaungic": {
  "de": "Palaung-Sprachen",
  "es": "lenguas palaung",
  "it": "lingue palaung",
  "pt": "palaúngica",
  "id": "Palaungik",
  "fr": "Palaungique",
  "sw": "lugha za Palaung"
 },
 "Khmuic": {
  "de": "Khmu-Sprachen",
  "es": "lenguas khmu",
  "it": "lingue khmu",
  "pt": "khmúica",
  "id": "Khmuik",
  "fr": "Khmuique",
  "sw": "lugha za Khmu"
 },
 "Khmeric": {
  "de": "Khmer-Sprachen",
  "es": "lenguas jemer",
  "it": "lingue khmer",
  "pt": "khmérica",
  "id": "Khmerik",
  "fr": "Khmérique",
  "sw": "lugha za Kikhmer"
 },
 "Monic": {
  "de": "Mon-Sprachen",
  "es": "lenguas mon",
  "it": "lingue mon",
  "pt": "mônica",
  "id": "Monik",
  "fr": "Mônique",
  "sw": "lugha za Kimon"
 },
 "Khasian": {
  "de": "Khasi-Sprachen",
  "pt": "khasiana",
  "id": "Khasi",
  "fr": "Khasi",
  "sw": "lugha za Kikhasi"
 },
 "Batanic": {
  "de": "Batan-Sprachen",
  "es": "batánica",
  "it": "batanica",
  "pt": "batânica",
  "id": "Batanik",
  "fr": "Batanique",
  "vi": "nhóm Batan",
  "sw": "lugha za Batan"
 },
 "Otomian": {
  "de": "Otomí-Sprachen",
  "es": "otomiana",
  "it": "otomiana",
  "pt": "otomiana",
  "id": "Otomi",
  "fr": "Otomi",
  "vi": "nhóm Otomi",
  "sw": "lugha za Otomi"
 },
 "Jivaroan": {
  "de": "Jívaro-Sprachen",
  "es": "jíbara",
  "it": "jivaro",
  "pt": "jívara",
  "id": "Jivaro",
  "fr": "Jivaro",
  "sw": "familia ya Jivaro"
 },
 "Ellicean": {
  "de": "Ellice-Sprachen",
  "es": "eliceana",
  "it": "elliceana",
  "pt": "elliceana",
  "id": "Ellice",
  "fr": "Ellicéen",
  "sw": "lugha za Ellice"
 },
 "Lampungic": {
  "de": "Lampung-Sprachen",
  "es": "lampung",
  "it": "lampung",
  "pt": "lampúngica",
  "id": "Lampungik",
  "fr": "Lampung",
  "vi": "nhóm Lampung",
  "sw": "Kilampung"
 },
 "Atayalic": {
  "de": "Atayal-Sprachen",
  "es": "atayálica",
  "it": "atayalica",
  "pt": "atayálica",
  "id": "Atayalik",
  "fr": "Atayalique",
  "vi": "nhóm Atayal",
  "sw": "lugha za Atayal"
 },
 "Tsouic": {
  "de": "Tsou-Sprachen",
  "es": "lenguas tsou",
  "it": "lingue tsou",
  "pt": "tsouica",
  "id": "Tsouik",
  "fr": "Tsouique",
  "vi": "nhóm Tsou",
  "sw": "lugha za Tsou"
 },
 "Sabahan": {
  "de": "Sabah-Sprachen",
  "es": "sabahana",
  "it": "sabahana",
  "pt": "sabahana",
  "id": "Sabah",
  "fr": "Sabahien",
  "vi": "nhóm Sabah",
  "sw": "lugha za Sabah"
 },
 "Quichean": {
  "de": "Quiché-Sprachen",
  "es": "quicheana",
  "it": "quicheana",
  "pt": "quicheana",
  "id": "Kiche",
  "fr": "Quichéen",
  "vi": "nhóm K'iche'",
  "sw": "lugha za Kiche"
 },
 "Taracahitan": {
  "de": "Taracahita-Sprachen",
  "es": "taracahita",
  "it": "taracahita",
  "pt": "taracahita",
  "id": "Taracahita",
  "fr": "Taracahita",
  "vi": "nhóm Taracahita",
  "sw": "lugha za Taracahita"
 },
 "Engan": {
  "de": "Enga-Sprachen",
  "es": "enga",
  "it": "enga",
  "pt": "enga",
  "fr": "Enga",
  "vi": "nhóm Enga",
  "sw": "lugha za Enga"
 },
 "Saka": {
  "de": "Sakisch",
  "sw": "Kisaka"
 },
 "Jingpho": {
  "de": "Jingpo",
  "fr": "Jingpo",
  "vi": "tiếng Cảnh Pha",
  "sw": "Kijingpho"
 },
 "Jê": {
  "de": "Ge",
  "es": "yê",
  "it": "gê"
 },
 "Manding": {
  "pt": "mandinga",
  "sw": "Kimanding"
 },
 "Songhai": {
  "pt": "songai",
  "fr": "Songhaï",
  "vi": "nhóm Songhay",
  "sw": "Kisonghai"
 },
 "Rajasthani": {
  "pt": "rajastani",
  "vi": "tiếng Rajasthan",
  "sw": "Kirajasthani"
 },
 "Khoisan": {
  "pt": "coissã"
 },
 "Yupik": {
  "pt": "iúpique"
 },
 "Naic": {
  "pt": "naica",
  "id": "Na"
 },
 "Adamawa": {
  "pt": "adamaua",
  "fr": "Adamaoua"
 },
 "Pamir": {
  "pt": "pamírica",
  "sw": "lugha za Kipamiri"
 },
 "Polynesian": {
  "id": "Polinesia",
  "sw": "lugha za Kipolinesia"
 },
 "Iberian": {
  "id": "Iberia",
  "sw": "lugha za Iberia"
 },
 "Chibchan": {
  "fr": "Chibcha"
 },
 "Min Nan": {
  "vi": "tiếng Mân Nam",
  "sw": "Kimin-Nan"
 },
 "Wu": {
  "vi": "tiếng Ngô",
  "sw": "Kichina cha Wu"
 },
 "Hakka": {
  "vi": "tiếng Khách Gia",
  "sw": "Kichina cha Hakka"
 },
 "Pinghua": {
  "vi": "tiếng Bình thoại",
  "sw": "Kichina cha Pinghua"
 },
 "Pu-Xian Min": {
  "vi": "tiếng Mân Phủ Tiên",
  "sw": "Kipu-Xian"
 },
 "Romani": {
  "vi": "tiếng Digan",
  "sw": "Kiromani"
 },
 "Cholan-Tseltalan": {
  "vi": "nhóm Chol-Tzeltal",
  "sw": "lugha za Chol-Tzeltal"
 },
 "Bihari": {
  "vi": "nhóm Bihar",
  "sw": "Kibihari"
 },
 "Hani": {
  "vi": "tiếng Hà Nhì",
  "sw": "Kihani"
 },
 "Tujia": {
  "vi": "tiếng Thổ Gia",
  "sw": "Kitujia"
 },
 "Maritime": {
  "vi": "Duyên hải",
  "sw": "Pwani"
 },
 "Tai": {
  "vi": "nhóm Thái",
  "sw": "lugha za Kitai"
 },
 "Nilo-Saharan": {
  "vi": "Nin-Sahara"
 },
 "NE Caucasian": {
  "vi": "Kavkaz Đông Bắc"
 },
 "NW Caucasian": {
  "vi": "Kavkaz Tây Bắc"
 },
 "Celebic": {
  "vi": "nhánh Celebes"
 },
 "Tsezic": {
  "vi": "nhánh Tsez"
 },
 "Numic": {
  "vi": "nhánh Numa"
 },
 "Munda": {
  "sw": "Kimunda"
 },
 "Mon-Khmer": {
  "sw": "Kimon-Khmer"
 },
 "Mandarin": {
  "sw": "Kimandarini"
 },
 "Malayo-Polynesian": {
  "sw": "Kimalayo-Polinesia"
 },
 "Tibeto-Burman": {
  "sw": "Kitibeti-Kiburma"
 },
 "Melanesian Pijin": {
  "sw": "Pijin ya Melanesia"
 },
 "Mande": {
  "sw": "Kimande"
 },
 "Berber": {
  "sw": "Kiberiberi"
 },
 "Maa": {
  "sw": "Kimaa"
 },
 "Mari": {
  "sw": "Kimari"
 },
 "Gur": {
  "sw": "Kigur"
 },
 "Gbe": {
  "sw": "Kigbe"
 },
 "Bhili": {
  "sw": "Kibhili"
 },
 "Beti": {
  "sw": "Kibeti"
 },
 "Shona": {
  "sw": "Kishona"
 },
 "Bunun": {
  "sw": "Kibunun"
 },
 "Karen": {
  "sw": "Kikaren"
 },
 "Toraja-Sa'dan": {
  "sw": "Kitoraja-Sa'dan"
 },
 "Tupi-Guarani": {
  "sw": "Kitupi-Guarani"
 },
 "Southwestern": {
  "sw": "Kusini-Magharibi"
 },
 "Northwestern": {
  "sw": "Kaskazini-Magharibi"
 },
 "Southwest": {
  "sw": "Kusini-Magharibi"
 },
 "Northwest": {
  "sw": "Kaskazini-Magharibi"
 },
 "Middle": {
  "sw": "kipindi cha kati"
 },
 "auxiliary": {
  "sw": "saidizi"
 },
 "naturalistic": {
  "sw": "kiasili"
 },
 "Old": {
  "sw": "Kale"
 },
 "pre-classical": {
  "sw": "kabla ya kipindi cha klasiki"
 }
};
  const F = {
 "Eastern Hindi": {
  "zh": "东印地语",
  "yue": "東印地語",
  "he": "הינדית מזרחית"
 },
 "Northern Berber": {
  "zh": "北柏柏尔语支",
  "yue": "北柏柏爾語支",
  "uk": "північноберберський",
  "he": "ברברית צפונית"
 },
 "Burmish": {
  "zh": "缅语支",
  "yue": "緬語支"
 },
 "Tupí-Guaraní": {
  "zh": "图皮-瓜拉尼语族",
  "yue": "圖皮-瓜拉尼語族",
  "uk": "тупі-гуаранійська гілка",
  "he": "טופי-גוארני",
  "de": "Tupí-Guaraní",
  "es": "tupí-guaraní",
  "it": "tupí-guaraní",
  "pt": "tupi-guarani",
  "id": "Tupi-Guarani",
  "fr": "Tupi-guarani",
  "vi": "nhánh Tupi-Guarani",
  "sw": "Kitupi-Guarani"
 },
 "Jê": {
  "zh": "热语族",
  "yue": "熱語族",
  "uk": "же",
  "he": "ז׳ה"
 },
 "Southern Jê": {
  "ko": "남부 제어군",
  "zh": "南热语支",
  "yue": "南熱語支",
  "uk": "південні же",
  "he": "ז׳ה דרומית",
  "de": "Süd-Ge",
  "es": "yê meridional",
  "it": "gê meridionale",
  "pt": "jê meridional",
  "id": "Jê Selatan",
  "fr": "Jê méridional",
  "vi": "nhóm Jê Nam",
  "sw": "Jê ya Kusini"
 },
 "Wu": {
  "zh": "吴语",
  "yue": "吳語",
  "uk": "у",
  "he": "וו"
 },
 "Ju": {
  "ko": "주어군",
  "zh": "朱语支",
  "yue": "朱語支",
  "uk": "жу",
  "he": "ז׳ו"
 },
 "emerged 1970s-1980s": {
  "ko": "1970~1980년대에 형성",
  "zh": "形成于1970至1980年代",
  "yue": "形成於1970至1980年代",
  "uk": "виникла в 1970–1980-х",
  "he": "התהוותה בשנות ה-70–80 של המאה ה-20",
  "de": "entstanden in den 1970er–1980er Jahren",
  "es": "surgida en los años 1970-1980",
  "it": "emersa negli anni 1970-1980",
  "pt": "surgida nas décadas de 1970–1980",
  "id": "muncul pada 1970-an–1980-an",
  "fr": "apparue dans les années 1970–1980",
  "vi": "hình thành trong thập niên 1970–1980",
  "sw": "iliyoibuka miaka ya 1970–1980"
 },
 "or proposed Sandawe-Hadza": {
  "zh": "或假设的桑达韦-哈扎语系",
  "yue": "或提議嘅桑達韋-哈扎語系",
  "uk": "або гіпотетична сандаве-хадза",
  "he": "או סנדאווה-הדזה המוצעת",
  "de": "oder vorgeschlagenes Sandawe-Hadza",
  "es": "o sandawe-hadza propuesto",
  "it": "o sandawe-hadza proposto",
  "pt": "ou o grupo sandawe-hadza proposto",
  "id": "atau Sandawe-Hadza yang diusulkan",
  "fr": "ou sandawe-hadza (proposé)",
  "vi": "hoặc nhóm Sandawe-Hadza theo đề xuất",
  "sw": "au Sandawe-Hadza inayopendekezwa"
 },
 "proposed isolate or with Hadza": {
  "zh": "假设为孤立语言或与哈扎语同组",
  "de": "vorgeschlagenes Isolat oder mit dem Hadza verwandt",
  "es": "aislada propuesta o con el hadza",
  "it": "isolata proposta o con l'hadza",
  "pt": "isolada (proposta) ou ligada ao hadza",
  "id": "diusulkan isolat atau berkerabat dengan Hadza",
  "fr": "isolat proposé ou apparenté au hadza",
  "vi": "được đề xuất là ngôn ngữ biệt lập hoặc cùng nhóm với Hadza",
  "sw": "inapendekezwa kuwa lugha pweke au pamoja na Kihadza"
 },
 "Mountain Ok": {
  "ko": "산악 오크어군",
  "es": "ok de montaña",
  "it": "ok di montagna",
  "pt": "ok das montanhas",
  "id": "Ok Pegunungan",
  "fr": "Ok des montagnes",
  "vi": "nhóm Ok Miền núi",
  "sw": "Ok ya Milimani"
 },
 "Zone JE.16": {
  "ko": "구역 JE.16",
  "zh": "JE.16区",
  "yue": "JE.16區",
  "uk": "зона JE.16",
  "he": "אזור JE.16",
  "es": "zona JE.16",
  "it": "zona JE.16",
  "pt": "zona JE.16",
  "id": "Zona JE.16",
  "vi": "vùng JE.16",
  "sw": "Kanda JE.16"
 },
 "Five Nations": {
  "de": "Fünf Nationen",
  "es": "Cinco Naciones",
  "it": "Cinque Nazioni",
  "pt": "Cinco Nações",
  "id": "Lima Bangsa",
  "fr": "Cinq-Nations",
  "vi": "nhóm Năm Bộ tộc",
  "sw": "Mataifa Matano"
 },
 "Old": {
  "de": "Alt",
  "es": "antiguo",
  "it": "antico",
  "pt": "antigo",
  "id": "Kuno",
  "fr": "Ancien"
 },
 "Middle": {
  "de": "Mittel",
  "es": "medio",
  "it": "medio",
  "pt": "médio",
  "id": "Pertengahan",
  "fr": "Moyen"
 },
 "Northeast Coast": {
  "de": "Nordostküste",
  "es": "costa nororiental",
  "it": "costa nord-orientale",
  "pt": "costa nordeste",
  "id": "Pesisir Timur Laut",
  "fr": "Côte nord-est",
  "vi": "nhóm Duyên hải Đông Bắc",
  "sw": "Pwani ya Kaskazini-Mashariki"
 },
 "Western Tanzania": {
  "de": "Westtansania",
  "es": "Tanzania occidental",
  "it": "Tanzania occidentale",
  "pt": "Tanzânia ocidental",
  "id": "Tanzania Barat",
  "fr": "Tanzanie occidentale",
  "vi": "nhóm Tây Tanzania",
  "sw": "Tanzania Magharibi"
 },
 "Siberian / Northeastern Turkic": {
  "de": "Sibirisch / Nordosttürkisch",
  "es": "siberiana / túrquica nororiental",
  "it": "siberiana / turca nord-orientale",
  "pt": "siberiana / túrquica do nordeste",
  "id": "Siberia / Turkik Timur Laut",
  "fr": "Sibérien / turc du Nord-Est",
  "vi": "nhóm Siberia / Turk Đông Bắc",
  "sw": "Kisiberia / Kituruki cha Kaskazini-Mashariki"
 },
 "Manchu-Nanai": {
  "de": "Mandschu-Nanai",
  "es": "manchú-nanai",
  "it": "manciù-nanai",
  "fr": "Mandchou-nanaï"
 },
 "Udege-Oroch subgroup — sister to Oroch and Negidal": {
  "de": "Udehe-Orotschische Untergruppe — Schwester des Orotschischen und Negidalischen",
  "es": "subgrupo udege-oroch — hermano del oroch y el negidal",
  "it": "sottogruppo udege-oroch — fratello dell'oroch e del negidal",
  "pt": "subgrupo udege-oroch — irmão do oroch e do negidal",
  "id": "subkelompok Udege-Oroch — kerabat Oroch dan Negidal",
  "fr": "sous-groupe oudèghe-orotche — apparenté à l'orotche et au néguidal",
  "vi": "phân nhóm Udege-Oroch — chị em với tiếng Oroch và tiếng Negidal",
  "sw": "kikundi kidogo cha Udege-Oroch — dada wa Kioroch na Kinegidal"
 },
 "Hungarian — historical stage of modern Hungarian hu": {
  "de": "Ungarisch — historische Stufe des modernen Ungarischen (hu)",
  "es": "húngaro — etapa histórica del húngaro moderno (hu)",
  "it": "ungherese — stadio storico dell'ungherese moderno (hu)",
  "pt": "húngaro — estágio histórico do húngaro moderno (hu)",
  "id": "Hungaria — tahap historis bahasa Hungaria modern (hu)",
  "fr": "Hongrois — stade historique du hongrois moderne (hu)",
  "vi": "tiếng Hungary — giai đoạn lịch sử của tiếng Hungary hiện đại (hu)",
  "sw": "Kihungaria — hatua ya kihistoria ya Kihungaria cha kisasa (hu)"
 },
 "Svan branch — sister to Zan-Georgian": {
  "de": "Swanischer Zweig — Schwester des Georgisch-Sanischen",
  "es": "rama esvana — rama hermana del zano-georgiano",
  "it": "ramo svano — ramo fratello dello zan-georgiano",
  "pt": "ramo svan — irmão do zan-georgiano",
  "id": "cabang Svan — kerabat Zan-Georgia",
  "fr": "branche svane — apparentée au zane-géorgien",
  "vi": "nhánh Svan — chị em với nhánh Zan-Gruzia",
  "sw": "tawi la Kisvan — dada wa Kizan-Kijojia"
 },
 "Central Alaska": {
  "de": "Zentralalaska",
  "es": "Alaska central",
  "it": "Alaska centrale",
  "pt": "Alasca central",
  "id": "Alaska Tengah",
  "fr": "Alaska central",
  "vi": "nhóm Trung Alaska",
  "sw": "Alaska ya Kati"
 },
 "Min Dong / Eastern Min": {
  "de": "Min Dong / Östliches Min",
  "es": "min dong / min oriental",
  "it": "min dong / min orientale",
  "pt": "min dong / min oriental",
  "id": "Min Dong / Min Timur",
  "fr": "Min dong / min oriental",
  "vi": "tiếng Mân Đông",
  "sw": "Kimin-Dong"
 },
 "Eastern Iranian": {
  "de": "Ostiranisch",
  "es": "irania oriental",
  "it": "iranica orientale",
  "pt": "irânica oriental",
  "id": "Iran Timur",
  "fr": "Iranien oriental",
  "vi": "nhóm Đông Iran",
  "sw": "Kiirani cha Mashariki"
 },
 "Shughni-Yazgulami": {
  "de": "Schughni-Jasgulami",
  "fr": "Chougni-yazgoulami"
 },
 "Lolo-Burmese": {
  "de": "Lolo-Birmanisch",
  "pt": "lolo-birmanesa",
  "id": "Lolo-Burma",
  "fr": "Lolo-birman"
 },
 "East Bodish": {
  "de": "Ostbodisch",
  "es": "bódica oriental",
  "it": "bodica orientale",
  "pt": "bódica oriental",
  "id": "Bodik Timur",
  "fr": "Bodique oriental",
  "vi": "nhóm Bod Đông",
  "sw": "lugha za Bod za Mashariki"
 },
 "Digarish; \"Mishmi\" is areal": {
  "de": "Digarisch; „Mishmi“ ist ein arealer Sammelbegriff",
  "es": "digarish; «mishmi» es una denominación areal",
  "it": "digarish; «mishmi» è una denominazione areale",
  "pt": "digárica; «mishmi» é um termo areal",
  "id": "Digaro; \"Mishmi\" adalah istilah areal",
  "fr": "Digarique; « mishmi » est un terme aréal",
  "vi": "nhóm Digaro; \"Mishmi\" là tên gọi theo vùng",
  "sw": "lugha za Digaro; \"Mishmi\" ni jina la kieneo"
 },
 "Northern / Eastern Pahari": {
  "de": "Nord- / Ost-Pahari",
  "es": "septentrional / pahari oriental",
  "it": "settentrionale / pahari orientale",
  "fr": "Pahari septentrional / oriental",
  "vi": "Pahari Bắc / Pahari Đông",
  "sw": "Pahari ya Kaskazini / Pahari ya Mashariki"
 },
 "Southern Indo-Aryan": {
  "de": "Südindoarisch",
  "es": "indoaria meridional",
  "it": "indoaria meridionale",
  "pt": "indo-ariana meridional",
  "id": "Indo-Arya Selatan",
  "fr": "Indo-aryen méridional",
  "vi": "nhóm Ấn-Arya Nam",
  "sw": "Kihindi-Aria cha Kusini"
 },
 "Northwest": {
  "de": "Nordwest",
  "es": "noroccidental",
  "it": "nord-occidentale",
  "pt": "noroeste",
  "id": "Barat Laut",
  "fr": "Nord-ouest"
 },
 "Southwest": {
  "de": "Südwest",
  "es": "suroeste",
  "it": "sud-ovest",
  "pt": "sudoeste",
  "id": "Barat Daya",
  "fr": "Sud-ouest"
 },
 "Maghrebi Arabic": {
  "de": "Maghrebinisches Arabisch",
  "es": "árabe magrebí",
  "it": "arabo maghrebino",
  "pt": "árabe magrebino",
  "id": "Arab Maghribi",
  "fr": "Arabe maghrébin",
  "sw": "Kiarabu cha Maghreb"
 },
 "Cross River": {
  "de": "Cross-River",
  "es": "río Cross",
  "pt": "rio Cross"
 },
 "Lower Cross": {
  "de": "Lower-Cross",
  "es": "bajo Cross",
  "pt": "baixo Cross",
  "id": "Cross Hilir",
  "vi": "nhóm Hạ Cross",
  "sw": "Cross ya Chini"
 },
 "Mafa-Bata subgroup": {
  "de": "Mafa-Bata-Untergruppe",
  "es": "subgrupo mafa-bata",
  "it": "sottogruppo mafa-bata",
  "pt": "subgrupo mafa-bata",
  "id": "subkelompok Mafa-Bata",
  "fr": "sous-groupe mafa-bata",
  "vi": "phân nhóm Mafa-Bata",
  "sw": "kikundi kidogo cha Mafa-Bata"
 },
 "A subgroup — Kera-Kwang sub-cluster": {
  "de": "Untergruppe A — Kera-Kwang-Teilgruppe",
  "es": "subgrupo A — agrupación kera-kwang",
  "it": "sottogruppo A — raggruppamento kera-kwang",
  "pt": "subgrupo A — subconjunto kera-kwang",
  "id": "subkelompok A — subgugus Kera-Kwang",
  "fr": "sous-groupe A — sous-ensemble kera-kwang",
  "vi": "phân nhóm A — cụm Kera-Kwang",
  "sw": "kikundi kidogo A — kundi dogo la Kera-Kwang"
 },
 "Mafa-Bata — Daba subgroup": {
  "de": "Mafa-Bata — Daba-Untergruppe",
  "es": "mafa-bata — subgrupo daba",
  "it": "mafa-bata — sottogruppo daba",
  "pt": "mafa-bata — subgrupo daba",
  "id": "Mafa-Bata — subkelompok Daba",
  "fr": "Mafa-bata — sous-groupe daba",
  "vi": "Mafa-Bata — phân nhóm Daba",
  "sw": "Mafa-Bata — kikundi kidogo cha Daba"
 },
 "Great Lakes": {
  "de": "Große Seen",
  "es": "Grandes Lagos",
  "it": "Grandi Laghi",
  "pt": "Grandes Lagos",
  "id": "Danau Besar",
  "fr": "Grands Lacs",
  "vi": "nhóm Hồ Lớn",
  "sw": "Maziwa Makuu"
 },
 "Western Caribbean": {
  "de": "Westkaribisch",
  "es": "Caribe occidental",
  "it": "Caraibi occidentali",
  "pt": "Caribe ocidental",
  "id": "Karibia Barat",
  "fr": "Caraïbe occidentale",
  "vi": "nhóm Tây Caribe",
  "sw": "Karibi ya Magharibi"
 },
 "Romanichal-Kaale subgroup": {
  "de": "Romanichal-Kaale-Untergruppe",
  "es": "subgrupo romanichal-kaale",
  "it": "sottogruppo romanichal-kaale",
  "pt": "subgrupo romanichal-kaale",
  "id": "subkelompok Romanichal-Kaale",
  "fr": "sous-groupe romanichal-kaale",
  "vi": "phân nhóm Romanichal-Kaale",
  "sw": "kikundi kidogo cha Romanichal-Kaale"
 },
 "Rai Coast — Yaganon": {
  "de": "Rai-Küste — Yaganon",
  "es": "costa Rai — yaganon",
  "it": "costa Rai — yaganon",
  "id": "Pesisir Rai — Yaganon",
  "fr": "Côte Rai — yaganon",
  "vi": "Bờ biển Rai — Yaganon",
  "sw": "Pwani ya Rai — Yaganon"
 },
 "Pacific": {
  "de": "Pazifisch",
  "es": "Pacífico",
  "it": "Pacifico",
  "pt": "Pacífico",
  "id": "Pasifik"
 },
 "Melanesian Pijin family": {
  "de": "Melanesische Pidgin-Familie",
  "es": "familia del pidgin melanesio",
  "it": "famiglia del pidgin melanesiano",
  "pt": "família do pijin melanésio",
  "id": "keluarga Pijin Melanesia",
  "fr": "famille du pidgin mélanésien",
  "vi": "nhóm Pijin Melanesia",
  "sw": "familia ya Pijin ya Melanesia"
 },
 "Melanesian Pijin": {
  "de": "Melanesisches Pidgin",
  "es": "pidgin melanesio",
  "it": "pidgin melanesiano",
  "pt": "pijin melanésio",
  "id": "Pijin Melanesia",
  "fr": "Pidgin mélanésien"
 },
 "Kola Sami": {
  "de": "Kola-Samisch",
  "es": "sami de Kola",
  "it": "sami di Kola",
  "pt": "sámi de Kola",
  "id": "Sami Kola",
  "fr": "Same de Kola",
  "vi": "tiếng Sami Kola",
  "sw": "Kisami cha Kola"
 },
 "South Estonian": {
  "de": "Südestnisch",
  "es": "estonio meridional",
  "it": "estone meridionale",
  "pt": "estoniano do sul",
  "id": "Estonia Selatan",
  "fr": "Estonien du Sud",
  "vi": "tiếng Estonia Nam",
  "sw": "Kiestonia cha Kusini"
 },
 "debated; possible Japonic affinity": {
  "de": "umstritten; mögliche Verwandtschaft mit dem Japonischen",
  "es": "discutida; posible afinidad japónica",
  "it": "controversa; possibile affinità giapponese",
  "pt": "debatido; possível afinidade japônica",
  "id": "diperdebatkan; mungkin berkerabat dengan Japonik",
  "fr": "débattu; affinité japonique possible",
  "vi": "còn tranh cãi; có thể có quan hệ với ngữ hệ Nhật Bản",
  "sw": "yenye utata; huenda ina uhusiano na Kijapani"
 },
 "auxiliary": {
  "de": "Welthilfssprache",
  "es": "auxiliar",
  "it": "ausiliaria",
  "pt": "auxiliar",
  "id": "bantu",
  "fr": "auxiliaire"
 },
 "naturalistic": {
  "de": "naturalistisch",
  "es": "naturalista",
  "it": "naturalistica",
  "pt": "naturalista",
  "id": "naturalistik",
  "fr": "naturaliste"
 },
 "Central zone — Eastern Hindi": {
  "de": "Zentralzone — Osthindi",
  "es": "zona central — hindi oriental",
  "it": "zona centrale — hindi orientale",
  "pt": "zona central — hindi oriental",
  "id": "zona tengah — Hindi Timur",
  "fr": "zone centrale — hindi oriental",
  "vi": "vùng Trung tâm — tiếng Hindi Đông",
  "sw": "eneo la Kati — Kihindi cha Mashariki"
 },
 "Western Hindi": {
  "de": "Westhindi",
  "es": "hindi occidental",
  "it": "hindi occidentale",
  "pt": "hindi ocidental",
  "id": "Hindi Barat",
  "fr": "Hindi occidental",
  "vi": "tiếng Hindi Tây",
  "sw": "Kihindi cha Magharibi"
 },
 "Southern Bantu": {
  "de": "Südbantu",
  "es": "bantú meridional",
  "it": "bantu meridionale",
  "pt": "Bantu meridional",
  "id": "Bantu Selatan",
  "fr": "Bantou méridional",
  "vi": "nhóm Bantu Nam",
  "sw": "Kibantu cha Kusini"
 },
 "Western Mande": {
  "de": "Westmande",
  "es": "mandé occidental",
  "it": "mandé occidentale",
  "pt": "mande ocidental",
  "id": "Mande Barat",
  "fr": "Mandé occidental",
  "vi": "nhóm Mande Tây",
  "sw": "Kimande cha Magharibi"
 },
 "Central Mande": {
  "de": "Zentralmande",
  "es": "mandé central",
  "it": "mandé centrale",
  "pt": "mande central",
  "id": "Mande Tengah",
  "fr": "Mandé central",
  "vi": "nhóm Mande Trung",
  "sw": "Kimande cha Kati"
 },
 "Cholan-Tseltalan": {
  "de": "Chol-Tzeltal",
  "es": "chol-tzeltalana",
  "it": "chol-tzeltal",
  "pt": "chol-tseltal",
  "fr": "Chol-tzeltal"
 },
 "Aghul-Tabasaran-Tsakhur subgroup": {
  "de": "Aghulisch-Tabassaranisch-Zachurische Untergruppe",
  "es": "subgrupo aghul-tabasarán-tsajur",
  "it": "sottogruppo aghul-tabasaran-tsakhur",
  "pt": "subgrupo aghul-tabasaran-tsakhur",
  "id": "subkelompok Aghul-Tabasaran-Tsakhur",
  "fr": "sous-groupe agoul-tabassaran-tsakhour",
  "vi": "phân nhóm Aghul-Tabasaran-Tsakhur",
  "sw": "kikundi kidogo cha Aghul-Tabasaran-Tsakhur"
 },
 "Western Malayo-Polynesian": {
  "de": "Westmalayo-polynesisch",
  "es": "malayo-polinesio occidental",
  "it": "maleo-polinesiano occidentale",
  "pt": "malaio-polinésia ocidental",
  "id": "Melayu-Polinesia Barat",
  "fr": "Malayo-polynésien occidental",
  "vi": "nhóm Mã Lai-Polynesia Tây",
  "sw": "Kimalayo-Polinesia cha Magharibi"
 },
 "Central Malayo-Polynesian": {
  "de": "Zentralmalayo-polynesisch",
  "es": "malayo-polinesio central",
  "it": "maleo-polinesiano centrale",
  "pt": "malaio-polinésia central",
  "id": "Melayu-Polinesia Tengah",
  "fr": "Malayo-polynésien central",
  "vi": "nhóm Mã Lai-Polynesia Trung",
  "sw": "Kimalayo-Polinesia cha Kati"
 },
 "Western Desert": {
  "de": "Westliche Wüste",
  "es": "Desierto Occidental",
  "it": "Deserto Occidentale",
  "pt": "Deserto Ocidental",
  "id": "Gurun Barat",
  "fr": "Désert occidental",
  "vi": "nhóm Sa mạc Tây",
  "sw": "Jangwa la Magharibi"
 },
 "Indo-Aryan-lexified": {
  "de": "indoarisch lexifiziert",
  "es": "de léxico indoario",
  "it": "a lessico indoario",
  "pt": "de léxico indo-ariano",
  "id": "berleksikon Indo-Arya",
  "fr": "à lexique indo-aryen",
  "vi": "từ vựng gốc Ấn-Arya",
  "sw": "yenye msamiati wa Kihindi-Aria"
 },
 "Southern/Central Tibetic": {
  "de": "Süd- / Zentraltibetisch",
  "es": "tibético meridional / central",
  "it": "tibetico meridionale / centrale",
  "id": "Tibetik Selatan / Tengah",
  "fr": "Tibétique méridional / central",
  "vi": "nhóm Tạng Nam / Trung",
  "sw": "Kitibeti cha Kusini / cha Kati"
 },
 "Northwest Sumatra-Barrier Islands": {
  "de": "Nordwestsumatra-Barriereinseln",
  "es": "Sumatra noroccidental-islas Barrera",
  "it": "Sumatra nord-occidentale-isole Barriera",
  "pt": "Noroeste de Samatra–ilhas Barreira",
  "id": "Sumatra Barat Laut–Kepulauan Penghalang",
  "fr": "Nord-ouest de Sumatra–îles Barrière",
  "vi": "nhóm Tây Bắc Sumatra-Quần đảo Chắn",
  "sw": "lugha za Sumatra Kaskazini-Magharibi na Visiwa vya Kizuizi"
 },
 "South Sulawesi": {
  "de": "Süd-Sulawesi",
  "es": "Sulawesi meridional",
  "it": "Sulawesi meridionale",
  "pt": "Celebes do Sul",
  "id": "Sulawesi Selatan",
  "fr": "Sulawesi du Sud",
  "vi": "Nam Sulawesi",
  "sw": "Sulawesi Kusini"
 },
 "Central Philippine": {
  "de": "Zentralphilippinisch",
  "es": "filipina central",
  "it": "filippina centrale",
  "pt": "filipina central",
  "id": "Filipina Tengah",
  "fr": "Philippin central",
  "vi": "nhóm Trung Philippines",
  "sw": "lugha za Ufilipino ya Kati"
 },
 "Western Nilotic": {
  "de": "Westnilotisch",
  "es": "nilótica occidental",
  "it": "nilotica occidentale",
  "pt": "nilótica ocidental",
  "id": "Nilotik Barat",
  "fr": "Nilotique occidental",
  "vi": "nhóm Nin Tây",
  "sw": "Kiniloti cha Magharibi"
 },
 "Eastern Nilotic": {
  "de": "Ostnilotisch",
  "es": "nilótica oriental",
  "it": "nilotica orientale",
  "pt": "nilótica oriental",
  "id": "Nilotik Timur",
  "fr": "Nilotique oriental",
  "vi": "nhóm Nin Đông",
  "sw": "Kiniloti cha Mashariki"
 },
 "Maa cluster — sister to Maasai mas": {
  "de": "Maa-Gruppe — Schwester des Maasai (mas)",
  "es": "grupo maa — hermano del masái mas",
  "it": "gruppo maa — fratello del masai mas",
  "pt": "grupo maa — irmão do maasai (mas)",
  "id": "gugus Maa — kerabat Maasai (mas)",
  "fr": "groupe maa — apparenté au maasaï (mas)",
  "vi": "cụm Maa — chị em với tiếng Maasai (mas)",
  "sw": "kundi la Kimaa — dada wa Kimaasai (mas)"
 },
 "Western Indo-Aryan": {
  "de": "Westindoarisch",
  "es": "indoaria occidental",
  "it": "indoaria occidentale",
  "pt": "indo-ariana ocidental",
  "id": "Indo-Arya Barat",
  "fr": "Indo-aryen occidental",
  "vi": "nhóm Ấn-Arya Tây",
  "sw": "Kihindi-Aria cha Magharibi"
 },
 "Min Bei / Northern Min": {
  "de": "Min Bei / Nördliches Min",
  "es": "min bei / min septentrional",
  "it": "min bei / min settentrionale",
  "pt": "min bei / min setentrional",
  "id": "Min Bei / Min Utara",
  "fr": "Min bei / min septentrional",
  "vi": "tiếng Mân Bắc",
  "sw": "Kimin-Bei"
 },
 "Hui / Huizhou": {
  "de": "Hui / Huizhou",
  "es": "hui / huizhou",
  "it": "hui / huizhou",
  "fr": "Hui / huizhou",
  "vi": "tiếng Huy Châu",
  "sw": "Kichina cha Huizhou"
 },
 "Eastern Romance / Balkan Romance": {
  "de": "Ostromanisch / Balkanromanisch",
  "es": "romance oriental / romance balcánico",
  "it": "romanza orientale / romanza balcanica",
  "pt": "românica oriental / românica balcânica",
  "id": "Romanik Timur / Romanik Balkan",
  "fr": "Roman oriental / roman balkanique",
  "vi": "nhóm Đông Rôman / Rôman Balkan",
  "sw": "Kiromance cha Mashariki / Kiromance cha Balkani"
 },
 "NW Caspian": {
  "de": "Nordwest-Kaspisch",
  "es": "caspia noroccidental",
  "it": "caspica nord-occidentale",
  "pt": "cáspia do noroeste",
  "id": "Kaspia Barat Laut",
  "fr": "Caspien du Nord-Ouest",
  "vi": "nhóm Caspi Tây Bắc",
  "sw": "Kaspi ya Kaskazini-Magharibi"
 },
 "Ponto-Caspian / West Kipchak": {
  "de": "pontokaspische Gruppe / Westkiptschakisch",
  "es": "grupo póntico-caspio / kipchak occidental",
  "it": "gruppo ponto-caspico / kipchak occidentale",
  "fr": "groupe ponto-caspien / kiptchak occidental",
  "vi": "nhóm Ponto-Caspi / Kipchak Tây",
  "sw": "kundi la Ponto-Kaspia / Kipchak cha Magharibi"
 },
 "Naic/Loloish": {
  "de": "Naisch / Loloisch",
  "es": "naica / lolo",
  "it": "naica / lolo",
  "fr": "Naïque / loloïque",
  "vi": "nhóm Na / Lolo",
  "sw": "lugha za Na / lugha za Lolo"
 },
 "Eastern Oti-Volta": {
  "de": "Ost-Oti-Volta",
  "es": "oti-volta oriental",
  "it": "oti-volta orientale",
  "pt": "oti-volta oriental",
  "id": "Oti-Volta Timur",
  "fr": "Oti-volta oriental",
  "vi": "nhóm Oti-Volta Đông",
  "sw": "Oti-Volta ya Mashariki"
 },
 "A.70 Yaounde-Fang": {
  "de": "A.70 Yaoundé-Fang",
  "es": "A.70 yaundé-fang",
  "fr": "A.70 yaoundé-fang"
 },
 "Central Siberian": {
  "de": "Zentralsibirisch",
  "es": "siberiano central",
  "it": "siberiano centrale",
  "id": "Siberia Tengah",
  "fr": "Sibérien central",
  "vi": "nhóm Trung Siberia",
  "sw": "Kisiberia cha Kati"
 },
 "Papuan Tip": {
  "de": "Papuan-Tip",
  "es": "Punta Papúa",
  "it": "Punta Papua",
  "pt": "Ponta Papua",
  "id": "Ujung Papua",
  "fr": "Pointe papoue",
  "vi": "nhóm Mũi Papua",
  "sw": "Ncha ya Papua"
 },
 "Northwest Sumatran": {
  "de": "Nordwestsumatranisch",
  "es": "sumatrana noroccidental",
  "it": "sumatrana nord-occidentale",
  "pt": "do noroeste de Samatra",
  "id": "Sumatra Barat Laut",
  "fr": "Sumatra du Nord-Ouest",
  "vi": "nhóm Tây Bắc Sumatra",
  "sw": "lugha za Sumatra Kaskazini-Magharibi"
 },
 "Greater Central Philippine": {
  "de": "Großzentralphilippinisch",
  "es": "gran filipina central",
  "it": "grande filippina centrale",
  "pt": "grande filipina central",
  "id": "Filipina Tengah Raya",
  "fr": "Grand philippin central",
  "vi": "nhóm Đại Trung Philippines",
  "sw": "lugha za Ufilipino ya Kati Kuu"
 },
 "Admiralty Islands or independent Oceanic": {
  "de": "Admiralitätsinseln oder eigenständiger ozeanischer Zweig",
  "es": "islas del Almirantazgo u oceánica independiente",
  "it": "isole dell'Ammiragliato o oceanica indipendente",
  "pt": "ilhas do Almirantado ou oceânica independente",
  "id": "Kepulauan Admiralty atau Oseania mandiri",
  "fr": "îles de l'Amirauté ou branche océanienne indépendante",
  "vi": "nhóm quần đảo Admiralty hoặc nhánh Đại Dương độc lập",
  "sw": "Visiwa vya Admiralty au tawi huru la Kiosheania"
 },
 "Central Pahari": {
  "de": "Zentral-Pahari",
  "es": "pahari central",
  "it": "pahari centrale",
  "pt": "pahari central",
  "id": "Pahari Tengah",
  "fr": "Pahari central",
  "vi": "Pahari Trung",
  "sw": "Pahari ya Kati"
 },
 "Western Pahari": {
  "de": "West-Pahari",
  "es": "pahari occidental",
  "it": "pahari occidentale",
  "pt": "pahari ocidental",
  "id": "Pahari Barat",
  "fr": "Pahari occidental",
  "vi": "Pahari Tây",
  "sw": "Pahari ya Magharibi"
 },
 "South Slavic": {
  "de": "Südslawisch",
  "es": "eslava meridional",
  "it": "slava meridionale",
  "pt": "eslava meridional",
  "id": "Slavik Selatan",
  "fr": "Slave méridional",
  "vi": "nhóm Slav Nam",
  "sw": "Kislaviki cha Kusini"
 },
 "Bantu; Guthrie Zone H.20 — North Mbundu": {
  "de": "Bantu; Guthrie-Zone H.20 — Nord-Mbundu",
  "es": "Bantú; zona H.20 de Guthrie — mbundu septentrional",
  "it": "Bantu; zona H.20 di Guthrie — mbundu settentrionale",
  "fr": "Bantou; zone H.20 de Guthrie — mbundu du Nord",
  "vi": "Bantu; vùng Guthrie H.20 — Mbundu Bắc",
  "sw": "Kibantu; Kanda ya Guthrie H.20 — Mbundu ya Kaskazini"
 },
 "Chokwe-Luchazi / K.10 group": {
  "de": "Chokwe-Luchazi / K.10-Gruppe",
  "es": "chokwe-luchazi / grupo K.10",
  "it": "chokwe-luchazi / gruppo K.10",
  "pt": "chokwe-luchazi / grupo K.10",
  "id": "Chokwe-Luchazi / kelompok K.10",
  "fr": "Chokwe-luchazi / groupe K.10",
  "vi": "Chokwe-Luchazi / nhóm K.10",
  "sw": "Chokwe-Luchazi / kundi la K.10"
 },
 "Northwest Semitic": {
  "de": "Nordwestsemitisch",
  "es": "semítica noroccidental",
  "it": "semitica nord-occidentale",
  "pt": "semítica do noroeste",
  "id": "Semitik Barat Laut",
  "fr": "Sémitique du Nord-Ouest",
  "vi": "nhóm Semit Tây Bắc",
  "sw": "Kisemiti cha Kaskazini-Magharibi"
 },
 "Northern French": {
  "de": "Nordfranzösisch",
  "es": "francés septentrional",
  "it": "francese settentrionale",
  "pt": "francês setentrional",
  "id": "Prancis Utara",
  "fr": "Français du Nord",
  "vi": "tiếng Pháp miền Bắc",
  "sw": "Kifaransa cha Kaskazini"
 },
 "pre-classical": {
  "de": "vorklassisch",
  "es": "preclásico",
  "it": "preclassico",
  "pt": "pré-clássico",
  "id": "pra-klasik",
  "fr": "préclassique"
 },
 "separate from IE/Semitic": {
  "de": "vom Indogermanischen / Semitischen getrennt",
  "es": "independiente del IE / semítico",
  "it": "distinta dall'IE / semitico",
  "pt": "distinta das indo-europeias e semíticas",
  "id": "terpisah dari Indo-Eropa/Semitik",
  "fr": "distinct de l'indo-européen et du sémitique",
  "vi": "tách biệt với Ấn-Âu / Semit",
  "sw": "tofauti na Kihindi-Ulaya / Kisemiti"
 },
 "Old South Arabian": {
  "de": "Altsüdarabisch",
  "es": "sudarábigo antiguo",
  "it": "sudarabico antico",
  "pt": "sul-arábico antigo",
  "id": "Arab Selatan Kuno",
  "fr": "Sudarabique ancien",
  "vi": "tiếng Nam Ả Rập cổ",
  "sw": "Kiarabu cha Kusini cha Kale"
 },
 "West Germanic": {
  "de": "Westgermanisch",
  "es": "germánica occidental",
  "it": "germanica occidentale",
  "pt": "germânica ocidental",
  "id": "Germanik Barat",
  "fr": "Germanique occidental",
  "vi": "nhóm German Tây",
  "sw": "Kijerumaniki cha Magharibi"
 },
 "Old Saxon": {
  "de": "Altsächsisch",
  "es": "sajón antiguo",
  "it": "sassone antico",
  "pt": "saxão antigo",
  "id": "Sachsen Kuno",
  "fr": "Vieux saxon",
  "vi": "tiếng Saxon cổ",
  "sw": "Kisaksoni cha Kale"
 },
 "Eastern Sudanic": {
  "de": "Ostsudanisch",
  "es": "sudánica oriental",
  "it": "sudanica orientale",
  "pt": "sudânica oriental",
  "id": "Sudanik Timur",
  "fr": "Soudanique oriental",
  "vi": "nhóm Đông Sudan",
  "sw": "Kisudani cha Mashariki"
 },
 "Southern Nilotic — Kalenjin cluster": {
  "de": "Südnilotisch — Kalendjin-Gruppe",
  "es": "nilótica meridional — grupo kalenjin",
  "it": "nilotica meridionale — gruppo kalenjin",
  "fr": "Nilotique méridional — groupe kalendjin",
  "vi": "nhóm Nin Nam — cụm ngôn ngữ Kalenjin",
  "sw": "Kiniloti cha Kusini — kundi la Kalenjin"
 },
 "mixed English/Portuguese lexicon": {
  "de": "gemischter englisch-portugiesischer Wortschatz",
  "es": "léxico mixto inglés / portugués",
  "it": "lessico misto inglese / portoghese",
  "pt": "léxico misto inglês/português",
  "id": "kosakata campuran Inggris/Portugis",
  "fr": "lexique mixte anglais-portugais",
  "vi": "từ vựng pha trộn tiếng Anh / tiếng Bồ Đào Nha",
  "sw": "msamiati mchanganyiko wa Kiingereza / Kireno"
 },
 "Akan/Gbe substrate": {
  "de": "Akan- / Gbe-Substrat",
  "es": "sustrato akan / gbe",
  "it": "sostrato akan / gbe",
  "pt": "substrato akan/gbe",
  "id": "substrat Akan/Gbe",
  "fr": "substrat akan / gbe",
  "vi": "lớp nền Akan / Gbe",
  "sw": "tabaka la chini la Kiakan / Kigbe"
 },
 "Central Salish / Coast Salish": {
  "de": "Zentral-Salish / Küsten-Salish",
  "es": "salish central / salish de la costa",
  "it": "salish centrale / salish della costa",
  "pt": "salish central / salish costeiro",
  "id": "Salish Tengah / Salish Pesisir",
  "fr": "Salish central / salish de la Côte",
  "vi": "Salish Trung / Salish Duyên hải",
  "sw": "Kisalishi cha Kati / Kisalishi cha Pwani"
 },
 "Insular": {
  "de": "Inselkeltisch",
  "es": "insular",
  "it": "insulare",
  "pt": "insular",
  "id": "Insular",
  "fr": "Celtique insulaire"
 },
 "Eastern Highlands": {
  "de": "Östliches Hochland",
  "es": "Tierras Altas Orientales",
  "it": "Altopiani Orientali",
  "pt": "Terras Altas Orientais",
  "id": "Dataran Tinggi Timur",
  "fr": "Hautes-Terres orientales",
  "vi": "Cao nguyên Đông",
  "sw": "Nyanda za Juu za Mashariki"
 },
 "Cuzco-Collao": {
  "de": "Cusco-Collao"
 },
 "Maritime": {
  "de": "Küsten-Tsimshian",
  "es": "marítima",
  "it": "marittima",
  "pt": "marítima",
  "id": "Maritim"
 },
 "Southern Luo": {
  "de": "Süd-Luo",
  "es": "luo meridional",
  "it": "luo meridionale",
  "pt": "luo meridional",
  "id": "Luo Selatan",
  "fr": "Luo méridional",
  "vi": "tiếng Luo Nam",
  "sw": "Kiluo cha Kusini"
 },
 "Central Luzon": {
  "de": "Zentral-Luzon",
  "es": "Luzón central",
  "it": "Luzon centrale",
  "pt": "Luzon central",
  "id": "Luzon Tengah",
  "fr": "Luçon central",
  "vi": "nhóm Trung Luzon",
  "sw": "Luzon ya Kati"
 },
 "Northern Luzon": {
  "de": "Nord-Luzon",
  "es": "Luzón septentrional",
  "it": "Luzon settentrionale",
  "pt": "Luzon setentrional",
  "id": "Luzon Utara",
  "fr": "Luçon septentrional",
  "vi": "nhóm Bắc Luzon",
  "sw": "Luzon ya Kaskazini"
 },
 "Bantu; Great Lakes / Northeast Bantu": {
  "de": "Bantu; Große Seen / Nordost-Bantu",
  "es": "Bantú; Grandes Lagos / bantú nororiental",
  "it": "Bantu; Grandi Laghi / bantu nord-orientale",
  "pt": "Bantu; Grandes Lagos / Bantu do nordeste",
  "id": "Bantu; Danau Besar / Bantu Timur Laut",
  "fr": "Bantou; Grands Lacs / bantou du Nord-Est",
  "vi": "Bantu; nhóm Hồ Lớn / Bantu Đông Bắc",
  "sw": "Kibantu; Maziwa Makuu / Kibantu cha Kaskazini-Mashariki"
 },
 "Ring": {
  "de": "Ring-Sprachen"
 },
 "debated; possibly Eastern Sudanic": {
  "de": "umstritten; möglicherweise ostsudanisch",
  "es": "discutida; posiblemente sudánica oriental",
  "it": "controversa; forse sudanica orientale",
  "pt": "debatido; possivelmente sudânica oriental",
  "id": "diperdebatkan; mungkin Sudanik Timur",
  "fr": "débattu; peut-être soudanique oriental",
  "vi": "còn tranh cãi; có thể thuộc nhóm Đông Sudan",
  "sw": "yenye utata; huenda ni Kisudani cha Mashariki"
 },
 "East Formosan": {
  "de": "Ostformosanisch",
  "es": "formosana oriental",
  "it": "formosana orientale",
  "pt": "formosana oriental",
  "id": "Formosa Timur",
  "fr": "Formosan oriental",
  "vi": "nhóm Đài Loan Đông",
  "sw": "Kiformosa cha Mashariki"
 },
 "Eastern Indo-Aryan": {
  "de": "Ostindoarisch",
  "es": "indoaria oriental",
  "it": "indoaria orientale",
  "pt": "indo-ariana oriental",
  "id": "Indo-Arya Timur",
  "fr": "Indo-aryen oriental",
  "vi": "nhóm Ấn-Arya Đông",
  "sw": "Kihindi-Aria cha Mashariki"
 },
 "Hindi belt": {
  "de": "Hindi-Gürtel",
  "es": "cinturón hindi",
  "it": "cintura hindi",
  "pt": "cinturão hindi",
  "id": "sabuk Hindi",
  "fr": "Ceinture hindi",
  "sw": "ukanda wa Kihindi"
 },
 "Greater Mamean": {
  "de": "Groß-Mam",
  "es": "gran mameana",
  "it": "grande mameana",
  "pt": "grande mameana",
  "id": "Mam Raya",
  "fr": "Grand mam",
  "vi": "nhóm Đại Mam",
  "sw": "lugha za Mam Kuu"
 },
 "Greater Mamean — Ixilan": {
  "de": "Groß-Mam — Ixil-Sprachen",
  "es": "gran mameana — ixil",
  "it": "grande mameana — ixil",
  "pt": "grande mameana — ixil",
  "id": "Mam Raya — Ixil",
  "fr": "Grand mam — ixil",
  "vi": "nhóm Đại Mam — nhóm Ixil",
  "sw": "lugha za Mam Kuu — lugha za Ixil"
 },
 "Highland East": {
  "de": "Hochland-Ostkuschitisch",
  "es": "oriental de las tierras altas",
  "it": "orientale degli altopiani",
  "pt": "terras altas orientais",
  "id": "Dataran Tinggi Timur",
  "fr": "Couchitique oriental des hautes terres",
  "vi": "nhóm Cao nguyên Đông",
  "sw": "Nyanda za Juu za Mashariki"
 },
 "West Barito": {
  "de": "West-Barito",
  "es": "barito occidental",
  "it": "barito occidentale",
  "pt": "barito ocidental",
  "id": "Barito Barat",
  "fr": "Barito occidental",
  "vi": "nhóm Barito Tây",
  "sw": "Barito ya Magharibi"
 },
 "East Barito": {
  "de": "Ost-Barito",
  "es": "barito oriental",
  "it": "barito orientale",
  "pt": "barito oriental",
  "id": "Barito Timur",
  "fr": "Barito oriental",
  "vi": "nhóm Barito Đông",
  "sw": "Barito ya Mashariki"
 },
 "language isolate within Italy": {
  "de": "isolierte Sprache innerhalb Italiens",
  "es": "lengua aislada en Italia",
  "it": "lingua isolata in Italia",
  "pt": "língua isolada na Itália",
  "fr": "isolat linguistique en Italie",
  "vi": "ngôn ngữ biệt lập ở Ý",
  "sw": "lugha pweke ndani ya Italia"
 },
 "Indo-European Celtic per Koch 2009; non-IE per Untermann 1997": {
  "de": "indogermanisch-keltisch nach Koch 2009; nicht indogermanisch nach Untermann 1997",
  "es": "celta indoeuropea según Koch 2009; no IE según Untermann 1997",
  "it": "celtica indoeuropea secondo Koch 2009; non IE secondo Untermann 1997",
  "pt": "céltica indo-europeia segundo Koch 2009; não IE segundo Untermann 1997",
  "id": "Keltik Indo-Eropa menurut Koch 2009; non-IE menurut Untermann 1997",
  "fr": "celtique indo-européen selon Koch 2009; non indo-européen selon Untermann 1997",
  "vi": "nhóm Celt thuộc Ấn-Âu theo Koch 2009; không thuộc Ấn-Âu theo Untermann 1997",
  "sw": "Kikelti (Kihindi-Ulaya) kwa mujibu wa Koch 2009; si Kihindi-Ulaya kwa mujibu wa Untermann 1997"
 },
 "Eastern Timor": {
  "de": "Osttimor",
  "es": "Timor oriental",
  "it": "Timor orientale",
  "pt": "Timor oriental",
  "id": "Timor Timur",
  "fr": "Timor oriental",
  "vi": "nhóm Timor Đông",
  "sw": "Timor ya Mashariki"
 },
 "unclassified; possibly Indo-European and Illyrian-related": {
  "de": "unklassifiziert; möglicherweise indogermanisch und mit dem Illyrischen verwandt",
  "es": "sin clasificar; posiblemente indoeuropea y emparentada con el ilirio",
  "it": "non classificato; forse indoeuropea e affine all'illirico",
  "pt": "não classificado; possivelmente indo-europeu e aparentado com o ilírio",
  "id": "tak terklasifikasi; mungkin Indo-Eropa dan berkerabat dengan Iliria",
  "fr": "non classé; peut-être indo-européen et apparenté à l'illyrien",
  "vi": "chưa phân loại; có thể thuộc Ấn-Âu và liên quan đến tiếng Illyria",
  "sw": "isiyoainishwa; huenda ni Kihindi-Ulaya na yenye uhusiano na Kiiliria"
 },
 "isolated branch — closest to Greek/Armenian per current consensus": {
  "de": "isolierter Zweig — nach derzeitigem Konsens dem Griechischen / Armenischen am nächsten",
  "es": "rama aislada — más cercana al griego / armenio según el consenso actual",
  "id": "cabang terisolasi — menurut konsensus terkini paling dekat dengan Yunani/Armenia",
  "fr": "branche isolée — la plus proche du grec et de l'arménien selon le consensus actuel",
  "vi": "nhánh biệt lập — theo đồng thuận hiện nay gần nhất với tiếng Hy Lạp và tiếng Armenia",
  "sw": "tawi lililotengwa — kwa maafikiano ya sasa, karibu zaidi na Kigiriki na Kiarmenia"
 },
 "or an independent IE branch — debated": {
  "de": "oder ein eigenständiger indogermanischer Zweig — umstritten",
  "es": "o una rama independiente del IE — discutido",
  "it": "o un ramo indipendente dell'IE — controverso",
  "pt": "ou um ramo IE independente — debatido",
  "id": "atau cabang IE mandiri — diperdebatkan",
  "fr": "ou branche indo-européenne indépendante — débattu",
  "vi": "hoặc một nhánh Ấn-Âu độc lập — còn tranh cãi",
  "sw": "au tawi huru la Kihindi-Ulaya — lina utata"
 },
 "Pacific Coast": {
  "de": "Pazifikküste",
  "es": "costa del Pacífico",
  "it": "costa del Pacifico",
  "pt": "Costa do Pacífico",
  "id": "Pesisir Pasifik",
  "fr": "Côte pacifique",
  "vi": "nhóm Duyên hải Thái Bình Dương",
  "sw": "Pwani ya Pasifiki"
 },
 "South Oghuz": {
  "de": "Südoghusisch",
  "es": "oghuz meridional",
  "it": "oghuz meridionale",
  "pt": "oguz meridional",
  "id": "Oghuz Selatan",
  "fr": "Oghouze méridional",
  "vi": "nhóm Oghuz Nam",
  "sw": "Oghuz ya Kusini"
 },
 "Central Algonquian": {
  "de": "Zentral-Algonkin",
  "es": "algonquina central",
  "it": "algonchina centrale",
  "pt": "algonquina central",
  "id": "Algonkin Tengah",
  "fr": "Algonquien central",
  "vi": "nhóm Algonquin Trung",
  "sw": "lugha za Algonquin za Kati"
 },
 "Malayic — Malay-based": {
  "de": "Malaiisch — auf malaiischer Grundlage",
  "es": "malaya — de base malaya",
  "it": "maleica — a base malese",
  "pt": "malaica — de base malaia",
  "id": "Melayik — berbasis Melayu",
  "fr": "Malaïque — à base malaise",
  "vi": "Mã Lai — gốc tiếng Mã Lai",
  "sw": "lugha za Kimalay — zenye msingi wa Kimalay"
 },
 "Eastern Baltic": {
  "de": "Ostbaltisch",
  "es": "báltica oriental",
  "it": "baltica orientale",
  "pt": "báltica oriental",
  "id": "Baltik Timur",
  "fr": "Balte oriental",
  "vi": "nhóm Balt Đông",
  "sw": "Kibaltiki cha Mashariki"
 },
 "Low Franconian": {
  "de": "Niederfränkisch",
  "es": "bajo francónico",
  "it": "basso francone",
  "pt": "baixo-frâncica",
  "id": "Franka Hilir",
  "fr": "Bas-francique",
  "vi": "nhóm Hạ Franken",
  "sw": "Kifranconi cha Chini"
 },
 "Eastern Hindi/Bihari": {
  "de": "Osthindi / Bihari",
  "es": "hindi oriental / bihari",
  "it": "hindi orientale / bihari",
  "pt": "hindi oriental / bihari",
  "id": "Hindi Timur / Bihari",
  "fr": "Hindi oriental / bihari",
  "vi": "tiếng Hindi Đông / nhóm Bihar",
  "sw": "Kihindi cha Mashariki / Kibihari"
 },
 "Awadhi–Bhojpuri-based koiné": {
  "de": "Koine auf Awadhi-Bhojpuri-Grundlage",
  "es": "koiné de base awadhi-bhojpuri",
  "it": "koinè a base awadhi-bhojpuri",
  "pt": "coiné de base awadhi–bhojpuri",
  "id": "koine berbasis Awadhi–Bhojpuri",
  "fr": "koinè à base awadhi-bhojpuri",
  "vi": "koiné dựa trên Awadhi–Bhojpuri",
  "sw": "koiné yenye msingi wa Kiawadhi–Kibhojpuri"
 },
 "Northern Berber; planned standard pooling Tashelhiyt": {
  "de": "Nordberberisch; geplante Standardsprache unter Einbeziehung des Taschelhit",
  "es": "bereber septentrional; estándar planificado que integra el tashelhit",
  "it": "berbero settentrionale; standard pianificato che integra il tashelhit",
  "pt": "berbere setentrional; norma planejada que agrega o tachelhit",
  "id": "Berber Utara; standar terencana yang menggabungkan Tashelhiyt",
  "fr": "Berbère septentrional; standard prévu englobant le tachelhit",
  "vi": "Berber Bắc; chuẩn dự kiến gộp Tashelhiyt",
  "sw": "Kiberiberi cha Kaskazini; kiwango kilichopangwa kinachounganisha Tashelhiyt"
 },
 "Central Atlas Tamazight and Tarifit": {
  "de": "Zentralatlas-Tamazight und Tarifit",
  "es": "tamazight del Atlas central y rifeño",
  "it": "tamazight dell'Atlante centrale e rifano",
  "pt": "tamazight do Atlas Central e tarifit",
  "id": "Tamazight Atlas Tengah dan Tarifit",
  "fr": "tamazight du Maroc central et rifain",
  "vi": "Tamazight Trung Atlas và Tarifit",
  "sw": "Tamazight ya Atlas ya Kati na Tarifit"
 },
 "Gheg — one of the two primary dialect groups alongside Tosk": {
  "de": "Gegisch — eine der beiden Hauptdialektgruppen neben dem Toskischen",
  "es": "guego — uno de los dos grandes grupos dialectales junto al tosco",
  "it": "ghego — uno dei due principali gruppi dialettali insieme al tosco",
  "pt": "guego — um dos dois principais grupos dialetais, ao lado do tosco",
  "id": "Gheg — salah satu dari dua kelompok dialek utama selain Tosk",
  "fr": "Guègue — l'un des deux grands groupes dialectaux avec le tosque",
  "vi": "Gheg — một trong hai nhóm phương ngữ chính, bên cạnh Tosk",
  "sw": "Gheg — mojawapo ya makundi mawili makuu ya lahaja, pamoja na Tosk"
 },
 "Nuclear Polynesian": {
  "de": "Kernpolynesisch",
  "es": "polinesio nuclear",
  "it": "polinesiano nucleare",
  "pt": "polinésia nuclear",
  "id": "Polinesia Inti",
  "fr": "Polynésien nucléaire",
  "vi": "nhóm Polynesia Hạt nhân",
  "sw": "Kipolinesia cha Kiini"
 },
 "Central New South Wales": {
  "de": "Zentral-New-South-Wales",
  "es": "Nueva Gales del Sur central",
  "it": "Nuovo Galles del Sud centrale",
  "pt": "Nova Gales do Sul central",
  "id": "New South Wales Tengah",
  "fr": "Centre de la Nouvelle-Galles du Sud",
  "vi": "nhóm Trung New South Wales",
  "sw": "New South Wales ya Kati"
 },
 "Guthrie zone L.52": {
  "de": "Guthrie-Zone L.52",
  "es": "zona L.52 de Guthrie",
  "it": "zona L.52 di Guthrie",
  "pt": "zona de Guthrie L.52",
  "id": "zona Guthrie L.52",
  "fr": "zone L.52 de Guthrie",
  "vi": "vùng Guthrie L.52",
  "sw": "kanda ya Guthrie L.52"
 },
 "Bodish — close to but not descended from Classical Tibetan": {
  "de": "Bodisch — dem klassischen Tibetisch nahe, aber nicht davon abstammend",
  "es": "bódica — cercana al tibetano clásico pero no descendiente de él",
  "it": "bodica — vicina al tibetano classico ma non sua discendente",
  "pt": "bódica — próxima do tibetano clássico, mas não descendente dele",
  "id": "Bodik — dekat dengan, tetapi bukan turunan, bahasa Tibet Klasik",
  "fr": "Bodique — proche du tibétain classique sans en descendre",
  "vi": "nhóm Bod — gần với tiếng Tạng cổ điển nhưng không bắt nguồn từ nó",
  "sw": "lugha za Bod — karibu na Kitibeti cha Kale lakini haikutokana nacho"
 },
 "Himalayish — isolated within it; sometimes linked to Mahakiranti": {
  "de": "Himalayisch — darin isoliert; mitunter mit dem Mahakiranti verbunden",
  "es": "himalaya — aislada dentro del grupo; a veces vinculada al mahakiranti",
  "it": "himalayana — isolata al suo interno; talvolta collegata al mahakiranti",
  "pt": "himalaica — isolada dentro dela; às vezes ligada ao mahakiranti",
  "id": "Himalayik — terisolasi di dalamnya; kadang dikaitkan dengan Mahakiranti",
  "fr": "Himalayen — isolé en son sein; parfois rattaché au mahakiranti",
  "vi": "nhóm Himalaya — biệt lập trong nhóm; đôi khi được liên hệ với Mahakiranti",
  "sw": "lugha za Himalaya — iliyotengwa ndani yake; wakati mwingine huhusishwa na Mahakiranti"
 },
 "Old Burmese script": {
  "de": "altbirmanische Schrift",
  "fr": "ancienne écriture birmane"
 },
 "Old Aramaic alphabet": {
  "de": "altaramäisches Alphabet",
  "fr": "alphabet araméen ancien",
  "sw": "alfabeti ya Kiaramu cha Kale"
 },
 "Old Nubian alphabet": {
  "de": "altnubisches Alphabet",
  "fr": "alphabet vieux-nubien",
  "vi": "bảng chữ cái Nubia cổ",
  "sw": "alfabeti ya Kinubi cha Kale"
 },
 "Elamite kingdoms": {
  "de": "elamische Königreiche",
  "fr": "royaumes élamites",
  "sw": "falme za Kielami"
 },
 "Aramaic-derived": {
  "de": "vom Aramäischen abgeleitet",
  "fr": "dérivé de l'araméen",
  "sw": "inayotokana na hati ya Kiaramu"
 },
 "ancestor of modern Frisian": {
  "de": "Vorfahre des modernen Friesischen",
  "fr": "ancêtre du frison moderne",
  "sw": "babu wa Kifrisia cha kisasa"
 },
 "Aramaic / Syriac": {
  "de": "Aramäisch / Syrisch",
  "fr": "Araméen / syriaque",
  "sw": "hati ya Kiaramu / hati ya Kisiria"
 },
 "Eastern / Magadhan": {
  "de": "Ost / Magadhi",
  "fr": "Oriental / magadhi",
  "sw": "mashariki / Magadhi"
 },
 "West": {
  "de": "West"
 },
 "Tundra": {
  "de": "Tundra-Jukagirisch",
  "fr": "Toundra"
 },
 "isolate": {
  "es": "lengua aislada",
  "it": "lingua isolata",
  "pt": "língua isolada",
  "fr": "isolat"
 },
 "South-Central": {
  "es": "centromeridional",
  "it": "centro-meridionale",
  "id": "Selatan-Tengah",
  "fr": "Centre-sud",
  "vi": "nhánh Trung-Nam",
  "sw": "Kusini-Kati"
 },
 "Ob-Ugric": {
  "es": "ugria del Obi",
  "it": "ugrica dell'Ob",
  "pt": "úgrica do Ob",
  "id": "Ugrik Ob",
  "fr": "Ougrien de l'Ob"
 },
 "Kamchatkan": {
  "es": "kamchatka",
  "it": "kamciatka"
 },
 "Ethiopian": {
  "es": "etiópica",
  "it": "etiopica",
  "pt": "etíope"
 },
 "Pu-Xian Min": {
  "es": "min puxian",
  "it": "min puxian"
 },
 "Nungish / Loloish": {
  "es": "lenguas nungish / lolo",
  "it": "lingue nungiche / lolo"
 },
 "branch debated": {
  "es": "rama discutida",
  "it": "ramo controverso",
  "pt": "ramo debatido",
  "fr": "branche débattue"
 },
 "Azerbaijani": {
  "es": "azerbaiyano",
  "it": "azero"
 },
 "Saharan": {
  "es": "sahariano",
  "it": "sahariano"
 },
 "Volta-Niger": {
  "es": "volta-níger",
  "pt": "volta-níger"
 },
 "Italo-Romance": {
  "es": "italorromance",
  "it": "italo-romanza",
  "pt": "ítalo-românica",
  "id": "Italo-Roman"
 },
 "Italo-Dalmatian": {
  "es": "italo-dálmata",
  "it": "italo-dalmata",
  "pt": "ítalo-dálmata",
  "id": "Italo-Dalmatia",
  "vi": "nhóm Ý-Dalmatia"
 },
 "Gallo-Romance": {
  "es": "galorromance",
  "it": "gallo-romanza",
  "pt": "galo-românica",
  "id": "Gallo-Roman"
 },
 "Rhaeto-Romance": {
  "es": "retorrománica",
  "it": "retoromanza",
  "pt": "reto-românica",
  "id": "Reto-Roman"
 },
 "Romani": {
  "es": "romaní",
  "it": "romaní"
 },
 "Saami": {
  "es": "sami",
  "it": "sami",
  "pt": "sámi",
  "id": "Sami"
 },
 "Sami": {
  "es": "sami",
  "it": "sami",
  "pt": "sámi"
 },
 "reconstructed": {
  "es": "reconstruida",
  "it": "ricostruita",
  "pt": "reconstruída",
  "fr": "reconstruite"
 },
 "schematic": {
  "es": "esquemática",
  "it": "schematica",
  "pt": "esquemática",
  "fr": "schématique"
 },
 "philosophical": {
  "es": "filosófica",
  "it": "filosofica",
  "pt": "filosófica",
  "fr": "philosophique"
 },
 "artistic": {
  "es": "artística",
  "it": "artistica",
  "pt": "artística",
  "fr": "artistique"
 },
 "logical": {
  "es": "lógica",
  "it": "logica",
  "pt": "lógica",
  "fr": "logique"
 },
 "Visayan": {
  "es": "bisaya",
  "it": "visaya"
 },
 "Mande": {
  "es": "mandé"
 },
 "Manding": {
  "es": "mandinga"
 },
 "Songhai": {
  "es": "songhay"
 },
 "Yucatecan": {
  "es": "yucateca",
  "it": "yucateca"
 },
 "Kampan": {
  "es": "campa",
  "it": "campa"
 },
 "sometimes grouped as Paezan": {
  "es": "a veces agrupada como paeza",
  "it": "talvolta raggruppata come paezana",
  "pt": "às vezes agrupada como paeza",
  "fr": "parfois rattaché au paezan",
  "sw": "wakati mwingine huwekwa katika Paez"
 },
 "isolate or small family": {
  "es": "lengua aislada o familia pequeña",
  "it": "lingua isolata o piccola famiglia",
  "pt": "língua isolada ou pequena família",
  "fr": "isolat ou petite famille",
  "vi": "ngôn ngữ biệt lập hoặc ngữ hệ nhỏ"
 },
 "Avar-Andic": {
  "es": "avar-andí",
  "it": "avaro-andica",
  "pt": "ávaro-ândica",
  "id": "Avar-Andik"
 },
 "Lak-Dargic": {
  "es": "lak-darguina",
  "it": "lak-dargica",
  "pt": "lak-darguínica",
  "id": "Lak-Dargik"
 },
 "Kipchak-Cuman": {
  "es": "kipchak-cumana",
  "it": "kipchak-cumana",
  "pt": "quipchaca-cumana"
 },
 "Circassian": {
  "es": "circasiana",
  "it": "circassa"
 },
 "Abkhaz-Abaza": {
  "es": "abjasio-abazino",
  "it": "abcaso-abaza",
  "pt": "abcázio-abaza",
  "id": "Abkhaz-Abaza"
 },
 "Wati / Western Desert": {
  "es": "wati / Desierto Occidental",
  "it": "wati / Deserto Occidentale"
 },
 "Malayic": {
  "es": "malaya",
  "it": "maleica"
 },
 "heavily restructured": {
  "es": "muy reestructurada",
  "it": "fortemente ristrutturata",
  "pt": "fortemente reestruturada",
  "fr": "fortement restructuré"
 },
 "Philippine": {
  "es": "filipina",
  "it": "filippina",
  "pt": "filipina",
  "id": "Filipina"
 },
 "Rajasthani": {
  "es": "rajastaní"
 },
 "Astur-Leonese": {
  "es": "asturleonés",
  "it": "asturleonese",
  "pt": "asturo-leonesa",
  "id": "Astur-Leon"
 },
 "Pyrenean": {
  "es": "pirenaica",
  "it": "pirenaica"
 },
 "Caspian": {
  "es": "caspia",
  "it": "caspica",
  "pt": "cáspia",
  "id": "Kaspia"
 },
 "Aleut": {
  "es": "aleutiana",
  "it": "aleutina",
  "id": "Aleut"
 },
 "Aramaic": {
  "es": "arameo",
  "it": "aramaico"
 },
 "Mandaic": {
  "es": "mandeo",
  "it": "mandaico"
 },
 "Matacoan": {
  "es": "mataco",
  "it": "mataco"
 },
 "Khasian": {
  "es": "khasi",
  "it": "khasi"
 },
 "Oirat-Kalmyk": {
  "es": "oirat-calmuco",
  "it": "oirato-calmucco",
  "pt": "oirate-calmuca",
  "id": "Oirat-Kalmyk"
 },
 "creolized": {
  "es": "criollizada",
  "it": "creolizzata",
  "pt": "crioulizada",
  "fr": "créolisé"
 },
 "Canaanite": {
  "es": "cananea",
  "it": "cananaica"
 },
 "Ethio-Semitic": {
  "es": "etiosemítica",
  "it": "etiosemitica",
  "pt": "etiossemítica",
  "id": "Semitik Etiopia"
 },
 "Elamite": {
  "es": "elamita",
  "it": "elamica"
 },
 "Castilian": {
  "es": "castellano",
  "it": "castigliano"
 },
 "Lurish": {
  "es": "lur",
  "it": "luri"
 },
 "Caribbean": {
  "es": "caribeña",
  "it": "caraibica",
  "pt": "caribenha",
  "id": "Karibia"
 },
 "Scythian": {
  "es": "escita",
  "it": "scitica"
 },
 "likely isolate": {
  "es": "probablemente aislada",
  "it": "probabilmente isolata",
  "pt": "provavelmente isolada",
  "fr": "probablement un isolat"
 },
 "Jurchen-Manchu": {
  "es": "yurchen-manchú",
  "it": "jurchen-manciù"
 },
 "Formosan — Western Plains": {
  "es": "formosana — llanuras occidentales",
  "it": "formosana — pianure occidentali"
 },
 "Frisian": {
  "es": "frisón",
  "it": "frisone",
  "vi": "nhóm Frisia"
 },
 "German-based": {
  "es": "de base alemana",
  "it": "a base tedesca",
  "pt": "de base alemã",
  "fr": "à base allemande"
 },
 "possibly pre-IE": {
  "es": "posiblemente preindoeuropea",
  "it": "forse preindoeuropea",
  "pt": "possivelmente pré-IE",
  "fr": "peut-être pré-indo-européen"
 },
 "Balto-Slavic": {
  "es": "baltoeslava",
  "it": "balto-slava",
  "pt": "balto-eslava",
  "id": "Balto-Slavik"
 },
 "Dutch": {
  "es": "neerlandés",
  "it": "olandese",
  "pt": "neerlandês",
  "id": "Belanda"
 },
 "Nubian": {
  "es": "nubia",
  "it": "nubiana"
 },
 "Ticuna–Yuri": {
  "es": "ticuna-yurí",
  "it": "ticuna-yuri"
 },
 "usually treated as a language isolate": {
  "es": "suele tratarse como lengua aislada",
  "it": "di solito considerata una lingua isolata",
  "pt": "geralmente tratada como língua isolada",
  "fr": "généralement considéré comme un isolat"
 },
 "its only relative Yuri being extinct": {
  "es": "su único pariente, el yurí, está extinto",
  "it": "il suo unico parente, lo yuri, è estinto",
  "pt": "seu único parente, o yuri, está extinto",
  "fr": "son seul parent, le yuri, étant éteint"
 },
 "Benue-Congo": {
  "es": "benué-congo",
  "it": "benue-congo"
 },
 "Lezgic — isolated within Lezgic; not part of any subgroup": {
  "es": "lezguica — aislada dentro del grupo lezguico; no pertenece a ningún subgrupo",
  "it": "lezgica — isolata all'interno del gruppo lezgico; non appartenente ad alcun sottogruppo"
 },
 "Lezgic; ancestor/sister of modern Udi": {
  "es": "lezguica; antecesora o hermana del udi moderno",
  "it": "lezgica; antenata o sorella dell'udi moderno",
  "sw": "lugha za Kilezgi; babu / lugha dada ya Kiudi cha kisasa"
 },
 "Kaqchikelan": {
  "es": "kaqchikel",
  "it": "kaqchikel"
 },
 "Inuit": {
  "pt": "inuíte"
 },
 "Eastern Pahari": {
  "pt": "pahari oriental",
  "id": "Pahari Timur"
 },
 "Oïl": {
  "pt": "de oïl",
  "fr": "Langues d'oïl"
 },
 "West Kipchak": {
  "pt": "quipchaca ocidental",
  "id": "Kipchak Barat"
 },
 "Atlas": {
  "pt": "Atlas"
 },
 "NE Caucasian": {
  "pt": "caucasiana do nordeste",
  "sw": "Kikaukasi cha Kaskazini-Mashariki"
 },
 "NW Caucasian": {
  "pt": "caucasiana do noroeste",
  "sw": "Kikaukasi cha Kaskazini-Magharibi"
 },
 "Muna-Buton": {
  "pt": "muna-buton",
  "id": "Muna-Buton"
 },
 "Southern Nilotic": {
  "pt": "nilótica meridional",
  "id": "Nilotik Selatan"
 },
 "Anatolian": {
  "pt": "anatólica"
 },
 "Malayo-Polynesian": {
  "id": "Melayu-Polinesia"
 },
 "Tibeto-Burman": {
  "id": "Tibet-Burma"
 },
 "Southwestern": {
  "id": "Barat Daya"
 },
 "Northwestern": {
  "id": "Barat Laut"
 },
 "Southeastern": {
  "id": "Tenggara"
 },
 "East": {
  "id": "Timur"
 },
 "South": {
  "id": "Selatan"
 },
 "North": {
  "id": "Utara"
 },
 "NW": {
  "id": "BL",
  "vi": "Tây Bắc",
  "sw": "Kaskazini-Magharibi"
 },
 "reconstructed-proto": {
  "fr": "reconstructed-proto"
 },
 "Japonic-Koreanic": {
  "fr": "Japonico-coréen",
  "vi": "Nhật Bản-Hàn Quốc"
 },
 "Maritime Region": {
  "vi": "vùng Duyên hải"
 },
 "Formosan homeland": {
  "vi": "quê hương nhóm Đài Loan"
 },
 "Wu family total": {
  "vi": "tổng cả nhóm tiếng Ngô"
 },
 "Nahuan total": {
  "vi": "tổng nhóm Nahua",
  "sw": "jumla ya lugha za Kinahua"
 },
 "Italic": {
  "vi": "nhóm gốc Ý"
 },
 "Baltic": {
  "vi": "nhóm Balt"
 },
 "Jivaroan": {
  "vi": "ngữ hệ Jivaro"
 },
 "Tyrsenian": {
  "vi": "ngữ hệ Tyrseni"
 },
 "Monguoric": {
  "vi": "nhóm Monguor"
 },
 "Iberian": {
  "vi": "nhóm Iberia"
 },
 "Germanic": {
  "sw": "Kijerumaniki"
 },
 "Language isolate": {
  "sw": "Lugha pweke"
 },
 "Finno-Ugric": {
  "sw": "Kifini-Kiugori"
 },
 "Trans-New Guinea": {
  "sw": "Kivuka-Guinea Mpya"
 },
 "Indo-Aryan; Old Indo-Aryan": {
  "sw": "Kihindi-Aria; Kihindi-Aria cha Kale"
 },
 "Early Mandarin": {
  "sw": "Kimandarini cha mapema"
 },
 "Southwestern Iranian": {
  "sw": "Kiirani cha Kusini-Magharibi"
 },
 "NW Mexico": {
  "sw": "Kaskazini-Magharibi mwa Meksiko"
 },
 "US Southwest": {
  "sw": "Kusini-Magharibi mwa Marekani"
 },
 "Karen script": {
  "sw": "hati ya Kikaren"
 },
 "Iberian-derived": {
  "sw": "inayotokana na hati ya Kiiberia"
 },
 "Sukuma-Nyamwezi": {
  "sw": "Kisukuma-Kinyamwezi"
 }
};
  for (const [term, tr] of Object.entries(A)) for (const [lang, v] of Object.entries(tr)) {
    if (!META_I18N_ATOMS[lang]) META_I18N_ATOMS[lang] = {};
    META_I18N_ATOMS[lang][term] = v;
  }
  if (typeof META_I18N === 'undefined') return;
  for (const [src, tr] of Object.entries(F)) for (const [lang, v] of Object.entries(tr)) {
    if (!META_I18N[lang]) META_I18N[lang] = {};
    META_I18N[lang][src] = v;
  }
})();

// r24: Han Map family atoms (Sinitic groups, proto, reading layers) the
// whole-value translator needs before it will translate a family line.
// Fill-only: an existing entry wins.
(function () {
  if (typeof META_I18N_ATOMS === 'undefined') return;
  const A = {
 "Gan": {
  "ja": "贛語",
  "ko": "감어",
  "zh": "赣语",
  "yue": "贛語",
  "vi": "tiếng Cám",
  "th": "ภาษากั้น",
  "hi": "गान",
  "fr": "gan",
  "it": "gan",
  "es": "gan",
  "pt": "gan",
  "ru": "гань",
  "uk": "гань",
  "ar": "الغان",
  "he": "גאן",
  "sw": "Kigan"
 },
 "Jin": {
  "ja": "晋語",
  "ko": "진어",
  "zh": "晋语",
  "yue": "晉語",
  "vi": "tiếng Tấn",
  "th": "ภาษาจิ้น",
  "hi": "जिन",
  "fr": "jin",
  "it": "jin",
  "es": "jin",
  "pt": "jin",
  "ru": "цзинь",
  "uk": "цзінь",
  "ar": "الجين",
  "he": "ג׳ין",
  "sw": "Kijin"
 },
 "Xiang": {
  "ja": "湘語",
  "ko": "상어",
  "zh": "湘语",
  "yue": "湘語",
  "vi": "tiếng Tương",
  "th": "ภาษาเซียง",
  "hi": "शियांग",
  "fr": "xiang",
  "it": "xiang",
  "es": "xiang",
  "pt": "xiang",
  "ru": "сян",
  "uk": "сян",
  "ar": "الشيانغ",
  "he": "שיאנג",
  "sw": "Kixiang"
 },
 "Wu": {
  "ja": "呉語",
  "ko": "오어",
  "zh": "吴语",
  "yue": "吳語",
  "vi": "tiếng Ngô",
  "th": "ภาษาอู๋",
  "hi": "वू",
  "fr": "wu",
  "it": "wu",
  "es": "wu",
  "pt": "wu",
  "ru": "у",
  "uk": "у",
  "ar": "الوو",
  "he": "וו",
  "sw": "Kiwu"
 },
 "Hui": {
  "ja": "徽語",
  "ko": "휘어",
  "zh": "徽语",
  "yue": "徽語",
  "vi": "tiếng Huy",
  "th": "ภาษาฮุย",
  "hi": "हुई",
  "fr": "hui",
  "it": "hui",
  "es": "hui",
  "pt": "hui",
  "ru": "хуэй",
  "uk": "хуей",
  "ar": "الهوي",
  "he": "חואי",
  "sw": "Kihui"
 },
 "Pinghua": {
  "ja": "平話",
  "ko": "평화",
  "zh": "平话",
  "yue": "平話",
  "vi": "Bình thoại",
  "th": "ภาษาผิงฮว่า",
  "hi": "पिंगहुआ",
  "fr": "pinghua",
  "it": "pinghua",
  "es": "pinghua",
  "pt": "pinghua",
  "ru": "пинхуа",
  "uk": "пінхуа",
  "ar": "البينغهوا",
  "he": "פינגחואה",
  "sw": "Kipinghua"
 },
 "Min": {
  "ja": "閩語",
  "ko": "민어",
  "zh": "闽语",
  "yue": "閩語",
  "vi": "tiếng Mân",
  "th": "ภาษาหมิ่น",
  "hi": "मिन",
  "fr": "min",
  "it": "min",
  "es": "min",
  "pt": "min",
  "ru": "минь",
  "uk": "мінь",
  "ar": "المين",
  "he": "מין",
  "sw": "Kimin"
 },
 "Min Nan": {
  "ja": "閩南語",
  "ko": "민난어",
  "zh": "闽南语",
  "yue": "閩南語",
  "vi": "tiếng Mân Nam",
  "th": "ภาษาหมิ่นใต้",
  "id": "Min Selatan",
  "hi": "दक्षिणी मिन",
  "fr": "minnan",
  "it": "min nan",
  "es": "min nan",
  "pt": "min nan",
  "ru": "южноминьский",
  "uk": "південноміньська",
  "ar": "المين الجنوبية",
  "he": "מין נאן",
  "sw": "Kimin-Nan"
 },
 "Hakka": {
  "ja": "客家語",
  "ko": "객가어",
  "zh": "客家话",
  "yue": "客家話",
  "vi": "tiếng Khách Gia",
  "th": "ภาษาแคะ",
  "hi": "हक्का",
  "fr": "hakka",
  "it": "hakka",
  "es": "hakka",
  "pt": "hakka",
  "ru": "хакка",
  "uk": "хакка",
  "ar": "الهاكا",
  "he": "האקה",
  "sw": "Kihakka"
 },
 "Mandarin": {
  "ja": "官話",
  "ko": "관화",
  "zh": "官话",
  "yue": "官話",
  "vi": "tiếng Quan thoại",
  "th": "ภาษาจีนกลาง",
  "hi": "मंदारिन",
  "fr": "mandarin",
  "it": "mandarino",
  "es": "mandarín",
  "pt": "mandarim",
  "ru": "мандаринский",
  "uk": "мандаринська",
  "ar": "الماندرين",
  "he": "מנדרינית",
  "sw": "Kimandarini"
 },
 "Yue": {
  "ja": "粤語",
  "ko": "월어",
  "zh": "粤语",
  "yue": "粵語",
  "vi": "Việt ngữ",
  "th": "ภาษาเยว่",
  "hi": "यू",
  "fr": "yue",
  "it": "yue",
  "es": "yue",
  "pt": "yue",
  "ru": "юэ",
  "uk": "юе",
  "ar": "اليوي",
  "he": "יואה",
  "sw": "Kiyue"
 },
 "proto": {
  "ja": "祖語",
  "ko": "조어",
  "zh": "原始语",
  "yue": "原始語",
  "vi": "tiền ngữ",
  "th": "ภาษาดั้งเดิม",
  "hi": "आद्य",
  "de": "Ursprache",
  "fr": "proto-langue",
  "it": "protolingua",
  "es": "protolengua",
  "pt": "protolíngua",
  "ru": "праязык",
  "uk": "прамова",
  "ar": "اللغة الأم الأولى",
  "he": "שפת־אם קדומה",
  "sw": "lugha mama"
 },
 "native reading layer": {
  "ja": "固有語の読みの層",
  "ko": "고유어 읽기 층",
  "zh": "固有词读音层",
  "yue": "固有詞讀音層",
  "vi": "lớp âm đọc thuần",
  "th": "ชั้นการอ่านแบบคำดั้งเดิม",
  "id": "lapisan bacaan asli",
  "hi": "देशज पठन परत",
  "de": "einheimische Leseschicht",
  "fr": "couche de lecture native",
  "it": "strato di lettura nativo",
  "es": "capa de lectura nativa",
  "pt": "camada de leitura nativa",
  "ru": "слой исконных чтений",
  "uk": "шар питомих читань",
  "ar": "طبقة القراءة الأصلية",
  "he": "שכבת קריאה מקומית",
  "sw": "tabaka la usomaji asilia"
 },
 "Southern Tungusic": {
  "ja": "南ツングース語群",
  "ko": "남퉁구스어군",
  "zh": "南通古斯语支",
  "yue": "南通古斯語支",
  "vi": "nhóm Tungus Nam",
  "th": "ตุงกูสิกใต้",
  "id": "Tungus Selatan",
  "hi": "दक्षिणी तुंगुसिक",
  "de": "Südtungusisch",
  "fr": "toungouse méridional",
  "it": "tungusico meridionale",
  "es": "tungúsico meridional",
  "pt": "tungúsico meridional",
  "ru": "южные тунгусо-маньчжурские",
  "uk": "південні тунгусо-маньчжурські",
  "ar": "التنغوسية الجنوبية",
  "he": "טונגוסית דרומית",
  "sw": "Kitungusi cha Kusini"
 },
 "Zhuang": {
  "ja": "チワン語",
  "ko": "좡어",
  "zh": "壮语",
  "yue": "壯語",
  "vi": "tiếng Tráng",
  "th": "ภาษาจ้วง",
  "hi": "झुआंग",
  "fr": "zhuang",
  "it": "zhuang",
  "es": "zhuang",
  "pt": "zhuang",
  "ru": "чжуанский",
  "uk": "чжуанська",
  "ar": "الجوانغ",
  "he": "ז׳ואנג",
  "sw": "Kizhuang"
 },
 "Old Chinese": {
  "ja": "上古中国語",
  "ko": "상고 중국어",
  "zh": "上古汉语",
  "yue": "上古漢語",
  "vi": "tiếng Hán thượng cổ",
  "th": "ภาษาจีนเก่า",
  "id": "Tionghoa Kuno",
  "hi": "प्राचीन चीनी",
  "de": "Altchinesisch",
  "fr": "chinois archaïque",
  "it": "cinese antico",
  "es": "chino antiguo",
  "pt": "chinês antigo",
  "ru": "древнекитайский",
  "uk": "давньокитайська",
  "ar": "الصينية القديمة",
  "he": "סינית עתיקה",
  "sw": "Kichina cha Kale"
 },
 "Middle Chinese": {
  "ja": "中古中国語",
  "ko": "중고 중국어",
  "zh": "中古汉语",
  "yue": "中古漢語",
  "vi": "tiếng Hán trung cổ",
  "th": "ภาษาจีนยุคกลาง",
  "id": "Tionghoa Pertengahan",
  "hi": "मध्य चीनी",
  "de": "Mittelchinesisch",
  "fr": "chinois médiéval",
  "it": "cinese medio",
  "es": "chino medio",
  "pt": "chinês médio",
  "ru": "среднекитайский",
  "uk": "середньокитайська",
  "ar": "الصينية الوسطى",
  "he": "סינית תיכונה",
  "sw": "Kichina cha Kati"
 }
};
  for (const [term, tr] of Object.entries(A)) for (const [lang, v] of Object.entries(tr)) {
    if (!META_I18N_ATOMS[lang]) META_I18N_ATOMS[lang] = {};
    const cur = META_I18N_ATOMS[lang][term];
    if (cur === undefined || cur === term) META_I18N_ATOMS[lang][term] = v;
  }
})();

// r25: tree levels that are a bare direction ("Iranian, Western, Persian") or
// came out word by word (ja "北部 パハリ諸語", es "Northern Pahari" untouched).
(function () {
  if (typeof META_I18N === 'undefined') return;
  const F = {
    "Western":  { "de": "Westlich" },
    "Northern": { "de": "Nördlich" },
    "Southern": { "de": "Südlich" },
    "Eastern":  { "de": "Östlich" },
    "Zone JE.16": { "ja": "JE.16 群", "de": "Zone JE.16", "fr": "zone JE.16" },
    "Northern Pahari": { "ja": "北部パハリ諸語", "de": "Nord-Pahari", "fr": "pahari du Nord", "es": "pahari septentrional", "it": "pahari settentrionale", "pt": "pahari setentrional" },
    "Eastern Pahari":  { "ja": "東部パハリ諸語", "de": "Ost-Pahari", "fr": "pahari oriental", "es": "pahari oriental", "it": "pahari orientale", "pt": "pahari oriental" }
  };
  for (const [src, tr] of Object.entries(F)) for (const [lang, v] of Object.entries(tr)) {
    if (!META_I18N[lang]) META_I18N[lang] = {};
    META_I18N[lang][src] = v;
  }
})();

// r25: Han Map family / region values shown in the language panel and on the
// SEO pages. The panel translates a value only when every part is known, so
// these were English (or Japanese) in up to 18 UIs. Whole-value entries;
// an existing entry wins.
(function () {
  if (typeof META_I18N === 'undefined') return;
  const F = {
 "China (Shanxi — Lüliang 吕梁)": {
  "ja": "中国（山西 — 呂梁）",
  "ko": "중국 (산시 — 뤼량)",
  "zh": "中国（山西 — 吕梁）",
  "yue": "中國（山西 — 呂梁）",
  "vi": "Trung Quốc (Sơn Tây — Lüliang 吕梁)",
  "th": "จีน (ซานซี — Lüliang 吕梁)",
  "id": "Tiongkok (Shanxi — Lüliang 吕梁)",
  "hi": "चीन (शानशी — Lüliang 吕梁)",
  "de": "China (Shanxi — Lüliang 吕梁)",
  "fr": "Chine (Shanxi — Lüliang 吕梁)",
  "it": "Cina (Shanxi — Lüliang 吕梁)",
  "es": "China (Shanxi — Lüliang 吕梁)",
  "pt": "China (Shanxi — Lüliang 吕梁)",
  "ru": "Китай (Шаньси — Lüliang 吕梁)",
  "uk": "Китай (Шаньсі — Lüliang 吕梁)",
  "ar": "الصين (شانشي — Lüliang 吕梁)",
  "he": "סין (שאנשי — Lüliang 吕梁)",
  "sw": "China (Shanxi — Lüliang 吕梁)"
 },
 "Sinitic (Yue, Gaoyang)": {
  "ja": "シナ語派（粤語、高陽片）",
  "ko": "중국어파 (월어, 가오양)",
  "zh": "汉语族（粤语、高阳片）",
  "yue": "漢語族（粵語、高陽片）",
  "vi": "Hán (Việt, phiến Cao Dương)",
  "th": "จีน (เยฺว่, เกาหยาง)",
  "id": "Sinitik (Yue, Gaoyang)",
  "hi": "सिनिटिक (युए, गाओयांग)",
  "de": "Sinitisch (Yue, Gaoyang)",
  "fr": "Sinitique (yue, Gaoyang)",
  "it": "Sinitico (yue, Gaoyang)",
  "es": "Sinítico (yue, Gaoyang)",
  "pt": "Sinítico (yue, Gaoyang)",
  "ru": "синитские (юэ, гаоян)",
  "uk": "синітські (юе, гаоян)",
  "ar": "الصينية (اليوي، غاويانغ)",
  "he": "סינית (יואה, גאויאנג)",
  "sw": "Kisinitiki (Yue, Gaoyang)"
 },
 "China (Guangdong — Huazhou 化州, Hexi 河西)": {
  "ja": "中国（広東 — 化州、河西）",
  "ko": "중국 (광둥 — 화저우, 허시)",
  "zh": "中国（广东 — 化州、河西）",
  "yue": "中國（廣東 — 化州、河西）",
  "vi": "Trung Quốc (Quảng Đông — Huazhou 化州, Hexi 河西)",
  "th": "จีน (กวางตุ้ง — Huazhou 化州, Hexi 河西)",
  "id": "Tiongkok (Guangdong — Huazhou 化州, Hexi 河西)",
  "hi": "चीन (ग्वांगदोंग — Huazhou 化州, Hexi 河西)",
  "de": "China (Guangdong — Huazhou 化州, Hexi 河西)",
  "fr": "Chine (Guangdong — Huazhou 化州, Hexi 河西)",
  "it": "Cina (Guangdong — Huazhou 化州, Hexi 河西)",
  "es": "China (Guangdong — Huazhou 化州, Hexi 河西)",
  "pt": "China (Guangdong — Huazhou 化州, Hexi 河西)",
  "ru": "Китай (Гуандун — Huazhou 化州, Hexi 河西)",
  "uk": "Китай (Гуандун — Huazhou 化州, Hexi 河西)",
  "ar": "الصين (قوانغدونغ — Huazhou 化州، Hexi 河西)",
  "he": "סין (גואנגדונג — Huazhou 化州, Hexi 河西)",
  "sw": "China (Guangdong — Huazhou 化州, Hexi 河西)"
 },
 "Zhoucheng, Xizhou, Dali, Yunnan, China": {
  "ja": "中国雲南省大理市喜洲鎮周城",
  "ko": "중국 윈난성 다리시 시저우진 저우청",
  "zh": "中国云南省大理市喜洲镇周城",
  "yue": "中國雲南省大理市喜洲鎮周城",
  "vi": "Chu Thành, Hỷ Châu, Đại Lý, Vân Nam, Trung Quốc",
  "th": "โจวเฉิง, ซีโจว, ต้าหลี่, ยูนนาน, จีน",
  "id": "Zhoucheng, Xizhou, Dali, Yunnan, Tiongkok",
  "hi": "झोउचेंग, शीझोउ, दाली, युन्नान, चीन",
  "de": "Zhoucheng, Xizhou, Dali, Yunnan, China",
  "fr": "Zhoucheng, Xizhou, Dali, Yunnan, Chine",
  "it": "Zhoucheng, Xizhou, Dali, Yunnan, Cina",
  "es": "Zhoucheng, Xizhou, Dali, Yunnan, China",
  "pt": "Zhoucheng, Xizhou, Dali, Yunnan, China",
  "ru": "Чжоучэн, Сичжоу, Дали, Юньнань, Китай",
  "uk": "Чжоучен, Січжоу, Далі, Юньнань, Китай",
  "ar": "تشوتشنغ، شيتشو، دالي، يونان، الصين",
  "he": "ג'ואוצ'נג, שיג'ואו, דאלי, יונאן, סין",
  "sw": "Zhoucheng, Xizhou, Dali, Yunnan, China"
 },
 "Jin dynasty empire (Northeast China, 1115–1234)": {
  "ja": "金朝（中国東北部、1115〜1234年）",
  "ko": "금나라 (중국 동북부, 1115–1234)",
  "zh": "金朝（中国东北，1115—1234年）",
  "yue": "金朝（中國東北，1115至1234年）",
  "vi": "Đế quốc nhà Kim (Đông Bắc Trung Quốc, 1115–1234)",
  "th": "จักรวรรดิราชวงศ์จิน (จีนตะวันออกเฉียงเหนือ, ค.ศ. 1115–1234)",
  "id": "Kekaisaran Dinasti Jin (Tiongkok Timur Laut, 1115–1234)",
  "hi": "जिन राजवंश साम्राज्य (पूर्वोत्तर चीन, 1115–1234)",
  "de": "Reich der Jin-Dynastie (Nordostchina, 1115–1234)",
  "fr": "Empire de la dynastie Jin (Nord-Est de la Chine, 1115–1234)",
  "it": "Impero della dinastia Jin (Cina nord-orientale, 1115–1234)",
  "es": "Imperio de la dinastía Jin (noreste de China, 1115–1234)",
  "pt": "Império da dinastia Jin (Nordeste da China, 1115–1234)",
  "ru": "империя Цзинь (Северо-Восточный Китай, 1115–1234)",
  "uk": "імперія Цзінь (Північно-Східний Китай, 1115–1234)",
  "ar": "إمبراطورية سلالة جين (شمال شرق الصين، 1115–1234)",
  "he": "אימפריית שושלת ג'ין (צפון-מזרח סין, 1115–1234)",
  "sw": "Milki ya nasaba ya Jin (Kaskazini-Mashariki mwa China, 1115–1234)"
 },
 "Manchuria (Northeast China)": {
  "ja": "満洲（中国東北部）",
  "ko": "만주 (중국 동북부)",
  "zh": "满洲（中国东北）",
  "yue": "滿洲（中國東北）",
  "vi": "Mãn Châu (Đông Bắc Trung Quốc)",
  "th": "แมนจูเรีย (จีนตะวันออกเฉียงเหนือ)",
  "id": "Manchuria (Tiongkok Timur Laut)",
  "hi": "मंचूरिया (पूर्वोत्तर चीन)",
  "de": "Mandschurei (Nordostchina)",
  "fr": "Mandchourie (Nord-Est de la Chine)",
  "it": "Manciuria (Cina nord-orientale)",
  "es": "Manchuria (noreste de China)",
  "pt": "Manchúria (Nordeste da China)",
  "ru": "Маньчжурия (Северо-Восточный Китай)",
  "uk": "Маньчжурія (Північно-Східний Китай)",
  "ar": "منشوريا (شمال شرق الصين)",
  "he": "מנצ'וריה (צפון-מזרח סין)",
  "sw": "Manchuria (Kaskazini-Mashariki mwa China)"
 },
 "Western Xia empire (Ningxia / Gansu / Inner Mongolia)": {
  "ja": "西夏（寧夏／甘粛／内モンゴル）",
  "ko": "서하 (닝샤 / 간쑤 / 내몽골)",
  "zh": "西夏（宁夏／甘肃／内蒙古）",
  "yue": "西夏（寧夏／甘肅／內蒙古）",
  "vi": "Đế quốc Tây Hạ (Ninh Hạ / Cam Túc / Nội Mông)",
  "th": "จักรวรรดิเซี่ยตะวันตก (หนิงเซี่ย / กานซู่ / มองโกเลียใน)",
  "id": "Kekaisaran Xia Barat (Ningxia / Gansu / Mongolia Dalam)",
  "hi": "पश्चिमी शिया साम्राज्य (निंगशिया / गांसू / भीतरी मंगोलिया)",
  "de": "Reich der Westlichen Xia (Ningxia / Gansu / Innere Mongolei)",
  "fr": "Empire des Xia occidentaux (Ningxia / Gansu / Mongolie-Intérieure)",
  "it": "Impero degli Xia occidentali (Ningxia / Gansu / Mongolia Interna)",
  "es": "Imperio Xia Occidental (Ningxia / Gansu / Mongolia Interior)",
  "pt": "Império Xia Ocidental (Ningxia / Gansu / Mongólia Interior)",
  "ru": "империя Западная Ся (Нинся / Ганьсу / Внутренняя Монголия)",
  "uk": "імперія Західна Ся (Нінся / Ганьсу / Внутрішня Монголія)",
  "ar": "إمبراطورية شيا الغربية (نينغشيا / قانسو / منغوليا الداخلية)",
  "he": "אימפריית שיה המערבית (נינגשיה / גאנסו / מונגוליה הפנימית)",
  "sw": "Milki ya Xia ya Magharibi (Ningxia / Gansu / Mongolia ya Ndani)"
 },
 "Baiji, Yongning District, Nanning, Guangxi, China": {
  "ja": "中国広西南寧市邕寧区百済",
  "ko": "중국 광시 난닝시 융닝구 바이지",
  "zh": "中国广西南宁市邕宁区百济",
  "yue": "中國廣西南寧市邕寧區百濟",
  "vi": "Bách Tế, quận Ung Ninh, Nam Ninh, Quảng Tây, Trung Quốc",
  "th": "ไป่จี้, เขตยงหนิง, หนานหนิง, กวางสี, จีน",
  "id": "Baiji, Distrik Yongning, Nanning, Guangxi, Tiongkok",
  "hi": "बाईजी, योंगनिंग ज़िला, नाननिंग, ग्वांगशी, चीन",
  "de": "Baiji, Bezirk Yongning, Nanning, Guangxi, China",
  "fr": "Baiji, district de Yongning, Nanning, Guangxi, Chine",
  "it": "Baiji, distretto di Yongning, Nanning, Guangxi, Cina",
  "es": "Baiji, distrito de Yongning, Nanning, Guangxi, China",
  "pt": "Baiji, distrito de Yongning, Nanning, Guangxi, China",
  "ru": "Байцзи, район Юннин, Наньнин, Гуанси, Китай",
  "uk": "Байцзі, район Юннін, Наньнін, Гуансі, Китай",
  "ar": "بايجي، حي يونغنينغ، نانينغ، قوانغشي، الصين",
  "he": "באיג'י, מחוז יונגנינג, נאנינג, גואנגשי, סין",
  "sw": "Baiji, Wilaya ya Yongning, Nanning, Guangxi, China"
 },
 "Guangxi, China (native Zhuang vocabulary written in Sawndip)": {
  "ja": "中国広西（方塊壮字で書かれたチワン語固有語彙）",
  "ko": "중국 광시 (고장자로 쓴 좡어 고유어)",
  "zh": "中国广西（以古壮字书写的壮语固有词）",
  "yue": "中國廣西（用古壯字寫嘅壯語固有詞）",
  "vi": "Quảng Tây, Trung Quốc (từ vựng thuần Tráng viết bằng chữ vuông Tráng Sawndip)",
  "th": "กวางสี, จีน (คำจ้วงแท้ที่เขียนด้วยอักษรซาวน์ดิป)",
  "id": "Guangxi, Tiongkok (kosakata asli Zhuang yang ditulis dengan Sawndip)",
  "hi": "ग्वांगशी, चीन (सॉन्डिप लिपि में लिखी देशज झुआंग शब्दावली)",
  "de": "Guangxi, China (einheimischer Zhuang-Wortschatz in Sawndip-Schrift)",
  "fr": "Guangxi, Chine (vocabulaire zhuang natif écrit en sawndip)",
  "it": "Guangxi, Cina (lessico zhuang nativo scritto in sawndip)",
  "es": "Guangxi, China (vocabulario zhuang nativo escrito en sawndip)",
  "pt": "Guangxi, China (vocabulário zhuang nativo escrito em sawndip)",
  "ru": "Гуанси, Китай (исконная чжуанская лексика, записанная письмом сауньдип)",
  "uk": "Гуансі, Китай (питома чжуанська лексика, записана письмом саундип)",
  "ar": "قوانغشي، الصين (مفردات جوانغية أصلية مكتوبة بخط ساونديب)",
  "he": "גואנגשי, סין (אוצר מילים ג'ואנגי מקורי הכתוב בכתב סאונדיפ)",
  "sw": "Guangxi, China (msamiati asilia wa Kizhuang ulioandikwa kwa Sawndip)"
 },
 "Para-Mongolic (Mongolic-Khitan branch, debated)": {
  "ja": "準モンゴル語族（モンゴル・契丹語派、議論あり）",
  "ko": "준몽골어족 (몽골·거란어파, 논쟁 중)",
  "zh": "准蒙古语族（蒙古—契丹语支，有争议）",
  "yue": "準蒙古語族（蒙古—契丹語支，有爭議）",
  "vi": "Cận Mông Cổ (nhánh Mông Cổ–Khiết Đan, còn tranh cãi)",
  "th": "พารามองโกล (สาขามองโกล–คีตาน, ยังเป็นที่ถกเถียง)",
  "id": "Para-Mongolik (cabang Mongolik-Khitan, diperdebatkan)",
  "hi": "पैरा-मंगोलिक (मंगोलिक-खितान शाखा, विवादित)",
  "de": "Para-Mongolisch (mongolisch-khitanischer Zweig, umstritten)",
  "fr": "Para-mongol (branche mongol-khitan, débattue)",
  "it": "Paramongolico (ramo mongolo-khitan, dibattuto)",
  "es": "Paramongólico (rama mongólico-kitán, debatida)",
  "pt": "Paramongólico (ramo mongólico-khitan, debatido)",
  "ru": "парамонгольские (монгольско-киданьская ветвь, спорно)",
  "uk": "парамонгольські (монгольсько-киданьська гілка, дискусійно)",
  "ar": "شبه المنغولية (فرع منغولي-خيتاني، موضع خلاف)",
  "he": "פרה-מונגולית (ענף מונגולי-קיתאני, שנוי במחלוקת)",
  "sw": "Para-Kimongolia (tawi la Kimongolia-Kikhitan, linabishaniwa)"
 },
 "Liao dynasty empire (Northeast China, Inner Mongolia, 907–1125 CE)": {
  "ja": "遼朝（中国東北部・内モンゴル、907〜1125年）",
  "ko": "요나라 (중국 동북부, 내몽골, 907–1125)",
  "zh": "辽朝（中国东北、内蒙古，公元907—1125年）",
  "yue": "遼朝（中國東北、內蒙古，公元907至1125年）",
  "vi": "Đế quốc nhà Liêu (Đông Bắc Trung Quốc, Nội Mông, 907–1125 CN)",
  "th": "จักรวรรดิราชวงศ์เหลียว (จีนตะวันออกเฉียงเหนือ, มองโกเลียใน, ค.ศ. 907–1125)",
  "id": "Kekaisaran Dinasti Liao (Tiongkok Timur Laut, Mongolia Dalam, 907–1125 M)",
  "hi": "लियाओ राजवंश साम्राज्य (पूर्वोत्तर चीन, भीतरी मंगोलिया, 907–1125 ई.)",
  "de": "Reich der Liao-Dynastie (Nordostchina, Innere Mongolei, 907–1125 n. Chr.)",
  "fr": "Empire de la dynastie Liao (Nord-Est de la Chine, Mongolie-Intérieure, 907–1125 apr. J.-C.)",
  "it": "Impero della dinastia Liao (Cina nord-orientale, Mongolia Interna, 907–1125 d.C.)",
  "es": "Imperio de la dinastía Liao (noreste de China, Mongolia Interior, 907–1125 d. C.)",
  "pt": "Império da dinastia Liao (Nordeste da China, Mongólia Interior, 907–1125 d.C.)",
  "ru": "империя Ляо (Северо-Восточный Китай, Внутренняя Монголия, 907–1125 гг. н. э.)",
  "uk": "імперія Ляо (Північно-Східний Китай, Внутрішня Монголія, 907–1125 рр. н. е.)",
  "ar": "إمبراطورية سلالة لياو (شمال شرق الصين، منغوليا الداخلية، 907–1125 م)",
  "he": "אימפריית שושלת ליאו (צפון-מזרח סין, מונגוליה הפנימית, 907–1125 לספירה)",
  "sw": "Milki ya nasaba ya Liao (Kaskazini-Mashariki mwa China, Mongolia ya Ndani, 907–1125 BK)"
 },
 "Sinitic > Mandarin (Early)": {
  "ja": "シナ語派 > 官話（初期）",
  "ko": "중국어파 > 관화 (초기)",
  "zh": "汉语族 > 官话（早期）",
  "yue": "漢語族 > 官話（早期）",
  "vi": "Hán > Quan thoại (sơ kỳ)",
  "th": "จีน > จีนกลาง (ยุคแรก)",
  "id": "Sinitik > Mandarin (Awal)",
  "hi": "सिनिटिक > मंदारिन (प्रारंभिक)",
  "de": "Sinitisch > Mandarin (früh)",
  "fr": "Sinitique > mandarin (ancien)",
  "it": "Sinitico > mandarino (antico)",
  "es": "Sinítico > mandarín (temprano)",
  "pt": "Sinítico > mandarim (inicial)",
  "ru": "синитские > мандарин (ранний)",
  "uk": "синітські > мандарин (ранній)",
  "ar": "الصينية > الماندرين (المبكرة)",
  "he": "סינית > מנדרינית (מוקדמת)",
  "sw": "Kisinitiki > Kimandarini (cha awali)"
 },
 "Yuan-dynasty north China (Central Plain)": {
  "ja": "元代の華北（中原）",
  "ko": "원나라 시대 화북 (중원)",
  "zh": "元代华北（中原）",
  "yue": "元代華北（中原）",
  "vi": "Hoa Bắc thời Nguyên (Trung Nguyên)",
  "th": "จีนตอนเหนือสมัยราชวงศ์หยวน (ที่ราบภาคกลาง)",
  "id": "Tiongkok utara era Dinasti Yuan (Dataran Tengah)",
  "hi": "युआन राजवंश कालीन उत्तरी चीन (मध्य मैदान)",
  "de": "Nordchina zur Yuan-Zeit (Zentrale Ebene)",
  "fr": "Chine du Nord sous les Yuan (Plaine centrale)",
  "it": "Cina settentrionale in epoca Yuan (Pianura Centrale)",
  "es": "Norte de China bajo la dinastía Yuan (Llanura Central)",
  "pt": "Norte da China sob a dinastia Yuan (Planície Central)",
  "ru": "Северный Китай эпохи Юань (Центральная равнина)",
  "uk": "Північний Китай доби Юань (Центральна рівнина)",
  "ar": "شمال الصين في عهد يوان (السهل الأوسط)",
  "he": "צפון סין בתקופת יואן (המישור המרכזי)",
  "sw": "Kaskazini mwa China enzi ya Yuan (Uwanda wa Kati)"
 },
 "Sinitic > Mandarin (Yuan official)": {
  "ja": "シナ語派 > 官話（元代の官用語）",
  "ko": "중국어파 > 관화 (원나라 공용어)",
  "zh": "汉语族 > 官话（元代官话）",
  "yue": "漢語族 > 官話（元代官話）",
  "vi": "Hán > Quan thoại (ngôn ngữ chính thức thời Nguyên)",
  "th": "จีน > จีนกลาง (ภาษาราชการสมัยหยวน)",
  "id": "Sinitik > Mandarin (bahasa resmi era Yuan)",
  "hi": "सिनिटिक > मंदारिन (युआन काल की राजभाषा)",
  "de": "Sinitisch > Mandarin (Amtssprache der Yuan-Zeit)",
  "fr": "Sinitique > mandarin (langue officielle des Yuan)",
  "it": "Sinitico > mandarino (lingua ufficiale degli Yuan)",
  "es": "Sinítico > mandarín (lengua oficial de los Yuan)",
  "pt": "Sinítico > mandarim (língua oficial dos Yuan)",
  "ru": "синитские > мандарин (официальный язык эпохи Юань)",
  "uk": "синітські > мандарин (офіційна мова доби Юань)",
  "ar": "الصينية > الماندرين (اللغة الرسمية في عهد يوان)",
  "he": "סינית > מנדרינית (השפה הרשמית בתקופת יואן)",
  "sw": "Kisinitiki > Kimandarini (lugha rasmi ya enzi ya Yuan)"
 },
 "Yuan dynasty (China + Mongol empire)": {
  "ja": "元朝（中国＋モンゴル帝国）",
  "ko": "원나라 (중국 + 몽골 제국)",
  "zh": "元朝（中国＋蒙古帝国）",
  "yue": "元朝（中國＋蒙古帝國）",
  "vi": "Nhà Nguyên (Trung Quốc + Đế quốc Mông Cổ)",
  "th": "ราชวงศ์หยวน (จีน + จักรวรรดิมองโกล)",
  "id": "Dinasti Yuan (Tiongkok + Kekaisaran Mongol)",
  "hi": "युआन राजवंश (चीन + मंगोल साम्राज्य)",
  "de": "Yuan-Dynastie (China + Mongolisches Reich)",
  "fr": "Dynastie Yuan (Chine + Empire mongol)",
  "it": "Dinastia Yuan (Cina + Impero mongolo)",
  "es": "Dinastía Yuan (China + Imperio mongol)",
  "pt": "Dinastia Yuan (China + Império Mongol)",
  "ru": "династия Юань (Китай + Монгольская империя)",
  "uk": "династія Юань (Китай + Монгольська імперія)",
  "ar": "سلالة يوان (الصين + الإمبراطورية المغولية)",
  "he": "שושלת יואן (סין + האימפריה המונגולית)",
  "sw": "Nasaba ya Yuan (China + Milki ya Wamongolia)"
 },
 "Hong Kong SAR": {
  "ja": "香港特別行政区",
  "ko": "홍콩 특별행정구",
  "zh": "香港特别行政区",
  "yue": "香港特別行政區",
  "vi": "Đặc khu hành chính Hồng Kông",
  "th": "เขตบริหารพิเศษฮ่องกง",
  "id": "Daerah Administratif Khusus Hong Kong",
  "hi": "हांगकांग विशेष प्रशासनिक क्षेत्र",
  "de": "Sonderverwaltungszone Hongkong",
  "fr": "RAS de Hong Kong",
  "it": "RAS di Hong Kong",
  "es": "RAE de Hong Kong",
  "pt": "RAE de Hong Kong",
  "ru": "САР Гонконг",
  "uk": "САР Гонконг",
  "ar": "منطقة هونغ كونغ الإدارية الخاصة",
  "he": "האזור המנהלי המיוחד הונג קונג",
  "sw": "Mkoa Maalum wa Utawala wa Hong Kong"
 },
 "Macau SAR": {
  "ja": "マカオ特別行政区",
  "ko": "마카오 특별행정구",
  "zh": "澳门特别行政区",
  "yue": "澳門特別行政區",
  "vi": "Đặc khu hành chính Ma Cao",
  "th": "เขตบริหารพิเศษมาเก๊า",
  "id": "Daerah Administratif Khusus Makau",
  "hi": "मकाऊ विशेष प्रशासनिक क्षेत्र",
  "de": "Sonderverwaltungszone Macau",
  "fr": "RAS de Macao",
  "it": "RAS di Macao",
  "es": "RAE de Macao",
  "pt": "RAE de Macau",
  "ru": "САР Макао",
  "uk": "САР Макао",
  "ar": "منطقة ماكاو الإدارية الخاصة",
  "he": "האזור המנהלי המיוחד מקאו",
  "sw": "Mkoa Maalum wa Utawala wa Macau"
 },
 "Sinitic > Min Nan > Hokkien > Malaysian": {
  "ja": "シナ語派 > 閩南語 > 福建語 > マレーシア",
  "ko": "중국어파 > 민난어 > 호키엔어 > 말레이시아",
  "zh": "汉语族 > 闽南语 > 福建话 > 马来西亚",
  "yue": "漢語族 > 閩南語 > 福建話 > 馬來西亞",
  "vi": "Hán > Mân Nam > Phúc Kiến > Malaysia",
  "th": "จีน > หมิ่นหนาน > ฮกเกี้ยน > มาเลเซีย",
  "id": "Sinitik > Min Nan > Hokkien > Malaysia",
  "hi": "सिनिटिक > मिन नान > होक्कियन > मलेशियाई",
  "de": "Sinitisch > Min Nan > Hokkien > malaysisch",
  "fr": "Sinitique > min nan > hokkien > malaisien",
  "it": "Sinitico > min nan > hokkien > malese",
  "es": "Sinítico > min nan > hokkien > malasio",
  "pt": "Sinítico > min nan > hokkien > malaio",
  "ru": "синитские > миньнань > хоккиен > малайзийский",
  "uk": "синітські > міньнань > хоккієн > малайзійський",
  "ar": "الصينية > مين نان > الهوكين > الماليزية",
  "he": "סינית > מין נאן > הוקיאן > מלזית",
  "sw": "Kisinitiki > Min Nan > Kihokkien > cha Malaysia"
 },
 "Peninsular Malaysia (Klang Valley)": {
  "ja": "マレー半島（クラン・バレー）",
  "ko": "말레이반도 (클랑 밸리)",
  "zh": "马来半岛（巴生谷）",
  "yue": "馬來半島（巴生谷）",
  "vi": "Bán đảo Mã Lai (Thung lũng Klang)",
  "th": "คาบสมุทรมลายู (หุบเขากลัง)",
  "id": "Semenanjung Malaysia (Lembah Klang)",
  "hi": "प्रायद्वीपीय मलेशिया (क्लांग घाटी)",
  "de": "Westmalaysia (Klang-Tal)",
  "fr": "Malaisie péninsulaire (vallée de Klang)",
  "it": "Malesia peninsulare (valle del Klang)",
  "es": "Malasia peninsular (valle del Klang)",
  "pt": "Malásia Peninsular (vale do Klang)",
  "ru": "Полуостровная Малайзия (долина Кланг)",
  "uk": "Півострівна Малайзія (долина Кланг)",
  "ar": "ماليزيا شبه الجزيرية (وادي كلانغ)",
  "he": "מלזיה של חצי האי (עמק קלאנג)",
  "sw": "Malaysia ya Rasi (Bonde la Klang)"
 },
 "Tungusic > Southern Tungusic > Manchu-Sibe": {
  "ja": "ツングース語族 > 南ツングース語群 > 満洲・シベ語",
  "ko": "퉁구스어족 > 남퉁구스어군 > 만주·시버어",
  "zh": "通古斯语族 > 南通古斯语支 > 满语—锡伯语",
  "yue": "通古斯語族 > 南通古斯語支 > 滿語—錫伯語",
  "vi": "Tungus > Nam Tungus > Mãn–Tích Bá",
  "th": "ตุงกูสิก > ตุงกูสิกใต้ > แมนจู–ซิเบ",
  "id": "Tungusik > Tungusik Selatan > Manchu-Sibe",
  "hi": "तुंगुसिक > दक्षिणी तुंगुसिक > मांचू-शीबे",
  "de": "Tungusisch > Südtungusisch > Mandschu-Xibe",
  "fr": "Toungouse > toungouse méridional > mandchou-xibe",
  "it": "Tunguso > tunguso meridionale > manciù-xibe",
  "es": "Tungúsico > tungúsico meridional > manchú-xibe",
  "pt": "Tungúsico > tungúsico meridional > manchu-xibe",
  "ru": "тунгусские > южнотунгусские > маньчжурско-сибинские",
  "uk": "тунгуські > південнотунгуські > маньчжурсько-сибинські",
  "ar": "التنغوسية > التنغوسية الجنوبية > المانشو-شيبه",
  "he": "טונגוסית > טונגוסית דרומית > מנצ'ו-שיבה",
  "sw": "Kitungusi > Kitungusi cha Kusini > Kimanchu-Kisibe"
 },
 "Qapqal Xibe Autonomous County, Xinjiang": {
  "ja": "新疆チャプチャル・シベ自治県",
  "ko": "신장 차브차르 시버 자치현",
  "zh": "新疆察布查尔锡伯自治县",
  "yue": "新疆察布查爾錫伯自治縣",
  "vi": "Huyện tự trị dân tộc Tích Bá Qapqal, Tân Cương",
  "th": "อำเภอปกครองตนเองชนชาติซีเปอชาปู่ชาเอ่อร์, ซินเจียง",
  "id": "Kabupaten Otonom Xibe Qapqal, Xinjiang",
  "hi": "चापचाल शीबे स्वायत्त काउंटी, शिनजियांग",
  "de": "Autonomer Kreis Qapqal der Xibe, Xinjiang",
  "fr": "Xian autonome xibe de Qapqal, Xinjiang",
  "it": "Contea autonoma xibe di Qapqal, Xinjiang",
  "es": "Condado autónomo xibe de Qapqal, Xinjiang",
  "pt": "Condado autônomo xibe de Qapqal, Xinjiang",
  "ru": "Чапчал-Сибоский автономный уезд, Синьцзян",
  "uk": "Чапчал-Сибоський автономний повіт, Сіньцзян",
  "ar": "مقاطعة تشابتشال ذاتية الحكم لقومية شيبه، شينجيانغ",
  "he": "המחוז האוטונומי של השיבה צ'אפצ'אל, שינג'יאנג",
  "sw": "Wilaya ya Kujitawala ya Wasibe ya Qapqal, Xinjiang"
 },
 "Koreanic > Middle Korean": {
  "ja": "朝鮮語族 > 中期朝鮮語",
  "ko": "한국어족 > 중세 한국어",
  "zh": "朝鲜语系 > 中古朝鲜语",
  "yue": "朝鮮語系 > 中古朝鮮語",
  "vi": "Triều Tiên > tiếng Triều Tiên trung đại",
  "th": "ตระกูลภาษาเกาหลี > ภาษาเกาหลีสมัยกลาง",
  "id": "Koreanik > Korea Pertengahan",
  "hi": "कोरियाई भाषा-परिवार > मध्य कोरियाई",
  "de": "Koreanische Sprachen > Mittelkoreanisch",
  "fr": "Coréanique > coréen moyen",
  "it": "Coreanico > coreano medio",
  "es": "Coreánico > coreano medio",
  "pt": "Coreânico > coreano médio",
  "ru": "корейские > среднекорейский",
  "uk": "корейські > середньокорейська",
  "ar": "اللغات الكورية > الكورية الوسطى",
  "he": "שפות קוריאניות > קוריאנית תיכונה",
  "sw": "Lugha za Kikorea > Kikorea cha Kati"
 },
 "Joseon dynasty Korea (15c)": {
  "ja": "朝鮮王朝（15世紀）",
  "ko": "조선 (15세기)",
  "zh": "朝鲜王朝（15世纪）",
  "yue": "朝鮮王朝（15世紀）",
  "vi": "Triều Tiên thời Joseon (thế kỷ 15)",
  "th": "เกาหลีสมัยราชวงศ์โชซ็อน (ศตวรรษที่ 15)",
  "id": "Korea era Dinasti Joseon (abad ke-15)",
  "hi": "जोसॉन राजवंश कालीन कोरिया (15वीं सदी)",
  "de": "Korea der Joseon-Dynastie (15. Jh.)",
  "fr": "Corée de la dynastie Joseon (XVe s.)",
  "it": "Corea della dinastia Joseon (XV sec.)",
  "es": "Corea de la dinastía Joseon (s. XV)",
  "pt": "Coreia da dinastia Joseon (séc. XV)",
  "ru": "Корея эпохи Чосон (XV в.)",
  "uk": "Корея доби Чосон (XV ст.)",
  "ar": "كوريا في عهد سلالة جوسون (القرن 15)",
  "he": "קוריאה בתקופת שושלת צ'וסון (המאה ה-15)",
  "sw": "Korea ya nasaba ya Joseon (karne ya 15)"
 },
 "Japonic > Old Japanese": {
  "ja": "日本語族 > 上代日本語",
  "ko": "일본어족 > 상대 일본어",
  "zh": "日本语系 > 上古日语",
  "yue": "日本語系 > 上古日語",
  "vi": "Nhật Bản > tiếng Nhật thượng đại",
  "th": "ตระกูลภาษาญี่ปุ่น > ภาษาญี่ปุ่นเก่า",
  "id": "Japonik > Jepang Kuno",
  "hi": "जापानी भाषा-परिवार > प्राचीन जापानी",
  "de": "Japonische Sprachen > Altjapanisch",
  "fr": "Japonique > japonais ancien",
  "it": "Giaponico > giapponese antico",
  "es": "Japónico > japonés antiguo",
  "pt": "Japônico > japonês antigo",
  "ru": "японские > древнеяпонский",
  "uk": "японські > давньояпонська",
  "ar": "اللغات اليابانية > اليابانية القديمة",
  "he": "שפות יפוניות > יפנית עתיקה",
  "sw": "Lugha za Kijapani > Kijapani cha Kale"
 },
 "Nara-period Japan (Asuka–Heijō)": {
  "ja": "奈良時代の日本（飛鳥〜平城京）",
  "ko": "나라 시대 일본 (아스카–헤이조쿄)",
  "zh": "奈良时代的日本（飞鸟—平城京）",
  "yue": "奈良時代嘅日本（飛鳥至平城京）",
  "vi": "Nhật Bản thời Nara (Asuka–Heijō)",
  "th": "ญี่ปุ่นสมัยนาระ (อาซูกะ–เฮโจ)",
  "id": "Jepang zaman Nara (Asuka–Heijō)",
  "hi": "नारा काल का जापान (असुका–हेइजो)",
  "de": "Japan der Nara-Zeit (Asuka–Heijō)",
  "fr": "Japon de l’époque de Nara (Asuka–Heijō)",
  "it": "Giappone del periodo Nara (Asuka–Heijō)",
  "es": "Japón del período Nara (Asuka–Heijō)",
  "pt": "Japão do período Nara (Asuka–Heijō)",
  "ru": "Япония периода Нара (Асука–Хэйдзё)",
  "uk": "Японія періоду Нара (Асука–Хейдзьо)",
  "ar": "اليابان في عصر نارا (أسوكا–هيجو)",
  "he": "יפן בתקופת נארה (אסוקה–הייג'ו)",
  "sw": "Japani ya kipindi cha Nara (Asuka–Heijō)"
 },
 "Vietnamese > Sino-Vietnamese (pre-Tang stratum)": {
  "ja": "ベトナム語 > 漢越語（唐以前の層）",
  "ko": "베트남어 > 한월어 (당 이전 층위)",
  "zh": "越南语 > 汉越语（唐以前层次）",
  "yue": "越南語 > 漢越語（唐以前層次）",
  "vi": "Tiếng Việt > Hán-Việt (tầng trước thời Đường)",
  "th": "ภาษาเวียดนาม > จีน-เวียดนาม (ชั้นก่อนราชวงศ์ถัง)",
  "id": "Vietnam > Sino-Vietnam (lapisan pra-Tang)",
  "hi": "वियतनामी > चीनी-वियतनामी (तांग-पूर्व स्तर)",
  "de": "Vietnamesisch > Sino-Vietnamesisch (Schicht vor der Tang-Zeit)",
  "fr": "Vietnamien > sino-vietnamien (strate antérieure aux Tang)",
  "it": "Vietnamita > sino-vietnamita (strato pre-Tang)",
  "es": "Vietnamita > sino-vietnamita (estrato anterior a los Tang)",
  "pt": "Vietnamita > sino-vietnamita (estrato pré-Tang)",
  "ru": "вьетнамский > китайско-вьетнамский (дотанский пласт)",
  "uk": "в’єтнамська > китайсько-в’єтнамська (дотанський шар)",
  "ar": "الفيتنامية > الصينية-الفيتنامية (طبقة ما قبل تانغ)",
  "he": "וייטנאמית > סינו-וייטנאמית (שכבה קדם-טאנגית)",
  "sw": "Kivietinamu > Kisino-Kivietinamu (tabaka la kabla ya Tang)"
 },
 "northern Vietnam (pre-Tang)": {
  "ja": "ベトナム北部（唐以前）",
  "ko": "베트남 북부 (당 이전)",
  "zh": "越南北部（唐以前）",
  "yue": "越南北部（唐以前）",
  "vi": "miền Bắc Việt Nam (trước thời Đường)",
  "th": "เวียดนามตอนเหนือ (ก่อนราชวงศ์ถัง)",
  "id": "Vietnam utara (pra-Tang)",
  "hi": "उत्तरी वियतनाम (तांग-पूर्व)",
  "de": "Nordvietnam (vor der Tang-Zeit)",
  "fr": "Nord du Viêt Nam (avant les Tang)",
  "it": "Vietnam settentrionale (pre-Tang)",
  "es": "Norte de Vietnam (anterior a los Tang)",
  "pt": "Norte do Vietnã (pré-Tang)",
  "ru": "Северный Вьетнам (до эпохи Тан)",
  "uk": "Північний В’єтнам (до доби Тан)",
  "ar": "شمال فيتنام (ما قبل تانغ)",
  "he": "צפון וייטנאם (לפני תקופת טאנג)",
  "sw": "Kaskazini mwa Vietnam (kabla ya Tang)"
 },
 "Kra-Dai > Tai > Southwestern Tai": {
  "ja": "クラ・ダイ語族 > タイ語派 > 南西タイ諸語",
  "ko": "크라다이어족 > 타이어파 > 남서 타이어군",
  "zh": "壮侗语系 > 台语支 > 西南台语",
  "yue": "壯侗語系 > 台語支 > 西南台語",
  "vi": "Kra-Dai > Tai > Tai Tây Nam",
  "th": "ขร้า-ไท > ไท > ไทตะวันตกเฉียงใต้",
  "id": "Kra-Dai > Tai > Tai Barat Daya",
  "hi": "क्रा-दाई > ताई > दक्षिण-पश्चिमी ताई",
  "de": "Kra-Dai > Tai > Südwest-Tai",
  "fr": "Kra-dai > taï > taï du Sud-Ouest",
  "it": "Kra-dai > tai > tai sudoccidentale",
  "es": "Kra-dai > tai > tai del suroeste",
  "pt": "Kra-dai > tai > tai do sudoeste",
  "ru": "кра-дай > тай > юго-западные тай",
  "uk": "кра-дай > тай > південно-західні тай",
  "ar": "الكراداي > التاي > التاي الجنوبية الغربية",
  "he": "קרה-דאי > טאי > טאי דרום-מערבית",
  "sw": "Kra-Dai > Tai > Tai ya Kusini-Magharibi"
 },
 "Sino-Tibetan > Tibetic > Standard Tibetan": {
  "ja": "シナ・チベット語族 > チベット諸語 > 標準チベット語",
  "ko": "시노티베트어족 > 티베트어군 > 표준 티베트어",
  "zh": "汉藏语系 > 藏语支 > 标准藏语",
  "yue": "漢藏語系 > 藏語支 > 標準藏語",
  "vi": "Hán-Tạng > Tạng > tiếng Tạng chuẩn",
  "th": "จีน-ทิเบต > ทิเบต > ภาษาทิเบตมาตรฐาน",
  "id": "Sino-Tibet > Tibetik > Tibet Standar",
  "hi": "चीनी-तिब्बती > तिब्बती शाखा > मानक तिब्बती",
  "de": "Sinotibetisch > Tibetisch > Standardtibetisch",
  "fr": "Sino-tibétain > tibétique > tibétain standard",
  "it": "Sino-tibetano > tibetico > tibetano standard",
  "es": "Sino-tibetano > tibético > tibetano estándar",
  "pt": "Sino-tibetano > tibético > tibetano padrão",
  "ru": "сино-тибетские > тибетские > стандартный тибетский",
  "uk": "сино-тибетські > тибетські > стандартна тибетська",
  "ar": "الصينية-التبتية > التبتية > التبتية القياسية",
  "he": "סינו-טיבטית > טיבטיות > טיבטית תקנית",
  "sw": "Kisino-Kitibeti > Lugha za Kitibeti > Kitibeti Sanifu"
 },
 "Tibet Autonomous Region, China": {
  "ja": "中国チベット自治区",
  "ko": "중국 티베트 자치구",
  "zh": "中国西藏自治区",
  "yue": "中國西藏自治區",
  "vi": "Khu tự trị Tây Tạng, Trung Quốc",
  "th": "เขตปกครองตนเองทิเบต, จีน",
  "id": "Daerah Otonom Tibet, Tiongkok",
  "hi": "तिब्बत स्वायत्त क्षेत्र, चीन",
  "de": "Autonomes Gebiet Tibet, China",
  "fr": "Région autonome du Tibet, Chine",
  "it": "Regione autonoma del Tibet, Cina",
  "es": "Región Autónoma del Tíbet, China",
  "pt": "Região Autônoma do Tibete, China",
  "ru": "Тибетский автономный район, Китай",
  "uk": "Тибетський автономний район, Китай",
  "ar": "منطقة التبت ذاتية الحكم، الصين",
  "he": "האזור האוטונומי טיבט, סין",
  "sw": "Mkoa wa Kujitawala wa Tibet, China"
 },
 "Koreanic > Korean > DPRK Standard": {
  "ja": "朝鮮語族 > 朝鮮語 > 北朝鮮標準語（文化語）",
  "ko": "한국어족 > 한국어 > 북한 표준어 (문화어)",
  "zh": "朝鲜语系 > 朝鲜语 > 朝鲜标准语（文化语）",
  "yue": "朝鮮語系 > 朝鮮語 > 北韓標準語（文化語）",
  "vi": "Triều Tiên > tiếng Triều Tiên > chuẩn CHDCND Triều Tiên",
  "th": "ตระกูลภาษาเกาหลี > ภาษาเกาหลี > ภาษามาตรฐานเกาหลีเหนือ",
  "id": "Koreanik > Korea > Standar Korea Utara",
  "hi": "कोरियाई भाषा-परिवार > कोरियाई > उत्तर कोरियाई मानक",
  "de": "Koreanische Sprachen > Koreanisch > nordkoreanischer Standard",
  "fr": "Coréanique > coréen > standard nord-coréen",
  "it": "Coreanico > coreano > standard nordcoreano",
  "es": "Coreánico > coreano > estándar norcoreano",
  "pt": "Coreânico > coreano > padrão norte-coreano",
  "ru": "корейские > корейский > северокорейский стандарт",
  "uk": "корейські > корейська > північнокорейський стандарт",
  "ar": "اللغات الكورية > الكورية > المعيار الكوري الشمالي",
  "he": "שפות קוריאניות > קוריאנית > תקן צפון קוריאה",
  "sw": "Lugha za Kikorea > Kikorea > Kiwango cha Korea Kaskazini"
 },
 "Pyongyang (DPRK)": {
  "ja": "平壌（北朝鮮）",
  "ko": "평양 (북한)",
  "zh": "平壤（朝鲜）",
  "yue": "平壤（北韓）",
  "vi": "Bình Nhưỡng (CHDCND Triều Tiên)",
  "th": "เปียงยาง (เกาหลีเหนือ)",
  "id": "Pyongyang (Korea Utara)",
  "hi": "प्योंगयांग (उत्तर कोरिया)",
  "de": "Pjöngjang (Nordkorea)",
  "fr": "Pyongyang (RPDC)",
  "it": "Pyongyang (RPDC)",
  "es": "Pionyang (RPDC)",
  "pt": "Pyongyang (RPDC)",
  "ru": "Пхеньян (КНДР)",
  "uk": "Пхеньян (КНДР)",
  "ar": "بيونغ يانغ (كوريا الشمالية)",
  "he": "פיונגיאנג (צפון קוריאה)",
  "sw": "Pyongyang (Korea Kaskazini)"
 },
 "north China, Yellow River basin (~5200–3900 BCE)": {
  "ja": "華北・黄河流域（紀元前5200〜3900年頃）",
  "ko": "화북, 황허강 유역 (기원전 약 5200–3900년)",
  "zh": "华北、黄河流域（约公元前5200—前3900年）",
  "yue": "華北、黃河流域（約公元前5200至前3900年）",
  "vi": "Hoa Bắc, lưu vực Hoàng Hà (khoảng 5200–3900 TCN)",
  "th": "จีนตอนเหนือ ลุ่มแม่น้ำหวง (ประมาณ 5200–3900 ปีก่อน ค.ศ.)",
  "id": "Tiongkok utara, lembah Sungai Kuning (~5200–3900 SM)",
  "hi": "उत्तरी चीन, पीली नदी घाटी (~5200–3900 ई.पू.)",
  "de": "Nordchina, Becken des Gelben Flusses (~5200–3900 v. Chr.)",
  "fr": "Chine du Nord, bassin du fleuve Jaune (~5200–3900 av. J.-C.)",
  "it": "Cina settentrionale, bacino del Fiume Giallo (~5200–3900 a.C.)",
  "es": "Norte de China, cuenca del río Amarillo (~5200–3900 a. C.)",
  "pt": "Norte da China, bacia do rio Amarelo (~5200–3900 a.C.)",
  "ru": "Северный Китай, бассейн Хуанхэ (~5200–3900 гг. до н. э.)",
  "uk": "Північний Китай, басейн Хуанхе (~5200–3900 рр. до н. е.)",
  "ar": "شمال الصين، حوض النهر الأصفر (~5200–3900 ق.م)",
  "he": "צפון סין, אגן הנהר הצהוב (~5200–3900 לפנה״ס)",
  "sw": "Kaskazini mwa China, bonde la Mto Manjano (~5200–3900 KK)"
 },
 "eastern Himalayan / upper Salween-Mekong (~3000-2000 BCE)": {
  "ja": "ヒマラヤ東部／サルウィン川・メコン川上流域（紀元前3000〜2000年頃）",
  "ko": "히말라야 동부 / 살윈강·메콩강 상류 (기원전 약 3000–2000년)",
  "zh": "喜马拉雅东部／萨尔温江—湄公河上游（约公元前3000—前2000年）",
  "yue": "喜馬拉雅東部／薩爾溫江—湄公河上游（約公元前3000至前2000年）",
  "vi": "Đông Himalaya / thượng nguồn Salween–Mê Kông (khoảng 3000–2000 TCN)",
  "th": "หิมาลัยตะวันออก / ต้นน้ำสาละวิน–โขง (ประมาณ 3000–2000 ปีก่อน ค.ศ.)",
  "id": "Himalaya timur / hulu Salween-Mekong (~3000–2000 SM)",
  "hi": "पूर्वी हिमालय / ऊपरी साल्वीन-मेकांग (~3000–2000 ई.पू.)",
  "de": "Osthimalaya / oberer Salween und Mekong (~3000–2000 v. Chr.)",
  "fr": "Himalaya oriental / haute Salouen et haut Mékong (~3000–2000 av. J.-C.)",
  "it": "Himalaya orientale / alto Salween e alto Mekong (~3000–2000 a.C.)",
  "es": "Himalaya oriental / alto Salween y alto Mekong (~3000–2000 a. C.)",
  "pt": "Himalaia oriental / alto Salween e alto Mekong (~3000–2000 a.C.)",
  "ru": "Восточные Гималаи / верховья Салуина и Меконга (~3000–2000 гг. до н. э.)",
  "uk": "Східні Гімалаї / верхів’я Салуїну та Меконгу (~3000–2000 рр. до н. е.)",
  "ar": "شرق الهيمالايا / أعالي سالوين وميكونغ (~3000–2000 ق.م)",
  "he": "מזרח ההימלאיה / הסאלווין והמקונג העליונים (~3000–2000 לפנה״ס)",
  "sw": "Himalaya ya mashariki / Salween na Mekong ya juu (~3000–2000 KK)"
 },
 "Korean Peninsula (~500 BCE - 1c CE)": {
  "ja": "朝鮮半島（紀元前500年頃〜紀元1世紀）",
  "ko": "한반도 (기원전 약 500년 – 기원후 1세기)",
  "zh": "朝鲜半岛（约公元前500年—公元1世纪）",
  "yue": "朝鮮半島（約公元前500年至公元1世紀）",
  "vi": "Bán đảo Triều Tiên (khoảng 500 TCN – thế kỷ 1 CN)",
  "th": "คาบสมุทรเกาหลี (ประมาณ 500 ปีก่อน ค.ศ. – คริสต์ศตวรรษที่ 1)",
  "id": "Semenanjung Korea (~500 SM – abad ke-1 M)",
  "hi": "कोरियाई प्रायद्वीप (~500 ई.पू. – पहली सदी ई.)",
  "de": "Koreanische Halbinsel (~500 v. Chr. – 1. Jh. n. Chr.)",
  "fr": "Péninsule coréenne (~500 av. J.-C. – Ier s. apr. J.-C.)",
  "it": "Penisola coreana (~500 a.C. – I sec. d.C.)",
  "es": "Península de Corea (~500 a. C. – s. I d. C.)",
  "pt": "Península Coreana (~500 a.C. – séc. I d.C.)",
  "ru": "Корейский полуостров (~500 г. до н. э. – I в. н. э.)",
  "uk": "Корейський півострів (~500 р. до н. е. – I ст. н. е.)",
  "ar": "شبه الجزيرة الكورية (~500 ق.م – القرن 1 م)",
  "he": "חצי האי הקוריאני (~500 לפנה״ס – המאה ה-1 לספירה)",
  "sw": "Rasi ya Korea (~500 KK – karne ya 1 BK)"
 },
 "Japanese Archipelago (~1000 BCE - 300 CE)": {
  "ja": "日本列島（紀元前1000年頃〜紀元300年頃）",
  "ko": "일본 열도 (기원전 약 1000년 – 기원후 300년)",
  "zh": "日本列岛（约公元前1000年—公元300年）",
  "yue": "日本列島（約公元前1000年至公元300年）",
  "vi": "Quần đảo Nhật Bản (khoảng 1000 TCN – 300 CN)",
  "th": "หมู่เกาะญี่ปุ่น (ประมาณ 1000 ปีก่อน ค.ศ. – ค.ศ. 300)",
  "id": "Kepulauan Jepang (~1000 SM – 300 M)",
  "hi": "जापानी द्वीपसमूह (~1000 ई.पू. – 300 ई.)",
  "de": "Japanischer Archipel (~1000 v. Chr. – 300 n. Chr.)",
  "fr": "Archipel japonais (~1000 av. J.-C. – 300 apr. J.-C.)",
  "it": "Arcipelago giapponese (~1000 a.C. – 300 d.C.)",
  "es": "Archipiélago japonés (~1000 a. C. – 300 d. C.)",
  "pt": "Arquipélago japonês (~1000 a.C. – 300 d.C.)",
  "ru": "Японский архипелаг (~1000 г. до н. э. – 300 г. н. э.)",
  "uk": "Японський архіпелаг (~1000 р. до н. е. – 300 р. н. е.)",
  "ar": "الأرخبيل الياباني (~1000 ق.م – 300 م)",
  "he": "הארכיפלג היפני (~1000 לפנה״ס – 300 לספירה)",
  "sw": "Funguvisiwa vya Japani (~1000 KK – 300 BK)"
 },
 "Amur basin / Manchuria (~500 BCE – 500 CE)": {
  "ja": "アムール川流域／満洲（紀元前500年頃〜紀元500年頃）",
  "ko": "아무르강 유역 / 만주 (기원전 약 500년 – 기원후 500년)",
  "zh": "黑龙江流域／满洲（约公元前500年—公元500年）",
  "yue": "黑龍江流域／滿洲（約公元前500年至公元500年）",
  "vi": "Lưu vực sông Amur / Mãn Châu (khoảng 500 TCN – 500 CN)",
  "th": "ลุ่มแม่น้ำอามูร์ / แมนจูเรีย (ประมาณ 500 ปีก่อน ค.ศ. – ค.ศ. 500)",
  "id": "Lembah Amur / Manchuria (~500 SM – 500 M)",
  "hi": "अमूर घाटी / मंचूरिया (~500 ई.पू. – 500 ई.)",
  "de": "Amurbecken / Mandschurei (~500 v. Chr. – 500 n. Chr.)",
  "fr": "Bassin de l’Amour / Mandchourie (~500 av. J.-C. – 500 apr. J.-C.)",
  "it": "Bacino dell’Amur / Manciuria (~500 a.C. – 500 d.C.)",
  "es": "Cuenca del Amur / Manchuria (~500 a. C. – 500 d. C.)",
  "pt": "Bacia do Amur / Manchúria (~500 a.C. – 500 d.C.)",
  "ru": "бассейн Амура / Маньчжурия (~500 г. до н. э. – 500 г. н. э.)",
  "uk": "басейн Амуру / Маньчжурія (~500 р. до н. е. – 500 р. н. е.)",
  "ar": "حوض نهر آمور / منشوريا (~500 ق.م – 500 م)",
  "he": "אגן האמור / מנצ'וריה (~500 לפנה״ס – 500 לספירה)",
  "sw": "Bonde la Amur / Manchuria (~500 KK – 500 BK)"
 },
 "mainland Southeast Asia (~3000-2000 BCE)": {
  "ja": "東南アジア大陸部（紀元前3000〜2000年頃）",
  "ko": "동남아시아 대륙부 (기원전 약 3000–2000년)",
  "zh": "东南亚大陆（约公元前3000—前2000年）",
  "yue": "東南亞大陸（約公元前3000至前2000年）",
  "vi": "Đông Nam Á lục địa (khoảng 3000–2000 TCN)",
  "th": "เอเชียตะวันออกเฉียงใต้ภาคพื้นทวีป (ประมาณ 3000–2000 ปีก่อน ค.ศ.)",
  "id": "Asia Tenggara daratan (~3000–2000 SM)",
  "hi": "मुख्यभूमि दक्षिण-पूर्व एशिया (~3000–2000 ई.पू.)",
  "de": "Festländisches Südostasien (~3000–2000 v. Chr.)",
  "fr": "Asie du Sud-Est continentale (~3000–2000 av. J.-C.)",
  "it": "Sud-est asiatico continentale (~3000–2000 a.C.)",
  "es": "Sudeste asiático continental (~3000–2000 a. C.)",
  "pt": "Sudeste Asiático continental (~3000–2000 a.C.)",
  "ru": "материковая Юго-Восточная Азия (~3000–2000 гг. до н. э.)",
  "uk": "материкова Південно-Східна Азія (~3000–2000 рр. до н. е.)",
  "ar": "البر الرئيسي لجنوب شرق آسيا (~3000–2000 ق.م)",
  "he": "דרום-מזרח אסיה היבשתית (~3000–2000 לפנה״ס)",
  "sw": "Bara la Asia ya Kusini-Mashariki (~3000–2000 KK)"
 },
 "Tai-Kadai > Tai (proto)": {
  "ja": "タイ・カダイ語族 > タイ語派（祖語）",
  "ko": "타이카다이어족 > 타이어파 (조어)",
  "zh": "壮侗语系 > 台语支（原始）",
  "yue": "壯侗語系 > 台語支（原始）",
  "vi": "Tai-Kadai > Tai (nguyên thủy)",
  "th": "ไท-กะได > ไท (ดั้งเดิม)",
  "id": "Tai-Kadai > Tai (proto)",
  "hi": "ताई-कादाई > ताई (आद्य)",
  "de": "Tai-Kadai > Tai (Proto)",
  "fr": "Taï-kadaï > taï (proto)",
  "it": "Tai-kadai > tai (proto)",
  "es": "Tai-kadai > tai (proto)",
  "pt": "Tai-kadai > tai (proto)",
  "ru": "тай-кадай > тай (праязык)",
  "uk": "тай-кадай > тай (прамова)",
  "ar": "التاي-كاداي > التاي (البدائية)",
  "he": "טאי-קדאי > טאי (פרוטו)",
  "sw": "Tai-Kadai > Tai (proto)"
 },
 "Guangxi–Vietnam border area (proposed homeland)": {
  "ja": "広西・ベトナム国境地帯（原郷とされる地）",
  "ko": "광시–베트남 국경 지대 (추정 원거주지)",
  "zh": "广西—越南边境地区（推测的原居地）",
  "yue": "廣西—越南邊境地區（推測嘅原居地）",
  "vi": "Vùng biên giới Quảng Tây – Việt Nam (quê hương giả định)",
  "th": "บริเวณชายแดนกวางสี–เวียดนาม (ถิ่นกำเนิดที่สันนิษฐาน)",
  "id": "Wilayah perbatasan Guangxi–Vietnam (tanah asal yang diusulkan)",
  "hi": "ग्वांगशी–वियतनाम सीमा क्षेत्र (प्रस्तावित मूल स्थान)",
  "de": "Grenzgebiet Guangxi–Vietnam (vermutete Urheimat)",
  "fr": "Zone frontalière Guangxi–Viêt Nam (foyer d’origine proposé)",
  "it": "Zona di confine Guangxi–Vietnam (patria d’origine proposta)",
  "es": "Zona fronteriza Guangxi–Vietnam (patria de origen propuesta)",
  "pt": "Zona fronteiriça Guangxi–Vietnã (pátria de origem proposta)",
  "ru": "приграничье Гуанси и Вьетнама (предполагаемая прародина)",
  "uk": "прикордоння Гуансі та В’єтнаму (імовірна прабатьківщина)",
  "ar": "منطقة الحدود بين قوانغشي وفيتنام (الموطن الأصلي المقترح)",
  "he": "אזור הגבול גואנגשי–וייטנאם (מולדת משוערת)",
  "sw": "Eneo la mpakani Guangxi–Vietnam (makazi asilia yanayopendekezwa)"
 },
 "Mongolian plateau (until the 13th c.)": {
  "ja": "モンゴル高原（13世紀まで）",
  "ko": "몽골고원 (13세기까지)",
  "zh": "蒙古高原（13世纪以前）",
  "yue": "蒙古高原（13世紀之前）",
  "vi": "Cao nguyên Mông Cổ (đến thế kỷ 13)",
  "th": "ที่ราบสูงมองโกเลีย (จนถึงคริสต์ศตวรรษที่ 13)",
  "id": "Dataran tinggi Mongolia (hingga abad ke-13)",
  "hi": "मंगोलियाई पठार (13वीं सदी तक)",
  "de": "Mongolisches Hochland (bis zum 13. Jh.)",
  "fr": "Plateau mongol (jusqu’au XIIIe s.)",
  "it": "Altopiano mongolo (fino al XIII sec.)",
  "es": "Meseta mongola (hasta el s. XIII)",
  "pt": "Planalto mongol (até o séc. XIII)",
  "ru": "Монгольское плато (до XIII в.)",
  "uk": "Монгольське плато (до XIII ст.)",
  "ar": "الهضبة المنغولية (حتى القرن 13)",
  "he": "הרמה המונגולית (עד המאה ה-13)",
  "sw": "Uwanda wa juu wa Mongolia (hadi karne ya 13)"
 },
 "middle Yangtze region (~500 BCE, i.e. ~2,500 years BP)": {
  "ja": "長江中流域（紀元前500年頃、すなわち約2,500年前）",
  "ko": "창장강 중류 지역 (기원전 약 500년, 즉 약 2,500년 전)",
  "zh": "长江中游地区（约公元前500年，即距今约2500年）",
  "yue": "長江中游地區（約公元前500年，即距今約2,500年）",
  "vi": "Vùng trung lưu Trường Giang (khoảng 500 TCN, tức khoảng 2.500 năm trước)",
  "th": "ลุ่มแม่น้ำแยงซีตอนกลาง (ประมาณ 500 ปีก่อน ค.ศ. หรือราว 2,500 ปีมาแล้ว)",
  "id": "Wilayah Yangtze tengah (~500 SM, yaitu ~2.500 tahun lalu)",
  "hi": "मध्य यांग्त्से क्षेत्र (~500 ई.पू., अर्थात् ~2,500 वर्ष पूर्व)",
  "de": "Mittlerer Jangtse (~500 v. Chr., d. h. vor ~2.500 Jahren)",
  "fr": "Moyen Yangzi (~500 av. J.-C., soit il y a ~2 500 ans)",
  "it": "Medio corso dello Yangtze (~500 a.C., cioè ~2.500 anni fa)",
  "es": "Curso medio del Yangtsé (~500 a. C., es decir, hace ~2500 años)",
  "pt": "Médio Yangtzé (~500 a.C., ou seja, há ~2.500 anos)",
  "ru": "среднее течение Янцзы (~500 г. до н. э., т. е. ~2500 лет назад)",
  "uk": "середня течія Янцзи (~500 р. до н. е., тобто ~2500 років тому)",
  "ar": "منطقة اليانغتسي الوسطى (~500 ق.م، أي قبل ~2500 عام)",
  "he": "אזור היאנגצה התיכון (~500 לפנה״ס, כלומר לפני ~2,500 שנה)",
  "sw": "Eneo la Yangtze ya kati (~500 KK, yaani ~miaka 2,500 iliyopita)"
 },
 "Korea (native Korean vocabulary reading of Hanja)": {
  "ja": "朝鮮（漢字の固有語による読み）",
  "ko": "한국 (한자의 고유어 새김)",
  "zh": "朝鲜半岛（汉字的固有词训读）",
  "yue": "朝鮮半島（漢字嘅固有詞訓讀）",
  "vi": "Triều Tiên (cách đọc chữ Hán bằng từ thuần Triều)",
  "th": "เกาหลี (การอ่านอักษรฮันจาด้วยคำเกาหลีแท้)",
  "id": "Korea (bacaan Hanja dengan kosakata asli Korea)",
  "hi": "कोरिया (हंजा का देशज कोरियाई शब्दों द्वारा पठन)",
  "de": "Korea (einheimisch-koreanische Lesung der Hanja)",
  "fr": "Corée (lecture des hanja en vocabulaire coréen natif)",
  "it": "Corea (lettura degli hanja con lessico coreano nativo)",
  "es": "Corea (lectura de los hanja con vocabulario coreano nativo)",
  "pt": "Coreia (leitura dos hanja com vocabulário coreano nativo)",
  "ru": "Корея (чтение иероглифов ханча исконно корейскими словами)",
  "uk": "Корея (читання ієрогліфів ханча питомо корейськими словами)",
  "ar": "كوريا (قراءة الهانجا بمفردات كورية أصلية)",
  "he": "קוריאה (קריאת ההנג'ה במילים קוריאניות מקוריות)",
  "sw": "Korea (usomaji wa Hanja kwa msamiati asilia wa Kikorea)"
 },
 "Vietnam (native Vietnamese vocabulary reading of Hanzi)": {
  "ja": "ベトナム（漢字の固有語による読み）",
  "ko": "베트남 (한자의 고유어 읽기)",
  "zh": "越南（汉字的固有词读法）",
  "yue": "越南（漢字嘅固有詞讀法）",
  "vi": "Việt Nam (cách đọc chữ Hán bằng từ thuần Việt)",
  "th": "เวียดนาม (การอ่านอักษรจีนด้วยคำเวียดนามแท้)",
  "id": "Vietnam (bacaan Hanzi dengan kosakata asli Vietnam)",
  "hi": "वियतनाम (हान्ज़ी का देशज वियतनामी शब्दों द्वारा पठन)",
  "de": "Vietnam (einheimisch-vietnamesische Lesung der Hanzi)",
  "fr": "Viêt Nam (lecture des hanzi en vocabulaire vietnamien natif)",
  "it": "Vietnam (lettura degli hanzi con lessico vietnamita nativo)",
  "es": "Vietnam (lectura de los hanzi con vocabulario vietnamita nativo)",
  "pt": "Vietnã (leitura dos hanzi com vocabulário vietnamita nativo)",
  "ru": "Вьетнам (чтение иероглифов исконно вьетнамскими словами)",
  "uk": "В’єтнам (читання ієрогліфів питомо в’єтнамськими словами)",
  "ar": "فيتنام (قراءة الهانزي بمفردات فيتنامية أصلية)",
  "he": "וייטנאם (קריאת ההנזי במילים וייטנאמיות מקוריות)",
  "sw": "Vietnam (usomaji wa Hanzi kwa msamiati asilia wa Kivietinamu)"
 },
 "Sinitic > Mandarin > Northwest > Dungan": {
  "ja": "シナ語派 > 官話 > 西北 > ドゥンガン語",
  "ko": "중국어파 > 관화 > 서북 > 둥간어",
  "zh": "汉语族 > 官话 > 西北 > 东干语",
  "yue": "漢語族 > 官話 > 西北 > 東干語",
  "vi": "Hán > Quan thoại > Tây Bắc > Đông Can",
  "th": "จีน > จีนกลาง > ตะวันตกเฉียงเหนือ > ตงกาน",
  "id": "Sinitik > Mandarin > Barat Laut > Dungan",
  "hi": "सिनिटिक > मंदारिन > उत्तर-पश्चिमी > डुंगन",
  "de": "Sinitisch > Mandarin > Nordwest > Dunganisch",
  "fr": "Sinitique > mandarin > Nord-Ouest > dungan",
  "it": "Sinitico > mandarino > nordoccidentale > dungan",
  "es": "Sinítico > mandarín > noroeste > dungan",
  "pt": "Sinítico > mandarim > noroeste > dungan",
  "ru": "синитские > мандарин > северо-западный > дунганский",
  "uk": "синітські > мандарин > північно-західний > дунганська",
  "ar": "الصينية > الماندرين > الشمالية الغربية > الدونغانية",
  "he": "סינית > מנדרינית > צפון-מערבית > דונגנית",
  "sw": "Kisinitiki > Kimandarini > Kaskazini-Magharibi > Kidungan"
 },
 "Kyrgyzstan / Kazakhstan / Russia (Hui Muslim diaspora)": {
  "ja": "キルギス／カザフスタン／ロシア（回族ムスリムのディアスポラ）",
  "ko": "키르기스스탄 / 카자흐스탄 / 러시아 (후이족 무슬림 디아스포라)",
  "zh": "吉尔吉斯斯坦／哈萨克斯坦／俄罗斯（回族穆斯林移民群体）",
  "yue": "吉爾吉斯／哈薩克／俄羅斯（回族穆斯林移民群體）",
  "vi": "Kyrgyzstan / Kazakhstan / Nga (cộng đồng di dân người Hồi theo đạo Hồi)",
  "th": "คีร์กีซสถาน / คาซัคสถาน / รัสเซีย (ชาวหุยมุสลิมพลัดถิ่น)",
  "id": "Kirgizstan / Kazakhstan / Rusia (diaspora Muslim Hui)",
  "hi": "किर्गिस्तान / कज़ाख़स्तान / रूस (हुई मुस्लिम प्रवासी)",
  "de": "Kirgisistan / Kasachstan / Russland (Diaspora muslimischer Hui)",
  "fr": "Kirghizistan / Kazakhstan / Russie (diaspora musulmane hui)",
  "it": "Kirghizistan / Kazakistan / Russia (diaspora musulmana hui)",
  "es": "Kirguistán / Kazajistán / Rusia (diáspora musulmana hui)",
  "pt": "Quirguistão / Cazaquistão / Rússia (diáspora muçulmana hui)",
  "ru": "Киргизия / Казахстан / Россия (диаспора мусульман-хуэй)",
  "uk": "Киргизстан / Казахстан / Росія (діаспора мусульман-хуей)",
  "ar": "قيرغيزستان / كازاخستان / روسيا (شتات مسلمي الهوي)",
  "he": "קירגיזסטן / קזחסטן / רוסיה (תפוצת המוסלמים ההואים)",
  "sw": "Kirgizstan / Kazakhstan / Urusi (diaspora ya Waislamu wa Hui)"
 },
 "Sinitic > Min > Min Nan > Teochew > Thai diaspora": {
  "ja": "シナ語派 > 閩語 > 閩南語 > 潮州語 > タイ華僑",
  "ko": "중국어파 > 민어 > 민난어 > 차오저우어 > 태국 화교",
  "zh": "汉语族 > 闽语 > 闽南语 > 潮州话 > 泰国华人",
  "yue": "漢語族 > 閩語 > 閩南語 > 潮州話 > 泰國華人",
  "vi": "Hán > Mân > Mân Nam > Triều Châu > Hoa kiều Thái Lan",
  "th": "จีน > หมิ่น > หมิ่นหนาน > แต้จิ๋ว > ชาวจีนโพ้นทะเลในไทย",
  "id": "Sinitik > Min > Min Nan > Teochew > diaspora Thailand",
  "hi": "सिनिटिक > मिन > मिन नान > तेओचू > थाई प्रवासी",
  "de": "Sinitisch > Min > Min Nan > Teochew > Diaspora in Thailand",
  "fr": "Sinitique > min > min nan > teochew > diaspora de Thaïlande",
  "it": "Sinitico > min > min nan > teochew > diaspora in Thailandia",
  "es": "Sinítico > min > min nan > teochew > diáspora en Tailandia",
  "pt": "Sinítico > min > min nan > teochew > diáspora na Tailândia",
  "ru": "синитские > минь > миньнань > чаочжоуский > тайская диаспора",
  "uk": "синітські > мінь > міньнань > чаочжоуська > тайська діаспора",
  "ar": "الصينية > مين > مين نان > التشاوتشو > الشتات في تايلاند",
  "he": "סינית > מין > מין נאן > טאוצ'ו > התפוצה בתאילנד",
  "sw": "Kisinitiki > Min > Min Nan > Kiteochew > diaspora ya Thailand"
 },
 "Thailand (Bangkok Yaowarat 耀華力 Chinatown / Thai-Chinese diaspora)": {
  "ja": "タイ（バンコク・耀華力の中華街／タイ華人ディアスポラ）",
  "ko": "태국 (방콕 야오와랏 차이나타운 / 태국 화교 디아스포라)",
  "zh": "泰国（曼谷耀华力唐人街／泰国华人移民群体）",
  "yue": "泰國（曼谷耀華力唐人街／泰國華人移民群體）",
  "vi": "Thái Lan (khu phố người Hoa Yaowarat 耀華力 ở Bangkok / cộng đồng người Hoa ở Thái Lan)",
  "th": "ไทย (ไชนาทาวน์เยาวราช 耀華力 กรุงเทพฯ / ชาวไทยเชื้อสายจีน)",
  "id": "Thailand (Pecinan Yaowarat 耀華力 di Bangkok / diaspora Tionghoa-Thai)",
  "hi": "थाईलैंड (बैंकॉक का याओवारात 耀華力 चाइनाटाउन / थाई-चीनी प्रवासी)",
  "de": "Thailand (Chinatown Yaowarat 耀華力 in Bangkok / thailändisch-chinesische Diaspora)",
  "fr": "Thaïlande (quartier chinois de Yaowarat 耀華力 à Bangkok / diaspora sino-thaïe)",
  "it": "Thailandia (Chinatown di Yaowarat 耀華力 a Bangkok / diaspora sino-thailandese)",
  "es": "Tailandia (barrio chino de Yaowarat 耀華力 en Bangkok / diáspora sino-tailandesa)",
  "pt": "Tailândia (Chinatown de Yaowarat 耀華力 em Bangkok / diáspora sino-tailandesa)",
  "ru": "Таиланд (чайнатаун Яоварат 耀華力 в Бангкоке / тайско-китайская диаспора)",
  "uk": "Таїланд (чайнатаун Яоварат 耀華力 у Бангкоку / тайсько-китайська діаспора)",
  "ar": "تايلاند (الحي الصيني ياوارات 耀華力 في بانكوك / الشتات الصيني التايلاندي)",
  "he": "תאילנד (צ'יינה טאון יאוורט 耀華力 בבנגקוק / התפוצה הסינית-תאית)",
  "sw": "Thailand (Chinatown ya Yaowarat 耀華力 mjini Bangkok / diaspora ya Wachina wa Thailand)"
 },
 "Sinitic > Mandarin (Taiwan variety / 中華民國華語)": {
  "ja": "シナ語派 > 官話（台湾華語 / 中華民國華語）",
  "ko": "중국어파 > 관화 (대만 화어 / 중화민국 화어)",
  "zh": "汉语族 > 官话（台湾华语 / 中华民国华语）",
  "yue": "漢語族 > 官話（台灣華語 / 中華民國華語）",
  "vi": "Hán > Quan thoại (biến thể Đài Loan / 中華民國華語)",
  "th": "จีน > จีนกลาง (แบบไต้หวัน / 中華民國華語)",
  "id": "Sinitik > Mandarin (varietas Taiwan / 中華民國華語)",
  "hi": "सिनिटिक > मंदारिन (ताइवानी रूप / 中華民國華語)",
  "de": "Sinitisch > Mandarin (taiwanische Varietät / 中華民國華語)",
  "fr": "Sinitique > mandarin (variété taïwanaise / 中華民國華語)",
  "it": "Sinitico > mandarino (varietà taiwanese / 中華民國華語)",
  "es": "Sinítico > mandarín (variedad taiwanesa / 中華民國華語)",
  "pt": "Sinítico > mandarim (variedade taiwanesa / 中華民國華語)",
  "ru": "синитские > мандарин (тайваньский вариант / 中華民國華語)",
  "uk": "синітські > мандарин (тайванський варіант / 中華民國華語)",
  "ar": "الصينية > الماندرين (النسخة التايوانية / 中華民國華語)",
  "he": "סינית > מנדרינית (הגרסה הטייוואנית / 中華民國華語)",
  "sw": "Kisinitiki > Kimandarini (aina ya Taiwan / 中華民國華語)"
 },
 "Taiwan (incl. Penghu, Kinmen, Matsu)": {
  "ja": "台湾（澎湖・金門・馬祖を含む）",
  "ko": "대만 (펑후, 진먼, 마쭈 포함)",
  "zh": "台湾（含澎湖、金门、马祖）",
  "yue": "台灣（包括澎湖、金門、馬祖）",
  "vi": "Đài Loan (gồm Bành Hồ, Kim Môn, Mã Tổ)",
  "th": "ไต้หวัน (รวมเผิงหู, จินเหมิน, หมาจู่)",
  "id": "Taiwan (termasuk Penghu, Kinmen, Matsu)",
  "hi": "ताइवान (पेंगहू, किनमेन, मात्सू सहित)",
  "de": "Taiwan (inkl. Penghu, Kinmen, Matsu)",
  "fr": "Taïwan (y compris Penghu, Kinmen, Matsu)",
  "it": "Taiwan (incl. Penghu, Kinmen, Matsu)",
  "es": "Taiwán (incl. Penghu, Kinmen, Matsu)",
  "pt": "Taiwan (incl. Penghu, Kinmen, Matsu)",
  "ru": "Тайвань (включая Пэнху, Цзиньмэнь, Мацзу)",
  "uk": "Тайвань (включно з Пенху, Цзіньмень, Мацзу)",
  "ar": "تايوان (بما فيها بنغهو وكينمن وماتسو)",
  "he": "טייוואן (כולל פנגהו, קינמן, מאטסו)",
  "sw": "Taiwan (pamoja na Penghu, Kinmen, Matsu)"
 },
 "Sinitic (Mandarin, Jiao-Liao)": {
  "ja": "シナ語派（官話、膠遼）",
  "ko": "중국어파 (관화, 자오랴오)",
  "zh": "汉语族（官话、胶辽）",
  "yue": "漢語族（官話、膠遼）",
  "vi": "Hán (Quan thoại, Giao Liêu)",
  "th": "จีน (จีนกลาง, เจียวเหลียว)",
  "id": "Sinitik (Mandarin, Jiao-Liao)",
  "hi": "सिनिटिक (मंदारिन, जियाओ-लियाओ)",
  "de": "Sinitisch (Mandarin, Jiao-Liao)",
  "fr": "Sinitique (mandarin, Jiao-Liao)",
  "it": "Sinitico (mandarino, Jiao-Liao)",
  "es": "Sinítico (mandarín, Jiao-Liao)",
  "pt": "Sinítico (mandarim, Jiao-Liao)",
  "ru": "синитские (мандарин, цзяо-ляо)",
  "uk": "синітські (мандарин, цзяо-ляо)",
  "ar": "الصينية (الماندرين، جياو-لياو)",
  "he": "סינית (מנדרינית, ג'יאו-ליאו)",
  "sw": "Kisinitiki (Kimandarini, Jiao-Liao)"
 },
 "China (Shandong Peninsula — Qingdao 青島, Yantai 煙台, Weihai 威海; Liaodong Peninsula — Dalian 大連)": {
  "ja": "中国（山東半島 — 青島、煙台、威海；遼東半島 — 大連）",
  "ko": "중국 (산둥반도 — 칭다오, 옌타이, 웨이하이; 랴오둥반도 — 다롄)",
  "zh": "中国（山东半岛 — 青岛、烟台、威海；辽东半岛 — 大连）",
  "yue": "中國（山東半島 — 青島、煙台、威海；遼東半島 — 大連）",
  "vi": "Trung Quốc (bán đảo Sơn Đông — Qingdao 青島, Yantai 煙台, Weihai 威海; bán đảo Liêu Đông — Dalian 大連)",
  "th": "จีน (คาบสมุทรซานตง — Qingdao 青島, Yantai 煙台, Weihai 威海; คาบสมุทรเหลียวตง — Dalian 大連)",
  "id": "Tiongkok (Semenanjung Shandong — Qingdao 青島, Yantai 煙台, Weihai 威海; Semenanjung Liaodong — Dalian 大連)",
  "hi": "चीन (शानदोंग प्रायद्वीप — Qingdao 青島, Yantai 煙台, Weihai 威海; लियाओदोंग प्रायद्वीप — Dalian 大連)",
  "de": "China (Shandong-Halbinsel — Qingdao 青島, Yantai 煙台, Weihai 威海; Liaodong-Halbinsel — Dalian 大連)",
  "fr": "Chine (péninsule du Shandong — Qingdao 青島, Yantai 煙台, Weihai 威海 ; péninsule du Liaodong — Dalian 大連)",
  "it": "Cina (penisola dello Shandong — Qingdao 青島, Yantai 煙台, Weihai 威海; penisola del Liaodong — Dalian 大連)",
  "es": "China (península de Shandong — Qingdao 青島, Yantai 煙台, Weihai 威海; península de Liaodong — Dalian 大連)",
  "pt": "China (península de Shandong — Qingdao 青島, Yantai 煙台, Weihai 威海; península de Liaodong — Dalian 大連)",
  "ru": "Китай (Шаньдунский полуостров — Qingdao 青島, Yantai 煙台, Weihai 威海; Ляодунский полуостров — Dalian 大連)",
  "uk": "Китай (Шаньдунський півострів — Qingdao 青島, Yantai 煙台, Weihai 威海; Ляодунський півострів — Dalian 大連)",
  "ar": "الصين (شبه جزيرة شاندونغ — Qingdao 青島، Yantai 煙台، Weihai 威海؛ شبه جزيرة لياودونغ — Dalian 大連)",
  "he": "סין (חצי האי שאנדונג — Qingdao 青島, Yantai 煙台, Weihai 威海; חצי האי ליאודונג — Dalian 大連)",
  "sw": "China (Rasi ya Shandong — Qingdao 青島, Yantai 煙台, Weihai 威海; Rasi ya Liaodong — Dalian 大連)"
 },
 "China (northeastern Guangdong — Meixian 梅縣, Meizhou 梅州)": {
  "ja": "中国（広東省東北部 — 梅県、梅州）",
  "ko": "중국 (광둥성 동북부 — 메이셴, 메이저우)",
  "zh": "中国（广东东北部 — 梅县、梅州）",
  "yue": "中國（廣東東北部 — 梅縣、梅州）",
  "vi": "Trung Quốc (đông bắc Quảng Đông — Meixian 梅縣, Meizhou 梅州)",
  "th": "จีน (กวางตุ้งตะวันออกเฉียงเหนือ — Meixian 梅縣, Meizhou 梅州)",
  "id": "Tiongkok (Guangdong timur laut — Meixian 梅縣, Meizhou 梅州)",
  "hi": "चीन (पूर्वोत्तर ग्वांगदोंग — Meixian 梅縣, Meizhou 梅州)",
  "de": "China (nordöstliches Guangdong — Meixian 梅縣, Meizhou 梅州)",
  "fr": "Chine (nord-est du Guangdong — Meixian 梅縣, Meizhou 梅州)",
  "it": "Cina (Guangdong nord-orientale — Meixian 梅縣, Meizhou 梅州)",
  "es": "China (noreste de Guangdong — Meixian 梅縣, Meizhou 梅州)",
  "pt": "China (nordeste de Guangdong — Meixian 梅縣, Meizhou 梅州)",
  "ru": "Китай (северо-восточный Гуандун — Meixian 梅縣, Meizhou 梅州)",
  "uk": "Китай (північно-східний Гуандун — Meixian 梅縣, Meizhou 梅州)",
  "ar": "الصين (شمال شرق قوانغدونغ — Meixian 梅縣، Meizhou 梅州)",
  "he": "סין (צפון-מזרח גואנגדונג — Meixian 梅縣, Meizhou 梅州)",
  "sw": "China (kaskazini-mashariki mwa Guangdong — Meixian 梅縣, Meizhou 梅州)"
 },
 "Sinitic (Mandarin, Southwestern — Gui-Liu)": {
  "ja": "シナ語派（官話、西南 — 桂柳）",
  "ko": "중국어파 (관화, 서남 — 구이류)",
  "zh": "汉语族（官话、西南 — 桂柳）",
  "yue": "漢語族（官話、西南 — 桂柳）",
  "vi": "Hán (Quan thoại, Tây Nam — Quế Liễu)",
  "th": "จีน (จีนกลาง, ตะวันตกเฉียงใต้ — กุ้ยหลิ่ว)",
  "id": "Sinitik (Mandarin, Barat Daya — Gui-Liu)",
  "hi": "सिनिटिक (मंदारिन, दक्षिण-पश्चिमी — गुइ-लिउ)",
  "de": "Sinitisch (Mandarin, Südwest — Gui-Liu)",
  "fr": "Sinitique (mandarin, du Sud-Ouest — Gui-Liu)",
  "it": "Sinitico (mandarino, sudoccidentale — Gui-Liu)",
  "es": "Sinítico (mandarín, suroccidental — Gui-Liu)",
  "pt": "Sinítico (mandarim, sudoeste — Gui-Liu)",
  "ru": "синитские (мандарин, юго-западный — гуй-лю)",
  "uk": "синітські (мандарин, південно-західний — гуй-лю)",
  "ar": "الصينية (الماندرين، الجنوبية الغربية — غوي-ليو)",
  "he": "סינית (מנדרינית, דרום-מערבית — גויי-ליו)",
  "sw": "Kisinitiki (Kimandarini, Kusini-Magharibi — Gui-Liu)"
 },
 "China (Guangxi — Liuzhou 柳州, Guilin 桂林, Hechi 河池; southern Guizhou)": {
  "ja": "中国（広西 — 柳州、桂林、河池；貴州省南部）",
  "ko": "중국 (광시 — 류저우, 구이린, 허츠; 구이저우성 남부)",
  "zh": "中国（广西 — 柳州、桂林、河池；贵州南部）",
  "yue": "中國（廣西 — 柳州、桂林、河池；貴州南部）",
  "vi": "Trung Quốc (Quảng Tây — Liuzhou 柳州, Guilin 桂林, Hechi 河池; nam Quý Châu)",
  "th": "จีน (กวางสี — Liuzhou 柳州, Guilin 桂林, Hechi 河池; กุ้ยโจวตอนใต้)",
  "id": "Tiongkok (Guangxi — Liuzhou 柳州, Guilin 桂林, Hechi 河池; Guizhou selatan)",
  "hi": "चीन (ग्वांगशी — Liuzhou 柳州, Guilin 桂林, Hechi 河池; दक्षिणी गुइझोउ)",
  "de": "China (Guangxi — Liuzhou 柳州, Guilin 桂林, Hechi 河池; südliches Guizhou)",
  "fr": "Chine (Guangxi — Liuzhou 柳州, Guilin 桂林, Hechi 河池 ; sud du Guizhou)",
  "it": "Cina (Guangxi — Liuzhou 柳州, Guilin 桂林, Hechi 河池; Guizhou meridionale)",
  "es": "China (Guangxi — Liuzhou 柳州, Guilin 桂林, Hechi 河池; sur de Guizhou)",
  "pt": "China (Guangxi — Liuzhou 柳州, Guilin 桂林, Hechi 河池; sul de Guizhou)",
  "ru": "Китай (Гуанси — Liuzhou 柳州, Guilin 桂林, Hechi 河池; южный Гуйчжоу)",
  "uk": "Китай (Гуансі — Liuzhou 柳州, Guilin 桂林, Hechi 河池; південний Гуйчжоу)",
  "ar": "الصين (قوانغشي — Liuzhou 柳州، Guilin 桂林، Hechi 河池؛ جنوب قويتشو)",
  "he": "סין (גואנגשי — Liuzhou 柳州, Guilin 桂林, Hechi 河池; דרום גוויג'ואו)",
  "sw": "China (Guangxi — Liuzhou 柳州, Guilin 桂林, Hechi 河池; kusini mwa Guizhou)"
 },
 "China (Guangdong — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)": {
  "ja": "中国（広東 — 沙頭角、塩田、深圳）",
  "ko": "중국 (광둥 — 사터우자오, 옌톈, 선전)",
  "zh": "中国（广东 — 沙头角、盐田、深圳）",
  "yue": "中國（廣東 — 沙頭角、鹽田、深圳）",
  "vi": "Trung Quốc (Quảng Đông — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "th": "จีน (กวางตุ้ง — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "id": "Tiongkok (Guangdong — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "hi": "चीन (ग्वांगदोंग — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "de": "China (Guangdong — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "fr": "Chine (Guangdong — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "it": "Cina (Guangdong — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "es": "China (Guangdong — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "pt": "China (Guangdong — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "ru": "Китай (Гуандун — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "uk": "Китай (Гуандун — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "ar": "الصين (قوانغدونغ — Sha Tau Kok 沙頭角، Yantian 鹽田، Shenzhen 深圳)",
  "he": "סין (גואנגדונג — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)",
  "sw": "China (Guangdong — Sha Tau Kok 沙頭角, Yantian 鹽田, Shenzhen 深圳)"
 },
 "Sinitic (Min, Qiong-Lei)": {
  "ja": "シナ語派（閩語、瓊雷）",
  "ko": "중국어파 (민어, 충레이)",
  "zh": "汉语族（闽语、琼雷）",
  "yue": "漢語族（閩語、瓊雷）",
  "vi": "Hán (Mân, Quỳnh Lôi)",
  "th": "จีน (หมิ่น, ฉงเหลย)",
  "id": "Sinitik (Min, Qiong-Lei)",
  "hi": "सिनिटिक (मिन, चियोंग-लेई)",
  "de": "Sinitisch (Min, Qiong-Lei)",
  "fr": "Sinitique (min, Qiong-Lei)",
  "it": "Sinitico (min, Qiong-Lei)",
  "es": "Sinítico (min, Qiong-Lei)",
  "pt": "Sinítico (min, Qiong-Lei)",
  "ru": "синитские (минь, цюн-лэй)",
  "uk": "синітські (мінь, цюн-лей)",
  "ar": "الصينية (مين، تشيونغ-لي)",
  "he": "סינית (מין, צ'יונג-ליי)",
  "sw": "Kisinitiki (Min, Qiong-Lei)"
 },
 "China (Guangdong — Leizhou 雷州, Zhanjiang 湛江)": {
  "ja": "中国（広東 — 雷州、湛江）",
  "ko": "중국 (광둥 — 레이저우, 잔장)",
  "zh": "中国（广东 — 雷州、湛江）",
  "yue": "中國（廣東 — 雷州、湛江）",
  "vi": "Trung Quốc (Quảng Đông — Leizhou 雷州, Zhanjiang 湛江)",
  "th": "จีน (กวางตุ้ง — Leizhou 雷州, Zhanjiang 湛江)",
  "id": "Tiongkok (Guangdong — Leizhou 雷州, Zhanjiang 湛江)",
  "hi": "चीन (ग्वांगदोंग — Leizhou 雷州, Zhanjiang 湛江)",
  "de": "China (Guangdong — Leizhou 雷州, Zhanjiang 湛江)",
  "fr": "Chine (Guangdong — Leizhou 雷州, Zhanjiang 湛江)",
  "it": "Cina (Guangdong — Leizhou 雷州, Zhanjiang 湛江)",
  "es": "China (Guangdong — Leizhou 雷州, Zhanjiang 湛江)",
  "pt": "China (Guangdong — Leizhou 雷州, Zhanjiang 湛江)",
  "ru": "Китай (Гуандун — Leizhou 雷州, Zhanjiang 湛江)",
  "uk": "Китай (Гуандун — Leizhou 雷州, Zhanjiang 湛江)",
  "ar": "الصين (قوانغدونغ — Leizhou 雷州، Zhanjiang 湛江)",
  "he": "סין (גואנגדונג — Leizhou 雷州, Zhanjiang 湛江)",
  "sw": "China (Guangdong — Leizhou 雷州, Zhanjiang 湛江)"
 },
 "Sinitic (Min, Shao-Jiang)": {
  "ja": "シナ語派（閩語、邵将）",
  "ko": "중국어파 (민어, 사오장)",
  "zh": "汉语族（闽语、邵将）",
  "yue": "漢語族（閩語、邵將）",
  "vi": "Hán (Mân, Thiệu Tướng)",
  "th": "จีน (หมิ่น, เช่าเจียง)",
  "id": "Sinitik (Min, Shao-Jiang)",
  "hi": "सिनिटिक (मिन, शाओ-जियांग)",
  "de": "Sinitisch (Min, Shao-Jiang)",
  "fr": "Sinitique (min, Shao-Jiang)",
  "it": "Sinitico (min, Shao-Jiang)",
  "es": "Sinítico (min, Shao-Jiang)",
  "pt": "Sinítico (min, Shao-Jiang)",
  "ru": "синитские (минь, шао-цзян)",
  "uk": "синітські (мінь, шао-цзян)",
  "ar": "الصينية (مين، شاو-جيانغ)",
  "he": "סינית (מין, שאו-ג'יאנג)",
  "sw": "Kisinitiki (Min, Shao-Jiang)"
 },
 "China (Fujian — Jiangle 將樂, Shaowu 邵武)": {
  "ja": "中国（福建 — 将楽、邵武）",
  "ko": "중국 (푸젠 — 장러, 사오우)",
  "zh": "中国（福建 — 将乐、邵武）",
  "yue": "中國（福建 — 將樂、邵武）",
  "vi": "Trung Quốc (Phúc Kiến — Jiangle 將樂, Shaowu 邵武)",
  "th": "จีน (ฝูเจี้ยน — Jiangle 將樂, Shaowu 邵武)",
  "id": "Tiongkok (Fujian — Jiangle 將樂, Shaowu 邵武)",
  "hi": "चीन (फ़ुजियान — Jiangle 將樂, Shaowu 邵武)",
  "de": "China (Fujian — Jiangle 將樂, Shaowu 邵武)",
  "fr": "Chine (Fujian — Jiangle 將樂, Shaowu 邵武)",
  "it": "Cina (Fujian — Jiangle 將樂, Shaowu 邵武)",
  "es": "China (Fujian — Jiangle 將樂, Shaowu 邵武)",
  "pt": "China (Fujian — Jiangle 將樂, Shaowu 邵武)",
  "ru": "Китай (Фуцзянь — Jiangle 將樂, Shaowu 邵武)",
  "uk": "Китай (Фуцзянь — Jiangle 將樂, Shaowu 邵武)",
  "ar": "الصين (فوجيان — Jiangle 將樂، Shaowu 邵武)",
  "he": "סין (פוג'יאן — Jiangle 將樂, Shaowu 邵武)",
  "sw": "China (Fujian — Jiangle 將樂, Shaowu 邵武)"
 },
 "Singapore": {
  "ja": "シンガポール",
  "ko": "싱가포르",
  "zh": "新加坡",
  "yue": "新加坡",
  "vi": "Singapore",
  "th": "สิงคโปร์",
  "id": "Singapura",
  "hi": "सिंगापुर",
  "de": "Singapur",
  "fr": "Singapour",
  "it": "Singapore",
  "es": "Singapur",
  "pt": "Singapura",
  "ru": "Сингапур",
  "uk": "Сінгапур",
  "ar": "سنغافورة",
  "he": "סינגפור",
  "sw": "Singapore"
 },
 "Tungusic > Southern Tungusic (ancestor of Manchu)": {
  "ja": "ツングース語族 > 南ツングース語群（満洲語の祖先）",
  "ko": "퉁구스어족 > 남퉁구스어군 (만주어의 조상)",
  "zh": "通古斯语族 > 南通古斯语支（满语的祖先）",
  "yue": "通古斯語族 > 南通古斯語支（滿語嘅祖先）",
  "vi": "Tungus > Nam Tungus (tổ tiên của tiếng Mãn)",
  "th": "ตุงกูสิก > ตุงกูสิกใต้ (บรรพบุรุษของภาษาแมนจู)",
  "id": "Tungusik > Tungusik Selatan (leluhur bahasa Manchu)",
  "hi": "तुंगुसिक > दक्षिणी तुंगुसिक (मांचू की पूर्वज)",
  "de": "Tungusisch > Südtungusisch (Vorfahr des Mandschu)",
  "fr": "Toungouse > toungouse méridional (ancêtre du mandchou)",
  "it": "Tunguso > tunguso meridionale (antenato del manciù)",
  "es": "Tungúsico > tungúsico meridional (antepasado del manchú)",
  "pt": "Tungúsico > tungúsico meridional (ancestral do manchu)",
  "ru": "тунгусские > южнотунгусские (предок маньчжурского)",
  "uk": "тунгуські > південнотунгуські (предок маньчжурської)",
  "ar": "التنغوسية > التنغوسية الجنوبية (سلف المانشو)",
  "he": "טונגוסית > טונגוסית דרומית (אבי המנצ'ו)",
  "sw": "Kitungusi > Kitungusi cha Kusini (babu wa Kimanchu)"
 },
 "Sinitic > Yue > Yuehai > Hong Kong": {
  "ja": "シナ語派 > 粤語 > 粤海片 > 香港",
  "ko": "중국어파 > 월어 > 웨하이 > 홍콩",
  "zh": "汉语族 > 粤语 > 粤海片 > 香港",
  "yue": "漢語族 > 粵語 > 粵海片 > 香港",
  "vi": "Hán > Việt > Việt Hải > Hồng Kông",
  "th": "จีน > เยฺว่ > เยฺว่ไห่ > ฮ่องกง",
  "id": "Sinitik > Yue > Yuehai > Hong Kong",
  "hi": "सिनिटिक > युए > युएहाई > हांगकांग",
  "de": "Sinitisch > Yue > Yuehai > Hongkong",
  "fr": "Sinitique > yue > yuehai > Hong Kong",
  "it": "Sinitico > yue > yuehai > Hong Kong",
  "es": "Sinítico > yue > yuehai > Hong Kong",
  "pt": "Sinítico > yue > yuehai > Hong Kong",
  "ru": "синитские > юэ > юэхай > Гонконг",
  "uk": "синітські > юе > юехай > Гонконг",
  "ar": "الصينية > اليوي > يويهاي > هونغ كونغ",
  "he": "סינית > יואה > יואהאי > הונג קונג",
  "sw": "Kisinitiki > Yue > Yuehai > Hong Kong"
 },
 "Sinitic > Yue > Yuehai > Macau": {
  "ja": "シナ語派 > 粤語 > 粤海片 > マカオ",
  "ko": "중국어파 > 월어 > 웨하이 > 마카오",
  "zh": "汉语族 > 粤语 > 粤海片 > 澳门",
  "yue": "漢語族 > 粵語 > 粵海片 > 澳門",
  "vi": "Hán > Việt > Việt Hải > Ma Cao",
  "th": "จีน > เยฺว่ > เยฺว่ไห่ > มาเก๊า",
  "id": "Sinitik > Yue > Yuehai > Makau",
  "hi": "सिनिटिक > युए > युएहाई > मकाऊ",
  "de": "Sinitisch > Yue > Yuehai > Macau",
  "fr": "Sinitique > yue > yuehai > Macao",
  "it": "Sinitico > yue > yuehai > Macao",
  "es": "Sinítico > yue > yuehai > Macao",
  "pt": "Sinítico > yue > yuehai > Macau",
  "ru": "синитские > юэ > юэхай > Макао",
  "uk": "синітські > юе > юехай > Макао",
  "ar": "الصينية > اليوي > يويهاي > ماكاو",
  "he": "סינית > יואה > יואהאי > מקאו",
  "sw": "Kisinitiki > Yue > Yuehai > Macau"
 },
 "Japonic > Japanese (native reading layer)": {
  "ja": "日本語族 > 日本語（訓読みの層）",
  "ko": "일본어족 > 일본어 (고유어 훈독 층위)",
  "zh": "日本语系 > 日语（训读层）",
  "yue": "日本語系 > 日語（訓讀層）",
  "vi": "Nhật Bản > tiếng Nhật (tầng đọc bản địa)",
  "th": "ตระกูลภาษาญี่ปุ่น > ภาษาญี่ปุ่น (ชั้นการอ่านแบบคำดั้งเดิม)",
  "id": "Japonik > Jepang (lapisan bacaan asli)",
  "hi": "जापानी भाषा-परिवार > जापानी (देशज पठन स्तर)",
  "de": "Japonische Sprachen > Japanisch (einheimische Leseschicht)",
  "fr": "Japonique > japonais (couche de lecture native)",
  "it": "Giaponico > giapponese (strato di lettura nativo)",
  "es": "Japónico > japonés (estrato de lectura nativa)",
  "pt": "Japônico > japonês (camada de leitura nativa)",
  "ru": "японские > японский (исконный пласт чтений)",
  "uk": "японські > японська (питомий шар читань)",
  "ar": "اللغات اليابانية > اليابانية (طبقة القراءة الأصلية)",
  "he": "שפות יפוניות > יפנית (שכבת הקריאה המקורית)",
  "sw": "Lugha za Kijapani > Kijapani (tabaka la usomaji asilia)"
 },
 "Koreanic > Korean (native reading layer)": {
  "ja": "朝鮮語族 > 朝鮮語（固有語読みの層）",
  "ko": "한국어족 > 한국어 (고유어 새김 층위)",
  "zh": "朝鲜语系 > 朝鲜语（固有词训读层）",
  "yue": "朝鮮語系 > 朝鮮語（固有詞訓讀層）",
  "vi": "Triều Tiên > tiếng Triều Tiên (tầng đọc bản địa)",
  "th": "ตระกูลภาษาเกาหลี > ภาษาเกาหลี (ชั้นการอ่านแบบคำดั้งเดิม)",
  "id": "Koreanik > Korea (lapisan bacaan asli)",
  "hi": "कोरियाई भाषा-परिवार > कोरियाई (देशज पठन स्तर)",
  "de": "Koreanische Sprachen > Koreanisch (einheimische Leseschicht)",
  "fr": "Coréanique > coréen (couche de lecture native)",
  "it": "Coreanico > coreano (strato di lettura nativo)",
  "es": "Coreánico > coreano (estrato de lectura nativa)",
  "pt": "Coreânico > coreano (camada de leitura nativa)",
  "ru": "корейские > корейский (исконный пласт чтений)",
  "uk": "корейські > корейська (питомий шар читань)",
  "ar": "اللغات الكورية > الكورية (طبقة القراءة الأصلية)",
  "he": "שפות קוריאניות > קוריאנית (שכבת הקריאה המקורית)",
  "sw": "Lugha za Kikorea > Kikorea (tabaka la usomaji asilia)"
 },
 "China (Fujian — Yong'an 永安, Sanming 三明)": {
  "ja": "中国（福建 — 永安、三明）",
  "ko": "중국 (푸젠 — 융안, 싼밍)",
  "zh": "中国（福建 — 永安、三明）",
  "yue": "中國（福建 — 永安、三明）",
  "vi": "Trung Quốc (Phúc Kiến — Yong'an 永安, Sanming 三明)",
  "th": "จีน (ฝูเจี้ยน — Yong'an 永安, Sanming 三明)",
  "id": "Tiongkok (Fujian — Yong'an 永安, Sanming 三明)",
  "hi": "चीन (फ़ुजियान — Yong'an 永安, Sanming 三明)",
  "de": "China (Fujian — Yong'an 永安, Sanming 三明)",
  "fr": "Chine (Fujian — Yong'an 永安, Sanming 三明)",
  "it": "Cina (Fujian — Yong'an 永安, Sanming 三明)",
  "es": "China (Fujian — Yong'an 永安, Sanming 三明)",
  "pt": "China (Fujian — Yong'an 永安, Sanming 三明)",
  "ru": "Китай (Фуцзянь — Yong'an 永安, Sanming 三明)",
  "uk": "Китай (Фуцзянь — Yong'an 永安, Sanming 三明)",
  "ar": "الصين (فوجيان — Yong'an 永安، Sanming 三明)",
  "he": "סין (פוג'יאן — Yong'an 永安, Sanming 三明)",
  "sw": "China (Fujian — Yong'an 永安, Sanming 三明)"
 },
 "Kra-Dai > Tai > Zhuang": {
  "ja": "クラ・ダイ語族 > タイ語派 > チワン語",
  "ko": "크라다이어족 > 타이어파 > 좡어",
  "zh": "壮侗语系 > 台语支 > 壮语",
  "yue": "壯侗語系 > 台語支 > 壯語",
  "vi": "Kra-Dai > Tai > Tráng",
  "th": "ขร้า-ไท > ไท > จ้วง",
  "id": "Kra-Dai > Tai > Zhuang",
  "hi": "क्रा-दाई > ताई > झुआंग",
  "de": "Kra-Dai > Tai > Zhuang",
  "fr": "Kra-dai > taï > zhuang",
  "it": "Kra-dai > tai > zhuang",
  "es": "Kra-dai > tai > zhuang",
  "pt": "Kra-dai > tai > zhuang",
  "ru": "кра-дай > тай > чжуанский",
  "uk": "кра-дай > тай > чжуанська",
  "ar": "الكراداي > التاي > الجوانغ",
  "he": "קרה-דאי > טאי > ג'ואנג",
  "sw": "Kra-Dai > Tai > Kizhuang"
 },
 "Japan": {
  "ja": "日本",
  "ko": "일본",
  "zh": "日本",
  "yue": "日本",
  "vi": "Nhật Bản",
  "th": "ญี่ปุ่น",
  "id": "Jepang",
  "hi": "जापान",
  "de": "Japan",
  "fr": "Japon",
  "it": "Giappone",
  "es": "Japón",
  "pt": "Japão",
  "ru": "Япония",
  "uk": "Японія",
  "ar": "اليابان",
  "he": "יפן",
  "sw": "Japani"
 },
 "Thailand": {
  "ja": "タイ",
  "ko": "태국",
  "zh": "泰国",
  "yue": "泰國",
  "vi": "Thái Lan",
  "th": "ไทย",
  "id": "Thailand",
  "hi": "थाईलैंड",
  "de": "Thailand",
  "fr": "Thaïlande",
  "it": "Thailandia",
  "es": "Tailandia",
  "pt": "Tailândia",
  "ru": "Таиланд",
  "uk": "Таїланд",
  "ar": "تايلاند",
  "he": "תאילנד",
  "sw": "Thailand"
 },
 "Hmong-Mien (proto)": {
  "ja": "モン・ミエン語族（祖語）",
  "ko": "먀오야오어족 (조어)",
  "zh": "苗瑶语系（原始）",
  "yue": "苗瑤語系（原始）",
  "vi": "H’Mông-Miền (nguyên thủy)",
  "th": "ม้ง-เมี่ยน (ดั้งเดิม)",
  "id": "Hmong-Mien (proto)",
  "hi": "ह्मोंग-मियन (आद्य)",
  "de": "Hmong-Mien (Proto)",
  "fr": "Hmong-mien (proto)",
  "it": "Hmong-mien (proto)",
  "es": "Hmong-mien (proto)",
  "pt": "Hmong-mien (proto)",
  "ru": "мяо-яо (праязык)",
  "uk": "мяо-яо (прамова)",
  "ar": "الهمونغ-ميان (البدائية)",
  "he": "המונג-מיין (פרוטו)",
  "sw": "Hmong-Mien (proto)"
 },
 "China (Jiangxi — Yichun 宜春)": {
  "ja": "中国（江西 — 宜春）",
  "ko": "중국 (장시 — 이춘)",
  "zh": "中国（江西 — 宜春）",
  "yue": "中國（江西 — 宜春）",
  "vi": "Trung Quốc (Giang Tây — Yichun 宜春)",
  "th": "จีน (เจียงซี — Yichun 宜春)",
  "id": "Tiongkok (Jiangxi — Yichun 宜春)",
  "hi": "चीन (जियांगशी — Yichun 宜春)",
  "de": "China (Jiangxi — Yichun 宜春)",
  "fr": "Chine (Jiangxi — Yichun 宜春)",
  "it": "Cina (Jiangxi — Yichun 宜春)",
  "es": "China (Jiangxi — Yichun 宜春)",
  "pt": "China (Jiangxi — Yichun 宜春)",
  "ru": "Китай (Цзянси — Yichun 宜春)",
  "uk": "Китай (Цзянсі — Yichun 宜春)",
  "ar": "الصين (جيانغشي — Yichun 宜春)",
  "he": "סין (ג'יאנגשי — Yichun 宜春)",
  "sw": "China (Jiangxi — Yichun 宜春)"
 },
 "China (Jiangxi — Jiʼan 吉安)": {
  "ja": "中国（江西 — 吉安）",
  "ko": "중국 (장시 — 지안)",
  "zh": "中国（江西 — 吉安）",
  "yue": "中國（江西 — 吉安）",
  "vi": "Trung Quốc (Giang Tây — Jiʼan 吉安)",
  "th": "จีน (เจียงซี — Jiʼan 吉安)",
  "id": "Tiongkok (Jiangxi — Jiʼan 吉安)",
  "hi": "चीन (जियांगशी — Jiʼan 吉安)",
  "de": "China (Jiangxi — Jiʼan 吉安)",
  "fr": "Chine (Jiangxi — Jiʼan 吉安)",
  "it": "Cina (Jiangxi — Jiʼan 吉安)",
  "es": "China (Jiangxi — Jiʼan 吉安)",
  "pt": "China (Jiangxi — Jiʼan 吉安)",
  "ru": "Китай (Цзянси — Jiʼan 吉安)",
  "uk": "Китай (Цзянсі — Jiʼan 吉安)",
  "ar": "الصين (جيانغشي — Jiʼan 吉安)",
  "he": "סין (ג'יאנגשי — Jiʼan 吉安)",
  "sw": "China (Jiangxi — Jiʼan 吉安)"
 },
 "China (Jiangxi — Fuzhou 抚州)": {
  "ja": "中国（江西 — 撫州）",
  "ko": "중국 (장시 — 푸저우)",
  "zh": "中国（江西 — 抚州）",
  "yue": "中國（江西 — 撫州）",
  "vi": "Trung Quốc (Giang Tây — Fuzhou 抚州)",
  "th": "จีน (เจียงซี — Fuzhou 抚州)",
  "id": "Tiongkok (Jiangxi — Fuzhou 抚州)",
  "hi": "चीन (जियांगशी — Fuzhou 抚州)",
  "de": "China (Jiangxi — Fuzhou 抚州)",
  "fr": "Chine (Jiangxi — Fuzhou 抚州)",
  "it": "Cina (Jiangxi — Fuzhou 抚州)",
  "es": "China (Jiangxi — Fuzhou 抚州)",
  "pt": "China (Jiangxi — Fuzhou 抚州)",
  "ru": "Китай (Цзянси — Fuzhou 抚州)",
  "uk": "Китай (Цзянсі — Fuzhou 抚州)",
  "ar": "الصين (جيانغشي — Fuzhou 抚州)",
  "he": "סין (ג'יאנגשי — Fuzhou 抚州)",
  "sw": "China (Jiangxi — Fuzhou 抚州)"
 },
 "China (Jiangxi — Yingtan 鹰潭)": {
  "ja": "中国（江西 — 鷹潭）",
  "ko": "중국 (장시 — 잉탄)",
  "zh": "中国（江西 — 鹰潭）",
  "yue": "中國（江西 — 鷹潭）",
  "vi": "Trung Quốc (Giang Tây — Yingtan 鹰潭)",
  "th": "จีน (เจียงซี — Yingtan 鹰潭)",
  "id": "Tiongkok (Jiangxi — Yingtan 鹰潭)",
  "hi": "चीन (जियांगशी — Yingtan 鹰潭)",
  "de": "China (Jiangxi — Yingtan 鹰潭)",
  "fr": "Chine (Jiangxi — Yingtan 鹰潭)",
  "it": "Cina (Jiangxi — Yingtan 鹰潭)",
  "es": "China (Jiangxi — Yingtan 鹰潭)",
  "pt": "China (Jiangxi — Yingtan 鹰潭)",
  "ru": "Китай (Цзянси — Yingtan 鹰潭)",
  "uk": "Китай (Цзянсі — Yingtan 鹰潭)",
  "ar": "الصين (جيانغشي — Yingtan 鹰潭)",
  "he": "סין (ג'יאנגשי — Yingtan 鹰潭)",
  "sw": "China (Jiangxi — Yingtan 鹰潭)"
 },
 "China (Shanxi — Changzhi 长治)": {
  "ja": "中国（山西 — 長治）",
  "ko": "중국 (산시 — 창즈)",
  "zh": "中国（山西 — 长治）",
  "yue": "中國（山西 — 長治）",
  "vi": "Trung Quốc (Sơn Tây — Changzhi 长治)",
  "th": "จีน (ซานซี — Changzhi 长治)",
  "id": "Tiongkok (Shanxi — Changzhi 长治)",
  "hi": "चीन (शानशी — Changzhi 长治)",
  "de": "China (Shanxi — Changzhi 长治)",
  "fr": "Chine (Shanxi — Changzhi 长治)",
  "it": "Cina (Shanxi — Changzhi 长治)",
  "es": "China (Shanxi — Changzhi 长治)",
  "pt": "China (Shanxi — Changzhi 长治)",
  "ru": "Китай (Шаньси — Changzhi 长治)",
  "uk": "Китай (Шаньсі — Changzhi 长治)",
  "ar": "الصين (شانشي — Changzhi 长治)",
  "he": "סין (שאנשי — Changzhi 长治)",
  "sw": "China (Shanxi — Changzhi 长治)"
 },
 "China (Shanxi — Xinzhou 忻州)": {
  "ja": "中国（山西 — 忻州）",
  "ko": "중국 (산시 — 신저우)",
  "zh": "中国（山西 — 忻州）",
  "yue": "中國（山西 — 忻州）",
  "vi": "Trung Quốc (Sơn Tây — Xinzhou 忻州)",
  "th": "จีน (ซานซี — Xinzhou 忻州)",
  "id": "Tiongkok (Shanxi — Xinzhou 忻州)",
  "hi": "चीन (शानशी — Xinzhou 忻州)",
  "de": "China (Shanxi — Xinzhou 忻州)",
  "fr": "Chine (Shanxi — Xinzhou 忻州)",
  "it": "Cina (Shanxi — Xinzhou 忻州)",
  "es": "China (Shanxi — Xinzhou 忻州)",
  "pt": "China (Shanxi — Xinzhou 忻州)",
  "ru": "Китай (Шаньси — Xinzhou 忻州)",
  "uk": "Китай (Шаньсі — Xinzhou 忻州)",
  "ar": "الصين (شانشي — Xinzhou 忻州)",
  "he": "סין (שאנשי — Xinzhou 忻州)",
  "sw": "China (Shanxi — Xinzhou 忻州)"
 },
 "China (Hunan — Hengyang 衡阳)": {
  "ja": "中国（湖南 — 衡陽）",
  "ko": "중국 (후난 — 헝양)",
  "zh": "中国（湖南 — 衡阳）",
  "yue": "中國（湖南 — 衡陽）",
  "vi": "Trung Quốc (Hồ Nam — Hengyang 衡阳)",
  "th": "จีน (หูหนาน — Hengyang 衡阳)",
  "id": "Tiongkok (Hunan — Hengyang 衡阳)",
  "hi": "चीन (हुनान — Hengyang 衡阳)",
  "de": "China (Hunan — Hengyang 衡阳)",
  "fr": "Chine (Hunan — Hengyang 衡阳)",
  "it": "Cina (Hunan — Hengyang 衡阳)",
  "es": "China (Hunan — Hengyang 衡阳)",
  "pt": "China (Hunan — Hengyang 衡阳)",
  "ru": "Китай (Хунань — Hengyang 衡阳)",
  "uk": "Китай (Хунань — Hengyang 衡阳)",
  "ar": "الصين (هونان — Hengyang 衡阳)",
  "he": "סין (חונאן — Hengyang 衡阳)",
  "sw": "China (Hunan — Hengyang 衡阳)"
 },
 "China (Hunan — Loudi 娄底)": {
  "ja": "中国（湖南 — 婁底）",
  "ko": "중국 (후난 — 러우디)",
  "zh": "中国（湖南 — 娄底）",
  "yue": "中國（湖南 — 婁底）",
  "vi": "Trung Quốc (Hồ Nam — Loudi 娄底)",
  "th": "จีน (หูหนาน — Loudi 娄底)",
  "id": "Tiongkok (Hunan — Loudi 娄底)",
  "hi": "चीन (हुनान — Loudi 娄底)",
  "de": "China (Hunan — Loudi 娄底)",
  "fr": "Chine (Hunan — Loudi 娄底)",
  "it": "Cina (Hunan — Loudi 娄底)",
  "es": "China (Hunan — Loudi 娄底)",
  "pt": "China (Hunan — Loudi 娄底)",
  "ru": "Китай (Хунань — Loudi 娄底)",
  "uk": "Китай (Хунань — Loudi 娄底)",
  "ar": "الصين (هونان — Loudi 娄底)",
  "he": "סין (חונאן — Loudi 娄底)",
  "sw": "China (Hunan — Loudi 娄底)"
 },
 "China (Jiangxi — Wuyuan 婺源)": {
  "ja": "中国（江西 — 婺源）",
  "ko": "중국 (장시 — 우위안)",
  "zh": "中国（江西 — 婺源）",
  "yue": "中國（江西 — 婺源）",
  "vi": "Trung Quốc (Giang Tây — Wuyuan 婺源)",
  "th": "จีน (เจียงซี — Wuyuan 婺源)",
  "id": "Tiongkok (Jiangxi — Wuyuan 婺源)",
  "hi": "चीन (जियांगशी — Wuyuan 婺源)",
  "de": "China (Jiangxi — Wuyuan 婺源)",
  "fr": "Chine (Jiangxi — Wuyuan 婺源)",
  "it": "Cina (Jiangxi — Wuyuan 婺源)",
  "es": "China (Jiangxi — Wuyuan 婺源)",
  "pt": "China (Jiangxi — Wuyuan 婺源)",
  "ru": "Китай (Цзянси — Wuyuan 婺源)",
  "uk": "Китай (Цзянсі — Wuyuan 婺源)",
  "ar": "الصين (جيانغشي — Wuyuan 婺源)",
  "he": "סין (ג'יאנגשי — Wuyuan 婺源)",
  "sw": "China (Jiangxi — Wuyuan 婺源)"
 },
 "China (Guangxi — Guilin 桂林)": {
  "ja": "中国（広西 — 桂林）",
  "ko": "중국 (광시 — 구이린)",
  "zh": "中国（广西 — 桂林）",
  "yue": "中國（廣西 — 桂林）",
  "vi": "Trung Quốc (Quảng Tây — Guilin 桂林)",
  "th": "จีน (กวางสี — Guilin 桂林)",
  "id": "Tiongkok (Guangxi — Guilin 桂林)",
  "hi": "चीन (ग्वांगशी — Guilin 桂林)",
  "de": "China (Guangxi — Guilin 桂林)",
  "fr": "Chine (Guangxi — Guilin 桂林)",
  "it": "Cina (Guangxi — Guilin 桂林)",
  "es": "China (Guangxi — Guilin 桂林)",
  "pt": "China (Guangxi — Guilin 桂林)",
  "ru": "Китай (Гуанси — Guilin 桂林)",
  "uk": "Китай (Гуансі — Guilin 桂林)",
  "ar": "الصين (قوانغشي — Guilin 桂林)",
  "he": "סין (גואנגשי — Guilin 桂林)",
  "sw": "China (Guangxi — Guilin 桂林)"
 },
 "China (Jiangsu — Yangzhou 揚州)": {
  "ja": "中国（江蘇 — 揚州）",
  "ko": "중국 (장쑤 — 양저우)",
  "zh": "中国（江苏 — 扬州）",
  "yue": "中國（江蘇 — 揚州）",
  "vi": "Trung Quốc (Giang Tô — Yangzhou 揚州)",
  "th": "จีน (เจียงซู — Yangzhou 揚州)",
  "id": "Tiongkok (Jiangsu — Yangzhou 揚州)",
  "hi": "चीन (जियांगसू — Yangzhou 揚州)",
  "de": "China (Jiangsu — Yangzhou 揚州)",
  "fr": "Chine (Jiangsu — Yangzhou 揚州)",
  "it": "Cina (Jiangsu — Yangzhou 揚州)",
  "es": "China (Jiangsu — Yangzhou 揚州)",
  "pt": "China (Jiangsu — Yangzhou 揚州)",
  "ru": "Китай (Цзянсу — Yangzhou 揚州)",
  "uk": "Китай (Цзянсу — Yangzhou 揚州)",
  "ar": "الصين (جيانغسو — Yangzhou 揚州)",
  "he": "סין (ג'יאנגסו — Yangzhou 揚州)",
  "sw": "China (Jiangsu — Yangzhou 揚州)"
 },
 "China (Zhejiang — Qingtian 青田, Lishui 麗水)": {
  "ja": "中国（浙江 — 青田、麗水）",
  "ko": "중국 (저장 — 칭톈, 리수이)",
  "zh": "中国（浙江 — 青田、丽水）",
  "yue": "中國（浙江 — 青田、麗水）",
  "vi": "Trung Quốc (Chiết Giang — Qingtian 青田, Lishui 麗水)",
  "th": "จีน (เจ้อเจียง — Qingtian 青田, Lishui 麗水)",
  "id": "Tiongkok (Zhejiang — Qingtian 青田, Lishui 麗水)",
  "hi": "चीन (झेजियांग — Qingtian 青田, Lishui 麗水)",
  "de": "China (Zhejiang — Qingtian 青田, Lishui 麗水)",
  "fr": "Chine (Zhejiang — Qingtian 青田, Lishui 麗水)",
  "it": "Cina (Zhejiang — Qingtian 青田, Lishui 麗水)",
  "es": "China (Zhejiang — Qingtian 青田, Lishui 麗水)",
  "pt": "China (Zhejiang — Qingtian 青田, Lishui 麗水)",
  "ru": "Китай (Чжэцзян — Qingtian 青田, Lishui 麗水)",
  "uk": "Китай (Чжецзян — Qingtian 青田, Lishui 麗水)",
  "ar": "الصين (تشجيانغ — Qingtian 青田، Lishui 麗水)",
  "he": "סין (ג'ה-ג'יאנג — Qingtian 青田, Lishui 麗水)",
  "sw": "China (Zhejiang — Qingtian 青田, Lishui 麗水)"
 },
 "China (Hunan — Shuangfeng 雙峰, Loudi 婁底)": {
  "ja": "中国（湖南 — 双峰、婁底）",
  "ko": "중국 (후난 — 솽펑, 러우디)",
  "zh": "中国（湖南 — 双峰、娄底）",
  "yue": "中國（湖南 — 雙峰、婁底）",
  "vi": "Trung Quốc (Hồ Nam — Shuangfeng 雙峰, Loudi 婁底)",
  "th": "จีน (หูหนาน — Shuangfeng 雙峰, Loudi 婁底)",
  "id": "Tiongkok (Hunan — Shuangfeng 雙峰, Loudi 婁底)",
  "hi": "चीन (हुनान — Shuangfeng 雙峰, Loudi 婁底)",
  "de": "China (Hunan — Shuangfeng 雙峰, Loudi 婁底)",
  "fr": "Chine (Hunan — Shuangfeng 雙峰, Loudi 婁底)",
  "it": "Cina (Hunan — Shuangfeng 雙峰, Loudi 婁底)",
  "es": "China (Hunan — Shuangfeng 雙峰, Loudi 婁底)",
  "pt": "China (Hunan — Shuangfeng 雙峰, Loudi 婁底)",
  "ru": "Китай (Хунань — Shuangfeng 雙峰, Loudi 婁底)",
  "uk": "Китай (Хунань — Shuangfeng 雙峰, Loudi 婁底)",
  "ar": "الصين (هونان — Shuangfeng 雙峰، Loudi 婁底)",
  "he": "סין (חונאן — Shuangfeng 雙峰, Loudi 婁底)",
  "sw": "China (Hunan — Shuangfeng 雙峰, Loudi 婁底)"
 },
 "China (Anhui — Jixi 績溪, Xuancheng 宣城)": {
  "ja": "中国（安徽 — 績渓、宣城）",
  "ko": "중국 (안후이 — 지시, 쉬안청)",
  "zh": "中国（安徽 — 绩溪、宣城）",
  "yue": "中國（安徽 — 績溪、宣城）",
  "vi": "Trung Quốc (An Huy — Jixi 績溪, Xuancheng 宣城)",
  "th": "จีน (อานฮุย — Jixi 績溪, Xuancheng 宣城)",
  "id": "Tiongkok (Anhui — Jixi 績溪, Xuancheng 宣城)",
  "hi": "चीन (आनहुई — Jixi 績溪, Xuancheng 宣城)",
  "de": "China (Anhui — Jixi 績溪, Xuancheng 宣城)",
  "fr": "Chine (Anhui — Jixi 績溪, Xuancheng 宣城)",
  "it": "Cina (Anhui — Jixi 績溪, Xuancheng 宣城)",
  "es": "China (Anhui — Jixi 績溪, Xuancheng 宣城)",
  "pt": "China (Anhui — Jixi 績溪, Xuancheng 宣城)",
  "ru": "Китай (Аньхой — Jixi 績溪, Xuancheng 宣城)",
  "uk": "Китай (Аньхой — Jixi 績溪, Xuancheng 宣城)",
  "ar": "الصين (آنهوي — Jixi 績溪، Xuancheng 宣城)",
  "he": "סין (אנחווי — Jixi 績溪, Xuancheng 宣城)",
  "sw": "China (Anhui — Jixi 績溪, Xuancheng 宣城)"
 },
 "China (Shanxi — Datong 大同)": {
  "ja": "中国（山西 — 大同）",
  "ko": "중국 (산시 — 다퉁)",
  "zh": "中国（山西 — 大同）",
  "yue": "中國（山西 — 大同）",
  "vi": "Trung Quốc (Sơn Tây — Datong 大同)",
  "th": "จีน (ซานซี — Datong 大同)",
  "id": "Tiongkok (Shanxi — Datong 大同)",
  "hi": "चीन (शानशी — Datong 大同)",
  "de": "China (Shanxi — Datong 大同)",
  "fr": "Chine (Shanxi — Datong 大同)",
  "it": "Cina (Shanxi — Datong 大同)",
  "es": "China (Shanxi — Datong 大同)",
  "pt": "China (Shanxi — Datong 大同)",
  "ru": "Китай (Шаньси — Datong 大同)",
  "uk": "Китай (Шаньсі — Datong 大同)",
  "ar": "الصين (شانشي — Datong 大同)",
  "he": "סין (שאנשי — Datong 大同)",
  "sw": "China (Shanxi — Datong 大同)"
 }
};
  for (const [src, tr] of Object.entries(F)) for (const [lang, v] of Object.entries(tr)) {
    if (!META_I18N[lang]) META_I18N[lang] = {};
    if (!(src in META_I18N[lang]) || META_I18N[lang][src] === src) META_I18N[lang][src] = v;
  }
})();

// r26: the same Han Map family paths, level by level. The panel splits a path
// at " > " and translates each level, so the whole-path entries above never
// matched. Fill-only.
(function () {
  if (typeof META_I18N === 'undefined') return;
  const F = {
 "Sinitic": {
  "ja": "シナ語派",
  "ko": "중국어파",
  "zh": "汉语族",
  "yue": "漢語族",
  "vi": "Hán",
  "th": "จีน",
  "id": "Sinitik",
  "hi": "सिनिटिक",
  "de": "Sinitisch",
  "fr": "Sinitique",
  "it": "Sinitico",
  "es": "Sinítico",
  "pt": "Sinítico",
  "ru": "синитские",
  "uk": "синітські",
  "ar": "الصينية",
  "he": "סינית",
  "sw": "Kisinitiki"
 },
 "Mandarin (Early)": {
  "ja": "官話（初期）",
  "ko": "관화 (초기)",
  "zh": "官话（早期）",
  "yue": "官話（早期）",
  "vi": "Quan thoại (sơ kỳ)",
  "th": "จีนกลาง (ยุคแรก)",
  "id": "Mandarin (Awal)",
  "hi": "मंदारिन (प्रारंभिक)",
  "de": "Mandarin (früh)",
  "fr": "mandarin (ancien)",
  "it": "mandarino (antico)",
  "es": "mandarín (temprano)",
  "pt": "mandarim (inicial)",
  "ru": "мандарин (ранний)",
  "uk": "мандарин (ранній)",
  "ar": "الماندرين (المبكرة)",
  "he": "מנדרינית (מוקדמת)",
  "sw": "Kimandarini (cha awali)"
 },
 "Mandarin (Yuan official)": {
  "ja": "官話（元代の官用語）",
  "ko": "관화 (원나라 공용어)",
  "zh": "官话（元代官话）",
  "yue": "官話（元代官話）",
  "vi": "Quan thoại (ngôn ngữ chính thức thời Nguyên)",
  "th": "จีนกลาง (ภาษาราชการสมัยหยวน)",
  "id": "Mandarin (bahasa resmi era Yuan)",
  "hi": "मंदारिन (युआन काल की राजभाषा)",
  "de": "Mandarin (Amtssprache der Yuan-Zeit)",
  "fr": "mandarin (langue officielle des Yuan)",
  "it": "mandarino (lingua ufficiale degli Yuan)",
  "es": "mandarín (lengua oficial de los Yuan)",
  "pt": "mandarim (língua oficial dos Yuan)",
  "ru": "мандарин (официальный язык эпохи Юань)",
  "uk": "мандарин (офіційна мова доби Юань)",
  "ar": "الماندرين (اللغة الرسمية في عهد يوان)",
  "he": "מנדרינית (השפה הרשמית בתקופת יואן)",
  "sw": "Kimandarini (lugha rasmi ya enzi ya Yuan)"
 },
 "Min Nan": {
  "ja": "閩南語",
  "ko": "민난어",
  "zh": "闽南语",
  "yue": "閩南語",
  "vi": "Mân Nam",
  "th": "หมิ่นหนาน",
  "id": "Min Nan",
  "hi": "मिन नान",
  "de": "Min Nan",
  "fr": "min nan",
  "it": "min nan",
  "es": "min nan",
  "pt": "min nan",
  "ru": "миньнань",
  "uk": "міньнань",
  "ar": "مين نان",
  "he": "מין נאן",
  "sw": "Min Nan"
 },
 "Hokkien": {
  "ja": "福建語",
  "ko": "호키엔어",
  "zh": "福建话",
  "yue": "福建話",
  "vi": "Phúc Kiến",
  "th": "ฮกเกี้ยน",
  "id": "Hokkien",
  "hi": "होक्कियन",
  "de": "Hokkien",
  "fr": "hokkien",
  "it": "hokkien",
  "es": "hokkien",
  "pt": "hokkien",
  "ru": "хоккиен",
  "uk": "хоккієн",
  "ar": "الهوكين",
  "he": "הוקיאן",
  "sw": "Kihokkien"
 },
 "Malaysian": {
  "ja": "マレーシア",
  "ko": "말레이시아",
  "zh": "马来西亚",
  "yue": "馬來西亞",
  "vi": "Malaysia",
  "th": "มาเลเซีย",
  "id": "Malaysia",
  "hi": "मलेशियाई",
  "de": "malaysisch",
  "fr": "malaisien",
  "it": "malese",
  "es": "malasio",
  "pt": "malaio",
  "ru": "малайзийский",
  "uk": "малайзійський",
  "ar": "الماليزية",
  "he": "מלזית",
  "sw": "cha Malaysia"
 },
 "Tungusic": {
  "ja": "ツングース語族",
  "ko": "퉁구스어족",
  "zh": "通古斯语族",
  "yue": "通古斯語族",
  "vi": "Tungus",
  "th": "ตุงกูสิก",
  "id": "Tungusik",
  "hi": "तुंगुसिक",
  "de": "Tungusisch",
  "fr": "Toungouse",
  "it": "Tunguso",
  "es": "Tungúsico",
  "pt": "Tungúsico",
  "ru": "тунгусские",
  "uk": "тунгуські",
  "ar": "التنغوسية",
  "he": "טונגוסית",
  "sw": "Kitungusi"
 },
 "Southern Tungusic": {
  "ja": "南ツングース語群",
  "ko": "남퉁구스어군",
  "zh": "南通古斯语支",
  "yue": "南通古斯語支",
  "vi": "Nam Tungus",
  "th": "ตุงกูสิกใต้",
  "id": "Tungusik Selatan",
  "hi": "दक्षिणी तुंगुसिक",
  "de": "Südtungusisch",
  "fr": "toungouse méridional",
  "it": "tunguso meridionale",
  "es": "tungúsico meridional",
  "pt": "tungúsico meridional",
  "ru": "южнотунгусские",
  "uk": "південнотунгуські",
  "ar": "التنغوسية الجنوبية",
  "he": "טונגוסית דרומית",
  "sw": "Kitungusi cha Kusini"
 },
 "Manchu-Sibe": {
  "ja": "満洲・シベ語",
  "ko": "만주·시버어",
  "zh": "满语—锡伯语",
  "yue": "滿語—錫伯語",
  "vi": "Mãn–Tích Bá",
  "th": "แมนจู–ซิเบ",
  "id": "Manchu-Sibe",
  "hi": "मांचू-शीबे",
  "de": "Mandschu-Xibe",
  "fr": "mandchou-xibe",
  "it": "manciù-xibe",
  "es": "manchú-xibe",
  "pt": "manchu-xibe",
  "ru": "маньчжурско-сибинские",
  "uk": "маньчжурсько-сибинські",
  "ar": "المانشو-شيبه",
  "he": "מנצ'ו-שיבה",
  "sw": "Kimanchu-Kisibe"
 },
 "Koreanic": {
  "ja": "朝鮮語族",
  "ko": "한국어족",
  "zh": "朝鲜语系",
  "yue": "朝鮮語系",
  "vi": "Triều Tiên",
  "th": "ตระกูลภาษาเกาหลี",
  "id": "Koreanik",
  "hi": "कोरियाई भाषा-परिवार",
  "de": "Koreanische Sprachen",
  "fr": "Coréanique",
  "it": "Coreanico",
  "es": "Coreánico",
  "pt": "Coreânico",
  "ru": "корейские",
  "uk": "корейські",
  "ar": "اللغات الكورية",
  "he": "שפות קוריאניות",
  "sw": "Lugha za Kikorea"
 },
 "Middle Korean": {
  "ja": "中期朝鮮語",
  "ko": "중세 한국어",
  "zh": "中古朝鲜语",
  "yue": "中古朝鮮語",
  "vi": "tiếng Triều Tiên trung đại",
  "th": "ภาษาเกาหลีสมัยกลาง",
  "id": "Korea Pertengahan",
  "hi": "मध्य कोरियाई",
  "de": "Mittelkoreanisch",
  "fr": "coréen moyen",
  "it": "coreano medio",
  "es": "coreano medio",
  "pt": "coreano médio",
  "ru": "среднекорейский",
  "uk": "середньокорейська",
  "ar": "الكورية الوسطى",
  "he": "קוריאנית תיכונה",
  "sw": "Kikorea cha Kati"
 },
 "Japonic": {
  "ja": "日本語族",
  "ko": "일본어족",
  "zh": "日本语系",
  "yue": "日本語系",
  "vi": "Nhật Bản",
  "th": "ตระกูลภาษาญี่ปุ่น",
  "id": "Japonik",
  "hi": "जापानी भाषा-परिवार",
  "de": "Japonische Sprachen",
  "fr": "Japonique",
  "it": "Giaponico",
  "es": "Japónico",
  "pt": "Japônico",
  "ru": "японские",
  "uk": "японські",
  "ar": "اللغات اليابانية",
  "he": "שפות יפוניות",
  "sw": "Lugha za Kijapani"
 },
 "Old Japanese": {
  "ja": "上代日本語",
  "ko": "상대 일본어",
  "zh": "上古日语",
  "yue": "上古日語",
  "vi": "tiếng Nhật thượng đại",
  "th": "ภาษาญี่ปุ่นเก่า",
  "id": "Jepang Kuno",
  "hi": "प्राचीन जापानी",
  "de": "Altjapanisch",
  "fr": "japonais ancien",
  "it": "giapponese antico",
  "es": "japonés antiguo",
  "pt": "japonês antigo",
  "ru": "древнеяпонский",
  "uk": "давньояпонська",
  "ar": "اليابانية القديمة",
  "he": "יפנית עתיקה",
  "sw": "Kijapani cha Kale"
 },
 "Vietnamese": {
  "ja": "ベトナム語",
  "ko": "베트남어",
  "zh": "越南语",
  "yue": "越南語",
  "vi": "Tiếng Việt",
  "th": "ภาษาเวียดนาม",
  "id": "Vietnam",
  "hi": "वियतनामी",
  "de": "Vietnamesisch",
  "fr": "Vietnamien",
  "it": "Vietnamita",
  "es": "Vietnamita",
  "pt": "Vietnamita",
  "ru": "вьетнамский",
  "uk": "в’єтнамська",
  "ar": "الفيتنامية",
  "he": "וייטנאמית",
  "sw": "Kivietinamu"
 },
 "Sino-Vietnamese (pre-Tang stratum)": {
  "ja": "漢越語（唐以前の層）",
  "ko": "한월어 (당 이전 층위)",
  "zh": "汉越语（唐以前层次）",
  "yue": "漢越語（唐以前層次）",
  "vi": "Hán-Việt (tầng trước thời Đường)",
  "th": "จีน-เวียดนาม (ชั้นก่อนราชวงศ์ถัง)",
  "id": "Sino-Vietnam (lapisan pra-Tang)",
  "hi": "चीनी-वियतनामी (तांग-पूर्व स्तर)",
  "de": "Sino-Vietnamesisch (Schicht vor der Tang-Zeit)",
  "fr": "sino-vietnamien (strate antérieure aux Tang)",
  "it": "sino-vietnamita (strato pre-Tang)",
  "es": "sino-vietnamita (estrato anterior a los Tang)",
  "pt": "sino-vietnamita (estrato pré-Tang)",
  "ru": "китайско-вьетнамский (дотанский пласт)",
  "uk": "китайсько-в’єтнамська (дотанський шар)",
  "ar": "الصينية-الفيتنامية (طبقة ما قبل تانغ)",
  "he": "סינו-וייטנאמית (שכבה קדם-טאנגית)",
  "sw": "Kisino-Kivietinamu (tabaka la kabla ya Tang)"
 },
 "Kra-Dai": {
  "ja": "クラ・ダイ語族",
  "ko": "크라다이어족",
  "zh": "壮侗语系",
  "yue": "壯侗語系",
  "vi": "Kra-Dai",
  "th": "ขร้า-ไท",
  "id": "Kra-Dai",
  "hi": "क्रा-दाई",
  "de": "Kra-Dai",
  "fr": "Kra-dai",
  "it": "Kra-dai",
  "es": "Kra-dai",
  "pt": "Kra-dai",
  "ru": "кра-дай",
  "uk": "кра-дай",
  "ar": "الكراداي",
  "he": "קרה-דאי",
  "sw": "Kra-Dai"
 },
 "Tai": {
  "ja": "タイ語派",
  "ko": "타이어파",
  "zh": "台语支",
  "yue": "台語支",
  "vi": "Tai",
  "th": "ไท",
  "id": "Tai",
  "hi": "ताई",
  "de": "Tai",
  "fr": "taï",
  "it": "tai",
  "es": "tai",
  "pt": "tai",
  "ru": "тай",
  "uk": "тай",
  "ar": "التاي",
  "he": "טאי",
  "sw": "Tai"
 },
 "Southwestern Tai": {
  "ja": "南西タイ諸語",
  "ko": "남서 타이어군",
  "zh": "西南台语",
  "yue": "西南台語",
  "vi": "Tai Tây Nam",
  "th": "ไทตะวันตกเฉียงใต้",
  "id": "Tai Barat Daya",
  "hi": "दक्षिण-पश्चिमी ताई",
  "de": "Südwest-Tai",
  "fr": "taï du Sud-Ouest",
  "it": "tai sudoccidentale",
  "es": "tai del suroeste",
  "pt": "tai do sudoeste",
  "ru": "юго-западные тай",
  "uk": "південно-західні тай",
  "ar": "التاي الجنوبية الغربية",
  "he": "טאי דרום-מערבית",
  "sw": "Tai ya Kusini-Magharibi"
 },
 "Sino-Tibetan": {
  "ja": "シナ・チベット語族",
  "ko": "시노티베트어족",
  "zh": "汉藏语系",
  "yue": "漢藏語系",
  "vi": "Hán-Tạng",
  "th": "จีน-ทิเบต",
  "id": "Sino-Tibet",
  "hi": "चीनी-तिब्बती",
  "de": "Sinotibetisch",
  "fr": "Sino-tibétain",
  "it": "Sino-tibetano",
  "es": "Sino-tibetano",
  "pt": "Sino-tibetano",
  "ru": "сино-тибетские",
  "uk": "сино-тибетські",
  "ar": "الصينية-التبتية",
  "he": "סינו-טיבטית",
  "sw": "Kisino-Kitibeti"
 },
 "Tibetic": {
  "ja": "チベット諸語",
  "ko": "티베트어군",
  "zh": "藏语支",
  "yue": "藏語支",
  "vi": "Tạng",
  "th": "ทิเบต",
  "id": "Tibetik",
  "hi": "तिब्बती शाखा",
  "de": "Tibetisch",
  "fr": "tibétique",
  "it": "tibetico",
  "es": "tibético",
  "pt": "tibético",
  "ru": "тибетские",
  "uk": "тибетські",
  "ar": "التبتية",
  "he": "טיבטיות",
  "sw": "Lugha za Kitibeti"
 },
 "Standard Tibetan": {
  "ja": "標準チベット語",
  "ko": "표준 티베트어",
  "zh": "标准藏语",
  "yue": "標準藏語",
  "vi": "tiếng Tạng chuẩn",
  "th": "ภาษาทิเบตมาตรฐาน",
  "id": "Tibet Standar",
  "hi": "मानक तिब्बती",
  "de": "Standardtibetisch",
  "fr": "tibétain standard",
  "it": "tibetano standard",
  "es": "tibetano estándar",
  "pt": "tibetano padrão",
  "ru": "стандартный тибетский",
  "uk": "стандартна тибетська",
  "ar": "التبتية القياسية",
  "he": "טיבטית תקנית",
  "sw": "Kitibeti Sanifu"
 },
 "Korean": {
  "ja": "朝鮮語",
  "ko": "한국어",
  "zh": "朝鲜语",
  "yue": "朝鮮語",
  "vi": "tiếng Triều Tiên",
  "th": "ภาษาเกาหลี",
  "id": "Korea",
  "hi": "कोरियाई",
  "de": "Koreanisch",
  "fr": "coréen",
  "it": "coreano",
  "es": "coreano",
  "pt": "coreano",
  "ru": "корейский",
  "uk": "корейська",
  "ar": "الكورية",
  "he": "קוריאנית",
  "sw": "Kikorea"
 },
 "DPRK Standard": {
  "ja": "北朝鮮標準語（文化語）",
  "ko": "북한 표준어 (문화어)",
  "zh": "朝鲜标准语（文化语）",
  "yue": "北韓標準語（文化語）",
  "vi": "chuẩn CHDCND Triều Tiên",
  "th": "ภาษามาตรฐานเกาหลีเหนือ",
  "id": "Standar Korea Utara",
  "hi": "उत्तर कोरियाई मानक",
  "de": "nordkoreanischer Standard",
  "fr": "standard nord-coréen",
  "it": "standard nordcoreano",
  "es": "estándar norcoreano",
  "pt": "padrão norte-coreano",
  "ru": "северокорейский стандарт",
  "uk": "північнокорейський стандарт",
  "ar": "المعيار الكوري الشمالي",
  "he": "תקן צפון קוריאה",
  "sw": "Kiwango cha Korea Kaskazini"
 },
 "Tai-Kadai": {
  "ja": "タイ・カダイ語族",
  "ko": "타이카다이어족",
  "zh": "壮侗语系",
  "yue": "壯侗語系",
  "vi": "Tai-Kadai",
  "th": "ไท-กะได",
  "id": "Tai-Kadai",
  "hi": "ताई-कादाई",
  "de": "Tai-Kadai",
  "fr": "Taï-kadaï",
  "it": "Tai-kadai",
  "es": "Tai-kadai",
  "pt": "Tai-kadai",
  "ru": "тай-кадай",
  "uk": "тай-кадай",
  "ar": "التاي-كاداي",
  "he": "טאי-קדאי",
  "sw": "Tai-Kadai"
 },
 "Tai (proto)": {
  "ja": "タイ語派（祖語）",
  "ko": "타이어파 (조어)",
  "zh": "台语支（原始）",
  "yue": "台語支（原始）",
  "vi": "Tai (nguyên thủy)",
  "th": "ไท (ดั้งเดิม)",
  "id": "Tai (proto)",
  "hi": "ताई (आद्य)",
  "de": "Tai (Proto)",
  "fr": "taï (proto)",
  "it": "tai (proto)",
  "es": "tai (proto)",
  "pt": "tai (proto)",
  "ru": "тай (праязык)",
  "uk": "тай (прамова)",
  "ar": "التاي (البدائية)",
  "he": "טאי (פרוטו)",
  "sw": "Tai (proto)"
 },
 "Mandarin": {
  "ja": "官話",
  "ko": "관화",
  "zh": "官话",
  "yue": "官話",
  "vi": "Quan thoại",
  "th": "จีนกลาง",
  "id": "Mandarin",
  "hi": "मंदारिन",
  "de": "Mandarin",
  "fr": "mandarin",
  "it": "mandarino",
  "es": "mandarín",
  "pt": "mandarim",
  "ru": "мандарин",
  "uk": "мандарин",
  "ar": "الماندرين",
  "he": "מנדרינית",
  "sw": "Kimandarini"
 },
 "Northwest": {
  "ja": "西北",
  "ko": "서북",
  "zh": "西北",
  "yue": "西北",
  "vi": "Tây Bắc",
  "th": "ตะวันตกเฉียงเหนือ",
  "id": "Barat Laut",
  "hi": "उत्तर-पश्चिमी",
  "de": "Nordwest",
  "fr": "Nord-Ouest",
  "it": "nordoccidentale",
  "es": "noroeste",
  "pt": "noroeste",
  "ru": "северо-западный",
  "uk": "північно-західний",
  "ar": "الشمالية الغربية",
  "he": "צפון-מערבית",
  "sw": "Kaskazini-Magharibi"
 },
 "Dungan": {
  "ja": "ドゥンガン語",
  "ko": "둥간어",
  "zh": "东干语",
  "yue": "東干語",
  "vi": "Đông Can",
  "th": "ตงกาน",
  "id": "Dungan",
  "hi": "डुंगन",
  "de": "Dunganisch",
  "fr": "dungan",
  "it": "dungan",
  "es": "dungan",
  "pt": "dungan",
  "ru": "дунганский",
  "uk": "дунганська",
  "ar": "الدونغانية",
  "he": "דונגנית",
  "sw": "Kidungan"
 },
 "Min": {
  "ja": "閩語",
  "ko": "민어",
  "zh": "闽语",
  "yue": "閩語",
  "vi": "Mân",
  "th": "หมิ่น",
  "id": "Min",
  "hi": "मिन",
  "de": "Min",
  "fr": "min",
  "it": "min",
  "es": "min",
  "pt": "min",
  "ru": "минь",
  "uk": "мінь",
  "ar": "مين",
  "he": "מין",
  "sw": "Min"
 },
 "Teochew": {
  "ja": "潮州語",
  "ko": "차오저우어",
  "zh": "潮州话",
  "yue": "潮州話",
  "vi": "Triều Châu",
  "th": "แต้จิ๋ว",
  "id": "Teochew",
  "hi": "तेओचू",
  "de": "Teochew",
  "fr": "teochew",
  "it": "teochew",
  "es": "teochew",
  "pt": "teochew",
  "ru": "чаочжоуский",
  "uk": "чаочжоуська",
  "ar": "التشاوتشو",
  "he": "טאוצ'ו",
  "sw": "Kiteochew"
 },
 "Thai diaspora": {
  "ja": "タイ華僑",
  "ko": "태국 화교",
  "zh": "泰国华人",
  "yue": "泰國華人",
  "vi": "Hoa kiều Thái Lan",
  "th": "ชาวจีนโพ้นทะเลในไทย",
  "id": "diaspora Thailand",
  "hi": "थाई प्रवासी",
  "de": "Diaspora in Thailand",
  "fr": "diaspora de Thaïlande",
  "it": "diaspora in Thailandia",
  "es": "diáspora en Tailandia",
  "pt": "diáspora na Tailândia",
  "ru": "тайская диаспора",
  "uk": "тайська діаспора",
  "ar": "الشتات في تايلاند",
  "he": "התפוצה בתאילנד",
  "sw": "diaspora ya Thailand"
 },
 "Mandarin (Taiwan variety / 中華民國華語)": {
  "ja": "官話（台湾華語 / 中華民國華語）",
  "ko": "관화 (대만 화어 / 中華民國華語)",
  "zh": "官话（台湾华语 / 中華民國華語）",
  "yue": "官話（台灣華語 / 中華民國華語）",
  "vi": "Quan thoại (biến thể Đài Loan / 中華民國華語)",
  "th": "จีนกลาง (แบบไต้หวัน / 中華民國華語)",
  "id": "Mandarin (varietas Taiwan / 中華民國華語)",
  "hi": "मंदारिन (ताइवानी रूप / 中華民國華語)",
  "de": "Mandarin (taiwanische Varietät / 中華民國華語)",
  "fr": "mandarin (variété taïwanaise / 中華民國華語)",
  "it": "mandarino (varietà taiwanese / 中華民國華語)",
  "es": "mandarín (variedad taiwanesa / 中華民國華語)",
  "pt": "mandarim (variedade taiwanesa / 中華民國華語)",
  "ru": "мандарин (тайваньский вариант / 中華民國華語)",
  "uk": "мандарин (тайванський варіант / 中華民國華語)",
  "ar": "الماندرين (النسخة التايوانية / 中華民國華語)",
  "he": "מנדרינית (הגרסה הטייוואנית / 中華民國華語)",
  "sw": "Kimandarini (aina ya Taiwan / 中華民國華語)"
 },
 "Southern Tungusic (ancestor of Manchu)": {
  "ja": "南ツングース語群（満洲語の祖先）",
  "ko": "남퉁구스어군 (만주어의 조상)",
  "zh": "南通古斯语支（满语的祖先）",
  "yue": "南通古斯語支（滿語嘅祖先）",
  "vi": "Nam Tungus (tổ tiên của tiếng Mãn)",
  "th": "ตุงกูสิกใต้ (บรรพบุรุษของภาษาแมนจู)",
  "id": "Tungusik Selatan (leluhur bahasa Manchu)",
  "hi": "दक्षिणी तुंगुसिक (मांचू की पूर्वज)",
  "de": "Südtungusisch (Vorfahr des Mandschu)",
  "fr": "toungouse méridional (ancêtre du mandchou)",
  "it": "tunguso meridionale (antenato del manciù)",
  "es": "tungúsico meridional (antepasado del manchú)",
  "pt": "tungúsico meridional (ancestral do manchu)",
  "ru": "южнотунгусские (предок маньчжурского)",
  "uk": "південнотунгуські (предок маньчжурської)",
  "ar": "التنغوسية الجنوبية (سلف المانشو)",
  "he": "טונגוסית דרומית (אבי המנצ'ו)",
  "sw": "Kitungusi cha Kusini (babu wa Kimanchu)"
 },
 "Yue": {
  "ja": "粤語",
  "ko": "월어",
  "zh": "粤语",
  "yue": "粵語",
  "vi": "Việt",
  "th": "เยฺว่",
  "id": "Yue",
  "hi": "युए",
  "de": "Yue",
  "fr": "yue",
  "it": "yue",
  "es": "yue",
  "pt": "yue",
  "ru": "юэ",
  "uk": "юе",
  "ar": "اليوي",
  "he": "יואה",
  "sw": "Yue"
 },
 "Yuehai": {
  "ja": "粤海片",
  "ko": "웨하이",
  "zh": "粤海片",
  "yue": "粵海片",
  "vi": "Việt Hải",
  "th": "เยฺว่ไห่",
  "id": "Yuehai",
  "hi": "युएहाई",
  "de": "Yuehai",
  "fr": "yuehai",
  "it": "yuehai",
  "es": "yuehai",
  "pt": "yuehai",
  "ru": "юэхай",
  "uk": "юехай",
  "ar": "يويهاي",
  "he": "יואהאי",
  "sw": "Yuehai"
 },
 "Hong Kong": {
  "ja": "香港",
  "ko": "홍콩",
  "zh": "香港",
  "yue": "香港",
  "vi": "Hồng Kông",
  "th": "ฮ่องกง",
  "id": "Hong Kong",
  "hi": "हांगकांग",
  "de": "Hongkong",
  "fr": "Hong Kong",
  "it": "Hong Kong",
  "es": "Hong Kong",
  "pt": "Hong Kong",
  "ru": "Гонконг",
  "uk": "Гонконг",
  "ar": "هونغ كونغ",
  "he": "הונג קונג",
  "sw": "Hong Kong"
 },
 "Macau": {
  "ja": "マカオ",
  "ko": "마카오",
  "zh": "澳门",
  "yue": "澳門",
  "vi": "Ma Cao",
  "th": "มาเก๊า",
  "id": "Makau",
  "hi": "मकाऊ",
  "de": "Macau",
  "fr": "Macao",
  "it": "Macao",
  "es": "Macao",
  "pt": "Macau",
  "ru": "Макао",
  "uk": "Макао",
  "ar": "ماكاو",
  "he": "מקאו",
  "sw": "Macau"
 },
 "Japanese (native reading layer)": {
  "ja": "日本語（訓読みの層）",
  "ko": "일본어 (고유어 훈독 층위)",
  "zh": "日语（训读层）",
  "yue": "日語（訓讀層）",
  "vi": "tiếng Nhật (tầng đọc bản địa)",
  "th": "ภาษาญี่ปุ่น (ชั้นการอ่านแบบคำดั้งเดิม)",
  "id": "Jepang (lapisan bacaan asli)",
  "hi": "जापानी (देशज पठन स्तर)",
  "de": "Japanisch (einheimische Leseschicht)",
  "fr": "japonais (couche de lecture native)",
  "it": "giapponese (strato di lettura nativo)",
  "es": "japonés (estrato de lectura nativa)",
  "pt": "japonês (camada de leitura nativa)",
  "ru": "японский (исконный пласт чтений)",
  "uk": "японська (питомий шар читань)",
  "ar": "اليابانية (طبقة القراءة الأصلية)",
  "he": "יפנית (שכבת הקריאה המקורית)",
  "sw": "Kijapani (tabaka la usomaji asilia)"
 },
 "Korean (native reading layer)": {
  "ja": "朝鮮語（固有語読みの層）",
  "ko": "한국어 (고유어 새김 층위)",
  "zh": "朝鲜语（固有词训读层）",
  "yue": "朝鮮語（固有詞訓讀層）",
  "vi": "tiếng Triều Tiên (tầng đọc bản địa)",
  "th": "ภาษาเกาหลี (ชั้นการอ่านแบบคำดั้งเดิม)",
  "id": "Korea (lapisan bacaan asli)",
  "hi": "कोरियाई (देशज पठन स्तर)",
  "de": "Koreanisch (einheimische Leseschicht)",
  "fr": "coréen (couche de lecture native)",
  "it": "coreano (strato di lettura nativo)",
  "es": "coreano (estrato de lectura nativa)",
  "pt": "coreano (camada de leitura nativa)",
  "ru": "корейский (исконный пласт чтений)",
  "uk": "корейська (питомий шар читань)",
  "ar": "الكورية (طبقة القراءة الأصلية)",
  "he": "קוריאנית (שכבת הקריאה המקורית)",
  "sw": "Kikorea (tabaka la usomaji asilia)"
 },
 "Zhuang": {
  "ja": "チワン語",
  "ko": "좡어",
  "zh": "壮语",
  "yue": "壯語",
  "vi": "Tráng",
  "th": "จ้วง",
  "id": "Zhuang",
  "hi": "झुआंग",
  "de": "Zhuang",
  "fr": "zhuang",
  "it": "zhuang",
  "es": "zhuang",
  "pt": "zhuang",
  "ru": "чжуанский",
  "uk": "чжуанська",
  "ar": "الجوانغ",
  "he": "ג'ואנג",
  "sw": "Kizhuang"
 }
};
  for (const [src, tr] of Object.entries(F)) for (const [lang, v] of Object.entries(tr)) {
    if (!META_I18N[lang]) META_I18N[lang] = {};
    if (!(src in META_I18N[lang]) || META_I18N[lang][src] === src) META_I18N[lang][src] = v;
  }
})();

// r26: speaker-count notes (meta.speakerCount.notes, 351 rows) were English in
// every UI. Whole-value entries, read directly by the Word Map panel; an
// existing entry wins.
(function () {
  if (typeof META_I18N === 'undefined') return;
  const F = {"+heritage learners": {"ja": "+継承語学習者", "ko": "+계승어 학습자", "zh": "+传承语学习者", "yue": "+傳承語學習者", "vi": "+người học ngôn ngữ di sản", "th": "+ผู้เรียนภาษามรดก", "id": "+pelajar warisan", "hi": "+विरासत शिक्षार्थी", "de": "+Herkunftssprachler", "fr": "+apprenants d'héritage", "it": "+apprendenti di lingua ereditaria", "es": "+aprendices de herencia", "pt": "+aprendizes de herança", "ru": "+изучающие язык наследия", "uk": "+ті, хто вивчає мову предків", "ar": "+متعلمو لغة التراث", "he": "+לומדי שפת מורשת", "sw": "+wanafunzi wa lugha ya urithi"}, "+~150 partial speakers": {"ja": "+約150人の部分話者", "ko": "+부분 화자 약 150명", "zh": "+约150名部分掌握者", "yue": "+約150名部分掌握者", "vi": "+~150 người nói một phần", "th": "+ผู้พูดได้บางส่วน ~150 คน", "id": "+~150 penutur parsial", "hi": "+~150 आंशिक वक्ता", "de": "+~150 Teilsprecher", "fr": "+~150 locuteurs partiels", "it": "+~150 parlanti parziali", "es": "+~150 hablantes parciales", "pt": "+~150 falantes parciais", "ru": "+~150 частичных носителей", "uk": "+~150 часткових мовців", "ar": "+~150 متحدثًا جزئيًا", "he": "+~150 דוברים חלקיים", "sw": "+wazungumzaji kiasi ~150"}, "+~3K partial speakers": {"ja": "+約3,000人の部分話者", "ko": "+부분 화자 약 3,000명", "zh": "+约3000名部分掌握者", "yue": "+約3,000名部分掌握者", "vi": "+~3K người nói một phần", "th": "+ผู้พูดได้บางส่วน ~3K คน", "id": "+~3 rb penutur parsial", "hi": "+~3K आंशिक वक्ता", "de": "+~3.000 Teilsprecher", "fr": "+~3 000 locuteurs partiels", "it": "+~3.000 parlanti parziali", "es": "+~3000 hablantes parciales", "pt": "+~3 mil falantes parciais", "ru": "+~3 тыс. частичных носителей", "uk": "+~3 тис. часткових мовців", "ar": "+~3 آلاف متحدث جزئي", "he": "+~3,000 דוברים חלקיים", "sw": "+wazungumzaji kiasi elfu ~3"}, "+~3K partial; ~10K ethnic Sakizaya": {"ja": "+部分話者約3,000人；サキザヤ族約1万人", "ko": "+부분 화자 약 3,000명; 사키자야족 약 1만 명", "zh": "+部分掌握者约3000人；撒奇莱雅族约1万人", "yue": "+部分掌握者約3,000人；撒奇萊雅族約1萬人", "vi": "+~3K người nói một phần; ~10K người dân tộc Sakizaya", "th": "+ผู้พูดได้บางส่วน ~3K; ชาวซากิซายา ~10K คน", "id": "+~3 rb parsial; ~10 rb etnis Sakizaya", "hi": "+~3K आंशिक; ~10K जातीय सकिज़ाया", "de": "+~3.000 Teilsprecher; ~10.000 ethnische Sakizaya", "fr": "+~3 000 partiels ; ~10 000 Sakizaya ethniques", "it": "+~3.000 parziali; ~10.000 Sakizaya etnici", "es": "+~3000 parciales; ~10 000 sakizaya étnicos", "pt": "+~3 mil parciais; ~10 mil sakizayas étnicos", "ru": "+~3 тыс. частичных; ~10 тыс. этнических сакизая", "uk": "+~3 тис. часткових; ~10 тис. етнічних сакізая", "ar": "+~3 آلاف جزئيًا؛ ~10 آلاف من الساكيزايا عرقيًا", "he": "+~3,000 חלקיים; ~10 אלף סאקיזאיה אתניים", "sw": "+kiasi elfu ~3; Wasakizaya elfu ~10 kwa asili"}, "+~500 partial speakers": {"ja": "+約500人の部分話者", "ko": "+부분 화자 약 500명", "zh": "+约500名部分掌握者", "yue": "+約500名部分掌握者", "vi": "+~500 người nói một phần", "th": "+ผู้พูดได้บางส่วน ~500 คน", "id": "+~500 penutur parsial", "hi": "+~500 आंशिक वक्ता", "de": "+~500 Teilsprecher", "fr": "+~500 locuteurs partiels", "it": "+~500 parlanti parziali", "es": "+~500 hablantes parciales", "pt": "+~500 falantes parciais", "ru": "+~500 частичных носителей", "uk": "+~500 часткових мовців", "ar": "+~500 متحدث جزئي", "he": "+~500 דוברים חלקיים", "sw": "+wazungumzaji kiasi ~500"}, "+~60 partial speakers": {"ja": "+約60人の部分話者", "ko": "+부분 화자 약 60명", "zh": "+约60名部分掌握者", "yue": "+約60名部分掌握者", "vi": "+~60 người nói một phần", "th": "+ผู้พูดได้บางส่วน ~60 คน", "id": "+~60 penutur parsial", "hi": "+~60 आंशिक वक्ता", "de": "+~60 Teilsprecher", "fr": "+~60 locuteurs partiels", "it": "+~60 parlanti parziali", "es": "+~60 hablantes parciales", "pt": "+~60 falantes parciais", "ru": "+~60 частичных носителей", "uk": "+~60 часткових мовців", "ar": "+~60 متحدثًا جزئيًا", "he": "+~60 דוברים חלקיים", "sw": "+wazungumzaji kiasi ~60"}, "13th-15th c.": {"ja": "13〜15世紀", "ko": "13~15세기", "zh": "13—15世纪", "yue": "13至15世紀", "vi": "thế kỷ 13–15", "th": "ศตวรรษที่ 13–15", "id": "abad ke-13–15", "hi": "13वीं-15वीं शताब्दी", "de": "13.–15. Jh.", "fr": "XIIIe-XVe s.", "it": "XIII-XV sec.", "es": "ss. XIII-XV", "pt": "séc. 13-15", "ru": "13-15 вв.", "uk": "13-15 ст.", "ar": "القرون 13-15", "he": "המאות ה-13-15", "sw": "karne ya 13-15"}, "1c. BCE - 668 CE": {"ja": "紀元前1世紀〜668年", "ko": "기원전 1세기~668년", "zh": "公元前1世纪—公元668年", "yue": "公元前1世紀至公元668年", "vi": "thế kỷ 1 TCN – năm 668 CN", "th": "ศตวรรษที่ 1 ก่อน ค.ศ. – ค.ศ. 668", "id": "abad ke-1 SM - 668 M", "hi": "पहली शताब्दी ई.पू. - 668 ई.", "de": "1. Jh. v. Chr. - 668 n. Chr.", "fr": "Ier s. av. J.-C. - 668 apr. J.-C.", "it": "I sec. a.C. - 668 d.C.", "es": "s. I a. C. - 668 d. C.", "pt": "séc. 1 a.C. - 668 d.C.", "ru": "1 в. до н. э. - 668 н. э.", "uk": "1 ст. до н. е. - 668 н. е.", "ar": "القرن 1 ق.م - 668 م", "he": "המאה ה-1 לפנה״ס - 668 לספירה", "sw": "karne ya 1 KK - 668 BK"}, "2011 Polish census self-identification": {"ja": "2011年ポーランド国勢調査の自己申告", "ko": "2011년 폴란드 인구조사 자기 신고", "zh": "2011年波兰人口普查自我认同", "yue": "2011年波蘭人口普查自我認同", "vi": "Tự khai trong điều tra dân số Ba Lan 2011", "th": "การระบุตนเองในสำมะโนประชากรโปแลนด์ปี 2011", "id": "identifikasi diri sensus Polandia 2011", "hi": "2011 पोलिश जनगणना में स्व-पहचान", "de": "Selbstangabe im polnischen Zensus 2011", "fr": "auto-identification au recensement polonais de 2011", "it": "autoidentificazione nel censimento polacco del 2011", "es": "autoidentificación en el censo polaco de 2011", "pt": "autoidentificação no censo polonês de 2011", "ru": "самоидентификация по переписи Польши 2011 г.", "uk": "самоідентифікація за переписом Польщі 2011 р.", "ar": "التعريف الذاتي في تعداد بولندا 2011", "he": "הזדהות עצמית במפקד פולין 2011", "sw": "utambulisho binafsi katika sensa ya Poland ya 2011"}, "5th-10th c. CE": {"ja": "5〜10世紀", "ko": "5~10세기", "zh": "公元5—10世纪", "yue": "公元5至10世紀", "vi": "thế kỷ 5–10 CN", "th": "ศตวรรษที่ 5–10", "id": "abad ke-5–10 M", "hi": "5वीं-10वीं शताब्दी ई.", "de": "5.–10. Jh. n. Chr.", "fr": "Ve-Xe s. apr. J.-C.", "it": "V-X sec. d.C.", "es": "ss. V-X d. C.", "pt": "séc. 5-10 d.C.", "ru": "5-10 вв. н. э.", "uk": "5-10 ст. н. е.", "ar": "القرون 5-10 م", "he": "המאות ה-5-10 לספירה", "sw": "karne ya 5-10 BK"}, "Active liturgical and pedagogical use throughout the Muslim world (~1.8B Muslims with varying competence); canonical recitation tradition": {"ja": "イスラム世界全域で典礼・教育に現用（ムスリム約18億人、習熟度はさまざま）；正統な読誦の伝統あり", "ko": "이슬람 세계 전역에서 전례·교육용으로 사용(무슬림 약 18억 명, 숙달도는 다양); 정통 낭송 전통", "zh": "在整个伊斯兰世界用于宗教礼仪与教学（约18亿穆斯林，掌握程度不一）；有正统诵读传统", "yue": "在整個伊斯蘭世界用於宗教禮儀與教學（約18億穆斯林，掌握程度不一）；有正統誦讀傳統", "vi": "Dùng tích cực trong nghi lễ và giáo dục khắp thế giới Hồi giáo (~1.8B tín đồ, mức thông thạo khác nhau); có truyền thống tụng đọc chuẩn mực", "th": "ใช้ในพิธีกรรมและการศึกษาทั่วโลกมุสลิม (มุสลิม ~1.8B คน ระดับความสามารถต่างกัน); มีขนบการอ่านทำนองตามแบบแผน", "id": "Digunakan aktif dalam liturgi dan pendidikan di seluruh dunia Islam (~1,8 miliar Muslim dengan kemampuan beragam); tradisi tilawah kanonik", "hi": "पूरे मुस्लिम जगत में सक्रिय धार्मिक और शैक्षिक उपयोग (~1.8B मुसलमान, विभिन्न दक्षता); प्रामाणिक पाठ (तिलावत) परंपरा", "de": "Aktive liturgische und didaktische Verwendung in der gesamten muslimischen Welt (~1,8 Mrd. Muslime mit unterschiedlicher Kompetenz); kanonische Rezitationstradition", "fr": "Usage liturgique et pédagogique actif dans tout le monde musulman (~1,8 Md de musulmans, compétence variable) ; tradition canonique de récitation", "it": "Uso liturgico e didattico attivo in tutto il mondo musulmano (~1,8 Mld di musulmani con competenza variabile); tradizione canonica di recitazione", "es": "Uso litúrgico y pedagógico activo en todo el mundo musulmán (~1800 M de musulmanes con competencia variable); tradición canónica de recitación", "pt": "Uso litúrgico e pedagógico ativo em todo o mundo muçulmano (~1,8 bi de muçulmanos, com competência variável); tradição canônica de recitação", "ru": "Активное литургическое и учебное употребление во всём мусульманском мире (~1,8 млрд мусульман с разным уровнем владения); каноническая традиция чтения", "uk": "Активне літургійне й навчальне вживання в усьому мусульманському світі (~1,8 млрд мусульман із різним рівнем володіння); канонічна традиція читання", "ar": "استخدام طقسي وتعليمي نشط في أنحاء العالم الإسلامي (~1.8 مليار مسلم بمستويات إتقان متفاوتة)؛ تقليد تلاوة معتمد", "he": "שימוש ליטורגי ולימודי פעיל בכל העולם המוסלמי (~1.8 מיליארד מוסלמים ברמות שליטה שונות); מסורת קריאה קנונית", "sw": "Matumizi hai ya ibada na ufundishaji kote katika ulimwengu wa Kiislamu (Waislamu bilioni ~1.8 wenye umahiri tofauti); mapokeo rasmi ya kughani"}, "Active pedagogical use in Japanese secondary schools (高校漢文 mandatory curriculum); hybrid reading tradition with no native speaker community": {"ja": "日本の高校で教育に現用（高校漢文は必修）；母語話者共同体を持たない混成的な訓読の伝統", "ko": "일본 고등학교에서 교육용으로 사용(고교 한문 필수 과정); 모어 화자 공동체가 없는 혼합 독법 전통", "zh": "在日本高中教学中使用（高中汉文为必修课程）；混合式训读传统，无母语群体", "yue": "在日本高中教學中使用（高中漢文為必修課程）；混合式訓讀傳統，無母語群體", "vi": "Dùng trong giáo dục trung học Nhật Bản (Hán văn là môn bắt buộc); truyền thống đọc lai, không có cộng đồng người bản ngữ", "th": "ใช้สอนในโรงเรียนมัธยมปลายญี่ปุ่น (คัมบุนเป็นวิชาบังคับ); ขนบการอ่านแบบผสม ไม่มีชุมชนเจ้าของภาษา", "id": "Digunakan aktif dalam pendidikan di sekolah menengah Jepang (kurikulum wajib 高校漢文); tradisi pembacaan hibrida tanpa komunitas penutur asli", "hi": "जापानी माध्यमिक विद्यालयों में सक्रिय शैक्षिक उपयोग (高校漢文 अनिवार्य पाठ्यक्रम); मिश्रित पठन परंपरा, कोई मूल वक्ता समुदाय नहीं", "de": "Aktive didaktische Verwendung an japanischen Oberschulen (Pflichtfach 高校漢文); hybride Lesetradition ohne muttersprachliche Gemeinschaft", "fr": "Usage pédagogique actif dans le secondaire japonais (programme obligatoire 高校漢文) ; tradition de lecture hybride sans communauté de locuteurs natifs", "it": "Uso didattico attivo nelle scuole secondarie giapponesi (curriculum obbligatorio 高校漢文); tradizione di lettura ibrida senza comunità di parlanti nativi", "es": "Uso pedagógico activo en la secundaria japonesa (currículo obligatorio 高校漢文); tradición de lectura híbrida sin comunidad de hablantes nativos", "pt": "Uso pedagógico ativo no ensino secundário japonês (高校漢文, currículo obrigatório); tradição de leitura híbrida sem comunidade de falantes nativos", "ru": "Активное учебное употребление в японских старших школах (高校漢文, обязательная программа); гибридная традиция чтения без сообщества носителей", "uk": "Активне навчальне вживання в японських старших школах (高校漢文, обов'язкова програма); гібридна традиція читання без спільноти носіїв", "ar": "استخدام تعليمي نشط في المدارس الثانوية اليابانية (高校漢文، منهج إلزامي)؛ تقليد قراءة هجين بلا مجتمع ناطقين أصليين", "he": "שימוש לימודי פעיל בבתי הספר התיכוניים ביפן (高校漢文, תוכנית חובה); מסורת קריאה היברידית ללא קהילת דוברים ילידיים", "sw": "Matumizi hai ya ufundishaji katika shule za sekondari za Japani (高校漢文, mtaala wa lazima); mapokeo mseto ya usomaji bila jamii ya wazawa"}, "Akan ~22M": {"ja": "アカン語 約2,200万", "ko": "아칸어 약 2,200만", "zh": "阿坎语约2200万", "yue": "阿坎語約2,200萬", "vi": "Tiếng Akan ~22M", "th": "ภาษาอาคาน ~22M", "id": "Akan ~22 jt", "hi": "अकान ~22M", "de": "Akan ~22 Mio.", "fr": "akan ~22 M", "it": "akan ~22 Mln", "es": "akan ~22 M", "pt": "Akan ~22 mi", "ru": "акан ~22 млн", "uk": "акан ~22 млн", "ar": "الأكان ~22 مليون", "he": "אקאן ~22 מיליון", "sw": "Kiakan milioni ~22"}, "Alta Verapaz + Baja Verapaz Guatemala": {"ja": "グアテマラのアルタ・ベラパス＋バハ・ベラパス", "ko": "과테말라 알타베라파스 + 바하베라파스", "zh": "危地马拉上韦拉帕斯省+下韦拉帕斯省", "yue": "危地馬拉上韋拉帕斯省+下韋拉帕斯省", "vi": "Alta Verapaz + Baja Verapaz, Guatemala", "th": "อัลตาเบราปัซ + บาฮาเบราปัซ กัวเตมาลา", "id": "Alta Verapaz + Baja Verapaz, Guatemala", "hi": "आल्ता वेरापाज़ + बाहा वेरापाज़, ग्वाटेमाला", "de": "Alta Verapaz + Baja Verapaz, Guatemala", "fr": "Alta Verapaz + Baja Verapaz, Guatemala", "it": "Alta Verapaz + Baja Verapaz, Guatemala", "es": "Alta Verapaz + Baja Verapaz, Guatemala", "pt": "Alta Verapaz + Baja Verapaz, Guatemala", "ru": "Альта-Верапас + Баха-Верапас, Гватемала", "uk": "Альта-Верапас + Баха-Верапас, Гватемала", "ar": "ألتا فيراباز + باخا فيراباز، غواتيمالا", "he": "אלטה ורפאס + באחה ורפאס, גואטמלה", "sw": "Alta Verapaz + Baja Verapaz, Guatemala"}, "Bikolano languages": {"ja": "ビコール諸語", "ko": "비콜어군", "zh": "比科尔诸语言", "yue": "比科爾諸語言", "vi": "Các ngôn ngữ Bikol", "th": "กลุ่มภาษาบิกอล", "id": "bahasa-bahasa Bikol", "hi": "बिकोल भाषाएँ", "de": "Bikol-Sprachen", "fr": "langues bikol", "it": "lingue bicol", "es": "lenguas bicolanas", "pt": "línguas bicol", "ru": "бикольские языки", "uk": "бікольські мови", "ar": "لغات البيكول", "he": "שפות ביקול", "sw": "lugha za Kibikol"}, "Brazil ~6K + Colombia/Venezuela border populations": {"ja": "ブラジル約6,000＋コロンビア・ベネズエラ国境地帯の住民", "ko": "브라질 약 6,000 + 콜롬비아·베네수엘라 국경 지역 인구", "zh": "巴西约6000+哥伦比亚/委内瑞拉边境人口", "yue": "巴西約6,000+哥倫比亞／委內瑞拉邊境人口", "vi": "Brazil ~6K + cư dân vùng biên Colombia/Venezuela", "th": "บราซิล ~6K + ประชากรชายแดนโคลอมเบีย/เวเนซุเอลา", "id": "Brasil ~6 rb + populasi perbatasan Kolombia/Venezuela", "hi": "ब्राज़ील ~6K + कोलंबिया/वेनेज़ुएला सीमा आबादी", "de": "Brasilien ~6.000 + Grenzbevölkerung Kolumbien/Venezuela", "fr": "Brésil ~6 000 + populations frontalières Colombie/Venezuela", "it": "Brasile ~6.000 + popolazioni di confine Colombia/Venezuela", "es": "Brasil ~6000 + poblaciones fronterizas de Colombia/Venezuela", "pt": "Brasil ~6 mil + populações na fronteira Colômbia/Venezuela", "ru": "Бразилия ~6 тыс. + население пограничья Колумбии/Венесуэлы", "uk": "Бразилія ~6 тис. + населення прикордоння Колумбії/Венесуели", "ar": "البرازيل ~6 آلاف + سكان الحدود مع كولومبيا/فنزويلا", "he": "ברזיל ~6,000 + אוכלוסיות בגבול קולומביה/ונצואלה", "sw": "Brazil elfu ~6 + wakazi wa mpakani Kolombia/Venezuela"}, "Brazilian-population L1 estimate; comprises ~95% of global Portuguese L1": {"ja": "ブラジル人口に基づく母語話者推計；世界のポルトガル語母語話者の約95%", "ko": "브라질 인구 기준 모어 화자 추정; 전 세계 포르투갈어 모어 화자의 약 95%", "zh": "基于巴西人口的母语人数估计；约占全球葡萄牙语母语者的95%", "yue": "基於巴西人口的母語人數估計；約佔全球葡萄牙語母語者的95%", "vi": "Ước tính người nói tiếng mẹ đẻ theo dân số Brazil; chiếm ~95% người nói tiếng Bồ Đào Nha như tiếng mẹ đẻ toàn cầu", "th": "ประมาณการผู้พูดภาษาแม่ตามประชากรบราซิล; คิดเป็น ~95% ของผู้พูดภาษาโปรตุเกสเป็นภาษาแม่ทั่วโลก", "id": "Perkiraan L1 populasi Brasil; ~95% dari L1 Portugis global", "hi": "ब्राज़ीली आबादी का L1 अनुमान; वैश्विक पुर्तगाली L1 का ~95%", "de": "L1-Schätzung für Brasilien; ~95 % der weltweiten portugiesischen L1", "fr": "Estimation L1 de la population brésilienne ; ~95 % des L1 du portugais dans le monde", "it": "Stima L1 della popolazione brasiliana; ~95% dei parlanti L1 di portoghese nel mondo", "es": "Estimación L1 de la población brasileña; ~95 % del portugués L1 mundial", "pt": "estimativa de L1 da população brasileira; ~95% do L1 global do português", "ru": "оценка носителей (родной язык) в Бразилии; ~95% всех носителей португальского", "uk": "оцінка носіїв (рідна мова) у Бразилії; ~95% усіх носіїв португальської", "ar": "تقدير اللغة الأم لسكان البرازيل؛ ~95% من الناطقين بالبرتغالية كلغة أم عالميًا", "he": "הערכת שפת אם לאוכלוסיית ברזיל; ~95% מדוברי הפורטוגזית כשפת אם בעולם", "sw": "makadirio ya L1 ya wakazi wa Brazil; ~95% ya L1 wa Kireno duniani"}, "Bungoma & Trans-Nzoia counties": {"ja": "ブンゴマ郡・トランスンゾイア郡", "ko": "붕고마·트랜스은조이아 카운티", "zh": "本戈马郡和特兰斯-恩佐亚郡", "yue": "本戈馬郡及特蘭斯-恩佐亞郡", "vi": "Hạt Bungoma & Trans-Nzoia", "th": "เทศมณฑลบุงโกมาและทรานส์-นโซยา", "id": "Kabupaten Bungoma & Trans-Nzoia", "hi": "बुंगोमा और ट्रांस-न्ज़ोइया काउंटी", "de": "Countys Bungoma & Trans-Nzoia", "fr": "comtés de Bungoma et Trans-Nzoia", "it": "contee di Bungoma e Trans-Nzoia", "es": "condados de Bungoma y Trans-Nzoia", "pt": "condados de Bungoma e Trans-Nzoia", "ru": "округа Бунгома и Транс-Нзоя", "uk": "округи Бунгома і Транс-Нзоя", "ar": "مقاطعتا بونغوما وترانس نزويا", "he": "מחוזות בונגומה וטרנס-נזויה", "sw": "kaunti za Bungoma na Trans-Nzoia"}, "Cantonese pedagogical reading of Classical Chinese (Hong Kong secondary school 中國語文 curriculum); ~7M HK Cantonese speakers exposed via mandatory schooling": {"ja": "粤語による漢文の教育的音読（香港の中等教育「中國語文」課程）；義務教育を通じて香港の広東語話者約700万人が触れる", "ko": "광둥어 한문 교육 독법(홍콩 중등학교 中國語文 과정); 의무교육을 통해 홍콩 광둥어 화자 약 700만 명이 접함", "zh": "粤语文言文教学读音（香港中学“中国语文”课程）；约700万香港粤语使用者通过义务教育接触", "yue": "粵語文言文教學讀音（香港中學「中國語文」課程）；約700萬香港粵語使用者經義務教育接觸", "vi": "Cách đọc Hán văn bằng tiếng Quảng Đông trong giáo dục (chương trình 中國語文 trung học Hồng Kông); ~7M người nói tiếng Quảng Đông ở Hồng Kông tiếp xúc qua giáo dục bắt buộc", "th": "การอ่านภาษาจีนคลาสสิกด้วยภาษากวางตุ้งในการศึกษา (หลักสูตร 中國語文 มัธยมฮ่องกง); ผู้พูดกวางตุ้งในฮ่องกง ~7M คนได้เรียนผ่านการศึกษาภาคบังคับ", "id": "Pembacaan Tionghoa Klasik secara Kanton dalam pendidikan (kurikulum 中國語文 sekolah menengah Hong Kong); ~7 jt penutur Kanton HK terpapar lewat sekolah wajib", "hi": "शास्त्रीय चीनी का कैंटोनीज़ शैक्षिक पठन (हांगकांग माध्यमिक 中國語文 पाठ्यक्रम); ~7M हांगकांग कैंटोनीज़ वक्ता अनिवार्य शिक्षा से परिचित", "de": "Kantonesische Schullesung des klassischen Chinesisch (Hongkonger Sekundarlehrplan 中國語文); ~7 Mio. kantonesische Sprecher in HK über die Schulpflicht damit vertraut", "fr": "Lecture pédagogique cantonaise du chinois classique (programme 中國語文 du secondaire à Hong Kong) ; ~7 M de cantonophones de HK exposés via l'école obligatoire", "it": "Lettura didattica cantonese del cinese classico (curriculum 中國語文 delle secondarie di Hong Kong); ~7 Mln di parlanti cantonesi di HK esposti tramite la scuola dell'obbligo", "es": "Lectura pedagógica cantonesa del chino clásico (currículo 中國語文 de secundaria de Hong Kong); ~7 M de hablantes de cantonés de HK expuestos por la escolaridad obligatoria", "pt": "Leitura pedagógica cantonesa do chinês clássico (currículo 中國語文 do secundário de Hong Kong); ~7 mi de falantes de cantonês em HK expostos pelo ensino obrigatório", "ru": "Кантонское учебное чтение классического китайского (школьная программа 中國語文 в Гонконге); ~7 млн носителей кантонского в Гонконге знакомы с ним через обязательное обучение", "uk": "Кантонське навчальне читання класичної китайської (шкільна програма 中國語文 у Гонконгу); ~7 млн мовців кантонської в Гонконгу знайомі з нею через обов'язкове навчання", "ar": "قراءة تعليمية كانتونية للصينية الكلاسيكية (منهج 中國語文 الثانوي في هونغ كونغ)؛ ~7 ملايين متحدث بالكانتونية في هونغ كونغ يتعرضون لها عبر التعليم الإلزامي", "he": "קריאה לימודית קנטונזית של סינית קלאסית (תוכנית 中國語文 בתיכונים בהונג קונג); ~7 מיליון דוברי קנטונזית בהונג קונג נחשפים אליה בלימודי החובה", "sw": "Usomaji wa kufundishia wa Kichina cha Kale kwa Kikantoni (mtaala wa sekondari 中國語文 wa Hong Kong); wazungumzaji milioni ~7 wa Kikantoni wa Hong Kong hukifahamu kupitia elimu ya lazima"}, "China ~1.4M + Vietnam ~12K + Laos ~25K": {"ja": "中国約140万＋ベトナム約1万2,000＋ラオス約2万5,000", "ko": "중국 약 140만 + 베트남 약 1만 2,000 + 라오스 약 2만 5,000", "zh": "中国约140万+越南约1.2万+老挝约2.5万", "yue": "中國約140萬+越南約1.2萬+老撾約2.5萬", "vi": "Trung Quốc ~1.4M + Việt Nam ~12K + Lào ~25K", "th": "จีน ~1.4M + เวียดนาม ~12K + ลาว ~25K", "id": "Tiongkok ~1,4 jt + Vietnam ~12 rb + Laos ~25 rb", "hi": "चीन ~1.4M + वियतनाम ~12K + लाओस ~25K", "de": "China ~1,4 Mio. + Vietnam ~12.000 + Laos ~25.000", "fr": "Chine ~1,4 M + Viêt Nam ~12 000 + Laos ~25 000", "it": "Cina ~1,4 Mln + Vietnam ~12.000 + Laos ~25.000", "es": "China ~1,4 M + Vietnam ~12 000 + Laos ~25 000", "pt": "China ~1,4 mi + Vietnã ~12 mil + Laos ~25 mil", "ru": "Китай ~1,4 млн + Вьетнам ~12 тыс. + Лаос ~25 тыс.", "uk": "Китай ~1,4 млн + В'єтнам ~12 тис. + Лаос ~25 тис.", "ar": "الصين ~1.4 مليون + فيتنام ~12 ألف + لاوس ~25 ألف", "he": "סין ~1.4 מיליון + וייטנאם ~12 אלף + לאוס ~25 אלף", "sw": "China milioni ~1.4 + Vietnam elfu ~12 + Laos elfu ~25"}, "Classical French / Grand Siècle (17c.); historical literary form with active pedagogical use in French Lycée education for reading Racine/Molière/Corneille/La Fontaine": {"ja": "古典フランス語／グラン・シエクル（17世紀）；リセでラシーヌ、モリエール、コルネイユ、ラ・フォンテーヌを読むため教育に現用される歴史的文語", "ko": "고전 프랑스어/그랑 시에클(17세기); 리세에서 라신·몰리에르·코르네유·라퐁텐을 읽기 위해 교육에 쓰이는 역사적 문어", "zh": "古典法语／伟大世纪（17世纪）；历史文学语言，法国高中教学中用于阅读拉辛、莫里哀、高乃依、拉封丹", "yue": "古典法語／偉大世紀（17世紀）；歷史文學語言，法國高中教學中用於閱讀拉辛、莫里哀、高乃依、拉封丹", "vi": "Tiếng Pháp cổ điển / Grand Siècle (thế kỷ 17); dạng văn chương lịch sử, dùng trong giáo dục trung học Pháp để đọc Racine/Molière/Corneille/La Fontaine", "th": "ภาษาฝรั่งเศสคลาสสิก / กร็องซีแย็กล์ (ศตวรรษที่ 17); รูปภาษาวรรณกรรมในอดีตที่ใช้สอนในโรงเรียนมัธยมฝรั่งเศสเพื่ออ่านราซีน/มอลิแยร์/กอร์เนย์/ลา ฟงแตน", "id": "Prancis Klasik / Grand Siècle (abad ke-17); bentuk sastra historis yang aktif diajarkan di lycée Prancis untuk membaca Racine/Molière/Corneille/La Fontaine", "hi": "शास्त्रीय फ़्रेंच / ग्रां सिएक्ल (17वीं शताब्दी); ऐतिहासिक साहित्यिक रूप, रासीन/मोलियर/कॉर्नेय/ला फ़ॉन्तेन पढ़ने हेतु फ़्रांसीसी लीसे शिक्षा में सक्रिय शैक्षिक उपयोग", "de": "Klassisches Französisch / Grand Siècle (17. Jh.); historische Literaturform, im französischen Lycée aktiv gelehrt zur Lektüre von Racine/Molière/Corneille/La Fontaine", "fr": "Français classique / Grand Siècle (XVIIe s.) ; forme littéraire historique, enseignée au lycée pour lire Racine/Molière/Corneille/La Fontaine", "it": "Francese classico / Grand Siècle (XVII sec.); forma letteraria storica con uso didattico attivo nel lycée francese per leggere Racine/Molière/Corneille/La Fontaine", "es": "Francés clásico / Grand Siècle (s. XVII); forma literaria histórica con uso pedagógico activo en el liceo francés para leer a Racine/Molière/Corneille/La Fontaine", "pt": "Francês clássico / Grand Siècle (séc. 17); forma literária histórica com uso pedagógico ativo no liceu francês para ler Racine/Molière/Corneille/La Fontaine", "ru": "Классический французский / Великий век (17 в.); историческая литературная форма, активно изучаемая во французских лицеях для чтения Расина/Мольера/Корнеля/Лафонтена", "uk": "Класична французька / Великий вік (17 ст.); історична літературна форма, яку активно вивчають у французьких ліцеях для читання Расіна/Мольєра/Корнеля/Лафонтена", "ar": "الفرنسية الكلاسيكية / القرن العظيم (القرن 17)؛ شكل أدبي تاريخي يُدرَّس بنشاط في الليسيه الفرنسية لقراءة راسين/موليير/كورني/لافونتين", "he": "צרפתית קלאסית / המאה הגדולה (המאה ה-17); צורה ספרותית היסטורית הנלמדת בליצאום הצרפתי לקריאת רסין/מולייר/קורניי/לה פונטן", "sw": "Kifaransa cha Kale / Grand Siècle (karne ya 17); muundo wa kihistoria wa kifasihi unaofundishwa katika lycée za Ufaransa kusoma Racine/Molière/Corneille/La Fontaine"}, "Cross River + Akwa Ibom Nigeria; significant Cameroon border populations; historic SE Nigeria literary lingua franca": {"ja": "ナイジェリアのクロスリバー州＋アクワ・イボム州；カメルーン国境地帯にも多い；かつてのナイジェリア南東部の文語共通語", "ko": "나이지리아 크로스리버주 + 아콰이봄주; 카메룬 국경 지역에도 상당수; 과거 나이지리아 남동부의 문어 공통어", "zh": "尼日利亚克里斯河州+阿夸伊博姆州；喀麦隆边境亦有大量人口；历史上尼日利亚东南部的书面通用语", "yue": "尼日利亞克里斯河州+阿夸伊博姆州；喀麥隆邊境亦有大量人口；歷史上尼日利亞東南部的書面通用語", "vi": "Cross River + Akwa Ibom, Nigeria; nhiều cư dân vùng biên Cameroon; từng là ngôn ngữ chung văn chương ở đông nam Nigeria", "th": "รัฐครอสริเวอร์ + อักวาอิบอม ไนจีเรีย; มีประชากรจำนวนมากในชายแดนแคเมอรูน; อดีตภาษากลางทางวรรณกรรมของไนจีเรียตะวันออกเฉียงใต้", "id": "Cross River + Akwa Ibom, Nigeria; populasi perbatasan Kamerun yang signifikan; lingua franca sastra historis Nigeria tenggara", "hi": "क्रॉस रिवर + अक्वा इबोम, नाइजीरिया; कैमरून सीमा पर उल्लेखनीय आबादी; दक्षिण-पूर्व नाइजीरिया की ऐतिहासिक साहित्यिक संपर्क भाषा", "de": "Cross River + Akwa Ibom, Nigeria; bedeutende Grenzbevölkerung in Kamerun; historische literarische Verkehrssprache Südostnigerias", "fr": "Cross River + Akwa Ibom, Nigeria ; importantes populations frontalières au Cameroun ; ancienne lingua franca littéraire du sud-est du Nigeria", "it": "Cross River + Akwa Ibom, Nigeria; consistenti popolazioni di confine in Camerun; storica lingua franca letteraria della Nigeria sud-orientale", "es": "Cross River + Akwa Ibom, Nigeria; importantes poblaciones fronterizas en Camerún; histórica lengua franca literaria del sureste de Nigeria", "pt": "Cross River + Akwa Ibom, Nigéria; populações significativas na fronteira com Camarões; histórica língua franca literária do sudeste da Nigéria", "ru": "Кросс-Ривер + Аква-Ибом, Нигерия; значительное население в пограничье Камеруна; исторический литературный лингва франка юго-востока Нигерии", "uk": "Крос-Ривер + Аква-Ібом, Нігерія; значне населення в прикордонні Камеруну; історична літературна лінгва франка південного сходу Нігерії", "ar": "كروس ريفر + أكوا إيبوم، نيجيريا؛ سكان كثيرون على حدود الكاميرون؛ لغة مشتركة أدبية تاريخية لجنوب شرق نيجيريا", "he": "קרוס ריבר + אקווה איבום, ניגריה; אוכלוסיות ניכרות בגבול קמרון; לינגואה פרנקה ספרותית היסטורית של דרום-מזרח ניגריה", "sw": "Cross River + Akwa Ibom, Nigeria; wakazi wengi mpakani mwa Kamerun; lugha ya kihistoria ya mawasiliano ya kifasihi kusini-mashariki mwa Nigeria"}, "Czech Republic + diaspora": {"ja": "チェコ＋在外", "ko": "체코 + 해외 동포", "zh": "捷克+海外侨民", "yue": "捷克+海外僑民", "vi": "Séc + kiều dân", "th": "เช็กเกีย + ชุมชนพลัดถิ่น", "id": "Ceko + diaspora", "hi": "चेक गणराज्य + प्रवासी", "de": "Tschechien + Diaspora", "fr": "Tchéquie + diaspora", "it": "Repubblica Ceca + diaspora", "es": "Chequia + diáspora", "pt": "República Tcheca + diáspora", "ru": "Чехия + диаспора", "uk": "Чехія + діаспора", "ar": "التشيك + الشتات", "he": "צ׳כיה + תפוצות", "sw": "Ucheki + ughaibuni"}, "Early New High German / Luther-era German (1350-1650); historical literary form with active pedagogical use in German Reformation studies and literary education": {"ja": "初期新高ドイツ語／ルター時代のドイツ語（1350〜1650年）；宗教改革研究や文学教育に現用される歴史的文語", "ko": "초기 신고지 독일어/루터 시대 독일어(1350~1650년); 종교개혁 연구와 문학 교육에 쓰이는 역사적 문어", "zh": "早期新高地德语／路德时代德语（1350—1650年）；历史文学语言，用于宗教改革研究与文学教育", "yue": "早期新高地德語／路德時代德語（1350至1650年）；歷史文學語言，用於宗教改革研究與文學教育", "vi": "Tiếng Đức Thượng cận đại sớm / tiếng Đức thời Luther (1350–1650); dạng văn chương lịch sử, dùng trong nghiên cứu Cải cách Kháng nghị và giáo dục văn học", "th": "ภาษาเยอรมันสูงใหม่ตอนต้น / ภาษาเยอรมันยุคลูเทอร์ (1350–1650); รูปภาษาวรรณกรรมในอดีตที่ใช้ในการศึกษาการปฏิรูปศาสนาและวรรณคดี", "id": "Jerman Tinggi Baru Awal / era Luther (1350-1650); bentuk sastra historis yang aktif diajarkan dalam studi Reformasi Jerman dan pendidikan sastra", "hi": "आरंभिक नवीन उच्च जर्मन / लूथर-युगीन जर्मन (1350-1650); ऐतिहासिक साहित्यिक रूप, जर्मन धर्मसुधार अध्ययन और साहित्य शिक्षा में सक्रिय उपयोग", "de": "Frühneuhochdeutsch / Luther-Deutsch (1350-1650); historische Literaturform, aktiv gelehrt in der Reformationsforschung und im Literaturunterricht", "fr": "Premier nouveau haut-allemand / allemand de Luther (1350-1650) ; forme littéraire historique enseignée en études de la Réforme et en lettres", "it": "Alto tedesco protomoderno / tedesco di Lutero (1350-1650); forma letteraria storica con uso didattico attivo negli studi sulla Riforma e nell'educazione letteraria", "es": "Alto alemán moderno temprano / alemán de Lutero (1350-1650); forma literaria histórica con uso pedagógico activo en estudios de la Reforma y en la enseñanza literaria", "pt": "Alto-alemão moderno inicial / alemão da época de Lutero (1350-1650); forma literária histórica com uso pedagógico ativo em estudos da Reforma e no ensino de literatura", "ru": "Ранненововерхненемецкий / немецкий эпохи Лютера (1350-1650); историческая литературная форма, активно изучаемая в исследованиях Реформации и на уроках литературы", "uk": "Ранньонововерхньонімецька / німецька доби Лютера (1350-1650); історична літературна форма, яку активно вивчають у дослідженнях Реформації та на уроках літератури", "ar": "الألمانية العليا الحديثة المبكرة / ألمانية عصر لوثر (1350-1650)؛ شكل أدبي تاريخي يُدرَّس بنشاط في دراسات الإصلاح الديني والتعليم الأدبي", "he": "גרמנית עילית חדשה מוקדמת / גרמנית של תקופת לותר (1350-1650); צורה ספרותית היסטורית הנלמדת בחקר הרפורמציה ובחינוך הספרותי", "sw": "Kijerumani cha Juu cha Kisasa cha Awali / Kijerumani cha enzi ya Luther (1350-1650); muundo wa kihistoria wa kifasihi unaofundishwa katika masomo ya Matengenezo na fasihi"}, "Ethiopia ~25K + Kenya ~25K, with smaller populations in South Sudan": {"ja": "エチオピア約2万5,000＋ケニア約2万5,000、南スーダンにも少数", "ko": "에티오피아 약 2만 5,000 + 케냐 약 2만 5,000, 남수단에 소수", "zh": "埃塞俄比亚约2.5万+肯尼亚约2.5万，南苏丹另有少量", "yue": "埃塞俄比亞約2.5萬+肯尼亞約2.5萬，南蘇丹另有少量", "vi": "Ethiopia ~25K + Kenya ~25K, ít hơn ở Nam Sudan", "th": "เอธิโอเปีย ~25K + เคนยา ~25K และอีกเล็กน้อยในซูดานใต้", "id": "Etiopia ~25 rb + Kenya ~25 rb, populasi lebih kecil di Sudan Selatan", "hi": "इथियोपिया ~25K + केन्या ~25K, दक्षिण सूडान में छोटी आबादी", "de": "Äthiopien ~25.000 + Kenia ~25.000, kleinere Gruppen im Südsudan", "fr": "Éthiopie ~25 000 + Kenya ~25 000, plus petites populations au Soudan du Sud", "it": "Etiopia ~25.000 + Kenya ~25.000, popolazioni minori in Sud Sudan", "es": "Etiopía ~25 000 + Kenia ~25 000, poblaciones menores en Sudán del Sur", "pt": "Etiópia ~25 mil + Quênia ~25 mil, com populações menores no Sudão do Sul", "ru": "Эфиопия ~25 тыс. + Кения ~25 тыс., меньше — в Южном Судане", "uk": "Ефіопія ~25 тис. + Кенія ~25 тис., менше — у Південному Судані", "ar": "إثيوبيا ~25 ألف + كينيا ~25 ألف، وأعداد أقل في جنوب السودان", "he": "אתיופיה ~25 אלף + קניה ~25 אלף, ואוכלוסיות קטנות יותר בדרום סודן", "sw": "Ethiopia elfu ~25 + Kenya elfu ~25, na wachache Sudan Kusini"}, "European Portugal only; global Portuguese L1 ≈ 230M aggregated": {"ja": "ポルトガル本国のみ；世界のポルトガル語母語話者は合計≈2億3,000万", "ko": "포르투갈 본국만; 전 세계 포르투갈어 모어 화자 합계 ≈ 2억 3,000만", "zh": "仅限葡萄牙本土；全球葡萄牙语母语者合计≈2.3亿", "yue": "僅限葡萄牙本土；全球葡萄牙語母語者合計≈2.3億", "vi": "Chỉ Bồ Đào Nha; tổng người nói tiếng Bồ Đào Nha như tiếng mẹ đẻ toàn cầu ≈ 230M", "th": "เฉพาะโปรตุเกส; ผู้พูดภาษาโปรตุเกสเป็นภาษาแม่ทั่วโลกรวม ≈ 230M", "id": "Hanya Portugal Eropa; L1 Portugis global ≈ 230 jt (gabungan)", "hi": "केवल यूरोपीय पुर्तगाल; वैश्विक पुर्तगाली L1 ≈ 230M (कुल)", "de": "Nur europäisches Portugal; weltweite portugiesische L1 ≈ 230 Mio. (gesamt)", "fr": "Portugal européen seul ; L1 du portugais dans le monde ≈ 230 M (cumul)", "it": "Solo Portogallo europeo; L1 di portoghese nel mondo ≈ 230 Mln (aggregato)", "es": "Solo Portugal europeo; portugués L1 mundial ≈ 230 M (agregado)", "pt": "apenas Portugal europeu; L1 global do português ≈ 230 mi somado", "ru": "только Португалия; всего носителей португальского ≈ 230 млн", "uk": "лише Португалія; усього носіїв португальської ≈ 230 млн", "ar": "البرتغال الأوروبية فقط؛ مجموع الناطقين بالبرتغالية كلغة أم ≈ 230 مليون", "he": "פורטוגל האירופית בלבד; סך דוברי פורטוגזית כשפת אם ≈ 230 מיליון", "sw": "Ureno wa Ulaya pekee; jumla ya L1 wa Kireno duniani ≈ milioni 230"}, "Extinct": {"ja": "消滅", "ko": "소멸", "zh": "已消亡", "yue": "已消亡", "vi": "Đã tuyệt chủng", "th": "สูญแล้ว", "id": "Punah", "hi": "विलुप्त", "de": "Ausgestorben", "fr": "Éteinte", "it": "Estinta", "es": "Extinta", "pt": "Extinta", "ru": "Вымерший", "uk": "Вимерла", "ar": "منقرضة", "he": "נכחדה", "sw": "Imetoweka"}, "Extinct as L1; Zoroastrian liturgical": {"ja": "母語としては消滅；ゾロアスター教の典礼語", "ko": "모어로는 소멸; 조로아스터교 전례어", "zh": "作为母语已消亡；琐罗亚斯德教礼仪语言", "yue": "作為母語已消亡；瑣羅亞斯德教禮儀語言", "vi": "Đã tuyệt chủng như tiếng mẹ đẻ; ngôn ngữ nghi lễ Hỏa giáo", "th": "สูญแล้วในฐานะภาษาแม่; ภาษาพิธีกรรมของศาสนาโซโรอัสเตอร์", "id": "Punah sebagai L1; liturgi Zoroaster", "hi": "L1 के रूप में विलुप्त; पारसी धार्मिक उपयोग", "de": "Als L1 ausgestorben; zoroastrische Liturgie", "fr": "Éteinte en L1 ; liturgie zoroastrienne", "it": "Estinta come L1; liturgica zoroastriana", "es": "Extinta como L1; litúrgica zoroástrica", "pt": "Extinta como L1; litúrgica zoroastriana", "ru": "Вымер как родной; литургический у зороастрийцев", "uk": "Вимерла як рідна; літургійна в зороастрійців", "ar": "منقرضة كلغة أم؛ طقسية زرادشتية", "he": "נכחדה כשפת אם; ליטורגית זורואסטרית", "sw": "Imetoweka kama L1; ya ibada ya Kizoroastria"}, "Extinct as L1; literary use in Bali Hindu-Buddhist tradition": {"ja": "母語としては消滅；バリのヒンドゥー・仏教伝統で文語として使用", "ko": "모어로는 소멸; 발리 힌두·불교 전통에서 문어로 사용", "zh": "作为母语已消亡；用于巴厘岛印度教—佛教传统文学", "yue": "作為母語已消亡；用於峇里島印度教—佛教傳統文學", "vi": "Đã tuyệt chủng như tiếng mẹ đẻ; dùng trong văn chương truyền thống Hindu-Phật giáo ở Bali", "th": "สูญแล้วในฐานะภาษาแม่; ใช้ทางวรรณกรรมในขนบฮินดู-พุทธของบาหลี", "id": "Punah sebagai L1; dipakai dalam sastra tradisi Hindu-Buddha Bali", "hi": "L1 के रूप में विलुप्त; बाली हिंदू-बौद्ध परंपरा में साहित्यिक उपयोग", "de": "Als L1 ausgestorben; literarische Verwendung in der hindu-buddhistischen Tradition Balis", "fr": "Éteinte en L1 ; usage littéraire dans la tradition hindou-bouddhiste de Bali", "it": "Estinta come L1; uso letterario nella tradizione indù-buddhista di Bali", "es": "Extinta como L1; uso literario en la tradición hindú-budista de Bali", "pt": "Extinta como L1; uso literário na tradição hindu-budista de Bali", "ru": "Вымер как родной; литературное употребление в индуистско-буддийской традиции Бали", "uk": "Вимерла як рідна; літературне вживання в індуїстсько-буддійській традиції Балі", "ar": "منقرضة كلغة أم؛ استخدام أدبي في التقليد الهندوسي البوذي في بالي", "he": "נכחדה כשפת אם; שימוש ספרותי במסורת ההינדו-בודהיסטית של באלי", "sw": "Imetoweka kama L1; matumizi ya kifasihi katika mapokeo ya Kihindu-Kibudha ya Bali"}, "Extinct as L1; liturgical use in Zoroastrianism": {"ja": "母語としては消滅；ゾロアスター教で典礼に使用", "ko": "모어로는 소멸; 조로아스터교 전례에 사용", "zh": "作为母语已消亡；用于琐罗亚斯德教礼仪", "yue": "作為母語已消亡；用於瑣羅亞斯德教禮儀", "vi": "Đã tuyệt chủng như tiếng mẹ đẻ; dùng trong nghi lễ Hỏa giáo", "th": "สูญแล้วในฐานะภาษาแม่; ใช้ในพิธีกรรมของศาสนาโซโรอัสเตอร์", "id": "Punah sebagai L1; dipakai dalam liturgi Zoroastrianisme", "hi": "L1 के रूप में विलुप्त; पारसी धर्म में धार्मिक उपयोग", "de": "Als L1 ausgestorben; liturgische Verwendung im Zoroastrismus", "fr": "Éteinte en L1 ; usage liturgique dans le zoroastrisme", "it": "Estinta come L1; uso liturgico nello zoroastrismo", "es": "Extinta como L1; uso litúrgico en el zoroastrismo", "pt": "Extinta como L1; uso litúrgico no zoroastrismo", "ru": "Вымер как родной; литургическое употребление в зороастризме", "uk": "Вимерла як рідна; літургійне вживання в зороастризмі", "ar": "منقرضة كلغة أم؛ استخدام طقسي في الزرادشتية", "he": "נכחדה כשפת אם; שימוש ליטורגי בזורואסטריות", "sw": "Imetoweka kama L1; matumizi ya ibada katika Uzoroastria"}, "Finland": {"ja": "フィンランド", "ko": "핀란드", "zh": "芬兰", "yue": "芬蘭", "vi": "Phần Lan", "th": "ฟินแลนด์", "id": "Finlandia", "hi": "फ़िनलैंड", "de": "Finnland", "fr": "Finlande", "it": "Finlandia", "es": "Finlandia", "pt": "Finlândia", "ru": "Финляндия", "uk": "Фінляндія", "ar": "فنلندا", "he": "פינלנד", "sw": "Ufini"}, "Finland + diaspora": {"ja": "フィンランド＋在外", "ko": "핀란드 + 해외 동포", "zh": "芬兰+海外侨民", "yue": "芬蘭+海外僑民", "vi": "Phần Lan + kiều dân", "th": "ฟินแลนด์ + ชุมชนพลัดถิ่น", "id": "Finlandia + diaspora", "hi": "फ़िनलैंड + प्रवासी", "de": "Finnland + Diaspora", "fr": "Finlande + diaspora", "it": "Finlandia + diaspora", "es": "Finlandia + diáspora", "pt": "Finlândia + diáspora", "ru": "Финляндия + диаспора", "uk": "Фінляндія + діаспора", "ar": "فنلندا + الشتات", "he": "פינלנד + תפוצות", "sw": "Ufini + ughaibuni"}, "Golden Age Spanish / Siglo de Oro (1500-1681); historical literary form with active pedagogical use in Spanish literary education for reading Cervantes/Lope/Calderón/Quevedo": {"ja": "黄金世紀のスペイン語（1500〜1681年）；セルバンテス、ロペ、カルデロン、ケベードを読むため文学教育に現用される歴史的文語", "ko": "황금세기 스페인어(1500~1681년); 세르반테스·로페·칼데론·케베도를 읽기 위해 문학 교육에 쓰이는 역사적 문어", "zh": "黄金世纪西班牙语（1500—1681年）；历史文学语言，西班牙文学教育中用于阅读塞万提斯、洛佩、卡尔德隆、克维多", "yue": "黃金世紀西班牙語（1500至1681年）；歷史文學語言，西班牙文學教育中用於閱讀塞萬提斯、洛佩、卡爾德隆、克維多", "vi": "Tiếng Tây Ban Nha Thời kỳ Hoàng kim / Siglo de Oro (1500–1681); dạng văn chương lịch sử, dùng trong giáo dục văn học để đọc Cervantes/Lope/Calderón/Quevedo", "th": "ภาษาสเปนยุคทอง / Siglo de Oro (1500–1681); รูปภาษาวรรณกรรมในอดีตที่ใช้สอนวรรณคดีเพื่ออ่านเซร์บันเตส/โลเป/กัลเดรอน/เกเบโด", "id": "Spanyol Zaman Keemasan / Siglo de Oro (1500-1681); bentuk sastra historis yang aktif diajarkan untuk membaca Cervantes/Lope/Calderón/Quevedo", "hi": "स्वर्ण युग स्पेनिश / सिग्लो दे ओरो (1500-1681); ऐतिहासिक साहित्यिक रूप, सर्वान्तेस/लोपे/काल्देरोन/केवेदो पढ़ने हेतु स्पेनिश साहित्य शिक्षा में सक्रिय उपयोग", "de": "Spanisch des Siglo de Oro (1500-1681); historische Literaturform, im spanischen Literaturunterricht aktiv gelehrt zur Lektüre von Cervantes/Lope/Calderón/Quevedo", "fr": "Espagnol du Siècle d'or (1500-1681) ; forme littéraire historique enseignée pour lire Cervantes/Lope/Calderón/Quevedo", "it": "Spagnolo del Siglo de Oro (1500-1681); forma letteraria storica con uso didattico attivo per leggere Cervantes/Lope/Calderón/Quevedo", "es": "Español del Siglo de Oro (1500-1681); forma literaria histórica con uso pedagógico activo en la enseñanza para leer a Cervantes/Lope/Calderón/Quevedo", "pt": "Espanhol do Século de Ouro (1500-1681); forma literária histórica com uso pedagógico ativo no ensino de literatura espanhola para ler Cervantes/Lope/Calderón/Quevedo", "ru": "Испанский Золотого века (1500-1681); историческая литературная форма, активно изучаемая в испанском литературном образовании для чтения Сервантеса/Лопе/Кальдерона/Кеведо", "uk": "Іспанська Золотого віку (1500-1681); історична літературна форма, яку активно вивчають в іспанській літературній освіті для читання Сервантеса/Лопе/Кальдерона/Кеведо", "ar": "إسبانية العصر الذهبي (1500-1681)؛ شكل أدبي تاريخي يُدرَّس بنشاط في التعليم الأدبي الإسباني لقراءة ثربانتس/لوبي/كالديرون/كيفيدو", "he": "ספרדית של תור הזהב (1500-1681); צורה ספרותית היסטורית הנלמדת בחינוך הספרותי בספרד לקריאת סרוונטס/לופה/קלדרון/קבדו", "sw": "Kihispania cha Enzi ya Dhahabu (1500-1681); muundo wa kihistoria wa kifasihi unaofundishwa kusoma Cervantes/Lope/Calderón/Quevedo"}, "Greece + Cyprus + diaspora": {"ja": "ギリシャ＋キプロス＋在外", "ko": "그리스 + 키프로스 + 해외 동포", "zh": "希腊+塞浦路斯+海外侨民", "yue": "希臘+塞浦路斯+海外僑民", "vi": "Hy Lạp + Síp + kiều dân", "th": "กรีซ + ไซปรัส + ชุมชนพลัดถิ่น", "id": "Yunani + Siprus + diaspora", "hi": "ग्रीस + साइप्रस + प्रवासी", "de": "Griechenland + Zypern + Diaspora", "fr": "Grèce + Chypre + diaspora", "it": "Grecia + Cipro + diaspora", "es": "Grecia + Chipre + diáspora", "pt": "Grécia + Chipre + diáspora", "ru": "Греция + Кипр + диаспора", "uk": "Греція + Кіпр + діаспора", "ar": "اليونان + قبرص + الشتات", "he": "יוון + קפריסין + תפוצות", "sw": "Ugiriki + Kupro + ughaibuni"}, "Greece ~3K + North Macedonia ~2K; severely endangered; Council of Europe European Charter for Regional or Minority Languages classification": {"ja": "ギリシャ約3,000＋北マケドニア約2,000；重大な危険；欧州評議会「地域言語・少数言語のための欧州憲章」による分類", "ko": "그리스 약 3,000 + 북마케도니아 약 2,000; 심각한 위기; 유럽평의회 「지역어 또는 소수어에 관한 유럽 헌장」 분류", "zh": "希腊约3000+北马其顿约2000；严重危险；欧洲委员会《欧洲区域或少数民族语言宪章》分类", "yue": "希臘約3,000+北馬其頓約2,000；嚴重危險；歐洲委員會《歐洲區域或少數民族語言憲章》分類", "vi": "Hy Lạp ~3K + Bắc Macedonia ~2K; nguy cấp nghiêm trọng; phân loại theo Hiến chương châu Âu về Ngôn ngữ Khu vực hoặc Thiểu số của Hội đồng châu Âu", "th": "กรีซ ~3K + มาซิโดเนียเหนือ ~2K; ใกล้สูญหายอย่างรุนแรง; จัดประเภทตามกฎบัตรยุโรปว่าด้วยภาษาท้องถิ่นหรือภาษาชนกลุ่มน้อยของสภายุโรป", "id": "Yunani ~3 rb + Makedonia Utara ~2 rb; sangat terancam; klasifikasi Piagam Eropa Dewan Eropa untuk Bahasa Regional atau Minoritas", "hi": "ग्रीस ~3K + उत्तर मैसेडोनिया ~2K; गंभीर रूप से संकटग्रस्त; यूरोप परिषद के क्षेत्रीय या अल्पसंख्यक भाषाओं के यूरोपीय चार्टर का वर्गीकरण", "de": "Griechenland ~3.000 + Nordmazedonien ~2.000; ernsthaft gefährdet; Einstufung nach der Europäischen Charta der Regional- oder Minderheitensprachen (Europarat)", "fr": "Grèce ~3 000 + Macédoine du Nord ~2 000 ; sérieusement en danger ; classement de la Charte européenne des langues régionales ou minoritaires (Conseil de l'Europe)", "it": "Grecia ~3.000 + Macedonia del Nord ~2.000; gravemente in pericolo; classificazione della Carta europea delle lingue regionali o minoritarie (Consiglio d'Europa)", "es": "Grecia ~3000 + Macedonia del Norte ~2000; seriamente amenazada; clasificación de la Carta Europea de las Lenguas Regionales o Minoritarias (Consejo de Europa)", "pt": "Grécia ~3 mil + Macedônia do Norte ~2 mil; severamente ameaçada; classificação da Carta Europeia das Línguas Regionais ou Minoritárias do Conselho da Europa", "ru": "Греция ~3 тыс. + Северная Македония ~2 тыс.; в серьёзной опасности; классификация Европейской хартии региональных языков или языков меньшинств Совета Европы", "uk": "Греція ~3 тис. + Північна Македонія ~2 тис.; у серйозній небезпеці; класифікація Європейської хартії регіональних мов або мов меншин Ради Європи", "ar": "اليونان ~3 آلاف + مقدونيا الشمالية ~2 ألف؛ مهددة بشدة؛ تصنيف الميثاق الأوروبي للغات الإقليمية أو لغات الأقليات لمجلس أوروبا", "he": "יוון ~3,000 + צפון מקדוניה ~2,000; בסכנה חמורה; סיווג האמנה האירופית לשפות אזוריות או של מיעוטים של מועצת אירופה", "sw": "Ugiriki elfu ~3 + Makedonia Kaskazini elfu ~2; hatarini sana; uainishaji wa Mkataba wa Ulaya wa Lugha za Kikanda au za Wachache wa Baraza la Ulaya"}, "Guatemala + significant USA diaspora": {"ja": "グアテマラ＋米国に多数の在外者", "ko": "과테말라 + 미국에 상당수 이주민", "zh": "危地马拉+美国大量侨民", "yue": "危地馬拉+美國大量僑民", "vi": "Guatemala + cộng đồng kiều dân đáng kể ở Mỹ", "th": "กัวเตมาลา + ชุมชนพลัดถิ่นจำนวนมากในสหรัฐฯ", "id": "Guatemala + diaspora signifikan di AS", "hi": "ग्वाटेमाला + अमेरिका में उल्लेखनीय प्रवासी", "de": "Guatemala + bedeutende Diaspora in den USA", "fr": "Guatemala + importante diaspora aux États-Unis", "it": "Guatemala + consistente diaspora negli USA", "es": "Guatemala + importante diáspora en EE. UU.", "pt": "Guatemala + diáspora significativa nos EUA", "ru": "Гватемала + значительная диаспора в США", "uk": "Гватемала + значна діаспора в США", "ar": "غواتيمالا + شتات كبير في الولايات المتحدة", "he": "גואטמלה + תפוצה גדולה בארה״ב", "sw": "Guatemala + ughaibuni mkubwa Marekani"}, "Historical literary form (Classical Armenian / Grabar, 5c.-12c. CE); active liturgical use in Armenian Apostolic and Armenian Catholic Churches": {"ja": "歴史的文語（古典アルメニア語／グラバル、5〜12世紀）；アルメニア使徒教会とアルメニア・カトリック教会で典礼に現用", "ko": "역사적 문어(고전 아르메니아어/그라바르, 5~12세기); 아르메니아 사도교회와 아르메니아 가톨릭교회에서 전례에 사용", "zh": "历史文学语言（古典亚美尼亚语／格拉巴尔语，公元5—12世纪）；仍用于亚美尼亚使徒教会和亚美尼亚天主教会礼仪", "yue": "歷史文學語言（古典亞美尼亞語／格拉巴爾語，公元5至12世紀）；仍用於亞美尼亞使徒教會及亞美尼亞天主教會禮儀", "vi": "Dạng văn chương lịch sử (tiếng Armenia cổ điển / Grabar, thế kỷ 5–12 CN); vẫn dùng trong nghi lễ của Giáo hội Tông truyền Armenia và Giáo hội Công giáo Armenia", "th": "รูปภาษาวรรณกรรมในอดีต (ภาษาอาร์มีเนียคลาสสิก / กราบาร์ ศตวรรษที่ 5–12); ยังใช้ในพิธีกรรมของคริสตจักรอาร์มีเนียอะพอสโทลิกและคริสตจักรคาทอลิกอาร์มีเนีย", "id": "Bentuk sastra historis (Armenia Klasik / Grabar, abad ke-5–12 M); dipakai aktif dalam liturgi Gereja Apostolik Armenia dan Gereja Katolik Armenia", "hi": "ऐतिहासिक साहित्यिक रूप (शास्त्रीय आर्मेनियाई / ग्राबार, 5वीं-12वीं शताब्दी ई.); आर्मेनियाई अपोस्टोलिक और आर्मेनियाई कैथोलिक चर्चों में सक्रिय धार्मिक उपयोग", "de": "Historische Literaturform (Klassisches Armenisch / Grabar, 5.–12. Jh. n. Chr.); aktive liturgische Verwendung in der Armenischen Apostolischen und der Armenisch-Katholischen Kirche", "fr": "Forme littéraire historique (arménien classique / grabar, Ve-XIIe s. apr. J.-C.) ; usage liturgique actif dans les Églises apostolique et catholique arméniennes", "it": "Forma letteraria storica (armeno classico / grabar, V-XII sec. d.C.); uso liturgico attivo nella Chiesa apostolica armena e nella Chiesa armeno-cattolica", "es": "Forma literaria histórica (armenio clásico / grabar, ss. V-XII d. C.); uso litúrgico activo en las Iglesias apostólica y católica armenias", "pt": "Forma literária histórica (armênio clássico / grabar, séc. 5-12 d.C.); uso litúrgico ativo nas Igrejas Apostólica Armênia e Católica Armênia", "ru": "Историческая литературная форма (классический армянский / грабар, 5-12 вв. н. э.); активное литургическое употребление в Армянской апостольской и Армянской католической церквях", "uk": "Історична літературна форма (класична вірменська / грабар, 5-12 ст. н. е.); активне літургійне вживання у Вірменській апостольській та Вірменській католицькій церквах", "ar": "شكل أدبي تاريخي (الأرمنية الكلاسيكية / غرابار، القرون 5-12 م)؛ استخدام طقسي نشط في الكنيستين الأرمنية الرسولية والأرمنية الكاثوليكية", "he": "צורה ספרותית היסטורית (ארמנית קלאסית / גראבאר, המאות ה-5-12 לספירה); שימוש ליטורגי פעיל בכנסייה הארמנית השליחית ובכנסייה הארמנית הקתולית", "sw": "Muundo wa kihistoria wa kifasihi (Kiarmenia cha Kale / Grabar, karne ya 5-12 BK); matumizi hai ya ibada katika Kanisa la Kitume la Armenia na Kanisa Katoliki la Armenia"}, "Historical literary form (Classical Persian, ~800-1500 CE; canonical pedagogical reading of Ferdowsi/Rumi/Hafez/Saadi throughout Iran/Afghanistan/Tajikistan)": {"ja": "歴史的文語（古典ペルシア語、約800〜1500年；イラン・アフガニスタン・タジキスタン全域でフェルドウスィー、ルーミー、ハーフェズ、サアディーを読む規範的教材）", "ko": "역사적 문어(고전 페르시아어, 약 800~1500년; 이란·아프가니스탄·타지키스탄 전역에서 페르도우시·루미·하페즈·사디를 읽는 정전 교육)", "zh": "历史文学语言（古典波斯语，约公元800—1500年；伊朗、阿富汗、塔吉克斯坦各地阅读菲尔多西、鲁米、哈菲兹、萨迪的经典教学）", "yue": "歷史文學語言（古典波斯語，約公元800至1500年；伊朗、阿富汗、塔吉克各地閱讀菲爾多西、魯米、哈菲茲、薩迪的經典教學）", "vi": "Dạng văn chương lịch sử (tiếng Ba Tư cổ điển, ~800–1500 CN; được dạy chuẩn mực để đọc Ferdowsi/Rumi/Hafez/Saadi khắp Iran/Afghanistan/Tajikistan)", "th": "รูปภาษาวรรณกรรมในอดีต (ภาษาเปอร์เซียคลาสสิก ราว ค.ศ. 800–1500; ใช้สอนอ่านเฟอร์โดซี/รูมี/ฮาฟิซ/ซาดีทั่วอิหร่าน/อัฟกานิสถาน/ทาจิกิสถาน)", "id": "Bentuk sastra historis (Persia Klasik, ~800-1500 M; bacaan kanonik Ferdowsi/Rumi/Hafez/Saadi di seluruh Iran/Afganistan/Tajikistan)", "hi": "ऐतिहासिक साहित्यिक रूप (शास्त्रीय फ़ारसी, ~800-1500 ई.; ईरान/अफ़ग़ानिस्तान/ताजिकिस्तान में फ़िरदौसी/रूमी/हाफ़िज़/सादी का प्रामाणिक शैक्षिक पठन)", "de": "Historische Literaturform (Klassisches Persisch, ~800-1500 n. Chr.; kanonische Schullektüre von Firdausi/Rumi/Hafis/Saadi in Iran/Afghanistan/Tadschikistan)", "fr": "Forme littéraire historique (persan classique, ~800-1500 apr. J.-C. ; lecture canonique de Ferdowsi/Rûmî/Hâfez/Saadi en Iran/Afghanistan/Tadjikistan)", "it": "Forma letteraria storica (persiano classico, ~800-1500 d.C.; lettura didattica canonica di Firdusi/Rumi/Hafez/Sa'di in Iran/Afghanistan/Tagikistan)", "es": "Forma literaria histórica (persa clásico, ~800-1500 d. C.; lectura pedagógica canónica de Ferdousí/Rumi/Hafez/Saadi en Irán/Afganistán/Tayikistán)", "pt": "Forma literária histórica (persa clássico, ~800-1500 d.C.; leitura pedagógica canônica de Ferdusi/Rumi/Hafez/Saadi no Irã/Afeganistão/Tadjiquistão)", "ru": "Историческая литературная форма (классический персидский, ~800-1500 н. э.; каноническое учебное чтение Фирдоуси/Руми/Хафиза/Саади в Иране/Афганистане/Таджикистане)", "uk": "Історична літературна форма (класична перська, ~800-1500 н. е.; канонічне навчальне читання Фірдоусі/Румі/Гафіза/Сааді в Ірані/Афганістані/Таджикистані)", "ar": "شكل أدبي تاريخي (الفارسية الكلاسيكية، ~800-1500 م؛ قراءة تعليمية معتمدة للفردوسي/الرومي/حافظ/سعدي في إيران/أفغانستان/طاجيكستان)", "he": "צורה ספרותית היסטורית (פרסית קלאסית, ~800-1500 לספירה; קריאה לימודית קנונית של פירדוסי/רומי/חאפז/סעדי באיראן/אפגניסטן/טג׳יקיסטן)", "sw": "Muundo wa kihistoria wa kifasihi (Kiajemi cha Kale, ~800-1500 BK; usomaji rasmi wa kufundishia wa Ferdowsi/Rumi/Hafez/Saadi Iran/Afghanistan/Tajikistan)"}, "Historical literary form (Mishnaic Hebrew, ~70-200 CE); active scholarly/religious use in yeshivot for Talmud and Mishnah study": {"ja": "歴史的文語（ミシュナ・ヘブライ語、約70〜200年）；イェシーバーでタルムード・ミシュナ研究に学術・宗教的に現用", "ko": "역사적 문어(미슈나 히브리어, 약 70~200년); 예시바에서 탈무드·미슈나 연구에 학술·종교적으로 사용", "zh": "历史文学语言（密西拿希伯来语，约公元70—200年）；在犹太经学院中用于塔木德与密西拿研习", "yue": "歷史文學語言（密西拿希伯來語，約公元70至200年）；在猶太經學院中用於塔木德與密西拿研習", "vi": "Dạng văn chương lịch sử (tiếng Hebrew Mishnah, ~70–200 CN); dùng trong học thuật/tôn giáo tại các yeshiva để học Talmud và Mishnah", "th": "รูปภาษาวรรณกรรมในอดีต (ภาษาฮีบรูมิชนาห์ ราว ค.ศ. 70–200); ใช้ทางวิชาการ/ศาสนาในเยชิวาเพื่อศึกษาทัลมุดและมิชนาห์", "id": "Bentuk sastra historis (Ibrani Misnah, ~70-200 M); dipakai aktif secara ilmiah/keagamaan di yeshiva untuk studi Talmud dan Misnah", "hi": "ऐतिहासिक साहित्यिक रूप (मिश्नाई हिब्रू, ~70-200 ई.); तालमुद और मिश्ना अध्ययन हेतु येशिवाओं में सक्रिय विद्वत्/धार्मिक उपयोग", "de": "Historische Literaturform (Mischnisches Hebräisch, ~70-200 n. Chr.); aktive gelehrte/religiöse Verwendung in Jeschiwot für das Talmud- und Mischnastudium", "fr": "Forme littéraire historique (hébreu mishnique, ~70-200 apr. J.-C.) ; usage savant/religieux actif dans les yeshivot pour l'étude du Talmud et de la Mishna", "it": "Forma letteraria storica (ebraico mishnaico, ~70-200 d.C.); uso dotto/religioso attivo nelle yeshivot per lo studio di Talmud e Mishnah", "es": "Forma literaria histórica (hebreo misnaico, ~70-200 d. C.); uso erudito/religioso activo en las yeshivás para el estudio del Talmud y la Misná", "pt": "Forma literária histórica (hebraico mishnaico, ~70-200 d.C.); uso acadêmico/religioso ativo nas yeshivot para o estudo do Talmude e da Mishná", "ru": "Историческая литературная форма (мишнаитский иврит, ~70-200 н. э.); активное научное/религиозное употребление в ешивах для изучения Талмуда и Мишны", "uk": "Історична літературна форма (мішнаїтський іврит, ~70-200 н. е.); активне наукове/релігійне вживання в єшивах для вивчення Талмуду й Мішни", "ar": "شكل أدبي تاريخي (العبرية المشناوية، ~70-200 م)؛ استخدام علمي/ديني نشط في المدارس الدينية اليهودية لدراسة التلمود والمشناه", "he": "צורה ספרותית היסטורית (לשון חכמים, ~70-200 לספירה); שימוש לימודי/דתי פעיל בישיבות ללימוד תלמוד ומשנה", "sw": "Muundo wa kihistoria wa kifasihi (Kiebrania cha Mishna, ~70-200 BK); matumizi hai ya kitaaluma/kidini katika yeshiva kusoma Talmud na Mishna"}, "Historical literary form (Old Italian / Dantesque Tuscan, 13c.-14c.; canonical pedagogical reading of Dante/Petrarch/Boccaccio in Italian schools)": {"ja": "歴史的文語（古イタリア語／ダンテのトスカーナ語、13〜14世紀；イタリアの学校でダンテ、ペトラルカ、ボッカッチョを読む規範的教材）", "ko": "역사적 문어(고대 이탈리아어/단테의 토스카나어, 13~14세기; 이탈리아 학교에서 단테·페트라르카·보카치오를 읽는 정전 교육)", "zh": "历史文学语言（古意大利语／但丁托斯卡纳语，13—14世纪；意大利学校阅读但丁、彼特拉克、薄伽丘的经典教学）", "yue": "歷史文學語言（古意大利語／但丁托斯卡納語，13至14世紀；意大利學校閱讀但丁、彼特拉克、薄伽丘的經典教學）", "vi": "Dạng văn chương lịch sử (tiếng Ý cổ / tiếng Tuscan thời Dante, thế kỷ 13–14; được dạy chuẩn mực trong trường học Ý để đọc Dante/Petrarca/Boccaccio)", "th": "รูปภาษาวรรณกรรมในอดีต (ภาษาอิตาลีเก่า / ภาษาทัสคานีสมัยดันเต ศตวรรษที่ 13–14; ใช้สอนอ่านดันเต/เปตราร์กา/โบกัชโชในโรงเรียนอิตาลี)", "id": "Bentuk sastra historis (Italia Kuno / Toskana Dante, abad ke-13–14; bacaan kanonik Dante/Petrarca/Boccaccio di sekolah Italia)", "hi": "ऐतिहासिक साहित्यिक रूप (पुरानी इतालवी / दांते की तुस्कन, 13वीं-14वीं शताब्दी; इतालवी विद्यालयों में दांते/पेत्रार्क/बोकाच्चो का प्रामाणिक शैक्षिक पठन)", "de": "Historische Literaturform (Altitalienisch / Toskanisch Dantes, 13.–14. Jh.; kanonische Schullektüre von Dante/Petrarca/Boccaccio in Italien)", "fr": "Forme littéraire historique (ancien italien / toscan de Dante, XIIIe-XIVe s. ; lecture canonique de Dante/Pétrarque/Boccace à l'école italienne)", "it": "Forma letteraria storica (italiano antico / toscano dantesco, XIII-XIV sec.; lettura didattica canonica di Dante/Petrarca/Boccaccio nelle scuole italiane)", "es": "Forma literaria histórica (italiano antiguo / toscano de Dante, ss. XIII-XIV; lectura pedagógica canónica de Dante/Petrarca/Boccaccio en las escuelas italianas)", "pt": "Forma literária histórica (italiano antigo / toscano dantesco, séc. 13-14; leitura pedagógica canônica de Dante/Petrarca/Boccaccio nas escolas italianas)", "ru": "Историческая литературная форма (староитальянский / тосканский Данте, 13-14 вв.; каноническое учебное чтение Данте/Петрарки/Боккаччо в итальянских школах)", "uk": "Історична літературна форма (староіталійська / тосканська Данте, 13-14 ст.; канонічне навчальне читання Данте/Петрарки/Боккаччо в італійських школах)", "ar": "شكل أدبي تاريخي (الإيطالية القديمة / توسكانية دانتي، القرنان 13-14؛ قراءة تعليمية معتمدة لدانتي/بترارك/بوكاتشيو في المدارس الإيطالية)", "he": "צורה ספרותית היסטורית (איטלקית עתיקה / טוסקנית של דנטה, המאות ה-13-14; קריאה לימודית קנונית של דנטה/פטררקה/בוקאצ׳ו בבתי הספר באיטליה)", "sw": "Muundo wa kihistoria wa kifasihi (Kiitaliano cha Kale / Kitoskana cha Dante, karne ya 13-14; usomaji rasmi wa Dante/Petrarch/Boccaccio katika shule za Italia)"}, "Historical literary register (Katharevousa, official Greek 1834-1976, taught for reading 19c.-20c. Greek literature and ecclesiastical/legal texts)": {"ja": "歴史的文体（カサレヴサ、1834〜1976年の公用ギリシャ語；19〜20世紀のギリシャ文学や教会・法律文書を読むために教授）", "ko": "역사적 문체(카타레부사, 1834~1976년 그리스 공용어; 19~20세기 그리스 문학과 교회·법률 문서 독해를 위해 교육)", "zh": "历史书面语体（纯正希腊语，1834—1976年的官方希腊语；用于阅读19—20世纪希腊文学及教会、法律文献）", "yue": "歷史書面語體（純正希臘語，1834至1976年的官方希臘語；用於閱讀19至20世紀希臘文學及教會、法律文獻）", "vi": "Phong cách văn chương lịch sử (Katharevousa, tiếng Hy Lạp chính thức 1834–1976, được dạy để đọc văn học Hy Lạp thế kỷ 19–20 và văn bản giáo hội/pháp lý)", "th": "ระดับภาษาวรรณกรรมในอดีต (คาทาเรวูซา ภาษากรีกทางการ 1834–1976 สอนเพื่ออ่านวรรณกรรมกรีกศตวรรษที่ 19–20 และเอกสารทางศาสนา/กฎหมาย)", "id": "Ragam sastra historis (Katharevousa, bahasa resmi Yunani 1834-1976, diajarkan untuk membaca sastra Yunani abad ke-19–20 serta teks gerejawi/hukum)", "hi": "ऐतिहासिक साहित्यिक रजिस्टर (काथारेवूसा, आधिकारिक यूनानी 1834-1976, 19वीं-20वीं शताब्दी के यूनानी साहित्य और चर्च/विधिक ग्रंथ पढ़ने हेतु पढ़ाई जाती है)", "de": "Historisches Literaturregister (Katharevousa, griechische Amtssprache 1834-1976, gelehrt zur Lektüre griechischer Literatur des 19.–20. Jh. und kirchlicher/juristischer Texte)", "fr": "Registre littéraire historique (katharévousa, grec officiel 1834-1976, enseigné pour lire la littérature grecque des XIXe-XXe s. et les textes ecclésiastiques/juridiques)", "it": "Registro letterario storico (katharevousa, greco ufficiale 1834-1976, insegnato per leggere la letteratura greca del XIX-XX sec. e testi ecclesiastici/giuridici)", "es": "Registro literario histórico (katharévusa, griego oficial 1834-1976, enseñado para leer la literatura griega de los ss. XIX-XX y textos eclesiásticos/jurídicos)", "pt": "Registro literário histórico (katharevousa, grego oficial 1834-1976, ensinado para ler a literatura grega dos séc. 19-20 e textos eclesiásticos/jurídicos)", "ru": "Исторический литературный регистр (кафаревуса, официальный греческий 1834-1976, изучается для чтения греческой литературы 19-20 вв. и церковных/юридических текстов)", "uk": "Історичний літературний регістр (кафаревуса, офіційна грецька 1834-1976, вивчається для читання грецької літератури 19-20 ст. і церковних/юридичних текстів)", "ar": "سجل أدبي تاريخي (الكاثاريفوسا، اليونانية الرسمية 1834-1976، تُدرَّس لقراءة الأدب اليوناني في القرنين 19-20 والنصوص الكنسية/القانونية)", "he": "משלב ספרותי היסטורי (קתרבוסה, היוונית הרשמית 1834-1976, נלמדת לקריאת ספרות יוונית מהמאות ה-19-20 וטקסטים כנסייתיים/משפטיים)", "sw": "Rejista ya kihistoria ya kifasihi (Katharevousa, Kigiriki rasmi 1834-1976, hufundishwa kusoma fasihi ya Kigiriki ya karne ya 19-20 na maandishi ya kanisa/sheria)"}, "Historical stage (Shakespearean OP reconstruction taught for reading Shakespeare and the KJV)": {"ja": "歴史的段階（シェイクスピア時代の原音〈OP〉再建、シェイクスピアと欽定訳聖書を読むために教授）", "ko": "역사적 단계(셰익스피어 시대 원발음(OP) 재구, 셰익스피어와 흠정역 성경 독해를 위해 교육)", "zh": "历史阶段（莎士比亚原始发音〔OP〕重构，用于教学阅读莎士比亚和钦定版圣经）", "yue": "歷史階段（莎士比亞原始發音〔OP〕重構，用於教學閱讀莎士比亞及欽定版聖經）", "vi": "Giai đoạn lịch sử (phục dựng phát âm gốc (OP) thời Shakespeare, được dạy để đọc Shakespeare và Kinh Thánh KJV)", "th": "ช่วงทางประวัติศาสตร์ (การสร้างสำเนียงดั้งเดิม (OP) สมัยเชกสเปียร์ขึ้นใหม่ สอนเพื่ออ่านเชกสเปียร์และคัมภีร์ไบเบิลฉบับคิงเจมส์)", "id": "Tahap historis (rekonstruksi OP Shakespeare, diajarkan untuk membaca Shakespeare dan KJV)", "hi": "ऐतिहासिक चरण (शेक्सपियर का OP पुनर्निर्माण, शेक्सपियर और KJV पढ़ने हेतु पढ़ाया जाता है)", "de": "Historische Stufe (Shakespeare-OP-Rekonstruktion, gelehrt zur Lektüre Shakespeares und der KJV)", "fr": "Stade historique (reconstitution OP de Shakespeare, enseignée pour lire Shakespeare et la KJV)", "it": "Fase storica (ricostruzione OP shakespeariana, insegnata per leggere Shakespeare e la KJV)", "es": "Etapa histórica (reconstrucción OP de Shakespeare, enseñada para leer a Shakespeare y la KJV)", "pt": "Estágio histórico (reconstrução da pronúncia original de Shakespeare, ensinada para ler Shakespeare e a KJV)", "ru": "Исторический этап (реконструкция шекспировского оригинального произношения для чтения Шекспира и Библии короля Якова)", "uk": "Історичний етап (реконструкція шекспірівської оригінальної вимови для читання Шекспіра й Біблії короля Якова)", "ar": "مرحلة تاريخية (إعادة بناء النطق الأصلي لعصر شكسبير، تُدرَّس لقراءة شكسبير وترجمة الملك جيمس)", "he": "שלב היסטורי (שחזור ההגייה המקורית של שייקספיר, נלמד לקריאת שייקספיר ותרגום המלך ג׳יימס)", "sw": "Hatua ya kihistoria (matamshi asilia ya Shakespeare yaliyoundwa upya, hufundishwa kusoma Shakespeare na Biblia ya KJV)"}, "Hungary + ethnic-Hungarian minorities in Romania, Slovakia, Serbia": {"ja": "ハンガリー＋ルーマニア・スロバキア・セルビアのハンガリー系少数民族", "ko": "헝가리 + 루마니아·슬로바키아·세르비아의 헝가리계 소수민족", "zh": "匈牙利+罗马尼亚、斯洛伐克、塞尔维亚的匈牙利族少数群体", "yue": "匈牙利+羅馬尼亞、斯洛伐克、塞爾維亞的匈牙利族少數群體", "vi": "Hungary + thiểu số gốc Hungary ở Romania, Slovakia, Serbia", "th": "ฮังการี + ชนกลุ่มน้อยเชื้อสายฮังการีในโรมาเนีย สโลวาเกีย เซอร์เบีย", "id": "Hongaria + minoritas etnis Hongaria di Rumania, Slowakia, Serbia", "hi": "हंगरी + रोमानिया, स्लोवाकिया, सर्बिया में जातीय हंगेरियाई अल्पसंख्यक", "de": "Ungarn + ungarische Minderheiten in Rumänien, der Slowakei, Serbien", "fr": "Hongrie + minorités hongroises de Roumanie, Slovaquie, Serbie", "it": "Ungheria + minoranze ungheresi in Romania, Slovacchia, Serbia", "es": "Hungría + minorías húngaras en Rumanía, Eslovaquia, Serbia", "pt": "Hungria + minorias étnicas húngaras na Romênia, Eslováquia, Sérvia", "ru": "Венгрия + венгерские меньшинства в Румынии, Словакии, Сербии", "uk": "Угорщина + угорські меншини в Румунії, Словаччині, Сербії", "ar": "المجر + أقليات مجرية في رومانيا وسلوفاكيا وصربيا", "he": "הונגריה + מיעוטים הונגריים ברומניה, סלובקיה, סרביה", "sw": "Hungaria + jamii za Wahungaria Romania, Slovakia, Serbia"}, "Iraq ~30K, Iran ~10K, Syria/Lebanon ~50K + diaspora": {"ja": "イラク約3万、イラン約1万、シリア・レバノン約5万＋在外", "ko": "이라크 약 3만, 이란 약 1만, 시리아·레바논 약 5만 + 해외 동포", "zh": "伊拉克约3万，伊朗约1万，叙利亚/黎巴嫩约5万+海外侨民", "yue": "伊拉克約3萬，伊朗約1萬，敘利亞／黎巴嫩約5萬+海外僑民", "vi": "Iraq ~30K, Iran ~10K, Syria/Liban ~50K + kiều dân", "th": "อิรัก ~30K, อิหร่าน ~10K, ซีเรีย/เลบานอน ~50K + ชุมชนพลัดถิ่น", "id": "Irak ~30 rb, Iran ~10 rb, Suriah/Lebanon ~50 rb + diaspora", "hi": "इराक़ ~30K, ईरान ~10K, सीरिया/लेबनान ~50K + प्रवासी", "de": "Irak ~30.000, Iran ~10.000, Syrien/Libanon ~50.000 + Diaspora", "fr": "Irak ~30 000, Iran ~10 000, Syrie/Liban ~50 000 + diaspora", "it": "Iraq ~30.000, Iran ~10.000, Siria/Libano ~50.000 + diaspora", "es": "Irak ~30 000, Irán ~10 000, Siria/Líbano ~50 000 + diáspora", "pt": "Iraque ~30 mil, Irã ~10 mil, Síria/Líbano ~50 mil + diáspora", "ru": "Ирак ~30 тыс., Иран ~10 тыс., Сирия/Ливан ~50 тыс. + диаспора", "uk": "Ірак ~30 тис., Іран ~10 тис., Сирія/Ліван ~50 тис. + діаспора", "ar": "العراق ~30 ألف، إيران ~10 آلاف، سوريا/لبنان ~50 ألف + الشتات", "he": "עיראק ~30 אלף, איראן ~10 אלף, סוריה/לבנון ~50 אלף + תפוצות", "sw": "Iraq elfu ~30, Iran elfu ~10, Syria/Lebanon elfu ~50 + ughaibuni"}, "Israel + diaspora; nearly all are L1 (revived language)": {"ja": "イスラエル＋在外；ほぼ全員が母語話者（復興言語）", "ko": "이스라엘 + 해외 동포; 거의 모두 모어 화자(부활한 언어)", "zh": "以色列+海外侨民；几乎都是母语者（复兴语言）", "yue": "以色列+海外僑民；幾乎全是母語者（復興語言）", "vi": "Israel + kiều dân; gần như tất cả nói như tiếng mẹ đẻ (ngôn ngữ được hồi sinh)", "th": "อิสราเอล + ชุมชนพลัดถิ่น; เกือบทั้งหมดเป็นภาษาแม่ (ภาษาที่ฟื้นฟูขึ้นใหม่)", "id": "Israel + diaspora; hampir semuanya L1 (bahasa yang dihidupkan kembali)", "hi": "इज़राइल + प्रवासी; लगभग सभी L1 (पुनर्जीवित भाषा)", "de": "Israel + Diaspora; fast alle L1 (wiederbelebte Sprache)", "fr": "Israël + diaspora ; presque tous L1 (langue ressuscitée)", "it": "Israele + diaspora; quasi tutti L1 (lingua rivitalizzata)", "es": "Israel + diáspora; casi todos L1 (lengua revivida)", "pt": "Israel + diáspora; quase todos são L1 (língua revivida)", "ru": "Израиль + диаспора; почти все — родной язык (возрождённый язык)", "uk": "Ізраїль + діаспора; майже для всіх — рідна мова (відроджена мова)", "ar": "إسرائيل + الشتات؛ الجميع تقريبًا لغتهم الأم (لغة مُحياة)", "he": "ישראל + תפוצות; כמעט כולם דוברי שפת אם (שפה שהוחייתה)", "sw": "Israeli + ughaibuni; karibu wote ni L1 (lugha iliyofufuliwa)"}, "Kadazan + Dusun varieties combined": {"ja": "カダザン語＋ドゥスン語諸変種の合計", "ko": "카다잔어 + 두순어 변종 합계", "zh": "卡达山语+杜顺语各变体合计", "yue": "卡達山語+杜順語各變體合計", "vi": "Gộp các biến thể Kadazan + Dusun", "th": "รวมวิธภาษากาดาซัน + ดูซุน", "id": "Ragam Kadazan + Dusun digabung", "hi": "कदाज़ान + दुसुन रूप संयुक्त", "de": "Kadazan- + Dusun-Varietäten zusammen", "fr": "variétés kadazan + dusun combinées", "it": "varietà kadazan + dusun combinate", "es": "variedades kadazan + dusun combinadas", "pt": "variedades kadazan + dusun combinadas", "ru": "кадазанские + дусунские варианты вместе", "uk": "кадазанські + дусунські говірки разом", "ar": "تنوعات الكادازان + الدوسون مجتمعة", "he": "ניבי קדזאן + דוסון יחד", "sw": "lahaja za Kikadazan + Kidusun kwa pamoja"}, "L1 ~10K + L2 ~120K declining (total dominated by L2)": {"ja": "母語約1万＋第二言語約12万、減少中（合計の大半は第二言語）", "ko": "모어 약 1만 + 제2언어 약 12만, 감소 중(합계 대부분이 제2언어)", "zh": "母语约1万+第二语言约12万，持续减少（总数以第二语言为主）", "yue": "母語約1萬+第二語言約12萬，持續減少（總數以第二語言為主）", "vi": "Tiếng mẹ đẻ ~10K + ngôn ngữ thứ hai ~120K, đang giảm (tổng chủ yếu là ngôn ngữ thứ hai)", "th": "ภาษาแม่ ~10K + ภาษาที่สอง ~120K กำลังลดลง (ยอดรวมส่วนใหญ่เป็นภาษาที่สอง)", "id": "L1 ~10 rb + L2 ~120 rb menurun (total didominasi L2)", "hi": "L1 ~10K + L2 ~120K घटते हुए (कुल में L2 प्रमुख)", "de": "L1 ~10.000 + L2 ~120.000, rückläufig (Gesamtzahl überwiegend L2)", "fr": "L1 ~10 000 + L2 ~120 000 en déclin (total dominé par L2)", "it": "L1 ~10.000 + L2 ~120.000 in calo (totale dominato dalla L2)", "es": "L1 ~10 000 + L2 ~120 000 en declive (total dominado por L2)", "pt": "L1 ~10 mil + L2 ~120 mil em declínio (total dominado por L2)", "ru": "родной ~10 тыс. + второй язык ~120 тыс., сокращается (в сумме преобладает второй язык)", "uk": "рідна ~10 тис. + друга мова ~120 тис., скорочується (у сумі переважає друга мова)", "ar": "اللغة الأم ~10 آلاف + اللغة الثانية ~120 ألف متراجعة (يغلب على المجموع اللغة الثانية)", "he": "שפת אם ~10 אלף + שפה שנייה ~120 אלף בירידה (רוב הסך הוא שפה שנייה)", "sw": "L1 elfu ~10 + L2 elfu ~120 inayopungua (jumla inatawaliwa na L2)"}, "L1 ~10K; total ~200K incl. L2": {"ja": "母語約1万；第二言語を含め合計約20万", "ko": "모어 약 1만; 제2언어 포함 합계 약 20만", "zh": "母语约1万；含第二语言共约20万", "yue": "母語約1萬；連第二語言共約20萬", "vi": "Tiếng mẹ đẻ ~10K; tổng ~200K kể cả ngôn ngữ thứ hai", "th": "ภาษาแม่ ~10K; รวมภาษาที่สอง ~200K", "id": "L1 ~10 rb; total ~200 rb termasuk L2", "hi": "L1 ~10K; कुल ~200K, L2 सहित", "de": "L1 ~10.000; gesamt ~200.000 inkl. L2", "fr": "L1 ~10 000 ; total ~200 000 avec L2", "it": "L1 ~10.000; totale ~200.000 incl. L2", "es": "L1 ~10 000; total ~200 000 incl. L2", "pt": "L1 ~10 mil; total ~200 mil incl. L2", "ru": "родной ~10 тыс.; всего ~200 тыс. вкл. второй язык", "uk": "рідна ~10 тис.; усього ~200 тис. разом із другою мовою", "ar": "اللغة الأم ~10 آلاف؛ المجموع ~200 ألف مع اللغة الثانية", "he": "שפת אם ~10 אלף; סך הכול ~200 אלף כולל שפה שנייה", "sw": "L1 elfu ~10; jumla elfu ~200 pamoja na L2"}, "L1 ~20.8M (Central Thai); ~61M with L2": {"ja": "母語約2,080万（中部タイ語）；第二言語を含め約6,100万", "ko": "모어 약 2,080만(중부 타이어); 제2언어 포함 약 6,100만", "zh": "母语约2080万（中部泰语）；含第二语言约6100万", "yue": "母語約2,080萬（中部泰語）；連第二語言約6,100萬", "vi": "Tiếng mẹ đẻ ~20.8M (tiếng Thái miền Trung); ~61M kể cả ngôn ngữ thứ hai", "th": "ภาษาแม่ ~20.8M (ภาษาไทยกลาง); ~61M รวมภาษาที่สอง", "id": "L1 ~20,8 jt (Thai Tengah); ~61 jt dengan L2", "hi": "L1 ~20.8M (मध्य थाई); L2 सहित ~61M", "de": "L1 ~20,8 Mio. (Zentralthai); ~61 Mio. mit L2", "fr": "L1 ~20,8 M (thaï central) ; ~61 M avec L2", "it": "L1 ~20,8 Mln (thai centrale); ~61 Mln con L2", "es": "L1 ~20,8 M (tailandés central); ~61 M con L2", "pt": "L1 ~20,8 mi (tailandês central); ~61 mi com L2", "ru": "родной ~20,8 млн (центральнотайский); ~61 млн вкл. второй язык", "uk": "рідна ~20,8 млн (центральнотайська); ~61 млн разом із другою мовою", "ar": "اللغة الأم ~20.8 مليون (التايلاندية الوسطى)؛ ~61 مليون مع اللغة الثانية", "he": "שפת אם ~20.8 מיליון (תאית מרכזית); ~61 מיליון כולל שפה שנייה", "sw": "L1 milioni ~20.8 (Kithai cha Kati); milioni ~61 pamoja na L2"}, "L1 ~30K; L2 ~1.4M lingua franca": {"ja": "母語約3万；第二言語約140万（共通語）", "ko": "모어 약 3만; 제2언어 약 140만(공통어)", "zh": "母语约3万；第二语言约140万（通用语）", "yue": "母語約3萬；第二語言約140萬（通用語）", "vi": "Tiếng mẹ đẻ ~30K; ngôn ngữ thứ hai ~1.4M (ngôn ngữ chung)", "th": "ภาษาแม่ ~30K; ภาษาที่สอง ~1.4M (ภาษากลาง)", "id": "L1 ~30 rb; L2 ~1,4 jt lingua franca", "hi": "L1 ~30K; L2 ~1.4M संपर्क भाषा", "de": "L1 ~30.000; L2 ~1,4 Mio. (Verkehrssprache)", "fr": "L1 ~30 000 ; L2 ~1,4 M (lingua franca)", "it": "L1 ~30.000; L2 ~1,4 Mln (lingua franca)", "es": "L1 ~30 000; L2 ~1,4 M (lengua franca)", "pt": "L1 ~30 mil; L2 ~1,4 mi (língua franca)", "ru": "родной ~30 тыс.; второй язык ~1,4 млн (лингва франка)", "uk": "рідна ~30 тис.; друга мова ~1,4 млн (лінгва франка)", "ar": "اللغة الأم ~30 ألف؛ اللغة الثانية ~1.4 مليون (لغة مشتركة)", "he": "שפת אם ~30 אלף; שפה שנייה ~1.4 מיליון (לינגואה פרנקה)", "sw": "L1 elfu ~30; L2 milioni ~1.4 (lugha ya mawasiliano)"}, "L1 ~345M, ~609M with L2; with Urdu the shared Hindustani total is larger": {"ja": "母語約3億4,500万、第二言語を含め約6億900万；ウルドゥー語と合わせたヒンドゥスターニー語全体はさらに多い", "ko": "모어 약 3억 4,500만, 제2언어 포함 약 6억 900만; 우르두어를 합친 힌두스탄어 전체는 더 많음", "zh": "母语约3.45亿，含第二语言约6.09亿；与乌尔都语合计的印度斯坦语总数更多", "yue": "母語約3.45億，連第二語言約6.09億；與烏爾都語合計的印度斯坦語總數更多", "vi": "Tiếng mẹ đẻ ~345M, ~609M kể cả ngôn ngữ thứ hai; tính cả tiếng Urdu thì tổng tiếng Hindustan còn lớn hơn", "th": "ภาษาแม่ ~345M, ~609M รวมภาษาที่สอง; หากรวมภาษาอูรดู ยอดรวมภาษาฮินดูสถานีจะมากกว่านี้", "id": "L1 ~345 jt, ~609 jt dengan L2; bersama Urdu, total Hindustani lebih besar", "hi": "L1 ~345M, L2 सहित ~609M; उर्दू सहित साझा हिंदुस्तानी कुल अधिक है", "de": "L1 ~345 Mio., ~609 Mio. mit L2; mit Urdu ist die gemeinsame Hindustani-Zahl höher", "fr": "L1 ~345 M, ~609 M avec L2 ; avec l'ourdou, le total hindoustani est plus élevé", "it": "L1 ~345 Mln, ~609 Mln con L2; con l'urdu il totale hindustani è maggiore", "es": "L1 ~345 M, ~609 M con L2; con el urdu, el total indostánico es mayor", "pt": "L1 ~345 mi, ~609 mi com L2; somado ao urdu, o total do hindustâni é maior", "ru": "родной ~345 млн, ~609 млн вкл. второй язык; вместе с урду общий хиндустани больше", "uk": "рідна ~345 млн, ~609 млн разом із другою мовою; разом з урду загальна гіндустані більша", "ar": "اللغة الأم ~345 مليون، ~609 مليون مع اللغة الثانية؛ مع الأردية يكون مجموع الهندوستانية أكبر", "he": "שפת אם ~345 מיליון, ~609 מיליון כולל שפה שנייה; יחד עם אורדו סך ההינדוסטאנית גדול יותר", "sw": "L1 milioni ~345, milioni ~609 pamoja na L2; pamoja na Kiurdu jumla ya Kihindustani ni kubwa zaidi"}, "L1 ~600K; total ~3M incl. L2 lingua franca": {"ja": "母語約60万；共通語としての第二言語を含め合計約300万", "ko": "모어 약 60만; 공통어로서의 제2언어 포함 합계 약 300만", "zh": "母语约60万；含作为通用语的第二语言共约300万", "yue": "母語約60萬；連作為通用語的第二語言共約300萬", "vi": "Tiếng mẹ đẻ ~600K; tổng ~3M kể cả ngôn ngữ thứ hai (ngôn ngữ chung)", "th": "ภาษาแม่ ~600K; รวมภาษาที่สองในฐานะภาษากลาง ~3M", "id": "L1 ~600 rb; total ~3 jt termasuk L2 lingua franca", "hi": "L1 ~600K; कुल ~3M, L2 संपर्क भाषा सहित", "de": "L1 ~600.000; gesamt ~3 Mio. inkl. L2 (Verkehrssprache)", "fr": "L1 ~600 000 ; total ~3 M avec L2 (lingua franca)", "it": "L1 ~600.000; totale ~3 Mln incl. L2 (lingua franca)", "es": "L1 ~600 000; total ~3 M incl. L2 (lengua franca)", "pt": "L1 ~600 mil; total ~3 mi incl. L2 (língua franca)", "ru": "родной ~600 тыс.; всего ~3 млн вкл. второй язык (лингва франка)", "uk": "рідна ~600 тис.; усього ~3 млн разом із другою мовою (лінгва франка)", "ar": "اللغة الأم ~600 ألف؛ المجموع ~3 ملايين مع اللغة الثانية (لغة مشتركة)", "he": "שפת אם ~600 אלף; סך הכול ~3 מיליון כולל שפה שנייה (לינגואה פרנקה)", "sw": "L1 elfu ~600; jumla milioni ~3 pamoja na L2 (lugha ya mawasiliano)"}, "L1 ~75M; ~134M with L2": {"ja": "母語約7,500万；第二言語を含め約1億3,400万", "ko": "모어 약 7,500만; 제2언어 포함 약 1억 3,400만", "zh": "母语约7500万；含第二语言约1.34亿", "yue": "母語約7,500萬；連第二語言約1.34億", "vi": "Tiếng mẹ đẻ ~75M; ~134M kể cả ngôn ngữ thứ hai", "th": "ภาษาแม่ ~75M; ~134M รวมภาษาที่สอง", "id": "L1 ~75 jt; ~134 jt dengan L2", "hi": "L1 ~75M; L2 सहित ~134M", "de": "L1 ~75 Mio.; ~134 Mio. mit L2", "fr": "L1 ~75 M ; ~134 M avec L2", "it": "L1 ~75 Mln; ~134 Mln con L2", "es": "L1 ~75 M; ~134 M con L2", "pt": "L1 ~75 mi; ~134 mi com L2", "ru": "родной ~75 млн; ~134 млн вкл. второй язык", "uk": "рідна ~75 млн; ~134 млн разом із другою мовою", "ar": "اللغة الأم ~75 مليون؛ ~134 مليون مع اللغة الثانية", "he": "שפת אם ~75 מיליון; ~134 מיליון כולל שפה שנייה", "sw": "L1 milioni ~75; milioni ~134 pamoja na L2"}, "L1 ≈ 150M; total incl. L2 ≈ 255M (post-Soviet states)": {"ja": "母語≈1億5,000万；第二言語を含め合計≈2億5,500万（旧ソ連諸国）", "ko": "모어 ≈ 1억 5,000만; 제2언어 포함 합계 ≈ 2억 5,500만(구소련 국가)", "zh": "母语≈1.5亿；含第二语言共≈2.55亿（后苏联国家）", "yue": "母語≈1.5億；連第二語言共≈2.55億（前蘇聯國家）", "vi": "Tiếng mẹ đẻ ≈ 150M; tổng kể cả ngôn ngữ thứ hai ≈ 255M (các nước hậu Xô viết)", "th": "ภาษาแม่ ≈ 150M; รวมภาษาที่สอง ≈ 255M (รัฐหลังสหภาพโซเวียต)", "id": "L1 ≈ 150 jt; total termasuk L2 ≈ 255 jt (negara pasca-Soviet)", "hi": "L1 ≈ 150M; L2 सहित कुल ≈ 255M (सोवियत-उत्तर देश)", "de": "L1 ≈ 150 Mio.; gesamt inkl. L2 ≈ 255 Mio. (postsowjetische Staaten)", "fr": "L1 ≈ 150 M ; total avec L2 ≈ 255 M (États post-soviétiques)", "it": "L1 ≈ 150 Mln; totale incl. L2 ≈ 255 Mln (Stati post-sovietici)", "es": "L1 ≈ 150 M; total incl. L2 ≈ 255 M (Estados postsoviéticos)", "pt": "L1 ≈ 150 mi; total incl. L2 ≈ 255 mi (Estados pós-soviéticos)", "ru": "родной ≈ 150 млн; всего вкл. второй язык ≈ 255 млн (постсоветские государства)", "uk": "рідна ≈ 150 млн; усього разом із другою мовою ≈ 255 млн (пострадянські держави)", "ar": "اللغة الأم ≈ 150 مليون؛ المجموع مع اللغة الثانية ≈ 255 مليون (دول ما بعد الاتحاد السوفيتي)", "he": "שפת אם ≈ 150 מיליון; סך הכול כולל שפה שנייה ≈ 255 מיליון (המדינות הפוסט-סובייטיות)", "sw": "L1 ≈ milioni 150; jumla pamoja na L2 ≈ milioni 255 (nchi za baada ya Usovieti)"}, "L1 ≈ 380M; L2 ≈ 1.1B (the largest L2 community of any language)": {"ja": "母語≈3億8,000万；第二言語≈11億（全言語で最大の第二言語話者層）", "ko": "모어 ≈ 3억 8,000만; 제2언어 ≈ 11억(모든 언어 중 최대 제2언어 사용자층)", "zh": "母语≈3.8亿；第二语言≈11亿（所有语言中最大的第二语言群体）", "yue": "母語≈3.8億；第二語言≈11億（所有語言中最大的第二語言群體）", "vi": "Tiếng mẹ đẻ ≈ 380M; ngôn ngữ thứ hai ≈ 1.1B (cộng đồng ngôn ngữ thứ hai lớn nhất trong mọi ngôn ngữ)", "th": "ภาษาแม่ ≈ 380M; ภาษาที่สอง ≈ 1.1B (กลุ่มผู้พูดเป็นภาษาที่สองใหญ่ที่สุดในบรรดาทุกภาษา)", "id": "L1 ≈ 380 jt; L2 ≈ 1,1 miliar (komunitas L2 terbesar di antara semua bahasa)", "hi": "L1 ≈ 380M; L2 ≈ 1.1B (किसी भी भाषा का सबसे बड़ा L2 समुदाय)", "de": "L1 ≈ 380 Mio.; L2 ≈ 1,1 Mrd. (größte L2-Gemeinschaft aller Sprachen)", "fr": "L1 ≈ 380 M ; L2 ≈ 1,1 Md (plus grande communauté L2 de toutes les langues)", "it": "L1 ≈ 380 Mln; L2 ≈ 1,1 Mld (la più grande comunità L2 di qualsiasi lingua)", "es": "L1 ≈ 380 M; L2 ≈ 1100 M (la mayor comunidad L2 de cualquier lengua)", "pt": "L1 ≈ 380 mi; L2 ≈ 1,1 bi (a maior comunidade L2 de qualquer língua)", "ru": "родной ≈ 380 млн; второй язык ≈ 1,1 млрд (крупнейшее сообщество говорящих на втором языке среди всех языков)", "uk": "рідна ≈ 380 млн; друга мова ≈ 1,1 млрд (найбільша спільнота мовців другої мови серед усіх мов)", "ar": "اللغة الأم ≈ 380 مليون؛ اللغة الثانية ≈ 1.1 مليار (أكبر مجتمع متحدثين بها كلغة ثانية بين جميع اللغات)", "he": "שפת אם ≈ 380 מיליון; שפה שנייה ≈ 1.1 מיליארד (קהילת דוברי השפה השנייה הגדולה מכל שפה)", "sw": "L1 ≈ milioni 380; L2 ≈ bilioni 1.1 (jamii kubwa zaidi ya L2 kuliko lugha yoyote)"}, "L1 ≈ 65M with significant dialect-vs-standard estimation variance; total incl. L2 ≈ 85M": {"ja": "母語≈6,500万（方言と標準語の区別により推計に大きな幅）；第二言語を含め合計≈8,500万", "ko": "모어 ≈ 6,500만(방언·표준어 구분에 따라 추정치 편차 큼); 제2언어 포함 합계 ≈ 8,500만", "zh": "母语≈6500万（方言与标准语的划分导致估计差异较大）；含第二语言共≈8500万", "yue": "母語≈6,500萬（方言與標準語的劃分導致估計差異較大）；連第二語言共≈8,500萬", "vi": "Tiếng mẹ đẻ ≈ 65M (ước tính chênh lệch lớn tùy cách phân biệt phương ngữ/chuẩn); tổng kể cả ngôn ngữ thứ hai ≈ 85M", "th": "ภาษาแม่ ≈ 65M (ตัวเลขประมาณการต่างกันมากตามการแยกภาษาถิ่นกับภาษามาตรฐาน); รวมภาษาที่สอง ≈ 85M", "id": "L1 ≈ 65 jt dengan variasi perkiraan dialek-vs-standar yang besar; total termasuk L2 ≈ 85 jt", "hi": "L1 ≈ 65M, बोली बनाम मानक अनुमान में काफ़ी अंतर; L2 सहित कुल ≈ 85M", "de": "L1 ≈ 65 Mio., starke Schätzungsschwankung Dialekt vs. Standard; gesamt inkl. L2 ≈ 85 Mio.", "fr": "L1 ≈ 65 M, forte variance d'estimation dialecte/standard ; total avec L2 ≈ 85 M", "it": "L1 ≈ 65 Mln con forte variabilità di stima dialetto/standard; totale incl. L2 ≈ 85 Mln", "es": "L1 ≈ 65 M, con gran variación de estimación dialecto/estándar; total incl. L2 ≈ 85 M", "pt": "L1 ≈ 65 mi, com grande variação nas estimativas dialeto vs. padrão; total incl. L2 ≈ 85 mi", "ru": "родной ≈ 65 млн, оценки сильно зависят от разграничения диалектов и стандарта; всего вкл. второй язык ≈ 85 млн", "uk": "рідна ≈ 65 млн, оцінки сильно залежать від розмежування діалектів і стандарту; усього разом із другою мовою ≈ 85 млн", "ar": "اللغة الأم ≈ 65 مليون مع تفاوت كبير في التقديرات بين اللهجة والفصحى؛ المجموع مع اللغة الثانية ≈ 85 مليون", "he": "שפת אם ≈ 65 מיליון, עם שונות רבה בהערכות בין ניב לתקן; סך הכול כולל שפה שנייה ≈ 85 מיליון", "sw": "L1 ≈ milioni 65, makadirio yanatofautiana sana kati ya lahaja na sanifu; jumla pamoja na L2 ≈ milioni 85"}, "L1 ≈ 80M; L2 ≈ 240M (Africa francophonie + Europe)": {"ja": "母語≈8,000万；第二言語≈2億4,000万（アフリカのフランコフォニー＋欧州）", "ko": "모어 ≈ 8,000만; 제2언어 ≈ 2억 4,000만(아프리카 프랑스어권 + 유럽)", "zh": "母语≈8000万；第二语言≈2.4亿（非洲法语圈+欧洲）", "yue": "母語≈8,000萬；第二語言≈2.4億（非洲法語圈+歐洲）", "vi": "Tiếng mẹ đẻ ≈ 80M; ngôn ngữ thứ hai ≈ 240M (khối Pháp ngữ châu Phi + châu Âu)", "th": "ภาษาแม่ ≈ 80M; ภาษาที่สอง ≈ 240M (กลุ่มประเทศฟรังโกโฟนในแอฟริกา + ยุโรป)", "id": "L1 ≈ 80 jt; L2 ≈ 240 jt (frankofoni Afrika + Eropa)", "hi": "L1 ≈ 80M; L2 ≈ 240M (अफ़्रीकी फ़्रैंकोफ़ोनी + यूरोप)", "de": "L1 ≈ 80 Mio.; L2 ≈ 240 Mio. (afrikanische Frankophonie + Europa)", "fr": "L1 ≈ 80 M ; L2 ≈ 240 M (francophonie africaine + Europe)", "it": "L1 ≈ 80 Mln; L2 ≈ 240 Mln (francofonia africana + Europa)", "es": "L1 ≈ 80 M; L2 ≈ 240 M (francofonía africana + Europa)", "pt": "L1 ≈ 80 mi; L2 ≈ 240 mi (francofonia africana + Europa)", "ru": "родной ≈ 80 млн; второй язык ≈ 240 млн (франкоязычная Африка + Европа)", "uk": "рідна ≈ 80 млн; друга мова ≈ 240 млн (франкомовна Африка + Європа)", "ar": "اللغة الأم ≈ 80 مليون؛ اللغة الثانية ≈ 240 مليون (الفرنكوفونية الأفريقية + أوروبا)", "he": "שפת אם ≈ 80 מיליון; שפה שנייה ≈ 240 מיליון (אפריקה הפרנקופונית + אירופה)", "sw": "L1 ≈ milioni 80; L2 ≈ milioni 240 (Afrika ya Kifaransa + Ulaya)"}, "L1+L2 lingua franca of Maluku region": {"ja": "母語＋第二言語；マルク地方の共通語", "ko": "모어+제2언어; 말루쿠 지역 공통어", "zh": "母语+第二语言；马鲁古地区通用语", "yue": "母語+第二語言；馬魯古地區通用語", "vi": "Tiếng mẹ đẻ + ngôn ngữ thứ hai; ngôn ngữ chung vùng Maluku", "th": "ภาษาแม่ + ภาษาที่สอง; ภาษากลางของภูมิภาคมาลูกู", "id": "Lingua franca L1+L2 wilayah Maluku", "hi": "मालुकु क्षेत्र की L1+L2 संपर्क भाषा", "de": "L1+L2-Verkehrssprache der Molukken", "fr": "lingua franca L1+L2 des Moluques", "it": "lingua franca L1+L2 delle Molucche", "es": "lengua franca L1+L2 de las Molucas", "pt": "língua franca L1+L2 da região das Molucas", "ru": "лингва франка Молуккских островов (родной + второй язык)", "uk": "лінгва франка Молуккських островів (рідна + друга мова)", "ar": "لغة مشتركة (أم + ثانية) لمنطقة جزر الملوك", "he": "לינגואה פרנקה (שפת אם + שפה שנייה) של אזור מולוקו", "sw": "lugha ya mawasiliano ya L1+L2 ya eneo la Maluku"}, "L1+L2 lingua franca of North Maluku": {"ja": "母語＋第二言語；北マルクの共通語", "ko": "모어+제2언어; 북말루쿠 공통어", "zh": "母语+第二语言；北马鲁古通用语", "yue": "母語+第二語言；北馬魯古通用語", "vi": "Tiếng mẹ đẻ + ngôn ngữ thứ hai; ngôn ngữ chung Bắc Maluku", "th": "ภาษาแม่ + ภาษาที่สอง; ภาษากลางของมาลูกูเหนือ", "id": "Lingua franca L1+L2 Maluku Utara", "hi": "उत्तर मालुकु की L1+L2 संपर्क भाषा", "de": "L1+L2-Verkehrssprache der Nordmolukken", "fr": "lingua franca L1+L2 des Moluques du Nord", "it": "lingua franca L1+L2 delle Molucche Settentrionali", "es": "lengua franca L1+L2 de las Molucas Septentrionales", "pt": "língua franca L1+L2 das Molucas do Norte", "ru": "лингва франка Северного Малуку (родной + второй язык)", "uk": "лінгва франка Північного Малуку (рідна + друга мова)", "ar": "لغة مشتركة (أم + ثانية) لشمال الملوك", "he": "לינגואה פרנקה (שפת אם + שפה שנייה) של צפון מולוקו", "sw": "lugha ya mawasiliano ya L1+L2 ya Maluku Kaskazini"}, "L1: ~1K": {"ja": "母語：約1,000", "ko": "모어: 약 1,000", "zh": "母语：约1000", "yue": "母語：約1,000", "vi": "Tiếng mẹ đẻ: ~1K", "th": "ภาษาแม่: ~1K", "id": "L1: ~1 rb", "hi": "L1: ~1K", "de": "L1: ~1.000", "fr": "L1 : ~1 000", "it": "L1: ~1.000", "es": "L1: ~1000", "pt": "L1: ~1 mil", "ru": "родной: ~1 тыс.", "uk": "рідна: ~1 тис.", "ar": "اللغة الأم: ~1000", "he": "שפת אם: ~1,000", "sw": "L1: elfu ~1"}, "L1: ~70K": {"ja": "母語：約7万", "ko": "모어: 약 7만", "zh": "母语：约7万", "yue": "母語：約7萬", "vi": "Tiếng mẹ đẻ: ~70K", "th": "ภาษาแม่: ~70K", "id": "L1: ~70 rb", "hi": "L1: ~70K", "de": "L1: ~70.000", "fr": "L1 : ~70 000", "it": "L1: ~70.000", "es": "L1: ~70 000", "pt": "L1: ~70 mil", "ru": "родной: ~70 тыс.", "uk": "рідна: ~70 тис.", "ar": "اللغة الأم: ~70 ألف", "he": "שפת אם: ~70 אלף", "sw": "L1: elfu ~70"}, "L2/educational; not L1": {"ja": "第二言語・教育用；母語ではない", "ko": "제2언어/교육용; 모어 아님", "zh": "第二语言／教育用途；非母语", "yue": "第二語言／教育用途；非母語", "vi": "Ngôn ngữ thứ hai/giáo dục; không phải tiếng mẹ đẻ", "th": "ภาษาที่สอง/ใช้ในการศึกษา; ไม่ใช่ภาษาแม่", "id": "L2/pendidikan; bukan L1", "hi": "L2/शैक्षिक; L1 नहीं", "de": "L2/Bildungssprache; keine L1", "fr": "L2/scolaire ; pas L1", "it": "L2/scolastica; non L1", "es": "L2/educativa; no L1", "pt": "L2/educacional; não L1", "ru": "второй язык / в образовании; не родной", "uk": "друга мова / в освіті; не рідна", "ar": "لغة ثانية/تعليمية؛ ليست لغة أم", "he": "שפה שנייה/לימודית; לא שפת אם", "sw": "L2/ya elimu; si L1"}, "Liturgical (Tibetan Buddhism)": {"ja": "典礼語（チベット仏教）", "ko": "전례어(티베트 불교)", "zh": "礼仪语言（藏传佛教）", "yue": "禮儀語言（藏傳佛教）", "vi": "Ngôn ngữ nghi lễ (Phật giáo Tây Tạng)", "th": "ภาษาพิธีกรรม (พุทธศาสนาแบบทิเบต)", "id": "Liturgi (Buddhisme Tibet)", "hi": "धार्मिक (तिब्बती बौद्ध धर्म)", "de": "Liturgisch (tibetischer Buddhismus)", "fr": "Liturgique (bouddhisme tibétain)", "it": "Liturgica (buddhismo tibetano)", "es": "Litúrgica (budismo tibetano)", "pt": "Litúrgica (budismo tibetano)", "ru": "Литургический (тибетский буддизм)", "uk": "Літургійна (тибетський буддизм)", "ar": "طقسية (البوذية التبتية)", "he": "ליטורגית (בודהיזם טיבטי)", "sw": "Ya ibada (Ubudha wa Tibet)"}, "Liturgical (~10K active liturgical use)": {"ja": "典礼語（典礼での現用者約1万）", "ko": "전례어(전례 사용자 약 1만)", "zh": "礼仪语言（约1万人在礼仪中使用）", "yue": "禮儀語言（約1萬人在禮儀中使用）", "vi": "Ngôn ngữ nghi lễ (~10K người dùng trong nghi lễ)", "th": "ภาษาพิธีกรรม (ใช้ในพิธีกรรม ~10K คน)", "id": "Liturgi (~10 rb pengguna liturgi aktif)", "hi": "धार्मिक (~10K सक्रिय धार्मिक उपयोग)", "de": "Liturgisch (~10.000 aktive liturgische Nutzer)", "fr": "Liturgique (~10 000 usagers liturgiques actifs)", "it": "Liturgica (~10.000 utenti liturgici attivi)", "es": "Litúrgica (~10 000 usuarios litúrgicos activos)", "pt": "Litúrgica (~10 mil em uso litúrgico ativo)", "ru": "Литургический (~10 тыс. активно используют в богослужении)", "uk": "Літургійна (~10 тис. активно вживають у богослужінні)", "ar": "طقسية (~10 آلاف في استخدام طقسي نشط)", "he": "ליטורגית (~10 אלף בשימוש ליטורגי פעיל)", "sw": "Ya ibada (elfu ~10 katika matumizi hai ya ibada)"}, "Liturgical Classical Tibetan (Tibetan Buddhist monastic recitation); active liturgical and pedagogical use but no native speaker community": {"ja": "典礼用古典チベット語（チベット仏教僧院での読誦）；典礼・教育に現用されるが母語話者共同体はない", "ko": "전례용 고전 티베트어(티베트 불교 승원 독송); 전례·교육에 쓰이나 모어 화자 공동체는 없음", "zh": "礼仪用古典藏语（藏传佛教寺院诵经）；用于礼仪与教学，但无母语群体", "yue": "禮儀用古典藏語（藏傳佛教寺院誦經）；用於禮儀與教學，但無母語群體", "vi": "Tiếng Tạng cổ điển dùng trong nghi lễ (tụng kinh trong tu viện Phật giáo Tây Tạng); dùng trong nghi lễ và giáo dục nhưng không có cộng đồng người bản ngữ", "th": "ภาษาทิเบตคลาสสิกในพิธีกรรม (การสวดในวัดพุทธทิเบต); ใช้ในพิธีกรรมและการศึกษาแต่ไม่มีชุมชนเจ้าของภาษา", "id": "Tibet Klasik liturgis (tilawah biara Buddha Tibet); dipakai aktif dalam liturgi dan pendidikan tetapi tanpa komunitas penutur asli", "hi": "धार्मिक शास्त्रीय तिब्बती (तिब्बती बौद्ध मठों में पाठ); सक्रिय धार्मिक और शैक्षिक उपयोग, पर कोई मूल वक्ता समुदाय नहीं", "de": "Liturgisches Klassisches Tibetisch (Rezitation in tibetisch-buddhistischen Klöstern); aktive liturgische und didaktische Verwendung, aber keine muttersprachliche Gemeinschaft", "fr": "Tibétain classique liturgique (récitation monastique bouddhiste tibétaine) ; usage liturgique et pédagogique actif mais sans communauté de locuteurs natifs", "it": "Tibetano classico liturgico (recitazione monastica buddhista tibetana); uso liturgico e didattico attivo ma nessuna comunità di parlanti nativi", "es": "Tibetano clásico litúrgico (recitación monástica budista tibetana); uso litúrgico y pedagógico activo pero sin comunidad de hablantes nativos", "pt": "Tibetano clássico litúrgico (recitação monástica budista tibetana); uso litúrgico e pedagógico ativo, mas sem comunidade de falantes nativos", "ru": "Литургический классический тибетский (монастырское чтение в тибетском буддизме); активное литургическое и учебное употребление, но без сообщества носителей", "uk": "Літургійна класична тибетська (монастирське читання в тибетському буддизмі); активне літургійне й навчальне вживання, але без спільноти носіїв", "ar": "التبتية الكلاسيكية الطقسية (التلاوة الرهبانية البوذية التبتية)؛ استخدام طقسي وتعليمي نشط دون مجتمع ناطقين أصليين", "he": "טיבטית קלאסית ליטורגית (קריאה במנזרים הבודהיסטיים הטיבטיים); שימוש ליטורגי ולימודי פעיל, אך ללא קהילת דוברים ילידיים", "sw": "Kitibeti cha Kale cha ibada (kughani kwa watawa wa Kibudha wa Tibet); matumizi hai ya ibada na ufundishaji lakini bila jamii ya wazawa"}, "Liturgical use in Ethiopian/Eritrean Orthodox liturgy": {"ja": "エチオピア・エリトリア正教会の典礼で使用", "ko": "에티오피아·에리트레아 정교회 전례에 사용", "zh": "用于埃塞俄比亚／厄立特里亚正教会礼仪", "yue": "用於埃塞俄比亞／厄立特里亞正教會禮儀", "vi": "Dùng trong nghi lễ Chính thống giáo Ethiopia/Eritrea", "th": "ใช้ในพิธีกรรมของคริสตจักรออร์โธด็อกซ์เอธิโอเปีย/เอริเทรีย", "id": "Dipakai dalam liturgi Ortodoks Etiopia/Eritrea", "hi": "इथियोपियाई/इरिट्रियाई ऑर्थोडॉक्स पूजा-पद्धति में उपयोग", "de": "Liturgische Verwendung in der äthiopisch-/eritreisch-orthodoxen Liturgie", "fr": "Usage liturgique dans les Églises orthodoxes éthiopienne/érythréenne", "it": "Uso liturgico nella liturgia ortodossa etiope/eritrea", "es": "Uso litúrgico en la liturgia ortodoxa etíope/eritrea", "pt": "Uso litúrgico na liturgia ortodoxa etíope/eritreia", "ru": "Литургическое употребление в эфиопской/эритрейской православной литургии", "uk": "Літургійне вживання в ефіопській/еритрейській православній літургії", "ar": "استخدام طقسي في الليتورجيا الأرثوذكسية الإثيوبية/الإريترية", "he": "שימוש ליטורגי בליטורגיה האורתודוקסית האתיופית/האריתראית", "sw": "Matumizi ya ibada katika liturujia ya Kiorthodoksi ya Ethiopia/Eritrea"}, "Liturgical; revived as Modern Hebrew in 19th c.": {"ja": "典礼語；19世紀に現代ヘブライ語として復興", "ko": "전례어; 19세기에 현대 히브리어로 부활", "zh": "礼仪语言；19世纪复兴为现代希伯来语", "yue": "禮儀語言；19世紀復興為現代希伯來語", "vi": "Ngôn ngữ nghi lễ; được hồi sinh thành tiếng Hebrew hiện đại vào thế kỷ 19", "th": "ภาษาพิธีกรรม; ฟื้นฟูเป็นภาษาฮีบรูสมัยใหม่ในศตวรรษที่ 19", "id": "Liturgi; dihidupkan kembali sebagai Ibrani Modern pada abad ke-19", "hi": "धार्मिक; 19वीं शताब्दी में आधुनिक हिब्रू के रूप में पुनर्जीवित", "de": "Liturgisch; im 19. Jh. als Neuhebräisch wiederbelebt", "fr": "Liturgique ; ressuscitée en hébreu moderne au XIXe s.", "it": "Liturgica; rivitalizzata come ebraico moderno nel XIX sec.", "es": "Litúrgica; revivida como hebreo moderno en el s. XIX", "pt": "Litúrgica; revivida como hebraico moderno no séc. 19", "ru": "Литургический; возрождён как современный иврит в 19 в.", "uk": "Літургійна; відроджена як сучасний іврит у 19 ст.", "ar": "طقسية؛ أُحييت كعبرية حديثة في القرن 19", "he": "ליטורגית; הוחייתה כעברית מודרנית במאה ה-19", "sw": "Ya ibada; ilifufuliwa kama Kiebrania cha Kisasa karne ya 19"}, "Lomwe; lower bound only": {"ja": "ロムウェ語；下限値のみ", "ko": "로므웨어; 하한값만", "zh": "洛姆韦语；仅为下限", "yue": "洛姆韋語；僅為下限", "vi": "Tiếng Lomwe; chỉ là cận dưới", "th": "ภาษาโลมเว; เป็นค่าขั้นต่ำเท่านั้น", "id": "Lomwe; hanya batas bawah", "hi": "लोमवे; केवल न्यूनतम सीमा", "de": "Lomwe; nur Untergrenze", "fr": "lomwe ; borne inférieure seulement", "it": "lomwe; solo limite inferiore", "es": "lomwe; solo límite inferior", "pt": "Lomwe; apenas limite inferior", "ru": "ломве; только нижняя граница", "uk": "ломве; лише нижня межа", "ar": "اللوموي؛ الحد الأدنى فقط", "he": "לומווה; גבול תחתון בלבד", "sw": "Kilomwe; kiwango cha chini tu"}, "Maine ~200 + New Brunswick ~400; UNESCO definitely-endangered": {"ja": "メイン州約200＋ニューブランズウィック州約400；UNESCO「危険」", "ko": "메인주 약 200 + 뉴브런즈윅주 약 400; 유네스코 '확실한 위기'", "zh": "缅因州约200+新不伦瑞克省约400；联合国教科文组织“确有危险”", "yue": "緬因州約200+紐賓士域省約400；聯合國教科文組織「確有危險」", "vi": "Maine ~200 + New Brunswick ~400; UNESCO: chắc chắn nguy cấp", "th": "เมน ~200 + นิวบรันสวิก ~400; ยูเนสโก: ใกล้สูญหายแน่นอน", "id": "Maine ~200 + New Brunswick ~400; UNESCO: pasti terancam", "hi": "मेन ~200 + न्यू ब्रंसविक ~400; UNESCO: निश्चित रूप से संकटग्रस्त", "de": "Maine ~200 + New Brunswick ~400; UNESCO: definitiv gefährdet", "fr": "Maine ~200 + Nouveau-Brunswick ~400 ; UNESCO : en danger", "it": "Maine ~200 + Nuovo Brunswick ~400; UNESCO: sicuramente in pericolo", "es": "Maine ~200 + Nuevo Brunswick ~400; UNESCO: claramente amenazada", "pt": "Maine ~200 + New Brunswick ~400; UNESCO: definitivamente ameaçada", "ru": "Мэн ~200 + Нью-Брансуик ~400; ЮНЕСКО: под угрозой", "uk": "Мен ~200 + Нью-Брансвік ~400; ЮНЕСКО: під загрозою", "ar": "مين ~200 + نيو برونزويك ~400؛ اليونسكو: مهددة بالتأكيد", "he": "מיין ~200 + ניו ברונזוויק ~400; אונסק״ו: בסכנה ודאית", "sw": "Maine ~200 + New Brunswick ~400; UNESCO: hatarini dhahiri"}, "Mali ~700K + Burkina Faso ~50K": {"ja": "マリ約70万＋ブルキナファソ約5万", "ko": "말리 약 70만 + 부르키나파소 약 5만", "zh": "马里约70万+布基纳法索约5万", "yue": "馬里約70萬+布基納法索約5萬", "vi": "Mali ~700K + Burkina Faso ~50K", "th": "มาลี ~700K + บูร์กินาฟาโซ ~50K", "id": "Mali ~700 rb + Burkina Faso ~50 rb", "hi": "माली ~700K + बुर्किना फ़ासो ~50K", "de": "Mali ~700.000 + Burkina Faso ~50.000", "fr": "Mali ~700 000 + Burkina Faso ~50 000", "it": "Mali ~700.000 + Burkina Faso ~50.000", "es": "Malí ~700 000 + Burkina Faso ~50 000", "pt": "Mali ~700 mil + Burkina Faso ~50 mil", "ru": "Мали ~700 тыс. + Буркина-Фасо ~50 тыс.", "uk": "Малі ~700 тис. + Буркіна-Фасо ~50 тис.", "ar": "مالي ~700 ألف + بوركينا فاسو ~50 ألف", "he": "מאלי ~700 אלף + בורקינה פאסו ~50 אלף", "sw": "Mali elfu ~700 + Burkina Faso elfu ~50"}, "Mandarin only; total Sinitic incl. all topolects ≈ 1.3B": {"ja": "官話のみ；全方言を含む漢語系全体≈13億", "ko": "관화만; 모든 방언을 포함한 중국어파 전체 ≈ 13억", "zh": "仅官话；含各地方言的汉语族总计≈13亿", "yue": "僅官話；包括各地方言的漢語族總計≈13億", "vi": "Chỉ tiếng Quan thoại; tổng nhóm Hán kể cả mọi phương ngữ ≈ 1.3B", "th": "เฉพาะภาษาจีนกลาง; กลุ่มภาษาจีนรวมทุกภาษาถิ่น ≈ 1.3B", "id": "Hanya Mandarin; total Sinitik termasuk semua topolek ≈ 1,3 miliar", "hi": "केवल मंदारिन; सभी उपभाषाओं सहित कुल चीनी ≈ 1.3B", "de": "Nur Mandarin; sinitisch gesamt inkl. aller Topolekte ≈ 1,3 Mrd.", "fr": "Mandarin seul ; total sinitique avec tous les topolectes ≈ 1,3 Md", "it": "Solo mandarino; totale sinitico incl. tutti i topoletti ≈ 1,3 Mld", "es": "Solo mandarín; total siníticas incl. todos los topolectos ≈ 1300 M", "pt": "apenas mandarim; total sinítico incl. todos os topoletos ≈ 1,3 bi", "ru": "только мандаринский; все китайские вместе со всеми диалектами ≈ 1,3 млрд", "uk": "лише мандаринська; усі китайські разом з усіма діалектами ≈ 1,3 млрд", "ar": "الماندرين فقط؛ مجموع الصينية بكل لهجاتها ≈ 1.3 مليار", "he": "מנדרינית בלבד; סך הסינית כולל כל הניבים ≈ 1.3 מיליארד", "sw": "Kimandarini pekee; jumla ya Kichina pamoja na lahaja zote ≈ bilioni 1.3"}, "Mandarin variety; overlaps with Chinese zh": {"ja": "官話の一変種；中国語(zh)と重複", "ko": "관화의 한 변종; 중국어(zh)와 중복", "zh": "官话变体；与中文(zh)重叠", "yue": "官話變體；與中文(zh)重疊", "vi": "Một biến thể Quan thoại; trùng với tiếng Trung (zh)", "th": "วิธภาษาจีนกลาง; ซ้อนทับกับภาษาจีน (zh)", "id": "Varietas Mandarin; tumpang tindih dengan Tionghoa zh", "hi": "मंदारिन रूप; चीनी zh के साथ अतिव्याप्ति", "de": "Mandarin-Varietät; überschneidet sich mit Chinesisch zh", "fr": "variété de mandarin ; recoupe le chinois zh", "it": "varietà di mandarino; si sovrappone al cinese zh", "es": "variedad del mandarín; se solapa con el chino zh", "pt": "variedade do mandarim; sobrepõe-se ao chinês zh", "ru": "вариант мандаринского; пересекается с китайским zh", "uk": "різновид мандаринської; перетинається з китайською zh", "ar": "تنوع من الماندرين؛ يتداخل مع الصينية zh", "he": "ניב של מנדרינית; חופף לסינית zh", "sw": "lahaja ya Kimandarini; inaingiliana na Kichina zh"}, "Manicaland Province eastern Zimbabwe + western Mozambique border populations": {"ja": "ジンバブエ東部マニカランド州＋モザンビーク西部国境地帯の住民", "ko": "짐바브웨 동부 마니칼랜드주 + 모잠비크 서부 국경 지역 인구", "zh": "津巴布韦东部马尼卡兰省+莫桑比克西部边境人口", "yue": "津巴布韋東部馬尼卡蘭省+莫桑比克西部邊境人口", "vi": "Tỉnh Manicaland, đông Zimbabwe + cư dân vùng biên tây Mozambique", "th": "จังหวัดมานิกาแลนด์ ซิมบับเวตะวันออก + ประชากรชายแดนโมซัมบิกตะวันตก", "id": "Provinsi Manicaland, Zimbabwe timur + populasi perbatasan Mozambik barat", "hi": "मनिकालैंड प्रांत, पूर्वी ज़िम्बाब्वे + पश्चिमी मोज़ाम्बिक सीमा आबादी", "de": "Provinz Manicaland, Ostsimbabwe + Grenzbevölkerung im westlichen Mosambik", "fr": "province du Manicaland, est du Zimbabwe + populations frontalières de l'ouest du Mozambique", "it": "provincia di Manicaland, Zimbabwe orientale + popolazioni di confine del Mozambico occidentale", "es": "provincia de Manicaland, este de Zimbabue + poblaciones fronterizas del oeste de Mozambique", "pt": "Província de Manicaland, leste do Zimbábue + populações fronteiriças no oeste de Moçambique", "ru": "провинция Маникаленд на востоке Зимбабве + население пограничья на западе Мозамбика", "uk": "провінція Манікаленд на сході Зімбабве + населення прикордоння на заході Мозамбіку", "ar": "مقاطعة مانيكالاند شرق زيمبابوي + سكان الحدود غرب موزمبيق", "he": "מחוז מניקלנד במזרח זימבבואה + אוכלוסיות גבול במערב מוזמביק", "sw": "Mkoa wa Manicaland mashariki mwa Zimbabwe + wakazi wa mpakani magharibi mwa Msumbiji"}, "Mexican-population L1 estimate; overlaps with global Spanish L1 of ~500M": {"ja": "メキシコ人口に基づく母語話者推計；世界のスペイン語母語話者約5億と重複", "ko": "멕시코 인구 기준 모어 화자 추정; 전 세계 스페인어 모어 화자 약 5억과 중복", "zh": "基于墨西哥人口的母语人数估计；与全球约5亿西班牙语母语者重叠", "yue": "基於墨西哥人口的母語人數估計；與全球約5億西班牙語母語者重疊", "vi": "Ước tính người nói tiếng mẹ đẻ theo dân số Mexico; trùng với ~500M người nói tiếng Tây Ban Nha như tiếng mẹ đẻ toàn cầu", "th": "ประมาณการผู้พูดภาษาแม่ตามประชากรเม็กซิโก; ซ้อนทับกับผู้พูดภาษาสเปนเป็นภาษาแม่ทั่วโลก ~500M", "id": "Perkiraan L1 populasi Meksiko; tumpang tindih dengan L1 Spanyol global ~500 jt", "hi": "मैक्सिकी आबादी का L1 अनुमान; वैश्विक स्पेनिश L1 (~500M) के साथ अतिव्याप्ति", "de": "L1-Schätzung für Mexiko; überschneidet sich mit der weltweiten spanischen L1 von ~500 Mio.", "fr": "Estimation L1 de la population mexicaine ; recoupe les ~500 M de L1 de l'espagnol dans le monde", "it": "Stima L1 della popolazione messicana; si sovrappone ai ~500 Mln di L1 di spagnolo nel mondo", "es": "Estimación L1 de la población mexicana; se solapa con el español L1 mundial de ~500 M", "pt": "estimativa de L1 da população mexicana; sobrepõe-se ao L1 global do espanhol de ~500 mi", "ru": "оценка носителей (родной язык) в Мексике; входит в ~500 млн носителей испанского в мире", "uk": "оцінка носіїв (рідна мова) у Мексиці; входить до ~500 млн носіїв іспанської у світі", "ar": "تقدير اللغة الأم لسكان المكسيك؛ يتداخل مع ~500 مليون ناطق بالإسبانية كلغة أم عالميًا", "he": "הערכת שפת אם לאוכלוסיית מקסיקו; חופפת ל-~500 מיליון דוברי ספרדית כשפת אם בעולם", "sw": "makadirio ya L1 ya wakazi wa Meksiko; yanaingiliana na L1 wa Kihispania duniani wa milioni ~500"}, "Mexico Veracruz Huasteca + Hidalgo + San Luis Potosí; total Nahuan family speakers ~1.7M across all 30+ varieties": {"ja": "メキシコのベラクルス州ワステカ地方＋イダルゴ州＋サン・ルイス・ポトシ州；ナワ語群全体の話者は30以上の変種で約170万", "ko": "멕시코 베라크루스주 우아스테카 + 이달고주 + 산루이스포토시주; 나와어군 전체 화자는 30여 개 변종에 걸쳐 약 170만", "zh": "墨西哥韦拉克鲁斯州瓦斯特卡地区+伊达尔戈州+圣路易斯波托西州；纳瓦语支30多个变体的使用者共约170万", "yue": "墨西哥韋拉克魯斯州瓦斯特卡地區+伊達爾戈州+聖路易斯波托西州；納瓦語支30多個變體的使用者共約170萬", "vi": "Vùng Huasteca của Veracruz + Hidalgo + San Luis Potosí, Mexico; tổng người nói nhóm Nahua ~1.7M qua hơn 30 biến thể", "th": "ฮัวสเตกาในเบรากรุซ + อิดัลโก + ซานลุยส์โปโตซี เม็กซิโก; ผู้พูดกลุ่มภาษานาวาทั้งหมด ~1.7M ใน 30+ วิธภาษา", "id": "Meksiko: Huasteca Veracruz + Hidalgo + San Luis Potosí; total penutur rumpun Nahua ~1,7 jt di 30+ varietas", "hi": "मेक्सिको: वेराक्रूज़ उआस्तेका + इदाल्गो + सान लुइस पोतोसी; सभी 30+ रूपों में कुल नाहुआ परिवार वक्ता ~1.7M", "de": "Mexiko: Huasteca (Veracruz) + Hidalgo + San Luis Potosí; Nahua-Familie gesamt ~1,7 Mio. über alle 30+ Varietäten", "fr": "Mexique : Huasteca de Veracruz + Hidalgo + San Luis Potosí ; famille nahua au total ~1,7 M sur plus de 30 variétés", "it": "Messico: Huasteca di Veracruz + Hidalgo + San Luis Potosí; famiglia nahua in totale ~1,7 Mln su oltre 30 varietà", "es": "México: Huasteca veracruzana + Hidalgo + San Luis Potosí; familia náhuatl en total ~1,7 M en más de 30 variedades", "pt": "México: Huasteca de Veracruz + Hidalgo + San Luis Potosí; total de falantes da família náuatle ~1,7 mi em todas as 30+ variedades", "ru": "Мексика: Уастека в Веракрусе + Идальго + Сан-Луис-Потоси; всего носителей науатлских ~1,7 млн во всех 30+ вариантах", "uk": "Мексика: Уастека у Веракрусі + Ідальго + Сан-Луїс-Потосі; усього мовців науатльських ~1,7 млн в усіх 30+ різновидах", "ar": "المكسيك: هواستيكا فيراكروز + هيدالغو + سان لويس بوتوسي؛ مجموع متحدثي عائلة الناواتل ~1.7 مليون في 30+ تنوعًا", "he": "מקסיקו: הואסטקה של ורקרוס + אידלגו + סן לואיס פוטוסי; סך דוברי משפחת הנאוואטל ~1.7 מיליון בכל 30+ הניבים", "sw": "Meksiko: Huasteca ya Veracruz + Hidalgo + San Luis Potosí; jumla ya wazungumzaji wa familia ya Kinahuatl milioni ~1.7 katika lahaja zote 30+"}, "Modern Spoken Sanskrit (Samskrita Bharati pedagogy); L1 figure from Indian Census 2011 self-claimed Sanskrit speakers, mostly raised in Sanskrit-devotee families; tens of thousands of L2 learners through 10-day Sambhashana Shibira courses": {"ja": "現代口語サンスクリット（サンスクリタ・バーラティーの教授法）；母語話者数は2011年インド国勢調査の自己申告によるもので、大半はサンスクリット信奉家庭で育った人々；10日間のサンバーシャナ・シビラ講座を通じた第二言語学習者が数万人", "ko": "현대 구어 산스크리트어(삼스크리타 바라티 교수법); 모어 화자 수는 2011년 인도 인구조사의 자기 신고 수치로, 대부분 산스크리트어 애호 가정 출신; 10일간의 삼바샤나 시비라 강좌를 통한 제2언어 학습자 수만 명", "zh": "现代口语梵语（Samskrita Bharati 教学法）；母语人数来自2011年印度人口普查自报的梵语使用者，多成长于梵语信奉家庭；另有数万名通过10天“梵语会话营”学习的第二语言学习者", "yue": "現代口語梵語（Samskrita Bharati 教學法）；母語人數來自2011年印度人口普查自報的梵語使用者，多成長於梵語信奉家庭；另有數萬名經10天「梵語會話營」學習的第二語言學習者", "vi": "Tiếng Phạn khẩu ngữ hiện đại (phương pháp của Samskrita Bharati); số người nói tiếng mẹ đẻ theo tự khai trong điều tra dân số Ấn Độ 2011, phần lớn lớn lên trong gia đình sùng tiếng Phạn; hàng chục nghìn người học ngôn ngữ thứ hai qua các khóa Sambhashana Shibira 10 ngày", "th": "ภาษาสันสกฤตพูดสมัยใหม่ (แนวการสอนของสัมสกฤตภารตี); ตัวเลขภาษาแม่มาจากการแจ้งตนเองในสำมะโนอินเดียปี 2011 ส่วนใหญ่เติบโตในครอบครัวผู้ศรัทธาภาษาสันสกฤต; ผู้เรียนภาษาที่สองหลายหมื่นคนผ่านหลักสูตรสัมภาษณศิบิระ 10 วัน", "id": "Sanskerta Lisan Modern (pedagogi Samskrita Bharati); angka L1 dari Sensus India 2011 (penutur Sanskerta yang mengaku sendiri, kebanyakan dibesarkan di keluarga penganut Sanskerta); puluhan ribu pelajar L2 lewat kursus Sambhashana Shibira 10 hari", "hi": "आधुनिक बोलचाल संस्कृत (संस्कृत भारती शिक्षण); L1 आँकड़ा भारतीय जनगणना 2011 के स्व-घोषित संस्कृत वक्ताओं से, अधिकतर संस्कृत-अनुरागी परिवारों में पले; 10-दिवसीय संभाषण शिबिरों से हज़ारों L2 शिक्षार्थी", "de": "Modernes gesprochenes Sanskrit (Samskrita-Bharati-Didaktik); L1-Zahl aus dem indischen Zensus 2011 (Selbstangabe), meist in sanskritbegeisterten Familien aufgewachsen; Zehntausende L2-Lernende über 10-tägige Sambhashana-Shibira-Kurse", "fr": "Sanskrit parlé moderne (pédagogie Samskrita Bharati) ; chiffre L1 du recensement indien de 2011 (auto-déclaration), surtout dans des familles dévouées au sanskrit ; des dizaines de milliers d'apprenants L2 via les stages Sambhashana Shibira de 10 jours", "it": "Sanscrito parlato moderno (didattica Samskrita Bharati); dato L1 dal censimento indiano 2011 (autodichiarazione), per lo più cresciuti in famiglie devote al sanscrito; decine di migliaia di apprendenti L2 tramite i corsi Sambhashana Shibira di 10 giorni", "es": "Sánscrito hablado moderno (pedagogía Samskrita Bharati); cifra L1 del censo indio de 2011 (autodeclarada), en su mayoría criados en familias devotas del sánscrito; decenas de miles de aprendices L2 mediante los cursos Sambhashana Shibira de 10 días", "pt": "Sânscrito falado moderno (pedagogia da Samskrita Bharati); número de L1 do Censo da Índia de 2011 (falantes autodeclarados de sânscrito, criados sobretudo em famílias devotas do sânscrito); dezenas de milhares de aprendizes L2 em cursos Sambhashana Shibira de 10 dias", "ru": "Современный разговорный санскрит (методика Samskrita Bharati); число носителей — по переписи Индии 2011 г. (самозаявленные носители санскрита, в основном выросшие в семьях его приверженцев); десятки тысяч изучающих его как второй язык на 10-дневных курсах Sambhashana Shibira", "uk": "Сучасний розмовний санскрит (методика Samskrita Bharati); кількість носіїв — за переписом Індії 2011 р. (самозаявлені носії санскриту, здебільшого вихованці родин його прихильників); десятки тисяч тих, хто вивчає його як другу мову на 10-денних курсах Sambhashana Shibira", "ar": "السنسكريتية المحكية الحديثة (منهج سامسكريتا بهاراتي)؛ عدد الناطقين بها كلغة أم من تعداد الهند 2011 (ناطقون بالسنسكريتية بإعلان ذاتي نشأ معظمهم في أسر متمسكة بها)؛ عشرات الآلاف من متعلميها كلغة ثانية عبر دورات سامبهاشانا شيبيرا ذات الأيام 10", "he": "סנסקריט מדוברת מודרנית (שיטת סמסקריטה בהארטי); מספר דוברי שפת האם ממפקד הודו 2011 (דוברי סנסקריט בהצהרה עצמית, רובם גדלו במשפחות מסורות לסנסקריט); עשרות אלפי לומדי שפה שנייה בקורסי סמבהאשנה שיבירה בני 10 ימים", "sw": "Kisanskriti cha Kisasa kinachozungumzwa (mbinu ya Samskrita Bharati); idadi ya L1 kutoka Sensa ya India ya 2011 (wanaojitangaza kuzungumza Kisanskriti, wengi walilelewa katika familia zinazokipenda); makumi ya maelfu ya wanafunzi wa L2 kupitia kozi za siku 10 za Sambhashana Shibira"}, "Netherlands + Flanders + Suriname; high English-bilingualism but Dutch is L1": {"ja": "オランダ＋フランデレン＋スリナム；英語との二言語併用率は高いが母語はオランダ語", "ko": "네덜란드 + 플란데런 + 수리남; 영어 이중언어 비율이 높지만 모어는 네덜란드어", "zh": "荷兰+佛兰德+苏里南；英语双语率高，但母语为荷兰语", "yue": "荷蘭+佛蘭德+蘇里南；英語雙語率高，但母語為荷蘭語", "vi": "Hà Lan + Flanders + Suriname; tỷ lệ song ngữ tiếng Anh cao nhưng tiếng mẹ đẻ là tiếng Hà Lan", "th": "เนเธอร์แลนด์ + แฟลนเดอส์ + ซูรินาม; พูดสองภาษากับอังกฤษในอัตราสูง แต่ภาษาแม่คือดัตช์", "id": "Belanda + Flandria + Suriname; banyak yang dwibahasa Inggris tetapi Belanda adalah L1", "hi": "नीदरलैंड + फ़्लैंडर्स + सूरीनाम; अंग्रेज़ी द्विभाषिकता अधिक, पर डच L1 है", "de": "Niederlande + Flandern + Suriname; hohe Englisch-Zweisprachigkeit, aber Niederländisch ist L1", "fr": "Pays-Bas + Flandre + Suriname ; fort bilinguisme anglais mais le néerlandais est L1", "it": "Paesi Bassi + Fiandre + Suriname; forte bilinguismo con l'inglese ma il nederlandese è L1", "es": "Países Bajos + Flandes + Surinam; alto bilingüismo con el inglés pero el neerlandés es L1", "pt": "Países Baixos + Flandres + Suriname; alto bilinguismo com inglês, mas o neerlandês é L1", "ru": "Нидерланды + Фландрия + Суринам; широкое двуязычие с английским, но нидерландский — родной", "uk": "Нідерланди + Фландрія + Суринам; широка двомовність з англійською, але нідерландська — рідна", "ar": "هولندا + فلاندرز + سورينام؛ ثنائية لغوية عالية مع الإنجليزية لكن الهولندية هي اللغة الأم", "he": "הולנד + פלנדריה + סורינאם; דו-לשוניות גבוהה עם אנגלית, אך ההולנדית היא שפת האם", "sw": "Uholanzi + Flanders + Suriname; uwili-lugha mkubwa na Kiingereza lakini Kiholanzi ni L1"}, "Nicaragua ~8K + Honduras ~2K": {"ja": "ニカラグア約8,000＋ホンジュラス約2,000", "ko": "니카라과 약 8,000 + 온두라스 약 2,000", "zh": "尼加拉瓜约8000+洪都拉斯约2000", "yue": "尼加拉瓜約8,000+洪都拉斯約2,000", "vi": "Nicaragua ~8K + Honduras ~2K", "th": "นิการากัว ~8K + ฮอนดูรัส ~2K", "id": "Nikaragua ~8 rb + Honduras ~2 rb", "hi": "निकारागुआ ~8K + होंडुरास ~2K", "de": "Nicaragua ~8.000 + Honduras ~2.000", "fr": "Nicaragua ~8 000 + Honduras ~2 000", "it": "Nicaragua ~8.000 + Honduras ~2.000", "es": "Nicaragua ~8000 + Honduras ~2000", "pt": "Nicarágua ~8 mil + Honduras ~2 mil", "ru": "Никарагуа ~8 тыс. + Гондурас ~2 тыс.", "uk": "Нікарагуа ~8 тис. + Гондурас ~2 тис.", "ar": "نيكاراغوا ~8 آلاف + هندوراس ~2 ألف", "he": "ניקרגואה ~8,000 + הונדורס ~2,000", "sw": "Nikaragua elfu ~8 + Honduras elfu ~2"}, "Odanak community language program revival": {"ja": "オダナク共同体の言語プログラムによる復興", "ko": "오다낙 공동체 언어 프로그램을 통한 부활", "zh": "通过奥达纳克社区语言项目复兴", "yue": "通過奧達納克社區語言計劃復興", "vi": "Hồi sinh qua chương trình ngôn ngữ của cộng đồng Odanak", "th": "ฟื้นฟูผ่านโครงการภาษาของชุมชนโอดานัก", "id": "Revitalisasi lewat program bahasa komunitas Odanak", "hi": "ओडानाक समुदाय भाषा कार्यक्रम द्वारा पुनरुद्धार", "de": "Wiederbelebung durch das Sprachprogramm der Gemeinde Odanak", "fr": "revitalisation par le programme linguistique de la communauté d'Odanak", "it": "rivitalizzazione tramite il programma linguistico della comunità di Odanak", "es": "revitalización mediante el programa lingüístico de la comunidad de Odanak", "pt": "revitalização por programa linguístico comunitário de Odanak", "ru": "возрождение через общинную языковую программу Оданака", "uk": "відродження через громадську мовну програму Оданака", "ar": "إحياء عبر برنامج لغوي مجتمعي في أوداناك", "he": "החייאה בתוכנית שפה קהילתית באודנאק", "sw": "ufufuaji kupitia mpango wa lugha wa jamii ya Odanak"}, "Pakistan ~400K + India ~40K": {"ja": "パキスタン約40万＋インド約4万", "ko": "파키스탄 약 40만 + 인도 약 4만", "zh": "巴基斯坦约40万+印度约4万", "yue": "巴基斯坦約40萬+印度約4萬", "vi": "Pakistan ~400K + Ấn Độ ~40K", "th": "ปากีสถาน ~400K + อินเดีย ~40K", "id": "Pakistan ~400 rb + India ~40 rb", "hi": "पाकिस्तान ~400K + भारत ~40K", "de": "Pakistan ~400.000 + Indien ~40.000", "fr": "Pakistan ~400 000 + Inde ~40 000", "it": "Pakistan ~400.000 + India ~40.000", "es": "Pakistán ~400 000 + India ~40 000", "pt": "Paquistão ~400 mil + Índia ~40 mil", "ru": "Пакистан ~400 тыс. + Индия ~40 тыс.", "uk": "Пакистан ~400 тис. + Індія ~40 тис.", "ar": "باكستان ~400 ألف + الهند ~40 ألف", "he": "פקיסטן ~400 אלף + הודו ~40 אלף", "sw": "Pakistan elfu ~400 + India elfu ~40"}, "Pedagogical Pali (Theravada monastic and lay recitation); active liturgical use throughout the Theravada Buddhist world but no native speaker community": {"ja": "教育用パーリ語（上座部の僧侶・在家による読誦）；上座部仏教圏全域で典礼に現用されるが母語話者共同体はない", "ko": "교육용 팔리어(상좌부 승려·재가자 독송); 상좌부 불교권 전역에서 전례에 쓰이나 모어 화자 공동체는 없음", "zh": "教学用巴利语（上座部僧侣与在家信众诵读）；在整个上座部佛教世界用于礼仪，但无母语群体", "yue": "教學用巴利語（上座部僧侶與在家信眾誦讀）；在整個上座部佛教世界用於禮儀，但無母語群體", "vi": "Tiếng Pali trong giáo dục (tụng đọc của tăng sĩ và cư sĩ Theravada); dùng trong nghi lễ khắp thế giới Phật giáo Theravada nhưng không có cộng đồng người bản ngữ", "th": "ภาษาบาลีเพื่อการศึกษา (การสวดของพระและฆราวาสเถรวาท); ใช้ในพิธีกรรมทั่วโลกพุทธเถรวาทแต่ไม่มีชุมชนเจ้าของภาษา", "id": "Pali pedagogis (tilawah biara dan awam Theravada); dipakai aktif dalam liturgi di seluruh dunia Buddha Theravada tetapi tanpa komunitas penutur asli", "hi": "शैक्षिक पालि (थेरवाद भिक्षु और गृहस्थ पाठ); पूरे थेरवाद बौद्ध जगत में सक्रिय धार्मिक उपयोग, पर कोई मूल वक्ता समुदाय नहीं", "de": "Didaktisches Pali (Rezitation von Theravada-Mönchen und -Laien); aktive liturgische Verwendung in der gesamten Theravada-Welt, aber keine muttersprachliche Gemeinschaft", "fr": "Pali pédagogique (récitation monastique et laïque theravāda) ; usage liturgique actif dans tout le monde bouddhiste theravāda mais sans communauté de locuteurs natifs", "it": "Pali didattico (recitazione monastica e laica theravada); uso liturgico attivo in tutto il mondo buddhista theravada ma nessuna comunità di parlanti nativi", "es": "Pali pedagógico (recitación monástica y laica theravada); uso litúrgico activo en todo el mundo budista theravada pero sin comunidad de hablantes nativos", "pt": "Páli pedagógico (recitação monástica e leiga Theravada); uso litúrgico ativo em todo o mundo budista Theravada, mas sem comunidade de falantes nativos", "ru": "Учебный пали (монашеское и мирское чтение в тхераваде); активное литургическое употребление во всём мире тхеравады, но без сообщества носителей", "uk": "Навчальна палі (чернече й мирське читання в тхераваді); активне літургійне вживання в усьому світі тхеравади, але без спільноти носіїв", "ar": "البالية التعليمية (تلاوة رهبانية وعلمانية في الثيرافادا)؛ استخدام طقسي نشط في أنحاء العالم البوذي الثيرافادي دون مجتمع ناطقين أصليين", "he": "פאלי לימודית (קריאה של נזירים והדיוטות בתרוואדה); שימוש ליטורגי פעיל בכל העולם הבודהיסטי התרוואדי, אך ללא קהילת דוברים ילידיים", "sw": "Kipali cha kufundishia (kughani kwa watawa na waumini wa Theravada); matumizi hai ya ibada kote katika ulimwengu wa Kibudha wa Theravada lakini bila jamii ya wazawa"}, "Peru ~3K + Ecuador ~2K": {"ja": "ペルー約3,000＋エクアドル約2,000", "ko": "페루 약 3,000 + 에콰도르 약 2,000", "zh": "秘鲁约3000+厄瓜多尔约2000", "yue": "秘魯約3,000+厄瓜多爾約2,000", "vi": "Peru ~3K + Ecuador ~2K", "th": "เปรู ~3K + เอกวาดอร์ ~2K", "id": "Peru ~3 rb + Ekuador ~2 rb", "hi": "पेरू ~3K + इक्वाडोर ~2K", "de": "Peru ~3.000 + Ecuador ~2.000", "fr": "Pérou ~3 000 + Équateur ~2 000", "it": "Perù ~3.000 + Ecuador ~2.000", "es": "Perú ~3000 + Ecuador ~2000", "pt": "Peru ~3 mil + Equador ~2 mil", "ru": "Перу ~3 тыс. + Эквадор ~2 тыс.", "uk": "Перу ~3 тис. + Еквадор ~2 тис.", "ar": "بيرو ~3 آلاف + الإكوادور ~2 ألف", "he": "פרו ~3,000 + אקוודור ~2,000", "sw": "Peru elfu ~3 + Ekuado elfu ~2"}, "Peru ~50K + Ecuador ~5K": {"ja": "ペルー約5万＋エクアドル約5,000", "ko": "페루 약 5만 + 에콰도르 약 5,000", "zh": "秘鲁约5万+厄瓜多尔约5000", "yue": "秘魯約5萬+厄瓜多爾約5,000", "vi": "Peru ~50K + Ecuador ~5K", "th": "เปรู ~50K + เอกวาดอร์ ~5K", "id": "Peru ~50 rb + Ekuador ~5 rb", "hi": "पेरू ~50K + इक्वाडोर ~5K", "de": "Peru ~50.000 + Ecuador ~5.000", "fr": "Pérou ~50 000 + Équateur ~5 000", "it": "Perù ~50.000 + Ecuador ~5.000", "es": "Perú ~50 000 + Ecuador ~5000", "pt": "Peru ~50 mil + Equador ~5 mil", "ru": "Перу ~50 тыс. + Эквадор ~5 тыс.", "uk": "Перу ~50 тис. + Еквадор ~5 тис.", "ar": "بيرو ~50 ألف + الإكوادور ~5 آلاف", "he": "פרו ~50 אלף + אקוודור ~5,000", "sw": "Peru elfu ~50 + Ekuado elfu ~5"}, "Peru ~9K; UNESCO classifies definitely endangered": {"ja": "ペルー約9,000；UNESCOの分類は「危険」", "ko": "페루 약 9,000; 유네스코 분류 '확실한 위기'", "zh": "秘鲁约9000；联合国教科文组织列为“确有危险”", "yue": "秘魯約9,000；聯合國教科文組織列為「確有危險」", "vi": "Peru ~9K; UNESCO xếp loại chắc chắn nguy cấp", "th": "เปรู ~9K; ยูเนสโกจัดเป็นใกล้สูญหายแน่นอน", "id": "Peru ~9 rb; UNESCO: pasti terancam", "hi": "पेरू ~9K; UNESCO: निश्चित रूप से संकटग्रस्त", "de": "Peru ~9.000; UNESCO: definitiv gefährdet", "fr": "Pérou ~9 000 ; UNESCO : en danger", "it": "Perù ~9.000; UNESCO: sicuramente in pericolo", "es": "Perú ~9000; UNESCO: claramente amenazada", "pt": "Peru ~9 mil; UNESCO: definitivamente ameaçada", "ru": "Перу ~9 тыс.; ЮНЕСКО: под угрозой", "uk": "Перу ~9 тис.; ЮНЕСКО: під загрозою", "ar": "بيرو ~9 آلاف؛ اليونسكو: مهددة بالتأكيد", "he": "פרו ~9,000; אונסק״ו: בסכנה ודאית", "sw": "Peru elfu ~9; UNESCO: hatarini dhahiri"}, "Plains Cree variety; ~96K total Cree across all dialects in 2021 Canadian census": {"ja": "平原クリー語の変種；2021年カナダ国勢調査で全方言のクリー語合計約9万6,000", "ko": "평원 크리어 변종; 2021년 캐나다 인구조사 기준 모든 방언 합계 크리어 약 9만 6,000", "zh": "平原克里语变体；2021年加拿大人口普查中各方言克里语合计约9.6万", "yue": "平原克里語變體；2021年加拿大人口普查中各方言克里語合計約9.6萬", "vi": "Biến thể Cree Đồng bằng; tổng ~96K người nói Cree mọi phương ngữ trong điều tra dân số Canada 2021", "th": "วิธภาษาครีที่ราบ; ภาษาครีทุกภาษาถิ่นรวม ~96K ในสำมะโนแคนาดาปี 2021", "id": "Varietas Cree Dataran; ~96 rb total Cree di semua dialek (sensus Kanada 2021)", "hi": "प्लेन्स क्री रूप; 2021 कनाडाई जनगणना में सभी बोलियों में कुल ~96K क्री", "de": "Varietät des Plains Cree; ~96.000 Cree insgesamt über alle Dialekte (kanadischer Zensus 2021)", "fr": "variété de cri des Plaines ; ~96 000 Cris au total, tous dialectes (recensement canadien de 2021)", "it": "varietà di cree delle pianure; ~96.000 cree in totale in tutti i dialetti (censimento canadese 2021)", "es": "variedad de cree de las llanuras; ~96 000 cree en total en todos los dialectos (censo canadiense de 2021)", "pt": "variedade cree das planícies; ~96 mil falantes de cree em todos os dialetos no censo canadense de 2021", "ru": "равнинный кри; ~96 тыс. носителей кри всех диалектов по переписи Канады 2021 г.", "uk": "рівнинна крі; ~96 тис. мовців крі всіх діалектів за переписом Канади 2021 р.", "ar": "كري السهول؛ ~96 ألف متحدث بالكري بكل لهجاتها في تعداد كندا 2021", "he": "קרי של המישורים; ~96 אלף דוברי קרי בכל הניבים במפקד קנדה 2021", "sw": "Kikree cha Nyanda; wazungumzaji elfu ~96 wa Kikree wa lahaja zote katika sensa ya Kanada ya 2021"}, "Poland + diaspora; minimal L2": {"ja": "ポーランド＋在外；第二言語話者はごく少数", "ko": "폴란드 + 해외 동포; 제2언어 화자는 극소수", "zh": "波兰+海外侨民；第二语言使用者极少", "yue": "波蘭+海外僑民；第二語言使用者極少", "vi": "Ba Lan + kiều dân; rất ít người nói như ngôn ngữ thứ hai", "th": "โปแลนด์ + ชุมชนพลัดถิ่น; ผู้พูดเป็นภาษาที่สองมีน้อยมาก", "id": "Polandia + diaspora; L2 minimal", "hi": "पोलैंड + प्रवासी; नगण्य L2", "de": "Polen + Diaspora; kaum L2", "fr": "Pologne + diaspora ; L2 minime", "it": "Polonia + diaspora; L2 minima", "es": "Polonia + diáspora; L2 mínima", "pt": "Polônia + diáspora; L2 mínimo", "ru": "Польша + диаспора; как второй язык — мало", "uk": "Польща + діаспора; як друга мова — мало", "ar": "بولندا + الشتات؛ قلة كلغة ثانية", "he": "פולין + תפוצות; מעט דוברי שפה שנייה", "sw": "Poland + ughaibuni; L2 wachache sana"}, "Quebec; one of few Indigenous languages with positive intergenerational transmission in Canada": {"ja": "ケベック州；カナダで世代間継承が順調な数少ない先住民言語の一つ", "ko": "퀘벡주; 캐나다에서 세대 간 전승이 원활한 몇 안 되는 원주민 언어 중 하나", "zh": "魁北克省；加拿大少数代际传承良好的原住民语言之一", "yue": "魁北克省；加拿大少數代際傳承良好的原住民語言之一", "vi": "Québec; một trong số ít ngôn ngữ bản địa ở Canada được truyền thụ tốt giữa các thế hệ", "th": "ควิเบก; หนึ่งในภาษาชนพื้นเมืองไม่กี่ภาษาในแคนาดาที่ยังถ่ายทอดข้ามรุ่นได้ดี", "id": "Quebec; salah satu dari sedikit bahasa Pribumi di Kanada dengan pewarisan antargenerasi yang positif", "hi": "क्यूबेक; कनाडा की उन कुछ आदिवासी भाषाओं में से एक जिनका पीढ़ी-दर-पीढ़ी संचरण सकारात्मक है", "de": "Québec; eine der wenigen indigenen Sprachen Kanadas mit positiver Weitergabe zwischen den Generationen", "fr": "Québec ; l'une des rares langues autochtones du Canada à transmission intergénérationnelle positive", "it": "Québec; una delle poche lingue indigene del Canada con trasmissione intergenerazionale positiva", "es": "Quebec; una de las pocas lenguas indígenas de Canadá con transmisión intergeneracional positiva", "pt": "Quebec; uma das poucas línguas indígenas com transmissão intergeracional positiva no Canadá", "ru": "Квебек; один из немногих языков коренных народов Канады с устойчивой межпоколенной передачей", "uk": "Квебек; одна з небагатьох мов корінних народів Канади зі стійкою міжпоколінною передачею", "ar": "كيبك؛ من اللغات الأصلية القليلة في كندا ذات نقل إيجابي بين الأجيال", "he": "קוויבק; אחת השפות הילידיות הבודדות בקנדה עם העברה בין-דורית חיובית", "sw": "Quebec; mojawapo ya lugha chache za wenyeji Kanada zenye urithishaji chanya kati ya vizazi"}, "Reconstructed proto-language; estimated separation from mainland Japonic ~7-8c. CE": {"ja": "再建祖語；本土日本語との分岐は推定7〜8世紀頃", "ko": "재구된 조어; 본토 일본어파와의 분기는 약 7~8세기로 추정", "zh": "构拟原始语；与本土日语支的分化估计约在公元7—8世纪", "yue": "構擬原始語；與本土日語支的分化估計約在公元7至8世紀", "vi": "Ngôn ngữ nguyên thủy được tái dựng; ước tính tách khỏi nhóm Nhật Bản đại lục khoảng thế kỷ 7–8 CN", "th": "ภาษาดั้งเดิมที่สร้างขึ้นใหม่; คาดว่าแยกจากกลุ่มภาษาญี่ปุ่นแผ่นดินใหญ่ราวศตวรรษที่ 7–8", "id": "Proto-bahasa rekonstruksi; diperkirakan terpisah dari Japonik daratan ~abad ke-7–8 M", "hi": "पुनर्निर्मित आद्य-भाषा; मुख्य भूमि जापोनिक से अलगाव ~7वीं-8वीं शताब्दी ई.", "de": "Rekonstruierte Protosprache; geschätzte Abspaltung vom festländischen Japonisch ~7.–8. Jh. n. Chr.", "fr": "Proto-langue reconstruite ; séparation estimée du japonique continental ~VIIe-VIIIe s. apr. J.-C.", "it": "Protolingua ricostruita; separazione stimata dal giapponico continentale ~VII-VIII sec. d.C.", "es": "Protolengua reconstruida; separación estimada del japónico continental ~ss. VII-VIII d. C.", "pt": "protolíngua reconstruída; separação estimada do japônico continental ~séc. 7-8 d.C.", "ru": "реконструированный праязык; отделение от материковых японских ~7-8 вв. н. э.", "uk": "реконструйована прамова; відокремлення від материкових японських ~7-8 ст. н. е.", "ar": "لغة أم أولية مُعاد بناؤها؛ يُقدَّر انفصالها عن اليابونية البرية ~القرنين 7-8 م", "he": "פרוטו-שפה משוחזרת; היפרדות מוערכת מהיפונית היבשתית ~המאות ה-7-8 לספירה", "sw": "lugha-mama iliyoundwa upya; ilikadiriwa kutengana na Kijaponiki cha bara ~karne ya 7-8 BK"}, "Reconstructed proto-language; possibly spoken Bronze Age Korean Peninsula / Liaoning ~3rd millennium BCE": {"ja": "再建祖語；青銅器時代の朝鮮半島・遼寧で紀元前3千年紀頃に話された可能性", "ko": "재구된 조어; 기원전 3천년기경 청동기 시대 한반도·랴오닝에서 쓰였을 가능성", "zh": "构拟原始语；可能于约公元前3千纪青铜时代在朝鲜半岛／辽宁使用", "yue": "構擬原始語；可能於約公元前3千紀青銅時代在朝鮮半島／遼寧使用", "vi": "Ngôn ngữ nguyên thủy được tái dựng; có thể được nói ở bán đảo Triều Tiên / Liêu Ninh thời đại đồ đồng, khoảng thiên niên kỷ 3 TCN", "th": "ภาษาดั้งเดิมที่สร้างขึ้นใหม่; อาจพูดในคาบสมุทรเกาหลี / เหลียวหนิงยุคสำริด ราวสหัสวรรษที่ 3 ก่อน ค.ศ.", "id": "Proto-bahasa rekonstruksi; mungkin dituturkan di Semenanjung Korea / Liaoning Zaman Perunggu ~milenium ke-3 SM", "hi": "पुनर्निर्मित आद्य-भाषा; संभवतः कांस्य युग कोरियाई प्रायद्वीप / लियाओनिंग में ~तीसरी सहस्राब्दी ई.पू.", "de": "Rekonstruierte Protosprache; möglicherweise in der Bronzezeit auf der Koreanischen Halbinsel / in Liaoning gesprochen, ~3. Jt. v. Chr.", "fr": "Proto-langue reconstruite ; peut-être parlée à l'âge du bronze dans la péninsule coréenne / au Liaoning, ~IIIe millénaire av. J.-C.", "it": "Protolingua ricostruita; forse parlata nell'età del bronzo nella penisola coreana / Liaoning, ~III millennio a.C.", "es": "Protolengua reconstruida; posiblemente hablada en la Edad del Bronce en la península de Corea / Liaoning, ~III milenio a. C.", "pt": "protolíngua reconstruída; possivelmente falada na Idade do Bronze na Península Coreana / Liaoning ~3º milênio a.C.", "ru": "реконструированный праязык; возможно, бронзовый век, Корейский полуостров / Ляонин, ~3-е тыс. до н. э.", "uk": "реконструйована прамова; можливо, бронзова доба, Корейський півострів / Ляонін, ~3-тє тис. до н. е.", "ar": "لغة أم أولية مُعاد بناؤها؛ ربما تُحدِّث بها في العصر البرونزي في شبه الجزيرة الكورية / لياونينغ ~الألفية 3 ق.م", "he": "פרוטו-שפה משוחזרת; אולי דוברה בתקופת הברונזה בחצי האי הקוריאני / ליאונינג ~האלף ה-3 לפנה״ס", "sw": "lugha-mama iliyoundwa upya; huenda ilizungumzwa Enzi ya Shaba Rasi ya Korea / Liaoning ~milenia ya 3 KK"}, "Romania + Moldova + diaspora": {"ja": "ルーマニア＋モルドバ＋在外", "ko": "루마니아 + 몰도바 + 해외 동포", "zh": "罗马尼亚+摩尔多瓦+海外侨民", "yue": "羅馬尼亞+摩爾多瓦+海外僑民", "vi": "Romania + Moldova + kiều dân", "th": "โรมาเนีย + มอลโดวา + ชุมชนพลัดถิ่น", "id": "Rumania + Moldova + diaspora", "hi": "रोमानिया + मोल्दोवा + प्रवासी", "de": "Rumänien + Moldau + Diaspora", "fr": "Roumanie + Moldavie + diaspora", "it": "Romania + Moldavia + diaspora", "es": "Rumanía + Moldavia + diáspora", "pt": "Romênia + Moldávia + diáspora", "ru": "Румыния + Молдавия + диаспора", "uk": "Румунія + Молдова + діаспора", "ar": "رومانيا + مولدوفا + الشتات", "he": "רומניה + מולדובה + תפוצות", "sw": "Romania + Moldova + ughaibuni"}, "Russia ~10K + Azerbaijan ~3K": {"ja": "ロシア約1万＋アゼルバイジャン約3,000", "ko": "러시아 약 1만 + 아제르바이잔 약 3,000", "zh": "俄罗斯约1万+阿塞拜疆约3000", "yue": "俄羅斯約1萬+阿塞拜疆約3,000", "vi": "Nga ~10K + Azerbaijan ~3K", "th": "รัสเซีย ~10K + อาเซอร์ไบจาน ~3K", "id": "Rusia ~10 rb + Azerbaijan ~3 rb", "hi": "रूस ~10K + अज़रबैजान ~3K", "de": "Russland ~10.000 + Aserbaidschan ~3.000", "fr": "Russie ~10 000 + Azerbaïdjan ~3 000", "it": "Russia ~10.000 + Azerbaigian ~3.000", "es": "Rusia ~10 000 + Azerbaiyán ~3000", "pt": "Rússia ~10 mil + Azerbaijão ~3 mil", "ru": "Россия ~10 тыс. + Азербайджан ~3 тыс.", "uk": "Росія ~10 тис. + Азербайджан ~3 тис.", "ar": "روسيا ~10 آلاف + أذربيجان ~3 آلاف", "he": "רוסיה ~10 אלף + אזרבייג׳ן ~3,000", "sw": "Urusi elfu ~10 + Azerbaijan elfu ~3"}, "Russia ~37K + Turkey diaspora ~10K + small Jordan/Syria populations": {"ja": "ロシア約3万7,000＋トルコの在外者約1万＋ヨルダン・シリアに少数", "ko": "러시아 약 3만 7,000 + 튀르키예 이주민 약 1만 + 요르단·시리아에 소수", "zh": "俄罗斯约3.7万+土耳其侨民约1万+约旦/叙利亚少量人口", "yue": "俄羅斯約3.7萬+土耳其僑民約1萬+約旦／敘利亞少量人口", "vi": "Nga ~37K + kiều dân ở Thổ Nhĩ Kỳ ~10K + một ít ở Jordan/Syria", "th": "รัสเซีย ~37K + ชุมชนพลัดถิ่นในตุรกี ~10K + ประชากรเล็กน้อยในจอร์แดน/ซีเรีย", "id": "Rusia ~37 rb + diaspora Turki ~10 rb + populasi kecil di Yordania/Suriah", "hi": "रूस ~37K + तुर्की प्रवासी ~10K + जॉर्डन/सीरिया में छोटी आबादी", "de": "Russland ~37.000 + Diaspora in der Türkei ~10.000 + kleine Gruppen in Jordanien/Syrien", "fr": "Russie ~37 000 + diaspora en Turquie ~10 000 + petites populations en Jordanie/Syrie", "it": "Russia ~37.000 + diaspora in Turchia ~10.000 + piccole popolazioni in Giordania/Siria", "es": "Rusia ~37 000 + diáspora en Turquía ~10 000 + pequeñas poblaciones en Jordania/Siria", "pt": "Rússia ~37 mil + diáspora na Turquia ~10 mil + pequenas populações na Jordânia/Síria", "ru": "Россия ~37 тыс. + диаспора в Турции ~10 тыс. + небольшие группы в Иордании/Сирии", "uk": "Росія ~37 тис. + діаспора в Туреччині ~10 тис. + невеликі групи в Йорданії/Сирії", "ar": "روسيا ~37 ألف + شتات تركيا ~10 آلاف + أعداد صغيرة في الأردن/سوريا", "he": "רוסיה ~37 אלף + תפוצה בטורקיה ~10 אלף + קהילות קטנות בירדן/סוריה", "sw": "Urusi elfu ~37 + ughaibuni Uturuki elfu ~10 + wachache Jordan/Syria"}, "San Juan Mixtepec area; broader Mixtec varieties total ~500K but xtm is one specific variety": {"ja": "サン・フアン・ミシュテペク地域；ミシュテカ語諸変種全体は約50万だが xtm はその一変種", "ko": "산후안믹스테펙 지역; 믹스텍어 변종 전체는 약 50만이나 xtm은 그중 한 변종", "zh": "圣胡安米斯特佩克地区；米斯特克语各变体合计约50万，xtm仅为其中一种", "yue": "聖胡安米斯特佩克地區；米斯特克語各變體合計約50萬，xtm僅為其中一種", "vi": "Vùng San Juan Mixtepec; tổng các biến thể Mixtec ~500K nhưng xtm chỉ là một biến thể", "th": "พื้นที่ซานฮวนมิกซ์เตเปก; วิธภาษามิกซ์เทกทั้งหมดรวม ~500K แต่ xtm เป็นเพียงวิธภาษาหนึ่ง", "id": "Wilayah San Juan Mixtepec; total varietas Mixtek lebih luas ~500 rb, tetapi xtm adalah satu varietas tertentu", "hi": "सान ख़ुआन मिक्स्तेपेक क्षेत्र; व्यापक मिक्सटेक रूप कुल ~500K, पर xtm एक विशिष्ट रूप है", "de": "Gebiet San Juan Mixtepec; Mixtekisch insgesamt ~500.000, xtm ist jedoch eine einzelne Varietät", "fr": "région de San Juan Mixtepec ; l'ensemble des variétés mixtèques ~500 000, mais xtm est une variété précise", "it": "area di San Juan Mixtepec; le varietà mixteche nel complesso ~500.000, ma xtm è una varietà specifica", "es": "zona de San Juan Mixtepec; las variedades mixtecas en conjunto ~500 000, pero xtm es una variedad concreta", "pt": "região de San Juan Mixtepec; as variedades mixtecas somam ~500 mil, mas xtm é uma variedade específica", "ru": "район Сан-Хуан-Мистепек; все миштекские варианты ~500 тыс., но xtm — отдельный вариант", "uk": "район Сан-Хуан-Містепек; усі міштекські різновиди ~500 тис., але xtm — окремий різновид", "ar": "منطقة سان خوان ميكستيبيك؛ مجموع تنوعات الميكستيك ~500 ألف لكن xtm تنوع محدد", "he": "אזור סן חואן מישטפק; כלל ניבי המישטקית ~500 אלף, אך xtm הוא ניב מסוים", "sw": "eneo la San Juan Mixtepec; lahaja zote za Kimixteki jumla elfu ~500 lakini xtm ni lahaja moja mahususi"}, "Sino-Vietnamese pedagogical reading of Literary Chinese; active scholarly use in Vietnamese Han-Nôm studies, no native speaker community since 1919 abolition of civil-service exams": {"ja": "漢越音による漢文の教育的読法；ベトナムの漢喃研究で学術的に現用、1919年の科挙廃止以降は母語話者共同体なし", "ko": "한월음에 의한 한문 교육 독법; 베트남 한놈 연구에서 학술적으로 사용, 1919년 과거제 폐지 이후 모어 화자 공동체 없음", "zh": "汉越音文言文教学读音；在越南汉喃研究中用于学术，自1919年废除科举后无母语群体", "yue": "漢越音文言文教學讀音；在越南漢喃研究中用於學術，自1919年廢除科舉後無母語群體", "vi": "Cách đọc Hán văn bằng âm Hán Việt trong giáo dục; dùng trong nghiên cứu Hán Nôm, không có cộng đồng người bản ngữ từ khi bãi bỏ khoa cử năm 1919", "th": "การอ่านภาษาจีนคลาสสิกด้วยเสียงจีน-เวียดนามในการศึกษา; ใช้ทางวิชาการในการศึกษาฮั้นโนมของเวียดนาม ไม่มีชุมชนเจ้าของภาษานับแต่ยกเลิกการสอบขุนนางในปี 1919", "id": "Pembacaan Tionghoa Sastra secara Sino-Vietnam dalam pendidikan; dipakai aktif secara ilmiah dalam studi Hán-Nôm Vietnam, tanpa komunitas penutur asli sejak ujian negara dihapus pada 1919", "hi": "साहित्यिक चीनी का चीनी-वियतनामी शैक्षिक पठन; वियतनामी हान-नोम अध्ययन में सक्रिय विद्वत् उपयोग, 1919 में सिविल सेवा परीक्षाओं की समाप्ति के बाद से कोई मूल वक्ता समुदाय नहीं", "de": "Sinovietnamesische Schullesung des literarischen Chinesisch; aktive gelehrte Verwendung in der vietnamesischen Hán-Nôm-Forschung, keine muttersprachliche Gemeinschaft seit Abschaffung der Beamtenprüfungen 1919", "fr": "Lecture pédagogique sino-vietnamienne du chinois littéraire ; usage savant actif dans les études Hán-Nôm au Viêt Nam, sans communauté native depuis l'abolition des concours mandarinaux en 1919", "it": "Lettura didattica sino-vietnamita del cinese letterario; uso dotto attivo negli studi Hán-Nôm vietnamiti, nessuna comunità di parlanti nativi dall'abolizione degli esami imperiali nel 1919", "es": "Lectura pedagógica sinovietnamita del chino literario; uso erudito activo en los estudios Hán-Nôm de Vietnam, sin comunidad de hablantes nativos desde la abolición de los exámenes imperiales en 1919", "pt": "Leitura pedagógica sino-vietnamita do chinês literário; uso acadêmico ativo nos estudos Hán-Nôm vietnamitas, sem comunidade de falantes nativos desde a abolição dos exames imperiais em 1919", "ru": "Сино-вьетнамское учебное чтение литературного китайского; активное научное употребление во вьетнамском ханномоведении, без сообщества носителей с отмены экзаменов на чин в 1919 г.", "uk": "Сино-в'єтнамське навчальне читання літературної китайської; активне наукове вживання у в'єтнамських студіях ханьном, без спільноти носіїв від скасування державних іспитів 1919 р.", "ar": "قراءة تعليمية صينية فيتنامية للصينية الأدبية؛ استخدام علمي نشط في دراسات هان نوم الفيتنامية، بلا مجتمع ناطقين أصليين منذ إلغاء امتحانات الخدمة المدنية عام 1919", "he": "קריאה לימודית סינו-וייטנאמית של סינית ספרותית; שימוש מחקרי פעיל בלימודי האן-נום בווייטנאם, ללא קהילת דוברים ילידיים מאז ביטול בחינות שירות המדינה ב-1919", "sw": "Usomaji wa kufundishia wa Kichina cha Kifasihi kwa Kisino-Kivietnamu; matumizi hai ya kitaaluma katika masomo ya Hán-Nôm ya Vietnam, bila jamii ya wazawa tangu kufutwa kwa mitihani ya utumishi 1919"}, "South Korea ~52M + North Korea ~26M + diaspora; minimal L2": {"ja": "韓国約5,200万＋北朝鮮約2,600万＋在外；第二言語話者はごく少数", "ko": "대한민국 약 5,200만 + 북한 약 2,600만 + 해외 동포; 제2언어 화자는 극소수", "zh": "韩国约5200万+朝鲜约2600万+海外侨民；第二语言使用者极少", "yue": "南韓約5,200萬+北韓約2,600萬+海外僑民；第二語言使用者極少", "vi": "Hàn Quốc ~52M + Triều Tiên ~26M + kiều dân; rất ít người nói như ngôn ngữ thứ hai", "th": "เกาหลีใต้ ~52M + เกาหลีเหนือ ~26M + ชุมชนพลัดถิ่น; ผู้พูดเป็นภาษาที่สองมีน้อยมาก", "id": "Korea Selatan ~52 jt + Korea Utara ~26 jt + diaspora; L2 minimal", "hi": "दक्षिण कोरिया ~52M + उत्तर कोरिया ~26M + प्रवासी; नगण्य L2", "de": "Südkorea ~52 Mio. + Nordkorea ~26 Mio. + Diaspora; kaum L2", "fr": "Corée du Sud ~52 M + Corée du Nord ~26 M + diaspora ; L2 minime", "it": "Corea del Sud ~52 Mln + Corea del Nord ~26 Mln + diaspora; L2 minima", "es": "Corea del Sur ~52 M + Corea del Norte ~26 M + diáspora; L2 mínima", "pt": "Coreia do Sul ~52 mi + Coreia do Norte ~26 mi + diáspora; L2 mínimo", "ru": "Южная Корея ~52 млн + КНДР ~26 млн + диаспора; как второй язык — мало", "uk": "Південна Корея ~52 млн + КНДР ~26 млн + діаспора; як друга мова — мало", "ar": "كوريا الجنوبية ~52 مليون + كوريا الشمالية ~26 مليون + الشتات؛ قلة كلغة ثانية", "he": "דרום קוריאה ~52 מיליון + צפון קוריאה ~26 מיליון + תפוצות; מעט דוברי שפה שנייה", "sw": "Korea Kusini milioni ~52 + Korea Kaskazini milioni ~26 + ughaibuni; L2 wachache sana"}, "Spain + EU residents; world Spanish L1 ≈ 500M aggregated across all varieties": {"ja": "スペイン＋EU在住者；世界のスペイン語母語話者は全変種合計≈5億", "ko": "스페인 + EU 거주자; 전 세계 스페인어 모어 화자는 모든 변종 합계 ≈ 5억", "zh": "西班牙+欧盟居民；全球西班牙语各变体母语者合计≈5亿", "yue": "西班牙+歐盟居民；全球西班牙語各變體母語者合計≈5億", "vi": "Tây Ban Nha + cư dân EU; tổng người nói tiếng Tây Ban Nha như tiếng mẹ đẻ mọi biến thể toàn cầu ≈ 500M", "th": "สเปน + ผู้พำนักในสหภาพยุโรป; ผู้พูดภาษาสเปนเป็นภาษาแม่ทั่วโลกรวมทุกวิธภาษา ≈ 500M", "id": "Spanyol + penduduk UE; L1 Spanyol dunia ≈ 500 jt gabungan semua varietas", "hi": "स्पेन + यूरोपीय संघ निवासी; सभी रूपों में कुल विश्व स्पेनिश L1 ≈ 500M", "de": "Spanien + EU-Einwohner; weltweite spanische L1 ≈ 500 Mio. über alle Varietäten", "fr": "Espagne + résidents UE ; L1 de l'espagnol dans le monde ≈ 500 M, toutes variétés", "it": "Spagna + residenti UE; L1 di spagnolo nel mondo ≈ 500 Mln, tutte le varietà", "es": "España + residentes de la UE; español L1 mundial ≈ 500 M en todas las variedades", "pt": "Espanha + residentes na UE; L1 mundial do espanhol ≈ 500 mi somando todas as variedades", "ru": "Испания + жители ЕС; всего носителей испанского в мире ≈ 500 млн по всем вариантам", "uk": "Іспанія + мешканці ЄС; усього носіїв іспанської у світі ≈ 500 млн за всіма різновидами", "ar": "إسبانيا + مقيمون في الاتحاد الأوروبي؛ مجموع الناطقين بالإسبانية كلغة أم في العالم ≈ 500 مليون بكل تنوعاتها", "he": "ספרד + תושבי האיחוד האירופי; סך דוברי ספרדית כשפת אם בעולם ≈ 500 מיליון בכל הניבים", "sw": "Hispania + wakazi wa EU; L1 wa Kihispania duniani ≈ milioni 500 kwa lahaja zote"}, "Suriname Saramaccan ~22K + Matawai/Kwinti partial dialects + ~5K diaspora": {"ja": "スリナムのサラマッカ語約2万2,000＋マタワイ・クウィンティ方言（部分的）＋在外約5,000", "ko": "수리남 사라마카어 약 2만 2,000 + 마타와이·크윈티 방언(부분) + 해외 동포 약 5,000", "zh": "苏里南萨拉马卡语约2.2万+马塔瓦伊/昆蒂部分方言+海外侨民约5000", "yue": "蘇里南薩拉馬卡語約2.2萬+馬塔瓦伊／昆蒂部分方言+海外僑民約5,000", "vi": "Saramaccan ở Suriname ~22K + một phần phương ngữ Matawai/Kwinti + ~5K kiều dân", "th": "ภาษาซารามักกันในซูรินาม ~22K + ภาษาถิ่นมาตาไว/ควินตีบางส่วน + ชุมชนพลัดถิ่น ~5K", "id": "Suriname: Saramaccan ~22 rb + dialek parsial Matawai/Kwinti + ~5 rb diaspora", "hi": "सूरीनाम सरामक्कन ~22K + मतावाई/क्विंती आंशिक बोलियाँ + ~5K प्रवासी", "de": "Suriname: Saramaccanisch ~22.000 + Teildialekte Matawai/Kwinti + ~5.000 Diaspora", "fr": "Suriname : saramaccan ~22 000 + dialectes partiels matawai/kwinti + ~5 000 en diaspora", "it": "Suriname: saramaccano ~22.000 + dialetti parziali matawai/kwinti + ~5.000 in diaspora", "es": "Surinam: saramacano ~22 000 + dialectos parciales matawai/kwinti + ~5000 en la diáspora", "pt": "Suriname: saramacano ~22 mil + dialetos parciais matawai/kwinti + ~5 mil na diáspora", "ru": "Суринам: сарамакканский ~22 тыс. + частично диалекты матавай/квинти + ~5 тыс. в диаспоре", "uk": "Суринам: сарамаканська ~22 тис. + частково діалекти матавай/квінті + ~5 тис. у діаспорі", "ar": "سورينام: الساراماكا ~22 ألف + لهجتا ماتاواي/كوينتي جزئيًا + ~5 آلاف في الشتات", "he": "סורינאם: סרמקאנית ~22 אלף + ניבי מטוואי/קווינטי חלקית + ~5,000 בתפוצות", "sw": "Suriname: Kisaramaka elfu ~22 + lahaja za Matawai/Kwinti kwa sehemu + elfu ~5 ughaibuni"}, "Suriname Tapanahony River + ~15K in French Guiana": {"ja": "スリナムのタパナホニ川流域＋フランス領ギアナに約1万5,000", "ko": "수리남 타파나호니강 유역 + 프랑스령 기아나 약 1만 5,000", "zh": "苏里南塔帕纳霍尼河流域+法属圭亚那约1.5万", "yue": "蘇里南塔帕納霍尼河流域+法屬圭亞那約1.5萬", "vi": "Sông Tapanahony, Suriname + ~15K ở Guyane thuộc Pháp", "th": "ลุ่มแม่น้ำตาปานาโฮนี ซูรินาม + ~15K ในเฟรนช์เกียนา", "id": "Suriname, Sungai Tapanahony + ~15 rb di Guyana Prancis", "hi": "सूरीनाम तपानाहोनी नदी + फ़्रेंच गयाना में ~15K", "de": "Suriname, Tapanahony-Fluss + ~15.000 in Französisch-Guayana", "fr": "Suriname, fleuve Tapanahony + ~15 000 en Guyane", "it": "Suriname, fiume Tapanahony + ~15.000 nella Guyana francese", "es": "Surinam, río Tapanahony + ~15 000 en la Guayana Francesa", "pt": "Suriname, rio Tapanahony + ~15 mil na Guiana Francesa", "ru": "Суринам, река Тапанахони + ~15 тыс. во Французской Гвиане", "uk": "Суринам, річка Тапанахоні + ~15 тис. у Французькій Гвіані", "ar": "سورينام، نهر تاباناهوني + ~15 ألف في غويانا الفرنسية", "he": "סורינאם, נהר טפנהוני + ~15 אלף בגיאנה הצרפתית", "sw": "Suriname, mto Tapanahony + elfu ~15 Guiana ya Kifaransa"}, "Sweden + Finland (Swedish-speaking minority) + diaspora": {"ja": "スウェーデン＋フィンランド（スウェーデン語系少数派）＋在外", "ko": "스웨덴 + 핀란드(스웨덴어 사용 소수민) + 해외 동포", "zh": "瑞典+芬兰（瑞典语少数群体）+海外侨民", "yue": "瑞典+芬蘭（瑞典語少數群體）+海外僑民", "vi": "Thụy Điển + Phần Lan (thiểu số nói tiếng Thụy Điển) + kiều dân", "th": "สวีเดน + ฟินแลนด์ (ชนกลุ่มน้อยที่พูดภาษาสวีเดน) + ชุมชนพลัดถิ่น", "id": "Swedia + Finlandia (minoritas berbahasa Swedia) + diaspora", "hi": "स्वीडन + फ़िनलैंड (स्वीडिश-भाषी अल्पसंख्यक) + प्रवासी", "de": "Schweden + Finnland (schwedischsprachige Minderheit) + Diaspora", "fr": "Suède + Finlande (minorité suédophone) + diaspora", "it": "Svezia + Finlandia (minoranza svedesofona) + diaspora", "es": "Suecia + Finlandia (minoría suecohablante) + diáspora", "pt": "Suécia + Finlândia (minoria sueco-falante) + diáspora", "ru": "Швеция + Финляндия (шведоязычное меньшинство) + диаспора", "uk": "Швеція + Фінляндія (шведськомовна меншина) + діаспора", "ar": "السويد + فنلندا (أقلية ناطقة بالسويدية) + الشتات", "he": "שוודיה + פינלנד (מיעוט דובר שוודית) + תפוצות", "sw": "Uswidi + Ufini (wachache wanaozungumza Kiswidi) + ughaibuni"}, "Teochew Min; lower bound only": {"ja": "潮州語（閩語）；下限値のみ", "ko": "차오저우어(민어); 하한값만", "zh": "潮州话（闽语）；仅为下限", "yue": "潮州話（閩語）；僅為下限", "vi": "Tiếng Triều Châu (Mân); chỉ là cận dưới", "th": "ภาษาแต้จิ๋ว (หมิ่น); เป็นค่าขั้นต่ำเท่านั้น", "id": "Min Teochew; hanya batas bawah", "hi": "तेओचू मिन; केवल न्यूनतम सीमा", "de": "Teochew-Min; nur Untergrenze", "fr": "min teochew ; borne inférieure seulement", "it": "min teochew; solo limite inferiore", "es": "min teochew; solo límite inferior", "pt": "min teochew; apenas limite inferior", "ru": "теочью (миньский); только нижняя граница", "uk": "теочью (міньська); лише нижня межа", "ar": "التيوتشو (مين)؛ الحد الأدنى فقط", "he": "טאוצ׳יו (מין); גבול תחתון בלבד", "sw": "Kiteochew (Min); kiwango cha chini tu"}, "Thailand; small Lao border populations": {"ja": "タイ；ラオス国境地帯に少数", "ko": "태국; 라오스 국경 지역에 소수", "zh": "泰国；老挝边境有少量人口", "yue": "泰國；老撾邊境有少量人口", "vi": "Thái Lan; một ít cư dân vùng biên Lào", "th": "ไทย; ประชากรเล็กน้อยในชายแดนลาว", "id": "Thailand; populasi kecil di perbatasan Laos", "hi": "थाईलैंड; लाओस सीमा पर छोटी आबादी", "de": "Thailand; kleine Gruppen an der Grenze zu Laos", "fr": "Thaïlande ; petites populations frontalières au Laos", "it": "Thailandia; piccole popolazioni di confine in Laos", "es": "Tailandia; pequeñas poblaciones fronterizas en Laos", "pt": "Tailândia; pequenas populações na fronteira com o Laos", "ru": "Таиланд; небольшие группы в пограничье Лаоса", "uk": "Таїланд; невеликі групи в прикордонні Лаосу", "ar": "تايلاند؛ أعداد صغيرة على حدود لاوس", "he": "תאילנד; אוכלוסיות קטנות בגבול לאוס", "sw": "Thailand; wachache mpakani mwa Laos"}, "Toi-Saan/Sze Yap; lower bound only": {"ja": "台山語／四邑語；下限値のみ", "ko": "타이산어/쓰이어; 하한값만", "zh": "台山话／四邑话；仅为下限", "yue": "台山話／四邑話；僅為下限", "vi": "Tiếng Đài Sơn/Tứ Ấp; chỉ là cận dưới", "th": "ภาษาไถชาน/ซื่ออี้; เป็นค่าขั้นต่ำเท่านั้น", "id": "Toi-Saan/Sze Yap; hanya batas bawah", "hi": "तोइ-सान/सी याप; केवल न्यूनतम सीमा", "de": "Toi-Saan/Sze Yap; nur Untergrenze", "fr": "toishanais/sze yap ; borne inférieure seulement", "it": "toi-saan/sze yap; solo limite inferiore", "es": "toi-saan/sze yap; solo límite inferior", "pt": "toisanês/sze yap; apenas limite inferior", "ru": "тайшаньский/сыи; только нижняя граница", "uk": "тайшаньська/сиї; лише нижня межа", "ar": "التايشانية/سي ياب؛ الحد الأدنى فقط", "he": "טאישאנית/סי יאפ; גבול תחתון בלבד", "sw": "Kitoisan/Sze Yap; kiwango cha chini tu"}, "Truku ~25K + Seediq ~5K daily L1": {"ja": "タロコ語約2万5,000＋セデック語約5,000（日常的な母語話者）", "ko": "타로코어 약 2만 5,000 + 시디그어 약 5,000(일상 모어 화자)", "zh": "太鲁阁语约2.5万+赛德克语约5000（日常母语使用者）", "yue": "太魯閣語約2.5萬+賽德克語約5,000（日常母語使用者）", "vi": "Truku ~25K + Seediq ~5K nói tiếng mẹ đẻ hằng ngày", "th": "ทรูกู ~25K + เซเดก ~5K ผู้พูดเป็นภาษาแม่ในชีวิตประจำวัน", "id": "Truku ~25 rb + Seediq ~5 rb L1 harian", "hi": "तरुको ~25K + सेदिक ~5K दैनिक L1", "de": "Truku ~25.000 + Seediq ~5.000 tägliche L1", "fr": "truku ~25 000 + seediq ~5 000 L1 au quotidien", "it": "truku ~25.000 + seediq ~5.000 L1 quotidiana", "es": "truku ~25 000 + seediq ~5000 L1 cotidiana", "pt": "truku ~25 mil + seediq ~5 mil L1 de uso diário", "ru": "труку ~25 тыс. + сейдик ~5 тыс. ежедневно как родной", "uk": "труку ~25 тис. + седік ~5 тис. щодня як рідна", "ar": "تروكو ~25 ألف + سيديك ~5 آلاف لغة أم يومية", "he": "טרוקו ~25 אלף + סדיק ~5,000 שפת אם יומיומית", "sw": "Truku elfu ~25 + Seediq elfu ~5 L1 ya kila siku"}, "Tupe ~600 + Cachuy ~100; some sources estimate up to ~2,000 including weak speakers": {"ja": "トゥペ約600＋カチュイ約100；運用力の低い話者を含め最大約2,000とする資料もある", "ko": "투페 약 600 + 카추이 약 100; 미숙한 화자를 포함해 최대 약 2,000으로 추정하는 자료도 있음", "zh": "图佩约600+卡丘伊约100；部分资料含能力较弱者估计最多约2000", "yue": "圖佩約600+卡丘伊約100；部分資料包括能力較弱者估計最多約2,000", "vi": "Tupe ~600 + Cachuy ~100; một số nguồn ước tính đến ~2.000 kể cả người nói kém", "th": "ตูเป ~600 + กาชุย ~100; บางแหล่งประมาณถึง ~2,000 รวมผู้พูดไม่คล่อง", "id": "Tupe ~600 + Cachuy ~100; beberapa sumber memperkirakan hingga ~2.000 termasuk penutur lemah", "hi": "तुपे ~600 + काचुई ~100; कुछ स्रोत कमज़ोर वक्ताओं सहित ~2,000 तक अनुमानित करते हैं", "de": "Tupe ~600 + Cachuy ~100; manche Quellen schätzen bis ~2.000 inkl. schwacher Sprecher", "fr": "Tupe ~600 + Cachuy ~100 ; certaines sources estiment jusqu'à ~2 000 avec les locuteurs faibles", "it": "Tupe ~600 + Cachuy ~100; alcune fonti stimano fino a ~2.000 inclusi i parlanti deboli", "es": "Tupe ~600 + Cachuy ~100; algunas fuentes estiman hasta ~2000 incluidos hablantes débiles", "pt": "tupe ~600 + cachuy ~100; algumas fontes estimam até ~2.000 incluindo falantes fracos", "ru": "тупе ~600 + качуй ~100; по некоторым оценкам до ~2000 с учётом слабо владеющих", "uk": "тупе ~600 + качуй ~100; за деякими оцінками до ~2000 з урахуванням тих, хто слабко володіє", "ar": "توبي ~600 + كاتشوي ~100؛ تقدّر بعض المصادر حتى ~2,000 مع ضعيفي الإتقان", "he": "טופה ~600 + קצ׳וי ~100; יש מקורות המעריכים עד ~2,000 כולל דוברים חלשים", "sw": "Tupe ~600 + Cachuy ~100; vyanzo vingine vinakadiria hadi ~2,000 pamoja na wasio fasaha"}, "Turkey + Cyprus + diaspora; minimal L2": {"ja": "トルコ＋キプロス＋在外；第二言語話者はごく少数", "ko": "튀르키예 + 키프로스 + 해외 동포; 제2언어 화자는 극소수", "zh": "土耳其+塞浦路斯+海外侨民；第二语言使用者极少", "yue": "土耳其+塞浦路斯+海外僑民；第二語言使用者極少", "vi": "Thổ Nhĩ Kỳ + Síp + kiều dân; rất ít người nói như ngôn ngữ thứ hai", "th": "ตุรกี + ไซปรัส + ชุมชนพลัดถิ่น; ผู้พูดเป็นภาษาที่สองมีน้อยมาก", "id": "Turki + Siprus + diaspora; L2 minimal", "hi": "तुर्की + साइप्रस + प्रवासी; नगण्य L2", "de": "Türkei + Zypern + Diaspora; kaum L2", "fr": "Turquie + Chypre + diaspora ; L2 minime", "it": "Turchia + Cipro + diaspora; L2 minima", "es": "Turquía + Chipre + diáspora; L2 mínima", "pt": "Turquia + Chipre + diáspora; L2 mínimo", "ru": "Турция + Кипр + диаспора; как второй язык — мало", "uk": "Туреччина + Кіпр + діаспора; як друга мова — мало", "ar": "تركيا + قبرص + الشتات؛ قلة كلغة ثانية", "he": "טורקיה + קפריסין + תפוצות; מעט דוברי שפה שנייה", "sw": "Uturuki + Kupro + ughaibuni; L2 wachache sana"}, "Turkey homeland ~20K + Sweden 50K + Germany 30K + Netherlands 10K + USA/Australia 10K": {"ja": "故地トルコ約2万＋スウェーデン5万＋ドイツ3万＋オランダ1万＋米国・オーストラリア1万", "ko": "본고장 튀르키예 약 2만 + 스웨덴 5만 + 독일 3만 + 네덜란드 1만 + 미국·호주 1만", "zh": "土耳其故土约2万+瑞典5万+德国3万+荷兰1万+美国/澳大利亚1万", "yue": "土耳其故土約2萬+瑞典5萬+德國3萬+荷蘭1萬+美國／澳洲1萬", "vi": "Quê gốc Thổ Nhĩ Kỳ ~20K + Thụy Điển 50K + Đức 30K + Hà Lan 10K + Mỹ/Úc 10K", "th": "ถิ่นเดิมในตุรกี ~20K + สวีเดน 50K + เยอรมนี 30K + เนเธอร์แลนด์ 10K + สหรัฐฯ/ออสเตรเลีย 10K", "id": "Tanah asal Turki ~20 rb + Swedia 50 rb + Jerman 30 rb + Belanda 10 rb + AS/Australia 10 rb", "hi": "तुर्की मूल क्षेत्र ~20K + स्वीडन 50K + जर्मनी 30K + नीदरलैंड 10K + अमेरिका/ऑस्ट्रेलिया 10K", "de": "Heimat Türkei ~20.000 + Schweden 50.000 + Deutschland 30.000 + Niederlande 10.000 + USA/Australien 10.000", "fr": "Turquie (berceau) ~20 000 + Suède 50 000 + Allemagne 30 000 + Pays-Bas 10 000 + États-Unis/Australie 10 000", "it": "Turchia (terra d'origine) ~20.000 + Svezia 50.000 + Germania 30.000 + Paesi Bassi 10.000 + USA/Australia 10.000", "es": "Turquía (tierra natal) ~20 000 + Suecia 50 000 + Alemania 30 000 + Países Bajos 10 000 + EE. UU./Australia 10 000", "pt": "terra natal na Turquia ~20 mil + Suécia 50 mil + Alemanha 30 mil + Países Baixos 10 mil + EUA/Austrália 10 mil", "ru": "историческая родина в Турции ~20 тыс. + Швеция 50 тыс. + Германия 30 тыс. + Нидерланды 10 тыс. + США/Австралия 10 тыс.", "uk": "історична батьківщина в Туреччині ~20 тис. + Швеція 50 тис. + Німеччина 30 тис. + Нідерланди 10 тис. + США/Австралія 10 тис.", "ar": "الموطن في تركيا ~20 ألف + السويد 50 ألف + ألمانيا 30 ألف + هولندا 10 آلاف + الولايات المتحدة/أستراليا 10 آلاف", "he": "מולדת בטורקיה ~20 אלף + שוודיה 50 אלף + גרמניה 30 אלף + הולנד 10 אלף + ארה״ב/אוסטרליה 10 אלף", "sw": "nchi asili Uturuki elfu ~20 + Uswidi elfu 50 + Ujerumani elfu 30 + Uholanzi elfu 10 + Marekani/Australia elfu 10"}, "UNESCO: critically endangered": {"ja": "UNESCO：極めて深刻", "ko": "유네스코: 극심한 위기", "zh": "联合国教科文组织：极度危险", "yue": "聯合國教科文組織：極度危險", "vi": "UNESCO: cực kỳ nguy cấp", "th": "ยูเนสโก: ใกล้สูญหายขั้นวิกฤต", "id": "UNESCO: sangat kritis terancam", "hi": "UNESCO: अति संकटग्रस्त", "de": "UNESCO: vom Aussterben bedroht", "fr": "UNESCO : en situation critique", "it": "UNESCO: in pericolo critico", "es": "UNESCO: en situación crítica", "pt": "UNESCO: criticamente ameaçada", "ru": "ЮНЕСКО: в критическом состоянии", "uk": "ЮНЕСКО: у критичному стані", "ar": "اليونسكو: مهددة بشكل حرج", "he": "אונסק״ו: בסכנה קריטית", "sw": "UNESCO: hatarini mno"}, "UNESCO: definitely endangered": {"ja": "UNESCO：危険", "ko": "유네스코: 확실한 위기", "zh": "联合国教科文组织：确有危险", "yue": "聯合國教科文組織：確有危險", "vi": "UNESCO: chắc chắn nguy cấp", "th": "ยูเนสโก: ใกล้สูญหายแน่นอน", "id": "UNESCO: pasti terancam", "hi": "UNESCO: निश्चित रूप से संकटग्रस्त", "de": "UNESCO: definitiv gefährdet", "fr": "UNESCO : en danger", "it": "UNESCO: sicuramente in pericolo", "es": "UNESCO: claramente amenazada", "pt": "UNESCO: definitivamente ameaçada", "ru": "ЮНЕСКО: под угрозой", "uk": "ЮНЕСКО: під загрозою", "ar": "اليونسكو: مهددة بالتأكيد", "he": "אונסק״ו: בסכנה ודאית", "sw": "UNESCO: hatarini dhahiri"}, "UNESCO: severely endangered": {"ja": "UNESCO：重大な危険", "ko": "유네스코: 심각한 위기", "zh": "联合国教科文组织：严重危险", "yue": "聯合國教科文組織：嚴重危險", "vi": "UNESCO: nguy cấp nghiêm trọng", "th": "ยูเนสโก: ใกล้สูญหายอย่างรุนแรง", "id": "UNESCO: sangat terancam", "hi": "UNESCO: गंभीर रूप से संकटग्रस्त", "de": "UNESCO: ernsthaft gefährdet", "fr": "UNESCO : sérieusement en danger", "it": "UNESCO: gravemente in pericolo", "es": "UNESCO: seriamente amenazada", "pt": "UNESCO: severamente ameaçada", "ru": "ЮНЕСКО: в серьёзной опасности", "uk": "ЮНЕСКО: у серйозній небезпеці", "ar": "اليونسكو: مهددة بشدة", "he": "אונסק״ו: בסכנה חמורה", "sw": "UNESCO: hatarini sana"}, "Ukraine + diaspora; pre-2022 estimate, war displacement may revise downward": {"ja": "ウクライナ＋在外；2022年以前の推計、戦争による避難で下方修正の可能性", "ko": "우크라이나 + 해외 동포; 2022년 이전 추정치, 전쟁 피란으로 하향 조정될 수 있음", "zh": "乌克兰+海外侨民；2022年前的估计，战争导致的流离失所可能使其下调", "yue": "烏克蘭+海外僑民；2022年前的估計，戰爭導致的流離失所可能使其下調", "vi": "Ukraina + kiều dân; ước tính trước 2022, tình trạng di tản do chiến tranh có thể khiến con số giảm", "th": "ยูเครน + ชุมชนพลัดถิ่น; ตัวเลขก่อนปี 2022 การพลัดถิ่นจากสงครามอาจทำให้ปรับลดลง", "id": "Ukraina + diaspora; perkiraan sebelum 2022, pengungsian akibat perang dapat menurunkannya", "hi": "यूक्रेन + प्रवासी; 2022 से पहले का अनुमान, युद्ध-विस्थापन से संख्या घट सकती है", "de": "Ukraine + Diaspora; Schätzung vor 2022, kriegsbedingte Vertreibung kann sie nach unten korrigieren", "fr": "Ukraine + diaspora ; estimation d'avant 2022, les déplacements dus à la guerre pourraient la réduire", "it": "Ucraina + diaspora; stima pre-2022, lo sfollamento bellico può ridurla", "es": "Ucrania + diáspora; estimación anterior a 2022, el desplazamiento por la guerra puede reducirla", "pt": "Ucrânia + diáspora; estimativa anterior a 2022, o deslocamento pela guerra pode reduzi-la", "ru": "Украина + диаспора; оценка до 2022 г., из-за военного перемещения может быть пересмотрена в сторону снижения", "uk": "Україна + діаспора; оцінка до 2022 р., через воєнне переміщення може бути переглянута в бік зменшення", "ar": "أوكرانيا + الشتات؛ تقدير ما قبل 2022، وقد يخفّضه النزوح بسبب الحرب", "he": "אוקראינה + תפוצות; הערכה מלפני 2022, העקירה בשל המלחמה עשויה להוריד אותה", "sw": "Ukraine + ughaibuni; makadirio ya kabla ya 2022, uhamishwaji wa vita huenda ukayapunguza"}, "Venezuela ~26K + small Guyana/Suriname border populations": {"ja": "ベネズエラ約2万6,000＋ガイアナ・スリナム国境地帯に少数", "ko": "베네수엘라 약 2만 6,000 + 가이아나·수리남 국경 지역에 소수", "zh": "委内瑞拉约2.6万+圭亚那/苏里南边境少量人口", "yue": "委內瑞拉約2.6萬+圭亞那／蘇里南邊境少量人口", "vi": "Venezuela ~26K + một ít cư dân vùng biên Guyana/Suriname", "th": "เวเนซุเอลา ~26K + ประชากรเล็กน้อยในชายแดนกายอานา/ซูรินาม", "id": "Venezuela ~26 rb + populasi kecil di perbatasan Guyana/Suriname", "hi": "वेनेज़ुएला ~26K + गुयाना/सूरीनाम सीमा पर छोटी आबादी", "de": "Venezuela ~26.000 + kleine Grenzgruppen in Guyana/Suriname", "fr": "Venezuela ~26 000 + petites populations frontalières au Guyana/Suriname", "it": "Venezuela ~26.000 + piccole popolazioni di confine in Guyana/Suriname", "es": "Venezuela ~26 000 + pequeñas poblaciones fronterizas en Guyana/Surinam", "pt": "Venezuela ~26 mil + pequenas populações na fronteira Guiana/Suriname", "ru": "Венесуэла ~26 тыс. + небольшие группы в пограничье Гайаны/Суринама", "uk": "Венесуела ~26 тис. + невеликі групи в прикордонні Гаяни/Суринаму", "ar": "فنزويلا ~26 ألف + أعداد صغيرة على حدود غيانا/سورينام", "he": "ונצואלה ~26 אלף + אוכלוסיות קטנות בגבול גיאנה/סורינאם", "sw": "Venezuela elfu ~26 + wachache mpakani mwa Guyana/Suriname"}, "Venezuela ~3K + Brazil ~3K": {"ja": "ベネズエラ約3,000＋ブラジル約3,000", "ko": "베네수엘라 약 3,000 + 브라질 약 3,000", "zh": "委内瑞拉约3000+巴西约3000", "yue": "委內瑞拉約3,000+巴西約3,000", "vi": "Venezuela ~3K + Brazil ~3K", "th": "เวเนซุเอลา ~3K + บราซิล ~3K", "id": "Venezuela ~3 rb + Brasil ~3 rb", "hi": "वेनेज़ुएला ~3K + ब्राज़ील ~3K", "de": "Venezuela ~3.000 + Brasilien ~3.000", "fr": "Venezuela ~3 000 + Brésil ~3 000", "it": "Venezuela ~3.000 + Brasile ~3.000", "es": "Venezuela ~3000 + Brasil ~3000", "pt": "Venezuela ~3 mil + Brasil ~3 mil", "ru": "Венесуэла ~3 тыс. + Бразилия ~3 тыс.", "uk": "Венесуела ~3 тис. + Бразилія ~3 тис.", "ar": "فنزويلا ~3 آلاف + البرازيل ~3 آلاف", "he": "ונצואלה ~3,000 + ברזיל ~3,000", "sw": "Venezuela elfu ~3 + Brazil elfu ~3"}, "Veracruz; total Nahuan speakers ~1.7M across all 30+ varieties": {"ja": "ベラクルス州；ナワ語群全体の話者は30以上の変種で約170万", "ko": "베라크루스주; 나와어군 전체 화자는 30여 개 변종에 걸쳐 약 170만", "zh": "韦拉克鲁斯州；纳瓦语支30多个变体的使用者共约170万", "yue": "韋拉克魯斯州；納瓦語支30多個變體的使用者共約170萬", "vi": "Veracruz; tổng người nói nhóm Nahua ~1.7M qua hơn 30 biến thể", "th": "เบรากรุซ; ผู้พูดกลุ่มภาษานาวาทั้งหมด ~1.7M ใน 30+ วิธภาษา", "id": "Veracruz; total penutur Nahua ~1,7 jt di 30+ varietas", "hi": "वेराक्रूज़; सभी 30+ रूपों में कुल नाहुआ वक्ता ~1.7M", "de": "Veracruz; Nahua-Sprecher gesamt ~1,7 Mio. über alle 30+ Varietäten", "fr": "Veracruz ; locuteurs nahuas au total ~1,7 M sur plus de 30 variétés", "it": "Veracruz; parlanti nahua in totale ~1,7 Mln su oltre 30 varietà", "es": "Veracruz; hablantes de náhuatl en total ~1,7 M en más de 30 variedades", "pt": "Veracruz; total de falantes de náuatle ~1,7 mi em todas as 30+ variedades", "ru": "Веракрус; всего носителей науатлских ~1,7 млн во всех 30+ вариантах", "uk": "Веракрус; усього мовців науатльських ~1,7 млн в усіх 30+ різновидах", "ar": "فيراكروز؛ مجموع متحدثي الناواتل ~1.7 مليون في 30+ تنوعًا", "he": "ורקרוס; סך דוברי הנאוואטל ~1.7 מיליון בכל 30+ הניבים", "sw": "Veracruz; jumla ya wazungumzaji wa Kinahuatl milioni ~1.7 katika lahaja zote 30+"}, "Wa proper ~1M; total Palaungic-related ~2M": {"ja": "ワ語本体約100万；関連するパラウン語群全体約200万", "ko": "와어 본류 약 100만; 관련 팔라웅어군 전체 약 200만", "zh": "佤语本体约100万；相关佤德昂语支合计约200万", "yue": "佤語本體約100萬；相關佤德昂語支合計約200萬", "vi": "Tiếng Wa chính ~1M; tổng nhóm Palaung liên quan ~2M", "th": "ภาษาว้าแท้ ~1M; กลุ่มภาษาปะหล่องที่เกี่ยวข้องรวม ~2M", "id": "Wa inti ~1 jt; total terkait Palaung ~2 jt", "hi": "वा मुख्य ~1M; कुल पलाउंगिक-संबंधित ~2M", "de": "Wa im engeren Sinn ~1 Mio.; palaungisch verwandte gesamt ~2 Mio.", "fr": "wa proprement dit ~1 M ; ensemble palaungique apparenté ~2 M", "it": "wa propriamente detto ~1 Mln; totale palaungico affine ~2 Mln", "es": "wa propiamente dicho ~1 M; total palaúngico afín ~2 M", "pt": "wa propriamente dito ~1 mi; total palaungico aparentado ~2 mi", "ru": "собственно ва ~1 млн; всего родственных палаунгских ~2 млн", "uk": "власне ва ~1 млн; усього споріднених палаунзьких ~2 млн", "ar": "الوا الأصلية ~1 مليون؛ مجموع اللغات البالاونغية القريبة ~2 مليون", "he": "וה עצמה ~1 מיליון; סך שפות פלאונגיות קרובות ~2 מיליון", "sw": "Kiwa chenyewe milioni ~1; jumla ya lugha za Kipalaung zinazohusiana milioni ~2"}, "Western Pwo + Eastern Pwo + Phlong combined; UNESCO classifies Western Pwo as vulnerable due to ongoing Burmese/Thai pressure": {"ja": "西ポー・カレン語＋東ポー・カレン語＋プロン語の合計；UNESCOはビルマ語・タイ語の圧力により西ポーを「脆弱」に分類", "ko": "서포카렌어 + 동포카렌어 + 플롱어 합계; 유네스코는 버마어·타이어의 지속적 압력으로 서포카렌어를 '취약'으로 분류", "zh": "西部波克伦语+东部波克伦语+普隆语合计；因缅甸语/泰语的持续压力，联合国教科文组织将西部波克伦语列为“脆弱”", "yue": "西部波克倫語+東部波克倫語+普隆語合計；因緬甸語／泰語的持續壓力，聯合國教科文組織將西部波克倫語列為「脆弱」", "vi": "Gộp Pwo Tây + Pwo Đông + Phlong; UNESCO xếp Pwo Tây vào loại dễ bị tổn thương do áp lực liên tục từ tiếng Miến/tiếng Thái", "th": "รวมโพตะวันตก + โพตะวันออก + โผล่ง; ยูเนสโกจัดโพตะวันตกเป็นเปราะบางเพราะแรงกดดันต่อเนื่องจากภาษาพม่า/ไทย", "id": "Pwo Barat + Pwo Timur + Phlong digabung; UNESCO menggolongkan Pwo Barat rentan karena tekanan bahasa Burma/Thai", "hi": "पश्चिमी प्वो + पूर्वी प्वो + फ्लोंग संयुक्त; बर्मी/थाई दबाव के कारण UNESCO पश्चिमी प्वो को असुरक्षित मानता है", "de": "West-Pwo + Ost-Pwo + Phlong zusammen; UNESCO stuft West-Pwo wegen anhaltenden birmanischen/thailändischen Drucks als gefährdet ein", "fr": "pwo occidental + pwo oriental + phlong combinés ; l'UNESCO classe le pwo occidental vulnérable sous la pression du birman/thaï", "it": "pwo occidentale + pwo orientale + phlong combinati; l'UNESCO classifica il pwo occidentale vulnerabile per la pressione di birmano/thai", "es": "pwo occidental + pwo oriental + phlong combinados; la UNESCO clasifica el pwo occidental como vulnerable por la presión del birmano/tailandés", "pt": "pwo ocidental + pwo oriental + phlong combinados; UNESCO classifica o pwo ocidental como vulnerável devido à pressão contínua do birmanês/tailandês", "ru": "западный пво + восточный пво + пхлонг вместе; ЮНЕСКО относит западный пво к уязвимым из-за давления бирманского/тайского", "uk": "західна пво + східна пво + пхлонг разом; ЮНЕСКО відносить західну пво до вразливих через тиск бірманської/тайської", "ar": "البوو الغربية + البوو الشرقية + الفلونغ مجتمعة؛ تصنّف اليونسكو البوو الغربية معرضة للخطر بسبب ضغط البورمية/التايلاندية المستمر", "he": "פוו מערבית + פוו מזרחית + פלונג יחד; אונסק״ו מסווגת את הפוו המערבית כפגיעה בשל לחץ מתמשך של בורמזית/תאית", "sw": "Kipwo cha Magharibi + Kipwo cha Mashariki + Kiphlong kwa pamoja; UNESCO inakiainisha Kipwo cha Magharibi kuwa hatarini kiasi kwa shinikizo la Kiburma/Kithai"}, "Wu Chinese family total; Shanghainese alone ~15-20M": {"ja": "呉語全体の合計；上海語だけで約1,500万〜2,000万", "ko": "오어 전체 합계; 상하이어만 약 1,500만~2,000만", "zh": "吴语总计；仅上海话约1500万—2000万", "yue": "吳語總計；單上海話約1,500萬至2,000萬", "vi": "Tổng nhóm tiếng Ngô; riêng tiếng Thượng Hải ~15–20M", "th": "รวมภาษาจีนอู๋ทั้งหมด; เฉพาะภาษาเซี่ยงไฮ้ ~15–20M", "id": "Total rumpun Wu; Shanghai saja ~15-20 jt", "hi": "वू चीनी परिवार कुल; केवल शंघाईनीज़ ~15-20M", "de": "Wu-Chinesisch gesamt; Shanghaiisch allein ~15-20 Mio.", "fr": "wu au total ; le shanghaïen seul ~15-20 M", "it": "wu nel complesso; il solo shanghainese ~15-20 Mln", "es": "wu en total; solo el shanghainés ~15-20 M", "pt": "total da família wu; só o xangainês ~15-20 mi", "ru": "всего по у; один шанхайский ~15-20 млн", "uk": "усього по у; сама шанхайська ~15-20 млн", "ar": "مجموع عائلة الوو؛ الشنغهائية وحدها ~15-20 مليون", "he": "סך משפחת וו; שנגחאית לבדה ~15-20 מיליון", "sw": "jumla ya familia ya Kiwu; Kishanghai pekee milioni ~15-20"}, "Yunnan + Myanmar + Thailand + Laos + Vietnam": {"ja": "雲南＋ミャンマー＋タイ＋ラオス＋ベトナム", "ko": "윈난 + 미얀마 + 태국 + 라오스 + 베트남", "zh": "云南+缅甸+泰国+老挝+越南", "yue": "雲南+緬甸+泰國+老撾+越南", "vi": "Vân Nam + Myanmar + Thái Lan + Lào + Việt Nam", "th": "ยูนนาน + เมียนมา + ไทย + ลาว + เวียดนาม", "id": "Yunnan + Myanmar + Thailand + Laos + Vietnam", "hi": "युन्नान + म्यांमार + थाईलैंड + लाओस + वियतनाम", "de": "Yunnan + Myanmar + Thailand + Laos + Vietnam", "fr": "Yunnan + Birmanie + Thaïlande + Laos + Viêt Nam", "it": "Yunnan + Myanmar + Thailandia + Laos + Vietnam", "es": "Yunnan + Myanmar + Tailandia + Laos + Vietnam", "pt": "Yunnan + Mianmar + Tailândia + Laos + Vietnã", "ru": "Юньнань + Мьянма + Таиланд + Лаос + Вьетнам", "uk": "Юньнань + М'янма + Таїланд + Лаос + В'єтнам", "ar": "يونان + ميانمار + تايلاند + لاوس + فيتنام", "he": "יונאן + מיאנמר + תאילנד + לאוס + וייטנאם", "sw": "Yunnan + Myanmar + Thailand + Laos + Vietnam"}, "Zamboanga ~600K + diaspora; some sources estimate higher including L2 speakers": {"ja": "サンボアンガ約60万＋在外；第二言語話者を含めさらに多いとする資料もある", "ko": "삼보앙가 약 60만 + 해외 동포; 제2언어 화자를 포함해 더 많게 추정하는 자료도 있음", "zh": "三宝颜约60万+海外侨民；部分资料含第二语言使用者估计更多", "yue": "三寶顏約60萬+海外僑民；部分資料包括第二語言使用者估計更多", "vi": "Zamboanga ~600K + kiều dân; một số nguồn ước tính cao hơn khi tính cả người nói như ngôn ngữ thứ hai", "th": "ซัมบวงกา ~600K + ชุมชนพลัดถิ่น; บางแหล่งประมาณสูงกว่านี้เมื่อรวมผู้พูดเป็นภาษาที่สอง", "id": "Zamboanga ~600 rb + diaspora; beberapa sumber memperkirakan lebih tinggi termasuk penutur L2", "hi": "ज़ाम्बोआंगा ~600K + प्रवासी; कुछ स्रोत L2 वक्ताओं सहित अधिक अनुमान देते हैं", "de": "Zamboanga ~600.000 + Diaspora; manche Quellen schätzen inkl. L2 höher", "fr": "Zamboanga ~600 000 + diaspora ; certaines sources estiment davantage avec les L2", "it": "Zamboanga ~600.000 + diaspora; alcune fonti stimano di più includendo la L2", "es": "Zamboanga ~600 000 + diáspora; algunas fuentes estiman más incluyendo L2", "pt": "Zamboanga ~600 mil + diáspora; algumas fontes estimam mais incluindo falantes L2", "ru": "Замбоанга ~600 тыс. + диаспора; по некоторым оценкам больше с учётом второго языка", "uk": "Замбоанга ~600 тис. + діаспора; за деякими оцінками більше з урахуванням другої мови", "ar": "زامبوانغا ~600 ألف + الشتات؛ تقدّر بعض المصادر أكثر مع متحدثي اللغة الثانية", "he": "זמבואנגה ~600 אלף + תפוצות; יש מקורות המעריכים יותר כולל דוברי שפה שנייה", "sw": "Zamboanga elfu ~600 + ughaibuni; vyanzo vingine vinakadiria zaidi pamoja na L2"}, "Zhengzhou specifically; ~190M total Zhongyuan Mandarin": {"ja": "鄭州方言に限る；中原官話全体は約1億9,000万", "ko": "정저우 방언에 한정; 중원관화 전체 약 1억 9,000만", "zh": "特指郑州话；中原官话合计约1.9亿", "yue": "特指鄭州話；中原官話合計約1.9億", "vi": "Riêng tiếng Trịnh Châu; tổng Quan thoại Trung Nguyên ~190M", "th": "เฉพาะภาษาเจิ้งโจว; ภาษาจีนกลางจงหยวนรวม ~190M", "id": "Khusus Zhengzhou; ~190 jt total Mandarin Zhongyuan", "hi": "विशेष रूप से झेंगझोउ; कुल झोंगयुआन मंदारिन ~190M", "de": "Speziell Zhengzhou; Zhongyuan-Mandarin gesamt ~190 Mio.", "fr": "Zhengzhou spécifiquement ; ~190 M au total pour le mandarin du Zhongyuan", "it": "Nello specifico Zhengzhou; ~190 Mln in totale di mandarino Zhongyuan", "es": "Específicamente Zhengzhou; ~190 M en total de mandarín zhongyuan", "pt": "especificamente Zhengzhou; ~190 mi no total do mandarim zhongyuan", "ru": "именно Чжэнчжоу; всего чжунъюаньского мандаринского ~190 млн", "uk": "саме Чженчжоу; усього чжунʼюаньської мандаринської ~190 млн", "ar": "تشنغتشو تحديدًا؛ مجموع ماندرين تشونغيوان ~190 مليون", "he": "ג׳נגג׳ואו בפרט; סך מנדרינית ג׳ונגיואן ~190 מיליון", "sw": "Zhengzhou hasa; jumla ya Kimandarini cha Zhongyuan milioni ~190"}, "across Tuareg varieties": {"ja": "トゥアレグ語諸変種の合計", "ko": "투아레그어 변종 전체", "zh": "各图阿雷格语变体合计", "yue": "各圖阿雷格語變體合計", "vi": "Tính trên các biến thể Tuareg", "th": "รวมวิธภาษาทัวเร็กทั้งหมด", "id": "Di semua varietas Tuareg", "hi": "सभी तुआरेग रूपों में", "de": "über alle Tuareg-Varietäten", "fr": "toutes variétés touarègues", "it": "in tutte le varietà tuareg", "es": "en todas las variedades tuareg", "pt": "em todas as variedades tuaregues", "ru": "по всем туарегским вариантам", "uk": "за всіма туарезькими різновидами", "ar": "عبر تنوعات الطوارق", "he": "בכל ניבי הטוארג", "sw": "katika lahaja zote za Kituareg"}, "active": {"ja": "現用", "ko": "사용 중", "zh": "活跃", "yue": "活躍", "vi": "Đang được dùng", "th": "ยังใช้อยู่", "id": "aktif", "hi": "सक्रिय", "de": "aktiv", "fr": "active", "it": "attiva", "es": "activa", "pt": "ativa", "ru": "активный", "uk": "активна", "ar": "نشطة", "he": "פעילה", "sw": "hai"}, "active constructed-language community; <30": {"ja": "活動中の人工言語コミュニティ；30人未満", "ko": "활동 중인 인공어 공동체; 30명 미만", "zh": "活跃的人造语言社群；不足30人", "yue": "活躍的人造語言社群；不足30人", "vi": "Cộng đồng ngôn ngữ nhân tạo đang hoạt động; <30 người", "th": "ชุมชนภาษาประดิษฐ์ที่ยังเคลื่อนไหว; <30 คน", "id": "komunitas bahasa buatan yang aktif; <30", "hi": "सक्रिय कृत्रिम-भाषा समुदाय; <30", "de": "aktive Plansprachengemeinschaft; <30", "fr": "communauté active de langue construite ; <30", "it": "comunità attiva di lingua artificiale; <30", "es": "comunidad activa de lengua construida; <30", "pt": "comunidade ativa de língua construída; <30", "ru": "активное сообщество искусственного языка; <30", "uk": "активна спільнота штучної мови; <30", "ar": "مجتمع نشط للغة مصطنعة؛ <30", "he": "קהילה פעילה של שפה מתוכננת; <30", "sw": "jamii hai ya lugha ya kubuni; <30"}, "active users; constructed auxlang": {"ja": "現用者；人工国際補助語", "ko": "사용자; 인공 국제 보조어", "zh": "活跃使用者；人造国际辅助语", "yue": "活躍使用者；人造國際輔助語", "vi": "Người dùng tích cực; ngôn ngữ phụ trợ quốc tế nhân tạo", "th": "ผู้ใช้ที่ยังใช้อยู่; ภาษาช่วยสากลประดิษฐ์", "id": "pengguna aktif; bahasa bantu buatan", "hi": "सक्रिय उपयोगकर्ता; कृत्रिम सहायक भाषा", "de": "aktive Nutzer; konstruierte Hilfssprache", "fr": "usagers actifs ; langue auxiliaire construite", "it": "utenti attivi; lingua ausiliaria artificiale", "es": "usuarios activos; lengua auxiliar construida", "pt": "usuários ativos; língua auxiliar construída", "ru": "активные пользователи; искусственный вспомогательный язык", "uk": "активні користувачі; штучна допоміжна мова", "ar": "مستخدمون نشطون؛ لغة مساعدة مصطنعة", "he": "משתמשים פעילים; שפת עזר מתוכננת", "sw": "watumiaji hai; lugha saidizi ya kubuni"}, "aggregate across Modern Standard Arabic + regional colloquials; MSA itself has near-zero L1": {"ja": "現代標準アラビア語＋各地の口語の合計；現代標準アラビア語自体の母語話者はほぼゼロ", "ko": "현대 표준 아랍어 + 지역 구어 합계; 현대 표준 아랍어 자체의 모어 화자는 거의 없음", "zh": "现代标准阿拉伯语+各地口语合计；现代标准阿拉伯语本身几乎没有母语者", "yue": "現代標準阿拉伯語+各地口語合計；現代標準阿拉伯語本身幾乎沒有母語者", "vi": "Gộp tiếng Ả Rập chuẩn hiện đại + các khẩu ngữ khu vực; bản thân tiếng Ả Rập chuẩn gần như không có người nói như tiếng mẹ đẻ", "th": "รวมภาษาอาหรับมาตรฐานสมัยใหม่ + ภาษาพูดท้องถิ่น; ภาษาอาหรับมาตรฐานเองแทบไม่มีผู้พูดเป็นภาษาแม่", "id": "gabungan Arab Standar Modern + bahasa sehari-hari regional; MSA sendiri hampir tanpa L1", "hi": "आधुनिक मानक अरबी + क्षेत्रीय बोलचाल रूपों का कुल; MSA का अपना L1 लगभग शून्य", "de": "Summe aus Hocharabisch + regionalen Umgangssprachen; Hocharabisch selbst hat nahezu keine L1", "fr": "cumul arabe standard moderne + dialectes régionaux ; l'ASM lui-même n'a quasiment aucun L1", "it": "aggregato di arabo standard moderno + varietà colloquiali regionali; l'MSA in sé ha L1 quasi nulla", "es": "agregado de árabe estándar moderno + variedades coloquiales regionales; el AEM en sí casi no tiene L1", "pt": "agregado do árabe moderno padrão + coloquiais regionais; o MSA em si tem L1 quase nulo", "ru": "совокупно литературный арабский + региональные разговорные; у самого литературного почти нет носителей", "uk": "сукупно літературна арабська + регіональні розмовні; у самої літературної майже немає носіїв", "ar": "مجموع العربية الفصحى الحديثة + اللهجات العامية الإقليمية؛ الفصحى نفسها شبه معدومة كلغة أم", "he": "סך הערבית הספרותית המודרנית + הניבים המדוברים האזוריים; לספרותית עצמה כמעט אין דוברי שפת אם", "sw": "jumla ya Kiarabu Sanifu cha Kisasa + lahaja za kienyeji za kikanda; Kiarabu Sanifu chenyewe karibu hakina L1"}, "aggregate of Persian/Farsi (Iran) + Dari (Afghanistan) + Tajik (Tajikistan); Persian-only L1 ≈ 70M": {"ja": "ペルシア語（イラン）＋ダリー語（アフガニスタン）＋タジク語（タジキスタン）の合計；ペルシア語のみの母語話者≈7,000万", "ko": "페르시아어(이란) + 다리어(아프가니스탄) + 타지크어(타지키스탄) 합계; 페르시아어만의 모어 화자 ≈ 7,000만", "zh": "波斯语（伊朗）+达利语（阿富汗）+塔吉克语（塔吉克斯坦）合计；仅波斯语母语者≈7000万", "yue": "波斯語（伊朗）+達利語（阿富汗）+塔吉克語（塔吉克）合計；僅波斯語母語者≈7,000萬", "vi": "Gộp tiếng Ba Tư/Farsi (Iran) + Dari (Afghanistan) + Tajik (Tajikistan); riêng tiếng Ba Tư có ≈ 70M người nói như tiếng mẹ đẻ", "th": "รวมภาษาเปอร์เซีย/ฟาร์ซี (อิหร่าน) + ดารี (อัฟกานิสถาน) + ทาจิก (ทาจิกิสถาน); เฉพาะภาษาเปอร์เซียมีผู้พูดเป็นภาษาแม่ ≈ 70M", "id": "gabungan Persia/Farsi (Iran) + Dari (Afganistan) + Tajik (Tajikistan); L1 Persia saja ≈ 70 jt", "hi": "फ़ारसी (ईरान) + दरी (अफ़ग़ानिस्तान) + ताजिक (ताजिकिस्तान) का कुल; केवल फ़ारसी L1 ≈ 70M", "de": "Summe aus Persisch/Farsi (Iran) + Dari (Afghanistan) + Tadschikisch (Tadschikistan); nur Persisch L1 ≈ 70 Mio.", "fr": "cumul persan/farsi (Iran) + dari (Afghanistan) + tadjik (Tadjikistan) ; persan seul L1 ≈ 70 M", "it": "aggregato di persiano/farsi (Iran) + dari (Afghanistan) + tagico (Tagikistan); solo persiano L1 ≈ 70 Mln", "es": "agregado de persa/farsi (Irán) + darí (Afganistán) + tayiko (Tayikistán); solo persa L1 ≈ 70 M", "pt": "agregado de persa/fársi (Irã) + dari (Afeganistão) + tadjique (Tadjiquistão); L1 só do persa ≈ 70 mi", "ru": "совокупно персидский/фарси (Иран) + дари (Афганистан) + таджикский (Таджикистан); только персидский ≈ 70 млн носителей", "uk": "сукупно перська/фарсі (Іран) + дарі (Афганістан) + таджицька (Таджикистан); лише перська ≈ 70 млн носіїв", "ar": "مجموع الفارسية (إيران) + الدارية (أفغانستان) + الطاجيكية (طاجيكستان)؛ الفارسية وحدها كلغة أم ≈ 70 مليون", "he": "סך פרסית/פארסי (איראן) + דארי (אפגניסטן) + טג׳יקית (טג׳יקיסטן); פרסית בלבד כשפת אם ≈ 70 מיליון", "sw": "jumla ya Kiajemi/Kifarsi (Iran) + Kidari (Afghanistan) + Kitajiki (Tajikistan); L1 wa Kiajemi pekee ≈ milioni 70"}, "all varieties": {"ja": "全変種", "ko": "모든 변종", "zh": "所有变体", "yue": "所有變體", "vi": "Mọi biến thể", "th": "ทุกวิธภาษา", "id": "semua varietas", "hi": "सभी रूप", "de": "alle Varietäten", "fr": "toutes variétés", "it": "tutte le varietà", "es": "todas las variedades", "pt": "todas as variedades", "ru": "все варианты", "uk": "усі різновиди", "ar": "جميع التنوعات", "he": "כל הניבים", "sw": "lahaja zote"}, "community virtually eliminated by 1932 La Matanza massacre; revival via El Salvador Pipil Communities": {"ja": "1932年のラ・マタンサ虐殺で共同体はほぼ壊滅；エルサルバドルのピピル共同体による復興", "ko": "1932년 라 마탄사 학살로 공동체가 사실상 소멸; 엘살바도르 피필 공동체를 통한 부활", "zh": "社群在1932年“大屠杀”（La Matanza）中几近覆灭；由萨尔瓦多皮皮尔社区推动复兴", "yue": "社群在1932年「大屠殺」（La Matanza）中幾近覆滅；由薩爾瓦多皮皮爾社區推動復興", "vi": "Cộng đồng gần như bị xóa sổ trong vụ thảm sát La Matanza năm 1932; hồi sinh nhờ các cộng đồng Pipil ở El Salvador", "th": "ชุมชนแทบถูกกวาดล้างในการสังหารหมู่ลามาตันซาปี 1932; ฟื้นฟูโดยชุมชนปิปิลในเอลซัลวาดอร์", "id": "komunitas nyaris musnah akibat pembantaian La Matanza 1932; revitalisasi lewat Komunitas Pipil El Salvador", "hi": "1932 के ला मातान्ज़ा नरसंहार से समुदाय लगभग समाप्त; अल सल्वाडोर पिपिल समुदायों द्वारा पुनरुद्धार", "de": "Gemeinschaft durch das Massaker La Matanza 1932 nahezu ausgelöscht; Wiederbelebung durch Pipil-Gemeinden in El Salvador", "fr": "communauté quasi anéantie par le massacre de La Matanza (1932) ; revitalisation par les communautés pipiles du Salvador", "it": "comunità quasi annientata dal massacro di La Matanza del 1932; rivitalizzazione tramite le comunità pipil di El Salvador", "es": "comunidad prácticamente eliminada por la masacre de La Matanza de 1932; revitalización a través de las comunidades pipiles de El Salvador", "pt": "comunidade praticamente eliminada pelo massacre de La Matanza em 1932; revitalização via comunidades pipil de El Salvador", "ru": "община почти уничтожена резнёй Ла-Матанса 1932 г.; возрождение силами общин пипилей Сальвадора", "uk": "громаду майже знищила різанина Ла-Матанса 1932 р.; відродження зусиллями громад піпілів Сальвадору", "ar": "قُضي على المجتمع تقريبًا في مذبحة لا ماتانزا عام 1932؛ إحياء عبر مجتمعات البيبيل في السلفادور", "he": "הקהילה כמעט הושמדה בטבח לה מטנסה ב-1932; החייאה דרך קהילות הפיפיל באל סלוודור", "sw": "jamii ilikaribia kuangamizwa na mauaji ya La Matanza ya 1932; ufufuaji kupitia jamii za Wapipil wa El Salvador"}, "critically endangered": {"ja": "極めて深刻", "ko": "극심한 위기", "zh": "极度危险", "yue": "極度危險", "vi": "Cực kỳ nguy cấp", "th": "ใกล้สูญหายขั้นวิกฤต", "id": "kritis terancam", "hi": "अति संकटग्रस्त", "de": "vom Aussterben bedroht", "fr": "en situation critique", "it": "in pericolo critico", "es": "en situación crítica", "pt": "criticamente ameaçada", "ru": "в критическом состоянии", "uk": "у критичному стані", "ar": "مهددة بشكل حرج", "he": "בסכנה קריטית", "sw": "hatarini mno"}, "critically endangered — UNESCO critically endangered after the 2013-14 Syrian War battle of Maaloula displaced most speakers and severely disrupted intergenerational transmission": {"ja": "極めて深刻 — 2013〜14年のシリア内戦マアルーラの戦いで話者の大半が避難し世代間継承が大きく断たれたため、UNESCO「極めて深刻」", "ko": "극심한 위기 — 2013~14년 시리아 내전 마알룰라 전투로 화자 대부분이 피란하고 세대 간 전승이 심각하게 단절되어 유네스코 '극심한 위기'", "zh": "极度危险 — 2013—14年叙利亚内战马卢拉战役使多数使用者流离失所、代际传承严重中断，联合国教科文组织列为“极度危险”", "yue": "極度危險 — 2013至14年敘利亞內戰馬盧拉戰役使多數使用者流離失所、代際傳承嚴重中斷，聯合國教科文組織列為「極度危險」", "vi": "Cực kỳ nguy cấp — UNESCO: cực kỳ nguy cấp sau khi trận Maaloula (Nội chiến Syria 2013–14) khiến phần lớn người nói phải di tản và làm gián đoạn nghiêm trọng việc truyền thụ giữa các thế hệ", "th": "ใกล้สูญหายขั้นวิกฤต — ยูเนสโกจัดเป็นขั้นวิกฤตหลังยุทธการมาอ์ลูลาในสงครามกลางเมืองซีเรียปี 2013–14 ทำให้ผู้พูดส่วนใหญ่พลัดถิ่นและการถ่ายทอดข้ามรุ่นหยุดชะงักอย่างหนัก", "id": "kritis terancam — UNESCO: kritis terancam setelah pertempuran Maaloula dalam Perang Suriah 2013-14 menggusur sebagian besar penutur dan mengganggu parah pewarisan antargenerasi", "hi": "अति संकटग्रस्त — 2013-14 सीरियाई युद्ध में मालूला की लड़ाई ने अधिकांश वक्ताओं को विस्थापित कर पीढ़ीगत संचरण को गंभीर रूप से बाधित किया; UNESCO: अति संकटग्रस्त", "de": "vom Aussterben bedroht — UNESCO: vom Aussterben bedroht, nachdem die Schlacht um Maalula im Syrienkrieg 2013-14 die meisten Sprecher vertrieb und die Weitergabe schwer störte", "fr": "en situation critique — UNESCO : en situation critique depuis que la bataille de Maaloula (guerre de Syrie, 2013-14) a déplacé la plupart des locuteurs et gravement perturbé la transmission", "it": "in pericolo critico — UNESCO: in pericolo critico dopo che la battaglia di Maaloula nella guerra siriana del 2013-14 ha sfollato gran parte dei parlanti e gravemente interrotto la trasmissione intergenerazionale", "es": "en situación crítica — UNESCO: en situación crítica tras la batalla de Maalula en la guerra de Siria de 2013-14, que desplazó a la mayoría de hablantes y alteró gravemente la transmisión intergeneracional", "pt": "criticamente ameaçada — UNESCO: criticamente ameaçada após a batalha de Maaloula (Guerra Síria, 2013-14), que deslocou a maioria dos falantes e perturbou gravemente a transmissão intergeracional", "ru": "в критическом состоянии — ЮНЕСКО: в критическом состоянии после битвы за Маалюлю (Сирийская война, 2013-14), вытеснившей большинство носителей и подорвавшей межпоколенную передачу", "uk": "у критичному стані — ЮНЕСКО: у критичному стані після битви за Маалюлю (Сирійська війна, 2013-14), що витіснила більшість носіїв і підірвала міжпоколінну передачу", "ar": "مهددة بشكل حرج — اليونسكو: مهددة بشكل حرج بعد معركة معلولا (الحرب السورية 2013-14) التي هجّرت معظم المتحدثين وعطّلت بشدة النقل بين الأجيال", "he": "בסכנה קריטית — אונסק״ו: בסכנה קריטית לאחר קרב מעלולא (מלחמת סוריה, 2013-14), שעקר את רוב הדוברים ושיבש קשות את ההעברה הבין-דורית", "sw": "hatarini mno — UNESCO: hatarini mno baada ya vita vya Maaloula (Vita vya Syria 2013-14) vilivyohamisha wazungumzaji wengi na kuvuruga sana urithishaji kati ya vizazi"}, "critically endangered — UNESCO critically endangered; nearly all remaining fluent speakers are elders over 60": {"ja": "極めて深刻 — UNESCO「極めて深刻」；残る流暢な話者はほぼ全員60歳以上の高齢者", "ko": "극심한 위기 — 유네스코 '극심한 위기'; 남은 유창한 화자는 거의 모두 60세 이상 노인", "zh": "极度危险 — 联合国教科文组织“极度危险”；现存流利使用者几乎都是60岁以上长者", "yue": "極度危險 — 聯合國教科文組織「極度危險」；現存流利使用者幾乎全是60歲以上長者", "vi": "Cực kỳ nguy cấp — UNESCO: cực kỳ nguy cấp; gần như mọi người nói thành thạo còn lại đều là người cao tuổi trên 60", "th": "ใกล้สูญหายขั้นวิกฤต — ยูเนสโก: ขั้นวิกฤต; ผู้พูดคล่องที่เหลือเกือบทั้งหมดเป็นผู้สูงอายุเกิน 60 ปี", "id": "kritis terancam — UNESCO: kritis terancam; hampir semua penutur fasih yang tersisa adalah lansia di atas 60", "hi": "अति संकटग्रस्त — UNESCO: अति संकटग्रस्त; लगभग सभी शेष धाराप्रवाह वक्ता 60 से अधिक आयु के बुज़ुर्ग हैं", "de": "vom Aussterben bedroht — UNESCO: vom Aussterben bedroht; fast alle verbliebenen fließenden Sprecher sind über 60", "fr": "en situation critique — UNESCO : en situation critique ; presque tous les locuteurs courants restants ont plus de 60 ans", "it": "in pericolo critico — UNESCO: in pericolo critico; quasi tutti i parlanti fluenti rimasti sono anziani oltre i 60 anni", "es": "en situación crítica — UNESCO: en situación crítica; casi todos los hablantes fluidos que quedan son mayores de 60 años", "pt": "criticamente ameaçada — UNESCO: criticamente ameaçada; quase todos os falantes fluentes restantes têm mais de 60 anos", "ru": "в критическом состоянии — ЮНЕСКО: в критическом состоянии; почти все оставшиеся свободно говорящие старше 60 лет", "uk": "у критичному стані — ЮНЕСКО: у критичному стані; майже всі решта вільних мовців старші за 60 років", "ar": "مهددة بشكل حرج — اليونسكو: مهددة بشكل حرج؛ معظم المتحدثين الطليقين الباقين مسنون فوق 60", "he": "בסכנה קריטית — אונסק״ו: בסכנה קריטית; כמעט כל הדוברים השוטפים הנותרים מעל גיל 60", "sw": "hatarini mno — UNESCO: hatarini mno; karibu wazungumzaji fasaha wote waliobaki ni wazee wa zaidi ya miaka 60"}, "critically endangered, heritage revival ongoing": {"ja": "極めて深刻、継承語としての復興が進行中", "ko": "극심한 위기, 계승어 부활 진행 중", "zh": "极度危险，传承复兴进行中", "yue": "極度危險，傳承復興進行中", "vi": "Cực kỳ nguy cấp, đang phục hồi như ngôn ngữ di sản", "th": "ใกล้สูญหายขั้นวิกฤต กำลังฟื้นฟูในฐานะภาษามรดก", "id": "kritis terancam, revitalisasi warisan sedang berlangsung", "hi": "अति संकटग्रस्त, विरासत पुनरुद्धार जारी", "de": "vom Aussterben bedroht, Wiederbelebung im Gange", "fr": "en situation critique, revitalisation en cours", "it": "in pericolo critico, rivitalizzazione in corso", "es": "en situación crítica, revitalización en curso", "pt": "criticamente ameaçada, revitalização de herança em curso", "ru": "в критическом состоянии, идёт возрождение", "uk": "у критичному стані, триває відродження", "ar": "مهددة بشكل حرج، وإحياء تراثي جارٍ", "he": "בסכנה קריטית, החייאת מורשת בעיצומה", "sw": "hatarini mno, ufufuaji wa urithi unaendelea"}, "daily L1 in Hsinchu region": {"ja": "新竹地方で日常的に使われる母語", "ko": "신주 지역 일상 모어", "zh": "新竹地区日常母语", "yue": "新竹地區日常母語", "vi": "Tiếng mẹ đẻ dùng hằng ngày ở vùng Tân Trúc", "th": "ภาษาแม่ที่ใช้ในชีวิตประจำวันในเขตซินจู๋", "id": "L1 harian di wilayah Hsinchu", "hi": "सिनचू क्षेत्र में दैनिक L1", "de": "tägliche L1 in der Region Hsinchu", "fr": "L1 au quotidien dans la région de Hsinchu", "it": "L1 quotidiana nella regione di Hsinchu", "es": "L1 cotidiana en la región de Hsinchu", "pt": "L1 diário na região de Hsinchu", "ru": "ежедневно как родной в районе Синьчжу", "uk": "щодня як рідна в районі Сіньчжу", "ar": "لغة أم يومية في منطقة هسينتشو", "he": "שפת אם יומיומית באזור שינג׳ו", "sw": "L1 ya kila siku eneo la Hsinchu"}, "definitely endangered — UNESCO definitely endangered": {"ja": "危険 — UNESCO「危険」", "ko": "확실한 위기 — 유네스코 '확실한 위기'", "zh": "确有危险 — 联合国教科文组织“确有危险”", "yue": "確有危險 — 聯合國教科文組織「確有危險」", "vi": "Chắc chắn nguy cấp — UNESCO: chắc chắn nguy cấp", "th": "ใกล้สูญหายแน่นอน — ยูเนสโก: ใกล้สูญหายแน่นอน", "id": "pasti terancam — UNESCO: pasti terancam", "hi": "निश्चित रूप से संकटग्रस्त — UNESCO: निश्चित रूप से संकटग्रस्त", "de": "definitiv gefährdet — UNESCO: definitiv gefährdet", "fr": "en danger — UNESCO : en danger", "it": "sicuramente in pericolo — UNESCO: sicuramente in pericolo", "es": "claramente amenazada — UNESCO: claramente amenazada", "pt": "definitivamente ameaçada — UNESCO: definitivamente ameaçada", "ru": "под угрозой — ЮНЕСКО: под угрозой", "uk": "під загрозою — ЮНЕСКО: під загрозою", "ar": "مهددة بالتأكيد — اليونسكو: مهددة بالتأكيد", "he": "בסכנה ודאית — אונסק״ו: בסכנה ודאית", "sw": "hatarini dhahiri — UNESCO: hatarini dhahiri"}, "definitely endangered — UNESCO definitely endangered for inland Calabrian/Sicilian varieties; some larger settlements still vibrant": {"ja": "危険 — 内陸のカラブリア・シチリアの変種についてUNESCO「危険」；一部の大きな集落ではなお活発", "ko": "확실한 위기 — 내륙 칼라브리아·시칠리아 변종에 대해 유네스코 '확실한 위기'; 일부 큰 마을에서는 여전히 활발", "zh": "确有危险 — 联合国教科文组织将内陆卡拉布里亚／西西里变体列为“确有危险”；部分较大聚居地仍很活跃", "yue": "確有危險 — 聯合國教科文組織將內陸卡拉布里亞／西西里變體列為「確有危險」；部分較大聚居地仍很活躍", "vi": "Chắc chắn nguy cấp — UNESCO: chắc chắn nguy cấp đối với các biến thể nội địa Calabria/Sicilia; một số khu định cư lớn vẫn sống động", "th": "ใกล้สูญหายแน่นอน — ยูเนสโก: ใกล้สูญหายแน่นอนสำหรับวิธภาษาในแผ่นดินของคาลาเบรีย/ซิซิลี; บางชุมชนขนาดใหญ่ยังใช้กันคึกคัก", "id": "pasti terancam — UNESCO: pasti terancam untuk varietas pedalaman Calabria/Sisilia; beberapa permukiman besar masih hidup", "hi": "निश्चित रूप से संकटग्रस्त — UNESCO: अंतर्देशीय कैलाब्रियाई/सिसिलियाई रूपों के लिए निश्चित रूप से संकटग्रस्त; कुछ बड़ी बस्तियाँ अभी भी जीवंत", "de": "definitiv gefährdet — UNESCO: definitiv gefährdet für die kalabrischen/sizilianischen Varietäten im Landesinneren; einige größere Orte noch lebendig", "fr": "en danger — UNESCO : en danger pour les variétés de l'intérieur de la Calabre/Sicile ; certaines localités plus grandes restent vivantes", "it": "sicuramente in pericolo — UNESCO: sicuramente in pericolo per le varietà interne calabresi/siciliane; alcuni centri più grandi ancora vitali", "es": "claramente amenazada — UNESCO: claramente amenazada para las variedades del interior de Calabria/Sicilia; algunos núcleos mayores siguen vitales", "pt": "definitivamente ameaçada — UNESCO: definitivamente ameaçada para as variedades calabresas/sicilianas do interior; alguns povoados maiores ainda são vitais", "ru": "под угрозой — ЮНЕСКО: под угрозой для внутренних калабрийских/сицилийских вариантов; в некоторых крупных селениях язык ещё жив", "uk": "під загрозою — ЮНЕСКО: під загрозою для внутрішніх калабрійських/сицилійських різновидів; у деяких більших поселеннях мова ще жива", "ar": "مهددة بالتأكيد — اليونسكو: مهددة بالتأكيد للتنوعات الكالابرية/الصقلية الداخلية؛ بعض التجمعات الأكبر ما زالت حيوية", "he": "בסכנה ודאית — אונסק״ו: בסכנה ודאית לניבים הקלבריים/הסיציליאניים שבפנים הארץ; כמה יישובים גדולים עדיין תוססים", "sw": "hatarini dhahiri — UNESCO: hatarini dhahiri kwa lahaja za bara za Calabria/Sicilia; baadhi ya makazi makubwa bado hai"}, "definitely endangered — UNESCO definitely endangered overall, with French Guiana and Suriname populations more vibrant than Venezuela/Guyana populations": {"ja": "危険 — UNESCOは全体として「危険」、フランス領ギアナとスリナムの集団はベネズエラ・ガイアナより活発", "ko": "확실한 위기 — 유네스코 전체 평가 '확실한 위기', 프랑스령 기아나·수리남 집단이 베네수엘라·가이아나보다 활발", "zh": "确有危险 — 联合国教科文组织总体列为“确有危险”，法属圭亚那与苏里南的群体比委内瑞拉／圭亚那更活跃", "yue": "確有危險 — 聯合國教科文組織整體列為「確有危險」，法屬圭亞那與蘇里南的群體比委內瑞拉／圭亞那更活躍", "vi": "Chắc chắn nguy cấp — UNESCO: chắc chắn nguy cấp nói chung; cộng đồng ở Guyane thuộc Pháp và Suriname sống động hơn ở Venezuela/Guyana", "th": "ใกล้สูญหายแน่นอน — ยูเนสโก: ใกล้สูญหายแน่นอนโดยรวม; กลุ่มในเฟรนช์เกียนาและซูรินามยังแข็งแรงกว่าในเวเนซุเอลา/กายอานา", "id": "pasti terancam — UNESCO: pasti terancam secara keseluruhan; populasi Guyana Prancis dan Suriname lebih hidup daripada Venezuela/Guyana", "hi": "निश्चित रूप से संकटग्रस्त — UNESCO: कुल मिलाकर निश्चित रूप से संकटग्रस्त; फ़्रेंच गयाना और सूरीनाम की आबादी वेनेज़ुएला/गुयाना से अधिक जीवंत", "de": "definitiv gefährdet — UNESCO: insgesamt definitiv gefährdet; Gruppen in Französisch-Guayana und Suriname lebendiger als in Venezuela/Guyana", "fr": "en danger — UNESCO : en danger dans l'ensemble ; populations de Guyane et du Suriname plus vivantes qu'au Venezuela/Guyana", "it": "sicuramente in pericolo — UNESCO: nel complesso sicuramente in pericolo; popolazioni della Guyana francese e del Suriname più vitali di quelle di Venezuela/Guyana", "es": "claramente amenazada — UNESCO: claramente amenazada en conjunto; poblaciones de la Guayana Francesa y Surinam más vitales que las de Venezuela/Guyana", "pt": "definitivamente ameaçada — UNESCO: definitivamente ameaçada no geral, com populações da Guiana Francesa e do Suriname mais vitais que as da Venezuela/Guiana", "ru": "под угрозой — ЮНЕСКО: в целом под угрозой; во Французской Гвиане и Суринаме язык жизнеспособнее, чем в Венесуэле/Гайане", "uk": "під загрозою — ЮНЕСКО: загалом під загрозою; у Французькій Гвіані та Суринамі мова життєздатніша, ніж у Венесуелі/Гаяні", "ar": "مهددة بالتأكيد — اليونسكو: مهددة بالتأكيد عمومًا، والسكان في غويانا الفرنسية وسورينام أكثر حيوية منهم في فنزويلا/غيانا", "he": "בסכנה ודאית — אונסק״ו: בסכנה ודאית בכלל, כשהאוכלוסיות בגיאנה הצרפתית ובסורינאם חיוניות יותר מאלה שבונצואלה/גיאנה", "sw": "hatarini dhahiri — UNESCO: hatarini dhahiri kwa jumla, wakazi wa Guiana ya Kifaransa na Suriname wakiwa hai zaidi kuliko wa Venezuela/Guyana"}, "definitely endangered — UNESCO definitely endangered overall; younger generations increasingly Russian-dominant": {"ja": "危険 — UNESCOは全体として「危険」；若い世代はロシア語優位が進む", "ko": "확실한 위기 — 유네스코 전체 평가 '확실한 위기'; 젊은 세대는 점점 러시아어 위주", "zh": "确有危险 — 联合国教科文组织总体列为“确有危险”；年轻一代日益以俄语为主", "yue": "確有危險 — 聯合國教科文組織整體列為「確有危險」；年輕一代日益以俄語為主", "vi": "Chắc chắn nguy cấp — UNESCO: chắc chắn nguy cấp nói chung; thế hệ trẻ ngày càng dùng chủ yếu tiếng Nga", "th": "ใกล้สูญหายแน่นอน — ยูเนสโก: ใกล้สูญหายแน่นอนโดยรวม; คนรุ่นใหม่ใช้ภาษารัสเซียเป็นหลักมากขึ้น", "id": "pasti terancam — UNESCO: pasti terancam secara keseluruhan; generasi muda makin didominasi bahasa Rusia", "hi": "निश्चित रूप से संकटग्रस्त — UNESCO: कुल मिलाकर निश्चित रूप से संकटग्रस्त; युवा पीढ़ी में रूसी का प्रभुत्व बढ़ रहा है", "de": "definitiv gefährdet — UNESCO: insgesamt definitiv gefährdet; jüngere Generationen zunehmend russischdominant", "fr": "en danger — UNESCO : en danger dans l'ensemble ; jeunes générations de plus en plus russophones", "it": "sicuramente in pericolo — UNESCO: nel complesso sicuramente in pericolo; le giovani generazioni sono sempre più russofone", "es": "claramente amenazada — UNESCO: claramente amenazada en conjunto; generaciones jóvenes cada vez más rusófonas", "pt": "definitivamente ameaçada — UNESCO: definitivamente ameaçada no geral; gerações mais jovens cada vez mais dominadas pelo russo", "ru": "под угрозой — ЮНЕСКО: в целом под угрозой; молодёжь всё больше переходит на русский", "uk": "під загрозою — ЮНЕСКО: загалом під загрозою; молодь дедалі більше переходить на російську", "ar": "مهددة بالتأكيد — اليونسكو: مهددة بالتأكيد عمومًا؛ الأجيال الشابة تغلب عليها الروسية بشكل متزايد", "he": "בסכנה ודאית — אונסק״ו: בסכנה ודאית בכלל; הדורות הצעירים עוברים יותר ויותר לרוסית", "sw": "hatarini dhahiri — UNESCO: hatarini dhahiri kwa jumla; vizazi vichanga vinazidi kutawaliwa na Kirusi"}, "down from ~1,500 in 1990s; UNESCO classifies critically endangered": {"ja": "1990年代の約1,500から減少；UNESCOの分類は「極めて深刻」", "ko": "1990년대 약 1,500명에서 감소; 유네스코 분류 '극심한 위기'", "zh": "由1990年代约1500人减少而来；联合国教科文组织列为“极度危险”", "yue": "由1990年代約1,500人減少而來；聯合國教科文組織列為「極度危險」", "vi": "Giảm từ ~1.500 vào thập niên 1990; UNESCO xếp loại cực kỳ nguy cấp", "th": "ลดลงจาก ~1,500 คนในทศวรรษ 1990; ยูเนสโกจัดเป็นใกล้สูญหายขั้นวิกฤต", "id": "turun dari ~1.500 pada 1990-an; UNESCO: kritis terancam", "hi": "1990 के दशक के ~1,500 से घटकर; UNESCO: अति संकटग्रस्त", "de": "gesunken von ~1.500 in den 1990ern; UNESCO: vom Aussterben bedroht", "fr": "contre ~1 500 dans les années 1990 ; UNESCO : en situation critique", "it": "in calo da ~1.500 negli anni '90; UNESCO: in pericolo critico", "es": "frente a ~1500 en los años 90; UNESCO: en situación crítica", "pt": "caiu de ~1.500 nos anos 1990; UNESCO: criticamente ameaçada", "ru": "было ~1500 в 1990-х; ЮНЕСКО: в критическом состоянии", "uk": "було ~1500 у 1990-х; ЮНЕСКО: у критичному стані", "ar": "انخفض من ~1,500 في عقد 1990؛ اليونسكو: مهددة بشكل حرج", "he": "ירד מ-~1,500 בשנות ה-1990; אונסק״ו: בסכנה קריטית", "sw": "imepungua kutoka ~1,500 miaka ya 1990; UNESCO: hatarini mno"}, "down from ~700 in 1980; UNESCO classifies critically endangered": {"ja": "1980年の約700から減少；UNESCOの分類は「極めて深刻」", "ko": "1980년 약 700명에서 감소; 유네스코 분류 '극심한 위기'", "zh": "由1980年约700人减少而来；联合国教科文组织列为“极度危险”", "yue": "由1980年約700人減少而來；聯合國教科文組織列為「極度危險」", "vi": "Giảm từ ~700 vào năm 1980; UNESCO xếp loại cực kỳ nguy cấp", "th": "ลดลงจาก ~700 คนในปี 1980; ยูเนสโกจัดเป็นใกล้สูญหายขั้นวิกฤต", "id": "turun dari ~700 pada 1980; UNESCO: kritis terancam", "hi": "1980 के ~700 से घटकर; UNESCO: अति संकटग्रस्त", "de": "gesunken von ~700 im Jahr 1980; UNESCO: vom Aussterben bedroht", "fr": "contre ~700 en 1980 ; UNESCO : en situation critique", "it": "in calo da ~700 nel 1980; UNESCO: in pericolo critico", "es": "frente a ~700 en 1980; UNESCO: en situación crítica", "pt": "caiu de ~700 em 1980; UNESCO: criticamente ameaçada", "ru": "было ~700 в 1980 г.; ЮНЕСКО: в критическом состоянии", "uk": "було ~700 у 1980 р.; ЮНЕСКО: у критичному стані", "ar": "انخفض من ~700 عام 1980؛ اليونسكو: مهددة بشكل حرج", "he": "ירד מ-~700 ב-1980; אונסק״ו: בסכנה קריטית", "sw": "imepungua kutoka ~700 mwaka 1980; UNESCO: hatarini mno"}, "effectively all L1; L2 community small": {"ja": "実質的に全員が母語話者；第二言語話者は少ない", "ko": "사실상 모두 모어 화자; 제2언어 화자는 적음", "zh": "几乎全为母语者；第二语言群体很小", "yue": "幾乎全為母語者；第二語言群體很小", "vi": "Hầu như đều là tiếng mẹ đẻ; ít người nói như ngôn ngữ thứ hai", "th": "แทบทั้งหมดเป็นภาษาแม่; ผู้พูดเป็นภาษาที่สองมีน้อย", "id": "praktis semuanya L1; komunitas L2 kecil", "hi": "व्यावहारिक रूप से सभी L1; L2 समुदाय छोटा", "de": "praktisch nur L1; kleine L2-Gemeinschaft", "fr": "quasiment tous L1 ; petite communauté L2", "it": "praticamente tutti L1; piccola comunità L2", "es": "prácticamente todos L1; comunidad L2 pequeña", "pt": "praticamente todos L1; comunidade L2 pequena", "ru": "практически все — родной; говорящих на нём как на втором мало", "uk": "практично всі — рідна; мовців другої мови мало", "ar": "عمليًا الجميع لغتهم الأم؛ مجتمع اللغة الثانية صغير", "he": "כמעט כולם דוברי שפת אם; קהילת שפה שנייה קטנה", "sw": "kwa kweli wote ni L1; jamii ya L2 ni ndogo"}, "effectively all L1; tiny L2 community": {"ja": "実質的に全員が母語話者；第二言語話者はごく少ない", "ko": "사실상 모두 모어 화자; 제2언어 화자는 극히 적음", "zh": "几乎全为母语者；第二语言群体极小", "yue": "幾乎全為母語者；第二語言群體極小", "vi": "Hầu như đều là tiếng mẹ đẻ; rất ít người nói như ngôn ngữ thứ hai", "th": "แทบทั้งหมดเป็นภาษาแม่; ผู้พูดเป็นภาษาที่สองมีน้อยมาก", "id": "praktis semuanya L1; komunitas L2 sangat kecil", "hi": "व्यावहारिक रूप से सभी L1; बहुत छोटा L2 समुदाय", "de": "praktisch nur L1; winzige L2-Gemeinschaft", "fr": "quasiment tous L1 ; infime communauté L2", "it": "praticamente tutti L1; minuscola comunità L2", "es": "prácticamente todos L1; comunidad L2 diminuta", "pt": "praticamente todos L1; comunidade L2 minúscula", "ru": "практически все — родной; говорящих на нём как на втором очень мало", "uk": "практично всі — рідна; мовців другої мови зовсім мало", "ar": "عمليًا الجميع لغتهم الأم؛ مجتمع اللغة الثانية ضئيل جدًا", "he": "כמעט כולם דוברי שפת אם; קהילת שפה שנייה זעירה", "sw": "kwa kweli wote ni L1; jamii ya L2 ni ndogo sana"}, "endangered — UNESCO definitely endangered; intergenerational transmission challenged but functional in core Uspantán community": {"ja": "消滅の危機 — UNESCO「危険」；世代間継承は困難を抱えつつもウスパンタンの中心共同体では機能", "ko": "위기 — 유네스코 '확실한 위기'; 세대 간 전승은 어려움이 있으나 우스판탄 중심 공동체에서는 유지", "zh": "濒危 — 联合国教科文组织“确有危险”；代际传承面临挑战，但在乌斯潘坦核心社区仍在延续", "yue": "瀕危 — 聯合國教科文組織「確有危險」；代際傳承面臨挑戰，但在烏斯潘坦核心社區仍在延續", "vi": "Nguy cấp — UNESCO: chắc chắn nguy cấp; việc truyền thụ giữa các thế hệ gặp khó khăn nhưng vẫn duy trì ở cộng đồng Uspantán trung tâm", "th": "ใกล้สูญหาย — ยูเนสโก: ใกล้สูญหายแน่นอน; การถ่ายทอดข้ามรุ่นมีอุปสรรคแต่ยังดำเนินอยู่ในชุมชนแกนกลางอุสปันตัน", "id": "terancam — UNESCO: pasti terancam; pewarisan antargenerasi tertantang tetapi masih berfungsi di komunitas inti Uspantán", "hi": "संकटग्रस्त — UNESCO: निश्चित रूप से संकटग्रस्त; पीढ़ीगत संचरण चुनौतीपूर्ण पर मुख्य उस्पान्तान समुदाय में कार्यरत", "de": "gefährdet — UNESCO: definitiv gefährdet; Weitergabe unter Druck, aber in der Kerngemeinde Uspantán funktionsfähig", "fr": "en danger — UNESCO : en danger ; transmission fragilisée mais fonctionnelle dans la communauté centrale d'Uspantán", "it": "in pericolo — UNESCO: sicuramente in pericolo; trasmissione in difficoltà ma funzionante nella comunità centrale di Uspantán", "es": "amenazada — UNESCO: claramente amenazada; transmisión comprometida pero funcional en la comunidad central de Uspantán", "pt": "ameaçada — UNESCO: definitivamente ameaçada; transmissão intergeracional comprometida, mas funcional na comunidade central de Uspantán", "ru": "под угрозой — ЮНЕСКО: под угрозой; межпоколенная передача затруднена, но сохраняется в основной общине Успантана", "uk": "під загрозою — ЮНЕСКО: під загрозою; міжпоколінна передача ускладнена, але зберігається в основній громаді Успантана", "ar": "مهددة — اليونسكو: مهددة بالتأكيد؛ النقل بين الأجيال متعثر لكنه قائم في مجتمع أوسبانتان الأساسي", "he": "בסכנה — אונסק״ו: בסכנה ודאית; ההעברה הבין-דורית מאותגרת אך מתפקדת בקהילת אוספנטן המרכזית", "sw": "hatarini — UNESCO: hatarini dhahiri; urithishaji kati ya vizazi una changamoto lakini unaendelea katika jamii kuu ya Uspantán"}, "estimate combining advanced learners with elderly speakers; severely endangered": {"ja": "上級学習者と高齢話者を合わせた推計；重大な危険", "ko": "상급 학습자와 고령 화자를 합친 추정; 심각한 위기", "zh": "合计高级学习者与老年使用者的估计；严重危险", "yue": "合計高級學習者與年長使用者的估計；嚴重危險", "vi": "Ước tính gộp người học trình độ cao và người nói cao tuổi; nguy cấp nghiêm trọng", "th": "ประมาณการรวมผู้เรียนขั้นสูงกับผู้พูดสูงอายุ; ใกล้สูญหายอย่างรุนแรง", "id": "perkiraan gabungan pelajar mahir dan penutur lansia; sangat terancam", "hi": "उन्नत शिक्षार्थियों और बुज़ुर्ग वक्ताओं का संयुक्त अनुमान; गंभीर रूप से संकटग्रस्त", "de": "Schätzung aus fortgeschrittenen Lernenden und älteren Sprechern; ernsthaft gefährdet", "fr": "estimation cumulant apprenants avancés et locuteurs âgés ; sérieusement en danger", "it": "stima che combina apprendenti avanzati e parlanti anziani; gravemente in pericolo", "es": "estimación que combina aprendices avanzados y hablantes mayores; seriamente amenazada", "pt": "estimativa que combina aprendizes avançados com falantes idosos; severamente ameaçada", "ru": "оценка объединяет продвинутых учащихся и пожилых носителей; в серьёзной опасности", "uk": "оцінка об'єднує просунутих учнів і літніх носіїв; у серйозній небезпеці", "ar": "تقدير يجمع المتعلمين المتقدمين والمتحدثين المسنين؛ مهددة بشدة", "he": "הערכה המשלבת לומדים מתקדמים ודוברים קשישים; בסכנה חמורה", "sw": "makadirio yanayojumuisha wanafunzi wa hali ya juu na wazee wazungumzaji; hatarini sana"}, "extinct as L1 around 13th c. CE; ~50 active scholars studying Jain Agamas and Maharashtri texts": {"ja": "13世紀頃に母語としては消滅；ジャイナ教聖典アーガマやマーハーラーシュトリー文献を研究する現役研究者約50人", "ko": "13세기경 모어로는 소멸; 자이나교 아가마와 마하라슈트리 문헌을 연구하는 학자 약 50명", "zh": "约公元13世纪作为母语消亡；约50名学者研究耆那教经典及摩诃剌陀语文献", "yue": "約公元13世紀作為母語消亡；約50名學者研究耆那教經典及摩訶剌陀語文獻", "vi": "Tuyệt chủng như tiếng mẹ đẻ khoảng thế kỷ 13 CN; ~50 học giả nghiên cứu kinh Agama của Kỳ Na giáo và văn bản Maharashtri", "th": "สูญในฐานะภาษาแม่ราวศตวรรษที่ 13; นักวิชาการ ~50 คนศึกษาคัมภีร์อาคมของศาสนาเชนและตำรามหาราษฏรี", "id": "punah sebagai L1 sekitar abad ke-13 M; ~50 sarjana aktif mengkaji Agama Jain dan teks Maharashtri", "hi": "लगभग 13वीं शताब्दी ई. में L1 के रूप में विलुप्त; जैन आगमों और महाराष्ट्री ग्रंथों के ~50 सक्रिय विद्वान", "de": "um das 13. Jh. n. Chr. als L1 ausgestorben; ~50 aktive Gelehrte der Jaina-Agamas und Maharashtri-Texte", "fr": "éteinte en L1 vers le XIIIe s. apr. J.-C. ; ~50 savants actifs étudiant les Agamas jaïns et les textes en mahārāṣṭrī", "it": "estinta come L1 intorno al XIII sec. d.C.; ~50 studiosi attivi di Agama jainisti e testi maharashtri", "es": "extinta como L1 hacia el s. XIII d. C.; ~50 estudiosos activos de los Agamas jainistas y textos maharashtri", "pt": "extinta como L1 por volta do séc. 13 d.C.; ~50 estudiosos ativos dos Agamas jainistas e textos maarastri", "ru": "вымер как родной около 13 в. н. э.; ~50 активных исследователей джайнских агам и текстов на махараштри", "uk": "вимерла як рідна близько 13 ст. н. е.; ~50 активних дослідників джайнських агам і текстів махараштрі", "ar": "انقرضت كلغة أم نحو القرن 13 م؛ ~50 باحثًا نشطًا يدرسون الأغامات الجاينية ونصوص الماهاراشتري", "he": "נכחדה כשפת אם בסביבות המאה ה-13 לספירה; ~50 חוקרים פעילים של האגמות הג׳ייניות וטקסטים במהאראשטרי", "sw": "imetoweka kama L1 karibu karne ya 13 BK; wasomi hai ~50 wa Agama za Kijaini na maandishi ya Kimaharashtri"}, "extinct as L1 around 1500 CE; ~50 active scholars": {"ja": "1500年頃に母語としては消滅；現役研究者約50人", "ko": "1500년경 모어로는 소멸; 학자 약 50명", "zh": "约公元1500年作为母语消亡；约50名学者", "yue": "約公元1500年作為母語消亡；約50名學者", "vi": "Tuyệt chủng như tiếng mẹ đẻ khoảng năm 1500 CN; ~50 học giả", "th": "สูญในฐานะภาษาแม่ราว ค.ศ. 1500; นักวิชาการ ~50 คน", "id": "punah sebagai L1 sekitar 1500 M; ~50 sarjana aktif", "hi": "लगभग 1500 ई. में L1 के रूप में विलुप्त; ~50 सक्रिय विद्वान", "de": "um 1500 n. Chr. als L1 ausgestorben; ~50 aktive Gelehrte", "fr": "éteinte en L1 vers 1500 apr. J.-C. ; ~50 savants actifs", "it": "estinta come L1 intorno al 1500 d.C.; ~50 studiosi attivi", "es": "extinta como L1 hacia 1500 d. C.; ~50 estudiosos activos", "pt": "extinta como L1 por volta de 1500 d.C.; ~50 estudiosos ativos", "ru": "вымер как родной около 1500 н. э.; ~50 активных исследователей", "uk": "вимерла як рідна близько 1500 н. е.; ~50 активних дослідників", "ar": "انقرضت كلغة أم نحو 1500 م؛ ~50 باحثًا نشطًا", "he": "נכחדה כשפת אם בסביבות 1500 לספירה; ~50 חוקרים פעילים", "sw": "imetoweka kama L1 karibu 1500 BK; wasomi hai ~50"}, "extinct as L1 around 15th c. Hungarian Renaissance; ~50 active scholars/students": {"ja": "15世紀ハンガリー・ルネサンス頃に母語としては消滅；研究者・学生約50人", "ko": "15세기 헝가리 르네상스 무렵 모어로는 소멸; 학자·학생 약 50명", "zh": "约15世纪匈牙利文艺复兴时期作为母语消亡；约50名学者／学生", "yue": "約15世紀匈牙利文藝復興時期作為母語消亡；約50名學者／學生", "vi": "Tuyệt chủng như tiếng mẹ đẻ khoảng thế kỷ 15 thời Phục hưng Hungary; ~50 học giả/sinh viên", "th": "สูญในฐานะภาษาแม่ราวศตวรรษที่ 15 สมัยฟื้นฟูศิลปวิทยาฮังการี; นักวิชาการ/นักศึกษา ~50 คน", "id": "punah sebagai L1 sekitar abad ke-15 (Renaisans Hongaria); ~50 sarjana/pelajar aktif", "hi": "लगभग 15वीं शताब्दी के हंगेरियाई पुनर्जागरण में L1 के रूप में विलुप्त; ~50 सक्रिय विद्वान/छात्र", "de": "um das 15. Jh. (ungarische Renaissance) als L1 ausgestorben; ~50 aktive Gelehrte/Studierende", "fr": "éteinte en L1 vers le XVe s. (Renaissance hongroise) ; ~50 savants/étudiants actifs", "it": "estinta come L1 intorno al XV sec. (Rinascimento ungherese); ~50 studiosi/studenti attivi", "es": "extinta como L1 hacia el s. XV (Renacimiento húngaro); ~50 estudiosos/estudiantes activos", "pt": "extinta como L1 por volta do séc. 15 (Renascimento húngaro); ~50 estudiosos/estudantes ativos", "ru": "вымер как родной около 15 в. (венгерский Ренессанс); ~50 активных исследователей/студентов", "uk": "вимерла як рідна близько 15 ст. (угорський Ренесанс); ~50 активних дослідників/студентів", "ar": "انقرضت كلغة أم نحو القرن 15 (النهضة المجرية)؛ ~50 باحثًا/طالبًا نشطًا", "he": "נכחדה כשפת אם בסביבות המאה ה-15 (הרנסנס ההונגרי); ~50 חוקרים/סטודנטים פעילים", "sw": "imetoweka kama L1 karibu karne ya 15 (Mwamko wa Hungaria); wasomi/wanafunzi hai ~50"}, "extinct as L1 with Norman Conquest 1066; ~50K active scholars/students worldwide": {"ja": "1066年のノルマン・コンクエストで母語としては消滅；世界の研究者・学生約5万人", "ko": "1066년 노르만 정복으로 모어로는 소멸; 전 세계 학자·학생 약 5만 명", "zh": "随1066年诺曼征服作为母语消亡；全球约5万名学者／学生", "yue": "隨1066年諾曼征服作為母語消亡；全球約5萬名學者／學生", "vi": "Tuyệt chủng như tiếng mẹ đẻ sau cuộc chinh phạt Norman năm 1066; ~50K học giả/sinh viên trên thế giới", "th": "สูญในฐานะภาษาแม่หลังการพิชิตของชาวนอร์มันปี 1066; นักวิชาการ/นักศึกษาทั่วโลก ~50K คน", "id": "punah sebagai L1 dengan Penaklukan Normandia 1066; ~50 rb sarjana/pelajar aktif di seluruh dunia", "hi": "1066 की नॉर्मन विजय के साथ L1 के रूप में विलुप्त; विश्व भर में ~50K सक्रिय विद्वान/छात्र", "de": "mit der normannischen Eroberung 1066 als L1 ausgestorben; ~50.000 aktive Gelehrte/Studierende weltweit", "fr": "éteinte en L1 avec la conquête normande de 1066 ; ~50 000 savants/étudiants actifs dans le monde", "it": "estinta come L1 con la conquista normanna del 1066; ~50.000 studiosi/studenti attivi nel mondo", "es": "extinta como L1 con la conquista normanda de 1066; ~50 000 estudiosos/estudiantes activos en el mundo", "pt": "extinta como L1 com a Conquista Normanda de 1066; ~50 mil estudiosos/estudantes ativos no mundo", "ru": "вымер как родной после нормандского завоевания 1066 г.; ~50 тыс. активных исследователей/студентов в мире", "uk": "вимерла як рідна після нормандського завоювання 1066 р.; ~50 тис. активних дослідників/студентів у світі", "ar": "انقرضت كلغة أم مع الفتح النورماندي 1066؛ ~50 ألف باحث/طالب نشط حول العالم", "he": "נכחדה כשפת אם עם הכיבוש הנורמני ב-1066; ~50 אלף חוקרים/סטודנטים פעילים בעולם", "sw": "imetoweka kama L1 na Uvamizi wa Wanormani 1066; wasomi/wanafunzi hai elfu ~50 duniani"}, "extinct early 18th century — last L1 speakers died c. 1700; modern revival movement has ~50 second-language enthusiasts": {"ja": "18世紀初頭に消滅 — 最後の母語話者は1700年頃に死去；現代の復興運動には第二言語の愛好者約50人", "ko": "18세기 초 소멸 — 마지막 모어 화자는 1700년경 사망; 현대 부활 운동에 제2언어 애호가 약 50명", "zh": "18世纪初消亡 — 最后的母语者约于1700年去世；现代复兴运动约有50名第二语言爱好者", "yue": "18世紀初消亡 — 最後的母語者約於1700年去世；現代復興運動約有50名第二語言愛好者", "vi": "Tuyệt chủng đầu thế kỷ 18 — những người nói tiếng mẹ đẻ cuối cùng mất khoảng năm 1700; phong trào hồi sinh hiện đại có ~50 người đam mê học như ngôn ngữ thứ hai", "th": "สูญเมื่อต้นศตวรรษที่ 18 — ผู้พูดภาษาแม่คนสุดท้ายเสียชีวิตราว ค.ศ. 1700; ขบวนการฟื้นฟูสมัยใหม่มีผู้สนใจใช้เป็นภาษาที่สอง ~50 คน", "id": "punah awal abad ke-18 — penutur L1 terakhir wafat sekitar 1700; gerakan revitalisasi modern memiliki ~50 peminat bahasa kedua", "hi": "18वीं शताब्दी के आरंभ में विलुप्त — अंतिम L1 वक्ता लगभग 1700 में मरे; आधुनिक पुनरुद्धार आंदोलन में ~50 द्वितीय-भाषा उत्साही", "de": "Anfang des 18. Jh. ausgestorben — letzte L1-Sprecher starben um 1700; moderne Wiederbelebungsbewegung mit ~50 Zweitsprachlern", "fr": "éteinte au début du XVIIIe s. — derniers locuteurs L1 morts vers 1700 ; le mouvement de revitalisation moderne compte ~50 passionnés en langue seconde", "it": "estinta all'inizio del XVIII sec. — ultimi parlanti L1 morti intorno al 1700; il movimento moderno di rivitalizzazione conta ~50 appassionati come L2", "es": "extinta a principios del s. XVIII — los últimos hablantes L1 murieron hacia 1700; el movimiento moderno de revitalización cuenta con ~50 entusiastas como segunda lengua", "pt": "extinta no início do séc. 18 — últimos falantes L1 morreram c. 1700; o movimento moderno de revitalização tem ~50 entusiastas L2", "ru": "вымер в начале 18 в. — последние носители умерли ок. 1700 г.; современное движение возрождения — ~50 энтузиастов (второй язык)", "uk": "вимерла на початку 18 ст. — останні носії померли бл. 1700 р.; сучасний рух відродження — ~50 ентузіастів (друга мова)", "ar": "انقرضت مطلع القرن 18 — مات آخر الناطقين بها كلغة أم نحو 1700؛ حركة الإحياء الحديثة تضم ~50 متحمسًا يتحدثونها كلغة ثانية", "he": "נכחדה בתחילת המאה ה-18 — דוברי שפת האם האחרונים מתו בערך ב-1700; בתנועת ההחייאה המודרנית ~50 חובבים דוברי שפה שנייה", "sw": "imetoweka mwanzoni mwa karne ya 18 — wazungumzaji wa mwisho wa L1 walikufa karibu 1700; harakati ya kisasa ya ufufuaji ina wapenzi ~50 wa L2"}, "extinct ~1st century BCE; ~600 documented inscriptions from 6th-1st c. BCE": {"ja": "紀元前1世紀頃に消滅；紀元前6〜1世紀の碑文約600点が記録されている", "ko": "기원전 1세기경 소멸; 기원전 6~1세기 비문 약 600점이 기록됨", "zh": "约公元前1世纪消亡；存有公元前6—前1世纪铭文约600件", "yue": "約公元前1世紀消亡；存有公元前6至前1世紀銘文約600件", "vi": "Tuyệt chủng khoảng thế kỷ 1 TCN; ~600 bia ký được ghi nhận từ thế kỷ 6–1 TCN", "th": "สูญราวศตวรรษที่ 1 ก่อน ค.ศ.; มีจารึกที่บันทึกไว้ ~600 ชิ้นจากศตวรรษที่ 6–1 ก่อน ค.ศ.", "id": "punah ~abad ke-1 SM; ~600 prasasti terdokumentasi dari abad ke-6–1 SM", "hi": "~पहली शताब्दी ई.पू. में विलुप्त; 6ठी-पहली शताब्दी ई.पू. के ~600 प्रलेखित अभिलेख", "de": "ausgestorben ~1. Jh. v. Chr.; ~600 belegte Inschriften aus dem 6.–1. Jh. v. Chr.", "fr": "éteinte ~Ier s. av. J.-C. ; ~600 inscriptions attestées du VIe au Ier s. av. J.-C.", "it": "estinta ~I sec. a.C.; ~600 iscrizioni documentate dal VI al I sec. a.C.", "es": "extinta ~s. I a. C.; ~600 inscripciones documentadas de los ss. VI-I a. C.", "pt": "extinta ~séc. 1 a.C.; ~600 inscrições documentadas dos séc. 6-1 a.C.", "ru": "вымер ~1 в. до н. э.; ~600 известных надписей 6-1 вв. до н. э.", "uk": "вимерла ~1 ст. до н. е.; ~600 відомих написів 6-1 ст. до н. е.", "ar": "انقرضت ~القرن 1 ق.م؛ ~600 نقش موثق من القرون 6-1 ق.م", "he": "נכחדה ~המאה ה-1 לפנה״ס; ~600 כתובות מתועדות מהמאות ה-6-1 לפנה״ס", "sw": "imetoweka ~karne ya 1 KK; maandishi ~600 yaliyorekodiwa ya karne ya 6-1 KK"}, "fluent": {"ja": "流暢な話者", "ko": "유창한 화자", "zh": "流利使用者", "yue": "流利使用者", "vi": "Người nói thành thạo", "th": "ผู้พูดคล่อง", "id": "fasih", "hi": "धाराप्रवाह", "de": "fließend", "fr": "courants", "it": "fluenti", "es": "fluidos", "pt": "fluentes", "ru": "свободно владеющие", "uk": "вільно володіють", "ar": "طليقون", "he": "שוטפים", "sw": "fasaha"}, "fluent constructed-language speakers": {"ja": "人工言語の流暢な話者", "ko": "인공어 유창 화자", "zh": "流利的人造语言使用者", "yue": "流利的人造語言使用者", "vi": "Người nói thành thạo ngôn ngữ nhân tạo", "th": "ผู้พูดภาษาประดิษฐ์ได้คล่อง", "id": "penutur fasih bahasa buatan", "hi": "कृत्रिम भाषा के धाराप्रवाह वक्ता", "de": "fließende Sprecher der Plansprache", "fr": "locuteurs courants de la langue construite", "it": "parlanti fluenti della lingua artificiale", "es": "hablantes fluidos de la lengua construida", "pt": "falantes fluentes da língua construída", "ru": "свободно говорящие на искусственном языке", "uk": "вільні мовці штучної мови", "ar": "متحدثون طليقون باللغة المصطنعة", "he": "דוברים שוטפים של השפה המתוכננת", "sw": "wazungumzaji fasaha wa lugha ya kubuni"}, "heritage learners + a handful of fluent elders; severely endangered, UNESCO classifies critically endangered": {"ja": "継承語学習者＋ごく少数の流暢な高齢者；重大な危険、UNESCOの分類は「極めて深刻」", "ko": "계승어 학습자 + 소수의 유창한 노인; 심각한 위기, 유네스코 분류 '극심한 위기'", "zh": "传承语学习者+少数流利的长者；严重危险，联合国教科文组织列为“极度危险”", "yue": "傳承語學習者+少數流利的長者；嚴重危險，聯合國教科文組織列為「極度危險」", "vi": "Người học ngôn ngữ di sản + vài người cao tuổi nói thành thạo; nguy cấp nghiêm trọng, UNESCO xếp loại cực kỳ nguy cấp", "th": "ผู้เรียนภาษามรดก + ผู้สูงอายุที่พูดคล่องไม่กี่คน; ใกล้สูญหายอย่างรุนแรง ยูเนสโกจัดเป็นขั้นวิกฤต", "id": "pelajar warisan + segelintir lansia fasih; sangat terancam, UNESCO: kritis terancam", "hi": "विरासत शिक्षार्थी + कुछ धाराप्रवाह बुज़ुर्ग; गंभीर रूप से संकटग्रस्त, UNESCO: अति संकटग्रस्त", "de": "Herkunftssprachler + eine Handvoll fließender Älterer; ernsthaft gefährdet, UNESCO: vom Aussterben bedroht", "fr": "apprenants d'héritage + quelques aînés courants ; sérieusement en danger, UNESCO : en situation critique", "it": "apprendenti di lingua ereditaria + pochi anziani fluenti; gravemente in pericolo, UNESCO: in pericolo critico", "es": "aprendices de herencia + un puñado de mayores fluidos; seriamente amenazada, UNESCO: en situación crítica", "pt": "aprendizes de herança + alguns poucos idosos fluentes; severamente ameaçada, UNESCO: criticamente ameaçada", "ru": "изучающие язык наследия + горстка свободно говорящих стариков; в серьёзной опасности, ЮНЕСКО: в критическом состоянии", "uk": "ті, хто вивчає мову предків + жменька вільних мовців похилого віку; у серйозній небезпеці, ЮНЕСКО: у критичному стані", "ar": "متعلمو لغة التراث + قلة من المسنين الطليقين؛ مهددة بشدة، اليونسكو: مهددة بشكل حرج", "he": "לומדי שפת מורשת + קומץ קשישים שוטפים; בסכנה חמורה, אונסק״ו: בסכנה קריטית", "sw": "wanafunzi wa lugha ya urithi + wazee wachache fasaha; hatarini sana, UNESCO: hatarini mno"}, "heritage learners; last L1 died early 20th c.; community-led revival since 1990s": {"ja": "継承語学習者；最後の母語話者は20世紀初頭に死去；1990年代から共同体主導の復興", "ko": "계승어 학습자; 마지막 모어 화자는 20세기 초 사망; 1990년대부터 공동체 주도 부활", "zh": "传承语学习者；最后的母语者于20世纪初去世；自1990年代起社区主导复兴", "yue": "傳承語學習者；最後的母語者於20世紀初去世；自1990年代起社區主導復興", "vi": "Người học ngôn ngữ di sản; người nói tiếng mẹ đẻ cuối cùng mất đầu thế kỷ 20; cộng đồng tự hồi sinh từ thập niên 1990", "th": "ผู้เรียนภาษามรดก; ผู้พูดภาษาแม่คนสุดท้ายเสียชีวิตต้นศตวรรษที่ 20; ชุมชนเป็นผู้นำการฟื้นฟูตั้งแต่ทศวรรษ 1990", "id": "pelajar warisan; penutur L1 terakhir wafat awal abad ke-20; revitalisasi berbasis komunitas sejak 1990-an", "hi": "विरासत शिक्षार्थी; अंतिम L1 वक्ता 20वीं शताब्दी के आरंभ में मरे; 1990 के दशक से समुदाय-आधारित पुनरुद्धार", "de": "Herkunftssprachler; letzter L1-Sprecher starb Anfang des 20. Jh.; gemeinschaftliche Wiederbelebung seit den 1990ern", "fr": "apprenants d'héritage ; dernier locuteur L1 mort au début du XXe s. ; revitalisation communautaire depuis les années 1990", "it": "apprendenti di lingua ereditaria; ultimo parlante L1 morto all'inizio del XX sec.; rivitalizzazione comunitaria dagli anni '90", "es": "aprendices de herencia; el último hablante L1 murió a principios del s. XX; revitalización comunitaria desde los años 90", "pt": "aprendizes de herança; último L1 morreu no início do séc. 20; revitalização comunitária desde os anos 1990", "ru": "изучающие язык наследия; последний носитель умер в начале 20 в.; общинное возрождение с 1990-х", "uk": "ті, хто вивчає мову предків; останній носій помер на початку 20 ст.; громадське відродження з 1990-х", "ar": "متعلمو لغة التراث؛ مات آخر ناطق بها كلغة أم مطلع القرن 20؛ إحياء مجتمعي منذ عقد 1990", "he": "לומדי שפת מורשת; דובר שפת האם האחרון מת בתחילת המאה ה-20; החייאה קהילתית מאז שנות ה-1990", "sw": "wanafunzi wa lugha ya urithi; L1 wa mwisho alikufa mwanzoni mwa karne ya 20; ufufuaji wa jamii tangu miaka ya 1990"}, "heritage revival; ~50 partial speakers": {"ja": "継承語の復興；部分話者約50人", "ko": "계승어 부활; 부분 화자 약 50명", "zh": "传承复兴；约50名部分掌握者", "yue": "傳承復興；約50名部分掌握者", "vi": "Phục hồi ngôn ngữ di sản; ~50 người nói một phần", "th": "การฟื้นฟูภาษามรดก; ผู้พูดได้บางส่วน ~50 คน", "id": "revitalisasi warisan; ~50 penutur parsial", "hi": "विरासत पुनरुद्धार; ~50 आंशिक वक्ता", "de": "Wiederbelebung; ~50 Teilsprecher", "fr": "revitalisation ; ~50 locuteurs partiels", "it": "rivitalizzazione; ~50 parlanti parziali", "es": "revitalización; ~50 hablantes parciales", "pt": "revitalização de herança; ~50 falantes parciais", "ru": "возрождение; ~50 частичных носителей", "uk": "відродження; ~50 часткових мовців", "ar": "إحياء تراثي؛ ~50 متحدثًا جزئيًا", "he": "החייאת מורשת; ~50 דוברים חלקיים", "sw": "ufufuaji wa urithi; wazungumzaji kiasi ~50"}, "highly endangered — UNESCO definitely endangered": {"ja": "消滅の危機が高い — UNESCO「危険」", "ko": "위기 높음 — 유네스코 '확실한 위기'", "zh": "高度濒危 — 联合国教科文组织“确有危险”", "yue": "高度瀕危 — 聯合國教科文組織「確有危險」", "vi": "Nguy cấp cao — UNESCO: chắc chắn nguy cấp", "th": "ใกล้สูญหายสูง — ยูเนสโก: ใกล้สูญหายแน่นอน", "id": "sangat terancam — UNESCO: pasti terancam", "hi": "अत्यधिक संकटग्रस्त — UNESCO: निश्चित रूप से संकटग्रस्त", "de": "stark gefährdet — UNESCO: definitiv gefährdet", "fr": "fortement menacée — UNESCO : en danger", "it": "fortemente minacciata — UNESCO: sicuramente in pericolo", "es": "muy amenazada — UNESCO: claramente amenazada", "pt": "altamente ameaçada — UNESCO: definitivamente ameaçada", "ru": "в большой опасности — ЮНЕСКО: под угрозой", "uk": "у великій небезпеці — ЮНЕСКО: під загрозою", "ar": "مهددة جدًا — اليونسكو: مهددة بالتأكيد", "he": "בסכנה גבוהה — אונסק״ו: בסכנה ודאית", "sw": "hatarini kubwa — UNESCO: hatarini dhahiri"}, "hypothetical": {"ja": "仮説上", "ko": "가설상", "zh": "假设", "yue": "假設", "vi": "Giả thuyết", "th": "เชิงสมมติฐาน", "id": "hipotetis", "hi": "काल्पनिक", "de": "hypothetisch", "fr": "hypothétique", "it": "ipotetica", "es": "hipotética", "pt": "hipotética", "ru": "гипотетический", "uk": "гіпотетична", "ar": "افتراضية", "he": "היפותטית", "sw": "ya kinadharia"}, "in Quanzhou + diaspora": {"ja": "泉州＋在外", "ko": "취안저우 + 해외 동포", "zh": "泉州+海外侨民", "yue": "泉州+海外僑民", "vi": "Ở Tuyền Châu + kiều dân", "th": "ในเฉวียนโจว + ชุมชนพลัดถิ่น", "id": "di Quanzhou + diaspora", "hi": "च्वानझोउ में + प्रवासी", "de": "in Quanzhou + Diaspora", "fr": "à Quanzhou + diaspora", "it": "a Quanzhou + diaspora", "es": "en Quanzhou + diáspora", "pt": "em Quanzhou + diáspora", "ru": "в Цюаньчжоу + диаспора", "uk": "у Цюаньчжоу + діаспора", "ar": "في تشيوانتشو + الشتات", "he": "בצ׳ואנג׳ואו + תפוצות", "sw": "Quanzhou + ughaibuni"}, "in diaspora communities; Anatolia historic homeland depleted by genocide": {"ja": "在外コミュニティ；故地アナトリアはジェノサイドにより話者が激減", "ko": "해외 공동체; 역사적 본고장 아나톨리아는 집단학살로 화자가 사라짐", "zh": "海外侨民社区；历史故土安纳托利亚因种族灭绝而人口锐减", "yue": "海外僑民社區；歷史故土安納托利亞因種族滅絕而人口銳減", "vi": "Trong các cộng đồng kiều dân; quê hương lịch sử Anatolia bị suy kiệt do diệt chủng", "th": "ในชุมชนพลัดถิ่น; ถิ่นเดิมในอานาโตเลียเหลือผู้พูดน้อยลงเพราะการฆ่าล้างเผ่าพันธุ์", "id": "di komunitas diaspora; tanah asal historis Anatolia terkuras akibat genosida", "hi": "प्रवासी समुदायों में; ऐतिहासिक मातृभूमि अनातोलिया नरसंहार से रिक्त", "de": "in Diasporagemeinschaften; historische Heimat Anatolien durch den Völkermord entvölkert", "fr": "dans les communautés de la diaspora ; berceau historique anatolien vidé par le génocide", "it": "nelle comunità della diaspora; la patria storica anatolica è stata svuotata dal genocidio", "es": "en comunidades de la diáspora; la patria histórica de Anatolia quedó despoblada por el genocidio", "pt": "em comunidades da diáspora; a terra natal histórica na Anatólia foi esvaziada pelo genocídio", "ru": "в общинах диаспоры; историческая родина в Анатолии опустела после геноцида", "uk": "у громадах діаспори; історична батьківщина в Анатолії спорожніла після геноциду", "ar": "في مجتمعات الشتات؛ أُفرغ الموطن التاريخي في الأناضول بفعل الإبادة الجماعية", "he": "בקהילות התפוצות; המולדת ההיסטורית באנטוליה התרוקנה בשל רצח העם", "sw": "katika jamii za ughaibuni; nchi asili ya kihistoria Anatolia ilimalizwa na mauaji ya kimbari"}, "incl. L2": {"ja": "第二言語を含む", "ko": "제2언어 포함", "zh": "含第二语言", "yue": "包括第二語言", "vi": "Kể cả ngôn ngữ thứ hai", "th": "รวมภาษาที่สอง", "id": "termasuk L2", "hi": "L2 सहित", "de": "inkl. L2", "fr": "avec L2", "it": "incl. L2", "es": "incl. L2", "pt": "incl. L2", "ru": "вкл. второй язык", "uk": "разом із другою мовою", "ar": "مع اللغة الثانية", "he": "כולל שפה שנייה", "sw": "pamoja na L2"}, "largely undercounted in censuses; speakers in western Iran identify as Kurdish in census": {"ja": "国勢調査では大幅に過少計上；イラン西部の話者は調査でクルド語と申告", "ko": "인구조사에서 크게 과소 집계; 이란 서부 화자는 조사에서 쿠르드어로 신고", "zh": "人口普查中严重低估；伊朗西部的使用者在普查中自报为库尔德语", "yue": "人口普查中嚴重低估；伊朗西部的使用者在普查中自報為庫爾德語", "vi": "Bị tính thiếu nhiều trong điều tra dân số; người nói ở tây Iran khai là tiếng Kurd", "th": "ถูกนับต่ำกว่าจริงมากในสำมะโน; ผู้พูดในอิหร่านตะวันตกระบุว่าเป็นภาษาเคิร์ดในสำมะโน", "id": "sangat kurang tercacah dalam sensus; penutur di Iran barat mengidentifikasi diri sebagai Kurdi dalam sensus", "hi": "जनगणना में काफ़ी कम गिनती; पश्चिमी ईरान के वक्ता जनगणना में स्वयं को कुर्द बताते हैं", "de": "in Volkszählungen stark untererfasst; Sprecher im Westiran geben sich im Zensus als Kurden an", "fr": "largement sous-recensée ; les locuteurs de l'ouest de l'Iran se déclarent kurdes au recensement", "it": "fortemente sottostimata nei censimenti; i parlanti dell'Iran occidentale si dichiarano curdi", "es": "muy subcontada en los censos; los hablantes del oeste de Irán se declaran kurdos en el censo", "pt": "muito subcontada nos censos; falantes no oeste do Irã se identificam como curdos no censo", "ru": "сильно недоучтён переписями; носители на западе Ирана записываются курдами", "uk": "значно недооблікована переписами; носії на заході Ірану записуються курдами", "ar": "يُقلَّل عددها كثيرًا في التعدادات؛ المتحدثون غرب إيران يعرّفون أنفسهم كأكراد في التعداد", "he": "נספרת בחסר רב במפקדים; הדוברים במערב איראן מזדהים במפקד ככורדים", "sw": "inahesabiwa pungufu sana katika sensa; wazungumzaji magharibi mwa Iran hujitambulisha kama Wakurdi katika sensa"}, "largely undercounted in censuses; speakers self-identify as Hindi or Maithili in Indian census": {"ja": "国勢調査では大幅に過少計上；インド国勢調査では話者がヒンディー語またはマイティリー語と自己申告", "ko": "인구조사에서 크게 과소 집계; 인도 인구조사에서 화자가 힌디어나 마이틸리어로 자기 신고", "zh": "人口普查中严重低估；印度人口普查中使用者自报为印地语或迈蒂利语", "yue": "人口普查中嚴重低估；印度人口普查中使用者自報為印地語或邁蒂利語", "vi": "Bị tính thiếu nhiều trong điều tra dân số; người nói tự khai là tiếng Hindi hoặc Maithili trong điều tra dân số Ấn Độ", "th": "ถูกนับต่ำกว่าจริงมากในสำมะโน; ในสำมะโนอินเดียผู้พูดระบุตนว่าใช้ภาษาฮินดีหรือไมถิลี", "id": "sangat kurang tercacah dalam sensus; penutur mengidentifikasi diri sebagai Hindi atau Maithili dalam sensus India", "hi": "जनगणना में काफ़ी कम गिनती; भारतीय जनगणना में वक्ता स्वयं को हिंदी या मैथिली भाषी बताते हैं", "de": "in Volkszählungen stark untererfasst; Sprecher geben im indischen Zensus Hindi oder Maithili an", "fr": "largement sous-recensée ; les locuteurs se déclarent hindiphones ou maïthiliphones au recensement indien", "it": "fortemente sottostimata nei censimenti; i parlanti si dichiarano hindi o maithili nel censimento indiano", "es": "muy subcontada en los censos; los hablantes se declaran de hindi o maithili en el censo indio", "pt": "muito subcontada nos censos; falantes se identificam como hindi ou maithili no censo indiano", "ru": "сильно недоучтён переписями; носители записываются как говорящие на хинди или майтхили", "uk": "значно недооблікована переписами; носії записуються як мовці гінді чи майтхілі", "ar": "يُقلَّل عددها كثيرًا في التعدادات؛ المتحدثون يعرّفون لغتهم بالهندية أو الميثيلية في تعداد الهند", "he": "נספרת בחסר רב במפקדים; הדוברים מזדהים כדוברי הינדי או מאיטהילי במפקד ההודי", "sw": "inahesabiwa pungufu sana katika sensa; wazungumzaji hujitambulisha kama Kihindi au Kimaithili katika sensa ya India"}, "largest \"scheduled tribe\" non-recognized language in India; speakers self-identify as Hindi or Telugu in census": {"ja": "インドの「指定部族」言語で未公認のものとしては最大；話者は国勢調査でヒンディー語またはテルグ語と自己申告", "ko": "인도 '지정 부족' 언어 중 미공인 최대 언어; 화자는 인구조사에서 힌디어나 텔루구어로 자기 신고", "zh": "印度最大的未获承认“表列部落”语言；使用者在普查中自报为印地语或泰卢固语", "yue": "印度最大的未獲承認「表列部落」語言；使用者在普查中自報為印地語或泰盧固語", "vi": "Ngôn ngữ \"bộ lạc theo danh mục\" chưa được công nhận lớn nhất Ấn Độ; người nói tự khai là tiếng Hindi hoặc Telugu trong điều tra dân số", "th": "ภาษา \"ชนเผ่าตามบัญชี\" ที่ยังไม่ได้รับการรับรองซึ่งใหญ่ที่สุดในอินเดีย; ผู้พูดระบุตนว่าใช้ภาษาฮินดีหรือเตลูกูในสำมะโน", "id": "bahasa «suku terdaftar» tak diakui terbesar di India; penutur mengidentifikasi diri sebagai Hindi atau Telugu dalam sensus", "hi": "भारत की सबसे बड़ी गैर-मान्यता प्राप्त «अनुसूचित जनजाति» भाषा; जनगणना में वक्ता स्वयं को हिंदी या तेलुगु भाषी बताते हैं", "de": "größte nicht anerkannte Sprache eines „Scheduled Tribe“ in Indien; Sprecher geben im Zensus Hindi oder Telugu an", "fr": "plus grande langue non reconnue d'une « tribu répertoriée » en Inde ; les locuteurs se déclarent hindiphones ou télougouphones au recensement", "it": "la più grande lingua non riconosciuta di una «tribù registrata» in India; i parlanti si dichiarano hindi o telugu nel censimento", "es": "la mayor lengua no reconocida de una «tribu registrada» de la India; los hablantes se declaran de hindi o telugu en el censo", "pt": "a maior língua não reconhecida de \"tribo registrada\" na Índia; falantes se identificam como hindi ou telugu no censo", "ru": "крупнейший непризнанный язык «зарегистрированных племён» Индии; носители записываются как говорящие на хинди или телугу", "uk": "найбільша невизнана мова «зареєстрованих племен» Індії; носії записуються як мовці гінді чи телугу", "ar": "أكبر لغة غير معترف بها لـ«القبائل المجدولة» في الهند؛ المتحدثون يعرّفون لغتهم بالهندية أو التيلوغوية في التعداد", "he": "השפה הלא-מוכרת הגדולה ביותר של \"שבט רשום\" בהודו; הדוברים מזדהים במפקד כדוברי הינדי או טלוגו", "sw": "lugha kubwa zaidi isiyotambuliwa ya \"kabila lililoorodheshwa\" India; wazungumzaji hujitambulisha kama Kihindi au Kitelugu katika sensa"}, "largest Chibchan language by speakers": {"ja": "話者数で最大のチブチャ語族の言語", "ko": "화자 수 기준 최대 치브차어족 언어", "zh": "使用人数最多的奇布查语言", "yue": "使用人數最多的奇布查語言", "vi": "Ngôn ngữ Chibcha có nhiều người nói nhất", "th": "ภาษาตระกูลชิบชาที่มีผู้พูดมากที่สุด", "id": "bahasa Chibcha terbesar menurut jumlah penutur", "hi": "वक्ताओं की संख्या से सबसे बड़ी चिबचा भाषा", "de": "sprecherreichste Chibcha-Sprache", "fr": "langue chibcha la plus parlée", "it": "la lingua chibcha con più parlanti", "es": "la lengua chibcha con más hablantes", "pt": "a maior língua chibcha em falantes", "ru": "крупнейший чибчанский язык по числу носителей", "uk": "найбільша чибчанська мова за кількістю мовців", "ar": "أكبر لغة تشيبتشية من حيث المتحدثين", "he": "השפה הצ׳יבצ׳ית הגדולה ביותר במספר דובריה", "sw": "lugha kubwa zaidi ya Kichibcha kwa wazungumzaji"}, "largest Formosan language; only ~10K daily L1": {"ja": "台湾原住民諸語で最大；日常的な母語話者は約1万のみ", "ko": "최대 대만 원주민 언어; 일상 모어 화자는 약 1만에 불과", "zh": "最大的台湾南岛语言；日常母语使用者仅约1万", "yue": "最大的台灣南島語言；日常母語使用者僅約1萬", "vi": "Ngôn ngữ Formosa lớn nhất; chỉ ~10K người nói tiếng mẹ đẻ hằng ngày", "th": "ภาษาฟอร์โมซาที่ใหญ่ที่สุด; มีผู้พูดเป็นภาษาแม่ในชีวิตประจำวันเพียง ~10K", "id": "bahasa Formosa terbesar; hanya ~10 rb L1 harian", "hi": "सबसे बड़ी फ़ॉर्मोसी भाषा; केवल ~10K दैनिक L1", "de": "größte formosanische Sprache; nur ~10.000 tägliche L1", "fr": "plus grande langue formosane ; seulement ~10 000 L1 au quotidien", "it": "la più grande lingua formosana; solo ~10.000 L1 quotidiana", "es": "la mayor lengua formosana; solo ~10 000 L1 cotidiana", "pt": "a maior língua formosana; só ~10 mil L1 de uso diário", "ru": "крупнейший формозский язык; лишь ~10 тыс. ежедневно как родной", "uk": "найбільша формозька мова; лише ~10 тис. щодня як рідна", "ar": "أكبر لغة فورموزية؛ ~10 آلاف فقط لغة أم يومية", "he": "השפה הפורמוזית הגדולה ביותר; רק ~10 אלף שפת אם יומיומית", "sw": "lugha kubwa zaidi ya Kiformosa; L1 ya kila siku elfu ~10 tu"}, "lingua franca, 2-5M L1": {"ja": "共通語、母語話者200万〜500万", "ko": "공통어, 모어 화자 200만~500만", "zh": "通用语，母语者200万—500万", "yue": "通用語，母語者200萬至500萬", "vi": "Ngôn ngữ chung, 2–5M người nói tiếng mẹ đẻ", "th": "ภาษากลาง ผู้พูดเป็นภาษาแม่ 2–5M", "id": "lingua franca, 2-5 jt L1", "hi": "संपर्क भाषा, 2-5M L1", "de": "Verkehrssprache, 2-5 Mio. L1", "fr": "lingua franca, 2-5 M de L1", "it": "lingua franca, 2-5 Mln L1", "es": "lengua franca, 2-5 M de L1", "pt": "língua franca, 2-5 mi L1", "ru": "лингва франка, 2-5 млн носителей", "uk": "лінгва франка, 2-5 млн носіїв", "ar": "لغة مشتركة، 2-5 ملايين كلغة أم", "he": "לינגואה פרנקה, 2-5 מיליון דוברי שפת אם", "sw": "lugha ya mawasiliano, L1 milioni 2-5"}, "lingua franca, ~500K L1": {"ja": "共通語、母語話者約50万", "ko": "공통어, 모어 화자 약 50만", "zh": "通用语，母语者约50万", "yue": "通用語，母語者約50萬", "vi": "Ngôn ngữ chung, ~500K người nói tiếng mẹ đẻ", "th": "ภาษากลาง ผู้พูดเป็นภาษาแม่ ~500K", "id": "lingua franca, ~500 rb L1", "hi": "संपर्क भाषा, ~500K L1", "de": "Verkehrssprache, ~500.000 L1", "fr": "lingua franca, ~500 000 L1", "it": "lingua franca, ~500.000 L1", "es": "lengua franca, ~500 000 L1", "pt": "língua franca, ~500 mil L1", "ru": "лингва франка, ~500 тыс. носителей", "uk": "лінгва франка, ~500 тис. носіїв", "ar": "لغة مشتركة، ~500 ألف كلغة أم", "he": "לינגואה פרנקה, ~500 אלף דוברי שפת אם", "sw": "lugha ya mawasiliano, L1 elfu ~500"}, "lingua franca; ~50% of Afghanistan population uses Dari": {"ja": "共通語；アフガニスタン人口の約50%がダリー語を使用", "ko": "공통어; 아프가니스탄 인구의 약 50%가 다리어 사용", "zh": "通用语；约50%的阿富汗人口使用达利语", "yue": "通用語；約50%的阿富汗人口使用達利語", "vi": "Ngôn ngữ chung; ~50% dân số Afghanistan dùng tiếng Dari", "th": "ภาษากลาง; ประชากรอัฟกานิสถาน ~50% ใช้ภาษาดารี", "id": "lingua franca; ~50% penduduk Afganistan memakai Dari", "hi": "संपर्क भाषा; अफ़ग़ानिस्तान की ~50% आबादी दरी का उपयोग करती है", "de": "Verkehrssprache; ~50 % der Bevölkerung Afghanistans nutzen Dari", "fr": "lingua franca ; ~50 % de la population afghane utilise le dari", "it": "lingua franca; ~50% della popolazione afghana usa il dari", "es": "lengua franca; ~50 % de la población afgana usa el darí", "pt": "língua franca; ~50% da população do Afeganistão usa o dari", "ru": "лингва франка; ~50% населения Афганистана говорит на дари", "uk": "лінгва франка; ~50% населення Афганістану говорить дарі", "ar": "لغة مشتركة؛ ~50% من سكان أفغانستان يستخدمون الدارية", "he": "לינגואה פרנקה; ~50% מאוכלוסיית אפגניסטן משתמשים בדארי", "sw": "lugha ya mawasiliano; ~50% ya wakazi wa Afghanistan hutumia Kidari"}, "liturgical": {"ja": "典礼語", "ko": "전례어", "zh": "礼仪语言", "yue": "禮儀語言", "vi": "Ngôn ngữ nghi lễ", "th": "ภาษาพิธีกรรม", "id": "liturgi", "hi": "धार्मिक", "de": "liturgisch", "fr": "liturgique", "it": "liturgica", "es": "litúrgica", "pt": "litúrgica", "ru": "литургический", "uk": "літургійна", "ar": "طقسية", "he": "ליטורגית", "sw": "ya ibada"}, "lower bound only": {"ja": "下限値のみ", "ko": "하한값만", "zh": "仅为下限", "yue": "僅為下限", "vi": "Chỉ là cận dưới", "th": "เป็นค่าขั้นต่ำเท่านั้น", "id": "hanya batas bawah", "hi": "केवल न्यूनतम सीमा", "de": "nur Untergrenze", "fr": "borne inférieure seulement", "it": "solo limite inferiore", "es": "solo límite inferior", "pt": "apenas limite inferior", "ru": "только нижняя граница", "uk": "лише нижня межа", "ar": "الحد الأدنى فقط", "he": "גבול תחתון בלבד", "sw": "kiwango cha chini tu"}, "macrolanguage": {"ja": "マクロ言語", "ko": "매크로언어", "zh": "宏语言", "yue": "宏語言", "vi": "Ngôn ngữ vĩ mô", "th": "ภาษามหภาค", "id": "makrobahasa", "hi": "वृहद्भाषा", "de": "Makrosprache", "fr": "macrolangue", "it": "macrolingua", "es": "macrolengua", "pt": "macrolíngua", "ru": "макроязык", "uk": "макромова", "ar": "لغة كبرى", "he": "מאקרו-שפה", "sw": "lugha-kuu"}, "modern descendants": {"ja": "現代の子孫言語", "ko": "현대 후손 언어", "zh": "现代后裔语言", "yue": "現代後裔語言", "vi": "Các ngôn ngữ hậu duệ hiện đại", "th": "ภาษาลูกหลานในปัจจุบัน", "id": "keturunan modern", "hi": "आधुनिक वंशज", "de": "moderne Nachfahren", "fr": "descendants modernes", "it": "discendenti moderni", "es": "descendientes modernos", "pt": "descendentes modernos", "ru": "современные потомки", "uk": "сучасні нащадки", "ar": "المنحدرات الحديثة", "he": "צאצאים מודרניים", "sw": "vizazi vya kisasa"}, "modern dialects": {"ja": "現代の諸方言", "ko": "현대 방언", "zh": "现代方言", "yue": "現代方言", "vi": "Các phương ngữ hiện đại", "th": "ภาษาถิ่นในปัจจุบัน", "id": "dialek modern", "hi": "आधुनिक बोलियाँ", "de": "moderne Dialekte", "fr": "dialectes modernes", "it": "dialetti moderni", "es": "dialectos modernos", "pt": "dialetos modernos", "ru": "современные диалекты", "uk": "сучасні діалекти", "ar": "اللهجات الحديثة", "he": "ניבים מודרניים", "sw": "lahaja za kisasa"}, "mostly Gambela Region Ethiopia + Upper Nile State South Sudan": {"ja": "主にエチオピアのガンベラ州＋南スーダンの上ナイル州", "ko": "주로 에티오피아 감벨라주 + 남수단 어퍼나일주", "zh": "主要在埃塞俄比亚甘贝拉州+南苏丹上尼罗州", "yue": "主要在埃塞俄比亞甘貝拉州+南蘇丹上尼羅州", "vi": "Chủ yếu ở vùng Gambela, Ethiopia + bang Thượng Nile, Nam Sudan", "th": "ส่วนใหญ่อยู่ในแคว้นกัมเบลา เอธิโอเปีย + รัฐอัปเปอร์ไนล์ ซูดานใต้", "id": "sebagian besar Wilayah Gambela, Etiopia + Negara Bagian Upper Nile, Sudan Selatan", "hi": "मुख्यतः गाम्बेला क्षेत्र, इथियोपिया + अपर नाइल राज्य, दक्षिण सूडान", "de": "überwiegend Region Gambela (Äthiopien) + Bundesstaat Upper Nile (Südsudan)", "fr": "surtout région de Gambela (Éthiopie) + État du Haut-Nil (Soudan du Sud)", "it": "per lo più regione di Gambela (Etiopia) + Stato dell'Alto Nilo (Sud Sudan)", "es": "sobre todo región de Gambela (Etiopía) + estado del Alto Nilo (Sudán del Sur)", "pt": "sobretudo região de Gambela, Etiópia + estado do Alto Nilo, Sudão do Sul", "ru": "в основном регион Гамбела (Эфиопия) + штат Верхний Нил (Южный Судан)", "uk": "переважно регіон Гамбела (Ефіопія) + штат Верхній Ніл (Південний Судан)", "ar": "أساسًا إقليم غامبيلا في إثيوبيا + ولاية أعالي النيل في جنوب السودان", "he": "בעיקר אזור גמבלה באתיופיה + מדינת הנילוס העליון בדרום סודן", "sw": "hasa Mkoa wa Gambela, Ethiopia + Jimbo la Upper Nile, Sudan Kusini"}, "mostly L2 lingua franca; L1 ≈ 15-20M; total ≈ 100M (East Africa)": {"ja": "主に第二言語としての共通語；母語≈1,500万〜2,000万；合計≈1億（東アフリカ）", "ko": "주로 제2언어 공통어; 모어 ≈ 1,500만~2,000만; 합계 ≈ 1억(동아프리카)", "zh": "主要为第二语言通用语；母语≈1500万—2000万；合计≈1亿（东非）", "yue": "主要為第二語言通用語；母語≈1,500萬至2,000萬；合計≈1億（東非）", "vi": "Chủ yếu là ngôn ngữ chung dạng ngôn ngữ thứ hai; tiếng mẹ đẻ ≈ 15–20M; tổng ≈ 100M (Đông Phi)", "th": "ส่วนใหญ่เป็นภาษากลางในฐานะภาษาที่สอง; ภาษาแม่ ≈ 15–20M; รวม ≈ 100M (แอฟริกาตะวันออก)", "id": "sebagian besar lingua franca L2; L1 ≈ 15-20 jt; total ≈ 100 jt (Afrika Timur)", "hi": "मुख्यतः L2 संपर्क भाषा; L1 ≈ 15-20M; कुल ≈ 100M (पूर्वी अफ़्रीका)", "de": "überwiegend L2-Verkehrssprache; L1 ≈ 15-20 Mio.; gesamt ≈ 100 Mio. (Ostafrika)", "fr": "surtout lingua franca L2 ; L1 ≈ 15-20 M ; total ≈ 100 M (Afrique de l'Est)", "it": "per lo più lingua franca L2; L1 ≈ 15-20 Mln; totale ≈ 100 Mln (Africa orientale)", "es": "sobre todo lengua franca L2; L1 ≈ 15-20 M; total ≈ 100 M (África oriental)", "pt": "sobretudo língua franca L2; L1 ≈ 15-20 mi; total ≈ 100 mi (África Oriental)", "ru": "в основном лингва франка (второй язык); родной ≈ 15-20 млн; всего ≈ 100 млн (Восточная Африка)", "uk": "переважно лінгва франка (друга мова); рідна ≈ 15-20 млн; усього ≈ 100 млн (Східна Африка)", "ar": "أساسًا لغة مشتركة ثانية؛ اللغة الأم ≈ 15-20 مليون؛ المجموع ≈ 100 مليون (شرق أفريقيا)", "he": "בעיקר לינגואה פרנקה כשפה שנייה; שפת אם ≈ 15-20 מיליון; סך הכול ≈ 100 מיליון (מזרח אפריקה)", "sw": "hasa lugha ya mawasiliano ya L2; L1 ≈ milioni 15-20; jumla ≈ milioni 100 (Afrika Mashariki)"}, "mostly L2/national; L1 ≈ 25-40M; total ≈ 200M across Indonesian archipelago": {"ja": "主に第二言語・国語；母語≈2,500万〜4,000万；インドネシア全域で合計≈2億", "ko": "주로 제2언어/국어; 모어 ≈ 2,500만~4,000만; 인도네시아 군도 전체 합계 ≈ 2억", "zh": "主要为第二语言／国语；母语≈2500万—4000万；印度尼西亚群岛合计≈2亿", "yue": "主要為第二語言／國語；母語≈2,500萬至4,000萬；印尼群島合計≈2億", "vi": "Chủ yếu là ngôn ngữ thứ hai/quốc ngữ; tiếng mẹ đẻ ≈ 25–40M; tổng ≈ 200M trên khắp quần đảo Indonesia", "th": "ส่วนใหญ่เป็นภาษาที่สอง/ภาษาประจำชาติ; ภาษาแม่ ≈ 25–40M; รวม ≈ 200M ทั่วหมู่เกาะอินโดนีเซีย", "id": "sebagian besar L2/nasional; L1 ≈ 25-40 jt; total ≈ 200 jt di seluruh Nusantara", "hi": "मुख्यतः L2/राष्ट्रीय; L1 ≈ 25-40M; इंडोनेशियाई द्वीपसमूह में कुल ≈ 200M", "de": "überwiegend L2/Nationalsprache; L1 ≈ 25-40 Mio.; gesamt ≈ 200 Mio. im indonesischen Archipel", "fr": "surtout L2/nationale ; L1 ≈ 25-40 M ; total ≈ 200 M dans l'archipel indonésien", "it": "per lo più L2/nazionale; L1 ≈ 25-40 Mln; totale ≈ 200 Mln nell'arcipelago indonesiano", "es": "sobre todo L2/nacional; L1 ≈ 25-40 M; total ≈ 200 M en el archipiélago indonesio", "pt": "sobretudo L2/nacional; L1 ≈ 25-40 mi; total ≈ 200 mi no arquipélago indonésio", "ru": "в основном второй / государственный язык; родной ≈ 25-40 млн; всего ≈ 200 млн по Индонезийскому архипелагу", "uk": "переважно друга / державна мова; рідна ≈ 25-40 млн; усього ≈ 200 млн по Індонезійському архіпелагу", "ar": "أساسًا لغة ثانية/وطنية؛ اللغة الأم ≈ 25-40 مليون؛ المجموع ≈ 200 مليون في الأرخبيل الإندونيسي", "he": "בעיקר שפה שנייה/לאומית; שפת אם ≈ 25-40 מיליון; סך הכול ≈ 200 מיליון ברחבי הארכיפלג האינדונזי", "sw": "hasa L2/ya taifa; L1 ≈ milioni 25-40; jumla ≈ milioni 200 katika visiwa vya Indonesia"}, "mostly Maritime Region Togo + Aja-Mina diaspora in Benin Mono Department": {"ja": "主にトーゴの沿岸州＋ベナン・モノ県のアジャ＝ミナ系移住者", "ko": "주로 토고 해안주 + 베냉 모노주의 아자-미나 이주민", "zh": "主要在多哥滨海区+贝宁莫诺省的阿贾-米纳侨民", "yue": "主要在多哥濱海區+貝寧莫諾省的阿賈-米納僑民", "vi": "Chủ yếu ở vùng Maritime, Togo + cộng đồng Aja-Mina ở tỉnh Mono, Bénin", "th": "ส่วนใหญ่อยู่ในภาคมาริไทม์ โตโก + ชุมชนพลัดถิ่นอาจา-มีนาในจังหวัดโมโน เบนิน", "id": "sebagian besar Region Maritim, Togo + diaspora Aja-Mina di Departemen Mono, Benin", "hi": "मुख्यतः मैरीटाइम क्षेत्र, टोगो + बेनिन के मोनो विभाग में अजा-मीना प्रवासी", "de": "überwiegend Region Maritime (Togo) + Aja-Mina-Diaspora im Département Mono (Benin)", "fr": "surtout région Maritime (Togo) + diaspora aja-mina dans le département du Mono (Bénin)", "it": "per lo più Regione Marittima (Togo) + diaspora aja-mina nel dipartimento del Mono (Benin)", "es": "sobre todo región Marítima (Togo) + diáspora aja-mina en el departamento de Mono (Benín)", "pt": "sobretudo Região Marítima do Togo + diáspora aja-mina no departamento de Mono, Benin", "ru": "в основном Приморская область Того + диаспора аджа-мина в департаменте Моно (Бенин)", "uk": "переважно Приморська область Того + діаспора аджа-міна в департаменті Моно (Бенін)", "ar": "أساسًا الإقليم البحري في توغو + شتات الأجا-مينا في مقاطعة مونو ببنين", "he": "בעיקר האזור הימי בטוגו + תפוצת אג׳ה-מינה במחוז מונו בבנין", "sw": "hasa Mkoa wa Pwani, Togo + ughaibuni wa Aja-Mina katika Idara ya Mono, Benin"}, "mostly North-Western Province Zambia + small DRC border populations": {"ja": "主にザンビア北西部州＋コンゴ民主共和国国境地帯に少数", "ko": "주로 잠비아 북서부주 + 콩고민주공화국 국경 지역에 소수", "zh": "主要在赞比亚西北省+刚果（金）边境少量人口", "yue": "主要在贊比亞西北省+剛果（金）邊境少量人口", "vi": "Chủ yếu ở tỉnh Tây Bắc, Zambia + một ít cư dân vùng biên CHDC Congo", "th": "ส่วนใหญ่อยู่ในจังหวัดตะวันตกเฉียงเหนือ แซมเบีย + ประชากรเล็กน้อยในชายแดนคองโก (DRC)", "id": "sebagian besar Provinsi Barat Laut, Zambia + populasi kecil di perbatasan RD Kongo", "hi": "मुख्यतः उत्तर-पश्चिमी प्रांत, ज़ाम्बिया + कांगो लोकतांत्रिक गणराज्य सीमा पर छोटी आबादी", "de": "überwiegend Nordwestprovinz (Sambia) + kleine Grenzgruppen in der DR Kongo", "fr": "surtout province du Nord-Ouest (Zambie) + petites populations frontalières en RDC", "it": "per lo più Provincia Nord-Occidentale (Zambia) + piccole popolazioni di confine nella RD del Congo", "es": "sobre todo provincia Noroccidental (Zambia) + pequeñas poblaciones fronterizas en la RD del Congo", "pt": "sobretudo Província do Noroeste, Zâmbia + pequenas populações na fronteira da RDC", "ru": "в основном Северо-Западная провинция Замбии + небольшие группы в пограничье ДРК", "uk": "переважно Північно-Західна провінція Замбії + невеликі групи в прикордонні ДРК", "ar": "أساسًا الإقليم الشمالي الغربي في زامبيا + أعداد صغيرة على حدود الكونغو الديمقراطية", "he": "בעיקר המחוז הצפון-מערבי בזמביה + אוכלוסיות קטנות בגבול הרפובליקה הדמוקרטית של קונגו", "sw": "hasa Jimbo la Kaskazini-Magharibi, Zambia + wachache mpakani mwa DRC"}, "mostly Singida Region central Tanzania": {"ja": "主にタンザニア中部シンギダ州", "ko": "주로 탄자니아 중부 싱기다주", "zh": "主要在坦桑尼亚中部辛吉达区", "yue": "主要在坦桑尼亞中部辛吉達區", "vi": "Chủ yếu ở vùng Singida, miền trung Tanzania", "th": "ส่วนใหญ่อยู่ในแคว้นซิงกิดา ภาคกลางแทนซาเนีย", "id": "sebagian besar Region Singida, Tanzania tengah", "hi": "मुख्यतः सिंगिडा क्षेत्र, मध्य तंज़ानिया", "de": "überwiegend Region Singida (Zentraltansania)", "fr": "surtout région de Singida (centre de la Tanzanie)", "it": "per lo più regione di Singida (Tanzania centrale)", "es": "sobre todo región de Singida (centro de Tanzania)", "pt": "sobretudo Região de Singida, centro da Tanzânia", "ru": "в основном область Сингида в центральной Танзании", "uk": "переважно область Сінгіда в центральній Танзанії", "ar": "أساسًا إقليم سينجيدا وسط تنزانيا", "he": "בעיקר אזור סינגידה במרכז טנזניה", "sw": "hasa Mkoa wa Singida, katikati ya Tanzania"}, "mostly liturgical; ~50 fluent in Modern Mandaic": {"ja": "主に典礼語；現代マンダ語の流暢な話者約50人", "ko": "주로 전례어; 현대 만다어 유창 화자 약 50명", "zh": "主要为礼仪语言；约50人能流利使用现代曼达语", "yue": "主要為禮儀語言；約50人能流利使用現代曼達語", "vi": "Chủ yếu là ngôn ngữ nghi lễ; ~50 người thành thạo tiếng Mandaic hiện đại", "th": "ส่วนใหญ่เป็นภาษาพิธีกรรม; ~50 คนพูดภาษามันดาอิกสมัยใหม่ได้คล่อง", "id": "sebagian besar liturgi; ~50 fasih dalam Mandaik Modern", "hi": "मुख्यतः धार्मिक; ~50 आधुनिक मांडाई में धाराप्रवाह", "de": "überwiegend liturgisch; ~50 sprechen fließend Neumandäisch", "fr": "surtout liturgique ; ~50 locuteurs courants du mandéen moderne", "it": "per lo più liturgica; ~50 fluenti in mandaico moderno", "es": "sobre todo litúrgica; ~50 hablantes fluidos de mandeo moderno", "pt": "sobretudo litúrgica; ~50 fluentes em mandaico moderno", "ru": "в основном литургический; ~50 свободно владеют новомандейским", "uk": "переважно літургійна; ~50 вільно володіють новомандейською", "ar": "طقسية أساسًا؛ ~50 طليقًا بالمندائية الحديثة", "he": "בעיקר ליטורגית; ~50 שוטפים במנדאית מודרנית", "sw": "hasa ya ibada; ~50 fasaha katika Kimandaiki cha Kisasa"}, "on the verge of extinction; only elderly speakers": {"ja": "消滅寸前；話者は高齢者のみ", "ko": "소멸 직전; 노인 화자만 남음", "zh": "濒临消亡；仅剩老年使用者", "yue": "瀕臨消亡；僅剩年長使用者", "vi": "Bên bờ tuyệt chủng; chỉ còn người cao tuổi nói", "th": "ใกล้สูญ; เหลือแต่ผู้พูดสูงอายุ", "id": "di ambang kepunahan; hanya penutur lansia", "hi": "विलुप्ति के कगार पर; केवल बुज़ुर्ग वक्ता", "de": "kurz vor dem Aussterben; nur ältere Sprecher", "fr": "au bord de l'extinction ; seulement des locuteurs âgés", "it": "sull'orlo dell'estinzione; solo parlanti anziani", "es": "al borde de la extinción; solo hablantes mayores", "pt": "à beira da extinção; apenas falantes idosos", "ru": "на грани исчезновения; только пожилые носители", "uk": "на межі зникнення; лише літні носії", "ar": "على وشك الانقراض؛ المتحدثون مسنون فقط", "he": "על סף הכחדה; רק דוברים קשישים", "sw": "karibu kutoweka; wazungumzaji wazee tu"}, "one of the largest Mande languages; vibrant intergenerational transmission": {"ja": "最大級のマンデ語の一つ；世代間継承は活発", "ko": "최대 만데어 중 하나; 세대 간 전승이 활발", "zh": "最大的曼德语言之一；代际传承活跃", "yue": "最大的曼德語言之一；代際傳承活躍", "vi": "Một trong những ngôn ngữ Mande lớn nhất; truyền thụ giữa các thế hệ mạnh mẽ", "th": "หนึ่งในภาษามันเดที่ใหญ่ที่สุด; การถ่ายทอดข้ามรุ่นแข็งแรง", "id": "salah satu bahasa Mande terbesar; pewarisan antargenerasi yang kuat", "hi": "सबसे बड़ी मांडे भाषाओं में से एक; जीवंत पीढ़ीगत संचरण", "de": "eine der größten Mande-Sprachen; lebendige Weitergabe zwischen den Generationen", "fr": "l'une des plus grandes langues mandées ; transmission intergénérationnelle vigoureuse", "it": "una delle maggiori lingue mande; trasmissione intergenerazionale vitale", "es": "una de las mayores lenguas mandé; transmisión intergeneracional vigorosa", "pt": "uma das maiores línguas mandês; transmissão intergeracional vigorosa", "ru": "один из крупнейших языков манде; активная межпоколенная передача", "uk": "одна з найбільших мов манде; активна міжпоколінна передача", "ar": "من أكبر لغات الماندي؛ نقل حيوي بين الأجيال", "he": "אחת משפות המנדה הגדולות; העברה בין-דורית תוססת", "sw": "mojawapo ya lugha kubwa za Kimande; urithishaji hai kati ya vizazi"}, "one of the largest languages in the world that is rarely covered in international media; vibrant — UNESCO safe with strong intergenerational transmission": {"ja": "国際メディアでほとんど取り上げられない世界有数の大言語；活発 — UNESCO「安全」、世代間継承は強固", "ko": "국제 언론에서 거의 다루지 않는 세계 최대급 언어 중 하나; 활발 — 유네스코 '안전', 세대 간 전승 견고", "zh": "世界上最大却鲜受国际媒体关注的语言之一；活跃 — 联合国教科文组织“安全”，代际传承稳固", "yue": "世界上最大卻鮮受國際媒體關注的語言之一；活躍 — 聯合國教科文組織「安全」，代際傳承穩固", "vi": "Một trong những ngôn ngữ lớn nhất thế giới nhưng hiếm khi được truyền thông quốc tế nhắc đến; sức sống mạnh — UNESCO: an toàn, truyền thụ giữa các thế hệ vững chắc", "th": "หนึ่งในภาษาใหญ่ที่สุดของโลกที่สื่อนานาชาติแทบไม่กล่าวถึง; แข็งแรง — ยูเนสโก: ปลอดภัย การถ่ายทอดข้ามรุ่นแข็งแกร่ง", "id": "salah satu bahasa terbesar di dunia yang jarang diliput media internasional; hidup — UNESCO: aman dengan pewarisan antargenerasi yang kuat", "hi": "विश्व की सबसे बड़ी भाषाओं में से एक जिसकी अंतरराष्ट्रीय मीडिया में चर्चा कम होती है; जीवंत — UNESCO: सुरक्षित, मज़बूत पीढ़ीगत संचरण", "de": "eine der größten Sprachen der Welt, über die internationale Medien selten berichten; lebendig — UNESCO: sicher, mit starker Weitergabe zwischen den Generationen", "fr": "l'une des plus grandes langues du monde, rarement couverte par les médias internationaux ; vivante — UNESCO : sûre, forte transmission intergénérationnelle", "it": "una delle lingue più grandi del mondo, raramente trattata dai media internazionali; vitale — UNESCO: sicura, con forte trasmissione intergenerazionale", "es": "una de las mayores lenguas del mundo, poco cubierta por los medios internacionales; vital — UNESCO: segura, con fuerte transmisión intergeneracional", "pt": "uma das maiores línguas do mundo raramente cobertas pela mídia internacional; vital — UNESCO: segura, com forte transmissão intergeracional", "ru": "один из крупнейших языков мира, редко освещаемых международными СМИ; жизнеспособный — ЮНЕСКО: благополучный, с прочной межпоколенной передачей", "uk": "одна з найбільших мов світу, про які рідко пишуть міжнародні медіа; життєздатна — ЮНЕСКО: безпечна, з міцною міжпоколінною передачею", "ar": "من أكبر لغات العالم التي نادرًا ما تتناولها وسائل الإعلام الدولية؛ حيوية — اليونسكو: آمنة مع نقل قوي بين الأجيال", "he": "אחת השפות הגדולות בעולם שכמעט אינן מסוקרות בתקשורת הבינלאומית; תוססת — אונסק״ו: בטוחה, עם העברה בין-דורית חזקה", "sw": "mojawapo ya lugha kubwa duniani zisizoangaziwa sana na vyombo vya habari vya kimataifa; hai — UNESCO: salama, urithishaji imara kati ya vizazi"}, "out of ~8M ethnic Tujia, most of whom now speak Mandarin": {"ja": "土家族約800万人のうちの話者で、大半は現在中国語を話す", "ko": "투자족 약 800만 명 중의 화자로, 대부분은 현재 중국어 사용", "zh": "约800万土家族中的使用者，大多数土家族现已改说汉语", "yue": "約800萬土家族中的使用者，大多數土家族現已改說漢語", "vi": "Trong số ~8M người Thổ Gia, phần lớn nay nói tiếng Quan thoại", "th": "จากชาวถู่เจีย ~8M คน ซึ่งปัจจุบันส่วนใหญ่พูดภาษาจีนกลาง", "id": "dari ~8 jt etnis Tujia, yang kebanyakan kini berbahasa Mandarin", "hi": "~8M जातीय तुजिया में से, जिनमें अधिकांश अब मंदारिन बोलते हैं", "de": "von ~8 Mio. ethnischen Tujia, die heute meist Mandarin sprechen", "fr": "sur ~8 M de Tujia ethniques, dont la plupart parlent aujourd'hui mandarin", "it": "su ~8 Mln di tujia etnici, la maggior parte dei quali ora parla mandarino", "es": "de ~8 M de tujia étnicos, la mayoría de los cuales habla hoy mandarín", "pt": "de ~8 mi de tujias étnicos, a maioria dos quais hoje fala mandarim", "ru": "из ~8 млн этнических туцзя, большинство из которых теперь говорит на мандаринском", "uk": "із ~8 млн етнічних туцзя, більшість з яких тепер говорить мандаринською", "ar": "من أصل ~8 ملايين من التوجيا عرقيًا، يتحدث معظمهم الآن الماندرين", "he": "מתוך ~8 מיליון טוג׳יה אתניים, שרובם דוברים כיום מנדרינית", "sw": "kati ya Watujia milioni ~8 kwa asili, wengi wao sasa huzungumza Kimandarini"}, "regional aggregate across African Francophone countries": {"ja": "アフリカのフランス語圏諸国の地域合計", "ko": "아프리카 프랑스어권 국가 지역 합계", "zh": "非洲法语国家的地区合计", "yue": "非洲法語國家的地區合計", "vi": "Tổng khu vực các nước Pháp ngữ châu Phi", "th": "ยอดรวมระดับภูมิภาคของประเทศฟรังโกโฟนในแอฟริกา", "id": "gabungan regional di negara-negara Frankofon Afrika", "hi": "अफ़्रीकी फ़्रैंकोफ़ोन देशों का क्षेत्रीय कुल", "de": "regionale Summe über die frankophonen Länder Afrikas", "fr": "cumul régional des pays francophones d'Afrique", "it": "aggregato regionale dei paesi francofoni africani", "es": "agregado regional de los países francófonos de África", "pt": "agregado regional dos países africanos francófonos", "ru": "региональная сумма по франкоязычным странам Африки", "uk": "регіональна сума по франкомовних країнах Африки", "ar": "مجموع إقليمي عبر الدول الأفريقية الناطقة بالفرنسية", "he": "סך אזורי במדינות אפריקה הפרנקופוניות", "sw": "jumla ya kikanda katika nchi za Afrika zinazozungumza Kifaransa"}, "regional population; active dialect speakers fewer": {"ja": "地域の人口；実際に方言を話す人はより少ない", "ko": "지역 인구; 실제 방언 화자는 더 적음", "zh": "地区人口；实际使用方言者更少", "yue": "地區人口；實際使用方言者更少", "vi": "Dân số khu vực; người thực sự nói phương ngữ ít hơn", "th": "ประชากรในภูมิภาค; ผู้ที่ยังพูดภาษาถิ่นจริงมีน้อยกว่า", "id": "populasi regional; penutur dialek aktif lebih sedikit", "hi": "क्षेत्रीय आबादी; सक्रिय बोली वक्ता कम", "de": "regionale Bevölkerung; aktive Dialektsprecher weniger", "fr": "population régionale ; locuteurs actifs du dialecte moins nombreux", "it": "popolazione regionale; parlanti attivi del dialetto meno numerosi", "es": "población regional; hablantes activos del dialecto, menos", "pt": "população regional; falantes ativos do dialeto são menos", "ru": "население региона; активно говорящих на диалекте меньше", "uk": "населення регіону; активних мовців діалекту менше", "ar": "سكان المنطقة؛ المتحدثون الفعليون باللهجة أقل", "he": "אוכלוסיית האזור; הדוברים הפעילים של הניב מעטים יותר", "sw": "wakazi wa eneo; wazungumzaji hai wa lahaja ni wachache zaidi"}, "regional/dialect continuum; Ethnologue L1 ≈ 68M": {"ja": "地域的な方言連続体；Ethnologueの母語話者≈6,800万", "ko": "지역 방언 연속체; Ethnologue 모어 화자 ≈ 6,800만", "zh": "地区方言连续体；Ethnologue 母语者≈6800万", "yue": "地區方言連續體；Ethnologue 母語者≈6,800萬", "vi": "Liên tục phương ngữ khu vực; Ethnologue: tiếng mẹ đẻ ≈ 68M", "th": "ความต่อเนื่องของภาษาถิ่นระดับภูมิภาค; Ethnologue: ภาษาแม่ ≈ 68M", "id": "kontinum regional/dialek; L1 Ethnologue ≈ 68 jt", "hi": "क्षेत्रीय/बोली सातत्य; Ethnologue L1 ≈ 68M", "de": "regionales Dialektkontinuum; Ethnologue L1 ≈ 68 Mio.", "fr": "continuum régional/dialectal ; L1 selon Ethnologue ≈ 68 M", "it": "continuum regionale/dialettale; L1 secondo Ethnologue ≈ 68 Mln", "es": "continuo regional/dialectal; L1 según Ethnologue ≈ 68 M", "pt": "contínuo regional/dialetal; Ethnologue L1 ≈ 68 mi", "ru": "региональный/диалектный континуум; по Ethnologue родной ≈ 68 млн", "uk": "регіональний/діалектний континуум; за Ethnologue рідна ≈ 68 млн", "ar": "متصل إقليمي/لهجي؛ Ethnologue: اللغة الأم ≈ 68 مليون", "he": "רצף אזורי/ניבי; לפי Ethnologue שפת אם ≈ 68 מיליון", "sw": "mfululizo wa kikanda/lahaja; Ethnologue L1 ≈ milioni 68"}, "revived": {"ja": "復興", "ko": "부활", "zh": "已复兴", "yue": "已復興", "vi": "Được hồi sinh", "th": "ฟื้นฟูแล้ว", "id": "dihidupkan kembali", "hi": "पुनर्जीवित", "de": "wiederbelebt", "fr": "ressuscitée", "it": "rivitalizzata", "es": "revivida", "pt": "revivida", "ru": "возрождённый", "uk": "відроджена", "ar": "مُحياة", "he": "הוחייתה", "sw": "imefufuliwa"}, "script": {"ja": "文字", "ko": "문자", "zh": "文字", "yue": "文字", "vi": "Chữ viết", "th": "อักษร", "id": "aksara", "hi": "लिपि", "de": "Schrift", "fr": "écriture", "it": "scrittura", "es": "escritura", "pt": "escrita", "ru": "письменность", "uk": "писемність", "ar": "كتابة", "he": "כתב", "sw": "hati"}, "severely endangered": {"ja": "重大な危険", "ko": "심각한 위기", "zh": "严重危险", "yue": "嚴重危險", "vi": "Nguy cấp nghiêm trọng", "th": "ใกล้สูญหายอย่างรุนแรง", "id": "sangat terancam", "hi": "गंभीर रूप से संकटग्रस्त", "de": "ernsthaft gefährdet", "fr": "sérieusement en danger", "it": "gravemente in pericolo", "es": "seriamente amenazada", "pt": "severamente ameaçada", "ru": "в серьёзной опасности", "uk": "у серйозній небезпеці", "ar": "مهددة بشدة", "he": "בסכנה חמורה", "sw": "hatarini sana"}, "severely endangered for island varieties — UNESCO definitely endangered for Jèrriais, severely endangered for Guernésiais; mainland Cotentinais is in continued use among older rural populations": {"ja": "島嶼部の変種は重大な危険 — UNESCOはジェリエ語を「危険」、ゲルネシア語を「重大な危険」に分類；本土のコタンタン方言は農村部の高齢層で使われ続けている", "ko": "섬 지역 변종은 심각한 위기 — 유네스코는 저지어를 '확실한 위기', 건지어를 '심각한 위기'로 분류; 본토 코탕탱 방언은 농촌 고령층에서 계속 사용", "zh": "岛屿变体严重危险 — 联合国教科文组织将泽西语列为“确有危险”、根西语列为“严重危险”；大陆的科唐坦方言仍在农村老年人中使用", "yue": "島嶼變體嚴重危險 — 聯合國教科文組織將澤西語列為「確有危險」、根西語列為「嚴重危險」；大陸的科唐坦方言仍在農村長者中使用", "vi": "Nguy cấp nghiêm trọng với các biến thể trên đảo — UNESCO: Jèrriais chắc chắn nguy cấp, Guernésiais nguy cấp nghiêm trọng; Cotentinais trên đất liền vẫn được người cao tuổi ở nông thôn sử dụng", "th": "ใกล้สูญหายอย่างรุนแรงสำหรับวิธภาษาบนเกาะ — ยูเนสโก: เจอร์เรียส์ใกล้สูญหายแน่นอน เกอร์เนเซียส์ใกล้สูญหายอย่างรุนแรง; ภาษาโกต็องแต็งบนแผ่นดินใหญ่ยังใช้อยู่ในหมู่ผู้สูงอายุชนบท", "id": "sangat terancam untuk varietas kepulauan — UNESCO: pasti terancam untuk Jèrriais, sangat terancam untuk Guernésiais; Cotentinais di daratan masih dipakai penduduk desa lansia", "hi": "द्वीपीय रूपों के लिए गंभीर रूप से संकटग्रस्त — UNESCO: जेरियाई निश्चित रूप से, गर्नेज़ियाई गंभीर रूप से संकटग्रस्त; मुख्य भूमि की कोतांतिने बुज़ुर्ग ग्रामीणों में अब भी प्रयुक्त", "de": "ernsthaft gefährdet für die Inselvarietäten — UNESCO: Jèrriais definitiv, Guernésiais ernsthaft gefährdet; das festländische Cotentinais wird von älteren Landbewohnern weiter gesprochen", "fr": "sérieusement en danger pour les variétés insulaires — UNESCO : jèrriais en danger, guernesiais sérieusement en danger ; le cotentinais continental reste parlé par des ruraux âgés", "it": "gravemente in pericolo per le varietà insulari — UNESCO: jèrriais sicuramente in pericolo, guernesiais gravemente in pericolo; il cotentinais continentale è ancora usato dagli anziani delle campagne", "es": "seriamente amenazada en las variedades insulares — UNESCO: jerseyés claramente amenazado, guerneseyés seriamente amenazado; el cotentinés continental sigue en uso entre la población rural mayor", "pt": "severamente ameaçada nas variedades insulares — UNESCO: definitivamente ameaçada para o jèrriais, severamente ameaçada para o guernésiais; o cotentinais continental segue em uso entre populações rurais mais velhas", "ru": "в серьёзной опасности на островах — ЮНЕСКО: джерсийский под угрозой, гернсийский в серьёзной опасности; материковый котантенский ещё используется старшим сельским населением", "uk": "у серйозній небезпеці на островах — ЮНЕСКО: джерсійська під загрозою, гернсійська у серйозній небезпеці; материкова котантенська ще вживається старшим сільським населенням", "ar": "مهددة بشدة في تنوعات الجزر — اليونسكو: الجيرسية مهددة بالتأكيد، والغيرنزية مهددة بشدة؛ الكوتانتينية في البر ما زالت مستخدمة بين كبار السن في الريف", "he": "בסכנה חמורה בניבי האיים — אונסק״ו: ז׳רייה בסכנה ודאית, גרנזייה בסכנה חמורה; קוטנטינה ביבשה עדיין בשימוש בקרב אוכלוסייה כפרית מבוגרת", "sw": "hatarini sana kwa lahaja za visiwani — UNESCO: Jèrriais hatarini dhahiri, Guernésiais hatarini sana; Cotentinais cha bara bado kinatumika miongoni mwa wazee wa vijijini"}, "severely endangered for some dialects, vibrant for others — UNESCO definitely endangered overall": {"ja": "方言により重大な危険から活発までさまざま — UNESCOは全体として「危険」", "ko": "일부 방언은 심각한 위기, 다른 방언은 활발 — 유네스코 전체 평가 '확실한 위기'", "zh": "部分方言严重危险，其他方言活跃 — 联合国教科文组织总体列为“确有危险”", "yue": "部分方言嚴重危險，其他方言活躍 — 聯合國教科文組織整體列為「確有危險」", "vi": "Một số phương ngữ nguy cấp nghiêm trọng, số khác sống động — UNESCO: chắc chắn nguy cấp nói chung", "th": "บางภาษาถิ่นใกล้สูญหายอย่างรุนแรง บางภาษาถิ่นแข็งแรง — ยูเนสโก: ใกล้สูญหายแน่นอนโดยรวม", "id": "sangat terancam untuk sebagian dialek, hidup untuk yang lain — UNESCO: pasti terancam secara keseluruhan", "hi": "कुछ बोलियों के लिए गंभीर रूप से संकटग्रस्त, अन्य जीवंत — UNESCO: कुल मिलाकर निश्चित रूप से संकटग्रस्त", "de": "für einige Dialekte ernsthaft gefährdet, für andere lebendig — UNESCO: insgesamt definitiv gefährdet", "fr": "sérieusement en danger pour certains dialectes, vivante pour d'autres — UNESCO : en danger dans l'ensemble", "it": "gravemente in pericolo per alcuni dialetti, vitale per altri — UNESCO: nel complesso sicuramente in pericolo", "es": "seriamente amenazada en algunos dialectos, vital en otros — UNESCO: claramente amenazada en conjunto", "pt": "severamente ameaçada em alguns dialetos, vital em outros — UNESCO: definitivamente ameaçada no geral", "ru": "в серьёзной опасности в одних диалектах, жизнеспособный в других — ЮНЕСКО: в целом под угрозой", "uk": "у серйозній небезпеці в одних діалектах, життєздатна в інших — ЮНЕСКО: загалом під загрозою", "ar": "مهددة بشدة في بعض اللهجات وحيوية في أخرى — اليونسكو: مهددة بالتأكيد عمومًا", "he": "בסכנה חמורה בחלק מהניבים, תוססת באחרים — אונסק״ו: בסכנה ודאית בכלל", "sw": "hatarini sana kwa baadhi ya lahaja, hai kwa nyingine — UNESCO: hatarini dhahiri kwa jumla"}, "severely endangered — UNESCO severely endangered": {"ja": "重大な危険 — UNESCO「重大な危険」", "ko": "심각한 위기 — 유네스코 '심각한 위기'", "zh": "严重危险 — 联合国教科文组织“严重危险”", "yue": "嚴重危險 — 聯合國教科文組織「嚴重危險」", "vi": "Nguy cấp nghiêm trọng — UNESCO: nguy cấp nghiêm trọng", "th": "ใกล้สูญหายอย่างรุนแรง — ยูเนสโก: ใกล้สูญหายอย่างรุนแรง", "id": "sangat terancam — UNESCO: sangat terancam", "hi": "गंभीर रूप से संकटग्रस्त — UNESCO: गंभीर रूप से संकटग्रस्त", "de": "ernsthaft gefährdet — UNESCO: ernsthaft gefährdet", "fr": "sérieusement en danger — UNESCO : sérieusement en danger", "it": "gravemente in pericolo — UNESCO: gravemente in pericolo", "es": "seriamente amenazada — UNESCO: seriamente amenazada", "pt": "severamente ameaçada — UNESCO: severamente ameaçada", "ru": "в серьёзной опасности — ЮНЕСКО: в серьёзной опасности", "uk": "у серйозній небезпеці — ЮНЕСКО: у серйозній небезпеці", "ar": "مهددة بشدة — اليونسكو: مهددة بشدة", "he": "בסכנה חמורה — אונסק״ו: בסכנה חמורה", "sw": "hatarini sana — UNESCO: hatarini sana"}, "severely endangered — UNESCO severely endangered; on the verge of extinction with only elderly speakers remaining; younger Jiamao Hlai shift to Hlai Proper or Standard Mandarin": {"ja": "重大な危険 — UNESCO「重大な危険」；高齢の話者しか残らず消滅寸前；加茂の若い世代は黎語本体または標準中国語へ移行", "ko": "심각한 위기 — 유네스코 '심각한 위기'; 노인 화자만 남아 소멸 직전; 자마오 젊은 세대는 본래의 리어나 표준 중국어로 전환", "zh": "严重危险 — 联合国教科文组织“严重危险”；仅剩老年使用者，濒临消亡；年轻的加茂人转用黎语或普通话", "yue": "嚴重危險 — 聯合國教科文組織「嚴重危險」；僅剩年長使用者，瀕臨消亡；年輕的加茂人轉用黎語或普通話", "vi": "Nguy cấp nghiêm trọng — UNESCO: nguy cấp nghiêm trọng; bên bờ tuyệt chủng, chỉ còn người cao tuổi nói; giới trẻ Gia Mậu chuyển sang tiếng Hlai chính hoặc tiếng Phổ thông", "th": "ใกล้สูญหายอย่างรุนแรง — ยูเนสโก: ใกล้สูญหายอย่างรุนแรง; ใกล้สูญ เหลือเพียงผู้พูดสูงอายุ; คนรุ่นใหม่ชาวเจียเม่าหันไปใช้ภาษาหลีหลักหรือภาษาจีนกลางมาตรฐาน", "id": "sangat terancam — UNESCO: sangat terancam; di ambang kepunahan, hanya tersisa penutur lansia; generasi muda Jiamao beralih ke Hlai inti atau Mandarin Standar", "hi": "गंभीर रूप से संकटग्रस्त — UNESCO: गंभीर रूप से संकटग्रस्त; विलुप्ति के कगार पर, केवल बुज़ुर्ग वक्ता शेष; युवा जियामाओ ह्लाई मुख्य ह्लाई या मानक मंदारिन अपना रहे हैं", "de": "ernsthaft gefährdet — UNESCO: ernsthaft gefährdet; kurz vor dem Aussterben, nur noch ältere Sprecher; jüngere Jiamao wechseln zum eigentlichen Hlai oder zum Hochchinesischen", "fr": "sérieusement en danger — UNESCO : sérieusement en danger ; au bord de l'extinction, seuls des locuteurs âgés subsistent ; les jeunes Jiamao passent au hlai proprement dit ou au mandarin standard", "it": "gravemente in pericolo — UNESCO: gravemente in pericolo; sull'orlo dell'estinzione, restano solo parlanti anziani; i giovani jiamao passano allo hlai propriamente detto o al mandarino standard", "es": "seriamente amenazada — UNESCO: seriamente amenazada; al borde de la extinción, solo quedan hablantes mayores; los jóvenes jiamao pasan al hlai propiamente dicho o al mandarín estándar", "pt": "severamente ameaçada — UNESCO: severamente ameaçada; à beira da extinção, restam só falantes idosos; os jovens jiamao passam para o hlai propriamente dito ou o mandarim padrão", "ru": "в серьёзной опасности — ЮНЕСКО: в серьёзной опасности; на грани исчезновения, остались лишь пожилые носители; молодые цзямао переходят на собственно хлай или путунхуа", "uk": "у серйозній небезпеці — ЮНЕСКО: у серйозній небезпеці; на межі зникнення, лишилися тільки літні носії; молоді цзямао переходять на власне хлай або путунхуа", "ar": "مهددة بشدة — اليونسكو: مهددة بشدة؛ على وشك الانقراض ولم يبقَ إلا المسنون؛ شباب الجياماو يتحولون إلى الهلاي الأصلية أو الماندرين الفصحى", "he": "בסכנה חמורה — אונסק״ו: בסכנה חמורה; על סף הכחדה, נותרו רק דוברים קשישים; צעירי ג׳יאמאו עוברים להלאי עצמה או למנדרינית תקנית", "sw": "hatarini sana — UNESCO: hatarini sana; karibu kutoweka, wamebaki wazee tu; vijana wa Jiamao huhamia Kihlai chenyewe au Kimandarini Sanifu"}, "severely endangered — UNESCO severely endangered; younger generations primarily speak Turkish; intergenerational transmission failing in most Laz villages": {"ja": "重大な危険 — UNESCO「重大な危険」；若い世代は主にトルコ語を話す；大半のラズ人の村で世代間継承が途絶えつつある", "ko": "심각한 위기 — 유네스코 '심각한 위기'; 젊은 세대는 주로 튀르키예어 사용; 대부분의 라즈 마을에서 세대 간 전승이 끊기는 중", "zh": "严重危险 — 联合国教科文组织“严重危险”；年轻一代主要说土耳其语；多数拉兹村落的代际传承正在断绝", "yue": "嚴重危險 — 聯合國教科文組織「嚴重危險」；年輕一代主要說土耳其語；多數拉茲村落的代際傳承正在斷絕", "vi": "Nguy cấp nghiêm trọng — UNESCO: nguy cấp nghiêm trọng; thế hệ trẻ chủ yếu nói tiếng Thổ Nhĩ Kỳ; việc truyền thụ giữa các thế hệ đang đứt gãy ở hầu hết làng Laz", "th": "ใกล้สูญหายอย่างรุนแรง — ยูเนสโก: ใกล้สูญหายอย่างรุนแรง; คนรุ่นใหม่พูดภาษาตุรกีเป็นหลัก; การถ่ายทอดข้ามรุ่นกำลังล้มเหลวในหมู่บ้านลาซส่วนใหญ่", "id": "sangat terancam — UNESCO: sangat terancam; generasi muda terutama berbahasa Turki; pewarisan antargenerasi gagal di sebagian besar desa Laz", "hi": "गंभीर रूप से संकटग्रस्त — UNESCO: गंभीर रूप से संकटग्रस्त; युवा पीढ़ी मुख्यतः तुर्की बोलती है; अधिकांश लाज़ गाँवों में पीढ़ीगत संचरण विफल", "de": "ernsthaft gefährdet — UNESCO: ernsthaft gefährdet; jüngere Generationen sprechen vorwiegend Türkisch; Weitergabe in den meisten lasischen Dörfern gescheitert", "fr": "sérieusement en danger — UNESCO : sérieusement en danger ; les jeunes parlent surtout turc ; transmission en échec dans la plupart des villages lazes", "it": "gravemente in pericolo — UNESCO: gravemente in pericolo; le giovani generazioni parlano soprattutto turco; trasmissione fallita nella maggior parte dei villaggi laz", "es": "seriamente amenazada — UNESCO: seriamente amenazada; los jóvenes hablan sobre todo turco; la transmisión falla en la mayoría de las aldeas lazas", "pt": "severamente ameaçada — UNESCO: severamente ameaçada; as gerações mais jovens falam principalmente turco; a transmissão intergeracional falha na maioria das aldeias lazes", "ru": "в серьёзной опасности — ЮНЕСКО: в серьёзной опасности; молодёжь говорит в основном по-турецки; в большинстве лазских сёл межпоколенная передача прерывается", "uk": "у серйозній небезпеці — ЮНЕСКО: у серйозній небезпеці; молодь говорить переважно турецькою; у більшості лазьких сіл міжпоколінна передача переривається", "ar": "مهددة بشدة — اليونسكو: مهددة بشدة؛ الأجيال الشابة تتحدث التركية أساسًا؛ النقل بين الأجيال يتعثر في معظم قرى اللاز", "he": "בסכנה חמורה — אונסק״ו: בסכנה חמורה; הדורות הצעירים דוברים בעיקר טורקית; ההעברה הבין-דורית כושלת ברוב כפרי הלאז", "sw": "hatarini sana — UNESCO: hatarini sana; vizazi vichanga huzungumza hasa Kituruki; urithishaji kati ya vizazi unashindwa katika vijiji vingi vya Walaz"}, "severely endangered; UNESCO classifies definitely endangered": {"ja": "重大な危険；UNESCOの分類は「危険」", "ko": "심각한 위기; 유네스코 분류 '확실한 위기'", "zh": "严重危险；联合国教科文组织列为“确有危险”", "yue": "嚴重危險；聯合國教科文組織列為「確有危險」", "vi": "Nguy cấp nghiêm trọng; UNESCO xếp loại chắc chắn nguy cấp", "th": "ใกล้สูญหายอย่างรุนแรง; ยูเนสโกจัดเป็นใกล้สูญหายแน่นอน", "id": "sangat terancam; UNESCO: pasti terancam", "hi": "गंभीर रूप से संकटग्रस्त; UNESCO: निश्चित रूप से संकटग्रस्त", "de": "ernsthaft gefährdet; UNESCO: definitiv gefährdet", "fr": "sérieusement en danger ; UNESCO : en danger", "it": "gravemente in pericolo; UNESCO: sicuramente in pericolo", "es": "seriamente amenazada; UNESCO: claramente amenazada", "pt": "severamente ameaçada; UNESCO: definitivamente ameaçada", "ru": "в серьёзной опасности; ЮНЕСКО: под угрозой", "uk": "у серйозній небезпеці; ЮНЕСКО: під загрозою", "ar": "مهددة بشدة؛ اليونسكو: مهددة بالتأكيد", "he": "בסכנה חמורה; אונסק״ו: בסכנה ודאית", "sw": "hatarini sana; UNESCO: hatarini dhahiri"}, "severely endangered; ~1,597 ethnic Kolyma Yukaghir but most are L1 Russian-dominant": {"ja": "重大な危険；コリマ・ユカギール人は約1,597人だが大半はロシア語を母語とする", "ko": "심각한 위기; 콜리마 유카기르인은 약 1,597명이나 대부분 러시아어가 모어", "zh": "严重危险；科雷马尤卡吉尔族约1597人，但多数以俄语为母语", "yue": "嚴重危險；科雷馬尤卡吉爾族約1,597人，但多數以俄語為母語", "vi": "Nguy cấp nghiêm trọng; ~1.597 người dân tộc Yukaghir Kolyma nhưng phần lớn có tiếng mẹ đẻ là tiếng Nga", "th": "ใกล้สูญหายอย่างรุนแรง; ชาวยูคากีร์โคลิมา ~1,597 คน แต่ส่วนใหญ่ใช้ภาษารัสเซียเป็นภาษาแม่", "id": "sangat terancam; ~1.597 etnis Yukaghir Kolyma, tetapi kebanyakan berbahasa L1 Rusia", "hi": "गंभीर रूप से संकटग्रस्त; ~1,597 जातीय कोलिमा युकाघिर, पर अधिकांश की L1 रूसी", "de": "ernsthaft gefährdet; ~1.597 ethnische Kolyma-Jukagiren, die meisten jedoch mit Russisch als L1", "fr": "sérieusement en danger ; ~1 597 Youkaguirs de la Kolyma, mais la plupart ont le russe pour L1", "it": "gravemente in pericolo; ~1.597 jukaghiri della Kolyma etnici, ma per lo più con il russo come L1", "es": "seriamente amenazada; ~1597 yukaguires del Kolymá étnicos, pero la mayoría con el ruso como L1", "pt": "severamente ameaçada; ~1.597 yukaghires do Kolimá étnicos, mas a maioria tem o russo como L1 dominante", "ru": "в серьёзной опасности; ~1597 этнических колымских юкагиров, но для большинства родной — русский", "uk": "у серйозній небезпеці; ~1597 етнічних колимських юкагирів, але для більшості рідна — російська", "ar": "مهددة بشدة؛ ~1,597 من يوكاغير كوليما عرقيًا لكن لغة معظمهم الأم الغالبة هي الروسية", "he": "בסכנה חמורה; ~1,597 יוקגירים של קולימה אתניים, אך לרובם הרוסית היא שפת האם השלטת", "sw": "hatarini sana; Wayukaghir wa Kolyma ~1,597 kwa asili lakini wengi wana Kirusi kama L1 kikuu"}, "severely endangered; ~10K ethnic Puyuma but most are Mandarin-dominant": {"ja": "重大な危険；プユマ族は約1万人だが大半は中国語優位", "ko": "심각한 위기; 푸유마족은 약 1만 명이나 대부분 중국어 위주", "zh": "严重危险；卑南族约1万人，但多数以华语为主", "yue": "嚴重危險；卑南族約1萬人，但多數以華語為主", "vi": "Nguy cấp nghiêm trọng; ~10K người dân tộc Puyuma nhưng phần lớn chủ yếu nói tiếng Quan thoại", "th": "ใกล้สูญหายอย่างรุนแรง; ชาวปูยูมา ~10K คน แต่ส่วนใหญ่ใช้ภาษาจีนกลางเป็นหลัก", "id": "sangat terancam; ~10 rb etnis Puyuma, tetapi kebanyakan didominasi Mandarin", "hi": "गंभीर रूप से संकटग्रस्त; ~10K जातीय पुयुमा, पर अधिकांश मंदारिन-प्रधान", "de": "ernsthaft gefährdet; ~10.000 ethnische Puyuma, meist mandarindominant", "fr": "sérieusement en danger ; ~10 000 Puyuma ethniques, surtout sinophones (mandarin)", "it": "gravemente in pericolo; ~10.000 puyuma etnici, per lo più a dominanza mandarina", "es": "seriamente amenazada; ~10 000 puyuma étnicos, mayoritariamente de dominio mandarín", "pt": "severamente ameaçada; ~10 mil puyumas étnicos, mas a maioria é dominante em mandarim", "ru": "в серьёзной опасности; ~10 тыс. этнических пуюма, но большинство говорит в основном на мандаринском", "uk": "у серйозній небезпеці; ~10 тис. етнічних пуюма, але більшість говорить переважно мандаринською", "ar": "مهددة بشدة؛ ~10 آلاف من البويوما عرقيًا لكن تغلب الماندرين على معظمهم", "he": "בסכנה חמורה; ~10 אלף פויומה אתניים, אך אצל רובם המנדרינית שלטת", "sw": "hatarini sana; Wapuyuma elfu ~10 kwa asili lakini wengi hutawaliwa na Kimandarini"}, "severely endangered; ~7,500 ethnic Koryak in 2010 census but most are L1 Russian-dominant": {"ja": "重大な危険；2010年国勢調査でコリャーク人は約7,500人だが大半はロシア語を母語とする", "ko": "심각한 위기; 2010년 인구조사에서 코랴크인은 약 7,500명이나 대부분 러시아어가 모어", "zh": "严重危险；2010年人口普查科里亚克族约7500人，但多数以俄语为母语", "yue": "嚴重危險；2010年人口普查科里亞克族約7,500人，但多數以俄語為母語", "vi": "Nguy cấp nghiêm trọng; ~7.500 người dân tộc Koryak trong điều tra dân số 2010 nhưng phần lớn có tiếng mẹ đẻ là tiếng Nga", "th": "ใกล้สูญหายอย่างรุนแรง; ชาวคอร์ยัก ~7,500 คนในสำมะโนปี 2010 แต่ส่วนใหญ่ใช้ภาษารัสเซียเป็นภาษาแม่", "id": "sangat terancam; ~7.500 etnis Koryak pada sensus 2010, tetapi kebanyakan berbahasa L1 Rusia", "hi": "गंभीर रूप से संकटग्रस्त; 2010 जनगणना में ~7,500 जातीय कोर्याक, पर अधिकांश की L1 रूसी", "de": "ernsthaft gefährdet; ~7.500 ethnische Korjaken im Zensus 2010, die meisten jedoch mit Russisch als L1", "fr": "sérieusement en danger ; ~7 500 Koriaks au recensement de 2010, mais la plupart ont le russe pour L1", "it": "gravemente in pericolo; ~7.500 coriachi etnici nel censimento 2010, ma per lo più con il russo come L1", "es": "seriamente amenazada; ~7500 koriakos étnicos en el censo de 2010, pero la mayoría con el ruso como L1", "pt": "severamente ameaçada; ~7.500 coriacos étnicos no censo de 2010, mas a maioria tem o russo como L1 dominante", "ru": "в серьёзной опасности; ~7500 этнических коряков по переписи 2010 г., но для большинства родной — русский", "uk": "у серйозній небезпеці; ~7500 етнічних коряків за переписом 2010 р., але для більшості рідна — російська", "ar": "مهددة بشدة؛ ~7,500 من الكورياك عرقيًا في تعداد 2010 لكن لغة معظمهم الأم الغالبة هي الروسية", "he": "בסכנה חמורה; ~7,500 קוריאקים אתניים במפקד 2010, אך לרובם הרוסית היא שפת האם השלטת", "sw": "hatarini sana; Wakoryak ~7,500 kwa asili katika sensa ya 2010 lakini wengi wana Kirusi kama L1 kikuu"}, "sometimes counted as Hindi dialect": {"ja": "ヒンディー語の方言とされることもある", "ko": "힌디어 방언으로 분류되기도 함", "zh": "有时被视为印地语方言", "yue": "有時被視為印地語方言", "vi": "Đôi khi được tính là phương ngữ tiếng Hindi", "th": "บางครั้งนับเป็นภาษาถิ่นของภาษาฮินดี", "id": "kadang dianggap dialek Hindi", "hi": "कभी-कभी हिंदी की बोली मानी जाती है", "de": "teils als Hindi-Dialekt gezählt", "fr": "parfois comptée comme dialecte du hindi", "it": "talvolta considerata dialetto dell'hindi", "es": "a veces contada como dialecto del hindi", "pt": "às vezes contada como dialeto do hindi", "ru": "иногда считается диалектом хинди", "uk": "іноді вважається діалектом гінді", "ar": "تُعد أحيانًا لهجة من الهندية", "he": "לעיתים נחשבת לניב של הינדי", "sw": "wakati mwingine huhesabiwa kama lahaja ya Kihindi"}, "vibrant for Dangaura/Rana, but UNESCO classifies as vulnerable due to Nepali/Hindi pressure": {"ja": "ダンガウラ方言・ラナ方言では活発だが、ネパール語・ヒンディー語の圧力によりUNESCOは「脆弱」に分類", "ko": "당가우라·라나 방언은 활발하나 네팔어·힌디어의 압력으로 유네스코는 '취약'으로 분류", "zh": "当高拉／拉纳方言活跃，但因尼泊尔语／印地语压力，联合国教科文组织列为“脆弱”", "yue": "當高拉／拉納方言活躍，但因尼泊爾語／印地語壓力，聯合國教科文組織列為「脆弱」", "vi": "Sống động ở Dangaura/Rana, nhưng UNESCO xếp loại dễ bị tổn thương do áp lực từ tiếng Nepal/Hindi", "th": "แข็งแรงในดังเการา/รานา แต่ยูเนสโกจัดเป็นเปราะบางเพราะแรงกดดันจากภาษาเนปาล/ฮินดี", "id": "hidup untuk Dangaura/Rana, tetapi UNESCO menggolongkannya rentan karena tekanan Nepali/Hindi", "hi": "दंगौरा/राणा के लिए जीवंत, पर नेपाली/हिंदी दबाव के कारण UNESCO इसे असुरक्षित मानता है", "de": "lebendig bei Dangaura/Rana, von der UNESCO aber wegen Nepali-/Hindi-Drucks als gefährdet eingestuft", "fr": "vivante pour le dangaura/rana, mais classée vulnérable par l'UNESCO sous la pression du népali/hindi", "it": "vitale per dangaura/rana, ma classificata vulnerabile dall'UNESCO per la pressione di nepalese/hindi", "es": "vital en dangaura/rana, pero la UNESCO la clasifica como vulnerable por la presión del nepalí/hindi", "pt": "vital para dangaura/rana, mas a UNESCO a classifica como vulnerável devido à pressão do nepalês/hindi", "ru": "жизнеспособный у дангаура/рана, но ЮНЕСКО относит к уязвимым из-за давления непали/хинди", "uk": "життєздатна в дангаура/рана, але ЮНЕСКО відносить до вразливих через тиск непалі/гінді", "ar": "حيوية في الدانغاورا/الرانا، لكن اليونسكو تصنّفها معرضة للخطر بسبب ضغط النيبالية/الهندية", "he": "תוססת בדנגאורה/ראנה, אך אונסק״ו מסווגת אותה כפגיעה בשל לחץ הנפאלית/הינדי", "sw": "hai kwa Dangaura/Rana, lakini UNESCO inaiainisha hatarini kiasi kwa shinikizo la Kinepali/Kihindi"}, "vibrant in religious-community contexts; UNESCO classifies as vulnerable due to Spanish/Russian/English assimilation pressure outside Mennonite-isolation contexts": {"ja": "宗教共同体の中では活発；メノナイトの孤立した環境の外ではスペイン語・ロシア語・英語への同化圧力のためUNESCOは「脆弱」に分類", "ko": "종교 공동체 안에서는 활발; 메노나이트 고립 환경 밖에서는 스페인어·러시아어·영어 동화 압력으로 유네스코는 '취약'으로 분류", "zh": "在宗教社群中活跃；在门诺派封闭环境之外受西班牙语／俄语／英语同化压力，联合国教科文组织列为“脆弱”", "yue": "在宗教社群中活躍；在門諾派封閉環境之外受西班牙語／俄語／英語同化壓力，聯合國教科文組織列為「脆弱」", "vi": "Sống động trong cộng đồng tôn giáo; UNESCO xếp loại dễ bị tổn thương do áp lực đồng hóa từ tiếng Tây Ban Nha/Nga/Anh bên ngoài môi trường biệt lập của người Mennonite", "th": "แข็งแรงในบริบทชุมชนศาสนา; ยูเนสโกจัดเป็นเปราะบางเพราะแรงกดดันการกลืนจากภาษาสเปน/รัสเซีย/อังกฤษนอกชุมชนเมนโนไนต์ที่แยกตัว", "id": "hidup dalam konteks komunitas keagamaan; UNESCO menggolongkannya rentan karena tekanan asimilasi Spanyol/Rusia/Inggris di luar komunitas Mennonit yang terisolasi", "hi": "धार्मिक-सामुदायिक संदर्भों में जीवंत; मेनोनाइट अलगाव के बाहर स्पेनिश/रूसी/अंग्रेज़ी आत्मसात दबाव के कारण UNESCO इसे असुरक्षित मानता है", "de": "lebendig in religiösen Gemeinschaften; von der UNESCO wegen spanischen/russischen/englischen Assimilationsdrucks außerhalb abgeschotteter Mennonitengemeinden als gefährdet eingestuft", "fr": "vivante dans les communautés religieuses ; classée vulnérable par l'UNESCO sous la pression assimilatrice de l'espagnol/russe/anglais hors des isolats mennonites", "it": "vitale nei contesti comunitari religiosi; classificata vulnerabile dall'UNESCO per la pressione assimilatrice di spagnolo/russo/inglese fuori dalle comunità mennonite isolate", "es": "vital en contextos comunitarios religiosos; la UNESCO la clasifica como vulnerable por la presión asimiladora del español/ruso/inglés fuera de los enclaves menonitas", "pt": "vital em contextos de comunidade religiosa; UNESCO: vulnerável devido à pressão assimilatória do espanhol/russo/inglês fora do isolamento menonita", "ru": "жизнеспособный в религиозных общинах; ЮНЕСКО: уязвимый из-за ассимиляционного давления испанского/русского/английского вне меннонитской изоляции", "uk": "життєздатна в релігійних громадах; ЮНЕСКО: вразлива через асиміляційний тиск іспанської/російської/англійської поза менонітською ізоляцією", "ar": "حيوية في سياقات المجتمع الديني؛ اليونسكو: معرضة للخطر بسبب ضغط الاستيعاب الإسباني/الروسي/الإنجليزي خارج عزلة المينونايت", "he": "תוססת בהקשרי הקהילה הדתית; אונסק״ו: פגיעה בשל לחץ התבוללות של ספרדית/רוסית/אנגלית מחוץ לבידוד המנוניטי", "sw": "hai katika jamii za kidini; UNESCO: hatarini kiasi kwa shinikizo la kumezwa na Kihispania/Kirusi/Kiingereza nje ya utengano wa Wamenonite"}, "vibrant — UNESCO safe in core Aari heartland with intact intergenerational transmission": {"ja": "活発 — アリ人の中心地ではUNESCO「安全」、世代間継承は健在", "ko": "활발 — 아리족 핵심 지역에서 유네스코 '안전', 세대 간 전승 온전", "zh": "活跃 — 阿里人核心地区联合国教科文组织“安全”，代际传承完好", "yue": "活躍 — 阿里人核心地區聯合國教科文組織「安全」，代際傳承完好", "vi": "Sống động — UNESCO: an toàn ở vùng lõi của người Aari, truyền thụ giữa các thế hệ còn nguyên vẹn", "th": "แข็งแรง — ยูเนสโก: ปลอดภัยในถิ่นแกนกลางของชาวอารี การถ่ายทอดข้ามรุ่นยังสมบูรณ์", "id": "hidup — UNESCO: aman di wilayah inti Aari dengan pewarisan antargenerasi yang utuh", "hi": "जीवंत — UNESCO: मुख्य आरी क्षेत्र में सुरक्षित, पीढ़ीगत संचरण अक्षुण्ण", "de": "lebendig — UNESCO: sicher im Kerngebiet der Aari, Weitergabe intakt", "fr": "vivante — UNESCO : sûre au cœur du pays aari, transmission intacte", "it": "vitale — UNESCO: sicura nel cuore del territorio aari, trasmissione intatta", "es": "vital — UNESCO: segura en el núcleo aari, transmisión intacta", "pt": "vital — UNESCO: segura no núcleo aari, com transmissão intergeracional intacta", "ru": "жизнеспособный — ЮНЕСКО: благополучный в основном ареале аари, межпоколенная передача не нарушена", "uk": "життєздатна — ЮНЕСКО: безпечна в основному ареалі аарі, міжпоколінна передача не порушена", "ar": "حيوية — اليونسكو: آمنة في موطن الآري الأساسي مع نقل سليم بين الأجيال", "he": "תוססת — אונסק״ו: בטוחה בלב אזור האארי, עם העברה בין-דורית שלמה", "sw": "hai — UNESCO: salama katika kitovu cha Waari, urithishaji kati ya vizazi uko imara"}, "vibrant — UNESCO safe in core Aurès region with intact intergenerational transmission": {"ja": "活発 — 中心のオーレス地方ではUNESCO「安全」、世代間継承は健在", "ko": "활발 — 핵심 오레스 지역에서 유네스코 '안전', 세대 간 전승 온전", "zh": "活跃 — 核心奥雷斯地区联合国教科文组织“安全”，代际传承完好", "yue": "活躍 — 核心奧雷斯地區聯合國教科文組織「安全」，代際傳承完好", "vi": "Sống động — UNESCO: an toàn ở vùng lõi Aurès, truyền thụ giữa các thế hệ còn nguyên vẹn", "th": "แข็งแรง — ยูเนสโก: ปลอดภัยในภูมิภาคแกนกลางโอแรส การถ่ายทอดข้ามรุ่นยังสมบูรณ์", "id": "hidup — UNESCO: aman di wilayah inti Aurès dengan pewarisan antargenerasi yang utuh", "hi": "जीवंत — UNESCO: मुख्य ओरेस क्षेत्र में सुरक्षित, पीढ़ीगत संचरण अक्षुण्ण", "de": "lebendig — UNESCO: sicher im Kerngebiet des Aurès, Weitergabe intakt", "fr": "vivante — UNESCO : sûre au cœur des Aurès, transmission intacte", "it": "vitale — UNESCO: sicura nel cuore dell'Aurès, trasmissione intatta", "es": "vital — UNESCO: segura en el núcleo del Aurés, transmisión intacta", "pt": "vital — UNESCO: segura no núcleo da região do Aurès, com transmissão intergeracional intacta", "ru": "жизнеспособный — ЮНЕСКО: благополучный в основном районе Орес, межпоколенная передача не нарушена", "uk": "життєздатна — ЮНЕСКО: безпечна в основному районі Орес, міжпоколінна передача не порушена", "ar": "حيوية — اليونسكو: آمنة في منطقة الأوراس الأساسية مع نقل سليم بين الأجيال", "he": "תוססת — אונסק״ו: בטוחה בלב אזור האורס, עם העברה בין-דורית שלמה", "sw": "hai — UNESCO: salama katika kitovu cha eneo la Aurès, urithishaji kati ya vizazi uko imara"}, "vibrant — UNESCO safe in core Berom heartland with strong intergenerational transmission": {"ja": "活発 — ベロム人の中心地ではUNESCO「安全」、世代間継承は強固", "ko": "활발 — 베롬족 핵심 지역에서 유네스코 '안전', 세대 간 전승 견고", "zh": "活跃 — 贝罗姆人核心地区联合国教科文组织“安全”，代际传承稳固", "yue": "活躍 — 貝羅姆人核心地區聯合國教科文組織「安全」，代際傳承穩固", "vi": "Sống động — UNESCO: an toàn ở vùng lõi của người Berom, truyền thụ giữa các thế hệ vững chắc", "th": "แข็งแรง — ยูเนสโก: ปลอดภัยในถิ่นแกนกลางของชาวเบรม การถ่ายทอดข้ามรุ่นแข็งแกร่ง", "id": "hidup — UNESCO: aman di wilayah inti Berom dengan pewarisan antargenerasi yang kuat", "hi": "जीवंत — UNESCO: मुख्य बेरोम क्षेत्र में सुरक्षित, मज़बूत पीढ़ीगत संचरण", "de": "lebendig — UNESCO: sicher im Kerngebiet der Berom, starke Weitergabe", "fr": "vivante — UNESCO : sûre au cœur du pays berom, forte transmission", "it": "vitale — UNESCO: sicura nel cuore del territorio berom, forte trasmissione", "es": "vital — UNESCO: segura en el núcleo berom, fuerte transmisión", "pt": "vital — UNESCO: segura no núcleo berom, com forte transmissão intergeracional", "ru": "жизнеспособный — ЮНЕСКО: благополучный в основном ареале бером, прочная межпоколенная передача", "uk": "життєздатна — ЮНЕСКО: безпечна в основному ареалі бером, міцна міжпоколінна передача", "ar": "حيوية — اليونسكو: آمنة في موطن البيروم الأساسي مع نقل قوي بين الأجيال", "he": "תוססת — אונסק״ו: בטוחה בלב אזור הברום, עם העברה בין-דורית חזקה", "sw": "hai — UNESCO: salama katika kitovu cha Waberom, urithishaji imara kati ya vizazi"}, "vibrant — UNESCO safe in core Guna Yala area with intact intergenerational transmission and strong cultural autonomy": {"ja": "活発 — 中心のグナ・ヤラ地域ではUNESCO「安全」、世代間継承は健在で文化的自治も強い", "ko": "활발 — 핵심 구나얄라 지역에서 유네스코 '안전', 세대 간 전승 온전, 강한 문화적 자치", "zh": "活跃 — 核心古纳雅拉地区联合国教科文组织“安全”，代际传承完好，文化自治程度高", "yue": "活躍 — 核心古納雅拉地區聯合國教科文組織「安全」，代際傳承完好，文化自治程度高", "vi": "Sống động — UNESCO: an toàn ở vùng lõi Guna Yala, truyền thụ giữa các thế hệ còn nguyên vẹn và quyền tự trị văn hóa mạnh", "th": "แข็งแรง — ยูเนสโก: ปลอดภัยในพื้นที่แกนกลางกูนายาลา การถ่ายทอดข้ามรุ่นยังสมบูรณ์และมีอิสระทางวัฒนธรรมสูง", "id": "hidup — UNESCO: aman di wilayah inti Guna Yala dengan pewarisan antargenerasi yang utuh dan otonomi budaya yang kuat", "hi": "जीवंत — UNESCO: मुख्य गुना याला क्षेत्र में सुरक्षित, पीढ़ीगत संचरण अक्षुण्ण और मज़बूत सांस्कृतिक स्वायत्तता", "de": "lebendig — UNESCO: sicher im Kerngebiet Guna Yala, Weitergabe intakt, starke kulturelle Autonomie", "fr": "vivante — UNESCO : sûre au cœur du Guna Yala, transmission intacte et forte autonomie culturelle", "it": "vitale — UNESCO: sicura nel cuore di Guna Yala, trasmissione intatta e forte autonomia culturale", "es": "vital — UNESCO: segura en el núcleo de Guna Yala, transmisión intacta y fuerte autonomía cultural", "pt": "vital — UNESCO: segura na área central de Guna Yala, com transmissão intergeracional intacta e forte autonomia cultural", "ru": "жизнеспособный — ЮНЕСКО: благополучный в основной области Гуна-Яла, межпоколенная передача не нарушена, сильная культурная автономия", "uk": "життєздатна — ЮНЕСКО: безпечна в основній області Гуна-Яла, міжпоколінна передача не порушена, сильна культурна автономія", "ar": "حيوية — اليونسكو: آمنة في منطقة غونا يالا الأساسية مع نقل سليم بين الأجيال واستقلال ثقافي قوي", "he": "תוססת — אונסק״ו: בטוחה באזור גונה יאלה המרכזי, עם העברה בין-דורית שלמה ואוטונומיה תרבותית חזקה", "sw": "hai — UNESCO: salama katika eneo kuu la Guna Yala, urithishaji kati ya vizazi uko imara na uhuru wa kitamaduni wenye nguvu"}, "vibrant — UNESCO safe in core Mamprusi heartland with strong intergenerational transmission": {"ja": "活発 — マンプルシ人の中心地ではUNESCO「安全」、世代間継承は強固", "ko": "활발 — 맘프루시족 핵심 지역에서 유네스코 '안전', 세대 간 전승 견고", "zh": "活跃 — 曼普鲁西人核心地区联合国教科文组织“安全”，代际传承稳固", "yue": "活躍 — 曼普魯西人核心地區聯合國教科文組織「安全」，代際傳承穩固", "vi": "Sống động — UNESCO: an toàn ở vùng lõi của người Mamprusi, truyền thụ giữa các thế hệ vững chắc", "th": "แข็งแรง — ยูเนสโก: ปลอดภัยในถิ่นแกนกลางของชาวมัมปรูซี การถ่ายทอดข้ามรุ่นแข็งแกร่ง", "id": "hidup — UNESCO: aman di wilayah inti Mamprusi dengan pewarisan antargenerasi yang kuat", "hi": "जीवंत — UNESCO: मुख्य मामप्रुसी क्षेत्र में सुरक्षित, मज़बूत पीढ़ीगत संचरण", "de": "lebendig — UNESCO: sicher im Kerngebiet der Mamprusi, starke Weitergabe", "fr": "vivante — UNESCO : sûre au cœur du pays mamprusi, forte transmission", "it": "vitale — UNESCO: sicura nel cuore del territorio mamprusi, forte trasmissione", "es": "vital — UNESCO: segura en el núcleo mamprusi, fuerte transmisión", "pt": "vital — UNESCO: segura no núcleo mamprusi, com forte transmissão intergeracional", "ru": "жизнеспособный — ЮНЕСКО: благополучный в основном ареале мампруси, прочная межпоколенная передача", "uk": "життєздатна — ЮНЕСКО: безпечна в основному ареалі мампрусі, міцна міжпоколінна передача", "ar": "حيوية — اليونسكو: آمنة في موطن المامبروسي الأساسي مع نقل قوي بين الأجيال", "he": "תוססת — אונסק״ו: בטוחה בלב אזור המאמפרוסי, עם העברה בין-דורית חזקה", "sw": "hai — UNESCO: salama katika kitovu cha Wamamprusi, urithishaji imara kati ya vizazi"}, "vibrant — UNESCO safe in core South Sudan/DRC/CAR area with intact intergenerational transmission": {"ja": "活発 — 南スーダン・コンゴ民主共和国・中央アフリカの中心地域ではUNESCO「安全」、世代間継承は健在", "ko": "활발 — 남수단·콩고민주공화국·중앙아프리카공화국 핵심 지역에서 유네스코 '안전', 세대 간 전승 온전", "zh": "活跃 — 南苏丹／刚果（金）／中非核心地区联合国教科文组织“安全”，代际传承完好", "yue": "活躍 — 南蘇丹／剛果（金）／中非核心地區聯合國教科文組織「安全」，代際傳承完好", "vi": "Sống động — UNESCO: an toàn ở vùng lõi Nam Sudan/CHDC Congo/CH Trung Phi, truyền thụ giữa các thế hệ còn nguyên vẹn", "th": "แข็งแรง — ยูเนสโก: ปลอดภัยในพื้นที่แกนกลางซูดานใต้/คองโก (DRC)/แอฟริกากลาง การถ่ายทอดข้ามรุ่นยังสมบูรณ์", "id": "hidup — UNESCO: aman di wilayah inti Sudan Selatan/RD Kongo/RAT dengan pewarisan antargenerasi yang utuh", "hi": "जीवंत — UNESCO: मुख्य दक्षिण सूडान/कांगो लो.ग./मध्य अफ़्रीकी गणराज्य क्षेत्र में सुरक्षित, पीढ़ीगत संचरण अक्षुण्ण", "de": "lebendig — UNESCO: sicher im Kerngebiet Südsudan/DR Kongo/ZAR, Weitergabe intakt", "fr": "vivante — UNESCO : sûre dans la zone centrale Soudan du Sud/RDC/RCA, transmission intacte", "it": "vitale — UNESCO: sicura nell'area centrale Sud Sudan/RD del Congo/RCA, trasmissione intatta", "es": "vital — UNESCO: segura en el área central de Sudán del Sur/RD del Congo/RCA, transmisión intacta", "pt": "vital — UNESCO: segura na área central Sudão do Sul/RDC/RCA, com transmissão intergeracional intacta", "ru": "жизнеспособный — ЮНЕСКО: благополучный в основном ареале Южный Судан/ДРК/ЦАР, межпоколенная передача не нарушена", "uk": "життєздатна — ЮНЕСКО: безпечна в основному ареалі Південний Судан/ДРК/ЦАР, міжпоколінна передача не порушена", "ar": "حيوية — اليونسكو: آمنة في المنطقة الأساسية بجنوب السودان/الكونغو الديمقراطية/أفريقيا الوسطى مع نقل سليم بين الأجيال", "he": "תוססת — אונסק״ו: בטוחה באזור המרכזי בדרום סודן/קונגו הדמוקרטית/הרפובליקה המרכז-אפריקאית, עם העברה בין-דורית שלמה", "sw": "hai — UNESCO: salama katika eneo kuu la Sudan Kusini/DRC/CAR, urithishaji kati ya vizazi uko imara"}, "vibrant — UNESCO safe in urban Greater Accra": {"ja": "活発 — 大アクラの都市部でUNESCO「安全」", "ko": "활발 — 그레이터아크라 도시 지역에서 유네스코 '안전'", "zh": "活跃 — 大阿克拉城区联合国教科文组织“安全”", "yue": "活躍 — 大阿克拉市區聯合國教科文組織「安全」", "vi": "Sống động — UNESCO: an toàn ở đô thị Greater Accra", "th": "แข็งแรง — ยูเนสโก: ปลอดภัยในเขตเมืองเกรตเตอร์อักกรา", "id": "hidup — UNESCO: aman di perkotaan Accra Raya", "hi": "जीवंत — UNESCO: शहरी ग्रेटर अक्रा में सुरक्षित", "de": "lebendig — UNESCO: sicher im städtischen Greater Accra", "fr": "vivante — UNESCO : sûre dans l'agglomération du Grand Accra", "it": "vitale — UNESCO: sicura nell'area urbana della Grande Accra", "es": "vital — UNESCO: segura en el área urbana del Gran Acra", "pt": "vital — UNESCO: segura na Grande Acra urbana", "ru": "жизнеспособный — ЮНЕСКО: благополучный в городской агломерации Большая Аккра", "uk": "життєздатна — ЮНЕСКО: безпечна в міській агломерації Велика Аккра", "ar": "حيوية — اليونسكو: آمنة في أكرا الكبرى الحضرية", "he": "תוססת — אונסק״ו: בטוחה באקרה רבתי העירונית", "sw": "hai — UNESCO: salama katika Accra Kuu ya mjini"}, "vibrant — UNESCO safe with intact intergenerational transmission": {"ja": "活発 — UNESCO「安全」、世代間継承は健在", "ko": "활발 — 유네스코 '안전', 세대 간 전승 온전", "zh": "活跃 — 联合国教科文组织“安全”，代际传承完好", "yue": "活躍 — 聯合國教科文組織「安全」，代際傳承完好", "vi": "Sống động — UNESCO: an toàn, truyền thụ giữa các thế hệ còn nguyên vẹn", "th": "แข็งแรง — ยูเนสโก: ปลอดภัย การถ่ายทอดข้ามรุ่นยังสมบูรณ์", "id": "hidup — UNESCO: aman dengan pewarisan antargenerasi yang utuh", "hi": "जीवंत — UNESCO: सुरक्षित, पीढ़ीगत संचरण अक्षुण्ण", "de": "lebendig — UNESCO: sicher, Weitergabe intakt", "fr": "vivante — UNESCO : sûre, transmission intacte", "it": "vitale — UNESCO: sicura, trasmissione intatta", "es": "vital — UNESCO: segura, transmisión intacta", "pt": "vital — UNESCO: segura, com transmissão intergeracional intacta", "ru": "жизнеспособный — ЮНЕСКО: благополучный, межпоколенная передача не нарушена", "uk": "життєздатна — ЮНЕСКО: безпечна, міжпоколінна передача не порушена", "ar": "حيوية — اليونسكو: آمنة مع نقل سليم بين الأجيال", "he": "תוססת — אונסק״ו: בטוחה, עם העברה בין-דורית שלמה", "sw": "hai — UNESCO: salama, urithishaji kati ya vizazi uko imara"}, "vibrant — UNESCO safe; Musi/Palembang Malay is the dominant lingua franca of the South Sumatra region with strong intergenerational transmission": {"ja": "活発 — UNESCO「安全」；ムシ語／パレンバン・マレー語は南スマトラ地方の主要な共通語で、世代間継承は強固", "ko": "활발 — 유네스코 '안전'; 무시어/팔렘방 말레이어는 남수마트라 지역의 주된 공통어로 세대 간 전승 견고", "zh": "活跃 — 联合国教科文组织“安全”；穆西语／巨港马来语是南苏门答腊地区的主要通用语，代际传承稳固", "yue": "活躍 — 聯合國教科文組織「安全」；穆西語／巨港馬來語是南蘇門答臘地區的主要通用語，代際傳承穩固", "vi": "Sống động — UNESCO: an toàn; tiếng Musi/Mã Lai Palembang là ngôn ngữ chung chủ đạo của vùng Nam Sumatra, truyền thụ giữa các thế hệ vững chắc", "th": "แข็งแรง — ยูเนสโก: ปลอดภัย; ภาษามูซี/มลายูปาเล็มบังเป็นภาษากลางหลักของภูมิภาคสุมาตราใต้ การถ่ายทอดข้ามรุ่นแข็งแกร่ง", "id": "hidup — UNESCO: aman; Melayu Musi/Palembang adalah lingua franca dominan di Sumatera Selatan dengan pewarisan antargenerasi yang kuat", "hi": "जीवंत — UNESCO: सुरक्षित; मुसी/पालेमबांग मलय दक्षिण सुमात्रा क्षेत्र की प्रमुख संपर्क भाषा है, मज़बूत पीढ़ीगत संचरण", "de": "lebendig — UNESCO: sicher; Musi-/Palembang-Malaiisch ist die vorherrschende Verkehrssprache Südsumatras, starke Weitergabe", "fr": "vivante — UNESCO : sûre ; le malais musi/palembang est la lingua franca dominante de Sumatra du Sud, forte transmission", "it": "vitale — UNESCO: sicura; il malese musi/palembang è la lingua franca dominante di Sumatra Meridionale, forte trasmissione", "es": "vital — UNESCO: segura; el malayo musi/palembang es la lengua franca dominante de Sumatra Meridional, fuerte transmisión", "pt": "vital — UNESCO: segura; o malaio musi/palembang é a língua franca dominante da região de Sumatra do Sul, com forte transmissão intergeracional", "ru": "жизнеспособный — ЮНЕСКО: благополучный; малайский муси/палембанг — главный лингва франка Южной Суматры, прочная межпоколенная передача", "uk": "життєздатна — ЮНЕСКО: безпечна; малайська мусі/палембанг — головна лінгва франка Південної Суматри, міцна міжпоколінна передача", "ar": "حيوية — اليونسكو: آمنة؛ ملايوية موسي/باليمبانغ هي اللغة المشتركة الغالبة في جنوب سومطرة مع نقل قوي بين الأجيال", "he": "תוססת — אונסק״ו: בטוחה; המלאית של מוסי/פלמבנג היא הלינגואה פרנקה השלטת באזור דרום סומטרה, עם העברה בין-דורית חזקה", "sw": "hai — UNESCO: salama; Kimalay cha Musi/Palembang ndiyo lugha kuu ya mawasiliano ya eneo la Sumatra Kusini, urithishaji imara kati ya vizazi"}, "vibrant — UNESCO safe; vibrant intergenerational transmission": {"ja": "活発 — UNESCO「安全」；世代間継承は活発", "ko": "활발 — 유네스코 '안전'; 세대 간 전승 활발", "zh": "活跃 — 联合国教科文组织“安全”；代际传承活跃", "yue": "活躍 — 聯合國教科文組織「安全」；代際傳承活躍", "vi": "Sống động — UNESCO: an toàn; truyền thụ giữa các thế hệ mạnh mẽ", "th": "แข็งแรง — ยูเนสโก: ปลอดภัย; การถ่ายทอดข้ามรุ่นแข็งแรง", "id": "hidup — UNESCO: aman; pewarisan antargenerasi yang kuat", "hi": "जीवंत — UNESCO: सुरक्षित; जीवंत पीढ़ीगत संचरण", "de": "lebendig — UNESCO: sicher; lebendige Weitergabe zwischen den Generationen", "fr": "vivante — UNESCO : sûre ; transmission intergénérationnelle vigoureuse", "it": "vitale — UNESCO: sicura; trasmissione intergenerazionale vitale", "es": "vital — UNESCO: segura; transmisión intergeneracional vigorosa", "pt": "vital — UNESCO: segura; transmissão intergeracional vigorosa", "ru": "жизнеспособный — ЮНЕСКО: благополучный; активная межпоколенная передача", "uk": "життєздатна — ЮНЕСКО: безпечна; активна міжпоколінна передача", "ar": "حيوية — اليونسكو: آمنة؛ نقل حيوي بين الأجيال", "he": "תוססת — אונסק״ו: בטוחה; העברה בין-דורית תוססת", "sw": "hai — UNESCO: salama; urithishaji hai kati ya vizazi"}, "vibrant — UNESCO vulnerable due to ongoing Spanish pressure; one of the most-vibrant indigenous languages of Mexico": {"ja": "活発 — スペイン語の継続的な圧力によりUNESCO「脆弱」；メキシコで最も活発な先住民言語の一つ", "ko": "활발 — 스페인어의 지속적 압력으로 유네스코 '취약'; 멕시코에서 가장 활발한 원주민 언어 중 하나", "zh": "活跃 — 因西班牙语持续压力，联合国教科文组织列为“脆弱”；墨西哥最具活力的原住民语言之一", "yue": "活躍 — 因西班牙語持續壓力，聯合國教科文組織列為「脆弱」；墨西哥最具活力的原住民語言之一", "vi": "Sống động — UNESCO: dễ bị tổn thương do áp lực liên tục từ tiếng Tây Ban Nha; một trong những ngôn ngữ bản địa sống động nhất Mexico", "th": "แข็งแรง — ยูเนสโก: เปราะบางเพราะแรงกดดันต่อเนื่องจากภาษาสเปน; หนึ่งในภาษาชนพื้นเมืองที่แข็งแรงที่สุดของเม็กซิโก", "id": "hidup — UNESCO: rentan karena tekanan bahasa Spanyol; salah satu bahasa pribumi paling hidup di Meksiko", "hi": "जीवंत — UNESCO: स्पेनिश दबाव के कारण असुरक्षित; मेक्सिको की सबसे जीवंत आदिवासी भाषाओं में से एक", "de": "lebendig — UNESCO: gefährdet durch anhaltenden spanischen Druck; eine der lebendigsten indigenen Sprachen Mexikos", "fr": "vivante — UNESCO : vulnérable sous la pression de l'espagnol ; l'une des langues autochtones les plus vivantes du Mexique", "it": "vitale — UNESCO: vulnerabile per la pressione dello spagnolo; una delle lingue indigene più vitali del Messico", "es": "vital — UNESCO: vulnerable por la presión del español; una de las lenguas indígenas más vitales de México", "pt": "vital — UNESCO: vulnerável devido à pressão contínua do espanhol; uma das línguas indígenas mais vitais do México", "ru": "жизнеспособный — ЮНЕСКО: уязвимый из-за давления испанского; один из самых жизнеспособных языков коренных народов Мексики", "uk": "життєздатна — ЮНЕСКО: вразлива через тиск іспанської; одна з найжиттєздатніших мов корінних народів Мексики", "ar": "حيوية — اليونسكو: معرضة للخطر بسبب ضغط الإسبانية المستمر؛ من أكثر لغات المكسيك الأصلية حيوية", "he": "תוססת — אונסק״ו: פגיעה בשל לחץ מתמשך של ספרדית; אחת השפות הילידיות התוססות ביותר במקסיקו", "sw": "hai — UNESCO: hatarini kiasi kwa shinikizo la Kihispania; mojawapo ya lugha za wenyeji zilizo hai zaidi Meksiko"}, "vibrant, but classified by UNESCO as vulnerable due to ongoing Standard German pressure": {"ja": "活発だが、標準ドイツ語の継続的な圧力によりUNESCOは「脆弱」に分類", "ko": "활발하나 표준 독일어의 지속적 압력으로 유네스코는 '취약'으로 분류", "zh": "活跃，但因标准德语持续压力，联合国教科文组织列为“脆弱”", "yue": "活躍，但因標準德語持續壓力，聯合國教科文組織列為「脆弱」", "vi": "Sống động, nhưng UNESCO xếp loại dễ bị tổn thương do áp lực liên tục từ tiếng Đức chuẩn", "th": "แข็งแรง แต่ยูเนสโกจัดเป็นเปราะบางเพราะแรงกดดันต่อเนื่องจากภาษาเยอรมันมาตรฐาน", "id": "hidup, tetapi digolongkan UNESCO rentan karena tekanan Jerman Standar", "hi": "जीवंत, पर मानक जर्मन दबाव के कारण UNESCO द्वारा असुरक्षित वर्गीकृत", "de": "lebendig, von der UNESCO aber wegen des Drucks des Standarddeutschen als gefährdet eingestuft", "fr": "vivante, mais classée vulnérable par l'UNESCO sous la pression de l'allemand standard", "it": "vitale, ma classificata vulnerabile dall'UNESCO per la pressione del tedesco standard", "es": "vital, pero clasificada como vulnerable por la UNESCO por la presión del alemán estándar", "pt": "vital, mas classificada pela UNESCO como vulnerável devido à pressão contínua do alemão padrão", "ru": "жизнеспособный, но ЮНЕСКО относит к уязвимым из-за давления литературного немецкого", "uk": "життєздатна, але ЮНЕСКО відносить до вразливих через тиск літературної німецької", "ar": "حيوية لكن اليونسكو تصنّفها معرضة للخطر بسبب ضغط الألمانية الفصحى المستمر", "he": "תוססת, אך אונסק״ו מסווגת אותה כפגיעה בשל לחץ מתמשך של הגרמנית התקנית", "sw": "hai, lakini UNESCO inaiainisha hatarini kiasi kwa shinikizo la Kijerumani Sanifu"}, "vulnerable for Suriname Sarnami; declining elsewhere — UNESCO vulnerable in Suriname, severely endangered in Trinidad/Guyana": {"ja": "スリナムのサルナミ語は脆弱；他地域では衰退 — UNESCOはスリナムで「脆弱」、トリニダード・ガイアナで「重大な危険」", "ko": "수리남 사르나미어는 취약; 그 외 지역은 쇠퇴 — 유네스코: 수리남 '취약', 트리니다드·가이아나 '심각한 위기'", "zh": "苏里南萨尔纳米语脆弱；其他地区衰退 — 联合国教科文组织：苏里南“脆弱”，特立尼达／圭亚那“严重危险”", "yue": "蘇里南薩爾納米語脆弱；其他地區衰退 — 聯合國教科文組織：蘇里南「脆弱」，千里達／圭亞那「嚴重危險」", "vi": "Dễ bị tổn thương với Sarnami ở Suriname; suy giảm ở nơi khác — UNESCO: dễ bị tổn thương ở Suriname, nguy cấp nghiêm trọng ở Trinidad/Guyana", "th": "เปราะบางสำหรับภาษาซาร์นามีในซูรินาม; ถดถอยในที่อื่น — ยูเนสโก: เปราะบางในซูรินาม ใกล้สูญหายอย่างรุนแรงในตรินิแดด/กายอานา", "id": "rentan untuk Sarnami Suriname; menurun di tempat lain — UNESCO: rentan di Suriname, sangat terancam di Trinidad/Guyana", "hi": "सूरीनाम सरनामी के लिए असुरक्षित; अन्यत्र घटती — UNESCO: सूरीनाम में असुरक्षित, त्रिनिदाद/गुयाना में गंभीर रूप से संकटग्रस्त", "de": "gefährdet beim surinamischen Sarnami; anderswo rückläufig — UNESCO: gefährdet in Suriname, ernsthaft gefährdet in Trinidad/Guyana", "fr": "vulnérable pour le sarnami du Suriname ; en déclin ailleurs — UNESCO : vulnérable au Suriname, sérieusement en danger à Trinidad/au Guyana", "it": "vulnerabile per il sarnami del Suriname; in calo altrove — UNESCO: vulnerabile in Suriname, gravemente in pericolo a Trinidad/Guyana", "es": "vulnerable en el sarnami de Surinam; en declive en otros lugares — UNESCO: vulnerable en Surinam, seriamente amenazada en Trinidad/Guyana", "pt": "vulnerável para o sarnami do Suriname; em declínio noutros lugares — UNESCO: vulnerável no Suriname, severamente ameaçada em Trinidad/Guiana", "ru": "уязвимый для суринамского сарнами; в других местах сокращается — ЮНЕСКО: уязвимый в Суринаме, в серьёзной опасности в Тринидаде/Гайане", "uk": "вразлива для суринамської сарнамі; деінде скорочується — ЮНЕСКО: вразлива в Суринамі, у серйозній небезпеці в Тринідаді/Гаяні", "ar": "معرضة للخطر في سارنامي سورينام؛ متراجعة في أماكن أخرى — اليونسكو: معرضة للخطر في سورينام ومهددة بشدة في ترينيداد/غيانا", "he": "פגיעה בסרנאמי של סורינאם; בירידה במקומות אחרים — אונסק״ו: פגיעה בסורינאם, בסכנה חמורה בטרינידד/גיאנה", "sw": "hatarini kiasi kwa Kisarnami cha Suriname; kinapungua kwingineko — UNESCO: hatarini kiasi Suriname, hatarini sana Trinidad/Guyana"}, "vulnerable — UNESCO vulnerable in Nepal core area; declining in diaspora due to English assimilation pressure": {"ja": "脆弱 — ネパールの中心地域でUNESCO「脆弱」；在外では英語への同化圧力で衰退", "ko": "취약 — 네팔 핵심 지역에서 유네스코 '취약'; 해외에서는 영어 동화 압력으로 쇠퇴", "zh": "脆弱 — 尼泊尔核心地区联合国教科文组织“脆弱”；海外侨民中因英语同化压力而衰退", "yue": "脆弱 — 尼泊爾核心地區聯合國教科文組織「脆弱」；海外僑民中因英語同化壓力而衰退", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương ở vùng lõi Nepal; suy giảm trong cộng đồng kiều dân do áp lực đồng hóa tiếng Anh", "th": "เปราะบาง — ยูเนสโก: เปราะบางในพื้นที่แกนกลางเนปาล; ถดถอยในชุมชนพลัดถิ่นเพราะแรงกดดันการกลืนจากภาษาอังกฤษ", "id": "rentan — UNESCO: rentan di wilayah inti Nepal; menurun di diaspora karena tekanan asimilasi Inggris", "hi": "असुरक्षित — UNESCO: नेपाल के मुख्य क्षेत्र में असुरक्षित; अंग्रेज़ी आत्मसात दबाव से प्रवासियों में घटती", "de": "gefährdet — UNESCO: gefährdet im nepalesischen Kerngebiet; in der Diaspora durch englischen Assimilationsdruck rückläufig", "fr": "vulnérable — UNESCO : vulnérable au cœur du Népal ; en déclin dans la diaspora sous la pression de l'anglais", "it": "vulnerabile — UNESCO: vulnerabile nell'area centrale del Nepal; in calo nella diaspora per l'assimilazione all'inglese", "es": "vulnerable — UNESCO: vulnerable en el núcleo de Nepal; en declive en la diáspora por la asimilación al inglés", "pt": "vulnerável — UNESCO: vulnerável na área central do Nepal; em declínio na diáspora pela pressão assimilatória do inglês", "ru": "уязвимый — ЮНЕСКО: уязвимый в основном ареале в Непале; в диаспоре сокращается из-за ассимиляции английским", "uk": "вразлива — ЮНЕСКО: вразлива в основному ареалі в Непалі; у діаспорі скорочується через асиміляцію англійською", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر في المنطقة الأساسية في نيبال؛ متراجعة في الشتات بسبب ضغط الاستيعاب الإنجليزي", "he": "פגיעה — אונסק״ו: פגיעה באזור המרכזי בנפאל; בירידה בתפוצות בשל לחץ התבוללות באנגלית", "sw": "hatarini kiasi — UNESCO: hatarini kiasi katika eneo kuu Nepal; kinapungua ughaibuni kwa shinikizo la kumezwa na Kiingereza"}, "vulnerable — UNESCO vulnerable; Dogon languages have generally been in slow decline under Bambara/French pressure": {"ja": "脆弱 — UNESCO「脆弱」；ドゴン諸語は概してバンバラ語・フランス語の圧力で緩やかに衰退", "ko": "취약 — 유네스코 '취약'; 도곤어군은 대체로 밤바라어·프랑스어 압력으로 서서히 쇠퇴", "zh": "脆弱 — 联合国教科文组织“脆弱”；多贡诸语言在班巴拉语／法语压力下总体缓慢衰退", "yue": "脆弱 — 聯合國教科文組織「脆弱」；多貢諸語言在班巴拉語／法語壓力下總體緩慢衰退", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương; các ngôn ngữ Dogon nhìn chung suy giảm chậm dưới áp lực tiếng Bambara/Pháp", "th": "เปราะบาง — ยูเนสโก: เปราะบาง; กลุ่มภาษาโดกอนโดยรวมค่อย ๆ ถดถอยภายใต้แรงกดดันจากภาษาบัมบารา/ฝรั่งเศส", "id": "rentan — UNESCO: rentan; bahasa-bahasa Dogon umumnya menurun perlahan di bawah tekanan Bambara/Prancis", "hi": "असुरक्षित — UNESCO: असुरक्षित; डोगोन भाषाएँ आम तौर पर बाम्बारा/फ़्रेंच दबाव में धीरे-धीरे घट रही हैं", "de": "gefährdet — UNESCO: gefährdet; die Dogon-Sprachen gehen unter dem Druck von Bambara/Französisch allgemein langsam zurück", "fr": "vulnérable — UNESCO : vulnérable ; les langues dogon déclinent lentement sous la pression du bambara/français", "it": "vulnerabile — UNESCO: vulnerabile; le lingue dogon sono in lento declino sotto la pressione di bambara/francese", "es": "vulnerable — UNESCO: vulnerable; las lenguas dogón declinan lentamente bajo la presión del bambara/francés", "pt": "vulnerável — UNESCO: vulnerável; as línguas dogon em geral declinam lentamente sob pressão do bambara/francês", "ru": "уязвимый — ЮНЕСКО: уязвимый; догонские языки в целом медленно сокращаются под давлением бамана/французского", "uk": "вразлива — ЮНЕСКО: вразлива; догонські мови загалом повільно занепадають під тиском бамана/французької", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر؛ لغات الدوغون عمومًا في تراجع بطيء تحت ضغط البامبارا/الفرنسية", "he": "פגיעה — אונסק״ו: פגיעה; שפות הדוגון בכלל בירידה איטית תחת לחץ הבמבארה/הצרפתית", "sw": "hatarini kiasi — UNESCO: hatarini kiasi; lugha za Kidogon kwa jumla zinapungua polepole kwa shinikizo la Kibambara/Kifaransa"}, "vulnerable — UNESCO vulnerable; intergenerational transmission still functional in core Central Highlands villages": {"ja": "脆弱 — UNESCO「脆弱」；中部高原の中心的な村々では世代間継承がなお機能", "ko": "취약 — 유네스코 '취약'; 중부 고원 핵심 마을에서는 세대 간 전승이 아직 유지", "zh": "脆弱 — 联合国教科文组织“脆弱”；在中部高原核心村落代际传承仍在延续", "yue": "脆弱 — 聯合國教科文組織「脆弱」；在中部高原核心村落代際傳承仍在延續", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương; truyền thụ giữa các thế hệ vẫn duy trì ở các làng lõi vùng cao nguyên trung tâm", "th": "เปราะบาง — ยูเนสโก: เปราะบาง; การถ่ายทอดข้ามรุ่นยังดำเนินอยู่ในหมู่บ้านแกนกลางบนที่ราบสูงตอนกลาง", "id": "rentan — UNESCO: rentan; pewarisan antargenerasi masih berfungsi di desa-desa inti Dataran Tinggi Tengah", "hi": "असुरक्षित — UNESCO: असुरक्षित; मध्य उच्चभूमि के मुख्य गाँवों में पीढ़ीगत संचरण अभी भी कार्यरत", "de": "gefährdet — UNESCO: gefährdet; Weitergabe in den Kerndörfern des Zentralen Hochlands noch funktionsfähig", "fr": "vulnérable — UNESCO : vulnérable ; transmission encore fonctionnelle dans les villages centraux des Hauts Plateaux du Centre", "it": "vulnerabile — UNESCO: vulnerabile; trasmissione ancora funzionante nei villaggi centrali degli Altopiani Centrali", "es": "vulnerable — UNESCO: vulnerable; transmisión aún funcional en las aldeas centrales de las Tierras Altas Centrales", "pt": "vulnerável — UNESCO: vulnerável; transmissão intergeracional ainda funcional nas aldeias centrais do Planalto Central", "ru": "уязвимый — ЮНЕСКО: уязвимый; межпоколенная передача ещё сохраняется в основных сёлах Центрального нагорья", "uk": "вразлива — ЮНЕСКО: вразлива; міжпоколінна передача ще зберігається в основних селах Центрального нагір'я", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر؛ النقل بين الأجيال ما زال قائمًا في قرى المرتفعات الوسطى الأساسية", "he": "פגיעה — אונסק״ו: פגיעה; ההעברה הבין-דורית עדיין מתפקדת בכפרי הרמות המרכזיות", "sw": "hatarini kiasi — UNESCO: hatarini kiasi; urithishaji kati ya vizazi bado unafanya kazi katika vijiji vikuu vya Nyanda za Juu za Kati"}, "vulnerable — UNESCO vulnerable; intergenerational transmission still functional in core Misak heartland but declining": {"ja": "脆弱 — UNESCO「脆弱」；ミサク人の中心地では世代間継承がなお機能しているが衰退中", "ko": "취약 — 유네스코 '취약'; 미삭족 핵심 지역에서는 세대 간 전승이 아직 유지되나 쇠퇴 중", "zh": "脆弱 — 联合国教科文组织“脆弱”；在米萨克人核心地区代际传承仍在延续但正在衰退", "yue": "脆弱 — 聯合國教科文組織「脆弱」；在米薩克人核心地區代際傳承仍在延續但正在衰退", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương; truyền thụ giữa các thế hệ vẫn duy trì ở vùng lõi của người Misak nhưng đang suy giảm", "th": "เปราะบาง — ยูเนสโก: เปราะบาง; การถ่ายทอดข้ามรุ่นยังดำเนินอยู่ในถิ่นแกนกลางของชาวมิซักแต่กำลังถดถอย", "id": "rentan — UNESCO: rentan; pewarisan antargenerasi masih berfungsi di wilayah inti Misak tetapi menurun", "hi": "असुरक्षित — UNESCO: असुरक्षित; मुख्य मिसाक क्षेत्र में पीढ़ीगत संचरण अभी कार्यरत पर घटता हुआ", "de": "gefährdet — UNESCO: gefährdet; Weitergabe im Kerngebiet der Misak noch funktionsfähig, aber rückläufig", "fr": "vulnérable — UNESCO : vulnérable ; transmission encore fonctionnelle au cœur du pays misak mais en déclin", "it": "vulnerabile — UNESCO: vulnerabile; trasmissione ancora funzionante nel cuore del territorio misak ma in calo", "es": "vulnerable — UNESCO: vulnerable; transmisión aún funcional en el núcleo misak, pero en declive", "pt": "vulnerável — UNESCO: vulnerável; transmissão intergeracional ainda funcional no núcleo misak, mas em declínio", "ru": "уязвимый — ЮНЕСКО: уязвимый; межпоколенная передача ещё сохраняется в основном ареале мисак, но ослабевает", "uk": "вразлива — ЮНЕСКО: вразлива; міжпоколінна передача ще зберігається в основному ареалі місак, але слабшає", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر؛ النقل بين الأجيال ما زال قائمًا في موطن الميساك الأساسي لكنه يتراجع", "he": "פגיעה — אונסק״ו: פגיעה; ההעברה הבין-דורית עדיין מתפקדת בלב אזור המיסאק, אך בירידה", "sw": "hatarini kiasi — UNESCO: hatarini kiasi; urithishaji kati ya vizazi bado unafanya kazi katika kitovu cha Wamisak lakini unapungua"}, "vulnerable — UNESCO vulnerable; intergenerational transmission still functional in core Querétaro communities": {"ja": "脆弱 — UNESCO「脆弱」；ケレタロの中心的な共同体では世代間継承がなお機能", "ko": "취약 — 유네스코 '취약'; 케레타로 핵심 공동체에서는 세대 간 전승이 아직 유지", "zh": "脆弱 — 联合国教科文组织“脆弱”；在克雷塔罗核心社区代际传承仍在延续", "yue": "脆弱 — 聯合國教科文組織「脆弱」；在克雷塔羅核心社區代際傳承仍在延續", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương; truyền thụ giữa các thế hệ vẫn duy trì ở các cộng đồng lõi tại Querétaro", "th": "เปราะบาง — ยูเนสโก: เปราะบาง; การถ่ายทอดข้ามรุ่นยังดำเนินอยู่ในชุมชนแกนกลางในเกเรตาโร", "id": "rentan — UNESCO: rentan; pewarisan antargenerasi masih berfungsi di komunitas inti Querétaro", "hi": "असुरक्षित — UNESCO: असुरक्षित; मुख्य केरेतारो समुदायों में पीढ़ीगत संचरण अभी भी कार्यरत", "de": "gefährdet — UNESCO: gefährdet; Weitergabe in den Kerngemeinden von Querétaro noch funktionsfähig", "fr": "vulnérable — UNESCO : vulnérable ; transmission encore fonctionnelle dans les communautés centrales de Querétaro", "it": "vulnerabile — UNESCO: vulnerabile; trasmissione ancora funzionante nelle comunità centrali di Querétaro", "es": "vulnerable — UNESCO: vulnerable; transmisión aún funcional en las comunidades centrales de Querétaro", "pt": "vulnerável — UNESCO: vulnerável; transmissão intergeracional ainda funcional nas comunidades centrais de Querétaro", "ru": "уязвимый — ЮНЕСКО: уязвимый; межпоколенная передача ещё сохраняется в основных общинах Керетаро", "uk": "вразлива — ЮНЕСКО: вразлива; міжпоколінна передача ще зберігається в основних громадах Керетаро", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر؛ النقل بين الأجيال ما زال قائمًا في مجتمعات كيريتارو الأساسية", "he": "פגיעה — אונסק״ו: פגיעה; ההעברה הבין-דורית עדיין מתפקדת בקהילות המרכזיות בקרטארו", "sw": "hatarini kiasi — UNESCO: hatarini kiasi; urithishaji kati ya vizazi bado unafanya kazi katika jamii kuu za Querétaro"}, "vulnerable — UNESCO vulnerable; intergenerational transmission still functional in highland villages": {"ja": "脆弱 — UNESCO「脆弱」；高地の村々では世代間継承がなお機能", "ko": "취약 — 유네스코 '취약'; 고지대 마을에서는 세대 간 전승이 아직 유지", "zh": "脆弱 — 联合国教科文组织“脆弱”；在高地村落代际传承仍在延续", "yue": "脆弱 — 聯合國教科文組織「脆弱」；在高地村落代際傳承仍在延續", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương; truyền thụ giữa các thế hệ vẫn duy trì ở các làng vùng cao", "th": "เปราะบาง — ยูเนสโก: เปราะบาง; การถ่ายทอดข้ามรุ่นยังดำเนินอยู่ในหมู่บ้านบนที่สูง", "id": "rentan — UNESCO: rentan; pewarisan antargenerasi masih berfungsi di desa-desa dataran tinggi", "hi": "असुरक्षित — UNESCO: असुरक्षित; पहाड़ी गाँवों में पीढ़ीगत संचरण अभी भी कार्यरत", "de": "gefährdet — UNESCO: gefährdet; Weitergabe in den Hochlanddörfern noch funktionsfähig", "fr": "vulnérable — UNESCO : vulnérable ; transmission encore fonctionnelle dans les villages des hautes terres", "it": "vulnerabile — UNESCO: vulnerabile; trasmissione ancora funzionante nei villaggi degli altopiani", "es": "vulnerable — UNESCO: vulnerable; transmisión aún funcional en las aldeas de las tierras altas", "pt": "vulnerável — UNESCO: vulnerável; transmissão intergeracional ainda funcional nas aldeias das terras altas", "ru": "уязвимый — ЮНЕСКО: уязвимый; межпоколенная передача ещё сохраняется в горных сёлах", "uk": "вразлива — ЮНЕСКО: вразлива; міжпоколінна передача ще зберігається в гірських селах", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر؛ النقل بين الأجيال ما زال قائمًا في قرى المرتفعات", "he": "פגיעה — אונסק״ו: פגיעה; ההעברה הבין-דורית עדיין מתפקדת בכפרי הרמות", "sw": "hatarini kiasi — UNESCO: hatarini kiasi; urithishaji kati ya vizazi bado unafanya kazi katika vijiji vya nyanda za juu"}, "vulnerable — UNESCO vulnerable; intergenerational transmission still functional in some Sierra Norte villages but declining under Spanish pressure": {"ja": "脆弱 — UNESCO「脆弱」；シエラ・ノルテの一部の村では世代間継承がなお機能しているが、スペイン語の圧力で衰退中", "ko": "취약 — 유네스코 '취약'; 일부 시에라노르테 마을에서는 세대 간 전승이 아직 유지되나 스페인어 압력으로 쇠퇴 중", "zh": "脆弱 — 联合国教科文组织“脆弱”；在部分北部山区（Sierra Norte）村落代际传承仍在延续，但在西班牙语压力下衰退", "yue": "脆弱 — 聯合國教科文組織「脆弱」；在部分北部山區（Sierra Norte）村落代際傳承仍在延續，但在西班牙語壓力下衰退", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương; truyền thụ giữa các thế hệ vẫn duy trì ở một số làng Sierra Norte nhưng suy giảm dưới áp lực tiếng Tây Ban Nha", "th": "เปราะบาง — ยูเนสโก: เปราะบาง; การถ่ายทอดข้ามรุ่นยังดำเนินอยู่ในบางหมู่บ้านของเซียร์ราน็อร์เตแต่ถดถอยภายใต้แรงกดดันจากภาษาสเปน", "id": "rentan — UNESCO: rentan; pewarisan antargenerasi masih berfungsi di sebagian desa Sierra Norte tetapi menurun akibat tekanan Spanyol", "hi": "असुरक्षित — UNESCO: असुरक्षित; कुछ सिएरा नॉर्ते गाँवों में पीढ़ीगत संचरण अभी कार्यरत पर स्पेनिश दबाव में घटता हुआ", "de": "gefährdet — UNESCO: gefährdet; Weitergabe in einigen Dörfern der Sierra Norte noch funktionsfähig, aber unter spanischem Druck rückläufig", "fr": "vulnérable — UNESCO : vulnérable ; transmission encore fonctionnelle dans certains villages de la Sierra Norte mais en déclin sous la pression de l'espagnol", "it": "vulnerabile — UNESCO: vulnerabile; trasmissione ancora funzionante in alcuni villaggi della Sierra Norte ma in calo per la pressione dello spagnolo", "es": "vulnerable — UNESCO: vulnerable; transmisión aún funcional en algunos pueblos de la Sierra Norte, pero en declive por la presión del español", "pt": "vulnerável — UNESCO: vulnerável; transmissão intergeracional ainda funcional em algumas aldeias da Sierra Norte, mas em declínio sob pressão do espanhol", "ru": "уязвимый — ЮНЕСКО: уязвимый; межпоколенная передача ещё сохраняется в некоторых сёлах Сьерра-Норте, но ослабевает под давлением испанского", "uk": "вразлива — ЮНЕСКО: вразлива; міжпоколінна передача ще зберігається в деяких селах Сьєрра-Норте, але слабшає під тиском іспанської", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر؛ النقل بين الأجيال ما زال قائمًا في بعض قرى سييرا نورتي لكنه يتراجع تحت ضغط الإسبانية", "he": "פגיעה — אונסק״ו: פגיעה; ההעברה הבין-דורית עדיין מתפקדת בכמה כפרים בסיירה נורטה, אך בירידה תחת לחץ הספרדית", "sw": "hatarini kiasi — UNESCO: hatarini kiasi; urithishaji kati ya vizazi bado unafanya kazi katika baadhi ya vijiji vya Sierra Norte lakini unapungua kwa shinikizo la Kihispania"}, "vulnerable — UNESCO vulnerable; intergenerational transmission weakening but still functional in some communities": {"ja": "脆弱 — UNESCO「脆弱」；世代間継承は弱まりつつも一部の共同体ではなお機能", "ko": "취약 — 유네스코 '취약'; 세대 간 전승은 약해지고 있으나 일부 공동체에서는 아직 유지", "zh": "脆弱 — 联合国教科文组织“脆弱”；代际传承减弱，但在部分社区仍在延续", "yue": "脆弱 — 聯合國教科文組織「脆弱」；代際傳承減弱，但在部分社區仍在延續", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương; truyền thụ giữa các thế hệ suy yếu nhưng vẫn duy trì ở một số cộng đồng", "th": "เปราะบาง — ยูเนสโก: เปราะบาง; การถ่ายทอดข้ามรุ่นอ่อนแอลงแต่ยังดำเนินอยู่ในบางชุมชน", "id": "rentan — UNESCO: rentan; pewarisan antargenerasi melemah tetapi masih berfungsi di sebagian komunitas", "hi": "असुरक्षित — UNESCO: असुरक्षित; पीढ़ीगत संचरण कमज़ोर पर कुछ समुदायों में अभी भी कार्यरत", "de": "gefährdet — UNESCO: gefährdet; Weitergabe schwächer, in manchen Gemeinden aber noch funktionsfähig", "fr": "vulnérable — UNESCO : vulnérable ; transmission affaiblie mais encore fonctionnelle dans certaines communautés", "it": "vulnerabile — UNESCO: vulnerabile; trasmissione indebolita ma ancora funzionante in alcune comunità", "es": "vulnerable — UNESCO: vulnerable; transmisión debilitada pero aún funcional en algunas comunidades", "pt": "vulnerável — UNESCO: vulnerável; transmissão intergeracional enfraquecendo, mas ainda funcional em algumas comunidades", "ru": "уязвимый — ЮНЕСКО: уязвимый; межпоколенная передача ослабевает, но ещё сохраняется в некоторых общинах", "uk": "вразлива — ЮНЕСКО: вразлива; міжпоколінна передача слабшає, але ще зберігається в деяких громадах", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر؛ النقل بين الأجيال يضعف لكنه ما زال قائمًا في بعض المجتمعات", "he": "פגיעה — אונסק״ו: פגיעה; ההעברה הבין-דורית נחלשת אך עדיין מתפקדת בכמה קהילות", "sw": "hatarini kiasi — UNESCO: hatarini kiasi; urithishaji kati ya vizazi unadhoofika lakini bado unafanya kazi katika baadhi ya jamii"}, "vulnerable — UNESCO vulnerable; one of the strongest surviving Pama-Nyungan languages of central Australia": {"ja": "脆弱 — UNESCO「脆弱」；オーストラリア中央部で最も力強く存続するパマ・ニュンガン語の一つ", "ko": "취약 — 유네스코 '취약'; 호주 중부에서 가장 굳건히 살아남은 파마늉안어 중 하나", "zh": "脆弱 — 联合国教科文组织“脆弱”；澳大利亚中部现存最强势的帕马－尼荣甘语言之一", "yue": "脆弱 — 聯合國教科文組織「脆弱」；澳洲中部現存最強勢的帕馬－尼榮甘語言之一", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương; một trong những ngôn ngữ Pama-Nyungan còn tồn tại mạnh nhất ở miền trung nước Úc", "th": "เปราะบาง — ยูเนสโก: เปราะบาง; หนึ่งในภาษาปามา-นยุงงันที่ยังคงอยู่อย่างแข็งแรงที่สุดในออสเตรเลียตอนกลาง", "id": "rentan — UNESCO: rentan; salah satu bahasa Pama-Nyungan terkuat yang bertahan di Australia tengah", "hi": "असुरक्षित — UNESCO: असुरक्षित; मध्य ऑस्ट्रेलिया की सबसे सशक्त जीवित पामा-न्युंगन भाषाओं में से एक", "de": "gefährdet — UNESCO: gefährdet; eine der stärksten erhaltenen Pama-Nyunga-Sprachen Zentralaustraliens", "fr": "vulnérable — UNESCO : vulnérable ; l'une des langues pama-nyungan les plus robustes du centre de l'Australie", "it": "vulnerabile — UNESCO: vulnerabile; una delle lingue pama-nyungan più solide dell'Australia centrale", "es": "vulnerable — UNESCO: vulnerable; una de las lenguas pama-ñunganas más fuertes que perviven en Australia central", "pt": "vulnerável — UNESCO: vulnerável; uma das línguas pama-nyungan sobreviventes mais fortes da Austrália central", "ru": "уязвимый — ЮНЕСКО: уязвимый; один из самых устойчивых сохранившихся пама-ньюнгских языков Центральной Австралии", "uk": "вразлива — ЮНЕСКО: вразлива; одна з найстійкіших збережених пама-ньюнгських мов Центральної Австралії", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر؛ من أقوى لغات باما-نيونغان الباقية في وسط أستراليا", "he": "פגיעה — אונסק״ו: פגיעה; אחת משפות הפאמה-ניונגן השורדות החזקות ביותר במרכז אוסטרליה", "sw": "hatarini kiasi — UNESCO: hatarini kiasi; mojawapo ya lugha za Kipama-Nyungan zilizosalia zenye nguvu zaidi katikati ya Australia"}, "vulnerable — UNESCO vulnerable; significant Standard German pressure especially in younger generations and urban Stuttgart metropolitan area": {"ja": "脆弱 — UNESCO「脆弱」；特に若い世代とシュトゥットガルト都市圏で標準ドイツ語の圧力が大きい", "ko": "취약 — 유네스코 '취약'; 특히 젊은 세대와 슈투트가르트 대도시권에서 표준 독일어 압력이 큼", "zh": "脆弱 — 联合国教科文组织“脆弱”；标准德语压力显著，尤其在年轻一代和斯图加特都市圈", "yue": "脆弱 — 聯合國教科文組織「脆弱」；標準德語壓力顯著，尤其在年輕一代及斯圖加特都會區", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương; áp lực lớn từ tiếng Đức chuẩn, nhất là ở thế hệ trẻ và vùng đô thị Stuttgart", "th": "เปราะบาง — ยูเนสโก: เปราะบาง; แรงกดดันจากภาษาเยอรมันมาตรฐานสูง โดยเฉพาะในคนรุ่นใหม่และเขตมหานครชตุทการ์ท", "id": "rentan — UNESCO: rentan; tekanan Jerman Standar yang signifikan, terutama pada generasi muda dan di kawasan metropolitan Stuttgart", "hi": "असुरक्षित — UNESCO: असुरक्षित; मानक जर्मन का भारी दबाव, विशेषकर युवा पीढ़ी और शहरी स्टुटगार्ट महानगरीय क्षेत्र में", "de": "gefährdet — UNESCO: gefährdet; erheblicher Druck des Standarddeutschen, besonders bei Jüngeren und in der Metropolregion Stuttgart", "fr": "vulnérable — UNESCO : vulnérable ; forte pression de l'allemand standard, surtout chez les jeunes et dans l'agglomération de Stuttgart", "it": "vulnerabile — UNESCO: vulnerabile; forte pressione del tedesco standard, soprattutto tra i giovani e nell'area metropolitana di Stoccarda", "es": "vulnerable — UNESCO: vulnerable; fuerte presión del alemán estándar, sobre todo entre los jóvenes y en el área metropolitana de Stuttgart", "pt": "vulnerável — UNESCO: vulnerável; forte pressão do alemão padrão, sobretudo entre os jovens e na região metropolitana de Stuttgart", "ru": "уязвимый — ЮНЕСКО: уязвимый; сильное давление литературного немецкого, особенно на молодёжь и в агломерации Штутгарта", "uk": "вразлива — ЮНЕСКО: вразлива; сильний тиск літературної німецької, особливо на молодь і в агломерації Штутгарта", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر؛ ضغط كبير من الألمانية الفصحى خاصة بين الأجيال الشابة وفي منطقة شتوتغارت الحضرية", "he": "פגיעה — אונסק״ו: פגיעה; לחץ ניכר של הגרמנית התקנית, בעיקר בקרב הצעירים ובמטרופולין שטוטגרט", "sw": "hatarini kiasi — UNESCO: hatarini kiasi; shinikizo kubwa la Kijerumani Sanifu hasa kwa vijana na eneo la jiji la Stuttgart"}, "vulnerable — UNESCO vulnerable; significant erosion under Standard French pressure": {"ja": "脆弱 — UNESCO「脆弱」；標準フランス語の圧力で大きく衰退", "ko": "취약 — 유네스코 '취약'; 표준 프랑스어 압력으로 크게 약화", "zh": "脆弱 — 联合国教科文组织“脆弱”；在标准法语压力下显著萎缩", "yue": "脆弱 — 聯合國教科文組織「脆弱」；在標準法語壓力下顯著萎縮", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương; mai một đáng kể dưới áp lực tiếng Pháp chuẩn", "th": "เปราะบาง — ยูเนสโก: เปราะบาง; เสื่อมถอยมากภายใต้แรงกดดันจากภาษาฝรั่งเศสมาตรฐาน", "id": "rentan — UNESCO: rentan; erosi signifikan akibat tekanan Prancis Standar", "hi": "असुरक्षित — UNESCO: असुरक्षित; मानक फ़्रेंच दबाव में भारी क्षरण", "de": "gefährdet — UNESCO: gefährdet; erhebliche Erosion durch das Standardfranzösische", "fr": "vulnérable — UNESCO : vulnérable ; forte érosion sous la pression du français standard", "it": "vulnerabile — UNESCO: vulnerabile; forte erosione per la pressione del francese standard", "es": "vulnerable — UNESCO: vulnerable; fuerte erosión por la presión del francés estándar", "pt": "vulnerável — UNESCO: vulnerável; erosão significativa sob pressão do francês padrão", "ru": "уязвимый — ЮНЕСКО: уязвимый; значительная эрозия под давлением литературного французского", "uk": "вразлива — ЮНЕСКО: вразлива; значна ерозія під тиском літературної французької", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر؛ تآكل كبير تحت ضغط الفرنسية الفصحى", "he": "פגיעה — אונסק״ו: פגיעה; שחיקה ניכרת תחת לחץ הצרפתית התקנית", "sw": "hatarini kiasi — UNESCO: hatarini kiasi; mmomonyoko mkubwa kwa shinikizo la Kifaransa Sanifu"}, "vulnerable — UNESCO vulnerable; significant urban Indonesian assimilation pressure especially in Pematangsiantar metropolitan area": {"ja": "脆弱 — UNESCO「脆弱」；特にプマタンシアンタル都市圏でインドネシア語への都市的同化圧力が大きい", "ko": "취약 — 유네스코 '취약'; 특히 프마탕시안타르 도시권에서 인도네시아어 동화 압력이 큼", "zh": "脆弱 — 联合国教科文组织“脆弱”；城市中印尼语同化压力显著，尤其在先达都市区", "yue": "脆弱 — 聯合國教科文組織「脆弱」；城市中印尼語同化壓力顯著，尤其在先達都會區", "vi": "Dễ bị tổn thương — UNESCO: dễ bị tổn thương; áp lực đồng hóa tiếng Indonesia lớn ở đô thị, nhất là vùng đô thị Pematangsiantar", "th": "เปราะบาง — ยูเนสโก: เปราะบาง; แรงกดดันการกลืนจากภาษาอินโดนีเซียในเมืองสูง โดยเฉพาะเขตเมืองเปอมาตังซีอันตาร์", "id": "rentan — UNESCO: rentan; tekanan asimilasi bahasa Indonesia perkotaan yang signifikan, terutama di kawasan metropolitan Pematangsiantar", "hi": "असुरक्षित — UNESCO: असुरक्षित; शहरी इंडोनेशियाई आत्मसात का भारी दबाव, विशेषकर पेमातांगसियान्तार महानगरीय क्षेत्र में", "de": "gefährdet — UNESCO: gefährdet; erheblicher Assimilationsdruck des städtischen Indonesisch, besonders im Großraum Pematangsiantar", "fr": "vulnérable — UNESCO : vulnérable ; forte pression assimilatrice de l'indonésien urbain, surtout dans l'agglomération de Pematangsiantar", "it": "vulnerabile — UNESCO: vulnerabile; forte pressione assimilatrice dell'indonesiano urbano, soprattutto nell'area di Pematangsiantar", "es": "vulnerable — UNESCO: vulnerable; fuerte presión asimiladora del indonesio urbano, sobre todo en el área metropolitana de Pematangsiantar", "pt": "vulnerável — UNESCO: vulnerável; forte pressão assimilatória do indonésio urbano, sobretudo na região metropolitana de Pematangsiantar", "ru": "уязвимый — ЮНЕСКО: уязвимый; сильная ассимиляция индонезийским в городах, особенно в агломерации Пематангсиантара", "uk": "вразлива — ЮНЕСКО: вразлива; сильна асиміляція індонезійською в містах, особливо в агломерації Пематангсіантара", "ar": "معرضة للخطر — اليونسكو: معرضة للخطر؛ ضغط استيعاب كبير من الإندونيسية الحضرية خاصة في منطقة بيماتانغسيانتار الحضرية", "he": "פגיעה — אונסק״ו: פגיעה; לחץ התבוללות ניכר של אינדונזית עירונית, בעיקר במטרופולין פמטנגסיאנטאר", "sw": "hatarini kiasi — UNESCO: hatarini kiasi; shinikizo kubwa la kumezwa na Kiindonesia cha mjini hasa eneo la jiji la Pematangsiantar"}, "whole Bhili group": {"ja": "ビリー語群全体", "ko": "빌리어군 전체", "zh": "整个比尔语组", "yue": "整個比爾語組", "vi": "Toàn bộ nhóm Bhili", "th": "กลุ่มภาษาภีลีทั้งหมด", "id": "seluruh kelompok Bhil", "hi": "संपूर्ण भीली समूह", "de": "gesamte Bhili-Gruppe", "fr": "ensemble du groupe bhili", "it": "intero gruppo bhili", "es": "todo el grupo bhili", "pt": "todo o grupo bhili", "ru": "вся группа бхили", "uk": "уся група бхілі", "ar": "مجموعة البهيلي كلها", "he": "כל קבוצת הבהילי", "sw": "kundi zima la Kibhili"}, "~1,000-1,500 in 2010 census; severe ongoing decline": {"ja": "2010年国勢調査で約1,000〜1,500；深刻な減少が続く", "ko": "2010년 인구조사에서 약 1,000~1,500; 심각한 감소 지속", "zh": "2010年人口普查约1000—1500人；持续严重减少", "yue": "2010年人口普查約1,000至1,500人；持續嚴重減少", "vi": "~1.000–1.500 trong điều tra dân số 2010; đang suy giảm nghiêm trọng", "th": "~1,000–1,500 คนในสำมะโนปี 2010; ลดลงอย่างรุนแรงต่อเนื่อง", "id": "~1.000-1.500 pada sensus 2010; penurunan tajam berkelanjutan", "hi": "2010 जनगणना में ~1,000-1,500; लगातार तीव्र गिरावट", "de": "~1.000-1.500 im Zensus 2010; anhaltender starker Rückgang", "fr": "~1 000-1 500 au recensement de 2010 ; fort déclin continu", "it": "~1.000-1.500 nel censimento 2010; grave declino in corso", "es": "~1000-1500 en el censo de 2010; grave declive continuado", "pt": "~1.000-1.500 no censo de 2010; declínio grave e contínuo", "ru": "~1000-1500 по переписи 2010 г.; продолжается резкое сокращение", "uk": "~1000-1500 за переписом 2010 р.; триває різке скорочення", "ar": "~1,000-1,500 في تعداد 2010؛ تراجع حاد مستمر", "he": "~1,000-1,500 במפקד 2010; ירידה חמורה מתמשכת", "sw": "~1,000-1,500 katika sensa ya 2010; kupungua kwa kasi kunaendelea"}, "~10,500 in 2023 census of Vall de Xálima communities": {"ja": "2023年のシャリマ渓谷共同体の調査で約1万500", "ko": "2023년 샬리마 계곡 공동체 조사에서 약 1만 500", "zh": "2023年沙利马谷社区普查约1.05万", "yue": "2023年沙利馬谷社區普查約1.05萬", "vi": "~10.500 trong điều tra năm 2023 tại các cộng đồng Vall de Xálima", "th": "~10,500 คนในสำมะโนปี 2023 ของชุมชนวัลเดชาลิมา", "id": "~10.500 pada sensus 2023 komunitas Vall de Xálima", "hi": "वाल दे शालिमा समुदायों की 2023 जनगणना में ~10,500", "de": "~10.500 im Zensus 2023 der Gemeinden des Vall de Xálima", "fr": "~10 500 au recensement de 2023 des communes du Vall de Xálima", "it": "~10.500 nel censimento 2023 delle comunità della Vall de Xálima", "es": "~10 500 en el censo de 2023 de las localidades del Val de Xálima", "pt": "~10.500 no censo de 2023 das comunidades do Vale de Xálima", "ru": "~10 500 по переписи 2023 г. в общинах долины Шалима", "uk": "~10 500 за переписом 2023 р. у громадах долини Шаліма", "ar": "~10,500 في تعداد 2023 لمجتمعات وادي شاليما", "he": "~10,500 במפקד 2023 בקהילות עמק שאלימה", "sw": "~10,500 katika sensa ya 2023 ya jamii za Bonde la Xálima"}, "~10-13c. CE": {"ja": "約10〜13世紀", "ko": "약 10~13세기", "zh": "约公元10—13世纪", "yue": "約公元10至13世紀", "vi": "khoảng thế kỷ 10–13 CN", "th": "ราวศตวรรษที่ 10–13", "id": "~abad ke-10–13 M", "hi": "~10वीं-13वीं शताब्दी ई.", "de": "~10.–13. Jh. n. Chr.", "fr": "~Xe-XIIIe s. apr. J.-C.", "it": "~X-XIII sec. d.C.", "es": "~ss. X-XIII d. C.", "pt": "~séc. 10-13 d.C.", "ru": "~10-13 вв. н. э.", "uk": "~10-13 ст. н. е.", "ar": "~القرون 10-13 م", "he": "~המאות ה-10-13 לספירה", "sw": "~karne ya 10-13 BK"}, "~10-15c. CE": {"ja": "約10〜15世紀", "ko": "약 10~15세기", "zh": "约公元10—15世纪", "yue": "約公元10至15世紀", "vi": "khoảng thế kỷ 10–15 CN", "th": "ราวศตวรรษที่ 10–15", "id": "~abad ke-10–15 M", "hi": "~10वीं-15वीं शताब्दी ई.", "de": "~10.–15. Jh. n. Chr.", "fr": "~Xe-XVe s. apr. J.-C.", "it": "~X-XV sec. d.C.", "es": "~ss. X-XV d. C.", "pt": "~séc. 10-15 d.C.", "ru": "~10-15 вв. н. э.", "uk": "~10-15 ст. н. е.", "ar": "~القرون 10-15 م", "he": "~המאות ה-10-15 לספירה", "sw": "~karne ya 10-15 BK"}, "~1000 BCE-600 CE": {"ja": "紀元前約1000年〜紀元600年", "ko": "기원전 약 1000년~기원후 600년", "zh": "约公元前1000年—公元600年", "yue": "約公元前1000年至公元600年", "vi": "khoảng 1000 TCN – 600 CN", "th": "ราว 1000 ปีก่อน ค.ศ. – ค.ศ. 600", "id": "~1000 SM-600 M", "hi": "~1000 ई.पू.-600 ई.", "de": "~1000 v. Chr.-600 n. Chr.", "fr": "~1000 av. J.-C.-600 apr. J.-C.", "it": "~1000 a.C.-600 d.C.", "es": "~1000 a. C.-600 d. C.", "pt": "~1000 a.C.-600 d.C.", "ru": "~1000 до н. э. - 600 н. э.", "uk": "~1000 до н. е. - 600 н. е.", "ar": "~1000 ق.م-600 م", "he": "~1000 לפנה״ס-600 לספירה", "sw": "~1000 KK-600 BK"}, "~1050-1350 CE": {"ja": "約1050〜1350年", "ko": "약 1050~1350년", "zh": "约公元1050—1350年", "yue": "約公元1050至1350年", "vi": "khoảng 1050–1350 CN", "th": "ราว ค.ศ. 1050–1350", "id": "~1050-1350 M", "hi": "~1050-1350 ई.", "de": "~1050-1350 n. Chr.", "fr": "~1050-1350 apr. J.-C.", "it": "~1050-1350 d.C.", "es": "~1050-1350 d. C.", "pt": "~1050-1350 d.C.", "ru": "~1050-1350 н. э.", "uk": "~1050-1350 н. е.", "ar": "~1050-1350 م", "he": "~1050-1350 לספירה", "sw": "~1050-1350 BK"}, "~10K daily L1": {"ja": "日常的な母語話者約1万", "ko": "일상 모어 화자 약 1만", "zh": "日常母语使用者约1万", "yue": "日常母語使用者約1萬", "vi": "~10K người nói tiếng mẹ đẻ hằng ngày", "th": "ผู้พูดเป็นภาษาแม่ในชีวิตประจำวัน ~10K", "id": "~10 rb L1 harian", "hi": "~10K दैनिक L1", "de": "~10.000 tägliche L1", "fr": "~10 000 L1 au quotidien", "it": "~10.000 L1 quotidiana", "es": "~10 000 L1 cotidiana", "pt": "~10 mil L1 de uso diário", "ru": "~10 тыс. ежедневно как родной", "uk": "~10 тис. щодня як рідна", "ar": "~10 آلاف لغة أم يومية", "he": "~10 אלף שפת אם יומיומית", "sw": "L1 ya kila siku elfu ~10"}, "~10th c. - early 16th c.": {"ja": "約10世紀〜16世紀初頭", "ko": "약 10세기~16세기 초", "zh": "约10世纪—16世纪初", "yue": "約10世紀至16世紀初", "vi": "khoảng thế kỷ 10 – đầu thế kỷ 16", "th": "ราวศตวรรษที่ 10 – ต้นศตวรรษที่ 16", "id": "~abad ke-10 - awal abad ke-16", "hi": "~10वीं शताब्दी - 16वीं शताब्दी का आरंभ", "de": "~10. Jh. - Anfang 16. Jh.", "fr": "~Xe s. - début du XVIe s.", "it": "~X sec. - inizio XVI sec.", "es": "~s. X - principios del s. XVI", "pt": "~séc. 10 - início do séc. 16", "ru": "~10 в. - начало 16 в.", "uk": "~10 ст. - початок 16 ст.", "ar": "~القرن 10 - مطلع القرن 16", "he": "~המאה ה-10 - תחילת המאה ה-16", "sw": "~karne ya 10 - mwanzoni mwa karne ya 16"}, "~11-13c. CE": {"ja": "約11〜13世紀", "ko": "약 11~13세기", "zh": "约公元11—13世纪", "yue": "約公元11至13世紀", "vi": "khoảng thế kỷ 11–13 CN", "th": "ราวศตวรรษที่ 11–13", "id": "~abad ke-11–13 M", "hi": "~11वीं-13वीं शताब्दी ई.", "de": "~11.–13. Jh. n. Chr.", "fr": "~XIe-XIIIe s. apr. J.-C.", "it": "~XI-XIII sec. d.C.", "es": "~ss. XI-XIII d. C.", "pt": "~séc. 11-13 d.C.", "ru": "~11-13 вв. н. э.", "uk": "~11-13 ст. н. е.", "ar": "~القرون 11-13 م", "he": "~המאות ה-11-13 לספירה", "sw": "~karne ya 11-13 BK"}, "~11-16c. CE; modern Burmese descends": {"ja": "約11〜16世紀；現代ビルマ語の祖", "ko": "약 11~16세기; 현대 버마어의 조상", "zh": "约公元11—16世纪；现代缅甸语由此演变而来", "yue": "約公元11至16世紀；現代緬甸語由此演變而來", "vi": "khoảng thế kỷ 11–16 CN; tiếng Miến hiện đại bắt nguồn từ đây", "th": "ราวศตวรรษที่ 11–16; ภาษาพม่าสมัยใหม่สืบทอดมาจากภาษานี้", "id": "~abad ke-11–16 M; bahasa Burma modern adalah keturunannya", "hi": "~11वीं-16वीं शताब्दी ई.; आधुनिक बर्मी इसी से निकली", "de": "~11.–16. Jh. n. Chr.; das moderne Birmanisch stammt davon ab", "fr": "~XIe-XVIe s. apr. J.-C. ; le birman moderne en descend", "it": "~XI-XVI sec. d.C.; ne discende il birmano moderno", "es": "~ss. XI-XVI d. C.; de ella desciende el birmano moderno", "pt": "~séc. 11-16 d.C.; dela descende o birmanês moderno", "ru": "~11-16 вв. н. э.; от него происходит современный бирманский", "uk": "~11-16 ст. н. е.; від неї походить сучасна бірманська", "ar": "~القرون 11-16 م؛ تنحدر منها البورمية الحديثة", "he": "~המאות ה-11-16 לספירה; ממנה נובעת הבורמזית המודרנית", "sw": "~karne ya 11-16 BK; Kiburma cha kisasa kinatokana nacho"}, "~1185-1603 CE — Kamakura/Muromachi/Azuchi-Momoyama eras": {"ja": "約1185〜1603年 — 鎌倉・室町・安土桃山時代", "ko": "약 1185~1603년 — 가마쿠라·무로마치·아즈치모모야마 시대", "zh": "约公元1185—1603年 — 镰仓、室町、安土桃山时代", "yue": "約公元1185至1603年 — 鎌倉、室町、安土桃山時代", "vi": "khoảng 1185–1603 CN — thời Kamakura/Muromachi/Azuchi-Momoyama", "th": "ราว ค.ศ. 1185–1603 — ยุคคามากูระ/มูโรมาจิ/อาซูจิ-โมโมยามะ", "id": "~1185-1603 M — era Kamakura/Muromachi/Azuchi-Momoyama", "hi": "~1185-1603 ई. — कामाकुरा/मुरोमाची/अज़ुचि-मोमोयामा काल", "de": "~1185-1603 n. Chr. — Kamakura-/Muromachi-/Azuchi-Momoyama-Zeit", "fr": "~1185-1603 apr. J.-C. — époques de Kamakura/Muromachi/Azuchi-Momoyama", "it": "~1185-1603 d.C. — periodi Kamakura/Muromachi/Azuchi-Momoyama", "es": "~1185-1603 d. C. — periodos Kamakura/Muromachi/Azuchi-Momoyama", "pt": "~1185-1603 d.C. — eras Kamakura/Muromachi/Azuchi-Momoyama", "ru": "~1185-1603 н. э. — периоды Камакура/Муромати/Адзути-Момояма", "uk": "~1185-1603 н. е. — періоди Камакура/Муроматі/Адзуті-Момояма", "ar": "~1185-1603 م — عصور كاماكورا/موروماتشي/أزوتشي-موموياما", "he": "~1185-1603 לספירה — תקופות קמאקורה/מורומאצ׳י/אזוצ׳י-מומויאמה", "sw": "~1185-1603 BK — enzi za Kamakura/Muromachi/Azuchi-Momoyama"}, "~12-17c. CE; ancestor of Manchu": {"ja": "約12〜17世紀；満洲語の祖", "ko": "약 12~17세기; 만주어의 조상", "zh": "约公元12—17世纪；满语的祖语", "yue": "約公元12至17世紀；滿語的祖語", "vi": "khoảng thế kỷ 12–17 CN; tổ tiên của tiếng Mãn", "th": "ราวศตวรรษที่ 12–17; บรรพบุรุษของภาษาแมนจู", "id": "~abad ke-12–17 M; leluhur bahasa Manchu", "hi": "~12वीं-17वीं शताब्दी ई.; मांचू की पूर्वज", "de": "~12.–17. Jh. n. Chr.; Vorläufer des Mandschurischen", "fr": "~XIIe-XVIIe s. apr. J.-C. ; ancêtre du mandchou", "it": "~XII-XVII sec. d.C.; antenato del mancese", "es": "~ss. XII-XVII d. C.; antecesor del manchú", "pt": "~séc. 12-17 d.C.; ancestral do manchu", "ru": "~12-17 вв. н. э.; предок маньчжурского", "uk": "~12-17 ст. н. е.; предок маньчжурської", "ar": "~القرون 12-17 م؛ سلف المانشو", "he": "~המאות ה-12-17 לספירה; אם המנצ׳ורית", "sw": "~karne ya 12-17 BK; asili ya Kimanchu"}, "~1250-200 BCE": {"ja": "紀元前約1250〜200年", "ko": "기원전 약 1250~200년", "zh": "约公元前1250—前200年", "yue": "約公元前1250至前200年", "vi": "khoảng 1250–200 TCN", "th": "ราว 1250–200 ปีก่อน ค.ศ.", "id": "~1250-200 SM", "hi": "~1250-200 ई.पू.", "de": "~1250-200 v. Chr.", "fr": "~1250-200 av. J.-C.", "it": "~1250-200 a.C.", "es": "~1250-200 a. C.", "pt": "~1250-200 a.C.", "ru": "~1250-200 до н. э.", "uk": "~1250-200 до н. е.", "ar": "~1250-200 ق.م", "he": "~1250-200 לפנה״ס", "sw": "~1250-200 KK"}, "~125K India + ~15K Myanmar": {"ja": "インド約12万5,000＋ミャンマー約1万5,000", "ko": "인도 약 12만 5,000 + 미얀마 약 1만 5,000", "zh": "印度约12.5万+缅甸约1.5万", "yue": "印度約12.5萬+緬甸約1.5萬", "vi": "Ấn Độ ~125K + Myanmar ~15K", "th": "อินเดีย ~125K + เมียนมา ~15K", "id": "~125 rb India + ~15 rb Myanmar", "hi": "~125K भारत + ~15K म्यांमार", "de": "~125.000 Indien + ~15.000 Myanmar", "fr": "~125 000 Inde + ~15 000 Birmanie", "it": "~125.000 India + ~15.000 Myanmar", "es": "~125 000 India + ~15 000 Myanmar", "pt": "~125 mil Índia + ~15 mil Mianmar", "ru": "~125 тыс. Индия + ~15 тыс. Мьянма", "uk": "~125 тис. Індія + ~15 тис. М'янма", "ar": "~125 ألف الهند + ~15 ألف ميانمار", "he": "~125 אלף הודו + ~15 אלף מיאנמר", "sw": "India elfu ~125 + Myanmar elfu ~15"}, "~12K daily L1": {"ja": "日常的な母語話者約1万2,000", "ko": "일상 모어 화자 약 1만 2,000", "zh": "日常母语使用者约1.2万", "yue": "日常母語使用者約1.2萬", "vi": "~12K người nói tiếng mẹ đẻ hằng ngày", "th": "ผู้พูดเป็นภาษาแม่ในชีวิตประจำวัน ~12K", "id": "~12 rb L1 harian", "hi": "~12K दैनिक L1", "de": "~12.000 tägliche L1", "fr": "~12 000 L1 au quotidien", "it": "~12.000 L1 quotidiana", "es": "~12 000 L1 cotidiana", "pt": "~12 mil L1 de uso diário", "ru": "~12 тыс. ежедневно как родной", "uk": "~12 тис. щодня як рідна", "ar": "~12 ألف لغة أم يومية", "he": "~12 אלף שפת אם יומיומית", "sw": "L1 ya kila siku elfu ~12"}, "~13-15c. CE; modern Thai descends": {"ja": "約13〜15世紀；現代タイ語の祖", "ko": "약 13~15세기; 현대 타이어의 조상", "zh": "约公元13—15世纪；现代泰语由此演变而来", "yue": "約公元13至15世紀；現代泰語由此演變而來", "vi": "khoảng thế kỷ 13–15 CN; tiếng Thái hiện đại bắt nguồn từ đây", "th": "ราวศตวรรษที่ 13–15; ภาษาไทยสมัยใหม่สืบทอดมาจากภาษานี้", "id": "~abad ke-13–15 M; bahasa Thai modern adalah keturunannya", "hi": "~13वीं-15वीं शताब्दी ई.; आधुनिक थाई इसी से निकली", "de": "~13.–15. Jh. n. Chr.; das moderne Thai stammt davon ab", "fr": "~XIIIe-XVe s. apr. J.-C. ; le thaï moderne en descend", "it": "~XIII-XV sec. d.C.; ne discende il thai moderno", "es": "~ss. XIII-XV d. C.; de ella desciende el tailandés moderno", "pt": "~séc. 13-15 d.C.; dela descende o tailandês moderno", "ru": "~13-15 вв. н. э.; от него происходит современный тайский", "uk": "~13-15 ст. н. е.; від неї походить сучасна тайська", "ar": "~القرون 13-15 م؛ تنحدر منها التايلاندية الحديثة", "he": "~המאות ה-13-15 לספירה; ממנה נובעת התאית המודרנית", "sw": "~karne ya 13-15 BK; Kithai cha kisasa kinatokana nacho"}, "~1300-1928 CE; replaced by modern Turkish": {"ja": "約1300〜1928年；現代トルコ語に置き換えられた", "ko": "약 1300~1928년; 현대 튀르키예어로 대체", "zh": "约公元1300—1928年；被现代土耳其语取代", "yue": "約公元1300至1928年；被現代土耳其語取代", "vi": "khoảng 1300–1928 CN; được thay thế bởi tiếng Thổ Nhĩ Kỳ hiện đại", "th": "ราว ค.ศ. 1300–1928; ถูกแทนที่ด้วยภาษาตุรกีสมัยใหม่", "id": "~1300-1928 M; digantikan bahasa Turki modern", "hi": "~1300-1928 ई.; आधुनिक तुर्की ने स्थान लिया", "de": "~1300-1928 n. Chr.; durch das moderne Türkisch abgelöst", "fr": "~1300-1928 apr. J.-C. ; remplacé par le turc moderne", "it": "~1300-1928 d.C.; sostituito dal turco moderno", "es": "~1300-1928 d. C.; sustituido por el turco moderno", "pt": "~1300-1928 d.C.; substituído pelo turco moderno", "ru": "~1300-1928 н. э.; вытеснен современным турецким", "uk": "~1300-1928 н. е.; витіснена сучасною турецькою", "ar": "~1300-1928 م؛ حلت محلها التركية الحديثة", "he": "~1300-1928 לספירה; הוחלפה בטורקית המודרנית", "sw": "~1300-1928 BK; kilibadilishwa na Kituruki cha kisasa"}, "~14-16c. CE; modern Sundanese descends": {"ja": "約14〜16世紀；現代スンダ語の祖", "ko": "약 14~16세기; 현대 순다어의 조상", "zh": "约公元14—16世纪；现代巽他语由此演变而来", "yue": "約公元14至16世紀；現代巽他語由此演變而來", "vi": "khoảng thế kỷ 14–16 CN; tiếng Sunda hiện đại bắt nguồn từ đây", "th": "ราวศตวรรษที่ 14–16; ภาษาซุนดาสมัยใหม่สืบทอดมาจากภาษานี้", "id": "~abad ke-14–16 M; bahasa Sunda modern adalah keturunannya", "hi": "~14वीं-16वीं शताब्दी ई.; आधुनिक सुंडानी इसी से निकली", "de": "~14.–16. Jh. n. Chr.; das moderne Sundanesisch stammt davon ab", "fr": "~XIVe-XVIe s. apr. J.-C. ; le soundanais moderne en descend", "it": "~XIV-XVI sec. d.C.; ne discende il sundanese moderno", "es": "~ss. XIV-XVI d. C.; de ella desciende el sundanés moderno", "pt": "~séc. 14-16 d.C.; dela descende o sundanês moderno", "ru": "~14-16 вв. н. э.; от него происходит современный сунданский", "uk": "~14-16 ст. н. е.; від неї походить сучасна сунданська", "ar": "~القرون 14-16 م؛ تنحدر منها السوندية الحديثة", "he": "~המאות ה-14-16 לספירה; ממנה נובעת הסונדית המודרנית", "sw": "~karne ya 14-16 BK; Kisunda cha kisasa kinatokana nacho"}, "~1400-1180 BCE": {"ja": "紀元前約1400〜1180年", "ko": "기원전 약 1400~1180년", "zh": "约公元前1400—前1180年", "yue": "約公元前1400至前1180年", "vi": "khoảng 1400–1180 TCN", "th": "ราว 1400–1180 ปีก่อน ค.ศ.", "id": "~1400-1180 SM", "hi": "~1400-1180 ई.पू.", "de": "~1400-1180 v. Chr.", "fr": "~1400-1180 av. J.-C.", "it": "~1400-1180 a.C.", "es": "~1400-1180 a. C.", "pt": "~1400-1180 a.C.", "ru": "~1400-1180 до н. э.", "uk": "~1400-1180 до н. е.", "ar": "~1400-1180 ق.م", "he": "~1400-1180 לפנה״ס", "sw": "~1400-1180 KK"}, "~1450-1200 BCE": {"ja": "紀元前約1450〜1200年", "ko": "기원전 약 1450~1200년", "zh": "约公元前1450—前1200年", "yue": "約公元前1450至前1200年", "vi": "khoảng 1450–1200 TCN", "th": "ราว 1450–1200 ปีก่อน ค.ศ.", "id": "~1450-1200 SM", "hi": "~1450-1200 ई.पू.", "de": "~1450-1200 v. Chr.", "fr": "~1450-1200 av. J.-C.", "it": "~1450-1200 a.C.", "es": "~1450-1200 a. C.", "pt": "~1450-1200 a.C.", "ru": "~1450-1200 до н. э.", "uk": "~1450-1200 до н. е.", "ar": "~1450-1200 ق.م", "he": "~1450-1200 לפנה״ס", "sw": "~1450-1200 KK"}, "~1496 ethnic Udege in 2010 census; most are L1 Russian-dominant": {"ja": "2010年国勢調査でウデヘ人は約1,496人；大半はロシア語を母語とする", "ko": "2010년 인구조사에서 우데게인은 약 1,496명; 대부분 러시아어가 모어", "zh": "2010年人口普查乌德盖族约1496人；多数以俄语为母语", "yue": "2010年人口普查烏德蓋族約1,496人；多數以俄語為母語", "vi": "~1496 người dân tộc Udege trong điều tra dân số 2010; phần lớn có tiếng mẹ đẻ là tiếng Nga", "th": "ชาวอูเดเก ~1496 คนในสำมะโนปี 2010; ส่วนใหญ่ใช้ภาษารัสเซียเป็นภาษาแม่", "id": "~1496 etnis Udege pada sensus 2010; kebanyakan berbahasa L1 Rusia", "hi": "2010 जनगणना में ~1496 जातीय उदेगे; अधिकांश की L1 रूसी", "de": "~1496 ethnische Udehe im Zensus 2010; die meisten mit Russisch als L1", "fr": "~1496 Oudégués au recensement de 2010 ; la plupart ont le russe pour L1", "it": "~1496 udegei etnici nel censimento 2010; per lo più con il russo come L1", "es": "~1496 udegués étnicos en el censo de 2010; la mayoría con el ruso como L1", "pt": "~1496 udeges étnicos no censo de 2010; a maioria tem o russo como L1 dominante", "ru": "~1496 этнических удэгейцев по переписи 2010 г.; для большинства родной — русский", "uk": "~1496 етнічних удеге за переписом 2010 р.; для більшості рідна — російська", "ar": "~1496 من الأوديغي عرقيًا في تعداد 2010؛ لغة معظمهم الأم الغالبة هي الروسية", "he": "~1496 אודגה אתניים במפקד 2010; לרובם הרוסית היא שפת האם השלטת", "sw": "Waudege ~1496 kwa asili katika sensa ya 2010; wengi wana Kirusi kama L1 kikuu"}, "~15-16c. CE; modern Quechua dialects descend": {"ja": "約15〜16世紀；現代ケチュア語諸方言の祖", "ko": "약 15~16세기; 현대 케추아어 방언들의 조상", "zh": "约公元15—16世纪；现代克丘亚语诸方言由此演变而来", "yue": "約公元15至16世紀；現代克丘亞語諸方言由此演變而來", "vi": "khoảng thế kỷ 15–16 CN; các phương ngữ Quechua hiện đại bắt nguồn từ đây", "th": "ราวศตวรรษที่ 15–16; ภาษาถิ่นเกชัวสมัยใหม่สืบทอดมาจากภาษานี้", "id": "~abad ke-15–16 M; dialek-dialek Quechua modern adalah keturunannya", "hi": "~15वीं-16वीं शताब्दी ई.; आधुनिक केचुआ बोलियाँ इसी से निकलीं", "de": "~15.–16. Jh. n. Chr.; die modernen Quechua-Dialekte stammen davon ab", "fr": "~XVe-XVIe s. apr. J.-C. ; les dialectes quechuas modernes en descendent", "it": "~XV-XVI sec. d.C.; ne discendono i dialetti quechua moderni", "es": "~ss. XV-XVI d. C.; de ella descienden los dialectos quechuas modernos", "pt": "~séc. 15-16 d.C.; dela descendem os dialetos quéchuas modernos", "ru": "~15-16 вв. н. э.; от него происходят современные диалекты кечуа", "uk": "~15-16 ст. н. е.; від неї походять сучасні діалекти кечуа", "ar": "~القرنان 15-16 م؛ تنحدر منها لهجات الكيتشوا الحديثة", "he": "~המאות ה-15-16 לספירה; ממנה נובעים ניבי הקצ׳ואה המודרניים", "sw": "~karne ya 15-16 BK; lahaja za kisasa za Kikechua zinatokana nacho"}, "~1500 BCE-3rd c. CE": {"ja": "紀元前約1500年〜紀元3世紀", "ko": "기원전 약 1500년~기원후 3세기", "zh": "约公元前1500年—公元3世纪", "yue": "約公元前1500年至公元3世紀", "vi": "khoảng 1500 TCN – thế kỷ 3 CN", "th": "ราว 1500 ปีก่อน ค.ศ. – ศตวรรษที่ 3", "id": "~1500 SM-abad ke-3 M", "hi": "~1500 ई.पू.-तीसरी शताब्दी ई.", "de": "~1500 v. Chr.-3. Jh. n. Chr.", "fr": "~1500 av. J.-C.-IIIe s. apr. J.-C.", "it": "~1500 a.C.-III sec. d.C.", "es": "~1500 a. C.-s. III d. C.", "pt": "~1500 a.C.-séc. 3 d.C.", "ru": "~1500 до н. э. - 3 в. н. э.", "uk": "~1500 до н. е. - 3 ст. н. е.", "ar": "~1500 ق.م-القرن 3 م", "he": "~1500 לפנה״ס-המאה ה-3 לספירה", "sw": "~1500 KK-karne ya 3 BK"}, "~1500-500 BCE; liturgical use continues": {"ja": "紀元前約1500〜500年；典礼での使用は続く", "ko": "기원전 약 1500~500년; 전례 사용은 지속", "zh": "约公元前1500—前500年；仍用于宗教礼仪", "yue": "約公元前1500至前500年；仍用於宗教禮儀", "vi": "khoảng 1500–500 TCN; vẫn được dùng trong nghi lễ", "th": "ราว 1500–500 ปีก่อน ค.ศ.; ยังใช้ในพิธีกรรม", "id": "~1500-500 SM; penggunaan liturgi berlanjut", "hi": "~1500-500 ई.पू.; धार्मिक उपयोग जारी", "de": "~1500-500 v. Chr.; liturgische Verwendung dauert an", "fr": "~1500-500 av. J.-C. ; l'usage liturgique se poursuit", "it": "~1500-500 a.C.; l'uso liturgico continua", "es": "~1500-500 a. C.; el uso litúrgico continúa", "pt": "~1500-500 a.C.; o uso litúrgico continua", "ru": "~1500-500 до н. э.; литургическое употребление продолжается", "uk": "~1500-500 до н. е.; літургійне вживання триває", "ar": "~1500-500 ق.م؛ الاستخدام الطقسي مستمر", "he": "~1500-500 לפנה״ס; השימוש הליטורגי נמשך", "sw": "~1500-500 KK; matumizi ya ibada yanaendelea"}, "~16c. CE; modern Tagalog descends": {"ja": "約16世紀；現代タガログ語の祖", "ko": "약 16세기; 현대 타갈로그어의 조상", "zh": "约公元16世纪；现代他加禄语由此演变而来", "yue": "約公元16世紀；現代他加祿語由此演變而來", "vi": "khoảng thế kỷ 16 CN; tiếng Tagalog hiện đại bắt nguồn từ đây", "th": "ราวศตวรรษที่ 16; ภาษาตากาล็อกสมัยใหม่สืบทอดมาจากภาษานี้", "id": "~abad ke-16 M; bahasa Tagalog modern adalah keturunannya", "hi": "~16वीं शताब्दी ई.; आधुनिक तागालोग इसी से निकली", "de": "~16. Jh. n. Chr.; das moderne Tagalog stammt davon ab", "fr": "~XVIe s. apr. J.-C. ; le tagalog moderne en descend", "it": "~XVI sec. d.C.; ne discende il tagalog moderno", "es": "~s. XVI d. C.; de ella desciende el tagalo moderno", "pt": "~séc. 16 d.C.; dela descende o tagalo moderno", "ru": "~16 в. н. э.; от него происходит современный тагальский", "uk": "~16 ст. н. е.; від неї походить сучасна тагальська", "ar": "~القرن 16 م؛ تنحدر منها التاغالوغية الحديثة", "he": "~המאה ה-16 לספירה; ממנה נובעת הטגלוג המודרנית", "sw": "~karne ya 16 BK; Kitagalog cha kisasa kinatokana nacho"}, "~17-20c. literary": {"ja": "約17〜20世紀の文語", "ko": "약 17~20세기 문어", "zh": "约17—20世纪书面语", "yue": "約17至20世紀書面語", "vi": "khoảng thế kỷ 17–20, ngôn ngữ văn chương", "th": "ภาษาวรรณกรรมราวศตวรรษที่ 17–20", "id": "~abad ke-17–20, sastra", "hi": "~17वीं-20वीं शताब्दी, साहित्यिक", "de": "~17.–20. Jh., literarisch", "fr": "~XVIIe-XXe s., littéraire", "it": "~XVII-XX sec., letterario", "es": "~ss. XVII-XX, literario", "pt": "~séc. 17-20, literária", "ru": "~17-20 вв., литературный", "uk": "~17-20 ст., літературна", "ar": "~القرون 17-20، أدبية", "he": "~המאות ה-17-20, ספרותית", "sw": "~karne ya 17-20, ya kifasihi"}, "~1M Myanmar + ~50K Thailand": {"ja": "ミャンマー約100万＋タイ約5万", "ko": "미얀마 약 100만 + 태국 약 5만", "zh": "缅甸约100万+泰国约5万", "yue": "緬甸約100萬+泰國約5萬", "vi": "Myanmar ~1M + Thái Lan ~50K", "th": "เมียนมา ~1M + ไทย ~50K", "id": "~1 jt Myanmar + ~50 rb Thailand", "hi": "~1M म्यांमार + ~50K थाईलैंड", "de": "~1 Mio. Myanmar + ~50.000 Thailand", "fr": "~1 M Birmanie + ~50 000 Thaïlande", "it": "~1 Mln Myanmar + ~50.000 Thailandia", "es": "~1 M Myanmar + ~50 000 Tailandia", "pt": "~1 mi Mianmar + ~50 mil Tailândia", "ru": "~1 млн Мьянма + ~50 тыс. Таиланд", "uk": "~1 млн М'янма + ~50 тис. Таїланд", "ar": "~1 مليون ميانمار + ~50 ألف تايلاند", "he": "~1 מיליון מיאנמר + ~50 אלף תאילנד", "sw": "Myanmar milioni ~1 + Thailand elfu ~50"}, "~2000-700 BCE": {"ja": "紀元前約2000〜700年", "ko": "기원전 약 2000~700년", "zh": "约公元前2000—前700年", "yue": "約公元前2000至前700年", "vi": "khoảng 2000–700 TCN", "th": "ราว 2000–700 ปีก่อน ค.ศ.", "id": "~2000-700 SM", "hi": "~2000-700 ई.पू.", "de": "~2000-700 v. Chr.", "fr": "~2000-700 av. J.-C.", "it": "~2000-700 a.C.", "es": "~2000-700 a. C.", "pt": "~2000-700 a.C.", "ru": "~2000-700 до н. э.", "uk": "~2000-700 до н. е.", "ar": "~2000-700 ق.م", "he": "~2000-700 לפנה״ס", "sw": "~2000-700 KK"}, "~2300-1000 BCE": {"ja": "紀元前約2300〜1000年", "ko": "기원전 약 2300~1000년", "zh": "约公元前2300—前1000年", "yue": "約公元前2300至前1000年", "vi": "khoảng 2300–1000 TCN", "th": "ราว 2300–1000 ปีก่อน ค.ศ.", "id": "~2300-1000 SM", "hi": "~2300-1000 ई.पू.", "de": "~2300-1000 v. Chr.", "fr": "~2300-1000 av. J.-C.", "it": "~2300-1000 a.C.", "es": "~2300-1000 a. C.", "pt": "~2300-1000 a.C.", "ru": "~2300-1000 до н. э.", "uk": "~2300-1000 до н. е.", "ar": "~2300-1000 ق.م", "he": "~2300-1000 לפנה״ס", "sw": "~2300-1000 KK"}, "~2400-1700 BCE": {"ja": "紀元前約2400〜1700年", "ko": "기원전 약 2400~1700년", "zh": "约公元前2400—前1700年", "yue": "約公元前2400至前1700年", "vi": "khoảng 2400–1700 TCN", "th": "ราว 2400–1700 ปีก่อน ค.ศ.", "id": "~2400-1700 SM", "hi": "~2400-1700 ई.पू.", "de": "~2400-1700 v. Chr.", "fr": "~2400-1700 av. J.-C.", "it": "~2400-1700 a.C.", "es": "~2400-1700 a. C.", "pt": "~2400-1700 a.C.", "ru": "~2400-1700 до н. э.", "uk": "~2400-1700 до н. е.", "ar": "~2400-1700 ق.م", "he": "~2400-1700 לפנה״ס", "sw": "~2400-1700 KK"}, "~250 BCE-3rd c. CE": {"ja": "紀元前約250年〜紀元3世紀", "ko": "기원전 약 250년~기원후 3세기", "zh": "约公元前250年—公元3世纪", "yue": "約公元前250年至公元3世紀", "vi": "khoảng 250 TCN – thế kỷ 3 CN", "th": "ราว 250 ปีก่อน ค.ศ. – ศตวรรษที่ 3", "id": "~250 SM-abad ke-3 M", "hi": "~250 ई.पू.-तीसरी शताब्दी ई.", "de": "~250 v. Chr.-3. Jh. n. Chr.", "fr": "~250 av. J.-C.-IIIe s. apr. J.-C.", "it": "~250 a.C.-III sec. d.C.", "es": "~250 a. C.-s. III d. C.", "pt": "~250 a.C.-séc. 3 d.C.", "ru": "~250 до н. э. - 3 в. н. э.", "uk": "~250 до н. е. - 3 ст. н. е.", "ar": "~250 ق.م-القرن 3 م", "he": "~250 לפנה״ס-המאה ה-3 לספירה", "sw": "~250 KK-karne ya 3 BK"}, "~2700-300 BCE": {"ja": "紀元前約2700〜300年", "ko": "기원전 약 2700~300년", "zh": "约公元前2700—前300年", "yue": "約公元前2700至前300年", "vi": "khoảng 2700–300 TCN", "th": "ราว 2700–300 ปีก่อน ค.ศ.", "id": "~2700-300 SM", "hi": "~2700-300 ई.पू.", "de": "~2700-300 v. Chr.", "fr": "~2700-300 av. J.-C.", "it": "~2700-300 a.C.", "es": "~2700-300 a. C.", "pt": "~2700-300 a.C.", "ru": "~2700-300 до н. э.", "uk": "~2700-300 до н. е.", "ar": "~2700-300 ق.م", "he": "~2700-300 לפנה״ס", "sw": "~2700-300 KK"}, "~280K Liberia + ~85K Guinea + ~35K Côte d\\'Ivoire": {"ja": "リベリア約28万＋ギニア約8万5,000＋コートジボワール約3万5,000", "ko": "라이베리아 약 28만 + 기니 약 8만 5,000 + 코트디부아르 약 3만 5,000", "zh": "利比里亚约28万+几内亚约8.5万+科特迪瓦约3.5万", "yue": "利比里亞約28萬+幾內亞約8.5萬+科特迪瓦約3.5萬", "vi": "Liberia ~280K + Guinée ~85K + Bờ Biển Ngà ~35K", "th": "ไลบีเรีย ~280K + กินี ~85K + โกตดิวัวร์ ~35K", "id": "~280 rb Liberia + ~85 rb Guinea + ~35 rb Pantai Gading", "hi": "~280K लाइबेरिया + ~85K गिनी + ~35K कोत दिव्वार", "de": "~280.000 Liberia + ~85.000 Guinea + ~35.000 Elfenbeinküste", "fr": "~280 000 Liberia + ~85 000 Guinée + ~35 000 Côte d'Ivoire", "it": "~280.000 Liberia + ~85.000 Guinea + ~35.000 Costa d'Avorio", "es": "~280 000 Liberia + ~85 000 Guinea + ~35 000 Costa de Marfil", "pt": "~280 mil Libéria + ~85 mil Guiné + ~35 mil Costa do Marfim", "ru": "~280 тыс. Либерия + ~85 тыс. Гвинея + ~35 тыс. Кот-д'Ивуар", "uk": "~280 тис. Ліберія + ~85 тис. Гвінея + ~35 тис. Кот-д'Івуар", "ar": "~280 ألف ليبيريا + ~85 ألف غينيا + ~35 ألف ساحل العاج", "he": "~280 אלף ליבריה + ~85 אלף גינאה + ~35 אלף חוף השנהב", "sw": "Liberia elfu ~280 + Guinea elfu ~85 + Côte d'Ivoire elfu ~35"}, "~2K daily L1; severely endangered": {"ja": "日常的な母語話者約2,000；重大な危険", "ko": "일상 모어 화자 약 2,000; 심각한 위기", "zh": "日常母语使用者约2000；严重危险", "yue": "日常母語使用者約2,000；嚴重危險", "vi": "~2K người nói tiếng mẹ đẻ hằng ngày; nguy cấp nghiêm trọng", "th": "ผู้พูดเป็นภาษาแม่ในชีวิตประจำวัน ~2K; ใกล้สูญหายอย่างรุนแรง", "id": "~2 rb L1 harian; sangat terancam", "hi": "~2K दैनिक L1; गंभीर रूप से संकटग्रस्त", "de": "~2.000 tägliche L1; ernsthaft gefährdet", "fr": "~2 000 L1 au quotidien ; sérieusement en danger", "it": "~2.000 L1 quotidiana; gravemente in pericolo", "es": "~2000 L1 cotidiana; seriamente amenazada", "pt": "~2 mil L1 de uso diário; severamente ameaçada", "ru": "~2 тыс. ежедневно как родной; в серьёзной опасности", "uk": "~2 тис. щодня як рідна; у серйозній небезпеці", "ar": "~2 ألف لغة أم يومية؛ مهددة بشدة", "he": "~2,000 שפת אם יומיומית; בסכנה חמורה", "sw": "L1 ya kila siku elfu ~2; hatarini sana"}, "~3 partial speakers": {"ja": "部分話者約3人", "ko": "부분 화자 약 3명", "zh": "约3名部分掌握者", "yue": "約3名部分掌握者", "vi": "~3 người nói một phần", "th": "ผู้พูดได้บางส่วน ~3 คน", "id": "~3 penutur parsial", "hi": "~3 आंशिक वक्ता", "de": "~3 Teilsprecher", "fr": "~3 locuteurs partiels", "it": "~3 parlanti parziali", "es": "~3 hablantes parciales", "pt": "~3 falantes parciais", "ru": "~3 частичных носителя", "uk": "~3 часткових мовці", "ar": "~3 متحدثين جزئيين", "he": "~3 דוברים חלקיים", "sw": "wazungumzaji kiasi ~3"}, "~30 partial speakers": {"ja": "部分話者約30人", "ko": "부분 화자 약 30명", "zh": "约30名部分掌握者", "yue": "約30名部分掌握者", "vi": "~30 người nói một phần", "th": "ผู้พูดได้บางส่วน ~30 คน", "id": "~30 penutur parsial", "hi": "~30 आंशिक वक्ता", "de": "~30 Teilsprecher", "fr": "~30 locuteurs partiels", "it": "~30 parlanti parziali", "es": "~30 hablantes parciales", "pt": "~30 falantes parciais", "ru": "~30 частичных носителей", "uk": "~30 часткових мовців", "ar": "~30 متحدثًا جزئيًا", "he": "~30 דוברים חלקיים", "sw": "wazungumzaji kiasi ~30"}, "~300-500 fluent + ~500 partial speakers; severely endangered": {"ja": "流暢な話者約300〜500＋部分話者約500；重大な危険", "ko": "유창한 화자 약 300~500 + 부분 화자 약 500; 심각한 위기", "zh": "流利使用者约300—500人+部分掌握者约500人；严重危险", "yue": "流利使用者約300至500人+部分掌握者約500人；嚴重危險", "vi": "~300–500 người nói thành thạo + ~500 người nói một phần; nguy cấp nghiêm trọng", "th": "ผู้พูดคล่อง ~300–500 + ผู้พูดได้บางส่วน ~500 คน; ใกล้สูญหายอย่างรุนแรง", "id": "~300-500 fasih + ~500 penutur parsial; sangat terancam", "hi": "~300-500 धाराप्रवाह + ~500 आंशिक वक्ता; गंभीर रूप से संकटग्रस्त", "de": "~300-500 fließend + ~500 Teilsprecher; ernsthaft gefährdet", "fr": "~300-500 courants + ~500 locuteurs partiels ; sérieusement en danger", "it": "~300-500 fluenti + ~500 parlanti parziali; gravemente in pericolo", "es": "~300-500 fluidos + ~500 hablantes parciales; seriamente amenazada", "pt": "~300-500 fluentes + ~500 falantes parciais; severamente ameaçada", "ru": "~300-500 свободно + ~500 частично; в серьёзной опасности", "uk": "~300-500 вільно + ~500 частково; у серйозній небезпеці", "ar": "~300-500 طليقًا + ~500 متحدث جزئي؛ مهددة بشدة", "he": "~300-500 שוטפים + ~500 דוברים חלקיים; בסכנה חמורה", "sw": "fasaha ~300-500 + wazungumzaji kiasi ~500; hatarini sana"}, "~330K L1 Bahamas + ~70K Bahamian-American diaspora primarily Florida": {"ja": "バハマの母語話者約33万＋主にフロリダのバハマ系アメリカ人約7万", "ko": "바하마 모어 화자 약 33만 + 주로 플로리다의 바하마계 미국인 약 7만", "zh": "巴哈马母语者约33万+主要在佛罗里达的巴哈马裔美国侨民约7万", "yue": "巴哈馬母語者約33萬+主要在佛羅里達的巴哈馬裔美國僑民約7萬", "vi": "~330K người nói tiếng mẹ đẻ ở Bahamas + ~70K kiều dân Mỹ gốc Bahamas, chủ yếu ở Florida", "th": "ผู้พูดเป็นภาษาแม่ในบาฮามาส ~330K + ชาวอเมริกันเชื้อสายบาฮามาส ~70K ส่วนใหญ่ในฟลอริดา", "id": "~330 rb L1 Bahama + ~70 rb diaspora Bahama-Amerika, terutama di Florida", "hi": "~330K L1 बहामास + ~70K बहामियाई-अमेरिकी प्रवासी, मुख्यतः फ़्लोरिडा", "de": "~330.000 L1 Bahamas + ~70.000 bahamaisch-amerikanische Diaspora, v. a. Florida", "fr": "~330 000 L1 aux Bahamas + ~70 000 en diaspora bahamo-américaine, surtout en Floride", "it": "~330.000 L1 Bahamas + ~70.000 nella diaspora bahamense-americana, soprattutto in Florida", "es": "~330 000 L1 Bahamas + ~70 000 en la diáspora bahameño-estadounidense, sobre todo en Florida", "pt": "~330 mil L1 nas Bahamas + ~70 mil na diáspora bahamense nos EUA, sobretudo na Flórida", "ru": "~330 тыс. носителей на Багамах + ~70 тыс. в багамской диаспоре в США, в основном во Флориде", "uk": "~330 тис. носіїв на Багамах + ~70 тис. у багамській діаспорі в США, переважно у Флориді", "ar": "~330 ألف لغة أم في جزر البهاما + ~70 ألف في الشتات البهامي الأمريكي خاصة فلوريدا", "he": "~330 אלף דוברי שפת אם באיי בהאמה + ~70 אלף בתפוצה הבהאמית בארה״ב, בעיקר בפלורידה", "sw": "L1 elfu ~330 Bahamas + elfu ~70 ughaibuni wa Kibahama Marekani hasa Florida"}, "~3K daily L1": {"ja": "日常的な母語話者約3,000", "ko": "일상 모어 화자 약 3,000", "zh": "日常母语使用者约3000", "yue": "日常母語使用者約3,000", "vi": "~3K người nói tiếng mẹ đẻ hằng ngày", "th": "ผู้พูดเป็นภาษาแม่ในชีวิตประจำวัน ~3K", "id": "~3 rb L1 harian", "hi": "~3K दैनिक L1", "de": "~3.000 tägliche L1", "fr": "~3 000 L1 au quotidien", "it": "~3.000 L1 quotidiana", "es": "~3000 L1 cotidiana", "pt": "~3 mil L1 de uso diário", "ru": "~3 тыс. ежедневно как родной", "uk": "~3 тис. щодня як рідна", "ar": "~3 آلاف لغة أم يومية", "he": "~3,000 שפת אם יומיומית", "sw": "L1 ya kila siku elfu ~3"}, "~3c. BCE - 4c. CE": {"ja": "紀元前3世紀頃〜紀元4世紀", "ko": "기원전 약 3세기~기원후 4세기", "zh": "约公元前3世纪—公元4世纪", "yue": "約公元前3世紀至公元4世紀", "vi": "khoảng thế kỷ 3 TCN – thế kỷ 4 CN", "th": "ราวศตวรรษที่ 3 ก่อน ค.ศ. – ศตวรรษที่ 4", "id": "~abad ke-3 SM - abad ke-4 M", "hi": "~तीसरी शताब्दी ई.पू. - चौथी शताब्दी ई.", "de": "~3. Jh. v. Chr. - 4. Jh. n. Chr.", "fr": "~IIIe s. av. J.-C. - IVe s. apr. J.-C.", "it": "~III sec. a.C. - IV sec. d.C.", "es": "~s. III a. C. - s. IV d. C.", "pt": "~séc. 3 a.C. - séc. 4 d.C.", "ru": "~3 в. до н. э. - 4 в. н. э.", "uk": "~3 ст. до н. е. - 4 ст. н. е.", "ar": "~القرن 3 ق.م - القرن 4 م", "he": "~המאה ה-3 לפנה״ס - המאה ה-4 לספירה", "sw": "~karne ya 3 KK - karne ya 4 BK"}, "~4-12c. CE": {"ja": "約4〜12世紀", "ko": "약 4~12세기", "zh": "约公元4—12世纪", "yue": "約公元4至12世紀", "vi": "khoảng thế kỷ 4–12 CN", "th": "ราวศตวรรษที่ 4–12", "id": "~abad ke-4–12 M", "hi": "~चौथी-12वीं शताब्दी ई.", "de": "~4.–12. Jh. n. Chr.", "fr": "~IVe-XIIe s. apr. J.-C.", "it": "~IV-XII sec. d.C.", "es": "~ss. IV-XII d. C.", "pt": "~séc. 4-12 d.C.", "ru": "~4-12 вв. н. э.", "uk": "~4-12 ст. н. е.", "ar": "~القرون 4-12 م", "he": "~המאות ה-4-12 לספירה", "sw": "~karne ya 4-12 BK"}, "~4-15c. CE; modern Cham descends": {"ja": "約4〜15世紀；現代チャム語の祖", "ko": "약 4~15세기; 현대 참어의 조상", "zh": "约公元4—15世纪；现代占语由此演变而来", "yue": "約公元4至15世紀；現代占語由此演變而來", "vi": "khoảng thế kỷ 4–15 CN; tiếng Chăm hiện đại bắt nguồn từ đây", "th": "ราวศตวรรษที่ 4–15; ภาษาจามสมัยใหม่สืบทอดมาจากภาษานี้", "id": "~abad ke-4–15 M; bahasa Cham modern adalah keturunannya", "hi": "~चौथी-15वीं शताब्दी ई.; आधुनिक चाम इसी से निकली", "de": "~4.–15. Jh. n. Chr.; das moderne Cham stammt davon ab", "fr": "~IVe-XVe s. apr. J.-C. ; le cham moderne en descend", "it": "~IV-XV sec. d.C.; ne discende il cham moderno", "es": "~ss. IV-XV d. C.; de ella desciende el cham moderno", "pt": "~séc. 4-15 d.C.; dela descende o cham moderno", "ru": "~4-15 вв. н. э.; от него происходит современный тямский", "uk": "~4-15 ст. н. е.; від неї походить сучасна тямська", "ar": "~القرون 4-15 م؛ تنحدر منها التشامية الحديثة", "he": "~המאות ה-4-15 לספירה; ממנה נובעת הצ׳אמית המודרנית", "sw": "~karne ya 4-15 BK; Kicham cha kisasa kinatokana nacho"}, "~400K L1 Liberia + ~200K diaspora Sierra Leone, USA": {"ja": "リベリアの母語話者約40万＋シエラレオネ・米国の在外者約20万", "ko": "라이베리아 모어 화자 약 40만 + 시에라리온·미국 해외 동포 약 20만", "zh": "利比里亚母语者约40万+塞拉利昂、美国侨民约20万", "yue": "利比里亞母語者約40萬+塞拉利昂、美國僑民約20萬", "vi": "~400K người nói tiếng mẹ đẻ ở Liberia + ~200K kiều dân ở Sierra Leone, Mỹ", "th": "ผู้พูดเป็นภาษาแม่ในไลบีเรีย ~400K + ชุมชนพลัดถิ่นในเซียร์ราลีโอน สหรัฐฯ ~200K", "id": "~400 rb L1 Liberia + ~200 rb diaspora Sierra Leone, AS", "hi": "~400K L1 लाइबेरिया + ~200K प्रवासी सिएरा लियोन, अमेरिका", "de": "~400.000 L1 Liberia + ~200.000 Diaspora Sierra Leone, USA", "fr": "~400 000 L1 au Liberia + ~200 000 en diaspora (Sierra Leone, États-Unis)", "it": "~400.000 L1 Liberia + ~200.000 in diaspora (Sierra Leone, USA)", "es": "~400 000 L1 Liberia + ~200 000 en la diáspora (Sierra Leona, EE. UU.)", "pt": "~400 mil L1 na Libéria + ~200 mil na diáspora (Serra Leoa, EUA)", "ru": "~400 тыс. носителей в Либерии + ~200 тыс. в диаспоре (Сьерра-Леоне, США)", "uk": "~400 тис. носіїв у Ліберії + ~200 тис. у діаспорі (Сьєрра-Леоне, США)", "ar": "~400 ألف لغة أم في ليبيريا + ~200 ألف في الشتات (سيراليون، الولايات المتحدة)", "he": "~400 אלף דוברי שפת אם בליבריה + ~200 אלף בתפוצות (סיירה לאון, ארה״ב)", "sw": "L1 elfu ~400 Liberia + elfu ~200 ughaibuni (Sierra Leone, Marekani)"}, "~5-9c. CE; Yaghnobi is descendant": {"ja": "約5〜9世紀；ヤグノブ語が子孫", "ko": "약 5~9세기; 야그노비어가 후손", "zh": "约公元5—9世纪；雅格诺布语为其后裔", "yue": "約公元5至9世紀；雅格諾布語為其後裔", "vi": "khoảng thế kỷ 5–9 CN; tiếng Yaghnob là hậu duệ", "th": "ราวศตวรรษที่ 5–9; ภาษายักโนบีเป็นภาษาลูกหลาน", "id": "~abad ke-5–9 M; Yaghnobi adalah keturunannya", "hi": "~5वीं-9वीं शताब्दी ई.; यग़नोबी इसकी वंशज है", "de": "~5.–9. Jh. n. Chr.; Jagnobisch ist ein Nachfahre", "fr": "~Ve-IXe s. apr. J.-C. ; le yaghnobi en descend", "it": "~V-IX sec. d.C.; lo yaghnobi ne è il discendente", "es": "~ss. V-IX d. C.; el yagnobí es su descendiente", "pt": "~séc. 5-9 d.C.; o yaghnobi é seu descendente", "ru": "~5-9 вв. н. э.; ягнобский — его потомок", "uk": "~5-9 ст. н. е.; ягнобська — її нащадок", "ar": "~القرون 5-9 م؛ اليغنوبية منحدرة منها", "he": "~המאות ה-5-9 לספירה; היגנובית היא צאצאית שלה", "sw": "~karne ya 5-9 BK; Kiyaghnobi ni kizazi chake"}, "~52K Mao County + ~5K dispersed": {"ja": "茂県約5万2,000＋各地に散在約5,000", "ko": "마오현 약 5만 2,000 + 분산 거주 약 5,000", "zh": "茂县约5.2万+散居约5000", "yue": "茂縣約5.2萬+散居約5,000", "vi": "Huyện Mậu ~52K + ~5K phân tán", "th": "อำเภอเม่า ~52K + กระจายตัว ~5K", "id": "~52 rb Kabupaten Mao + ~5 rb tersebar", "hi": "~52K माओ काउंटी + ~5K बिखरे हुए", "de": "~52.000 Kreis Mao + ~5.000 verstreut", "fr": "~52 000 district de Mao + ~5 000 dispersés", "it": "~52.000 contea di Mao + ~5.000 dispersi", "es": "~52 000 condado de Mao + ~5000 dispersos", "pt": "~52 mil no condado de Mao + ~5 mil dispersos", "ru": "~52 тыс. в уезде Маосянь + ~5 тыс. рассеянно", "uk": "~52 тис. у повіті Маосянь + ~5 тис. розпорошено", "ar": "~52 ألف في مقاطعة ماو + ~5 آلاف متفرقين", "he": "~52 אלף במחוז מאו + ~5,000 מפוזרים", "sw": "elfu ~52 Wilaya ya Mao + elfu ~5 waliotawanyika"}, "~550-330 BCE": {"ja": "紀元前約550〜330年", "ko": "기원전 약 550~330년", "zh": "约公元前550—前330年", "yue": "約公元前550至前330年", "vi": "khoảng 550–330 TCN", "th": "ราว 550–330 ปีก่อน ค.ศ.", "id": "~550-330 SM", "hi": "~550-330 ई.पू.", "de": "~550-330 v. Chr.", "fr": "~550-330 av. J.-C.", "it": "~550-330 a.C.", "es": "~550-330 a. C.", "pt": "~550-330 a.C.", "ru": "~550-330 до н. э.", "uk": "~550-330 до н. е.", "ar": "~550-330 ق.م", "he": "~550-330 לפנה״ס", "sw": "~550-330 KK"}, "~5th-10th c. CE": {"ja": "約5〜10世紀", "ko": "약 5~10세기", "zh": "约公元5—10世纪", "yue": "約公元5至10世紀", "vi": "khoảng thế kỷ 5–10 CN", "th": "ราวศตวรรษที่ 5–10", "id": "~abad ke-5–10 M", "hi": "~5वीं-10वीं शताब्दी ई.", "de": "~5.–10. Jh. n. Chr.", "fr": "~Ve-Xe s. apr. J.-C.", "it": "~V-X sec. d.C.", "es": "~ss. V-X d. C.", "pt": "~séc. 5-10 d.C.", "ru": "~5-10 вв. н. э.", "uk": "~5-10 ст. н. е.", "ar": "~القرون 5-10 م", "he": "~המאות ה-5-10 לספירה", "sw": "~karne ya 5-10 BK"}, "~6-10c. CE": {"ja": "約6〜10世紀", "ko": "약 6~10세기", "zh": "约公元6—10世纪", "yue": "約公元6至10世紀", "vi": "khoảng thế kỷ 6–10 CN", "th": "ราวศตวรรษที่ 6–10", "id": "~abad ke-6–10 M", "hi": "~6ठी-10वीं शताब्दी ई.", "de": "~6.–10. Jh. n. Chr.", "fr": "~VIe-Xe s. apr. J.-C.", "it": "~VI-X sec. d.C.", "es": "~ss. VI-X d. C.", "pt": "~séc. 6-10 d.C.", "ru": "~6-10 вв. н. э.", "uk": "~6-10 ст. н. е.", "ar": "~القرون 6-10 م", "he": "~המאות ה-6-10 לספירה", "sw": "~karne ya 6-10 BK"}, "~6-11c. CE; modern Mon descends": {"ja": "約6〜11世紀；現代モン語の祖", "ko": "약 6~11세기; 현대 몬어의 조상", "zh": "约公元6—11世纪；现代孟语由此演变而来", "yue": "約公元6至11世紀；現代孟語由此演變而來", "vi": "khoảng thế kỷ 6–11 CN; tiếng Môn hiện đại bắt nguồn từ đây", "th": "ราวศตวรรษที่ 6–11; ภาษามอญสมัยใหม่สืบทอดมาจากภาษานี้", "id": "~abad ke-6–11 M; bahasa Mon modern adalah keturunannya", "hi": "~6ठी-11वीं शताब्दी ई.; आधुनिक मोन इसी से निकली", "de": "~6.–11. Jh. n. Chr.; das moderne Mon stammt davon ab", "fr": "~VIe-XIe s. apr. J.-C. ; le môn moderne en descend", "it": "~VI-XI sec. d.C.; ne discende il mon moderno", "es": "~ss. VI-XI d. C.; de ella desciende el mon moderno", "pt": "~séc. 6-11 d.C.; dela descende o mon moderno", "ru": "~6-11 вв. н. э.; от него происходит современный монский", "uk": "~6-11 ст. н. е.; від неї походить сучасна монська", "ar": "~القرون 6-11 م؛ تنحدر منها المونية الحديثة", "he": "~המאות ה-6-11 לספירה; ממנה נובעת המון המודרנית", "sw": "~karne ya 6-11 BK; Kimon cha kisasa kinatokana nacho"}, "~600 ethnic Thao but virtually all use Mandarin/Taiwanese in daily life": {"ja": "サオ族は約600人だが、日常生活ではほぼ全員が中国語・台湾語を使用", "ko": "사오족은 약 600명이나 거의 모두 일상에서 중국어·대만어 사용", "zh": "邵族约600人，但几乎全部在日常生活中使用华语／台语", "yue": "邵族約600人，但幾乎全部在日常生活中使用華語／台語", "vi": "~600 người dân tộc Thao nhưng hầu như đều dùng tiếng Quan thoại/tiếng Đài Loan trong sinh hoạt", "th": "ชาวเซา ~600 คน แต่แทบทั้งหมดใช้ภาษาจีนกลาง/ไต้หวันในชีวิตประจำวัน", "id": "~600 etnis Thao, tetapi hampir semuanya memakai Mandarin/Taiwan sehari-hari", "hi": "~600 जातीय थाओ, पर लगभग सभी दैनिक जीवन में मंदारिन/ताइवानी बोलते हैं", "de": "~600 ethnische Thao, doch fast alle sprechen im Alltag Mandarin/Taiwanisch", "fr": "~600 Thao ethniques, mais presque tous utilisent le mandarin/taïwanais au quotidien", "it": "~600 thao etnici, ma quasi tutti usano mandarino/taiwanese nella vita quotidiana", "es": "~600 thao étnicos, pero casi todos usan mandarín/taiwanés en la vida diaria", "pt": "~600 thaos étnicos, mas praticamente todos usam mandarim/taiwanês no dia a dia", "ru": "~600 этнических тао, но почти все в быту говорят на мандаринском/тайваньском", "uk": "~600 етнічних тао, але майже всі в побуті говорять мандаринською/тайванською", "ar": "~600 من الثاو عرقيًا لكن جميعهم تقريبًا يستخدمون الماندرين/التايوانية يوميًا", "he": "~600 תאו אתניים, אך כמעט כולם משתמשים במנדרינית/טייוואנית ביומיום", "sw": "Wathao ~600 kwa asili lakini karibu wote hutumia Kimandarini/Kitaiwani kila siku"}, "~600-794 CE": {"ja": "約600〜794年", "ko": "약 600~794년", "zh": "约公元600—794年", "yue": "約公元600至794年", "vi": "khoảng 600–794 CN", "th": "ราว ค.ศ. 600–794", "id": "~600-794 M", "hi": "~600-794 ई.", "de": "~600-794 n. Chr.", "fr": "~600-794 apr. J.-C.", "it": "~600-794 d.C.", "es": "~600-794 d. C.", "pt": "~600-794 d.C.", "ru": "~600-794 н. э.", "uk": "~600-794 н. е.", "ar": "~600-794 م", "he": "~600-794 לספירה", "sw": "~600-794 BK"}, "~600-900 CE": {"ja": "約600〜900年", "ko": "약 600~900년", "zh": "约公元600—900年", "yue": "約公元600至900年", "vi": "khoảng 600–900 CN", "th": "ราว ค.ศ. 600–900", "id": "~600-900 M", "hi": "~600-900 ई.", "de": "~600-900 n. Chr.", "fr": "~600-900 apr. J.-C.", "it": "~600-900 d.C.", "es": "~600-900 d. C.", "pt": "~600-900 d.C.", "ru": "~600-900 н. э.", "uk": "~600-900 н. е.", "ar": "~600-900 م", "he": "~600-900 לספירה", "sw": "~600-900 BK"}, "~600K passive": {"ja": "受動的話者約60万", "ko": "수동적 화자 약 60만", "zh": "被动掌握者约60万", "yue": "被動掌握者約60萬", "vi": "~600K người hiểu thụ động", "th": "ผู้เข้าใจแบบรับรู้ ~600K", "id": "~600 rb pasif", "hi": "~600K निष्क्रिय", "de": "~600.000 passiv", "fr": "~600 000 passifs", "it": "~600.000 passivi", "es": "~600 000 pasivos", "pt": "~600 mil passivos", "ru": "~600 тыс. пассивно", "uk": "~600 тис. пасивно", "ar": "~600 ألف بشكل سلبي", "he": "~600 אלף פסיביים", "sw": "elfu ~600 wa kuelewa tu"}, "~6K L1 + ~20K L2": {"ja": "母語約6,000＋第二言語約2万", "ko": "모어 약 6,000 + 제2언어 약 2만", "zh": "母语约6000+第二语言约2万", "yue": "母語約6,000+第二語言約2萬", "vi": "Tiếng mẹ đẻ ~6K + ngôn ngữ thứ hai ~20K", "th": "ภาษาแม่ ~6K + ภาษาที่สอง ~20K", "id": "~6 rb L1 + ~20 rb L2", "hi": "~6K L1 + ~20K L2", "de": "~6.000 L1 + ~20.000 L2", "fr": "~6 000 L1 + ~20 000 L2", "it": "~6.000 L1 + ~20.000 L2", "es": "~6000 L1 + ~20 000 L2", "pt": "~6 mil L1 + ~20 mil L2", "ru": "~6 тыс. родной + ~20 тыс. второй язык", "uk": "~6 тис. рідна + ~20 тис. друга мова", "ar": "~6 آلاف لغة أم + ~20 ألف لغة ثانية", "he": "~6,000 שפת אם + ~20 אלף שפה שנייה", "sw": "L1 elfu ~6 + L2 elfu ~20"}, "~7-10c. CE — Silla unified Korea": {"ja": "約7〜10世紀 — 統一新羅時代", "ko": "약 7~10세기 — 통일신라 시대", "zh": "约公元7—10世纪 — 统一新罗时期", "yue": "約公元7至10世紀 — 統一新羅時期", "vi": "khoảng thế kỷ 7–10 CN — thời Tân La thống nhất", "th": "ราวศตวรรษที่ 7–10 — สมัยชิลลารวมชาติ", "id": "~abad ke-7–10 M — Silla bersatu", "hi": "~7वीं-10वीं शताब्दी ई. — एकीकृत सिल्ला कोरिया", "de": "~7.–10. Jh. n. Chr. — Vereinigtes Silla", "fr": "~VIIe-Xe s. apr. J.-C. — Silla unifié", "it": "~VII-X sec. d.C. — Silla unificato", "es": "~ss. VII-X d. C. — Silla unificado", "pt": "~séc. 7-10 d.C. — Silla unificada", "ru": "~7-10 вв. н. э. — Объединённое Силла", "uk": "~7-10 ст. н. е. — Об'єднане Сілла", "ar": "~القرون 7-10 م — مملكة شيلا الموحدة", "he": "~המאות ה-7-10 לספירה — שילה המאוחדת", "sw": "~karne ya 7-10 BK — Silla iliyoungana"}, "~7-14c. CE; modern Malay/Indonesian descend": {"ja": "約7〜14世紀；現代マレー語・インドネシア語の祖", "ko": "약 7~14세기; 현대 말레이어·인도네시아어의 조상", "zh": "约公元7—14世纪；现代马来语／印尼语由此演变而来", "yue": "約公元7至14世紀；現代馬來語／印尼語由此演變而來", "vi": "khoảng thế kỷ 7–14 CN; tiếng Mã Lai/Indonesia hiện đại bắt nguồn từ đây", "th": "ราวศตวรรษที่ 7–14; ภาษามลายู/อินโดนีเซียสมัยใหม่สืบทอดมาจากภาษานี้", "id": "~abad ke-7–14 M; bahasa Melayu/Indonesia modern adalah keturunannya", "hi": "~7वीं-14वीं शताब्दी ई.; आधुनिक मलय/इंडोनेशियाई इसी से निकलीं", "de": "~7.–14. Jh. n. Chr.; modernes Malaiisch/Indonesisch stammen davon ab", "fr": "~VIIe-XIVe s. apr. J.-C. ; le malais/l'indonésien modernes en descendent", "it": "~VII-XIV sec. d.C.; ne discendono malese/indonesiano moderni", "es": "~ss. VII-XIV d. C.; de ella descienden el malayo/indonesio modernos", "pt": "~séc. 7-14 d.C.; dela descendem o malaio/indonésio modernos", "ru": "~7-14 вв. н. э.; от него происходят современные малайский/индонезийский", "uk": "~7-14 ст. н. е.; від неї походять сучасні малайська/індонезійська", "ar": "~القرون 7-14 م؛ تنحدر منها الملايوية/الإندونيسية الحديثة", "he": "~המאות ה-7-14 לספירה; ממנה נובעות המלאית/האינדונזית המודרניות", "sw": "~karne ya 7-14 BK; Kimalay/Kiindonesia cha kisasa vinatokana nacho"}, "~7-5c. BCE": {"ja": "紀元前約7〜5世紀", "ko": "기원전 약 7~5세기", "zh": "约公元前7—前5世纪", "yue": "約公元前7至前5世紀", "vi": "khoảng thế kỷ 7–5 TCN", "th": "ราวศตวรรษที่ 7–5 ก่อน ค.ศ.", "id": "~abad ke-7–5 SM", "hi": "~7वीं-5वीं शताब्दी ई.पू.", "de": "~7.–5. Jh. v. Chr.", "fr": "~VIIe-Ve s. av. J.-C.", "it": "~VII-V sec. a.C.", "es": "~ss. VII-V a. C.", "pt": "~séc. 7-5 a.C.", "ru": "~7-5 вв. до н. э.", "uk": "~7-5 ст. до н. е.", "ar": "~القرون 7-5 ق.م", "he": "~המאות ה-7-5 לפנה״ס", "sw": "~karne ya 7-5 KK"}, "~700 BCE - 1c. CE": {"ja": "紀元前約700年〜紀元1世紀", "ko": "기원전 약 700년~기원후 1세기", "zh": "约公元前700年—公元1世纪", "yue": "約公元前700年至公元1世紀", "vi": "khoảng 700 TCN – thế kỷ 1 CN", "th": "ราว 700 ปีก่อน ค.ศ. – ศตวรรษที่ 1", "id": "~700 SM - abad ke-1 M", "hi": "~700 ई.पू. - पहली शताब्दी ई.", "de": "~700 v. Chr. - 1. Jh. n. Chr.", "fr": "~700 av. J.-C. - Ier s. apr. J.-C.", "it": "~700 a.C. - I sec. d.C.", "es": "~700 a. C. - s. I d. C.", "pt": "~700 a.C. - séc. 1 d.C.", "ru": "~700 до н. э. - 1 в. н. э.", "uk": "~700 до н. е. - 1 ст. н. е.", "ar": "~700 ق.م - القرن 1 م", "he": "~700 לפנה״ס - המאה ה-1 לספירה", "sw": "~700 KK - karne ya 1 BK"}, "~70K L1 + ~100K L2; functions as national lingua franca alongside English": {"ja": "母語約7万＋第二言語約10万；英語と並ぶ国内の共通語", "ko": "모어 약 7만 + 제2언어 약 10만; 영어와 함께 국가 공통어 역할", "zh": "母语约7万+第二语言约10万；与英语并列为全国通用语", "yue": "母語約7萬+第二語言約10萬；與英語並列為全國通用語", "vi": "Tiếng mẹ đẻ ~70K + ngôn ngữ thứ hai ~100K; là ngôn ngữ chung quốc gia bên cạnh tiếng Anh", "th": "ภาษาแม่ ~70K + ภาษาที่สอง ~100K; เป็นภาษากลางของประเทศควบคู่กับภาษาอังกฤษ", "id": "~70 rb L1 + ~100 rb L2; berfungsi sebagai lingua franca nasional bersama bahasa Inggris", "hi": "~70K L1 + ~100K L2; अंग्रेज़ी के साथ राष्ट्रीय संपर्क भाषा", "de": "~70.000 L1 + ~100.000 L2; nationale Verkehrssprache neben Englisch", "fr": "~70 000 L1 + ~100 000 L2 ; lingua franca nationale aux côtés de l'anglais", "it": "~70.000 L1 + ~100.000 L2; lingua franca nazionale accanto all'inglese", "es": "~70 000 L1 + ~100 000 L2; lengua franca nacional junto al inglés", "pt": "~70 mil L1 + ~100 mil L2; funciona como língua franca nacional ao lado do inglês", "ru": "~70 тыс. родной + ~100 тыс. второй язык; общенациональный лингва франка наряду с английским", "uk": "~70 тис. рідна + ~100 тис. друга мова; загальнонаціональна лінгва франка поряд з англійською", "ar": "~70 ألف لغة أم + ~100 ألف لغة ثانية؛ لغة مشتركة وطنية إلى جانب الإنجليزية", "he": "~70 אלף שפת אם + ~100 אלף שפה שנייה; משמשת לינגואה פרנקה לאומית לצד האנגלית", "sw": "L1 elfu ~70 + L2 elfu ~100; ni lugha ya taifa ya mawasiliano pamoja na Kiingereza"}, "~750-1050 CE": {"ja": "約750〜1050年", "ko": "약 750~1050년", "zh": "约公元750—1050年", "yue": "約公元750至1050年", "vi": "khoảng 750–1050 CN", "th": "ราว ค.ศ. 750–1050", "id": "~750-1050 M", "hi": "~750-1050 ई.", "de": "~750-1050 n. Chr.", "fr": "~750-1050 apr. J.-C.", "it": "~750-1050 d.C.", "es": "~750-1050 d. C.", "pt": "~750-1050 d.C.", "ru": "~750-1050 н. э.", "uk": "~750-1050 н. е.", "ar": "~750-1050 م", "he": "~750-1050 לספירה", "sw": "~750-1050 BK"}, "~750-1100 CE": {"ja": "約750〜1100年", "ko": "약 750~1100년", "zh": "约公元750—1100年", "yue": "約公元750至1100年", "vi": "khoảng 750–1100 CN", "th": "ราว ค.ศ. 750–1100", "id": "~750-1100 M", "hi": "~750-1100 ई.", "de": "~750-1100 n. Chr.", "fr": "~750-1100 apr. J.-C.", "it": "~750-1100 d.C.", "es": "~750-1100 d. C.", "pt": "~750-1100 d.C.", "ru": "~750-1100 н. э.", "uk": "~750-1100 н. е.", "ar": "~750-1100 م", "he": "~750-1100 לספירה", "sw": "~750-1100 BK"}, "~750K daily L1": {"ja": "日常的な母語話者約75万", "ko": "일상 모어 화자 약 75만", "zh": "日常母语使用者约75万", "yue": "日常母語使用者約75萬", "vi": "~750K người nói tiếng mẹ đẻ hằng ngày", "th": "ผู้พูดเป็นภาษาแม่ในชีวิตประจำวัน ~750K", "id": "~750 rb L1 harian", "hi": "~750K दैनिक L1", "de": "~750.000 tägliche L1", "fr": "~750 000 L1 au quotidien", "it": "~750.000 L1 quotidiana", "es": "~750 000 L1 cotidiana", "pt": "~750 mil L1 de uso diário", "ru": "~750 тыс. ежедневно как родной", "uk": "~750 тис. щодня як рідна", "ar": "~750 ألف لغة أم يومية", "he": "~750 אלף שפת אם יומיומית", "sw": "L1 ya kila siku elfu ~750"}, "~7K Rotuma + ~10K diaspora (Fiji, NZ)": {"ja": "ロツマ島約7,000＋在外約1万（フィジー、ニュージーランド）", "ko": "로투마 약 7,000 + 해외 동포 약 1만(피지, 뉴질랜드)", "zh": "罗图马约7000+海外侨民约1万（斐济、新西兰）", "yue": "羅圖馬約7,000+海外僑民約1萬（斐濟、紐西蘭）", "vi": "Rotuma ~7K + ~10K kiều dân (Fiji, NZ)", "th": "โรตูมา ~7K + ชุมชนพลัดถิ่น ~10K (ฟีจี นิวซีแลนด์)", "id": "~7 rb Rotuma + ~10 rb diaspora (Fiji, Selandia Baru)", "hi": "~7K रोटुमा + ~10K प्रवासी (फ़िजी, न्यूज़ीलैंड)", "de": "~7.000 Rotuma + ~10.000 Diaspora (Fidschi, Neuseeland)", "fr": "~7 000 Rotuma + ~10 000 en diaspora (Fidji, N.-Z.)", "it": "~7.000 Rotuma + ~10.000 in diaspora (Figi, Nuova Zelanda)", "es": "~7000 Rotuma + ~10 000 en la diáspora (Fiyi, Nueva Zelanda)", "pt": "~7 mil em Rotuma + ~10 mil na diáspora (Fiji, NZ)", "ru": "~7 тыс. на Ротуме + ~10 тыс. в диаспоре (Фиджи, Новая Зеландия)", "uk": "~7 тис. на Ротумі + ~10 тис. у діаспорі (Фіджі, Нова Зеландія)", "ar": "~7 آلاف في روتوما + ~10 آلاف في الشتات (فيجي، نيوزيلندا)", "he": "~7,000 ברוטומה + ~10 אלף בתפוצות (פיג׳י, ניו זילנד)", "sw": "Rotuma elfu ~7 + elfu ~10 ughaibuni (Fiji, NZ)"}, "~7c. BCE - 4c. CE": {"ja": "紀元前7世紀頃〜紀元4世紀", "ko": "기원전 약 7세기~기원후 4세기", "zh": "约公元前7世纪—公元4世纪", "yue": "約公元前7世紀至公元4世紀", "vi": "khoảng thế kỷ 7 TCN – thế kỷ 4 CN", "th": "ราวศตวรรษที่ 7 ก่อน ค.ศ. – ศตวรรษที่ 4", "id": "~abad ke-7 SM - abad ke-4 M", "hi": "~7वीं शताब्दी ई.पू. - चौथी शताब्दी ई.", "de": "~7. Jh. v. Chr. - 4. Jh. n. Chr.", "fr": "~VIIe s. av. J.-C. - IVe s. apr. J.-C.", "it": "~VII sec. a.C. - IV sec. d.C.", "es": "~s. VII a. C. - s. IV d. C.", "pt": "~séc. 7 a.C. - séc. 4 d.C.", "ru": "~7 в. до н. э. - 4 в. н. э.", "uk": "~7 ст. до н. е. - 4 ст. н. е.", "ar": "~القرن 7 ق.م - القرن 4 م", "he": "~המאה ה-7 לפנה״ס - המאה ה-4 לספירה", "sw": "~karne ya 7 KK - karne ya 4 BK"}, "~7th-15th c. CE": {"ja": "約7〜15世紀", "ko": "약 7~15세기", "zh": "约公元7—15世纪", "yue": "約公元7至15世紀", "vi": "khoảng thế kỷ 7–15 CN", "th": "ราวศตวรรษที่ 7–15", "id": "~abad ke-7–15 M", "hi": "~7वीं-15वीं शताब्दी ई.", "de": "~7.–15. Jh. n. Chr.", "fr": "~VIIe-XVe s. apr. J.-C.", "it": "~VII-XV sec. d.C.", "es": "~ss. VII-XV d. C.", "pt": "~séc. 7-15 d.C.", "ru": "~7-15 вв. н. э.", "uk": "~7-15 ст. н. е.", "ar": "~القرون 7-15 م", "he": "~המאות ה-7-15 לספירה", "sw": "~karne ya 7-15 BK"}, "~8-15c. CE; Nobiin/Mahas-Fadicca are descendants": {"ja": "約8〜15世紀；ノビーン語／マハス・ファディッチャ語が子孫", "ko": "약 8~15세기; 노비인어/마하스-파디차어가 후손", "zh": "约公元8—15世纪；诺比因语／马哈斯-法迪查语为其后裔", "yue": "約公元8至15世紀；諾比因語／馬哈斯-法迪查語為其後裔", "vi": "khoảng thế kỷ 8–15 CN; tiếng Nobiin/Mahas-Fadicca là hậu duệ", "th": "ราวศตวรรษที่ 8–15; ภาษาโนบีอิน/มาฮัส-ฟาดิกกาเป็นภาษาลูกหลาน", "id": "~abad ke-8–15 M; Nobiin/Mahas-Fadicca adalah keturunannya", "hi": "~8वीं-15वीं शताब्दी ई.; नोबीन/महास-फ़दिच्चा इसकी वंशज हैं", "de": "~8.–15. Jh. n. Chr.; Nobiin/Mahas-Fadicca sind Nachfahren", "fr": "~VIIIe-XVe s. apr. J.-C. ; le nobiin/mahas-fadicca en descendent", "it": "~VIII-XV sec. d.C.; nobiin/mahas-fadicca ne sono i discendenti", "es": "~ss. VIII-XV d. C.; el nobiin/mahas-fadicca son sus descendientes", "pt": "~séc. 8-15 d.C.; nobiin/mahas-fadicca são descendentes", "ru": "~8-15 вв. н. э.; нобийн/махас-фадикка — его потомки", "uk": "~8-15 ст. н. е.; нобійн/махас-фадикка — її нащадки", "ar": "~القرون 8-15 م؛ النوبيين/المحس-الفاديجا منحدرة منها", "he": "~המאות ה-8-15 לספירה; נוביין/מחס-פדיג׳ה הן צאצאיותיה", "sw": "~karne ya 8-15 BK; Kinobiin/Kimahas-Fadicca ni vizazi vyake"}, "~800 BCE-5th c. CE": {"ja": "紀元前約800年〜紀元5世紀", "ko": "기원전 약 800년~기원후 5세기", "zh": "约公元前800年—公元5世纪", "yue": "約公元前800年至公元5世紀", "vi": "khoảng 800 TCN – thế kỷ 5 CN", "th": "ราว 800 ปีก่อน ค.ศ. – ศตวรรษที่ 5", "id": "~800 SM-abad ke-5 M", "hi": "~800 ई.पू.-5वीं शताब्दी ई.", "de": "~800 v. Chr.-5. Jh. n. Chr.", "fr": "~800 av. J.-C.-Ve s. apr. J.-C.", "it": "~800 a.C.-V sec. d.C.", "es": "~800 a. C.-s. V d. C.", "pt": "~800 a.C.-séc. 5 d.C.", "ru": "~800 до н. э. - 5 в. н. э.", "uk": "~800 до н. е. - 5 ст. н. е.", "ar": "~800 ق.م-القرن 5 م", "he": "~800 לפנה״ס-המאה ה-5 לספירה", "sw": "~800 KK-karne ya 5 BK"}, "~800-1340 CE": {"ja": "約800〜1340年", "ko": "약 800~1340년", "zh": "约公元800—1340年", "yue": "約公元800至1340年", "vi": "khoảng 800–1340 CN", "th": "ราว ค.ศ. 800–1340", "id": "~800-1340 M", "hi": "~800-1340 ई.", "de": "~800-1340 n. Chr.", "fr": "~800-1340 apr. J.-C.", "it": "~800-1340 d.C.", "es": "~800-1340 d. C.", "pt": "~800-1340 d.C.", "ru": "~800-1340 н. э.", "uk": "~800-1340 н. е.", "ar": "~800-1340 م", "he": "~800-1340 לספירה", "sw": "~800-1340 BK"}, "~900-1200 CE": {"ja": "約900〜1200年", "ko": "약 900~1200년", "zh": "约公元900—1200年", "yue": "約公元900至1200年", "vi": "khoảng 900–1200 CN", "th": "ราว ค.ศ. 900–1200", "id": "~900-1200 M", "hi": "~900-1200 ई.", "de": "~900-1200 n. Chr.", "fr": "~900-1200 apr. J.-C.", "it": "~900-1200 d.C.", "es": "~900-1200 d. C.", "pt": "~900-1200 d.C.", "ru": "~900-1200 н. э.", "uk": "~900-1200 н. е.", "ar": "~900-1200 م", "he": "~900-1200 לספירה", "sw": "~900-1200 BK"}, "~918-1392 CE — Goryeo dynasty": {"ja": "約918〜1392年 — 高麗王朝", "ko": "약 918~1392년 — 고려 왕조", "zh": "约公元918—1392年 — 高丽王朝", "yue": "約公元918至1392年 — 高麗王朝", "vi": "khoảng 918–1392 CN — triều Cao Ly", "th": "ราว ค.ศ. 918–1392 — ราชวงศ์โครยอ", "id": "~918-1392 M — dinasti Goryeo", "hi": "~918-1392 ई. — गोरयो राजवंश", "de": "~918-1392 n. Chr. — Goryeo-Dynastie", "fr": "~918-1392 apr. J.-C. — dynastie Goryeo", "it": "~918-1392 d.C. — dinastia Goryeo", "es": "~918-1392 d. C. — dinastía Goryeo", "pt": "~918-1392 d.C. — dinastia Goryeo", "ru": "~918-1392 н. э. — династия Корё", "uk": "~918-1392 н. е. — династія Корьо", "ar": "~918-1392 م — سلالة غوريو", "he": "~918-1392 לספירה — שושלת גוריאו", "sw": "~918-1392 BK — nasaba ya Goryeo"}, "~9th-13th c. CE": {"ja": "約9〜13世紀", "ko": "약 9~13세기", "zh": "约公元9—13世纪", "yue": "約公元9至13世紀", "vi": "khoảng thế kỷ 9–13 CN", "th": "ราวศตวรรษที่ 9–13", "id": "~abad ke-9–13 M", "hi": "~9वीं-13वीं शताब्दी ई.", "de": "~9.–13. Jh. n. Chr.", "fr": "~IXe-XIIIe s. apr. J.-C.", "it": "~IX-XIII sec. d.C.", "es": "~ss. IX-XIII d. C.", "pt": "~séc. 9-13 d.C.", "ru": "~9-13 вв. н. э.", "uk": "~9-13 ст. н. е.", "ar": "~القرون 9-13 م", "he": "~המאות ה-9-13 לספירה", "sw": "~karne ya 9-13 BK"}, "~early 20c.; pre-Columbian language": {"ja": "20世紀初頭頃；コロンブス以前からの言語", "ko": "20세기 초경; 콜럼버스 이전부터의 언어", "zh": "约20世纪初；前哥伦布时期语言", "yue": "約20世紀初；前哥倫布時期語言", "vi": "khoảng đầu thế kỷ 20; ngôn ngữ tiền Colombo", "th": "ราวต้นศตวรรษที่ 20; ภาษายุคก่อนโคลัมบัส", "id": "~awal abad ke-20; bahasa pra-Kolumbus", "hi": "~20वीं शताब्दी का आरंभ; पूर्व-कोलंबियाई भाषा", "de": "~Anfang 20. Jh.; präkolumbische Sprache", "fr": "~début du XXe s. ; langue précolombienne", "it": "~inizio XX sec.; lingua precolombiana", "es": "~principios del s. XX; lengua precolombina", "pt": "~início do séc. 20; língua pré-colombiana", "ru": "~начало 20 в.; доколумбов язык", "uk": "~початок 20 ст.; доколумбова мова", "ar": "~مطلع القرن 20؛ لغة ما قبل كولومبوس", "he": "~תחילת המאה ה-20; שפה פרה-קולומביאנית", "sw": "~mwanzoni mwa karne ya 20; lugha ya kabla ya Columbus"}, "~late 18c.; revival efforts ongoing": {"ja": "18世紀後半頃；復興の取り組みが進行中", "ko": "18세기 후반경; 부활 노력 진행 중", "zh": "约18世纪末；复兴工作进行中", "yue": "約18世紀末；復興工作進行中", "vi": "khoảng cuối thế kỷ 18; đang nỗ lực hồi sinh", "th": "ราวปลายศตวรรษที่ 18; กำลังมีความพยายามฟื้นฟู", "id": "~akhir abad ke-18; upaya revitalisasi berlangsung", "hi": "~18वीं शताब्दी का उत्तरार्ध; पुनरुद्धार प्रयास जारी", "de": "~Ende 18. Jh.; Wiederbelebungsversuche im Gange", "fr": "~fin du XVIIIe s. ; efforts de revitalisation en cours", "it": "~fine XVIII sec.; sforzi di rivitalizzazione in corso", "es": "~finales del s. XVIII; esfuerzos de revitalización en curso", "pt": "~fim do séc. 18; esforços de revitalização em curso", "ru": "~конец 18 в.; ведутся попытки возрождения", "uk": "~кінець 18 ст.; тривають спроби відродження", "ar": "~أواخر القرن 18؛ جهود الإحياء جارية", "he": "~סוף המאה ה-18; מאמצי החייאה נמשכים", "sw": "~mwishoni mwa karne ya 18; juhudi za ufufuaji zinaendelea"}};
  for (const [src, tr] of Object.entries(F)) for (const [lang, v] of Object.entries(tr)) {
    if (!META_I18N[lang]) META_I18N[lang] = {};
    if (!(src in META_I18N[lang])) META_I18N[lang][src] = v;
  }
})();
