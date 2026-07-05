# Wordmap review #305 — Romance (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aurélie Vandeputte, a historical/descriptive Romance phonologist working across Gallo-Romance, Ibero-Romance, Rhaeto-Romance and the Balkan/Gallo-Italic peripheries. For French diachrony I lean on Ferdinand Brunot's *Histoire de la langue française* and Pierre Fouché's *Phonétique historique du français* (esp. the treatment of the <oi> diphthong through the 16th–18th c.); for the Rhaeto-Romance triad on Ricarda Liver's *Rätoromanisch: Eine Einführung* and the *Dicziunari Rumantsch Grischun*, plus Giovanni Frau's *I dialetti del Friuli*; for Sardinian on Max Leopold Wagner's *Dizionario etimologico sardo* and *La lingua sarda*; for Aromanian on Matilda Caragiu Marioțeanu's *Dialectologie aromână*; for Judeo-Spanish on Joseph Nehama's *Dictionnaire du judéo-espagnol*; and for Gallo-Italic on the standard Piedmontese (Brero) and Lombard (Beretta) reference grammars. My review criterion is period-and-variety fidelity: a form is wrong if its sense, script or segment set does not match the specific lect and time-depth the cell claims to represent.

## Issues found

### 1. `fr_class` — star — anachronistic [wa] for 17c <oi>
- **File:** `words/star.js` — code `fr_class`
- **Current:** ["étoile","etwal"]
- **Expected:** ["étoile","etwɛl"]
- **Why:** The entry is explicitly "Classical French (17c., Bel Usage)". In the *bel usage* of the 17th century the graphic diphthong <oi> was pronounced [wɛ], not the modern [wa]: *roi* = [rwɛ], *moi* = [mwɛ], *étoile* = [etwɛl(ə)]. The [wa] realisation existed in popular Parisian speech from the 16th c. but was explicitly stigmatised as vulgar by the grammarians of the Classical norm (Vaugelas and successors) and did not become the prestige pronunciation until the very end of the 18th c. (Fouché, *Phonétique historique du français*, vol. II, on the evolution *oi > we > wɛ > wa*; Brunot, *Histoire de la langue française*, t. IV). Copying the modern [etwal] into a cell that specifically models 17c *bel usage* is therefore a period-segment error; the diphthong nucleus should be [ɛ], giving [etwɛl].

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
