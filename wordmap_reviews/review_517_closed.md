# Review pass 10 — what a reader sees, and whether the derived files agree

Scope: `kmc gqu shx peh orh acn lic swi mmd jiu pmi twm dta mlm nuf clk blr rbb srh`
Repo: `/home/jounlai/langmap` at HEAD `2a71de14`.
Lens: rendered output vs source of truth; prose vs cells; pins; labels; dashes; LANG_CODES.md.

**Working-tree caveat (read first).** Mid-pass the tree was *not* clean — `M wordmap_meta.js`,
`M namemap_data.js`, another thread part-way through yue/ko/ar/zh description edits — and
`node tools/check_all.js` reported 4 failures (`meta split freshness 4`,
`data/*_seo.json freshness 1`, and the two asset-version guards). **All four were artefacts of
that uncommitted work, not defects.** That work has since landed as `614b0a9c`, and every
generator's `--check` is now `stale: 0` (`build_meta_split`, `export_seo_data`,
`build_lang_words`, `build_lang_names`, `generate_lang_codes_md`) with `asset_version_check`
clean. §1 below holds at both `2a71de14` and `614b0a9c`. If you see those four guards fail
again, check `git status` before chasing them.

---

## §1 — Generated artifacts vs source

**1. NOTE — every generated artifact is byte-identical to a regeneration from source, at HEAD.**
`lang_words/<code>.js`, `meta_desc/<code>.js`, `wordmap_meta_lite.js`, `lang_names/<ui>.js`,
`data/wordmap_seo.json`, `data/meta_i18n_seo.json` and `docs/words/LANG_CODES.md` all match.
All nineteen codes are present in every one of them; none is present in one and missing from
another; no `giq`-named file survives anywhere (`lang_words/giq.js`, `meta_desc/giq.js` are gone).
The only `giq` string left in shipped code is the deliberate one inside `gqu`'s coverageNote
("ABVD tags it giq, Green Gelao"), which is correct prose. No action.

**2. BLOCKER — `lang_names.js:2254` (and every file generated from it) still labels `gqu`
"Green Gelao" in all 19 UI languages. This is the un-finished half of the `giq` → `gqu` re-code,
and it is the single most visible defect in the batch.**

* `wordmap_data.js:1088` — `gqu: { name: 'Central Gelao (Qau)', native: 'Klau', … }`
* `wordmap_meta.js:51` — `iso6393:'gqu'` (Qau = Central Gelao)
* `gqu.coverageNote` — *"This row is filed under the Qau (Central Gelao) code because that is
  what the list is — ABVD tags it giq, Green Gelao, but its own record reads 'This Central Gelao
  dialect is spoken in Wanzi village (弯子寨), Anshun' … **The tag is the error, not the prose.**"*
* `lang_names.js:2254` — `gqu: { en: 'Green Gelao', ja: '緑仡佬語', ko: '녹거라오어',
  zh: '绿仡佬语', yue: '綠仡佬語', vi: 'Tiếng Cờ Lao Xanh', th: 'ภาษาเกอลาวเขียว',
  id: 'Bahasa Gelao Hijau', hi: 'हरी गेलाओ', de: 'Grün-Gelao', fr: 'Gelao vert',
  it/es/pt: 'Gelao verde', ru: 'Зелёный гэлао', uk: 'Зелений ґелао',
  ar: 'الغيلاو الخضراء', he: 'גלאו הירוקה', sw: 'Kigelao cha Kijani' }`

`wordmap.html:5534` `getDisplayName()` and `:7631` `renderLangInfo()` both do
`names[code] || lang.name` — **the lang_names label wins over `wordmap_data.name`.** So the map
pin, the popup `<h2>`, the compare table and the SEO page (`seo/wordmap.php:45`, same precedence)
all print **"Green Gelao"** — the exact identification the row's own coverageNote calls an error —
next to a native form `Klau` and a description that opens on the macrolanguage and says
"This row is Central Gelao (Qau/Klau) as recorded at Wanzi near Anshun".
`data/wordmap_seo.json` is internally self-contradictory in one object:
`"name":"Central Gelao (Qau)"` beside `"names":{"en":"Green Gelao", …}`.

