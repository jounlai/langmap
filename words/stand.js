/**
 * stand — new basic word (2026-11-28). Cells drafted by family, each source reopened by a check.
 * Routes by etymon to follow in a separate pass; until then every cell is `plain`.
 */
WORDS.stand = {
  partial: true,
  emoji: "🧍",
  label: {
    en: "Stand",
    ja: "立つ",
    ko: "서다",
    zh: "站",
    yue: "企",
    vi: "Đứng",
    th: "ยืน",
    id: "Berdiri",
    hi: "खड़ा होना",
    de: "Stehen",
    fr: "Se tenir debout",
    it: "Stare in piedi",
    es: "Estar de pie",
    es_eu: "Estar de pie",
    es_mx: "Estar de pie",
    pt: "Estar de pé",
    pt_eu: "Estar de pé",
    pt_br: "Estar de pé",
    ru: "Стоять",
    uk: "Стояти",
    ar: "وقف",
    he: "לעמוד",
    sw: "Kusimama",
  },
  definition: {
    en: "Stand — to be upright on the feet. Where a language has one verb for stand and stand up, that verb counts here. The verb is shown in the form each language row uses for eat and drink.",
    ja: "立つ — 足で体をまっすぐ支えていること。「立っている」と「立ち上がる」を一語で言う言語では、その語がここに入る。動詞は、各言語の行が「食べる」「飲む」に使う形で載せる。",
    ko: "서다 — 발로 몸을 곧게 지탱하는 것. '서 있다'와 '일어서다'를 한 낱말로 부르는 언어에서는 그 낱말이 여기에 든다.동사는 각 언어 행이 '먹다' '마시다'에 쓰는 형태로 싣는다.",
    zh: "站——用脚把身体直立撑住。若一种语言的“站着”和“站起来”是同一个动词，就收这个词。动词采用各语言行在“吃”“喝”中所用的形式。",
    yue: "企——用腳企直撐住身體。如果一種語言「企住」同「企起身」係同一個動詞，就收呢個詞。動詞用每個語言行喺「食」「飲」度用嘅形式。",
    vi: "Đứng — giữ thân thẳng trên hai chân. Nếu một ngôn ngữ dùng một động từ cho \"đang đứng\" và \"đứng dậy\", từ đó được tính ở đây. Động từ được ghi theo dạng mà mỗi hàng ngôn ngữ dùng cho \"ăn\" và \"uống\".",
    th: "ยืน — ตั้งตัวตรงอยู่บนเท้า หากภาษาใดใช้คำเดียวสำหรับ \"ยืนอยู่\" และ \"ลุกขึ้นยืน\" คำนั้นนับรวมที่นี่ คำกริยาใช้รูปเดียวกับที่แต่ละแถวภาษาใช้กับ \"กิน\" และ \"ดื่ม\"",
    id: "Berdiri — tegak di atas kaki. Bila satu kata kerja dipakai untuk \"sedang berdiri\" dan \"bangkit berdiri\", kata itu dihitung di sini. Kata kerja ditulis dalam bentuk yang dipakai tiap baris bahasa untuk \"makan\" dan \"minum\".",
    hi: "खड़ा होना — पैरों पर सीधा रहना। जहाँ \"खड़े रहना\" और \"उठ खड़े होना\" के लिए एक ही क्रिया है, वह यहाँ गिनी जाती है। क्रिया उसी रूप में दी गई है जो हर भाषा की पंक्ति \"खाना\" और \"पीना\" के लिए रखती है।",
    de: "Stehen — aufrecht auf den Füßen sein. Wo ein Verb stehen und aufstehen umfasst, zählt es hier. Das Verb steht in der Form, die jede Sprachzeile für essen und trinken verwendet.",
    fr: "Se tenir debout — être droit sur ses pieds. Là où un même verbe signifie être debout et se lever, il compte ici. Le verbe est donné sous la forme que chaque ligne de langue emploie pour manger et boire.",
    it: "Stare in piedi — stare dritti sui piedi. Dove un solo verbo significa stare in piedi e alzarsi, conta qui. Il verbo è dato nella forma che ogni riga usa per mangiare e bere.",
    es: "Estar de pie — mantenerse erguido sobre los pies. Donde un verbo abarca estar de pie y levantarse, cuenta aquí. El verbo aparece en la forma que cada fila de lengua usa para comer y beber.",
    es_eu: "Estar de pie — mantenerse erguido sobre los pies. Donde un verbo abarca estar de pie y levantarse, cuenta aquí. El verbo aparece en la forma que cada fila de lengua usa para comer y beber.",
    es_mx: "Estar de pie — mantenerse erguido sobre los pies. Donde un verbo abarca estar de pie y levantarse, cuenta aquí. El verbo aparece en la forma que cada fila de lengua usa para comer y beber.",
    pt: "Estar de pé — manter-se ereto sobre os pés. Onde um verbo abrange estar de pé e levantar-se, conta aqui. O verbo aparece na forma que cada linha de língua usa para comer e beber.",
    pt_eu: "Estar de pé — manter-se ereto sobre os pés. Onde um verbo abrange estar de pé e levantar-se, conta aqui. O verbo aparece na forma que cada linha de língua usa para comer e beber.",
    pt_br: "Estar de pé — manter-se ereto sobre os pés. Onde um verbo abrange estar de pé e levantar-se, conta aqui. O verbo aparece na forma que cada linha de língua usa para comer e beber.",
    ru: "Стоять — держаться прямо на ногах. Где один глагол значит и «стоять», и «встать», он здесь учитывается. Глагол дан в той форме, в какой каждая строка языка даёт «есть» и «пить».",
    uk: "Стояти — триматися прямо на ногах. Де одне дієслово означає і «стояти», і «встати», воно тут ураховується. Дієслово подано в тій формі, у якій кожен рядок мови подає «їсти» і «пити».",
    ar: "وقف — الانتصاب على القدمين. حيث يجمع فعل واحد معنى الوقوف والنهوض يُحسب هنا. يُعطى الفعل بالصيغة التي يستعملها كل سطر لغوي لـ«أكل» و«شرب».",
    he: "לעמוד — להיות זקוף על הרגליים. כשפועל אחד משמש ל\"עומד\" ול\"קם\", הוא נחשב כאן. הפועל ניתן בצורה שכל שורה משתמשת בה ל\"לאכול\" ו\"לשתות\".",
    sw: "Kusimama — kuwa wima kwa miguu. Kitenzi kimoja kikitumika kwa kusimama na kuinuka, kinahesabiwa hapa. Kitenzi kimeandikwa katika umbo ambalo kila mstari wa lugha hutumia kwa \"kula\" na \"kunywa\".",
  },
  family: {
    aa: "plain",
    abs: "plain",
    ace: "plain",
    acn: "plain",
    adt: "plain",
    ady: "plain",
    af: "plain",
    agt: "plain",
    agx: "plain",
    ain: "plain",
    ak: "plain",
    akb: "plain",
    alt: "plain",
    am: "plain",
    ami: "plain",
    ang: "plain",
    ani: "plain",
    aqc: "plain",
    ar: "plain",
    arn: "plain",
    as: "plain",
    az: "plain",
    azb: "plain",
    ba: "plain",
    ban: "plain",
    bdk: "plain",
    be: "plain",
    bej: "plain",
    bg: "plain",
    bik: "plain",
    bjn: "plain",
    blc: "plain",
    blr: "plain",
    bn: "plain",
    bs: "plain",
    bto: "plain",
    btx: "plain",
    bxd: "plain",
    bxr: "plain",
    cab: "plain",
    cak: "plain",
    cdo: "plain",
    ce: "plain",
    ceb: "plain",
    chr: "plain",
    cjy: "plain",
    ckb: "plain",
    ckt: "plain",
    cnh: "plain",
    cni: "plain",
    cnp: "plain",
    cpx: "plain",
    crh: "plain",
    cs: "plain",
    cu: "plain",
    cv: "plain",
    cy: "plain",
    da: "plain",
    dar: "plain",
    de: "plain",
    de_at: "plain",
    de_ch: "plain",
    dru: "plain",
    dsb: "plain",
    dta: "plain",
    dtp: "plain",
    ebu: "plain",
    ee: "plain",
    el: "plain",
    en: "plain",
    en_aave: "plain",
    en_app: "plain",
    en_au: "plain",
    en_brum: "plain",
    en_ca: "plain",
    en_ck: "plain",
    en_est: "plain",
    en_geordie: "plain",
    en_ie: "plain",
    en_in: "plain",
    en_jam: "plain",
    en_ke: "plain",
    en_manc: "plain",
    en_ng: "plain",
    en_nz: "plain",
    en_ph: "plain",
    en_sco: "plain",
    en_scouse: "plain",
    en_sg: "plain",
    en_south: "plain",
    en_us: "plain",
    en_wc: "plain",
    en_wls: "plain",
    en_yk: "plain",
    en_za: "plain",
    enm: "plain",
    enq: "plain",
    eo: "plain",
    et: "plain",
    eu: "plain",
    evn: "plain",
    fa: "plain",
    fa_clas: "plain",
    ff: "plain",
    fi: "plain",
    fo: "plain",
    fra_jer: "plain",
    frr: "plain",
    fur: "plain",
    fy: "plain",
    ga: "plain",
    gag: "plain",
    gan: "plain",
    gd: "plain",
    gez: "plain",
    gil: "plain",
    gmh: "plain",
    gn: "plain",
    goh: "plain",
    gor: "plain",
    got: "plain",
    gqu: "plain",
    grt: "plain",
    gsw: "plain",
    guz: "plain",
    gv: "plain",
    h_vedic: "plain",
    hak_cn: "plain",
    hak_hl: "plain",
    hak_tw: "plain",
    haw: "plain",
    hi: "plain",
    hil: "plain",
    hmn: "plain",
    hot: "plain",
    hr: "plain",
    hsn: "plain",
    ht: "plain",
    hu: "plain",
    hui: "plain",
    huz: "plain",
    hy: "plain",
    ia: "plain",
    ibg: "plain",
    id: "plain",
    ii: "plain",
    ilo: "plain",
    inh: "plain",
    is: "plain",
    itb: "plain",
    itl: "plain",
    ium: "plain",
    izh: "plain",
    ja: "plain",
    ja_heian: "plain",
    ja_oki: "plain",
    jio: "plain",
    jiu: "plain",
    jra: "plain",
    jv: "plain",
    ka: "plain",
    kab: "plain",
    kam: "plain",
    kbd: "plain",
    kca: "plain",
    kde: "plain",
    kek: "plain",
    ket: "plain",
    kgg: "plain",
    khv: "plain",
    ki: "plain",
    kk: "plain",
    kl: "plain",
    km: "plain",
    kmc: "plain",
    kn: "plain",
    ko: "plain",
    ko_em: "plain",
    ko_jeju: "plain",
    ko_mid: "plain",
    koi: "plain",
    kos: "plain",
    kpf: "plain",
    kpv: "plain",
    krc: "plain",
    krj: "plain",
    krl: "plain",
    ksb: "plain",
    ksh: "plain",
    kw: "plain",
    ky: "plain",
    la: "plain",
    la_late: "plain",
    lbe: "plain",
    lez: "plain",
    lg: "plain",
    lhu: "plain",
    li: "plain",
    lic: "plain",
    liv: "plain",
    ln: "plain",
    lt: "plain",
    lus: "plain",
    lv: "plain",
    max: "plain",
    mch: "plain",
    mdf: "plain",
    mdh: "plain",
    meu: "plain",
    mg: "plain",
    mhr: "plain",
    mi: "plain",
    mk: "plain",
    ml: "plain",
    mlm: "plain",
    mmd: "plain",
    mn: "plain",
    mn_cn: "plain",
    mnc: "plain",
    mnp: "plain",
    mns: "plain",
    mqy: "plain",
    mra: "plain",
    ms: "plain",
    my: "plain",
    myx: "plain",
    mzh: "plain",
    nan: "plain",
    nan_hai: "plain",
    nan_ph: "plain",
    nan_pn: "plain",
    nan_te: "plain",
    nan_xm: "plain",
    nan_zz: "plain",
    nci: "plain",
    nds: "plain",
    ne: "plain",
    nha: "plain",
    nia: "plain",
    nij: "plain",
    nio: "plain",
    niv: "plain",
    nl: "plain",
    nmf: "plain",
    nn: "plain",
    no: "plain",
    nog: "plain",
    non: "plain",
    nv: "plain",
    nyn: "plain",
    nzm: "plain",
    och: "plain",
    oj: "plain",
    olo: "plain",
    orh: "plain",
    orv: "plain",
    os: "plain",
    osx: "plain",
    ota: "plain",
    ote: "plain",
    otk: "plain",
    p_dra: "plain",
    p_ine: "plain",
    p_sit: "plain",
    p_tun: "plain",
    pag: "plain",
    pam: "plain",
    pao: "plain",
    pap: "plain",
    pau: "plain",
    pban: "plain",
    pbb: "plain",
    pdc: "plain",
    pi_edu: "plain",
    pjt: "plain",
    pl: "plain",
    pll: "plain",
    pmi: "plain",
    prs: "plain",
    ptrk: "plain",
    pzh: "plain",
    qu: "plain",
    quc: "plain",
    quy: "plain",
    quz: "plain",
    rad: "plain",
    rbb: "plain",
    rn: "plain",
    rsk: "plain",
    ru: "plain",
    ruq: "plain",
    rut: "plain",
    rw: "plain",
    sa: "plain",
    sa_edu: "plain",
    sah: "plain",
    sat: "plain",
    sbp: "plain",
    sco: "plain",
    sda: "plain",
    se: "plain",
    sel: "plain",
    shx: "plain",
    si: "plain",
    sjd: "plain",
    sk: "plain",
    sl: "plain",
    sm: "plain",
    sma: "plain",
    smj: "plain",
    sr: "plain",
    srh: "plain",
    srm: "plain",
    ssf: "plain",
    stq: "plain",
    suk: "plain",
    sux: "plain",
    sv: "plain",
    sw: "plain",
    ta: "plain",
    tab: "plain",
    tet: "plain",
    th: "plain",
    tk: "plain",
    tkr: "plain",
    tlh: "plain",
    to: "plain",
    tpi: "plain",
    tpn: "plain",
    tr: "plain",
    tsg: "plain",
    tsi: "plain",
    tt: "plain",
    ttj: "plain",
    tue: "plain",
    twm: "plain",
    ty: "plain",
    tyv: "plain",
    udm: "plain",
    ug: "plain",
    uk: "plain",
    ur: "plain",
    uz: "plain",
    vep: "plain",
    vi: "plain",
    vi_c: "plain",
    vi_han: "plain",
    vi_s: "plain",
    vro: "plain",
    wbp: "plain",
    wls: "plain",
    wuu: "plain",
    wuu_hz: "plain",
    wuu_jh: "plain",
    wuu_nb: "plain",
    wuu_sz: "plain",
    wuu_wz: "plain",
    wym: "plain",
    xal: "plain",
    xul: "plain",
    yao: "plain",
    ygr: "plain",
    yi: "plain",
    ykg: "plain",
    yrk: "plain",
    yrl: "plain",
    yue: "plain",
    yue_dg: "plain",
    yue_nn: "plain",
    yue_ts: "plain",
    yue_zs: "plain",
    za: "plain",
    zh: "plain",
    zh_cd: "plain",
    zh_db: "plain",
    zh_han: "plain",
    zh_hf: "plain",
    zh_jh: "plain",
    zh_jn: "plain",
    zh_lz: "plain",
    zh_nj: "plain",
    zh_sc: "plain",
    zh_tang: "plain",
    zh_tj: "plain",
    zh_tw: "plain",
    zh_wenyan_edu: "plain",
    zh_wh: "plain",
    zh_xa: "plain",
    zh_yuan: "plain",
    zu: "plain",
  },
  routes: {
    plain: {"color":"#94a3b8","emoji":"📅","en":"a word of its own","ja":"固有の語","ko":"고유어","zh":"自有的词","yue":"自有嘅詞","vi":"từ riêng","th":"คำเฉพาะของภาษา","id":"kata tersendiri","hi":"अपना शब्द","de":"ein eigenes Wort","fr":"un mot propre","it":"una parola propria","es":"una palabra propia","pt":"uma palavra própria","ru":"собственное слово","uk":"власне слово","ar":"كلمة خاصة","he":"מילה משלה","sw":"neno lake lenyewe"},
  },
  data: {
    aa: ["soolé", "soːle"],  // en.wiktionary soole (Afar); stand translations.
    abs: ["badiri", "badiri"],  // ABVD.
    ace: ["dong", "dɔŋ"],  // ABVD.
    acn: ["ʑap55", "ʑap˥˥"],  // lexibank suntb / sagartst / peirosst / lamanisoic; STEDT; Wiktionary.
    adt: ["yuwa-", "juwa"],  // lexibank bowernpny.
    ady: ["щытын", "ɕətən"],  // Wiktionary.
    af: ["staan", "stɑːn"],  // Wiktionary (+lexibank).
    agt: ["mʌgtayuk", "mʌɡtajuk"],  // ABVD.
    agx: ["гъузанас", "ʁuzanas"],  // lexibank IDS.
    ain: ["アㇱ", "as"],  // Wiktionary.
    ak: ["gyina", "dʑina"],  // en.wiktionary gyina (Akan).
    akb: ["diri", "diri"],  // ABVD.
    alt: ["турар", "tuˈrar"],  // Wiktionary (en) translation table + Wiktionary entry (kaikki.org) + Savelyev Turkic (lexibank).
    am: ["መቆም", "məkʼom"],  // Module:Swadesh/data/am; en.wiktionary መቆም.
    ami: ["tumireng", "tumiɾəŋ"],  // ABVD.
    ang: ["standan", "ˈstɑndɑn"],  // Wiktionary + IE-CoR.
    ani: ["зуди вигъиду", "zudi wiʁidu"],  // lexibank IDS.
    aqc: ["оцис", "otsis"],  // lexibank IDS/WOLD.
    ar: ["وقف", "waqafa"],  // en.wiktionary stand translations; NorthEuraLex; Swadesh ar.
    arn: ["witrapüran", "wiʈʂapɨɻan"],  // lexibank WOLD.
    as: ["থিয় হোৱা", "tʰiɔ ɦʊa"],  // Wiktionary.
    az: ["durmaq", "durˈmɑx"],  // Wiktionary (en) translation table + Wiktionary entry (kaikki.org) + NorthEuraLex.
    azb: ["دورماق", "durˈmɑɡ"],  // Wiktionary az entry Arabic-script variant ({{az-variant}}) + Wiktionary (en) translation table.
    ba: ["тороу", "toˈrow"],  // Wiktionary (en) translation table + Wiktionary entry (kaikki.org) + NorthEuraLex.
    ban: ["majujuk", "madʒudʒuk"],  // ABVD.
    bdk: ["агъми йихьар", "aʁmi jixar"],  // lexibank IDS.
    be: ["стаяць", "staˈjatsʲ"],  // Wiktionary + NorthEuraLex/IE-CoR.
    bej: ["gada", "ɡada"],  // Module:Swadesh/data/bej.
    bg: ["стоя", "stoˈjɤ"],  // Wiktionary + IDS.
    bik: ["tindog", "tinˈdoɡ"],  // Wiktionary.
    bjn: ["badiri", "badiri"],  // ABVD.
    blc: ["łm", "ɬm"],  // IDS.
    blr: ["ćɔŋ51", "tɕɔŋ˥˩"],  // Peiros Austroasiatic (lexibank/peirosaustroasiatic).
    bn: ["দাঁড়ানো", "dãɽano"],  // Wiktionary; NorthEuraLex.
    bs: ["stajati", "ˈstajati"],  // Wiktionary + NorthEuraLex.
    bto: ["tindog", "tinˈdoɡ"],  // ABVD.
    btx: ["cinder", "tʃindər"],  // lexibank ABVD.
    bxd: ["jɛʔ55", "jɛʔ˥˥"],  // lexibank sagartst/peirosst.
    bxr: ["зогсохо", "zoɡsoxo"],  // NorthEuraLex + Robbeets et al. triangulation.
    cab: ["ararama", "aɾaɾama"],  // lexibank walkerarawakan (Garifuna).
    cak: ["paʼeʼ", "paʔeʔ"],  // Wiktionary.
    cdo: ["徛", "kʰiɛ˨˦˨"],  // Wiktionary dial-syn + Wiktionary + MCPDict + lexibank.
    ce: ["латта", "latta"],  // Wiktionary.
    ceb: ["tindog", "ˈtindoɡ"],  // Wiktionary.
    chr: ["ᎦᏙᎦ", "ɡadoɡa"],  // Wiktionary.
    cjy: ["站", "tsæ̃˦˥"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    ckb: ["وەستان", "wastaːn"],  // Wiktionary (translation table); DiACL; IE-CoR.
    ckt: ["вэтчатвак", "wettɕatwak"],  // lexibank northeuralex.
    cnh: ["dir", "dir"],  // lexibank sagartst / peirosst.
    cni: ["nokatia", "nokatia"],  // lexibank walkerarawakan (Asháninka).
    cnp: ["徛", "ki˨˦"],  // Wiktionary dial-syn + MCPDict.
    cpx: ["徛", "kʰyɒ˩˩"],  // Wiktionary dial-syn + Wiktionary + MCPDict + lexibank.
    crh: ["turmaq", "turˈmaq"],  // Wiktionary (en) translation table + Wiktionary entry (kaikki.org) + Savelyev Turkic (lexibank).
    cs: ["stát", "staːt"],  // Wiktionary + NorthEuraLex/IE-CoR.
    cu: ["стоꙗти", "stojati"],  // Wiktionary.
    cv: ["тӑр", "tər"],  // NorthEuraLex + Savelyev Turkic (lexibank).
    cy: ["sefyll", "ˈsɛvɨɬ"],  // Wiktionary (+lexibank).
    da: ["stå", "sd̥ɔˀ"],  // Wiktionary (+lexibank).
    dar: ["тӏашилзес", "tʼaʃilzes"],  // lexibank IDS.
    de: ["stehen", "ˈʃteːən"],  // Wiktionary (+lexibank).
    de_at: ["stehen", "ˈʃteːən"],  // Wiktionary (+lexibank).
    de_ch: ["stehen", "ˈʃteːən"],  // Wiktionary (+lexibank).
    dru: ["waidi", "waidi"],  // ABVD.
    dsb: ["stojaś", "ˈstɔjaɕ"],  // Wiktionary + WOLD/IE-CoR.
    dta: ["bai-", "bai"],  // Robbeets et al. triangulation + Starostin Altaic (lexibank).
    dtp: ["ingkakat", "iŋkakat"],  // ABVD.
    ebu: ["kũrũgama", "koɾoɣama"],  // lexibank tls Embu.
    ee: ["tsitrɛ", "tsitrɛ"],  // en.wiktionary stand translations; tsitrɛ (Ewe).
    el: ["στέκομαι", "ˈstekome"],  // Wiktionary + NorthEuraLex.
    en: ["stand", "stænd"],  // Wiktionary (+lexibank).
    en_aave: ["stand", "stæːnd"],  // Wiktionary (+lexibank).
    en_app: ["stand", "stænd"],  // Wiktionary (+lexibank).
    en_au: ["stand", "stæːnd"],  // Wiktionary (+lexibank).
    en_brum: ["stand", "stand"],  // Wiktionary (+lexibank).
    en_ca: ["stand", "stænd"],  // Wiktionary (+lexibank).
    en_ck: ["stand", "stænd"],  // Wiktionary (+lexibank).
    en_est: ["stand", "stænd"],  // Wiktionary (+lexibank).
    en_geordie: ["stand", "stand"],  // Wiktionary (+lexibank).
    en_ie: ["stand", "stand"],  // Wiktionary (+lexibank).
    en_in: ["stand", "stænɖ"],  // Wiktionary (+lexibank).
    en_jam: ["stand", "stand"],  // Wiktionary (+lexibank).
    en_ke: ["stand", "stænd"],  // Wiktionary (+lexibank).
    en_manc: ["stand", "stand"],  // Wiktionary (+lexibank).
    en_ng: ["stand", "stænd"],  // Wiktionary (+lexibank).
    en_nz: ["stand", "stænd"],  // Wiktionary (+lexibank).
    en_ph: ["stand", "stænd"],  // Wiktionary (+lexibank).
    en_sco: ["stand", "stand"],  // Wiktionary (+lexibank).
    en_scouse: ["stand", "stand"],  // Wiktionary (+lexibank).
    en_sg: ["stand", "stɛn"],  // Wiktionary (+lexibank).
    en_south: ["stand", "stæːənd"],  // Wiktionary (+lexibank).
    en_us: ["stand", "stænd"],  // Wiktionary (+lexibank).
    en_wc: ["stand", "stand"],  // Wiktionary (+lexibank).
    en_wls: ["stand", "stand"],  // Wiktionary (+lexibank).
    en_yk: ["stand", "stand"],  // Wiktionary (+lexibank).
    en_za: ["stand", "stænd"],  // Wiktionary (+lexibank).
    enm: ["stonden", "ˈstɔndən"],  // Wiktionary (+lexibank).
    enq: ["katenge", "kateŋɡe"],  // lexibank ABVD/transnewguineaorg.
    eo: ["stari", "ˈstari"],  // Wiktionary.
    et: ["seisma", "ˈseismɑ"],  // Wiktionary (en) translation table + Wiktionary entry (kaikki.org) + NorthEuraLex.
    eu: ["zutik egon", "s̻utik eɣon"],  // Wiktionary translation table.
    evn: ["илми", "ilmiː"],  // Wiktionary (en) translation table + Wiktionary entry (kaikki.org) + NorthEuraLex.
    fa: ["ایستادن", "iːstɒːˈdæn"],  // Wiktionary; NorthEuraLex; IDS.
    fa_clas: ["ایستادن", "eːstaːdan"],  // Wiktionary.
    ff: ["daraade", "daɾaːde"],  // en.wiktionary daragol (Fula).
    fi: ["seisoa", "ˈseisoɑ"],  // Wiktionary (en) translation table + Wiktionary entry (kaikki.org) + NorthEuraLex.
    fo: ["standa", "ˈstanta"],  // Wiktionary (+lexibank).
    fra_jer: ["dréchi", "dreˈʃi"],  // Wiktionary (kaikki).
    frr: ["stönje", "ˈstœnʲə"],  // Wiktionary.
    fur: ["stâ", "staː"],  // Wiktionary (kaikki) + DiACL.
    fy: ["stean", "stɪə̯n"],  // Wiktionary (kaikki) + DiACL.
    ga: ["seas", "ʃasˠ"],  // Wiktionary (kaikki) + IDS + NorthEuraLex.
    gag: ["durmaa", "durˈmaː"],  // Wiktionary entry (kaikki.org) + Robbeets et al. triangulation.
    gan: ["徛", "tɕʰi˨˩"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    gd: ["seas", "ʃes"],  // Wiktionary (kaikki) + DiACL.
    gez: ["ቆመ", "kʼoːma"],  // en.wiktionary stand translations; ቆመ (Ge'ez); kitchensemitic.
    gil: ["teirake", "teiɾake"],  // ABVD.
    gmh: ["stân", "staːn"],  // Wiktionary (kaikki) + IDS + IE-CoR.
    gn: ["ñemboʼy", "ɲẽmboˈʔɨ"],  // Wiktionary.
    goh: ["stān", "staːn"],  // Wiktionary (kaikki) + IDS + IE-CoR.
    gor: ["timihulo", "timiˈhulo"],  // ABVD.
    got: ["𐍃𐍄𐌰𐌽𐌳𐌰𐌽", "ˈstandan"],  // Wiktionary (kaikki) + IDS + DiACL + IE-CoR.
    gqu: ["ku33", "ku˧˧"],  // ABVD (lexibank/abvd CLDF).
    grt: ["chadenga", "tʃadeŋa"],  // Wiktionary; lexibank peirosst; STEDT Burling.
    gsw: ["stah", "ʃtɒː"],  // Wiktionary (kaikki) + IE-CoR.
    guz: ["gotenena", "ɡotenena"],  // lexibank TLS.
    gv: ["shassoo", "ˈʃazu"],  // DiACL + IE-CoR.
    h_vedic: ["तिष्ठति", "tíʂʈʰɐti"],  // Wiktionary.
    hak_cn: ["徛", "kʰi˦"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    hak_hl: ["徛", "kʰi˥˧"],  // Wiktionary dial-syn + Wiktionary.
    hak_tw: ["徛", "kʰi˨˦"],  // Wiktionary dial-syn + Wiktionary.
    haw: ["kū", "kuː"],  // Wiktionary.
    hi: ["खड़ा होना", "kʰəɽaː hoːnaː"],  // Wiktionary (translation table); NorthEuraLex; LSI.
    hil: ["tindog", "tindoɡ"],  // ABVD.
    hmn: ["sawv ntsug", "ʂaɨ˨˦ ᶯdʐu˧˩"],  // WOLD (lexibank/wold).
    hot: ["vadiŋ", "vadiŋ"],  // ABVD.
    hr: ["stajati", "stǎjati"],  // Wiktionary + NorthEuraLex.
    hsn: ["站", "tsan˦˥"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    ht: ["kanpe", "kãpe"],  // Wiktionary.
    hu: ["állni", "ˈaːlni"],  // Wiktionary (en) translation table + Wiktionary entry (kaikki.org) + NorthEuraLex.
    hui: ["heya", "heja"],  // lexibank transnewguineaorg.
    huz: ["беча", "betʃa"],  // lexibank IDS.
    hy: ["կանգնել", "kɑnɡˈnel"],  // Wiktionary + NorthEuraLex.
    ia: ["star", "star"],  // Wiktionary.
    ibg: ["tumaddag", "tumadːaɡ"],  // lexibank ABVD.
    id: ["berdiri", "bərˈdiri"],  // Wiktionary.
    ii: ["ꉆ", "hi˥"],  // Wiktionary; STEDT Sun ZMYY / Huang&Dai.
    ilo: ["agtakder", "ʔaɡtakˈdəɾ"],  // ABVD.
    inh: ["латта", "latta"],  // Wiktionary.
    is: ["standa", "ˈstanta"],  // Wiktionary (kaikki) + NorthEuraLex + IE-CoR.
    itb: ["mittaʼnek", "mittaʔnɨk"],  // ABVD.
    itl: ["тҳзокас", "tχzokas"],  // NorthEuraLex.
    ium: ["souv", "sou˦"],  // Wiktionary.
    izh: ["seissa", "ˈseisːɑ"],  // Wiktionary.
    ja: ["立つ", "tatsɯ"],  // Wiktionary (en) translation table + Wiktionary entry (kaikki.org) + WOLD.
    ja_heian: ["立つ", "tatu"],  // 精選版 日本国語大辞典 (kotobank.jp) + Robbeets et al. triangulation (Old Japanese).
    ja_oki: ["立ちゅん", "tatɕuɴ"],  // Wiktionary Okinawan entry (kaikki.org) + Robbeets et al. triangulation (Okinawa Shuri).
    jio: ["suːn", "suːn˥"],  // ABVD (lexibank/abvd CLDF).
    jiu: ["xɛ55", "xɛ˥˥"],  // lexibank peirosst / lamanisoic; STEDT.
    jra: ["dơgŭ", "dəɡuʔ"],  // lexibank ABVD.
    jv: ["ngadeg", "ŋadəɡ"],  // ABVD.
    ka: ["დგომა", "dɡoma"],  // Wiktionary.
    kab: ["bedd", "bədː"],  // Module:Swadesh/data/kab.
    kam: ["kũũngama", "koːŋɡama"],  // lexibank tls Kamba_kitu.
    kbd: ["тэджын", "tadʒən"],  // Wiktionary.
    kca: ["ӆойты", "ˈɬojtɯ"],  // NorthEuraLex + IDS (lexibank).
    kde: ["kwimila", "kwimila"],  // lexibank tls Makonde; Mabia.
    kek: ["xaqliik", "ʃaqliːk"],  // lexibank wold + sabor.
    ket: ["инь", "jiɲ"],  // NorthEuraLex + WOLD.
    kgg: ["dʰuŋ", "dʰuŋ"],  // lexibank ABVD/wustphylogenies.
    khv: ["багьбеча", "bahbetʃa"],  // lexibank IDS.
    ki: ["kũrũgama", "koɾoːɣama"],  // en.wiktionary rũgama (Kikuyu).
    kk: ["тұру", "tʊˈruw"],  // Wiktionary (en) translation table + Wiktionary entry (kaikki.org) + NorthEuraLex.
    kl: ["sikingavoq", "sikiŋavoq"],  // NorthEuraLex.
    km: ["ឈរ", "cʰɔː"],  // Wiktionary.
    kmc: ["jun55", "jun˥˥"],  // ABVD (lexibank/abvd CLDF).
    kn: ["ನಿಲ್ಲು", "nilːu"],  // Wiktionary; NorthEuraLex.
    ko: ["서다", "sʌda"],  // Wiktionary (en) translation table + Wiktionary entry (kaikki.org) + NorthEuraLex.
    ko_em: ["셔다", "sjəda"],  // 우리말어휘역사사전 (kdict.korean.go.kr/history).
    ko_jeju: ["사다", "sada"],  // 우리말샘 (opendict.korean.go.kr).
    ko_mid: ["셔·다", "sjəta"],  // Wiktionary Middle Korean entry (kaikki.org) + 우리말어휘역사사전 (kdict.korean.go.kr/history).
    koi: ["сулавны", "sulavnɨ"],  // NorthEuraLex + Wiktionary + UraLex.
    kos: ["tu", "tu"],  // ABVD.
    kpf: ["kin-", "kin"],  // lexibank mcelhanonhuon/transnewguineaorg.
    kpv: ["сулавны", "ˈsulavnɨ"],  // NorthEuraLex + IDS.
    krc: ["турургъа", "tururˈʁa"],  // Wiktionary.
    krj: ["matindog", "matindoɡ"],  // lexibank ABVD.
    krl: ["seisuo", "ˈseisuo"],  // NorthEuraLex + Wiktionary + UraLex.
    ksb: ["kughooka", "kuɣoːka"],  // lexibank tls Sambaa.
    ksh: ["stonn", "ʃtɔn"],  // Wiktionary (kaikki).
    kw: ["sevel", "ˈsɛvɛl"],  // Wiktionary (kaikki) + DiACL + IE-CoR.
    ky: ["туруу", "tuˈruː"],  // Wiktionary + ABVD.
    la: ["stāre", "ˈstaːre"],  // Wiktionary (kaikki) + IDS + NorthEuraLex + IE-CoR.
    la_late: ["stare", "ˈstare"],  // Wiktionary.
    lbe: ["ацӏан", "atsʼan"],  // lexibank IDS/northeuralex.
    lez: ["акъвазун", "aqʷazun"],  // lexibank IDS/northeuralex.
    lg: ["okuyimirira", "okujimirira"],  // Appendix:Bantu Swadesh lists; lexibank tls.
    lhu: ["hú", "hú"],  // STEDT Matisoff 72/74; Sun ZMYY.
    li: ["schtoë", "ʃtɔə̯"],  // Wiktionary (kaikki).
    lic: ["tsu:n1", "tsuːn˥˧"],  // ABVD (lexibank/abvd CLDF).
    liv: ["pī’lõ", "ˈpiːˀlə"],  // NorthEuraLex.
    ln: ["kotɛ́lɛmɛ", "kotɛ́lɛmɛ"],  // en.wiktionary tɛ́lɛmɛ (Lingala); Appendix:Bantu Swadesh lists.
    lt: ["stovėti", "stoːˈvʲeːtʲɪ"],  // Wiktionary + NorthEuraLex.
    lus: ["ding", "diŋ"],  // Wiktionary; lexibank.
    lv: ["stāvēt", "ˈstaːvɛːt"],  // Wiktionary + ASJP.
    max: ["badiri", "badiri"],  // ABVD.
    mch: ["aanümü", "aːnɨmɨ"],  // Wiktionary.
    mdf: ["ащемс стяда", "ˈaɕtɕʲems ˈstʲada"],  // NorthEuraLex.
    mdh: ["tindeg", "ˈtindəɡ"],  // ABVD.
    meu: ["gini", "ɣini"],  // ABVD.
    mg: ["mitsangana", "miˈtsaŋɡana"],  // WOLD.
    mhr: ["шогаш", "ʃoˈɡaʃ"],  // NorthEuraLex + IDS.
    mi: ["tū", "tuː"],  // Wiktionary.
    mk: ["стои", "ˈstɔi"],  // Wiktionary + IE-CoR.
    ml: ["നിൽക്കുക", "nilkːuɡa"],  // Wiktionary; NorthEuraLex.
    mlm: ["taŋ4", "taŋ˨˦"],  // ABVD (lexibank/abvd CLDF).
    mmd: ["tsən2", "tsən˨˧˩"],  // ABVD (lexibank/abvd CLDF).
    mn: ["зогсох", "tsɔɡsəx"],  // Wiktionary + NorthEuraLex.
    mn_cn: ["ᠵᠣᠭᠰᠤᠬᠤ", "dʒoɣsuχu"],  // Wiktionary.
    mnc: ["ᡳᠯᡳᠮᠪᡳ", "ilimbi"],  // Wiktionary + NorthEuraLex.
    mnp: ["徛", "kyɛ˦˨"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    mns: ["лю̄люӈкве", "ˈʎuːʎuŋkʷe"],  // NorthEuraLex + IDS.
    mqy: ["hesé", "həse"],  // ABVD (lexibank abvd).
    mra: ["jɨn", "jɨn"],  // Peiros Austroasiatic (lexibank/peirosaustroasiatic).
    ms: ["berdiri", "bərˈdiri"],  // Wiktionary.
    my: ["ရပ်", "jaʔ"],  // Wiktionary; lexibank.
    myx: ["khukhwiima", "kʰukʰwiːma"],  // lexibank tls.
    mzh: ["takasit", "takasit"],  // WOLD (lexibank wold).
    nan: ["徛", "kʰia˧˧"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    nan_hai: ["徛", "xia˧˧"],  // Wiktionary dial-syn + MCPDict.
    nan_ph: ["徛", "kʰia˧˧"],  // Wiktionary dial-syn + Wiktionary.
    nan_pn: ["徛", "kʰia˨˩"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    nan_te: ["徛", "kʰia˧˥"],  // Wiktionary dial-syn + Wiktionary.
    nan_xm: ["徛", "kʰia˨˨"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    nan_zz: ["徛", "kʰia˨˨"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    nci: ["ihca", "ˈiʔka"],  // Wiktionary + lexibank.
    nds: ["stahn", "stɒːn"],  // Wiktionary (kaikki) + DiACL.
    ne: ["उभिनु", "ubʱinu"],  // Wiktionary.
    nha: ["igada", "iɡada"],  // Bowern Pama-Nyungan (lexibank bowernpny).
    nia: ["maoso", "maoso"],  // ABVD.
    nij: ["mendeng", "mendeŋ"],  // ABVD.
    nio: ["нәнсыди", "nənsɨdʲi"],  // NorthEuraLex + UraLex.
    niv: ["кыпрдь", "kɨprɟ"],  // NorthEuraLex (lexibank).
    nl: ["staan", "staːn"],  // Wiktionary (kaikki) + IDS + WOLD + NorthEuraLex.
    nmf: ["nganing", "ŋaniŋ"],  // lexibank peirosst / marrisonnaga; LSI.
    nn: ["stå", "stoː"],  // Wiktionary (kaikki) + DiACL + IE-CoR.
    no: ["stå", "stoː"],  // Wiktionary (kaikki) + DiACL + IE-CoR.
    nog: ["турув", "tuˈruw"],  // IDS.
    non: ["standa", "ˈstandɑ"],  // Wiktionary (kaikki) + IDS + DiACL + IE-CoR.
    nv: ["sézį́", "sɛ́zɪ̃́"],  // Wiktionary.
    nyn: ["kwemerera", "kwemerera"],  // lexibank tls.
    nzm: ["sap", "sap"],  // lexibank peirosst / marrisonnaga; STEDT.
    och: ["立", "*k.rəp"],  // Wiktionary (Baxter–Sagart) + lexibank.
    oj: ["niibawi", "niːbawi"],  // Wiktionary.
    olo: ["seizuo", "ˈseizuo"],  // NorthEuraLex.
    orh: ["ɪlɪ", "ɪlɪ"],  // WOLD + Johansson.
    orv: ["стоꙗти", "stojati"],  // Wiktionary + IE-CoR.
    os: ["лӕууын", "læwwɨn"],  // IDS; IE-CoR; DiACL.
    osx: ["standan", "ˈstandan"],  // Wiktionary (kaikki) + DiACL + IE-CoR.
    ota: ["طورمق", "turˈmak"],  // Wiktionary.
    ote: ["ʼba̲i", "ʔbɔi"],  // lexibank wold + sabor (Otomi).
    otk: ["𐱃𐰆𐰺-", "tur"],  // Wiktionary.
    p_dra: ["*nil-", "nil"],  // Wiktionary (reconstruction).
    p_ine: ["*steh₂-", "steh₂"],  // Wiktionary (reconstruction, kaikki).
    p_sit: ["*kV-r(j)əp", "kV-r(j)əp"],  // Wiktionary (reconstruction, kaikki).
    p_tun: ["*ïlï-", "ɯlɯ"],  // Wiktionary (reconstruction).
    pag: ["unlaguey", "ʔunlaɡəj"],  // ABVD.
    pam: ["tikdo", "tikˈdoʔ"],  // ABVD.
    pao: ["wɨnɨ", "wɨnɨ"],  // Wiktionary + lexibank.
    pap: ["para", "ˈpara"],  // Wiktionary.
    pau: ["dechor", "ðəˈʔoɾ"],  // ABVD.
    pban: ["*-jɪ́ma", "-jɪ́ma"],  // Wiktionary (reconstruction, kaikki).
    pbb: ["yuhu", "juhu"],  // IDS (lexibank ids).
    pdc: ["schteh", "ʃteː"],  // Wiktionary (kaikki).
    pi_edu: ["tiṭṭhati", "tiʈːʰati"],  // Wiktionary.
    pjt: ["ngaranyi", "ˈŋaraɲi"],  // Bowern Pama-Nyungan (lexibank bowernpny).
    pl: ["stać", "statɕ"],  // Wiktionary + NorthEuraLex/IE-CoR/IDS.
    pll: ["ɟəŋ", "ɟəŋ"],  // Nagaraja et al. Khasian/Palaungic (lexibank/nagarajakhasian).
    pmi: ["tə55ɕɪ̃35", "tə˥˥ɕɪ̃˧˥"],  // STEDT Sun ZMYY.
    prs: ["ایستادن", "istɑːdan"],  // Wiktionary.
    ptrk: ["*tur-", "tur"],  // Wiktionary (reconstruction, kaikki).
    pzh: ["kizeh", "kizəh"],  // ABVD.
    qu: ["sayay", "ˈsajaj"],  // Wiktionary.
    quc: ["takʼalik", "takʼalik"],  // Wiktionary translation table.
    quy: ["sayay", "sajaj"],  // lexibank huntergatherer (Quechua Ayacuchano) + crossandean (Ayacucho).
    quz: ["sayay", "ˈsajaj"],  // lexibank crossandean (Cuzco) + Wiktionary.
    rad: ["dơng", "dəŋ"],  // ABVD (lexibank abvd).
    rbb: ["ʥɔŋ", "dʑɔŋ"],  // Deepadung et al. Palaung survey (lexibank/deepadungpalaung CLDF).
    rn: ["guhagarara", "ɡuhaɡaɾaɾa"],  // Wiktionary Bantu Swadesh.
    rsk: ["стац", "stats"],  // Wiktionary.
    ru: ["стоять", "stɐˈjatʲ"],  // Wiktionary + NorthEuraLex.
    ruq: ["stari", "ˈstari"],  // IE-CoR + Saenko Romance.
    rut: ["лузун", "luzun"],  // IDS (lexibank ids).
    rw: ["guhagarara", "ɡuhaɡaɾaɾa"],  // Wiktionary Bantu Swadesh.
    sa: ["तिष्ठति", "tiʂʈʰɐti"],  // Wiktionary; IDS; IE-CoR.
    sa_edu: ["तिष्ठति", "tiʂʈʰɐti"],  // Wiktionary.
    sah: ["тур", "tur"],  // Wiktionary.
    sat: ["ᱛᱮᱝᱜᱳ", "teŋɡo"],  // Wiktionary (via kaikki.org).
    sbp: ["kiyima", "kijima"],  // lexibank tls.
    sco: ["staund", "stɑnd"],  // Wiktionary (kaikki).
    sda: ["bendan", "bendan"],  // ABVD.
    se: ["čuožžut", "ˈtʃuodʒːut"],  // NorthEuraLex + UraLex + Wiktionary.
    sel: ["ныӈкыӄа", "nɨŋkɨqa"],  // NorthEuraLex + IDS.
    shx: ["sɤ44", "sɤ˦˦"],  // ABVD (lexibank/abvd CLDF).
    si: ["හිටිනවා", "hiʈinəʋaː"],  // Wiktionary; LSI; DiACL.
    sjd: ["чуэннче", "tʃuenːtʃe"],  // NorthEuraLex + UraLex + WOLD.
    sk: ["stáť", "staːc"],  // Wiktionary + NorthEuraLex/IE-CoR.
    sl: ["stati", "ˈstaːti"],  // Wiktionary + NorthEuraLex/IE-CoR.
    sm: ["tū", "tuː"],  // ABVD.
    sma: ["tjåadtjodh", "ˈtʃoɒtʃːudh"],  // NorthEuraLex + UraLex.
    smj: ["tjuodtjot", "ˈtʃuɔdtʃuɔt"],  // NorthEuraLex.
    sr: ["стајати", "stǎjati"],  // Wiktionary + DiACL.
    srh: ["wareevd", "waɾɵvd"],  // IE-CoR; LSI.
    srm: ["taámpu", "taámpu"],  // lexibank wold (Saramaccan).
    ssf: ["ilhilhi", "iɬiɬi"],  // ABVD.
    stq: ["stounde", "ˈstoːu̯ndə"],  // Wiktionary (kaikki).
    suk: ["gwimila", "ɡwimila"],  // Wiktionary Bantu Swadesh + tls.
    sux: ["𒁺", "ɡub"],  // Wiktionary.
    sv: ["stå", "stoː"],  // Wiktionary (kaikki) + IDS + NorthEuraLex + IE-CoR.
    sw: ["kusimama", "kusiˈmama"],  // Wiktionary.
    ta: ["நில்", "nil"],  // Wiktionary; NorthEuraLex.
    tab: ["дийигъуб", "dijiʁub"],  // IDS (lexibank ids).
    tet: ["hamriik", "hamriːk"],  // Wiktionary.
    th: ["ยืน", "jɯːn˧"],  // Wiktionary (via kaikki.org).
    tk: ["durmak", "durˈmak"],  // Wiktionary + Savelyev.
    tkr: ["ипеззарас", "ipezːaras"],  // IDS (lexibank ids).
    tlh: ["Qam", "qχɑm"],  // Wiktionary (Appendix:Klingon).
    to: ["tuʻu", "tuʔu"],  // ABVD.
    tpi: ["sanap", "sanap"],  // Wiktionary.
    tpn: ["ʼam", "ʔam"],  // Wiktionary + lexibank.
    tr: ["durmak", "duɾˈmak"],  // NorthEuraLex + Wiktionary.
    tsg: ["timindug", "timinduɡ"],  // ABVD.
    tsi: ["haaytk", "haːjtk"],  // IDS + johanssonsoundsymbolic.
    tt: ["тору", "toˈru"],  // NorthEuraLex + Wiktionary.
    ttj: ["kwemerra", "kwemera"],  // lexibank tls + Wiktionary.
    tue: ["dũkũ", "dũkũ"],  // Huber & Reed Colombian (lexibank hubercolumbian).
    twm: ["lᴀŋ13", "lᴀŋ˩˧"],  // STEDT Sun ZMYY.
    ty: ["tiʻa", "tiʔa"],  // Wiktionary.
    tyv: ["турар", "tuˈrar"],  // Wiktionary + Savelyev.
    udm: ["сылыны", "sɨlɨˈnɨ"],  // NorthEuraLex + Wiktionary + IDS.
    ug: ["تۇرماق", "turˈmɑq"],  // Wiktionary + ABVD.
    uk: ["стояти", "stoˈjate"],  // Wiktionary + NorthEuraLex/IE-CoR.
    ur: ["کھڑا ہونا", "kʰəɽaː hoːnaː"],  // Wiktionary; IE-CoR.
    uz: ["turmoq", "turˈmɒq"],  // NorthEuraLex + Wiktionary.
    vep: ["seišta", "ˈseiʃta"],  // NorthEuraLex + UraLex.
    vi: ["đứng", "ɗɨŋ˧˥"],  // Wiktionary (via kaikki.org).
    vi_c: ["đứng", "ɗɨŋ˨˦"],  // Wiktionary (via kaikki.org).
    vi_han: ["立", "ləp˨˩"],  // Wiktionary 立 (Vietnamese).
    vi_s: ["đứng", "ɗɨŋ˧˥"],  // Wiktionary (via kaikki.org).
    vro: ["saisma", "ˈsɑismɑ"],  // UraLex.
    wbp: ["karrimi", "karimi"],  // Wiktionary.
    wls: ["tuʻu", "tuʔu"],  // ABVD.
    wuu: ["立", "liɪʔ˩˨"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    wuu_hz: ["立", "lieʔ˨"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    wuu_jh: ["徛", "kɛ˥˧˥"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    wuu_nb: ["立", "liɪʔ˩˨"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    wuu_sz: ["立", "liɪʔ˧"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    wuu_wz: ["徛", "ɡe˧˦"],  // Wiktionary dial-syn + MCPDict.
    wym: ["śtejn", "ʃtɛjn"],  // Wiktionary (kaikki).
    xal: ["зогсх", "tsɔɡsxə"],  // NorthEuraLex.
    xul: ["dhariyiri", "d̪aɹijiɹi"],  // Bowern Pama-Nyungan (lexibank bowernpny).
    yao: ["kwima", "kwima"],  // lexibank tls.
    ygr: ["heti", "heti"],  // transnewguinea.org (lexibank).
    yi: ["שטיין", "ʃtɛɪ̯n"],  // Wiktionary (kaikki) + DiACL.
    ykg: ["аӻуол-", "aʁuol"],  // NorthEuraLex.
    yrk: ["нусь", "nusʲ"],  // NorthEuraLex + IDS.
    yrl: ["puãmu", "puˈãmu"],  // lexibank huntergatherer + tuled + gerarditupi.
    yue: ["徛", "kʰei˩˧"],  // Wiktionary dial-syn + Wiktionary.
    yue_dg: ["徛", "kʰɐi˧˦"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    yue_nn: ["徛", "kʰi˨˦"],  // Wiktionary dial-syn + MCPDict.
    yue_ts: ["徛", "kʰei˧˧"],  // Wiktionary dial-syn + Wiktionary.
    yue_zs: ["徛", "kʰi˨˩˧"],  // Wiktionary dial-syn + MCPDict.
    za: ["ndwn", "ɗɯn˨˦"],  // Wiktionary.
    zh: ["站", "ʈʂan˥˩"],  // Wiktionary dial-syn + Wiktionary + lexibank.
    zh_cd: ["站", "tsan˨˩˧"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    zh_db: ["站", "ʈʂan˥˧"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    zh_han: ["立", "rǝp"],  // Starling bigchina.
    zh_hf: ["站", "tʂɐ̃˥˩"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    zh_jh: ["站", "tʂã˦˦"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    zh_jn: ["站", "tʂã˨˩"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    zh_lz: ["站", "tʂɛn˩˧"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    zh_nj: ["站", "tʂã˦"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    zh_sc: ["站", "tsan˨˩˧"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    zh_tang: ["立", "lip"],  // Wiktionary (Pulleyblank EMC).
    zh_tj: ["站", "tsan˥˧"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    zh_tw: ["站", "ʈʂan˥˩"],  // Wiktionary dial-syn + Wiktionary + lexibank.
    zh_wenyan_edu: ["立", "lɐp˨"],  // Wiktionary 立 (Cantonese).
    zh_wh: ["站", "tsan˧˥"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    zh_xa: ["站", "tsã˥˥"],  // Wiktionary dial-syn + Wiktionary + MCPDict.
    zh_yuan: ["立", "li"],  // MCPDict 中原音韻.
    zu: ["ukuma", "ukuma"],  // Wiktionary.
  }
};
