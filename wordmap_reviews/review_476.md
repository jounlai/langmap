# Wordmap data review #476 — ie-slavic-baltic

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: ie-slavic-baltic.

## Reviewer self-introduction (ペルソナ自己紹介)

Slavic & Baltic phonologist; stress/accent paradigms, Wiktionary, standard grammars. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] heart / lt (Lithuanian širdis)
- **Issue:** IPA marks initial stress "ˈʃʲɪrdʲɪs", but širdìs is an accent-paradigm-3 noun whose nominative singular is oxytone (final-stressed). The surface form is correct; only the stress placement is wrong.
- **Fix:** ʃʲɪrʲˈdʲɪs (stress on final syllable; matches Wiktionary exactly, which also palatalizes r as rʲ. The reviewer's ʃʲɪrˈdʲɪs also fixes the stress but omits the rʲ palatalization present in the source.)
- **Source:** Wiktionary 'širdis' (Lithuanian): IPA [ʃʲɪrʲˈdʲɪs], stress pattern 3 (final stress).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [MED] daughter / cs (Czech dcera)
- **Issue:** IPA "ˈdtsɛra" transcribes a phantom [d] stop before the affricate. In standard Czech the 'dc' cluster is a single [t͡s]; the d is not pronounced as a separate segment.
- **Fix:** ˈtsɛra
- **Source:** Wiktionary 'dcera' (Czech): IPA [ˈt͡sɛra].
- **Disposition:** APPLIED (`9e3587f3`)

### 3. [MED] daughter / sk (Slovak dcéra)
- **Issue:** IPA "ˈdtseːra" inserts a separate [d] before the affricate; standard Slovak realizes 'dc' as a single [t͡s].
- **Fix:** ˈtseːra
- **Source:** Wiktionary 'dcéra' (Slovak): /t͡seːra/, [ˈt͡seːra].
- **Disposition:** APPLIED (`9e3587f3`)

### 4. [MED] iron / mk (Macedonian железо)
- **Issue:** IPA "ʒɛˈlɛzo" places stress on the penult, mirroring Bulgarian желя́зо; Macedonian has fixed antepenultimate stress, so a trisyllabic же-ле-зо is stressed on the first syllable.
- **Fix:** ˈʒɛlɛzɔ
- **Source:** Wiktionary 'железо' (Macedonian): IPA [ˈʒɛlɛzɔ], proparoxytone.
- **Disposition:** APPLIED (`9e3587f3`)

### 5. [MED] orange / mk (Macedonian портокал)
- **Issue:** IPA "pɔrtɔˈkal" marks final stress (copying Bulgarian портока́л); Macedonian antepenultimate stress puts the accent on the first syllable of por-to-kal.
- **Fix:** mk: ["портокал", "ˈpɔrtɔkal"] — move the stress mark to the first syllable. (Keeping plain "l" rather than dark "ɫ" to match the dataset's existing convention across bg/sq/aln; the load-bearing correction is the stress placement.)
- **Source:** Wiktionary 'портокал' (Macedonian): IPA [ˈpɔrtɔkaɫ], proparoxytone.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 6. [LOW] house / mk (Macedonian куќа)
- **Issue:** IPA "ˈkutɕa" transcribes ќ as the affricate [tɕ] (a Serbian ћ value); standard Macedonian ќ is the voiceless palatal stop [c]. Inconsistent with this dataset's own 'night' mk (ноќ → "noc") and 'daughter' mk (ќерка → "ˈcɛrka"), which correctly use [c].
- **Fix:** ˈkuca
- **Source:** Wiktionary 'куќа' (Macedonian): IPA [ˈkuca].
- **Disposition:** APPLIED (`9e3587f3`)

**File status: OPEN** — 4 applied, 2 awaiting a decision.
