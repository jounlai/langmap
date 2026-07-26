// UI translations
const UI_STRINGS = {
    ja: { title: 'LangMap', subtitle: '多言語語順マップ', selectSentence: '文章選択', langToggle: '表示言語', langOrder: '言語の順序', dragHint: 'ドラッグで並べ替え', defaultOrder: 'デフォルト順', random: 'ランダム', prev: '◀', next: '▶', allOn: '全ON', allOff: '全OFF', savePng: 'PNG保存', saveSvg: 'SVG保存', copyUrl: 'URLコピー', copied: 'URLをコピーしました', uiLang: 'UI言語:', noLangSelected: '1つ以上の言語を選択してください', selectLangs: '言語選択（{n}言語）', saveViewCsv: 'CSV保存', saveCsv: 'CSV', ogTitle: 'LangMap - 多言語語順マップ', ogDesc: '220以上の言語・方言・古代語の語順をインタラクティブに比較できるマップ', selectLangsTitle: '言語選択', modalConfirm: '選択', modalCancel: 'キャンセル', edit: '編集', save: '保存', cancel: 'キャンセル', corrector: '添削者:', correctionSaved: '修正を保存しました', copyText: 'テキストをコピー', copiedText: 'テキストをコピーしました', rtlNote: '※ アラビア文字・ヘブライ文字は比較のため左→右で表示しています（実際は右→左に読みます）', rtlToggle: '元の語順(←)で表示', pending: '準備中', creditText: '制作: <a href="https://heuron.com" target="_blank" rel="noopener">ヒューロン株式会社</a> 趙 俊来 (Jounlai Cho)', disclaimer: '本サイトは学習・娯楽を目的として制作されたものであり、言語学的な厳密性を保証するものではございません。誤りや改善点をお気づきの際は、<a href="https://github.com/jounlai/langmap" target="_blank" rel="noopener">GitHub</a>にてご修正いただくか、<a href="mailto:cho@heuron.com">作者</a>までご連絡くださいますようお願い申し上げます。' , en_au:"英語(オーストラリア)", en_in:"英語(インド)", es_ar:"スペイン語(アルゼンチン)", ar_iq:"アラビア語(イラク方言)", hak_cn:"客家語"},
    ko: { title: 'LangMap', subtitle: '다국어 어순 맵', selectSentence: '문장 선택', langToggle: '표시 언어', langOrder: '언어 순서', dragHint: '드래그하여 정렬', defaultOrder: '기본 순서', random: '랜덤', prev: '◀', next: '▶', allOn: '전체 ON', allOff: '전체 OFF', savePng: 'PNG 저장', saveSvg: 'SVG 저장', copyUrl: 'URL 복사', copied: 'URL을 복사했습니다', uiLang: 'UI 언어:', noLangSelected: '1개 이상의 언어를 선택하세요', selectLangs: '언어 선택 (전체 {n}개)', selectLangsTitle: '언어 선택', modalConfirm: '선택', modalCancel: '취소', rtlNote: '※ 아랍 문자·히브리 문자는 비교를 위해 왼→오른쪽으로 표시합니다 (실제로는 오른→왼쪽으로 읽습니다)', rtlToggle: '원래 방향(←)으로 표시' , en_au:"영어(호주)", en_in:"영어(인도)", es_ar:"스페인어(아르헨티나)", ar_iq:"아랍어(이라크 방언)", hak_cn:"객가어", pending: "준비 중", saveViewCsv: "CSV 저장", saveCsv: "CSV", creditText: "제작: <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "본 사이트는 학습·오락 목적으로 제작되었으며 언어학적 엄밀성을 보장하지 않습니다. 오류나 개선점을 발견하시면 <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a>에서 수정하시거나 <a href=\"mailto:cho@heuron.com\">작성자</a>에게 연락해 주시기 바랍니다.", edit: "편집", save: "저장", cancel: "취소", corrector: "교정자:", correctionSaved: "수정이 저장되었습니다", copyText: "텍스트 복사", copiedText: "텍스트를 복사했습니다", ogTitle: "LangMap - 다국어 어순 맵", ogDesc: "220개 이상의 언어, 방언, 고대어의 어순을 인터랙티브하게 비교하는 맵"},
    zh: { title: 'LangMap', subtitle: '多语言语序图', selectSentence: '选择句子', langToggle: '显示语言', langOrder: '语言顺序', dragHint: '拖拽排序', defaultOrder: '默认顺序', random: '随机', prev: '◀', next: '▶', allOn: '全部开', allOff: '全部关', savePng: '保存PNG', saveSvg: '保存SVG', copyUrl: '复制链接', copied: '链接已复制', uiLang: 'UI语言:', noLangSelected: '请选择至少一种语言', selectLangs: '语言选择（共{n}种）', selectLangsTitle: '语言选择', modalConfirm: '确定', modalCancel: '取消', rtlNote: '※ 阿拉伯文字、希伯来文字为便于比较从左→右显示（实际从右→左阅读）', rtlToggle: '显示原始方向(←)' , en_au:"英语(澳大利亚)", en_in:"英语(印度)", es_ar:"西班牙语(阿根廷)", ar_iq:"阿拉伯语(伊拉克方言)", hak_cn:"客家话", pending: "准备中", saveViewCsv: "保存CSV", saveCsv: "CSV", creditText: "制作: <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "本站为学习和娱乐目的而制作，不保证语言学上的严谨性。如发现错误或改进建议，请通过 <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> 提交或联系<a href=\"mailto:cho@heuron.com\">作者</a>。", edit: "编辑", save: "保存", cancel: "取消", corrector: "校对者:", correctionSaved: "修正已保存", copyText: "复制文本", copiedText: "文本已复制", ogTitle: "LangMap - 多语言语序图", ogDesc: "以互动方式比较220多种语言、方言及古代语言的语序"},
    yue: { title: 'LangMap', subtitle: '多語言語序圖', selectSentence: '揀句子', langToggle: '顯示語言', langOrder: '語言順序', dragHint: '拖嚟排序', defaultOrder: '預設順序', random: '隨機', prev: '◀', next: '▶', allOn: '全開', allOff: '全關', savePng: '儲存PNG', saveSvg: '儲存SVG', copyUrl: '複製連結', copied: '連結已複製', uiLang: 'UI語言:', noLangSelected: '請揀至少一種語言', selectLangs: '語言選擇（共{n}種）', selectLangsTitle: '語言選擇', modalConfirm: '確定', modalCancel: '取消', rtlNote: '※ 阿拉伯文字、希伯來文字為咗比較用左→右顯示（實際係右→左讀）', rtlToggle: '顯示原本方向(←)' , en_au:"英文(澳洲)", en_in:"英文(印度)", es_ar:"西班牙文(阿根廷)", ar_iq:"阿拉伯文(伊拉克)", hak_cn:"客家話", pending: "準備中", saveViewCsv: "儲存CSV", saveCsv: "CSV", creditText: "製作: <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "本站係為咗學習同娛樂而整，唔保證語言學上嘅嚴謹性。如發現錯誤或有改進建議，請經 <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> 提交或聯絡<a href=\"mailto:cho@heuron.com\">作者</a>。", edit: "編輯", save: "儲存", cancel: "取消", corrector: "校對者:", correctionSaved: "修正已儲存", copyText: "複製文字", copiedText: "文字已複製", ogTitle: "LangMap - 多語言語序圖", ogDesc: "以互動方式比較220多種語言、方言及古代語言嘅語序"},
    vi: { title: 'LangMap', subtitle: 'Bản đồ trật tự từ đa ngôn ngữ', selectSentence: 'Chọn câu', langToggle: 'Ngôn ngữ hiển thị', langOrder: 'Thứ tự ngôn ngữ', dragHint: 'kéo để sắp xếp', defaultOrder: 'Mặc định', random: 'Ngẫu nhiên', prev: '◀', next: '▶', allOn: 'Bật tất cả', allOff: 'Tắt tất cả', savePng: 'Lưu PNG', saveSvg: 'Lưu SVG', copyUrl: 'Sao chép URL', copied: 'Đã sao chép URL', uiLang: 'Ngôn ngữ UI:', noLangSelected: 'Vui lòng chọn ít nhất một ngôn ngữ', selectLangs: 'Chọn ngôn ngữ ({n})', selectLangsTitle: 'Chọn ngôn ngữ', modalConfirm: 'Chọn', modalCancel: 'Hủy', rtlNote: '※ Chữ Ả Rập và chữ Do Thái được hiển thị trái→phải để so sánh (thực tế đọc phải→trái)', rtlToggle: 'Hiển thị hướng gốc (←)' , en_au:"Tiếng Anh (Úc)", en_in:"Tiếng Anh (Ấn Độ)", es_ar:"Tiếng Tây Ban Nha (Argentina)", ar_iq:"Tiếng Ả Rập (Iraq)", hak_cn:"Tiếng Khách Gia", pending: "Đang chuẩn bị", saveViewCsv: "Lưu CSV", saveCsv: "CSV", creditText: "Thực hiện bởi <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "Trang này được tạo nhằm mục đích học tập và giải trí, không đảm bảo tính chính xác về mặt ngôn ngữ học. Nếu bạn phát hiện lỗi hoặc có góp ý, vui lòng gửi chỉnh sửa qua <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> hoặc liên hệ <a href=\"mailto:cho@heuron.com\">tác giả</a>.", edit: "Chỉnh sửa", save: "Lưu", cancel: "Hủy", corrector: "Người sửa:", correctionSaved: "Đã lưu chỉnh sửa", copyText: "Sao chép văn bản", copiedText: "Đã sao chép văn bản", ogTitle: "LangMap - Bản đồ trật tự từ đa ngôn ngữ", ogDesc: "So sánh trật tự từ giữa hơn 220 ngôn ngữ, phương ngữ và ngôn ngữ cổ đại"},
    th: { title: 'LangMap', subtitle: 'แผนที่ลำดับคำหลายภาษา', selectSentence: 'เลือกประโยค', langToggle: 'ภาษาที่แสดง', langOrder: 'ลำดับภาษา', dragHint: 'ลากเพื่อจัดเรียง', defaultOrder: 'ค่าเริ่มต้น', random: 'สุ่ม', prev: '◀', next: '▶', allOn: 'เปิดทั้งหมด', allOff: 'ปิดทั้งหมด', savePng: 'บันทึก PNG', saveSvg: 'บันทึก SVG', copyUrl: 'คัดลอก URL', copied: 'คัดลอก URL แล้ว', uiLang: 'ภาษา UI:', noLangSelected: 'กรุณาเลือกอย่างน้อยหนึ่งภาษา', selectLangs: 'เลือกภาษา ({n} ภาษา)', selectLangsTitle: 'เลือกภาษา', modalConfirm: 'เลือก', modalCancel: 'ยกเลิก', rtlNote: '※ อักษรอาหรับและอักษรฮีบรูแสดงซ้าย→ขวาเพื่อการเปรียบเทียบ (ปกติอ่านขวา→ซ้าย)', rtlToggle: 'แสดงทิศทางดั้งเดิม (←)' , en_au:"อังกฤษ (ออสเตรเลีย)", en_in:"อังกฤษ (อินเดีย)", es_ar:"สเปน (อาร์เจนตินา)", ar_iq:"อาหรับ (อิรัก)", hak_cn:"จีนแคะ", pending: "กำลังเตรียม", saveViewCsv: "บันทึก CSV", saveCsv: "CSV", creditText: "สร้างโดย <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "เว็บไซต์นี้จัดทำขึ้นเพื่อการเรียนรู้และความบันเทิง ไม่ได้รับรองความถูกต้องทางภาษาศาสตร์ หากพบข้อผิดพลาดหรือมีข้อเสนอแนะ กรุณาแก้ไขผ่าน <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> หรือติดต่อ<a href=\"mailto:cho@heuron.com\">ผู้จัดทำ</a>", edit: "แก้ไข", save: "บันทึก", cancel: "ยกเลิก", corrector: "ผู้แก้ไข:", correctionSaved: "บันทึกการแก้ไขแล้ว", copyText: "คัดลอกข้อความ", copiedText: "คัดลอกข้อความแล้ว", ogTitle: "LangMap - แผนที่ลำดับคำหลายภาษา", ogDesc: "เปรียบเทียบลำดับคำในกว่า 220 ภาษา สำเนียง และภาษาโบราณ"},
    id: { title: 'LangMap', subtitle: 'Peta Urutan Kata Multibahasa', selectSentence: 'Pilih kalimat', langToggle: 'Bahasa ditampilkan', langOrder: 'Urutan bahasa', dragHint: 'seret untuk mengurutkan', defaultOrder: 'Urutan default', random: 'Acak', prev: '◀', next: '▶', allOn: 'Semua ON', allOff: 'Semua OFF', savePng: 'Simpan PNG', saveSvg: 'Simpan SVG', copyUrl: 'Salin URL', copied: 'URL disalin', uiLang: 'Bahasa UI:', noLangSelected: 'Pilih setidaknya satu bahasa', selectLangs: 'Pilih bahasa ({n})', selectLangsTitle: 'Pilih bahasa', modalConfirm: 'Pilih', modalCancel: 'Batal', rtlNote: '※ Aksara Arab dan aksara Ibrani ditampilkan kiri→kanan untuk perbandingan (biasanya dibaca kanan→kiri)', rtlToggle: 'Tampilkan arah asli (←)' , en_au:"Inggris (Australia)", en_in:"Inggris (India)", es_ar:"Spanyol (Argentina)", ar_iq:"Arab (Irak)", hak_cn:"Hakka", pending: "Disiapkan", saveViewCsv: "Simpan CSV", saveCsv: "CSV", creditText: "Dibuat oleh <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "Situs ini dibuat untuk tujuan pembelajaran dan hiburan, dan tidak menjamin ketelitian linguistik. Jika Anda menemukan kesalahan atau memiliki saran, silakan kirim koreksi melalui <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> atau hubungi <a href=\"mailto:cho@heuron.com\">penulis</a>.", edit: "Edit", save: "Simpan", cancel: "Batal", corrector: "Korektor:", correctionSaved: "Koreksi disimpan", copyText: "Salin teks", copiedText: "Teks disalin", ogTitle: "LangMap - Peta Urutan Kata Multibahasa", ogDesc: "Bandingkan urutan kata di lebih dari 220 bahasa, dialek, dan bahasa kuno secara interaktif"},
    hi: { title: 'LangMap', subtitle: 'बहुभाषी शब्द क्रम मानचित्र', selectSentence: 'वाक्य चुनें', langToggle: 'प्रदर्शन भाषा', langOrder: 'भाषा क्रम', dragHint: 'क्रम बदलने के लिए खींचें', defaultOrder: 'डिफ़ॉल्ट क्रम', random: 'रैंडम', prev: '◀', next: '▶', allOn: 'सभी ON', allOff: 'सभी OFF', savePng: 'PNG सहेजें', saveSvg: 'SVG सहेजें', copyUrl: 'URL कॉपी', copied: 'URL कॉपी हो गया', uiLang: 'UI भाषा:', noLangSelected: 'कृपया कम से कम एक भाषा चुनें', selectLangs: 'भाषा चुनें ({n})', selectLangsTitle: 'भाषा चुनें', modalConfirm: 'चुनें', modalCancel: 'रद्द', rtlNote: '※ अरबी लिपि और हिब्रू लिपि तुलना के लिए बाएं→दाएं दिखाई गई हैं (वास्तव में दाएं→बाएं पढ़ी जाती हैं)', rtlToggle: 'मूल दिशा में दिखाएं (←)' , en_au:"अंग्रेज़ी (ऑस्ट्रेलियाई)", en_in:"अंग्रेज़ी (भारतीय)", es_ar:"स्पेनिश (अर्जेंटीनी)", ar_iq:"अरबी (इराकी)", hak_cn:"हक्का चीनी", pending: "तैयारी में", saveViewCsv: "CSV सहेजें", saveCsv: "CSV", creditText: "निर्माता: <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "यह साइट सीखने और मनोरंजन के उद्देश्य से बनाई गई है और भाषाविज्ञानीय सख्ती की गारंटी नहीं देती। त्रुटियाँ या सुझाव मिलने पर कृपया <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> पर सुधार भेजें या <a href=\"mailto:cho@heuron.com\">लेखक</a> से संपर्क करें।", edit: "संपादित करें", save: "सहेजें", cancel: "रद्द", corrector: "संशोधक:", correctionSaved: "सुधार सहेजा गया", copyText: "पाठ कॉपी करें", copiedText: "पाठ कॉपी हो गया", ogTitle: "LangMap - बहुभाषी शब्द क्रम मानचित्र", ogDesc: "220 से अधिक भाषाओं, बोलियों और प्राचीन भाषाओं के शब्द क्रम की तुलना करें"},
    en: { title: 'LangMap', subtitle: 'Multilingual Word Order Map', selectSentence: 'Select sentence', langToggle: 'Languages', langOrder: 'Language order', dragHint: 'drag to reorder', defaultOrder: 'Default order', random: 'Random', prev: '◀', next: '▶', allOn: 'All ON', allOff: 'All OFF', savePng: 'Save PNG', saveSvg: 'Save SVG', copyUrl: 'Copy URL', copied: 'URL copied', uiLang: 'UI Language:', noLangSelected: 'Please select at least one language', selectLangs: 'Select languages ({n})', saveViewCsv: 'Save CSV', saveCsv: 'CSV', ogTitle: 'LangMap - Multilingual Word Order Map', ogDesc: 'An interactive map comparing word order across 220+ languages, dialects, and historical stages.', selectLangsTitle: 'Select languages', modalConfirm: 'Apply', modalCancel: 'Cancel', edit: 'Edit', save: 'Save', cancel: 'Cancel', corrector: 'Corrector:', correctionSaved: 'Correction saved', copyText: 'Copy text', copiedText: 'Text copied', rtlNote: '* Arabic script and Hebrew script are shown left-to-right for comparison (they are normally read right-to-left)', rtlToggle: 'Show native direction', pending: 'Pending', creditText: 'Made by <a href="https://heuron.com" target="_blank" rel="noopener">Heuron Inc.</a> — Jounlai Cho', disclaimer: 'This site is made for learning and entertainment purposes and does not guarantee linguistic rigor. If you notice errors or have suggestions, please submit a correction via <a href="https://github.com/jounlai/langmap" target="_blank" rel="noopener">GitHub</a> or contact the <a href="mailto:cho@heuron.com">author</a>.' , en_au:"English (Australian)", en_in:"English (Indian)", es_ar:"Spanish (Argentine)", ar_iq:"Arabic (Iraqi)", hak_cn:"Hakka Chinese"},
    de: { title: 'LangMap', subtitle: 'Mehrsprachige Wortstellungskarte', selectSentence: 'Satz wählen', langToggle: 'Sprachen', langOrder: 'Sprachreihenfolge', dragHint: 'ziehen zum Sortieren', defaultOrder: 'Standardreihenfolge', random: 'Zufällig', prev: '◀', next: '▶', allOn: 'Alle AN', allOff: 'Alle AUS', savePng: 'PNG speichern', saveSvg: 'SVG speichern', copyUrl: 'URL kopieren', copied: 'URL kopiert', uiLang: 'UI-Sprache:', noLangSelected: 'Bitte wählen Sie mindestens eine Sprache', selectLangs: 'Sprachen wählen ({n})', selectLangsTitle: 'Sprachen wählen', modalConfirm: 'Anwenden', modalCancel: 'Abbrechen', rtlNote: '※ Arabische Schrift und hebräische Schrift werden zum Vergleich links→rechts angezeigt (normalerweise rechts→links gelesen)', rtlToggle: 'Originalrichtung anzeigen (←)' , en_au:"Englisch (australisch)", en_in:"Englisch (indisch)", es_ar:"Spanisch (argentinisch)", ar_iq:"Arabisch (irakisch)", hak_cn:"Hakka-Chinesisch", pending: "In Vorbereitung", saveViewCsv: "CSV speichern", saveCsv: "CSV", creditText: "Erstellt von <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "Diese Seite wurde zu Lern- und Unterhaltungszwecken erstellt und erhebt keinen Anspruch auf linguistische Genauigkeit. Wenn Sie Fehler oder Verbesserungsvorschläge entdecken, reichen Sie bitte eine Korrektur über <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> ein oder kontaktieren Sie den <a href=\"mailto:cho@heuron.com\">Autor</a>.", edit: "Bearbeiten", save: "Speichern", cancel: "Abbrechen", corrector: "Korrektor:", correctionSaved: "Korrektur gespeichert", copyText: "Text kopieren", copiedText: "Text kopiert", ogTitle: "LangMap - Mehrsprachige Wortstellungskarte", ogDesc: "Vergleichen Sie die Wortstellung in über 220 Sprachen, Dialekten und historischen Sprachstufen"},
    fr: { title: 'LangMap', subtitle: "Carte de l'ordre des mots multilingue", selectSentence: 'Sélectionner une phrase ', langToggle: 'Langues ', langOrder: 'Ordre des langues', dragHint: 'glisser pour réorganiser', defaultOrder: 'Ordre par défaut', random: 'Aléatoire', prev: '◀', next: '▶', allOn: 'Tout ON', allOff: 'Tout OFF', savePng: 'Enregistrer PNG', saveSvg: 'Enregistrer SVG', copyUrl: "Copier l'URL", copied: 'URL copié', uiLang: 'Langue UI :', noLangSelected: 'Veuillez sélectionner au moins une langue', selectLangs: 'Choisir les langues ({n})', selectLangsTitle: 'Choisir les langues', modalConfirm: 'Appliquer', modalCancel: 'Annuler', rtlNote: "※ L'écriture arabe et l'écriture hébraïque sont affichées gauche→droite pour comparaison (normalement lues droite→gauche)", rtlToggle: 'Afficher la direction originale (←)' , en_au:"Anglais (australien)", en_in:"Anglais (indien)", es_ar:"Espagnol (argentin)", ar_iq:"Arabe (irakien)", hak_cn:"Hakka", pending: "À venir", saveViewCsv: "Enregistrer CSV", saveCsv: "CSV", creditText: "Créé par <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "Ce site a été créé à des fins d'apprentissage et de divertissement et ne garantit pas la rigueur linguistique. Si vous remarquez des erreurs ou avez des suggestions, veuillez soumettre une correction via <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> ou contacter l'<a href=\"mailto:cho@heuron.com\">auteur</a>.", edit: "Modifier", save: "Enregistrer", cancel: "Annuler", corrector: "Correcteur :", correctionSaved: "Correction enregistrée", copyText: "Copier le texte", copiedText: "Texte copié", ogTitle: "LangMap - Carte de l'ordre des mots multilingue", ogDesc: "Comparez l'ordre des mots dans plus de 220 langues, dialectes et langues anciennes"},
    it: { title: 'LangMap', subtitle: "Mappa dell'ordine delle parole multilingue", selectSentence: 'Seleziona frase', langToggle: 'Lingue', langOrder: 'Ordine delle lingue', dragHint: 'trascina per riordinare', defaultOrder: 'Ordine predefinito', random: 'Casuale', prev: '◀', next: '▶', allOn: 'Tutti ON', allOff: 'Tutti OFF', savePng: 'Salva PNG', saveSvg: 'Salva SVG', copyUrl: 'Copia URL', copied: 'URL copiato', uiLang: 'Lingua UI:', noLangSelected: 'Seleziona almeno una lingua', selectLangs: 'Seleziona lingue ({n})', selectLangsTitle: 'Seleziona lingue', modalConfirm: 'Applica', modalCancel: 'Annulla', rtlNote: '※ La scrittura araba e la scrittura ebraica sono mostrate sinistra→destra per confronto (normalmente lette destra→sinistra)', rtlToggle: 'Mostra direzione originale (←)' , en_au:"Inglese (australiano)", en_in:"Inglese (indiano)", es_ar:"Spagnolo (argentino)", ar_iq:"Arabo (iracheno)", hak_cn:"Hakka cinese", pending: "In preparazione", saveViewCsv: "Salva CSV", saveCsv: "CSV", creditText: "Creato da <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "Questo sito è stato creato a scopo di apprendimento e intrattenimento e non garantisce il rigore linguistico. Se notate errori o suggerimenti, inviate una correzione tramite <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> o contattate l'<a href=\"mailto:cho@heuron.com\">autore</a>.", edit: "Modifica", save: "Salva", cancel: "Annulla", corrector: "Correttore:", correctionSaved: "Correzione salvata", copyText: "Copia testo", copiedText: "Testo copiato", ogTitle: "LangMap - Mappa dell'ordine delle parole multilingue", ogDesc: "Confronta l'ordine delle parole in oltre 220 lingue, dialetti e lingue antiche"},
    es: { title: 'LangMap', subtitle: 'Mapa de orden de palabras multilingüe', selectSentence: 'Seleccionar oración', langToggle: 'Idiomas', langOrder: 'Orden de idiomas', dragHint: 'arrastrar para reordenar', defaultOrder: 'Orden predeterminado', random: 'Aleatorio', prev: '◀', next: '▶', allOn: 'Todo ON', allOff: 'Todo OFF', savePng: 'Guardar PNG', saveSvg: 'Guardar SVG', copyUrl: 'Copiar URL', copied: 'URL copiado', uiLang: 'Idioma UI:', noLangSelected: 'Seleccione al menos un idioma', selectLangs: 'Seleccionar idiomas ({n})', selectLangsTitle: 'Seleccionar idiomas', modalConfirm: 'Aplicar', modalCancel: 'Cancelar', rtlNote: '※ La escritura árabe y la escritura hebrea se muestran de izquierda→derecha para comparación (normalmente se leen de derecha→izquierda)', rtlToggle: 'Mostrar dirección original (←)' , en_au:"Inglés (australiano)", en_in:"Inglés (indio)", es_ar:"Español (argentino)", ar_iq:"Árabe (iraquí)", hak_cn:"Chino hakka", pending: "Próximamente", saveViewCsv: "Guardar CSV", saveCsv: "CSV", creditText: "Creado por <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "Este sitio se creó con fines de aprendizaje y entretenimiento y no garantiza el rigor lingüístico. Si detectas errores o tienes sugerencias, envía una corrección a través de <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> o contacta al <a href=\"mailto:cho@heuron.com\">autor</a>.", edit: "Editar", save: "Guardar", cancel: "Cancelar", corrector: "Corrector:", correctionSaved: "Corrección guardada", copyText: "Copiar texto", copiedText: "Texto copiado", ogTitle: "LangMap - Mapa de orden de palabras multilingüe", ogDesc: "Compara el orden de las palabras en más de 220 idiomas, dialectos y lenguas antiguas"},
    pt: { title: 'LangMap', subtitle: 'Mapa de ordem de palavras multilíngue', selectSentence: 'Selecionar frase', langToggle: 'Idiomas', langOrder: 'Ordem dos idiomas', dragHint: 'arraste para reordenar', defaultOrder: 'Ordem padrão', random: 'Aleatório', prev: '◀', next: '▶', allOn: 'Todos ON', allOff: 'Todos OFF', savePng: 'Salvar PNG', saveSvg: 'Salvar SVG', copyUrl: 'Copiar URL', copied: 'URL copiado', uiLang: 'Idioma UI:', noLangSelected: 'Selecione pelo menos um idioma', selectLangs: 'Selecionar idiomas ({n})', selectLangsTitle: 'Selecionar idiomas', modalConfirm: 'Aplicar', modalCancel: 'Cancelar', rtlNote: '※ A escrita árabe e a escrita hebraica são exibidas da esquerda→direita para comparação (normalmente lidas da direita→esquerda)', rtlToggle: 'Mostrar direção original (←)' , en_au:"Inglês (australiano)", en_in:"Inglês (indiano)", es_ar:"Espanhol (argentino)", ar_iq:"Árabe (iraquiano)", hak_cn:"Chinês hakka", pending: "Em preparação", saveViewCsv: "Salvar CSV", saveCsv: "CSV", creditText: "Criado por <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "Este site foi criado para fins de aprendizado e entretenimento e não garante rigor linguístico. Se notar erros ou tiver sugestões, envie uma correção pelo <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> ou entre em contato com o <a href=\"mailto:cho@heuron.com\">autor</a>.", edit: "Editar", save: "Salvar", cancel: "Cancelar", corrector: "Corretor:", correctionSaved: "Correção salva", copyText: "Copiar texto", copiedText: "Texto copiado", ogTitle: "LangMap - Mapa de ordem de palavras multilíngue", ogDesc: "Compare a ordem das palavras em mais de 220 idiomas, dialetos e línguas antigas"},
    ru: { title: 'LangMap', subtitle: 'Многоязычная карта порядка слов', selectSentence: 'Выбрать предложение', langToggle: 'Языки', langOrder: 'Порядок языков', dragHint: 'перетащите для сортировки', defaultOrder: 'По умолчанию', random: 'Случайное', prev: '◀', next: '▶', allOn: 'Все ВКЛ', allOff: 'Все ВЫКЛ', savePng: 'Сохранить PNG', saveSvg: 'Сохранить SVG', copyUrl: 'Копировать URL', copied: 'URL скопирован', uiLang: 'Язык UI:', noLangSelected: 'Выберите хотя бы один язык', selectLangs: 'Выбор языков ({n})', selectLangsTitle: 'Выбор языков', modalConfirm: 'Применить', modalCancel: 'Отмена', rtlNote: '※ Арабское и еврейское письмо отображаются слева→направо для сравнения (обычно читаются справа→налево)', rtlToggle: 'Показать исходное направление (←)' , en_au:"Английский (австралийский)", en_in:"Английский (индийский)", es_ar:"Испанский (аргентинский)", ar_iq:"Арабский (иракский)", hak_cn:"Хакка", pending: "В подготовке", saveViewCsv: "Сохранить CSV", saveCsv: "CSV", creditText: "Создано <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "Этот сайт создан для обучения и развлечения и не гарантирует лингвистической строгости. Если вы заметили ошибки или у вас есть предложения, отправьте исправление через <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> или свяжитесь с <a href=\"mailto:cho@heuron.com\">автором</a>.", edit: "Редактировать", save: "Сохранить", cancel: "Отмена", corrector: "Корректор:", correctionSaved: "Исправление сохранено", copyText: "Копировать текст", copiedText: "Текст скопирован", ogTitle: "LangMap - Многоязычная карта порядка слов", ogDesc: "Сравнивайте порядок слов в более чем 220 языках, диалектах и древних языках"},
    uk: { title: 'LangMap', subtitle: 'Багатомовна карта порядку слів', selectSentence: 'Обрати речення', langToggle: 'Мови', langOrder: 'Порядок мов', dragHint: 'перетягніть для сортування', defaultOrder: 'За замовчуванням', random: 'Випадкове', prev: '◀', next: '▶', allOn: 'Усі УВІМК', allOff: 'Усі ВИМК', savePng: 'Зберегти PNG', saveSvg: 'Зберегти SVG', copyUrl: 'Копіювати URL', copied: 'URL скопійовано', uiLang: 'Мова UI:', noLangSelected: 'Будь ласка, оберіть хоча б одну мову', selectLangs: 'Вибір мов ({n})', selectLangsTitle: 'Вибір мов', modalConfirm: 'Застосувати', modalCancel: 'Скасувати', rtlNote: '※ Арабське та єврейське письмо відображаються зліва→направо для порівняння (зазвичай читаються справа→наліво)', rtlToggle: 'Показати оригінальний напрямок (←)' , en_au:"Англійська (австралійська)", en_in:"Англійська (індійська)", es_ar:"Іспанська (аргентинська)", ar_iq:"Арабська (іракська)", hak_cn:"Хакка", pending: "У підготовці", saveViewCsv: "Зберегти CSV", saveCsv: "CSV", creditText: "Створено <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "Цей сайт створено для навчальних і розважальних цілей і не гарантує лінгвістичної точності. Якщо ви помітили помилки або маєте пропозиції, надішліть виправлення через <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> або зв\\'яжіться з <a href=\"mailto:cho@heuron.com\">автором</a>.", edit: "Редагувати", save: "Зберегти", cancel: "Скасувати", corrector: "Коректор:", correctionSaved: "Виправлення збережено", copyText: "Копіювати текст", copiedText: "Текст скопійовано", ogTitle: "LangMap - Багатомовна карта порядку слів", ogDesc: "Порівнюйте порядок слів у понад 220 мовах, діалектах та давніх мовах"},
    ar: { title: 'LangMap', subtitle: 'خريطة ترتيب الكلمات متعددة اللغات', selectSentence: 'اختر جملة', langToggle: 'اللغات', langOrder: 'ترتيب اللغات', dragHint: 'اسحب لإعادة الترتيب', defaultOrder: 'الترتيب الافتراضي', random: 'عشوائي', prev: '◀', next: '▶', allOn: 'تشغيل الكل', allOff: 'إيقاف الكل', savePng: 'حفظ PNG', saveSvg: 'حفظ SVG', copyUrl: 'نسخ الرابط', copied: 'تم نسخ الرابط', uiLang: 'لغة الواجهة:', noLangSelected: 'يرجى اختيار لغة واحدة على الأقل', selectLangs: 'اختيار اللغات ({n})', selectLangsTitle: 'اختيار اللغات', modalConfirm: 'تطبيق', modalCancel: 'إلغاء', rtlNote: '※ الكتابة العربية والعبرية معروضة من اليسار إلى اليمين للمقارنة (تُقرأ عادةً من اليمين إلى اليسار)', rtlToggle: 'عرض بالاتجاه الأصلي (←)' , en_au:"الإنجليزية (أسترالية)", en_in:"الإنجليزية (هندية)", es_ar:"الإسبانية (أرجنتينية)", ar_iq:"العربية (عراقية)", hak_cn:"الهاكا الصينية", pending: "قيد الإعداد", saveViewCsv: "حفظ CSV", saveCsv: "CSV", creditText: "من إعداد <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "هذا الموقع مُعَدّ لأغراض التعلم والترفيه ولا يضمن الدقة اللغوية. إذا لاحظت أخطاء أو لديك اقتراحات، يُرجى إرسال تصحيح عبر <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> أو التواصل مع <a href=\"mailto:cho@heuron.com\">المؤلف</a>.", edit: "تعديل", save: "حفظ", cancel: "إلغاء", corrector: "المصحح:", correctionSaved: "تم حفظ التصحيح", copyText: "نسخ النص", copiedText: "تم نسخ النص", ogTitle: "LangMap - خريطة ترتيب الكلمات متعددة اللغات", ogDesc: "قارن ترتيب الكلمات في أكثر من 220 لغة ولهجة ولغة قديمة"},
    he: { title: 'LangMap', subtitle: 'מפת סדר מילים רב-לשונית', selectSentence: 'בחר משפט', langToggle: 'שפות', langOrder: 'סדר שפות', dragHint: 'גרור לשינוי סדר', defaultOrder: 'סדר ברירת מחדל', random: 'אקראי', prev: '◀', next: '▶', allOn: 'הכל ON', allOff: 'הכל OFF', savePng: 'שמור PNG', saveSvg: 'שמור SVG', copyUrl: 'העתק URL', copied: 'URL הועתק', uiLang: 'שפת ממשק:', noLangSelected: 'אנא בחר לפחות שפה אחת', selectLangs: 'בחירת שפות ({n})', selectLangsTitle: 'בחירת שפות', modalConfirm: 'החל', modalCancel: 'ביטול', rtlNote: '※ הכתב הערבי והכתב העברי מוצגים משמאל לימין להשוואה (בפועל נקראים מימין לשמאל)', rtlToggle: 'הצג בכיוון המקורי (←)' , en_au:"אנגלית (אוסטרלית)", en_in:"אנגלית (הודית)", es_ar:"ספרדית (ארגנטינאית)", ar_iq:"ערבית (עיראקית)", hak_cn:"האקה סינית", pending: "בהכנה", saveViewCsv: "שמור CSV", saveCsv: "CSV", creditText: "נוצר על ידי <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "אתר זה נוצר למטרות למידה ובידור ואינו מתחייב לדיוק לשוני. אם נתקלת בטעויות או יש לך הצעות, אנא שלח תיקון דרך <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> או צור קשר עם <a href=\"mailto:cho@heuron.com\">היוצר</a>.", edit: "ערוך", save: "שמור", cancel: "בטל", corrector: "מתקן:", correctionSaved: "התיקון נשמר", copyText: "העתק טקסט", copiedText: "הטקסט הועתק", ogTitle: "LangMap - מפת סדר מילים רב-לשונית", ogDesc: "השוו סדר מילים ביותר מ-220 שפות, ניבים ושפות עתיקות"},
    sw: { title: 'LangMap', subtitle: 'Ramani ya Mpangilio wa Maneno', selectSentence: 'Chagua sentensi', langToggle: 'Lugha', langOrder: 'Mpangilio wa lugha', dragHint: 'buruta ili kupanga upya', defaultOrder: 'Mpangilio chaguo-msingi', random: 'Nasibu', prev: '◀', next: '▶', allOn: 'Zote ON', allOff: 'Zote OFF', savePng: 'Hifadhi PNG', saveSvg: 'Hifadhi SVG', copyUrl: 'Nakili URL', copied: 'URL imenakiliwa', uiLang: 'Lugha ya UI:', noLangSelected: 'Tafadhali chagua lugha angalau moja', selectLangs: 'Chagua lugha ({n})', selectLangsTitle: 'Chagua lugha', modalConfirm: 'Chagua', modalCancel: 'Ghairi', rtlNote: '※ Maandishi ya Kiarabu na Kiebrania yanaonyeshwa kushoto→kulia kwa kulinganisha (kawaida yanasomwa kulia→kushoto)', rtlToggle: 'Onyesha mwelekeo asili (←)' , en_au:"Kiingereza (Australia)", en_in:"Kiingereza (India)", es_ar:"Kihispania (Argentina)", ar_iq:"Kiarabu (Iraq)", hak_cn:"Kihakka", pending: "Inaandaliwa", saveViewCsv: "Hifadhi CSV", saveCsv: "CSV", creditText: "Imeundwa na <a href=\"https://heuron.com\" target=\"_blank\" rel=\"noopener\">Heuron Inc.</a> — Jounlai Cho", disclaimer: "Tovuti hii imeundwa kwa madhumuni ya kujifunza na burudani na haithibitishi usahihi wa kiisimu. Ukigundua makosa au una mapendekezo, tafadhali tuma marekebisho kupitia <a href=\"https://github.com/jounlai/langmap\" target=\"_blank\" rel=\"noopener\">GitHub</a> au wasiliana na <a href=\"mailto:cho@heuron.com\">mwandishi</a>.", edit: "Hariri", save: "Hifadhi", cancel: "Ghairi", corrector: "Msahihishaji:", correctionSaved: "Marekebisho yamehifadhiwa", copyText: "Nakili maandishi", copiedText: "Maandishi yamenakiliwa", ogTitle: "LangMap - Ramani ya Mpangilio wa Maneno", ogDesc: "Linganisha mpangilio wa maneno katika zaidi ya lugha 220, lahaja na lugha za kale"},
};

let currentUILang = 'en';

// Migration shim for legacy es_eu/es_mx/pt_eu/pt_br UI codes (collapsed to es/pt).
// Applied at every read site (cookie, URL hash, ?ui= param, compact decode) so
// users with old saved settings or shared URLs continue to work.
function _normalizeUiLang(code) {
    if (code === 'es_eu' || code === 'es_mx') return 'es';
    if (code === 'pt_eu' || code === 'pt_br') return 'pt';
    return code;
}

function t(key) {
    return (UI_STRINGS[currentUILang] || UI_STRINGS.en)[key] || UI_STRINGS.en[key] || UI_STRINGS.ja[key] || key;
}

// Language names per UI language
// LANG_NAMES has been moved to lang_names.js (loaded as a separate <script>)
// before app.js — see wordmap-check.md §12. This file now references the
// global window.LANG_NAMES for consistent name lookup.

function langName(code) {
    const names = LANG_NAMES[currentUILang] || LANG_NAMES.en;
    return names[code] || LANG_NAMES.en[code] || LANG_NAMES.ja[code] || code;
}

// Language definitions - ordered by linguistic similarity within groups
const LANGUAGES = [
    // Japonic: Standard → Kansai → Western → Northern → Ryukyuan → Historical → Ainu
    { code: 'ja', name: '日本語(標準)', group: 'JPN' },
    { code: 'ja_kyo', name: '日本語(京都弁)', group: 'JPN', experimental: true },
    { code: 'ja_osa', name: '日本語(大阪弁)', group: 'JPN', experimental: true },
    { code: 'ja_hir', name: '日本語(広島弁)', group: 'JPN', experimental: true },
    { code: 'ja_hak', name: '日本語(博多弁)', group: 'JPN', experimental: true },
    { code: 'ja_aom', name: '日本語(青森弁)', group: 'JPN', experimental: true },
    { code: 'ja_oki', name: '沖縄語', group: 'JPN', experimental: true },
    { code: 'ja_mvi', name: '宮古語', group: 'JPN', experimental: true },
    { code: 'ja_rys', name: '八重山語', group: 'JPN', experimental: true },
    // Japonic Historical (chronological: oldest first)
    { code: 'ja_edo', name: '日本語(江戸時代)', group: 'JPN', experimental: true, historical: true },
    { code: 'ja_kanbun', name: '漢文訓読', group: 'JPN', experimental: true, historical: true },
    { code: 'ja_heian', name: '日本語(平安時代)', group: 'JPN', experimental: true, historical: true },
    // Ainu (isolate)
    { code: 'ain', name: 'アイヌ語', group: 'JPN' },
    // Koreanic: Standard → Dialects → Historical (oldest first)
    { code: 'ko', name: '韓国語(標準)', group: 'KOR' },
    { code: 'ko_kp', name: '朝鮮語(文化語)', group: 'KOR', experimental: true },
    { code: 'ko_bus', name: '韓国語(釜山弁)', group: 'KOR', experimental: true },
    { code: 'ko_jeju', name: '済州語', group: 'KOR', experimental: true },
    { code: 'ko_yb', name: '延辺朝鮮語', group: 'KOR', experimental: true },
    { code: 'ko_em', name: '韓国語(近世)', group: 'KOR', experimental: true, historical: true },
    { code: 'ko_mid', name: '韓国語(中世)', group: 'KOR', experimental: true, historical: true },
    // Sinitic: Mandarin → Southern → Classical
    { code: 'zh', name: '中国語(普通話)', group: 'CHN' },
    { code: 'zh_db', name: '中国語(東北話)', group: 'CHN', experimental: true },
    { code: 'zh_sc', name: '中国語(四川話)', group: 'CHN', experimental: true },
    { code: 'yue', name: '広東語', group: 'CHN' },
    { code: 'nan', name: '台湾語', group: 'CHN' },
    { code: 'wuu', name: '上海語', group: 'CHN' },
    { code: 'hak_cn', name: '客家語', group: 'CHN', experimental: true },
    { code: 'cdo', name: '閩東語', group: 'CHN', experimental: true },
    { code: 'zh_song', name: '中国語(宋明文言)', group: 'CHN', experimental: true, historical: true },
    { code: 'zh_wenyan_edu', name: '文言文(粵音)', group: 'CHN', experimental: true, historical: true },
    { code: 'zh_tang', name: '中国語(唐代漢文)', group: 'CHN', experimental: true, historical: true },
    { code: 'zh_han', name: '中国語(漢代漢文)', group: 'CHN', experimental: true, historical: true },
    // Tibeto-Burman
    { code: 'bo', name: 'チベット語', group: 'TIB' },
    { code: 'xct_litpr', name: 'チベット語(仏典朗誦)', group: 'TIB', experimental: true, historical: true },
    { code: 'my', name: 'ミャンマー語', group: 'TIB' },
    { code: 'ii', name: 'イ語', group: 'TIB', experimental: true },
    // Austroasiatic
    { code: 'vi', name: 'ベトナム語', group: 'SEA' },
    { code: 'vi_c', name: 'ベトナム語(中部)', group: 'SEA', experimental: true },
    { code: 'vi_s', name: 'ベトナム語(南部)', group: 'SEA', experimental: true },
    { code: 'vi_nom', name: 'ベトナム語(字喃)', group: 'SEA', experimental: true, historical: true },
    { code: 'vi_han', name: 'ベトナム漢文(漢越音)', group: 'SEA', experimental: true, historical: true },
    { code: 'km', name: 'クメール語', group: 'SEA' },
    // Tai-Kadai
    { code: 'th', name: 'タイ語', group: 'SEA' },
    { code: 'th_isan', name: 'タイ語(イサーン方言)', group: 'SEA', experimental: true },
    { code: 'th_n', name: 'タイ語(北部)', group: 'SEA', experimental: true },
    { code: 'th_s', name: 'タイ語(南部)', group: 'SEA', experimental: true },
    { code: 'lo', name: 'ラオ語', group: 'SEA' },
    { code: 'za', name: 'チワン語', group: 'SEA', experimental: true },
    { code: 'hmn', name: 'ミャオ語', group: 'SEA', experimental: true },
    // Austronesian: Western → Philippine → Oceanic
    { code: 'id', name: 'インドネシア語', group: 'SEA' },
    { code: 'ms', name: 'マレー語', group: 'SEA' },
    { code: 'jv', name: 'ジャワ語', group: 'SEA' },
    { code: 'su', name: 'スンダ語', group: 'SEA', experimental: true },
    { code: 'tl', name: 'タガログ語', group: 'SEA' },
    { code: 'ceb', name: 'セブアノ語', group: 'SEA', experimental: true },
    { code: 'ilo', name: 'イロカノ語', group: 'SEA', experimental: true },
    { code: 'mg', name: 'マダガスカル語', group: 'AUS' },
    { code: 'mi', name: 'マオリ語', group: 'AUS' },
    { code: 'haw', name: 'ハワイ語', group: 'AUS', experimental: true },
    { code: 'fj', name: 'フィジー語', group: 'AUS', experimental: true },
    { code: 'sm', name: 'サモア語', group: 'AUS', experimental: true },
    { code: 'to', name: 'トンガ語', group: 'AUS', experimental: true },
    { code: 'pau', name: 'パラオ語', group: 'AUS', experimental: true },
    // Indo-Aryan: Sanskrit → Hindustani → Eastern → Western → Insular
    { code: 'sa', name: 'サンスクリット語', group: 'SAS', experimental: true, historical: true },
    { code: 'sa_edu', name: '現代会話サンスクリット', group: 'SAS', experimental: true, historical: true },
    { code: 'pi', name: 'パーリ語', group: 'SAS', experimental: true, historical: true },
    { code: 'pi_edu', name: 'パーリ語(教学・上座部僧院)', group: 'SAS', experimental: true, historical: true },
    { code: 'hi', name: 'ヒンディー語', group: 'SAS' },
    { code: 'ur', name: 'ウルドゥー語', group: 'SAS' },
    { code: 'sd', name: 'シンド語', group: 'SAS', experimental: true },
    { code: 'pa', name: 'パンジャーブ語', group: 'SAS' },
    { code: 'bn', name: 'ベンガル語', group: 'SAS' },
    { code: 'as', name: 'アッサム語', group: 'SAS', experimental: true },
    { code: 'or', name: 'オディア語', group: 'SAS', experimental: true },
    { code: 'ne', name: 'ネパール語', group: 'SAS', experimental: true },
    { code: 'bho', name: 'ボージュプリー語', group: 'SAS', experimental: true },
    { code: 'mr', name: 'マラーティー語', group: 'SAS', experimental: true },
    { code: 'gu', name: 'グジャラート語', group: 'SAS', experimental: true },
    { code: 'si', name: 'シンハラ語', group: 'SAS' },
    { code: 'rom', name: 'ロマニ語', group: 'SAS', experimental: true },
    // Dravidian
    { code: 'ta', name: 'タミル語', group: 'SAS' },
    { code: 'te', name: 'テルグ語', group: 'SAS' },
    { code: 'kn', name: 'カンナダ語', group: 'SAS', experimental: true },
    { code: 'ml', name: 'マラヤーラム語', group: 'SAS' },
    // Iranian
    { code: 'fa', name: 'ペルシャ語', group: 'SAS' },
    { code: 'fa_clas', name: 'ペルシャ語(古典)', group: 'SAS', experimental: true, historical: true },
    { code: 'tg', name: 'タジク語', group: 'SAS', experimental: true },
    { code: 'ku', name: 'クルド語', group: 'SAS' },
    { code: 'ckb', name: 'クルド語(ソラニー)', group: 'SAS', experimental: true },
    { code: 'ps', name: 'パシュトー語', group: 'SAS', experimental: true },
    // Turkic
    { code: 'tr', name: 'トルコ語', group: 'TRK' },
    { code: 'az', name: 'アゼルバイジャン語', group: 'TRK', experimental: true },
    { code: 'ug', name: 'ウイグル語', group: 'TRK' },
    { code: 'kk', name: 'カザフ語', group: 'TRK' },
    { code: 'ky', name: 'キルギス語', group: 'TRK', experimental: true },
    { code: 'uz', name: 'ウズベク語', group: 'TRK', experimental: true },
    { code: 'tk', name: 'トルクメン語', group: 'TRK', experimental: true },
    // Mongolic
    { code: 'mn', name: 'モンゴル語', group: 'MON' },
    { code: 'mn_cn', name: '内モンゴルモンゴル語', group: 'MON', experimental: true },
    // Tungusic
    { code: 'mnc', name: '満州語', group: 'TNG', experimental: true, historical: true },
    // Kartvelian
    { code: 'ka', name: 'グルジア語', group: 'KAR' },
    // Semitic: Arabic → Hebrew → Aramaic → Akkadian → Ethiopic → Maltese
    { code: 'ar', name: 'アラビア語(フスハー)', group: 'SEM' },
    { code: 'ar_qur', name: 'クルアーン・アラビア語', group: 'SEM', experimental: true, historical: true },
    { code: 'ar_eg', name: 'アラビア語(エジプト方言)', group: 'SEM', experimental: true },
    { code: 'ar_lev', name: 'アラビア語(レバント方言)', group: 'SEM', experimental: true },
    { code: 'ar_gulf', name: 'アラビア語(湾岸方言)', group: 'SEM', experimental: true },
    { code: 'ar_iq', name: 'アラビア語(イラク方言)', group: 'SEM', experimental: true },
    { code: 'ar_ma', name: 'アラビア語(モロッコ方言)', group: 'SEM', experimental: true },
    { code: 'ar_tn', name: 'アラビア語(チュニジア方言)', group: 'SEM', experimental: true },
    { code: 'ar_sd', name: 'アラビア語(スーダン方言)', group: 'SEM', experimental: true },
    { code: 'he', name: 'ヘブライ語', group: 'SEM' },
    { code: 'he_mis', name: 'ヘブライ語(ミシュナー期)', group: 'SEM', experimental: true, historical: true },
    { code: 'arc', name: 'アラム語', group: 'SEM', experimental: true, historical: true },
    { code: 'akk', name: 'アッカド語', group: 'SEM', experimental: true, historical: true },
    { code: 'am', name: 'アムハラ語', group: 'SEM' },
    { code: 'ti', name: 'ティグリニャ語', group: 'SEM', experimental: true },
    { code: 'mt', name: 'マルタ語', group: 'SEM' },
    // Egyptian (Afro-Asiatic, non-Semitic)
    { code: 'egy', name: '古代エジプト語', group: 'ANE', experimental: true, historical: true },
    { code: 'cop', name: 'コプト語', group: 'ANE', experimental: true, historical: true },
    // Sumerian (isolate, Ancient Near East)
    { code: 'sux', name: 'シュメール語', group: 'ANE', experimental: true, historical: true },
    // African: Bantu (East → South) → West African → Cushitic
    { code: 'sw', name: 'スワヒリ語', group: 'AFR' },
    { code: 'rw', name: 'キニヤルワンダ語', group: 'AFR', experimental: true },
    { code: 'ny', name: 'チェワ語', group: 'AFR', experimental: true },
    { code: 'ln', name: 'リンガラ語', group: 'AFR', experimental: true },
    { code: 'sn', name: 'ショナ語', group: 'AFR', experimental: true },
    { code: 'zu', name: 'ズールー語', group: 'AFR' },
    { code: 'xh', name: 'コサ語', group: 'AFR', experimental: true },
    { code: 'yo', name: 'ヨルバ語', group: 'AFR' },
    { code: 'ig', name: 'イグボ語', group: 'AFR' },
    { code: 'ha', name: 'ハウサ語', group: 'AFR' },
    { code: 'wo', name: 'ウォロフ語', group: 'AFR', experimental: true },
    { code: 'so', name: 'ソマリ語', group: 'AFR' },
    { code: 'om', name: 'オロモ語', group: 'AFR', experimental: true },
    // Proto-Indo-European → Anatolian (placed near IE European languages)
    { code: 'ine', name: '印欧祖語', group: 'PIE', experimental: true, historical: true },
    { code: 'hit', name: 'ヒッタイト語', group: 'PIE', experimental: true, historical: true },
    // Germanic: English → dialects → West Germanic → North Germanic → Historical
    { code: 'en', name: '英語', group: 'GER' },
    { code: 'en_aave', name: '英語(AAVE)', group: 'GER', experimental: true },
    { code: 'en_south', name: '英語(アメリカ南部)', group: 'GER', experimental: true },
    { code: 'en_app', name: '英語(アパラチア)', group: 'GER', experimental: true },
    { code: 'en_au', name: '英語(オーストラリア)', group: 'GER', experimental: true },
    { code: 'en_in', name: '英語(インド)', group: 'GER', experimental: true },
    { code: 'en_ie', name: '英語(アイルランド)', group: 'GER', experimental: true },
    { code: 'en_sco', name: '英語(スコットランド)', group: 'GER', experimental: true },
    { code: 'en_yk', name: '英語(ヨークシャー)', group: 'GER', experimental: true },
    { code: 'en_ck', name: '英語(コックニー)', group: 'GER', experimental: true },
    { code: 'en_sg', name: '英語(シンガポール)', group: 'GER', experimental: true },
    { code: 'sco', name: 'スコットランド語', group: 'GER', experimental: true },
    { code: 'nl', name: 'オランダ語', group: 'GER' },
    { code: 'af', name: 'アフリカーンス語', group: 'GER', experimental: true },
    { code: 'fy', name: 'フリジア語', group: 'GER', experimental: true },
    { code: 'de', name: 'ドイツ語', group: 'GER' },
    { code: 'de_lut', name: '初期新高ドイツ語(ルター期)', group: 'GER', experimental: true, historical: true },
    { code: 'de_gsw', name: 'ドイツ語(スイス)', group: 'GER', experimental: true },
    { code: 'de_at', name: 'ドイツ語(オーストリア)', group: 'GER', experimental: true },
    { code: 'de_by', name: 'ドイツ語(バイエルン)', group: 'GER', experimental: true },
    { code: 'nds', name: '低地ドイツ語', group: 'GER', experimental: true },
    { code: 'yi', name: 'イディッシュ語', group: 'GER', experimental: true },
    { code: 'sv', name: 'スウェーデン語', group: 'GER' },
    { code: 'no', name: 'ノルウェー語', group: 'GER' },
    { code: 'nn', name: 'ノルウェー語(ニーノシュク)', group: 'GER', experimental: true },
    { code: 'da', name: 'デンマーク語', group: 'GER' },
    { code: 'is', name: 'アイスランド語', group: 'GER' },
    { code: 'fo', name: 'フェロー語', group: 'GER', experimental: true },
    { code: 'enm', name: '中英語', group: 'GER', experimental: true, historical: true },
    { code: 'en_em', name: '初期近代英語', group: 'GER', experimental: true, historical: true },
    { code: 'en_ang', name: '古英語', group: 'GER', experimental: true, historical: true },
    { code: 'non', name: '古ノルド語', group: 'GER', experimental: true, historical: true },
    { code: 'got', name: 'ゴート語', group: 'GER', experimental: true, historical: true },
    // Celtic
    { code: 'ga', name: 'アイルランド語', group: 'CEL' },
    { code: 'gd', name: 'スコットランド・ゲール語', group: 'CEL', experimental: true },
    { code: 'cy', name: 'ウェールズ語', group: 'CEL' },
    { code: 'br', name: 'ブルトン語', group: 'CEL', experimental: true },
    // Romance: Latin → Italo-Dalmatian → Gallo-Romance → Ibero-Romance → Eastern
    { code: 'la', name: 'ラテン語', group: 'ROM', experimental: true, historical: true },
    { code: 'it', name: 'イタリア語', group: 'ROM' },
    { code: 'it_dan', name: 'イタリア語(ダンテ期)', group: 'ROM', experimental: true, historical: true },
    { code: 'nap', name: 'ナポリ語', group: 'ROM', experimental: true },
    { code: 'scn', name: 'シチリア語', group: 'ROM', experimental: true },
    { code: 'vec', name: 'ヴェネト語', group: 'ROM', experimental: true },
    { code: 'fr', name: 'フランス語', group: 'ROM' },
    { code: 'fr_class', name: '古典フランス語(17世紀)', group: 'ROM', experimental: true, historical: true },
    { code: 'fr_qc', name: 'フランス語(ケベック)', group: 'ROM', experimental: true },
    { code: 'fr_af', name: 'フランス語(アフリカ)', group: 'ROM', experimental: true },
    { code: 'fr_be', name: 'フランス語(ベルギー)', group: 'ROM', experimental: true },
    { code: 'fr_ch', name: 'フランス語(スイス)', group: 'ROM', experimental: true },
    { code: 'oc', name: 'オック語', group: 'ROM', experimental: true },
    { code: 'ca', name: 'カタルーニャ語', group: 'ROM' },
    { code: 'es_eu', name: 'スペイン語(欧州)', group: 'ROM' },
    { code: 'es_sgl', name: '黄金世紀スペイン語', group: 'ROM', experimental: true, historical: true },
    { code: 'es_mx', name: 'スペイン語(メキシコ)', group: 'ROM' },
    { code: 'es_co', name: 'スペイン語(コロンビア)', group: 'ROM', experimental: true },
    { code: 'es_cl', name: 'スペイン語(チリ)', group: 'ROM', experimental: true },
    { code: 'es_ar', name: 'スペイン語(アルゼンチン)', group: 'ROM', experimental: true },
    { code: 'es_cu', name: 'スペイン語(キューバ)', group: 'ROM', experimental: true },
    { code: 'es_pe', name: 'スペイン語(ペルー)', group: 'ROM', experimental: true },
    { code: 'es_an', name: 'スペイン語(アンダルシア)', group: 'ROM', experimental: true },
    { code: 'lad', name: 'ラディーノ語', group: 'ROM', experimental: true, historical: true },
    { code: 'gl', name: 'ガリシア語', group: 'ROM', experimental: true },
    { code: 'pt_eu', name: 'ポルトガル語(欧州)', group: 'ROM' },
    { code: 'pt_br', name: 'ポルトガル語(ブラジル)', group: 'ROM' },
    { code: 'ro', name: 'ルーマニア語', group: 'ROM' },
    { code: 'rm', name: 'ロマンシュ語', group: 'ROM', experimental: true },
    { code: 'sc', name: 'サルデーニャ語', group: 'ROM', experimental: true },
    // Slavic: East → West → South
    { code: 'ru', name: 'ロシア語', group: 'SLV' },
    { code: 'uk', name: 'ウクライナ語', group: 'SLV' },
    { code: 'be', name: 'ベラルーシ語', group: 'SLV', experimental: true },
    { code: 'pl', name: 'ポーランド語', group: 'SLV' },
    { code: 'cs', name: 'チェコ語', group: 'SLV' },
    { code: 'sk', name: 'スロバキア語', group: 'SLV', experimental: true },
    { code: 'sl', name: 'スロベニア語', group: 'SLV', experimental: true },
    { code: 'sr', name: 'セルビア語', group: 'SLV', experimental: true },
    { code: 'bg', name: 'ブルガリア語', group: 'SLV', experimental: true },
    { code: 'cu', name: '古教会スラヴ語', group: 'SLV', experimental: true, historical: true },
    // Baltic
    { code: 'lt', name: 'リトアニア語', group: 'OEU' },
    { code: 'lv', name: 'ラトビア語', group: 'OEU', experimental: true },
    // Hellenic
    { code: 'el', name: 'ギリシャ語', group: 'OEU' },
    { code: 'el_kath', name: 'ギリシャ語(カサレヴサ)', group: 'OEU', experimental: true, historical: true },
    { code: 'el_grc', name: 'ギリシャ語(古代)', group: 'OEU', experimental: true, historical: true },
    // Albanian
    { code: 'sq', name: 'アルバニア語', group: 'OEU' },
    // Armenian
    { code: 'hy', name: 'アルメニア語', group: 'OEU' },
    { code: 'hy_grab', name: '古典アルメニア語(グラバル)', group: 'OEU', experimental: true, historical: true },
    // Uralic: Finnic → Hungarian
    { code: 'fi', name: 'フィンランド語', group: 'OEU' },
    { code: 'et', name: 'エストニア語', group: 'OEU', experimental: true },
    { code: 'se', name: '北サーミ語', group: 'OEU', experimental: true },
    { code: 'hu', name: 'ハンガリー語', group: 'OEU' },
    // Basque (isolate)
    { code: 'eu', name: 'バスク語', group: 'OEU' },
    // Americas
    { code: 'nv', name: 'ナバホ語', group: 'AMR', experimental: true },
    { code: 'qu', name: 'ケチュア語', group: 'AMR', experimental: true },
    { code: 'gn', name: 'グアラニー語', group: 'AMR', experimental: true },
    { code: 'iu', name: 'イヌクティトゥット語', group: 'AMR', experimental: true },
    { code: 'chr', name: 'チェロキー語', group: 'AMR', experimental: true },
    { code: 'nci', name: '古典ナワトル語', group: 'AMR', experimental: true, historical: true },
    { code: 'myn', name: '古典マヤ語', group: 'AMR', experimental: true, historical: true },
    // Creoles & Pidgins
    { code: 'hwc', name: 'ハワイ・クレオール', group: 'CRL', experimental: true },
    { code: 'pcm', name: 'ナイジェリア・ピジン', group: 'CRL', experimental: true },
    { code: 'tpi', name: 'トク・ピシン', group: 'CRL', experimental: true },
    { code: 'ht', name: 'ハイチクレオール', group: 'CRL' },
    { code: 'jam', name: 'ジャマイカ・パトワ', group: 'CRL', experimental: true },
    { code: 'pap', name: 'パピアメント語', group: 'CRL', experimental: true },
    // Constructed
    { code: 'eo', name: 'エスペラント', group: 'CON' },
    { code: 'tok', name: 'トキポナ', group: 'CON' },
    { code: 'jbo', name: 'ロジバン', group: 'CON', experimental: true },
    { code: 'tlh', name: 'クリンゴン語', group: 'CON', experimental: true },
];

const DEFAULT_ORDER = LANGUAGES.map(l => l.code);
const EXPERIMENTAL_LANGS = new Set(LANGUAGES.filter(l => l.experimental).map(l => l.code));
const HISTORICAL_LANGS = new Set(LANGUAGES.filter(l => l.historical).map(l => l.code));
const MAJOR_LANGS = new Set(['ja', 'ko', 'zh', 'en', 'es_mx', 'ar']);
// Localized "Historical" / "Experimental" badge labels (short, badge-sized).
const HIST_BADGE = { en:'Hist', ja:'歴史', ko:'역사', zh:'历史', yue:'歷史', vi:'Lịch sử', th:'ประวัติ', id:'Sejarah', hi:'ऐतिहासिक', de:'Hist.', fr:'Hist.', it:'Stor.', es:'Hist.', pt:'Hist.', ru:'Ист.', uk:'Іст.', ar:'تاريخي', he:'היסטורי', sw:'Kihist.' };
const EXP_BADGE  = { en:'Exp', ja:'実験', ko:'실험', zh:'实验', yue:'實驗', vi:'Thử', th:'ทดลอง', id:'Uji', hi:'प्रयोग', de:'Exp.', fr:'Exp.', it:'Sper.', es:'Exp.', pt:'Exp.', ru:'Эксп.', uk:'Експ.', ar:'تجريبي', he:'ניסיוני', sw:'Jaribio' };
function histBadge() { return HIST_BADGE[currentUILang] || HIST_BADGE[String(currentUILang || '').split('_')[0]] || HIST_BADGE.en; }
function expBadge()  { return EXP_BADGE[currentUILang]  || EXP_BADGE[String(currentUILang || '').split('_')[0]]  || EXP_BADGE.en; }
const NO_SPACE_LANGS = new Set(['ja', 'ja_kyo', 'ja_osa', 'ja_hir', 'ja_hak', 'ja_aom', 'ja_oki', 'ja_mvi', 'ja_rys', 'ja_edo', 'ja_heian', 'zh', 'zh_db', 'zh_sc', 'yue', 'nan', 'wuu', 'hak_cn', 'cdo', 'zh_song', 'zh_tang', 'zh_han', 'th', 'th_isan', 'th_n', 'th_s', 'lo', 'my', 'km', 'vi_nom', 'ii', 'egy']);
const GLUE = '\u200C'; // ZWNJ prefix = join to previous segment without space
function buildFullText(langData, langCode) {
    const noSpace = NO_SPACE_LANGS.has(langCode);
    let result = '';
    for (const [, rawText] of langData) {
        const t = rawText.includes('|') ? rawText.split('|')[0] : rawText;
        if (t.startsWith(GLUE)) {
            result += t.slice(1); // strip GLUE, no space
        } else if (result && !noSpace) {
            result += ' ' + t;
        } else {
            result += t;
        }
    }
    return result;
}

// State — only major languages are ON by default
let enabledLangs = new Set(MAJOR_LANGS);
let langOrder = [...DEFAULT_ORDER];
let currentSentenceIdx = 0;
let redrawTimer = null;
let suppressHashUpdate = false;
let rtlNative = false; // true = show RTL languages in native reading direction

const RTL_LANGS = new Set(['ar', 'ar_eg', 'ar_lev', 'ar_ma', 'ar_gulf', 'ar_iq', 'ar_tn', 'ar_sd', 'he', 'arc', 'fa', 'ur', 'sd', 'ps', 'ckb', 'ug', 'yi']);

// --- URL hash state management ---
// New URLs use explicit key=value format for stability across language additions.
// Old compact format (base62) is still decoded for backward compatibility.

const DEFAULT_ENABLED = new Set(MAJOR_LANGS);
const UI_LANG_CODES = Object.keys(UI_STRINGS);

// --- Stable URL generation (key=value format) ---
function stateToHash() {
    const parts = [];
    parts.push('s=' + currentSentenceIdx);

    // Always include enabled langs and their order for URL stability
    const enabledOrder = langOrder.filter(c => enabledLangs.has(c));
    parts.push('l=' + enabledOrder.join(','));

    // Only include UI lang if not the default (English)
    if (currentUILang !== 'en') {
        parts.push('ui=' + currentUILang);
    }

    if (rtlNative) parts.push('rtl=1');

    return parts.join('&');
}

// --- Frozen compact format decoder (backward compat for old URLs) ---
// These indices were valid when compact URLs were generated.
// NEVER modify this list — it exists solely to decode old URLs.
const FROZEN_INDEX_LANG = ['ja','ja_osa','ja_hak','ja_oki','ja_aom','ja_edo','ko','ko_kp','ko_bus','mn','tr','zh','yue','nan','wuu','zh_song','vi','vi_nom','th','my','id','ms','tl','sa','hi','ta','fa','ar','ar_eg','he','am','egy','sw','en','nl','de','ga','la','fr','it','es_eu','es_mx','pt_eu','pt_br','eu','ru','uk','pl','hu'];
const FROZEN_LANG_INDEX = Object.fromEntries(FROZEN_INDEX_LANG.map((c, i) => [c, i]));
const FROZEN_NUM_LANGS = FROZEN_INDEX_LANG.length;
// NOTE: indices 12/13 (es_eu/es_mx) and 14/15 (pt_eu/pt_br) were collapsed into
// 'es' and 'pt' after the variant merge. Both legacy slots resolve to the merged
// code so old ui=N compact URLs continue to decode correctly.
const FROZEN_UI_LANG_CODES = ['ja','ko','zh','yue','vi','th','id','hi','en','de','fr','it','es','es','pt','pt','ru','uk','ar','he','sw'];
const FROZEN_LANG_BITS_MOD = Math.pow(2, FROZEN_NUM_LANGS);

const B62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function fromB62(s) {
    let n = 0;
    for (const c of s) { n = n * 62 + B62.indexOf(c); }
    return n;
}

function unpackCompact(n) {
    const s = n % 100; n = Math.floor(n / 100);
    const langBits = n % FROZEN_LANG_BITS_MOD; n = Math.floor(n / FROZEN_LANG_BITS_MOD);
    const ui = n % 32; n = Math.floor(n / 32);
    const rtl = n % 2;
    return { s, langBits, ui, rtl };
}

function updateURL() {
    if (suppressHashUpdate) return;
    const newHash = '#' + stateToHash();
    if (location.hash !== newHash) {
        history.pushState(null, '', newHash);
    }
}

function loadFromHash() {
    const hash = location.hash.slice(1);
    if (!hash) return;

    // Key=value format (stable, current): s=0&l=ja,ko&ui=en
    if (hash.includes('=')) { loadFromKeyValue(hash); return; }

    // Old compact format (base62): decode with frozen indices for backward compat
    loadFromCompact(hash);
}

function loadFromKeyValue(hash) {
    const params = new URLSearchParams(hash);
    if (params.has('s')) {
        const idx = parseInt(params.get('s'));
        if (idx >= 0 && idx < SENTENCES.length) currentSentenceIdx = idx;
    }
    if (params.has('l')) {
        const codes = params.get('l').split(',').filter(c => DEFAULT_ORDER.includes(c));
        if (codes.length > 0) {
            enabledLangs = new Set(codes);
            // Restore language order from l= parameter order
            const orderedSet = new Set(codes);
            const rest = DEFAULT_ORDER.filter(c => !orderedSet.has(c));
            langOrder = [...codes, ...rest];
        }
    }
    if (params.has('ui')) {
        const ui = _normalizeUiLang(params.get('ui'));
        if (UI_STRINGS[ui]) currentUILang = ui;
    }
    if (params.has('rtl')) rtlNative = params.get('rtl') === '1';
}

function loadFromCompact(hash) {
    const [packed, orderStr] = hash.split('-');
    const n = fromB62(packed);
    const { s, langBits, ui, rtl } = unpackCompact(n);

    if (s >= 0 && s < SENTENCES.length) currentSentenceIdx = s;

    const langs = new Set();
    for (let i = 0; i < FROZEN_NUM_LANGS; i++) {
        if (Math.floor(langBits / 2 ** i) % 2) {
            const code = FROZEN_INDEX_LANG[i];
            if (DEFAULT_ORDER.includes(code)) langs.add(code);
        }
    }
    if (langs.size > 0) enabledLangs = langs;

    if (ui < FROZEN_UI_LANG_CODES.length) {
        const uiCode = _normalizeUiLang(FROZEN_UI_LANG_CODES[ui]);
        if (UI_STRINGS[uiCode]) currentUILang = uiCode;
    }
    rtlNative = rtl === 1;

    if (orderStr) {
        const orderedEnabled = [];
        for (const ch of orderStr) {
            const idx = B62.indexOf(ch);
            if (idx >= 0 && idx < FROZEN_NUM_LANGS) {
                const code = FROZEN_INDEX_LANG[idx];
                if (DEFAULT_ORDER.includes(code)) orderedEnabled.push(code);
            }
        }
        if (orderedEnabled.length > 0) {
            langOrder = [];
            let oi = 0;
            for (const c of DEFAULT_ORDER) {
                if (enabledLangs.has(c)) {
                    if (oi < orderedEnabled.length) {
                        langOrder.push(orderedEnabled[oi++]);
                    }
                } else {
                    langOrder.push(c);
                }
            }
            while (oi < orderedEnabled.length) {
                langOrder.push(orderedEnabled[oi++]);
            }
        }
    }
}

// Reset all state to defaults
function resetToDefaults() {
    currentSentenceIdx = 0;
    enabledLangs = new Set(MAJOR_LANGS);
    langOrder = [...DEFAULT_ORDER];
    currentUILang = 'en';
    rtlNative = false;
    history.pushState(null, '', location.pathname);
    syncUIFromState();
    applyUILang();
}

// Debounced line redraw
function scheduleRedrawLines() {
    if (redrawTimer) cancelAnimationFrame(redrawTimer);
    redrawTimer = requestAnimationFrame(() => {
        const sentence = SENTENCES[currentSentenceIdx];
        if (!sentence) return;
        // Read active langs from DOM order (supports live reorder during drag)
        const container = document.getElementById('langRows');
        const rows = container.querySelectorAll('.lang-row');
        const activeLangs = Array.from(rows).map(r => r.dataset.lang);
        drawLines(sentence, activeLangs);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Pass 34: detect UI lang from cookie / navigator.language before parsing
    // hash, so a brand-new visitor sees their preferred language even on the
    // first load. URL ?ui= still overrides via loadFromHash below.
    currentUILang = detectUILang();

    // Restore state from URL hash before building UI
    loadFromHash();

    initUILangSelect();
    initSampleSelect();
    initCSVLangSelect();
    updateLangSummary();
    syncUIFromState();
    applyUILang();

    // Redraw lines on resize
    window.addEventListener('resize', scheduleRedrawLines);
    const container = document.getElementById('mapContainer');
    if (window.ResizeObserver) {
        new ResizeObserver(scheduleRedrawLines).observe(container);
    }

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        suppressHashUpdate = true;
        loadFromHash();
        syncUIFromState();
        render();
        suppressHashUpdate = false;
    });
});

// Sync UI elements to match current state (after loadFromHash)
function syncUIFromState() {
    // Sentence select
    document.getElementById('sampleSelect').value = currentSentenceIdx;

    // Update language summary pills
    updateLangSummary();
}

// Pass 34: cookie helpers for cross-page UI-lang persistence (cookie 'wm_uilang')
function _wmGetCookie(name) {
    const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[1]) : null;
}
function _wmSetCookie(name, value) {
    document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; max-age=31536000; SameSite=Lax';
}
// Resolve initial UI lang: cookie → navigator.language → 'en'.
// URL ?ui=xx (handled in loadFromHash) overrides for transient sharing.
function detectUILang() {
    const cookie = _wmGetCookie('wm_uilang');
    if (cookie) {
        const normalized = _normalizeUiLang(cookie);
        if (UI_STRINGS[normalized]) return normalized;
        const base = normalized.split('_')[0];
        if (UI_STRINGS[base]) return base;
    }
    const langs = navigator.languages || [navigator.language || 'en'];
    for (const l of langs) {
        const code = _normalizeUiLang(l.replace('-', '_').toLowerCase());
        if (UI_STRINGS[code]) return code;
        const base = code.split('_')[0];
        const map = { ja:'ja', ko:'ko', zh:'zh', vi:'vi', th:'th', id:'id', hi:'hi',
            en:'en', de:'de', fr:'fr', it:'it', ru:'ru', uk:'uk', ar:'ar', he:'he',
            sw:'sw', pt:'pt', es:'es' };
        if (map[base] && UI_STRINGS[map[base]]) return map[base];
    }
    return 'en';
}

