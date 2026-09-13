# Brief for an external model — eight things a ten-round review could not reach

Paste this whole file. It is self-contained: you do not need the repository.

## What LangMap is, in one paragraph

An atlas of 1,187 languages. Its **Word Map** gives ~72 everyday concepts in each
language as a surface form plus an IPA transcription; its **Han Map** gives the
reading of 61 Chinese characters in 121 lects. Both are public. The project's
standing rule is that a cell must come from a real source: **where no source can
be found the cell stays empty rather than being filled by analogy.** A documented
"could not reach it" is a real answer here and gets recorded as one.

A ten-round review pass (rounds 527–536) has just finished. It found and fixed a
great deal. What follows is what it could **not** settle, because each item needs
a book, a scan or a subscription database that was unreachable. They are ordered
by how much damage the gap is doing.

---

## Q1. Five Tangut cells are written with the wrong character — what are the right ones?

**This is the highest-value question in the brief.** The Tangut (`txg`) row had 33
filled cells. Five of them use a character that means something else entirely.
The romanisations look broadly right, so this is a character-lookup error, not a
reading error. The five cells are now **empty**, and they should be refilled.

| concept | the character that was there | what that character actually is |
|---|---|---|
| good | 𗏁 | **five** — the same graph the `five` cell correctly uses |
| three | 𗌭 | \*ku¹ 'then' |
| fish | 𗼑 | \*lhjị² 'month' |
| eat | 𗅋 | \*mji¹ 'not' |
| drink | 𘉞 | a verbal agreement suffix |

**What the row's convention is**, so a replacement fits it: the surfaces are
Tangut characters and the transcription is **Gong Hwang-cherng's reconstruction
as printed in Li Fanwen's Xia–Han dictionary**, with two house modifications —
Gong's tense-vowel dot is dropped (the row writes `zjɨr` for \*zjɨ̱r), and tone is
written with Chao letters mapping Gong's tone 1 → ˧ and tone 2 → ˧˥. Existing
cells that are confirmed correct, as models: water 𗋽 zjɨr˧˥, five 𗏁 ŋwə˧, one
𘈩 lew˧˥, two 𗍫 njɨ˧, nose 𗿦 gar˧˥.

**What I need, per concept:** the Tangut character, the Gong/Li Fanwen
transcription, and where you read it. Li Fanwen 李範文《夏漢字典》 (1997/2008),
Kychanov & Arakawa's *Tangut Dictionary* (2006), Nishida Tatsuo's works, or
Wiktionary's Tangut entries citing "Li Fanwen (2008)" are all fine — but say
which, and give the entry number if the source has one. If two sources give
different characters for the same word, give both and say so.

Note that 'good', 'eat' and 'drink' may be stative or verbal in Tangut and the
row's other cells are citation forms; if the concept does not have a clean
single-character equivalent, **say that instead of choosing one**.

---

## Q2. Proto-Bantu 'head' and 'new' — the tones have been printed backwards once already

The atlas carries `pban` head = **\*-tʊ́è** and new = **\*-pɪ́à**, both cited to
**BLR3** (Bastin, Coupez, Mumba & Schadeberg, *Bantu Lexical Reconstructions 3*),
entries 3023 and 2495.

**BLR3 is no longer queryable online** — `linguistics.africamuseum.be/BLR3.html`
redirects to a 404 and the Royal Museum for Central Africa now ships it only as a
desktop download. So the review could not read either entry.

Meanwhile **Wiktionary's Proto-Bantu Swadesh list, sourced to Schadeberg 2003,
prints 'new' as `*=pɪ́-a (HH?)`** — High-High, where the atlas has High-**Low**.
Schadeberg's own `?` marks it uncertain, so this is not a refutation, but these
two tones have already been printed backwards once in this project's history.

