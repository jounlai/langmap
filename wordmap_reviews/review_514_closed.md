# Review pass 7 — CELLS of the nineteen China-nationality rows

Repo at commit 2a71de14. No file in /home/jounlai/langmap was edited by this pass.
(Another thread was editing the same worktree during the pass; the nineteen rows' cells
were re-dumped at the end and are byte-identical to the dump the findings are based on.)

Method: every cell of the nineteen rows was dumped from `words/*.js` (940 cells) and
re-derived independently from the cached CLDF extracts in `~/langmap-work/lb/` and
`~/langmap-work/lb2/` with a converter written for this pass
(`~/langmap-work/scratch7/{csv.js,dump.js}`); the build scripts in `~/langmap-work/cn/`
were not imported or run. Doculects resolved: ABVD 677 Dong Southern (kmc), 699 Gelao
Wanzi (gqu), 771 She Haifeng (shx), 772 Hlai Baoding (lic), 736 Sui (swi), 784 Maonan
(mmd), 761 Mulam Dongmen (mlm), 942 Bao'an (peh); suntb Jinuo/TaobaPumi/MamaTshona/
BijiangNusu/Idu (jiu pmi twm nuf clk); rob Dagur (dta); iecor 296 Sarikoli (srh);
peirosaustroasiatic Plang (blr); deepadungpalaung NanSang (rbb);
johanssonsoundsymbolic Oroqen (orh); sagartst Achang (acn).

---

## A. Wrong-concept cells

**1. BLOCKER — kmc / sun — published `mɐn55` / `mɐn˥˥`.**
Source: ABVD 677, parameter `168_day`, gloss "day (not night)", Form `mɐn55`,
Comment field EMPTY. The Dong list has no entry anywhere marked 'sun'.
This is the same error class the swi row explicitly avoids: swi's own coverageNote says
"SUN is left unattested: item 168 is glossed 'day' and the Sui list, unlike the Hlai and
Maonan ones, marks no entry there as 'sun'." kmc's `168_day` entry is annotated exactly
as swi's is — i.e. not at all — yet the cell was filled. kmc's coverageNote does not
mention sun at all.
Correction: dash the cell, `unattestedReason:{sun:'unsourced'}`, matching swi and peh.

**2. BLOCKER — gqu / sun — published `sen44` / `sen˦˦`.**
Source: ABVD 699, `168_day`, "day (not night)", Form `sen44`, Comment EMPTY. Same as (1).
The Wanzi list has no 'sun' annotation on any entry.
Correction: dash the cell and add `sun:'unsourced'`.

(For contrast, the three sun cells that ARE correct: shx `lɔk22 kɔ44` — `168_day`
Comment `sun`, with `lɔ22`/`hau54` both Commented `day`; lic `tsha1 hwan1` — Comment
`sun` vs simplex `hwan1` Comment `day`; mmd `la:k8 van1` — Comment `sun` vs `van1`
Comment `day`. mlm `thəu5 fan1` is Commented `sun` too — see item 14.)

**3. FIX — peh / tree — published `guaiguŋ` / `guaiguŋ`.**
Source: ABVD 942, parameter `79_stickwood`, gloss "stick/wood", Form `guaiguŋ`,
Comment `< chinese`, Loan `true`. The word is Chinese 拐棍 *guǎigùn* 'walking stick,
cane' — i.e. the entry is a stick, and the source says so; unlike kmc `mɐi31`
(Comment "wood, stick, log, tree"), lic `tshai1` (Comment "tree") and mmd `mai4`
(Comment "tree, wood"), nothing here licenses reading it as 'tree'. Bao'an has no
`178_tree`-type parameter. peh's coverageNote does not mention tree at all.
Correction: dash the cell, `tree:'unsourced'`.

