# Review pass 9 — adversarial audit of the nineteen new rows

Target: `/home/jounlai/langmap` @ `2a71de14`, rows
`kmc gqu shx peh orh acn lic swi mmd jiu pmi twm dta mlm nuf clk blr rbb srh`.

*Commit drift:* while this pass ran, another thread landed `614b0a9c` ("Clear
older backlog: the NameMap `br` collision, and 204 same-pitch tone
respellings"). It touched `meta_desc/{blr,mlm,mmd,rbb}.js` and
`wordmap_meta.js`, but **only non-English description keys** — the English
descriptions, all nineteen `coverageNote`s, and every cell of the nineteen rows
are byte-identical to `2a71de14`. Every finding below applies unchanged at
`614b0a9c`.

Method: every absence claim and every number in the nineteen `coverageNote`s and
`meta_desc/*.js` English descriptions was re-derived from the cached CLDF in
`~/langmap-work/lb/` and `~/langmap-work/lb2/` — full parameter lists, full
per-doculect row sets, orthography-profile segments, ABVD per-language `notes`
fields. Doculect identity was tested by scoring every row's normalised cells
against **every** doculect in its own dataset. Nothing in `/home/jounlai/langmap`
was edited.

Datasets involved: `abvd` (210 params / 2 040 doculects), `lexibank/suntb`
(1 004 / 51), `lexibank/sagartst` (250 / 50), `lexibank/rob` (254 / 101),
`lexibank/peirosaustroasiatic` (100 / 109), `lexibank/deepadungpalaung`
(100 / 16), `lexibank/iecor` (170 / 160), plus `mannburmish` for the Achang
cross-check.

---

## (a) Every absence claim, with verdict

"Absence claim" = any sentence asserting that a source lacks, omits, does not
record, does not annotate, or leaves empty something. 46 of them.

| # | Row | Claim (quoted or paraphrased) | Verdict | Evidence |
|---|-----|-------------------------------|---------|----------|
| A1 | kmc | cat / heart / love / hello / thanks unattested because ABVD has no such item | **VERIFIED** | `abvd_parameters.csv` has 210 params; none is cat, heart, love, greeting, thanks |
| A2 | kmc | "The 1958 Latin orthography … is not used in the cells, because the source does not give it." | **VERIFIED** | ABVD lang 677 carries IPA only; no orthographic column |
| A3 | kmc | "ABVD leaves both unannotated, so which is inclusive is not recorded" | **VERIFIED** | 677 `185_we` = `tau55`, `ȶiu55`, both `Comment=''` |
| A4 | kmc | "Mulam's two forms are marked inclusive and exclusive, and the Haifeng She entry carries a note that the lect does not distinguish" | **VERIFIED** | 761 `185_we` cmt `inclusive`/`exclusive`; 771 `185_we` cmt "Can stand for inclusive or exclusive as Haifeng She does not distinguish between the two." |
| A5 | kmc | "The source's ȶ and ȵ are written tɕ and ɲ in both fields here, **unlike the Hlai, Sui and Mulam rows**, which keep the source characters" | **REFUTED (as an enumeration)** | Maonan (`mmd` night `ʔȵam5`) and Gelao (`gqu` nose `ȵtɕe24`, salt `ȵtɕəɯ44`) in the same ABVD batch also keep `ȵ`, as do all five suntb rows (jiu, pmi, twm, nuf, clk). See F7 |
| A6 | gqu | "'tree' is not in this wordlist" | **VERIFIED** | 699 has no `79_stickwood`, no `113_branch`, no `127_woodsforest` |
| A7 | gqu | "the other Gelao lists have it" | **VERIFIED** | 7 other Gelao lists carry `79_stickwood` annotated 'tree' (Fengyan, Heijiaoyan, Hongfeng, Judu, Wantao, Zhenfeng, Red Gelao (Vietnam)) |
| A8 | gqu | "The source records a single free 1PL pronoun (su33 ta33), and does not annotate it" | **VERIFIED** | 699 `185_we` one row, `Comment=''` |
| A9 | shx | "TREE is unattested because ABVD has **no TREE parameter at all** … **not because this list is short of one**" | **VERIFIED / misleading** | No TREE param — true. But the *operative* cause is doculect-level: 771 has no `79_stickwood` row, and `79_stickwood` is exactly where kmc, lic and mmd got their tree cells. See F5 |
| A10 | shx | "the other She list is a different lect and is not borrowed from in any case" | **VERIFIED** | 762 She (Lianhua) is a different lect (own tone table); its `79_stickwood` = `tɔŋ5 pa4`, not annotated 'tree' |
| A11 | peh | "**bird and stone are not in this list — ABVD has no parameter for either**" | **REFUTED** | ABVD has `97_bird` and `120_stone`; both are populated for kmc, gqu, swi, mlm, lic, mmd, shx in this very batch. The Bao'an doculect (942) simply has no rows for them. See **F1** |
| A12 | peh | "neither is SUN: ABVD's item 168 is 'day', udər" | **VERIFIED** | 942 `168_day` = `udər`, `Comment=''`; ABVD has no SUN parameter |
| A13 | peh | "every other Mongolic row in the atlas has the *naran reflex for sun" | **VERIFIED** | yuy нар, mjg naran, sce naran, mn нар, bxr наран, mvf nara, dta nara, mn_cn ᠨᠠᠷᠠ, xal нарн, xng ᠨᠠᠷᠠᠨ, cmg ᠨᠠᠷᠠᠨ; zkt has no sun cell |
| A14 | peh | "'we' is bədə, one form the source does not label for clusivity" | **VERIFIED for ABVD / MISLEADING overall** | ABVD 942 gives one unlabelled `bədə`. But `lexibank/rob` — the dataset this batch already uses for `dta` — gives Baoan **two** 1PL pronouns, `bədə` and `mangə`, exactly parallel to Dagur `bide` / `ba:`. See **F3** |
| A15 | peh | "**The source marks two vowels with a caron** (bǔ 'I', ʨǐ 'thou')" | **REFUTED** | 942 also has `sǔ` (`122_water`) and `iaʥǐ` (`56_child`) — at least four caroned vowels. Two is the count *among the cells used*, not in the source |
| A16 | orh | "The wordlist behind this row is a sound-symbolism survey, which is why cat, love and the greeting formulas are unattested" | **VERIFIED** | `johanssonsoundsymbolic_parameters.csv` (344 params) has no cat / love / hello / thanks |
| A17 | orh | "It does carry about sixty kinship parameters, split by the sex of the speaker" | **VERIFIED** | 65 kinship params, each doubled `(female speaking)` / `(male speaking)` |
| A18 | orh | "'we' gives both 1PL pronouns the source records **without labelling them**, because it marks 1PLI buu and 1PLE mir, the reverse of the usual Tungusic assignment" | **VERIFIED as to the source / SELF-CONTRADICTORY as to the row** | Params `275_1pli` = `buu`, `276_1ple` = `mir`. But the row prints `buu / mir` and the map's own documented convention (in 20 languages) is "both are given, **inclusive first**". See **F4** |
| A19 | acn | "Night is absent from the parameter list altogether" | **VERIFIED** | none of `sagartst`'s 250 params is 'night' |
| A20 | acn | "eye is a parameter Sagart carries but leaves empty for Achang, **one of only twelve** he does" | **VERIFIED** | exactly 12 params have no Achang row; `49_theeye` is one of them |
| A21 | acn | "**The other dataset that carries Achang**, Mann's Burmish list, has them — but it is a different doculect, its 'black' being nɔɂ³¹ where this one has lɔk⁵⁵" | **REFUTED** | `lexibank/suntb` also carries Achang (Longchuan) — and its black is `lɔk⁵⁵`, *the same form as this row*, with night `ni³¹tɕhot³⁵` and eye `ȵɔʔ⁵⁵tsiʔ³¹` present. See **F2** |
| A22 | acn | "the Sun Hongkai list … gives Achang the same form for both [我们/咱们]" | **VERIFIED** | suntb Achang `971_we` = `972_weinclusive` = `ŋɔ⁵⁵tuʔ³¹` |
| A23 | lic swi mmd mlm | "ABVD's list is Swadesh-shaped, so it has no word for cat, no verb 'to love', no greeting or thanks formula and **no HEART item at all — its body-part run goes bone, intestines, liver, breast**" | **VERIFIED** | params 15–18 are exactly bone, intestines, liver, breast; no heart/cat/love/hello/thanks in the 210 |
| A24 | lic | "The 1PL inclusive ga carries no tone digit in the source" | **VERIFIED** | 772 `185_we` = `ga` (incl.), `fa1` (excl.) |
| A25 | lic | "Norquest … gives no value for 8 or 9; **no cell in this row uses either**" | **VERIFIED (second half)** / UNVERIFIABLE (first half) | lic cells use only tones 1, 2, 3, 7. Norquest's book is not in the cache |
| A26 | swi | "SUN is left unattested: item 168 is glossed 'day' and the Sui list, **unlike the Hlai and Maonan ones**, marks no entry there as 'sun'" | **VERIFIED as to Sui / REFUTED as an enumeration** | 736 `168_day` = `van1`, no comment ✔. But Mulam (761) *and* She Haifeng (771) also annotate a `168_day` entry 'sun' — the contrast set is incomplete, and Mulam is in this same batch |
| A27 | swi | numerals 3–5 and 100 "are the Chinese loans, which are … the only ones the list gives" | **VERIFIED** | 736 `199/200/201/209` each a single row, cmt 'Chinese', `Loan=true` |
| A28 | mmd | "MOON is ni4 njen2 … **the list offers no simplex**" | **VERIFIED** | 784 `129_moon` = `ni4 njen2`, `njen2 ta:i6`; no bare `njen2`. (The second compound is not mentioned in the note) |
| A29 | mlm | "TREE is unattested because ABVD has no TREE parameter at all" | **VERIFIED / misleading** | same as A9: 761 has no `79_stickwood` row, which is where the sibling rows' tree comes from. See F5 |
| A30 | jiu pmi twm nuf clk | "That wordlist has **no BONE concept at all**" | **VERIFIED** | no param in suntb's 1 004 has Name or Concepticon gloss BONE |
| A31 | jiu pmi twm nuf clk | "It does carry two separate 1PL entries, glossed 我们 and 咱们, and their forms differ here" | **VERIFIED** | `971_we` (Concepticon `WE (EXCLUSIVE)`) vs `972_weinclusive`; forms differ for all five |
| A32 | dta | "That is not part of the word: it is the **dataset's cognate-set marker**, used on **641 rows** across 92 of its languages" | **REFUTED (twice)** | (i) the cognate set is the numeric `Cognacy` field; `bor` is an appended **borrowing** flag — TOOTH set 278 contains 30 Turkic members *without* `bor` and 15 Mongolic members *with* it. (ii) the count is **640** (standalone token) or 642 (naive `endswith`), never 641. "92 languages" is correct. See **F6** |
| A33 | dta | "including the TOOTH set of every Mongolic doculect, Middle Mongolian šidu bor among them, **which is inherited rather than borrowed**" | **VERIFIED as to coverage / EDITORIAL as to the gloss** | all 15 Mongolic doculects' tooth rows carry `bor` ✔. But "inherited rather than borrowed" contradicts the dataset's own coding (Robbeets treats Mongolic *šidün as a Turkic loan) — that is a contested position asserted as fact |
| A34 | dta | "Daur is not tonal" | **VERIFIED** | no tone marks anywhere in the 294 Dagur rows |
| A35 | dta | "The acute in sí / sídə … is a vowel mark in this dataset's own profile, which segments it as plain i" | **VERIFIED** | exactly two Dagur rows carry an acute; both segment `í/i` |
| A36 | dta | "WE is printed exclusive-first as ba: / bide" | **VERIFIED** | `ba:` precedes `bide` in `rob_forms.csv` |
| A37 | blr | "the CLDF's form field is **hard-capped at fifteen characters across all 10,706 of its rows**" | **VERIFIED** | 10 706 rows exactly; `max(len(Value)) == 15`, 78 rows at the cap. (`Form` has one 16-char row) |
| A38 | blr | STONE `ʔuk.31 sa.31 mu` and SUN `ŋai.31 sa.31 ŋi` "hit the cap" | **VERIFIED** | both are exactly 15 characters |
| A39 | blr | profile renders `nh` as `nʰ` "while contradicting itself on the parallel lh and mh" | **VERIFIED** | segments: `nʰ ɔ m` for `nhɔm`, but `lh/l̥` and `mh/m̥` |
| A40 | blr | "Wa nham, Parauk hnam and Shwe Palaung hnam are all n̥ here" | **VERIFIED** | wbm `["nham","n̥am"]`, prk `["hnam","n̥am"]`, pll `["hnam","n̥aːm"]` |
| A41 | blr | "carries **no kinship term at all — not even 'child'** — no cat, no love, no greeting or thanks, **no THREE and no HOUSE**" | **VERIFIED** | peiros's 100 params: no child/father/mother/cat/love/hello/thanks/house; numerals are only `one` and `two` |
| A42 | blr | "the list gives ʔet.33 ti.31 with no inclusive/exclusive label" | **VERIFIED** | single `we` param, single Plang row, no annotation |
| A43 | blr | "the doculect Peiros names Wa is the one the Lexibank curators tagged with Blang's code" | **VERIFIED** | `peirosaustroasiatic_languages.csv`: `Wa` → Glottocode `blan1242`, ISO `blr`; `Plang` has neither |
| A44 | blr | "**Plang matches neither Wa nor Parauk**" | **OVERSTATED** | Plang dog `so.51` = Wa `soʔ`, eye `ŋai.33` = Wa `ŋai`; the systematic scan gives Plang 4/32 against Wa. It differs from Wa on water/tooth/blood, which is the real point |
| A45 | rbb | "The source records **no tone on any of its sixteen doculects**" | **VERIFIED** | 16 doculects; 0 of 1 584 rows contain a digit or tone letter |
| A46 | rbb | "it has 'child' but **no mother or father**, no cat, no love, no greeting or thanks, **no GOOD, no RED and no HOUSE**"; "**no first-person-plural parameter**" | **VERIFIED** | param list has `child`, `I`, `you (sg.)` and no `we`; no good/red/house/mother/father/cat/love |
| A47 | srh | "no kinship term at all — **it has no 'child' parameter either** — no cat, no love, no greeting or thanks" | **VERIFIED** | iecor's 170 params contain only `man` and `woman` from that field |
| A48 | srh | "**It has no pronouns at all**, which is why I, you and we are unattested" | **VERIFIED** | no `I`, `thou`, `we`, `they` among the 170 |

---

## (b) Doculect identification — every row tested against every doculect in its dataset

Each row's surface cells were normalised (tone digits, length marks, tie bars,
`ȶ→tɕ`, `ȵ→ɲ`, `ʨ→tɕ`, `ᴀ→a` stripped/folded) and scored as an exact-string
intersection against every doculect's full form set in the same dataset.

