# Rally pass 4 — coverageNote claims checked against the source CSVs

Scope: the 19 rows added 2026-09-05…08 (kmc giq shx peh orh acn lic swi mmd jiu pmi twm dta mlm nuf clk blr rbb srh).
Sources checked: `/home/jounlai/langmap-work/lb/{abvd,peirosaustroasiatic,deepadungpalaung,iecor,sagartst,johanssonsoundsymbolic,mannburmish}_*.csv`
and `/home/jounlai/langmap-work/lb2/{suntb,rob}_*.csv`.
Every claim of absence below was checked by enumerating the dataset's **full** parameter list, not by keyword search.

Rows whose notes are **fully supported** by the source — every factual assertion checked and confirmed:
**orh** (§41), **swi** (§43), **mmd** (§44), **srh** (§38), and **lic** (§42) and **shx** (§40) apart from wording caveats (§20, §39, §42-tail).
Rows with substantive errors: **dta** (§§1–5), **peh** (§§7–11), **kmc** (§§13–14), **giq** (§§16–18), **acn** (§§21–22),
**nuf/clk** (§§24–25), **blr** (§29), **rbb** (§§33–34), **mlm** (§45), plus a rule shared by four Kra-Dai rows (§47).

---

## dta (Daur / Robbeets et al., `lb2/rob_*`)

**1. BLOCKER — dta — transcription rule stated that the source contradicts.**
Note: *"The acute in sí 'you' marks a postalveolar, so the IPA is ʃi."*
Source: `rob_forms.csv`, `Dagur / 2SG pronoun`, `Value='sí'`, **`Segments='s í/i'`** — the dataset's own orthography profile maps the grapheme `s` to `s` and `í` to plain `i`; it yields *si*, not *ʃi*. The acute is a **vowel** diacritic: it occurs on 25 rows in the whole dataset (`grep 'í'`), 23 of them Yonaguni (`mín` water, `íyu` fish, `níndun` sleep, `khírun` do…), and every one is segmented `í/i`. Where Robbeets does mean a postalveolar she writes it outright — `š/ʃ` (`šor` 'sharp'), `ś/ʃ` (`śinken` 'new') — and where she means palatalisation she puts the acute on the consonant (`ḿagə` 'meat', `Segments='ḿ/m a g ə'`).
Corrected wording: *"Two forms carry an acute on the vowel, sí 'you' and sídə 'tooth'. The dataset segments both as plain s + i; this row nevertheless writes ʃi / ʃidə, following the descriptive literature on Dagur (2sg ʃii) rather than the CLDF profile."* — or drop the claim and write *si*, *sidə*.

**2. FIX — dta — the same rule is applied to a second cell the note never mentions.**
`words/tooth.js` `dta: ["sídə", "ʃidə"]` — s→ʃ applied here too (source `Value='sídə bor'`, `Segments='s í/i d ə + b o r'`). The note only licenses it for 'you'.

**3. FIX — dta — the `bor` row count is wrong.**
Note: *"it is the dataset's borrowing marker, used on 643 rows across some 90 of its languages"*.
Source: `rob_forms.csv` has 26,224 rows; `bor` as a whole token appears on **641** rows (**642** if you count trailing-token occurrences), across **92** languages. Five further rows contain the letters *bor* inside a lexeme and are not marks (KazanTatar `borïn`, Jurchen `dobori`, Dolgan/Yakut `obor`, Dongxian `borun`).
Corrected wording: *"used on 641 rows across 92 of its languages"*.

**4. FIX — dta — "always on a transparent loan" is falsified by the note's own second example.**
Source: `bor` sits on the TOOTH entry of **every** Mongolic doculect in the dataset — Baoan `ʂdɵŋ bor`, Buriat `šüde(n) bor`, Dagur `sídə bor`, Khalkha `šüd(en) bor`, Moghol `sʉdʉn bor`, **MiddleMongolianSecretHistory `šidu bor`**, **MiddleMongolianMuqaddimataladab `šidün bor`** (15 rows). A 13th-century attestation of inherited Proto-Mongolic \*sidün is not a transparent loan. The marker flags whole cognate sets Robbeets treats as contact-derived, not individually obvious borrowings; the `Loan` column of the dataset is empty on all 26,224 rows, so `bor` is the only signal and it is set-level.
Corrected wording: *"…it is the dataset's contact/borrowing set-marker, set on 641 rows across 92 languages. It marks a whole cognate set, not an individually transparent loan — the same mark sits on Middle Mongolian šidu 'tooth'. Both are trimmed."*

**5. NOTE — dta — "Two entries, bird and tooth, are printed with a trailing bor."**
True of the cells this row uses, but Dagur carries **10** `bor` rows in the dataset (fly n., tooth, bird, branch, fly v., throat, wood, flower, sky, stick). Worth saying "two of the entries this row uses" so a re-derivation is not surprised.

