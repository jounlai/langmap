/**
 * Hundred is the word that named the biggest sound-law split in Indo-European. Proto-Indo-European
 * *ḱm̥tóm begins with a palatal *ḱ, and every branch had to do something with it. Latin left it a
 * plain velar — centum, /k/ — while Avestan assibilated it — satəm, /s/. Nineteenth-century
 * philologists took those two words as the labels for the two halves of the family, and both of the
 * naming languages are on this map: la and ave, one cell apart in sound and half a continent apart
 * in space. Follow the /s/ side and you get Sanskrit śatám, Old Church Slavonic съто, Lithuanian
 * šimtas; follow the /k/ side and you get Greek ἑκατόν, Old Irish cét, Gothic 𐌷𐌿𐌽𐌳, Old English hund.
 *
 * The tidy west-versus-east geography that the labels imply was demolished by Tocharian. Both
 * Tocharian rows here — txb kante and xto känt — are centum, with a hard /k/, spoken in the Tarim
 * Basin at the far eastern edge of the whole family, further east than any satem language. The
 * isogloss is real; the map of it is not a line.
 *
 * Two other things the row shows. Old English hund and Old High German hunt are the same shapes as
 * those languages' words for 'dog' — a genuine homograph, not a data error, since Germanic *hundą
 * 'hundred' and *hundaz 'dog' fell together. And Uralic borrowed: Proto-Uralic *śata, Finnish sata,
 * Hungarian száz are loans from Indo-Iranian, taken in on the satem side of the line.
 *
 * East Asia runs an unrelated layer, 百, inherited into every Sinoxenic reading; Middle Korean had
 * its own native 온 for 100 before 백 replaced it, and Old Japanese momo survives only in compounds.
 *
 * The vi_nom cell was blank at first because 𤾓 (U+24F93) is outside the self-hosted NomNaTong
 * subset and would have been tofu on iPhone. That was fixed on 2026-08-29 by rebuilding the subset
 * from Hanazono Mincho B rather than by leaving the data short, so the cell is there now.
 */
