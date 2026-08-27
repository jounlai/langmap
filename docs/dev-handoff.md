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
1. **Tier-2 AR/BR languages** (if desired): Kadiwéu, Apinajé, Xerénte, Krahô, Paresí, Wapishana… (many NOT in HG DB → need Wiktionary/grammars). And the 5 originally-planned but un-sourceable ones (Guajajára gub, Kayapó/Mẽbêngôkre txu, Kaiowá kgk, Sateré-Mawé mav, Mundurukú myu) — add later from reliable dictionaries or the owner's cross-validation pipeline.
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

5. **`gan_fz` (Gan Chinese, Fuzhou 撫州) is not a coherent dialect record** — found 2026-08-26 while trying to add its three missing cells; nothing was changed. Thirteen of its 36 cells are byte-identical to the Nanchang `gan` row (鸟 血 鱼 五 我 一 红 雪 星 三 舌 牙 白), and the tone values split one Middle Chinese category three ways: 清上 is ˧˥ in 好/土 but ˧˨ in 水/屎; 次濁上 is ˧˥ in 耳/眼/雨 but ˧˨ in 里; and 我/你 carry ˨˩˧, which is Nanchang's 上聲 value. The entering-tone codas are glottal ʔ (食 ʃɪʔ, 月 ŋuəʔ, 日 ɲɪʔ) where 撫廣片 has -p/-t/-k, and 水 ʂui / 屎 ʂɨ have the retroflex initials of Yichun `gan_yc`, which Nanchang lacks. So the row mixes at least three sources, no tone can be derived from it, and the fix is 23 cells rather than the 3 that are missing. Needs a real 撫州/臨川 syllabary (e.g. 《臨川方言研究》 or 江西省志·方言志); Wikipedia's 撫廣片 article has no tone table and Academia Sinica's 漢字古今音資料庫 is form-only.
4. ~~**Per-UI splits for the other pages' `lang_names.js`**~~ — done 2026-08-26: index/tree/hanmap now load `lang_names_shim.js` + `lang_names/en.js` + the reader's own slice via `window.__langNamesBoot()`, 215 KB gz → 12–24 KB. **namemap_content_i18n per-UI** is still open; runbook in `docs/perf-optimization-handoff.md` §4–5.

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