**6. Verified for dta:** `č→tʃ`, `ǯ→dʒ`, `y→j`, `ā/ō/ū→aː/oː/uː`, `':'→ː`, hyphen dropped on verb stems (`idə-`→`idə`, `wante-`→`wante`) — all applied exactly as stated. WE: `rob_forms.csv` prints `1PL pronoun` as `ba:` then `bide`; the cell is `bide / ba:` — reordered as stated. Daur non-tonal ✓.

---

## peh (Bonan / ABVD language 942)

**7. BLOCKER — peh — "surface and IPA are the same string" is false in seven cells.**
Note: *"Bonan is Mongolic and non-tonal, so no tone notation applies and surface and IPA are the same string."*
The row applies an undeclared ʨ→tɕ / ʥ→dʑ expansion in the IPA field only:
| cell | surface | IPA | ABVD `Value` |
|---|---|---|---|
| blood | `ʨisuŋ` | `tɕisuŋ` | `ʨisuŋ` (23_blood) |
| ear | `ʨiχaŋ` | `tɕiχaŋ` | `ʨiχaŋ` (43_ear) |
| earth | `saʨiə` | `satɕiə` | `saʨiə` (119_earthsoil) |
| white | `ʨiɢaŋ` | `tɕiɢaŋ` | `ʨiɢaŋ` (148_white) |
| you | `ʨǐ` | `tɕǐ` | `ʨǐ` (183_thou) |
| hundred | `ʥyŋ` | `dʑyŋ` | `ʥyŋ` (209_onehundred) |
| fish | `ʥilɣasuŋ` | `dʑilɣasuŋ` | `ʥilɣasuŋ` (111_fish) |
Corrected wording: *"Bonan is Mongolic and non-tonal, so no tone notation applies. The source writes the affricates with the ligatures ʨ and ʥ; the surface keeps them as printed and the IPA expands them to tɕ and dʑ, so the two fields differ only there."*

**8. FIX — peh — `unattestedReason` does not cover the two absences the note names.**
Note: *"bird and stone are not in this list"* — verified (ABVD 942 has no `97_bird` and no `120_stone` row). But `words/bird.js` and `words/stone.js` carry **no `peh` key at all**, and `unattestedReason` lists only `cat, heart, hello, love, sun, thanks`. Every other row in this batch dashes an absent core cell and gives it a reason (blr dashes `stone`, `sun`, `three`, `house`). Add `peh: ["—","—"]` to bird.js and stone.js and `bird:'unsourced', stone:'unsourced'` to the reason map.

**9. FIX — peh — a stated-nowhere hyphen rule.**
`37_toeat` `Value='nda-'` → cell `nda`; `40_todrink` `'u-'` → `u`; `48_tosleep` `'təra-'` → `təra`. The dta note declares its hyphen-stripping; this note does not.
Corrected wording: add *"…and the hyphen the source puts on verb stems is dropped (nda-, u-, təra-)."*

**10. FIX — peh — TREE is an undisclosed Chinese loan glossed 'stick'.**
`words/tree.js` `peh: ["guaiguŋ","guaiguŋ"]` comes from ABVD `79_stickwood`, whose row reads `Value='guaiguŋ'`, **`Comment='< chinese'`, `Loan='true'`** — the parameter is "stick/wood", not "tree". The note carefully discloses every other derivation and every absence in this row; this one is silent.
Corrected wording: add *"There is no tree item; the cell is item 79 'stick/wood', guaiguŋ, which the source flags as a Chinese loan."*

**11. NOTE — peh — attribution.**
Note: *"Forms are Liu Zhaoxiong's transcription as carried by ABVD."* ABVD 942's source field reads `布和, 刘照雄 (1981) 保安语简志` — Bu He is first author. Corrected: *"Bu He and Liu Zhaoxiong's transcription"*.

**12. Verified for peh:** two caroned vowels kept (`bǔ` 'I', `ʨǐ` 'thou' — ABVD `182_i Value='bǔ(bə)' Form='bǔ'`, `183_thou 'ʨǐ'`) ✓; water `sǔ`/`sə` → plain `sə` taken ✓; `168_day = udər` with no 'sun'-annotated entry, so SUN dashed ✓; WE `bədə`, `Comment=''`, routed undecided ✓.

---

## kmc (Southern Dong / ABVD 677)

