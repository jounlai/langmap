# Rally 2 — Task A: `blr` (Blang) and `rbb` (De'ang, Rumai) review
Repo: /home/jounlai/langmap @ ed55ef5c · builder: /home/jounlai/langmap-work/cn/lastfour.py
Sources checked: /home/jounlai/langmap-work/lb/peirosaustroasiatic_*.csv (doculect `Plang`),
/home/jounlai/langmap-work/lb/deepadungpalaung_*.csv (doculect `NanSang`),
plus the upstream lexibank raw files, ASJP, Glottolog, Ethnologue, zh/en Wikipedia.
No file in /home/jounlai/langmap was edited.

## Section verdicts at a glance
1. **Extraction** — faithful for 71 of 72 filled cells; recomputed independently (own Chao converter, own
   digraph table, no import of lastfour.py) and every surface/IPA pair matched byte-for-byte. The one
   divergence is `blr we`, which the source *does* have (finding 3). But two blr cells carry
   **source-truncated** forms (finding 1).
2. **Annotations** — **CLEAN.** Neither dataset uses the `Comment` column at all: 0 non-empty comments in
   10,706 Peiros rows and 0 in 1,584 Deepadung rows. The raw upstream file
   (`raw/Peiros2004-data.txt`) carries no `<…>`, `(…)`, `?` or `*` annotation on any of the 100 `Plang`
   lines. `Plang` has exactly one form per parameter (only `1_all` is duplicated, identical, and unused);
   `NanSang` has exactly one form per parameter. There is no differently-annotated alternative anywhere,
   so error class (a) cannot apply to these two rows.
3. **Absence claims** — all verified TRUE except one (finding 8). Full parameter lists enumerated below.
4. **Plang-vs-Wa** — the row's central claim **HOLDS**, and is independently corroborated (finding 12).
5. **NanSang** — village/prefecture/ethnonym all **confirmed**; the "not tonal" assertion is not (finding 4).
6. **Meta** — several factual problems (findings 5–7, 9–11).

---

## BLOCKER

**1. BLOCKER — `words/stone.js` blr `["ʔuk31 sa31 mu", "ʔuk˧˩ sa˧˩ mu"]` and `words/sun.js` blr
`["ŋai31 sa31 ŋi", "ŋai˧˩ sa˧˩ ŋi"]` publish truncated source data, and the coverageNote states a reason
that is not true of the source.**

What is wrong: the `Value`/`Form` fields of `peirosaustroasiatic_forms.csv` are hard-capped at **15
characters**. No form in the whole file exceeds 15 chars, and 78 forms sit at exactly 15, several of them
visibly cut mid-token — e.g. `rɔŋ.31 kɔŋ.33 k`, `ʔa.31 hɔn.31 ka`, `ʒ́iak.31 c̣am.3`, and Shuangdiang's
own 'sun' `ŋai.31 saʔ.31 ŋ`. The same cap is present in the upstream raw export
(`https://raw.githubusercontent.com/lexibank/peirosaustroasiatic/master/raw/Peiros2004-data.txt`).
`Plang` has exactly three 15-char forms — 'stone' `ʔuk.31 sa.31 mu`, 'sun' `ŋai.31 sa.31 ŋi`, 'smoke'
`tu.33 sa.31 lit` — and they are **the only three Plang forms in the entire list whose final syllable
lacks a tone digit.** Every Plang form of 14 characters or fewer carries a tone on every syllable. The
missing material is therefore a truncation artefact, not a property of the language.

The coverageNote says: *"a few minor syllables carry no tone and are left toneless."* Both halves are
false. (a) The reason is truncation, not toneless minor syllables. (b) The affected syllables are not
minor syllables — they are the **head roots**: `mu(ʔ)` is 'stone' (cf. Peiros Rumai `mau`, Mangan
`si.33 muʔ.55`, Mane `kəmuʔ.33`; ASJP Blang-Banzhang `ka7 mu7`) and `ŋi(ʔ)` is 'day/sun' (cf. Mane
`ŋai.35 ŋiʔ.33`, Hu `ŋai.33 ŋiʔ.55`, ASJP Blang-Banzhang `Nai7 Ni7`). The minor syllables in those forms
are `sa.31`, which *does* carry its tone.

