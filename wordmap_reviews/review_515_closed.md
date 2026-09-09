# Review pass 8 — the ten under-scrutinised keys (de fr it es pt ru uk sw id vi)

Scope: `LANG_DATA['<code>'].meta.description` in `wordmap_meta.js` and the matching blocks in
`lang_names.js`, for kmc gqu shx peh orh acn lic swi mmd jiu pmi twm dta mlm nuf clk blr rbb srh.
Lens: naturalness, linguistic terminology, false friends, proper names, label-vs-prose. Facts assumed correct.

**No language is clean across all nineteen rows.** Every one of the ten has at least one grammar or
terminology defect; `sw`, `pt`, `uk` and `vi` have systemic ones.

Severity: BLOCKER = wrong meaning / ungrammatical / misleading to a native reader.
FIX = clearly substandard or internally inconsistent. NOTE = stylistic, or a judgement call worth recording.

---

## A. Cross-row defects that affect every key

1. **NOTE — all keys, `gqu` label vs prose.** `lang_names.js` calls the row Green Gelao
   (`de:'Grün-Gelao'`, `fr:'Gelao vert'`, `it/es/pt:'Gelao verde'`, `ru:'Зелёный гэлао'`,
   `uk:'Зелений ґелао'`, `sw:'Kigelao cha Kijani'`, `id:'Bahasa Gelao Hijau'`, `vi:'Tiếng Cờ Lao Xanh'`),
   but every description says the row is **Central** Gelao — de "Diese Zeile ist Zentral-Gelao (Qau/Klau)",
   fr "le gelao central (qau/klau)", ru "центральный гэлао", vi "Cờ Lao Trung bộ", sw "Gelao ya Kati".
   The map label and the prose name two different lects. Present in English too, so it is a data decision,
   not a translation defect — but if the label stays "Green", the ten translations inherit the contradiction.

2. **FIX — `twm`, keys de fr it es pt ru uk sw.** The prose ethnonym does not match the label.
   Labels: de `'Tshona-Monpa'`, fr/it/es/pt `'monpa de Tsona'`, ru `'Цонаский монпа'`,
   uk `'Цонаська монпа'`, sw `'Kimonpa cha Tsona'`. Prose in all eight: **Monba / монба / Monba**
   (de "Die chinesische Nationalitätenbezeichnung Monba", fr "L'ethnonyme chinois monba",
   it "L'etnonimo cinese monba", es "El etnónimo chino monba", pt "O etnônimo chinês monba",
   ru "Китайский этноним монба", uk "Китайський етнонім монба", sw "Jina la kabila la Kichina Monba").
   Only `id` (Monpa/Monpa) and `vi` (Môn Ba/Môn Ba) are self-consistent. Pick one spelling per language and
   use it in both files.

3. **FIX — `ru`/`uk`, «Цона (Цуона)».** ru `twm` "уезда Цона (Цуона)", uk "повіту Цона (Цуона)".
   The English parenthetical is the *Tibetan* name Tsona beside Chinese Cuona; in Cyrillic both are Цона,
   so this prints one place under two spellings, and «Цуона» is not a Palladius rendering of *cuo-*
   (which is цо-). Corrected: ru "уезда Цона (тиб. Цона)" or simply "уезда Цона";
   uk "повіту Цона". Also the labels `ru:'Цонаский монпа'` / `uk:'Цонаська монпа'` build a malformed
   adjective from Цона: the Russian/Ukrainian form is **цонский / цонський** — and the prose already uses
   "цонскую разновидность" / "цонський різновид", contradicting its own label.

---

## B. German (`de`)

4. **BLOCKER — `shx`.** "von seinen Sprechern Ho Ne **'Bergleute'** genannt".
   `Bergleute` means **miners**, not "mountain people". Same false-friend class as the Arabic
   "Greece for Yunnan" finding. Corrected: `von seinen Sprechern Ho Ne 'Bergmenschen' genannt`
   (or 'Bergbewohner'). Compare it "gente di montagna", es "gente de la montaña", fr "gens de la montagne",
   all correct.

5. **BLOCKER — `peh`.** "in der **Mongolisch, Türkisch, Tibetisch und Chinesisch** seit Jahrhunderten
   übereinanderliegen". `Türkisch` = **Turkish (of Turkey)**; the Sprachbund contains Turkic. German
   distinguishes *Türkisch* from *Turksprachen* — and the same file gets it right in `srh`
   ("bedeutet in einer **Turksprache** Steinfestung"), so this is inconsistent as well as wrong.
   Corrected: `in der mongolische, turkische, tibetische und chinesische Sprachen seit Jahrhunderten
   übereinanderliegen`.

6. **BLOCKER — `shx`.** "das Ethnonym umfasst **dreiviertel Millionen** Menschen". Not German: *Million*
   cannot be plural after *dreiviertel*. Corrected: `das Ethnonym umfasst eine Dreiviertelmillion Menschen`.

7. **FIX — `rbb`.** "das auf dem **höchsten Grund** steht". Calque of "on the highest ground";
   *Grund* does not carry that sense. Corrected: `das auf der höchsten Stelle des Dorfes steht`.

8. **FIX — `orh`.** "**Ihre Pronomen der 1. Person Plural sind zwei**, ein inklusives und ein exklusives".
   Word-for-word English ("Its 1PL pronouns are two"). Corrected:
   `Es hat zwei Pronomen der 1. Person Plural, ein inklusives und ein exklusives`.
   (The same calque recurs in fr, it, es, pt — see 15, 24, 33, 41.)

9. **FIX — `dta`.** "die Handbücher beschreiben sie **eher als recht innovativ denn als konservativen
   Außenseiter**". The comparison mixes a predicative adjective with an accusative noun phrase.
   Corrected: `die Handbücher beschreiben sie eher als innovativ denn als konservativen Außenseiter`
   (and drop *recht*, which adds nothing).

