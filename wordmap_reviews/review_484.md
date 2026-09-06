# Wordmap data review #484 — niger-congo-bantu

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: niger-congo-bantu.

## Reviewer self-introduction (ペルソナ自己紹介)

Bantu reviewer; noun-class citation, tone. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] five / ki (Kikuyu)
- **Issue:** The IPA for "ithano" is given as /iɣðano/, inserting a stray velar fricative /ɣ/. Kikuyu "th" = /ð/ and there is no g in the word; compare the file's own ki "three" (ithatu → /iðatu/) and ki "eye" (riitho → /riːðo/). The /ɣ/ belongs only to forms with an orthographic g (cf. ki "two" igĩrĩ → /iɣɪɾɪ/) and was mis-copied here.
- **Fix:** Change the IPA at words/five.js:503 from "iɣðano" to "iðano" (surface "ithano" unchanged), matching the repo's own ebu five entry.
- **Source:** Internal consistency with ki three/eye entries in the same repo; Kikuyu orthography th=/ð/ (Wiktionary 'ithano').
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [MED] five / bem (Bemba)
- **Issue:** Bemba "five" is listed as surface "isano", which breaks the counting-prefix series used for the other numerals in the file: cimo (1), fibili (2), fitatu (3), fine (4). The regular class-8 counting form of 5 is "fisano", so the "i-" prefix is anomalous.
- **Fix:** five / bem: ["fisano", "fisano"] (matches suggestedFix)
- **Source:** Omniglot Bemba numbers (cimo, fibili, fitatu, fine, fisano, mutanda…); Kitwe Online Bemba counting lesson.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 3. [MED] red / rw (Kinyarwanda)
- **Issue:** Kinyarwanda "red" is given as "utukura", not a standard citation form. The primary colour word is the adjective "umutuku"; the verb 'to be/become red' is "gutukura" (exactly what the paired rn/Kirundi cell uses). "utukura" matches neither and looks like a malformed reduction.
- **Fix:** umutuku (standard adjective/noun citation, per Glosbe). Alternatively gutukura if the verb form is intended, matching the rn/Kirundi cell.
- **Source:** Glosbe en-rw 'red' → umutuku; PolyglotClub Kinyarwanda colours (umutuku = red).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 4. [LOW] nose / ln (Lingala)
- **Issue:** The cell is ["zolo", "zóló"] — surface toneless, IPA field carrying orthographic acute tone. Every other Lingala cell does the reverse (surface tone, IPA toneless: mɔ́tɔ/mɔtɔ, líso/liso, máí/mai, sánzá/sanza), so the two fields are swapped. The dictionary form is "zólo" (high tone on first vowel only), not "zóló".
- **Fix:** Set surface to "zólo" and IPA to "zolo", i.e. ln: ["zólo", "zolo"] (matches the reviewer's suggested fix exactly).
- **Source:** Internal convention of ln cells in repo; Glosbe / dic.lingala.be entry 'zólo' = nose.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 0 applied, 4 awaiting a decision.
