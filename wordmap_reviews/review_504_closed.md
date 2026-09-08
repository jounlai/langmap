# C — Prose & metadata review: `jiu` `pmi` `twm` `dta` `lic` `swi` `mmd`

Reviewed at commit `6a333f7b`. Files touched by the findings: `wordmap_meta.js`, its mirror
`meta_desc/<code>.js`, `lang_names.js`, `wordmap_data.js`.
`wordmap_meta.js` and `meta_desc/*.js` are byte-identical for all seven descriptions and source
arrays — **every text fix below has to land in both files.**

Severity: **BLOCKER** = false, or points at the wrong language/place; **FIX** = wrong number, or
contradicts the row's own fields; **NOTE** = overstated, stale, or inconsistent.

---

## 1. Factual accuracy of the English (and the `family` / `speakers` / `countries` / `script` fields)

**1. BLOCKER — `lic.coverageNote`: Baoding is not in Baoting county.**
Current: "This row is the Baoding (保定) lect of **Baoting county**, the basis of the 1957 orthography."
The standard-pronunciation lect of the 1957 黎文方案 is **保定村, 抱由镇 (Baoyou town), 乐东黎族自治县
(Ledong Li Autonomous County)** — south-west Hainan, not Baoting. Baoting county is mainly **Qi (杞)**
dialect territory; the confusable name there is 保城 Baocheng. The Ha-dialect / Luohuo (罗活)
sub-dialect attribution is right; only the county is wrong.
Corrected: *"…the Baoding (保定) lect of Baoyou town, Ledong Li Autonomous County, the basis of the
1957 orthography."*
**Knock-on:** `wordmap_data.js:1088` places `lic` at `lat: 18.78, lng: 109.52 // Baoding, Baoting,
Hainan`. Ledong county runs 108°39′–109°24′E, so 109.52 falls *outside* it; Baoyou sits at ≈ **18.75 N,
109.29 E**. Both the comment and the coordinates need correcting.
Verified: zh.wikipedia 黎语 / 黎文; 百度百科 黎文; minwang.com.cn 黎族语言文字 (Feb 1957 scheme, Ha
dialect base, Baoding village of Baoyou town, Ledong as standard pronunciation);
PMC7549582 ("Baoding village, Baoyou Town, Ledong Li Autonomous County");
en.wikipedia.org/wiki/Ledong_Li_Autonomous_County (18°44′52″N 109°17′31″E).

**2. BLOCKER — `mmd.description.en`: Mulam is not Maonan's close relative.**
Current: "Its closest relatives are Sui and **Mulam**, its immediate neighbours in the same branch."
Glottolog's Kam-Sui tree splits first into **Mulam-Kam** (Kamic + Mulam) and **Then-MMS**. Maonan sits
in Then-MMS → Maonan-Mak-Sui → **Maonan-Chadong**, whose other member is **Chadong** [cdy]. Sui is a
sister node inside Maonan-Mak-Sui, so the Sui half is right — but **Mulam is in the other primary
branch entirely**, no closer to Maonan than Dong is.
Corrected: *"Its closest relative is Chadong, with Mak, Ai-Cham and Sui next in the same branch."*
Present in all 18 translations (`.ja`「水語と仫佬語」, `.zh`「水语和仫佬语」, `.ru` «шуй и мулао»,
`.de` "Sui und Mulam", …).
Verified directly: `curl -H 'Accept: application/json'
https://glottolog.org/resource/languoid/id/kams1241.json` →
`((…'Kamic','Mulam [mula1253][mlm]')'Mulam-Kam', ((…'Mak-Ai-Cham', ('Chadong [chad1240][cdy]','Maonan [maon1241][mmd]')'Maonan-Chadong', 'Sui [suii1243][swi]')'Maonan-Mak-Sui', "T'en [tenn1245][tct]")'Then-MMS')'Kam-Sui'`.

**3. BLOCKER — `pmi.coverageNote` and `pmi.sources[0].title`: the doculect is Taoba, not Lanping.**
Both say Lanping: coverageNote "The Pumi doculect is Sun's Northern (**Lanping/兰坪**) form.";
sources[0] "… — Northern Pumi (**Lanping**), via lexibank/suntb".
lexibank/suntb has exactly two Pumi doculects — `TaobaPumi` "Pumi (Taoba)" (`taob1238`) and
`QinghuaPumi` "Pumi (Qinghua)" (`qing1238`); there is no Lanping doculect. I diffed the row's forms
against the CLDF: water `tɕɨ⁵³` and fire `mɐ³⁵` match **TaobaPumi** and are absent from QinghuaPumi.
Glottolog puts `taob1238` inside Northern Pumi (`nort2723`, hid `pmi`) and `qing1238` under Southern
Pumi. Lanping is **Southern Pumi (`pmj`)** territory (Ding's three-way scheme calls it *Western*
Prinmi) — so the note is self-refuting as well as wrong.
Corrected coverageNote sentence: *"The Pumi doculect is Sun's Taoba (桃巴, Muli, Sichuan) form."*
Corrected source title: *"… — Northern Pumi (Taoba), via lexibank/suntb"*.
This also removes the clash with the row's own description and map comment, which already say
Taoba/Muli. **Do not cite Picus Sizhi Ding for this row** if the fix tempts anyone to add a reference:
*A Grammar of Prinmi* (Brill 2014) is "Based on the **Central** Dialect of **Northwest Yunnan**"
(Niuwozi, Ninglang), not Taoba. Sun Hongkai (1991) is the right citation and is already there.
Verified: `https://raw.githubusercontent.com/lexibank/suntb/master/cldf/languages.csv`;
`https://glottolog.org/resource/languoid/id/nort2723.json`; `.../qing1238`;
zh.wikipedia 普米语; en.wikipedia Pumi language.