What it should be: either drop the two cells to `—` (the source form is not recoverable from this CLDF),
or source `ʔuk … sa muʔ` / `ŋai sa ŋiʔ` with tones from Peiros 2004 in print or from Paulsen (1992),
and in either case delete the "minor syllables … left toneless" sentence from the coverageNote.
Verified against: `peirosaustroasiatic_forms.csv` (length histogram: max 15, n=78 at 15) and
https://github.com/lexibank/peirosaustroasiatic/blob/master/raw/Peiros2004-data.txt

## FIX

**2. FIX — `words/good.js` blr IPA `nʰɔm˧˧` should be `n̥ɔm˧˧` (voiceless nasal, not aspirated nasal).**
The dataset's own orthography profile is self-contradictory here: it maps `lh → l̥` and `mh → m̥` but
`nh → nʰ` (Segments column: `lhɔŋ.31` → `lh/l̥ ɔ ŋ ³¹`; `mhut.33` → `mh/m̥ u t ³³`; but `nhɔm.33` →
`nʰ ɔ m ³³`). Peiros writes `lh mh nh rh` as one series — the Waic voiceless-sonorant series — and this
atlas already reads that series as voiceless everywhere else in the same subgroup: `wbm nham → n̥am`,
`wbm rhaŋ → r̥aŋ`, `wbm lhɛʔ → l̥ɛʔ`, `prk hnam → n̥am`, `pll hnam → n̥aːm`, `pll hraŋ → r̥aːŋ`. So the
blr row is internally inconsistent (`l̥ɔŋ` but `nʰɔm`) and inconsistent with its three sibling Waic rows.
Fix the cell, the `DIG_BLR` table in lastfour.py (`nh→n̥`, and `rh→r̥` not `rʰ`), and the coverageNote's
"nh→nʰ".
Verified against: `peirosaustroasiatic_forms.csv` Segments column; /home/jounlai/langmap/words/{blood,tooth,rain}.js (wbm/prk/pll).

