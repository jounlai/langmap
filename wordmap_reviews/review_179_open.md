# Wordmap review #179 — ja* / no / nn / sv / bs / hr / sr / pa / pnb across all 20 concepts

## Reviewer self-introduction (ペルソナ自己紹介)

Pitch-accent & tonal-register cross-cutting auditor (Japanese, Norwegian/Swedish, Serbo-Croatian, Punjabi)

*Scope: ja* / no / nn / sv / bs / hr / sr / pa / pnb across all 20 concepts. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `pnb` — eye — ipa 【蓋然】
- **File:** words/eye.js
- **Current:** `["اکھ", "əkʰː"]`
- **Proposed:** `["اکھ", "əkːʰ"]`
- **Why:** اکھ / Gurmukhi ਅੱਖ 'akkh' is a geminate stop with aspirated release: [əkːʰ]. The order ʰː in the current cell denotes a LONG aspiration [ʰ] (held breathy release), which is not the intended sound. The companion pa cell on the same row already uses the correct order əkːʰ (length on the stop, aspiration as release). pnb should match the geminate-then-aspiration order.
- **Worker round-1:** APPLIED ✅ — Current matched ["اکھ","əkʰː"]. ਅੱਖ akkh = geminate stop with aspirated release [əkːʰ]; ʰː would mean long aspiration. Companion pa cell uses əkːʰ. Applied əkːʰ.

### 2. `pnb` — hand — ipa 【蓋然】
- **File:** words/hand.js
- **Current:** `["ہتھ", "hətʰː"]`
- **Proposed:** `["ہتھ", "hətːʰ"]`
- **Why:** ہتھ / Gurmukhi ਹੱਥ 'hatth' is a geminate /tː/ with aspirated release: [hətːʰ]. The current əCʰː order marks a lengthened aspiration rather than a long consonant; the parallel pa cell on the same row correctly writes hətːʰ. Same systematic length/aspiration-ordering slip as pnb 'eye'.
- **Worker round-1:** APPLIED ✅ — R179 probable. Current matched hətʰː. Geminate /tː/ with aspirated release; same-row pa cell correctly writes hətːʰ. Reorders length-then-aspiration. hətʰː→hətːʰ.

### 3. `sv` — heart — ipa 【蓋然】
- **File:** words/heart.js
- **Current:** `["hjärta", "jæːʈa"]`
- **Proposed:** `["hjärta", "ˈjæʈːa"]`
- **Why:** Swedish has complementary quantity: a stressed syllable is either V:C or VC:, never a long vowel before a tautosyllabic geminate/cluster. 'hjärta' syllabifies hjär-ta with rt→retroflex, giving a SHORT vowel and a long retroflex stop: [ˈjæ̌ʈːa] (Wiktionary /²jɛ̌ʈːa/). The current jæːʈa has a long vowel plus a single short ʈ — wrong on both the vowel length and the missing consonant length.
- **Worker round-1:** APPLIED ✅ — R179 probable. Current matched jæːʈa. Swedish complementary quantity: short vowel + long retroflex (rt→ʈ), Wiktionary /²jɛ̌ʈːa/. Adds stress, shortens vowel, geminates ʈ. jæːʈa→ˈjæʈːa.

---

## Worker round-1 response (作業者)

Findings: 3 · applied 3 · rejected 0 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing. **File status: OPEN** — reviewer round-2 pending.