**What I need:** BLR3 3023 and BLR3 2495 as printed — the reconstruction, its
tone marking, and its status code (BLR3 marks reconstructions Main / Derived /
Regional, and 2495 is reported to be **DER**, derived from 2491 \*-pɪ́ 'be burnt;
be hot; be ripe', which would be worth confirming). If you can reach the BLR3
data another way — the CLDF/Zenodo release, a mirror, or a paper that quotes the
entries — that is exactly what is wanted.

---

## Q3. Proto-Tibeto-Burman 'head': does the row drop a prefix alternation systematically?

STEDT #386 prints **PTB \*m/s-gaw** for 'head'. The atlas's `p_sit` cell writes
**\*m-gaw**, dropping the `/s`.

That is not obviously wrong — **no other cell in that row carries a slash**, and
the row otherwise reproduces STEDT prefixes exactly (\*s-nəw 'milk', \*r-miŋ
'name', \*g-sum 'three', \*d-kʷəy 'dog', \*s-hwəy-t 'blood'). So either the row
has a standing convention of collapsing alternating prefixes to one, or 'head' is
the only place it happened.

**What I need:** for the ~20 concepts this row covers, which STEDT entries print
an ALTERNATING prefix (`m/s-`, `b/g-`, and so on), and what each prints exactly.
That tells me whether \*m-gaw is a convention or a one-off, which decides whether
to restore the slash or to document the convention. STEDT's own database
(stedt.berkeley.edu) is the source; entry numbers please.

---

## Q4. Middle Persian: is `amā` or `amāh` the right transcription, and does 'three' belong in the row at all?

The Middle Persian (`pal`) row transcodes **MacKenzie's Book Pahlavi
transliteration letter-for-letter into Inscriptional Pahlavi codepoints** — that
is the row's established convention, confirmed across 51 cells (LAMEDH stands for
/r/ throughout: pidar `<pytl>`, wafr `<wpl>`).

Two questions left open:

**(a)** MacKenzie's *Concise Pahlavi Dictionary* p. 7 heads the word for 'we' as
**amā**, with no final h, while the atlas's row transcribes **`amaːh`**. Is the
final h pronounced? **Durkin-Meisterernst's *Dictionary of Manichaean Middle
Persian and Parthian* s.v. ʾmʾh** would settle it.

**(b)** MacKenzie gives **no Book Pahlavi letter-spelling at all** for 'we'
(ideogram LNE) or 'three' (numeral 3 / ideogram TLTA). The row's `ʾmʾh` and `sh`
are his **Manichaean** citations, in a row that is otherwise Book Pahlavi. The
atlas has chosen phonetic spelling over ideogram before ('I' is 𐭠𐭭 `an` where
MacKenzie has man [L]), so the cells were kept and rendered with HETH — but that
is internal consistency, not attestation. **Is there a published Book Pahlavi
letter-spelling for either word?** Nyberg's *Manual of Pahlavi* vol. II, or any
Pahlavi text edition, would answer it.

---

## Q5. Koyra Chiini 'new' — I read the grammar but not the dictionary

The atlas now carries `khq` new = **taawo** /taːwo/, from Heath 1999, *A Grammar
of Koyra Chiini*: p. 79 lists "taawo-terey 'youth, newness'" and p. 365 glosses it
in an interlinear as 'be-new', said of a floodplain. Hit counts back it: `taawo`
3 / `tawo` 0 in the grammar, `taawo` 6 / `tawo` 0 in the 1998 dictionary.

**The dictionary's own entry was never read** — Heath 1998, *Dictionnaire
songhay-anglais-français, tome I: Koyra chiini* is snippet-suppressed on Google
Books and lending-restricted on Archive.org. The headword brackets to **pp.
230–231** (`taabu` p. 230, `tanka` p. 234, `taawo-terey` p. 236).

**What I need:** the dictionary entry itself — headword, vowel length, gloss, and
part of speech. A confirmation that it is a stative verb ('be new') rather than an
adjective would also settle the shape, since the row writes property words as
statives (`boori` 'be good').

---

## Q6. Two rows are the same language under two codes — which content wins?

