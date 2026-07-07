# Wordmap review #242 — Bantu (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Selma Nangolo-Vieira, a descriptive Bantuist working on the Southwest and West-Central Bantu (Guthrie zones K, R, H) plus the Beti–Fang and Grassfields peripheries. My working references for this batch are: Guthrie's *Comparative Bantu* (for reconstruction cross-checks), Zimmermann & Hasheela's *Oshikwanyama Grammar* and Tirronen's *Ndonga–English Dictionary* for Oshiwambo; Schadeberg's *A Sketch of Umbundu* (1990) and Valente's *Gramática Umbundu* for Umbundu; Möhlig & Kavari's *Reference Grammar of Herero* for Otjiherero; Chatelain's *Grammatica elementar do Kimbundu* (1888) for Kimbundu; Horton's *A Grammar of Luvale* (1949); van der Wal's *Word Order and Information Structure in Makhuwa-Enahara* (2009); Nabirye's Lusoga materials; Redden's *Ewondo* and Alexandre's Bulu descriptions for Beti; and Hyman's *Aghem Grammatical Structure* (1979). I checked each cell for sense (independent 1sg/2sg pronoun, cardinal numeral, common-noun readings of "name"/"star"), orthographic normativity, and phonemic transcription against the letter–sound correspondences those sources establish.

## Issues found

### 1. `kj` — two — labiodental /v/ mis-transcribed as bilabial /β/
- **File:** `words/two.js` — code `kj`
- **Current:** ["vali","βali"]
- **Expected:** ["vali","vali"]
- **Why:** In Oshikwanyama the grapheme ⟨v⟩ denotes the voiced labiodental fricative /v/, not the bilabial /β/ (Zimmermann & Hasheela; the language has no /v/–/β/ contrast and no bilabial /β/ phoneme). The corpus already transcribes the identical Southwest-Bantu stem correctly for Herero (`her` -vari → /vari/) and Luvale (`lue` -vali → /vali/), so /βali/ here is both phonemically wrong and corpus-internally inconsistent. Orthography and sense are correct; only the IPA segment is off.

### 2. `umb` — two — labiodental /v/ mis-transcribed as bilabial /β/
- **File:** `words/two.js` — code `umb`
- **Current:** ["vali","βali"]
- **Expected:** ["vali","vali"]
- **Why:** Umbundu ⟨v⟩ = /v/ (labiodental) per Schadeberg's *Sketch of Umbundu* and Valente; Umbundu does not have a phonemic bilabial /β/ in this position. As with Kwanyama, the numeral stem -vali is correct in form and sense, but the broad-IPA segment should be /v/, matching the treatment of the same stem elsewhere in the corpus (`her`, `lue`). Correcting /βali/ → /vali/.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