10. **FIX — `shx`.** "wird meist **auf einen eigenen Zweig gestellt**" — calque of "put on its own branch".
    Corrected: `bildet meist einen eigenen Zweig` / `wird meist in einen eigenen Zweig gestellt`.

11. **FIX — `gqu`.** "Und was überlebt, ist nicht **eine Sprechweise**, sondern mehrere".
    *Sprechweise* = manner of speaking, not a lect. Corrected: `ist nicht eine Sprachform, sondern mehrere`.

12. **NOTE — `twm`.** "Monba ist also ein **Cousin** des Tibetischen" — English metaphor left in place;
    German linguistic prose prefers `ein Seitenverwandter des Tibetischen`. Same calque in it ("cugino"),
    es ("primo"), pt ("primo"), ru ("двоюродным братом"), uk ("двоюрідним братом"), sw ("binamu").
    Only vi rewrites it ("là họ hàng chứ không phải phương ngữ").

13. **NOTE — `de` internal inconsistency, "Chao tone values".** Four renderings across the nineteen:
    `Chao-Tonziffern` (acn, jiu, pmi), `Chao-Tonwerte` (twm), `Chao-Werte` (lic, swi, mmd),
    `Chao-Tonwerten` (mlm). The English is uniformly "Chao tone values"; standardise on `Chao-Tonwerte`.
    Also: `unwritten` is `schriftlos` in peh/orh/acn/jiu/pmi/twm/nuf/clk/srh but
    `Eine eigene Schrift gibt es nicht` in mlm — which says something else (no script *of its own*).
    Also: `pmi` uses en dashes `–` where all other rows use em dashes `—`.

14. **NOTE — `dta` label vs prose.** Label `de:'Dagurisch'`, prose "Dagur ist eine der abweichendsten
    mongolischen Sprachen". Both forms are acceptable German but should not alternate; and
    `orh` "des Großen Chingan" wants `des Großen Hinggan-Gebirges`.

---

## C. French (`fr`)

15. **FIX — `orh`.** "**Ses pronoms de première personne du pluriel sont deux**, un inclusif et un exclusif".
    Same English calque as 8. Corrected: `Elle a deux pronoms de première personne du pluriel, un inclusif
    et un exclusif`.

16. **BLOCKER — `rbb`.** "trois variétés principales qui **ne s'entendent pas aisément entre elles**".
    *s'entendre* reads as "do not get along". Corrected:
    `trois variétés principales qui ne sont pas aisément intercompréhensibles`.
    This is also the third of three renderings of one concept: jiu/twm "mutuellement intelligibles",
    srh "intercompréhensibles", rbb "s'entendent". Standardise on **intercompréhensible**.

17. **FIX — `dta`.** "un groupe de **soldats bannerets** daur". *Banneret* is a French feudal rank
    (chevalier banneret), not a Qing bannerman. Corrected:
    `un groupe de soldats daur des Bannières`. Same row: `les Kitan` → French uses **les Khitans**.

18. **FIX — `srh`.** "ce nom signifie forteresse de pierre **en turcique**". *Turcique* is not standard
    French; and `peh` in the same key writes "où mongol, **turc**, tibétain et chinois se superposent".
    Corrected: `ce nom signifie « forteresse de pierre » dans une langue turque`.

19. **FIX — `srh`.** "**Ses locuteurs sont la plupart de ceux** que la Chine classe dans sa nationalité
    tadjike". Calque of "are most of the people". Corrected:
    `Ses locuteurs constituent la majorité de ceux que la Chine classe dans sa nationalité tadjike`.

20. **FIX — `fr` internal inconsistency, 县 (xian).** Rendered `district` in peh (Jishishan), acn, swi
    (Sandu), twm (Cuona), pmi (Muli), srh (Tachkourgan) and `xian` in mmd (Huanjiang), mlm (Luocheng),
    nuf (Bijiang), clk (Zayü). Same administrative unit, two words. Pick one — `xian` is the more precise,
    since `district` is already needed for the Indian districts of Tawang and Dibang.

21. **FIX — `fr` internal inconsistency, family name.** `kra-daï` in kmc, gqu, mmd, mlm but `kra-dai`
    in lic, swi. Standardise (`kra-daï` is the usual French spelling).

22. **FIX — `fr` typography.** Two apostrophe styles: straight `'` in kmc, gqu, shx, peh, orh, lic, swi,
    jiu, pmi, twm, dta; curly `’` in acn, mmd, mlm, nuf, clk, blr, rbb, srh. Also the required space before
    `;` is missing twice: mmd "parlent la langue; presque tous", mlm "n'a pas d'écriture; les formes" —
    every other row has " ; ".

23. **FIX — `jiu`.** "Les Jino **sont la plus récemment reconnue** des cinquante-six nationalités de Chine".
    Plural subject, singular feminine predicate. Corrected:
    `Les Jino forment la nationalité reconnue le plus récemment parmi les cinquante-six de Chine`.
    Same defect in it and es (see 30, 38); pt gets it right.

24. **NOTE — `shx`.** "d'une nationalité et de la langue qui porte son nom **qui se sont détachées**" —
    two chained *qui* and a verb that means "came off/detached". Better:
    `... et de la langue qui porte son nom, l'une et l'autre ayant divergé`.
    Same row: "on le place **sur** une branche à part" → `dans une branche à part`.

25. **NOTE — `nuf`.** "l'anong et la variété proche du derung **sont noungs**" — an ethnonym used as an
    adjective; French would say `relèvent du noungique`. `pmi` again uses en dashes where the rest of
    the key uses em dashes.

---

## D. Italian (`it`)

26. **BLOCKER — `nuf`.** "**Tonale e priva di scrittura**, il nusu si parla accanto al lisu".
    *priva* is feminine; the subject *il nusu* is masculine. Corrected:
    `Tonale e privo di scrittura, il nusu si parla accanto al lisu`.

