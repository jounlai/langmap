# Review 531 — closed

**Question:** Is each proto form written exactly as its source prints it, and exactly as its own row
already writes reconstructions?

**Scope:** the 33 new proto cells. **19 clean, 11 findings, 3 could not be verified.** All 59 guards
pass and none of them had anything to say about these cells — this round is what a guard cannot see.

## Wrong

**head / `pmng` `*tolugai` — matched neither authority and broke the row's own spelling rule.**
Nugteren 2011 (LOT 289) prints **`*tolagaï`** and gives Written Mongol `toluɣai`; the cell had `u`
in the second syllable *and* ASCII `g` where this row writes **ɣ** in every back-vowel gamma —
`*sibaɣun`, `*ɣajar`, `*hulaɣan`, `*čilaɣun`. The row is Nugteren-based, so his headword wins.
**Fixed to `*tolagaï`.**

**head / `p_ine` `*ḱr̥rēh₂` — no source prints this string**, and it is not a well-formed PIE shape:
a geminate `r̥r`, and it ends `ēh₂` when `eh₂` *is* the long vowel. Wiktionary lists nine nominal
derivatives of `*ḱerh₂-` and it is none of them. Corrected (round 528) to the s-stem **`*ḱérh₂os`**,
the one whose descendants are Greek kárā and Sanskrit śiras-.

**new / `pmng` `*sine`** — Nugteren's headword is `*sini (?~ *sine)`. **Fixed to `*sini`.**

## Where the NEW cell was right and the row was wrong

This keeps happening, and it is the reason to review the neighbours and not only the addition.

- **new / `ptai` `*ʰmɤːl`** — do not "correct" this backwards. Pittayaporn's transcription note says
  it outright: *"a superscripted [ʰ] rather than a normal [h] … PT \*ʰma: 'dog' rather than \*hma:"*.
  The row's older **`*hmwɯj`** (bear) and **`*hmaː`** (dog) are the deviants — and the second
  contradicts Pittayaporn's own worked example, by name. **Both fixed to superscript ʰ.**
- **new / `ptrk` `*jaŋɨ`** — `ɨ` is exactly EDAL's printing, but it left the row spelling one phoneme
  two ways: the other eight cells all write **ï** (`*adïg`, `*ït`, `*balïk`, `*kïŕïl`, `*tïl`,
  `*ūdï-`, `*ïgač`, `*kï̄rᶻ`), and EDAL prints those with ɨ too. The row has a standing ɨ→ï
  normalisation that this cell escaped. **Fixed to `*jaŋï`**; the IPA field keeps ɯ, as `*balïk` →
  `balɯk` does.

## IPA-field fixes

**new / `pura`** kept **U+0315**, a Uralicist palatalisation mark, in a field that is supposed to be
IPA — while the row resolves exactly that elsewhere (`*śata` → ɕata, `*pućka` → putɕka). Surface
stays byte-identical to uralonet; IPA is now `wuðʲe`. **new / `pmay`** had `ʔaakʼ`, which neither
resolves Kaufman's optional length nor IPA-ises it the way the row does (`*bʼaaq` → baːq,
`*kaabʼ` → kaːɓ); most of his cognates are short, so it is now `ʔakʼ`.

## Left open, deliberately, with the note at the cell

- **head / `p_sit`** — STEDT #386 prints `PTB *m/s-gaw` and the cell drops the `/s`. But **no other
  cell in this row carries a slash**, so adding one would be as much an anomaly as dropping it. The
  question is whether other p_sit cells simplified alternating prefixes the same way; until someone
  checks, the cell carries the note.
- **head / `p_hmx` IPA `S-pʰrei` and new / `p_dra` IPA `putV`** leave cover symbols standing in the
  IPA field. The row is already inconsistent about this (`*N-təu` → `ntəu` resolves, `*N-cæwH` →
  `N-cæwH` does not), so this is a row-wide convention needing one decision, not a defect of these
  cells.
- **`pban`** — **BLR3 is no longer queryable**: `linguistics.africamuseum.be/BLR3.html` redirects to
  a 404 and the museum now ships it only as a desktop download, so 3023 and 2495 could not be read.
  Both cells are row-perfect in shape. But Wiktionary's Proto-Bantu Swadesh list (Schadeberg 2003)
  prints 'new' as `*=pɪ́-a (HH?)` — High-High, not the H-L here. Different source, different
  notation, and Schadeberg's own `?` marks it uncertain, so this is **flagged, not decided**. These
  two tones have already been printed backwards once.

## What the claim survived

Rows checked against their own source rather than only against themselves: `paus` (ACD 27867/25140
— `*quluh` and `*baqeRuh` exact, final -h and schwa-as-e confirmed), `pura` (uralonet 1173 —
byte-identical, U+03B4 U+0315 U+0065), `ptrk`, `p_tun`, `ptai` both, `pmay` (Kaufman p.549
`pM *7a(a)k' [1]` — **the parentheses are Kaufman's own**, and 7→ʔ, '→ʼ is this row's
transliteration), `p_aav` new (Sidwell 2024 #81), `p_dra`, `p_hmx` both, `p_sit` head, `pmng` both,
`p_ine` head. Checked against the row only: `psem`, `pkar`, `puaz`, `p_kor`, `p_jpn`, `p_ryu`,
`p_toc`, `p_sit` new, `p_ine` new.

The codepoint sweep found no Cyrillic lookalikes, no syllable dots, no stray `7` or ASCII apostrophe
in the new cells, and combining marks consistent with the row.
