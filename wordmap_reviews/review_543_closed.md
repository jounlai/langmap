# Review 543 — closed

**Rally round 5.** Three threads, 85 rows, **658 cells applied** — Eurasia 26 rows, the Americas 35,
Tibeto-Burman and Kra-Dai 24. 1,362 cells adjudicated. Committed in two parts because the third
thread ran four times as long as the others: `1aee3552` and this one.

**Zero drift across 1,354 recorded prior values.** The eight that did not match were the third
thread's deliberate row-level notes, whose `concept` is prefixed `(row-level: …)` so that no applier
can match them — a good idea worth copying.

## The half-applied feature, again, and a new twist on it

`cu` gives the letter ъ **five** IPA values across 29 cells; `ckt` splits ы between /ə/ ×25 and
/ɯ/ ×16; `kbd` gives э five values; `inh` gives the digraph оа four values in four cells; `hop`
writes one low vowel as both a and ɑ; `arn` has four symbols for ⟨ü⟩; `eve` runs four competing
vowel-length notations in one row.

The twist is the mirror image, and the Americas thread found it everywhere: **tone marked on the
surface and dropped from the IPA.** cro 34 surfaces to 2 IPAs, bla 28 to 1, hai 27 to 4, nez 19 to
4. `ote` marks tone on 0 of 51 cells in a language its own metadata calls tonal.

## A writing system as its own witness

