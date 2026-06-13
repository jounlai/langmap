# Wordmap review #184 — vi_han (Sino-Vietnamese) entering-tone syllables across all 20 word files; cross-checked ja_kanbun, ko Sino-Korean, zh_wenyan_edu

## Reviewer self-introduction (ペルソナ自己紹介)

CJK Sino-xenic coherence auditor (Sino-Japanese, Sino-Korean, Sino-Vietnamese, topolect literary/colloquial)

*Scope: vi_han (Sino-Vietnamese) entering-tone syllables across all 20 word files; cross-checked ja_kanbun, ko Sino-Korean, zh_wenyan_edu. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `vi_han` — one — ipa 【確実】
- **File:** words/one.js
- **Current:** `["一", "ɲət˨˩"]`
- **Proposed:** `["一", "ɲət˧˥"]`
- **Why:** Sino-Vietnamese 一 = nhất, which carries the sắc tone (dấu sắc 'nhất'), i.e. a high entering tone (sắc nhập). In this dataset sắc is consistently transcribed ˧˥ (cf. vi_han 愛 ai˧˥, 母 məw˧˥). The current ˨˩ is the low (huyền / nặng-entering) contour and makes 一 nhất identical to nặng-entering 日 nhật (also ɲət˨˩), erasing the sắc/nặng distinction. nhất is voiceless-initial entering → high register. WebSearch confirms sắc = high-rising.
- **Worker round-1:** APPLIED ✅ — Certain. Current matched ["一","ɲət˨˩"]. Sino-Vietnamese nhất carries dấu sắc (high entering, ˧˥ in this dataset cf. 愛 ai˧˥, 母 məw˧˥); ˨˩ conflated it with nặng-entering nhật. Applied ɲət˧˥.

### 2. `vi_han` — house — ipa 【確実】
- **File:** words/house.js
- **Current:** `["屋", "ok˨˩"]`
- **Proposed:** `["屋", "ok˧˥"]`
- **Why:** Sino-Vietnamese 屋 = ốc, spelled with dấu sắc (sắc nhập, high entering tone): voiceless-initial entering syllable → high register, grouping with sắc ˧˥ as used elsewhere in this dataset (愛 ai˧˥). Current ˨˩ is the low nặng-entering contour and is wrong for a sắc syllable; it incorrectly matches the nặng-entering words (目 mục, 木 mộc, 食 thực).
- **Worker round-1:** APPLIED ✅ — R184 certain. Current matched ok˨˩. Sino-Vietnamese 屋=ốc, dấu sắc (high entering)→˧˥, cf. 愛 ai˧˥; ˨˩ is nặng-entering (食/木/目). ok˨˩→ok˧˥.

---

## Worker round-1 response (作業者)

Findings: 2 · applied 2 · rejected 0 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing.

---

## Reviewer round-2 response (再評価 round-2)

Read-only verification against current live data on branch develop. `node validate_wordmap_data.js` → PASS.

- ✓ ACCEPT — verified live: words/one.js:561 `vi_han: ["一", "ɲət˧˥"]` matches Proposed (sắc nhập ˧˥ for nhất). APPLIED confirmed.
- ✓ ACCEPT — verified live: words/house.js:562 `vi_han: ["屋", "ok˧˥"]` matches Proposed (sắc nhập ˧˥ for ốc). APPLIED confirmed.

### New issues
None.

### Scorecard

| item | verdict |
| --- | --- |
| 1. vi_han one ipa (ɲət˧˥) | ✓ ACCEPT |
| 2. vi_han house ipa (ok˧˥) | ✓ ACCEPT |

**File status: CLOSED** — round-2 verified.
