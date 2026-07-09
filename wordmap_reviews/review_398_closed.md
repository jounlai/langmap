# Wordmap review #398 — Other Indo-European: Slavic, Baltic, Celtic, Hellenic, Albanian, Armenian, Anatolian (full 25-word audit, 10-thread rally)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a historical and descriptive linguist specializing in Indo-European philology, with working focus on the Germanic, Iranian and Balto-Slavic branches. I audit against standard references: Ringe's From Proto-Indo-European to Proto-Germanic, Orel's Albanian and Slavic etymological dictionaries, Matasović's Etymological Dictionary of Proto-Celtic, MacKenzie's Concise Pahlavi Dictionary, and Steblin-Kamenskij's Wakhi materials.

## Issues found

### osx (Old Saxon) — `mother` — copied-from-other-language [medium]
- Current: `muoder` /ˈmuodər/
- Corrected: `modar` /ˈmoːdar/
- Rationale: Old Saxon kept Proto-Germanic *ō as a monophthong — cf. this same row's gōd /ɡoːd/, hūs /huːs/, bōm /boːm/, māno /ˈmaːno/. The diphthong 'uo' is a specifically Old High German development; the OHG row (goh) even has 'muoter'. The attested Old Saxon form (Heliand) is 'modar', paralleling the correctly monophthongal 'fader'.

### sdh (Southern Kurdish) — `drink` — wrong-sense [medium]
- Current: `خواردن` /xwɑːɾdən/
- Corrected: `خواردنەوە` /xwɑːɾdɪnˈæwæ/
- Rationale: The 'drink' cell is byte-identical to the 'eat' cell (خواردن /xwɑːɾdən/ = 'to eat'). Kurdish distinguishes 'drink' by the postverbal -ewe: 'to drink' = خواردنەوە. Two distinct concepts should not carry the same form here.

### wbl (Wakhi) — `water` — wrong-sense [medium]
- Current: `яу` /jau/
- Corrected: `юпк` /jupk/
- Rationale: The Wakhi word for 'water' is the well-attested and iconic 'yupk' (юпк /jupk/). 'яу /jau/' is not the Wakhi water word; the rest of the Cyrillic Wakhi row (вуз 'I', зимак 'moon', нунг 'name', буй 'two') is otherwise sound, which makes this cell stand out as erroneous.

## Domain summary
Reviewed all 149 rows. The well-documented Slavic, Baltic, Celtic, Hellenic, Albanian, Armenian and mainstream Germanic/Romance entries are clean; apparent oddities (Western Armenian k→g voicing, Bhojpuri/Angika/Magadhan 'ham' as 1SG, Argentine 'vos', Scottish Gaelic voiceless-unaspirated g=/k/, Mirandese 'you' = 'I', Arbëresh definite forms, dialectal vowel shifts) are deliberate and correct — not flagged. Three genuine defects reported: Old Saxon 'mother' carries an anachronistic OHG-style 'uo' diphthong (should be 'modar'); Southern Kurdish 'drink' duplicates the 'eat' form (needs the -ewe postverb); and Wakhi 'water' is not the standard 'yupk'. Two under-documented rows are suspicious but I could not cite reliable corrections, so I omit them per the confidence policy: (1) Tregami (trm) contains transparent Sanskrit tatsamas — hasta 'hand', hridaya 'heart', vrkṣa 'tree', nayan 'eye', agni 'fire' — implausible as native Nuristani vocabulary; (2) Khowar (khw, whose name field is also blank) has several dubious cells (dog=سو 'su', water=پیے 'pe', fire=وے 'we', moon=بوم 'bum') that look fabricated or copied, against expected Khowar reni 'dog', uɣ 'water'. Both warrant a sourcing pass by someone with dedicated Nuristani/Dardic references.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. All flagged cells verified against the data before applying; none of the flagged values originated in a prior deliberate fix (all came from bulk data-creation commits), so no manual correction was overwritten. Deliberate dialect phonology was explicitly preserved. `node validate_wordmap_data.js` passing.

**File status: CLOSED**