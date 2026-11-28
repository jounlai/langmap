# Review 873 — are the new words written in the same script as their rows?

2026-11-28. Owner: 「追加した単語の文字が既存の単語と違う文字体系になってないか確認」.

## Checks
1. **tools/script_consistency_check.js:** no stray cell among the 42 new words. Two things it flagged turned out not to be problems:
   - Coptic give/hair/sand/say: ϯ ϥ ϣ ϫ are Coptic letters encoded in the Greek block.
   - Zhuang: the row mixes Sawndip and Latin by design.
2. **Zhuang cells:** the row writes a word in Sawndip whenever en.wiktionary's {{za-head}} lists a form for that sense. It shows the first renderable form, with the Latin and up to three attested variants beside it (rule of commit 2ecb20af5). All 37 new Zhuang cells had been entered in Latin only, so that step was skipped.
3. **Simplified vs traditional (Han rows):** each row's habit in its older words was compared with the new cells.

## Fixed
- **Zhuang, 31 cells now in Sawndip.** Each uses the first form of the matching sense, with Latin and variants kept:
  - see 𰴑, die 𬆗, horn 𮗣, breast 𭨪, liver 𦡯, come 䢏, road 垎;
  - man 俌𪟞, child 𭒹𭓍, meat 胬, cloud 𬽀, hair 𭯞, neck 䏩, tail 𭯢;
  - feather 𭯓, sand 砟, ash 𭴧, walk 𨃅, give 𭢒, say 講, know 𮀊, big 𫯞;
  - small 𭕌, kill 𭪍, fly 𬼬, sit 𬼶, long 𬼓, hot 燵, worm 蚓, nail 𭻎, burn 𭴵.
  - Where Wiktionary's first form is missing from the BabelStone Han font, the next form is used: long 𰿏 → 𬼓, worm 𰯁 → 蚓.
  - Ideographic-description sequences (⿰…) are never used.
  - Six stay in Latin because no glyph is listed for the sense: leaf, skin, knee, full, woman, stand.
- **Font:** the BabelStone Han Sawndip subset went from 112 to 175 glyphs (48 KB). The unicode-range and ?v= are updated in wordmap.html and hanmap.html. Checked in a browser: Zhuang "hair" draws 𭯞 from the subset.
- **Old Japanese "come":** 來 → 来, written in shinjitai like the rest of the row (与之, 黒し).
- **Zhuang "mother":** back to 𫱆, undoing a review 872 change. Commit 2ecb20af5 had kept it on purpose, together with 火, 日 and 月.

## Not changed
- The other simplified/traditional hits are correct in their rows: Japanese 来 and 与 are shinjitai, 游 is the same in both scripts, and Nôm 呐 is the usual character for nói.

CLOSED.