// Native-name labels for the header UI-lang dropdown. Same set + spelling
// as wordmap.html's WM_UI_LABELS so the three pages show identical options.
// (Pre-fix: this dropdown reused langName() over the LANGUAGES data list,
// which produced labels like "日本語(標準)" instead of the clean "日本語"
// shown on wordmap/tree.html.)
const HEADER_UI_LANG_NATIVE = {
    ja:'日本語', ko:'한국어', zh:'中文', yue:'粤语', vi:'Tiếng Việt',
    th:'ไทย', id:'Indonesia', hi:'हिन्दी', en:'English', de:'Deutsch',
    fr:'Français', it:'Italiano',
    es:'Español', pt:'Português',
    ru:'Русский', uk:'Українська', ar:'العربية', he:'עברית', sw:'Kiswahili',
};
function initUILangSelect() {
    const sel = document.getElementById('header-ui-lang');
    if (!sel) return;
    for (const code of Object.keys(HEADER_UI_LANG_NATIVE)) {
        if (!UI_STRINGS[code]) continue;
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = HEADER_UI_LANG_NATIVE[code];
        sel.appendChild(opt);
    }
    sel.value = currentUILang;
    sel.addEventListener('change', () => {
        currentUILang = sel.value;
        _wmSetCookie('wm_uilang', currentUILang);
        applyUILang();
        updateURL();
    });
}

