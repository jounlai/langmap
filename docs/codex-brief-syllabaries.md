# Brief for an external model — six Chinese syllabaries LangMap cannot source

> **Corrected 2026-09-09, after the first response.** Two errors in the original
> version of this brief, both found by the responder and both mine:
> the character list was written from memory rather than read from the data — it
> gave 67 characters, of which 百千万川金大小多少長短雨風雲雪虫父母子女 are not in
> the map at all and 海羊貓頭肉央左右聞走坐立 were missing. The correct list is
> below. And the Word Map inventory was described as a veto on published
> sources; it is evidence to reconcile, not an authority. Both are fixed here.

Paste this whole file. It is self-contained: you do not need the repository.

## What LangMap is, in one paragraph

An atlas of 1,187 languages. Two of its maps matter here. The **Han Map** gives
the reading of 61 Chinese characters in 121 lects, as a surface form plus an IPA
transcription with Chao tone letters (˥ ˦ ˧ ˨ ˩). The **Word Map** gives ~67
everyday words in the same lects, sourced separately. Both are public, and the
project's standing rule is that a cell must come from a real source: where no
source can be found, the cell stays empty rather than being filled by analogy.

## The problem

Six Han Map rows are **undifferentiated copies of their group's parent** — the
same 61 readings as a neighbouring lect, tone for tone. They were almost
certainly filled by copying the parent when the row was created. Together they
are 366 cells that claim to describe six distinct lects and do not.

They cannot be repaired by inference, because the thing that is missing is
exactly the thing that would have to be inferred: the **調類 → 調值 mapping**
(which historical tone category takes which pitch value) and the segmental
readings. The Word Map carries independently-sourced rows for four of the six,
and those rows' tone *inventories* prove the Han Map rows are copies — but an
inventory is not a mapping, so it narrows the target without answering it.

| Han Map row | copies | lect needed | Word Map tone inventory for the same lect |
|---|---|---|---|
| `hsn_hy` | `hsn` (Changsha) | **衡陽** Hengyang Xiang | ˥˩ ˧˧ ˨˦ ˨˩ ˩˧ ˩˩ |
| `cjy_cz` | `cjy` (Taiyuan) | **長治** Changzhi Jin | (no Word Map row) |
| `cjy_lv` | `cjy` (Taiyuan) | **呂梁** Lüliang Jin | ˥˦ ˥˧ ˦˥ ˧ ˨ ˨˩˧ ˩ ˩˩ |
| `cnp_gl` | `cnp` (Nanning) | **桂林平話** Guilin Pinghua | (no Word Map row) |
| `gan_fz` | `gan` (Nanchang) | **撫州/臨川** Fuzhou-Linchuan Gan | ˥ ˥˥ ˦˥ ˦˨ ˧ ˧˥ ˧˨ ˨˦ ˨˩ ˨˩˧ |
| `gan_ja` | `gan` (Nanchang) | **吉安** Ji'an Gan | ˥ ˥˧ ˦˥ ˦˨ ˧˧ ˧˧˦ ˧˩ ˨ ˨˩ ˨˩˧ ˩˧ |

Note that the Han Map rows use **none** of these contours — they use the
parent's. That mismatch is the evidence.

## What I am asking you for

**For each of the six lects, a published tone system: the number of tones, each
tone's Chao value, and which Middle Chinese category (平上去入 × 陰陽, and the
清/濁 splits) each corresponds to.** With a citation I can check.

Ranked by usefulness:

1. **A 方言志 / 方言研究 volume or a 音系 section** giving the tone table
   directly. Chinese dialectology has these for most county-level lects —
   e.g. 《臨川方言研究》, 江西省志·方言志, 山西方言志 series, 廣西通志·漢語方言志,
   湖南方言研究叢書. Tell me the volume, the page if you have it, and the table.
2. **A journal article or thesis** with the same. CNKI-indexed 方言 / 語言研究 /
   方言學報 papers are the usual home.
3. **A dialect dictionary** in the 現代漢語方言大詞典 series, which prints the
   tone system in its front matter.
4. Failing all of the above, **say so for that lect** and name what would
   settle it. That is a useful answer; a guess is not.

If you can also give the **61 characters' readings** for any of these lects, that
is the whole repair rather than half of it. The 61 are (`中:1`/`中:2` and `行:1`/`行:2` are two readings of one
character, which is why the count is 61 entries over 59 characters):

```
一 二 三 四 五 六 七 八 九 十 日 月 山 水 火 木 土 天 地 海 龍 虎 犬 馬 鳥 魚 牛 羊 貓 人 手 足 目 耳 口 頭 心 血 肉 上 下 中:1 中:2 央 左 右 東 西 南 北 行:1 行:2 来 去 見 聞 食 飲 走 坐 立
```

## What I will do with the answer

I will not paste it in. Every value gets checked against the row's own data
before anything is written:

- the tone values you give get **compared against the Word Map inventory** in
  the table above. A mismatch is not a verdict against your source — it may
  mean my row is a different locality, generation or transcription, and in at
  least one case (`gan_fz`) my row is already known to mix three sources. But
  a mismatch has to be explained before either side is used, so please say
  when your table does not fit;
- the 調類 mapping must be **internally consistent across the 61 characters**,
  which are spread across all the Middle Chinese categories;
- entering-tone codas must match what the dialect group is documented to have
  (撫廣片 is -p/-t/-k with -k often → -ʔ; Nanchang's 陰入/陽入 are the *reverse*
  of Fuzhou's, which is one reason the copied cells are wrong twice over).

So please give **sources over confidence**. If two sources disagree, say both.
If a figure is your recollection rather than something you can point at, mark it.

## Two specific traps, from experience

- **Do not derive a mapping from the Word Map inventory.** It tells me which
  pitches exist in the lect, not which category each belongs to. Twice now a
  row has been filled by matching inventories and been wrong.
- **A row that is itself a copy is not a source.** `gan_ja` and `gan_fz` are
  both copies of `gan`; do not use one to reconstruct the other.

## Lower priority, same brief

If any of these fall out of the same reading, they are also open:

- **`nan_th` (Thai Hokkien), the character 行** — two cells read ˥˥ where the
  row's tone digit 5 is ˧˥ everywhere else. Sandhi or a real value?
- **`dds` (Donno So, Dogon), 'dog' `gɛɛ` and 'tree' `ti`** — no Dogon variety I
  can reach has either; all give an i-/n- initial for dog and a tim- form for
  tree. Kervran's *Dictionnaire dogon–français: donno sɔ* (1982) would settle it.
- **`atb` (Zaiwa)** writes its surface in two romanizations at once — 20 cells
  with a numeral tone suffix (`tsa51`), 16 with the orthographic tone letters
  (`kyoq`, `sui`). Which is the standard Zaiwa orthography, and is there a
  source that gives the 36 words in it consistently?

## Format I would like back

For each lect, in plain text:

```
LECT: 衡陽 (Hengyang Xiang)
TONES: <n> tones
  陰平 <Chao value>   ← <category, and the 清/濁 condition if it splits>
  ...
SOURCE: <author, year, title, publisher; page if known>
CONFIDENCE: <sourced | recalled | uncertain>
NOTES: <disagreements between sources, or what is missing>
```

Readings, if you have them, as `character<tab>surface<tab>IPA`.
