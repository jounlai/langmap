# Wordmap review #220 — Papuan (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Martaus Kolen, a descriptive linguist working on the Trans-New Guinea and Sepik families of the New Guinea highlands and lowlands, with a comparative sideline in Muskogean (a legacy of doctoral fieldwork alignment). For the Papuan cells I lean on Andrew Pawley & Ralph Bulmer's *A Dictionary of Kalam with Ethnographic Notes* (2011), Otto Renck's *A Grammar of Yagaria* (1975) and his *Yagaria Dictionary* (1977), Terry Crowley/Stephen A. Wurm survey materials, J. B. Rule and R. Lomas on Huli (Engan), the SIL Enga materials (Adrianne Lang, *Enga Dictionary*, 1973), and George MacDonald / Alan Healey on the Ok family (Faiwol). For the Muskogean rows I use Cyrus Byington's *A Dictionary of the Choctaw Language* (1915), Pamela Munro & Catherine Willmond's *Chickasaw: An Analytical Dictionary* (1994), and Jack Martin & Margaret Mauldin's *A Dictionary of Creek/Muskogee* (2000). The great majority of the 14 rows check out; I flag a single clear IPA error below.

## Issues found
### 1. `cho` — two — vowel error in IPA transcription
- **File:** `words/two.js` — code `cho`
- **Current:** ["tuklo","taklo"]
- **Expected:** ["tuklo","tʊklo"]
- **Why:** Choctaw "two" is *tuklo* (Byington 1915: "tuklo, a. two"; modern Choctaw Nation orthography identical). The orthographic ⟨u⟩ here represents the lax back rounded vowel /ʊ/ (~/o/), so the broad transcription must be /tʊklo/ (~/toklo/). The supplied IPA "taklo" transcribes the first vowel as /a/, which contradicts both the word's own orthography and its sibling cognate rows in this very dataset (Chickasaw `cic` *toklo* = /tokloʔ/, Muscogee `mus` *hokkolen* = /hokkoːlin/). There is no /a/ in the first syllable of this word; the ⟨a⟩ is a transcription slip and should be /ʊ/ (or /o/).

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
