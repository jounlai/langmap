/**
 * Uncle — a parent's brother, and whether a language asks 'on which side?'
 * 
 * PARTIAL WORD (🧪). Twin of grandmother, with the same rule. Turkish amca and
 * dayı, Arabic عم and خال, Hindi चाचा and मामा, Finnish setä and eno keep the
 * father's and the mother's brother apart; English, French and Russian have one
 * word. RULE: the cell is the FATHER'S BROTHER where the language splits them,
 * and the note gives the mother's brother; otherwise the single word. Where a
 * language also splits older and younger, the first word in the source stands.
 * Routes:
 *   split  different words for the father's and the mother's brother
 *   one    one word for both
 */
WORDS.uncle = {
  partial: true,
  emoji: "👨‍🦳",
  label: {
    en: "Uncle",
    ja: "おじ",
    ko: "삼촌",
    zh: "叔叔 / 舅舅",
    yue: "阿叔 / 舅父",
    vi: "Chú / cậu",
    th: "ลุง / อา / น้า",
    id: "Paman",
    hi: "चाचा / मामा",
    de: "Onkel",
    fr: "Oncle",
    it: "Zio",
    es: "Tío",
    es_eu: "Tío",
    es_mx: "Tío",
    pt: "Tio",
    pt_eu: "Tio",
    pt_br: "Tio",
    ru: "Дядя",
    uk: "Дядько",
    ar: "عم / خال",
    he: "דוד",
    sw: "Ami / mjomba",
  },
  definition: {
    en: "Uncle — a parent's brother. Many languages ask which side: Turkish amca and dayı, Arabic عم and خال, Hindi चाचा and मामा, Finnish setä and eno. English, French and Russian have one word for both. Where a language splits them, the map shows the father's brother and the note gives the mother's.",
    ja: "おじ — 親の兄弟。どちら側のおじかを言い分ける言語は多い。トルコ語 amca と dayı、アラビア語 عم と خال、ヒンディー語 चाचा と मामा、フィンランド語 setä と eno。英語・フランス語・ロシア語は一語で済ませる。言い分ける言語では、地図には父の兄弟を載せ、母の兄弟は注に記す。",
    ko: "삼촌 — 부모의 남자 형제. 어느 쪽인지 가리는 언어가 많다. 튀르키예어 amca와 dayı, 아랍어 عم과 خال, 힌디어 चाचा와 मामा, 핀란드어 setä와 eno가 그렇다. 영어, 프랑스어, 러시아어는 한 낱말로 쓴다. 둘을 가르는 언어는 지도에 아버지의 형제를 싣고, 어머니의 형제는 주석에 적는다.",
    zh: "叔叔、舅舅——父母的兄弟。许多语言要分清是哪一边：土耳其语 amca 和 dayı、阿拉伯语 عم 和 خال、印地语 चाचा 和 मामा、芬兰语 setä 和 eno。英语、法语和俄语两边用同一个词。分开说的语言，地图上显示父亲的兄弟，母亲的兄弟写在注释里。",
    yue: "阿叔、舅父——父母嘅兄弟。好多語言要分清係邊一邊：土耳其語 amca 同 dayı、阿拉伯語 عم 同 خال、印地語 चाचा 同 मामा、芬蘭語 setä 同 eno。英語、法語同俄語兩邊用同一個詞。分開講嘅語言，地圖上顯示老豆嘅兄弟，阿媽嘅兄弟寫喺註釋。",
    vi: "Chú / cậu — anh em trai của cha mẹ. Nhiều tiếng phân biệt bên nào: tiếng Thổ Nhĩ Kỳ amca và dayı, tiếng Ả Rập عم và خال, tiếng Hindi चाचा và मामा, tiếng Phần Lan setä và eno. Tiếng Anh, tiếng Pháp và tiếng Nga dùng một từ cho cả hai. Với những tiếng phân biệt, bản đồ ghi anh em trai của cha, còn phần chú thích ghi anh em trai của mẹ.",
    th: "ลุง อา น้า — พี่น้องชายของพ่อแม่ หลายภาษาแยกว่าเป็นฝ่ายไหน ภาษาตุรกี amca กับ dayı ภาษาอาหรับ عم กับ خال ภาษาฮินดี चाचा กับ मामा ภาษาฟินแลนด์ setä กับ eno ภาษาอังกฤษ ฝรั่งเศส และรัสเซียใช้คำเดียว ในภาษาที่แยก แผนที่แสดงพี่น้องชายของพ่อ และหมายเหตุบอกพี่น้องชายของแม่",
    id: "Paman — saudara laki-laki orang tua. Banyak bahasa membedakan sisinya: amca dan dayı Turki, عم dan خال Arab, चाचा dan मामा Hindi, setä dan eno Finlandia. Bahasa Inggris, Prancis, dan Rusia memakai satu kata untuk keduanya. Pada bahasa yang membedakannya, peta menampilkan saudara laki-laki ayah, dan catatan memberi saudara laki-laki ibu.",
    hi: "चाचा / मामा — माता या पिता का भाई। बहुत सी भाषाएँ पूछती हैं कि किस ओर का: तुर्की amca और dayı, अरबी عم और خال, हिंदी चाचा और मामा, फ़िनिश setä और eno। अंग्रेज़ी, फ़्रांसीसी और रूसी में दोनों के लिए एक ही शब्द है। जहाँ भाषा दोनों को अलग करती है, नक्शे पर पिता का भाई दिखता है और टिप्पणी में माँ का भाई।",
    de: "Onkel — der Bruder eines Elternteils. Viele Sprachen fragen, auf welcher Seite: Türkisch amca und dayı, Arabisch عم und خال, Hindi चाचा und मामा, Finnisch setä und eno. Englisch, Französisch und Russisch haben ein Wort für beide. Wo eine Sprache sie trennt, zeigt die Karte den Bruder des Vaters, und die Anmerkung nennt den Bruder der Mutter.",
    fr: "Oncle — le frère d'un parent. Bien des langues demandent de quel côté : le turc amca et dayı, l'arabe عم et خال, le hindi चाचा et मामा, le finnois setä et eno. L'anglais, le français et le russe ont un seul mot pour les deux. Quand une langue les distingue, la carte montre le frère du père et la note donne le frère de la mère.",
    it: "Zio — il fratello di un genitore. Molte lingue chiedono da quale parte: il turco amca e dayı, l'arabo عم e خال, l'hindi चाचा e मामा, il finlandese setä e eno. L'inglese, il francese e il russo hanno una sola parola per entrambi. Dove una lingua li distingue, la mappa mostra il fratello del padre e la nota dà il fratello della madre.",
    es: "Tío — el hermano de uno de los padres. Muchas lenguas preguntan de qué lado: el turco amca y dayı, el árabe عم y خال, el hindi चाचा y मामा, el finés setä y eno. El inglés, el francés y el ruso tienen una palabra para ambos. Donde una lengua los separa, el mapa muestra al hermano del padre y la nota da al hermano de la madre.",
    es_eu: "Tío — el hermano de uno de los padres. Muchas lenguas preguntan de qué lado: el turco amca y dayı, el árabe عم y خال, el hindi चाचा y मामा, el finés setä y eno. El inglés, el francés y el ruso tienen una palabra para ambos. Donde una lengua los separa, el mapa muestra al hermano del padre y la nota da al hermano de la madre.",
    es_mx: "Tío — el hermano de uno de los padres. Muchas lenguas preguntan de qué lado: el turco amca y dayı, el árabe عم y خال, el hindi चाचा y मामा, el finés setä y eno. El inglés, el francés y el ruso tienen una palabra para ambos. Donde una lengua los separa, el mapa muestra al hermano del padre y la nota da al hermano de la madre.",
    pt: "Tio — o irmão do pai ou da mãe. Muitas línguas perguntam de que lado: o turco amca e dayı, o árabe عم e خال, o hindi चाचा e मामा, o finlandês setä e eno. O inglês, o francês e o russo têm uma palavra para os dois. Onde uma língua os separa, o mapa mostra o irmão do pai e a nota dá o irmão da mãe.",
    pt_eu: "Tio — o irmão do pai ou da mãe. Muitas línguas perguntam de que lado: o turco amca e dayı, o árabe عم e خال, o hindi चाचा e मामा, o finlandês setä e eno. O inglês, o francês e o russo têm uma palavra para os dois. Onde uma língua os separa, o mapa mostra o irmão do pai e a nota dá o irmão da mãe.",
    pt_br: "Tio — o irmão do pai ou da mãe. Muitas línguas perguntam de que lado: o turco amca e dayı, o árabe عم e خال, o hindi चाचा e मामा, o finlandês setä e eno. O inglês, o francês e o russo têm uma palavra para os dois. Onde uma língua os separa, o mapa mostra o irmão do pai e a nota dá o irmão da mãe.",
    ru: "Дядя — брат отца или матери. Многие языки спрашивают, с какой стороны: турецкое amca и dayı, арабское عم и خال, хинди चाचा и मामा, финское setä и eno. В английском, французском и русском для обоих одно слово. Где язык их различает, карта показывает брата отца, а в примечании дан брат матери.",
    uk: "Дядько — брат батька чи матері. Багато мов питає, з якого боку: турецьке amca і dayı, арабське عم і خال, гінді चाचा і मामा, фінське setä і eno. В англійській, французькій і російській для обох одне слово. Де мова їх розрізняє, мапа показує брата батька, а в примітці подано брата матері.",
    ar: "العم والخال — أخو أحد الوالدين. تسأل لغات كثيرة من أي جهة: التركية amca وdayı، والعربية عم وخال، والهندية चाचा وमामा، والفنلندية setä وeno. وللإنجليزية والفرنسية والروسية كلمة واحدة لكليهما. وحيث تفرق اللغة بينهما تعرض الخريطة أخا الأب، وتذكر الحاشية أخا الأم.",
    he: "דוד — אח של אחד ההורים. שפות רבות שואלות מאיזה צד: הטורקית amca ו־dayı, הערבית عم ו־خال, ההינדית चाचा ו־मामा, הפינית setä ו־eno. באנגלית, בצרפתית וברוסית יש מילה אחת לשניהם. בשפה שמבחינה ביניהם, המפה מציגה את אחי האב, וההערה נותנת את אחי האם.",
    sw: "Ami / mjomba — kaka wa mzazi. Lugha nyingi huuliza ni upande gani: Kituruki amca na dayı, Kiarabu عم na خال, Kihindi चाचा na मामा, Kifini setä na eno. Kiingereza, Kifaransa na Kirusi vina neno moja kwa wote wawili. Pale lugha inapowatenganisha, ramani inaonyesha kaka wa baba, na maelezo yanampa kaka wa mama.",
  },
  family: {
    aa: "split",
    aau: "split",
    ady: "split",
    af: "one",
    agx: "one",
    ami: "unknown",
    aqc: "unknown",
    ar: "split",
    ar_eg: "split",
    arn: "split",
    ast: "unknown",
    az: "split",
    ban: "one",
    be: "one",
    bew: "unknown",
    bg: "split",
    bi: "unknown",
    bn: "split",
    br: "one",
    ca: "one",
    cab: "unknown",
    cbk: "one",
    ceb: "one",
    chb: "split",
    ckb: "split",
    cng: "split",
    cs: "one",
    csb: "unknown",
    cv: "split",
    cy: "one",
    da: "one",
    dar: "split",
    de: "one",
    dv: "unknown",
    egl: "unknown",
    el: "one",
    en: "one",
    enm: "one",
    eo: "unknown",
    es: "one",
    et: "unknown",
    eu: "one",
    eve: "unknown",
    fa: "split",
    fi: "split",
    fr: "one",
    frr: "unknown",
    ga: "unknown",
    gl: "unknown",
    gmh: "split",
    goh: "split",
    grt: "split",
    gv: "unknown",
    haw: "unknown",
    he: "unknown",
    hi: "split",
    ht: "unknown",
    hy: "split",
    ia: "unknown",
    iba: "one",
    id: "one",
    ik: "split",
    ilo: "one",
    io: "unknown",
    is: "split",
    it: "one",
    ja: "one",
    ka: "unknown",
    kab: "unknown",
    kea: "unknown",
    kgp: "split",
    kha: "split",
    khb: "unknown",
    ko: "split",
    kpv: "split",
    ks: "split",
    kw: "one",
    lb: "unknown",
    lez: "split",
    lij: "unknown",
    liv: "split",
    lt: "one",
    ltg: "unknown",
    lv: "one",
    mak: "unknown",
    mbc: "split",
    mch: "split",
    mfe: "one",
    mk: "split",
    ml: "split",
    mnc: "split",
    mr: "split",
    mra: "one",
    mt: "split",
    mui: "unknown",
    nap: "unknown",
    nci: "one",
    ne: "split",
    nl: "one",
    nn: "unknown",
    no: "split",
    olo: "unknown",
    om: "unknown",
    or: "split",
    pam: "one",
    pbb: "split",
    pdc: "unknown",
    pjt: "split",
    pl: "split",
    pms: "unknown",
    prg: "unknown",
    pt: "one",
    rgn: "unknown",
    rmy: "unknown",
    ro: "one",
    rom: "unknown",
    ru: "one",
    rue: "unknown",
    rut: "split",
    rw: "split",
    sa: "split",
    sc: "unknown",
    scn: "unknown",
    sd: "split",
    se: "split",
    sid: "split",
    sjd: "split",
    sk: "split",
    slr: "split",
    srn: "unknown",
    stq: "one",
    su: "one",
    sv: "split",
    sw: "split",
    syc: "split",
    szy: "unknown",
    ta: "split",
    tab: "split",
    tao: "one",
    te: "split",
    tg: "split",
    tk: "split",
    tl: "one",
    tly: "split",
    tpi: "unknown",
    tr: "split",
    tsj: "split",
    udm: "split",
    uk: "one",
    ur: "split",
    vi: "split",
    vo: "unknown",
    vot: "unknown",
    wa: "one",
    yrl: "unknown",
    yue: "split",
    yur: "one",
    zh: "split",
    zza: "split",
    ha: "split",
    ee: "split",
    so: "split",
    la: "split",
    ota: "split",
    aii: "split",
    sco: "one",
    ps: "split",
    lo: "unknown",
    am: "unknown",
    djk: "unknown",
    sq: "split",
    nrf: "one",
    rm: "one",
    fy: "one",
    gd: "split",
    ang: "split",
    as: "split",
    oc: "one",
    yi: "one",
    crh: "split",
    sl: "split",
    bo: "split",
    pdt: "unknown",
    nv: "split",
    mn: "split",
    mi: "one",
    fur: "unknown",
    fro: "unknown",
    pap: "unknown",
    my: "split",
    th: "split",
    shn: "unknown",
    gld: "split",
    hu: "one",
    nrf_gg: "one",
    osp: "one",
    roo: "unknown",
    koi: "unknown",
    jv: "one",
    wo: "unknown",
    nio: "one",
    mnw: "one",
    kok: "split",
    ain: "unknown",
    war: "unknown",
    niv: "unknown",
    ln: "unknown",
    ksw: "unknown",
    ket: "one",
    szl: "one",
    yux: "one",
    km: "unknown",
    gu: "split",
    sah: "unknown",
    lzz: "unknown",
    ykg: "unknown",
    brh: "one",
    mdr: "unknown",
    sce: "split",
    swi: "split",
    ku: "split",
    tyz: "split",
    es_cr: "one",
    es_hn: "one",
    es_ni: "one",
    es_sv: "one",
    fr_lu: "one",
    fr_cm: "one",
    de_lu: "one",
    en_ng2: "one",
    es_bo: "one",
    es_py: "one",
    es_pa: "one",
    en_my: "one",
    en_wls: "one",
    en_jam: "one",
    en_ke: "one",
    fr_sn: "one",
    fr_ci: "one",
    fr_ht: "one",
    pt_mz: "one",
    nl_be: "one",
    en_za: "one",
    de_ch: "one",
    pt_ao: "one",
    ca_va: "one",
    ja_osa: "one",
    ja_aom: "one",
    ja_hak: "one",
    ja_kyo: "one",
    ja_hir: "one",
    ko_kp: "split",
    ko_bus: "split",
    ko_yb: "split",
    es_mx: "one",
    pt_br: "one",
    hyw: "split",
    en_aave: "one",
    en_nz: "one",
    en_au: "one",
    de_at: "one",
    smj: "split",
    en_south: "one",
    en_in: "one",
    en_ie: "one",
    en_sco: "one",
    en_yk: "one",
    en_brum: "one",
    en_wc: "one",
    en_est: "one",
    en_sg: "one",
    fr_qc: "one",
    fr_af: "one",
    fr_be: "one",
    fr_ch: "one",
    es_co: "one",
    es_cl: "one",
    es_ar: "one",
    es_cu: "one",
    es_pe: "one",
    es_an: "one",
    ko_hg: "split",
    ko_jl: "split",
    lij_t: "unknown",
    es_pr: "one",
    es_do: "one",
    es_gt: "one",
    es_ec: "one",
    es_uy: "one",
    es_ve: "one",
    ms: "unknown",
  },
  routes: {
    split: {"color":"#db2777","emoji":"↔️","en":"father's brother ≠ mother's brother","ja":"父の兄弟と母の兄弟で別の語","ko":"아버지의 형제와 어머니의 형제가 다른 낱말","zh":"父亲的兄弟和母亲的兄弟用不同的词","yue":"老豆嘅兄弟同阿媽嘅兄弟用唔同嘅詞","vi":"anh em của cha ≠ anh em của mẹ","th":"พี่น้องชายของพ่อกับของแม่เป็นคนละคำ","id":"saudara ayah ≠ saudara ibu","hi":"पिता का भाई ≠ माँ का भाई","de":"Bruder des Vaters ≠ Bruder der Mutter","fr":"frère du père ≠ frère de la mère","it":"fratello del padre ≠ fratello della madre","es":"hermano del padre ≠ hermano de la madre","pt":"irmão do pai ≠ irmão da mãe","ru":"брат отца ≠ брат матери","uk":"брат батька ≠ брат матері","ar":"أخو الأب ≠ أخو الأم","he":"אחי האב ≠ אחי האם","sw":"kaka wa baba ≠ kaka wa mama"},
    one: {"color":"#2563eb","emoji":"👨","en":"one word for both","ja":"両方に一語","ko":"양쪽에 한 낱말","zh":"两边同一个词","yue":"兩邊同一個詞","vi":"một từ cho cả hai","th":"คำเดียวทั้งสองฝ่าย","id":"satu kata untuk keduanya","hi":"दोनों के लिए एक शब्द","de":"ein Wort für beide","fr":"un seul mot pour les deux","it":"una parola per entrambi","es":"una palabra para ambos","pt":"uma palavra para os dois","ru":"одно слово для обоих","uk":"одне слово для обох","ar":"كلمة واحدة لكليهما","he":"מילה אחת לשניהם","sw":"neno moja kwa wote wawili"},
    unknown: {"color":"#b45309","emoji":"❓","en":"not yet determined · needs a source","ja":"未判定 · 出典待ち","ko":"미판정 · 출처 필요","zh":"尚未判定 · 待查证","yue":"重未判定 · 等考證","vi":"chưa xác định · cần nguồn","th":"ยังไม่ระบุ · รอแหล่งอ้างอิง","id":"belum ditentukan · perlu sumber","hi":"अनिर्धारित · स्रोत चाहिए","de":"noch offen · Beleg fehlt","fr":"non déterminé · source manquante","it":"non determinato · manca la fonte","es":"sin determinar · falta la fuente","pt":"por determinar · falta a fonte","ru":"не определено · нужен источник","uk":"не визначено · потрібне джерело","ar":"لم يُحدَّد بعد · بحاجة إلى مصدر","he":"טרם נקבע · דרוש מקור","sw":"haijabainishwa · chanzo kinahitajika"},
  },
  data: {
    aa: ["qammi", "ˈʕamːi"],  // Father's brother; mother's brother is abu.
    aau: ["aio", "ˈaio"],  // Father's brother; mother's brother is kam.
    ady: ["ятэш", "jaːtaʃ"],  // Father's brother; mother's brother is янэш.
    af: ["oom", "ʊəm"],
    agx: ["адад", "adad"],
    ami: ["faki", "faki"],
    aqc: ["дада", "dada"],  // Father's brother; mother's brother is дада.
    ar: ["عم", "ʕamm"],  // Father's brother; mother's brother is خال.
    ar_eg: ["عم", "ʕamm"],  // Father's brother; mother's brother is خال.
    arn: ["malʸe", "malʸe"],  // Father's brother; mother's brother is weku.
    ast: ["tíu", "ˈtiu"],
    az: ["əmi", "æˈmi"],  // Father's brother; mother's brother is dayı.
    ban: ["rama", "ramə"],
    be: ["дзядзька", "ˈdzʲatsʲka"],
    bew: ["enciʼ", "ənˈtɕiʔ"],
    bg: ["чичо", "ˈtʃitʃo̟"],  // Father's brother; mother's brother is вуйчо.
    bi: ["angkel", "anɡkel"],
    bn: ["চাচা", "tʃatʃa"],  // Father's brother; mother's brother is মামা.
    br: ["eontr", "ˈẽwntʁ"],
    ca: ["tio", "ˈtiu"],
    cab: ["iyawürite", "iˈjawɨrite"],
    cbk: ["tio", "ˈtio"],
    ceb: ["tito", "tito"],
    chb: ["zepaba", "zepaba"],  // Father's brother; mother's brother is zuecha.
    ckb: ["مام", "maːm"],  // Father's brother; mother's brother is خاڵ.
    cng: ["e tɕi", "etɕi"],  // Father's brother; mother's brother is ə ku.
    cs: ["strýc", "striːts"],
    csb: ["wùja", "ˈwuja"],
    cv: ["мучи", "muˈdʑɪ"],  // Father's brother; mother's brother is кукка.
    cy: ["ewythr", "ˈɛu̯ɨ̞θr"],
    da: ["onkel", "ˈɔŋˀkəl"],
    dar: ["адавдзи", "adawdzi"],  // Father's brother; mother's brother is абдзи.
    de: ["Onkel", "ˈɔŋkl̩"],
    dv: ["ބޮޑުބޭބެ", "boɖubeːbe"],
    egl: ["zién", "θjeŋ"],
    el: ["θείος", "ˈθios"],
    en: ["uncle", "ˈʌŋkəl"],
    enm: ["uncle", "ˈunklə"],
    eo: ["onklo", "ˈonklo"],
    es: ["tío", "ˈtio"],
    et: ["onu", "ˈonu"],
    eu: ["osaba", "os̺aba"],
    eve: ["этэ", "ətə"],
    fa: ["عمو", "ʔaˈmoː"],  // Father's brother; mother's brother is دایی.
    fi: ["setä", "ˈsetæ"],  // Father's brother; mother's brother is eno.
    fr: ["oncle", "ɔ̃kl"],
    frr: ["Oom", "oːm"],
    ga: ["uncail", "ˈuːŋkəlʲ"],
    gl: ["tío", "ˈtio"],
    gmh: ["vetere", "vetere"],  // Father's brother; mother's brother is ōheim.
    goh: ["fetiro", "fetiro"],  // Father's brother; mother's brother is ōheim.
    grt: ["awang", "awanɡ"],  // Father's brother; mother's brother is mama.
    gv: ["naim", "neːm"],
    haw: ["ʻanakala", "ʔanakala"],
    he: ["דוד", "dod"],
    hi: ["चाचा", "tʃɑːtʃɑː"],  // Father's brother; mother's brother is मामा.
    ht: ["tonton", "tɔ̃tɔ̃"],
    hy: ["հորեղբայր", "hoɾeχˈpɑjɾ"],  // Father's brother; mother's brother is քեռի.
    ia: ["oncle", "onkle"],
    iba: ["aya", "ajaʔ"],
    id: ["paman", "ˈpaman"],
    ik: ["akkak", "akkak"],  // Father's brother; mother's brother is aŋatchiaq.
    ilo: ["tio", "ˈtijo"],
    io: ["onklulo", "onklulo"],
    is: ["föðurbróðir", "ˈfœːðʏrˌprouːðɪr"],  // Father's brother; mother's brother is móðurbróðir.
    it: ["zio", "ˈtsio"],
    ja: ["叔父", "odʑi"],
    ka: ["ბიძა", "b̥idzä"],
    kab: ["zizi", "zizi"],
    kea: ["tiu", "tiu"],
    kgp: ["yɔŋ", "yɔŋ"],  // Father's brother; mother's brother is kakrã.
    kha: ["kpa-nah", "kpa-nah"],  // Father's brother; mother's brother is ma-rit.
    khb: ["ᦟᦳᧂ", "luŋ˥˩"],
    ko: ["삼촌", "samtɕʰon"],  // Father's brother; mother's brother is 외삼촌.
    kpv: ["унай", "ˈunaj"],  // Father's brother; mother's brother is чож.
    ks: ["پیٔتٕر", "pjətɨr"],  // Father's brother; mother's brother is مام.
    kw: ["ewnter", "ˈɛʊntɛr"],
    lb: ["Monni", "ˈmoni"],
    lez: ["ими", "imi"],  // Father's brother; mother's brother is халу.
    lij: ["bàrba", "ˈbarba"],
    liv: ["izāveļ", "ˈizɑːˌveˀʎ"],  // Father's brother; mother's brother is jemāveļ.
    lt: ["dėdė", "ˈdʲeːdʲeː"],
    ltg: ["dzjadze", "ˈdzjadzʲæ"],
    lv: ["tēvocis", "ˈtæːvuotsis"],
    mak: ["aeng", "aˈeŋ"],
    mbc: ["papai", "papai"],  // Father's brother; mother's brother is inton.
    mch: ["ümü", "ɨmɨ"],  // Father's brother; mother's brother is wo.
    mfe: ["tonton", "tɔ̃tɔ̃"],  // From French tonton; mama is 'mother' (Wiktionary).
    mk: ["чичко", "ˈtʃitʃkɔ"],  // Father's brother; mother's brother is вујко.
    ml: ["വല്യച്ഛൻ", "ʋɐljɐtʃtʃʰɐn"],  // Father's brother; mother's brother is അമ്മാവൻ.
    mnc: ["ᠠᠮᠵᡳ", "ämtɕi"],  // Father's brother; mother's brother is ᡩᡝᡥᡝᠮᠠ.
    mr: ["काका", "kaka"],  // Father's brother; mother's brother is मामा.
    mra: ["taʔ", "taʔ"],
    mt: ["għamm", "aːmm"],  // Father's brother; mother's brother is ħal.
    mui: ["waq", "waːʔ"],
    nap: ["vuònculo", "ˈvwoŋkələ"],
    nci: ["tlahtli", "ˈtɬaʔtɬi"],
    ne: ["काका", "käkä"],  // Father's brother; mother's brother is मामा.
    nl: ["oom", "oːm"],
    nn: ["onkel", "ˈɔŋkəl"],
    no: ["farbror", "ˈfɑrbrʊr"],  // Father's brother; mother's brother is morbror.
    olo: ["diädö", "ˈdʲiæ̯dʲø"],
    om: ["eessuma", "eːsːʊmɐ"],
    or: ["କକେଇ", "kɔkei"],  // Father's brother; mother's brother is ମାମୁଁ.
    pam: ["bapa", "bapa"],
    pbb: ["yũũkwe", "jũːkwe"],  // Father's brother; mother's brother is kahka.
    pdc: ["Onkel", "ˈɔŋkəl"],
    pjt: ["mama", "ˈmɐmɐ"],  // Father's brother; mother's brother is kamuṟu.
    pl: ["stryj", "strɘj"],  // Father's brother; mother's brother is wuj.
    pms: ["barba", "barba"],
    prg: ["awis", "awis"],
    pt: ["tio", "ˈtiu"],
    rgn: ["dàdo", "dado"],
    rmy: ["kak", "kak"],  // Father's brother; mother's brother is dako pral; kak.
    ro: ["unchi", "uŋkʲ"],
    rom: ["kak", "kak"],
    ru: ["дядя", "ˈdʲædʲə"],
    rue: ["уйко", "ujko"],
    rut: ["дидды шу", "diddɨʃu"],  // Father's brother; mother's brother is гыгый.
    rw: ["so", "so"],  // Father's brother; mother's brother is marume.
    sa: ["पितृव्य", "pitr̩ʋjɐ"],  // Father's brother; mother's brother is मातुल.
    sc: ["tziu", "ˈθiu"],
    scn: ["ziu", "ˈtsiʊ"],
    sd: ["چاچو", "tʃaːtʃoː"],  // Father's brother; mother's brother is مامو.
    se: ["eahki", "ˈea̯hkiː"],  // Father's brother; mother's brother is eanu.
    sid: ["wosiila", "woˈsiːla"],  // Father's brother; mother's brother is abbo.
    sjd: ["че̄дза", "ˈtʃʲi̯edza"],  // Father's brother; mother's brother is ӣнн.
    sk: ["strýc", "striːts"],  // Father's brother; mother's brother is ujo.
    slr: ["dada", "tada"],  // Father's brother; mother's brother is bov.
    srn: ["omu", "omu"],
    stq: ["Oom", "ˈoːm"],
    su: ["ua", "ua"],
    sv: ["farbror", "ˈfarːbrur"],  // Father's brother; mother's brother is morbror.
    sw: ["ami", "ˈami"],  // Father's brother; mother's brother is mjomba.
    syc: ["ܕܕܐ", "dɑðɑ"],  // Father's brother; mother's brother is ܚܠܐ.
    szy: ["baki", "baki"],
    ta: ["பெரியப்பா", "pɛɾɪjɐpːɑː"],  // Father's brother; mother's brother is மாமா.
    tab: ["ими", "imi"],  // Father's brother; mother's brother is халу.
    tao: ["maran", "maran"],
    te: ["పెత్తండ్రి", "pet̪ːaɳɖɾi"],  // Father's brother; mother's brother is మామ.
    tg: ["амак", "aˈmak"],  // Father's brother; mother's brother is тағо.
    tk: ["aga", "ɑːˈʁɑ"],  // Father's brother; mother's brother is daýza.
    tl: ["mama", "ˈmamaʔ"],
    tly: ["amü", "amy"],  // Father's brother; mother's brother is day.
    tpi: ["ankol", "ankol"],
    tr: ["amca", "amˈdʒa"],  // Father's brother; mother's brother is dayı.
    tsj: ["ʔaptɕi", "ʔaptɕi"],  // Father's brother; mother's brother is ʔa◦dʑaŋ; ʔa◦ʑaŋ.
    udm: ["агай", "äˈɡäj"],  // Kinbank (Udmurt): father's brother agaj; mother's brother čužmurt.
    uk: ["дядько", "ˈdʲadʲkɔ"],
    ur: ["چچا", "tʃətʃɑː"],  // Father's brother; mother's brother is ماموں.
    vi: ["chú", "tɕu˧˥"],  // Father's brother; mother's brother is cậu.
    vo: ["ziom", "tsiˈom"],
    vot: ["ono", "ˈono"],
    wa: ["mononke", "mɔnɔ̃k"],
    yrl: ["tutira", "tuˈtiɾa"],
    yue: ["叔叔", "sʊk˥ sʊk˥"],  // Father's brother; mother's brother is 舅父.
    yur: ["cheemos", "tʃimɔʂ"],
    zh: ["叔叔", "ʂu˥ ʂu"],  // Father's brother; mother's brother is 舅舅.
    zza: ["ded", "dɛd"],  // Father's brother; mother's brother is daye.
    ha: ["baffa", "bafːa"],  // Father's brother; mother's brother is kawu.
    ee: ["tɔɖe", "tɔɖe"],  // Father's brother; mother's brother is wɔfa.
    so: ["adeer", "adeːr"],  // Father's brother; mother's brother is abti.
    la: ["patruus", "ˈpatruus"],  // Father's brother; mother's brother is avunculus.
    ota: ["عموجه", "amuˈdʒa"],  // Father's brother; mother's brother is دایی.
    aii: ["ܥܲܡܵܐ", "ʕamma"],  // Father's brother; mother's brother is ܚܵܠܵܐ.
    sco: ["uncle", "ˈʌŋkəl"],  // From Old French oncle; eme and mither-brither name the mother's brother only.
    ps: ["تره", "ˈtuɾa"],  // Father's brother; mother's brother is ماما.
    lo: ["ລຸງ", "luŋ˧˥"],  // A parent's older brother, from Proto-Tai *luŋ; the source gives no separate words for younger uncles to settle the side.
    am: ["ኣጎት", "ʔaɡot"],  // Glossed simply 'uncle'; the source does not say whether it covers both sides.
    djk: ["tiyu", "tiju"],  // Borrowed from Portuguese tio; omu is a synonym. The source does not say whether either names one side only.
    sq: ["xhaxha", "dʒadʒa"],  // Father's brother; mother's brother is dajë, from Ottoman Turkish dayı. The general word ungj comes from Latin avunculus.
    nrf: ["oncl'ye", "ɔ̃kʎ"],  // From Latin avunculus 'mother's brother', one word for both sides; tonton is a synonym.
    rm: ["aug", "awk"],  // One word for both sides; barba, the word for 'beard', is a synonym.
    fy: ["omke", "ˈomkə"],  // One word for both sides; the aunt is muoike.
    gd: ["bràthair-athar", "ˈpɾaːhəɾʲ ˈahəɾ"],  // Literally 'brother of the father'; the mother's brother is bràthair-màthar, and uncail is used only before names.
    ang: ["fædera", "ˈfæderɑ"],  // The father's brother; the mother's brother is ēam.
    as: ["খুৰা", "kʰuɹɑ"],  // The father's younger brother; the father's elder brother is বৰদেউতা bordeuta and the mother's brother মোমাই mümai.
    oc: ["oncle", "ˈuŋkle"],  // From Latin avunculus, one word for both sides.
    yi: ["פֿעטער", "ˈfɛtər"],  // From Old High German fetiro, once 'father's brother'; in Yiddish it is simply 'uncle'.
    crh: ["emce", "emdʒe"],  // The father's brother, like Turkish amca; the mother's brother is dayı.
    sl: ["stric", "striːts"],  // The father's brother; the mother's brother is ujec.
    bo: ["ཨ་ཁུ", "ə˥ kʰu˥"],  // The father's brother; the mother's brother is ཨ་ཞང a zhang.
    pdt: ["Onkel", "ˈɔŋkəl"],  // The entry gives one word for uncle without saying which side.
    nv: ["shizhéʼé yázhí", "ʃìʒéʔé jɑ́ʒí"],  // Literally 'my little father', the father's brother; the mother's brother is shidáʼí.
    mn: ["авга ах", "awk ax"],  // The father's brother; авга on its own means a paternal relative.
    mi: ["matua kēkē", "matua keːkeː"],  // Any sibling of a parent; kēkē, from kē 'different', marks the other line.
    fur: ["barbe", "ˈbarbe"],  // From barbe 'beard', since a beard marks a grown man, like Ligurian bàrba.
    fro: ["oncle", "ˈõnklə"],  // From Latin avunculus, which meant the mother's brother.
    pap: ["tio", "ˈtio"],  // From Portuguese tio and Spanish tío; the source gives one word without saying which side.
    my: ["ဘကြီး", "ba̰dʑí"],  // The father's elder brother; the father's youngest brother is ဘထွေး and the mother's younger brother ဦးလေး.
    th: ["ลุง", "luŋ˧"],  // The older brother of either parent; the father's younger brother is อา and the mother's younger brother น้า.
    shn: ["လုင်း", "luŋ˥"],  // A parent's older brother, from Proto-Tai *luŋ; the source gives no separate words for younger uncles to settle the side.
    gld: ["эчэкэ", "ətʃəkə"],  // The father's younger brother; the mother's younger brother is гусин.
    hu: ["nagybácsi", "ˈnɒɟbaːtʃi"],  // Literally 'big uncle'; it covers the brother of either parent.
    nrf_gg: ["aonclle", "ɔ̃kʎ"],  // From Latin avunculus 'mother's brother', now used for any uncle.
    osp: ["tio", "ˈtio"],  // From Late Latin thīus, from Greek theîos; the entry gives the one word, as in Spanish tío.
    roo: ["aite", "aite"],  // The same word as aite, 'father'; it also covers the mother's sister's husband, and the source gives no word for the mother's brother.
    koi: ["чож", "tɕoʒ"],  // From Proto-Uralic *śečä; the source gives only 'uncle' and does not say which side.
    jv: ["paklik", "paʔliʔ"],  // Short for pak cilik, 'little father': a parent's younger brother on either side (an older one is pakdhe).
    wo: ["nijjaay", "nidʒːaːj"],  // The source glosses it only as 'uncle' and does not say which side.
    nio: ["иси", "ˈisʲi"],  // A parent's older brother on either side (also a parent's older sister's husband).
    mnw: ["မူ", "mao"],  // A parent's younger brother on either side; borrowed from Burmese မူး.
    kok: ["काका", "kaːkaː"],  // Mother's brother is मामा.
    ain: ["アチャ", "atɕa"],  // The same word also means father and a middle-aged man; the source does not say which side.
    war: ["tatang", "taˈtaŋ"],  // From Philippine Spanish tata 'daddy' with the diminutive -ng.
    niv: ["ытык", "ɯtɯk"],  // The same word means father, and several in-laws; the source does not say which side.
    ln: ["noko", "noko"],  // The source does not say which side.
    ksw: ["ဖါတံၢ်", "pʰati"],  // The source gives one word, which also means a full-grown male animal, and does not say whether the two uncles are told apart.
    ket: ["беʼп", "bɛʔp"],  // One word for an elder sibling of either parent, uncle or aunt.
    szl: ["ujek", "ˈujɛk"],  // One word for the brother or brother-in-law of either parent, inherited from Old Polish ujek.
    yux: ["чаачаа", "tɕaːtɕaː"],  // One word for an elder brother of either parent; it also means elder brother.
    km: ["ពូ", "puː"],  // The source gives one word for uncle (also a pronoun for a man younger than one's parents) and does not say whether the two sides are told apart.
    gu: ["કાકો", "ˈkaːko"],  // The father's brother; the mother's brother is મામો māmo.
    sah: ["абаҕа", "abaɣa"],  // Borrowed from Middle Mongol abaqa; the source does not say whether the father's and the mother's brother are told apart.
    lzz: ["ჯუმადი", "dʒumadi"],  // Inherited from Proto-Georgian-Zan 'big brother' and glossed 'mother or father's brother'; Laz has also borrowed Turkish emuca and dayi, which keep the two sides apart.
    ykg: ["чумуочиэ", "tʃumuotʃeː"],  // The father's older brother; the father's younger brother is өчидиэ, and the source gives no word for the mother's brother.
    brh: ["الہ", "ilːa"],  // One word for the mother's and the father's brother.
    mdr: ["amanaure", "amanaure"],  // The source does not say which side it covers.
    sce: ["aba", "ɑˈpɑ"],  // The father's (younger) brother.
    swi: ["bux dic", "pu˥˧ ti˧˧"],  // The paternal uncle.
    ku: ["ap", "ɑːp"],  // The father's brother.
    tyz: ["áo", "ʔaːw˧˥"],  // The father's younger brother.
    es_cr: ["tío", "ˈtio"],
    es_hn: ["tío", "ˈtio"],
    es_ni: ["tío", "ˈtio"],
    es_sv: ["tío", "ˈtio"],
    fr_lu: ["oncle", "ɔ̃kl"],
    fr_cm: ["oncle", "ɔ̃kl"],
    de_lu: ["Onkel", "ˈɔŋkl̩"],
    en_ng2: ["uncle", "ˈʌŋkəl"],
    es_bo: ["tío", "ˈtio"],
    es_py: ["tío", "ˈtio"],
    es_pa: ["tío", "ˈtio"],
    en_my: ["uncle", "ˈaŋkəl"],
    en_wls: ["uncle", "ˈʌŋkəl"],
    en_jam: ["uncle", "ˈɵŋkəl"],
    en_ke: ["uncle", "ˈʌŋkəl"],
    fr_sn: ["oncle", "ɔ̃kl"],
    fr_ci: ["oncle", "ɔ̃kl"],
    fr_ht: ["oncle", "ɔ̃kl"],
    pt_mz: ["tio", "ˈtiu"],
    nl_be: ["oom", "oːm"],
    en_za: ["uncle", "ˈʌŋkəl"],
    de_ch: ["Onkel", "ˈɔŋkl̩"],
    pt_ao: ["tio", "ˈtiu"],
    ca_va: ["tio", "ˈtiu"],
    ja_osa: ["叔父", "odʑi"],
    ja_aom: ["叔父", "odʑi"],
    ja_hak: ["叔父", "odʑi"],
    ja_kyo: ["叔父", "odʑi"],
    ja_hir: ["叔父", "odʑi"],
    ko_kp: ["삼촌", "samtɕʰon"],
    ko_bus: ["삼촌", "samtɕʰon"],
    ko_yb: ["삼촌", "samtɕʰon"],
    es_mx: ["tío", "ˈtio"],
    pt_br: ["tio", "ˈtiu"],
    hyw: ["հորեղբայր", "hoɾɛχˈpɑjɾ"],
    en_aave: ["uncle", "ˈʌŋkəl"],
    en_nz: ["uncle", "ˈɐŋkəl"],
    en_au: ["uncle", "ˈɐŋkəl"],
    de_at: ["Onkel", "ˈɔŋkl̩"],
    smj: ["eahki", "ˈea̯hkiː"],
    en_south: ["uncle", "ˈʌŋkəl"],
    en_in: ["uncle", "ˈʌŋkəl"],
    en_ie: ["uncle", "ˈʌŋkəl"],
    en_sco: ["uncle", "ˈʌŋkəl"],
    en_yk: ["uncle", "ˈʊŋkəl"],
    en_brum: ["uncle", "ˈʊŋkəl"],
    en_wc: ["uncle", "ˈʌŋkəl"],
    en_est: ["uncle", "ˈʌŋkəl"],
    en_sg: ["uncle", "ˈaŋkəl"],
    fr_qc: ["oncle", "ɔ̃kl"],
    fr_af: ["oncle", "ɔ̃kl"],
    fr_be: ["oncle", "ɔ̃kl"],
    fr_ch: ["oncle", "ɔ̃kl"],
    es_co: ["tío", "ˈtio"],
    es_cl: ["tío", "ˈtio"],
    es_ar: ["tío", "ˈtio"],
    es_cu: ["tío", "ˈtio"],
    es_pe: ["tío", "ˈtio"],
    es_an: ["tío", "ˈtio"],
    ko_hg: ["삼촌", "samtɕʰon"],
    ko_jl: ["삼촌", "samtɕʰon"],
    lij_t: ["bàrba", "ˈbarba"],
    es_pr: ["tío", "ˈtio"],
    es_do: ["tío", "ˈtio"],
    es_gt: ["tío", "ˈtio"],
    es_ec: ["tío", "ˈtio"],
    es_uy: ["tío", "ˈtio"],
    es_ve: ["tío", "ˈtio"],
    ms: ["pak cik", "pak tʃik"],  // Wiktionary: 'uncle (parent's brother)'.
  },
};
