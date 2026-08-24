/**
 * n99 — the number 99, chosen because it is where numeral systems stop agreeing.
 *
 * PARTIAL WORD (🧪): most concepts on this map are a word. This one is a
 * structure. 99 is the smallest number that simultaneously exposes four
 * independent typological axes, which is why it beats 70, 80 or 17:
 *
 *   base          decimal 9×10+9 vs vigesimal 4×20+19
 *   transparency  within decimal, whether the decade is still 9×10 — Japanese
 *                 九十, Vietnamese chín mươi, Welsh naw deg, Icelandic níutíu all
 *                 show the ordinary word for TEN — or has fossilised into a word
 *                 of its own: English ninety, Turkish doksan, Russian девяносто,
 *                 Korean 아흔, Tamil தொண்ணூறு. The test used here is whether the
 *                 language's free word for ten is visible in the decade; Swedish
 *                 nittio and Hungarian kilencven fail it (fused suffix), Czech
 *                 devadesát and Bulgarian деветдесет pass it
 *   order         French 4×20+10+9, Basque 4×20+19, Breton 19+4×20,
 *                 German/Dutch/Arabic unit-before-ten (9-and-90)
 *   half-score    Danish halvfems is "half-fifth score", 4½×20 — a pattern
 *                 that only surfaces above 50 and so is invisible at 17 or 20
 *   subtraction   Latin undecentum and Nepali उनान्सय are both "one from a
 *                 hundred" — sharpest right below the round number
 *   opacity       Hindi निन्यानवे and Bengali নিরানব্বই cannot be decomposed at
 *                 all; Indo-Aryan memorises all hundred numerals separately
 *
 * `family` assigns each row to one of those structures and `routes` colours the
 * map by it, so the typology is legible without reading a single form — the
 * same data-only mechanism `tea` and `orange` use for their trade routes.
 *
 * COVERAGE is deliberately partial and will stay that way. `five` reaches 857
 * of 1164 rows and that is the ceiling; a great many languages have no native
 * numeral this high and borrow above 5 or 10, so the blank areas are the
 * finding, not a gap to be filled.
 *
 * SOURCING: every form here was checked against its English Wiktionary entry —
 * either the whole numeral (quatre-vingt-dix-neuf, nioghalvfems, laurogeita
 * hemeretzi, ოთხმოცდაცხრამეტი, undecentum, उनान्सय …) or, where the compound
 * has no entry of its own, both components (Korean 아흔 'ninety' + 아홉 'nine';
 * Irish nócha + naoi; Breton naontek 'nineteen' + pevar-ugent 'eighty'; Arabic
 * تسعون + تسعة). IPA follows each row's own existing conventions, read off its
 * one/two/three/five cells.
 *
 * The id is `n99`, not `99`: a numeric-looking key sorts first in JavaScript
 * object enumeration and would have been a permanent special case, and the
 * hash parser reads the word id with [a-z_]+.
 *
 * YORUBA is the one entry not taken whole from a source, and it is marked
 * `inferred` in wordEvidence so the map says so. Wikipedia's "Yoruba numerals"
 * states the rule outright — "units in 5–9 are created by subtracting from the
 * next decade" — and its table gives both the base, 100 = ọgọ́rùn-ún (20×5), and
 * an exact morphological template one decade down, 19 = ọ̀kàndínlógún (20−1).
 * Applying that productive rule to that base yields ọ̀kàndínlọ́gọ́rùn-ún. Worth
 * having because Yoruba subtracts throughout — even its 90 is 20×5−10 — and it
 * is the clearest `sub` case on the map. Replace with a directly attested form
 * if one turns up.
 *
 * STILL WANTED: Nahuatl and Yucatec Maya for `vig`, and Ainu. Wiktionary has no
 * 90/99 entries for any of them, so those need real reference grammars.
 */
