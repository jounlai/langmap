// word_manifest.js — the concept list, grouped and in display order.
// Append a new ID to the right category below when adding words/<id>.js.
//
// WORD_CATEGORIES is the source of truth and WORD_ORDER is DERIVED from it, so
// the two cannot drift. Before 2026-09-20 the grouping existed only as comments
// here, which meant the selector could not show it: 86 concepts arrived at the
// reader as one flat pulldown. The categories are the same ones those comments
// described, promoted to data and given labels in the 19 base UI languages
// (regional variants fall back on the base, as the HanMap modal does).
//
// TWO POSITIONS ARE LOAD-BEARING, so do not shuffle the top of the first
// category:
//   WORD_ORDER[0] is the map's default word.
//   Langle's clue panel shows the FIRST FOUR entries the target language has a
//   cell for (see clueConcepts/clueHtml in wordmap.html), so the list must open
//   with four words that nearly every language carries. water, fire, sun and
//   moon are at 98% each; a low-coverage word here would make the clue panel
//   inconsistent from language to language.
//
// 2026-11-28 regroup (owner: 「単語の順番・分類をより分かりやすく」): 15 groups —
// sky & weather, land & sea, animals & plants, body (parts only), bodily things
// & feelings, people, actions, qualities (big/small/hot…), colour, numbers,
// time, food & drink, home & made things (incl. tech), greetings, countries.
// Within a group: everyday core first, related words together.
//
// The 🧪 words (WORDS.<id>.partial in words/<id>.js — mapped only where a
// sourced form exists) sit in their thematic groups, after that group's core
// words. Until 2026-10-25 they had an `experimental` group of their own; the
// owner asked for n99 under numbers, so all 33 moved to their topics and the
// selector marks each tile instead. When a word graduates, drop the flag and
// the marker goes with it; the group stays.

