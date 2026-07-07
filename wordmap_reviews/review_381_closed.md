# Wordmap review #381 — Other / unclassified (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a descriptive-comparative lexicographer specializing in Paleosiberian languages and language isolates (Yukaghir, Yeniseian, Chukotko-Kamchatkan) with secondary work on North American isolates and small families. My primary references for this review were I. Nikolaeva, *A Historical Dictionary of Yukaghir* (Mouton de Gruyter, 2006) and E. Maslova, *A Grammar of Tundra Yukaghir* (2003) and *Tundra Yukaghir* (LINCOM, 2003); H. Werner, *Vergleichendes Wörterbuch der Jenissej-Sprachen* (2002) for Ket/Yugh; M. Dunn, *A Grammar of Chukchi* (1999) and Fortescue's Chukotko-Kamchatkan comparative work; Georg & Volodin on Itelmen; R. Young & W. Morgan, *The Navajo Language* for the Athabaskan cells; and for the Otomanguean cells P. Munro & F. Lopez, *San Lucas Quiaviní Zapotec Dictionary* (1999) as the closest documented Valley-Zapotec analogue to Tlacolula. I checked each cell for sense (avoiding house/fish/verb confusions), script correctness, and IPA plausibility, using the two Yukaghir dialects as an internal cross-check.

## Issues found

### 1. `ykg` — name — "house" form given for "name"
- **File:** `words/name.js` — code `ykg`
- **Current:** ["нюмэ","nʲumə"]
- **Expected:** ["ню","nʲuː"]
- **Why:** Tundra Yukaghir *nʲumə* / *nume* is the noun **"house/dwelling"** (Proto-Yukaghir *nime*, cf. the locative *nume-gə* "in the house"; Nikolaeva 2006; Maslova 2003), not "name". The word for "name" across Yukaghir is the reflex of *ń-ū*: the sister dialect cell for Kolyma Yukaghir (`yux`) correctly gives name = ["ню","nʲuː"]. Tundra Yukaghir shares this root and should read **ню /nʲuː/**. The current cell is a house-for-name semantic conflation; the -мэ element betrays the "house" lexeme.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
