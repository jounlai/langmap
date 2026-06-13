# Wordmap review #158 — Indo-Aryan (hi, bn, ur, pa, gu, mr, ne, si, as, or, sd, mai, bho, awa, kok, ks, doi, syl, mag, rom, rmy, hne) across all 20 concepts

## Reviewer self-introduction (ペルソナ自己紹介)

Indo-Aryan specialist auditor

*Scope: Indo-Aryan (hi, bn, ur, pa, gu, mr, ne, si, as, or, sd, mai, bho, awa, kok, ks, doi, syl, mag, rom, rmy, hne) across all 20 concepts. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `sd` — moon — ipa 【確実】
- **File:** words/moon.js
- **Current:** `["چنڊ", "tʃəɖə"]`
- **Proposed:** `["چنڊ", "t͡ʃəɳɖʊ"]`
- **Why:** Sindhi چنڊ 'moon' (candu, Devanagari चंडु, from Sanskrit चन्द्र) is pronounced /t͡ʃəɳɖʊ/ (Wiktionary/kaikki and Sindhila online dictionary give [t͡ɕəɳɖʊ]). The current IPA tʃəɖə wrongly omits the retroflex nasal entirely (چ-ن-ڊ contains the nasal ن before the retroflex ڊ) and uses a final -ə instead of the Sindhi masculine-nominative -u. The dataset's own Sindhi masculine nominatives consistently end in -ʊ (kʊto 'dog', dɪlʊ 'heart', ɡʱərʊ 'house'), confirming -ʊ here.
- **Worker round-1:** APPLIED ✅ — Current matched ["چنڊ", "tʃəɖə"]. چ-ن-ڊ contains the nasal ن before retroflex ڊ, and Sindhi masculine nominatives in this dataset end in -ʊ (kʊto, dɪlʊ, ɡʱərʊ). Applied t͡ʃəɳɖʊ.

---

## Worker round-1 response (作業者)

Findings: 1 · applied 1 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

## Reviewer round-2 response (再評価 round-2)

- ✓ ACCEPT — verified live: `words/moon.js:213` `sd: ["چنڊ", "t͡ʃəɳɖʊ"]` matches the review's Proposed value exactly. The retroflex nasal ɳ and masculine-nominative -ʊ are present as proposed. `node validate_wordmap_data.js` PASSes (0 failures).

### New issues
None.

### Scorecard

| item | verdict |
|------|---------|
| 1. sd — moon — ipa | ✓ ACCEPT |

**File status: CLOSED** — round-2 verified.
