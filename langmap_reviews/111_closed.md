# LangMap データレビュー #111 — 30レビュワー × 10開発者 大規模ラリー

## 概要

100文 × 223言語 = 22,300 セルの語順データを、言語族で分割した **30レビュワー**（実働28）が監査し、**10開発者**が懐疑的検証で apply/reject を判定した大規模ラリー。110回の既存レビュー後の残存欠陥を対象。

- **総 findings: 142**（確実 85 / 蓋然 40 / 要検討 17）
- **開発者検証: 142 件**（apply 承認 103 / reject 39）
- **適用済み: 全 103 件**（確実 78 + owner確認後 25）→ data.js 反映済み
- owner はポリシー判断（①再分割 ②再統合 ③ラベル整合・重複解消 ④文法・表記修正）で全4ポリシーを承認、25件適用。
- 検証ツール: 38エージェント、~3.6M tokens、22分。`_omission_guidelines.md` / `_policy_deferred.md` / 直近 #110 の方法論を全レビュワーが参照。

---

## A. 適用（確実 78件 — sibling多数派/確立ルール）

### #88 `af`
- **適用後:** `A:KI  C:is besig om  B:die wêreld  C:te verander`
- Verified B+C fusion, pure re-segmentation, surface text unchanged ('KI is besig om die wêreld te verander'). The verb 'te verander' (C=change, core role A.1) is buried in B with its object. The af progressive frame separates object from verb elsewhere — e.g. #60 'C:om B:Koreaanse kos C:te kook' has C twice non-adjacent with B between, the exact pattern proposed here; #15/#26 also split. Re-segment to C:is besig om / B:die wêreld / C:te verander so the object (B) and verb (C) are independent. Concatenated text identical.

### #21 `ar_iq`
- **適用後:** `A:أني  B:الليلة  E:راح  D:أتعشه  C:ويه أصحابي`
- Verified defect: current ar_iq fuses future particle راح + dinner-verb أتعشه into one E segment, dropping D. en palette = E:will have / D:dinner; siblings consistently split (ar_eg E:هـ D:اتعشى, ar_lev E:رح D:أتعشى, ar_sd E:حـ D:أتعشّا). Split restores D=dinner-verb. Surface text 'أني الليلة راح أتعشه ويه أصحابي' is byte-identical before/after (pure re-segmentation, feedback_no_text_change_on_segment_fix).

### #90 `as`
- **適用後:** `A:তেওঁ  C:নিজে  B:প্ৰগ্ৰামিং  D:শিকিলে`
- Confirmed transliteration error: as B প্ৰগ্ৰেমিং has medial ে (U+09C7, 'e'), wrong for English 'programming' which takes া (U+09BE, ā). Siblings bn প্রোগ্রামিং and or ପ୍ରୋଗ୍ରାମିଂ both use ā. Minimal single-character fix ে→া (verified one occurrence) yields প্ৰগ্ৰামিং, Assamese ৰ letters preserved; rest of surface identical. Other roles unchanged.

### #57 `bho`
- **適用後:** `A:ऊ  B:तीन भासा  C:धड़ल्ले से  D:बोलेली`
- Confirmed defect: current D fuses manner-adverb धड़ल्ले से (fluently) with verb बोलेली, leaving palette C empty. en (C:fluently/D:speaks), ja (C:流暢に/D:話す) and all 5 IA siblings (gu/hi/ne/mr/pa) split C-manner + D-verb. Manner adverb is a core role (omission_guidelines A.4). bho's own #47 splits C:सहजे / D:समझइले, so this is an internal outlier. Re-segmentation only; surface text concatenates identically (verified).

### #89 `ca`
- **適用後:** `A:Jo  C:no  B:puc  D:trobar  E:‌la  G:contrasenya  F:del Wi-Fi`
- Verified orthographic defect. Current C:No is capitalized at index 1, after A:Jo — not sentence-initial. Standard Catalan writes mid-sentence 'no' lowercase. Confirmed #89 is the ONLY ca cell with a non-sentence-initial capital 'No' (siblings es_an/es_ar/es_cl capitalize 'No' only because they are pro-drop and it IS their first word; it/fr write lowercase non/ne after A). Direct parallel to closed-review #110 Issue 13 (cs #19 mid-sentence Rád→rád, accepted 確実). Only the capital changes: C:No → C:no. The E:‌la segment (leading ZWNJ) is preserved.

