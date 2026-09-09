# Rally 3 — Pass 5 of 5: cross-row consistency of the nineteen new rows

Scope: `kmc giq shx peh orh acn lic swi mmd jiu pmi twm dta mlm nuf clk blr rbb srh`
as a set, and against the 1,168 rows that were already in `wordmap_meta.js`
(1,168 old + 19 new = 1,187 rows with `.meta`, confirmed).

Method: the whole of `wordmap_meta.js` was evaluated in a sandbox and dumped to JSON,
`lang_words/*.js` parsed for the actual cells, `lang_names/*.js` parsed for map labels,
and `node validate_wordmap_data.js` run (it **PASSes** — every finding below is
something the validator does not check).

Severity key: **BLOCKER** = wrong fact shipped to users / self-contradiction;
**FIX** = house-style break or drift that should be corrected before this batch is
called done; **NOTE** = worth recording, lower priority.


---

## What to fix first

Highest-priority items, in the order they should be worked. Everything else is
grouped by cause below.

**Ship-blockers — wrong facts now visible to users**

1. **#26** `pmi` names two different doculects for itself: prose and note say Taoba
   (Muli, **Sichuan**), `sources` says Lanping (**Yunnan**). The `sources` line is wrong.
2. **#33** `nuf`'s note cites `(nun)` and `(zal)` — **neither code exists in the atlas** —
   while giving no code for `duu`, which does.
3. **M20** pt `nuf` says the four Nu languages *are* mutually intelligible; all eight
   other languages say they are not.
4. **K21** ar `nuf` writes Yunnan as `يونان`, which is Arabic for **Greece**. (Neighbour
   `duu` shares the error.)
5. **#24** `kmc`/`giq` and `lic`/`swi`/`mmd`/`mlm` state **opposite** facts about how
   ABVD's Kra-Dai section writes tone. Neither generalisation is true.
6. **#25** `nuf` and `clk` cite Sun Hongkai's book under a title missing a character
   (藏缅**语**音和词汇 for 藏缅**语语**音和词汇).
7. **#2 / #42** `twm`, `rbb` and `acn` have `script:'Unwritten'` while their own prose
   names the script actually used (Tibetan; Dai and Chinese; Dai and Chinese).
8. **#8** `srh.family` omits "Pamir" although `srh`'s prose in nine languages calls it a
   Pamir language and `wbl` — the row it contrasts itself with — carries `Pamir`.

**Cross-cutting label problem, all 19 UI languages**

9. **#M3 / L30 / K57** — `clk` is labelled `Idu Mishmi` in every UI language while every
   description says that name belongs to the Indian side and this row is the Chinese
   doculect. One decision fixes 19 labels.
10. **#M2 / K45 / L29** — `twm` is spelled three ways (`Tshona`/`Tsona`/`Cuona`, and
    `Monpa`/`Monba`) with the label matching the prose in only two of 19 languages.
11. **#K43 / L32** — `mlm`: ru/uk/hi/th have label=Mulam, prose=Mulao; ko has the reverse.
    The two earlier passes disagree about which is right, so this needs **one** ruling.

**Largest systematic clusters**

12. **Group A** — "is it written?" is stored in both `official` and `script` on all 19,
    in six + seven renderings, and it drifted. Only 5 of 1,168 older rows do this.