function applyUILang() {
    const ids = {
        uiTitle: 'title', uiSubtitle: 'subtitle', lblSentence: 'selectSentence',
        lblLangToggle: 'langToggle', lblRandom: 'random',
        btnSavePng: 'savePng', btnSaveSvg: 'saveSvg',
        btnCopyUrl: 'copyUrl', copyToast: 'copied', lblUiLang: 'uiLang',
        lblResetOrder: 'defaultOrder',
        btnSaveViewCsv: 'saveViewCsv', btnSaveCsv: 'saveCsv'
    };
    for (const [id, key] of Object.entries(ids)) {
        const el = document.getElementById(id);
        if (el) el.textContent = t(key);
    }
    // Nav labels
    const woLabels = {ja:'語順マップ',ko:'어순 맵',zh:'语序图',yue:'語序圖',vi:'Trật tự từ',th:'ลำดับคำ',id:'Urutan Kata',hi:'शब्द क्रम',en:'Word Order',de:'Wortstellung',fr:'Ordre des mots',it:'Ordine parole',es:'Orden de palabras',pt:'Ordem das palavras',ru:'Порядок слов',uk:'Порядок слів',ar:'ترتيب الكلمات',he:'סדר מילים',sw:'Mpangilio wa maneno'};
    const wmLabels = {ja:'単語マップ',ko:'단어 맵',zh:'词汇地图',yue:'詞彙地圖',vi:'Bản đồ từ',th:'แผนที่คำ',id:'Peta Kata',hi:'शब्द मानचित्र',en:'Word Map',de:'Wortkarte',fr:'Carte des mots',it:'Mappa parole',es:'Mapa de palabras',pt:'Mapa de palavras',ru:'Карта слов',uk:'Карта слів',ar:'خريطة الكلمات',he:'מפת מילים',sw:'Ramani ya maneno'};
    function setNavText(el, text) {
        if (!el) return;
        // Preserve SVG icon, update only the text node after it
        const lastChild = el.lastChild;
        if (lastChild && lastChild.nodeType === 3) {
            lastChild.textContent = text;
        } else {
            el.appendChild(document.createTextNode(text));
        }
    }
    const trLabels = {ja:'系統樹',ko:'계통수',zh:'谱系树',yue:'譜系樹',vi:'Cây phả hệ',th:'แผนภูมิ',id:'Pohon',hi:'वृक्ष',en:'Tree',de:'Stammbaum',fr:'Arbre',it:'Albero',es:'Árbol',pt:'Árvore',ru:'Древо',uk:'Дерево',ar:'الشجرة',he:'אילן',sw:'Mti'};
    const hanLabels = {ja:'漢字マップ',ko:'한자 맵',zh:'汉字地图',yue:'漢字地圖',vi:'Bản đồ Hán tự',th:'แผนที่ตัวอักษร',id:'Peta Hanzi',hi:'हान्ज़ी मानचित्र',en:'HanMap',de:'HanMap',fr:'Carte des hanzi',it:'Mappa hanzi',es:'Mapa de hanzi',pt:'Mapa de hanzi',ru:'Карта иероглифов',uk:'Карта ієрогліфів',ar:'خريطة الحروف',he:'מפת תווים',sw:'Ramani ya hanzi'};
    const nameLabels = {ja:'ネームマップ',ko:'이름 맵',zh:'姓名地图',yue:'姓名地圖',vi:'Bản đồ tên',th:'แผนที่ชื่อ',id:'Peta Nama',hi:'नाम मानचित्र',en:'Name Map',de:'Namenskarte',fr:'Carte des prénoms',it:'Mappa dei nomi',es:'Mapa de nombres',pt:'Mapa de nomes',ru:'Карта имён',uk:'Карта імен',ar:'خريطة الأسماء',he:'מפת שמות',sw:'Ramani ya majina'};
    setNavText(document.getElementById('navWordOrder'), woLabels[currentUILang] || woLabels.en);
    setNavText(document.getElementById('navToWordMap'), wmLabels[currentUILang] || wmLabels.en);
    setNavText(document.getElementById('navToTree'), trLabels[currentUILang] || trLabels.en);
    setNavText(document.getElementById('navToHanMap'), hanLabels[currentUILang] || hanLabels.en);
    setNavText(document.getElementById('nav-name'), nameLabels[currentUILang] || nameLabels.en);
    // --- Header chrome + tooltip aria/title localization (self-contained maps) ---
    const menuLbl = {ja:'メニュー',ko:'메뉴',zh:'菜单',yue:'選單',vi:'Menu',th:'เมนู',id:'Menu',hi:'मेन्यू',en:'Menu',de:'Menü',fr:'Menu',it:'Menu',es:'Menú',pt:'Menu',ru:'Меню',uk:'Меню',ar:'القائمة',he:'תפריט',sw:'Menyu'};
    const prevLbl = {ja:'前へ',ko:'이전',zh:'上一个',yue:'上一個',vi:'Trước',th:'ก่อนหน้า',id:'Sebelumnya',hi:'पिछला',en:'Previous',de:'Zurück',fr:'Précédent',it:'Precedente',es:'Anterior',pt:'Anterior',ru:'Назад',uk:'Назад',ar:'السابق',he:'הקודם',sw:'Iliyotangulia'};
    const nextLbl = {ja:'次へ',ko:'다음',zh:'下一个',yue:'下一個',vi:'Sau',th:'ถัดไป',id:'Berikutnya',hi:'अगला',en:'Next',de:'Weiter',fr:'Suivant',it:'Successivo',es:'Siguiente',pt:'Próximo',ru:'Далее',uk:'Далі',ar:'التالي',he:'הבא',sw:'Inayofuata'};
    const topLbl = {ja:'先頭へ戻る',ko:'맨 위로',zh:'回到顶部',yue:'返回頂部',vi:'Lên đầu trang',th:'ขึ้นบนสุด',id:'Ke atas',hi:'ऊपर जाएँ',en:'Scroll to top',de:'Nach oben',fr:'Haut de page',it:'Torna su',es:'Ir arriba',pt:'Ir ao topo',ru:'Наверх',uk:'Догори',ar:'إلى الأعلى',he:'לראש הדף',sw:'Nenda juu'};
    const uilLbl ={ja:'UI 言語',ko:'UI 언어',zh:'界面语言',yue:'介面語言',vi:'Ngôn ngữ giao diện',th:'ภาษาส่วนติดต่อ',id:'Bahasa antarmuka',hi:'UI भाषा',en:'UI language',de:'UI-Sprache',fr:'Langue de l\'interface',it:'Lingua dell\'interfaccia',es:'Idioma de interfaz',pt:'Idioma da interface',ru:'Язык интерфейса',uk:'Мова інтерфейсу',ar:'لغة الواجهة',he:'שפת ממשק',sw:'Lugha ya kiolesura'};
    const L = m => m[currentUILang] || m.en;
    const setA = (sel, attr, val) => { const el = document.querySelector(sel); if (el && val) el.setAttribute(attr, val); };
    const woText = woLabels[currentUILang] || woLabels.en;
    setA('.logo-badge-order', 'aria-label', woText);
    setA('.logo-badge-order', 'title', woText);
    setA('.hdr-menu-toggle', 'aria-label', L(menuLbl));
    setA('.hamburger-btn', 'aria-label', L(menuLbl));
    setA('#back-to-top', 'aria-label', L(topLbl));
    setA('#header-ui-lang', 'aria-label', L(uilLbl));
    setA('.sentence-nav .nav-icon[onclick*="prevSentence"]', 'title', L(prevLbl));
    setA('.sentence-nav .nav-icon[onclick*="nextSentence"]', 'title', L(nextLbl));
    setA('#btnRandom', 'title', t('random'));
    // NOTE: the header nav "Word Map" link (#navToWordMap) is already localized
    // above via setNavText(), which preserves its globe <svg> icon. A former
    // block here re-selected that link with `.header-collapse a[href="wordmap.html"]`
    // and set `.textContent`, which WIPED the icon (only on this Word Order page,
    // since app.js runs only here). It was mis-scoped footer code — the real
    // footer links live in .site-footer, not .header-collapse — so it also never
    // touched the footer. Removed (2026-07-05): icon restored, footer unchanged.
    const creditEl = document.getElementById('siteCredit');
    if (creditEl) creditEl.innerHTML = t('creditText');
    const disclaimerEl = document.getElementById('disclaimer');
    if (disclaimerEl) disclaimerEl.innerHTML = t('disclaimer');
    // Update page title and OGP meta tags
    document.title = t('ogTitle');
    const ogTitleEl = document.getElementById('ogTitle');
    if (ogTitleEl) ogTitleEl.content = t('ogTitle');
    const ogDescEl = document.getElementById('ogDesc');
    if (ogDescEl) ogDescEl.content = t('ogDesc');
    const twTitleEl = document.getElementById('twTitle');
    if (twTitleEl) twTitleEl.content = t('ogTitle');
    const twDescEl = document.getElementById('twDesc');
    if (twDescEl) twDescEl.content = t('ogDesc');
    const metaDescEl = document.getElementById('metaDesc');
    if (metaDescEl) metaDescEl.content = t('ogDesc');
    // Rebuild CSV language dropdown so option labels match the UI language
    const csvSel = document.getElementById('csvLangSelect');
    const csvPrev = csvSel && csvSel.value;
    initCSVLangSelect();
    if (csvSel && csvPrev) csvSel.value = csvPrev;
    const uiSel = document.getElementById('header-ui-lang');
    if (uiSel) {
        uiSel.value = currentUILang;
        // Labels stay in each option's own native name (HEADER_UI_LANG_NATIVE)
        // — same convention as wordmap/tree.html. Don't re-translate via the
        // current UI lang's LANG_NAMES (that was the source of "日本語(標準)"
        // showing up in the dropdown).
        Array.from(uiSel.options).forEach(opt => {
            opt.textContent = HEADER_UI_LANG_NATIVE[opt.value] || opt.value;
        });
    }
    // Set RTL on body for Arabic/Hebrew UI
    document.body.dir = (currentUILang === 'ar' || currentUILang === 'he') ? 'rtl' : 'ltr';
    // Update sentence select labels
    updateSampleSelectLabels();
    // Update language summary pills and modal button
    updateLangSummary();
    // Update modal button labels
    const modalTitle = document.getElementById('langModalTitle');
    if (modalTitle) modalTitle.textContent = t('selectLangsTitle');
    const modalConfirm = document.getElementById('btnModalConfirm');
    if (modalConfirm) modalConfirm.textContent = t('modalConfirm');
    const modalCancel = document.getElementById('btnModalCancel');
    if (modalCancel) modalCancel.textContent = t('modalCancel');
    const modalAllOn = document.getElementById('btnModalAllOn');
    if (modalAllOn) modalAllOn.textContent = t('allOn');
    const modalAllOff = document.getElementById('btnModalAllOff');
    if (modalAllOff) modalAllOff.textContent = t('allOff');
    // Re-localize any already-rendered Historical/Experimental badges.
    document.querySelectorAll('.hist-badge').forEach(e => { e.textContent = histBadge(); });
    document.querySelectorAll('.exp-badge').forEach(e => { e.textContent = expBadge(); });
    // Re-render map to update row labels
    render();
}

