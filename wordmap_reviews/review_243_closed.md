# Wordmap review #243 — Caucasian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. T. Q. Nakashidze, a descriptive/historical linguist working across the three Caucasian families. My core reference shelf for this review: for Lezgic I lean on Martin Haspelmath's *A Grammar of Lezgian* (Mouton, 1993) and the Talibov–Gadžiev *Лезгинско-русский словарь*; for Archi, A. E. Kibrik's *Опыт структурного описания арчинского языка* and the Kibrik–Kodzasov materials; for the Tsezic branch, Bernard Comrie & Maria Polinsky on Tsez and Helma van den Berg's *A Grammar of Hunzib*; for Nakh, Johanna Nichols on Chechen/Ingush and D. Imnaishvili on Bats/Tsova-Tush; for Avar-Andic, the Cyrillic-based Saidova and Gudava wordlists. On the Northwest side I use B. G. Hewitt's *Abkhaz* (Lingua Descriptive Studies) and Chirikba for Abaza, plus Georges Dumézil's *Le verbe oubykh* and *La langue des Oubykhs* for Ubykh, and Wolfgang Schulze for Udi/Caucasian Albanian (Gippert et al. 2008). Kartvelian forms are checked against Fähnrich's *Kartwelisches etymologisches Wörterbuch* and Kevin Tuite's Svan work. My review below concentrates on segmental IPA fidelity, since the orthographies and lexical senses here are overwhelmingly sound.

## Issues found

### 1. `lez` — name — ejective тӀ mis-transcribed as pharyngealized
- **File:** `words/name.js` — code `lez`
- **Current:** ["тӀвар","tˤʷar"]
- **Expected:** ["тӀвар","tʼʷar"]
- **Why:** In standard Lezgian the letter тӀ (palochka series) is the ejective /tʼ/, not a pharyngealized /tˤ/. Haspelmath (1993) transcribes 'name' as *tʼwar*. The corpus itself already uses the correct ejective /tʼʷar/ for the cognate word in Kryts (`kry`) and Budukh (`bdk`), so the ˤ here is an internal inconsistency and a segmental error. The consonant should carry the ejective diacritic ʼ.

### 2. `agx` — name — ejective тӀ mis-transcribed as pharyngealized
- **File:** `words/name.js` — code `agx`
- **Current:** ["тӀвар","tˤʷar"]
- **Expected:** ["тӀвар","tʼʷar"]
- **Why:** Aghul, like its Lezgic sisters, has ejective тӀ = /tʼ/ (Magometov's Aghul description; the Lezgic palochka series is uniformly glottalic-egressive). The word тӀвар 'name' is /tʼʷar/, matching the Kryts/Budukh cells. The /tˤ/ pharyngealized transcription is wrong; use /tʼʷar/.

### 3. `tab` — name — ejective тӀ mis-transcribed as pharyngealized
- **File:** `words/name.js` — code `tab`
- **Current:** ["тӀвар","tˤʷar"]
- **Expected:** ["тӀвар","tʼʷar"]
- **Why:** Tabasaran тӀ is the ejective /tʼ/ (Kibrik & Seleznev; Magometov, *Табасаранский язык*). 'Name' = тӀвар /tʼʷar/. As with `lez` and `agx`, the pharyngealization mark ˤ should be the ejective mark ʼ, consistent with the correctly transcribed Kryts and Budukh cells.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