**4. BLOCKER — `pmi.countries` puts Lanping inside Northern Pumi's range.**
Currently `China (Yunnan: Lanping, Ninglang; Sichuan: Muli)`. Lanping 兰坪 is Southern Pumi.
Northern Pumi is Muli 木里, Yanyuan 盐源 and Jiulong 九龙 in Sichuan plus Yongning/Labo in Ninglang, Yunnan.
Corrected: `China (Sichuan: Muli, Yanyuan, Jiulong; Yunnan: Ninglang)`.

**5. BLOCKER — `pmi.description.en` inverts its own numbers: 54,000 is a *speaker* count, not the
nationality figure.** Current EN: "…so the nationality figure of about 54,000 and the ethnic community
it is meant to count do not line up."
普米族 census: **42,861 (2010), 45,012 (2020)**. ~54,000 is Ethnologue's (1999) combined `pmi`+`pmj`
*speaker* estimate. The row's own field has it right — `speakers:'~54K (Pumi nationality ~43K)'` — and
the generating script (`~/langmap-work/cn/metas.py:27`) spelled it out: "~54K across both Pumi
languages (Pumi nationality ~43K in Yunnan, plus Sichuan Tibetans)". As written the sentence makes the
opposite point from the one intended. (Chinese sources actually put Northern Pumi speakers well above
that — Muli alone ~58,000 — which is the very effect the sentence is trying to describe.)
Suggested EN: *"In Sichuan many Pumi are registered administratively not as Pumi but as Tibetan, so
the nationality figure — 45,012 in the 2020 census — undercounts the community: the speaker estimates
run higher still."*
**All 18 translations repeat the inversion verbatim**: `.ja`「約5万4千人という民族人口の数字」,
`.ko`「약 5만 4천 명이라는 민족 인구 수치」, `.zh`「约五万四千人的民族人口数字」,
`.yue`「大約五萬四千人嘅民族人口數字」, `.de` "die Zahl der Nationalität von rund 54.000",
`.fr` "le chiffre de la nationalité, environ 54 000 personnes", `.ru` «численность национальности
примерно в 54 000 человек», `.ar` "رقم القومية البالغ نحو 54 ألف نسمة", `.he` "מספר בני הלאום, כ-54,000
נפש", and likewise vi/th/id/hi/it/es/pt/uk/sw. Also update `speakers` (~43K → 45,012) and
`docs/words/LANG_CODES.md:838`, which carries the same string.
Verified: en.wikipedia List_of_ethnic_groups_in_China (2010/2020 census); en.wikipedia Pumi language.

**6. BLOCKER — `jiu.sources[1].url` is a dead Glottolog code.**
`https://glottolog.org/resource/languoid/id/jino1240` → **HTTP 404** (so does `jino1239`). The
Glottolog languoid whose `hid` is `jiu` is **`youl1235`, "Youle Jinuo"**.
Corrected: title *"Glottolog: Youle Jinuo"*, url `https://glottolog.org/resource/languoid/id/youl1235`.
Verified: `curl .../youl1235.json` → `{"hid":"jiu", … 'Youle Jinuo [youl1235][jiu]'}`.

**7. BLOCKER — `twm.sources[1].url` points at a different language family.**
`https://glottolog.org/resource/languoid/id/tawa1276` resolves, but `tawa1276` is **"Tawan"**, a
dialect of Tagabili in Austronesian → Malayo-Polynesian → Sabahan → Murutic. Nothing to do with Monpa.
The Glottolog languoid with `hid: twm` is `tawa1289`, and it is `bookkeeping: true`,
`category: "Bookkeeping"`, with an Ethnologue comment of type **"spurious"**: *"Dakpakha [dka] (in
Bhutan), Takpa [tkk] (in China) and Tawang Monpa [twm] (in China and India) are the same language but
named differently by their respective country authorities."* Glottolog's real languoid is
**Dakpakha, `dakp1242` (ISO dka)**, inside the Dakpa–Dzala family `dakp1241`.
Corrected: title *"Glottolog: Dakpakha (Takpa / Tawang Monpa)"*, url
`https://glottolog.org/resource/languoid/id/dakp1242`.
Verified: `curl .../tawa1276.json` (Austronesian newick), `.../tawa1289.json`, `.../dakp1242.json`.

**8. BLOCKER — `twm.speakers` "~10K in China" is off by roughly 8× and contradicts the row's own
coverageNote.** Two independent sources agree: Minzu University's national minority-language centre
gives **错那门巴语 (= twm) 1,300 speakers in China** against **仓洛语/Tshangla 7,000 in China**
(nmlr.muc.edu.cn/info/1119/2652.htm); Ethnologue gives China **1,300 (2000 census)**, India 9,100
(2006), Bhutan 2,000 (2011), ~12,400 total. Cuona county recorded only 569 Monba in 2000. The Monpa
*nationality* is 10,561 (2010) / 11,143 (2020), but the row's own coverageNote says that nationality
"covers two mutually unintelligible languages" — so ~10K twm speakers inside an ~11K nationality that
is mostly Tshangla-speaking cannot be right. The "~10K" looks like either the India/Tawang figure or a
stand-in for the whole nationality.
Suggested: `speakers:'~1.3K in China (~12K total: India ~9K, Bhutan ~2K) — Monpa nationality of China ~11K'`.