function toggleRtlNative(on) {
    rtlNative = on;
    render();
}

function toggleAllLangs(on) {
    enabledLangs = on ? new Set(DEFAULT_ORDER) : new Set();
    syncUIFromState();
    render();
}

function sentenceLabel(s) {
    // Build label from the current UI language's data, fallback to ja, then title
    const lang = currentUILang;
    const data = s.langs[lang] || s.langs.ja;
    if (data) {
        const text = data.map(([, t]) => t).join(' ');
        return `${s.id}. ${text}`;
    }
    return `${s.id}. ${s.title}`;
}

function updateSampleSelectLabels() {
    const sel = document.getElementById('sampleSelect');
    Array.from(sel.options).forEach((opt, i) => {
        opt.textContent = sentenceLabel(SENTENCES[i]);
    });
}

function initSampleSelect() {
    const sel = document.getElementById('sampleSelect');
    SENTENCES.forEach((s, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = sentenceLabel(s);
        sel.appendChild(opt);
    });
    sel.addEventListener('change', () => {
        currentSentenceIdx = parseInt(sel.value);
        render();
    });
}

// When enabling a language, move it in langOrder to just after
// the preceding enabled language in DEFAULT_ORDER
function insertLangInOrder(code) {
    // Remove from current position
    const curIdx = langOrder.indexOf(code);
    if (curIdx !== -1) langOrder.splice(curIdx, 1);

    // Find the closest preceding language (in DEFAULT_ORDER) that is currently enabled and in langOrder
    const defIdx = DEFAULT_ORDER.indexOf(code);
    let insertAfterIdx = -1;
    for (let i = defIdx - 1; i >= 0; i--) {
        const prev = DEFAULT_ORDER[i];
        if (enabledLangs.has(prev)) {
            insertAfterIdx = langOrder.indexOf(prev);
            if (insertAfterIdx !== -1) break;
        }
    }

    if (insertAfterIdx !== -1) {
        langOrder.splice(insertAfterIdx + 1, 0, code);
    } else {
        // No preceding enabled language found — insert at the beginning
        langOrder.unshift(code);
    }
}