**4. NOTE — acn / stone — published `laŋ31kɔʔ55` / `laŋ˧˩kɔʔ˥˥`.**
Source: sagartst Achang `203_thestoneapieceof`, Value `laŋ³¹kɔʔ⁵⁵`, and the dataset's own
Comment reads: `BED data has the word for "pit", not for stone. @lingulist` — an explicit
curator flag that the form is the wrong concept. **But** the same doculect in
`suntb` (`Achang`, `42_stonerock` 石头) gives `liŋ³¹kɔʔ⁵⁵; laŋ³¹kɔʔ⁵⁵`, i.e. Sun Hongkai
independently records `laŋ³¹kɔʔ⁵⁵` as 'stone'. The cell is therefore almost certainly
right and Sagart's comment is a false alarm. No change needed, but the coverageNote
should record that the source flags this entry and why the flag was overruled, so a
later pass does not "fix" it.

**5. NOTE — rbb / stone — published `maːw` / `maːw`.**
Source: deepadungpalaung NanSang `11_stone`, parameter Name "stone" but Concepticon
gloss `STONE (OF FRUIT)`. Position in the elicitation list (10 earth/soil, 11 stone,
12 mountain, 13 tree) is the standard Swadesh geological slot, so the Concepticon
mapping is the error, not the cell. Recorded so it is not re-flagged.

**6. NOTE — srh / rain — published `wareyj` / `waɾejdʑ`.** Source iecor param 121,
Concepticon gloss `RAIN (RAINING)`, which reads as the verb. Cross-checked against the
same parameter in English (`rain`), German (`Regen`), Latin (`pluuia`), Wakhi (`wʉr`) —
IE-CoR item 121 is elicited as the noun everywhere. Cell is correct.

---

## B. Recoverable cells left empty / missing cells

**7. FIX — acn / eye and acn / night — published `—` / `—`, `unattestedReason` `unsourced`.**
The acn coverageNote justifies these two dashes as follows: "Night is absent from the
parameter list altogether; eye is a parameter Sagart carries but leaves empty for Achang
… The other dataset that carries Achang, Mann's Burmish list, has them — but it is a
different doculect." Both halves of the first sentence are true of sagartst, but the last
clause is wrong: **Sun Hongkai's suntb — the dataset five sibling rows in this same batch
(jiu pmi twm nuf clk) are built from — also carries Achang, and it is the SAME doculect,
not a different one.** Cell-for-cell identity with Sagart's Achang:
`khʐə⁵⁵` star, `l̥i⁵⁵` wind, `uʔ³¹` egg, `in⁵⁵` house, `pak³⁵` hundred, `saŋ³¹tseŋ⁵⁵` tree,
`ni³¹mɔ³¹` sun, `laŋ³¹kɔʔ⁵⁵` stone, `tɕoi⁵⁵` tooth, `ɕɔ⁵⁵` tongue, `lɔʔ⁵⁵` hand,
`tsaŋ³¹ʑi³¹` daughter, `nuaŋ⁵⁵` thou, `ŋɔ⁵⁵tuʔ³¹` we — every one identical.
suntb Achang supplies: `238_eye` = `ȵɔʔ⁵⁵tsiʔ³¹`, `105_night` = `ni³¹tɕhot³⁵`.
Correction: fill both cells from suntb Achang (IPA `ɲɔʔ˥˥tsiʔ˧˩`, `ni˧˩tɕʰot˧˥`),
drop `eye` and `night` from `unattestedReason`, and rewrite the note's claim.

**8. FIX — acn / cat and acn / love — published `—`, reason `unsourced`; acn / iron and
acn / milk — no cell at all.** Same doculect in suntb has all four:
`120_cat` = `kă³¹lɔ³¹`, `719_love` = `nan³¹`, `38_iron` = `ʂam⁵⁵`, `281_milk` = `nau³⁵`.
Correction: either fill them, or state in the note that the row is deliberately confined
to Sagart's parameter set. As it stands the note gives a reason that is not the real one.

**9. FIX — dta / rain — no cell anywhere and no `unattestedReason` entry.**
Source: rob Dagur `13_rainn` "rain (n.)", Form `huar`. The dta row appears in every other
weather concept (snow `čas`, wind `kein`), so this is a silent omission rather than a
policy. Correction: add `dta: ["huar", "huar"]` to `words/rain.js`.

