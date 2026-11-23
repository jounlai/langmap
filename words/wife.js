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
    ar: "zawja",
    hy: "woman",
    ast: "sponsa",
    av: "own",
    az: "own",
    ba: "woman",
    eu: "own",
    bbl: "own",
    be: "gwen",
    bn: "vadhu",
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
    krl: "akka",
    olo: "own",
    vep: "akka",
    et: "woman",
    liv: "woman",
    sma: "own",
    smj: "akka",
    se: "akka",
    smn: "own",
    sms: "akka",
    sjd: "akka",
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
    pl: "gwen",
    uk: "woman",
    ru: "gwen",
    lt: "own",
    lv: "own",
    is: "own",
    nn: "own",
    no: "own",
    sv: "own",
    de: "woman",
    en: "wib",
    ga: "own",
    cy: "woman",
    la: "own",
    fr: "woman",
    es: "sponsa",
    pt: "sponsa",
    it: "mulier",
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
    ko: "anhai",
    ja: "tuma",
    kn: "own",
    ml: "bharya",
    ta: "own",
    te: "bharya",
    ka: "own",
    ady: "own",
    lez: "woman",
    dar: "woman",
    he: "antat",
    zh: "tsei",
    ha: "own",
    rap: "own",
    to: "spouse",
    ay: "woman",
    arn: "own",
    dsb: "woman",
    ban: "spouse",
    gay: "woman",
    jv: "spouse",
    iba: "binahi",
    pam: "spouse",
    bug: "binahi",
    mad: "binahi",
    mrw: "spouse",
    sm: "own",
    tet: "own",
    min: "binahi",
    sas: "own",
    ljp: "own",
    sda: "woman",
    su: "own",
    ami: "woman",
    dtp: "spouse",
    ty: "woman",
    bs: "woman",
    es_cr: "sponsa",
    es_hn: "sponsa",
    es_ni: "sponsa",
    es_sv: "sponsa",
    fr_lu: "woman",
    fr_cm: "woman",
    de_lu: "woman",
    en_ng2: "wib",
    es_bo: "sponsa",
    es_py: "sponsa",
    es_pa: "sponsa",
    en_my: "wib",
    en_wls: "wib",
    en_jam: "wib",
    en_ng: "wib",
    en_ph: "wib",
    en_ke: "wib",
    fr_sn: "woman",
    fr_ci: "woman",
    fr_ht: "woman",
    en_us: "wib",
    en_ca: "wib",
    en_za: "wib",
    ca_va: "woman",
    ja_osa: "tuma",
    ja_aom: "tuma",
    ja_hak: "tuma",
    ja_kyo: "tuma",
    ja_hir: "tuma",
    ko_kp: "anhai",
    ko_bus: "anhai",
    ko_yb: "anhai",
    es_mx: "sponsa",
    en_aave: "wib",
    en_au: "wib",
    en_south: "wib",
    en_app: "wib",
    en_in: "wib",
    en_ie: "wib",
    en_sco: "wib",
    en_yk: "wib",
    en_ck: "wib",
    en_scouse: "wib",
    en_brum: "wib",
    en_manc: "wib",
    en_wc: "wib",
    en_est: "wib",
    en_sg: "wib",
    fr_qc: "woman",
    fr_af: "woman",
    fr_be: "woman",
    fr_ch: "woman",
    es_co: "sponsa",
    es_cl: "sponsa",
    es_ar: "sponsa",
    es_cu: "sponsa",
    es_pe: "sponsa",
    es_an: "sponsa",
    ko_hg: "anhai",
    ko_jl: "anhai",
    dtp_kzj: "spouse",
    es_pr: "sponsa",
    es_do: "sponsa",
    es_gt: "sponsa",
    es_ec: "sponsa",
    es_uy: "sponsa",
    es_ve: "sponsa",
    alt: "woman",
    ota: "woman",
    sa: "potni",
    ltg: "woman",
    mnc: "own",
    fo: "woman",
    vo: "other",
    got: "gwen",
    dng: "woman",
    sco: "other",
    orv: "woman",
    rif: "woman",
    ug: "woman",
    tsg: "own",
    cjy: "laopo",
    si: "own",
    lo: "mia",
    ki: "own",
    ms: "own",
    blt: "mia",
    acw: "zawja",
    xmf: "woman",
    tl: "spouse",
    mr: "own",
    sw: "woman",
    lep: "own",
    bew: "binahi",
    kgp: "own",
    eo: "other",
    cu: "woman",
    rm: "woman",
    fy: "woman",
    ang: "woman",
    hsb: "woman",
    as: "own",
    tk: "own",
    lld: "own",
    rgn: "mulier",
    cdo: "other",
    nap: "mulier",
    scn: "mulier",
    oc: "woman",
    yi: "woman",
    uga: "woman",
    rue: "woman",
    mg: "spouse",
    kl: "nuliaq",
    crh: "woman",
    ti: "woman",
    sl: "gwen",
    ks: "own",
    bo: "own",
    ksw: "own",
    haw: "woman",
    gan: "laopo",
    lzz: "own",
    sc: "woman",
    ur: "own",
    wa: "woman",
    vi: "bee",
    tg: "woman",
    blk: "own",
    yue: "laopo",
    yua: "own",
    abs: "other",
    id: "own",
    pdt: "wib",
    ia: "own",
    rup: "own",
    io: "other",
    nv: "woman",
    rom: "woman",
    ckb: "woman",
    wuu: "laopo",
    tyv: "woman",
    km: "own",
    fur: "woman",
    yai: "gwen",
    wo: "own",
    pa: "potni",
    mt: "woman",
    sga: "woman",
    hsn: "woman",
    fro: "woman",
    akk: "antat",
    yo: "own",
    tab: "unknown",
    mnp: "other",
    tpn: "embireko",
    th: "bharya",
    om: "own",
    ky: "woman",
    nmn: "woman",
    hai: "own",
    gl: "sponsa",
    mdr: "binahi",
    gu: "potni",
    mk: "woman",
    blc: "woman",
    shi: "woman",
    txb: "woman",
    vi_c: "bee",
    vi_s: "bee",
    wuu_sz: "woman",
    wuu_nb: "laopo",
    wuu_jh: "laopo",
    wuu_wz: "own",
    cjy_lv: "unknown",
    cjy_xz: "woman",
    hsn_hy: "woman",
    yue_dg: "laopo",
    yue_gz: "laopo",
    yue_nn: "laopo",
    yue_ts: "laopo",
    yue_zs: "laopo",
    rmy: "woman",
    bsq: "unknown",
    cho: "own",
    cop: "woman",
    din: "woman",
    ee: "own",
    fa: "woman",
    fj: "woman",
    jam: "wib",
    kbd: "woman",
    kmh: "woman",
    kru: "woman",
    mnk: "woman",
    mwl: "woman",
    naq: "woman",
    new: "own",
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
    iu: "nuliaq",
    gag: "woman",
    csb: "woman",
    bm: "woman",
    awa: "woman",
    mfe: "woman",
    mak: "woman",
    brx: "woman",
    xpu: "antat",
    tcs: "woman",
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
    pi: "bharya",
    szl: "gwen",
    mnw: "woman",
    grt: "own",
    ik: "nuliaq",
    ium: "own",
    nso: "woman",
    lij: "mulier",
    orh: "own",
    ofs: "woman",
    lb: "woman",
    rw: "woman",
    ln: "woman",
    nlc: "woman",
    vot: "woman",
    djk: "woman",
    gor: "own",
    tar: "own",
    dlg: "woman",
    bej: "spouse",
    bgc: "woman",
    ny: "woman",
    xmr: "own",
    wal: "own",
    ket: "woman",
    egl: "mulier",
    mag: "woman",
    mni: "unknown",
    dv: "own",
    lus: "own",
    kok: "woman",
    yux: "other",
    udi: "woman",
    sjo: "unknown",
    nag: "woman",
    khw: "vadhu",
    eve: "woman",
    sd: "unknown",
    xkz: "own",
    txg: "own",
    ett: "unknown",
    squ: "own",
    bdq: "own",
    ibb: "woman",
    slr: "own",
    ykg: "own",
    xag: "woman",
    yrl: "embireko",
    bsk: "own",
    tzm: "woman",
    xpg: "woman",
    tay: "woman",
    obr: "own",
    pms: "woman",
    fax: "woman",
    dz: "woman",
    mfa: "binahi",
    gd: "woman",
    shn: "mia",
    zza: "unknown",
    mch: "own",
    gmh: "woman",
    prs: "woman",
    lij_t: "mulier",
    sr: "woman",
    pt_br: "sponsa",
    pt_ao: "sponsa",
    pt_mz: "sponsa",
    pt_mo: "sponsa",
    pt_cv: "sponsa",
    zh_tw: "tsei",
    de_at: "woman",
    de_ch: "woman",
    nl_be: "woman",
    en_nz: "wib",
    en_geordie: "wib",
    el_koi: "woman",
    la_late: "own",
    egy_dem: "own",
    vi_mid: "bee",
    arc: "woman",
    mn_cn: "own",
    jya: "own",
    mjg: "own",
    mvf: "own",
    peh: "own",
    qxs: "own",
    ybe: "own",
    bca: "own",
    blr: "own",
    bru: "own",
    duu: "woman",
    gqu: "own",
    hmn: "woman",
    ii: "other",
    jio: "own",
    jiu: "woman",
    kdt: "own",
    khb: "mia",
    kjg: "own",
    kmc: "own",
    kxm: "own",
    lhu: "own",
    lic: "woman",
    lis: "own",
    mlm: "own",
    mmd: "own",
    mra: "own",
    nuf: "woman",
    nxq: "own",
    pmi: "own",
    prk: "own",
    shx: "own",
    swi: "own",
    th_isan: "mia",
    wbm: "own",
    za: "own",
    agt: "spouse",
    aoz: "woman",
    bik: "spouse",
    bjn: "binahi",
    bto: "spouse",
    bts: "own",
    bzg: "spouse",
    cia: "woman",
    ckv: "spouse",
    hil: "own",
    ilo: "spouse",
    ivv: "spouse",
    mdh: "spouse",
    mui: "binahi",
    nij: "spouse",
    pag: "spouse",
    pyu: "spouse",
    pzh: "woman",
    szy: "spouse",
    tao: "woman",
    trv: "woman",
    tsu: "spouse",
    war: "spouse",
    acn: "own",
    bgq: "own",
    clk: "own",
    kac: "own",
    kgg: "own",
    kha: "spouse",
    lif: "own",
    njo: "own",
    nzm: "own",
    rkt: "own",
    sat: "woman",
    tdh: "own",
    thr: "woman",
    tsj: "spouse",
    twm: "own",
    el_grc: "woman",
    el_kath: "woman",
    xfa: "own",
    ace: "other",
    cnh: "own",
    hne: "other",
    hoc: "woman",
    kxv: "own",
    nia: "spouse",
    or: "potni",
    pwo: "own",
    rhg: "vadhu",
    tcy: "own",
    ar_qur: "spouse",
    egy: "woman",
    gez: "woman",
    hbo: "woman",
    he_mis: "woman",
    myz: "woman",
    sux: "spouse",
    syc: "woman",
    xsa: "woman",
    fa_clas: "woman",
    hy_grab: "woman",
    kho: "own",
    sog: "own",
    xlu: "woman",
    xto: "woman",
    cjs: "plain",
    ckt: "own",
    itl: "own",
    ja_mvi: "own",
    ja_oki: "other",
    kim: "woman",
    kjh: "woman",
    ko_jeju: "own",
    kos: "own",
    mns: "woman",
    niv: "woman",
    sel: "own",
    h_tagalog: "spouse",
    h_vedic: "potni",
    osn: "woman",
    pi_edu: "bharya",
    sa_edu: "potni",
    sukh: "mia",
    xct: "own",
    xct_litpr: "own",
    abq: "woman",
    ani: "own",
    aqc: "woman",
    bal: "woman",
    ddo: "own",
    huz: "woman",
    inh: "own",
    khv: "woman",
    lbe: "woman",
    nog: "woman",
    pnb: "vadhu",
    skr: "woman",
    sva: "own",
    yrk: "woman",
    cmg: "own",
    och: "tsei",
    vi_han: "tsei",
    vi_nom: "bee",
    xng: "own",
    xqa: "own",
    zh_tang: "tsei",
    zh_wenyan_edu: "tsei",
    zh_yuan: "tsei",
    ja_chu: "tuma",
    ja_edo: "own",
    ja_heian: "woman",
    ja_kanbun: "tuma",
    ko_em: "anhai",
    ko_mid: "woman",
    ojp: "spouse",
    agx: "woman",
    aii: "woman",
    ar_jo: "woman",
    ar_ps: "zawja",
    azb: "woman",
    bdk: "woman",
    bqi: "woman",
    jpr: "woman",
    kjj: "own",
    kry: "woman",
    rut: "own",
    sdh: "woman",
    ssy: "woman",
    tig: "woman",
    tkr: "woman",
    de_lut: "woman",
    en_em: "wib",
    enm: "woman",
    osx: "woman",
    pmh: "bharya",
    dje: "own",
    gha: "woman",
    mlq: "woman",
    ses: "own",
    siz: "woman",
    snk: "own",
    ttq: "woman",
    es_sgl: "woman",
    fr_class: "woman",
    it_dan: "mulier",
    mga: "woman",
    ohu: "own",
    dag: "woman",
    deg: "own",
    dnj: "woman",
    dyu: "woman",
    efi: "woman",
    fon: "own",
    ig: "own",
    iso: "woman",
    izz: "own",
    kbp: "woman",
    kpe: "woman",
    kri: "wib",
    maw: "woman",
    spp: "own",
    sus: "woman",
    tiv: "woman",
    urh: "woman",
    chb: "own",
    emy: "own",
    nci: "woman",
    onw: "woman",
    qwc: "woman",
    p_ine: "potni",
    p_toc: "woman",
    p_tun: "woman",
    p_viet: "bee",
    paus: "spouse",
    pban: "woman",
    psem: "antat",
    ptai: "mia",
    aa: "woman",
    ach: "own",
    bem: "own",
    bum: "own",
    cgg: "woman",
    jmc: "woman",
    kam: "own",
    kde: "woman",
    kg: "woman",
    kmb: "woman",
    kr: "woman",
    lg: "woman",
    lol: "own",
    lua: "woman",
    mas: "woman",
    nyn: "woman",
    nyo: "own",
    rn: "woman",
    saq: "own",
    sg: "woman",
    suk: "own",
    tll: "own",
    tum: "own",
    xed: "woman",
    xog: "own",
    zdj: "woman",
    her: "woman",
    kj: "own",
    loz: "woman",
    nbl: "woman",
    ng: "own",
    seh: "woman",
    ssw: "woman",
    toi: "woman",
    ts: "own",
    umb: "woman",
    ve: "woman",
    xh: "woman",
    zu: "woman",
    frr: "woman",
    lmo: "mulier",
    vec: "mulier",
    acf: "woman",
    gcr: "woman",
    srm: "woman",
    crs: "own",
    fit: "own",
    ie: "own",
    li: "woman",
    rmf: "woman",
    agu: "plain",
    bzj: "wib",
    cab: "spouse",
    chf: "spouse",
    ctu: "plain",
    hch: "own",
    huv: "own",
    itz: "own",
    kek: "woman",
    kjb: "plain",
    mam: "woman",
    maz: "own",
    mix: "woman",
    nch: "woman",
    nhe: "woman",
    nhw: "woman",
    ote: "woman",
    poh: "own",
    toc: "woman",
    tsz: "plain",
    tzh: "plain",
    tzo: "plain",
    zap: "spouse",
    abe: "spouse",
    arp: "own",
    com: "own",
    cr: "own",
    ess: "nuliaq",
    esu: "nuliaq",
    jbo: "spouse",
    lkt: "own",
    mic: "woman",
    mus: "own",
    oj: "own",
    osa: "woman",
    tlh: "own",
    tok: "woman",
    tsi: "spouse",
    yur: "own",
    acu: "woman",
    cag: "spouse",
    cak: "own",
    cni: "own",
    crt: "own",
    cuk: "woman",
    emp: "spouse",
    gn: "embireko",
    guc: "spouse",
    gum: "own",
    gun: "embireko",
    guu: "woman",
    jiv: "woman",
    jup: "other",
    kpj: "woman",
    moc: "spouse",
    mrq: "woman",
    niu: "own",
    pbb: "own",
    pkp: "woman",
    plg: "spouse",
    pmt: "own",
    quc: "own",
    quz: "woman",
    rar: "woman",
    shp: "own",
    tca: "own",
    tob: "spouse",
    tpy: "own",
    trn: "own",
    tue: "own",
    xav: "spouse",
    aau: "woman",
    aer: "spouse",
    agr: "woman",
    bi: "wib",
    bzh: "own",
    ch: "spouse",
    dbl: "own",
    djr: "own",
    emi: "woman",
    enq: "woman",
    fai: "own",
    ho: "spouse",
    hot: "own",
    hui: "own",
    hwc: "wib",
    ktz: "woman",
    max: "binahi",
    meu: "spouse",
    mi: "woman",
    na: "own",
    nha: "own",
    nys: "spouse",
    pcm: "wib",
    pis: "wib",
    pjt: "spouse",
    pmy: "own",
    pon: "spouse",
    roo: "spouse",
    rtm: "own",
    syl: "vadhu",
    tiw: "spouse",
    wbl: "woman",
    wbp: "spouse",
    woe: "spouse",
    yap: "own",
    yle: "own",
    ngu: "woman",
    mcf: "woman",
    nrf: "woman",
    ar_eg: "woman",
    ar_lb: "zawja",
    ar_lev: "zawja",
    ar_ma: "woman",
    ar_sy: "zawja",
    ar_tn: "woman",
    arq: "woman",
    gsw: "woman",
    mbc: "own",
    mxv: "own",
    rki: "own",
    ruq: "own",
    yao: "spouse",
    kpf: "woman",
    sce: "woman",
    th_n: "mia",
    ttj: "own",
    bci: "own",
    chy: "spouse",
    co: "mulier",
    mer: "own",
    nzi: "own",
    tvl: "spouse",
    bin: "woman",
    crx: "own",
    gcf: "woman",
    gym: "spouse",
    lun: "own",
    wls: "spouse",
    ada: "woman",
    aja: "own",
    gaa: "own",
    kxc: "own",
    mos: "own",
    bla: "own",
    pot: "woman",
    cro: "own",
    nez: "own",
    nrf_gg: "woman",
    pt_gw: "woman",
    omc: "own",
    sid: "other",
    akb: "woman",
    gil: "spouse",
    mkz: "plain",
    pau: "spouse",
    bho: "woman",
    doi: "other",
    qu: "woman",
    quy: "woman",
    toj: "own",
    bxd: "woman",
    aoc: "own",
    so: "own",
    cnp: "laopo",
    cpx: "other",
    czh: "laopo",
    czh_wy: "laopo",
    hak_cn: "laopo",
    nan: "own",
    ja_kg: "own",
    ja_rys: "own",
    ja_sd: "own",
    ar_sd: "woman",
    nan_ph: "own",
    koy: "plain",
    bzd: "woman",
    fud: "spouse",
    hns: "potni",
    hop: "own",
    kln: "own",
    nus: "woman",
    sdo: "own",
    teo: "woman",
    gbm: "other",
    rcf: "woman",
    ter: "own",
    xnr: "potni",
    krc: "woman",
    mzh: "spouse",
    kaa: "woman",
    kqn: "own",
    luo: "own",
    bnn: "own",
    unr: "woman",
    apw: "own",
    piu: "spouse",
    win: "own",
  },
  routes: {
    woman: {"color":"#db2777","emoji":"👩","en":"the same word as woman","ja":"「女」と同じ語","ko":"‘여자’와 같은 말","zh":"与“女人”同词","yue":"同「女人」同一個詞","vi":"cùng một từ với “đàn bà”","th":"คำเดียวกับ “ผู้หญิง”","id":"sama dengan kata “perempuan”","hi":"‘औरत’ वाला ही शब्द","de":"dasselbe Wort wie Frau","fr":"le même mot que femme","it":"la stessa parola di donna","es":"la misma palabra que mujer","pt":"a mesma palavra que mulher","ru":"то же слово, что «женщина»","uk":"те саме слово, що «жінка»","ar":"الكلمة نفسها لـ«امرأة»","he":"אותה מילה כמו ״אישה״","sw":"neno sawa na mwanamke"},
    wib: {"color":"#d97706","emoji":"🛡️","en":"Proto-West Germanic *wīb (wife, Wief, waef)","ja":"西ゲルマン祖語 *wīb (wife, Wief, waef)","ko":"서게르만 조어 *wīb (wife, Wief, waef)","zh":"原始西日耳曼语 *wīb (wife, Wief, waef)","yue":"原始西日耳曼語 *wīb (wife, Wief, waef)","vi":"tiếng Tây German nguyên thủy *wīb (wife, Wief, waef)","th":"ภาษาเจอร์แมนิกตะวันตกดั้งเดิม *wīb (wife, Wief, waef)","id":"Proto-Jermanik Barat *wīb (wife, Wief, waef)","hi":"आदि-पश्चिम जर्मनिक *wīb (wife, Wief, waef)","de":"urwestgermanisch *wīb (wife, Wief, waef)","fr":"le proto-germanique occidental *wīb (wife, Wief, waef)","it":"il protogermanico occidentale *wīb (wife, Wief, waef)","es":"el protogermánico occidental *wīb (wife, Wief, waef)","pt":"o protogermânico ocidental *wīb (wife, Wief, waef)","ru":"празападногерманское *wīb (wife, Wief, waef)","uk":"празахідногерманське *wīb (wife, Wief, waef)","ar":"الجرمانية الغربية الأم *wīb (wife، Wief، waef)","he":"הפרוטו-גרמאנית המערבית *wīb (wife, Wief, waef)","sw":"Kijerumani cha Magharibi asilia *wīb (wife, Wief, waef)"},
    sponsa: {"color":"#be185d","emoji":"💍","en":"Latin spōnsa (esposa)","ja":"ラテン語 spōnsa (esposa)","ko":"라틴어 spōnsa (esposa)","zh":"拉丁语 spōnsa (esposa)","yue":"拉丁語 spōnsa (esposa)","vi":"tiếng Latinh spōnsa (esposa)","th":"ภาษาละติน spōnsa (esposa)","id":"bahasa Latin spōnsa (esposa)","hi":"लैटिन spōnsa (esposa)","de":"lateinisch spōnsa (esposa)","fr":"le latin spōnsa (esposa)","it":"il latino spōnsa (esposa)","es":"el latín spōnsa (esposa)","pt":"o latim spōnsa (esposa)","ru":"латинское spōnsa (esposa)","uk":"латинське spōnsa (esposa)","ar":"اللاتينية spōnsa (esposa)","he":"הלטינית spōnsa (esposa)","sw":"Kilatini spōnsa (esposa)"},
    mulier: {"color":"#0891b2","emoji":"🏛️","en":"Latin mulier (moglie, mugliera, mojère)","ja":"ラテン語 mulier (moglie, mugliera, mojère)","ko":"라틴어 mulier (moglie, mugliera, mojère)","zh":"拉丁语 mulier (moglie, mugliera, mojère)","yue":"拉丁語 mulier (moglie, mugliera, mojère)","vi":"tiếng Latinh mulier (moglie, mugliera, mojère)","th":"ภาษาละติน mulier (moglie, mugliera, mojère)","id":"bahasa Latin mulier (moglie, mugliera, mojère)","hi":"लैटिन mulier (moglie, mugliera, mojère)","de":"lateinisch mulier (moglie, mugliera, mojère)","fr":"le latin mulier (moglie, mugliera, mojère)","it":"il latino mulier (moglie, mugliera, mojère)","es":"el latín mulier (moglie, mugliera, mojère)","pt":"o latim mulier (moglie, mugliera, mojère)","ru":"латинское mulier (moglie, mugliera, mojère)","uk":"латинське mulier (moglie, mugliera, mojère)","ar":"اللاتينية mulier (moglie، mugliera، mojère)","he":"הלטינית mulier (moglie, mugliera, mojère)","sw":"Kilatini mulier (moglie, mugliera, mojère)"},
    gwen: {"color":"#4f46e5","emoji":"🌾","en":"Proto-Indo-European *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","ja":"印欧祖語 *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","ko":"인도유럽 조어 *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","zh":"原始印欧语 *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","yue":"原始印歐語 *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","vi":"tiếng Ấn-Âu nguyên thủy *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","th":"ภาษาอินโด-ยูโรเปียนดั้งเดิม *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","id":"Proto-Indo-Eropa *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","hi":"आदि-भारोपीय *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","de":"urindogermanisch *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","fr":"le proto-indo-européen *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","it":"il protoindoeuropeo *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","es":"el protoindoeuropeo *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","pt":"o proto-indo-europeu *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","ru":"праиндоевропейское *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","uk":"праіндоєвропейське *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","ar":"الهندو-أوروبية الأم *gʷénh₂ (жена، żona، 𐌵𐌴𐌽𐍃)","he":"הפרוטו-הודו-אירופית *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)","sw":"Kihindi-Kiulaya asilia *gʷénh₂ (жена, żona, 𐌵𐌴𐌽𐍃)"},
    potni: {"color":"#7c3aed","emoji":"🪷","en":"Proto-Indo-European *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","ja":"印欧祖語 *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","ko":"인도유럽 조어 *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","zh":"原始印欧语 *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","yue":"原始印歐語 *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","vi":"tiếng Ấn-Âu nguyên thủy *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","th":"ภาษาอินโด-ยูโรเปียนดั้งเดิม *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","id":"Proto-Indo-Eropa *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","hi":"आदि-भारोपीय *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","de":"urindogermanisch *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","fr":"le proto-indo-européen *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","it":"il protoindoeuropeo *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","es":"el protoindoeuropeo *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","pt":"o proto-indo-europeu *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","ru":"праиндоевропейское *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","uk":"праіндоєвропейське *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","ar":"الهندو-أوروبية الأم *pótnih₂ (पत्नी، ਪਤਨੀ، patni)","he":"הפרוטו-הודו-אירופית *pótnih₂ (पत्नी, ਪਤਨੀ, patni)","sw":"Kihindi-Kiulaya asilia *pótnih₂ (पत्नी, ਪਤਨੀ, patni)"},
    bharya: {"color":"#ea580c","emoji":"📿","en":"Sanskrit भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","ja":"サンスクリット भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","ko":"산스크리트어 भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","zh":"梵语 भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","yue":"梵語 भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","vi":"tiếng Phạn भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","th":"ภาษาสันสกฤต भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","id":"bahasa Sanskerta भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","hi":"संस्कृत भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","de":"Sanskrit भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","fr":"le sanskrit भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","it":"il sanscrito भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","es":"el sánscrito भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","pt":"o sânscrito भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","ru":"санскритское भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","uk":"санскритське भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","ar":"السنسكريتية भार्या bhāryā (ഭാര്യ، భార్య، ภรรยา)","he":"הסנסקריט भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)","sw":"Kisanskriti भार्या bhāryā (ഭാര്യ, భార్య, ภรรยา)"},
    vadhu: {"color":"#dc2626","emoji":"👰","en":"Sanskrit वधू vadhū (বউ, ووہٹی, bou)","ja":"サンスクリット वधू vadhū (বউ, ووہٹی, bou)","ko":"산스크리트어 वधू vadhū (বউ, ووہٹی, bou)","zh":"梵语 वधू vadhū (বউ, ووہٹی, bou)","yue":"梵語 वधू vadhū (বউ, ووہٹی, bou)","vi":"tiếng Phạn वधू vadhū (বউ, ووہٹی, bou)","th":"ภาษาสันสกฤต वधू vadhū (বউ, ووہٹی, bou)","id":"bahasa Sanskerta वधू vadhū (বউ, ووہٹی, bou)","hi":"संस्कृत वधू vadhū (বউ, ووہٹی, bou)","de":"Sanskrit वधू vadhū (বউ, ووہٹی, bou)","fr":"le sanskrit वधू vadhū (বউ, ووہٹی, bou)","it":"il sanscrito वधू vadhū (বউ, ووہٹی, bou)","es":"el sánscrito वधू vadhū (বউ, ووہٹی, bou)","pt":"o sânscrito वधू vadhū (বউ, ووہٹی, bou)","ru":"санскритское वधू vadhū (বউ, ووہٹی, bou)","uk":"санскритське वधू vadhū (বউ, ووہٹی, bou)","ar":"السنسكريتية वधू vadhū (বউ، ووہٹی، bou)","he":"הסנסקריט वधू vadhū (বউ, ووہٹی, bou)","sw":"Kisanskriti वधू vadhū (বউ, ووہٹی, bou)"},
    antat: {"color":"#0d9488","emoji":"🌙","en":"Proto-Semitic *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","ja":"セム祖語 *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","ko":"셈 조어 *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","zh":"原始闪米特语 *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","yue":"原始閃米特語 *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","vi":"tiếng Semit nguyên thủy *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","th":"ภาษาเซมิติกดั้งเดิม *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","id":"Proto-Semit *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","hi":"आदि-सामी *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","de":"ursemitisch *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","fr":"le proto-sémitique *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","it":"il protosemitico *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","es":"el protosemítico *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","pt":"o protossemítico *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","ru":"прасемитское *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","uk":"прасемітське *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","ar":"السامية الأم *ʔanṯ-at- (אישה، 𒁮، 𐤀𐤎𐤕)","he":"הפרוטו-שמית *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)","sw":"Kisemiti asilia *ʔanṯ-at- (אישה, 𒁮, 𐤀𐤎𐤕)"},
    zawja: {"color":"#b91c1c","emoji":"🐪","en":"Arabic زوجة (زوجة, zawdʒa, zoːʒe)","ja":"アラビア語 زوجة (زوجة, zawdʒa, zoːʒe)","ko":"아랍어 زوجة (زوجة, zawdʒa, zoːʒe)","zh":"阿拉伯语 زوجة (زوجة, zawdʒa, zoːʒe)","yue":"阿拉伯語 زوجة (زوجة, zawdʒa, zoːʒe)","vi":"tiếng Ả Rập زوجة (زوجة, zawdʒa, zoːʒe)","th":"ภาษาอาหรับ زوجة (زوجة, zawdʒa, zoːʒe)","id":"bahasa Arab زوجة (زوجة, zawdʒa, zoːʒe)","hi":"अरबी زوجة (زوجة, zawdʒa, zoːʒe)","de":"arabisch زوجة (زوجة, zawdʒa, zoːʒe)","fr":"l’arabe زوجة (زوجة, zawdʒa, zoːʒe)","it":"l’arabo زوجة (زوجة, zawdʒa, zoːʒe)","es":"el árabe زوجة (زوجة, zawdʒa, zoːʒe)","pt":"o árabe زوجة (زوجة, zawdʒa, zoːʒe)","ru":"арабское زوجة (زوجة, zawdʒa, zoːʒe)","uk":"арабське زوجة (زوجة, zawdʒa, zoːʒe)","ar":"العربية زوجة (زوجة، zawdʒa، zoːʒe)","he":"הערבית زوجة (زوجة, zawdʒa, zoːʒe)","sw":"Kiarabu زوجة (زوجة, zawdʒa, zoːʒe)"},
    binahi: {"color":"#1d4ed8","emoji":"🌴","en":"Proto-Malayo-Polynesian *binahi (bini, baine, bine)","ja":"マレー・ポリネシア祖語 *binahi (bini, baine, bine)","ko":"말레이폴리네시아 조어 *binahi (bini, baine, bine)","zh":"原始马来-波利尼西亚语 *binahi (bini, baine, bine)","yue":"原始馬來-玻里尼西亞語 *binahi (bini, baine, bine)","vi":"tiếng Malay-Polynesia nguyên thủy *binahi (bini, baine, bine)","th":"ภาษามลายู-โพลินีเซียดั้งเดิม *binahi (bini, baine, bine)","id":"Proto-Melayu-Polinesia *binahi (bini, baine, bine)","hi":"आदि-मलय-पॉलिनेशियाई *binahi (bini, baine, bine)","de":"urmalaiopolynesisch *binahi (bini, baine, bine)","fr":"le proto-malayo-polynésien *binahi (bini, baine, bine)","it":"il protomaleo-polinesiaco *binahi (bini, baine, bine)","es":"el protomalayo-polinesio *binahi (bini, baine, bine)","pt":"o proto-malaio-polinésio *binahi (bini, baine, bine)","ru":"прамалайско-полинезийское *binahi (bini, baine, bine)","uk":"прамалайсько-полінезійське *binahi (bini, baine, bine)","ar":"الملايو-بولينيزية الأم *binahi (bini، baine، bine)","he":"הפרוטו-מלאו-פולינזית *binahi (bini, baine, bine)","sw":"Kimalayo-Polinesia asilia *binahi (bini, baine, bine)"},
    mia: {"color":"#9333ea","emoji":"🐘","en":"Proto-Tai *miəᴬ (ເມຍ, เมีย, မေး)","ja":"タイ祖語 *miəᴬ (ເມຍ, เมีย, မေး)","ko":"타이 조어 *miəᴬ (ເມຍ, เมีย, မေး)","zh":"原始台语 *miəᴬ (ເມຍ, เมีย, မေး)","yue":"原始台語 *miəᴬ (ເມຍ, เมีย, မေး)","vi":"tiếng Thái nguyên thủy *miəᴬ (ເມຍ, เมีย, မေး)","th":"ภาษาไทดั้งเดิม *miəᴬ (ເມຍ, เมีย, မေး)","id":"Proto-Tai *miəᴬ (ເມຍ, เมีย, မေး)","hi":"आदि-ताई *miəᴬ (ເມຍ, เมีย, မေး)","de":"urtai *miəᴬ (ເມຍ, เมีย, မေး)","fr":"le proto-taï *miəᴬ (ເມຍ, เมีย, မေး)","it":"il proto-tai *miəᴬ (ເມຍ, เมีย, မေး)","es":"el prototai *miəᴬ (ເມຍ, เมีย, မေး)","pt":"o proto-tai *miəᴬ (ເມຍ, เมีย, မေး)","ru":"пратайское *miəᴬ (ເມຍ, เมีย, မေး)","uk":"пратайське *miəᴬ (ເມຍ, เมีย, မေး)","ar":"التاي الأم *miəᴬ (ເມຍ، เมีย، မေး)","he":"הפרוטו-טאי *miəᴬ (ເມຍ, เมีย, မေး)","sw":"Kitai asilia *miəᴬ (ເມຍ, เมีย, မေး)"},
    tsei: {"color":"#64748b","emoji":"🏮","en":"Old Chinese 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","ja":"上古中国語 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","ko":"상고 중국어 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","zh":"上古汉语 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","yue":"上古漢語 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","vi":"tiếng Hán thượng cổ 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","th":"ภาษาจีนเก่า 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","id":"Tionghoa Kuno 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","hi":"प्राचीन चीनी 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","de":"altchinesisch 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","fr":"le chinois archaïque 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","it":"il cinese antico 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","es":"el chino antiguo 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","pt":"o chinês antigo 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","ru":"древнекитайское 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","uk":"давньокитайське 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","ar":"الصينية القديمة 妻 *[tsʰ]ˤəj (妻子، 妻، tsʰɛj)","he":"הסינית העתיקה 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)","sw":"Kichina cha Kale 妻 *[tsʰ]ˤəj (妻子, 妻, tsʰɛj)"},
    laopo: {"color":"#a16207","emoji":"👵","en":"Chinese 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","ja":"中国語 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","ko":"중국어 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","zh":"汉语 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","yue":"漢語 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","vi":"tiếng Hán 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","th":"ภาษาจีน 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","id":"bahasa Tionghoa 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","hi":"चीनी 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","de":"chinesisch 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","fr":"le chinois 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","it":"il cinese 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","es":"el chino 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","pt":"o chinês 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","ru":"китайское 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","uk":"китайське 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","ar":"الصينية 老婆 (lou pʰɔː، lau pʰo، lɔ bu)","he":"הסינית 老婆 (lou pʰɔː, lau pʰo, lɔ bu)","sw":"Kichina 老婆 (lou pʰɔː, lau pʰo, lɔ bu)"},
    tuma: {"color":"#15803d","emoji":"🗾","en":"Proto-Japonic *tuma (妻 tsuma)","ja":"日琉祖語 *tuma (妻 tsuma)","ko":"일본류큐 조어 *tuma (妻 tsuma)","zh":"原始日本-琉球语 *tuma (妻 tsuma)","yue":"原始日本-琉球語 *tuma (妻 tsuma)","vi":"tiếng Nhật-Lưu Cầu nguyên thủy *tuma (妻 tsuma)","th":"ภาษาญี่ปุ่น-ริวกิวดั้งเดิม *tuma (妻 tsuma)","id":"Proto-Japonik *tuma (妻 tsuma)","hi":"आदि-जापानी *tuma (妻 tsuma)","de":"urjaponisch *tuma (妻 tsuma)","fr":"le proto-japonique *tuma (妻 tsuma)","it":"il protogiapponico *tuma (妻 tsuma)","es":"el protojapónico *tuma (妻 tsuma)","pt":"o protojapônico *tuma (妻 tsuma)","ru":"праяпонское *tuma (妻 tsuma)","uk":"праяпонське *tuma (妻 tsuma)","ar":"اليابانية الأم *tuma (妻 tsuma)","he":"הפרוטו-יפונית *tuma (妻 tsuma)","sw":"Kijaponiki asilia *tuma (妻 tsuma)"},
    anhai: {"color":"#c026d3","emoji":"🏠","en":"Middle Korean 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","ja":"中期朝鮮語 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","ko":"중세 한국어 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","zh":"中古朝鲜语 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","yue":"中古朝鮮語 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","vi":"tiếng Triều Tiên trung đại 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","th":"ภาษาเกาหลีสมัยกลาง 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","id":"Korea Pertengahan 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","hi":"मध्य कोरियाई 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","de":"mittelkoreanisch 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","fr":"le coréen moyen 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","it":"il coreano medio 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","es":"el coreano medio 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","pt":"o coreano médio 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","ru":"среднекорейское 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","uk":"середньокорейське 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","ar":"الكورية الوسطى 안ᄒᆡ (아내، 안해، 안ᄒᆡ)","he":"הקוריאנית התיכונה 안ᄒᆡ (아내, 안해, 안ᄒᆡ)","sw":"Kikorea cha Kati 안ᄒᆡ (아내, 안해, 안ᄒᆡ)"},
    bee: {"color":"#0369a1","emoji":"🎋","en":"Proto-Vietic *-bəːʔ (vợ, ꞗợ, 𡞕)","ja":"ベト祖語 *-bəːʔ (vợ, ꞗợ, 𡞕)","ko":"비엣 조어 *-bəːʔ (vợ, ꞗợ, 𡞕)","zh":"原始越芒语 *-bəːʔ (vợ, ꞗợ, 𡞕)","yue":"原始越芒語 *-bəːʔ (vợ, ꞗợ, 𡞕)","vi":"tiếng Việt-Mường nguyên thủy *-bəːʔ (vợ, ꞗợ, 𡞕)","th":"ภาษาเวียดติกดั้งเดิม *-bəːʔ (vợ, ꞗợ, 𡞕)","id":"Proto-Vietik *-bəːʔ (vợ, ꞗợ, 𡞕)","hi":"आदि-वियतिक *-bəːʔ (vợ, ꞗợ, 𡞕)","de":"urvietisch *-bəːʔ (vợ, ꞗợ, 𡞕)","fr":"le proto-viétique *-bəːʔ (vợ, ꞗợ, 𡞕)","it":"il protovietico *-bəːʔ (vợ, ꞗợ, 𡞕)","es":"el protovietico *-bəːʔ (vợ, ꞗợ, 𡞕)","pt":"o protovietico *-bəːʔ (vợ, ꞗợ, 𡞕)","ru":"правьетское *-bəːʔ (vợ, ꞗợ, 𡞕)","uk":"прав'єтське *-bəːʔ (vợ, ꞗợ, 𡞕)","ar":"الفيتية الأم *-bəːʔ (vợ، ꞗợ، 𡞕)","he":"הפרוטו-וייטית *-bəːʔ (vợ, ꞗợ, 𡞕)","sw":"Kivieti asilia *-bəːʔ (vợ, ꞗợ, 𡞕)"},
    akka: {"color":"#65a30d","emoji":"🦌","en":"Proto-Finnic *akka (akka, áhkká, ak)","ja":"フィン祖語 *akka (akka, áhkká, ak)","ko":"핀 조어 *akka (akka, áhkká, ak)","zh":"原始芬兰语 *akka (akka, áhkká, ak)","yue":"原始芬蘭語 *akka (akka, áhkká, ak)","vi":"tiếng Finn nguyên thủy *akka (akka, áhkká, ak)","th":"ภาษาฟินนิกดั้งเดิม *akka (akka, áhkká, ak)","id":"Proto-Finnik *akka (akka, áhkká, ak)","hi":"आदि-फ़िनिक *akka (akka, áhkká, ak)","de":"urfinnisch *akka (akka, áhkká, ak)","fr":"le proto-fennique *akka (akka, áhkká, ak)","it":"il protofinnico *akka (akka, áhkká, ak)","es":"el protofínico *akka (akka, áhkká, ak)","pt":"o protofínico *akka (akka, áhkká, ak)","ru":"праприбалтийско-финское *akka (akka, áhkká, ak)","uk":"прафінське *akka (akka, áhkká, ak)","ar":"الفينية الأم *akka (akka، áhkká، ak)","he":"הפרוטו-פינית *akka (akka, áhkká, ak)","sw":"Kifini asilia *akka (akka, áhkká, ak)"},
    nuliaq: {"color":"#e11d48","emoji":"🐻‍❄️","en":"Proto-Eskimo *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","ja":"エスキモー祖語 *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","ko":"에스키모 조어 *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","zh":"原始爱斯基摩语 *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","yue":"原始愛斯基摩語 *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","vi":"tiếng Eskimo nguyên thủy *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","th":"ภาษาเอสกิโมดั้งเดิม *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","id":"Proto-Eskimo *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","hi":"आदि-एस्किमो *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","de":"ur-eskimoisch *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","fr":"le proto-eskimo *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","it":"il protoeschimese *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","es":"el protoesquimal *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","pt":"o protoesquimó *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","ru":"праэскимосское *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","uk":"праескімоське *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","ar":"الإسكيموية الأم *nuliaʁ (nuliaq، ᓄᓕᐊᖅ، нулиӄ)","he":"הפרוטו-אסקימואית *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)","sw":"Kieskimo asilia *nuliaʁ (nuliaq, ᓄᓕᐊᖅ, нулиӄ)"},
    embireko: {"color":"#0f766e","emoji":"🦜","en":"Proto-Tupi-Guarani *embireko (emirekó, tembireko, imirikú)","ja":"トゥピ・グアラニー祖語 *embireko (emirekó, tembireko, imirikú)","ko":"투피과라니 조어 *embireko (emirekó, tembireko, imirikú)","zh":"原始图皮-瓜拉尼语 *embireko (emirekó, tembireko, imirikú)","yue":"原始圖皮-瓜拉尼語 *embireko (emirekó, tembireko, imirikú)","vi":"tiếng Tupi-Guarani nguyên thủy *embireko (emirekó, tembireko, imirikú)","th":"ภาษาตูปี-กวารานีดั้งเดิม *embireko (emirekó, tembireko, imirikú)","id":"Proto-Tupi-Guarani *embireko (emirekó, tembireko, imirikú)","hi":"आदि-तुपी-गुआरानी *embireko (emirekó, tembireko, imirikú)","de":"urtupi-guaranisch *embireko (emirekó, tembireko, imirikú)","fr":"le proto-tupi-guarani *embireko (emirekó, tembireko, imirikú)","it":"il prototupi-guaraní *embireko (emirekó, tembireko, imirikú)","es":"el prototupí-guaraní *embireko (emirekó, tembireko, imirikú)","pt":"o prototupi-guarani *embireko (emirekó, tembireko, imirikú)","ru":"пратупи-гуаранийское *embireko (emirekó, tembireko, imirikú)","uk":"пратупі-гуаранійське *embireko (emirekó, tembireko, imirikú)","ar":"التوبية-الغوارانية الأم *embireko (emirekó، tembireko، imirikú)","he":"הפרוטו-טופי-גוארני *embireko (emirekó, tembireko, imirikú)","sw":"Kitupi-Guarani asilia *embireko (emirekó, tembireko, imirikú)"},
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
    ast: ["esposa", "esˈposa"],
    av: ["лъади", "ɬːadi"],
    az: ["arvad", "ɑɾˈvɑd"],
    ba: ["ҡатын", "qɑˈtɯ̞n"],
    eu: ["emazte", "emaste"],
    bbl: ["ფსტუ", "pstʼu"],
    be: ["жонка", "ˈʐonka"],
    bn: ["বউ", "bou̯"],  // The everyday word, which also means bride and daughter-in-law; বেগম is an honorific for a Muslim lady.
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
    mhr: ["вате", "ˈvate"],
    mdf: ["ърьвя", "ərʲvʲa"],
    myv: ["ни", "ɲi"],
    udm: ["кышно", "kɨʃˈno"],
    koi: ["инь", "iɲ"],
    kpv: ["инь", "iɲ"],
    hu: ["feleség", "ˈfɛlɛʃeːɡ"],
    kca: ["ими", "ˈimi"],
    hi: ["बीवी", "biːʋiː"],
    ps: ["مېرمن", "merˈmən"],
    ku: ["kulfet", "kʊlˈfɛt"],
    os: ["ус", "us"],
    hyw: ["կին", "kin"],
    el: ["σύζυγος", "ˈsiziɣos"],
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
    sv: ["hustru", "ˈhɵsːtrɵ"],
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
    uz: ["rafiqa", "rafiˈqa"],
    kk: ["зайып", "zɑˈjəp"],
    tt: ["хатын", "χaˈtɤn"],
    cv: ["арӑм", "ˈarəm"],
    sah: ["ойох", "oˈjox"],
    mn: ["эхнэр", "ˈexner"],
    xal: ["гергн", "ɡerˈɡen"],
    evn: ["асӣ", "asiː"],
    gld: ["аси", "asi"],
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
    zh: ["妻子", "tɕʰi˥ tsɨ"],
    ha: ["mata", "mata"],
    rap: ["viʻe", "viʔe"],
    to: ["mali", "mali"],
    ay: ["warmi", "ˈwaɾmi"],
    arn: ["kure", "kuɾe"],
    dsb: ["žeńska", "ˈʒɛɲska"],
    ban: ["kurenan", "kurenan"],
    gay: ["banan", "banan"],  // The same word means woman: the ABVD Gayo list gives banan for both wife and woman.
    jv: ["bojo", "bɔdʒɔ"],
    iba: ["bini", "bini"],  // The ABVD Iban list gives indu' for woman and laki for husband.
    pam: ["asáwa", "aˈsawa"],
    bug: ["baine", "baine"],
    mad: ["bine", "bine"],  // A different word from bebini' 'woman' (Wiktionary), so wife has a word of its own, as Icelandic eiginkona beside kona does.
    mrw: ["kawiŋ", "kawiŋ"],
    sm: ["āvā", "aːvaː"],  // The ABVD Samoan list gives fafine for woman and tāne for husband.
    tet: ["fen", "fen"],  // The ABVD Tetun list gives feto for woman and la'en for husband.
    min: ["bini", "bini"],  // The ABVD Minangkabau list gives padusi for woman and laki for husband.
    sas: ["səninə", "səninə"],  // A different word from nina 'woman, female' (Wiktionary), so wife has a word of its own.
    ljp: ["majəw", "majəw"],  // The ABVD Lampung list gives səbay for woman and lakəy for husband.
    sda: ["baine", "baine"],  // The same word means woman: the ABVD Tae' (Sa'dan Toraja) list gives baine for both wife and woman.
    su: ["pamajikan", "pamadʒikan"],  // The ABVD Sundanese list gives awéwé for woman and salaki for husband.
    ami: ["fafahi", "fafahi"],
    dtp: ["sao", "sao"],
    ty: ["vahine", "vahine"],  // The same word means woman: ABVD's Tahitian lists give vahine for both wife and woman.
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
    es_pa: ["esposa", "ehˈposa"],
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
    en_ca: ["wife", "wʌɪf"],
    en_za: ["wife", "wɑɪf"],
    ca_va: ["dona", "ˈdona"],
    ja_osa: ["妻", "tsɯma"],
    ja_aom: ["妻", "tsɯma"],
    ja_hak: ["妻", "tsɯma"],
    ja_kyo: ["妻", "tsɯma"],
    ja_hir: ["妻", "tsɯma"],
    ko_kp: ["안해", "anhɛ"],  // North Korean standard spelling of 아내 (조선말사전; Wiktionary "North Korea, Yanbian").
    ko_bus: ["아내", "anɛ"],
    ko_yb: ["안해", "anhɛ"],  // Chinese Korean spelling of 아내 (연변일보 2026, 길림신문).
    es_mx: ["esposa", "esˈposa"],
    en_aave: ["wife", "waɪf"],
    en_au: ["wife", "wɑɪf"],
    en_south: ["wife", "waɪf"],
    en_app: ["wife", "waɪf"],
    en_in: ["wife", "ʋaɪf"],
    en_ie: ["wife", "waɪf"],
    en_sco: ["wife", "wəɪf"],
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
    es_cl: ["esposa", "ehˈposa"],
    es_ar: ["esposa", "esˈposa"],
    es_cu: ["esposa", "ehˈposa"],
    es_pe: ["esposa", "esˈposa"],
    es_an: ["esposa", "ehˈposa"],
    ko_hg: ["안해", "anhɛ"],  // North Korean spelling of 아내; no Hamgyong form recorded.
    ko_jl: ["아내", "anɛ"],
    dtp_kzj: ["sao", "sao"],
    es_pr: ["esposa", "ehˈposa"],
    es_do: ["esposa", "ehˈposa"],
    es_gt: ["esposa", "esˈposa"],
    es_ec: ["esposa", "esˈposa"],
    es_uy: ["esposa", "esˈposa"],
    es_ve: ["esposa", "ehˈposa"],
    alt: ["кадын", "kaˈdɯn"],  // The same word means woman; from Proto-Turkic *xātun.
    ota: ["قاری", "kaˈɾɯ"],  // The same word means woman.
    sa: ["पत्नी", "pɐtniː"],  // The feminine of पति 'husband, lord'; the word for woman is स्त्री.
    ltg: ["sīva", "ˈsʲiːva"],  // The same word means woman; cognate with Latvian sieva.
    mnc: ["ᠰᠠᡵᡤᠠᠨ", "sarɡan"],  // The word for woman is ᡥᡝᡥᡝ, which can also mean wife.
    fo: ["kona", "ˈkʰoːna"],  // The same word means woman.
    vo: ["jimatan", "ʃimaˈtan"],  // Literally 'female spouse', from ji- 'she-' and matan 'spouse'.
    got: ["𐌵𐌴𐌽𐍃", "kʷeːns"],  // The word for woman is the related 𐌵𐌹𐌽𐍉.
    dng: ["пәе", "pʰə˨˦iə˥˩"],  // The same word means woman; cognate with dialectal Mandarin 婆姨.
    sco: ["guidwife", "ˈɡɪdwəif"],  // Literally 'good woman', from guid 'good' and wife 'woman'.
    orv: ["жена", "ʒeˈna"],  // The same word means woman.
    rif: ["ⵜⴰⵎⵖⴰⵔⵜ", "θamʁaθ"],  // The same word means woman (and mother-in-law); inherited from Proto-Berber *ta-mɣar-t.
    ug: ["خوتۇن", "xoˈtun"],  // The same word means woman; from Proto-Common Turkic *xātun 'queen'.
    tsg: ["asawa", "ʔasaˈwa"],  // Inherited from Proto-Austronesian *qasawa; the word for woman is babai and for husband bana.
    cjy: ["老婆", "lau˥˧ pʰɤ˩"],  // The colloquial word for wife, written 老 'old' plus 婆 'old woman', as in Cantonese and Gan.
    si: ["බිරිඳ", "biriⁿdə"],  // The word for woman is ගෑනි gǣni (Wiktionary).
    lo: ["ເມຍ", "miːə̯˧˥"],  // Inherited from Proto-Tai *miəᴬ 'wife'; the ABVD Lao lists give ຍິງ ying for woman.
    ki: ["mũka", "moka"],  // The word for woman is mũtumia, which can also mean a married woman or wife.
    ms: ["isteri", "istəˈri"],  // Borrowed from Sanskrit स्त्री 'woman', but the Malay word for woman is perempuan; bini is the plainer synonym.
    blt: ["ꪣꪸ", "miə̯˥"],  // Inherited from Proto-Tai *miəᴬ 'wife'; the ABVD Tai Dam lists give ɲiŋ for woman.
    acw: ["زوجة", "zoːdʒa"],  // The Hijazi pronunciation of Arabic زوجة, as in the Arabic row.
    xmf: ["ოსური", "osuri"],  // The same word means woman; from Proto-Kartvelian *asul-.
    tl: ["asawa", "ʔaˈsawa"],  // The same word means spouse and husband; the Spanish loan esposa is also used.
    mr: ["बायको", "bajko"],  // An older use of the word also meant woman, but today's words for woman are बाई and स्त्री.
    sw: ["mke", "ˈm̩ke"],  // Also a contraction of mwanamke 'woman'.
    lep: ["ᰣᰦᰚᰪ", "ʔajɯ"],  // Wiktionary gives ᰊᰣᰤᰪ taʔyu for woman, a different word from this one.
    bew: ["bini", "bini"],  // Inherited from Malay bini; the entry's own quotation uses prempuan for woman.
    kgp: ["mré nĩ fi", "mɾɛnĩˈɸi"],  // Wiktionary gives ũn tỹtá for woman, a different word; the parts of mré nĩ fi are not glossed.
    eo: ["edzino", "eˈdzino"],  // Read as edzo 'husband, spouse' with the feminine ending -ino; its real origin is uncertain.
    cu: ["жена", "ʒena"],  // The same word means woman.
    rm: ["dunna", "ˈduna"],  // The same word means woman; it comes from Latin domina 'lady of the house'.
    fy: ["frou", "frɔu"],  // The same word means woman; wiif is dated for wife.
    ang: ["wīf", "wiːf"],  // The same word means woman.
    hsb: ["žona", "ˈʒɔna"],  // The same word means woman.
    as: ["ঘৈণী", "ɡʱoini"],  // From Sanskrit gṛhiṇī 'housewife'; the word for woman is মহিলা mohila.
    tk: ["aýal", "aˈjal"],  // Also 'married woman'; the word for woman is zenan, and gyz is an unmarried woman.
    lld: ["fëna", "ˈfəna"],  // The word for woman is ëila; fëna is the 'Ehefrau' sense (Forni's German–Gardenese dictionary).
    rgn: ["mój", "moj"],  // Inherited from Latin mulierem 'woman, wife'; the word for woman is dòna, and mujéṟ is a synonym.
    cdo: ["老妈", "lau˨˦˨ ma˧˧"],  // Literally 'old mother'; the same word means mum and old woman, and is 'wife' in Eastern Min.
    nap: ["mugliera", "muʎˈʎɛrə"],  // From Latin mulierem 'woman'; the word for woman is femmena, which can also mean wife.
    scn: ["mugghieri", "muɟˈɟɛɾi"],  // From Latin mulierem; the word for woman is fìmmina.
    oc: ["femna", "ˈfennɔ"],  // The same word means woman.
    yi: ["פֿרוי", "frɔɪ̯"],  // The same word means woman; ווײַב vayb also means both, but is less respectful.
    uga: ["𐎀𐎘𐎚", "ʔaθθatu"],  // The same word means woman, like Hebrew ʾiššā.
    rue: ["жона", "ʒoˈna"],  // The same word means woman; Prešov and Lemko say жена.
    mg: ["vady", "ˈvadi"],  // The everyday word for spouse (malagasyword.org: "a spouse"); vadiko "my wife". Replaces the literary andefimandry (gap rally R13, 2026-11-18).
    kl: ["nuliaq", "nuliaq"],  // Inherited from Proto-Inuit *nuliaʁ; the word for woman is arnaq.
    crh: ["apaqay", "apaˈqaj"],  // The same word means woman; apay is a synonym.
    ti: ["ሰበይቲ", "sɐbɐjti"],  // The same word means woman.
    sl: ["žena", "ˈʒɛːna"],  // The word for woman is ženska, derived from it.
    ks: ["آشَنؠ", "aːʃanʲ"],  // Inherited from Sanskrit āśraya; the word for woman is زَنانہٕ zanānụ, which can also mean wife.
    bo: ["སྐྱེ་དམན", "ce˥ mɛ̃˥"],  // The word for woman is བུད་མེད bud med.
    ksw: ["မါ", "má"],  // From Proto-Karen *hmaᴬ 'wife'; the word for woman is ပိာ်မုၣ် (Wiktionary), and Luangthongkum's Sgaw list gives mɨ for woman beside ma for wife.
    haw: ["wahine", "wahine"],  // The same word means woman; from Proto-Polynesian *fafine 'woman'.
    gan: ["老婆", "lau˨˩˧ pʰo˩˩"],  // Colloquial; written 老 'old' plus 婆 'old woman'.
    lzz: ["ჩილი", "tʃili"],  // From Proto-Kartvelian *c₁olʿ-; the word for woman is ოხორჯა oxorca.
    sc: ["muzere", "muˈdzere"],  // The same word means woman; from Latin mulierem 'woman, wife'.
    ur: ["بیوی", "biːʋiː"],  // Borrowed from Classical Persian bī-bī 'lady'; the word for woman is عورت aurat.
    wa: ["feme", "fɛm"],  // The same word means woman.
    vi: ["vợ", "vəː˧˨ʔ"],  // From Proto-Vietic *-bəːʔ; the word for woman is đàn bà or phụ nữ.
    tg: ["зан", "zan"],  // The same word means woman, from Classical Persian zan.
    blk: ["မာ", "ma̤˧˩"],  // From Proto-Karen *hmaᴬ 'wife', like S'gaw Karen မါ; the word for woman is လိုမူႏ (Wiktionary).
    yue: ["老婆", "lou˩˧ pʰɔː˨˩"],  // The everyday colloquial word, written 老 'old' plus 婆 'old woman'; 妻子 cai1 zi2 is formal.
    yua: ["atan", "atan"],  // The word for woman is koʼolel (Wiktionary).
    abs: ["maitua", "maitua"],  // mai plus tua 'old', compared with English 'old lady'; it also means girlfriend.
    id: ["istri", "ˈistri"],  // From Sanskrit strī through Malay, and the word for woman is perempuan.
    pdt: ["Wief", "viːf"],  // From Proto-West Germanic *wīb 'woman; wife'; the word for woman is Fru.
    ia: ["uxor", "ukˈsor"],  // The Latin word for wife; the word for woman is femina.
    rup: ["ãnveastã", "ənˈve̯astə"],  // From Proto-Slavic *nevěsta; it also means bride. muljari 'woman' can also mean wife.
    io: ["spozino", "spoˈzino"],  // spozo 'spouse' plus the feminine suffix -ino; the word for woman is muliero.
    nv: ["sheʼesdzáán", "ʃèʔèstsɑ́ːn"],  // 'My wife' is the possessed form of asdzáán 'woman'.
    rom: ["romni", "romni"],  // The same word means a Romani woman; it is rrom 'Romani man' with the feminine suffix -ni.
    ckb: ["ژن", "ʒɪn"],  // The same word means woman.
    wuu: ["老婆", "lɔ˨˨ bu˦˦"],  // The everyday Shanghainese word, written 老 'old' plus 婆 'old woman', as in Cantonese and Gan; the word for woman is 女人.
    tyv: ["кадай", "qaˈdaj"],  // The same word means woman; it comes from Proto-Turkic *xātun 'queen, lady'.
    km: ["ប្រពន្ធ", "prɑˈpŭən"],  // From Old Khmer prabandha 'bond, tie'; the word for woman is ស្រី.
    fur: ["femine", "ˈfɛmine"],  // The same word means woman; muîr is a synonym for wife.
    yai: ["inč", "intʃ"],  // From Sogdian, ultimately from Proto-Iranian *ǰánHs 'woman'; the CALS Yaghnobi lists give zaifa for woman and vir for husband.
    wo: ["jabar", "dʒabar"],  // The word for woman is jigéen; husband is jëkkër.
    pa: ["ਪਤਨੀ", "pətniː"],  // Borrowed from Sanskrit पत्नी; the word for woman is ਔਰਤ.
    mt: ["mara", "ˈmara"],  // The same word means woman, from Arabic imraʔa 'woman; wife'.
    sga: ["ben", "bʲen"],  // The same word means woman; séitig is a synonym for wife.
    hsn: ["堂客", "tan˩˧ kʰɤ˨˦"],  // In Xiang the same word also means a (married) woman.
    fro: ["fame", "ˈfãmə"],  // The same word means woman, especially of lower rank; dame was the word for a lady.
    akk: ["𒁮", "aʃʃatu"],  // The word for woman is sinništu; the sign DAM 'spouse' also writes mutu 'husband'.
    yo: ["aya", "aja"],  // The word for woman is obìnrin, which can also mean wife; ìyàwó is another word for wife.
    tab: ["хпиб", "χpib"],  // Glossed both 'female' and 'wife'; no word for woman is set beside it in the same source.
    mnp: ["老妈", "se˥˥ ma˨˩"],  // Literally 'old mother'; in Northern Min this word means wife, elsewhere mum or an old woman, as Eastern Min 老妈.
    tpn: ["emirekó", "ɛ̃miɾɛˈkɔ"],  // Literally 'what someone has with oneself'; the word for woman is kunhã.
    th: ["ภรรยา", "pʰan˧ jaː˧"],  // From Sanskrit भार्या 'wife'; it is the formal word, and the word for woman is ผู้หญิง.
    om: ["niitii", "niːtiː"],  // The word for woman is dubartii (Wiktionary).
    ky: ["аял", "ɑˈjɑl"],  // The same word means woman; it comes through Persian from Arabic ʕayāl 'offspring'.
    nmn: ["tâa qáe", "taa qae"],  // The same phrase means woman: tâa 'person' plus qáe 'female'.
    hai: ["jáa", "dʒáː"],  // Wiktionary gives jáadaa for woman, a different word from jáa.
    gl: ["esposa", "esˈposa"],  // From Latin spōnsa; muller, the word for woman, is also used for wife.
    mdr: ["baine", "bainɛ"],  // From Proto-Malayo-Polynesian *babinahi; Wiktionary gives tobaine for woman, a different word.
    gu: ["પત્ની", "ˈpətniː"],  // A learned borrowing from Sanskrit पत्नी; the word for woman is નારી, though several woman words can also mean wife.
    mk: ["жена", "ˈʒɛna"],  // The same word means woman; сопруга is a formal synonym.
    blc: ["cnas", "çnas"],  // The same word means woman.
    shi: ["ⵜⴰⵎⵖⴰⵔⵜ", "tamɣart"],  // The same word means woman, from Proto-Berber *ta-mɣar-t 'old woman'.
    txb: ["𑀰𑀦", "ɕana"],  // Tocharian B śana; the same word means woman (Wiktionary).
    vi_c: ["vợ", "vəː˧˩"],  // The same word as standard Vietnamese, with the Huế nặng tone.
    vi_s: ["vợ", "jəː˨˩˨"],  // The same word as standard Vietnamese, with Southern j- for v-.
    wuu_sz: ["女人", "ȵy˨˧˩ ȵiən˨˨˧"],  // The same word as 女人 'woman', listed first for Suzhou.
    wuu_nb: ["老婆", "lɔ˩˩˧ bəu˧˩˧"],  // Literally 'old woman', the everyday word for a wife; the word for woman is 女人.
    wuu_jh: ["老婆", "lɑu˥˧˥ bɤ˧˩˧"],  // Literally 'old woman', the everyday word for a wife; the word for woman is 女人.
    wuu_wz: ["老安", "lɜ˧˦ ʔjy˧˧"],  // A word of its own: Wiktionary's dialect tables give 女個 and 老人客 for a Wenzhou woman.
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
    new: ["कलाः", "kəlaː"],  // The word for woman is misā (Hale's Newar list).
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
    kum: ["къатын", "qaˈtɯn"],  // Qatın means both woman and wife.
    prg: ["genno", "ˈɡʲænoː"],  // From Proto-Balto-Slavic *génāˀ; genno means both woman and wife, like Russian жена once did.
    ppl: ["siwat", "ˈsiwaːt"],  // Siwat is woman, and possessed it means wife (nusiwaw 'my wife').
    iu: ["ᓄᓕᐊᖅ", "nuliaq"],  // From Proto-Inuit *nuliaʁ; the word for woman is ᐊᕐᓇᖅ arnaq (Wiktionary).
    gag: ["karı", "kaˈrɯ"],  // Karı is both woman and wife, from Old Anatolian Turkish qarı, 'old person'.
    csb: ["białka", "ˈbjawka"],  // Białka means both woman and wife.
    bm: ["muso", "mùso"],  // Muso means both woman and wife.
    awa: ["मेहरारू", "mehraːruː"],  // Mehrārū means both woman and wife; from Sanskrit mahilā 'woman' plus rūpa.
    mfe: ["fam", "fam"],  // From French femme; fam means both woman and wife.
    mak: ["baine", "baˈine"],  // Baine means woman and also wife.
    brx: ["हिनजाव", "hindʒao"],  // Hinjao means both woman and wife.
    xpu: ["𐤀𐤎𐤕", "ʔist"],  // The source gives one word for wife and no woman word beside it.
    tcs: ["oman", "oman"],  // From English woman; it is both 'wife' and the word for a (married) woman, with gel for an unmarried one (Wiktionary).
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
    ium: ["auv", "au˦"],  // From Chinese 媼; the ABVD Mien (Jiangdi) list gives mjen sje for woman and gu for husband.
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
    gor: ["binggele", "biŋɡele"],  // Wiktionary gives taa bua for woman, a different word.
    tar: ["upí", "upi"],  // Hilton's Tarahumara dictionary gives muqui for woman and cuna for husband.
    dlg: ["дьактар", "dʲaktar"],  // The same word means woman; cognate with Yakut дьахтар.
    bej: ["hiyu", "ˈhiju"],  // The same word means husband.
    bgc: ["बीर", "biːr"],  // The same word means woman.
    ny: ["mkazi", "m̩ˈkazi"],  // The same word means woman; from Proto-Bantu mʊ̀kádí.
    xmr: ["𐦱𐦨", "səma"],  // The word for woman is a different one, 𐦲𐦷𐦢 (Wiktionary).
    wal: ["machchiyo", "matʃːijo"],  // Wiktionary gives maccaasiyo for woman, a different word.
    ket: ["ӄим", "qʲim"],  // One word for woman and wife, inherited from Proto-Yeniseian *qim 'woman'.
    egl: ["mujêr", "muˈjeːr"],  // From Latin mulier; the word for woman is dòna (Wiktionary).
    mag: ["मेहरारू", "meːhraːruː"],  // One word for woman and wife.
    mni: ["ꯇꯥꯂꯣꯏ", "taloi"],  // The source gives this one word for wife; no word for woman is beside it, so the route is unknown.
    dv: ["އަނބި", "aᵐbi"],  // Inherited from Sanskrit ambā; the word for woman is އަންހެނާ anhenā (Wiktionary).
    lus: ["nupui", "nupui"],  // Nu 'mother' + -pui, an augmentative suffix; the word for woman is hmeichhia (Wiktionary).
    kok: ["बायल", "baːjl"],  // One word for woman and wife.
    yux: ["тэрикэ", "terɪkə"],  // The same word means old woman; borrowed from Russian старуха 'old woman'.
    udi: ["чугьух", "tʃuhuχ"],  // One word for woman and wife (Nij dialect), from Caucasian Albanian čibux̣.
    sjo: ["ᡨᠠᡞᡨᠠᡞ", "tʰɑitʰɑi"],  // Borrowed from Mandarin 太太 tàitai; the source gives no word for woman beside it, so the route is unknown.
    nag: ["maiki", "maiki"],  // One word for woman and wife, from Assamese মাইকী.
    khw: ["بؤوک", "bɔˈʊk"],  // From Sanskrit vadhūkkā 'bride'; the word for woman is کمیری kimeri (Wiktionary).
    eve: ["аси", "asi"],  // One word for woman and wife, from Proto-Tungusic *asī.
    sd: ["جوءِ", "dʒoːi"],  // Inherited from Prakrit juvaï, from Sanskrit युवति yuvatí 'young woman'; the entry gives no word for woman beside it.
    xkz: ["’nêsang", "néːsaŋ"],  // Hyslop's Kurtöp grammar gives nésaŋ for wife and 'ama or moja for woman.
    txg: ["𗪰", "ɡji˧˥"],  // A word of its own; the word for woman is 𗶈 *dẹ¹.
    ett: ["puia", "ˈpuia"],  // Perhaps related somehow to Ancient Greek ὀπυίω 'to marry'; no Etruscan word for woman stands beside it.
    squ: ["chewásh", "tʃəwaʃ"],  // A married woman; the word for woman is slhánay̓ (Wiktionary).
    bdq: ["akăn", "ʔakan"],  // From Proto-Bahnaric *ʔəkan 'wife', a prefixed form of *kan 'female'; Wiktionary gives drŏ-kăn for woman, a different word.
    ibb: ["n̄n̄waan", "ŋ̍ŋwaːn"],  // The same word means woman and wife (and female).
    slr: ["kiyne", "kʰijni"],  // From Proto-Turkic *kẹlin; the word for woman is a different one, qadın.
    ykg: ["мирийэ", "mirije"],  // From Proto-Yukaghir *mirijə; the word for woman is a different one, пайпэ.
    xag: ["čibux̣", "tʃibuχ"],  // From Proto-Lezghian; the same word means woman and wife.
    yrl: ["imirikú", "imiɾiˈku"],  // Inherited from Old Tupi emirekó; the word for woman is a different one, kunhã.
    bsk: ["yuus", "juːs"],  // The word for woman is a different one, gus.
    tzm: ["ⵜⴰⵎⵟⵟⵓⵜⵜ", "tamtˤːutː"],  // Inherited from Proto-Berber; the same word means woman and wife.
    xpg: ["knais", "knais"],  // From Proto-Indo-European *gʷneh₂- 'woman'; the same word means woman and wife.
    tay: ["kneril", "kəneril"],  // The same word means woman and wife.
    obr: ["မိယဟ်", "mijah"],  // The Old Burmese word for woman is minḥ-ma (Sagart's and Lai's Old Burmese lists).
    pms: ["fomna", "ˈfumnɐ"],  // From Latin fēmina; the same word means woman and wife.
    fax: ["mullel", "muˈʎel"],  // Inherited from Old Galician-Portuguese moller; the same word means woman and wife.
    dz: ["ཨམ་སྲུ", "amsu"],  // The same word means woman and wife.
    mfa: ["bining", "biniŋ"],  // Inherited from Proto-Malayic *bini.
    gd: ["bean", "pɛ̃n"],  // The same word means woman and wife (Wiktionary); bean-phòsda and bean-chèile spell out 'married'.
    shn: ["မေး", "meː˥"],  // The word for woman is ယိင်း ying, in the ABVD and IDS Shan lists alike.
    zza: ["veyve", "ˈvɛjvɘ"],
    mch: ["jinñamo", "hʷinɲamo"],  // The word for woman is wodi (Wiktionary).
    gmh: ["wip", "wiːp"],  // Also 'woman'.
    prs: ["زن", "zan"],
    lij_t: ["mogê", "muˈdʒeː"],
    sr: ["жена", "ʒěna"],  // The same word means woman; супруга is also used.
    pt_br: ["esposa", "isˈpozɐ"],  // As in Portugal; mulher is also used.
    pt_ao: ["esposa", "ɨʃˈpozɐ"],  // As in Portugal; mulher is also used.
    pt_mz: ["esposa", "ɨʃˈpozɐ"],  // As in Portugal; mulher is also used.
    pt_mo: ["esposa", "ɨʃˈpozɐ"],  // As in Portugal; mulher is also used.
    pt_cv: ["esposa", "ʃˈpozɐ"],  // As in Portugal; mulher is also used.
    zh_tw: ["妻子", "tɕʰi˥ tsɨ˨˩˦"],  // The same word as Mainland Mandarin; Taiwan keeps the full tone on 子.
    de_at: ["Frau", "fraʊ̯"],  // The same word as woman, as in standard German.
    de_ch: ["Frau", "fraʊ̯"],  // The same word as woman, as in standard German.
    nl_be: ["vrouw", "vrɑu̯"],  // The same word as woman, as in Dutch.
    en_nz: ["wife", "wɑɪf"],  // Same word as standard English; IPA from the row's own cells.
    en_geordie: ["wife", "wɛɪf"],  // Same word as standard English; IPA from the row's own cells.
    el_koi: ["γυνή", "ɡyˈne̝"],
    la_late: ["uxor", "ˈoksor"],
    egy_dem: ["ḥm.t", "hime"],
    vi_mid: ["ꞗợ", "βəː˧˨ʔ"],
    arc: ["אִתְּתָא", "ʔittəθaː"],
    mn_cn: ["ᠡᠬᠡᠨᠡᠷ", "əxnər"],
    jya: ["ta-rdʑap", "tardʑap"],
    mjg: ["beeri", "peːri"],  // Also yiri.
    mvf: ["beeri", "beeri"],  // Also yiri.
    peh: ["uerə", "uerə"],
    qxs: ["tɕime", "tɕi˥˥me˧˩"],  // The word for woman is tɕi.
    ybe: ["kelin", "kelin"],  // The word for woman is kʰempiṣtïɣ (Roos).
    bca: ["vujɪ̃", "vu˧˧jɪ̃˨˩"],  // Sun 1991 (Jianchuan Bai) vu³³jɪ̃²¹. Surface follows the row: IPA without tones. Woman is jṽ³³jɪ̃²¹; the list also gives tsʰe⁵⁵.
    blr: ["ka31 muiŋ31 ʔɨ51", "ka˧˩ muiŋ˧˩ ʔɨ˥˩"],  // IDS 801 Bulang (Peiros) ka.31 muiŋ.31 ʔɨ.51, the doculect this row's other IDS cells come from. Woman is ka31 pən55, a different word.
    bru: ["lacuoi", "ləkuoj"],
    duu: ["pɯmɑ", "pɯmɑ"],  // The same word as woman.
    gqu: ["lai44", "lai˦˦"],
    hmn: ["poj niam", "pɔ˥˨ nia˨˩ˀ"],  // The same word as woman.
    ii: ["ꑮꃀ", "ɕɿ˨˩mo˨˩"],  // ꑮ 'to marry' + ꃀ 'female'.
    jio: ["naːu", "naːu˥˧"],  // The word for a woman is mɯ taːu.
    jiu: ["khɔ44mɔ44", "kʰɔ˦˦mɔ˦˦"],  // The same word as woman.
    kdt: ["nthɛ̤ːl", "ntʰɛːl"],
    khb: ["ᦵᦙ", "meː˥˩"],
    kjg: ["kmbraʔ", "kmbraʔ"],
    kmc: ["mai31", "mai˧˩"],  // Woman is mjek323 in the same list, a different word.
    kxm: ["ប្រពន្ធ", "ppuən"],
    lhu: ["ɔ̀-mî-ma", "ɔ̀mîma"],  // Sun 1991 (Black Lahu) ɔ³¹mi⁵³mᴀ³³; woman is zᴀ⁵³mi⁵³mᴀ³⁵. Spelling is derived: tone marks converted using the row's own pairs (53 ^, 54 ^ʼ, 31 grave, 35 acute, 21 grave with glottal, 11 macron).
    lic: ["pai3 khau2", "pai˩˩ kʰau˥˥"],  // The same word as woman; also tho:ŋ3 dun1.
    lis: ["za-mu", "zɑ˧˩mɯ˧˧"],
    mlm: ["ma:i4", "maːi˨˦"],
    mmd: ["lja3", "lja˥˩"],
    mra: ["ʔak mja", "ʔak mja"],
    nuf: ["mi31ɑ31", "mi˧˩ɑ˧˩"],  // The same word as woman.
    nxq: ["ninvq", "ɲi˧nv̩˨˩"],  // Sun 1991 (Lijiang Naxi) ȵi³³nv³¹. Naxi spelling is derived; the source is IPA. Woman is mi⁵⁵tɕʰy³³, a different word.
    pmi: ["tʂhə35", "ʈʂʰə˧˥"],
    prk: ["mōuing", "mo̤ɲ"],
    shx: ["va44", "va˦˦"],  // Also a22 va44; woman is le31 va44.
    swi: ["ɕa3", "ɕa˧˧"],
    th_isan: ["เมีย", "mia˧˥˨"],  // Woman is ญิง.
    wbm: ["moeng", "moɲ"],
    za: ["baz", "pa˧˩"],  // also yah
    agt: ["atawa", "ʔatawa"],  // The same word means husband.
    aoz: ["fel", "fel"],  // The word for woman is bifel.
    bik: ["agom", "ʔaˈɡom"],
    bjn: ["bini", "bini"],
    bto: ["agom", "aˈɡom"],
    bts: ["parinangon", "parinaŋon"],
    bzg: ["roos", "roːs"],
    cia: ["movine", "moβine"],
    ckv: ["napawan", "napawan"],  // The same word means husband.
    hil: ["asawa", "ʔaˈsawa"],
    ilo: ["asawa", "ʔaˈsawa"],  // The word for a spouse of either sex, as in the row's husband cell.
    ivv: ["kakovot", "kakovot"],  // Kakovot is either spouse; kakovot a mavakes 'female spouse' when it must be said.
    mdh: ["kaluma", "kaˈluma"],
    mui: ["bini", "bini"],
    nij: ["sawa", "sawa"],
    pag: ["asawa", "ʔaˈsawa"],  // Also 'husband': one word for the spouse.
    pyu: ["kataguwin", "kataɡuwin"],
    pzh: ["mamais", "mamais"],
    szy: ["acawa", "atsawa"],
    tao: ["mavakes", "mavakəs"],  // Also the word for woman; husband mehakay is also man.
    trv: ["kuyuh", "kujuh"],
    tsu: ["vcongʉ", "vtsoŋɨ"],
    war: ["asawa", "ʔaˈsawa"],  // The same word means husband; it is "spouse".
    acn: ["nʲi31mɔʔ31", "nʲi˧˩mɔʔ˧˩"],
    bgq: ["घराळी", "ɡʱəraːɭiː"],  // Bagri also uses लुगाई "woman" for a wife; the commonest wife word in this text is घराळी.
    clk: ["e55jɑŋ55kɹu55", "e˥˥jɑŋ˥˥kɹu˥˥"],
    kac: ["madu jan", "mətuʔ˧˩ tʃan˧"],  // Built on madu 'lord, master', like madu wa 'husband'.
    kgg: ["ɲãɴʕdi", "ɲãɴʕdi"],  // The word for woman, ɲãɴʕdidze, is built on it.
    kha: ["ka tnga", "ka tŋa"],
    lif: ["ᤔᤣ᤺ᤳ", "meːt"],
    njo: ["kinungtsü", "kinuŋtsə"],  // Ki "house", nung "in", tsü "mother": the mother in the house. The word for woman is tetsür.
    nzm: ["hepui", "hepui"],
    rkt: ["মাইয়া", "maija"],
    sat: ["ᱮᱨᱟ", "era"],
    tdh: ["नाइमे", "naime"],
    thr: ["बईय्यर", "bəiːjːər"],  // The same word as woman.
    tsj: ["tsʰeroʔ", "tsʰeɾoʔ"],
    twm: ["pᴀk13ser55", "pᴀk˩˧ser˥˥"],
    el_grc: ["γυνή", "ɡynɛ̌ː"],
    el_kath: ["γυνή", "ʝiˈni"],
    xfa: ["uxor", "ˈuksor"],
    ace: ["peurumoh", "pɯrumɔh"],
    cnh: ["nupi", "nupi"],
    hne: ["घरवाली", "ɡʱərʋaːliː"],
    hoc: ["era", "era"],  // Burrows gives erá for both wife and woman.
    kxv: ["ḍokri", "ɖokri"],  // The word for woman is ayya; ḍokri ḍokra is 'wife and husband'.
    nia: ["foʼomo", "foʔomo"],
    or: ["ପତ୍ନୀ", "pɔtni"],  // Colloquial ମାଇକିନା also means woman.
    pwo: ["အမၫ", "ʔə ma"],  // The word for woman is ၦမုၪ.
    rhg: ["bou", "bou"],
    tcy: ["ಬೊಡೆದಿ", "boɖedi"],
    ar_qur: ["زوج", "zawdʒ"],
    egy: ["𓈞𓏏𓁐", "hemet"],
    gez: ["ብእሲት", "bəʔəsiːt"],
    hbo: ["אשה", "ʔiʃˈʃɔː"],
    he_mis: ["אשה", "ʔiˈʃa"],
    myz: ["ࡏࡍࡕࡀ", "enta"],
    sux: ["𒁮", "dam"],
    syc: ["ܐܢܬܬܐ", "ʔattəθaː"],
    xsa: ["𐩱𐩬𐩻𐩩", "ʔanθat"],
    fa_clas: ["زن", "zan"],
    hy_grab: ["կին", "kin"],
    kho: ["𑀦𑀸𑀭𑀸", "naːraː"],
    sog: ["wδw", "waðu"],
    xlu: ["wanatti-", "ˈwanatːi"],
    xto: ["𑀰𑀁", "ɕəm"],
    cjs: ["эпчи", "eptʃi"],
    ckt: ["ӈэвъэн", "ŋeβʔen"],
    itl: ["ӈыч", "ŋitʃ"],
    ja_mvi: ["妻", "tudzɨ"],
    ja_oki: ["刀自", "tudʑi"],
    kim: ["эпші", "epʃi"],  // The same word as woman.
    kjh: ["ипчі", "ipˈtʃi"],
    ko_jeju: ["각시", "kak̚ɕ͈i"],
    kos: ["kangkuh", "kaŋkʌ"],
    mns: ["э̄ква", "ˈeːkʷa"],
    niv: ["умгу", "umɡu"],
    sel: ["иматы", "jimatɨ"],
    h_tagalog: ["ᜀᜐᜏ", "aˈsawa"],
    h_vedic: ["पत्नी", "pɐ́tniː"],
    osn: ["ewe", "ewe"],
    pi_edu: ["bhariyā", "bʱarijaː"],
    sa_edu: ["पत्नी", "pɐtniː"],
    sukh: ["เมีย", "mia"],
    xct: ["ཆུང་མ", "tɕʰuŋma"],
    xct_litpr: ["ཆུང་མ", "tɕʰuŋma"],
    abq: ["пхӏвыс", "pħʷəs"],  // Also the word for woman; тагвжва is also given.
    ani: ["гьорчӏчӏи", "hortʃʼːi"],
    aqc: ["лълъоннол", "ɬːonːol"],  // The same word as woman.
    bal: ["جن", "dʒan"],
    ddo: ["бару", "baru"],
    huz: ["ахъе", "aqe"],  // Also the word for woman.
    inh: ["сесаг", "sesaɡ"],
    khv: ["гъини", "ʁini"],
    lbe: ["щарсса", "ɕːarsːa"],  // Щарсса means both woman and wife.
    nog: ["хатын", "χaˈtɯn"],
    pnb: ["ووہٹی", "ʋɔ́ːʈiː"],  // Also 'bride'.
    skr: ["زال", "zaːl"],  // Also the word for woman.
    sva: ["ხეხუ̂", "xexw"],
    yrk: ["не", "nʲe"],
    cmg: ["ᠭᠡᠷᠭᠡᠢ", "ɡerɡei"],
    och: ["妻", "*[tsʰ]ˤəj"],
    vi_han: ["妻", "tʰe˧˧"],
    vi_nom: ["𡞕", "vəː˧˨ʔ"],
    xng: ["ᠭᠡᠷᠭᠡᠢ", "ɡerɡei"],
    xqa: ["kis", "kis"],
    zh_tang: ["妻", "tsʰɛj"],
    zh_wenyan_edu: ["妻", "tsʰɐi˥"],
    zh_yuan: ["妻", "tsʰi"],
    ja_chu: ["妻", "tsuma"],
    ja_edo: ["女房", "ɲoːboː"],
    ja_heian: ["妻", "me"],
    ja_kanbun: ["妻", "tsɯma"],
    ko_em: ["안ᄒᆡ", "anhɛ"],
    ko_mid: [":겨집", "kjətsip"],
    ojp: ["妻", "tuma"],
    agx: ["хьир", "xir"],  // The same word means woman.
    aii: ["ܒܟܬܐ", "baxtɑː"],  // Also the word for woman.
    ar_jo: ["مرة", "ˈmara"],  // The same word means woman.
    ar_ps: ["زوجة", "ˈzoːʒe"],  // Also مرة mara, the word for woman.
    azb: ["آرواد", "ɑɾˈvɑd"],  // The same word as 'woman'.
    bdk: ["гьедж", "hedʒ"],
    bqi: ["زینه", "zejne"],  // The same word means woman.
    jpr: ["זן", "zæn"],
    kjj: ["инхъаьдаь", "inqʰædæ"],
    kry: ["xınıb", "xɨnɨb"],  // The same word as 'woman'.
    rut: ["къари", "qari"],  // The word for woman is хьыдылды.
    sdh: ["ژن", "ʒɪn"],
    ssy: ["numa", "numa"],  // The same word as 'woman'.
    tig: ["እሲት", "ʔəsit"],  // Also the word for woman.
    tkr: ["хьунаще", "xunaʃːe"],  // The same word as 'woman'.
    de_lut: ["Weib", "vaɪ̯p"],
    en_em: ["wife", "wəif"],
    enm: ["wyf", "wiːf"],
    osx: ["wīf", "wiːf"],  // The same word means woman.
    pmh: ["भज्जा", "bʱadʒːaː"],
    dje: ["wande", "wande"],
    gha: ["talta", "talta"],
    mlq: ["muso", "muso"],
    ses: ["wande", "wande"],
    siz: ["taltí", "talˈti"],
    snk: ["yaqe", "jaqe"],
    ttq: ["tantut", "tantˤutˤ"],
    es_sgl: ["muger", "muˈʃeɾ"],
    fr_class: ["femme", "fam"],
    it_dan: ["moglie", "ˈmoʎʎe"],
    mga: ["ben", "bʲen"],
    ohu: ["feleség", "fɛlɛʃeːɡ"],
    dag: ["paɣa", "paɣa"],  // The same word means 'woman'.
    deg: ["ọvitam", "ɔviɾam"],
    dnj: ["dhēbʌ̏", "ɗēɓʌ̏"],
    dyu: ["muso", "muso"],
    efi: ["n̄wan", "ŋwan"],  // The same word means 'woman'.
    fon: ["asi", "asi"],
    ig: ["nwunye", "ŋʷuɲe"],
    iso: ["aye", "aje"],
    izz: ["nyee", "ɲeː"],
    kbp: ["halʋ", "halʊ"],
    kpe: ["nɛni", "nɛni"],
    kri: ["wɛf", "wɛf"],
    maw: ["pɔ'a", "pɔʔa"],  // The same word means 'woman'.
    spp: ["cwoŋi", "tʃwoŋi"],
    sus: ["ginɛ", "ɡinɛ"],
    tiv: ["kwase", "kʷase"],
    urh: ["aye", "aje"],
    chb: ["güi", "ɡwi"],
    emy: ["atan", "atan"],
    nci: ["cihuātl", "ˈsiwaːtɬ"],
    onw: ["ⲉⲧ̅ⲧ", "itː"],
    qwc: ["warmi", "waɾmi"],
    p_ine: ["*pótnih₂", "pótnih₂"],
    p_toc: ["*ćänā", "tɕənaː"],
    p_tun: ["*asī", "asiː"],
    p_viet: ["*-bəːʔ", "-bəːʔ"],
    paus: ["*qasawa", "qasawa"],
    pban: ["*mʊ̀kádí", "mʊ̀kádí"],
    psem: ["*ʔanṯ-at-", "ʔanθat"],
    ptai: ["*miə", "miə"],
    aa: ["barra", "barˈra"],  // Barra is also the word for 'woman'.
    ach: ["ci", "tʃi"],
    bem: ["umukashi", "umukaʃi"],
    bum: ["ngal", "ŋɡal"],
    cgg: ["omukazi", "omukazi"],
    jmc: ["nka", "nka"],  // The same word as "woman" (TLS woman: nka).
    kam: ["kĩveti", "keβɛti"],
    kde: ["mmahe", "mːahe"],
    kg: ["nkento", "nkento"],  // Also 'woman'.
    kmb: ["muhatu", "muhatu"],  // Also 'woman'.
    kr: ["kamu", "kamu"],  // The same word means woman: the WOLD Kanuri list gives kámú for both.
    lg: ["omukazi", "omukazi"],
    lol: ["waji", "wadʒi"],  // Not the word for woman, bómòtò.
    lua: ["mukaji", "mukaʒi"],  // The same word means woman.
    mas: ["enkitok", "eŋkitok"],  // Also 'woman'.
    nyn: ["omukazi", "omukazi"],
    nyo: ["omukyara", "omukjara"],
    rn: ["umugore", "umuɡoɾe"],  // Umugore is also the word for 'woman'.
    saq: ["mparatut", "mparatut"],  // The word for woman is nkitok (Payne & Ole-Kotikash).
    sg: ["wâlï", "wali"],  // The same word means woman.
    suk: ["nke", "nke"],
    tll: ["wadi", "wadi"],
    tum: ["muwoli", "muwoli"],  // The word for woman is mwanakazi.
    xed: ["màràkw", "màràkʷ"],
    xog: ["omukyala", "omukjala"],
    zdj: ["mndru-mshe", "mndʳu mʃe"],  // Literally 'female person', also 'woman'.
    her: ["omukazendu", "omukazendu"],
    kj: ["omukulukadi", "omukulukadi"],
    loz: ["musali", "musali"],
    nbl: ["umfazi", "umfazi"],
    ng: ["omukulukadhi", "omukulukaði"],
    seh: ["nkazi", "nkazi"],
    ssw: ["umfati", "umfati"],
    toi: ["mukaintu", "mukaintu"],
    ts: ["nsati", "nsati"],
    umb: ["ukãi", "ukãi"],
    ve: ["mufumakadzi", "mufumakadzi"],
    xh: ["umfazi", "um̩faːzi"],
    zu: ["umfazi", "umˈfaːzi"],
    frr: ["wüf", "vʏf"],  // Wiktionary frr wüf (Mooring): woman; wife.
    lmo: ["miee", "mjeː"],
    vec: ["mojère", "moˈjɛre"],
    acf: ["madanm", "madãm"],  // Also 'lady, woman'; from French madame.
    gcr: ["madanm", "madãm"],
    srm: ["mujë́ë", "mujɛ́ɛ"],  // The same word means woman.
    crs: ["madanm", "madãm"],
    fit: ["vaimo", "ˈʋɑimo"],
    ie: ["marita", "maˈrita"],
    li: ["Vro", "vrɔː"],
    rmf: ["džuuli", "ˈdʒuːli"],
    agu: ["xqelaj", "ʂqelah"],
    bzj: ["waif", "waif"],
    cab: ["mari", "ˈmaɾi"],
    chf: ["itʼok", "itʼok"],
    ctu: ["ijnam", "ihnam"],
    hch: ["ʼɨya", "ʔɨja"],
    huv: ["mintajaran", "mintaharan"],
    itz: ["ätan", "ɨtan"],
    kek: ["ixaqil", "iʃaqil"],  // Built on ixq 'woman'.
    kjb: ["istil", "istil"],
    mam: ["xuʼjilbʼaj", "ʂuʔχilɓaχ"],  // Built on xuʼj ‘woman’.
    maz: ["suʼu", "suʔu"],
    mix: ["ñaʼa", "ɲàʔá"],  // Differs from ñaʼá 'woman' only in tone.
    nch: ["siuatl", "ˈsiwatɬ"],
    nhe: ["sihuatl", "ˈsiwatɬ"],  // Also 'woman'; 'his wife' is isihua.
    nhw: ["sihuatl", "ˈsiwatɬ"],  // Also 'woman'; 'his wife' is isihua.
    ote: ["ʼbɛhñä", "ʔbɛhɲã"],
    poh: ["ehkʼeenbʼees", "ehkʼeːnɓeːs"],
    toc: ["puskat", "puskat"],
    tsz: ["temba", "temba"],  // The husband is uamba.
    tzh: ["ijnamil", "ihnamil"],
    tzo: ["ajnilal", "ʔahnilal"],
    zap: ["xheelaʼ", "ʃeːlaʔ"],  // The same word means husband.
    abe: ["niswiak", "niswiak"],
    arp: ["nétesíhʼeh", "nétesíhʔeh"],
    com: ["kwʉhʉʼ", "kʷɨhɨʔ"],
    cr: ["ᓃᐘ", "niːwa"],
    ess: ["нулиӄ", "nuliq"],
    esu: ["nuliaq", "nuliaq"],
    jbo: ["fetspe", "ˈfetspe"],
    lkt: ["tȟawíču", "tˣawítʃu"],
    mic: ["nteʼpitem", "ndeːbidem"],
    mus: ["ehiwv", "ihíwə"],
    oj: ["niwiiw", "niwiːw"],
    osa: ["wakʼó", "wakʔó"],
    tlh: ["be'nal", "bɛʔnɑl"],
    tok: ["meli", "ˈmeli"],
    tsi: ["naks", "naks"],
    yur: ["ʼn-ahpew", "ʔnahpew"],
    acu: ["nuwa", "nuwa"],
    cag: ["tʃʼakfa", "tʃʼakfa"],
    cak: ["ixjayilom", "iʃxajilom"],
    cni: ["nojina", "nohina"],  // Not the word for woman (tsinane).
    crt: ["-kilfʷaʔ ~ -c̷ilfʷaʔ ~ -ilfʷaʔ", "kilfʷaʔ"],
    cuk: ["ome", "ome"],
    emp: ["kima", "kiˈma"],
    gn: ["tembireko", "tembiɾeˈko"],
    guc: ["aʼwayuuse", "aʔwajuːse"],  // The same word as husband.
    gum: ["srai", "ʂai"],
    gun: ["embireko", "ẽmiɾeˈko"],
    guu: ["suwəpɨjə", "suwəpɨjə"],
    jiv: ["nuwa", "nuwa"],  // The same word as woman.
    jup: ["tæ̃hʔín", "tæ̃hʔín"],  // Literally 'child's mother'.
    kpj: ["hãwɨɨ", "hãwɨɨ"],  // The same word as woman.
    moc: ["l-owa", "lowa"],
    mrq: ["vehine", "vehine"],
    niu: ["hoana", "hoana"],
    pbb: ["nmiʼ", "nmiʔ"],  // Not the word for woman.
    pkp: ["wawine", "wawine"],  // The same word as woman.
    plg: ["l-owa", "lowa"],
    pmt: ["mōrire", "moːrire"],
    quc: ["ixoqil", "iʃoqil"],
    quz: ["warmi", "ˈwaɾmi"],
    rar: ["vaʻine", "vaʔine"],
    shp: ["awin", "awĩ"],
    tca: ["namèx", "nameʔ"],  // Not the word for woman (nge).
    tob: ["lwa", "lwa"],  // The same word as for husband.
    tpy: ["deʔtsi", "deʔtsi"],
    trn: ["-yeno", "jeno"],
    tue: ["dʉ̃bõ", "dɨ̃ˈbõ"],  // Not the word for woman.
    xav: ["damro", "damˈɾɔ"],
    aau: ["sa", "sa"],  // The same word as woman.
    aer: ["anewe", "anəwə"],  // The same word means husband.
    agr: ["nuwa", "nuwa"],
    bi: ["waef", "waef"],  // From English wife.
    bzh: ["venë", "βəne"],
    ch: ["asagua", "aˈsaɡwa"],
    dbl: ["bulgu", "ˈbulɡu"],
    djr: ["galay", "ɡalaj"],  // Not the word for woman (miyalk).
    emi: ["vause", "vause"],
    enq: ["enda", "enda"],
    fai: ["kadel", "kadel"],  // Also means female; not the word for woman (wanang).
    ho: ["adavana", "adavana"],  // The same word means husband.
    hot: ["yanavi", "janavi"],  // Not the plain word for woman (avi).
    hui: ["one", "one"],  // Not the word for woman (wali).
    hwc: ["wife", "waɪf"],
    ktz: ["dshàú", "dtsʰàú"],
    max: ["bini", "bini"],  // Not the word for woman (nona).
    meu: ["adavana", "adavana"],
    mi: ["wahine", "wahine"],  // The same word as woman.
    na: ["agen", "aŋen"],  // Not the word for woman (ån).
    nha: ["artu", "aʈu"],  // Not the word for woman (nyarlu).
    nys: ["koort-maat", "koːʈmaːt"],  // The same word means husband.
    pcm: ["wife", "waɪf"],
    pis: ["waef", "waef"],  // From English wife; mere, also 'woman', is used too.
    pjt: ["kuri", "ˈkuri"],  // The same word means husband.
    pmy: ["istri", "ˈistri"],
    pon: ["werek", "wɛrɛk"],
    roo: ["vatuava", "βatuaβa"],
    rtm: ["hạina", "hɔina"],
    syl: ["বউ", "bɔu"],
    tiw: ["purnayinga", "puɾnajiŋa"],
    wbl: ["кәнд", "kənd"],
    wbp: ["kali", "kali"],
    woe: ["fitiya", "fitija"],  // The same word means husband.
    yap: ["leʼngiin", "leʔŋiːn"],
    yle: ["kpâm", "k͡pɑm"],
    ngu: ["sihuatl", "ˈsiwatɬ"],
    mcf: ["chido", "tʃido"],
    nrf: ["femme", "fam"],  // The same word means woman.
    ar_eg: ["مراة", "meˈɾaːt"],
    ar_lb: ["زوجة", "ˈzawʒe"],
    ar_lev: ["زوجة", "ˈzoːʒe"],
    ar_ma: ["مراة", "mraː"],
    ar_sy: ["زوجة", "ˈzawʒe"],
    ar_tn: ["مرا", "mɾa"],
    arq: ["مرا", "mra"],
    gsw: ["Frau", "fraʊ̯"],
    mbc: ["noʔpɨ", "noʔpɨ"],
    mxv: ["yasiʼi", "jasiʔi"],
    rki: ["မယား", "məjá"],
    ruq: ["niveastă", "niˈve̯astə"],
    yao: ["msonogo", "msonoɡo"],  // The same word means husband.
    kpf: ["ambân", "ambɐn"],
    sce: ["bierei", "pjəˈrəj"],
    th_n: ["เมีย", "mia˧"],
    ttj: ["omukyara", "omukjara"],
    bci: ["yi", "ji"],
    chy: ["tsévéstoemo", "tsévéstoemo"],  // 'The one I sit with'; used for husband too.
    co: ["moglia", "ˈmɔʎʎa"],
    mer: ["mwekũrũ", "mwekoɾo"],
    nzi: ["yelɛ", "jelɛ"],
    tvl: ["avaga", "avaŋa"],  // The same word as husband.
    bin: ["amwẹ", "aʋ̃ɛ̃"],
    crx: ["ooʼat", "oːʔat"],
    gcf: ["madanm", "madãm"],  // The same word as woman.
    gym: ["muko", "muko"],  // The same word as husband.
    lun: ["ŋodi", "ŋodi"],
    wls: ["ʻohoana", "ʔohoana"],  // The same word as husband.
    ada: ["yo", "jo"],
    aja: ["ashi", "aʃi"],
    gaa: ["ŋa", "ŋa"],
    kxc: ["ahta", "ahta"],
    mos: ["paga", "paɡa"],
    bla: ["otohkíímaani", "otoxkíːmaːni"],
    pot: ["ndekweyom", "ndəkwəjom"],
    cro: ["uá", "uá"],
    nez: ["ʼiwéepne", "ʔiwéːpne"],
    nrf_gg: ["faume", "fɔm"],
    pt_gw: ["mindjer", "minˈdʒɛr"],
    omc: ["ssonæng", "sonæŋ"],
    sid: ["minaama", "minaːma"],  // mine 'house' + ama 'mother'
    akb: ["dadaboru", "dadaboru"],
    gil: ["buu", "buː"],
    mkz: ["tupurae", "tupurae"],
    pau: ["buch", "buʔ"],
    bho: ["मेहरारू", "meɦraːruː"],
    doi: ["घरैआली", "ɡʱərɛːaːliː"],
    qu: ["warmi", "ˈwaɾmi"],
    quy: ["warmi", "warmi"],
    toj: ["cheʼumal", "tʃeʔumal"],
    bxd: ["jõ31 mi31", "jõ˧˩ mi˧˩"],  // jɔ̃³¹ is the kinship prefix, and mi³¹ alone means wife, female or woman (Wiktionary).
    aoc: ["nopü", "nopɨ"],
    so: ["afo", "afo"],
    cnp: ["老婆", "lau˨˦ pu˨˩"],
    cpx: ["老妈", "lau˩˩ ma˦˥˧"],  // Written 老 'old' + 媽 'mother', as in Fuzhou 老媽. Word from Wiktionary's dialect table for Putian; reading from Wiktionary (Putian).
    czh: ["老婆", "lə˨˦ pʰo˦˦"],  // Written 老 'old' plus 婆 'old woman'; the row's husband is 老公. Word from Wiktionary's dialect table for Tunxi; reading from MCPDict 屯溪.
    czh_wy: ["老婆", "lɔ˧˩ pʰo˩˩"],  // Written 老 'old' plus 婆 'old woman', as in Shanghainese and Cantonese. Word from Wiktionary's dialect table for Wuyuan; reading from MCPDict 婺源.
    hak_cn: ["老婆", "lau˧˩ pʰo˩˩"],
    nan: ["某", "bɔ˥˧"],  // Short 某 bó͘ is the everyday word; a woman is 查某 cha-bó͘, a different word.
    ja_kg: ["うっかた", "ɯkːata"],
    ja_rys: ["妻", "tudzɨ"],
    ja_sd: ["がが", "ɡaɡa"],
    ar_sd: ["مرة", "ˈmara"],
    nan_ph: ["某", "bɔ˥˥˦"],
    koy: ["-ʼot", "ʔot"],  // A possessed noun: baʼot "his wife".
    bzd: ["alaköl", "alakʊl"],
    fud: ["āvaga", "aːvaŋa"],
    hns: ["patni", "pətniː"],
    hop: ["nööma", "nøːma"],
    kln: ["osotiot", "osotiot"],
    nus: ["ciek", "ciek"],
    sdo: ["asau", "asau"],
    teo: ["aberu", "aberu"],
    gbm: ["घरवली", "ɡʱərʋəliː"],
    rcf: ["madam", "madam"],
    ter: ["yêno", "ˈjeːno"],
    xnr: ["पत्नी", "pətniː"],
    krc: ["къатын", "qaˈtɯn"],
    mzh: ["tochʼefwa atsinha", "totʃʼefʷa atsin̥a"],
    kaa: ["hayal", "haˈjal"],  // The same word means woman.
    kqn: ["mukazhi", "mukaʒi"],
    luo: ["chiega", "tʃiɛɡa"],  // 'my wife'; the stem chi- is always possessed, as with chuora 'my husband'
    bnn: ["pingaz", "piŋað"],
    unr: ["kuri", "kuɽi"],  // The same word as 'a female'.
    apw: ["biʼaa", "biʔaː"],
    piu: ["miiṯa", "miːʈa"],  // The same word means husband: the Luritja Bible uses miiṯa for either spouse.
    win: ["hicawį", "hitʃawĩ"],  // The word for a woman is hinų́k.
  },
};
