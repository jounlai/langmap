# Review 521 — is each cell attested, or was it constructed?

**Scope.** 454 rows, ~900 cells, three slices. The atlas's one inviolable rule
is that a cell comes from a real source. The failure this round hunts is not a
typo: it is a plausible form nobody ever wrote down.

**Result, in one line: nothing was invented as a word.** Every lexeme in all
three slices traced to a named source.

What the round *did* find is a second failure mode, and it found it 14 times.

## The lexeme is real; the spelling is not

A dataset prints a romanisation or a phonetic string. The row's surface field
is in a native script or a standard orthography. Someone converts. The word is
right, but the exact string in the atlas appears in no source — it was
assembled by applying a rule.

Corrected:

| row | word | was | now | why |
|---|---|---|---|---|
| `ave` Avestan | new | 𐬥𐬀𐬬𐬀 | **𐬥𐬀𐬎𐬎𐬀** | Avestan writes intervocalic /w/ as 𐬎𐬎 and reserves 𐬬 for word-initial position — a rule this row already observes without exception (𐬵𐬎𐬎𐬀𐬭𐬆, 𐬵𐬌𐬰𐬎𐬎𐬁 intervocalic; 𐬬𐬁𐬙𐬀, 𐬬𐬀𐬟𐬭𐬀, 𐬬𐬊𐬵𐬎𐬥𐬍 initial). The string was IDS's romanised `nava-` transliterated letter by letter. |
| `nci` Classical Nahuatl | new | yancuīc | **yancuic** | The macron was the filler's. Karttunen prints YANCUIC. The control test passes: the same source reproduces Karttunen's macron in this row's own head cell, `cuāitl` — so the missing macron is his, not a stripping artefact. |
| `slr` Salar | new | yangı | **yañı** | The Salar lemma is `yañı`, and the row already writes ñ (köñül) and ş (beş, güneş), so nothing forced the digraph. |
| `slr` Salar | head | bash | **baş** | Same defect, and the filler had not flagged this one. |
| `lij` Ligurian | new | neuvo | **nêuvo** | A hybrid of two dictionaries' spellings. The Academia Ligustica orthography this row follows writes `nêuvo`, and the atlas's own IPA `ˈnøːvu` already matched it. |

Reported and **not** corrected, because the row would have to be settled first:

- **`lij_t` Tabarchino `neûvu`** — no Ligurian orthography puts the circumflex
  on the u. Academia Ligustica writes `êu` (the row's own `chêu` is right); the
  Tabarchino tradition writes `ö` (the row already has `röa`, `öggiu`). But the
  row's existing `feûgu` has the same defect and was the model, so fixing one
  cell would leave the row half-converted.
- **`khw`, `yux`, `xto`, `bdq`, `enf`, `wba`, `txb`** — surfaces re-encoded from
  romanisations or IPA. The Tocharian B case is the clearest statement of the
  problem: the filler's own note says he chose a c-less akṣara spelling "so no
  conjunct guesswork was needed". The lexemes are secure; the spellings need a
  dictionary, not emptying. `wba` is worse than the others only because that row
  is itself split 7 h- against 4 j-.

## Single-source, honestly recorded

Twelve cells rest on one witness with no second reachable: `acn` head (Lama's
list), `tkr` head and new (IDS), `nyo` new and `ebu` new (TLS), `plg` head and
`tob` head (IDS), `mkz` head, `emi` head, `vls` head, `bdk` new, `mbc` head,
`ivv` head and new, `kgg` head, `tsj` head, `khq` head, `dru` new, `crt` new.

That is not a defect. It is the state of the documentation for those languages,
and the point of recording it is that a second witness may appear later.

## Claims that did not hold

- **`pjt` new `nyuwana`** — the filler's note says bowernpny *and* ASJP give it.
  ASJP's Pitjantjatjara list actually has `kuwaritja`. The cell rests on Bowern
  2012 alone, which matters because the form does look like English "new one".
  Kept: `kuwaritja` is transparently 'of now', the sense this concept excludes.
  Goddard's dictionary would settle it.
- **`crt` new `inkyeʔ`** — both witnesses describe Iyo'wujwa Chorote (crq), not
  crt, and the ASJP list actually coded `crt` gives `ike ~ ahike`. Worse, that
  same list glosses `inkye7e` as HAND. The `crt` row is built on the crq data
  throughout, so the row is at least internally consistent, but the gloss rests
  on Gerzenstein alone.

## A rejection that was itself the error

`orh` Oroqen new was left **empty** on the note "no second source for irkəkin,
and it looks wrong against Evenki *omakta*". Two reviewers found the second
source independently: ASJP's OROQEN list (glottocode oroq1238, ISO orh) has
`irk3kin`, and EDAL reconstructs Proto-Tungusic *xir- 'new' with Evenki irki /
irē / dialectal irkekīn — *omakta* is simply the other, non-cognate term. The
cell is restored. **A cell dropped for a bad reason is as much a defect as a
cell filled for one**, and it is harder to see, because an empty cell looks like
diligence.

## Doubts the data answered

- `pzh` `xias` — the filler could not confirm it in Li & Tsuchida. ABVD 760 **is**
  Li & Tsuchida's *Pazih Dictionary* (2001) and prints `punu` and `xias`
  verbatim; ABVD 266 (Ferrell 1969) has `xiás`; ASJP has it twice more.
- `shx` head — he thought he had assembled it from a 'hair' compound. ABVD's She
  (Haifeng) list prints `kuaŋ35 k'ɤ11` under *head* directly.
- `bwi` head — the bound `-hiwída` he stripped is printed unhyphenated for six
  Baniwa dialects in chaconbaniwa.
- `sat` — the Ol Chiki he called "mine" returns 257 hits on Santali Wikipedia,
  including the article ᱵᱚᱦᱚᱜ ᱦᱟᱹᱥᱩ 'headache'.
- `suk`, `xh`, `hch`, `kpj`, `kca`, `tay`, `kek`, `bug`, `tsu`, `wbp` — every
  corroboration claim re-run against the datasets held.

## Ancient and classical rows

All clean. `och` `*l̥uʔ` and `*s.tsʰi[n]` are verbatim Baxter–Sagart in
`sagartst`, and the rejected `*[ŋ]o[r]` carries that dataset's own `!remove!`
flag. `ang`, `gmh`, `osp`, `xpr`, `prg`, `txb` are verbatim in IE-CoR.
