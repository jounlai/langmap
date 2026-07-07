# Wordmap review #355 — Uralic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Aatami Rautio, a comparative Uralist working across the Finnic, Sámi, Mordvin, Mari, Permic, Ugric and Samoyedic branches. For pan-family control I lean on Abondolo & Whitehead (eds.), *The Uralic Languages* (Routledge, 2nd ed. 2023) and Collinder's *Comparative Grammar of the Uralic Languages*. Branch references used this pass: Sammallahti, *The Saami Languages: An Introduction* (Davvi Girji 1998) and Nielsen's *Lappisk (samisk) ordbok* for Sámi; Tereshchenko's *Nenetsko-russkij slovar'*, Helimski's Nganasan materials and Katz for Samoyedic; Honti's *Chrestomathia Ostiacica* and the Munkácsi–Kálmán *Wogulisches Wörterbuch* for Ob-Ugric; Rédei's *Syrjänische Chrestomathie* and Bartens' *Permiläisten kielten rakenne* for Permic; Zaicz for Mordvin and Alhoniemi's Mari grammar; Viitso & Ernštreits' Livonian dictionary plus the standard Karelian/Veps/Votic lexica for the smaller Finnic languages. I read each cell as [native orthography, broad IPA] and checked sense (1sg / 2sg-informal / cardinal-2 / appellative noun / celestial noun), script correctness, and segmental/prosodic plausibility.

## Issues found
All genuine Uralic word-cells verify correct, and no cell warrants a reference-grade correction. The Finnic core (fi, et, krl, olo, vep, vot, liv, vro), the full Sámi cluster (se, sma, smj, smn, sms, sjd), Mordvinic (myv, mdf), Mari (mhr, mrj), Permic (kpv, udm), Hungarian/Old Hungarian (hu, ohu) and the Ob-Ugric/Samoyedic entries (kca, mns, yrk, enf, nio, sel) all carry the correct sense, native script and plausible IPA — e.g. Nenets `star` нумгы /numˈɡɨ/, Khanty `star` хус /xus/, Komi `star` кодзув /ˈkodʑuv/, Erzya `star` теште, Livonian `star` tēḑ /teːdʲ/. All pronouns are the expected 1sg / 2sg-informal, and the Sámi initial *d* is correctly transcribed voiceless [t] (se don /ton/, smj dån /tɔn/, sms/sjd ton/тонн).

Two observations are recorded but are **not** correctable through the word-cell mechanism (no valid Uralic replacement exists), so they carry no `corrections` entry:

### (note, not a fix) `squ` — data integrity — misclassified non-Uralic language
- **File:** `words/*.js` — code `squ`
- **Current:** family tagged "Uralic (Saami, Eastern)"; forms i=["en","ʔən"], two=["chánay","t͡ʃanaj"], star=["kwekwtsi7","kʷəkʷt͡siʔ"] …
- **Why:** Squamish (Sḵwx̱wú7mesh) is a **Coast Salish (Salishan)** language of British Columbia, not Saami/Uralic. The cell contents are Salishan, not erroneous Uralic; the defect is the family label. Outside a Uralist's authority to re-supply, so flagged only for triage, not corrected here.

### (note, not a fix) `tsi` — data integrity — non-Uralic language in a Uralic set
- **File:** `words/*.js` — code `tsi`
- **Current:** Coast Tsimshian (Tsimshianic) forms appearing in the Uralic review batch.
- **Why:** Tsimshianic is a separate family (Pacific Northwest); its cells are not Uralic and lie outside my domain to verify or correct. Flagged for routing to the appropriate reviewer.

Watch-item (no change): Mansi (mns) `star` сов /soβ/ — сов also carries the sense "hide/bark/scale" in Northern Mansi, so I regard the celestial reading as worth re-sourcing against Munkácsi–Kálmán; however, I could not confirm a reference-grade alternative and therefore do **not** substitute one (a rigorous review must not replace an uncertain form with another uncertain form).

## Worker response (作業者)
Findings: 0 · applied 0 · rejected 0 · skipped 0. All Uralic cells verified correct; the squ/tsi anomalies are metadata/domain-routing issues with no valid Uralic word-cell correction, and the mns `star` watch-item lacks a reference-grade replacement. `node validate_wordmap_data.js` passing.

**File status: CLOSED**
