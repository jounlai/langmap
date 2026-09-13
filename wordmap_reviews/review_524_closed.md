# Review 524 — closed

**Question:** sugar — do the 222 route assignments hold?

**Status:** applied. This record was reconstructed on 2026-09-13 from the commit
that carries the round, because the round was applied without writing its file —
a gap found while numbering the 527-536 rally. The commit message below IS the
round's findings, verbatim; nothing has been summarised or added.

**Commit:** `de0c6d17` — Round 524 — sugar: 221 of 222 routes hold, and Māori was on the wrong one

---

Round 524 — sugar: 221 of 222 routes hold, and Māori was on the wrong one

The route check was the point of this round, because the map colours by route
and a cell with the right form and the wrong route is a wrong cell. It came
back almost clean, and the one real miss is a good one.

**`mi` Māori huka: other -> sharkara.** Te Aka lists the 'sugar, sucrose' sense
of *huka* as a separate entry tagged **loan word**, and Wiktionary splits the
word in two: Etymology 1 from Proto-Nuclear-Polynesian *fuka 'foam' (= snow,
froth), Etymology 2 from English *sugar*. Māori has no /s/, so English sugar
lands as huka and the native 'foam' word reinforced it. The atlas already routes
Samoan and Tongan suka, Zulu ushukela, Xhosa iswekile and Yoruba ṣúgà on that
road; Māori belongs with them, not beside genuinely native Hawaiian kōpaʻa.

The rest of the tally verified, including all three cases the brief singled out:
no `assukkar` cell lacks the Arabic article and no `sharkara` cell carries one
(checked mechanically); Aragonese *zucre* really is article-less beside Asturian
*azucre*, so those neighbours on opposite routes are real; Maltese *zokkor* is
Arabic sukkar re-shaped by Sicilian zuccuru, article-free, so `sharkara` holds;
all 16 `tang` cells are real 糖 reflexes and nothing else fell into the Thai
น้ำตาล trap. The Turkic and Iranian split is clean — şəkər / шәкәр / шикәр /
шакар / شکر / чикир on `sharkara` (Altai чикир < Mongolian čikir < Persian
šakar) against қант / кант on `khanda`. Malayalam പഞ്ചസാര correctly stays
`other`: it is Sanskrit pañcasāra 'five essences', and in Malayalam *śarkkara*
means jaggery.

Three non-route fixes:

  wuu  daŋ˨˧ -> dɑ̃˨˧. Shanghainese has no [-ŋ] coda for the 唐 rime, and the
    row proves it knows: it writes 汪汪 uɑ̃˥ uɑ̃˨˩ with a nasalised vowel while
    reserving ŋ for -ong (风 foŋ˥˧, 红 ɦoŋ˨˧).
  sco  succar -> shuggar. The Dictionaries of the Scots Language enters this as
    †SUCCAR — the dagger marks it obsolete — and lists shuggar [ˈʃʌɡər] as the
    living form. Every other cell in the Scots row is modern living Scots.
  aa   sokˈkar -> sokːar. The Afar row writes geminates with the length mark
    (abbá/abːa, arraba/arːaba, lubbí/lubːi, namma/namːa) and does not mark
    stress even where the orthography carries an acute.

Open, recorded not guessed: **`wuu` orange 橙/zaŋ˨˧ has the same -ŋ defect** as
the sugar cell did, but the right vowel for that rime needs a source rather
than an analogy, so it is left alone. And IDS records standard Azerbaijani
'sugar' as гәнд (qənd, i.e. `khanda`) with şəkər only in the Terekeme dialect,
while dictionaries give şəkər = sugar and qənd = lump sugar. The cell stays
şəkər; it is the one route the reviewer wanted a second opinion on.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