WORDS.n99 = {
  partial: true,
  emoji: "🔢",
  // The selector builds its own "local / English" pair (rebuildWordSelect:
  // localWord + ' / ' + label.en), so the label must NOT already contain both —
  // putting "99 / Ninety-nine" in every key rendered as
  // "99 / Ninety-nine / 99 / Ninety-nine" in the Japanese UI.
  //
  // So: the digits are the local name in all 22 non-English UIs, and English
  // carries the word. Every non-English selector row then reads exactly
  // "99 / Ninety-nine", and the English one reads "Ninety-nine", beside "一 / One"
  // and "One". This is the one label that is not translated — the concept IS a
  // number and the digits carry it in every writing system — and it keeps the
  // modal's concept column at two characters instead of the twenty-three that
  // "Sembilan puluh sembilan" needed.
  label: {
    en: "Ninety-nine",
    ja: "99", ko: "99", zh: "99", yue: "99", vi: "99", th: "99", id: "99",
    hi: "99", de: "99", fr: "99", it: "99", es: "99", es_eu: "99", es_mx: "99",
    pt: "99", pt_eu: "99", pt_br: "99", ru: "99", uk: "99", ar: "99",
    he: "99", sw: "99"
  },
  definition: {
    en: "The number 99 — chosen because it is where numeral systems stop agreeing: base ten against base twenty, tens-first against units-first, Danish half-scores, subtraction from a hundred, and numerals too opaque to decompose at all. Within base ten it splits again, on whether the decade is still nine times ten or has fossilised into a word of its own.",
    ja: "数の99。数詞の体系が最も食い違う数だから選んだ——10進と20進、十の位が先か一の位が先か、デンマーク語の「半分の score」、100からの引き算、そして分解できないほど不透明な数詞。10進の内部でもさらに分かれる——十位が「9×10」と透けて見えるか、独立した語に固まっているか。",
    ko: "숫자 99. 수사 체계가 가장 크게 갈리는 수여서 골랐다 — 십진법과 이십진법, 십의 자리가 먼저인가 일의 자리가 먼저인가, 덴마크어의 반(半) 스코어, 100에서 빼기, 그리고 아예 분해되지 않는 수사. 십진법 안에서도 다시 갈린다 — 십의 자리가 여전히 9×10인지, 독립된 낱말로 굳었는지.",
    zh: "数字99。选它是因为这是各语言数词体系分歧最大的数——十进制与二十进制、十位在前还是个位在前、丹麦语的「半个二十」、从一百中减去，以及根本无法拆解的数词。在十进制内部还会再分——十位究竟仍是9×10，还是已固化为独立的词。",
    yue: "數字99。揀佢係因為呢個數最能顯示數詞體系嘅分歧——十進制同二十進制、十位定個位喺前、丹麥語嘅「半個二十」、由一百減出嚟，同埋完全拆唔開嘅數詞。喺十進制入面仲會再分——十位究竟仲係9×10，定係已經固化成獨立嘅詞。",
    vi: "Số 99 — được chọn vì đây là nơi các hệ đếm khác nhau nhất: cơ số mười so với cơ số hai mươi, hàng chục trước hay hàng đơn vị trước, lối đếm nửa-score của tiếng Đan Mạch, phép trừ từ một trăm, và những số từ không thể phân tích. Trong hệ cơ số mười nó lại chia tiếp: hàng chục còn là 9×10 hay đã hoá thạch thành một từ riêng.",
    th: "เลข 99 — เลือกเพราะเป็นจุดที่ระบบเลขของภาษาต่าง ๆ ต่างกันมากที่สุด: ฐานสิบกับฐานยี่สิบ หลักสิบมาก่อนหรือหลักหน่วยมาก่อน ระบบครึ่งยี่สิบของเดนมาร์ก การลบจากหนึ่งร้อย และคำเลขที่แยกส่วนไม่ได้เลย ภายในฐานสิบยังแยกอีกชั้น — หลักสิบยังเป็น 9×10 อยู่ หรือกลายเป็นคำเฉพาะไปแล้ว",
    id: "Angka 99 — dipilih karena di sinilah sistem bilangan paling berbeda: basis sepuluh melawan basis dua puluh, puluhan dulu atau satuan dulu, sistem setengah-kodi bahasa Denmark, pengurangan dari seratus, dan bilangan yang sama sekali tak terurai. Di dalam basis sepuluh ia terbelah lagi: apakah puluhan masih 9×10 atau sudah membeku menjadi kata tersendiri.",
    hi: "संख्या 99 — इसे इसलिए चुना क्योंकि यहीं अंक-प्रणालियाँ सबसे अधिक भिन्न होती हैं: दशमलव बनाम बीस का आधार, दहाई पहले या इकाई पहले, डेनिश का आधा-बीस, सौ में से घटाना, और वे अंक जो बिल्कुल विश्लेषित नहीं होते। दशमलव के भीतर यह फिर बँटता है — दहाई अब भी 9×10 है, या अपने ही एक शब्द में जम चुकी है।",
    de: "Die Zahl 99 — gewählt, weil hier die Zahlsysteme am weitesten auseinandergehen: Zehnerbasis gegen Zwanzigerbasis, Zehner zuerst oder Einer zuerst, das dänische Halb-Schock, Subtraktion von hundert und Zahlwörter, die sich gar nicht zerlegen lassen. Innerhalb der Zehnerbasis teilt es sich noch einmal: ob der Zehner noch 9×10 ist oder zu einem eigenen Wort erstarrt ist.",
    fr: "Le nombre 99 — choisi parce que c'est là que les systèmes de numération divergent le plus : base dix contre base vingt, dizaines d'abord ou unités d'abord, les demi-vingtaines danoises, la soustraction à partir de cent, et des numéraux impossibles à décomposer. À l'intérieur de la base dix, il se divise encore : la dizaine reste-t-elle 9×10, ou s'est-elle figée en un mot propre ?",
    it: "Il numero 99 — scelto perché è qui che i sistemi di numerazione divergono di più: base dieci contro base venti, decine prima o unità prima, le mezze ventine danesi, la sottrazione da cento e numerali del tutto indecomponibili. Dentro la base dieci si divide ancora: se la decina è tuttora 9×10 o si è fossilizzata in una parola propria.",
    es: "El número 99 — elegido porque es donde más divergen los sistemas de numeración: base diez frente a base veinte, decenas primero o unidades primero, las medias veintenas danesas, la resta a partir de cien y numerales imposibles de descomponer. Dentro de la base diez vuelve a dividirse: si la decena sigue siendo 9×10 o se ha fosilizado en una palabra propia.",
    es_eu: "El número 99 — elegido porque es donde más divergen los sistemas de numeración: base diez frente a base veinte, decenas primero o unidades primero, las medias veintenas danesas, la resta a partir de cien y numerales imposibles de descomponer. Dentro de la base diez vuelve a dividirse: si la decena sigue siendo 9×10 o se ha fosilizado en una palabra propia.",
    es_mx: "El número 99 — elegido porque es donde más divergen los sistemas de numeración: base diez frente a base veinte, decenas primero o unidades primero, las medias veintenas danesas, la resta a partir de cien y numerales imposibles de descomponer. Dentro de la base diez vuelve a dividirse: si la decena sigue siendo 9×10 o se ha fosilizado en una palabra propia.",
    pt: "O número 99 — escolhido porque é onde os sistemas de numeração mais divergem: base dez contra base vinte, dezenas primeiro ou unidades primeiro, as meias vintenas dinamarquesas, a subtração a partir de cem e numerais impossíveis de decompor. Dentro da base dez divide-se outra vez: se a dezena ainda é 9×10 ou se fossilizou numa palavra própria.",
    pt_eu: "O número 99 — escolhido porque é onde os sistemas de numeração mais divergem: base dez contra base vinte, dezenas primeiro ou unidades primeiro, as meias vintenas dinamarquesas, a subtração a partir de cem e numerais impossíveis de decompor. Dentro da base dez divide-se outra vez: se a dezena ainda é 9×10 ou se fossilizou numa palavra própria.",
    pt_br: "O número 99 — escolhido porque é onde os sistemas de numeração mais divergem: base dez contra base vinte, dezenas primeiro ou unidades primeiro, as meias vintenas dinamarquesas, a subtração a partir de cem e numerais impossíveis de decompor. Dentro da base dez divide-se outra vez: se a dezena ainda é 9×10 ou se fossilizou numa palavra própria.",
    ru: "Число 99 — выбрано потому, что именно здесь системы счисления расходятся сильнее всего: десятичная против двадцатеричной, десятки впереди или единицы впереди, датские полудвадцатки, вычитание из ста и числительные, которые вообще не раскладываются. Внутри десятичной системы деление идёт снова: остаётся ли десяток 9×10 или окаменел в отдельное слово.",
    uk: "Число 99 — вибране тому, що саме тут системи числення розходяться найдужче: десяткова проти двадцяткової, десятки спереду чи одиниці спереду, данські піводвадцятки, віднімання від ста і числівники, які взагалі не розкладаються. Усередині десяткової системи поділ триває: чи лишається десяток 9×10, чи скам'янів в окреме слово.",
    ar: "العدد ٩٩ — اختير لأنه الموضع الذي تتباعد فيه أنظمة العدّ أكثر ما يكون: الأساس العشري في مقابل العشريني، العشرات أولًا أو الآحاد أولًا، أنصاف العشرينات الدنماركية، الطرح من المئة، وأعداد لا تقبل التحليل أصلًا. وداخل الأساس العشري ينقسم مرة أخرى: هل ما زالت العشرات ٩×١٠ أم تحجّرت في كلمة مستقلة.",
    he: "המספר 99 — נבחר משום שכאן מערכות הספירה נבדלות זו מזו יותר מכל: בסיס עשר מול בסיס עשרים, עשרות תחילה או יחידות תחילה, חצאי־העשרים הדניים, חיסור ממאה, ומספרים שאינם ניתנים לפירוק כלל. ובתוך הבסיס העשרוני הוא נחלק שוב: האם העשרות עדיין 9×10 או שהתאבנו למילה נפרדת.",
    sw: "Namba 99 — imechaguliwa kwa sababu hapa ndipo mifumo ya kuhesabu inatofautiana zaidi: msingi wa kumi dhidi ya msingi wa ishirini, makumi kwanza au mamoja kwanza, nusu-ishirini za Kidenmaki, kutoa kutoka mia, na namba zisizoweza kuchambuliwa kabisa. Ndani ya msingi wa kumi hugawanyika tena: kama makumi bado ni 9×10 au yameganda kuwa neno lake."
  },
  // Which structure each row uses. Colours the map; see `routes` below.
  family: {
    // 90 + 9, where the decade is its own word — fossilised (ninety, noventa,
    // ενενήντα), fused (doksan, nittio) or wholly suppletive (девяносто, 아흔,
    // ерэн, தொண்ணூறு). Hebrew תשעים belongs here too, though by a third route
    // again: Semitic decades are the PLURAL of the unit, "nines".
    en: "dec", es: "dec", it: "dec", sv: "dec", fr_be: "dec", ga: "dec",
    ko: "dec", sw: "dec", ru: "dec", uk: "dec", tr: "dec", kk: "dec",
    hu: "dec", el: "dec", hy: "dec", mn: "dec", fa: "dec", he: "dec", ta: "dec",
    // 9 × 10 + 9, with the language's ordinary word for TEN still visible in
    // the decade: 九(9)十(10)九, chín mươi chín, เก้าสิบเก้า, naw deg naw,
    // sembilan puluh sembilan, yhdeksän-kymmentä, níu-tíu, nëntë-dhjetë.
    ja: "mult", zh: "mult", vi: "mult", th: "mult", ms: "mult", id: "mult",
    fi: "mult", cy: "mult", tl: "mult", is: "mult", lt: "mult", cs: "mult",
    pl: "mult", bg: "mult", sq: "mult", ro: "mult",
    de: "unit", nl: "unit", ar: "unit",
    fr: "vig", eu: "vig", ka: "vig", br: "vig",
    da: "half",
    la: "sub", ne: "sub", yo: "sub",
    km: "quin", wo: "quin",
    hi: "opaque", bn: "opaque", ur: "opaque"
  },
  routes: {
    dec: {
      color: "#0e7490", emoji: "🔟",
      en: "decade word · 90 + 9", ja: "十位が独立語 · 90＋9",
      ko: "십의 자리가 독립어 · 90 + 9", zh: "十位为独立词 · 90＋9",
      yue: "十位係獨立詞 · 90＋9", vi: "từ riêng cho hàng chục · 90 + 9",
      th: "คำเฉพาะของหลักสิบ · 90 + 9", id: "kata puluhan tersendiri · 90 + 9",
      hi: "दहाई का अलग शब्द · 90 + 9", de: "eigenes Zehnerwort · 90 + 9",
      fr: "mot de dizaine propre · 90 + 9", it: "parola propria per la decina · 90 + 9",
      es: "palabra propia de decena · 90 + 9", pt: "palavra própria da dezena · 90 + 9",
      ru: "отдельное слово десятка · 90 + 9", uk: "окреме слово десятка · 90 + 9",
      ar: "كلمة مستقلة للعشرات · ٩٠ + ٩", he: "מילה נפרדת לעשרות · 90 + 9",
      sw: "neno lake la makumi · 90 + 9"
    },
    mult: {
      color: "#2563eb", emoji: "✖️",
      en: "transparent · 9×10 + 9", ja: "透明な10進 · 9×10＋9",
      ko: "투명한 십진 · 9×10 + 9", zh: "透明十进 · 9×10＋9",
      yue: "透明十進 · 9×10＋9", vi: "minh bạch · 9×10 + 9",
      th: "โปร่งใส · 9×10 + 9", id: "transparan · 9×10 + 9",
      hi: "पारदर्शी · 9×10 + 9", de: "transparent · 9×10 + 9",
      fr: "transparent · 9×10 + 9", it: "trasparente · 9×10 + 9",
      es: "transparente · 9×10 + 9", pt: "transparente · 9×10 + 9",
      ru: "прозрачная · 9×10 + 9", uk: "прозора · 9×10 + 9",
      ar: "شفاف · ٩×١٠ + ٩", he: "שקוף · 9×10 + 9", sw: "wazi · 9×10 + 9"
    },
    unit: {
      color: "#7c3aed", emoji: "🔄",
      en: "decimal, unit first · 9 and 90", ja: "10進・一の位が先 · 9と90",
      ko: "십진, 일의 자리 먼저 · 9와 90", zh: "十进，个位在前 · 9和90",
      yue: "十進，個位喺前 · 9同90", vi: "thập phân, đơn vị trước · 9 và 90",
      th: "ฐานสิบ หลักหน่วยก่อน · 9 และ 90", id: "desimal, satuan dulu · 9 dan 90",
      hi: "दशमलव, इकाई पहले · 9 और 90", de: "dezimal, Einer zuerst · 9 und 90",
      fr: "décimal, unités d'abord · 9 et 90", it: "decimale, unità prima · 9 e 90",
      es: "decimal, unidades primero · 9 y 90", pt: "decimal, unidades primeiro · 9 e 90",
      ru: "десятичная, единицы впереди · 9 и 90", uk: "десяткова, одиниці спереду · 9 і 90",
      ar: "عشري، الآحاد أولًا · ٩ و٩٠", he: "עשרוני, יחידות תחילה · 9 ו־90",
      sw: "desimali, mamoja kwanza · 9 na 90"
    },
    vig: {
      color: "#b45309", emoji: "2️⃣",
      en: "vigesimal · 4×20 + 19", ja: "20進 · 4×20＋19", ko: "이십진 · 4×20 + 19",
      zh: "二十进 · 4×20＋19", yue: "二十進 · 4×20＋19", vi: "nhị thập phân · 4×20 + 19",
      th: "ฐานยี่สิบ · 4×20 + 19", id: "vigesimal · 4×20 + 19", hi: "बीस-आधारित · 4×20 + 19",
      de: "vigesimal · 4×20 + 19", fr: "vicésimal · 4×20 + 19", it: "vigesimale · 4×20 + 19",
      es: "vigesimal · 4×20 + 19", pt: "vigesimal · 4×20 + 19",
      ru: "двадцатеричная · 4×20 + 19", uk: "двадцяткова · 4×20 + 19",
      ar: "عشريني · ٤×٢٠ + ١٩", he: "עשריני · 4×20 + 19", sw: "vigesimali · 4×20 + 19"
    },
    half: {
      color: "#be123c", emoji: "🇩🇰",
      en: "half-score · 9 + 4½×20", ja: "半分の20進 · 9＋4½×20",
      ko: "반(半) 스코어 · 9 + 4½×20", zh: "半二十 · 9＋4½×20", yue: "半二十 · 9＋4½×20",
      vi: "nửa-score · 9 + 4½×20", th: "ครึ่งยี่สิบ · 9 + 4½×20",
      id: "setengah-kodi · 9 + 4½×20", hi: "आधा-बीस · 9 + 4½×20",
      de: "Halb-Schock · 9 + 4½×20", fr: "demi-vingtaine · 9 + 4½×20",
      it: "mezza ventina · 9 + 4½×20", es: "media veintena · 9 + 4½×20",
      pt: "meia vintena · 9 + 4½×20", ru: "полудвадцатка · 9 + 4½×20",
      uk: "піводвадцятка · 9 + 4½×20", ar: "نصف عشرينية · ٩ + ٤½×٢٠",
      he: "חצי־עשרים · 9 + 4½×20", sw: "nusu-ishirini · 9 + 4½×20"
    },
    quin: {
      color: "#0891b2", emoji: "🖐️",
      en: "quinary nine · 90 + (5+4)", ja: "5進の9 · 90＋(5＋4)",
      ko: "오진법의 9 · 90 + (5+4)", zh: "五进的9 · 90＋(5＋4)",
      yue: "五進嘅9 · 90＋(5＋4)", vi: "số 9 ngũ phân · 90 + (5+4)",
      th: "เก้าฐานห้า · 90 + (5+4)", id: "sembilan kuiner · 90 + (5+4)",
      hi: "पाँच-आधारित नौ · 90 + (5+4)", de: "quinäre Neun · 90 + (5+4)",
      fr: "neuf quinaire · 90 + (5+4)", it: "nove quinario · 90 + (5+4)",
      es: "nueve quinario · 90 + (5+4)", pt: "nove quinário · 90 + (5+4)",
      ru: "пятеричная девятка · 90 + (5+4)", uk: "п'ятіркова дев'ятка · 90 + (5+4)",
      ar: "تسعة خماسية · ٩٠ + (٥+٤)", he: "תשע חמישונית · 90 + (5+4)",
      sw: "tisa ya tano · 90 + (5+4)"
    },
    sub: {
      color: "#15803d", emoji: "➖",
      en: "subtractive · 100 − 1", ja: "減算 · 100−1", ko: "감산 · 100 − 1",
      zh: "减法 · 100−1", yue: "減法 · 100−1", vi: "phép trừ · 100 − 1",
      th: "การลบ · 100 − 1", id: "pengurangan · 100 − 1", hi: "घटाव · 100 − 1",
      de: "subtraktiv · 100 − 1", fr: "soustractif · 100 − 1", it: "sottrattivo · 100 − 1",
      es: "sustractivo · 100 − 1", pt: "subtrativo · 100 − 1",
      ru: "вычитание · 100 − 1", uk: "віднімання · 100 − 1", ar: "طرحي · ١٠٠ − ١",
      he: "חיסורי · 100 − 1", sw: "kutoa · 100 − 1"
    },
    opaque: {
      color: "#6b7280", emoji: "❓",
      en: "opaque · not decomposable", ja: "不透明 · 分解できない",
      ko: "불투명 · 분해 불가", zh: "不透明 · 无法拆解", yue: "不透明 · 拆唔開",
      vi: "không phân tích được", th: "ทึบ · แยกส่วนไม่ได้",
      id: "opak · tak terurai", hi: "अपारदर्शी · अविभाज्य",
      de: "undurchsichtig · nicht zerlegbar", fr: "opaque · indécomposable",
      it: "opaco · indecomponibile", es: "opaco · indescomponible",
      pt: "opaco · indecomponível", ru: "непрозрачное · не разлагается",
      uk: "непрозоре · не розкладається", ar: "غير قابل للتحليل",
      he: "אטום · לא ניתן לפירוק", sw: "isiyoeleweka · haigawanyiki"
    }
  },
  data: {
    en:    ["ninety-nine", "ˈnaɪnti ˈnaɪn"],
    de:    ["neunundneunzig", "ˈnɔʏnʊntˌnɔʏntsɪç"],
    nl:    ["negenennegentig", "ˈneːɣənənˌneːɣəntəx"],
    fr:    ["quatre-vingt-dix-neuf", "katʁəvɛ̃disnœf"],
    fr_be: ["nonante-neuf", "nɔnɑ̃tnœf"],
    es:    ["noventa y nueve", "noˈβenta i ˈnweβe"],
    it:    ["novantanove", "novantaˈnove"],
    da:    ["nioghalvfems", "ˈniɔhalˀfɛms"],
    sv:    ["nittionio", "ˈnɪtːiuˌniːu"],
    is:    ["níutíu og níu", "ˈniːʏtʰiːʏ ɔɣ ˈniːʏ"],
    eu:    ["laurogeita hemeretzi", "lauɾoɣeita emeɾetsi"],
    ka:    ["ოთხმოცდაცხრამეტი", "otʰxmotsdatsxɾametʰi"],
    cy:    ["naw deg naw", "nau dɛɡ nau"],
    br:    ["naontek ha pevar-ugent", "nãwntek a pewaɾˈyːɡɛn"],
    ga:    ["nócha a naoi", "ˈn̪ˠoːxə ə ˈn̪ˠiː"],
    ko:    ["아흔아홉", "ahɯnahop"],
    sw:    ["tisini na tisa", "tiˈsini na ˈtisa"],
    hi:    ["निन्यानवे", "ninjaːnəʋeː"],
    bn:    ["নিরানব্বই", "niranobːoi"],
    ne:    ["उनान्सय", "unaːnsʌj"],
    ja:    ["九十九", "kʲuːdʑuːkʲuː"],
    zh:    ["九十九", "tɕiou̯˨˩˦ ʂʐ̩˧˥ tɕiou̯˨˩˦"],
    vi:    ["chín mươi chín", "tɕin˧˥ mɯəj˧ tɕin˧˥"],
    ar:    ["تسعة وتسعون", "tisʕa wa tisʕuːn"],
    tl:    ["siyamnapu't siyam", "ʃamnaˈput ʃam"],
    ru:    ["девяносто девять", "dʲɪvʲɪˈnostə ˈdʲevʲɪtʲ"],
    pl:    ["dziewięćdziesiąt dziewięć", "dʑevʲɛɲˈdʑeɕɔnt ˈdʑevʲɛɲtɕ"],
    tr:    ["doksan dokuz", "dokˈsan doˈkuz"],
    hu:    ["kilencvenkilenc", "ˈkilɛntsvɛnˌkilɛnts"],
    fi:    ["yhdeksänkymmentäyhdeksän", "ˈyhdeksænˌkymmentæˌyhdeksæn"],
    la:    ["undecentum", "undeˈkentum"],
    yo:    ["ọ̀kàndínlọ́gọ́rùn-ún", "ɔ̀kãdĩ́lɔ́gɔ́ɾṹṹ"],
    sq:    ["nëntëdhjetë e nëntë", "nəntəˈðjetə e ˈnəntə"],
    el:    ["ενενήντα εννέα", "eneˈninda eˈnea"],
    hy:    ["իննսունինը", "innsuˈninə"],
    mn:    ["ерэн ес", "jeren jes"],
    th:    ["เก้าสิบเก้า", "kaːw˥˩ sip˨˩ kaːw˥˩"],
    fa:    ["نود و نه", "næˈvæd o noh"],
    he:    ["תשעים ותשע", "tiʃˈʔim veˈteʃa"],
    lt:    ["devyniasdešimt devyni", "dʲɪvʲiniɐzˈdʲæʃimt dʲɪˈvʲini"],
    uk:    ["дев'яносто дев'ять", "dewjɐˈnɔstɔ ˈdɛwjɐtʲ"],
    cs:    ["devadesát devět", "ˈdɛvadɛsaːt ˈdɛvjɛt"],
    ro:    ["nouăzeci și nouă", "nowəˈzetʃʲ ʃi ˈnowə"],
    bg:    ["деветдесет и девет", "devedeˈset i ˈdevet"],
    kk:    ["тоқсан тоғыз", "toqˈsan toˈʁəz"],
    km:    ["កៅសិបប្រាំបួន", "kavsəp praːmɓuən"],
    ms:    ["sembilan puluh sembilan", "səmbilan puluh səmbilan"],
    id:    ["sembilan puluh sembilan", "səmbilan puluh səmbilan"],
    ta:    ["தொண்ணூற்று ஒன்பது", "toɳɳuːtru onbad̪u"],
    ur:    ["ننانوے", "nənaːnəʋeː"],
    wo:    ["juróom-ñeenti fukk ak juróom-ñeent", "dʒuˈroːmɲeːnti fukː ak dʒuˈroːmɲeːnt"]
  }
};