27. **BLOCKER — `clk`.** "**Priva di scrittura e tonale**, l'idu ha un elaborato sistema ... **ed è nota**
    per gli Igu". Two agreement errors on masculine *l'idu*. Corrected:
    `Privo di scrittura e tonale, l'idu ha un elaborato sistema di classificatori nominali ed è noto per gli
    Igu`.

28. **BLOCKER — `lic`.** "**Il hlai** (li) è uno dei rami primari". Italian does not use *il* before a
    graphic h-cluster; the same key writes "L'ho ne" and "Lo she". Corrected: `L'hlai (li) è uno dei rami
    primari`.

29. **BLOCKER — `jiu`.** "nel Xishuangbanna" and "del Xishuangbanna". Words beginning in *x-* take
    *lo/nello/dello* in Italian, and `blr`/`dta` in the same key do it correctly ("nello Xishuangbanna",
    "nello Xinjiang"). Corrected: `nello Xishuangbanna` … `dello Xishuangbanna`.

30. **FIX — `gqu`.** "il braccio più divergente della famiglia, **sorella** dei rami tai e kam-sui".
    Feminine apposition to masculine *braccio*. Corrected:
    `il braccio più divergente della famiglia, fratello dei rami tai e kam-sui`.
    (Identical gender defect in es — see 37.)

31. **FIX — `peh`.** "in cui mongolico, **turco**, tibetico e cinese si sovrappongono".
    *Turco* = Turkish; Italian for Turkic is **turcico**, and the same key uses it correctly in `srh`
    ("fortezza di pietra in turcico"). Corrected: `in cui mongolico, turcico, tibetico e cinese …`.

32. **FIX — `dta`.** "un gruppo di **soldati dei vessilli** daur" — *vessillo* is a standard/ensign; the
    Qing institution is **le Bandiere** in Italian, and `orh` in the same key already uses *bandiera* for
    the same Chinese 旗 ("bandiera autonoma orocenia"). Corrected: `un gruppo di soldati delle Bandiere daur`.

33. **FIX — `orh`.** "**I suoi pronomi di prima persona plurale sono due**". Calque as in 8.
    Corrected: `Ha due pronomi di prima persona plurale, uno inclusivo e uno esclusivo`.

34. **FIX — `blr`.** "i parlanti **si chiamano da sé** Plang". Not idiomatic. Corrected:
    `i parlanti si autodefiniscono Plang` (or `chiamano se stessi Plang`).
    Same row: "appartiene al **lato** waico" → `al versante waico` (calque of "side"; recurs in es, pt, ru,
    uk, sw, id).

35. **NOTE — `it` internal inconsistency.** "unwritten": `La lingua non si scrive` (peh, orh) vs
    `non ha scrittura` (acn, jiu, pmi, mmd, mlm) vs `priva di scrittura` (nuf, clk) vs
    `non ha una scrittura propria` (twm, blr, rbb). Mutual intelligibility: `non mutuamente intelligibili`
    (jiu) vs `non sono mutuamente comprensibili` (twm, srh) vs `non si comprendono facilmente fra loro`
    (rbb). `pmi` uses en dashes against the key's em dashes; `pmi` also has
    "**conta per difetto** la comunità" → `sottostima la comunità`.

---

## E. Spanish (`es`)

36. **BLOCKER — `clk`.** "En China **se habla** en el distrito de Zayü … **por unas 1.000 personas**".
    Spanish does not allow an expressed agent with impersonal *se*. The same key does it right in `acn`
    ("Lo hablan unas 30.000 personas"). Corrected:
    `En China la hablan unas 1.000 personas en el distrito de Zayü, en Nyingchi, Tíbet, oficialmente
    clasificadas como parte de la nacionalidad lhoba`.

37. **FIX — `gqu`.** "el brazo más divergente de la familia, **hermana** de las ramas tai y kam-sui".
    Corrected: `el brazo más divergente de la familia, hermano de las ramas tai y kam-sui`.

38. **FIX — `twm` and `srh`.** "y **ambas no son** mutuamente inteligibles" / "y **ambos no son**
    mutuamente inteligibles". Spanish negates the whole predicate, not *ambos*. Corrected:
    `y no son mutuamente inteligibles` (or `ninguna de las dos es inteligible para la otra`).

39. **FIX — `peh`.** "El bonan pertenece al **Sprachbund** de Gansu-Qinghai". A German term left
    untranslated where Spanish has one; fr ("aire linguistique"), it ("lega linguistica"), ru/uk
    ("языковой союз"/"мовний союз") and vi ("liên minh ngôn ngữ") all translate it. Corrected:
    `pertenece al área lingüística (Sprachbund) de Gansu-Qinghai`. Same defect in pt and id (see 46, 68).

40. **FIX — `es` internal inconsistency, 县 (xian).** `condado` in swi, mmd, mlm, twm vs `distrito` in peh,
    acn, pmi, nuf, clk, srh — while `distrito` is also needed for Tawang. Standardise on `condado` for the
    Chinese unit.

41. **FIX — `orh`.** "**Sus pronombres de primera persona del plural son dos**" (calque, as 8) and
    "lo que **retiró de golpe al vocabulario** la mayor parte de su uso diario" (wrong valency).
    Corrected: `Tiene dos pronombres de primera persona del plural, uno inclusivo y otro exclusivo` …
    `lo que privó de golpe al vocabulario de la mayor parte de su uso diario`.

42. **FIX — `nuf`.** "La nacionalidad es **sólo** una categoría administrativa" — the accented form was
    dropped by the RAE in 2010 and the rest of the key uses unaccented *solo* (gqu "solo tiene",
    jiu "solo en 1979"). Corrected: `es solo una categoría administrativa`.

