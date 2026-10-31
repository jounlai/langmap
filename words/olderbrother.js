/**
 * older_brother — whether a language needs to know who was born first.
 * 
 * Japanese 兄 and 弟, Chinese 哥哥 and 弟弟, Korean 형/오빠 and 동생, Turkish ağabey,
 * Hungarian báty, Tamil அண்ணன், Malay abang: across Asia, much of Africa and the
 * Pacific an older brother is a different person from a younger one, and the
 * word says so. Most of Europe has only 'brother' and adds 'older' when it
 * matters. Where there is a dedicated term the cell gives it; where there is
 * not, the cell gives the plain word for 'brother' and the route says so.
 * Where the term depends on the speaker's sex (Korean 형 for a man, 오빠 for a
 * woman), the cell gives the man-speaking form and the note gives the other.
 * The routes:
 *   age    a dedicated word for an older brother (or older sibling)
 *   plain  just 'brother' — no age distinction in the word
 */
WORDS.olderbrother = {
  emoji: "👦",
  label: {
    en: "Older brother",
    ja: "兄",
    ko: "형 / 오빠",
    zh: "哥哥",
    yue: "哥哥",
    vi: "Anh trai",
    th: "พี่ชาย",
    id: "Kakak laki-laki",
    hi: "बड़ा भाई",
    de: "Älterer Bruder",
    fr: "Frère aîné",
    it: "Fratello maggiore",
    es: "Hermano mayor",
    es_eu: "Hermano mayor",
    es_mx: "Hermano mayor",
    pt: "Irmão mais velho",
    pt_eu: "Irmão mais velho",
    pt_br: "Irmão mais velho",
    ru: "Старший брат",
    uk: "Старший брат",
    ar: "الأخ الأكبر",
    he: "אח גדול",
    sw: "Kaka mkubwa",
  },
  definition: {
    en: "Older brother — one's elder brother. Across much of Asia, Africa and the Pacific he is a different word from a younger brother — Japanese 兄 / 弟, Chinese 哥哥 / 弟弟, Turkish ağabey / kardeş, Hungarian báty / öcs — while most European languages say just \"brother\". Where a language has no separate word, the map shows its plain \"brother\".",
    ja: "兄 — 自分より年上の男きょうだい。アジア、アフリカ、太平洋の多くの言語では兄と弟は別の語で、日本語の兄／弟、中国語の哥哥／弟弟、トルコ語 ağabey／kardeş、ハンガリー語 báty／öcs のように言い分ける。ヨーロッパの多くの言語は brother 一語で済ませる。専用の語がない言語では、地図はその「兄弟」の語を示す。",
    ko: "형 / 오빠 — 나보다 나이가 많은 남자 형제. 아시아·아프리카·태평양의 많은 언어에서는 형과 아우가 서로 다른 낱말이어서, 일본어 兄／弟, 중국어 哥哥／弟弟, 터키어 ağabey／kardeş, 헝가리어 báty／öcs처럼 갈라 부른다. 유럽의 많은 언어는 brother 한 낱말로 끝낸다. 전용 낱말이 없는 언어는 그 \"형제\" 낱말을 지도에 싣는다. 말하는 사람의 성별에 따라 달라지면(형/오빠) 남성 화자의 말을 싣는다.",
    zh: "哥哥——比自己年长的兄弟。亚洲、非洲和太平洋地区的许多语言里，哥哥和弟弟是两个不同的词：日语 兄／弟，汉语 哥哥／弟弟，土耳其语 ağabey／kardeş，匈牙利语 báty／öcs。多数欧洲语言只说 brother。没有专用词的语言，地图上显示它的\"兄弟\"一词。",
    yue: "哥哥——比自己大嘅兄弟。亞洲、非洲同太平洋好多語言入面，哥哥同細佬係兩個唔同嘅詞：日文 兄／弟，中文 哥哥／弟弟，土耳其文 ağabey／kardeş，匈牙利文 báty／öcs。大部分歐洲語言淨係講 brother。冇專用詞嘅語言，地圖就顯示佢嘅「兄弟」嗰個詞。",
    vi: "Anh trai — người anh, lớn tuổi hơn mình. Ở nhiều ngôn ngữ châu Á, châu Phi và Thái Bình Dương, anh và em là hai từ khác nhau — tiếng Nhật 兄 / 弟, tiếng Trung 哥哥 / 弟弟, tiếng Thổ ağabey / kardeş, tiếng Hungary báty / öcs, tiếng Việt anh / em — trong khi phần lớn ngôn ngữ châu Âu chỉ nói \"brother\". Ngôn ngữ nào không có từ riêng thì bản đồ hiện từ \"anh em trai\" chung.",
    th: "พี่ชาย — พี่น้องผู้ชายที่อายุมากกว่า ในหลายภาษาของเอเชีย แอฟริกาและแปซิฟิก พี่กับน้องเป็นคนละคำ ญี่ปุ่น 兄 / 弟 จีน 哥哥 / 弟弟 ตุรกี ağabey / kardeş ฮังการี báty / öcs และไทย พี่ / น้อง ขณะที่ภาษายุโรปส่วนใหญ่พูดแค่ brother ภาษาที่ไม่มีคำเฉพาะ แผนที่จะแสดงคำว่า \"พี่น้องผู้ชาย\" ทั่วไปของภาษานั้น",
    id: "Kakak laki-laki — saudara laki-laki yang lebih tua. Di banyak bahasa Asia, Afrika, dan Pasifik, kakak dan adik adalah dua kata berbeda — Jepang 兄 / 弟, Tionghoa 哥哥 / 弟弟, Turki ağabey / kardeş, Hungaria báty / öcs, Indonesia kakak / adik — sedangkan sebagian besar bahasa Eropa hanya berkata \"brother\". Bahasa yang tak punya kata khusus ditampilkan dengan kata \"saudara laki-laki\" biasanya.",
    hi: "बड़ा भाई — अपने से उम्र में बड़ा भाई। एशिया, अफ़्रीका और प्रशांत की बहुत-सी भाषाओं में बड़ा और छोटा भाई अलग-अलग शब्द हैं — जापानी 兄 / 弟, चीनी 哥哥 / 弟弟, तुर्की ağabey / kardeş, हंगेरियाई báty / öcs, तमिल அண்ணன் / தம்பி — जबकि ज़्यादातर यूरोपीय भाषाएँ केवल \"brother\" कहती हैं। जिस भाषा में अलग शब्द नहीं है, नक़्शा उसका सामान्य \"भाई\" शब्द दिखाता है।",
    de: "Älterer Bruder — der Bruder, der älter ist als man selbst. In vielen Sprachen Asiens, Afrikas und des Pazifiks ist er ein anderes Wort als der jüngere Bruder — japanisch 兄 / 弟, chinesisch 哥哥 / 弟弟, türkisch ağabey / kardeş, ungarisch báty / öcs —, während die meisten europäischen Sprachen nur „Bruder“ sagen. Wo es kein eigenes Wort gibt, zeigt die Karte das einfache Wort für „Bruder“.",
    fr: "Frère aîné — le frère plus âgé que soi. Dans beaucoup de langues d'Asie, d'Afrique et du Pacifique, c'est un autre mot que le frère cadet — japonais 兄 / 弟, chinois 哥哥 / 弟弟, turc ağabey / kardeş, hongrois báty / öcs —, alors que la plupart des langues européennes disent seulement « frère ». Là où il n'existe pas de mot à part, la carte montre le simple mot « frère ».",
    it: "Fratello maggiore — il fratello più grande di sé. In molte lingue dell'Asia, dell'Africa e del Pacifico è una parola diversa dal fratello minore — giapponese 兄 / 弟, cinese 哥哥 / 弟弟, turco ağabey / kardeş, ungherese báty / öcs —, mentre la maggior parte delle lingue europee dice solo «fratello». Dove non c'è una parola a sé, la mappa mostra la semplice parola «fratello».",
    es: "Hermano mayor — el hermano que es mayor que uno. En muchas lenguas de Asia, África y el Pacífico es una palabra distinta de la del hermano menor — japonés 兄 / 弟, chino 哥哥 / 弟弟, turco ağabey / kardeş, húngaro báty / öcs —, mientras que la mayoría de las lenguas europeas dice solo «hermano». Donde no hay una palabra propia, el mapa muestra la palabra simple para «hermano».",
    es_eu: "Hermano mayor — el hermano que es mayor que uno. En muchas lenguas de Asia, África y el Pacífico es una palabra distinta de la del hermano menor — japonés 兄 / 弟, chino 哥哥 / 弟弟, turco ağabey / kardeş, húngaro báty / öcs —, mientras que la mayoría de las lenguas europeas dice solo «hermano». Donde no hay una palabra propia, el mapa muestra la palabra simple para «hermano».",
    es_mx: "Hermano mayor — el hermano que es mayor que uno. En muchas lenguas de Asia, África y el Pacífico es una palabra distinta de la del hermano menor — japonés 兄 / 弟, chino 哥哥 / 弟弟, turco ağabey / kardeş, húngaro báty / öcs —, mientras que la mayoría de las lenguas europeas dice solo «hermano». Donde no hay una palabra propia, el mapa muestra la palabra simple para «hermano».",
    pt: "Irmão mais velho — o irmão mais velho do que nós. Em muitas línguas da Ásia, de África e do Pacífico é uma palavra diferente da do irmão mais novo — japonês 兄 / 弟, chinês 哥哥 / 弟弟, turco ağabey / kardeş, húngaro báty / öcs —, enquanto a maioria das línguas europeias diz apenas «irmão». Onde não há palavra própria, o mapa mostra a palavra simples para «irmão».",
    pt_eu: "Irmão mais velho — o irmão mais velho do que nós. Em muitas línguas da Ásia, de África e do Pacífico é uma palavra diferente da do irmão mais novo — japonês 兄 / 弟, chinês 哥哥 / 弟弟, turco ağabey / kardeş, húngaro báty / öcs —, enquanto a maioria das línguas europeias diz apenas «irmão». Onde não há palavra própria, o mapa mostra a palavra simples para «irmão».",
    pt_br: "Irmão mais velho — o irmão mais velho do que nós. Em muitas línguas da Ásia, de África e do Pacífico é uma palavra diferente da do irmão mais novo — japonês 兄 / 弟, chinês 哥哥 / 弟弟, turco ağabey / kardeş, húngaro báty / öcs —, enquanto a maioria das línguas europeias diz apenas «irmão». Onde não há palavra própria, o mapa mostra a palavra simples para «irmão».",
    ru: "Старший брат — брат, который старше тебя. Во многих языках Азии, Африки и Океании это другое слово, чем младший брат — японское 兄 / 弟, китайское 哥哥 / 弟弟, турецкое ağabey / kardeş, венгерское báty / öcs, — тогда как большинство европейских языков говорит просто «брат». Где отдельного слова нет, карта показывает простое слово «брат».",
    uk: "Старший брат — брат, старший за тебе. У багатьох мовах Азії, Африки та Океанії це інше слово, ніж молодший брат — японське 兄 / 弟, китайське 哥哥 / 弟弟, турецьке ağabey / kardeş, угорське báty / öcs, — тоді як більшість європейських мов каже просто «брат». Де окремого слова немає, мапа показує просте слово «брат».",
    ar: "الأخ الأكبر — الأخ الذي يكبرك سنًّا. في كثير من لغات آسيا وأفريقيا والمحيط الهادئ هو كلمة غير كلمة الأخ الأصغر — اليابانية 兄 / 弟، والصينية 哥哥 / 弟弟، والتركية ağabey / kardeş، والمجرية báty / öcs — بينما تقول معظم اللغات الأوروبية «أخ» فقط. وحيث لا توجد كلمة خاصة، تعرض الخريطة الكلمة العادية لـ«أخ».",
    he: "אח גדול — האח המבוגר ממך. בשפות רבות באסיה, באפריקה ובאוקיינוס השקט זו מילה שונה מאח צעיר — ביפנית 兄 / 弟, בסינית 哥哥 / 弟弟, בטורקית ağabey / kardeş, בהונגרית báty / öcs — ואילו רוב השפות האירופיות אומרות רק \"אח\". היכן שאין מילה נפרדת, המפה מציגה את המילה הפשוטה \"אח\".",
    sw: "Kaka mkubwa — kaka aliyekuzidi umri. Katika lugha nyingi za Asia, Afrika na Pasifiki ni neno tofauti na la kaka mdogo — Kijapani 兄 / 弟, Kichina 哥哥 / 弟弟, Kituruki ağabey / kardeş, Kihungaria báty / öcs — huku lugha nyingi za Ulaya zikisema tu \"kaka\". Pale ambapo hakuna neno maalum, ramani inaonyesha neno la kawaida la \"kaka\".",
  },
  family: {
    en: "plain",
    en_us: "plain",
    en_ca: "plain",
    en_wls: "plain",
    en_za: "plain",
    en_ke: "plain",
    en_jam: "plain",
    en_ng: "plain",
    de: "plain",
    de_ch: "plain",
    lb: "plain",
    nl: "plain",
    nl_be: "plain",
    fr: "plain",
    fr_sn: "plain",
    fr_ci: "plain",
    fr_ht: "plain",
    it: "plain",
    es: "plain",
    es_mx: "plain",
    es_pr: "plain",
    es_do: "plain",
    es_gt: "plain",
    es_ve: "plain",
    es_uy: "plain",
    ca_va: "plain",
    pt: "plain",
    pt_br: "plain",
    pt_mz: "plain",
    pt_ao: "plain",
    pt_cv: "plain",
    ru: "plain",
    pl: "plain",
    el: "plain",
    fi: "plain",
    hu: "age",
    ja: "age",
    ja_oki: "age",
    ja_mvi: "age",
    ja_rys: "age",
    ko: "age",
    ko_kp: "age",
    zh: "age",
    zh_tw: "age",
    yue: "age",
    nan: "age",
    wuu: "age",
    hak_cn: "age",
    vi: "age",
    vi_c: "age",
    vi_s: "age",
    th: "age",
    lo: "age",
    km: "age",
    my: "age",
    id: "age",
    ms: "age",
    tl: "age",
    bn: "age",
    ta: "age",
    sa: "age",
    prs: "age",
    tr: "age",
    mn: "age",
    ar: "plain",
    ar_qur: "plain",
    ar_sy: "plain",
    ar_lb: "plain",
    afb: "plain",
    he: "plain",
    com: "age",
    sah: "age",
    dlg: "age",
    tyv: "age",
    alt: "age",
    evn: "age",
    eve: "age",
    gld: "age",
    kca: "age",
    ykg: "age",
    niv: "age",
    ket: "plain",
    yo: "age",
    mg: "age",
    ain: "age",
    sv: "plain",
    no: "plain",
    da: "plain",
    ro: "plain",
    ga: "plain",
    eu: "plain",
    cy: "plain",
    hy: "plain",
    hyw: "plain",
    uk: "plain",
    nv: "age",
    haw: "age",
    mi: "age",
    qu: "plain",
    zh_db: "age",
    zh_sc: "age",
    cdo: "age",
    bo: "age",
    za: "age",
    swi: "age",
    lic: "age",
    orh: "age",
    jiu: "age",
    hni: "age",
    jv: "age",
    su: "age",
    ceb: "age",
    ilo: "age",
    to: "age",
    ne: "age",
    mr: "age",
    gu: "plain",
    dv: "age",
    te: "age",
    kn: "age",
    ml: "age",
    tg: "age",
    wo: "age",
    ha: "age",
    si: "age",
    ug: "age",
    kk: "age",
    ky: "age",
    uz: "age",
    tk: "age",
    mnc: "age",
    mn_cn: "age",
    th_s: "age",
    yi: "plain",
    ca: "plain",
    br: "plain",
    de_at: "plain",
    en_au: "plain",
    en_nz: "plain",
    en_aave: "plain",
    ka: "plain",
    en_south: "plain",
    en_app: "plain",
    en_in: "plain",
    en_ie: "plain",
    en_sco: "plain",
    en_yk: "plain",
    en_ck: "plain",
    en_scouse: "plain",
    en_geordie: "plain",
    en_brum: "plain",
    en_manc: "plain",
    en_wc: "plain",
    en_est: "plain",
    be: "plain",
    cs: "plain",
    sk: "plain",
    sl: "plain",
    bg: "age",
    mk: "age",
    lt: "plain",
    lv: "plain",
    et: "plain",
    se: "plain",
    sjd: "plain",
    jam: "plain",
    tpi: "plain",
    yrl: "plain",
    as: "age",
    rom: "plain",
    fr_qc: "plain",
    fr_af: "plain",
    fr_be: "plain",
    fr_ch: "plain",
    es_co: "plain",
    es_ar: "plain",
    es_cu: "plain",
    es_pe: "plain",
    es_an: "plain",
    nn: "plain",
    la: "plain",
    ang: "plain",
    en_em: "plain",
    arc: "plain",
    ja_kanbun: "age",
    vi_nom: "age",
    ce: "plain",
    inh: "plain",
    av: "plain",
    lez: "plain",
    eo: "plain",
    yua: "age",
    tzo: "age",
    kl: "age",
    oj: "age",
    arn: "plain",
    dar: "plain",
    lbe: "plain",
    aqc: "plain",
    kum: "age",
    os: "plain",
    ady: "plain",
    tet: "age",
    ban: "age",
    min: "age",
    bik: "age",
    pjt: "age",
    kky: "age",
    aer: "age",
    lus: "age",
    ee: "age",
    nan_te: "age",
    yue_ts: "age",
    zh_jh: "age",
    zh_lz: "age",
    dng: "age",
    kpv: "plain",
    udm: "age",
    mhr: "age",
    mrj: "age",
    myv: "age",
    mdf: "age",
    dsb: "plain",
    crh: "age",
    tt: "age",
    ba: "age",
    mns: "age",
    zh_wh: "age",
    zh_km: "age",
    zh_nj: "age",
    zh_hf: "age",
    zh_jn: "age",
    zh_cd: "age",
    zh_xa: "age",
    hak_tw: "age",
    hak_hl: "age",
    nan_qz: "age",
    nan_hai: "age",
    wuu_hz: "age",
    wuu_sz: "age",
    wuu_nb: "age",
    wuu_jh: "age",
    yue_zs: "age",
    yue_nn: "age",
    xct: "age",
    xct_litpr: "age",
    kaw: "age",
    gmh: "plain",
    de_lut: "plain",
    es_sgl: "plain",
    kek: "age",
    pam: "age",
    dtp: "age",
    khb: "age",
    kac: "age",
    mkz: "age",
    wrh: "age",
    djr: "age",
    tsj: "age",
    ko_jl: "age",
    ani: "plain",
    rut: "plain",
    khv: "plain",
    th_isan: "age",
    xh: "age",
    ff: "age",
    ln: "age",
    am: "plain",
    fa: "plain",
    cjy: "age",
    hsn: "age",
    gan: "age",
    mnp: "age",
    cnp: "age",
    sn: "age",
    rn: "age",
    rw: "age",
    st: "age",
    gn: "age",
    af: "plain",
    bm: "age",
    hmn: "age",
    mak: "age",
    bbc: "age",
    ace: "age",
    sc: "plain",
    bs: "plain",
    mrw: "age",
    bxk: "age",
    ve: "age",
    yao: "age",
    bem: "age",
    tsg: "age",
    myx: "plain",
    cpx: "age",
    ay: "plain",
    tyz: "age",
    pcc: "age",
    mnw: "age",
    ksw: "age",
    cv: "age",
    grt: "age",
    bjn: "age",
    mnk: "age",
    dnj: "age",
    dag: "age",
    quc: "age",
    bts: "age",
    quz: "plain",
    ami: "age",
    is: "plain",
    wa: "plain",
    tzh: "age",
    loz: "age",
    kqn: "age",
    lue: "age",
    her: "age",
    ote: "plain",
    quy: "plain",
    nij: "age",
    new: "age",
    akb: "age",
    sda: "age",
    aoz: "age",
    hwc: "plain",
    aii: "plain",
    mt: "plain",
    sm: "plain",
    mam: "age",
    cak: "age",
    gej: "age",
    lol: "age",
    ebu: "plain",
    ses: "age",
    fj: "age",
    pis: "plain",
    pap: "plain",
    pdc: "plain",
    bxr: "age",
    naq: "plain",
    bdq: "age",
    ctu: "age",
    ty: "age",
    rar: "age",
    niu: "age",
    tvl: "plain",
    cr: "age",
    meu: "age",
    pwn: "plain",
    mh: "age",
    pau: "age",
    ch: "plain",
    bnn: "age",
    tab: "plain",
    tkr: "plain",
    nog: "age",
    shp: "age",
    crs: "plain",
    kmh: "plain",
    gil: "plain",
    esu: "age",
    xal: "age",
    cnh: "age",
    lbj: "age",
    nzm: "age",
    xkz: "age",
    gay: "age",
    hui: "plain",
    bru: "age",
    ho: "age",
    cuk: "age",
    agr: "plain",
    trv: "age",
    tru: "plain",
    tay: "age",
    kjh: "age",
    sbp: "age",
    djk: "plain",
    mxv: "plain",
    iu: "age",
    gd: "plain",
    emp: "plain",
    mrq: "age",
    ko_jeju: "age",
    mic: "age",
    tsu: "age",
    moh: "age",
    wbp: "age",
    tao: "age",
    pyu: "age",
    lkt: "age",
    chy: "age",
    tkl: "plain",
    stq: "plain",
    kw: "plain",
    szy: "age",
    sma: "plain",
    dak: "age",
    yux: "age",
    es_cr: "plain",
    es_hn: "plain",
    es_ni: "plain",
    es_sv: "plain",
    ar_jo: "plain",
    ar_ps: "plain",
    fr_lu: "plain",
    fr_cm: "plain",
    de_lu: "plain",
    en_ng2: "plain",
    pt_mo: "plain",
    hsn_hy: "age",
    win: "age",
    cro: "age",
    es_bo: "plain",
    es_py: "plain",
    es_pa: "plain",
    nan_zz: "age",
    osa: "age",
    bew: "age",
    ltg: "plain",
    io: "plain",
    hif: "plain",
    fud: "age",
    lun: "age",
    pmt: "age",
    ake: "age",
    gun: "age",
    acw: "plain",
    ivv: "age",
    itb: "age",
    piu: "age",
    kgp: "age",
    tob: "age",
    plg: "age",
    moc: "age",
    mbc: "age",
    kpj: "age",
    cag: "age",
    crt: "age",
    tue: "age",
    blc: "age",
    roo: "plain",
    nan_ph: "age",
    mhy: "age",
    aau: "age",
    bdk: "plain",
    dbl: "age",
    huz: "plain",
    kpf: "age",
    lij_t: "plain",
    mpj: "age",
    bbl: "plain",
    kfa: "age",
    kry: "plain",
    wls: "age",
    ckv: "age",
    nan_xm: "age",
    och: "age",
    zh_han: "age",
    zh_tang: "age",
    zh_yuan: "age",
    zh_wenyan_edu: "age",
    vi_han: "age",
    ojp: "age",
    ja_heian: "age",
    ja_chu: "age",
    ja_edo: "age",
    nci: "age",
    puaz: "age",
    xng: "age",
    cmg: "age",
    paus: "age",
    p_dra: "age",
    ko_mid: "age",
    el_grc: "plain",
    hbo: "plain",
    he_mis: "plain",
    hy_grab: "plain",
    fr_class: "plain",
    sukh: "age",
    ptai: "age",
    tpn: "age",
    qwc: "plain",
    sa_edu: "age",
    akk: "plain",
    enm: "plain",
    el_kath: "plain",
    dzg: "age",
    ttq: "age",
    auj: "age",
    siz: "plain",
    hi: "age",
    ur: "unknown",
    pa: "unknown",
    sw: "plain",
    pcm: "plain",
    bho: "age",
    ps: "age",
    mai: "age",
    awa: "unknown",
    or: "unknown",
    om: "plain",
    sd: "age",
    ku: "age",
    so: "plain",
    az: "unknown",
    azb: "unknown",
    bar: "plain",
    tn: "age",
    sr: "plain",
    ht: "plain",
    bal: "plain",
    dyu: "age",
    kr: "age",
    hil: "age",
    ak: "plain",
    ckb: "plain",
    mad: "age",
    ki: "age",
    ks: "plain",
    mos: "age",
    lua: "age",
    kab: "age",
    lg: "plain",
    hr: "plain",
    nso: "age",
    sg: "age",
    kok: "plain",
    snk: "age",
    kha: "age",
    fon: "age",
    ndc: "age",
    toi: "age",
    cgg: "age",
    teo: "plain",
    wal: "plain",
    drs: "plain",
    kbd: "plain",
    rhg: "plain",
    max: "age",
    abs: "age",
    aa: "age",
    mfa: "age",
    tum: "age",
    shn: "age",
    xog: "plain",
    dje: "unknown",
    bug: "unknown",
    gl: "plain",
    vec: "plain",
    lmo: "plain",
    zza: "plain",
    srn: "unknown",
    mzn: "unknown",
    sdh: "unknown",
    bej: "unknown",
    sid: "plain",
    luo: "unknown",
    brh: "unknown",
    iba: "age",
    mfe: "age",
    sco: "plain",
    li: "plain",
    bqi: "unknown",
    nus: "unknown",
    mas: "plain",
    nym: "age",
    tig: "plain",
    en_my: "plain",
    es_ec: "plain",
    ar_lev: "plain",
    ar_gulf: "plain",
    ar_iq: "plain",
    ar_sd: "plain",
    ar_ye: "plain",
    gsw: "plain",
    ksh: "plain",
    rmy: "plain",
    en_sg: "plain",
    es_cl: "plain",
    crk: "age",
    nan_pn: "age",
    yue_dg: "age",
    nia: "age",
    tly: "age",
    fur: "plain",
    rue: "plain",
    mev: "age",
    kxc: "age",
    maw: "age",
    guc: "age",
    bft: "age",
    rup: "plain",
    bto: "age",
    xmf: "plain",
    zap: "unknown",
    asu: "unknown",
    adi: "age",
    fy: "plain",
    oc: "plain",
    lij: "plain",
    szl: "plain",
    pdt: "plain",
    krc: "unknown",
    jmc: "unknown",
    ast: "plain",
    co: "plain",
    csb: "plain",
    ab: "plain",
    lzz: "unknown",
    frp: "unknown",
    byn: "unknown",
    cab: "age",
    mdr: "age",
    bzj: "unknown",
    bi: "plain",
    hns: "plain",
    kfx: "unknown",
    ssy: "unknown",
    enq: "unknown",
    maz: "unknown",
    saq: "unknown",
    nch: "unknown",
    sip: "age",
    toj: "age",
    poh: "age",
    ixl: "age",
    dsh: "age",
    dur: "age",
    bbo: "age",
    dbq: "plain",
    ekp: "age",
    dds: "age",
    cho: "age",
    rtm: "age",
    yrk: "age",
    ddo: "plain",
    huv: "age",
    ygr: "age",
    tcs: "plain",
    vep: "age",
    mus: "age",
    yap: "age",
    usp: "age",
    ium: "age",
    myp: "plain",
    smn: "plain",
    kwk: "age",
    thp: "age",
    yur: "age",
    cay: "age",
    pqm: "age",
    tlh: "plain",
    mra: "age",
    enf: "age",
    nio: "age",
    adt: "age",
    wbt: "age",
    nys: "age",
    kgg: "age",
    ale: "age",
    koy: "age",
  },
  routes: {
    age: {"color":"#db2777","emoji":"👆","en":"a word just for an older brother","ja":"兄だけを指す語","ko":"형만 가리키는 낱말","zh":"专指哥哥的词","yue":"專指哥哥嘅詞","vi":"từ riêng cho anh","th":"คำเฉพาะสำหรับพี่ชาย","id":"kata khusus untuk kakak","hi":"बड़े भाई का अलग शब्द","de":"eigenes Wort für den älteren Bruder","fr":"un mot propre au frère aîné","it":"una parola solo per il fratello maggiore","es":"una palabra solo para el hermano mayor","pt":"uma palavra só para o irmão mais velho","ru":"отдельное слово для старшего брата","uk":"окреме слово для старшого брата","ar":"كلمة خاصة بالأخ الأكبر","he":"מילה מיוחדת לאח הגדול","sw":"neno maalum kwa kaka mkubwa"},
    plain: {"color":"#6b7280","emoji":"🧑‍🤝‍🧑","en":"just \"brother\"","ja":"「兄弟」一語だけ","ko":"\"형제\" 한 낱말뿐","zh":"只有\"兄弟\"一词","yue":"淨係「兄弟」一個詞","vi":"chỉ có \"anh em trai\"","th":"มีแค่คำว่า \"พี่น้องชาย\"","id":"hanya \"saudara laki-laki\"","hi":"केवल \"भाई\"","de":"nur „Bruder“","fr":"seulement « frère »","it":"solo «fratello»","es":"solo «hermano»","pt":"só «irmão»","ru":"просто «брат»","uk":"просто «брат»","ar":"«أخ» فقط","he":"רק \"אח\"","sw":"tu \"kaka\""},
    unknown: {"color":"#b45309","emoji":"❓","en":"not yet determined · needs a source","ja":"未判定 · 出典待ち","ko":"미판정 · 출처 필요","zh":"尚未判定 · 待查证","yue":"重未判定 · 等考證","vi":"chưa xác định · cần nguồn","th":"ยังไม่ระบุ · รอแหล่งอ้างอิง","id":"belum ditentukan · perlu sumber","hi":"अनिर्धारित · स्रोत चाहिए","de":"noch offen · Beleg fehlt","fr":"non déterminé · source manquante","it":"non determinato · manca la fonte","es":"sin determinar · falta la fuente","pt":"por determinar · falta a fonte","ru":"не определено · нужен источник","uk":"не визначено · потрібне джерело","ar":"لم يُحدَّد بعد · بحاجة إلى مصدر","he":"טרם נקבע · דרוש מקור","sw":"haijabainishwa · chanzo kinahitajika"},
  },
  data: {
    en: ["brother", "ˈbɹʌðə"],  // English has no single word for an older brother; age is added with older, elder or big.
    en_us: ["brother", "ˈbɹʌðɚ"],  // Older and younger brothers are both just brother; big brother or older brother when it matters.
    en_ca: ["brother", "ˈbɹʌðɚ"],  // Older and younger brothers are both just brother.
    en_wls: ["brother", "ˈbɾʌðə"],  // Older and younger brothers are both just brother.
    en_za: ["brother", "ˈbɹʌðə"],  // Older and younger brothers are both just brother.
    en_ke: ["brother", "ˈbɹʌðə"],  // Older and younger brothers are both just brother.
    en_jam: ["brother", "ˈbɹɵðə"],  // Older and younger brothers are both just brother; brudda is the Jamaican pronunciation spelling.
    en_ng: ["brother", "ˈbɹɔðə"],  // Older and younger brothers are both just brother, with an adjective added for age.
    de: ["Bruder", "ˈbʁuːdɐ"],  // German has no separate older-brother word: großer Bruder, 'big brother', or älterer Bruder.
    de_ch: ["Bruder", "ˈbruːdər"],  // As in Germany, an older brother is just der grosse Bruder, 'the big brother'.
    lb: ["Brudder", "ˈbʁudɐ"],  // Age is shown with an adjective, as in de klenge Brudder, 'the little brother'.
    nl: ["broer", "bruːr"],  // Dutch says oudere broer or grote broer; there is no single older-brother word.
    nl_be: ["broer", "bruːr"],  // As in the Netherlands, an older brother is an oudere or grote broer.
    fr: ["frère", "fʁɛʁ"],  // French has no separate word: a grand frère or frère aîné is an older brother.
    fr_sn: ["frère", "fʁɛʁ"],  // Age is said with grand frère or frère aîné, as in France.
    fr_ci: ["frère", "fʁɛʁ"],  // Age is said with grand frère or frère aîné, as in France.
    fr_ht: ["frère", "fʁɛʁ"],  // Age is said with grand frère or frère aîné, as in France.
    it: ["fratello", "fraˈtɛllo"],  // Italian says fratello maggiore, 'greater brother', for an older brother.
    es: ["hermano", "eɾˈmano"],  // An older brother is a hermano mayor; colloquial tato and Andean ñaño exist but are not the standard word.
    es_mx: ["hermano", "eɾˈmano"],  // An older brother is a hermano mayor.
    es_pr: ["hermano", "eɾˈmano"],  // An older brother is a hermano mayor.
    es_do: ["hermano", "eɾˈmano"],  // An older brother is a hermano mayor.
    es_gt: ["hermano", "eɾˈmano"],  // An older brother is a hermano mayor.
    es_ve: ["hermano", "eɾˈmano"],  // An older brother is a hermano mayor.
    es_uy: ["hermano", "eɾˈmano"],  // An older brother is a hermano mayor.
    ca_va: ["germà", "dʒeɾˈma"],  // An older brother is a germà gran, 'big brother'.
    pt: ["irmão", "iɾˈmɐ̃w"],  // An older brother is an irmão mais velho, 'older brother'.
    pt_br: ["irmão", "iʁˈmɐ̃w̃"],  // An older brother is an irmão mais velho.
    pt_mz: ["irmão", "iɾˈmɐ̃w"],  // An older brother is an irmão mais velho.
    pt_ao: ["irmão", "iɾˈmɐ̃w"],  // An older brother is an irmão mais velho.
    pt_cv: ["irmão", "iɾˈmɐ̃w"],  // An older brother is an irmão mais velho.
    ru: ["брат", "brat"],  // An older brother is a старший брат, 'senior brother'.
    pl: ["brat", "brat"],  // An older brother is a starszy brat, 'older brother'.
    el: ["αδερφός", "aðeɾˈfos"],  // An older brother is a μεγάλος αδερφός, 'big brother'.
    fi: ["veli", "ˈʋeli"],  // An older brother is an isoveli, 'big brother'.
    hu: ["báty", "baːc"],  // Hungarian keeps a separate word for an older brother; younger: öcs, and the neutral fivér is 'brother'.
    ja: ["兄", "ani"],  // Japanese has separate words by age: 兄 ani is an older brother, 弟 otōto a younger one; お兄さん oniisan is the polite form.
    ja_oki: ["しーじゃ", "ɕiːdʑa"],  // Okinawan しーじゃ is any older sibling; an older brother can be specified as wikiga shīja, 'male older sibling', and class-specific words like やっちー also exist.
    ja_mvi: ["すざ", "sɨza"],  // Miyako すざ means an older sibling of either sex, from Proto-Ryukyuan *soza.
    ja_rys: ["しじゃ", "ɕidʑa"],  // Yaeyama しじゃ means an older sibling of either sex, cognate with Okinawan しーじゃ.
    ko: ["형", "çʌŋ"],  // Said by a man; a woman calls her older brother 오빠 oppa, and a younger brother is 남동생.
    ko_kp: ["형", "çʌŋ"],  // Said by a man; a woman's older brother is 오빠, and a younger brother is 남동생.
    zh: ["哥哥", "kɤ˥ kɤ"],  // Chinese always splits brothers by age: 哥哥 gēge older, 弟弟 dìdi younger; 兄弟 covers both.
    zh_tw: ["哥哥", "kɤ˥ kɤ"],  // As on the Mainland, 哥哥 is an older brother and 弟弟 a younger one.
    yue: ["阿哥", "aː˧ kɔː˥"],  // Cantonese 阿哥 is an older brother; colloquially also 大佬, while a younger brother is 細佬.
    nan: ["阿兄", "a˦˦ hiã˦˦"],  // Taiwanese 阿兄 a-hiaⁿ is an older brother; a younger one is 小弟 sió-tī.
    wuu: ["阿哥", "aʔ˧˧ ku˦˦"],  // Shanghainese 阿哥 is an older brother; 哥哥 is also used.
    hak_cn: ["阿哥", "a˦ ko˦"],  // Hakka 阿哥 is an older brother, built like this row's 阿爸 'dad'.
    vi: ["anh", "ajŋ˧"],  // Vietnamese splits siblings by age: anh is an older brother, em a younger sibling (em trai, a younger brother).
    vi_c: ["anh", "ɛɲ˥"],  // As in the north, anh is an older brother and em trai a younger one.
    vi_s: ["anh", "an˧"],  // An older brother is anh, the eldest in the South anh hai; a younger brother is em trai.
    th: ["พี่ชาย", "pʰiː˥˩ tɕʰaːj˧"],  // Thai พี่ means any older sibling, and พี่ชาย, 'older sibling male', an older brother; a younger brother is น้องชาย.
    lo: ["ອ້າຍ", "ʔaːj˥˨"],  // Lao has a single word for an older brother; a younger brother is ນ້ອງຊາຍ.
    km: ["បងប្រុស", "ɓɑːŋ proh"],  // Khmer បងប្រុស is an older brother and ប្អូនប្រុស a younger one.
    my: ["အစ်ကို", "ʔəkò"],  // Used by men and women alike today; a man's younger brother is ညီ, a woman's မောင်.
    id: ["kakak laki-laki", "kakaʔ lakilaki"],  // Indonesian kakak is an older sibling, made male with laki-laki; the dedicated word abang is regional, and a younger brother is adik laki-laki.
    ms: ["abang", "abaŋ"],  // Malay abang is an older brother, also used by a wife to her husband; a younger brother is adik lelaki.
    tl: ["kuya", "ˈkuja"],  // Borrowed from Hokkien; Tagalog also has birth-order titles such as diko for the second-eldest brother and sangko for the third; a younger brother can be totoy.
    bn: ["দাদা", "dada"],  // দাদা is an older brother chiefly in India, and also means 'paternal grandfather'; plain ভাই is 'brother'.
    ta: ["அண்ணன்", "aɳːan"],  // Tamil splits brothers by age: அண்ணன் older, தம்பி younger; அண்ணா is a common variant.
    sa: ["अग्रजः", "ɐɡɾɐdʑɐh"],  // Literally 'born first'; Sanskrit can also say jyāyān bhrātā, 'the older brother', against avaraja 'born after' for a younger one.
    prs: ["لالا", "lɑːlɑː"],  // Colloquial Dari لالا is an older brother, compare Pashto and Punjabi lālā; the formal word for any brother is برادر.
    tr: ["ağabey", "aːˈbej"],  // Turkish ağabey, usually said abi, is an older brother; younger: (erkek) kardeş.
    mn: ["ах", "ax"],  // Mongolian splits by age: ах older brother, дүү younger sibling, and ах дүү for brothers together.
    ar: ["أخ", "ʔax"],  // Arabic has no separate older-brother word: an older brother is أخ أكبر, 'bigger brother'.
    ar_qur: ["أخ", "ʔax"],  // In the Joseph sura the eldest brother is only kabīruhum, 'the eldest of them'; the kin word itself is plain akh.
    ar_sy: ["أخ", "ʔaxx"],  // An older brother is just أخ, specified as 'the big one' when needed.
    ar_lb: ["أخ", "ʔaxx"],  // Lebanese also says خيّ ḵayy, once a fond diminutive, for a brother of any age.
    afb: ["أخو", "ʔuxu"],  // Gulf Arabic أخو is a brother of any age; age is added with an adjective.
    he: ["אח", "aχ"],  // Hebrew says אח גדול, 'big brother', and אח קטן, 'little brother'.
    com: ["pabi", "pabi"],  // Comanche has separate words: pabi older brother, tami younger brother.
    sah: ["убай", "ubaj"],  // Sakha убай (also бии) is an older brother; younger: быраат or ини.
    dlg: ["убай", "ubaj"],  // Dolgan убай is an older brother, as in Sakha; younger: балыс.
    tyv: ["акы", "akkɯ"],  // Tuvan акы is an older brother; younger siblings of either sex are дуңма.
    alt: ["ага", "aɡa"],  // From Proto-Turkic *āka; ака is also recorded, and a younger brother is ини.
    evn: ["акӣн", "akiːn"],  // Evenki акӣн is an older brother; younger: нэкӯн.
    eve: ["акан", "akan"],  // Even акан is an older brother; younger siblings of either sex are нө.
    gld: ["ага", "aɡa"],  // Nanai ага is an older brother, from Proto-Tungusic *akun.
    kca: ["яй", "jaj"],  // Khanty splits brothers by age: яй older, апси younger.
    ykg: ["акаа", "akaː"],  // Borrowed from Even ака, 'elder brother'.
    niv: ["ыкын", "ɯkɯn"],  // Nivkh ыкын is an older brother; younger siblings are асӄ.
    ket: ["хигбисеп", "çiɡbʲiɕɛp"],  // WOLD gives older and younger brother as phrases on the same word, qà hiɣbisep and həna hiɣbisep.
    yo: ["ẹ̀gbọ́n", "ɛ̀ɡbɔ̃́"],  // Yoruba ẹ̀gbọ́n is any older sibling, brother or sister; younger: àbúrò.
    mg: ["zoky", "ˈzuki"],  // Malagasy zoky is any older sibling of either sex; anadahy is specifically a woman's brother.
    ain: ["ユポ", "jupo"],  // Ainu ユポ is an older brother; a younger one is アㇰ ak.
    sv: ["bror", "bruːr"],  // Swedish has no separate word: an older brother is storebror 'big brother' or äldre bror, a younger one lillebror.
    no: ["bror", "bruːr"],  // An older brother is simply storebror, 'big brother'; there is no separate word.
    da: ["bror", "bʁoɐ̯"],  // Danish says storebror 'big brother' and lillebror 'little brother'; both are built on bror.
    ro: ["frate", "ˈfrate"],  // Romanian uses frate for older and younger brothers alike (WOLD); age is added with mai mare 'bigger' if needed.
    ga: ["deartháir", "dʲɾʲəˈhaːɾʲ"],  // Irish deartháir, literally 'true brother' (Old Irish derb + bráthair); an older brother is deartháir mór 'big brother'.
    eu: ["anaia", "anaia"],  // Basque marks the speaker's sex, not age: anaia is a man's brother, neba a woman's; IDS gives anaia gehien for an older brother.
    cy: ["brawd", "braud"],  // Welsh says brawd hŷn 'older brother' or brawd mawr 'big brother'; there is no separate word.
    hy: ["եղբայր", "jeχˈpɑjɾ"],  // Armenian adds an adjective: avag or mets eghbayr 'elder/big brother', krtser or pokr eghbayr 'younger/little brother'.
    hyw: ["եղբայր", "jɛχˈpʰɑjɾ"],  // Western Armenian likewise says avak or medz yeghpayr 'elder/big brother'.
    uk: ["брат", "brat"],  // Ukrainian says старший брат 'older brother'; there is no separate word.
    nv: ["shínaaí", "ʃínɑ̀ːí"],  // Possessed 'my older brother', like the row's shimá; younger: sitsilí 'my younger brother'.
    haw: ["kaikuaʻana", "kaikuaʔana"],  // Older sibling of the same sex, so a man's older brother; younger: kaikaina; a woman calls any brother kaikunāne.
    mi: ["tuakana", "tuakana"],  // Older sibling of the same sex, so a man's older brother; younger: teina; a woman's brother is tungāne.
    qu: ["wawqi", "ˈwawqi"],  // Quechua marks the speaker's sex (wawqi a man's brother, turi/tura a woman's), and age with kuraq 'elder': kuraq wawqi.
    zh_db: ["哥哥", "kɤ˥ kɤ"],  // 哥 is thought to be a loan from Xianbei *aqa 'elder brother' (Mei 2015); younger: 弟弟.
    zh_sc: ["哥哥", "ko˥ ko˥"],  // Chengdu also says 哥老倌; younger: 弟弟.
    cdo: ["依哥", "i˥˥ ko˥˥"],  // With the same 依 kinship prefix as 依爸 'father'; 哥 is thought to come from Xianbei *aqa 'elder brother'.
    bo: ["ཇོ་ཇོ", "tɕo˥˥tɕo˥˨"],  // Also used to address any man; younger: ནུ་བོ.
    za: ["go", "ko˨˦"],  // go is the word for an elder brother (cf. Chinese 哥); beix covers any older sibling; younger: nuengx.
    swi: ["faai4", "faːi˥˩"],  // Sui 'brothers' is literally 'older-younger' (faai4 nu4); younger: nu4.
    lic: ["ɬau3", "ɬau˩˩"],  // Sounds the same as the Hlai word for 'two' (ɬau3) but has a separate origin (Norquest 2015); younger: ɡuːŋ1.
    orh: ["akɪn", "akɪn"],  // Younger: ɲɪray nəkun; 'brother' in general is akunən.
    jiu: ["a33ʃo33", "a˧˧ʃo˧˧"],  // With the same a- kinship prefix as a33pu33 'father'; younger: ȵo31zɔ33.
    hni: ["algo", "a˥˥ɡo˧˧"],  // With the a- kinship prefix seen in aqda 'father'; younger: aqnil.
    jv: ["kangmas", "kaŋmas"],  // From kakang 'elder brother' + mas, a respectful title; younger: adhi.
    su: ["akang", "akaŋ"],  // From Proto-Malayo-Polynesian *aka 'elder sibling'; familiarly shortened to aa, and also used to address any older man.
    ceb: ["manoy", "ˈmanoj"],  // Also used to address any man older than the speaker; younger: manghod.
    ilo: ["manong", "ˈmanoŋ"],  // From Spanish hermano 'brother'; also a polite address for any older man; younger: ading.
    to: ["taʻokete", "taʔokete"],  // Older sibling of the same sex, so a man's older brother (PN *taqokete); younger: tehina.
    ne: ["दाजु", "daːdzu"],  // Borrowed from Newar dāju 'elder brother'; younger: भाइ.
    mr: ["दादा", "daːdaː"],  // भाऊ is 'brother' in general; younger: लहान भाऊ 'little brother'.
    gu: ["ભાઈ", "bʱaːi"],  // Gujarati says મોટા ભાઈ 'big brother' and નાનો ભાઈ 'little brother'; ભાઈ is also added to men's names as a courtesy.
    dv: ["ބޭބެ", "beːbe"],  // Also used for any older man; younger: ކޮއްކޮ (younger sibling).
    te: ["అన్న", "anːa"],  // From Proto-Dravidian *aṇṇa 'elder brother'; younger: తమ్ముడు.
    kn: ["ಅಣ್ಣ", "aɳːa"],  // From Proto-Dravidian *aṇṇa 'elder brother'; younger: ತಮ್ಮ.
    ml: ["ചേട്ടൻ", "tʃeːʈːan"],  // From Sanskrit jyeṣṭha 'eldest'; younger: അനിയൻ.
    tg: ["ака", "aka"],  // A Turkic loan also used to address men respectfully; the Persian alternative is бародари калонӣ 'big brother'.
    wo: ["mag", "maɡ"],  // mag means 'older sibling' (an older brother is mag ju góor); younger: rakk.
    ha: ["wa", "waː"],  // Hausa also says yaya for an older sibling; younger: ƙane.
    si: ["අයියා", "ajəjaː"],  // Younger: මල්ලි.
    ug: ["ئاكا", "ɑkɑ"],  // From Proto-Turkic *āka 'elder brother'; also a polite address for an older man; younger: ئۇكا.
    kk: ["аға", "ɑʁɑ"],  // From Proto-Turkic *āka; also 'uncle' and 'senior'; younger: іні.
    ky: ["байке", "bɑjˈke"],  // The inherited Turkic ага is also used; younger: ини.
    uz: ["aka", "aka"],  // From Proto-Turkic *āka; also a respectful 'sir' to an older man; younger: uka.
    tk: ["aga", "aːʁa"],  // dogan is 'sibling' of either sex; younger: ini.
    mnc: ["ᠠᡥᡡᠨ", "axʊn"],  // From Proto-Tungusic *akun, like Oroqen akɪn; younger: ᡩᡝᠣ (deo).
    mn_cn: ["ᠠᠬ᠎ᠠ", "ɑχ"],  // Compare the Xianbei word *aqa behind Chinese 哥; younger: дүү (Cyrillic spelling).
    th_s: ["พี่บ่าว", "pʰiː˥˩ baːw˨˩"],  // Literally 'older-sibling man', with Southern Thai บ่าว 'young man'; younger: น้องบ่าว.
    yi: ["ברודער", "ˈbrʊdər"],  // Yiddish says elterer bruder 'older brother'; there is no separate word.
    ca: ["germà", "ʒəɾˈma"],  // From Latin germānus 'of the same parents'; an older brother is germà gran 'big brother'.
    br: ["breur", "brøːr"],  // Breton says breur henañ 'eldest brother' and breur bihan 'little brother'.
    de_at: ["Bruder", "ˈbruːdɐ"],  // Standard German in Austria too: an older brother is der große Bruder 'the big brother'.
    en_au: ["brother", "ˈbɹɐðə"],  // English has no separate word; age is added: big brother, older brother.
    en_nz: ["brother", "ˈbɹɐðə"],  // English has no separate word; age is added: big brother, older brother.
    en_aave: ["brother", "ˈbɹʌɾə"],  // English has no separate word; age is added: big brother, older brother.
    ka: ["ძმა", "dzma"],  // Georgian says უფროსი ძმა 'senior brother'; there is no separate word.
    en_south: ["brother", "ˈbɹʌðɚ"],  // Older and younger brothers are both just brother; big brother or older brother when it matters.
    en_app: ["brother", "ˈbɹʌðɚ"],  // Older and younger brothers are both just brother.
    en_in: ["brother", "ˈbrʌd̪ər"],  // Indian English says brother, often elder brother for an older one.
    en_ie: ["brother", "ˈbɹʊðəɹ"],  // Older and younger brothers are both just brother.
    en_sco: ["brother", "ˈbɹʌðəɹ"],  // Older and younger brothers are both just brother.
    en_yk: ["brother", "ˈbɹʊðə"],  // Older and younger brothers are both just brother.
    en_ck: ["bruvver", "ˈbɹɐvə"],  // Cockney bruvver is brother with th-fronting; an older one is a big bruvver.
    en_scouse: ["brother", "ˈbɹʊðə"],  // Older and younger brothers are both just brother.
    en_geordie: ["brother", "ˈbɹʊðɐ"],  // Older and younger brothers are both just brother.
    en_brum: ["brother", "ˈbɹʊðə"],  // Older and younger brothers are both just brother.
    en_manc: ["brother", "ˈbɹʊðɐ"],  // Older and younger brothers are both just brother.
    en_wc: ["brother", "ˈbɹʌðɚ"],  // Older and younger brothers are both just brother.
    en_est: ["brother", "ˈbɹʌðə"],  // Older and younger brothers are both just brother.
    be: ["брат", "brat"],  // Belarusian has no separate word; an older brother is старэйшы or старшы брат.
    cs: ["bratr", "ˈbratr̩"],  // Czech has no separate word: an older brother is starší bratr, a younger one mladší bratr.
    sk: ["brat", "brat"],  // Slovak has no separate word; an older brother is starší brat.
    sl: ["brat", "brat"],  // Slovene has no separate word: starejši brat is an older brother, mlajši brat a younger one.
    bg: ["батко", "ˈbatko"],  // Bulgarian батко, addressed as бате, is an older brother only; younger: по-малък брат, 'smaller brother'.
    mk: ["батко", "ˈbatkɔ"],  // Macedonian батко means an older brother, beside постар брат; younger: помал брат.
    lt: ["brolis", "ˈbroːlʲɪs"],  // Lithuanian has no separate word: an older brother is vyresnis brolis, a younger one jaunesnis brolis.
    lv: ["brālis", "ˈbraːlis"],  // Latvian has no separate word: vecākais brālis is the older brother, jaunākais brālis the younger.
    et: ["vend", "ʋend"],  // Estonian has no separate word: vanem vend is an older brother, noorem vend a younger one.
    se: ["viellja", "ˈvieʎːa"],  // Northern Sámi has no separate word: an older brother is vahnen viellja or stuoraviellja, 'big brother'.
    sjd: ["вӣлльй", "viːʎːj"],  // Kildin Sámi says puarsa вӣлльй, 'older brother', and nūra вӣлльй, 'younger brother' (WOLD).
    jam: ["breda", "brɛda"],  // Patwa breda (also spelt bredda) comes from English brother; an older one is a big breda, a younger one a likkle breda.
    tpi: ["brata", "brata"],  // Tok Pisin brata, from English brother, also means a woman's sister; an older brother is a bikpela brata, 'big brother'.
    yrl: ["mú", "mu"],  // Nheengatu dropped Old Tupi's older and younger brother words: a man's brother is mú, a woman's brother kiwira.
    as: ["ককাই", "kɔkai"],  // Assamese ককাই is an elder brother, borrowed from Ahom; younger: ভাই.
    rom: ["phral", "pʰral"],  // Romani phral, from Sanskrit bhrātṛ, is any brother; an older one is phureder phral, 'older brother', a younger one terneder phral.
    fr_qc: ["frère", "fʁɛːʁ"],  // Older and younger brothers are both frère: grand frère or frère aîné for the older.
    fr_af: ["frère", "fʁɛʁ"],  // Older and younger brothers are both frère; an older one is a grand frère.
    fr_be: ["frère", "fʁɛʁ"],  // Older and younger brothers are both frère: grand frère or frère aîné for the older.
    fr_ch: ["frère", "fʁɛʁ"],  // Older and younger brothers are both frère: grand frère or frère aîné for the older.
    es_co: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano: hermano mayor and hermano menor.
    es_ar: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano: hermano mayor and hermano menor.
    es_cu: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano: hermano mayor and hermano menor.
    es_pe: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano: hermano mayor and hermano menor.
    es_an: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano: hermano mayor and hermano menor.
    nn: ["bror", "bruːr"],  // An older brother in Nynorsk is storebror, simply 'big brother'.
    la: ["frāter", "ˈfraːter"],  // Latin frāter was any brother; an older one was frāter māior, 'the greater brother'.
    ang: ["brōþor", "ˈbroːθor"],  // Old English said ielder brōþor, 'elder brother', and geonger brōþor (IDS); there was no separate word.
    en_em: ["brother", "ˈbrʊðər"],  // Brother covered older and younger brothers alike; age was added with an adjective.
    arc: ["ܐܚܐ", "ʔaħaː"],  // Aramaic said ʾaḥā rabbā, 'big brother', and ʾaḥā zʿērā, 'small brother'; there was no separate word.
    ja_kanbun: ["兄", "ani"],  // In kanbun reading 兄 is read あに, the elder brother, as against 弟 おとうと, the younger.
    vi_nom: ["英", "aɲ˧"],  // Vietnamese anh, written 英 in Nôm, is an elder brother; a younger one is em trai, 'male younger sibling'.
    ce: ["ваша", "u̯aʃa"],  // Chechen has no separate word: an older brother is воккхаха волу ваша, 'the brother who is bigger'.
    inh: ["воша", "voʃa"],  // Ingush has no separate word: an older brother is воакхагIавола воша, 'the brother who is bigger' (IDS).
    av: ["вац", "wats"],  // Avar has no separate word: кІудияв вац is the big brother, гьитІинав вац the little one (IDS).
    lez: ["стха", "stχa"],  // Lezgian has no separate word: чІехи стха is the big brother, гъвечІи стха the small one (IDS).
    eo: ["frato", "ˈfrato"],  // Esperanto has no separate word: an older brother is a pli aĝa frato, 'older brother'.
    yua: ["sukuʼun", "sukuʔun"],  // Yucatec Maya sukuʼun is an older brother; younger: íitsʼin, a younger sibling of either sex.
    tzo: ["bankilal", "ɓankilal"],  // Tzotzil bankilal is a man's older brother, and the word also covers elders and officials; younger: itsʼinal.
    kl: ["angajoq", "aŋajoq"],  // A man's older brother is his angajoq, an elder same-sex sibling; a woman's is her ani; younger: nukaq.
    oj: ["nisayenh", "nisajẽ"],  // Ojibwe nisayenh is 'my older brother'; the word is always possessed; younger: nishiime, 'my younger sibling'.
    arn: ["peñi", "peɲi"],  // A man's brother is peñi and a woman's lamngen; an older brother is wünen peñi, a younger one inan peñi.
    dar: ["узи", "uzi"],  // Dargwa has no separate word: an older brother is халал узи 'big brother', a younger one виштІал узи.
    lbe: ["уссу", "usːu"],  // Lak says хъунама уссу 'big brother' for an older brother; there is no separate word.
    aqc: ["ушду", "uʃdu"],  // An older brother is доІзу ушду 'big brother', a younger one тІитту ушду 'little brother' (WOLD).
    kum: ["агъа", "aʁa"],  // From Proto-Turkic *āka 'elder brother', like Turkish ağa; younger: ини.
    os: ["ӕфсымӕр", "æfsɨmær"],  // An older brother is хистӕр ӕфсымӕр 'elder brother'; there is no separate word (IDS).
    ady: ["шы", "ʃə"],  // Older and younger brothers are both шы.
    tet: ["maun", "maun"],  // Maun boot, 'big older brother', was an affectionate name for Xanana Gusmão.
    ban: ["beli", "bəli"],  // Beli is also used for a husband, boyfriend or any close older man; younger: adi (younger sibling).
    min: ["uda", "uda"],  // Uda is the common form; regions also say udo, ajo, uwan; younger: adiak.
    bik: ["manoy", "ˈmanoj"],  // Clipped from Spanish hermano 'brother'; an older sister is manay, and a sibling in general is tugang.
    pjt: ["kuṯa", "kuʈa"],  // Kuṯa is specifically an older brother (an older sister is kangkuṟu); younger: malany.
    kky: ["yaba", "jaba"],  // Goes back to a Proto-Paman word for 'older sister'; younger: garga.
    aer: ["kake", "kakə"],  // Kake means specifically 'elder brother'.
    lus: ["u", "u"],  // Mizo u means any older sibling, inherited from Proto-Kuki-Chin *ʔuu; younger: nau.
    ee: ["fo", "fò"],  // Ewe fo is an older brother or older male cousin; younger: tsɛ; a brother in general is nɔviŋutsu.
    nan_te: ["阿兄", "a˧˧ hĩã˧˧"],  // Teochew uses 兄, the classical word for an elder brother, where Mandarin says 哥哥.
    yue_ts: ["阿哥", "ʔa˧˧ kuɔ˥˥"],  // 阿哥 is said to the brother's face; talking about him, Taishanese often says 大佬 'big guy'.
    zh_jh: ["哥哥", "ko˧˩ ko˧˩"],  // As in standard Mandarin, 哥哥 'elder brother' contrasts with 弟弟 'younger brother'.
    zh_lz: ["哥哥", "kɤ˧˩ kɤ˧˩"],  // As in standard Mandarin, 哥哥 'elder brother' contrasts with 弟弟 'younger brother'.
    dng: ["гәгә", "kə˨˦kə"],  // Dungan гәгә is Mandarin 哥哥 'elder brother' written in Cyrillic.
    kpv: ["вок", "vok"],  // Komi has no separate word: an older brother is ыджыд вок 'big brother' (IDS).
    udm: ["агай", "aɡaj"],  // A Turkic loan (compare Tatar агай), also meaning 'uncle'; younger: вын.
    mhr: ["иза", "iza"],  // Inherited from Proto-Uralic *ićä; also used for a father's younger brother; younger: шольо.
    mrj: ["ӹзӓ", "ɯzæ"],  // Cognate with Meadow Mari иза, from Proto-Uralic *ićä; younger: шоля.
    myv: ["леля", "lʲelʲa"],  // Леля is an elder brother (also 'uncle'); younger: ялакс.
    mdf: ["альняка", "ˈalʲnʲakə"],  // Moksha альняка means specifically an elder brother; the general words for brother are пяльне and дуган (NorthEuraLex).
    dsb: ["bratš", "bratʃ"],  // Lower Sorbian has no separate word: an older brother is staršy bratš, a younger one młodšy bratš (WOLD).
    crh: ["ağa", "aˈʁa"],  // From Proto-Turkic *āka, also 'uncle'; the northern dialect says aqa; younger: qardaş.
    tt: ["абый", "ɑˈbɯj"],  // Абый is an older brother, also used to address older men; younger: эне.
    ba: ["ағай", "aʁaj"],  // From Proto-Turkic *āka, also any older male relative; younger: ҡусты or эне.
    mns: ["ка̄ӈк", "kaːŋk"],  // Mansi has separate words by age; younger: а̄пси.
    zh_wh: ["哥哥", "ko˥˥ ko"],  // Wuhan says 哥哥 for an older brother; younger: 弟弟.
    zh_km: ["哥哥", "ko˦˦ ko"],  // Kunming says 哥哥 for an older brother; younger: 弟弟.
    zh_nj: ["哥哥", "ko˧˩ ko"],  // Nanjing says 哥哥 for an older brother; younger: 弟弟.
    zh_hf: ["哥哥", "ku˨˩˨ ku"],  // Hefei says 哥哥 for an older brother; younger: 弟弟.
    zh_jn: ["哥哥", "kə˨˩˧ kə"],  // Jinan says 哥哥 for an older brother; younger: 弟弟.
    zh_cd: ["哥哥", "ko˥˥ ko"],  // Chengdu also says 哥 or 哥老倌; younger: 弟弟.
    zh_xa: ["哥", "kɤ˨˩"],  // Xi'an says plain 哥 where Standard Mandarin says 哥哥; younger: 兄弟 or 弟.
    hak_tw: ["阿哥", "a˨˦ ko˨˦"],  // Hakka 阿哥 is an older brother, built like this row's 阿爸 'dad'.
    hak_hl: ["阿哥", "a˧˧ ko˥˧"],  // Hailu Hakka 阿哥 is an older brother, built like this row's 阿爸 'dad'.
    nan_qz: ["阿兄", "a˥˥˦ hiã˧˧"],  // Hokkien 兄 hiaⁿ is the old Chinese word for an older brother, kept where Mandarin switched to 哥.
    nan_hai: ["兄", "hia˨˧"],  // Hainanese says 兄 when talking about an older brother and 阿兄 or 阿哥 when addressing him.
    wuu_hz: ["阿哥", "ʔaʔ˥ koᵘ˧˧"],  // Hangzhou says 阿哥 or 哥哥 for an older brother.
    wuu_sz: ["阿哥", "aʔ˥ kəu˦˦"],  // Suzhou says 阿哥 for an older brother.
    wuu_nb: ["阿哥", "ɐʔ˥˥ kəu˥˧"],  // Ningbo says 阿哥 or 哥哥 for an older brother, with the same 阿 prefix as 阿爸 'dad'.
    wuu_jh: ["哥", "kuɤ˧˧˦"],  // Jinhua says 哥 when talking about an older brother and 哥哥 when addressing him.
    yue_zs: ["大佬", "tai˧˧ lou˨˩˧"],  // Zhongshan says 大佬 'big fellow' when talking about an older brother and 阿哥 when addressing him.
    yue_nn: ["阿哥", "a˧˧ kɔ˥˥"],  // Nanning also says 哥哥 or 大佬 for an older brother.
    xct: ["ཕུ་བོ", "pʰubo"],  // ཕུ་བོ phu bo is an older brother and ནུ་བོ nu bo a younger one; the literary language also has གཅེན་པོ gcen po. Younger: nu bo.
    xct_litpr: ["ཕུ་བོ", "pʰuwo"],  // Read aloud today as phu-wo; younger: ནུ་བོ nu bo.
    kaw: ["ꦏꦏ", "kaka"],  // Old Javanese kaka is an older sibling, from Austronesian *kaka; younger: ari.
    gmh: ["bruoder", "ˈbruə̯dər"],  // Middle High German had no separate word: an older brother was an elterer bruoder.
    de_lut: ["Bruder", "ˈbruːdər"],  // German before and after Luther used no separate word: an older brother is an älterer Bruder.
    es_sgl: ["hermano", "eɾˈmano"],  // Spanish has no separate word: an older brother is a hermano mayor; hermano itself replaced Old Spanish fradre.
    kek: ["as", "as"],  // Q'eqchi' as is an older brother (asb'ej when unpossessed); younger: iitz'in.
    pam: ["koya", "ˈkoja"],  // Borrowed from Hokkien, like Tagalog kuya; younger: wali.
    dtp: ["tabang", "tabaŋ"],  // Dusun tabang is an older brother, addressed as abang; younger: tadi kusai.
    khb: ["ᦗᦲᧈᦋᦻ", "piː˧ tsaːj˥˩"],  // Literally 'older sibling, male', like Thai พี่ชาย; younger: nɔng chaai.
    kac: ["hpu", "pʰu˧˩"],  // Jingpho hpu is an older brother and nau a younger sibling; younger: nau.
    mkz: ["kaka", "ˈkaka"],  // Makasae kaka is an older brother; younger: noko.
    wrh: ["gaagang", "ˈɡaːɡaŋ"],  // Recorded as kagang/gagang in the 19th century; younger: galamaany.
    djr: ["wäwa", "waːwa"],  // Yolŋu wäwa is an older brother; younger: yukuyuku.
    tsj: ["ata", "ata"],  // Tshangla ata is an older brother, also said of parallel cousins; younger: kota.
    ko_jl: ["성", "səŋ"],  // Jeolla 성 is standard 형 'a man's older brother' without the h; younger: 동생.
    ani: ["воцци", "wotsːi"],  // Andi has no separate word: an older brother is a 'big' воцци, a younger one a 'small' воцци.
    rut: ["шу", "ʃu"],  // Rutul has no separate word: an older brother is a кьухьды шу, 'big brother'.
    khv: ["эс", "es"],  // Khwarshi has no separate word: an older brother is an укъуса эс, 'big brother'.
    th_isan: ["อ้าย", "ʔaːj˧˩"],  // Isan อ้าย is an older brother (เอื้อย an older sister); younger: น้อง.
    xh: ["umkhuluwa", "umkʰuluːwa"],  // Xhosa umkhuluwa is an elder brother; younger: umninawa.
    ff: ["mawniraaɗo", "mawniraːɗo"],  // Fula mawniraaɗo, from maw- 'big', is an elder sibling of either sex; younger: miñiraaɗo.
    ln: ["yayá", "jajá"],  // Lingala yayá is an older sibling of either sex (yaya ya mobali for a brother); younger: léki.
    am: ["ወንድም", "wəndɨmː"],  // Amharic has no separate word: an older brother is a ታላቅ ወንድም, 'elder brother'.
    fa: ["برادر", "bæɾɒːˈdæɾ"],  // Standard Persian says برادر بزرگ 'big brother'; کاکا survives for an older brother only in southern dialects such as Shiraz.
    cjy: ["哥哥", "kɤ˩ kɤ"],  // Taiyuan says 哥哥 or 哥 for an older brother.
    hsn: ["哥哥", "ko˧˧ ko"],  // Changsha says 哥哥 or 老兄 for an older brother.
    gan: ["兄", "ɕiaŋ˦˨"],  // Nanchang refers to an older brother as 兄, in a colloquial reading distinct from the 兄 of 兄弟, and addresses him as 哥哥.
    mnp: ["哥仔", "kɔ˥˦ tsiɛ˨˩"],  // Jian'ou says 哥仔, with the noun suffix 仔, or 哥哥 for an older brother.
    cnp: ["阿哥", "a˥˥ ko˥˧"],  // Nanning Pinghua says 阿哥 for an older brother, with the same 阿 prefix as 阿爸.
    sn: ["mukoma", "mukoma"],  // Shona mukoma is an elder brother (an elder sister to a woman); younger: munin'ina.
    rn: ["mukuru", "mukuɾu"],  // Kirundi mukuru, from -kuru 'senior', is a boy's older brother or a girl's older sister; younger: murumuna.
    rw: ["mukuru", "mukuɾu"],  // Kinyarwanda mukuru is an older sibling of the same sex, so a man's older brother; younger: murumuna.
    st: ["abuti", "abuti"],  // Sesotho abuti comes from Afrikaans ou boet 'old brother'; the older native word moholwane once meant any older sibling; younger: moena.
    gn: ["tykeʼýra", "tɨkeˈʔɨɾa"],  // A man calls his older brother tykeʼýra (che rykeʼy 'my older brother') and his younger one tyvýra; a woman calls any brother kyvy.
    af: ["broer", "brur"],  // Afrikaans has no separate word: an older brother is an ouboet, 'old brother'.
    bm: ["kɔrɔkɛ", "kɔrɔkɛ"],  // Bambara kɔrɔkɛ is kɔrɔ 'elder sibling' plus kɛ 'male'; younger: dɔgɔkɛ.
    hmn: ["tij", "ti˥˨"],  // Hmong has separate words by age: tij (also tij laug) is an older brother; younger: kwv.
    mak: ["kaka", "ˈkaka"],  // Makassarese kaka is an older sibling, brother or sister; younger: andiʼ.
    bbc: ["haha", "haha"],  // Toba Batak haha is an elder sibling of the same sex, so a man's older brother; younger: anggi; a sister calls her brother iboto.
    ace: ["abang", "abaŋ"],  // Acehnese abang (also aduen) is an older brother, related to Malay abang; younger: adoe.
    sc: ["frade", "ˈfrade"],  // Sardinian frade is any brother; older or younger is not lexically marked.
    bs: ["brat", "brat"],  // Bosnian brat covers older and younger brothers alike; stariji brat 'older brother' when it matters.
    mrw: ["kaka", "kaka"],  // Maranao kaka is an older sibling, brother or sister; younger: ari.
    bxk: ["omukhulu", "omuxulu"],  // Lubukusu omukhulu is an older sibling, from -khulu 'big, old'; younger: omuro.
    ve: ["mukomana", "mukomana"],  // Tshivenḓa mukomana is an older sibling of the same sex; younger: murathu.
    yao: ["achimwene", "atʃimwene"],  // Chiyao achimwene is a man's older brother, with the honorific a- prefix seen in atati; a girl says alumbwangu; younger: mpwanga.
    bem: ["mukalamba", "mukalamba"],  // Bemba mukalamba is an older sibling; younger: mwaice; the plain word for a man's brother is munyinane.
    tsg: ["magulang", "maɡulaŋ"],  // Tausug magulang is an older sibling (magulang usug, an older brother), while kakaꞌ is the way to address one; younger: manghud.
    myx: ["yaaya", "jaːja"],  // Lumasaaba says yaaya umukhulu, 'big brother', for an older brother; yaaya is a man's brother, and a woman calls her brother wandaya.
    cpx: ["阿兄", "a˥˧˧ hia˥˧˧"],  // Pu-Xian says 阿兄, the old Min word 兄 'elder brother' with the prefix 阿; younger: 弟.
    ay: ["jila", "xila"],  // Aymara has no separate word: an older brother is a jiliri jila, literally 'elder brother', and a younger one a sullkiri jila.
    tyz: ["có", "kɔ˧˥"],  // Tày có is an older brother (có ché, 'older siblings'); younger: noọng.
    pcc: ["bix", "pi˧˩"],  // Bouyei bix is an older sibling of either sex, cognate with Thai phi; younger: nuangx.
    mnw: ["ကော", "kao"],  // Mon ကော, an elder brother, is borrowed from Burmese ကို; the matching younger-sibling term was not checked.
    ksw: ["ဝဲၢ်", "wɛ"],  // S'gaw Karen ဝဲၢ် is an older sibling, made specific for a brother with a word for 'male'; younger: ပုၢ်.
    cv: ["пичче", "pittɕe"],  // Chuvash пичче is an older brother, also a father's younger brother; younger: шӑллӑм; the plain word for brother is ар тӑван.
    grt: ["ada", "ada"],  // Garo ada is an elder brother, adagipa in formal speech; younger: jong.
    bjn: ["kaka", "kaka"],  // Banjar kaka is an older sibling, brother or sister, like Indonesian kakak; younger: ading.
    mnk: ["kotoo", "kotoː"],  // Mandinka kotoo, from koto 'old', is an older sibling, and kotookee spells out an older brother; younger: dóo (dóokee 'little brother').
    dnj: ["dhòo", "ɗòː"],  // Eastern Dan dhòo is an older brother, including older male cousins; an initiated older brother is addressed dʌ̄ zőo; younger: zláȁ.
    dag: ["biɛli", "biɛli"],  // Dagbani biɛli is an older sibling; younger: tizo; mabia is a brother of any age.
    quc: ["atz achi", "ats atʃi"],  // Kʼicheʼ atz achi pairs atz, an older sibling, with achi 'man'; younger: chaqʼ ala; achalal is a man's brother in general.
    bts: ["abang", "abaŋ"],  // Simalungun abang is an elder brother, the same word as Malay abang; younger: anggi.
    quz: ["wayqi", "wajqi"],  // Quechua marks the speaker's sex, not age: a man's brother is wayqi and a woman's is tura, and an older one is a kuraq wayqi.
    ami: ["kaka", "kaka"],  // Kaka means an older sibling of either sex, from Proto-Malayo-Polynesian *kaka; a younger sibling is safa.
    is: ["bróðir", "ˈprouːðɪr"],  // Icelandic uses bróðir for older and younger brothers alike; an older one is eldri or stóri bróðir.
    wa: ["fré", "fʁe"],  // Walloon fré, from Latin frater, covers older and younger brothers alike.
    tzh: ["bankil", "bankil"],  // Bankil is a man's older brother (in northern dialects anyone's); some dialects use xi'lel for a woman's older brother, and a younger brother is ihts'inal.
    loz: ["muhulwani", "muhulwani"],  // Muhulwani is an older sibling of the same sex; a younger one is munyani, and a sibling of the opposite sex is kaizeli.
    kqn: ["koloja", "kolodʒa"],  // Koloja is an older sibling; a younger one is nkasa.
    lue: ["yaya", "jaja"],  // Yaya is an older sibling; a younger one is mwanyike (mwanyikami 'my younger sibling').
    her: ["erumbi", "erumbi"],  // Erumbi is an older sibling; a younger one is omuangu.
    ote: ["jwädä", "xʷãdã"],  // An older brother is dätä jwädä, 'big brother'; ida̲ is a woman's brother.
    quy: ["wawqi", "ˈwawχi"],  // Wawqi is a man's brother of any age; the Bible says mayor wawqi, with Spanish mayor 'older', for an older brother.
    nij: ["kaka", "kaka"],  // Kaka is an older sibling; a younger one is andi.
    new: ["दाजु", "daːdʒu"],  // Dāju is an older brother; a younger brother is kijā (किजा).
    akb: ["angkang", "aŋkaŋ"],  // Angkang is an older sibling of the same sex; a younger one is anggi.
    sda: ["kaka", "kaka"],  // Kaka is an older sibling; a younger one is adiʼ.
    aoz: ["tataf", "tataf"],  // Tataf is a man's older brother (or a woman's older sister); a younger one is olif, and a woman's brother is nauf.
    hwc: ["braddah", "brɑdə"],  // Pidgin says older braddah for an older brother; braddah also means a male friend.
    aii: ["ܐܲܚܘܿܢܵܐ", "aˈxona"],  // An older brother is akhona gura, 'big brother'; there is no separate word.
    mt: ["ħu", "ħuː"],  // Maltese says ħuh il-kbir, 'his big brother', for an older brother; there is no separate word.
    sm: ["uso", "uso"],  // Uso is a man's brother (or a woman's sister) of any age; an older one is uso matua, and a woman's brother is tuagane.
    mam: ["tzik", "tsik"],  // -tzik is an older brother; a younger one is -itzʼin.
    cak: ["nimalaxel", "nimalaʃel"],  // Nimalaxel is an older sibling (unpossessed form of -nimal); a younger one is chaq'alaxel.
    gej: ["fòfo", "fòfo"],  // Fofo is an older brother; nɔvi is a sibling in general.
    lol: ["botomolo", "botomolo"],  // Botomolo is an older sibling; a younger one is bokune.
    ebu: ["mûrwang'ina", "moɾwaŋina"],  // Literally 'child of his mother'; an older brother is a mûrwang'ina ûrîa mûkûrû, 'brother who is older'.
    ses: ["beere", "beːre"],  // Beere is an older sibling, with aru 'man' added for a brother; arma is 'brother' in general.
    fj: ["tuaka", "tuaka"],  // Tuaka (tuakana 'his elder sibling') is an older sibling of the same sex; a younger one is taci, and a woman's brother is gane.
    pis: ["brata", "brata"],  // Pijin uses brata for any brother; the eldest is the fasbon brata, 'first-born brother'.
    pap: ["ruman", "ruman"],  // Ruman is a sibling of either sex; an older brother is a ruman mayó, and ruman hòmber specifies a brother.
    pdc: ["Bruder", "bruːdər"],  // Pennsylvania German adds an adjective for age, as in eldshtah Bruder, 'eldest brother'.
    bxr: ["аха", "axa"],  // Аха is an older brother, also a respectful word for any older man; a younger sibling is дүү.
    naq: ["ǃgâsab", "ǃɡãːsab"],  // An older brother is kai ǃgâsab, 'big brother'; there is no separate word.
    bdq: ["ʼnhŏng", "ʔɲoŋ"],  // ʼNhŏng is an older sibling, with kơdră 'male' added for a brother; a younger sibling is oh.
    ctu: ["ʌscun", "ɨskun"],  // -ʌscun is an older brother; a younger one is -ijtsʼin.
    ty: ["tuaʻana", "tuaʔana"],  // Same-sex older sibling (a man's older brother, a woman's older sister), from Proto-Polynesian *tuakana; younger: teina.
    rar: ["tuakana", "tuakana"],  // Same-sex older sibling, from Proto-Polynesian *tuakana; younger: teina; a woman calls her brother tungāne.
    niu: ["taokete", "taokete"],  // A man's older brother or a woman's older sister; younger: tehina; a woman calls any brother tugaane.
    tvl: ["taina", "taina"],  // Taina is any same-sex sibling; an older one is taina matuaatu, a younger one taina foolikiifoo.
    cr: ["ᓂᐢᑌᐢ", "nisteːs"],  // 'My older brother' (also an older male parallel cousin); a younger sibling is nisîmis.
    meu: ["kakana", "kakana"],  // 'His older brother' (a man's older brother or a woman's older sister), possessed like tamana 'his father'; younger: tadina.
    pwn: ["kaka", "kaka"],  // Kaka covers any sibling or cousin regardless of age or sex; relative age shows only in possessed reference forms (ti-kaka 'my older siblings', ku-kaka 'my younger siblings').
    mh: ["jein", "tʲejin"],  // 'His/her older sibling' — the word covers an older brother or sister; a younger sibling is jati- (jatū 'my younger sibling').
    pau: ["obekuk", "obɛkuk"],  // 'My older brother', said by a man (possessed like demak 'my father'); a younger brother is ochell-.
    ch: ["cheʼlu", "ˈtʃeʔlu"],  // Che'lu means any sibling, brother or sister, with no separate word for an older one.
    bnn: ["masituhas", "masituhas"],  // 'Older sibling' (brother or sister), from Proto-Austronesian *tuqaS 'old'; younger: masinauba.
    tab: ["гъардаш", "ʁardaʃ"],  // Plain 'brother'; an older brother is аьхю гъардаш 'big brother' and a younger one бицӏи гъардаш 'little brother'.
    tkr: ["чодж", "tʃodʒ"],  // Plain 'brother'; older and younger are херна чодж and кӏылна чодж, brother with an adjective.
    nog: ["ага", "aɡa"],  // Older brother, as in Kazakh аға; a younger brother is ини, and кардаш is 'brother' in general.
    shp: ["jochi", "hotʃi"],  // Older brother; a younger brother is chio.
    crs: ["frer", "frɛr"],  // Plain 'brother' from French frère; older and younger are gran frer and pti frer.
    kmh: ["mam", "mam"],  // Plain 'brother/sibling'; an older one is mam nd and a younger one mam ksen.
    gil: ["tari", "taɾi"],  // Same-sex sibling with no age distinction; older and younger are marked with te karimoa 'the first-born' and te karimwi 'the last-born'.
    esu: ["anngaq", "anŋaq"],  // Older brother, from Proto-Yupik *anəŋaʀ; a younger sibling is kinguqliq.
    xal: ["ах", "ax"],  // Older brother, as Mongolian ах; a younger brother or sibling is дү.
    cnh: ["u", "u"],  // Older same-sex sibling; a younger one is nau (naupa 'younger brother').
    lbj: ["ཨ་ཅོ", "atɕo"],  // Older brother (acho); a younger brother is ནོ (no).
    nzm: ["misipeu", "misipeu"],  // Older brother, with the mi- prefix of mipeu 'father'; younger: mikinapeu.
    xkz: ["aci", "atɕi"],  // Elder brother; a younger brother is no.
    gay: ["abang", "abaŋ"],  // Older brother, cognate with Malay abang; younger siblings have a separate term.
    hui: ["hamene", "hamene"],  // Plain 'brother'; an elder one is hamene wahene, literally 'big brother'.
    bru: ["ai", "ʔaːj"],  // Older brother; a younger sibling is a-ễm.
    ho: ["kakana", "kakana"],  // Older brother, from Motu kakana; a younger brother is tadina.
    cuk: ["ia", "ia"],  // A man's older brother; a younger sibling is urba.
    agr: ["yatsu", "jatsu"],  // A man's brother, older or younger; the eldest is yatsu emkau 'first brother'.
    trv: ["qbsuran", "qbsuɾan"],  // Older sibling (brother or sister); a younger one is swai (mtswai).
    tru: ["ܐܚܘܢܐ", "aħuno"],  // Plain 'brother'; the Turoyo Bible uses it for both Esau and the prodigal son, adding 'big' or 'little' only to sons.
    tay: ["qbsuyan", "qbsujan"],  // Older sibling (brother or sister; mlikuy 'male' specifies a brother); a younger sibling is sswe'.
    kjh: ["аха", "axa"],  // Older brother in literary Khakas (Kyzyl dialect ажа), paired with пиче 'older sister'.
    sbp: ["umuvaha", "umuvaha"],  // Older sibling (with the u- prefix of udaada 'father'); a younger sibling is umunangʼana.
    djk: ["baala", "baːla"],  // Plain 'brother', from English brother; a younger one is pikin baala 'little brother'.
    mxv: ["ñani", "ɲani"],  // A man's brother, older or younger alike, as in other Mixtec varieties.
    iu: ["ᐊᖓᔪᒃ", "aŋajuk"],  // Older sibling of the same sex (a man's older brother); a younger one is nukaq; a woman calls her brother ani.
    gd: ["bràthair", "ˈpɾaːhəɾʲ"],  // Plain 'brother'; the Gaelic Bible calls Esau simply do bhràthair 'your brother' and marks age only on sons (a mac a bu shine 'her elder son').
    emp: ["djaba", "ʒaˈba"],  // Plain 'brother'; an older one is djaba nabema 'first brother' and a younger one djaba tẽãbema.
    mrq: ["tuakana", "tuakana"],  // A man's older brother or a woman's older sister, from Proto-Polynesian *tuakana (tuaʻana in the south); younger: teina; a woman calls her brother tunane.
    ko_jeju: ["성", "səŋ"],  // From Sino-Korean 兄, used by a man for an older brother (honorific 성님); younger: 아시; a woman calls her brother 오라방.
    mic: ["nsis", "nsis"],  // Literally 'my older brother' (his or her older brother is ugsisl); a younger brother is njignam.
    tsu: ["ohaeva", "ohaeva"],  // Ohaeva is an older sibling of either sex, specified as male or female with a following word; a younger sibling is ohaesa.
    moh: ["rakhtsì:ʼa", "rakʰtsìːʔa"],  // Literally 'my older brother', built on an older-sibling stem; a younger sibling is named with a different stem.
    wbp: ["papardi", "papaɽi"],  // An older brother is papardi and a younger one kukurnu.
    tao: ["kaka", "kaka"],  // Kaka is an older sibling of either sex, from Proto-Malayo-Polynesian *kaka; a younger sibling is wari.
    pyu: ["baelri", "baəli"],  // Baelri is any older sibling, made male as baelri na mainayan; a younger sibling is wadi, and an older brother is addressed as eba.
    lkt: ["čhiyé", "tʃʰijé"],  // A man's older brother; a woman calls hers thibló, and a younger brother is misúŋ.
    chy: ["naʼneha", "naʔneha"],  // Literally 'my older brother', used both to refer to him and to address him; a younger sibling is násemáhe, and a woman's brother in general is nȧhtatanéme.
    tkl: ["taina", "taina"],  // Taina is a same-sex sibling of any age; a woman calls her brother tuagāne.
    stq: ["Brúur", "bruːr"],  // Saterland Frisian uses Brúur for an older or a younger brother alike.
    kw: ["broder", "ˈbrɔdər"],  // Cornish uses broder for an older or a younger brother alike.
    szy: ["kaka", "kaka"],  // Kaka is an older sibling of either sex, as in neighbouring Amis; a younger sibling is saba.
    sma: ["vïelle", "ˈvɨɛlːɛ"],  // An older brother is a stoere-vïelle, 'big brother'; vïelle itself is any brother.
    dak: ["čiŋyé", "tʃĩjé"],  // A man's older brother; a woman calls hers timdó, and a younger brother is a separate word, misuŋka.
    yux: ["чаачаа", "tʃaːtʃaː"],  // Also used for a parent's elder brother; a younger sibling is эмдьэ.
    es_cr: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano: hermano mayor and hermano menor.
    es_hn: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano: hermano mayor and hermano menor.
    es_ni: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano: hermano mayor and hermano menor.
    es_sv: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano: hermano mayor and hermano menor.
    ar_jo: ["أخو", "ˈʔaxu"],  // Levantine Arabic has no separate older-brother word; age is added with an adjective.
    ar_ps: ["أخو", "ˈʔaxu"],  // Levantine Arabic has no separate older-brother word; age is added with an adjective.
    fr_lu: ["frère", "fʁɛʁ"],  // Older and younger brothers are both frère: grand frère or frère aîné for the older.
    fr_cm: ["frère", "fʁɛʁ"],  // Older and younger brothers are both frère; an older one is a grand frère.
    de_lu: ["Bruder", "ˈbruːdɐ"],  // German has no separate older-brother word: großer Bruder, 'big brother', or älterer Bruder.
    en_ng2: ["brother", "ˈbɹʌðə"],  // Older and younger brothers are both just brother, with an adjective added for age.
    pt_mo: ["irmão", "iɾˈmɐ̃w̃"],  // An older brother is an irmão mais velho.
    hsn_hy: ["老兄", "lau˧˧ ɕian˦˦˥"],  // Hengyang refers to an older brother as 老兄, using the colloquial reading of 兄, and addresses him as 哥哥.
    win: ["hinį", "hinĩ"],  // A man's older brother (hinįra with the article); a woman's is hicito, and a younger brother is hisų́k.
    cro: ["iiká", "iːká"],  // A man's older brother; a woman's is isaalí, and a younger brother is ichuuká.
    es_bo: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano; Andean ñaño, from Quechua, is a fond word for any brother.
    es_py: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano: hermano mayor and hermano menor.
    es_pa: ["hermano", "eɾˈmano"],  // Older and younger brothers are both hermano: hermano mayor and hermano menor.
    nan_zz: ["阿兄", "a˦˦ hiã˦˦"],  // A-hiaⁿ, with the familiar prefix a-, is the Zhangzhou word for an older brother; a younger brother is 小弟 sió-tī.
    osa: ["ižį́ðe", "iʒĩ́ðe"],  // Ižį́ðe is 'his older brother', a man's term; Morgan 1871 records a different term for a woman's older brother and we-son'-kä for a younger brother.
    bew: ["abang", "ˈabaŋ"],  // Abang is an older brother and a polite way to address any older young man, shortened to bang when calling someone.
    ltg: ["bruoļs", "bruɔ̯lʲs"],  // Latgalian bruoļs, a cognate of Latvian brālis, covers older and younger brothers alike.
    io: ["fratulo", "fraˈtulo"],  // Ido fratulo is frato 'sibling' plus the masculine suffix -ulo, and is used for any brother, older or younger.
    hif: ["bhaiya", "bʱəijaː"],  // Fiji Hindi bhaiya is used for younger and older brothers alike; an older one is baṛa bhaiya 'big brother'.
    fud: ["taʻokete", "taʔokete"],  // Taʻokete is an older same-sex sibling, from Proto-Polynesian *taqokete; a younger one is taina.
    lun: ["yaya", "jaja"],  // Yaya is an older sibling of either sex; a younger one is mwanyikami.
    pmt: ["tuakana", "tuakana"],  // Tuakana is a man's older brother or a woman's older sister, from Proto-Polynesian *tuakana; a younger one is teina.
    ake: ["rui", "rui"],  // Rui is a man's older brother (irui 'his older brother'); a younger brother is yakon.
    gun: ["tykeʼy", "tɨkeˈʔɨ"],  // Tyke'y is a man's older brother; a younger one is tyvy (nderyvy 'your younger brother').
    acw: ["أخو", "ˈʔaxu"],  // Hijazi uses أخو (ʔaḵu) for older and younger brothers alike; Arabic marks an older one only with an adjective.
    ivv: ["kaka", "kaka"],  // Kaka is an older sibling of either sex, from Proto-Malayo-Polynesian *kaka.
    itb: ["kaaka", "kaːka"],  // Kaaka is an older sibling of either sex, from Proto-Malayo-Polynesian *kaka; a younger sibling is wari.
    piu: ["kuṯa", "kuʈa"],  // Kuṯa is an older brother; a younger sibling is malanypa.
    kgp: ["kãke", "kãke"],  // Kãke is an older brother; a younger brother is yãwɨ.
    tob: ["lapitʃaqaʔ", "lapitʃaqaʔ"],  // Lapichaqa' is 'his/her older brother', with the possessive prefix l-; a younger brother is l-anoq and a sibling in general l-qaya.
    plg: ["latʃoʔqolek", "latʃoʔqolek"],  // Lachoq'olec is 'his/her older brother' with an endearing diminutive suffix; a younger brother is l-anoq'olec.
    moc: ["lopiitʃi", "lopiitʃi"],  // Lopiichi is 'his/her older brother', with the possessive prefix l-; a younger brother is l-anoq.
    mbc: ["rui", "rui"],  // A man calls his older brother u-rui 'my older brother' and his younger brother u-yakon; a woman says u-pi for any brother.
    kpj: ["dela", "dela"],  // Dela is an older brother; a younger brother is iheruše.
    cag: ["tʃeklaʔ", "tʃeklaʔ"],  // Checla' is an older brother (lhchecla' 'his older brother'); a younger brother is -onax.
    crt: ["kiljeʔ", "kiljeʔ"],  // Kilye' is an older brother (always possessed, with variant -silye'); a younger brother is -kini.
    tue: ["sõwʉ̃", "sõˈwɨ̃"],  // Sõwʉ̃ is an older brother; a younger brother is ba'i.
    blc: ["qʷʼalm", "qʷʼalm"],  // Qʷʼalm is an older sibling; a younger brother is sūχi.
    roo: ["araoko", "aɾaoko"],  // A man calls any brother araoko, older or younger; a woman calls her brother taataato.
    nan_ph: ["阿兄", "a˥˥˦ hiã˧˧"],  // Philippine Hokkien says á-hiaⁿ for an older brother, and also uses it before the name of any young man older than oneself.
    mhy: ["tataʔ", "tataʔ"],  // Tata' is an older sibling of either sex; a younger one is andi'.
    aau: ["oryay", "ˈoɾaj"],  // Oryay is a man's word for his older brother, 'my older brother'; Lock's Abau grammar lists it among the kinship terms.
    bdk: ["шид", "ʃid"],  // Budukh шид covers older and younger brothers; an older one is дугъма шид and a younger one микІе шид.
    dbl: ["mugirray", "ˈmuɡiraj"],  // Mugirray is an older brother (said with the masculine marker bayi); a younger brother is yabuju.
    huz: ["ыс", "ɨs"],  // Hunzib ыс is a brother (also a sibling); an older brother is ыкъу ыс and a younger one иэру ыс.
    kpf: ["âtâŋâ", "ɐtɐŋɐ"],  // Âtâŋâ is a man's older brother; a younger brother is muna.
    lij_t: ["frè", "frɛ"],  // Tabarchino frè, the Ligurian fræ, covers older and younger brothers alike.
    mpj: ["kurta", "kuʈa"],  // Kurta is an older brother; a younger sibling is marlaju or malangu.
    bbl: ["ვაშ", "vaʃ"],  // Bats ვაშ covers older and younger brothers; IDS gives an older brother as ваккхух ваш and a younger one as кIацІкIух ваш.
    kfa: ["ಅಣ್ಣ", "aɳɳa"],  // Aṇṇa is an older brother (also an older male parallel cousin); a younger brother is tammaṇa.
    kry: ["şid", "ʃid"],  // Kryts şid covers older and younger brothers; an older one is licʼ şid and a younger one siläd şid.
    wls: ["taʻokete", "taʔokete"],  // Taʻokete is an older same-sex sibling, from Proto-Polynesian *taqokete; a younger one is tehina.
    ckv: ["qaqa", "ˈqaqa"],  // Qaqa is an older sibling of either sex, from Proto-Malayo-Polynesian *kaka; a younger sibling is suani.
    nan_xm: ["阿兄", "a˦˦ hiã˦˦"],  // A-hiaⁿ, with the familiar prefix a-, is the everyday word for an older brother in Xiamen; a younger brother is 小弟 sió-tī.
    och: ["兄", "*m̥raŋ"],  // younger brother: 弟 *lˤəjʔ; already paired in the Shijing, and Mencius says a child grown up 'knows to respect his elder brother' (敬其兄).
    zh_han: ["兄", "m̥reŋ"],  // younger brother: 弟 (Eastern Han l(h)ǝ̄́j).
    zh_tang: ["兄", "hwiajŋ"],  // younger brother: 弟; colloquial 哥, a Xianbei loan akin to Mongolian aqa, was spreading in the Tang and later replaced 兄 in speech.
    zh_yuan: ["哥哥", "kɔ kɔ"],  // Literary 兄 (xiuŋ in the Zhongyuan Yinyun) survived in writing, but 哥哥, from a Xianbei word akin to Mongolian aqa, was the spoken term.
    zh_wenyan_edu: ["兄", "hɪŋ˥"],  // younger brother: 弟 (dai6); Mencius: a child grown up 'knows to respect his elder brother' (敬其兄).
    vi_han: ["兄", "hwiŋ˧˧"],  // younger brother: 弟 (đệ); read huynh, as in huynh đệ 兄弟 'brothers'.
    ojp: ["兄", "je"],  // younger: 弟 oto; ye named the older sibling of either sex, and was replaced by ani in the Heian period.
    ja_heian: ["兄", "ani"],  // younger brother: 弟 (otouto); Heian ani replaced Old Japanese ye, and the dictionary also lists konokami as a synonym.
    ja_chu: ["兄", "ani"],  // younger brother: 弟, usually pronounced ototo in the Middle Japanese period.
    ja_edo: ["兄貴", "aɲiki"],  // younger brother: 弟 (otōto), which only in the Edo period came to mean a younger brother specifically; plain 兄 ani was the neutral word.
    nci: ["āchcāuhtli", "aːtʃkaːwtɬi"],  // younger brother: iccāuhtli; āchcāuhtli also meant a leader or captain, and a shorter āchtli is also recorded.
    puaz: ["*paʔti", "paʔti"],  // Stubbs (2011) glosses it 'older sibling'; it survives in Classical Nahuatl āchtli 'older brother'.
    xng: ["ᠠᠬᠠ", "aqa"],  // younger sibling: degü; the Xianbei word behind Chinese 哥 'elder brother' is a close relative.
    cmg: ["ᠠᠬ᠎ᠠ", "aqa"],  // younger sibling: degüü; modern Khalkha ах.
    paus: ["*kaka", "kaka"],  // It named an older sibling of either sex; descendants include Amis kaka.
    p_dra: ["*aṇṇa", "aɳɳa"],  // The ancestor of Tamil aṇṇaṉ and Telugu anna, both still 'older brother'.
    ko_mid: ["혀ᇰ", "hjəŋ"],  // younger brother: 아ᅀᆞ (àzò, a man's younger brother), the ancestor of modern 아우; 혀ᇰ is a borrowing of Chinese 兄.
    el_grc: ["ἀδελφός", "adelpʰós"],  // Greek had no separate word: the Septuagint calls Shem 'brother of Japheth the greater' (ἀδελφῷ Ιαφεθ τοῦ μείζονος).
    hbo: ["אח", "ʔɔːħ"],  // An older brother is 'the big brother': 1 Samuel 17:28 calls Eliab אָחִיו הַגָּדוֹל, 'his brother the great one'.
    he_mis: ["אח", "ʔaħ"],  // The Mishnah tells the brothers apart as הגדול 'the big one' and הקטן 'the small one'; the word for brother itself is the same.
    hy_grab: ["եղբայր", "eɫbajɾ"],  // Age was added with an adjective: երէց եղբայր 'elder brother', կրտսեր եղբայր 'younger brother'.
    fr_class: ["frère", "frɛːr"],  // An older brother was a frère aîné and a younger one a frère puîné or cadet; aîné is an adjective, 'first-born'.
    sukh: ["พี่", "biː"],  // younger sibling: น้อง; the inscription opens 'my father was Si Inthrathit, my mother Nang Sueang, my elder brother Ban Mueang'.
    ptai: ["*biː", "biː"],  // younger sibling: *nwoːŋ; the pair survives as Thai phi and nong, which do not specify sex.
    tpn: ["tykeʼyra", "tɨkeˈʔɨɾa"],  // Said by a man; 'younger brother' was ybyra for a man speaking and kybyra for a woman.
    qwc: ["wawqi", "wawqi"],  // A man's brother; older and younger were kuraq wawqi and sullk'a wawqi, and a woman called her brother tura.
    sa_edu: ["अग्रजः", "ɐɡɾɐdʑɐh"],  // Literally 'born first'; a younger brother is अनुजः (anujaḥ), 'born after'.
    akk: ["𒀀𒄷", "aχu"],  // An older brother was aḫum rabûm, 'big brother', and a younger one aḫum ṣeḫrum, 'small brother'.
    enm: ["brother", "ˈbroːðər"],  // The Wycliffe Bible calls Eliab David's 'more brother', 'greater brother', and a younger one 'the lasse brother'.
    el_kath: ["ἀδελφός", "aðelˈfos"],  // Greek adds an adjective: 'big brother' (μεγάλος ἀδελφός) for an older one and 'small brother' (μικρός ἀδελφός) for a younger one.
    dzg: ["dagi", "dàɡɪ́"],  // 'Older brother'; plain 'brother' is dehiŋi and a younger sibling is êrei.
    ttq: ["amaqqar", "amæqːar"],  // Prasse glosses it 'older brother, older sister'.
    auj: ["màma", "ˈmama"],  // Different from ùma, the general word for 'brother'.
    siz: ["áṃṃa", "ˈamˤːa"],  // Just 'my brother'; an older brother is áṃṃa azəwwár, 'big brother'.
    hi: ["भैया", "bʱəijaː"],  // Hindi भैया, in origin a diminutive of भाई 'brother', is an older brother and a term of address for any older man; a younger brother is छोटा भाई 'little brother'.
    ur: ["بھائی", "bʱaːiː"],  // Urdu بھائی is a brother of any age; an older brother is usually baṛā bhāī 'big brother', and the diminutive بھیا can also mean an elder brother.
    pa: ["ਭਰਾ", "pɾaː˩"],  // Punjabi ਭਰਾ is 'brother'; an older brother is vaḍḍā prā 'big brother' and a younger one choṭā prā, though ਵੀਰ is also used for an older brother.
    sw: ["kaka", "ˈkaka"],  // Swahili kaka is 'brother'; an older brother is kaka mkubwa 'big brother'. Wiktionary glosses it 'brother', with no age in the word.
    pcm: ["broda", "brɔda"],  // Nigerian Pidgin broda, from English brother, is a brother of any age.
    bho: ["भैया", "bʱəijaː"],  // In Bhojpuri the younger of two brothers calls the elder भैया or बड़का भाई 'big brother', while the elder calls the younger भाई.
    ps: ["لالا", "lɑlɑ"],  // Pashto لالا is an elder brother (also a title for a Hindu); a younger brother is kashar wror 'little brother', and wror is 'brother' in general.
    mai: ["भैया", "bʱəijaː"],  // Maithili भैया is an elder brother, used as a form of address; plain भाय is 'brother' and also covers a younger brother.
    awa: ["भइया", "bʱəɪaː"],  // Awadhi भइया is the everyday word for a brother, and is used for an older one, as for Balabhadra, the elder brother of Jagannath.
    or: ["ଭାଇ", "bʱaːi"],  // Odia ଭାଇ is 'brother'; an older brother is ବଡ଼ ଭାଇ 'big brother' and a younger one sāna bhāi, while ଭାଇନା is the older-brother word in Brahmin families.
    om: ["obboleessa", "obːoleːsːa"],  // Oromo obboleessa, from obbolaa 'sibling', is a brother of any age; a sister is obboleettii.
    sd: ["دادو", "daːdoː"],  // Sindhi دادو is an elder brother, a word of affection and respect; ڀاءُ is 'brother' in general and a younger brother in particular.
    ku: ["kek", "kɛk"],  // Kurmanji kek, also kak, is an older brother and a respectful 'sir'; a younger brother is birak, birayê biçûk.
    so: ["walaal", "walaːl"],  // Somali walaal is a sibling, masculine for a brother and feminine for a sister, with no age in the word.
    az: ["qardaş", "ɡɑɾˈdɑʃ"],  // Azerbaijani qardaş, literally 'sharer of the womb', is 'brother'; a younger brother is kiçik qardaş, and ağa is a colloquial way to address an older brother.
    azb: ["قارداش", "ɡɑɾˈdɑʃ"],  // South Azerbaijani قارداش is 'brother', the same word as northern qardaş.
    bar: ["Bruada", "ˈbruɐdɐ"],  // Bavarian Bruada is 'brother', of any age.
    tn: ["mogolole", "moχolole"],  // Tswana kin terms split siblings of the same sex by age: mogolole is the older brother and nnake the younger one.
    sr: ["брат", "brât"],  // Serbian has no separate older-brother word: kinship studies give брат for both older and younger brothers, with stariji brat 'older brother' when it matters.
    ht: ["frè", "frɛ"],  // Haitian Creole frè, from French frère, is 'brother'; a sister is sè. Wiktionary glosses it 'brother', with no age in the word.
    bal: ["برات", "braːt"],  // Balochi has one word for brother whatever his age: ethnographies record برات (also brās) for both older and younger brothers.
    dyu: ["kɔrɔkɛ", "kɔrɔkɛ"],  // Manding kɔrɔkɛ is 'older male sibling', from kɔrɔ 'older family member' plus kɛ 'male'; a younger brother is dɔgɔkɛ.
    kr: ["yaa", "jaː"],  // Kanuri yàá is an older sibling, used for an older brother; a younger sibling is kə̀rámì and a brother in general yâànà.
    hil: ["manong", "ˈmanoŋ"],  // Hiligaynon manong, clipped from Spanish hermano, is the eldest or older brother and the way to address him; utod is a sibling of any age.
    ak: ["onuabarima", "onuabarima"],  // Akan has no separate older-brother word: an elder brother is onua panyin, 'elder sibling', and a younger one onua kumaa or ketewa.
    ckb: ["برا", "bɾaː"],  // Sorani brother covers older and younger brothers alike; kak, literally 'elder brother', is used as a respectful title for men.
    mad: ["kakaʼ", "kakaʔ"],  // Madurese kakaʼ is an older sibling, used for an older brother; a younger sibling is alèʼ.
    ki: ["mũkũrũ", "mokoɾo"],  // Kikuyu mũkũrũ, from -kũrũ 'old', is an older sibling of the same sex, so a man's older brother; younger: moruna in the source.
    ks: ["بوے", "boːj"],  // Kashmiri boy is any brother, older or younger; Kashmiri kinship studies record no separate older-brother word.
    mos: ["kẽema", "kẽːma"],  // Mooré kẽema is an older sibling, brother or sister (also father, senior); a younger sibling of the same sex is yaoa.
    lua: ["mukulu", "mukulu"],  // Cilubà mukùlù is an older brother or sister (also an elder or chief); younger: mwakùnyì.
    kab: ["dadda", "dadːa"],  // Kabyle dadda is an older brother, also a paternal uncle or a respectful word for an older man; gma is 'brother'.
    lg: ["muganda", "muɡanda"],  // Luganda muganda is a same-sex sibling of any age; an older brother is muganda omukulu, 'elder brother'.
    hr: ["brat", "brât"],  // Croatian brat covers older and younger brothers alike; an older brother is stariji brat.
    nso: ["mogolle", "moɣolːe"],  // Northern Sotho mogolle is an older brother or sister; a younger one is moratho, and morwarre is 'brother'.
    sg: ["yayâ", "jaja"],  // Sango yayâ is an older brother or sister; a younger one is ngambe, and îtä is any sibling.
    kok: ["भाव", "bʱaːʋ"],  // Konkani भाव is any brother; an older brother is vodlo bhav, 'big brother', and a younger one dakto bhav, 'little brother'.
    snk: ["gide", "ɡide"],  // Soninke gide (gida with a possessor, as in n gida 'my older brother') is an older brother or sister, a separate word from its homonym gide 'rock'; a younger sibling is xoxone.
    kha: ["hynmen", "hinmen"],  // Khasi hynmen is an older brother or sister (u hynmen for a brother); a younger sibling is para.
    fon: ["fofó", "fofo"],  // Fon fofó is an older brother; a younger brother, or a sibling in general, is nɔví.
    ndc: ["mukoma", "mukoma"],  // Ndau mukoma is an older brother, as in Shona; a younger brother is munun'una.
    toi: ["mupati", "mupati"],  // Tonga mupati, literally 'the big one', is an older sibling, used here for an older brother; a younger sibling is musyoonto, and the Tonga Translation Project Bible also has mukulana.
    cgg: ["mukuru", "mukuru"],  // Rukiga mukuru, from -kuru 'old', is an older sibling of the same sex, so a man's older brother; a younger one is murumuna (text from the joint Runyankore-Rukiga Bible).
    teo: ["onac", "onatʃ"],  // Ateso onac is a brother of any age; an older brother is onac lokapolon, 'the big brother'.
    wal: ["ishaa", "iʃaː"],  // Wolaytta ishaa is a brother of any age; the eldest is marked with bairaa 'first-born'.
    drs: ["dayyo", "dajːo"],  // Gedeo dayyo is a brother of any age; the eldest is angafa dayyo, 'first-born brother'.
    kbd: ["къуэш", "qʷaʃ"],  // Kabardian къуэш is any brother: an older one is къуэш нэхъыжь and a younger one къуэш нэхъыщӀэ.
    rhg: ["bái", "bai"],  // Rohingya bái is a brother of any age; a younger one can be specified as šoṛo bái, 'little brother'.
    max: ["kaka", "kaka"],  // North Moluccan Malay kaka is an older sibling, used for an older brother; a younger sibling is ade.
    abs: ["kaka", "kaka"],  // Ambon Malay kaka is an older sibling, used for an older brother, who is addressed as bu; a younger sibling is ade.
    aa: ["saqál", "saˈʕal"],  // Afar saqál is specifically an elder brother; a younger brother is maqánxa, and brother in general toobokóyta.
    mfa: ["abang", "abɛ"],  // Cognate with Malay abang 'older brother'; final -ang is said -ɛ in Patani Malay, as in this row's tulang and ikan.
    tum: ["mukuru", "mukuru"],  // Tumbuka mukuru, from Proto-Bantu *mʊ̀kʊ́dʊ́, is glossed 'older brother or older sister of the same sex'.
    shn: ["ပီႈဢၢႆႈ", "piː˧˨ ʔaːj˧˨"],  // ပီႈ 'older sibling' plus ဢၢႆႈ 'elder brother', the cognates of Thai พี่ and อ้าย; IDS gives a younger brother as nɔ:ŋ ca:j and 'brother' as pi: / nɔ:ŋ.
    xog: ["muganda", "muɡanda"],  // Lusoga muganda is a same-sex sibling of any age; an older brother is muganda omukulu, 'elder brother', with no separate word.
    dje: ["beere", "beːre"],  // Zarma beere is glossed 'elder (sibling)', brother or sister.
    bug: ["kakaʼ", "kakaʔ"],  // Buginese kakaʼ is glossed 'older sibling'; daéng, also 'older sibling', doubles as a noble title.
    gl: ["irmán", "iɾˈmaŋ"],  // Galician irmán is a brother of any age; an older brother is said with a phrase, irmán maior.
    vec: ["fradeło", "fraˈdɛo"],  // Venetian fradeło is a brother of any age; an older brother is said with a phrase, fradeło mazor.
    lmo: ["fradell", "fraˈdɛl"],  // Lombard fradell, from Latin frātellus, is a brother of any age; an older brother is said with a phrase, fradel magior.
    zza: ["bra", "bɾa"],  // Zazaki bra, also written bira or bıra, is a brother of any age; an older brother is said with a phrase, birayo pîl 'big brother'.
    srn: ["brada", "brada"],  // From English brother; no source seen says whether Sranan has a separate older-brother word.
    mzn: ["برار", "bərɒːɾ"],  // Inherited from Proto-Iranian *bráHtā 'brother'; no source seen settles whether an older brother has his own word.
    sdh: ["برا", "bɪɾɑː"],  // Southern Kurdish bira is 'brother'; no source seen settles whether kaka is used for an older brother as in Sorani.
    bej: ["san", "san"],  // Beja san is 'brother'; the family terms list gives no separate older-brother word, but no source says so outright.
    sid: ["rodo", "rodo"],  // Sidamo rodo is a sibling, brother or sister, with no age in the word.
    luo: ["owadwa", "owadwa"],  // Dholuo owadwa, 'our brother', is how a man's brothers are named and addressed; the elders' kinship survey lists no separate older-brother term.
    brh: ["ایلم", "iːlum"],  // Brahui īlum, from Proto-Dravidian *eḷ- 'young, tender', is 'brother'; its diminutive īlumko means 'little brother'.
    iba: ["aka", "akaʔ"],  // Iban aka is an older brother; a younger sibling is adi.
    mfe: ["dada", "dada"],  // Mauritian Creole dada, borrowed from Marathi dādā, is an older brother; the general word for brother is frer.
    sco: ["brither", "ˈbrɪðər"],  // Scots brither, from Old English brōþor, is 'brother'. Wiktionary glosses it 'brother', with no age in the word.
    li: ["broor", "broːr"],  // Limburgish broor, from Middle Dutch broeder, is 'brother'. Wiktionary glosses it 'brother', with no age in the word.
    bqi: ["برار", "bærɒr"],  // Bakhtiari barâr, from Middle Persian brād, is 'brother'; kakâ is listed as a synonym.
    nus: ["däman", "dəman"],  // Nuer däman is 'brother'.
    mas: ["ɔlalashɛ", "ɔlalaʃɛ"],  // Maasai ɔl-aláshɛ is 'brother' whether older or younger; Payne's kin list gives the same word for both.
    nym: ["mkulu", "mkʊlʊ"],  // Nyamwezi mkulu, 'the elder one', is an older brother; mdugu is a brother or relative in general.
    tig: ["ሑ", "ħu"],  // Tigre ḥu is 'brother'; a father's brother is ḥu ab. Wiktionary glosses it 'brother', with no age in the word.
    en_my: ["brother", "ˈbɹadə"],  // As elsewhere in English, an older brother is an older or elder brother; there is no separate word.
    es_ec: ["hermano", "eɾˈmano"],  // An older brother is a hermano mayor; colloquially Ecuadorians also say ñaño, from Quechua, for a brother or sister.
    ar_lev: ["أخ", "ʔaxx"],  // No separate older-brother word: a younger brother is أخوي الزغير 'my little brother', and Lebanese also says خيّ.
    ar_gulf: ["أخ", "ʔax"],  // As in Standard Arabic, an older brother is just a brother described as bigger.
    ar_iq: ["أخ", "ʔax"],  // No separate older-brother word: a younger brother is أخوه الصغيّر, 'his little brother'.
    ar_sd: ["أخ", "ʔax"],  // As in Standard Arabic there is one word for brother; age is added with an adjective.
    ar_ye: ["أخ", "ʔax"],  // As in Standard Arabic there is one word for brother; age is added with an adjective.
    gsw: ["Brüeder", "ˈbryədər"],  // Swiss German Brüeder is any brother, from Middle High German bruoder; an older one is a grosse or eltere Brüeder.
    ksh: ["Broder", "ˈbʁoːdɐ"],  // Kölsch Broder, plural Bröder, is any brother; age is added with an adjective.
    rmy: ["phral", "pʰral"],  // Vlax Romani phral, from Sanskrit bhrātṛ, is any brother; Kalderash and Lovara also say pral.
    en_sg: ["brother", "ˈbɹadə"],  // Singapore English says brother or big brother; in Chinese families an older brother is also called kor kor, from 哥哥.
    es_cl: ["hermano", "eɾˈmano"],  // As elsewhere in Spanish, an older brother is a hermano mayor.
    crk: ["ᓂᐢᑌᐢ", "nisteːs"],  // Plains Cree nistês is 'my older brother', also an older male parallel cousin; a younger sibling is nisîmis.
    nan_pn: ["哥哥", "ko˧˧ ko˧˧"],  // Penang Hokkien calls an older brother ko or ko-ko, and adds Ko to the name of any older man of one's own generation.
    yue_dg: ["阿哥", "ʔa˨˧ kɔ˨˧"],  // Dongguan addresses an older brother as 阿哥 and refers to him as 大佬.
    nia: ["kaʼa", "ˈkaʔa"],  // Ka'a is an older sibling of either sex; a younger sibling is akhi.
    tly: ["bilə", "bilə"],  // Talysh bilə is an older brother; a younger brother is boyli, from boə 'brother'.
    fur: ["fradi", "ˈfradi"],  // Friulian fradi, from Latin frāter, is 'brother'. Wiktionary glosses it 'brother', with no age in the word.
    rue: ["брат", "brat"],  // Rusyn брат is 'brother'.
    mev: ["lìī", "lìī"],  // Mano lìī is an older sibling of either sex (lìī gɔ̰̄zɛ̀ specifies a brother); a younger sibling is lēkè, and 'brother' in general is mɔ́nɔ̀gɔ̰̀.
    kxc: ["aattaa", "aːtːaː"],  // Konso aattaa is an elder sibling (vocative aatti); a brother in general is alawa, 'male sibling'.
    maw: ["beeri", "beːri"],  // Mampruli beeri is an elder sibling of the same sex as the speaker; a junior same-sex sibling is tinzɔ, and the eldest bɛkpeema.
    guc: ["epaya", "epaja"],  // Wayuunaiki epaya is an older brother or sister; a younger brother is emiilia, and awala is any sibling.
    bft: ["ཀ་ཀ", "kaka"],  // Balti kaka is an elder brother, also an elder man in general; a younger brother is phono, and ཨ་ཆོ is the honorific.
    rup: ["frate", "ˈfrate"],  // Aromanian frate is a brother of any age; an older brother is said with a phrase using cama mare, 'bigger'.
    bto: ["mānoy", "maːnɔj"],  // Rinconada Bikol mānoy is an older brother and mānay an older sister, while a brother in general is ŋod, as in Ŋod ko si Uwan, 'John is my brother'.
    xmf: ["ჯიმა", "dʒima"],  // Mingrelian ჯიმა is 'brother'. Wiktionary glosses it 'brother', with no age in the word.
    zap: ["biʼchiʼ", "biʔtʃiʔ"],  // Isthmus Zapotec bi'chi' is a man's brother; a woman's brother (or a man's sister) is biza'na'.
    asu: ["ifolong'o", "ifoloŋo"],  // Pare ifolong'o is given for an (older) brother in both North and South Pare.
    adi: ["aabing", "aːbɨŋ"],  // Adi aabing is used by younger siblings for an elder brother (biibing in address); biro is a brother in general, and a younger brother is biro aniyang.
    fy: ["broer", "bruər"],  // West Frisian broer is 'brother'. Wiktionary glosses it 'brother', with no age in the word.
    oc: ["fraire", "ˈfrajre"],  // Occitan fraire is 'brother', from Latin frater. Wiktionary glosses it 'brother', with no age in the word.
    lij: ["fræ", "frɛː"],  // Ligurian fræ is 'brother', from Latin frater. Wiktionary glosses it 'brother', with no age in the word.
    szl: ["brat", "brat"],  // Silesian brat is 'brother'. Wiktionary glosses it 'brother', with no age in the word.
    pdt: ["Brooda", "ˈbroːda"],  // Plautdietsch Brooda is 'brother', plural Breeda. Wiktionary glosses it 'brother', with no age in the word.
    krc: ["къарнаш", "qarˈnaʃ"],  // Karachay къарнаш is 'brother'; Balkar says къарындаш.
    jmc: ["mwanama", "mwanama"],  // Machame mwanama is given for an (older) brother.
    ast: ["hermanu", "eɾˈmanu"],  // Asturian hermanu is a brother of any age; an older brother is a hermanu mayor and a younger one a hermanu pequeñu.
    co: ["fratellu", "fraˈtɛllu"],  // Corsican fratellu is a brother of any age; age is added with a phrase such as fratellu più vechju 'older brother' or più giovanu 'younger'.
    csb: ["brat", "brat"],  // Kashubian brat is a brother of any age; an older brother is a starszi brat, 'older brother'.
    ab: ["аиашьа", "ajaʃa"],  // Abkhaz аиашьа is a brother of any age; Abkhaz Wikipedia calls Napoleon's older brother Joseph аиашьа еиҳабы, 'senior brother'.
    lzz: ["ჯუმა", "dʒuma"],  // Laz ჯუმა (cuma) is 'brother', from Proto-Kartvelian *ʒ₁am-; no source seen says whether Laz has a separate older-brother word.
    frp: ["frâre", "frar"],  // Arpitan frâre, from Latin frāter, is 'brother'; no source seen says whether an older brother has his own word.
    byn: ["ዳን", "dan"],  // Blin dan is 'brother' (sister: shani); no source seen says whether Blin has a separate older-brother word.
    cab: ["átii", "ˈatiː"],  // Garifuna átii is an older brother; a younger brother is amule, and ibiri is 'brother' in general.
    mdr: ["kaka", "kaka"],  // Mandar kaka, from Proto-Austronesian *kaka, is an older sibling; a younger sibling is andi.
    bzj: ["breda", "breda"],  // Belize Kriol breda, from English brother, is a brother of any age; the Kriol New Testament calls the older brother of the Prodigal Son di oalda breda.
    bi: ["brata", "brata"],  // Bislama brata, from English brother, is used for older and younger brothers alike; the Bislama Bible marks birth order with fasbon 'first-born' and sekenbon 'second-born' instead.
    hns: ["bhai", "bʱai"],  // Sarnami bhai is any brother; the Sarnami New Testament calls an older brother barka bhaai, 'big brother', and a younger one tjhota bhaai.
    kfx: ["भाई", "bʱaːiː"],  // Kullui भाई is any brother; the Kulvi New Testament calls an older brother बड़ा भाई, 'big brother'.
    ssy: ["sacal", "saʕal"],  // Saho sacal is 'brother'; no source seen says whether Saho has a separate older-brother word.
    enq: ["kaiminingi", "kaiminiŋɡi"],  // Enga kaiminingi is a man's brother (a sibling of the opposite sex is pimalenge); Lang's dictionary as coded in Kinbank gives no separate older-brother term.
    maz: ["cjuarma", "kʰwaɾma"],  // Mazahua cjuarma is 'brother' in the Mazahua New Testament; no source seen says whether there is a separate older-brother word.
    saq: ["lalache", "lalatʃe"],  // Samburu lalache is 'brother' in the Samburu Bible, the counterpart of Maasai ɔlalashɛ; no source seen says whether an older brother has his own word.
    nch: ["noicni", "noˈikni"],  // Huasteca Nahuatl -icni 'brother' (here with no- 'my', like the row's other kin words) is used in the Bible for both the younger Abel and the older Esau.
    sip: ["ཨ་ཅུ", "atɕu"],  // Sikkimese splits brothers by age: átɕu (or ágja) is an elder brother, pynlo a younger one; tone not marked, as elsewhere in this row.
    toj: ["bʼankil", "ɓankil"],  // Bʼankil is a man's older brother, and also any man somewhat older than oneself; a woman calls her older brother nuʼ, and a younger brother is ʼijtsʼinal (Lenkersdorf).
    poh: ["asbʼees", "asɓeːs"],  // Asbʼees is an older sibling, brother or sister (was 'my older sibling'); a younger one is chaqʼbʼees (Dobbels 2003).
    ixl: ["atzik", "atsik"],  // Ixil atzik is an older sibling (t-atzik 'his/her older sibling', citation form atzika); a younger one is itzʼin (ALMG vocabulary).
    dsh: ["angʼa", "aŋa"],  // Daasanach angʼa is an older brother (angʼachú 'my older brother', angʼa guđúá 'eldest brother'); the general word for a brother or sibling is nyaar.
    dur: ["dag nìì", "daɡ nii"],  // Dii has no plain word for a man's brother: dag nìì is the older one ('elder' nii) and dag sá̧ŋ́ the younger; a woman says dag yée for a brother of either age, and addresses an older brother as bàa nii.
    bbo: ["pɩrayi", "pɪraji"],  // Konabéré pɩrayi, 'the big one', is an older brother, and yagɩlayi a younger one; liree is any sibling. The dictionary marks pɩrayi with its Ts dialect label.
    dbq: ["gàlà", "ɡàlà"],  // Daba gala is a sibling of the same mother; an older brother is galamay maday, 'my big sibling', and a younger one galamay ma kedirek.
    ekp: ["nwanịkanì", "nwanɪkani"],  // Ekpeye nwanịkanì is an elder sibling or cousin and nwanekè a younger one, beside plain nwanā 'sibling'; Blench's dictionary also lists ŋanịƙanị̀ 'senior brother'.
    dds: ["dele", "dele"],  // Donno So délè is a man's older brother (an older same-sex sibling) and súŋɔ̀ a younger one; a woman calls her brother of any age sánà (Heath's Dogon lexicon).
    cho: ["akni", "akni"],  // Akni is an older brother of a man (or older sister of a woman); a younger one is nakfish, and a woman's brother is nakfi.
    rtm: ["sạsigi", "sɔˈsiŋi"],  // Sạsigi is a man's older brother (or a woman's older sister); a younger one is sạsiga, and a woman's brother is sạgvavane.
    yrk: ["нинека", "ˈnʲinʲeka"],  // Нинека is an older brother (also a father's younger brother); a younger brother is папа, and ня is a sibling or friend.
    ddo: ["эсйу", "esju"],  // Tsez has no separate word: an older brother is an эжени эссу, 'big brother', and a younger one an эгъве эссу, 'small brother'.
    huv: ["micojaran", "mikoharan"],  // Micojaran is an older sibling, brother or sister (micoj naxey 'his married older brother'); a younger one is michiigueran, and coj is the word of address.
    ygr: ["eʼagoʼa", "eʔaɡoʔa"],  // Eʼagoʼa is a man's older brother (apaʼa is the term of address); a younger same-sex sibling is aganaʼa, and saʼa is a sibling of the opposite sex of any age.
    tcs: ["bala", "bala"],  // Torres Strait Creole has no separate word: an older brother is a big brada, 'big brother', and a younger one a smol brada; bala and brada (both from English 'brother') are synonyms.
    vep: ["veik", "veik"],  // Veps veik is an older brother, while vel'l' is 'brother' in general.
    mus: ["ervhv", "iɬáhə"],  // Ervhv (also rvhv) is a man's older brother or a woman's older sister, an older sibling of the same sex; a younger one is -cuse, as in cvcuse 'my younger brother' (Martin & Mauldin).
    yap: ["nganniiq", "ŋanniːʔ"],  // Nganniiq is an older sibling, brother or sister; a younger sibling is wayin, and walaag is any brother, sister or sibling (Jensen 1977).
    usp: ["aatz", "ʔaːts"],  // Uspanteko aatz is an elder brother, an inalienably possessed noun; a younger brother is q'uun.
    ium: ["gorx", "kɔ˨˧"],  // Iu Mien gorx is an older brother and youz a man's younger brother; together gorx-youz means 'older and younger brothers'.
    myp: ["xahaigí", "ʔahaiɡí"],  // Pirahã has one word, xahaigí, for a sibling of either sex and any age; Everett describes its kinship system as the simplest known.
    smn: ["viljâ", "viʎɐ"],  // Inari Sámi has no separate word: an older brother is a stuorrâviljâ, 'big brother', and a younger one an uccâviljâ.
    kwk: ["ʼnula", "ʔnula"],  // A man's older brother (an older sibling of the same sex) is his ʼnula; a younger one is tʼsaʼya, and a woman calls her brother of any age waḵ̕wa.
    thp: ["qéck", "qetsk"],  // Thompson has separate words by age: qéck is an older brother, sínciʔ a younger brother.
    yur: ["meechos", "mitʃɔs"],  // Yurok meechos covers an elder brother and a male cousin; a younger sibling is cheechos and an older sister peenos.
    cay: ["hehjíʼah", "hehdʒíʔah"],  // Literally 'my older brother', on an older-sibling stem; a younger brother is heʼgę́:ʼęh.
    pqm: ["nhesis", "nhesis"],  // Literally 'my older brother' (stem hesis-); a younger sibling is uhsimis-, and the general 'brothers' word 'siwehs- covers both.
    tlh: ["loDnI'", "loɖnɪʔ"],  // Klingon makes no distinction between elder and younger siblings: loDnI' is any brother and be'nI' any sister.
    mra: ["diŋ joŋ", "diŋ joŋ"],  // Mlabri has separate terms by age: diŋ joŋ is an older brother and roj baw a younger one, while diŋ roj means siblings.
    enf: ["ina", "ina"],  // Forest Enets has a separate word ina for an older brother (also said aga kasa, 'big brother'); kasa is a brother in general, and a younger brother is ńab́i.
    nio: ["әˮә", "əʔə"],  // Nganasan has two words for an older brother, әˮә and нины, both distinct from the younger-brother words ŋaaŋku and ŋadʹa.
    adt: ["nhunga", "n̪uŋa"],  // Adnyamathanha has separate terms by age: nhunga is an older brother and yaka an older sister, while a younger brother or sister is pilhali.
    wbt: ["kupu", "kupu"],  // Warnman has separate words by age: kupu is an older brother and malaju (maɭaŋu) a younger one.
    nys: ["ngoont", "ŋunt"],  // Noongar ngoont is an elder brother, beside ngoon for a brother in general; a younger brother is kardang.
    kgg: ["mom", "mom"],  // Kusunda has separate words by age: mom is an elder brother and bʰəya a younger brother (elder sister bai, younger sister binəi).
    ale: ["ludax̂", "luðaχ"],  // Eastern Aleut ludax̂ (Atkan luyax̂) is a man's older brother or a woman's older sister; the younger counterpart is kingix̂, and agiitudax̂ is a brother in general.
    koy: ["boogha", "boːɣa"],  // Literally 'his older brother' (addressed as sooghaa); a younger brother is bikitt'a, addressed kitt'aa.
  },
};
