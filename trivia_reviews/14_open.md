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
| fr | 382 | c01 139, Han script articles ~190 (dashes, Title Case, calques réaliser/possiblement/vs.); 10 empty <sup></sup>, entities in tea article and mixed apostrophes/NBSP left for a script; Haiti population (en says ~12M in country and ~12M total) needs an English check |
| pt | 134 | c01 ~60, c07 ~28; ~30 articles in European Portuguese among Brazilian ones (variety unification pending); Mohawk '58 células' → '58 prefixos pronominais' |
| es | 398 | c01 175 (≈200 dash asides), Sinosphere and word-story articles; 'accidentes geográficos' mistranslation fixed; 47 lower-case cited forms opening sentences; tú/usted mix; quote style and capitalisation of peoples/scripts to unify |
| it | 1865 | c01, c03–c07 most (punchy fragments, generic tu, calques, dashes, Title Case); kokuji heading duplicates the title (not unique); Lineare A/B gender and quote style to unify |
| ru | 258 | c01–c05 most; tuyuca summary Хуан → Джон (fact), Бакстер and Ели Жэньжун unified, клетка → ячейка; Latin-script person names in Russian text left (site policy needed) |
| ar (pass 1) | 355 | only ~17 articles read in full; the rest pattern-scanned (ببساطة ×80, ~470 dash asides, والنتيجة drumrolls, حجر رشيد). Full read split into three readers follows |
| uk | 1394 | delayed-subject calques, bookish copulas, Title Case; term spellings unified (кандзі, ханча, манйоґана, хан-в’єт); mixed apostrophes and missing IPA on Ukrainian forms left |
| he (pass 1) | 162 | c01 and c10 read in full, c02–c09 only openings, closings and flagged sentences; 'סימניות' (bookmarks) used for characters ~30 times; full read follows |
| ar (c04–c06 full) | 142 | إنه/إنها openers, ببساطة, heading echoes, olderbrother meaning matched to English; hangul/cuckoo/kanbun-yomi drop English content (noted); أيضاً vs أيضًا spelling to unify |
Mechanical: ASCII , ; : ? ! between Chinese characters (zh, yue) made full-width; trivia_style budget ascii-punct 38 → 0.
