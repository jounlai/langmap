/**
 * Honey is the word where Proto-Indo-European kept two of everything and the branches split the
 * pair between them. One root is *médʰu — Sanskrit madhu, Old Church Slavonic медъ, Lithuanian
 * medus, Old English medu, and the fermented drink English still calls mead; in Greek the same
 * root slid off the substance entirely and became méthu 'wine'. The other is *mélit — Latin mel
 * (whence miel, mel, miele), Greek μέλι, Hittite milit, Old Irish mil, Gothic 𐌼𐌹𐌻𐌹𐌸, Armenian
 * մեղր, Albanian mjaltë. Germanic then walked away from both for the substance and coined a third
 * word of its own — Old English hunig, German Honig, Dutch honing — while keeping *médʰu for the
 * drink. So English has honey and mead from two different roots for the same bee, and the Romance
 * and Greek columns of this map are running on the root English lost.
 *
 * Uralic sits in the middle of it: Proto-Uralic *mete is a loan from *médʰu, still visible in
 * Estonian mesi, Hungarian méz, Erzya медь, Veps mezi and Komi ма. Finnish is the exception — mesi
 * survives there but has narrowed to 'nectar', and the everyday word for honey is hunaja, so that
 * is what the Finnish cell gives.
 *
 * The other hook is at the far end of the Silk Road. Old Chinese 蜜 (Baxter–Sagart *mit) has long
 * been compared with Tocharian B mit 'honey', and both rows are on this map. If the comparison
 * holds it is one of the very few Indo-European loans into Chinese, carried east along the Tarim
 * oases; the borrowing is a hypothesis, not a settled fact, but the two cells sit close enough
 * that the reader can weigh it. The 蜜 layer then rides Buddhist texts onward: Heian Japanese
 * mitu, Sino-Vietnamese mật, Cantonese mat6. Korean took none of it and kept native 꿀.
 *
 * Beyond Indo-European the map goes its own ways: Semitic splits *dibš- (Hebrew דבש, Aramaic
 * ܕܒܫܐ, Ugaritic nbt) from *ʕasal- (Arabic عسل, borrowed on into Persian, Uzbek, Hindi शहद,
 * Maltese għasel); Turkic has *bal, with Chuvash пыл showing its regular b→p; Berber has tament;
 * Bantu *-jókì gives Shona uchi, Xhosa ubusi, Kinyarwanda ubuki; Dravidian *tēn gives Tamil தேன்.
 * Hawaiian meli and Samoan meli are μέλι again, arriving in the nineteenth century by Bible.
 *
 * Two cells are romanised where the row normally uses its script. Hittite mi-li-it needs the
 * cuneiform IT sign and Egyptian bj.t needs the bee L2 𓆤; neither codepoint is in the self-hosted
 * subset fonts (which are cut to exactly the glyphs the word data already uses), so both would
 * render as tofu on a phone. The atlas already romanises in these rows where it must — Egyptian
 * writes ḥḏ for 'white', Sumerian líl for 'wind' — so the fallback is the house one.
 */