// Temporary set for modal editing (committed on confirm)
let modalPendingLangs = null;

function hasLangData(code) {
    return SENTENCES.some(s => s.langs[code]);
}

function createModalToggle(lang) {
    // Caller (openLangModal) already pre-filters out langs with no
    // sentence data via hasLangData(), so we never receive a "pending"
    // entry here — the toggle is always interactable.
    const isOn = modalPendingLangs.has(lang.code);
    const label = document.createElement('label');
    label.className = 'lang-toggle' + (isOn ? ' active' : '');
    if (lang.experimental) label.classList.add('experimental');
    const badge = lang.historical ? '<span class="hist-badge">' + histBadge() + '</span>'
        : lang.experimental ? '<span class="exp-badge">' + expBadge() + '</span>' : '';
    // SEO big-text page link → /{ui}/wordmap/{code}. LangMap has no SEO page
    // of its own, so we link to the Word Map page (closest rich content).
    // currentUILang base must be one of the 19 supported UI langs; else 'en'.
    const _SEO_UI = ['en','ja','ko','zh','yue','vi','th','id','hi','de','fr','it','es','pt','ru','uk','ar','he','sw'];
    const _uiBase = (typeof currentUILang === 'string' ? currentUILang : 'en').split('_')[0];
    const _seoUi = _SEO_UI.indexOf(_uiBase) !== -1 ? _uiBase : 'en';
    const _seoCode = String(lang.code).replace(/[^a-z0-9_]/gi, '');
    const _seoHref = '/' + _seoUi + '/wordmap/' + _seoCode;
    label.innerHTML = `
        <span class="dot"></span>
        <input type="checkbox" ${isOn ? 'checked' : ''} data-lang="${lang.code}">
        <span>${langName(lang.code)}</span>${badge}
        <a class="lang-seo-link" href="${_seoHref}" title="Big-text page" style="margin-left:6px;display:inline-flex;vertical-align:-2px;text-decoration:none;color:#4a6cf7"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg></a>
    `;
    // The SEO link must navigate, not toggle the checkbox: stop the click
    // from reaching the label's preventDefault/toggle handler below.
    const _seoLink = label.querySelector('.lang-seo-link');
    if (_seoLink) _seoLink.addEventListener('click', (e) => { e.stopPropagation(); });
    label.addEventListener('click', (e) => {
        e.preventDefault();
        const cb = label.querySelector('input');
        cb.checked = !cb.checked;
        if (cb.checked) {
            modalPendingLangs.add(lang.code);
            label.classList.add('active');
        } else {
            modalPendingLangs.delete(lang.code);
            label.classList.remove('active');
        }
    });
    return label;
}

const GROUP_NAMES = {
    ja: { JPN:'日本語', KOR:'韓国語', CHN:'中国語', TIB:'チベット・ビルマ語', SEA:'東南アジア', AUS:'オーストロネシア(大洋州)', SAS:'南アジア', TRK:'テュルク語族', MON:'モンゴル語族', TNG:'ツングース語族', KAR:'カルトヴェリ語族', SEM:'セム語', ANE:'古代近東', AFR:'アフリカ', PIE:'印欧祖語', GER:'ゲルマン語', CEL:'ケルト語', ROM:'ロマンス語', SLV:'スラヴ語', OEU:'バルト・ギリシャ・ウラル他', AMR:'アメリカ先住民', CRL:'クレオール・ピジン', CON:'人工言語' },
    en: { JPN:'Japanese', KOR:'Korean', CHN:'Sinitic', TIB:'Tibeto-Burman', SEA:'SE Asian & Austronesian', AUS:'Austronesian (Oceanic)', SAS:'South Asian', TRK:'Turkic', MON:'Mongolic', TNG:'Tungusic', KAR:'Kartvelian', SEM:'Semitic', ANE:'Ancient Near East', AFR:'African', PIE:'Proto-Indo-European', GER:'Germanic', CEL:'Celtic', ROM:'Romance', SLV:'Slavic', OEU:'Baltic, Hellenic, Uralic & more', AMR:'Americas', CRL:'Creoles & Pidgins', CON:'Constructed' },
    ko: {"JPN":"일본어","KOR":"한국어","CHN":"중국어","TIB":"티베트·버마어","SEA":"동남아시아","AUS":"오스트로네시아(대양주)","SAS":"남아시아","TRK":"튀르크어족","MON":"몽골어족","TNG":"퉁구스어족","KAR":"카르트벨리어족","SEM":"셈어","ANE":"고대 근동","AFR":"아프리카","PIE":"인도유럽조어","GER":"게르만어","CEL":"켈트어","ROM":"로망스어","SLV":"슬라브어","OEU":"발트·그리스·우랄 외","AMR":"아메리카 원주민","CRL":"크레올·피진","CON":"인공어"},
    zh: {"JPN":"日语","KOR":"韩语","CHN":"汉语","TIB":"藏缅语","SEA":"东南亚","AUS":"南岛语(大洋洲)","SAS":"南亚","TRK":"突厥语族","MON":"蒙古语族","TNG":"通古斯语族","KAR":"南高加索语族","SEM":"闪米特语","ANE":"古代近东","AFR":"非洲","PIE":"原始印欧语","GER":"日耳曼语","CEL":"凯尔特语","ROM":"罗曼语","SLV":"斯拉夫语","OEU":"波罗的·希腊·乌拉尔等","AMR":"美洲原住民","CRL":"克里奥尔·皮钦","CON":"人工语言"},
    yue: {"JPN":"日語","KOR":"韓語","CHN":"漢語","TIB":"藏緬語","SEA":"東南亞","AUS":"南島語(大洋洲)","SAS":"南亞","TRK":"突厥語族","MON":"蒙古語族","TNG":"通古斯語族","KAR":"南高加索語族","SEM":"閃米特語","ANE":"古代近東","AFR":"非洲","PIE":"原始印歐語","GER":"日耳曼語","CEL":"凱爾特語","ROM":"羅曼語","SLV":"斯拉夫語","OEU":"波羅的·希臘·烏拉爾等","AMR":"美洲原住民","CRL":"克里奧爾·皮欽","CON":"人工語言"},
    vi: {"JPN":"Tiếng Nhật","KOR":"Tiếng Hàn","CHN":"Tiếng Hán","TIB":"Tạng-Miến","SEA":"Đông Nam Á","AUS":"Nam Đảo (Châu Đại Dương)","SAS":"Nam Á","TRK":"Turkic","MON":"Mông Cổ","TNG":"Tungus","KAR":"Kartvel","SEM":"Semit","ANE":"Cận Đông cổ đại","AFR":"Châu Phi","PIE":"Ấn-Âu nguyên thủy","GER":"German","CEL":"Celt","ROM":"Roman","SLV":"Slav","OEU":"Baltic, Hy Lạp, Ural v.v.","AMR":"Châu Mỹ bản địa","CRL":"Creole & Pidgin","CON":"Ngôn ngữ nhân tạo"},
    th: {"JPN":"ภาษาญี่ปุ่น","KOR":"ภาษาเกาหลี","CHN":"ภาษาจีน","TIB":"ทิเบต-พม่า","SEA":"เอเชียตะวันออกเฉียงใต้","AUS":"ออสโตรนีเซีย (โอเชียเนีย)","SAS":"เอเชียใต้","TRK":"เตอร์กิก","MON":"มองโกล","TNG":"ตุงกุส","KAR":"คาร์ตเวเลียน","SEM":"เซมิติก","ANE":"ตะวันออกใกล้โบราณ","AFR":"แอฟริกา","PIE":"อินโด-ยูโรเปียนดั้งเดิม","GER":"เจอร์มานิก","CEL":"เคลติก","ROM":"โรมานซ์","SLV":"สลาฟ","OEU":"บอลติก กรีก อูราลิก ฯลฯ","AMR":"อเมริกาพื้นเมือง","CRL":"ครีโอล & พิดจิน","CON":"ภาษาประดิษฐ์"},
    id: {"JPN":"Jepang","KOR":"Korea","CHN":"Tionghoa","TIB":"Tibet-Burma","SEA":"Asia Tenggara","AUS":"Austronesia (Oseania)","SAS":"Asia Selatan","TRK":"Turkik","MON":"Mongolik","TNG":"Tungusik","KAR":"Kartvelian","SEM":"Semitik","ANE":"Timur Dekat Kuno","AFR":"Afrika","PIE":"Proto-Indo-Eropa","GER":"Germanik","CEL":"Keltik","ROM":"Romanik","SLV":"Slavik","OEU":"Baltik, Yunani, Uralik dll.","AMR":"Amerika Asli","CRL":"Kreol & Pidgin","CON":"Bahasa Buatan"},
    hi: {"JPN":"जापानी","KOR":"कोरियाई","CHN":"चीनी","TIB":"तिब्बती-बर्मी","SEA":"दक्षिण-पूर्व एशिया","AUS":"ऑस्ट्रोनीशियन (ओशिनिया)","SAS":"दक्षिण एशिया","TRK":"तुर्किक","MON":"मंगोलिक","TNG":"तुंगूसिक","KAR":"कार्तवेलियन","SEM":"सेमिटिक","ANE":"प्राचीन निकट पूर्व","AFR":"अफ़्रीकी","PIE":"प्रोटो-भारोपीय","GER":"जर्मेनिक","CEL":"केल्टिक","ROM":"रोमांस","SLV":"स्लाविक","OEU":"बाल्टिक, ग्रीक, उरालिक आदि","AMR":"अमेरिका मूलवासी","CRL":"क्रेओल और पिजिन","CON":"कृत्रिम भाषा"},
    de: {"JPN":"Japanisch","KOR":"Koreanisch","CHN":"Sinitisch","TIB":"Tibeto-Birmanisch","SEA":"Südostasien","AUS":"Austronesisch (Ozeanien)","SAS":"Südasien","TRK":"Turksprachen","MON":"Mongolisch","TNG":"Tungusisch","KAR":"Kartwelisch","SEM":"Semitisch","ANE":"Alter Orient","AFR":"Afrikanisch","PIE":"Urindogermanisch","GER":"Germanisch","CEL":"Keltisch","ROM":"Romanisch","SLV":"Slawisch","OEU":"Baltisch, Griechisch, Uralisch u.a.","AMR":"Amerikanische Ureinwohner","CRL":"Kreol- & Pidginsprachen","CON":"Konstruierte Sprachen"},
    fr: {"JPN":"Japonais","KOR":"Coréen","CHN":"Sinique","TIB":"Tibéto-birman","SEA":"Asie du Sud-Est","AUS":"Austronésien (Océanie)","SAS":"Asie du Sud","TRK":"Turcique","MON":"Mongol","TNG":"Toungouse","KAR":"Kartvélien","SEM":"Sémitique","ANE":"Ancien Proche-Orient","AFR":"Africain","PIE":"Proto-indo-européen","GER":"Germanique","CEL":"Celtique","ROM":"Roman","SLV":"Slave","OEU":"Balte, grec, ouralien etc.","AMR":"Amérindien","CRL":"Créoles & pidgins","CON":"Langues construites"},
    it: {"JPN":"Giapponese","KOR":"Coreano","CHN":"Sinitico","TIB":"Tibeto-birmano","SEA":"Sud-est asiatico","AUS":"Austronesiano (Oceania)","SAS":"Asia meridionale","TRK":"Turco","MON":"Mongolo","TNG":"Tunguso","KAR":"Cartvelico","SEM":"Semitico","ANE":"Antico Vicino Oriente","AFR":"Africano","PIE":"Proto-indoeuropeo","GER":"Germanico","CEL":"Celtico","ROM":"Romanzo","SLV":"Slavo","OEU":"Baltico, greco, uralico ecc.","AMR":"Amerindio","CRL":"Creoli & pidgin","CON":"Lingue artificiali"},
    es: {"JPN":"Japonés","KOR":"Coreano","CHN":"Sínico","TIB":"Tibetano-birmano","SEA":"Sudeste Asiático","AUS":"Austronesio (Oceanía)","SAS":"Asia Meridional","TRK":"Túrquico","MON":"Mongólico","TNG":"Tungúsico","KAR":"Kartveliano","SEM":"Semítico","ANE":"Antiguo Oriente Próximo","AFR":"Africano","PIE":"Protoindoeuropeo","GER":"Germánico","CEL":"Céltico","ROM":"Romance","SLV":"Eslavo","OEU":"Báltico, griego, urálico y más","AMR":"Amerindio","CRL":"Criollos y pidgins","CON":"Lenguas artificiales"},
    pt: {"JPN":"Japonês","KOR":"Coreano","CHN":"Sínico","TIB":"Tibeto-birmanês","SEA":"Sudeste Asiático","AUS":"Austronésio (Oceania)","SAS":"Ásia Meridional","TRK":"Turcomano","MON":"Mongólico","TNG":"Tungúsico","KAR":"Cartveliano","SEM":"Semítico","ANE":"Antigo Oriente Próximo","AFR":"Africano","PIE":"Proto-indo-europeu","GER":"Germânico","CEL":"Céltico","ROM":"Românico","SLV":"Eslavo","OEU":"Báltico, grego, urálico e mais","AMR":"Ameríndio","CRL":"Crioulos e pidgins","CON":"Línguas artificiais"},
    ru: {"JPN":"Японский","KOR":"Корейский","CHN":"Синитические","TIB":"Тибето-бирманские","SEA":"Юго-Восточная Азия","AUS":"Австронезийские (Океания)","SAS":"Южная Азия","TRK":"Тюркские","MON":"Монгольские","TNG":"Тунгусские","KAR":"Картвельские","SEM":"Семитские","ANE":"Древний Ближний Восток","AFR":"Африканские","PIE":"Праиндоевропейский","GER":"Германские","CEL":"Кельтские","ROM":"Романские","SLV":"Славянские","OEU":"Балтийские, греческий, уральские и др.","AMR":"Языки Америки","CRL":"Креольские и пиджины","CON":"Искусственные языки"},
    uk: {"JPN":"Японська","KOR":"Корейська","CHN":"Синітичні","TIB":"Тибето-бірманські","SEA":"Південно-Східна Азія","AUS":"Австронезійські (Океанія)","SAS":"Південна Азія","TRK":"Тюркські","MON":"Монгольські","TNG":"Тунгуські","KAR":"Картвельські","SEM":"Семітські","ANE":"Давній Близький Схід","AFR":"Африканські","PIE":"Праіндоєвропейська","GER":"Германські","CEL":"Кельтські","ROM":"Романські","SLV":"Слов'янські","OEU":"Балтійські, грецька, уральські та ін.","AMR":"Мови Америки","CRL":"Креольські та піджини","CON":"Штучні мови"},
    ar: {"JPN":"اليابانية","KOR":"الكورية","CHN":"الصينية","TIB":"التبتية البورمية","SEA":"جنوب شرق آسيا","AUS":"الأسترونيزية (أوقيانوسيا)","SAS":"جنوب آسيا","TRK":"التركية","MON":"المغولية","TNG":"التونغوسية","KAR":"الكارتفيلية","SEM":"السامية","ANE":"الشرق الأدنى القديم","AFR":"الأفريقية","PIE":"الهندية الأوروبية البدائية","GER":"الجرمانية","CEL":"الكلتية","ROM":"الرومانسية","SLV":"السلافية","OEU":"البلطيقية واليونانية والأورالية وأخرى","AMR":"لغات الأمريكتين","CRL":"الكريولية والبيدجين","CON":"اللغات المصطنعة"},
    he: {"JPN":"יפנית","KOR":"קוריאנית","CHN":"סינית","TIB":"טיבטו-בורמית","SEA":"דרום-מזרח אסיה","AUS":"אוסטרונזית (אוקיאניה)","SAS":"דרום אסיה","TRK":"טורקית","MON":"מונגולית","TNG":"טונגוסית","KAR":"קרטבלית","SEM":"שמית","ANE":"המזרח הקדום","AFR":"אפריקאית","PIE":"הודו-אירופית קדומה","GER":"גרמאנית","CEL":"קלטית","ROM":"רומאנית","SLV":"סלאבית","OEU":"בלטית, יוונית, אוראלית ועוד","AMR":"ילידי אמריקה","CRL":"קריאולית ופידג'ין","CON":"שפות מלאכותיות"},
    sw: {"JPN":"Kijapani","KOR":"Kikorea","CHN":"Kichina","TIB":"Kitibeti-Burma","SEA":"Asia ya Kusini-Mashariki","AUS":"Kiaustronesia (Oceania)","SAS":"Asia ya Kusini","TRK":"Kiturki","MON":"Kimongolia","TNG":"Kitungusi","KAR":"Kikartveli","SEM":"Kisemiti","ANE":"Mashariki ya Kale","AFR":"Kiafrika","PIE":"Ki-Indo-Ulaya Asilia","GER":"Kijerumani","CEL":"Kikelti","ROM":"Kiromansi","SLV":"Kislavoni","OEU":"Kibaltiki, Kigiriki, Kiurali na zingine","AMR":"Lugha za Marekani","CRL":"Kreoli na Pidgin","CON":"Lugha Bandia"},
};

function groupLabel(groupCode) {
    const names = GROUP_NAMES[currentUILang] || GROUP_NAMES.en;
    return names[groupCode] || GROUP_NAMES.en[groupCode] || groupCode;
}

function updateLangSummary() {
    const container = document.getElementById('langSummary');
    container.innerHTML = '';
    // Walk groups in LANGUAGES display order. For each group:
    //   - if ALL selectable members are enabled, emit ONE pill with the
    //     group's display name (e.g. "Japanese" instead of 13 individual
    //     dialect pills).
    //   - otherwise emit individual pills for the enabled members.
    //   - skip groups with no enabled members.
    const seenGroups = new Set();
    for (const lang of LANGUAGES) {
        if (seenGroups.has(lang.group)) continue;
        seenGroups.add(lang.group);
        const groupMembers = LANGUAGES.filter(
            l => l.group === lang.group && hasLangData(l.code)
        );
        if (groupMembers.length === 0) continue;
        const enabledMembers = groupMembers.filter(l => enabledLangs.has(l.code));
        if (enabledMembers.length === 0) continue;
        if (enabledMembers.length === groupMembers.length) {
            const pill = document.createElement('span');
            pill.className = 'lang-pill lang-group-pill';
            pill.textContent = groupLabel(lang.group);
            container.appendChild(pill);
        } else {
            for (const l of enabledMembers) {
                const pill = document.createElement('span');
                pill.className = 'lang-pill' + (l.experimental ? ' experimental' : '');
                pill.textContent = langName(l.code);
                container.appendChild(pill);
            }
        }
    }
    // Update the static button text
    const btn = document.getElementById('btnOpenLangModal');
    if (btn) {
        const ready = LANGUAGES.filter(l => hasLangData(l.code)).length;
        btn.textContent = t('selectLangs').replace('{n}', ready);
    }
}

function openLangModal() {
    modalPendingLangs = new Set([...enabledLangs].filter(c => hasLangData(c)));
    const body = document.getElementById('langModalBody');
    body.innerHTML = '';

    // Build groups preserving LANGUAGES order
    const groups = [];
    const groupMap = {};
    for (const lang of LANGUAGES) {
        if (!groupMap[lang.group]) {
            groupMap[lang.group] = [];
            groups.push(lang.group);
        }
        groupMap[lang.group].push(lang);
    }
    for (const groupCode of groups) {
        const langs = groupMap[groupCode];
        // Drop languages without any sentence data so the modal only
        // lists rows the user can actually toggle on. A group whose
        // members all lack sentences is omitted entirely.
        const selectableLangs = langs.filter(l => hasLangData(l.code));
        if (selectableLangs.length === 0) continue;
        const groupDiv = document.createElement('div');
        groupDiv.className = 'lang-group';

        const header = document.createElement('span');
        header.className = 'lang-group-label';
        header.textContent = groupLabel(groupCode);
        header.style.cursor = 'pointer';
        groupDiv.appendChild(header);

        const toggles = document.createElement('div');
        toggles.className = 'lang-group-toggles';
        selectableLangs.forEach(lang => toggles.appendChild(createModalToggle(lang)));
        groupDiv.appendChild(toggles);

        // Click group label to toggle all selectable languages in this group
        header.addEventListener('click', () => {
            const allOn = selectableLangs.every(l => modalPendingLangs.has(l.code));
            for (const l of selectableLangs) {
                if (allOn) {
                    modalPendingLangs.delete(l.code);
                } else {
                    modalPendingLangs.add(l.code);
                }
            }
            // Update toggle UI
            toggles.querySelectorAll('.lang-toggle').forEach(label => {
                const cb = label.querySelector('input');
                if (!cb || cb.disabled) return;
                const code = cb.dataset.lang;
                cb.checked = modalPendingLangs.has(code);
                label.classList.toggle('active', cb.checked);
            });
        });

        body.appendChild(groupDiv);
    }

    const overlay = document.getElementById('langModalOverlay');
    overlay.classList.add('open');
    // Close on overlay background click
    overlay.onclick = (e) => { if (e.target === overlay) closeLangModal(false); };
}

function closeLangModal(confirm) {
    if (confirm && modalPendingLangs) {
        // Find newly added languages
        const added = [...modalPendingLangs].filter(c => !enabledLangs.has(c));
        enabledLangs = modalPendingLangs;
        // Insert newly enabled languages in default order
        for (const code of added) {
            insertLangInOrder(code);
        }
        updateLangSummary();
        render();
    }
    modalPendingLangs = null;
    document.getElementById('langModalOverlay').classList.remove('open');
}

