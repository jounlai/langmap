# Wordmap review #368 — Dravidian (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Anandan Rajasekharan, a comparative Dravidianist trained in the South-Central and Northern subgroups. My working desk references for this pass are Bhadriraju Krishnamurti's *The Dravidian Languages* (Cambridge, 2003) for reconstructions and the numeral system, Burrow & Emeneau's *A Dravidian Etymological Dictionary* (DEDR, 2nd ed. 1984) for cognate sets (esp. *iraṇṭu 'two', *peyar 'name', *cukk- 'star'), Sanford Steever (ed.) *The Dravidian Languages* (Routledge, 1998) for the individual sketches, Kamil Zvelebil's monographs on Irula and the Nilgiri languages, M. B. Emeneau's *Badaga* studies, and — decisively for this batch — Denys Bray's *The Brāhūī Language, Part I* (1909) together with Josef Elfenbein's Brahui grammar and vocabulary for the Northern (Brahui/Kurukh) numeral morphology. I verified pronoun register (singular vs. honorific), cardinal-vs-ordinal for the numeral, and the native-vs-borrowed status of the 'name'/'star' items across all twelve varieties.

## Issues found

### 1. `brh` — two — Brahui numeral missing the cardinal suffix -ṭ
- **File:** `words/two.js` — code `brh`
- **Current:** ["ایرا","iˈraː"]
- **Expected:** ["ایراٹ","iˈraːʈ"]
- **Why:** Brahui is one of the few Dravidian languages that has kept a native decad only for 1–3, and each of those cardinals carries a fossilised numeral-final retroflex -ṭ: **asiṭ** 'one', **irāṭ** 'two', **musiṭ** 'three' (Bray 1909 §; Elfenbein; Krishnamurti 2003:260 on Brahui retaining native 1–3 before switching to Balochi/Persian loans for 4+). The citation form is **irāṭ** [iˈraːʈ], not a bare *irā*; the given cell has dropped the final retroflex stop, so both the Perso-Arabic spelling (missing ٹ) and the IPA (missing the final ʈ) are incomplete. Restoring ٹ / ʈ brings it into line with its own paradigm partners asiṭ and musiṭ.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fix applied to live words/*.js via the round-5 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
