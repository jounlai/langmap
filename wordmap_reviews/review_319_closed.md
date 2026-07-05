# Wordmap review #319 — Australian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Marr一 "Meg" Callaghan, a descriptive linguist working on Pama-Nyungan and Tangkic lexicography (fieldwork base: Fitzroy Crossing and Cape York). For this batch I worked from the primary reference set for each subgroup: R.M.W. Dixon, *The Dyirbal Language of North Queensland* (1972) for dbl; Cliff Goddard, *Pitjantjatjara/Yankunytjatjara to English Dictionary* (1996) for pjt/piu and the Western Desert cluster (mpj, wbt); Ken Hale, David Nash & the *Warlpiri Dictionary* project for wbp/wmt; John Henderson & Veronica Dobson, *Eastern and Central Arrernte to English Dictionary* (1994) for aer; Eirlys Richards & Joyce Hudson, *Walmajarri–English Dictionary with English Finderlist* (1990; 2nd ed. 2012, AuSIL interactive edition) for wmt; John Haviland, "Guugu Yimidhirr" in *Handbook of Australian Languages* vol. 1 (1979) for kky; Ken Hale & David Nash on Damin (Lardil auxiliary register) for lbz_damin; and the AIATSIS Austlang holdings for the smaller/fragmentary varieties (olg, xul, nha, adt). Pronoun, numeral, and "name" cells came out overwhelmingly clean (the Western Desert `ngayu(lu)/nyuntu/kujarra/yini` paradigm and the Arrernte `ayenge/unte/atherre` set are all correct). Two "star" cells are genuine errors and are documented below.

## Issues found

### 1. `wmt` — star — headword means "foot", not "star"
- **File:** `words/star.js` — code `wmt`
- **Current:** ["jina","ɟina"]
- **Expected:** ["wirl","wiɭ"]
- **Why:** In Walmajarri `jina` is the reflex of the widespread Ngumpin-Yapa/Western Desert root for **foot/footprint/track**, not "star". Richards & Hudson's *Walmajarri–English Dictionary* (AuSIL interactive edition, entry e-list) gives `jina` (variant `jarrkampirri`) nom. "foot; footprint; track" (example *Marrki man tarrpartawu jina* "You must hang on to its foot carefully"). The English finderlist maps **"star" → `wirl`** (nom. "star", dialectal variants `kiki` [E, M], `larn` [J, N], `pitany`). Corrected to the main headword `wirl`, IPA /wiɭ/ (final `rl` = retroflex lateral approximant).

### 2. `kky` — star — impossible palatal transcription of the dental digraph ⟨dh⟩
- **File:** `words/star.js` — code `kky`
- **Current:** ["biidhi","biːɟi"]
- **Expected:** ["biidhi","biːt̪i"]
- **Why:** Guugu Yimithirr writes its **palatal** stop as ⟨dy⟩ (= /ɟ/) and its **lamino-dental** stop as ⟨dh⟩ (= /d̪/~/t̪/); the two are distinct series (Haviland 1979). The orthographic form `biidhi` therefore contains a dental stop and must be /biːt̪i/, never the palatal /biːɟi/ — GY does not front ⟨dh⟩ to a palatal. This is internally confirmed by the corpus's own `kky` numeral `gudhirra → kut̪ira`, where the same ⟨dh⟩ is (correctly) rendered /t̪/. Only the IPA is wrong; the native-orthography form is retained.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
