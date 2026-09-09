# Rally 3 — Pass 2: translation fidelity of the 19 new rows

Scope: `LANG_DATA['<code>'].meta.description` in `/home/jounlai/langmap/wordmap_meta.js`, commit ff65db7b.
19 rows × 18 non-English keys = 324 strings compared against the English.
Lens: does each translation say what the English says — no more, no less. The truth of the English is out of scope.

Mechanical checks run first (script, `/home/jounlai/langmap-work/rally3/nums.js` + `show.js`):
every numeral in every string was normalised across Latin / Arabic-Indic / Devanagari / Thai / fullwidth digits and
compared against the English figure set, and sentence counts were tabulated. **No genuine numeric
addition or numeric contradiction was found in any of the 324 strings.** Every apparent mismatch resolved to
notation (`1,5` vs `1.5`, `550.000` vs `550,000`, `5,50,000` lakh grouping, `4万` / `4만` / `四万`,
`13万9千`, `ثلاثين ألفاً`, `หนึ่งหมื่นหนึ่งพันคน`). Findings below are therefore all semantic/structural.

---

## Per-row summary

| row | clean | findings in |
|---|---|---|
| kmc | vi th id de fr it es pt ru ar he sw | ja ko zh yue (#12) · hi (#20) · uk (#24) |
| giq | — | **all 18** (#4 drop, #7 wording) · th sw (#17) · ja (#25) |
| shx | all 18 | — |
| peh | zh th id hi de fr it es pt ru uk ar he sw | ja ko yue vi (#21) |
| orh | ja hi de fr it es pt uk ar he sw id vi | ko ru (#5) · zh yue (#6) · th (#22) |
| acn | ja ko th id hi fr it es pt ru uk he sw | zh (#13, #23) · yue (#13) · vi (#16) · ar de (#26) |
| lic | ja ko zh yue vi th id de it es pt uk ar he | hi (#20) · ru fr (#18) · sw (#27) |
| swi | — | **all 18** (#2 frame) · it es pt (#8) · he (#28) · hi (#20) |
| mmd | ko vi th id de fr es pt ru uk he sw | **ja zh yue (#1)** · ar (#9, #14) · it (#19) · hi (#20) |
| jiu | ja ko vi th id de fr it es pt ar he sw | zh yue (#10) · ru uk (#29) · hi (#20) |
| pmi | 17 clean | hi (#20) |
| twm | ja zh yue vi th id hi de fr it es pt | ru uk ar (#15) · he (#15) · sw (#11) · ko (#30) |
| dta | vi th id hi fr it es pt ru uk ar he | zh (#7b, #21b) · yue (#21b) · ja ko (#25b) · sw (#11) |
| mlm | ko zh yue vi th id de fr it es pt ru uk he | ar (#9) · sw (#31) · hi (#20) · ja (#32) |
| nuf | ja ko vi de fr it es | **pt (#3)** · zh yue (#12b) · th id hi ru uk ar he sw + ko zh yue (#17b) · hi (#20) |
| clk | ja ko vi th id de fr it es pt ru uk he sw | zh yue (#33) · ar (#34) · hi (#20) |
| blr | ja ko th id de fr it es pt ar he sw | **ru uk (#3b)** · zh yue (#35) · vi (#36) · hi (#37) |
| rbb | ja ko zh yue th id de fr it es pt ar he sw | vi (#36) · ru uk (#38) · hi (#20) |
| srh | ja ko vi th id ru uk ar | de fr it es pt hi he sw (#6b) · zh yue (#39) · sw (#40) |

---

## Findings

### BLOCKER

**1. `mmd.description.zh`, `mmd.description.yue`, `mmd.description.ja` — Chadong identified as a different language**

- zh: `它最亲近的亲属是佯僙语（茶洞语），其次是水语。`
- yue: `同佢最親嘅係佯僙話（茶洞話），其次係水話。`
- ja: `最も近い親族は佯僙語（茶洞語）で、その次に近いのが水語である。`

English: *"Its closest relative is Chadong, with Sui next nearest."* — one language, named Chadong.
The three CJK keys gloss Chadong as 佯僙语 with 茶洞语 as a mere alias. 佯僙语 (Yanghuang / Then,
ISO `tct`, Pingtang, Guizhou) and 茶洞语 (Chadong, ISO `cds`, Luocheng, Guangxi) are **two distinct
Kam-Sui languages**. The parenthesis asserts an identity the English does not make and that is false.
No other key does this (ko `차둥어`, all others `Chadong`).

Corrected:
- zh: `它最亲近的亲属是茶洞语，其次是水语。`
- yue: `同佢最親嘅係茶洞話，其次係水話。`
- ja: `最も近い親族は茶洞語で、その次に近いのが水語である。`

**2. `swi.description.*` — all 18 translations add an organising frame the English does not have**

English (5 sentences) runs straight from the speaker figure into `Its consonant inventory is unusually
large…` and then `The Sui also have a script of their own…`. Every one of the 18 translations inserts a
numbered frame sentence and then enumerates:

- ja `水語が目を引く点は二つある。第一に…第二に…`
- ko `수이어가 눈에 띄는 점은 두 가지다. 첫째… 둘째…`
- zh `水语有两点尤为突出。其一…其二…`
- yue `水語有兩樣嘢特別突出。第一…第二…`
- vi `Tiếng Thủy đáng chú ý ở hai điểm. Thứ nhất… Thứ hai…`
- th `ภาษาสุยโดดเด่นสองประการ ประการแรก… ประการที่สอง…`
- id `Ada dua hal yang menonjol. Pertama… Kedua…`
- hi `इसकी दो बातें उल्लेखनीय हैं। पहली… दूसरी…`
- de `Zwei Dinge fallen auf. Erstens… Zweitens…`
- fr `Deux traits la distinguent. D'abord… Ensuite…`
- it `Due cose la distinguono. Primo… Secondo…`
- es `Dos rasgos la distinguen. Primero… Segundo…`
- pt `Duas coisas a distinguem. Primeiro… Segundo…`
- ru `Примечательны две черты. Во-первых… Во-вторых…`
- uk `Прикметні дві риси. По-перше… По-друге…`
- ar `وتتميز اللغة بأمرين. الأول… والثاني…`
- he `שני דברים בולטים בה. ראשית… שנית…`
- sw `Mambo mawili yanakitofautisha. Kwanza… Pili…`

This is exactly the drift the brief names. The uniformity across all 18 strongly suggests the English was
edited to drop the frame after the translations were made, or the translations were made from an earlier
English. `swi` is the only row in the set with this pattern, so the set is not uniform.
**Decide one way and apply it to all 19 keys**: either restore `Two things stand out about Sui.` to `swi.en`
(cheapest, and it matches the English's own `also`), or delete the frame sentence from all 18 translations
and re-join the enumerated clauses. Do not leave it split.

**3. `nuf.description.pt` — polarity of "mutually unintelligible" garbled**

> `O nusu é uma das quatro línguas mutuamente inteligíveis apenas entre os seus próprios falantes da nacionalidade nu, de cerca de 37.000 pessoas: …`

English: *"The Nu nationality of about 37,000 speaks four mutually unintelligible languages"*. The pt reads
`mutuamente inteligíveis` — "mutually **intelligible**" — with a bolted-on `apenas entre os seus próprios
falantes` trying to salvage it. A reader scanning the sentence gets the opposite claim. Every sibling
Romance key has it right (es `mutuamente ininteligibles`, it `reciprocamente incomprensibili`,
fr `mutuellement inintelligibles`).

Corrected: `O nusu é uma das quatro línguas mutuamente ininteligíveis da nacionalidade nu, de cerca de 37.000 pessoas: …`

**3b. `blr.description.ru`, `blr.description.uk` — the ethnonym is misspelled throughout, into an existing common noun**

ru gives the language as `Бланг` but the people as `благ` / `благи` / `Благи` / `благов`:
> `…около 68 000 человек из 120-тысячной народности **благ** в Китае.` … `**благи** обычно пользуются также дайским` … `**Благи** принадлежат к древнейшим чаеводческим народам` … `В деревнях **благов** традиционно исповедуют…`

uk identically: `народності **благ**`, `**благи** зазвичай`, `**Благи** належать`, `У селах **благів**`.

The **н** has been dropped in every inflected form. `благ` is also the genitive plural of Russian/Ukrainian
`благо` ("goods, blessings"), so `народности благ` parses as "the nationality of blessings". English has
one consistent ethnonym, *Blang*.

Corrected: ru → `бланг` (indecl.) or `бланги / брангов`; concretely `народности бланг`, `бланги обычно
пользуются`, `Бланги принадлежат`, `В деревнях блангов`. uk → `народності бланг`, `бланги зазвичай`,
`Бланги належать`, `У селах блангів`.

### FIX

**4. `giq.description.*` — "where the community is called Cờ Lao" dropped in 13 of 18**

English: *"…in scattered villages of western Guizhou and across the border in Vietnam, where the community
is called Cờ Lao."* The Vietnamese exonym is a substantive named fact, not decoration.

Kept only by ja (`ベトナム（コーラオ族）`), ko (`베트남(꺼라오족)`), zh (`越境的越南（当地称仡佬族 Cờ Lao）`),
yue (`過咗界嘅越南（當地叫 Cờ Lao）`). vi is exempt in effect — its whole text calls the language *Cờ Lao*.

Dropped, with the clause simply absent, in: **th, id, hi, de, fr, it, es, pt, ru, uk, ar, he, sw** —
e.g. de `…und jenseits der Grenze in Vietnam.`, ru `…и за границей во Вьетнаме.`,
es `…y, al otro lado de la frontera, en Vietnam.`

Corrected (pattern): append the naming clause, e.g.
de `…und jenseits der Grenze in Vietnam, wo die Gemeinschaft Cờ Lao heißt.`;
es `…y, al otro lado de la frontera, en Vietnam, donde la comunidad se llama Cờ Lao.`;
ru `…и за границей во Вьетнаме, где эту общность называют Cờ Lao.`; and so on for the other ten.

**5. `orh.description.ru`, `orh.description.ko` — a provincial boundary turned into a national one**

English: *"spoken in the Oroqen Autonomous Banner of Inner Mongolia and across the border in Heilongjiang."*
Heilongjiang is a Chinese province; the "border" is administrative.

- ru: `…и **за границей** в Хэйлунцзяне.` — `за границей` in Russian means *abroad*. Reads as though
  Heilongjiang were outside China. Note the same translator writes it correctly in `peh.ru`
  (`за границей **провинции** в Тунжэне`), so this is an inconsistency within the set.
  Corrected: `…и за границей провинции, в Хэйлунцзяне.` (or `…и в соседнем Хэйлунцзяне.`)
- ko: `내몽골 어룬춘 자치기와 **국경 너머** 헤이룽장에서 쓰인다.` — `국경` is specifically a *national* border.
  Corrected: `내몽골 어룬춘 자치기와 성 경계 너머 헤이룽장에서 쓰인다.` (cf. `peh.ko`, which correctly has `성 경계를 넘은`)

**6. `orh.description.zh`, `orh.description.yue` — a hedge flattened into a verdict**

English: *"the source consulted here labels them **the opposite way round from the usual reconstruction**"* —
a relative statement, no error asserted.

- zh: `只是本处所据的资料把二者**标反了**` — "the source has them **labelled backwards**": a flat verdict
  that the source is wrong, with the reference point (the usual reconstruction) deleted.
- yue: `只不過本處所據嘅資料**將兩者標反咗**` — same.

Every other key preserves it (ja `通常の再構と逆に標示している`, ko `통상의 재구와 반대로 표시하고 있어`,
sw `kinyume na ujenzi upya wa kawaida`, ar `على عكس إعادة البناء المألوفة`).

Corrected: zh `只是本处所据的资料把二者的标注与通行的构拟相反`; yue `只不過本處所據嘅資料將兩者標注得同通行嘅構擬相反`.

**6b. `srh.description.{de,fr,it,es,pt,hi,he,sw}` — "Turkic" (family) narrowed to "Turkish" (one language)**

English: *"its name means 'stone fortress' in **Turkic**."*

- de `der Name bedeutet **auf Türkisch** Steinfestung` → `…in einer Turksprache Steinfestung` (or `turksprachig`)
- fr `ce nom signifie forteresse de pierre **en turc**` → `…en turcique` / `…dans une langue turque`
- it `il nome significa fortezza di pietra **in turco**` → `…in turcico`
- es `el nombre significa fortaleza de piedra **en turco**` → `…en túrquico`
- pt `o nome significa fortaleza de pedra **em turco**` → `…em túrquico`
- hi `इस नाम का **तुर्की में** अर्थ है पत्थर का क़िला` → `…तुर्कीय भाषाओं में…`
- he `**בטורקית**` → `בשפה טורקית` is equally ambiguous; use `בלשון טורקית (טורקית־אלטאית)` or `בטורקית הקדומה`
- sw `**katika Kituruki**` → `katika lugha za Kituruki`

Correct already: ja `テュルク語で`, ko `튀르크어로`, zh `突厥语里`, yue `突厥語`, ru `по-тюркски`,
uk `тюркською`, th `ภาษาเตอร์กิก`, id `bahasa Turkik`, vi `tiếng Turk`. ar `بالتركية` is ambiguous in the
same way and should be `بلغة تركية` — grouped here as a NOTE.

**7. `giq.description.*` — "most divergent arm" turned into "earliest to split" in 13 of 18**

English: *"the Kra branch of Kra-Dai — **the family's most divergent arm**"*. This is a statement about
degree of divergence, not about chronology of splitting.

Rendered as *earliest-splitting* by: ja `最も分岐が早い一群`, ko `가장 일찍 갈라진 갈래`,
zh `分化最早的一支`, yue `分化得最早嘅一支`, vi `nhánh phân kỳ sớm nhất`, th `สาขาที่แยกออกเร็วที่สุด`,
id `cabang paling awal memisah`, hi `सबसे पहले अलग हुई शाखा`, de `dem am frühesten abgespaltenen Arm`,
ru `самому рано отделившемуся её крылу`, uk `найраніше відокремленого її крила`,
ar `أبكر أذرع العائلة تفرّعًا`, he `הזרוע שהתפצלה מוקדם מכול`, sw `mkono uliojitenga mapema zaidi`.

Rendered faithfully by fr `le rameau le plus divergent`, it `il braccio più divergente`,
es `el brazo más divergente`, pt `o braço mais divergente`.

Two different claims are being carried under one row. Either bring the 14 into line with the English
(de `dem am stärksten abweichenden Arm der Familie`, ru `самому расходящемуся её крылу`,
zh `分化程度最大的一支`, ja `最も分岐の大きい一群`, …) or, if "earliest split" is what is meant,
change `giq.en` and the four Romance keys. Do not leave both readings in the set.

**7b. `dta.description.zh` — an added superlative**

> `达斡尔语是蒙古语族中**分化最早**、差异最大的语言之一`

English: *"Daur is one of the most divergent of the Mongolic languages: **it split early**"* — "split early",
not "split earliest". zh adds a superlative claim about chronology. yue does not
(`分歧最大嘅語言之一，好早就分咗出嚟`), so zh is the outlier.
Corrected: `达斡尔语是蒙古语族中差异最大的语言之一：它分化得早，…`

**8. `swi.description.{it,es,pt}` — "most" strengthened to "almost all"**

English: *"…voiceless nasals that **most** neighbouring languages have lost."*

- it `che **quasi tutte** le lingue vicine hanno perduto` → `che la maggior parte delle lingue vicine ha perduto`
- es `que **casi todas** las lenguas vecinas han perdido` → `que la mayoría de las lenguas vecinas han perdido`
- pt `que **quase todas** as línguas vizinhas perderam` → `que a maioria das línguas vizinhas perderam`

fr (`la plupart`), de (`die meisten`), zh (`周边多数语言`) are correct.

**9. `mmd.description.ar`, `mlm.description.ar` — "spoken" rendered as "pronounced"**

- mmd: `و**تُنطق** في مقاطعة هوانجيانغ ماونان ذاتية الحكم…` — "and it **is pronounced** in Huanjiang
  Maonan Autonomous County". English: *"is spoken in…"*.
- mlm: `**تُنطق** لغة المولام في مقاطعة لوتشنغ مولام ذاتية الحكم…` — same error.

The same translator uses the correct verb elsewhere in the set (`swi.ar` `ويُتكلَّم بها في جنوب مقاطعة قويتشو`,
`lic.ar` `ويُتكلَّم به في جزيرة هاينان`).

Corrected: mmd `ويُتكلَّم بها في محافظة هوانجيانغ ماونان ذاتية الحكم شمالي غوانغشي في الصين`;
mlm `يُتكلَّم بلغة المولام في محافظة لوتشنغ مولام ذاتية الحكم شمالي غوانغشي في الصين`.

**10. `jiu.description.zh`, `jiu.description.yue` — "Ngwi" replaced by "Lolo"**

English: *"the **Loloish (Ngwi)** branch of Lolo-Burmese"*. The parenthesis carries Bradley's replacement
term *Ngwi*, deliberately given alongside the older *Loloish*.

- zh: `汉藏语系彝缅语族的**彝（倮倮）语支**` — the parenthesis now reads 倮倮 = *Lolo*, i.e. the old term
  repeated rather than the new one, and 倮倮 is a dispreferred (historically pejorative) Chinese label.
- yue: `彝（倮倮）語支` — same.

ja `ロロ（ンウィ）系` and ko `로로(응위)계` transliterate *Ngwi* correctly.

Corrected: zh `彝语支（Ngwi，倮倮语支的新称）` or simply `彝语支（Ngwi）`; yue `彝語支（Ngwi）`.

**11. `twm.description.sw`, `dta.description.sw` — "small" added to the nationality**

- twm: `**Taifa dogo** la Wamonba nchini China lina takriban watu 11,000.` — "the **small** nationality".
  English: *"The Monpa nationality of China numbers about 11,000."*
- dta: `…katika **taifa dogo** lenye watu wapatao 132,000.` — English: *"a nationality of roughly 132,000"*.

`sw` uses plain `taifa` for the nationality in every other row (`kmc`, `shx`, `giq`, `acn`, `mmd`, `blr`, `rbb`).
Corrected: twm `Taifa la Wamonba nchini China lina takriban watu 11,000.`;
dta `…katika taifa lenye watu wapatao 132,000.`

**12. `kmc.description.{ja,ko,zh,yue}` — UNESCO listing given a category the English does not state**

English: *"unaccompanied polyphonic choral singing in parts, **inscribed by UNESCO in 2009**"*.

- ja `2009年ユネスコ**無形文化遺産**`
- ko `2009년 유네스코 **무형문화유산**`
- zh `2009 年列入联合国教科文组织**非物质文化遗产**`
- yue `2009 年列入聯合國教科文組織**非物質文化遺產**`

The four CJK keys name the specific list (Intangible Cultural Heritage). ru/uk stay within the English
(`внесённому ЮНЕСКО в список в 2009 году` / `внесеному ЮНЕСКО до списку 2009 року`), and the rest simply
say "inscribed by UNESCO". Either the English should name the list (which would also disambiguate it from
the `blr` World Heritage listing two rows away) or the four keys should drop the category.

**12b. `nuf.description.zh`, `nuf.description.yue` — a sociolinguistic claim added, and the location reattributed**

English: *"Tonal and unwritten, **Nusu sits beside Lisu, the valley's lingua franca, and Chinese, along the
upper Salween gorge**, among the world's deepest, whose villages were historically reached by rope bridges."*

- zh: `怒苏语有声调，没有文字，**使用者通常还讲**河谷的通用语傈僳语和汉语。**怒族沿**萨尔温江上游峡谷**而居**，…`
- yue: `…**講嘅人平時仲會用**河谷嘅通用語傈僳話同漢語。**怒族住喺**薩爾溫江上游嘅峽谷邊，…`

Two shifts: (a) "Nusu sits beside Lisu and Chinese" — a statement about the language's setting — becomes
"speakers usually also speak Lisu and Chinese", an added claim about individual multilingualism that the
English does not make (contrast `acn.en`, which does make such a claim explicitly, and `blr.en`);
(b) "along the upper Salween gorge", which in the English locates *the language*, is reattributed to *the Nu
people* ("the Nu live along the gorge"). Every other key keeps the English structure
(de `wird Nusu neben Lisu … gesprochen, entlang der oberen Salweenschlucht`).

Corrected: zh `怒苏语有声调、没有文字，与河谷的通用语傈僳语和汉语并存于萨尔温江上游峡谷一带——那是世界上最深的峡谷之一，村寨历来靠索桥出入。`

**13. `acn.description.zh`, `acn.description.yue` — "five-level" added to the Chao tone values**

English: *"written with the **Chao tone values** given in the source."*

- zh `按材料所给的**赵元任五度调值**标写`
- yue `照材料畀嘅**趙元任五度調值**寫嘅`

`五度` (five-level) is an added technical specification. The same phrase in `lic.zh`, `swi.zh`, `mmd.zh`,
`jiu.zh`, `pmi.zh`, `twm.zh`, `mlm.zh` is plain `赵元任式调值` with no `五度`, so this row is also
internally inconsistent with the rest of the zh set.
Corrected: zh/yue `赵元任式调值` / `趙元任式調值`.

**14. `mmd.description.ar` — "nearly all" weakened to "most"**

> `…و**معظمهم** يتقنون كذلك اللهجة الصينية المحلية`

English: *"**nearly all** of them are also fluent in the local Chinese variety"*.
Corrected: `…ويكاد جميعهم يتقنون كذلك اللهجة الصينية المحلية`.

**15. `twm.description.{ru,uk,ar}` and `twm.description.he` — the county's two names swapped, or one dropped**

English gives `Cuona (Tsona)` — Chinese name first, Tibetan in parentheses.

- ru `уезда **Цона (Цуона)**` — reversed: Tsona first, Cuona parenthesised.
- uk `повіту **Цона (Цуона)**` — same.
- ar `مقاطعة **تسونا (تشوونا)**` — same.
- he `מחוז **צונה**` — the parenthetical is dropped altogether; only one of the two names survives.

Because the row later refers back to "the Cuona variety", the order matters for the reader.
Corrected: ru/uk `уезда Цуона (Цона)` / `повіту Цуона (Цона)`; ar `مقاطعة تشوونا (تسونا)`;
he `מחוז צוֹאונָה (צונה)`.

**16. `acn.description.vi` — Longchuan transliterated as an existing Vietnamese city name**

> `ở các huyện **Long Xuyên**, Lương Hà và Lộ Tây thuộc châu Đức Hoành`

陇川 Longchuan is *Lũng Xuyên* in Sino-Vietnamese (陇 = lũng). `Long Xuyên` is the well-known city in
An Giang province, Vietnam — a reader lands on the wrong place. The sibling names in the same sentence
(`Lương Hà` 梁河, `Lộ Tây` 潞西, `Đức Hoành` 德宏) are correct.
Corrected: `ở các huyện Lũng Xuyên, Lương Hà và Lộ Tây thuộc châu Đức Hoành`.

**17. `giq.description.th`, `giq.description.sw` — a comparison the English does not make**

English: *"That makes it disproportionately important for reconstructing the family"* — disproportionate to
what is left open (the row's own next clause supplies "and it is disappearing").

- th `จึงมีน้ำหนักต่อการสร้างตระกูลภาษาขึ้นใหม่**มากเกินสัดส่วนของจำนวนผู้พูด**` — "disproportionate to **the number of speakers**"
- sw `Hilo linaipa uzito **usiolingana na idadi yake** katika ujenzi upya wa familia` — "weight not matching **its numbers**"

Both name a comparand the English withholds. Compare `lic.en`, which *does* say "out of proportion to its
size" — so the distinction is real within this set.
Corrected: th `จึงมีน้ำหนักต่อการสืบสร้างตระกูลภาษามากเกินสัดส่วน`; sw `Hilo linaipa uzito usio na uwiano katika ujenzi upya wa familia`.

**17b. `nuf.description.{ko,zh,yue,th,id,hi,ru,uk,ar,he,sw}` — "over the river" added to the rope bridges**

English: *"whose villages were historically reached by **rope bridges**."* Eleven keys add a crossing object:
ko `강을 건너는 밧줄다리`, zh `横跨江面的索桥`, yue `橫過條河嘅索橋`, th `สะพานเชือกข้ามแม่น้ำ`,
id `jembatan tali di atas sungai`, hi `नदी पार करने वाले रस्सी के पुलों`, ru `по верёвочным мостам через реку`,
uk `мотузяними мостами через річку`, ar `جسور من الحبال فوق النهر`, he `בגשרי חבלים מעל הנהר`,
sw `madaraja ya kamba juu ya mto`.

ja, vi, de, fr, it, es, pt keep the plain English. Low-harm, but it is an addition and it splits the set;
either add "over the river" to `nuf.en` or drop it from the eleven.

**18. `lic.description.ru`, `lic.description.fr` — "settlement" rendered as "colonisation"**

English: *"arriving long before **Chinese settlement of the island**."*

- ru `задолго до китайской **колонизации** острова`
- fr `bien avant la **colonisation** chinoise de l'île`

`колонизация` / `colonisation` carry a political charge the neutral English "settlement" does not, and this
row concerns an ethnic-minority/Han relationship where the wording is not incidental. uk gets it right with
`заселення`; de `Besiedlung`, it `insediamento`, es `asentamiento`, pt `assentamento` are all neutral.
Corrected: ru `задолго до китайского заселения острова`; fr `bien avant le peuplement chinois de l'île`.

**19. `mmd.description.it` — "only … still" dropped**

> `La nazionalità maonan conta circa 124.000 persone, ma **i parlanti sono all'incirca 30.000**;`

English: *"but **only some 30,000 still** speak the language"*. Both the restrictive "only" and the "still"
(which carries the language-shift point the rest of the sentence goes on to make) are gone; what remains is
a flat count. es `pero solo unos 30.000 hablan`, fr `mais quelque 30 000 seulement parlent`, ru `но языком
владеют примерно 30 000` all keep the restriction.
Corrected: `…ma solo circa 30.000 parlano ancora la lingua;`

**20. `hi.description` across 9 rows — the word for "tone" is unstable, and one choice is wrong**

Hindi uses five different renderings for the same English term inside this one set:

| row | English | hi |
|---|---|---|
| kmc | tone system | `स्वराघात-प्रणाली` |
| acn | tonal / Chao tone numbers | `तानिक` / `चाओ स्वर-अंकों` |
| lic, swi, mmd | tone-category number | `स्वराघात-वर्ग की संख्या` |
| jiu, pmi | tonal / Chao tone values | `स्वराघाती` / `चाओ के स्वराघात-अंकों` |
| mlm | Chao tone values | `चाओ के स्वरमान अंकों` |
| nuf, clk | tonal | `सुरभेदी` |
| twm | tonal / Chao tone values | `सुर-भाषा` / `चाओ सुर-मान` |
| rbb | tone | `तान` |

`स्वराघात` is the Hindi term for **stress/accent**, not tone, so `स्वराघात-प्रणाली` (kmc) and
`स्वराघात-वर्ग` (lic/swi/mmd) mistranslate the English. Pick one term — `तान` (used correctly in rbb) or
`सुर` — and apply it across all nine rows: `तान-प्रणाली`, `तान-वर्ग की संख्या`, `तानिक`,
`चाओ के तान-मान`.

**21. `peh.description.{ja,ko,zh,yue,vi}` — Santa/Dongxiang name order reversed**

English: *"Bonan, **Santa (Dongxiang)**, Monguor and Eastern Yugur"* — the endonym Santa is primary, the
Chinese name Dongxiang parenthesised. ja `東郷語（サルタ）`, ko `둥샹어(산타)`, zh `东乡语（撒尔塔）`,
yue `東鄉語（撒爾塔）`, vi `Đông Hương (Santa)` all reverse it. de, fr, ru, id, sw etc. keep the English
order. Same information, but the set is no longer uniform on which name is being presented as primary.

**21b. `dta.description.zh`, `dta.description.yue` — direction dropped**

English: *"more than two thousand kilometres **west of** the rest of the language"*.
zh `与内蒙古、黑龙江的其余人群**相距**两千多公里` and yue `同內蒙古、黑龍江嘅其餘人**相隔**兩千幾公里`
give only a distance; the westward direction, which is the geographic point of the sentence, is gone.
Corrected: zh `在内蒙古、黑龙江其余人群以西两千多公里处`.

**22. `orh.description.th` — a gloss added to "exclusive"**

> `คือแบบรวมและ**แบบไม่รวมผู้ฟัง**`

English: *"an inclusive and an exclusive"* with no gloss. th spells out "not including **the listener**".
Accurate but added, and no other key glosses the pair.

### NOTE

**23. `acn.description.zh` — "and other counties" added.** `分布在中国云南德宏州的陇川、梁河和潞西**等**县` —
`等` implies the list is open. English names exactly three counties. Corrected: drop `等`.

**24. `kmc.description.uk` — agreement error.** `п'ятнадцять за традиційним лічбою` — `лічба` is feminine;
read `за традиційною лічбою`.

**25. `giq.description.ja` — Zhenfeng written with a different character than zh/yue.** ja `鎮豊のリスト`
vs zh `镇丰的词表` / yue `鎮豐嘅詞表`. The English gives only romanised *Zhenfeng*; the CJK keys have to
choose characters and should agree. (Whether 贞丰 is the intended county is a question for the
English-accuracy pass, not this one.)

**25b. `dta.description.ja`, `dta.description.ko` — "(Tarbagatai)" added to Tacheng.**
ja `塔城（タルバガタイ）`, ko `타청（타르바가타이）`. The English says only *Tacheng*. Harmless but an
addition; also, ko uses fullwidth `（）` inside a Korean string where the rest of the ko set uses `()`.

**26. `acn.description.ar`, `acn.description.de` — small referent shifts.**
ar `في **مقاطعات** لونغتشوان…**بولاية** دهونغ` uses "provinces … state" for English "counties … prefecture"
(`محافظات … ولاية` would be closer, and `swi.ar` does use `محافظة` for a county — inconsistent).
de `**Achang-Sprecher** verwenden gewöhnlich auch Dai` narrows English *"Achang people commonly also use"*
to speakers of the language.

**27. `lic.description.sw` — "history" added.** `uzito wake katika kujenga upya **historia ya** familia hii`
for English *"reconstructing the family"* (i.e. the proto-language, not its history).

**28. `swi.description.he` — "divinatory" rendered as "magical".** `סימון פולחני ו**קוסמי**`; `קוסמי` is
"of magic/wizardry". Read `סימון פולחני וניחושי` or `…ולצורכי קסם וניחוש`.

**29. `jiu.description.ru`, `jiu.description.uk` — Youle transliterated as Yuele.** ru `юэлэ`, uk `юеле`
for 攸乐 *Youle*. Expected `юлэ` / `юле` (or `ю-лэ`).

**30. `twm.description.ko` — fullwidth parentheses and added hanja.** `민족명 먼바（門巴）`, `춰나（초나）`
— fullwidth brackets in a Korean string, and 門巴 is an addition (harmless, but the rest of the ko set uses
halfwidth `()` and adds hanja only for language names, e.g. `lic.ko` `하이어(리어, 黎語)`).

**31. `mlm.description.sw` — "bilingual" softened to "have long used".**
`Wazungumzaji wake wamekuwa **wakitumia** lahaja ya Kichina ya eneo hilo kwa muda mrefu` for English
*"have been **bilingual in** the local Chinese variety for a long time"*. Read `wamekuwa wakizungumza lugha
mbili — Kimulam na lahaja ya Kichina ya eneo hilo — kwa muda mrefu`.

**32. `mlm.description.ja` — branch term inconsistent within the ja set.** `カム・スイ語群` here vs
`カム・スイ語派` in `kmc.ja` and `swi.ja` for the same English *"Kam-Sui branch"*. Also `mmd.ja` uses `語群`.
Pick one.

**33. `clk.description.zh`, `clk.description.yue` — subject shifted from the language to the people.**
English: *"**[Idu] is** known for the Igu, its priest-shamans"*. zh `**义都人**还以其祭司兼巫师伊古闻名`,
yue `**義都人**仲有啲…伊古好出名` attribute the fame to the Idu people. Every other key keeps the language
as subject (fr `l'idu … doit sa renommée aux Igu`).

**34. `clk.description.ar` — "shamans" rendered as "sorcerers".** `بكهنتها **السحرة** المعروفين بالإيغو`.
`سحرة` = sorcerers/magicians. Read `بكهنتها الشامانيين` or `بكهانها الوسطاء الروحيين`.

**35. `blr.description.zh`, `blr.description.yue` — a branch alias added.**
`南亚语系巴朗语支**（布朗-佤语支）**` — the parenthetical is not in the English (*"the Palaungic branch"*),
and it pre-empts the row's later, more specific point about the Waic side.

**36. `blr.description.vi`, `rbb.description.vi` — Dai rendered as "Thai".** blr `họ cùng **người Thái** đã
chăm sóc`, `tiếng Thái (Tai Lue)`; rbb `thường dùng thêm **tiếng Thái** và tiếng Hán`; also `acn.vi`
`tiếng Thái (Tai Nuea)`. English distinguishes *Dai* (傣, a Chinese nationality) from *Thai*; Vietnamese has
its own Thái people, so the reader can land on the wrong group. Consider `người Đại (Dai)` / `tiếng Đại
(Tai Lue)`, with the exonym kept in the parenthesis. Flagged as NOTE rather than FIX because it is a
consistent, defensible Vietnamese convention — but it is a decision that should be made once for the set.

**37. `blr.description.hi` — Jingmai as "Qingmai".** `चिंगमाई पर्वत` for 景迈 *Jingmai*; expected `जिंगमाई`.

**38. `rbb.description.ru`, `rbb.description.uk` — awkward rendering of "not readily mutually intelligible".**
ru `три основных варианта, **которые нелегко понимают друг друга**` (the *varieties* understand each other);
uk `три основні різновиди, **що нелегко порозумілі між собою**` (`порозумілі` is not a Ukrainian word).
Meaning survives, phrasing does not. Read ru `три основных варианта, которые с трудом взаимопонятны`;
uk `три основні різновиди, що погано взаємозрозумілі`.

**39. `srh.description.zh`, `srh.description.yue` — "stone fortress" rendered as "stone city".**
`意为**石头城**` / `解作**石頭城**`. 石头城 is the conventional Chinese gloss of 塔什库尔干 and so is
defensible, but the English says *fortress* and the row's point is the fortification. Consider `石堡`/`石头堡垒`.

**40. `srh.description.sw` — "most" softened to "many".** `Wasemaji wake ni **wengi wa** watu ambao China
inawaainisha…` for English *"Its speakers are **most of** the people China classifies…"*. Read `ni walio
wengi miongoni mwa watu ambao…`.

**41. Structural drift, ja/ko throughout (no action proposed).** ja and ko consistently split long English
sentences: lic (en 6 → ja 9, ko 8), swi (5 → 9/8), rbb (7 → 10/10), blr (6 → 9/10), mmd (6 → 8/7),
giq (5 → 7/8), peh (5 → 8/7). This is idiomatic for both languages and the content survives; recorded only
because the brief asks for sentence-count drift. The `orh.de` (5 → 7) and `blr.de` (6 → 7) splits are the
same phenomenon. The one structural drift that is *not* idiomatic splitting is finding **#2** (swi frame).

---

## What was checked and found clean

- **Numbers and dates**: every figure in all 324 strings, across five numeral systems plus CJK/Korean
  myriad notation and spelled-out numerals. Zero additions, zero contradictions.
- **Wrong-language contamination**: no string contains a stretch of a language other than its target.
  (Latin-script proper nouns, romanised forms, `IPA`, `RPA`, `Cờ Lao`, `水书`, `水书先生`, `Plang`,
  `Prinmi`, `Ho Ne`, `kgal laox`, `Maingtha`, `Ngochang` are deliberate and consistent across keys.)
- **The named hedges of the brief** all survive in all 18 keys where the English has them:
  `orh` "the source consulted here labels them the opposite way round" (except zh/yue, #6);
  `rbb` "records no tone, though tone has been reported for neighbouring Rumai villages" (all 18 intact);
  `rbb` "not readily mutually intelligible" (all 18 intact, two awkward, #38);
  `dta` "though the link is debated" (all 18 intact);
  `nuf` "whether its branch is Loloish or Nungish is debated" (all 18 intact);
  `srh` "though spoken nearby and often grouped with them as a Pamir language" (all 18 intact);
  `mmd` "rated vulnerable" (all 18 intact).
- **Relationship direction**, the highest-risk category in this set, is correct almost everywhere:
  `twm` "cousin of Tibetan rather than a dialect / closely related but not descended from it" — all 18 correct;
  `clk` "Bokar, a variety of Adi" read as an appositive, not as two separate languages — all 18 correct;
  `srh` "Tajik proper is Western Iranian … Sarikoli is Eastern Iranian" — all 18 correct;
  `giq`/`lic` "sister to X and Y rather than a member of either" — all 18 correct;
  `shx` nationality-vs-language split — all 18 correct;
  `pmi` administrative undercount logic — all 18 correct.
  The exceptions are #1 (mmd Chadong), #3 (nuf pt), #7 (giq divergence) and #12b (nuf zh/yue).
