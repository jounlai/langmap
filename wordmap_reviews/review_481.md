# Wordmap data review #481 — austronesian-oceanic

> Comprehensive 30-slice review rally, 2026-09-07 (157 agents, adversarially verified). Slice: austronesian-oceanic.

## Reviewer self-introduction (ペルソナ自己紹介)

Oceanic/Polynesian reviewer; macrons, glottal stops, ABVD/POLLEX. Read-only review; every finding below was adversarially verified against the live data and a cited source before listing.

## Findings (verified real)

### 1. [MED] poop / sm (Samoan)
- **Issue:** Cell is ["tae", "taʔe"]: the surface has no ʻokina but the IPA inserts a glottal stop. Samoan reflects Proto-Polynesian *taqe as tae with NO glottal (the *q was lost); the glottal survives only in Tongan taʻe (which the dataset correctly gives as ["taʻe","taʔe"]). The IPA is wrong.
- **Fix:** ["tae", "tae"]
- **Source:** Wiktionary 'tae' etymology: PPn *taqe > Samoan tae, Tongan taʻe, Hawaiian kae; Milner, Samoan Dictionary.
- **Disposition:** APPLIED (`9e3587f3`)

### 2. [MED] tooth / fj (Fijian)
- **Issue:** Cell is ["bati", "bati"]: the IPA omits prenasalization. Fijian orthographic ⟨b⟩ is always /mb/, which the dataset itself renders everywhere else (hello bula→mbula, night bogi→mboŋi, fire buka→mbuka). Only this cell drops the nasal.
- **Fix:** tooth / fj: ["bati", "mbati"] (IPA "mbati")
- **Source:** Wikibooks, Fijian/Alphabet and pronunciation: ⟨b⟩=/mb/; word bati [mbati] 'tooth/edge'.
- **Disposition:** APPLIED (`9e3587f3`)

### 3. [MED] ear / ty (Tahitian)
- **Issue:** Cell is ["tari'a", "tarʔia"]: the surface tariʻa is syllabified ta-ri-ʻa (glottal before final a), but the IPA "tarʔia" places the glottal after r and swaps the i/a order, giving tar-ʔi-a. The IPA does not match the surface and misrepresents the word.
- **Fix:** ["tari'a", "taɾiʔa"] — the binding fix is the IPA "taɾiʔa" (tap ɾ to match sister rows mi/rar; glottal ʔ before the final a). Replacing the ASCII apostrophe in the surface with an ʻokina ("tariʻa") is a valid but optional cosmetic improvement, not the error.
- **Source:** Tahitian tariʻa 'ear' (Wikipedia Tahitian language; Académie Tahitienne orthography — ʻeta before final vowel).
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 4. [LOW] milk / haw (Hawaiian)
- **Issue:** Cell is ["waiū", "wɐiˈʔuː"]: the IPA inserts a glottal stop (ʔ) that the surface waiū (wai + ū, milk = 'breast liquid') does not have — there is no ʻokina in the standard spelling.
- **Fix:** wɐiˈuː
- **Source:** Pukui & Elbert, Hawaiian Dictionary (wehewehe.org): waiū 'milk', no ʻokina.
- **Disposition:** APPLIED (`9e3587f3`)

### 5. [LOW] red / mi (Māori)
- **Issue:** Cell is ["whero", "ˈfɛɾɔ"]: the IPA transcribes ⟨wh⟩ as /f/, but every other Māori cell renders ⟨wh⟩ as /ɸ/ (four whā→ɸaː, house whare→ɸaɾe, mother whaea→ɸaea, star whetū→ɸɛtuː). This one cell is internally inconsistent.
- **Fix:** ɸɛɾɔ
- **Source:** Internal consistency (dataset's own mi cells); standard Māori ⟨wh⟩ = /ɸ/.
- **Disposition:** APPLIED (`9e3587f3`)

### 6. [LOW] i / sm and you / sm (Samoan)
- **Issue:** Samoan surface forms mix apostrophe characters: i = "a'u" and you = "'oe" use the ASCII apostrophe ('), whereas other Samoan cells correctly use the ʻokina (ʻai, ʻeleʻele). The glottal in these words should be the ʻokina for orthographic consistency.
- **Fix:** words/i.js sm surface: "aʻu" (a + U+02BB ʻokina + u); words/you.js sm surface: "ʻoe" (U+02BB ʻokina + oe). IPA values (aʔu / ʔoe) are correct and unchanged. This matches the reviewer's suggested fix exactly.
- **Source:** Samoan orthography standard (ʻokina); dataset's own ʻai/ʻeleʻele cells.
- **Disposition:** DEFERRED — needs a decision (surface/script change, meta, or multi-target)

### 7. [LOW] three / mh (Marshallese)
- **Issue:** Cell is ["jilu", "tʃiluʷ"]: the IPA renders ⟨j⟩ as /tʃ/, but every other Marshallese cell transcribes ⟨j⟩ as the palatalized /tʲ/ (daughter nejin→netʲin, father jemān→tʲemʲaːn, mother jinō→tʲinə, one juon→tʲuon, salt jọọḷ→tʲɒːlˠ). This cell is inconsistent.
- **Fix:** tʲiluʷ
- **Source:** Internal consistency (dataset's own mh cells); Marshallese ⟨j⟩ = [tʲ~dʲ] (Marshallese-English Dictionary).
- **Disposition:** APPLIED (`9e3587f3`)

**File status: OPEN** — 5 applied, 2 awaiting a decision.
