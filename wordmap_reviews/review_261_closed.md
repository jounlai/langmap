# Wordmap review #261 — Papuan (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Halvard Reim, a descriptive linguist working on the Trans-New Guinea and Sepik phyla, with fieldwork ties to the Kainantu-Goroka and Engan sub-branches. For this review I lean on Andrew Pawley & Jonathan Lane's *A Dictionary of Kalam with Ethnographic Notes* (2011) for kmh; Alan Rule's *Statements on the Phonology and Grammar of the Huli Language* for hui and the Engan comparanda; H. Renck's *A Grammar of Yagaria* (PL B-40, 1975) and *Yagaria Dictionary* (1977) for ygr and the wider East-Central family; the SIL Kainantu-Goroka survey materials and grammar sketches (Kanite, Kamano-Kafe) for kmu; Juliette Huber's *A Grammar of Makasae* (2011) for mkz; and, for the Muskogean control set (Muskogean is outside my primary phylum but included in the assignment), Munro & Willmond's *Chickasaw: An Analytical Dictionary* and Martin & Mauldin's *Dictionary of Creek/Muskogee*. My review target is genuine sense/form/script errors; I have deliberately left cells I cannot positively falsify, since over-correction of sparsely documented Papuan micro-lects is worse than a conservative pass.

## Issues found
### 1. `kmu` — i — bound prefix given where an independent pronoun is expected
- **File:** `words/i.js` — code `kmu`
- **Current:** ["na","na"]
- **Expected:** ["nagaya","naɡaja"]
- **Why:** In the Kainantu-Goroka languages the independent (free/emphatic) 1/2/3sg pronouns form a tight paradigm in *-gaya*: Kanite **nagaya** 'I', **kagaya** 'you', **agaya** 'he/she'. The cell for `you` in this same language is correctly the full independent form `kagaya` [kaɡaja], so the `i` cell must be the parallel independent form **nagaya** [naɡaja], not the bare subject prefix **na-**. As given, the row mixes a bound clitic (`na`) with a free pronoun (`kagaya`) — an internal inconsistency; the independent 1sg is the standard citation form (cf. Kamano-Kafe *nagaʼ/nagaya* : *kagaʼ/kagaya*). Correcting to `nagaya` restores the na-/ka-/a- ~ nagaya/kagaya/agaya symmetry.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
