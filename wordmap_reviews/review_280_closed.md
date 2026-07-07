# Wordmap review #280 — Austronesian (W) (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Renata Salomão-Halim, a descriptive/historical Austronesianist working primarily on Western Malayo-Polynesian and the Formosan substrate. For this batch I leaned on the following primary references: Blust & Trussel's *Austronesian Comparative Dictionary* (ACD, for *ŋajaN "name", *duSa "two", *bituqən "star"); Wolff's *Dictionary of Cebuano Visayan* and Rubino's *Ilocano Dictionary and Grammar* for the Central/Northern Philippine pronoun and numeral sets; Rasoloson & Rubino's "Malagasy" chapter (in *The Austronesian Languages*, Adelaar & Himmelmann eds.) plus Dahl's *Malgache et Maanjan* for Malagasy phonology; Durie's *A Grammar of Acehnese*; Li & Tsuchida's *Pazih Dictionary* and Campbell's *Favorlang Vocabulary* (Ogawa/Naojirō materials) for the extinct Western Plains Formosan forms; Geraghty's *The History of the Fijian Languages* (c = /ð/); and Josephs' *Palauan Reference Grammar*. Against those sources the great majority of the 45×5 cells are correct — including the internally consistent glottal-onset Philippine forms, the Batak *goar/goran set, Fijian *yaca* /jaða/, Rotuman *gou* /ŋou/, and the Pazeh/Favorlang/Rukai items. One cell contains a genuine, isolated phonological error.

## Issues found
### 1. `mg` — i — Malagasy ⟨o⟩ is /u/, not /o/
- **File:** `words/i.js` — code `mg`
- **Current:** ["aho","aho"]
- **Expected:** ["aho","ˈahu"]
- **Why:** In standard (Merina) Malagasy orthography, the grapheme ⟨o⟩ represents the phoneme /u/; native Malagasy has no /o/ (that value is written ⟨ô⟩ and occurs only in loans). Cf. *Antananarivo* /-rivu/, *izaho* /izˈahu/. The dataset already applies this very rule in the sister cell **two = ["roa","ˈrua"]** (⟨o⟩ → /u/), so transcribing 1sg *aho* as /aho/ with a cardinal /o/ is internally inconsistent and phonemically wrong; it should be /ˈahu/ (penultimate stress, matching the stress-marking used in the other mg cells *aˈnarana*, *ˈkintana*, *ˈrua*). Source: Rasoloson & Rubino (2005), Malagasy vowel inventory /a e i u/.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
