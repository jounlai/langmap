# Wordmap data review #496 — meso-south-american

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: meso-south-american.

## Reviewer self-introduction (ペルソナ自己紹介)

Meso/South American reviewer; Nahuatl/Mayan/Quechua/Amazonian. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] red / quc (K'iche')
- **Issue:** Surface is "kaq" (plain /k/) but the IPA is transcribed "kʼaq" with an ejective. K'iche' phonemically contrasts plain k and ejective kʼ, and 'red' is /kaq/ (the ejective word qʼaq is 'fire', already correctly listed in fire.js). The ejective diacritic in the red IPA is a typo that contradicts the surface form.
- **Fix:** Change the red/quc IPA from "kʼaq" to "kaq", making the cell quc: ["kaq", "kaq"].
- **Source:** Wiktionary 'kaq' (K'iche' adjective 'red', spelled with plain k); Christenson K'iche'-English Dictionary; contrast with quc fire = qʼaq in fire.js.
- **Disposition:** APPLIED (`9e3587f3`)

### 2. [MED] stone / ay (Aymara)
- **Issue:** Surface is "qala" (plain uvular /q/) but IPA is "ˈqʼala" with an ejective qʼ. Aymara 'stone' is /qala/ with a plain q; the ejective diacritic contradicts the surface spelling and the attested form.
- **Fix:** Change IPA from "ˈqʼala" to "ˈqala" (remove the ejective diacritic; keep the penultimate stress mark).
- **Source:** Aymara toponym Janqʼu Qala = 'white (janqʼu, ejective) stone (qala, plain)' — Wikipedia; standard Aymara dictionaries (qala = piedra).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 1 applied, 1 awaiting a decision.