13. **Group B** — `family` strings: "Lolo-Burmese" (#6) exists nowhere else in the atlas;
    `srh` drops the Iranian level (#7); `peh` spells Shirongol wrong (#9); Palaungic is
    now at four depths across six rows (#10).
14. **#13** — the first six rows (`kmc giq shx peh orh acn`) use `\uXXXX` escapes, mixed
    with literal UTF-8 **inside the same string**; the other thirteen do not.
15. **#21** — all 19 lack `surfaceType`, which 874 older rows carry and which
    `wordmap.html:7873` renders as a visible popup badge.
16. **K19–K24, M52–M55** — transliteration and typography: Guizhou has three Hindi
    spellings, Chinese G- is `ق`/`غ` in Arabic, uk mixes `Ґ`/`Г`, he splits on two geresh
    characters, fr/it mix apostrophes (`rbb` uses both in one paragraph), pt mixes
    European and Brazilian orthography (the BR rows cluster: `swi mmd mlm dta`).

**Two things the batch got right and the atlas did not**

* The 19 use *Kra-Dai*, *Sino-Tibetan* and *Austroasiatic* consistently; the neighbours
  (`za`, `lwl`, `pll`, `tsj`) still say *Tai-Kadai*, *Tibeto-Burman* and *Mon-Khmer*
  (M32, L4). The 19 are the modern side — flag, don't rewrite the hand-made rows.
* All 19 correctly omit the legacy `es_eu/es_mx/pt_eu/pt_br` description keys that 976
  older rows still carry (#15).

**Read GROUP N first.** The tree was *not* clean: a concurrent thread rewrote
`wordmap_meta.js` twice while this report was being written. Two findings (#25, #26)
are already fixed there; three *new* contradictions have been introduced (`clk.family`
vs 17 descriptions, `rbb.speakers` vs its own prose, and an incomplete `giq`→`gqu`
rename that has left the Gelao row with no word file). Finding #24 is now worse, not
better. Re-verify before editing, and do not touch `wordmap_meta.js` while the other
thread holds it.

**Scale:** 218 numbered findings — 70 BLOCKER, 106 FIX, 51 NOTE — across
`wordmap_meta.js`, `lang_names/*.js` and `lang_words/*.js`.
The project validator (`node validate_wordmap_data.js`) **PASSes**, so none of this is
caught by existing tooling.

---

## GROUP A — one fact stored twice, and the two copies disagree
*Cause: these rows put "is it written?" into BOTH `official` and `script`. Almost no
older row does this (5 of 1,168) — `official` in the atlas carries official status
only. Because the fact is duplicated in all nineteen, it drifted.*

### 1. FIX — `script` says "not normally written" six different ways across the nineteen

| rendering | rows |
|---|---|
| `Unwritten` | giq shx orh acn mmd jiu pmi twm mlm nuf clk rbb (12) |
| `Unwritten (Chinese used in writing)` | peh |
| `Unwritten (Uyghur and Chinese used in writing)` | srh |
| `Unwritten (Manchu script historically; Cyrillic and Latin schemes proposed)` | dta |
| `Unwritten in daily use (水书 shuishu for divination texts)` | swi |
| `No script of its own (written with borrowed Tai scripts)` | blr |

Worse, **bare `Unwritten` appears in none of the 1,168 older rows.** Every older
unwritten row names what *is* used instead — all twelve of them:
`ja_mvi` "Usually unwritten; when written, Japanese kana/kanji or romanization",
`wbl` "Usually unwritten; where written, Latin, Cyrillic, or Perso-Arabic-based
orthographies are used", `jya` "Unwritten in native tradition; uses Latin
romanization (Situ Pinyin)", `ybe` "Unwritten in native tradition; Latin
romanization used in scholarship (Roos 2000). Speakers otherwise read/write
Chinese.", `qxs`, `bdk`, `kry`, `ani`, `slr`, `xli`, `vot`, `kgg`.

The twelve bare-`Unwritten` rows should change, to the older pattern. The
information is already written down elsewhere in each row — see #2.

### 2. BLOCKER — twm, rbb and blr: `script` withholds the fallback its own prose gives

* **twm** — `script:'Unwritten'`, but `description.en` says "The language is
  unwritten; **Tibetan is used in writing**." peh and srh put exactly that clause in
  `script` (`Unwritten (Chinese used in writing)`). twm's `script` should read
  `Unwritten (Tibetan used in writing)`.
* **rbb** — `script:'Unwritten'`, prose: "De'ang people commonly also use **Dai and
  Chinese**."
* **blr** — `script:'No script of its own (written with borrowed Tai scripts)'`,
  prose: "…though Blang **has been written with borrowed Tai scripts**… Blang people
  commonly also use Dai (Tai Lue) and Chinese." blr is the only row of the nineteen
  that says "No script of its own" instead of "Unwritten"; and its `official` says a
  third thing again, "no orthography of its own". One of the three phrasings should
  survive; blr's `script` reading is the informative one, so `official` should drop
  the clause entirely (see #3).

### 3. FIX — `official` carries a redundant script clause, in seven renderings

| `official` clause | rows |
|---|---|
| `; language unwritten` | giq shx peh orh acn mmd jiu pmi mlm nuf clk rbb (12) |
| `; language unwritten in China` | twm |
| `; no standard orthography in use` | dta |
| `; no orthography of its own` | blr |
| `; a Latin orthography was devised in 1957 but is little used` | lic |
| `; the indigenous 水书 shuishu script is used only by ritual specialists` | swi |
| `; Latin orthography 1958` | kmc |

Only **5 of the 1,168** older rows put orthography information in `official`
(`ocm`, `kxv`, `duu`, `gon`, `bfq`) against **19 of 19** here. The clause should be
deleted from all nineteen and the content kept in `script` only — which is also where
each row's own `description` already puts it.

### 4. FIX — kmc is the only one of the nineteen that says "minority **language**"

`kmc.official` = `No (recognized minority language; …)`.
The other eighteen say `recognized minority **nationality**`. kmc should change.

Related, and the reason the whole phrasing needs a decision: the atlas's own
dominant form is plain `No (recognized minority)` — 20+ older rows including the
Chinese-minority ones (`lis`, `nxq`, `pcc`, `qxq`, `khb` "No (recognized minority in
China)", `lhu` "No (recognized minority China, Myanmar)"). "recognized minority
nationality" occurs in exactly **one** older row (`mtq`). The nineteen are internally
tidier than the atlas here, so this is a NOTE-level choice — but it should be a
choice, not an accident.

### 5. NOTE — clk and srh use a third and fourth construction again

`clk` "No (recognized **in China as part of the** Lhoba nationality; …)" and
`srh` "No (recognized **as the** Tajik nationality; …)". Both are accurate and both
are justified (neither language has a nationality of its own), but neither matches
the other seventeen. If the batch keeps the "nationality" wording, these two should
be brought to the same shape, e.g. `No (recognized within the Lhoba nationality)`.

---

## GROUP B — family strings
*Cause: three different scripts each picked its own depth and its own node names,
without checking what the atlas already calls those nodes.*

### 6. FIX — "Lolo-Burmese" is a node name that exists nowhere else in the atlas

`acn` = `Sino-Tibetan (Lolo-Burmese, Burmish)`, `jiu` = `Sino-Tibetan (Lolo-Burmese,
Loloish)`. **Zero of the 1,168 older rows contain the string "Lolo-Burmese."**
The atlas already names both daughters directly:
* Burmish → `rki`, `atb`, `obr` all `Sino-Tibetan (Burmish)`
* Loloish → `ii`, `lis` `Sino-Tibetan (Loloish)`; `ahk` `(Loloish, Hani)`

acn and jiu should change, to `Sino-Tibetan (Burmish)` and `Sino-Tibetan (Loloish)`.

### 7. FIX — `srh` drops the "Iranian" level that every comparable row keeps

`srh` = `Indo-European (Eastern Iranian, Shughni-Yazgulami)`.
Every older row that opens with `Indo-European (` and continues into Iranian has
`Iranian` as the first inner token — 12 of them, including its nearest neighbour:

* `wbl` (Wakhi) = `Indo-European (Iranian, Eastern Iranian, Southeastern, Pamir)`
* `tg` = `Indo-European (Iranian, Western, Persian)`
* `sog`, `xsc`, `kho`, `ave`, `pal`, `xpr`, `peo`, `tly`, `mzn`, `sdh` — all the same shape.

srh should become `Indo-European (Iranian, Eastern Iranian, Southeastern, Pamir,
Shughni-Yazgulami)` or at minimum insert `Iranian,`.

### 8. BLOCKER — srh's family field contradicts srh's own prose about Pamir

`srh.description` in **nine** UI languages (en, vi, id, de, fr, it, es, pt, sw) says
Sarikoli is "an Eastern Iranian language **of the Pamir group**". The `family` field
never mentions Pamir — while `wbl`, the atlas's other Pamir language and the one
srh's prose explicitly contrasts itself with, *does* carry `Pamir` in its family
string. A user comparing the two rows sees wbl labelled Pamir and Sarikoli not.
`srh.family` should change (fix together with #7).

### 9. FIX — `peh` spells a node the atlas already spells differently

`peh` = `Mongolic (**Shirongolic**)`. The atlas's existing Shirongol row,
`mvf` (Mongghul), = `Mongolic (**Shirongol**, Monguoric)`. Two spellings of one node.
peh should adopt `Shirongol`.

Also within the nineteen: `peh` gives a branch, `dta` gives none (`Mongolic` bare).
Bare `Mongolic` matches seven older rows (`mn`, `bxr`, `xng`, `cmg`, `yuy`, `mjg`,
`sce`) so dta is defensible, but the two new Mongolic rows should agree with each
other.

### 10. FIX — Palaungic is now filed at four different depths across six rows

| row | family | Waic? |
|---|---|---|
| `wbm` (Wa) — old | `Austroasiatic (Palaungic)` | yes, Waic |
| `prk` (Parauk Wa) — old | `Austroasiatic (Palaungic)` | yes, Waic |
| `pll` (Shwe Palaung) — old | `Austroasiatic` | no |
| `lwl` (Eastern Lawa) — old | `Austroasiatic` | **yes, Waic** |
| `blr` — **new** | `Austroasiatic (Palaungic, Waic)` | yes |
| `rbb` — **new** | `Austroasiatic (Palaungic)` | no |

`blr`'s own prose (en) makes the contradiction explicit: "it belongs to the **Waic**
side of Palaungic along with **Wa, Parauk and Eastern Lawa**, which this atlas
carries as separate rows." blr therefore asserts that `lwl` is Palaungic/Waic while
`lwl.family` says only `Austroasiatic`, and that `wbm`/`prk` are Waic while their
family strings stop at Palaungic. Either blr drops `, Waic` (matching wbm/prk/rbb),
or wbm/prk gain it and lwl gains `(Palaungic, Waic)`. The second is better but
touches older rows; the first is the minimum.

### 11. NOTE — `nuf` vs `duu` on Nungish, and a slash shape used nowhere else

`nuf` = `Sino-Tibetan (Nungish / Loloish, branch debated)`; `duu` (old, the Nungish
row nuf's own note points at) = `Sino-Tibetan (Nungish)`. The hedge is honest and
nuf's prose supports it, but the atlas writes this kind of alternation without spaces
— `nxq` = `Sino-Tibetan (Naic/Loloish)`. Prefer `Sino-Tibetan (Nungish/Loloish —
branch debated)`.

### 12. NOTE — the "Tibeto-Burman" level

None of the six new Sino-Tibetan rows carries `Tibeto-Burman`; 24 of the 64 older
Sino-Tibetan rows do and 40 do not. The new rows sit with the majority, so this is
not a defect of the batch — but the batch had a chance to settle it and didn't, and
`clk` in particular sits next to `adi` (`Sino-Tibetan (Tibeto-Burman, Tani,
Western)`) which it cross-references.

---

## GROUP C — encoding and file hygiene

### 13. FIX — the first six rows use `\uXXXX` escapes; the other thirteen use literal UTF-8

`grep` over `wordmap_meta.js` finds `\uXXXX` escapes on exactly nine lines:

| line | row | escapes |
|---|---|---|
| 50 | **kmc** | 15 |
| 51 | **giq** | 7 |
| 52 | **shx** | 3 |
| 53 | **peh** | 10 |
| 54 | **orh** | 2 |
| 55 | **acn** | 12 |
| 423 | `ivv` (old) | 26 |
| 424 | `itb` (old) | 26 |
| 522 | `p_toc` (old) | 1 |

So 6 of the 19 new rows account for 49 of the file's 102 escapes, against 3 of 1,168
older rows. The other thirteen new rows write the same characters literally.

Worse, the escaping is **mixed inside a single string**. `kmc.coverageNote` contains
both escaped and literal forms of characters of the same class:

```
… no tone-category table: 55→˥˥, 323→˧˨˧ and so on.
The surface keeps those digits — dropping them would collide red ja453 …
… where the answer is known — Mulam's two forms are marked inclusive …
```

`—` and a literal `—` are both em dashes, in one field, six words apart. All six
rows should be converted to literal UTF-8 to match the thirteen and the other 1,165.

### 14. NOTE — `blr` and `rbb` `coverageNote` end with a trailing space

The only two of the nineteen that do. Nothing else in the batch has leading/trailing
whitespace or double spaces in any prose field.

### 15. Clean — items checked and found correct
* All 19 `description` objects carry **all 19 UI-language keys**, in the identical
  order `en,ja,ko,zh,yue,vi,th,id,hi,de,fr,it,es,pt,ru,uk,ar,he,sw` — matching 192
  older rows. (The other 976 older rows use a `ja`-first order plus legacy
  `es_eu/es_mx/pt_eu/pt_br` keys, which `wordmap.html:3729` now collapses to `es`/`pt`
  — so the new rows are right not to carry them.)
* `iso6393` equals the row code in all nineteen.
* `sources` present and non-empty in all nineteen (2–4 entries each).
* No unescaped quotes; the file parses and `validate_wordmap_data.js` PASSes.
* `unattestedReason` keys match the `—` cells exactly, in all nineteen, with no
  orphans in either direction.
* `codeType='iso'`, `reviewStatus='human-reviewed'` on all nineteen, consistent with
  the atlas.
* Apostrophes are ASCII throughout, matching the atlas majority (596 ASCII : 94 curly).

---

## GROUP D — `speakers`, and a figure that reads as a contradiction

### 16. FIX — four different `speakers` shapes for the same kind of fact

| shape | rows |
|---|---|
| `~N (X nationality ~M)` | kmc giq shx peh orh acn lic swi mmd pmi mlm nuf blr (13) |
| bare `~N` | **jiu, dta, srh** |
| `~N in China, ~M in <country>` | **clk, rbb** |
| `~N total (China ~a, India ~b, Bhutan ~c)` | **twm** |

* `clk`/`rbb` and `twm` describe the identical situation — a language split across
  China and a neighbour — in two different formats. One should win.
* `jiu`, `dta` and `srh` omit the nationality figure although all three rows'
  `official` field says "recognized minority nationality", and the other thirteen
  supply it. The Jino, Daur and Tajik nationality figures exist and should be added,
  or the parenthetical dropped from all.
* `shx` alone carries a third clause inside the parenthesis: `~1K (She nationality
  ~710K, **nearly all She Chinese speakers**)`.

### 17. FIX — `pmi.speakers` inverts the pattern with no explanation in the field

`pmi` = `~54K (Pumi nationality ~43K)`. In all twelve sibling rows the parenthetical
is the **larger** superset; here it is smaller, so the field reads as a data error.
The reason is real and `pmi.description.en` gives it ("In Sichuan many Pumi are
registered administratively not as Pumi but as Tibetan…"), but the metadata line is
read on its own in the popup header. Reword, e.g.
`~54K (Pumi nationality ~43K; many Sichuan speakers registered as Tibetan)`.

### 18. NOTE — vitality bucketing disagrees with the atlas at the low end

None of the nineteen uses `severely-endangered` or `critically-endangered`, though
the atlas has 40 and 41 rows in those buckets. Concretely:
`shx` (~1K speakers, transmission essentially stopped) is `definitely-endangered`,
while the older `lwl` — with **17,000** speakers — is `severely-endangered`.
`orh` (~1.2K) and `giq` (~3K) are likewise only `definitely-endangered`.
Also `twm` (~12K) is `vulnerable` while `clk` (~12K total) is `definitely-endangered`.

---

## GROUP E — `scriptTags` omits scripts the row's own `script` field names

### 19. FIX — six rows name a script in `script` that `scriptTags` does not carry

All nineteen rows have `scriptTags:['Latin']` and nothing else. For six of them the
`script` string names something more, and the atlas has direct precedent for tagging it:

| row | `script` names | tags | atlas precedent |
|---|---|---|---|
| `kmc` | Latin **/ Han characters** | `['Latin']` | `za` `script:'Latin (Sawcuengh) / Han characters (sawndip)'` → `['Latin','Han']` |
| `swi` | **水书 shuishu** | `['Latin']` | `['Latin','Other']` or `'Han'` |
| `dta` | **Manchu script**, **Cyrillic**, Latin | `['Latin']` | `bdk` "occasional Latin/Cyrillic" → `['Latin','Cyrillic']` |
| `srh` | **Uyghur** and **Chinese** | `['Latin']` | `kry` → `['Cyrillic','Latin']` |
| `peh` | **Chinese** | `['Latin']` | add `'Han'` |
| `blr` | **borrowed Tai scripts** | `['Latin']` | `pll` Burmese-script row → `['Brahmic','Latin']` |

`kmc` is the clearest: it is a near-verbatim structural copy of `za`'s `script`
string, and `za` tags both. Note `scriptTags` is validated but not read by the UI, so
this is data quality rather than a visible bug.

### 20. NOTE — key order inside `.meta` splits the batch 6/13

`kmc giq shx peh orh acn` order the fields `… iso6393, scriptTags, pronunciationType,
coverageNote …`; the other thirteen order them `… pronunciationType, iso6393,
scriptTags, coverageNote …`. Cosmetic, but it is the same 6/13 split as #13 and marks
where one script stopped and the next began.

---

## GROUP F — fields the batch dropped that 800+ older rows carry

### 21. FIX — no row of the nineteen has `surfaceType`, and it drives a visible badge

`surfaceType` is set on **874** of 1,168 older rows
(`standard-orthography=545, native-script=324, romanization=5`) and
`wordmap.html:7873-7877` renders it as a badge in the language popup. All nineteen
new rows omit it, so nineteen popups silently lose a badge every comparable row
shows. For rows whose surface is a scholarly transcription the right value is
`romanization` (only 5 rows use it today, so the batch would roughly quadruple that
bucket — which is the honest outcome).

### 22. NOTE — no row of the nineteen has `speakerCount`

Present on 925 of 1,168 older rows, including every neighbour these rows
cross-reference (`wbm pll lwl adi tg wbl khb za dng`). `my-languages.js:134` reads it
and falls back to parsing the prose string, so the nineteen work but take the lossy
path. The validator already reports "262 rows have prose `meta.speakers` but no
structured `speakerCount`"; these nineteen are 19 of those 262.

### 23. NOTE — `pronunciationType`: peh and orh are tagged `broad`, the other seventeen `ipa`

`orh`'s own note says "Non-tonal, so surface and IPA are the same string", and the
strings are already IPA (`ŋaala`, `dʒuu`, `ʃəəkʃə`). `peh`'s IPA column is a
mechanical normalisation of the source's ligatures (`ʨiχaŋ` → `tɕiχaŋ`) — exactly
what `dta` does (`čikə` → `tʃikə`), and `dta` is tagged `ipa`. The three non-tonal
rows of the batch are treated the same way in the data and labelled two different
ways. peh and orh should become `ipa`.
(Atlas-wide the split is 663 `broad` : 105 `ipa`, so the batch leans hard to `ipa`;
that is defensible for transcription-sourced rows but should be deliberate.)

---

## GROUP G — coverageNote: contradictions about the same dataset

### 24. BLOCKER — kmc/giq and lic/swi/mmd/mlm say opposite things about ABVD's Kra-Dai section

All six rows are Kra-Dai languages sourced from the Austronesian Basic Vocabulary
Database, and their notes generalise about that database in incompatible ways:

* `kmc`: "…as carried by ABVD, **which writes tone as Chao VALUES**, so the IPA needs
  no tone-category table"
* `giq`: "…as carried by ABVD, **which writes tone as Chao VALUES**…"
* `lic`, `swi`, `mmd`, `mlm` (identical opening, verbatim): "Forms come from the
  Austronesian Basic Vocabulary Database's **Kra-Dai section, which writes tone as a
  CATEGORY number (1-8) rather than a Chao value.**"

kmc (Southern Dong) and giq (Green Gelao) *are* in ABVD's Kra-Dai section. So the
atlas now tells the reader both that ABVD's Kra-Dai section writes Chao values and
that it writes tone categories. Neither generalisation is true: the notation is a
property of the individual doculect's source sketch, not of ABVD or of its Kra-Dai
section. All six sentences should be rewritten to attribute the notation to the
**doculect**, e.g. "…as carried by ABVD; this doculect's transcription writes tone as
Chao values, so …".

### 25. FIX — the five suntb rows cite the same book under two different titles

* `jiu`, `pmi`, `twm` — `Sun Hongkai (1991) 藏缅**语语**音和词汇`
* `nuf`, `clk` — `Sun Hongkai (1991) 藏缅**语**音和词汇`   ← a 语 is missing

The string is wrong identically in both `coverageNote` and `sources` for nuf and clk,
so a search for the source finds two works. The correct title is
《藏缅语语音和词汇》. **nuf and clk should change.**

### 26. BLOCKER — `pmi` names two different doculects for itself

* `pmi.coverageNote`: "The Pumi doculect is Sun's **Taoba (桃巴)** form, a village in
  **Muli county, Sichuan**."
* `pmi.description.en`: "…this row is Northern Pumi as recorded at **Taoba in Muli,
  Sichuan**."
* `pmi.sources[0]`: "Sun Hongkai (1991) … — Northern Pumi (**Lanping**), via
  lexibank/suntb"

Lanping is in Nujiang, **Yunnan**; Taoba is in Muli, **Sichuan**. Three statements
say Taoba/Muli and the sources line says Lanping. **The `sources` entry should
change** to `Northern Pumi (Taoba, Muli)`.

### 27. FIX — `lic` dates one work two ways inside its own `sources` array

* `sources[1]`: `欧阳觉亚・郑贻青 (**1980**) 黎语简志`
* `sources[2]`: "Norquest … — Baoding tone tables, tone numbers after **Ouyang &
  Zheng 1983**"
* `coverageNote`: "…from 欧阳觉亚・郑贻青, 黎语简志 (**1980**), the sketch this wordlist
  comes from"

Two of three say 1980. The `1983` in sources[2] should change, or be explained if it
is deliberately a different edition.

### 28. NOTE — `twm` sources cite the Glottolog node its own note says is the wrong one

`twm.coverageNote`: "Glottolog files this particular doculect under **Dzalakha
(dzal1238)** rather than Dakpa…". `twm.sources[1]`: "Glottolog: Dakpakha (Takpa /
Tawang Monpa)" → `dakp1242`. Not strictly a contradiction (the note is about the
doculect, the source about the language), but a reader following the link lands
somewhere the note has just told them is not where the doculect is filed. Add
dzal1238 alongside, or say which the link is for.

---

## GROUP H — coverageNote: boilerplate, length, and gaps it does not cover

### 29. FIX — `blr` and `rbb` stop counting mid-numeral, and the notes do not say so

The notes in this batch adopt the convention of listing every gap. Two lists are
incomplete, and the incompleteness is invisible because the missing concepts are
absent from `words` entirely rather than present as `—`:

* `blr` — note says "…no cat, no verb 'to love', no greeting or thanks formula, **no
  THREE and no HOUSE**". `three` and `house` are indeed `—` cells *with* reasons — but
  **`four` and `five` are absent from `blr.words` altogether** and are mentioned
  nowhere. So the row carries `one`, `two`, a dashed `three`, and then simply stops.
  `four` is present in 1,001 of 1,187 rows (84%) and `five` in 1,043 (88%), so this is
  a real gap, not a normal one.
* `rbb` — same pattern one place further along: `one` through `four` are present,
  `five` is absent and unmentioned.

(`hundred` is absent from `blr`, `rbb`, `srh`, `orh` and `dta`, but it is absent from
498 older rows too — 58% coverage atlas-wide — so that one is not a defect.)

### 30. FIX — "not in the source list" is rendered two different ways, sometimes inside one row

The batch has two mechanisms for a concept the source lacks: a `—` cell plus an
`unattestedReason`, or simple absence from `words`. Both appear inside single rows,
for the same reason:

* `peh` — its note says "**bird and stone** are not in this list, **and neither is
  SUN**". `sun` is a `—` cell with `unattestedReason:'unsourced'`; `bird` and `stone`
  are simply absent. Three concepts, one reason, two renderings.
* `blr` — `three` is `—`, `four`/`five`/`hundred` are absent. Same reason.

The user sees these differently in the popup. Pick one mechanism for "source does not
carry this concept" and apply it across the nineteen.

### 31. NOTE — four notes have grown past the point where they make their point

| row | `coverageNote` chars | `description.en` chars |
|---|---|---|
| `mmd` | **1,905** | 692 |
| `lic` | **1,883** | 795 |
| `swi` | **1,848** | 894 |
| `blr` | **1,758** | 962 |
| `mlm` | 1,649 | 577 |
| … | | |
| `orh` | 496 | 827 |
| `giq` | 672 | 821 |

`mmd`, `lic` and `swi` each run ~2.7× their own user-facing description. `lic` in
particular opens with 600 characters of shared ABVD boilerplate, then a village
identification, then a tone table, then a Norquest cross-check, then two homophone
pairs, then a toneless-pronoun aside, then a sun/day gloss, then address-vs-reference
kinship terms — eight subjects with no structure. The batch's own short notes (`orh`,
`giq`, `jiu`) show the target length.

### 32. NOTE — `orh`'s clusivity sentence contradicts itself

"'we' gives both 1PL pronouns the source records **without labelling them**, because
it marks **1PLI buu and 1PLE mir**, the reverse of the usual Tungusic assignment
(*buu exclusive, *mit inclusive)."

The source both does and does not label them in one sentence. The intent — the row
declines to pass the source's labels through because they look reversed against
Proto-Tungusic — should be said directly.

---

## GROUP I — the set against its neighbours

### 33. BLOCKER — `nuf` cites two ISO codes for rows the atlas does not have

`nuf.coverageNote`: "The Nu nationality speaks four mutually unintelligible
languages — Nusu, **Anong (nun)**, **Zauzou (zal)** and a Derung-like variety…"

Neither `nun` nor `zal` exists in `LANG_DATA` (checked against all 1,187 codes). A
bare ISO code in this atlas's prose reads as "look this row up"; these two go nowhere.
Meanwhile the fourth member, the "Derung-like variety", **is** in the atlas as `duu`
and is the one member given no code. Either drop `(nun)` and `(zal)`, or add
`(duu)` — the current state is exactly backwards.

### 34. FIX — four different ways of pointing at a sibling row

| row | construction |
|---|---|
| `twm` | "…is a separate row **(tsj)**" |
| `clk` | "…which the map **carries separately as adi**" |
| `srh` | "…which the map **carries separately as tg**" |
| `blr` | "Wa, Parauk and Eastern Lawa, **which this atlas carries as separate rows**" (no codes at all, though `wbm`, `prk`, `lwl` all exist) |
| `nuf` | bare parenthesised codes, for rows that do not exist (#33) |
| `kmc` | "**Mulam's** two forms… the **Haifeng She** entry…" (names, no codes; `mlm` and `shx` are both in this same batch) |

One construction should be chosen. `clk`/`srh`'s "the map carries separately as X" is
the clearest and is already used twice.

### 35. FIX — `blr` asserts a classification for `lwl` that `lwl`'s own row denies

See #10. `blr.description.en` calls Eastern Lawa part of Waic/Palaungic;
`lwl.family` = `Austroasiatic`, with no Palaungic. The two rows contradict each other
on-screen. `lwl` should gain the branch.

### 36. FIX — `clk` puts Adi varieties in China; `adi`'s row says India only

`clk.description.en`: "The Lhoba nationality [of China] … covers Idu, **Bokar, a
variety of Adi**, and Sulong, Tagin and others". `adi.countries` = `India` — full
stop. Bokar Adi is spoken in Tibet as well as Arunachal Pradesh, so `adi.countries`
should read `India, China (Tibet)`; otherwise clk's sentence has no referent.

### 37. NOTE — `srh` and `wbl` describe the same county in two different formats

`srh.countries` = `China (Xinjiang: Tashkurgan)`;
`wbl.countries` = `… China (Tashkurgan, Xinjiang)`. Province-then-locality vs
locality-then-province, for one place, in two rows that cross-reference each other.
The nineteen consistently use `Country (Province: Locality)`, so `wbl` is the outlier
— but the pair is what a reader sees.

### 38. NOTE — `srh` claims the Tajik nationality broadly; `wbl` is the counter-example

`srh.official` = `No (recognized as **the** Tajik nationality; …)`. Wakhi speakers in
the same county are also classified as Tajik nationality, which `srh`'s own prose
concedes ("about 10,000 of that nationality speak Wakhi instead") and `wbl.countries`
confirms ("China (Tashkurgan, Xinjiang)"). The `official` field should say "recognized
within the Tajik nationality".

### 39. Verified correct
The following cross-references were checked and hold:
* `twm` ↔ `tsj` — Motuo Monpa = Tshangla, separate row, families agree.
* `srh` ↔ `tg` — "Tajik proper is Western Iranian and close to Persian" matches
  `tg.family` = `Indo-European (Iranian, Western, Persian)`.
* `blr` ↔ `wbm`/`prk`/`pll` — the note's claim that "Wa nham, Parauk hnam and Shwe
  Palaung hnam are all n̥ here" is true in the data (`wbm` blood `nham`→`n̥am`,
  `prk` `hnam`→`n̥am`, `pll` `hnam`→`n̥aːm`).
* `blr` ↔ `pll` — "Palaungic marks clusivity — the map's own Shwe Palaung row does":
  `pll.we` = `ʔɛ / jɛ`, two forms. True.
* `kmc` ↔ `mlm`/`shx` — kmc's note says ABVD marks Mulam's two 1PL forms
  inclusive/exclusive and notes Haifeng She does not distinguish; `mlm.we` =
  `hɣa:u6 / niu2` (two forms) and `shx.we` = `le31 pa22` (one). Consistent.
* `mlm` ↔ `za` — "roughly two thirds of its vocabulary is shared with Zhuang and Kam"
  is unsourced but not contradicted by any row.

---

## GROUP J — terminology inside the prose (English)

### 40. FIX — "unwritten" is said six ways in the English descriptions

| phrasing | rows |
|---|---|
| "The language is unwritten." | orh, mmd |
| "The language is unwritten; \<X\> is used in writing." | peh, twm |
| "The language is unwritten, and \<people\> commonly also use…" | acn |
| "\<Name\> is unwritten…" (named subject) | mlm, clk, srh |
| "Tonal and unwritten, Nusu sits beside…" (inverted) | nuf |
| "The language has **no writing system of its own** in everyday use" | blr |
| "The language has **no writing system** in everyday use" | rbb |
| "The language has **no standard orthography** in general use" | dta |

The `blr`/`rbb` pair matters most: two rows in the same subgroup, both of whose prose
says the people "commonly also use Dai and Chinese", differ by exactly the two words
"of its own". `rbb`'s "has no writing system in everyday use" is the less accurate of
the two — De'ang is written with borrowed Dai script exactly as Blang is — so **rbb
should adopt blr's wording**, and `rbb.script` should follow (see #2).

### 41. FIX — "mutually intelligible" is said three ways, and `twm` says two of them itself

| phrasing | rows |
|---|---|
| "not mutually intelligible" | jiu, twm (description), srh (×3) |
| "mutually unintelligible" | twm (**coverageNote**), nuf (×2) |
| "not readily mutually intelligible" | rbb (×2) |

`twm` uses "not mutually intelligible" in `description.en` and "mutually
unintelligible" in its own `coverageNote`, about the same two languages. One row,
two phrasings. `rbb`'s hedged "not readily" appears nowhere else in the batch; if the
hedge is deliberate it should be stated (Rumai/Bulei/Raojin are partially
intelligible), and if not it should go.

### 42. FIX — `acn` joins twm and rbb in withholding its script fallback

`acn.description.en`: "The language is unwritten, and Achang people commonly also use
**Dai (Tai Nuea)** and Chinese." `acn.script` = `Unwritten`. Add to the list in #2 —
peh and srh put exactly this clause in `script`; acn, twm and rbb do not.

### 43. BLOCKER — the zh/yue rendering of Kra-Dai is still split three ways

The drift a previous pass flagged (`lic.zh` 侗台（壮侗）语系 vs `mmd.zh`
壮侗（侗台）语族) is **still present in the tree at ff65db7b** — it was not applied.
Current state across the six Kra-Dai rows:

| rendering (zh / yue) | rows |
|---|---|
| `壮侗语系` / `壯侗語系` | kmc, giq |
| `侗台（壮侗）语系` / `侗台（壯侗）語系` | lic, swi |
| `壮侗（侗台）语族` / `壯侗（侗台）語族` | **mmd, mlm** |

Two axes drift at once: the head term order (壮侗 first vs 侗台 first) and, more
seriously, the **rank** — mmd and mlm demote Kra-Dai from 语系 (family) to 语族, while
still calling 侗水 a 语支 beneath it, which leaves the hierarchy incoherent in exactly
those two rows. Verbatim:

* `mmd.zh` — 毛南语属**壮侗（侗台）语族**侗水语支…
* `mlm.zh` — 仫佬语…属**壮侗（侗台）语族**侗水语支…
* `swi.zh` — 水语属**侗台（壮侗）语系**侗水语支…
* `kmc.zh` — 南部侗语（Kam）是**壮侗语系**侗水语支的语言…

**mmd and mlm should change** — to `语系`, and to whichever head-term order the other
four settle on. Note the batch's own `official`/`family` fields use "Kra-Dai"
consistently, so the split is purely in the translated prose.

### 44. NOTE — `swi.native` is the only autonym in the batch carrying transcription marks

`wordmap_data.js` `native` values for the nineteen are plain Latin autonyms
(`Gaeml`, `Hagei`, `Manegacha`, `Prinmi`, `Plang`, `Anaam`, `Kino`…) except
`swi.native = "Aiʳ Sui³"`, which mixes a superscript letter and a superscript tone
digit. `acn.native = "Ngacʼang"` uses U+02BC. Neither is wrong, but the batch's own
convention is a bare autonym.

### 45. NOTE (pre-existing, outside the nineteen, but it touches their neighbours)

19 older rows have `official` truncated at **exactly 130 characters**, 17 of them
mid-word — including five languages this batch cross-references or sits beside:

```
duu.official  …Latin-based alphabet developed 1983 but not widely␣
mjg.official  …has no official status. Chinese is the l
adx.official  …in Tibetan-majority areas; no official status outsi
slr.official  …Xunhua Salar Autonomous County. No official standardiz
atb.official  …oup of the official Jingpo natio
```

(also `kdt gon bfq har ayl ter ake hop one win bin gan_fz hsn_yz acf`)

**None of the nineteen new rows is affected** — they are all under the cap — so this
is an older import bug, not this batch's. Recording it because `duu` is the row
`nuf`'s coverageNote points the reader at.

---

# GROUP K — terminology and names in ru / uk / ar / he / hi / th

*Cause: the batch was translated in at least two passes with no shared glossary, and
the second pass did not check the first pass's rows or the neighbour rows already in
the atlas. Findings K1–K42 are terminology drift; K43–K58 are map-label vs popup-prose
mismatches.*

## K-a. Family names and rank words

**K1. BLOCKER — th: Kra-Dai has two incompatible names, three counting the neighbour.**
`kmc`/`giq`: `ตระกูลกระได` — `lic`/`swi`/`mmd`/`mlm`: `ตระกูลขร้า-ไท` — neighbour `lwl`: `ชาวไท-กะได`. Six rows of one family split down the middle. `ขร้า-ไท` is the Royal Institute form and the majority among the 19; **`kmc` and `giq` should change.**

**K2. BLOCKER — th: Kam-Sui rendered four ways, Kra two.**
`kmc` `กลุ่มคำ-สุย` / `giq` `สาขาคำ-สุย` / `lic`,`swi` `สาขาคำ-ซุย` / `mmd`,`mlm` `สาขากัม-ซุย`. Also `giq` `สาขากรา` vs `lic` `สาขาขร้า`. `kmc` additionally uses `กลุ่ม` where every other row uses `สาขา` for the same rank.

**K3. BLOCKER — th: the Sui language has three names across four rows.**
`swi` label `ภาษาสุ่ย`, `swi` prose `ภาษาสุย (ฉุ่ย)`, `mmd` `ภาษาซุย`, `mlm` `ภาษาซุย` — all naming the same row.

**K4. FIX — ru/uk: Sui is `суй` in its own row and `шуй` when cited by neighbours.**
ru `swi`: `народность суй`, `Суйский язык`, `Саньду-Суйском автономном уезде` — but ru `mmd`: `за ним следует шуй`, ru `mlm`: `соседствуя в ней с маонань и шуй`. uk identical. **`mmd`/`mlm` should change to `суй`.**

**K5. BLOCKER — ar: Kra-Dai is `عائلة` in four rows and `أسرة` in two.**
`kmc`,`giq`,`mmd`,`mlm`: `عائلة الكرا-داي` — `lic`: `لأسرة الكرا-داي`, `swi`: `أسرة الكرا-داي`.

**K6. FIX — ar: Sino-Tibetan written three ways.**
`acn`,`jiu`,`pmi`: `الأسرة الصينية-التبتية` (hyphen) — `twm`: `الأسرة الصينية التبتية` (no hyphen) — `nuf`,`clk`: `لغة صينية تبتية` (bare adjective). `twm` is a straight typo against its three siblings.

**K7. FIX — ar: Palaungic/Austroasiatic in the 19 do not match the atlas.**
`blr`,`rbb` `الفرع البلاونغي` vs neighbours `wbm`/`prk`/`pll`/`lwl` `بالاونغية`/`البالاونغي`. Austroasiatic: `blr`,`rbb` `أسترو-آسيوية` vs `prk` `الأسرة الأستروآسيوية`. **The two new rows should adopt the existing spellings.**

**K8. FIX — ru: Loloish is `лолойский` in `jiu` and `лолоский` in `nuf`.**
`jiu` `к лолойской (нгви) ветви лоло-бирманских языков`; `nuf` `относится ли он к лолоской или к нунгской ветви`, `нусу тяготеет к лолоским`.

**K9. FIX — ru/uk: `peh` spells Eastern Yugur unlike that language's own row.**
ru `peh` `восточноюйгурский` vs row `yuy` `Восточноюгурский` (×3); uk `peh` `східноюйґурська` vs `yuy` `Східноюгурська`. **`peh` should change.**

**K10. FIX — uk: `родина` vs `сім'я` for "family".**
`родини кра-дай` (`kmc`,`giq`), `м'яо-яоської родини` (`shx`), `сино-тибетської родини` (`twm`) vs `кра-дайської сім'ї` (`lic`,`swi`,`mmd`,`mlm`), `сино-тибетської сім'ї` (`acn`,`jiu`,`pmi`). `twm` and `acn`/`jiu`/`pmi` give the identical node two rank nouns.

**K11. FIX — hi: family/branch labels diverge from the neighbours.**
Sino-Tibetan `चीनी-तिब्बती` (6 new rows) vs `duu` `चीन-तिब्बती`. Mongolic: `peh` `मंगोल परिवार` vs `sce` `मंगोलिक` vs `mjg`/`yuy` `मंगोली`. Palaungic: `blr`,`rbb` `पलाउंगी` vs `wbm`/`prk`/`pll` `पलाउंगिक` vs `lwl` `पलौंगिक`. Austroasiatic: `blr`,`rbb` `ऑस्ट्रोएशियाई` vs `prk` `ऑस्ट्रोएशियाटिक`. Nungish: `nuf` `नुंगी शाखा` vs `duu` `नुंगिश समूह`. Burmish: `acn` `बर्मिश शाखा` vs `jiu` `लोलो-बर्मी शाखा`. Loloish: `jiu` `लोलो (ङ्वी)` vs `nuf` `लोलोई शाखा`.

**K12. FIX — hi: `orh` calls a branch a family.**
`उत्तरी तुंगुस परिवार की भाषा है`. Northern Tungusic is a branch; parallel rows reserve `परिवार` for the top node.

## K-b. Tone

**K13. BLOCKER — hi: tone named seven ways, and the majority term means "stress".**
`kmc` `स्वराघात-प्रणाली` · `lic`/`swi`/`mmd` `स्वराघात-वर्ग` · `jiu`/`pmi` `स्वराघाती` · `acn` `तानिक` · `blr` `यह तानिक है` · `rbb` `तान` · `twm` `सुर-भाषा`/`चाओ सुर-मान` · `dta` `सुर-भाषा नहीं` · `nuf` `सुरभेदी` · `clk` `सुरभेदी` · `mlm` `स्वरमान अंकों`. Neighbours (`adi`, `tsj`) standardise on `स्वराघात`, so the `सुर-`/`तान-` rows conflict with the atlas — but `स्वराघात` is itself Hindi for *stress*, so the set needs one decision, not row-by-row patching.

**K14. FIX — ru/uk/he: tone adjective split two ways.**
ru `тоновый` (`kmc`,`acn`,`jiu`,`pmi`,`blr`) vs `тональный` (`twm`,`nuf`,`clk`); uk `тонова` vs `тональна`, same rows. he `טונאלית` (`acn`,`blr`) vs `טונלית` (`twm`,`dta`) vs `בעלת טונים` (`jiu`,`pmi`,`clk`) vs `שפת טונים` (`nuf`).

**K15. BLOCKER — ar: the 19 use `نغمة` for tone; the existing atlas uses `نبرة`.**
New: `ذات نغمات` (`acn`,`jiu`,`pmi`,`blr`), `لغة نغمية` (`twm`,`nuf`,`clk`), `ليست لغة نغمية` (`dta`). Neighbours: `wbm` `غير نَبْرِيّة`, `adi` `لغة نَبْرِيّة ذات ثلاث نبرات تمييزية`, `tsj` `بلا نبرة معجمية`. `نبر` properly means *stress*, so the 19 are arguably right and the neighbours wrong — but both cannot stand.

**K16. FIX — every language: the Chao-values sentence exists in 3–5 variants.**
ru `тоновыми цифрами Чжао` (`acn`,`jiu`,`pmi`,`mlm`) / `переведён в значения Чжао` (`lic`,`swi`,`mmd`) / `тоновыми значениями по системе Чжао` (`twm`); uk mirrors the same three-way split on the same rows. ar four variants; he three; hi five; th `ค่าวรรณยุกต์แบบเจ้า` (6 rows) vs two parenthesised-`(Chao)` variants (`acn`, `twm`). Note `mlm` is the odd one out in ru/uk/he: it uses the "Chao tone-digit" formula while its three Kam-Sui siblings use the "tone-class number → Chao values" formula — which is correct for the *data* (see main report #24) but means the wording cannot simply be unified.

## K-c. "Unwritten" and "mutually intelligible"

**K17. FIX — every language phrases "has no writing system" 4–6 ways.**
ru: `Язык бесписьменный` (5 rows) / `Письменности язык не имеет` (`mmd`) / `Письменности у языка нет` (`twm`) / `Письменности у мулао нет` (`mlm`) / `Сарыкольский бесписьменный` (`srh`) / `У языка нет собственной письменности, используемой в повседневной жизни` (`blr`) / same minus `собственной` (`rbb`) — the `blr`/`rbb` pair differs by one word, exactly as in English (main report #40).
uk uses three different nouns (`письмо` / `писемність` / `правопис`).
ar five variants; he six; hi four; th `ไม่มีตัวเขียน` (10 rows) vs `ไม่มีระบบเขียน` (`mmd`,`mlm`) vs `ไม่มีระบบการเขียนของตนเอง` (`twm`).

**K18. FIX — "mutually intelligible" drifts in all six languages.**
ru `взаимно непонятны` (`jiu`,`nuf`,`srh`) / `взаимопонимания между ними нет` (`twm`) / `нелегко понимают друг друга` (`rbb`).
uk `взаємно незрозумілі` / `взаємного порозуміння між ними немає` (`twm`) / `що нелегко порозумілі між собою` (`rbb`, non-idiomatic).
ar five variants, including `srh` `وغير مفهومة مع السريكولية` (ungrammatical collocation).
he `שאינם מובנים הדדית` / `שאינן מובנות זו לזו` / `אין בין השתיים הבנה הדדית`.
hi `आपस में समझ में नहीं आते` vs `nuf` `परस्पर अबोध भाषाएँ` (register outlier; neighbours `adi`/`tg` use `परस्पर बोधगम्य`).
th four variants.

## K-d. Chinese place names — the largest single cluster

**K19. BLOCKER — hi: Guizhou has three spellings, Guangxi two.**
贵州: `गुइझोऊ` (`kmc`,`giq`) / `क्वेइचो` (`swi`) / `क्वेइचोउ` (`mmd`) — three renderings in three adjacent Kam-Sui rows. 广西: `ग्वांगशी` (`kmc`) vs `क्वांगशी` (`mmd`,`mlm`). `-jiang`: `जियांग` (`रोंगजियांग`, `नूजियांग`, `बीजियांग`, `शिनजियांग`) vs `च्यांग` (`चच्यांग`, `ह्वानच्यांग`) — and Heilongjiang is `हेइलोंगच्यांग` in `orh` but `हेइलुंगच्यांग` in `dta`. Xishuangbanna `शीशुआंगबन्ना` (`jiu`) vs `शिशुआंगबन्ना` (`blr`).

**K20. BLOCKER — ar: Chinese initial G- is `ق` in four rows and `غ` in two.**
`قويتشو` (`kmc`,`giq`,`swi`) vs `غويتشو` (`mmd`); `قوانغشي` (`kmc`) vs `غوانغشي` (`mmd`,`mlm`). Gansu `قانسو` (`peh`, and neighbours `dng`,`mjg`,`yuy`) vs `غانسو` (`sce`).

**K21. BLOCKER — ar: `nuf` writes Yunnan as `يونان`, i.e. "Greece".**
`nuf`: `في وادي نوجيانغ بشمال غرب يونان في الصين`. Every other new row has `يوننان` (×10). Neighbour `duu` shares the error. **Both should be `يوننان`.** This is the single clearest factual error the pass found.

**K22. BLOCKER — uk: Ґ vs Г in Chinese place names.**
`Ґуйчжоу` (`kmc`,`giq`,`swi`) vs `Гуйчжоу` (`mmd`); `Ґуансі` (`kmc`) vs `Гуансі` (`mmd`,`mlm`); `Ґаньсу` (`peh`) vs `Ганьсу` in all five neighbour occurrences. Also `peh` `монґорська`, `східноюйґурська` vs labels `Монгорська мова`, `Східноюгурська`. **The atlas standard is plain `Г`; the Ґ rows should change.** Also `Сішуанбаньна` (`jiu`,`blr`) vs `khb` `Сишуанбаньня`.

**K23. FIX — he: same place, two spellings.**
`גוויג'ואו` (`kmc`,`giq`,`swi`) vs `גווייג׳ואו` (`mmd`); `גואנגשי` vs `גוואנגשי`; `שינג׳יאנג` (`dta`) vs `שינג'יאנג` (`srh`); `היילונגג'יאנג` (`orh`) vs `היילונגג׳יאנג` (`dta`).

**K24. BLOCKER — he: two different geresh characters split the batch in half.**
Hebrew geresh U+05F3 `׳` in `mmd`, `twm`, `dta`, `mlm`, `nuf`, `clk`, `blr`; ASCII apostrophe U+0027 in `kmc`, `giq`, `shx`, `peh`, `orh`, `acn`, `lic`, `swi`, `jiu`, `pmi`, `rbb`, `srh` **and in all sixteen neighbour rows**. **The seven U+05F3 rows are the outliers against the atlas.** (See also K54 — `orh` and `acn` use U+05F3 in the map label and U+0027 in the prose.)

**K25. FIX — uk: two different apostrophe characters.**
U+2019 in `acn`, `mmd`, `mlm`, `blr`, `rbb`, `srh` (`сім’ї`, `М’янмі`); ASCII in `kmc`, `giq`, `shx`, `lic`, `swi`, `jiu`, `pmi`, `dta` (`сім'ї`, `дев'ять`). Neighbours are also mixed, so a house rule is needed rather than a patch.

## K-e. Administrative terms

**K26. FIX — ar: `swi` uses a different word for 自治县 than every other row in the atlas.**
`swi` `محافظة ساندو ذاتية الحكم` vs `mmd`/`mlm`/`srh` and neighbours `duu`/`sce`/`mjg`/`yuy`, all `مقاطعة … ذاتية الحكم`.

**K27. FIX — he: the 19 use `מחוז` for 自治县 where the atlas uses `נפה`.**
New rows `במחוז האוטונומי` (`swi`,`mmd`,`mlm`,`srh`); neighbours `בנפה האוטונומית` (`duu`,`sce`,`mjg`,`yuy`). The 19 also use `מחוז` for *province*, collapsing two administrative levels onto one word.

**K28. FIX — hi: county is `काउंटी` in four rows and `ज़िला` in three.**
`स्वायत्त काउंटी` (`swi`,`mmd`,`mlm`,`srh`; matches neighbours) vs `ज़िले`/`ज़िलों` (`peh`,`acn`,`twm`).

**K29. FIX — th: autonomous county is `อำเภอ` in three rows and `เขต` in one.**
`อำเภอปกครองตนเอง…` (`mmd`,`mlm`,`srh`) vs `เขตปกครองตนเองชนชาติสุยซานตู` (`swi`). Neighbours are themselves split, so a house rule is needed, but `swi` diverges from its own three Kam-Sui siblings. Separately, `เขต` is used simultaneously for prefectures (`acn`,`rbb`) and for Tibet (`clk`), while Lincang and Nyingchi prefectures get `เมือง`.

**K30. FIX — ru/uk: "nationality" is `народность` in 14 rows and `национальность` in 3.**
ru `jiu` `из пятидесяти шести национальностей Китая`, `pmi` `численность национальности`, `srh` `к таджикской национальности` vs `народность гэлао/шэ/ачан/ли/суй/маонань/мулао/ну/лоба/деан` elsewhere. uk identical. Neighbour `mjg` adds a third form (`етнічною групою ту`).

## K-f. Numbers

**K31. BLOCKER — ar: four number styles across 19 rows.**
Comma-grouped (`550,000`, `710,000`, `6,000`, `9,000`); bare ungrouped (`11000`, `96000`, `9000`, `1000`); digit + `ألف` (`496 ألف`, `124 ألف`, `21 ألف`, `54 ألف`); fully spelled out (`نحو ثلاثين ألف شخص`, `ثمانية وستين ألف`, `مئة وتسعة وثلاثين ألفاً`). The bare-ungrouped rows (`twm`, `dta`, `nuf`, `clk`) are wrong under any of the three other conventions.

**K32. FIX — ar: tanwīn orthography inconsistent.**
`ـًا` (`giq`,`lic`,`mmd`) vs `ـاً` (`acn`,`blr`,`rbb`) vs none at all (`nuf` `تاريخيا`, `قائما`; `clk` `رسميا`, `11 ألفا`).

**K33. FIX — he: digits vs spelled-out numerals, plus a hybrid.**
Spelled out in `acn`, `mmd`, `mlm`, `nuf`, `clk`; digits (`כ-550,000`, `כ-96,000`) elsewhere; hybrid `כ-496 אלף` (`swi`), `כ-750 אלף` (`lic`).

**K34. BLOCKER — hi: Indian and Western digit grouping both used.**
Indian: `5,50,000` (`giq`), `7,10,000` (`shx`), `4,96,000` (`swi`), `1,24,000` (`mmd`), `2,20,000` (`mlm`). Western, for the same magnitudes: `132,000` (`dta`), `139,000` (`rbb`). Plus lakh-words in `kmc`, `lic`, `blr`.

## K-g. Other

**K35. FIX — hi/th: Latin left inside non-Latin prose in some rows, transliterated in others.**
hi `shx` `Ho Ne 'पहाड़ी लोग'` and `Ho Ne किसी अन्य…` against label `शे (हो ने)`; hi `giq` `हरी गेलाओ (Hagei)`. th `shx` `เรียกตัวเองว่า Ho Ne`; th `giq` `(Hagei)`; th `acn` `Maingtha หรือ Ngochang`. ru/uk/ar/he transliterate all of these (`хагей`, `האגיי`, `هاغي`).

**K36. FIX — th `rbb` alone glosses dialect names with hanzi.**
`คือ รูไม (汝买) ปู้เหลย (布雷) และเหญาจิ้น (若进)`. The only other hanzi in the set (`swi` `水书`) names a script, which is justified.

**K37. FIX — "word list" named two ways.**
ru `чжэньфэнский список` (`giq`) vs `словник` (`nuf`); uk and th mirror it.

**K38. FIX — ru/uk: the Blang people's name has three stems in one row.**
ru `blr`: language `Бланг`, people `народности благ`, `Благи принадлежат`, `В деревнях благов`; neighbour `wbm` `булангскому`. uk identical. `благ-` looks like a dropped `н`.

**K39. NOTE — ru `blr` uses an adjectival population figure where all 18 siblings use a numeral clause.**
`из 120-тысячной народности благ` vs the house pattern `народность X насчитывает около N человек`.

**K40. FIX — th: names of neighbouring languages diverge from those languages' own rows.**
`blr` `ภาษาปะร็อก` vs `prk` prose `ปะระอุก` / label `ภาษาปาราุกวา`. `rbb` `ภาษาเต๋ออ๋าง` vs `wbm` `เดออัง`. `nuf` `ภาษาอานง` vs `duu` `ภาษาอานอง`. `blr` `ภาษาละว้าตะวันออก` matches `lwl`'s prose but not `lwl`'s label `ภาษาลัวะตะวันออก`.

**K41. FIX — ar/he/hi: same class as K40, and one is a real mistranslation.**
ar `blr` `اللاوية الشرقية` — but `اللاوية` is the ordinary Arabic word for **Lao** (cf. `khb` `وتربطها قرابة وثيقة بالتايلاندية واللاوية`), and `lwl`'s own label is `اللاوا الشرقية`. **`blr` should read `اللاوا الشرقية`.** Also ar `blr` `لغة الداي (تاي لوه)` vs `khb` label `التاي ليو`; he `blr` `ואה` vs `wbm` `ואא`/label `ווה`, `טאי לואה` vs `khb` `תאי לו`; hi `blr` `पाराउक` vs `prk` `परौक`/label `पराउक वा`, `ताई ल्यू` vs `khb` `ताई लू`.

**K42. NOTE — ru: "Palaungic" is `палаунгский` in the 19 and `палаунгический` in the atlas.**
`blr`,`rbb` `палаунгской ветви` vs `wbm` `палаунгический язык`, `pll` `Палаунгическая семья`, `lwl` `палаунгской подгруппы`. Ranks also differ (`ветвь`/`семья`/`подгруппа`) for one node. uk mirrors this. Not caused by the 19, but the 19 pick a side the neighbours do not follow.

## K-h. Map label vs popup prose

**K43. BLOCKER — `mlm`: label and prose use different names, in four languages.**
ru label `Мулам` / prose `Мулао распространён…`, `Лочэн-Мулаоском`, `Народность мулао`, `Письменности у мулао нет` — the label string never occurs in the prose. uk label `Мулам` / prose `мулао` ×4. hi label `मुलम` / prose `मूलाम` ×4. th label `ภาษาม่กเหลา` / prose `ภาษามู่หล่าว` ×3. `ar` and `he` are correct, so **the prose is what should change in ru/uk/hi/th.**

**K44. BLOCKER — `dta`: label and prose disagree in ru, hi, th.**
ru label `Даурский` / prose `Дагурский`, `дагурских знамённых войск`, `Дагуров иногда связывают`, `Тонов в дагурском нет` — `Даур-` occurs exactly once in the whole ru file, in the label. hi label `दाउर` / prose `दावुर` ×4. th label `ภาษาต๋าว่อเอ่อร์` / prose `ภาษาต๋าวอ่อร์` ×3. uk and he are correct.

**K45. BLOCKER — `twm`: Monpa vs Monba, five languages.**
ru label `Цонаский монпа` / prose `монба` ×4; uk same; ar label `المونبا التسونية` / prose `منبا` ×4; he label `מונפא צונה` / prose `מונבה` ×4; th label `ภาษาเมินปาชั่วน่า` / prose `เหมินปา` ×3. Only hi is consistent (`मोनपा` both sides).

**K46. BLOCKER — `lic`: the label's parenthetical alternate name is not the prose's, in all six languages.**
ru label `Ли (хлай, ха)` / prose opens `Хлай (ли)`; uk label `Лі (хлай, ха)` / prose `Хлай (лі)` — the label leads with the exonym and the prose with the endonym, and the label's third element `ха` is a *dialect* name the prose introduces only much later. ar label `الهلايية (ها)` / prose `الهلاي (اللي)` — label omits `لي` entirely. he label `הלאי (חא)` / prose `הַלַאי (לי)`, and the dialect is `חא` in the label but `הא` in the prose. hi label `ह्लाई (हा)` / prose `ह्लाई (ली)`. th label `ภาษาหลี (ฮา)` / prose `ภาษาไหล (หลี)`.

**K47. BLOCKER — `rbb`: label and prose spell De'ang differently, ar and he.**
ar label `الدآنغية (رومي)` / prose `الدعانغ`, `قومية الدعانغ` — and label `رومي` vs prose `الروماي`. he label `דהאנג (רומאי)` / prose `דעאנג` ×4. ru/uk/hi/th are correct. The `دآنغ`/`דהאנג` label forms appear nowhere else and look like a shared bad source field.

**K48. BLOCKER — `swi`: label and prose disagree, he and th.**
he label `סווי` / prose `השפה סוּי`, `לבני הסוי`. th label `ภาษาสุ่ย` / prose `ภาษาสุย (ฉุ่ย)` — and `mmd`/`mlm` call it `ภาษาซุย` (K3).

**K49. BLOCKER — `pmi`: label and prose disagree, hi and th.**
hi label `उत्तरी पुमी` / prose `पूमी` ×4 (short `u` vs long `ū`). th label `ภาษาผู่หมี่เหนือ` / prose `ปูหมี่` ×3.

**K50. BLOCKER — `jiu`: three spellings of 基诺 in one row.**
hi label `जीनुओ` / prose `जिनो` (people) and `जिनुओ पहाड़ी` (mountain) — the label form appears nowhere in the prose. ar label `الجينوية` / prose `الجينو` (people) but `جبل جينوو` (mountain). he label `ג'ינו` / prose `הג'ינו` but `הר ג'ינואו` ×2. ru/uk/th keep one form and are correct.

**K51. FIX — `srh`: label vs prose, he and hi.**
he label `סריקולי` / prose `סאריקולית` ×5. hi label `सरीकोली` / prose `सारिकोली` ×5.

**K52. FIX — `nuf`, `clk`: vowel-length mismatch, hi.**
`nuf` label `नुसु` / prose `नुसू` ×5; `clk` label `इदु मिश्मी` / prose `इदू` ×5.

**K53. BLOCKER — `blr` (th): the label uses the autonym, the prose the exonym — and says so.**
th label `ภาษาปลัง` / prose `ภาษาบลัง`, `ชนชาติบลัง`, `ชาวบลัง` — while the prose explicitly assigns `ปลัง` to the *autonym* (`ผู้พูดเรียกตัวเองว่าปลัง`). The label therefore shows the name the prose says the speakers use for themselves, for a row the atlas files as Blang. Neighbour `wbm` also says `บลัง`.

**K54. FIX — `acn`, `orh` (he): label and prose use different apostrophe characters.**
`orh` label `אורוצ׳ן` (U+05F3) / prose `אורוצ'ן` (U+0027 ×4). `acn` label `אצ׳אנג` (U+05F3) / prose `אצ'אנג` (U+0027 ×10). These are visibly different strings and break search/sort. Align to the atlas-wide U+0027 (K24).

**K55. FIX — `acn` (ar): label is adjectival, prose is not.**
label `الأتشانغية` / prose `الأتشانغ من أقرب اللغات الحية`, `والأتشانغ لغة ذات نغمات` — the label form never appears in the prose. `swi` (`السوية` / `لغة السوي`) and `mmd` (`الماونانية` / `لغة الماونان`) insert `لغة` to bridge; `acn` does not.

**K56. FIX — `giq` (ar): label and prose disagree in gender.**
label `الغيلاو الخضراء` (feminine) / prose `الغيلاو الأخضر (هاغي)` and `الغيلاو الأخضر والأحمر والأبيض` (masculine ×2).

**K57. NOTE — `clk`: the label is the Indian name, the prose's primary is the Chinese-side name, in all six languages.**
Labels `Иду-мишми` / `Іду-мішмі` / `الإيدو ميشمي` / `אידו מישמי` / `इदु मिश्मी` / `ภาษาอีดูมิชมี` against prose openings that begin `Иду —` / `الإيدو` / `אידו` / `इदू` / `ภาษาอีดู`, with "Idu Mishmi" introduced only as the name used across the border in India — while the row is explicitly the Chinese variety. Consistent across all six, so a content decision rather than a slip, but the label and the row's stated scope disagree.

**K58. NOTE — `giq` (he), `shx` (he): label unvocalized, prose vocalized.**
`giq` label `גלאו הירוקה` / prose `גֶלָאוֹ`; `shx` label `שה (הו נה)` / prose `השֶׁה`, `הו נֶה`. Cosmetic, but the strings do not match character-for-character.

---

# GROUP L — terminology and names in zh / yue / ja / ko

## L-a. Family and branch names

**L1. BLOCKER — Kra-Dai in zh/yue: see main-report #43.** Confirmed independently, and extended: the pre-existing neighbour `za` uses a **fourth** form, `壮侗语族`, and `lwl.zh`/`lwl.yue` a **fifth**, `太-卡岱` / `台—卡岱語系`. So the atlas carries five renderings of one family name in zh alone. The six new rows should settle on one and match `za`.

**L2. BLOCKER — ja: Kam-Sui splits three ways, including a rank change.**
`カム・スイ語派` (kmc `クラ・ダイ語族カム・スイ語派の言語で`, giq) / `カムスイ語派` no interpunct (lic, swi `クラ・ダイ語族カムスイ語派に属し`) / `カム・スイ語群` **rank changed** (mmd, mlm `クラ・ダイ語族カム・スイ語群に属し`). Since `クラ語派`/`タイ語派` are 語派 in giq and lic, `カム・スイ語派` is the form to keep; **mmd and mlm should change.**

**L3. FIX — ko: Kra-Dai spacing.** `크라다이어족` (kmc, giq, mmd, mlm) vs `크라다이 어족` (lic, swi). **lic, swi should change.**

**L4. FIX — ja/ko: Kra-Dai vs Tai-Kadai against the neighbours.** The 19 use `クラ・ダイ語族` / `크라다이어족`; neighbours `za`/`lwl` use `タイ・カダイ諸語` / `타이-카다이 어족` / `태이-카다이 이주`. The 19 are internally consistent and use the modern term — flag rather than silently rewrite, since `za`/`lwl` are prior hand-made rows (see MEMORY: review-vs-manual-fixes).

**L5. BLOCKER — ko: `dta` demotes Mongolic below its own rank.**
`dta.ko` `다우르어는 **몽골어파** 가운데 가장 이질적인 언어의 하나로` — but `peh.ko` and all three neighbours (`sce`, `mjg`, `yuy`) say `몽골어족`. `어파` sits below `어족`; Mongolic is the family. **dta.ko → `몽골어족`.**

**L6. FIX — ja: the mirror-image of L5.** `peh.ja` `保安語は**モンゴル語族**の言語で` vs `dta.ja` `**モンゴル諸語**のなかでも` and all three neighbours `モンゴル諸語`. **peh.ja is the lone outlier.** (zh/yue are clean: `蒙古语族`/`蒙古語族` in both.)

**L7. FIX — zh/yue: `acn` invents a rank noun used nowhere else in the atlas.**
`acn.zh` `因而对构拟汉藏语系**缅语组**很有用处`; `acn.yue` `**緬語組**`. This is the only `语组`/`語組` in the nineteen; every other Sino-Tibetan node is 语支 (东部博德语支, 彝语支, 怒语支, 羌语支), 语群 (米什米语群) or 语族 (彝缅语族). **acn → `缅语支`.** Related NOTE: zh/yue already use four rank nouns for sub-family nodes across the batch.

**L8. FIX — ja/ko: `twm` names East Bodish two ways inside one row.**
`twm.ja` opens `東ボド**系**の変種` then four sentences later `東ボド**語群**はシナ・チベット語族の一分枝で`. `twm.ko` `동부 보드**어계** 변종` then `동부 보드**어군**은`. zh/yue are clean (`东部博德语支` twice). **Pick one per language.**

**L9. FIX — ja/ko: `nuf` names Nungish and Loloish differently from the rows that own them.**
`nuf.ja` `**ヌン系の語派**` vs `duu.ja` `**ヌン語群**`; `nuf.ja` `ロロ系の語派` vs `jiu.ja` `ロロ・ビルマ語派の**ロロ（ンウィ）系**`. `nuf.ko` `**눙어파**` vs `duu.ko` `**눙어군**`; `nuf.ko` `로로어파` vs `jiu.ko` `로로버마어파의 **로로(응위)계**`. zh/yue clean (`怒语支` in both nuf and duu). **nuf.ja/ko should match duu.**

**L10. FIX — ja/ko: `srh` names the Pamir group two ways inside one row, and clashes with `wbl`.**
`srh.ja` `**パミール語群**に属する東イラン語で` … `しばしば同じ**パミール諸語**としてまとめられるが`; `srh.ko` `**파미르어군**` … `같은 **파미르 제어**로 묶이지만`. Cross-row: `wbl.ja` `東イラン**語群**パミール諸語`, `wbl.ko` `동이란**어군** 파미르계` vs `srh`'s `東イラン**語派**`/`동이란**어파**`. zh/yue clean (both rows `帕米尔语群` + `东伊朗语支`).

**L11. NOTE — Palaungic: the neighbours are the drift side here, not the 19.**
The 19 (`blr`, `rbb`) use ko `팔라웅어파`, zh `巴朗语支`, yue `巴朗語支`. Neighbour `wbm.ko` `파라웅 어군`/`파라웅 계통`; `prk.zh`/`prk.yue` `巴琅语支`/`巴琅語支`; `wbm.yue` `巴朗語族`. The 19 agree with `prk.ko`/`pll.ko` and `wbm.zh`.

**L12. FIX — ja: Hmong named two ways.** `kmc.ja` `**モン語** RPA` vs `shx.ja` `**ミャオ・ヤオ**語族に属し`, `他のどの**ミャオ・ヤオ**語とも近くなく`. zh (`苗文 RPA`/`苗瑶语系`), yue and ko are each self-consistent.

## L-b. Tone

**L13. BLOCKER (ja, ko) / FIX (zh, yue) — the "Chao values" sentence splits five ways, and ja renders Chao's name two different ways.**

| rows | zh | ja | ko |
|---|---|---|---|
| acn | `赵元任五度调值标写` | `趙元任式の調値` | `자오(Chao)식 성조값` |
| twm | `赵元任式调值` | `趙元任式の声調値` | `자오(Chao)식 성조값` |
| mlm | `赵元任式调值标注` | `趙元任式の調値` | `자오 성조 값` |
| lic, swi, mmd | `赵元任式调值` | `**チャオ**式の数値` | `자오식 수치` |
| jiu, pmi | `赵元任式声调数值` | `**チャオ**式の声調数値` | `자오식 성조 수치` |

* **ja BLOCKER** — the scholar's name is kanji `趙元任式` in acn/twm/mlm and katakana `チャオ式` in lic/swi/mmd/jiu/pmi. One person, two names, 3 rows vs 5.
* **ko BLOCKER** — four forms, and `mlm` alone drops `식` and space-splits `성조 값`.
* zh/yue: `acn` alone adds `五度`; `jiu`/`pmi` alone say `声调数值` where the rest say `调值`.

**L14. FIX — ja/ko: `kmc`'s smooth/checked tone pair is broken.**
zh `**舒声**九调、**促声**六调` and yue `**舒聲**九調、**促聲**六調` are a matched tone-category pair. ja `**開音節**に9声、**入声**に6声`; ko `**열린 음절**에 아홉, **입성**에 여섯`. ja/ko pair a *syllable-shape* term against a *tone-category* term, so the nine-vs-six split loses its basis. Make both sides one or the other.

## L-c. "Unwritten"

**L15. FIX — zh: `无文字` vs `没有文字`.**
`无文字` in `peh` (`该语言无文字，使用者书面上使用汉语`) and `orh` (`该语言无文字。`) against `没有文字` in the other eleven unwritten rows. **peh, orh should change.**
NOTE, same rows: the subject drifts three ways — `该语言` (peh, orh, twm, dta) / `这种语言` (shx, acn, mmd, mlm, clk, blr, rbb, srh) / `这门语言` (orh, mmd, pmi); yue `呢個語言` vs `呢種語言`.

**L16. FIX — ko adds `고유` ("of its own") where the source data does not support it.**
`mmd.ko` `마오난어에는 **고유** 문자가 없다`; `mlm.ko` `물람어에는 **고유** 문자가 없으며`. Both rows' `script` is plain `Unwritten`, and zh/yue/ja say plainly `毛南语没有文字` / `毛南話冇文字` / `毛南語は文字を持たない`. The `고유` qualifier is correct only for `blr` (`No script of its own`), where ko rightly has it. **Drop it from mmd.ko and mlm.ko.** (Same class as main-report #40 in English.)

## L-d. "Mutually intelligible"

**L17. BLOCKER (yue) / FIX (zh) — four phrasings each, and one is a register break.**
zh: `两者互不通话` (jiu) / `两者互不相通` (twm) / `彼此不能通话` (nuf) / `三种彼此不易通话` (rbb) / `二者不能通话` (srh); neighbour `mjg.zh` `无法互通`.
yue: `兩者互相通唔到` (jiu) / `兩者互相聽唔明` (twm, nuf) / `三種彼此唔容易通話` (rbb) / **`兩者傾唔埋偈` ×2 (srh)**.
`srh.yue`'s `傾唔埋偈` means "can't chat together" — casual conversation, not mutual intelligibility. It is the only such usage in the nineteen and is a register break in a linguistic gloss. **srh.yue → `互相聽唔明` or `唔能夠互通`.**
ja and ko are clean (`互いに通じない`, `서로 통하지 않는다` throughout).

## L-e. Other recurring terms

**L18. BLOCKER (ja) / FIX (ko) — "Chinese" named two ways.**
ja `漢語`: peh, shx, mmd, mlm, nuf. ja `中国語`: acn, dta, blr, rbb, srh. (`lic.ja` `標準中国語` is a different sense — Mandarin — and is fine.) Neighbours `sce`/`mjg`/`yuy` lean `漢語`. **Ten rows, one term needed.**
ko `한어`: peh (×2), shx. ko `중국어`: the other eight. **peh, shx → `중국어`.** zh/yue clean.

**L19. FIX — ja: the Dai gloss order flips in one row.**
`acn.ja` `**タイ・ヌア語（傣語）**` vs `blr.ja` `**傣語（タイ・ルー語）**` vs `rbb.ja` `傣語`. zh, yue and ko all keep 傣語/다이어 primary. **acn.ja → `傣語（タイ・ヌア語）`.**

**L20. FIX — all four: population numerals mix Arabic and Chinese/Japanese styles, and `shx.zh` mixes both in one row.**
zh/yue Arabic-with-space: `kmc` `290 万…150 万人`, `giq` `约有 55 万人`, `shx` `约有 71 万人`, `peh` `约 6,000 人`, `orh` `约有 9,000 人`. Chinese numerals: the other fourteen (`约一百六十万`, `约四十九万六千`, `约九万六千人`…). **`shx.zh` uses both: `畲族约有 71 万人` and `族称覆盖七十五万人`.**
ja/ko: `nuf` and `clk` alone use comma-Arabic (`およそ9,000人`, `約37,000人` / `약 9,000명`, `약 37,000명`) where the other seventeen use 万/千 style (`約49万6千人` / `약 49만 6천 명`).

**L21. FIX — yue/ja/ko: "this row" is said two ways; zh is the clean reference (`本行` everywhere).**
yue `本行` (kmc, mlm, rbb) vs `呢一行` (giq, shx, orh, acn, lic, jiu, pmi, twm, rbb) — **`rbb.yue` uses both.**
ja `本行` (kmc, giq, shx, orh) vs `この行` (acn, lic, jiu, pmi, twm, mlm, rbb).
ko `이 행` (8 rows) vs `이 줄` (acn, rbb ×2).
Map self-reference: zh `地图上` (nuf) / `本图` (clk, blr) / `本图集` (blr); yue `地圖上` (nuf **and** clk — clk.yue differs from clk.zh, which says `本图`).

**L22. BLOCKER — ko `mmd` drops the primary name of the closest relative.**
zh `它最亲近的亲属是**佯僙语（茶洞语）**，其次是水语`; yue and ja carry the same pair. ko: `가장 가까운 친척어는 **차둥어**이고` — the primary name 佯僙 (Yanghuang/Then) is gone and only the alternate 茶洞 (Chadong) survives, unglossed. **ko.mmd → `양황어(차둥어)`.**

**L23. FIX — ja/ko: Han-character glosses mix Simplified and Traditional, sometimes in one sentence.**
`swi.ja`: `水**書**（すいしょ）` and `水**書**師（水**书**先生）` — Traditional in the running text, Simplified inside the parenthesis, same sentence.
ko Traditional: `서족(畬族)`, `수이어(水語)`, `먼바（門巴）`, `지눠족(基諾族)`, `좡팡(奘房)`. ko Simplified: `수서(水书)`, `수서 선생(水书先生)`, `루마이(汝买)`, `라오진(若进)`.
`rbb.ja` has the same three dialect names in Traditional (`汝買`, `布雷`, `若進`) and the ja **map label** is `ドアン語（汝買）` — so `rbb.ko`'s `汝买` contradicts the atlas's own ja label. **Pick one variant per UI language.**

**L24. FIX — ko: `twm` and `dta` use full-width parentheses; the other seventeen use half-width.**
`twm.ko` `먼바（門巴）`, `춰나（초나） 현`; `dta.ko` `타청（타르바가타이）`. All other new ko rows use `(…)`.

**L25. NOTE — the roman autonym is kept in zh/yue and dropped in ja/ko for one row.**
`pmi.zh`/`pmi.yue` `使用者自称普日米（**Prinmi**）` vs `pmi.ja` `プリンミと呼ぶ`, `pmi.ko` `프린미라 부른다`. `blr` keeps it in all four (`自称 Plang`, `プラン（Plang）`, `플랑(Plang)`).

**L26. NOTE — zh: four wordings for "ethnic population".**
`民族人口约 2 万` (peh) / `民族约有 9,000 人` (orh) / `阿昌族总人口约四万` (acn) / `毛南族人口约十二万四千` (mmd).

**L27. Clean — Simplified/Traditional purity in the nineteen.**
No violations: `zh` contains no Traditional-only characters and `yue` no Simplified-only ones (the only candidates, `台` in 侗台/台語支 and `里` in 公里, are correct Traditional forms).
**NOTE, outside the nineteen:** neighbour `prk`'s **yue map label** is `巴饶克佤语` — fully Simplified in a Traditional locale — while `prk`'s own yue prose says `巴饒克佤語`. A live Traditional-locale defect.

**L28. NOTE — none of the nineteen cites an ISO 639-3 code in zh/yue/ja/ko, while every comparable neighbour does** (`ISO 639-3：prk`, `：duu`, `：sce`, `: mjg`). The nineteen are internally consistent; the divergence is against neighbour house style. No dataset or Swadesh mentions appear in these four languages at all.

## L-f. Map label vs popup prose

**L29. BLOCKER — `twm` and `giq`: the labelled name never appears in the prose (all four languages).**
`twm` labels `错那门巴语（达克帕）` / `錯那門巴語（達克帕）` / `錯那モンパ語（ダクパ）` / `춰나 먼바어(닥파)`. Prose opens `汉语中的族名"门巴"涵盖的不止一种语言` / `中国の民族名「モンパ」は複数の言語を指しており` / `중국에서 쓰는 민족명 먼바（門巴）는`. The full label string occurs **nowhere** in any of the four; the prose says `门巴语` and, separately, `达克帕语`.
`giq` labels `绿仡佬语` / `緑仡佬語` / `녹거라오어`; prose opens `**仡佬语**属于壮侗语系的仡央语支` — the Green qualifier is missing from the opening and `绿仡佬语（Hagei）` appears only mid-paragraph. Since Red and White Gelao are named later in the same paragraph, the opening is genuinely ambiguous. **Prose should change in both.**

**L30. BLOCKER — ja/ko: `clk`'s label uses the name the prose reserves for India.**
ja label `イドゥ・ミシュミ語`, prose opens `**義都語**はシナ・チベット語族ミシュミ系の言語である` and later `そこでは**イドゥ・ミシュミ**と呼ばれている` (India). ko label `이두 미슈미어`, prose `**이두어**는…` then `그곳에서는 **이두 미슈미**라 불린다`. zh/yue are coherent (`义都语` label + `义都语是…`). **ja/ko label → `イドゥ語`/`이두어`.** (Same defect the Latin-script pass found in en/de/fr/it/es/pt/sw — see M3 — so this is a cross-language label problem, not a translation slip.)

**L31. BLOCKER — ja: `nuf`'s label and prose use different scripts.**
label `ヌス語` (katakana) vs prose `**怒蘇語**は中国雲南省北西部…` (kanji, used 4×; the katakana form 0×). **ja label → `怒蘇語`**, matching zh `怒苏语`, yue `怒蘇語`, ko `누수어`.

**L32. BLOCKER — ko: `mlm` label and prose are two different transliterations.**
label `무라오어` (Mulao) vs prose `**물람**족 자치현에서 쓰이는 **물람어**는`, `**물람어**에는 고유 문자가 없으며` (Mulam, ×3). The label form appears nowhere in the prose. (Compare main report K43 — ru/uk/hi/th have the *same* row broken the *other* way round, prose=Mulao, label=Mulam. The two passes disagree about which is correct, so this row needs one decision applied to all 19 UI languages at once.)

**L33. BLOCKER — `lic`: label and prose invert the primary/parenthetical, in ko and ja.**
`ko` label `리어(하 방언)` vs prose `**하이어(리어, 黎語)**는` — primary and parenthetical swapped, and a third form appears later (`하이 제어의 화자는`).
`ja` label `黎語（**哈方言**）` — parenthetical is a *dialect* — vs prose `黎語（**ハイ語**）は` — parenthetical is an *alternate language name*. zh/yue avoid it.

**L34. BLOCKER — yue: the prose switches 語→話 in 7 of 19 rows while every label keeps 語.**
Labels are uniformly `X語`. Prose says `X話` in `mmd` (`毛南話` ×2), `mlm` (`仫佬話` ×3), `nuf` (`怒蘇話` ×4), `clk` (`義都話` ×4), `blr` (`布朗話`), `rbb` (`德昂話`), `srh` (`色勒庫爾話` ×5). The other twelve use `X語`.
The switch cascades onto cross-referenced rows: `mmd.yue` `佯僙話（茶洞話）…水話`, `nuf.yue` `阿儂話、柔若話…傈僳話`, `clk.yue` `阿迪話…博嘉爾話` — while the atlas's own yue labels for those rows are `獨龍語`, `阿迪語`. `blr.yue` is internally split: it calls itself `布朗話` but its relatives `佤語、巴饒克語、東拉佤語`. **yue prose → `X語` throughout**, to match the labels and the cross-referenced rows.

**L35. FIX — `blr`'s cross-references drop elements the target rows' own labels carry (all four).**
`blr` names `prk` as `巴饶克语` / `巴饒克語` / `パラウク語` / `파라우크어`, but `prk`'s label is `巴饶克**佤**语` / `パラウク・**ワ**語` / `파라우크 **와**어`. `blr.yue` names `lwl` as `東拉佤語` where `lwl`'s yue label is `東部拉瓦語` (differs in both `部` and `拉佤`/`拉瓦`) — while `blr.zh` correctly says `东部拉瓦语`. `blr.ko` says `와어` where `wbm`'s ko label is `와족어 (Wa)`.

**L36. FIX — `jiu`: in ja and ko the popup never contains the language's own name.**
Labels `基諾語` / `지눠어`; prose opens on the people (`基諾族は中国の五十六の民族のうち…` / `지눠족(基諾族)은…`) and thereafter says only `**その言語**はシナ・チベット語族ロロ・ビルマ語派の…` / `**그 언어**는 중국티베트어족 로로버마어파의…`. The label string appears zero times. zh/yue at least name it later.

**L37. NOTE — four rows open on the people, a date or a place rather than the language.**
`shx` (`畲族约有 71 万人…`), `jiu` (see L36), `pmi` (`在四川，许多普米人…`), `dta` (`1763年，清朝把一批达斡尔八旗官兵…`). All four labels name a language. Compare `peh`, `orh`, `acn`, `swi`, `mmd`, `nuf`, `srh`, which open `⟨Name⟩ is a ⟨family⟩ language…`.

**L38. NOTE — `orh` and `shx`: two opposite failures of the same gloss convention (ja, ko).**
`orh` label `鄂倫春語` / `어룬춘어` carries no reading gloss, but the prose introduces one (`鄂倫春（**オロチョン**）語`, `어룬춘(**오로촌**)어`) — the reader meets it first in the popup.
`shx` label **does** carry the gloss (`畬語（ホーネ語）`, `서어(호네어)`) but the prose gives the autonym in **roman** instead (`話者自身が **Ho Ne**「山の民」と呼ぶ`, `사용자 스스로 **Ho Ne**…`), so `ホーネ語`/`호네어` never appears in the prose either.

**L39. NOTE — `lic` and `rbb`: the label's parenthetical arrives late in the prose (all four).**
`lic` label `黎语（哈方言）`, but `哈（保定）方言` first appears in sentence seven. `rbb` label `德昂语（汝买）` / `ドアン語（汝買）` / `더앙어(루마이)`, but `汝买` appears three sentences in. Same class as L29; decide together.

---

# GROUP M — terminology and names in en / de / fr / it / es / pt / vi / id / sw

## M-a. Map labels

**M1. BLOCKER — fr/it/es/pt: 11 of the 19 map labels are lowercase; every neighbour label is capitalised.**
The same eleven rows in all four languages: `lic swi mmd twm dta mlm nuf clk blr rbb srh`.
fr: `hlai (ha)`, `sui`, `maonan`, `monpa de Tsona`, `daur`, `mulam`, `noussou`, `idu mishmi`, `blang`, `de'ang (rumai)`, `sarikoli`.
The other eight rows of the same batch are capitalised (`Dong méridional (kam)`, `Gelao vert`, `She (ho ne)`, `Bonan`, `Orotchène`, `Achang`, `Jinuo`, `Pumi du Nord`), as are all neighbours (`Lawa oriental`, `Palaung shwe`, `Tai lue`, `Tshangla`…).
Atlas-wide: **it has exactly 11 lowercase labels out of 1,242 — all 11 are these rows.** pt likewise 11/1,241. es 13/1,241 (these 11 plus `cham occidental/oriental`). fr 26/1,242 (these 11 plus a pre-existing South-American pocket). **The 11 new labels should change.**

**M2. BLOCKER — `twm`: three spellings of the row's own name in seven of nine languages.**

| lang | map label | prose |
|---|---|---|
| en | `Tshona Monpa (Dakpa)` | `Cuona (Tsona) county`, `Monpa`, `Dakpa` |
| de | `Tshona-Monpa` | `Monba` ×4 |
| fr | `monpa de Tsona` | `monba` ×4 |
| it | `monpa di Tsona` | `monba` ×4 |
| es | `monpa de Tsona` | `monba` ×4 |
| pt | `monpa de Tsona` | `monba` ×4 |
| sw | `Kimonpa cha Tsona` | `Monba`, `Wamonba`, `Kimonba` |
| id | `Bahasa Monpa Tshona` | `Monpa` ✔ |
| vi | `Tiếng Môn Ba Thác Na` | `Môn Ba` ✔ |

**Prose should change to `Monpa`** (id and vi already agree). Separately, `Tshona` (en/de/id labels) vs `Tsona` (fr/it/es/pt/sw labels) vs `Cuona (Tsona)` (all prose) is a third split needing one romanisation. Also the en label carries `(Dakpa)` and the de label does not, though both descriptions gloss Dakpa identically — see also the main report's earlier observation that 14 of 19 UI languages drop `(Dakpa)` from the label.

**M3. BLOCKER — `clk`: the label asserts a name the prose explicitly reserves for the other side of the border, in all nine.**
Label `Idu Mishmi` / `Idu-Mishmi` / `Kiidu Mishmi` / `idu mishmi`. Prose opens on `Idu` and then: en `The great majority of Idu speakers … live across the border … where they are **known as Idu Mishmi**`; sw `ambako wanajulikana kama **Waidu Mishmi**`. The row plots the **Chinese** doculect. **The label should be `Idu`**, or the prose should stop reserving the compound name. Combined with L30 (ja/ko) and K57 (ru/uk/ar/he/hi/th), this is broken in **all 19 UI languages** — the row's scope and its label genuinely disagree, which makes it the single most cross-cutting naming defect in the batch.

**M4. BLOCKER — vi: seven labels use a Sino-Vietnamese transcription the prose never uses.**

| row | label | prose headword |
|---|---|---|
| lic | `Tiếng Lê (Ha)` | `Tiếng **Hlai** (Lê)` — swapped |
| mmd | `Tiếng **Mao Nam**` | `Tiếng **Maonan**` ×5 |
| jiu | `Tiếng **Cơ Nặc**` | `Người **Jino**` — `Cơ Nặc` appears nowhere |
| pmi | `Tiếng **Phổ Mễ** Bắc` | `tiếng **Pumi** Bắc` |
| dta | `Tiếng **Đạt Oát Nhĩ**` | `Tiếng **Daur**` |
| mlm | `Tiếng **Mục Lão**` | `tiếng **Mulam**` |
| nuf | `Tiếng **Nộ Tô**` | `Tiếng **Nusu**` ×4 |

A reader clicking any of these seven sees a name that never occurs in the popup they open.

**M5. BLOCKER — vi: there is no policy on Sino-Vietnamese vs Latin/pinyin names, and rows mix both in one clause.**
Sino-Vietnamese prose: `kmc` `người Đồng`, `giq` `Cờ Lao`, `shx` `người Xa`, `peh` `Tiếng Bảo An`, `orh` `Tiếng Ngạc Luân Xuân`, `acn` `Tiếng A Xương`, `lic` `dân tộc Lê`, `swi` `Tiếng Thủy`, `rbb` `Tiếng Đức Ngang`.
Latin/pinyin prose: `mmd` `Maonan`, `jiu` `Jino`, `pmi` `Pumi`, `dta` `Daur`, `mlm` `Mulam`, `nuf` `Nusu`, `clk` `Idu`, `blr` `Blang`, `srh` `Sarikoli`.
Mixed inside one clause:
* `mlm` `đứng cạnh tiếng **Maonan** và tiếng **Thủy**` — pinyin and Sino-Vietnamese for two sister languages side by side
* `pmi` `ghi tại **Taoba** ở **Mộc Lý**, Tứ Xuyên`
* `dta` `từ lưu vực sông **Nộn** đến thung lũng **Ili** ở **Tân Cương**` — three systems in one sentence
* `srh` `tiếng **Duy Ngô Nhĩ**`, `tiếng **Ba Tư**` beside `tiếng **Tajik**`, `tiếng **Kyrgyz**`, `**Tashkurgan**`

**This is the root cause of M4** and needs a policy decision, not seven label edits.

**M6. FIX — vi: `tiếng Thái` is used for three different things.**
`acn` `tiếng **Thái** (Tai Nuea)`, `blr` `tiếng **Thái** (Tai Lue)`, `chữ **Thái** vay mượn`, `rbb` `tiếng **Thái**` — all rendering 傣 *Dai*. But `lic` `nhánh **Thái**` renders the *Tai* branch of Kra-Dai (and `giq` calls the same branch `nhánh **Tai**`), and `blr` also contains `**Thái Lan**` (Thailand) two sentences away. Unmarked `tiếng Thái` reads as Thai-of-Thailand. Use `tiếng Dai` for 傣, and settle `Tai` vs `Thái` for the branch.

**M7. FIX — sw: the Ki- adjectival form appears in the label but not the prose, or vice versa.**
`giq` label `Kigelao cha Kijani` / prose `**Gelao ya Kijani**` ×3. `shx` label `Kishe (Ho Ne)` / prose never says `Kishe`, only `Lugha ya **She** halisi`, `Washe`. `jiu` label `Kijino` / prose only `**Wajino**`. `lic` label `Kihlai (**ha**)` — the only lowercase parenthetical in any sw label — / prose `Kihlai (**Kili**)`. `rbb` prose `Kide'ang, kinachoitwa pia **Kita'ang**` then `wanaoitwa **Ta'ang** au **Palaung**`.

**M8. NOTE — de: `dta` label is an adjective, prose a noun.**
label `Dagurisch` vs prose `Dagur` ×5, including `**Dagur** ist keine Tonsprache`. Every other de row in the batch uses the bare noun as headword (`Das Bonan ist…`).

**M9. NOTE — three rows never name their own lect in the opening sentence, in all nine.**
`giq` opens on the macrolanguage (`Gelao belongs to the Kra branch…`; `Green Gelao (Hagei)` first appears in sentence 5). `jiu` opens on the people (the language is only `Their language`). `pmi` opens on a census artefact (`Northern Pumi` first appears in sentence 3). Compare `peh`/`orh`/`acn`/`swi`/`mmd`/`nuf`/`srh`, which all open `⟨Name⟩ is a ⟨family⟩ language…`. Same finding as L37 for CJK, so it is a batch-level drafting habit, not a translation slip.

**M10. NOTE — `srh` cross-references neighbours whose own labels differ from their own prose.**
es `srh` says `hablan **wají**`; `wbl`'s es prose is `El **wají** es…` but its **label** is `Wakhi`. pt: `tg` label `Tadjique` vs its prose `O **tajique**`, and `srh.pt` uses `tajique` ×4. vi: `sce` label `Tiếng Đông **Tương**` vs its own prose `Tiếng Đông **Hương**`, and the new row `peh` cross-references `Đông Hương`. Pre-existing neighbour defects, but the new rows now depend on them.

## M-b. Tone

**M11. BLOCKER — de/fr/vi: three terms for "Chao tone values".**
de `Chao-**Tonziffern**` (acn, jiu, pmi) / `Chao-**Tonwerte(n)**` (twm, mlm) / `Chao-**Werte**` (lic, swi, mmd).
fr `chiffres **tonals** de Chao` (acn, jiu, pmi) / `**valeurs tonales** de Chao` (twm, mlm) / `**valeurs** de Chao` (lic, swi, mmd). *(`tonals` is also the wrong plural of* tonal *— standard is* tonaux*.)*
vi `trị số thanh điệu Chao` (acn, twm, mlm) / `trị số thanh điệu **kiểu** Chao` (jiu, pmi) / `trị số **kiểu** Chao` (lic, swi, mmd).
it and es are the clean references. **de/fr/vi should collapse to one term each.**

**M12. FIX — id: `acn` uses a different noun.** `**angka nada** Chao` against `**nilai nada** Chao` in jiu/pmi/twm/mlm/lic/swi/mmd.

**M13. FIX — en: the same statement is written four ways.**
`acn` `the forms in this row are written with the Chao tone values given in the source` / `jiu`, `pmi` `the forms here carry Chao tone values from the source` / `twm` `the forms in this row carry the Chao tone values given in the source` / `mlm` `the forms in this row are given with Chao tone values`. Also `Chao tone values` vs `Chao values` for one thing.

**M14. FIX — "tonal" vs "tone language" alternates arbitrarily.**
de `ist eine **Tonsprache**` (acn, twm) vs `**tonal**` (jiu, pmi, nuf, clk, blr).
fr `est une **langue à tons**` (acn), `**à tons**` (nuf, clk, blr) vs `**tonale**` (jiu, pmi, twm).
it `è una **lingua tonale**` (acn, twm) vs `è **tonale**` (jiu, pmi, nuf, clk, blr).

**M15. NOTE — "checked" syllables rendered as "closed" in six languages.**
en `kmc` `nine tones on open syllables and six on **checked** ones`; de `**geschlossenen** Silben`; fr `syllabe **fermée**`; it `quelle **chiuse**`; es `sílaba **cerrada**`; pt `sílaba **fechada**`; id `suku kata **tertutup**`; vi `âm tiết **khép**`. *Checked* (stop-final) and *closed* (any coda) are different categories, and `kmc`'s nine-open/six-checked split depends on the distinction.

## M-c. "Unwritten" — the prose mirrors the metadata's six-way split rather than normalising it

**M16. FIX — each of the nine languages says it three to five ways, and the variation does not track the underlying facts.**

| lang | plain "unwritten" | reflexive (peh, orh) | dta | blr | rbb |
|---|---|---|---|---|---|
| en | `is unwritten` ×11 | — | `no standard orthography in general use` | `no writing system **of its own** in everyday use` | `no writing system in everyday use` |
| de | `ist schriftlos` ×10 | — | `Standardorthographie gibt es nicht` | `keine **eigene**, im Alltag gebrauchte Schrift` | `keine im Alltag gebrauchte Schrift` |
| fr | `n'a pas d'écriture` / `est sans écriture` | `n'est pas écrite` | `pas d'orthographe standard` | `pas d'écriture **propre**` | `pas d'écriture d'usage courant` |
| it | `non ha scrittura` / `priva di scrittura` | `non si scrive` | `ortografia standard` | `scrittura **propria**` | `scrittura d'uso quotidiano` |
| es | `carece de escritura` / `sin escritura` | `no se escribe` | `ortografía estándar` | `escritura **propia**` | `escritura de uso cotidiano` |
| pt | `não tem escrita` / `sem escrita` | `não se escreve` | `ortografia padrão` | `escrita **própria**` | `escrita de uso corrente` |
| id | `tidak memiliki aksara` / `tanpa aksara` / `tidak beraksara` | `**tak** bertulisan` vs `**tidak** bertulisan` | `ortografi baku` | `aksara **sendiri**` | `aksara sehari-hari` |
| sw | `haina maandishi` / `hakina maandishi` | `haiandikwi` | `maandishi sanifu` | `maandishi **yake yenyewe**` | `maandishi …maisha ya kila siku` |
| vi | `không có chữ viết` ×11 ✔ | — | `chữ viết chuẩn` | `chữ viết **riêng**` | `chữ viết…hằng ngày` |

**vi is the only language with a single form for the plain case — use it as the model.**
The `peh`/`orh` reflexives (`no se escribe`, `non si scrive`, `n'est pas écrite`, `haiandikwi`, `tak bertulisan`) are the clearest outliers: they mean "one does not write it", which is weaker than "has no script", and `peh`/`orh` are factually no different from `mmd`/`mlm`/`srh`.
**id `tak` vs `tidak`** for the identical phrase (peh/orh vs jiu/pmi) is a bare inconsistency with no cause.

**M17. FIX — `blr` and `rbb` differ by exactly the words "of its own" in all nine languages.**
Confirms main-report #40 across the whole language set. `blr`'s clause is justified (it goes on to name borrowed Tai scripts); `rbb`'s is not, since `rbb` never mentions a borrowed script — although its own prose says De'ang people use Dai. **Either add the borrowed-script clause to `rbb` or drop `of its own` from `blr`.**

**M18. FIX — de `mlm` has drifted semantically from every other language.**
en `Mulam is unwritten`, fr `n'a pas d'écriture`, it `non ha scrittura`, es `carece de escritura`, pt `não tem escrita`, vi `không có chữ viết`, id `tidak memiliki aksara`, sw `hakina maandishi` — but de **`Eine eigene Schrift gibt es nicht`** ("no script *of its own*"), which puts `mlm` in the `blr`/`rbb` class it does not belong to.

**M19. NOTE — the neighbours add still more forms.**
`tsj` en `Andvik describes it as an unwritten language`; `duu` en `has traditionally been unwritten`; `wbl` en `largely an oral language with no single established script`; `yuy` en `lacks a broadly established everyday writing standard`; `duu` pt `era tradicionalmente **ágrafo**` — a one-word term nothing else in the atlas uses.

## M-d. "Mutually intelligible"

**M20. BLOCKER — pt `nuf` reverses the sense.**
pt: `O nusu é uma das quatro línguas **mutuamente inteligíveis apenas entre os seus próprios falantes** da nacionalidade nu`.
Every other language says the four are mutually **un**intelligible: en `four mutually unintelligible languages`, es `mutuamente **ininteligibles**`, it `reciprocamente **incomprensibili**`, fr `mutuellement **inintelligibles**`, de `**untereinander unverständlichen**`, vi `**không thông hiểu lẫn nhau**`, id `**tidak saling dipahami**`, sw `**zisizoeleweana**`. **pt must be corrected** — this is a factual error visible to users.

**M21. FIX — three to five phrasings per language.**
en `not mutually intelligible` (jiu, twm, srh) / `mutually unintelligible` (nuf) / `not readily mutually intelligible` (rbb).
de: `untereinander nicht verständlich` / `untereinander unverständlich` / `einander nicht verständlich` / `**nicht gegenseitig verständlich**` — **`srh` uses two forms in one paragraph** / `einander nicht ohne Weiteres verständlich` (rbb).
fr: `mutuellement intelligibles` / `mutuellement inintelligibles` / `**intercompréhensibles**` (srh ×2) / `ne s'entendent pas aisément entre elles` (rbb) — two unrelated lexemes for one concept.
it: `mutuamente **intelligibili**` (jiu) / `mutuamente **comprensibili**` (twm, srh ×2) / `reciprocamente incomprensibili` (nuf) / `non si comprendono facilmente fra loro` (rbb). Neighbours `mjg`/`adi`/`tg` all use `mutuamente intelligibile` — **it should standardise on `intelligibile`.**
es: calqued negation in two rows — `twm` `**ambas no son** mutuamente inteligibles`, `srh` `**ambos no son**…`; idiomatic Spanish is `ninguna de las dos es…`.
vi: `hai bên không hiểu được nhau` / `không thông hiểu lẫn nhau` / `không thông hiểu được với` — the last in `srh`, second occurrence.
id: `tidak saling **dipahami**` (jiu, nuf, srh, rbb) vs `tidak saling **dimengerti**` (twm) — `twm` is a lone outlier, a clean fix.
sw: five forms, two of them in `srh` alone; `jiu`'s and `srh`'s are calques. The atlas already has an idiom in the neighbours (`mjg` `isiyoelewana nacho`, `tg` `inayoelewana na`, `adi` `zinazoeleweka kati yao`). **Standardise on `-elewana`.**

## M-e. Family and branch names

**M22. BLOCKER — pt: Kra-Dai has three spellings across six rows, four counting the neighbour.**
`cradai` (kmc, giq) / `kra-dai` (lic, swi) / `cra-dai` (mmd, mlm) / `tai-kadai` (neighbour lwl).

**M23. BLOCKER — fr: two spellings across six rows.**
`kra-daï` (kmc, giq, mmd, mlm) vs `kra-dai` (lic, swi); plus neighbour `lwl` `taï-kadaï`.

**M24. FIX — de: the same construction takes two genitives.**
`swi` `zum Kam-Sui-Zweig **des Kra-Dai**` vs `mmd`/`mlm` `zum Kam-Sui-Zweig **der Kra-Dai-Sprachen**`; `kmc` `der **Kra-Dai-Familie**` vs `giq`/`lic` `des **Kra-Dai**`.

**M25. BLOCKER — es: Sino-Tibetan hyphenated in two rows, solid in four.**
`sino-tibetano` (jiu, pmi) vs `sinotibetano` (acn, twm, nuf, clk). Neighbour `duu` uses `sino-tibetana`, so the hyphenated form is house style — **acn/twm/nuf/clk should change.** Mirror-image in it: the 19 all use `sino-tibetano` but neighbour `duu` uses `sinotibetana`.

**M26. BLOCKER — sw: Sino-Tibetan spelled two ways within the 19.**
`Kisino-**Ki**tibeti` (acn, jiu, pmi) vs `Kisino-Tibeti` (twm, nuf, clk). Neighbour `duu` uses `Kisino-Tibeti`.

**M27. BLOCKER — sw: the Ki- prefix is applied to family names with no rule, and the same node gets both treatments.**
Kam-Sui: `kmc` `**Kikam-Sui**` vs `swi`/`mmd`/`mlm` `tawi la **Kam-Sui**` (bare).
Tai: `giq` `matawi ya **Tai**` vs `lic` `tawi la **Kitai**`.
Loloish: `jiu` `**Kiloloish**` vs `nuf` `**Kiloloi**`.
Nungish: `nuf` `**Kinungi**` vs neighbour `duu` `**Kinungish**`.
Palaungic: `blr` `**Kipalaung**` vs neighbours `prk`/`pll` `**Kipalaungiki**` vs `lwl` `**Palaungic**` (raw English left in).
Waic: `blr` `**Kiwaiki**` vs neighbour `prk` `**Kiwai**`.
Left bare in the same batch: `clk` `kundi la **Mishmi**`, `srh` `kundi la **Pamir**`, `shx` `familia ya **Hmong-Mien**`.

**M28. FIX — it/es/pt/fr: Nungish and the Pamir group renamed against their own neighbour rows.**
Nungish: it `nuf` `**nung**` vs `duu` `**nungish**`; es `nuf` `**nung**` vs `duu` `**nungish**`; pt `nuf` `**nungue**` vs `duu` `**nungish**`; fr `nuf` `**noung**` vs `duu` `**nounguique**` (and fr's own -ique pattern: `palaungique`, `qianguique`, `waïque`). **All four new rows should adopt the neighbour term.**
Pamir: it `srh` `**pamirico**` vs `wbl` `**pamiriano**`; es `srh` `**pamirio**` vs `wbl` `**pamir**`; pt `srh` `**pamiriano**` vs `wbl` `**pamir**`.

**M29. BLOCKER — es and pt `srh` each use two adjectives for "Iranian" in one paragraph.**
es: `una lengua **irania** oriental` … `la rama **irania** oriental` … but `otra rama del **iranio** oriental`. Neighbour `wbl` es uses `irania` throughout.
pt: `srh` `uma língua **irânica** oriental` ×3 vs neighbour `wbl` pt `**iraniana**`, `línguas **iranianas**`.

**M30. FIX — de: Loloish named two ways.**
`jiu` `zum **Lolo-Zweig** (Ngwi) des Lolo-Birmanischen` vs `nuf` `zum **loloischen** … Zweig`, `Nusu neigt zum **Loloischen**`. de adjectivises every other branch (`palaungischen`, `qiangischen`, `nungischen`, `ostbodische`, `nordtungusische`), so `jiu`'s compound-noun form is the outlier.

**M31. FIX — id: five strategies for forming branch adjectives.**
Indonesianised `-ik` (`Mongolik`, `Tungusik`, `Sinitik`, `Tibetik`); Indonesianised other (`cabang **Burmis**`, `bahasa **Austroasia**`, `rumpun **Sino-Tibet**`); English left raw (`cabang **Loloish**`, `cabang **Nungish**`, `ragam **Bodish** Timur`); truncated to the bare ethnonym (`cabang **Qiang**`, `cabang **Palaung**`); nonce (`sisi **Waik** dari Palaung`). `cabang Palaung` is also factually wrong-adjacent, since Palaung *is* a language (`pll`) and Palaungic is the branch.

**M32. NOTE — Kra-Dai (the 19) vs Tai-Kadai (the neighbours), in every language.**
The 19 consistently say Kra-Dai; neighbours `lwl`/`za` say Tai-Kadai. Same for Sino-Tibetan (19) vs Tibeto-Burman (`tsj` en `the country's indigenous **Tibeto-Burman** languages`), and Austroasiatic (`blr`, `rbb`) vs Mon-Khmer (`pll` en `a Palaungic **Mon-Khmer** language`, `lwl` `a **Mon-Khmer** language`). **The 19 are internally consistent and modern; the neighbours are the drift side.**

**M33. NOTE — rank drift for the same node in en.**
Palaungic: `branch` (blr, rbb) vs `family` (pll `The Palaungic family`) vs `subgroup` (lwl `the Palaungic subgroup`). Nungish: `branch` (nuf) vs `group` (duu). Mishmi `group` (clk), Pamir `group` (srh), Loloish `branch` (jiu). No stated convention distinguishes these — see main-report #10 and #11, which this confirms from the prose side.

**M34. NOTE — the "Waic side of Palaungic" calque propagated to all nine.**
en `it belongs to the **Waic side** of Palaungic`; de `zur **waischen Seite**`; fr `du **versant waïque**`; it `al **lato waico**`; es `al **lado waico**`; pt `ao **lado waico**`; id `**sisi Waik**`; sw `**upande wa Kiwaiki**`. "Side" is not a taxonomic rank; every translator reproduced it literally. **Fix the English and the eight follow.**

## M-f. PRC 民族 terminology

**M35. BLOCKER — id: three words for one concept, two of them in adjacent sentences of one row.**
`suku` in sixteen rows (`suku Gelao`, `Suku She`, `suku Achang`, `Suku Maonan`, `Suku Monpa`, `suku Nu`, `suku Lhoba`, `suku Blang`, `Suku De'ang`, `suku Tajik`, `Suku Jino`…); `kebangsaan` in `jiu` (`lima puluh enam **kebangsaan** Tiongkok`, `status sebagai **kebangsaan** tersendiri`) and `pmi` (`angka **kebangsaan**`); `suku bangsa` in `dta`. **`jiu` contains both `Suku Jino` and `kebangsaan`.**

**M36. BLOCKER — sw: three words, roughly evenly split, and `shx` uses two.**
`taifa`: kmc, giq, shx, peh, orh, jiu, pmi. `kabila`: acn, lic, swi, mmd, mlm, nuf, clk, blr, rbb, srh. `taifa dogo`: twm, dta.
`shx` uses both (`Taifa la She` and `jina la **kabila**`). `taifa` also means *nation-state* and `kabila` *tribe*; neither is neutral. **One choice needed.**

**M37. FIX — de: two competing constructions.**
Compound `X-Nationalität` (giq, shx, acn, lic, swi, blr, rbb, twm) vs genitive `Nationalität der X` (mmd, mlm, clk, nuf).

**M38. NOTE — en/de/fr/it/es/pt/vi are internally clean here** (`nationality` ×19, `Nationalität` ×19, `nationalité` ×19, `nazionalità` ×19, `nacionalidad` ×19, `nacionalidade` ×19, `dân tộc` ×19) — but the neighbours use a different register (`mjg` en `the officially recognized **Tu ethnic group**`, `za` en `China's largest **minority** language`, `mjg` fr `à l'**ethnie** tu`). Only act if a house term for 民族 is being set.

## M-g. Administrative units and place names

**M39. BLOCKER — fr: 县 is `xian` in four rows and `district` in six, against a neighbour house style of `xian`.**
`xian`: mmd, mlm, nuf (`le **xian** de Bijiang … n'existe plus comme **xian**`), clk.
`district`: peh, acn, swi, pmi, twm, srh.
All four neighbours use `xian` (`duu` `xian autonome derung et nu de Gongshan`, `sce`, `mjg`, `yuy`). **The six `district` rows should change** — and `twm` needs `district` kept for the *Indian* Tawang district, so the two senses must be separated.

**M40. BLOCKER — es: the same split, `condado` vs `distrito`.**
`condado`: swi, mmd, mlm, srh, and `twm` `el **condado** de Cuona (Tsona)`.
`distrito`: peh, acn, pmi, clk, nuf.
`twm` shows the correct discipline — `condado` for the Chinese county, `distrito` for `el **distrito** de Tawang` in India. The other five collapse the distinction; all neighbours use `condado autónomo`.

**M41. BLOCKER — pt: same split.** `condado` in acn/clk/twm/nuf and all autonomous counties vs `distrito` in `peh` and `pmi`.

**M42. BLOCKER — sw: four renderings of 自治县 in the atlas, and the new rows introduce a fifth term no neighbour uses — and it is the wrong word.**
New rows: `**Wilaya Huru** ya Wasui ya Sandu` (swi), `**Wilaya Huru**` (mmd, mlm, srh), and `orh` `**Bendera ya Kujitawala** ya Oroqen` — `orh` uses *Kujitawala* while its four siblings use *Huru*.
Neighbours: `duu`/`sce` `**Wilaya ya Kujitawala**`, `mjg`/`yuy` `**Kaunti Inayojitawala**`.
**`Huru` means *free/independent*, not *autonomous*.**

**M43. BLOCKER — sw: `mkoa` and `jimbo` each carry two incompatible senses across the 19.**
`mkoa` = prefecture (`acn` `mkoa wa Dehong`, `rbb` `mikoa ya Dehong na Lincang`) and = province (`peh` `mpaka wa mkoa`, neighbour `sce` `Mkoa wa Gansu`).
`jimbo` = province (`swi` `jimbo la Guizhou`) and = State (`acn` `jimbo la Kachin`, `rbb` `Jimbo la Shan`, `wbm` `Jimbo la Wa`).
A reader cannot tell which administrative level is meant.

**M44. BLOCKER — id: `kabupaten` capitalised in some rows, lowercase in others, for the same entity.**
Capital: `peh` `**Kabupaten** Jishishan`, `twm` `**Kabupaten** Cuona (Tsona)`, plus the four autonomous counties. Lowercase: `acn` `**kabupaten** Longchuan, Lianghe, dan Luxi`, `nuf`, `clk` `**kabupaten** Zayü`. Same for valleys: `clk` `**Lembah** Dibang` vs `nuf` `**lembah** Nujiang`, `dta` `**lembah** Sungai Nen`.

**M45. FIX — sw: valley capitalisation.** `clk` `**Bonde** la Dibang` vs `nuf` `**bonde** la Nujiang` vs `dta` `**bonde** la mto Nen`.

**M46. FIX — es/fr: `estado`/`État` lowercase in the new rows, capitalised in the neighbours.**
es `acn` `en el **estado** de Kachin`, `rbb` `en el **estado** de Shan` vs `wbm`/`prk` `el **Estado** Wa`, `pll` `el **Estado** de Shan`. fr `acn` `l'**État kachin**`, `rbb` `l'**État shan**` (lowercase name) vs `pll` `l'**État Shan**`, `wbm` `l'**État Wa**`.

**M47. FIX — en: one hyphenated compass form among fifteen solid ones.**
`nuf` `in **north-west** Yunnan` against `pmi` `in **northwestern** Yunnan`, `peh` `a corner of the **northwest**`, `orh` `a **Northern** Tungusic language`, and neighbour `duu` `**northwestern** Yunnan`. Same class in it (`nuf`/`pmi` `nel **nord-ovest**` vs `peh` `angolo **nordoccidentale**` and neighbours `duu`/`sce`/`mjg` `nordoccidentale`).

**M48. FIX — de: three patterns for the same construction.**
Prefix `Ost-Guangdong` (shx); adjective `des **westlichen** Guizhou` (giq), `im **südlichen** Guizhou` (swi), `des **westlichen** Xinjiang` (srh); periphrasis `im **Norden von** Guangxi` (mmd, mlm), `im **Westen Yunnans**` (rbb), `im **Süden Yunnans**` (blr), `im **Nordwesten Yunnans**` (nuf, pmi).

**M49. FIX — vi: two administrative words for two prefectures treated identically elsewhere.**
`acn` `**châu** Đức Hoành` and `rbb` `**châu** Đức Hoành và **địa khu** Lâm Thương`. en/es/it/pt all say "prefectures of Dehong and Lincang" with one word.
Also `pmi` drops the classifier — `ghi tại Taoba ở **Mộc Lý**` where every other row writes `**huyện** X` (`peh` `huyện Tích Thạch Sơn`, `clk` `huyện Sát Ngung`, `nuf` `huyện Bích Giang`).

**M50. NOTE — place-name spellings are otherwise stable within each language.**
`Guizhou`, `Hunan`, `Guangxi`, `Yunnan`, `Xinjiang`, `Sichuan`, `Rongjiang`, `Xishuangbanna`, `Dehong` are spelled identically in every row that mentions them, in all nine. The exceptions are localisation choices applied consistently (fr `Tachkourgan`, `Salouen`; de `Taxkorgan`; pt `Vietname`, `Tibete`; es `Saluén`; sw `Uchina`). **The one genuine cross-row problem is `Cuona`/`Tsona`/`Tshona` in `twm` (M2).** — This contrasts sharply with ru/uk/ar/he/hi/th, where place-name transliteration is the largest defect cluster (K19–K23).

**M51. NOTE — `nuf` names one river twice without linking the names, in all nine.**
en `a Sino-Tibetan language of the **Nujiang** valley` … `along the upper **Salween** gorge`. The Nujiang *is* the Salween; the text never says so.

## M-h. Typography and orthography

**M52. BLOCKER — fr and it: straight and curly apostrophes are mixed, and `rbb` uses both inside one paragraph.**
fr straight-only: kmc, giq, shx, peh, orh, lic, swi, jiu, pmi, twm, dta. fr curly-only: acn, mmd, mlm, nuf, clk, blr, srh.
**fr `rbb`: 7 straight and 9 curly in one paragraph** — `à l**’**ouest du Yunnan` beside `Le de**'**ang, appelé aussi ta**'**ang`.
it: the same split on the same rows; **it `rbb`: 7 straight + 2 curly.**
es and pt use straight only — the clean state.

**M53. BLOCKER — fr: French spacing before high punctuation is applied in most rows and dropped in two.**
`mmd` `parlent la langue**;** presque tous maîtrisent` — no space, in the same row as a correct `un numéro de catégorie tonale **;** la transcription API`.
`mlm` `La langue n'a pas d'écriture**;** les formes de cette ligne`.

**M54. FIX — fr/it: `srh`'s gloss loses its quotation marks.**
`kmc` `bal est **« poisson »**`, `giq` `**« rouge »**`, `shx` `**« gens de la montagne »**` — but `srh` `ce nom signifie **forteresse de pierre** en turc`, unmarked. it the same (`'pesce'`, `'rosso'` vs `significa **fortezza di pietra**`). en `srh` does quote it.

**M55. BLOCKER — pt: European and Brazilian orthography are mixed, and the same word is spelled both ways.**
`etnónimo` (shx, PT) vs `etnônimo` (twm, BR); `autónomo`/`autónoma` (srh, orh) vs `autônomo` (swi, mmd, mlm); `registo` (clk) vs `registra` (lic); `de fato` (swi) vs neighbour `wbm` `de facto`.
Possessive article: PT `**O seu** sistema tonal` (kmc), `**os seus** falantes` (shx), `**A sua** língua` (jiu) vs BR `**Seu** inventário` (swi), `**Seu** parente` (mmd), `**Seus** falantes` (mlm), `**seus** descendentes` (dta).
**The Brazilian rows cluster: `swi`, `mmd`, `mlm`, `dta`.** The other fifteen are European. Pick one and convert.

**M56. FIX — pt: `austro-asiática` (blr, rbb) vs neighbour `prk` `austroasiática`.**
Also `srh` mixes transliteration conventions in one clause: `são o **xugni** e o **rushani**` — Shughni Portuguesed, Rushani not. es adapts both (`shugní`, `rushaní`), it adapts neither (`shughni`, `rushani`).

**M57. FIX — es: `nuf` uses the deprecated accent.** `La nacionalidad es **sólo** una categoría administrativa` against `giq`/`jiu`/`mmd`/`twm` `solo`.

**M58. FIX — de: `shx` `dreiviertel Millionen` is ungrammatical.**
en `three quarters of a million`; should be `drei Viertel einer Million` or `750.000`.

**M59. FIX — it: `La lingua non si scrive` (peh, orh) reads as "it isn't spelled that way".** The other rows use `non ha scrittura` / `priva di scrittura`, which is what is meant. (Same rows as M16's reflexive outlier.)

**M60. FIX — sw: Buddhism spelled three ways.** `blr` `**Ubudha** wa Theravada` vs `pmi` `**Ubuddha**` vs `peh`/`rbb` `**Kibuddha**`.

**M61. BLOCKER — sw: `China` and `Uchina` both used, sometimes for the same phrase.**
`Uchina`: kmc, shx, acn, mmd, mlm, nuf, clk. `China`: lic, swi (×2), jiu, twm, blr, rbb, srh (×2). **Every sw neighbour uses `China`.**

**M62. BLOCKER — sw: `wasemaji` and `wazungumzaji` both used for "speakers".**
`wazungumzaji`: giq, shx (×2), peh (×2), orh, mlm. `wasemaji`: lic, jiu, twm, dta (×2), nuf (×2), clk, srh, blr.
Neighbours are split too (`prk`/`pll`/`wbl`/`dng`/`sce` `wazungumzaji`; `mjg`/`yuy`/`tsj` `wasemaji`), so this is an atlas-wide choice — and this batch is the natural place to settle it.

**M63. FIX — id: `varietas` once, `ragam` everywhere else.**
`mlm` `dengan **varietas** Tionghoa setempat` against `shx` `**ragam** Sinitik`, `lic` `**ragam** Ha (Baoding)`, `jiu` `dua **ragam**`, `twm` `**ragam** Bodish Timur`, `clk` `sebuah **ragam** Adi`, `nuf` `**ragam** mirip Derung`, `rbb` `tiga **ragam** utama`.

**M64. NOTE — id `dokulek`.** `nuf` `menampilkan **dokulek** Bijiang`, `clk` `**dokulek** dari sisi Tiongkok`. Internally consistent but not an established Indonesian word; the other languages avoid it (fr `parler`, it `parlata`, es `habla`, pt `fala`, vi `cứ liệu`, de keeps `Doculect`).

**M65. FIX — vi: "this row" translated two ways.** `hàng này` (giq, shx, orh, acn, mlm, rbb, blr) vs `dòng này` (lic, jiu, pmi, twm ×2). (Same class as L21 in yue/ja/ko.)

**M66. FIX — it: ethnonym capitalisation.**
it lowercases ethnonyms throughout the 19 (`i dong`, `gli she`, `gli achang`, `i li`, `i sui`, `I maonan`, `I jino`, `i monba`, `I daur`, `i blang`, `i de'ang`, `i parlanti … prinmi`) except `clk` `noti come **Idu Mishmi**`, `gli **Igu**`, and `blr` `si chiamano da sé **Plang**`. `pmi`'s identical construction is lowercase (`chiamano sé stessi **prinmi**`) where `blr`'s is capitalised.

## M-i. Content mismatches

**M67. FIX — the `acn`/`blr`/`rbb` three-way parallel sentence is asymmetric in one row, in all nine languages.**
en `acn` `Achang people commonly also use **Dai (Tai Nuea)** and Chinese` / `blr` `**Dai (Tai Lue)** and Chinese` / `rbb` `**Dai** and Chinese` — `rbb` omits the variety gloss the other two carry. Reproduced in all nine.
Also de: `acn` says `**Achang-Sprecher** verwenden` while `blr`/`rbb` say `**Blang** verwenden` / `**De'ang** verwenden` — same sentence, two subject types.

**M68. FIX — de `mmd` overstates the endangerment label.**
en `the language is rated **vulnerable**`, es `**vulnerable**`, it `**vulnerabile**`, pt `**vulnerável**`, fr `**vulnérable**`, id `**rentan**`, vi `**dễ tổn thương**`, sw `hali ya **kuathirika**` — but de `gilt als **gefährdet**`, which is German for *endangered*, one UNESCO step further. **de `mmd` → `verletzlich`.**

**M69. NOTE — `mmd` is the only row of the 19 with a UNESCO-style label at all.**
The other eighteen describe status in prose (`nearly all elderly`, `no longer being passed on to children`, `nearly extinct`), while the neighbours use the standard terms (`lwl` `UNESCO classifies **definitely endangered**`, `mjg` `the language is **endangered**`, `yuy` `**vulnerable or threatened**`). This makes `mmd`'s `vulnerable` look arbitrary next to `mlm` and `giq`. See also main-report #18, which finds the `meta.vitality` field for these rows bucketed inconsistently with the atlas — the prose and the field should be settled together.

**M70. NOTE — de/fr/it/es/id `nuf` invent a source entity the English does not name.**
de `sodass der Ort, den **die Wortliste** nennt, als Kreis nicht mehr besteht`; fr `le lieu nommé par **la liste de mots**`; it `dalla **lista di parole**`; es `la **lista de palabras**`; id `**daftar kata** itu`. en says only `the place **it** names`, referring to the doculect. The wordlist is introduced without antecedent in five languages.

**M71. NOTE — sw `dta` inverts the argument.**
sw `kilijitenga mapema, **lakini** vitabu vya marejeo hukieleza kuwa lugha yenye ubunifu mwingi` (*but*) against en `it split early, **and** the handbooks describe it as rather innovative than as a conservative outlier`.

**M72. NOTE — de/vi/id/sw `giq` make a different claim from en/it/fr/es/pt.**
en `the family's **most divergent** arm`; it `**più divergente**`; fr `**le plus divergent**`; es `**más divergente**`; pt `**mais divergente**` — but de `dem am **frühesten abgespaltenen** Arm`, vi `nhánh **phân kỳ sớm nhất**`, id `cabang **paling awal memisah**`, sw `**uliojitenga mapema zaidi**`. Divergence and early splitting are different claims; four languages assert the second. (The zh prose asserts the second too — `该语系中分化最早的一支` — so **five** languages disagree with English.)

**M73. NOTE — en in the 19 is British; the neighbours are American.**
The 19 use `recognised` (jiu), `devised` (lic), `programmes` (swi), `practise` (blr); the neighbours use `standardized` (prk), `recognized` (mjg, duu). Internally clean on both sides, but the atlas mixes them.

**M74. NOTE — number formatting is stable within each language.**
`1.5 million`/`550,000` (en, sw); `1,5`/`550.000` (de, es, pt, vi, id); `1,5`/`550 000` (fr, it). The 19 es rows are uniformly dot-separated; the es *neighbours* are the drift side (`prk` `399.000–849.000` vs `pll` `560 000`, `mjg` `50 000`, `yuy` `2500`).

**M75. NOTE — `lic` opens by calling the row's headword a branch, not a language, in all nine.**
en `**Hlai is one of the primary branches** of Kra-Dai`; id `**Hlai adalah salah satu cabang primer**`; sw `**Kihlai (Kili) ni mojawapo ya matawi ya msingi**`. The row plots a single lect (`this row gives the Baoding lect`) and its label is `Hlai (Ha)`. Compare `swi`/`mmd`/`mlm`, which open `⟨Language⟩ belongs to the Kam-Sui branch`.

**M76. NOTE — no source is ever named in these nine languages.**
No occurrence of *Swadesh*, *ABVD*, *Austronesian Basic Vocabulary Database*, *Lexibank*, *CLDF* or *Sun Hongkai* in any of the nine, in the 19 rows or the neighbours. Sources are `the source` / `die Quelle` / `la fuente` / `chanzo` / `nguồn`. The only two citations in the whole batch are `the Zhenfeng list` (giq) and `the survey this row comes from` (rbb), and they use different registers. All the dataset detail lives in `coverageNote`, which is English-only — so a non-English reader never learns where any of these nineteen rows came from.

---

# GROUP N — the tree was NOT clean; another thread is editing these rows right now

The task brief said "commit ff65db7b, tree clean". It was clean when this pass started
(snapshot taken 13:34) but **not** afterwards: `git status` shows `wordmap_meta.js`,
`wordmap_data.js`, `lang_names.js`, `lang_words/`, `meta_desc/` and 50 `words/*.js`
files modified or deleted, with `wordmap_meta.js` rewritten at 13:56 and again at
14:02 while this report was being written. `HEAD` is still `ff65db7b`, so this is
uncommitted work by a concurrent thread applying an earlier rally's findings.

**Everything above was verified against the 13:34 snapshot.** The re-check below is
against the tree as of 14:02. Anyone acting on this report should re-run the checks
before editing — and should not edit `wordmap_meta.js` while the other thread holds it
(see MEMORY: *shared worktree commit hygiene*).

### N1. Already fixed in flight — close these
* **#25** — `nuf` and `clk` now cite `藏缅语语音和词汇` correctly, in both `coverageNote`
  and `sources`. Resolved.
* **#26** — `pmi.sources[0]` now reads `Northern Pumi (**Taoba, Muli**), via
  lexibank/suntb`. The Lanping/Taoba contradiction is resolved.

### N2. BLOCKER — #24 is now *worse*, not fixed: three positions instead of two
The other thread rewrote only the Gelao row. The atlas now states three incompatible
things about the same database:

* `gqu` (was `giq`) — "Forms are the Wanzi list as carried by ABVD; **this doculect's
  source sketch** writes tone as Chao VALUES… **Notation is a property of the
  doculect's own sketch, not of ABVD**: the Hlai, Sui, Maonan and Mulam lists in the
  same database give tone categories instead."
* `kmc` — unchanged: "as carried by ABVD, **which writes tone as Chao VALUES**"
* `lic`, `swi`, `mmd`, `mlm` — unchanged: "the Austronesian Basic Vocabulary Database's
  **Kra-Dai section, which writes tone as a CATEGORY number (1-8) rather than a Chao
  value**"

`gqu`'s new sentence is the correct one and explicitly contradicts the other five.
**`kmc` and the four ABVD Kam-Sui/Hlai rows must receive the same rewrite** or the
batch now argues with itself in print.

### N3. BLOCKER — new contradiction introduced: `clk.family` no longer matches `clk`'s prose
`clk.family` was changed from `Sino-Tibetan (Mishmi)` to **`Sino-Tibetan (Digarish)`**,
but the descriptions were not touched: **17 of the 19 UI languages still say "Mishmi
group"** (`en` "Idu is a Sino-Tibetan language of the **Mishmi** group", plus ja, ko,
zh, yue, vi, th, id, hi, de, fr, it, es, pt, ru, ar, sw). The map label is still
`Idu Mishmi` in every language. Either revert the family or rewrite 17 descriptions
and 19 labels. (This also supersedes main-report #12's note about `Mishmi`.)

### N4. BLOCKER — new contradiction introduced: `rbb.speakers` dropped the Myanmar figure the prose still gives
`rbb.speakers` was changed from `~20K in China, ~139K in Myanmar` to
**`~20K in China (Rumai variety)`**, but:
* `rbb.description.en` still reads "…the same people, called Ta'ang or Palaung, number
  about **139,000** across the border in Shan State, Myanmar."
* `rbb.countries` still reads `China (Yunnan: Dehong, Lincang), **Myanmar (Shan State)**`.

The popup header now says 20K while the popup body says 159K across two countries.

### N5. BLOCKER — the `giq` → `gqu` rename is mid-flight and the row currently has no word data
`LANG_DATA['gqu'].meta` exists with `iso6393:'gqu'`, and `lang_names.js` /
`wordmap_data.js` / the 50 `words/*.js` files have been re-keyed. But:

```
lang_words/giq.js   deleted
lang_words/gqu.js   does not exist
meta_desc/giq.js    deleted
meta_desc/gqu.js    does not exist
```

So the Gelao row presently has metadata and no per-language word file. The rename
itself looks correct on the merits — ABVD's own record for the Wanzi list says
"This **Central** Gelao dialect is spoken in Wanzi village", and Central Gelao is
`gqu`, not Green Gelao `giq` — and `gqu`'s new note documents exactly that. But the
rename is incomplete as it stands.

**Every finding in this report that names `giq` should be read as naming `gqu`.**

### N6. NOTE — the validator's verdict is unstable while the other thread works
`node validate_wordmap_data.js` returned **PASS** at 13:35, **FAIL (1 error)** at
14:01, and **PASS** again at 14:03. It also now emits a new warning that was not
present in the clean tree:

```
· gqu: blood/red share form "plɒ24" "plɒ˨˦"
```

That one is expected — the Gelao source genuinely gives one form for both — but it
should be recorded deliberately rather than left as a standing warning.

### N7. NOTE — other in-flight edits observed, not assessed
`kmc`, `peh`, `shx`, `acn`, `dta`, `mlm`, `blr` all had `coverageNote` sentences
rewritten or reordered between 13:34 and 14:02 (e.g. `dta`'s "borrowing marker" was
corrected to "cognate-set marker, used on 641 rows across 92 of its languages";
`shx`/`mlm`'s TREE explanation was corrected to "ABVD has no TREE parameter at all";
`blr.countries` gained `Pu'er`; `mlm.speakers` gained a `2010` census year). These
post-date the snapshot this report was built on and were not re-audited. Note that
`mlm.speakers` gaining a year makes it the only one of the nineteen with one — a fresh
instance of main-report #16.
