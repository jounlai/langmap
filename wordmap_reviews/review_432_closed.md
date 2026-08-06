# Review 432 — WordMap + HanMap full rally (data, metadata, translation quality)

**Date:** 2026-08-06
**Scope:** WordMap words (31 concepts × ~1,140 rows), the per-language metadata
table (family / speakers / countries / official / script / kind), the prose
descriptions in 19–23 UI languages, and HanMap (61 characters × ~120 varieties
plus its language metadata).
**Method:** deterministic dumps → 3 rounds of `parallel(review) → parallel(adversarial-verify)`.
8 review shards per round (4 word groups, WordMap metadata, description sample,
HanMap readings, HanMap metadata); findings deduped across rounds; every survivor
handed to a skeptic told to refute it, to check `git log -S` for whether the value
was a later hand-made fix, and to default to "refuted" when unsure.
**Cost:** 118 agents, ~8.4M tokens, 60 min. **46 confirmed / 44 refuted.**

The run hit the monthly spend limit near the end: 3 verifiers and the synthesis
agent failed. Their findings are not in the confirmed set, and the summary below
was written by hand instead.

**Applied: 40 of 46.** The remaining 6 are listed under "Held" with reasons.

## Confirmed & applied

### Wrong word in the cell (the serious class)

These are not transcription slips — a different lexeme was sitting in the cell.
Every one dates from a bulk import and was never hand-corrected.

| cell | was | actually means | now |
|---|---|---|---|
| `kxc` water | inanta | **girl** (Ongaye, *A Grammar of Konso*) | pishaa |
| `tab` mother | бай | **son, boy** | баб |
| `com` eye | tʊka | **the "eat" stem** | puui |
| `com` eat | nʉʉ | **"I"** | tʉhkarʉ |
| `bla` heart | imitá | **dog** — byte-identical IPA to the dog cell | — (blank) |
| `tcy` mother | ಅಮ್ಮೆ | **father** — identical to its own father cell | ಅಪ್ಪೆ |
| `ddo` mother | баб | (Tsez mother is eniw) | эни |
| `myn` eat | wiʼij | | weʼ |
| `one` dog / house | otahkwaʔa / oneʔnʌ | | é:lhal / kanúhsote |
| `rn` hand | ukuboko | **arm** | ikiganza |
| `com` hand / drink | nami / tʉ | | mo'o / hibi |
| `sjo` dog | ᠨᡳᠨᡩᠠᡥᡡᠨ | stray leading ᠨ | ᡳᠨᡩᠠᡥᡡᠨ |
| `pcm` thanks | tanx | texting shorthand | tenki |

Two verifiers noted that the `com` and `kxc` rows look contaminated beyond the
cells fixed here (Comanche moon `poʰa` is 'medicine/power'; the Konso grammar
gives 'fire' apitta, 'house' tika, 'mother' aayyaa). **Both rows deserve a
dedicated sweep.**

### IPA using phonemes the language does not have
- `tzh` water/sun `xaʔ` `kʼaxkʼal` → `haʔ` `kʼahkʼal` — Tzeltal ⟨j⟩ is /h/.
- `ipk` sun `siqiŋiq` → `siqiɲiq`; `ik` star `uvluɣiaq` → `uvluʁiaq`.
- `mus` eye `toɾofki` → `toɬofki` — Muscogee ⟨r⟩ is /ɬ/.

### Script convention (handled mechanically, not by hand)
Six cuckoo cells in mainland-simplified rows carried traditional characters
(`gan` `cpx` `mnp` 布穀, `hak_cn` 伏鳩仔, `hsn` 陽雀子, `yue_ts` 布穀鳥).

`tools/zh_script_convention.js` should already have caught this. It did not, for
two reasons, both now fixed:
1. it only checked `sushi` and `computer` — the two words it was written for. A
   `--all` mode now checks every word, using a per-code majority baseline so one
   deviant cell cannot define its own convention;
2. its character-pair table was missing 穀/谷 and 鳩/鸠, so those cells scored as
   "neutral" and were invisible. Pairs added.

With both fixes the tool reports exactly the six cells the rally named, and zero
after applying. **Worth wiring `--all` into `tools/check_all.js`.**

### Metadata

**`sukh` (Old Thai, Sukhothai) had another language's metadata entirely.** Family
read `Austroasiatic (Khmeric)`, speakers `~7th-9th c. CE; superseded by Old
Khmer`, countries `Funan-Chenla period kingdoms (modern Cambodia)`, and the
description in all 19 languages opened "Old Khmer (sukh designation) refers to…".
There is a separate `okz` = Old Khmer row. Only `period` (13–15c) was right.
Rewritten: Kra-Dai (Tai, Southwestern), Sukhothai kingdom, Ram Khamhaeng script,
with the description rewritten in all 19 languages.

The first attempt deleted the 17 wrong translations and let them fall back to
English. `tools/description_translation_check.js` blocked the commit — it does not
allow a missing description. That guard is right: a fallback notice is worse than
a translation. They were written instead.

