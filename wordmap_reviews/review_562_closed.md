# Review 562 — round 83: the last never-audited rows

Closed 2026-10-12. Ten agents, ~100 rows that no audit round had read.
After this round every Word Map row has been through at least one
whole-row check. Working files: ~/langmap-work/r83/.

## Result

1,035 cells corrected (1,009 FIX + 26 RFIX), 21 emptied with a record.
Worst rows: abq 34 (Abkhaz letters ҳ ҵ ҩ and Abkhaz forms in Abaza), atj 30
(Cree words in Atikamekw), adt 30, mgo 30, kfa 29, olk 24, ktz 22, drs 22
(Sidamo words in Gedeo), kry 21, kwk 20, thp 20, mcf 20, pqm 19, kpy 16
(Chukchi letter ԓ and words in Koryak), gld 15, ude 14, chp 14, wmt 14
(Warlpiri words), ko_jeju 11, kxv 12 (Telugu/Kannada words). Hadza "eye"
held the word for "not"; Kera "night" was "day".
Sinitic/Korean loan-spelling check (the sushi case): zh_tw 3 fixes,
ko_jeju 11, nan_xm fire 火 he (hue is Zhangzhou); nan_xm 寿司 siu su kept
(the characters do read so). Clean or nearly: xav nan_ph mmd mlm clk tob
mbc kpj cag mkz mixtec.

## Hand-made decisions

- Bats (bbl): ʼ (ჰʼ ħ, ცʼ tsʼ) and ʻ (ლʻ ɬ) are two letters — apostrophe
  check ALLOW; a mistaken unification was reverted.
- Inari Sámi y is a vowel (kyeli /kyeli/): glide check exemption.
- ACCEPTED shared forms: enf eye/heart (sɛj/sæj, transliteration merges
  them), mgo bone/foot (NT). mcf mouth = tongue "ana": tongue is NT-
  sourced, the mouth cell is unverified — OPEN.
- wbt meta written by hand (its line uses "meta ={", which the post-round
  script missed); blc blue/coffee applied as RFIX.
