# Review 853 — six new basic words: leaf, skin, knee, see, hear, die; Japanese/Korean dialect verbs in base form

2026-11-27. The owner asked which basic words were still missing. The ASJP-40 concepts not on the map were proposed, and the owner chose to start with six (「その6語から始めてください」). The Word Map goes from 172 to 178 words.

## Method
- **Candidate sheets.** Built from the local lexibank CLDF lists, by Concepticon gloss (LEAF, SKIN, KNEE, SEE, HEAR, DIE). About 800 rows have candidates for each concept. Each row shows its own eat/drink/sleep/tree/eye cells, so drafters can follow the row's spelling, citation form and IPA.
- **Drafting.** 15 drafting agents, one per family group (IE West ×2, IE East, Indo-Iranian, Sinitic, NE Asia ×2, Austronesian, SE Asia, Tibeto-Burman + Dravidian, Africa ×2, Americas, Other ×2). Each worked under a brief that forbids re-spelling and ASJP-only cells.
- **Checking.** 13 check agents reopened every source: 2,880 ok, 48 fixes, 16 drops.
- **My drops.** I dropped further cells:
  - generated inflections: Koine infinitives;
  - near senses: "hear well", "listen" (Arbëresh gjegj, Kaqchikel tzuʼ "look at");
  - sources that disagree: Korean dialect knee forms, Kagoshima knee, Okinawan "die" (しぬん is "mostly for animals");
  - spellings or tone dots that were inferred: Middle Korean 듣다 tone, Classical Tibetan ཐོས, Early Modern English /heːr/;
  - unattested stages: Yuan-period leaf/die;
  - one composite row: Shwe Palaung.
- **Routes.** For now every cell is on `plain`. The etymological routes (PIE *bʰleh₃- etc.) follow in a route pass, as for the other basic words.

## Result — 2,953 cells in 742 rows
| word | cells |
|---|---|
| leaf | 560 |
| see | 497 |
| skin | 489 |
| die | 489 |
| knee | 474 |
| hear | 444 |

Main sources:
- English Wiktionary (translation tables and entries; kaikki.org dumps when the API rate-limited);
- NorthEuraLex, IE-CoR, IDS, ABVD, ACD, WOLD, DiACL, grollemundbantu/tls, DravLex;
- STEDT, MCPDict (Sinitic readings), Baxter–Sagart and Pulleyblank;
- 우리말샘 and 우리말어휘역사사전 (Korean);
- 日本国語大辞典 via kotobank (Japanese historical stages).

The words are `partial` (🧪) for now. The variety rows without a variety-level source are budgeted in owner_decisions_check: leaf 65, skin 64, knee 63, hear 56, see 55, die 51.

## Japanese and Korean dialect verbs — base form (owner 「もうそういう細かいのは要らないので、基本形に戻しましょう」)
- **What changed.** The dialect rows had connective forms: Japanese te-forms 食べて/飲んで/食うて/良くて, and Korean -어 forms 묵어/마셔/좋아 plus the attributive 하얀. All 26 such cells in eat, drink, good and white are now in dictionary form (食べる, 食う, 飲む, 良い; 묵다, 먹다, 마시다, 좋다, 하얗다). Each cell's comment keeps the old form.
- **Left as they are:**
  - Kyushu adjectives in -か (よか, 黒か, 青か): that is their base form.
  - Ryukyuan rows: no source for their base forms.
- **New words.** see/hear/die are entered for the Japanese and Korean dialect rows as 見る/聞く/死ぬ and 보다/듣다/죽다.

## Fonts
The Nôm subset was re-cut from NomNaTong v5.18 with 𦲿 lá, 䏧 da, 𧡊 thấy, 𦖑 nghe and 𣩂 chết. The historic-script subsets were regenerated.

## To check later
Some existing cells may be wrong; the new leaf cells exposed them:
- kgg book "haq" (equals leaf);
- pi/pi_edu paper (Wiktionary paṇṇa is leaf/letter);
- ame green aspan (equals leaf);
- ace paper ôn (ôn is "leaf").

Status: CLOSED
