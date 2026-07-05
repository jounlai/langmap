# Wordmap review #200 — Bantu (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Muthivhi Netshifhefhe, a comparative Bantuist working primarily on the southern (Sotho-Tswana, Nguni, Venda) and south-central (Nyanja–Tumbuka, Sena, Yao) zones, with a secondary focus on the Great Lakes (JE) and Mount Kenya (E.50) clusters. My working references for this batch are Nurse & Philippson (eds.) *The Bantu Languages* (2003) for pan-Bantu segment inventories and *Proto-Bantu* reflexes; G. Poulos, *A Linguistic Analysis of Venda* (1990) and the *Tshivenḓa–English Dictionary* (Van Warmelo) for the Venda dental series; W. Turner's *Tumbuka–Tonga–English Dictionary* and Vail's work on Tumbuka phonology for the ⟨ŵ⟩ = /β/ contrast; Doke & Vilakazi's *Zulu–English Dictionary* and the Nguni orthographies for Zulu/Xhosa/Swazi/Ndebele; Ngunga's *Phonology and Morphology of the Ciyao Verb* for Yao; Ashton's *Swahili Grammar*; and Meeussen's *Bantu Grammatical Reconstructions* for the numeral *\*-bɪdɪ and the pronominal roots. The overwhelming majority of the 44 cells are correct; my flags concern two orthographies whose IPA renders a grapheme with the wrong place/manner of articulation.

## Issues found

### 1. `tum` — two — ⟨ŵ⟩ transcribed as an implosive instead of a bilabial fricative
- **File:** `words/two.js` — code `tum`
- **Current:** ["ŵiŵiri","ɓiɓiɾi"]
- **Expected:** ["ŵiŵiri","βiβiɾi"]
- **Why:** In Tumbuka (and the shared Nyanja/Chewa orthographic tradition), the grapheme ⟨ŵ⟩ represents the voiced bilabial fricative/approximant /β/; the implosive /ɓ/ is a *separate* phoneme written ⟨b⟩ (Turner, *Tumbuka–Tonga–English Dictionary*; Vail on Tumbuka phonology). Rendering ⟨ŵiŵiri⟩ as /ɓiɓiɾi/ swaps the fricative for an implosive it does not contain. Compare the Yao cell `iŵili` → /iβili/ in this same batch, which maps ⟨ŵ⟩ correctly to /β/ — the Tumbuka entry is the outlier and should read /βiβiɾi/.

### 2. `ve` — i — Venda dental nasal ⟨ṋ⟩ transcribed as retroflex
- **File:** `words/i.js` — code `ve`
- **Current:** ["nṋe","ɳːe"]
- **Expected:** ["nṋe","n̪ːe"]
- **Why:** In Tshivenḓa orthography the underlined ⟨ṋ⟩ (like ⟨ṱ ḓ ḽ⟩) belongs to the dental series, i.e. voiced dental nasal /n̪/, not the retroflex /ɳ/ (Poulos, *A Linguistic Analysis of Venda*, 1990; Van Warmelo). Venda has no retroflex nasal in its inventory, so /ɳ/ is a wrong segment. The correct broad transcription of the 1sg pronoun ⟨nṋe⟩ is /n̪ːe/ (dental geminate).

### 3. `ve` — star — Venda dental nasal ⟨ṋ⟩ transcribed as retroflex
- **File:** `words/star.js` — code `ve`
- **Current:** ["ṋaledzi","ɳaledzi"]
- **Expected:** ["ṋaledzi","n̪aledzi"]
- **Why:** Same issue as #2: initial ⟨ṋ⟩ is the voiced dental nasal /n̪/, not retroflex /ɳ/. The orthography ⟨ṋaledzi⟩ is correct (this is precisely what distinguishes Venda from the Sotho-Tswana cognate ⟨naledi⟩ with a plain alveolar /n/); only the IPA place feature is wrong. Expected /n̪aledzi/.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
