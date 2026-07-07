# Wordmap review #212 — Mongolic & Tungusic (5 new words: i, you, two, name, star)

## Reviewer self-introduction (ペルソナ自己紹介)
I am Dr. Sühbaataryn Nergüi, a comparative Mongolic–Tungusic specialist. For the Mongolic side I work from Nicholas Poppe's *Introduction to Mongolian Comparative Studies* and *Grammar of Written Mongolian*, Juha Janhunen's *The Mongolic Languages* (Routledge), Ferdinand Lessing's *Mongolian–English Dictionary*, Zhu Yongzhong & Keith Slater on Mongghul/Mangghuer, and Kane's *The Kitan Language and Script* for Para-Mongolic. For the Tungusic side I rely on Benzing's *Die tungusischen Sprachen*, Vasilevich's *Evenkijsko-russkij slovar'*, Robbek's Even materials, Avrorin & Boldyrev on Nanai, Nikolaeva & Tolskaya's *Grammar of Udihe*, Norman's *Comprehensive Manchu–English Dictionary*, and Kane's Jurchen work. Across the 19 lects the pronominal (bi/mi ~ či/ši/si/hi), numeral, and reflex sets check out against the *si > hi (Even), *s-retention (Evenki/Nanai/Manchu), and Mongolic *hodun 'star' / *nere 'name' correspondences; only one script cell diverges from its own corpus convention.

## Issues found
### 1. `mn_cn` — star — traditional-script form missing final -n
- **File:** `words/star.js` — code `mn_cn`
- **Current:** ["ᠣᠳᠤ","ɔt"]
- **Expected:** ["ᠣᠳᠤᠨ","ɔt"]
- **Why:** The Written/Classical Mongolian noun for 'star' is *odun*, spelled with a final ᠨ (na, U+1828): cf. the corpus's own `cmg` cell ᠠᠳᠣᠨ→ᠣᠳᠣᠨ (odun) and Lessing's dictionary headword *odun*. Inner Mongolian retains the classical orthography, and the parallel `mn_cn` 'name' cell keeps the full classical stem ᠨᠡᠷᠡ (nere) rather than truncating to the Khalkha spoken shape. The current 'star' cell ᠣᠳᠤ (o-d-u, U+1823 U+1833 U+1824) has dropped the final ᠨ, yielding a non-word "odu" that is inconsistent with both `cmg` and its own 'name' cell. The Cyrillic Khalkha reflex (spoken *od*, IPA ɔt) is correct and should be retained as the IPA; only the native script needs the final na restored.

## Worker response (作業者)
Findings: 1 · applied 1 · rejected 0 · skipped 0. Fixes applied to live words/*.js via the round-1 rally apply, `node validate_wordmap_data.js` passing.

**File status: CLOSED**
