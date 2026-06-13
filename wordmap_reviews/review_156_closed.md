# Wordmap review #156 — Vietic (vi, vi_c, vi_s, mtq) + Tai-Kadai (th, th_isan, th_n, th_s, lo, za, blt, khb, nut, tyz, shn, soa, pcc, jia, sukh) across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Vietic + Tai-Kadai specialist auditor

*Scope: Vietic (vi, vi_c, vi_s, mtq) + Tai-Kadai (th, th_isan, th_n, th_s, lo, za, blt, khb, nut, tyz, shn, soa, pcc, jia, sukh) across all 20 word files. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `khb` — heart — surface 【蓋然】
- **File:** words/heart.js
- **Current:** `["ᦗᦸ", "pɔ"]`
- **Proposed:** `["ᦋᦱ�!", "t͡ɕaːj"]`
- **Why:** The Tai Lue 'heart' cell ᦗᦸ/pɔ is the 'father' word (cf. words/father.js khb = ["ᦗᦸᧈ", "pɔː"]) with only the tone mark dropped. The SW-Tai word for 'heart' is the ใจ/t͡ɕai cognate (cf. th ใจ t͡ɕaj, blt t͡ɕai˧, lo ໃຈ). A 'heart' read as 'pɔ' is an erroneous duplicate of 'father'; both surface (initial ᦗ = p) and ipa are wrong. Initial should be ᦋ (t͡ɕ); exact rime/tone of the corrected spelling should be re-sourced.
- **Worker round-1:** REJECTED ✋ — Confirmed ᦗᦸ/pɔ is an erroneous duplicate of father (ᦗᦸᧈ/pɔː). However the proposed surface 'ᦋᦱ�!' contains a Unicode replacement char (corrupted/invalid) and the finding itself states the exact rime/tone should be re-sourced. Cannot apply an unverified, corrupted surface string. Needs proper re-sourcing of the ใจ/t͡ɕai cognate spelling before correction.

### 2. `khb` — mother — surface 【要検討】
- **File:** words/mother.js
- **Current:** `["ᦡᦲᧈ", "meː"]`
- **Proposed:** `["ᦵᦙᧈ", "mɛː"]`
- **Why:** The surface ᦡᦲᧈ reads 'diː' — initial ᦡ is the d/t consonant and the vowel sign ᦲ is /i/, so the native script cannot spell the IPA given ('meː'). The Tai Lue word for 'mother' is mɛː and must begin with the m-consonant ᦙ; cf. blt/shn/th all m-initial (แม่ mɛː). Both the initial consonant and the vowel in the surface contradict the meaning and the IPA. Exact orthographic vowel/tone placement of the m-initial form should be re-sourced.
- **Worker round-1:** REJECTED ✋ — Current matched ["ᦡᦲᧈ", "meː"]. The reviewer is correct that the current cell is wrong (ᦡ is the d/t consonant, ᦲ is /i/, so it spells 'diː', not 'meː'; the Tai Lue word is mɛː, cf. blt/shn/th/lo all m-initial). However the PROPOSED surface ᦵᦙᧈ uses the vowel sign ᦵ which is New Tai Lue /e/, not /ɛ/ — it would render /meː/, contradicting the reviewer's own proposed IPA mɛː. The correct /ɛ/ vowel sign is ᦶ (standard mother = ᦶᦙᧈ). Since the reviewer explicitly flagged exact orthographic vowel/tone placement as 'should be re-sourced' (confidence 'discuss') and the proposed string is internally inconsistent, I declined to apply a still-incorrect surface rather than introduce a new error. Recommend re-sourcing ᦶᦙᧈ. Cell left unchanged.

---

## Worker round-1 response (作業者)

Findings: 2 · applied 0 · rejected 2 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

## Reviewer round-2 response (再評価 round-2)

Verified each finding against current live data in words/*.js. `node validate_wordmap_data.js` → PASS (0 failures).

- ✓ ACCEPT — finding 1 (heart khb) correctly REJECTED: live shows `khb: ["ᦗᦸ", "pɔ"]` (words/heart.js:984), unchanged. The duplication critique holds — father khb = `["ᦗᦸᧈ", "pɔː"]` (words/father.js:984) — but the proposed replacement surface contained a Unicode replacement char (corrupted) and the review itself deferred exact rime/tone re-sourcing, so leaving the cell unchanged was the right call. Substantive issue remains open for future re-sourcing.
- ✓ ACCEPT — finding 2 (mother khb) correctly REJECTED: live shows `khb: ["ᦡᦲᧈ", "meː"]` (words/mother.js:990), unchanged. Worker's analysis is sound — the proposed surface ᦵᦙᧈ uses the New Tai Lue /e/ vowel sign ᦵ, internally inconsistent with the proposed IPA mɛː (which needs ᦶ for /ɛ/). Declining to apply a still-incorrect string was correct. Substantive issue (current cell spells 'diː' not 'meː') remains open for re-sourcing of ᦶᦙᧈ.

### New issues
None.

### Scorecard

| item | verdict |
|------|---------|
| 1. khb — heart | ✓ ACCEPT (REJECTED, live unchanged) |
| 2. khb — mother | ✓ ACCEPT (REJECTED, live unchanged) |

**File status: CLOSED** — round-2 verified.