**13. FIX — kmc — an undeclared character normalisation, applied to both fields.**
Note: *"Forms are Long & Zheng's phonemic transcription as carried by ABVD"* and *"The surface keeps those digits"* — implying the surface is the source string. It is not: ȶ→tɕ and ȵ→ɲ were applied in **both** fields.
| cell | ABVD `Value` | cell surface |
|---|---|---|
| eat | `ȶan55` (37_toeat) | `tɕan55` |
| we | `tau55` / `ȶiu55` (185_we) | `tau55 / tɕiu55` |
| night | `ȵɐm53` (167_night) | `ɲɐm53` |
| moon | `kwaŋ55 ȵan55` (129_moon) | `kwaŋ55 ɲan55` |
| you | `ȵa212` (183_thou) | `ɲa212` |
This is *not* a house style: the four sister ABVD rows added in the same batch keep the source characters (lic `taȶ7`, `ɬeȵ1`, `ȵa:n1`; swi `ȶən1 ⁿdaau1`; mmd `ʔȵam5`).
Corrected wording: add *"The source's ȶ and ȵ are normalised to tɕ and ɲ in both fields."* — or leave them as printed, matching lic/swi/mmd.

**14. NOTE — kmc — the note's own citation is normalised.**
Note: *"two ja323 over ɲi33"*. ABVD `198_two` prints `ja323` (`Comment='Native Dong'`) and **`ȵi33`** (`Comment='Chinese', Loan='true'`). Quote it as the source spells it, or state the normalisation (finding 13).

**15. Verified for kmc:** tones are Chao values, converted 55→˥˥, 323→˧˨˧ etc. ✓; the collisions the note cites are real (`149_red ja453` vs `198_two ja323`; `147_black nɐm55` vs `122_water nɐm31`) ✓; `atb yum51` exists (`words/drink.js`) ✓; native-over-Chinese choice at `197_one` (`ʔi55` 'Native Dong' over `ʔət55` 'Chinese') ✓; both 1PL forms carried in listing order with `Comment=''` on both ✓; ABVD 761 Mulam `185_we` really is annotated `inclusive` / `exclusive` ✓; ABVD 771 Haifeng She `185_we` really carries *"Can stand for inclusive or exclusive as Haifeng She does not distinguish between the two."* ✓; ABVD has no heart/cat/love/greeting parameter ✓.

---

## giq (Green Gelao / ABVD 699 "Gelao (Wanzi)")

**16. FIX — giq — the apostrophe rule is applied but not stated, and is the opposite of the sibling row's.**
ABVD 699 writes aspiration with an ASCII apostrophe: `59_mother Value="p'ɒ44"`, `32_tongue "p'i55 te24"`. The cells are `["p'ɒ44","pʰɒ44"]` and `["p'i55 te24","pʰi55 te24"]` — apostrophe **kept** in the surface, expanded in the IPA. The shx note declares exactly this convention and resolves it the other way (*"both fields normalise it to the IPA diacritic"*, `k'ua54` → `kʰua54`). giq's note says nothing.
Corrected wording: add *"The source writes aspiration with an ASCII apostrophe (p'ɒ44); the surface keeps it and the IPA writes pʰ."* — and reconcile with shx, which normalises both fields.

**17. NOTE — giq — "the other Gelao lists have it" overstates.**
Note: *"'tree' is not in this wordlist; the other Gelao lists have it"*. Of the three ABVD lists coded `giq`, only **695 (Zhenfeng)** has the relevant item (`79_stickwood Value='thui24 mo42 tai42' Comment='mo42 tai42 = tree'`); **700 (Sanchong)** has no `79_stickwood`, `113_branch` or `127_woodsforest` either. (Red Gelao 926, ISO `gir`, does have it.)
Corrected wording: *"…the Zhenfeng list has it, but mixing lects inside one row…"*.

**18. NOTE — giq — autonym vs doculect.**
ABVD 699's record reads *"The speakers' autonym is klau55."* The row's `native:` is `'Hagei'`, which is ABVD **695 (Zhenfeng)**'s autonym (*"Their autonym is ha42 ke42"*). The forms are Wanzi; the label is Zhenfeng's.

**19. Verified for giq:** tone values 33→˧˧, 24→˨˦, 44→˦˦, 13→˩˧ ✓; `185_we Value='su33 ta33', Comment=''` — one free form, unannotated ✓; ABVD's questionnaire is 210 items ✓ (the Wanzi list fills 174 of them).

---

## Shared ABVD wording problem (giq, shx, mlm)

**20. FIX — giq / shx / mlm — "tree is not in this wordlist / this list" is misleading.**
ABVD's parameter file has **210** parameters and **none of them is TREE** — the body of the list runs `79_stickwood 'stick/wood'`, `113_branch`, `114_leaf`, `127_woodsforest`. Where these rows do have a TREE cell it is read off `79_stickwood` (kmc `mɐi31`, `Comment='wood, stick, log, tree'`; lic `tshai1`, `Comment='tree'`; mmd `mai4`, `Comment='tree, wood'`) or off `113_branch` (swi, as that note says). The three "no tree" notes read as if ABVD asks for 'tree' and these lects failed to answer.
Corrected wording (all three): *"ABVD has no tree item; where a row has one it comes from item 79 'stick/wood'. This list has no entry there, so tree is left unattested."*

