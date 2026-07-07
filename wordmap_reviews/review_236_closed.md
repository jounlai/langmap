# Wordmap review #236 — Americas (part 3) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Alonso Quirós-Mena, a descriptive linguist working on Mayan (K'ichean and Mamean branches) and Chibchan (Isthmian) languages. For the Mayan cells I lean on Nora C. England's *A Grammar of Mam, a Mayan Language* (1983) and the Academia de Lenguas Mayas de Guatemala (ALMG) standardized dictionaries and *gramáticas normativas* for Poqomchi', Q'anjob'al, Ixil and Awakateko, together with Terrence Kaufman's comparative Mayan lexical database and Vázquez Álvarez's *A Grammar of Chol*. For Chibchan I use Adolfo Constenla Umaña's phonological work on Bribri, the Jara Murillo & García Segura Bribri pedagogical grammars (*Se' ttö́ bribri ie*), and Nils Holmer / Llerena Villalobos on San Blas Kuna (Guna). My focus in this pass was the phonetic notation of the voiced-stop series, where Mayan glottalized/implosive *bʼ* [ɓ] must be kept distinct from the plain voiced stops of Chibchan.

## Issues found

### 1. `bzd` — you — Bribri /b/ is a plain stop, not an implosive
- **File:** `words/you.js` — code `bzd`
- **Current:** ["beʼ","ɓeʔ"]
- **Expected:** ["beʼ","beʔ"]
- **Why:** Bribri lacks an implosive series; the orthographic *b* is a plain voiced bilabial stop [b] (word-initially), realized [β] only intervocalically (Constenla Umaña 1998; Jara Murillo & García Segura, *Se' ttö́*). The implosive symbol [ɓ] belongs to Mayan *bʼ*, not to Bribri. 2sg "beʼ" should be [beʔ].

### 2. `bzd` — two — implosive symbol on plain /b/
- **File:** `words/two.js` — code `bzd`
- **Current:** ["bö́l","ɓɵ́l"]
- **Expected:** ["bö́l","bɵ́l"]
- **Why:** Same issue: "bö́l" (numeral 2, Coroma-dialect *l* variant of *bö́r*) begins with plain [b], not implosive [ɓ]. Bribri has no phonemic implosives.

### 3. `bzd` — star — implosive symbol on plain /b/
- **File:** `words/star.js` — code `bzd`
- **Current:** ["bák","ɓák"]
- **Expected:** ["bák","bák"]
- **Why:** "bák" 'star' is word-initial plain [b], not [ɓ]. Correct the segment to match Bribri's plain voiced-stop phonology.

### 4. `mam` — i — ejective mismatch with orthography
- **File:** `words/i.js` — code `mam`
- **Current:** ["aqiin","aˈqʼiːn"]
- **Expected:** ["aqiin","aˈqiːn"]
- **Why:** The 1sg emphatic/independent pronoun is *aqiin* with a plain uvular stop (England 1983; ALMG Mam orthography). The IPA writes an ejective [qʼ], which contradicts the orthography (no *ʼ* after *q*); an ejective would be spelled *aqʼiin*. Correct the IPA to plain [aˈqiːn].

## Worker response (作業者)
Findings: 4 · applied 4 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
