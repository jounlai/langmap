# Trivia 全記事・全言語監修レポート

作成日: 2026-08-31
対象: `wordmap_trivia.js`、`wordmap_trivia_*.js`、`hanmap_trivia.js`

## 結論

WordMap は英語原文30記事と17言語のローカライズ、HanMap は40記事・19言語版を持つ大きな読み物コーパスです。構造と技術用語の保持は概ね良好です。一方、複数の記事に、英語原文由来の定型的な強調、作為的な対比、直訳らしい接続が残っています。

今回の確認は次の二層で行いました。

1. 全対象に対する構造確認: 記事データ、翻訳オーバーレイ、リンク先、HTML内のアクション属性。
2. 全ファイルに対する編集監修: 最上級、人工的な `not just X but Y` 型対比、大きすぎる結論、翻訳調の接続表現を重点的に確認。

注意: 40記事 x 19言語の全760本文について、各言語のネイティブ校閲を完了したという意味ではありません。ネイティブの専門校閲が必要な箇所は下記に明記しています。

---

## 今回すでに直した本文

### WordMap 英語

- `piraha-no-numbers`: 締め段落を、直接経験の文化規範、口笛・ハミング・歌・叫びによる伝達、言語・文化・思考の関係という情報を残して書き直した。
- `damin-secret-language`: 「ルールを破る」「不安と興奮を同時に与える」といった演出を、オーストラリア諸語の音韻類型に対する具体的な含意へ置換した。
- `khoisan-clicks`: 「異国的なのは育った場所次第」という結論を削り、クリックが機能的音素として子どもに習得されるという観察に戻した。
- `sanskrit-panini`: 「単に〜ではない」の連鎖を減らし、後代の言語学・計算機科学で参照された具体的事実を中心にした。

### WordMap 韓国語

- `piraha-no-numbers`: 情報を落とさず、対比を重ねる結論文を整理した。
- `sanskrit-panini`, `toki-pona-minimalism`, `tuyuca-evidentials`, `guugu-yimithirr-cardinal`: 翻訳調の対比・強い断定を、意味を変えず自然な接続と記述に改めた。

### HanMap 英語

- `bai-language-script`: 「アジア最大級の分類論争」という評価を外し、現在の三つの分類仮説を簡潔に記した。
- `japanese-vocabulary-layers`: 「世界でもっとも多層的」という評価を外し、三層それぞれの表記・音・文化的連想を記した。

### 再開後の追加編集（2026-09-01）

- WordMap英語の全30記事を再走査した。`Taa`, `Rotokas`, `Ubykh`, `Damin`, `Basque`, `Sentinelese`, `Pāṇini`, `Esperanto`, `Hangul`, `Sequoyah`, `Tangut`, `Aymara`, `Nuxalk`, `Nicaraguan Sign Language`, `mama/papa`, `Proto-Indo-European` などで、絶対的な世界一表現、擬人化した結び、根拠のない成功物語を観察事実へ置換した。
- HanMapの優先記事 `kanbun-kaeriten-system`, `tangut-3000-syllables`, `hangul-sinosphere-context`, `sino-vietnamese-han-viet`, `wenzhou-devils-tongue`, `kokugo-versus-kango`, `tea-tea-cha-cha` の英語本文を再編集した。`bai-language-script` は前回の見出し・要約修正で追加の該当なしだった。
- HanMapの隣接記事でも、宣教師を単独発明者に見せる `quoc-ngu-rhodes`、タイムカプセル比喩、架空の出典風blockquote、`living fossil`、`detective work` 等を具体的な資料・機能の説明へ置換した。
- 本文中の数値、固有名詞、引用、`trivia-action` ボタンは維持した。出典のない「世論の総意」を引用符で示していたモンゴル文字のblockquoteは、引用ではない説明文へ変更した。
- 多言語版については、前回変更済みのWordMap記事は保持した。今回追加した英語編集を17言語へ機械翻訳で同期してはいない。各言語の自然さを保証できない変更は、下記の `needs-native-review` 対象として残す。

### 四言語の追加監修（2026-09-01・続行分）

