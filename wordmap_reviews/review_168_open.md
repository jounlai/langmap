# Wordmap review #168 — ga cy gd br lt lv el el_grc hy ka sq eu across all 20 concepts

## Reviewer self-introduction (ペルソナ自己紹介)

Celtic + Baltic + Hellenic + Armenian/Kartvelian/Albanian auditor

*Scope: ga cy gd br lt lv el el_grc hy ka sq eu across all 20 concepts. Audited the family across all 20 word files (words/*.js), read-only, against authoritative references. Part of the wave-13 review rally (20 family reviewers + 5 programmer-workers, run 2026-06-13). 150 prior reviews respected — settled conventions not re-litigated.*

---

## Issues found

### 1. `hy` — moon — ipa 【蓋然】
- **File:** words/moon.js
- **Current:** `["լուսին", "lusin"]`
- **Proposed:** `["լուսին", "luˈsin"]`
- **Why:** Eastern Armenian stress falls on the final full-vowel syllable, so լուսին is /luˈsin/. This column consistently marks final stress on other polysyllables (ուտել uˈtel, խմել χəˈmel, արև ɑˈɾev, շնորհակալություն …luˈtʰjun); լուսին is missing the same mark.
- **Worker round-1:** APPLIED ✅ — Current matched ["լուսին", "lusin"]. Eastern Armenian stress falls on the final full-vowel syllable, /luˈsin/; the column marks final stress on other polysyllables (uˈtel, χəˈmel, ɑˈɾev). Applied luˈsin. (Note: hyw and hy_grab share the same lusin string but were not in scope; left unchanged.)

### 2. `hy` — cat — ipa 【蓋然】
- **File:** words/cat.js
- **Current:** `["կատու", "kɑtu"]`
- **Proposed:** `["կատու", "kɑˈtu"]`
- **Why:** Eastern Armenian word stress is final, so կատու is /kɑˈtu/. The hy column marks final stress on its other polysyllables (uˈtel, χəˈmel, ɑˈɾev); կատու is inconsistently unmarked.
- **Worker round-1:** APPLIED ✅ — Current cell matched. Eastern Armenian has fixed final stress; other hy polysyllables in this dataset mark it (uˈtel, χəˈmel, ɑˈɾev). Applied kɑtu → kɑˈtu. Note: hyw (Western, ɡɑdu) and hy_grab (Classical, kɑtu) left unchanged as not in scope and different stress conventions.

### 3. `hy` — hello — ipa 【蓋然】
- **File:** words/hello.js
- **Current:** `["բարև", "bɑɾev"]`
- **Proposed:** `["բարև", "bɑˈɾev"]`
- **Why:** բարև is /bɑˈɾɛv/ with final stress in Eastern Armenian; the same root word արև (sun) is transcribed ɑˈɾev with the stress mark in this very dataset, so բարև lacking it is an internal inconsistency.
- **Worker round-1:** APPLIED ✅ — Eastern Armenian has regular final stress; root word արև (sun) is transcribed ɑˈɾev with stress mark in sun.js. բарև lacking it was internally inconsistent. Applied bɑˈɾev.

### 4. `el` — sun — ipa 【要検討】
- **File:** words/sun.js
- **Current:** `["ήλιος", "ˈilios"]`
- **Proposed:** `["ήλιος", "ˈiʎos"]`
- **Why:** Standard Modern Greek ήλιος undergoes synizesis of the unstressed -ιο- to /ʎ/, yielding /ˈiʎos/ (Wiktionary lemma pronunciation); the three-syllable /ˈilios/ is an over-careful/spelling pronunciation. The neighboring cell ήλιος→ʝα-type palatalization is otherwise reflected in this column (e.g. γεια ˈʝa, καρδιά kaɾˈðʲa).
- **Worker round-1:** APPLIED ✅ — Current cell matched ["ήλιος", "ˈilios"]. Confidence 'discuss' but well-supported: Standard Modern Greek ήλιος undergoes synizesis of unstressed -ιο- to /ʎ/, giving the Wiktionary lemma /ˈiʎos/; palatalization is reflected elsewhere in this column (γεια ˈʝa, καρδιά). Changed to ˈiʎos.

---

## Worker round-1 response (作業者)

Findings: 4 · applied 4 · rejected 0 · skipped 0. All edits applied to the live words/*.js with `node validate_wordmap_data.js` passing (0 failures). Rejections were independently re-checked by the worker (see per-finding notes above).

**File status: OPEN** — reviewer round-2 (re-verification of applied edits) pending.