43. **FIX — `jiu`.** "Los jino **son la más recientemente reconocida** de las cincuenta y seis
    nacionalidades". Corrected: `Los jino son la nacionalidad reconocida más recientemente de las cincuenta
    y seis de China`.

44. **NOTE — `es` typography.** RAE style attaches the em dash to the enclosed text with no inner spaces.
    `pmi` does this ("—unas 43.000 personas en el censo de 2010—"); kmc, gqu, shx, orh, srh use spaced
    dashes. Standardise on the `pmi` form.

45. **NOTE — `pmi`/`srh`.** "la cifra de la nacionalidad … **se queda por debajo de** la comunidad" →
    `subestima el tamaño de la comunidad`. `srh` mixes *lengua irania oriental* and *otra rama del iranio
    oriental* in one paragraph; pick one adjective. `dta` "proyectos latinos" reads as "Latin projects" →
    `proyectos de alfabeto latino`.

---

## F. Portuguese (`pt`)

46. **BLOCKER — whole key: European and Brazilian orthography are mixed row by row.**
    There is a single `pt` description string (pt_eu / pt_br exist only in `lang_names.js`), and it
    alternates:
    * EU: kmc "polifónico", "O seu sistema"; shx "etnónimo"; gqu "está a desaparecer", "no Vietname";
      orh "autónoma"; pmi "registados"; clk "registo"; blr "Património Mundial"; rbb "registado";
      srh "autónomo"; mmd "com a transmissão às crianças **a enfraquecer**".
    * BR: swi "condado **autônomo**", "**de fato**"; mmd "condado **autônomo**"; mlm "condado **autônomo**";
      dta "**quilômetros**"; twm "O **etnônimo** chinês"; lic "esta linha **registra**".
    `shx`+`twm` put *etnónimo* and *etnônimo* in the same corpus; `mmd` is Brazilian in spelling and
    European in syntax within one sentence. Choose one variety for the `pt` string and normalise all
    nineteen.

47. **FIX — whole key: three spellings of the family name.** `família cradai` (kmc), `do cradai` (gqu),
    `do kra-dai` (lic, swi), `família cra-dai` (mmd, mlm). Standardise on `kra-dai`.

48. **FIX — `blr`.** "as antigas florestas de chá do monte Jingmai, **que eles e os dai cuidam** há mil
    anos". *Cuidar* requires *de*. Corrected: `de que eles e os dai cuidam há mil anos`
    (or `que eles e os dai tratam há mil anos`).

49. **FIX — `rbb`.** "é o edifício mais **notório** da aldeia". *Notório* means well-known/notorious, not
    prominent — a false friend imported from English "notable". Corrected:
    `é o edifício mais imponente da aldeia`.

50. **FIX — `dta`.** "um grupo de **soldados de estandarte** daur". Corrected:
    `um grupo de soldados daur das Bandeiras` (pt.wikipedia: *Oito Bandeiras*).

51. **FIX — `orh`.** "**Os seus pronomes de primeira pessoa do plural são dois**" (calque, as 8) and
    "do outro lado do **limite**, em Heilongjiang" (bare *limite* for a provincial border; peh at least
    says "limite provincial"). Corrected: `Tem dois pronomes de primeira pessoa do plural, um inclusivo e
    outro exclusivo` … `do outro lado da fronteira provincial, em Heilongjiang`.

52. **FIX — `peh`.** "pertence ao **Sprachbund** de Gansu-Qinghai" — as 39. Corrected:
    `pertence à área linguística (Sprachbund) de Gansu-Qinghai`.

53. **NOTE — `srh`.** "os seus parentes mais próximos são o **xugni** e o **rushani**" — one name
    Lusophonised, the other not, in the same clause. Either `xugni e rushani` or `shughni e rushani`.
    Same row `Caracoram` → the usual Portuguese form is `Caracórum` (or keep `Karakoram`).
    `nuf` coins `nungue`/`nungues` for Nungish; acceptable but non-standard.

---

## G. Russian (`ru`)

54. **BLOCKER — `mlm` label vs prose.** Label `ru:'Мулам'`; prose throughout uses **Мулао**
    ("Мулао распространён…", "Народность мулао…", "Письменности у мулао нет"). Мулао is the correct
    Palladius rendering of 仫佬. Corrected label: `ru: 'Мулао'`. (uk has the identical defect: label
    `'Мулам'`, prose "Мулао".)

55. **BLOCKER — `dta` label vs prose.** Label `ru:'Даурский'`; prose "**Дагурский** — один из самых
    обособленных монгольских языков", "**Дагуров** иногда связывают с киданями". Russian usage is
    даурский / дауры (cf. Даурия), and the uk row is internally consistent on Даурська. Corrected prose:
    `Даурский — один из самых обособленных монгольских языков … Дауров иногда связывают с киданями`.

56. **BLOCKER — `swi`/`mmd`/`mlm`: the Sui language has two Russian names in one corpus.**
    `swi` — "**Суйский** язык", "народность **суй**", label `'Суйский'`;
    `mmd` — "Ближайший родственник — чадун, за ним следует **шуй**";
    `mlm` — "соседствуя в ней с маонань и **шуй**".
    Worse, `swi` names its own script twice in one sentence: "у суй есть собственное письмо — **суй шу**
    水书 … которой мастера **шуйшу** (水书先生) пользуются". Pick one (шуй/шуйский is the Palladius form of
    水) and apply it in all three rows and both files.

57. **FIX — `dta`.** "из бассейна реки **Нэнцзян**". Palladius for 嫩江 is **Нэньцзян** (the soft sign is
    obligatory). Corrected: `из бассейна реки Нэньцзян`.

58. **FIX — `jiu`.** "В этой строке представлена **юэлэ**". 攸乐 Yōulè → Palladius **юлэ**; *юэлэ* would
    render *yuele*. Corrected: `представлена юлэ` (and "Есть две разновидности, **юлэ** и буюань").
    The same error is in uk ("юеле").

59. **FIX — `jiu`.** "Цзино — **самая поздно признанная** из пятидесяти шести национальностей Китая".
    Ungrammatical superlative. Corrected:
    `Цзино — последняя из пятидесяти шести национальностей Китая, получившая признание`.

60. **FIX — `ru` terminology split, 民族.** `народность` in gqu, shx, peh, acn, lic, swi, dta, nuf, clk, blr
    vs `национальность` in jiu ("пятидесяти шести национальностей"), pmi ("численность национальности"),
    srh ("к таджикской национальности"). One concept, two terms. (uk has exactly the same split:
    народність vs національність in jiu, pmi, srh.)

61. **FIX — `pmi`.** "численность национальности … **занижает саму общность**". You can understate a
    figure, not a community. Corrected: `занижает численность самой общности`.
    (uk identical: "занижує саму спільноту".)

62. **FIX — `rbb`.** "три основных варианта, **которые нелегко понимают друг друга**". Varieties do not
    understand each other. Corrected:
    `три основных варианта, носители которых с трудом понимают друг друга`.

63. **FIX — `gqu`.** "**Да и** уцелело не одно наречие, а несколько". *Да и* means "besides"; the English
    is contrastive. Corrected: `И уцелело не одно наречие, а несколько`.

64. **FIX — `blr`.** "относится к **вайской стороне** палаунгской ветви" — calque of "side".
    Corrected: `относится к вайской подгруппе палаунгской ветви`.

65. **NOTE — `srh`.** "сарыкольский **не есть** таджикский язык Таджикистана" — archaic register against
    the rest of the corpus. Corrected: `сарыкольский — не таджикский язык Таджикистана`.
    Same row: `означает по-тюркски каменная крепость` needs quotation marks: `«каменная крепость»`.
    `clk` "в уезде **Цзаюй**" applies Palladius to the Tibetan name Zayü; the Chinese 察隅 gives **Чаюй**.
    `nuf` "Народность — лишь **единая** административная категория" — *единая* = unified; the English says
    *a single* category → `лишь административная категория`. `blr` declines Сишуанбаньна ("Сишуанбаньны")
    where `jiu` leaves it undeclined ("гор Сишуанбаньна").

---

## H. Ukrainian (`uk`)

66. **BLOCKER — `kmc`.** "п'ятнадцять за **традиційним лічбою**". *Лічба* is feminine; the adjective is
    masculine/neuter. Corrected: `п'ятнадцять за традиційною лічбою`.

