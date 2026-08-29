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

15. **Bai (`bca`) 七 RESOLVED 2026-08-27; two Yue-style notation splits and one Hokkien cell remain.** (a) `bca` 七 read `chi1` with the IPA `tɕʰi˦˦`. The row turned out to define a strict surface-digit → Chao-value map that **60 of its 61 cells honour** (1→˥, 2→˧˥, 3→˨˩˦, 4→˨˩, 6→˨˨); 七 was the only violator, and ˦˦ appears nowhere else in the row. 七 is 質韻 清入, and its 清入 siblings 一 `it6` and 足 `jvx6` are both digit 6 / ˨˨, so it became `chi6` /tɕʰi˨˨/. Worth recording why ˦˦ was tempting and still wrong: 44 IS a Bai tone — Jianchuan's tone 6, the 紧喉 series that continues the entering tone — but this row is **Central/Dali Bai**, which keeps 阴去 and 阳入 apart where Jianchuan has merged them, and whose inventory here is ˥ ˧˥ ˨˩˦ ˨˩ ˨˨. Confirm against a Dali Bai syllabary when one is to hand. (b) `bca` 八 was NOT touched: unlike 七 it is self-consistent (`be2` ↔ ˧˥, the row's digit-2 value), so the question is only whether 清入 八 belongs in the 陽平 class — a source question, not an internal contradiction. (c) `yue_gz`, `yue_dg`, `yue_nn`, `yue_zs` each write tone 1 as both `˥` and `˥˥`, tone 3 as `˧˧`/`˧`, tone 6 as `˨˨`/`˨` — same pitch, two spellings; normalise against `yue` (the parent) if it is worth a pass. `nan_te` has the same ˨/˨˩ split on 足·血·北. (d) `nan_th` 行:1 and 行:2 read ˥˥ where the row's digit 5 is ˧˥ — carried as debt by the new guard. (e) NOT a defect, recorded so it is not "fixed": `nan_lei`, `nan_hai`, `nan_te`, `nan_th`, `wuu_nb`, `wuu_hz`, `wuu_jx` map one digit to several values because Min and Wu syllables take their sandhi tone inside a compound. `tools/tone_digit_map_check.js` judges only rows that are ≥95% self-consistent, so the sandhi rows drop out on their own rather than needing cell-by-cell whitelisting.

16. **RESOLVED 2026-08-27 — `meta_i18n/` now follows the UI picker.** It held 22 slices where 18 would do: `es_eu.js`, `es_mx.js`, `pt_eu.js` and `pt_br.js` (~998 KB) had no route to them, because `resolveUiLang()` gates every source on the UI table having the key and its cookie branch strips the suffix outright (`tree.html`: `cookie.split('_')[0]`), so `es_mx` resolved to `es`. The owner chose to follow the UI rather than widen the picker. `tools/build_meta_split.js` now reads the authoritative UI list from `lang_names.js`'s top-level keys — the same list `lang_name_coverage.js` uses — emits only those, and deletes any slice left behind (a stale one would still be hashed by `slice_version_check.js`). 18 files, 6.36 MB on disk (was 22 / 7.34 MB). The 23-locale description data itself is untouched; that is the `meta_desc/` item below.

