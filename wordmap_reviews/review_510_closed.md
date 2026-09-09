# Rally 3 — pass 3: language-internal quality in zh / yue / ja / ko / ar / he / hi / th / vi

Scope: the nineteen rows `kmc giq shx peh orh acn lic swi mmd jiu pmi twm dta mlm nuf clk blr rbb srh`
— `LANG_DATA['<code>'].meta.description` in `/home/jounlai/langmap/wordmap_meta.js` and each code's block
in `/home/jounlai/langmap/lang_names.js`.

## Clean-sweep statements

- **Simplified/traditional purity is CLEAN.** All nineteen `zh` descriptions contain zero traditional-only
  characters (checked against the 1,100-char TRAD table in `tools/trivia_zh_script_check.js`), and all
  nineteen `yue` descriptions contain zero simplified-only characters. No cross-contamination in either
  direction. (The two Han strings that *are* simplified inside non-zh rows — `水书` / `水书先生` in `swi`
  and `汝买` / `若进` in `rbb` — are covered separately as items 21 and 22; they sit in `ko`/`th`, not in
  `yue`.)
- **`yue` is genuine written Cantonese in all nineteen rows.** Every row carries 係 / 嘅 / 唔 / 喺 / 咗 / 哋 /
  佢 / 冇 / 嚟 / 嘢 in natural distribution; there is no row that reads as Mandarin prose, and no stray
  是 / 的 / 不 / 在 / 了 / 們 / 東西 / 他們. Idiom is real Cantonese throughout (`傾唔埋偈`, `爭得咁遠`,
  `留低`, `唔使一口釘`). 不過 appears as established house style. **No finding under criterion 2.**
- No language is clean across all nineteen rows on the remaining criteria.

---

## BLOCKER

1. **BLOCKER — `clk`, key `ar`.**
   Quoted: `…وهم مصنفون رسميا ضمن قومية اللوبا، وتعرض الخريطة هذه اللهجة الصينية.`
   The English is "the map shows this Chinese **doculect**" — a documented lect recorded on the Chinese side
   of the border. `اللهجة الصينية` says "this **Chinese dialect**", i.e. it tells the Arabic reader that Idu
   is a dialect of Chinese. That is a false claim about a Sino-Tibetan Mishmi language, made in the same
   sentence that classifies its speakers under the Lhoba nationality. `hi`, `th` and `vi` all render this
   correctly (`चीनी पक्ष का रूप`, `ข้อมูลฝั่งจีนชุดนี้`, `cứ liệu phía Trung Quốc này`), so this is an ar/he
   defect, not an English one.
   Corrected: `…وتعرض الخريطة المادةَ المسجَّلة في الجانب الصيني.`

2. **BLOCKER — `clk`, key `he`.**
   Quoted: `…כאלף בני אדם המסווגים רשמית כחלק מן הלאום לובה, והמפה מציגה את הניב הסיני הזה.`
   Same error as item 1: "doculect" rendered as `הניב הסיני` = "the Chinese dialect". Reads as an assertion
   that Idu is a Chinese dialect.
   Corrected: `…והמפה מציגה את הנתונים שנרשמו בצד הסיני.`

---

## FIX — Chinese ethnonyms and branch terminology (criterion 3)

3. **FIX — `acn`, key `zh`.**
   Quoted: `因而对构拟汉藏语系缅语组很有用处`
   `缅语组` is a hapax in the whole file; the atlas's own term for Burmish is `缅语支` (4 occurrences).
   `组` is not a PRC branch-rank word.
   Corrected: `因而对构拟汉藏语系缅语支很有用处`

4. **FIX — `jiu`, key `zh`.**
   Quoted: `基诺语属于汉藏语系彝缅语族的彝（倮倮）语支`
   Two problems. (a) `彝缅语族` is a hapax and mis-ranks the node: in PRC classification the 语族 is
   `藏缅语族` (5 occurrences in the file) and Lolo-Burmese is a 语群, not a 语族. (b) `倮倮` is the obsolete
   exonym form; the atlas's standard gloss is `彝语支` (9 occurrences), and where a Lolo gloss is needed the
   neutral form is `罗罗`.
   Corrected: `基诺语属于汉藏语系藏缅语族的彝语支（缅彝语群）`

5. **FIX — `mmd` and `mlm`, key `zh`.**
   Quoted: `毛南语属壮侗（侗台）语族侗水语支` / `属壮侗（侗台）语族侗水语支`
   The four sister rows of the same branch in this same batch write `语系`: `lic` and `swi` both say
   `侗台（壮侗）语系`, `kmc` says `壮侗语系`. Two rows out of six ranking Kra-Dai as a 语族 and four as a
   语系, inside one batch, is an internal contradiction about the same node.
   Corrected: `毛南语属侗台（壮侗）语系侗水语支` / `仫佬语…属侗台（壮侗）语系侗水语支`