function modalToggleAll(on) {
    const body = document.getElementById('langModalBody');
    if (on) {
        modalPendingLangs = new Set(DEFAULT_ORDER);
    } else {
        modalPendingLangs = new Set();
    }
    body.querySelectorAll('.lang-toggle').forEach(label => {
        const cb = label.querySelector('input');
        if (!cb) return;
        const code = cb.dataset.lang;
        cb.checked = modalPendingLangs.has(code);
        label.classList.toggle('active', modalPendingLangs.has(code));
    });
}

// --- Row drag (reorder from the map display — insert between rows) ---

function clearDropIndicators() {
    document.querySelectorAll('.row-drop-before, .row-drop-after').forEach(el => {
        el.classList.remove('row-drop-before', 'row-drop-after');
    });
}

let pointerDragState = null;

function onRowPointerDown(e) {
    if (!e.target.closest('.lang-label')) return;
    e.preventDefault();

    const row = e.currentTarget;
    const rowRect = row.getBoundingClientRect();

    pointerDragState = {
        lang: row.dataset.lang,
        row: row,
        offsetY: e.clientY - rowRect.top,
        // Track the cursor Y at the moment of the last DOM-position reset
        // (either pointerdown, or just after a swap). The row's visual
        // translateY is (clientY - startY) — lines follow the visual
        // position via getBoundingClientRect.
        startY: e.clientY,
    };

    row.classList.add('dragging');
    row.setPointerCapture(e.pointerId);

    document.addEventListener('pointermove', onDocPointerMove);
    document.addEventListener('pointerup', onDocPointerUp);
}

function onDocPointerMove(e) {
    if (!pointerDragState) return;
    e.preventDefault();

    const { row } = pointerDragState;

    // 1. Visually translate the dragged row to follow the cursor — its
    //    segments' getBoundingClientRect reflects the transform, so the
    //    line redraw below connects to the row's NEW visual position
    //    every frame, not just on DOM swap.
    const dy = e.clientY - pointerDragState.startY;
    row.style.transform = 'translateY(' + dy + 'px)';

    // 2. Check if a DOM swap is needed (cursor crossed a neighbor's midpoint).
    const container = document.getElementById('langRows');
    const rows = Array.from(container.querySelectorAll('.lang-row'));
    const dragIdx = rows.indexOf(row);
    const cursorY = e.clientY;
    let swapped = false;

    if (dragIdx < rows.length - 1) {
        const nextRow = rows[dragIdx + 1];
        const nextRect = nextRow.getBoundingClientRect();
        if (cursorY > nextRect.top + nextRect.height / 2) {
            container.insertBefore(nextRow, row);
            swapped = true;
        }
    }
    if (!swapped && dragIdx > 0) {
        const prevRow = rows[dragIdx - 1];
        const prevRect = prevRow.getBoundingClientRect();
        if (cursorY < prevRect.top + prevRect.height / 2) {
            container.insertBefore(row, prevRow);
            swapped = true;
        }
    }

    if (swapped) {
        // The row's DOM position changed, so its base Y is different now.
        // Re-anchor the cursor offset so the visual position stays under
        // the cursor (no sudden jump).
        pointerDragState.startY = e.clientY;
        row.style.transform = 'translateY(0)';
    }

    // 3. Redraw lines on every move so connecting lines track the row's
    //    visual position even between swaps.
    scheduleRedrawLines();
}

function onDocPointerUp(e) {
    if (!pointerDragState) return;

    const { row } = pointerDragState;
    row.classList.remove('dragging');
    row.style.transform = '';  // Drop the visual translateY now that the
                               // row is in its final DOM position.

    pointerDragState = null;

    document.removeEventListener('pointermove', onDocPointerMove);
    document.removeEventListener('pointerup', onDocPointerUp);

    syncLangOrderFromDOM();
    updateURL();
    scheduleRedrawLines();
}

function syncLangOrderFromDOM() {
    const container = document.getElementById('langRows');
    const rows = container.querySelectorAll('.lang-row');
    const newVisualOrder = Array.from(rows).map(r => r.dataset.lang);
    const activeLangsSet = new Set(newVisualOrder);
    const newLangOrder = [];
    let visualIdx = 0;
    for (const code of langOrder) {
        if (activeLangsSet.has(code)) {
            newLangOrder.push(newVisualOrder[visualIdx++]);
        } else {
            newLangOrder.push(code);
        }
    }
    langOrder.length = 0;
    langOrder.push(...newLangOrder);
}

function prevSentence() {
    currentSentenceIdx = (currentSentenceIdx - 1 + SENTENCES.length) % SENTENCES.length;
    document.getElementById('sampleSelect').value = currentSentenceIdx;
    render();
}

function nextSentence() {
    currentSentenceIdx = (currentSentenceIdx + 1) % SENTENCES.length;
    document.getElementById('sampleSelect').value = currentSentenceIdx;
    render();
}

function randomSentence() {
    currentSentenceIdx = Math.floor(Math.random() * SENTENCES.length);
    document.getElementById('sampleSelect').value = currentSentenceIdx;
    render();
}

function resetOrder() {
    langOrder = [...DEFAULT_ORDER];
    render();
}

// Main render
function buildSegmentTooltip(sentence, segId) {
    const refLangs = ['ja', 'zh', 'en', 'es_mx', 'ar'];
    const labels = { ja: '日', zh: '中', en: '英', es_mx: '西', ar: '阿' };
    const lines = [];
    for (const lang of refLangs) {
        const segs = sentence.langs[lang];
        if (!segs) continue;
        const subIds = segId.split('|');
        const texts = segs.filter(s => subIds.some(id => s[0] === id || s[0].split('|').includes(id))).map(s => s[1]);
        if (texts.length > 0) {
            lines.push(`${labels[lang]}: ${texts.join(' ')}`);
        }
    }
    return lines.join('\n');
}

function render() {
    const sentence = SENTENCES[currentSentenceIdx];
    if (!sentence) return;

    editingRow = null;

    // Reset SVG lines to prevent stale width from previous sentence causing right margin
    const svg = document.getElementById('linesSvg');
    if (svg) {
        svg.innerHTML = '';
        svg.setAttribute('width', 0);
        svg.setAttribute('height', 0);
        svg.style.width = '0';
        svg.style.height = '0';
    }

    const rowsContainer = document.getElementById('langRows');
    rowsContainer.innerHTML = '';

    const activeLangs = langOrder.filter(code => enabledLangs.has(code) && sentence.langs[code]);

    const mapContainer = document.getElementById('mapContainer');
    const emptyMsg = document.getElementById('emptyMessage');
    if (activeLangs.length === 0) {
        mapContainer.style.display = 'none';
        if (!emptyMsg) {
            const msg = document.createElement('div');
            msg.id = 'emptyMessage';
            msg.className = 'empty-message';
            msg.textContent = t('noLangSelected');
            mapContainer.parentNode.insertBefore(msg, mapContainer.nextSibling);
        } else {
            emptyMsg.style.display = '';
            emptyMsg.textContent = t('noLangSelected');
        }
        updateURL();
        return;
    } else {
        mapContainer.style.display = '';
        if (emptyMsg) emptyMsg.style.display = 'none';
    }

    activeLangs.forEach(code => {
        const lang = LANGUAGES.find(l => l.code === code);
        const langData = sentence.langs[code];

        const row = document.createElement('div');
        row.className = 'lang-row';
        row.dataset.lang = code;
        row.addEventListener('pointerdown', onRowPointerDown);

        const label = document.createElement('div');
        label.className = 'lang-label';
        if (HISTORICAL_LANGS.has(code)) {
            label.innerHTML = langName(code) + '<span class="hist-badge">' + histBadge() + '</span>';
        } else {
            label.textContent = langName(code);
        }
        row.appendChild(label);

        const textDiv = document.createElement('div');
        textDiv.className = 'lang-text';

        langData.forEach(([segId, text], i) => {
            const seg = document.createElement('span');
            seg.className = 'segment';
            seg.dataset.seg = segId;
            seg.dataset.lang = code;
            // Handle compound segments (e.g. "B|D")
            const subIds = segId.split('|');
            const isCompound = subIds.length > 1;
            // Dual-script display (native script above, Latin transliteration
            // below). Triggers for egy (Ancient Egyptian hieroglyphs) and
            // sux (Sumerian cuneiform) — both store as "native|translit".
            const isEgyDual = (code === 'egy' || code === 'sux') && text.includes('|');
            const compoundColors = isCompound
                ? subIds.map(id => sentence.segments[id]?.color || '#666')
                : null;
            const segColor = isCompound
                ? null  // handled via gradient below
                : (sentence.segments[segId]?.color || '#666');
            if (isCompound) {
                seg.classList.add('segment-compound');
                if (isEgyDual) {
                    // For compound egy segments the gradient must be applied
                    // on each .segment-hiero child individually (see below).
                    // The .segment-compound CSS class sets
                    // -webkit-text-fill-color:transparent which would inherit
                    // into the child .segment-translit and blank it out, so
                    // we override BOTH color and -webkit-text-fill-color on
                    // the parent to a visible grey; the hiero spans then
                    // re-override -webkit-text-fill-color to transparent so
                    // the gradient bleeds through their glyphs.
                    seg.style.color = '#666';
                    seg.style.webkitTextFillColor = '#666';
                } else {
                    seg.style.backgroundImage = `linear-gradient(90deg, ${compoundColors.join(', ')})`;
                    seg.style.webkitBackgroundClip = 'text';
                    seg.style.backgroundClip = 'text';
                    seg.style.color = 'transparent';
                }
            } else {
                seg.style.color = segColor;
            }
            seg.dataset.rawText = text;
            const applyCompoundGradient = (hieroSpan) => {
                if (!isCompound) return;
                hieroSpan.style.backgroundImage = `linear-gradient(90deg, ${compoundColors.join(', ')})`;
                hieroSpan.style.webkitBackgroundClip = 'text';
                hieroSpan.style.backgroundClip = 'text';
                hieroSpan.style.color = 'transparent';
                hieroSpan.style.webkitTextFillColor = 'transparent';
            };
            if (isEgyDual) {
                const [hiero, translit] = text.split('|');
                seg.classList.add('segment-dual');
                const hieroWords = hiero.split(' ');
                const translitWords = translit.split(' ');
                // Per-word pairing only when both sides have the SAME word
                // count. Otherwise translit/hiero word counts differ (e.g.
                // hiero "𓋴𓅓𓂋𓇋" but translit "n p.j" because one of the
                // glyphs encodes 2 morphemes, or compound segments mixing
                // grammatical particles) and pairing by index hides the
                // overflow. Fall back to a single hiero row + single
                // transliteration row so nothing is dropped from view.
                if (hieroWords.length === translitWords.length) {
                    hieroWords.forEach((hw, wi) => {
                        const pair = document.createElement('span');
                        pair.className = 'hiero-pair';
                        const hieroSpan = document.createElement('span');
                        hieroSpan.className = 'segment-hiero';
                        hieroSpan.textContent = hw;
                        applyCompoundGradient(hieroSpan);
                        const translitSpan = document.createElement('span');
                        translitSpan.className = 'segment-translit';
                        translitSpan.textContent = translitWords[wi] || '';
                        pair.appendChild(hieroSpan);
                        pair.appendChild(translitSpan);
                        seg.appendChild(pair);
                    });
                } else {
                    const pair = document.createElement('span');
                    pair.className = 'hiero-pair';
                    const hieroSpan = document.createElement('span');
                    hieroSpan.className = 'segment-hiero';
                    hieroSpan.textContent = hiero;
                    applyCompoundGradient(hieroSpan);
                    const translitSpan = document.createElement('span');
                    translitSpan.className = 'segment-translit';
                    translitSpan.textContent = translit;
                    pair.appendChild(hieroSpan);
                    pair.appendChild(translitSpan);
                    seg.appendChild(pair);
                }
            } else {
                seg.textContent = text;
            }
            seg.title = buildSegmentTooltip(sentence, segId);
            textDiv.appendChild(seg);

            // Add space between segments
            if (i < langData.length - 1) {
                const space = document.createElement('span');
                space.className = 'segment-space';
                textDiv.appendChild(space);
            }
        });

        // Add sentence-ending punctuation if applicable
        if (sentence.type === 'question') {
            // Language-specific question marks
            const SPANISH_LANGS = new Set(['es_eu','es_mx','es_ar','es_co','es_cl','es_cu','es_pe','es_an','lad','gl','ca']);
            const ARABIC_QM_LANGS = new Set(['ar','ar_eg','ar_lev','ar_ma','ar_gulf','ar_iq','ar_tn','ar_sd','fa','ur','sd','ps','ckb']);
            const GREEK_LANGS = new Set(['el','el_grc']);
            const ETHIOPIC_LANGS = new Set(['am','ti']);
            const NO_QM_LANGS = new Set(['th','th_isan','th_n','th_s','lo','km']); // question particles, no mark needed
            if (SPANISH_LANGS.has(code)) {
                const openPunct = document.createElement('span');
                openPunct.className = 'segment-punct';
                openPunct.textContent = '¿';
                textDiv.insertBefore(openPunct, textDiv.firstChild);
                const closePunct = document.createElement('span');
                closePunct.className = 'segment-punct';
                closePunct.textContent = '?';
                textDiv.appendChild(closePunct);
            } else if (ARABIC_QM_LANGS.has(code)) {
                const punct = document.createElement('span');
                punct.className = 'segment-punct';
                punct.textContent = '؟';
                textDiv.appendChild(punct);
            } else if (GREEK_LANGS.has(code)) {
                const punct = document.createElement('span');
                punct.className = 'segment-punct';
                punct.textContent = ';';
                textDiv.appendChild(punct);
            } else if (ETHIOPIC_LANGS.has(code)) {
                const punct = document.createElement('span');
                punct.className = 'segment-punct';
                punct.textContent = '፧';
                textDiv.appendChild(punct);
            } else if (code === 'hy') {
                const punct = document.createElement('span');
                punct.className = 'segment-punct';
                punct.textContent = '՞';
                textDiv.appendChild(punct);
            } else if (!NO_QM_LANGS.has(code)) {
                const punct = document.createElement('span');
                punct.className = 'segment-punct';
                punct.textContent = '?';
                textDiv.appendChild(punct);
            }
        }

        row.appendChild(textDiv);

        // Apply RTL native direction if toggled
        if (rtlNative && RTL_LANGS.has(code)) {
            row.classList.add('rtl-native');
        }

        // Copy button (appears on hover, desktop only — hidden on mobile
        // via CSS @media rule; mobile uses the .mobile-action-bar below).
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
        copyBtn.title = t('copyText');
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let text = buildFullText(langData, code);
            if (sentence.type === 'question') {
                const SPANISH_LANGS = new Set(['es_eu','es_mx','es_ar','es_co','es_cl','es_cu','es_pe','es_an','lad','gl','ca']);
                const ARABIC_QM_LANGS = new Set(['ar','ar_eg','ar_lev','ar_ma','ar_gulf','ar_iq','ar_tn','ar_sd','fa','ur','sd','ps','ckb']);
                const GREEK_LANGS = new Set(['el','el_grc']);
                const ETHIOPIC_LANGS = new Set(['am','ti']);
                const NO_QM_LANGS = new Set(['th','th_isan','th_n','th_s','lo','km']);
                if (SPANISH_LANGS.has(code)) { text = '¿' + text + '?'; }
                else if (ARABIC_QM_LANGS.has(code)) { text += '؟'; }
                else if (GREEK_LANGS.has(code)) { text += ';'; }
                else if (ETHIOPIC_LANGS.has(code)) { text += '፧'; }
                else if (code === 'hy') { text += '՞'; }
                else if (!NO_QM_LANGS.has(code)) { text += '?'; }
            }
            navigator.clipboard.writeText(text).then(() => {
                const toast = document.getElementById('copyToast');
                toast.textContent = t('copiedText');
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                    toast.textContent = t('copied');
                }, 2000);
            });
        });
        row.appendChild(copyBtn);

        // Edit button (appears on hover, desktop only)
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>';
        editBtn.title = t('edit');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            enterEditMode(row, code);
        });
        row.appendChild(editBtn);

        // Mobile action bar (shown on tap)
        const mobileBar = document.createElement('div');
        mobileBar.className = 'mobile-action-bar';
        const mEditBtn = document.createElement('button');
        mEditBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>' + t('edit');
        mEditBtn.addEventListener('click', (e) => { e.stopPropagation(); enterEditMode(row, code); });
        const mCopyBtn = document.createElement('button');
        mCopyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' + t('copyText');
        mCopyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = buildFullText(sentence, code);
            navigator.clipboard.writeText(text).then(() => {
                const toast = document.getElementById('copyToast');
                toast.textContent = t('copiedText');
                toast.classList.add('show');
                setTimeout(() => { toast.classList.remove('show'); toast.textContent = t('copied'); }, 2000);
            });
        });
        mobileBar.appendChild(mEditBtn);
        mobileBar.appendChild(mCopyBtn);
        row.appendChild(mobileBar);

        // Mobile: tap row to show/hide action bar
        row.addEventListener('click', (e) => {
            if (window.innerWidth > 768) return;
            if (e.target.closest('.mobile-action-bar') || e.target.closest('.edit-btn') || e.target.closest('.copy-btn')) return;
            const wasActive = row.classList.contains('show-actions');
            document.querySelectorAll('.lang-row.show-actions').forEach(r => r.classList.remove('show-actions'));
            if (!wasActive) row.classList.add('show-actions');
        });

        rowsContainer.appendChild(row);
    });

    // Show/hide RTL note based on whether any RTL language is active
    const rtlNoteEl = document.getElementById('rtlNote');
    if (rtlNoteEl) {
        const hasRtl = activeLangs.some(c => RTL_LANGS.has(c));
        rtlNoteEl.style.display = hasRtl ? '' : 'none';
        if (hasRtl) {
            document.getElementById('rtlNoteText').textContent = t('rtlNote');
            document.getElementById('rtlToggleLabel').textContent = t('rtlToggle');
            document.getElementById('rtlToggle').checked = rtlNative;
        }
    }

    // Draw lines after layout settles
    scheduleRedrawLines();

    // Update URL to reflect current state
    updateURL();
}

function drawLines(sentence, activeLangs) {
    const svg = document.getElementById('linesSvg');
    const container = document.getElementById('mapContainer');
    const rect = container.getBoundingClientRect();

    // Clear the SVG's previous inline sizing BEFORE reading container.scrollWidth.
    // The SVG is absolutely positioned inside the container with overflow:visible,
    // so its rendered width contributes to container.scrollWidth. Without this reset
    // the measurement is self-reinforcing: once buildExportSVG transiently widens
    // the container (setting svg.style.width to a large pixel value), subsequent
    // scheduleRedrawLines() calls read scrollWidth that still includes the wide
    // SVG, so the SVG stays inflated. On mobile this manifests as a large gray
    // scrollable empty area on the right of the .map-wrapper.
    svg.style.width = '';
    svg.style.height = '';
    svg.removeAttribute('width');
    svg.removeAttribute('height');

    const contentW = container.scrollWidth;
    const contentH = container.scrollHeight;
    svg.setAttribute('width', contentW);
    svg.setAttribute('height', contentH);
    svg.style.width = contentW + 'px';
    svg.style.height = contentH + 'px';
    svg.innerHTML = '';

    // Collect segment positions per language (include both .segment and .segment-input for edit mode)
    const segPositions = {}; // segId -> [{lang, x, y}]
    const allSegments = container.querySelectorAll('.segment, .segment-input');

    allSegments.forEach(el => {
        const segId = el.dataset.seg;
        const elRect = el.getBoundingClientRect();
        const x = elRect.left + elRect.width / 2 - rect.left;
        const y = elRect.top + elRect.height - rect.top + 2;
        const pos = { lang: el.dataset.lang, x, y, top: elRect.top - rect.top - 2 };

        // Register compound segments (e.g. "B|D") under each sub-ID
        const subIds = segId.split('|');
        for (const id of subIds) {
            if (!segPositions[id]) segPositions[id] = [];
            segPositions[id].push(pos);
        }
    });

    // Draw lines between consecutive language pairs
    for (let i = 0; i < activeLangs.length - 1; i++) {
        const langA = activeLangs[i];
        const langB = activeLangs[i + 1];

        Object.keys(segPositions).forEach(segId => {
            const points = segPositions[segId];
            const pA = points.filter(p => p.lang === langA);
            const pB = points.filter(p => p.lang === langB);

            pA.forEach(a => {
                pB.forEach(b => {
                    const color = sentence.segments[segId]?.color || '#999';
                    const line = createCurvedLine(a.x, a.y, b.x, b.top, color);
                    line.dataset.langA = langA;
                    line.dataset.langB = langB;
                    svg.appendChild(line);
                });
            });
        });
    }
}

function createCurvedLine(x1, y1, x2, y2, color) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const midY = (y1 + y2) / 2;
    const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.setAttribute('opacity', '0.6');
    return path;
}

// Export functions
// Cache for embedded font data (keyed by Google Fonts family name)
const _embeddedFonts = {};

async function fetchGoogleFontBase64(familyParam, label) {
    // PNG export rasterizes the SVG via `new Image()`, which loads in an
    // isolated context where the page's @font-face / Google Fonts <link>
    // do NOT apply — so any font referenced by name only falls back to
    // OS LastResort. We sidestep that by fetching the .woff2 ourselves
    // and emitting an inline @font-face data URI in the SVG <defs>.
    if (_embeddedFonts[familyParam]) return _embeddedFonts[familyParam];
    try {
        const cssResp = await fetch('https://fonts.googleapis.com/css2?family=' + familyParam + '&display=swap');
        const cssText = await cssResp.text();
        const urlMatch = cssText.match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!urlMatch) return null;
        const fontResp = await fetch(urlMatch[1]);
        const fontBuf = await fontResp.arrayBuffer();
        const bytes = new Uint8Array(fontBuf);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        const base64 = btoa(binary);
        _embeddedFonts[familyParam] = base64;
        return base64;
    } catch (e) {
        console.warn('Failed to fetch ' + (label || familyParam) + ' font for embedding:', e);
        return null;
    }
}

