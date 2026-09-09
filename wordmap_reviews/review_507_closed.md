# Rally 2 — Prose & metadata review: `blr`, `rbb`, `srh`

Reviewed at commit `ed55ef5c`. Files: `/home/jounlai/langmap/wordmap_meta.js`,
`/home/jounlai/langmap/lang_names.js`. No files were edited.

## Summary

3 BLOCKERs, 17 FIXes, 14 NOTEs. Nothing wrong with the source URLs — all four resolve and
point at the right languoid. The three showstoppers are one false ethnographic claim
(`rbb` drum tower), one false genetic claim (`srh` Wakhi), and one unsupported country
(`blr` Laos); each is propagated identically into all 19 languages.

| # | Sev | Field | In one line |
|---|---|---|---|
| 2 | **BLOCKER** | `srh.description.*` | Wakhi named a "closest relative"; it is a separate branch of Eastern Iranian |
| 3 | **BLOCKER** | `rbb.description.*` | "villages built around a drum tower" — that is the Dong (侗族), not the De'ang |
| 28 | **BLOCKER** | `blr.countries` + `blr.description.*` | Laos unsupported for `blr`; what is in Laos is Samtao `stu` |
| 4 | FIX | `blr.description.*` | Waic has 8 languages, not 3; Wa + Parauk double-counts one language |
| 5 | FIX | `srh.description.*` | speakers ≠ the whole Tajik nationality (~10K speak Wakhi) |
| 7 | FIX | `srh.speakers` | "~20K" matches no source; range is 16K (2000) to 40K (Kim 2017) |
| 8 | FIX | `rbb.description.*` + `coverageNote` | "not tonal" flat, but Liu Yan 2006 recorded Rumai **at Ruili** as tonal |
| 9 | FIX | `rbb.description.*` + `coverageNote` | "Ruching or Bulei" mis-equates; `zh` 鲁清 unattested; intelligibility overstated |
| 10 | FIX | `rbb.speakers` | ethnic count used as speaker count for a Rumai-only row Glottolog calls moribund |
| 11 | FIX | `rbb.description.en` + `countries` | Baoshan missing; Lincang is a city, not a prefecture |
| 12 | NOTE | `blr.countries` | UNESCO sentence is fine; the field omits Pu'er (Lancang), where Jingmai is |
| 13–20 | FIX | `lang_names.js` ↔ descriptions | 8 rows where the selector label and the prose disagree |
| 21 | FIX | `srh.description.*` | "stone tower" → "stone fortress"; `zh` is right, `en` is wrong |
| 22 | FIX | `srh.description.de/hi/ar/he/sw` | "Turkic" rendered as "Turkish" |
| 29 | FIX | `blr` + `rbb` | 2010 census figures in rows framed around 2023 |
| 30 | FIX | `blr.speakers` | "~40K" is the Yunnan Blang-proper figure; `blr` is ~55–68K |
| 1, 6, 16b, 23–27, 31–33 | NOTE | various | style, transliteration, and eight checks that came back clean |

§3 (translation faithfulness), §4 (the Sarikoli contrast) and the specific name forms in §5
are clean — details at the bottom. **Also read "Working-tree drift"** near the end: another
thread edited `blr` and `rbb` while this review was running and has left three field-vs-prose
contradictions that did not exist at `ed55ef5c`.

---

## §2 — Source URLs

**CLEAN, with one nit.** All four URLs resolve HTTP 200 and point at the correct languoid:

| URL | HTTP | Page identity | Verdict |
|---|---|---|---|
| `https://glottolog.org/resource/languoid/id/blan1242` | 200 | "Spoken L1 Language: **Blang**", ISO 639-3 `blr`, Glottocode `blan1242` | correct |
| `https://glottolog.org/resource/languoid/id/ruma1248` | 200 | "Spoken L1 Language: **Rumai Palaung**", ISO 639-3 `rbb` | correct |
| `https://glottolog.org/resource/languoid/id/sari1246` | 200 | "Spoken L1 Language: **Sarikoli**", ISO 639-3 `srh`, coords 37.905 N / 75.145 E (Tashkurgan) | correct |
| `https://iecor.clld.org/` | 200 | IE-CoR landing page | resolves |

Glottolog classification paths pulled from `…/<id>.newick.txt` (used as evidence below):

- `blan1242`: Austroasiatic < Khasi-Palaung < Palaungic < **East Palaungic** < **Waic** < **Bulangic** < Blang
- `ruma1248`: Austroasiatic < Khasi-Palaung < Palaungic < **West Palaungic** < Rumai Palaung
- `sari1246`: Indo-European < Classical IE < Indo-Iranian < Iranian-Nuristani < Iranian < **Central Eastern Iranian** < **Shughni-Yazgulami** < **Shughnic** < Sarikoli
- `wakh1245` (Wakhi, for comparison): Indo-European < … < Iranian < **Saka-Wakhi** < Wakhi

---

## Findings

### 1. NOTE — `srh.sources[0].url`
The IE-CoR link is the bare site root `https://iecor.clld.org/`, while the source
title names a specific doculect ("doculect Sarikoli"). A doculect-specific page
exists and resolves: `https://iecor.clld.org/languages/sarikoli` (HTTP 200).
Pointing the source at the languoid page would match how the Glottolog sources in
the same rows are done. Not a blocker — the current link is alive.
Verified: `curl` HTTP 200 on both.

---

### 2. BLOCKER — `srh.description.en` (and all 18 translations) — "closest relatives … Shughni and Wakhi"

Text: *"Its closest relatives are the other Pamir languages, Shughni and Wakhi."*

Wakhi is **not** a close relative of Sarikoli, and "Pamir languages" is not a genetic node.
Three independent lines say so:

1. **Wendtland, "The Position of the Pamir Languages within East Iranian",
   *Orientalia Suecana* LVIII (2009), abstract**: *"The Pamir languages are a group of East
   Iranian languages which are linguistically quite diverse and **cannot be traced back to a
   common ancestor**. The term 'Pamir languages' is based on their **geographical position
   rather than on their genetic closeness**."* And p. 173: the Shughni-Roshani group is
   *"closely related to Yazghulami and Sarikoli, whereas languages like Munji and Yidgha,
   **or Wakhi, seem to be more isolated**."*
2. **Kim 2017, *Topics in the syntax of Sarikoli* (Leiden), §1.2.1** — the standard modern
   grammar, and the MED Glottolog itself cites for this languoid: *"There is general agreement
   that the Pamir languages constitute a common Pamir **sprachbund, or areal grouping, rather
   than a genetic grouping** … etymological evidence suggests that **Sarikoli, Shughni,
   Rushani, and possibly Yazgulyam comprise a genetically-related subgroup, whereas the
   others — such as Wakhi, Ishkashimi, Munji, and Yidgha — are not closely related
   genetically**."* Kim elsewhere: Shughni and Rushani are *"the most closely-related
   languages to Sarikoli"*, and Sarikoli and Wakhi are *"mutually unintelligible"* — their
   speakers reportedly fall back on **Uyghur** to talk to each other.