6. **FIX — `blr`, key `yue`.**
   Quoted: `佢同佤語、巴饒克語同東拉佤語一齊屬於巴朗語支嘅佤語嗰邊`
   `東拉佤語` is wrong twice over against every other language in the row: `zh` has `东部拉瓦语`, ja
   `東部ラワ語`, ko `동부 라와어`, th `ละว้าตะวันออก`, vi `Lawa Đông`, hi `पूर्वी लावा`. Eastern **Lawa**
   is written `拉瓦`; writing it `拉佤` merges it with 佤 (Wa), which is a *different* language named two
   words earlier in the same clause, and `東` drops the `部`.
   Corrected: `佢同佤語、巴饒克語同東部拉瓦語一齊屬於巴朗語支嘅佤語嗰邊`

7. **FIX — `blr`, key `ar`.**
   Quoted: `وهي تنتمي إلى الجانب الوائي من الفرع البلاونغي مع الوا والباراوك واللاوية الشرقية`
   `اللاوية` is the Arabic name of **Lao** (the language of Laos). Eastern Lawa is a Palaungic language of
   the Wa side, unrelated to Lao, and it is listed here beside Wa and Parauk where the confusion is worst.
   Corrected: `…مع الوا والباراوك ولاوا الشرقية`

## FIX — ja and ko (criterion 4)

8. **FIX — `swi` (and `rbb`), key `ko`: simplified hanja in a Korean gloss.**
   Quoted: `수이족은 고유 문자인 수서(水书)를 가지고 있다` … `수서 선생(水书先生)이 역서와 의례에`
   The same row writes its own hanja gloss in traditional form — `수이어(水語)` — and the sibling rows use
   traditional throughout (`서족(畬族)`, `기노족(基諾族)`, `문파(門巴)`, `黎語`). Korean hanja glosses are
   traditional by convention; `书` is a simplified form and is inconsistent with `語` five words earlier in
   the same row.
   Corrected: `수서(水書)` and `수서 선생(水書先生)`.
   Related, same defect: `rbb`, key `ko` — `루마이(汝买), 불레이(布雷), 라오진(若进)` → `汝買`, `若進`.

9. **FIX — `twm` and `dta`, key `ko`: fullwidth parentheses in Korean text.**
   Quoted: `민족명 먼바（門巴）는` / `춰나（초나） 현의` / `타청（타르바가타이） 지역에`
   These two rows are the only ones of the nineteen that use U+FF08/U+FF09; the other seventeen ko rows all
   use halfwidth `( )` (e.g. `서족(畬族)`, `어룬춘(오로촌)어`, `자오(Chao)식`). Fullwidth brackets are a
   CJK-input artefact and render with wrong spacing in Hangul.
   Corrected: `먼바(門巴)`, `춰나(초나) 현`, `타청(타르바가타이)`.

10. **FIX — `dta`, key `ko`: wrong rank word for Mongolic.**
    Quoted: `다우르어는 몽골어파 가운데 가장 이질적인 언어의 하나로`
    `몽골어파` is a hapax in the file; `몽골어족` occurs 11 times, including in the `peh` row of this very
    batch (`보안어는 몽골어족의 언어로`). Mongolic is a family (어족), not a branch (어파), in this atlas's
    own usage.
    Corrected: `다우르어는 몽골어족 가운데…`

11. **FIX — `lic` and `swi`, key `ko`: spacing of the family name.**
    Quoted: `크라다이 어족의 일차 분지` / `크라다이 어족 캄수이어파에 속하며`
    `크라다이어족` (no space) occurs 9 times, `크라다이 어족` only in these two rows. `kmc`, `giq`, `mmd`
    and `mlm` in the same batch all write it closed.
    Corrected: `크라다이어족의 일차 분지` / `크라다이어족 캄수이어파에 속하며`

12. **FIX — `kmc`/`lic`/`swi`/`mmd`/`mlm`, key `ja`: three spellings of Kam-Sui in one batch.**
    Quoted: `カム・スイ語派` (kmc) / `カムスイ語派` (lic, swi) / `カム・スイ語群` (mmd, mlm)
    All six occurrences in the file are inside these five rows, and they split three ways on both the
    interpunct and the rank word (語派 vs 語群) for one and the same node.
    Corrected: standardise on `カム・スイ語派` in all five.