17. **CARTO basemap key — deploy `basemap_key.js` to the server by hand; it is not in git** — set up 2026-08-27. CARTO's raster tiles now watermark themselves "API key required" without a key. All five raster tile URLs (wordmap.html light_nolabels/light_all, hanmap.html rastertiles/voyager_nolabels/voyager, namemap.html light_nolabels) now append `CARTO_KEY_QS`, which is `'?key=' + window.CARTO_BASEMAP_KEY` when `basemap_key.js` has defined it and `''` otherwise — so a clone without the file works, just watermarked, and nothing needs setting up to develop. `basemap_key.js` is in `.gitignore`; `basemap_key.sample.js` is the tracked template. **After a `git pull` on the server, check `basemap_key.js` is still there** — a deploy that wipes untracked files will take it with them and the watermark returns. The tag is deliberately written without `?v=` so the file stays outside the version registry (`page_asset_version_check.js` only reads tags that carry one). Verified against the live CDN: an absent key and an invalid key return byte-identical tiles (14,121 B), the real key returns different bytes, and it is honoured on the `{s}.` subdomain form and on `@2x` retina tiles. **The key is not a secret** — the browser fetches the tiles, so any visitor can read it in the network tab; keeping it out of the repo keeps it off public GitHub, nothing more. Ask CARTO whether the key can be restricted to `langmap.heuron.com`; that is the only control that would actually limit use. Free tier is 5M tile requests/month across raster and vector, conditional on keeping the CARTO + OpenStreetMap attribution visible (all three maps already carry it).

18. **Indic and Dravidian rows mix `t̪/d̪` with plain `t/d` for the same phoneme (~280 cells, 19 rows)** — found 2026-08-28 from a reader comment. Every Indo-Aryan and Dravidian row marks the dental diacritic on a minority of its cells and omits it on the rest, *within one language*. `hi` marks it on 4 cells (पत्थर /ˈpət̪t̪ʰər/, तीन /t̪iːn/, दाँत /d̪ãːt̪/, दो /d̪oː/) and omits it on 18 that carry the same dental त/द/थ (दिल /dil/, रात /raːt/, तारा /taːɾaː/, चाँद /tʃãːd/, कुत्ता /kutːaː/, पिता /pitaː/, नमस्ते /namasteː/, हाथ /haːtʰ/). Counts per row: hi 4/18, ur 6/16, bn 8/15, pa 5/18, gu 6/13, mr 8/14, ne 4/17, si 4/16, as 3/12, or 5/14, sd 1/12, ks 0/18, ta 5/11, ml 4/13, te 3/15, kn 3/9, tcy 2/12, sa 2/27, pi 0/26. **The decision is not "add the diacritic everywhere".** For most Indo-Aryan the dental/retroflex contrast is already carried by `t` vs `ʈ`, so plain `t` is a defensible broad transcription — what is not defensible is spelling one phoneme two ways in one row. For **Malayalam and Tamil it IS contrastive**: they have a three-way dental / alveolar / retroflex coronal series, so `t̪` vs `t` vs `ʈ` must all be distinct there or the atlas cannot show the thing that makes them unusual. Suggested convention: mark dentals everywhere in ta/ml (contrastive), and pick one spelling per row elsewhere. Roughly 280 cells; needs a per-cell pass because English loans (`computer`, `dopamine`) take alveolars and should stay plain.

19. **Nine languages exist under two codes because the three maps grew separate conventions (~171 duplicated name strings)** — found 2026-08-28 (review 469). The names were aligned; the CODES were not, because unifying them moves SSR URLs and needs `SEO_RENAMED_CODES` 301s planned alongside. The mapping: Word Map `p_jpn p_kor pmng p_tun p_aav p_hmx p_sit p_ine yua` against Han Map `pja pko pmgl ptung paa phm pst` and Lang Map `ine myn`; only `ptai` already agrees. Two more of the same shape: `en_ang` (Lang) vs `ang` (Word) for Old English, and `de_gsw` (Lang) vs `de_ch` (Word) for Swiss Standard German — the latter must not be confused with `gsw`, the Swiss German dialect, which is a different row. Cost today: `/en/wordmap/p_jpn` and `/en/hanmap/pja` are separate URLs for one language, cross-map features cannot match them, and every name is stored twice. If unified, keep the Word Map spelling (larger map, and 日琉祖語 is more accurate than 日本祖語 since Japonic includes Ryukyuan). **Separately:** `tah`, `hmo` and `smg` are named in all 19 UIs but appear in NO map — they are the ISO 639-3 spellings of `ty`, `ho` and `suk`, and `wordmap_meta.js` even holds description blocks keyed `'hmo'` and `'smg'`. Not deleted here because another thread shares the worktree and those meta blocks would be orphaned; `tools/paired_code_name_check.js` reports them as a note. Deleting them is ~57 dead name strings plus whatever the meta blocks are worth.

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

