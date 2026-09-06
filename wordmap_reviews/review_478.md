# Wordmap data review #478 — ie-hellenic-celtic-armenian-albanian

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: ie-hellenic-celtic-armenian-albanian.

## Reviewer self-introduction (ペルソナ自己紹介)

Hellenic/Celtic/Armenian/Albanian reviewer; native scripts, Wiktionary. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] fish/snow/hand/water/ear — hyw (Western Armenian)
- **Issue:** Western Armenian devoiced the Classical voiced obstruent series into voiceless ASPIRATED: ձ (dz) → /t͡sʰ/, ջ (dʒ) → /t͡ʃʰ/. The dataset applies this correctly in 'egg' hyw ձու = 'tsʰu', but drops the aspiration in the other cells with the same letters: fish ձուկ 'tsuɡ', snow ձիւն 'tsjun', hand ձեռք 'tsɛɾkʰ' (all ձ), and water ջուր 'tʃuɾ', ear ականջ 'akantʃ' (both ջ). These are internally inconsistent with 'egg' and with the standard Western reflex.
- **Fix:** fish → tsʰuɡ; snow → tsʰjun; hand → tsʰɛɾkʰ; water → tʃʰuɾ (these four match the suggested fix). ear → the suggested akantʃʰ fixes the aspiration but the fully-correct Western form is agantʃʰ, because the dataset's own convention voices Classical կ → ɡ everywhere else (cat կատու=ɡɑdu, fire կրակ=ɡɾɑɡ, red կարմիր=ɡɑɾmiɾ).
- **Source:** R. W. Thomson, An Introduction to Classical Armenian; standard descriptions of the Western Armenian consonant shift (voiced series → voiceless aspirated). Internal cross-check: egg.js hyw already uses 'tsʰu'.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [LOW] orange — hyw (Western Armenian)
- **Issue:** Spelled 'նարինճ' (with ճ) whereas the standard Armenian orthography of the word for orange is 'նարինջ' (with ջ), as the Eastern hy cell correctly has. The IPA 'naˈɾintʃ' also matches neither Eastern ջ (/d͡ʒ/) nor the Western reflex of ջ (/t͡ʃʰ/).
- **Fix:** hyw: ["նարինջ", "naˈɾintʃʰ"]
- **Source:** Standard Armenian dictionary spelling նարինջ (from Persian nāranj); Western Armenian ջ → /t͡ʃʰ/. Cross-check: orange.js hy cell = 'նարինջ'.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [LOW] wine — el_grc (Ancient Greek)
- **Issue:** οἶνος is transcribed 'óînos', which carries two accent marks in one word (acute on the first o AND a circumflex î on the same οι diphthong). This is malformed — Ancient οἶνος is a perispomenon, accented once on the οι diphthong.
- **Fix:** oînos
- **Source:** Ancient Greek οἶνος (perispomenon); standard romanization oînos. No transliteration system permits two accents on one vowel/diphthong.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 4. [LOW] wind — gv (Manx)
- **Issue:** Manx 'geay' (wind) is transcribed 'gjeː' using an ASCII 'g' (U+0067) rather than the IPA ɡ (U+0261) used in every other Celtic IPA cell in the dataset (e.g. wind ga 'gaoth' = 'ɡeː'); it is also the only such stray ASCII g in the slice. The 'gj' sequence is meant to be a palatalized velar.
- **Fix:** ɡʲeː
- **Source:** Manx 'geay' /ˈɡʲeː/; internal convention — all other Celtic cells use IPA ɡ. Confirmed via byte inspection (0x67 vs 0xC9A1).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 5. [LOW] snow — el (Modern Greek)
- **Issue:** χιόνι is transcribed 'çoni' with no stress mark, whereas every other Modern Greek noun in the dataset carries a primary-stress ˈ (e.g. nose μύτη 'ˈmiti', moon φεγγάρι 'feˈŋɡaɾi'). χιόνι is stressed on the first syllable.
- **Fix:** ˈçoni
- **Source:** Modern Greek χιόνι /ˈço.ni/; internal stress-marking convention across el cells.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 0 applied, 5 awaiting a decision.
