# Wordmap data review #480 — austronesian-wmp

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: austronesian-wmp.

## Reviewer self-introduction (ペルソナ自己紹介)

Western Malayo-Polynesian reviewer; ABVD, native scripts. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [HIGH] water / ssf (Thao)
- **Issue:** Thao 'water' is given as surface 'nanum' (IPA nanum), but 'nanum' is the Sakizaya/Amis reflex — it is identical to the neighboring szy cell in the same row, indicating a copy-from-neighbor error. The regular Thao reflex of PAn *daNum is 'sazum' (Thao letter z = /ð/, matching this same row's zama /ðama/, muzin /muðin/, furaz /fuɾað/).
- **Fix:** ssf water: ["sazum", "saðum"]
- **Source:** Austronesian Comparative Dictionary (Blust & Trussel) / Wiktionary Reconstruction:Proto-Austronesian *daNum reflex table — Thao 'sazum', Sakizaya 'nanum', Amis 'nanom'.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 2. [MED] sun / ssf and tree / ssf (Thao) — IPA field
- **Issue:** The Thao digraph 'lh' is transcribed inconsistently. In four cells it is /ɬ/ (talhum /taɬum/, lharina /ɬarina/, malhus /maɬus/, qtilha /qtiɬa/), but in 'sun' fitulha it is /fituʎa/ and in 'tree' lhalum it is /ʎalum/. Thao 'lh' is the voiceless lateral fricative /ɬ/, so the two /ʎ/ transcriptions are wrong (and internally inconsistent with the rest of the Thao rows).
- **Fix:** Change ssf sun IPA from "fituʎa" to "fituɬa" and ssf tree IPA from "ʎalum" to "ɬalum" (surfaces "fitulha" and "lhalum" unchanged). Same as the proposed suggestedFix.
- **Source:** Blust (2003) Thao Dictionary phonology / standard Thao orthography (lh = /ɬ/); internal consistency with the other four ssf 'lh' cells in this dataset.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 0 applied, 2 awaiting a decision.
