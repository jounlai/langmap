/* ============================================================================
 * master.js — "Language Master" game for the Word Map.
 *
 * Pick any language, read what it is, then answer 10 questions: "what is
 * <concept> in <language>?" with 4 of that language's own words as choices.
 * 9 of 10 (90%) masters the language and earns its badge. Badges are kept in
 * this browser only (localStorage, wrapped so a blocked store just means no
 * memory of past badges — the game itself still works).
 *
 * Reuses what the Word Map already has: LANG_DATA (rows), the per-language
 * row loader window.__wmEnsureLangWords, word labels (WORDS / WORD_LABELS),
 * translated names (window.__langNameFor), and the meta + description
 * loaders exposed on window.__langmap. Registers itself as a hidden
 * .game-btn so the header "Play" menu lists it, and as __wmGames.master so
 * ?play=master reopens it.
 * ========================================================================== */
(function () {
    'use strict';

    var TOTAL = 10, PASS = 9, CHOICES = 4;
    var STORE = 'lm_master_v1';
    // Concepts that make bad questions: loanwords that look alike everywhere,
    // onomatopoeia, internet slang, and the long numeral phrase.
    var SKIP = { lol: 1, atsign: 1, wifi: 1, dopamine: 1, sushi: 1, computer: 1, chocolate: 1,
        coffee: 1, tea: 1, sugar: 1, woof: 1, cockcrow: 1, cuckoo: 1, n99: 1 };
    var MIN_CELLS = TOTAL + CHOICES; // enough distinct words for 10 questions + distractors

    var FB = 'en';
    function ui() { var g = window.__langmap && window.__langmap.uiLang; return g || FB; }
    function pk(m) { var u = ui(); return m[u] || m[u.split('_')[0]] || m[FB]; }

    var T = {
        title: {en:'Language Master', ja:'言語マスター', ko:'언어 마스터', zh:'语言大师', yue:'語言大師', vi:'Bậc thầy ngôn ngữ', th:'เซียนภาษา', id:'Master Bahasa', hi:'भाषा मास्टर', de:'Sprachmeister', fr:'Maître des langues', it:'Maestro di lingue', es:'Maestro de idiomas', pt:'Mestre de idiomas', ru:'Мастер языка', uk:'Майстер мови', ar:'سيّد اللغة', he:'אלוף השפה', sw:'Bingwa wa Lugha'},
        sub: {en:'Pick a language, then name 10 of its words. Get 9 right to master it and earn its badge.', ja:'言語を選んで、その言語の単語を10問当てよう。9問以上正解でマスター、バッジがもらえます。', ko:'언어를 골라 그 언어의 단어 10문제를 맞혀 보세요. 9문제 이상 맞히면 마스터, 배지를 받습니다.', zh:'选一种语言，答对它的10个单词中的9个即可成为大师并获得徽章。', yue:'揀一種語言，答啱佢10個詞入面9個就係大師，攞到徽章。', vi:'Chọn một ngôn ngữ rồi đoán 10 từ của nó. Đúng 9 câu là thành thạo và nhận huy hiệu.', th:'เลือกภาษา แล้วทายคำของภาษานั้น 10 ข้อ ตอบถูก 9 ข้อขึ้นไปจะได้เป็นเซียนและรับเหรียญตรา', id:'Pilih bahasa, lalu tebak 10 katanya. Benar 9 berarti kamu menguasainya dan dapat lencana.', hi:'कोई भाषा चुनें और उसके 10 शब्द पहचानें। 9 सही होने पर आप मास्टर बनेंगे और बैज मिलेगा।', de:'Wähle eine Sprache und errate 10 ihrer Wörter. Mit 9 richtigen meisterst du sie und bekommst ihr Abzeichen.', fr:'Choisissez une langue, puis trouvez 10 de ses mots. 9 bonnes réponses : vous la maîtrisez et gagnez son badge.', it:'Scegli una lingua e indovina 10 sue parole. Con 9 giuste la padroneggi e ottieni il distintivo.', es:'Elige un idioma y acierta 10 de sus palabras. Con 9 aciertos lo dominas y ganas su insignia.', pt:'Escolha um idioma e acerte 10 das suas palavras. Com 9 acertos você o domina e ganha o selo.', ru:'Выберите язык и угадайте 10 его слов. 9 верных ответов — и вы мастер, значок ваш.', uk:'Оберіть мову й вгадайте 10 її слів. 9 правильних — і ви майстер, значок ваш.', ar:'اختر لغة ثم تعرّف على 10 من كلماتها. أجب عن 9 إجابة صحيحة لتتقنها وتنال شارتها.', he:'בחרו שפה וזהו 10 ממילותיה. 9 תשובות נכונות — שלטתם בה וקיבלתם את התג שלה.', sw:'Chagua lugha, kisha taja maneno yake 10. Pata 9 sahihi ili uwe bingwa na upate beji yake.'},
        tag: {en:'Name 10 words of one language', ja:'ひとつの言語の単語を10問', ko:'한 언어의 단어 10문제', zh:'一种语言的10个单词', yue:'一種語言嘅10個詞', vi:'10 từ của một ngôn ngữ', th:'คำ 10 คำของภาษาเดียว', id:'10 kata dari satu bahasa', hi:'एक भाषा के 10 शब्द', de:'10 Wörter einer Sprache', fr:'10 mots d’une langue', it:'10 parole di una lingua', es:'10 palabras de un idioma', pt:'10 palavras de um idioma', ru:'10 слов одного языка', uk:'10 слів однієї мови', ar:'10 كلمات من لغة واحدة', he:'10 מילים משפה אחת', sw:'Maneno 10 ya lugha moja'},
        search: {en:'Search a language…', ja:'言語を検索…', ko:'언어 검색…', zh:'搜索语言…', yue:'搜尋語言…', vi:'Tìm ngôn ngữ…', th:'ค้นหาภาษา…', id:'Cari bahasa…', hi:'भाषा खोजें…', de:'Sprache suchen…', fr:'Rechercher une langue…', it:'Cerca una lingua…', es:'Buscar un idioma…', pt:'Buscar um idioma…', ru:'Найти язык…', uk:'Знайти мову…', ar:'ابحث عن لغة…', he:'חיפוש שפה…', sw:'Tafuta lugha…'},
        badges: {en:'Your badges', ja:'獲得したバッジ', ko:'획득한 배지', zh:'已获得的徽章', yue:'攞到嘅徽章', vi:'Huy hiệu của bạn', th:'เหรียญตราของคุณ', id:'Lencanamu', hi:'आपके बैज', de:'Deine Abzeichen', fr:'Vos badges', it:'I tuoi distintivi', es:'Tus insignias', pt:'Seus selos', ru:'Ваши значки', uk:'Ваші значки', ar:'شاراتك', he:'התגים שלך', sw:'Beji zako'},
        none: {en:'No badges yet — master a language to earn one.', ja:'まだバッジはありません。言語をマスターして手に入れよう。', ko:'아직 배지가 없습니다. 언어를 마스터해 보세요.', zh:'还没有徽章——掌握一种语言来获得吧。', yue:'仲未有徽章，搞掂一種語言就有。', vi:'Chưa có huy hiệu — hãy thành thạo một ngôn ngữ.', th:'ยังไม่มีเหรียญตรา ลองเป็นเซียนสักภาษาดูสิ', id:'Belum ada lencana — kuasai satu bahasa untuk mendapatkannya.', hi:'अभी कोई बैज नहीं — कोई भाषा मास्टर करें।', de:'Noch keine Abzeichen – meistere eine Sprache.', fr:'Pas encore de badge — maîtrisez une langue pour en gagner un.', it:'Nessun distintivo — padroneggia una lingua per ottenerne uno.', es:'Aún no tienes insignias: domina un idioma para ganar una.', pt:'Ainda sem selos — domine um idioma para ganhar um.', ru:'Значков пока нет — освойте язык, чтобы получить.', uk:'Значків поки немає — опануйте мову, щоб отримати.', ar:'لا شارات بعد — أتقن لغة لتنال واحدة.', he:'עדיין אין תגים — שלטו בשפה כדי לקבל.', sw:'Bado huna beji — kuwa bingwa wa lugha upate moja.'},
        family: {en:'Family', ja:'語族', ko:'어족', zh:'语系', yue:'語系', vi:'Ngữ hệ', th:'ตระกูลภาษา', id:'Rumpun', hi:'भाषा-परिवार', de:'Sprachfamilie', fr:'Famille', it:'Famiglia', es:'Familia', pt:'Família', ru:'Семья', uk:'Родина', ar:'العائلة', he:'משפחה', sw:'Familia'},
        speakers: {en:'Speakers', ja:'話者数', ko:'화자 수', zh:'使用人数', yue:'使用人數', vi:'Số người nói', th:'จำนวนผู้พูด', id:'Penutur', hi:'वक्ता', de:'Sprecher', fr:'Locuteurs', it:'Parlanti', es:'Hablantes', pt:'Falantes', ru:'Носители', uk:'Мовці', ar:'المتحدثون', he:'דוברים', sw:'Wazungumzaji'},
        rule: {en:'To master it: 9 of 10 correct', ja:'マスター条件：10問中9問以上の正解', ko:'마스터 조건: 10문제 중 9문제 이상 정답', zh:'成为大师的条件：10题答对9题以上', yue:'大師條件：10題答啱9題或以上', vi:'Điều kiện: đúng ít nhất 9/10 câu', th:'เงื่อนไข: ตอบถูกอย่างน้อย 9 จาก 10 ข้อ', id:'Syarat: benar minimal 9 dari 10', hi:'शर्त: 10 में से कम से कम 9 सही', de:'Bedingung: mindestens 9 von 10 richtig', fr:'Condition : au moins 9 bonnes réponses sur 10', it:'Condizione: almeno 9 risposte giuste su 10', es:'Condición: al menos 9 aciertos de 10', pt:'Condição: pelo menos 9 de 10 certas', ru:'Условие: не меньше 9 верных из 10', uk:'Умова: щонайменше 9 правильних з 10', ar:'الشرط: 9 إجابات صحيحة على الأقل من 10', he:'התנאי: לפחות 9 תשובות נכונות מתוך 10', sw:'Sharti: angalau 9 sahihi kati ya 10'},
        ruleShort: {en:'9/10 to master', ja:'9/10でマスター', ko:'9/10이면 마스터', zh:'9/10即为大师', yue:'9/10就係大師', vi:'9/10 là thành thạo', th:'9/10 เป็นเซียน', id:'9/10 untuk menguasai', hi:'9/10 पर मास्टर', de:'9/10 zum Meistern', fr:'9/10 pour maîtriser', it:'9/10 per padroneggiare', es:'9/10 para dominar', pt:'9/10 para dominar', ru:'9/10 — мастер', uk:'9/10 — майстер', ar:'9/10 للإتقان', he:'9/10 לשליטה', sw:'9/10 kuwa bingwa'},
        left: {en:'Mistakes left: {n}', ja:'あと{n}問ミスできます', ko:'남은 실수 가능 횟수: {n}', zh:'还可以错{n}题', yue:'仲可以錯{n}題', vi:'Còn được sai {n} câu', th:'ผิดได้อีก {n} ข้อ', id:'Sisa kesalahan: {n}', hi:'बची गलतियाँ: {n}', de:'Noch {n} Fehler erlaubt', fr:'Erreurs restantes : {n}', it:'Errori rimasti: {n}', es:'Errores restantes: {n}', pt:'Erros restantes: {n}', ru:'Можно ошибиться ещё: {n}', uk:'Можна помилитися ще: {n}', ar:'الأخطاء المتبقية: {n}', he:'טעויות שנותרו: {n}', sw:'Makosa yaliyobaki: {n}'},
        out: {en:'Too many mistakes for the badge this time — you can still finish.', ja:'今回はバッジ獲得ならず。最後まで挑戦できます。', ko:'이번에는 배지를 받을 수 없어요. 끝까지 풀 수는 있어요.', zh:'这次拿不到徽章了，但可以答完。', yue:'今次攞唔到徽章，但可以答埋。', vi:'Lần này không đạt huy hiệu — bạn vẫn có thể làm tiếp.', th:'รอบนี้ไม่ได้เหรียญแล้ว แต่ยังเล่นต่อได้', id:'Kali ini lencana lepas — kamu masih bisa menyelesaikan.', hi:'इस बार बैज नहीं मिलेगा — फिर भी पूरा कर सकते हैं।', de:'Diesmal kein Abzeichen – du kannst trotzdem weiterspielen.', fr:'Pas de badge cette fois — vous pouvez finir quand même.', it:'Niente distintivo stavolta — puoi comunque finire.', es:'Esta vez no hay insignia, pero puedes terminar.', pt:'Desta vez sem selo — mas pode terminar.', ru:'В этот раз без значка — но можно доиграть.', uk:'Цього разу без значка — але можна дограти.', ar:'لا شارة هذه المرة — يمكنك الإكمال مع ذلك.', he:'הפעם בלי תג — אפשר להמשיך עד הסוף.', sw:'Mara hii hakuna beji — bado unaweza kumaliza.'},
        quit: {en:'Quit', ja:'やめる', ko:'그만하기', zh:'退出', yue:'唔玩', vi:'Dừng', th:'เลิก', id:'Berhenti', hi:'छोड़ें', de:'Abbrechen', fr:'Abandonner', it:'Esci', es:'Salir', pt:'Sair', ru:'Выйти', uk:'Вийти', ar:'إنهاء', he:'יציאה', sw:'Acha'},
        quitask: {en:'Quit this test? Your answers so far will not count.', ja:'この挑戦をやめますか？ここまでの回答は記録されません。', ko:'이 도전을 그만할까요? 지금까지의 답은 기록되지 않습니다.', zh:'要退出吗？目前的作答不会记录。', yue:'唔玩住？到而家嘅答案唔會記錄。', vi:'Dừng bài này? Câu trả lời sẽ không được tính.', th:'เลิกทำแบบทดสอบนี้? คำตอบที่ผ่านมาจะไม่ถูกนับ', id:'Berhenti? Jawabanmu tidak akan dihitung.', hi:'यह टेस्ट छोड़ें? अब तक के उत्तर नहीं गिने जाएँगे।', de:'Test abbrechen? Deine Antworten zählen dann nicht.', fr:'Abandonner ? Vos réponses ne compteront pas.', it:'Uscire? Le risposte date non conteranno.', es:'¿Salir? Tus respuestas no contarán.', pt:'Sair? Suas respostas não vão contar.', ru:'Выйти? Ответы не засчитаются.', uk:'Вийти? Відповіді не зарахуються.', ar:'إنهاء الاختبار؟ لن تُحتسب إجاباتك.', he:'לצאת? התשובות עד כה לא ייספרו.', sw:'Acha jaribio? Majibu yako hayatahesabiwa.'},
        uiSame: {en:'This is your interface language, so it would be too easy. Switch the interface to another language to take this test.', ja:'表示言語と同じ言語なので簡単すぎます。挑戦するには表示言語をほかの言語に切り替えてください。', ko:'표시 언어와 같은 언어라 너무 쉽습니다. 도전하려면 표시 언어를 다른 언어로 바꿔 주세요.', zh:'这是你的界面语言，太简单了。请把界面切换成其他语言再挑战。', yue:'呢個係你嘅介面語言，太易喇。轉第二種介面語言再挑戰啦。', vi:'Đây là ngôn ngữ giao diện của bạn nên quá dễ. Hãy đổi giao diện sang ngôn ngữ khác để làm bài.', th:'นี่คือภาษาที่ใช้แสดงผลอยู่ จึงง่ายเกินไป เปลี่ยนภาษาที่แสดงผลก่อนจึงจะทำได้', id:'Ini bahasa antarmukamu, jadi terlalu mudah. Ganti bahasa antarmuka untuk mengikuti tes ini.', hi:'यह आपकी इंटरफ़ेस भाषा है, इसलिए बहुत आसान होगा। यह टेस्ट देने के लिए इंटरफ़ेस भाषा बदलें।', de:'Das ist deine Oberflächensprache – zu leicht. Stelle die Oberfläche auf eine andere Sprache um.', fr:'C’est votre langue d’interface : trop facile. Changez la langue de l’interface pour passer ce test.', it:'È la lingua dell’interfaccia: troppo facile. Cambia lingua dell’interfaccia per fare il test.', es:'Es el idioma de la interfaz, así que sería demasiado fácil. Cambia el idioma de la interfaz para hacer esta prueba.', pt:'É o idioma da interface, então seria fácil demais. Troque o idioma da interface para fazer este teste.', ru:'Это язык интерфейса — слишком легко. Переключите интерфейс на другой язык.', uk:'Це мова інтерфейсу — надто легко. Перемкніть інтерфейс на іншу мову.', ar:'هذه لغة الواجهة، فسيكون الأمر سهلًا جدًا. غيّر لغة الواجهة لخوض هذا الاختبار.', he:'זו שפת הממשק שלך, ולכן זה קל מדי. החליפו את שפת הממשק כדי להיבחן.', sw:'Hii ni lugha ya kiolesura chako, kwa hiyo ni rahisi mno. Badilisha lugha ya kiolesura ili ufanye jaribio hili.'},
        uiTag: {en:'interface language', ja:'表示言語', ko:'표시 언어', zh:'界面语言', yue:'介面語言', vi:'ngôn ngữ giao diện', th:'ภาษาที่แสดง', id:'bahasa antarmuka', hi:'इंटरफ़ेस भाषा', de:'Oberflächensprache', fr:'langue d’interface', it:'lingua dell’interfaccia', es:'idioma de la interfaz', pt:'idioma da interface', ru:'язык интерфейса', uk:'мова інтерфейсу', ar:'لغة الواجهة', he:'שפת הממשק', sw:'lugha ya kiolesura'},
        already: {en:'Already mastered on {date} ({score}/10). Play again any time.', ja:'{date}にマスター済み（{score}/10）。何度でも挑戦できます。', ko:'{date}에 마스터함 ({score}/10). 언제든 다시 도전할 수 있어요.', zh:'已于{date}掌握（{score}/10），可以随时再挑战。', yue:'{date}已經搞掂（{score}/10），幾時都可以再玩。', vi:'Đã thành thạo ngày {date} ({score}/10). Có thể chơi lại bất cứ lúc nào.', th:'เป็นเซียนแล้วเมื่อ {date} ({score}/10) เล่นซ้ำได้ตลอด', id:'Sudah dikuasai pada {date} ({score}/10). Main lagi kapan saja.', hi:'{date} को मास्टर किया ({score}/10)। कभी भी फिर खेलें।', de:'Bereits gemeistert am {date} ({score}/10). Jederzeit nochmal spielbar.', fr:'Déjà maîtrisée le {date} ({score}/10). Rejouez quand vous voulez.', it:'Già padroneggiata il {date} ({score}/10). Rigioca quando vuoi.', es:'Ya dominado el {date} ({score}/10). Juega otra vez cuando quieras.', pt:'Já dominado em {date} ({score}/10). Jogue de novo quando quiser.', ru:'Уже освоен {date} ({score}/10). Можно сыграть снова.', uk:'Уже опановано {date} ({score}/10). Можна зіграти знову.', ar:'أُتقنت بتاريخ {date} ({score}/10). العب مجددًا متى شئت.', he:'נשלטה ב-{date} ({score}/10). אפשר לשחק שוב מתי שרוצים.', sw:'Uliimudu tarehe {date} ({score}/10). Cheza tena wakati wowote.'},
        start: {en:'Start — 10 questions', ja:'スタート（10問）', ko:'시작 (10문제)', zh:'开始（10题）', yue:'開始（10題）', vi:'Bắt đầu — 10 câu', th:'เริ่ม — 10 ข้อ', id:'Mulai — 10 soal', hi:'शुरू करें — 10 प्रश्न', de:'Start – 10 Fragen', fr:'Commencer — 10 questions', it:'Inizia — 10 domande', es:'Empezar — 10 preguntas', pt:'Começar — 10 perguntas', ru:'Начать — 10 вопросов', uk:'Почати — 10 питань', ar:'ابدأ — 10 أسئلة', he:'התחלה — 10 שאלות', sw:'Anza — maswali 10'},
        back: {en:'Choose another language', ja:'ほかの言語を選ぶ', ko:'다른 언어 선택', zh:'选择其他语言', yue:'揀第二種語言', vi:'Chọn ngôn ngữ khác', th:'เลือกภาษาอื่น', id:'Pilih bahasa lain', hi:'दूसरी भाषा चुनें', de:'Andere Sprache wählen', fr:'Choisir une autre langue', it:'Scegli un’altra lingua', es:'Elegir otro idioma', pt:'Escolher outro idioma', ru:'Выбрать другой язык', uk:'Обрати іншу мову', ar:'اختر لغة أخرى', he:'בחירת שפה אחרת', sw:'Chagua lugha nyingine'},
        q: {en:'What is “{word}” in {lang}?', ja:'{lang}で「{word}」は？', ko:'{lang}로 「{word}」는?', zh:'{lang}的「{word}」是哪个？', yue:'{lang}嘅「{word}」係邊個？', vi:'“{word}” trong {lang} là gì?', th:'“{word}” ใน{lang}คือคำไหน?', id:'Apa “{word}” dalam {lang}?', hi:'{lang} में “{word}” क्या है?', de:'Was heißt „{word}“ auf {lang}?', fr:'Comment dit-on « {word} » en {lang} ?', it:'Come si dice “{word}” in {lang}?', es:'¿Cómo se dice «{word}» en {lang}?', pt:'Como se diz “{word}” em {lang}?', ru:'Как будет «{word}» на языке {lang}?', uk:'Як буде «{word}» мовою {lang}?', ar:'ما «{word}» في {lang}؟', he:'מה זה „{word}” ב{lang}?', sw:'“{word}” kwa {lang} ni nini?'},
        correct: {en:'Correct!', ja:'正解！', ko:'정답!', zh:'答对了！', yue:'啱！', vi:'Chính xác!', th:'ถูกต้อง!', id:'Benar!', hi:'सही!', de:'Richtig!', fr:'Correct !', it:'Esatto!', es:'¡Correcto!', pt:'Certo!', ru:'Верно!', uk:'Правильно!', ar:'صحيح!', he:'נכון!', sw:'Sahihi!'},
        wrong: {en:'Not quite', ja:'惜しい！', ko:'아쉽네요', zh:'不对', yue:'唔啱', vi:'Chưa đúng', th:'ยังไม่ใช่', id:'Belum tepat', hi:'सही नहीं', de:'Leider nein', fr:'Raté', it:'Sbagliato', es:'Casi', pt:'Quase', ru:'Не совсем', uk:'Не зовсім', ar:'ليس تمامًا', he:'לא בדיוק', sw:'Si sahihi'},
        next: {en:'Next', ja:'次へ', ko:'다음', zh:'下一题', yue:'下一題', vi:'Tiếp', th:'ถัดไป', id:'Berikutnya', hi:'अगला', de:'Weiter', fr:'Suivant', it:'Avanti', es:'Siguiente', pt:'Próxima', ru:'Далее', uk:'Далі', ar:'التالي', he:'הבא', sw:'Inayofuata'},
        see: {en:'See result', ja:'結果を見る', ko:'결과 보기', zh:'查看结果', yue:'睇結果', vi:'Xem kết quả', th:'ดูผล', id:'Lihat hasil', hi:'परिणाम देखें', de:'Ergebnis', fr:'Voir le résultat', it:'Vedi risultato', es:'Ver resultado', pt:'Ver resultado', ru:'Результат', uk:'Результат', ar:'عرض النتيجة', he:'לתוצאה', sw:'Tazama matokeo'},
        passed: {en:'You mastered {lang}!', ja:'{lang}マスター！', ko:'{lang} 마스터!', zh:'你掌握了{lang}！', yue:'你搞掂咗{lang}！', vi:'Bạn đã thành thạo {lang}!', th:'คุณเป็นเซียน{lang}แล้ว!', id:'Kamu menguasai {lang}!', hi:'आपने {lang} मास्टर कर ली!', de:'Du meisterst {lang}!', fr:'Vous maîtrisez : {lang} !', it:'Hai padroneggiato: {lang}!', es:'¡Dominas {lang}!', pt:'Você domina {lang}!', ru:'Вы освоили: {lang}!', uk:'Ви опанували: {lang}!', ar:'لقد أتقنت {lang}!', he:'שלטת ב{lang}!', sw:'Wewe ni bingwa wa {lang}!'},
        failed: {en:'{score}/10 — 9 needed to master. Try again!', ja:'{score}/10 正解。マスターまであと少し（9問以上）！', ko:'{score}/10 정답. 마스터까지 조금만 더 (9문제 이상)!', zh:'答对 {score}/10。需要9题才能成为大师，再试一次！', yue:'答啱 {score}/10。要9題先係大師，再試吓！', vi:'Đúng {score}/10 — cần 9 câu. Thử lại nhé!', th:'ตอบถูก {score}/10 ต้องได้ 9 ข้อ ลองอีกครั้ง!', id:'Benar {score}/10 — butuh 9. Coba lagi!', hi:'{score}/10 सही — मास्टर के लिए 9 चाहिए। फिर कोशिश करें!', de:'{score}/10 – 9 brauchst du. Nochmal!', fr:'{score}/10 — il en faut 9. Réessayez !', it:'{score}/10 — ne servono 9. Riprova!', es:'{score}/10: hacen falta 9. ¡Inténtalo otra vez!', pt:'{score}/10 — são precisos 9. Tente de novo!', ru:'{score}/10 — нужно 9. Попробуйте ещё раз!', uk:'{score}/10 — потрібно 9. Спробуйте ще!', ar:'{score}/10 — تحتاج إلى 9. حاول مجددًا!', he:'{score}/10 — צריך 9. נסו שוב!', sw:'{score}/10 — unahitaji 9. Jaribu tena!'},
        again: {en:'Try again', ja:'もう一度', ko:'다시 하기', zh:'再试一次', yue:'再試一次', vi:'Chơi lại', th:'เล่นอีกครั้ง', id:'Coba lagi', hi:'फिर से', de:'Nochmal', fr:'Rejouer', it:'Riprova', es:'Otra vez', pt:'De novo', ru:'Ещё раз', uk:'Ще раз', ar:'مرة أخرى', he:'שוב', sw:'Tena'},
        close: {en:'Close', ja:'閉じる', ko:'닫기', zh:'关闭', yue:'閂', vi:'Đóng', th:'ปิด', id:'Tutup', hi:'बंद करें', de:'Schließen', fr:'Fermer', it:'Chiudi', es:'Cerrar', pt:'Fechar', ru:'Закрыть', uk:'Закрити', ar:'إغلاق', he:'סגירה', sw:'Funga'},
        short: {en:'Not enough words for this language yet — try another.', ja:'この言語はまだ単語が足りません。ほかの言語を選んでください。', ko:'이 언어는 아직 단어가 부족합니다. 다른 언어를 골라 주세요.', zh:'这种语言的单词还不够，请换一种。', yue:'呢種語言啲詞仲未夠，揀過第二種啦。', vi:'Ngôn ngữ này chưa đủ từ — hãy chọn ngôn ngữ khác.', th:'ภาษานี้ยังมีคำไม่พอ ลองเลือกภาษาอื่น', id:'Kata untuk bahasa ini belum cukup — coba yang lain.', hi:'इस भाषा के शब्द अभी पर्याप्त नहीं — दूसरी चुनें।', de:'Für diese Sprache gibt es noch zu wenige Wörter.', fr:'Pas encore assez de mots pour cette langue.', it:'Parole insufficienti per questa lingua.', es:'Aún no hay suficientes palabras de este idioma.', pt:'Ainda não há palavras suficientes deste idioma.', ru:'Для этого языка пока мало слов.', uk:'Для цієї мови поки замало слів.', ar:'لا توجد كلمات كافية لهذه اللغة بعد.', he:'אין עדיין מספיק מילים לשפה זו.', sw:'Maneno ya lugha hii bado hayatoshi.'},
        mastered: {en:'Mastered', ja:'マスター済み', ko:'마스터함', zh:'已掌握', yue:'搞掂咗', vi:'Đã thành thạo', th:'เป็นเซียนแล้ว', id:'Dikuasai', hi:'मास्टर', de:'Gemeistert', fr:'Maîtrisée', it:'Padroneggiata', es:'Dominado', pt:'Dominado', ru:'Освоен', uk:'Опановано', ar:'مُتقنة', he:'נשלטה', sw:'Umeimudu'},
        master: {en:'MASTER', ja:'マスター', ko:'마스터', zh:'大师', yue:'大師', vi:'BẬC THẦY', th:'เซียน', id:'MASTER', hi:'मास्टर', de:'MEISTER', fr:'MAÎTRE', it:'MAESTRO', es:'MAESTRO', pt:'MESTRE', ru:'МАСТЕР', uk:'МАЙСТЕР', ar:'متقن', he:'אלוף', sw:'BINGWA'},
        loading: {en:'Loading…', ja:'読み込み中…', ko:'불러오는 중…', zh:'加载中…', yue:'載入緊…', vi:'Đang tải…', th:'กำลังโหลด…', id:'Memuat…', hi:'लोड हो रहा है…', de:'Lädt…', fr:'Chargement…', it:'Caricamento…', es:'Cargando…', pt:'Carregando…', ru:'Загрузка…', uk:'Завантаження…', ar:'جارٍ التحميل…', he:'טוען…', sw:'Inapakia…'}
    };

    // ---- data access -------------------------------------------------------
    function LD() { return (typeof LANG_DATA !== 'undefined' && LANG_DATA) ? LANG_DATA : (window.LANG_DATA || {}); }
    function EXC() { return (typeof EXCLUDED_CODES !== 'undefined' && EXCLUDED_CODES) ? EXCLUDED_CODES : new Set(); }
    function nameOf(code) {
        var r = LD()[code] || {};
        return window.__langNameFor ? window.__langNameFor(ui(), code, 'full', r.name) : (r.name || code);
    }
    function labelOf(con) {
        var u = ui(), base = u.split('_')[0];
        var src = (window.WORD_LABELS && window.WORD_LABELS[con]) || (window.WORDS && window.WORDS[con]) || null;
        var l = src && src.label;
        return (l && (l[u] || l[base] || l.en)) || con;
    }
    function cellsOf(code) {
        var w = (LD()[code] || {}).words || {}, out = [], seen = {};
        Object.keys(w).forEach(function (con) {
            if (SKIP[con]) return;
            var e = w[con], s, ipa;
            if (Array.isArray(e)) { s = e[0]; ipa = e[1]; } else if (e && typeof e === 'object') { s = e.form; ipa = e.ipa; }
            if (!s || s === '—' || seen[s]) return;
            seen[s] = 1;
            out.push({ con: con, s: s, ipa: ipa || '' });
        });
        return out;
    }
    // A row in the reader's own interface language (or one of its varieties)
    // would be a giveaway, so it cannot be taken while that UI is on.
    function isUiLang(code) { var base = ui().split('_')[0]; return code === base || code.indexOf(base + '_') === 0; }
    function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
    function makeSet(code) {
        var cells = cellsOf(code);
        if (cells.length < MIN_CELLS) return null;
        var picks = shuffle(cells).slice(0, TOTAL);
        return picks.map(function (ans) {
            var others = shuffle(cells.filter(function (c) { return c.s !== ans.s; })).slice(0, CHOICES - 1);
            return { con: ans.con, options: shuffle([ans].concat(others)), answer: ans.s };
        });
    }

    // ---- badges (this browser only) ---------------------------------------
    function loadBadges() { try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch (e) { return {}; } }
    function saveBadge(code, score) {
        var b = loadBadges(), prev = b[code];
        if (!prev || score > prev.score) b[code] = { score: score, date: new Date().toISOString().slice(0, 10) };
        try { localStorage.setItem(STORE, JSON.stringify(b)); } catch (e) {}
        var bt = document.getElementById('master-open'); if (bt) bt.title = pk(T.tag) + ' · 🏅 ' + Object.keys(b).length;
    }
    // A badge colour per language family, so a collection reads as a map of families.
    function hue(code) {
        var fam = (((LD()[code] || {}).meta || {}).family || code).split(/[ (,]/)[0];
        var h = 0; for (var i = 0; i < fam.length; i++) h = (h * 31 + fam.charCodeAt(i)) % 360;
        return h;
    }
    function badgeSVG(code, size) {
        var h = hue(code), n = (LD()[code] || {}).native || nameOf(code);
        var label = n.length > 9 ? n.slice(0, 8) + '…' : n;
        return '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '" role="img" aria-label="' + esc(nameOf(code)) + '">'
            + '<circle cx="50" cy="50" r="47" fill="hsl(' + h + ',55%,42%)"/>'
            + '<circle cx="50" cy="50" r="40" fill="none" stroke="hsl(' + h + ',70%,82%)" stroke-width="2" stroke-dasharray="3 3"/>'
            + '<text x="50" y="46" text-anchor="middle" font-size="' + (label.length > 6 ? 13 : 17) + '" font-weight="700" fill="#fff" dir="auto">' + esc(label) + '</text>'
            + '<text x="50" y="66" text-anchor="middle" font-size="10" font-weight="800" letter-spacing="1.5" fill="hsl(' + h + ',80%,88%)">' + esc(pk(T.master)) + '</text>'
            + '</svg>';
    }
    function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

    // ---- UI ----------------------------------------------------------------
    var modal = null, box = null, state = { screen: 'pick', code: null, qs: [], idx: 0, score: 0, chosen: -1, filter: '' };
    function el(tag, css, html) { var e = document.createElement(tag); if (css) e.style.cssText = css; if (html != null) e.innerHTML = html; return e; }
    function build() {
        modal = el('div', 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:100002;display:flex;align-items:center;justify-content:center;padding:16px');
        box = el('div', 'background:#fff;color:#222;border-radius:14px;max-width:460px;width:100%;height:min(92vh,660px);overflow:hidden;padding:20px 22px;box-shadow:0 10px 32px rgba(0,0,0,.2);display:flex;flex-direction:column;box-sizing:border-box');
        box.id = 'lm-master-box'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
        modal.appendChild(box);
        modal.addEventListener('click', function (e) { if (e.target === modal) hide(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal && modal.style.display !== 'none') hide(); });
        document.body.appendChild(modal);
    }
    function setOpen(on) {
        window.__wmOpenGame = on ? 'master' : (window.__wmOpenGame === 'master' ? null : window.__wmOpenGame);
        if (window.__langmap && window.__langmap.updateHash) window.__langmap.updateHash();
    }
    function show() { if (!modal) build(); modal.style.display = 'flex'; render(); setOpen(true); }
    function hide() { if (modal) modal.style.display = 'none'; setOpen(false); }

    function header(right) {
        box.dir = /^(ar|he)/.test(ui()) ? 'rtl' : 'ltr';
        box.appendChild(el('div', 'display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;flex:none',
            '<div style="font-weight:800;font-size:20px">🏅 ' + esc(pk(T.title)) + '</div><div style="color:#8a93a3;font-weight:600;font-size:14px">' + (right || '') + '</div>'));
    }
    function btn(label, primary, onClick) {
        var b = el('button', primary
            ? 'width:100%;margin-top:10px;padding:12px;border:0;border-radius:10px;background:var(--accent,#2e6fb8);color:#fff;font-weight:700;font-size:16px;cursor:pointer;flex:none'
            : 'width:100%;margin-top:8px;padding:8px;border:0;background:none;color:#7a8291;font-size:14px;cursor:pointer;flex:none', esc(label));
        b.type = 'button'; b.addEventListener('click', onClick); return b;
    }
    function render() {
        if (!box) return;
        box.innerHTML = '';
        if (state.screen === 'pick') renderPick();
        else if (state.screen === 'intro') renderIntro();
        else if (state.screen === 'quiz') renderQuiz();
        else renderResult();
    }

    function langList() {
        var d = LD(), ex = EXC(), badges = loadBadges();
        return Object.keys(d).filter(function (k) { return d[k] && d[k].name && !ex.has(k); })
            .map(function (k) {
                var m = d[k].meta || {}, sc = m.speakerCount || {};
                return { code: k, name: nameOf(k), en: d[k].name, native: d[k].native || '', spk: sc.l1 || sc.total || 0, done: !!badges[k] };
            });
    }
    function renderPick() {
        var badges = loadBadges(), codes = Object.keys(badges);
        header(codes.length ? '🏅 ' + codes.length : '');
        box.appendChild(el('div', 'color:#556;font-size:14px;line-height:1.5;margin-bottom:10px;flex:none', esc(pk(T.sub))));
        // badge shelf
        var shelf = el('div', 'flex:none;margin-bottom:10px');
        shelf.appendChild(el('div', 'font-size:12px;font-weight:700;color:#8a93a3;margin-bottom:4px', esc(pk(T.badges))));
        if (!codes.length) shelf.appendChild(el('div', 'font-size:13px;color:#9aa1ad', esc(pk(T.none))));
        else {
            var row = el('div', 'display:flex;gap:6px;overflow-x:auto;padding-bottom:4px');
            codes.forEach(function (c) {
                var b = el('button', 'border:0;background:none;padding:0;cursor:pointer;flex:none', badgeSVG(c, 52));
                b.type = 'button'; b.title = nameOf(c); b.addEventListener('click', function () { pick(c); });
                row.appendChild(b);
            });
            shelf.appendChild(row);
        }
        box.appendChild(shelf);
        var inp = el('input', 'width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #d8dbe2;border-radius:10px;font-size:15px;flex:none');
        inp.type = 'search'; inp.placeholder = pk(T.search); inp.value = state.filter; inp.setAttribute('aria-label', pk(T.search));
        box.appendChild(inp);
        var list = el('div', 'flex:1;min-height:0;overflow-y:auto;margin-top:8px;border-top:1px solid #eef0f3');
        box.appendChild(list);
        var all = langList().sort(function (a, b) { return (b.spk - a.spk) || a.name.localeCompare(b.name); });
        function fill() {
            var q = state.filter.trim().toLowerCase();
            var rows = q ? all.filter(function (r) { return (r.name + ' ' + r.en + ' ' + r.native + ' ' + r.code).toLowerCase().indexOf(q) >= 0; }) : all;
            list.innerHTML = '';
            rows.slice(0, 200).forEach(function (r) {
                var it = el('button', 'display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px;padding:9px 6px;border:0;border-bottom:1px solid #f1f2f5;background:none;cursor:pointer;text-align:start;font-size:15px;color:#222',
                    '<span><span>' + esc(r.name) + '</span>' + (r.native && r.native !== r.name ? ' <span style="color:#9aa1ad;font-size:13px" dir="auto">' + esc(r.native) + '</span>' : '') + '</span>'
                    + (r.done ? '<span style="font-size:12px;color:#0d7a55;white-space:nowrap">🏅 ' + esc(pk(T.mastered)) + '</span>'
                        : isUiLang(r.code) ? '<span style="font-size:12px;color:#9aa1ad;white-space:nowrap">' + esc(pk(T.uiTag)) + '</span>' : ''));
                it.type = 'button'; it.addEventListener('click', function () { pick(r.code); });
                list.appendChild(it);
            });
        }
        inp.addEventListener('input', function () { state.filter = inp.value; fill(); });
        fill();
        box.appendChild(btn(pk(T.close), false, hide));
        setTimeout(function () { try { inp.focus(); } catch (e) {} }, 30);
    }
    function pick(code) {
        state.code = code; state.screen = 'intro'; render();
        var jobs = [];
        if (window.__wmEnsureLangWords) jobs.push(window.__wmEnsureLangWords(code));
        if (window.__langmap && window.__langmap.loadLangDesc) jobs.push(window.__langmap.loadLangDesc(code));
        Promise.all(jobs).then(function () { if (state.screen === 'intro' && state.code === code) render(); }, function () {});
    }
    function descOf(code) {
        var m = (LD()[code] || {}).meta || {}, d = m.description;
        if (!d) return '';
        var u = ui(), t = (typeof d === 'string') ? d : (d[u] || d[u.split('_')[0]] || d.en || '');
        // the first two sentences are enough for a briefing
        var parts = t.split(/(?<=[.!?])\s+|(?<=[。！？])/);
        return parts.slice(0, 2).join(' ');
    }
    function renderIntro() {
        var code = state.code, r = LD()[code] || {}, m = r.meta || {};
        header('');
        var mid = el('div', 'flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px');
        mid.appendChild(el('div', 'margin-top:6px', badgeSVG(code, 84)));
        mid.appendChild(el('div', 'font-weight:800;font-size:22px', esc(nameOf(code))));
        if (r.native && r.native !== nameOf(code)) mid.appendChild(el('div', 'color:#667;font-size:16px', '<span dir="auto">' + esc(r.native) + '</span>'));
        var had = loadBadges()[code];
        if (had) mid.appendChild(el('div', 'color:#0d7a55;background:#eef9f3;border:1px solid #bfe6d2;border-radius:10px;padding:8px 12px;font-size:14px;font-weight:600', '🏅 ' + esc(pk(T.already).replace('{date}', had.date).replace('{score}', had.score))));
        var facts = [];
        var mi = (typeof META_I18N !== 'undefined' && META_I18N) ? (META_I18N[ui()] || META_I18N[ui().split('_')[0]] || {}) : {};
        if (m.family) facts.push('<b>' + esc(pk(T.family)) + '</b> ' + esc(mi[m.family] || m.family));
        if (m.speakers) facts.push('<b>' + esc(pk(T.speakers)) + '</b> ' + esc(m.speakers));
        if (facts.length) mid.appendChild(el('div', 'color:#556;font-size:13px;line-height:1.6', facts.join('<br>')));
        var ready = !window.__wmLangWordsLoaded || window.__wmLangWordsLoaded(code);
        var d = descOf(code);
        if (d) mid.appendChild(el('div', 'color:#333;font-size:14px;line-height:1.6;text-align:start;background:#f6f7f9;border-radius:10px;padding:10px 12px', esc(d)));
        else if (!ready) mid.appendChild(el('div', 'color:#9aa1ad;font-size:14px', esc(pk(T.loading))));
        box.appendChild(mid);
        if (isUiLang(code)) {
            box.appendChild(el('div', 'color:#8a5a00;background:#fff7e6;border:1px solid #f0d9a8;border-radius:10px;padding:10px 12px;font-size:14px;line-height:1.5;margin-top:8px;flex:none', esc(pk(T.uiSame))));
        } else if (ready) {
            box.appendChild(el('div', 'text-align:center;font-weight:800;font-size:15px;color:#b45309;background:#fff4e5;border-radius:10px;padding:8px;margin-top:8px;flex:none', '🎯 ' + esc(pk(T.rule))));
            var set = makeSet(code);
            if (set) box.appendChild(btn(pk(T.start), true, function () {
                state.qs = set; state.idx = 0; state.score = 0; state.chosen = -1; state.screen = 'quiz'; render();
            }));
            else box.appendChild(el('div', 'color:#c0405a;font-size:14px;text-align:center;margin-top:8px', esc(pk(T.short))));
        }
        box.appendChild(btn(pk(T.back), false, function () { state.screen = 'pick'; render(); }));
    }
    function renderQuiz() {
        var q = state.qs[state.idx], answered = state.chosen >= 0;
        header((state.idx + 1) + '/' + TOTAL + ' · ★' + state.score);
        var miss = (state.idx + (answered ? 1 : 0)) - state.score, leftN = (TOTAL - PASS) - miss;
        box.appendChild(el('div', 'text-align:center;font-size:13px;font-weight:700;flex:none;border-radius:8px;padding:5px;' + (leftN >= 0 ? 'color:#b45309;background:#fff4e5' : 'color:#7a8291;background:#f3f4f6'),
            leftN >= 0 ? '🎯 ' + esc(pk(T.ruleShort)) + ' · ' + esc(pk(T.left).replace('{n}', leftN)) : esc(pk(T.out))));
        var mid = el('div', 'flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;justify-content:safe center');
        var qtext = pk(T.q).replace('{word}', '<b style="color:#222">' + esc(labelOf(q.con)) + '</b>').replace('{lang}', '<b style="color:#222">' + esc(nameOf(state.code)) + '</b>');
        mid.appendChild(el('div', 'color:#556;font-size:17px;margin-bottom:14px;line-height:1.5;text-align:center', qtext));
        q.options.forEach(function (o, i) {
            var css = 'width:100%;box-sizing:border-box;min-height:58px;padding:8px 12px;margin-bottom:7px;border:1px solid #d8dbe2;border-radius:10px;background:#fff;color:#222;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center';
            var isAns = o.s === q.answer;
            if (answered) {
                css = css.replace('cursor:pointer', 'cursor:default');
                if (isAns) css += ';border-color:#0d9f6e;background:#f1faf5;color:#0d7a55';
                else if (i === state.chosen) css += ';border-color:#e2a3af;background:#fdf1f3;color:#c0405a';
                else css += ';opacity:.55';
            }
            var b = el('button', css,
                '<span style="font-size:20px;line-height:1.2" dir="auto">' + esc(o.s) + '</span>'
                + (o.ipa ? '<span style="font-size:12px;color:#8a93a3;margin-top:2px">/' + esc(o.ipa) + '/</span>' : '')
                + (answered && !isAns ? '<span style="font-size:12px;color:#8a93a3;margin-top:2px">= ' + esc(labelOf(o.con)) + '</span>' : ''));
            b.type = 'button';
            if (!answered) b.addEventListener('click', function () { state.chosen = i; if (isAns) state.score++; render(); });
            mid.appendChild(b);
        });
        box.appendChild(mid);
        var ok = answered && q.options[state.chosen].s === q.answer;
        box.appendChild(el('div', 'text-align:center;font-weight:800;font-size:16px;margin:4px 0 0;flex:none;color:' + (ok ? '#0d9f6e' : '#d4506a') + ';visibility:' + (answered ? 'visible' : 'hidden'), esc(answered ? (ok ? pk(T.correct) : pk(T.wrong)) : pk(T.correct))));
        var nb = btn(state.idx + 1 >= TOTAL ? pk(T.see) : pk(T.next), true, function () {
            state.idx++; state.chosen = -1;
            if (state.idx >= TOTAL) { state.screen = 'result'; if (state.score >= PASS) saveBadge(state.code, state.score); }
            render();
        });
        nb.style.visibility = answered ? 'visible' : 'hidden';
        box.appendChild(nb);
        box.appendChild(btn(pk(T.quit), false, function () {
            if (!window.confirm(pk(T.quitask))) return;
            state.qs = []; state.idx = 0; state.score = 0; state.chosen = -1; state.screen = 'intro'; render();
        }));
    }
    function renderResult() {
        var won = state.score >= PASS, code = state.code;
        header('★' + state.score + '/' + TOTAL);
        var mid = el('div', 'flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:10px');
        if (won) {
            mid.appendChild(el('div', '', badgeSVG(code, 140)));
            mid.appendChild(el('div', 'font-weight:800;font-size:22px', esc(pk(T.passed).replace('{lang}', nameOf(code)))));
        } else {
            mid.appendChild(el('div', 'font-size:52px', '🌍'));
            mid.appendChild(el('div', 'font-weight:700;font-size:18px;line-height:1.5', esc(pk(T.failed).replace('{score}', state.score))));
        }
        box.appendChild(mid);
        box.appendChild(btn(pk(T.again), true, function () {
            var set = makeSet(code); if (!set) return;
            state.qs = set; state.idx = 0; state.score = 0; state.chosen = -1; state.screen = 'quiz'; render();
        }));
        box.appendChild(btn(pk(T.back), false, function () { state.screen = 'pick'; render(); }));
        box.appendChild(btn(pk(T.close), false, hide));
    }

    // ---- launcher ----------------------------------------------------------
    function openGame() {
        var lm = window.__langmap && window.__langmap.loadMeta;
        var meta = (window._wmMetaLoaded || !lm) ? Promise.resolve() : lm();
        state.screen = state.screen === 'quiz' ? 'quiz' : 'pick';
        show();
        meta.then(function () { if (state.screen === 'pick') render(); }, function () {});
    }
    function localize() {
        var l = document.getElementById('master-btn-label'); if (l) l.textContent = pk(T.title);
        var n = Object.keys(loadBadges()).length; var b = document.getElementById('master-open'); if (b) b.title = pk(T.tag) + (n ? ' · 🏅 ' + n : '');
        if (modal && modal.style.display !== 'none') render();
    }
    function init() {
        var b = document.getElementById('master-open');
        if (b && !b._wired) { b._wired = true; b.addEventListener('click', openGame); }
        window.__wmGames = window.__wmGames || {}; window.__wmGames.master = openGame;
        localize();
        window.addEventListener('langmap:uichange', localize);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
