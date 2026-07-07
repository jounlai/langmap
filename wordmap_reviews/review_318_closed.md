# Wordmap review #318 — Americas (part 3) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Ixchel Moraga, a descriptive/historical linguist specializing in the Mayan and Chibchan families of Mesoamerica and the Isthmo-Colombian area. My primary references for the Mayan data are Nora England's *A Grammar of Mam, a Mayan Language* (1983) for the Mamean group (Mam, Central Mam, Ixil, Awakateko), the Academia de Lenguas Mayas de Guatemala (ALMG) standardized dictionaries and orthographies for Poqomchi', Q'anjob'al, Ixil and Awakateko, Otto Schumann's work and the *Diccionario Ch'ol* (Aulie & Aulie, revised Warkentin) for Chol, and Kaufman's comparative reconstructions (*Mayan Comparative Studies*) for the retroflex/palato-alveolar contrasts. For Chibchan I rely on Adolfo Constenla Umaña & Enrique Margery Peña's *Diccionario cabécar-español, español-cabécar* and Constenla's Bribri materials, plus Nils Holmer and Joel Sherzer's Kuna (Guna) documentation. My review focuses on the phonemic contrasts that Q'anjob'alan orthographies encode (notably ⟨ch⟩ /t͡ʃ/ vs. retroflex ⟨tx⟩ /ʈ͡ʂ/), on pronoun sense (independent/emphatic vs. bound sets), and on ALMG-standard spellings.

## Issues found
### 1. `kjb` — star — retroflex ⟨tx'⟩ mistranscribed as palato-alveolar
- **File:** `words/star.js` — code `kjb`
- **Current:** ["txʼumel","tʃʼumel"]
- **Expected:** ["txʼumel","ʈ͡ʂʼumel"]
- **Why:** The native orthography is correct — Q'anjob'al "star" is ⟨tx'umel⟩ (ALMG *Diccionario del idioma Q'anjob'al*). But the IPA /tʃʼumel/ uses the palato-alveolar ejective, whereas Mayan orthographic ⟨tx⟩ in the Q'anjob'alan branch systematically represents the **retroflex** affricate. Q'anjob'al phonemically contrasts ⟨ch⟩ /t͡ʃ/ with ⟨tx⟩ /ʈ͡ʂ/ (Kaufman, *Mayan Comparative Studies*; England & the ALMG orthography), so ⟨tx'⟩ must be transcribed /ʈ͡ʂʼ/. The transcription /tʃʼumel/ collapses a phonemic distinction and would instead correspond to a spelling ⟨ch'umel⟩. Correct IPA: /ʈ͡ʂʼumel/.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
