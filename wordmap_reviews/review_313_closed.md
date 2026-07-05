# Wordmap review #313 — Turkic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. A. Körpeyeva, a comparative Turkologist working primarily on the historical phonology of the Common Turkic and Siberian branches. For this review I lean on Sir Gerard Clauson's *An Etymological Dictionary of Pre-Thirteenth-Century Turkish* (EDPT, 1972), Marcel Erdal's *A Grammar of Old Turkic* (2004), Maḥmūd al-Kāšġarī's *Dīwān Luġāt al-Turk* in the Dankoff–Kelly edition (1982–85), the *Drevnetjurkskij slovarʹ* (DTS, 1969), Talat Tekin's *A Grammar of Orkhon Turkic* (1968), Martti Räsänen's *Versuch eines etymologischen Wörterbuchs der Türksprachen* (1969), and, for the living languages, Johanson & Csató (eds.) *The Turkic Languages* (2nd ed., 2021) together with individual reference grammars (Kirchner on Kazakh/Kyrgyz, Krippes/Nasilov on Uyghur, Anderson & Harrison on Tuvan, Nevskaya on Shor, Roos/Nugteren on Western Yugur, and Krueger on Chuvash). I checked each cell against these sources for sense, script normativity, and the branch-specific treatment of Proto-Turkic *y- and *-lt-/-ld-.

## Issues found
### 1. `xqa` — star — anachronistic voicing of *-lt- (yulduz → yultuz)
- **File:** `words/star.js` — code `xqa`
- **Current:** ["yulduz","julduz"]
- **Expected:** ["yultuz","jultuz"]
- **Why:** In Karakhanid (the Karluk literary language of Kāšġarī and the *Kutadġu Bilig*, 11th c.) the cluster reflex of Proto-Turkic *yultuz retains the voiceless -t-. Clauson (EDPT 922b) gives the headword as **yultuz** "star", and the *Drevnetjurkskij slovarʹ* (DTS 279) likewise cites **yultuz**; voicing to -ld- (yulduz) is a later Common-Turkic development seen in the modern Oghuz/Kipchak/Karluk daughters, not in the Karakhanid stage. The corpus is already internally consistent here: Old Turkic `otk` and Salar `slr` both correctly carry **yultuz** / `jultuz`, so the Karakhanid `yulduz` is the odd one out and should be brought into line as **yultuz** with IPA `jultuz`.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-3 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
