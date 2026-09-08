# Review B — jiu / pmi / twm (suntb) and dta (Robbeets), commit 6a333f7b

Method: every cell in `/home/jounlai/langmap/words/*.js` was matched back to
`/home/jounlai/langmap-work/lb2/{suntb,rob}_forms.csv` by exact `Value` string;
the digit→Chao-letter conversion was recomputed from scratch (`5→˥ 4→˦ 3→˧ 2→˨ 1→˩`)
without using `build.TONE`; the dta Latin→IPA mapping was checked against the CLDF's
own `Segments` column (its orthography profile).

---

## 1. Extraction fidelity — mechanically clean

**NOTE.** No extraction error found. All 47 jiu, 48 pmi, 48 twm and 44 dta real
cells match the source `Value` for the right `Parameter_ID` and the right
doculect, character for character. The superscript→digit conversion is exact
(0 mismatches over 143 cells). The digit→Chao conversion is exact
(0 mismatches over 143 cells) on an independent recompute. dta's
č→tʃ / ǯ→dʒ / y→j / ā ō ū→aː oː uː / ':'→ː / hyphen-drop agrees with the CLDF
`Segments` column on every cell. Defects below are all in what was *carried over*
or *left out*, not in the copying.

---

## 2. BLOCKER — "no first-person-plural pronoun at all" is false; `we` is wrongly dashed in all three suntb rows

**Claim (identical in the `coverageNote` of jiu, pmi and twm):**
"That wordlist has no BONE concept and no first-person-plural pronoun at all, so
bone and we are left unattested here rather than filled from a second doculect."
Backed by `unattestedReason:{...we:'unsourced'...}` and `we: ["—","—"]` in
`/home/jounlai/langmap/words/we.js` (lines with jiu/pmi/twm).

**What is wrong.** The BONE half is true — I enumerated all 1004 rows of
`suntb_parameters.csv` and there is no bone/骨 concept (body-part block runs
255_finger…288_malaria with no bone). The 1PL half is false. The list has **two**
1PL parameters, and both are filled for all three doculects:

| param | gloss | Jinuo | TaobaPumi | MamaTshona |
|---|---|---|---|---|
| `971_we` | we / 我们 (Concepticon WE (EXCLUSIVE)) | `ŋa³³jo³¹` | `a³⁵rə⁵³` | `ŋᴀ¹³rᴀʔ⁵³` |
| `972_weinclusive` | we (inclusive) / 咱们 | `a³³ŋ̊o³³` | `ɛ̃³⁵rə⁵³` | `ŋᴀ¹³tᴀŋ⁵³` |

(also `970_wetwo` and `975_youpl`, likewise filled.)

**What it should be.** Three `we` cells filled from the same doculect, and —
since the source itself separates 我们 from 咱们 — all three plausibly routed
`clusive` the way `dta` is, inclusive first:

- `jiu: ["a33ŋ̊o33 / ŋa33jo31", "a˧˧ŋ̊o˧˧ / ŋa˧˧jo˧˩"]`
- `pmi: ["ɛ̃35rə53 / a35rə53", "ɛ̃˧˥rə˥˧ / a˧˥rə˥˧"]`
- `twm: ["ŋᴀ13tᴀŋ53 / ŋᴀ13rᴀʔ53", "ŋᴀ˩˧tᴀŋ˥˧ / ŋᴀ˩˧rᴀʔ˥˧"]`

and the sentence in all three coverageNotes cut back to the BONE claim only.
(If the map does not want to assert clusivity on Sun's 我们/咱们 pairing, the
exclusive `971_we` form alone still beats a dash.)

**Verified against:** `/home/jounlai/langmap-work/lb2/suntb_parameters.csv`
rows `969_i, 970_wetwo, 971_we, 972_weinclusive, 973_yousg, 974_youtwo, 975_youpl`;
`suntb_forms.csv` filtered on those `Parameter_ID`s for `Jinuo`, `TaobaPumi`,
`MamaTshona`. Source dataset: https://github.com/lexibank/suntb

---

## 3. BLOCKER — the pmi `coverageNote` names the wrong doculect, and names the doculect of the language it says it is excluding

