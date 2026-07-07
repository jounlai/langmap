# Wordmap review #216 — Oceanic & Polynesian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Manoa Tuʻitupou, a descriptive/historical linguist specializing in the Oceanic subgroup, with fieldwork focus on the Tongic and Ellicean Polynesian languages and comparative reconstruction of Proto-Polynesian and Proto-Oceanic. My reference shelf for this review comprises: Pukui & Elbert, *Hawaiian Dictionary* (1986); Williams, *A Dictionary of the Māori Language* (7th ed.); Milner, *Samoan Dictionary* (1966); Churchward, *Tongan Dictionary* (1959) and *Tongan Grammar*; McEwen, *Niue Dictionary* (1970) and Sperlich, *Tohi Vagahau Niue* (1997); Besnier, *Tuvaluan: A Polynesian Language of the Central Pacific* (2000); Kieviet, *A Grammar of Rapa Nui* (2017) and Du Feu, *Rapanui* (1996); Rehg, *Ponapean Reference Grammar*; Goodenough & Sugita, *Trukese-English Dictionary*; Sohn, *Woleaian Reference Grammar*; Jensen, *Yapese Reference Grammar*; Topping, *Chamorro Reference Grammar*; and Blust & Trussel's *Austronesian Comparative Dictionary* for Proto-Polynesian etyma (esp. *fetuʻu 'star', *iŋoa 'name'). The great majority of cells here are correct — the Nuclear-Polynesian, Tongic, Micronesian and Malayo-Polynesian pronoun/numeral/star sets are cleanly attested. Only the three below are genuine defects.

## Issues found

### 1. `niu` — star — missing phonemic vowel length (and misplaced stress)
- **File:** `words/star.js` — code `niu`
- **Current:** ["fetū","ˈfetu"]
- **Expected:** ["fetū","feˈtuː"]
- **Why:** The orthographic macron in the editors' own form *fetū* encodes a phonemic long vowel, yet the IPA transcribes a short *u* with initial stress. Niuean (Tongic) reflexes PPn *fetuʻu with loss of the medial glottal and compensatory lengthening → *fetū* [feˈtuː] (McEwen 1970; Sperlich 1997). Niuean stress falls on the penultimate mora, so a final long vowel is stressed: the correct transcription is [feˈtuː], not [ˈfetu]. The IPA is internally inconsistent with the macron and phonologically wrong on both length and stress.

### 2. `tvl` — star — missing phonemic vowel length (and misplaced stress)
- **File:** `words/star.js` — code `tvl`
- **Current:** ["fetū","ˈfetu"]
- **Expected:** ["fetū","feˈtuː"]
- **Why:** Same defect as Niuean. Tuvaluan (Ellicean) *fetū* < PPn *fetuʻu carries a long final vowel, marked by the macron in the supplied form. Besnier (2000) notes that in Tuvaluan the syllable containing a long vowel bears primary stress, giving [feˈtuː]. The current [ˈfetu] drops the length and puts stress on the wrong syllable. (Cf. the corpus's own consistent length-marking in `sm` fetū [fetuː], `pmt` [feˈtuː], `rar` etū [eˈtuː].)

### 3. `rap` — name — spurious macron in orthography
- **File:** `words/name.js` — code `rap`
- **Current:** ["īngoa","iˈŋoa"]
- **Expected:** ["ingoa","iˈŋoa"]
- **Why:** The Rapa Nui word for 'name' is *ingoa* with a SHORT initial *i*; the IPA [iˈŋoa] is already correct, but the form carries an unjustified macron (*ī*). PPn *iŋoa has a short *i, and every cognate in the corpus and the literature preserves it — Māori *ingoa*, Hawaiian *inoa*, Samoan/Tuvaluan/Tokelauan *igoa*, Tahitian *iʻoa* — none show a long first vowel. Kieviet (2017) and Du Feu (1996) write Rapa Nui *ingoa* [iˈŋoa]. The macron is an orthographic error; the IPA is the correct arbiter here, so only the native-script form needs fixing.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
