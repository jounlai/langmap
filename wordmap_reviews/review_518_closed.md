# Rally 5 — six Chinese lects: published tone systems

Research date 2026-09-09. Format per `docs/codex-brief-syllabaries.md`.

**Reading of the whole**: all six lects now have a published tone system. Five are
solid; 衡陽 is solid as a tone table but its Word Map row contradicts it, which is
reported as a conflict rather than resolved. No pitch value below is inferred — where
a source is silent the section says so.

Scorecard against the brief's own check (does the table account for the Word Map row?):

| lect | tones found | Word Map check | 61 readings |
|---|---|---|---|
| 衡陽 | 6 | **FAILS** — no ˥˩ in any of three published tables; see the section | 0 |
| 長治 | 6 | vacuous (no Word Map row) | 21 |
| 呂梁/離石 | 6 | **FAILS** — and the row looks Taiyuan-derived; see the section | 22 |
| 桂林平話 | 6 (either point) | vacuous (no Word Map row) | **61** ×2 points |
| 撫州/臨川 | 7 | **passes**, and discriminates between two published readings | 49 |
| 吉安 | **4** | **passes**, on the distinctive 334 | 49 |

**The single most productive find** is the Academia Sinica database
**小學堂 · 漢字古今音資料庫** (`https://xiaoxue.iis.sinica.edu.tw/ccr`), whose
`ccrdata` page ships per-dialect-point XLSX files with, for every character,
`聲母 / 韻母 / 調值 / 調類`. It has dialect points for **five of the six** lects,
including two Guilin Pinghua points. Its 現代方言 material is keyed to named
published books (its 凡例 and 參考書目 pages give the citations), so it is a
transcription of print sources, not a web compilation. Downloads used:

- `ccrdata/file/ccr05_jinyu_data_xlsx.zip` — 33 Jin points incl. 離石, 長治
- `ccrdata/file/ccr08_ganyu_data_xlsx.zip` — 47 Gan points incl. 臨川, 吉安
- `ccrdata/file/ccr12_pinghua_data_xlsx.zip` — 23 Pinghua points incl. 桂林(朝陽), 桂林(雁山竹園)
- `ccrdata/file/ccr09_xiangyu_data_xlsx.zip` — only 4 Xiang points, **no 衡陽**

A companion file, `ccrdata/file/ccr03_yunshu_data_xlsx.zip`, carries the 廣韻 with
`聲調` and `清濁` per 字號. Because the dialect files and the 廣韻 file share the same
字號 key, the two can be joined to read each lect's **調類 → 中古 category** mapping off
the data directly, with counts. Every "← 平·全清 nnn + …" line below is that join, and
is therefore *derived from* the published data rather than quoted from a book — the
sections say so wherever it appears.

Local copies: `/home/jounlai/langmap-work/rally5/ccr/`.
Extracted 61-character readings: `/home/jounlai/langmap-work/rally5/readings61.txt`.
Full 調值 × 中古category join: `/home/jounlai/langmap-work/rally5/mc_join.txt`
(Gan + Jin) and `/home/jounlai/langmap-work/rally5/guilin_pinghua_tones.txt` (Pinghua).

---

## LECT: 衡陽 (Hengyang Xiang) — `hsn_hy`

TONES: 6 tones (no 入聲 split; 上聲 undivided)

```
  陰平   45 (445)   ← 古清平
  陽平   11         ← 古濁平
  上聲   33         ← 古上聲 (清上 + 次濁上), one category
  陰去   24 (324)   ← 古清去
  陽去   213        ← 古濁去
  入聲   22         ← 古入聲, ALL of it — no 陰/陽 split
  (neutral/輕聲 3; 陰去 and 陽去 both surface 31 in 變調 position)
```

ENTERING-TONE CODAS: **lost entirely.** 衡陽 keeps 入聲 as a tone category but
has no stop coda and no glottal stop — the 韻母 inventory is 37 rhymes, 23 open,
12 nasal-final, 2 syllabic nasals, with only `-i -u -n -ŋ` as codas.
(zh.wikipedia 衡陽話 §韻母: 「衡陽話還保留入聲，但塞尾 [-p]、[-t]、[-k] 已經消失」.)

SOURCE — the same six values in three independent presentations, all tracing to
**李永明《衡陽方言》**:
1. **李永明《衡陽方言》長沙：湖南人民出版社，1986** (Li, Yongming. 1986. *Hengyang
   Fangyan*. Changsha: Hunan People's Publishing House). This is the field's standard
   citation, given in full by en.wikipedia (see 3).
   A later edition exists: 湘潭：湘潭大學出版社，2016.10，ISBN 978-7-81128-883-4，頁 1–19 —
   that is the edition cited by zh.wikipedia 衡陽話 §聲調, which prints the table above:
   https://zh.wikipedia.org/wiki/衡陽話
2. en.wiktionary's Hengyang transcription scheme prints the same six values *plus* the
   sandhi values, and lists 李永明《衡陽方言》 as its one reference:
   https://en.wiktionary.org/wiki/Wiktionary:Chinese_entry_guidelines/Xiang/Hengyang
   and https://en.wiktionary.org/wiki/Module:hsn-pron-Hengyang
   (`toneConv = { 1=445, 2=11, 3=33, 4=324, 5=213, 6=22, 4*=324-31, 5*=213-31, 0=3 }`)
3. **en.wikipedia "Hengyang dialect" §Tones** — a properly referenced article, whose
   phonology section is explicitly 「following two published descriptions」: 李永明 1986
   and **彭蘭玉《衡陽方言語法研究》北京：中國社會科學出版社，2005**. Its table:
   陰平 ˦˥ (45) high-rising, 陽平 ˩ (11) low-level, 上聲 ˧ (33) mid-level,
   陰去 ˨˦ (24) low-rising, 陽去 ˨˩˧ (213) falling-rising, 入聲 ˨ (22) mid-low level,
   plus a neutral tone on affixes and clitics, and a note that tone 5 shortens from a
   three-point to a two-point contour in context (冇 /maw˨˩˧/ → 冇得 [maw˨˩ te˨]).
   https://en.wikipedia.org/wiki/Hengyang_dialect
   Same article, useful for the 片: 衡陽 is now put in its own **衡州片** (with 衡東,
   衡山) by 陳暉、鮑厚星 2012 'Xiangyu', *Language Atlas of China* (2nd ed), 商務印書館;
   further sources it cites are 吳雲姬 (Wu Yunji) 2005 *A Synchronic and Diachronic Study
   of the Grammar of the Chinese Xiang Dialect*, Berlin: de Gruyter; 陳暉 2006
   《湘方言語音研究》長沙：湖南師範大學出版社; and 肖霄 2013《衡陽方言中的古入聲字研究》
   西南民族大學碩士論文 (specifically on the 入聲 reflex).

CONFIDENCE: **sourced, strongly** — three presentations, two named monographs
(李永明 1986, 彭蘭玉 2005) — but it **FAILS the Word Map check**.

NOTES — **CONFLICT, do not resolve silently**:
The Word Map row `hsn_hy` is built on ˥˩ (51) and 李永明's system has no 51 at all,
in citation *or* sandhi (its sandhi values are 31 and neutral 3). Worse, the row's
˥˩ does not line up with any single 調類: 四 sɿ˥˩ and 愛 ŋai˥˩ are 陰去, 樹 ɕy˥˩ and
謝 ɕie˥˩ are 陽去, 貓 mau˥˩ and 媽 ma˥˩ are 陰平, 眼 ŋan˥˩ is 上聲 — and 好 is xau˧˧
alone but xau˥˩ in 你好. ˥˩ is overwhelmingly a **non-initial-syllable** value in that
row. Against 李永明 the row's other values line up cleanly only on 上聲 = ˧˧ (土耳手
五火好水狗屎雨 all ˧˧) and partially on 陽平 ≈ ˩˧ vs published 11, 入聲 ≈ ˨˩ vs
published 22; the row also gives 陰平 as ˧˧ (風心三星) where 李永明 has 45.
So the mismatch is not one value — the row's whole 調類→調值 mapping disagrees with
every published table I could find, and I found three. **My reading is that the Word Map 衡陽 row is
itself not a clean citation-tone source**, and should not be used to check or to build
the Han Map row. Settling it properly needs the book itself (李永明 1986, 音系 chapter), or
彭蘭玉《衡陽方言語法研究》(中國社會科學出版社, 2005), or 陳暉、鮑厚星〈湖南省的漢語方言〉
《方言》2007年第3期 250–259, none of which I could open. **My recommendation is to treat
the published 45/11/33/24/213/22 as correct and to audit the Word Map row instead** —
but that is a judgement call, so it is flagged here rather than acted on.
One loose thread worth knowing about: a (non-citable) Douyin caption circulating for
衡陽話 lists 「阴平55(高平)45(高升)，上声214(降升)33(中平)，去声51(全降调)，阴去24(中升)，
阳去13(低升)，入声22(低平)」 — garbled, but it is the only place I saw **51 and 13**
attached to 衡陽 at all, and 13 and 51 are exactly the two Word Map values that the
published tables lack. If the Word Map row came from a popular source of that kind,
that would explain the whole discrepancy.

