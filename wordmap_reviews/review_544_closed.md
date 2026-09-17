# Review 544 — closed

**Rally round 6.** Five threads, and only two of them were row audits. The other three were a
targeted single-row rebuild, a metadata repair, and a policy question turned into a checker —
which is the shape the rally should keep, because the row audits have started returning fewer new
error *classes* and more instances of classes already named.

Applied: **271 cells** (Semitic 75, scattered 81, Nuosu Yi 20, tone strays 3, plus 92 across the
earlier commits of the round), **21 metadata script fields rewritten**, **49 type fields**, and one
new guard carrying 442 cells of newly-visible debt.

## The Yi row, rebuilt from its own glyphs

Round 5 found this row badly wrong and produced a patch that could not be applied: its Yi
characters arrived mangled into U+2157 VULGAR FRACTION THREE FIFTHS, Tai Tham and Buginese. Redone
as a dedicated job whose **deliverable is Unicode character names rather than characters**, and
verified before writing: all 31 proposed codepoints sit inside U+A000–U+A48C, and each one's
Unicode name encodes the Yi Pinyin that yields the IPA proposed for it. ꎐ is YI SYLLABLE RRY and
rr is /dʐ/; ꂓ is HMI and hm is /m̥/; ꑍ is NYIP and -p is tone 21. **The row is now self-checking**,
and so is any future patch to it.

17 cells disagreed with the glyph they were written with — six more than the brief knew — and four
more agree with their glyph while spelling a different word:

| cell | was | is |
|---|---|---|
| star | ꈌ — **the row's own DOG character** | ꃅꏸ /mu˧˧tɕɿ˧˧/ |
| tooth | written with the **BLOOD** character ꌦ | ꎐꂷ /dʐɿ˧˧ma˧˧/ |
| name | ꂷ, 'bamboo' and a classifier | ꂓ /m̥i˧˧/ |
| heart | ꌋ, which is a **NIGHT** morpheme | ꉌꂵ /hɛ˧˧ma˥/ |

`drink` closes **review 107 item 14**, held since June for exactly this: a sourced lexeme, now on
four independent sources. `hello` is held, correctly — ꂿꎆꈐ reads [mo dʐɯ kʰu] by its glyphs and
matches no sourced word, but choosing between the 你好 calque ꆏꉾ and the native blessing ꋬꂻꈨꅪ is
editorial and no source shows either as a bare standalone greeting.

**One prior ruling overturned, and flagged rather than quietly changed.** Review 42 issue 12 set
`house` to /ji˧˧/ and its round 2 accepted "ꑳ=YI = /ji/ confirmed". Yi Pinyin ⟨y⟩ is [ʑ], and the
row's own `water` ꒉ yy is already /ʑɿ/ — the row contradicted itself. Now /ʑi˧˧/.

The thread also **declined one of the brief's own claims**: `night` ꈊꃀ matches ASJP but no source
spells it in script, so the cell took ꃅꌋ instead.

## A new shape: the row contradicting its own description

The Semitic thread found it and it generalises. **`ar_sa`'s metadata names the gahawa pattern and
the row applies it in 0 of 2 eligible cells, including the eponymous قهوة.** `mey`'s metadata says
interdentals are preserved and `snow` merges them. `afb heart قلب /qɑlb/` is the one cell in its
row that reads qāf off the page, against its own metadata and three sibling cells.

Alongside the familiar class: word-final ض loses its emphasis mark in `white أبيض` in all four
Levantine rows while bone and egg keep it; nine of eleven Arabic rows write two or more jīm
reflexes, and afb and ar_sa write four apiece in six cells. `abv` held two forms joined by `" / "`
in 14 of 71 cells in **both** fields — invisible to the duplicate checker, rejected by the applier,
and all 14 decided rather than punted. `har` is 39 of 39 Latin in a row declaring Geʿez, and ASJP's
two Harari doculects plus Burton (1856) convict four cells that held the English-looking, Geʿez,
Arabic and Amharic words instead.

## The metadata thread: the fragment was usually wrong, not merely short

Twenty-one `meta.script` fields were cut at exactly 70 characters. **Six assert something no source
supports**, and completing the sentence would have carried the error forward:

- `har` "official orthography since 1999" traces to one diaspora school's recollection on Omniglot;
  the peer-reviewed date is 1986, and the fragment omitted the Arabic/Ajami layer — the
  centuries-long tradition, manuscripts from 1460, and politically loaded.
- `gun` "33-letter Achegety" is **Paraguayan** Guaraní's alphabet. Mbyá has no standard at all.
- `bfq` "Tamil script since 2009, standardized by Anandhan Raju" — Unicode L2/22220, written with
  the rival inventor's cooperation, records that work as a *separate, unadopted* script.
- `sce` "official romanization since 2003" is neither official nor 2003.
- `mjg` "31 letters", `slr` "TB5000", `jya` "Situ Pinyin" — in no source reached.
- `rcf` "SudEL standard" — unsourceable, dropped.

**`rcf`, `kry` and `fia` matter most procedurally**: they read as finished sentences missing only a
full stop, so nothing signals they need checking. Of the six rows flagged to doubt, only `ers` and
`srb` survived intact.

## The tone question, settled by cutting along notation

Three rounds held the same item in different families. The measurement that settles it: **of the
114 rows notating tone with Chao letters, 70 mark every cell; of the 95 using diacritics, not one
does, mean marked rate 21%.** That is not 95 damaged rows — Chao letters are exhaustive by
construction, diacritics are usually privative. Navajo marks high only and its 20 bare cells are
bare in standard Navajo orthography too; Yoruba marks high and low and leaves mid bare. An
unqualified "all or none" would require 95 rows to be wrong.

