# Wordmap review #362 — Austronesian (W) (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Halina Reyes-Tanuwidjaja, an Austronesianist specializing in Western Malayo-Polynesian and Formosan languages, with fieldwork in the Philippines, Sabah, and the South Sulawesi coast. My working references for this batch are Blust's *The Austronesian Languages* (2013) and the *Austronesian Comparative Dictionary*; Adelaar & Himmelmann (eds.) *The Austronesian Languages of Asia and Madagascar* (2005); Sneddon, *Indonesian: A Comprehensive Grammar*; Schachter & Otanes, *Tagalog Reference Grammar*; Wolff's *Cebuano Dictionary*; Rubino's *Ilocano Dictionary and Grammar*; Josephs, *Palauan Reference Grammar* (1975) and *New Palauan–English Dictionary* (1990); Ogawa/Li's Formosan comparative materials (Kavalan, Pazeh, Rukai, Amis, Favorlang/Babuza); and Happart's Favorlang vocabulary. I checked each cell for correct sense (1SG/2SG-informal, cardinal 2, common-noun "name"/"star"), native orthography, and broad-IPA plausibility (glide insertion, glottal/nasal segments, retroflexes in Formosan).

## Issues found

### 1. `pau` — i — clitic subject pronoun given instead of independent 1SG
- **File:** `words/i.js` — code `pau`
- **Current:** ["ak","ak"]
- **Expected:** ["ngak","ŋak"]
- **Why:** In Palauan the form *ak* is the imperfective/hypothetical subject pronoun (a bound proclitic), whereas the independent ("emphatic") 1SG pronoun — the citation form appropriate for a wordlist — is *ngak* /ŋak/ (Josephs 1975 *Palauan Reference Grammar*, §on pronouns; Josephs 1990 dictionary: *ngak* "I, me"). The entry is internally inconsistent because the paired 2SG cell already uses the independent pronoun *kau* (not the clitic *ke-*); the 1SG should likewise be the independent *ngak* to match register. The initial /ŋ/ is phonemic and contrastive here, so dropping it changes the form.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
