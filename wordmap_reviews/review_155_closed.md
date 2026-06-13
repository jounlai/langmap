# Wordmap review #155 — Min: nan, nan_xm, nan_zz, nan_qz, nan_te, nan_pn, nan_hai, cdo, cpx, mnp across all 20 concepts

## Reviewer self-introduction (ペルソナ自己紹介)

Min Sinitic specialist auditor

*Scope: Min: nan, nan_xm, nan_zz, nan_qz, nan_te, nan_pn, nan_hai, cdo, cpx, mnp across all 20 concepts. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `nan_te` — eye — ipa 【蓋然】
- **File:** words/eye.js
- **Current:** `["目", "bak˥˥"]`
- **Proposed:** `["目", "mak˥˥"]`
- **Why:** Teochew (Chaoshan) 目 'eye' is mak8 with an m- initial (Peng'im 'mak8'), not the Hokkien b- initial. The value 'bak' is the Xiamen/Quanzhou Hokkien form copied into the Teochew column; Teochew retains the nasal initial here. Coda -k and the 陽入 tone are correct.
- **Worker round-1:** APPLIED ✅ — Current cell matched exactly. Verified: Teochew (Chaoshan) 目 'eye' is mak8 with m- initial (Peng'im mak8); 'bak' is the Hokkien (Xiamen/Quanzhou) initial. Coda -k and 陽入 tone correct. Applied mak˥˥.

### 2. `nan_qz` — moon — ipa 【蓋然】
- **File:** words/moon.js
- **Current:** `["月", "ɡə˨˦"]`
- **Proposed:** `["月", "ɡəʔ˨˦"]`
- **Why:** Quanzhou 月 'moon' is a 陽入 (entering-tone) syllable ge̍h /ɡəʔ/ ending in a glottal stop. The IPA omits the final -ʔ. Compare the parallel entering-tone nan_qz cell eat '食 t͡siaʔ˨˦' which correctly retains -ʔ; the same coda is required here.
- **Worker round-1:** APPLIED ✅ — Current matched ["月", "ɡə˨˦"]. Quanzhou 月 ge̍h is 陽入 with final glottal stop -ʔ; parallels the eat nan_qz cell 食 t͡siaʔ˨˦ which keeps -ʔ. Applied ɡəʔ˨˦.

### 3. `cpx` — tree — ipa 【要検討】
- **File:** words/tree.js
- **Current:** `["树", "ɬiu˥˧"]`
- **Proposed:** `["树", "t͡sʰiu˥˧"]`
- **Why:** 樹 'tree' has an aspirated affricate initial across Min (nan, nan_xm, nan_zz, nan_te, nan_qz all give t͡sʰiu / tsʰiu). Pu-Xian (Hinghwa) 樹 is 'chiu' [t͡sʰiu]. The lateral fricative ɬ in this dataset is reserved for s-derived initials (water ɬui, heart ɬim, hand ɬiu, thanks ɬia); applying it to 樹 drops both affrication and aspiration and is phonologically wrong for this morpheme.
- **Worker round-1:** APPLIED ✅ — Current cell matched ["树", "ɬiu˥˧"]. Confidence 'discuss' but well-supported: 樹 has an aspirated affricate initial across Min cognates (nan/nan_xm/nan_zz etc. give t͡sʰiu); Pu-Xian 樹 = chiu [t͡sʰiu]. The dataset reserves ɬ for s-derived initials (water/heart/hand/thanks), which 樹 is not. Changed to t͡sʰiu˥˧.

### 4. `nan_hai` — eye — ipa 【要検討】
- **File:** words/eye.js
- **Current:** `["目", "bak˨˨"]`
- **Proposed:** `["目", "mak˨˨"]`
- **Why:** Hainanese 目 'eye' retains an m- initial (mak) like other Min Nan outside Hokkien; the b- form here is the Hokkien initial. Hainanese denasalization yields implosives mainly before oral vowels, but the -k-coda syllable 目 keeps the nasal initial mak.
- **Worker round-1:** REJECTED ✋ — Current cell matched exactly. Confidence 'discuss'. Rejected: Hainanese is characteristically marked by denasalization of nasal initials into voiced/implosive obstruents (m->b/ɓ), which is precisely what 'bak' would reflect. The reviewer's own caveat is that denasalization yields implosives 'mainly before oral vowels' — but whether 目 (oral vowel a + nasalless -k coda) retains m- or shifts to b- is exactly the contested point, and standard Hainanese descriptions widely give the denasalized obstruent. Not confident enough to overturn the existing b- form; leaving as-is.

---

## Worker round-1 response (作業者)

Findings: 4 · applied 3 · rejected 1 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

## Reviewer round-2 response (再評価 round-2)

- ✓ ACCEPT — verified live: words/eye.js `nan_te: ["目", "mak˥˥"]` matches proposed (APPLIED).
- ✓ ACCEPT — verified live: words/moon.js `nan_qz: ["月", "ɡəʔ˨˦"]` matches proposed (APPLIED).
- ✓ ACCEPT — verified live: words/tree.js `cpx: ["树", "t͡sʰiu˥˧"]` matches proposed (APPLIED).
- ✓ ACCEPT — verified live: words/eye.js `nan_hai: ["目", "bak˨˨"]` unchanged, consistent with REJECTED status.

`node validate_wordmap_data.js` → PASS (0 failures).

### New issues
None.

### Scorecard

| Item | Verdict |
|------|---------|
| 1. nan_te eye (APPLIED) | ✓ ACCEPT |
| 2. nan_qz moon (APPLIED) | ✓ ACCEPT |
| 3. cpx tree (APPLIED) | ✓ ACCEPT |
| 4. nan_hai eye (REJECTED) | ✓ ACCEPT |

**File status: CLOSED** — round-2 verified.
