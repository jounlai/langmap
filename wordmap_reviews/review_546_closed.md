# Review 546 — Pyu (`pyx`): a citation that does not exist

Closed 2026-09-20.

## What was wrong

Thirteen `pyx` cells carried the source string **"Miyake 2024"**. There is no
2024 Miyake publication of Pyu vocabulary. The string was invented once and
copied down the block, and every cell that cited it was declared `evidence:
'direct'`.

Checked against the Griffiths–Miyake–Wheatley plaintext edition of the entire
Pyu corpus (Zenodo 5111390, 7303 tokens), the forms those cells held do not
occur:

| concept | form | corpus |
|---|---|---|
| hand | `lak` | 0 occurrences |
| eye | `mik` | only in `mik·ṁ` / `khmik·ṁ`, which Miyake 2018 glosses `'?'` |
| fire | `vyaŋ` | 0, in any spelling tried (vyaṅ, vyaṅ·, vyaŋ, vyaṁ, vya, wyaṅ, byaṅ) |
| sun | `ño` | 0 |
| fish | `ətso` | 0 |
| house | `vaiŋ` | 0 |
| dog | `kwiy` | 0 |
| father | `paʔ` | 0 as a gloss; `pa` is a frequent syllable, glossed by nobody |
| mother | `na` | 0 as a gloss |
| tree | `siŋ` | 0; the only `siṅ` is the royal name siṅ·havik·krama |
| two | `nit` | 0 — and `hnit·ṁ` is **'seven'**, not 'two' |

## The mechanism

Most of these are LangMap's own `p_sit` proto-forms with the asterisk and any
prefix stripped. Verified byte-for-byte on five of them:

```
concept   pyx     p_sit      stripped   match
  eye     mik     *s-mik     mik        YES
  hand    lak     *lak       lak        YES
  star    kar     *s-kar     kar        YES
  tree    siŋ     *siŋ       siŋ        YES
  you     naŋ     *naŋ       naŋ        YES
```

A further five are close but not byte-identical (`kwiy` vs `*d-kʷəy`, `cyaʔ` vs
`*dzya`, `nit` vs `*g-nis`, `paʔ` vs `*pa`, `pəŋa` vs `*l-ŋaʔ`), so they needed
a transcription step as well. Two are not proto-derived at all — `fire vyaŋ`
against `*mey` and `sun ño` against `*nəy` share nothing, and where those came
from is still unknown. The corpus search, not the proto-overlap, is what
condemns them.

The same overlap reaches Old Burmese: `pyx hand` IPA `lak` == `obr hand` IPA
`lak`, and `pyx you` `naŋ` == `obr you` `naŋ`.

## What was done

- Eleven cells emptied to `["—", "—"]`: hand, eye, fire, sun, fish, house, dog,
  father, mother, tree.
- **`two` corrected `nit` → `kni`.** Attested 13x, including inscription 016
  glossing Sanskrit *dvaya*, and the urn formula `rla kni` 'month two'. That
  formula independently corroborates `moon rla`, which is the cross-check that
  made the correction safe rather than a swap of one guess for another.
- "Miyake 2024" removed from all 13 cells in `wordmap_data.js` and from `two`
  in `wordmap_meta.js`; real per-cell sources written in (Myazedi 007/008 and
  016, the Sri Ksetra urns 003-006, Blagden 1919, Shafer 1943, Luce 1985 II,
  Griffiths et al. BEFEO 103 (2017) §3.2.2, Miyake 2018/2021).
- `name` and `i` promoted `inferred` → `direct`; both are in the Myazedi.
- `moon rla` kept, with a note that the published gloss is **'month'** — the
  'moon' sense rides on the ordinary month/moon colexification and is not
  separately attested.
- `coverageNote` added: the Pyu lexicon is about sixty securely glossed words,
  so a dash on this row is usually the right answer.

## Deliberately left alone

`one taṁ`, `three nhoḥ`, `five pəŋa`, `water tduṃ`, `bone ru`, `good ha` —
all attested, all sourced. **Do not revert review 543's `sum` → `nhoḥ` fix and
do not touch `five pəŋa`**, which is exactly Miyake 2021's /pəŋa/.

`eat cyaʔ`, `you naŋ`, `star kar` stay as `inferred`. They are Tibeto-Burman
comparanda and their evidence field says so, which is a different failure from
a false citation. Whether a proto-etymon belongs in a surface-form column at
all is an editorial question for the row's convention, not a provenance defect,
and it is left open.

## Refuted lead

"Luce 1985 I:66-69" traces back to Wikipedia's Pyu article, whose own footnote
says **volume 2**, and whose ~28-entry Luce column contains none of the six
forms. The innocent explanation does not hold.

## Follow-up

- Published Pyu words this row still leaves dashed or absent: 'four' plaṁ,
  'six' tru, 'seven' hniṁ, 'eight' hraṁ/hrat·ṁ, 'nine' tko, 'ten' su,
  'son/child' saḥ, 'king' tdav·ṃḥ, 'city' priṅ·ḥ, 'year' sniḥ, 'gold' tha,
  'village' o. The row is short on real Pyu, not long on it.
- **Recommended checker** (also recommended by review 543, still not built): a
  deterministic cross-row scan flagging any cell byte-identical to a proto
  row's form with the asterisk and prefix stripped. On `pyx` alone it catches
  ten cells in one pass, and it catches the `obr` overlap too.
