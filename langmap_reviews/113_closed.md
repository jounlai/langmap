# LangMap データレビュー #113 — rally 2026-11-14 round 2 (nan wuu hak_cn cdo zh_song zh_tang zh_han bo my ii vi vi_c vi_s vi_nom km th th_isan th_n th_s lo za hmn id)

Reviewer drafts: ~/langmap-work/rally1114/r02/a1 (lm_fix.json, 212: orthography 99, translation 63, role 26, segment 24).

## Applied (212)
- lo (63): Thai written in Lao letters — ພູດ 'spray water' → ເວົ້າ 'speak', ລ້ານ 'million' → ຮ້ານ 'shop', ກີ່ 'loom' →
  ຈັກໂມງ 'what time', ມາກ → ຫຼາຍ, ອລ່ອຍ → ແຊບ, Thai pronouns ເທອ/ຄຸນ/ເລາ → ລາວ/ເຈົ້າ/ເຮົາ, ຊອບ → ມັກ, ດູ → ເບິ່ງ, ສຸນັຂ → ໝາ …
  (Wiktionary Lao); role swaps #2 #9, #34.
- Thai family: #2 A/B swapped in all four rows; th_n/th_s role slips (#31 #49 #54 #55 #82); #45 cold/อากาศ; fused segments
  split (#13 #34 #61 #84 #33); #94 and #96 order (also lo, km); th #56 สองทุ่ม; 30 stray spaces from 4bbe709b8.
- bo (30): subjoined tsa ྩ typed for ta ྟ in 12 cells (ད་ལྟ, རྟག་པར …), སློབ་གྲྭ, missing tsheg in 10 sentences, join marks for
  bound འི/ར. app.js: bo added to NO_SPACE_LANGS (Copy/CSV no longer put spaces between Tibetan words).
- my #13 verb-final order, #84 #85 #34 #33 splits; km "this" after the noun (#5 #18 #87), splits #30 #34 #40.
- vi_c 10 wrong join marks ("Cà phêni"); vi_s #96; #45 vi rows; vi_nom #39 𧽈𣋽, #47 𤑟𤉜, #94, #98 (Wiktionary Nôm).
- Sinitic #35 my/older brother swapped (nan hak_cn cdo), #45 "this" under E; zh_song #33; wuu 箇 → 个 (simplified row).
- id #2 "name" split from "my".

## HOLD
- hmn, za, ii: need a source-based rebuild (hmn/za follow Japanese word order in ~half the cells; za and ii use wrong-
  meaning words: za ndwen neix 'this month' for 'tomorrow', roeg 'bird'; ii ꀉꑳ 'child' for 'this', ꀒ 'goose' for water).
- Sinitic #34 "more slowly" fused (deferred since review 53); Lao Thai loans in colloquial use (ຫນັງ, ຄຸນຍາຍ, ໂຈດ);
  unsourced Thai dialect cells (th_isan #79, th_n/th_s #79, th_n #41); wuu demonstratives 搭 (#43 #45); my #2 က.
