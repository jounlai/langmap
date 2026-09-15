# WordMap: Sinitic row-level tone audits still owed

Found during the long-tail drafting of the ten new concepts (2026-09-15). Each of
these is a **row-internal inconsistency in tone values**, not a single bad cell,
so none was patched in passing — the right fix is a deterministic checker plus
one deliberate pass per row, the way `tools/tone_category_check.js` was built.

The existing guards do not catch these. `chao_level_notation_check` compares one
level tone written two *lengths* (`˩` vs `˩˩`), not two *heights* (`˧˧` vs `˥˥`).
`Sinitic tone class per row` and `Sinitic tone outliers` both pass, the latter on
a budget (102 outliers against 114).

---

## 0. `ear` 耳朵 — one placeholder pasted across fourteen rows

The largest single find, and the reason the guard was widened (below).

Fourteen rows carry the **byte-identical, toneless** cell `耳朵 /ɚ twɔ/`: `czh`,
`czh_wy`, `zh_jh`, `zh_tj`, `zh_lz`, `zh_cq`, `zh_jn`, `zh_km`, `zh_wh`, `zh_zz`,
`zh_hf`, `zh_kf`, `wuu_wz`, `wuu_jx`. It cannot be right as data: `ɚ` is a
Mandarin retroflex vowel that Wenzhou and Jiaxing Wu do not have, and Kunming,
Wuhan, Hefei and Kaifeng have distinct tone systems. `zh_db`, immediately above
in the file, has `耳朵 /ɚ˧˩ twɔ/` — which looks like where the paste came from.

`yue_nn` and `yue_zs` likewise share a toneless `耳仔 /ji tsɐi/`.

**Why no guard caught it.** `tools/sinitic_tone_present_check.js` tested
`const HAN = /^[一-鿿]$/u` — a **single** Han character. Every multi-character
surface in the corpus was skipped outright. Widening it to `/^[一-鿿]+$/u`
(2026-09-15) surfaced 18 previously invisible toneless cells: the 16 above plus
`wuu mother 姆妈 /m̩ma/` and `hak_tw stone 石頭 /sak̚ tʰeu/`. All 18 are now
recorded in `tools/sinitic_tone_present.lock.json` as debt (6 entries → 24), so
they are visible and any *new* toneless cell now fails the guard.

Restoring them needs a sourced reading per lect; `tools/sinitic_tone_class_check.js`
carries the 調類 table to derive each from that row's own cells.

## 1. `hak_hl` (Hailu Hakka) — the two entering tones look swapped

The smooth tones match Hsinchu Hailu exactly, as published (Wikipedia's Hailu
dialect article, citing Xie & Huang 2012 and MOE 2012):

| | 陰平 | 陽平 | 上聲 | 陰去 | 陽去 | 陰入 | 陽入 |
|---|---|---|---|---|---|---|---|
| Hsinchu Hailu | 53 | 55 | 24 | 11 | 33 | **5** | **2** |
| this row | ˥˧ ✓ | ˥˥ ✓ | ˨˦ ✓ | ˩˩ ✓ | ˧˧ ✓ | **˨˨** | **˥˥ / ˥** |

So 陰入 and 陽入 are the wrong way round. But it is **not** a clean swap, which
is why it needs a pass rather than a sed:

- `foot 腳 /kiok˥˥/` — 腳 is 陰入, yet carries the row's 陽入 value.
- `tree 樹仔 /ʃu˨˨e˨˦/` — 樹 is 陽去, yet carries the row's 陰入 value.

Affected 陰入 cells (currently ˨˨): 血, 屋, 百, 鐵, 惜, 一, 雪, 日, 目 (×2).
Affected 陽入 cells (currently ˥˥ or ˥): 食, 月, 石, 舌, 白.

## 2. `nan_pn` (Penang Hokkien) — 陰平 written three ways

Penang Hokkien tone 1 is standardly described as mid-level 33, and the row mostly
writes it `˧˧`: 心 sim˧˧, 風 hɔŋ˧˧, 貓 niau˧˧, 啉 lim˧˧, 絲 si˧˧, 阿 a˧˧, 媽 ma˧˧.

Outliers, all 陰平: `three 三 sã˦˦`, `father 阿爸 …pa˥˥`, `star 星 tsʰẽ˥˥`.

Complication: `thanks 多謝 to˥˥…` and `orange 柑仔 kam˥˥…` are also 陰平 but sit in
**sandhi position**, so their `˥˥` may be deliberate. Note that `阿爸 a˧˧pa˥˥`
then runs the other way — the sandhi-position syllable has ˧˧ and the citation
one ˥˥ — so someone has to decide whether this row records citation tones (the
policy the Mandarin rows follow) or surface sandhi, and then apply it once.

## 3. `cdo` (Fuzhou Min) — 上聲 written two ways

Wiktionary's BUC readings put 馬 mā, 水 cūi and 我 nguāi all on the same 上聲
macron, so all three are one tone class. This row writes it two ways:

- `˧˩` in eight cells — 鳥, 狗, 土, 火, 好, 手, 屎, 水
- `˧˧` in several others — 我, 汝, and the 上聲 syllables of 日頭, 你好, 阿姆,
  蝴蝶, 謝謝, 女囝

A drafting agent proposed moving `horse 馬` from ˧˩ to ˧˧ on the strength of 我
and 汝. That was declined: ˧˩ is the row's majority and 馬 already had it. The
row still needs one value chosen and applied throughout.

## 4. `dng` (Dungan) — tone marked on about half the row

Roughly half the cells carry Chao letters and half do not, and the tone classes
disagree where they do: 人 жын is written `ʐəŋ˨˦` (tone I) while 名, also 陽平,
is written `miŋ˥˩`. Dungan orthography writes no tone, so the surfaces are fine;
the question is only what the IPA field should carry, and whether to fill the
unmarked half at all.

## 5. `mnp` (Min Bei) — 陰上 written two ways

`bird 鳥 ˧˧` and `fire 火 ˨˩` are both 陰上. A drafting agent declined to add a
cell to this row for exactly that reason: with two competing values for one tone
class there is no model to follow.

---

## Also worth a look, non-Sinitic

- **`lo` (Lao)** spells its tones inconsistently across the repo: mid-class live
  syllables appear as both `˩˧` (ຕາ) and `˧` (ປາ), `˩˩˦` competes with `˩˩˧`, and
  ຂາວ, ນອນ, ນົມ carry no tone at all.
- **`huz` (Hunzib)** and **`ani` (Andi)** mix the two palochkas, U+04CF and
  U+04C0, across files. The Latin and Byelorussian-I impostors were fixed on
  2026-09-15; this is the remaining, cosmetic half of that question.
