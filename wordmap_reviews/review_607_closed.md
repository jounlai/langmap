# Review 607 — Sinitic dialect cells against dial-syn, and SE Asian glosses (2026-11-04)

A draft-only agent compared 1,642 cells in 63 Sinitic rows with the town's
entry in Wiktionary's dial-syn modules (49 concepts, non-empty entries only):
122 mismatches, 68 proposals (23 high). Script variants, suffix-only
differences and tagged synonyms were not proposed. A second agent read the
Wiktionary entry of 1,223 cells in 23 mainland SE Asian rows: 4 flagged.

## Fixed (word from dial-syn, reading from the source the row follows)
| row | word | was | now |
|---|---|---|---|
| yue | bat | 蝙蝠 | 蝠鼠 (route plain → mouse) |
| yue | bird | 鳥 | 雀仔 |
| yue_dg | bird / egg | 鸟 / 蛋 | 雀仔 / 鸡春 |
| yue_zs | bird / egg | 鳥 / 蛋 | 雀 / 雞春 |
| gan | bird | 鸟 | 雀子 |
| cjy_lv | bird | 鸟 | 雀雀 |
| zh_cd, zh_wh, hsn | earth (soil) | 土 | 泥巴 |
| ium | rainbow | route plain | serpent (jung = 'dragon', < OC 龍) |

Readings: Wiktionary per-variety IPA (yue, zh_cd, hsn) or the MCPDict town
table (zh_wh, cjy_lv, gan, yue_dg, yue_zs), normalised to each row's style.

## Medium proposals applied
hsn honey 蜂蜜 → 蜜糖, gan honey 蜂蜜 → 蜜糖, nan_te head 头 → 头壳 (dial-syn lists only the new word; reading sourced).

## Medium proposals not applied (cell's word plausibly in use, or no reading)
yue rainbow 彩虹 (天虹 also listed; 彩虹 common), zh_cd sleep 睡觉, zh_tj ear/bear/honey,
zh_hf ear, zh_kf head, Wu 土 → 爛泥 'mud', Hakka/cdo wheel, Hokkien orange 柑仔 →
橙/柳丁 (sense issue: 柑仔 is the mandarin orange; no town readings for 橙/柳丁 yet).

## Open — word looks right, no reading in the row's source
zh_db 小拇哥, zh_sc 泥巴, zh_jh 雀子, zh_cq 腦殼 / 蜂糖, czh 蜜糖 / 洋芋頭 / 明朝,
wuu 蜜糖 (row notation differs from Wiktionary Shanghai), wuu_nb 蜂糖,
wuu_wz 奶兒, yue_nn 雀仔 (雀 missing from MCPDict Nanning).
Medium proposals (45, ~/langmap-work/par1104/ins/review_r7.json) not yet read:
Hokkien orange 柑仔 → 橙 / 柳丁, 土 → 泥 words, Taipei thumb/tomato, etc.
ium milk nyorx ('breast') → nyorx wuom (assembled, not printed by a source);
vi Adam's apple yết hầu ('pharynx'); km cuckoo តាវៅ (koel).

## Second pass (readings found)
zh_db 小拇哥, zh_sc 泥巴, zh_cq 脑壳 / 蜂糖, czh 蜜糖, wuu_nb 蜂糖, wuu_wz 奶儿 (spelling),
Hokkien orange 柑仔 → 橙 (nan_xm, nan_qz, nan_zz, nan_hai) and 柳丁 (nan). Held: czh 明朝
(tone converted by inference), nan_pn 橙 (Wiktionary doesn't name Penang), zh_jh 雀子,
czh 洋芋頭, yue_nn 雀仔 (no reading). vi Adam's apple yết hầu kept (VDict); km cuckoo
kept with a koel note. LEXICAL_IMPORT_DEBT 31.

## Route review (plain / unknown cells, East and SE Asia)
~900 cells checked against stated etymologies. Applied: adx thunder འབྲུག unknown → other
(same word as 'dragon', as already routed in bo/khg/xct/dz); ja_oki sunflower ひーぐるま
unknown → sun (日車 'sun-wheel', the cell's own note). Not applied: images read only from
characters (Min/Hakka bat …婆, hiccup 噎, zh_cd 虰虰猫儿), Balinese lawah (inherited
'flying squirrel' word, not an image), wuu_wz 皮翼 (meaning unconfirmed).
Ryukyuan rows vs JLect: 101 cells, no wrong sense. Open policy: te-form verb cells in
Japanese dialect rows (食って/飲んで/良くて) vs dictionary forms; ja_aom eye (Tōhoku
managu?); ja_mvi fire pɨː vs Hirara umatsï.
