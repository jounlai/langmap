# Review 874 — rows written in two scripts or two spellings

2026-11-28. Follows review 873. The rows that tools/script_consistency_check.js reports as "partially converted", plus two spelling mixes found in reviews 869 and 872.

## Not defects
- **Luwian:** hieroglyphs where a spelling is published, transliteration otherwise, as the row's description says.
- **Sogdian:** γ, δ and β are standard letters of Sogdian transliteration.
- **Coptic:** ϣ ϥ ϫ ϯ are Coptic letters encoded in the Greek block.

## Fixed
- **Badaga** (Latin row, 4 cells in Tamil script):
  - rice akki: Wiktionary அக்கி, Hockings 1992 p. 4.
  - money ɦəɳə: Linguistic Survey of India, Tamil Nadu, Badaga chapter p. 136.
  - iron and earth removed: no Latin-script source.
- **Hajong** (Latin row in the Hajong–English Phrase Book spelling, 6 cells in Bengali script):
  - four câr and thousand hajar: Omniglot, and Wiktionary tr=.
  - moon can and rice câl: Wiktionary tr=.
  - earth and cuckoo removed: no Latin source.
  - The row's script filter is now Latin only, since every cell is Latin.
- **Itelmen:**
  - island and thanks used ԓ, while the row's other 16 cells use ӆ, which most Itelmen publications use for /ɬ/ (Wikipedia, Itelmen language). Both are now ӆ.
  - The labialisation sign in island is now ˚ (it was a degree sign °).
  - Chukchi keeps ԓ, its own letter.
- **Fijian weekdays:** Tuesday to Saturday now write "siga …" in lower case, as Wiktionary's translations and the row's Monday do; Sunday stays Siga Tabu, as in the source.

## Held for review 875
- **Aleut:** 66 cells in Cyrillic, 18 in Latin. The Cyrillic cells have no per-cell sources, and their spelling matches no published Aleut orthography:
  - they use х̆/к̆/г̆ and double vowels;
  - Golovko's Russian-side spelling uses ӽ/ӄ/ӷ and macrons;
  - the 19th-century spelling uses х̑/г̑.
  - They mirror NorthEuraLex's Latin (Bergsland) form for form, so they were transliterated.
  - Adding Golovko's forms would leave two Cyrillic spellings in one row. The row is rebuilt in sourced Latin in review 875 instead.

CLOSED.