**9. FIX — `dta.description.en`: the eighteenth-century move went to the Ili valley, not Tacheng.**
Current: "An eighteenth-century military resettlement carried a community of Daur speakers to the
Tacheng area of Xinjiang…". In **1763** Solon and Daur troops from Heilongjiang were transferred west
and formed the **索伦营 Solon Battalion**, settled **west of the Khorgos river in the Ili valley**,
arriving 1764. Tarbaghatay (塔尔巴哈台, i.e. Tacheng) and Kashgar were *rotating garrison postings* for
that battalion; the Xinjiang Daur community reached Tacheng later (the battalion's survivors returned
from displacement in **1868**), and today sits at Ashir Daur Ethnic Township, Tacheng (~6,900 people).
As written the sentence collapses two stages into one.
Suggested: *"An eighteenth-century Qing garrison transfer carried a community of Daur speakers to the
Ili valley in Xinjiang; their descendants ended up around Tacheng, more than three thousand kilometres
west of the rest of the language."*
Verified: 百度百科 索伦营; qinghistory.cn 清代伊犁索伦营述要; en.wikipedia General of Ili.

**10. FIX — `dta.description.en` "Daur is the most divergent of the Mongolic languages: it split early
and kept features the others lost" is overstated, and the second clause is close to backwards.**
In Janhunen (ed.), *The Mongolic Languages*: Tsumagari calls Dagur "**aberrant**", not most divergent;
Rybatzki finds Moghol and Dagur the two *extremities* of the family and states plainly that "**Dagur
is actually a rather innovative language**"; the most *archaic* Mongolic in that volume is Khamnigan,
and Moghol / the Shirongolic complex are the ones posited as primary genetic branches. Janhunen also
dates the Mongolic break-up to no earlier than the 13th century, leaving little room for "split
early". Dagur's genuine archaisms are narrow (no prebreaking; au/eu diphthongs).
Suggested: *"Daur is the most aberrant of the Mongolic languages — it broke away early, is unusually
innovative, and keeps a few archaisms the others lost, which makes it disproportionately useful for
reconstructing Mongolic."*
Present in all 18 translations (`.zh`「分化最早、差异最大的一支，保留了其他蒙古语已经失去的特征」,
`.de` "die abweichendste der mongolischen Sprachen", `.ru` «самый обособленный», …).

**11. FIX — `swi.description.en` credits Sui with a "voiced-aspirate series" it does not have.**
Current: "…including pre-glottalised and **voiced-aspirate** series that most neighbouring languages
have lost." The ~70-initial figure is right (Sandong: 71 initials in Chinese sources), but the marked
series are **pre-glottalised stops and nasals (ʔb ʔd ʔm ʔn), voiceless/aspirated sonorants
(m̥ n̥ ɲ̥ ŋ̥), prenasalised stops (ᵐb ⁿd), uvulars (q qʰ)** and labialised/palatalised obstruents.
PHOIBLE's Sui inventories list no bʱ/dʱ at all. The row's own cells show exactly the real inventory
and none of the claimed one: `ʔdaan1`, `ʔnaŋ1`, `ʔdwə1`, `ʔman3`, `ⁿda1`, `m̥a1`, `n̥ak7`, `qha1`.
Suggested: *"…including pre-glottalised stops and nasals, voiceless nasals and prenasalised stops that
most neighbouring languages have lost."*
Affects all 18 translations (`.ja`「前声門化音や有声有気音の系列」, `.zh`「先喉塞音和浊送气音系列」,
`.de` "präglottalisierte und stimmhaft-aspirierte Reihen", `.hi` "घोष-महाप्राण शृंखलाएँ", …).
Verified: en.wikipedia / zh.wikipedia 水語; PHOIBLE UPSID inventory 560; Castro (ed.), *Sui Dialect
Research*, SIL eBook 66.

**12. FIX — `swi.description` gives an unsupported Sui term for the shuishu ritual masters.**
Every language says "priests (**bux sof**)". No source attests it. Wiktionary's Sui lexicon gives
**bux /pu˥˧/ = "father"**, not "master/priest", and has no Sui *sof*. The attested designations are
**水书先生 shuǐshū xiānsheng** (the standard scholarly term, used in the Unicode proposal) and
colloquially **鬼师 guǐshī**; the native Sui term 泐睢 [le¹³ sui³³] names the *script*, not the priest.
Suggested: *"used by shuishu masters (水书先生) for almanacs and rites"*. The parenthetical is carried
verbatim in all 19 languages, so it is one string swap everywhere.
Verified: Unicode WG2 N4956 (Shuishu repertoire); zh.wikipedia 水书; en.wikipedia Sui script;
en.wiktionary.org/wiki/bux.

