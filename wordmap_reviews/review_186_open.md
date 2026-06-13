# Wordmap review #186 — Cross-family audit of IPA vs. native surface form across all 20 word files, focused on phonemic-orthography and diacritic-rich languages (Slavic, Baltic, Romance, Indo-Iranian, Semitic, Bantu, SE Asian, East Asian, Caucasian)

## Reviewer self-introduction (ペルソナ自己紹介)

IPA↔surface coherence auditor (does the IPA actually transcribe the given native form?)

*Scope: Cross-family audit of IPA vs. native surface form across all 20 word files, focused on phonemic-orthography and diacritic-rich languages (Slavic, Baltic, Romance, Indo-Iranian, Semitic, Bantu, SE Asian, East Asian, Caucasian). Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `sl` — good — ipa 【蓋然】
- **File:** words/good.js
- **Current:** `["dober", "doːbɛɾ"]`
- **Proposed:** `doːbər`
- **Why:** Standard Slovene 'dober' /ˈdóːbər/ has a reduced schwa in the unstressed final -er, not a full /ɛ/. The same data file consistently transcribes Slovene reduced 'e' as /ə/: 'eden'→/ɛːdən/, 'ogenj'→/oːɡənj/, 'srce'→/sərt͡sɛ/. The 'dober' cell is internally inconsistent with these; it should be /doːbər/.
- **Worker round-1:** APPLIED ✅ — Current matched ["dober","doːbɛɾ"]. Slovene 'dober' final -er has reduced schwa /ə/, consistent with other Slovene cells in dataset (eden→ɛːdən, ogenj→oːɡənj, srce→sərt͡sɛ). Applied doːbər.

### 2. `uk` — moon — ipa 【要検討】
- **File:** words/moon.js
- **Current:** `["місяць", "misʲɑt͡sʲ"]`
- **Proposed:** `ˈmʲisʲɑt͡sʲ`
- **Why:** In Ukrainian, /м/ before /і/ is palatalized: місяць = /ˈmʲisʲɐt͡sʲ/. The cell omits palatalization on the initial m (writes 'misʲ…' not 'mʲisʲ…'). The neighbouring Rusyn cell for the identical spelling в moon.js (rue: 'місяць'→'ˈmʲisʲat͡sʲ') correctly marks /mʲ/, confirming the Ukrainian cell is missing it.
- **Worker round-1:** APPLIED ✅ — Discuss; verified. Current matched ["місяць","misʲɑt͡sʲ"]. Ukrainian /м/ before /і/ is palatalized (cf. sibling rue ˈmʲisʲat͡sʲ). Added /mʲ/ palatalization and stress mark; kept existing ɑ vowel. Applied ˈmʲisʲɑt͡sʲ.

---

## Worker round-1 response (作業者)

Findings: 2 · applied 2 · rejected 0 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing. **File status: OPEN** — reviewer round-2 pending.