---

## acn (Achang / Sagart Sino-Tibetan, `lb/sagartst_*`)

**21. FIX — acn — "Eye and night are absent from this list" conflates two different absences.**
Source: `sagartst_parameters.csv` has 250 parameters and **`the eye` is one of them**. What is absent is the Achang *form*: `sagartst_forms.csv` gives Achang 240 of the 250, and `the eye` is one of exactly 12 parameters with no Achang row (the others: barley, to be alive, the forest, the fox, to knead, knife, to know, to learn, to marry, to run, to sow). **`night` is genuinely absent from the parameter list.**
Corrected wording: *"Sagart's list has no NIGHT concept, and Achang is one of the doculects with no EYE entry — twelve of his 250 concepts are blank for it."*

**22. NOTE — acn — four dashed cells go unexplained.**
`unattestedReason` dashes `cat, eye, night, love, hello, thanks`; the note explains only eye and night. (`cat`, `love`, and any greeting/thanks formula are indeed absent from all 250 Sagart parameters — the claim would be true, it is just not made.)

**23. Verified for acn:** Sagart's `Form` field really is dot-segmented (`ŋ.ɔ.⁵⁵.+.t.u.ʔ.³¹`) and `Value` uses `+` between words; both undone ✓. `we [first person plural inclusive]` is Sagart's concept name, and `lb2/suntb_forms.csv` gives Achang the **same** form `ŋɔ⁵⁵tuʔ³¹` for both `971_we (我们, WE (EXCLUSIVE))` and `972_weinclusive (咱们, WE (INCLUSIVE))` — the row's `single` routing is exactly right ✓. The Mann's Burmish contrast is exact: `mannburmish_forms.csv` Achang `black = nɔɂ³¹` vs Sagart's `lɔk⁵⁵`, and Mann's Achang does carry `eye = njɔɂ³ dʒi⁴³` and `night = njɛn³⁵` ✓.

---

## suntb rows (jiu, pmi, twm, nuf, clk)

**24. FIX — nuf, clk — the source title is misprinted.**
`wordmap_meta.js` writes the same book two ways: jiu / pmi / twm have *Sun Hongkai (1991) 藏缅语语音和词汇*; **nuf and clk have 藏缅语音和词汇** (one 语 short). Sun's 1991 title is 《藏缅语语音和词汇》. Fix nuf and clk to match.

**25. FIX — nuf — the digraph rule does not cover `sh`, which the profile handles two ways.**
Note: *"Aspirates are written as bare digraphs (th, ch) in the source spelling, which the surface keeps; the IPA column uses the CLDF's own segmentation, which spells them tʰ and cʰ."*
`lb2/suntb_forms.csv`, BijiangNusu:
- `tooth`: `Value='shua⁵⁵'`, `Segments='ɕ w a ⁵⁵'` → cell `["shua55","ɕwa˥˥"]`
- `ear`: `Value='n̥ɑ⁵⁵shə̃ɹ³⁵'`, `Segments='n̥ ɑ ⁵⁵ + sʰ ə̃ ɹ ³⁵'` → cell `["n̥ɑ55shə̃ɹ35","n̥ɑ˥˥sʰə̃ɹ˧˥"]`
The same digraph `sh` becomes `ɕ` in one cell and `sʰ` in the other. The row copied the profile faithfully in both, but a reader following the stated rule would expect `sʰua`.
Corrected wording: add *"The profile is inconsistent on sh: it reads tooth shua as ɕwa but ear …shə̃ɹ as …sʰə̃ɹ. Both are kept as the dataset segments them."*

**26. NOTE — jiu / pmi / twm / nuf / clk — "the IPA column uses the CLDF's own segmentation" holds only for the aspirates.**
The segmentation also normalises characters the IPA column keeps: `ȵ→ɲ` (jiu sun `ȵɔ³⁵` / `Seg='ɲ ɔ ³⁵'`, cell `ȵɔ˧˥`), `ᴀ→a` (twm sun `plᴀŋ⁵³` / `Seg='p l a ŋ ⁵³'`, cell `plᴀŋ˥˧`), `u̵→ʉ` (pmi sun `bu̵⁵³` / `Seg='b ʉ ⁵³'`, cell `bu̵˥˧`), `i→j` (clk drink `tioŋ⁵⁵` / `Seg='t j o ŋ ⁵⁵'`, cell `tioŋ˥˥`), and `v→ɤ` (jiu egg `ɑ³³vu³³` / `Seg='ɑ ³³ + ɤ u ³³'`, cell `ɑ˧˧vu˧˧` — correctly ignored, the segmentation is wrong there). Narrow the sentence to the aspirates.

