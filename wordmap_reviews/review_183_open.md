# Wordmap review #183 — Korean varieties (ko, ko_kp, ko_bus, ko_jeju, ko_yb, ko_hg, ko_jl, ko_mid, ko_em, oko, ko_gor) across all 20 word files — tensification, ㅎ-deletion, ㅂ→ㅁ nasalization, ㅅ→ɕ palatalization, intervocalic voicing/liaison, fortis transcription

## Reviewer self-introduction (ペルソナ自己紹介)

Hangul + Korean phonotactics & romanization specialist (RR vs IPA, tensification, liaison)

*Scope: Korean varieties (ko, ko_kp, ko_bus, ko_jeju, ko_yb, ko_hg, ko_jl, ko_mid, ko_em, oko, ko_gor) across all 20 word files — tensification, ㅎ-deletion, ㅂ→ㅁ nasalization, ㅅ→ɕ palatalization, intervocalic voicing/liaison, fortis transcription. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `ko_hg` — hello — ipa 【確実】
- **File:** words/hello.js
- **Current:** `["안녕하시꼬마", "annjʌŋhaɕikːoma"]`
- **Proposed:** `["안녕하시꼬마", "annjʌŋhaɕik͈oma"]`
- **Why:** The surface 꼬 contains ㄲ, a Korean tense (fortis) stop /k͈/, not a long/geminate /kː/. Korean ㄲ is distinguished from ㄱ by tenseness, not consonant length; word-internally after a vowel it is not phonetically geminated here. Every other tense obstruent in the Korean cells uses the fortis under-double-ring diacritic (e.g. this same file uses panɡap̚s͈ɯmnida, hond͡ʑʌop̚s͈ʌje, and crucially annjʌŋhaɕimnik͈a in ko_yp where ㄲ is correctly rendered k͈a). Rendering 꼬 as kː is both phonetically wrong and inconsistent within the file.
- **Worker round-1:** APPLIED ✅ — R183 certain. Current matched annjʌŋhaɕikːoma. 꼬 has ㄲ = Korean tense/fortis /k͈/, not geminate /kː/; consistent with ko_yp k͈a in same file. kː→k͈.

---

## Worker round-1 response (作業者)

Findings: 1 · applied 1 · rejected 0 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing. **File status: OPEN** — reviewer round-2 pending.
