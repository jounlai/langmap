# Review 601 — character readings across the new words, Sinitic rows (2026-10-25)

Detector ~/langmap-work/rev1025/charcons.js: for every Sinitic row, every
character that appears in two or more cells (cells whose character count equals
the syllable count), where at least one cell is a word added since 2026-10-11,
listing different segmental readings.

Fixed:
- nan japan 日本 dʑit → lit (the row writes the j- initial as l: 人 laŋ, 你 li, 日頭 lit).
- hsn dragonfly 洋咪咪 iæn → ian (MCPDict 長沙 洋 iã2; the row writes ã as an, 洋芋头 ian).
- hak_cn tomorrow 天光日 kuɔŋ → kuoŋ (MCPDict 梅縣 光 kuoŋ1; the row's 月光 kuoŋ).

Checked, real (no change): literary/colloquial pairs (nan_te/nan_pn/nan_qz/nan_ph
一 it/tsit, yue_ts 星 ɬen/ɬiaŋ, nan 馬 be/ma, nan 母 bo/bu), different morphemes
(wuu_nb/wuu_jh 朝 zhāo/cháo, wuu_nb 阿), Hokkien 仔 liaison a/ma, Wu 日 literary
zəʔ vs colloquial ɲiɪʔ, cdo 塗 tu/tʰu (MCPDict lists both; the ladybird cell
cites Feng 1998), yue_ts 仔 tu/tuɔi (MCPDict tuɔi is the 'son' reading).

Open:
- nan 雞 ke (goosebumps) vs kue (turkey 火雞 he kue): the row mixes accents.
- zh_nj 花 xuɒ (ladybird, MCPDict 南京) vs xua (sunflower, 新南京): part of the
  zh_nj row-convention question (review 598).
- 53 tone-only differences (sandhi, neutral tone) not reviewed.
