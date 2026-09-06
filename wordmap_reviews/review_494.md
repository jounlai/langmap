# Wordmap data review #494 — australian

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: australian.

## Reviewer self-introduction (ペルソナ自己紹介)

Australian Aboriginal reviewer; retroflex/lamino notation. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [HIGH] drink / aer (Eastern Arrernte)
- **Issue:** The cell gives "altyere" [altʲɛɾe] for 'drink', but altyerre is the very well-documented Arrernte word for the Dreaming/Altyerre (the ancestral creation cosmology), not the verb 'to drink'. This is a meaning error, not a spelling variant. Confirmed water = kwatye and hello = werte in this row match sources, so the row is otherwise Arrernte — this one cell is misassigned.
- **Fix:** —
- **Source:** Wikivoyage Eastern Arrernte phrasebook and Wikipedia (Arrernte people): 'the Arrernte name for the Dreaming is Altyerre'; Henderson & Dobson (1994) Eastern and Central Arrernte to English Dictionary.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [MED] eat / aer (Eastern Arrernte)
- **Issue:** The cell gives "arlkenge" [aɾlkɛŋe] for 'eat'. The dictionary/attested Arrernte verb 'to eat' is arlkweme (present 'is eating'); Arrernte present-tense verbs end in -eme/-me, and there is no -nge present ending, so arlkenge looks like a corrupted form. (Secondary: the IPA splits 'rl' as ɾl; in Arrernte rl is the retroflex lateral ɭ, so it should be aɭk-.)
- **Fix:** ["arlkweme", "aɭkʷəmə"] — surface "arlkweme" (present form, the standard Arrernte dictionary citation; verify final vowel against Henderson & Dobson 1994 if a strict citation form is wanted). IPA follows the dataset's own aer conventions: rl=retroflex ɭ, kw=kʷ, reduced final/medial e=ə → aɭkʷəmə.
- **Source:** UKLO Arrernte teaching material and general Arrernte grammar descriptions: arlkweme = 'is eating' (present of the 'eat' verb); Henderson & Dobson (1994).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [LOW] white / wbp (Warlpiri)
- **Issue:** Surface "kardirri" is transcribed [kaɖiɽi], using the retroflex flap ɽ for the digraph 'rr'. In Warlpiri orthography 'rr' is the alveolar tap/trill /r/ (~ɾ), 'r' is the retroflex approximant ɻ, and 'rd' is the retroflex stop ɖ. Every other Warlpiri 'rr' in the dataset is transcribed with plain r/ɾ (purrami→purami, jirrama→ɟiɾama, wanjirlpirri→waɲɟiɭpiri), so this ɽ is an internal-consistency error — the only ɽ in the entire Australian set.
- **Fix:** kaɖiɾi
- **Source:** Standard Warlpiri phonology (Nash 1986; Warlpiri Encyclopaedic Dictionary orthography key): rr = apical tap/trill, r = retroflex glide; and internal consistency with the dataset's own other 'rr' cells.
- **Disposition:** APPLIED (`9e3587f3`)

### 4. [LOW] love / aer (Eastern Arrernte)
- **Issue:** 'love' = "mwerre" [mʷərə] is identical to this row's 'good' = "mwerre". Mwerre means 'good/well/fine' in Arrernte; mapping it onto 'love' is a stretch and duplicates the 'good' cell. Arrernte typically expresses 'love/like' with a distinct predicate.
- **Fix:** Set love/aer to "—" (no citable single-word Arrernte 'love' exists; attested 'love/like' expressions are multi-word complex predicates, not the bare adjective mwerre 'good').
- **Source:** Wikivoyage/Arrernte glossaries and Henderson & Dobson: mwerre = 'good, well'.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 1 applied, 3 awaiting a decision.
