# Review 604 — 'not yet determined' routes resolved by resemblance (2026-10-25)

Owner (2026-10-25): 「not yet determined が多すぎる。周囲に似た発音が多いから簡単に
推測できるのに」. Policy from here: an 'unknown' cell may take the route of
sourced cells of the same word whose pronunciation is near-identical, and the
note says so ("Route by resemblance to the neighbouring forms (…); no
etymology of its own").

Detector ~/langmap-work/rev1025/infer_routes.js: IPA folded (stress, length,
tones, vowel/rhotic/sibilant classes merged), Levenshtein ≤ 0.25 of the longer
form, all close matches on one route.

Applied:
- Countries (germany japan china korea india greece): 353 single-route matches
  + 13 mixed ones settled by region (jv/ban/min/bjn Japan → hokkien like
  Indonesian; ceb/ilo Alemanya → alemanni via Spanish; sco/rm Japan → europe;
  sg/sco/os/dsb India → greek; crh İndistan → persian). 366 cells.
- Other new words: 130 cells. Loan routes (nahuatl, nanas, medusa, eight,
  moon, count…) accept a match from any family; make-up routes (plain, other,
  imitative, god, small, big, local) need a match in the same family, plus
  eight clear cognate pairs the family labels missed (pl/sk netopier, bs/sr
  grmljavina, ssw/zu, nbl/nd/xh Monday, mer/ki rainbow, tig/ti potato, mk/ro bat).

Not applied:
- tomorrow, yesterday, grandmother: the route is a structural claim (same
  word for both days, split grandmothers), which a resemblance cannot show.
- 38 chance matches across families (niv лый ≈ 雷, br balum ≈ Evenki калим,
  kln tulet ≈ ro tunet, otq/yle ≈ Navajo, English-creole 'tonda' …).
