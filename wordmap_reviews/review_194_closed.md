# Wordmap review #194 — Americas (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Verónica Candelaria Ruiz-Aguilar, a descriptive/historical linguist specializing in the indigenous languages of the Americas, with fieldwork on Oto-Manguean and Andean varieties. For this batch I leaned on the following reference works: for Mixtec, Josserand's *Mixtec Dialect History* (1983), Macaulay's *A Grammar of Chalcatongo Mixtec* (1996), and the SIL San Juan Mixtepec materials (Kalstrom Dolson; Pike & Ibach); for Zapotec, Pickett et al.'s *Vocabulario zapoteco del Istmo*; for Quechua/Aymara, Cerrón-Palomino's *Lingüística quechua* and *Lingüística aimara*; for Mayan, England's *Autonomía de los idiomas mayas* and the ALMG orthographic norms (Kʼicheʼ, Kaqchikel, Qʼeqchiʼ); for Algonquian, Goddard's and Valentine's (*Nishnaabemwin*) grammars plus the Cree/Ojibwe lexical databases; for Eskimo-Aleut, Fortescue et al.'s *Comparative Eskimo Dictionary* and Bergsland's *Aleut Dictionary*; and for Cariban, Hoff's *The Carib Language*. My review privileges internal orthography↔IPA consistency, since each family's practical orthography encodes glottalization and tone in a principled way.

## Issues found

### 1. `xtm` — two — spurious glottal stop in IPA
- **File:** `words/two.js` — code `xtm`
- **Current:** ["uvi","uʔβi"]
- **Expected:** ["uvi","uβi"]
- **Why:** In Mixtepec Mixtec (and Mixtec orthographies generally), the glottal stop /ʔ/ is systematically and obligatorily written with a saltillo ⟨ʼ⟩ — cf. this very language's own cells `ruʼu` → /ɾuʔu/, `yóʼó` → /joʔo/, `epaʼ`-type forms, where every orthographic ʼ maps to an IPA ʔ and every form lacking ʼ (`sivi` → /siβi/, `kimi` → /kimi/) has no ʔ. The numeral "two" is written ⟨uvi⟩ with **no** saltillo, so it cannot contain a glottal stop; the reflex of Proto-Mixtec *uwi is plain /uβi/ (~[uwi]). The medial /ʔ/ in "uʔβi" is both unmotivated by the orthography and phonotactically anomalous (Mixtec ʔ occurs in the syllable coda after V, not wedged between V and a following consonant). Correct broad IPA is /uβi/.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
