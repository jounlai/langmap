# Wordmap data review #491 — tai-kadai-hmong-mien

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: tai-kadai-hmong-mien.

## Reviewer self-introduction (ペルソナ自己紹介)

Tai-Kadai & Hmong-Mien reviewer; tone notation. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [HIGH] rain / hmn (White Hmong)
- **Issue:** Cell is ["naag","naːɡ"]. In Hmong RPA, final -g is a LOW-BREATHY TONE marker, not a /ɡ/ coda, and "naag" (doubled vowel) is not valid RPA — the word for rain is "nag". The dataset itself treats -g correctly elsewhere (thanks "ua tsaug" -> tɕɑu˦˨ʱ, no /ɡ/), so this cell wrongly adds a /ɡ/ consonant and extra vowel length.
- **Fix:** Surface "nag"; IPA "na˦˨ʱ" — a mid-low breathy-falling tone with no /ɡ/ coda and short vowel, consistent with the dataset's own -g convention in thanks/hmn ("tsaug" -> "...tɕɑu˦˨ʱ"). (The reviewer's "na˨˩̤"/"na˧̤" is also defensible but less consistent with the in-dataset breathy notation ʱ.)
- **Source:** Wikipedia Help:IPA/Hmong and Hmong phonology: RPA final b/m/d/j/v/s/g are tone letters; -g = low breathy tone. Confirmed via web search.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [HIGH] ear / blt (Tai Dam)
- **Issue:** Cell is ["ຫູ","huː"] — the surface is written in LAO script. Tai Dam (blt) uses the Tai Viet script (ꪢꪲ, ꪢꪱ …) throughout the rest of the dataset; Lao is a different language's script and is not among blt's listed scripts. A stray wrong-script cell in an otherwise native-script row.
- **Fix:** Replace the Lao surface ຫູ with the dataset's Latin fallback: ["hu","huː"] (matching the ~6 other Latin-form blt cells such as din/fon/hin). If a native form is preferred and can be sourced, the Tai Viet spelling is ꪬꪴ (HIGH HO U+AAAC + VOWEL SIGN U U+AAB4) — but per the no-fabrication rule the Latin "hu" is the safest defensible value. Keep the IPA as huː.
- **Source:** wordmap_meta.js blt script field ('Tai Viet (indigenous, U+AA80–AADF) / Latin / …'); Lao is the U+0E80 block, not a blt script.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [MED] ear / th_n (Northern Thai) and th_s (Southern Thai)
- **Issue:** Both cells are ["hu:","huː"] — the surface is a raw romanization with a colon, not Thai script. Every other th_n/th_s cell uses Thai script (หมี, นก, หมา, ฟัน), so these two are stray transliteration placeholders.
- **Fix:** Set surface to Thai script "หู" for both th_n and th_s, i.e. th_n: ["หู", "huː"] and th_s: ["หู", "huː"] (matching the suggestedFix; IPA huː retained).
- **Source:** Internal consistency: th_n/th_s use Thai script for all other concepts; Thai for ear is หู.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 4. [MED] sleep / hmn (White Hmong)
- **Issue:** Cell is ["pw","pˠ"]. The IPA "pˠ" is a velarized /p/ with no vowel — it drops the syllable's vowel. RPA "pw" = /p/ + vowel w (/ɨ/), no tone letter = mid tone.
- **Fix:** ["pw", "pɨ˧"]
- **Source:** Wikipedia Help:IPA/Hmong: RPA vowel 'w' = /ɨ/; bare syllable (no tone letter) = mid tone.
- **Disposition:** APPLIED (`9e3587f3`)

### 5. [MED] tooth / hmn (White Hmong)
- **Issue:** Cell is ["hniav","n̥ia˨˩"]. RPA final -v marks the mid-RISING tone, rendered ˨˦ elsewhere in the dataset (dog "dev" -> tɛ˨˦). Here the same -v is given as low ˨˩, which is actually the -s tone (as in bear "dais").
- **Fix:** n̥ia˨˦
- **Source:** Wikipedia Help:IPA/Hmong tone table (-v mid rising, -s low); internal comparison with dog "dev" ˨˦.
- **Disposition:** APPLIED (`9e3587f3`)

**File status: OPEN** — 2 applied, 3 awaiting a decision.
