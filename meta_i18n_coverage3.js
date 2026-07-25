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
