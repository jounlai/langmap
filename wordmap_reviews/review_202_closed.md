# Wordmap review #202 — Caucasian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Tamazi Kʼvirikashvili, a descriptive/historical linguist working across the three Caucasian families. For Kartvelian I lean on Klimov's *Etymological Dictionary of the Kartvelian Languages* (1998) and Fähnrich's *Kartwelisches etymologisches Wörterbuch* (2007), plus Tuite's Svan materials and the Laz/Mingrelian (Zan) data in Marr and Kartozia. For Nakh-Daghestanian my core references are the *North East Caucasian Languages* volumes and the individual grammars: A. Kibrik's Archi and Tsakhur monographs, Comrie & Polinsky and Polinsky's Tsez work, van den Berg's Hunzib and Khvarshi grammars, Nichols' Chechen/Ingush/Bats descriptions, Schulze's Udi and Caucasian Albanian (Gippert–Schulze–Aleksidze–Mahé palimpsest edition, 2008). For NW Caucasian I use Hewitt's Abkhaz grammar, Chirikba's Abaza/Abkhaz work, Kuipers/Smeets on Circassian, and for Ubykh the corpus of Vogt (*Dictionnaire de la langue oubykh*, 1963), Dumézil, and Fenwick's grammar. I checked all 150 cells for sense (singular vs. plural/honorific pronoun, cardinal vs. ordinal, common vs. proper noun), native script (Mkhedruli / Cyrillic / scholarly Latin as appropriate to each unwritten variety), and segmental IPA including ejective/pharyngealised marking.

## Issues found

### 1. `ddo` — you — spurious final glide in Tsez 2sg
- **File:** `words/you.js` — code `ddo`
- **Current:** ["мий","mij"]
- **Expected:** ["ми","mi"]
- **Why:** The Tsez (Dido) 2sg absolutive pronoun is /mi/, symmetric with the 1sg /di/ that is (correctly) given as ди/di in the same row. There is no final palatal glide: Comrie & Polinsky and Polinsky's Tsez descriptions consistently cite absolutive 1sg *di*, 2sg *mi* (pl. *meži*). The trailing й / j is an over-transcription and should be removed; Cyrillic-orthography Tsez writes plain ми.

### 2. `uby` — two — double ejective in Ubykh 'two'
- **File:** `words/two.js` — code `uby`
- **Current:** ["tqʷʼa","tʼqʷʼa"]
- **Expected:** ["tqʷʼa","tqʷʼa"]
- **Why:** Ubykh 'two' is /tqʷʼa/ — a plain dental stop followed by a labialised ejective uvular. Only the uvular carries glottalisation (Vogt 1963; Fenwick 2011). The IPA field marks an extra ejective on the initial /t/ (tʼqʷʼa), which contradicts both the phonology and the language's own native-transcription field (tqʷʼa, no apostrophe on t). The IPA should match: tqʷʼa.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
