# Rally 2 — Task B: the `srh` row, and the 19-row China-nationality batch

Tree audited: `/home/jounlai/langmap` @ `ed55ef5c`. No file in `/home/jounlai/langmap` was modified.

Sources used throughout:
- `/home/jounlai/langmap-work/lb/iecor_{forms,parameters,languages}.csv` (IE-CoR, Heggarty et al. 2023)
- `/home/jounlai/langmap-work/lb/abvd_{forms,parameters,languages}.csv` (ABVD)
- `/home/jounlai/langmap-work/lb/peirosaustroasiatic_*.csv`, `deepadungpalaung_*.csv`, `sagartst_*.csv`, `johanssonsoundsymbolic_*.csv`
- `/home/jounlai/langmap-work/lb2/suntb_*.csv` (Sun Hongkai 1991), `/home/jounlai/langmap-work/lb2/rob_*.csv` (Robbeets et al. 2021)
- Builders: `/home/jounlai/langmap-work/cn/{lastfour,kmc,giq,shx,peh,orh,acn,kamsui,ks_raw,mulam,dta,suntb,raw_*,build,notes_fix,fields_fix}.py`

---

# PART 1 — the `srh` (Sarikoli) row

## §1 Extraction — CLEAN

1. **NOTE (clean).** All 40 sourced `srh` cells were re-derived from `iecor` language `296` and compared byte-for-byte after NFC: the surface equals `Form` and the IPA equals `Phonemic` with `U+0361` removed, in every case. No altered cell, no wrong-concept cell. The nine dashed cells (`cat father hello i love mother thanks we you`) are the only other `srh` entries; there is no `srh` cell for a concept iecor does not carry.

2. **NOTE.** `words/egg.js:860` `srh: ["kako","kako"]`. iecor 296 has two `egg` forms and the builder takes the first. That is the right one — the source's own comment on `296-39-1` reads *"kako refers to eggs generally (but only rarely chicken eggs), and tχɵm is used only for chicken eggs"* — but `words/egg.js`'s definition is *"the rounded object laid by a bird (esp. a hen's egg as food)"*, and the second form `tqheem / tχɵm` (`296-39-2`, glossed "egg (chicken)") is the exact match for that gloss. This is a judgement call, not an error; flagging it so it is a recorded decision rather than an accident of `[0]` indexing. Source: `iecor_forms.csv` rows `296-39-1`, `296-39-2`.

## §2 Concepts left out — CLEAN

3. **NOTE (clean).** iecor has exactly 170 parameters and doculect 296 has a form for all 170. Intersecting that list with `WORD_IDS` gives precisely the 40 concepts `M_SRH` already takes (bird black blood bone dog drink ear earth eat egg eye fire fish five four good hand heart house moon name night nose one rain red salt sleep snow star stone sun three tongue tooth tree two water white wind). **Nothing mappable was left behind.** The 18 `WORD_IDS` with no `srh` cell at all (atsign bear computer cuckoo daughter dopamine honey hundred iron milk n99 orange poop sushi tea wheel wine woof) have no iecor counterpart — iecor's largest numeral is `five`, and it has no cat/tea/iron/wheel/honey/milk/wine/bear items.

## §3 The absence claims

4. **FIX — `wordmap_meta.js:63`, `srh` `coverageNote`: "carries no kinship term beyond 'child'".** IE-CoR has **no `child` parameter at all**. Its full 170-item list contains `man`, `woman` and `person`-less body/nature vocabulary and *zero* kinship items. The claim as written asserts the source has a `child` item; it does not. What it should say: "carries no kinship term at all". The same sentence is copied verbatim into `blr`'s coverageNote, where it is equally false — Peiros's Austroasiatic 100 has `man`, `woman`, `person` and no `child` either. It is only true of `rbb`, whose Deepadung list does have `child`. Also appears in the comment block at `validate_wordmap_data.js:947-949` ("All three come from strict Swadesh-style comparative lists, which carry no kinship terms beyond 'child'"), where it is wrong for two of the three. Source: `iecor_parameters.csv` (170 names, enumerated), `peirosaustroasiatic_parameters.csv` (100 names), `deepadungpalaung_parameters.csv` (has `child`).

5. **NOTE (clean).** The remaining absence claims are all TRUE against the full 170-item list: **no pronouns at all** (no `I`, `thou`, `we`, `you` parameters — correct, and this is the reason `i`, `you`, `we` are dashed), **no cat**, **no `to love`**, **no greeting**, **no thanks**. Verified by enumerating `iecor_parameters.csv`.

## §4 The Tajik/Sarikoli claim

