# Syllabary source findings

Research date: 2026-09-09. Response to `codex-brief-syllabaries.md`.

The sources below establish modern category-to-value tables for Hengyang,
Linchuan, and a specifically identified Guilin village. They do **not** establish
six complete Middle Chinese-to-modern mappings or six replacement syllabaries.
Unverified values and historical splits are deliberately left unresolved.
No Han Map or Word Map data was changed.

Two issues in the brief need resolving before repair:

- The supplied character string contains **67 characters**, not 61. Its literal
  length was counted; this does not establish how many characters the actual
  Han Map stores.
- Word Map inventories are evidence to investigate, not an authoritative veto
  on published descriptions. Differences can reflect provenance errors,
  localities, generations, transcription conventions, or contextual tones.
  None of those explanations has been established for these rows. Matching an
  inventory is not sufficient validation, and a mismatch does not by itself
  invalidate a published source.

LECT: 衡陽 (Hengyang Xiang), `hsn_hy`

TONES: 6 in the traditional system reproduced in Huang's study

    陰平 45  ˦˥
    陽平 11  ˩˩
    上聲 33  ˧˧
    陰去 24  ˨˦
    陽去 213 ˨˩˧
    入聲 22  ˨˨

SOURCE: Yaqian Huang, 2022, “The tonal system of Hengyang Xiang,”
*The Journal of the Acoustical Society of America* 152(4), A286,
DOI 10.1121/10.0016290. The author-uploaded conference poster has a comparison
table assigning these values to Li (1986), Peng (2005), Li (2007), and Zhong
(2011). [Abstract and poster text](https://www.researchgate.net/publication/365844233_The_tonal_system_of_Hengyang_Xiang).

CONFIDENCE: sourced for modern categories and values; incomplete for historical
清/次濁/全濁 redistribution.

NOTES: The poster also reports Chen (1982): 陰去34; Yang (2007): 陰平55,
陰去35. Its acoustic results suggest 214 is a better description of traditional
213. These are attributed comparisons, not independently inspected originals.
No 51 occurs in this traditional table: the brief's Word Map inventory remains
unexplained. The poster is not a complete historical correspondence table.

The book to obtain is 李永明, 1986, 《衡阳方言》, 长沙：湖南人民出版社,
495 pages. A contemporary review identifies it and discusses differences from
the 1935 survey, including six versus four tones. The review points to
pp. 670–688 of 《湖南方言调查报告》 for that older survey; those are **not**
page numbers for Li's tone table. [Contemporary review](https://www.persee.fr/doc/clao_0153-3320_1986_num_15_2_1212).

LECT: 長治 (Changzhi Jin), `cjy_cz`

TONES: unresolved against an inspected original dialectological table.

SOURCE: 侯精一, 1985, 《长治方言志》, 北京：语文出版社, 134 pages.
The book's existence and bibliographic details are confirmed; its tone-table
pages were not accessible in this search.
[Book record](https://books.google.com/books/about/长治方言志.html?id=JfkXAAAAMAAJ).

CONFIDENCE: uncertain for the requested system; bibliographic lead confirmed.

NOTES: Obtain the volume's single-character tones, connected-speech tones,
and homophone table together. Do not substitute Huguan or another point simply
because it is administratively within Changzhi. The city's own account
distinguishes urban/suburban, older/younger, and Han/Hui speech; it also describes
historical 次濁入 grouping as a regional diagnostic, rather than supplying a
citywide numerical mapping. [Changzhi government description](https://www.changzhi.gov.cn/zjzz/zzgk/czjj/index.shtml).

No numerical table is promoted here from an encyclopedia or teaching slide.
The primary-source verification requested in the brief remains outstanding.

LECT: 呂梁 (Lüliang Jin), `cjy_lv`

TONES: unresolved; first identify the intended survey point.

SOURCE: 李小平, 2004, 《山西离石方言音系》,
《吕梁教育学院学报》第4期. This citation is confirmed in a journal's
reference list, but I did not obtain the article or its page range.
[Journal reference list](https://yyyj.cbpt.cnki.net/portal/journal/portal/client/paper/27eb1bb69c4b1667eb09df34bc2b4b18).

CONFIDENCE: uncertain for tones; bibliographic lead confirmed indirectly.

NOTES: The repository's own `wordmap_meta.js` describes `cjy_lv` as a group,
with Lishi commonly serving as a representative point. It explicitly says
the group has varying tone inventories and sandhi. Therefore, a Lishi table
would be a candidate only after establishing that the row actually represents
Lishi. The eight listed Word Map contours do not identify a locality or eight
phonemic tone categories. Obtain Li's article and the provenance of the Word
Map entries before choosing a system.

LECT: 桂林平話 — 朝陽鄉歐家村 (Guilin Pinghua, Oujiacun), candidate for `cnp_gl`

TONES: 6

    陰平 53 ˥˧  ← 清平
    陽平 13 ˩˧  ← 濁平; most 全濁入
    上聲 33 ˧˧  ← 清上、次濁上; some 全濁上
    陰去 35 ˧˥  ← chiefly 清去; some 濁上/濁去
    陽去 21 ˨˩  ← 濁去, with lexical redistributions
    入聲 5  ˥   ← chiefly 清入、次濁入; short

SOURCE: 陈海婷, 2022, 《桂林市城区土话语音研究》, master's thesis,
广西师范大学. Tone table: printed p. 10. Historical discussion:
pp. 81–83, especially tables 97–99.
[Thesis text](https://www.scribd.com/document/793092675/桂林市城区土话语音研究-陈海婷).

CONFIDENCE: sourced from the accessible thesis transcription; page-image
verification remains necessary before importing individual readings.

NOTES: The author specifies that 陽平13 is phonetically closer to 12.
Historical arrows summarize tendencies, not exceptionless rules. The text
documents lexical exceptions and loss of stop codas. Its four villages have
different systems; this table does not identify an unspecified “Guilin” row.
Oujiacun, Shangyangjiacun, and Aishantang have six categories; Hongguang has
seven. Select the actual locality before repair. The homophone tables provide
a route to character readings, but no complete target-character extraction was
verified here.

LECT: 撫州／臨川 (Fuzhou–Linchuan Gan), `gan_fz`

TONES: 7 in Dai's fieldwork presentation

    陰平 31 ˧˩
    陽平 24 ˨˦
    上聲 35 ˧˥
    陰去 41 ˦˩
    陽去 23 ˨˧
    陰入 3  ˧  (source notation: 3q)
    陽入 5  ˥  (source notation: 5q)

SOURCE: 戴虎腾 (Huteng Dai), 2018, 《临川话的两字组变调——基于制约条件的音系研究》,
thesis-defense slides, PDF p. 4, figure 1; p. 5 contains the sandhi table.
[Author-hosted slides](https://hutengdai.wordpress.com/wp-content/uploads/2018/05/e6af95e4b89ae7ad94e8bea9.pdf).

CONFIDENCE: sourced for the modern tone labels and values; incomplete for
historical initial-conditioned splits and individual codas.

NOTES: The slides distinguish two 陰去41 sandhi behaviors and show contextual
changes; do not treat every Word Map contour as a citation tone. This inventory
does not explain the brief's inventory. Preserve `q` as the source's checked-tone
notation here; it does not supply a per-character -p/-t/-k/-ʔ analysis.

The associated work is Dai, 2017, *Explaining Disyllabic Tone Sandhi in Linchuan*,
lingbuzz/003751. Its announcement is accessible, but the full manuscript could
not be retrieved during this search. No missing historical mapping is inferred
from the conventional 陰/陽 labels.
[Manuscript announcement](https://websites.umass.edu/phonolist/2018/01/20/dai-2017-explaining-disyllabic-tone-sandhi-in-linchuan/).

LECT: 吉安 (Ji'an Gan), `gan_ja`

TONES: unresolved from a reliably legible original table.

SOURCE: 谢留文, 2006, 《赣语的分区（稿）》, 《方言》3:264–271,
table 6, 吉安市 row. An accessible reproduction contains the requested
category/value table, but its OCR corrupts both digits and column alignment.
I have not converted that OCR into asserted values.
[Article reproduction](https://www.scribd.com/document/891872395/2006谢留文赣语的分区-稿).

CONFIDENCE: uncertain for numerical transcription; table located.

NOTES: A clear image of table 6 would settle the numerical reading of this
particular source. Historical 次濁 splits and lexical exceptions still require
the underlying locality description.

A second concrete lead is 张国文, 2018, 《吉安话字调的语音格局和连调表现》,
中国人民大学本科毕业论文, completed 2018-05-04, supervisor 吴永焕. The university
record confirms that it investigates citation tones and disyllabic sandhi;
the abstract supplies no numerical table.
[University thesis record](https://bklib.ruc.edu.cn/docinfo.action?id1=7f849da101f8c7f047a21c3d971ab16e&id2=WRF3jU5V9Pw%253D).

READINGS: No complete, verified character/surface/IPA list supplied for any row.

LOWER-PRIORITY ITEMS: Thai Hokkien 行, Donno So dog/tree, and the Zaiwa spelling
mixture remain unresolved. They did not fall out of these sources; no sandhi
explanation, lexical replacement, or orthographic conversion is proposed.

REPAIR STATUS: All six rows remain unready for a full sourced replacement.
The useful output is three inspectable modern tone tables, one specifically
localized historical mapping with exceptions, and concrete acquisition targets
for the remaining gaps. A modern category table alone cannot repair segments,
reading layers, exceptional historical reflexes, or codas.
