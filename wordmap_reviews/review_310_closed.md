# Wordmap review #310 — Slavic & Baltic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Marek Zaleski, a comparative Slavist and Baltist. For this pass I worked from the standard reference set: for East Slavic, Зализняк's *Грамматический словарь русского языка* (stress paradigms), the *Тлумачальны слоўнік беларускай мовы* / Skarnik (Скарнік) for Belarusian accentuation, and the *Словник української мови* (SUM-11) for Ukrainian; for the Rusyn microstandards, Jabur–Pliškova's *Ґраматіка русиньского языка* (Prešov standard, fixed penultimate stress) and Pankevyč's Carpathian materials. For West Slavic I used the *Słownik gwarowy* tradition plus Šewc-Schuster's Sorbian grammars (Upper/Lower dual numerals). South Slavic pitch cells were checked against the *Rječnik hrvatskoga ili srpskoga jezika* accent conventions (háček = long rising in the IPA notation used here). Baltic forms were checked against the *Dabartinės lietuvių kalbos žodynas* (accent paradigms) and Karulis's *Latviešu etimoloģijas vārdnīca*.

## Issues found

### 1. `be` — name — wrong stress placement (Belarusian *імя* is initial-stressed)
- **File:** `words/name.js` — code `be`
- **Current:** ["імя","iˈmʲa"]
- **Expected:** ["імя","ˈimʲa"]
- **Why:** Belarusian *імя* is an old n-stem noun with the mobile singular-initial / plural-final pattern (sg. *і́мя* → pl. *імёны* *imjóny*), exactly parallel to Russian *и́мя* / *имена́*. The nominative singular is stressed on the first syllable — Skarnik and the TSBM give *і́мя*. The dataset's final stress [iˈmʲa] is the Ukrainian pattern (*ім'я́*, correctly end-stressed in the `uk` cell), erroneously carried over to Belarusian. Correct broad IPA: [ˈimʲa].

### 2. `rue` — star — misplaced palatalization in *звізда*
- **File:** `words/star.js` — code `rue`
- **Current:** ["звізда","zʲˈvizda"]
- **Expected:** ["звізда","ˈzvʲizda"]
- **Why:** The transcription palatalizes the initial з ([zʲ]) but leaves в plain, which is phonotactically incoherent. In *звізда* the front vowel і palatalizes the *immediately preceding* consonant в → [vʲi]; з is not adjacent to any front vowel and stays hard [z] (or, if one marks regressive assimilation, both з and в would be soft — never з alone). The Prešov Rusyn standard has fixed penultimate stress, so the accent on зві́- is right, but the segment string should read [ˈzvʲizda] (Jabur–Pliškova). The current [zʲvizda] is an IPA error.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
