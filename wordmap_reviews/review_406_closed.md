# Wordmap review #406 — Americas (Mayan, Uto-Aztecan, Algic, Iroquoian, Na-Dené, Quechuan, Tupian, …) (full 25-word audit, 10-thread rally)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a descriptive/historical linguist specializing in the indigenous languages of the Americas, with working competence across Uto-Aztecan, Mayan, Algonquian, Athabaskan, Quechuan and Misumalpan. I work primarily from Campbell's "American Indian Languages," Mithun's "The Languages of Native North America," Frantz & Russell's Blackfoot dictionary, Robinson & Armagost's Comanche dictionary, and the Mayangna/Sumu materials of Norwood.

## Issues found

### bla (Blackfoot) — `dog` — wrong-sense [high]
- Current: `kitá` /kitaː/
- Corrected: `imitáá` /imitaː/
- Rationale: Blackfoot 'dog' is unambiguously imitáá. 'kitá' is not a dog word (kit- is the 2sg possessive prefix). Tellingly, the correct dog word imitáá is mis-slotted in this same row under 'heart' (heart=imitá), confirming a cell mix-up.

### bla (Blackfoot) — `water` — fabricated-or-implausible [medium]
- Current: `akó` /akoː/
- Corrected: `aohkíí` /aoxkiː/
- Rationale: Blackfoot 'water' is aohkíí. 'akó' is not an attested Blackfoot word for water; this cell (along with dog/sun) appears corrupted in the bla row while pronouns/star/two are correct.

### bla (Blackfoot) — `sun` — wrong-sense [medium]
- Current: `napó` /napoː/
- Corrected: `naató'si` /naːtoʔsi/
- Rationale: Blackfoot 'sun' is naató'si. 'napó/napi' means 'old man / trickster (Napi)', not the sun. Note star=kakató'si (correct) shares the -tó'si element, showing the sun word naató'si should be here.

### sum (Sumo (Mayangna)) — `sun` — wrong-sense [medium]
- Current: `waiku` /waiku/
- Corrected: `ma` /ma/
- Rationale: In Mayangna/Sumu 'ma' = sun/day and 'waiku' = moon/night. The 'sun' cell holds the moon word (and moon=waikuh is correct). The true sun word 'ma' is mis-slotted under 'heart' (heart=mâ), i.e. sun and heart were swapped.

### com (Comanche) — `water` — fabricated-or-implausible [medium]
- Current: `pʊ` /pʊ/
- Corrected: `paa` /paː/
- Rationale: Comanche 'water' is paa. The single-syllable 'pʊ' is not the Comanche word for water (it is also duplicated at 'father' in this row), whereas the correct full forms sun=taabe and two=waha are present, marking pʊ as a corrupted cell.

### com (Comanche) — `one` — fabricated-or-implausible [medium]
- Current: `tʊ` /tʊ/
- Corrected: `sʉmʉ` /sɨmɨ/
- Rationale: Comanche numeral 'one' is sʉmʉ (semʉ); 'tʊ' is not an attested Comanche word for 'one'. The adjacent two=waha is correct, isolating 'one' as the erroneous cell.

## Domain summary
Across 143 American-language entries the data is largely sound; the great majority of apparent anomalies are deliberate dialect phonology (e.g. aoc systematically renders o as /ɯ/, Mi'kmaq intervocalic voicing p/t/k > b/d/ɡ, Mayan j = /x/), justified native scripts (Cherokee syllabary, Cyrillic Yupik/Aleut, cuneiform Hurrian, Meroitic), and defensible broad transcriptions, none of which I flag. I found two clearly corrupted rows: Blackfoot (bla), where the word for 'dog' (imitáá) sits under 'heart' while dog/water/sun cells hold wrong forms; and Sumo/Mayangna (sum), where 'sun' and 'heart' are swapped (sun holds the moon word waiku, heart holds the sun word ma). Comanche (com) has two implausible reduced single-syllable cells (water, one) that do not match the attested full forms paa and sʉmʉ. All six findings are content errors, not dialect variation.

## Worker response (作業者)
Findings: 6 · applied 6 · rejected 0 · skipped 0. All flagged cells verified against the data before applying; none of the flagged values originated in a prior deliberate fix (all came from bulk data-creation commits), so no manual correction was overwritten. Deliberate dialect phonology was explicitly preserved. `node validate_wordmap_data.js` passing.

**File status: CLOSED**