const WORD_CATEGORIES = [
    {
        key: "sky",
        label: {
            en: "Sky & weather", ja: "空と天気", ko: "하늘과 날씨", zh: "天空与天气", yue: "天空同天氣", vi: "Bầu trời và thời tiết", th: "ท้องฟ้าและอากาศ", id: "Langit & cuaca", hi: "आकाश और मौसम", de: "Himmel & Wetter", fr: "Ciel et météo", it: "Cielo e meteo", es: "Cielo y tiempo", pt: "Céu e tempo", ru: "Небо и погода", uk: "Небо й погода", ar: "السماء والطقس", he: "שמיים ומזג אוויר", sw: "Anga na hali ya hewa"
        },
        words: ["water", "fire", "sun", "moon", "star", "milkyway", "shootingstar", "cloud", "rain", "rainbow", "thunder", "snow", "wind", "smoke", "ash"],
    },
    {
        key: "land",
        label: {
            en: "Land & sea", ja: "大地と海", ko: "땅과 바다", zh: "大地与海洋", yue: "大地同海", vi: "Đất và biển", th: "แผ่นดินและทะเล", id: "Daratan & laut", hi: "धरती और समुद्र", de: "Land & Meer", fr: "Terre et mer", it: "Terra e mare", es: "Tierra y mar", pt: "Terra e mar", ru: "Земля и море", uk: "Земля й море", ar: "اليابسة والبحر", he: "יבשה וים", sw: "Nchi kavu na bahari"
        },
        words: ["earth", "stone", "sand", "mountain", "island", "sea", "earthquake", "east"],
    },
    {
        key: "nature",
        label: {
            en: "Animals & plants", ja: "動物と植物", ko: "동물과 식물", zh: "动物与植物", yue: "動物同植物", vi: "Động vật và thực vật", th: "สัตว์และพืช", id: "Hewan & tumbuhan", hi: "जानवर और पौधे", de: "Tiere & Pflanzen", fr: "Animaux et plantes", it: "Animali e piante", es: "Animales y plantas", pt: "Animais e plantas", ru: "Животные и растения", uk: "Тварини і рослини", ar: "الحيوانات والنباتات", he: "בעלי חיים וצמחים", sw: "Wanyama na mimea"
        },
        words: ["tree", "leaf", "sunflower", "dog", "woof", "cat", "horse", "bear", "lion", "camel", "elephant", "monkey", "bat", "whale", "horn", "tail", "bird", "feather", "egg", "cockcrow", "cuckoo", "turkey", "snake", "dragon", "worm", "spider", "butterfly", "dragonfly", "ladybird", "cockroach", "louse", "fish", "octopus", "jellyfish"],
    },
    {
        key: "body",
        label: {
            en: "Body", ja: "からだ", ko: "몸", zh: "身体", yue: "身體", vi: "Cơ thể", th: "ร่างกาย", id: "Tubuh", hi: "शरीर", de: "Körper", fr: "Corps", it: "Corpo", es: "Cuerpo", pt: "Corpo", ru: "Тело", uk: "Тіло", ar: "الجسم", he: "גוף", sw: "Mwili"
        },
        words: ["head", "hair", "eye", "ear", "nose", "mouth", "tooth", "wisdomtooth", "tongue", "neck", "adamsapple", "breast", "heart", "liver", "hand", "thumb", "littlefinger", "nail", "right", "left", "foot", "knee", "skin", "bone", "blood"],
    },
    {
        key: "feeling",
        label: {
            en: "Bodily things & feelings", ja: "生理と気持ち", ko: "생리와 마음", zh: "生理与情感", yue: "生理同感情", vi: "Sinh lý và cảm xúc", th: "เรื่องร่างกายและความรู้สึก", id: "Hal tubuh & perasaan", hi: "शारीरिक बातें और भाव", de: "Körperliches & Gefühle", fr: "Corps et émotions", it: "Funzioni del corpo ed emozioni", es: "Funciones del cuerpo y sentimientos", pt: "Funções do corpo e sentimentos", ru: "Телесное и чувства", uk: "Тілесне й почуття", ar: "أمور الجسد والمشاعر", he: "גוף ורגשות", sw: "Mambo ya mwili na hisia"
        },
        words: ["tear", "goosebumps", "hiccup", "poop", "booger", "fart", "love", "kiss", "hangover", "jetlag", "dopamine"],
    },
    {
        key: "people",
        label: {
            en: "People", ja: "人", ko: "사람", zh: "人", yue: "人", vi: "Con người", th: "ผู้คน", id: "Orang", hi: "लोग", de: "Menschen", fr: "Personnes", it: "Persone", es: "Personas", pt: "Pessoas", ru: "Люди", uk: "Люди", ar: "الناس", he: "אנשים", sw: "Watu"
        },
        words: ["i", "you", "we", "person", "man", "woman", "child", "mother", "father", "grandmother", "uncle", "olderbrother", "daughter", "husband", "wife", "name", "language", "king"],
    },
    {
        key: "actions",
        label: {
            en: "Actions", ja: "動作", ko: "동작", zh: "动作", yue: "動作", vi: "Hành động", th: "การกระทำ", id: "Tindakan", hi: "क्रियाएँ", de: "Handlungen", fr: "Actions", it: "Azioni", es: "Acciones", pt: "Ações", ru: "Действия", uk: "Дії", ar: "الأفعال", he: "פעולות", sw: "Vitendo"
        },
        words: ["eat", "drink", "sleep", "see", "hear", "say", "know", "come", "walk", "sit", "stand", "swim", "fly", "give", "bite", "burn", "kill", "die"],
    },
    {
        key: "qualities",
        label: {
            en: "Qualities", ja: "性質", ko: "성질", zh: "性状", yue: "性質", vi: "Tính chất", th: "คุณลักษณะ", id: "Sifat", hi: "गुण", de: "Eigenschaften", fr: "Qualités", it: "Qualità", es: "Cualidades", pt: "Qualidades", ru: "Свойства", uk: "Властивості", ar: "الصفات", he: "תכונות", sw: "Sifa"
        },
        words: ["big", "small", "long", "good", "new", "hot", "cold", "full"],
    },
    {
        key: "colour",
        label: {
            en: "Colour", ja: "色", ko: "색", zh: "颜色", yue: "顏色", vi: "Màu sắc", th: "สี", id: "Warna", hi: "रंग", de: "Farben", fr: "Couleurs", it: "Colori", es: "Colores", pt: "Cores", ru: "Цвета", uk: "Кольори", ar: "الألوان", he: "צבעים", sw: "Rangi"
        },
        words: ["black", "white", "red", "yellow", "green", "blue"],
    },
    {
        key: "numbers",
        label: {
            en: "Numbers", ja: "数", ko: "수", zh: "数字", yue: "數字", vi: "Số", th: "ตัวเลข", id: "Angka", hi: "संख्याएँ", de: "Zahlen", fr: "Nombres", it: "Numeri", es: "Números", pt: "Números", ru: "Числа", uk: "Числа", ar: "الأعداد", he: "מספרים", sw: "Namba"
        },
        words: ["one", "two", "three", "four", "five", "twenty", "hundred", "thousand", "n99"],
    },
    {
        key: "time",
        label: {
            en: "Time", ja: "時と曜日", ko: "시간과 요일", zh: "时间与星期", yue: "時間同星期", vi: "Thời gian", th: "เวลาและวัน", id: "Waktu & hari", hi: "समय और दिन", de: "Zeit & Wochentage", fr: "Temps et jours", it: "Tempo e giorni", es: "Tiempo y días", pt: "Tempo e dias", ru: "Время и дни", uk: "Час і дні", ar: "الوقت والأيام", he: "זמן וימים", sw: "Wakati na siku"
        },
        words: ["night", "yesterday", "tomorrow", "week", "monday", "tuesday", "wednesday", "friday", "saturday", "sunday"],
    },
    {
        key: "home",
        label: {
            en: "Food & drink", ja: "食べものと飲みもの", ko: "먹거리와 마실 것", zh: "饮食", yue: "飲食", vi: "Ăn uống", th: "อาหารและเครื่องดื่ม", id: "Makanan & minuman", hi: "खान-पान", de: "Essen & Trinken", fr: "Nourriture et boisson", it: "Cibo e bevande", es: "Comida y bebida", pt: "Comida e bebida", ru: "Еда и напитки", uk: "Їжа й напої", ar: "الطعام والشراب", he: "אוכל ושתייה", sw: "Chakula na vinywaji"
        },
        words: ["rice", "bread", "cheese", "butter", "milk", "meat", "honey", "salt", "sugar", "potato", "tomato", "chili", "maize", "orange", "pineapple", "sushi", "chocolate", "cottoncandy", "tea", "bubbletea", "coffee", "wine", "tobacco"],
    },
    {
        key: "made",
        label: {
            en: "Home & things people made", ja: "家と人のつくったもの", ko: "집과 사람이 만든 것", zh: "家居与人造之物", yue: "屋企同人整嘅嘢", vi: "Nhà cửa và đồ người làm ra", th: "บ้านและสิ่งที่มนุษย์สร้าง", id: "Rumah & buatan manusia", hi: "घर और मानव-निर्मित वस्तुएँ", de: "Haus & von Menschen Gemachtes", fr: "Maison et objets fabriqués", it: "Casa e cose fatte dall'uomo", es: "Casa y cosas hechas por el hombre", pt: "Casa e coisas feitas pelo homem", ru: "Дом и вещи, сделанные людьми", uk: "Дім і речі, зроблені людьми", ar: "البيت وما صنعه الإنسان", he: "בית ודברים שאדם עשה", sw: "Nyumba na vitu vilivyotengenezwa na watu"
        },
        words: ["house", "road", "window", "mirror", "soap", "wheel", "iron", "gold", "silk", "cotton", "money", "paper", "book", "computer", "mobilephone", "wifi", "usbstick", "atsign"],
    },
    {
        key: "greetings",
        label: {
            en: "Greetings & expressions", ja: "あいさつと決まり文句", ko: "인사와 표현", zh: "问候与常用语", yue: "問候同常用語", vi: "Chào hỏi và câu cửa miệng", th: "คำทักทายและสำนวน", id: "Sapaan & ungkapan", hi: "अभिवादन और अभिव्यक्तियाँ", de: "Grüße & Ausdrücke", fr: "Salutations et expressions", it: "Saluti ed espressioni", es: "Saludos y expresiones", pt: "Saudações e expressões", ru: "Приветствия и выражения", uk: "Привітання й вирази", ar: "التحيات والعبارات", he: "ברכות וביטויים", sw: "Salamu na misemo"
        },
        words: ["hello", "thanks", "cheers", "blessyou", "lol"],
    },
    {
        key: "countries",
        label: {
            en: "Countries", ja: "国", ko: "나라", zh: "国家", yue: "國家", vi: "Quốc gia", th: "ประเทศ", id: "Negara", hi: "देश", de: "Länder", fr: "Pays", it: "Paesi", es: "Países", pt: "Países", ru: "Страны", uk: "Країни", ar: "البلدان", he: "מדינות", sw: "Nchi"
        },
        words: ["germany", "japan", "china", "korea", "india", "greece"],
    },
];

// Flattened display order. Derived — never edit this directly.
const WORD_ORDER = WORD_CATEGORIES.reduce(function (a, c) { return a.concat(c.words); }, []);

if (typeof window !== 'undefined') {
    window.WORD_CATEGORIES = WORD_CATEGORIES;
    window.WORD_ORDER = WORD_ORDER;
}