READINGS: none — 小學堂's 湘語 set has only 長沙, 雙峰, 全州(縣城), 灌陽(文市).
No 衡陽 character list found.

---

## LECT: 長治 (Changzhi Jin, 晉語上黨片長治小片) — `cjy_cz`

TONES: **6 citation tones, not 7** — 去聲 splits 陰/陽, 入聲 does **not**.
Three sources agree on the *structure*; two pitch readings circulate.

Reading A (recommended — the one backed by actual character data):
```
  陰平   213    ← 古清平            例 分
  陽平   24     ← 古濁平            例 人
  上聲   535    ← 古上聲 (清上 + 次濁上); 古全濁上 → 陽去   例 我
  陰去   44     ← 古清去            例 去
  陽去   53     ← 古濁去            例 大
  入聲   ʔ54    ← 古入聲, ALL of it — 清入 = 次濁入 = 全濁入, one category   例 黑
```
Reading B (漢字音典's digitisation of 《長治方言志》): 陰平 **312**, 陽平 24,
上聲 **534**, 陰去 44, 陽去 **54**, 入聲 **ʔ53**.

The two differ only in the direction written for three contours (213/312, 535/534) and
in whether 陽去 or 入聲 gets 53 vs 54. **Reading A is the safer choice**: the 小學堂
character file for 長治 carries 213 on 58 characters and 535 on 33, i.e. it is attested
per-character, and both 《山西方言調查研究報告》 and Baidu Baike's reproduction of
《長治方言志》 p.18 give the same numbers. Reading B is a single hobbyist digitisation.
Either way the **調類 assignment is identical**, so the tone *digits* transfer between
them unchanged (1=陰平, 2=陽平, 3=上聲, 5=陰去, 6=陽去, 7=入).

ENTERING-TONE CODAS: **-ʔ (glottal stop)**, as everywhere in 晉語.
「長治話有36個韻母。有入聲韻，收喉塞音。」 The 小學堂 凡例 writes the tone as `ʔ54`.
Confirmed distributionally as well as by assertion: over 137 sampled 長治 readings in
漢字音典, **every** reading with the entering tone ends in ʔ and **every** reading ending
in ʔ has the entering tone — 1:1, no exceptions, and no second entering tone occurs at all.

**清入 / 次濁入 / 全濁入 all fall together.** The homophone groups settle it — these are
single 字組 entries, i.e. exact homophones:
```
  səʔ    失室式溼瑟色虱設識適釋飾 (清入) + 攝涉 (次濁入) + 十實拾石舌蝕食 (全濁入)
  piɛʔ   伯壁必憋柏畢璧百碧筆逼鱉 (清入) + 别帛弼 (全濁入)
  iɛʔ    一乙噎約 (清入) + 業葉孽弱熱瘧若虐逸頁 (次濁入)
```
All three Middle Chinese voicing classes sit in one tone class. That is the direct
refutation of a 陰入/陽入 split for 長治市區.

MIDDLE-CHINESE MAPPING, verified by joining 小學堂 point 089 against its 廣韻 sheet:
陰平 213 ← 平·全清 51 + 平·次清 7; 陽平 24 ← 平·全濁 31 + 平·次濁 28;
上聲 535 ← 上·全清 17 + 上·次濁 11 + 上·次清 5; 陰去 44 ← 去·全清 11 + 去·次清 8;
陽去 53 ← 去·次濁 13 + 去·全濁 13 + **上·全濁 5** (濁上歸去). No 入聲 characters are
in that file, so the 入聲's 清/濁 behaviour is not testable from it.

SOURCE:
- **侯精一《長治方言志》北京：語文出版社，1985，頁 18.** — this is the primary
  monograph and the source Baidu Baike cites for the six-tone table above:
  https://baike.baidu.com/item/长治话
- **侯精一、溫端政 主編《山西方言調查研究報告》山西高校聯合出版社，1993.**
  小學堂's 凡例 for this book states verbatim: 「據《報告》聲韻調表，山西長治方言點的
  聲調分為「213」陰平、「24」陽平、「535」上聲、「44」陰去、「53」陽去、「ʔ54」入聲
  **六種調類**」, and cites 頁 500 for the 標調法.
  https://xiaoxue.iis.sinica.edu.tw/ccr/Example/Example08
- 小學堂 dataset point `089 晉語_長治` (215 characters) independently confirms
  213 / 24 / 535 / 44 / 53 on real characters.
- 溫端政〈試論晉語的特點與歸屬〉《語文研究》1997年第2期 (cited by Baidu Baike alongside).
- **漢字音典 / MCPDict** (https://github.com/osfans/MCPDict), point 394 「長治(漢民)話」,
  3,230 characters, index at https://mcpdict.sourceforge.io/info.html, which declares
  「字表來源《长治方言志》」. This is a hobbyist digitisation, not the book — but it is
  editorially independent of Wikipedia, it names its source, and it is character-level,
  which is why its homophone groups can settle the 入聲 question above.
- Bibliographic record for the primary book, verified in CiNii Books
  (NCID **BA51095584**): 侯精一《长治方言志》语文出版社, 1985.4, iii+134 p., 21 cm,
  in the series 《山西省方言志丛书》(温端政 主编). The 1993 report is NCID **BN12020190**
  (山西高校联合出版社, 1993.7, 9+746 p., 27 cm).
- **Dead end, documented**: there is **no 長治 volume** in 《現代漢語方言大詞典》
  (李榮 主編, 江蘇教育出版社) — the Shanxi/Jin volumes are 太原 (沈明, 1994), 忻州 (1995)
  and 萬榮 (1997) only. Do not go looking for one.
- Note 王利《長治縣方言研究》山西人民出版社, 2007.8 (NCID BA86921122) exists, but
  長治**縣** (now 上黨區) is a **different survey point** from 長治市區 — do not mix them.

CONFIDENCE: sourced, two independent print sources agreeing.

NOTES — **one conflict, and it is resolvable**:
zh.wikipedia's 上黨片 article prints a 7-tone row for 長治 — 陰平 213, 陽平 24,
上聲 535, 陰去 44, 陽去 53, **陰入 4, 陽入 21** — crediting 侯精一《現代漢語方言概論》
(2002) / 《現代晉語的研究》(2006) / 喬全生《晉方言語音史研究》(2008).
Those two entering values are **not citation tones**. Three things establish that:
- 侯精一 1985 prints a *second* table right after the citation table, of 入聲 in
  reduplicated / bound forms: 陰入 4 (襪~子), 21 (擦~~), 陽入 54 (席~子), 45 (拔~~).
- The 小學堂 凡例 for 《山西方言調查研究報告》 records the same phenomenon at p.500:
  「入聲動詞重疊式的前字逢古全濁聲母字今讀「45」，則「54」為該字單讀調；「45」應為
  語法變調」.
- The homophone groups above show 清/次濁/全濁 入 are not distinguished at all.
So: **one citation 入聲 ʔ54; 4 / 21 / 45 are combinatory forms.** Build the Han Map row
on ʔ54, and do not try to distinguish 陰入 from 陽入 by pitch.

Two further signs the 上黨片 row is unreliable rather than merely different:
zh.wikipedia's *other* Jin tone table (in the 晉語 article) gives 長治 as ʔ21/54 and
ʔ45/54 — which does not agree with the 上黨片 article's 4 / 21 either; and the 上黨片
table has visibly ragged provenance, with empty 陽去 cells for 黎城/屯留/沁源/沁縣/
武鄉/襄垣/晉城/陽城/高平 and empty 陽入 cells for 沁源/晉城/陽城/高平.
(That same 晉語 table, checked against 漢字音典 at points where both exist — 太原,
嵐縣, 大同, 朔州 — is otherwise exact, so the problem is specific to the 長治 row.)

Also note 上黨片's own defining split (沈明〈晉語的分區（稿）〉《方言》2006年第4期，
343–356) is 去聲分陰陽 + 入聲次濁聲母字的歸屬 — 長治小片 vs 晉城小片. 長治 **is** the
片's reference point and **does** split 去聲: 陰去 四 sɿ, 快, 菜, 去, 見 vs 陽去 路, 賣,
豆, 病, 大, 二, 樹, 父, 上, and 全濁上 動/坐 regularly joining 陽去. That split is real
and lexically minimal; only the *entering* split is spurious.

Where the entering tone **does** split in this 小片 — it does at neighbouring points,
which is probably how the error got in — **次濁入 goes with 清入 into 陰入**:
長子 陰入 44 (一七八骨竹福黑客尺 + 六綠熱業月木物落) vs 陽入 212 (讀石毒雜服活舌十);
壺關店上 陰入 21 (清+次濁) vs 陽入 5 (全濁); 壺關樹掌 is three-way (3 / 5 / 次陽入 243);
潞城微子 陰入 44 / 陽入 53. 晉城小片 (陽城, 高平) does not split 去聲 and has a single
入聲. 長治市區 has neutralised the entering split while keeping the 去 split.

WORD MAP CHECK: no Word Map row for 長治 — check is vacuous, nothing to contradict.

READINGS: **59 of the 61**, from 漢字音典's digitisation of 《長治方言志》 —
full list with 又讀 and gloss conditions in
`/home/jounlai/langmap-work/rally5/changzhi_61chars.txt`. Only **千** and **南** are
absent from its 3,230-character table. (The 小學堂 file separately supplies 21 of the
61, all 舒聲, and agrees on every one — see `readings61.txt`.)
Tone digits in that file are 1=陰平, 2=陽平, 3=上聲, 5=陰去, 6=陽去, 7=入聲(-ʔ), so they
map onto Reading A or Reading B alike; only the pitch numbers printed alongside are
Reading B's. Worth knowing before use: 一 and 八 have 陰平 colloquial variants
(i¹ 大年初一, pa¹ 八叉), 六 has a 陽去 variant in 六指子, 日 has four readings, and
行 is 陽平 in both 行列 and 行為 and 陽去 only in 品行.

---

## LECT: 呂梁 (Lüliang Jin, 晉語呂梁片; reference point 離石) — `cjy_lv`

TONES: **6 citation tones** (呂梁片 generally; the 汾州小片 that contains 離石 is
internally uniform in tone shape — 「汾州小片內部調型比較一致」)

```
  陰平   214    ← 古清平            例 三山心西風多
  陽平   44     ← 古濁平            例 人南雲牛魚來龍
  上聲   312    ← 古上聲 (清上 + 次濁上)   例 口耳火土鳥女
  去聲   53     ← 古去聲, NOT split into 陰/陽; incl. 古全濁上 (濁上歸去)   例 大
  陰入   ʔ4     ← 古清入
  陽入   ʔ214 / ʔ312   ← 古濁入
```

ENTERING-TONE CODAS: **-ʔ (glottal stop)**, retained — this is the feature that
defines 晉語 and the paper leans on it: 「由於全濁入保留著喉塞尾[ʔ]而無法對應於官話
方言」. The values are written ʔ4, ʔ214, ʔ312 throughout.

MIDDLE-CHINESE MAPPING for the 舒聲, verified by joining 小學堂 point 081 against its
廣韻 sheet: 陰平 213 ← 平·全清 58 + 平·次清 8; 陽平 44 ← 平·全濁 37 + 平·次濁 31;
上聲 312 ← 上·全清 16 + 上·次濁 14 + 上·次清 5; 去聲 53 ← 去 (全清 15 / 次清 9 /
全濁 18 / 次濁 15, unsplit) + **上·全濁 8** (濁上歸去). No 入聲 characters in that file.

SOURCE:
- **沈明、秋谷裕幸〈呂梁片晉語的過渡性特徵〉，《中國語文》2018年第4期.** §4.1, verbatim:
  「呂梁片晉語有6個單字調（汾西7調）。汾州小片內部調型比較一致，陰平214、陽平44、
  上聲312、去聲53（汾陽除外）、陰入ʔ4和陽入ʔ214/ʔ312。汾陽的去聲55與眾不同…」
  I read the full text on the CASS Institute of Linguistics site (今日語言學, 2018-10-08):
  http://ling.cass.cn/keyan/xueshuchengguo/cgtj/202112/t20211209_5380580.html
  (page numbers not obtainable — journal, year and issue only.)
- **Independent corroboration on 離石 specifically**: 小學堂 point `081 晉語_離石`
  (251 characters, from 侯精一、溫端政 主編《山西方言調查研究報告》山西高校聯合出版社,
  1993) gives 陰平 213, 陽平 44, 上聲 312, 去聲 53 — the same four 舒聲 values
  (213 vs 214 is a transcription difference of one degree). The 小學堂 凡例 for that
  report even discusses 離石 by name: 「離石『三』字聲調印刷為『24』，此方言並無24調 …
  依其他方言音韻分布一致性訂正為陰平『213』」, which independently confirms both the
  陰平 value and that 離石 has no 24. That file contains **no 入聲 character at all**,
  which is why the 入聲 values come from 沈明/秋谷 rather than from it.

CONFIDENCE: sourced. 舒聲 doubly attested; 入聲 from one refereed article.
The values are for **汾州小片 as a whole**, which is how 沈明/秋谷 state them; if a
點-specific 離石 table is wanted rather than a 小片 one, that is still open (see below).

NOTES:
1. **調類 → 中古 mapping**: 平 分陰陽 by 清/濁; 上 = 清上 + 次濁上; 去 = 清去 + 濁去 +
   全濁上 (Mandarin-style 濁上歸去); 入 分陰陽. Where 次濁入 goes is **not settled**:
   for 離石 (and 汾陽) the non-academic sources say 次濁入 → 陽入, while for the
   "typical" 呂梁山 points 臨縣/柳林/興縣/嵐縣 they say 次濁入 → 陰入, and two
   non-academic sources contradict each other on 臨縣. 沈明/秋谷 do not adjudicate.
   **Treat 次濁入 as an open question for this lect.**
2. zh.wikipedia 呂梁片's claim that 興隰小片 has 5 tones is **out of date**: 沈明 (2006)
   moved 興縣/嵐縣/靜樂/石樓/交口 into 汾州小片, and 沈明/秋谷 2018 give 隰縣 itself
   6 tones (陰平41 陽平24 上聲31 去聲55 陰入ʔ33 陽入ʔ21) and 汾西 7. The 6→5 reduction
   is a live merger of 陰平 with 上聲, in different directions at different points
   (興縣/嵐縣/石樓: 上聲→陰平; 永和/大寧: 陰平→上聲), not a 小片 property.
3. A point-level 離石 table circulating online (陰平 24, 陽平 44, 上聲 312, 去聲 52,
   陰入 ʔ4, 陽入 ʔ23, 次濁入歸陽入) credits 李小平《山西離石方言音系》2004, which
   **could not be verified** — not in the 山西省方言志叢書 list, not traceable in any
   reachable bibliography. Do not cite it. Note there is **no 《離石方言志》** in the
   山西省方言志叢書 (nor 汾陽, 臨縣, 中陽, 柳林) — 離石 has no dedicated monograph.

WORD MAP CHECK: **FAILS, and the failure is diagnostic.**
Word Map inventory ˥˦ ˥˧ ˦˥ ˧ ˨ ˨˩˧ ˩ ˩˩ = 54, 53, 45, 3, 2, 213, 1, 11.
Against the 呂梁 table only **53** overlaps. The three most diagnostic 呂梁 values —
44 (陽平), 312 (上聲), 214/213 (陰平) — are all absent, and 54 / 45 / 11 appear in no
published 呂梁 table.
But {11, 53, 45, ʔ2, ʔ54} **is exactly 太原 / 并州片**: zh.wikipedia 晉語's tone table
gives 太原 平聲 11, 上聲 53, 去聲 45, 陰入 ʔ2, 陽入 ʔ54 — and 小學堂's own 太原 point
(the parent `cjy` copies from) is the 并州片 reference. So the Word Map `cjy_lv` row
looks like it is **also carrying Taiyuan data**, i.e. the same copy problem the Han Map
row has, not an independent check. Flagging, not resolving.

READINGS: 22 of the 61, all 舒聲, from 小學堂 point 081 (see `readings61.txt`).
No 入聲 reading for any of the 61 is available from a source I could reach.

WHAT WOULD STILL SETTLE IT: 沈明/秋谷 2018 in print (for page numbers), or
《山西方言調查研究報告》(1993) 離石 聲韻調表 + 同音字表 for a 點-level table and the
61 readings, or 沈明《晉語的分區（稿）》《方言》2006年第4期 343–356.

## LECT: 桂林平話 (Guilin Pinghua, 桂北平話) — `cnp_gl`

Two Guilin points are published. **桂林(朝陽)** is the cleaner and more usable one;
**桂林(雁山竹園)** is the one the wider literature names as "the" 桂林 Pinghua sample.
Both have all 61 characters.

### Point A — 桂林(朝陽) [桂林市郊朝陽]  ← recommended

TONES: 6 tones. 調類 below are the source's own labels; the 中古 membership after
each is a join of the point's 字號 against 小學堂's 廣韻 sheet (`ccr03`), i.e. derived
from the data, not asserted.

```
  陰平   43    ← 平·全清 560 + 平·次清 249        例 三山川千天心金東西中多風
  陽平   22    ← 平·全濁 429 + 平·次濁 354        例 人南雲牛魚蟲龍來行
                 PLUS a large share of 入聲: 入全濁 57, 入次濁 50, 入全清 48, 入次清 37
                                                 例 十 siɛ²², 足 tsu²²
  上聲   23    ← 上·全清 298 + 上·次濁 181 + 上·次清 116 + 上·全濁 52 — NOT split
                 例 五九手口耳水火土小少長(生長)馬鳥女子母虎犬雨飲
  陰去   35    ← 去·全清 339 + 去·次清 150 (+ 去全濁 69, 上全濁 45 leakage)
                 例 四去見中(射中)少(少年)父
  陽去   21    ← 去·次濁 169 + 去·全濁 154 (+ 上全濁 83, 入全濁 57)
                 例 二萬地大下上(上面) / 目 mu²¹, 食 sai²¹
  入聲   55    ← 入·全清 175 + 入·次清 75 + 入·次濁 65 + 入·全濁 47
                 例 一六七八百血日月木北雪
```

ENTERING-TONE CODAS: **all lost.** No -p / -t / -k and no -ʔ anywhere in the point's
韻母 inventory (checked over all 4,366 rows). 入聲 survives only as a pitch category,
and only partially: it keeps most 清入 and 次濁入 at 55, while much of 全濁入 has gone
to 陽去 21 or 陽平 22. **A Han Map row must follow the per-character 調類 in the data,
not a blanket "入聲 = 55" rule.**

### Point B — 桂林(雁山竹園) [桂林市雁山區, 平聲話 group]

TONES: 6 tones, no 入聲 category at all — and **the source contradicts itself** on the
values (see NOTES 1). What the character data actually carries, with 中古 membership
joined from 廣韻:

```
  陰平   55    ← 平·全清 543 + 平·次清 227        例 三山川千天心金東西中多手
  陽平   44    ← 平·全濁 397 + 平·次濁 329        例 人南雲牛魚蟲龍來行
  陰上   33    ← 上·全清 271 + 上·次清 100        例 九口水火土小(生長)短少犬鳥子虎
  陽上   24    ← 上·次濁 148 + 上·全濁 34         例 五耳雨馬母女上(上山)
                 (小學堂 leaves the 調類 cell BLANK on these — see NOTES 1)
  陰去   53    ← 去·全清 318 + 去·次清 132 (+ 全濁去 50 leakage)
                 (小學堂 labels this simply 去聲, 陰/陽 having merged)
                 例 四中(射中)小少(少年)去見
  陽去   21    ← 去·次濁 158 + 去·全濁 150
                 PLUS the ENTIRE 入聲: 入全清 218, 入全濁 150, 入次濁 118, 入次清 108
                 例 二地大萬父 / 一六七八十百目木北血日月雪食 — all 21
```
The book's front-matter 音系 introduction gives different numbers for five of these:
`陰平 24, 陽平 33, 陰上 32, 陰去 35, 陽去 52`.

ENTERING-TONE CODAS: **all lost**, and the 入聲 *category* is gone too — every historical
入聲 character, 清 and 濁 alike, reads 21, merged with 陽去. That total merger is 竹園's
most distinctive property and the thing that makes it unlike Nanning.

SOURCE (both points):
- **謝建猷《廣西漢語方言研究》（上下冊）南寧：廣西人民出版社，2007，ISBN 978-7-219-05943-2.**
  This is the book behind 小學堂's 平話 dataset, and the attribution is explicit, not
  inferred: 小學堂's 凡例 page for it opens 「本資料庫所收《廣西漢語方言研究》係以謝建猷
  著之…為依據」 and then discusses **桂林（雁山竹園）**, 桂林（臨桂）, 永福（桃城）,
  靈川（潭下）, 陽朔（驥馬）, 富川（七都）, 百色（那畢）, 寧明（縣城） by name — i.e.
  exactly the points in the 平話 file set. https://xiaoxue.iis.sinica.edu.tw/ccr/Example/Example10
  (The one 平話 point that is *not* from this book is tagged in its own filename:
  `352 平話_百色(那畢)(平話音韻研究)` — that one is 李連進《平話音韻研究》南寧：廣西人民
  出版社，2000.)
- 小學堂 dataset points `343 平話_桂林(朝陽)` (4,366 rows) and `344 平話_桂林(雁山竹園)`
  (4,362 rows), https://xiaoxue.iis.sinica.edu.tw/ccrdata/ (Public Domain Mark).
- Weak corroboration for 竹園: the zh.wikipedia 廣西平話 infobox gives the endonym as
  桂林竹園音 [pɐn˦˦ fuə˨˩] — 平 (並母平 = 陽平) 44 ✓ and 話 (匣母去 = 陽去) 21 ✓,
  matching the 語料 reading rather than the front-matter reading.
- Shape corroboration from a separate 臨桂區 point: 〈廣西桂林市臨桂區會仙平話語音特點〉
  《欽州學院學報》2019年第2期 — abstract: 會仙平話 (same 平聲話 group as 竹園) has
  23 initials, 42 finals, **7 tones**, 古平、上、去三調按聲母清濁各分陰陽, and
  **部分入聲調歸入陽去**. Same shape as 竹園, one step less far along (竹園 has put
  *all* 入 into 陽去, giving 6 not 7). Abstract only; CNKI full text unreachable.

CONFIDENCE: sourced. 朝陽 clean; 竹園 sourced but internally contradictory.
The 中古 membership counts are **derived** (a deterministic join against 小學堂's own
廣韻 sheet), not printed in the book — label them as such if they are quoted.

NOTES:
1. **The 竹園 conflict is in the source, not in my reading of it.** 小學堂's 凡例 spells
   it out: 「桂林（雁山竹園）將陽去定為52，將陰去定為35，但語料描述多為陰陽去不分，今依
   語料輸入53為去聲。另桂林（雁山竹園）將陰平定為24，但其語料中多描述為55，今依語料
   輸入為55，其語料描述為24者，暫不輸調類。桂林（雁山竹園）將陰上定為32，但其語料中
   多描述為33，今依語料輸入為33。」 So the blank-調類 24 rows are *not* a separate tone
   — they are the residue of the front matter's 陰平=24 claim, and by 廣韻 membership
   (上次濁 148 + 上全濁 34) they are plainly the 陽上. If the Han Map row is built on
   竹園, say which of the two readings it follows.
2. **Do not use the zh.wikipedia 廣西平話 §聲調 block.** Its "九個聲調，同廣州話" table
   (陰平52, 陰上44, 陰去55, 陽平21, 陽上24, 陽去22, 陰入4, 中入24, 陽入2) is 桂**南**
   (Nanning-type) Pinghua, not Guilin, and the section is tagged 原創研究. Guilin Pinghua
   has *fewer* tones than Cantonese, not nine, and no stop codas.
3. **送氣分調 does NOT apply here.** 廣西平話 is known for an aspiration-conditioned
   tone split (趙媛〈廣西平話、勾漏片粵語送氣分調初探〉《語言學論叢》2025年第4期 140–150),
   but tested directly on the data, 全清 vs 次清 take identical 調值 within every
   category at **all eight** Guilin-area points (e.g. 竹園 平·全清 55×532 vs 平·次清
   55×151; 入·全清 21×207 vs 入·次清 21×78). 趙媛's split points are 靈川九屋 and
   靈川定江, neither of which is in this dataset. (That paper's PDF endpoint on
   ccj.pku.edu.cn is permanently broken — it 500s with `Invalid non-ASCII or control
   character in header: 0x8D75`, 0x8D75 being 「趙」 — so only the abstract is readable.)
4. Other Guilin-prefecture points in the same dataset, if a different reference point
   is wanted:

   | point | tones | values |
   |---|---|---|
   | 靈川(三街) | 6 | 陰平13 陽平533 上聲33 陰去35 陽去21 入聲54 (all 入), no codas |
   | 靈川(潭下) | 7 | 陰平24 陽平33 陰上32 陽上21 陰去35 陽去52 入聲45, no codas |
   | 臨桂(兩江) | 6 | 陰平35 陽平12 上聲33 陰去51 陽去31 入聲55 (residual; much of 入→31), no codas |
   | 臨桂(五通) 義寧話 | 7 | 陰平35 陽平21 上聲554 陰去33 陽去13 陰入55 陽入13 — **keeps -t, -k, -ʔ** (no -p) |
   | 永福(桃城) | 7 | 陰平35 陽平23 上聲33 陰去53 陽去21 陰入55 中入33, no codas |
   | 陽朔(驥馬) | 7 | 陰平33 陽平22 陰上42 陽上21 陰去24 陽去52 陰入35 (濁入→42/21), no codas |

   臨桂(五通) is the only nearby point that still has both 入聲分陰陽 and stop codas.
   Note that 東江土話 (the other 桂林市郊 variety) has **no published study** at all.

WORD MAP CHECK: no Word Map row for 桂林平話 — the check is vacuous, nothing to contradict.

READINGS: **all 61 characters, for both points** (a handful of 又讀 slots are blank in
the source: 下, 品行, 飲馬). See `readings61.txt`. This is the whole repair, not half of it.

## LECT: 撫州/臨川 (Fuzhou-Linchuan Gan, 贛語撫廣片) — `gan_fz`

TONES: **7 tones** — 平/去/入 each split 陰陽, 上聲 single. Two published readings
of the same system; they agree on structure and on 陰入低/陽入高, and differ on
some pitch values.

Reading A — 小學堂 point `192 贛語_臨川` (1,435 rows). Counts after each are a join
of the point's 字號 against 小學堂's own 廣韻 sheet (`ccr03`), i.e. **derived from the
data**, not printed in a book:
```
  陰平   22    ← 平·全清 192 + 平·次清 114
                 PLUS 上·全濁 18  ← the 撫廣片 signature (see NOTE 1)
                 例 千心山金東西中多天風上(上山)下(下來)鳥(文)
  陽平   24    ← 平·全濁 137 + 平·次濁 107
                 例 南長(長短)雲牛魚蟲行來龍
  上聲   35    ← 上·全清 89 + 上·次濁 79 + 上·次清 33 (+ 上·全濁 9) — NOT split
                 例 五手口耳水火土小短雨馬女長(生長)鳥(白)
  陰去   42    ← 去·全清 103 + 去·次清 54
                 例 四去
  陽去   11    ← 去·全濁 76 + 去·次濁 68 + 上·全濁 43 (濁上歸陽去)
                 例 二萬大地上(上面)下(底下)
  陰入   2     ← 入·全清 86 + 入·次濁 47 + 入·次清 41 (+ 入·全濁 10)
                 例 一六七八百足目血日北木雪
  陽入   5     ← 入·全濁 45 + 入·次濁 30
                 例 十月食
```
Two things fall straight out of that join and both are documented traits of the 片,
so they are corroboration rather than surprises:
- **古全濁上 splits three ways** — 陽去 43, **陰平 18**, 上聲 9. 「古全濁上聲字一部分或
  大部分字今讀陰平是該片的顯著特點」 (zh.wikipedia 抚州话 §主要特點).
- **次濁入 splits between 陰入 and 陽入** (47 vs 30), not wholly one way.
  「次濁入聲字一般有兩個走向，部分隨清，部分隨濁」 (zh.wikipedia 贛語 §音韻特徵).
  A Han Map row must therefore follow the per-character 調類, not a 清/濁 rule.

Reading B — zh.wikipedia 贛語 §聲調 representative-point table, row 撫州:
```
  陰平 32   陽平 24   上聲 45   陰去 51   陽去 212   陰入 2   陽入 5
```

ENTERING-TONE CODAS: **-p / -t / -k, all three, fully retained.** In the 臨川 data,
of 1,435 rows: 116 end in -k, 105 in -t, 40 in -p, 2 in -ʔ.
例 十 sɪp⁵, 心 sɪm²², 金 tɕim²² (-m/-p); 一 it², 八 pait², 日 ȵit², 月 niuot⁵ (-t);
六 tiuk², 目 muk², 木 muk², 百 pak², 北 pɛk² (-k). This matches the brief's
expectation for 撫廣片 (-k often realised [-ʔ], and 抚州话 zh.wikipedia notes
「[-t]韻尾也有人標作[-it]或[-iʔ]，[-k]尾實際發音多為[-ʔ]」).

**陰入 is LOW and 陽入 is HIGH — the reverse of Nanchang**, which is the single most
important thing the copied row gets wrong. For contrast, the same database's
`176 贛語_南昌` gives 陰入 4 / 陽入 1, codas -ʔ and -t only.

SOURCE:
- 小學堂 dataset point `192 贛語_臨川`. Its 贛語 material comes from the books in
  小學堂's 現代方言 參考書目; for the Jiangxi Gan points the two candidates are
  **李如龍、張雙慶 主編《客贛方言調查報告》廈門：廈門大學出版社，1992 (ISBN 7-5615-0385-7)**
  and **劉綸鑫《客贛方言比較研究》北京：中國社會科學出版社，1999 (ISBN 7-5004-2716-6)**.
  The database does **not** label which book each point came from, and I could not
  determine it: 客贛方言調查報告 used 34 points and a 1,320-character list, while the
  臨川/吉安 files carry ~1,376 distinct characters, which points away from it.
  **Flag this as an open citation question** before the row is credited to a book.
- zh.wikipedia 贛語 §聲調 (https://zh.wikipedia.org/wiki/贛語) for Reading B.
- **刘新中〈汉语方言单字调现有入声的调型〉**, in 《方言理論探索與建構（詹伯慧語言學獎
  專欄）》第18輯，頁 27–37, gives 臨川 **陽入 45 / 陰入 32** from acoustic measurement
  of 侯精一 主編《漢語方言音檔》上海教育出版社，2003 — a third, independent confirmation
  of 陰入低、陽入高 (and of 南昌 being 陰入 5(45) / 陽入 2(32), i.e. mirror-image).
  PDF: https://dialects.jnu.edu.cn/_upload/article/files/1b/59/41d54e8f4736822c53ce7e1641cd/d9323877-3f68-4d32-b43d-254b659576e3.pdf

CONFIDENCE: sourced (structure and 調類 mapping: high; exact pitch values: two
competing readings, see NOTES).

NOTES — **the Word Map check passes, and it discriminates between the two readings**:
Word Map inventory ˥ ˥˥ ˦˥ ˦˨ ˧ ˧˥ ˧˨ ˨˦ ˨˩ ˨˩˧.
- Reading A (小學堂/臨川): 24 ✓(˨˦), 35 ✓(˧˥), 42 ✓(˦˨), 5 ✓(˥), 2 ≈ ˨˩; 22 and 11
  are not in the inventory but ˨˩ is adjacent to both. **6 of 7 accounted for.**
- Reading B (wiki/撫州): 32 ✓(˧˨), 24 ✓, 45 ✓(˦˥), 212 ✓(˨˩˧), 2 and 5 ✓ —
  but **陰去 51 is absent from the inventory**, and 51 is exactly the value the two
  readings disagree on (A says 42, and ˦˨ *is* in the inventory).
So the Word Map row is compatible with both, and where they conflict it sides with
Reading A's 陰去 42 over Reading B's 51. Neither reading is contradicted outright.
A third possibility to be aware of: 羅常培《臨川音系》(商務印書館，1940；科學出版社
修訂本，1958) is the founding description of this lect and would be the ideal source,
but its 音值 differ from present-day 臨川縣城(上頓渡) and from 撫州市區 — the 抚州话
zh.wikipedia article documents those differences at length. Pick one point and say which.

READINGS: 49 of the 61. **Missing 12: 三 九 人 川 少 犬 父 母 子 見 飲 虎** — genuinely
absent from the source's character list, not a lookup failure (verified). See
`readings61.txt`.

---

## LECT: 吉安 (Ji'an Gan, 贛語吉茶片) — `gan_ja`

TONES: **4 tones only.** No 入聲 tone and no 入聲 rhymes. This is the headline fact:
the row copies 南昌's 7-tone system onto a 4-tone lect.

Counts are a join of the point's 字號 against 小學堂's 廣韻 sheet (`ccr03`) —
**derived from the data**, not printed in a book:
```
  陰平   334   ← 平·全清 198 + 平·次清 115
                 PLUS 入·全清 85 + 入·次濁 57 + 入·次清 39 (+ 入·全濁 11)
                 例 千山金東西中多天風 / 一 i, 七 tɕʰi, 八 pɛ, 百 pa, 足 tɕy~tsu,
                    目 mu, 血 ɕyɛ, 日 lɛ, 木 mu, 北 pɛ, 雪 ɕyɛ, 月 yɛ(又)
  陽平   11    ← 平·全濁 135 + 平·次濁 106
                 PLUS 去·全清 99 + 去·次清 47   ← the 吉安小片 diagnostic
                 例 南長(長短)雲牛魚蟲行來龍 / 四 sɿ¹¹, 去 kʰiɛ¹¹
  上聲   53    ← 上·全清 94 + 上·次濁 82 + 上·次清 34 (+ 上·全濁 8) — NOT split
                 例 五手口耳水火土小短雨馬女長(生長)鳥
  去聲   214   ← 去·全濁 77 + 去·次濁 68 + 上·全濁 55 (濁上歸去)
                 PLUS 入·全濁 37 + 入·次濁 17
                 例 二萬地大上下 / 十 sɛ, 六 liu, 食 sɛ, 月 yɛ(又)
```
Note the join makes both mergers exact rather than approximate: **古清去 (全清 99 +
次清 47) sits in 陽平**, and the 入聲 really does split by 清/濁 with 次濁入 going both
ways (57 to 陰平, 17 to 去聲).

The two mergers are the whole character of the lect and both are documented, not
inferred: 吉安小片's defining trait is 「縣市所在地除永豐、萬安外都是四個調類，無入聲
（萬安例外），**古清去同古濁平今合二為一**」, and 吉茶片 generally 「分宜、峽江、安福、
蓮花、萍鄉、寧岡、永新、吉水、**吉安**、泰和 通常依入聲字聲母的清濁分別派入陰平和陽去」.
(zh.wikipedia 吉安话 and 贛語 §分派.) Both are exactly what the character data shows.

ENTERING-TONE CODAS: **none.** No -p/-t/-k, no -ʔ, no 入聲 rhymes at all (checked
over all 1,437 rows). 吉茶片 is characterised as 「去聲多不分陰陽；多無入聲；鼻化韻豐富」.

SOURCE:
- 小學堂 dataset point `186 贛語_吉安` (1,437 rows) — same book-attribution caveat
  as 臨川 above (客贛方言調查報告 1992 vs 客贛方言比較研究 1999, unlabelled).
- zh.wikipedia 贛語 §聲調 representative-point table, row 吉安:
  陰平 34, 陽平 21, 上聲 53, 去聲 213 — the same four tones with the same shapes,
  independently.
- zh.wikipedia 吉安话 (吉安片/吉茶片) for the two merger statements; the 分片 text is
  ultimately from 《中國語言地圖集》第二版（張振興 主編，商務印書館，2012）.

CONFIDENCE: sourced, two independent sources agreeing on shape.

NOTES — **the Word Map check passes, and passes on a distinctive value**:
Word Map inventory ˥ ˥˧ ˦˥ ˦˨ ˧˧ ˧˧˦ ˧˩ ˨ ˨˩ ˨˩˧ contains ˧˧˦ = **334**, which is an
unusual contour and is exactly what the 小學堂 data gives for 陰平; ˥˧ = 53 = 上聲 ✓;
˨˩˧ = 213/214 = 去聲 ✓; ˨˩ ≈ 21 ≈ 陽平 11/21 ✓. All four categories are accounted
for, and 334 in particular could not be a coincidence. The remaining inventory
members (˥ ˦˥ ˦˨ ˧˧ ˧˩ ˨ ˩˧) are more than 4 tones' worth, so the Word Map row must
be carrying sandhi values from its polysyllabic entries — expected, not a problem.

READINGS: 49 of the 61, same 12 missing as 臨川 (三 九 人 川 少 犬 父 母 子 見 飲 虎).
See `readings61.txt`.

---

## What is NOT settled, and what would settle it

| lect | status | what is missing | what would settle it |
|---|---|---|---|
| 衡陽 | tone table sourced **three times over**; **Word Map conflict** | nothing in the tone table; only the conflict | 李永明《衡陽方言》(湖南人民出版社 1986) 音系 chapter; 彭蘭玉《衡陽方言語法研究》(中國社會科學出版社 2005); 肖霄 2013 (on the 入聲 reflex). Most useful next step is auditing where the Word Map `hsn_hy` row came from, not more tone hunting. |
| 長治 | sourced, 6 tones, two independent sources | 40 of the 61 readings, incl. every 入聲 | 侯精一《長治方言志》語文出版社 1985 同音字表 (p.18 has the tone table) |
| 呂梁/離石 | sourced (小片-level); **Word Map row looks Taiyuan-derived** | a 點-level 離石 table rather than a 汾州小片 one; where 次濁入 goes; 39 of 61 readings, and all 入聲 readings | 沈明、秋谷裕幸〈呂梁片晉語的過渡性特徵〉《中國語文》2018(4) in print (page nos.); 《山西方言調查研究報告》(1993) 離石 聲韻調表 + 同音字表 |
| 桂林平話 | sourced (謝建猷 2007), 2 points, **all 61 readings** | which of the two Guilin points the row should be; 竹園's front-matter-vs-語料 conflict; no page numbers | 謝建猷《廣西漢語方言研究》(2007) 桂林 音系 pages; 《廣西通志·漢語方言志》(廣西人民出版社 1998) 桂林市郊 table |
| 撫州/臨川 | sourced, two pitch readings | which book 小學堂 took 臨川 from; 12 of 61 readings | 李如龍、張雙慶《客贛方言調查報告》(1992) vs 劉綸鑫《客贛方言比較研究》(1999) — check whether 臨川 is a point in the former; 羅常培《臨川音系》 |
| 吉安 | sourced | which book; 12 of 61 readings | same as 臨川 |


---

# Lower-priority questions from the end of the brief

All three are answered.

## `nan_th` (Thai Hokkien), the character 行 — **sandhi is not the explanation; 55 is wrong**

行 is **陽平 in every one of its Hokkien readings**, so in a row whose 陽平 is ˧˥ (35),
行 should be 35 — not 55.

| reading | tone | category | gloss |
|---|---|---|---|
| kiânn / kiâⁿ | 第5聲 | **陽平** | walk (白讀) |
| hîng / hêng | 第5聲 | **陽平** | 行為, 行李, 行動, 行醫 (文讀) |
| hâng | 第5聲 | **陽平** | 行列, 銀行 gîn-hâng, 行情, trade |
| hīng | 第7聲 | 陽去 | 品行, 厚行 kāu-hīng |

Source: 教育部《臺灣台語常用詞辭典》 headword 行 (five readings),
https://sutian.moe.edu.tw/und-hani/tshiau/?lui=tai_su&tsha=%E8%A1%8C , with the tone
key at https://sutian.moe.edu.tw/und-hani/piantsip/tailo-phiautsu-suatbing/ .
Middle Chinese basis (韻典網 https://ytenx.org/zim?dzih=%E8%A1%8C): 行 is 匣母 (fully
voiced) throughout — 戸庚切 and 胡郎切 are 平聲 → 陽平; 下更切 / 下浪切 are 去聲 → 陽去.
Pre-war corroboration: 小川尚義 主編《臺日大辭典》臺灣總督府, 1931–32 — kiâⁿ A0236,
hâng B0537, hêng B0630 (all 陽平), hēng B0630 (陽去).
Per-variety IPA (en.wiktionary 行): kiâⁿ = Xiamen/Quanzhou/Jinjiang/Taipei/**Singapore**
/kiã²⁴/, Zhangzhou /kiã¹³/, Kaohsiung /kiã²³/; hâng /haŋ²⁴ ~ haŋ¹³ ~ haŋ²³/;
hêng /hiɪŋ²⁴ ~ hiɪŋ¹³ ~ hiɪŋ²³/. **Not one 55 anywhere.**

**It is not sandhi either.** Hokkien 陽平 sandhi is uniformly LOW:
廈門 24→22, 臺北 24→11, 臺南 24→33, 泉州 24→22, 漳州 13→22, 檳城 13→22.
MoE's rule is 第5聲 → 第7聲 (漳) or → 第3聲 (泉), both low. Huang Yishan 2018
(*Tones in Zhangzhou*, ANU PhD) Table 6-7 p. 127: Yangping phrase-initial → mid level
[33]; Table 6-20 p. 140: Yangping → Yangqu. **No source gives 陽平 a 55 reflex.**

**Most likely cause: Teochew contamination.** Teochew 陽平 **is** ˥˥ 55 (汕頭 55, 潮州 55,
揭陽 55 — 林倫倫《新編潮州音字典》汕頭大學出版社, 1995, pp. 559–562), and Wiktionary's
Teochew 行 is literally /kĩã⁵⁵/, /heŋ⁵⁵/, /haŋ⁵⁵/. Thailand's Chinese community is
Teochew-dominant — 潮州人 over 40% of ~6 million, vs 閩南泉漳人 16% (zh.wikipedia
東南亞福建話). For a *Thailand* list, a stray Teochew 55 on 行 is the obvious diagnosis.

Two premises in the brief did **not** check out: there is no source describing a
high-level 55 in Penang Hokkien (its inventory is 44/53/21/3ʔ/23/21/4ʔ), and there is
**no published phonological description of Phuket/Thai Hokkien tones** reachable at all —
its only documented affiliation is as 北馬福建話, Zhangzhou-derived via Penang.

**Recommended fix**: 行 → the row's own 陽平 value (35), or the 陽去 value if 品行 hīng
was what was meant.

## `dds` (Donno So, Dogon) — **both values are wrong, and both are real Donno So words with other meanings**

| | dataset | correct (dds) |
|---|---|---|
| dog | ~~gɛɛ~~ | **ìdú** (pl. ìdú-mbè) |
| tree | ~~ti~~ | **tìmmɛ́** (pl. tìmmɛ́-mbè) |

SOURCE: **Heath, Jeffrey. 2016. *A Grammar of Donno So or Kamma So (Dogon language
family, Mali)*. Ann Arbor: University of Michigan. 384 pp. CC-BY-4.0.**
- **p. 41**, table (19) "Nonhuman nouns": `ìdú | ìdú-mbè | 'dog'` and
  `tìmmɛ́ | tìmmɛ́-mbè | 'tree'`
- p. 67, table (65b): `ìdú` 'dog' → `ìdù-î:` 'puppy'
- p. 17, §3.2 on geminates: 「mm : ɛ́mmɛ̀ 'we', **tìmmɛ́ 'tree'**, ɔ́mmù 'rotten'」 — the
  geminate -mm- is what distinguishes Donno So here from Tommo So's single -m-.
Landing page https://deepblue.lib.umich.edu/handle/2027.42/123062 ; the PDF itself is
403 to non-browser clients, readable via the Wayback copy
https://web.archive.org/web/20221201063214id_/https://deepblue.lib.umich.edu/bitstream/handle/2027.42/123062/A%20grammar%20of%20Donno%20So%20or%20Kamma%20So%20downsized.pdf

**What the two wrong forms actually are, in Donno So itself** (Heath 2016):
`gɛ̌:` = **'say'** (11 occurrences) and **'hunger/famine'** (p. 45 `gɛ̀:-gí-nɛ̀`
'malnourished one'); `gɛ̂ŋ` = **'black'**; `gɛ̀` = 'husband'. `tí` = **'send'**;
`tì` = 'indeed, exactly'; and in Tommo So `tíí` = **'one'**.
A plausible extraction trap is visible in the grammar itself — **p. 188, §11.1.2.3,
example (301): `wôw-wôw gɛ̌:` = '(dog) bark'**, an English gloss string with "dog"
sitting next to `gɛ̌:`.

**Neither form means this anywhere in Dogon**, checked exhaustively:
- Heath, McPherson, Prokhorov & Moran. 2015. *Dogon Comparative Wordlist* (10,072 rows
  × 14 varieties), https://cdstar.eva.mpg.de/bitstreams/EAEA0-C97A-A1D2-2E76-0/a.xls
  via https://dogonlanguages.info/sources/heathetal2015 . Row 16 'dog': ìjú, nènú,
  ìnjɛ̌-m, ìnjɛ̀, ìjú, ìšú, ìzú, nɛ̀rⁿî, ǹjèrû-m, ŋ̀gwɛ̌:, ìsé, ìsí, ínjɛ̀. Row 2963
  'tree': tɛ̀wⁿɛ́, tìwⁿá, tìwⁿɛ̌yⁿ, tìmè, tìwⁿé, tìwⁿɛ́, tùmá, tìměyⁿ, tìmɔ̂:, tìmɛ́,
  tìmɛ́, tíníŋgɔ̀. A sweep for `g/ŋg + ɛ(ɛ/:)` over all 10,072 × 14 gave 19 hits, **none**
  'dog' — they are 'hunger', 'granary', 'kitchen', 'wall niche', 'pass by' and 'say'.
- ASJP, all 63 Dogon lects: 'dog' is uniformly i-/u-/n-/ŋ-initial, **zero gEE**; 'tree'
  is timE/timme/timu/tiwn̄E/tuma/…, **zero bare ti**.
  https://asjp.clld.org/languages/DONNO_SO_3.json literally has
  `11 one ti · 21 dog idu · 23 tree timE · 71 say gE · 91 black gE*` — i.e. the dataset
  has taken the *'one'* and *'say'/'black'* slots and filed them under tree and dog.
- Of ~7,600 ASJP wordlists worldwide, **no language has both dog=gEE and tree=ti**, so
  this is not a mis-assigned ISO code from a neighbour — it is a gloss mis-mapping.

Compare Tommo So (dto), the usual confusion source and **not** the origin here:
dog = **ìsé**, tree = **tìmɛ́** (McPherson, Laura. 2009. *A Tɔmmɔ-Sɔ – English – French
Dictionary*, https://cdstar.eva.mpg.de/bitstreams/EAEA0-FDD4-99B1-265A-0/a.pdf ) — it has
`gɛ̀ // say // dire` and no bare gɛɛ headword at all.

Two practical notes: **`dogonlanguages.org` is dead** — the domain was lost and now
serves casino spam; the live project site is **`https://dogonlanguages.info`**, worth
fixing in any stored reference. And **Kervran is not digitised anywhere reachable** —
Heath 2016's bibliography cites Kervran, Marcel. 1993. *Dictionnaire dogon–français,
Donno Sɔ, Région de Bandiagara*, 2nd ed., Brussels: R. Deleu, plus Kervran & Prost 1969
*Les parlers dogon I: Donno so* (Dakar) and Kervran & Prost 1986 *Un parler dogon, le
Donno Sɔ* (Bandiagara, 188 pp.); the Dogon project catalogues them with no file attached.
Heath 2016 supersedes them for this purpose anyway.

## `atb` (Zaiwa) — **the two notations are two different systems, not two spellings**

`tsa51` is **numeric-IPA** (CASS convention: segmental IPA + a Chao pitch value).
`kyoq` / `sui` are **the Latin orthography**, which **by design does not write tone at
all**. They cannot be merged; the row has to pick one.

The two example cells were identified: **`kyoq` = [kʲoʔ21] 'snow'** (徐悉艰、徐桂珍 1984,
词汇附录 p. 155, 雪 kjoʔ˩) and **`sui` = [sui21] 'blood'** (same, p. 160, 血 sui˩; same
form in lexibank/hillburmish). So the "orthographic tone letters" reading of `-q` was
wrong — see below.

**The standard orthography**: Latin, 26 letters, created **1957** (《載瓦文方案》(草案),
中國科學院少數民族語言調查第三工作隊 + Yunnan language workers), **revised 1981**;
standard variety 龍准話, 潞西縣西山, Dehong. 28 initials, 86 finals, three tones.
Conventions: [kʲ]=**j**, [kʰʲ]=**q**, tense/creaky vowel = **v** after the initial
(bv dv gv zv mv nv lv rv yv…), finals a e i o u / ai au ui oi / -m -n -ng / -p -t -k /
**-q = [ʔ]**. Sources: 中國國家圖書館 中國記憶項目「景頗文與載瓦文」
https://memory.nlc.cn/topic/resource/87 (「现行的载瓦文创制于1957年」); zh.wikipedia
載瓦語 §新載瓦文, citing **朵示擁湯 2010《Zaiwa Laigva Ngvapgva Pazhi 景頗族載瓦文讀寫
基礎知識》德宏民族出版社, ISBN 978-7-80750-279-1**; Omniglot
https://www.omniglot.com/writing/zaiwa.htm .

**Tone is not marked.** Two independent statements: 《中國少數民族史》「声调不用字母表示」
and zh.wikipedia (citing 朵示擁湯 2010)「和景颇文一样，载瓦文不标声调」. The consequence
is a real merger: **`myang` is simultaneously mʲaŋ55 '長久', mʲaŋ21 '馬', mʲaŋ51 '見'**
(minimal triple in both zh.wikipedia and Xu & Xu 1984 p. 13). Omniglot's remark that
tone "can be indicated with numbers, diacritics or letters, however this is optional"
contradicts every Chinese source and its own tone-less chart — discount it.

**`-q` is the glottal-stop coda [ʔ]**, the fourth member of the -p -t -k set — not a tone
letter and not a checked-tone diacritic. Checked syllables still carry ordinary tone
(kʰʲuʔ55 'six' vs kʲoʔ21 'snow'), unwritten like any other. The letter q does double
duty: word-initially [kʰʲ], syllable-finally [ʔ].

**`kyoq` is not PRC 載瓦文 — there are two Roman orthographies.**

| | [kʲ] | [kʰʲ] | coda [ʔ] | tone |
|---|---|---|---|---|
| PRC 載瓦文 (1957/1981) | **j** | **q** | -q | **not written** |
| Myanmar / Kachin-style Atsi | **ky** | hky | -q | **written** (´ ` ˆ) |

So the PRC spelling of 'snow' is **`joq`**, not `kyoq`. The Myanmar system is what the
Zaiwa New Testament uses ("Chyoiyúng chyumlaiká: dangshikaq asik",
https://www.bible.com/languages/atb ) and what Omniglot's numerals show (hkyuq, xê).
**The `atb` row is mixing PRC-style and Myanmar-style spellings as well as mixing
notations.**

**Tone inventory: THREE tones, 55 / 21 / 51** — 徐悉艰、徐桂珍《景頗族語言簡志（載瓦語）》
中國少數民族語言簡志叢書, 北京: 民族出版社, 1984年10月第1版, 176 pp., 統一書號 9049-38,
**p. 13 §三、聲調**: 「载瓦语的声调有三个」 — ˩21 (kjo˩ 聽, mjaŋ˩ 馬), ˥55 (kjo˥ 落,
mjaŋ˥ 長久), ˥˩51 (kjo˥˩ 耽誤, mjaŋ˥˩ 見); p. 6: 28 initials, codas -m -n -ŋ -p -t -k -ʔ.
Full scan: https://archive.org/details/20220317_20220317_1106 .
**The brief's "four tones including a checked tone" is not what any Chinese source says**,
and en.wikipedia's "five tones" rests only on Ethnologue plus an unpaginated Lustig
reference — discount both. Variant values you will meet: 簡志 1984 (西山) writes the low
tone 21; zh.wikipedia (following 何勒臘 2016《載瓦語語音研究》上海師範大學博士論文) writes
22 and adds a conditioned rising allotone 35.

**A published basic vocabulary, in IPA**: the 簡志's 《詞彙附錄》 **pp. 155–175**, ~1,300
items by semantic field — but note it is in **IPA with Chao tone letters, not in 載瓦文**;
the 簡志 never mentions the orthography at all. The wordlist that **is** in the standard
orthography is 中國社會科學院民族研究所 編《漢載詞典 Myiwa Zaiwa Dangzhi Zhvum》成都:
四川民族出版社, 1992, vi+iv+1150 pp., ~37,000 entries — **not online**. Also unreachable:
藪司郎 1982『アツィ語基礎語彙集』(ILCAA, vi+134 pp.) and **Lustig, Anton. 2010.
*A Grammar and Dictionary of Zaiwa*, Brill's Tibetan Studies Library 5/11, 2 vols.
(ISBN 9789004184893 / 9789004190160)** — every route to Lustig's text was blocked, so
**what transcription Lustig uses is unknown**; it was not guessed at.

**Recommendation**: pick one system and state it.
- *Orthographic route*: cells must **lose their tone numbers entirely** (`tsa51` → `za`),
  and you must choose PRC 載瓦文 vs Myanmar Atsi, because `kyoq` is Myanmar-style and its
  PRC equivalent is `joq`. PRC 載瓦文 is "the standard orthography" in the sense the
  question asks (state-promulgated, Dehong, 德宏民族出版社 textbooks).
- *Numeric-IPA route*: keep the CASS superscript convention with the **55 / 21 / 51**
  inventory, sourced to 徐悉艰、徐桂珍 1984 (noting the 簡志 prints Chao letters, so you
  are transposing) or to 黃布凡《藏緬語族語言詞彙》1992 via lexibank/hillburmish.

A caution on any word list assembled this way: an IPA↔orthography alignment for Zaiwa
is **not published anywhere**. Spellings derived from the letter chart are reconstructions,
not citations, and only a handful are directly attested (`loq` hand, `sui` blood,
`myang`, `ngo` I, and Myanmar-style `kyoq` snow).
