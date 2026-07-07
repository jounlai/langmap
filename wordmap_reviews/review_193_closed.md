# Wordmap review #193 — Americas (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Rosalind Naquahéma, an Americanist descriptive linguist specializing in Uto-Aztecan with a comparative practice across the North and South American isolates and families. My core references for this review are the Hopi Dictionary Project's *Hopìikwa Lavàytutuveni: A Hopi–English Dictionary of the Third Mesa Dialect* (Univ. of Arizona Press, 1998) and LaVerne Masayesva Jeanne's *Aspects of Hopi Grammar* (MIT, 1978) for Hopi phonology; Jean Charney (*A Grammar of Comanche*) and Tim Thornes (*A Northern Paiute Grammar*) for Numic; J. Richard Andrews and Frances Karttunen for Nahuatl; Antonio Cusihuamán for Southern Quechua; Karin Michelson (Oneida), Hanni Woodbury and Wallace Chafe (Onondaga/Seneca) for Northern Iroquoian; Terrence Kaufman and Victoria Bricker for Mayan; and Johannes Helmbrecht (*Hoocąk*) for Siouan. My focus this round was verifying that broad-IPA cells respect each language's actual vowel inventory rather than defaulting to Anglophone approximations.

## Issues found

### 1. `hop` — i — Hopi ⟨u⟩ is /ɨ/, not [ʊ]
- **File:** `words/i.js` — code `hop`
- **Current:** ["nuʼ","nʊʔ"]
- **Expected:** ["nuʼ","nɨʔ"]
- **Why:** Hopi orthographic ⟨u⟩ represents the high central **unrounded** vowel /ɨ/ (Hopi has no rounded /u/; historical *u > [ɨ] while *o was retained). The Hopi Dictionary (1998, front-matter pronunciation guide) defines ⟨u⟩ as "u pronounced with the lips unrounded"; Jeanne (1978) and Whorf transcribe [ɨ]. [ʊ] is rounded and back — wrong on both features. The corpus already uses [ɨ] for the exact cognate Numic barred-u in com/pao, so Hopi is an inconsistent outlier. Native spelling is correct; only the IPA vowel is wrong.

### 2. `hop` — you — Hopi ⟨u⟩ is /ɨ/, not [ʊ]
- **File:** `words/you.js` — code `hop`
- **Current:** ["um","ʔʊm"]
- **Expected:** ["um","ʔɨm"]
- **Why:** Same systematic error. The 2sg pronoun *um* has Hopi ⟨u⟩ = /ɨ/; broad IPA should be [ʔɨm] (Hopi Dictionary 1998; Jeanne 1978). [ʊ] misrepresents the vowel as rounded/back.

### 3. `hop` — name — Hopi ⟨u⟩ is /ɨ/, not [ʊ]
- **File:** `words/name.js` — code `hop`
- **Current:** ["tungwni","tʊŋwni"]
- **Expected:** ["tungwni","tɨŋwni"]
- **Why:** *tungwni* 'name' has the same /ɨ/ vowel; IPA should be [tɨŋwni] (Hopi Dictionary 1998, s.v. *tungwni*). The onset cluster and ⟨ngw⟩ are fine; the ⟨u⟩ = [ʊ] rendering is the error.

### 4. `hop` — star — Hopi ⟨u⟩ is /ɨ/, not [ʊ]
- **File:** `words/star.js` — code `hop`
- **Current:** ["sohu","soːhʊ"]
- **Expected:** ["sohu","soːhɨ"]
- **Why:** *soohu* 'star' ends in Hopi ⟨u⟩ = /ɨ/; broad IPA should be [soːhɨ] (Hopi Dictionary 1998, s.v. *soohu*). [ʊ] is again the wrong (rounded/back) vowel.

## Worker response (作業者)
Findings: 4 · applied 4 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
