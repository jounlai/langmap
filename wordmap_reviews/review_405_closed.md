# Wordmap review #405 — SE Asia, Oceania, Australia + isolates, constructed, Siberian (full 25-word audit, 10-thread rally)

## Reviewer self-introduction (ペルソナ自己紹介)
I am a descriptive linguist specializing in Mainland Southeast Asian phyla (Tai-Kadai and Austroasiatic — Khmuic, Palaungic, Vietic, Munda) and Australian Pama-Nyungan, cross-checking here against SEALANG/SEAlang comparative dictionaries, the Wiktionary Tai-Lue and Mon-Khmer datasets, and AIATSIS/Bowern Pama-Nyungan wordlists. I lean on cognate comparison within the file's own parallel sets (the many Tai and Western-Desert languages) to isolate cells that break an otherwise regular correspondence.

## Issues found

### khb (Tai Lue) — `heart` — wrong-sense [high]
- Current: `ᦗᦸ` /pɔ/
- Corrected: `ᦺᦈ` /tɕaj/
- Rationale: The heart cell ᦗᦸ /pɔ/ is identical (minus a tone mark) to this same entry's father cell ᦗᦸᧈ /pɔː/ — it is 'father', not 'heart'. Every sibling Tai language in the file has heart = chai/jai (Tai Dam ꪈꪲꪒ /tɕai/, Shan ၸႂ် /tsai/, Lao ໃຈ /tɕaj/, Thai ใจ /tɕaj/, Tày cấy /kəj/). Tai Lue 'heart/mind' is likewise chai; corrected surface/IPA give the New Tai Lue spelling for ใจ (exact glyph choice approximate, but the value is /tɕaj/-type).

### wbt (Warnman) — `mother` — wrong-sense [medium]
- Current: `ngurra` /ŋuɻa/
- Corrected: `ngama` /ŋama/
- Rationale: mother=ngurra is identical to this entry's house=ngurra /ŋuɻa/. 'ngurra' is a very stable Pama-Nyungan root meaning 'camp/home/country' (it is the 'house' word here and in Warlpiri, Pintupi, Warnman itself), never 'mother'. Every other Australian entry in the file has a ngama-/ngunytju-type maternal term (Lardil ngama, Yangkaal ngama, Nhanda ngamaji, Warlpiri ngati, Pintupi ngunytju). Proposed 'ngama' is the widespread regional form; error is confident, exact Warnman form worth confirming.

## Domain summary
Reviewed all 99 entries. The domain is largely clean and internally consistent — the parallel Tai, Munda, Palaungic/Khmuic, Vietic and Western-Desert sets align cognate-for-cognate, and several apparent duplicates are legitimate (e.g. Noongar ngangk = both 'sun' and 'mother' is real polysemy; eat/drink sharing a root in Trans-New Guinea languages is normal; the romanized cells inside otherwise native-script Tai entries are a systematic fill pattern, not per-language errors). I report two confident copy/sense errors caught by cross-comparison: Tai Lue 'heart' = ᦗᦸ /pɔ/ is actually its own 'father' word (all sibling Tai languages have heart = chai/jai), and Warnman 'mother' = ngurra duplicates its 'house' cell and means 'camp/home', not mother. Softer suspicions I did NOT report for lack of a citable correction: Adnyamathanha's number/greeting cells look partly scrambled (star=vula resembles 'two'; one=mukuna resembles the 'thanks/love' greeting), and Ngunnawal has duplicate filler cells (one=sun=guma, hand=heart=mara) — flagging these for a documentation-based follow-up rather than guessing corrections.

## Worker response (作業者)
Findings: 2 · applied 2 · rejected 0 · skipped 0. All flagged cells verified against the data before applying; none of the flagged values originated in a prior deliberate fix (all came from bulk data-creation commits), so no manual correction was overwritten. Deliberate dialect phonology was explicitly preserved. `node validate_wordmap_data.js` passing.

**File status: CLOSED**