**27. NOTE — twm — the two artefacts the note names are dataset-wide in this doculect.**
Verified exactly: `egg Value='khAʔ⁵³lum⁵³'` (Latin capital A) and `five Value='le³¹ŋe⁵³|'` (trailing table rule). But MamaTshona has **16** rows with a stray `|` or a Latin capital A (duck `jᴀ¹³|tse⁵³`, teacher `cer¹³kAn⁵³`, fireplace `thAm⁵³`, celebrate-new-year `lɔ¹³|sᴀr⁵⁵thoʔ⁵³`, …). Idu has 15, Jinuo 27, TaobaPumi 2. Worth flagging as a dataset-level artefact so a re-derivation checks for it.

**28. Verified for jiu / pmi / twm / nuf / clk (all five):**
- *"That wordlist has no BONE concept at all"* — **true**. `suntb_parameters.csv` has 1,004 parameters; the body-part run is `skin, sinew, blood, stomach, kidney, intestines, heart, liver, lung, gall, bladder`, with no bone/骨 anywhere.
- *"two separate 1PL entries, glossed 我们 and 咱们"* — **true**: `971_we` (`Chinese_Gloss='我们'`, Concepticon `WE (EXCLUSIVE)`) and `972_weinclusive` (`咱们`, `WE (INCLUSIVE)`). (There is also a dual `970_wetwo`, 我俩.)
- *"the WE cell gives the inclusive first and the exclusive second"* — **correct in all five**: jiu `a33ŋ̊o33 / ŋa33jo31` (972 `a³³ŋ̊o³³` / 971 `ŋa³³jo³¹`); pmi `ɛ̃35rə53 / a35rə53`; twm `ŋᴀ13tᴀŋ53 / ŋᴀ13rᴀʔ53`; nuf `ɑ55iɯ31 / ŋɑ35dɯ31`; clk `ŋɑ35nɑ31loŋ35 / ŋɑ35ɑ31loŋ35`.
- Doculect identification: jiu = `Jinuo`, glottocode `youl1235` (Youle) ✓; pmi = `TaobaPumi`, `taob1238`, Muli ✓; twm = `MamaTshona`, and the CLDF really does file it under **`ISO639P3code=dzl`, `Glottocode=dzal1238`** (Dzalakha), exactly as the note says ✓; nuf = `BijiangNusu`, `nusu1239` ✓; clk = `Idu`, `idum1241` ✓.

---

## blr (Blang / peirosaustroasiatic)

**29. FIX — blr — `unattestedReason` for STONE and SUN says `'unsourced'`, which the note itself refutes.**
The note is right about the mechanism (see §30) — but the forms *are* sourced and present. `Plang / stone = 'ʔuk.31 sa.31 mu'`, `Plang / sun = 'ŋai.31 sa.31 ŋi'`. Only `'unsourced'` and `'cultural-absence'` exist as reason codes anywhere in `wordmap_meta.js` (233 and 21 uses), so there is no honest code for "source datum corrupt". Either add one (`source-defective`) or route these two through a different mechanism; as it stands the machine-readable reason contradicts the prose.

**30. Verified for blr — every checkable claim holds exactly.**
- *"the CLDF's form field is hard-capped at fifteen characters across all 10,706 of its rows"* — **exact**. `len(peirosaustroasiatic_forms.csv) == 10706`; `Counter(len(Value))` runs 1…15 with **78** rows at 15 and **zero above**. No other dataset in play has a ceiling (abvd max 53, sagartst 128, iecor 63, suntb 27, rob 101, deepadung 12, johansson 52, mannburmish 26).
- The two truncated forms are quoted correctly and their segmentations confirm the lost tone: `stone Segments='ʔ u k ³¹ + s a ³¹ + m u'`, `sun Segments='ŋ ai ³¹ + s a ³¹ + ŋ i'` — final syllable toneless. (`smoke 'tu.33 sa.31 lit'` is the third 15-char casualty; unused here.)
- Orthography profile: `kh/kʰ`, `lh/l̥`, `mh/m̥`, `ć→tɕ` all as stated; `nh→nʰ` as stated (`good Segments='nʰ ɔ m'`, `see 'nʰ ɔ k'`, `this 'nʰ i'`), and the row's `n̥ɔm` matches wbm `n̥am`, prk `n̥am`, pll `n̥aːm` ✓.
- The curator mis-mapping is exact: `peirosaustroasiatic_languages.csv` gives `Plang` an **empty** ISO/Glottocode, and gives `Wa` **`blan1242` / `blr`**. Peiros' Wa forms match the atlas's `wbm` row cell for cell as quoted — `soʔ`/`so`, `ŋai`/`ngai`, `rɔm`/`rom`, `rhaŋ`/`rhaŋ`, `nham`/`nham` ✓.
- Absences: the list is 100 parameters; no mother, father, **child**, cat, love, greeting, thanks, THREE or HOUSE ✓ (all ten dashed cells accounted for).
- `we Value='ʔet.33 ti.31'`, `Comment=''` — unlabelled ✓, routed undecided ✓.

