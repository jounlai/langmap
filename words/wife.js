/**
 * Wife — is she simply a woman?
 * 
 * PARTIAL WORD (🧪). The test is a claim, so it is handled as the we word is. A
 * cell is woman when the row's own source writes wife and woman the same, as
 * French femme and German Frau do, and own when that source gives two different
 * words, as English does. It is spouse when the word for husband is the same form
 * too. One form with no woman word beside it says nothing, so that is unknown,
 * never own. The route does not need a woman concept on the map; the test uses
 * the word for woman in the same list or dictionary. Routes:
 *   woman   the same word as woman
 *   own     a word of its own
 *   spouse  the same word as husband
 *   other   anything else
 */
WORDS.wife = {
  partial: true,
  emoji: "💍",
  label: {
    en: "Wife",
    ja: "妻",
    ko: "아내",
    zh: "妻子",
    yue: "老婆",
    vi: "Vợ",
    th: "ภรรยา",
    id: "Istri",
    hi: "पत्नी",
    de: "Ehefrau",
    fr: "Épouse",
    it: "Moglie",
    es: "Esposa",
    es_eu: "Esposa",
    es_mx: "Esposa",
    pt: "Esposa",
    pt_eu: "Esposa",
    pt_br: "Esposa",
    ru: "Жена",
    uk: "Дружина",
    ar: "زوجة",
    he: "אישה",
    sw: "Mke",
  },
  definition: {
    en: "Wife — the woman in a marriage. Most languages have a word of their own for her, many simply say 'woman', and a few use one word for either spouse.",
    ja: "妻 — 結婚している女性。多くの言語に専用の語があるが、ただ「女」と言う言語も多く、夫婦のどちらにも同じ語を使う言語もわずかにある。",
    ko: "아내 — 혼인한 여성. 대부분의 언어에는 따로 낱말이 있지만, 그저 ‘여자’라고 하는 언어도 많고, 부부 어느 쪽에나 같은 말을 쓰는 언어도 조금 있다.",
    zh: "妻子——婚姻中的女方。大多数语言有专门的词，也有许多语言只说“女人”，少数语言夫妻双方用同一个词。",
    yue: "老婆——婚姻入面嘅女方。大部分語言有專門嘅詞，都有好多語言只係講「女人」，少數語言夫妻雙方用同一個詞。",
    vi: "Vợ — người phụ nữ trong hôn nhân. Phần lớn các tiếng có từ riêng, nhiều tiếng chỉ nói “đàn bà”, và vài tiếng dùng một từ cho cả vợ lẫn chồng.",
    th: "ภรรยา — ฝ่ายหญิงในการสมรส ภาษาส่วนใหญ่มีคำเฉพาะ หลายภาษาเรียกแค่ว่า “ผู้หญิง” และบางภาษาใช้คำเดียวกับคู่สมรสทั้งสองฝ่าย",
    id: "Istri — perempuan dalam pernikahan. Sebagian besar bahasa punya kata sendiri, banyak yang hanya berkata “perempuan”, dan beberapa memakai satu kata untuk suami maupun istri.",
    hi: "पत्नी — विवाह में स्त्री पक्ष। ज़्यादातर भाषाओं में इसका अपना शब्द है, कई में वह बस ‘औरत’ है, और कुछ पति-पत्नी दोनों के लिए एक ही शब्द बरतती हैं।",
    de: "Ehefrau — die Frau in einer Ehe. Die meisten Sprachen haben ein eigenes Wort, viele sagen einfach ‚Frau‘, und einige nehmen ein Wort für beide Eheleute.",
    fr: "Épouse — la femme dans un mariage. La plupart des langues ont un mot à part, beaucoup disent simplement « femme », et quelques-unes ont le même mot pour les deux conjoints.",
    it: "Moglie — la donna in un matrimonio. La maggior parte delle lingue ha una parola propria, molte dicono semplicemente “donna”, e alcune usano una sola parola per entrambi i coniugi.",
    es: "Esposa — la mujer en un matrimonio. La mayoría de las lenguas tiene palabra propia, muchas dicen simplemente «mujer», y algunas usan una sola palabra para ambos cónyuges.",
    es_eu: "Esposa — la mujer en un matrimonio. La mayoría de las lenguas tiene palabra propia, muchas dicen simplemente «mujer», y algunas usan una sola palabra para ambos cónyuges.",
    es_mx: "Esposa — la mujer en un matrimonio. La mayoría de las lenguas tiene palabra propia, muchas dicen simplemente «mujer», y algunas usan una sola palabra para ambos cónyuges.",
    pt: "Esposa — a mulher num casamento. A maioria das línguas tem palavra própria, muitas dizem simplesmente «mulher», e algumas usam uma só palavra para os dois cônjuges.",
    pt_eu: "Esposa — a mulher num casamento. A maioria das línguas tem palavra própria, muitas dizem simplesmente «mulher», e algumas usam uma só palavra para os dois cônjuges.",
    pt_br: "Esposa — a mulher num casamento. A maioria das línguas tem palavra própria, muitas dizem simplesmente «mulher», e algumas usam uma só palavra para os dois cônjuges.",
    ru: "Жена — женщина в браке. В большинстве языков для неё есть своё слово, во многих она просто «женщина», а кое-где одно слово служит обоим супругам.",
    uk: "Дружина — жінка в шлюбі. У більшості мов для неї є своє слово, у багатьох вона просто «жінка», а подекуди чоловіка й дружину називають одним словом.",
    ar: "زوجة — المرأة في الزواج. لمعظم اللغات كلمة خاصة، وفي كثير منها هي «امرأة» فحسب، وقليل منها يستعمل كلمة واحدة للزوجين.",
    he: "אישה — האישה בנישואים. לרוב השפות יש מילה משלהן, ברבות היא פשוט ״אישה״, ובמעטות מילה אחת משמשת את שני בני הזוג.",
    sw: "Mke — mwanamke katika ndoa. Lugha nyingi zaidi zina neno lake, nyingine husema tu “mwanamke”, na chache hutumia neno moja kwa wanandoa wote.",
  },
  family: {
    ab: "woman",
    af: "woman",
    ain: "own",
    ak: "own",
    sq: "woman",
    am: "own",
    ar: "own",
    hy: "woman",
    ast: "own",
    av: "own",
    az: "own",
    ba: "woman",
    eu: "own",
    bbl: "own",
    be: "own",
    bn: "own",
    br: "woman",
    bg: "woman",
    my: "own",
    bxr: "own",
    ca: "woman",
    ceb: "own",
    ce: "woman",
    cic: "own",
    kw: "own",
    cs: "own",
    da: "own",
    nl: "woman",
    fi: "own",
    fkv: "own",
    krl: "own",
    olo: "own",
    vep: "own",
    et: "woman",
    liv: "woman",
    sma: "own",
    smj: "own",
    se: "own",
    smn: "own",
    sms: "own",
    sjd: "own",
    mrj: "own",
    mhr: "own",
    mdf: "own",
    myv: "own",
    udm: "own",
    koi: "own",
    kpv: "own",
    hu: "own",
    kca: "woman",
    hi: "own",
    ps: "own",
    ku: "own",
    os: "woman",
    hyw: "woman",
    el: "spouse",
    aln: "woman",
    hr: "woman",
    sk: "woman",
    pl: "own",
    uk: "woman",
    ru: "own",
    lt: "own",
    lv: "own",
    is: "own",
    nn: "own",
    no: "own",
    sv: "own",
    de: "woman",
    en: "own",
    ga: "own",
    cy: "woman",
    la: "own",
    fr: "woman",
    es: "own",
    pt: "own",
    it: "own",
    ro: "own",
    tr: "own",
    uz: "own",
    kk: "own",
    tt: "woman",
    cv: "own",
    sah: "own",
    mn: "own",
    xal: "own",
    evn: "woman",
    gld: "own",
    ko: "own",
    ja: "own",
    kn: "own",
    ml: "own",
    ta: "own",
    te: "own",
    ka: "own",
    ady: "own",
    lez: "woman",
    dar: "woman",
    he: "own",
    zh: "own",
    ha: "own",
    rap: "own",
    to: "spouse",
    ay: "woman",
    arn: "own",
    dsb: "woman",
    ban: "spouse",
    gay: "unknown",
    jv: "spouse",
    iba: "unknown",
    pam: "spouse",
    bug: "own",
    mad: "unknown",
    mrw: "spouse",
    sm: "unknown",
    tet: "unknown",
    min: "unknown",
    sas: "unknown",
    ljp: "unknown",
    sda: "unknown",
    su: "unknown",
    ami: "woman",
    dtp: "spouse",
    ty: "unknown",
    bs: "woman",
    es_cr: "own",
    es_hn: "own",
    es_ni: "own",
    es_sv: "own",
    fr_lu: "woman",
    fr_cm: "woman",
    de_lu: "woman",
    en_ng2: "own",
    es_bo: "own",
    es_py: "own",
    es_pa: "own",
    en_my: "own",
    en_wls: "own",
    en_jam: "own",
    en_ng: "own",
    en_ph: "own",
    en_ke: "own",
    fr_sn: "woman",
    fr_ci: "woman",
    fr_ht: "woman",
    en_us: "own",
    en_ca: "own",
    en_za: "own",
    ca_va: "woman",
    ja_osa: "own",
    ja_aom: "own",
    ja_hak: "own",
    ja_kyo: "own",
    ja_hir: "own",
    ko_kp: "own",
    ko_bus: "own",
    ko_yb: "own",
    es_mx: "own",
    en_aave: "own",
    en_au: "own",
    en_south: "own",
    en_app: "own",
    en_in: "own",
    en_ie: "own",
    en_sco: "own",
    en_yk: "own",
    en_ck: "own",
    en_scouse: "own",
    en_brum: "own",
    en_manc: "own",
    en_wc: "own",
    en_est: "own",
    en_sg: "own",
    fr_qc: "woman",
    fr_af: "woman",
    fr_be: "woman",
    fr_ch: "woman",
    es_co: "own",
    es_cl: "own",
    es_ar: "own",
    es_cu: "own",
    es_pe: "own",
    es_an: "own",
    ko_hg: "own",
    ko_jl: "own",
    dtp_kzj: "spouse",
    es_pr: "own",
    es_do: "own",
    es_gt: "own",
    es_ec: "own",
    es_uy: "own",
    es_ve: "own",
    alt: "woman",
    ota: "woman",
    sa: "own",
    ltg: "woman",
    mnc: "own",
    fo: "woman",
    vo: "other",
    got: "own",
    dng: "woman",
    sco: "other",
    orv: "woman",
    rif: "woman",
    ug: "woman",
    tsg: "own",
    cjy: "unknown",
    si: "unknown",
    lo: "unknown",
    ki: "own",
    ms: "own",
    blt: "unknown",
    acw: "own",
    xmf: "woman",
    tl: "spouse",
    mr: "own",
    sw: "woman",
    lep: "unknown",
    bew: "own",
    kgp: "unknown",
    eo: "other",
    cu: "woman",
    rm: "woman",
    fy: "woman",
    ang: "woman",
    hsb: "woman",
    as: "own",
    tk: "own",
    lld: "unknown",
    rgn: "own",
    cdo: "other",
    nap: "own",
    scn: "own",
    oc: "woman",
    yi: "woman",
    uga: "woman",
    rue: "woman",
    mg: "other",
    kl: "own",
    crh: "woman",
    ti: "woman",
    sl: "own",
    ks: "own",
    bo: "own",
    ksw: "unknown",
    haw: "woman",
    gan: "other",
    lzz: "own",
    sc: "woman",
    ur: "own",
    wa: "woman",
    vi: "own",
    tg: "woman",
    blk: "unknown",
    yue: "other",
    yua: "unknown",
    abs: "other",
    id: "own",
    pdt: "own",
    ia: "own",
    rup: "own",
    io: "other",
    nv: "woman",
    rom: "woman",
    ckb: "woman",
    wuu: "unknown",
    tyv: "woman",
    km: "own",
    fur: "woman",
    yai: "unknown",
    wo: "own",
    pa: "own",
    mt: "woman",
    sga: "woman",
    hsn: "woman",
    fro: "woman",
    akk: "own",
    yo: "unknown",
    tab: "unknown",
    mnp: "unknown",
    tpn: "own",
    th: "own",
    om: "unknown",
    ky: "woman",
    nmn: "woman",
    hai: "unknown",
    gl: "own",
    mdr: "unknown",
    gu: "own",
    mk: "woman",
    blc: "woman",
    shi: "woman",
    txb: "woman",
    vi_c: "own",
    vi_s: "own",
    wuu_sz: "woman",
    wuu_nb: "unknown",
    wuu_jh: "unknown",
    wuu_wz: "unknown",
    cjy_lv: "unknown",
    cjy_xz: "woman",
    hsn_hy: "woman",
    yue_dg: "other",
    yue_gz: "other",
    yue_nn: "other",
    yue_ts: "other",
    yue_zs: "other",
    rmy: "woman",
    bsq: "unknown",
    cho: "own",
    cop: "woman",
    din: "woman",
    ee: "own",
    fa: "woman",
    fj: "woman",
    jam: "own",
    kbd: "woman",
    kmh: "woman",
    kru: "woman",
    mnk: "woman",
    mwl: "woman",
    naq: "woman",
    new: "unknown",
    nhx: "woman",
    osp: "woman",
    pap: "spouse",
    srn: "woman",
    ssf: "woman",
    tn: "woman",
    tru: "woman",
    vls: "woman",
    vro: "woman",
    wym: "woman",
    zag: "woman",
    pdc: "woman",
    sn: "woman",
    cbk: "woman",
    mwr: "woman",
    an: "woman",
    tpi: "woman",
    kum: "woman",
    prg: "woman",
    ppl: "woman",
    iu: "unknown",
    gag: "woman",
    csb: "woman",
    bm: "woman",
    awa: "woman",
    mfe: "woman",
    mak: "woman",
    brx: "woman",
    xpu: "unknown",
    tcs: "unknown",
    st: "woman",
    kab: "woman",
    ht: "woman",
    ff: "woman",
    bfa: "woman",
    non: "woman",
    goh: "woman",
    kea: "woman",
    stq: "woman",
    nds: "woman",
    lad: "woman",
    pi: "own",
    szl: "own",
    mnw: "woman",
    grt: "own",
    ik: "own",
    ium: "unknown",
    nso: "woman",
    lij: "own",
    orh: "own",
    ofs: "woman",
    lb: "woman",
    rw: "woman",
    ln: "woman",
    nlc: "woman",
    vot: "woman",
    djk: "woman",
    gor: "unknown",
    tar: "unknown",
    dlg: "woman",
    bej: "spouse",
    bgc: "woman",
    ny: "woman",
    xmr: "unknown",
    wal: "unknown",
    ket: "woman",
    egl: "unknown",
    mag: "woman",
    mni: "unknown",
    dv: "unknown",
    lus: "unknown",
    kok: "woman",
    yux: "other",
    udi: "woman",
    sjo: "unknown",
    nag: "woman",
    khw: "unknown",
    eve: "woman",
    sd: "unknown",
    xkz: "unknown",
    txg: "own",
    ett: "unknown",
    squ: "unknown",
    bdq: "unknown",
    ibb: "woman",
    slr: "own",
    ykg: "own",
    xag: "woman",
    yrl: "own",
    bsk: "own",
    tzm: "woman",
    xpg: "woman",
    tay: "woman",
    obr: "unknown",
    pms: "woman",
    fax: "woman",
    dz: "woman",
    mfa: "unknown",
  },
  routes: {
    woman: {"color":"#db2777","emoji":"👩","en":"the same word as woman","ja":"「女」と同じ語","ko":"‘여자’와 같은 말","zh":"与“女人”同词","yue":"同「女人」同一個詞","vi":"cùng một từ với “đàn bà”","th":"คำเดียวกับ “ผู้หญิง”","id":"sama dengan kata “perempuan”","hi":"‘औरत’ वाला ही शब्द","de":"dasselbe Wort wie Frau","fr":"le même mot que femme","it":"la stessa parola di donna","es":"la misma palabra que mujer","pt":"a mesma palavra que mulher","ru":"то же слово, что «женщина»","uk":"те саме слово, що «жінка»","ar":"الكلمة نفسها لـ«امرأة»","he":"אותה מילה כמו ״אישה״","sw":"neno sawa na mwanamke"},
    own: {"color":"#2563eb","emoji":"💍","en":"a word of its own","ja":"独自の語","ko":"따로 있는 말","zh":"专门的词","yue":"專門嘅詞","vi":"một từ riêng","th":"คำเฉพาะ","id":"kata tersendiri","hi":"अपना अलग शब्द","de":"ein eigenes Wort","fr":"un mot à part","it":"una parola propria","es":"una palabra propia","pt":"uma palavra própria","ru":"своё слово","uk":"своє слово","ar":"كلمة خاصة","he":"מילה משלה","sw":"neno lake"},
    spouse: {"color":"#16a34a","emoji":"🤝","en":"the same word as husband","ja":"「夫」と同じ語","ko":"‘남편’과 같은 말","zh":"与“丈夫”同词","yue":"同「老公」同一個詞","vi":"cùng một từ với “chồng”","th":"คำเดียวกับ “สามี”","id":"sama dengan kata “suami”","hi":"‘पति’ वाला ही शब्द","de":"dasselbe Wort wie Ehemann","fr":"le même mot que mari","it":"la stessa parola di marito","es":"la misma palabra que marido","pt":"a mesma palavra que marido","ru":"то же слово, что «муж»","uk":"те саме слово, що «чоловік»","ar":"الكلمة نفسها لـ«زوج»","he":"אותה מילה כמו ״בעל״","sw":"neno sawa na mume"},
    other: {"color":"#6b7280","emoji":"✨","en":"another name","ja":"ほかの名","ko":"다른 이름","zh":"其他名称","yue":"其他名","vi":"tên khác","th":"ชื่ออื่น","id":"nama lain","hi":"कोई और नाम","de":"ein anderer Name","fr":"un autre nom","it":"un altro nome","es":"otro nombre","pt":"outro nome","ru":"другое название","uk":"інша назва","ar":"اسم آخر","he":"שם אחר","sw":"jina jingine"},
    plain: {"color":"#94a3b8","emoji":"📅","en":"a word of its own","ja":"固有の語","ko":"고유어","zh":"自有的词","yue":"自有嘅詞","vi":"từ riêng","th":"คำเฉพาะของภาษา","id":"kata tersendiri","hi":"अपना अलग शब्द","de":"ein eigenes Wort","fr":"un mot propre","it":"una parola propria","es":"una palabra propia","pt":"uma palavra própria","ru":"собственное слово","uk":"власне слово","ar":"كلمة خاصة","he":"מילה משלה","sw":"neno lake lenyewe"},
    unknown: {"color":"#b45309","emoji":"❓","en":"not yet determined · needs a source","ja":"未判定 · 出典待ち","ko":"미판정 · 출처 필요","zh":"尚未判定 · 待查证","yue":"重未判定 · 等考證","vi":"chưa xác định · cần nguồn","th":"ยังไม่ระบุ · รอแหล่งอ้างอิง","id":"belum ditentukan · perlu sumber","hi":"अनिर्धारित · स्रोत चाहिए","de":"noch offen · Beleg fehlt","fr":"non déterminé · source manquante","it":"non determinato · manca la fonte","es":"sin determinar · falta la fuente","pt":"por determinar · falta a fonte","ru":"не определено · нужен источник","uk":"не визначено · потрібне джерело","ar":"لم يُحدَّد بعد · بحاجة إلى مصدر","he":"טרם נקבע · דרוש מקור","sw":"haijabainishwa · chanzo kinahitajika"},
  },
  data: {
    ab: ["аԥҳәыс", "apʰħʷəs"],
    af: ["vrou", "frœu̯"],
    ain: ["マチ", "matʃi"],
    ak: ["ɔyere", "ɔjere"],
    sq: ["grua", "ˈɡɾua"],
    am: ["ሚስት", "mist"],
    ar: ["زوجة", "zawdʒa"],
    hy: ["կին", "kin"],
    ast: ["esposa", "esposa"],
    av: ["лъади", "ɬːadi"],
    az: ["arvad", "ɑɾˈvɑd"],
    ba: ["ҡатын", "qɑˈtɯ̞n"],
    eu: ["emazte", "emaste"],
    bbl: ["ფსტუ", "pstʼu"],
    be: ["жонка", "ˈʐonka"],
    bn: ["বেগম", "beɡom"],
    br: ["gwreg", "ɡwreːk"],
    bg: ["жена", "ʒɛˈna"],
    my: ["မယား", "məjá"],
    bxr: ["һамган", "hamɡan"],
    ca: ["dona", "ˈdonə"],
    ceb: ["asawa", "ʔaˈsawa"],
    ce: ["зуда", "zuudə"],
    cic: ["imihoo", "imihoː"],
    kw: ["gwreg", "ɡwrɛɡ"],
    cs: ["manželka", "ˈmanʒɛlka"],
    da: ["kone", "ˈkʰoːnə"],
    nl: ["vrouw", "vrɑu̯"],
    fi: ["vaimo", "ˈʋɑimo"],
    fkv: ["vaimo", "ˈʋɑimo"],
    krl: ["akka", "ˈɑkːɑ"],
    olo: ["mučoi", "ˈmutʃoi"],
    vep: ["ak", "ak"],
    et: ["naine", "ˈnɑine"],
    liv: ["nai", "nɑi"],
    sma: ["gåmma", "ˈkɔmːa"],
    smj: ["áhkká", "ˈahːka"],
    se: ["áhkká", "ˈaːhkːaː"],
    smn: ["kálgu", "ˈkælɡu"],
    sms: ["ä´ǩǩ", "ˈaccçʲɘ"],
    sjd: ["а̄ххьк", "aːçːk"],
    mrj: ["вӓтӹ", "vætɯ"],
    mhr: ["вате", "vate"],
    mdf: ["ърьвя", "ərʲvʲa"],
    myv: ["ни", "ɲi"],
    udm: ["кышно", "kɨʃno"],
    koi: ["инь", "iɲ"],
    kpv: ["инь", "iɲ"],
    hu: ["feleség", "ˈfɛlɛʃeːɡ"],
    kca: ["ими", "ˈimi"],
    hi: ["बीवी", "biːʋiː"],
    ps: ["مېرمن", "merˈmən"],
    ku: ["kulfet", "kʊlfɛt"],
    os: ["ус", "us"],
    hyw: ["կին", "kin"],
    el: ["σύζυγος", "siziɣos"],
    aln: ["grua", "ɡɾua"],
    hr: ["žena", "ʒěna"],
    sk: ["žena", "ˈʒɛna"],
    pl: ["żona", "ˈʐɔna"],
    uk: ["жінка", "ˈʒinkɐ"],
    ru: ["жена", "ʐɨˈna"],
    lt: ["žmona", "ʒmoˈna"],
    lv: ["sieva", "ˈsiɛva"],
    is: ["eiginkona", "ˈɛijɪŋ̥kɔna"],  // A compound of kona 'woman'.
    nn: ["hustru", "ˈhʉstrʉː"],
    no: ["hustru", "ˈhʉstrʉː"],
    sv: ["hustru", "hɵsːtrɵ"],
    de: ["Frau", "fʁaʊ̯"],
    en: ["wife", "waɪf"],
    ga: ["bean chéile", "bʲan̪ˠ ˈçeːlʲə"],  // A compound of bean 'woman'.
    cy: ["gwraig", "ɡwraɪɡ"],
    la: ["uxor", "ˈuksor"],
    fr: ["femme", "fam"],
    es: ["esposa", "esˈposa"],  // Mujer is also used.
    pt: ["esposa", "ɨʃˈpozɐ"],  // Mulher is also used.
    it: ["moglie", "ˈmoʎʎe"],
    ro: ["soție", "soˈtsie"],
    tr: ["karı", "kaˈɾɯ"],
    uz: ["rafiqa", "rafiqa"],
    kk: ["зайып", "zɑjəp"],
    tt: ["хатын", "χatɤn"],
    cv: ["арӑм", "ˈarəm"],
    sah: ["ойох", "ojox"],
    mn: ["эхнэр", "exner"],
    xal: ["гергн", "ɡerˈɡen"],
    evn: ["асӣ", "asiː"],
    gld: ["аси", "azi"],
    ko: ["아내", "anɛ"],
    ja: ["妻", "tsɯma"],
    kn: ["ಹೆಂಡತಿ", "heŋɖət̪i"],
    ml: ["ഭാര്യ", "bʰaːɾja"],
    ta: ["மனைவி", "manaiʋi"],
    te: ["భార్య", "bʰaːrja"],
    ka: ["ცოლი", "tsʰoli"],
    ady: ["шъуз", "ʂʷəz"],
    lez: ["паб", "pab"],
    dar: ["хьунул", "xunul"],
    he: ["אישה", "iˈʃa"],
    zh: ["妻子", "tɕʰi˥ tsɨ˨˩˦"],
    ha: ["mata", "mata"],
    rap: ["vîʻe", "viʔe"],
    to: ["mali", "mali"],
    ay: ["warmi", "ˈwaɾmi"],
    arn: ["kure", "kuɾe"],
    dsb: ["žeńska", "ˈʒɛɲska"],
    ban: ["kurenan", "kurenan"],
    gay: ["banan", "banan"],
    jv: ["bojo", "bɔdʒɔ"],
    iba: ["bini", "bini"],
    pam: ["asáwa", "asawa"],
    bug: ["baine", "baine"],
    mad: ["bine", "bine"],
    mrw: ["kawiŋ", "kawiŋ"],
    sm: ["āvā", "aːvaː"],
    tet: ["fen", "fen"],
    min: ["bini", "bini"],
    sas: ["səninə", "səninə"],
    ljp: ["majəw", "majəw"],
    sda: ["baine", "baine"],
    su: ["pamajikan", "pamadʒikan"],
    ami: ["fafahi", "fafahi"],
    dtp: ["sao", "sao"],
    ty: ["vahine", "vahine"],
    bs: ["žena", "ˈʒena"],
    es_cr: ["esposa", "esˈposa"],
    es_hn: ["esposa", "esˈposa"],
    es_ni: ["esposa", "esˈposa"],
    es_sv: ["esposa", "esˈposa"],
    fr_lu: ["femme", "fam"],
    fr_cm: ["femme", "fam"],
    de_lu: ["Frau", "fʁaʊ̯"],
    en_ng2: ["wife", "waɪf"],
    es_bo: ["esposa", "esˈposa"],
    es_py: ["esposa", "esˈposa"],
    es_pa: ["esposa", "esˈposa"],
    en_my: ["wife", "waɪf"],
    en_wls: ["wife", "waɪf"],
    en_jam: ["wife", "waɪf"],
    en_ng: ["wife", "waɪf"],
    en_ph: ["wife", "waɪf"],
    en_ke: ["wife", "waɪf"],
    fr_sn: ["femme", "fam"],
    fr_ci: ["femme", "fam"],
    fr_ht: ["femme", "fam"],
    en_us: ["wife", "waɪf"],
    en_ca: ["wife", "waɪf"],
    en_za: ["wife", "wɑɪf"],
    ca_va: ["dona", "ˈdona"],
    ja_osa: ["妻", "tsɯma"],
    ja_aom: ["妻", "tsɯma"],
    ja_hak: ["妻", "tsɯma"],
    ja_kyo: ["妻", "tsɯma"],
    ja_hir: ["妻", "tsɯma"],
    ko_kp: ["아내", "anɛ"],
    ko_bus: ["아내", "anɛ"],
    ko_yb: ["아내", "anɛ"],
    es_mx: ["esposa", "esˈposa"],
    en_aave: ["wife", "waɪf"],
    en_au: ["wife", "wɑɪf"],
    en_south: ["wife", "waɪf"],
    en_app: ["wife", "waɪf"],
    en_in: ["wife", "ʋaɪf"],
    en_ie: ["wife", "waɪf"],
    en_sco: ["wife", "waɪf"],
    en_yk: ["wife", "waɪf"],
    en_ck: ["wife", "waɪf"],
    en_scouse: ["wife", "waɪf"],
    en_brum: ["wife", "wɔɪf"],
    en_manc: ["wife", "waɪf"],
    en_wc: ["wife", "waɪf"],
    en_est: ["wife", "wɑɪf"],
    en_sg: ["wife", "waɪf"],
    fr_qc: ["femme", "fam"],
    fr_af: ["femme", "fam"],
    fr_be: ["femme", "fam"],
    fr_ch: ["femme", "fam"],
    es_co: ["esposa", "esˈposa"],
    es_cl: ["esposa", "esˈposa"],
    es_ar: ["esposa", "esˈposa"],
    es_cu: ["esposa", "esˈposa"],
    es_pe: ["esposa", "esˈposa"],
    es_an: ["esposa", "esˈposa"],
    ko_hg: ["아내", "anɛ"],
    ko_jl: ["아내", "anɛ"],
    dtp_kzj: ["sao", "sao"],
    es_pr: ["esposa", "esˈposa"],
    es_do: ["esposa", "esˈposa"],
    es_gt: ["esposa", "esˈposa"],
    es_ec: ["esposa", "esˈposa"],
    es_uy: ["esposa", "esˈposa"],
    es_ve: ["esposa", "esˈposa"],
    alt: ["кадын", "kadɯn"],  // The same word means woman; from Proto-Turkic *xātun.
    ota: ["قاری", "kaˈɾɯ"],  // The same word means woman.
    sa: ["पत्नी", "pɐtniː"],  // The feminine of पति 'husband, lord'; the word for woman is स्त्री.
    ltg: ["sīva", "ˈsʲiːva"],  // The same word means woman; cognate with Latvian sieva.
    mnc: ["ᠰᠠᡵᡤᠠᠨ", "sarɡan"],  // The word for woman is ᡥᡝᡥᡝ, which can also mean wife.
    fo: ["kona", "ˈkʰoːna"],  // The same word means woman.
    vo: ["jimatan", "ʃimaˈtan"],  // Literally 'female spouse', from ji- 'she-' and matan 'spouse'.
    got: ["𐌵𐌴𐌽𐍃", "kʷeːns"],  // The word for woman is the related 𐌵𐌹𐌽𐍉.
    dng: ["пәе", "pʰə˨˦iə˥˩"],  // The same word means woman; cognate with dialectal Mandarin 婆姨.
    sco: ["guidwife", "ˈɡɪdwəif"],  // Literally 'good woman', from guid 'good' and wife 'woman'.
    orv: ["жена", "ʒena"],  // The same word means woman.
    rif: ["ⵜⴰⵎⵖⴰⵔⵜ", "θamʁaθ"],  // The same word means woman (and mother-in-law); inherited from Proto-Berber *ta-mɣar-t.
    ug: ["خوتۇن", "xotun"],  // The same word means woman; from Proto-Common Turkic *xātun 'queen'.
    tsg: ["asawa", "ʔasawa"],  // Inherited from Proto-Austronesian *qasawa; the word for woman is babai and for husband bana.
    cjy: ["老婆", "lau˥˧ pʰɤ˩"],  // The colloquial word for wife; no woman word from the same source is set beside it.
    si: ["බිරිඳ", "biriⁿdə"],  // No word for woman from the same source is set beside it.
    lo: ["ເມຍ", "miːə̯˧˥"],  // Inherited from Proto-Tai *miəᴬ 'wife'; no woman word from the same source is set beside it.
    ki: ["mũka", "moka"],  // The word for woman is mũtumia, which can also mean a married woman or wife.
    ms: ["isteri", "istəˈri"],  // Borrowed from Sanskrit स्त्री 'woman', but the Malay word for woman is perempuan; bini is the plainer synonym.
    blt: ["ꪣꪸ", "miə̯˥"],  // Inherited from Proto-Tai *miəᴬ 'wife'; no woman word from the same source is set beside it.
    acw: ["زوجة", "zoːdʒa"],  // The Hijazi pronunciation of Arabic زوجة, as in the Arabic row.
    xmf: ["ოსური", "osuri"],  // The same word means woman; from Proto-Kartvelian *asul-.
    tl: ["asawa", "ʔaˈsawa"],  // The same word means spouse and husband; the Spanish loan esposa is also used.
    mr: ["बायको", "bajko"],  // An older use of the word also meant woman, but today's words for woman are बाई and स्त्री.
    sw: ["mke", "ˈm̩ke"],  // Also a contraction of mwanamke 'woman'.
    lep: ["ᰣᰦᰚᰪ", "ʔajɯ"],  // No word for woman from the same source is set beside it.
    bew: ["bini", "bini"],  // Inherited from Malay bini; the entry's own quotation uses prempuan for woman.
    kgp: ["mré nĩ fi", "mɾɛnĩˈɸi"],  // No woman word from the same source is set beside it, and the parts are not glossed.
    eo: ["edzino", "eˈdzino"],  // Read as edzo 'husband, spouse' with the feminine ending -ino; its real origin is uncertain.
    cu: ["жена", "ʒena"],  // The same word means woman.
    rm: ["dunna", "ˈduna"],  // The same word means woman; it comes from Latin domina 'lady of the house'.
    fy: ["frou", "frɔu"],  // The same word means woman; wiif is dated for wife.
    ang: ["wīf", "wiːf"],  // The same word means woman.
    hsb: ["žona", "ˈʒɔna"],  // The same word means woman.
    as: ["ঘৈণী", "ɡʱoini"],  // From Sanskrit gṛhiṇī 'housewife'; the word for woman is মহিলা mohila.
    tk: ["aýal", "ajal"],  // Also 'married woman'; the word for woman is zenan, and gyz is an unmarried woman.
    lld: ["fëna", "ˈfəna"],  // Gherdëina; the entry also gives 'lady' but no separate word for woman.
    rgn: ["mój", "moj"],  // Inherited from Latin mulierem 'woman, wife'; the word for woman is dòna, and mujéṟ is a synonym.
    cdo: ["老妈", "lau˨˦˨ ma˧˧"],  // Literally 'old mother'; the same word means mum and old woman, and is 'wife' in Eastern Min.
    nap: ["mugliera", "muʎˈʎɛrə"],  // From Latin mulierem 'woman'; the word for woman is femmena, which can also mean wife.
    scn: ["mugghieri", "muɟˈɟɛɾi"],  // From Latin mulierem; the word for woman is fìmmina.
    oc: ["femna", "ˈfennɔ"],  // The same word means woman.
    yi: ["פֿרוי", "frɔɪ̯"],  // The same word means woman; ווײַב vayb also means both, but is less respectful.
    uga: ["𐎀𐎘𐎚", "ʔaθθatu"],  // The same word means woman, like Hebrew ʾiššā.
    rue: ["жона", "ʒoˈna"],  // The same word means woman; Prešov and Lemko say жена.
    mg: ["andefimandry", "andefiˈmandri"],  // Literally 'one who lies on the other side of the bed' (ana plus lefitra 'other side' plus mandry 'to lie down').
    kl: ["nuliaq", "nuliaq"],  // Inherited from Proto-Inuit *nuliaʁ; the word for woman is arnaq.
    crh: ["apaqay", "apaqaj"],  // The same word means woman; apay is a synonym.
    ti: ["ሰበይቲ", "sɐbɐjti"],  // The same word means woman.
    sl: ["žena", "ˈʒɛːna"],  // The word for woman is ženska, derived from it.
    ks: ["آشَنؠ", "aːʃanʲ"],  // Inherited from Sanskrit āśraya; the word for woman is زَنانہٕ zanānụ, which can also mean wife.
    bo: ["སྐྱེ་དམན", "ce˥ mɛ̃˥"],  // The word for woman is བུད་མེད bud med.
    ksw: ["မါ", "má"],  // From Proto-Karen *hmaᴬ 'wife'.
    haw: ["wahine", "wahine"],  // The same word means woman; from Proto-Polynesian *fafine 'woman'.
    gan: ["老婆", "lau˨˩˧ pʰo˩˩"],  // Colloquial; written 老 'old' plus 婆 'old woman'.
    lzz: ["ჩილი", "tʃili"],  // From Proto-Kartvelian *c₁olʿ-; the word for woman is ოხორჯა oxorca.
    sc: ["muzere", "muˈdzere"],  // The same word means woman; from Latin mulierem 'woman, wife'.
    ur: ["بیوی", "biːʋiː"],  // Borrowed from Classical Persian bī-bī 'lady'; the word for woman is عورت aurat.
    wa: ["feme", "fɛm"],  // The same word means woman.
    vi: ["vợ", "vəː˧˨ʔ"],  // From Proto-Vietic *-bəːʔ; the word for woman is đàn bà or phụ nữ.
    tg: ["зан", "zan"],  // The same word means woman, from Classical Persian zan.
    blk: ["မာ", "ma̤˧˩"],  // From Proto-Karen *hmaᴬ 'wife', like S'gaw Karen မါ.
    yue: ["老婆", "lou˩˧ pʰɔː˨˩"],  // The everyday colloquial word, written 老 'old' plus 婆 'old woman'; 妻子 cai1 zi2 is formal.
    yua: ["atan", "atan"],  // One word for wife, with no woman word beside it in the source.
    abs: ["maitua", "maitua"],  // mai plus tua 'old', compared with English 'old lady'; it also means girlfriend.
    id: ["istri", "ˈistri"],  // From Sanskrit strī through Malay, and the word for woman is perempuan.
    pdt: ["Wief", "viːf"],  // From Proto-West Germanic *wīb 'woman; wife'; the word for woman is Fru.
    ia: ["uxor", "ukˈsor"],  // The Latin word for wife; the word for woman is femina.
    rup: ["ãnveastã", "ənˈve̯astə"],  // From Proto-Slavic *nevěsta; it also means bride. muljari 'woman' can also mean wife.
    io: ["spozino", "spoˈzino"],  // spozo 'spouse' plus the feminine suffix -ino; the word for woman is muliero.
    nv: ["sheʼesdzáán", "ʃèʔèstsɑ́ːn"],  // 'My wife' is the possessed form of asdzáán 'woman'.
    rom: ["romni", "romni"],  // The same word means a Romani woman; it is rrom 'Romani man' with the feminine suffix -ni.
    ckb: ["ژن", "ʒɪn"],  // The same word means woman.
    wuu: ["老婆", "lɔ˨˨ bu˦˦"],  // The everyday Shanghainese word; no woman word from the same source is set beside it.
    tyv: ["кадай", "qaˈdaj"],  // The same word means woman; it comes from Proto-Turkic *xātun 'queen, lady'.
    km: ["ប្រពន្ធ", "prɑˈpŭən"],  // From Old Khmer prabandha 'bond, tie'; the word for woman is ស្រី.
    fur: ["femine", "ˈfɛmine"],  // The same word means woman; muîr is a synonym for wife.
    yai: ["inč", "intʃ"],  // From Sogdian, ultimately from Proto-Iranian *ǰánHs 'woman'; no Yaghnobi word for woman is given beside it.
    wo: ["jabar", "dʒabar"],  // The word for woman is jigéen; husband is jëkkër.
    pa: ["ਪਤਨੀ", "pətniː"],  // Borrowed from Sanskrit पत्नी; the word for woman is ਔਰਤ.
    mt: ["mara", "ˈmara"],  // The same word means woman, from Arabic imraʔa 'woman; wife'.
    sga: ["ben", "bʲen"],  // The same word means woman; séitig is a synonym for wife.
    hsn: ["堂客", "tan˩˧ kʰɤ˨˦"],  // In Xiang the same word also means a (married) woman.
    fro: ["fame", "ˈfãmə"],  // The same word means woman, especially of lower rank; dame was the word for a lady.
    akk: ["𒁮", "aʃʃatu"],  // The word for woman is sinništu; the sign DAM 'spouse' also writes mutu 'husband'.
    yo: ["aya", "aja"],  // Its husband counterpart is ọkọ; the source gives no woman word beside it.
    tab: ["хпиб", "χpib"],  // Glossed both 'female' and 'wife'; no word for woman is set beside it in the same source.
    mnp: ["老妈", "se˥˥ ma˨˩"],  // In Northern Min this word means wife; elsewhere it means mum or an old woman.
    tpn: ["emirekó", "ɛ̃miɾɛˈkɔ"],  // Literally 'what someone has with oneself'; the word for woman is kunhã.
    th: ["ภรรยา", "pʰan˧ jaː˧"],  // From Sanskrit भार्या 'wife'; it is the formal word, and the word for woman is ผู้หญิง.
    om: ["niitii", "niːtiː"],  // The source gives no word for woman beside it.
    ky: ["аял", "ɑˈjɑl"],  // The same word means woman; it comes through Persian from Arabic ʕayāl 'offspring'.
    nmn: ["tâa qáe", "taa qae"],  // The same phrase means woman: tâa 'person' plus qáe 'female'.
    hai: ["jáa", "dʒáː"],  // The source gives no word for woman beside it.
    gl: ["esposa", "esˈposa"],  // From Latin spōnsa; muller, the word for woman, is also used for wife.
    mdr: ["baine", "bainɛ"],  // From Proto-Malayo-Polynesian *babinahi; the source gives no woman word beside it.
    gu: ["પત્ની", "pətniː"],  // A learned borrowing from Sanskrit पत्नी; the word for woman is નારી, though several woman words can also mean wife.
    mk: ["жена", "ˈʒɛna"],  // The same word means woman; сопруга is a formal synonym.
    blc: ["cnas", "çnas"],  // The same word means woman.
    shi: ["ⵜⴰⵎⵖⴰⵔⵜ", "tamɣart"],  // The same word means woman, from Proto-Berber *ta-mɣar-t 'old woman'.
    txb: ["𑀰𑀦", "ɕana"],  // Tocharian B śana; the same word means woman (Wiktionary).
    vi_c: ["vợ", "vəː˧˩"],  // The same word as standard Vietnamese, with the Huế nặng tone.
    vi_s: ["vợ", "jəː˨˩˨"],  // The same word as standard Vietnamese, with Southern j- for v-.
    wuu_sz: ["女人", "ȵy˨˧˩ ȵiən˨˨˧"],  // The same word as 女人 'woman', listed first for Suzhou.
    wuu_nb: ["老婆", "lɔ˩˩˧ bəu˧˩˧"],  // Literally 'old woman', the everyday word for a wife.
    wuu_jh: ["老婆", "lɑu˥˧˥ bɤ˧˩˧"],  // Literally 'old woman', the everyday word for a wife.
    wuu_wz: ["老安", "lɜ˧˦ ʔjy˧˧"],  // The everyday Wenzhou word for a wife.
    cjy_lv: ["婆姨", "pʰuo˦˦ zɿ˦˦"],  // A northern dialect word for a wife; Wiktionary glosses it wife, married woman.
    cjy_xz: ["女人", "ny˧˩˧ ʐəŋ˧˩"],  // The same word as 女人 'woman', listed first for Xinzhou.
    hsn_hy: ["堂客", "tan˩˩˨ kʰa˨˨"],  // The same word as 堂客 'woman' in Hengyang.
    yue_dg: ["老婆", "lɐu˧˦ pʰɔ˧˩"],  // Literally 'old woman', the everyday word for a wife.
    yue_gz: ["老婆", "lu̯ɔw˨˩˦ pʰɔ˨˩˦"],  // Literally 'old woman', the everyday word for a wife.
    yue_nn: ["老婆", "lu˨˦ pʰɔ˨˩"],  // Literally 'old woman', the everyday word for a wife.
    yue_ts: ["老婆", "lɑu˥˥ pʰuɔ˨˩"],  // Literally 'old woman', the everyday word for a wife.
    yue_zs: ["老婆", "lou˨˩˧ pʰɔ˥˩"],  // Literally 'old woman', the everyday word for a wife.
    rmy: ["romni", "romˈni"],  // The same word as 'Romani woman', the feminine of rom 'Romani man; husband'.
    bsq: ["gmàà", "ŋmã̀ː"],  // The entry gives this one form, with no woman word beside it to compare.
    cho: ["tikchi", "tiktʃi"],  // From tiik 'female' and the family suffix -chi; the same dictionary gives ohoyo for woman.
    cop: ["ⲥϩⲓⲙⲉ", "shime"],  // The same Sahidic word means woman, wife and female; it goes back to Egyptian zt-ḥmt 'woman'.
    din: ["tik", "tik"],  // The same word means woman and wife.
    ee: ["asi", "asi"],  // A word of its own; the same dictionary gives nyɔnu for woman.
    fa: ["زن", "zæn"],  // The same word means woman, wife and female; inherited from Middle Persian zan.
    fj: ["marama", "marama"],  // The same word means lady, woman and wife.
    jam: ["waif", "waif"],  // Inherited from English wife; the same dictionary gives uman for woman.
    kbd: ["фыз", "fəz"],  // The same word means wife and woman; from Proto-Circassian *sʷǝ́zǝ.
    kmh: ["bin", "mbin"],  // The same word means woman and wife.
    kru: ["मुक्का", "mukːaː"],  // The same word means woman and wife.
    mnk: ["muso", "muso"],  // The same word means woman and wife.
    mwl: ["mulhier", "muˈʎjeɾ"],  // The same word means woman and wife; from Latin mulier.
    naq: ["taras", "taras"],  // The same word means female, woman and wife.
    new: ["कलाः", "kəlaː"],  // The entry gives this one form, with no woman word beside it to compare.
    nhx: ["sihua̱ꞌ", "siwaːʔ"],  // The same word means woman and wife; cognate with Classical Nahuatl cihuātl.
    osp: ["mugier", "muˈʒeɾ"],  // From Latin mulierem; the same word means woman and wife.
    pap: ["kasá", "kaˈsa"],  // The same word means wife and husband; from Portuguese dona de casa and Spanish ama de casa.
    srn: ["frow", "frow"],  // The same word means woman and wife; from Dutch vrouw.
    ssf: ["binanau'az", "binanauʔað"],  // The same word means woman, female and wife.
    tn: ["mosadi", "mʊˈsadi"],  // The same word means woman and wife.
    tru: ["ܐܬܬܐ", "aθto"],  // The same word means wife and woman; from Aramaic ʾittəṯā.
    vls: ["wuuf", "wyːf"],  // The same word means woman and wife; from Middle Dutch wijf.
    vro: ["naanõ", "ˈnɑːnɤ"],  // The same word means woman and wife; from Proto-Finnic *nainën.
    wym: ["bōw", "boːf"],  // The same word means woman and wife; from Old High German wīb.
    zag: ["bago", "baɡɔ"],  // The same word means woman and wife.
    pdc: ["Fraa", "frɔː"],  // Fraa means both woman and wife, like German Frau.
    sn: ["mukadzi", "mukadzi"],  // Mukadzi means both woman and wife.
    cbk: ["mujer", "muˈheɾ"],  // Inherited from Spanish mujer; the same word means woman and wife.
    mwr: ["लुगाई", "luɡaːiː"],  // Lugāī means both wife and woman.
    an: ["muller", "muˈʎeɾ"],  // From Latin mulierem; muller means both woman and wife.
    tpi: ["meri", "meri"],  // From English Mary; meri means both woman and wife.
    kum: ["къатын", "qatɯn"],  // Qatın means both woman and wife.
    prg: ["genno", "ˈɡʲænoː"],  // From Proto-Balto-Slavic *génāˀ; genno means both woman and wife, like Russian жена once did.
    ppl: ["siwat", "ˈsiwaːt"],  // Siwat is woman, and possessed it means wife (nusiwaw 'my wife').
    iu: ["ᓄᓕᐊᖅ", "nuliaq"],  // From Proto-Inuit *nuliaʁ; the source gives no woman word beside it.
    gag: ["karı", "kaˈrɯ"],  // Karı is both woman and wife, from Old Anatolian Turkish qarı, 'old person'.
    csb: ["białka", "ˈbjawka"],  // Białka means both woman and wife.
    bm: ["muso", "mùso"],  // Muso means both woman and wife.
    awa: ["मेहरारू", "mehraːruː"],  // Mehrārū means both woman and wife; from Sanskrit mahilā 'woman' plus rūpa.
    mfe: ["fam", "fam"],  // From French femme; fam means both woman and wife.
    mak: ["baine", "baˈine"],  // Baine means woman and also wife.
    brx: ["हिनजाव", "hindʒao"],  // Hinjao means both woman and wife.
    xpu: ["𐤀𐤎𐤕", "ʔist"],  // The source gives one word for wife and no woman word beside it.
    tcs: ["oman", "oman"],  // From English woman; the source glosses it as wife or a married woman and gives no separate woman word.
    st: ["mosadi", "mʊsadi"],  // Mosadi means both woman and wife.
    kab: ["tameṭṭut", "tamətˤːut"],  // Tameṭṭut means both woman and wife.
    ht: ["fanm", "fãm"],  // From French femme; fanm means both wife and woman.
    ff: ["debbo", "debːo"],  // Debbo means both woman and wife.
    bfa: ["nakwan", "nakwan"],  // Nakwan means both woman and wife.
    non: ["kona", "ˈkonɑ"],  // The same word means woman; from Proto-Germanic kwenǭ.
    goh: ["wīb", "wiːb"],  // The same word means woman; from Proto-West Germanic wīb.
    kea: ["mudjér", "muˈdʒɛɾ"],  // The same word means woman; from Portuguese mulher.
    stq: ["Wieuw", "viu̯"],  // The same word means woman; from Old Frisian wīf.
    nds: ["Fro", "froː"],  // The same word means woman; Fro can be short for Ehfro.
    lad: ["mujer", "muˈʒeɾ"],  // The same word means woman; from Old Spanish mugier, from Latin mulier.
    pi: ["भरिया", "bʱarijaː"],  // From Sanskrit bhāryā; the word for woman is itthī.
    szl: ["żōna", "ˈʐona"],  // Inherited from Old Polish żona; the word for woman is kobiyta.
    mnw: ["ဗြဴ", "prɛ̀a"],  // The same word means woman and female.
    grt: ["jik", "dʒik"],  // From Proto-Bodo-Garo jɯk 'wife'; the word for woman is me·chik.
    ik: ["nuliaq", "nuliaq"],  // From Proto-Eskimo nuLiaq; the word for woman is aġnaq.
    ium: ["auv", "au˦"],  // From Chinese 媼.
    nso: ["mosadi", "mosadi"],  // The same word means woman.
    lij: ["mogê", "muˈdʒeː"],  // From Latin mulierem; the word for woman is dònna.
    orh: ["atɪrkan", "atɪrkan"],  // The word for woman is aʃɪ.
    ofs: ["wīf", "wiːf"],  // The same word means woman; from Proto-Germanic wībą.
    lb: ["Fra", "fraː"],  // The same word means woman; from Old High German frouwa.
    rw: ["umugore", "umuɡoɾe"],  // The same word means woman.
    ln: ["mwǎsí", "mwǎsí"],  // The same word means woman.
    nlc: ["gel", "ɡel"],  // The same word means woman.
    vot: ["nain", "nain"],  // The same word means woman; from Proto-Finnic nainën.
    djk: ["uman", "uman"],  // The same word means woman; from English woman.
    gor: ["binggele", "biŋɡele"],  // No word for woman is given beside it, so the route is not known.
    tar: ["upí", "upi"],  // Cognate with Mayo juubi 'wife'; no word for woman is given beside it.
    dlg: ["дьактар", "dʲaktar"],  // The same word means woman; cognate with Yakut дьахтар.
    bej: ["hiyu", "ˈhiju"],  // The same word means husband.
    bgc: ["बीर", "biːr"],  // The same word means woman.
    ny: ["mkazi", "m̩ˈkazi"],  // The same word means woman; from Proto-Bantu mʊ̀kádí.
    xmr: ["𐦱𐦨", "səma"],  // No word for woman is given beside it.
    wal: ["machchiyo", "matʃːijo"],  // The source gives this one word for wife; no word for woman is beside it, so the route is unknown.
    ket: ["ӄим", "qʲim"],  // One word for woman and wife, inherited from Proto-Yeniseian *qim 'woman'.
    egl: ["mujêr", "muˈjeːr"],  // From Latin mulier; the source glosses it only as wife and gives no woman word beside it.
    mag: ["मेहरारू", "meːhraːruː"],  // One word for woman and wife.
    mni: ["ꯇꯥꯂꯣꯏ", "taloi"],  // The source gives this one word for wife; no word for woman is beside it, so the route is unknown.
    dv: ["އަނބި", "aᵐbi"],  // Inherited from Sanskrit ambā; the source gives no word for woman beside it, so the route is unknown.
    lus: ["nupui", "nupui"],  // Nu 'mother' + -pui, an augmentative suffix; the source gives no word for woman beside it, so the route is unknown.
    kok: ["बायल", "baːjl"],  // One word for woman and wife.
    yux: ["тэрикэ", "terɪkə"],  // The same word means old woman; borrowed from Russian старуха 'old woman'.
    udi: ["чугьух", "tʃuhuχ"],  // One word for woman and wife (Nij dialect), from Caucasian Albanian čibux̣.
    sjo: ["ᡨᠠᡞᡨᠠᡞ", "tʰɑitʰɑi"],  // Borrowed from Mandarin 太太 tàitai; the source gives no word for woman beside it, so the route is unknown.
    nag: ["maiki", "maiki"],  // One word for woman and wife, from Assamese মাইকী.
    khw: ["بؤوک", "bɔˈʊk"],  // From Sanskrit vadhūkkā 'bride'; the source gives no word for woman beside it, so the route is unknown.
    eve: ["аси", "asi"],  // One word for woman and wife, from Proto-Tungusic *asī.
    sd: ["جوءِ", "dʒoːi"],  // Inherited from Prakrit juvaï, from Sanskrit युवति yuvatí 'young woman'; the entry gives no word for woman beside it.
    xkz: ["’nêsang", "néːsaŋ"],  // Related to Dzongkha གནས་ཚང gnas tshang; the source gives no word for woman beside it.
    txg: ["𗪰", "ɡji˧˥"],  // A word of its own; the word for woman is 𗶈 *dẹ¹.
    ett: ["puia", "ˈpuia"],  // Perhaps related somehow to Ancient Greek ὀπυίω 'to marry'; no Etruscan word for woman stands beside it.
    squ: ["chewásh", "tʃəwaʃ"],  // A married woman; the source gives no word for woman beside it.
    bdq: ["akăn", "ʔakan"],  // From Proto-Bahnaric *ʔəkan 'wife', a prefixed form of *kan 'female'; the source gives no word for woman beside it.
    ibb: ["n̄n̄waan", "ŋ̍ŋwaːn"],  // The same word means woman and wife (and female).
    slr: ["kiyne", "kʰijni"],  // From Proto-Turkic *kẹlin; the word for woman is a different one, qadın.
    ykg: ["мирийэ", "mirije"],  // From Proto-Yukaghir *mirijə; the word for woman is a different one, пайпэ.
    xag: ["čibux̣", "tʃibuχ"],  // From Proto-Lezghian; the same word means woman and wife.
    yrl: ["imirikú", "imiɾiˈku"],  // Inherited from Old Tupi emirekó; the word for woman is a different one, kunhã.
    bsk: ["yuus", "juːs"],  // The word for woman is a different one, gus.
    tzm: ["ⵜⴰⵎⵟⵟⵓⵜⵜ", "tamtˤːutː"],  // Inherited from Proto-Berber; the same word means woman and wife.
    xpg: ["knais", "knais"],  // From Proto-Indo-European *gʷneh₂- 'woman'; the same word means woman and wife.
    tay: ["kneril", "kəneril"],  // The same word means woman and wife.
    obr: ["မိယဟ်", "mijah"],  // From Proto-Lolo-Burmese *m-ja² 'wife'.
    pms: ["fomna", "ˈfumnɐ"],  // From Latin fēmina; the same word means woman and wife.
    fax: ["mullel", "muˈʎel"],  // Inherited from Old Galician-Portuguese moller; the same word means woman and wife.
    dz: ["ཨམ་སྲུ", "amsu"],  // The same word means woman and wife.
    mfa: ["bining", "biniŋ"],  // Inherited from Proto-Malayic *bini.
  },
};
