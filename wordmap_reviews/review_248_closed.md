# Wordmap review #248 — Indo-Iranian (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Anjali Raghunathan, a descriptive/historical linguist working on New Indo-Aryan and West/East Iranian phonology and morphology. For this review I lean on Colin Masica, *The Indo-Aryan Languages* (Cambridge, 1991) and R. L. Turner, *A Comparative Dictionary of the Indo-Aryan Languages* (CDIAL) for the Indo-Aryan cognate sets; Grierson's *Linguistic Survey of India* for the Pahari, Rajasthani, Dardic and Bihari lects; Gerhard Neukom & Manideepa Patnaik, *A Grammar of Oriya* (2003) for Odia phonology; Ashok Kelkar and the Deccan College materials for Marathi/Konkani; George Cardona & Dhanesh Jain (eds.), *The Indo-Aryan Languages* (Routledge) for Sanskrit/Pali and modern standards; and Gernot Windfuhr (ed.), *The Iranian Languages* (Routledge, 2009) together with Fritz Wolff's *Glossar zu Firdosis Schahname* and Georg Morgenstierne for Persian, Luri, Balochi, Pashto, Khowar and Ossetic. Transcriptions are checked against these against a broad-IPA convention (dental stops marked t̪/d̪, [ʋ] for व/v-graphemes, [ɽ]/[ɹ] where phonemically relevant), with nasalization admitted only where the orthography (anunāsika/candrabindu) or a phonemic nasal vowel warrants it.

## Issues found

### 1. `or` — name — spurious vowel nasalization in Odia *nāma*
- **File:** `words/name.js` — code `or`
- **Current:** ["ନାମ","nãmɔ"]
- **Expected:** ["ନାମ","namɔ"]
- **Why:** Odia ନାମ 'name' (< Skt. *nāman-*, CDIAL 7067) has a fully **oral** first vowel; there is no anunāsika/candrabindu on the grapheme and no phonemic nasal vowel here (Neukom & Patnaik 2003, §2 on Oriya vowels). The tilde on the vowel is unmotivated — contrast this reviewer's own correctly-nasalized Odia 1sg ମୁଁ *muṃ* → [mũ], which *does* carry candrabindu. The word is [namɔ] (final Odia short vowel realized [ɔ]), matching the short-vowel style already used in the domain's star cell ତାରା /taɾa/. The orthography is correct; only the IPA needs the nasal mark removed.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fix applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
