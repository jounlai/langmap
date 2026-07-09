# Wordmap review #397 — Romance & Germanic (incl. their creoles) (full 25-word audit, 10-thread rally)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a Romance and Germanic dialectologist specializing in Ibero-Romance and Atlantic/Pacific creoles, working from the WALS/APiCS creole surveys, the Diccionario da Real Academia Galega and Aragonese/Occitan normative grammars, and standard references such as Hualde's The Sounds of Spanish and Lipski's Latin American Spanish. My transcriptions follow broad IPA conventions consistent with each variety's documented phonology.

## Issues found

### es_hn (es_hn (Honduran Spanish)) — `thanks` — fabricated-or-implausible [high]
- Current: `gracias` /ɡɾaθjas/
- Corrected: `gracias` /ɡɾasjas/
- Rationale: Honduran Spanish is uniformly seseante — it has no interdental /θ/. The entry's own other cells are seseo (corazón /koɾason/), so /ɡɾaθjas/ is an inconsistent European-Spanish pronunciation; it should be /ɡɾasjas/.

### acf (acf (Saint Lucian French Creole / Kwéyòl)) — `house` — ipa-surface-mismatch [medium]
- Current: `kay` /ka/
- Corrected: `kay` /kaj/
- Rationale: In Antillean/Saint Lucian Kwéyòl 'kay' (house) has a phonemic final glide, /kaj/ (cf. Haitian 'kay' /kaj/ in the same dataset). The transcription /ka/ drops the -y and does not correspond to the surface form.

### fr_cm (fr_cm (Cameroonian French)) — `love` — wrong-sense [medium]
- Current: `aimer` /eme/
- Corrected: `amour` /amuʁ/
- Rationale: The 'love' cell holds the infinitive verb 'aimer' (to love), whereas every sibling French variety (fr, fr_ci, fr_ht, fr_lu, fr_sn) and Cameroonian French itself use the noun 'amour' /amuʁ/ for the concept 'love'.

## Domain summary
Reviewed all 110 Romance/Germanic and creole entries. The data is largely clean and internally consistent, with deliberate dialect phonology (PR lateralization, Uruguayan sheísmo, Caribbean consonant deletion, Andalusian aspiration, Valencian affrication) correctly preserved and not flagged. Three genuine defects found: es_hn 'thanks' carries an impossible European interdental /θ/ in an otherwise seseante entry (high); acf 'house' kay is mistranscribed /ka/ instead of /kaj/ (medium); fr_cm 'love' uses the verb 'aimer' where the noun 'amour' is expected (medium). Borderline cases (es_pr padre/madre reductions, pt_gw acrolectal forms, Saramaccan 'sun'/'star') were left unflagged as likely-intentional or beyond my confidence threshold.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. All flagged cells verified against the data before applying; none of the flagged values originated in a prior deliberate fix (all came from bulk data-creation commits), so no manual correction was overwritten. Deliberate dialect phonology was explicitly preserved. `node validate_wordmap_data.js` passing.

**File status: CLOSED**