So `tools/tone_policy_check.js` asks only what the row already answers about itself:

- **Rule A** — a row with ≥20 eligible cells, Chao on ≥60% of them and ≥80% of its marked cells
  Chao must carry a Chao letter everywhere. 205 cells in 32 of 102 qualifying rows.
- **Rule B** — the Latin surface carries a tone diacritic, the IPA carries none, in a row whose own
  IPA uses that same diacritic ≥3 times. 237 cells in 36 rows. `cro blood íre /iɾe/` sits four
  lines from `cro name iláshe /iláʃe/`.

**442 cells, against 12,091 for "mark everything" and 0 for the status quo — and 266 of the 442
need no source at all.** The 60% floor is where the evidence stops being the row's own: below it
sit `duu` at 14% and `qxs` at 5%, languages whose tonality the literature actually disputes, and
flagging their bare cells would assert a linguistic fact rather than read one.

Zero false positives, verified three ways: all 70 flagged rows read by hand; each Chao row's
convention verified **positively** from its own data (th writes the mid tone `กิน /kin˧/`, vi writes
ngang `ăn /an˧/`, za writes checked syllables); and every guard derived by counting what it
prevents — **2,555 cells** an unguarded version would have reported, including 214 Mandarin
neutral-tone syllables, 1,485 Hungarian/Irish/Icelandic length accents and 744 Spanish/Portuguese
stress accents. Burmese `my` is correctly untouched: its 15 bare cells are all checked or creaky.

Three strays fixed as ordinary work, not policy: `ti earth /mɐˈrét/` (the acute duplicates a ˈ
already there), `yux fire`, `squ two` (Squamish acute is stress). `sdh ear /ɡwê/` is held — it is
not a tone mark at all but the Kurdish Latin spelling pasted into the IPA field, and it wants a
Kurdish reading.

**Five of the seven "orphan tone mark" cells round 3 named do not exist** — loz white, mos foot,
dag i, lg mountain and kg hello carry no tone mark in the tree or at HEAD. Only `kmb good` and
`vmw drink` survive, and both are in tonal languages, so neither is a stray.

## The applier learned twice this round

The one-sided gate added in `f5f81276` queued three cells across 156 applied and blocked none:
`ayl tree`, where /ʃæɡːərɑ/ → /ˈʃəʒra/ moves 67% with the surface unchanged (same word شجرة,
re-transcribed, jīm corrected off a geminate ɡ that is not an attested Libyan reflex); `gon water`,
where a Devanagari surface and a Latin IPA cannot be compared by distance at all; and `hui eye`.

**`hui eye` taught the gate something.** Its surface is `de` and its IPA was `/tɛː/` — contradicting
the surface in voicing, vowel quality and length at once — and the fix rewrites the IPA to `de`.
That is a 100% one-sided move *toward* the other field, which is the exact repair the gate exists
to protect. The gate now allows a one-sided change when it brings the pair closer together, and
the distance itself reports when the two fields are in different scripts and cannot be compared.

## Held

- **`meta.toneNotation`**, one word on each of 375 rows, is the recommendation's third leg and is
  **not** adopted here. It is a schema addition and worth a deliberate decision; the checker works
  without it, because both its rules read the notation off the row's own data.
- A **second import cap at exactly 130 characters on `meta.official`, 17 rows**, cut mid-word, from
  the same batch as the 21. Not added to the guard yet: it opens a second debt list before the
  first is closed.
- **`meta.coverage` enum drift** — CONTRIBUTING.md documents 7 values, the validator allows 4, four
  documented values would ERROR and one allowed value is undocumented.
- **`afb` and `ar_gulf` both carry ISO 639-3 `afb`**, share 64 of 72 surfaces, and contradict each
  other on cat, hello, thanks, water and heart. `arc` holds Classical Syriac and shares 49 of 56
  surfaces with `syc`.
- **Five `we` routes read `single` on a single unlabelled form**, which the atlas's own rule
  forbids — enq, hui, ygr, wrh and tiw, the last being the strongest case for `clusive`.
- **`tiw`'s family reads "Iwaidjan or unclassified"**; Tiwi is an isolate, and the brief filed it
  under Pama-Nyungan, which is also wrong. Three-way disagreement.
- 136 cells recorded `unsourced` in the scattered thread deliberately: for hui, ygr, tiw, sad and
  bfq, ASJP disagrees with the row on a third to two-thirds of shared items, and swapping a
  hand-made cell on one contradicting wordlist is precisely the move that overwrites earlier work.

## Two negatives worth the next reviewer's time

**ASJP v20's `HASSANIYA` list is not Hassaniya.** Its 52 forms carry Classical nunation and 1sg
perfect verbs — `samsun`, `nuumtu`, `Saraptulma` = šaribtu l-māʾ — and it tracks CLASSICAL_ARABIC.
Anyone filling `mey`'s gaps will reach for it.

**Twice, ASJP reversed a fix that would otherwise have gone in backwards**: `tiw tooth` really does
have the [k], so the *surface* was a letter short, not the IPA; and `tiw tongue`'s retroflex [ɭ] was
right while its spelling was wrong. Checking before flagging is what made those two fixes instead
of two new defects.

And one correction to the brief itself: **Hannan is the Shona dictionary and Dale the Chichewa
one** — I had them the wrong way round.