**3. FIX — `words/we.js` blr is `—` with `unattestedReason:{we:'unsourced'}`, but the source has the form.**
Peiros `Plang` parameter `95_we` = `ʔet.33 ti.31` (ASJP's independent Plang record has the same, `7et ti`).
Marking it `unsourced` is factually false. The coverageNote gives a different (clusivity-policy) reason,
so note and machine-readable field contradict each other. Note also that the atlas's own sibling row does
the opposite in exactly this situation: `wbm` fills `we` with a single unlabelled form `ix / ʔiʔ` and sets
clusivity `"unknown"` (words/we.js:1184, 2248). Either fill blr `we` as `ʔet33 ti31 / ʔet˧˧ ti˧˩` with
clusivity `unknown`, matching wbm, or keep it empty and stop calling it `unsourced`.
Verified against: `peirosaustroasiatic_forms.csv` row `Plang-95_we-1`; asjp_forms.csv PLANG `*we`.

**4. FIX — rbb: "The language is not tonal" (coverageNote and all 18 description translations) is asserted
as fact but is contested, and the cited source cannot support it.**
(a) The Deepadung CLDF marks **no tone on any form of any of its 16 doculects** (regex scan for digits or
Chao letters over all 1,584 forms: zero hits), including the Shwe Palaung ones. Absence of tone marks in
`NanSang` is therefore a transcription convention of that survey, not evidence about Rumai.
(b) Liu Yan 刘岩 (2006) 《孟高棉语声调研究》 describes the Rumai of **Guang Ka village, Mengxiu Township,
Ruili** — the sibling doculect in the *same dataset*, 24.066/97.796, about 5 km from Nan Sang
(24.020/97.820) — as **tonal**, citing the autonym [ru˥ mai˦˩˨].
(c) Peiros's own `Rumai` doculect writes three tones (`sim.412`, `voŋ.51`, `iʔ.55`).
The zh-wiki claim the row seems to rest on (「声调有平调、降调二调，但不用于区别语义，所以德昂语并非声调语言」)
is a statement about De'ang as a whole, drawn from 《德昂语简志》 (1986), whose reference point is the Bulei
dialect of Santaishan — not Rumai. The claim should be softened to something like "the source writes no
tone, and De'ang is usually described as non-tonal, though Liu (2006) reports the neighbouring Rumai of
Guangka as tonal."
Verified against: https://en.wikipedia.org/wiki/Palaung_language (Liu 2006 list, "…[ru˥ mai˦˩˨]; tonal");
https://zh.wikipedia.org/zh-hans/德昂语; deepadungpalaung_forms.csv; peirosaustroasiatic_forms.csv (Rumai).

**5. FIX — blr `countries:'China (Yunnan: Xishuangbanna, Lincang), Myanmar, Thailand, Laos'` — Laos is
unsupported; and the same "Myanmar, Thailand and Laos" appears in all 18 description translations.**
Glottolog blan1242 (the row's own cited source) lists **China, Myanmar, Thailand** — no Laos. Ethnologue
blr likewise lists China, Myanmar, Thailand. zh-wiki 布朗语 gives 西双版纳、德宏、普洱、临沧 plus Myanmar and
Thailand. Drop Laos; consider adding Pu'er (Lancang/Jingmai, which the description itself talks about) and
Dehong.
Verified against: https://glottolog.org/resource/languoid/id/blan1242 ; https://www.ethnologue.com/language/blr/ ;
https://zh.wikipedia.org/zh-hans/布朗语

**6. FIX — blr `speakers:'~40K (Blang nationality ~120K)'` is too low and matches no source.**
zh-wiki 布朗语 (from 《布朗语简志》, 李道勇 et al. 1986): 布朗方言 55,000 (新曼俄, 布朗山乡, Menghai 42,000 +
Shan State 12,000) and 阿尔佤方言 40,000 (勐满镇关双村, Menghai) — i.e. **~95,000 speakers total**.
Ethnologue blr: **68,000** (1994–2000). The row's "~40K" is exactly the 阿尔佤 (Awa) dialect figure alone,
which is not the dialect this row transcribes. It should be ~68K (Ethnologue) or ~95K (Chinese sources);
if the intent was the Bulang dialect proper it is ~55K. The nationality figure ~120K is fine
(119,639, 2010 census).
Verified against: https://zh.wikipedia.org/zh-hans/布朗语 ; https://www.ethnologue.com/language/blr/

**7. FIX — rbb `speakers:'~20K in China, more in Myanmar'` conflates the whole De'ang nationality with
Rumai, and understates Myanmar.**
~20K is the entire De'ang nationality (17,935 in 2000; 20,556 in 2010), which comprises five subgroups
(Liang/Ta-ang, Pule/Ka-ang, Rumai, Raokot/La-ang, Raojin/Na-ang — Deepadung's own survey, and the
`EthnicName` column of the very dataset this row uses). Rumai is only one of them, so the China figure for
*this row* is far below 20K. Meanwhile Ethnologue gives **139,000 Rumai speakers**, essentially all in
Myanmar — "more in Myanmar" understates by roughly sevenfold. The row's own coverageNote already says
"this row is Rumai and does not stand for the other two", so the speakers field contradicts it.
Verified against: https://en.wikipedia.org/wiki/Palaung_language ("139,000 Rumai speakers"; subgroup list);
deepadungpalaung_languages.csv (EthnicName column); https://zh.wikipedia.org/zh-hans/德昂族

**8. FIX — blr coverageNote: "it carries no kinship term beyond 'child'" is false for the Peiros list.**
The Peiros 100-item list has **no 'child' parameter at all** — its human-reference items are `51_man`,
`64_person`, `99_woman`. The sentence is boilerplate copied from the rbb row (where the Deepadung list
*does* have `50_child` = `kɔːn`). The blr version should read "no kinship term at all". (The consequent
claim — that mother/father are unattested — is correct either way.)
Verified against: full parameter enumeration of `peirosaustroasiatic_parameters.csv` (100 items, listed below).

**9. FIX — blr `script:'Unwritten'` / `official:'… language unwritten'` / "The language is unwritten" in all
18 descriptions is contradicted by every source consulted.**
zh-wiki 布朗语: 「西双版纳州的布朗族借用西双版纳傣族书写傣仂语用的老傣仂文来书写布朗语」，「德宏州的布朗族借用…傣那文来书写布朗语」.
Ethnologue and en-wiki both give **Tai Tham** as Blang's writing system. The accurate framing is the one the
atlas already uses for `srh`: "Unwritten (…used in writing)" — here, "No native orthography; the borrowed
Tai Tham (Xishuangbanna) and Tai Le (Dehong) scripts are used."
Verified against: https://zh.wikipedia.org/zh-hans/布朗语 ; https://en.wikipedia.org/wiki/Blang_language

**10. FIX — rbb `script:'Unwritten'` / "The language is unwritten" is likewise contradicted.**
zh-wiki 德昂语: 「德宏州的德昂族借用德宏傣族书写傣那语用的傣那文来书写德昂语」. And for rbb specifically,
en-wiki Palaung language: the Burmese-based Palaung script, standardised 1972 and used in non-formal
education in Shan State and Mandalay, "is especially used for the northern Palaung varieties of **Shwe and
Rumai**". Since the ISO code rbb covers the (much larger) Myanmar Rumai population, "unwritten" is wrong
for the languoid; it is defensible only as "unwritten in China".
Verified against: https://zh.wikipedia.org/zh-hans/德昂语 ; https://en.wikipedia.org/wiki/Palaung_language

**11. FIX — rbb coverageNote's WE sentence is boilerplate that does not describe this source.**
It reads "…the list gives at most one first-person-plural form with no inclusive/exclusive label, so a
single form here is an incomplete record…". The Deepadung list has **no first-person-plural parameter at
all** — its only pronouns are `99_i` and `100_yousg`. The `unattestedReason:{we:'unsourced'}` is correct
here; the prose reason is not. It should simply say the list has no 1PL item. (Same sentence appears in the
blr note, where it *is* accurate — see finding 3.)
Verified against: full enumeration of `deepadungpalaung_parameters.csv` (100 items, listed below).

## NOTE

**12. NOTE — Section 4 (the Plang-vs-Wa identification): the row's argument HOLDS, and is independently
corroborated. No defect.**
- Peiros's `Wa` is Wa: `nham` blood, `rhaŋ` tooth, `rɔm` water, `soʔ` dog, `ŋai` eye, `lhɛʔ` rain, `mhɔm`
  good, `jiʔ` we, `maiʔ` thou, `ʔəʔ` I — cell for cell the atlas's existing `wbm` row (n̥am, r̥aŋ, rɔm, so,
  ŋai, l̥ɛʔ, ʔiʔ, maiʔ, ʔɤ). The coverageNote's five example pairs all check out.
- **ASJP tags the identical data `nucl1290`/`wbm` "Zhenkang Wa"** (asjp_langs.csv, doculect `WA`,
  source: Peiros 1998). So a second, independent curation of the same material puts it on the atlas's own
  Wa row, not on blr. The Lexibank tag is indeed a mis-mapping — and it is a *curator addition*: the
  upstream `raw/languages.txt` leaves `PALAUNGWA_Wa` with **no** ISO code, and `etc/languages.tsv` adds
  `blan1242 blr`.
- **ASJP has a `PLANG` doculect tagged `blan1242`/`blr` "Blang"** at 21.57/100.13 (Menghai), curated by
  **Paul Sidwell and Søren Wichmann**, whose forms are the same list: `3t` I, `mit` you, `7et ti` we,
  `nam` blood, `haN` tooth, `om` water, `so` dog, `ya yuk` ear, `sa m3iN` star, `ka tak` tongue, `ta buh`
  night, `lai` two — including the *same two truncations*, `uk sa mu` and `Nai sa Ni`.
- Its bibliography entry is **Paulsen, Debbie, "A phonological reconstruction of Proto-Plang", Mon-Khmer
  Studies 18-19: 160-222**, which sketches the **Kontoi, Shinman (= 新曼俄 Xinman'e) and Samtao** dialects
  — all of them Blang varieties; Glottolog blan1242's alternative names include *Plang*, *Kontoi*,
  *Samtao of Burma*.
- It is not Samtao and not Hu: Peiros carries `Guanshuang` (samt1238/stu) and `Hu` (huuu1240/huo) as
  separate doculects, and `Plang` matches neither (Guanshuang `rom`/`rhaŋ`/`nham` is Wa-like; Hu `ŋal`
  fire, `çak.55 ŋai.33` eye, `ɔʔ` I).
Verified against: /home/jounlai/langmap-work/asjp_langs.csv, asjp_forms.csv, asjp_src.bib (keys 8447, 11039);
https://github.com/lexibank/peirosaustroasiatic (raw/languages.txt vs etc/languages.tsv);
https://glottolog.org/resource/languoid/id/blan1242

**13. NOTE — but the blr row should not be read as the *reference* Blang dialect.**
`Plang`'s four tones are 33 / 31 / 51 / 55. The published tone system of the Blang reference lect 新曼俄
(Xinman'e, Bulangshan, Menghai) is **35 / 33 / 331 / 21** (《布朗语简志》 via zh-wiki 布朗语), and Peiros's
*separate* `Mane` (= Man'e 曼俄) doculect uses .35/.33/.31 accordingly. So the `Plang` list is a different
Blang lect — most likely Paulsen's Kontoi. The map pin is at Menghai town (21.96/100.45), which may or may
not be where this lect is spoken; ASJP puts its PLANG at 21.57/100.13. Worth a sentence in the
coverageNote rather than the current implication that Plang = the Blang of Menghai.
Verified against: https://zh.wikipedia.org/zh-hans/布朗语 ; peirosaustroasiatic_forms.csv (Mane); asjp_langs.csv.

**14. NOTE — Section 5 identification is otherwise fully confirmed.**
`deepadungpalaung_languages.csv`: `NanSang, Nan Sang, ruma1248, Rumai Palaung, rbb, 24.019728, 97.819736,
Palaung, "Ruili, Dehong", Rumai, NS` — village, prefecture, glottocode, ISO and ethnonym all as the row
states, and the map pin (24.02/97.82 in wordmap_data.js:1080) is the dataset's own coordinate. Rumai is a
China De'ang variety, not a Myanmar-only one: en-wiki's Palaung dialect list gives "**Rumai**: Nan Sang,
Guang Ka, Mang Bang" (all Dehong), and Yan & Zhou (2012) place the 汝买/若买 dialect in Zhenkang and
Baoshan, Yunnan.
Verified against: deepadungpalaung_languages.csv ; https://en.wikipedia.org/wiki/Palaung_language

**15. NOTE — rbb's three-way dialect split is defensible but conflicts with the row's own source.**
"Rumai (汝买), Ruching or Bulei (布雷) and Raojin (若进)" matches 《德昂语简志》 (陈相木・王敬骝・赖永良 1986).
But (a) Yan & Zhou (2012), which both zh- and en-Wikipedia follow, make **Raojin 饶进 a sub-dialect of the
Bulei 布雷 dialect** and give **Liang/Na-ang 梁/纳盎** as the third; and (b) **Deepadung's own survey — the
source this row uses** — finds *five* De'ang subgroups in Dehong (Liang/Ta-ang, Pule/Ka-ang, Rumai,
Raokot/La-ang, Raojin/Na-ang) and a lexical three-way split of **Raojin | Rumai-Raokot | Pule-Liang**. If
the row cites Deepadung it should not present the 1986 三方言 as the classification.
Verified against: https://en.wikipedia.org/wiki/Palaung_language (§Dialects, Yan & Zhou 2012 and Deepadung);
deepadungpalaung_languages.csv EthnicName column.

**16. NOTE — blr description: "Its closest relatives are Wa and Parauk … and the three together make up the
Waic side of Palaungic" overstates.** Waic also contains Lawa, Awa, Samtao and the other Bulangic lects;
Glottolog puts Blang under Waic > *Bulang* and Wa/Parauk under Waic > *Wa*. "The three this atlas carries"
would be accurate.

**17. NOTE — validator output.** `node validate_wordmap_data.js` PASSes, with one open item touching both
rows: `[#201a] new lang "blr"/"rbb": missing lang_names entries in 4/21 UI sections (es_eu, es_mx, pt_eu,
pt_br)`.

**18. NOTE — rbb `white`: the source `Value` lists two variants, `Ɂiluj, luj`; the row takes `Ɂiluj`, which
is what the CLDF `Form` column selects.** Correct, and the only Value≠Form divergence in either doculect.
Flagged only so it is on the record.

---

## Appendix: absence claims, verified item by item

**Peiros 100-item list** (`peirosaustroasiatic_parameters.csv`, all 100):
all, ashes, bark, belly, big, bird, bite, black, blood, bone, breast, burn tr., claw (nail), cloud, cold,
come, die, dog, drink, dry, ear, earth, eat, egg, eye, fat n., feather, fire, fish, fly v., foot, full,
give, good, green, hair, hand, head, hear, heart, horn, I, kill, knee, know, leaf, lie, liver, long, louse,
man, many, meat, moon, mountain, mouth, name, neck, new, night, nose, not, one, person, rain, red, road,
root, round, sand, say, see, seed, sit, skin, sleep, small, smoke, stand, star, stone, sun, swim, tail,
that, this, thou, tongue, tooth, tree, two, walk(go), warm, water, we, what, white, who, woman, yellow.
→ no THREE ✔ true · no HOUSE ✔ true · no CAT ✔ true · no 'to LOVE' ✔ true · no greeting/thanks ✔ true ·
no MOTHER/FATHER ✔ true · **no CHILD either — so "no kinship term beyond 'child'" is FALSE (finding 8)** ·
WE **is** present (finding 3).

**Deepadung 100-item list** (`deepadungpalaung_parameters.csv`, all 100):
sun, moon, star, cloud, rain, wind, night, year, water, earth/soil, stone, mountain, tree, root, leaf,
flower, fruit, grass, salty, dog, bite, horn, tail, bird, fly, egg, fish, snake, louse, head, hair, eye,
nose, ear, mouth, tongue, tooth, abdomen, heart, liver, intestines, hand, nail, foot, bone, fat, skin,
blood, person/human, child, name, road/path, sew, fire, ashes, smoke, smell, see, eat, drink, spit,
breathe, laugh, know, fear, sleep, scratch, die, sit, stand, fall/drop, give, rub hard with both hands,
cut, dig, burn, hunt, kill, one, two, three, four, many, long, full, right side, left side, far, near,
this, black, white, new, old-aged, cold, heavy, who?, what?, I, you (sg.).
→ no GOOD ✔ true · no RED ✔ true · no CAT ✔ true · no 'to LOVE' ✔ true · no greeting/thanks ✔ true ·
no HOUSE ✔ true · CHILD present, no other kinship ✔ true · **no WE parameter at all (finding 11)**.

No parameter of either dataset exists under a different name that would falsify an absence claim
(error class (c) does not apply): both lists were enumerated in full above.
