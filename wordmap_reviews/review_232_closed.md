# Wordmap review #232 — Uralic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aleks Terhonen, a descriptive/historical Uralicist working across the Finnic, Sámi, Permic, Mari, Mordvinic, Ugric and Samoyedic branches. For this pass I relied on: Sammallahti, *The Saami Languages: An Introduction* (1998) and his *Sámi–suoma sátnegirji*; Viitso & Ernštreits, *Līvõkīel-ēstikīel-lețkīel sõnārōntõz* (Livonian–Estonian–Latvian dictionary, 2012); the *Suomen sanojen alkuperä* (SSA) etymological dictionary; Zaicz (ed.) *Etimológiai szótár* for Hungarian; Bartens' grammars of the Permic and Mordvinic languages; Salminen's work on Tundra Nenets and Wagner-Nagy's *Grammar of Nganasan* (2019); and Abondolo (ed.) *The Uralic Languages* (1998) for cross-branch checks. Reconstructed proto-forms (e.g. Finnic *tähti, *nimi; PU *mun(V), *ti(n)) were used to sanity-check the modern reflexes.

## Issues found

### 1. `liv` — star — wrong final segment (velar g for palatal ḑ)
- **File:** `words/star.js` — code `liv`
- **Current:** ["tēg","teːɡ"]
- **Expected:** ["tēḑ","teːdʲ"]
- **Why:** Courland Livonian "star" is **tēḑ**, the regular reflex of Finnic *tähti (cf. Est. *täht*, Fin. *tähti*): the medial cluster reduced and the palatal *-ti yielded the palatalized dental ḑ /dʲ/, not a velar stop. Viitso & Ernštreits (2012) and standard Livonian lexicography give tēḑ; a word *tēg* with final /ɡ/ is unattested. The orthographic ⟨ḑ⟩ has evidently been misread/typed as ⟨g⟩, and the IPA /teːɡ/ was propagated from that. Correct to tēḑ /teːdʲ/.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

Reviewer note (not encodable as a word-cell correction, flagged for the maintainer): `squ` (Squamish) and `tsi` (Coast Tsimshian) carry Uralic/"Saami, Eastern" family tags but are Salishan and Tsimshianic respectively — out of the Uralic domain and misclassified; their word cells were not adjudicated here and should be routed to the appropriate reviewer. All remaining Uralic cells (Finnic, Sámi, Permic, Mari, Mordvinic, Ob-Ugric, Samoyedic) were verified correct in sense, script and IPA.

**File status: CLOSED**