| Row | Dataset | Named doculect | Score | Best alternative | Verdict |
|-----|---------|----------------|-------|------------------|---------|
| kmc | abvd (2 040 doculects) | 677 Dong, Southern | 41/42 | 789 Dong, Northern 18/42 | **CONFIRMED** |
| gqu | abvd | 699 Gelao (Wanzi) | **40/40** | 932 Gelao (Dagouchang) 21/40 | **CONFIRMED** (the re-code to `gqu` holds; see F12 for the prose) |
| shx | abvd | 771 She (Haifeng) | 34/39 | 762 She (Lianhua) 20/39 | **CONFIRMED** |
| peh | abvd | 942 Bao'an 保安语 | 37/41 | 973 Waxianghua 3/41 | **CONFIRMED** |
| lic | abvd | 772 Hlai (Baoding) | 41/42 | 734 Lao 8/42 | **CONFIRMED** |
| swi | abvd | 736 Sui | 41/42 | 719 Then 12/42 | **CONFIRMED** |
| mmd | abvd | 784 Maonan | 40/41 | 770 Ai-Cham 20/41 | **CONFIRMED** |
| mlm | abvd | 761 Mulam (Dongmen) | 40/41 | 936 Mulam (Siba) 32/41 | **CONFIRMED** (Siba is close, but the note's EYE discriminant `l̥a1` vs Siba `mɣa1` decides it) |
| jiu | suntb (51) | Jinuo | 46/47 | Hani (Dazhai) 13/47 | **CONFIRMED** |
| pmi | suntb | TaobaPumi | 48/49 | QinghuaPumi 18/49 | **CONFIRMED** (`i` a³⁵ vs Qinghua ɛ⁵⁵; sun bu̵⁵³ vs by⁵⁵) |
| twm | suntb | MamaTshona | 48/49 | Tibetan (Lhasa) 16/49 | **CONFIRMED** |
| nuf | suntb | BijiangNusu | 46/47 | Yi (Nanjian) 9/47 | **CONFIRMED** |
| clk | suntb | Idu | 48/49 | BijiangNusu 7/49 | **CONFIRMED** |
| acn | sagartst (50) | Achang (Burmish_Achang) | 43/43¹ | Xiandao 13/43 | **CONFIRMED as to dataset**, but see **F2**: suntb's Achang (Longchuan) scores 31/43 and is the *same* doculect; mannburmish's Achang scores 5/43 and is not |
| dta | rob (101) | Dagur | 41/44 | Khalkha 4/44 | **CONFIRMED** |
| mlm/mmd cross | — | — | — | — | no cross-contamination found |
| blr | peirosaustroasiatic (109) | Plang | **32/32** | Man'e 9/32, Wa 4/32 | **CONFIRMED** (and the curator-mistagged `Wa` is decisively *not* the source of this row) |
| rbb | deepadungpalaung (16) | NanSang | **36/36** | MangBang 26/36, GuangKa 24/36 | **CONFIRMED** (decided by dog `sow` vs `saw`, tree `taŋhɔj` vs `taŋhɔːj`) |
| srh | iecor (160) | 296 Sarikoli | **40/40** | Wakhi 1/40 | **CONFIRMED** |

¹ 11 nominal "misses" for acn are an artefact of Sagart's `+` word-joiner
(`ni³¹+mɔ³¹`) against the atlas's space; every one matches on inspection.

**Conclusion for section (b): no second Gelao-style mis-coding survives. All
nineteen rows are filed against the doculect their notes name.** The one
identity problem that remains is not a mis-coding but a missed *duplicate*
(acn, F2).

---

## (c) Findings

Severity: **HIGH** = a factual error a reader would be misled by, or a cell that
is wrong. **MEDIUM** = a confident sentence that does not survive checking, or an
inconsistency between rows in the same batch. **LOW** = imprecision, incomplete
enumeration, undisclosed editorial step.

### F1 — HIGH — `peh`: "ABVD has no parameter for either" is false

> "bird and stone are not in this list — **ABVD has no parameter for either** — and neither is SUN"

**REFUTED.** `abvd_parameters.csv` contains `97_bird` (Concepticon BIRD) and
`120_stone` (Concepticon STONE). They are populated for seven of the eight ABVD
rows in this very batch: kmc `mok21`/`pja55`, gqu `ntau31`/`əɯ33`, swi
`nok8`/`pja1`, mlm `nɔk8`/`tui2`, lic `taȶ7`/`tshi:n1`, mmd `nɔk8`/`tu:i2`,
shx `lɔ54`/`ŋa22`.

What is true is that the **Bao'an doculect (lang 942)** has no row for either —
it carries 178 of the 210 parameters. This is the same error class as the two
already caught in earlier passes: a doculect-level gap reported as a
dataset-level gap. Contrast the SUN half of the same sentence, which *is* a
genuine parameter-level absence and is stated correctly.

**Correction:** "bird and stone are not in this list — the Bao'an record covers
178 of ABVD's 210 items and skips both — and neither is SUN, which ABVD has no
parameter for at all: its item 168 is 'day', udər…"

### F2 — HIGH — `acn`: "the other dataset that carries Achang" is false, and the dataset it misses is the same doculect

> "Night is absent from the parameter list altogether; eye is a parameter Sagart carries but leaves empty for Achang… **The other dataset that carries Achang, Mann's Burmish list, has them — but it is a different doculect, its 'black' being nɔɂ³¹ where this one has lɔk⁵⁵, so they were not borrowed.**"

**REFUTED.** At least two other cached datasets carry Achang, and the note names
the wrong one:

| dataset | Achang doculect | black | night | eye | score vs. this row's 43 cells |
|---|---|---|---|---|---|
| `sagartst` (this row) | Burmish_Achang (Longchuan; Huang 1992, Hill 2017) | `lɔk⁵⁵` | — (no param) | — (empty) | 43/43 |
| `lexibank/suntb` | Achang (Longchuan), `acha1249` | **`lɔk⁵⁵`** | **`ni³¹tɕhot³⁵`** | **`ȵɔʔ⁵⁵tsiʔ³¹`** | **31/43** |
| `mannburmish` | Achang | `nɔɂ³¹` | `njɛn³⁵` | `njɔɂ³ dʒi⁴³` | 5/43 |

The very discriminant the note uses — black `lɔk⁵⁵` vs `nɔɂ³¹` — proves suntb's
Achang is *the same* Longchuan doculect (same sun `ni³¹mɔ³¹`, same tree
`saŋ³¹tseŋ⁵⁵`, same 1PL `ŋɔ⁵⁵tuʔ³¹`, same `ŋɔ⁵⁵` for 'I'); only Mann's is a
different one. The row's own note cites suntb two sentences later ("the Sun
Hongkai list, which carries two separate 1PL parameters") — so the dataset was
in hand.

**Consequence:** `eye` and `night` are not genuinely unsourced for this row.
They are available, in the same doculect, from a dataset already used for five
other rows in the same batch. Either fill them (`ȵɔʔ⁵⁵tsiʔ³¹`, `ni³¹tɕhot³⁵`) and
say so, or restate the reason. As written the note asserts a uniqueness that the
cache disproves.

### F3 — HIGH — `peh`: `we` is routed `unknown` on one dataset's silence while a dataset already in use records the pair

> "'we' is bədə, one form the source does not label for clusivity, so the row is routed **undecided** rather than as making no distinction."

True of ABVD. But `lexibank/rob` — the dataset from which the `dta` row in this
same batch is built — gives **Baoan two 1PL pronouns under `249_1plpronoun`:
`bədə` and `mangə`**, exactly parallel to its Dagur `bide` / `ba:` which this
batch routes `clusive` (inclusive `bide`, exclusive `ba:`). Bonan `bədə` <
Proto-Mongolic *bida (inclusive); `mangə` < *man- (exclusive).

| rob `249_1plpronoun` | forms |
|---|---|
| Dagur | `ba:`, `bide` → atlas `dta` = **clusive** |
| **Baoan** | **`mangə`, `bədə`** → atlas `peh` = **unknown** |
| Khalkha | `bid` |
| Huzhu | `buda, budasge, bunaŋGʊla` |
| Dongxian | `matan`, `biʥiən` |

Two rows built from Mongolic sources in the same batch reach opposite verdicts on
the same evidence, from datasets both already loaded. `peh` is the understatement
direction the brief asked for: the answer *is* recorded, just not in ABVD.

**Correction:** route `peh` `clusive` with `bədə / mangə` (inclusive first), citing
`lexibank/rob`; or, if the batch's rule is "one source per row", say so — but the
current note's "the source does not label it" reads as "nobody has recorded it",
which is false.

### F4 — MEDIUM — `orh`: the row says it declines to say which is which, but the column's own convention says it

> coverageNote: "'we' gives both 1PL pronouns the source records **without labelling them**, because it marks 1PLI buu and 1PLE mir, the reverse of the usual Tungusic assignment (*buu exclusive, *mit inclusive)."
> description: "…so this row gives both **without saying which is which**."

The source facts check out: `johanssonsoundsymbolic` has `275_1pli` = `buu`,
`276_1ple` = `mir`, and the standard reconstruction is indeed the reverse
(Evenki bu excl. / mit incl.; Manchu be excl. / muse incl.).

But the cell prints **`buu / mir`**, and `words/we.js` states in twenty languages
that "Where a language has both forms, both are printed, **inclusive first**" —
and its own header gives "Tungusic — Evenki **мит/бу**, Manchu **ᠮᡠᠰᡝ/ᠪᡝ**" as the
model, i.e. inclusive first. A reader applying the map's documented convention
reads `buu` as the inclusive — which is precisely the assignment the note says is
probably wrong. The row is silent in prose and loud in ordering, and the ordering
contradicts both the reconstruction and the map's own Tungusic examples.

**Correction:** either print `mir / buu` (following the reconstruction the note
endorses) and say the source's labels were inverted, or keep the source order and
add a visible note that the order here does *not* carry the column's usual
inclusive-first meaning.

### F5 — MEDIUM — `shx` and `mlm`: "ABVD has no TREE parameter at all" is true but is not the reason, and the batch treats the same situation five different ways

> shx: "TREE is unattested because **ABVD has no TREE parameter at all** — its run goes stick/wood, branch, leaf, woods/forest — **not because this list is short of one**."
> mlm: "TREE is unattested because ABVD has no TREE parameter at all — its run goes stick/wood, branch, leaf, woods/forest."

The parameter claim is literally correct. But four ABVD rows in this same batch
*do* have a tree cell, all taken from `79_stickwood` when its `Comment` says
'tree':

| row | tree cell | source |
|---|---|---|
| kmc | `mɐi31` | `79_stickwood` cmt "wood, stick, log, tree" |
| lic | `tshai1` | `79_stickwood` cmt "tree" |
| mmd | `mai4` | `79_stickwood` cmt "tree, wood" |
| swi | `mai4` | extracted from `113_branch` "pe5 mai4" cmt "mai4 = tree" *(disclosed)* |
| **mlm** | — | **761 has no `79_stickwood` row at all** |
| **shx** | — | **771 has no `79_stickwood` row at all** |
| gqu | — | 699 has no stick/branch/forest row; note says "not in this wordlist" |

So the operative reason for shx and mlm is doculect-level, exactly what the shx
note explicitly denies ("not because this list is short of one"). And the batch
gives five different accounts of one situation: silence (kmc, lic, mmd), an
explicit extraction (swi), "not in this wordlist" (gqu), and "no TREE parameter"
(shx, mlm). `gqu`'s "'tree' is not in this wordlist" and `mlm`'s "ABVD has no
TREE parameter at all" are describing the same database in incompatible terms.

**Correction:** one sentence, used everywhere: "ABVD has no TREE parameter; where
a lect's stick/wood entry is annotated 'tree' the atlas takes it, and this lect
has no stick/wood entry."

### F6 — HIGH — `dta`: `bor` is a borrowing flag, not a cognate-set marker, and the count is 640 not 641

> "Two entries, bird and tooth, are printed with a trailing bor. That is not part of the word: **it is the dataset's cognate-set marker, used on 641 rows across 92 of its languages** — including the TOOTH set of every Mongolic doculect, Middle Mongolian šidu bor among them, **which is inherited rather than borrowed**. Both are trimmed."

Three problems.

**(i) It is not a cognate-set marker.** `rob_forms.csv` has a dedicated
`Cognacy` column carrying the set number. `bor` is appended to `Value` on
individual rows *within* a set. Cognate set **278** (TOOTH) has 45 members:

- 30 **Turkic** rows — `diš`, `tiš`, `tis`, `teš`, `ti:s`, `čiš` … — **no `bor`**
- 15 **Mongolic** rows — `šüde(n)`, `sídə`, `ʂde`, `šidün`, `šidu`, `sʉdʉn` … — **all `bor`**

That is unmistakably a borrowing flag: Robbeets codes Mongolic *šidün as a loan
from Turkic *tiš. The `Loan` column is empty on all 26 224 rows, so `bor` is the
dataset's *only* borrowing signal.

**(ii) The count is wrong.** Rows whose `Value` ends in a standalone `bor` token:
**640**, across **92** languages (the "92" is right). Rows whose `Value` merely
ends in the letters "bor": 642 — the two extras are the word `obor`. **641 is
neither number.**

**(iii) "which is inherited rather than borrowed" is an editorial claim stated as
fact.** Whether Mongolic *šidün is a Turkic loan is exactly the contested point
that Transeurasian scholarship divides on. The note uses the Middle Mongolian
attestation to argue the marker cannot mean 'borrowed' — but Robbeets flags
Middle Mongolian precisely because she dates the borrowing before it. The
argument is circular and it reads as if the dataset were making a clerical error.

Trimming `bor` from the cells is right either way. The *explanation* is wrong.

**Correction:** "…that is not part of the word: `bor` is the dataset's borrowing
flag, appended to the cognate class on 640 rows across 92 of its languages —
including the TOOTH set of every Mongolic doculect, Middle Mongolian šidu bor
among them, where it records Robbeets's view that Mongolic *šidün is a Turkic
loan, which is disputed. Both are trimmed."

### F7 — MEDIUM — `kmc`: the ȶ/ȵ contrast set is incomplete

> "The source's ȶ and ȵ are written tɕ and ɲ in both fields here, **unlike the Hlai, Sui and Mulam rows, which keep the source characters**."

Rows in the atlas that keep the source's `ȶ`/`ȵ` in *both* the surface and the
`ipa` field: lic (`taȶ7`, `ȵa:n1`), swi (`ȶən1 ⁿdaau1`, `ȵa2`), mlm (`ȵa2`) —
**and also mmd** (`ʔȵam5`, night) **and gqu** (`ȵtɕe24` nose, `ȵtɕəɯ44` salt),
both in this batch, **and all five suntb rows** (jiu `ȵɔ35`, pmi `ȵɛ53`, twm
`ȵᴀ13`, nuf `ȵo55`, clk `ȵo35`). `kmc` is the only row in the batch that
converts. Naming three of ten is an enumeration that reads as exhaustive.

Related and larger: `ȶ` and `ȵ` are Sinological, not IPA, and they sit inside the
field the row declares `pronunciationType: "ipa"` in ten of the nineteen rows.
That is a corpus-wide convention question, not a per-row one, and the kmc note
frames it as the latter.

### F8 — HIGH — `kmc`: the SUN cell breaks the rule four sibling rows state, and the note is silent about it

`kmc` `sun` = **`mɐn55`**, taken from ABVD `168_day`, whose `Comment` is
**empty**. The kmc coverageNote does not mention SUN at all.

Every other row in this batch that touches item 168 states the opposite rule:

| row | 168_day entries | cell |
|---|---|---|
| lic | `tsha1 hwan1` cmt **'sun'**; `hwan1` cmt 'day' | sun = `tsha1 hwan1` ✔ |
| mmd | `la:k8 van1` cmt **'sun'**; `van1` cmt 'day' | sun = `la:k8 van1` ✔ |
| mlm | `thəu5 fan1` cmt **'sun'**; `tət7` cmt 'sun'; `fan1` cmt 'day' | sun = `thəu5 fan1` ✔ |
| shx | `lɔk22 kɔ44` cmt **'sun'**; `lɔ22`, `hau54` cmt 'day' | sun = `lɔk22 kɔ44` ✔ |
| swi | `van1`, **no comment** | sun = **—**, note: "item 168 is glossed 'day' … marks no entry there as 'sun'" |
| peh | `udər`, **no comment** | sun = **—**, note: "left unattested rather than filled with the day word" |
| **kmc** | **`mɐn55`, no comment** | sun = **`mɐn55`** ✗ |

`kmc` also has `128_sky` = `mən55`, nearly the same string, which is a further
reason to be careful with this cell. Under the batch's own stated policy the kmc
SUN cell should be unattested, or the policy should be restated. The note's
silence conceals a deviation that two other notes go out of their way to justify.

### F9 — MEDIUM — `swi`: "unlike the Hlai and Maonan ones" omits two lects that do the same thing

> "SUN is left unattested: item 168 is glossed 'day' and the Sui list, **unlike the Hlai and Maonan ones**, marks no entry there as 'sun'."

The Sui half is correct. But **Mulam** (`thəu5 fan1`, `tət7`, both cmt 'sun') and
**She Haifeng** (`lɔk22 kɔ44` cmt 'sun') also annotate 168 as 'sun', and both are
rows in this same batch. Two named, four exist.

### F10 — MEDIUM — `rbb`: a nationality count is presented as a speaker count

`speakers: "~20K in China (Rumai variety)"` — but the description says "The
De'ang nationality of China numbers **about 20,000**". The same number is doing
duty as (a) the whole De'ang nationality and (b) the speakers of one of its
three varieties. The row's own next sentence says the nationality splits into
Rumai, Bulei and Raojin, so Rumai speakers must be a fraction of 20 000.
(2010 census De'ang = 20 556; 2020 = 22 354. Ethnologue's figure for `rbb`
across China and Myanmar is 139 000.)

**Correction:** either drop "(Rumai variety)" from the speakers field, or source
a Rumai-specific number.

### F11 — HIGH — `kmc` description: two of the nine 1958 tone-letter values are wrong, and the row's own data says so

> "-l for 55, -p for 35, **-c for 11**, **-s for 24**, -t for 13, -x for 31, -v for 53, -k for 453, -h for 33"

Seven are right. `-c` and `-s` are not: Chinese sources on the 1958 侗文方案 give
**-c = 212** (阳平) and **-s = 323** (全阴上). The English Wikipedia table, which
gives "low (11)" and "dipping (24)", appears to be the source of the error.

**The row's own data settles it.** The tone-value inventory of ABVD lang 677 —
the doculect this row is built from, and the Rongjiang-Zhanglu speech the 1958
orthography was designed for — is:

`55 (58×), 323 (30×), 35 (29×), 31 (28×), 212 (26×), 33 (23×), 53 (15×), 13 (14×), 21 (6×), 453 (6×)`

**There is no 11 and no 24 anywhere in the list**, while 212 and 323 are the
second and fifth commonest values. The nine open-syllable tones the description
counts map onto the nine values above exactly once `-c` is read as 212 and `-s`
as 323 — and the coverageNote already cites `ja323` and `ja453` as live forms.

**Correction:** `-c` → 212, `-s` → 323. (`bal` 'fish' and `bav` 'leaf' both check
out.)

### F12 — MEDIUM — `gqu`: the Central-vs-Green contrast is not as clean as stated

> "ABVD tags it giq, Green Gelao, but its own record reads 'This Central Gelao dialect is spoken in Wanzi village (弯子寨), Anshun' and gives the autonym as klau55, where **Green Gelao is the Sanchong and Zhenfeng material with the autonym ha53 kej53 / ha42 ke42**. The tag is the error, not the prose."

Everything quoted from the Wanzi record is exact, and the re-code to `gqu` is
independently supported by the cell scan (40/40 against lang 699). But ABVD's
record for **Sanchong** says, in its own words:

> "**Sanchong Gelao is classified as Central Gelao by Edmondson and Shen**,
> although Ostapirat had classified it earlier as Southwestern Gelao. It is
> spoken in Sanchong village (三冲村), Longlin County, Guangxi, China **by the
> Green Gelao people**. Their autonym is ha53 kej53."

So Sanchong is *both* Central Gelao (by classification) and Green Gelao (by
ethnonym) — "Central Gelao" and "Green Gelao" are not the two sides of one
contrast, they are a subgrouping label and an ethnonym that overlap. The sentence
as written implies the Sanchong and Zhenfeng material is Central-Gelao-excluded,
which ABVD's own note contradicts for Sanchong.

**Correction:** name the actual discriminant — the Wanzi record's *own* label
plus the `klau55` autonym — and drop the claim about what "Green Gelao" is.

### F13 — MEDIUM — `blr`: "Plang matches neither Wa nor Parauk" is too absolute

Plang and Peiros's Wa agree on **dog** (`so.51` / `soʔ`) and **eye**
(`ŋai.33` / `ŋai`); they part on water (`ʔom` / `rɔm`), tooth (`haŋ` / `rhaŋ`)
and blood (`nam` / `nham`). The systematic scan gives Plang 4/32 against Wa and
9/32 against Man'e. The point the sentence is reaching for — Plang is not a
duplicate of the existing Wa row — is sound; "matches neither" is not.

Also worth noting for the same paragraph: Plang's water `ʔom.33`, dog `so.51` and
eye `ŋai.33` match the atlas's **Shwe Palaung** row (`ʔoːm`, `so`, `ŋai`) more
closely than they match Wa. The distinctness argument would be stronger made
against pll than against wbm.

### F14 — MEDIUM — `peh`: "The source marks two vowels with a caron" is false of the source

> "The source marks two vowels with a caron (bǔ 'I', ʨǐ 'thou'); kept as written rather than silently normalised to a plain vowel."

ABVD lang 942 marks at least **four**: `bǔ` (182_i), `ʨǐ` (183_thou), `sǔ`
(122_water) and `iaʥǐ` (56_child). Two is the number *among the cells this row
uses*. As written it is a claim about the source, and it is wrong.

Two related undisclosed steps in the same row: `182_i` reads `bǔ(bə)` in the
source and the cell drops the parenthetical variant without comment; and the
`122_water` alternative the note *does* disclose is `sǔ`, i.e. the caroned form —
so the sentence "the plain sə is used" and the sentence "the source marks two
vowels with a caron" are describing the same pair of forms from two directions
without connecting them.

### F15 — MEDIUM — `peh`: the `tree` cell is a Chinese loan glossed 'stick/wood', undisclosed

`peh` `tree` = **`guaiguŋ`**. In ABVD lang 942 this is `79_stickwood`, with
`Comment` = **"< chinese"** and `Loan` = **true**. The Chinese it renders is
拐棍 *guǎigùn* 'walking stick / cane', not 'tree'.

This is the only tree cell in the ABVD group taken from an entry that is (a) not
annotated 'tree' and (b) flagged as a loan — kmc, lic and mmd all took entries
whose comment explicitly says 'tree'. It also runs against the rule the `kmc`
note states for this batch: "Where the source lists a native and a
Chinese-borrowed form the native one is taken."

**Correction:** unattest the cell, or source a real Bonan word for 'tree' (a
*modun reflex is expected) and cite it. Either way the note must stop being
silent, since it discusses much smaller editorial choices in the same row.

### F16 — LOW — `twm`: a curator mapping attributed to Glottolog

> "**Glottolog files this particular doculect under Dzalakha (dzal1238)** rather than Dakpa, because Dzala and Dakpa are close enough that where one ends and the other begins is disputed."

The mapping lives in `lb2/suntb_languages.csv` (`MamaTshona | Tshona (Mama) |
dzal1238 | dzl`), which is a **Lexibank curator** assignment of a Glottolog code
to a doculect, not a Glottolog editorial decision about this wordlist. The `blr`
note in the same batch gets this attribution right ("the Lexibank curators
tagged"); this one does not. The stated *reason* ("because Dzala and Dakpa are
close enough…") is an interpretation presented as the curators' motive, with no
source.

### F17 — LOW — `jiu pmi twm nuf clk`: "uses the CLDF's own segmentation" is true only for aspirates

> "Aspirates are written as bare digraphs (th, ch) in the source spelling, which the surface keeps; **the IPA column uses the CLDF's own segmentation**, which spells them tʰ and cʰ."

The segmentation is followed for aspirate digraphs and nowhere else. Where the
profile segments a glide, the rows keep the source string:

| row | cell | CLDF `Segments` | atlas ipa |
|---|---|---|---|
| clk hand | `kɑ31tio53` | `k ɑ ³¹ + t **j** o ⁵³` | `kɑ˧˩t**io**˥˧` |
| clk white | `lio53` | `l **j** o ⁵³` | `l**io**˥˧` |
| acn you | `nuaŋ55` | `n **w** a ŋ ⁵⁵` (sagartst) | `n**ua**ŋ˥˥` |

And the digraph inventory is larger than "(th, ch)": the same rows carry `kh`,
`ph`, `tsh`, `tʃh`, `tɕh`, `sh`, `ɕh`. One of those the profile handles
inconsistently and the rows inherit the inconsistency without flagging it:
**nuf** `shə̃ɹ` (ear) → `sʰə̃ɹ`, but **nuf** `shua` (tooth) → `ɕwa`, the same
digraph rendered two ways inside one row.

### F18 — LOW — `mlm`: coverageNote and description disagree on the speaker count

coverageNote / meta: `speakers: "~90K"`. Description: "the language has **on the
order of 100,000 speakers**". The published figure is 86 000 (2005), so the
coverageNote is right and the description is inflated by ~16 %.

### F19 — LOW — undisclosed selections among source alternatives

Small but recurrent: the notes disclose *some* choices between competing source
rows and not others.

| row | cell | source alternatives | disclosed? |
|---|---|---|---|
| rbb | white `Ɂiluj` | `Ɂiluj, luj` | no |
| srh | egg `kako` | `kako` and `tqheem` (tχɵm) | no |
| peh | i `bǔ` | `bǔ(bə)` | no |
| mmd | moon `ni4 njen2` | `ni4 njen2`, `njen2 ta:i6` | partially ("the list offers no simplex" — true, but the second compound goes unmentioned) |
| shx | sun `lɔk22 kɔ44` | day entries `lɔ22` **and** `hau54` | partially (only `lɔ22` named) |
| kmc | stone `pja55` | `pja55`, `ȶin55` | no |
| kmc | night `ɲɐm53` | `ȶan55`, `ȵɐm53` | no |

### F20 — LOW — `blr`: 15-character cap holds for `Value`, not quite for `Form`

> "the CLDF's form field is **hard-capped at fifteen characters across all 10,706 of its rows**"

10 706 rows ✔; `max(len(Value)) == 15` ✔ (78 rows sit at the cap, including the
two this row cares about). But `max(len(Form)) == 16` — one row exceeds it. The
claim is right about the field the argument depends on and wrong about "the form
field" as a phrase.

---

## Numbers audit

Verified locally against the cached CLDF (all exact unless noted):

| claim | row | actual | verdict |
|---|---|---|---|
| "641 rows across 92 of its languages" | dta | **640** rows / 92 languages | **WRONG (count)** — see F6 |
| "all 10,706 of its rows" | blr | 10 706 | ✔ |
| "hard-capped at fifteen characters" | blr | max `Value` len 15 | ✔ (see F20) |
| STONE/SUN "hit the cap" | blr | both exactly 15 chars | ✔ |
| "one of only twelve he does" | acn | exactly 12 params lack an Achang row | ✔ |
| "sixteen doculects" | rbb | 16 | ✔ |
| "no tone on any of its sixteen doculects" | rbb | 0 of 1 584 rows | ✔ |
| "seven cells" (ʨ/ʥ → tɕ/dʑ) | peh | exactly 7 | ✔ |
| "about sixty kinship parameters" | orh | 65 | ✔ |
| "Guang Ka — five kilometres away" | rbb | 5.6 km from the coordinates | ✔ |
| "more than two thousand kilometres west" | dta | ~3 150 km Tacheng–Morin Dawa | ✔ (true, understated) |
| tone table 1=53 2=55 3=11 7=55 8=11 9=53 | lic | ABVD lang 772 notes, verbatim | ✔ |
| tone table 1=11…8=42L/31S | swi | ABVD lang 736 notes, verbatim | ✔ |
| tone table 1=42 2=231…8=23S/24L | mmd | ABVD lang 784 notes, verbatim | ✔ |
| tone table 1=42 2=121…8=12S/11L | mlm | ABVD lang 761 notes, verbatim | ✔ |
| "no cell in this row uses [tone 8 or 9]" | lic | cells use only 1, 2, 3, 7 | ✔ |
| "-c for 11, -s for 24" | kmc | doculect has **no 11 and no 24**; has 212 and 323 | **WRONG** — see F11 |
| "37 of them" (undecided `we` rows) | words/we.js | exactly 37 | ✔ |

### External numbers (web-verified)

Verified against the 2010 and 2020 China census nationality tables (en/zh
Wikipedia agree exactly), Ethnologue-derived figures, and UNESCO records.

**F21 — MEDIUM — the batch silently mixes two censuses.** Twelve of the sixteen
nationality figures are 2010; **Li (~1.6M), Sui (~496K), Maonan (~124K) and
Monpa (~11,000) are 2020 figures**. Only `pmi` ("about 43,000 in the 2010
census") and `mlm` ("~220K, 2010") label the year. So a reader comparing the
three Kam-Sui rows compares Sui-2020 against Mulam-2010 and Dong-2010.

| nationality | 2010 | 2020 | atlas | year used |
|---|---|---|---|---|
| Dong | 2 879 974 | 3 495 993 | ~2.9M | 2010 |
| Gelao | 550 746 | 677 521 | ~550K | 2010 |
| She | 708 651 | 746 385 | ~710K | 2010 |
| Bonan | 20 074 | 24 434 | ~20K | 2010 |
| Oroqen | 8 659 | 9 168 | ~9K | ambiguous, leans 2020 |
| Achang | 39 555 | 43 775 | ~40K | 2010 |
| **Li** | 1 463 064 | **1 602 104** | ~1.6M | **2020** |
| **Sui** | 411 847 | **495 928** | ~496K | **2020** |
| **Maonan** | 101 192 | **124 092** | ~124K | **2020** |
| Pumi | 42 861 | 45 012 | ~43K (labelled 2010) | 2010 ✔ |
| **Monba** | 10 561 | **11 143** | ~11 000 | **2020** |
| Daur | 131 992 | 132 299 | ~132 000 | identical |
| Mulao | 216 257 | 277 233 | ~220K (labelled 2010) | 2010 ✔ |
| Nu | 37 523 | 36 575 | ~37K | 2010 |
| Blang | 119 639 | 127 345 | ~120K | 2010 |
| De'ang | 20 556 | 22 354 | ~20K | 2010 |

**F22 — MEDIUM — speaker/population ratios are computed across a decade or
more.** Several descriptions state a proportion by dividing a 1990s–2000s
speaker count by a 2010 or 2020 population:

- `swi` "well over half of them speak the language": 300 000 (Ethnologue, **2007**) ÷ 495 928 (**2020**) = **60 %**, i.e. "over half". Against the contemporaneous 2010 population it is 73 % and the claim holds. **Currently the phrasing is stronger than the arithmetic supports.**
- `blr` "roughly 68 000 of the 120 000-strong Blang nationality": 68 000 is a **1994–2000** figure against a 2010 population.
- `kmc` "~1.5M speakers": this is the **1990 language census** figure, 36 years old, and other sources put Southern Dong nearer 1 000 000.
- `srh` "most of the people China classifies as its Tajik nationality": 30 000 ÷ 51 069 = 59 %, and 30 000 + the row's own "about 10 000 … speak Wakhi" leaves ~11 000 of the nationality unaccounted for. Published Sarikoli estimates run **16 000–35 000**; the row takes the top of the range. Wakhi-in-China is usually cited well under 10 000, and the usual formulation is that ~¾ of China's Tajiks speak Sarikoli.

**F23 — HIGH — `rbb` "~20K in China (Rumai variety)"** — see F10; the external
check confirms 20 556 is the 2010 De'ang **nationality**, and Ethnologue gives
139 000 for `rbb` across China and Myanmar. There is no reading on which ~20K is
a Rumai speaker count.

**F24 — MEDIUM — `acn` "~30K speakers" against a two-country scope.** The row's
`countries` field is "China (Yunnan: Dehong), Myanmar (Kachin State)" and the
description names the Myanmar Maingtha/Ngochang, but the published figure for
Achang is **60 000 (1990–2007)**; other cites run 33 000–35 000. ~30K is at best
China-only and is not labelled as such.

**F25 — MEDIUM — `nuf` "~9K speakers" against a published 13 000 (2007).**
Nusu dialect figures sum to ~12 000 in China plus ~670 in Myanmar. The atlas
number is 30–40 % below the standard figure with no stated basis. (The
description's "roughly 9,000" repeats it.)

**F26 — LOW — `gqu` "~3K" conflates `gqu` with Gelao as a whole.** The
`gqu`-specific figure is ~2 000 (2011); 3 000 is a 1999 citation; the total
across all four Gelao ISO codes is 5 000–6 000. The description's "the language
has only a few thousand speakers, nearly all elderly" reads as being about
Gelao-in-general while the row is Qau specifically.

**F27 — LOW — `twm` "China ~1.3K" is a 2000-census figure** — the oldest number
in the batch, 26 years stale. The 9 100 / 2 000 / 1 300 / ~12K breakdown is
otherwise exact (Ethnologue: India 2006, Bhutan 2011, China 2000). Separately,
the Monpa nationality figure (~11 000) and the twm speaker figure (~1 300) sit
in the same row without noting that only ~12 % of the nationality speaks this
language — the same conflation the `nuf` and `clk` rows explicitly guard against.

**F28 — LOW — `clk` numbers rest on a self-contradicting source.** The India
figure (11 000) is the **2001** census; the same Wikipedia article's body text
claims "7 000 speakers in China in 1994", seven times the row's "~1K". The atlas
has chosen the more credible number, but the row asserts both figures flatly.

**F29 — LOW — `srh` "the only country where it is spoken".** A Sarikoli-speaking
community in Upper Chitral District, Pakistan is reported. Weakly sourced, but
the description states exclusivity absolutely; a hedge is warranted.

**Verified without qualification** (dates, events, etymologies):

| claim | row | verdict |
|---|---|---|
| Oroqen hunting banned 1996 | orh | ✔ |
| Jino recognised 1979, China's 56th and last nationality | jiu | ✔ (State Council, 6 June 1979) |
| 1763 Qing move of Daur to Ili under the Solon Battalion 索伦营; descendants in Tacheng | dta | ✔ all three |
| Benglong → De'ang renaming 1985 at the group's request | rbb | ✔ (State Council, September 1985) |
| Jingmai Mountain tea forests inscribed by UNESCO 2023 | blr | ✔ (17 September 2023; UNESCO's text names Blang and Dai) |
| Grand Song of the Dong inscribed by UNESCO 2009 | kmc | ✔ (decision 4.COM 13.15, element 00202) |
| Kam has 9 open + 6 checked = 15 tones "by the traditional count" | kmc | ✔ |
| Kam `bal` 'fish', `bav` 'leaf' | kmc | ✔ |
| Sui ~70 initials "in some analyses" | swi | ✔ as hedged |
| shuishu "several hundred characters" | swi | ✔ (usual figure ~500; conservative) |
| Tashkurgan = 'stone fortress' in Turkic | srh | ✔ |
| Anong "a few hundred speakers", nearly extinct | nuf | ✔ (~400 active, 62 fully fluent in 1999) |
| Blang also use Tai Lue; Achang also use Tai Nuea | blr, acn | ✔ both, and correctly *different* Tai languages for the two regions |
| Daur nationality ~132 000 | dta | ✔ (the one figure where the census year is immaterial) |

---

## The `we` routings — all nineteen

Routing is stored in `words/we.js` under `family:`. Batch totals across the whole
atlas: 842 `single`, 253 `clusive`, 37 `unknown`.

| row | routing | what the source records | verdict |
|---|---|---|---|
| kmc | `unknown` | ABVD 677 `185_we`: `tau55`, `ȶiu55`, both unannotated | **defensible for ABVD, likely an understatement for the language** — Kam is standardly described as opposing an inclusive to an exclusive 1PL, and Long & Zheng (the row's own source, in book form) give the pair. The two forms are printed; only the labels are missing. See note below |
| gqu | `unknown` | ABVD 699: one free 1PL `su33 ta33`, unannotated | **defensible.** The note's framing is careful and correct ("not evidence that Gelao lacks the distinction, only that this 210-item list does not record it") |
| shx | `single` | ABVD 771: the source's own comment, "Haifeng She does not distinguish between the two" | **VERIFIED — the strongest-evidenced routing in the batch** |
| peh | `unknown` | ABVD 942: one unlabelled `bədə` | **UNDERSTATED** — `lexibank/rob`, already used for `dta`, gives Baoan `bədə` **and** `mangə`. See **F3** |
| orh | `clusive` | `275_1pli` = `buu`, `276_1ple` = `mir` — the source **does** label them | **routing correct; ordering contradicts the note.** See **F4** |
| acn | `single` | sagartst has only `230_we…inclusive`; suntb gives Achang the **same form** for 我们 and 咱们 (`ŋɔ⁵⁵tuʔ³¹`) | **VERIFIED**, and correctly reasoned — the note is right that Sagart's parameter name is a concept label, not a contrast |
| lic | `clusive` | ABVD 772: `ga` cmt 'inclusive', `fa1` cmt 'exclusive' | ✔ |
| swi | `clusive` | ABVD 736: `ȶən1 ⁿdaau1` 'inclusive', `ȶən1 ⁿdiu1` 'exclusive' | ✔ |
| mmd | `clusive` | ABVD 784: `ⁿda:u1` 'inclusive', `ⁿde1` 'exclusive' | ✔ |
| mlm | `clusive` | ABVD 761: `hɣa:u6` 'inclusive', `niu2` 'exclusive' | ✔ |
| jiu | `clusive` | suntb `971_we` `ŋa³³jo³¹` ≠ `972_weinclusive` `a³³ŋ̊o³³` | ✔ (distinct forms under Sun's 我们/咱们) |
| pmi | `clusive` | `a³⁵rə⁵³` ≠ `ɛ̃³⁵rə⁵³` | ✔ |
| twm | `clusive` | `ŋᴀ¹³rᴀʔ⁵³` ≠ `ŋᴀ¹³tᴀŋ⁵³` | ✔ on the data; **worth a hedge** — East Bodish is not usually described as clusivity-marking, and 我们/咱们 elicitation can surface a plural-vs-collective contrast instead |
| dta | `clusive` | rob: `ba:` (excl.), `bide` (incl.) | ✔; reorder to inclusive-first is disclosed |
| nuf | `clusive` | `ŋɑ³⁵dɯ³¹` ≠ `ɑ⁵⁵iɯ³¹` | ✔ |
| clk | `clusive` | `ŋɑ³⁵ɑ³¹loŋ³⁵` ≠ `ŋɑ³⁵nɑ³¹loŋ³⁵` | ✔ — the contrast is a single morpheme `ɑ³¹` vs `nɑ³¹`, which is what a real clusivity marker looks like |
| blr | `unknown` | peiros: one unlabelled `ʔet.33 ti.31` | **defensible**, and honestly reasoned ("Palaungic marks clusivity — the map's own Shwe Palaung row does — so one unlabelled form records the word without recording the distinction") |
| rbb | *(none)* | deepadungpalaung has **no** 1PL parameter | ✔ — `we` dashed as `unsourced`, correctly distinguished from an unlabelled form |
| srh | *(none)* | iecor has no pronoun parameters at all | ✔ |

**Reverse direction (routed `unknown` where the answer is arguably known):** two
of the four — `peh` (F3, decisive: a dataset in the cache has both forms) and
`kmc` (softer: the two printed forms are the well-known Kam pair, but no cached
source labels them). `gqu` and `blr` are correctly left undecided.

**No row is routed `clusive` or `single` on evidence weaker than a source
annotation or a form identity**, with the single caveat noted for `twm`.

---

## Hedging — both directions

**Hedged where it should be firm**

| row | text | why |
|---|---|---|
| lic | "Norquest's Proto-Hlai reconstruction confirms 1, 2, 3 and 7 for Lauhut independently but gives no value for 8 or 9" | The second clause that matters — "no cell in this row uses either" — is checkable and true; the row buries it behind an unverifiable claim about a book. Lead with the cell fact |
| gqu | "'tree' is not in this wordlist; the other Gelao lists have it but mixing lects inside one row would make the correspondences unreadable" | The firm fact is that ABVD has **no TREE parameter**; the tree cells elsewhere come from `79_stickwood` comments. Say that and the sentence stops sounding like a judgement call |
| acn | "one of only twelve he does" | This is exact and checkable — it deserves the count it has, but "only" spins it: Achang is among the *worst*-covered doculects in sagartst (most languages miss 0–1 parameters) |

**Firm where it should be hedged**

| row | text | why |
|---|---|---|
| dta | "it is the dataset's cognate-set marker … which is inherited rather than borrowed" | F6 — it is a borrowing flag, and the "inherited" verdict is a contested position stated as fact |
| peh | "ABVD has no parameter for either" | F1 — false |
| acn | "The other dataset that carries Achang" | F2 — false |
| peh | "The source marks two vowels with a caron" | F14 — false of the source |
| kmc | "unlike the Hlai, Sui and Mulam rows" | F7 — incomplete |
| swi | "unlike the Hlai and Maonan ones" | F9 — incomplete |
| blr | "Plang matches neither Wa nor Parauk" | F13 — Plang matches Wa on dog and eye |
| twm | "Glottolog files this particular doculect under Dzalakha … because Dzala and Dakpa are close enough that where one ends and the other begins is disputed" | F16 — a Lexibank curator mapping, and an unsourced motive |
| srh | "the only country where it is spoken" | F29 — a Pakistani community is reported |
| shx | "not because this list is short of one" | F5 — the list *is* short of the entry the sibling rows use |
| mmd | "the list offers no simplex" | true, but the second compound `njen2 ta:i6` goes unmentioned |
| kmc | "the corpus already writes tonal surfaces that way (atb yum51)" | true of that cell, but `atb` itself is inconsistent (blood `sui`, fish `nga`, tooth `shwa` carry no digits) — one cell is thin support for "the corpus already" |

---

## Relationship claims — "X is not Y", "closest relative", nationality composition

Checked against Glottolog's actual Newick trees, Ethnologue, and published
classifications (Ostapirat 2005, Norquest 2021, Ratliff 2010, Blench & Post
2011/2014, Chinese 民族语文 sources).

### F30 — MEDIUM — `mmd`: "with Sui next nearest" is wrong under both trees

> "Its closest relative is Chadong, **with Sui next nearest**."

**Chadong VERIFIED**: Glottolog has an explicit node `Maonan-Chadong
[maon1240]` = (Chadong `cdy`, Maonan `mmd`).

**"Sui next nearest" REFUTED**: the parent node `Maonan-Mak-Sui [maon1239]` is a
**flat trichotomy** — Mak-Ai-Cham, Maonan-Chadong, Sui are equally distant. And
Norquest (2021) contradicts the ranking outright: his Para-Sui = (Chadong,
Maonan, Ai-Cham/Mak), with Sui one node *further* out under Greater Sui. Under
either tree the next-nearest is **Ai-Cham/Mak**, not Sui.

**Correction:** "Its closest relative is Chadong; Ai-Cham and Mak are the next
nearest, with Sui further out." Or simply drop the ranking after Chadong.

### F31 — MEDIUM — `twm`: "two mutually unintelligible languages" is three

> "The Monpa nationality of China covers **two mutually unintelligible
> languages**"; "The Monpa of Motuo speak Tshangla, a different language of the
> same family, and the two are not mutually intelligible."

**REFUTED.** The current Chinese account gives **three**: 错那门巴语 (Cuona
Monpa = this row), 仓洛语 / 墨脱门巴语 (Tshangla = `tsj`), and **舍朱奔语
(Shezhubeng)**. Takpa itself is further reported to be mutually unintelligible
with the Monpa of Zemithang and of Mago-Thingbu, so even the Cuona side is not
one lect.

Two things the row gets right and should keep: Tshangla is Bodic but *not*
Bodish (Glottolog `Tshanglic`, sister to Bodish), and "East Bodish … closely
related to Tibetan but not descended from it" is well supported (East Bodish
lacks Old Tibetan innovations — Tib. *bdun* vs Takpa *nis* 'seven'; Tournadre
excludes it from Tibetic). Note though that **Glottolog has no East Bodish node
at all**: Bodish's children are Dakpa-Dzala, Early Old Tibetan and
Phobjib-Chali-Bumthangic, so Dakpa is a sister of Tibetic. That supports the
substance while undercutting "East Bodish" as a unit — the row uses it as a
`family` label.

**Correction:** "covers three mutually unintelligible languages — this East
Bodish one of Cuona, the Tshangla of Motuo (carried separately as tsj), and
Shezhubeng."

### F32 — MEDIUM — `shx`: "not close to any other Hmong-Mien language and usually put on its own branch"

> "Ho Ne is **not close to any other Hmong-Mien language** and is **usually put
> on its own branch**."

**REFUTED.** Glottolog: She `shx` sits in `Ho Neic [hone1239]` = (**Pa Na**,
She), inside `Jiongnai-Ho Ne [jion1235]` = (Ho Neic, **Jiongnai Bunu** `pnu`).
Mao & Li (2002) and Ratliff (2010) hold She to be **most closely related to
Jiongnai**; the group is standardly called **Sheic / She–Jiongnai** (She, Kiong
Nai, Pa Na, possibly Younuo).

What *is* true — and is the interesting fact — is that She is an early split
within Hmongic and is hard to classify because of heavy Sinicization.

**Correction:** "Ho Ne is an early-branching Hmongic language whose nearest
relatives are Jiongnai and Pa Na — the Sheic group — and it is heavily
Sinicized, which is part of why its position was long unclear."

*(Note: ABVD itself carries `Pa-Hng (Gundong)` and `Pa Na`, so the point was
checkable inside the row's own dataset.)*

### F33 — MEDIUM — `clk`: "Tagin" is not a Lhoba language, and "Mishmi group" is stated too flatly

> "The Lhoba nationality is not one people speaking one language: it covers Idu,
> Bokar (a variety of Adi), and Sulong, **Tagin** and others, which belong to
> different branches."

**"Tagin" REFUTED.** Chinese sources on 珞巴族 list **Bokar / Bengni-Bokar
(Tani), Bengru, Idu (Idu-Taraon) and Sulung/Puroik**. Tagin (塔金) appears in no
Chinese listing; the confusable item is **崩尼 Bengni**, a dialect of Bokar.

Everything else in the sentence holds, and Puroik is excellent support for "from
different branches" (Glottolog: Kho-Bwa › Puroikic — genuinely unrelated to
Tani or Digarish).

**Also OVERSTATED — the family label.** `family: "Sino-Tibetan (Digarish, Mishmi
group)"`. Glottolog does give `Digarish [mish1241]` = (Idu, Tawra `mhu`), so the
mainstream label is supported — but **Blench & Post (2011, 2014) and Blench
(2024)** argue Digarish is not a genetic unit at all (Idu–Tawra resemblance from
bilingualism), that Idu may be an isolate or Greater Siangic, and that "Mishmi"
is a cultural label over three languages not demonstrably related. Stating it
flat contradicts the hedging the batch applies elsewhere (`nuf`'s "branch
debated").

**Correction:** replace "Tagin" with "Bengni" or "Bengru"; hedge the family as
"Sino-Tibetan (Digarish; classification disputed)".

### F34 — MEDIUM — `nuf`: dropping Zauzou from the branch gloss misleads

> "The Nu nationality of about 37,000 speaks four mutually unintelligible
> languages: Nusu, the nearly extinct Anong …, Zauzou, and a Derung-like
> variety. The nationality is a single administrative category, not close
> relatives: **Nusu leans Loloish, Anong and the Derung-like variety are
> Nungish**."

**Composition VERIFIED** — Chinese sources give exactly four: 怒苏 Nusu
(~12 000), 柔若/若柔 Zauzou (~2 200), 阿侬 Anong (380 speakers), and the 阿怒
Gongshan Dulong variety (~6 500), with mutual unintelligibility explicitly
stated (阿侬语与怒苏语区别很大) and 阿龙语和独龙语基本相通.

**But the branch gloss has a substantive gap.** Zauzou is not merely unassigned:
Glottolog places **Zauzou `zal` and Nusu `nuf` together in `Nusoish
[nuso1234]`** under Loloish, and the standard Chinese classification likewise
calls both 彝语支. So the sentence names three of the four and silently drops
**the one language that is Nusu's own closest relative and leans the same way**.
The rhetorical point — "not close relatives" — is weakened by the omission, not
strengthened.

**And "whether its branch is Loloish or Nungish is debated"** (description and
`family` field) is **weakly supported**: Glottolog and the standard Chinese
classification both say Loloish without hedging. The debate exists in the older
literature, but the row presents it as live.

**Correction:** "…Nusu and Zauzou lean Loloish — they are in fact each other's
closest relatives — while Anong and the Derung-like variety are Nungish."

### F35 — LOW — `srh`: "Shughni and Rushani" double-counts

> "Its closest relatives are **Shughni and Rushani**"

Rushani is **not a coordinate language**: in both Glottolog and ISO it is a
dialect *inside* Shughni `sgh` (`Roshani-Khufi [rosh1238]` = Khufi, Rushani).
Glottolog `Shughnic [shug1253]` = (Old Wanji, Sarikoli `srh`, Shughni `sgh`), so
Sarikoli's living nearest relative is Shughni, full stop; its other sister is the
extinct Old Wanji.

The rest of the sentence is solid: Wakhi `wbl` sits under **Saka-Wakhi
[saka1303]**, an entirely different node from Shughni-Yazgulami; "Pamir" is
areal, not genetic; non-intelligibility is uncontroversial. And the headline
claim — Sarikoli is not the Tajik of Tajikistan, Eastern vs Western Iranian, not
mutually intelligible — is **VERIFIED**.

**Correction:** "Its closest relative is Shughni (of which Rushani is a
dialect)."

### F36 — LOW — `mlm`: both halves of the relationship sentence are shaky

> "**Mulam is the Kam-Sui language nearest to Kam itself**, and **roughly two
> thirds of its vocabulary is shared with Zhuang and Kam**."

**First half: VERIFIED under Glottolog only.** `Mulam-Kam [mula1252]` = (Kamic,
Mulam `mlm`) makes Mulam Kam's sister ✓. But **Norquest (2021) puts Mulam at the
first split of the entire family** (Kam-Sui = Mulam vs Northern Kam-Sui), under
which Mulam is equidistant from Kam and everything else. The claim is a Glottolog
artefact, not consensus.

**Second half: UNVERIFIABLE.** The figure traces to a single sentence on the
English Wikipedia Mulam article — "65% of its vocabulary is shared with the
Zhuang and Dong languages" — carrying a **[citation needed]** tag. No published
source found. It is also 65 % with Zhuang *and* Dong jointly, not two-thirds with
each, which is how the atlas sentence reads.

**Correction:** attribute or drop the 65 % figure; hedge the first half
("Glottolog makes Mulam the sister of Kam; Norquest instead splits it off first").

### F37 — LOW — `blr`: "Its closest relative is Samtao" is defensible but not settled

**VERIFIED per Glottolog**: `Bulangic [bula1260]` = (Blang `blr`, Samtao `stu`),
inside Waic. Three caveats the sentence does not carry:

1. The node has exactly two members, so "closest" is near-vacuous.
2. **Ethnologue classifies `stu` as Palaungic › Eastern Palaungic › Angkuic** —
   under which Blang's nearest relatives would be Wa/Lawa, not Samtao.
3. English Wikipedia's Blang article says outright that Samtao is a *dialect of*
   Blang, i.e. arguably a variety rather than a sister language.

**"belongs to the Waic side of Palaungic along with Wa (wbm), Parauk (prk) and
Eastern Lawa (lwl)": VERIFIED.** `Waic [waic1245]` = (Bulangic, Wa-Lawa), with
`wbm` = nucl1290 and `prk` = para1301 in Nuclear Waic and `lwl` = east2330 in
Lawa. Minor precision: Blang sits in Bulangic, the **sister** of Wa-Lawa, so all
three named languages are on the *other* primary branch of Waic — "along with"
slightly flattens that.

### F38 — LOW — `gqu`: "sister to the Tai and Kam-Sui branches" omits two branches, and the ISO name is not "Qau Gelao"

> "Gelao belongs to the Kra branch of Kra-Dai — the family's most divergent arm,
> **sister to the Tai and Kam-Sui branches rather than a member of either**."

**Kra membership VERIFIED**: Glottolog Tai-Kadai › `Kadaic [kada1291]` (= Kra) ›
… › `Gelaoic [gela1265]`, and Kadaic is outside Kam-Tai ✓.
**"Most divergent arm" supported** by Ostapirat (2005), whose primary
bifurcation is Kra vs Dai.
**"sister to the Tai and Kam-Sui branches" is too narrow**: under Ostapirat, Kra
is sister to **Hlai and Be as well**. And Glottolog's own top level is a flat
trichotomy (Hlaic, Kadaic, Kam-Tai) that privileges nothing. Given that this
atlas carries Hlai as its own row (`lic`) — and describes it there as "a primary
branch of Kra-Dai, a sister to Tai, Kam-Sui **and Kra**" — the two descriptions
contradict each other on the same tree.

**ISO naming, for the coverageNote**: Ethnologue's name for `gqu` is **"Qau"**
(not "Qau Gelao"), China, Anshun City and Pingba County, Guizhou, also known as
Central Gelao / Sinicized Gelao. `giq` = "Gelao, Green" ✓ (the note's gloss of
ABVD's tag is right). `giw` is Ethnologue **"Duoluo"**, White Gelao being a
common name rather than the ISO one.

**The re-code itself is CONFIRMED**: Glottolog's `Central Gelao-Qau [qaua1234]
[gqu]` has exactly the children *Qau* and **Wanzi Gelao**. The row is filed
correctly; only the surrounding prose needs adjusting (see also F12).

### Relationship claims that survived intact

| claim | row | verdict |
|---|---|---|
| "Sarikoli is not the Tajik of Tajikistan: Tajik proper is Western Iranian and close to Persian, Sarikoli is Eastern Iranian, and the two are not mutually intelligible" | srh | **VERIFIED** |
| "Wakhi … belongs to a different branch of Eastern Iranian and is not mutually intelligible with Sarikoli" | srh | **VERIFIED** (Saka-Wakhi, a separate node; "Pamir" is areal) |
| "Idu is … not 'the Lhoba language'"; the Lhoba nationality covers unrelated branches | clk | **VERIFIED** (Puroik is Kho-Bwa, Bokar is Tani, Idu is Digarish) |
| "The Nu nationality speaks four mutually unintelligible languages" | nuf | **VERIFIED** (composition and unintelligibility both) |
| "Blang … belongs to the Waic side of Palaungic along with Wa, Parauk and Eastern Lawa" | blr | **VERIFIED** |
| "Maonan's closest relative is Chadong" | mmd | **VERIFIED** |
| "Mulam is the Kam-Sui language nearest to Kam" | mlm | **VERIFIED under Glottolog** (see F36) |
| "The Motuo Monpa … is Tshangla and is a separate row (tsj)" | twm | **VERIFIED** |
| "East Bodish … closely related to Tibetan but not descended from it, so Monpa is a cousin of Tibetan rather than a dialect" | twm | **VERIFIED** |
| "Central Gelao (Qau/Klau) as recorded at Wanzi near Anshun" = `gqu` | gqu | **VERIFIED** (Glottolog qaua1234 has Wanzi Gelao as a child) |
| "Taoba belongs to the northern dialect despite lying in Sichuan … so it is pmi, not pmj" | pmi | **VERIFIED** (Northern Pumi ≈ 55 000, matching `pmi`'s scope) |
| "Achang is one of the closest living relatives of Burmese" | acn | **VERIFIED** (Burmish) |
| "Hlai is one of the primary branches of Kra-Dai, a sister to Tai, Kam-Sui and Kra" | lic | **VERIFIED** — and note this is the formulation `gqu` should match (F38) |

---

## Summary

**48 absence claims examined.** 38 verified, **6 refuted**, 3 verified-but-
misleading, 1 unverifiable.

Refuted: **A11** (peh, "ABVD has no parameter for bird or stone"), **A21** (acn,
"the other dataset that carries Achang"), **A32** (dta, "the dataset's
cognate-set marker … 641 rows"), **A15** (peh, "the source marks two vowels with
a caron"), **A5** (kmc, ȶ/ȵ contrast set), **A26** (swi, "unlike the Hlai and
Maonan ones"). Verified-but-misleading: **A9/A29** (shx, mlm, "ABVD has no TREE
parameter at all"), **A14** (peh, `we`), **A44** (blr, "matches neither").

**19 doculect identifications examined.** All 19 confirmed, most by a factor of
two or more over the runner-up, four of them at 100 %. **No second Gelao-style
mis-coding survives.** The one identity problem left is the reverse kind: `acn`
treats suntb's Achang as a different doculect when it is the same one (F2).

**19 `we` routings examined.** 15 sound, 1 (`peh`) understated on evidence
already in the cache, 1 (`orh`) correctly routed but printed in an order that
contradicts the column's own convention, 1 (`kmc`) defensible but probably
understated, 1 (`twm`) routed `clusive` on data that would benefit from a hedge.
No row is routed `clusive` or `single` on evidence weaker than a source
annotation or form identity.

**11 relationship claims examined.** 3 refuted or effectively refuted (`twm`
"two languages" → three; `shx` "own branch" → Sheic/Jiongnai; `mmd` "Sui next
nearest"), 1 with a factual slip (`clk` "Tagin"), 4 overstated (`clk` Mishmi,
`nuf` Zauzou omission, `srh` Rushani, `gqu` "sister to Tai and Kam-Sui"), 3
sound.

**~40 numbers examined.** Every locally checkable count is exact except one:
`dta`'s **641 → 640**. Externally, one linguistic table is wrong (`kmc`'s
1958 tone letters `-c` and `-s`, contradicted by the row's own tone inventory),
one figure is a category error (`rbb`'s "~20K in China (Rumai variety)" is the
whole De'ang nationality), one description contradicts its own coverageNote
(`mlm` 100 000 vs ~90K), and the batch silently mixes 2010 and 2020 census years
across sixteen nationality figures.

### Ranked

**HIGH**
1. **F1** `peh` — "ABVD has no parameter for either" (bird, stone): false.
2. **F2** `acn` — "the other dataset that carries Achang": false; suntb has the same doculect *with* eye and night.
3. **F6** `dta` — `bor` is a borrowing flag, not a cognate-set marker; 640 not 641; "inherited rather than borrowed" is contested.
4. **F8** `kmc` — SUN cell is the unannotated 'day' word, breaking the rule `swi` and `peh` state explicitly; note is silent.
5. **F11** `kmc` — 1958 tone letters `-c` and `-s` are wrong (212 and 323), disproved by the row's own tone inventory.
6. **F3** `peh` — `we` routed `unknown` while `lexibank/rob`, already in use for `dta`, records `bədə` / `mangə`.
7. **F15** `peh` — `tree` = `guaiguŋ` is 拐棍 'walking stick', flagged `Loan=true` and glossed 'stick/wood', undisclosed.
8. **F10 / F23** `rbb` — "~20K in China (Rumai variety)" is the De'ang nationality count.

**MEDIUM**
F4 (`orh` ordering vs convention) · F5 (`shx`/`mlm` tree reason, five treatments of one situation) · F7 (`kmc` ȶ/ȵ set) · F9 (`swi` sun set) · F12 (`gqu` Central-vs-Green) · F14 (`peh` caron count) · F21 (mixed census years) · F22 (cross-decade ratios) · F24 (`acn` speakers) · F25 (`nuf` speakers) · F30 (`mmd` "Sui next nearest") · F31 (`twm` two → three) · F32 (`shx` own branch → Sheic) · F33 (`clk` Tagin, Mishmi) · F34 (`nuf` Zauzou)

**LOW**
F13 · F16 · F17 · F18 · F19 · F20 · F26 · F27 · F28 · F29 · F35 · F36 · F37 · F38

### What held up

Worth recording, because the batch is mostly right and precise: every tone table
matches its ABVD source verbatim; the 15-character cap, the 10 706 rows, the
twelve missing Sagart parameters, the seven ligature cells, the sixteen
tone-less doculects, the 65 kinship parameters, the 37 undecided `we` rows, the
5 km to Guang Ka, `mmd`'s reading of the misplaced loan flag on `kwa3`, `dta`'s
two-acute observation and its `í/i` profile segmentation, `blr`'s catch of the
profile contradicting itself on `nh` vs `lh`/`mh`, `blr`'s catch of the
curator-mistagged `Wa` doculect, `twm`'s small-capital ᴀ restoration and the
stray table-rule after 'five', `shx`'s reading of the source's own
does-not-distinguish note, `mlm`'s eye/moon/sun annotation choices, `lic`'s two
homophone pairs — all exactly as described. The failures cluster in sentences
that generalise from one doculect to a whole dataset, and in sentences that
enumerate a contrast set.
