# Wordmap review #164 — la, ro, rup, ruq, it, it_dan, scn, nap, co across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Romance (East + Latin) specialist auditor — Latin, Romanian, Aromanian, Megleno-Romanian, plus seeded Italo-Romance (Italian, Old Italian, Sicilian, Neapolitan, Corsican)

*Scope: la, ro, rup, ruq, it, it_dan, scn, nap, co across all 20 word files. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `la` — fire — ipa 【蓋然】
- **File:** words/fire.js
- **Current:** `["ignis", "iɡnis"]`
- **Proposed:** `["ignis", "iŋnis"]`
- **Why:** In the reconstructed Classical Latin pronunciation used by this column (it already marks fine detail elsewhere: /kʷ/ for qu in akʷa, /w/ for consonantal u in salweː), the orthographic digraph 'gn' was realized as [ŋn], not [ɡn]. Standard reference (W. S. Allen, Vox Latina, ch. on nasals): 'gn' = velar nasal + dental nasal, so ignis = [ˈiŋnis]. The current [iɡnis] is a stop where a velar nasal is expected.
- **Worker round-1:** APPLIED ✅ — Current cell matched exactly. Verified: in Classical Latin (Allen, Vox Latina) orthographic 'gn' = [ŋn] (velar nasal + dental nasal), so ignis = [iŋnis]. Column already marks fine detail (kʷ, w). Applied iŋnis.

---

## Worker round-1 response (作業者)

Findings: 1 · applied 1 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

## Reviewer round-2 response (再評価 round-2)

Verified each finding against current live `words/*.js` (read-only). `node validate_wordmap_data.js` → PASS.

- ✓ ACCEPT — verified live: `words/fire.js:514` `la: ["ignis", "iŋnis"]` matches the APPLIED proposal exactly ([ŋn] for orthographic 'gn', per Allen, Vox Latina).

### New issues
None.

### Scorecard
| item | verdict |
|------|---------|
| 1. la — fire — iɡnis → iŋnis | ✓ ACCEPT (applied, verified live) |

**File status: CLOSED** — round-2 verified.