- WordMap の日本語・韓国語・簡体字中国語・ベトナム語について全30記事を再走査し、最上級、唯一性、読者への呼び掛け、映画的な結びを記事単位で確認した。語数や年代など比較根拠のある表現は残し、根拠のない評価語だけを削った。
- `Taa`, `Rotokas`, `Basque`, `Sentinelese`, `Modern Hebrew`, `Ithkuil`, `Hangul`, `Tangut`, `Vai`, `Mohawk`, `Hawaiian`, `Nicaraguan Sign Language`, `mama/papa` などで、比喩的な要約・結論を、音韻、系統、教育、記録状況の説明へ置換した。
- 引用符を付けた「意訳」は逐語引用と誤認されるため、7記事（Etruscan、Tangut、Linear A、Aymara、Tuyuca、Guugu Yimithirr、Mohawk）を対象に、WordMap の英日本文と17ローカライズから計123件を削除した。Mohawk の実在する語例引用など、資料そのものを示す blockquote は保持した。
- HanMap の日本語・韓国語・中国語・ベトナム語では、前回の優先8記事に加え、`phagspa-universal-script`, `min-nan-wenbai`, `pan-sinosphere-counting`, `sino-tibetan-cognates`, `ko-mid-eastguk-jeongun`, `khitan-large-small-scripts`, `quoc-ngu-rhodes` を再編集した。「活化石」「時光膠囊」「革命的」といった評価を、資料が示す音対応・借用経路・表記機能の記述へ改めた。
- この追加監修は機械翻訳による一括同期ではなく、各言語の該当段落を個別に書き直した。ただし、19言語すべてについて母語話者による出版校閲が完了した、という意味ではない。専門用語の地域差や文体の最終調整には引き続きネイティブ校閲が望ましい。

---

## 横断的な問題

### 1. 演出目的の二項対立

`not just X, but Y`、`not X but Y`、`X is not merely Y` の構文が繰り返される。事実の説明ではなく、読者に意外性を与えるための型に見えやすい。

対応: XとYの事実を二文に分ける。対立が論理的に必要なときだけ残す。

### 2. 根拠を伴わない最上級

`one of the most ...`、`extraordinary`、`remarkable`、`ingenious`、`audacious`、`striking` が頻出する。出典が評価を述べている場合を除き、数値・比較対象・仕組みで示す方が読み物として強い。

対応: 評価語を削り、何がどう異なるのかを明示する。

### 3. 人工的な結び

「この事例は大きな問いを投げかける」「言語学者に再び問わせた」という結びが複数ある。これらは内容の総括ではなく、記事が自分で意義を宣伝しているように聞こえる。

対応: 未解決点、現在の学説、観察済みの現象のいずれかで終える。

### 4. 原文構造をそのままなぞる翻訳

多言語版では、英語の接続順・強調順・比喩をそのまま移した文がある。文法的でも、対象言語の読み物としては硬い。

対応: 原文の段落構成ではなく、各言語の自然な説明順に再構成する。本文情報、引用、数値、IPAは保持する。

---

## 言語別の監修結果

### 優先度A: ネイティブ校閲を先に行う言語

#### アラビア語 (`wordmap_trivia_ar.js`)

- `ليس فقط ... بل ...` 型の対比や「もっとも刺激的な事実」のような定型的導入が目立つ。
- 学術的なアラビア語として通るが、読み物の声としては説明が硬く、英語の演出を引き継いでいる。
- 全記事を、アラビア語の科学読み物に慣れたネイティブ編集者が校閲することを推奨する。

#### ヘブライ語 (`wordmap_trivia_he.js`)

- 英語の「X refuses to die」型の比喩、最上級、認識上の留保が直訳調で残る。
- 記事の情報量は維持されているが、自然なヘブライ語の叙述順へ置き換える余地が大きい。

#### スワヒリ語 (`wordmap_trivia_sw.js`)

- 基本的な情報は読めるが、名詞化と接続の一部に英語からの間接翻訳らしい硬さがある。
- 用語と口語/学術語の距離を、東アフリカ向けの編集基準で統一する必要がある。

#### ベトナム語 (`wordmap_trivia_vi.js`)

- `piraha-no-numbers` の「論争に火をつけた」型の比喩、`silbo-gomero` の「再符号化」のような技術語が、読み物として硬い。
- 例: `mã hóa lại tiếng Tây Ban Nha thành tiếng huýt sáo` は、言語学上の技術的説明でなければ `biến tiếng Tây Ban Nha thành tiếng huýt sáo` のように自然化できる。

