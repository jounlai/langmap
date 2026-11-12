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
            en: "Sky & elements", ja: "空と自然", ko: "하늘과 자연", zh: "天空与自然", yue: "天空同自然", vi: "Trời và thiên nhiên", th: "ท้องฟ้าและธรรมชาติ", id: "Langit & alam", hi: "आकाश और प्रकृति", de: "Himmel & Natur", fr: "Ciel et nature", it: "Cielo e natura", es: "Cielo y naturaleza", pt: "Céu e natureza", ru: "Небо и природа", uk: "Небо і природа", ar: "السماء والطبيعة", he: "שמיים וטבע", sw: "Anga na maumbile"
        },
        words: ["water", "fire", "sun", "moon", "star", "milkyway", "shootingstar", "rain", "rainbow", "thunder", "snow", "wind", "earth", "earthquake", "stone", "mountain", "sea", "island", "east"],
    },
    {
        key: "time",
        label: {
            en: "Time", ja: "時と曜日", ko: "시간과 요일", zh: "时间与星期", yue: "時間同星期", vi: "Thời gian", th: "เวลาและวัน", id: "Waktu & hari", hi: "समय और दिन", de: "Zeit & Wochentage", fr: "Temps et jours", it: "Tempo e giorni", es: "Tiempo y días", pt: "Tempo e dias", ru: "Время и дни", uk: "Час і дні", ar: "الوقت والأيام", he: "זמן וימים", sw: "Wakati na siku"
        },
        words: ["night", "yesterday", "tomorrow", "week", "monday", "tuesday", "wednesday", "friday", "saturday", "sunday"]
    },
    {
        key: "people",
        label: {
            en: "People", ja: "人", ko: "사람", zh: "人", yue: "人", vi: "Con người", th: "ผู้คน", id: "Orang", hi: "लोग", de: "Menschen", fr: "Personnes", it: "Persone", es: "Personas", pt: "Pessoas", ru: "Люди", uk: "Люди", ar: "الناس", he: "אנשים", sw: "Watu"
        },
        words: ["i", "you", "we", "person", "mother", "father", "grandmother", "uncle", "olderbrother", "daughter", "husband", "wife", "name", "language", "king"],
    },
    {
        key: "body",
        label: {
            en: "Body & feeling", ja: "からだと心", ko: "몸과 마음", zh: "身体与情感", yue: "身體同感情", vi: "Cơ thể và cảm xúc", th: "ร่างกายและความรู้สึก", id: "Tubuh & perasaan", hi: "शरीर और भाव", de: "Körper & Gefühl", fr: "Corps et sentiment", it: "Corpo e sentimento", es: "Cuerpo y sentimiento", pt: "Corpo e sentimento", ru: "Тело и чувства", uk: "Тіло і почуття", ar: "الجسد والشعور", he: "גוף ורגש", sw: "Mwili na hisia"
        },
        words: ["head", "eye", "ear", "nose", "mouth", "tooth", "wisdomtooth", "tongue", "adamsapple", "hand", "thumb", "littlefinger", "right", "left", "foot", "heart", "bone", "blood", "tear", "goosebumps", "poop", "love", "kiss", "hangover", "jetlag", "dopamine"],
    },
    {
        key: "nature",
        label: {
            en: "Animals & plants", ja: "動物と植物", ko: "동물과 식물", zh: "动物与植物", yue: "動物同植物", vi: "Động vật và thực vật", th: "สัตว์และพืช", id: "Hewan & tumbuhan", hi: "जानवर और पौधे", de: "Tiere & Pflanzen", fr: "Animaux et plantes", it: "Animali e piante", es: "Animales y plantas", pt: "Animais e plantas", ru: "Животные и растения", uk: "Тварини і рослини", ar: "الحيوانات والنباتات", he: "בעלי חיים וצמחים", sw: "Wanyama na mimea"
        },
        words: ["tree", "sunflower", "dog", "woof", "cat", "horse", "bear", "lion", "camel", "elephant", "monkey", "snake", "spider", "bat", "bird", "cockcrow", "cuckoo", "turkey", "egg", "butterfly", "dragonfly", "ladybird", "fish", "whale", "octopus", "jellyfish"],
    },
    {
        key: "home",
        label: {
            en: "Home, food & drink", ja: "家と食べもの", ko: "집과 먹거리", zh: "家与饮食", yue: "屋企同飲食", vi: "Nhà cửa và ăn uống", th: "บ้านและอาหาร", id: "Rumah, makanan & minuman", hi: "घर और खान-पान", de: "Haus, Essen & Trinken", fr: "Maison, nourriture et boisson", it: "Casa, cibo e bevande", es: "Casa, comida y bebida", pt: "Casa, comida e bebida", ru: "Дом, еда и питьё", uk: "Дім, їжа і напої", ar: "البيت والطعام والشراب", he: "בית, מאכל ומשקה", sw: "Nyumba, chakula na kinywaji"
        },
        words: ["house", "window", "mirror", "soap", "rice", "bread", "cheese", "butter", "milk", "honey", "salt", "sugar", "potato", "tomato", "chili", "maize", "orange", "pineapple", "sushi", "chocolate", "cottoncandy", "tea", "bubbletea", "coffee", "wine", "tobacco"],
    },
    {
        key: "made",
        label: {
            en: "Things people made", ja: "人のつくったもの", ko: "사람이 만든 것", zh: "人造之物", yue: "人整嘅嘢", vi: "Đồ người làm ra", th: "สิ่งที่มนุษย์สร้าง", id: "Buatan manusia", hi: "मानव-निर्मित वस्तुएँ", de: "Von Menschen Gemachtes", fr: "Objets fabriqués", it: "Cose fatte dall'uomo", es: "Cosas hechas por el hombre", pt: "Coisas feitas pelo homem", ru: "Сделанное людьми", uk: "Зроблене людьми", ar: "مصنوعات البشر", he: "דברים מעשה ידי אדם", sw: "Vitu vilivyotengenezwa"
        },
        words: ["iron", "gold", "silk", "cotton", "money", "paper", "book", "wheel", "computer", "mobilephone", "wifi", "usbstick", "atsign"],
    },
    {
        key: "actions",
        label: {
            en: "Actions", ja: "動作", ko: "동작", zh: "动作", yue: "動作", vi: "Hành động", th: "การกระทำ", id: "Tindakan", hi: "क्रियाएँ", de: "Handlungen", fr: "Actions", it: "Azioni", es: "Acciones", pt: "Ações", ru: "Действия", uk: "Дії", ar: "الأفعال", he: "פעולות", sw: "Vitendo"
        },
        words: ["eat", "drink", "sleep", "hiccup"],
    },
    {
        key: "numbers",
        label: {
            en: "Numbers", ja: "数", ko: "수", zh: "数字", yue: "數字", vi: "Số", th: "ตัวเลข", id: "Angka", hi: "संख्याएँ", de: "Zahlen", fr: "Nombres", it: "Numeri", es: "Números", pt: "Números", ru: "Числа", uk: "Числа", ar: "الأعداد", he: "מספרים", sw: "Namba"
        },
        words: ["one", "two", "three", "four", "five", "twenty", "hundred", "thousand", "n99"],
    },
    {
        key: "greetings",
        label: {
            en: "Greetings & quality", ja: "あいさつと性質", ko: "인사와 성질", zh: "问候与性状", yue: "問候同性質", vi: "Chào hỏi và tính chất", th: "คำทักทายและคุณลักษณะ", id: "Sapaan & sifat", hi: "अभिवादन और गुण", de: "Grüße & Eigenschaften", fr: "Salutations et qualités", it: "Saluti e qualità", es: "Saludos y cualidades", pt: "Saudações e qualidades", ru: "Приветствия и качества", uk: "Вітання і якості", ar: "التحيات والصفات", he: "ברכות ותכונות", sw: "Salamu na sifa"
        },
        words: ["hello", "thanks", "cheers", "blessyou", "good", "new", "lol"],
    },
    {
        key: "colour",
        label: {
            en: "Colour", ja: "色", ko: "색", zh: "颜色", yue: "顏色", vi: "Màu sắc", th: "สี", id: "Warna", hi: "रंग", de: "Farben", fr: "Couleurs", it: "Colori", es: "Colores", pt: "Cores", ru: "Цвета", uk: "Кольори", ar: "الألوان", he: "צבעים", sw: "Rangi"
        },
        words: ["black", "white", "red", "yellow", "green", "blue"],
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
