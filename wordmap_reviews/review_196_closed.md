# Wordmap review #196 — Australian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Marra Kelantyerr, a descriptive linguist specializing in Pama-Nyungan and non-Pama-Nyungan (Tangkic) languages of northern and central Australia. My working references for this review are: R.M.W. Dixon, *The Dyirbal Language of North Queensland* (1972) and *A Grammar of Yidiny*; John Haviland's *Guugu Yimidhirr* sketch grammar (in *Handbook of Australian Languages* vol. 1) and the Guugu Yimithirr word list; Ken Hale and the *Warlpiri Dictionary* project (Laughren, Nash, et al.); Cliff Goddard's *Pitjantjatjara/Yankunytjatjara to English Dictionary*; the IAD Press *Eastern and Central Arrernte to English Dictionary* (Henderson & Dobson); Ken Hale & David Nash on Lardil and the Damin ceremonial register; and Juliette Blevins' *A Grammar of Nhanda*. I hold to standard Australianist orthographic conventions in which `th`/`dh` map to laminal **dentals** /t̪ d̪/, `ty`/`tj`/`dy`/`j` to laminal **palatals** /c ɟ/, and `rt`/`rd`/`rn`/`rl` to apical **retroflexes**.

## Issues found
### 1. `kky` — two — dental digraph `dh` mistranscribed as palatal
- **File:** `words/two.js` — code `kky`
- **Current:** ["gudhirra","kuɟira"]
- **Expected:** ["gudhirra","kut̪ira"]
- **Why:** The Guugu Yimithirr numeral "two" is `gudhirra` (Haviland). In standard Australianist orthography — and as used consistently by Haviland for Guugu Yimithirr — the digraph `dh` denotes a laminal **dental** stop /t̪/ (voicing is non-contrastive; the corpus transcribes stops voiceless throughout, e.g. `g`→k). The current IPA `kuɟira` renders `dh` as the palatal /ɟ/, which is the value of a different orthographic series (`dy`/`j`) and is simply the wrong place of articulation. The corpus already respects this distinction elsewhere (`aer` "atherre" → `aˈt̪ərə`; `nha` "wuthada" → `wut̪aɖa`), so `kuɟira` is an internal inconsistency as well as a phonetic error. Corrected form: `kut̪ira`.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