13. **FIX — `rbb`, key `ja` and key `ko`: the third De'ang dialect is mis-romanised.**
    Quoted (ja): `ルマイ（汝買）、ブレイ（布雷）、ラオジン（若進）に分かれる`
    Quoted (ko): `루마이(汝买), 불레이(布雷), 라오진(若进)으로 나뉜다`
    Both rows print the Chinese characters and then a transcription that contradicts them: 若進 is *ruòjìn*,
    never *raojin*. The `vi` row of the same batch gets it right and proves the reading — `Raojin (Nhược
    Tiến)`, and *Nhược Tiến* is the Sino-Vietnamese of 若進. The English `Raojin` is the upstream source of
    the error, but in ja and ko the transcription sits directly beside the character it contradicts.
    Corrected (ja): `ルオジン（若進）`. Corrected (ko): `뤄진(若進)`.
    (Also ko `불레이(布雷)` → `부레이(布雷)`: 布雷 is *bùléi*, two syllables, no coda -l.)

14. **FIX — `nuf`, keys `ja` and `ko`: the closing sentence fuses two unrelated facts.**
    Quoted (ja): `声調があり文字を持たない怒蘇語は、谷の共通語である傈僳語や漢語と並んで、世界有数の深さの
    サルウィン川上流の峡谷沿いで話され、村々へは歴史的に索橋で通じていた。`
    Quoted (ko): `성조가 있고 문자가 없는 누수어는 계곡의 공통어인 리수어 및 중국어와 함께, 세계에서 가장
    깊은 협곡의 하나인 살윈강 상류 협곡을 따라 쓰이며, 마을들은 예부터 강을 건너는 밧줄다리로 이어졌다.`
    The English has two separate statements — (a) *speakers* usually also speak Lisu and Chinese, and (b) the
    *Nu people* live along the upper Salween gorge, reached by rope bridges. The merge makes Nusu the subject
    of both, so `並んで` / `함께` now says Nusu is spoken *side by side with* Lisu along the gorge (losing the
    bilingualism claim), and the village clause is left dangling with no human subject. `zh`, `yue`, `hi`,
    `th`, `vi` all keep the two sentences apart.
    Corrected (ja): `怒蘇語は声調をもち文字を持たない。話者はふつう谷の共通語である傈僳語と漢語も話す。怒族
    はサルウィン川上流の峡谷沿いに暮らす。世界有数の深さの峡谷で、村々へは歴史的に索橋で通じていた。`
    Corrected (ko): `누수어는 성조가 있고 문자가 없으며, 화자들은 보통 계곡의 공통어인 리수어와 중국어도
    쓴다. 누족은 세계에서 가장 깊은 협곡의 하나인 살윈강 상류 협곡을 따라 살며, 마을들은 예부터 강을 건너는
    밧줄다리로 이어졌다.`

15. **FIX — `jiu`, key `ja`: `ンウィ` is not a possible Japanese word-initial.**
    Quoted: `ロロ・ビルマ語派のロロ（ンウィ）系に属し`
    Japanese does not begin a word with ン; the katakana for *Ngwi* is `ングウィ`. The ko row writes `응위`,
    which is the well-formed Korean equivalent.
    Corrected: `ロロ・ビルマ語派のロロ（ングウィ）系に属し`

## FIX — ar and he (criterion 5)

16. **FIX — `mmd` and `mlm`, key `ar`: wrong verb for "is spoken".**
    Quoted: `وتُنطق في مقاطعة هوانجيانغ ماونان ذاتية الحكم` (mmd) / `تُنطق لغة المولام في مقاطعة لوتشنغ`
    (mlm)
    `تُنطق` means "is **pronounced**". The atlas's own verb for "is spoken" in the sibling rows of this batch
    is `يُتكلَّم بها` (`swi`, `lic`, `pmi`) or `يتحدث بها` (`kmc`, `peh`, `blr`, `srh`).
    Corrected: `ويُتكلَّم بها في مقاطعة هوانجيانغ ماونان ذاتية الحكم` / `يُتكلَّم بلغة المولام في مقاطعة
    لوتشنغ`

17. **FIX — `srh`, key `ar`: the Wakhi clause has no object and reads as an attribute.**
    Quoted: `والمتحدثون بها هم أكثرية من تصنفهم الصين ضمن قومية الطاجيك لديها، إذ يتكلم نحو عشرة آلاف من هذه
    القومية الواخية`
    As written, `الواخية` is parsed as an adjective on `القومية` — "about ten thousand of this **Wakhi**
    nationality speak" — which is the opposite of the intended "about ten thousand of that nationality speak
    **Wakhi**", and it also contradicts the preceding clause, which just said the nationality is Tajik. The
    verb has no object at all.
    Corrected: `…إذ يتكلم نحو عشرة آلاف من أبناء هذه القومية اللغةَ الواخية`

