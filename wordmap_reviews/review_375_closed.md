# Wordmap review #375 — Kra-Dai & Hmong-Mien (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Somchai Nithiwana, a comparative Tai–Kadai and Hmong-Mien phonologist. For the Southwestern/Central/Northern Tai cells (Thai, Lao, Shan, Tai Lue, Tai Dam, Tày, Nùng, Thai Song, and the regional Thai lects) I work from Li Fang-Kuei's *A Handbook of Comparative Tai* (1977), Pittayaporn's *The Phonology of Proto-Tai* (2009), Mary Haas's *Thai-English Student's Dictionary*, N. J. Enfield's *A Grammar of Lao* (2007), and William Gedney's Tai dialect wordlists. For Zhuang/Bouyei I rely on Zhang Junru et al.'s *Zhuangyu Fangyan Yanjiu* and the Wuming standard-orthography tone conventions (tones 1–6 = 24/31/55/42/35/33); for the aberrant Hlai outlier Jiamao I use Norquest's *A Phonological Reconstruction of Proto-Hlai* (2015). For Hmong-Mien I lean on Martha Ratliff's *Hmong-Mien Language History* (2010), Ernest Heimbach's *White Hmong–English Dictionary* (1979), and Christina Esposito's instrumental studies of White Hmong tone (which give the RPA tone letters concrete pitch values). The two Papuan/TNG isolates carried in this batch (Yele, Mian) lie outside my competence, so I withhold judgement on them rather than fabricate forms.

## Issues found
### 1. `hmn` — i — RPA `-v` tone given the `-d` pitch value
- **File:** `words/i.js` — code `hmn`
- **Current:** ["kuv","ku˩˧"]
- **Expected:** ["kuv","ku˨˦"]
- **Why:** The White Hmong (RPA) 1sg *kuv* carries the `-v` tone letter, whose pitch value is mid-rising [24] (Esposito 2012: b=54, j=51, ∅=33, **v=24**, s=22, g=42, m=21, d=13; Ratliff 2010 concurs). The transcription `ku˩˧` = [13] is specifically the value of the *`-d`* (low-rising) tone, not `-v`. Since there is no `-d` in *kuv*, the tone height is misassigned: the onset should begin mid (˨), not low (˩). Correct to `ku˨˦`. (The other Hmong cells check out: *koj* `-j` ˥˧, *ob*/*qub* `-b` ˥, unmarked *npe* ˧ all match the standard values.)

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fix applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
