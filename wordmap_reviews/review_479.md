# Wordmap data review #479 — japonic-koreanic-ainu

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: japonic-koreanic-ainu.

## Reviewer self-introduction (ペルソナ自己紹介)

Japonic/Koreanic/Ainu specialist; OJ kō/otsu, MK tone, Ryukyuan, Ainu katakana. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] rain / ain (surface field)
- **Issue:** The Ainu 'rain' cell is ['apto','apto'] — the surface (first) element is Latin 'apto', but every other Ainu cell in the dataset uses katakana for the surface (e.g. water ワッカ, bird チカㇷ゚, wind レラ). This is a stray Latin surface on an otherwise katakana-native row, and Ainu is a visible (non-excluded) modern row, so it renders inconsistently. The form itself is correct.
- **Fix:** Change surface to katakana: ["アㇷ゚ト", "apto"] (small ㇷ゚ for coda /p/, matching existing bird チカㇷ゚ / fish チェㇷ゚ cells). IPA stays "apto".
- **Source:** Internal convention (all ~20 other ain surfaces are katakana); Ainu 'apto' = rain confirmed in standard Ainu lexica (Batchelor, Ainu-English-Japanese Dictionary).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [MED] rain / ojp (IPA field)
- **Issue:** OJ 'rain' is given as 'amə'. The dataset marks otsu-class (乙) e as the digraph 'ey' (cf. house ipey = ipe₂, wine sakey = sake₂), and reserves schwa 'ə' for otsu-class o (heart kəkərə, drink nəmu, four jətu, one pitətu — all o-syllables). 'amə' is the only place 'ə' lands on an e-final word: OJ ame 'rain' is ame₂ (otsu-e, man'yōgana 阿米 with 米 = me乙), so it should carry the 'ey' vowel, not schwa. As written it effectively reads 'amo'.
- **Fix:** amey
- **Source:** Frellesvig, A History of the Japanese Language (ame₂ 'rain'); Arisaka/Ōno kō-otsu tables (米 = me乙); dataset-internal notation (ipey, sakey).
- **Disposition:** HELD — Japanese/Korean special care

### 3. [MED] eye / ojp
- **Issue:** OJ 'eye' is given as ['目','ma']. 'ma' is the bound/compositional stem (ma-buta, mana-ko); the free-standing OJ noun for eye is me₂ (mey). Every other body-part row uses the free noun (ear mimi, nose pana, tooth pa, tongue sita, hand te, bone pone), and the Heian row here is 'me' — listing OJ as 'ma' implies a nonexistent ma→me shift, since OJ already had me₂.
- **Fix:** ojp: ["目", "mey"]  (the free-noun otsu-e citation form, consistent with p_jpn *may; "me" or "me₂" also acceptable but "mey" best preserves the otsu-rui distinction and matches the *may derivation)
- **Source:** Frellesvig/Vovin Old Japanese lexicon (me₂ 'eye', bound form ma-).
- **Disposition:** HELD — Japanese/Korean special care

### 4. [LOW] good / ojp
- **Issue:** OJ 'good' IPA is 'jo₁si', containing a literal inline subscript numeral ₁ — the only place in the whole slice where a subscript-number kō/otsu convention appears. Everywhere else kō (甲) is left unmarked and only otsu is diacritically marked (ï/ey/ə). 与 (yo) is kō, so the ₁ is both redundant and a notation clash.
- **Fix:** jəsi
- **Source:** Dataset-internal notation consistency (all other kō syllables unmarked).
- **Disposition:** HELD — Japanese/Korean special care

### 5. [LOW] fish / ain (and cat/bird)
- **Issue:** Ainu /c/ is transcribed three different ways across cells: fish チェㇷ゚ = 'tsep' (ts), bird チカㇷ゚ = 'tʃikap' (tʃ), cat チャペ = 'tɕape' (tɕ). Ainu has a single affricate phoneme /c/; the standard IPA realization is [t͡ʃ]. The 'tsep' spelling in particular is inconsistent with the katakana チェ (che, not tse).
- **Fix:** fish/ain IPA should be "tʃep" (equally defensible: "tɕep", which would also match the cat cell's tɕ). The essential correction is replacing the erroneous "ts" with the affricate the katakana チェ actually encodes; the surface チェㇷ゚ stays unchanged.
- **Source:** Standard Ainu phonology (single affricate /c/ ≈ [t͡ʃ]); internal inconsistency across ain rows.
- **Disposition:** APPLIED (`9e3587f3`)

**File status: OPEN** — 1 applied, 4 awaiting a decision.
