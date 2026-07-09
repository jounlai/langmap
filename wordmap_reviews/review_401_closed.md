# Wordmap review #401 — Austronesian (full 25-word audit, 10-thread rally)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a descriptive linguist specializing in the Austronesian family (Malayo-Polynesian, Formosan, Oceanic and Micronesian branches), working from the Austronesian Comparative Dictionary (Blust & Trussel), Tryon's Comparative Austronesian Dictionary, and regional lexicons (Wolff for Cebuano, Pukui-Elbert for Hawaiian, Milner for Samoan, and Indonesian-vernacular kamus for Sumatran languages). My review privileges verified lexical sources over intuition, and I treat systematic dialect phonology in this dataset as intentional rather than erroneous.

## Issues found

### gay (Gayo) — `sun` — fabricated-or-implausible [medium]
- Current: `matacana` /matatʃana/
- Corrected: `matanlo` /matanlo/
- Rationale: 'matacana' is not an identifiable Gayo form; the Gayo dictionary gives sun/matahari as 'matanlo' (literally 'eye of day', from lo = day, which the entry's own moon/other cells presuppose). 'cana' is not a Gayo morpheme.

### gay (Gayo) — `thanks` — copied-from-other-language [medium]
- Current: `matur sangat` /matuɾ saŋat/
- Corrected: `berejen` /bərədʒən/
- Rationale: 'matur' is the Javanese respectful verb 'to say' (as in Javanese 'matur nuwun'); it is not Gayo, and 'matur sangat' is not even well-formed Javanese. Gayo 'thank you' is 'berejen' (also cited 'berijin') per the Gayo–Indonesian dictionary.

### nia (Nias) — `drink` — wrong-sense [medium]
- Current: `banua` /banua/
- Corrected: `badu` /badu/
- Rationale: Nias 'banua' means sky/heaven/rain/village, not 'to drink'. The Nias dictionary gives the verb 'badu' (badu nidanö = 'drink water'). The rest of this row is accurate (eye=hörö, water=idanö), so this cell is a wrong-sense slot error.

## Domain summary
Reviewed all 99 Austronesian entries. The data is largely accurate and deliberately encodes dialect-specific phonology (e.g. Manado/North Moluccan Malay 'kita'=I, Tausug 'kayu'=fire, Fijian prenasalized stops, Sabahan a>o vowel shifts, Chamic implosives), which I did not flag. Three cells failed verification against dictionary sources, all in lesser-documented Indonesian-region languages: Gayo 'sun' (implausible 'matacana' vs attested 'matanlo'), Gayo 'thanks' (Javanese contamination 'matur' vs Gayo 'berejen'), and Nias 'drink' (wrong sense — 'banua' = sky/rain, not the verb 'badu'). I omitted several low-confidence suspicions (e.g. Rotuman name/sun homophony 'asa', Yapese star/love 'tʼuf') because they are plausibly genuine and I could not supply a confident correction. The well-known major languages were clean.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. All flagged cells verified against the data before applying; none of the flagged values originated in a prior deliberate fix (all came from bulk data-creation commits), so no manual correction was overwritten. Deliberate dialect phonology was explicitly preserved. `node validate_wordmap_data.js` passing.

**File status: CLOSED**