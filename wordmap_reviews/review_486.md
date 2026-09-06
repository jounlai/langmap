# Wordmap data review #486 — nilo-saharan-khoisan

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: nilo-saharan-khoisan.

## Reviewer self-introduction (ペルソナ自己紹介)

Nilo-Saharan & Khoisan reviewer; click notation, tone. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [HIGH] fish / naq (Nama/Khoekhoe)
- **Issue:** Cell is ["ǃaub","ǃaub"] using the alveolar click ǃ, but Khoekhoe 'fish' begins with the lateral click ǁ (ǁaub), reflecting Proto-Khoekhoe *ǁʼau. Wrong click letter — a phonemic error.
- **Fix:** Change both surface and IPA from "ǃaub" to "ǁaub" (lateral click). Keeping the existing surface===ipa convention: naq: ["ǁaub", "ǁaub"]. (Narrow IPA would be ǁˀaub, with final-devoicing variant ǁaup.)
- **Source:** Wiktionary Appendix:Khoekhoe Swadesh list (fish = ǁaub); Starostin Khoekhoe 100-wordlist proto-form *ǁʼau (starlingdb.org/new100/kkh.pdf).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [HIGH] blood / din (Dinka)
- **Issue:** IPA field is "rièm" — it uses the Latin letter è (e with grave accent) instead of the IPA open-e ɛ. The surface field correctly has "riɛm", and the cognate nus (Nuer) cell is ["riɛm","riɛm"]. The è is a non-IPA character.
- **Fix:** riɛm
- **Source:** Internal inconsistency (surface riɛm vs IPA rièm) and Nuer cognate riɛm; ɛ is the correct IPA symbol for the vowel written ɛ in the surface form.
- **Disposition:** APPLIED (`9e3587f3`)

### 3. [HIGH] five / din (Dinka) — same issue in nus (Nuer)
- **Issue:** Surface "dhiëc" begins with the digraph 'dh', which in Dinka/Nuer denotes a voiced DENTAL stop /d̪/, but the IPA "ɟiɛc" renders it as a palatal stop ɟ. The dataset already renders the voiceless counterpart 'th' as dental t̪ (din iron weeth→weːt̪, good piath→piat̪), so 'dh' should be d̪. nus 'five' ["dhieec","ɟiec"] has the identical error.
- **Fix:** din five IPA: change "ɟiɛc" to "d̪iɛc"; nus five IPA: change "ɟiec" to "d̪iec" (surfaces unchanged; only the initial palatal ɟ corrected to dental d̪; final palatal c retained).
- **Source:** Wikipedia 'Dinka alphabet' — dental consonants are written with a following h (dh, th = dental); internal th→t̪ convention in the same dataset.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 4. [HIGH] tooth / naq (Nama/Khoekhoe)
- **Issue:** Cell is ["ǃgûb","ǃɡuːp"] using the alveolar click ǃ, but Khoekhoe 'tooth' is ǁgûb with the lateral click ǁ — homophonous with 'father', which this dataset already stores correctly as ["ǁgûb","ǁɡũːb"]. Wrong click letter.
- **Fix:** Change tooth/naq to ["ǁgûb","ǁɡũːb"] — surface ǁgûb (lateral click) per Wiktionary; IPA ǁɡũːb to match the dataset's own homophonous father entry (nasalized vowel per the û orthography). This is the internally consistent correction; the finding's proposed "ǁɡuːp" fixes the click but leaves the vowel/coda inconsistent with father.
- **Source:** Wiktionary Appendix:Khoekhoe Swadesh list (tooth = ǁgûb, identical to father ǁgûb).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 5. [MED] ear / din (Dinka)
- **Issue:** Cell is ["yith","jic"]. Surface 'yith' ends in the dental digraph 'th' (rendered t̪/θ elsewhere), but the IPA 'jic' ends in a palatal stop /c/ — a place-of-articulation mismatch. Cognates: anu 'yith'→jiθ, nus 'jith'→dʒiθ.
- **Fix:** Best fix: align to the singular citation form as ["yic", "jic"] — this keeps the existing, already-correct IPA (jic = dictionary yïc) and only corrects the surface, requiring no fabrication. The reviewer's alternative, aligning to the plural as ["yith", "jit̪"] (Dinka "th" = dental stop /t̪/, dictionary yïth), is also valid; note "jit̪" is the dental-stop rendering, not "jiθ" (Dinka th is a stop, not a fricative). Either single-number pairing resolves the mismatch.
- **Source:** Internal inconsistency (surface dental th vs IPA palatal c); Anuak/Nuer cognates with dental final.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 1 applied, 4 awaiting a decision.