### #1 `chr`
- **適用後:** `A:ᎠᏴ  K:ᏗᎳᏂᎪᎯ  J:ᎠᎦᏘᏏ  I:ᎦᎸᎳᏗ  G:ᎠᎩᎢᎩ  D:ᎠᏍᏚᏗ  B|C:ᎠᏆᏚᎵ`
- Verified defect: current chr A = ᎠᏋ (U+13A0 U+13CB, 'a'+'quv'); standard Cherokee 1sg 'I' is ᎠᏴ (U+13A0 U+13F4, 'a'+'yv'). Corpus survey: 41 cells use ᎠᏴ vs only 5 use ᎠᏋ, and 4 of those (#1,#9,#17,#98) are A-role subject 'I' (the 5th, #13:B, is object 'me' and correctly excluded). Pure single-syllable substitution (U+13CB→U+13F4); only the A-segment text changes, all other segments preserved verbatim. Matches en A:'I' / ja A:'私は'.

### #9 `chr`
- **適用後:** `A:ᎠᏴ  B:ᎠᏆᏚᎵ  C:ᎠᏓᏅᏖᏗ  E:ᏣᏩᏂᏏ  F:ᎢᎬᏱᎢ  G:ᏑᏕᏘᏴᏓ`
- Same verified typo as #1: current A = ᎠᏋ (U+13CB 'quv') must be ᎠᏴ (U+13F4 'yv'), the standard 1sg 'I' used in 41 chr cells. Codepoints confirmed in data.js. Only the A-segment text changes; all other segments identical to current. Matches en A:'I'.

### #17 `chr`
- **適用後:** `A:ᎠᏴ  C:ᏗᎦᎳᏫᎢᏍᏗ  B:ᎤᎿᎾ  D|E:ᏦᎢ  F:ᎪᎯ  G:ᏒᎯᏰᎢ`
- Same verified typo: current A = ᎠᏋ (U+13CB) must be ᎠᏴ (U+13F4). Outlier vs the 41-cell ᎠᏴ majority. Only the A-segment text changes; B/C/D|E/F/G preserved exactly. Matches en A:'I'.

### #98 `chr`
- **適用後:** `A:ᎠᏴ  B:ᎠᏆᏚᎵ  C:ᎠᏓᏅᏖᏗ  D:ᎯᎠ  E:ᎠᎵᏍᏓᏴᏗ`
- Same verified typo: current A = ᎠᏋ (U+13CB) must be ᎠᏴ (U+13F4). Completes the 4-cell sweep (#1,#9,#17,#98) of A-role subject 'I'. Only the A-segment text changes; B/C/D/E preserved exactly. Matches en A:'I'.

### #2 `ckb`
- **適用後:** `B:ناوی  A:من  D:تاناکایە`
- Confirmed role reversal vs en (A:My, B:name) and 6-sibling majority assigning A=possessor 'my', B=head noun 'name' (fa B:اسم/A:من, ps A:زما/B:نوم, kn/ml/ta/te all A=my/B=name). ckb had ناوی(name)=A, من(my)=B — reversed. Relabel only: ناوی→B, من→A. Surface text and order unchanged (verified). Copula -ە stays fused in D (legitimate zero-copula enclitic, B.3).

### #12 `da`
- **適用後:** `C:Kirsebærblomsterne  A:i denne  B:park  D:er smukke`
- Confirmed: da #12 C is 'Kirsebærblomstterne' with a doubled t. Correct Danish definite plural is kirsebær+blomster+ne = 'Kirsebærblomsterne' (single t), as the same lexeme is correctly spelled in da #53 ('Blomsterne') and #91 ('kirsebærblomster'). Pure surface typo fix; role-letter order and chunking unchanged.

### #23 `et`
- **適用後:** `A:Raamatukogu  D:on  B:kõrval  C:haigla`
- Confirmed case-government grammar fix. The postposition kõrval ('next to') governs the GENITIVE; current C:'haiglat' is partitive (-t ending). haigla is a vowel-stem noun whose genitive = nominative = 'haigla' (verified). Sibling fi uses genitive C:sairaalan; et's own #97 pattern uses genitive + postposition. Surface-text grammar correction haiglat→haigla; roles/order unchanged, no adjacency.

### #28 `fa`
- **適用後:** `G:آیا  B:شما  D:می‌توانید  F:یک  E:رستوران خوب  C:پیشنهاد بدهید`
- Confirmed person/number agreement error. Subject B:شما (2pl/formal) and modal D:می‌توانید (2pl) are 2pl, but the embedded subjunctive was بدهد (3sg 'he/she gives'). Must agree 2pl. Fix C:پیشنهاد بدهد → پیشنهاد بدهید. Hard grammatical rule; only the embedded-verb text changes.

### #49 `fr_be`
- **適用後:** `D:Indiquez-moi  A:S'il vous plaît  E:le chemin  F:vers  G:l'aéroport`
- Verified sentence-initial-capitalization defect with an exact applied precedent. fr_be 'indiquez-moi' is the first (rendered-initial) segment yet lowercase. Review #88 found the IDENTICAL defect in the sibling fr_af #49 ('montre-moi' sentence-initial lowercase), applied the capitalization fix, and data.js now shows fr_af #49 D:'Montre-moi'. French sentence-initial capitalization is a hard rule; fr/fr_ch/fr_qc all capitalize their initial imperative. Only the initial letter changes; nothing else touched.

### #60 `fr_be`
- **適用後:** `A:Je  D:suis en train d'apprendre  C:à cuisiner  B:la cuisine coréenne`
- Verified missing core verb (_omission_guidelines A.1). Current fr_be renders 'learning Korean cuisine' and drops C='to cook' entirely. en has C:to cook; all 7 siblings carry the cook-verb. The sibling fr_af uses the IDENTICAL auxiliary 'suis en train d'apprendre' AND keeps C:à cuisiner, giving an exact template. Inserting C:à cuisiner between D and B reproduces fr_af verbatim and yields natural French. Text change justified to restore a missing core role.

### #13 `hak_cn`
- **適用後:** `A:請  D:分  B:𠊎  F:一杯  C:水`
- Confirmed orthography defect. B:涯 (U+6DAF) is an off-standard graph for the 1sg pronoun. Every other hak_cn cell writes 1sg as 𠊎 (U+2028E), including object-role 'me' in #24/#49/#65/#82 (all B:𠊎). Normalize 涯->𠊎 for sibling-self consistency; only this single graph changes (orthography normalization, not a re-segmentation).

### #41 `hmn`
- **適用後:** `A:Kuv  B:tam sim no  F:ib phau ntawv  C:lom zem  E:nyeem`
- Confirmed role swap. Palette anchors C=interesting, F=book (en C:interesting/F:book; ja C:面白い/F:本を; ko_kp C:흥미있는/F:책을; cdo C:趣味其/F:冊; hak_cn C:好看个/F:書). hmn currently tags the noun 'ib phau ntawv' (a book) as C and the adjective 'lom zem' (interesting) as F — reversed. Relabel book->F, interesting->C. Surface text and Hmong N-Adj order (ib phau ntawv lom zem) unchanged; segment-relabel only.

### #34 `hwc`
- **適用後:** `A:Please  C:talk  B:mo  D:slow`
- Confirmed: current hwc B:'mo slow' fuses comparative 'mo' (more) with manner adverb 'slow'. Manner adverb is a core role (guideline A.4). Palette has D available; en reference splits B:more D:slowly, and siblings scn (B:cchiù/D:chianu), vec (B:più/D:pian), pcm (B:more/D:slow) all split. Surface text 'mo slow' preserved (space-join verified identical).

### #11 `hy`
- **適用後:** `A:Ես  F:երեկ  B:գրախանութից  D:նոր  E:գիրք  C:գնեցի`
- Confirmed orthography/typo fix. 'bookstore' = գրախանութ (գիր book + linking vowel ա + խանութ shop); the cell's B:'գրխանութից' drops the ա, giving a malformed stem. Correct ablative 'from the bookstore' is գրախանութից (verified: գրախանութ is the standard spelling). Single-cell spelling correction; only B text changes, roles/order unchanged, no adjacency.

### #10 `id`
- **適用後:** `E:Apakah  A:Anda  D:bisa  C:berbicara  B:bahasa Inggris`
- Verified defect. Current is D:Apakah / A:Anda / D:bisa / C:berbicara / B:bahasa Inggris — a genuine non-adjacent duplicate D (Apakah / bisa). 'bisa' is the modal mirroring en D:Can; 'Apakah' is the yes/no Q-particle. In #10, ja occupies E with か (the Q-particle slot), and E exists in the palette but is unused in id. id's own #40 uses E:Apakah. Relabel D:Apakah → E:Apakah removes the dup-D and assigns the Q-particle role. No text change.

### #35 `id`
- **適用後:** `E:Kakak laki-laki  A:saya  B:menikah  D:bulan  C:lalu`
- Verified defect. Current is A:saya / E:Kakak laki-laki / B:menikah / D:bulan / C:lalu — the possessor 'saya' precedes the head noun, which is ungrammatical in head-initial Indonesian (possessor follows noun). The stranded capitalization (sentence-initial lowercase 'saya', mid-string capital 'Kakak') confirms the segments are mis-ordered. Siblings jv (E:Kakak laki-laki A:aku) and ms (E:Abang A:saya) order noun-then-possessor. Reordering to E:Kakak laki-laki A:saya B:menikah D:bulan C:lalu is a pure segment reorder; surface words are unchanged and capitalization then lands correctly (capital 'Kakak' sentence-initial, lowercase 'saya' medial).

### #61 `id`
- **適用後:** `A:Dia  B:selalu  C:terlambat  E:datang  D:ke rapat`
- Verified defect. Current is A:Dia / B:selalu / C:terlambat / D:datang ke rapat — the main verb 'datang' (arrives, en E:arrives) is fused with 'ke rapat' into a single D, leaving the core verb unsegmented (A.1). Sibling ms splits E:datang C:lewat D:ke mesyuarat; su splits E:datang D:ka rapat. E exists in the palette and is unused in id. Resegment D:datang ke rapat → E:datang + D:ke rapat. Concatenation 'Dia selalu terlambat datang ke rapat' unchanged.

### #89 `ii`
- **適用後:** `A:ꉢ  F:Wi-Fi  G:ꀑꇬ  D|C:ꃅꄷꂷ`
- Confirmed single-character typo. A:ꉬ (U+A26C) is the wrong Yi syllable for the 1sg subject. The Nuosu 1sg pronoun is ꉢ (U+A262), used consistently across ~30 ii cells (verified #1/#2/#3 all ꉢ U+A262). Correct A to ꉢ; only this one codepoint changes.

### #28 `ilo`
- **適用後:** `A:Mabalin  B:‌mo  G:kadi  C:a irekomenda  F:ti nasayaat a  E:restaurant`
- Verified defect. Current is A:Mabalin / B:‌mo / A:kadi / C:a irekomenda / F:ti nasayaat a / E:restaurant — non-adjacent duplicate A (Mabalin 'can' / kadi). 'kadi' is the Ilocano yes/no Q-particle. In #28, ja uses G:か and siblings tl/ceb use G:ba for the Q-particle; G exists in the palette and is unused in ilo. Relabel A:kadi → G:kadi matches the #79 Q-particle methodology and removes the dup-A. The B:‌mo segment (leading ZWNJ, U+200C) and all text are preserved unchanged.

### #46 `ja_hir`
- **適用後:** `A:わしは  B:友達  F:と  C:電話で  D:一時間  E:話し  H:たんじゃ`
- Confirmed defect: ja_hir currently has E:話した H:んじゃ, fusing the past morpheme た into the verb-stem segment E. The palette H-role is the past '-ed' marker (en H:ed). All 6 ja-siblings keep E=stem only and place た in the suffix segment (ja E:話し/H:た, ja_aom E:すゃべっ/H:たじゃ, ja_hak E:話し/H:たったい, etc.), and ja_hir's OWN #69 correctly does D:書い E:たんじゃ. Re-segment to E:話し H:たんじゃ. Surface 話したんじゃ unchanged (話した+んじゃ -> 話し+たんじゃ). Segment-only fix, cross-sibling consistency.

### #34 `jam`
- **適用後:** `A:Beg yu  C:taak  B:moa  D:sluo`
- Confirmed: jam B:'moa sluo' fuses comparative 'moa' with manner adverb 'sluo'. Same defect and same fix as hwc, mirroring en (B:more/D:slowly) and the scn/vec/pcm splits. Manner adverb is core (A.4). Surface text 'moa sluo' preserved (verified identical).

### #10 `jv`
- **適用後:** `E:Apakah  A:sampeyan  D:bisa  C:ngomong  B:bahasa Inggris`
- Verified defect, identical to id. Current jv is D:Apakah / A:sampeyan / D:bisa / C:ngomong / B:bahasa Inggris — non-adjacent dup-D. 'bisa'=modal (en D:Can); 'Apakah'=Q-particle = ja's E:か slot; jv's own #40 uses E:Apakah. Relabel D:Apakah → E:Apakah. No text change.

### #68 `kk`
- **適用後:** `A:Мен  B:мұнда  C:отыра  D:аламын  E:ба`
- Verified: current kk C:'отыра аламын ба' fuses verb (отыра) + modal can (аламын) + Q-particle (ба) into one segment. en palette = D:Can; siblings split modal into D (az C:otura D:bilərəm, tk C:oturyp D:bilerinmi). kk itself uses D:аласыз (modal) + E:ба (Q-particle) in #10 — the proposed C:отыра D:аламын E:ба mirrors that exactly. Surface 'отыра аламын ба' identical (feedback_glue_marker, feedback_no_text_change_on_segment_fix).

### #81 `ko`
- **適用後:** `A:나는  C:오늘  E:두통이  F:있다`
- Confirmed role-label defect. en assigns E='a headache' / F='have'. ko uses the existential 'have a headache' strategy with verb 있다 tagged F (matching strategy-sibling ko_em F:있나이다), but mislabels the headache noun 두통이 as B. ko_em — the only other sibling using the same 있다 strategy — correctly tags it E:두통이. The B label belongs to the OTHER-strategy siblings (ko_bus/ko_jeju) for the subject 머리가 in 머리가 아프다. Since ko's verb is existential 있다=F, its noun must be E. Relabel B->E. Surface 두통이 unchanged; segment-only fix; cross-sibling consistency + en reference.

### #2 `ku`
- **適用後:** `B:Navê  A:min  D:Tanaka  C:ye`
- Same A/B role reversal as ckb #2: ku had Navê(name)=A, min(my)=B; en + 6 siblings put possessor=A, name=B. Relabel only: Navê→B, min→A; C:ye copula and D:Tanaka unchanged. Surface text and order unchanged (verified).

### #39 `ku`
- **適用後:** `E:Divê  A:ez  C:sibê  B:zû  D:rabim`
- Confirmed person-agreement error in Kurmanji subjunctive. Subject A:ez (1sg) requires 1sg 'rabim'; current D:rabin is 2pl/3pl (hûn/ew rabin). en is 1sg 'I have to wake up'; ckb sibling D is 1sg هەستم بکەم. Fix rabin→rabim. Hard grammatical rule; only D text changes.

### #64 `ku`
- **適用後:** `D:Divê  A:ez  B:têlefona xwe  C:şarj bikim`
- Confirmed: A fused modal Divê with subject ez ('Divê ez'). Every other ku obligation cell keeps Divê as a standalone modal segment with separate subject: #37 (B:Divê, A:ez), #54 (D:Divê, A:em), #85 (D:Divê, A:tu). Split Divê into its own modal D (matching #54 ordering D-then-A), keep A:ez, and merge the light verb şarj+bikim into a single C predicate (avoids non-adjacent double-D, matches en role mapping D=modal/C=verb). Surface text concatenates identically (verified).

### #30 `ky`
- **適用後:** `A:Ал  B:фортепьянону  D:абдан жакшы  C:черте  E:алат`
- Verified: current ky C:чертет = bare 3sg 'plays', missing the modal 'can' (en E:can; every sibling carries the potential aux: az E:bilir, kk E:алады, tk E:bilýär, he E:יכолה, mt E:tista', ti E:ትኽእл). Kyrgyz forms potential as converb + ал-, confirmed in-dataset: ky #10 'сүйлөй аласыз' (can speak), ky #89 'таба албайм' (can't find). Natural form черте алат (can play). Justified text change per guideline A.5 (modal omission) — not a no-text-change re-seg case. Roles: C:converb / E:modal match kk/tk/az sibling chunking.

### #37 `lo`
- **適用後:** `A:ຂ້ອຍ  B:ຕ້ອງ  E:ຊື້  D:ຂອງຂວັນ  C:ວັນເກິດ`
- Verified A.1 fusion: B:ຕ້ອງຊື້ fuses modal ຕ້ອງ (need) with content verb ຊື້ (buy); E (content verb) missing while palette has E. 6/8 siblings split B/E (th_isan B:ต้อง E:ซื้อ; vi B:cần E:mua; zh_tang B:須 E:購; ko E:사야). ຕ້ອງຊື້ is written solid (no internal space), so splitting at the morpheme boundary is a clean codepoint split. Renderer confirmed surface unchanged (ຂ້ອຍຕ້ອງຊື້ຂອງຂວັນວັນເກິດ). No space-loss issue.

### #25 `lt`
- **適用後:** `A:Mano tėvas  E:dirba  F:didelėje  B|D:įmonėje`
- Confirmed character-level split: inessive 'įmonėje' (at-the-company) chopped into stem D:įmonė + ending B:je. -je is a bound locative case suffix, not a separable preposition; Lithuanian has no separate word for en B:at. Violates feedback_no_character_level_split. Established lt composite-label convention for case-fused location (#43 A|E:restorane, #45 A|E:šalyje, #52 D|F:turguje, #53 A|D:sode). Merge to B|D:įmonėje (separator '|', lower letter first, per convention). Concatenation 'įmonė'+'je'='įmonėje' is byte-identical to current; surface text unchanged. (et/fi share the split but are out of scope.)

### #26 `lt`
- **適用後:** `A:Vaikai  C:žaidžia  B|E:parke`
- Confirmed character-level split: inessive 'parke' (in-the-park) split into stem E:park + ending B:e. -e is a bound locative suffix; no separate word for en B:in. Violates feedback_no_character_level_split. Established lt composite-label convention (#43/#45/#53). Merge en B(in)+E(park) into B|E:parke. Concatenation 'park'+'e'='parke' identical; surface text unchanged.

### #25 `lv`
- **適用後:** `A:Mans tēvs  E:strādā  F:lielā  B|D:uzņēmumā`
- Confirmed character-level split: Latvian locative 'uzņēmumā' split into stem D:uzņēmum + ending B:ā. -ā is a bound locative case ending, not a preposition. Violates feedback_no_character_level_split. Established lv composite-label convention (#43 A|E:restorānā, #45 A|E:valstī, #52 D|F:tirgū, #73 B|F:manā gultā). Fuse to B|D:uzņēmumā. Concatenation 'uzņēmum'+'ā'='uzņēmumā' identical to current; text unchanged.

### #26 `lv`
- **適用後:** `A:Bērni  C:spēlējas  B|E:parkā`
- Confirmed character-level split: locative 'parkā' split into stem E:park + ending B:ā. -ā is bound locative morphology, not a preposition. Violates feedback_no_character_level_split. Fuse to B|E:parkā per lv convention (#43/#45/#53/#73). Concatenation 'park'+'ā'='parkā' identical; text unchanged.

### #64 `lv`
- **適用後:** `A:Man  C|D:jāuzlādē  B:telefons`
- Confirmed character-level split of one morphological form: the Latvian debitive 'jāuzlādē' (must-charge) split into prefix D:jā + verb C:uzlādē. The debitive jā- attaches directly to the verb as one orthographic word. lv siblings keep it fused: #37 jānopērk, #39 jāceļas, #54 jāaizsargā; #64 is the lone outlier. Violates feedback_no_character_level_split. Fuse en D(need-to)+C(charge) into C|D:jāuzlādē (lower letter first). Concatenation 'jā'+'uzlādē'='jāuzlādē' identical; surface text unchanged.

### #33 `mr`
- **適用後:** `A:हॉटेलची  E:खोली  C:खूप  D:स्वच्छ  B:होती`
- Confirmed re-segmentation defect: mr fuses A:hotel (हॉटेलची, genitive) + E:room (खोली, head topic noun) into a single A. The palette has a distinct E role. en (A:The hotel/E:room), ja (A:ホテルの/E:部屋は), and 6 Indo-Aryan siblings (hi कमरा, bho कमरा, gu રૂમ, ne कोठा, pa ਕਮਰਾ, ur کمرہ) all split A:hotel + E:room; mr is among only two fusers (bn also fuses) against an 8-reference splitting majority. E=room is the topic noun (guideline A.3). Split at the existing space boundary: 'हॉटेलची खोली' -> A:हॉटेलची + E:खोली, surface text unchanged (feedback_no_text_change_on_segment_fix). Cross-sibling role consistency.

### #7 `nn`
- **適用後:** `A:I morgon  C:vert  B:vêret  D:solrikt`
- Confirmed: nn #7 B:'vert vêret' fuses copular/future verb 'vert' (will be → C) with noun 'vêret' (weather → B). Palette has C available. en splits C:'will be' B:'weather'; siblings no (C:blir/B:været), sv (C:blir/B:vädret), non (C:verðr/B:veðrit), is (C:verður) all keep verb and noun separate. Verb-then-noun order C:vert B:vêret matches sibling order. Surface text 'I morgon vert vêret solrikt' preserved (space-join verified identical).

### #5 `nn`
- **適用後:** `A:Denne  B:kaffien  D:er  C:veldig  D:god`
- Confirmed via codepoint dump: nn #5 B = 'kaffi'+U+00AD(SOFT HYPHEN)+'en'. Correct Nynorsk is 'kaffien' with no embedded character; siblings no B:'kaffen', sv B:'kaffet' have no stray char. Removing the soft hyphen yields the clean 'kaffien'. Invisible-character orthography fix; role-letter order and chunking unchanged.

### #45 `no`
- **適用後:** `E:I  F:dette  A:landet  D:blir det  B:om vinteren  C:kaldt`
- Confirmed: no #45 A:'I dette landet' collapses E (prep 'I'), F (demonstrative 'dette'), and A (noun 'landet'). en reference (E:In/F:this/A:country) and every sibling preserve the split: is/non (E:Í/F:þessu/A:landi), nn (E:I/F:dette/A:landet), sv (E:I/F:det här/A:landet), da (E:I/F:dette/A:land). Palette has E,F. Split order E:I F:dette A:landet matches siblings; surface text 'I dette landet blir det om vinteren kaldt' preserved (verified identical).

### #87 `oc`
- **適用後:** `A:Aquesta  B:aplicacion  C:es plan  D:pratica`
- Genuine gender-concord error, verified. Wiktionary confirms Occitan demonstrative paradigm: masc sg 'aqueste' / fem sg 'aquesta'. 'aplicacion' (-cion suffix, like all Romance -tion/-ció/-ción nouns) is feminine, corroborated by the already-feminine predicate adjective 'pratica' in the same cell (masc would be 'pratic'). Audit of all 14 oc cells with the demonstrative confirms 'Aqueste/aqueste' elsewhere only precedes genuinely masculine nouns (cafè, sac, parc, país, libre, plan, plat, sovenir, temple, matin, restaurant); #87 is the sole masc-demonstrative-with-fem-noun mismatch. All 8 Spanish/Galician siblings use the feminine demonstrative (Esta/Eta/Ehta). Only the initial demonstrative changes; text change justified as a real agreement error.

### #5 `pap`
- **適用後:** `A:E  B:kòfi aki  D:ta  C:masha  D:dushi`
- Verified defect. Current is A:E / B:kòfi / A:aki / D:ta / C:masha / D:dushi — non-adjacent duplicate A from the split demonstrative 'e ... aki' (this). Confirmed #5 is the ONLY pap cell that gives trailing 'aki' its own A; across all other pap cells using this demonstrative (incl. exact structural twins #18 A:E B:tas aki and #87 A:E B:app aki), 'aki' is folded into the modified noun's segment. Fold 'aki' into B → B:kòfi aki, removing the dup-A and matching pap's own convention. Concatenation 'E kòfi aki ta masha dushi' unchanged. The remaining D:ta / D:dushi (with C:masha between) mirrors en's own D:is/D:delicious palette pattern and is correctly left untouched.

### #99 `pl`
- **適用後:** `C:Ile  D:kosztuje  A:ta  B:pamiątka`
- Confirmed gender-agreement defect. Current A:ten is masculine but B:pamiątka ('souvenir') is feminine, requiring A:ta. Scan of all pl demonstratives confirms every other one agrees (ten plan-m #78, Ta kawa-f #5, Ta torba-f #18, to danie-n #98); #99 is the sole mismatch. Slavic siblings (ru этот, uk цей, cs/sk tento, sr овај) correctly use masculine because THEIR nouns are masculine (сувенир/suvenýr-m); pl chose the feminine noun but kept the masculine demonstrative. Minimal text change ten->ta, meaning-bearing agreement fix.

### #40 `pt_eu`
- **適用後:** `E:Sabe  C:onde  D:fica  B:os correios`
- Verified role-label defect, pure relabel, surface text unchanged. 'Sabe' is the main verb 'knows' (subject legitimately pro-dropped per _omission_guidelines B.1). The know-verb is role E in en (E:Do/know) and in siblings pt_br (E:sabe) and es_eu (E:Sabe); pt_eu mislabels it A (subject role). Re-label A→E; subject stays correctly pro-dropped. Concatenated text identical.

### #7 `rm`
- **適用後:** `A:Damaun  C:è  B:il temp  D:sulegliaus`
- Verified fused copula, pure re-segmentation, surface text unchanged ('Damaun è il temp sulegliaus'). Current B:'è il temp' buries the copula and leaves role C (the 'will be' copula) absent; en has C:will be and all 8 siblings carry a dedicated C copula (it sarà, ro va fi, nap sarrà, sc at a èssere, fo verður, la erit, fr_qc va être). Splitting C:è / B:il temp surfaces the copula and restores B to the bare noun. Concatenated text identical.

### #34 `ro`
- **適用後:** `A:Vă rog  C:vorbiți  B:mai  D:încet`
- Verified manner-adverb fusion, exactly the #34 ja_hak precedent in _omission_guidelines A.4. Current B:'mai încet' fuses the comparative 'mai' (B=more) with the manner adverb 'încet' (D=slowly), leaving D absent. 7 siblings split B:more / D:slowly (en, fr_qc, it, nap, rm, fo, sc); only la uses a synthetic comparative. Re-segment to B:mai / D:încet; concatenated surface 'mai încet' unchanged.

### #67 `scn`
- **適用後:** `A:Iu  D:mi allénu  B:ntâ palestra  C:tri voti  E:â simana`
- Confirmed: scn #67 has 'Mi allénu' capitalized at position 2 (after A:Iu), not sentence-initial. Scan of all scn cells shows only 4 non-initial capitalized segments: id2 'Tanaka' (proper noun), id9 'Giappone' (proper noun), id89 'Wi-Fi' (brand), and this one — the only non-proper-noun anomaly. Sibling vec #67 has lowercase 'me alleno'. Pure surface case fix; role-letter order and chunking unchanged.

### #2 `so`
- **適用後:** `A|B:Magacaygu  C:waa  D:Tanaka`
- Confirmed: 'Magacaygu' = magac(name) + -ay(my) + -gu/-u(subject article), carrying both A(my) and B(name) but labeled only A, leaving the topic noun B (A.3) uncredited. Sibling ha labels the exact parallel 'Sunana' as A|B; om/am/tg/cop all carry an explicit B. en is A:My B:name. Relabel A→A|B; surface text unchanged.

### #5 `so`
- **適用後:** `B:Kafigan  A:kan  C:waa aad u  D:macaan`
- Confirmed mechanical non-adjacent duplicate: D:waa (copula particle) and D:macaan (adjective) split by C:aad u. Parallel Somali state-predication cell #87 groups 'waa aad u' into a single C and keeps one D (D:faa'iido badan). Fold waa into C:'waa aad u', leaving single D:macaan. Surface text and order unchanged (verified).

### #18 `so`
- **適用後:** `B:Boorsodan  A:kan  C:waa aad u  D:qaali`
- Confirmed same defect as so #5: D:waa and D:qaali split by C:aad u (non-adjacent duplicate D), identical 'This X is too ADJ' type. Apply the so #87/#5 fix: C:'waa aad u', single D:qaali. Surface text and order unchanged (verified).

### #37 `th`
- **適用後:** `A:ฉัน  B:ต้อง  E:ซื้อ  D:ของขวัญ  C:วันเกิด`
- Same A.1 fusion as lo: B:ต้องซื้อ fuses modal ต้อง with verb ซื้อ; E missing. Direct sibling th_isan gives the exact split B:ต้อง E:ซื้อ. ต้องซื้อ is written solid (no internal space), so the split is clean. Renderer confirmed surface unchanged (ฉันต้องซื้อของขวัญวันเกิด).

### #48 `th_s`
- **適用後:** `D:อยาก  C:ดู  B:หนัง  E: เรื่องนั้น`
- Verified defect. Current is A:อยาก / C|D:ดู / B:หนัง / E:' เรื่องนั้น'. อยาก = 'want to' is a desiderative/modal verb, not the subject; Thai 1sg subject is legitimately pro-dropped (B.1), so A is correctly absent. Tagging อยาก as A is wrong — D matches en D:want to, ja D:たい, th_n D:อยาก, lo D:ອຍາກ, km D:ចង់, vi D:muốn, my D. The C|D on ดู (watch) should be plain C, matching th_n C:เบิ่ง, en C:watch and all siblings. Pure re-tag, surface text (incl. leading space in E) preserved.

### #91 `ti`
- **適用後:** `A:ምርኣይ ዕምባባ ቸሪ  C:ልምዲ  B:ጃፓናዊ  D:እዩ`
- Verified: current ti labels ልምዲ (tradition) as D and copula እዩ (is) as C — swapped vs en (C:tradition, D:is) and vs ALL siblings (arc C:מָסוֹרְתָּא D:הִיא, he C:מסורת D:היא, mt C:tradizzjoni D:hija, az C:ənənəsi D:‌dir, kk C:дәстүр D:болып табылады, tk C:däbi D:‌dir). Pure label swap on the same words; surface 'ምርኣይ ዕምባባ ቸሪ ልምዲ ጃፓናዊ እዩ' unchanged.

### #81 `tr`
- **適用後:** `A:Benim  C:bugün  E:başım  D:ağrıyor`
- Verified orthography defect: display order is A:Benim first, so C:'Bugün' is mid-sentence. 'bugün' (today) is a common time adverb, not a proper noun → must be lowercase in standard Turkish orthography. Sibling uz has lowercase C:bugun. Direct parallel to the cs #19 'Rád'→'rád' mid-sentence fix applied in review #110 (confirmed in 110_closed.md). Capitalization-only change; all other text and roles preserved.

### #95 `tr`
- **適用後:** `D:Ben  A:bisikletle  B:ofise  C:giderim`
- Verified orthography defect: display order is D:Ben first, so A:'Bisikletle' is mid-sentence. 'bisiklet' (bicycle) is a common noun → 'bisikletle' (by bicycle) must be lowercase. Review #50 (50_closed.md) shows tr #95 was formerly A-initial ([A:Bisikletle]...), confirming the capital is a retained-initial artifact after reordering to D-first. Capitalization-only fix; text/roles otherwise preserved.

### #95 `uz`
- **適用後:** `D:Men  A:velosipedda  B:ofisga  C:boraman`
- Verified orthography defect: display order D:Men first, so A:'Velosipedda' is mid-sentence. 'velosiped' (bicycle) is a common noun → 'velosipedda' (by bicycle) must be lowercase in Uzbek Latin orthography. Same retained-initial-capital artifact as tr #95 (parallel reorder). Capitalization-only fix; text/roles otherwise preserved.

### #41 `vec`
- **適用後:** `A:Mi  B:adesso  E:son drio lèzer  D:un  F:libro  C:interessante`
- Confirmed: 'Adesso' capitalized at position 2 after A:Mi, not sentence-initial. Across all vec cells, non-initial capitalization is 354 lowercase vs 6 capitalized, and the 6 are id2 'Tanaka', id9 'Giapón' (both proper nouns), id89 'Wi-Fi', plus the three flagged cells (41/55/81). 'adesso' is a common adverb, not a proper noun. Pure surface case fix.

### #55 `vec`
- **適用後:** `A:Mi  D:tuti i giorni  C:bevo  E:do  F:taze de  B:cafè`
- Confirmed: 'Tuti i giorni' capitalized mid-sentence after A:Mi. The identical lemma is lowercase in vec #8 (D:'tuti i giorni') and #14 (E:'tuti i giorni'). Anomalous capitalization vs the dominant vec lowercase pattern. Pure surface case fix.

### #81 `vec`
- **適用後:** `A:Mi  C:ancuo  F:me fa mal  E:la testa`
- Confirmed: 'Ancuo' (today) capitalized at position 2 after A:Mi, not sentence-initial, and not a proper noun. Consistent with the vec lowercase-non-initial pattern. Pure surface case fix.

### #68 `vi_s`
- **適用後:** `A:Tui  C:ngồi  B:đây  D:được  E:hông`
- Verified orthographic defect: D:'được ' carries a stray trailing ASCII space. vi_s is a space-joined (non-no-space) language, so the renderer produces a DOUBLE space: 'Tui ngồi đây được  hông'. Trimming to 'được' yields the correct single-space 'Tui ngồi đây được hông'. This is a whitespace-artifact cleanup (improves surface), not a segmentation change. The reviewer's ZWNJ-convention rationale is imprecise (yo uses leading ASCII spaces, not ZWNJ) but the defect and fix are correct and safe.

### #96 `yo`
- **適用後:** `A:Jọ̀wọ́  B:yà sí ọ̀tún  C:ní  E:tó kàn  F:ìkóríta`
- Verified: current yo has E:'tó kàn' AND F:'tó kàn' — two adjacent identical segments (feedback_no_adjacent_same_segments), and the F=intersection noun is missing. en F:intersection; all siblings carry a real intersection noun in F (rw masangano, sw njia panda, xh/zu isiphambano, ig njikọ ụzọ, wo croisement bi). 'tó kàn' = 'next' (E) only. Fix keeps E:tó kàn and supplies F:ìkóríta (standard Yoruba 'crossroads/intersection', orí+ita). Justified text change restoring missing topic noun (guideline A.3); duplicate removed.

### #5 `yo`
- **適用後:** `B:Kọfí  A:yìí  D:dùn  C:púpọ̀`
- Verified: current yo A:'Kọfí yìí' fuses B:coffee (Kọfí) with A:this (yìí). en A:This / B:coffee; siblings split head noun from demonstrative (ig B:Kọfị A:a, wo B:Kafe A:bii, rw B:Ikawa A:iyi, sw B:Kahawa A:hii). Yoruba demonstrative follows the noun, so B:Kọfí + A:yìí restores B (topic noun, A.3). Surface 'Kọfí yìí' unchanged; B-before-A order matches the sibling noun→demonstrative pattern.

### #8 `yo`
- **適用後:** `A:Ìyá mi  C:sè  B:oúnjẹ alẹ́  D:ní gbogbo ọjọ́`
- Verified: current yo B:'sè oúnjẹ alẹ́' fuses main verb sè (cook, role C) with object oúnjẹ alẹ́ (dinner, B). en C:cooks / B:dinner; 8/8 siblings keep a distinct C cook-verb (rw ateka, sw anapika, ig na-esi, wo di togg, xh/zu upheka). Split C:sè + B:oúnjẹ alẹ́ restores the main verb (guideline A.1). Surface 'sè oúnjẹ alẹ́' unchanged; verb-before-object order preserved and matches siblings.

### #19 `yo`
- **適用後:** `A:Mo  D:nífẹ̀ẹ́  C:láti gbọ́  B: orin`
- Genuine object fusion. Current yo is C:'láti gbọ́ orin' (to listen to + music). Palette has B; en has B:music; all siblings keep music separate as B (rw umuziki, sw muziki, ig egwu, wo misik). Splitting C:'láti gbọ́' (listen) + B:'orin' (music) is correct per guideline A.2. NB: leading space ' orin' added so concatenated surface = 'láti gbọ́ orin' is unchanged (verified; matches yo's documented split-space convention, cf. #24/#64/#71). No adjacent same letters.

### #34 `yo`
- **適用後:** `A:Jọ̀wọ́  C:sọ̀rọ̀  B: díẹ̀díẹ̀`
- Canonical manner-adverb case (_omission_guidelines.md A.4, the #34 exemplar). Current yo fuses C-verb sọ̀rọ̀ (speak) + B-adverb díẹ̀díẹ̀ (slowly) in B. Siblings split C:speak + B:manner (rw C:vuga B:buhoro cyane / wo C:wax B:ndànk ndànk / ig C:kwuo okwu B:nwayọọ). Never previously split for yo. Leading space ' díẹ̀díẹ̀' preserves surface exactly (verified). No adjacency conflict.

### #47 `yo`
- **適用後:** `A:Olùkọ́ náà  D:ṣàlàyé  B: ìṣòro náà  C:ní kedere`
- Genuine main-verb/object fusion. Current B:'ṣàlàyé ìṣòro náà' fuses D-verb ṣàlàyé (explained) + B-object ìṣòro náà (the problem). en D:explained B:the problem; siblings keep distinct D:verb + B:object (rw D:yasobanuye B:ikibazo / sw D:alieleza B:tatizo / ig D:kọwara B:nsogbu ahụ). Not covered by #34's sweep. Leading space ' ìṣòro náà' preserves surface (verified). Order A,D,B,C — no adjacency.

### #55 `yo`
- **適用後:** `A:Mo  C:mu  B: kọfí  F:ife  E:méjì  D:ní gbogbo ọjọ́`
- Genuine verb-object fusion left unaddressed. Review #29 split only the numeral/classifier/noun (B|E|F) and review #74 only fixed the F lexeme (ìgò→ife, now live as F:ife); neither touched the B:'mu kọfí' fusion of C-verb mu (drink) + B-object kọfí (coffee). en C:drink B:coffee; siblings keep distinct drink-verb (xh C:sela / ig C:aṅụ / wo C:naan). Split C:mu B:' kọfí' (leading space preserves surface, verified). Order A,C,B,F,E,D — no adjacency.

### #57 `yo`
- **適用後:** `A:Ó  D:sọ  B: èdè mẹ́ta  C:dáradára`
- Genuine main-verb/object fusion. Current B:'sọ èdè mẹ́ta' fuses D-verb sọ (speaks) + B-object èdè mẹ́ta (three languages). en D:speaks B:three languages; siblings keep distinct D:speak-verb (rw D:avuga / sw D:anazungumza / ig D:na-asụ / wo D:wax). Leading space ' èdè mẹ́ta' preserves surface (verified). Order A,D,B,C — no adjacency.

### #85 `yo`
- **適用後:** `A:O  D:yẹ kí o  C: mu  B: omi  E:sí i`
- Genuine modal+verb+object over-fusion. Current D:'yẹ kí o mu omi' bundles modal (yẹ kí o = should), verb (mu = drink) and object (omi = water). Review #40 item 14 flagged this exact defect but DEFERRED it (never applied; still fused in live data). Siblings split modal+verb+object (ig D:kwesịrị C:ịṅụ B:mmiri / wo D:war nga C:naan B:ndox / xh D:kufuneka C:usele B:amanzi). This proposal keeps 'o' inside D (so no text dropped) and adds leading spaces ' mu'/' omi' — concatenated surface unchanged (verified), unlike #40's text-dropping variant. Order A,D,C,B,E — no adjacency.

### #28 `zh_han`
- **適用後:** `B:汝  A:能  C:薦  F:善  E:食肆  G:乎`
- Confirmed non-adjacent duplicate A. Current zh_han has both A:能 (modal) and a final A:乎 (Q-particle) — two non-adjacent A segments violating single-letter-single-referent. The final question particle is placed in G by 6 siblings (nan G:無, wuu G:伐, yue G:呀, zh G:吗, zh_db G:不, zh_song G:乎). Relabel the last A:乎 -> G:乎. Text unchanged; cross-sibling consistency + no-duplicate-letter.

### #40 `zh_han`
- **適用後:** `A:汝  E:知  B:郵驛  D:在  C:何處  G:乎`
- Confirmed non-adjacent duplicate E. Current zh_han has E:知 (matrix verb) and a final E:乎 (Q-particle). The en double-E (Do...know) is the split auxiliary+verb, not the particle. Siblings nan/wuu/zh/zh_db/zh_sc place the final Q-particle in G. Relabel the last E:乎 -> G:乎. Text unchanged; resolves duplicate-E + matches sibling majority.

### #28 `zh_sc`
- **適用後:** `B:你  A:能不能  C:推荐  F:一个好  E:馆子`
- Confirmed mislabeled modal. Current zh_sc tags the ability modal 能不能 (A-not-A 'could') as D, but the modal role is A across all 7 siblings (nan A:會當, yue A:可以, zh/zh_db/zh_han A:能, zh_song A:可否) and en A:Could. Relabel D:能不能 -> A:能不能. The A-not-A form legitimately drops the final Q-particle (omission B.6) and the en article 'a'=D is legitimately absent in articleless zh (B.2). Text unchanged; cross-sibling consistency.

### #40 `zh_song`
- **適用後:** `A:你  E:可知  B:郵驛  D:在  C:哪裏  G:麼`
- Confirmed non-adjacent duplicate E. Current zh_song has E:可知 (verb) and a final E:麼 (Q-particle). Sibling majority (nan/wuu/zh/zh_db/zh_sc) uses G for the final Q-particle. Relabel E:麼 -> G:麼. Text unchanged; resolves duplicate-E + cross-sibling consistency.

### #24 `zh_song`
- **適用後:** `A:請  D:與  B:我  E:看  C:菜單`
- Confirmed non-adjacent duplicate D. Current zh_song has D:與 (give-verb) and D:看 (look-verb) — two D segments. Siblings nan/wuu/yue/zh/zh_db/zh_sc all mark the secondary look-verb (看/看看/睇下/看哈/瞅瞅) as E. Relabel the second D:看 -> E:看. Text unchanged; resolves duplicate-D + cross-sibling consistency.

### #64 `zh_song`
- **適用後:** `A:我  D:得  B:把那傳話器  C:充上`
- Verified defect: current zh_song has non-adjacent duplicate C (C:把 ... C:充上 with B:那傳話器 between). 把 is a disposal coverb introducing the object; folding it into the object NP gives B:把那傳話器, matching the sibling B-fusion convention (zh B:给我的手机 folds 给; zh_db/zh_sc B:给手机) and en roles (C:charge=充上, B:my phone). Removes the duplicate C. Renderer (zh_song is no-space) confirmed surface unchanged: 我得把那傳話器充上.

---

## B. 適用（owner確認後 — 蓋然 24 + 要検討 1 = 25件）

ポリシー判断で owner が①〜④の全ポリシーを承認したため適用。

### #69 `ko` [蓋然]
- **適用後:** `A:걔는  C:부모님  H:‌에게  G:긴  B:편지를  D|E:썼다`
- Confirmed chunking outlier. ko alone splits D:썼 E:‌다 (the E carries a leading ZWNJ boundary marker). The past tense -았/었- is already fused inside 썼; the stranded 다 is merely the declarative ending, not the separable past morpheme that ja's E:た represents. All 3 Korean siblings use a single composite D|E (ko_bus 썼다, ko_em 쓰니라, ko_jeju 썻주), matching en's composite D|E:wrote. Merge to D|E:썼다 — the boundary ZWNJ is dropped as a segmentation artifact so the rendered Korean word 썼다 is unchanged. Segment-only fix. 蓋然 because the original stem+ending split is defensible, but sibling+reference majority favors the merge.

### #35 `ko_mid` [蓋然]
- **適用後:** `A:내  E:오라비ᄂᆞᆫ  C:디난  D:ᄃᆞᆯ에  B:혼인ᄒᆞ니라`
- Confirmed fused time chunk. ko_mid currently has C:디난 ᄃᆞᆯ에, fusing the time modifier 'last' (디난=C) with the time noun+locative 'month' (ᄃᆞᆯ에=D); palette defines D but the cell lacks it. Reference and modern siblings all split: en C:last/D:month, ja C:先/D:月, ko_kp C:지난/D:달에, ko_yb C:지난/D:달에. Split at the existing word boundary to C:디난 D:ᄃᆞᆯ에. Surface (the two MK words) preserved; segment-split matching reference. 蓋然 per the minor caveat that MK 지난달 could be one NP, but reference+sibling majority split it.

### #68 `zh_han` [蓋然]
- **適用後:** `A:吾  D:可  C:坐  B:此  G:乎`
- Verified: palette #68 has both E and G. zh_han uses E:乎 for the final Q-particle while all 6 Sinitic siblings (nan/wuu/yue/zh/zh_db/zh_sc) use G. Relabel E->乎 to G:乎 for cross_sibling_role_consistency (active applied policy). ja uses E:か but is a different family. No duplicate role created (E simply becomes unused, as in the siblings). Surface unchanged (吾可坐此乎); not a _policy_deferred item. 蓋然 retained per reviewer due to ja-E divergence.

### #68 `zh_song` [蓋然]
- **適用後:** `A:我  D:可以  C:坐  B:這裏  G:麼`
- Parallel to zh_han #68: final Q-particle 麼 is tagged E while 6 Sinitic siblings use G. Relabel E:麼 -> G:麼 for cross-sibling consistency. Surface unchanged (我可以坐這裏麼). No duplicate role; not policy-deferred. 蓋然 (ja uses E here).

### #84 `zh_db` [蓋然]
- **適用後:** `A:她  E:上  D:礼拜  B:感冒  C:了  F:呗`
- Verified: zh_db fuses the cold-noun into C:感冒了, dropping B. The dataset's established family convention tags the noun (感冒/傷風) as B and the aspect particle as C across 5 noun+aspect siblings (zh B:感冒 C:了; zh_sc B:感冒 C:嘞; yue B:傷風 C:咗; wuu B:伤风 C:了; nan B:傷風 C:去) and en (C:caught B:a cold). zh_db is the outlier; splitting B:感冒 C:了 restores the B role consistently. F:呗 unaffected. Renderer confirmed surface unchanged (她上礼拜感冒了呗). Register caveat (感冒了 verbal in NE Mandarin) noted but the boundary move keeps the natural surface; 蓋然.

### #34 `th_n` [蓋然]
- **適用後:** `A:กะลุนา  C:อู้  D:จ๊ะๆ  B:หน่อย`
- Verified structural defect. Actual current is A:กะลุนา / C:อู้ / B:จ๊ะๆ หน่อย — the manner adverb is fused into B (not the state shown in the finding's segments field, which is the proposed result). en has B:more D:slowly; th_s has B:หน่อย D:ช้าๆ; ja has D:ゆっくり. หน่อย = 'a bit/more' (=B, matches th_s B:หน่อย); จ๊ะๆ is the residual manner element (=D:slowly). Splitting B:จ๊ะๆ หน่อย into D:จ๊ะๆ + B:หน่อย is exactly the #34 ja_hak / _omission_guidelines A.4 precedent. Surface text and linear order preserved (concat reproduces 'จ๊ะๆ หน่อย'). Confidence held at 蓋然: web search confirmed Kham Mueang's slow-speech association but did not externally verify the lexeme จ๊ะๆ = ช้าๆ 'slowly'; structural evidence is strong but the gloss rests on the reviewer.

### #61 `jv` [蓋然]
- **適用後:** `A:Dia  B:selalu  C:terlambat  E:teka  D:menyang rapat`
- Verified defect. Current is A:Dia / B:selalu / C:terlambat / D:teka menyang rapat — main verb 'teka' (arrives) fused with 'menyang rapat', core verb unsegmented (A.1). Parallel to ms's E:datang split; E exists in palette, unused. Resegment D:teka menyang rapat → E:teka + D:menyang rapat. Concatenation 'Dia selalu terlambat teka menyang rapat' unchanged. (The Indonesian-bleed lexis Dia/selalu is a separate translation-quality matter, correctly not touched here.) Held at 蓋然 per reviewer.

### #32 `haw` [蓋然]
- **適用後:** `E:Makemake  A:au  C:e ʻai  B:i ka sushi  D:no ka ʻaina awakea`
- Verified defect. Current is E:Makemake / A:au / E:e ʻai i ka sushi / D:no ka ʻaina awakea — non-adjacent duplicate E, with the main verb 'e ʻai' (eat, C) and object 'i ka sushi' (sushi, B) both buried in the second E (A.1/A.2). The first E:Makemake is the matrix 'want to' (en E:want to). C and B exist in the palette and are unused in haw. Resegment E:e ʻai i ka sushi → C:e ʻai + B:i ka sushi; this removes the dup-E and matches the cross-sibling C:eat+B:sushi split. Concatenation 'Makemake au e ʻai i ka sushi no ka ʻaina awakea' unchanged.

### #32 `mi` [蓋然]
- **適用後:** `E:E hiahia ana  A:ahau  C:ki te kai  B:tūhī  D:mō te kai o te awatea`
- Verified defect, identical pattern to haw. Current is E:E hiahia ana / A:ahau / E:ki te kai tūhī / D:mō te kai o te awatea — non-adjacent dup-E hiding verb 'ki te kai' (eat, C) and object 'tūhī' (sushi, B). Resegment E:ki te kai tūhī → C:ki te kai + B:tūhī. Concatenation 'E hiahia ana ahau ki te kai tūhī mō te kai o te awatea' unchanged.

### #85 `mi` [蓋然]
- **適用後:** `D:Me  C:inu  A:koe  B:he wai  E:anō`
- Verified defect. Current is C:Me inu / A:koe / B:he wai / E:anō — the preverbal modal 'me' (should/ought, en D:should) is fused with the verb 'inu' (drink, C), so the modal role (A.5) is unsurfaced. Web-confirmed: Māori 'me' is a separable preverbal modal particle = 'should/must/ought' ('Me kai koe' = 'You should eat'). Siblings haw D:Pono, sm D:E tatau, id D:seharusnya carry the modal as D; D exists in the palette and is unused in mi. Split C:Me inu → D:Me + C:inu. Concatenation 'Me inu koe he wai anō' unchanged.

### #34 `fr_af` [蓋然]
- **適用後:** `A:S'il te plaît  C:parle  B:plus  D:doucement`
- Genuine missing comparative (_omission_guidelines A.10) plus mislabeled manner adverb. en is C:speak B:more D:slowly; all 6 living siblings (fr/fr_be/fr_ch/fr_qc B:plus, pt_br/pt_eu B:mais, ht B:pi) keep the comparative 'more' + D:manner-adverb. fr_af alone drops 'plus' and tags the manner adverb as B. Fix preserves fr_af's lexical 'doucement' and reads as natural French 'parle plus doucement' (= speak more softly/slowly). Text change (re-insert 'plus') is warranted; reviewer 蓋然 honored.

### #99 `rm` [蓋然]
- **適用後:** `C:Quant  D:costa  A:quest  B:souvenir`
- Agreement/form error. 'Quantas' is the feminine-plural interrogative quantifier, but the head noun 'quest souvenir' is masculine singular and the verb 'costa' is 3sg — fem-pl mismatches everything in the cell. Every sibling uses a masc/invariable price-question form (it/nap Quanto, ro Cât, sc Cantu, fr_qc Combien). The Romance quant/quanta/quants/quantas paradigm exists in Romansh; the agreeing masc-sg form is 'Quant' (cf. standard 'Quant custa...?'). Reviewer 蓋30 honored given Sursilvan vs RG dialect room, but the current fem-pl form is unambiguously a concord outlier. Only the interrogative changes.

### #85 `tpi` [蓋然]
- **適用後:** `A:Yu  D:mas  C:dring  E:planti  B:wara`
- Confirmed: tpi #85 has a duplicate non-adjacent E (E:planti ... E:moa) = redundant double quantifier 'plenty...more'. en uses E:more once; ja もっと once; all three siblings use a single quantifier (hwc E:mo, jam E:moa, pcm E:more). 'Yu mas dring planti wara' is grammatically complete idiomatic Tok Pisin and matches the sibling pattern. This is a surface-text deletion (not pure re-segmentation), but the deletion is well-justified by en/ja and 3/3 siblings, and removes a genuine double-quantifier redundancy plus a single-letter-single-referent violation. Kept at 蓋然 because it is a text change rather than a re-segmentation.

### #34 `en_sg` [蓋然]
- **適用後:** `A:Can  C:talk  D:slower  B:a bit can`
- Confirmed: en_sg #34 B:'slower a bit can' fuses manner adverb 'slower' (core role A.4) with degree 'a bit' and request particle 'can'. Palette has D available. 7/7 substantive siblings split degree (B) + manner (D): en_au (B:'a bit'/D:slower), en_ck (B:"a bi'"/D:slower), en_app & en_south (B:'a little'/D:slower), en B:more/D:slowly, en_in B:more/D:slowly, en_sco B:mair/D:slowly. Surface-order split D:slower then B:'a bit can' preserves text 'slower a bit can' (verified identical). Leaving the trailing request-particle 'can' in B is the minimal-risk option. Marked 蓋然 because the optional further split of 'can' is owner judgment, but the D:slower manner restoration is solidly evidence-backed.

### #40 `pl` [蓋然]
- **適用後:** `E:Czy wie  A:pan/pani  C:gdzie  D:jest  B:poczta`
- Confirmed cross-sibling role-label outlier. en uses E for the know-verb and D for 'is'. All four Slavic siblings obey: ru E:знаете/D:находится, uk E:знаєте/D:знаходиться, cs E:Víte/D:je, be E:Ці ведаеце/D:знаходзіцца (sk E:Viete/D:je). pl uniquely puts know-verb 'wie' under F, copula 'jest' under E, and Q-particle 'Czy' under D. Fix fuses Czy+wie into E (mirroring be's 'Ці ведаеце' which fuses the yes/no particle into the know-verb) and restores D:jest. Surface order/text identical ('Czy wie pan/pani gdzie jest poczta'); pure relabel+regroup. Not on the #79-A Q-particle deferred list (pl already had Czy split; this is role labeling, not a split decision). Owner-style territory hence 蓋然.

### #89 `bg` [蓋然]
- **適用後:** `C:Не  B:мога  D:да намеря  G:паролата  F:за Wi-Fi`
- Confirmed grammatical defect. Bulgarian has no infinitive; the modal 'мога' (can) requires 'да' + present-tense verb. Current 'не мога намеря' is ungrammatical — it must be 'да намеря'. bg's own pattern confirms: #10 C:да говорите (можете ли + да), #9 C:да отида (искам + да). ru/uk siblings use bare infinitive (найти/знайти) only because they have infinitives; bg lacks them, so 'да+present' is the sole grammatical option — not a B-omission. Adding 'да' is a meaning-bearing obligatory grammatical element (text change acknowledged). Verb form намеря (perfective present 1sg) is correct.

### #96 `cu` [要検討]
- **適用後:** `A:Молѫ  B:обратите сѧ на десно  C:на  E:приходѧщемъ  F:распѫтии`
- Confirmed orthography outlier: 'обратитесѧ' is written joined, but cu spaces the reflexive 'сѧ' from its verb in ALL 15 other reflexive cells (#6 оучѫ сѧ, #15 оучитъ сѧ, #35 жени сѧ, #76 радоуѭ сѧ, #77 оудиви сѧ, #93 творѧтъ сѧ, etc.); #96 is the sole exception. Re-space to 'обратите сѧ' for internal consistency — within-segment orthography only, no role/structure change. This is a minor text change (adds one space, no character altered) in a low-resource liturgical language; reviewer's own 要検討 confidence is appropriate given OCS enclitic spacing is manuscript-variable, but the dataset's established convention is spaced.

### #76 `bn` [蓋然]
- **適用後:** `A:গান  B:শুনলে  E:আমার  D:খুশি লাগে`
- Confirmed grammatical defect: 'খুশি লাগে' is an impersonal dative-experiencer construction governing genitive/dative আমার ('to me'), not nominative আমি ('I'). Current 'আমি খুশি লাগে' is ungrammatical standard Bengali ('I happiness-feels'). Sibling as uses oblique E:মোৰ for the exact slot. Only the E-segment text changes (আমি→আমার); this is a real grammar correction, not segmentation-only. Honest 蓋然: en/or keep a nominative subject and the E-role canonically encodes that subject, so an experiencer-case philosophy is defensible, but Bengali grammar strongly requires the oblique.

### #99 `so` [蓋然]
- **適用後:** `C:Immisa  D:ayay  A|B:xusuustani tahay`
- Confirmed: D:ayay (focus particle) and D:tahay (copula) are a non-adjacent duplicate D split by A:xusuustani. Parallel question cell so #4 keeps the focus particle as the single D (ayuu) and folds the trailing copula (yahay) into the predicate-bearing phrase (A:'ugu dhow yahay'). Mirroring #4: keep D:ayay, fold tahay into the subject phrase, and recover B — 'xusuustani' = xusuus(souvenir)+ -ta(art)+ -ni(this) carries A(this)+B(souvenir), so relabel A|B (en has A:this B:souvenir, otherwise uncredited). Surface text and order unchanged (verified). Honest 蓋然: Somali ayaa...tahay focus-copula role assignment is debatable.

### #67 `tg` [蓋然]
- **適用後:** `A:Ман  B:дар толори варзиш  E:ҳафтае  C:се маротиба  D:варзиш мекунам`
- Confirmed: C fuses two distinct frequency roles 'ҳафтае се маротиба' (a week / three times). en splits C:three times / E:a week, and all 8 siblings split (so C:saddex jeer/E:toddobaadkii, om E:torban keessatti/C:sadii, am E:በሳምንት/C:ሦስት ጊዜ, ha C:sau uku/E:a mako, cop C/E). Palette already has E. Split E:ҳафтае (preceding) and C:се маротиба, preserving Tajik surface order. Surface text unchanged (verified). Honest 蓋然 per reviewer.

### #64 `tk` [蓋然]
- **適用後:** `A:Men  B:telefonymy  C:zarýad ber  D:‌meli`
- Verified: current tk #64 is C:'zarýad bermeli' (necessitative -meli fused, no D). en D:need to; siblings split modal into D (az C:şarj D:etməliyəm, kk C:зарядтау D:керек, ky C:кубаттоом D:керek). tk's own established convention splits -maly/-meli as a ZWNJ(U+200C)-prefixed D-segment: #54 C:gora D:‌meli, #85 C:iç D:‌meli, #39 D:tur E:‌maly. Proposed D segment uses the identical U+200C+meli form. Visible surface 'zarýad bermeli' preserved; only the glue-marker boundary added, matching dataset convention. Reviewer-rated 蓋然; consistency-driven.

### #2 `arc` [蓋然]
- **適用後:** `C:הוּא  A|B:שְׁמִי  D:טַנַקַא`
- Verified: arc שְׁמִי = שם 'name' + enclitic -י 'my' (A+B fused). Current arc labels it B only, dropping the A=My role (a core element). Closest sibling he (same Northwest-Semitic morphology, same Hebrew script) labels the identical form A|B:שמי, as do yo/ha/ig in #2. arc's bare-B is inconsistent with both family conventions. Relabel B→A|B restores A-role visibility; surface 'הוּא שְׁמִי טַנַקַא' unchanged and existing C/B/D order preserved (placed A|B in the original B slot, no reorder). Enclitic possessive is a legit B.8 omission but the compound label keeps the A role surfaced, matching he. Reviewer-rated 蓋然.

### #13 `ig` [蓋然]
- **適用後:** `A:Biko  D:nye  B:m  F:iko  C:mmiri`
- Real redundancy: F:'iko mmiri' (cup + water) already contains mmiri, which then repeats in C:mmiri — water duplicated. Confirmed iko = cup/glass (Igbo dict). Siblings keep F as bare container (rw igikombe cy' / sn girazi re / sw glasi ya / wo galaas bu) and C as water. Reducing F to 'iko' removes the duplicate and aligns the role pattern (en F:a glass of, C:water). allowTextChange. Kept 蓋然 because 'iko mmiri' can also read as the fixed collocation 'a glass of water', but the C:mmiri repetition makes the reduction the cleaner reading. No adjacency.

### #13 `sq` [蓋然]
- **適用後:** `A:Ju lutem  B:më  D:jepni  F:një gotë  C:ujë`
- Real missing core role + mislabel. Current sq tags the indefinite article 'një' (which belongs to F 'a glass') as B and omits the recipient 'me' entirely. en B:me (indirect object, core role A); every sibling supplies it (et mulle, fi minulle, hu nekem, hy ինձ, el μου, eu niri). Restore B:'më' as proclitic before the verb — exactly mirroring live sq #24 [B:më, D:tregoni] — and merge the article into F:'një gotë'. Natural Albanian = 'Ju lutem më jepni një gotë ujë' (verified). allowTextChange (adds 'më'); order A,B,D,F,C, no adjacency. 蓋然 because it is a surface-text change rather than pure re-segmentation, though strongly supported by all siblings and the sq-internal #24 precedent.

### #93 `chr` [蓋然]
- **適用後:** `B:ᎯᎠ  C:ᎦᏙᎯ  D:ᎪᎯᏍᏗ  E:ᎤᏂᎪᎯ  F:ᏗᎾᏙᎵᏍᏗ  G:ᏓᎾᎵᏍᎬᏗ`
- Verified cross-sibling role inconsistency. Corpus survey of all 10 chr cells containing the demonstrative ᎯᎠ shows chr places it in the SAME role-letter as en's 'this' in every case (#5 A/A, #18 A/A, #43 D/D, #45 F/F, #78 A/A, #87 A/A, #98 D/D, #99 A/A) — #93 is the sole outlier (chr A vs en B:'this'; nci also B:inīn). The locative en A:'In' is a legitimate Cherokee omission (location encoded on the verb), so no A-content is lost. Relabel A:ᎯᎠ→B:ᎯᎠ; surface text unchanged (feedback_no_text_change_on_segment_fix). All other segments identical to current.

---

## C. 却下（39件 — 現データ正しい/提案誤り/正当な省略/保留ポリシー該当）

- **#71 `ja_kyo`** [要検討] — Reject. The proposed C:上達 D:させたいどすなぁ is a VOICE-STRATEGY rewrite (intransitive なる -> transitive causative させる) plus removal of もっと, and it CHANGES the surface translation of a natural Kyoto-ben rendering. This is precisely the kind of natural-form/voice canonicalization that _pol
- **#84 `ja_aom`** [要検討] — Reject. あいづァ is a GENUINE Tsugaru は->ぁ contraction (あいつぁ), which the reviewer explicitly acknowledges as authentic Tsugaru-ben. Normalizing to あいづは would erase a legitimate dialect-rendering and CHANGE surface text. The 'irregular full+small kana づ+ァ' objection is weak orthograph
- **#30 `ko_bus`** [要検討] — Reject. The proposed C:칠 E:수 있다 CHANGES surface text (친다 -> 칠 수 있다), so this is a translation rewrite, not a re-segment, and falls outside feedback_no_text_change_on_segment_fix. 친다 is a natural Gyeongsang plain-present rendering; the reviewer downgraded to 蓋然 and explicitly conc
- **#21 `zh_han`** [要検討] — Defect (non-adjacent duplicate E: 將 future + 食 verb with C:與友 between) is real, but the reviewer explicitly grades it 要検討 and states 'no safe mechanical fix' (would require reordering or a spare role-letter in Classical word order). No determinate fix proposed; owner judgment. De
- **#45 `zh_song`** [要検討] — Non-adjacent duplicate E (circumposition 在…裏) is real but reviewer grades 要検討 and explicitly states 'No mechanical fix applied' — owner must decide keep-circumposition vs merge 裏 into A. No determinate text-preserving fix. Defer.
- **#34 `lo`** [確実] — The A.4 manner-adverb fusion is linguistically real, BUT the proposed split D:ຊ້າໆ B:ຫນ່ອຍ is NOT surface-preserving as claimed. lo is in NO_SPACE_LANGS; buildFullText joins split segments with no space, so the current literal space (render: ...ພູດຊ້າໆ ຫນ່ອຍ) would be DELETED, pr
- **#34 `th_isan`** [確実] — Same as lo #34: th_isan is no-space; proposed split D:ซ้าๆ B:หน่อย (no leading space) would delete the current literal space (render goes from ...เว้าซ้าๆ หน่อย to ...ซ้าๆหน่อย), a surface change despite the 'surface preserved' claim. A.4 motivation is sound but the proposed segm
- **#13 `th`** [蓋然] — th is in NO_SPACE_LANGS. Current F:'น้ำ หนึ่งแก้ว' renders with a literal space (...ให้น้ำ หนึ่งแก้วฉัน). The proposed split C:น้ำ F:หนึ่งแก้ว (no leading space) would render ...น้ำหนึ่งแก้ว..., DELETING that space — a surface change, contradicting the 'surface preserved' claim. 
- **#13 `th_isan`** [蓋然] — Same as th #13: th_isan is no-space; proposed C:น้ำ F:แก้วนึ่ง would delete the current literal space (render goes from ...ให้น้ำ แก้วนึ่งข้อย to ...น้ำแก้วนึ่ง...), a surface change. Same deferred #31 item 18, unresolved space-processing policy. Reject as proposed.
- **#39 `vi_nom`** [蓋然] — The structural split D:𥄬 B:𤏬 would be surface-preserving (no internal space; 碎沛𥄬𤏬𠓨𣈜埋 unchanged). However the reviewer explicitly flags that the Nôm character 𥄬 (U+2512C) is used elsewhere in this very dataset (#73 vi_nom D:𥄬 = vi ngủ 'sleep') for the OPPOSITE meaning of t
- **#43 `th_isan`** [要検討] — Reviewer grades 要検討 and presents two options (keep documented prep-drop as E:ฮ้าน vs supply A:ที่), explicitly leaving it to owner judgment. The A|E composite is surface-neutral (text ฮ้าน unchanged either way), but no single determinate fix is asserted, and th_n already drops A 
- **#84 `fj`** [確実] — The hard defect is real and confirmed: B:na syõro contains 'õ', and #84 is the ONLY fj cell in the entire dataset with a tilde/circumflex (Standard Fijian uses plain a-e-i-o-u). However the PROPOSED correction is not verifiable. The reviewer's own confidence is 要検討 and they expli
- **#22 `sm`** [確実] — Reject: the proposed segments are defective on two counts the reviewer themselves flagged (蓋730/蓋然, 'owner may prefer leaving the NP intact'). (1) The proposed array [...C:gagana, F:se, F:fou] concatenates to 'gagana se fou', changing the surface text from the current 'se gagana 
- **#41 `ca`** [蓋然] — Cross-sibling consistency flag, not a hard defect. The reviewer self-rates it 蓋然 and explicitly says Catalan adj-after-noun NP fusion is 'a defensible owner choice, not a hard error'. Critically, review #49 examined #41 and ruled the whole indefinite-article / NP-internal split q
- **#42 `lad`** [蓋然] — The non-adjacent duplicate E (E:un ... E:vestido with D:kolorado between) is technically present, but the proposed remedy reorders the surface text ('un kolorado vestido' → 'un vestido kolorado'), which the reviewer admits is 'register/orthography-debatable' (蓋30). This contradic
- **#25 `oc`** [蓋然] — Although surfacing C:una is text-preserving and aligns with en (C:a) and most siblings, this is exactly the indefinite-article split-vs-fuse question that review #49 explicitly flagged as an unsettled grand-convention matter ('数百セル規模...closed-review で裁定推奨'), covering Romance/Germ
- **#12 `oc`** [要検討] — Reviewer-marked 要検討 and explicitly 'dialect/register dependent, hence owner judgment'. Wiktionary confirms 'polit/polida' = pretty (fem pl 'polidas') and that '-òt' is a legitimate productive Occitan diminutive/affective suffix. 'polidòtas' = 'rather/cutely pretty' is a real, gra
- **#18 `pt_br`** [要検討] — Owner-judgment / policy item, and against a prior accepted state. The reviewer self-rates it 要検討 and explicitly 'flagged for owner judgment on whether role tracks function vs. linear position' — a cross-sibling role-consistency policy question. Moreover review #55 examined pt_br 
- **#21 `de`** [蓋然] — DIRECT CONFLICT with a deliberate prior hand-made fix. Review #55 examined de #21 (then '[E:esse][B:heute Abend][C:mit Freunden][D:zu Abend]'), explicitly considered BOTH inserting [D:Abendessen] AND deleting the dinner element, and chose to DELETE 'zu Abend', settling on the nat
- **#1 `got`** [確実] — Facts verified (90 got cells in Gothic script U+10330–U+1034F, 10 in Latin transliteration: exactly ids 1,9,13,17,28,89,93,94,96,98). But this finding is explicitly NOT actionable as a single-cell edit: the reviewer states segments are left UNCHANGED on purpose, marks it 要検討, dec
- **#66 `non`** [確実] — The two non-adjacent C segments (C:er ... C:hulið around A:fjallit) are genuine Old Norse V2 syntax, but the proposed fix is malformed: its segments array is [B:'Af snjó'][C:'er fjallit hulið'][A:'fjallit'], which puts 'fjallit' inside the merged C AND keeps A:'fjallit', producin
- **#42 `nn`** [確実] — The proposed fix [A:Ho][B:alltid][C:'har på seg'][D:'ei raud'][E:kjole] reorders the surface to 'Ho alltid har på seg...' which differs from the current 'Ho har alltid på seg...' and is ungrammatical Nynorsk (V2 requires the finite verb 'har' in second position, before the adverb
- **#90 `en_au`** [蓋然] — The current surface 'learned himself programming' is a genuine nonstandard Australian/colloquial reflexive ditransitive ('learn someone something' = teach), consistent with the heavy dialectal coloring of the other variants (en_app 'all by hisself', en_yk 'by 'is sen', en_south '
- **#5 `lt`** [確実] — The 'non-adjacent duplicate D' (D:yra ... C:labai ... D:skani) is NOT a defect: review #53 issue 14 explicitly ruled this pattern legitimate — feedback_no_adjacent_same_segments bans only ADJACENT same-letter, and here C separates the two D's, so it is non-adjacent and legal ('C 
- **#5 `lv`** [確実] — Same as lt #5: the non-adjacent D-twice pattern (D:ir/C:ļoti/D:garšīga) was declared legitimate by review #53 issue 14 (non-adjacent, so not a feedback_no_adjacent_same_segments violation). lv #5 correctly mirrors the en/de/fr/it master. The #87 C-fusion the finding cites as cano
- **#18 `lt`** [確実] — Same construction as #5 lt. Non-adjacent D-twice (D:yra/C:per/D:brangi) is legitimate per review #53 issue 14; lt #18 mirrors the en master (D:is/C:too/D:expensive). Not a no-adjacent violation (C separates the D's). The #87 C-fusion cited as the model is the documented outlier. 
- **#18 `lv`** [確実] — Same as lt #18: non-adjacent D-twice (D:ir/C:pārāk/D:dārga) is legitimate per review #53 issue 14, mirroring the en master. Not a feedback_no_adjacent_same_segments violation. Rejecting to preserve en-aligned state.
- **#89 `fa`** [要検討] — Reject. Reviewer self-flagged 要検討 and noted the را re-attachment 'is debatable and may be deliberate authorial chunking'. The proposal couples two surface-changing edits: moving را onto the object (F:Wi-Fi را) and unifying نمی توانم→نمی‌توانم (space→ZWNJ). While the unified negat
- **#24 `am`** [要検討] — Reject as policy-deferred. The finding explicitly conditions itself on policy item #84-C ('apply only if that policy is adopted'). #84-C (bound-pronoun B|C composite to surface bound subject/object morphology) is still listed in _policy_deferred.md with Status 'policy decision ne
- **#99 `ar_tn`** [確実] — The proposed fix rewrites the surface ('بقدّاش هالسوفنير هاذا' → 'بقدّاش هاذا السوفنير'), changing both word order and text — not a pure relabel. The premise that 'a demonstrative cannot be doubled' is wrong for Maghrebi: proclitic هاـ + noun + postposed هاذا is a legitimate Tuni
- **#43 `az`** [蓋然] — Reviewer self-rated 要検討 and explicitly states this is 'an owner-policy consistency call rather than a hard error': az written standard keeps genitive case morphology fused (restoranın). The kk/ky/tk ZWNJ A-segment split is one family convention, but az legitimately differs — this
- **#10 `mnc`** [確実] — The finding correctly identifies that mnc #10 is a wrong translation (currently 'I have read this book', missing 'you/English/speak/can'), but it is self-flagged 要検討 and explicitly says: 'Flagged for Manchu native-speaker confirmation of the exact form for English before applying
- **#42 `yo`** [確実] — Already deliberately KEEP'd, twice, in review #29 (round-12 worker + round-13 reviewer Dr. Okeke-Wambui, both 'KEEP 妥当'). Yoruba expresses habitual 'always' as a double construction: preverbal habitual marker 'máa ń' + emphatic adverb 'nígbà gbogbo', both tagged B. The exact prop
- **#61 `yo`** [確実] — Same as #42: explicitly KEEP'd in review #29 (round-12 + round-13, both 'KEEP 妥当', '#42 と同一構造'). The double 'always' (preverbal habitual máa ń + emphatic adverb nígbà gbogbo) is the documented Yoruba construction, both halves B. Fusing máa ń into E:dé was the considered-and-rejec
- **#55 `sw`** [確実] — The F:vikombe…F:vya structure is a deliberate design, not a defect. Review #29 created it (round-4) and explicitly re-affirmed it (round-13, 'KEEP 妥当'): Swahili 'vikombe … vya' = the discontinuous analytic measure phrase 'cups … of', both halves tagged F (container/measure) brack
- **#22 `yo`** [確実] — Proposed segments are linguistically wrong and self-contradictory. Yoruba order is èdè(language) tuntun(new) kan(a). The finding's own text says to put 'new' (tuntun) in F, but its segments array is C:'èdè tuntun' (language+new still fused) + F:'kan' (mislabels the article 'a' as
- **#35 `sq`** [要検討] — Policy-deferred, not actionable. The reviewer themselves marked this 要検討 and explicitly 'left unchanged pending policy', drawing a direct parallel to the deferred Celtic VSO double-letter exception (_policy_deferred.md #82-C, recommendation B: document as permitted exception, do 
- **#95 `qu`** [要検討] — Reject (do not auto-apply; owner review). The casing observation is linguistically plausible — Bicicletapi is a mid-sentence common-noun loanword (D:Ñuqam leads) and siblings lowercase it (myn A:'ich bicicleta', gn A:'bicicleta-pe'). BUT this cell was hand-curated in closed revie
- **#34 `tlh`** [要検討] — Reject. (1) Cross-sibling convention contradicts the fix: across this sentence, languages with only a SINGLE manner word fold it into B, not D (pl B:wolniej, fi B:hitaammin, uk B:повільніше, cy B:yn arafach, hit B:manninkuwandaš, akk B:arḫiš lā, sux B:búr-búr-re, ine B:*ml̥dú-ter

---

*Rally #111 — 2026-06-17. data.js: 開発者承認103件すべて適用済み（確実78 + owner確認25）。却下39件。*
