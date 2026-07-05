# Wordmap review #278 — Australian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Marrngu Kelly, a descriptive/historical linguist working on Pama-Nyungan and Tangkic languages, with fieldwork in the Western Desert and the southern Gulf. My desk references for this batch are: R. M. W. Dixon, *The Dyirbal Language of North Queensland* (1972) for Dyirbal; Cliff Goddard, *Pitjantjatjara/Yankunytjatjara to English Dictionary* (1996) and the IAD *Pintupi/Luritja Dictionary* (Hansen & Hansen) for the Wati/Western Desert set (mpj, pjt, piu, wbt); Ken Hale & David Nash's Warlpiri lexical files and *Damin and Lardil Phonology* (1997), plus the Warlpiri Dictionary Project, for wbp and the Damin men's register; Henderson & Dobson, *Eastern and Central Arrernte to English Dictionary* (1994) for Arrernte; Joyce Blevins, *Nhanda: An Aboriginal Language of Western Australia* (2001); the *Ngakulmungan Kangka Leman* Lardil dictionary and Ngakulmungan Kangka Leman/Klokeid for Lardil–Yangkaal (Tangkic); John Haviland's *Guugu Yimidhirr* sketch grammar (1979); Richards & Hudson's *Walmajarri Dictionary*; and Dorothy Tunbridge's *Flinders Ranges Dictionary* (1988) for Adnyamathanha. I checked orthography-to-IPA mappings against each language's own practical spelling conventions (laminal vs. apical vs. retroflex series being the usual trap).

## Issues found
### 1. `aer` — you — spurious retroflex nasal in 2sg pronoun
- **File:** `words/you.js` — code `aer`
- **Current:** ["unte","ˈuɳtə"]
- **Expected:** ["unte","ˈuntə"]
- **Why:** In Eastern/Central Arrernte practical orthography the retroflex series is written with a preceding *r* (⟨rnt⟩ = /ɳʈ/), while plain ⟨nt⟩ is the apico-alveolar cluster /nt/ (Henderson & Dobson 1994; Wilkins 1989). The 2sg pronoun is spelled ⟨unte⟩ with plain ⟨nt⟩, so the nasal is alveolar /n/, not retroflex /ɳ/. The transcription /ˈuɳtə/ therefore misassigns the segment to the retroflex series and should read /ˈuntə/ (Arrernte's only phonemic vowels being /a/ and /ə/, the ⟨u⟩ marks rounding on the schwa cluster).

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