WORDS.hundred = {
  emoji: "💯",
  label: {
    en: "Hundred", ja: "百", ko: "백", zh: "百", yue: "百", vi: "Trăm", th: "ร้อย", id: "Seratus",
    hi: "सौ", de: "Hundert", fr: "Cent", it: "Cento", es: "Cien", es_eu: "Cien",
    es_mx: "Cien", pt: "Cem", pt_eu: "Cem", pt_br: "Cem", ru: "Сто",
    uk: "Сто", ar: "مئة", he: "מאה", sw: "Mia",
  },
  definition: {
    en: "Hundred — the number 100. Its first sound cuts Indo-European in two: Latin centum kept the k, Avestan satəm turned it into s.",
    ja: "百 — 数の100。語頭の音が印欧語族を二分する。ラテン語 centum は k を保ち、アヴェスター語 satəm は s に変えた。",
    ko: "백 — 숫자 100. 이 낱말의 첫소리가 인도유럽어족을 둘로 가른다. 라틴어 centum은 k를 지켰고 아베스타어 satəm은 s로 바꿨다.",
    zh: "百 — 数字100。它的首音把印欧语系一分为二：拉丁语 centum 保住了 k，阿维斯陀语 satəm 却变成了 s。",
    yue: "百 — 數字100。佢個聲母將印歐語系一分為二：拉丁文 centum 保住咗 k，阿維斯陀文 satəm 就變咗 s。",
    vi: "Trăm — số 100. Âm đầu của nó chia ngữ hệ Ấn-Âu làm đôi: tiếng Latinh centum giữ k, tiếng Avesta satəm đổi thành s.",
    th: "ร้อย — จำนวน 100 เสียงแรกของคำนี้แบ่งตระกูลภาษาอินโด-ยูโรเปียนออกเป็นสองฝ่าย ละติน centum คง k ไว้ ส่วนอเวสตะ satəm เปลี่ยนเป็น s",
    id: "Seratus — bilangan 100. Bunyi awalnya membelah rumpun Indo-Eropa menjadi dua: Latin centum mempertahankan k, Avesta satəm mengubahnya menjadi s.",
    hi: "सौ — संख्या 100। इसकी पहली ध्वनि भारोपीय परिवार को दो हिस्सों में बाँट देती है: लातीनी centum में k बचा रहा, अवेस्ता satəm में वह s बन गया।",
    de: "Hundert — die Zahl 100. Ihr Anlaut teilt das Indogermanische in zwei Hälften: Lateinisch centum bewahrte das k, awestisch satəm machte ein s daraus.",
    fr: "Cent — le nombre 100. Son attaque coupe l'indo-européen en deux : le latin centum garde le k, l'avestique satəm en fait un s.",
    it: "Cento — il numero 100. Il suo suono iniziale divide l'indoeuropeo in due: il latino centum conserva la k, l'avestico satəm la trasforma in s.",
    es: "Cien — el número 100. Su sonido inicial parte el indoeuropeo en dos: el latín centum conservó la k y el avéstico satəm la convirtió en s.",
    es_eu: "Cien — el número 100. Su sonido inicial parte el indoeuropeo en dos: el latín centum conservó la k y el avéstico satəm la convirtió en s.",
    es_mx: "Cien — el número 100. Su sonido inicial parte el indoeuropeo en dos: el latín centum conservó la k y el avéstico satəm la convirtió en s.",
    pt: "Cem — o número 100. O seu som inicial divide o indo-europeu em dois: o latim centum manteve o k e o avéstico satəm transformou-o num s.",
    pt_eu: "Cem — o número 100. O seu som inicial divide o indo-europeu em dois: o latim centum manteve o k e o avéstico satəm transformou-o num s.",
    pt_br: "Cem — o número 100. Seu som inicial divide o indo-europeu em dois: o latim centum manteve o k e o avéstico satəm o transformou em s.",
    ru: "Сто — число 100. Его начальный звук делит индоевропейские языки надвое: латинское centum сохранило k, а авестийское satəm превратило его в s.",
    uk: "Сто — число 100. Його початковий звук ділить індоєвропейські мови навпіл: латинське centum зберегло k, а авестійське satəm перетворило його на s.",
    ar: "مئة — العدد 100. صوتها الأول يشطر اللغات الهندية الأوروبية شطرين: اللاتينية centum حافظت على الكاف، والأفستية satəm حوّلتها إلى سين.",
    he: "מאה — המספר 100. העיצור הפותח שלה מחלק את המשפחה ההודו-אירופית לשניים: הלטינית centum שמרה על ה-k, והאווסטית satəm הפכה אותו ל-s.",
    sw: "Mia — namba 100. Sauti yake ya kwanza inagawa familia ya lugha za Kihindi-Kiulaya mara mbili: Kilatini centum kilihifadhi k, na Kiavesta satəm kikaigeuza kuwa s.",
  },
  data: {
    // --- UI languages -------------------------------------------------
    en: ["hundred", "ˈhʌndɹəd"],
    ja: ["百", "hʲaku"],
    ko: ["백", "pɛk̚"],
    zh: ["百", "pai˨˩˦"],
    yue: ["百", "paːk˧"],
    vi: ["trăm", "tɕam˧"],
    th: ["ร้อย", "rɔːj˦˥"],
    id: ["seratus", "səratus"],
    hi: ["सौ", "sɔː"],
    de: ["hundert", "ˈhʊndɐt"],
    fr: ["cent", "sɑ̃"],
    it: ["cento", "ˈtʃɛnto"],
    es: ["cien", "θjen"],
    pt: ["cem", "sẽj̃"],
    ru: ["сто", "sto"],
    uk: ["сто", "sto"],
    ar: ["مئة", "miʔa"],
    he: ["מאה", "ˈmea"],
    sw: ["mia", "ˈmia"],

    // --- The isogloss itself ------------------------------------------
    // p_ine *ḱ: centum branches keep a velar, satem branches assibilate.
    p_ine: ["*ḱm̥tóm", "ḱm̩tóm"],
    p_toc: ["*känte", "kənte"],   // Wiktionary PT (Adams 2013); A känt, B kante
    la: ["centum", "ˈkentum"],          // centum, the label for the /k/ side
    ave: ["𐬯𐬀𐬙𐬆𐬨", "satəm"],            // satəm, the label for the /s/ side
    txb: ["𑀓𑀦𑁆𑀢𑁂", "kante"],            // centum at the far east — the counterexample
    xto: ["𑀓𑀦𑁆𑀢𑁆", "kænt"],
    el_grc: ["ἑκατόν", "he.ka.tón"],
    el_kath: ["ἑκατόν", "ekaˈton"],
    el: ["εκατό", "ekaˈto"],
    sga: ["cét", "kʲeːd"],
    mga: ["cét", "kʲeːd"],
    got: ["𐌷𐌿𐌽𐌳", "hund"],
    ang: ["hund", "hund"],
    osx: ["hund", "hund"],
    goh: ["hunt", "hunt"],
    sa: ["शतम्", "ɕɐtɐm"],
    sa_edu: ["शतम्", "ʃətəm"],
    h_vedic: ["शतम्", "ɕɐtɐ́m"],
    pi: ["सतं", "sɐtɐ̃"],
    pmh: ["साअ", "saa"],
    pi_edu: ["sataṃ", "sətəŋ"],
    cu: ["съто", "sŭto"],
    orv: ["съто", "sŭto"],
    lt: ["šimtas", "ˈʃʲɪmtɐs"],
    lv: ["simts", "simts"],

    // --- Rest of Indo-European ------------------------------------------
    enm: ["hundred", "ˈhundrəd"],
    en_em: ["hundred", "ˈhʊndrəd"],
    non: ["hundrað", "hundrɑð"],
    gmh: ["hundert", "ˈhundərt"],
    de_lut: ["hundert", "ˈhʊndərt"],
    fro: ["cent", "tsent"],
    fr_class: ["cent", "sɑ̃"],
    it_dan: ["cento", "ˈtʃɛnto"],
    osp: ["ciento", "ˈtsjento"],
    es_sgl: ["ciento", "ˈtsjento"],
    hy_grab: ["հարիւր", "hariwr"],
    hy: ["հարյուր", "haɾˈjuɾ"],
    pal: ["𐭮𐭣", "sad"],
    fa_clas: ["صد", "sad"],
    fa: ["صد", "sæd"],
    prs: ["صد", "sad"],
    tg: ["сад", "sad"],
    ku: ["sed", "sɛd"],
    ckb: ["سەد", "sæd"],
    ps: ["سل", "səl"],
    os: ["сӕдӕ", "sædæ"],
    rom: ["šel", "ʃɛl"],

    // --- Modern Germanic --------------------------------------------------
    nl: ["honderd", "ˈɦɔndərt"],
    af: ["honderd", "ˈɦɔndərt"],
    fy: ["hûndert", "ˈhuːndərt"],
    is: ["hundrað", "ˈhʏntrað"],
    da: ["hundrede", "ˈhunʁəðə"],
    no: ["hundre", "ˈhʉndrə"],
    sv: ["hundra", "ˈhɵndra"],
    yi: ["הונדערט", "ˈhundɛrt"],

    // --- Modern Romance ---------------------------------------------------
    ca: ["cent", "sen"],
    gl: ["cen", "θeŋ"],
    oc: ["cent", "sen"],
    ro: ["sută", "ˈsutə"],              // Slavic loan, alone among its numerals
    rm: ["tschient", "tʃient"],
    sc: ["chentu", "ˈkentu"],
    lad: ["sien", "sjen"],

    // --- Modern Slavic ----------------------------------------------------
    pl: ["sto", "stɔ"],
    cs: ["sto", "sto"],
    sk: ["sto", "sto"],
    sl: ["sto", "stoː"],
    hr: ["sto", "stoː"],
    sr: ["сто", "stoː"],
    bs: ["sto", "stoː"],
    bg: ["сто", "sto"],
    mk: ["сто", "sto"],
    be: ["сто", "sto"],

    // --- Celtic ------------------------------------------------------------
    ga: ["céad", "ceːd̪ˠ"],
    cy: ["cant", "kant"],
    br: ["kant", "kãnt"],

    // --- Other Europe ------------------------------------------------------
    sq: ["qind", "cind"],
    eu: ["ehun", "eun"],
    ka: ["ასი", "asi"],
    pkar: ["*as-", "as"],
    pura: ["*śata", "ɕata"],            // borrowed from Indo-Iranian, satem side
    fi: ["sata", "ˈsata"],
    et: ["sada", "ˈsɑdɑ"],
    hu: ["száz", "saːz"],
    ohu: ["száz", "saːz"],
    eo: ["cent", "tsent"],
    vo: ["tum", "tum"],

    // --- Semitic and the Near East ----------------------------------------
    psem: ["*miʾat-", "miʔat"],
    ar_qur: ["مائة", "miʔa"],
    hbo: ["מאה", "meːˈʔaː"],
    he_mis: ["מאה", "meˈʔa"],
    arc: ["ܡܐܐ", "maː"],
    syc: ["ܡܐܐ", "maː"],
    oar: ["מאה", "maː"],
    phn: ["𐤌𐤀𐤕", "miʔat"],
    uga: ["𐎎𐎛𐎚", "miʔatu"],
    xpu: ["𐤌𐤀𐤕", "miʔat"],
    gez: ["ምእት", "məʔət"],
    ti: ["ሚእቲ", "miʔti"],
    am: ["መቶ", "məto"],
    mt: ["mija", "ˈmɪja"],
    ar_eg: ["مية", "mejja"],
    ar_lev: ["مية", "mijje"],
    ar_ma: ["مية", "mja"],
    cop: ["ϣⲉ", "ʃe"],

    // --- Turkic ------------------------------------------------------------
    ptrk: ["*jǖz", "jyːz"],
    xqa: ["yüz", "jyz"],
    otk: ["𐰘𐰇𐰕", "jyz"],
    ota: ["يوز", "jyz"],
    tr: ["yüz", "jyz"],
    az: ["yüz", "jyz"],
    azb: ["یوز", "jyz"],
    tk: ["ýüz", "jyz"],
    crh: ["yüz", "jyz"],
    kk: ["жүз", "ʒyz"],
    ky: ["жүз", "dʒyz"],
    uz: ["yuz", "juz"],
    kaa: ["júz", "ʒyz"],
    tt: ["йөз", "jøz"],
    ba: ["йөҙ", "jøð"],
    ug: ["يۈز", "jyz"],
    sah: ["сүүс", "syːs"],
    cv: ["ҫӗр", "ɕɘr"],

    // --- Mongolic and Tungusic ---------------------------------------------
    pmng: ["*ǰagun", "dʒaɡun"],
    xng: ["ᠵᠠᠭᠤᠨ", "dʒaɡun"],
    cmg: ["ᠵᠠᠭᠤᠨ", "dʒaɡun"],
    mn: ["зуу", "tsuː"],
    p_tun: ["*taŋgū", "taŋɡuː"],
    mnc: ["ᡨᠠᠩᡤᡡ", "taŋɡuː"],

    // --- Sinitic and Sinoxenic ---------------------------------------------
    och: ["百", "*pˤrak"],
    zh_tang: ["百", "pˠæk"],

    // --- Sinitic — 百 is 陰入, and 白 is its 陽入 minimal pair -----------
    // Every tone below is that row's own value for 陰入, read off its 骨
    // (an unambiguous 陰入 syllable; 一 is not usable here because Min
    // reads it both 陰入 it and 陽入 chi̍t). Nothing carried across rows.
    // Rows whose 骨 and 白 carry the SAME value do not distinguish 陰入
    // from 陽入 at all, so their 百 is only as good as that — flagged in
    // the handoff rather than silently trusted.
    zh_han: ["百", "pɐk"],
    zh_song: ["百", "pæk"],
    yue_gz: ["百", "paːk̚˧"],
    hak_cn: ["百", "pak̚˧"],
    hak_tw: ["百", "pak̚˨"],
    wuu: ["百", "paʔ˥"],
    nan: ["百", "paʔ˦"],
    nan_xm: ["百", "paʔ˦"],
    nan_zz: ["百", "paʔ˦"],
    nan_qz: ["百", "paʔ˥"],
    nan_te: ["百", "peʔ˨˨"],
    cdo: ["百", "paʔ˨˦"],
    gan: ["百", "pak̚˥"],
    zh_nj: ["百", "pəʔ˥"],
    zh_hf: ["百", "pəʔ˦"],
    zh_db: ["百", "pai˨˩˦"],
    vi_han: ["百", "ɓak̚˧˥"],
    ja_kanbun: ["百", "momo"],
    ja_chu: ["百", "momo"],

    // --- Uralic — every one of these is the Indo-Iranian loan Finnish shows
    se: ["čuođi", "ˈtʃuoði"],
    vro: ["sada", "ˈsada"],
    krl: ["sada", "ˈsada"],
    olo: ["sada", "ˈsada"],
    vep: ["sada", "ˈsada"],
    vot: ["sata", "ˈsata"],
    fkv: ["sata", "ˈsata"],
    fit: ["sata", "ˈsata"],
    myv: ["сядо", "ˈsʲado"],
    mdf: ["сяда", "ˈsʲada"],
    udm: ["сю", "su"],
    kpv: ["сё", "sʲo"],
    koi: ["сё", "sʲo"],
    mhr: ["шӱдӧ", "ʃydø"],

    // --- Austronesian ----------------------------------------------------
    jvn: ["satus", "satus"],
    hil: ["gatos", "ɡaˈtos"],
    war: ["gatos", "ɡaˈtos"],
    bik: ["gatos", "ɡaˈtos"],
    fj: ["drau", "ndrau"],
    tet: ["atus", "atus"],

    // --- Bantu -----------------------------------------------------------
    nbl: ["ikhulu", "iˈkʰulu"],
    nd: ["ikhulu", "iˈkʰulu"],
    ssw: ["likhulu", "liˈkʰulu"],
    rn: ["ijana", "idʒana"],
    st: ["lekgolo", "leχolo"],
    nso: ["lekgolo", "leχolo"],
    tn: ["lekgolo", "leχolo"],

    // --- Romance — the Spanish rows are all seseo, so cien is /sjen/ ------
    es_mx: ["cien", "sjen"],
    es_ar: ["cien", "sjen"],
    es_co: ["cien", "sjen"],
    es_cl: ["cien", "sjen"],
    es_cu: ["cien", "sjen"],
    es_pe: ["cien", "sjen"],
    es_an: ["cien", "sjen"],
    es_ve: ["cien", "sjen"],
    es_bo: ["cien", "sjen"],
    es_uy: ["cien", "sjen"],
    es_pr: ["cien", "sjen"],
    es_do: ["cien", "sjen"],
    es_gt: ["cien", "sjen"],
    es_ec: ["cien", "sjen"],
    es_cr: ["cien", "sjen"],
    es_hn: ["cien", "sjen"],
    es_ni: ["cien", "sjen"],
    es_sv: ["cien", "sjen"],
    es_py: ["cien", "sjen"],
    es_pa: ["cien", "sjen"],

    fr_qc: ["cent", "sɑ̃"],
    fr_be: ["cent", "sɑ̃"],
    fr_ch: ["cent", "sɑ̃"],
    fr_lu: ["cent", "sɑ̃"],
    fr_af: ["cent", "sɑ̃"],
    fr_sn: ["cent", "sɑ̃"],
    fr_ci: ["cent", "sɑ̃"],
    fr_ht: ["cent", "sɑ̃"],
    fr_cm: ["cent", "sɑ̃"],

    pt_br: ["cem", "sẽj̃"],
    pt_ao: ["cem", "sẽj̃"],
    pt_mz: ["cem", "sẽj̃"],
    pt_mo: ["cem", "sẽj̃"],
    pt_cv: ["cem", "sẽj̃"],

    ca_va: ["cent", "sent"],
    ast: ["cien", "θjen"],
    ext: ["cien", "θjen"],
    an: ["cien", "θjen"],
    mwl: ["cien", "sjen"],
    scn: ["centu", "ˈtʃɛntu"],
    nap: ["ciento", "ˈtʃjentə"],
    co: ["centu", "ˈtʃɛntu"],
    lij: ["çento", "ˈseŋtu"],
    vec: ["sento", "ˈsento"],
    fur: ["cent", "tʃent"],
    lmo: ["cent", "tʃent"],
    pms: ["sent", "seŋt"],
    rup: ["sutã", "ˈsutə"],
    wa: ["cint", "sɛ̃"],

    // --- English — the vowel is each row's own STRUT, read off its blood --
    en_us: ["hundred", "ˈhʌndɹəd"],
    en_ca: ["hundred", "ˈhʌndɹəd"],
    en_za: ["hundred", "ˈhʌndɹəd"],
    en_in: ["hundred", "ˈhʌndɹəd"],
    en_ie: ["hundred", "ˈhʌndɹəd"],
    en_sco: ["hundred", "ˈhʌndɹəd"],
    en_wc: ["hundred", "ˈhʌndɹəd"],
    en_est: ["hundred", "ˈhʌndɹəd"],
    en_app: ["hundred", "ˈhʌndɹəd"],
    en_south: ["hundred", "ˈhʌndɹəd"],
    en_aave: ["hundred", "ˈhʌndɹəd"],
    en_ng: ["hundred", "ˈhʌndɹəd"],
    en_ng2: ["hundred", "ˈhʌndɹəd"],
    en_ke: ["hundred", "ˈhʌndɹəd"],
    en_ph: ["hundred", "ˈhʌndɹəd"],
    en_sg: ["hundred", "ˈhʌndɹəd"],
    en_my: ["hundred", "ˈhʌndɹəd"],
    en_wls: ["hundred", "ˈhʌndɹəd"],
    en_ck: ["hundred", "ˈhʌndɹəd"],
    en_au: ["hundred", "ˈhandɹəd"],
    en_nz: ["hundred", "ˈhandɹəd"],
    en_scouse: ["hundred", "ˈhʊndɹəd"],
    en_geordie: ["hundred", "ˈhʊndɹəd"],
    en_brum: ["hundred", "ˈhʊndɹəd"],
    en_manc: ["hundred", "ˈhʊndɹəd"],
    en_yk: ["hundred", "ˈhʊndɹəd"],

    // --- Continental West Germanic ---------------------------------------
    de_at: ["hundert", "ˈhʊndɐt"],
    de_ch: ["hundert", "ˈhʊndɐt"],
    de_lu: ["hundert", "ˈhʊndɐt"],
    nl_be: ["honderd", "ˈɦɔndərt"],
    lb: ["honnert", "ˈhonɐt"],
    nds: ["hunnert", "ˈhʊnɐt"],
    ksh: ["hundert", "ˈhʊndɐt"],
    pdc: ["hunnert", "ˈhʊnɐt"],
    li: ["hóndert", "ˈhɔndərt"],
    sco: ["hunner", "ˈhʌnər"],
    en_jam: ["hundred", "ˈhʌndɹɛd"],

    // --- Slavic — sto everywhere ------------------------------------------
    szl: ["sto", "stɔ"],
    hsb: ["sto", "stɔ"],
    csb: ["sto", "stɔ"],
    dsb: ["sto", "stɔ"],
    rue: ["сто", "sto"],
    ltg: ["symts", "simts"],

    // --- Turkic — *jǖz, and Siberian Turkic's ǰ- ------------------------
    slr: ["yüz", "jyz"],
    ybe: ["yüz", "jyz"],
    qxq: ["yüz", "jyz"],
    gag: ["üz", "yz"],
    kum: ["юз", "juz"],
    nog: ["юз", "juz"],
    krc: ["жюз", "ʒyz"],
    dlg: ["сүүс", "syːs"],
    tyv: ["чүс", "tʃys"],
    kjh: ["чӱс", "tʃys"],
    cjs: ["чӱс", "tʃys"],
    alt: ["јӱс", "dʒys"],

    // --- More Uralic -------------------------------------------------------
    smj: ["tjuohte", "ˈtʃuohte"],
    smn: ["čuođi", "ˈtʃuoði"],
    mrj: ["шӱдӹ", "ʃydə"],
    liv: ["sadā", "ˈsadaː"],
    mns: ["сот", "sot"],
    kca: ["сот", "sot"],

    // Romani šel is Sanskrit शतम् — the satem form, carried out of India.
    dty: ["सय", "səj"],
    bho: ["सौ", "sɔː"],
    sd: ["سؤ", "soː"],
    as: ["এশ", "eʃ"],
    or: ["ଶହେ", "ʃɔɦe"],
    rmy: ["šel", "ʃel"],
    rmf: ["šel", "ʃel"],

    // --- Arabic dialects — Levantine mīyye, Gulf mīyya, Maghrebi mya ------
    ar_sy: ["مية", "ˈmijje"],
    ar_lb: ["مية", "ˈmijje"],
    ar_jo: ["مية", "ˈmijje"],
    ar_ps: ["مية", "ˈmijje"],
    ar_ye: ["مية", "ˈmijja"],
    ar_sa: ["مية", "ˈmijja"],
    ar_gulf: ["مية", "ˈmijja"],
    abv: ["مية", "ˈmijja"],
    afb: ["مية", "ˈmijja"],
    acw: ["مية", "ˈmijja"],
    ar_iq: ["مية", "ˈmijja"],
    arq: ["مية", "mja"],
    ar_tn: ["مية", "mja"],
    ayl: ["مية", "ˈmija"],
    ar_sd: ["مية", "ˈmija"],
    mey: ["مية", "ˈmijja"],
    aii: ["ܡܐܐ", "maː"],

    // --- Creoles and mainland Southeast Asia --------------------------------
    gcr: ["san", "sɑ̃"],
    acf: ["san", "sɑ̃"],
    gcf: ["san", "sɑ̃"],
    mfe: ["san", "sɑ̃"],
    rcf: ["san", "sɑ̃"],
    crs: ["san", "sɑ̃"],
    bah: ["hundred", "ˈhʌndɹəd"],
    hwc: ["hundred", "ˈhʌndɹəd"],
    srn: ["hondro", "hondro"],
    kea: ["sen", "sen"],
    cbk: ["cien", "sjen"],
    uln: ["hundert", "ˈhʊndɐt"],
    pmy: ["seratus", "səratus"],
    vi_c: ["trăm", "ʈam˧"],
    vi_s: ["trăm", "ʈam˧"],
    kxm: ["រយ", "rɔːj"],
    zh_wenyan_edu: ["百", "paːk˧"],
    zh_tw: ["百", "pai˨˩˦"],
    ja_edo: ["百", "hʲaku"],
    ja_heian: ["百", "momo"],
    ojp: ["百", "momo"],
    p_jpn: ["*momo", "momo"],
    p_kor: ["*on", "on"],
    ko_mid: ["온", "on"],               // the native Korean hundred, later ousted by 백

    // --- Tibeto-Burman -----------------------------------------------------
    p_sit: ["*r-gya", "rɡja"],
    xct: ["བརྒྱ", "brɡja"],
    xct_litpr: ["བརྒྱ", "brɡja"],
    obr: ["ရာ", "raː"],
    my: ["ရာ", "jà"],

    // --- Tai and Austroasiatic ---------------------------------------------
    ptai: ["*rɔːj", "rɔːj"],
    sukh: ["ร้อย", "rɔːj"],
    km: ["រយ", "rɔːj"],

    // --- Austronesian -------------------------------------------------------
    paus: ["*RaCus", "RaCus"],
    omy: ["ratus", "ratus"],
    ms: ["seratus", "səratus"],
    jv: ["satus", "satus"],
    kaw: ["ꦱꦠꦸꦱ꧀", "satus"],
    su: ["saratus", "saratus"],
    ban: ["satus", "satus"],
    tl: ["sandaan", "sanˈdaʔan"],
    ceb: ["gatos", "ɡaˈtos"],
    mg: ["zato", "ˈzatu"],
    mi: ["rau", "ɾau"],
    haw: ["haneli", "haˈneli"],
    sm: ["selau", "seˈlau"],
    to: ["teau", "teˈau"],

    // --- Dravidian and Indo-Aryan -------------------------------------------
    p_dra: ["*nūṟu", "nuːru"],
    ta: ["நூறு", "nuːru"],
    ml: ["നൂറ്", "nuːrɨ"],
    kn: ["ನೂರು", "nuːru"],
    te: ["వంద", "ʋanda"],
    ur: ["سو", "sɔː"],
    bn: ["একশো", "ɛkʃo"],
    mr: ["शंभर", "ʃəmbʱəɾ"],
    gu: ["સો", "soː"],
    pa: ["ਸੌ", "sɔː"],
    ne: ["सय", "sʌj"],
    si: ["සියය", "sijəjə"],

    // --- Africa --------------------------------------------------------------
    so: ["boqol", "boqol"],
    om: ["dhibba", "ɗibba"],
    ha: ["ɗari", "ɗari"],
    wo: ["téeméer", "teːmeːr"],
    bm: ["kɛmɛ", "kɛmɛ"],
    ig: ["narị", "naɾɪ"],
    yo: ["ọgọ́rùn-ún", "ɔɡɔ́ɾṹṹ"],
    zu: ["ikhulu", "iˈkʰulu"],
    xh: ["ikhulu", "iˈkʰulu"],
    sn: ["zana", "zana"],
    ny: ["zana", "zana"],
    rw: ["ijana", "iʒana"],
    lg: ["kikumi", "tʃikumi"],
    ln: ["nkama", "nkama"],

    // --- Americas and creoles -------------------------------------------------
    nci: ["mācuīlpōhualli", "maːkʷiːlpoːˈwalːi"],   // five twenties: vigesimal
    qwc: ["pachak", "patʃak"],
    qu: ["pachak", "ˈpatʃak"],
    ht: ["san", "sã"],
    pap: ["shen", "ʃen"],
    tpi: ["handet", "handet"],
    vi_nom: ["𤾓", "tɕam˧"],
    // --- Austronesian — Sumatra, Sulawesi, Borneo, the Philippines ---------
    bbc: ["saratus", "saratus"],
    bts: ["saratus", "saratus"],
    iba: ["seratus", "səratus"],
    mui: ["seratus", "səʁatus"],
    ljp: ["seratus", "səʁatus"],
    gay: ["seratus", "səratus"],
    min: ["saratuih", "saratuih"],
    sda: ["saratu", "saratu"],
    mdr: ["sangatus", "saŋatus"],
    bug: ["ratu'", "ratuʔ"],
    mad: ["saratos", "saratos"],
    sas: ["satus", "satus"],
    nia: ["ötu", "øtu"],
    gor: ["mohetuto", "mohetuto"],
    dtp: ["hatus", "hatus"],
    sdo: ["siratus", "siraːtus"],
    tsg: ["hanggatus", "haŋɡaˈtus"],
    mdh: ["magatus", "maɡatus"],
    mrw: ["magatos", "maɡatos"],
    agt: ["magatut", "maɡatut"],
    ilo: ["sangagasut", "saŋaɡaˈsut"],
    pam: ["dinalan", "dinaːˈlan"],
    pag: ["sanlasos", "sanlaˈsos"],
    bto: ["sanggatos", "saŋɡaˈtos"],
    pwn: ["taidai", "taidai"],
    bnn: ["saba", "saba"],   // the bare hundred root — one hundred is tas-saba
    ssf: ["shaba", "ʃaba"],   // same root as Bunun saba
    trv: ["kbekuy", "kbəkuj"],
    tay: ["kbhul", "kβhul"],
    tao: ["ranaw", "ranaw"],
    roo: ["voboto", "βoβoto"],
    mkz: ["rasa", "rasa"],
    aoz: ["natun", "natun"],   // one hundred is natun=es, with the metathesis Meto puts on a phrase-final noun
    meu: ["sinahu", "sinahu"],
    gil: ["tebubua", "tebubʷa"],
    kos: ["siofok", "siofok"],
    fud: ["kaulelau", "kaulelau"],
    wls: ["teau", "teau"],
    niu: ["teau", "teau"],
    tkl: ["helau", "helau"],
    tvl: ["selau", "selau"],
    pkp: ["lau", "lau"],   // the native Polynesian *rau, beside a borrowed aanele
    rap: ["rau", "rau"],   // native rau, beside the English loan hanere
    ty: ["hānere", "haːnere"],   // from English hundred; the older native rau survives beside it
    pmt: ["hānere", "haːnere"],   // from English hundred
    rar: ["'ānere", "ʔaːnere"],   // from English hundred
    ch: ["sientu", "sjentu"],   // Spanish loan, like this row's own dos and tres
    cab: ["san", "saŋ"],   // from French cent, like Haitian san
    // --- Africa — Bantu, Nilotic, Cushitic, Mande, Kwa ---------------------
    ki: ["igana", "iɣana"],
    mer: ["igana", "iɡana"],
    ebu: ["igana", "iɡana"],
    suk: ["igana", "iɡana"],
    nym: ["igana", "iɡana"],
    rim: ["ighana", "iɣana"],
    ttj: ["kikumi", "tʃikumi"],
    nyn: ["kikumi", "tʃikumi"],
    bem: ["umwanda", "umwanda"],
    loz: ["mwanda", "mwanda"],
    lua: ["lukama", "lukama"],
    lol: ["nkama", "nkama"],
    tll: ["lokama", "lokama"],
    kmb: ["hama", "hama"],
    umb: ["ocita", "otʃita"],
    her: ["esere", "esere"],
    kj: ["efele", "efele"],
    ve: ["ḓana", "d̪ana"],
    ts: ["dzana", "dzana"],
    vmw: ["emiya", "emija"],   // the Swahili mia, and so ultimately Arabic miʾa, taken into a Bantu noun class
    yao: ["mia", "mia"],   // Swahili loan
    swb: ["mia", "mia"],   // Swahili loan
    bxk: ["miya", "mija"],   // Swahili loan
    luy: ["emia", "emia"],   // Swahili loan
    kde: ["miya", "miːja"],   // Swahili loan; the inherited alternative is makuumi makuumi, ten tens
    luo: ["mia", "mia"],   // Swahili loan
    ach: ["miya", "mija"],   // Swahili loan
    laj: ["mia", "miə"],   // Swahili loan
    anu: ["dipa", "dipa"],
    teo: ["akwatat", "akwatat"],
    srr: ["teemeed", "teːmeːd"],   // the same word as Wolof téeméer
    dje: ["zangu", "zaŋɡu"],
    khq: ["jongu", "dʒoŋɡu"],
    bej: ["shee", "ʃeː"],
    ssy: ["bool", "boːl"],
    aa: ["bool", "boːlu"],
    drs: ["dhibba", "ɗibba"],
    kxc: ["dhippa", "ɗipːa"],
    aiw: ["mato", "mato"],   // beside a vigesimal circumlocution, edonq-baab its, five persons eaten
    wal: ["xeeta", "tʼeːta"],
    efi: ["ikie", "ikie"],   // Chan's Efik hundred is a gloss slip on its own one; ikie is read off its 200, ikie iba, and confirmed by Ibibio
    ibb: ["ikie", "íkíè"],
    ada: ["lafa", "lafa"],
    bci: ["ya", "ja"],
    mos: ["koabga", "koabɡa"],
    dag: ["kobga", "kobɡa"],
    mnk: ["keme", "keme"],
    kao: ["keme", "keme"],
    dyu: ["kɛmɛ", "kɛ̀mɛ́"],
    sus: ["kɛmɛ", "kɛmɛ"],
    bbo: ["jɔlɩ", "ɟɔ̄lɪ̀"],
    tem: ["kɛmɛ", "kɛmɛ"],
    snk: ["kame", "kãme"],
    men: ["hɔndo", "hɔ́ndo"],   // from English hundred
    bsq: ["hɔ̃dɛɖɛ", "hɔ̃dɛɖɛ"],   // from English hundred
    mev: ["wũ", "wũ"],
    ee: ["alafa", "alafa"],
    ak: ["ɔha", "ɔha"],
    zne: ["ngbangbu", "ŋɡbaŋɡbu"],
    fan: ["ntɛt", "ntɛ̀t"],
    ewo: ["ntɛt", "ntɛ̀d"],
    naq: ["kaidisi", "kaitisi"],   // literally big ten — disi is this row's own ten
    sad: ["kom kom", "kom kom"],   // ten ten; the Swahili mia is the alternative
    // --- Americas — Quechuan, Siouan, Algonquian, Mayan and the vigesimal count ----
    arn: ["pataka", "pataka"],
    quz: ["pachak", "ˈpatʃak"],
    jqr: ["pachak", "patʃak"],
    lkt: ["opáwiŋǧe", "opáwĩʁe"],
    dak: ["opáwiŋǧe", "opáwĩɣe"],
    win: ["hogihí", "hoɡihi"],
    cro: ["pilakisée", "pilakiseː"],
    cic: ["talhipa", "taɬipa"],
    mus: ["cokpe", "tʃokpi"],
    bla: ["kiipippo", "kiːpipːo"],
    pot: ["ngotwak", "ŋɡʊdwɑk"],
    nv: ["neeznádiin", "neːznáːtiːn"],   // ten tens — neeznáá is this row's ten, -diin the decade suffix
    esu: ["yuinaak talliman", "juinaːk talːiman"],   // five twenties: yuinaq is twenty, talliman this row's own five
    cuk: ["dulatar", "dulataɾ"],   // five persons — dula twenty, atar this row's own five
    quc: ["jokʼal", "xokʼal"],   // five twenties, on the Mayan vigesimal count
    cak: ["wokʼal", "wokʼal"],   // five twenties
    kjb: ["okʼal", "okʼal"],   // five twenties
    tzh: ["jo' winik", "hoʔ winik"],   // five twenties — winik is the score, literally man
    tsz: ["yumu ekuatsi", "jumu ekwatsi"],   // five twenties — yumu is this row's own five
    tar: ["siénto", "ˈsjento"],   // Spanish loan
    emp: ["cien", "sjen"],   // Spanish loan
    // --- Europe, the Caucasus rim and mainland Asia ------------------------
    kw: ["kans", "kans"],   // Celtic centum, beside Welsh cant and Breton kant
    gv: ["keead", "kʲiːd"],   // the Goidelic form, beside Irish céad
    fo: ["hundrað", "ˈhʊndɹa"],
    gsw: ["hundert", "ˈhʊndərt"],
    stq: ["hunnert", "ˈhunərt"],
    pcd: ["chint", "ʃɛ̃"],
    fax: ["cen", "θeŋ"],
    ruq: ["sută", "ˈsutə"],   // the Slavic loan Romanian also took
    sms: ["čuâđ", "tʃuaʰtʲ"],
    sma: ["tjuetie", "tɕuødie"],
    yai: ["sad", "sad"],
    tly: ["sə", "sæ"],
    luz: ["sad", "sað"],
    hif: ["sau", "səu"],
    hoc: ["sao", "sao"],   // borrowed from the Indo-Aryan neighbours, beside a native vigesimal mi hisi
    bsk: ["tha", "tʰaː"],
    kha: ["spah", "spaʔ"],
    grt: ["ritcha", "ritʃa"],
    cnh: ["za", "za"],
    lus: ["za", "dʒa"],
    nmf: ["shakha", "ʃakʰə"],   // sha is the hundred, kha this row's own one
    njo: ["nuklang", "nuklaŋ"],
    nzm: ["heiket", "heiket"],   // hei is the hundred, ket the enclitic one
    kac: ["tsa", "tsa˧"],
    tsj: ["gya", "ɡʲa"],   // the Tibetan བརྒྱ carried east into Tshangla
    jya: ["pərjɐ", "pərjɐ"],   // the same Tibetan brgya, behind a Gyalrong prefix
    yiz: ["xo", "xo˧"],
    nxq: ["xi", "ɕi˧"],
    mtq: ["tlăm", "tlam˥"],   // the cluster Vietnamese trăm lost
    mra: ["rɔy", "rɔj"],   // the Thai ร้อย, borrowed
    bdq: ["hreng", "hreŋ"],
    bru: ["culam", "kulam"],
    prk: ["yeh", "jɛh"],
    // --- Devanagari, Arabic, Tibetan, Cyrillic and the other scripts -------
    bgc: ["सौ", "sɔː"],
    hne: ["सौ", "səu"],
    mag: ["सौ", "so"],
    awa: ["सौ", "səu"],
    kfy: ["सौ", "sɔ"],
    lmn: ["सौ", "so"],
    bgq: ["सौ", "so"],
    mai: ["सै", "sɛ"],
    thr: ["सौ", "sau"],
    pnb: ["سو", "so"],
    kfx: ["पंज बी", "pandʒ biː"],   // five twenties — bi is this row's own twenty, panj its five
    brh: ["صد", "sad"],   // Persian loan
    mzn: ["صد", "sad"],
    bqi: ["صد", "sæd"],
    lrc: ["صد", "sʌd"],
    wbl: ["сад", "sad"],   // the Persian loan; the inherited count is panz bist, five twenties
    dv: ["ސަތޭކަ", "sat̪eːka"],
    tcy: ["ನೂದು", "nuːdu"],   // Dravidian *nūṟu, as in Tamil நூறு
    kfa: ["ನೂರ್", "nuːɾə"],
    sat: ["ᱥᱟᱭ", "sae"],   // an Indo-Aryan loan; the inherited count is mɔɽɛ gɛl, five tens
    tru: ["ܡܐ", "mo"],
    tig: ["ምእት", "mɨʔɨt"],   // the Geʽez ምእት unchanged
    sgw: ["በቅር", "bəkʼɨr"],
    bo: ["བརྒྱ", "ca˩˧"],
    lbj: ["བརྒྱ", "rɡʲa"],
    dz: ["བརྒྱ", "dʐa"],
    khg: ["བརྒྱ", "dʑa˥˧"],
    sip: ["བརྒྱ", "ɡʲɛ"],
    ce: ["бӀе", "bæː"],
    inh: ["бӀаь", "bʕe"],
    lez: ["виш", "wiʃ"],
    agx: ["верш", "werʃ"],
    ddo: ["бишон", "biʃon"],
    ani: ["бешонугу", "beʃonuɡu"],
    bxr: ["зуун", "zuːn"],
    xal: ["зун", "zuːn"],
    kim: ["чүс", "tʃys"],
    ude: ["таӈгу", "taŋɡu"],   // the Tungusic *taŋgū that Manchu writes ᡨᠠᠩᡤᡡ
    gld: ["таӈгу", "taŋɡu"],
    sjo: ["ᡨᠠᠩᡤᡡ", "taŋ"],
    eve: ["няма", "ɲama"],
    evn: ["нама", "nama"],
    yrk: ["юрˮ", "jurʔ"],
    nio: ["дир", "dʲir"],
    sel: ["тоон", "toːn"],
    chr: ["ᏍᎪᎯᏥᏆ", "sɡohitsɡwa"],   // ten-something: ᏍᎪᎯ is this row's own ten
    ain: ["アシㇰネ ホㇳネ", "aʃikne hotne"],   // five twenties — hotne is twenty, ashikne this row's own five
    blk: ["ရာ", "ja"],
    // --- Sinitic — 百 is 陰入; each tone is that row's own, read off its 骨 ----
    zh_tj: ["百", "pai˩˧"],
    zh_jn: ["百", "pai˨˩˧"],
    zh_zz: ["百", "pai˨˦"],
    zh_kf: ["百", "pai˨˦"],
    zh_xa: ["百", "pai˨˩"],
    zh_wh: ["百", "pai˨˩˧"],
    zh_cq: ["百", "pai˨˩"],
    zh_cd: ["百", "pai˨˩"],
    zh_km: ["百", "pai˧˩"],
    zh_sc: ["百", "pe˨˩"],
    hsn: ["百", "pe˨˦"],
    hsn_hy: ["百", "pɛ˨˦"],
    gan_yc: ["百", "pak̚˨˦"],
    gan_ja: ["百", "pa˥"],
    gan_fz: ["百", "paʔ˥"],
    cjy: ["百", "paʔ˨"],
    cjy_lv: ["百", "paʔ˨"],
    cjy_xz: ["百", "paʔ˨˩"],
    czh: ["百", "paʔ˨˦"],
    czh_wy: ["百", "paʔ˥˥"],
    wuu_sz: ["百", "pɐʔ˥"],
    wuu_nb: ["百", "pɐʔ˥˥"],
    wuu_hz: ["百", "pɐʔ˥"],
    wuu_jh: ["百", "pɐʔ˥"],
    wuu_jx: ["百", "pɐʔ˥"],
    yue_dg: ["百", "paːk̚˧"],
    yue_nn: ["百", "paːk̚˧"],
    yue_zs: ["百", "paːk̚˧"],
    hak_hl: ["百", "pak̚˨˨"],
    nan_pn: ["百", "paʔ˥˥"],
    mnp: ["百", "pa˨˦"],
    cpx: ["百", "paʔ˥˥"],
    // --- Late additions ----------------------------------------------------
    lo: ["ຮ້ອຍ", "hɔːj˥˩"],
    gd: ["ceud", "kʰʲiət"],   // the Goidelic céad again
    ab: ["шәкы", "ʃʷkʼə"],
    av: ["нусго", "nusɡo"],
    ks: ["ہَتھ", "hɐtʰ"],
    xmf: ["ოში", "ɔʃi"],   // Mingrelian oši, unrelated to Georgian ასი
    ia: ["cento", "ˈtʃento"],
    ie: ["cent", "tsent"],
    io: ["cent", "tsent"],
    bfq: ["nuuru", "nuːru"],   // Dravidian *nūṟu
    mak: ["sibilangngang", "sibilaŋːaŋ"],
    rtm: ["tarau", "tarau"],   // the Polynesian *rau under a prefix
    dru: ["iday", "idaj"],
    mas: ["ip", "iːp"],
    saq: ["ip", "ip"],
    ses: ["zangu", "zaŋɡu"],
    cgg: ["igana", "iɡana"],
    nyo: ["kikumi", "tʃikumi"],   // Runyoro palatalises k before i, as Tooro and Ganda do
    xnr: ["सौ", "sɔ"],
    cho: ["talhepa", "taːɬiːpə"],
    xkz: ["gya", "ɟɑ"],   // the Tibetan བརྒྱ once more
  },
};
