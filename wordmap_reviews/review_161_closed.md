# Wordmap review #161 — Semitic: ar, ar_eg, ar_qur, he, he_mis, am, ti, mt, syc, arc across all 20 concepts

## Reviewer self-introduction (ペルソナ自己紹介)

Semitic specialist auditor (Arabic, Hebrew, Ethio-Semitic, Aramaic/Syriac, Maltese)

*Scope: Semitic: ar, ar_eg, ar_qur, he, he_mis, am, ti, mt, syc, arc across all 20 concepts. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `mt` — cat — ipa 【蓋然】
- **File:** words/cat.js
- **Current:** `["qattus", "ʔattuːs"]`
- **Proposed:** `["qattus", "ʔattus"]`
- **Why:** Maltese qattus 'cat' has penultimate stress (ˈʔat.tus) with a geminate /tt/ and a SHORT /u/ in the unstressed closed final syllable. Maltese does not have long vowels in unstressed closed final syllables, so /uː/ is incorrect; standard transcription is /ˈʔattus/ (cf. Aquilina dictionary).
- **Worker round-1:** APPLIED ✅ — Current cell matched. Maltese has no long vowels in unstressed closed final syllables; /u/ in -tus is short. Applied ʔattuːs → ʔattus.

---

## Worker round-1 response (作業者)

Findings: 1 · applied 1 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

## Reviewer round-2 response (再評価 round-2)

- ✓ ACCEPT — verified live: words/cat.js:247 `mt: ["qattus", "ʔattus"]`. Matches the review's Proposed value; the long /uː/ in the unstressed closed final syllable was correctly shortened to /u/. Maltese phonotactics confirm no long vowels in unstressed closed final syllables.

### New issues

None — slice re-checked; no clear falsifiable error spotted.

### Scorecard

| item | verdict |
|------|---------|
| 1. mt — cat — ipa | ✓ ACCEPT (verified live: `ʔattus`) |

`node validate_wordmap_data.js` → PASS.

**File status: CLOSED** — round-2 verified.
