# Wordmap review #282 — Bantu (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Miriam Kʼondowe-Nurse, a descriptive Bantuist working primarily on the Tanzanian mainland (Guthrie zones E, F, G, N) and the Sabaki/Comorian coast, with secondary competence in the Great Lakes (JE) and Southern (S) zones. My core references for this batch are Maganga & Schadeberg (1992) *Kinyamwezi: Grammar, Texts, Vocabulary* (the standard descriptive source for the Sukuma-Nyamwezi consonant system), Batibo's work on Sukuma phonology (*Le Kesukuma*), Nurse & Hinnebusch (1993) *Swahili and Sabaki: A Linguistic History*, Ahmed-Chamanga's *Dictionnaire comorien-français* (Shingazidja), Benson's *Kikuyu-English Dictionary*, Poulos & Msimang (1998) *A Linguistic Analysis of Zulu*, Doke & Mofokeng for Sotho, Meeuwis (2020) *A Grammatical Overview of Lingala*, and Guthrie's comparative series. My eye in this round is on the bilabial obstruent series of the Sukuma-Nyamwezi group, where the reflex of Proto-Bantu \*b is the voiced bilabial fricative [β], not an implosive.

## Issues found

### 1. `suk` — two — implosive [ɓ] should be bilabial fricative [β]
- **File:** `words/two.js` — code `suk`
- **Current:** ["ibhili","iˈɓili"]
- **Expected:** ["ibhili","iˈβili"]
- **Why:** Sukuma (F21) has no implosive stops; the digraph *bh* in Sukuma orthography represents precisely the voiced bilabial fricative [β] (Batibo; Maganga & Schadeberg 1992 for the sister language). Pairing orthographic *bh* with IPA [ɓ] is internally contradictory, and it is also inconsistent with how this very dataset transcribes the cognate \*b reflex in neighbouring/related languages — e.g. Sangu `avili`→[aβili], Yao `iŵili`→[iβili], Tumbuka `ŵiŵiri`→[βiβiɾi], Runyankole `ibiri`→[iβiri]. The stem *-bili* here is [βili].

### 2. `nym` — two — implosive [ɓ] should be bilabial fricative [β]
- **File:** `words/two.js` — code `nym`
- **Current:** ["ibili","iɓili"]
- **Expected:** ["ibili","iβili"]
- **Why:** Maganga & Schadeberg (1992: consonant inventory) describe the Nyamwezi (F22) reflex of \*b explicitly as the voiced bilabial fricative [β] (their *ß*/*bh*), with no implosive series in the language. Intervocalic *-bili* is therefore [iβili], parallel to the Sukuma correction above and to the dataset's own [β] transcriptions for the same root in cognate languages. The implosive [ɓ] is a wrong segment.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
