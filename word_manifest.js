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
// The `experimental` category is the 🧪 set — words mapped only where a sourced
// form exists. Membership must match WORDS.<id>.partial in words/<id>.js; when
// a word graduates, move it to a thematic category AND drop the flag, or the
// selector will show it grouped as experimental without the marker (which is
// what happened to `foot` between 2e6d7c03 and 4a20a53c).

const WORD_CATEGORIES = [
    {
        key: "sky",
        label: {
            en: "Sky & elements", ja: "空と自然", ko: "하늘과 자연", zh: "天空与自然", yue: "天空同自然", vi: "Trời và thiên nhiên", th: "ท้องฟ้าและธรรมชาติ", id: "Langit & alam", hi: "आकाश और प्रकृति", de: "Himmel & Natur", fr: "Ciel et nature", it: "Cielo e natura", es: "Cielo y naturaleza", pt: "Céu e natureza", ru: "Небо и природа", uk: "Небо і природа", ar: "السماء والطبيعة", he: "שמיים וטבע", sw: "Anga na maumbile"
        },
        words: ["water", "fire", "sun", "moon", "star", "night", "rain", "snow", "wind", "earth", "stone", "mountain", "sea"],
    },
    {
        key: "people",
        label: {
            en: "People", ja: "人", ko: "사람", zh: "人", yue: "人", vi: "Con người", th: "ผู้คน", id: "Orang", hi: "लोग", de: "Menschen", fr: "Personnes", it: "Persone", es: "Personas", pt: "Pessoas", ru: "Люди", uk: "Люди", ar: "الناس", he: "אנשים", sw: "Watu"
        },
        words: ["mother", "father", "daughter", "i", "you", "we", "name", "person"],
    },
    {
        key: "body",
        label: {
            en: "Body & feeling", ja: "からだと心", ko: "몸과 마음", zh: "身体与情感", yue: "身體同感情", vi: "Cơ thể và cảm xúc", th: "ร่างกายและความรู้สึก", id: "Tubuh & perasaan", hi: "शरीर और भाव", de: "Körper & Gefühl", fr: "Corps et sentiment", it: "Corpo e sentimento", es: "Cuerpo y sentimiento", pt: "Corpo e sentimento", ru: "Тело и чувства", uk: "Тіло і почуття", ar: "الجسد والشعور", he: "גוף ורגש", sw: "Mwili na hisia"
        },
        words: ["head", "eye", "ear", "nose", "mouth", "tooth", "tongue", "hand", "foot", "heart", "bone", "blood", "love"],
    },
    {
        key: "nature",
        label: {
            en: "Animals & plants", ja: "動物と植物", ko: "동물과 식물", zh: "动物与植物", yue: "動物同植物", vi: "Động vật và thực vật", th: "สัตว์และพืช", id: "Hewan & tumbuhan", hi: "जानवर और पौधे", de: "Tiere & Pflanzen", fr: "Animaux et plantes", it: "Animali e piante", es: "Animales y plantas", pt: "Animais e plantas", ru: "Животные и растения", uk: "Тварини і рослини", ar: "الحيوانات والنباتات", he: "בעלי חיים וצמחים", sw: "Wanyama na mimea"
        },
        words: ["tree", "dog", "cat", "fish", "bird", "egg", "bear", "horse"],
    },
    {
        key: "home",
        label: {
            en: "Home, food & drink", ja: "家と食べもの", ko: "집과 먹거리", zh: "家与饮食", yue: "屋企同飲食", vi: "Nhà cửa và ăn uống", th: "บ้านและอาหาร", id: "Rumah, makanan & minuman", hi: "घर और खान-पान", de: "Haus, Essen & Trinken", fr: "Maison, nourriture et boisson", it: "Casa, cibo e bevande", es: "Casa, comida y bebida", pt: "Casa, comida e bebida", ru: "Дом, еда и питьё", uk: "Дім, їжа і напої", ar: "البيت والطعام والشراب", he: "בית, מאכל ומשקה", sw: "Nyumba, chakula na kinywaji"
        },
        words: ["house", "milk", "honey", "salt", "wine", "rice", "chocolate"],
    },
    {
        key: "made",
        label: {
            en: "Things people made", ja: "人のつくったもの", ko: "사람이 만든 것", zh: "人造之物", yue: "人整嘅嘢", vi: "Đồ người làm ra", th: "สิ่งที่มนุษย์สร้าง", id: "Buatan manusia", hi: "मानव-निर्मित वस्तुएँ", de: "Von Menschen Gemachtes", fr: "Objets fabriqués", it: "Cose fatte dall'uomo", es: "Cosas hechas por el hombre", pt: "Coisas feitas pelo homem", ru: "Сделанное людьми", uk: "Зроблене людьми", ar: "مصنوعات البشر", he: "דברים מעשה ידי אדם", sw: "Vitu vilivyotengenezwa"
        },
        words: ["iron", "wheel", "silk", "book"],
    },
    {
        key: "actions",
        label: {
            en: "Actions", ja: "動作", ko: "동작", zh: "动作", yue: "動作", vi: "Hành động", th: "การกระทำ", id: "Tindakan", hi: "क्रियाएँ", de: "Handlungen", fr: "Actions", it: "Azioni", es: "Acciones", pt: "Ações", ru: "Действия", uk: "Дії", ar: "الأفعال", he: "פעולות", sw: "Vitendo"
        },
        words: ["eat", "drink", "sleep"],
    },
    {
        key: "numbers",
        label: {
            en: "Numbers", ja: "数", ko: "수", zh: "数字", yue: "數字", vi: "Số", th: "ตัวเลข", id: "Angka", hi: "संख्याएँ", de: "Zahlen", fr: "Nombres", it: "Numeri", es: "Números", pt: "Números", ru: "Числа", uk: "Числа", ar: "الأعداد", he: "מספרים", sw: "Namba"
        },
        words: ["one", "two", "three", "four", "five", "hundred"],
    },
    {
        key: "greetings",
        label: {
            en: "Greetings & quality", ja: "あいさつと性質", ko: "인사와 성질", zh: "问候与性状", yue: "問候同性質", vi: "Chào hỏi và tính chất", th: "คำทักทายและคุณลักษณะ", id: "Sapaan & sifat", hi: "अभिवादन और गुण", de: "Grüße & Eigenschaften", fr: "Salutations et qualités", it: "Saluti e qualità", es: "Saludos y cualidades", pt: "Saudações e qualidades", ru: "Приветствия и качества", uk: "Вітання і якості", ar: "التحيات والصفات", he: "ברכות ותכונות", sw: "Salamu na sifa"
        },
        words: ["hello", "thanks", "good", "new"],
    },
    {
        key: "colour",
        label: {
            en: "Colour", ja: "色", ko: "색", zh: "颜色", yue: "顏色", vi: "Màu sắc", th: "สี", id: "Warna", hi: "रंग", de: "Farben", fr: "Couleurs", it: "Colori", es: "Colores", pt: "Cores", ru: "Цвета", uk: "Кольори", ar: "الألوان", he: "צבעים", sw: "Rangi"
        },
        words: ["red", "white", "black", "green"],
    },
    {
        key: "experimental",
        label: {
            en: "Experimental", ja: "実験中", ko: "실험 중", zh: "实验中", yue: "實驗中", vi: "Thử nghiệm", th: "ทดลอง", id: "Eksperimental", hi: "प्रयोगात्मक", de: "Experimentell", fr: "Expérimental", it: "Sperimentale", es: "Experimental", pt: "Experimental", ru: "Экспериментальные", uk: "Експериментальні", ar: "تجريبي", he: "ניסיוני", sw: "Majaribio"
        },
        words: ["blue", "butterfly", "cuckoo", "woof", "cockcrow", "computer", "wifi", "sushi", "tea", "coffee", "sugar", "orange", "n99", "dopamine", "atsign", "poop"],
    },
];

// Flattened display order. Derived — never edit this directly.
const WORD_ORDER = WORD_CATEGORIES.reduce(function (a, c) { return a.concat(c.words); }, []);

if (typeof window !== 'undefined') {
    window.WORD_CATEGORIES = WORD_CATEGORIES;
    window.WORD_ORDER = WORD_ORDER;
}
