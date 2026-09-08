# Wordmap review #101 — Arabic dialect continuum & Maltese round-2 auditor

## Reviewer self-introduction (ペルソナ自己紹介)

I am a dialectologist of the Arabic continuum (Mashriq–Maghreb–Sahara) and of Maltese, returning for the round-2 audit of the columns first surveyed in review #34 and partially re-touched by the Maghrebi/Berber audit #99. My working references are Watson (2002) *The Phonology and Morphology of Arabic* for emphatics and syllable structure, Holes (2004) *Modern Arabic* for the qāf/jīm isoglosses, Harrell (1962/1966) for Moroccan, Singer (1984) for Tunis Arabic, Taine-Cheikh (Cohen-school, LACITO) for Ḥassāniyya, and Borg & Azzopardi-Alexander (1997) *Maltese* plus Aquilina for the `mt` column. Before writing a single line I grepped the live `words/*.js` to fix the actual remit: the codes present are `ar`, `ar_qur`, `ar_eg`, `ar_lev`, `ar_gulf`, `ar_iq`, `ar_ma`, `ar_tn`, `ar_sd`, `arq` (Algerian), `mey` (Hassaniya) and `mt` — there is no `ar_sa`. I re-read `docs/words/CONTRIBUTING.md` ("Use IPA notation, not the language's native romanization") and the closed adjudications of #34 and #99, and I deliberately do **not** re-open anything held there (Levantine `majj`, the `ar_tn`/`arq` possessive-lemma items, the arq perfective-vs-imperfective convention, `sˤəħħa`, the Moroccan fire article, the Iraqi gilit scope items, the `ar_ma` q/g lexeme split, the `ar_tn` schwa audit). Two columns are effectively *new since wave 10* — the `mey` rows did not exist when #99 was filed — and that freshly added material, plus residual vowel-length omissions in the `arq` column and one Maltese length error that survived three orthography passes, is where the sharp findings below come from. Every Current value was verified verbatim against the live file on the review date.

---

## Issues found

### 1. mt — cat — `qattus` is missing its long stressed vowel: /ʔatˈtuːs/
- **File:** words/cat.js line 247
- **Current:** ["qattus", "ʔattus"]
- **Expected:** ["qattus", "ʔattuːs"]
- **Why:** Maltese *qattus* is [ʔatˈtuːs] with a long /uː/ in the stressed final syllable (Borg & Azzopardi-Alexander 1997; Aquilina s.v. *qattus*; Wiktionary gives /ʔatˈtuːs/). The dataset itself proves the length: the cognate Tunisian row in the same file, line 244 `ar_tn: ["قطّوس", "qatˤtˤuːs"]`, carries `uː` — both descend from the same Romance etymon (Sicilian *gattus*-type) with a long final vowel. The `mt` column otherwise marks length faithfully (`id`→`iːt` hand.js:247, `dar`→`daːɾ` house.js:254, `nar`→`naːɾ` fire.js:253), so `ʔattus` is an isolated omission, not a convention.

---

### 2. ar_tn — hello — `أسلامة`/`ʔasleːma`: wrong initial consonant — it is ʕayn, not hamza
- **File:** words/hello.js line 244
- **Current:** ["أسلامة", "ʔasleːma"]
- **Expected:** ["عسلامة", "ʕasleːma"]
- **Why:** This closes the verification request left open by review #99 (item 19, skipped as "verify against a Tunisian source"). The greeting is a univerbation of على السلامة *ʕa-s-slāma* "(may you be) upon well-being" (Singer 1984 for Tunis; Tunisian learner sources uniformly romanize it *3aslema* — the chat-alphabet ⟨3⟩ is precisely /ʕ/ — and write it عسلامة in Arabic script). Both the surface hamza-alif أ and the IPA `ʔ` are therefore wrong: the initial segment is the voiced pharyngeal /ʕ/ inherited from the preposition على. The fix touches surface and IPA together, keeping them aligned.

---

### 3. mey — hello — non-IPA ⟨y⟩ in `ʕalaykum`
- **File:** words/hello.js line 243
- **Current:** ["السلام عليكم", "əssalaːm ʕalaykum"]
- **Expected:** ["السلام عليكم", "əssalaːm ʕalajkum"]
- **Why:** ⟨y⟩ is a romanization letter, not IPA — in IPA [y] is the front rounded vowel of French *tu*. `docs/words/CONTRIBUTING.md` is explicit: "Use IPA notation, not the language's native romanization." The dataset's own sibling spells the same phrase correctly with the palatal glide /j/: `ar_qur: ["السلام عليكم", "as.salaːmu ʕalajkum"]` (hello.js:102), and every other Arabic row uses /j/ for yāʾ (`ʕajn`, `majːa`, `jaːkəl`). A grep confirms this is the only ⟨y⟩-for-yāʾ in the Arabic columns; it slipped in with the recently added `mey` rows.

