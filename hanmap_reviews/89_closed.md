# Han Map review 89: readings against Wiktionary's Chinese entries

2026-11-09. Every Han Map character was paired with the readings in its Wiktionary Chinese entry (kaikki raw dump; ~/langmap-work/hancheck: dump.js, scan.py). Rows compared: Mandarin pinyin, Cantonese Jyutping, Hokkien (POJ converted to Tâi-lô), Hakka, Min Dong, Min Bei, Teochew, Taishan, Dongguan, Nanning.

- Mandarin, Cantonese, Min Dong, Min Bei: every cell matches one of Wiktionary's readings.
- Hokkien: every cell matches once POJ is written in Tâi-lô (ch→ts, o͘→oo, oa→ua, eng→ing).
- Dongguan, Nanning and Taishan follow MCPDict town tables with their own tone numbering; the differences are notation, not readings.
- Hakka: Wiktionary's Pha̍k-fa-sṳ readings are Sixian, so hak_cn (Meixian) differs on purpose. But the two Meixian rows disagreed with each other: hak_cn writes 五 ń /n̩˧˩/ and 魚 ǹ /n̩˩˩/ (fixed to MCPDict 梅縣 in 3888e5a73), while hak_mz still had ńg /ŋ̍˧˩/ and ng /ŋ˩˩/. MCPDict 梅縣 gives 五 n̩3 and 魚 n̩2, so hak_mz now matches hak_cn.
