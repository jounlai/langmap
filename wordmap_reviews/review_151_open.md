# Wordmap review #151 — Japonic: ja, ja_osa, ja_aom, ja_oki, ja_hak, ja_kg, ja_sd, ja_kyo, ja_hir, ja_mvi, ja_rys, ojp across all 20 word files (seed codes ja_kgs/ja_okn/ja_thk do not exist in repo; real codes are ja_kg/ja_oki/ja_sd).

## Reviewer self-introduction (ペルソナ自己紹介)

Japonic phonologist auditing Standard Japanese, mainland dialects (Osaka, Kyoto, Hakata, Hiroshima, Aomori/Tsugaru, Sendai, Kagoshima), the Ryukyuan varieties (Okinawan, Miyako, Yaeyama), and Old Japanese, against Pellard/Shimoji on Ryukyuan, Frellesvig/Vovin on Old Japanese, and standard kana orthography.

*Scope: Japonic: ja, ja_osa, ja_aom, ja_oki, ja_hak, ja_kg, ja_sd, ja_kyo, ja_hir, ja_mvi, ja_rys, ojp across all 20 word files (seed codes ja_kgs/ja_okn/ja_thk do not exist in repo; real codes are ja_kg/ja_oki/ja_sd).. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `ja_mvi` — hello — ipa 【確実】
- **File:** words/hello.js
- **Current:** `["んみゃーち", "mjaːt͡ɕi"]`
- **Proposed:** `["んみゃーち", "n̩mjaːt͡ɕi"]`
- **Why:** The surface んみゃーち (Miyako 'nmyaachi', welcome/greeting) begins with a moraic syllabic nasal ん, which is the phonologically distinctive feature of this word — Miyako famously permits word-initial syllabic nasals (Shimoji 2008; the n-initial is what makes the greeting characteristic of the islands). The current IPA mjaːt͡ɕi drops the initial nasal entirely, contradicting the native script. It should begin with a syllabic /n̩/ (or /ɴ/).
- **Worker round-1:** APPLIED ✅ — Surface んみゃーち begins with moraic syllabic nasal ん; Miyako permits word-initial syllabic nasals. Applied n̩mjaːt͡ɕi (certain).

### 2. `ojp` — one — ipa 【要検討】
- **File:** words/one.js
- **Current:** `["比登都", "pïtətu"]`
- **Proposed:** `["比登都", "pitətu"]`
- **Why:** The man'yōgana 比 is a kō-rui (甲類) sign for pi₁, so the first syllable of Old Japanese 一つ should be plain i (pi₁), not the otsu-rui ï (i₂); the second syllable 登 tö₂ is correctly otsu (tə). Writing pïtətu assigns the wrong kō/otsu class to the first vowel. (Flagging as discuss given the dataset's already-noted inconsistent OJP vowel notation, review #14.)
- **Worker round-1:** APPLIED ✅ — Current cell matched ["比登都", "pïtətu"]. Philology is sound: 比 is a kō-rui (甲類) man'yōgana for pi₁ (plain i), while 登 is otsu-rui tö₂ (tə). The current pïtətu wrongly assigned otsu (ï) to the first syllable. Applied pitətu. Confidence was 'discuss' due to known inconsistent OJP vowel notation (review #14), but the kō/otsu class is demonstrably wrong, so applied.

---

## Worker round-1 response (作業者)

Findings: 2 · applied 2 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

**File status: OPEN** — reviewer round-2 (re-verification of applied edits) pending.