**31. NOTE — blr — "Plang matches neither Wa nor Parauk" is slightly strong.**
Plang `dog so.51` and `eye ŋai.33` are identical to the atlas's Wa row (`so`, `ngai`). The claim holds across the list as a whole (water `ʔom` vs `rɔm`, tooth `haŋ` vs `rhaŋ`, blood `nam` vs `nham`, heart `ćit` vs `rhɔm`) but two of the five cells the note lists as Wa-diagnostic are shared.

**32. NOTE — blr — the dot is silently stripped.**
Note: *"Tone is written there as Chao VALUES after a dot (sim.33) … the surface keeps the digits."* The surface is `sim33` — the dot is removed. Say so.

---

## rbb (De'ang Rumai / deepadungpalaung)

**33. FIX — rbb — "carries no kinship term at all" is false.**
Note: *"The list is Swadesh-shaped and carries no kinship term at all, no cat, no verb 'to love', no greeting or thanks formula, no GOOD and no RED."*
`deepadungpalaung_parameters.csv` is 100 parameters and includes **`child`** — Nan Sang has a form, `Value='kɔːn'`, `Segments='k ɔː n'`. It also has `person, human` (`taɁiː`). What it lacks is `mother` and `father`. This is the same shape as the pattern the other two notes get right (blr: *"not even 'child'"*; srh: *"it has no 'child' parameter either"*), so the wording is a copy that was not re-checked.
Corrected wording: *"…carries no MOTHER and no FATHER — its only kinship parameter is 'child' — no cat, no verb 'to love', no greeting or thanks formula, no GOOD and no RED."*

**34. FIX — rbb — HOUSE is dashed but never explained.**
`unattestedReason` includes `house:'unsourced'` and `words/house.js` has `rbb: ["—","—"]`, but the note's enumeration omits it. (The dash is correct — there is no `house` parameter in the 100.) Add it to the list, as blr's note does.

**35. NOTE — rbb — the ʥ→dʑ rule has no instance in this row.**
Note: *"the source … uses the ligatures ʨ and ʥ; the IPA column normalises those to ʔ, tɕ and dʑ."* Nan Sang does have five ʥ forms (`foot ʥɔːn`, `sew ʥən`, `stand ʥɔŋ`, `fall ʥoh`, `heavy ʥan`), but none of those concepts is in the atlas's word set, so no cell in this row contains dʑ. The ʨ→tɕ half is exercised (`ʨoŋ`→`tɕoŋ`, `ʨhok`→`tɕʰok`, `ʨɨː`→`tɕɨː`).

**36. NOTE — rbb — "following the dataset's own segmentation" is not literally what happened, and that is the right call.**
`heart Value='poŋkanɔh'`, **`Segments='p o n + k a + n ɔ h'`** — the profile silently turns ŋ into n. The cell keeps `poŋkanɔh` in both fields, which is correct; but the note's blanket "following the dataset's own segmentation" would license the wrong string here.

**37. Verified for rbb:** *"The source records no tone on any of its sixteen doculects"* — **exact**: `deepadungpalaung_languages.csv` has 16 rows, and a regex for any digit or tone letter over the whole `Value` column of `deepadungpalaung_forms.csv` returns **0** matches ✓. Nan Sang = `ruma1248` / `rbb`, `Location="Ruili, Dehong"`, `EthnicName=Rumai` ✓. Guang Ka is in the same survey, also `ruma1248`/Ruili, at 24.0657/97.7963 vs Nan Sang 24.0197/97.8197 — ≈5 km ✓. `Ɂ` capital-glottal ✓, aspirate superscripting ✓. **There is no `we` parameter** — the list has `I` and `you (sg.)` and stops there ✓, so the WE dash is correctly explained.

---

## srh (Sarikoli / iecor)

**38. srh — note fully supported.**
*"It has no pronouns at all, which is why I, you and we are unattested here"* — **verified by full enumeration**: `iecor_parameters.csv` has 170 parameters and contains no `I`, `thou`, `we`, `you`, `he/she` or `they`. *"carries no kinship term at all — it has no 'child' parameter either"* — verified (it has `man`, `woman`, no child/mother/father). No cat, no love, no greeting or thanks ✓. Tie-bar removal verified cell by cell: `cavur / t͡savuɾ → tsavuɾ`, `pindz / pind͡z → pindz`, `cem / t͡sem → tsem`, `khac / xat͡s → xats`, `ched / t͡ɕed → tɕed`, `namodhj / namoðd͡ʑ → namoðdʑ`, `charj / t͡ɕaɾd͡ʑ → tɕaɾdʑ`, `wareyj / waɾejd͡ʑ → waɾejdʑ`, `yuc / jut͡s → juts` ✓. All 49 surface strings equal `Value`; all 49 IPA strings equal `Phonemic` minus tie bars ✓.

