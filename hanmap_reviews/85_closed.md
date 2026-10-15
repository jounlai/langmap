# Hanmap data review #85 — script comparison against MCPDict town tables

> 2026-10-15. ~/langmap-work/mcpdiff/ (mapping.tsv code → MCPDict table,
> tables/, diff.py, worklist.tsv). Re-run diff.py after any HanMap edit.

diff.py compared all 61 Sinitic rows that have an MCPDict town table, every
character: 4,869 of ~6,180 cells matched outright (segments after notation
normalisation, and tone value from the table's 聲調); 171 characters are not
in their table. The 1,141 mismatches went to eight reviewers, each followed
by a default-reject checker.

Result: 97 patches (≈70 cells) fixed, all accepted; the rest kept, for stated
reasons — yue_hk / yue / yue_mo follow Jyutping/LSHK values, cdo follows
Wiktionary's Fuzhou tones (and the table writes only tight rimes), Taihu Wu
surfaces carry Wugniu tone classes, rows that show the 白讀 where the table
lists 文讀 first, and notation conventions (ɿ/z̩ …). Fixes: wuu_wz 手 肉 左 土
魚 木 目 地 (pitch-contour notation kept), hak_mz six cells, zh_hf (馬 ma …),
zh_db rimes, wuu 海 hɛ, wuu_jh 馬, and others.
That the comparison found only ~70 real errors after reviews #80–84 is the
measure of those five rounds.
