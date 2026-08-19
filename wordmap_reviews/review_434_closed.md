# Review 434 — new core word `red`, and the source pass over 1,151 draft cells

**Date:** 2026-08-19
**Scope:** `words/red.js` — a new full-coverage concept (the 33rd), drafted for
all 1,151 languages and then checked cell by cell against comparative sources.
**Method:** no LLM rally. Draft forms were written first, then cross-checked
mechanically against every comparative dataset that carries Concepticon RED:

- **ASJP** (`lexibank/asjp`, parameter 87) — 1,456 ISO-keyed languages
- **IDS** Intercontinental Dictionary Series (`15-660`) — 308 languages
- **ABVD** Austronesian Basic Vocabulary Database (`word.php?v=149`) — 1,755 rows
- **NorthEuraLex** (`526_red`) — 114 Eurasian rows, with IPA
- **Bowern Pama-Nyungan** (`235_red`) — 165 Australian rows
- **TransNewGuinea.org** (`53_red`) — 592 Papuan rows
- Bantu BVD, Kraft Chadic, Sagart/Sun Sino-Tibetan, Chen Hmong-Mien,
  Nagano rGyalrongic, Castro Yi, Marrison Naga, Bodt Khobwa, Wang Bai,
  Starostin Karen, Mann Burmish, Peiros Austroasiatic, Sidwell Bahnaric
- Wiktionary's `red` translation table (raw wikitext, 271 templates)
- Frajzyngier et al., *Dictionary of Hdi* (dictionaria CLDF) for `xed`
- G. Starostin's Hadza 100-wordlist (after Sands) for `hts`

**Result:** 180 cells corrected before shipping; 183 of the 395 cells that had
been flagged as uncertain now have an independent comparative source behind
them. All project guards pass (`node tools/check_all.js`).

## Why `red` and not another colour

Berlin & Kay's colour hierarchy: a language with exactly three basic colour
terms has black, white and red. That makes red the only colour term that can
legitimately carry a 1,151-language core word — blue and green have no basic
term in a large minority of these languages and belong in the partial (🧪)
track instead. Lindsey & Brown (2017, *i-Perception*; PMC5521336) report that
Hadza speakers named only the black, white and red chips with full consensus.

## What the first pass got wrong

The Formosan block was the worst: nearly every draft form was replaced from
ABVD. `tsu` Tsou had **fkoi**, which is 'snake'. `tay` Atayal, `trv` Truku,
`bnn` Bunun, `ami` Amis, `szy` Sakizaya, `ckv` Kavalan, `tao` Tao, `pwn`
Paiwan, `pyu` Puyuma and `dru` Rukai were all corrected.

Family-pattern guessing was the other failure mode — one invented form applied
across several unrelated languages. Those were found by scanning for identical
surfaces on codes that are not dialects of each other, then re-sourced:
`ni` across six Tibeto-Burman rows, `siaŋ` across five Austroasiatic rows,
`-bara` across four Edoid rows.

## The one deliberately blank cell

`ker` Kera (East Chadic, Chad) carries `—` with
`meta.unattestedReason.red = 'unsourced'`. Kera's other 32 cells come from
Ebert (1976) *Sprache und Tradition der Kera*, Teil II: Lexikon — print only.
Checked without result: ASJP, IDS, Kraft Chadic, Glosbe, Webonary, ebible.org,
Starling (CGI down). A plausible Chadic-shaped form was **not** invented.

Because the modern-language `—` guard in `validate_wordmap_data.js` only
admitted `cultural-absence`, a narrow named allowlist was added
(`MODERN_UNSOURCED_ALLOW`) so this one documented gap is reviewable rather than
hidden, and the guard stays strict everywhere else.

## Side effects

- `fonts/NomNaTong-subset.woff2` regenerated to add **U+27E65 𧹥** (chữ Nôm for
  *đỏ*), which the subset-font guard correctly flagged as iPhone tofu. Rebuilt
  from NomNaTong-Regular v5.13 with pyftsubset; 7,612 → 7,996 bytes.
  `unicode-range` extended in both `wordmap.html` and `hanmap.html`.
- 82 IPA cells had affricate tie bars; stripped to the project's bare-digraph
  convention (`tools/affricate_tie_check.js` clean).
- `validate_wordmap_data.js` word-count constant 32 → 33.

## Still without an independent comparative source (212 cells)

These carry best-effort forms. Most are minority African, small Papuan,
Australian and Amazonian rows plus a few historical stages; the European and
major-language cells in this list are high-confidence dictionary forms. They
are recorded here so a later pass can target them rather than re-deriving the
list:

abe abq ada adi aer agt ahk aiw ake akk ame amw an anu aoc atb bbo bca bej bfq bin bla blk bom bor brx byn bzd bzh car chp cia cja cop crn cro czh_wy ddn djk dnj drs dsh dtp dtp_kzj dur duu egy ekp emk ers ets ewo ext fax ff fia fra_jer frp frr frr_amr gon gym h_tagalog hai har hch hni hsn_yz hup ibb ie ig ik iru iso izz ja_rys juc jya kao kdt kho khw kio kj kjp kln kmb kmu ko_gor koy kpe kqn kqz kr ksb ksw ktz kwk kxc lad lbz lep lhm li lld lua lue luy lwl maz mcf mdr men mez mgo mix mixtec mro mtq mwl mxv nag nej nez ng njo nlc nmn nny nrf nrf_gg nxq oc ocm okz olk omc omx omy onw orv osa osn ote otq p_dra p_ryu p_sit pal pao pcd peo pkar pll pqm prk psi puaz pwo qxs rim rmt roo rwk sdo seh sgw sid squ srb suk sux sva swb tao tar tca teo ter tiw tji tll tly toc toi trm trn tsz tum tus uby ude urh vai vls vot wbl wmt wym xav xkz xsc xum yan yiz yug yur zap zdj zkt zts
