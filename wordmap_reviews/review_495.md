# Wordmap data review #495 — north-american

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: north-american.

## Reviewer self-introduction (ペルソナ自己紹介)

Indigenous North American reviewer; Cherokee/Canadian syllabics, tone/nasal. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] five / kl (Kalaallisut / Greenlandic)
- **Issue:** IPA for 'tallimat' is 'tatːlimat', which is malformed: the length mark precedes a plain /l/ and the digraph <ll> is not rendered as the Greenlandic voiceless lateral. Greenlandic <ll> is /t͡ɬː/ (cf. Kalaallisut [kalaːɬːisut]). The dataset already uses ɬː correctly for kl elsewhere (illu → iɬːu, marluk → maɬːuk).
- **Fix:** taɬːimat
- **Source:** Greenlandic phonology (Wikipedia 'Greenlandic language'; native-languages.org Kalaallisut guide); in-data consistency with kl illu/marluk.
- **Disposition:** APPLIED (`9e3587f3`)

### 2. [MED] snow / lkt (Lakota)
- **Issue:** 'wá' (snow) is transcribed with a nasalized vowel /wã/, but the vowel is oral: Lakota orthography marks nasality only with a following n/ŋ, which this word lacks. The Dakota cognate cell (dak snow 'wá') is transcribed with an oral vowel.
- **Fix:** wá
- **Source:** Lakota orthography/phonology (native-languages.org Lakota guide; Wikipedia 'Lakota language'); in-data dak cognate.
- **Disposition:** APPLIED (`9e3587f3`)

### 3. [MED] three / kio (Kiowa)
- **Issue:** Surface 'pʼą́ːò' has an ejective /pʼ/, but the IPA 'pʰãːo' uses aspirated /pʰ/. Kiowa contrasts ejective /pʼ/ and aspirate /pʰ/ as distinct phonemes, so both cannot be right; the IPA also drops the surface tone marks.
- **Fix:** IPA should be the ejective, with the surface's high-low tone restored: "pʼã́ːò" (cell becomes ["pʼą́ːò", "pʼã́ːò"]). Note: the reviewer's suggested /pʼã̀ːò/ is right in direction but mismarks the first vowel as low tone (à); the surface has high tone (ą́), so the first vowel should be ã́, not ã̀.
- **Source:** Kiowa phonology, /pʼ/ vs /pʰ/ contrast (Wikipedia 'Kiowa phonology'; Watkins & McKenzie 1984, A Grammar of Kiowa); internal surface/IPA mismatch.
- **Disposition:** APPLIED (`9e3587f3`)

### 4. [LOW] daughter / chr (Cherokee)
- **Issue:** 'daughter' (ᎤᏪᏥ ᎠᎨᏴ) transcribes the syllable Ꮵ as /dʒi/ ('uwedʒi'), while 'egg' — the identical syllabary word ᎤᏪᏥ — transcribes it as /tsi/ ('uwetsi'). Same character, two renderings of the same morpheme.
- **Fix:** daughter/chr should read ["ᎤᏪᏥ ᎠᎨᏴ", "uwetsi aɡejə̃"] — i.e., change the first word uwedʒi → uwetsi to match the standard romanization of Ꮵ (tsi) and the identical ᎤᏪᏥ in egg/chr. (Same as the reviewer's suggested fix.)
- **Source:** Internal inconsistency between chr daughter and chr egg (both ᎤᏪᏥ); Cherokee syllabary Ꮵ = tsi.
- **Disposition:** APPLIED (`9e3587f3`)

### 5. [LOW] water / crk (Plains Cree)
- **Issue:** Syllabics ᓂᐱᕀ include final ᕀ (y = /j/), but the crk IPA 'nipiː' drops the glide, whereas the cr cell for the same word keeps it ('nipij'). Plains Cree 'nipiy' is /nipiːj/.
- **Fix:** Change crk "water" IPA from "nipiː" to "nipij" (not "nipiːj"): match the syllabics ᓂᐱᕀ, the cr cognate cell, and Wiktionary /niˈpij/ — short vowels with a final /j/ glide; no long vowel.
- **Source:** In-data consistency with cr water (ᓂᐱᕀ → nipij); Cree syllabics final ᕀ = y/j.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

**File status: OPEN** — 4 applied, 1 awaiting a decision.