67. **BLOCKER — `rbb`.** "три основні різновиди, **що нелегко порозумілі між собою**".
    *Порозумілий* is not a Ukrainian word. Corrected:
    `три основні різновиди, носії яких нелегко порозуміються між собою`.

68. **BLOCKER — whole key: Ґ vs Г in Chinese toponyms.** The 2019 orthography renders Chinese *g-* as **Г**.
    The corpus writes `Ґуйчжоу` (kmc, gqu, swi), `Ґуансі` (kmc), `Ґуандуні` (shx ×2), `Ґаньсу` (peh),
    `ґелао` (gqu) — but `Гуансі` and `Гуйчжоу` in mmd and mlm. The same province is spelled two ways
    three rows apart. Normalise to Г: `Гуйчжоу, Гуансі, Гуандун, Ганьсу, гелао`.

69. **FIX — `nuf`.** "тож місце, назване у **словнику**, більше не існує як повіт". In Ukrainian *словник*
    is a **dictionary**; the source is a wordlist. (Russian *словник* does mean "word list" — a genuine
    ru→uk false friend, and the ru row uses it correctly.) Corrected:
    `тож місце, назване у списку слів, більше не існує як повіт`.
    Same row: "нусу **лунає** поряд із лісу" (*лунає* = resounds) → `нусу побутує поряд із лісу`;
    "Народність — лише **єдина** адміністративна категорія" → `лише адміністративна категорія`.

70. **FIX — `jiu`.** "цзіно відомі також як **чаярі**" — not a Ukrainian word, and `blr`/`rbb` in the same
    key use `чаєвирощувальний`. Corrected: `цзіно відомі також як чаєводи`.
    Same row: "Цзіно — **наймолодша за визнанням** із п'ятдесяти шести національностей" is an invented
    phrase → `Цзіно — остання з п'ятдесяти шести національностей Китаю, що дістала визнання`;
    and `юеле` → `юле` (see 58).

71. **FIX — `kmc`.** "а також **баштам-барабанам** і мостам вітру й дощу" — a *tower-drum*, not a drum
    tower. The ru row has it right ("барабанным башням"). Corrected: `а також барабанним вежам`.

72. **FIX — `shx`.** "мова цього імені — **одне-двоє сіл**". Mixed numeral forms. Corrected:
    `мова цього імені — одне-два села`.

73. **FIX — `twm`.** "монба **доводиться тибетській двоюрідним братом**" — feminine antecedent,
    masculine predicate, and the English metaphor. Corrected:
    `монба — не діалект тибетської, а її бічний родич`.

74. **FIX — `uk` terminology splits.** (a) *language family*: `родина` in kmc, gqu, shx, twm, dta vs
    `сім'я` in acn, lic, swi, mmd, jiu, pmi, mlm. (b) 民族: народність vs національність (jiu, pmi, srh) —
    see 60. (c) apostrophes: curly `сім’ї` (acn, mmd, mlm) vs straight `сім'ї` (lic, swi, jiu, pmi) within
    the same key. (d) Сішуанбаньна declined in blr, undeclined in jiu.

75. **NOTE — `blr`.** "належить до **вайського боку** палаунгської гілки" — as 64. Corrected:
    `належить до вайської підгрупи палаунгської гілки`. `orh` "за **межею** в Хейлунцзяні" is too bare →
    `по той бік межі, у Хейлунцзяні`. `mlm` "**Письма мулао не має**" reads ambiguously →
    `Мулао не має письма`. `lic` "його вага … **непорівнянна** з його розміром" says *incomparable*, not
    *disproportionate* → `непропорційно велика як на його розмір`.