Correction: rewrite the `gqu` entry in `lang_names.js` to Central Gelao / Qau in all 19 UI
languages (en `Central Gelao (Qau)`, zh `中部仡佬语（多罗）`/`仡佬语（哈给方言以外）` — pick one and
apply the same qualifier everywhere), then rerun `tools/build_lang_names.js`,
`tools/export_seo_data.js` and `tools/generate_lang_codes_md.mjs`.
Affected generated files: `lang_names/{en,ja,ko,zh,yue,vi,th,id,hi,de,fr,it,es,pt,ru,uk,ar,he,sw}.js`,
`data/wordmap_seo.json` (`langs.gqu.names`), `docs/words/LANG_CODES.md:387`.
Also fix the stale comment `validate_wordmap_data.js:911` ("gqu.{…} — Green Gelao").

**3. NOTE — `data/wordmap_seo.json` drops `coverageNote`, `surfaceType` and `pronunciationType`
from `langs.<code>.meta` for all 1187 rows** (`tools/export_seo_data.js:428` keeps only
family/speakers/countries/official/script/region/vitality/aliases/glottocode/iso6393/description/sources).
For these nineteen that is a real loss: the coverageNote is where every one of them explains what
the digits after each form mean, so the SSR page shows tone-category digits with nothing to read
them by. Not a regression introduced here; flagged because this batch is the one that needs it.

**4. NOTE — `meta.region` is the empty string for all 1187 rows**, so
`seo/wordmap.php:90`'s Region chip never renders. Global, not batch-specific.

---

## §2 — Prose vs cells

**5. BLOCKER — `kmc` — the description prints a nine-value tone table that does not describe
this row's doculect. Three tone values in the cells are absent from it, and two values in it
occur in no cell.**
`wordmap_meta.js` `kmc.description.en`: *"nine tones on open syllables and six on checked ones…
**-l for 55, -p for 35, -c for 11, -s for 24, -t for 13, -x for 31, -v for 53, -k for 453,
-h for 33** — so bal is 'fish' and bav is 'leaf'."* That table is the generic Kam table from
English Wikipedia.
The cells (`words/*.js`, `kmc`) carry: 13, 21, 212, 31, 323, 33, 35, 453, 53, 55.
ABVD list 677 — the row's own source, "Long Yaohong & Zheng Guoqiao", Rongjiang-Zhanglu dialect —
uses exactly that set. So:

* `11` and `24` appear in the prose and in **no cell**;
* `212` (8 cells: wind, i, you, tongue, hand, house, salt, sleep), `323` (3 cells: two, bone,
  hundred) and `21` (bird) appear in the cells and in **no prose slot**.

A reader who tries to spell a cell in the orthography the paragraph just taught cannot: there is
no tone letter for 212. Correction: give the Long & Zheng Rongjiang values (…212 and 323 in the
-c and -s slots), or drop the letter-by-letter table and say only that the orthography marks tone
with a final consonant letter.

**6. BLOCKER — `peh` — the coverageNote asserts something about ABVD that the atlas's own
sibling rows disprove.**
`peh.coverageNote`: *"bird and stone are not in this list — **ABVD has no parameter for either**"*.
ABVD's questionnaire is 210 items and does contain both — item 97 `bird`, item 120 `stone`
(verified on `abvd.eva.mpg.de/austronesian/language.php?id=699`), and seven rows in this very
batch fill them from ABVD: `kmc` stone `pja55` / bird `mok21`, `gqu` stone `əɯ33` / bird `ntau31`,
`shx` stone `ŋa22` / bird `lɔ54`, plus `lic`, `swi`, `mmd`, `mlm`.
Correction: *"the Bonan list leaves both empty"* — the parameters exist, Liu Zhaoxiong's list
does not fill them.

**7. BLOCKER — three rows say ABVD has no TREE parameter "at all"; four rows in the same batch
fill TREE from ABVD; and a fifth gives a fourth, incompatible reason. Five ABVD-sourced rows,
three mutually contradictory explanations, all reader-visible in adjacent popups.**

| row | tree cell | what the coverageNote says |
|---|---|---|
| `shx` | `—` | "TREE is unattested because **ABVD has no TREE parameter at all** — its run goes stick/wood, branch, leaf, woods/forest" |
| `mlm` | `—` | "TREE is unattested because **ABVD has no TREE parameter at all** — its run goes stick/wood, branch, leaf, woods/forest" |
| `gqu` | `—` | "'tree' is not in this wordlist; **the other Gelao lists have it** but mixing lects…" |
| `kmc` | `mɐi31` | silent |
| `peh` | `guaiguŋ` | silent |
| `lic` | `tshai1` | silent |
| `swi` | `mai4` | "TREE comes from item 113, 'branch pe5 mai4', which the source annotates 'mai4 = tree'" |

