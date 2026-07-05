# Wordmap review #295 — Niger-Congo (non-Bantu) (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Ọláwálé Adéṣínà, a descriptive/comparative linguist of West African languages (Volta-Niger, Kwa, Mande, Atlantic, and Cross River). My working references for this review are Abraham's *Dictionary of Modern Yoruba* and Awóbùlúyì's *Ẹ̀kọ́ Gírámà Èdè Yorùbá* for Yoruboid; Williamson & Blench for the Benue-Congo/Edoid comparanda; Goldie's *Dictionary of the Efik Language* and Cook's *Efik grammar*, plus Essien's *Grammar of the Ibibio Language* and Urua's Ibibio phonology for the Lower Cross data; Welmers' *Grammar of Vai* and *African Language Structures* for Mande; Christaller and the *Twi* tradition for Akan; Westermann for Ewe/Gbe; and the *A Grammar of Wolof* tradition (Church, Ka) for the Atlantic set. Tone systems, ATR/tenseness of the "dotted" vowels, and phonemic vs. allophonic nasality are my main diagnostics below.

## Issues found

### 1. `yo` — i — spurious phonemic nasal vowel in "èmi"
- **File:** `words/i.js` — code `yo`
- **Current:** ["èmi","èmĩ"]
- **Expected:** ["èmi","èmi"]
- **Why:** In Yoruba orthography a nasal vowel is written with a following ⟨n⟩ (e.g. *inú* [ĩ], *ẹ̀kún*). The emphatic 1sg pronoun is spelled ⟨èmi⟩ with a plain ⟨i⟩, i.e. the oral phoneme /i/. Transcribing the final vowel as /ĩ/ asserts the *nasal* phoneme, which contrasts phonemically in Yoruba and is not present here. Post-nasal light nasalization after /m/ is at most sub-phonemic and is not marked elsewhere in this corpus (cf. Igbo `mʊ`, Akan `mɪ̀`, Ewe `ɲɛ`). Broad IPA should read /èmi/ (Abraham 1958; Awóbùlúyì).

### 2. `efi` — name — wrong quality for the dotted vowel ⟨ị⟩
- **File:** `words/name.js` — code `efi`
- **Current:** ["enyịn̄","ɛˈɲiŋ"]
- **Expected:** ["enyịn̄","ɛˈɲɪŋ"]
- **Why:** In Efik orthography the sub-dotted ⟨ị⟩ represents the lax/[-ATR] vowel /ɪ/, not tense /i/ (Goldie; Cook). The word *enyịn̄* 'name' therefore has /ɪ/: /ɛˈɲɪŋ/. The parallel Ibibio entry (`ibb`, same etymon *enyịñ*) is correctly given as /ɛɲɪŋ/ with /ɪ/; the Efik cell is internally inconsistent with both its own orthography and the cognate. Corrected to /ɛˈɲɪŋ/.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
