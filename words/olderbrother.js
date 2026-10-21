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
    tr: ["ağabey", "aːbej"],  // Turkish ağabey, usually said abi, is an older brother; younger: (erkek) kardeş.
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
  },
};
