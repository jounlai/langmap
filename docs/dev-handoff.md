# LangMap — development handoff (2026-08-24)

For continuing on another machine. Everything below is committed to git (`main`); pull to get it.
Note: this repo's Claude auto-memory lives outside the repo (`~/.claude/…`) and does NOT transfer between machines — the essentials are duplicated here.

---

## Current state
- Dataset: **1164 languages** (`wordmap_data.js` header must match — it's validated).
- Branch `main`, working tree clean. Last commit `8ab7ce9`.
- `node tools/check_all.js` is **green**; keep it green before every commit.

## What shipped this session (newest → oldest, all on `main`)
1. **Argentina/Brazil indigenous expansion — 13 languages added** (1151→1164):
   kgp Kaingang, tob Toba/Qom, plg Pilagá, moc Mocoví, mbc Makuxi, kpj Karajá,
   guu Yanomami, bwi Baniwa, cag Nivaclé, crt Chorote, tpy Trumai, jup Hup, kwa Dâw.
   Each: LANG_DATA entry + meta (19-UI descriptions + sources) + LANG_NAMES (19 UIs) + 32–38 sourced word cells.
2. **49 empty `meta.countries` tags filled** (geographic-blank fix; xav/ter/bor/gun etc. now tagged).
3. **Review-rally fixes** on recent words (och `*`-in-IPA strip ×6, Greek IPA romanization→IPA, +6 sourced ancient cells: stone·hbo/sa, bird·akk, sleep·akk/sga, white·ave); **ko** white 하얀→하얗다 (dictionary form); ja white label 白→白い.
4. **Mobile UI-language picker** now uses the native `<select>` on ≤640px (the custom globe dropdown mis-behaved in the drawer). Desktop unchanged.
5. **Performance (Phase 9)** — see §"Perf" below and `docs/perf-optimization-handoff.md`.

## Environment gotchas (this machine)
- **Scratch data must NOT live in `/tmp`.** `/tmp` here is **tmpfs — a RAM disk**
  (`df -P /tmp` → `tmpfs`), wiped on every reboot. Claude's session scratchpad is
  under `/tmp/claude-*/`, so anything left there is lost on restart — this has cost
  real work more than once (2026-08-24: a full parallel drafting run for two words,
  ~2300 hand-checked cells, plus all agent transcripts). Use **`~/langmap-work/`**
  instead (real disk, and deliberately outside the repo so `git add -A` can't sweep
  it in). See `~/langmap-work/README.md`.
- Local static server was run at **http://localhost:8765** (`python3 -m http.server 8765`). Restart on the new machine to preview.
- No `pdftotext`; some WebFetch PDFs are image-only (couldn't extract).
- Production is **langmap.heuron.com** (nginx). **gzip/brotli + geojson MIME are already enabled there** (done 2026-08-23). data.js 6.2MB→0.86MB over the wire.

---

## ⚠️ Critical workflow rules (don't break these)

### Generated files — regenerate after editing sources
`wordmap_meta.js` and `meta_i18n_*.js` and `*_data.js`/`lang_names.js` are SOURCES OF TRUTH; the browser loads GENERATED files. After editing a source, regenerate:
- `node tools/build_meta_split.js` → `wordmap_meta_lite.js` + `meta_desc/<code>.js` + `meta_i18n_engine.js` + `meta_i18n/<ui>.js`
- `node tools/build_lang_names.js` → `lang_names/<ui>.js`
- `node tools/generate_lang_codes_md.mjs` → `docs/words/LANG_CODES.md`
- `node tools/build_word_labels.js` → `word_labels.js` (after label edits)
`check_all` has drift guards that FAIL if you forget — trust them.

### Cache-version bumping
- `node tools/bump_versions.js` — one command; bumps every changed asset's `?v=` across both version systems (WM_ASSET_VERSION registry + per-page `<script>` tags) and updates both locks.
- **Two dynamic/registry-coupled versions the page guards do NOT see — sync by hand after a bump:**
  - `word_manifest.js?v=N` tag in wordmap.html must equal `WM_ASSET_VERSION.words`.
  - `__langNamesVersion(N)` in wordmap.html must equal `WM_ASSET_VERSION.names`.
- Bump the language-count in the `wordmap_data.js` header comment when adding languages (it's validated).

### Data integrity (the owner is emphatic)
- **Never fabricate.** IPA is the binding constraint. Fill a cell only from a real source; leave `—` otherwise.
- `surface===ipa` is an accepted convention where the orthography is phonemic.
- **Japanese & Korean dialects and ancient forms: extra care.** Korean citation form = dictionary **-다** form (빨갛다/하얗다/좋다, NOT 빨간/하얀). Watch Ryukyuan (Okinawan ʔ, Miyako/Yaeyama), Old Japanese (p-, kō/otsu), and Middle-Chinese notation (æ/ˠ = Division-II; no `*` in the IPA field).
- Don't merge to `main` beyond the owner's normal flow; commit per task.

---

## Adding a language — the checklist that worked
Source: **UT Austin Hunter-Gatherer Language Database** `https://huntergatherer.la.utexas.edu/languages/language/<ID>` (get IDs from `.../languages`). WebFetch a page → core-vocab wordlist (orthographic + phonemic). Caveat: some pages return only "Flora-Fauna (1)" (peach palm) with no core vocab — skip/substitute (this blocked Sateré-Mawé #464, Mundurukú #455, Kanoê #440).
1. Convert Americanist→IPA by SCRIPT to avoid typos: ḳ→q, č→tʃ, ǰ→dʒ, š→ʃ, ʸ→ʲ, y→j. Use the phonemic column as `surface===ipa` when there's no standard orthography.
2. Drop inalienable possessive prefixes (l-/u-/pei/-); use first variant; skip Spanish-loan numerals and uncertain/(?)/bound-only forms (→ `—`).
3. Insert cells into every `words/*.js` (all 53 present, `—` where unattested).
4. Add `LANG_DATA["code"]` (name/native/lat/lng) in `wordmap_data.js`.
5. Add `LANG_DATA["code"].meta` in `wordmap_meta.js`: family, speakers (`~NK` house style, ranges as `~20–35K` — suffix once), countries, script, dataStatus, **description in ALL 19 UIs** (validator BLOCKS on missing UI — this is required), **sources as `[{type,title,url?}]` array** (not a string).
6. Add **LANG_NAMES in all 19 UIs** in `lang_names.js` (else the name shows in English) — pattern: ja `〇〇語`, ko `〇〇어`, zh `〇〇语`, es `Idioma 〇〇`, etc. (copy an existing entry like `xav`).
7. Regenerate (§above) → bump (§above) → check_all green → commit.

Scripts used this session live in the session scratchpad (not committed); the pattern above is enough to reproduce them.

---

## Outstanding / queued work
1. **Tier-2 AR/BR languages** (if desired): Kadiwéu, Apinajé, Xerénte, Krahô, Paresí, Wapishana… (many NOT in HG DB → need Wiktionary/grammars).

   **Four of the five "un-sourceable" ones are sourceable after all** (found 2026-08-27). The checklist above records that the Hunter-Gatherer DB blocked Sateré-Mawé #464 and Mundurukú #455 — but the Tupían Lexical Database is cached locally at `~/langmap-work/lb/tuled_*.csv` and carries them richly, in a phonemic transcription, from Harrison (2013) and the other standard dictionaries:

   | code | tuled doculect | forms | of the 44 atlas concepts |
   |---|---|---|---|
   | `gub` Guajajára | `Guajajara` | 472 | **35** |
   | `myu` Mundurukú | `Munduruku` | 510 | **35** |
   | `mav` Sateré-Mawé | `Mawe` | 437 | **35** |
   | `kgk` Kaiowá | `Kaiowa` | 240 | **28** |

   (Kayapó `txu` is Jê, not Tupían, and is not in it. `gerarditupi` and `galuciotupi` hold the same languages with fewer forms.) A NEW row does not hit the problem that blocks item 3 and item 5, because nothing constrains its conventions yet — the brief's own `surface===ipa` rule applies.

   **One verification step stands in the way, and it is the checklist's own step 2.** tuled records comparative ROOTS, and Tupí-Guaraní body parts and kin terms are inalienably possessed, so several forms are almost certainly bound or 3rd-person-possessed rather than free citation forms: Guajajára `u` "father", `hɨ` "mother", `eha` "eye", `huwɨ` "blood", `er` "name". The `Morphemes` column is an etymological gloss (FIRE → GLOW, DOG → JAGUAR, WATER → LIQUID), not a morphological analysis, and `gerarditupi` gives the identical bare forms from the same source, so neither dataset settles it. Establish the citation form per concept against a grammar (Harrison's Guajajára materials) before writing any of these rows — putting bound stems in the atlas is exactly what step 2 exists to prevent.
2. **Historical-language coverage** — worked 2026-08-27, 17 cells added, and the Wiktionary route is now exhausted for it. Those old figures were badly out of date (sleep was 26, it is 94). Against the 143 rows marked `historical-attested` or `reconstructed-proto`, the thin core concepts are now wind 72, rain 74, earth 81, egg 81, snow 86, ear 89. Ignore dopamine 0, atsign 2, tea 8, computer 32 — those rows have no such word.

   Added: `akk` wind 𒊭𒀀𒊒, `ota` wind یل, `cop` snow ⲭⲓⲱⲛ, `enm` rain reyn, `mga` ear ó, `xct` wind/earth/ear རླུང/ས/རྣ་བ, `kaw` rain ꦈꦢꦤ꧀ and wind ꦲꦔꦶꦤ꧀, `zh_wenyan_edu` wind 風, `gez` snow ሐመዳ, `cmg` ear ᠴᠢᠬᠢᠨ and earth ᠭᠠᠵᠠᠷ, `fa_clas` wind باد, `de_lut` wind Wind, `gmh` rain regen.

   **This route works better than the modern-language one (item 3).** Wiktionary's coverage of dead languages is good, and these rows mostly do not have the orthography-vs-IPA split that blocked item 3 — where they do, the row already attests the correspondence in a sibling cell. The method that worked: find the concept in `incategory:"<Language> lemmas" <gloss>`, then take the transcription from the row's own cells or from the same word in a sibling row (bo/dz/bft all write རྣ་བ *naba*, so xct does too).

   **Searched and empty — do not repeat**: Classical Mongolian wind/rain, Middle Mongolian rain/earth, Old Hungarian wind/rain, Old Aramaic egg, Old Frisian rain, Proto-Indo-European rain, Proto-Turkic wind, Proto-Austronesian wind, Middle Irish wind, Katharevousa ear, Gothic egg (genuinely absent — the corpus is a Bible translation), Old Javanese earth (only the Sanskrit loan kṣiti).

   **Needs the reconstruction itself, not a dictionary**: `zh_han` transcribes Schuessler's Later Han Chinese (白 bɐk, 石 dʑak, 一 ʔiit) and `zh_song` an Early-Mandarin stage with Chao tones; Wiktionary's Chinese entries carry only Middle and Old Chinese, so their four missing cells each need the source. Same for `pal` earth: Wiktionary has bwm "earth, land, country" but this concept is the substance underfoot, and the word that fits — xāk, which continues into the row's own fa_clas خاک — is not there. `xct_litpr` was left alone: it differs from `xct` in six cells and they are reading differences (བཟའ is za in xct, sa in the liturgical row), so its readings cannot be assumed.
3. **Mature words with modern-coverage gaps** — worked 2026-08-26, 11 of 125 cells filled; the rest needs per-language dictionaries. Measured against the 1,141 rows carrying five of the six most-covered concepts (not the old ~1009 figure): heart −32, good −32, drink −31, house −21, hand −9, across 57 languages, ten of them proto-languages. Filled: `ptai` heart/house/good (Pittayaporn 2009), `cag` house, `cic` house/hand/drink, `itl` house/drink, `uby` drink, `hop` heart. Also still open: love −81, and eat/mother/father −10, moon −8.

   **Two routes were tried and are now measured, so nobody needs to retry them blind.**

   - *Cached CLDF datasets* (`~/langmap-work/lb/`): only 20 of the 57 languages are in them and only 22 (language, word) pairs exist. Alignment scores are low, and the reason is structural, not a wrong doculect: these rows store a practical orthography in the surface field and IPA separately, while a dataset carries one phonetic transcription in a third convention. Converting needs information the dataset does not hold — Tuyuca scores 12/27 and every mismatch is systematic (j for the row's y, no tone marks, ɨ as i̵) *except* that the dataset never writes the glottal stop the row marks with ʼ, so its HOUSE `wií` could be the row's `wii` or `wiʼi` and nothing decides which. Only `cag` survived: 22 of 33 shared cells match exactly, 6 more once ɒ is read as the row's ɔ, and the last 5 are three further systematic differences (c/ts, ʔ/ʼ, a dropped ka- prefix).
   - *Wiktionary*: surveyed all 44 remaining languages in one batch by asking the API for each `Category:<Language> lemmas` member count. Eight have no entries at all (Nuxalk, Pyu, Taa, Scythian, Bidayuh, Yugh, Chorote, Yuchi); most of the rest are under 100. 46 concept queries across the categories that do have entries returned 4 usable hits. **The Wiktionary route is exhausted** — do not re-run it.

   What is left needs a dictionary per language (Ho-Chunk's own dictionary is behind a reCAPTCHA-guarded search endpoint; Lardil, Nuxalk and Yuchi have published dictionaries not online), or is a proto-language whose reconstruction may simply not cover the concept — Proto-Tai has no `drink` in Pittayaporn's 788 forms.

4. ~~**Per-UI splits for the other pages' `lang_names.js`** and **namemap_content_i18n**~~ — both done. 2026-08-26: index/tree/hanmap load `lang_names_shim.js` + `lang_names/en.js` + the reader's own slice via `window.__langNamesBoot()`, 215 KB gz → 12–24 KB. 2026-08-27: namemap.html loads `namemap_i18n_shim.js` + `namemap_i18n/<ui>.js`, 216 KB gz → 14 KB (1 KB for an English reader, who needs no slice at all). Parity proven by the §6 recipe: 17 UIs × 4,012 field comparisons, zero differences. `docs/perf-optimization-handoff.md` §4–5 are closed.
5. **Doculect-aligned fill — piloted 2026-08-27 on `ws_0.md`, yield 4 of 94.** The prepared worksheets (`~/langmap-work/ws_0..5.md`, `wsd_0..1.md`, brief in `ALIGN_BRIEF.md`, 628 candidate cells) work exactly as designed for picking the doculect — but that is not the binding constraint. Of `ws_0`'s 94 NEED lines, 17 had both an alignment ≥75% and a clean free form; of those, only 4 could be written, because **the candidate gives a form in the dataset's transcription and the atlas row needs a surface AND an IPA in its own two conventions**. It is usable only when the candidate happens to already be in the row's surface convention and the IPA is derivable from correspondences the row itself attests. Filled: `kum` egg йымырткъа /jɯmɯrtqa/ and sleep юхламакъ /juχlamaq/ (39/39 alignment — a perfect doculect match — with къ→q, ы→ɯ, х→χ all attested in the row, and crh/ba corroborating), `ace` egg boh /bɔh/ and sleep teungeut /tɯŋɯt/ (o→ɔ from tanoh/tanɔh, eu→ɯ from buleun/bulɯn). The other 13 fail the other way round: `sma`, `yrk` and `mak` candidates are already phonetic, so the IPA is given and the ORTHOGRAPHY would have to be invented; `kac` needs a tone the form does not carry. Expect a similar ratio from the remaining five worksheets — roughly 25 cells out of 628, not 628.

6. **`dds` (Donno So) `dog` and `tree` do not match any Dogon variety** — found 2026-08-26, evidence gathered 2026-08-27, data left alone. The row reads `dog gɛɛ` and `tree ti`. All four ASJP Donno So wordlists give dog as izi / ʔizu / idu, and all sixteen Dogon varieties in Heath 2015 give an i-/n- initial form (Tommo So ìsé, Yorno So ìjú, Togo Kan ìsí, Jamsay ìjú, Yanda Dom ìnjɛ̀, Bunoge ʔínjɛ̀ …). `gɛɛ` matches none of them — and it is not Songhay (hánsì) or Dendi (hansi) either, so it is not the contamination that blood/tongue/tooth/night were. For `tree`, every source gives a tim- form (ASJP time/timme/timmE/timE, Heath tìmɛ́ / tìmè / tìwⁿé / tìmǎ:), so `ti` looks like the right word truncated rather than a wrong one. Not changed, because the row's surfaces are a practical orthography from a source I cannot reach (giré, suuli, monyi, gina, kɛɛla, agandɛla) and ASJP's transcription is a different system — substituting one for the other is the mixture that had to be undone in `och` and `ptai`. Settling it wants Kervran's *Dictionnaire dogon–français: donno sɔ* (1982).

7. **`gan_fz` (Gan Chinese, Fuzhou 撫州) is not a coherent dialect record** — found 2026-08-26 while trying to add its three missing cells; nothing was changed. Thirteen of its 36 cells are byte-identical to the Nanchang `gan` row (鸟 血 鱼 五 我 一 红 雪 星 三 舌 牙 白), and the tone values split one Middle Chinese category three ways: 清上 is ˧˥ in 好/土 but ˧˨ in 水/屎; 次濁上 is ˧˥ in 耳/眼/雨 but ˧˨ in 里; and 我/你 carry ˨˩˧, which is Nanchang's 上聲 value. The entering-tone codas are glottal ʔ (食 ʃɪʔ, 月 ŋuəʔ, 日 ɲɪʔ) where 撫廣片 has -p/-t/-k, and 水 ʂui / 屎 ʂɨ have the retroflex initials of Yichun `gan_yc`, which Nanchang lacks. So the row mixes at least three sources, no tone can be derived from it, and the fix is 23 cells rather than the 3 that are missing. Needs a real 撫州/臨川 syllabary (e.g. 《臨川方言研究》 or 江西省志·方言志); Wikipedia's 撫廣片 article has no tone table and Academia Sinica's 漢字古今音資料庫 is form-only. The zh-wiki 抚州话 article does give the structure, which narrows the target and confirms the diagnosis: the division has **seven tone categories — 平/去/入 each split yin/yang and 上聲 a single class**, so the row's three different values for 上聲 cannot all be right; entering-tone codas are **-p/-t/-k with -k often realised as -ʔ**, which excuses 食 ʃɪʔ (職韻, -k) but not 月 ŋuəʔ (月韻, -t); and **陰入 and 陽入 are the reverse of Nanchang's**, so the cells copied from that row (血 ɕyɛt˥, 一 it˥, 舌 sɛt˥) are wrong twice over.

8. **Six Han Map rows are undifferentiated copies of their group's parent (366 cells)** — found 2026-08-27 (review 455); nothing was changed, because filling them without a syllabary would repeat the error. `hsn_hy` (衡陽) is identical to `hsn` (長沙) on all 61 characters, `cnp_gl` (桂林平話) to `cnp` (南寧), `gan_ja` (吉安) to `gan_fz` (撫州), and `cjy_cz` (長治) / `cjy_lv` (呂梁) sit at 98% / 97% of `cjy` (太原); `gan_ja` and `gan_fz` are both 95% of `gan` (南昌). Three independent arguments say these are copies rather than close relatives: (a) every sub-dialect row that WAS researched sits 0–69% from its parent (wuu_sz 0%, cjy_xz 0%, gan_yc 5%, hsn_ld 3%, cjy_dt 41%, yue_gz 69%) — **the 70–95% band is empty**, so the distribution is bimodal; (b) the Word Map carries the same codes with separately sourced data and there `hsn_hy` agrees with `hsn` on only **4 of 41** concepts and `gan_ja` with `gan_fz` on **10 of 42**; (c) tone inventories — the Word Map `hsn_hy` row is built on **˥˩ (26 occurrences)**, a contour that appears **nowhere** in the Han Map `hsn_hy` row, which instead uses Changsha's ˦˩ throughout; likewise `cjy_lv` (Word Map has ˨˩˧ ˧˩˨ ˥˦), `gan_fz` (˧˥ ˧˨ ˧) and `gan_ja` (˥˧ ˧˩). A repair needs a real syllabary per lect (衡陽・長治・呂梁・桂林平話・撫州/臨川・吉安); the Word Map rows give each lect's tone *inventory* but not the 調類→調值 mapping or the segments, so they are a starting point, not a source. `tools/hanmap_dup_row_check.js` now lists these six as **debt** (reported, not failing) and turns a seventh copy into a violation; the six leave the list as they are repaired. Related but distinct: item 7 above is the Word Map `gan_fz` row, which is a *mixture* of three sources rather than a copy. **Do not use a DEBT row as a tone source.** Review 452 imported tones from the Han Map into the Word Map and 4 of its 52 cells came from these rows; its "don't cross 全清上/次濁上" filter matched on segmentals, which a copied row shares with its parent, so the filter could not see it. Two of those (`gan_fz` 五, `gan_ja` 五, both ˨˩˧ = Nanchang's 上聲) contradicted their own row's 上聲 reflex (gan_fz 耳/雨/眼 ˧˥; gan_ja 次濁上 耳/雨 ˥˧ against 全清上 水/狗 ˨˩˧) and were reverted to untoned in review 455. The other two (`cjy_lv` 鸟, `cjy_lv` 五, both ˥˧) were **kept but are unverified**: ˥˧ occurs 12× in the sourced Lüliang Word Map row and 鸟 (全清上) agrees with that row's 水/狗 ˥˧, but the row splits on 次濁上 (耳 ˧˩˨ vs 我 ˥˧) so 五 cannot be derived — confirm both against a 呂梁 syllabary when one is found.

9. **NameMap Hausa (`ha`) has no tone, and three of its forms carry a stress mark instead** — found 2026-08-27 (review 457); nothing was changed. All 19 `ha` forms are untoned while every other tonal cell in the map is complete (`zh` 16/16 Chao, `th` 4/4 diacritic, `vi` 14/14 after this review). Hausa IS lexically tonal, but unlike Vietnamese its orthography does not write tone, so the values cannot be derived from the form the way `Mátthêu` → sắc was — each name needs a source (Newman's *Hausa–English Dictionary* marks tone on headwords). Separately, `adam aˈdamu`, `noah nuˈhu` and `elijah iljaˈsu` carry ˈ on a tone language, which is a category error rather than a transcription choice; whether to drop the mark or replace it with a tone needs the same source, so both were left alone. The `ha` syllable separators are also mixed (`hasan`, `u.ma.ru`, `ab.dul.la.hi`) — worth normalising in the same pass.

10. **`atb` (Zaiwa) writes its surface in two different romanizations, and `br` means two different things across maps** — found 2026-08-27 (review 458); IPA was fixed, these were not. Of `atb`'s 36 Word Map cells, 20 write the surface with a numeral tone suffix (`tsa51`, `khi51`, `wa44`) and 16 use the Zaiwa orthographic tone letters (`kyoq`, `nga`, `sui`, `shwa`). The IPA side of the same split was pure notation and was converted, but the surface is an orthography: the correct Zaiwa spelling has to come per word from a source (Zaiwa uses final -q/-x/-r for tone), so it was left. Separately, `br` is Breton in the Word Map (ISO 639-1, lat 48.39/-4.49) and Brazil in the NameMap (lat -10/-52). Harmless today because `NM_LANGS` carries its own `{name:{en,ja}}` and never consults `LANG_NAMES` — but the moment the NameMap is wired into the shared name table (as the Lang Map was in review 456) the two collide. Give the NameMap cell a non-ISO key, or namespace it, before that happens.

11. **Family names still fall back to English for most UIs, and two pages freeze the translation slice at ?v=1** — measured 2026-08-27 (review 459). Of the 651 nodes in the family tree, the number left in raw English per UI is: id 422, sw 416, de 404, it 375, es 374, pt 374, fr 373, vi 331, th 164, hi 164, he 162, ar 160, uk 155, ru 154, yue 152, zh 150, ko 111, ja 37. Most of the tail is Chinese dialect-group names (`Gan — 宜浏片`) that are right to leave in Han characters, so the real gap is smaller than the raw count; `translateMetaSmart`'s own comment says it covers "~17 UI langs at the family-name level", so this is staged work rather than a defect. Widening it means adding atoms to `META_I18N_ATOMS`, not per-name strings — `familyDisplayName()` decomposes compounds. Separately, `meta_i18n/<ui>.js` and `meta_i18n_engine.js` are asked for through `assetUrl()` on wordmap.html but with a literal `?v=1` on tree.html and hanmap.html, so a regenerated slice reaches Word Map readers only. The clean fix is to give hanmap.html's own `WM_ASSET_VERSION` a `metaI18nEngine`/`metaI18nUi` key and route both pages through `assetUrl()` (tree.html has no registry at all and would need one); that touches three pages' version plumbing and was left. `slice_version_check.js` now hashes `meta_i18n/` + the engine and holds the literal against it, so the drift fails the tree the moment it happens.

12. **/sitemap-seo.xml is at 94.9% of the 50MB limit — about 65 languages from being rejected outright** — measured 2026-08-27 (review 460). 49,761,107 of 52,428,800 bytes, and only 23,161 of the 50,000 URLs, so the byte limit binds first: each `<url>` carries 20 xhtml:link alternates (19 UIs + x-default) and costs ~2,148 bytes against a ~60-byte `<loc>`. A sitemap over the limit is not truncated — search engines reject the whole file, so all 23,161 SSR pages lose their declared entry at once. Adding one Word Map language costs 19 URLs / ~41 KB; last session added 13. The fix is a sitemap INDEX: `/sitemap-seo.xml` becomes an index listing `/sitemap-seo-wordmap.xml`, `-hanmap.xml` and `-trivia.xml`, each generated by the same emitter in `seo/sitemap.php` with a section filter, plus three new routes in `index.php`. Not done here because it changes outward-facing URLs. `tools/sitemap_size_check.js` runs `php seo/sitemap.php` and prints real headroom on every check_all run (green until over). (Review 460 also flagged robots.txt for not declaring the SEO sitemap; review 464 read the whole comment and withdraws that — it is a current, reasoned strategy: "discovery is left to organic internal-link crawling (footer → /en/wordmap/ index → hreflang) rather than bulk-submitting 18k URLs". Nothing to decide.)

13. **Accessibility leftovers that need a visual judgement** — found 2026-08-27 (review 461); the mechanical parts were fixed, these were not. (a) `dir="rtl"` is set by `seo/lib.php` and `tree.html` for ar/he but not by index.html, wordmap.html, hanmap.html or namemap.html. Adding it mirrors the whole map UI and needs the CSS checked in a browser; index.html also carries a deliberate note that Arabic and Hebrew SENTENCE data is shown left-to-right for comparison, which the document direction would fight. (b) `tree.html` and `poster.html` have no heading at all — not one h1–h6. The fix is a visually-hidden `<h1>`, but where it goes and what it says is a layout call. (c) `wordmap.html` and `hanmap.html` jump h1 → h3 once each; promoting the h3 to h2 may change how existing CSS renders it. Everything else in that round is done: `<html lang>` now follows the UI language on all four pages that had it frozen at "en", `csvLangSelect` has an `aria-label` in all 19 UIs, and the 42 decorative inline SVGs are `aria-hidden="true"`.

14. **hanmap.html downloads 943 KB gz of trivia before it can paint — 47% of its first-paint weight** — measured 2026-08-27 (review 462). Eager first-paint totals, gzip -9: hanmap.html 1,988 KB, index.html 941 KB (data.js 841 KB, which IS the map), wordmap.html 597 KB, tree.html 231 KB, namemap.html 124 KB. The Han Map outlier is one tag, `hanmap.html:3296` `<script src="hanmap_trivia.js?v=11">`, and the Word Map next door already solves both halves of it. Its own comment at `wordmap.html:3222` states the rule — "Trivia articles are decorative on the map … Fetch after `load` so they never sit in front of first paint; every reader guards with `|| []`" — and it *also* splits per UI: `wordmap_trivia.js` is EN+JA at 359 KB with `wordmap_trivia_<ui>.js` overlays on demand, where `hanmap_trivia.js` carries 40 articles in all 19 UIs in one 2.5 MB file. The receiving side is already defensive (`hanmap.html:3487` keeps `window.TRIVIA_ARTICLES = window.TRIVIA_ARTICLES || []`, and every consumer guards with `typeof … === 'function'` / `if (!articles) return`), so deferral will not throw. Not done here because porting `loadTrivia()` is a runtime behaviour change — the blink markers and the article index need a refresh at the right moment, and getting that wrong makes trivia fail silently. Do it where a browser is available. `tools/page_weight_check.js` locks the current weights and fails on >5% growth, so the number cannot get worse while this waits.

15. **Bai (`bca`) 七 disagrees with its own row, and four Yue rows write one tone two ways** — found 2026-08-27 (review 463); the ˨˨˨ half was fixed, these were not. (a) `bca` 七 is `chi1` in the romanization but `tɕʰi˦˦` in the IPA, where the row's other nine tone-1 cells are all `˥`. 七 is 質韻, an entering-tone character, and every other entering-tone character in the row (一 六 十 木 足 目 肉 食 立) takes tone 6 = `˨˨`. Three readings are possible — the IPA should be ˥, the surface should be tone 6, or Bai borrowed this numeral into tone 1 through a different stratum — and choosing between them needs a Bai syllabary (Jianchuan 白语 字表; Allen's *Bai Dialect Survey* has the tone correspondences). (b) `yue_gz`, `yue_dg`, `yue_nn` and `yue_zs` each write tone 1 as `˥` in 4 cells and `˥˥` in 9, tone 3 as `˧˧`/`˧`, tone 6 as `˨˨`/`˨`. Same pitch, two spellings, within one row — not wrong, but a normalisation pass would make the rows comparable; pick one convention against `yue` (the parent) first. (c) NOT a defect and worth recording so it is not "fixed" later: `nan_lei`, `nan_hai`, `nan_te`, `nan_th`, `wuu_nb`, `wuu_hz` and `wuu_jx` map one tone digit to several Chao values because Min and Wu syllables take their sandhi tone inside a compound.

16. **RESOLVED 2026-08-27 — `meta_i18n/` now follows the UI picker.** It held 22 slices where 18 would do: `es_eu.js`, `es_mx.js`, `pt_eu.js` and `pt_br.js` (~998 KB) had no route to them, because `resolveUiLang()` gates every source on the UI table having the key and its cookie branch strips the suffix outright (`tree.html`: `cookie.split('_')[0]`), so `es_mx` resolved to `es`. The owner chose to follow the UI rather than widen the picker. `tools/build_meta_split.js` now reads the authoritative UI list from `lang_names.js`'s top-level keys — the same list `lang_name_coverage.js` uses — emits only those, and deletes any slice left behind (a stale one would still be hashed by `slice_version_check.js`). 18 files, 6.36 MB on disk (was 22 / 7.34 MB). The 23-locale description data itself is untouched; that is the `meta_desc/` item below.

## Known, deferred: meta_desc/<code>.js still ships 23 UI languages

Opening a language modal now costs two requests. `lang_words/<code>.js` is ~1 KB gzipped —
that is the one that used to be the whole 695 KB corpus, fixed. The other,
`meta_desc/<code>.js`, is ~10.5 KB gzipped, and **more than nine tenths of it is text the
reader cannot read**: the file carries that language's description in all 23 UI languages
(ja ko zh yue vi th id hi de fr it es pt ru uk ar he sw en es_eu es_mx pt_eu pt_br) and the
reader uses one, plus the English fallback. `meta_desc/` is 20 MB in total for this reason.

It is the same shape of bug as the one the language modal had, one layer down, and it is
NOT covered by `meta_i18n/<ui>.js` — those hold term translations (family names, regions),
not descriptions.

The fix is a split to `meta_desc/<ui>/<code>.js`: gzipped 10.5 KB → about 1.6 KB, being the
English fallback plus the reader's own UI. The reason it has not been done is the file count
— 23 × 1164 = 26,772 files. Bundling per UI instead (`meta_desc_i18n/<ui>.js`, the shape
`lang_names/` uses) is not an option here: at ~870 KB per UI it would be far worse than the
10.5 KB it replaces, because this data is fetched lazily on modal open, not once per session.

Deferred by the owner on 2026-08-24 as a small win next to the 695 KB one, not as a
non-issue. Anyone picking it up should also check whether all 23 UIs are still live.

## Filling a word from the comparative datasets (doculect alignment)

Hand-researching a cell at a time does not scale to a 400–600 row gap, and it burns the
WebSearch quota fast. The faster route is the CLDF comparative datasets — but naively
matching on ISO code does not work, because every one of them carries several doculects per
language (ABVD alone has 4723 for ~1000 languages) and they disagree with each other.

`~/langmap-work/align.js` solves the picking problem deterministically. For each atlas row it
scores every candidate doculect by **how many of the row's already-filled cells that doculect
reproduces** (after a normalisation pass that strips diacritics and folds the obvious
transcription variants). A doculect that gets the row's water, eye and fire right is the one
the row was actually built from, so its remaining concepts can be trusted — and the score
travels with the candidate, so a reviewer can see how much weight it carries.

    cd ~/langmap-work
    node align.js egg nose ear stone …     > align_all.tsv    # candidates + agreement score
    ALIGN=align_all.tsv node worksheet.js x 0 6 > ws_0.md      # per-row briefs, 1 of 6 slices

`worksheet.js` prints each row's existing cells above the candidates. That context is doing
two jobs: it is the orthography/IPA convention the new cell has to match, and it is the
cross-check — a new cell that comes out identical to a cell already in the row is either
homophony or a mis-gloss, and that test has now caught several.

Caveats learned the hard way:

- **Concepticon glosses are coarser than the atlas's definitions.** NorthEuraLex `EARTH (SOIL)`
  is glossed "Erde::N", ambiguous in German, and returns Hill Mari **свет** — a Russian loan
  meaning 'world/light', not soil. Always re-read the atlas definition before accepting.
- Datasets differ in what goes where: NorthEuraLex puts orthography in `Value` and IPA in
  `Form`; IDS puts orthography in `Value` and its phonemic string in `AlternativeValues`;
  most lexibank sets put the source's single transcription in `Value` and nothing usable in
  `Form`. Only NorthEuraLex hands you both halves of a cell.
- Artifacts to clean: `_` is a word space, a leading or trailing `-` marks a bound stem
  (ABVD gives possessed body parts that way), `~` separates variants, `saenkoromance` writes
  per-segment dots, and `tls` writes Bantu seven-vowel systems with capital I and U.
- `johanssonsoundsymbolic` is a sound-symbolism study, not a basic-vocabulary list — leads only.

The datasets themselves are ~105 MB under `~/langmap-work/lb/` plus the older `b_*` and
`asjp_*`/`ids_*` files; they are deliberately outside the repo. Re-fetch with
`curl https://raw.githubusercontent.com/lexibank/<dataset>/master/cldf/{forms,languages,parameters}.csv`.

## Perf (Phase 9) — done, for reference
countries.geojson self-hosted+simplified (14.6→1.9MB); wordmap_meta.js 19MB split → lite (~1MB, structured + base META_I18N) + `meta_desc/<code>.js` per-language + `meta_i18n/<ui>.js` per-UI; wordmap/tree/hanmap rewired to load only the current UI; gzip enabled on prod. Verified byte-identical translation output. Details + the production runbook: `docs/perf-optimization-handoff.md`.