3. **Glottolog's own tree** splits them at the top of Iranian:
   `sari1246` < Shughnic < Shughni-Yazgulami < **Central Eastern Iranian** < Iranian, but
   `wakh1245` < **Saka-Wakhi** < Iranian directly. Wakhi is a sister of the whole Central
   Eastern Iranian node.

So the sentence makes an areal grouping read as a genetic one, and names as a "closest
relative" a language that is neither closely related nor mutually intelligible — exactly
the class of over-confident assertion this rally is looking for.

Corrected English:

> Its closest relatives are Shughni and Rushani, spoken across the border in Tajikistan and
> Afghanistan, with Yazghulami close behind. It is usually grouped with Wakhi and the other
> "Pamir languages", but that grouping is geographic, not genetic — Wakhi is a divergent
> branch of Eastern Iranian, and the two are not mutually intelligible.

This error is faithfully propagated into **all 18 translations**, so fixing `en` requires
re-doing the corresponding clause in ja/ko/zh/yue/vi/th/id/hi/de/fr/it/es/pt/ru/uk/ar/he/sw.

Sources: [Wendtland 2009](https://www.diva-portal.org/smash/get/diva2:305485/FULLTEXT01.pdf);
[Kim 2017](https://scholarlypublications.universiteitleiden.nl/access/item:2942888/view);
`https://glottolog.org/resource/languoid/id/sari1246.newick.txt`;
`https://en.wikipedia.org/wiki/Pamir_languages`.

---

### 3. BLOCKER — `rbb.description.en` (and all 18 translations) — "De'ang villages are built around a drum tower"

Text: *"They are a tea-growing people, and De'ang villages are built around a drum tower."*

The drum tower (鼓楼) is the signature village building of the **Dong (侗族)**, not the
De'ang. Chinese ethnographic sources are consistent that a De'ang village centres on a
Buddhist temple hall (**奘房**) and pagoda (**佛塔**) — "寨中最好的建筑物是供奉佛像的
奘房", and by De'ang custom a stranger entering a village should first pay respects at the
佛寺. De'ang dwellings are 干栏式竹楼 (stilt bamboo houses); the village markers listed for
a De'ang settlement are the 德昂大房子, 大公房/小公房, the "龙阳塔" marker, and the 奘房/佛塔.
The De'ang **water drum** (水鼓) is a dance instrument, not a tower — 德昂族水鼓舞 entered
China's 4th national ICH list on 11 Nov 2014, centred on 出冬瓜村, Santaishan De'ang Township,
Mangshi. (A second candidate confusion is the Wa 木鼓房 "wooden-drum house" — also not De'ang.)

The Dong source is worth quoting because it is almost word-for-word the sentence this row
wrote: 中国非遗网 on the Dong drum tower — *"鼓楼是侗寨最神圣不可侵犯的建筑，只要是侗族村寨，
都必有鼓楼…**鼓楼位置的选定，往往就是村寨寨址与布局的确立，村寨的民房和道路等也以鼓楼为圆心
而向外延伸**"* ("the village houses and roads extend outward with the drum tower as their
centre"). The Dong live in Guizhou/Guangxi/Hunan, ~1,500 km from Dehong. What is actually
central to a De'ang village: 三台山的德昂族村寨共有14座佛寺…**娤房通常修在村寨的最高处**…
**称为村寨中最醒目的标志** — the monastery on the village's highest ground.

Corrected English (one option):

> They are a tea-growing people, and a De'ang village is built around its Buddhist temple
> hall and pagoda.

Propagated verbatim into all 18 translations (ja 太鼓の櫓, ko 북을 두는 누각, zh 鼓楼,
yue 鼓樓, vi tháp trống, th หอกลอง, id menara genderang, hi ढोल-मीनार, de Trommelturm,
fr tour à tambour, it torre del tamburo, es/pt torre del tambor / torre do tambor,
ru барабанной башни, uk барабанної вежі, ar برج للطبل, he מגדל תופים, sw mnara wa ngoma).

Sources: `http://www.ynmzyx.cn/zh-hans/content/642` (德昂族：寨中最好的建筑物是供奉佛像的奘房);
`https://www.visitbeijing.com.cn/article/47QosCuLksx` (云南民族村 德昂村: 奘房、佛塔、龙阳塔);
`https://www.ihchina.cn/news_1_details/11438.html` and
`http://www.jyb.cn/rmtzcg/xwy/wzxw/202310/t20231026_2111108611.html` (鼓楼 as the Dong village landmark).

---

### 4. FIX — `blr.description.en` (and all 18 translations) — "the three together make up the Waic side of Palaungic"

Text: *"Its closest relatives are Wa and Parauk, which this atlas carries as separate rows,
and the three together make up the Waic side of Palaungic."*

Two problems.

(a) **Waic holds eight languages, not three.** Glottolog's `waic1245` subtree:

```
Waic
├─ Bulangic:  Blang [blr], Samtao [stu]
└─ Wa-Lawa
   ├─ Lawa:  Eastern Lawa [lwl], Western Lawa [lcp]
   └─ Nuclear Waic:  Awa [vwa], South Wa / Parauk [prk],
                     Xiyun Va, Zhenkang Wa / Vo [wbm]
```

Wikipedia's Waic article adds Meung Yum, Savaiq, En, Son/Hsem and (Hsiu 2015) Tai Loi.
The atlas itself carries a **fourth** Waic row — `lwl` Eastern Lawa (`LANG_DATA['lwl']`,
wordmap_meta.js:386) — so the claim is contradicted inside the same file.

(b) **Wa and Parauk are not Blang's closest relatives, and listing both double-counts.**
Blang sits in Bulangic; Wa and Parauk sit in the coordinate branch Wa-Lawa (Nuclear Waic).
Blang's actual closest relative is **Samtao**, which the atlas does not carry. Worse,
Ethnologue splits one Wa into three codes — **prk Parauk** (majority/standard), **wbm Vo**
(Zhenkang Wa), **vwa Awa** — and notes "all may be called Wa, Awa, Va, or Vo". So "Wa and
Parauk" reads as two coordinate relatives when it is one language cut two ways; the atlas's
own labels (`wbm` "Wa", `prk` "Parauk Wa") already show this.

Corrected English:

> Its closest relatives are the Wa and Lawa languages, which together with Blang make up
> the Waic branch of Palaungic; this atlas carries two of them, Wa and Parauk, as separate
> rows. Blang's own nearest kin is Samtao, which is not mapped here.

Sources: `https://glottolog.org/resource/languoid/id/waic1245` (Newick export — subtree
membership and the Bulangic / Wa-Lawa split); `https://en.wikipedia.org/wiki/Wa_language`;
`https://en.wikipedia.org/wiki/Waic_languages`.

---

### 5. FIX — `srh.description.en` (and all 18) — "Its speakers are the people China classifies as its Tajik nationality"

The equation is not exact, and the row states it without hedging. China's Tajik nationality
covers **three** speech communities. Kim 2017 §1.1.1, verbatim: *"The ethnonym 'Tajik
(塔吉克族)' in China covers Iranian peoples who speak three distinct native languages:
**Sarikoli**, spoken by the majority, **Wakhi** (also Eastern Iranian), and **Uyghur**
(Turkic). … The remainder of the Tajik ethnicity in China speaks Wakhi or Uyghur as their
primary language."* The Uyghur-speaking group is the "Tor Tajiks".

The size of the exception is not trivial: the 国家民委 (State Ethnic Affairs Commission)
page gives *"使用色勒库尔语的塔吉克人数约3万，使用瓦罕语的人数约1万"* — about **10,000
Wakhi speakers**, i.e. roughly a fifth of the nationality (50,896 in the 2020 census).
Sarikoli and Wakhi are themselves mutually unintelligible.

Corrected English:

> Its speakers make up the great majority of the people China classifies as its Tajik
> nationality; a minority of that nationality speak Wakhi, a different and only distantly
> related Eastern Iranian language, and a small group speaks Uyghur.

`zh` makes this *worse* than the English by using 就是 ("are precisely"): "使用者就是中国
划分的塔吉克族". Same for `yue` "講嘅人就係中國劃做塔吉克族嗰班人". Both should be softened
to 大多数是/大多數係.

Sources: [国家民委 塔吉克族](https://www.neac.gov.cn/seac/ztzl/tjkz/gk.shtml);
[Kim 2017](https://scholarlypublications.universiteitleiden.nl/access/item:2942888/view);
`https://en.wikipedia.org/wiki/Tajiks_in_China`.

---

### 6. NOTE (checked, holds) — `srh.description.*` "the only country where it is spoken"

I flagged this for checking because Ethnologue's free page currently describes Sarikoli as
"an endangered indigenous language of **China and Pakistan**", and English Wikipedia follows
with `states = China, Pakistan` (citing Rensch 1992), giving the region as "Pamir Mountains
(Tashkurgan, China, and Chitral, Pakistan)".

**The atlas is right and those two references are stale.** The Pakistani community is
ethnically Sarikoli but no longer speaks the language: Abdullah, Aziz & Pieroni, "Plant Use
Adaptation in Pamir: Sarikoli Foraging in the Wakhan Area, Northern Pakistan", *Biology*
11(10):1543 (2022), documents the 60 Sarikoli of Lashkargaz village, Broghil Valley, Upper
Chitral — migrants from Taxkorgan in 1932/1948 who have **"completely lost the language"**,
third-generation speakers having shifted to Wakhi or Khowar. Kim 2017 states flatly that
Sarikoli is *"the only Indo-European language spoken **exclusively in China**."* No
Sarikoli-speaking community exists in Tajikistan, Gorno-Badakhshan or Afghanistan — the
historic migration ran the other way, out of Upper Bartang.

No change required. Recording it so the next rally does not "correct" the row toward
Ethnologue. A one-clause hedge would be defensible but is not needed.

Sources: [Abdullah et al. 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9599004/);
[Kim 2017](https://scholarlypublications.universiteitleiden.nl/access/item:2942888/view);
`https://www.ethnologue.com/language/srh/`.

---

### 7. FIX — `srh.meta.speakers` `'~20K'` and `srh.description.*` "roughly 20,000"

The figure matches **no** source I could find, and it sits below the whole range the
literature actually gives:

| Figure | Year | Source |
|---|---|---|
| 16,000 | 2000 | Ethnologue 18, the figure most databases propagate (en-Wikipedia infobox) |
| ~25,000 | 2006 | Arlund 2006 (PhD diss., UT Arlington) |
| **~30,000 (约3万)** | current | **国家民委, official**: "使用色勒库尔语的塔吉克人数约3万" |
| **~40,000** | 2017 | **Kim 2017**, from the 2010 census: "there were 51,069 Tajiks in China. Since the majority of Chinese Tajiks speak Sarikoli, we estimate that there are about 40,000 speakers of Sarikoli" |
| ~35,000 | undated | en-Wikipedia body text, Omniglot |

For context the Tajik nationality was **51,069 (2010 census)** and **50,896 (2020 census)**;
Tashkurgan county 37,843 → 39,946 over the same period.

"~20K" is neither the old database figure nor a current estimate. Pick one and stamp its
year — `'~30K'` (国家民委) or `'~40K (2010 census basis)'` (Kim 2017) are the best supported;
`'~16K (2000)'` if the atlas prefers Ethnologue consistency with sibling rows. Then make
`description.*` in all 19 languages agree. This is the "census figures from mismatched
years" class flagged from the sibling rally.

Sources: [Kim 2017](https://scholarlypublications.universiteitleiden.nl/access/item:2942888/view);
[国家民委 塔吉克族](https://www.neac.gov.cn/seac/ztzl/tjkz/gk.shtml);
`https://en.wikipedia.org/wiki/Sarikoli_language`.

---

### 8. FIX (near-blocker) — `rbb.description.en` (and all 18) + `rbb.meta.coverageNote` — "not tonal"

`en`: *"The language is unwritten and, unlike most of its neighbours, is not tonal."*
`coverageNote`: *"The language is not tonal."* Both flat, no hedge.

The literature is **genuinely split, and the one study that recorded Rumai at Ruili — the
very place this row's doculect comes from — found it tonal.**

- **Liu Yan (2006)《孟高棉语声调研究》** surveyed three De'ang points and reports:
  **Guangka Village, Mengxiu Township, Ruili (Rumai) = [ru˥mai˦˩˨], 有声调 (tonal)**;
  Mengdan Village, Santaishan, Luxi (Bulei) = 无声调 (non-tonal); Guanshuang Village,
  Mengman, Xishuangbanna = tonal. This row's forms are from **Nan Sang village, Ruili,
  Dehong** — the same county Liu recorded as tonal.
- **Chinese descriptive tradition — not tonal**: zh.wikipedia 德昂语, summarising the
  standard description: *"声调有平调、降调二调，**但不用于区别语义，所以德昂语并非声调语言**"*
  — pitch exists but is non-contrastive. That is a register/phonation language, matching
  Sidwell's Proto-Palaungic clear-vs-breathy register.
- **Deepadung & Buakaw (2015) — the row's own source family — list no tones at all** in
  their full synchronic phonology of Raokot (which they argue is a sub-dialect of Rumai);
  "tone" appears in that paper only in a bibliography entry. Absence of a tone inventory is
  not the same as a positive finding of tonelessness.
- Milne / Shorto / Sidwell / Ostapirat treat Palaung as non-tonal with register; Ostapirat
  (2009) subgroups Palaung purely by segmental innovations, never by tone.

So "not tonal" is not supportable flat, and neither is "tonal". Suggested English:

> The language is unwritten and, unlike its Tai and Chinese neighbours, is not a classic
> tone language — descriptions give it a register or voice-quality contrast instead, though
> tone has been reported for some varieties, Rumai near Ruili among them.

The `coverageNote` sentence needs the same hedge, since it is what a re-deriver will trust.

Sources: Liu Yan 2006, via `https://en.wikipedia.org/wiki/Palaung_language` (village-level
citations); `https://zh.wikipedia.org/zh-hans/德昂语`;
[Deepadung & Buakaw 2015](https://so03.tci-thaijo.org/index.php/JLC/article/download/240599/163742/);
`https://kyoto-seas.org/pdf/15/2/150204.pdf`.

---

### 9. FIX — `rbb.description.*` and `coverageNote` — "Rumai, Ruching or Bulei, and Raojin"

Three separate problems in one clause, all repeated in the `coverageNote`
("Rumai (汝买), Ruching or Bulei (布雷) and Raojin (若进)") and in all 18 translations.

(a) **"Ruching or Bulei" is not an equation.** "Ruching" is the **Ethnologue English label
for ISO `pce`**, and Ethnologue lists `pce`'s China varieties as **Bulei 布雷 *and* Raojin
若进** — i.e. Ruching is a cover term spanning two of the three Chinese dialects, not a
synonym for the first of them. As written, the row lists Raojin as a third item coordinate
with a label that already contains it. Correct framing: the Chinese three-way split is
**布雷 / 汝买 / 若进**; Rumai = `rbb`, and Bulei + Raojin together = `pce` "Ruching".

(b) **`zh` 鲁清 and `yue` 魯清 are unattested.** I could find no Chinese source using 鲁清
for a De'ang subgroup — it is a back-transliteration of the English label "Ruching" into
Chinese, presented alongside two genuine Chinese ethnonyms (汝买, 若进) as if it were one.
This is the "unattested native term presented as if sourced" class from the sibling rally.
Drop 鲁清/魯清 and write 布雷 alone, or gloss Ruching as an Ethnologue cover term.

(c) **"not readily mutually intelligible" is overstated.** The Chinese descriptions say the
three differ **mainly in phonology, secondarily in vocabulary, with grammar essentially
identical** (民族文化资源库 / 德昂语); they do not say the dialects cannot converse. The
`rbb`/`pce` ISO split supports Rumai being distinct, not a three-way failure of
intelligibility. Suggested: *"three main varieties that differ mainly in pronunciation;
Rumai is distinct enough to carry its own ISO code."*

(d) Two further wrinkles worth knowing, not necessarily worth stating: **Deepadung (2011) —
the very survey this row's forms come from** — found **five** sub-groups in Dehong (Pule,
Raojin, Liang, Rumai, Raokot), grouped as Raojin / Rumai-Raokot / Pu-le-Liang; and en.wiki
(Yan & Zhou 2012) gives the third variety as **Liang 梁**, not Raojin.

Sources: `https://www.ethnologue.com/language/pce/`;
[国家民委 德昂族](https://www.neac.gov.cn/seac/ztzl/daz/gk.shtml);
[Deepadung & Buakaw 2015](https://so03.tci-thaijo.org/index.php/JLC/article/download/240599/163742/).

---

### 10. FIX — `rbb.meta.speakers` `'~20K in China, more in Myanmar'`

Two problems.

(a) The `speakers` field is a **speaker** count, but 20,000 is the size of the **De'ang
nationality**, which the `en` description correctly frames as an ethnic figure ("The De'ang
nationality of China numbers about 20,000"). The row is **Rumai only** — one of three
varieties — so `~20K` cannot be its speaker count. Glottolog's own endangerment line for
`ruma1248` reads "AES status: **moribund** … Rumai (2473-) = **Severely endangered**",
which is irreconcilable with a 20,000-speaker row.

(b) "more in Myanmar" badly undersells what the `en` description says in the same row:
"several hundred thousand across the border in Shan State". The two fields disagree in
magnitude.

Suggested: `speakers:'Rumai variety only; De\'ang nationality of China ~20K, Ta\'ang in Myanmar several hundred thousand'`.

Source: `https://glottolog.org/resource/languoid/id/ruma1248`.

---

### 11. FIX — `rbb.description.en` / `rbb.meta.countries` — Baoshan is missing, and Lincang is a city

(a) **Baoshan is omitted.** 国家民委, verbatim: *"比较集中的分布在**保山地区的保山市**，
**德宏傣族景颇族自治州**的潞西市、瑞丽市、盈江县、陇川县、梁河县，**临沧地区**的永德县、
镇康县、耿马傣族佤族自治县"*, and *"分布在云南省**3个地州9个县市**"*. Both `en` ("Dehong
and Lincang prefectures") and `countries:'China (Yunnan: Dehong, Lincang), …'` name two of
the three. Note also that Pu'er/Simao appears in zh.wikipedia's list but **not** in the
NEAC three-prefecture list — treat Pu'er as unconfirmed and leave it out.

(b) **Lincang is a prefecture-level city (临沧市), not a prefecture**; Dehong is an
autonomous prefecture (德宏傣族景颇族自治州), and Baoshan is likewise a 地级市. Several
translations are *more* accurate than the English here — `zh` 德宏州和临沧市,
`yue` 德宏州同臨滄市, `ja` 徳宏州と臨滄市, `ko` 더훙주와 린창시,
`th` เขตปกครองเต๋อหงและเมืองหลินชาง — while `de` ("Bezirken"), `ru` ("округах"),
`fr` ("préfectures"), `es`/`pt`/`it`/`hi` follow the English's error.

Suggested English: *"…lives in Dehong Prefecture and in Lincang and Baoshan in western
Yunnan"* — and add Baoshan to `countries`.

Source: [国家民委 德昂族](https://www.neac.gov.cn/seac/ztzl/daz/gk.shtml).

---

### 12. NOTE — `blr.meta.countries` omits Pu'er (Lancang), where the Jingmai property the description features actually is

**The UNESCO sentence itself is accurate — every element of it checks out.** Property name
"Cultural Landscape of Old Tea Forests of the Jingmai Mountain in Pu'er"; inscribed **2023**
(extended 45th session, Riyadh, 17 Sept 2023), criteria (iii) and (v), China's 57th World
Heritage site and its first on tea; UNESCO's own OUV statement credits *"the Blang and Dai
peoples"* and says the landscape was *"developed over a thousand years… following practices
that began in the 10th century"* — so "which they and the Dai have tended for a thousand
years" is UNESCO's own wording, not an inflation. Nothing to fix in the prose.

**The gap is in `countries`.** UNESCO locates the property in *"Huimin Town, Pu'er City,
Yunnan Province"* — Huimin Town (惠民镇) is in **Lancang Lahu Autonomous County, Pu'er City**
— while `countries:'China (Yunnan: Xishuangbanna, Lincang), Myanmar, Thailand, Laos'` lists
neither Pu'er nor Baoshan. 国家民委 puts Blang in **澜沧** and **墨江** (both Pu'er) and in
**保山、施甸、昌宁** (Baoshan) among the ~50,000 scattered outside Menghai. Since the
description builds its longest sentence on Jingmai and the reader has just been told the
speakers are in Xishuangbanna, the field should say so: add **Pu'er (Lancang)** and
**Baoshan**, or name Lancang/Pu'er in the sentence itself.

Sources: `https://whc.unesco.org/en/list/1665`;
[国家民委 布朗族](https://www.neac.gov.cn/seac/ztzl/blz/gk.shtml);
`https://english.news.cn/20230918/47ab977fe6a24bffbef7854c67366ca7/c.html`.

---

### 13. FIX — `blr.description.ru` and `blr.description.uk` — the language name is misspelled throughout

Both use **"Благ"** (ru) / **"Благ"** (uk) as the language name, consistently: "Благ —
австроазиатский язык…", "120-тысячной народности **благ**", "**Благи** принадлежат…",
"В деревнях **благов**". The `н` is missing — and "благ" is a real Russian word (genitive
plural of *благо* "a good, a blessing"), so the sentence reads as gibberish to a Russian
reader.

Worse, `lang_names.js` gives `ru: "Бланг"` and `uk: "Бланг"` — with the `н` — so the row
contradicts its own name entry in the same two languages.

Separately, neither form is the **established** Russian name. Russian references use
**булан / буланский язык** (ru.wikipedia "Буланы"; china.org.cn Russian service
"Национальность булан"). Decide between the established *буланский* and a consistent
transliteration *бланг*, then make `lang_names.js` and `description` agree.

Sources: `https://ru.wikipedia.org/wiki/Буланы`,
`http://russian.china.org.cn/russian/32453.htm`.

---

### 14. FIX — `blr.description.ko` contradicts `lang_names.ko`

`lang_names.js` → `ko: "부랑어"`. `blr.description.ko` → **"블랑어"** (used four times:
"블랑어는…", "중국 블랑족", "블랑 사람들", "블랑족 마을"). The established Korean name is
**부랑족 / 부랑어** (ko.wikipedia 부랑족; Busan Ilbo "중국의 소수민족(4) 부랑(布朗)족"),
so `lang_names.js` is right and the description is the deviation. Change the description to
부랑어 / 부랑족 throughout.

Sources: `https://ko.wikipedia.org/wiki/부랑족`,
`https://www.busan.com/view/busan/view.php?code=19980204000755`.

---

### 15. FIX — `lang_names.ja['srh']` contradicts `srh.description.ja`

`lang_names.js` → `ja: "サリコリ語"`. `srh.description.ja` → **"サリコル語"** (used three
times). The established Japanese name is **サリコル語** (ja.wikipedia article title
サリコル語; also glossed タシュクルガン語). `lang_names.js` is the one to change.

Source: `https://ja.wikipedia.org/wiki/サリコル語`.

---

### 16. FIX — `srh.description.de` uses "Sariqoli", every other field uses "Sarikoli"

`lang_names.de['srh'] = "Sarikoli"`, and all 18 other descriptions use Sarikoli /
サリコル / 색勒库尔 / سريكولية etc. The German description alone spells it **Sariqoli**
(four occurrences). Pick one; German Wikipedia's article is "Sariqoli", so the cleanest fix
is to change `lang_names.de` to match — but the two must not disagree as they do now.

Not an error, for the record: `de`'s **"Taxkorgan"** (rather than Tashkurgan) is the
**official PRC romanization** of 塔什库尔干 and is what German Wikipedia uses. Leave it.

---

### 16b. NOTE (checked, holds) — `srh.description.*` "Sarikoli is unwritten"

Defensible as stated — Kim 2017: *"Sarikoli does not have an officially implemented
orthography yet"*; 中国塔吉克族没有官方文字 — and `script:'Unwritten (Uyghur and Chinese used
in writing)'` is a fair summary. Recording only that three orthographies do exist in
practice, so a future rally does not read "unwritten" as an error: (1) a modified Uyghur
Perso-Arabic alphabet used informally; (2) a Roman orthography by the Sarikoli native
speaker Neikramon Ibrukhim, with a 2012 primer, circulated on social media; (3) scholarly
transcriptions by Gao Erqiang (塔吉克语简志 1985) and Pakhalina (1966). No change needed.

---

### 17. FIX — `blr.description.th` and `blr.description.vi` contradict their own `lang_names` entries

- `lang_names.th['blr'] = "ภาษาปลัง"` (= **Plang**, the autonym) but
  `blr.description.th` calls the language **ภาษาบลัง** ("Blang") and then says
  "ผู้พูดเรียกตัวเองว่า**ปลัง**" — i.e. the name entry uses the autonym while the
  description treats that same word as a *different* name the speakers use for themselves.
  The selector label and the prose contradict each other.
- `lang_names.vi['blr'] = "Tiếng Bố Lãng"` (Sino-Vietnamese of 布朗) but
  `blr.description.vi` opens "**Tiếng Blang** là một ngôn ngữ Nam Á…" and never mentions
  Bố Lãng. A user who clicks "Tiếng Bố Lãng" reads about "Tiếng Blang".

---

### 18. FIX — `lang_names.ar['rbb']` / `lang_names.he['rbb']` contradict their descriptions

- `ar`: name is **"الدآنغية (رومي)"**, description is **"الدعانغ … الروماي"**. Two
  different Arabic renderings of De'ang (الدآنغ vs الدعانغ) and of Rumai (رومي vs الروماي)
  in the same row. Additionally **رومي** is a live Arabic word meaning "Roman / Byzantine /
  Greek" — a poor choice for Rumai; **روماي** is the safe rendering. And **الدعانغ** inserts
  ‎ع‎ (ʿayin) where the source name has a glottal stop; a hamza/alif rendering (الدأانغ /
  الدآنغ) is closer.
- `he`: name is **"דהאנג (רומאי)"**, description is **"דעאנג"** — two different Hebrew
  spellings of De'ang in the same row (ד**ה**אנג vs ד**ע**אנג).

---

### 19. NOTE — `lang_names.hi['srh']` vs `srh.description.hi`

Name is **सरीकोली**, description is **सारिकोली** — the two long vowels are swapped between
the entries. Harmonise.

Same class, lower stakes: `lang_names.he['srh'] = "סריקולי"` vs description **"סאריקולית"**.

---

### 20. NOTE — `yue` names use 語, `yue` descriptions use 話 (all three rows)

`lang_names.yue`: 布朗語 / 德昂語（汝買）/ 色勒庫爾語. Descriptions: 布朗**話**, 德昂**話**,
色勒庫爾**話**. Both are natural Cantonese and this looks deliberate, but the three rows are
consistently inconsistent with their own labels. Flagging so it is a decision, not a drift.

---

### 21. FIX — `srh.description.en` (and 18 translations) — "'stone tower'" should be "stone fortress"

Turkic **taş** 'stone' + **qorğan / qurgan** '**fortress**, fortified place'. en-Wikipedia
*Tashkurgan*: *"The town is named after a stone fortress to its north; Tashkurgan
accordingly means '**stone fortress**' in the Turkic languages."* The Chinese historical
name **石头城** ("stone city", i.e. a walled fort) says the same. *Qorğan* is
**Turkic** in origin — Old Turkic *qori-* 'to guard' / *qur-* 'to build'; Persian قرغان is
itself a borrowing from Turkic — so "in Turkic" is right even though "tower" is not.
"Stone tower" looks like a bleed-through from Ptolemy's *Lithinos Pyrgos*, whose
identification with Tashkurgan is one of four candidate sites and **not** the leading one
(Daraut-Kurgan and Sulaiman-Too/Osh are more commonly argued). The row does not make the
Ptolemy claim, which is correct — do not add it.

Because of this, `zh`'s 「意为**石头城**」 is *more* accurate than the English, while
`yue`'s 「解作**石頭塔**」 follows the English error. Fix `en` to "stone fortress", bring
`yue` to 石頭城/石堡, and check the other 17 (de Steinturm, fr tour de pierre, it torre di
pietra, es/pt torre de piedra/pedra, ru каменная башня, uk кам'яна вежа, ar برج الحجر,
he מגדל אבן, ja 石の塔, ko 돌탑, th หอหิน, vi tháp đá, id menara batu, hi पत्थर की मीनार,
sw mnara wa mawe — all currently "tower").

Sources: `https://en.wikipedia.org/wiki/Tashkurgan`,
`https://en.wikipedia.org/wiki/Stone_Tower_(Ptolemy)`,
`https://en.wiktionary.org/wiki/kurgan`.

---

### 22. FIX — `srh.description.de` "auf Türkisch" means "in Turkish", not "in Turkic"

`en` says the name means 'stone tower' **in Turkic** (the family). German **"auf Türkisch"**
unambiguously means the Turkish language of Turkey. Correct: *"und der Name bedeutet in
einer Türksprache 'Steinturm'"* or *"…ist türkischen Ursprungs und bedeutet 'Steinturm'"*.

Same slip, softer, in:
- `hi`: "इस नाम का **तुर्की** में अर्थ है" → should be तुर्किक
- `ar`: "ومعنى الاسم **بالتركية**" → should be بإحدى اللغات التركية / بالتركيّة (اللغات)
- `he`: "ופירוש השם **בטורקית**" → בשפה טורקית / בטורקית (משפחת השפות)
- `sw`: "katika **Kituruki**" → katika lugha za Kituruki

Correctly handled (Turkic, not Turkish) in: `ja` テュルク語, `ko` 튀르크어, `zh` 突厥语,
`yue` 突厥語, `th` ภาษาเตอร์กิก, `id` bahasa Turkik, `vi` tiếng Turk, `ru` по-тюркски,
`uk` тюркською. The Romance four (`fr` en turc, `it` in turco, `es` en turco, `pt` em turco)
are ambiguous rather than wrong.

---

### 23. NOTE — `srh.description.sw` "Wilaya Huru" mistranslates "Autonomous County"

**Huru** is "free / independent". An autonomous county is *Wilaya inayojitawala* (or
*Wilaya ya Kujitawala*). As written it reads as though Tashkurgan were an independent
territory.

---

### 24. NOTE — `blr.description.vi` "tiếng Thái / người Thái" for Dai, next to "Thái Lan"

`vi` renders Dai (傣) as **tiếng Thái** / **người Thái** — defensible Vietnamese usage — but
the same paragraph also says the Blang live near communities in **Thái Lan** (Thailand), so
"họ cùng người Thái đã chăm sóc suốt một nghìn năm" reads naturally as "they and the Thai
(of Thailand)". Consider *người Thái (Dai)* or *người Đại* to disambiguate. Same issue in
`rbb.description.vi` ("tiếng Thái và tiếng Hán").

---

### 25. NOTE — `blr.description.hi` transliterates Jingmai as चिंगमाई ("Chingmai")

Pinyin *Jingmai* → Hindi should be **जिंगमाई**. चिंगमाई is a Wade-Giles-flavoured reading
that does not match the romanisation the atlas uses anywhere else.
Lower-stakes companion: `blr.description.th` renders Menghai as **เมืองไฮ่** (a half-
translation, Tai *mueang* + *hai*) where the rest of the row transliterates Chinese
place names; เมิ่งไห่ would be consistent.

---

### 26. NOTE — `rbb.description.ko` uses simplified hanzi in Korean prose

"루마이(**汝买**), 루칭 또는 불레이(布雷), 라오진(**若进**)" — 买 and 进 are simplified
forms. Korean convention is traditional hanja: 汝買 / 布雷 / 若進 (which is what `ja` uses,
and what `lang_names.ko['rbb']` … does not contain, since it spells 루마이 in hangul only).
Cosmetic but off-convention.

---

### 27. NOTE — `rbb.description.ru` spells 德 two different ways in one paragraph

"**Деан**, он же таан" but "в округах **Дэ**хун и Линьцан" — the same character 德
transliterated as Де- and Дэ- three sentences apart. `lang_names.ru['rbb'] = "Деан (румай)"`,
so the name entry follows the first. Russian practice for 德昂 is **дэан**; harmonise to Дэан
in both places. (`uk` is internally consistent: Деан / Дехун.)

Companion style nit, same row: `srh.description.ru` uses the archaic
"сарыкольский **не есть** таджикский язык"; "не является" or "это не" is current Russian.

---

---

### 28. BLOCKER — `blr.meta.countries` and `blr.description.*` (all 19) — **Laos is unsupported**

`countries:'China (Yunnan: Xishuangbanna, Lincang), Myanmar, **Thailand, Laos**'`, and every
one of the 19 descriptions repeats "…related communities in Myanmar, Thailand and Laos".

Myanmar and Thailand check out. **Laos does not.** Neither Ethnologue nor Glottolog lists
`blr` for Laos. What actually exists in Laos is **Samtao [stu]** — Blang's sister language in
Glottolog's Bulangic node, which SIL treats as a Blang *dialect* — with ~2,400–3,800 speakers
in Houay Xai district, **Bokeo Province**. That is a different ISO code and a different row's
worth of language, and calling it a Blang community is precisely the "credited with something
it lacks" class.

Verified for the other two: **Myanmar** ~12,000 Blang-dialect speakers in Shan State
(民族文化资源库); **Thailand** ~1,200 "Plang" (ปลัง), mostly Chiang Rai (Mae Chan, Mae Sai),
arrived from Myanmar in the 1970s (Sirindhorn Anthropology Center ethnic database).

Fix: drop Laos from `countries` and from all 19 descriptions, or footnote it explicitly as
"a related Samtao community in Laos".

Sources: `https://www.ethnologue.com/language/blr/`;
`https://glottolog.org/resource/languoid/id/blan1242`;
`https://ethnicity.sac.or.th/database-ethnic/189/`;
`https://joshuaproject.net/people_groups/14680/LA`;
[民族文化资源库 布朗语概况](http://www.minwang.com.cn/mzwhzyk/663688/686268/686270/681854/index.html).

---

### 29. FIX — `blr` "120,000-strong" and `rbb` "about 20,000" are **2010 census figures used in a 2023-framed row**

This is the "census figures from mismatched years" class, and it hits both Palaungic rows.

| Row | Text says | 2010 (6th census) | 2020 (7th census) |
|---|---|---|---|
| `blr` Blang 布朗族 | "the **120,000-strong** Blang nationality"; `speakers:'~40K (Blang nationality ~120K)'` | **119,639** | **127,345** |
| `rbb` De'ang 德昂族 | "numbers **about 20,000**"; `speakers:'~20K in China, …'` | **20,556** | **22,354** |

Both rows quote the decade-old number in prose whose other dated fact is 2023 (Blang) or
which is otherwise undated (De'ang). Either move to the 2020 figures (~127,000 and ~22,000)
or stamp the year explicitly ("120,000 at the 2010 census"). The figures propagate into all
19 languages in each row (12万/十二万, 2万/两万, एक लाख बीस हज़ार, 120-тысячной, …), so a
change is 38 strings.

Sources: [国家民委 布朗族](https://www.neac.gov.cn/seac/ztzl/blz/gk.shtml) — "我国布朗族总人口为
127345人（2020年）"; [国家民委 德昂族](https://www.neac.gov.cn/seac/ztzl/daz/gk.shtml) —
"德昂族共有22354人（2020年）"; `https://en.wikipedia.org/wiki/List_of_ethnic_groups_in_China`
(2010 column, from 中国人口普查年鉴-2020).

---

### 30. FIX — `blr.meta.speakers` `'~40K'` / `blr.description.*` "roughly 40,000" understates the ISO code

"Roughly 40,000" matches the ~42,000 speakers of the **Blang-proper dialect in Yunnan**, but
`blr` as an ISO code is larger:

- 民族文化资源库 (布朗语概况) splits Blang into two dialects: **布朗方言 55,000** (42,000 in
  Yunnan + 12,000 in Shan State) and **阿瓦/乌方言 40,000** (Yunnan).
- Ethnologue 18 gives **68,380 (1994–2000)** for `blr`.

The row's own `countries` field claims Myanmar and Thailand, so it is not scoping the figure
to China — yet the description reads "roughly 40,000 **of the 120,000-strong Blang
nationality of China**", which does scope it to China. Pick one framing and make the field
match: `'~40K in China (blr worldwide ~55–68K)'`, or say "roughly 40,000 in China".

Caveat worth knowing before rewriting: per Sidwell 2015 (*The Palaungic Languages* p.10) the
布朗族 **nationality** is an umbrella that also covers most **Angkuic**-speaking groups, whose
language is **U [uuu]**, not Blang — so nationality size is a poor proxy for `blr` either way.

Sources: [民族文化资源库 布朗语概况](http://www.minwang.com.cn/mzwhzyk/663688/686268/686270/681854/index.html);
`https://en.wikipedia.org/wiki/Blang_language`.

---

### 31. NOTE (checked, holds — do not "correct" this) — `blr.description.*` "Most speakers live in Menghai and elsewhere in Xishuangbanna"

Flagging because the next rally will be tempted to call this wrong, and it is not.

Of the **nationality**, only a minority lives in Xishuangbanna: 国家民委 gives ~30,000+
concentrated in **Menghai County** (布朗山、西定、巴达、打洛、勐满、勐岗 townships) against
~50,000+ scattered across 双江、保山、施甸、昌宁、云县、镇康、永德、耿马、澜沧、墨江.
But of **Blang-language speakers** it is correct — en.wiki, citing Svantesson 1988: *"Except
for the Bulang of Xishuangbanna, the Bulang of most of these counties speak the **U
language**"* (Angkuic, `uuu`), and those groups self-identify as 乌 or 阿瓦.

The row says "Most **speakers**", which is the accurate framing. Keep the word "speakers";
do not rewrite it toward the nationality. (Do not cite the NEAC page's
"约占布朗族总人口的65%" line — it is internally inconsistent with its own 30,000 figure and
most likely means Blang are 65% of that township's population.)

---

### 32. NOTE (checked, holds) — `blr` "unwritten and tonal"; Theravada alongside spirit rites

Both confirmed, recorded so they are not re-litigated.

- **Tonal: yes.** 《布朗语简志》(李道勇 et al. 1986), via 民族文化资源库: **four tones**
  35 / 33 / 331 / 21. Block (1994), via en.wiki: two tones, high and low, plus a
  plain/breathy register contrast. Sources differ on the count, not on tonality — consistent
  with the row's `coverageNote`, which takes Chao values straight from the CLDF.
- **Theravada + spirit rites: yes.** Miller (Yale Forum on Religion and Ecology, 2011): the
  Blang *"are Theravada Buddhists, but their highly complex religious life is also informed
  by local beliefs and customs… rice, water, bees, beeswax, and the various local spirits."*
  UNESCO's own citation for Jingmai adds the "Tea Ancestor" spirit belief.

---

### 33. NOTE (checked, holds) — `rbb` "several hundred thousand … in Shan State"; the 1985 rename; tea-growing

- **Myanmar figure: accurate, and correctly left imprecise.** ~557,000 (en.wiki *Palaung
  people*, "no accurate census data exists"); ~600,000 (zh.wiki 德昂族); Ethnologue component
  sums Shwe [pll] 150,000 + Ruching [pce] 272,000 + Rumai [rbb] 139,000 ≈ 560,000. Ta'ang
  organisations claim over 1 million. "Several hundred thousand" is the honest figure — keep
  it vague. Note in passing that the `rbb` component alone is ~139,000 in Myanmar, which is
  another reason `speakers:'~20K in China, more in Myanmar'` is doing badly (finding 10).
- **1985 rename: exactly right, including "at their own request."** 国家民委, verbatim:
  *"后**根据本民族的意愿**，**1985年9月经国务院批准**，'崩龙族'正式改名为'德昂族'."*
  Authority = State Council, month = September 1985.
- **Tea-growing: strongly true.** 国家民委 "德昂族人民尤善种茶"; zh.wiki "家家栽有茶树";
  德昂族酸茶制作技艺 entered the national ICH list in 2021 and is a component of UNESCO's 2022
  inscription "Traditional tea processing techniques and associated social practices in China".
  The `rbb` row could carry that instead of the drum tower (finding 3).

---

## Working-tree drift (checked after the review; not part of the numbered findings)

I reviewed the committed state at `ed55ef5c`. While I was working, **another thread edited
the same two meta lines** (`git diff wordmap_meta.js` shows 2 changed lines, both `blr` and
`rbb`). Three of its edits fix fields but leave the prose behind, creating **new field-vs-prose
contradictions** that did not exist at `ed55ef5c`:

| Field now says | Description (all 19) still says | Status |
|---|---|---|
| `blr.speakers:'~68K (Blang nationality ~120K)'` | "roughly **40,000** of the 120,000-strong Blang nationality" | **contradiction** |
| `blr.countries:'…Myanmar, Thailand'` (Laos dropped) | "…related communities in Myanmar, Thailand and **Laos**" — all 19 | **contradiction** |
| `rbb.coverageNote`: "The source records no tone on any of its sixteen doculects, so none is written here; that is the dataset's silence rather than a finding, and **Liu (2006) describes the Rumai of Guang Ka — five kilometres away and in this same survey — as tonal**." | "unlike most of its neighbours, **is not tonal**" — all 19 | **contradiction** |
| `rbb.speakers:'~20K in China, ~139K in Myanmar'` | "several hundred thousand across the border" | consistent enough; resolves finding 10(b) |

So findings **28** (Laos), **30** (blr speaker count) and **8** (Rumai tone) have been half-landed:
the metadata is now right and the prose is now wrong, in 19 languages each. The `~68K` figure
matches Ethnologue 18's 68,380 for `blr`, which is the choice I recommended in finding 30 —
the prose just has to follow it, and the "of the 120,000-strong nationality" framing has to go
with it, since 68K is a worldwide `blr` figure and 120K is a China-only nationality figure
(putting them in one sentence re-creates the inverted-numbers problem). Likewise the new
`coverageNote` hedge on tone is exactly right and is now the strongest internal evidence that
the description's flat "is not tonal" must be softened.

Findings **3** (drum tower), **9** ("Ruching or Bulei", "not readily mutually intelligible",
which the new `coverageNote` still repeats verbatim), **11** (Baoshan), **12** (Pu'er) and
every `srh` finding are untouched by that thread and still stand as written.

Per the shared-worktree rule: do not `git add -A` when applying any of this.

## §3 — Translation faithfulness: what is CLEAN

- **No translation states a number or date the English lacks.** Verified mechanically across
  all 57 description strings: the only numerals present are 40,000 / 120,000 / 2023 (`blr`),
  20,000 / 1985 (`rbb`), 20,000 (`srh`). `ja`/`ko` use 12万・4万 / 2万 and `zh`/`yue` use
  十二万・四万 / 两万 — the same figures, not additions. `hi` writes "एक लाख बीस हज़ार"
  (=120,000) and `ru`/`uk` "120-тысячной"; `ar` spells all figures out. All correct.
- **No translation drops a substantive claim.** Each of the 18 was checked clause-by-clause
  against the English claim inventory for its row (blr: 12 claims; rbb: 10; srh: 8). All
  present in all languages, including the short `he` and `zh`/`yue` renderings.
- **Every translation is in its target language.** No stray English or wrong-language text.
- **`yue` is genuine written Cantonese in all three rows.** Markers found:
  `blr` 係 嘅 喺 咗 哋 佢 嗰 仲 冇; `rbb` 係 嘅 唔 喺 咗 哋 佢 仲 冇;
  `srh` 係 嘅 唔 喺 嘢 佢 嗰 仲 冇.
- **Script check clean.** All three `yue` strings are fully traditional; all three `zh`
  strings are fully simplified. Checked by enumerating every Han character in each string.
- Hanzi glosses added by `ja`/`ko`/`zh`/`yue`/`th`/`vi` in `rbb` (汝买/布雷/若进 and the
  Sino-Vietnamese Nhữ Mãi / Bố Lôi / Nhược Tiến) are name glosses, not facts the English
  lacks — not counted as additions.

---

## §4 — The Sarikoli contrast

**CLEAN.** All 19 languages state the contrast, and all 19 state it correctly — that the
speakers are China's Tajik nationality, that Sarikoli is *not* the Tajik of Tajikistan, that
Tajik proper is Western Iranian and close to Persian, that Sarikoli is Eastern Iranian, and
that the two are not mutually intelligible. No translation blurs Sarikoli into "Tajik".
`zh`/`yue` are the only ones that overshoot, by making the nationality equation absolute
(就是 / 就係) — see finding 5 — but they keep the contrast itself intact and explicit
(「色勒库尔语并不是塔吉克斯坦的塔吉克语」/「色勒庫爾話唔係塔吉克斯坦嘅塔吉克語」).

---

## §5 — Language names: the specific forms the brief asked about

| Check | Value in `lang_names.js` | Verdict |
|---|---|---|
| `zh.blr` 布朗语 | 布朗语 | correct — standard PRC name |
| `zh.rbb` 德昂语（汝买） | 德昂语（汝买） | correct |
| `zh.srh` 色勒库尔语 | 色勒库尔语 | correct — standard PRC name |
| `yue.blr` traditional | 布朗語 | correct, traditional |
| `yue.rbb` traditional | 德昂語（汝買） | correct, traditional |
| `yue.srh` traditional | 色勒庫爾語 | correct, traditional |
| `ja.blr` ブラン語 | ブラン語 | correct |
| `ja.rbb` ドアン語（汝買） | ドアン語（汝買） | correct |
| `ja.srh` サリコリ語 | サリコリ語 | **wrong — see finding 15**, established form is サリコル語 |
| `ko.blr` 부랑어 | 부랑어 | correct — but description says 블랑어, finding 14 |
| `ko.rbb` 더앙어(루마이) | 더앙어(루마이) | correct |
| `ko.srh` 사리콜어 | 사리콜어 | correct |

No name in any of the 19 languages denotes a *different* language. The machine-
transliteration cases are `ru.blr` / `uk.blr` **Бланг** (established Russian is
буланский, finding 13) and `hi.srh` **सरीकोली** vs the description's सारिकोली (finding 19).
Name-vs-description disagreements are findings 13, 14, 15, 16, 17, 18, 19, 20.