18. **FIX — `nuf`, key `ar`: Yunnan spelled as Greece.**
    Quoted: `النوسو لغة صينية تبتية في وادي نوجيانغ بشمال غرب يونان في الصين`
    `يونان` is the Arabic name of **Greece**. The province is `يوننان`, which is what `acn`, `jiu`, `blr`,
    `rbb` and `srh` all write in this same batch.
    Corrected: `…بشمال غرب يوننان في الصين`

19. **FIX — `jiu`, key `ar`: malformed shadda in the elder's title.**
    Quoted: `وحول شيخ للقرية يُسمى تشوّوبا`
    The bytes are `ت ش و ‎ٙ+shadda‎ و ب ا` — a shadda on the first و *and* a second و after it. Gemination is
    written either with shadda on one letter or by doubling the letter, never both; this renders as a stray
    diacritic.
    Corrected: `يُسمى تشوبا`

20. **FIX — `rbb`, key `ar`: two of the three dialect names are mis-transcribed.**
    Quoted: `هي الروماي والبوليي والراوجين`
    `الراوجين` carries the same 若進 → "Raojin" error as items 13; `البوليي` doubles the yāʾ for *Bulei*,
    which has no such sequence.
    Corrected: `هي الروماي والبولي والروجين`

21. **FIX — `mlm`, key `he`: wrong verb for "is spoken".**
    Quoted: `מולאם נדברת במחוז האוטונומי לואוצ׳נג-מולאם`
    `נדבר` is "was agreed upon / conversed", not "is spoken". Every sibling row uses `מדוברת` (`kmc`) or
    `מדברים בה` (`lic`, `swi`, `pmi`).
    Corrected: `מולאם מדוברת במחוז האוטונומי לואוצ'נג-מולאם`

22. **FIX — `mmd`, key `he`: `ממוסך` is not a Hebrew word for "masked".**
    Quoted: `המאונאנים ידועים בחג פנלונג ובתיאטרון הפולחני הממוסך נואו המוצג בטקסי בית`
    The root מ־ס־ך in this binyan gives `מוסך` = garage; there is no adjective `ממוסך` meaning masked. The
    ordinary Hebrew is `תיאטרון מסכות`.
    Corrected: `…ובתיאטרון המסכות הפולחני נואו המוצג בטקסי בית`

23. **FIX — `swi`, key `he`: "divinatory" rendered as "cosmic".**
    Quoted: `אין זו מערכת כתב מלאה לשפה אלא סימון פולחני וקוסמי`
    `קוסמי` is the adjective from קוסמוס — "cosmic". The English is "a ritual and **divinatory** notation";
    the Hebrew noun is קוסמות / ניחוש. `ar` gets this right with `عِرافي`.
    Corrected: `…אלא סימון פולחני ולצורכי קוסמות` (or `סימון של פולחן וניחוש`)

24. **FIX — `srh` and `blr`, key `he`: language names beginning with an undoubled vav.**
    Quoted (srh): `כ-10,000 מבני אותו לאום דוברים ואחית` and `ואחית, אף שמדברים אותה בסביבה`
    Quoted (blr): `יחד עם ואה, פאראוק ולאווה מזרחית`
    In unpointed Hebrew a word-initial single ו is read as the conjunction "and". `דוברים ואחית` reads
    "speak and Ahit", and `ואחית, אף ש…` opening a clause reads "And Ahit, although…". The same file already
    doubles the vav where it matters (`וּוואנזי` in `giq`, `לאווה` in this very sentence).
    Corrected: `וואחית` in both `srh` positions, `וואה` in `blr`.

## FIX — hi, th, vi (criterion 6)

25. **FIX — `hi`: six different words for "tone" across the nineteen rows.**
    Quoted: `स्वराघात-प्रणाली` / `स्वराघात-वर्ग` (kmc, lic, swi, mmd, jiu, pmi) · `तानिक` (acn, blr) ·
    `सुर-भाषा`, `चाओ सुर-मान` (twm, dta) · `स्वरमान अंकों` (mlm) · `सुरभेदी` (nuf, clk) · `तान` (rbb)
    The atlas's established term is `स्वराघात` — 142 occurrences file-wide. `सुर-भाषा` (2), `सुरभेदी` (2)
    and `स्वरमान` (1) exist *only* inside these nineteen rows, so this batch introduced three new coinages
    for a term the corpus had already settled. (Separately: `स्वराघात` strictly denotes stress-accent rather
    than tone, but that is a corpus-wide question, not a defect of these rows.)
    Corrected: use `स्वराघात` / `स्वराघात-वर्ग` / `स्वराघाती` in all nineteen, as in `kmc`.

