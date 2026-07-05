# Wordmap review #195 — Americas (part 3) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Elena Ruiz-Coto, a descriptive linguist working on the Mayan and Isthmian-Chibchan languages of Mesoamerica and Lower Central America. For the Mayan cells I rely on Nora C. England's *A Grammar of Mam, a Mayan Language* (1983) and the Proyecto Lingüístico Francisco Marroquín / OKMA orthographic standards, Terrence Kaufman's *Mayan Comparative Etymological Dictionary*, the Chol grammars of Coon and Vázquez Álvarez, the *Diccionario Q'anjob'al* (Academia de Lenguas Mayas de Guatemala, ALMG), and Warkentin & Scott's Chontal materials. For the Chibchan cells I use Adolfo Constenla Umaña's *Comparative Chibchan Phonology* and *Gramática de la lengua guna*, together with Carla Victoria Jara Murillo & Alí García Segura's *Se' ttö́' bribri ie / Diccionario bribri–español* for Bribri. My review focuses on sense accuracy (2sg-informal vs honorific/plural, cardinal vs ordinal, common noun vs proper name), script fidelity (ALMG orthography for Mayan vs the practical Costa Rican/Panamanian orthographies for Chibchan), and IPA plausibility (glottalization, implosion, and tone marking).

## Issues found

### 1. `bzd` — star — Mayan glottalization artifact imported into a Chibchan word
- **File:** `words/star.js` — code `bzd`
- **Current:** ["bʼak","ɓak"]
- **Expected:** ["bák","ɓák"]
- **Why:** Bribri (Chibchan) does not use the ALMG-style saltillo/glottalization apostrophe `ʼ`; the sequence `bʼ` is a Mayan orthographic convention that has no place in Bribri, whose practical orthography (Jara Murillo & García Segura) writes the celestial "star" simply as **bák** with a marked high tone. The current cell (a) carries a spurious `ʼ` and (b) omits the lexical tone, even though the same language's `two` cell (`bö́l`) correctly marks tone. Since the rest of the Bribri row systematically transcribes the plain voiced stop as /ɓ/, the IPA should stay /ɓ/ but gain the acute for tone → /ɓák/. The core error is the illegitimate glottal apostrophe plus the missing tone diacritic.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