---

## I. Swahili (`sw`) — the least-served key, and it shows

76. **BLOCKER — `lic`. "Wali huchukuliwa kuwa wakazi wa kwanza kabisa wa Hainan."**
    *Wali* is the everyday Swahili word for **cooked rice** (and secondarily *governor*). The sentence
    reads "Rice is considered the very first inhabitants of Hainan." Exactly the false-friend class this
    pass was asked to hunt. Corrected:
    `Watu wa Li huchukuliwa kuwa wakazi wa kwanza kabisa wa Hainan` (or `Kabila la Li huchukuliwa …`).

77. **BLOCKER — `orh`. "walikaliwa vijijini miaka ya 1950".**
    *Kukaliwa* is "to be sat upon / occupied", not "to be settled". Corrected:
    `walikalishwa katika vijiji miaka ya 1950`.

78. **BLOCKER — `acn`. Noun-class agreement on the language name.**
    "Kiachang ni mojawapo ya lugha hai zilizo karibu zaidi na Kiburma, na kwa hiyo **lina** manufaa …
    **Linazungumzwa** na watu wapatao 30,000". *Kiachang* is ki-/vi- class; `li-` is ji-/ma-.
    Corrected: `… na kwa hiyo kina manufaa katika kujenga upya tawi la Kiburmi … Kinazungumzwa na watu
    wapatao 30,000 …`.

79. **BLOCKER — `mlm`. Same class error, twice.**
    "**ikisimama** kando ya Kimaonan na Kisui" and "kwa kawaida **hairithishwi** tena kwa watoto"
    (i-/n- concord for ki-class *Kimulam*). Corrected: `kikisimama kando ya Kimaonan na Kisui` …
    `kwa kawaida hakirithishwi tena kwa watoto`.

80. **BLOCKER — `gqu`. Three class errors in one paragraph.**
    "**Hilo linaipa** uzito …" (object marker `-i-` for ki-class *Kigelao* → `-ki-`);
    "**nayo inatoweka**" (n-class for ki-class); "si usemi mmoja bali kadhaa, **vinavyotofautiana**"
    (vi- concord for *semi*). Corrected:
    `Hilo linakipa uzito usiolingana na idadi yake …, nacho kinatoweka …` and
    `si usemi mmoja bali kadhaa, zinazotofautiana kiasi kwamba …`.

81. **BLOCKER — `gqu`. Ki-/Vi- prefix dropped from the language name, against its own label.**
    Label `sw:'Kigelao cha Kijani'`; prose "**Gelao ya Kijani**, Nyekundu na Nyeupe" and
    "Safu hii ni **Gelao ya Kati**" — both the prefix and the *cha* concord are lost. Corrected:
    `… kwamba Kigelao cha Kijani, cha Nyekundu na cha Nyeupe mara nyingi huhesabiwa lugha tofauti.
    Safu hii ni Kigelao cha Kati (Qau/Klau) …`.

82. **BLOCKER — `swi`, `mmd`, `mlm`, `srh`. "Wilaya Huru" for 自治县.**
    *Huru* means **free / liberated**, not autonomous. The same key gets it right in `orh`
    ("Bendera ya **Kujitawala** ya Oroqen"). Corrected:
    `Wilaya ya Kujitawala ya Wasui ya Sandu`, `Wilaya ya Kujitawala ya Wamaonan ya Huanjiang`,
    `Wilaya ya Kujitawala ya Wamulam ya Luocheng`, `Wilaya ya Kujitawala ya Watajiki ya Tashkurgan`.

83. **FIX — `srh` and `dta`. Ki- prefix used for peoples.**
    `srh` "Wilaya Huru ya **Kitajiki** ya Tashkurgan" and "kabila lake la **Kitajiki**";
    `dta` "wanajeshi wa bendera **wa Kidaur**". *Ki-* marks the language; the people take *Wa-*.
    Corrected: `… ya Watajiki …`, `kabila lake la Watajiki`, `wanajeshi Wadaur wa bendera`.

84. **FIX — `sw` terminology split, 民族.** `taifa` (= nation/state) in kmc, gqu, shx, peh, orh, jiu, pmi,
    dta, twm vs `kabila` (= ethnic group) in shx, acn, lic, swi, mmd, mlm, nuf, clk, blr, rbb, srh —
    `shx` uses both in the same paragraph. Pick one; `kabila` is the closer match for 民族.
    Related: `twm` "**Taifa dogo** la Wamonba" and `dta` "**taifa dogo** lenye watu wapatao 132,000" add
    a "small" that is in no source text — drop *dogo*.

85. **FIX — `jiu`. "tawi la Kiloloish (Ngwi)"** — a Swahili prefix glued to an English suffix.
    `nuf` in the same key writes `Kiloloi`. Corrected: `tawi la Kiloloi (Ngwi) ndani ya Kilolo-Burma`
    (also fixes the double Ki- in *Kilolo-Kiburma*).

86. **FIX — `sw`, five renderings of "mutually intelligible".**
    `jiu` "hazieleweki kwa kila mmoja"; `nuf` "lugha nne **zisizoeleweana**" (correct);
    `twm` "wasemaji wa lugha hizo mbili **hawaelewani**" (correct); `rbb` "hazieleweki kwa urahisi kati
    yao"; `srh` "hazieleweki kati yao" and "**hakieleweki kwa pamoja na** Kisarikoli" (garbled).
    Standardise on the *-eleweana / hawaelewani* pattern: e.g. `srh` →
    `… na lugha hizi mbili hazieleweani … na hakieleweani na Kisarikoli`.