WORDS.honey = {
  emoji: "🍯",
  label: {
    en: "Honey", ja: "蜂蜜", ko: "꿀", zh: "蜂蜜", yue: "蜜糖", vi: "Mật ong", th: "น้ำผึ้ง",
    id: "Madu", hi: "शहद", de: "Honig", fr: "Miel", it: "Miele", es: "Miel", es_eu: "Miel",
    es_mx: "Miel", pt: "Mel", pt_eu: "Mel", pt_br: "Mel", ru: "Мёд", uk: "Мед", ar: "عسل",
    he: "דבש", sw: "Asali",
  },
  definition: {
    en: "Honey — the thick sweet food bees make from flower nectar. Indo-European had two words for it: one gave Latin mel and Greek méli, the other Sanskrit madhu and English mead.",
    ja: "蜂蜜 — ミツバチが花の蜜から作る、濃くて甘い食べ物。印欧祖語には二つの語があり、一方はラテン語 mel やギリシャ語 méli に、他方はサンスクリット madhu や英語 mead になった。",
    ko: "꿀 — 벌이 꽃꿀로 만드는 진하고 단 음식. 인도유럽조어에는 두 낱말이 있었는데, 하나는 라틴어 mel과 그리스어 méli로, 다른 하나는 산스크리트 madhu와 영어 mead로 이어졌다.",
    zh: "蜂蜜 — 蜜蜂用花蜜酿成的浓稠甜食。原始印欧语有两个词：一个演变为拉丁语 mel、希腊语 méli，另一个演变为梵语 madhu、英语 mead。",
    yue: "蜜糖 — 蜜蜂用花蜜釀成嘅濃稠甜食。原始印歐語有兩個詞：一個變成拉丁文 mel、希臘文 méli，另一個變成梵文 madhu、英文 mead。",
    vi: "Mật ong — thức ăn ngọt và sánh do ong làm từ mật hoa. Tiếng Ấn-Âu nguyên thủy có hai từ chỉ nó: một cho ra mel trong tiếng Latinh, một cho ra madhu trong tiếng Phạn và mead trong tiếng Anh.",
    th: "น้ำผึ้ง — อาหารหวานข้นที่ผึ้งทำจากน้ำหวานของดอกไม้ ภาษาอินโด-ยูโรเปียนดั้งเดิมมีสองคำสำหรับสิ่งนี้ คำหนึ่งกลายเป็น mel ในภาษาละติน อีกคำกลายเป็น madhu ในภาษาสันสกฤตและ mead ในภาษาอังกฤษ",
    id: "Madu — makanan manis dan kental yang dibuat lebah dari nektar bunga. Bahasa Proto-Indo-Eropa punya dua kata untuknya: satu menjadi mel dalam bahasa Latin, satu lagi menjadi madhu dalam bahasa Sanskerta dan mead dalam bahasa Inggris.",
    hi: "शहद — फूलों के रस से मधुमक्खियाँ जो गाढ़ा मीठा पदार्थ बनाती हैं। आदि-भारोपीय में इसके दो शब्द थे: एक से लातीनी mel बना, दूसरे से संस्कृत मधु और अंग्रेज़ी mead।",
    de: "Honig — die dickflüssige, süße Speise, die Bienen aus Blütennektar bereiten. Das Urindogermanische hatte zwei Wörter dafür: das eine ergab lateinisch mel, das andere Sanskrit madhu und englisch mead.",
    fr: "Miel — l'aliment épais et sucré que les abeilles font avec le nectar des fleurs. L'indo-européen commun en avait deux mots : l'un a donné le latin mel, l'autre le sanskrit madhu et l'anglais mead.",
    it: "Miele — l'alimento denso e dolce che le api ricavano dal nettare dei fiori. L'indoeuropeo ne aveva due parole: una ha dato il latino mel, l'altra il sanscrito madhu e l'inglese mead.",
    es: "Miel — el alimento espeso y dulce que las abejas hacen con el néctar de las flores. El indoeuropeo tenía dos palabras para él: una dio el latín mel, la otra el sánscrito madhu y el inglés mead.",
    es_eu: "Miel — el alimento espeso y dulce que las abejas hacen con el néctar de las flores. El indoeuropeo tenía dos palabras para él: una dio el latín mel, la otra el sánscrito madhu y el inglés mead.",
    es_mx: "Miel — el alimento espeso y dulce que las abejas hacen con el néctar de las flores. El indoeuropeo tenía dos palabras para él: una dio el latín mel, la otra el sánscrito madhu y el inglés mead.",
    pt: "Mel — o alimento espesso e doce que as abelhas fazem a partir do néctar das flores. O indo-europeu tinha duas palavras para ele: uma deu o latim mel, a outra o sânscrito madhu e o inglês mead.",
    pt_eu: "Mel — o alimento espesso e doce que as abelhas fazem a partir do néctar das flores. O indo-europeu tinha duas palavras para ele: uma deu o latim mel, a outra o sânscrito madhu e o inglês mead.",
    pt_br: "Mel — o alimento espesso e doce que as abelhas fazem a partir do néctar das flores. O indo-europeu tinha duas palavras para ele: uma deu o latim mel, a outra o sânscrito madhu e o inglês mead.",
    ru: "Мёд — густая сладкая пища, которую пчёлы делают из цветочного нектара. В праиндоевропейском было два слова для неё: одно дало латинское mel, другое — санскритское madhu и английское mead.",
    uk: "Мед — густа солодка їжа, яку бджоли роблять із квіткового нектару. У праіндоєвропейській було два слова для неї: одне дало латинське mel, друге — санскритське madhu й англійське mead.",
    ar: "عسل — الطعام الحلو الكثيف الذي يصنعه النحل من رحيق الأزهار. كان في الهندية الأوروبية الأم كلمتان له: إحداهما أعطت اللاتينية mel واليونانية méli، والأخرى السنسكريتية madhu والإنجليزية mead.",
    he: "דבש — המזון המתוק והסמיך שהדבורים מייצרות מצוף פרחים. בפרוטו־הודו־אירופית היו לו שתי מילים: האחת נתנה את הלטינית mel והיוונית méli, והשנייה את הסנסקריט madhu ואת האנגלית mead.",
    sw: "Asali — chakula kizito na kitamu ambacho nyuki hutengeneza kutokana na nekta ya maua. Lugha ya Proto-Indo-Ulaya ilikuwa na maneno mawili kwa ajili yake: moja likatoa mel ya Kilatini, jingine madhu ya Kisanskrit na mead ya Kiingereza.",
  },
  data: {
    // --- UI languages -------------------------------------------------
    en: ["honey", "ˈhʌni"],
    ja: ["蜂蜜", "hatɕimitsɯ"],
    ko: ["꿀", "k͈ul"],
    zh: ["蜂蜜", "fɤŋ˥˥ mi˥˩"],
    yue: ["蜜糖", "mɐt˨ tʰɔːŋ˨˩"],
    vi: ["mật ong", "mət˨˩ ɔŋ˧"],
    th: ["น้ำผึ้ง", "nam˧˥ pʰɯŋ˥˩"],
    id: ["madu", "ˈmadu"],
    hi: ["शहद", "ʃəɦəd"],
    de: ["Honig", "ˈhoːnɪç"],
    fr: ["miel", "mjɛl"],
    it: ["miele", "ˈmjɛːle"],
    es: ["miel", "mjel"],
    es_mx: ["miel", "mjel"],
    pt: ["mel", "mɛl"],
    pt_br: ["mel", "mɛw"],
    ru: ["мёд", "mʲɵt"],
    uk: ["мед", "mɛd"],
    ar: ["عسل", "ʕasal"],
    he: ["דבש", "dvaʃ"],
    sw: ["asali", "aˈsali"],

    // --- Proto-Indo-European: the *mélit branch ------------------------
    // The cell gives *mélit, the root that actually means 'honey'; *médʰu,
    // the other PIE word, shows up below in Sanskrit, Slavic, Baltic and
    // (as the drink) Germanic mead. Both are PIE; the branches split them.
    p_ine: ["*mélit", "mélit"],
    hit: ["milit", "milit"],          // cuneiform mi-li-it: IT sign not in the subset font
    la: ["mel", "mel"],
    gmy: ["𐀕𐀪", "meli"],              // Linear B me-ri
    el_grc: ["μέλι", "méli"],
    el_kath: ["μέλι", "ˈmeli"],
    el: ["μέλι", "ˈmeli"],
    got: ["𐌼𐌹𐌻𐌹𐌸", "miliθ"],          // Gothic kept *mélit where the rest of Germanic did not
    sga: ["mil", "mʲilʲ"],
    mga: ["mil", "mʲilʲ"],
    ga: ["mil", "mʲɪlʲ"],
    gd: ["mil", "mil"],
    gv: ["mill", "mil"],
    cy: ["mêl", "meːl"],
    br: ["mel", "meːl"],
    kw: ["mel", "meːl"],
    hy_grab: ["մեղր", "meʁɾ"],
    hy: ["մեղր", "mɛʁɾ"],
    hyw: ["մեղր", "mɛʁɾ"],
    sq: ["mjaltë", "ˈmjaltə"],

    // --- Romance: Latin mel all the way down ---------------------------
    fro: ["miel", "mjɛl"],
    fr_class: ["miel", "mjɛl"],
    osp: ["miel", "mjel"],
    es_sgl: ["miel", "mjel"],
    lad: ["miel", "mjel"],
    ast: ["miel", "mjel"],
    an: ["miel", "mjel"],
    ca: ["mel", "mɛl"],
    gl: ["mel", "mɛl"],
    oc: ["mèl", "mɛl"],
    co: ["mele", "ˈmɛle"],
    sc: ["mele", "ˈmɛle"],
    vec: ["miel", "mjɛl"],
    scn: ["meli", "ˈmɛli"],
    fur: ["mîl", "miːl"],
    rm: ["mel", "mɛl"],
    ro: ["miere", "ˈmjere"],
    eo: ["mielo", "miˈelo"],
    ia: ["melle", "ˈmɛle"],

    // --- Germanic: a third word for the substance ----------------------
    goh: ["honag", "ˈhonaɡ"],
    ang: ["hunig", "ˈhunij"],
    enm: ["hony", "ˈhɔni"],
    en_em: ["honey", "ˈhʊni"],
    sco: ["hinnie", "ˈhɪni"],
    non: ["hunang", "ˈhunɑŋɡ"],
    is: ["hunang", "ˈhʏːnauŋk"],
    da: ["honning", "ˈhɔneŋ"],
    no: ["honning", "ˈhɔnːɪŋ"],
    nn: ["honning", "ˈhɔnːɪŋ"],
    sv: ["honung", "ˈhoːnɵŋ"],
    nl: ["honing", "ˈɦoːnɪŋ"],
    af: ["heuning", "ˈɦɪønɪŋ"],
    fy: ["huning", "ˈhynɪŋ"],
    yi: ["האָניק", "ˈhɔnik"],

    // --- Balto-Slavic and Indo-Iranian: the *médʰu branch --------------
    prg: ["meddo", "medːo"],
    lt: ["medus", "mʲɛˈdʊs"],
    lv: ["medus", "ˈmɛdus"],
    cu: ["медъ", "medŭ"],
    orv: ["медъ", "medŭ"],
    be: ["мёд", "mʲot"],
    pl: ["miód", "mjut"],
    cs: ["med", "mɛt"],
    sk: ["med", "mɛt"],
    sl: ["med", "meːt"],
    hr: ["med", "meːd"],
    sr: ["мед", "meːd"],
    bs: ["med", "meːd"],
    bg: ["мед", "mɛt"],
    mk: ["мед", "mɛt"],
    h_vedic: ["मधु", "mɐdʱu"],
    sa: ["मधु", "mɐdʱu"],
    sa_edu: ["मधु", "mədʱu"],
    pi: ["मधु", "madʱu"],
    pi_edu: ["madhu", "madʱu"],
    pmh: ["महु", "mahu"],
    bn: ["মধু", "mod̪ʱu"],
    mr: ["मध", "məd̪ʱ"],
    gu: ["મધ", "məd̪ʱ"],
    ne: ["मह", "məɦ"],
    si: ["මී පැණි", "miː pæɳi"],
    // hi/ur take the Arabic word instead; see the *ʕasal- block below.
    os: ["мыд", "mɨd"],

    // --- Iranian: angubēn, then the Arabic loan ------------------------
    pal: ["angubēn", "aŋɡubeːn"],
    fa_clas: ["انگبین", "aŋɡubiːn"],
    fa: ["عسل", "æsæl"],
    prs: ["عسل", "asal"],
    tg: ["асал", "asal"],
    ku: ["hingiv", "hɪnˈɡiv"],
    ckb: ["هەنگوین", "hɛnɡwiːn"],

    // --- Old Chinese 蜜 and Tocharian mit ------------------------------
    // Baxter–Sagart OC *mit beside Tocharian B mit: one of the few proposed
    // Indo-European loans into Chinese, plausibly along the Tarim routes.
    // Compared since Bailey; still a hypothesis, not a settled etymology.
    txb: ["𑀫𑀺𑀢𑁆", "mit"],
    xto: ["𑀫𑀺𑀢𑁆", "mit"],
    och: ["蜜", "*mit"],
    zh_han: ["蜜", "mit"],
    zh_tang: ["蜜", "mit"],
    zh_song: ["蜜", "mit"],
    zh_wenyan_edu: ["蜜", "mɐt˨"],
    zh_tw: ["蜂蜜", "fɤŋ˥˥ mi˥˩"],
    vi_han: ["蜜", "mət˨˩"],
    ja_kanbun: ["蜜", "mitsɯ"],
    ja_heian: ["蜜", "mitu"],
    ja_chu: ["蜜", "mitu"],
    ja_edo: ["蜂蜜", "hatɕimitsɯ"],
    ko_kp: ["꿀", "k͈ul"],

    // --- Uralic: *mete, borrowed from *médʰu ---------------------------
    pura: ["*mete", "mete"],
    et: ["mesi", "ˈmesi"],
    // fi keeps mesi only for 'nectar'; the everyday word for honey is hunaja.
    fi: ["hunaja", "ˈhunɑjɑ"],
    hu: ["méz", "meːz"],
    vep: ["mezi", "ˈmezi"],
    myv: ["медь", "medʲ"],
    mhr: ["мӱй", "myj"],
    kpv: ["ма", "ma"],

    // --- Turkic and Mongolic: *bal -------------------------------------
    ptrk: ["*bal", "bal"],
    xqa: ["bal", "bal"],
    ota: ["بال", "bal"],
    tr: ["bal", "bal"],
    az: ["bal", "bɑl"],
    azb: ["بال", "bɑl"],
    tk: ["bal", "bal"],
    gag: ["bal", "bal"],
    crh: ["bal", "bal"],
    kk: ["бал", "bɑl"],
    ky: ["бал", "bal"],
    kaa: ["bal", "bal"],
    tt: ["бал", "bal"],
    ba: ["бал", "bal"],
    cv: ["пыл", "pɯl"],               // regular Chuvash p- for Common Turkic b-
    sah: ["мүөт", "myøt"],            // borrowed from Russian мёд
    uz: ["asal", "asal"],
    ug: ["ھەسەل", "hɛˈsɛl"],
    mn: ["бал", "bal"],

    // --- Semitic *dibš- and *ʕasal- ------------------------------------
    psem: ["*dibš-", "dibʃ"],
    uga: ["𐎐𐎁𐎚", "nubtu"],
    akk: ["dišpu", "diʃpu"],
    hbo: ["דבש", "dəvaʃ"],
    he_mis: ["דבש", "dəvaʃ"],
    arc: ["ܕܒܫܐ", "deβʃaː"],
    syc: ["ܕܒܫܐ", "deβʃaː"],
    ar_qur: ["عسل", "ʕasal"],
    mt: ["għasel", "ˈaːsel"],

    // --- Egypt, Sumer, Ethiopia, Berber --------------------------------
    sux: ["làl", "lal"],
    egy: ["bj.t", "ˈbijat"],          // bee-sign L2 not in the subset font
    cop: ["ⲉⲃⲓⲱ", "ebioː"],
    gez: ["መዓር", "maʕaːr"],
    am: ["ማር", "mar"],
    ti: ["መዓር", "mɐʕar"],
    kab: ["tament", "θamənt"],
    shi: ["ⵜⴰⵎⵎⵏⵜ", "tamːnt"],
    zgh: ["ⵜⴰⵎⵎⵏⵜ", "tamːnt"],

    // --- Caucasus and Basque -------------------------------------------
    ka: ["თაფლი", "tʰapʰli"],
    eu: ["ezti", "es̻ti"],

    // --- Dravidian *tēn --------------------------------------------------
    p_dra: ["*tēn", "teːn"],
    ta: ["தேன்", "t̪eːn"],
    te: ["తేనె", "teːne"],
    ml: ["തേൻ", "t̪eːn"],
    kn: ["ಜೇನು", "dʒeːnu"],

    // --- Indo-Aryan/Perso-Arabic layer -----------------------------------
    ur: ["شہد", "ʃəɦəd"],

    // --- Mainland and island Southeast Asia -------------------------------
    km: ["ទឹកឃ្មុំ", "tɨk kʰmum"],
    my: ["ပျားရည်", "pjá jè"],
    bo: ["སྦྲང་རྩི", "ʈʂaŋ tsi"],
    ms: ["madu", "ˈmadu"],
    jv: ["madu", "madu"],
    su: ["madu", "madu"],
    tl: ["pulot", "puˈlot"],

    // --- Pacific and Madagascar -------------------------------------------
    haw: ["meli", "ˈmeli"],           // μέλι again, by way of the missionary Bible
    sm: ["meli", "meli"],
    mg: ["tantely", "tanˈtelʲ"],

    // --- Africa ------------------------------------------------------------
    pban: ["*-jókì", "-jókì"],
    zu: ["uju", "udʒu"],
    xh: ["ubusi", "ubusi"],
    sn: ["uchi", "utʃi"],
    ny: ["uchi", "utʃi"],
    rw: ["ubuki", "ubuki"],
    ki: ["ũũkĩ", "uːki"],
    bem: ["ubuci", "ubutʃi"],
    yo: ["oyin", "ojĩ"],
    ha: ["zuma", "zuma"],
    om: ["damma", "damːa"],
    so: ["malab", "malab"],
    wo: ["lem", "lɛm"],

    // --- Romance — Latin mel, unchanged in almost every daughter ----------
    es_ar: ["miel", "mjel"],
    es_co: ["miel", "mjel"],
    es_cl: ["miel", "mjel"],
    es_cu: ["miel", "mjel"],
    es_pe: ["miel", "mjel"],
    es_an: ["miel", "mjel"],
    es_ve: ["miel", "mjel"],
    es_bo: ["miel", "mjel"],
    es_uy: ["miel", "mjel"],
    es_pr: ["miel", "mjel"],
    es_do: ["miel", "mjel"],
    es_gt: ["miel", "mjel"],
    es_ec: ["miel", "mjel"],
    es_cr: ["miel", "mjel"],
    es_hn: ["miel", "mjel"],
    es_ni: ["miel", "mjel"],
    es_sv: ["miel", "mjel"],
    es_py: ["miel", "mjel"],
    es_pa: ["miel", "mjel"],

    fr_qc: ["miel", "mjɛl"],
    fr_be: ["miel", "mjɛl"],
    fr_ch: ["miel", "mjɛl"],
    fr_lu: ["miel", "mjɛl"],
    fr_af: ["miel", "mjɛl"],
    fr_sn: ["miel", "mjɛl"],
    fr_ci: ["miel", "mjɛl"],
    fr_ht: ["miel", "mjɛl"],
    fr_cm: ["miel", "mjɛl"],

    pt_ao: ["mel", "mɛl"],
    pt_mz: ["mel", "mɛl"],
    pt_mo: ["mel", "mɛl"],
    pt_cv: ["mel", "mɛl"],
    ca_va: ["mel", "mel"],
    ext: ["miel", "ˈmjel"],
    nap: ["mèle", "ˈmɛːlə"],
    rgn: ["mél", "meːl"],

    // --- English — each row's own STRUT vowel, read off its blood ---------
    en_us: ["honey", "ˈhʌni"],
    en_ca: ["honey", "ˈhʌni"],
    en_za: ["honey", "ˈhʌni"],
    en_in: ["honey", "ˈhʌni"],
    en_ie: ["honey", "ˈhʌni"],
    en_sco: ["honey", "ˈhʌni"],
    en_wc: ["honey", "ˈhʌni"],
    en_est: ["honey", "ˈhʌni"],
    en_app: ["honey", "ˈhʌni"],
    en_south: ["honey", "ˈhʌni"],
    en_aave: ["honey", "ˈhʌni"],
    en_ng: ["honey", "ˈhʌni"],
    en_ng2: ["honey", "ˈhʌni"],
    en_ke: ["honey", "ˈhʌni"],
    en_ph: ["honey", "ˈhʌni"],
    en_sg: ["honey", "ˈhʌni"],
    en_my: ["honey", "ˈhʌni"],
    en_wls: ["honey", "ˈhʌni"],
    en_ck: ["honey", "ˈhʌni"],
    en_au: ["honey", "ˈhani"],
    en_nz: ["honey", "ˈhani"],
    en_scouse: ["honey", "ˈhʊni"],
    en_geordie: ["honey", "ˈhʊni"],
    en_brum: ["honey", "ˈhʊni"],
    en_manc: ["honey", "ˈhʊni"],
    en_yk: ["honey", "ˈhʊni"],

    // --- Turkic *bal and the West Slavic reflexes of *medъ -----------------
    slr: ["bal", "bal"],
    ybe: ["bal", "bal"],
    kum: ["бал", "bal"],
    nog: ["бал", "bal"],
    krc: ["бал", "bal"],
    qxq: ["بال", "bal"],
    rue: ["мед", "med"],
    csb: ["miód", "mjud"],
    szl: ["miōd", "mjoːd"],
    hsb: ["mjed", "mjɛt"],
    dsb: ["mjod", "mjɔt"],

    // --- Arabic dialects — Maghrebi drops the short vowel ------------------
    ar_sy: ["عسل", "ʕasal"],
    ar_lb: ["عسل", "ʕasal"],
    ar_jo: ["عسل", "ʕasal"],
    ar_ps: ["عسل", "ʕasal"],
    ar_ye: ["عسل", "ʕasal"],
    ar_sa: ["عسل", "ʕasal"],
    ar_gulf: ["عسل", "ʕasal"],
    ar_iq: ["عسل", "ʕasal"],
    abv: ["عسل", "ʕasal"],
    afb: ["عسل", "ʕasal"],
    acw: ["عسل", "ʕasal"],
    ar_eg: ["عسل", "ʕasal"],
    ar_sd: ["عسل", "ʕasal"],
    ayl: ["عسل", "ʕasal"],
    ar_ma: ["عسل", "ʕsəl"],
    ar_tn: ["عسل", "ʕsəl"],
    arq: ["عسل", "ʕsəl"],
    en_jam: ["honey", "ˈhʌni"],
    vi_nom: ["蜜螉", "mət˨˩ ɔŋ˧"],

    // --- Romance and Albanian — Latin mel, and *mélit in Albanian ----------
    it_dan: ["miele", "ˈmjɛːle"],
    lmo: ["mel", "mɛl"],
    pms: ["amel", "aˈmɛl"],
    lld: ["mel", "mɛl"],
    egl: ["mêl", "meːl"],
    frp: ["mièl", "mjɛl"],
    pcd: ["miel", "mjɛl"],
    fax: ["mel", "mɛl"],
    mwl: ["mel", "mɛl"],
    rup: ["njari", "ˈɲari"],
    kea: ["mel", "mɛl"],
    pt_gw: ["mel", "mɛl"],
    cbk: ["miel", "mjel"],
    // The French creoles agglutinate the partitive: du miel became one noun.
    crs: ["dimyel", "dimjɛl"],
    mfe: ["dimiel", "dimjɛl"],
    // In Haitian myèl alone is the BEE (from mouche à miel), so the substance
    // needs siwo 'syrup' in front of it.
    ht: ["siwo myèl", "siwo mjɛl"],
    aln: ["mjaltë", "mjalt"],
    aae: ["mjaltë", "ˈmjaltə"],

    // --- Germanic — the third word, and the -ig that Austria says as -ik ----
    gmh: ["honec", "ˈhonɛk"],
    de_lut: ["Honig", "ˈhoːnɪk"],
    de_at: ["Honig", "ˈhoːnɪk"],
    de_ch: ["Honig", "ˈhoːnɪk"],
    de_lu: ["Honig", "ˈhoːnɪç"],
    nds: ["Honnig", "ˈhɔnɪç"],
    lb: ["Hunneg", "ˈhunəç"],
    nl_be: ["honing", "ˈhoːnɪŋ"],
    fo: ["hunangur", "ˈhuːnaŋɡʊɹ"],
    pdc: ["Hunnich", "ˈhʊnɪç"],
    pdt: ["Honnich", "ˈhɔnɪç"],

    // --- Indo-Aryan and Iranian ------------------------------------------
    // Punjabi took the Perso-Arabic šahd; Odia and Assamese keep *médʰu; Pashto
    // šāt is neither, an inherited Iranian word of its own.
    pa: ["ਸ਼ਹਿਦ", "ʃəɦəd"],
    or: ["ମହୁ", "mɔɦu"],
    as: ["মৌ", "mɔu"],
    dv: ["މާމުއި", "maːmui"],
    ps: ["شات", "ʃɑt"],
    rmy: ["avdžin", "avdʒin"],   // Romani took the Persian angubīn, not madhu

    // --- Uralic — *mete again, and the Scandinavian loan in Sámi ----------
    olo: ["mezi", "ˈmezi"],
    krl: ["mesi", "ˈmesi"],
    vot: ["mesi", "ˈmesi"],
    vro: ["mesi", "ˈmesi"],
    liv: ["mež", "mɛʒ"],
    mrj: ["мӱ", "my"],
    mdf: ["медь", "medʲ"],
    udm: ["чечы", "tʃetʃɨ"],
    koi: ["ма", "ma"],
    kca: ["мав", "maw"],
    mns: ["ма̄г", "maːɣ"],
    ohu: ["mēz", "meːz"],
    // fit and fkv follow Finnish, where mesi narrowed to 'nectar'.
    fit: ["hunaja", "ˈhunɑjɑ"],
    fkv: ["hunaja", "ˈhunɑjɑ"],
    // Northern Sámi borrowed the Scandinavian word instead; its eastern
    // neighbours kept the *mete one.
    se: ["honnet", "ˈhonnet"],
    smj: ["meda", "ˈmeda"],
    smn: ["mietâ", "ˈmietɐ"],

    // --- Turkic, Mongolic, Tungusic ---------------------------------------
    xal: ["бал", "bal"],
    mn_cn: ["ᠪᠠᠯ", "bal"],
    cmg: ["ᠪᠠᠯ", "bal"],
    mnc: ["ᡥᡳᠪᠰᡠ", "xibsu"],

    // --- The Caucasus, where every valley has its own root -----------------
    // Avar-Andic and Tsezic share *nVc'-; Lezgic has *it-; Nakh has *moz.
    av: ["гьоцӏцӏо", "hotsʼːo"],
    ani: ["гьунцӏцӏи", "huntsʼːi"],
    ddo: ["нуци", "nutsi"],
    khv: ["нуца", "nutsa"],
    huz: ["нуцу", "nutsu"],
    dar: ["варъа", "warʔa"],
    lbe: ["ницӏ", "nitsʼ"],
    aqc: ["имцӏ", "imtsʼ"],
    lez: ["вирт", "virt"],
    tab: ["йиччв", "jitʃːv"],
    tkr: ["итв", "itʷ"],
    rut: ["ит", "it"],
    agx: ["уьтт", "ytː"],
    bdk: ["йит", "jit"],
    kry: ["yit", "jit"],
    kjj: ["нуьцӏ", "nytsʼ"],
    ce: ["моз", "moz"],
    inh: ["модз", "modz"],
    bbl: ["მოცʼ", "motsʼ"],
    ab: ["ацха", "atsxa"],
    ady: ["шъоу", "ʂʷəw"],
    kbd: ["фо", "fʷa"],

    // --- Semitic, Cushitic, Berber ----------------------------------------
    oar: ["דבשא", "debʃaː"],
    tig: ["መዓር", "mɐʕar"],
    mey: ["عسل", "ʕasal"],
    aa: ["malab", "malab"],
    ssy: ["malab", "malab"],
    tzm: ["ⵜⴰⵎⵎⵏⵜ", "tamːnt"],
    shy: ["tament", "tamənt"],
    dbq: ["ɓùɓum", "ɓùɓum"],

    // --- Sinitic 蜂蜜 — one compound, and 蜜 sorted by its 入聲 class ------
    // 蜂 is the homophone of 风, so each row's 陰平 carries it. 蜜 was 次濁入:
    // it went to 去聲 in the northern lects, to 陽平 in the southwestern ones
    // (which sent the whole 入聲 there), to 陰平 in Zhongyuan, and stayed a
    // checked syllable in Jianghuai.
    zh_jn: ["蜂蜜", "fəŋ˨˩˧ mi˨˩"],
    zh_tj: ["蜂蜜", "fəŋ˨˩ mi˥˩"],
    zh_db: ["蜂蜜", "fɤŋ˥ mi˥˩"],
    zh_hf: ["蜂蜜", "fəŋ˨˩˨ miʔ˦"],
    zh_nj: ["蜂蜜", "fən˧˩ miʔ˥"],
    zh_jh: ["蜂蜜", "fə̃˧˩ miʔ˥˥"],
    zh_cq: ["蜂蜜", "foŋ˥ mi˨˩"],
    zh_cd: ["蜂蜜", "foŋ˥˥ mi˨˩"],
    zh_sc: ["蜂蜜", "foŋ˥˥ mi˨˩"],
    zh_wh: ["蜂蜜", "foŋ˥˥ mi˨˩˧"],
    zh_km: ["蜂蜜", "fə̃˦˦ mi˧˩"],
    zh_kf: ["蜂蜜", "fəŋ˨˦ mi˨˦"],
    zh_zz: ["蜂蜜", "fəŋ˨˦ mi˨˦"],
    zh_xa: ["蜂蜜", "fəŋ˨˩ mi˨˩"],
    // Min Nan reads 蜂 with the colloquial phang, not the literary hong.
    nan: ["蜂蜜", "pʰaŋ˥ bit˦"],
    nan_xm: ["蜂蜜", "pʰaŋ˥˥ bit˦"],
    nan_qz: ["蜂蜜", "pʰaŋ˧˧ bit˨˦"],

    // --- Japonic and Koreanic ---------------------------------------------
    ja_kyo: ["蜂蜜", "hatɕimitsɯ"],
    ja_osa: ["蜂蜜", "hatɕimitsɯ"],
    ja_hak: ["蜂蜜", "hatɕimitsɯ"],
    ja_hir: ["蜂蜜", "hatɕimitsɯ"],
    ja_aom: ["蜂蜜", "hatɕimitsɯ"],
    ja_sd: ["蜂蜜", "hatɕimitsɯ"],
    ko_bus: ["꿀", "k͈ul"],
    ko_jl: ["꿀", "k͈ul"],
    ko_hg: ["꿀", "k͈ul"],
    ko_yb: ["꿀", "k͈ul"],
    ko_jeju: ["꿀", "k͈ul"],

    // --- Mainland Southeast Asia — the water of the bee --------------------
    lo: ["ນ້ຳເຜິ້ງ", "naːm˥˩ pʰɤŋ˥˩"],
    th_n: ["น้ำผึ้ง", "nam˧˥ pʰɯŋ˥˩"],
    th_s: ["น้ำผึ้ง", "nam˧˥ pʰɯŋ˥˩"],
    th_isan: ["น้ำผึ้ง", "nam˧˥ pʰɯŋ˥˩"],
    vi_s: ["mật ong", "mək˨˩˨ ɔŋ˧"],

    // --- Pacific and the Philippines ---------------------------------------
    // Two more Pacific reflexes of the mel/méli family, carried in by mission
    // contact, beside Tongan hone straight from English.
    mi: ["miere", "ˈmiere"],
    rap: ["meri", "meɾi"],
    to: ["hone", "hone"],
    ceb: ["dugos", "duˈɡos"],
    hil: ["dugos", "duˈɡos"],
    war: ["dugos", "duˈɡos"],

    // --- The Americas -------------------------------------------------------
    guc: ["mapa", "mapa"],
    car: ["wano", "wano"],
    ote: ["t'afi", "tʼafi"],

    // --- Africa — Bantu *-jókì again, and Manding li -----------------------
    rn: ["ubuki", "ubuki"],
    tum: ["uchi", "utʃi"],
    ts: ["vulombe", "vulombe"],
    umb: ["owiki", "owiki"],
    emk: ["li", "li"],
    mnk: ["liyo", "lijo"],
    ak: ["ɛwoɔ", "ɛwoɔ"],
  },
};
