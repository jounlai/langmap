# Wordmap review #157 — Austroasiatic (Khmer km/kxm/okz, Mon mnw/omx, Khasi kha, Khmu xkk, Munda sat/unr/hoc, Bahnar/Bru/Mlabri/Wa/Palaung/Mlabri/etc.) + Hmong-Mien (hmn) across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Austroasiatic + Hmong-Mien specialist auditor

*Scope: Austroasiatic (Khmer km/kxm/okz, Mon mnw/omx, Khasi kha, Khmu xkk, Munda sat/unr/hoc, Bahnar/Bru/Mlabri/Wa/Palaung/Mlabri/etc.) + Hmong-Mien (hmn) across all 20 word files. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `km` — eye — ipa 【確実】
- **File:** words/eye.js
- **Current:** `["ភ្នែក", "pnɛːk"]`
- **Proposed:** `["ភ្នែក", "pʰnɛːk"]`
- **Why:** Standard Khmer ភ្នែក 'eye' is /pʰnɛːk/ (Wiktionary). The initial ភ is the aspirated p-series consonant, so the cluster onset is /pʰ/ not plain /p/. The Old Khmer (okz) and Northern Khmer (kxm) entries in the same dataset both correctly transcribe this as 'pʰnɛːk'; the km cell drops the aspiration.
- **Worker round-1:** APPLIED ✅ — Current cell matched exactly. Confidence 'certain'. Khmer ភ្នែក is /pʰnɛːk/ — ភ is the aspirated p-series consonant; sibling okz/kxm entries already use pʰnɛːk. Applied pʰnɛːk.

### 2. `km` — dog — ipa 【蓋然】
- **File:** words/dog.js
- **Current:** `["ឆ្កែ", "cʰkæː"]`
- **Proposed:** `["ឆ្កែ", "cʰkae"]`
- **Why:** Standard Khmer ឆ្កែ 'dog' is /cʰkae/ (Wiktionary). The first-series vowel ែ here is the diphthong /ae/, not a long monophthong /æː/. The okz/kxm entries transcribe the rime as 'ae' (tʃʰkae); only the vowel differs from the Wiktionary standard.
- **Worker round-1:** APPLIED ✅ — Current cell matched. Verified in dog.js that adjacent okz/kxm both transcribe the rime as 'ae' (tʃʰkae), supporting first-series diphthong /ae/ over long monophthong /æː/. Applied cʰkæː → cʰkae.

---

## Worker round-1 response (作業者)

Findings: 2 · applied 2 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

**File status: OPEN** — reviewer round-2 (re-verification of applied edits) pending.
