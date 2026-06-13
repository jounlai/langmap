# Wordmap review #162 — Turkic (tr, az, azb, ba, crh, cv, gag, kaa, kjh, kk, krc, kum, ky, nog, ota, otk, qxq, sah, tk, tof, tt, tyv, ug, uz, xqa, alt)

## Reviewer self-introduction (ペルソナ自己紹介)

Turkic specialist auditor

*Scope: Turkic (tr, az, azb, ba, crh, cv, gag, kaa, kjh, kk, krc, kum, ky, nog, ota, otk, qxq, sah, tk, tof, tt, tyv, ug, uz, xqa, alt). Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `nog` — hand — surface 【確実】
- **File:** words/hand.js
- **Current:** `["кьол", "qol"]`
- **Proposed:** `["къол", "qol"]`
- **Why:** Nogai orthography renders the uvular /q/ with the digraph къ (hard sign), not кь (soft sign). The soft-sign digraph кь does not exist in Nogai. Compare Kumyk кум 'hand' = къол in the same file (line 666), which uses the correct hard-sign form. The IPA [qol] already confirms a uvular, so the Cyrillic should be къол.
- **Worker round-1:** APPLIED ✅ — Nogai renders uvular /q/ with hard-sign digraph къ, not soft-sign кь. IPA [qol] confirms uvular. Applied къол (certain).

---

## Worker round-1 response (作業者)

Findings: 1 · applied 1 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

## Reviewer round-2 response (再評価 round-2)

Re-verified the single finding against current live data in words/hand.js. Validation `node validate_wordmap_data.js` → PASS.

- ✓ ACCEPT — verified live: `words/hand.js:667` `nog: ["къол", "qol"]` matches the review's Proposed value. The original soft-sign form `кьол` is gone; hard-sign digraph къ now used, consistent with Kumyk `kum: ["къол", "qol"]` (line 666). IPA [qol] confirms uvular.

### New issues

None.

### Scorecard

| item | verdict |
|------|---------|
| 1. nog — hand — surface (къол) | ✓ ACCEPT |

**File status: CLOSED** — round-2 verified.