**10. FIX — orh / daughter — no cell and no `unattestedReason` entry.**
Source: johanssonsoundsymbolic Oroqen `333_daughterfemalespeaking` /
`334_daughtermalespeaking`, both `axakan_utə` (underscore = the dataset's word-join
marker, as in `sídə_bor` for dta). The orh coverageNote says "It does carry about sixty
kinship parameters, split by the sex of the speaker; father and mother are taken from
those (amɪn, ənin)" — daughter sits in the same run and was not taken.
Correction: add `orh: ["axakan utə", "axakan utə"]`, or say in the note why only
father and mother were harvested from that run.

---

## C. Silent surface alterations

**11. FIX — peh / eat, peh / drink, peh / sleep — published surfaces `nda`, `u`, `təra`.**
Source Forms are `nda-`, `u-`, `təra-`, with the verb-stem hyphen. The hyphen is dropped
from BOTH fields with no rule in the peh coverageNote licensing it — and this contradicts
the sibling Mongolic row: dta's note declares "drops the hyphen the source puts on verb
stems" and dta's surfaces duly KEEP it (`idə-`, `wante-`) while only the IPA drops it.
Correction: either restore `nda-` / `u-` / `təra-` in the surface (matching dta), or add
the rule to peh's note. Two rows in one batch must not treat the same marker two ways.

**12. FIX — gqu / mother `p'ɒ44` → `pʰɒ˦˦` and gqu / tongue `p'i55 te24` → `pʰi˥˥ te˨˦`.**
The ASCII apostrophe is converted to `ʰ` in the IPA field but kept in the surface, and
the gqu coverageNote states no such rule. The shx note states the rule explicitly for its
own row ("The source writes aspiration with an ASCII apostrophe (k'ua54); both fields
normalise it to the IPA diacritic") and shx normalises BOTH fields — cf. shx `kʰua54`,
`kʰɤŋ44`, `tʰɔ54` in the surface. gqu, from the same database and the same pass, keeps
the apostrophe in the surface. Correction: normalise gqu's surface too (`pʰɒ44`,
`pʰi55 te24`), or declare the divergence.

**13. FIX (verify first) — gqu / father `mɒ13` and gqu / mother `p'ɒ44` look swapped in
the source and are copied as-is.** ABVD 699 has `60_father` = `mɒ13`, `59_mother` =
`p'ɒ44`. Every other Kra lect in the same database runs the other way:
Gelao Dagouchang mother `mɔ21` / father `phɔ55`; Zhenfeng mother `ma42` / father `pa13`;
Sanchong `ma13` / `mpa13`; Niupo `a55 mi55` / `a55 ba33`; Heijiaoyan `mɑ24` / `pɑ24`;
Bigong `ma55` / `pa31`; Moji `mi53` / `ba53`; Wantao `mi55` / `ba55`; Judu, Hongfeng,
Fengyan, Yueliangwan all m- for mother, p-/b- for father; likewise Qabiao `maai45`/`pe213`
and Buyang `miə11`/`pa11`. Wanzi is the sole reversal, and the closest Central Gelao
neighbour (Dagouchang) has exactly `mɔ` 'mother' / `phɔ` 'father'. This is an ABVD
data-entry swap being reproduced.
Per the standing "review vs manual fixes" rule I am flagging, not asserting: confirm
against 贺嘉善 (1983) 仡佬语简志 before editing. If confirmed, swap the two cells and
record the departure from ABVD in the coverageNote.

---

## D. IPA derivation — rules stated but not applied

**14. FIX — nine cells in five suntb rows keep the non-IPA letter `ȵ` (U+0235) in the
`ipa` field where the CLDF's own segmentation gives `ɲ`.**
Each of jiu/pmi/twm/nuf/clk carries the sentence "the IPA column uses the CLDF's own
segmentation". Where the segmentation resolves `ȵ` to `ɲ`, the cell did not follow it:

