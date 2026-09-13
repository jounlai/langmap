# Review 527 — closed

**Question:** Does each nickname actually name THAT language, and does the source cited actually say so?

**Scope:** all 32 entries of `lang_nicknames.js` (23 en, 9 ja) against `docs/lang-nickname-sources.md`.
**Result:** 20 verified clean, 12 flagged, 4 dropped, 1 formal name changed, 5 source cells rewritten.

## Dropped

- **`en.ak` = Twi.** Both cited sources say Twi is a dialect cluster *inside* Akan, not a cover name
  for it — and Twi is the collective name for Asante/Akuapem/Bono only: **it excludes Fante**.
  Printing it on the Akan row narrows the language and leaves Fante speakers out. The citation
  supported the caveat, not the claim.
- **`en.en_manc` = Manc.** Both cited university pages use it only attributively — "the 'Manc'
  accent" — never standing alone. Standing alone Collins gives "a native or inhabitant of
  Manchester". On goods, printed alone, it says *I am from Manchester*, which is not what the
  other entries say.
- **`ja.wuu` = 上海語.** Whether this names the row depends on which of the repo's own two names you
  believe, and they contradict each other: `wordmap_data.js` says `name: 'Wu Chinese', native: 吳語`
  while `lang_names.js` says Shanghainese / 上海呉語, and `meta_desc/wuu.js` describes the ISO
  macrolanguage and says outright 「上海語を呉語全体の代表とすることはできない。」 The row's identity
  has to be settled first; the nickname is dropped until it is. **Open.**
- **`ja.my` = ビルマ語** — not a nickname at all, and the pair was inverted. デジタル大辞泉 heads the
  entry at ビルマ語 and gives ミャンマー語 as the alternative, and `lang_names.en.my` was already
  "Burmese". Resolved by making ビルマ語 the **formal** Japanese name, matching English, and
  removing the nickname.

## Source cells rewritten

- **`en.yi` mame-loshn — the citation did not say it.** Jewish English Lexicon entry 334 defines
  mame-loshn as the common noun "A mother tongue"; the `[Yiddish]` tag is the language-of-origin
  tag, not the referent. The nickname is true and easily sourced — JewFAQ: "Yiddish is referred to
  in Yiddish as 'mame loshn' … which means 'mother tongue.'" Nickname kept, source replaced.
- **`en.pcm`** cited the bare site root, which contains neither quoted sentence; replaced with the
  deep link where both appear verbatim.
- **`en.pal`** cited an Encyclopaedia Iranica path that does not resolve; corrected.
- **`en.jam`** over-claimed Glottolog: on jama1262 "Patwa" is the **Swedish** label, not an English
  alternative name. Clause cut.
- **`ja.ar`** claimed フスハー is an independent kotobank headword; it is served inside the
  「アラビア語」 article. Softened.

## Kept with a note

`en.en_my` Manglish is the basilect name standing for the whole row — the same shape as
`en_sg`/Singlish, which the owner named as the model case, so it stays and the mismatch is now
stated. `en.ar` Fusha overlaps the separate `ar_qur` row, since Glottolog lists "Classical Arabic"
and "Koranic Arabic" for the same entry. `ja.ang` is called a 別称 by 世界大百科事典, which is the
Japanese edge of the dataset's own "endonyms are rival formal names, not nicknames" rule.

## Verified clean, on the rule's borderline

`en.ht` Kreyòl, `en.ja_oki` Uchinaaguchi, `en.nds` Plattdeutsch, `en.hy_grab` Grabar, `en.kaw` Kawi
— every source says what it is cited for. Kawi and Grabar are field terms an English reader would
not recognise unaided, but the map's own base names already carry them as "Old Javanese (Kawi)" and
"Classical Armenian (Grabar)", so they are internally consistent.

**Nothing was found to have been wrongly cut**, and no nickname collides with another row's formal
name (Twi, Farsi, Patwa, Pidgin, Lallans, Kawi, Pahlavi, Platt all checked). `en.fa` = Farsi is
precise here because `prs` Dari and `tg` Tajik are separate rows.

Seven entries had at least one citation that could not be opened (OED OAuth, a paywall, and 403s);
each is listed in the round's JSON with what was confirmed indirectly and how. No finding rests on
recall.
