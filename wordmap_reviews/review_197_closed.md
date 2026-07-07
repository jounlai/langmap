# Wordmap review #197 — Austroasiatic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Sovann Reddrecliffe, a descriptive/historical linguist working on Mon-Khmer and Munda for the past two decades, with fieldwork on Northern Khmer (Surin) and Kuy. My core references for this review are: H. L. Shorto, *A Dictionary of Modern Spoken Mon* (OUP 1962) and *A Mon-Khmer Comparative Dictionary* (ed. Sidwell, Cooper & Bauer, Pacific Linguistics 2006); Paul Sidwell's *Proto-Katuic* and *The Palaungic Languages* reconstructions; Gérard Diffloth's Palaungic and Vietic work; Gregory D. S. Anderson (ed.), *The Munda Languages* (Routledge 2008) for Santali, Mundari, Ho and Sora; Jenner & Pou for Angkorian/Old Khmer; Jan-Olof Svantesson's *Kammu* (Khmu) descriptions; L. C. Thompson, *A Vietnamese Reference Grammar* for the Vietic rows; and R. Bauer / C. Bauer plus Shorto for Mon orthography. Pronoun register (informal vs. honorific), numeral vs. ordinal sense, and — critically for Mon and Khmer — correct native graphemes were my primary checkpoints.

## Issues found

### 1. `mnw` — i — Shan letter used in place of the Mon/Burmese vowel-carrier
- **File:** `words/i.js` — code `mnw`
- **Current:** ["ဢဲ","ʔoa"]
- **Expected:** ["အဲ","ʔoa"]
- **Why:** The familiar 1sg pronoun in Modern Spoken Mon is *အဲ* /ʔòa ~ ʔoa/ (Shorto 1962, s.v.), written with the independent vowel-carrier **အ** (U+1021 MYANMAR LETTER A), which Mon shares with Burmese. The current cell instead opens with **ဢ** (U+1022 MYANMAR LETTER SHAN A), a Shan-specific grapheme that does not occur in standard Mon orthography. This is a wrong-script error at the character level; only the leading letter is affected — the vowel sign ဲ and the IPA /ʔoa/ are correct and are retained.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

Note (out of scope, no cell change): the `omx` row is labelled "Middle Mongolian; Austroasiatic (Mon-Khmer, Monic)" and `sukh` "Old Thai (Sukhothai); Austroasiatic (Khmeric)". Both are family-classification errors in the metadata (Mongolic and Tai-Kadai respectively), but the five word cells themselves are correct for those languages (bi/či/qoyar/nere/hodun; กู/มึง/สอง/ชื่อ/ดาว), so no word-cell correction is issued here; flagged only for the metadata maintainer.

**File status: CLOSED**
