# Review 608 — transcription slips in East/SE Asian rows (2026-11-04)

Two draft-only agents compared cells with the dataset each row follows,
after measuring each row's own normalisation (tone-digit→Chao map, ː, ́
letters, glide j) on its exact matches. Mainland: 1,205 cells, 281 differ,
almost all deliberate normalisation; 7 slips. Insular: 6,240 Latin-script
cells checked for spelling→IPA consistency and near-typos; 7 slips.

| row | word | was | now | evidence |
|---|---|---|---|---|
| ii | nose | n̥a˨˩bi˥˥ | n̥a˨˩bi˥ | row writes 55 as ˥ in 4 of 5 cells |
| kmc | bird | mok21 | mok212 | IDS mok.212 |
| kmc | green | su35 | su55 | IDS su.55 (35 copied from blue pha35) |
| kmc | nose | mɐŋ55 | nəŋ55 | IDS nəŋ.55 |
| mmd | two | ja1 | ja2 | IDS ja.2 |
| clk | three | kɑ31soŋ55 | kɑ31soŋ35 | Sagart Yidu kɑ³¹soŋ³⁵ |
| shn | bat | miŋ˩˩ | miŋ˩ | row writes tone 2 as ˩ in 6 of 7 |
| iba | butterfly | kələlaway | kələlawaj | Latin y left in IPA |
| ckv, ssf | bear | -mai | -maj | row writes -y as j (7/8, 5/6) |
| bts | ear | piɡːol | piŋɡol | ng = ŋ elsewhere in the row; bbc/akb piŋɡol |
| pzh | rain, hundred | udan, haten | udal, hatel | Li & Tsuchida Pazih (row source); -n forms are Kaxabu |
| tet | tongue | nanaan | nanaal | Dili Tetun list (row matches 47/51); Wiktionary nanal |

Left alone: ii heart/bird hɛ˧˧ (Lama he33), txg drink, swi two, tji fire, kmc four
(source splits); mfa -ang → -ɛ (regular Patani Malay change).

## Sinitic surface↔IPA agreement (57 rows, 27 majority-reading mismatches)
Applied: wuu we 阿拉 aʔ˧ laʔ˦ → aʔ˧ laʔ˦˦ (the row's ˧ + ˦˦ sandhi pattern, cf. 德国).
Not applied: reduplicated second syllables written toneless (13 rows, a convention);
Shanghai/Ningbo sandhi; Cantonese changed tone.
Open: gan_ja 脚 tɕio˥ (and 喝/吃 with -t): the foot note cites the row's 陰入 ˥ (血 ɕyɛ˥, 骨 kut˥)
but those cells now read ˧˧˦ without a stop (MCPDict 吉安) — the earlier hand fix and the later
row rebuild disagree; needs one decision for the whole row. hsn 洋咪咪 mi˧ (one-letter tone).
Readings that are one of two MCPDict layers without a label: mnp/cpx 日本, gan 星子,
nan_hai 日头, wuu_sz 昨日 — label only after checking Wiktionary per [[hanmap-min-label-policy]].

## Japonic / Koreanic notation consistency (27 rows, 2,492 cells)
Applied 37 (4 high, 33 medium): ko_jl ʌ → ə (문어, 별똥별, 칠면조) and ko_jeju ə → ʌ (성);
intervocalic ㄹ r → ɾ in ko_kp, ko_hg, ko_em, ko_mid; final ̚ added to 중국/한국 in ko,
ko_kp, ko_bus, ko_jl, ko_yb, ko_hg, ko_jeju where the row marks it elsewhere; ja_kyo/ja_edo/
ja_kanbun u → ɯ, n → ɴ, r → ɾ; ja_chu r → ɾ.
Held (low): ja_heian r/ɾ split 9/11 (needs one direction), ja_sd/ja_aom geminate ː in copied
cells, ko_em ̚ on 2 of 10 stops, ja_kanbun 日本 ɴ. Format: ko goosebumps holds "소름 / 닭살".

## Follow-ups
- ja_heian: the 9 r cells unified on ɾ (all other Japanese rows write ɾ).
- Vietnamese/Thai tone and segment check (968 cells): vi_c thứ, sấm open sắc ˧˦ → ˨˦ (row: 33/35);
  vi_nom 日本 Nhật ˨˩ → ˧˨ʔ; vi_nom 𩈘 mặt mət → mat; vi_nom 英 aɲ → ajŋ; vi vang vaŋ → vaːŋ;
  vi động ɗəwŋ → ɗəwŋ͡m; th อึ ʔɯː˥˩ → ʔɯʔ˨˩ (mid class, short, unmarked = low; Wiktionary).

## Guards installed (check_all)
- tools/vi_tone_check.js — per-row quốc ngữ tone → Chao table for vi / vi_c / vi_s; vi_nom must equal the vi cell (4 reasoned ALLOW). Found vi_nom 電話移動 still lacking ͡m.
- tools/ko_notation_check.js — intervocalic ㄹ ɾ, word-final ̚ by row majority, ㅓ letter by row majority (ko_gor/oko off; ko_mid/ko_hg (c) off). Found ko_mid 졎 tsjət̚ → tsjəts (Wiktionary /t͡sjə́t͡s/).
- tools/sinitic_char_reading_check.js + sinitic_char_reading.lock.json — ratchet; lock holds the 4 unlabelled 文白 items (cpx/mnp 日本, nan_hai 日头, wuu_sz 昨日).

## gan_ja entering tone (one row-wide decision)
History: row created 2026-06-21 with 陰入 ˥ + stop; 脚 tɕio˥ hand-written 2026-09-20; whole row re-read
from MCPDict 吉安 on 2026-10-03 (r46), where 陰入 → ˧˧˦ (no stop), 陽入 → ˨˩˦. Decision: the row follows
the 吉安 city table. Applied: 酒 tɕiu˨˩˧ → tɕiu˥˧ (table reading; ˨˩˧ is not one of its tones).
Kept, flagged as conflict with the hand fix: 脚 tɕio˥ (segments sourced; tone pre-dates r46, note rewritten
to say so). 喝 hot˥ / 吃 tɕʰiat˥ remain DEBT (not in the table). Not converted by inference anywhere.
