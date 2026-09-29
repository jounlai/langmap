# Review 547 — one-symbol outliers inside a row

Closed 2026-09-29. One round, five concurrent reviewers (by region).
Commits 5613b761 (slices 1–3, 5), fea712ce (Vietnamese, Korean, owner-caught
fixes), 9928ea0a (slice 4).

## Detector

`~/langmap-work/rv547/suspects2.js`: a symbol that occurs once in a row while
its near-class counterpart (e/ɛ, o/ɔ, ə/ɪ, ʈ/t, a/ɑ, ŋ/ŋ͡m …) occurs ≥3 times
in the same row; plus rows whose surface and IPA share <34% of their letters
(wrong-gloss or wrong-language cells). Each suspect was checked against a
dictionary or grammar before a fix was written.

## Fixed (~1,450 cells)

- Whole rows: Kikuyu/Meru/Embu vowels (ĩ=e ũ=o e=ɛ o=ɔ, ~120 cells), White
  Hmong, Nias, Paiwan, Tsou, Arakanese, Q'anjob'al, Badaga, Norwegian
  retroflexes, Hindustani ə/ɪ/ʊ, Dari ā, Japanese ɯ, Arabic/Berber rain ɑ.
- Wrong gloss: Pemón house/moon, Nheengatu thanks, Muscogee blood/red, Lisu
  house, Ingush fire (цӏе "red" → цӏи), Mingrelian ear/rain/one, Karakhanid
  hand (qol "arm" → elig), Egyptian tree, Assyrian wind, Karachay good,
  Maltese foot sieq, Kabyle dog/rain, Georgian sleep, Nogai verbs.
- Vietnamese -ong/-oc → ŋ͡m/k͡p on both maps (24 WordMap + 15 Han Map cells).
- Korean final stops ̚ in all seven modern rows (32 cells).
- el_grc nose r̥ǐːs, snow kʰiɔ̌ːn.

## Reverted / overruled

- bg poop DEL: absence of evidence, and "—" is invalid in a modern row.
  Restored каки.
- es_pr stress on snow/daughter/eye: one Spanish variety only; sibling rule.
- route_ipa.py mis-split a multi-word route surface (rki wine, caught by the
  owner). Restored; every route surface diffed against ebc12b9e — no other.
- Slice 4 "keep as is" note parsed as a fix on xh n99. Restored; scanned all
  cells for reviewer prose — none.
- ml tea restored ചായ.
- vi_han 風: rally normalised fɔŋm→fɔŋ; the right direction is ŋ͡m (owner).

## Locks

- intra_row_dup: `inh|fire|name` — Ingush цӏи is both (cf. Chechen цӏе).
- proto_form_leak: `ojp|bird`, `xqa|hand` circular (attestation is a source
  of the reconstruction).
- cuckoo_ipa_lint TIE_BAR narrowed to affricates so ŋ͡m/k͡p pass.

## Held (not fixed this round)

zh third tone ˨˩˦ vs ˧˩˧; km ដ d/ɗ; Punjabi tone; Classical Tibetan rows;
blt Tai Dam rebuild; Even vs Evenki; Kamba vowels; pt_gw Kriol pass;
uk/lv/sr/orv stress; Luxembourgish soil; fr_class r/ʁ; Ngäbere/Otomi/Yapese
vowels; cdo one; mnw; tyz drink uống.
