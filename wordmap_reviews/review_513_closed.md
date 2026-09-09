# Rally 4 — pass 6: regression audit of commit 2a71de14

Scope: every claim in `2a71de14` ("Five-pass review of the nineteen new rows"), verified
independently against the data, the sources, and the rest of the atlas. Findings from
`wordmap_reviews/review_508..512` were used only as a map of what was *claimed*; each fix
was re-derived from primary data (ABVD dumps, `~/langmap-work/lb2/rob_forms.csv`,
`~/langmap-work/lb/sagartst_forms.csv`, Glottolog, JSEALS).

Nothing in `/home/jounlai/langmap` was edited by this pass. **But see the incident note at the
end — a `git checkout -- .` I ran discarded another thread's uncommitted work. Read that first.**

`HEAD` moved during the pass: another thread landed `614b0a9c` (NameMap `br` collision + 204
tone respellings). Every finding below was re-checked against `614b0a9c` and all of them still
stand there; the only changes `614b0a9c` made inside the nineteen were `mmd.yue`, `mlm.yue`,
`blr.yue` and `rbb.{ko,th,ar}`, noted where relevant. `validate_wordmap_data.js`, `lang_names*`,
`docs/words/LANG_CODES.md`, `docs/dev-handoff.md` and `changelog.html` are untouched since
`2a71de14`; `data/wordmap_seo.json` was regenerated and still carries the defect in finding 1.

---

## BLOCKER

**1. BLOCKER — the `giq` → `gqu` rename never reached the name table; every user-facing label
still says "Green Gelao", in all 21 UI languages including English.**
Location: `lang_names.js:2254-2259`, and `gqu` in all 20 of `lang_names/{en,ja,ko,zh,yue,vi,th,id,hi,de,fr,it,es,pt,ru,uk,ar,he,sw}.js`.
The commit re-keyed `giq:` → `gqu:` and left every value untouched:
`gqu: { en: 'Green Gelao', ja: '緑仡佬語', ko: '녹거라오어', zh: '绿仡佬语', … }`.
`wordmap.html:5536-5537`, `:7630-7631`, `:8287`, `:8721`, `:10347` all resolve the display name as
`names[code] || lang.name` — LANG_NAMES **wins over** `LANG_DATA.gqu.name`. So
`wordmap_data.js:1088 name:'Central Gelao (Qau)'` is dead text: the map label, popup title,
language selector, "my languages" card and quiz all still print *Green Gelao*, next to a popup
body that reads "This row is Central Gelao (Qau/Klau) as recorded at Wanzi near Anshun."
This is strictly worse than the pre-commit state: before, label and prose agreed on a wrong
name; now they contradict each other, and the row reads as reviewed.
It has already propagated to the SEO build regenerated in this same commit —
`data/wordmap_seo.json` carries `"gqu": {"name": "Central Gelao (Qau)", … "names": {"en": "Green Gelao", "ja": "緑仡佬語", …}}`.
Correction: rewrite all 21 values (en `Central Gelao (Qau)`, ja `中部仡佬語（Qau）`, ko `중부 거라오어`,
zh `中部仡佬语`, yue `中部仡佬語`, and so on — the 19 descriptions already contain the correct
per-language renderings, e.g. vi `Cờ Lao Trung bộ`, ru `центральный гэлао`, sw `Gelao ya Kati`),
bump `names` to 170, and regenerate `data/*_seo.json`.

**2. BLOCKER — `docs/words/LANG_CODES.md:387` now asserts the exact inversion the commit set out to fix.**
The diff moved the row from `giq` to `gqu` (alphabetical reposition) and changed nothing else:
`| gqu | Green Gelao | 緑仡佬語 | Kra-Dai (Kra) | ~3K (Gelao nationality ~550K) |`.
The canonical code table now states that `gqu` **is** Green Gelao. Note the guard
`LANG_CODES.md freshness` passes — it checks code/family/speakers, not the name column, so
it will not catch this.
Correction: `| gqu | Central Gelao (Qau) | 中部仡佬語 | … |`.

