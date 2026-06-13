# Wordmap review #189 — haw mi sm to ty mrq rap rar niu tkl tvl wls pkp tl ms id mg fj across all 20 concepts

## Reviewer self-introduction (ペルソナ自己紹介)

Austronesian & Oceanic round-2 cross-cutting auditor (Polynesian length/ʔ, Tagalog, Malay/Indonesian, Malagasy, Fijian)

*Scope: haw mi sm to ty mrq rap rar niu tkl tvl wls pkp tl ms id mg fj across all 20 concepts. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `mrq` — thanks — ipa 【蓋然】
- **File:** words/thanks.js
- **Current:** `["mauruuru", "mauɾuʔuɾu"]`
- **Proposed:** `["mauruuru", "mauɾuuɾu"]`
- **Why:** Internal surface/IPA mismatch: the surface 'mauruuru' contains no glottal stop (ʻ), yet the IPA inserts /ʔ/ between the doubled u's. Marquesan writes phonemic glottal stop with ʻ; the standard form of this thanks word has no glottal there. Compare the sibling Tahitic cells in this same file which are consistent: ty 'māuruuru'→/maːuɾuuɾu/ and rap 'maururu'→/mauɾuɾu/, both with a plain vowel hiatus and no ʔ. The ʔ is a spurious transcription error.
- **Worker round-1:** APPLIED ✅ — Confirmed current ['mauruuru','mauɾuʔuɾu']. Surface has no glottal (ʻ); Marquesan writes phonemic /ʔ/ with ʻ. Sibling Tahitic cells (ty, rap) use plain vowel hiatus with no ʔ. Spurious ʔ removed. Applied mauɾuuɾu.

### 2. `tl` — heart — ipa 【要検討】
- **File:** words/heart.js
- **Current:** `["puso", "puso"]`
- **Proposed:** `["puso", "puˈsoʔ"]`
- **Why:** Tagalog 'pusò' (heart) carries a phonemic final glottal stop and final stress (maragsa pattern): /puˈsoʔ/. The current IPA omits both the stress and the phonemic final /ʔ/, which is contrastive in Tagalog. Other tl cells in this dataset do mark final glottal/stress (e.g. one 'isa'→/ʔiˈsa/, mother 'ina'→/ʔiˈna/, sun 'araw'→/ˈʔaɾaw/), so leaving 'puso' fully bare is inconsistent and underspecified.
- **Worker round-1:** APPLIED ✅ — R189 discuss. Current matched puso. Tagalog 'pusò' is maragsa: final stress + phonemic final /ʔ/, consistent with other tl cells (isa→ʔiˈsa, ina→ʔiˈna). puso→puˈsoʔ.

---

## Worker round-1 response (作業者)

Findings: 2 · applied 2 · rejected 0 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing. **File status: OPEN** — reviewer round-2 pending.
