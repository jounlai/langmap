# Wordmap review #427 — 最近追加した5語（star, i, you, name, two）の敵対的レビューラリー

## 目的

直近に追加した WordMap の中核語のうち、専用の敵対的ラリーを経ていない
**star（星）・i（1人称単数）・you（2人称単数）・name（名前）・two（数詞2）**
の5語を、全 **1138 言語**にわたって監査した。

（実験的語彙 cuckoo/woof/computer/sushi/dopamine は 2026-07-11〜07-19 に
既に複数ラウンドの専用レビュー済みのため対象外。）

## ラリー

Workflow による多エージェント構成（review #426 と同方式）:

1. 全1138言語を語族マクロで **20 シート**（最大70行）に分割
   （IndoEuropean_Misc, SinoTibetan, Austronesian, AfroAsiatic, NEAsia,
   SSEAsia, EurasiaOther, Africa, Americas, PapuaAustralia を人数で分割）。
2. **レビュー**（20エージェント並列）: 各シートの5語セルを監査。概念不一致・
   誤script/誤字・非主流語の混入・IPA/声調の誤りのみを指摘。方言音韻・単音節の
   強勢記号・再構形・zh簡繁の別などは house style として除外。
3. **敵対的 verify パス**: 各指摘を独立エージェントが懐疑的に再検証
   （既定 REJECT、確信がある場合のみ CONFIRMED）。

計 33 エージェント / 約 1.02M トークン。

## 結果

- 候補指摘: **13 件** → 敵対的検証で **11 件 CONFIRMED**（2件 REJECT）。
- CONFIRMED 11 件のうち、取り違えリスクの高い 2 件（hui/you, kky/name）は
  適用前に一次資料で独立確認したうえで適用（下表「追加検証」欄）。

### 適用した修正（11セル）

| コード | 言語 | 語 | 修正前 | 修正後 | 種別 | 根拠 |
|---|---|---|---|---|---|---|
| de_ch | Swiss Standard German | two | zwöi /tsʋøi/ | zwei /tsvai/ | 方言リーク | de_ch は標準ドイツ語（Hochdeutsch）。zwöi は gsw（アレマン方言）形。行内の他セル(ich/du/Name)は標準で不整合 |
| de_ch | Swiss Standard German | star | Stärn /ʃtæːrn/ | Stern /ʃtɛrn/ | 方言リーク | 同上。Stärn は gsw/wae と byte一致の方言形。標準は Stern |
| tdh | Thulung | two | नो /no/ | नि /ni/ | 誤形 | Kiranti *g-ni-s。Lahaussois の Thulung 文法は数詞 ko/nɨ/su。後舌 /o/ は非該当 |
| squ | Squamish | two | chánay /tʃanaj/ | án̓us /ʔánʔus/ | 語彙取り違え | chánay は「3」(chánat)。2 は án̓us（Omniglot / languagesandnumbers） |
| blc | Nuxalk | two | ʔatlʼ /ʔatɬʼ/ | lhnús /ɬnus/ | 語彙取り違え | Nuxalk の「2」は ɬ- 語頭（Omniglot lhnús / native-languages lhwaas）。ʔ- 語頭形は非該当・出典誤り |
| ykg | Tundra Yukaghir | two | атахун /ataːqun/ | кийоон /kijoːn/ | ykg↔yux 取り違え | Maslova 文法: Tundra=kijoːn、Kolyma=ataːqun。両者が逆だった |
| yux | Kolyma Yukaghir | two | кийоон /kijoːn/ | атахун /ataːqun/ | ykg↔yux 取り違え | 上の対。Kolyma=ataːqun（<*ataːqun 保持） |
| sw | Swahili | i | mimi /miˈmi/ | mimi /ˈmimi/ | 強勢位置 | スワヒリは倒数第2音節強勢。二音節語は語頭強勢 ˈmimi |
| sw | Swahili | you | wewe /weˈwe/ | wewe /ˈwewe/ | 強勢位置 | 同上 ˈwewe |
| kky | Guugu Yimithirr | name | yindu /jindu/ | gadil /ˈkatil/ | 語彙取り違え | 「name」= gadil（Pama Language Centre: "Ngathu gadil…" = 私の名前は…）。yindu は非該当 |
| hui | Huli | you | hone /hone/ | í /í/ | 語彙取り違え | Huli の 2人称単数 í（1人称 i と区別するため声調付き）。hone は非該当 |

いずれも各セルの `[form, ipa]` 双方を更新。

### 追加検証（適用前の一次確認）

- **kky/name**: Pama Language Centre の Guugu Yimithirr レッスンで gadil = name を確認。
- **hui/you**: 「Huli では í 'you' を i 'I' と区別するため声調を付す」旨の記述で 2sg=í を確認。

## 所見

- 誤りは「娘分枝/隣接コードとの取り違え」と「標準スロットへの方言形リーク」に
  集中。全1138言語 × 5語で誤り 11 件（誤り率 ~0.19%）と、データは総じて堅牢。
- ykg/yux の相互取り違えのように、姉妹コード間のスワップは単独レビューでは
  見落としやすく、家族圏単位のシート監査が有効だった。
- 未適用 REJECT 2 件は、方言音韻・正書法の許容変種であり誤りではないと判断。