#### タイ語 (`wordmap_trivia_th.js`)

- 情報は十分だが、英語の長い従属節と最上級の構成が残りやすい。
- 接続詞と文の長さを調整するネイティブ校閲が望ましい。

### 優先度B: 局所的な修正を行う言語

#### 広東語 (`wordmap_trivia_yue.js`)

- 口語的な語と学術的な語が同一段落で揺れる。
- `piraha-no-numbers` の「爭議較少、但仍然喺討論中」など、英語の対比をそのまま写した接続は簡素化できる。
- `silbo-gomero` の説明も、口語の勢いと学術語の密度を揃える必要がある。

#### インドネシア語 (`wordmap_trivia_id.js`)

- 一部に英語の受動構文と名詞句をそのまま写した文がある。
- `piraha-no-numbers` では `dianggap universal` より、`yang disebut universal dalam bahasa manusia` のように文脈を補う方が自然な箇所がある。

#### ヒンディー語 (`wordmap_trivia_hi.js`)

- 技術的には理解可能だが、カジュアルな説明に対して書き言葉が硬すぎる段落がある。
- `रिपोर्ट के अनुसार` のような定型を、文脈に応じて `उनके अनुसार` に変える余地がある。

#### フランス語・イタリア語・ポルトガル語

- 全体の流暢さは高いが、英語原文の過剰な最上級・人工的な対比をそのまま継承している。
- ポルトガル語には、ブラジル寄りか欧州寄りかを明文化していない箇所がある。読者層を定めたうえで表記・語彙を統一する。
- イタリア語では、固有名詞の性・数や引用符のローカライズを個別に確認する。

### 優先度C: 比較的安定している言語

#### 日本語・簡体字中国語・ドイツ語

- 技術用語と記事構造は比較的安定している。
- ただし原文の最上級・二項対立は翻訳にも現れるため、原文を修正した記事から順に同期監修する。

#### ロシア語・ウクライナ語・スペイン語

- 重大な意味の欠落は見つからなかった。
- 接続と評価語に軽微な翻訳調があるため、ネイティブによる最終読みを推奨する。

#### 韓国語

- 今回WordMapの高優先箇所を修正した。
- HanMap側には、英語原文の構造を受け継ぐ見出し・比喩が残る。記事単位の再編集が必要である。

---

## HanMap に固有の状況

`hanmap_trivia.js` は40記事の各言語版を1ファイルに埋め込んでいる。全言語版が同じ原文構造を忠実に引き継ぐため、1つの英語比喩や最上級が19言語に複製される。

代表的な型:

- `A Sea of Characters, a Desert of Literacy`
- `A Script Built to Intimidate`
- `The Sinosphere's Rosetta Stone`
- `The Language Even Chinese Can't Understand`
- `A Coin That Crossed Civilizations`

これらは見出しとして印象的だが、続く本文でも同じ演出的な言い回しが重なるとAIらしさが出る。見出しは残すことができるが、本文の一文目を説明文に寄せるべきである。

HanMap の本文で特に見直すべき記事群:

- `kanbun-kaeriten`
- `tangut-script`
- `hangul-invention`
- `vietnamese-sino-readings`
- `bai-language-script`
- `wenzhou-wu`
- `japanese-vocabulary-layers`
- `tea-etymology`

---

## 推奨する作業順

1. 英語原文を先に編集する。すべての翻訳の語順と強調は原文に引っ張られるため。
2. WordMapの優先度A言語を、記事ごとにネイティブ校閲する。
3. HanMapでは、同じ英語テンプレートが19言語に広がる記事から着手する。
4. 最上級・比喩・人工的な二項対立を削除する際は、数値、出典、対立する学説、観察事実で置き換える。
5. 各変更後に `node tools/bump_versions.js` と `node tools/check_all.js` を実行する。

---

## 完了条件

次の状態をもって、読み物の文体監修が完了したと判断する。

- すべての英語記事で、根拠のない最上級、定型的二項対立、自己宣伝的な結びを除去済み。
- 翻訳記事は各言語でネイティブ校閲済み、または `reviewed` / `needs-native-review` として状態が明記済み。
- 文体の変更で、数値、固有名詞、引用、技術用語、学説の留保を失っていない。
- `node tools/check_all.js` が成功する。