## Open items from the 2026-08-29 concept batch

20. **The Chữ Nôm and Sinitic subset fonts block two kinds of cell, and nothing in `tools/` can
    regenerate them.** `fonts/NomNaTong-subset.woff2` carries 30 of the 33 Nôm/Ext-B characters the
    atlas uses; the source NomNaTong is not in the repo, and `tools/build_historic_font_subsets.js`
    does not cover it (it builds Avestan, Brahmi, Cham, Coptic, Cuneiform, Tifinagh and the rest).
    `pyftsubset` IS installed at `~/.local/bin/pyftsubset`, so the only missing piece is the source
    font. Two cells are blank because of this: `four.vi_nom` 𦊚 (U+2629A) and `hundred.vi_nom` 𤾓
    (U+24F93). `tools/font_coverage_check.js` catches these, which is how both were found — a blank
    is more honest than tofu on iPhone, but the right fix is to fetch NomNaTong from the Nôm
    Preservation Foundation, re-subset, and update the `unicode-range` in wordmap.html + hanmap.html.

21. **Non-Mandarin Sinitic rows are blocked on entering-tone Chao values for 百 and 黑.** `black`
    solved this for 烏 and 黑 by reading each row's own 三 (陰平) and 一 (陰入) cells — that method
    works and should be reused. `hundred` did not get the same treatment: 百 is 陰入 too, so the same
    trick applies and roughly 45 Sinitic rows are winnable. Worth doing before adding more words with
    checked-tone syllables.

