# Wordmap review #276 — Americas (part 2) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Ellen Whitecloud-Marchetti, a descriptivist working on Siouan and Algonquian lexicography with a comparative interest in the Andean and Amazonian families. My core reference shelf for this review: for Siouan, Stephen Return Riggs' *A Dakota-English Dictionary* (1890/1992 reprint), John P. Williamson's *An English-Dakota Dictionary* (1902), and Jan Ullrich's *New Lakota Dictionary* (2011, LLC) — the last being indispensable precisely because it lets one hold Lakȟótiyapi and Dakȟótiyapi orthographies side by side. For the Eskimo-Aleut rows I lean on Michael Fortescue et al., *Comparative Eskimo Dictionary* (1994), Steven Jacobson's *Yup'ik Eskimo Dictionary* (2012), and Knut Bergsland's *Aleut Dictionary* (1994). For the Andean and Mesoamerican material I use Ullrich/Cusihuamán for Quechua, Cerrón-Palomino for Aymara, and the Mayan community dictionaries (ALMG/OKMA). Against these I checked all 47 rows for sense, script, and IPA plausibility; the great majority verify cleanly (e.g. Yup'ik *agyaq*, Iñupiaq *uvluġiaq*, K'iche' *chʼumil*, Lakota *wičháȟpi*, Wayuu *jolotsü*, Garifuna *waruguma* are all correct). The only genuine problems are a pair of Lakota forms that have been copied into the **Dakota (dak)** row.

## Issues found
### 1. `dak` — star — Lakota form in the Dakota row
- **File:** `words/star.js` — code `dak`
- **Current:** ["wičháȟpi","witʃʰáχpi"]
- **Expected:** ["wičaȟpi","witʃaχpi"]
- **Why:** The cell reproduces the Lakȟóta form verbatim (aspirated *čh*, high-pitch *á*, no nasal). Santee-Sisseton Dakota has the **unaspirated** affricate and a nasalized vowel: Riggs (1890) records *wicaŋḣpi* [witʃaŋχpi]; modern Dakȟóta Iápi (Sisseton-Wahpeton) writes *wicaȟpi*/*wičaȟpi*. Crucially, the corpus already commits this row to Santee orthography — it correctly gives two as *nųpa* (ogonek), not Lakota *núŋpa* — so leaving star as the aspirated, non-nasal Lakota *wičháȟpi* is an internal inconsistency, not a dialect choice. The aspiration contrast *č* vs *čh* is phonemic, so this is a wrong-script/wrong-segment error, not a spelling variant.

### 2. `dak` — name — Lakota aspirate in the Dakota row
- **File:** `words/name.js` — code `dak`
- **Current:** ["čhažé","tʃʰaʒé"]
- **Expected:** ["čažé","tʃaʒé"]
- **Why:** Same contamination. Lakȟóta *čhažé* has an aspirated initial affricate [tʃʰ]; Dakota has the plain affricate — Riggs (1890) records *caže* [tʃaʒe] and Williamson (1902) lists Dakota "name" = *caźe*. Given that the row is otherwise Santee (see *nųpa*), the aspirated Lakota *čhažé* is an error; the Dakota citation form is *čažé* [tʃaʒé].

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
