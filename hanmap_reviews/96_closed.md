# Han Map review 96 — rally 2026-11-14 round 6 (22 keys: 六 千 火 海 春 今 龍 犬 毛 舌 肉 兒 茶 走 言 紅 大 高 好 前 西 無) + UI

Data (47 lines): hak_cn 無 variants ˩˩ (bulk fill ˨˦; MCPDict 梅縣 11); hsn 大 dai/da and 春 qyn, 犬 qyenn (row spelling; "qh"
dropped by review 81); zh_tang 好 xɑu (曉母 x); nan_pn 西 生 香 variants ˦˦ — the last ˧˧ in the row; wuu_sz 千 tshie / 言 ye
(row's ɪ); zh_xa 無 vu; ptai 毛 IPA without presyllable; ja 茶 adds 慣用音 チャ; ja 走 ス 呉音 and 虎 ク 呉音 restored (owner OK'd
2026-05-31, 8eca8ca; an agent batch had dropped them) — now guarded in owner_decisions_check; 12 yue_gz and 12 bfs cells
filled from each row's own cited MCPDict table.
UI (hanmap.html, speak.js; 7 patches): Share passes the character as ?w=… and og:url is gone (as the Word Map, 6f53eb79),
so a shared character no longer opens as 一; neighbouring labels no longer print 4 px into each other (102 → 0 pairs in 170
views; −1.7 % labels, no core row lost); Only survives reload; sense tabs on 行:2/長:2/中:2 at load and after Back;
pronunciation panel above the dialect legend; the pronunciation panel gets a history entry (Back closes it, both maps);
settings drawer no longer covers the pronunciation button (both maps).
Held: zh_tang 尤/東/屋 rhymes follow no single reconstruction (row-wide choice needed); hsn 犬 nasal; zh_gl 肉 zou; vi_nom
言/舌 first-listed forms; nan_pn 西 文讀; ja 紅 ク; empty cells in rows whose cited tables lack them.
