# Wordmap review #316 — Americas (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Miriam Talawepi, a descriptive linguist specializing in the Uto-Aztecan and Northern Iroquoian families with comparative work across Siouan, Mayan and lowland South American families. For this review I lean on the *Hopi Dictionary / Hopìikwa Lavàytutuveni* (Hopi Dictionary Project, University of Arizona Press, 1998), Robinson & Armagost's *Comanche Dictionary and Grammar* (1990), Grammar and lexicon of Karin Michelson & Mercy Doxtator's *Oneida-English/English-Oneida Dictionary* (2002), Randolph Graczyk's *A Grammar of Crow* (2007), Carolyn Quintero's *Osage Dictionary* (2009), David Rood's *Wichita Grammar* (1976), Iñupiaq materials from Edna MacLean's *Iñupiatun Uqaluit Taniktun Sivuninit* (2014), the *Diccionario Quechua–Español* (Academia Mayor de la Lengua Quechua), Frances Karttunen's *An Analytical Dictionary of Nahuatl* (1983), and Terrence Kaufman's Mayan comparative reconstructions. Tonal and glottalization details were checked against the relevant reference orthographies where they exist.

## Issues found

### 1. `hop` — star — orthography undercounts the long vowel
- **File:** `words/star.js` — code `hop`
- **Current:** ["sohu","soːhɨ"]
- **Expected:** ["soohu","soːhɨ"]
- **Why:** The standard Third Mesa orthography of the *Hopi Dictionary / Hopìikwa Lavàytutuveni* (1998) writes 'star' as **soohu** (plural *soosohu*), with a doubled ⟨oo⟩ marking the long vowel. The IPA cell already correctly shows the long vowel /soːhɨ/, so the native-orthography spelling "sohu" (single ⟨o⟩) is internally inconsistent with its own transcription and does not match the reference orthography. Normalize the native form to **soohu**; the IPA is correct as given.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
