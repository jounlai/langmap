# Wordmap review #417 — woof (a new word, #27): the dog-bark onomatopoeia

## Why this review exists
A second new WordMap concept: **woof** — the conventional imitative word for a dog's bark in each language (English *woof*, Japanese ワンワン, Mandarin 汪汪, Spanish *guau guau*, Russian *гав-гав*, Korean 멍멍). It is the **noun-like onomatopoeia / interjection**, NOT the verb "to bark" and NOT the noun "dog". Like the cuckoo it is a **partial word** (◐), with its own per-word note explaining it is an onomatopoeia still filling in coverage (`PARTIAL_WORD_NOTE` is keyed by word id, with a generic `_default`).

It sits right after the cuckoo in `WORD_ORDER` — both are words the mouth borrows from the world.

## Method
Seeded (~52 well-attested languages) then grown by family-domain review-and-expand rallies; every form sourced (chiefly Wikipedia "Cross-linguistic onomatopoeias", language dictionaries, national onomatopoeia references), each adversarially verified, IPA held to convention by `tools/cuckoo_ipa_lint.js` (it lints every partial word). Non-tonal languages get plain IPA; only zh/yue/wuu/th/vi carry Chao tone letters.

## Findings
- **Seed-slip fixes:** Azerbaijani hav→**ham-ham**, Slovene voiced-glottal ɦ→velar **x**, Catalan **bub-bub** (with final-obstruent devoicing bub→bup in the IPA), Japanese waŋ→**waɴ** (uvular nasal), Thai tone ˨˩→**˥˩** (ฮ is a low-class consonant → falling under mai ek).
- **Additions with real sources:** Welsh wff wff, Basque au au, Armenian հաֆ հաֆ, Breton wouf, Belarusian гаў-гаў, Bosnian, Galician, Kazakh шәу-шәу, Uzbek vov-vov, Mongolian хав хав, Shanghainese 汪汪, Kapampangan, Cebuano, Balinese, Somali (later refuted, #418), the Dravidian south (Malayalam ബൗ, Telugu భౌ, Marathi भो, Nepali, Sinhala, Kannada ಬೌ), and a further reach to Africa & the Pacific — **Yoruba gbó gbó** (later refuted, #418), Hawaiian ʻaoa, Māori au au, Sundanese gogog, Scottish Gaelic af af.
- **Not guessed:** Lao *honghong* is attested but its tone could not be pinned down, so it was **left blank** rather than given an invented Chao tone. Several listicle-only proposals (Irish "amh amh" = actually "raw"; Punjabi; a Yoruba tone-doubling) were rejected.

## Correction later (#418)
The adversarial hardening found two woof errors: **Yoruba gbó gbó is the VERB "to bark", not the sound** (removed), and **Somali "wah" was unsourceable** (removed). Irish was added properly as **bhuf bhuf** from the Foras na Gaeilge official dictionary (focloir.ie).

Final: woof ~80 sourced languages. All data guards pass.