**Claim:** `pmi.coverageNote`: "The Pumi doculect is Sun's Northern (Lanping/兰坪)
form. Southern Pumi (pmj) is a separate ISO code and is not mixed in here."

**What is wrong.** Two things.

(a) The row's data is `TaobaPumi` (Taoba 桃巴, Muli County, Sichuan), not
anything from Lanping. Proof: `suntb_languages.csv` offers only two Pumi
doculects, `QinghuaPumi` (qing1238) and `TaobaPumi` (taob1238). Matching the 48
pmi cells against both gives TaobaPumi 48/48 and QinghuaPumi 0/48. The
discriminating cells are `i` (`969_i`: Taoba `a³⁵` = the row; Qinghua `ɛ⁵⁵`) and
`you` (`973_yousg`: Taoba `ȵi³⁵` = the row; Qinghua `nɛ¹³`).

(b) Lanping is not Northern Pumi at all — it is where **Southern** Pumi (pmj) is
spoken, and Qinghua 箐花 (the doculect the row did *not* use) is a village in
Hexi township, Lanping. Lu Shaozun's (2001) split: **Northern** 北部方言 (~55,000)
= Taoba village, Muli, Sichuan + Tuoqi, Ninglang, Yunnan; **Southern** 南部方言
(~22,000) = Qinghua village, Lanping + Ludian + Xinying, Ninglang. Ethnologue
agrees: pmi = Muli, Yanyuan, Jiulong (Sichuan) and Ninglang (Yunnan); pmj =
Lanping, Ludian, Ninglang (Yunnan).

So the ISO code, the coordinates (27.93 / 101.27, Muli) and the English
`description` ("Northern Pumi as recorded at Taoba in Muli, Sichuan") are all
**correct**; only the coverageNote is wrong, and it contradicts the row's own
description.

**What it should be.** "The Pumi doculect is Sun's Taoba (桃巴) form, Muli
county, Sichuan — the northern dialect. Southern Pumi (pmj), which Sun records
separately at Qinghua (箐花) in Lanping, is a separate ISO code and is not mixed
in here."

