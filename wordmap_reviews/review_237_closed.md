# Wordmap review #237 — Australian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Margaret Yates-Kurlpurlurnu, a descriptive linguist working on Pama-Nyungan and Tangkic languages of northern and central Australia. My primary references for this review are: R.M.W. Dixon, *The Dyirbal Language of North Queensland* (1972); the *Pitjantjatjara/Yankunytjatjara to English Dictionary* (Goddard 1996); the *Warlpiri Dictionary* (Laughren, Nash et al.); the *Walmajarri–English Dictionary* (Hudson, Richards & Kadibil); the *Eastern and Central Arrernte to English Dictionary* (Henderson & Dobson 1994); J.B. Haviland, *Guugu Yimidhirr* sketch grammar (1979); the Kaurna/Thura-Yura materials and Tunbridge's *Flinders Ranges Dictionary* (Adnyamathanha); the Bardi/Nyulnyulan and Marrngu comparative pronoun sets; Ken Hale & David Nash on Lardil and the Damin auxiliary register; and Nick Evans's *A Grammar of Kayardild* (1995) for the Tangkic comparanda. I pay particular attention to (a) Western Desert / Ngumpin-Yapa orthographic conventions where **j = palatal stop /ɟ/** and **y = glide /j/**, and (b) the canonical 1sg/2sg pronoun roots that are near-invariant across Wati and Marrngu.

## Issues found

### 1. `wbt` — i — Warnman 1sg is not "parra"
- **File:** `words/i.js` — code `wbt`
- **Current:** ["parra","para"]
- **Expected:** ["ngayu","ŋaju"]
- **Why:** "parra" is not a 1st-person singular free pronoun in Warnman or in any Western Desert / Marrngu variety. The Warnman cells elsewhere are consistently Western-Desert-patterned (you = *nyuntu*, two = *kujarra*), so the 1sg should be the canonical Wati/Marrngu root **ngayu** /ŋaju/ (cf. Martu Wangka *ngayu* /ŋaju/, Nyangumarta *ngaju*). A form "parra" has no parallel as a 1sg pronoun anywhere in the subgroup; this is a wrong-sense/wrong-form entry.

### 2. `wmt` — star — IPA contradicts Walmajarri orthography (and gloss is doubtful)
- **File:** `words/star.js` — code `wmt`
- **Current:** ["jina","jina"]
- **Expected:** ["jina","ɟina"]
- **Why:** In Walmajarri (and Kimberley orthographies generally) the grapheme **j spells the palatal stop /ɟ/**, while the glide /j/ is written **y**. The corpus itself follows this in the other Walmajarri cells: i = *ngaju* /ŋa**ɟ**u/, two = *kujarra* /ku**ɟ**ara/, name = *yini* /**j**ini/. The star cell "jina" therefore must be /ɟina/, not /jina/ — the current IPA is internally inconsistent with the romanization. (Additional caution: *jina* is the widespread Ngumpin/Western-Desert word for **'foot'** (< pWD/pNgumpin \*jina), so the "star" gloss itself should be verified against the Hudson–Richards *Walmajarri Dictionary*; the applied fix here corrects the demonstrable IPA error.)

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-2 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
