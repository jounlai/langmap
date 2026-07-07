# Wordmap review #304 — Romance (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Núria Bastardas-Rovira, a descriptive/historical Romance linguist working primarily on Ibero-Romance and the Italo- and Gallo-Romance dialect continua. For this review I lean on the following reference works: for Catalan/Valencian, Solà et al.'s *Gramàtica del català contemporani* (IEC), the *DIEC2* and the *Gramàtica normativa valenciana* (AVL); for Spanish dialectology and voseo distribution, the RAE/ASALE *Nueva gramática de la lengua española* and Quilis's *Principios de fonología y fonética españolas*; for Portuguese, Cunha & Cintra's *Nova gramática do português contemporâneo* and Cruz-Ferreira's IPA illustration; for French and Oïl (Norman/Jèrriais/Guernésiais), Grevisse–Goosse *Le Bon Usage* and Liddicoat's *Grammar of the Norman French of the Channel Islands*; and for the Italo-Romance and Gallo-Italic varieties (Neapolitan, Sicilian, Venetian, Ligurian, Romagnol, Corsican), Rohlfs's *Grammatica storica della lingua italiana e dei suoi dialetti*. I verified pronoun sense (1sg subject / 2sg-informal subject), the cardinal value of "two", native orthography, and the vowel-quality and consonant detail of each broad-IPA cell.

## Issues found

### 1. `ca_va` — two — Valencian `dos` has a close /o/, not open /ɔ/
- **File:** `words/two.js` — code `ca_va`
- **Current:** ["dos","ˈdɔs"]
- **Expected:** ["dos","ˈdos"]
- **Why:** The Catalan/Valencian cardinal *dos* is transcribed with a **close** stressed /o/ in all standard sources — /ˈdos/ (DIEC2; AVL *Gramàtica normativa valenciana*; Wiktionary gives Central, Balearic and **Valencian** all as /ˈdos/). The close vowel is the regular reflex of the Latin long ō in *dŭōs*. Valencian maintains the /o/–/ɔ/ contrast but *dos* falls on the close side; open /ˈdɔs/ is not the Valencian value and is internally inconsistent with the base Catalan entry `ca` in this same dataset, which correctly reads /ˈdos/. All other Valencian cells here are well-formed (jo /ˈd͡ʒɔ/ with the characteristic Valencian affricate; nom /ˈnɔm/ correctly open; estrella /esˈtɾeʎa/ with no final-vowel reduction), so this is an isolated vowel-quality slip.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
