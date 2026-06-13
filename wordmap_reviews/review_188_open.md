# Wordmap review #188 — Historical/reconstructed lects across all 20 concepts: la, cu, ine, non, got, gmy, ave, pi, sa/vsa, hit, akk, sux, xto/txb, hy_grab, syc, cop, cqu

## Reviewer self-introduction (ペルソナ自己紹介)

Loanword & anachronism auditor for historical/reconstructed lects (Latin, OCS, PIE, Old Norse, Classical langs)

*Scope: Historical/reconstructed lects across all 20 concepts: la, cu, ine, non, got, gmy, ave, pi, sa/vsa, hit, akk, sux, xto/txb, hy_grab, syc, cop, cqu. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `gmy` — tree — surface 【蓋然】
- **File:** words/tree.js
- **Current:** `["𐀈𐀏", "dorka"]`
- **Proposed:** `["𐀈𐀬", "doru"]`
- **Why:** Both the Linear B spelling and the gloss are wrong. The transcription 'dorka' corresponds to δορκάς 'gazelle/roe-deer', not 'tree'. The Greek word for tree/wood is δόρυ (doru), attested in Mycenaean (PY) as the form do-ru = 𐀈𐀬. The current sign sequence 𐀈𐀏 reads do-ka, which cannot spell either doru or any 'tree' word. Both surface and ipa fields are affected; correct to do-ru / doru.
- **Worker round-1:** APPLIED ✅ — Confirmed current ['𐀈𐀏','dorka']. do-ka spells neither 'tree' nor doru; 'dorka' = δορκάς 'gazelle'. Mycenaean Greek for tree/wood is δόρυ do-ru = 𐀈𐀬. Applied surface 𐀈𐀬 and ipa doru (finding labeled field 'surface' but both cells corrected as instructed).

### 2. `got` — heart — ipa 【蓋然】
- **File:** words/heart.js
- **Current:** `["𐌷𐌰𐌹𐍂𐍄𐍉", "hɛːrtoː"]`
- **Proposed:** `["𐌷𐌰𐌹𐍂𐍄𐍉", "hɛrtoː"]`
- **Why:** Gothic haírtō: the digraph ai before r, h, ƕ represents SHORT /ɛ/ (Gothic 'breaking', Wright, Grammar of the Gothic Language §22). The standard reconstruction is /ˈhɛrtoː/, not long /ɛː/. The length mark on the first vowel is incorrect; the only long vowel is the final ō.
- **Worker round-1:** APPLIED ✅ — R188 probable. Current matched hɛːrtoː. Gothic ai before r = short /ɛ/ (breaking, Wright §22); only long vowel is final ō. hɛːrtoː→hɛrtoː.

### 3. `got` — mother — ipa 【要検討】
- **File:** words/mother.js
- **Current:** `["𐌰𐌹𐌸𐌴𐌹", "aiθiː"]`
- **Proposed:** `["𐌰𐌹𐌸𐌴𐌹", "ɛːθiː"]`
- **Why:** Gothic aiþei 'mother': the initial ai here is NOT before r/h/ƕ, so it is the long open monophthong /ɛː/ (the conventional value of unbroken Gothic 'ai'), giving /ˈɛːθiː/. The current diphthongal reading /aiθiː/ treats ai as /ai/, which contradicts standard Gothic phonology and is inconsistent with how the same digraph is handled elsewhere. Mark discuss as the diphthong-vs-monophthong value of Gothic ai is debated, but the diphthong here is the less defensible choice.
- **Worker round-1:** REJECTED ✋ — Current matched ["𐌰𐌹𐌸𐌴𐌹","aiθiː"]. The monophthong /ɛː/ value of unbroken Gothic ⟨ai⟩ vs a true diphthong /ai/ is genuinely contested in the handbooks, and the reviewer themselves marked it 'discuss'. Not confident enough to override an existing defensible value; preserved aiθiː.

---

## Worker round-1 response (作業者)

Findings: 3 · applied 2 · rejected 1 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing. **File status: OPEN** — reviewer round-2 pending.
