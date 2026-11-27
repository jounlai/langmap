# Review 852 — cockroach from readers' comments; flagged existing cells

2026-11-27.

## Cockroach — readers' comments (Facebook)
Two readers wrote: Vietnamese 昆𧍴 con gián; Hakka vong cad 黃蚻, ki cad 蜞蚻.
- **Hakka 黃蚻:** already in hak_cn and hak_tw. Nothing to change.
- **vi_c Huế, vi_s Saigon:** gián added. Wiktionary gián gives [jaːŋ˦˧˥] for Huế and [jaːŋ˦˥] for Saigon, written here with the rows' own tone letters (˨˦ / ˧˥).
- **vi_nom:** 𧍴 added (zaːn˧˥). The Nôm subset font was re-cut from NomNaTong v5.18 to include it (60 codepoints). Unihan U+27374 gives kVietnamese "gián". It is an insect-radical character, as the reader wrote. Wiktionary's gián lists 間 諫 柬 𫋨 instead; 𫋨 has no Unihan reading. The classifier 昆 con is left out, as in the row's other animal cells (𧊉, 貓).
- **hak_hl Hailu: not added.** Wiktionary's 蟑螂 dialect table gives 蜞蚻 / 蜞蚻仔 for Zhudong (Hailu), matching the second comment. But no source I could read gives a Hailu reading for 蜞 or 蚻, and the row needs the IPA.

## Flagged existing cells (audit agent, every source reopened)
- **khq Koyra Chiini, 7 blanked:** cotton, elephant, lion, maize, honey, twenty, snake. They were cited "Heath via hantganbangime", but that lexibank list is Tondi Songway Kiini (Heath 2005), not Koyra Chiini. Its fish dè:sì, leaf kɔ̀wsí and knee kàŋgɛ̀ match ASJP's TSK list, not ASJP's Koyra Chiini list. Kept: louse (ASJP Koyra Chiini gani agrees) and foot (quoted from the grammar).
- **vai Vai:** blue "dsiron" removed. It was a lone Latin cell in a Vai-script row, and no Vai-script source exists. greece ꗤꗷꘋ is kept: CLDR's ꗥ is the nasal HEN, while CLDR's own Latin form is Hɛlɛŋ.
- **mkz Makasae:** three "—" placeholders filled from Correia 2011: cat bui, heart waboku, love ramiaka ("the single verb").
- **cja Western Cham:**
  - water: IPA fixed, ja → aia (Wiktionary aia, ABVD ea).
  - eat: spelling fixed to Wiktionary's حواء.
  - dog: **kept for now, doubtful.** Wiktionary, ABVD and ASJP all give sau, not أتحو. No source gives a Cham Jawi spelling, and the validator does not allow "—" for a core word in a living language.
  - Still unsourced: father أمآ. Mother "mai" also looks doubtful (ABVD gives măk/mek).
- **kjp Pwo Karen:**
  - mother: spelling fixed to the Pwo form မေါဝ်ႋ (Incubator); the IPA mʊ̄ already matched Kato.
  - night: now ကေမူႋဏာ kəmɯ̄nà (Kato no. 379 plus Incubator).
  - sun: **kept for now, doubtful.** Kato gives mɯ̄mé, not mu˧, but no Pwo spelling is attested, and the core-word rule keeps the cell.
  - Still to fix: red ဂီ and eye မဲာ် are S'gaw spellings; their IPA is correct.
- **mgo Metaʼ:** elephant ɨsən differs from Grollemund's ísə́n (first vowel and tones). Noted only.

Status: CLOSED
