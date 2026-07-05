# Wordmap review #298 — Oceanic & Polynesian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Vaitea Manutahi, a descriptive/historical linguist of the Oceanic subgroup with a focus on Nuclear Polynesian and Micronesian. My working references for this review are: Pukui & Elbert, *Hawaiian Dictionary* (1986); H. W. Williams, *A Dictionary of the Maori Language* (7th ed.); C. M. Churchward, *Tongan Dictionary* (1959) and *Tongan Grammar*; G. B. Milner, *Samoan Dictionary* (1966); the POLLEX-Online *Polynesian Lexicon Project* (Greenhill & Clark) for the reflexes of PPn \*au, \*koe, \*rua, \*hiŋoa, \*fetuʔu; Biggs & Clark for Rarotongan/Tuamotuan; Abo, Bender, Capelle & DeBrum, *Marshallese-English Dictionary*; Rehg & Sohl, *Ponapean-English Dictionary*; Sohn & Tawerilmang, *Woleaian Reference Grammar*; Jensen, *Yapese Reference Grammar*; Topping, *Chamorro-English Dictionary*; and Blust & Trussel's *Austronesian Comparative Dictionary* for the western Malayo-Polynesian and Chamic material. For Sundanese/Javanese orthography-to-phonology mapping I rely on Müller-Gotama and Robins' Sundanese phonology, and Zoetmulder's *Old Javanese-English Dictionary*.

## Issues found

### 1. `osu` — star — Sundanese `é` mistranscribed as the *eu* vowel
- **File:** `words/star.js` — code `osu`
- **Current:** ["béntang","bɤntaŋ"]
- **Expected:** ["béntang","bentaŋ"]
- **Why:** In Sundanese romanization the vowel graphemes are strictly distinguished: `e` = /ə/, `é` = /e/ (close-mid front unrounded), and `eu` = /ɤ/ (close-mid back/central unrounded). The given orthography `béntang` carries the acute-marked `é`, which denotes /e/, so the first vowel is [e] and the word is [ˈbentaŋ]. The current IPA [bɤntaŋ] uses [ɤ], i.e. the *eu* vowel — that transcription would correspond to a spelling `beuntang`, not to `béntang`. The orthography and IPA are internally inconsistent; the vowel quality must be corrected to [e] to match the acute-accented spelling actually given.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