`gqu`'s "the other Gelao lists have it" directly contradicts `shx`/`mlm`'s "no TREE parameter at
all". Correction: state the single true fact once — ABVD has no `tree` item, so where a row has
`tree` it was read off `stick/wood` or `branch` on the source's own annotation — and say per row
which item was used, or dash it.

**8. FIX — `kmc` and `gqu` silently fill SUN from ABVD's unannotated `day` item, which
`peh`, `swi` and `blr` explicitly refuse to do, in the same batch.**
ABVD list 677 has no `sun` item; item 168 is `day`, value `mɐn55` → `kmc.sun = mɐn55`.
ABVD list 699 (Wanzi Gelao) likewise has **no `Sun` entry**; `gqu.sun = sen44` comes from `day`.
Meanwhile:
* `peh.coverageNote`: *"neither is SUN: ABVD's item 168 is 'day', udər … so that cell is left
  unattested rather than filled with the day word"* → `peh.sun = —`
* `swi.coverageNote`: *"SUN is left unattested: item 168 is glossed 'day' and the Sui list, unlike
  the Hlai and Maonan ones, marks no entry there as 'sun'"* → `swi.sun = —`
* `lic`, `mmd`, `mlm`, `shx` all say their SUN is an entry the source *annotates* 'sun'.

So the batch has an explicit policy and two rows break it without saying so. Correction: either
dash `kmc.sun` and `gqu.sun`, or state in both notes that the day word is used and why.

**9. FIX — `jiu`, `pmi`, `nuf`, `clk` — the shared Sun-Hongkai boilerplate names a phoneme series
none of their cells contains.**
All five suntb rows carry the identical sentence: *"Aspirates are written as bare digraphs
(th, ch) in the source spelling, which the surface keeps; the IPA column uses the CLDF's own
segmentation, which spells them **tʰ and cʰ**."*
Grepping `lexibank/suntb` `cldf/forms.csv`: `cʰ` occurs **26 times in MamaTshona (`twm`) and
0 times in Jinuo, TaobaPumi, BijiangNusu and Idu.** The cells agree — `twm` has `cʰi`, `cʰem`,
`cʰer`, `cʰɛʔ`; the other four have none. Correction: keep the sentence on `twm`; on the other
four say only "…which spells them tʰ, kʰ, pʰ, tsʰ, tʃʰ, tɕʰ" (whichever that row actually shows),
or drop the enumeration.

