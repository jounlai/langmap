# Wordmap review #376 — Mongolic & Tungusic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Sühbaataryn Otgonbayar, a comparative Altaicist working on the Mongolic–Tungusic interface. For the Mongolic column my desk references are Janhunen (ed.) *The Mongolic Languages* (2003) and his *Mongolian* (2012), Poppe's *Introduction to Mongolian Comparative Studies*, and above all Nugteren's *Mongolic Phonology and the Qinghai–Gansu Languages* (2011) for the Shirongol group (Mongghul/Monguor, Dongxiang/Santa, Bao'an, Eastern Yugur), plus Ramstedt's *Kalmückisches Wörterbuch* for Oirat-Kalmyk and Kane's *The Kitan Language and Script* (2009) for Para-Mongolic. For Tungusic I lean on Benzing's *Die tungusischen Sprachen*, Cincius's *Сравнительный словарь тунгусо-маньчжурских языков*, Nikolaeva & Tolskaya's *A Grammar of Udihe* (2001), Norman's *A Comprehensive Manchu-English Dictionary* (2013), and Avrorin/Sunik for Nanai and Even. I checked every one of the 19 rows against these authorities, paying particular attention to the Proto-Tungusic numeral *\*ǯuːr* 'two', the pronoun isogloss *\*bi ~ mi* (1sg) / *\*si ~ hi* (2sg), and the star-etymon *\*hodun* (Mongolic) / *\*ōsīkta* (Tungusic).

## Issues found
### 1. `ude` — two — plain-stop onset instead of the pan-Tungusic affricate/palatal
- **File:** `words/two.js` — code `ude`
- **Current:** ["дуэ","duˈə"]
- **Expected:** ["дюэ","dʒuˈə"]
- **Why:** Every reflex of Proto-Tungusic *\*ǯuːr* 'two' preserves the palatal/affricate onset: Evenki дюр *ǯūr*, Even дёр *ǯȫr*, Negidal *ǯuːr*, Nanai дюэр *ǯuer*, Oroch *ǯū*, Manchu/Jurchen *juwe* — and the dataset's own sister rows here all show дю-/дж- (`evn` dʒuːr, `eve` dʲoːr, `gld` dʒuˈər). A plain voiced stop [d] with the spelling ду- is not attested for Udihe; Nikolaeva & Tolskaya (2001) and Cincius give the Udihe numeral with the affricate onset (ǯu(e)). Both the Cyrillic (ду vs. дю) and the IPA (duˈə vs. dʒuˈə) drop the palatalization, so this is a consistent segmental error, not a one-field typo. Correcting to дюэ / [dʒuˈə].

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
