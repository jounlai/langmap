# Trivia review 14: native voice in every language

Owner 2026-11-09: 「読み物系も、各言語話者の観点で、違和感がないか、確認・リライトして。ネイティブとして、違和感や翻訳体など不自然な表現がなく、面白く読み下ろせるように。文章のAIっぽさも和らげて。」

One agent per language reads all 273 articles cold as a native writer and rewrites translationese, AI-sounding formulas ("not X — it is Y", drumroll colons, punchline endings, stacked のである), heavy noun strings and dull sentences, without changing facts (brief: ~/langmap-work/l10n_read2/BRIEF.md; fixes LANG/fix.tsv applied with applylang.py). No real native has read these yet; the agents write as natives.

| lang | fixes | notes |
|---|---|---|
| en | 97 | most in the Han Map script/history articles; Taa consonant counts worded three ways across articles (consistent, not identical) |
| ja | 162 | c01 (oldest, most translated) had ~90; Mongolian-script article now matches the English on why Cyrillic cut readers off; three ja articles miss a clause the English has (atsign-animals, linear-a-undeciphered, germany-names); five Han articles use です/ます |
| zh | 176 | ~100 in c01 (chains of 的, 其实/关键在于, drumroll colons); c01 and some c02 still use half-width , : ; and digit spacing varies — separate mechanical job |
| yue | 490 | c01 (347): 36 articles had English punctuation between characters, now full-width; written-Chinese leftovers (著, 其, 與, 們) and "…" quotes around Chinese → 「」 |