6. **NOTE (clean).** All four parts of the core claim hold. Sarikoli is Eastern (Southeastern) Iranian, Shughni–Yazghulami branch (Glottolog `sari1246`); Tajik of Tajikistan is Western → Southwestern Iranian, a variety of Persian; the two sit in different primary branches of Iranian and are not mutually intelligible; and the people China classifies as its Tajik nationality are the Sarikoli speakers. Sources: https://glottolog.org/resource/languoid/id/sari1246 , https://en.wikipedia.org/wiki/Sarikoli_language , https://en.wikipedia.org/wiki/Tajik_language

7. **FIX — `wordmap_meta.js:63`, `srh` `description` (all 17 languages): "Its closest relatives are the other Pamir languages, Shughni and Wakhi."** Shughni is right; **Wakhi is not a close relative**. Sarikoli sits inside the Shughni–Rushani (Shughni–Sarikoli) group with Shughni, Rushani, Bartangi, Khufi and Roshorvi, with Yazghulami next out. Wakhi is a separate, divergent Eastern Iranian branch (often grouped with Saka), and "Pamir languages" is an areal, not a genetic, grouping — no features uniting the Pamir languages as an Iranian subgroup have been demonstrated. Should read: closest relatives are Shughni and the other Shughni–Rushani varieties, then Yazghulami. This sentence is translated into 17 languages, so the fix is 17 strings. Source: https://en.wikipedia.org/wiki/Pamir_languages , https://en.wikipedia.org/wiki/Sarikoli_language

8. **FIX — `wordmap_meta.js:63`, `srh` `description`: "its name means 'stone tower' in Turkic."** Turkic *tash* 'stone' + *kurgan/qurghan*, and *kurgan* is **'fortress, fort'** (also 'burial mound'), not 'tower'. The accurate gloss is **"stone fortress"**. The "stone tower" rendering is contamination from the (contested) identification of Tashkurgan with Ptolemy's *Lithinos Pyrgos*; that identification is one of about four candidate sites and would need "sometimes identified with" if kept. Source: https://en.wikipedia.org/wiki/Tashkurgan

9. **FIX — `wordmap_meta.js:63`, `srh` `speakers:'~20K'`.** The figures diverge: Ethnologue gives **16,000** L1 (2000 count) with an ethnic population of 20,400; PRC's State Ethnic Affairs Commission gives **~30,000** Sarikoli speakers; the 2020 (7th) census puts the whole Tajik nationality at **50,896**. "~20K" appears to be Ethnologue's *ethnic* figure from a 26-year-old count, not a speaker figure. A defensible current value is `~30K`. Source: https://www.neac.gov.cn/seac/ztzl/tjkz/gk.shtml , https://www.ethnologue.com/language/srh/

10. **FIX — `wordmap_meta.js:63`, `srh` `description`: "Its speakers are the people China classifies as its Tajik nationality".** The identification runs one way only. China's 塔吉克族 covers three subgroups: Sarikoli speakers (majority), **Wakhi speakers (~10,000 per the State Ethnic Affairs Commission, against ~30,000 Sarikoli)**, and the "Tor Tajiks", who speak a Turkic variety. Sarikoli speakers are all inside the nationality; the nationality is not all Sarikoli speakers. The atlas already carries `wbl` (Wakhi) as its own row, so the two are separable in the data and the sentence should be qualified. Source: https://www.neac.gov.cn/seac/ztzl/tjkz/gk.shtml , https://en.wikipedia.org/wiki/Tajiks_in_China

11. **NOTE — `srh` `description`: "the only country where it is spoken".** Defensible but not what every source says. Glottolog gives China only; **Ethnologue and Wikipedia list Pakistan** (Broghil valley, Upper Chitral) on the strength of a community that migrated from Taxkorgan in 1932/1948. A 2022 field study found that community is ~60 people who have **lost the language**, having shifted to Wakhi and Khowar. So "the only country where it is spoken" is true of living speech communities and false of Ethnologue's country list; worth a half-clause so a reader checking Ethnologue does not think the row is wrong. Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC9599004/

12. **NOTE (clean).** Location `Tashkurgan Tajik Autonomous County, Kashgar Prefecture, Xinjiang` is correct (~26,133 of the nationality lived in the county at the 2010 census, 81.6% of county population). "Unwritten; Uyghur and Chinese used in writing" is correct as a statement of official/standard status; recent years have seen limited use of a modified Uyghur (Arabic-based) alphabet for Sarikoli itself, so "unwritten" is true of standard status, not absolutely.

## §5 The `srh` meta fields — `wordmap_meta.js:63`

