# Wordmap review #180 — Arabic-script columns (ar*, fa, fa_clas, prs, haz, ps, ur, mey, arq, jpr) across all 20 concept files

## Reviewer self-introduction (ペルソナ自己紹介)

Arabic-script orthography auditor (Arabic, Persian, Urdu, Pashto) — letter shapes, hamza, diacritics vs IPA

*Scope: Arabic-script columns (ar*, fa, fa_clas, prs, haz, ps, ur, mey, arq, jpr) across all 20 concept files. Cross-cutting (phenomenon/script) audit across all 20 word files (words/*.js), read-only, against authoritative references. Part of wave-14 review rally #2 (20 cross-cutting reviewers + 5 programmer-workers, 2026-06-13). Prior ~190 reviews + rally #1 (#151-170) respected — just-fixed cells not re-reported.*

---

## Issues found

### 1. `ur` — hello — ipa 【要検討】
- **File:** words/hello.js
- **Current:** `["السلام علیکم", "assalaːmu alaikum"]`
- **Proposed:** `["السلام علیکم", "əsːalaːm əlaɪkʊm"]`
- **Why:** Current cell mixes a non-IPA Roman digraph 'ai' into an otherwise IPA field, and gives the Classical Arabic case form 'assalaːmu...'. In Urdu the phrase is realized without the Classical -u case vowel and with vowel reduction; the same-script neighbour skr row gives 'əssəlaːm əleːkum'. ع surfaces as zero in Urdu, ي as the diphthong, vowels are central/ʊ. IPA should use ɪ/ʊ/ə and a proper diphthong, not Romanized 'ai'.
- **Worker round-1:** APPLIED ✅ — R180 discuss. Current matched assalaːmu alaikum. Cell mixed non-IPA Roman digraph 'ai' into IPA field and gave Classical -u case vowel; Urdu drops case vowel, uses ɪ/ʊ/ə and proper diphthong, cf. skr neighbour. assalaːmu alaikum→əsːalaːm əlaɪkʊm.

### 2. `ur` — love — ipa 【要検討】
- **File:** words/love.js
- **Current:** `["محبت", "mohabːat"]`
- **Proposed:** `["محبت", "mʊhəbːət"]`
- **Why:** Urdu محبت 'muhabbat' has initial short high vowel /ʊ/ (not mid /o/) and reduced central vowels in the unstressed syllables, not full /a/ qualities. The parallel Kashmiri (ks) row in the same file transcribes the same Perso-Arabic loan as 'muhabːətʰ' with /u/ and /ə/. Current 'mohabːat' overspecifies cardinal /a/ and a mid front-rounded onset that standard Urdu does not have.
- **Worker round-1:** APPLIED ✅ — Discuss; verified. Current matched ["محبت","mohabːat"]. Urdu muhabbat has short high /ʊ/ onset and reduced /ə/ vowels, not mid /o/ + cardinal /a/; consistent with sibling Kashmiri muhabːətʰ. Applied mʊhəbːət.

---

## Worker round-1 response (作業者)

Findings: 2 · applied 2 · rejected 0 · skipped 0. Edits applied to live words/*.js with `node validate_wordmap_data.js` passing. **File status: OPEN** — reviewer round-2 pending.