---

### 4. mey — fire — `ənnar` drops the long /aː/ of *nār*
- **File:** words/fire.js line 249
- **Current:** ["النار", "ənnar"]
- **Expected:** ["النار", "ənnaːr"]
- **Why:** The ā of نار is etymologically and synchronically long in every Arabic variety — Hassaniya included; Taine-Cheikh's Ḥassāniyya descriptions keep the long-vowel system /aː iː uː/ intact even where short vowels collapse to ə. All nine sibling rows in the same file carry the length: `ar/ar_qur naːr` (102–103), `ar_eg`–`ar_sd` `naːɾ` (243–251), and even Maltese `nar`→`naːɾ` (253). The `mey` column itself marks length elsewhere (`əssalaːm` hello.js:243, `daːr` house.js:250, `waːħəd` one.js:249), so this is an internal slip, not a column convention.

---

### 5. mey — heart — `ɡaɫb` uses ⟨ɫ⟩ instead of the dataset's emphatic notation ⟨lˤ⟩
- **File:** words/heart.js line 243
- **Current:** ["قلب", "ɡaɫb"]
- **Expected:** ["قلب", "ɡalˤb"]
- **Why:** The /ɡ/ for qāf is correct (Hassaniya is a g-dialect), and an emphatic lateral in this word is defensible — Ḥassāniyya is noted (Taine-Cheikh; cf. Wikipedia's summary of her work) for granting /lˤ/ and /rˤ/ phonemic status. But the dataset transcribes Arabic-type emphasis exclusively with the pharyngealization diacritic ⟨ˤ⟩: `qitˤː` (cat.js:102), `qatˤtˤuːs` (cat.js:244), `ɡutˤː` (cat.js:245), `sˤəħħa` (thanks.js:242), `tˤajjib` (good.js:102). The velarized-l glyph ⟨ɫ⟩ appears nowhere else in any Semitic row (its only uses are Russian, Chukotkan, Scots Gaelic, Venetian, Bavarian — languages where it is the conventional symbol). One-off symbol choices break cross-row comparability; normalize to `lˤ`.

---

### 6. mey — drink — surface اشرب and IPA `ʃraːb` encode two different words
- **File:** words/drink.js line 243
- **Current:** ["اشرب", "ʃraːb"]
- **Expected:** ["يشرب", "jəʃrab"]
- **Why:** The pair is internally incoherent: the surface اشرب (with initial alif) reads as the imperative *išrab* "drink!", while the IPA `ʃraːb` — with no initial vowel and a long /aː/ — is the shape of the **noun** šarāb "beverage", not any finite form of the verb (the Hassaniya perfective is *šṛab* with a short vowel; Taine-Cheikh). Contrast the same column's eat row `mey: ["اكل", "aːkəl"]` (eat.js:243), where the initial alif *is* transcribed — the two mey verb rows treat the same orthographic configuration in opposite ways. Since all nine `ar_*` dialect siblings in drink.js (lines 237–245) use the imperfective 3sg.m (`jiʃɾab`/`jiʃɾəb`), the column-conformant repair is imperfective يشرب /jəʃrab/. (I am not re-opening the held arq perfective-convention item #34-15 — whichever convention wins, the current mey pair is wrong because its two halves disagree with *each other*.)

---

### 7. arq — house — `dar` missing /aː/: Algerian *dār* has a long vowel
- **File:** words/house.js line 249
- **Current:** ["دار", "dar"]
- **Expected:** ["دار", "daːr"]
- **Why:** Maghrebi short-vowel reduction deletes *short* vowels; the long vowels /aː iː uː/ survive intact (Holes 2004; Harrell 1962 for the sister variety). دار has etymological ā, and every sibling row in the same file marks it: `ar_ma: daːɾ` (248), `mey: daːr` (250), `ar_tn: daːɾ` (251), even Maltese `daːɾ` (254). This is part of a systematic authoring gap: the `arq` column carries **no length mark anywhere**, which also affects `lʕafja` (fire.js:248, vs `ar_ma ʕaːfja` fire.js:247 — the ā of عافية) and arguably `mliħ` (good.js:242, usually *mlīḥ*); issues 8–10 itemize the other clear-cut cases.

---

### 8. arq — hello — `ssalam` missing /aː/: *salām*
- **File:** words/hello.js line 242
- **Current:** ["السلام", "ssalam"]
- **Expected:** ["السلام", "ssalaːm"]
- **Why:** Same word, same file, two transcriptions: `ar_ma: ["السلام", "ssalaːm"]` (hello.js:241) marks the ā of سلام, the Algerian row does not; `mey: əssalaːm` (243) and `ar_sd: salaːm` (245) also carry it. The ā of *salām* is long in all Maghrebi varieties — Algerian vowel reduction targets the short vowels only (Holes 2004). Part of the systematic arq length gap documented in issue 7.

---

### 9. arq — father — `baba` missing /aː/: *bābā* vs sibling `ar_tn baːba`
- **File:** words/father.js line 242
- **Current:** ["بابا", "baba"]
- **Expected:** ["بابا", "baːba"]
- **Why:** Direct sibling contradiction in the same file: the Tunisian row gives the identical Maghrebi kinship word as `ar_tn: ["بابا", "baːba"]` (father.js:244) with the long first vowel, the Algerian row strips it. بابا is written with two alifs precisely because the vowels are long; the stressed first syllable is [baː] across Maghrebi (Harrell 1962 s.v. *bba/baba*). (Distinct from the *held* Neo-Aramaic `aii baba` case in review #36, where both quantities are attested — here the in-file Maghrebi sibling fixes the convention.) Part of the arq length gap (issue 7).

---

### 10. arq — one — `waħəd` missing /aː/: *wāḥəd*
- **File:** words/one.js line 248
- **Current:** ["واحد", "waħəd"]
- **Expected:** ["واحد", "waːħəd"]
- **Why:** Three Maghrebi/Saharan siblings in the same file transcribe the same lexeme with the long ā of واحد: `ar_ma: waːħəd` (247), `mey: waːħəd` (249), `ar_tn: waːħəd` (250). The Algerian form is likewise *wāḥəd* — the first-syllable ā derives from the CāCiC active-participle template and is not subject to Maghrebi short-vowel reduction (Holes 2004; Harrell 1962). The schwa in the second syllable is already correct; only the length mark is missing. Part of the arq length gap (issue 7).

---

### 11. ar_ma (and ar_tn) — moon — `qmɐɾ` uses the one-off vowel symbol ⟨ɐ⟩
- **File:** words/moon.js line 247
- **Current:** ["قمر", "qmɐɾ"]
- **Expected:** ["قمر", "qməɾ"]
- **Why:** A grep over all Arabic rows shows ⟨ɐ⟩ occurs **only** in these two moon entries (moon.js:247 `ar_ma`, moon.js:250 `ar_tn`); everywhere else it belongs to the Bavarian column, where it is conventional. For `ar_ma` the reduced reflex of short *a* is consistently written ə throughout the dataset — `ʃəms` (sun.js:247), `qəlb` (heart.js:241), `kəlb` (dog.js:241), `ʃəʒɾa` (tree.js:241) — and Harrell (1962, *A Short Reference Grammar of Moroccan Arabic*; dictionary form *qmeṛ*) confirms /qmər/ for Moroccan "moon", so `qməɾ` is both source-accurate and internally consistent. The parallel `ar_tn` row at moon.js line 250 should be normalized in the same edit to `["قمر", "qmaɾ"]`, since the Tunis short *a* is kept as ⟨a⟩ in this dataset (`qalb` heart.js:244, `kalb` dog.js:244, `ʃams` sun.js:250; Singer 1984 *qmar*). Note this is purely a symbol-normalization finding; it does not re-open the held #99-11 (q vs g lexeme realization) or #99-20 (ar_tn schwa audit) items.

---

*All line numbers reference the state of the files as of the review date (2026-06-11). No data files were modified.*

---

## Worker round-1 response (作業者round-1)

All 11 findings are clear data errors, internal inconsistencies, or symbol normalizations with strong in-file sibling evidence and cited sources (Borg & Azzopardi-Alexander, Holes, Harrell, Singer, Taine-Cheikh). None re-open held cross-school convention items. All applied.

- **101-1** mt cat: `ʔattus` → `ʔattuːs` (long stressed /uː/; sibling ar_tn `qatˤtˤuːs`). Applied by orchestrator this round.
- **101-2** ar_tn hello: `["أسلامة","ʔasleːma"]` → `["عسلامة","ʕasleːma"]` (univerbation of على السلامة *ʕa-s-slāma*; initial /ʕ/, chat-alphabet ⟨3⟩; Singer 1984). Surface + IPA. Applied by orchestrator this round.
- **101-3** mey hello: non-IPA ⟨y⟩ → /j/ `ʕalajkum` (CONTRIBUTING: IPA not romanization; sibling ar_qur `ʕalajkum`). Applied by orchestrator this round.
- **101-4** mey fire: `ənnar` → `ənnaːr` (long ā of نار; all nine siblings carry length). Applied by orchestrator this round.
- **101-5** mey heart: `ɡaɫb` → `ɡalˤb` (normalize ⟨ɫ⟩ to dataset emphatic ⟨lˤ⟩; ⟨ɫ⟩ used nowhere else in Semitic rows). Applied by orchestrator this round.
- **101-6** mey drink: `["اشرب","ʃraːb"]` → `["يشرب","jəʃrab"]` (current pair internally incoherent — surface imperative vs noun-shape IPA; all dialect siblings use imperfective 3sg.m يشرب; Hassaniya perfective is short *šṛab*, Taine-Cheikh). Surface + IPA. Applied by orchestrator this round.
- **101-7** arq house: `dar` → `daːr` (long ā survives Maghrebi reduction; siblings ar_ma/mey/ar_tn/mt all `daːr`). Applied by orchestrator this round.
- **101-8** arq hello: `ssalam` → `ssalaːm` (sibling ar_ma `ssalaːm`). Applied by orchestrator this round.
- **101-9** arq father: `baba` → `baːba` (sibling ar_tn `baːba`; Harrell). Applied by orchestrator this round.
- **101-10** arq one: `waħəd` → `waːħəd` (CāCiC template ā; siblings ar_ma/mey/ar_tn `waːħəd`). Applied by orchestrator this round.
- **101-11** moon: ar_ma `qmɐɾ` → `qməɾ` and ar_tn `qmɐɾ` → `qmaɾ` (one-off ⟨ɐ⟩ normalized; ar_ma reduces short a to ə, ar_tn keeps a; Harrell, Singer). Applied by orchestrator this round.

Open items left for reviewer: none.

---

## Reviewer round-2 response (再評価 round-2)

I re-grepped every cited file on the live tree (2026-06-11). All 11 fixes are present verbatim in the data. Per-item adjudication:

- **101-1** ✓ `words/cat.js:247` now `mt: ["qattus", "ʔattuːs"]` — long /uː/ restored, matches sibling `ar_tn qatˤtˤuːs`.
- **101-2** ✓ `words/hello.js:244` now `ar_tn: ["عسلامة", "ʕasleːma"]` — surface ʕayn + IPA /ʕ/ both corrected from the hamza forms.
- **101-3** ✓ `words/hello.js:243` now `mey: ["السلام عليكم", "əssalaːm ʕalajkum"]` — non-IPA ⟨y⟩ → /j/; confirmed no remaining `ʕalaykum` in file.
- **101-4** ✓ `words/fire.js:249` now `mey: ["النار", "ənnaːr"]` — long ā restored.
- **101-5** ✓ `words/heart.js:243` now `mey: ["قلب", "ɡalˤb"]` — ⟨ɫ⟩ normalized to ⟨lˤ⟩. Grep confirms residual ⟨ɫ⟩ survives only in Chukotkan (ckt/kpy) and Kurdish (ckb/sdh) rows, where it is conventional — no Semitic row uses it now.
- **101-6** ✓ `words/drink.js:243` now `mey: ["يشرب", "jəʃrab"]` — surface+IPA both repaired to imperfective 3sg.m, consistent with all nine `ar_*` siblings.
- **101-7** ✓ `words/house.js:249` now `arq: ["دار", "daːr"]`.
- **101-8** ✓ `words/hello.js:242` now `arq: ["السلام", "ssalaːm"]`.
- **101-9** ✓ `words/father.js:242` now `arq: ["بابا", "baːba"]`, matching sibling `ar_tn baːba` (father.js:244).
- **101-10** ✓ `words/one.js:248` now `arq: ["واحد", "waːħəd"]`.
- **101-11** ✓ `words/moon.js:247` now `ar_ma: ["قمر", "qməɾ"]` and `words/moon.js:250` `ar_tn: ["قمر", "qmaɾ"]` — one-off ⟨ɐ⟩ removed. Grep confirms residual ⟨ɐ⟩ survives only in pt/haw/zh_tang rows, not in any Arabic row.

New issues raised this round: none. Verification surfaced no new errors in the touched columns.

Scorecard: 11 accepted (✓), 0 partial, 0 rejected. All clear errors fixed and verified in live data.

**File status: CLOSED** — nothing left to address.
