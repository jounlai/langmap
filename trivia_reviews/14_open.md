# Trivia review 14: native voice in every language

Owner 2026-11-09: 「読み物系も、各言語話者の観点で、違和感がないか、確認・リライトして。ネイティブとして、違和感や翻訳体など不自然な表現がなく、面白く読み下ろせるように。文章のAIっぽさも和らげて。」

One agent per language reads all 273 articles cold as a native writer and rewrites translationese, AI-sounding formulas ("not X — it is Y", drumroll colons, punchline endings, stacked のである), heavy noun strings and dull sentences, without changing facts (brief: ~/langmap-work/l10n_read2/BRIEF.md; fixes LANG/fix.tsv applied with applylang.py). No real native has read these yet; the agents write as natives.

| lang | fixes | notes |
|---|---|---|
| en | 97 | most in the Han Map script/history articles; Taa consonant counts worded three ways across articles (consistent, not identical) |
| ja | 162 | c01 (oldest, most translated) had ~90; Mongolian-script article now matches the English on why Cyrillic cut readers off; three ja articles miss a clause the English has (atsign-animals, linear-a-undeciphered, germany-names); five Han articles use です/ます |
| zh | 176 | ~100 in c01 (chains of 的, 其实/关键在于, drumroll colons); c01 and some c02 still use half-width , : ; and digit spacing varies — separate mechanical job |
| yue | 490 | c01 (347): 36 articles had English punctuation between characters, now full-width; written-Chinese leftovers (著, 其, 與, 們) and "…" quotes around Chinese → 「」 |
| ko | 449 | c01/c04/c07 most; five 합니다체 articles turned into 다체 like the rest; 3 list-item fixes not applied (list markup differs); en/ja/yue leftovers that had appeared twice in an overlay now applied (fixdup.py, verify.py) |
| vi | 567 | ~360 voice (passive được…bởi chains, calques), 121 titles lowercased after the colon, Han headings to sentence case, Latin→Latinh; olderbrother article now matches the English on брат/fratello |
| id | 2223 | Word Map articles most ("X Polandia" order, calques), Title Case → sentence case, aksara, tulang ramalan; 土豆 gloss fixed to 'kacang dari tanah' (peanut misreading) |
| hi | 471 | c01–c02 and Han articles most; gender agreement and spaces before । fixed; etruscan 'letters you are reading now' reworded; paper article cites 紙 (kami) as Old Chinese — the English has the same slip (content fix pending) |
Content fix: paper-the-inventors-word gave Old Chinese 紙 the Japanese reading '(kami)' in every language; bracket removed.
| th | 2546 | มัน overuse, ถูก-passives, colon setups, calqued idioms; telegraphic newer short articles (c08–c10) rewritten into connected Thai; shanghainese-ipa-wugniu th is missing two English passages (needs retranslation) |
| sw | 639 | ~180 Title Case → sentence case, ~170 em dashes, rest voice; twenty-one-whole-person Kimanx → Kimansi (fact); three headings left in Title Case (not unique without ##) |
| de | 593 | c01 and Han articles most (dash asides, participle openers, drumroll colons); reader address unified to Sie/man; c09 articles 4–30 only scanned (needs a full read); c01 still has ~570 straight quotes, ~600 em dashes overall — typography script pending |
