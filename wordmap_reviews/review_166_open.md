# Wordmap review #166 — West Germanic codes (en, en_*, de, de_lut, nl, af, fy, yi, nds, li, ksh, pdc, vmf, frr, stq, wym) across all 20 word files; lb is absent from the dataset

## Reviewer self-introduction (ペルソナ自己紹介)

West Germanic specialist auditor (English/German/Low Countries, incl. Dutch, Afrikaans, Frisian, Yiddish, Low German)

*Scope: West Germanic codes (en, en_*, de, de_lut, nl, af, fy, yi, nds, li, ksh, pdc, vmf, frr, stq, wym) across all 20 word files; lb is absent from the dataset. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `fy` — father — ipa 【蓋然】
- **File:** words/father.js
- **Current:** `["heit", "hait"]`
- **Proposed:** `["heit", "hɛit"]`
- **Why:** West Frisian 'heit' (father) is transcribed /hɛit/: the digraph 'ei' represents the falling diphthong /ɛi/ (cf. 'sweit', 'heit' in Wiktionary and standard Frisian phonology), not /ai/. The current [hait] uses the wrong nucleus. The parallel 'ie' diphthongs in this same column (e.g. fy good 'goed' [ɡuət], fy tree 'beam' [bɪəm]) are transcribed accurately, so [ai] here is an outlier error.
- **Worker round-1:** APPLIED ✅ — Current cell matched exactly. Verified: West Frisian 'heit' = /hɛit/; the 'ei' digraph is the falling diphthong /ɛi/, not /ai/. Consistent with other diphthong transcriptions in this column. Applied hɛit.

---

## Worker round-1 response (作業者)

Findings: 1 · applied 1 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

**File status: OPEN** — reviewer round-2 (re-verification of applied edits) pending.