**Verified against:** https://www.ethnologue.com/language/pmi and
https://www.ethnologue.com/language/pmj ; 普米语, zh.wikipedia.org
(https://zh.wikipedia.org/zh-hans/普米语), citing 陆绍尊 2001 dialect split;
`suntb_languages.csv` lines `QinghuaPumi`/`TaobaPumi`.

---

## 4. FIX — pmi `countries` lists Lanping, which is pmj territory

**Claim:** `countries:'China (Yunnan: Lanping, Ninglang; Sichuan: Muli)'`.

**What is wrong.** Lanping is Southern Pumi (pmj). Listing it first under pmi
attributes the other ISO code's home county to this row.

**What it should be.** `China (Sichuan: Muli, Yanyuan, Jiulong; Yunnan: Ninglang)`.

**Verified against:** Ethnologue pmi (Muli, Yanyuan, Jiulong / Ninglang);
same sources as §3.

---

## 5. FIX — `bor` in dta bird and tooth is a borrowing marker, not part of the lexeme

**Claim:** `dta.coverageNote`: "Two entries, bird and tooth, are printed with a
second element bor whose function the source does not gloss; they are kept as
printed rather than trimmed." Cells: `bird: ["degi bor","degi bor"]`,
`tooth: ["sídə bor","sidə bor"]`.

**What is wrong.** `bor` is `bor.` = *borrowing*, a dataset-wide annotation, and
it is trivially identifiable from the data itself. It occurs in **643 rows across
~90 languages of all five families** in `rob_forms.csv`, and every single one of
them is a transparent loanword:

- Korean `lophu bor.` 'rope' (로프 < English *rope*) — note this one still carries
  the full stop, which is what `bor` is an abbreviation of
- Korean `san bor` 산 'mountain', `kang bor` 강 'river', `hoswu bor` 호수 'lake',
  `simcang bor` 심장 'heart', `noy bor` 뇌 'brain' — all Sino-Korean
- Japanese `namae bor`, `niku bor` 肉, `taiyou bor` 太陽, `nou bor` 脳, `hontou bor` 本当
- Turkish `ateš bor` (Persian), `kalp bor` (Arabic), `rüzgâr bor` (Persian),
  `beyaz bor` (Arabic), `tohum bor` (Persian)
- Dagur itself: `degi bor` 'bird' — and Daur *degii* 'bird' is explicitly a
  **loan from Ewenki** (Tsumagari, "Dagur", in Janhunen ed., *The Mongolic
  Languages*), which is exactly why it is flagged.

Nothing lexical can be a shared element of 'bird', 'tooth', 'sky', 'flower',
'branch', 'throat', 'stick', 'wood', 'fly (n.)' and 'fly (v.)' — which is the
full set of Dagur rows carrying it. The `Loan` column in the CLDF is empty for
all of them, i.e. the flag never got parsed out of `Value`; that is a Lexibank
extraction artefact, not a Daur word.

**What it should be.**
- `dta bird: ["degi", "degi"]`
- `dta tooth: ["sídə", "ʃidə"]` (see §11 for the `í`)
and the coverageNote sentence replaced by a note that the source's `bor.`
borrowing flag was trimmed.

**Verified against:** `rob_forms.csv` (`Language_ID=Dagur`, `Form` containing
`bor`: params 20, 30, 80, 93, 109, 128, 156, 208, 233, 238); cross-language
scan of the same file; Tsumagari, *Dagur*, ch. 6 of Janhunen (ed.) 2003,
*The Mongolic Languages* (Routledge) — `degii` < Ewenki; Wikipedia
https://en.wikipedia.org/wiki/Dagur_language.

---

## 6. FIX — twm `five` carries a stray table-rule character `|` into both surface and IPA

**Cell:** `words/five.js` → `twm: ["le31ŋe53|", "le˧˩ŋe˥˧|"]`.

**What is wrong.** The source `Value` for `MamaTshona / 915_five` is
`le³¹ŋe⁵³|`. The `|` is a digitisation artefact — it appears on 257 rows across
the whole suntb dataset (e.g. `Anong 130_wolf 'i³¹dzɯŋ⁵⁵|'`,
`Trung 917_seven 'sɯ³¹ɲĭt⁵⁵|'`, `MamaTshona 919_nine 'tu³¹ku⁵³|'`) and the
dataset's own `Segments` for this form is `l e ³¹ + ŋ e ⁵³` — no `|`. It is a
vertical rule / morpheme separator, never a phone. The map is now printing a
pipe inside an IPA string.

**What it should be.** `twm: ["le31ŋe53", "le˧˩ŋe˥˧"]`.

**Verified against:** `suntb_forms.csv`, `MamaTshona / 915_five`, columns
`Value` vs `Segments`.

---

## 7. FIX — twm `egg` carries a Latin capital `A` into the IPA column

**Cell:** `words/egg.js` → `twm: ["khAʔ53lum53", "khAʔ˥˧lum˥˧"]`.

**What is wrong.** The source `Value` is `khAʔ⁵³lum⁵³` with U+0041 LATIN CAPITAL
A, a typo for the small-capital `ᴀ` (U+1D00) Sun uses everywhere else in this
doculect — the row itself has `ᴀ` in 20 other twm cells. The CLDF `Segments`
normalises it: `kʰ a ʔ ⁵³ + l u m ⁵³`. `A` is not an IPA symbol under any
reading, and the row's own coverageNote defence ("The source's small-capital ᴀ
is its own vowel symbol and is kept as printed") does not cover a capital A.

**What it should be.** `twm: ["khᴀʔ53lum53", "kʰᴀʔ˥˧lum˥˧"]` (with §8 applied).

**Verified against:** `suntb_forms.csv`, `MamaTshona / 170_egg`.

---

## 8. FIX — aspiration is left as bare digraphs in the IPA column of all three suntb rows, against the map's own convention and against the sibling row `acn` in the same commit

**Cells:** 27 of them — jiu 10, pmi 6, twm 11:

- jiu `thi˧˧`, `khɯ˧˧jo˧˧`, `na˧˧kho˥˥`, `mø˧˧khɹa˧˧`, `a˧˧phɹo˧˧`,
  `li˧˩phjɐ˧˧`, `mi˧˩tsha˧˧`, `tsha˥˥kha˧˩`, `mi˧˧tɕhø˧˧`, `ji˧˩tʃho˥˥`
- pmi `khɯ˧˥dʐa˧˥`, `khə˧˥ʑi˧˥`, `thiẽ˥˧`, `phʐã˥˥mə˥˧`, `tshi˥˥`, `tɕhyi˥˥mə˥˧`
- twm `chi˥˧`, `chem˥˧`, `cher˥˥po˥˧`, `chɛʔ˥˧le˧˩ŋe˥˧`, `khᴀ˥˥ru˥˧`,
  `khAʔ˥˧lum˥˧`, `li˩˧khu˧˩`, `lɛː˥˥thøn˥˥`, `theʔ˥˧`, `tshi˥˧`, `tshᴀ˥˧`

**What is wrong.** In the IPA column `thi` reads as [t]+[h], not [tʰ]. The source's
digraphs are unambiguously aspirates — the CLDF `Segments` spell every one of
them out: `911_one theʔ⁵³ → tʰ e ʔ ⁵³`; `119_dog chi⁵³ → cʰ i ⁵³`;
`348_house chem⁵³ → cʰ e m ⁵³`; `840_white phʐã⁵⁵mə⁵³ → pʰ ʐ ã ⁵⁵ + m ə ⁵³`;
`10_water ji³¹tʃho⁵⁵ → j i ³¹ + tʃʰ o ⁵⁵`; `860_good tɕhyi⁵⁵mə⁵³ → tɕʰ y i ⁵⁵ …`.
Note also that Sun himself writes `ʰ` elsewhere in the same doculects
(`Jinuo 402_liquor tɕɛ⁴²pʰɯ³³`), so the digraph is not even a consistent source
convention.

Across `/home/jounlai/langmap/words/`, **338 rows / 1889 occurrences** use `ʰ`;
only 10 rows anywhere carry a bare `Ch`+vowel digraph in the IPA column, and
jiu/pmi/twm are three of the four worst. **`acn`, added from the same suntb CLDF
in the immediately preceding commit, converts to `ʰ` (5 cells) and has zero
digraphs.** So this batch is internally inconsistent with itself.

**What it should be.** `ph th kh ch tsh tʃh tɕh` → `pʰ tʰ kʰ cʰ tsʰ tʃʰ tɕʰ` in
the IPA column only (surfaces keep the source spelling), e.g.
jiu one `tʰi˧˧`, twm dog `cʰi˥˧`, pmi good `tɕʰyi˥˥mə˥˧`.

**Verified against:** `suntb_forms.csv` `Segments` column for each cell listed;
`grep` census over `/home/jounlai/langmap/words/*.js`.

---

## 9. FIX — pmi keeps two non-IPA source graphs in the IPA column

**Cells:** `sun pmi ["bu̵53","bu̵˥˧"]`, `snow pmi ["pu̵53","pu̵˥˧"]`,
`tooth pmi ["ʂu̵53","ʂu̵˥˧"]`, `iron pmi ["ɕī55","ɕī˥˥"]`.

**What is wrong.** `u̵` is u + U+0335 COMBINING SHORT STROKE OVERLAY, a Chinese
typographic stand-in for the close central unrounded vowel; the IPA letter is
`ʉ` (U+0289), and the CLDF profile says so: `2_sun bu̵⁵³ → b ʉ ⁵³`,
`9_snow → p ʉ ⁵³`, `244_tooth → ʂ ʉ ⁵³`. `ī` (i + macron) is not IPA either —
a macron is not a length or quality mark in IPA; the profile maps it to plain i
(`38_iron ɕī⁵⁵ → ɕ ī/i ⁵⁵`). Unlike twm's `ᴀ`, neither is declared in the
coverageNote, so there is no "kept as printed" policy covering them.

**What it should be.** IPA column: `bʉ˥˧`, `pʉ˥˧`, `ʂʉ˥˧`, `ɕi˥˥`
(surfaces may keep `u̵` / `ī`). Same call would apply to `ɣiã` in pmi `nose`,
which the profile reads `ɣ j ã`.

**Verified against:** `suntb_forms.csv` `Segments`/`Graphemes` for
`TaobaPumi 2_sun, 9_snow, 38_iron, 244_tooth, 240_nose`.

---

## 10. FIX — twm `speakers:'~10K in China'` is roughly an order of magnitude too high, and contradicts the row's own note

**Claim:** `speakers:'~10K in China (Monpa nationality ~11K)'`.

**What is wrong.** The nationality figure (~11K; 10,561 at the 2010 census) is
right, but the row's own coverageNote says that nationality "covers two mutually
unintelligible languages", of which this row is one — so assigning ~10K of the
~11K to twm alone leaves essentially nothing for the Motuo Tshangla half, which
is in fact the larger of the two. Chinese sources put 墨脱门巴语 (Motuo, Tshangla)
at ~5,000 speakers alone. Ethnologue gives **1,300 in China (2000 census)** for
twm. Bodt & Hyslop, working from Lu (2002) on precisely this Mama doculect,
report 612 Monpa in the census and 527 Monpa speakers in Tshona/Cuona county.
Nearly all twm speakers are on the Indian side: ~9,100 in India (2006) per
Ethnologue, with Chinese sources quoting 3万多 for 错那门巴语 counting Tawang.

**What it should be.** Something like
`speakers:'~1.3K in China (2000 census); ~10K worldwide, mostly Tawang, India'`,
with the Monpa-nationality figure kept as the separate parenthetical it already
is. The English `description`'s "The Monpa nationality of China numbers about
11,000" is fine as written and should stay.

**Verified against:** https://www.ethnologue.com/language/twm/ ;
门巴族 (2010 census 10,561) https://zh.wikipedia.org/zh-cn/门巴族 ;
门巴语 (墨脱门巴语 ~5,000; 错那门巴语 ~3万多 incl. Tawang)
https://baike.baidu.com/item/门巴语 ; Bodt & Hyslop, "East Bodish revisited"
supplement (Zenodo 6559622) and Hyslop, "Dzala and Dakpa form a coherent
subgroup within East Bodish".

---

## 11. FIX — dta `you` loses the acute that marks the postalveolar; the IPA `si` is the wrong word

**Cells:** `you dta: ["sí","si"]`, and consequentially `tooth dta: ["sídə bor","sidə bor"]`.

**What is wrong.** The Daur 2SG pronoun is **[ʃiː]** — Cyrillic ший *xii*,
Latin *šii*. Robbeets' Altaicist Latin marks the postalveolar with an acute
(it also writes `śinken` 'new' = *šinken*, `ḿagə` 'meat'); the row's `TR` table
maps `í→i` and so prints `si`, which is a different syllable. The CLDF
`Segments` does the same collapse (`s í/i`), so the row is faithfully copying a
lossy profile — but the map's IPA column is supposed to be pronounceable, and
`si` is not how Daur says 'you'.

**What it should be.** `you dta: ["sí", "ʃiː"]` (or `ʃi` if length is not being
carried), `tooth dta: ["sídə", "ʃidə"]`. If the acute is instead treated as
uninterpretable, the honest move is to say so in the coverageNote rather than
silently drop it — the current note lists the whole mapping rule and omits `í`.

**Verified against:** https://en.wikipedia.org/wiki/Dagur_language personal
pronoun table (1SG бий *bii*, 2SG ший *xii*, 1PL incl. Бид *bid*, excl. Баа
*baa*, 2PL Таа *taa*); Tsumagari, *Dagur*, in Janhunen (ed.) 2003.

---

## 12. FIX — dta `script` field contradicts the row's own description and omits the script Daur was actually written in

**Claim:** `script:'Unwritten (Latin and Cyrillic schemes proposed)'`.

**What is wrong.** Daur was written with the **Manchu script** through the Qing
— an actual historical orthography, not a proposal — and the row's own English
description says exactly that ("Manchu script, Cyrillic and Latin schemes have
all been tried"). The `script` field drops the Manchu script and downgrades the
rest to "proposed".

**What it should be.** `script:'No standard orthography (Manchu script
historically; Latin and Cyrillic schemes tried)'`.

**Verified against:** https://en.wikipedia.org/wiki/Dagur_language ("During the
time of the Qing dynasty, Dagur was written with the Manchu alphabet");
https://www.omniglot.com/writing/daur.htm .

---

## 13. FIX — `rain` is in both sources for all four rows and was left empty

**Cells:** `words/rain.js` has no jiu / pmi / twm / dta entry. `rain` is one of
the better-covered concepts on the map (880 rows).

**What is wrong.** Nothing in the coverageNotes explains the gap, and the concept
is present and filled in both sources:

| row | source param | value | cell would be |
|---|---|---|---|
| jiu | `8_rain` | `mi³¹tha⁵⁵` | `["mi31tha55","mi˧˩tʰa˥˥"]` |
| pmi | `8_rain` | `gui⁵³` | `["gui53","gui˥˧"]` |
| twm | `8_rain` | `nᴀm¹³` | `["nᴀm13","nᴀm˩˧"]` |
| dta | `13_rainn` | `huar` | `["huar","huar"]` |

Three further map concepts are likewise available and unused in suntb for all
three rows — `125_bear` (jiu `a³³ø⁴⁴`, pmi `guẽ⁵⁵`, twm `ɔm¹³`), `402_liquor`
= wine (jiu `tɕɛ⁴²pʰɯ³³`, pmi `tɕɛ⁵⁵tɕhi³⁵`, twm `tɕhᴀŋ⁵³`) and `282_excrement`
= poop (jiu `ɑ³³khɹi³³`, pmi `xe⁵³`, twm `ȵin¹³`). `snow` is genuinely absent
for Jinuo only (`9_snow` has no Jinuo row) — that omission is correct.

**Verified against:** `suntb_forms.csv` / `rob_forms.csv` for the params listed.

---

## 14. NOTE — the dta WE cell is correct

`we dta: ["bide / ba:", "bide / baː"]`, routed `clusive`. Verified, not assumed:
Daur is the one modern Mongolic language that keeps the Proto-Mongolic
inclusive/exclusive opposition intact — *bide* / *bid* is the **inclusive**
(< \*bi+ta 'I and you' > \*bida) and *baː* / *baa* the **exclusive** (< \*ba : \*man-).
Wikipedia's Dagur pronoun table gives 1PL incl. Бид *bid*, excl. Баа *baa*, and
states "Dagur has a pronominal system that distinguishes between first person
plural inclusive /bed/ and exclusive /baː/". Janhunen, *Proto-Mongolic*
(Janhunen ed. 2003, ch. 1): "\*ba : \*man- was restricted to the exclusive
function… The only modern language preserving the original set is Dagur."
Inclusive-first ordering matches `words/we.js`'s stated convention. No change.

One wording quibble: the coverageNote says "WE is printed exclusive-first as
`ba: / bide`". The source does not print it as one string — `249_1plpronoun`
has two separate unlabelled form rows, and it never marks either as inclusive
or exclusive. The clusivity assignment is the row's own (correct) inference and
the note reads as if the source supplied it.

**Sources:** https://en.wikipedia.org/wiki/Dagur_language ;
Janhunen (ed.) 2003, *The Mongolic Languages*, ch. 1 (Proto-Mongolic) and ch. 6
(Dagur, Tsumagari), pp. 1ff / 129ff.

---

## 15. NOTE — an existing row contradicts §14 and one of the two must be wrong

`words/we.js` line ~1259: `sce: ["matan / bijien", "matan / pitɕiən"]`, routed
`clusive`, i.e. Santa/Dongxian *matan* = inclusive, *bijien* = exclusive. Those
are the same two Mongolic pronoun sets as Daur's, assigned the opposite way:
`rob_forms.csv` gives Dongxian `249_1plpronoun` = `matan` (the \*ma-/\*ba-
exclusive set) and `biʥiən` (the \*bida inclusive set). Under the Proto-Mongolic
correspondence in §14, `sce` looks reversed. Out of scope for this review, but
it is directly comparable and should not be left contradicting the new dta row.

---

## 16. NOTE — the twm doculect identification is right, despite Glottolog

`suntb_languages.csv` tags the source doculect `MamaTshona` with Glottocode
`dzal1238` / ISO `dzl` (Dzalakha), not `twm`. The row overrides that, and is
correct to: Bodt & Hyslop's East Bodish work lists **DkM = Dakpa Mámǎ** among
the Dakpa varieties and states that "there are two descriptions of the Mama
dialect, termed Cuònà Ménbà, one a wordlist in Sūn et al. (1991)" — i.e. this
exact wordlist — with Lu's Wenlang dialect and van Driem's Dakpa as the other
Dakpa dialects. Glottolog's `dzal1238` itself sits under `dakp1241`, so the two
tags are not in real conflict. Worth one clause in the coverageNote so the next
reviewer does not re-open it.

**Sources:** Hyslop, "Dzala and Dakpa form a coherent subgroup within East
Bodish, and some related thoughts"
(https://www.researchgate.net/publication/265006711); Bodt & Hyslop, supplement
to "East Bodish revisited", Zenodo 6559622; https://glottolog.org/resource/languoid/id/dzal1238 .

---

## 17. NOTE — twm `hundred` is faithful but will look like an error

`twm hundred: ["chɛʔ53le31ŋe53", …]` literally contains the word for 'five'.
That is correct: Mama Dakpa counts vigesimally on `chɛʔ` 'score' — `933_forty`
`chɛʔ⁵³nᴀi¹³` (score×2), `935_sixty` `chɛʔ⁵³sum⁵³` (score×3), `937_eighty`
`chɛʔ⁵³pli⁵³` (score×4), `939_hundred` `chɛʔ⁵³le³¹ŋe⁵³` (score×5), with
`930_twenty` `khᴀ⁵⁵li⁵³` < Tibetan ཁལ *khal*. No change; a half-sentence in the
coverageNote would pre-empt the next reviewer flagging it.

---

## 18. NOTE — smaller things, no action required unless convenient

- **jiu `native:'Kino'`.** Sun's own autonym entry (`Jinuo 316_autonym`) is
  `tɕy³³no³³`, i.e. Jino/Jinuo. "Kino" is an Ethnologue alternate name rather
  than an endonym rendering; `Jino` would match the source better. Everything
  else in the jiu row checks out: Youle (攸乐) doculect confirmed
  (`suntb_languages.csv`: `Jinuo, youl1235, Youle Jinuo, jiu`), ~21K speakers,
  1979 recognition as the 56th nationality, Loloish/Ngwi classification.
- **`pmi` autonym.** `TaobaPumi 316_autonym` is `phʐã⁵⁵mə⁵³` — the same word as
  the row's `white` cell, i.e. Prinmi 'white (people)'. `native:'Prinmi'` is right.
- **dta `three` `guarwe`.** CLDF `Segments` reads it `g u/w a r w e`, i.e.
  [gwarwe]; the row keeps `guarwe` in the IPA. Cosmetic.
- **pmi `dog` `dʐa`** — profile reads `ɖʐ` (voiced retroflex affricate). Cosmetic.
- **`—` vs absent.** All four rows dash the concepts they declare unattested but
  are simply absent from concepts they never looked at (`rain`, `bear`, `wine`,
  `poop`, and `snow` for jiu). Fine as long as §13 is acted on, but the two
  states currently mean the same thing to a reader.
- **Book title.** All three suntb coverageNotes cite 《藏缅语语音和词汇》 (Sun
  Hongkai 1991). That matches the book and matches lexibank/suntb's own
  attribution ("Sūn's *Tibeto-Burman Phonology and Lexicon*", 1991, Chinese
  Social Sciences Press). Correct as printed.
- **jiu/pmi/twm/dta speaker and country figures otherwise check out:** jiu ~21K
  (Ethnologue), pmi ~54K vs nationality ~43K (2010 census 42,861 — and the
  description's explanation of the mismatch via Muli Tibetan classification is
  right), dta ~96K in a nationality of ~132K (2010 census 131,992).