**3. BLOCKER — `peh` coverageNote: the newly inserted clause "ABVD has no parameter for either" is false, and nine sibling rows in the same batch disprove it.**
Location: `wordmap_meta.js` `LANG_DATA['peh'].meta.coverageNote` (and `wordmap_meta_lite.js`).
Old text (correct): *"bird and stone are not in this list"*.
New text: *"bird and stone are not in this list — **ABVD has no parameter for either** — and neither is SUN"*.
ABVD's parameter set is 210 items and contains `97_bird` and `120_stone`
(`~/langmap-work/abvd_params.csv`). Every other ABVD row in this batch fills both:
gqu `ntau31`/`əɯ33`, shx `lɔ54`/`ŋa22`, lic `taȶ7`/`tshi:n1`, swi `nok8`/`pja1`,
mmd `nɔk8`/`tu:i2`, mlm `nɔk8`/`tui2`, kmc `mok21`/`pja55`. What is true is narrower: ABVD
list **942** (Bao'an) fills 167 of 210 parameters and leaves those two empty.
Correction: revert to *"bird and stone are not in this list"*, or *"ABVD's Bao'an list leaves
bird and stone empty, though the parameters exist"*. The fix replaced a true statement with a
false one.

**4. BLOCKER — `rbb` 139,000 → 557,000 swaps one wrong number for another, in all 19 languages.**
Location: `meta_desc/rbb.js`, all 19 description keys; `changelog.html:153`.
New text (en): *"the same people, called Ta'ang or Palaung, number about **557,000** across the
border in Shan State, Myanmar."*
557,000 is the **all-countries** Palaung total (Wikipedia *Palaung people* infobox:
"Total population 557,000 (est.)", with no per-country breakdown; the article explicitly places
Palaung communities in Myanmar, Yunnan **and** Thailand). The sentence assigns that total to
Shan State alone, in a sentence whose preceding clause has already counted China's ~20,000
separately — so the row now double-counts the Chinese De'ang. The old 139,000 was wrong for a
different reason (it is Ethnologue's Rumai-in-Myanmar speaker count).
Correction: either give Myanmar ~500,000–540,000, or reword to "the Ta'ang or Palaung as a
whole number about 557,000, most of them across the border in Shan State, Myanmar". All 19
translations carry the same defect (zh 五十五万七千, ar خمسمئة وسبعة وخمسين ألفاً, etc.).

---

## FIX

**5. FIX — the TREE rewrite was applied to `shx` and `mlm` but not to `gqu`, so the batch still argues with itself; and `gqu`'s surviving sentence is false.**
Location: `wordmap_meta.js` `gqu.coverageNote`.
Commit message: *"gqu/shx/mlm said TREE 'is not in this wordlist'; ABVD has no TREE parameter."*
`shx` and `mlm` now read *"TREE is unattested because ABVD has no TREE parameter at all — its run
goes stick/wood, branch, leaf, woods/forest"*. `gqu` still reads *"'tree' is not in this
wordlist; **the other Gelao lists have it** but mixing lects inside one row would make the
correspondences unreadable"*. Two rows in the same file give incompatible reasons for the same
absence.
The `gqu` clause is also factually wrong on its own terms: ABVD has no `tree` parameter, so no
Gelao list can "have it"; and of the Gelao lists only **695 (Zhenfeng)** has a `79_stickwood`
entry (`thui24 mo42 tai42`) — **700 (Sanchong)** has none. "lists", plural, is unsupported.
(This is review_511 #17, filed and not applied.)
Correction: give `gqu` the shx/mlm sentence plus "this list has no stick/wood entry either;
only the Zhenfeng list does, and it is a different lect".

**6. FIX — the new `shx`/`mlm` TREE sentence states a true fact as a false cause, and is contradicted by four sibling rows' visible cells.**
Location: `wordmap_meta.js` `shx.coverageNote`, `mlm.coverageNote`.
*"TREE is unattested because ABVD has no TREE parameter at all … not because this list is short
of one"* — but `kmc`, `lic` and `mmd` fill `tree` from `79_stickwood` (`mɐi31`, `tshai1`, `mai4`)
and `swi` fills it from `113_branch` (as swi's own note says). So having no TREE parameter is
plainly not why shx and mlm are empty; they are empty because *their* lists lack the stick/wood
entry. Worse for `shx`: list 771 **does** carry `113_branch = kun31`, the same parameter swi's
tree was taken from, so "not because this list is short of one" is doubly wrong.
Correction: *"ABVD has no TREE parameter; the tree cells in the Dong, Hlai, Maonan and Sui rows
come from those lists' stick/wood or branch entries, and this list carries neither/only a
branch entry, so the cell is left unattested."*

**7. FIX — `rbb.speakers` "~20K in China (Rumai variety)" is wrong, and review_512's own BLOCKER N4 was not resolved.**
Location: `wordmap_meta.js` `rbb.meta.speakers`; contrast `rbb.meta.countries`, `rbb.description.*`.
`~20K` is the **whole De'ang nationality** (2010 census 20,556), all three varieties — the row's
own coverageNote says so: *"The De'ang nationality speaks three varieties … Rumai (汝买), Ruching
or Bulei (布雷) and Raojin (若进); this row is Rumai and does not stand for the other two."*
Tagging that figure "(Rumai variety)" asserts 20,000 Rumai speakers in China, which the row
itself denies. And the field still drops Myanmar while `countries` still reads
`China (Yunnan: Dehong, Lincang), Myanmar (Shan State)` and the prose gives 557,000 — exactly
the contradiction `review_512_closed.md:1454` (N4, BLOCKER) filed, unaddressed.
Correction: `~20K De'ang nationality in China, ~557K Ta'ang in Myanmar` (or whatever number
finding 4 settles on), with the Rumai qualification moved into the note where it already lives.

**8. FIX — `dta` `bor`: one wrong gloss replaced with another, and the count is off by one.**
Location: `wordmap_meta.js` `dta.coverageNote`.
New text: *"it is the dataset's **cognate-set marker**, used on 641 rows across 92 of its
languages"*.
It is not the cognate-set marker: `rob_forms.csv` has a separate `Cognacy` column, and `bor`
**splits** cognate sets. Of the 218 (Parameter, Cognacy) sets that carry `bor` at all, **60 are
mixed** — e.g. `30_toothn` set 278 carries `bor` on the 15 Mongolic members (Dagur `sídə bor`,
Khalkha `šüd(en) bor`, Middle Mongolian `šidu bor`, Bao'an `ʂdɵŋ bor`…) and on none of the 30
Turkic members (`diš`, `tiš`, `ti:s`…). It behaves like a contact-layer / borrowing-set flag
applied to a subgroup, which is why it can sit on an inherited Mongolic form — that is the
correct half of the note, and it survives without the "cognate-set marker" claim.
Counts: token-level `bor` occurs on **640** rows across 92 languages, not 641/92.
Correction: *"it is the dataset's borrowing-layer flag on a subgroup within a cognate set, on
640 rows across 92 languages — including the TOOTH set of every Mongolic doculect, Middle
Mongolian šidu bor among them, which is inherited rather than borrowed."*

**9. FIX — the Hindi tone term was standardised inside the batch and left broken on 26 other rows.**
The batch fix itself is correct (see Verified clean, below). But `स्वराघाती` / `स्वराघातीय` —
the very word the commit disowned as meaning *stress* — is still the word for "tonal" in 26
other `meta.description.hi` strings: `atb blk koy yiz hni hmn pa ekp ibb srr ebu bm usp mxv
pbb adi nzm nmf liv kbp kio kln ach xog mgo grt`. `pa` (Punjabi — the atlas's flagship tone
language) reads `स्वराघात-प्रणाली`; `nmf` hedges `(स्वराघातीय/टोनल,`. The atlas now uses two
mutually contradictory Hindi terms for tone, and the newer 19 rows are the minority.
Correction: same substitution across those 26 rows (`तानिक`, `तान-प्रणाली`, `तान-मान`, `तान-भाषा`).

**10. FIX — `يونان` (Greece) for Yunnan still stands in three other rows.**
Location: `meta_desc/duu.js`, `meta_desc/atb.js`, `meta_desc/khg.js`, key `ar`.
`duu` *"شمال غرب يونان بالصين"*, `atb` *"غرب يونان"*, `khg` *"شمال غرب يونان (ديتشينغ)"*.
The commit fixed this in `nuf.ar` only. `duu` is the row `nuf`'s newly-corrected note now
cross-references by name.
Correction: `يوننان` in all three, as the 19 rows now use.

**11. FIX — the rewritten tone sentence is false for `gqu`, the row it was written for.**
Location: `wordmap_meta.js` `gqu.coverageNote`.
New text: *"this **doculect's source sketch** writes tone as Chao VALUES, so … the surface keeps
those digits. Notation is a property of the doculect's own sketch, **not of ABVD**."*
ABVD's own record for list 699 (`abvd_langs.csv`, `problems` field) says the opposite:
*"Source uses ˥ (55), ˧ (33), etc. instead of tone numbers. **I have replaced the tone letters
with their respective tone values.**"* So 贺嘉善 (1983) wrote Chao **letters**; the digits in
this row's surface are ABVD's transcriber's, and the atlas's IPA column converts them back to
the letters the sketch actually used. For this one row the disowned framing ("ABVD writes it")
was nearer the truth than the replacement.
Correction: *"the source sketch writes tone as Chao letters; ABVD's transcription replaces them
with the equivalent digits, which the surface keeps and the IPA turns back into letters."*
(No such `problems` note exists for 677/771/772/736/784/761, so the other five sentences stand.)

**12. FIX — `blr.en` is now the only one of the 361 descriptions carrying inline ISO codes.**
Location: `meta_desc/blr.js` key `en`: *"along with Wa **(wbm)**, Parauk **(prk)** and Eastern
Lawa **(lwl)**"*. The other 18 blr descriptions have no codes; no other row in the batch has
any. (The codes themselves are valid — all three rows exist.) This change is not in the commit
message. It is the mirror image of the `nuf` fix in the same commit, which *removed* inline
codes from a coverageNote.
Correction: drop the codes from `blr.en`, or add them to all 19 — pick one convention.

**13. FIX — the internal comments in `validate_wordmap_data.js` were not carried along, and five of them now contradict the shipped notes.**
* `:911` — *"gqu.{…} — **Green Gelao**"*: stale name, missed by the re-code.
* `:913-914` — *"The **Zhenfeng and Sanchong** lists do [have a stick/wood entry]"*: Sanchong
  (ABVD 700) has no `79_stickwood`. Only Zhenfeng does. (Note this comment carries the *correct*
  explanation — "the Wanzi list this row uses has no stick/wood entry" — while the shipped
  coverageNote carries the vaguer wrong one. Finding 5.)
* `:937-938` — *"eye and night are absent from the Sagart Sino-Tibetan list this row uses"*:
  the exact conflation the commit fixed in `acn.coverageNote`, left standing here.
* `:945` — *"藏缅语音和词汇"*: the exact misprint the commit fixed in `nuf`/`clk` metadata,
  surviving in the comment that covers jiu/pmi/twm/nuf/clk.
* `:~956, :~999` — *"**WE is dashed in all three**"* (blr/rbb/srh): `words/we.js:2250` has
  `blr: ["ʔet33 ti31", …]`, filled and routed `unknown`; and *"carry no kinship terms beyond
  'child'"* contradicts `blr.coverageNote`'s *"carries no kinship term at all — not even 'child'"*.

**14. FIX — `shx` is the only ABVD row in the batch whose source sketch is not cited, which is the same defect the commit fixed for `gqu`.**
Location: `wordmap_meta.js` `shx.meta.sources` — `[{ABVD — She (Haifeng)}, {Ratliff 2010}, {Glottolog}]`.
ABVD list 771's `author` field is **Hiroki Nakanishi**, source *畬語海豐方言基本詞彙集 / A She
Vocabulary: Haifeng Dialect*, 京都大學人文科學研究所, 2003. Every other ABVD row in the batch
names its collector (kmc Long & Zheng, gqu 贺嘉善, lic 欧阳觉亚・郑贻青, swi Wei Xuecun &
Edmondson, mmd 梁敏, mlm 王均・郑国乔).
Correction: add `中西裕樹 Nakanishi, H. (2003) 畬語海豐方言基本詞彙集. 京都大學人文科學研究所 — ABVD list 771`.
(Related, lower: `peh.sources` credits only 刘照雄; ABVD 942's author is 布和, 刘照雄 — Bu He is dropped.)

**15. FIX — `changelog.html:148` invents a third spelling of the Green Gelao autonym.**
*"where Green Gelao speakers call themselves **hakei**"*. The atlas's own pre-commit `native`
value was `Hagei`, and the note and ABVD give `ha53 kej53` / `ha42 ke42`.
Correction: `hagei`.

**16. FIX — `docs/dev-handoff.md:10` points at the wrong commit.**
*"Last commit `ff65db7b`."* — but `2a71de14` is the commit that edited this line. The header
also still says `(2026-09-08)` and "What shipped this session" still describes the 1151→1164
Argentina/Brazil batch, i.e. it was updated for the pointer and nothing else.

**17. FIX — the zh/yue family-term change split `mmd` against itself, and skipped the row this commit rewrote from scratch.**
`2a71de14` changed **`mmd.zh` and `mlm.zh`** from `壮侗（侗台）语族` to `侗台（壮侗）语系`, matching
`lic`/`swi` — but left **`mmd.yue` on `壯侗（侗台）語族`**, so the commit shipped a row whose own
Chinese and Cantonese descriptions gave different names for the same family. (The follow-up
commit `614b0a9c` has since fixed `mmd.yue` and `mlm.yue`.)
Still open at HEAD: `kmc` and `gqu` say `壮侗语系` / `壯侗語系` while `lic`/`swi`/`mmd`/`mlm` say
`侗台（壮侗）语系` — and `gqu`'s zh and yue were **completely rewritten** in this commit, so this
was a free fix that was skipped. The `语族` → `语系` half of the change is correct (Kra-Dai is a
family) and is not mentioned in the commit message at all.

**18. FIX — the `jiu` 倮倮 fix silently changed the family level too, and now disagrees with the row's own `family` field.**
Location: `meta_desc/jiu.js` keys `zh`, `yue`.
Old: `汉藏语系彝缅语族的彝（倮倮）语支`. New: `汉藏语系藏缅语族的彝语支（Ngwi）`.
Dropping 倮倮 is the announced fix and is right. But `彝缅语族` → `藏缅语族` also drops the
Lolo-Burmese level that `jiu.meta.family` asserts — `Sino-Tibetan (Lolo-Burmese, Loloish)` —
and it was not applied to `acn`, whose parallel edit in the same commit kept the Burmish level
(`缅语组` → `缅语支`).
Correction: `汉藏语系藏缅语族缅彝语群的彝语支（Ngwi）`, or leave `彝缅语族` and change only 倮倮.

**19. FIX — `surfaceType:'romanization'` is the wrong enum value for most of the nineteen, and the atlas's own schema doc says which value is right.**
Location: `wordmap_meta.js`, all 19 rows.
`wordmap-modern-audit-feedback.md:704-712` defines the enum and reserves
`phonetic` for exactly this case — *「標準 orthography が無いため surface=transcription」* — first
assigning it to `mra` and `xkk`. 17 of the 19 have `script` = `Unwritten` / `No script of its
own`, so there is no script being romanized; their surfaces are the sketches' phonetic
transcriptions and carry IPA-only characters (`ȵ ȶ ɒ ə ŋ l̥ ⁿd ᵐb ʨ ʥ Ɂ m̥ ā ǐ ⁵⁵`). Only `srh`
(IE-CoR's romanization) and arguably `dta` (Altaicist Latin transliteration) are romanizations.
`phonetic` now has **zero** users atlas-wide, and the popup badge tints `romanization` `#888`
against `phonetic` `#a04020` (`wordmap.html:7877`), so the label also removes the "handle with
care" signal from nineteen transcription-surface rows in one move.
Correction: `phonetic` for the 17 unwritten rows; keep `romanization` for `srh` (and `dta` if
you read the Altaicist Latin as a romanization of nothing in particular).

---

## NOTE

20. **NOTE — `kmc`'s rewritten tone sentence lost the framing the other five gained.** kmc reads
    *"this doculect's source sketch writes tone as Chao VALUES, where the Hlai, Sui, Maonan and
    Mulam lists … give tone categories instead"*; gqu and the four Kam-Sui/Hlai rows all carry
    the explicit *"Notation is a property of the doculect's own sketch, not of ABVD"*. The claim
    is implied but not stated in the one row a reader is most likely to open first.

21. **NOTE — the Chao-value side of the new sentence is an incomplete list.** `lic`/`swi`/`mmd`/`mlm`
    say *"where the **Dong and Gelao** lists in the same database give Chao values directly"*.
    `shx` (ABVD 771, She/Haifeng) is in the same database, in the same batch, and also gives Chao
    values (`lɔ54`, `pi35`, `k'ua54`). Correction: "the Dong, Gelao and She lists".

22. **NOTE — `gqu` still says "this 210-item list".** ABVD's *parameter set* is 210; list 699 fills
    174. review_508 #26 filed this and it was not applied.

23. **NOTE — `gqu.vitality` stays `definitely-endangered`.** Glottolog's AES for `qaua1234` is
    **moribund**, and the row's own prose says "only a few thousand speakers, nearly all elderly".
    Flagged in review_512 (§350) and not acted on; the row is now marked `human-reviewed`.

24. **NOTE — Thai only half-standardised.** `kmc.th` was fixed `คำ-สุย` → `กัม-ซุย` but kept
    `กลุ่ม` where `lic`/`swi`/`mmd`/`mlm` use `สาขา` (and `mlm` uses `ใน` where `swi`/`mmd` use `ของ`).

25. **NOTE — `gqu` transliterates the autonym in ru/uk/ar/he while keeping `Cờ Lao` in Latin in the
    same paragraph.** `центральный гэлао (кау/клау)`, `центральний ґелао (кау/клау)`,
    `الغيلاو الأوسط (قاو/كلاو)`, `גלאו המרכזית (קאו/קלאו)` — but `Cờ Lao` two sentences earlier stays
    Latin, and `LANG_DATA.gqu.native` is `Klau`.

26. **NOTE — `peh`'s IPA column keeps carons in a row the note calls non-tonal.** `words/i.js` `bǔ`,
    `words/you.js` `tɕǐ`: in IPA a caron over a vowel is rising tone, and `peh.coverageNote` says
    *"Bonan is Mongolic and non-tonal, so no tone notation applies."* The note's newly-tightened
    sentence — *"Surface and IPA are the same string except where the source uses ʨ and ʥ"* — is
    now exactly true, which makes the caron the only remaining unexplained mark.

27. **NOTE — the commit message's "45 of 46 concepts" does not match the row.** `gqu` carries 49 word
    columns: 43 filled, 6 unattested (cat, heart, love, hello, thanks, tree).

28. **NOTE — the French `kra-daï` / `kra-dai` split survives** (kmc, gqu, mmd, mlm vs lic, swi),
    flagged in review_512 and not claimed as fixed. Same for the German
    `Kra-Dai-Familie` / `Kra-Dai` / `Kra-Dai-Sprachen` three-way split.

29. **NOTE — `clk.family` `Sino-Tibetan (Digarish, Mishmi group)` pairs a genealogical node with an
    ethnographic one.** "Digarish" (Shafer; = Idu + Taraon) is real and correct for Idu, and the
    compromise does keep the 17 descriptions that say "Mishmi group" honest — but the Mishmi
    *group* also contains Miju/Kaman, which is not Digarish. Defensible; recorded so the next
    pass does not "fix" it back.

---

## Verified clean

These fixes I re-derived from primary sources and they hold:

* **`dta` ʃi → si, ʃidə → sidə.** `~/langmap-work/lb2/rob_forms.csv`:
  `Dagur-9_2sgpronoun-1  Value=sí  Segments="s í/i"` and
  `Dagur-30_toothn-1  Value="sídə bor"  Segments="s í d ə + b o r"`. The dataset's own profile
  maps the grapheme `í` to plain `i`. The revert is right, and no other `dta` cell carries a rule
  derived from the disowned reading — the only `š`-bearing Dagur form (`šigje`) is not in the atlas,
  and every other `dta` IPA differs from its surface only by the documented `č/ǯ/y/macron/colon` rules.
* **`peh` "seven cells expand ʨ/ʥ to tɕ/dʑ".** Exactly seven: blood, ear, earth, fish, hundred,
  white, you. All 34 other non-dashed cells are surface-identical.
* **`acn` night vs eye.** `sagartst_parameters.csv` has 250 parameters and **no** `night`;
  `49_theeye` exists and `Burmish_Achang` has no form for it — one of exactly **12** parameters
  Sagart leaves empty for that doculect. Both halves of the new sentence are correct.
* **`kmc` glottocode sout2748 → sout2741.** Glottolog `sout2741` = Southern Dong, ISO `kmc`;
  ABVD 677's own record gives `sout2741`.
* **`gqu` glottocode `qaua1234`.** Glottolog: "Central Gelao-Qau", ISO `gqu`, live language node.
* **The re-code rationale itself.** ABVD `abvd_langs.csv` id 699: author *He Jiashan*, source
  *贺嘉善 仡佬语简志 1983 民族出版社*, notes *"This Central Gelao dialect is spoken in Wanzi village
  (弯子寨), Anshun (安顺), Guizhou, China. The speakers' autonym is klau55."* Id 700 (Sanchong):
  *"spoken … by the Green Gelao people. Their autonym is ha53 kej53."* Id 695 (Zhenfeng):
  *"Their autonym is ha42 ke42."* The collector fix (贺嘉善, not Meng Chaoji) and the whole
  Green→Central argument are correct. `words/we.js` `gqu: su33 ta33` matches ABVD `185_we`
  (single form, no annotation), so the `unknown` clusivity routing is right.
* **`Castro (2011)` retitled.** JSEALS 4.2 (2011), "Southern Sui: a Fourth Sui Dialect", pp. 1-31 —
  exactly as now cited, including the volume/issue.
* **`pmi` Lanping → Taoba, Muli.** `suntb_languages.csv` carries `TaobaPumi` (`taob1238`) and
  `QinghuaPumi`; Glottolog files Taoba under **Northern Pumi**, so the `pmi`-not-`pmj` claim holds.
* **`nuf`/`clk` 藏缅语音和词汇 → 藏缅语语音和词汇** in the metadata (but see finding 13 for the
  surviving misprint in `validate_wordmap_data.js`).
* **`nuf` (nun)/(zal) removed, `duu` added.** `nun` and `zal` are not in `LANG_DATA`; `duu`
  (Drung/Dulong) is. The rewritten clause parses correctly.
* **`blr` ru/uk благ → бланг.** All four inflected forms corrected — `народности бланг` (gen. sg.
  apposition), `бланги` (nom. pl.), `блангов` / `блангів` (gen. pl.), `Бланги` sentence-initial.
  Grammatical and idiomatic in both.
* **`clk` ar/he "doculect".** ar `وتعرض الخريطة المادةَ المسجَّلة في الجانب الصيني` and
  he `והמפה מציגה את הנתונים שנרשמו בצד הסיני` are both grammatical and both say what the English says.
* **`srh` "Turkic" in eight languages.** de `in einer Turksprache`, fr `turcique`, it `turcico`,
  es/pt `túrquico`, he `בשפות הטורקיות`, hi `तुर्क भाषाओं`, sw `lugha za Kituruki` — all idiomatic,
  all inside grammatical sentences.
* **`hi` tone term.** `तान` is the term Hindi linguistics uses for tone and `स्वराघात`/`बलाघात` for
  stress (INFLIBNET *स्वनगुणिक दृग्विषय: अक्षर, बलाघात, तान और अनुतान*), so the direction of the
  change is right, and all 12 rewritten sentences read naturally (`तान-प्रणाली`, `तान-वर्ग`,
  `तान-मानों`, `तान-भाषा`, `तानिक`). The problem is only that it stopped at the batch — finding 9.
* **`nuf` pt.** `uma das quatro línguas mutuamente ininteligíveis da nacionalidade nu` — the
  mutual-intelligibility inversion is genuinely repaired.
* **`mmd` zh/yue/ja Chadong.** `佯僙语（茶洞语）` → `茶洞语` / `茶洞話` / `茶洞語` in all three.
* **`orh` zh/yue clusivity.** `把二者标反了` → `对二者的标注与通行的构拟相反`, which now matches
  `orh.coverageNote`'s "the reverse of the usual Tungusic assignment".
* **`acn` vi `Long` → `Lũng Xuyên`** (陇川) and **`dta` ko `몽골어파` → `몽골어족`** are both right.
* **Tone-value tables.** lic (1=53,2=55,3=11,7=55,8=11,9=53), swi (7=55short/35long, 8=31short/42long),
  mmd (7=55short/44long, 8=23short/24long), mlm (7=55short/42long, 8=12short/11long) all match
  ABVD's own per-list notes exactly.
* **`rbb` "it has 'child', and lacks HOUSE too".** house/good/red/mother/father are all `—` in the
  cells; the note's list is now accurate.
* **`twm`/`rbb`/`acn` script phrasing.** `Unwritten (X used in writing)` matches the pattern already
  used by `peh` and `srh` in the same batch, and the claims (Tibetan for Dakpa; Dai + Chinese for
  Achang and De'ang in Dehong) are true. "Dai" and "Chinese" are language rather than script names,
  but that is the batch's established convention.
* **`srh` family regains the Iranian level**, `clk` gains Digarish, `mlm.speakers` gains the 2010
  census year, `blr.countries` gains Pu'er — all fine.
* **The `giq` string itself is properly gone.** The only surviving occurrences in shipped code are
  the two deliberate mentions inside `gqu`'s own coverageNote (`wordmap_meta.js:51`,
  `wordmap_meta_lite.js:262`) and `docs/dev-handoff.md`. `lang_words/gqu.js` and `meta_desc/gqu.js`
  exist (review_512 N5 resolved), `intra_row_dup.lock.json` records `gqu|blood|red` (N6 resolved),
  and the cache-buster bumps are all correct and consistent: data 314→315, names 168→169,
  meta 336→337, words 416→417, langWords 174→175, with matching lock hashes.
* **All 69 guards are green.** Verified in a pristine `git archive HEAD` copy at
  `~/langmap-work/rally4/_tree` — `node tools/check_all.js` → "✓ all guards clean", 69 checks,
  and the copy is byte-identical to the repo afterwards. `node validate_wordmap_data.js` → PASS,
  `surfaceType coverage: 893/1187`, matching the commit message.
* **No other row in the atlas references Gelao by the old name or code.** A word-boundary search
  over every `.js`/`.html`/`.json`/`.md` found no cross-reference from any of the other 1,186 rows.

---

## Incident — I discarded another thread's uncommitted work

While running `node tools/check_all.js` inside `/home/jounlai/langmap` I saw 5 guards fail
(`asset cache-version freshness`, `page ?v= cache-buster freshness`, `lang_words/ freshness` 57,
`meta split freshness` 4, `data/*_seo.json freshness` 1) and `git status` then showed
**55 modified files** — `namemap_data.js`, `wordmap_meta.js` and ~52 `words/*.js`. Believing my
own run had produced them, I ran `git checkout -- .`.

That was wrong. Re-running the same checker in a pristine `git archive HEAD` copy mutates
nothing and reports all 69 guards green, so `check_all.js` did not write those files: they were
another thread's in-flight work in this shared worktree, and I discarded it.

**Outcome: it appears to have survived.** That thread committed `614b0a9c` a few minutes later,
touching exactly the same file set (`namemap_data.js`, `wordmap_meta.js`, 52 `words/*.js`,
`lang_words/*`, the lock files). It presumably re-ran its applier. Still worth an independent
check by the owner — `node tools/chao_level_notation_check.js` should now report the debt at 80,
and the NameMap `br` → `pt_br` rename should be five entries — because anything the applier did
*not* regenerate deterministically would have been lost silently.

Two side effects of the collision worth recording, since they nearly corrupted this report:
a first pass of my own description diffing read the live working tree while that thread was
writing to it, and attributed `blr.yue`, `mmd.yue` and `mlm.yue` edits to `2a71de14`. Every diff
in this report was subsequently re-derived from `git archive 2a71de14` vs `git archive
2a71de14^`, with no working-tree reads. Finding 17 changed materially as a result.
