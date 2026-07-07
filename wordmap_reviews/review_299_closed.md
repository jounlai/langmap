# Wordmap review #299 — Other / unclassified (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Ravdna Sørensen, a descriptive linguist working on Paleosiberian isolates and Central American Misumalpan languages, i.e. exactly the grab-bag of "Other / unclassified" families that resist a single areal specialist. For the Yukaghir pair I rely on Elena Maslova's *A Grammar of Kolyma Yukaghir* (2003), Irina Nikolaeva's *A Historical Dictionary of Yukaghir* (2006), G. N. Kurilov's *Юкагирско-русский словарь* (Tundra Yukaghir), and the Spronck/Nagasaki *Online Kolyma Yukaghir Documentation* (sgr.fi). For Misumalpan I use Thomas Green's *A Lexicographic Study of Ulwa* (1999), Ken Hale's Ulwa/Sumu field materials, McCarthy & Prince's (1990) analysis of Ulwa possessive infixation (the locus classicus for *papangh* 'father'), and the Panamahka Mayangna dictionary tradition (McLean / Benedicto). For the remaining Athabaskan, Chukotko-Kamchatkan, Yeniseian, Tuu/Kx'a, Songhai, Otomanguean, Algic and Amazonian cells I cross-checked against the standard reference grammars and lexica for each family; only genuinely diagnosable errors are reported below.

## Issues found

### 1. `sum` — name — wrong sense: 'father' given for 'name'
- **File:** `words/name.js` — code `sum`
- **Current:** ["papangh","papaŋ"]
- **Expected:** ["pani","paˈni"]
- **Why:** In Mayangna/Sumu *papang(h)* is the well-attested kinship term **'father'**, not 'name' — it is the canonical Ulwa/Sumu example in McCarthy & Prince (1990) on possessive infixation (*papangh* → *pa‹ka›pangh* 'his father'), it heads the Mayangna Bible title *Papang Yulni* ('the Father's Word'), and the Panamahka/Tawahka comparative tables gloss it 'father'. The noun for 'name' (appellation) in the Panamahka dictionary tradition is *pani*. This is a straightforward father→name sense confusion.

### 2. `yux` — name — unrelated word for 'name'
- **File:** `words/name.js` — code `yux`
- **Current:** ["хэлаҥ","xelaŋ"]
- **Expected:** ["ню","nʲuː"]
- **Why:** The Online Kolyma Yukaghir Documentation (sgr.fi, English→Yukaghir index) lists 'name' as the stem *n'u:* /nʲuː/, reflecting Proto-Yukaghir *\*nʲū* 'name' (Nikolaeva 2006). The cell's *хэлаҥ* is not the Kolyma Yukaghir word for 'name'; the palatalised-nasal reflex *n'u:*/нью is required.

### 3. `ykg` — name — unrelated word for 'name'
- **File:** `words/name.js` — code `ykg`
- **Current:** ["хэлаҥ","xelaŋ"]
- **Expected:** ["нюмэ","nʲumə"]
- **Why:** Tundra Yukaghir 'name' continues the same Proto-Yukaghir *\*nʲū* root, appearing in Kurilov's dictionary as *нюмэ* /nʲumə/ (with the northern -mə extension), cognate with Kolyma *n'u:* (Nikolaeva 2006). *хэлаҥ* — identical to the (also erroneous) Kolyma cell — is not the word for 'name' and appears to be a copy-error shared across both Yukaghir rows.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