**`official` was holding a country name** on `lzz` `pcd` `pnb` `fla` `swg` `lmn`,
which reads as "Laz is an official language of Turkey". All six now say No, with
the actual status. Also `ar_sa` (had "Saudi Arabia, Saudi Arabia (co-official in
Iraq/Syria border regions)" — Najdi is a vernacular, MSA is official) and `frp`
(claimed co-official in Aosta while its countries field said France).

A mechanical scan for `official == countries` returns **130 rows**, but most are
legitimate — Japanese *is* official in Japan. This class cannot be closed by
machine; only the eight the rally verified were touched. **The other ~122 need a
per-language pass.**

Also: `bar` countries Germany → Austria, Germany, Italy (South Tyrol);
`pdt` countries Russia/Ukraine → the Latin American communities where most
speakers now live (its `official` string was also truncated mid-sentence);
`cjy_lv` `cjy_xz` `czh_wy` `gan_fz` script Latin → Simplified Chinese (their
parent rows already said so);
`cab` (Garifuna) and `lad` (Ladino) removed from the `pidgin-creole` list in
`LANGUAGE_KIND` — Garifuna is Arawakan, Ladino is Ibero-Romance, and both rows'
own family strings contradicted the label.

### Descriptions
- `xpg` ja — **character corruption**: 碌文 for 碑文, 墓床 for 墓碑, 階穋 for 階梯,
  最近い for 最も近い, オールド・バルカン for パレオバルカン.
- `ig` en+ja — "30+ vowel inventory". Igbo has eight vowels in two ATR sets and
  30+ *consonants*. Vowel and consonant had been swapped.
- `vi_nom` en+ja — Truyện Kiều attributed to the Lê dynasty; Nguyễn Du wrote it
  under the Nguyễn.
- `zh_sc` en+ja — 巴适 glossed as "very"; it means comfortable / just right.
- `hsn` ar — the Arabic said Old Xiang preserves *fricatives*; the English says
  voiced obstruents.

### HanMap
- `gan_yt` native name was the literal placeholder **"数据库中不存在"** ("does not
  exist in database") → 贛語鷹潭話.
- `msj` region — 邵武 is in 南平市, not 三明市.
- `phm` ~2500 BCE → ~500 BCE. **WordMap already fixed this exact error in review
  #430**; HanMap carried the uncorrected copy. Cross-map errors do not propagate
  fixes.
- `ptung` ~2000 BCE → ~500 BCE – 500 CE.
- 口 `nan_id` tshùi → kháu. tshuì is 嘴, the word for mouth, not the reading of 口.

## Held (6)

- **Duplicate language rows**: `so`/`som`, `onn`/`ono`, `ik`/`ipk`, `cr`/`crk`,
  `bxr`/`bua` — the same language twice, with conflicting metadata. Merging is a
  structural change that alters the advertised language count (1,140). Owner call.
- `hop` tree — the verifier could only establish that `suukya` is wrong, not what
  replaces it.
- `com` good / moon / heart — no proposed forms; needs the row sweep above.
- HanMap `dng` 口, `cpx` 三, `hak_mz` 坐, `ko_mid` 食, `ko_hun` 行 — tone-notation
  and orthography details that could not be verified from available sources.
- The wider `official`-field class (~122 rows) — see above.

## Refutations worth keeping

44 findings were refuted. The recurring failure was **a reviewer inventing a
convention and enforcing it**:
- "`jacob/en` should hold an American" — the en/gb split is by *spelling*, not
  nationality; gb holds James Joyce and Omar Sharif.
- "`solomon/fil` IPA is copied from English" — the dataset deliberately gives
  English-derived IPA to `fil` cells that keep the English spelling, and Filipino
  IPA to Hispanized ones. The reviewer's "every other fil cell" claim was false.
- "`muhammad/sw` form should match its IPA" — Mohammed is the mainstream spelling;
  the weak field was the IPA. Changing the form to match a suspect transcription
  inverts the evidence.
- "`alexander/en` is RP not GA" — true, but a dataset-wide policy question, not a
  single-cell error.

## Notes for next time

1. **Check whether a deterministic checker already covers the class, then check
   its scope.** The zh-script finding was already in a tool's remit but outside
   its hardcoded word list and character table. Two small fixes turned an LLM
   finding into a mechanical, exhaustive one.
2. **A mechanical scan is not automatically a mechanical fix.** `official ==
   countries` produced 130 hits of which most were correct.
3. **The three key/quote formats in the data files are a real hazard.** The first
   bulk apply matched 0 of 25 cells because of a space after a comma. Word cells
   are `code: ["a", "b"]`; meta is `LANG_DATA['x']` *and* `LANG_DATA["x"]`; HanMap
   is `"key": "value"`. Any applier must handle all three.
4. **`?v=` cache-busters outside `WM_ASSET_VERSION` are unguarded.** `hanmap_data.js?v=`
   had to be bumped by hand, exactly as `namemap_*.js?v=` did in the NameMap rally.
   The guard should be extended to both pages.
5. Downstream: SNS posts #116 and #117 had already been rewritten in the NameMap
   rally for the same reason — data errors get copied into the marketing corpus.
   Check it whenever a prose finding lands.
