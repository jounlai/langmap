# Wordmap review #213 — Niger-Congo (non-Bantu) (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. A. O. Ọmọ́bá,, a descriptive/comparative linguist working on Volta-Niger and Atlantic languages. For this batch my principal references were: R. N. Agheyisi, *An Edo–English Dictionary* (1986) and H. Melzian, *A Concise Dictionary of the Bini Language of Southern Nigeria* (1937) for Edoid ⟨v⟩/⟨vb⟩/⟨mw⟩ phonology; A. Bamgboṣe, *A Grammar of Yoruba* and R. C. Abraham, *Dictionary of Modern Yoruba* for Yoruba tone; F. C. Ogbalu / *Igbo Metalanguage* for Igbo; E. E. Essien / R. W. Cook for Efik–Ibibio (Lower Cross); J. D. Sauvageot and O. Ka for Wolof/Serer; C. Bailleul's *Dictionnaire Bambara–Français* and the Vydrin Manding materials for Mande (Bambara, Maninka, Vai, Mende); D. Westermann's *Ewe* grammar for the Gbe cluster; and Haacke & Eiseb's *Khoekhoegowab Dictionary* for Nama/Korana. I verified all 44 language rows cell-by-cell; the overwhelming majority (pronoun sense = emphatic/independent, correct numeral citation forms, name = appellation, star = celestial) are correct, including the tone-marked Kwa/Gbe rows and the click transcriptions.

## Issues found

### 1. `bin` — star — Edo digraph ⟨vb⟩ mistranscribed as a stop cluster
- **File:** `words/star.js` — code `bin`
- **Current:** ["orivbi","oˈɾiʋbi"]
- **Expected:** ["orivbi","oˈɾiβi"]
- **Why:** In Edo (Bini) orthography ⟨vb⟩ is a **single** consonant — the voiced bilabial approximant/fricative /β/ (Melzian 1937; Agheyisi 1986), distinct from ⟨v⟩ = labiodental /ʋ/ (cf. this same row's `two` "eva" = /èʋà/). The transcription /oˈɾiʋbi/ wrongly splits the digraph into an approximant **plus** a plosive /b/, which does not occur here; there is no oral stop in the word. It should be a single bilabial segment: /oˈɾiβi/ (orthography unchanged).

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