function fetchHieroFontBase64() {
    return fetchGoogleFontBase64('Noto+Sans+Egyptian+Hieroglyphs', 'hieroglyph');
}
function fetchCuneiformFontBase64() {
    return fetchGoogleFontBase64('Noto+Sans+Cuneiform', 'cuneiform');
}
function fetchTibetanFontBase64() {
    // Single default weight only — the helper's regex grabs the first
    // url(...) and we don't want to deal with multi-weight CSS responses.
    // Browsers synthesize bold from the 400 face when text needs it.
    return fetchGoogleFontBase64('Noto+Serif+Tibetan', 'Tibetan');
}

async function buildExportSVG() {
    const container = document.getElementById('mapContainer');
    const wrapper = container.parentElement; // .map-wrapper

    // Temporarily force desktop layout for export (remove mobile constraints).
    // On mobile, the container is shrunk to viewport width with min-width:0,
    // so even with .export-mode font-size overrides the captured positions
    // would still reflect a cramped layout. Add a temporary inline min-width
    // override AND wait for a full layout/paint cycle so getBoundingClientRect
    // reads the post-reflow positions.
    container.classList.add('export-mode');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let mobileWidthOverride = null;
    if (isMobile) {
        // Compute the natural width the desktop layout would want for the
        // current visible content, then force it via min-width so segments
        // don't wrap and labels render at full size.
        const langRows = document.getElementById('langRows');
        // 280px label column + ~80px per segment × max segments + 80px padding
        const maxSegs = langRows ? Math.max(
            ...Array.from(langRows.querySelectorAll('.lang-row'))
                .map(r => r.querySelectorAll('.segment').length || 1)
        ) : 5;
        const designWidth = 280 + maxSegs * 110 + 80;
        mobileWidthOverride = container.style.minWidth;
        container.style.minWidth = designWidth + 'px';
    }

    let svgContent;
    try {
    // Force a synchronous reflow + one async layout/paint tick so any
    // pending font / layout work settles before we read positions.
    // eslint-disable-next-line no-unused-expressions
    container.offsetHeight;
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    // CRITICAL: redraw the connector lines NOW so their <path d="..."> values
    // reflect the new (export-mode) segment positions. Without this, the
    // SVG copies the lines from before the layout switch — text ends up at
    // the new positions while lines still point at the old (mobile-narrow)
    // ones, producing the disconnected-lines artefact reported by the user.
    const _sentence = SENTENCES[currentSentenceIdx];
    if (_sentence) {
        const _rows = document.getElementById('langRows').querySelectorAll('.lang-row');
        drawLines(_sentence, Array.from(_rows).map(r => r.dataset.lang));
    }

    const containerRect = container.getBoundingClientRect();
    const langRows = document.getElementById('langRows');
    // Derive width AND height from the actual rendered content (labels + segments),
    // not container.scrollWidth/scrollHeight — the export-mode min-width override can
    // make the container wider than its content, which would leave a large empty
    // strip on the right of the exported image (user-reported "横幅が広すぎる").
    const padding = 30; // matches CSS padding; used as the right/bottom margin
    let contentRight = 0;
    let contentBottom = 0;
    let contentLeft = Infinity;
    const measureEls = container.querySelectorAll('.lang-label, .segment, .segment-dual, .hist-badge, .exp-badge');
    measureEls.forEach(el => {
        const r = el.getBoundingClientRect();
        const left = r.left - containerRect.left;
        const right = r.right - containerRect.left;
        const bottom = r.bottom - containerRect.top;
        if (right > contentRight) contentRight = right;
        if (bottom > contentBottom) contentBottom = bottom;
        if (left < contentLeft) contentLeft = left;
    });
    if (!isFinite(contentLeft)) contentLeft = padding;
    // Mirror the left margin on the right so the image has symmetric horizontal padding
    // (user request: "一番広い言語の幅で左右同じマージンになるように").
    const leftMargin = Math.max(contentLeft, 12);
    const w = Math.ceil(contentRight + leftMargin);
    // For height, also use the deepest rendered element (covers connector curves
    // that extend below the last row's text baseline) plus matching bottom padding.
    let h;
    if (langRows && measureEls.length) {
        h = Math.ceil(contentBottom + padding);
    } else if (langRows) {
        h = langRows.offsetHeight + padding * 2;
    } else {
        h = container.scrollHeight;
    }

    // Embed any rare-script fonts referenced by the rendered text.
    // Without this, PNG export (SVG → <img> → canvas) renders these
    // codepoints via OS LastResort because the SVG-as-image context
    // can't see the page's Google Fonts <link>.
    const hasDualScript = container.querySelector('.segment-dual') !== null;
    const containerText = container.textContent || '';
    const hasHieroChars = /[\u{13000}-\u{1342F}]/u.test(containerText);
    const hasCuneiformChars = /[\u{12000}-\u{123FF}]/u.test(containerText);
    const hasTibetan = /[ༀ-࿿]/.test(containerText);
    let fontFaces = '';
    if (hasDualScript && hasHieroChars) {
        const fontBase64 = await fetchHieroFontBase64();
        if (fontBase64) {
            fontFaces += `@font-face { font-family: 'Noto Sans Egyptian Hieroglyphs'; src: url(data:font/woff2;base64,${fontBase64}) format('woff2'); }`;
        }
    }
    if (hasDualScript && hasCuneiformChars) {
        const fontBase64 = await fetchCuneiformFontBase64();
        if (fontBase64) {
            fontFaces += `@font-face { font-family: 'Noto Sans Cuneiform'; src: url(data:font/woff2;base64,${fontBase64}) format('woff2'); }`;
        }
    }
    if (hasTibetan) {
        const fontBase64 = await fetchTibetanFontBase64();
        if (fontBase64) {
            fontFaces += `@font-face { font-family: 'Noto Serif Tibetan'; src: url(data:font/woff2;base64,${fontBase64}) format('woff2'); }`;
        }
    }
    const fontStyle = fontFaces ? `<defs><style>${fontFaces}</style></defs>` : '';

    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`;
    svgContent += fontStyle;
    svgContent += `<rect width="${w}" height="${h}" fill="white"/>`;

    // Copy the SVG lines
    const linesSvg = document.getElementById('linesSvg');
    if (linesSvg) {
        linesSvg.querySelectorAll('path').forEach(path => {
            svgContent += `<path d="${path.getAttribute('d')}" stroke="${path.getAttribute('stroke')}" stroke-width="${path.getAttribute('stroke-width')}" fill="none" opacity="${path.getAttribute('opacity')}"/>`;
        });
    }

    // Helper to get computed styles for SVG text rendering
    function getSvgTextAttrs(el) {
        const cs = getComputedStyle(el);
        const fontSize = cs.fontSize; // e.g. "16px"
        const fontWeight = cs.fontWeight;
        const fontFamily = cs.fontFamily;
        return { fontSize, fontWeight, fontFamily: escapeXml(fontFamily) };
    }

    // Render text elements
    const rows = container.querySelectorAll('.lang-row');
    rows.forEach(row => {
        const label = row.querySelector('.lang-label');
        if (label) {
            const badge = label.querySelector('.hist-badge') || label.querySelector('.exp-badge');
            // Render the lang name text (excluding badge)
            const nameOnly = badge ? label.textContent.replace(badge.textContent, '').trim() : label.textContent;
            const r = label.getBoundingClientRect();
            const x = r.left - containerRect.left;
            const y = r.top - containerRect.top + r.height * 0.75;
            const a = getSvgTextAttrs(label);
            svgContent += `<text x="${x}" y="${y}" font-family="${a.fontFamily}" font-size="${a.fontSize}" font-weight="${a.fontWeight}" fill="#333">${escapeXml(nameOnly)}</text>`;
            // Render badge as a bordered rounded rect + gray text (matching .lang-label style)
            if (badge) {
                const br = badge.getBoundingClientRect();
                const bx = br.left - containerRect.left;
                const by = br.top - containerRect.top;
                svgContent += `<rect x="${bx}" y="${by}" width="${br.width}" height="${br.height}" rx="3" fill="none" stroke="#ccc" stroke-width="1"/>`;
                svgContent += `<text x="${bx + br.width/2}" y="${by + br.height * 0.75}" font-family="sans-serif" font-size="9" font-weight="700" fill="#999" text-anchor="middle">${escapeXml(badge.textContent)}</text>`;
            }
        }
        row.querySelectorAll('.segment').forEach(seg => {
            let color = seg.style.color;
            // Compound segments (e.g. "B|D") use background-clip:text in the
            // DOM, which makes seg.style.color 'transparent'. For export, emit
            // a linearGradient def and fill the text with it so the text is
            // visible and keeps the multi-colour effect.
            if (seg.classList.contains('segment-compound')) {
                const segId = seg.dataset.seg || '';
                const subIds = segId.split('|');
                const curSentence = SENTENCES[currentSentenceIdx];
                const colors = subIds.map(id => curSentence.segments[id]?.color || '#666');
                const gradId = `grad-${row.dataset.lang || ''}-${segId.replace(/\|/g,'_')}-${Math.floor(Math.random()*1e6)}`;
                const stops = colors.map((c, i) => `<stop offset="${(i/(colors.length-1))*100}%" stop-color="${c}"/>`).join('');
                svgContent += `<defs><linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">${stops}</linearGradient></defs>`;
                color = `url(#${gradId})`;
            }
            if (seg.classList.contains('segment-dual')) {
                // Render each hiero-pair: hieroglyph above, transliteration below
                seg.querySelectorAll('.hiero-pair').forEach(pair => {
                    const hieroEl = pair.querySelector('.segment-hiero');
                    const translitEl = pair.querySelector('.segment-translit');
                    if (hieroEl) {
                        const r = hieroEl.getBoundingClientRect();
                        const x = r.left - containerRect.left;
                        const y = r.top - containerRect.top + r.height * 0.75;
                        const a = getSvgTextAttrs(hieroEl);
                        svgContent += `<text x="${x}" y="${y}" font-family="${a.fontFamily}" font-size="${a.fontSize}" font-weight="${a.fontWeight}" fill="${color}">${escapeXml(hieroEl.textContent)}</text>`;
                    }
                    if (translitEl) {
                        const r = translitEl.getBoundingClientRect();
                        const x = r.left - containerRect.left;
                        const y = r.top - containerRect.top + r.height * 0.75;
                        const a = getSvgTextAttrs(translitEl);
                        svgContent += `<text x="${x}" y="${y}" font-family="${a.fontFamily}" font-size="${a.fontSize}" font-weight="${a.fontWeight}" fill="${color}" opacity="0.65">${escapeXml(translitEl.textContent)}</text>`;
                    }
                });
            } else {
                const r = seg.getBoundingClientRect();
                const x = r.left - containerRect.left;
                const y = r.top - containerRect.top + r.height * 0.75;
                const a = getSvgTextAttrs(seg);
                svgContent += `<text x="${x}" y="${y}" font-family="${a.fontFamily}" font-size="${a.fontSize}" font-weight="${a.fontWeight}" fill="${color}">${escapeXml(seg.textContent)}</text>`;
            }
        });
    });

    // Watermark: site URL in the bottom-right corner
    const watermark = 'https://langmap.heuron.com';
    svgContent += `<text x="${w - 12}" y="${h - 12}" font-family="sans-serif" font-size="12" font-weight="500" fill="#999" text-anchor="end">${watermark}</text>`;

    svgContent += `</svg>`;
    // Expose dimensions on the function (read by downloadAsPNG) so the
    // PNG canvas matches the SVG even after cleanup restores the (narrower)
    // mobile container width.
    buildExportSVG.lastWidth = w;
    buildExportSVG.lastHeight = h;
    } finally {
        // Restore mobile layout — runs even if an error is thrown above, so
        // a transient inline min-width never leaks past export.
        container.classList.remove('export-mode');
        if (mobileWidthOverride !== null) {
            container.style.minWidth = mobileWidthOverride;
        }
        // Reset the wrapper's horizontal scroll: after the container shrinks
        // back, scrollLeft may sit past the (new, narrower) content's right
        // edge — Chrome doesn't always clamp it, which leaves a visible gray
        // strip in .map-wrapper. Snap back to 0 so the user sees the start.
        if (wrapper) wrapper.scrollLeft = 0;
        // The live #linesSvg currently holds export-mode coordinates from our
        // redraw above (and its inline width matches the wide layout). Schedule
        // another redraw against the restored mobile layout — drawLines now
        // zeroes the SVG's inline sizing first, so the measurement is clean.
        scheduleRedrawLines();
    }

    return svgContent;
}

function escapeXml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function downloadAsPNG() {
    const svgData = await buildExportSVG();
    // Use the dimensions captured by buildExportSVG (during export-mode), NOT
    // the post-cleanup container.scrollWidth — by the time we read them here
    // the container has shrunk back to mobile width, so the canvas would be
    // too small and the SVG image would render with its right portion cropped.
    const scale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = (buildExportSVG.lastWidth || 0) * scale;
    canvas.height = (buildExportSVG.lastHeight || 0) * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    const img = new Image();
    img.onload = () => {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = 'langmap-s' + currentSentenceIdx + '-' + fileTimestamp() + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
    img.onerror = () => {
        // Fallback: use html2canvas if available, or alert
        alert('PNG export failed. Please use SVG export instead.');
    };
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    img.src = URL.createObjectURL(blob);
}

async function downloadAsSVG() {
    const svgData = await buildExportSVG();
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = 'langmap-s' + currentSentenceIdx + '-' + fileTimestamp() + '.svg';
    link.href = URL.createObjectURL(blob);
    link.click();
}

// CSV export
function initCSVLangSelect() {
    const sel = document.getElementById('csvLangSelect');
    if (!sel) return;
    sel.innerHTML = '';
    let currentGroup = '';
    let optgroup = null;
    LANGUAGES.forEach(lang => {
        if (lang.group !== currentGroup) {
            currentGroup = lang.group;
            optgroup = document.createElement('optgroup');
            optgroup.label = groupLabel(currentGroup);
            sel.appendChild(optgroup);
        }
        const opt = document.createElement('option');
        opt.value = lang.code;
        opt.textContent = langName(lang.code);
        (optgroup || sel).appendChild(opt);
    });
}

function downloadAsCSV() {
    const sel = document.getElementById('csvLangSelect');
    if (!sel) return;
    const langCode = sel.value;
    const rows = [];
    // Check if this language uses transliteration (| separator)
    const hasTranslit = SENTENCES.some(s => s.langs[langCode]?.some(([, t]) => t.includes('|')));
    // Find max segment count
    let maxSegs = 0;
    SENTENCES.forEach(s => {
        const langData = s.langs[langCode];
        if (langData && langData.length > maxSegs) maxSegs = langData.length;
    });
    // Header: No., English, FullText, then (SegID, SegText, SegTranslit) × maxSegs
    const header = ['No.', 'English', 'FullText'];
    for (let i = 0; i < maxSegs; i++) {
        header.push('Seg' + (i + 1) + '_ID');
        header.push('Seg' + (i + 1) + '_Text');
        if (hasTranslit) header.push('Seg' + (i + 1) + '_Translit');
    }
    rows.push(header);
    // Data rows
    SENTENCES.forEach((s, idx) => {
        const langData = s.langs[langCode];
        if (!langData) return;
        // Build full text
        const fullText = buildFullText(langData, langCode);
        const enText = s.langs.en ? buildFullText(s.langs.en, 'en') : (s.title || '');
        const row = [idx + 1, csvQuote(enText), csvQuote(fullText)];
        langData.forEach(([segId, segText]) => {
            row.push(segId);
            if (segText.includes('|')) {
                const [text, translit] = segText.split('|');
                row.push(csvQuote(text));
                if (hasTranslit) row.push(csvQuote(translit));
            } else {
                row.push(csvQuote(segText));
                if (hasTranslit) row.push('');
            }
        });
        // Pad remaining columns
        const colsPerSeg = hasTranslit ? 3 : 2;
        for (let i = langData.length; i < maxSegs; i++) {
            for (let j = 0; j < colsPerSeg; j++) row.push('');
        }
        rows.push(row);
    });
    const csv = rows.map(r => r.join(',')).join('\n');
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    const now = new Date();
    const dateStr = now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0');
    link.download = 'langmap-' + langCode + '-' + fileTimestamp() + '.csv';
    link.href = URL.createObjectURL(blob);
    link.click();
}
function csvQuote(s) { return '"' + (s || '').replace(/"/g, '""') + '"'; }
function fileTimestamp() {
    const n = new Date();
    return n.getFullYear() + String(n.getMonth()+1).padStart(2,'0') + String(n.getDate()).padStart(2,'0')
         + String(n.getHours()).padStart(2,'0') + String(n.getMinutes()).padStart(2,'0') + String(n.getSeconds()).padStart(2,'0');
}

function downloadViewAsCSV() {
    const sentence = SENTENCES[currentSentenceIdx];
    if (!sentence) return;
    // Collect displayed languages
    const container = document.getElementById('langRows');
    const displayedLangs = [];
    container.querySelectorAll('.lang-row').forEach(row => {
        const code = row.dataset.lang;
        if (code && sentence.langs[code]) displayedLangs.push(code);
    });
    if (!displayedLangs.length) return;
    // Check if any displayed language uses transliteration
    const hasTranslit = displayedLangs.some(code =>
        sentence.langs[code].some(([, t]) => t.includes('|'))
    );
    // Find max segment count across displayed languages
    let maxSegs = 0;
    displayedLangs.forEach(code => {
        const len = sentence.langs[code].length;
        if (len > maxSegs) maxSegs = len;
    });
    const rows = [];
    // Header
    const header = ['Lang', 'FullText'];
    for (let i = 0; i < maxSegs; i++) {
        header.push('Seg' + (i + 1) + '_ID');
        header.push('Seg' + (i + 1) + '_Text');
        if (hasTranslit) header.push('Seg' + (i + 1) + '_Translit');
    }
    rows.push(header.join(','));
    // Data rows
    displayedLangs.forEach(code => {
        const langData = sentence.langs[code];
        const fullText = buildFullText(langData, code);
        const row = [csvQuote(langName(code)), csvQuote(fullText)];
        langData.forEach(([segId, segText]) => {
            row.push(segId);
            if (segText.includes('|')) {
                const [text, translit] = segText.split('|');
                row.push(csvQuote(text));
                if (hasTranslit) row.push(csvQuote(translit));
            } else {
                row.push(csvQuote(segText));
                if (hasTranslit) row.push('');
            }
        });
        const colsPerSeg = hasTranslit ? 3 : 2;
        for (let i = langData.length; i < maxSegs; i++) {
            for (let j = 0; j < colsPerSeg; j++) row.push('');
        }
        rows.push(row.join(','));
    });
    const csv = rows.join('\n');
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    const now = new Date();
    const dateStr = now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0');
    link.download = 'langmap-s' + currentSentenceIdx + '-' + fileTimestamp() + '.csv';
    link.href = URL.createObjectURL(blob);
    link.click();
}

// Share functions
function getShareURL() {
    return location.href;
}

function getShareText() {
    const sentence = SENTENCES[currentSentenceIdx];
    return sentence ? `LangMap: ${sentence.title}` : 'LangMap - 多言語語順マップ';
}

function copyShareURL() {
    navigator.clipboard.writeText(getShareURL()).then(() => {
        const toast = document.getElementById('copyToast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    });
}

function shareToX() {
    const url = encodeURIComponent(getShareURL());
    const text = encodeURIComponent(getShareText());
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=550,height=420');
}

function shareToFacebook() {
    const url = encodeURIComponent(getShareURL());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=550,height=420');
}

function shareToLINE() {
    const url = encodeURIComponent(getShareURL());
    const text = encodeURIComponent(getShareText());
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, '_blank', 'width=550,height=420');
}

// --- Inline editing ---
let editingRow = null; // { lang, sentenceIdx }
let segDragWrapper = null; // currently dragged segment wrapper

function enterEditMode(row, langCode) {
    if (editingRow) return;
    editingRow = { lang: langCode, sentenceIdx: currentSentenceIdx };

    // Add overlay
    const overlay = document.createElement('div');
    overlay.className = 'edit-overlay';
    overlay.id = 'editOverlay';
    overlay.addEventListener('click', () => cancelEdit(row, langCode));
    document.body.appendChild(overlay);

    // Move row to body so it sits above the overlay
    row.remove();
    row.classList.add('editing');
    row.draggable = false;
    document.body.appendChild(row);

    // Hide edit button if present (PC .edit-btn was removed; mobile
    // .mobile-action-bar buttons hide via CSS when row is .editing).
    const editBtn = row.querySelector('.edit-btn');
    if (editBtn) editBtn.style.display = 'none';

    const saveBar = document.createElement('div');
    saveBar.className = 'save-bar';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-sm btn-accent save-btn';
    saveBtn.textContent = t('save');
    saveBtn.addEventListener('click', () => saveEdit(row, langCode));

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-sm cancel-btn';
    cancelBtn.textContent = t('cancel');
    cancelBtn.addEventListener('click', () => cancelEdit(row, langCode));

    saveBar.appendChild(saveBtn);
    saveBar.appendChild(cancelBtn);
    row.appendChild(saveBar);

    // Transform segments into draggable input wrappers
    const textDiv = row.querySelector('.lang-text');
    const segments = textDiv.querySelectorAll('.segment');
    const spaces = textDiv.querySelectorAll('.segment-space');
    spaces.forEach(sp => sp.remove());

    segments.forEach(seg => {
        const wrapper = createSegmentWrapper(seg, langCode);
        seg.replaceWith(wrapper);
    });

    // Set up drag container on textDiv for segment reordering
    setupSegmentDragContainer(textDiv);

    // Add "+" button for adding new segments
    const sentence = SENTENCES[currentSentenceIdx];
    const addBtn = document.createElement('button');
    addBtn.className = 'add-segment-btn';
    addBtn.type = 'button';
    addBtn.textContent = '+';
    addBtn.title = t('addSegment') || 'Add segment';
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showAddSegmentMenu(addBtn, textDiv, langCode, sentence);
    });
    textDiv.appendChild(addBtn);

    // Redraw lines so they stay connected with the input elements
    scheduleRedrawLines();
}

function createSegmentWrapper(seg, langCode) {
    const sentence = SENTENCES[currentSentenceIdx];
    const wrapper = document.createElement('span');
    wrapper.className = 'segment-input-wrapper';
    wrapper.draggable = false;

    const handle = document.createElement('span');
    handle.className = 'drag-handle';
    handle.textContent = '⠿';
    handle.draggable = true;

    const rawText = seg.dataset.rawText || seg.textContent;
    const hasDualText = rawText.includes('|');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'segment-input';
    input.draggable = false;
    input.value = hasDualText ? rawText.split('|')[0] : rawText;
    input.dataset.seg = seg.dataset.seg;
    input.dataset.lang = seg.dataset.lang || langCode;
    input.placeholder = hasDualText ? 'Text' : '';
    let translitInput = null;
    if (hasDualText) {
        translitInput = document.createElement('input');
        translitInput.type = 'text';
        translitInput.className = 'segment-input segment-input-translit';
        translitInput.draggable = false;
        translitInput.value = rawText.split('|')[1] || '';
        translitInput.dataset.seg = seg.dataset.seg;
        translitInput.dataset.lang = seg.dataset.lang || langCode;
        translitInput.placeholder = 'Transliteration';
        translitInput.style.fontSize = '11px';
    }
    // Handle compound segments (e.g. "B|D")
    const segSubIds = seg.dataset.seg.split('|');
    const isCompound = segSubIds.length > 1;
    let segColor;
    if (isCompound) {
        const colors = segSubIds.map(id => sentence.segments[id]?.color || '#666');
        segColor = colors[0]; // use first color for border
        input.style.backgroundImage = `linear-gradient(90deg, ${colors.join(', ')})`;
        input.style.webkitBackgroundClip = 'text';
        input.style.backgroundClip = 'text';
        input.style.color = 'transparent';
        input.style.borderColor = segColor;
    } else {
        segColor = seg.style.color || sentence.segments[seg.dataset.seg]?.color || '#666';
        input.style.color = segColor;
        input.style.borderColor = segColor;
    }
    // Auto-size: use character count as initial estimate, then refine after render
    const charWidth = seg.textContent.length * 14 + 24;
    input.style.width = Math.max(charWidth, 50) + 'px';
    requestAnimationFrame(() => {
        input.style.width = Math.max(input.scrollWidth + 16, 50) + 'px';
    });
    input.addEventListener('input', () => {
        input.style.width = '0';
        input.style.width = Math.max(input.scrollWidth + 16, 50) + 'px';
    });

    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'seg-delete-btn';
    deleteBtn.textContent = '\u00d7';
    deleteBtn.title = t('deleteSegment') || 'Delete';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.remove();
        scheduleRedrawLines();
    });

    // Segment ID badge (clickable to change segment type)
    const badge = document.createElement('span');
    badge.className = 'seg-id-badge';
    badge.textContent = seg.dataset.seg;
    badge.title = 'Change segment type';
    if (isCompound) {
        const colors = segSubIds.map(id => sentence.segments[id]?.color || '#666');
        badge.style.background = `linear-gradient(90deg, ${colors.join(', ')})`;
    } else {
        badge.style.background = segColor;
    }
    badge.addEventListener('click', (e) => {
        e.stopPropagation();
        showChangeSegMenu(badge, wrapper, input, sentence);
    });

    // Move buttons (for mobile — hidden on desktop via CSS)
    const moveBtns = document.createElement('span');
    moveBtns.className = 'seg-move-btns';
    const moveLeft = document.createElement('button');
    moveLeft.type = 'button';
    moveLeft.className = 'seg-move-btn';
    moveLeft.textContent = '◀';
    moveLeft.addEventListener('click', (e) => {
        e.stopPropagation();
        const prev = wrapper.previousElementSibling;
        if (prev && prev.classList.contains('segment-input-wrapper')) {
            wrapper.parentNode.insertBefore(wrapper, prev);
            scheduleRedrawLines();
        }
    });
    const moveRight = document.createElement('button');
    moveRight.type = 'button';
    moveRight.className = 'seg-move-btn';
    moveRight.textContent = '▶';
    moveRight.addEventListener('click', (e) => {
        e.stopPropagation();
        const next = wrapper.nextElementSibling;
        if (next && next.classList.contains('segment-input-wrapper')) {
            wrapper.parentNode.insertBefore(next, wrapper);
            scheduleRedrawLines();
        }
    });
    moveBtns.appendChild(moveLeft);
    moveBtns.appendChild(moveRight);

    wrapper.appendChild(moveBtns);
    wrapper.appendChild(handle);
    wrapper.appendChild(badge);
    if (hasDualText) {
        const dualContainer = document.createElement('span');
        dualContainer.className = 'segment-dual-inputs';
        dualContainer.style.display = 'inline-flex';
        dualContainer.style.flexDirection = 'column';
        dualContainer.style.gap = '2px';
        dualContainer.style.verticalAlign = 'middle';
        dualContainer.appendChild(input);
        dualContainer.appendChild(translitInput);
        wrapper.appendChild(dualContainer);
        wrapper.dataset.dual = '1';
        // Auto-size translitInput
        const translitCharWidth = translitInput.value.length * 8 + 24;
        translitInput.style.width = Math.max(translitCharWidth, 50) + 'px';
        requestAnimationFrame(() => {
            translitInput.style.width = Math.max(translitInput.scrollWidth + 16, 50) + 'px';
        });
        translitInput.addEventListener('input', () => {
            translitInput.style.width = '0';
            translitInput.style.width = Math.max(translitInput.scrollWidth + 16, 50) + 'px';
        });
    } else {
        wrapper.appendChild(input);
    }
    wrapper.appendChild(deleteBtn);

    // Touch reorder support
    setupTouchReorder(handle, wrapper);

    // Only the handle initiates drag (not the input)
    handle.addEventListener('dragstart', (e) => {
        e.stopPropagation();
        segDragWrapper = wrapper;
        wrapper.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', 'seg');
    });

    handle.addEventListener('dragend', () => {
        wrapper.classList.remove('dragging');
        segDragWrapper = null;
        clearSegDropIndicators();
    });

    return wrapper;
}

function clearSegDropIndicators() {
    document.querySelectorAll('.segment-input-wrapper').forEach(w => {
        w.classList.remove('drag-over-left', 'drag-over-right');
    });
}

function setupSegmentDragContainer(textDiv) {
    textDiv.addEventListener('dragover', (e) => {
        if (!segDragWrapper) return;
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';

        clearSegDropIndicators();
        const target = findClosestWrapper(e.target);
        if (!target || target === segDragWrapper) return;
        const rect = target.getBoundingClientRect();
        const midX = rect.left + rect.width / 2;
        target.classList.add(e.clientX < midX ? 'drag-over-left' : 'drag-over-right');
    });

    textDiv.addEventListener('dragleave', (e) => {
        if (!segDragWrapper) return;
        // Only clear if leaving the textDiv entirely
        if (!textDiv.contains(e.relatedTarget)) {
            clearSegDropIndicators();
        }
    });

    textDiv.addEventListener('drop', (e) => {
        if (!segDragWrapper) return;
        e.preventDefault();
        e.stopPropagation();
        clearSegDropIndicators();

        const target = findClosestWrapper(e.target);
        if (!target || target === segDragWrapper) return;

        const rect = target.getBoundingClientRect();
        const midX = rect.left + rect.width / 2;
        if (e.clientX < midX) {
            textDiv.insertBefore(segDragWrapper, target);
        } else {
            textDiv.insertBefore(segDragWrapper, target.nextSibling);
        }
        scheduleRedrawLines();
    });
}

function findClosestWrapper(el) {
    while (el && !el.classList?.contains('segment-input-wrapper')) {
        el = el.parentElement;
    }
    return el;
}

// Default palette for new segments
const SEGMENT_COLORS = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
    '#1abc9c', '#e67e22', '#34495e', '#e91e63', '#00bcd4',
    '#8bc34a', '#ff5722', '#607d8b', '#795548', '#673ab7'
];

