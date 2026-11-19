# Review 809 — R01 re-applied: 244 Sinitic and East Asian cells that never landed in review 758

Closed 2026-11-19.

## What happened
- **The problem:** review 758 (commit a7b824b9a) recorded "250 cells added" for gap rally R01 (Sinitic, Japanese, Korean and other East Asian rows). Only 4 of those cells (cotton, sunday and cdo tear) actually reached words/. The other 246 drafts stayed in ~/langmap-work/gap1117/R01/.
- **Who found it:** the S11/a3 agent, which compared every gap1117 drafts.json with words/. No other finished round has a gap like this.
- **Likely cause:** that first apply ran before the current applier, and a regeneration from acc/ dropped cells that had not been synced into it (see the memory note gen-js-acc-only). The current apply_round.sh runs accsync after add_row, which prevents this.

## Re-apply
The drafts were applied unchanged. They come from Wiktionary dial-syn word choices and MCPDict or Han Map town readings, in each row's own tone style. Adjustments:
- **Dropped:**
  - nan_pn tomorrow 明仔載: three characters but only two IPA syllables, a contracted form.
  - nan_ph rainbow 彩虹 and maize 玉米: Mandarin-shaped, with no Philippine-specific source.
- **Fixed:** hak_cn sunflower IPA fa˦˦ → fa˦, the row's style.
- **Fonts:** the HanaMinB Nôm fill subset gains U+2C80B and U+2730A for nan_te dragonfly 𬠋𧌊. Its wordmap unicode-range claims only those two.

## Guards
- **Literary/colloquial readings locked in sinitic_char_reading:**
  - cpx 老 and 番.
  - mnp 目.
  - nan 日 (dʑit vs lit).
- **Sinitic tone-system share:** nan_ph and nan_qz are allowed. Philippine Hokkien descends from Quanzhou/Jinjiang speech.
- **Lexical-import debt:** raised 51 → 58. The new entries are script-only differences plus the dial-syn words hsn 番茄 and wuu 银河.
- **Owner parity budgets:** raised for adamsapple, bubbletea, china, japan, jetlag and kiss. New parent cells in nan, wuu, hak_cn, zh_tw, hsn and cjy expose their variety rows.