`mjg` and `mvf` are both **Mongghul**. Both rows carry the identical native field
`Mongghul`; `meta_desc/mjg.js` opens "Mongghul (Huzhu Monguor, ISO 639-3 mjg)…"
and `meta_desc/mvf.js` opens "Mongghul (also Mangghuer or Tu)…". ISO 639-3 `mvf`
is **Peripheral Mongolian** (Inner Mongolia), which is not this language at all;
Glottolog's Mongghul (huzh1238) carries `mjg`. Yet the `mvf` row sits at
36.83/102.40 — Huzhu Tu Autonomous County.

The word data says the merge should go **onto `mjg`, carrying `mvf`'s content**:
`mvf` holds conservative Mongghul (nara, sara, *nidu* 'eye', *ana* 'mother', usu,
jürige) while `mjg` holds several plainly **Khalkha** forms (*eej* = ээж, *nüd* =
нүд, *zürkh* = зүрх, *khairakh*) — residue of that row having been labelled
"Mongolian" in Japanese until this week.

**What I need:** for Mongghul (Huzhu Monguor) specifically, published forms for
eye, mother, heart and 'to love' — from Todaeva 1973 *Mongorskij jazyk*, Junast,
Slater 2003 *A Grammar of Mangghuer*, or the Qinghai Mongghul materials. Enough
to confirm that the `mjg` forms are Khalkha intrusions and the `mvf` forms are the
real ones. **Mangghuer and Mongghul are two different varieties** (Minhe vs
Huzhu) and the sources often conflate them — please say which you are giving.

---

## Q7. Itbayaten has no ISO code — what should the atlas say instead?

The `itb` row is **Itbayaten**, of Itbayat island in the Batanes, Philippines.
Its metadata declared `iso6393: "itb"`, which is **Binongan Itneg**, a Cordilleran
language ~400 km away in Abra (verified at iso639-3.sil.org/code/itb, where
Itbayaten does not appear). That field is now removed.

Worse, the row's **description, in all 19 languages, says Itbayaten "is counted
separately from Ivatan by ISO and Ethnologue"** — which is the opposite of the
fact. ISO and Ethnologue subsume it under `ivv` Ivatan; Glottolog gives it
`itba1237`.

**What I need:** the current, citable status. Does Ethnologue list Itbayaten as a
dialect of Ivatan or not, and in which edition? Does Glottolog treat it as a
separate language (itba1237) with Ivatan (ivat1242) as a sister? And is there a
published argument either way — Yamada's work, Tsuchida, Yamada & Moriguchi
(1987), or the Batanic comparative literature — that the atlas can cite when it
rewrites the sentence?

---

## Q8. Is the `wuu` row Wu, or Shanghainese?

The row's `name` field says **"Wu Chinese"** and its `meta_desc` describes the ISO
639-3 **macrolanguage**, listing Shanghainese as one subdivision among Suzhou,
Ningbo, Taizhou, Oujiang/Wenzhou, Wuzhou and Chuqu — and says outright
「上海語を呉語全体の代表とすることはできない。」

But its pin is Shanghai (31.23/121.47), its data is Shanghai (水 sz̩˧˥, 二 ɲi˨˧,
姆妈 m̩ma), and **all 19 of its display names now say "Shanghai Wu"**.

One of those halves is wrong, and the atlas cannot decide it from inside. **What
I need is the scholarly convention**: when a reference work gives a single
representative point for 吳語 as a whole, which does it use, and does it call the
row "Wu" or "Shanghainese"? 《中国语言地图集》, 錢乃榮《上海方言》, 游汝杰, or the
Wu volume of 現代漢語方言大詞典 would all be relevant. The same question for how
the atlas's sibling rows (yue = "Cantonese" pinned at Guangzhou, nan =
"Taiwanese") should be read.

---

## Same rules as before

Sources over confidence. Mark anything recalled rather than pointed at. Give both
when two sources disagree. **A documented "could not reach it" is a real answer
and costs nothing; a wrong value costs a lot**, because every cell here is
published as a claim about somebody's language.

Format: QUESTION / ANSWER / SOURCE (author, year, title, page or entry) /
CONFIDENCE (sourced | recalled | uncertain) / NOTES.
