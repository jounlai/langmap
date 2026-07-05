# Wordmap review #385 — Pidgins & creoles (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aurélie Brévent, a creolist (Ph.D. in contact linguistics) whose fieldwork spans the Atlantic French- and English-lexifier creoles and the Pacific Melanesian Pidgin cluster. For this review I worked from John Holm's *Pidgins and Creoles* (1988–89) and the *Atlas of Pidgin and Creole Language Structures* (APiCS Online; Michaelis, Maurer, Haspelmath & Huber 2013) as the comparative backbone, cross-checking individual lects against Valdman et al.'s *Haitian Creole–English Bilingual Dictionary* (2007), Cassidy & Le Page's *Dictionary of Jamaican English*, the Belize Kriol Bileek (Bileez Kriol Projek) orthographic standard, Kihm's *Kriyol Syntax* (Guinea-Bissau), Lang's *Dicionário do crioulo da ilha de Santiago* (Cape Verdean), Kouwenberg & Ramos-Michel on Papiamentu, Smith & Veenstra and the SIL Sranan/Ndyuka/Saramaccan lexica for the Surinamese creoles, Mühlhäusler & Verhaar on Tok Pisin, and — for the Philippine Spanish creole — Whinnom's *Spanish Contact Vernaculars in the Philippine Islands* (1956), Forman's *Zamboangueño Texts* (1972), and Lipski's and Steinkrüger's descriptions of Chabacano phonology. The 26 domain cells are overwhelmingly sound; the two corrections below concern Zamboangueño Chavacano IPA, where the transcriptions import Peninsular-Spanish segments that this creole does not have.

## Issues found

### 1. `cbk` — star — Chavacano is yeísta: `ll` is [ʝ]/[j], not [ʎ]
- **File:** `words/star.js` — code `cbk`
- **Current:** ["estrella","esˈtɾeʎa"]
- **Expected:** ["estrella","esˈtɾeja"]
- **Why:** The orthography *estrella* is correct, but the palatal lateral [ʎ] is not part of the Zamboangueño (Chabacano) sound system. Philippine Spanish and its creoles are thoroughly yeísta — historical `ll` merged with `y` and is realised as the palatal glide/approximant [ʝ]~[j] (Whinnom 1956; Forman 1972; Lipski, "Chabacano/Spanish and the Philippine linguistic identity"; Steinkrüger 2008). The [ʎ] transcription reflects a conservative Peninsular norm absent from this variety, so the segment is simply wrong for `cbk`: *estrella* = [esˈtɾeja].

### 2. `cbk` — name — intervocalic/cluster `r` is a tap [ɾ], not a trill [r]
- **File:** `words/name.js` — code `cbk`
- **Current:** ["nombre","ˈnombre"]
- **Expected:** ["nombre","ˈnombɾe"]
- **Why:** In Chavacano (as in its Spanish lexifier) the rhotic contrast is neutralised to the tap [ɾ] everywhere except word-initially, after a heterosyllabic /l, n, s/, or where `rr` is written. In *nombre* the rhotic sits in the onset cluster /bɾ/ and is a tap, so the form is [ˈnombɾe]. The trill [r] given here does not occur in that environment; note the reviewer's own `estrella` cell correctly uses the tap [ɾ], confirming this is an isolated transcription slip.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