**39. NOTE — srh — one undisclosed choice.** iecor gives Sarikoli **two** EGG forms, `kako` and `tqheem` (`Phonemic 'tχɵm'`); the cell takes `kako` and the note does not say so. Everything else in the row is single-valued.

---

## Rows verified clean

**40. shx — note fully supported.** Every claim checked against ABVD 771: apostrophe normalised in both fields (`k'ua54`→`kʰua54`) ✓; `200_four = pi35` and `32_tongue = pi35` ✓; `185_we` gives `pa22` and `le31 pa22`, both carrying the *exact* comment the note quotes, *"Can stand for inclusive or exclusive as Haifeng She does not distinguish between the two."* ✓, and `199_three = pa22` so the fuller form does disambiguate ✓; `168_day` carries `lɔ22 (Comment='day')`, `hau54 ('day')` and `lɔk22 kɔ44 ('sun')` ✓; the other She list is 762 Lianhua, a different lect, and it *does* carry `79_stickwood tɔŋ5 pa4` ✓. Tones in the forms are Chao values (22/31/44/54/11/35), so the tone table ABVD prints is indeed not needed ✓. (Wording caveat in §20.)

**41. orh — note fully supported.** `johanssonsoundsymbolic_parameters.csv` has 344 parameters: no CAT, no LOVE, no greeting/thanks ✓. It carries **64** kinship parameters, each doubled for female/male speaker — "about sixty" ✓. `father (female speaking)` and `father (male speaking)` are both `amɪn`; `mother` both `ənin` ✓. The dedicated pronoun parameters are `1PLI = buu` and `1PLE = mir` ✓ — exactly the assignment the note calls reversed relative to Tungusic \*buu exclusive / \*mit inclusive. All 49 cells have surface == IPA ✓.

**42. lic — note fully supported.** ABVD 772's own record prints *"Tones: 1 = /53/ 2 = /55/ 3 = /11/ 7 = /55/ 8 = /11/ 9 = /53/"* — the note's table verbatim ✓, and the conversions are applied correctly throughout (1→˥˧, 2→˥˥, 3→˩˩, 7→˥˥). No cell uses 8 or 9 ✓. `185_we`: `ga (Comment='inclusive')`, `fa1 ('exclusive')`, printed inclusive-first ✓, and `ga` genuinely carries no tone digit so the IPA leaves it toneless ✓. `168_day`: `tsha1 hwan1 ('sun')` and `hwan1 ('day')` ✓. `59_mother`/`60_father`: `pai3`/`pha3` `Comment='term of address'`, `pai3 za1`/`pha3 za1` `'term of reference'` ✓. Homophones exact: `96_dog = pa1`, `201_five = pa1`; `1_hand = meɯ1`, `183_thou = meɯ1` ✓. No HEART; body-part run is `15_bone, 16_intestines, 17_liver, 18_breast` ✓. (Undisclosed: TREE is `79_stickwood tshai1, Comment='tree'`, and DRINK had three variants — `hja:u1`, `tshɯp7`, `o:k9` — the first taken.)

**43. swi — note fully supported, including its hardest claim.** ABVD 736: `113_branch Value='pe5 mai4', Comment='mai4 = tree'` ✓ and `79_stickwood Value='mai52'` — a Chao value in a category-number list, correctly rejected ✓. `168_day Value='van1', Comment=''` — no 'sun' annotation anywhere in the Sui list ✓ (Hlai and Maonan both have one). `199_three haam1`, `200_four hi5`, `201_five ŋo4`, `209 pek7` all `Comment='Chinese', Loan='true'`, and each is the **only** entry for its concept ✓. `185_we`: `ȶən1 ⁿdaau1 ('inclusive')`, `ȶən1 ⁿdiu1 ('exclusive')`, printed in that order ✓. Tone table matches ABVD's record exactly, including the length split, and every cell converts correctly: `pek7`→˥˥ (short 55), `phjaat7`→˧˥ (long 35), `nok8`→˧˩ (short 31), `paak8`→˦˨ (long 42) ✓.

