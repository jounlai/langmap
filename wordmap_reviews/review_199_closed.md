# Wordmap review #199 — Austronesian (W) (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Lî Bûn-hôa, a descriptive linguist specializing in the Formosan and West-Malayo-Polynesian branches of Austronesian, working from Elizabeth Zeitoun's grammatical descriptions of Tsou and Rukai, Tung T'ung-ho's *A Descriptive Study of the Tsou Language*, Raleigh Ferrell's *Paiwan Dictionary* (1982), Robert Blust's *Thao Dictionary* (2003) and *Austronesian Comparative Dictionary*, Søren Egerod's *Atayal–English Dictionary* (1980), the Council of Indigenous Peoples / klokah.tw online Formosan dictionaries, and the Austronesian Basic Vocabulary Database with the Wiktionary Formosan cognate-set tables (drawing on Tsuchida and Paul Jen-kuei Li's fieldwork). For this round I cross-checked each cell against regular sound-correspondence expectations (e.g. PAn \*bituqen 'star', \*ŋajan 'name') and against attested dictionary forms; most of the 55 cells are sound (Paiwan *vituqan*, Puyuma *vituwan*, Truku *pngrah*, Thao *fitu'ish* are all regular \*bituqen reflexes, and the pronoun/numeral columns check out), but two Tsou cells are semantically wrong.

## Issues found
### 1. `tsu` — star — Tsou "fatu" is 'stone', not 'star'
- **File:** `words/star.js` — code `tsu`
- **Current:** ["fatu","fatu"]
- **Expected:** ["congroha","coŋroxa"]
- **Why:** Tsou *fatu* is the regular reflex of PAn \*batu(h) 'stone' (Tsou \*b > f), and is glossed 'stone' in every source (Tung 1964; ABVD; confirmed as 'stone' in the comparative literature) — it is a wrong-sense entry, not the celestial noun. Tsou did not retain a \*bituqen reflex for 'star'; the attested word is *congroha* /coŋroxa/ (Formosan cognate-set entry 130, "star" = /coŋroxa/). The /x/ is the velar/uvular fricative written ⟨h⟩ in the standard CIP orthography (note ⟨x⟩ in Tsou orthography denotes the vowel /ʉ/, not this consonant).

### 2. `tsu` — name — Tsou 'name' is "ongko", not "engva"
- **File:** `words/name.js` — code `tsu`
- **Current:** ["engva","əŋva"]
- **Expected:** ["ongko","oŋko"]
- **Why:** The attested Tsou noun for 'name (appellation)' is *ongko* /oŋko/ (Formosan cognate-set entry 63, "name" = /oŋko/; also the everyday form seen in teaching materials, e.g. *ongko-su* 'your name'). *engva* /əŋva/ is not the word for 'name' — it corresponds to the 'word/speech' root (cf. Tsou *e'engveu* 'word, language') and is a wrong-sense entry here. Tsou uses *ongko*, not a \*ŋajan reflex, for this concept.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