26. **FIX — `hi`: three spellings of Guizhou and two of Guangxi and Heilongjiang inside one batch.**
    Quoted: `गुइझोऊ` (kmc, giq) vs `क्वेइचो` (swi) vs `क्वेइचोउ` (mmd) — 贵州
    `ग्वांगशी` (kmc) vs `क्वांगशी` (mmd, mlm) — 广西
    `हेइलोंगच्यांग` (orh) vs `हेइलुंगच्यांग` (dta) — 黑龙江
    Corrected: pick the majority form in each case — `गुइझोऊ`, `ग्वांगशी`, `हेइलोंगच्यांग` — and apply it
    across all nineteen.

27. **FIX — `srh`, key `hi`: Turkic rendered as Turkish.**
    Quoted: `और इस नाम का तुर्की में अर्थ है पत्थर का क़िला`
    `तुर्की` is the language of Turkey. Tashkurgan is named from the local **Turkic** (Uyghur/Kyrgyz) stock.
    `ja` (`テュルク語`), `th` (`ภาษาเตอร์กิก`) and `vi` (`tiếng Turk`) all draw the distinction.
    Corrected: `और इस नाम का तुर्क भाषाओं में अर्थ है पत्थर का क़िला`

28. **FIX — `th`: two names for Kra-Dai and three for Kam-Sui inside one batch.**
    Quoted: `ตระกูลกระได` (kmc, giq) vs `ตระกูลขร้า-ไท` (lic, swi, mmd, mlm)
    `คำ-สุย` (kmc, giq) vs `คำ-ซุย` (lic, swi) vs `กัม-ซุย` (mmd, mlm)
    Six rows of one branch, split two ways on the family name and three ways on the branch name. The Royal
    Institute form is `ขร้า-ไท`.
    Corrected: `ตระกูลขร้า-ไท` and `สาขากัม-ซุย` throughout.

29. **FIX — `swi` / `mmd` / `mlm`, key `th`: the Sui language has three Thai names in three rows.**
    Quoted: `ภาษาสุย (ฉุ่ย)` (swi description) · `ภาษาซุย` (mmd, mlm descriptions) · `ภาษาสุ่ย`
    (`lang_names.js` map label for `swi`)
    Three spellings — สุย, ซุย, สุ่ย — for one language, one of them on the map pin and the others in the
    popups that the pin opens.
    Corrected: settle on the label form `ภาษาสุ่ย` and use it in all three descriptions.

30. **FIX — `rbb`, key `th`: Chinese characters in the Thai row, plus the Raojin error.**
    Quoted: `คือ รูไม (汝买) ปู้เหลย (布雷) และเหญาจิ้น (若进)`
    The English carries no characters here, and no other `th` row in the batch glosses a dialect name in Han
    (the one other Han string, `水书` in `swi`, is a citation the English itself makes). Worse, `เหญาจิ้น`
    contradicts the very character printed beside it: 若进 is *ruòjìn*, Thai `รั่วจิ้น`.
    Corrected: `คือ รูไม ปู้เหลย และรั่วจิ้น` (drop the Han glosses, as `blr` and `pmi` do).

31. **FIX — `dta`, key `vi`: "the rest of the language" and a doubled classifier.**
    Quoted: `nhà Thanh đã chuyển một nhóm binh lính kỳ binh người Daur` … `cách hơn hai nghìn kilômét về
    phía tây so với phần còn lại của ngôn ngữ này, vốn được nói ở Nội Mông và Hắc Long Giang`
    (a) `binh lính kỳ binh` says "soldiers banner-soldiers" — `binh` twice.
    (b) `phần còn lại của ngôn ngữ này` says the descendants live 2,000 km from *the rest of the language*.
    A language does not have a geographic remainder; the English is "the rest of the speakers".
    Corrected: `một nhóm binh lính kỳ người Daur` … `cách hơn hai nghìn kilômét về phía tây so với những
    người nói còn lại ở Nội Mông và Hắc Long Giang`

32. **FIX — `kmc`, key `vi`: one placename left in pinyin among Sino-Vietnamese ones.**
    Quoted: `Chính tả ấy dựa trên tiếng Dung Giang (Zhanglu), tức chính nhánh phía nam này.`
    The row gives every other Chinese placename in Sino-Vietnamese — Quý Châu, Hồ Nam, Quảng Tây, Dung Giang
    — then drops into pinyin for 章鲁 alone, inside the same parenthesis as the Sino-Vietnamese it glosses.
    Corrected: `dựa trên tiếng Dung Giang (Chương Lỗ)`

## FIX — `lang_names.js` map label vs popup prose (criterion 7)

The map pin and the popup that the pin opens call the language different things in the following cases.
Every one of these is a user-visible contradiction between two strings shown seconds apart.

