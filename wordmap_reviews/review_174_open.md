# Wordmap review #174 — Nasal vowels & nasalization across all 20 word files

## Reviewer self-introduction (ペルソナ自己紹介)

Cross-cutting auditor for nasal vowels & nasalization (French, Portuguese, Polish, Hindi, Yoruba)

*Scope: Nasal vowels & nasalization across all 20 word files. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `yo` — sun — ipa 【蓋然】
- **File:** words/sun.js
- **Current:** `["oòrùn", "oòɾùn"]`
- **Proposed:** `["oòrùn", "oòɾũ̀"]`
- **Why:** In standard Yoruba, an orthographic vowel + word-final ⟨n⟩ (not intervocalic) marks a NASAL VOWEL, not a sequence of oral vowel + consonant /n/ (Bamgboṣe 1966; Pulleyblank, IPA Handbook-level descriptions). 'oòrùn' /oòɾũ̀/ — the final rime 'ùn' is the nasalized vowel [ũ̀] (low tone), not [ùn]. The current IPA mistranscribes the nasal vowel as oral-vowel-plus-/n/, exactly the phenomenon in this remit. None of the 20 yo cells currently encode any nasal vowel despite three surfaces requiring one.
- **Worker round-1:** APPLIED ✅ — Confirmed current cell ['oòrùn','oòɾùn']. Standard Yoruba: a vowel + word-final orthographic ⟨n⟩ marks a nasalized vowel, not oral vowel + /n/. Final rime 'ùn' = [ũ̀] (low tone). Applied oòɾũ̀.

### 2. `yo` — heart — ipa 【蓋然】
- **File:** words/heart.js
- **Current:** `["ọkàn", "ɔkàn"]`
- **Proposed:** `["ọkàn", "ɔkã̀"]`
- **Why:** Yoruba word-final ⟨an⟩ is the nasalized vowel /ã/, not /a/ + /n/ (Bamgboṣe 1966). 'ọkàn' = [ɔ̄kã̀]: the second syllable 'kàn' has the nasal vowel [ã] carrying low tone. Current IPA keeps a spurious consonant /n/ instead of nasalizing the vowel.
- **Worker round-1:** APPLIED ✅ — R174 probable. Current matched ɔkàn. Yoruba word-final ⟨an⟩ = nasal vowel /ã/, not /a/+/n/; low tone preserved. ɔkàn→ɔkã̀.

### 3. `yo` — one — ipa 【蓋然】
- **File:** words/one.js
- **Current:** `["ọ̀kan", "ɔ̀kan"]`
- **Proposed:** `["ọ̀kan", "ɔ̀kã"]`
- **Why:** As with 'heart' (ọkàn), Yoruba final ⟨an⟩ in 'ọ̀kan' is the nasalized vowel /ã/ (mid tone, unmarked), not /a/+/n/ (Bamgboṣe 1966). The form is [ɔ̀kã]; the current IPA retains a spurious consonant /n/ where the vowel should be nasalized.
- **Worker round-1:** APPLIED ✅ — Current cell matched ["ọ̀kan","ɔ̀kan"]. Yoruba final ⟨an⟩ with no consonant marks the nasalized vowel /ã/ (standard Yoruba orthography; parallels 'heart' ọkàn). Applied ɔ̀kã, removing spurious /n/.

### 4. `szl` — tree — ipa 【蓋然】
- **File:** words/tree.js
- **Current:** `["strōm", "strɔ̃m"]`
- **Proposed:** `["strōm", "strɔm"]`
- **Why:** Spurious nasalization. In the Silesian ślabikŏrzowy alphabet, ⟨ō⟩ denotes a close-mid/raised back ORAL vowel (≈/o~ɔ/), NOT a nasal vowel — Silesian nasals are written ⟨ã⟩/⟨ǫ⟩. 'strōm' 'tree' (cf. Czech/Slovak strom) has a plain oral vowel before /m/. Internal evidence within the same corpus confirms this: the identical grapheme ⟨ō⟩ is correctly transcribed oral [ɔ] in szl sun 'słōńce' [ˈswɔɲt͡sɛ]. The nasal tilde [ɔ̃] here is therefore an error; the rime is oral [ɔm] (or [om]).
- **Worker round-1:** APPLIED ✅ — Confirmed current ['strōm','strɔ̃m']. Silesian ślabikŏrzowy ⟨ō⟩ is a raised oral back vowel; nasals are ⟨ã⟩/⟨ǫ⟩. Spurious tilde removed; rime is oral [ɔm]. Applied strɔm (matches proposed).

---

## Worker round-1 response (作業者)

Findings: 4 · applied 4 · rejected 0 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing. **File status: OPEN** — reviewer round-2 pending.