**44. mmd — note fully supported, including the loan-flag inversion.** ABVD 784: `148_white` — `kwa3` with `Comment=''` and **`Loan='true'`**, `pok8` with `Comment='Chinese'` and **`Loan='false'`**. The note's *"the entry's loan flag sits on the other row"* is exactly right ✓. `59_mother = [tɛ2, ni4]` and `60_father = [ni4, tɛ2]` — both parent terms under both concepts, so ordering could not settle it ✓. `37_toeat` and `40_todrink` are both `na4` with `Comment='to eat/drink'` ✓. `168_day`: `la:k8 van1 ('sun')`, `van1 ('day')` ✓. `129_moon`: `ni4 njen2` and `njen2 ta:i6` — no simplex ✓. Tone table verbatim from ABVD, correctly applied (`nam1`→˦˨, `tɛ2`→˨˧˩, `ᵐbjai3`→˥˩, `na4`→˨˦, `khəm5`→˦˦, `pɛk7`→˥˥ short, `phja:t7`→˦˦ long, `nɔk8`→˨˧ short, `da:k8`→˨˦ long) ✓. WE inclusive-first ✓.

---

## mlm (Mulam / ABVD 761)

**45. FIX — mlm — the SUN claim is incomplete: two entries are annotated 'sun'.**
Note: *"Three cells follow the source's annotations rather than its ordering: SUN is thəu5 fan1, annotated 'sun', not the simplex fan1 annotated 'day'…"*
ABVD 761 `168_day` has **three** rows: `fan1 (Comment='day')`, `thəu5 fan1 ('sun')`, and **`tət7 ('sun')`**. The annotation eliminates `fan1` but not `tət7`; listing order did that.
Corrected wording: *"SUN is thəu5 fan1, the first of the two entries the source annotates 'sun' (the other is tət7); the simplex fan1 it annotates 'day'."*

**46. Verified for mlm:** `129_moon`: `mɣa:n2 ('month')`, `kɣa:ŋ1 njen2 ('moon')` ✓ exactly as stated. `45_eye`: `ba1 ('Xiali (下里乡) Mulam Dialect')`, `l̥a1 (Comment='')`, `mɣa1 ('Siba (四把镇) Mulam Dialect')` ✓ exactly as stated. `185_we`: `hɣa:u6 ('inclusive')`, `niu2 ('exclusive')`, printed inclusive-first ✓. Doculect = Dongmen 东门镇, Luocheng ✓ (the sibling `936 Mulam (Siba)` is a different lect and gives different forms). Tone table verbatim from ABVD's record, correctly applied (`nam1`→˦˨, `nja2`→˩˨˩, `n̥a:u3`→˥˧, `pu4`→˨˦, `kɣəi5`→˦˦, `na:m6`→˩˩, `hɣop7`→˥˥ short, `phɣa:t7`→˦˨ long, `nɔk8`→˩˨ short, `pa:k8`→˩˩ long) ✓. No `79_stickwood`, no `127_woodsforest` for Dongmen, so TREE is genuinely underivable ✓ (wording caveat in §20). No HEART; body-part run as quoted ✓.
Unverifiable from the CSVs, flagged only: *"roughly two thirds of its vocabulary is shared with Zhuang and Kam"* and *"Lu Tian Qiao's Grammar of Maonan gives the same table independently"* (mmd) and *"Norquest's Proto-Hlai reconstruction confirms 1, 2, 3 and 7 for Lauhut"* (lic) — external sources, outside this pass.

---

## Cross-cutting

**47. FIX — lic, swi, mmd, mlm — two transcription rules are applied in all four rows and stated in none.**
(a) ASCII `:` for vowel length → IPA `ː`, surface keeps `:` (`tshi:n1` → `tsʰiːn˥˧`, `ɣaan2` → `ɣaːn˧˩`, `da:k8` → `daːk˨˦`, `hɣa:k7` → `hɣaːk˦˨`).
(b) `h`-digraph aspiration → superscript in the IPA only (`tsha1`→`tsʰa`, `khat7`→`kʰat`, `phja:t7`→`pʰjaːt`, `thəu5`→`tʰəu`).
Both are correct and consistent; but shx's note declares its analogous apostrophe rule and blr's declares its digraph table, so the silence in these four reads as if nothing was done. Add one sentence to the shared ABVD/Kra-Dai preamble.

**48. Artefact sweep (lens item 4), for the record.** Length-ceiling check on every dataset in play: only `peirosaustroasiatic` has one (hard 15, 78 rows at the cap) — the blr note's diagnosis is the only such case and is correct. Placeholder/marker tokens found: `bor` in `rob` (§§3–5), `|` and Latin capital `A` in `suntb` (§27), `; ` alternants in `suntb` and `sagartst` (handled via the `Form` column), `(…)` parentheticals in ABVD peh `duŋ (ʂduŋ)` and `bǔ(bə)` (handled via `Form`). Silent `Segments` normalisations that the notes' "follow the segmentation" language would get wrong: `rbb` heart ŋ→n (§36), `suntb` jiu egg v→ɤ (§26), `rob` Dagur three u→w.