33. **FIX — `yue`, seven rows: label says 語, prose says 話.**
    Labels: `毛南語` (mmd), `仫佬語` (mlm), `怒蘇語` (nuf), `義都語` (clk), `布朗語` (blr), `德昂語` (rbb),
    `色勒庫爾語` (srh).
    Prose: `毛南話`, `仫佬話`, `怒蘇話`, `義都話`, `布朗話`, `德昂話`, `色勒庫爾話`.
    The other twelve `yue` rows agree with their labels on 語 (`南部侗語`, `仡佬語`, `畲語`, `保安語`,
    `鄂倫春語`, `阿昌語`, `黎語`, `水語`, `基諾語`, `普米語`, `門巴語`, `達斡爾語`). Worse, the split is
    *internal*: `mmd`'s prose calls its neighbours `水話` while `swi`'s own prose calls itself `水語`, and
    `blr`'s prose says `布朗話` in one clause and `佤語`, `巴饒克語`, `桑陶語` in the next.
    Corrected: use 語 in all seven descriptions, matching the labels and the other twelve rows.

34. **FIX — `jiu`, keys `vi` and `hi`.**
    Label vi `Tiếng Cơ Nặc` vs prose `Người Jino`, `núi Jinuo`, `thứ tiếng Youle`.
    Label hi `जीनुओ` vs prose `जिनो`.
    Corrected: vi prose → `Người Cơ Nặc`, `núi Cơ Nặc`; hi label or prose → one of `जिनो` / `जीनुओ`.

35. **FIX — `pmi`, keys `vi`, `th`, `hi`.**
    Label vi `Tiếng Phổ Mễ Bắc` vs prose `tiếng Pumi Bắc`, `nhiều người Pumi`.
    Label th `ภาษาผู่หมี่เหนือ` vs prose `ภาษาปูหมี่เหนือ`, `ชาวปูหมี่`.
    Label hi `उत्तरी पुमी` vs prose `पूमी`.
    Corrected: adopt the label form in each prose (`Phổ Mễ`, `ผู่หมี่`, `पुमी`).

36. **FIX — `mlm`, keys `ko`, `hi`, `th`, `vi`.**
    Label ko `무라오어` vs prose `물람어`, `물람족`.
    Label hi `मुलम` vs prose `मूलाम`.
    Label th `ภาษาม่กเหลา` vs prose `ภาษามู่หล่าว`.
    Label vi `Tiếng Mục Lão` vs prose `tiếng Mulam`, `Người Mulam`.
    Four of the eight checked languages disagree with their own label on this one row — the worst row in the
    batch.
    Corrected: adopt the label form in each prose.

37. **FIX — `nuf`, keys `ja`, `vi`, `hi`.**
    Label ja `ヌス語` vs prose `怒蘇語` throughout.
    Label vi `Tiếng Nộ Tô` vs prose `Tiếng Nusu`, `Nusu nghiêng về Lô Lô`.
    Label hi `नुसु` vs prose `नुसू`.
    Corrected: ja prose → `ヌス語` (or the label → `怒蘇語`); vi prose → `Nộ Tô`; hi → one vowel length.

38. **FIX — `dta`, keys `vi`, `hi`, `th`.**
    Label vi `Tiếng Đạt Oát Nhĩ` vs prose `Tiếng Daur`, `người Daur`, `binh lính kỳ binh người Daur`.
    Label hi `दाउर` vs prose `दावुर`.
    Label th `ภาษาต๋าว่อเอ่อร์` vs prose `ภาษาต๋าวอ่อร์`, `ชาวต๋าวอ่อร์`.
    Corrected: adopt the label form in each prose.

39. **FIX — `clk`, keys `ja`, `hi`.**
    Label ja `イドゥ・ミシュミ語` vs prose `義都語` (the prose reserves `イドゥ・ミシュミ` for the Indian side
    only, so the pin is labelled with the *Indian* name while the row is the Chinese doculect).
    Label hi `इदु मिश्मी` vs prose `इदू` — different vowel length in the first syllable.
    Corrected: ja label → `イドゥ語（義都語）` or prose → `イドゥ語`; hi → settle on `इदू`.

40. **FIX — `rbb`, keys `ar` and `he`.**
    Label ar `الدآنغية (رومي)` vs prose `الدعانغ`, `الروماي` — the glottal stop of *De'ang* is written `آ`
    on the pin and `ع` in the popup, and *Rumai* loses its alif.
    Label he `דהאנג (רומאי)` vs prose `דעאנג` — `ה` on the pin, `ע` in the popup.
    Corrected: ar label → `الدعانغية (الروماي)`; he label → `דעאנג (רומאי)`.

