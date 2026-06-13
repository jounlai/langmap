# Wordmap review #167 — Slavic (ru, uk, be, pl, cs, sk, bg, mk, hr, sr, sl, szl) across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Slavicist specializing in East/West/South Slavic phonology and standard IPA transcription (Wiktionary-level), with attention to Belarusian gemination, akanye, and the dataset's established convention of supplying phonemic gemination in IPA.

*Scope: Slavic (ru, uk, be, pl, cs, sk, bg, mk, hr, sr, sl, szl) across all 20 word files. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `be` — love — ipa 【蓋然】
- **File:** words/love.js
- **Current:** `["каханне", "kaxanʲe"]`
- **Proposed:** `["каханне", "kaxanʲːe"]`
- **Why:** Belarusian etymological -нне is a phonemically long (geminate) palatalized nasal: каханне is pronounced [kaˈxanʲːe]. The current IPA omits the gemination. The dataset's established convention is to supply phonemic gemination in the IPA even when the orthography writes it (cf. review #102 supplying Amharic/Tigrinya geminates that are unwritten or written-but-dropped). Here the geminate is even spelled (нн) yet rendered single. Stress mark omitted to match the be column, which marks no stress.
- **Worker round-1:** APPLIED ✅ — Current matched ["каханне", "kaxanʲe"]. Belarusian etymological -нне is a phonemically long palatalized geminate nasal [nʲː] (каханне [kaˈxanʲːe]); dataset convention supplies phonemic gemination (cf. review #102). Applied kaxanʲːe; no stress mark, matching the be column.

### 2. `be` — hello — ipa 【蓋然】
- **File:** words/hello.js
- **Current:** `["прывітанне", "prɨvʲitanʲe"]`
- **Proposed:** `["прывітанне", "prɨvʲitanʲːe"]`
- **Why:** Same Belarusian geminate as каханне: прывітанне ends in long palatalized [nʲː], so the standard pronunciation is [prɨvʲiˈtanʲːe]. The current cell drops the gemination of the spelled нн. Consistent with the dataset's phonemic-gemination-in-IPA convention (review #102). Stress left unmarked to match the be column.
- **Worker round-1:** REJECTED ✋ — Finding's justification relies on каханне being a parallel geminate, but the dataset's own love.js be cell is kaxanʲe — rendered WITHOUT gemination (no nʲː). Applying nʲː to прывітанне would contradict the cited parallel and the dataset's actual treatment of this exact geminate. Premise false as stated.

---

## Worker round-1 response (作業者)

Findings: 2 · applied 1 · rejected 1 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

**File status: OPEN** — reviewer round-2 (re-verification of applied edits) pending.
