/**
 * Thousand — the number that travelled.
 * 
 * PARTIAL WORD (🧪). Few people needed a thousand until there was trade, tax or an
 * army, so the word often arrived with them, and the map shows the routes. Germanic,
 * Baltic and Slavic share thousand, Tausend, тысяча, tūkstantis, perhaps a 'fat hundred',
 * and Finnish tuhat borrowed it. Latin mille gave mille, mil, mie. Persian هزار went
 * to Hindi, Hungarian ezer and across Central Asia. Arabic ألف went to Swahili elfu.
 * Chinese 千 went to Japanese, Korean and Vietnamese. Sanskrit सहस्र is behind Tamil
 * ஆயிரம் and Kannada ಸಾವಿರ. Greek χίλια reached Serbian хиљада. Georgian ათასი and
 * Sinhala දහස simply say ten hundreds. Routes:
 *   strong   the Germanic and Slavic thousand
 *   mille    Latin mille
 *   hazar    Persian hazār
 *   alf      Arabic alf
 *   qian     Chinese 千
 *   sahasra  Sanskrit sahasra
 *   chilia   Greek chilia
 *   tenhund  ten hundreds
 *   other    anything else
 *   plain    a word of its own
 */
WORDS.thousand = {
  partial: true,
  emoji: "🔢",
  label: {
    en: "Thousand",
    ja: "千",
    ko: "천",
    zh: "千",
    yue: "千",
    vi: "Nghìn",
    th: "พัน",
    id: "Ribu",
    hi: "हज़ार",
    de: "Tausend",
    fr: "Mille",
    it: "Mille",
    es: "Mil",
    es_eu: "Mil",
    es_mx: "Mil",
    pt: "Mil",
    pt_eu: "Mil",
    pt_br: "Mil",
    ru: "Тысяча",
    uk: "Тисяча",
    ar: "ألف",
    he: "אלף",
    sw: "Elfu",
  },
  definition: {
    en: "Thousand — ten hundreds. Few people needed the number until there was trade or an army to count, so the word often arrived from elsewhere, and its routes run across the map.",
    ja: "千 — 百が十。交易や軍隊を数えるまで、この数を必要とする人は少なかった。そのため語はしばしばよそから届き、その道筋が地図に残っている。",
    ko: "천 — 백이 열. 교역이나 군대를 셀 일이 생기기 전에는 이 수가 필요한 사람이 적었다. 그래서 이 말은 흔히 다른 곳에서 건너왔고, 그 길이 지도에 남아 있다.",
    zh: "千——十个百。在有贸易或军队要数之前，很少有人需要这个数，所以这个词常常从别处传来，它的路线就留在地图上。",
    yue: "千——十個百。喺有貿易或者軍隊要數之前，好少人需要呢個數，所以呢個詞成日由第二度傳過嚟，佢嘅路線就留喺地圖上。",
    vi: "Nghìn — mười trăm. Trước khi có buôn bán hay quân đội cần đếm, ít ai cần con số này, nên từ này thường đến từ nơi khác, và đường đi của nó nằm trên bản đồ.",
    th: "พัน — สิบร้อย ก่อนจะมีการค้าหรือกองทัพให้นับ แทบไม่มีใครต้องใช้จำนวนนี้ คำนี้จึงมักมาจากที่อื่น และเส้นทางของมันปรากฏบนแผนที่",
    id: "Ribu — sepuluh ratus. Sebelum ada dagang atau tentara yang harus dihitung, sedikit orang memerlukan angka ini, jadi katanya sering datang dari tempat lain, dan jalurnya tampak di peta.",
    hi: "हज़ार — दस सैकड़े। व्यापार या सेना गिनने की ज़रूरत से पहले कम ही लोगों को यह संख्या चाहिए थी, इसलिए यह शब्द अक्सर कहीं और से आया, और उसके रास्ते नक्शे पर दिखते हैं।",
    de: "Tausend — zehn Hunderter. Bevor es Handel oder Heere zu zählen gab, brauchten wenige diese Zahl, darum kam das Wort oft von anderswo, und seine Wege ziehen sich über die Karte.",
    fr: "Mille — dix centaines. Avant le commerce ou les armées à compter, peu de gens avaient besoin de ce nombre, alors le mot est souvent venu d'ailleurs, et ses routes traversent la carte.",
    it: "Mille — dieci centinaia. Prima dei commerci o degli eserciti da contare pochi avevano bisogno di questo numero, così la parola è spesso arrivata da fuori, e le sue vie attraversano la mappa.",
    es: "Mil — diez centenas. Antes del comercio o de los ejércitos que contar, poca gente necesitaba este número, así que la palabra llegó a menudo de fuera, y sus rutas cruzan el mapa.",
    es_eu: "Mil — diez centenas. Antes del comercio o de los ejércitos que contar, poca gente necesitaba este número, así que la palabra llegó a menudo de fuera, y sus rutas cruzan el mapa.",
    es_mx: "Mil — diez centenas. Antes del comercio o de los ejércitos que contar, poca gente necesitaba este número, así que la palabra llegó a menudo de fuera, y sus rutas cruzan el mapa.",
    pt: "Mil — dez centenas. Antes do comércio ou dos exércitos para contar, pouca gente precisava deste número, por isso a palavra veio muitas vezes de fora, e as suas rotas cruzam o mapa.",
    pt_eu: "Mil — dez centenas. Antes do comércio ou dos exércitos para contar, pouca gente precisava deste número, por isso a palavra veio muitas vezes de fora, e as suas rotas cruzam o mapa.",
    pt_br: "Mil — dez centenas. Antes do comércio ou dos exércitos para contar, pouca gente precisava deste número, por isso a palavra veio muitas vezes de fora, e as suas rotas cruzam o mapa.",
    ru: "Тысяча — десять сотен. Пока не было торговли или войска, которые надо считать, это число мало кому требовалось, поэтому слово часто приходило извне, и его пути видны на карте.",
    uk: "Тисяча — десять сотень. Доки не було торгівлі чи війська, які треба лічити, це число мало кому було потрібне, тож слово часто приходило ззовні, і його шляхи видно на мапі.",
    ar: "ألف — عشر مئات. قبل التجارة والجيوش التي تُعدّ لم يكن كثيرون بحاجة إلى هذا العدد، ولذلك جاءت الكلمة غالبًا من مكان آخر، وطرقها مرسومة على الخريطة.",
    he: "אלף — עשר מאות. לפני שהיו מסחר או צבאות לספור, מעטים נזקקו למספר הזה, ולכן המילה הגיעה לעתים קרובות ממקום אחר, ודרכיה נפרשות על המפה.",
    sw: "Elfu — mia kumi. Kabla ya biashara au majeshi ya kuhesabu, watu wachache walihitaji namba hii, kwa hiyo neno mara nyingi lilitoka kwingine, na njia zake zinaonekana kwenye ramani.",
  },
  family: {
    ab: "plain",
    aa: "alf",
    af: "strong",
    sq: "mille",
    am: "plain",
    ar: "alf",
    an: "mille",
    hy: "hazar",
    ast: "mille",
    av: "hazar",
    az: "plain",
    ba: "plain",
    eu: "mille",
    be: "strong",
    bn: "hazar",
    bho: "hazar",
    br: "mille",
    bg: "chilia",
    my: "plain",
    bxr: "plain",
    ca: "mille",
    ceb: "plain",
    ce: "hazar",
    ny: "plain",
    cv: "plain",
    crh: "plain",
    cs: "strong",
    da: "strong",
    dar: "plain",
    nl: "strong",
    krl: "strong",
    fi: "strong",
    fkv: "strong",
    olo: "strong",
    vep: "strong",
    et: "strong",
    liv: "plain",
    sma: "plain",
    smj: "plain",
    se: "strong",
    smn: "strong",
    sms: "plain",
    sjd: "plain",
    mrj: "plain",
    mhr: "plain",
    mdf: "strong",
    myv: "strong",
    udm: "other",
    kpv: "strong",
    koi: "strong",
    hu: "hazar",
    kca: "other",
    mns: "other",
    hi: "hazar",
    ur: "hazar",
    ps: "hazar",
    fa: "hazar",
    ku: "hazar",
    os: "plain",
    hyw: "hazar",
    el: "chilia",
    aln: "mille",
    sr: "chilia",
    bs: "chilia",
    hr: "strong",
    sl: "strong",
    sk: "strong",
    pl: "strong",
    uk: "strong",
    ru: "strong",
    lt: "strong",
    lv: "strong",
    is: "strong",
    fo: "strong",
    no: "strong",
    nn: "strong",
    sv: "strong",
    de: "strong",
    en: "strong",
    ga: "mille",
    cy: "mille",
    la: "mille",
    fr: "mille",
    es: "mille",
    pt: "mille",
    it: "mille",
    ro: "mille",
    tr: "plain",
    uz: "plain",
    kk: "plain",
    tt: "plain",
    sah: "strong",
    mn: "plain",
    evn: "strong",
    gld: "plain",
    ko: "qian",
    ja: "qian",
    kn: "sahasra",
    ml: "sahasra",
    ta: "sahasra",
    te: "plain",
    ka: "tenhund",
    ady: "plain",
    lez: "hazar",
    he: "alf",
    zh: "qian",
    yi: "strong",
    ha: "plain",
    haw: "strong",
    sw: "alf",
    th: "plain",
    vi: "qian",
    id: "plain",
    mg: "plain",
    ban: "plain",
    jv: "plain",
    iba: "plain",
    pam: "plain",
    mad: "plain",
    mrw: "plain",
    sm: "plain",
    tet: "plain",
    min: "plain",
    sas: "plain",
    tl: "plain",
    su: "plain",
    dtp: "plain",
    km: "plain",
    lo: "plain",
    ne: "hazar",
    ms: "plain",
    mr: "hazar",
    gu: "hazar",
    si: "tenhund",
    zu: "plain",
    ti: "plain",
    so: "plain",
    om: "plain",
    mk: "chilia",
    ug: "plain",
    ky: "plain",
    tg: "hazar",
    tk: "plain",
    mt: "alf",
    gd: "mille",
    lb: "strong",
    gl: "mille",
    scn: "mille",
    bo: "plain",
    st: "plain",
    ak: "plain",
    ee: "plain",
    wo: "plain",
    ht: "mille",
    tpi: "strong",
    eo: "mille",
    qu: "plain",
    as: "hazar",
    or: "hazar",
    ks: "sahasra",
    zh_tw: "qian",
    zh_sc: "qian",
    zh_cd: "qian",
    zh_xa: "qian",
    zh_nj: "qian",
    yue: "qian",
    yue_dg: "qian",
    yue_ts: "qian",
    gan: "qian",
    hak_tw: "qian",
    hak_hl: "qian",
    hak_cn: "qian",
    cjy: "qian",
    mnp: "qian",
    cdo: "qian",
    nan: "qian",
    nan_xm: "qian",
    nan_qz: "qian",
    nan_zz: "qian",
    nan_te: "qian",
    wuu: "qian",
    wuu_nb: "qian",
    wuu_sz: "qian",
    wuu_jx: "qian",
    wuu_hz: "qian",
    wuu_wz: "qian",
    hsn: "qian",
    es_cr: "mille",
    es_hn: "mille",
    es_ni: "mille",
    es_sv: "mille",
    fr_lu: "mille",
    fr_cm: "mille",
    de_lu: "strong",
    es_bo: "mille",
    es_py: "mille",
    es_pa: "mille",
    en_wls: "strong",
    fr_sn: "mille",
    fr_ci: "mille",
    fr_ht: "mille",
    pt_mz: "mille",
    en_za: "strong",
    pt_ao: "mille",
    ca_va: "mille",
    ja_osa: "qian",
    ja_aom: "qian",
    ja_hak: "qian",
    ja_kyo: "qian",
    ja_hir: "qian",
    ko_kp: "qian",
    ko_bus: "qian",
    ko_yb: "qian",
    es_mx: "mille",
    pt_br: "mille",
    prs: "hazar",
    en_south: "strong",
    en_ie: "strong",
    en_yk: "strong",
    en_scouse: "strong",
    en_brum: "strong",
    en_manc: "strong",
    en_wc: "strong",
    en_est: "strong",
    fr_qc: "mille",
    fr_af: "mille",
    fr_be: "mille",
    fr_ch: "mille",
    es_co: "mille",
    es_cl: "mille",
    es_ar: "mille",
    es_cu: "mille",
    es_pe: "mille",
    es_an: "mille",
    ko_hg: "qian",
    ko_jl: "qian",
    dtp_kzj: "plain",
    es_pr: "mille",
    es_do: "mille",
    es_gt: "mille",
    es_ec: "mille",
    es_uy: "mille",
    es_ve: "mille",
    alt: "plain",
    ota: "plain",
    sa: "sahasra",
    mnc: "plain",
    aii: "alf",
    khb: "plain",
    vo: "plain",
    got: "strong",
    dng: "qian",
    oj: "tenhund",
    sco: "strong",
    inh: "plain",
    hil: "plain",
    tsg: "plain",
    tly: "hazar",
    ilo: "plain",
    udi: "hazar",
    lus: "plain",
    sd: "hazar",
    aqc: "plain",
    mfe: "mille",
    iso: "plain",
    chr: "plain",
    ang: "strong",
    nci: "other",
    rgn: "mille",
    oc: "mille",
    lmo: "mille",
    enm: "strong",
    rhg: "hazar",
    sat: "hazar",
    rcf: "mille",
    bjn: "plain",
    ln: "plain",
    ivv: "plain",
    rup: "mille",
    xal: "plain",
    io: "mille",
    nv: "mille",
    ckb: "hazar",
    zza: "hazar",
    vec: "mille",
    mi: "plain",
    fur: "mille",
    yai: "hazar",
    pa: "hazar",
    tab: "hazar",
    pap: "mille",
    kum: "plain",
    mdr: "plain",
    xsr: "hazar",
    kea: "mille",
    cab: "mille",
    war: "plain",
    to: "plain",
    otk: "plain",
    txb: "plain",
    arc: "alf",
    arn: "plain",
    bpy: "hazar",
    cop: "plain",
    hne: "sahasra",
    ki: "plain",
    mh: "strong",
    ojp: "plain",
    osp: "mille",
    osx: "strong",
    sga: "mille",
    srn: "strong",
    tru: "alf",
    za: "qian",
    syc: "alf",
    pdc: "strong",
    nrf: "mille",
    sn: "plain",
    cbk: "mille",
    slr: "plain",
    rmf: "plain",
    kfr: "hazar",
    bal: "hazar",
    uga: "alf",
    co: "mille",
    ybe: "plain",
    ts: "plain",
    tyz: "qian",
    cu: "strong",
    fro: "mille",
    non: "strong",
    goh: "strong",
    lad: "mille",
    pi: "sahasra",
    hif: "hazar",
    ium: "qian",
    nso: "plain",
    orh: "plain",
    rw: "plain",
    kw: "mille",
    haj: "hazar",
    ve: "plain",
    ude: "plain",
    ii: "plain",
    bft: "plain",
    wal: "plain",
    vot: "strong",
    ket: "tenhund",
    egl: "mille",
    mag: "hazar",
    szl: "strong",
    yo: "other",
    dv: "sahasra",
    nog: "plain",
    rif: "alf",
    xkz: "plain",
    blk: "plain",
    ain: "plain",
    jam: "strong",
    abq: "plain",
    ttj: "other",
    lic: "plain",
    csb: "strong",
    frr_amr: "strong",
    lzz: "chilia",
    pqm: "plain",
    xng: "plain",
    bbl: "tenhund",
    akk: "plain",
    acn: "qian",
    glk: "hazar",
    frr: "strong",
    sc: "mille",
    ksw: "plain",
    mnw: "plain",
  },
  routes: {
    strong: {"color":"#2563eb","emoji":"🔢","en":"the Germanic and Slavic thousand","ja":"ゲルマン語とスラヴ語の「千」","ko":"게르만어와 슬라브어의 ‘천’","zh":"日耳曼语和斯拉夫语的“千”","yue":"日耳曼語同斯拉夫語嘅「千」","vi":"“nghìn” của các tiếng German và Slav","th":"คำว่า “พัน” ของภาษาเจอร์แมนิกและสลาฟ","id":"kata “ribu” rumpun Jermanik dan Slavia","hi":"जर्मनिक और स्लाव भाषाओं का ‘हज़ार’","de":"das germanische und slawische Tausend","fr":"le « mille » germanique et slave","it":"il “mille” germanico e slavo","es":"el «mil» germánico y eslavo","pt":"o «mil» germânico e eslavo","ru":"«тысяча» германских и славянских языков","uk":"«тисяча» германських і слов’янських мов","ar":"«الألف» في الجرمانية والسلافية","he":"„אלף” הגרמאני והסלאבי","sw":"“elfu” ya lugha za Kijerumani na Kislavu"},
    mille: {"color":"#7c3aed","emoji":"🏛️","en":"Latin mille","ja":"ラテン語 mille","ko":"라틴어 mille","zh":"拉丁语 mille","yue":"拉丁語 mille","vi":"tiếng Latinh mille","th":"ละติน mille","id":"Latin mille","hi":"लैटिन mille","de":"lateinisch mille","fr":"le latin mille","it":"il latino mille","es":"el latín mille","pt":"o latim mille","ru":"латинское mille","uk":"латинське mille","ar":"اللاتينية mille","he":"הלטינית mille","sw":"Kilatini mille"},
    hazar: {"color":"#d97706","emoji":"🐫","en":"Persian hazār","ja":"ペルシャ語 hazār","ko":"페르시아어 hazār","zh":"波斯语 hazār","yue":"波斯語 hazār","vi":"tiếng Ba Tư hazār","th":"เปอร์เซีย hazār","id":"Persia hazār","hi":"फ़ारसी हज़ार","de":"persisch hazār","fr":"le persan hazār","it":"il persiano hazār","es":"el persa hazār","pt":"o persa hazār","ru":"персидское hazār","uk":"перське hazār","ar":"الفارسية هزار","he":"הפרסית hazār","sw":"Kiajemi hazār"},
    alf: {"color":"#059669","emoji":"🕌","en":"Arabic alf","ja":"アラビア語 alf","ko":"아랍어 alf","zh":"阿拉伯语 alf","yue":"阿拉伯語 alf","vi":"tiếng Ả Rập alf","th":"อาหรับ alf","id":"Arab alf","hi":"अरबी alf","de":"arabisch alf","fr":"l'arabe alf","it":"l’arabo alf","es":"el árabe alf","pt":"o árabe alf","ru":"арабское alf","uk":"арабське alf","ar":"العربية ألف","he":"הערבית alf","sw":"Kiarabu alf"},
    qian: {"color":"#dc2626","emoji":"🀄","en":"Chinese 千","ja":"中国語の千","ko":"중국어 千","zh":"汉语的“千”","yue":"漢語嘅「千」","vi":"tiếng Hán 千","th":"จีน 千","id":"Tionghoa 千","hi":"चीनी 千","de":"chinesisch 千","fr":"le chinois 千","it":"il cinese 千","es":"el chino 千","pt":"o chinês 千","ru":"китайское 千","uk":"китайське 千","ar":"الصينية 千","he":"הסינית 千","sw":"Kichina 千"},
    sahasra: {"color":"#db2777","emoji":"🪷","en":"Sanskrit sahasra","ja":"サンスクリット sahasra","ko":"산스크리트어 sahasra","zh":"梵语 sahasra","yue":"梵語 sahasra","vi":"tiếng Phạn sahasra","th":"สันสกฤต sahasra","id":"Sanskerta sahasra","hi":"संस्कृत सहस्र","de":"Sanskrit sahasra","fr":"le sanskrit sahasra","it":"il sanscrito sahasra","es":"el sánscrito sahasra","pt":"o sânscrito sahasra","ru":"санскритское sahasra","uk":"санскритське sahasra","ar":"السنسكريتية sahasra","he":"הסנסקריט sahasra","sw":"Kisanskriti sahasra"},
    chilia: {"color":"#0891b2","emoji":"🏺","en":"Greek chilia","ja":"ギリシア語 chilia","ko":"그리스어 chilia","zh":"希腊语 chilia","yue":"希臘語 chilia","vi":"tiếng Hy Lạp chilia","th":"กรีก chilia","id":"Yunani chilia","hi":"यूनानी chilia","de":"griechisch chilia","fr":"le grec chilia","it":"il greco chilia","es":"el griego chilia","pt":"o grego chilia","ru":"греческое chilia","uk":"грецьке chilia","ar":"اليونانية chilia","he":"היוונית chilia","sw":"Kigiriki chilia"},
    tenhund: {"color":"#16a34a","emoji":"🔟","en":"ten hundreds","ja":"百が十","ko":"백이 열","zh":"十个百","yue":"十個百","vi":"mười trăm","th":"สิบร้อย","id":"sepuluh ratus","hi":"दस सैकड़े","de":"zehn Hunderter","fr":"dix centaines","it":"dieci centinaia","es":"diez centenas","pt":"dez centenas","ru":"десять сотен","uk":"десять сотень","ar":"عشر مئات","he":"עשר מאות","sw":"mia kumi"},
    other: {"color":"#6b7280","emoji":"✨","en":"another name","ja":"ほかの名","ko":"다른 이름","zh":"其他名称","yue":"其他名","vi":"tên khác","th":"ชื่ออื่น","id":"nama lain","hi":"कोई और नाम","de":"ein anderer Name","fr":"un autre nom","it":"un altro nome","es":"otro nombre","pt":"outro nome","ru":"другое название","uk":"інша назва","ar":"اسم آخر","he":"שם אחר","sw":"jina jingine"},
    plain: {"color":"#94a3b8","emoji":"📅","en":"a word of its own","ja":"固有の語","ko":"고유어","zh":"自有的词","yue":"自有嘅詞","vi":"từ riêng","th":"คำเฉพาะของภาษา","id":"kata tersendiri","hi":"अपना अलग शब्द","de":"ein eigenes Wort","fr":"un mot propre","it":"una parola propria","es":"una palabra propia","pt":"uma palavra própria","ru":"собственное слово","uk":"власне слово","ar":"كلمة خاصة","he":"מילה משלה","sw":"neno lake lenyewe"},
    unknown: {"color":"#b45309","emoji":"❓","en":"not yet determined · needs a source","ja":"未判定 · 出典待ち","ko":"미판정 · 출처 필요","zh":"尚未判定 · 待查证","yue":"重未判定 · 等考證","vi":"chưa xác định · cần nguồn","th":"ยังไม่ระบุ · รอแหล่งอ้างอิง","id":"belum ditentukan · perlu sumber","hi":"अनिर्धारित · स्रोत चाहिए","de":"noch offen · Beleg fehlt","fr":"non déterminé · source manquante","it":"non determinato · manca la fonte","es":"sin determinar · falta la fuente","pt":"por determinar · falta a fonte","ru":"не определено · нужен источник","uk":"не визначено · потрібне джерело","ar":"لم يُحدَّد بعد · بحاجة إلى مصدر","he":"טרם נקבע · דרוש מקור","sw":"haijabainishwa · chanzo kinahitajika"},
  },
  data: {
    ab: ["зықы", "zəkə"],
    aa: ["alfi", "alfi"],
    af: ["duisend", "ˈdœi̯sənt"],
    sq: ["mijë", "ˈmijə"],
    am: ["ሺ", "ʃi"],
    ar: ["ألف", "ʔalf"],
    an: ["mil", "mil"],
    hy: ["հազար", "hɑˈzɑɾ"],
    ast: ["mil", "mil"],
    av: ["азарго", "azarɡo"],
    az: ["min", "min"],
    ba: ["мең", "mi̞ŋ"],
    eu: ["mila", "mila"],
    be: ["тысяча", "ˈtɨsʲatʂa"],
    bn: ["হাজার", "hadʒaɾ"],
    bho: ["हजार", "hajaːr"],
    br: ["mil", "ˈmiːl"],
    bg: ["хиляда", "xiˈlʲadɐ"],
    my: ["ထောင်", "tʰàʊɴ"],
    bxr: ["мянган", "mjaŋɡaŋ"],
    ca: ["mil", "mil"],
    ceb: ["libo", "ˈlibo"],
    ce: ["эзар", "ezər"],
    ny: ["chikwi", "ˈtʃikʷi"],
    cv: ["пин", "pin"],
    crh: ["miñ", "miŋ"],
    cs: ["tisíc", "ˈtɪsiːts"],
    da: ["tusind", "tuːsənə"],
    dar: ["азир", "azir"],  // No opened source supports the route.
    nl: ["duizend", "ˈdœy̯zənt"],
    krl: ["tuhat", "ˈtuhɑt"],
    fi: ["tuhat", "ˈtuhɑt"],  // From Baltic.
    fkv: ["tuhat", "ˈtuhɑt"],
    olo: ["tuhat", "ˈtuhat"],
    vep: ["tuha", "tuha"],
    et: ["tuhat", "ˈtuhɑt"],  // From Baltic.
    liv: ["tū’ontõ", "tuːˀontə"],  // No opened source supports the route.
    sma: ["tåvsene", "ˈtʰɔβsɛnɛ"],  // No opened source supports the route.
    smj: ["tuvsán", "ˈtʊvsan"],  // No opened source supports the route.
    se: ["duhát", "ˈtuhaːh"],
    smn: ["tuhháát", "ˈtuhːæːt"],  // Route by resemblance to the neighbouring forms (krl,fi,fkv); no etymology of its own.
    sms: ["dohat", "ˈdoxɒt"],  // No opened source supports the route.
    sjd: ["то̄а̄фант", "toːaːfant"],  // No opened source supports the route.
    mrj: ["тӹжем", "tɯʒem"],  // No opened source supports the route.
    mhr: ["тӱжем", "tyʒem"],  // No opened source supports the route.
    mdf: ["тёжянь", "ˈtʲoʒaɲ"],
    myv: ["тыща", "tɨʃtʃa"],  // Route by resemblance to the neighbouring forms (kpv,koi); no etymology of its own.
    udm: ["сюрс", "sʲurs"],  // From Indo-Iranian.
    kpv: ["тысяча", "ˈtɨɕatɕa"],  // From Russian.
    koi: ["тысяча", "tɨɕatɕa"],  // From Russian.
    hu: ["ezer", "ˈɛzɛr"],  // From Iranian.
    kca: ["сюрас", "ˈsʲuras"],  // From Indo-Iranian.
    mns: ["со̄ты̄р", "ˈsoːtɪːr"],  // From Indo-Iranian.
    hi: ["हज़ार", "həzaːɾ"],
    ur: ["ہزار", "həzaːɾ"],
    ps: ["زر", "zer"],  // A cognate of Persian hazār.
    fa: ["هزار", "hæˈzɒːɾ"],
    ku: ["hezar", "hɛzar"],
    os: ["мин", "min"],
    hyw: ["հազար", "hɑzɑɾ"],
    el: ["χίλιοι", "çilii"],
    aln: ["mijë", "mijə"],
    sr: ["хиљада", "xǐʎada"],
    bs: ["hiljada", "ˈxiʎada"],
    hr: ["tisuća", "tîsutɕa"],
    sl: ["tisoč", "ˈtiːsɔtʃ"],
    sk: ["tisíc", "ˈtisiːts"],
    pl: ["tysiąc", "ˈtɨɕɔnts"],
    uk: ["тисяча", "ˈtɪsʲatʃa"],
    ru: ["тысяча", "ˈtɨsʲɪtɕə"],
    lt: ["tūkstantis", "ˈtuːkstantʲɪs"],
    lv: ["tūkstoš", "ˈtuːkstuɔʃ"],
    is: ["þúsund", "ˈθuːsʏnt"],
    fo: ["túsund", "ˈtʰʉuːsɪn"],
    no: ["tusen", "ˈtʉːsən"],
    nn: ["tusen", "ˈtʉːsən"],
    sv: ["tusen", "ˈtʉːsɛn"],
    de: ["tausend", "ˈtaʊ̯zn̩t"],
    en: ["thousand", "ˈθaʊzənd"],
    ga: ["míle", "ˈmʲiːlʲə"],
    cy: ["mil", "mɪl"],
    la: ["mille", "ˈmiːlle"],
    fr: ["mille", "mil"],
    es: ["mil", "mil"],
    pt: ["mil", "miɫ"],
    it: ["mille", "ˈmille"],
    ro: ["mie", "mje"],
    tr: ["bin", "bin"],
    uz: ["ming", "miŋ"],
    kk: ["мың", "məŋ"],
    tt: ["мең", "meŋ"],
    sah: ["тыһыынча", "tɯhɯːnˈtʃa"],  // From Russian.
    mn: ["мянга", "mʲaŋk"],
    evn: ["тысяча", "tisjatʃa"],  // From Russian.
    gld: ["минган", "minɡan"],
    ko: ["천", "tɕʰʌn"],
    ja: ["千", "seɴ"],
    kn: ["ಸಾವಿರ", "saːʋiɾa"],
    ml: ["ആയിരം", "aːjiɾam"],
    ta: ["ஆயிரம்", "aːjiɾam"],
    te: ["వెయ్యి", "ʋejːi"],
    ka: ["ათასი", "atʰasi"],  // From ათი 'ten' and ასი 'hundred'.
    ady: ["мин", "məjn"],
    lez: ["агъзур", "aʁzur"],
    he: ["אלף", "ˈelef"],  // A cognate of Arabic alf.
    zh: ["千", "tɕʰjɛn˥"],
    yi: ["טויזנט", "ˈtɔɪ̯zn̩t"],
    ha: ["dubu", "dubu"],
    haw: ["kaukani", "kaukani"],  // From English.
    sw: ["elfu", "ˈelfu"],
    th: ["พัน", "pʰan˧"],
    vi: ["nghìn", "ŋin˨˩"],
    id: ["ribu", "ˈribu"],
    mg: ["arivo", "aˈrivu"],
    ban: ["siu", "siu"],
    jv: ["ewu", "sewu"],
    iba: ["seribu", "səribu"],
    pam: ["libu", "ˈlibu"],
    mad: ["saebu", "saebu"],
    mrw: ["nggibo", "ŋɡibo"],
    sm: ["afe", "afe"],
    tet: ["rihun", "rihun"],
    min: ["saribu", "saribu"],
    sas: ["siu", "siu"],
    tl: ["libo", "ˈlibo"],
    su: ["rebu", "sarebu"],
    dtp: ["soribu", "soribu"],
    km: ["ពាន់", "pŏən"],  // From Thai.
    lo: ["ພັນ", "pʰan˧˥"],
    ne: ["हजार", "ɦʌzar"],
    ms: ["ribu", "ribu"],
    mr: ["हजार", "ɦəzaɾ"],
    gu: ["હજાર", "ˈɦədʒaɾ"],
    si: ["දහස", "dahasa"],  // From Sanskrit daśaśata, 'ten hundred'.
    zu: ["inkulungwane", "inkuluŋɡwaːne"],
    ti: ["ሽሕ", "ʃɨħ"],
    so: ["kun", "kun"],
    om: ["kuma", "kuma"],
    mk: ["илјада", "ˈiʎada"],
    ug: ["مىڭ", "miŋ"],
    ky: ["миң", "miŋ"],
    tg: ["ҳазор", "hazor"],
    tk: ["müň", "myŋ"],
    mt: ["elf", "ɛlf"],  // A cognate of Arabic alf.
    gd: ["mìle", "ˈmiːlə"],
    lb: ["dausend", "ˈdau̯zənt"],
    gl: ["mil", "mil"],
    scn: ["milli", "ˈmilli"],
    bo: ["སྟོང", "toŋ˥˥"],
    st: ["sekete", "sekete"],
    ak: ["apem", "apem"],
    ee: ["akpe", "akpe"],
    wo: ["junni", "dʒunːi"],
    ht: ["mil", "mil"],
    tpi: ["tausen", "tausen"],  // From English.
    eo: ["mil", "mil"],
    qu: ["waranqa", "waˈɾanqa"],
    as: ["হাজাৰ", "ɦazaɹ"],
    or: ["ହଜାର", "hɔdʒaɾɔ"],
    ks: ["ساس", "saːs"],
    zh_tw: ["千", "tɕʰjɛn˥"],
    zh_sc: ["千", "tɕʰiɛn˥˥"],
    zh_cd: ["千", "tɕʰiɛn˥˥"],
    zh_xa: ["千", "tɕʰiã˨˩"],
    zh_nj: ["千", "tsʰiẽ˧˩"],
    yue: ["千", "tsʰiːn˥"],
    yue_dg: ["千", "tsʰin˨˩˧"],
    yue_ts: ["千", "tʰen˧˧"],
    gan: ["千", "tɕʰiɛn˦˨"],
    hak_tw: ["千", "tsʰien˨˦"],
    hak_hl: ["千", "tsʰien˥˧"],
    hak_cn: ["千", "tɕʰiɛn˦˦"],
    cjy: ["千", "tɕʰie˩˩"],
    mnp: ["千", "tsʰaiŋ˥˦"],
    cdo: ["千", "tsʰieŋ˥˥"],
    nan: ["千", "tsʰiɪŋ˦˦"],
    nan_xm: ["千", "tsʰiiŋ˦˦"],
    nan_qz: ["千", "tsʰuĩ˧˧"],
    nan_zz: ["千", "tsʰan˦˦"],
    nan_te: ["千", "tsʰõi˧˧"],
    wuu: ["千", "tɕʰi˥˧"],
    wuu_nb: ["千", "tɕʰi˥˨"],
    wuu_sz: ["千", "tsʰɪ˥˧"],
    wuu_jx: ["千", "tɕʰie˥˥"],
    wuu_hz: ["千", "tɕʰiẽ˧˧˦"],
    wuu_wz: ["千", "tɕʰi˧˧"],
    hsn: ["千", "tsʰiẽ˧˧"],
    es_cr: ["mil", "mil"],
    es_hn: ["mil", "mil"],
    es_ni: ["mil", "mil"],
    es_sv: ["mil", "mil"],
    fr_lu: ["mille", "mil"],
    fr_cm: ["mille", "mil"],
    de_lu: ["tausend", "ˈtaʊ̯zn̩t"],
    es_bo: ["mil", "mil"],
    es_py: ["mil", "mil"],
    es_pa: ["mil", "mil"],
    en_wls: ["thousand", "ˈθaʊzənd"],
    fr_sn: ["mille", "mil"],
    fr_ci: ["mille", "mil"],
    fr_ht: ["mille", "mil"],
    pt_mz: ["mil", "mil"],
    en_za: ["thousand", "ˈθɑʊzənd"],
    pt_ao: ["mil", "mil"],
    ca_va: ["mil", "mil"],
    ja_osa: ["千", "seɴ"],
    ja_aom: ["千", "seɴ"],
    ja_hak: ["千", "seɴ"],
    ja_kyo: ["千", "seɴ"],
    ja_hir: ["千", "seɴ"],
    ko_kp: ["천", "tɕʰʌn"],
    ko_bus: ["천", "tɕʰʌn"],
    ko_yb: ["천", "tɕʰʌn"],
    es_mx: ["mil", "mil"],
    pt_br: ["mil", "miw"],
    prs: ["هزار", "haˈzɑːr"],
    en_south: ["thousand", "ˈθaʊzənd"],
    en_ie: ["thousand", "ˈθaʊzənd"],
    en_yk: ["thousand", "ˈθaʊzənd"],
    en_scouse: ["thousand", "ˈθaʊzənd"],
    en_brum: ["thousand", "ˈθɔʊzənd"],
    en_manc: ["thousand", "ˈθaʊzənd"],
    en_wc: ["thousand", "ˈθaʊzənd"],
    en_est: ["thousand", "ˈθɑʊzənd"],
    fr_qc: ["mille", "mil"],
    fr_af: ["mille", "mil"],
    fr_be: ["mille", "mil"],
    fr_ch: ["mille", "mil"],
    es_co: ["mil", "mil"],
    es_cl: ["mil", "mil"],
    es_ar: ["mil", "mil"],
    es_cu: ["mil", "mil"],
    es_pe: ["mil", "mil"],
    es_an: ["mil", "mil"],
    ko_hg: ["천", "tɕʰʌn"],
    ko_jl: ["천", "tɕʰən"],
    dtp_kzj: ["soribu", "soribu"],
    es_pr: ["mil", "mil"],
    es_do: ["mil", "mil"],
    es_gt: ["mil", "mil"],
    es_ec: ["mil", "mil"],
    es_uy: ["mil", "mil"],
    es_ve: ["mil", "mil"],
    alt: ["муҥ", "muŋ"],  // Inherited from Proto-Turkic *bïŋ 'thousand'.
    ota: ["بیك", "biŋ"],  // Inherited from Proto-Turkic *bïŋ 'thousand'.
    sa: ["सहस्र", "sɐɦɐsɾɐ"],  // From Proto-Indo-Iranian *saȷ́ʰásram 'thousand'; cognate with Persian هزار.
    mnc: ["ᠮᡳᠩᡤᠠᠨ", "miŋɡan"],  // From Jurchen mingan, with cognates across Tungusic.
    aii: ["ܐܲܠܦܵܐ", "ʔalpa"],  // A cognate of Arabic alf, from Aramaic ʾalpā.
    khb: ["ᦗᧃ", "pan˥˩"],  // Cognate with Thai พัน and Lao ພັນ.
    vo: ["mil", "mil"],  // No origin is recorded on the entry, so it counts as a word of its own.
    got: ["𐌸𐌿𐍃𐌿𐌽𐌳𐌹", "ˈθuːsundi"],  // Inherited from Proto-Germanic *þūsundī.
    dng: ["чян", "tɕʰiæ̃˨˦"],  // Cognate with Mandarin 千 qiān.
    oj: ["midaaswaak", "midaːswaːk"],  // Ten hundreds: midaasw- 'ten' with the hundred ending -aakw- of ingodwaak.
    sco: ["thousand", "ˈθuzɪnd"],  // Inherited from Old English þūsend.
    inh: ["эзар", "ezar"],  // No origin is recorded on the entry, so it counts as a word of its own.
    hil: ["libo", "ˈlibo"],  // Borrowed from Malay ribu, from Proto-Malayo-Polynesian *ʀibu.
    tsg: ["ibu", "ʔiˈbu"],  // Borrowed from Malay ribu, from Proto-Malayo-Polynesian *ʀibu.
    tly: ["həzo", "həzo"],  // Cognate with Persian هزار hezâr.
    ilo: ["ribo", "ˈɾibo"],  // From Proto-Malayo-Polynesian *ʀibu; cognate with Malay ribu.
    udi: ["гьазар", "haˈzar"],  // Possibly borrowed from Armenian հազար, the Persian thousand.
    lus: ["sâng", "saːŋ"],  // No origin is recorded for this sense, so it counts as a word of its own.
    sd: ["هزار", "həzaːru"],  // Borrowed from Persian هزار hazār.
    aqc: ["изар", "izar"],  // Akin to Chechen эзар; no origin is recorded beyond that.
    mfe: ["mil", "mil"],  // From French mille.
    iso: ["odu", "odu"],  // No origin is recorded for it, so it counts as a word of its own.
    chr: ["ᎢᏯᎦᏴᎵ", "ijaɡajə̃li"],  // No image is recorded for it, so it counts as a word of its own.
    ang: ["þūsend", "ˈθuːsend"],  // From Proto-Germanic *þūsundī.
    nci: ["ōntzontli īpan mahtlācpōhualli", "oːntsontɬi iːpan mahtɬaːkpoːwalːi"],  // 'Eight hundred on two hundred' (ōntzontli 'eight hundred', īpan 'on', mahtlācpōhualli 'two hundred').
    rgn: ["mèl", "mɛl"],  // No etymology is recorded for it.
    oc: ["mil", "mil"],  // From Latin mille.
    lmo: ["milla", "ˈmila"],  // From Latin mille.
    enm: ["thousend", "ˈθuːzɛnd"],  // Inherited from Old English þūsend.
    rhg: ["házar", "hazar"],  // From Classical Persian hazār; ázar is a variant.
    sat: ["ᱦᱟᱡᱟᱨ", "haɟar"],  // Ultimately from Classical Persian hazār; ᱢᱤᱫ ᱦᱟᱡᱟᱨ mit’ hajar is 'one thousand'.
    rcf: ["mil", "mil"],  // From French mille.
    bjn: ["ribu", "ribu"],  // Inherited from Proto-Malayo-Polynesian *ʀibu.
    ln: ["nkoto", "ŋkoto"],  // Borrowed from Bangi nkoto; a different word nkoto means scorpion.
    ivv: ["livu", "livu"],  // No image is recorded for it, so it counts as a word of its own.
    rup: ["njilje", "ˈɲiʎe"],  // From Latin mīlia, the plural of mīlle.
    xal: ["миңһн", "miŋɣn̩"],  // From Proto-Mongolic *miŋgan, like Mongolian мянга.
    io: ["mil", "mil"],  // From Esperanto mil and the Romance words, from Latin mīlle.
    nv: ["mííl", "míːl"],  // From Spanish mil, from Latin mīlle; tʼááłáhádí mííl is 'one thousand'.
    ckb: ["ھەزار", "hazaːɾ"],  // The Iranian thousand, like Persian هزار.
    zza: ["xezar", "xɛˈzaɾ"],  // Related to Persian هزار.
    vec: ["mìle", "ˈmile"],  // From Latin mille.
    mi: ["mano", "mano"],  // From Proto-Polynesian *mano, which meant ten thousand in some languages.
    fur: ["mil", "mil"],  // From Latin mīlle.
    yai: ["hazor", "hazor"],  // Borrowed from Tajik ҳазор.
    pa: ["ਹਜ਼ਾਰ", "ɦəˈzaːɾ"],  // Borrowed from Classical Persian هزار; it displaced the inherited Old Punjabi ਸਹੰਸ.
    tab: ["агъзур", "aʁzur"],  // No origin is given; it is the same word as Lezgi агъзур.
    pap: ["mil", "mil"],  // From Portuguese, Spanish and Kabuverdianu mil, from Latin mīlle.
    kum: ["минг", "miŋ"],  // From Proto-Turkic *bïŋ 'thousand'.
    mdr: ["sallessorang", "salːesːoraŋ"],  // No analysis is recorded for it, so it counts as a word of its own.
    xsr: ["འ་ཛར", "hazar"],  // From Nepali हजार, the Persian thousand.
    kea: ["mil", "mil"],  // From Portuguese mil.
    cab: ["milu", "milu"],  // Probably from French mille.
    war: ["yukot", "juˈkot"],  // No analysis is recorded for it, so it counts as a word of its own.
    to: ["afe", "afe"],  // From Proto-Polynesian *afe, like Samoan afe.
    otk: ["𐰋𐰃𐰭", "biŋ"],  // Inherited from Proto-Turkic *bïŋ, like Turkish bin.
    txb: ["𑀬𑀮𑁆𑀢𑁆𑀲𑁂", "jaltse"],  // Tocharian B yaltse; compare Tocharian A wälts. No image is recorded for it, so it counts as a word of its own.
    arc: ["ܐܠܦܐ", "ʔalpaː"],  // Classical Syriac ʾalpā, a cognate of Arabic alf and Hebrew elef.
    arn: ["waranka", "waɾaŋka"],  // No origin is recorded for it, so it counts as a word of its own.
    bpy: ["হাজার", "hadʒar"],  // The Persian loan hazār, as in Bengali হাজার.
    cop: ["ϣⲟ", "ʃoʔ"],  // From Demotic ḫꜣ, from Egyptian ḫꜣ 'thousand'.
    hne: ["सहस", "səhəs"],  // Inherited through Prakrit sahassa from Sanskrit sahasra.
    ki: ["ngiri", "ŋɡiɾi"],  // No image is recorded for it, so it counts as a word of its own.
    mh: ["to̧ujin", "tˠæwitʲinʲ"],  // Borrowed from English thousand.
    ojp: ["千", "ti"],  // The native Old Japanese word read ti, not the Chinese loan sen.
    osp: ["mil", "mil"],  // Inherited from Latin mīlle.
    osx: ["thusund", "ˈθusund"],  // From Proto-Germanic *þūsundī.
    sga: ["míle", "ˈmʲiːlʲe"],  // Borrowed from Latin mīlia.
    srn: ["dusun", "dusun"],  // Borrowed from Dutch duizend.
    tru: ["ܐܠܦܐ", "alfo"],  // The Aramaic word for thousand, as in Arabic alf.
    za: ["cien", "ɕiːn˨˦"],  // Borrowed from Chinese 千.
    syc: ["ܐܠܦܐ", "ʔalpɑ"],  // Inherited from Proto-Semitic *ʔalp-, the same word as Arabic alf.
    pdc: ["dausend", "ˈdaʊsənt"],  // From Old High German dūsunt, like German tausend.
    nrf: ["mille", "mil"],  // From Old French mile, from Latin mīlle.
    sn: ["chiuru", "tʃiuru"],  // No image is recorded for it, so it counts as a word of its own.
    cbk: ["mil", "mil"],  // Inherited from Spanish mil.
    slr: ["miñ", "miŋ"],  // From Proto-Turkic *bïŋ.
    rmf: ["aadur", "ˈaːdur"],  // No origin is recorded for it, so it counts as a word of its own.
    kfr: ["હજાર", "hədʒaːr"],  // Borrowed from Classical Persian hazār.
    bal: ["ہزار", "hazaːr"],  // Inherited from Proto-Iranian *hajáhram, the same word as Persian hazār.
    uga: ["𐎀𐎍𐎔", "ʔalpu"],  // From Proto-West Semitic *ʔalp-, the same word as Arabic alf; it also means a head of cattle.
    co: ["mille", "ˈmille"],  // From Latin mille.
    ybe: ["mïŋ", "mɯŋ"],  // Inherited from Proto-Turkic *bïŋ.
    ts: ["gidi", "ɡidi"],  // No origin is recorded for it, so it counts as a word of its own.
    tyz: ["xiên", "siən˧˥"],  // From Chinese 千.
    cu: ["тꙑсѫщи", "tɨsɔ̃ʃti"],  // The Slavic word for thousand, like Russian тысяча.
    fro: ["mile", "ˈmilə"],  // From Latin mīlle.
    non: ["þúsund", "ˈθuːsund"],  // From Proto-Germanic þūsundī, of unclear origin.
    goh: ["dūsunt", "ˈduːsunt"],  // From Proto-Germanic þūsundī.
    lad: ["mil", "mil"],  // Inherited from Old Spanish mil, from Latin mīlle.
    pi: ["सहस्स", "sahasːa"],  // Inherited from Sanskrit sahasra.
    hif: ["hajaar", "ɦədʒaːr"],  // Inherited from Awadhi हजार, from Persian hazār.
    ium: ["cin", "tsʰin˧"],  // From Proto-Hmong-Mien tsʰi̯en, from Chinese 千.
    nso: ["sekete", "sekete"],  // No image is recorded for it, so it counts as a word of its own.
    orh: ["miŋga", "miŋɡa"],  // Shared with other Tungusic languages and Manchu minggan; no image is recorded for it.
    rw: ["igihumbi", "iɡihumbi"],  // No image is recorded for it, so it counts as a word of its own.
    kw: ["mil", "mil"],  // From Proto-Brythonic mil, from Latin mīlia.
    haj: ["হাজাৰ", "hadʒaɾ"],  // No etymology is given; it is the Persian hazār of Bengali হাজার.
    ve: ["gidi", "ɡidi"],  // No image is recorded for it, so it counts as a word of its own.
    ude: ["миӈга", "miŋɡa"],  // No image is recorded for it, so it counts as a word of its own.
    ii: ["ꄙ", "tu̠˧˧"],  // From Proto-Sino-Tibetan s-toŋ 'thousand'; no image is recorded for it.
    bft: ["སྟོང", "stoŋ"],  // From Proto-Sino-Tibetan s-toŋ 'thousand', like Tibetan སྟོང.
    wal: ["shaʼa", "ʃaʔa"],  // No image is recorded for it, so it counts as a word of its own.
    vot: ["tuhattõ", "ˈtuhatːɤ"],  // From Proto-Finnic *tuhatta; compare Ingrian tuhatta.
    ket: ["ӄога киʼ", "qɔka kiʔ"],  // Ten times a hundred: qō 'ten' + hā 'times' + kiˀ 'hundred'.
    egl: ["méll", "mel"],  // From Latin mille.
    mag: ["हजार", "hədʒaːr"],  // From Classical Persian hazār.
    szl: ["tysiōnc", "ˈtɪɕonts"],  // Inherited from Old Polish tysiąc, the Slavic thousand.
    yo: ["ẹgbẹ̀rún", "ɛɡbɛ̀ɾṹ"],  // From igba 'two hundred' + ẹ̀rún 'five': five two-hundreds.
    dv: ["ހާސް", "haːs"],  // Contracted from an earlier haas, from Prakrit sahassa, from Sanskrit sahasra.
    nog: ["мынъ", "mɯŋ"],  // From Proto-Turkic *bïŋ, like Turkish bin and Kazakh мың.
    rif: ["ⴰⵔⴻⴼ", "ɛrəf"],  // Borrowed from Moroccan Arabic ألف ʔalf.
    xkz: ["trong", "ʈoŋ"],  // From Proto-Sino-Tibetan *s-tawŋ, the same word as Tibetan སྟོང stong.
    blk: ["တရေင်ꩻ", "tə reŋ˧˧"],  // No image is recorded for it, so it counts as a word of its own.
    ain: ["ワニㇰ", "wanik"],  // The Hokkaido word (Obihiro waník in the 1964 dialect table); Saru says asikne wanhot and Sakhalin sinewantanku. No image is recorded for it, so it counts as a word of its own.
    jam: ["touzn", "touzn"],  // Inherited from English thousand.
    abq: ["зкьы", "zkʲə"],  // From Proto-Abkhaz-Abaza *zaḱə́; Abkhaz зықы is the same word. No image is recorded for it, so it counts as a word of its own.
    ttj: ["rukumi", "ɾukúmi"],  // The class 11 prefix ru- on -kumi 'ten'; the full collective form is orukumi.
    lic: ["ŋu:n1", "ŋuːn˥˧"],  // From Proto-Hlai *C-ŋuːn 'thousand' (Norquest 2015). No image is recorded for it, so it counts as a word of its own.
    csb: ["tësąc", "ˈtɜsɔ̃ts"],  // The Slavic thousand, like Polish tysiąc.
    frr_amr: ["düüsen", "ˈdyːzn̩"],  // The Germanic thousand; the Föhr-Amrum form with [yː] is from Middle Dutch dusent or Middle Low German dûsent blended with Old Frisian thūsend.
    lzz: ["შილია", "ʃilia"],  // Borrowed from Pontic Greek, from Ancient Greek χίλιοι 'thousand'.
    pqm: ["ʼqotamqahk", "kʷotamkʷahk"],  // Built from ʼqot- 'one' and -amqahk 'times a thousand'.
    xng: ["ᠮᠢᠩᠬᠠᠨ", "miŋqan"],  // Inherited from Proto-Mongolic, from Turkic *bïŋ 'thousand'.
    bbl: ["ათას", "atas"],  // Borrowed from Georgian ათასი, which is counted as ten hundreds.
    akk: ["𒇷𒈬", "liːmu"],  // No image is recorded for it, so it counts as a word of its own.
    acn: ["xiŋ51", "xiŋ˥˩"],  // From Chinese 千 'thousand'.
    glk: ["هزر", "hezar"],  // The Persian hazār.
    frr: ["düüsen", "ˈdyːzn̩"],
    sc: ["mille", "ˈmille"],
    ksw: ["မၢ", "mo̰"],
    mnw: ["လ္ၚီ", "ŋi̤m"],
  },
};