41. **FIX — `twm`, keys `he` and `th`.**
    Label he `מונפא צונה` vs prose `הכינוי האתני הסיני מונבה`, `המונבה של מוטואו`, `בני הלאום המונבה` —
    `מונפא` vs `מונבה`.
    Label th `ภาษาเมินปาชั่วน่า` vs prose `ชนชาติเหมินปา`, `ภาษาเหมินปา` — `เมินปา` vs `เหมินปา`.
    Corrected: he label → `מונבה צונה`; th label → `ภาษาเหมินปาชั่วน่า`.

42. **FIX — `srh`, key `hi`; `swi`, key `he`.**
    Label hi `सरीकोली` vs prose `सारिकोली` (the vowel lengths are swapped, both syllables).
    Label he `סווי` vs prose `השפה סוּי`, `לבני הסוי`.
    Corrected: hi label → `सारिकोली`; he label → `סוּי` (or prose → `סווי`).

43. **FIX — `giq`, key `ar`: label and prose disagree on gender.**
    Label `الغيلاو الخضراء` (feminine) vs prose `صار الغيلاو الأخضر والأحمر والأبيض`, `وهذا الصف هو الغيلاو
    الأخضر (هاغي)` (masculine, twice).
    Corrected: label → `الغيلاو الأخضر`.

44. **FIX — `blr`, key `th`: label uses the autonym, prose uses the exonym.**
    Label `ภาษาปลัง` vs prose `ภาษาบลัง` … `ผู้พูดเรียกตัวเองว่าปลัง`. The popup explicitly presents ปลัง
    as the *self-designation* of a language it calls บลัง — so the pin is labelled with the word the popup
    says is the other name.
    Corrected: label → `ภาษาบลัง`.

45. **FIX — `orh` and `acn`, key `he`: label uses geresh, prose uses ASCII apostrophe.**
    Label `אורוצ׳ן` (U+05F3) vs prose `אורוצ'ן` (U+0027); label `אצ׳אנג` vs prose `אצ'אנג`.
    Corrected: use U+0027 in both labels, matching the prose and the file-wide majority (986 ASCII vs 270
    geresh across all `he` descriptions).

---

## NOTE

46. **NOTE — `he`, seven rows: geresh/apostrophe split inside the batch.**
    ASCII `'`: kmc, giq, shx, peh, orh, acn, lic, swi, jiu, pmi, rbb, srh (12 rows).
    Geresh `׳` U+05F3: mmd, twm, dta, mlm, nuf, clk, blr (7 rows).
    File-wide the ASCII form leads 986 to 270, so the seven geresh rows are the deviation. Cosmetic, but it
    is a search/copy hazard: `לואוצ׳נג` will not match a user typing `לואוצ'נג`.

47. **NOTE — `peh`, key `yue`: `埋身` for syntactic convergence.**
    Quoted: `句法向鄰居埋身`
    `埋身` in Cantonese means to close in physically, most often in a fight; it does not carry the sense of
    structural convergence. The `zh` row of the same batch has the right idiom, `句法向邻居靠拢`.
    Corrected: `句法向鄰居埋堆` or, plainly, `句法向鄰居靠攏`.

48. **NOTE — `clk`, key `yue`: garbled clause order in the closing sentence.**
    Quoted: `義都人仲有啲又係祭司又係巫師嘅伊古好出名`
    As written this is "Idu people also have some priest-and-shaman Igu very famous" — `仲有啲…好出名` has no
    grammatical spine. `zh` reads correctly: `义都人还以其祭司兼巫师伊古闻名`.
    Corrected: `義都人仲以佢哋啲又係祭司又係巫師嘅伊古出名`

49. **NOTE — `giq`, key `yue`: 俾 and 畀 both used as the passive/dative marker.**
    Quoted: `成日俾人當做唔同嘅語言` … `而灣子畀兩者都係詞根本身`
    Both spellings occur in one row. `畀` is the standard written form; `俾` is a common colloquial
    substitution. Harmless in isolation but inconsistent within a single paragraph.

50. **NOTE — `swi` / `mmd` / `mlm` / `nuf` / `clk`, key `ar`: `مقاطعة` used for both province and county.**
    Quoted: `في وادي نوجيانغ بشمال غرب يونان` then `وقد حُلّت مقاطعة بيجيانغ سنة 1986` (nuf) — Bijiang was a
    *county*; and `مقاطعة هوانجيانغ ماونان ذاتية الحكم` (mmd) beside `مقاطعة قويتشو` (swi), where the same
    word carries province rank. `swi` alone distinguishes them (`مقاطعة قويتشو` … `محافظة ساندو`).
    Corrected: reserve `مقاطعة` for 省 and use `محافظة` (or `قضاء`) for 县 throughout, as `swi` does.