| row | concept | published ipa | Segments column | correct ipa |
|---|---|---|---|---|
| jiu | sun | `ȵɔ˧˥` | `ɲ ɔ ³⁵` | `ɲɔ˧˥` |
| pmi | eye | `ȵɛ˥˧` | `ɲ ɛ ⁵³` | `ɲɛ˥˧` |
| pmi | black | `ȵɛ˧˥mə˥˧` | `ɲ ɛ ³⁵ + m ə ⁵³` | `ɲɛ˧˥mə˥˧` |
| pmi | red | `ȵɛ˥˥mə˥˧` | `ɲ ɛ ⁵⁵ + m ə ⁵³` | `ɲɛ˥˥mə˥˧` |
| pmi | you | `ȵi˧˥` | `ɲ i ³⁵` | `ɲi˧˥` |
| twm | fish | `ȵᴀ˩˧` | `ɲ a ¹³` | `ɲᴀ˩˧` |
| twm | night | `ȵen˩˧ne˧˩` | `ɲ e n ¹³ + n e ³¹` | `ɲen˩˧ne˧˩` |
| twm | sleep | `ȵɛː˩˧` | `ɲ ɛː ¹³` | `ɲɛː˩˧` |
| nuf | sun | `ȵi˧˥ɑ˥˥` | `ɲ i ³⁵ + ɑ ⁵⁵` | `ɲi˧˥ɑ˥˥` |
| nuf | you | `ȵo˥˥` | `ɲ o ⁵⁵` | `ɲo˥˥` |
| clk | milk | `ȵo˥˥bɹɑ˥˥` | `ɲ o ⁵⁵ + b ɹ ɑ ⁵⁵` | `ɲo˥˥bɹɑ˥˥` |
| clk | you | `ȵo˧˥` | `ɲ o ³⁵` | `ɲo˧˥` |

(The dataset's own profile is inconsistent — clk `sun` `i⁵⁵ȵi⁵⁵`, clk `nose`
`e⁵⁵ȵɑŋ⁵⁵bo⁵⁵` and nuf `cat` `mɯ³⁵ȵɛ³¹` segment `ȵ` unchanged, so those three cells DO
match their segmentation and are not counted above. That inconsistency is itself worth a
sentence in the notes.)

**15. FIX — pmi / iron — published ipa `ɕī˥˥`.** The macron letter `ī` (U+012B) is not
IPA; the Segments column reads `ɕ ī/i ⁵⁵`, i.e. the profile resolves it to plain `i`.
Correct ipa: `ɕi˥˥`. Surface `ɕī55` is right (verbatim source).

**16. NOTE — two rows keep `ȵ` in an `ipa` field with no rule anywhere licensing it.**
The kmc note declares the convention for three rows only — "The source's ȶ and ȵ are
written tɕ and ɲ in both fields here, unlike the Hlai, Sui and Mulam rows, which keep the
source characters" — so lic (`ɬeȵ˥˧` good, `ȵaːn˥˧` moon, `ȵaːu˩˩` salt, `taȶ˥˥` bird,
`ɬaːȶ˥˥` blood), swi (`ȵa˧˩` you, `ȶən˩˩ ⁿdaːu˩˩` we) and mlm (`ȵa˩˨˩` you) are covered.
**mmd / night `ʔȵam˦˦` and gqu / nose `ȵtɕe˨˦`, gqu / salt `ȵtɕəɯ˦˦` are not** — neither
row is named in that sentence and neither note mentions the characters. Either add mmd
and gqu to the declared list, or convert them.

**17. NOTE — clk / star — published ipa `ɑ˥˥nde˥˥kɹu˥˥`, Segments `ɑ ⁵⁵ + ⁿd e ⁵⁵ + k ɹ u ⁵⁵`.**
Under the row's stated rule this should be `ɑ˥˥ⁿde˥˥kɹu˥˥`; the atlas already writes
prenasalisation that way in mmd (`ⁿda˦˨`) and swi (`ⁿda˩˩`). Same class, lower stakes:
clk `hand`/`tooth`/`drink`/`night`/`white` and nuf `eye`/`blood`/`dog`/`night` and
pmi `nose`/`dog`/`star` keep the source's `i`/`u`/`dʐ` where the segmentation gives
`j`/`w`/`ɖʐ`. These are defensible editorial retentions of Sun's own notation, but the
blanket claim "the IPA column uses the CLDF's own segmentation" over-states what was done
and should be narrowed to the aspirates it actually describes.

