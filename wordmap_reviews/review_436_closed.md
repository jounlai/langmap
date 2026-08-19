# Review 436 — new core word `three`, and what the existing `one`/`two` rows decided

**Date:** 2026-08-19
**Scope:** `words/three.js` — the 35th concept, all 1,151 languages. Completes
the cardinal series the atlas already carried at 1 and 2.
**Method:** as in review 435, sources first. The decisive aid here was not an
external dataset but **the atlas's own `one.js` and `two.js`**: for a numeral,
those two rows fix the script, the transcription style and — critically —
*which numeral series* a language row uses.

Sources:

- **Numeral Systems of the World's Languages** (`lexibank/numerals`, parameter
  3 = THREE) — 4,237 ISO-keyed languages, 712 of our 999 ISO-coded rows
- **ABVD** (`word.php?v=199`) — 1,763 Austronesian rows
- **IDS**, **NorthEuraLex**, **Bowern Pama-Nyungan**, Sagart/Sun Sino-Tibetan,
  Marrison Naga, Mann Burmish, Chen Hmong-Mien, Sidwell Bahnaric, Gerardi Tupí
- Sinitic rows derived from HanMap's own 三 readings (三 is 平聲清, so each
  topolect's yinping citation tone applies directly)

**Result:** 761 rows had at least one comparative source; the sweep produced 8
genuine corrections — `ygr` Yagaria, `mkz` Makasae, `kpf` Komba, `pao` Northern
Paiute, `tar` Tarahumara, `tao` Yami, `kfa` Kodava, `psi` Pashai.

## The one real editorial decision

Several languages keep two numeral series — a native one and a Sinitic
borrowing. The concept definition originally said "take the native series",
which would have contradicted the atlas's own data: `one` and `two` read
一 / 二 for Japanese (Sino-Japanese) but 하나 / 둘 for Korean (native).

The definition was rewritten to state the rule the corpus already follows:
**take the series used for plain counting, the same one as this atlas's "one"
and "two" rows.** So Japanese reads 三 *san*, Korean 셋 *set*, Okinawan みーち.
This is worth stating explicitly because it is the sort of rule that quietly
diverges the next time someone adds 四.

## Side effect

`fonts/NomNaTong-subset.woff2` gained **𠀧** (U+20027, chữ Nôm *ba*) — the
third Ext-B codepoint added across red/fish/three. The subset now carries 29
codepoints; `unicode-range` updated in `wordmap.html` and `hanmap.html`.
