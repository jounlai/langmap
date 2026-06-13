# Wordmap review #163 — Romance (West: Ibero + Gallo) — es_eu, es_mx, pt_eu, pt_br, fr, fr_class, ca, oc, gl, an, ast, ext, mwl, frp, nrf, pcd, lad across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Romance West (Ibero + Gallo) specialist auditor

*Scope: Romance (West: Ibero + Gallo) — es_eu, es_mx, pt_eu, pt_br, fr, fr_class, ca, oc, gl, an, ast, ext, mwl, frp, nrf, pcd, lad across all 20 word files. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `an` — water — ipa 【確実】
- **File:** words/water.js
- **Current:** `["augua", "ˈawɣwa"]`
- **Proposed:** `["augua", "ˈawɡwa"]`
- **Why:** Aragonese 'augua' (water) is pronounced /ˈau̯ɡwa/ per Wiktionary (en.wiktionary.org/wiki/augua). The current IPA 'ˈawɣwa' inserts a spurious voiced velar fricative [ɣ] before the [w] of the [ɡw] cluster; the onset of the second syllable is a plain stop [ɡ], giving the diphthong [aw] + [ɡwa]. It should be ˈawɡwa.
- **Worker round-1:** APPLIED ✅ — Current cell matched ["augua", "ˈawɣwa"]. Confidence 'certain'. Aragonese augua = /ˈau̯ɡwa/; the spurious voiced velar fricative [ɣ] before the [ɡw] cluster was removed. Changed to ˈawɡwa.

---

## Worker round-1 response (作業者)

Findings: 1 · applied 1 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

**File status: OPEN** — reviewer round-2 (re-verification of applied edits) pending.
