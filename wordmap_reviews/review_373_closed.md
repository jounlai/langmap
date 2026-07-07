# Wordmap review #373 — Isolates & fragmentary (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Elsbeth Marren, a descriptivist specializing in language isolates and the click languages of East Africa, with secondary work on the fragmentary epigraphic corpora of the ancient Near East and the Mediterranean. For this round my working references were, per family: for Hadza, Kirk Miller, Mariamu Anyawire, G. G. Bala & Bonny Sands, *A Hadza Lexicon* (Hadzane–English) and Sands' phonological studies; for Sandawe, Sander Steeman, *A Grammar of Sandawe: A Khoisan Language of Tanzania* (LOT 2012) and Helen Eaton's Magambua wordlist (Eaton et al. 2007); for Warao, Basilio María de Barral's *Diccionario Warao–Castellano–Warao* and Andrés Romero-Figueroa's *A Reference Grammar of Warao*; for Kusunda, David Watters, *Notes on Kusunda Grammar* (2006) plus Aaley & Bodt (2019); for Purépecha, Claudine Chamoreau's *Grammaire du purépecha*; for Basque, R. L. Trask's *The History of Basque*; for Ainu, Kirsten Refsing's *The Ainu Language*; for Sumerian, Marie-Louise Thomsen's *The Sumerian Language*; for Elamite, the Grillot-Susini/Stolper handbooks; for Burushaski, Hermann Berger's *Die Burushaski-Sprache von Hunza und Nager*; and for Etruscan, Bonfante & Bonfante, *The Etruscan Language*. The bulk of the corpus verified clean; the errors clustered in the East-African isolates and Warao, where a spurious pseudo-Khoisan "star" root and a sun/star confusion had crept in.

## Issues found

### 1. `sad` — star — Sandawe "star" is not `tsʼama`
- **File:** `words/star.js` — code `sad`
- **Current:** ["tsʼama","t͡sʼama"]
- **Expected:** ["hĩǀáwã","hĩ́ǀáwã̀ː"]
- **Why:** Sandawe is a click language and its word for 'star' contains a dental click. Eaton et al.'s Magambua wordlist records 'star' (Sw. *nyota*) as **híⁿǀáwã(èː)**, and Starostin's 100-item Sandawe list gives an *owã*-type form — neither is anything like a click-less ejective *tsʼama*. The value `tsʼama` is in fact a spurious pseudo-cognate imported from the Hadza cell (see issue 5); it is not attested for Sandawe. Corrected to the Eaton form with its dental click.

### 2. `sad` — two — Sandawe numeral 2 is the *kiso* root, not `kewe`
- **File:** `words/two.js` — code `sad`
- **Current:** ["kewe","kewe"]
- **Expected:** ["kisó","kísôxì"]
- **Why:** In Eaton et al.'s wordlist the numeral 'two' (Sw. *mbili*) is **kísôxi̥**, and every other source (Starostin, Steeman) points to a *kiso*- base; 'one' is *tsʼéxê*. No source gives *kewe* for 'two'. `kewe` is unattested and appears to be a fabricated form; corrected to the recorded *kiso(xi)*.

### 3. `sad` — name — Sandawe "name" is the click word `ǁwâ`, not `héé`
- **File:** `words/name.js` — code `sad`
- **Current:** ["héé","héː"]
- **Expected:** ["ǁwâ","ǁʷâ"]
- **Why:** Eaton et al. record 'name' (Sw. *jina*) as **ǁʷâ** — a labialized lateral click with falling tone. A click-less *héé* [héː] does not correspond to any attested Sandawe word for 'name' (that shape rather matches 'name/call' interjectional material in the neighboring surveys, not the noun). Corrected to the attested lateral-click form.

### 4. `hts` — star — Hadza "star" is `ntsa`, not `tsʼamako`
- **File:** `words/star.js` — code `hts`
- **Current:** ["tsʼamako","tsʼamako"]
- **Expected:** ["ntsa","ⁿtsʰa"]
- **Why:** *A Hadza Lexicon* (Miller, Anyawire, Bala & Sands 2013) gives 'star' as **ntsa** [ⁿtsʰa] (Anyawire et al.), with the older Tucker et al. (1977) variant **sa**; speakers are indifferent between the spellings *ntsa*/*nsa*. There is no Hadza lexeme *tsʼamako* — this is the same spurious root that contaminated the Sandawe cell. Corrected to the Lexicon form.

### 5. `hts` — name — Hadza "name" is `akhana`, not the click form `!ako`
- **File:** `words/name.js` — code `hts`
- **Current:** ["!ako","ǃako"]
- **Expected:** ["akhana","ʔakʰana"]
- **Why:** *A Hadza Lexicon* gives the root for 'name' as **akhana** [ʔakʰana] (feminine plural *akhanabee*). The word has no click; `!ako` [ǃako] with an alveolar click is not the attested Hadza noun for 'name'. Corrected to the Lexicon root.

### 6. `wba` — star — Warao `hokohi` means "sun", not "star"
- **File:** `words/star.js` — code `wba`
- **Current:** ["hokohi","hokohi"]
- **Expected:** ["kura","kura"]
- **Why:** This is a wrong-sense error: **hokohi** is the well-attested Warao word for **sun** (e.g. *hokohi soro* 'the sun rises/dawn', *ama a hokohi ata* 'today'), with *waniku* 'moon'. The Warao word for 'star' (*estrella*) is **kura** (Barral, *Diccionario Warao*; cf. *kura jatabu* 'shooting star'). Corrected from the sun-word to *kura*.

## Worker response (作業者)
Findings: 6 · applied 6 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
