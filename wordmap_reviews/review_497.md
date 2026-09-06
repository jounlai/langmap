# Wordmap data review #497 — caucasus-isolates

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: caucasus-isolates.

## Reviewer self-introduction (ペルソナ自己紹介)

Caucasian & isolates reviewer; Georgian/Cyrillic, Basque. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] blood / niv and tooth / niv
- **Issue:** Nivkh 'blood' ("ңар") and 'tooth' ("ңыхс") spell the velar nasal with U+04A3 ң (CYRILLIC EN WITH DESCENDER — a Kazakh/Turkic letter), whereas every other Nivkh entry (bone ӈыньф, egg ӈойӄ, eye ӈак, hello ӈафӄа, snow ӈаӄр, moon лоӈ, etc.) correctly uses U+04C8 ӈ (EN WITH HOOK), the standard Nivkh letter for /ŋ/. These two cells are the outliers; the mismatched code point breaks font rendering consistency and exact-string search/dedup even though the two glyphs look nearly identical.
- **Fix:** Replace U+04A3 ң with U+04C8 ӈ in both cells: blood niv → ["ӈар","ŋar"], tooth niv → ["ӈыхс","ŋəxs"].
- **Source:** Modern Nivkh Cyrillic alphabet uses ӈ U+04C8 for /ŋ/ (Omniglot: Nivkh; internal consistency — 7 of 9 velar-nasal Nivkh cells already use U+04C8).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [MED] tongue / eu (Basque)
- **Issue:** Basque 'mihi' (tongue) is given the IPA "miçi" with a voiceless palatal fricative [ç], which is not a realization of Basque intervocalic h. Basque h is either an aspirate /h/ (Northern/Navarro-Lapurdian dialects) or silent (Southern), never [ç].
- **Fix:** mihi
- **Source:** Wiktionary 'mihi' and Help:IPA/Basque: mihi = /mihi/ [mi.hi] (N), [mi] (S).
- **Disposition:** APPLIED (`9e3587f3`)

### 3. [MED] two/name/star/four/hundred/cuckoo across av, ce, lez, ddo, lbe, kbd, ady
- **Issue:** A systematic palochka encoding inconsistency: these cells use the CAPITAL palochka Ӏ (U+04C0) inside lowercase words — e.g. av "цӀва"(star)/"цӀар"(name)/"кӀиго"(two), ce "цӀе"(name)/"бӀе"(hundred), lez "тӀвар"(name)/"кукупӀ"(cuckoo), ady/kbd "тӀу"(two)/"плӀы"(four)/"цӀэ"(name), ddo/lbe similar — while the rest of the corpus (fire цӏа, black чӏегӏераб, etc.) uses the correct lowercase palochka ӏ (U+04CF). The two code points render almost identically but are distinct characters, so search, sorting and deduplication treat these cells differently.
- **Fix:** The suggested fix is correct: normalize U+04C0 (Ӏ) to U+04CF (ӏ) in the affected lowercase Cyrillic-Caucasian surface forms; IPA unchanged. Note the true scope is broader than the 7 enumerated languages — 48 cells across ~19 codes and 11 files (cuckoo/four/hundred/name/one/red/star/two/white/wine/you.js), also affecting ani, bdk, huz, udi, inh, khv, kjj, agx, tab, aqc, dar, abq — so a global U+04C0→U+04CF replace over surface strings (not just the 6 cited concepts) is the complete fix. The lang_words/*.js generated mirrors must be regenerated afterward.
- **Source:** Standard Cyrillic casing: U+04CF ӏ is the lowercase palochka; U+04C0 Ӏ is its capital. Internal convention — majority of cells already use U+04CF.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 4. [LOW] fish / ain (Ainu)
- **Issue:** Ainu 'cep' (fish) surface is katakana チェㇷ゚ (che-p) but IPA is "tsep" ([ts]), while the katakana チェ encodes [tʃe]. The dataset transcribes the Ainu affricate /c/ three different ways — ts (fish), tʃ (bird チカㇷ゚ tʃikap), and tɕ (cat チャペ tɕape, house チセ tɕise, star ノチウ notɕiw) — so 'fish' is the odd one out and also mismatches its own katakana.
- **Fix:** ain (fish): ["チェㇷ゚", "tɕep"] — change IPA "tsep" to "tɕep" to match the katachi チェ and the tɕ used in cat/house/star (or "tʃep" to match bird); either is defensible, tɕep is most consistent with the dataset's own majority convention.
- **Source:** Ainu phonology: /c/ realized [t͡ʃ]; internal inconsistency vs bird/cat/house/star cells and the チェ katakana.
- **Disposition:** APPLIED (`9e3587f3`)

**File status: OPEN** — 2 applied, 2 awaiting a decision.