87. **FIX — `orh`. "kulungu wao"** — *kulungu* is an African antelope/deer; reindeer is
    `kulungu wa Aktiki` in Swahili usage. As written the Oroqen herd waterbuck. Corrected:
    `wakihama na wanyama wa mawindo na kulungu wao wa Aktiki`.
    (Contrast id, which correctly says "rusa kutub".)

88. **FIX — `shx`. Two defects.**
    "Ni mfano ulio wazi zaidi nchini Uchina **wa taifa na lugha iliyoitwa kwa jina lake kutengana**" —
    ungrammatical. Corrected: `Ni mfano ulio wazi zaidi nchini Uchina wa kutengana kwa taifa na lugha
    inayoitwa kwa jina lake`. And "huwekwa katika **tawi lake yenyewe**" — *tawi* is ji-/ma- class →
    `tawi lake lenyewe`.

89. **FIX — `rbb`. "kijiji cha Wade'ang hujengwa kukizunguka hekalu lake"** — ki- object marker for
    ji-/ma- class *hekalu*. Corrected: `hujengwa kulizunguka hekalu lake la Kibuddha`.

90. **FIX — `nuf`. Two defects.** "**nao** wilaya ya Bijiang ilivunjwa" (wa-/m- connective for an n-class
    noun) → `nayo wilaya ya Bijiang ilivunjwa`; and "mojawapo ya **makorongo marefu kwenda chini**
    duniani" (literally "long going down") → `mojawapo ya makorongo yenye kina kirefu zaidi duniani`.

91. **FIX — `pmi`.** "imegawanyika katika **kundi** la kaskazini na la kusini **yaliyotofautiana**" —
    singular head, plural relative. Corrected: `imegawanyika katika makundi mawili, la kaskazini na la
    kusini, yaliyotofautiana kiasi cha kuhesabiwa kando`.

92. **FIX — `gqu`.** "mkono unaotofautiana zaidi katika familia hiyo" — *mkono* is the body-part arm,
    a calque of the English "arm of the family". Corrected: `tawi linalotofautiana zaidi katika familia
    hiyo`. Same row: "**neno ambatani**" is not Swahili → `neno ambatano`.

93. **FIX — `sw`, "Uchina" vs "China".** `Uchina` in kmc, shx, acn, mmd, mlm, nuf, clk, pmi;
    `China` in lic, swi, jiu, twm, blr, rbb, srh. Standardise (Uchina is the established Swahili name).
    Related splits: `Ubudha` (blr) / `Ubuddha` (pmi) / `Kibuddha` (peh, rbb);
    `Kisino-Kitibeti` (acn, jiu, pmi) / `Kisino-Tibeti` (nuf, clk, twm);
    `wasemaji` / `wazungumzaji` for "speakers"; `othografia` (kmc) / `hati` (lic, swi, dta, blr) for
    orthography.

94. **NOTE — `sw` real-Swahili vocabulary is mostly good.** `upatanifu wa irabu` (vowel harmony),
    `ving'ong'o visivyo ghuna` (voiceless nasals), `uaguzi` (divination), `barakoa` (mask),
    `viainishi vya nomino` (noun classifiers), `wahunzi` (smiths), `kata` (township), `mizimu` (ancestral
    spirits) and `cha kujumuisha / cha kutojumuisha` (inclusive/exclusive) are all correct and idiomatic —
    the failures above are grammatical, not lexical. Two lexical exceptions:
    `nukuu ya IPA` (lic, swi, mmd) uses *nukuu* = "quotation" → `unukuzi wa IPA`; and
    `Bendera ya Kujitawala` (orh) / `wanajeshi wa bendera` (dta) render 旗 as "flag" — unavoidable without
    a Swahili term, but worth a gloss.

95. **NOTE — `clk`.** "**Wingi mkubwa** wa wasemaji wa Kiidu" is a calque of "the great majority" →
    `Wengi wa wasemaji wa Kiidu`; and "si **watu wamoja** wanaosema lugha moja" → `si kabila moja
    linalosema lugha moja`.

---

## J. Indonesian (`id`)