13. **NOTE (clean).** `family:'Indo-European (Eastern Iranian, Pamir)'` is acceptable provided "Pamir" is read areally (see #7); the genetically precise label is Eastern Iranian → Shughni–Yazghulami. `countries:'China (Xinjiang: Tashkurgan)'` correct (see #11). `official:'No (recognized as the Tajik nationality; language unwritten)'` correct. `script:'Unwritten (Uyghur and Chinese used in writing)'` correct. `iso6393:'srh'`, `pronunciationType:'ipa'`, `scriptTags:['Latin']` all consistent with the other unwritten rows in this batch. `speakers` — see #9.

14. **NOTE (clean).** The coverageNote's technical claim — "the affricate tie bars removed for this atlas's bare convention (t͡s → ts)" — is accurate and the atlas does hold to it: only 7 `U+0361` characters remain in `words/*.js` atlas-wide, all in `lbz_damin` click symbols and one `nez` cell, none in this batch.

---

# PART 2 — the 19-row batch, audited as a set

`kmc giq shx peh orh acn lic swi mmd jiu pmi twm dta mlm nuf clk blr rbb srh`

## §6 Convention drift

15. **FIX — aspiration: three incompatible notations inside one batch.** Digraph `h` in the IPA field, superscript `ʰ`, and ASCII apostrophe all coexist. Verified by scanning every IPA field in all 1187 rows:
    - **Plain `h` digraph in the IPA field** — `kmc` (`blood phat˩˧`, `ear kha˧˥`), `lic` (11 cells: `eye tsha˥˧`, `father pha˩˩`, `four tshau˩˩`, `name phe:ŋ˥˧`, `night tshop˥˥`, `nose khat˥˥`, `one tsheɯ˩˩`, `stone tshi:n˥˧`, `sun tsha˥˧ hwan˥˧`, `tree tshai˥˧`, `white kha:u˥˧`), `swi` (`blood phjaat˧˥`, `ear qha˩˩`), `mmd` (`blood phja:t˦˦`, `ear kha˦˨`, `earth khəm˦˦`), `mlm` (`blood phɣa:t˦˨`, `ear khɣa˦˨`, `sun thəu˦˦ fan˦˨`).
    - **Superscript `ʰ`** — `shx`, `acn`, `jiu`, `pmi`, `twm`, `nuf`, `clk`, `blr`, `rbb`.
    - **ASCII apostrophe** — `giq` (`mother p'ɒ˦˦`, `tongue p'i˥˥ te˨˦`).
    The rest of the atlas is unanimous with the second group: **no neighbouring row uses a plain-h digraph in the IPA field at all** — `wbm prk pll adi tg khb za tsj duu hmn ii bo ug kk ky mn lis nxq` all score 0, and 1974 cells atlas-wide carry `ʰ`. Outside this batch only a handful of rows have an `[obstruent]h` sequence in the IPA and every one is a genuine two-phoneme sequence (`fit ˈrɑkhɑus`, `tay qhuniq`, `moh oʔnentsha`). So the 21 cells above are the atlas's only unconverted aspiration digraphs. Should be `pʰat˩˧`, `kʰa˧˥`, `tsʰa˥˧`, `pʰa˩˩`, `qʰa˩˩`, `pʰɒ˦˦`, and so on.
    Note the batch already knows the rule: `shx.py` explicitly normalises the ABVD apostrophe to `ʰ` (`norm=lambda b: b.replace("'", 'ʰ')`), and `giq.py` — same source, same builder, same day — does not.

16. **FIX — `words/tooth.js`, `nuf: ["shua55", "shua˥˥"]`.** The one aspiration cell in the suntb group that was missed. Every other `nuf` aspirate is converted (`dog kʰui˥˥`, `drink ɕʰu̱˥˥`, `ear n̥ɑ˥˥sʰə̃ɹ˧˥`, `hundred ɕʰɑ˧˥`, `one tʰi˥˧`, `salt tsʰɑ˥˥`), and the row's own coverageNote says "the IPA column uses the CLDF's own segmentation". The CLDF `Segments` value for `BijiangNusu` `tooth` is **`ɕ w a ⁵⁵`** — so the source reads this `sh` as `ɕ`, not `sʰ`. The cell should be `ɕua˥˥` (or `ɕwa˥˥`), and it is currently neither the segmentation value nor the sʰ that the sister cells got. Source: `lb2/suntb_forms.csv`, `BijiangNusu`/`tooth`.

17. **FIX — vowel length: three notations, one of them unique to this batch in the whole atlas.** `lic`, `mmd` and `mlm` write length with an **ASCII colon** in the IPA field — 41 cells (`lic` 14, `mmd` 13, `mlm` 14), e.g. `lic blood ɬa:ȶ˥˥`, `mmd bone da:k˨˦`, `mlm house ɣa:n˩˨˩`. Scanning all 1187 rows, **those three are the only rows in the atlas with `:` in an IPA field.** Meanwhile in the same batch `dta` explicitly converts `':'→'ː'` (per its own coverageNote) and `twm`/`rbb` use `ː`, and `swi` — the fourth ABVD Kam-Sui row, same builder `kamsui.py` — uses vowel doubling instead (`phjaat`, `laak`, `ɣaan`, `paak`, `ⁿdaau`, 10 cells). Four rows built by two scripts on the same afternoon; three length notations. `lic`/`mmd`/`mlm` should use `ː`.

18. **FIX — Sinological letters that no other atlas row uses.** `ȶ` (t-curl) appears in exactly **two rows in the entire atlas** and both are in this batch: `lic` (`bird taȶ˥˥`, `blood ɬa:ȶ˥˥`) and `swi` (`we ȶən˩˩ ⁿdaau˩˩ / ȶən˩˩ ⁿdiu˩˩`). `kmc.py` — same source family, same batch — explicitly normalises `ȶ→tɕ` and `ȵ→ɲ` (`kmc` has `eat tɕan˥˥`, `night ɲɐm˥˧`, `you ɲa˨˩˨`), while `lic`/`swi`/`mmd`/`mlm`/`giq` leave both as printed. `ȵ` is at least established elsewhere in the atlas (33 rows, mostly Sinitic), so leaving it is defensible; `ȶ` is not, and should be `tɕ`.

19. **FIX — `peh` keeps `ʨ`/`ʥ` in the IPA field while `rbb` in the same batch converts them.** `peh` has `ʨisuŋ` (blood), `ʨiχaŋ` (ear), `saʨiə` (earth), `ʨiɢaŋ` (white), `ʨǐ` (you), `ʥilɣasuŋ` (fish), `ʥyŋ` (hundred). `rbb`'s builder does `.replace('ʨ','tɕ').replace('ʥ','dʑ')` and its coverageNote advertises it. Atlas-wide only `peh` (7 cells), `slr` (1) and `sce` (1) use these ligatures. Should be `tɕ`/`dʑ`.

20. **FIX — script `ɡ` vs Latin `g` in the IPA field.** The atlas uses `ɡ` (U+0261) 3172 times against Latin `g` 142 times. Within this batch `srh` uses `ɡ` (inherited from iecor's phonemic column) while **`dta` (12 cells: `degi bird`, `nogə dog`, `gadʒiri earth`, `əndugu egg`, `etʃige father`, `gali fire`, `dʒagusa fish`, `gari hand`, `dʒurəgə heart`, `geri house`, `guarwe three`, `tʃigaːn white`), `orh` (5), `peh` (4), `lic` (2), `pmi` (2), `nuf` (2), `clk` (1)** all use Latin `g`. `dta` is the single worst row in the atlas for this. Pre-existing atlas-wide sloppiness (93 rows), but this batch added 28 cells to it and mixed the two conventions inside one batch.

21. **NOTE — `twm` is the only row in the atlas with `ᴀ` (U+1D00) in the IPA field**, 19 cells. It is a deliberate, documented choice (`twm` coverageNote: "The source's small-capital ᴀ is its own vowel symbol and is kept as printed"), but it sits badly beside the same note's claim that "the IPA column uses the CLDF's own segmentation" — the CLDF `Segments` for `MamaTshona sun plᴀŋ⁵³` is `p l a ŋ ⁵³`, plain `a`. The same tension shows in `nuf`: the segmentation gives `ɲ i ³⁵` for `sun ȵi³⁵ɑ⁵⁵` and the row keeps `ȵ`. Either follow the segmentation or drop that sentence from the five suntb coverageNotes.

22. **NOTE — glottal stop.** Consistent as `ʔ` in every IPA field in the batch. The **surface** field is not: `rbb` keeps the source's capital `Ɂ` (U+0241) in 12 surfaces (`Ɂivɔŋ`, `kaɁaːŋ`, `ɁiɁ`, `Ɂəm`, …) and is the only row in the atlas that does. Documented in its coverageNote, so this is a recorded decision, not a slip — but `swi` in the same batch writes surface glottals as `ʔ` (`ʔnam1`, `ʔdaan1`), so the batch is internally split on this too.

23. **NOTE — prenasalisation.** `swi`/`mmd` use superscript `ⁿd`, `ᵐb`; `giq`/`peh` use full-size letters (`ntau31`, `mpau33`, `ŋka31`, `nda`). Both are source spellings and neither is wrong, but they are two conventions inside one batch.

24. **NOTE — `blr`'s voiceless-sonorant series is split.** `lh→l̥` and `mh→m̥` (voiceless sonorants) but `nh→nʰ` and `rh→rʰ` (aspirates). Verified as **inherited, not invented**: the CLDF `Segments` column for `Plang good nhɔm.33` reads `nʰ ɔ m ³³`, and for `black lhɔŋ.31` reads `lh/l̥ ɔ ŋ ³¹`. So the dataset's own orthography profile is inconsistent, and the coverageNote correctly documents what was done. Flagging only because an aspirated nasal beside voiceless `l̥`/`m̥` in the same Waic series will read as an error to any reviewer who does not open the CLDF.

25. **NOTE (clean) — tone.** All 14 tonal rows in the batch keep digits in the surface and Chao letters in the IPA, with no exception except two source artefacts: `blr stone ʔuk31 sa31 mu` and `blr sun ŋai31 sa31 ŋi` (Peiros prints those minor syllables toneless — verified against `peirosaustroasiatic_forms.csv`, and the coverageNote says so), and `lic we ga / fa1` (see #31). Tone tables in `kamsui.py`/`mulam.py` are quoted from named published sources, and the two documented `twm` source-file repairs (Latin `A`→`ᴀ` in `egg`, stray `|` after `five`) both landed correctly.

## §7 `we` routing

Current state of `words/we.js:288-303` and the cells:

| row | routing | cell | what the source actually records |
|---|---|---|---|
| kmc | clusive | `tau55 / tɕiu55` | ABVD 677: two forms, **no labels** |
| giq | single | `su33 ta33` | ABVD 699: one form, no label |
| shx | single | `le31 pa22` | ABVD 771: two forms, comment *"Can stand for inclusive or exclusive as Haifeng She does not distinguish between the two."* |
| peh | single | `bədə` | ABVD 942: one form, no label |
| orh | clusive | `buu / mir` | johansson: `1PLI buu`, `1PLE mir` (explicit, but see #29) |
| acn | **single** | `ŋɔ55 tuʔ31` | sagartst: parameter is `we [first person plural inclusive]`; exclusive absent |
| dta | clusive | `bide / ba:` | rob: one parameter `1PL pronoun`, two forms `ba:`/`bide`, **no labels** |
| lic/swi/mmd/mlm | clusive | two forms each | ABVD: explicitly labelled `inclusive`/`exclusive` — correct |
| jiu/pmi/twm/nuf/clk | clusive | two forms each | suntb: separate `we` and `we (inclusive)` parameters — correct |
| blr/rbb/srh | dashed | `—` | see #30, #32 |

26. **BLOCKER — `acn` routing contradicts its own coverageNote.** `words/we.js:293` says `acn: "single"`. `wordmap_meta.js` `acn` coverageNote says: *"'we' is the form the source labels first person plural INCLUSIVE; the exclusive is not in the list, but the label itself is why the row is routed clusive."* The two files state opposite things about the same row. On the merits the routing is also the wrong one of the two: the source parameter is literally `we [first person plural inclusive]` (`sagartst_parameters.csv`), so the cell holds a form the source identifies as inclusive, and `single` — which `words/we.js`'s own definition defines as "the language is shown as having one word" — asserts a distinction the source never tested. Either dash it (the atlas's documented third state) or route clusive; `single` is unsupportable either way.

27. **FIX — `giq: "single"` (`words/we.js:289`) rests on a wordlist that simply gave one form.** ABVD 699 lists `su33 ta33` with no clusivity annotation. The coverageNote is candid about this — *"not evidence that Gelao lacks the distinction, only that this 210-item list does not record it"* — but the row still ships the positive claim. Compare `blr`, three days later in the same batch, which had *exactly the same evidence* (one unlabelled 1PL form) and was **dashed**, with its coverageNote saying *"a single form here is an incomplete record rather than evidence that the distinction is absent."* Two opposite policies applied to identical evidence inside one batch. `giq` should be dashed.

28. **FIX — `peh: "single"` (`words/we.js:291`), same defect, and probably factually wrong.** ABVD 942 gives one form `bədə` with no label. Mongolic generally preserves the `bide` (inclusive) / `ba`–`man-` (exclusive) opposition, and the batch's own `dta` row prints both (`bide / ba:`). Asserting that Bonan has one word for "we" on the strength of a 210-item list that only sampled one slot is the error class this audit was asked to find. Should be dashed.

29. **FIX — `orh` prints an order it says it cannot vouch for.** The coverageNote states the source labels `1PLI buu` / `1PLE mir`, *"the reverse of the usual Tungusic assignment (\*buu exclusive, \*mit inclusive), so the row gives both forms without saying which is which."* But the cell is `buu / mir`, and `words/we.js`'s definition tells every reader that where both forms are given they are **"inclusive first"**. The display order therefore silently asserts `buu` = inclusive, which is precisely the assignment the note says is probably wrong. Either flip to match the Tungusic reconstruction, or dash, or carry an explicit per-cell caveat — but the current cell cannot both follow the column convention and disclaim it.

30. **FIX — `kmc: "clusive"` and `dta: "clusive"` assert clusivity the cited source does not record.** ABVD 677's `we` entry gives `tau55` and `ȶiu55` with both comment fields **empty** (contrast `lic`/`swi`/`mmd`/`mlm`, whose ABVD entries carry literal `inclusive`/`exclusive` comments — that is why the shared ABVD boilerplate says *"Where the list annotates an entry, the annotation is followed rather than the ordering"*; `kmc`'s entry is not annotated). `rob`'s Dagur record has a single parameter `1PL pronoun` with two unlabelled forms `ba:` and `bide`; the `dta` coverageNote nevertheless says *"WE is printed exclusive-first as ba: / bide; this row reorders it inclusive-first"*, which asserts a source labelling that does not exist. Both routings are very likely right on the language facts (Kam `tau` incl. / `ȶiu` excl.; Mongolic `bide` incl. / `ba` excl.), but neither is supported by the source the row cites, and the `dta` note misdescribes its source. Either cite the external evidence in the note or dash.

31. **NOTE — `lic we: ["ga / fa1", "ga / fa˥˧"]`** is the only cell in any of the 14 tonal rows whose surface has a syllable with no tone digit and whose IPA has a syllable with no Chao letter. Verified as a source artefact: ABVD 772's inclusive form is printed `ga`, toneless, against the exclusive `fa1`. The coverageNote already documents it (*"The 1PL inclusive ga carries no tone digit in the source, so the IPA leaves it toneless rather than inventing one"*), so this is correct behaviour, recorded here only so the anomaly is not re-flagged later.

32. **NOTE (clean) — `shx: "single"` is properly sourced** and is the one `single` in the batch that is. ABVD 771 annotates both `we` forms *"Can stand for inclusive or exclusive as Haifeng She does not distinguish between the two."* The five suntb rows (`jiu pmi twm nuf clk`) are also correct: `suntb_parameters.csv` has both `we` and `we (inclusive)`, the doculect forms differ, and all five cells print the inclusive first — checked one by one against `Jinuo`, `TaobaPumi`, `MamaTshona`, `BijiangNusu`, `Idu`. `lic swi mmd mlm` likewise match ABVD's own `inclusive`/`exclusive` comments, inclusive first.

33. **NOTE — `words/we.js` header prose is stale.** It says *"A third colour marks the rows where nobody has yet sourced the answer — 33 of them"*. There are now **60** dashed `we` cells, of which **21 are modern** (non-`HIST_DESCENDANT`) rows: `aau agq blr czh_wy ers gan_fz gon koy lhm mgo mpj mro nej njo prk qxs rbb srh wic yiz yle`. The batch added `blr`, `rbb`, `srh` to that set without updating the count; neither 60 nor 21 is 33.

## §8 Unattested cells

34. **NOTE (clean) — `MODERN_UNSOURCED_ALLOW` matches the dashed cells exactly for all 19 rows,** in both directions. No dead allowlist entry, no dashed cell missing from the allowlist. (Checked `validate_wordmap_data.js:975-1000` against every `—` cell in `words/*.js`.)

35. **FIX — `swi.sun` is dashed but has no `unattestedReason`.** `words/sun.js:1066` has `swi: ["—","—"]` and `swi` is in `MODERN_UNSOURCED_ALLOW`, but `wordmap_meta.js` `swi.unattestedReason` is `{heart, tree, we, cat, love, hello, thanks}` — no `sun`. It is the only such case among the 19. It escapes the hard gate only because `[#162]` is a warning and the message is inside the "417 more" rollup. Add `sun:'unsourced'`.

36. **FIX — seven `unattestedReason` entries point at cells that are no longer dashed.** These are stale claims that a filled cell is unattested, and unlike a stale `MODERN_UNSOURCED_ALLOW` entry they are user-visible:
    - `lic.we` — cell is `ga / fa1`
    - `swi.tree` — cell is `mai4`; `swi.we` — cell is `ȶən1 ⁿdaau1 / ȶən1 ⁿdiu1`
    - `mmd.drink` — cell is `na4`; `mmd.we` — cell is `ⁿda:u1 / ⁿde1`
    - `mlm.sun` — cell is `thəu5 fan1`; `mlm.we` — cell is `hɣa:u6 / niu2`
    All seven are residue from the first pass (`kamsui.py`/`mulam.py` originally dashed `we` and `sun`); `notes_fix.py` rewrote the prose but not the `unattestedReason` maps.

37. **BLOCKER — `orh.father` and `orh.mother` are dashed on a false absence claim.** The `orh` coverageNote says: *"The wordlist behind this row is a sound-symbolism survey and has no kinship terms at all — that, not a search failure, is why father and mother are unattested here."* The Johansson list has a **full kinship paradigm** (~60 parameters, doubled by speaker sex), and the Oroqen doculect has forms for them: **`father (male speaking)` = `amɪn`, `father (female speaking)` = `amɪn`, `mother (male/female speaking)` = `ənin`**. Both cells are fillable from the row's own cited source. The same source also gives `daughter (male/female speaking)` = `axakan_utə`, which would fill `orh.daughter` (currently no cell; `daughter` is in `FILLING_IN`). Source: `lb/johanssonsoundsymbolic_{parameters,forms}.csv`, `Language_ID=Oroqen`.

38. **BLOCKER — `peh.sun` is the Bonan word for *day*, not *sun*.** ABVD **has no `sun` parameter at all** (its 210 names run `... star, stick/wood, stone ...`; there is a `day` and a `moon`, no `sun`). `peh.sun` = `udər` is ABVD 942's **`day`** entry — Proto-Mongolic \*ödür 'day'. Every other Mongolic row in the atlas has the \*naran reflex: `mn нар/nar`, `dta nara`, `sce naran/nɑrən`, `mvf nara`, `xal нарн/narn`. `peh` alone has the day-word. The batch also knows the rule: `swi.sun` was **dashed** for exactly this reason ("item 168 is glossed 'day' and the Sui list... marks no entry there as 'sun'"). Source: `abvd_parameters.csv` (no `sun`), `abvd_forms.csv` Language_ID 942 `day` = `udər`.

39. **BLOCKER — `shx.sun` takes a form the source explicitly annotates *day* while the source explicitly annotates a different form *sun*.** ABVD 771's `day` entry has three forms with comments: `('lɔ22','day')`, `('hau54','day')`, **`('lɔk22 kɔ44','sun')`**. `words/sun.js:1070` has `shx: ["lɔ22","lɔ˨˨"]` — the one annotated *day*. The batch's own stated policy is *"Where the list annotates an entry, the annotation is followed rather than the ordering"*, and `lic.sun` (`tsha1 hwan1`, annotated 'sun'), `mmd.sun` (`la:k8 van1`, annotated 'sun') and `mlm.sun` (`thəu5 fan1`, annotated 'sun') all follow it. `shx.sun` should be `lɔk22 kɔ44` / `lɔk˨˨ kɔ˦˦`. Source: `abvd_forms.csv` Language_ID 771, parameter `day`.

40. **FIX — `kmc.sun` and `giq.sun` are also read off the unannotated ABVD `day` item.** `kmc.sun = mɐn55` is ABVD 677 `day` (no comment); `giq.sun = sen44` is ABVD 699 `day` (no comment). Same evidential position as `swi.sun`, which was dashed, and weaker than `shx`'s, which at least has an annotation to follow (#39). Note the Kam-Sui pattern is visible in the data itself: `kmc mɐn55` ~ `swi van1` ~ `mmd van1` ~ `mlm fan1` are the same *day* etymon, and in the three rows where the source names a separate sun word it is a compound (`la:k8 van1`, `thəu5 fan1`, `tsha1 hwan1`). Either dash both, or document the day→sun inference in the coverageNotes — currently neither note mentions it.

41. **FIX — `peh.tree = guaiguŋ` is ABVD's `stick/wood` entry, flagged `< chinese` by the compiler.** ABVD has no `tree` parameter; `tree` in this batch comes from `stick/wood`. That is defensible where the source says so — `kmc`'s entry carries the comment *"wood, stick, log, tree"*, `mmd`'s *"tree, wood"*, `lic`'s *"tree"* — but `peh`'s carries only **`< chinese`**, and `guaiguŋ` is transparently 拐棍 *guǎigùn* 'walking stick'. Every other Mongolic row in the atlas has the \*modun reflex for `tree`: `mn мод/mod`, `dta mo:də/moːdə`, `sce mutun`, `mvf modu`, `xal модн`. `giq` and `shx` were dashed for `tree` because ABVD has no `stick/wood` entry for them at all; `peh` should be dashed too, or filled from 保安语简志 (Böke & Liu Zhaoxiong 1982). Source: `abvd_forms.csv` Language_ID 942, parameter `stick/wood`.

42. **FIX — `blr.we` is dashed as `'unsourced'`, but Peiros's list carries a 1PL form for Plang: `ʔet.33 ti.31`.** The dash is a defensible *policy* choice (the coverageNote explains it: one form, no clusivity label, and Palaungic marks clusivity), but the reason code says the form is unsourced, which is false — it is the *label* that is missing, not the word. Note also the direct contradiction with `giq`/`peh`, which took the opposite decision on identical evidence (#27, #28). Either the atlas needs a distinct reason value for "form attested, clusivity untested", or the three rows need one policy. Source: `peirosaustroasiatic_forms.csv`, `Plang`/`we` = `ʔet.33 ti.31`.

43. **NOTE — the shared blr/rbb/srh sentence "the list gives at most one first-person-plural form with no inclusive/exclusive label" is true only of `blr`.** `deepadungpalaung` has **no `we` parameter at all** (its pronoun items are `I` and `you (sg.)`), and `iecor` has no pronouns whatsoever. "At most one" is technically satisfied by zero but implies a form exists in all three. Same sentence at `validate_wordmap_data.js:952-956`.

44. **NOTE (clean) — every other dash in the batch was checked against its own source and is genuine.**
    - `bone` for `jiu pmi twm nuf clk`: `suntb_parameters.csv` has 984 names and **no `bone`** — confirmed absent, and confirmed absent for all six doculects.
    - `heart`, `cat`, `love`, `hello`, `thanks` for the ABVD rows: `abvd_parameters.csv` has no `heart`, no `cat`, no `love`, no greeting/thanks item; its body-part run is `bone, intestines, liver, breast` exactly as the note says.
    - `acn.eye`: `sagartst` has `the eye` but the `Achang` doculect has no form (238 of 250 filled). `acn.night`: `sagartst` has no `night` parameter.
    - `blr.house`, `blr.three`: absent from Peiros's 100. `rbb.good`, `rbb.red`, `rbb.house`: absent from Deepadung's 100 (`rbb` has no `salt` cell either, correctly — Deepadung has only the adjective `salty`).
    - `rbb.we`, `rbb.mother`, `rbb.father`, and all nine `srh` dashes: genuinely absent parameters.
    - `mlm.tree`: ABVD has no `stick/wood` entry for 761. `giq.tree`, `shx.tree`: same.
    - `orh.father`/`orh.mother` are the sole exception — see #37.

45. **NOTE — `suntb` carries two more LangMap concepts the five rows left empty.** All six suntb doculects have `bear` (`Jinuo a³³ø⁴⁴`, `TaobaPumi guẽ⁵⁵`, `MamaTshona ɔm¹³`, `BijiangNusu khui⁵⁵uɑ³⁵`, `Idu jɑŋ⁵⁵hoŋ⁵⁵`) and `excrement` → `poop` (`Jinuo ɑ³³khɹi³³`, `TaobaPumi xe⁵³`, `MamaTshona ȵin¹³`, `BijiangNusu khji⁵⁵i⁵⁵`, `Idu khɹi⁵⁵`). Neither concept has a cell in any of the five. `bear` is in `FILLING_IN` and `poop` is a full core word, so these are free coverage from a source already cited. (`jiu.snow` correctly has no cell — `snow` is genuinely absent for `Jinuo`.)

## §9 Duplicated content

46. **NOTE (clean) — no doculect was reused under two codes.** Every one of the 171 pairs among the 19 was compared cell-by-cell on the surface field, and each of the 19 was compared against all 1186 other atlas rows. The maximum overlap anywhere is **`swi`/`mmd` at 19% (8 of 43 shared concepts: egg, eye, fire, mother, nose, star, tree, water)**, then `mmd`/`mlm` at 12% (5/43: bird, black, five, mother, tongue) — ordinary Kam-Sui cognacy between sister languages from the same 210-item list, not reuse. Against the named neighbours (`wbm prk pll adi tg khb za tsj duu`) **no pair exceeds 10%**. `nuf`/`clk` share exactly one cell (`i`), `lic`/`mlm` one (`tooth`), and `kmc giq shx peh orh acn jiu pmi twm blr rbb` have a top match of **0 identical cells** anywhere in the atlas. `srh`'s single atlas-wide collision is `name` = `num` against Romansh, which is coincidence.

---

## Summary

- **BLOCKERs: 4** — #26 (`acn` we routing contradicts its own note), #37 (`orh` father/mother dashed on a false "no kinship terms at all" claim; the source has `amɪn`/`ənin`), #38 (`peh.sun` is the Bonan *day* word), #39 (`shx.sun` takes the form annotated *day* while the source annotates another form *sun*).
- **FIXes: 21** — #4, #7, #8, #9, #10, #15, #16, #17, #18, #19, #20, #27, #28, #29, #30, #35, #36, #40, #41, #42, and the `validate_wordmap_data.js` comment block wrong in #4/#43.
- **Clean sections:** §1 (srh extraction), §2 (srh concept coverage), §9 (no duplicated doculects). §3 is clean except for the "beyond 'child'" clause; §5 is clean except `speakers`.
