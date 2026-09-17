# Review 537 — closed

**Question:** Four cells write one word in two alphabets at once. `latin_cyrillic_fusion_check.js`
has carried them as UNRESOLVED since 2026-08 because each needs an orthography source rather than
a majority vote. What does each language actually write?

**All four settled. Three were fixed, one was confirmed correct as it stands** — and the one that
stays is the most useful answer of the four.

## Fixed

| cell | was | now | why |
|---|---|---|---|
| Selkup autonym | `Шöльӄумыт` U+00F6 | `Шӧльӄумыт` **U+04E7** | Every other letter in the string is already correct Cyrillic, including two that are easy to miss — ӄ U+04C4 and the ә U+04D9 of the following word. A lone Latin ö among them is a typing slip with no competing reading. ru.wikipedia's *Селькупская письменность* lists Ӧ ӧ in the current alphabet. |
| Nganasan `house` | `мāʼ` U+0101 | `маˮ` **U+02EE** | **The Nganasan Cyrillic alphabet has no macron letter at all.** The row's own 60 forms mark length by doubling (тәибәә, латәә, хии) — this was the only macron. ru.wikipedia prints the paradigm of this exact word: маˮ, Gen маз̌ə, Dat матə. |
| Tsakhur autonym | `ЦӀаIхна` U+04C0 + ASCII I | `Цӏаӏхна` **U+04CF ×2** | **Both palochkas are real.** The 1990 Ibragimov–Isaev alphabet has `ЦӀ` /t͡sʼ/ and `АӀ` /aˤ/ as separate letters, and /t͡sʼaˤχna/ needs both. The defect was never the count — it was that the two were different characters, one of them ASCII. |

## Kept — and this is the finding

**Hunzib `цIə` keeps its Latin ə.** Only the ASCII I moved, to `цӏə`.

The guard's own note proposed Cyrillic ә U+04D9, reasoning from the Khvarshi neighbour that writes
`цIа`. That comparison does not hold: Khvarshi's is a different **vowel**, /a/ against /ə/.

The corpus settles it. **Latin ə appears in 10 of the 59 Hunzib forms and Cyrillic ә in none** — вə,
дə, мə, мызə, вəдə, гьəнс, илə, сылə, əᴴз — and the column also carries ᴴ U+1D34 and a combining
dot above, neither of which belongs to any Cyrillic alphabet. This is a scholarly transcription, not
a botched orthography. Hunzib is genuinely unwritten (no official status; Avar serves as the
literary language), so **there is nothing to normalise to, and rewriting the cell would invent a
standard that does not exist.**

## The palochka, which turned out to be an old decision rather than a new one

Three of the four cells were the unfinished tail of a ruling this project had already made.
`review_95_closed.md` settled on lowercase ӏ **U+04CF** corpus-wide; `review_497.md` — still open —
restated it and scoped the remainder. The census confirms rather than creates the convention:
**U+04CF 323, U+04C0 69, ASCII I 11**, with U+04CF dominant in every one of the 22 Caucasian codes.

Normalised, closing that scope: **69 uppercase and 11 ASCII palochkas across 26 files and 19
codes** (dar, lez, bdk, huz, ady, kbd, udi, ce, inh, ani, khv, kjj, av, agx, ddo, lbe, tab, aqc,
abq), plus the Tsakhur and **Khinalug** (`Кетш мицӏ`) autonyms in `wordmap_data.js`.

Two things worth knowing about that call:

- **Published sources cannot settle the codepoint.** ru.wikipedia's own Tsakhur alphabet table types
  the palochka as ASCII I 96 times; Omniglot's Hunzib sample uses a Latin l. Sources settle *whether*
  a palochka is there and *how many* — which is exactly what they did for Tsakhur. Which character
  encodes it is a house convention.
- Outside sources do write the capital form after a capital letter, so `Цӏаӏхна` with U+04CF is the
  minority spelling. It matches this dataset's own precedents — `inh` `Гӏалгӏай мотт`, `ani`
  `Кӏваннав миццӏи` — and Unicode lowercases U+04C0 to U+04CF anyway, so any casing pass silently
  rewrites the uppercase form.

## Left alone, deliberately

**The Nganasan IPA.** The surface is now `маˮ` but the IPA still reads `maːʔ`, and the attested
paradigm shows a short vowel throughout. Repairing the surface has left the transcription
unsupported. It needs its own source; guessing the vowel length to match the spelling would be the
same mistake in the other direction.

## What the guard does now

`UNRESOLVED` in `latin_cyrillic_fusion_check.js` is **empty, and stays in the file**. The next
mixed-script word has to be argued for in writing before it is allowed to sit in the data.