The highest-yield trick of the round, and it needs no dictionary. **The Yi syllabary encodes
initial, final and tone in each glyph, and the Unicode character name spells it out** — U+A0C5 is
YI SYLLABLE MU. Build the name table for U+A000–U+A48C, and every `ii` cell can be checked against
the glyph it is written with. Eleven disagreed. The same method worked on Devanagari Bodo, on
New Tai Lue (Unicode's HIGH XA and LOW XA names prove ᦃ and ᦆ are one phoneme /x/) and on Pa'o.

The best negative of the round came from the same idea: **Pa'o orthography requires two tone signs,
U+AA7B and U+108F, and the `blk` row contains neither in 38 cells.** On orthography alone it is not
written Pa'o.

## A cell holding its neighbour's word — the richest class

ASJP or IDS named the neighbour every time:

| row | cell | held | should be |
|---|---|---|---|
| `bor` | eye | the egg word (ASJP: egg *ba*) | jokuru |
| `ake` | hand | the ear word (ASJP: ear *pana*) | emiyaʼ |
| `gun` | hand | the path word (MBYA: path *ape*) | po |
| `emp` | heart | the tree word (IDS: tree *bakuru*) | so |
| `dz` | red | the word for **husband** | — |
| `dz` | sun | the word for **afternoon** | ཉིམ |
| `atb` | water, tree | **'rope'** and **'be alive'** | wuì, sikgâm |
| `tyz` | heart, name | a sentence-final particle, and **'to remember'** | — , ten |
| `brx` | tree | **needle** | बिफां |
| `njo` | tooth | Mongsen **'GO'** | tepu |
| `dng` | tree, hand | шў, a **non-word** — 0 hits in a 418-page dictionary | фу |

Two of those cells were *why* a duplicate sat in the lock: `bor|egg|eye` and `ake|ear|hand` both
rested on a defect. `one sun` is the only Oneida cell containing ⟨r⟩, a letter Oneida does not have,
and is byte-identical to `moh sun`.

## Two findings that needed no source at all

**`quy snow ritʼi` is byte-identical to `quz` including the ejective**, in a row whose own meta says
it "lacks aspirated and ejective stops".

**`ckt` spells its own lateral two ways** — ԓ U+0513 in 17 cells and л in 24. The row decides it:
every cell whose IPA says /ɬ/ takes ԓ, and the row's `native` field is `Ԓыгъоравэтԓьэн йиԓыйиԓ`,
which spells with ԓ the very word the `tongue` cell wrote as `йилыйил`. 12 cells converted; the
three whose IPA says /l/ were left, and whether Chukchi has a plain /l/ at all is held.

## Out of scope, checked, fixed

`ady bone` and `ady drink` were the Kabardian forms. ASJP settles it — ADYGHE bone `q"w~3pS"h~3`
(къупшъхьэ, шъ) against KABARDIAN `q"w~3pSh~3` (къупщхьэ, щ); ADYGHE drink `y3Sw~3n` (ешъон) against
KABARDIAN `y3f3n` (ефэн). The IPA came from the row's own convention, where шъ is ʂ in six cells and
`mountain къушъхьэ /qʷəʂħa/` is the exact structural parallel.

## Four findings the third thread withdrew, and one ruling it honoured

Tshangla eye=name really is one word; Zaiwa `salt` xo really does spell /tsʰo/; Dzongkha `honey`
really is the bare first syllable; Nuosu ⟨uo⟩ really is [ɔ], so `eye` was right and `three` was the
outlier. And **review 518's ruling that Zaiwa ⟨-q⟩ is a glottal coda and not a tone letter was
honoured against the thread's own research brief, which asserted the opposite and was wrong.**

## The patch that could not be applied

**The `ii` and `khb` proposals arrived mangled.** U+2157 VULGAR FRACTION THREE FIFTHS where a Yi
syllable belonged; Tai Tham, Buginese and Mongolian letters elsewhere. A script-overlap check
caught five outright, and two more slipped it by sharing one character with the value they
replaced.

Worse, the *unmangled* half of that block was unsafe too. `ii star` proposed **no surface change and
a new IPA** — which would have put the IPA of ꃅꏸ 'star' onto the surface ꈌ, the row's own `dog`
character, leaving a cell whose two fields are different words. `ii red`, `father`, `name`, `night`
and `heart` had the same shape. **All 16 `ii` entries and the four mangled `khb` ones were
discarded**; the findings are real and go to round 6 as a dedicated job, with the Unicode character
names as the deliverable rather than the characters themselves.

## What the guards caught in this round's own work

- Two `hsb` cells arrived with ˈ on a monosyllable, against the 2026-07-21 ruling. Stripped.
- `myp name` lost its only stray grave and thereby became byte-identical to its surface, which made
  the ASCII g inside it visible to rule 2 of `ipa_ascii_g_check` for the first time.
- Three `we` fills proposed a surface and left the IPA as the dash. **`ipa_is_not_prose_check`'s
  rule refused all three** — one day after that guard was written. They are held: `we` is
  route-coloured, so filling one is two facts, and `njo asenok / onok` would also need the route
  moved to `clusive`.
- `ksw bone` arrived as `tâ.xi`, a syllable dot the atlas does not write. Dot removed.
- Adding tone to 22 `dng` cells shifted the Sinitic comparison set and pushed `sinitic_tone_outlier`
  one over budget — exposing that **`zh_wenyan_edu bird 鳥 /niːu˨˧/` is the row's only ˨˧**, in a
  row with ten ˩˧ cells that are all 陽上 characters, as 鳥 is. Fixed to ˩˧ on the row's own witness.

## Guard change

`ipa_syllable_dot_check` gains its first by-list exemption, `pyx`. Miyake writes the Pyu preinitial
with exactly the same dot the Baxter–Sagart exemption already covers — `r.miŋ`, `n.ho(m)H`,
`t.du(j)` — and the existing rule could not reach it, because the Pyu cells are cited from an
inscriptional corpus and carry no `*`.

## Held

- **`mjg water`** — the auditor called its own spelling tentative. The finding stands: "us" is
  Khalkha, not Monguor, and three sources give a sibilant onset.
- **`emp ear` and `bone`** — the row splits its central vowel three ways, ë ×4 / ɨ ×3 / ʉ ×3. No
  majority to normalise to.
- **Six `otk` cells whose runiform spells the wrong sign** — `love` uses a k-sign for /s/, `earth`
  the back š-sign for /r/. Each replacement is named by Unicode character name, so this is ready
  for a careful pass rather than undecided.
- **`yuy`** is 16 of 40 cells byte-identical to Khalkha with a `native` field reading ئۇيغۇر, and
  `zkt` has 4 script cells, 12 gaps and 22 copied IPAs. Neither earns its place as written.
- **`qxs` shares 9 of 38 cells outright with the atlas's own `cng` Northern Qiang row**, pronouns
  included.
- **`pyx`**: of 21 filled cells only `five` survives contact with the Pyu corpus, and Miyake derives
  Pyu 'three' /n.homH/ from *n.sumH — so the atlas's `sum` is the **pre-Pyu** form. Two dashes are
  wrong the other way. And `unattestedReason` occurs **nowhere in `words/*.js`**, so there is no
  convention for a dashed cell to say why.
- `chb` has no `meta.unattestedReason` either, and transcribes ⟨z⟩ as /z/ in four cells and /s/ in
  one against IDS's /ts/.
- `trn` is **not** Taushiro. The row is correctly Trinitario Mojeño; Taushiro is `trr`. No defect —
  recorded so nobody re-audits it as the wrong language.
- Whether `cr`/`crk` (41 byte-identical), `quy`/`qu` (43) and `mixtec`/`mix` (30) should all exist.

## The recommendation worth acting on

From the Tibeto-Burman thread, and it generalises: **the recurring failure in this block is
provenance, not typos** — Pa'o←Burmese, Pyu←proto-forms, Situ←Written Tibetan, Southern
Qiang←Northern Qiang, Eastern Pwo←S'gaw letter values, Bodo←a misread vowel sign, and in earlier
rounds cjy_lv←Taiyuan and zh_zz←Jinan. That is cheap to catch with a deterministic cross-row
identity scan and expensive to catch one rally at a time.