51. **NOTE — `kmc`, keys `ja` and `ko`: `モン語` / `몽어` for Hmong.**
    Quoted: `モン語 RPA と同じく` / `몽어 RPA처럼`
    These match house style (`モン語` occurs 16 times, `몽어` 4 times), so this is not a deviation — but
    `モン語` is also the Japanese name of **Mon**, an Austroasiatic language the atlas covers elsewhere, and
    the same file writes `フモン・ミエン祖語` for the family. Worth deciding once, corpus-wide, rather than
    per row.

52. **NOTE — `shx`, keys `ja` and `ko`: `畬` vs `畲`.**
    ja prose and label use `畬族`, `畬話`, `畬語（ホーネ語）`; ko uses `서족(畬族)`, `'서화(畬話)'`; `zh` and
    `yue` use `畲族`, `畲话`. Both graphs exist, but the batch splits along language lines for a character
    that the reader may compare across popups. `畲` is the PRC standard for this ethnonym.

53. **NOTE — `peh`, key `th`: `สหพันธ์ภาษา` for Sprachbund.**
    Quoted: `ภาษาเป่าอานอยู่ในสหพันธ์ภาษากานซู่-ชิงไห่ (อัมโด)`
    `สหพันธ์` is "federation/confederation" in the political sense. The Thai term for a linguistic area is
    `แนวร่วมภาษา` or, descriptively, `กลุ่มภาษาร่วมพื้นที่`. The other languages get this right
    (`言語連合`, `언어연합`, `الاتحاد اللغوي`, `איגוד לשוני`, `語言聯盟`).

54. **NOTE — `mmd` and `swi`, key `th`: administrative name order and county rank.**
    Quoted: `อำเภอปกครองตนเองชนชาติเหมาหนานหวนเจียง` (mmd) / `เขตปกครองตนเองชนชาติสุยซานตู` (swi)
    Both put the placename last, so they read "Maonan-Huanjiang" and "Sui-Sandu" rather than
    "Huanjiang Maonan" / "Sandu Sui"; and 三都水族自治县 is a *county*, which `mmd` marks `อำเภอ` and `swi`
    marks `เขต` in the same batch.
    Corrected: `อำเภอหวนเจียงปกครองตนเองชนชาติเหมาหนาน` / `อำเภอซานตูปกครองตนเองชนชาติสุ่ย`.

55. **NOTE — `mmd` / `jiu` / `pmi`, key `vi`: pinyin and Sino-Vietnamese mixed inside one sentence.**
    Quoted: `Tiếng Maonan … huyện tự trị dân tộc Maonan Hoàn Giang thuộc miền bắc Quảng Tây` ·
    `Người Jino … núi Jinuo ở Cảnh Hồng, Tây Song Bản Nạp, Vân Nam` ·
    `nhiều người Pumi … tại Taoba ở Mộc Lý, Tứ Xuyên`
    Every *place* is Sino-Vietnamese while the *ethnonym* beside it is pinyin, and `lang_names.js` supplies
    the Sino-Vietnamese forms the prose declines to use (`Tiếng Mao Nam`, `Tiếng Cơ Nặc`, `Tiếng Phổ Mễ
    Bắc`) — see items 34–36. The twelve other `vi` rows are consistently Sino-Vietnamese
    (`Tiếng Đồng Nam`, `Tiếng Xa`, `Tiếng Bảo An`, `Tiếng Ngạc Luân Xuân`, `Tiếng A Xương`, `Tiếng Lê`,
    `Tiếng Thủy`, `Tiếng Môn Ba`, `Tiếng Đức Ngang`).

56. **NOTE — `acn` / `blr` / `rbb`, key `vi`: `tiếng Thái` used for Dai.**
    Quoted: `người A Xương thường dùng thêm tiếng Thái (Tai Nuea)` · `tiếng Thái (Tai Lue)` ·
    `họ cùng người Thái đã chăm sóc suốt một nghìn năm`
    In Vietnamese `tiếng Thái` / `người Thái` denotes the Tai people of Vietnam (and colloquially Thailand's
    Thai), not China's 傣族. `blr`'s `họ cùng người Thái` is the sharpest case, since the same paragraph has
    already mentioned Thailand.
    Corrected: `tiếng Đại (Tai Nuea)` / `người Đại`, or `tiếng Thái (Đại)` on first mention.

57. **NOTE — `kmc`, key `ar`: Latin letters prefixed with Arabic connectors.**
    Quoted: `ولذلك bal «سمكة» وbav «ورقة»` and `فـ-l للنغمة 55، و-p لـ35`
    `وbav` glues the conjunction directly onto a Latin word, and `فـ-l` chains an Arabic tatweel to a Latin
    hyphen-letter. Both render with unpredictable spacing at the bidi boundary. The `he` row of the same
    batch inserts LRM marks (`‎-l ל-55`) and separates `ו-bav`, which is the safer pattern.