function nextSegmentId(sentence) {
    const existing = Object.keys(sentence.segments);
    // Find next unused letter: A, B, C, ... Z, AA, AB, ...
    for (let i = 0; ; i++) {
        const id = i < 26 ? String.fromCharCode(65 + i) : 'A' + String.fromCharCode(65 + i - 26);
        if (!existing.includes(id)) return id;
    }
}

function nextSegmentColor(sentence) {
    const usedColors = new Set(Object.values(sentence.segments).map(s => s.color));
    return SEGMENT_COLORS.find(c => !usedColors.has(c)) || SEGMENT_COLORS[Object.keys(sentence.segments).length % SEGMENT_COLORS.length];
}

function showAddSegmentMenu(anchorBtn, textDiv, langCode, sentence) {
    // Remove existing menu
    const existing = document.querySelector('.add-segment-menu');
    if (existing) { existing.remove(); return; }

    const allSegs = Object.keys(sentence.segments);

    const menu = document.createElement('div');
    menu.className = 'add-segment-menu';

    // Existing segment IDs
    allSegs.forEach(segId => {
        const item = document.createElement('div');
        item.className = 'add-segment-menu-item';
        const dot = document.createElement('span');
        dot.className = 'seg-dot';
        dot.style.background = sentence.segments[segId].color;
        item.appendChild(dot);
        const label = document.createElement('span');
        label.textContent = segId;
        item.appendChild(label);
        item.addEventListener('click', () => {
            menu.remove();
            addNewSegment(textDiv, langCode, segId, sentence);
        });
        menu.appendChild(item);
    });

    // Compound segment options (e.g. "A|B", "B|C", etc.)
    if (allSegs.length >= 2) {
        const compSep = document.createElement('div');
        compSep.style.cssText = 'border-top:1px solid #e0e0e0; margin:4px 0;';
        menu.appendChild(compSep);
        for (let a = 0; a < allSegs.length; a++) {
            for (let b = a + 1; b < allSegs.length; b++) {
                const compId = allSegs[a] + '|' + allSegs[b];
                const item = document.createElement('div');
                item.className = 'add-segment-menu-item';
                const dot = document.createElement('span');
                dot.className = 'seg-dot';
                const c1 = sentence.segments[allSegs[a]].color;
                const c2 = sentence.segments[allSegs[b]].color;
                dot.style.background = `linear-gradient(90deg, ${c1}, ${c2})`;
                item.appendChild(dot);
                const label = document.createElement('span');
                label.textContent = compId;
                item.appendChild(label);
                item.addEventListener('click', () => {
                    menu.remove();
                    addNewSegment(textDiv, langCode, compId, sentence);
                });
                menu.appendChild(item);
            }
        }
    }

    // Separator
    const sep = document.createElement('div');
    sep.style.cssText = 'border-top:1px solid #e0e0e0; margin:4px 0;';
    menu.appendChild(sep);

    // "New segment" option
    const newItem = document.createElement('div');
    newItem.className = 'add-segment-menu-item';
    const newDot = document.createElement('span');
    newDot.className = 'seg-dot';
    newDot.style.background = nextSegmentColor(sentence);
    newItem.appendChild(newDot);
    const newLabel = document.createElement('span');
    newLabel.textContent = '+ ' + (nextSegmentId(sentence));
    newLabel.style.fontWeight = '600';
    newItem.appendChild(newLabel);
    newItem.addEventListener('click', () => {
        menu.remove();
        const newId = nextSegmentId(sentence);
        const newColor = nextSegmentColor(sentence);
        // Register the new segment in the sentence data
        sentence.segments[newId] = { color: newColor };
        addNewSegment(textDiv, langCode, newId, sentence);
    });
    menu.appendChild(newItem);

    // Position below the button
    const rect = anchorBtn.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.left = rect.left + 'px';
    menu.style.top = rect.bottom + 4 + 'px';
    document.body.appendChild(menu);

    // Close on outside click
    const closeHandler = (e) => {
        if (!menu.contains(e.target) && e.target !== anchorBtn) {
            menu.remove();
            document.removeEventListener('click', closeHandler, true);
        }
    };
    setTimeout(() => document.addEventListener('click', closeHandler, true), 0);
}

function addNewSegment(textDiv, langCode, segId, sentence) {
    // Create a fake segment element to pass to createSegmentWrapper
    const seg = document.createElement('span');
    seg.className = 'segment';
    seg.dataset.seg = segId;
    seg.dataset.lang = langCode;
    const subIds = segId.split('|');
    if (subIds.length > 1) {
        const colors = subIds.map(id => sentence.segments[id]?.color || '#666');
        seg.style.backgroundImage = `linear-gradient(90deg, ${colors.join(', ')})`;
        seg.style.webkitBackgroundClip = 'text';
        seg.style.backgroundClip = 'text';
        seg.style.color = 'transparent';
    } else {
        seg.style.color = sentence.segments[segId]?.color || '#666';
    }
    seg.textContent = '';
    seg.offsetWidth = 0; // will default to min-width

    const wrapper = createSegmentWrapper(seg, langCode);
    // Insert before the "+" button
    const addBtn = textDiv.querySelector('.add-segment-btn');
    textDiv.insertBefore(wrapper, addBtn);

    // Focus the new input
    const input = wrapper.querySelector('.segment-input');
    input.style.width = '40px';
    input.focus();

    scheduleRedrawLines();
}

function showChangeSegMenu(badge, wrapper, input, sentence) {
    const existing = document.querySelector('.add-segment-menu');
    if (existing) { existing.remove(); return; }

    const currentSeg = input.dataset.seg;
    const allSegs = Object.keys(sentence.segments);
    const menu = document.createElement('div');
    menu.className = 'add-segment-menu';

    allSegs.forEach(segId => {
        const item = document.createElement('div');
        item.className = 'add-segment-menu-item' + (segId === currentSeg ? ' active' : '');
        const dot = document.createElement('span');
        dot.className = 'seg-dot';
        dot.style.background = sentence.segments[segId].color;
        item.appendChild(dot);
        const label = document.createElement('span');
        label.textContent = segId;
        item.appendChild(label);
        item.addEventListener('click', () => {
            menu.remove();
            applySegChange(badge, input, segId, sentence);
        });
        menu.appendChild(item);
    });

    // Compound options
    if (allSegs.length >= 2) {
        const sep = document.createElement('div');
        sep.style.cssText = 'border-top:1px solid #e0e0e0; margin:4px 0;';
        menu.appendChild(sep);
        for (let a = 0; a < allSegs.length; a++) {
            for (let b = a + 1; b < allSegs.length; b++) {
                const compId = allSegs[a] + '|' + allSegs[b];
                const item = document.createElement('div');
                item.className = 'add-segment-menu-item' + (compId === currentSeg ? ' active' : '');
                const dot = document.createElement('span');
                dot.className = 'seg-dot';
                dot.style.background = `linear-gradient(90deg, ${sentence.segments[allSegs[a]].color}, ${sentence.segments[allSegs[b]].color})`;
                item.appendChild(dot);
                const label = document.createElement('span');
                label.textContent = compId;
                item.appendChild(label);
                item.addEventListener('click', () => {
                    menu.remove();
                    applySegChange(badge, input, compId, sentence);
                });
                menu.appendChild(item);
            }
        }
    }

    const rect = badge.getBoundingClientRect();
    menu.style.position = 'fixed';
    menu.style.left = Math.min(rect.left, window.innerWidth - 120) + 'px';
    menu.style.top = rect.bottom + 4 + 'px';
    menu.style.zIndex = '200';
    document.body.appendChild(menu);

    const closeHandler = (e) => {
        if (!menu.contains(e.target) && e.target !== badge) {
            menu.remove();
            document.removeEventListener('click', closeHandler, true);
        }
    };
    setTimeout(() => document.addEventListener('click', closeHandler, true), 0);
}

function applySegChange(badge, input, newSegId, sentence) {
    input.dataset.seg = newSegId;
    badge.textContent = newSegId;
    const subIds = newSegId.split('|');
    if (subIds.length > 1) {
        const colors = subIds.map(id => sentence.segments[id]?.color || '#666');
        badge.style.background = `linear-gradient(90deg, ${colors.join(', ')})`;
        input.style.backgroundImage = `linear-gradient(90deg, ${colors.join(', ')})`;
        input.style.webkitBackgroundClip = 'text';
        input.style.backgroundClip = 'text';
        input.style.color = 'transparent';
        input.style.borderColor = colors[0];
    } else {
        const color = sentence.segments[newSegId]?.color || '#666';
        badge.style.background = color;
        input.style.backgroundImage = '';
        input.style.webkitBackgroundClip = '';
        input.style.backgroundClip = '';
        input.style.color = color;
        input.style.borderColor = color;
    }
    scheduleRedrawLines();
}

// Touch reorder for mobile
function setupTouchReorder(handle, wrapper) {
    let touchStartY = 0;
    let touchStartX = 0;
    let placeholder = null;
    let isDragging = false;

    handle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        isDragging = true;

        placeholder = document.createElement('span');
        placeholder.className = 'segment-input-wrapper touch-placeholder';
        placeholder.style.width = wrapper.offsetWidth + 'px';
        placeholder.style.height = wrapper.offsetHeight + 'px';

        wrapper.parentElement.insertBefore(placeholder, wrapper);
        wrapper.classList.add('touch-dragging');
        wrapper.style.position = 'fixed';
        wrapper.style.zIndex = '300';
        wrapper.style.width = wrapper.offsetWidth + 'px';
        wrapper.style.left = (touch.clientX - wrapper.offsetWidth / 2) + 'px';
        wrapper.style.top = (touch.clientY - wrapper.offsetHeight / 2) + 'px';
    }, { passive: false });

    handle.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        wrapper.style.left = (touch.clientX - wrapper.offsetWidth / 2) + 'px';
        wrapper.style.top = (touch.clientY - wrapper.offsetHeight / 2) + 'px';

        // Find drop target
        wrapper.style.pointerEvents = 'none';
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        wrapper.style.pointerEvents = '';
        const target = el ? findClosestWrapper(el) : null;
        clearSegDropIndicators();
        if (target && target !== placeholder && target.classList.contains('segment-input-wrapper') && !target.classList.contains('touch-placeholder')) {
            const rect = target.getBoundingClientRect();
            const midX = rect.left + rect.width / 2;
            target.classList.add(touch.clientX < midX ? 'drag-over-left' : 'drag-over-right');
        }
    }, { passive: false });

    handle.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const touch = e.changedTouches[0];
        wrapper.classList.remove('touch-dragging');
        wrapper.style.position = '';
        wrapper.style.zIndex = '';
        wrapper.style.width = '';
        wrapper.style.left = '';
        wrapper.style.top = '';

        wrapper.style.pointerEvents = 'none';
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        wrapper.style.pointerEvents = '';
        const target = el ? findClosestWrapper(el) : null;
        clearSegDropIndicators();

        if (target && target !== placeholder && target.classList.contains('segment-input-wrapper') && !target.classList.contains('touch-placeholder')) {
            const rect = target.getBoundingClientRect();
            const midX = rect.left + rect.width / 2;
            const textDiv = placeholder.parentElement;
            if (touch.clientX < midX) {
                textDiv.insertBefore(wrapper, target);
            } else {
                textDiv.insertBefore(wrapper, target.nextSibling);
            }
        } else {
            placeholder.parentElement.insertBefore(wrapper, placeholder);
        }
        if (placeholder) { placeholder.remove(); placeholder = null; }
        scheduleRedrawLines();
    });
}

function saveEdit(row, langCode) {
    const sentence = SENTENCES[editingRow.sentenceIdx];
    const textDiv = row.querySelector('.lang-text');
    const wrappers = textDiv.querySelectorAll('.segment-input-wrapper');

    // Build new segment order from current wrapper positions
    const newLangData = [];
    wrappers.forEach(wrapper => {
        const input = wrapper.querySelector('.segment-input:not(.segment-input-translit)');
        const translitInput = wrapper.querySelector('.segment-input-translit');
        const segId = input.dataset.seg;
        let text = input.value;
        if (translitInput && translitInput.value.trim()) {
            text = text + '|' + translitInput.value;
        }
        newLangData.push([segId, text]);
    });

    // Detect changes (text edits, reorders, additions)
    const oldLangData = sentence.langs[langCode];
    const corrections = [];
    const orderChanged = newLangData.length !== oldLangData.length ||
        newLangData.some(([id, text], i) => oldLangData[i]?.[0] !== id || oldLangData[i]?.[1] !== text);

    if (orderChanged) {
        newLangData.forEach(([segId, newText]) => {
            const original = oldLangData.find(([id]) => id === segId);
            if (!original) {
                corrections.push({ seg: segId, old: null, new: newText, action: 'add' });
            } else if (original[1] !== newText) {
                corrections.push({ seg: segId, old: original[1], new: newText });
            }
        });
        // Check for removed segments
        oldLangData.forEach(([segId, text]) => {
            if (!newLangData.find(([id]) => id === segId)) {
                corrections.push({ seg: segId, old: text, new: null, action: 'remove' });
            }
        });
        // Check reorder
        const oldOrder = oldLangData.map(([id]) => id).join(',');
        const newOrder = newLangData.map(([id]) => id).join(',');
        if (oldOrder !== newOrder && corrections.length === 0) {
            corrections.push({ action: 'reorder', oldOrder, newOrder });
        }
        // Apply changes to data
        sentence.langs[langCode] = newLangData;
    }

    if (corrections.length > 0) {
        const correction = {
            sentenceId: sentence.id,
            lang: langCode,
            corrections,
            timestamp: new Date().toISOString()
        };
        // Store to localStorage
        const stored = JSON.parse(localStorage.getItem('langmap_corrections') || '[]');
        stored.push(correction);
        localStorage.setItem('langmap_corrections', JSON.stringify(stored));

        // Show toast
        const toast = document.getElementById('copyToast');
        toast.textContent = t('correctionSaved');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            toast.textContent = t('copied');
        }, 2000);
    }

    exitEditMode();
}

function cancelEdit(row, langCode) {
    exitEditMode();
}

function exitEditMode() {
    editingRow = null;
    // Remove overlay
    const overlay = document.getElementById('editOverlay');
    if (overlay) overlay.remove();
    // Remove editing row from body (it was moved there in enterEditMode)
    const editingEl = document.querySelector('body > .lang-row.editing');
    if (editingEl) editingEl.remove();
    render();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editingRow) { exitEditMode(); return; }
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
    if (document.getElementById('langModalOverlay')?.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') prevSentence();
    if (e.key === 'ArrowRight') nextSentence();
    if (e.key === 'r' && !e.ctrlKey && !e.metaKey) randomSentence();
});
