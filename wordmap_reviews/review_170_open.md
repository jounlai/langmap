# Wordmap review #170 — Polynesian (haw, mi, sm, to, ty, rap, niu, tvl, tkl), Fijian (fj), Micronesian (mh), Malagasy (mg), Malayo-Polynesian seed (id, ms, tl, jv, su, ceb), Navajo (nv), Quechua (qu), Guarani (gn) across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Austronesian + Pacific + Indigenous Americas specialist auditor

*Scope: Polynesian (haw, mi, sm, to, ty, rap, niu, tvl, tkl), Fijian (fj), Micronesian (mh), Malagasy (mg), Malayo-Polynesian seed (id, ms, tl, jv, su, ceb), Navajo (nv), Quechua (qu), Guarani (gn) across all 20 word files. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `gn` — eat — surface 【蓋然】
- **File:** words/eat.js
- **Current:** `["kaʼu", "kaʔu"]`
- **Proposed:** `["karu", "kaˈɾu"]`
- **Why:** Paraguayan Guarani 'kaʼu' means 'to be/get drunk (on alcohol)', not 'to eat'. The general intransitive verb 'to eat' is 'karu' (root '-karu'; cf. transitive '-ʼu' to consume, seen in the adjacent Nheengatu/yrl entry 'ku'). 'kaʼu' is a clear semantic error for the 'eat' concept (Guasch/Ortiz dictionary; Wiktionary 'karu', 'kaʼu').
- **Worker round-1:** APPLIED ✅ — Current cell matched. 'kaʼu' means 'to get drunk', a semantic error for 'eat'. Correct intransitive 'to eat' is 'karu'. Applied both fields per proposal: surface kaʼu → karu, ipa kaʔu → kaˈɾu (final stress, tap for r).

---

## Worker round-1 response (作業者)

Findings: 1 · applied 1 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

**File status: OPEN** — reviewer round-2 (re-verification of applied edits) pending.
