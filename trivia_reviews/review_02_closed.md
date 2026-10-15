# Trivia review 02 — English pass, verification, 18 translations

**Date:** 2026-10-15
**Status:** CLOSED.
**Scope:** all 70 read-aloud articles (Word Map 30, Han Map 40).
**Brief:** accuracy from a specialist linguist's view; readability and
interest from a casual language fan's view ("面白く、難なく読める"). Working
files: ~/langmap-work/trivia2/.

## English pass — 6 editors, then 6 fact-checkers
587 proposals: correction 264, hedge 87, addition 92, update 22, rewrite 47,
new sources 75. Every factual edit was re-checked by a second agent against
the sources (default reject): 484 accepted, 103 amended (wording pulled back
to what the source says), 0 rejected. 586 applied mechanically, one (Hawaiian
humuhumunukunukuāpuaʻa, which also appears in the ja body) by hand.
Examples: Bantu farmers reached South Africa by c. 300 CE, not in the second
millennium; the Silbo Gomero UNESCO "quotation" had been altered; 㔓 is a
Chinese character ("to stammer"), not Korean; Tata-tonga captured 1204, not
1206, and Mongolia's 2025 law adds the vertical script beside Cyrillic rather
than replacing it; a Pāṇini rule of the form A → B / X _ Y is
context-sensitive, not context-free; Khitan small script is not "mostly
phonetic" (125 semantic, 115 phonetic of 378); Guugu Yimithirr direction
roots have seven case forms each; 経済 is mixed go-on/kan-on, not pure kan-on.

## Translations — 18 UI languages
The 511 changed English passages were carried into ja ko zh yue vi th id hi
de fr it es pt ru uk ar he sw by one native-register editor per language,
re-phrased as natural prose rather than translated line by line. 8,600+
find/replace entries; all applied (Italian aymara/tuyuca redone once: the
overlay escapes apostrophes inside bodies).

## Tooling found on the way
- The applier wrote an unescaped apostrophe into single-quoted titles and
  broke the fr and it overlays; no guard noticed, because overlays load only
  at runtime and a broken one silently falls back to English. Fixed, and a
  new guard tools/trivia_parse_check.js ("trivia files parse") now evaluates
  every trivia file and checks each overlay carries all 30 articles.
- trivia_zh_script_check: cited written forms (Japanese kanji/words, Korean
  hanja, coin inscriptions, 乾隆, 崔萬理 …) registered in CITED.
- trivia_translation_drift: four figures were number-format differences
  (Indian grouping, 1,400 ล้าน, 100万単位, 約250万人) — ALLOWed with reasons.