22. **Cells to re-check in `hundred` (drafted by a subagent, flagged by it as least certain).**
    `pal 𐭮𐭣` (Book Pahlavi, constructed from the row's own letters), `arc`/`syc`/`oar ܡܐܐ /maː/`
    (Eastern vs Western Syriac realisation), `si සියය /sijəjə/`, `yo ọgọ́rùn-ún` (tones copied from the
    atlas's own n99 rendering), `nci mācuīlpōhualli` (vigesimal, 5×20), `br kant /kãnt/` (nasalisation),
    `da hundrede`, `mn зуу /tsuː/`, `ptrk *jǖz`, `p_kor *on`. Also worth a look: Navajo `neeznádiin`
    and Fijian `drau` were left out only because the IPA could not be pinned to the row's style.

23. **`tools/wordmap_check.js` reads a comment as a data key.** A line like `// --- Turkic: one word
    from …` inside a `data` block is counted as a key named `Turkic`, and two such comments in one
    file trip DUP_KEY. Worked around in `words/black.js` by rewording both to use an em-dash. The
    checker should skip `//` lines.

24. **`bump_versions.js` now syncs `word_manifest.js?v=` to `WM_ASSET_VERSION.words`.** The page
    checker keys off content, and adding a language to a `words/*.js` file does not change
    `word_manifest.js`, so it used to report "in sync" while `WM_ASSET_VERSION` moved on and
    `validate_wordmap_data.js` #19 failed. Fixed 2026-08-29; if a similar coupling turns up for
    another asset, that is the place to add it.

25. **Cells the drafting agents flagged as least certain, in `honey` and `bear`.**
    honey: `egy bj.t /ˈbijat/` (form certain, vocalisation is a mechanical application of the row's
    own Loprieno-style template — the weakest cell in the file); `da honning /ˈhɔneŋ/` (DDO gives
    [ˈhʌneŋ]; ɔ was chosen to match the row's `tunge /ˈtɔŋə/` — pick one); `enm hony /ˈhɔni/`
    (historically /u/, but the row writes `tonge /ˈtɔŋɡə/`); `af heuning` (no ⟨eu⟩ precedent in that
    row); `kab tament /θamənt/` (the row is internally inconsistent about Kabyle spirantisation —
    `tuɣmest /θuɣməst/` spirantises, `tamellalt /tamɛlːalt/` does not); `sm meli` without ˈ (the whole
    Samoan row omits stress marks — a systematic pass on Samoan may be worth it).
    bear: `se guovža /ˈkuovtʃa/` (⟨ž⟩ rendered /tʃ/ to match the row's voiceless treatment; /dʒ/ is
    defensible); `xqa adhığ` (source gives Arabic script اَذِغْ, the Latin is the agent's
    transliteration); `sma bïerne` (vowel length inferred from `bïenje`); `moh ohkwári` (the only
    cell not in the bulk source); `xh ibhere /ibʱere/`; `pt_br urso /ˈuɾsu/` (the row's `cachorro
    /kaʃohu/` hints at coda-r → [h], which was not applied — different environment, but worth a look).
    Both agents also left out cells they could source the WORD for but not the IPA: Navajo
    `neeznádiin` and Fijian `drau` for hundred are the two most likely to be right.

26. **`honey.egy` and `honey.hit` are romanised rather than in script, and could be upgraded.**
    Hittite mi-li-it needs the cuneiform IT sign and Egyptian bj.t needs the bee 𓆤 (L2); neither is
    in the subset fonts. The atlas already romanises in those rows where it must (`egy` white = `ḥḏ`,
    `sux` wind = `líl`), so this follows existing practice — but if item 20's font work happens, both
    can be switched to script.

27. **`hak_cn` (Meixian Hakka) writes 陽平 two different ways, and the majority is the wrong one.**
    Found 2026-08-29 while a subagent was reading tone classes off the row to write 鹽. Within
    `hak_cn`: 紅 /fuŋ˨˦/, 魚 /ŋ˨˦/ and the new 鹽 /iam˨˦/ all say ˨˦, but 名 /miaŋ˩/ says ˩. All four
    are 陽平. Meixian Hakka 陽平 is 11, and `hak_tw` (Sixian, same tone value) writes all four as ˩˩ —
    so **名 is the correct cell and 紅/魚/鹽 are wrong**, i.e. the outlier is right and the majority is
    not. Needs a full pass over every 陽平 syllable in that row rather than the one-line fix, which is
    why it was not done here. Check 陰平 in the same row while you are there (三 /sam˦˦/ against
    Meixian's actual 44 — that one looks right).
    **Already fixed by contrast:** `nan` had 紅 /aŋ˧˥/ where its own 魚, 名 and 鹽 all say ˨˦ and both
    sibling rows (`nan_xm`, `nan_qz`) say ˨˦. One-cell outlier, five independent agreements, changed
    to ˨˦ in `words/red.js`.
    A deterministic checker would settle this class for good: a character → 調類 table for the ~40
    Han characters the WordMap actually uses, then flag any row whose cells disagree about a class.
    That is the pattern `tools/tone_category_check.js` already follows for the Han Map.

28. **`ekp` (Ekpeye) and `bbo` (Konabéré) look like they carry a neighbour's words — same shape as the
    Donno So mis-coding, but NOT yet confirmed and NOT changed.** Flagged 2026-08-29 by a research
    subagent, then checked against ASJP directly. The evidence:

    | | atlas | ASJP for that language | atlas value equals |
    |---|---|---|---|
    | `ekp` tree | osisi | **uṣi** (EKPEYE) | Igbo `osisi` exactly |
    | `ekp` eye | anya | **akpalanɛ** (EKPEYE) | Igbo `anya` exactly |
    | `bbo` tree | yiri | **sio** (NORTHERN_BOBO_MANDARE) | Bambara/Dyula `yiri` exactly |
    | `bbo` eye | ɲɛ | **ɲono** (NORTHERN_BOBO_MANDARE) | Bambara/Dyula `ɲɛ` exactly |

    Both rows' `blood` DOES match ASJP (ekp ubala, bbo tsuu), so the rows are not wholesale copies —
    which is what makes the two cells each look like an individual slip rather than a bad row.

    **Not fixed, deliberately.** ASJP is one source, its wordlists are short and sometimes poor, and
    Ekpeye is genuinely Igboid so some agreement with Igbo is expected — though `osisi`/`uṣi` and
    `anya`/`akpalanɛ` are different words, not cognate spellings. Settling it needs a second source:
    Blench & Williamson's *A Dictionary of Ẹkpẹyẹ, an Igboid Language of Southern Nigeria* (Kay
    Williamson Educational Foundation, on academia.edu) and a Bobo Madaré wordlist. Only ASJP has
    lexical data for these two among the datasets currently on disk.

    `deg` (Degema) was flagged in the same report and does NOT show the pattern: its tree `eyo` and eye
    `enẹ` match neither ASJP (utain, ukmo udo) nor Igbo, so it is a plain disagreement with one source
    rather than a borrowed row. Lower priority.

29. **Eleven concepts have unapplied comparative-dataset harvests sitting in `~/langmap-work/`.**
    A previous session pulled these and never used them. They are the reason egg, sleep, nose and iron
    each jumped 20-40 points on 2026-08-29.

        h2_nose.tsv 1736   h2_stone.tsv 1703   h2_sleep.tsv 941   h2_egg.tsv 844
        h2_ear.tsv   711   h2_bird.tsv   466   h2_earth.tsv 263   h2_rain.tsv 166
        h2_wind.tsv  155   h2_five.tsv   114   h2_snow.tsv   19

    Columns: `code, language, dataset, doculect, Value, Form, extra`. `code` is the atlas language
    code, so each joins directly against its `words/*.js`. Sources behind them: NorthEuraLex, IDS,
    ABVD, ASJP, Polyglotta Africana, bowernpny, utoaztecan, dravlex, iecor. Raw dataset dumps are in
    the same directory (`asjp_forms.csv`, `ids_forms.csv`, `b_polyglottaafricana_*`, `al3_abvd_*`),
    which is how the ekp/bbo check above was done — worth knowing they are there before re-fetching
    anything. **`/home/jounlai/langmap-work` is durable; `/tmp` is tmpfs and loses this.**

30. **Removed: `hit` (Hittite) `fish` = 𒋗𒉿𒅖 /suwaiʃ/, which was the BIRD word.** Found 2026-08-29
    when the `bird` subagent noticed that IDS gives Hittite 'bird' as *šuwaiš*, letter-for-letter the
    atlas's existing `fish` cell. Two independent sources settle it, and both ways:
    - Starling's Old Hittite 100-word list, entry 29 FISH: *"Unknown, normally written with the
      ideogram KU6"* — Hittite's word for fish is genuinely not known.
    - The same list, entry 6 BIRD: *"The traditional Hittite reading of MUŠEN is a hapax: suwai-"*,
      and the etymological literature calls *suwai-* "a very nice match for the basic IE term for
      'bird'".

    So the cell was the wrong word AND filled a slot that has no answer. It came from rally 1
    (`b518ff45`, "cross-row consistency audit of red/fish/three"), which is worth noting: that rally
    was itself a consistency pass, and it introduced this. Removed, with the reasoning left in
    `words/fish.js` as a comment so nobody re-adds it.

    **Not added: `hit` `bird`.** *suwai-* is a hapax and Starling calls the reading "still unclear".
    The `bird` agent declined it for the same reason and I agree — but if someone with Kloekhorst's
    dictionary wants to make the call, this is the cell.

    `tools/intra_row_dup_check.js --check` would have caught this the moment anyone tried to add the
    bird cell, which is the whole argument for the ratchet added the same day.

31. **`白` in nine Mandarin rows still carries Beijing's RHYME, though its tone is now fixed.**
    Found 2026-08-29 by the `stone` subagent while deriving 石's tone: every Mandarin row wrote 白 as
    /pai˧˥/ — Beijing's 陽平 — while its own 紅 and 魚 carried the local value. Same class as the
    `orange` contamination, but invisible to `sinitic_tone_class_check` because 白 is 陽入 in the
    table and the checker skips 入 classes for lects that merged them away.
    Tone corrected in `zh_cd zh_wh zh_xa zh_jn zh_km zh_cq zh_kf zh_zz zh_tj` — nine rows where 紅 and
    魚 agree, which is what identifies the row's 陽平. **The rhyme was NOT corrected**: Chengdu says
    /pe/, Wuhan /pɤ/, Jinan and Xi'an /pei/, and none of that could be sourced per row. Those cells
    are still half wrong and the comment in `words/white.js` says so.
    Deliberately untouched: `gan_yc gan_ja wuu hsn_yz` keep 入聲, so their 白 is 陽入 and simply not
    comparable with 紅; `zh_jh zh_nj zh_hf` (Jianghuai) keep it too and need a glottal coda as well as
    a tone; `zh_lz` (Lan-Yin) sends 全濁入 to 去聲, not 陽平.
    **Worth building:** the checker cannot see this class because it needs to know, per lect, where
    入聲 went (陽平 in SW/Zhongyuan/Jilu, 去 in Lan-Yin, preserved in Jianghuai/Gan/Wu/Xiang). A small
    per-row "入聲 merged to X" table would let the same tool cover 白, 石, 十, 六 and the rest.

32. **`asu` carries the wrong ISO code.** Confirmed 2026-08-29 by the `stone` subagent against RMCA's
    Bantu lexicon. The row IS Asu/Pare, Bantu G22 — its `mti`, `mende`, `mshika`, `iiso` and `idhuva`
    all match RMCA G22 exactly. But **ISO 639-3 `asu` is Asurini do Tocantins**, a Tupian language of
    Brazil; Asu/Pare is **`asa`**. Every comparative dataset therefore returns Tupian data for this
    code, which is how it was found. Same shape as the Donno So `ddn`→`dds` fix of 2026-08-26 and
    needs the same treatment: rename plus a `SEO_RENAMED_CODES` 301, so it was not done here.

33. **Running list of dataset traps, for whoever fills the next concept.** Every one of these cost an
    agent real time on 2026-08-29; none is discoverable except by hitting it.

    **Wrong-language joins by ISO code** — the dataset row keyed to this atlas code is a different
    language entirely:
    - `asu` → ASJP `ASURINI` / tuled `Asuriní Tocantins`, Tupian. (And see item 32: the atlas code
      itself is wrong; the row is Asu/Pare, which is `asa`.)
    - `pyx` → ASJP `TAMAN_MYANMAR`. Taman is not Pyu.
    - `mvf` → `KALAQIN` and `MONGOLIAN_SANGGENDALAI`, i.e. Kharchin and Mongolian proper, not
      Mongghul. The sibling `mjg` Monguor IS genuinely targeted.

    **Wrong-language joins by NAME** — these bite when a script falls back to doculect name because
    the ISO join missed:
    - `bum` Bulu (Cameroon, Bantu) → ABVD's "Bulu" is `bjl`, Bulu of Papua New Guinea, Austronesian.
    - `men` Mende (Sierra Leone, Mande) → TransNewGuinea.org's "Mende" is `sim`, Mende of Papua New
      Guinea, Sepik.
    - `gsw_w` Walliser German → ASJP/iecor rows are Bernese German, and the same doculect twice.
    - `jya` Situ rGyalrong → ABVD's only jya doculect is Japhug, a different variety.
    - `dtp_kzj` Coastal Kadazan → ABVD's is Bundu Dusun.

    **Gloss slips** — the source's form for concept A is actually concept B. The tell is that it
    equals, letter for letter, the row's OWN cell for B. `tools/intra_row_dup_check.js --check` catches
    these now; it caught `mra` Mlabri rain = its own *mother* in production the day it was wired in.
    Others found by hand: ASJP's ear for Wichí and Kera = each row's *tooth*; its ear for Ladakhi,
    Kurtöp, Sherpa and Sikkimese = their *nose*; dravlex's bird for Kuvi = its *fish*; IDS's bird for
    Hittite = its *fish* cell (see item 30); WOLD's rain for Otomi = its *hand*; and a whole cluster
    of `rain` forms that were simply each row's *water* (`chf`, `itz`, `toj`, `kgg`, `nej`, `adt`,
    `wbp`, `mpj`, `sat`, `bci`, `bsq`, `nzi`, `myp`).

    **"Two datasets agreeing" is often one source.** Three ASJP doculects agreed on a wrong Urhobo
    form; only ASJP_3 plus Polyglotta had the right one. dravlex and ASJP share an origin for
    Dravidian. Prefer agreement ACROSS families of source, not across doculects within one.

34. **`zts` is named "Tlacolula Zapotec" but ISO 639-3 `zts` is Tilquiapan Zapotec.** Found 2026-08-29
    by a research subagent looking for a snow word. Confirmed at the source: iso639-3.sil.org/code/zts
    gives **Tilquiapan Zapotec**, and lists **`zab` = Western Tlacolula Valley Zapotec** separately.
    The atlas row's latitude is 16.95, which is Tlacolula de Matamoros (Tilquiapan is 16.83), and its
    name says Tlacolula — so the row appears to be Tlacolula and the CODE is the wrong one, exactly
    the shape of the Donno So `ddn`→`dds` fix (2026-08-26) and the `asu`→`asa` finding in item 32.
    **Not changed here**: a code change moves SSR URLs and needs a `SEO_RENAMED_CODES` 301 planned
    alongside, same as items 19 and 32. Whoever does it should first confirm which variety the row's
    existing CELLS came from — if they were sourced from Tilquiapan materials the fix is the name, not
    the code — but the row's own metadata already answers that, and unanimously:
      - `glottocode` cites **tlac1241**, which is Tlacolula.
      - the description reads "Tlacolula Zapotec (autonymously Dizhsa … San Lucas Quiaviní Zapotec
        for the most-documented variety)".
      - the third cited source is **Pamela Munro's UCLA page**; Munro is the San Lucas Quiaviní /
        Tlacolula Valley researcher.
      - the coordinates are Tlacolula de Matamoros'.
    Four fields say Tlacolula. Only `iso6393` and the Ethnologue URL say `zts`, i.e. Tilquiapan. So
    the fix is the code, `zts` → `zab`, and the Ethnologue link with it.

    **The row's live Ethnologue citation therefore resolves to a different language than the row is
    about.** `source_link_check.js` cannot see it, and the reason is worth remembering: that guard
    checks whether a citation's code matches `meta.iso6393` — INTERNAL consistency. Here the two
    agree with each other perfectly while both being wrong. A guard comparing a row's `glottocode`
    against its `iso6393` through Glottolog's own mapping would have caught this, and would catch the
    same class elsewhere.

    There are now three of these queued (items 19, 32, 34). They share one blocker — the 301 plan —
    so they are probably one task, not three.

## Perf (Phase 9) — done, for reference
countries.geojson self-hosted+simplified (14.6→1.9MB); wordmap_meta.js 19MB split → lite (~1MB, structured + base META_I18N) + `meta_desc/<code>.js` per-language + `meta_i18n/<ui>.js` per-UI; wordmap/tree/hanmap rewired to load only the current UI; gzip enabled on prod. Verified byte-identical translation output. Details + the production runbook: `docs/perf-optimization-handoff.md`.