**18. NOTE — nuf / tooth — surface `shua55`, ipa `ɕwa˥˥`.** Two conversions apply here
(`sh` → `ɕ`, `u` → `w`) that the nuf note does not state; the note only covers "th, ch".
Both follow the dataset profile (`ɕ w a ⁵⁵`), and nuf / ear correctly takes the profile's
other reading of `sh` (`sʰə̃ɹ`), so nothing is wrong — but the rule needs stating, because
as written the note cannot generate this cell.

**19. NOTE — undeclared but harmless derivations, row-level.** The aspirate digraph →
`ʰ` conversion in the IPA field is applied in kmc (`pʰat`, `kʰa`), lic (18 cells),
mmd (5), mlm (6) and swi (2) without any of those four notes stating it; swi additionally
converts doubled vowels to `ː` in eleven cells (`phjaat7` → `pʰjaːt˧˥`, `paak8` →
`paːk˦˨`, …) with no rule stated, where lic/mmd/mlm declare nothing about their colon
either. All are correct; the notes are simply silent. One sentence per row fixes it.

---

## E. Multi-form entries — choice made and whether it is defensible

Every source entry with two or more forms, across all nineteen:

| row | concept | source forms | taken | verdict |
|---|---|---|---|---|
| kmc | eat | `ȶan55` (cognacy 1), `ȶi55` | first | defensible |
| kmc | sleep | `nun212`, `nɐk35` | first | defensible |
| kmc | earth | `nam33`, `mak31` (both Comment "soil/mud") | first | defensible |
| kmc | stone | `pja55`, `ȶin55` | first | defensible |
| kmc | salt | `jim212`, `ko55` | first | defensible |
| kmc | **night** | `ȶan55`, `ȵɐm53` | **second** | defensible (the first is identical to the EAT entry `ȶan55`, an obvious ABVD duplication) but **undisclosed** — the row's only stated selection rule is native-over-Chinese. NOTE: say so. |
| kmc | one / two | `ʔi55` "Native Dong" / `ʔət55` "Chinese"; `ja323` "Native Dong" / `ȵi33` "Chinese" | native | declared, correct |
| kmc | we | `tau55`, `ȶiu55` (both unannotated) | both, source order | declared, correct |
| shx | bone | `sɤŋ44`, `sɤŋ44 kɔ44` | simplex | defensible |
| shx | stone | `ŋa22`, `ŋa22 kɔ44` | simplex | defensible |
| shx | mother | `a22 me35`, `me35` | fuller | defensible (parallels father `a22 pa44`) |
| shx | we | `pa22`, `le31 pa22`, both Commented "Can stand for inclusive or exclusive…" | fuller | declared, correct |
| shx | sun | `lɔ22`/`hau54` (Comment `day`), `lɔk22 kɔ44` (Comment `sun`) | annotated one | declared, correct |
| lic | drink | `hja:u1`, `tshɯp7`, `o:k9` | first | defensible |
| lic | sleep | `kau2`, `tso:n1` | first | defensible |
| lic | mother/father | `pai3`/`pha3` "term of address" vs `pai3 za1`/`pha3 za1` "term of reference" | address | declared, correct |
| lic | tree | `tshai1` (Comment "tree"), `tho:n1 tshai1` ("wooden stick/rod") | annotated one | correct |
| lic | black | `dom3` (cognacy 1), `lo:k7` | first | defensible |
| lic | red | `de:ŋ3`, `ga:n3` | first | defensible |
| lic | i | `hou1`, `de3` | first | defensible |
| lic | one | `tsheɯ3`, `tsɯ2` | first | defensible |
| lic | we | `ga` "inclusive", `fa1` "exclusive" | both, incl. first | declared, correct |
| swi | eat | `ʔman3`, `tsjə1` | first | defensible |
| swi | drink | `ɣəm4`, `ɣum4` | first | defensible |
| swi | **earth** | `ti5 ti6`, `hum5` | **second** | defensible (`ti5 ti6` is Chinese 地) but **undisclosed** — NOTE |
| swi | stone | `pja1`, `tin2` | first | defensible |
| swi | moon | `njen2`, `ʔdaaŋ1 njen2` | simplex, first | defensible |
| swi | night | `saan2` (Comment `night`), `ʔȵam5` (Comment `evening`) | annotated one | correct |
| swi | i | `ʔai2`, `ʁai2` | first | defensible |
| swi | bird | `nok8`, `to2 nok8` | first | defensible |
| swi | dog | `m̥a1`, `ȶhon33` | first | defensible (the alternative carries a Chao value, not a category — it does not belong to this transcription system) |
| swi | one | `to2`, `ti3` "Chinese", `ʔjət7` "Chinese" | native | correct |
| swi | tree | `113_branch` `pe5 mai4` Comment "mai4 = tree" (vs `kaam3`), and `79_stickwood` `mai52` | `mai4` split out of the branch form | declared in the note; the split is a genuine edit to the source string but the note owns it |
| mmd | mother/father | source lists BOTH `tɛ2` and `ni4` under BOTH parameters | `tɛ2` father, `ni4` mother | declared, settled against Lu Tianqiao — correct, and the row deliberately inverts source order |
| mmd | moon | `ni4 njen2`, `njen2 ta:i6` | first | defensible |
| mmd | white | `kwa3` (Loan flag `true`), `pok8` (Comment "Chinese", Loan `false`) | `kwa3` | declared; the note correctly identifies the misplaced loan flag |
| mmd | one | `tɔ2`, `dɛu2`, `ʔjit7` "Chinese" | first native | defensible |
| mmd | two | `ja1`, `ȵi6` "Chinese" | native | correct |
| mmd | we | `ⁿda:u1` "inclusive", `ⁿde1` "exclusive" | both, incl. first | declared, correct |
| mlm | eye | `ba1` "Xiali … Dialect", `l̥a1` (unannotated), `mɣa1` "Siba … Dialect" | unannotated Dongmen form | declared, correct |
| mlm | bird | `nɔk8`, `bɔk8` "Xiali", `mɣɔk8` "Siba" | unannotated | correct, undisclosed but obvious |
| mlm | earth | `na:m6`, `mɣa:n1` | first | defensible |
| mlm | white | `pa:k8`, `cwa3` | first | defensible |
| mlm | hundred | `fɛ:k7`, `pɛ:k7` | first | defensible |
| mlm | moon | `mɣa:n2` Comment "month", `kɣa:ŋ1 njen2` Comment "moon" | annotated one | declared, correct |
| mlm | **sun** | `fan1` Comment "day", `thəu5 fan1` Comment "sun", **`tət7` Comment "sun"** | `thəu5 fan1` | see item 20 |
| mlm | one / two | native vs "Chinese" | native | correct |
| mlm | we | `hɣa:u6` "inclusive", `niu2` "exclusive" | both, incl. first | declared, correct |
| peh | mother | `amə`, `amo` | first | defensible |
| peh | water | `sǔ`, `sə` | `sə` | declared, correct |
| peh | earth | `saʨiə`, `ɢaʨir`, `ɕirou` (all Commented "earth, soil") | first | defensible |
| dta | mother | `ewe:`, `eg`, `me:me` | first | defensible |
| dta | father | `ečige`, `ača:` | first | defensible |
| dta | we | `ba:`, `bide` (neither labelled) | both, reordered incl.-first | see item 21 |
| srh | **egg** | `kako`, `tqheem` | `kako` | see item 22 |
| srh | bite (unused) | two forms | n/a | — |
| jiu pmi twm nuf clk blr rbb acn orh gqu lic-other | — | single form per parameter for every concept used | — | — |

