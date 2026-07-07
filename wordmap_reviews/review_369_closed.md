# Wordmap review #369 — Germanic (part 1) (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Ingrid Holtsmark, a descriptive/historical Germanicist working across the West and North Germanic branches. For the continental West Germanic data I rely on the *Duden Aussprachewörterbuch* (7th ed.) and *Das Aussprachewörterbuch* for Standard and regional German, the *Algemene Nederlandse Spraakkunst* (ANS) and *Uitspraakwoordenboek* (Heemskerk & Zonneveld) for Dutch/Flemish, and the *Wurdboek fan de Fryske taal* for West Frisian. For Alemannic/Franconian and other Oberdeutsch varieties I lean on the *Schweizerisches Idiotikon* and the *Zürichdeutsches Wörterbuch*. For North Germanic I use *Íslensk orðabók* (Mörður Árnason) with Kristján Árnason's *The Phonology of Icelandic and Faroese* for pre-stopping/pre-aspiration, the *Svenska Akademiens ordlista*, *Bokmålsordboka*, and *Den Danske Ordbog* (with Grønnum's *Rødgrød med fløde* for stød and the [sd~sg] neutralisation). For Yiddish I use Uriel Weinreich's *Modern English–Yiddish Yiddish–English Dictionary* and Neil G. Jacobs' *Yiddish: A Linguistic Introduction* (YIVO Standard Yiddish phonology). For the English varieties I cross-check Wells' *Accents of English* and the relevant *Handbook of Varieties of English* chapters. The set is in very good shape after four prior rounds; only one cell fails against the standard sources.

## Issues found
### 1. `yi` — name — vowel qualities in נאָמען mis-transcribed
- **File:** `words/name.js` — code `yi`
- **Current:** ["נאָמען","ˈnomen"]
- **Expected:** ["נאָמען","ˈnɔmən"]
- **Why:** The orthography is correct (YIVO נאָמען, Weinreich s.v. *nomen* 'name'), but the broad IPA has two wrong segments. (a) The stressed vowel is written with komets-alef ⟨אָ⟩, which in Standard (Northeastern-based YIVO) Yiddish is /ɔ/, contrasting with pasekh-alef ⟨אַ⟩ = /a/; it is not close-mid [o]. (b) The unstressed suffix ⟨ען⟩ *-en* is realised as schwa + n (or syllabic [n̩]), i.e. [ən], never a full front vowel [e]. So the form is [ˈnɔmən] (≈ [ˈnɔmn̩]), not [ˈnomen]. Cf. Jacobs (2005: §6) on Yiddish reduced final -*en* and the /ɔ/~/a/ split. This is also internally inconsistent with `star` שטערן correctly given as [ʃtɛrn] (schwa-less full vowel only under stress).

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
