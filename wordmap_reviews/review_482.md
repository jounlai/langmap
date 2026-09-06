# Wordmap data review #482 — afroasiatic-semitic

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: afroasiatic-semitic.

## Reviewer self-introduction (ペルソナ自己紹介)

Semitic reviewer; abjad scripts, root/citation conventions. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] white (akk), egg (akk), wine (akk)
- **Issue:** The Akkadian row is written in cuneiform in ~55 of ~58 cells (e.g. white would pattern with logographic/syllabic spelling), but three cells give a Latin normalization instead of cuneiform: white peṣû [pesˤuː], egg pēlu [peːlu], wine karānu [karaːnu]. This is exactly the 'row mostly native script with stray Latin cells' pattern, not a by-convention uniform-transliteration row.
- **Fix:** Keep each cell's IPA (second element) unchanged. Wine has a well-attested logogram: set wine akk to ["𒃾","karaːnu"] (GEŠTIN, the standard Sumerogram for karānu 'wine') — this is confidently attestable. For egg and white, the reviewer's syllabic guesses (pe-lu, pe-ṣu-ú) are plausible but I cannot independently attest the exact sign sequences without risking fabrication; per the project's HARD RULE (unsourced ⇒ "—", never invent), the defensible fix for egg and white is to set them to "—" unless a specific cuneiform spelling can be reliably sourced. Do NOT insert unverified syllabic cuneiform.
- **Source:** Black, George & Postgate, A Concise Dictionary of Akkadian (karānu 'wine' = GEŠTIN; peṣû 'white'; pēlu 'egg'); rest of the akk row is cuneiform.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [MED] white (ar_lev)
- **Issue:** IPA value is "ʔabyad" — the letter 'y' is not IPA (IPA [y] is a close front rounded vowel). The intended sound is the palatal glide [j]. Every other Arabic variety in the dataset renders this word with [j] (ar ʔabjadˤ, ar_sy/ar_lb/ar_ps ʔabjad). The emphatic /dˤ/ is also dropped here versus MSA.
- **Fix:** ʔabjad (matching the dataset's other Levantine rows ar_sy/ar_lb/ar_jo/ar_ps; "ʔabjadˤ" is also acceptable if aligning to MSA, but the emphatic is dropped across the rest of the Levantine family)
- **Source:** IPA chart (j = palatal approximant, y = close front rounded vowel); Levantine Arabic أبيض /ʔabjadˤ/.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [MED] milk (he)
- **Issue:** IPA "ẖaˈlav" uses U+1E96 (ẖ, Latin small h with line below), a romanization symbol, not IPA. Modern Hebrew ח is a fricative rendered as χ everywhere else in the Hebrew row (eχad, χameʃ, χatul, ʃaˈχoʁ, jaˈʁeaχ). This one cell is the outlier.
- **Fix:** χaˈlav
- **Source:** Standard Modern Hebrew IPA for חלב /χaˈlav/; U+1E96 is not an IPA character.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 0 applied, 3 awaiting a decision.