**20. NOTE — mlm / sun — published `thəu5 fan1`.** The source's `168_day` has THREE
entries, and TWO of them are Commented `sun`: `thəu5 fan1` and the simplex `tət7`.
The coverageNote reports only the contrast with `fan1` ("annotated 'sun', not the simplex
fan1 annotated 'day'") and does not mention `tət7` at all. The choice is defensible —
it parallels mmd's `la:k8 van1`, the same "X-of-day" compound in the sister language —
but under the atlas's "major word only" rule the simplex `tət7` deserves an argument,
not silence. At minimum the note must acknowledge the third form.

**21. NOTE — dta / we — published `bide / ba:`, row routed `clusive`.**
Source rob Dagur `249_1plpronoun` gives `ba:` then `bide`, both under the single gloss
"1PL pronoun", with **no inclusive/exclusive annotation on either**. The note says
"WE is printed exclusive-first as ba: / bide; this row reorders it inclusive-first" —
which presents an unannotated pair as if the source had labelled it. The assignment
(*bide* inclusive, *ba* exclusive) is correct Mongolic comparative grammar, but it is the
row's inference, and three other rows in this same batch (kmc, gqu, blr) are routed
`unknown` specifically because their sources do not label. The note should say the labels
are supplied from comparative grammar rather than read off the source; the routing itself
is defensible.

**22. FIX — srh / egg — published `kako` / `kako`; the annotation favours the other form.**
Source iecor 296 param 39 has two entries, and the Comment on both reads:
`kako refers to eggs generally (but only rarely chicken eggs), and tχɵm is used only for
chicken eggs`. `words/egg.js` defines the concept as "Egg — the rounded object laid by a
bird (esp. a hen's egg as food)". The source annotation therefore points at `tqheem` /
`tχɵm`, and the row took the form the annotation excludes from exactly that reading.
Correction: `srh: ["tqheem", "tχɵm"]`, or state why the general term was preferred.

---

## F. Tone tables — arithmetic re-verification

All four category-to-value tables were re-read from the ABVD language record and every
cell recomputed by script (`~/langmap-work/scratch7`, tone check pass). **Zero mismatches**
across all 196 tone-bearing cells in lic/swi/mmd/mlm, including both short/long splits.

- **lic** — record: 1=53, 2=55, 3=11, 7=55, 8=11, 9=53. Note quotes it exactly. No cell
  uses 8 or 9 (the only tone-9 form in the list, drink `o:k9`, was not selected), as the
  note claims. Verified: `pa1`→`˥˧`, `la2`→`˥˥`, `dom3`→`˩˩`, `taȶ7`→`˥˥`. `ga` (1PL
  inclusive) carries no digit in the source and is correctly left toneless.
- **swi** — record: `7 = /35/ (long), /55/ (short); 8 = /42/ (long), /31/ (short)`.
  The note's phrasing "7=55 short / 35 long, 8=31 short / 42 long" is the same table.
  Verified on both sides of each split: `pek7`→`˥˥` (short), `phjaat7`/`laak7`→`˧˥` (long);
  `nok8`→`˧˩` (short), `paak8`→`˦˨` (long). Length is written as a doubled vowel in this
  row, which the note does not say (item 19).
- **mmd** — record: 7=55 short / 44 long, 8=23 short / 24 long. Verified:
  `zət7`,`pɛk7`→`˥˥`; `phja:t7`→`˦˦`; `nɔk8`→`˨˧`; `da:k8`,`la:k8`→`˨˦`. Non-checking
  tones all correct too (`tɛ2`→`˨˧˩` = 231, `ᵐbjai3`→`˥˩` = 51, `da:i2`→`˨˧˩`).
- **mlm** — record: 7=55 short / 42 long, 8=12 short / 11 long. Verified:
  `hɣop7`,`m̥ət7`→`˥˥`; `hɣa:k7`,`phɣa:t7`,`fɛ:k7`→`˦˨`; `nɔk8`→`˩˨`;
  `la:k8`,`pa:k8`→`˩˩`. Tone 2=121 → `˩˨˩` and 6=11 → `˩˩` all correct.

The five Chao-value rows that need no table (kmc gqu shx acn blr) plus the five suntb
rows were checked by the same script: every digit string maps to the right Chao letters,
940/940 tone conversions correct. The claim in the kmc and gqu notes that their source
sketches write values rather than categories is confirmed by ABVD's own `problems` field
for Gelao Wanzi ("Source uses ˥ (55), ˧ (33), etc. instead of tone numbers. I have
replaced the tone letters with their respective tone values") and by the fact that shx's
digits (54, 44, 35, 31, 22, 11) are all two-digit values in the range the record's own
category table lists, never bare 1–8.

---

## G. Cross-row duplicates

All nineteen were compared pairwise against each other and against wbm prk pll lwl adi tg
wbl khb za tsj duu dng sce mjg yuy on identical surface strings over shared concepts.
**No pair anywhere near doculect-sharing.** The single pair above 15% is:

- **swi / mmd — 8 identical of 43 shared (19%)**: `kai5` egg, `ⁿda1` eye, `vi1` fire,
  `ni4` mother, `ʔnaŋ1` nose, `zət7` star, `mai4` tree, `nam3` water. These are two
  Kam-Sui sisters transcribed in the same category-number system by two 民族出版社
  简志 volumes; every one of the eight is a straight cognate and each carries a different
  tone value through its own table (`kai5` = swi ˧˥ vs mmd ˦˦, `nam3` = swi ˧˧ vs
  mmd ˥˩). Not a shared doculect. Everything else is under 15%.
- The blr note's warning was checked: the peirosaustroasiatic doculect the curators tagged
  `blr` is `Wa`, and the row correctly uses `Plang` instead. blr shares no suspicious
  overlap with wbm or prk, confirming the mis-mapping was avoided.

---

## H. Per-row tally

"Checked" = cells present in `words/*.js` for that row (dashed cells included).
"Clean" = checked minus cells named in a finding above.

| row | checked | clean | cells flagged |
|---|---|---|---|
| kmc | 49 | 46 | sun (1), night (E), tree (undisclosed stick/wood source) |
| gqu | 49 | 43 | sun (2), father+mother (13), mother+tongue apostrophe (12), nose+salt `ȵ` (16) |
| shx | 49 | 48 | drink (`hɔ35`, Loan=true "Chinese", undisclosed) |
| peh | 47 | 43 | tree (3), eat+drink+sleep hyphen (11) |
| orh | 48 | 48 | — (plus one missing cell: daughter, item 10) |
| acn | 51 | 46 | eye+night (7), cat+love (8), stone (4) — plus iron/milk absent |
| lic | 49 | 49 | — |
| swi | 49 | 45 | earth (E), tree (string split), white+red (undisclosed Chinese loans) |
| mmd | 49 | 48 | night `ȵ` (16) |
| jiu | 52 | 51 | sun `ȵ` (14) |
| pmi | 53 | 46 | eye+black+red+you `ȵ` (14), iron `ī` (15), dog+star `ɖʐ` (17) |
| twm | 53 | 50 | fish+night+sleep `ȵ` (14) |
| dta | 48 | 48 | — (plus one missing cell: rain, item 9; we routing, item 21) |
| mlm | 49 | 48 | sun (20) |
| nuf | 53 | 50 | sun+you `ȵ` (14), tooth (18) |
| clk | 53 | 50 | milk+you `ȵ` (14), star (17) |
| blr | 44 | 44 | — |
| rbb | 46 | 45 | stone (5, no change required) |
| srh | 49 | 48 | egg (22) |
| **total** | **940** | **896** | **44 cells flagged; 2 BLOCKER, 12 FIX-class, rest NOTE** |

Rows with no cell defect at all: **lic, blr, dta (cells), orh (cells)**.

## I. Severity roll-up

- **BLOCKER (2)**: kmc/sun, gqu/sun — the day word standing in the sun slot, against the
  batch's own stated policy.
- **FIX (12 findings)**: peh/tree; acn/eye, acn/night, acn/cat, acn/love; dta/rain;
  orh/daughter; peh eat+drink+sleep hyphen; gqu apostrophe; gqu father/mother (verify
  first); twelve `ȵ`→`ɲ` IPA cells; pmi/iron `ī`; srh/egg.
- **NOTE (rest)**: undeclared-but-correct rules, undisclosed multi-form choices,
  source-comment red herrings (acn/stone, rbb/stone, srh/rain), dta/we routing provenance.