**13. FIX — `mmd.description.en` "only some 40,000 still speak the language" contradicts the row's own
`speakers:'~30K'`.** 40,000 has no source; the cited figure is **30,000 (2005)** — which the metadata
field already carries. **The field is right and the prose is wrong.**
Corrected: *"only some 30,000 still speak the language"*. Present in all 18 translations
(`.ja`「およそ4万人」, `.ko`「4만 명 남짓」, `.zh`「约四万人」, `.yue`「得四萬左右」, `.de` "nur rund
40.000", `.ru` «примерно 40 000», `.ar` "نحو 40 ألفًا", …).

**14. FIX — `mmd` nationality "about 110,000" matches no census.** 毛南族 = **101,192 (2010),
124,092 (2020)**. 110,000 sits between the two and is attributable to neither. Same problem in the
`speakers` field ("Maonan nationality ~110K"). Fix to whichever census year the batch settles on.

**15. FIX — `mmd.description.en` misstates the shift situation in two ways.**
Current: "nearly all of them are also fluent in the local Chinese variety, and transmission to
children has largely stopped." Glottolog's AES entry (ELCat / Campbell et al. 2022, citing Lu 2008)
says: *"Male adults are fluent speakers of Maonan and **Zhuang** … **many children (before schooling)
and elderly women are monolingual in Maonan** … Younger generations are showing greater language shift
to Mandarin."* So (a) transmission to children has **not** largely stopped — the source says the
opposite for pre-school children; UNESCO rates Maonan *Vulnerable*, AES *shifting*, ELCat *Threatened*;
and (b) the dominant contact language in the source is **Zhuang**, and it is *educated male adults*,
not "nearly all", who are bilingual in Chinese.
Suggested: *"about half the Maonan still speak it; adults are typically bilingual in Zhuang or the
local Chinese variety, and younger generations are shifting to Mandarin."*
Verified: glottolog.org/resource/languoid/id/maon1241; en.wikipedia Maonan language (UNESCO *Vulnerable*).

**16. FIX — `lic.description.en` "on the order of 800,000 speakers" is above every published figure and
contradicts the row's own `speakers:'~670K'`.** The published figures are **667,000 (1999)**,
~700,000 (zh.wikipedia) and **~750,000 (Norquest 2007)** — Norquest is already cited in this row's
sources. Corrected: *"…have on the order of 750,000 speakers"* (or "roughly 700,000–750,000"), and
align `speakers` so field and prose agree. In all 18 translations (`.ja`「80万人規模」,
`.zh`「约在八十万之数」, `.ru` «порядка 800 000», `.hi` "लगभग 8 लाख", …).

**17. FIX — `lic` mixes census years between prose and field.** The description says the Li nationality
"numbers about 1.6 million"; the field says "Li nationality ~1.5M". 黎族 = 1,463,064 (2010),
1,602,104 (2020). Both are real but they are different censuses — pick one (1.6M / 2020 is current)
and use it in the field and all 19 languages.

**18. FIX — `swi` "the Sui nationality numbers about 410,000" is the 2010 figure.**
水族 = 411,847 (2010) → **495,928 (2020)**, a 20% jump. Same number in the `speakers` field ("Sui
nationality ~410K"). Against the 2020 figure, ~300,000 speakers is 60%, so "most of them speak the
language" should be softened if the number is updated. Note `lic` uses 2020, `swi` uses 2010 and `mmd`
uses neither — **the batch should settle on one census year.**

**19. NOTE — `mmd`'s Guizhou clause is true of the nationality but misleading about the language.**
"…with a smaller group in neighbouring Guizhou", and `countries:'China (Guangxi: Huanjiang; Guizhou)'`.
The Guizhou Maonan-nationality population (Pingtang 平塘, Huishui 惠水, Dushan 独山 in Qiannan; ~32,000,
about 30% of the nationality) are the **佯僙 Yanghuang**, reclassified into the Maonan nationality by
Guizhou in 1990. They speak **Then / Yanghuang (ISO tct)**, a different Kam-Sui language that Glottolog
places *outside* the Maonan-Mak-Sui node. Suggested: *"the Maonan-nationality population of Guizhou
largely speaks Then, a related but distinct language."*

**20. NOTE — `lic` "The Li are held to be the earliest settlers of Hainan" overreaches slightly.**
Archaeology and genetics put Li ancestors on Hainan ~3,000 years ago, arriving from Guangxi, with ~85%
Bai-Yue / Tai-Kadai ancestry; but Palaeolithic occupation of the island goes back ~20,000 years and is
not demonstrably ancestral to the Li. Safer: *"the island's earliest known continuous population, long
predating Chinese settlement."*
Verified: "Tracing Bai-Yue Ancestry", *Mol. Biol. Evol.* 39(10) 2022, msac210.

**21. NOTE — `twm`: the doculect this row uses is coded as *Dzalakha* in the source dataset.**
lexibank/suntb labels Sun (1991)'s Cuona Monpa `MamaTshona` with Glottocode **`dzal1238`, ISO `dzl`**
(Dzalakha) — not `twm`. Dakpa and Dzala do form a coherent East Bodish subgroup (Hyslop & Tshering),
and Cuona Monpa is normally equated with Takpa/Dakpa, so the row's identification is defensible; but
the English asserts flatly "Across the border in the Tawang district … the Cuona variety is known as
Dakpa", which is one of two live analyses of this exact doculect. Either hedge, or record the `dzl`
coding in the coverageNote.

**22. NOTE — `twm`: Cuona has not been a county since 2023.** The description and `countries` field both
say "Cuona (Tsona) **county**" / `China (Tibet: Cuona/Tsona)`, and the translations follow (zh 错那县,
de "Kreis Cuona", fr "district de Cuona", …). On **3 April 2023** Cuona County was abolished and
**Cona/Tsona County-level City 错那市** established in its place.

**23. NOTE — `twm`: "a different language of the same family" can be read as putting Tshangla in East
Bodish.** The sentence follows immediately after "the **East Bodish** variety of Cuona county", and the
row's `family` is `Sino-Tibetan (East Bodish)`. Tshangla is generally *not* East Bodish — it is usually
treated as its own branch of Bodish (van Driem leaves it unclassified; only Bradley 2002 puts it in
East Bodish), and the atlas's own `tsj` row says "Bodish", not East Bodish. Suggest "a different
Bodish language" to remove the ambiguity.

**24. NOTE — `jiu` "There are two varieties, Youle and Buyuan" understates the split.**
Youle (ISO `jiu`) and Buyuan (ISO `jiy`) are **separate ISO 639-3 languages, reported as not mutually
intelligible.** Suggest "two varieties, Youle and Buyuan, not mutually intelligible and separately
coded; this row gives Youle."

**25. NOTE — `jiu` "about 21,000 people" is contested and may be ~13,000.** The 21,000 comes from the
English Wikipedia infobox ("21,000 (2007)"), whose own body text attributes that figure to **Buyuan**,
the *smaller* variety — an internal contradiction. Ethnologue's current figure for `jiu` is
**~13,000 (2000)** (`jiy` ~1,000, 1994), and Wikipedia elsewhere says under half the Jino could speak
the language by 2000, which against a 23,143 (2010) / 26,025 (2020) nationality implies ~13,000, not
21,000. Recommend either "~13,000" or "well under the nationality's 26,000", and in any case say which
variety the number is for.

**26. NOTE — `dta.script` omits the Manchu script (and Written Mongolian).** Field:
`Unwritten (Latin and Cyrillic schemes proposed)`, but the row's own description says "Manchu script,
Cyrillic and Latin schemes have all been tried", and the Manchu-script tradition is the historically
substantial one (in use from the 1830s; the 满汉达呼尔合璧词典 was compiled 1883–1892). Tsumagari (2003)
gives: Manchu script in the late Qing, a **Roman orthography in the early 1930s**, **Cyrillic in the
1950s**, and a Pinyin-based Roman standard **since the 1980s**; for everyday writing Daur use Chinese
**and Written Mongolian**. The description's "speakers write Chinese" should add Written Mongolian.
Suggested field: `Unwritten (Manchu script historically; Cyrillic and Latin schemes proposed)`.

**27. NOTE — `dta` "about 96,000 speakers" is a 1999 figure paired with a 2020 census.** 96,085 is
SIL's 1999 estimate (Janhunen 2006 rounds it to 96,000; English Wikipedia's infobox instead gives
91,000); the nationality figure 132,000 is 2020 (132,299; 131,992 in 2010). Pairing them implies a 73%
speaking rate that is not defensible for a language rated EGIDS 6b / UNESCO "definitely endangered".
Date the 96,000 explicitly, or use a range.

**28. NOTE — `dta` "more than two thousand kilometres west" understates.** Great-circle distance from
the row's own map point (47.98 N, 124.12 E, Morin Dawa) to Tacheng is **3,064 km**; Qiqihar→Tacheng is
3,066 km. "More than three thousand kilometres" is both true and more striking.

**29. NOTE — `pmi` "Speakers call themselves Prinmi" uses the *Central* autonym.** *Prinmi* renders the
Central form pʰɹĩ⁵⁵mi⁵⁵; the **Northern** form — which is what this row is — is pʰʐõ⁵⁵mə⁵³ /
pʰɹə̃⁵⁵mə⁵⁵ (Western pʰʐə̃⁵⁵mi⁵⁵). Harmless as a general statement about "speakers", but the row's
`native: 'Prinmi'` in `wordmap_data.js:1107` labels a Northern Pumi point with a Central autonym.

**Checked and correct — no action.** Jino recognised **1979** (State Council notice, 6 June 1979) as
the 56th and last nationality ✔; Jinuo Mountain (基诺山基诺族乡) is in Jinghong, Xishuangbanna ✔;
攸乐/补远 = jiu/jiy ✔; 卓巴 zhuoba village elder ✔ (paired with 卓色 "village mother"; the longhouse
system faded from the 1930s, which the description's past tense already handles); **攸乐/基诺山 is one
of — indeed conventionally the first of — the 古六大茶山** ✔; Loloish (Ngwi) / Lolo-Burmese /
Sino-Tibetan ✔ (sub-branch Southern-Loloish vs Central-Loloish is disputed, but the row doesn't take a
side). Pumi as Qiangic ✔ — Glottolog's chain is Sino-Tibetan > Burmic > Naqi > **Qiangic** > Pumi >
Northern Pumi, so `family:'Sino-Tibetan (Qiangic)'` matches (Chirkova 2012 argues Qiangic is a
diffusion area rather than a genetic branch, but the row is not out on a limb); Sichuan Pumi registered
as Tibetan ✔ (~30,000 in Muli); pre-Buddhist ritual tradition alongside Tibetan Buddhism ✔ (韩规 Hangui
ritualists). Motuo Monpa = Tshangla, mutually unintelligible with the Cuona variety ✔; East Bodish as a
sister of Tibetic and not descended from it ✔ (Shafer 1955; Michailovsky & Mazaudon; Hyslop 2010/2014);
Monpa nationality ~11,000 ✔. Daur locations (Morin Dawa; Meilisi Daur District / Qiqihar; Tacheng) ✔;
Khitan link "debated" ✔ and correctly framed as ethnohistorical rather than linguistic (Janhunen
classes Khitan as Para-Mongolic, a *sister* of Pre-Proto-Mongolic, so Daur is not descended from it);
Daur not tonal ✔. Hlai as a primary Kra-Dai branch, sister to Tai / Kam-Sui / Kra ✔ (minor nuance:
Kam-Sui and Tai group together under Kam-Tai, so it is not strictly equidistant, but the wording
survives that); **1957 + Ha (Baoding, Luohuo sub-dialect) basis ✔** — only the county is wrong (#1);
Li bilingual in Hainanese/Mandarin ✔. Sui in Sandu Sui Autonomous County, Qiannan, southern Guizhou,
with Sandong the reference variety (~90% of speakers) ✔; shuishu "several hundred characters" ✔ (471
frequent logograms in Wéi 2007; 486 + 47 radicals in the Unicode proposal), mirror-image / variant
Chinese characters ✔, ritual-and-divinatory rather than a full writing system ✔, preservation
programmes ✔. Maonan in Huanjiang Maonan Autonomous County, northern Guangxi ✔; 分龙节 Fenlong ✔ and
肥套 masked nuo ritual (national ICH since 2006) ✔.
Also: the shipped `pmi` Glottocode `nort2723` is **right** — the scratch build script
`~/langmap-work/cn/metas.py:29` had `nort2722`, which is *Northern Qiang*. Don't let that regress.

---

## 2. Translation faithfulness

Mechanically checked: **no translation introduces a number or a date the English lacks** (all 126
texts scanned for Latin, Arabic-Indic, Devanagari and Thai numerals; the only differences are
ja/ko/zh/yue writing numbers in words or kanji, and ko/th/de spelling "eighteenth-century" as 18).
No translation drops a substantive claim, and all are in their target language. Every factual error in
§1 that lives in the English is reproduced faithfully in all 18 translations — no translation adds an
error of its own beyond #30.

**30. FIX — `swi.description.ar` is self-contradictory.** "سلاسل … **مجهورة مهموسة النفَس**" reads
"voiced *voiceless*-breath series": in Arabic phonetic terminology مجهور = voiced, مهموس = voiceless.
(The clause should disappear under #11; if any version survives, the Arabic needs re-doing, e.g.
"مجهورة منفوخة" / "مجهورة ذات نفَس".)

**31. NOTE — `swi`: 17 of the 18 translations add an enumerating frame the English does not have.**
`.ja`「水語が目を引く点は二つある。第一に…第二に…」, `.ko`「눈에 띄는 점은 두 가지다」,
`.zh`「水语有两点尤为突出。其一…其二…」, `.yue`, `.vi` "đáng chú ý ở hai điểm", `.th`, `.id` "Ada dua
hal yang menonjol", `.hi`, `.de` "Zwei Dinge fallen auf", `.fr` "Deux traits la distinguent", `.it`,
`.es`, `.pt`, `.ru` «Примечательны две черты», `.uk`, `.ar` "وتتميز اللغة بأمرين", `.he` "שני דברים
בולטים בה", `.sw` "Mambo mawili yanakitofautisha". Not a factual addition, but the English is the odd
one out — add the frame to `en` or drop it from all 18.

**32. NOTE — `pmi.description.zh` / `.yue` add a Chinese rendering of the autonym the English does not
give**: 「使用者自称**普日米**（Prinmi）」/「使用者自稱**普日米**（Prinmi）」. Harmless, but it is an
added form; the English says only "Speakers call themselves Prinmi."

**33. NOTE — `twm.description.he` drops half a place name.** English gives "Cuona (Tsona) county";
Hebrew gives only מחוז צונה. `.ru` and `.uk` invert the pair relative to the English — «уезда Цона
(Цуона)» / «повіту Цона (Цуона)» is *Tsona (Cuona)*, the reverse of the English order.

**34. NOTE — `jiu.description.ru` / `.uk` mis-transliterate 攸乐 Youle** as «юэлэ» / «юеле».
Palladius for Yōulè is **Юлэ** (uk **Юле**); «юэлэ» reads back as 约乐/月乐.

**35. NOTE — `lic.description.zh` / `.yue` flatten "the Hlai languages" to 方言.**
「黎语**诸方言**的使用者约在八十万之数」/「黎語各方言嘅使用者」. The point of the surrounding sentence
is that Hlai is a *primary branch containing several languages*; 方言 ("dialects") undercuts it.
Suggested 黎语支各语言 / 黎語支各語言.

**36. NOTE — inconsistent metalanguage inside the batch.**
`lic.zh` calls Kra-Dai 侗台（壮侗）语**系** while `mmd.zh` calls it 壮侗（侗台）语**族**;
`mmd.ru`/`.uk` call Sui «шуй» while `swi.ru`/`.uk` call it «суйский»/«суйська»;
`jiu.ja` writes the tone system チャオ式 while `twm.ja` and `mmd.ja` write 趙元任式.

**37. NOTE — `jiu.description.zh` / `.yue` gloss Loloish as 彝（**倮倮**）语支.** 倮倮/猓猓 is an old
exonym now generally avoided in Chinese-language writing; 彝语支 alone, or 彝（洛洛）语支, is safer.

**Clean:** all seven `yue` descriptions are genuine written Cantonese — 係/嘅/唔/喺/咗/嘢/哋/冇/佢/嚟
all occur across the set, none is Mandarin with a Cantonese veneer. All seven `zh` are simplified and
all seven `yue` traditional, with no cross-contamination (the only traditional-looking hit, 著 in
`jiu.zh` / `mmd.zh` 著称, is a valid simplified character).

---

## 3. `lang_names.js`

**38. FIX — `twm` zh/yue gloss the wrong thing.** `en`/`ja`/`ko` give the parenthetical as the *language*
name Dakpa — `'Tshona Monpa (Dakpa)'`, `'錯那モンパ語（ダクパ）'`, `'춰나 먼바어(닥파)'` — but
`zh: '错那门巴语（**达旺**）'` and `yue: '錯那門巴語（**達旺**）'`, and **达旺 is Tawang**, the Indian
district, not a language name. Corrected: `zh: '错那门巴语（达克帕）'`, `yue: '錯那門巴語（達克帕）'`.

**39. NOTE — `lic`'s "(Ha)" disambiguator survives in only 5 of 19 names.**
Kept in en `Hlai (Ha)`, ja `黎語（哈方言）`, ko `리어(하 방언)`, zh `黎语（哈方言）`, yue `黎語（哈方言）`.
**Dropped** in vi `Tiếng Lê`, th `ภาษาหลี`, id `Bahasa Hlai`, hi `ह्लाई`, de/fr/it/es/pt `Hlai`/`hlai`,
ru `Ли (хлай)`, uk `Лі (хлай)`, ar `اللايية`, he `הלאי`, sw `Kihlai` — so 14 UI languages label a
single-dialect row with the name of the whole Hlai group. Add the qualifier: de `Hlai (Ha)`,
fr `hlai (ha)`, ru `Хлай (ха)`, vi `Tiếng Lê (Ha)`, …

**40. FIX — `lic.ar` `'اللايية'` loses the initial H and disagrees with its own Arabic description**,
which calls the language الهلاي throughout. Suggested `'الهلايية'` (or `'اللي (الهلاي)'`, keeping the
Li/Hlai pairing that ru/uk use).

**41. FIX — `dta.ja` `'ダウール語'` contradicts the row's own Japanese description**, which uses
ダグール語 / ダグール族 throughout, and the Japanese standard headword ダグール語. Pick one — ダグール語
matches the prose. (`de: 'Dagurisch'` is **correct** and matches the German description's "Dagur".)

**42. NOTE — `mmd.ar` `'الماوننية'` is malformed** — missing the second alif; the row's own Arabic
description writes الماونان. Suggested `'الماونانية'`.

**43. NOTE — seven names disagree with their own row's description in the same UI language.**
`jiu.vi 'Tiếng Cơ Nặc'` vs description "Người Jino / núi Jinuo";
`jiu.fr 'Jinuo'` vs description "Les Jino";
`jiu.hi 'जीनुओ'` vs description जिनो;
`pmi.vi 'Tiếng Phổ Mễ Bắc'` vs description "tiếng Pumi Bắc";
`mmd.vi 'Tiếng Mao Nam'` vs description "Tiếng Maonan";
`swi.th 'ภาษาสุ่ย'` vs description ภาษาสุย; `swi.he 'סווי'` vs description סוּי.
Not errors of fact, but the map label and the popup prose show different names for the same row.

**Clean — the three items called out for specific verification all pass.**
`jiu` ja `基諾語` / ko `지눠어` / zh `基诺语` are the established forms and match the 基诺 reading.
The Monpa entry **cannot** be read as covering the Tshangla-speaking Motuo Monpa: all 19 names carry
Tshona/Tsona/錯那/错那/춰나/Thác Na/ชั่วน่า/त्सोना/Цона/تسونا/צונה, and Tshangla has its own row
(`tsj`, `仓洛语` / `ツァンラ語`). Where the Hlai "(Ha)" gloss survives it is correct — 哈方言 /
하 방언 is the Ha dialect group, the basis of the 1957 orthography.

---

## 4. Internal consistency (description vs `coverageNote` vs the cells)

**44. FIX — `lic`, `swi` and `mmd` all end "Forms are written with Chao tone values", contradicting
their own coverageNote.** Each coverageNote says the ABVD source "writes tone as a CATEGORY number
(1-8) rather than a Chao value; the IPA converts each category through the published tone table …
and **the surface keeps the digit**." The cells confirm it — the digit in the surface form is a
category, not a Chao value; only the IPA carries Chao contour letters:
`lic "water":["nom3","nom˩˩"]`, `swi "water":["nam3","nam˧˧"]`, `mmd "water":["nam3","nam˥˩"]`.
Suggested for all three, in all 19 languages: *"The digit after each form is a tone-category number;
the IPA converts it to Chao values."*
(`jiu`, `pmi`, `twm` are **fine** — their source prints Chao values and the surfaces carry them:
`jiu ["mi33","mi˧˧"]`, `pmi ["tɕɨ53","tɕɨ˥˧"]`, `twm ["tshi53","tshi˥˧"]`. `dta` "Daur is not tonal"
matches its toneless cells.)

**45. NOTE — `swi` map comment and coverageNote name different places.**
`wordmap_data.js:1072` comments the point `// Miaocao, Sandu, Qiannan, Guizhou`, but the coverageNote
and the build script (`~/langmap-work/cn/kamsui.py:10`) both say the lect is **Sandong (三洞)**.
One of the two is wrong.

**46. NOTE — `mmd` map comment `// Xiananu, Huanjiang, Guangxi` (`wordmap_data.js:1074`) is a typo**
for **Xianan 下南**, the Maonan heartland township (98.2% Maonan; 中南村南昌屯 the traditional cradle,
part of the historic 三南 area). Xianan is at ≈ **24.97 N, 108.00 E**; the row sits at `25.06, 107.86`,
~18 km off and outside the township.

**47. NOTE — `swi.native` `'Aiʳ Sui³'` mixes two tone notations in one autonym** — a superscript `ʳ`
on the first syllable and a superscript `3` on the second. It is the only `native` string in
`wordmap_data.js` carrying a superscript tone letter at all.

**48. NOTE — `dta.coverageNote` doesn't mention that the acute accent is dropped.** It enumerates
č→tʃ, ǯ→dʒ, y→j, ā/ō/ū→aː/oː/uː and ':'→ː, but the cells also silently drop an acute:
`"you":["sí","si"]`, `"tooth":["sídə bor","sidə bor"]`.

**49. NOTE — two `countries` entries have no counterpart in the prose.** `twm.countries` includes
Bhutan (~2,000 Dakpakha speakers) but no description mentions Bhutan — the cross-border paragraph names
only Tawang. `swi.countries` includes Guangxi and Libo/Dushan, but every description mentions only
Sandu (Sui is also in Rongshui ~10,000 and Nandan ~1,900 in Guangxi, Duyun/Rongjiang/Congjiang in
Guizhou, Fuyuan in Yunnan, and a ~100-speaker village in Tuyên Quang, Vietnam). Omissions, not
contradictions.

**Otherwise clean:** `jiu`'s "this row gives Youle" matches its coverageNote's Youle/攸乐 doculect;
`lic`'s Ha/Baoding lect and 1957-orthography basis match the prose (county aside, #1); `swi`'s Sandu
reference variety matches; `mmd`'s coverageNote (father tɛ2 / mother ni4, sun van1, white pok8, drink
dashed) matches the cells exactly; every `unattestedReason` key corresponds to a `—` cell in
`lang_words/<code>.js`.

---

### Where fixes have to land
Any change to a `description`, `coverageNote`, `sources`, `speakers`, `countries` or `script` value
must be applied in **both** `wordmap_meta.js` and `meta_desc/<code>.js` — the two are currently
identical for all seven rows, bad `jino1240` / `tawa1276` URLs included.
`docs/words/LANG_CODES.md:838` also carries the `pmi` `speakers` string.
Coordinate and comment fixes (#1, #29, #45, #46) are in `wordmap_data.js` lines 1072, 1074, 1088, 1107.

### Priority
Blockers first: **#1** (Baoding is in Ledong, not Baoting — wrong county *and* wrong map point),
**#2** (Mulam is not Maonan's relative), **#3–#5** (Pumi Lanping/Taoba and the inverted 54,000),
**#6–#7** (two Glottolog URLs — one dead, one pointing at an Austronesian language),
**#8** (twm speaker count off by ~8×). Then the substantive FIXes **#9–#13** and **#15**, then the
stale-number FIXes #14/#16/#17/#18, then #44, which touches three rows × 19 languages.

---

## Appendix — status against the live working tree (checked after writing the above)

The review above is of **commit `6a333f7b`**, as briefed. While it was being written, **another thread
began editing the same working tree** (`wordmap_meta.js`, `lang_names.js`, `wordmap_data.js`,
`docs/words/LANG_CODES.md` and all of `words/*.js` are now dirty — none of it my doing; I edited
nothing). Some of the findings above have already been applied there. Re-checked against the live
files:

**Already fixed in the working tree — no action needed:**
#3 (pmi coverageNote no longer says Lanping; it now says Taoba, Muli, with a note that the
northern/southern split doesn't follow the provincial border), #5 (the pmi EN and all translations now
read "the nationality figure — about 43,000 in the 2010 census — undercounts the community: roughly
54,000 people speak the language"), #8 (`twm.speakers` now `~1.3K in China`, and `LANG_CODES.md`
with it), #16 (lic 800,000 → 750,000), #38 (`lang_names` twm zh/yue 达旺 → 达克帕), #40 (`lic.ar`),
#41 (`dta.ja` ダウール語 → ダグール語), #42 (`mmd.ar`), #46 (`// Xiananu` → `// Xianan (下南)`),
#48 (dta acute now explained: "The acute in sí 'you' marks a postalveolar, so the IPA is ʃi"),
and #44 **for `lic` and `mmd` only**.

**Still open in the working tree — and two of them are now *partial-fix inconsistencies*:**

- **#3 is only half done.** `pmi.sources[0].title` still reads "**— Northern Pumi (Lanping)**, via
  lexibank/suntb" while the coverageNote right above it now says Taoba. The source line has to move too.
- **#4 is untouched.** `pmi.countries` is still `China (Yunnan: Lanping, Ninglang; Sichuan: Muli)`,
  which now contradicts the row's own corrected coverageNote.
- **#44 is only two-thirds done.** `lic` and `mmd` now say "The digit after each form is a
  tone-category number; the IPA converts it to Chao values", but **`swi` still ends "Forms are written
  with Chao tone values."** in all 19 languages.
- Still fully open: **#1** (lic Baoting county + the 18.78/109.52 coordinates), **#2** (mmd "Sui and
  Mulam"), **#6** (`jino1240` 404), **#7** (`tawa1276`, the Austronesian languoid), **#9** (dta
  eighteenth-century Tacheng), **#10** (dta "most divergent … kept features the others lost"),
  **#11** (swi voiced-aspirate), **#12** (swi "bux sof", still in all 19 languages), **#13** (mmd
  40,000), **#14** (mmd 110,000), **#17** (lic 1.6M vs `~1.5M` field), **#18** (swi 410,000),
  **#22** (twm "Cuona county"), **#45** (swi `// Miaocao` vs Sandong), and all remaining NOTEs.

Because the tree is shared and moving, re-run the string checks before applying anything, and split
hunks rather than `git add -A`.
