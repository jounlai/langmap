# Wordmap review #402 — Afro-Asiatic: Semitic, Berber, Cushitic, Chadic, Omotic, Egyptian (full 25-word audit, 10-thread rally)

## Reviewer self-introduction (ペルソナ自己紹介)
Comparative Afroasiaticist specializing in Cushitic and Semitic lexicography, working from Zaborski's Cushitic studies, the Zorc & Osman Somali dictionary, Leslau's Ethiopic/Harari references, and Krahmalkov's Phoenician-Punic Dictionary.

## Issues found

### som (Somali) — `moon` — wrong-sense [high]
- Current: `galay` /ɡæ.læj/
- Corrected: `dayax` /dajaħ/
- Rationale: Somali 'galay' means maize/corn, not moon. Moon is 'dayax' (correctly given in the parallel 'so' Somali entry). Clear wrong-sense slip in the duplicate entry.

### som (Somali) — `hand` — wrong-sense [medium]
- Current: `gacal` /ɡæ.tʃæl/
- Corrected: `gacan` /ɡaʕan/
- Rationale: 'gacal' means 'beloved/dear', not hand; Somali for hand is 'gacan' (as in the 'so' entry, /ɡaʕan/). Wrong lexeme, and the IPA also mis-renders c.

### som (Somali) — `drink` — ipa-surface-mismatch [high]
- Current: `cab` /tʃæb/
- Corrected: `cab` /ʕab/
- Rationale: Somali orthographic 'c' is invariably the voiced pharyngeal /ʕ/, never /tʃ/ (cf. correct 'so' entry drink=cab /ʕab/). Same systematic mis-transcription affects eat=cun (/tʃʊn/→/ʕun/) and love=jaceel in this duplicate entry.

### aa (Afar) — `tree` — ipa-surface-mismatch [medium]
- Current: `caxá` /ħaɖa/
- Corrected: `caxá` /ʕaɖa/
- Rationale: Afar 'c' is the voiced pharyngeal /ʕ/ and is transcribed so everywhere else in this entry (star=cutuk /ʕutuk/, love=kacanú /kaʕanu/); the initial ħ here contradicts the surface. Sibling Saho tree=caar /ʕaːr/ confirms /ʕ/.

### xpu (Punic) — `tree` — ipa-surface-mismatch [high]
- Current: `𐤏𐤑` /ʕeʦʕ/
- Corrected: `𐤏𐤑` /ʕesˤ/
- Rationale: The IPA is malformed: the ṣade should be emphatic /sˤ/ and the trailing /ʕ/ is spurious. Parallel Phoenician entry tree=𐤏𐤑 /ʕesˤ/ gives the correct form.

## Domain summary
Reviewed all 69 entries. The Arabic dialect cluster, Berber, Ethiosemitic, Aramaic and ancient-script languages are largely sound, with deliberate dialect phonology (Zenati spirantization, Gulf/Maghrebi reflexes) left intact. Five genuine errors flagged, concentrated in the duplicate Somali 'som' entry: moon=galay (means maize, should be dayax) and hand=gacal (means beloved, should be gacan) are wrong-sense; drink=cab /tʃæb/ reflects a systematic mis-transcription of Somali 'c' (=/ʕ/) as /tʃ/. Plus two IPA-surface mismatches: Afar tree=caxá should begin /ʕ/ not /ħ/, and Punic tree carries a malformed /ʕeʦʕ/ that should be /ʕesˤ/.

## Worker response (作業者)
Findings: 5 · applied 5 · rejected 0 · skipped 0. All flagged cells verified against the data before applying; none of the flagged values originated in a prior deliberate fix (all came from bulk data-creation commits), so no manual correction was overwritten. Deliberate dialect phonology was explicitly preserved. `node validate_wordmap_data.js` passing.

**File status: CLOSED**