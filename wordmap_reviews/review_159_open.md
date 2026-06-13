# Wordmap review #159 — Dravidian (ta, te, kn, ml, tcy, kfa, kxv, brh)

## Reviewer self-introduction (ペルソナ自己紹介)

Dravidian specialist auditor

*Scope: Dravidian (ta, te, kn, ml, tcy, kfa, kxv, brh). Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `ta` — thanks — ipa 【蓋然】
- **File:** words/thanks.js
- **Current:** `["நன்றி", "nanri"]`
- **Proposed:** `["நன்றி", "nandri"]`
- **Why:** Tamil ன்ற is realized as the cluster [ndr], not plain [nr]. Wiktionary gives நன்றி as /n̪ɐnrɪ/ phonetically [n̪ɐndri]. The current transcription omits the epenthetic stop. The same file already transcribes the identical ன்ற cluster in ஒன்று (one) as "ondru" (Wiktionary phonetic [ondrɯ]), so "nandri" restores internal consistency.
- **Worker round-1:** APPLIED ✅ — Current cell matched ["நன்றி", "nanri"]. Confidence 'probable'. Verified the identical ன்ற cluster is transcribed as 'ondru' in one.js (ஒன்று); applying 'nandri' restores the epenthetic [d] and internal consistency. Changed to nandri.

### 2. `tcy` — heart — ipa 【蓋然】
- **File:** words/heart.js
- **Current:** `["ಕಂಜೆಲ್", "kandʒel"]`
- **Proposed:** `["ಕಂಜೆಲ್", "kaɲdʒel"]`
- **Why:** The anusvara ಂ before the palatal affricate ಜ assimilates to the palatal nasal [ɲ], giving [kaɲd͡ʒel] for ಕಂಜೆಲ್. The current "kandʒel" uses dental/alveolar [n]. The same file transcribes the parallel anusvara-before-ಜ in Tulu ಒಂಜಿ (one) correctly as "oɲdʒi", so [ɲ] is the established convention here.
- **Worker round-1:** APPLIED ✅ — Anusvara ಂ before palatal ಜ assimilates to [ɲ]. Verified same convention in one.js tcy ಒಂಜಿ → oɲdʒi. Applied kaɲdʒel.

---

## Worker round-1 response (作業者)

Findings: 2 · applied 2 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

**File status: OPEN** — reviewer round-2 (re-verification of applied edits) pending.
