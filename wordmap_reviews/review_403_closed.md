# Wordmap review #403 — Niger-Congo / Atlantic-Congo / Bantu / Nilo-Saharan / Khoisan / Mande (full 25-word audit, 10-thread rally)

## Reviewer self-introduction (ペルソナ自己紹介)
Comparative Africanist specialising in Benue-Congo (Edoid, Igboid, Bantu) and Nilotic descriptive linguistics, working from Melzian's Concise Dictionary of the Bini Language, the Comparative Bantu OnLine Dictionary (BLR3), and Western Nilotic (Nuer/Dinka/Luo) reference grammars.

## Issues found

### bin (Edo (Bini)) — `fire` — fabricated-or-implausible [medium]
- Current: `kuẹ` /kue/
- Corrected: `erhẹn` /eɾɛ̃/
- Rationale: Every other cell in this row is unambiguously Edo (father érhá, eye aro, hand obo, water amẹ, name eni, one okpa). The Edo word for 'fire' is erhẹn; 'kuẹ' is not the Edo fire word. Transcription follows the row's own rh→/ɾ/ convention (érhá→/eɾa/).

### bin (Edo (Bini)) — `drink` — fabricated-or-implausible [medium]
- Current: `emenaada` /emenada/
- Corrected: `da` /da/
- Rationale: The Edo verb 'to drink' is da (cf. the sibling Edoid entries iso 'da' and urh 'da' in this same file). 'emenaada' is anomalous and does not correspond to any attested Edo drink form.

### nus (Nuer) — `eye` — fabricated-or-implausible [medium]
- Current: `wäk` /wɛk/
- Corrected: `waŋ` /waŋ/
- Rationale: Western Nilotic 'eye' is uniformly waŋ/waang/wang' (cf. Acholi wang, Anuak waang, Luo wang', Lango waŋ all in this file); Nuer 'eye' is waŋ. The given wäk /wɛk/ has both a wrong final consonant and wrong vowel and matches no Nuer form.

## Domain summary
Audited all 137 D07 languages. The dataset is very clean: most apparent anomalies are genuine cognate/dialect variation or broad-transcription/tonal collapses (Mano mi=drink/eye, Supyire nyaha=drink/good, Serer ñam=eat/drink, Chaga-cluster shared forms), which I deliberately did NOT report per the dialect-preservation rule. Three cells fail against solid references, all medium confidence: Edo (bin) 'fire' kuẹ (should be erhẹn) and 'drink' emenaada (should be da), plus Nuer (nus) 'eye' wäk (should be waŋ, the pan–Western-Nilotic form). Candidates I considered but omitted for insufficient certainty or likely-intentional status include Mongo 'one' etomelá, Kaonde 'moon' ñondo, Anuak 'father' waad, and various verb duplications explainable as tonal broad transcription.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. All flagged cells verified against the data before applying; none of the flagged values originated in a prior deliberate fix (all came from bulk data-creation commits), so no manual correction was overwritten. Deliberate dialect phonology was explicitly preserved. `node validate_wordmap_data.js` passing.

**File status: CLOSED**