96. **FIX — terminology split, 民族.** `suku` in sixteen rows, **`kebangsaan`** in jiu ("lima puluh enam
    kebangsaan Tiongkok", "status sebagai kebangsaan tersendiri") and pmi ("angka kebangsaan"), and
    **`suku bangsa`** in dta. *Kebangsaan* means nationality in the citizenship sense and is misleading
    for 民族. Corrected: use `suku bangsa` (or `suku`) throughout.

97. **FIX — `peh`.** "Bonan termasuk **Sprachbund** Gansu-Qinghai atau Amdo" — untranslated German, as
    39/52. Corrected: `Bonan termasuk liga bahasa (Sprachbund) Gansu-Qinghai atau Amdo`.

98. **FIX — `shx`.** "Bahasa She yang sebenarnya, yang **penuturnya sendiri sebut** Ho Ne" — the verb is
    missing its prefix. Corrected: `yang disebut penuturnya sendiri Ho Ne 'orang gunung'`.
    Same row: "Yang dituturkan kebanyakan orang She adalah **Tionghoa She**" reads as the *people* →
    `adalah bahasa Tionghoa ragam She`; and "contoh paling jelas … tentang suku dan bahasa yang dinamai
    menurut suku itu **yang telah terpisah**" chains two relatives → `tentang terpisahnya suku dan bahasa
    yang dinamai menurut suku itu`.

99. **FIX — `swi`.** "**persediaan** konsonannya luar biasa besar" — *persediaan* is a stock/supply.
    Corrected: `inventaris konsonannya luar biasa besar`. Same sentence: "termasuk **deret** hambat dan
    nasal praglotalisasi" inserts a "series" that is not in the source → `termasuk hambat dan nasal
    praglotalisasi`.

100. **FIX — `gqu`.** "dan **ia sedang hilang**" — *hilang* is "to be lost/missing"; the sense is
     endangerment. Corrected: `dan ia sedang menghilang` / `dan ia terancam punah`. Same row:
     "kata majemuk **di atas** akar itu" is a calque of "built on that root" → `kata majemuk dari akar itu`.

101. **FIX — `pmi`.** "sehingga angka kebangsaan … **kurang menghitung** komunitas ini". Corrected:
     `sehingga angka suku bangsa itu lebih rendah daripada jumlah komunitas sebenarnya`.

102. **NOTE — `id` minor inconsistencies.** 旗 is `Bendera Otonom Oroqen` (orh) but `prajurit panji`
     (dta) — same institution, two words; *kabupaten* is capitalised in peh/twm and lowercase in acn/nuf/
     clk; `tidak saling dipahami` (jiu, nuf, rbb, srh) vs `tidak saling dimengerti` (twm);
     `dokulek` (nuf, clk) vs `tutur`/`ragam` elsewhere; `blr` "termasuk **sisi** Waik dari Palaung" is the
     "side" calque → `termasuk kelompok Waik`; `lic` "melainkan **saudara ketiganya**" is ambiguous →
     `melainkan saudara bagi ketiganya`; `kmc` "Ortografi itu **berdasar pada**" → `berdasarkan`.
     Indonesian handles Turkic correctly (`Turkik`, peh and srh) — one of only three keys that do.

---

## K. Vietnamese (`vi`)

103. **BLOCKER — `acn`, `blr`, `rbb`: Dai rendered "tiếng Thái" / "người Thái".**
     acn "người A Xương thường dùng thêm **tiếng Thái** (Tai Nuea)"; rbb "thường dùng thêm **tiếng Thái**";
     blr "**tiếng Thái** (Tai Lue)" — and, in the same blr paragraph, "các cộng đồng liên quan ở Myanmar và
     **Thái Lan**" followed by "họ cùng **người Thái** đã chăm sóc suốt một nghìn năm", which now reads as
     *the Thai of Thailand* tending the Jingmai tea forests. Exactly the collision class this pass targets.
     Corrected: gloss the nationality — `tiếng Dai (Thái Đức Hoành, Tai Nuea)`, `tiếng Dai (Tai Lue)`,
     `họ cùng người Dai đã chăm sóc …`.

104. **FIX — label vs prose, six rows.** `lang_names.js` uses Sino-Vietnamese names that the prose then
     ignores: `jiu` label `'Tiếng Cơ Nặc'` / prose "Người **Jino** … núi **Jinuo**";
     `pmi` label `'Tiếng Phổ Mễ Bắc'` / prose "người **Pumi** … tiếng **Pumi** Bắc";
     `dta` label `'Tiếng Đạt Oát Nhĩ'` / prose "Người **Daur** … Tiếng **Daur**";
     `mlm` label `'Tiếng Mục Lão'` / prose "tiếng **Mulam**";
     `nuf` label `'Tiếng Nộ Tô'` / prose "Tiếng **Nusu**";
     `mmd` label `'Tiếng Mao Nam'` / prose "Tiếng **Maonan**".
     Note the prose is otherwise thoroughly Sino-Vietnamese (Quý Châu, Dung Giang, Loan Tử, An Thuận,
     Bác La, Tích Thạch Sơn, Lũng Xuyên, Hộ Tát, Hoàn Giang, La Thành, Bích Giang, Sát Ngung, Mãnh Hải,
     Thụy Lệ), which makes the six pinyin holdouts stand out. Decide per row and match both files.

105. **FIX — `vi` internal inconsistency, "this row".** `Hàng này` in gqu, shx, rbb, mlm ("ở hàng này")
     vs `dòng này` in lic, jiu, pmi, twm. Also `nhánh Tai` (gqu) vs `nhánh Thái` (lic) for the same Tai
     branch; `tái dựng` (gqu, orh) vs `phục nguyên` (acn, lic) for *reconstruction* — Vietnamese linguistic
     usage is `phục nguyên`.

106. **FIX — `gqu`.** "Điều đó khiến nó **nặng ký** một cách bất tương xứng với việc tái dựng ngữ hệ".
     *Nặng ký* is boxing slang. Corrected:
     `Điều đó khiến nó có tầm quan trọng lớn bất tương xứng đối với việc phục nguyên ngữ hệ`.

107. **FIX — `orh`.** "khiến phần lớn công dụng thường ngày của vốn từ mất đi **trong một nhát**".
     Not idiomatic. Corrected: `… mất đi chỉ trong chốc lát`. Same row:
     "**Đại từ ngôi thứ nhất số nhiều của nó có hai**" → `Nó có hai đại từ ngôi thứ nhất số nhiều, một bao
     gộp và một loại trừ` (the terms *bao gộp / loại trừ* themselves are correct).

108. **FIX — `dta`.** "một nhóm **binh lính kỳ binh** người Daur" — *kỳ binh* already means banner troops.
     Corrected: `một nhóm kỳ binh người Daur cùng gia đình họ`.

109. **NOTE — `vi`.** `twm` "nhánh **Bod Đông**" is a coinage → `nhánh Bod phương Đông`;
     `orh` "nguồn tra ở đây" → `nguồn được tra cứu ở đây`; `pmi` mixes SV and pinyin inside one phrase
     ("tại **Taoba** ở **Mộc Lý**"); `kmc` leaves Zhanglu untransliterated beside SV Dung Giang.
     Otherwise `vi` is the strongest key in this set: 旗 is correctly `Kỳ tự trị`, Sprachbund is
     `liên minh ngôn ngữ`, Austroasiatic is `ngôn ngữ Nam Á`, Theravada is `Phật giáo Nguyên thủy`,
     Qiangic is `nhánh Khương`, Turkic is `Turk`, and prefecture/county are distinguished
     (`châu` vs `huyện`) more precisely than the English.
