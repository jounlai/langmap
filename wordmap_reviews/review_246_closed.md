# Wordmap review #246 — Germanic (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Margrét Ellingsen, a descriptive/historical Germanist working primarily on the North and West Germanic branches and their contact varieties. My desk references for this review are the *Duden Aussprachewörterbuch* (7th ed.) for Standard German and its regional standards; *Van Dale* and the *Algemene Nederlandse Spraakkunst* (ANS) for Dutch/Flemish; the *Woordeboek van die Afrikaanse Taal* for Afrikaans; Stefán Karlsson & the *Íslensk orðabók* plus Árnason's *The Phonology of Icelandic and Faroese* for Icelandic; the *Svenska Akademiens ordlista* and Riad's *The Phonology of Swedish*; Uriel Weinreich's *Modern English–Yiddish Yiddish–English Dictionary* and YIVO transcription conventions; Wells's *Accents of English* (3 vols.) and the *Scottish National Dictionary*/*Dictionary of the Scots Language* for the anglophone and Scots varieties; and Tiersma's *Frisian Reference Grammar* for West Frisian. My method is to check each cell for (a) correct lexeme and sense, (b) standard native orthography, and (c) a broad IPA consistent with the accent's own vowel system and with neighbouring cells in the same row.

## Issues found
### 1. `en_sco` — you — KIT vowel where GOOSE is required
- **File:** `words/you.js` — code `en_sco`
- **Current:** ["you","jɪ"]
- **Expected:** ["you","juː"]
- **Why:** The transcription /jɪ/ gives the pronoun a KIT vowel, which is the reduced/Scots weak form written "ye" — not the Scottish Standard English strong 2sg pronoun "you". The pronoun carries the GOOSE vowel, and under the Scottish Vowel Length Rule (Aitken's Law) a word-final high vowel is long, so Scottish English "you" = /juː/ (cf. Wells, *Accents of English* III, §5.2). This is also internally consistent with this same language's `two` = ["two","tuː"], which correctly shows the long word-final /uː/. As written, the KIT vowel is a wrong-segment error.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
