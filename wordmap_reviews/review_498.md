# Wordmap data review #498 — creole-constructed

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: creole-constructed.

## Reviewer self-introduction (ペルソナ自己紹介)

Creole & constructed-language reviewer. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] rain / jbo (Lojban)
- **Issue:** IPA is transcribed [ˈtʃarvi], but Lojban orthographic <c> is always /ʃ/ — only the digraph <tc> is /tʃ/. 'carvi' has no <t>, so it is /ˈʃarvi/. This cell is the lone outlier: every other Lojban cell on the map correctly maps <c> to ʃ (cipni→ˈʃipni, citka→ˈʃitka, ciblu→ʃiblu, ci→ʃi, kalci→ˈkalʃi).
- **Fix:** rain / jbo: change IPA to ["carvi", "ˈʃarvi"] (surface 'carvi' unchanged).
- **Source:** Lojban Reference Grammar (CLL) ch.3 phonology: <c> = /ʃ/; internal consistency with the map's own other jbo cells.
- **Disposition:** APPLIED (`9e3587f3`)

### 2. [MED] ear / jam (Jamaican Patois)
- **Issue:** The surface field holds 'ɛɩz' — an IPA-like string (it even uses U+0269 LATIN SMALL LETTER IOTA 'ɩ'), not a Jamaican orthographic spelling. In Cassidy/JLU spelling and standard Patwa dictionaries the word is 'iez'. surface===ipa is fine elsewhere, but here the surface is neither a real orthography nor a clean IPA.
- **Fix:** surface = 'iez'; ipa = 'iɛz' (Cassidy/JLU orthography; 'ie' digraph = /iɛ/). Source: jamaicanpatwah.com term Iez/2382.
- **Source:** jamaicanpatwah.com — 'Iez' = ears ('Opin up yuh iez and listen'); Cassidy/JLU orthography.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [LOW] computer / jbo (Lojban)
- **Issue:** Empty despite broad coverage; Lojban has a root gismu for computer.
- **Fix:** jbo: ['skami', 'ˈskami'] — the suggested fix is correct as-is. surface 'skami' (the gismu), IPA /ˈskami/ (penultimate stress per Lojban phonotactics).
- **Source:** Lojban gismu list — 'skami' x1 is a computer.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 4. [LOW] computer / tlh (Klingon)
- **Issue:** Empty despite broad coverage; Klingon has a canonical Okrand word for computer/data device — unlike 'snow', this one is attested.
- **Fix:** tlh: ["De'wI'", "ɖɛʔwɪʔ"]
- **Source:** Okrand, The Klingon Dictionary — 'De'wI'' = computer/data device.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 1 applied, 3 awaiting a decision.
