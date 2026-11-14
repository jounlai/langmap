# LangMap データレビュー #112 — rally 2026-11-14 round 1 (Japonic, Koreanic, Sinitic 23 rows + Word Order UI)

Reviewer drafts: ~/langmap-work/rally1114/r01/a1 (lm_fix.json, 184) and r01/a4 (14 UI patches).

## Data (184 + 16)
- #38: ja and 5 Japonic rows lacked 見る (the title's verb); added. ja_aom めぇ ('tasty') → めごい as reviews 01 / ja_01 did.
- #85: the main verb split from the 'should' segment in all 11 Japonic rows and Ainu.
- #33: head noun 'room' split from 'the hotel' in ja_kyo ja_edo ja_heian ko_em ko_mid zh_db ain.
- ko_mid (30): lost first syllable of ᄇᆡ호- 'learn', #79 젼ᄎᆞ로, 'tomorrow' ᄂᆡᅀᅵᆯ, ㅎ-final nouns, 을 after consonants, row norms.
- zh_sc #37/#54 要得 ('OK') → 要; ja_aom 教えで, この; ja_edo 七日 for 週, 四半刻; ja_oki Shuri frame, ぬ subjects; Korean
  spellings (래년, 양금, 역, 얼마고, 보여); Ainu letter swaps and glosses (#13 #35 #48 #15 #19 #76); segmentation fixes.
- Korean glue: 96 cells get the U+200C join mark so Copy/CSV write "다나카입니다", not "다나카 입니다".
- From the UI lane: 16 cells had glue on a free word ("I sawin a shop"): en de it es_mx sw.

## UI (index.html, app.js; 14 patches)
Phone Copy text threw and copied nothing; es/pt interfaces showed Japanese in the picker and share text (es → es_mx,
pt → pt_br); picker/share text joined with spaces (ja/zh/yue/th split word by word); a pasted link with another ui= did not
switch the page language; RTL PNG/SVG export mostly blank; RTL arrow keys; All ON/OFF with a search typed switched all 223
rows; CSV: rows without sentences listed, U+200C in cells; duplicate l= codes; big-text links for de_gsw/de_by/en_ang (404)
and myn (went to Classical Maya); arrows scroll the map when it is wider than the screen; phone "+" menu off screen.

## HOLD (owner/policy or source-based rebuild)
- Ainu (ain): many cells carry wrong glosses (ヌマン 'yesterday' for 'every', オンネ 'old' for 'evening', スマ 'stone' for
  'week', フンペ 'whale' for 'minutes' …). Needs a source-based rebuild or an experimental flag.
- ko_mid: needs a source-based rebuild (modern forms 그/맞은편/까지, invented forms 먹ᄒᆞ리라 …).
- ja_oki: untranslated Japanese verbs/adjectives; ja_edo modern words (電話 充電 AI 自転車) — policy.
- Conflicts with earlier reviews: ja_heian #68 よろしき, ko_mid #98/#80, Sinitic #61 迟到开会 order, yue #29 支遮, yue #100,
  Sinitic #34 慢 fused, ja_aom だがや.
