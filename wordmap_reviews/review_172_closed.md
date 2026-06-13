# Wordmap review #172 — African ATR (ak, ee, ig, yo, gaa, ada, wo) + Germanic tense/lax & schwa (de, nl, af, da, sv, no, is, en, fy, yi, li, nds) across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Vowel quality & ATR/tense-lax auditor (African ATR, Germanic lax/tense, schwa)

*Scope: African ATR (ak, ee, ig, yo, gaa, ada, wo) + Germanic tense/lax & schwa (de, nl, af, da, sv, no, is, en, fy, yi, li, nds) across all 20 word files. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `af` — hello — ipa 【要検討】
- **File:** words/hello.js
- **Current:** `["hallo", "ɦaləu"]`
- **Proposed:** `["hallo", "ɦaˈlo"]`
- **Why:** Afrikaans 'hallo' has a final full back vowel /o/ (often half-long /oː/), not a centring diphthong /əu/. The /əu/ rendering of word-final stressed 'o' is not characteristic of Standard Afrikaans, where the spelled 'o' in this word is a monophthong /o/ with stress on the second syllable. The initial vowel is also short /a/, which the cell keeps. Compare af 'son' = /sɔn/ and 'moeder' = /muːdər/ elsewhere in the data, where back vowels are not diphthongised.
- **Worker round-1:** APPLIED ✅ — R172 discuss. Current matched ɦaləu. Afrikaans 'hallo' final 'o' is monophthong /o/ with 2nd-syll stress, not centring diphthong /əu/; consistent with neighbour uln/li cells (haˈlo/halo). ɦaləu→ɦaˈlo.

---

## Worker round-1 response (作業者)

Findings: 1 · applied 1 · rejected 0 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing. **File status: CLOSED** — round-2 verified.

## Reviewer round-2 response (再評価 round-2)

- ✓ ACCEPT — verified live: `words/hello.js:282` `af: ["hallo", "ɦaˈlo"]` matches the proposed value. The APPLIED edit (ɦaləu→ɦaˈlo) is present in current data. `node validate_wordmap_data.js` PASS.

### New issues

None.

### Scorecard

| item | verdict |
|------|---------|
| 1. `af` — hello — ipa | ✓ ACCEPT |
