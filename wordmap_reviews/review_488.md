# Wordmap data review #488 — turkic

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: turkic.

## Reviewer self-introduction (ペルソナ自己紹介)

Turkic reviewer; Latin/Cyrillic/Arabic orthographies, vowel harmony. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] tea / kaa
- **Issue:** Karakalpak is Latin-official, and every other kaa cell in the dataset is Latin (suw, bir, qara, ayıw, dóńgelek, kóz…), but the 'tea' cell is Cyrillic: ["шай", "ʃaj"]. This is a stray Cyrillic surface in an otherwise-Latin column.
- **Fix:** ["shay", "ʃaj"]
- **Source:** Omniglot Karakalpak alphabet / Karakalpak Wikipedia orthography (Latin-official, sh digraph); consistency with all other kaa cells in this repo.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [MED] nose / otk
- **Issue:** The otk (Old Turkic) column is written in Orkhon runiform throughout (e.g. water 𐰽𐰆𐰉, fire 𐰆𐱃, eye 𐰚𐰕), with unattested items given as '—' (cat, hello, thanks). But 'nose' otk is Latin: ["burun", "burun"] — a stray Latin cell breaking the column's native-script convention.
- **Fix:** otk: ["𐰉𐰆𐰺𐰆𐰣", "burun"]  (runiform surface b¹-u-r¹-u-n¹ + Latin transliteration, matching the column's [runiform, translit] format; this is the same value the suggested fix's runiform option gives)
- **Source:** Internal convention of the otk column (runiform elsewhere, '—' for unattested); Old Turkic 'burun' (nose) per Clauson EDPT / Drevnetyurkskiy slovar.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [LOW] tree / kaa (also rain / kaa)
- **Issue:** kaa 'tree' = ["ag'ash", "aʁaʃ"] and 'rain' = ["jamgʻır", "dʒɑmˈʁɯr"] write /ʁ/ (Cyrillic Ғ) with an apostrophe digraph (g' / gʻ). That is the pre-2016 Karakalpak Latin convention; the current official alphabet replaced Gʻ with the single letter Ǵ. It is also internally inconsistent with kaa cells that already use the diacritic alphabet (dóńgelek, kóz, súyek, tún, kún).
- **Fix:** tree/kaa → ["aǵash", "aʁaʃ"]; rain/kaa → ["jamǵır", "dʒɑmˈʁɯr"] (same as suggestedFix)
- **Source:** Wikipedia 'Ǵ' / Common Turkic Alphabet: Karakalpak replaced Gʻ with Ǵ in the 2016 orthography reform.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 4. [LOW] white / cv (also tooth / cv)
- **Issue:** Chuvash ш = /ʃ/ and ҫ = /ɕ/, but the transcription of ш is inconsistent and, for 'white', wrong: white ["шурӑ", "ɕurə"] transcribes ш as ɕ (the sound of the *different* letter ҫ, cf. star ҫӑлтӑр → ɕɔltor), and tooth ["шӑл", "ʂəl"] uses retroflex ʂ. Water ["шыв", "ʃɯv"] correctly uses ʃ.
- **Fix:** white/cv → ["шурӑ", "ʃurə"]; tooth/cv → ["шӑл", "ʃəl"] (same as the reviewer's suggested fix; reserve ɕ for ҫ as in star).
- **Source:** Chuvash phonology (Wikipedia): ш = /ʃ/, ҫ = /ɕ/; internal contrast with water cv (ʃ) and star cv (ҫ→ɕ) in this repo.
- **Disposition:** APPLIED (`9e3587f3`)

### 5. [LOW] good / kaa
- **Issue:** kaa 'good' = ["jaqsi", "ʒaqsɯ"] spells жақсы with a dotted i, but Karakalpak Latin represents ы with dotless ı (cf. kaa daughter 'qız', bear 'ayıw', rain 'jamgʻır'). The IPA already shows /ɯ/, so the surface should match.
- **Fix:** good / kaa: ["jaqsı", "ʒaqsɯ"] (change surface dotted i → dotless ı, matching the suggested fix)
- **Source:** Karakalpak Latin alphabet (ı = ы); internal consistency with other kaa cells in this repo.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 1 applied, 4 awaiting a decision.
