# Wordmap review #154 — yue, yue_gz, hak_tw, hak_hl, hak_cn, gan, hsn across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Yue + Hakka + Gan + Xiang Sinitic specialist auditor

*Scope: yue, yue_gz, hak_tw, hak_hl, hak_cn, gan, hsn across all 20 word files. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `hak_tw` — eat — ipa 【確実】
- **File:** words/eat.js
- **Current:** `["食", "sit˨"]`
- **Proposed:** `["食", "sit˥"]`
- **Why:** Taiwanese Sixian Hakka 陽入 (light entering) tone is 5 [˥], distinct from 陰入 (dark entering) = 2 [˨]. 食 is historically 陽入 (voiced obstruent series, MOE Hakka dict siid 第8調/陽入). Marking it ˨ conflates it with 陰入 (which this column uses correctly for 一/屋/目/惜 = ˨). Review #88 (Finding 15) already documented the correct Sixian system (陽入 5) and renormalised 陰平; the entering-tone register was left uncorrected.
- **Worker round-1:** APPLIED ✅ — Confidence certain. Current cell matched. Verified one.js hak_tw 一=jit˨ uses ˨ for 陰入 (dark entering). 食 is historically 陽入 (light entering) = ˥, a distinct register. Applied sit˨ → sit˥.

### 2. `hak_tw` — sun — ipa 【確実】
- **File:** words/sun.js
- **Current:** `["日頭", "ŋit˨ tʰeu˩˩"]`
- **Proposed:** `["日頭", "ŋit˥ tʰeu˩˩"]`
- **Why:** 日 ngit is 陽入 in Sixian Hakka → high entering tone 5 [˥], not ˨ (which is 陰入). 頭 tʰeu 陽平 = 11 [˩˩] is correct and unchanged. Same systematic 陽入→˨ miscoding as 食/月; the Sixian system is the one this dataset adopts (review #88).
- **Worker round-1:** APPLIED ✅ — Current cell matched ["日頭", "ŋit˨ tʰeu˩˩"]. Confidence 'certain'. 日 ngit is 陽入 in Sixian Hakka, which is the high entering tone ˥, not ˨ (陰入). Consistent with the dataset's adopted Sixian system (review #88). Changed to ŋit˥ tʰeu˩˩.

### 3. `hak_tw` — moon — ipa 【確実】
- **File:** words/moon.js
- **Current:** `["月光", "ŋiet˨ koŋ˨"]`
- **Proposed:** `["月光", "ŋiet˥ koŋ˨˦"]`
- **Why:** Two Sixian tone errors. 月 ngiet is 陽入 → 5 [˥], not ˨ (陰入). 光 kong is 陰平 → 24 [˨˦], not flat ˨; the dataset already corrects 陰平 to ˨˦ elsewhere (貓 meu˨˦, 阿 a˨˦) per review #88, but this 陰平 syllable was missed.
- **Worker round-1:** APPLIED ✅ — Current matched ["月光", "ŋiet˨ koŋ˨"]. Sixian: 月 ngiet is 陽入 → ˥ (not ˨ 陰入); 光 kong is 陰平 → ˨˦ (per review #88 the dataset corrects 陰平 to ˨˦, e.g. 貓 meu˨˦). Applied ŋiet˥ koŋ˨˦.

### 4. `hak_tw` — heart — ipa 【蓋然】
- **File:** words/heart.js
- **Current:** `["心臟", "sim˨ t͡sʰoŋ˥"]`
- **Proposed:** `["心臟", "sim˨˦ t͡sʰoŋ˥"]`
- **Why:** 心 sim is 陰平 in Sixian Hakka → 24 [˨˦], not ˨. Review #88's 陰平→˨˦ renormalisation was applied only to 父/母/貓 and missed 心. 臟 t͡sʰoŋ 去聲 = 55 [˥] is correct and unchanged.
- **Worker round-1:** APPLIED ✅ — 心 sim is 陰平 in Sixian Hakka → ˨˦. Verified against father (a˨˦ pa˨), mother (a˨˦ me˨), cat (meu˨˦) which all render 陰平 as ˨˦. Applied sim˨˦ t͡sʰoŋ˥.

---

## Worker round-1 response (作業者)

Findings: 4 · applied 4 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

## Reviewer round-2 response (再評価 round-2)

Re-verified all 4 applied findings against current live data (`grep -nE '^\s*hak_tw:'`) and ran `node validate_wordmap_data.js` → PASS.

- ✓ ACCEPT — verified live: words/eat.js:1042 `hak_tw: ["食", "sit˥"]` (陽入 ˥, was sit˨).
- ✓ ACCEPT — verified live: words/sun.js:1067 `hak_tw: ["日頭", "ŋit˥ tʰeu˩˩"]` (陽入 ˥, was ŋit˨).
- ✓ ACCEPT — verified live: words/moon.js:1061 `hak_tw: ["月光", "ŋiet˥ koŋ˨˦"]` (陽入 ˥ + 陰平 ˨˦, was ŋiet˨ koŋ˨).
- ✓ ACCEPT — verified live: words/heart.js:1049 `hak_tw: ["心臟", "sim˨˦ t͡sʰoŋ˥"]` (陰平 ˨˦, was sim˨).

### New issues
None — slice clean on re-verification.

### Scorecard
| item | verdict |
|------|---------|
| 1. hak_tw eat sit˥ | ✓ ACCEPT |
| 2. hak_tw sun ŋit˥ | ✓ ACCEPT |
| 3. hak_tw moon ŋiet˥ koŋ˨˦ | ✓ ACCEPT |
| 4. hak_tw heart sim˨˦ | ✓ ACCEPT |

**File status: CLOSED** — round-2 verified.
