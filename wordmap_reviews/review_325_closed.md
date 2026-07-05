# Wordmap review #325 — Caucasian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Tamar Beridze, a descriptive linguist working on Kartvelian and the Nakh-Daghestanian (Northeast Caucasian) family, with a secondary competence in the Northwest Caucasian languages. For this review I lean on the standard reference corpus: for Kartvelian, Klimov's *Etymological Dictionary of the Kartvelian Languages* and Tuite's *Svan* grammar; for Nakh, Nichols & Vagapov's *Chechen–English/English–Chechen Dictionary* and Nichols' *Ingush Grammar*; for the Tsezic branch, Comrie & Polinsky's Tsez materials, van den Berg's *Hunzib* and Khalilova's *Grammar of Khwarshi*; for Avar–Andic, Charachidzé and the Andic descriptions of Salimov; for Lezgic, Haspelmath's *Grammar of Lezgian*, Kibrik's *Archi* volumes and Schulze's Udi work; and for Northwest Caucasian, Dumézil's Ubykh materials and Chirikba's *Abkhaz*. My working method is to check each cell for sense (singular vs. plural/honorific, cardinal vs. ordinal, common noun vs. proper name), for orthographic normativity in the standardised Cyrillic/Latin systems, and for phonemic accuracy of the broad IPA, paying particular attention to the ejective, pharyngealised and labialised series that are the signature of this domain.

## Issues found

### 1. `ddo` — two — missing ejective on the uvular
- **File:** `words/two.js` — code `ddo`
- **Current:** ["къˤано","qˤaːno"]
- **Expected:** ["къӀано","qˤʼaːno"]
- **Why:** The Tsezic numeral 'two' is reconstructible with a pharyngealised **ejective** uvular, and this is exactly what the two sister cells in this same dataset already encode: Hunzib `къӀоно` [qˤʼono] and Khvarshi `къӀано` [qˤʼano]. Comrie & Polinsky transcribe Tsez 'two' as *q'ˤˤano*, i.e. ejective q' plus pharyngealisation — so the IPA must carry the ejective mark [qˤʼ], not the plain pharyngealised [qˤ] given here. The current cell drops the ejective entirely, which is a phonemic error (Tsez robustly distinguishes /q/, /qˤ/ and /qˤʼ/). The native spelling is likewise fixed to `къӀано`, matching the "къӀ = ejective uvular" convention already used for Hunzib and Khvarshi in this corpus, instead of the ad-hoc Cyrillic-plus-IPA-superscript hybrid `къˤ`.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-4 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
