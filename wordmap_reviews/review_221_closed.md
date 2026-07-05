# Wordmap review #221 — Pidgins & creoles (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Marisol Aventurin, a descriptive creolist working across the Atlantic and Pacific contact-language zones. My working references for this batch are: for the English-lexified Atlantic creoles, Cassidy & Le Page's *Dictionary of Jamaican English* together with the Jamaican Language Unit's Cassidy/JLU orthography (*Di Jamiekan Nyuu Testament*), the *Belize Kriol–Inglish Dikshineri* (Belize Kriol Project/Crosbie et al.), Wilner's *Wortubuku fu Sranan Tongo* (SIL), Huttar & Huttar's *Ndyuka* (Routledge Descriptive Grammars) and Bakker/Smith/Veenstra on the Surinamese maroon creoles, and Faraclas's *Nigerian Pidgin*; for the French-lexified group, Valdman's Haitian materials, Baker & Corne / *Diksioner Morisien* (Carpooran) for the Indian-Ocean creoles, and the GEREC tradition for the Lesser Antilles; for the Iberian-lexified creoles, Kihm on Kriol, Quint/Lang on Cape Verdean, and Kouwenberg & Muysken / Maurer on Papiamentu; and for the Pacific, Verhaar and Smith on Tok Pisin, Crowley on Bislama, and Jourdan on Solomon Islands Pijin, plus *APiCS Online* (Michaelis, Maurer, Haspelmath & Huber 2013) as a cross-check on pronoun and numeral forms. My review focuses on sense integrity (avoiding honorific/plural pronouns, ordinals, verbs), correct community orthography, and — crucially for this language group — the rhoticity of the broad IPA, since coda /r/ behavior sharply distinguishes these creoles.

## Issues found
### 1. `jam` — star — non-rhotic IPA carries a spurious /r/
- **File:** `words/star.js` — code `jam`
- **Current:** ["staar","staːr"]
- **Expected:** ["staar","staː"]
- **Why:** Jamaican Patois is non-rhotic after back vowels: historical coda /r/ is lost with compensatory lengthening, which is exactly what the Cassidy/JLU spelling `staar` (double-⟨a⟩ = long low vowel, **no** ⟨r⟩) encodes. The citation pronunciation in the *Dictionary of Jamaican English* and JLU materials is [staː], not [staːr]. The transcribed /r/ contradicts both the orthography given in the same cell and Jamaican phonology (cf. `bah` "star" correctly = /staː/, `kri` = /staː/, and the Melanesian set `tpi/bi/pis/tcs` "sta" all non-rhotic). Contrast `bzj` `staar` /staːr/, which is correct because Belize Kriol is rhotic. Fix the IPA only; the orthography `staar` is correct.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
