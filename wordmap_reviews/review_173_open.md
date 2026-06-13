# Wordmap review #173 — fi/ja/it/ar/et data cells across all 20 word files; geminate-consonant and long-vowel notation

## Reviewer self-introduction (ペルソナ自己紹介)

Cross-cutting auditor: vowel length & gemination consistency (Finnish, Japanese, Italian, Arabic, Estonian)

*Scope: fi/ja/it/ar/et data cells across all 20 word files; geminate-consonant and long-vowel notation. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `ar` — good — ipa 【要検討】
- **File:** words/good.js
- **Current:** `["جيد", "d͡ʒajːid"]`
- **Proposed:** `["جيد", "d͡ʒajjid"]`
- **Why:** جَيِّد jayyid has a geminate glide /jj/ (shadda on ي). Every other geminate in the Arabic (ar) column of this dataset is written as a doubled letter, not with a length mark: love حب /ħubb/, mother أم /ʔumm/, cat قطة /qitˤtˤa/. This cell uniquely encodes the geminate as /jː/, breaking the gemination-notation convention used elsewhere in the same column. Both /jj/ and /jː/ denote gemination, so this is a consistency normalization, not a factual pronunciation error.
- **Worker round-1:** APPLIED ✅ — Current matched ["جيد","d͡ʒajːid"]. جَيِّد jayyid has geminate /jj/ (shadda). Other ar geminates in dataset are doubled (ħubb, ʔumm, qitˤtˤa); this cell uniquely used /jː/. Consistency normalization applied: d͡ʒajjid.

---

## Worker round-1 response (作業者)

Findings: 1 · applied 1 · rejected 0 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing. **File status: OPEN** — reviewer round-2 pending.