**10. FIX — `rbb` — `speakers` contradicts the row's own description.**
`wordmap_meta.js`: `speakers:'~20K in China (Rumai variety)'`.
`rbb.description.en`: *"The De'ang nationality of China numbers about 20,000 … Their speech falls
into **three** main varieties … Rumai, Bulei and Raojin. This row is Rumai."*
Rumai cannot be 20K if the whole nationality — split three ways — is 20K. The popup shows both
strings a few lines apart. (2010 census: De'ang 20,556 total.)
Correction: `speakers:'~20K (De'ang nationality; Rumai is one of three varieties)'`, or a real
Rumai figure. Also fix `docs/words/LANG_CODES.md:884`, which inherits the string.

**11. FIX — `mlm` — `speakers` says `~90K`, the description says "on the order of 100,000".**
`wordmap_meta.js` `speakers:'~90K (Mulam nationality ~220K, 2010)'` vs
`mlm.description.en`: *"the language has on the order of 100,000 speakers"*. Two numbers, one
popup. Pick one. (`LANG_CODES.md:666` carries the `~90K`.)

**12. FIX — `swi` — the map's native label `Aiʳ Sui³` contains a superscript ʳ (U+02B3) that
nothing in the row explains, and mixes a superscript digit with the cells' plain digits.**
`wordmap_data.js:` `swi: { … native: 'Aiʳ Sui³', … }`. The Sui autonym is /ʔai³³ sui³³/;
this row's own tone table gives category 3 = 33. The `ʳ` is almost certainly a corrupted `³`.
Every other native field in the nineteen is plain Latin. Rendered in native-label mode on the map
and on the native line of every `swi` popup.
Correction: `Ai³ Sui³` (matching the cells' digit convention) or plain `Ai Sui`.

**13. FIX — `gqu` — the surface keeps the source's ASCII apostrophe for aspiration and the
coverageNote never says so, while its sibling from the same source says the opposite.**
Cells: `mother ["p'ɒ44","pʰɒ˦˦"]`, `tongue ["p'i55 te24","pʰi˥˥ te˨˦"]` — apostrophe kept in the
surface, expanded in the IPA.
`shx.coverageNote` (same ABVD source, same builder): *"The source writes aspiration with an ASCII
apostrophe (k'ua54); **both fields normalise it** to the IPA diacritic"* — and `shx`'s surface is
`kʰua54`.
`kmc` does a third thing: surface `kha35`/`phat13`, IPA `kʰa˧˥`/`pʰat˩˧` — digraph in the surface,
undocumented.
Three conventions for one phenomenon in one batch, one of them explained. Correction: state
`gqu`'s and `kmc`'s choice in their notes, or normalise to `shx`'s.

**14. FIX — `pmi` and `nuf` — the IPA column carries characters that are not IPA and that the
source's own segmentation resolves. `pronunciationType` on both rows is `'ipa'`.**

| row | cell | atlas IPA | suntb `Segments` |
|---|---|---|---|
| `pmi` | iron | `ɕī˥˥` | `ɕ ī/i ⁵⁵` → **i** |
| `pmi` | sun | `bu̵˥˧` | `b ʉ ⁵³` → **ʉ** |
| `pmi` | snow | `pu̵˥˧` | `p ʉ ⁵³` → **ʉ** |
| `pmi` | tooth | `ʂu̵˥˧` | (same profile) → **ʉ** |
| `nuf` | stone | `lu̱˥˧` | `l u̠/u ⁵³` → **u** |
| `nuf` | drink | `ɕʰu̱˥˥` | `ɕʰ u̠/u ⁵⁵` → **u** |
| `nuf` | sleep | `iɔ̱˥˧ɔ˧˩` | `i ɔ̠/ɔ ⁵³ + ɔ ³¹` → **ɔ** |

`ī` (U+012B), `u̵` (U+0335 overlay) and `u̱`/`ɔ̱` (U+0331 macron below) are Sinological
tenseness/length marks, not IPA. `dta` does exactly this class of clean-up and documents it
("The acute in sí 'you' and sídə 'tooth' … is dropped in the IPA"). Correction: apply the CLDF
segmentation in the IPA column (`ɕi˥˥`, `bʉ˥˧`, `pʉ˥˧`, `ʂʉ˥˧`, `lu˥˧`, `ɕʰu˥˥`, `iɔ˥˧ɔ˧˩`),
keeping the raw glyphs in the surface field; or say in each note that they are kept and what
they mark.

**15. NOTE — `peh` — the IPA column carries carons `bǔ` (U+01D4) and `tɕǐ` (U+01D0).**
The coverageNote does declare it (*"The source marks two vowels with a caron (bǔ 'I', ʨǐ 'thou');
kept as written rather than silently normalised"*), and `pronunciationType:'broad'` softens the
claim — but a reader still sees a pinyin third-tone caron in a column headed IPA. Either say what
it marks, or drop it from the IPA field only.

**16. NOTE — `nuf` — the same digraph `sh` renders two different ways in one row and nothing
says why.**
`tooth ["shua55","ɕwa˥˥"]` (sh → ɕ, and `ua` → `wa`) vs `ear ["n̥ɑ55shə̃ɹ35","n̥ɑ˥˥sʰə̃ɹ˧˥"]`
(sh → sʰ); plus `drink ["ɕhu̱55","ɕʰu̱˥˥"]` (ɕh → ɕʰ). The row is faithful — the suntb profile
really does segment `shua` as `ɕ w a` and `shə̃ɹ` as `sʰ ə̃ ɹ` — but nothing in the coverageNote
covers `sh`, only `th`/`ch`, so it reads as an atlas slip. Add a sentence.

**17. NOTE — `nuf` — two rhotic symbols in one row.** `name m̥ə̃ʴ˧˥` (U+02B4) vs
`ear sʰə̃ɹ˧˥` (U+0279). Source-faithful (suntb has both), undocumented.

**18. NOTE — `clk` — `four` is the only cell in the row with a Latin `r`; every other cluster
uses `ɹ`.** `words/four.js:603` `clk: ["kɑ31prɯi55", "kɑ˧˩prɯi˥˥"]` against
`kɹu`, `bɹɑ`, `mɹu`, `pɹɑ` elsewhere. The suntb source has the same inconsistency
(`914_four kɑ³¹prɯi⁵⁵` but `924_fourteen ho⁵⁵lo⁵⁵pɹɯi⁵⁵` — the same morpheme with `ɹ`), so this
is a source typo copied through. Correction: `pɹɯi` in both fields, or a note.

**19. NOTE — `twm` — `father` keeps a stray lowercase `a` the note's own cleanup rule would
have removed.** `["ʔaᴀ55pᴀ53","ʔaᴀ˥˥pᴀ˥˧"]` against `mother ["ʔᴀ55mᴀ53", …]`. suntb's own
`331_fatherinlaw` is `ʔᴀ⁵⁵pᴀ⁵³` — the same word without the stray `a`. The coverageNote advertises
exactly this class of fix (*"where the file prints a Latin capital A for it (in 'egg') the row
restores the small capital, and a stray table-rule '|' after 'five' is dropped"* — both verified
correct against the CLDF), so leaving `father` untouched looks arbitrary.

**20. FIX — all nineteen carry `surfaceType:'romanization'`, which the popup renders as
"Surface: romanization" (`wordmap.html:7477`), but not one of their surface columns is a
romanization.**
Twelve of them declare `script:'Unwritten'` in the same popup, and their own notes call the
content *"Long & Zheng's phonemic transcription"* (`kmc`), *"Liu Zhaoxiong's transcription"*
(`peh`), *"the Wanzi list"* (`gqu`), *"an Altaicist Latin"* (`dta`), IPA-plus-tone-category-digit
(`lic`/`swi`/`mmd`/`mlm`). `SURFACE_TYPE_LABEL` already has the right value — `'phonetic'`,
"phonetic transcription" — and **zero rows in the atlas use it.** The only other five
`romanization` rows (`tlh`, `jbo`, `kl`, `esu`, `mra`) all have genuine Latin orthographies.
Correction: set `surfaceType:'phonetic'` on the nineteen. (`srh` is the one arguable keep —
its surface really is IE-CoR's romanization.)

**21. NOTE — `lic` — the popup says `Script: Latin (1957 scheme, limited use)` and the cells are
not in that scheme, and unlike `kmc` the note never says so.**
`kmc.coverageNote` is explicit: *"The 1958 Latin orthography is described above but not used in
the cells, because the source does not give it."* `lic.description.en` says *"A Latin orthography
was devised in 1957 on the basis of the Ha (Baoding) variety, and this row gives the Baoding
lect"* — a reader can easily take the cells for that orthography. Add `kmc`'s disclaimer to `lic`.

**22. NOTE — `srh` — `three` is the only surface form in the nineteen beginning with a
right single quote.** `["’aroy","haɾoj"]` — U+2019 in the surface where the IPA has `h`.
Every other srh surface↔IPA pair is a plain letter correspondence; the coverageNote documents
only the tie-bar removal. Worth confirming against IE-CoR whether the romanization really is
`'aroy`, and if so saying that the apostrophe writes /h/.

**Verified clean (no finding):**
* Every tone-category table in `lic`, `swi`, `mmd`, `mlm` converts correctly in every cell,
  including the vowel-length splits of categories 7 and 8. `lic`'s claim that no cell uses
  category 8 or 9 is true.
* Every specific form named in a coverageNote is in the cell it names —
  `shx` four/tongue `pi35`, `shx` we `le31 pa22` vs three `pa22`, `lic` dog/five `pa1` and
  hand/2sg `meɯ1`, `lic` we `ga / fa1` toneless-first, `mmd` moon `ni4 njen2` / mother `ni4`,
  `mmd` eat = drink `na4`, `mmd` white `kwa3`, `gqu` red = blood `plɒ24`, `orh` mother `ənin` /
  father `amɪn` and we `buu / mir`, `acn` black `lɔk55`, `peh`'s seven ligature cells,
  `dta`'s č/ǯ/y/macron/colon/hyphen rules and the bird/tooth `bor` trim,
  `twm`'s ᴀ restoration in `egg` and the `|` drop after `five`,
  `blr`'s nh→n̥ / lh→l̥ / kh→kʰ / ć→tɕ.
* `blr`'s truncation claim checks out exactly: `lexibank/peirosaustroasiatic` has 10,706 rows,
  `Value` is capped at 15 characters, and Plang's stone/sun are the 15-char strings
  `ʔuk.31 sa.31 mu` / `ŋai.31 sa.31 ŋi`.
* `srh`'s claims about IE-CoR check out: the 170-concept list
  (`lexibank/iecor/cldf/parameters.csv`) contains **no pronoun and no kinship concept** — so
  I/you/we/mother/father genuinely have nowhere to come from.
* Clusivity routing in `words/we.js` matches every coverageNote:
  `unknown` for kmc/gqu/peh/blr, `single` for shx/acn, `clusive` for the rest, no entry for
  rbb/srh (dashed).
* Tonality: every row the prose calls tonal has tone marks in every filled cell; `peh`, `orh`,
  `dta` and `rbb` all say "not tonal" / "records no tone" and carry none.
* "Unwritten" claims agree with `script` in all nineteen.

---

## §3 — The map pin

**23. BLOCKER — `kmc` — the pin is ~70 km from the place its own comment names, and the row's
source names that place explicitly.**
`wordmap_data.js` `kmc: { … lat: 25.89, lng: 109.22, // Rongjiang, Qiandongnan, Guizhou`
Rongjiang County (榕江县) is **25.932 N, 108.522 E**. `25.89, 109.22` is Zhaoxing
(肇兴, 25.9099 N, 109.1749 E) in **Liping County** — a different county, ~70 km east.
This matters here more than usual: ABVD list 677 is labelled "Rongjiang-Zhanglu dialect", and
`kmc.description.en` says *"That orthography is built on the Rongjiang (Zhanglu) speech, which is
this southern branch."* Correction: `lat: 25.93, lng: 108.52`. (If the pin was deliberately put on
Zhaoxing as the best-known Dong village, the comment must say Zhaoxing/Liping — but then it no
longer marks the doculect.)

**24. NOTE — `mmd` — the pin is ~20 km NW of the township its comment names, and sits on
Huanjiang's western county line.**
`mmd: { … lat: 25.06, lng: 107.86, // Xianan (下南), Huanjiang, Guangxi`
Xianan Township (下南乡) is **24.967 N, 107.999 E**. Huanjiang county runs 24°44′–25°33′N,
107°51′–108°43′E, so `107.86` is ~0.6′ inside the western edge. Still Guangxi, still Huanjiang,
but not Xianan. Correction: `lat: 24.97, lng: 108.00`.

**25. NOTE — the other seventeen pins are sound.** Checked one by one against the named place:
`gqu` 26.25/105.95 = Anshun city (comment names Wanzi village *in* Anshun — prefecture fallback);
`shx` 22.97/115.34 = Haifeng ✓; `peh` 35.72/102.88 = Jishishan ✓; `orh` 50.58/123.72 = Alihe,
Oroqen Autonomous Banner ✓; `acn` 24.35/97.79 between Zhangfeng and Husa, Longchuan ✓;
`lic` 18.75/109.29 ≈ Baoyou, Ledong ✓; `swi` 25.98/107.87 = Sandu seat ✓;
`jiu` 22.06/100.98 = Jinuo Shan ✓; `pmi` 27.93/101.27 = Muli seat (Taoba is a township in Muli) ✓;
`twm` 27.99/91.95 = Cuona seat (Mama is south of it) ✓;
`dta` 47.98/124.12 inside Morin Dawa Banner though ~55 km SW of Nirji, and west of the Nen so
still Inner Mongolia ✓; `mlm` 24.82/108.93 ≈ Dongmen, Luocheng ✓; `nuf` 26.90/98.87 = Fugong ✓;
`clk` 28.66/97.47 = Zayü seat ✓; `blr` 21.96/100.45 = Menghai ✓; `rbb` 24.02/97.82 = Ruili ✓;
`srh` 37.77/75.23 = Tashkurgan ✓.
`tools/coord_country_check.js` is clean for all nineteen (point-in-polygon vs `countries[0]`).

---

## §4 — Labels as rendered

**26. (see #2) — the `gqu` label is wrong in all 19 UI languages.** That is the only label defect.

**27. NOTE — no collisions.** Every one of the nineteen labels is unique against all 1186 other
atlas rows in the same UI language, in all 19 UI languages. Checked exhaustively.

**28. NOTE — label length is within house norms.** Longest: `kmc` sw/id = 25 chars
("Kidong cha Kusini (Kikam)", "Bahasa Dong Selatan (Kam)"), `rbb` vi = 23
("Tiếng Đức Ngang (Rumai)"), `twm` en/vi = 20. The atlas's 95th-percentile label length is
20 (en) / 25 (sw) / 24 (id) / 26 (vi), and the longest labels in the atlas run to 41–58 chars
(`zh_wenyan_edu`, `de_lut`, `vi_han`). Nothing here crowds the map more than what already ships.

---

## §5 — The unattested cells as rendered

**29. NOTE — the `unattestedReason` enum is never rendered anywhere. A reader hovering a dash
gets no reason at all.**
The task brief assumes "a dash with a reason on hover". There is no such code path:
`unattestedReason` appears in `wordmap_meta.js` (data + `UNATTESTED_REASON_DEFAULTS`),
`tools/build_meta_split.js` (as a lite field) and `validate_wordmap_data.js` (as a guard) —
and in **no** template. `wordmap.html` shows only the localized `UNATTESTED_LABEL`
("unattested" / 未確認 / 미확인 …, line 7526). `seo/wordmap.php` shows nothing.
So the field is machine-only documentation. Either wire it into the cell tooltip
(`buildLabelHtml` / `renderLangInfo`), or stop describing it as reader-facing.

**30. NOTE — coverage is complete and in-enum for all nineteen.** 106 dashed cells across the
batch, 106 `unattestedReason` keys, zero missing, zero out-of-enum, zero stale keys pointing at
a filled cell. All 106 are `unsourced`. Per-row: kmc 5, gqu 6, shx 6, peh 6, orh 4, acn 6, lic 5,
swi 6, mmd 5, jiu 3, pmi 3, twm 3, dta 4, mlm 6, nuf 3, clk 3, blr 10, rbb 10, srh 9.

**31. NOTE — two of the 106 are mis-typed even so.** `blr.sun` and `blr.stone` are `unsourced`,
but `blr.coverageNote` says the opposite: *"the CLDF's form field is hard-capped at fifteen
characters … those two forms hit the cap … **They are truncated data**, not toneless syllables."*
The source *does* record them. `unknown` fits; `unsourced` does not.
(`acn.night` is the mirror case — the note says *"Night is absent from the parameter list
altogether"*, which `unsourced` fits fine.)

**32. NOTE — `blr.coverageNote` and `rbb.coverageNote` end with a trailing space.**
Cosmetic, but they are rendered verbatim at `wordmap.html:7904`.

**33. NOTE — these nineteen own the eleven longest coverageNotes in the atlas, and none of them
is translated.** `mmd` 2049 chars, `lic` 2027, `swi` 1992, `mlm` 1858, `blr` 1758, `twm` 1477,
`kmc` 1256, `gqu` 1200, `rbb` 1181, `nuf` 1136, `clk` 1095 — against a next-longest non-batch
note of 1007 (`ivv`) and a median of ~100. `META_I18N` has no entry for any coverageNote in the
whole atlas (0 of 30), so `translateMeta()` falls through and all of this renders as English at
`font-size:10px; color:#888; font-style:italic` for a reader in any of the 19 UI languages.
Global condition, but this batch is where it starts to matter.

---

## §6 — `docs/words/LANG_CODES.md`

**34. FIX — one wrong row, everything else correct.**
All nineteen are present, and English name / Japanese name / Family / Speakers match
`lang_names.js` + `wordmap_meta.js` exactly (the file is generated and `--check` is clean).
The one wrong entry is line 387, `| `gqu` | Green Gelao | 緑仡佬語 | Kra-Dai (Kra) |
~3K (Gelao nationality ~550K) |` — it inherits finding #2 and will fix itself when
`lang_names.js` is corrected and `tools/generate_lang_codes_md.mjs` is rerun.
Two further rows carry strings that finding #10 and #11 will change:
line 884 `rbb … ~20K in China (Rumai variety)` and line 666 `mlm … ~90K (Mulam nationality ~220K, 2010)`.

---

## Summary

| severity | count | items |
|---|---|---|
| BLOCKER | 5 | #2 `gqu` label in 19 languages · #5 `kmc` tone table · #6 `peh` ABVD bird/stone · #7 ABVD TREE contradiction · #23 `kmc` pin |
| FIX | 9 | #8 sun/day · #9 `cʰ` boilerplate · #10 `rbb` speakers · #11 `mlm` speakers · #12 `swi` native · #13 `gqu` apostrophe · #14 non-IPA glyphs · #20 `surfaceType` · #34 LANG_CODES |
| NOTE | 20 | the rest |

Nothing in `/home/jounlai/langmap` was edited by this pass.
