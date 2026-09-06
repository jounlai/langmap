# Wordmap data review #489 — mongolic-tungusic

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: mongolic-tungusic.

## Reviewer self-introduction (ペルソナ自己紹介)

Mongolic/Tungusic reviewer; Cyrillic/Manchu script, reconstructions. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [HIGH] hundred / sjo (Xibe)
- **Issue:** IPA is "taŋ", a truncation. The surface ᡨᠠᠩᡤᡡ (tanggū) is complete, but the IPA drops the entire second syllable -gū. Xibe/Manchu tanggū is [taŋɡuː] (cf. the mnc cell in the same concept, correctly "taŋɡuː").
- **Fix:** taŋɡuː
- **Source:** Manchu/Xibe tanggū = 100, [taŋɡuː] (Wiktionary таӈгу; Norman, A Concise Manchu-English Lexicon); internal comparison with the mnc cell taŋɡuː.
- **Disposition:** APPLIED (`9e3587f3`)

### 2. [MED] rain / mnc (Manchu)
- **Issue:** IPA "aqa" uses a voiceless uvular [q]. The surface ᠠᡤᠠ is aga, whose ᡤ is voiced g ([ɡ]~[ɢ] in back-vowel context); Manchu has no voiceless [q] here. The parallel sjo cell for the identical script is correctly "aɡa".
- **Fix:** aɡa
- **Source:** Manchu orthography/phonology: ᡤ = voiced g; Norman, Concise Manchu-English Lexicon s.v. 'aga' (rain); internal comparison with sjo aɡa.
- **Disposition:** APPLIED (`9e3587f3`)

### 3. [MED] tongue / sjo (Xibe)
- **Issue:** IPA "iliŋ" truncates the word: the surface ᡳᠯᡝᠩᡤᡠ is ilenggu, but the IPA drops the final -gu. Even allowing Xibe reduction, the whole final syllable is lost (cf. mnc "ilɤŋɡu").
- **Fix:** iliŋɡu
- **Source:** Manchu ilenggu 'tongue' [iləŋɡu] (Norman); internal comparison with the mnc cell ilɤŋɡu.
- **Disposition:** APPLIED (`9e3587f3`)

### 4. [MED] orange / mn_cn (Inner Mongolian)
- **Issue:** Surface "жүрж" is Cyrillic (the Khalkha form copied over) in a column that otherwise consistently uses Traditional Mongolian vertical script (e.g. sun ᠨᠠᠷᠠ, wine ᠳᠠᠷᠠᠰᠤ, wheel ᠬᠦᠷᠳᠦ). It is a stray-script cell inconsistent with the mn_cn convention.
- **Fix:** mn_cn: ["ᠵᠦᠷᠵᠢ", "dʒyrdʒ"] — replace the Cyrillic surface with the Traditional Mongolian script spelling ᠵᠦᠷᠵᠢ (ǰürǰi) per Wiktionary; keep the Cyrillic жүрж only under mn (Khalkha). IPA may stay dʒyrdʒ.
- **Source:** mn_cn column is defined with native ᠮᠣᠩᠭᠣᠯ (Traditional Mongolian script); all other mn_cn cells follow it — internal consistency.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 3 applied, 1 awaiting a decision.
