// === Linguistic trivia / 言語学の豆知識 ===========================
//
// Read-aloud articles about unusual, surprising or controversial
// languages. Surfaced from a separate "📚 Trivia" button on the
// wordmap, opened in its own warm-amber modal (deliberately
// styled differently from the per-language info modal so users
// don't confuse a feature article with a data card).
//
// Each article:
//   id      — slug, used in URL hash and as anchor.
//   icon    — one-glyph emoji shown beside the title.
//   tags    — short kebab-case markers for grouping later.
//   title   — { lang: "Title" } per UI lang. en + ja required;
//             other UI langs fall back to en.
//   summary — one-line lede in each UI lang (1-2 sentences).
//   body    — HTML string per UI lang. Safe-by-construction:
//             authored here, not user-supplied, so we innerHTML it.
//             Use <h3>, <p>, <ul><li>, <strong>, <em>, <blockquote>.
//   sources — array of citations. Each entry is either a plain
//             string (formatted citation) or { text, url } for a
//             hyperlinked reference. Section header is localized.
//
// Adding article N+1: append to TRIVIA_ARTICLES; the renderer and
// list view pick it up automatically.

const TRIVIA_ARTICLES = [
  {
    id: 'piraha-no-numbers',
    icon: '🌳',
    tags: ['isolate', 'amazon', 'controversy', 'recursion'],
    title: {
      en: 'Pirahã — the language said to have no numbers',
      ja: '数を数えない言語、ピダハン語',
    },
    summary: {
        en: 'Pirahã is an Amazonian isolate whose reported lack of exact number words and grammatical recursion remains the subject of an active linguistic debate.',
      ja: 'アマゾン奥地の孤立言語。数詞も基本色名も再帰文法もないとされ、半世紀続いた言語理論を揺さぶった。',
    },
    body: {
      en: `
<p>Deep in the Brazilian Amazon, a few hundred people speak <strong>Pirahã</strong> (pronounced roughly <em>pee-da-HAN</em>). It is a language isolate with no proven relatives, and its reported grammatical properties are debated in modern linguistics.</p>

<div class="trivia-actions">
  <button type="button" class="trivia-action" data-action="focus" data-code="myp" data-zoom="6">📍 Show Pirahã on the map</button>
  <button type="button" class="trivia-action" data-action="panto" data-lat="-5" data-lng="-62" data-zoom="4" data-codes="myp">🌳 Fly to the Amazon basin</button>
</div>

<p>The fieldworker who triggered the storm is <strong>Daniel Everett</strong>, a missionary-turned-linguist who lived with the Pirahã for years. According to his reports, the language is missing several things that 20th-century linguists had argued were universal in human language:</p>

<ul>
  <li><strong>No exact number words.</strong> The community uses only <em>hói</em> ("a small amount"), <em>hoí</em> ("a larger amount") and <em>baágiso</em> ("many") — a contrast of quantity, not of count. In one experiment, researchers added spools of thread one at a time and asked "how many?". <em>Hói</em> was used for one spool. When they started at ten and took spools away, the same word was used for as many as six. The words are relative, like "fewer", not counts. Pirahã speakers can still lay out a matching row of objects one-for-one, up to ten, almost without error, but they fail as soon as the set has to be carried across space or time: hidden behind a screen, turned at right angles, or dropped one by one into a can.</li>
  <li><strong>No basic colour vocabulary.</strong> Colours are described compositionally — "like blood", "unripe", "dirty" — rather than with fixed labels like "red" or "green".</li>
  <li><strong>No grammatical recursion.</strong> Sentences cannot be embedded inside other sentences. This challenges a 2002 proposal by Marc Hauser, <strong>Noam Chomsky</strong> and Tecumseh Fitch that recursion may be the one ingredient of language unique to humans. Its defenders replied that the proposal concerns what every human brain <em>can</em> do, not what every language actually uses, so even a recursion-free Pirahã would not automatically refute it.</li>
  <li><strong>No creation myths, no fiction, no stories about ancestors no living person knew.</strong> Everett reports that Pirahã stories about the past reach back only one or two generations. A strong cultural norm — Everett calls it the "immediacy of experience" principle — restricts speech to what the speaker or a living interlocutor has personally witnessed.</li>
</ul>

<div class="trivia-actions">
  <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="myp">🔢 See "one" across languages</button>
  <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="myp">👩 See Pirahã "Mother"</button>
</div>

<p>Stranger still, Pirahã is one of a small handful of languages that can be transmitted across <em>five parallel channels</em>: it can be <strong>spoken, whistled, hummed, sung, or shouted</strong>. Everett counts only three vowels and eight consonants for men, and seven consonants for women, one of the smallest sound inventories ever recorded. Its melody (tone, stress and rhythm) carries so much information that speech can be hummed or whistled with no consonants at all.</p>

<blockquote>"The Pirahã people communicate almost as much by singing, whistling, and humming as they do using consonants and vowels." — Daniel Everett, <em>Current Anthropology</em> 46(4), 2005, p. 622</blockquote>

<p>Everett's claims are <strong>hotly contested</strong>. In 2009 Andrew Nevins, David Pesetsky and Cilene Rodrigues re-examined Everett's own earlier data and argued that it shows embedded clauses after all, and that the other gaps have ordinary explanations. Everett fired back. In 2016 a team including Everett went through a corpus of recorded Pirahã speech and found no clear case of one sentence inside another. They still stopped short of saying recursion was impossible. The debate is still open.</p>

<p>The cultural norm restricting speech to directly experienced events, and communication by whistling, humming, singing, and shouting, are less contested but still studied. Whatever the outcome of the recursion debate, Pirahã has kept an older question in view: how do language, culture, and thought shape one another?</p>
      `,
      ja: `
<p>ブラジル・アマゾンの奥地で、数百人ほどが<strong>ピダハン語（Pirahã）</strong>を話す。親縁関係が証明されていない孤立言語で、数詞や再帰構造をめぐる記述は現在も議論されている。</p>

<div class="trivia-actions">
  <button type="button" class="trivia-action" data-action="focus" data-code="myp" data-zoom="6">📍 地図でピダハン語を見る</button>
  <button type="button" class="trivia-action" data-action="panto" data-lat="-5" data-lng="-62" data-zoom="4" data-codes="myp">🌳 アマゾン流域へ飛ぶ</button>
</div>

<p>論争に火をつけたのは、伝道師から言語学者に転じ、長年ピダハン社会に住み込んだ<strong>ダニエル・エヴェレット</strong>である。彼の報告によれば、ピダハン語には、20世紀の言語学が「人類言語の普遍要素」と考えてきたものがいくつも欠けているという。</p>

<ul>
  <li><strong>正確な数詞がない。</strong> 使われるのは <em>hói</em>（少し）、<em>hoí</em>（多め）、<em>baágiso</em>（たくさん）の三語だけで、これは数ではなく<strong>量の対比</strong>にすぎない。ある実験では、研究者が糸巻きを一つずつ足していきながら「いくつ？」と尋ねた。糸巻き1個には <em>hói</em> が使われた。ところが10個から始めて一つずつ取り除いていくと、同じ語が6個にまで使われた。これらの語は「より少ない」のような相対的な語であって、数ではないのだ。それでもピダハン語話者は、目の前に並んだ品物を10個までほぼ誤りなく一対一で並べ直せる。つまずくのは、衝立で隠されたり、直角に置き換えられたり、缶に一つずつ落とし込まれたりして、量を空間や時間をまたいで運ばなければならなくなったときだ。</li>
  <li><strong>基本色名がない。</strong> 色は「血のような」「熟れていない」「汚れた」などと比喩的に説明されるだけで、「赤」「緑」のような固定ラベルは存在しない。</li>
  <li><strong>再帰がない。</strong> 文を文の中に埋め込む構造を持たない。これは、再帰こそが人間だけが持つ言語の唯一の要素かもしれない、という2002年のマーク・ハウザー、<strong>ノーム・チョムスキー</strong>、テカムセ・フィッチの提案に挑むものだった。提案を擁護する側は、この提案はすべての人間の脳に<em>できる</em>ことを論じているのであって、すべての言語が実際に使っていることを論じているのではないから、たとえ再帰のないピダハン語があっても自動的に反証にはならない、と応じた。</li>
  <li><strong>創世神話も、虚構も、誰も会ったことのない祖先の物語もない。</strong> エヴェレットによれば、ピダハンの人々が語る過去の物語がさかのぼるのは、せいぜい1〜2世代までだという。 エヴェレットが「経験の直接性」原理と呼ぶ強い文化規範があり、話し手か、あるいは生きている誰かが実際に見た出来事しか語ってはならない、とされる。</li>
</ul>

<div class="trivia-actions">
  <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="myp">🔢 ピダハン語の「一」</button>
  <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="myp">👩 ピダハン語の「母」</button>
</div>

<p>さらに不思議なのは、ピダハン語が世界的にも珍しい<em>五つの並列チャネル</em>で伝達できる言語であることだ。<strong>普通に話す・口笛で吹く・ハミングする・歌う・叫ぶ</strong>──そのいずれでも完全な文を伝えられる。エヴェレットの数えでは、母音はわずか3つ、子音は男性で8つ、女性では7つ。記録された中でも最小級の音素目録だ。声調・強勢・リズムといったメロディが担う情報量がきわめて大きいため、子音をまったく使わずに、ハミングや口笛で話すことができる。</p>

<blockquote>「ピダハンの人々は、子音と母音を使って話すのとほぼ同じくらい、歌い、口笛を吹き、ハミングすることで意思を伝える」── ダニエル・エヴェレット『Current Anthropology』46(4)、2005年、622ページ</blockquote>

<p>エヴェレットの主張は<strong>学界で激しく争われている</strong>。2009年、アンドリュー・ネヴィンス、デイヴィッド・ペセツキー、シレーネ・ロドリゲスは、エヴェレット自身の以前のデータを再検討し、そこには埋め込み節がちゃんと現れている、ほかの欠落にもありふれた説明がつく、と論じた。エヴェレットは反撃した。2016年には、エヴェレットを含むチームが録音されたピダハン語の発話コーパスを調べ、文の中に文が入った明確な例を一つも見つけられなかった。それでも彼らは、再帰が不可能だとまでは言わなかった。論争はまだ決着していない。</p>

<p>論争の少ない、しかしなお議論の余地のある事柄として──「経験していないことは語らない」という文化規範と、口笛・ハミング・歌・叫びによる多チャネル伝達がある。再帰論争の勝者がどちらになるにせよ、ピダハン語は「言語が思考を形作るのか、それとも思考が言語を形作るのか」──サピア＝ウォーフ以来60年来の問いを、もう一度言語学の中心に押し戻した、稀有な言語なのだ。</p>
      `,
    },
    sources: [
      { text: "Hauser, Marc D.; Chomsky, Noam; Fitch, W. Tecumseh (2002). \"The faculty of language: what is it, who has it, and how did it evolve?\" Science 298(5598): 1569–1579.", url: "https://doi.org/10.1126/science.298.5598.1569" },
      { text: "Futrell, R.; Stearns, L.; Everett, D. L.; Piantadosi, S. T.; Gibson, E. (2016). \"A corpus investigation of syntactic embedding in Pirahã.\" PLOS ONE 11(3): e0145289.", url: "https://doi.org/10.1371/journal.pone.0145289" },
      'Everett, Daniel L. (2005). "Cultural Constraints on Grammar and Cognition in Pirahã: Another Look at the Design Features of Human Language." Current Anthropology 46(4): 621–646.',
      'Everett, Daniel L. (2008). Don\'t Sleep, There Are Snakes: Life and Language in the Amazonian Jungle. Pantheon Books.',
      'Nevins, Andrew; Pesetsky, David; Rodrigues, Cilene (2009). "Pirahã Exceptionality: A Reassessment." Language 85(2): 355–404.',
      'Frank, Michael C.; Everett, Daniel L.; Fedorenko, Evelina; Gibson, Edward (2008). "Number as a cognitive technology: Evidence from Pirahã language and cognition." Cognition 108(3): 819–824.',
      { text: 'Glottolog: Pirahã (pira1253)', url: 'https://glottolog.org/resource/languoid/id/pira1253' },
      { text: 'WALS Online: Pirahã', url: 'https://wals.info/languoid/lect/wals_code_prh' },
    ],
  },

    {
      id: 'silbo-gomero',
      icon: '🌬️',
      tags: ['whistled', 'spain', 'unesco', 'register'],
      title: {
        en: 'Silbo Gomero — a whistled Spanish that crosses canyons',
        ja: 'シルボ・ゴメロ — 峡谷を越える口笛のスペイン語',
      },
      summary: {
        en: 'Silbo Gomero is a whistled register of Spanish used to communicate across La Gomera\'s ravines. UNESCO listed it in 2009, and it has been a compulsory school subject on the island since 1999.',
        ja: '大西洋に浮かぶ小さな火山島で、羊飼いたちはスペイン語をまるごと口笛に置き換え、2キロ以上離れた谷越しに会話していた。2009年にユネスコ無形文化遺産となり、1999年からは島の学校で必修科目になっている。',
      },
      body: {
        en: `
  <p>The island of <strong>La Gomera</strong> in the Canary Islands is carved by deep, near-vertical barrancos — ravines so steep that a neighbour visible across the gully might be an hour's walk away. Long before mobile phones, Gomerans used <em>Silbo Gomero</em>, "the Gomeran whistle", to speak across them, and a good whistle can carry a message up to about five kilometres.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="28.10" data-lng="-17.20" data-zoom="7">🗺️ Fly to La Gomera</button>
  </div>
  
  <p>Silbo is not a code or a set of signals. It is a fully <strong>articulated register of Spanish</strong>: every Spanish word can in principle be whistled, and a fluent silbador can carry on an open-ended conversation about the weather, livestock prices or last night's football match. The trick is that the whistle reduces the full vowel and consonant inventory of Spanish to a much smaller set of <em>pitched gestures</em>. In Ramón Trujillo's classic 1978 analysis, which UNESCO's description follows, there are:</p>
  
  <ul>
    <li><strong>Two "vowels"</strong> distinguished by pitch — a higher tone covering Spanish <em>/i, e/</em> and a lower tone covering <em>/a, o, u/</em>.</li>
    <li><strong>Four "consonants"</strong> distinguished by whether the whistle is interrupted or continuous, and whether the pitch rises or falls into the following vowel.</li>
    <li>Rhythm, stress and intonation survive better than individual sounds, and listeners fill in the rest from context, much as we follow a bad phone line.</li>
    <li>Later studies hear more: four vowel whistles, and in today's school-taught Silbo perhaps all five Spanish vowels, which may mean the whistle itself has changed now that it is used at closer range.</li>
  </ul>
  
  <p>The whistle is older than Spanish on the islands. The original inhabitants of the Canaries, the <strong>Guanches</strong>, already whistled their own (probably Berber-related) language, on El Hierro, Tenerife and Gran Canaria as well as La Gomera. After the Castilian conquest of the 15th century, settlers adapted the whistle to Spanish during the 16th. Linguist <strong>Ramón Trujillo</strong> of the Universidad de La Laguna gave the whistle its standard linguistic description in his 1978 monograph <em>El silbo gomero: análisis lingüístico</em>, which remains the canonical reference.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="es,kab,shi">🗣 Compare Spanish, Berber and Kabyle</button>
  </div>
  
  <p>By the 1980s Silbo was nearly extinct: emigration, paved roads and telephones had hollowed out the shepherding economy that sustained it. Old whistlers began teaching it voluntarily, parents' associations spread the classes to every school, and in 1997 the Canary Islands Parliament asked for it to join the curriculum. From July 1999 <strong>Silbo Gomero became a compulsory subject in the island's primary and secondary schools</strong>. Lessons started at half an hour a week and have since been extended.</p>
  
  <blockquote>"…the only whistled language in the world that is fully developed and practised by a large community (more than 22,000 inhabitants)." — UNESCO, Representative List of the Intangible Cultural Heritage of Humanity, 2009</blockquote>
  
  <p>Neuroscientists have taken notice. A 2005 fMRI study by <strong>Manuel Carreiras</strong> and colleagues at the University of La Laguna showed that experienced silbadores process Silbo in <em>the same left-hemisphere language areas</em> that handle spoken Spanish, while Spanish speakers who had never learned Silbo processed the same whistles merely as whistling. To a trained brain, Silbo is language, not music or birdsong, which makes it a natural experiment in how flexible the human language faculty is.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="28.10" data-lng="-17.20" data-zoom="9" data-tiles="terrain">🌋 Zoom into the barrancos</button>
  </div>
  
  <p>Silbo is not the only surviving whistled register. The "bird language" of Kuşköy in Turkey, Hmong courtship whistles, whistled Mazatec in Oaxaca, Akha in Yunnan and <em>sfyria</em> in the Greek village of Antia all live alongside their spoken parents. But Silbo is the most institutionalised and the best documented, and the only one on UNESCO's Representative List; Kuşköy's whistle went on the Urgent Safeguarding List in 2017. The next time you stand on a ridge in La Gomera and hear what sounds like a very chatty bird, listen again: it might be someone telling their cousin what to pick up from the shop.</p>
        `,
        ja: `
<p>カナリア諸島の<strong>ラ・ゴメラ島</strong>は、ほぼ垂直に切り立った深い渓谷（バランコ）に幾筋にも刻まれている。目の前に見える隣人の家まで歩けば1時間以上かかることもある。携帯電話が普及する以前、島の人々はスペイン語の口笛レジスターである<em>シルボ・ゴメロ</em>を使って渓谷越しに会話していた。上手な口笛なら、メッセージは5キロほど先まで届く。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="28.10" data-lng="-17.20" data-zoom="7">🗺️ ラ・ゴメラ島へ飛ぶ</button>
  </div>
  
  <p>シルボはモールス信号のような暗号ではない。スペイン語そのものをまるごと口笛に置き換えた<strong>「音声レジスター」</strong>であり、熟達した話者（シルバドール）は天気・家畜の値段・昨夜のサッカーまで自由に会話できる。仕組みは、スペイン語の母音と子音を、はるかに少数の<em>ピッチ・ジェスチャー</em>に圧縮することにある。ユネスコの説明も依拠しているラモン・トルヒージョの古典的な分析（1978年）によれば、内訳は次のとおりだ。</p>
  
  <ul>
    <li><strong>母音は2つ。</strong> 高音が <em>/i, e/</em>、低音が <em>/a, o, u/</em> に対応する。</li>
    <li><strong>子音は4つ。</strong> 口笛が途切れるか連続するか、母音への移行で音程が上がるか下がるかで区別される。</li>
    <li>個々の音より、リズム・強勢・抑揚のほうがよく伝わる。残りは聞き手が文脈で補う──雑音だらけの電話でも話が通じるのと同じことだ。</li>
    <li>その後の研究では、もっと多くの区別が聞き取られている。母音の口笛は4種類、さらに学校で教えられる今日のシルボでは、スペイン語の5母音すべてが区別されているかもしれない。近い距離で使われるようになったことで、口笛そのものが変わってきたのかもしれない。</li>
  </ul>
  
  <p>島の口笛はスペイン語より古い。カナリア諸島の先住民<strong>グアンチェ族</strong>は、ラ・ゴメラだけでなくエル・イエロ、テネリフェ、グラン・カナリアでも、自分たちの（おそらくベルベル系の）言語をすでに口笛で話していた。15世紀のカスティーリャによる征服の後、16世紀に入植者たちがこの口笛をスペイン語に合わせて作り変えたのである。言語学者<strong>ラモン・トルヒージョ</strong>の1978年の研究書がいまも基本文献となっている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="es,kab,shi">🗣 スペイン語・ベルベル語・カビル語を比べる</button>
  </div>
  
  <p>1980年代、シルボはほぼ絶滅寸前まで衰えた。離島からの人口流出と舗装道路、そして電話の普及が、口笛を必要としていた牧畜経済を崩したのだ。年配のシルバドールたちが自発的に教えはじめ、保護者会が授業を島じゅうの学校へ広げ、1997年にはカナリア諸島議会がカリキュラムへの導入を求めた。そして1999年7月、<strong>シルボ・ゴメロは島の初等・中等学校の必修科目になった</strong>。授業は週30分から始まり、その後拡充されている。</p>
  
  <blockquote>「……大規模な共同体（2万2000人以上の住民）によって完全に発達し、実践されている、世界で唯一の口笛言語である」── ユネスコ「人類の無形文化遺産の代表的な一覧表」（2009年）</blockquote>
  
  <p>脳科学者も注目した。ラ・ラグナ大学の<strong>マヌエル・カレイラス</strong>らによる2005年のfMRI研究では、熟達したシルバドールは、話されたスペイン語を処理するのと同じ<em>左半球の言語野</em>でシルボを処理していた。一方、シルボを習ったことのないスペイン語話者は、同じ口笛をただの口笛として処理していた。訓練を積んだ脳にとって、シルボは<strong>音楽でも鳥のさえずりでもなく、言語</strong>なのだ。だからこそシルボは、人間の言語能力がどれほど柔軟かを確かめる、天然の実験場になっている。</p>

  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="28.10" data-lng="-17.20" data-zoom="9" data-tiles="terrain">🌋 バランコ（峡谷地形）にズーム</button>
  </div>

  <p>今も残る口笛のレジスターはシルボだけではない。トルコのクシュキョイの「鳥の言葉」、モン族の求愛の口笛、メキシコ・オアハカのマサテコ語の口笛、雲南のアカ語、ギリシャのアンティア村の<em>sfyria</em>（スフィリア）──どれも元の話し言葉と並んで生きている。だが制度化と記録の充実ぶりではシルボが群を抜き、ユネスコの「代表一覧表」に載っているのもシルボだけだ（クシュキョイの口笛は2017年に「緊急に保護する必要がある無形文化遺産の一覧表」に登録された）。ラ・ゴメラの尾根道で、よくしゃべる鳥のような音が聞こえたら、もう一度耳を澄ましてほしい。それは誰かが従姉妹に「帰りにパンを買ってきて」と頼んでいる声かもしれない。</p>
        `,
      },
      sources: [
        { text: "Wikipedia: Whistled language", url: "https://en.wikipedia.org/wiki/Whistled_language" },
        { text: "Wikipedia: Silbo Gomero", url: "https://en.wikipedia.org/wiki/Silbo_Gomero" },
        'Trujillo, Ramón (1978). El silbo gomero: análisis lingüístico. Editorial Interinsular Canaria.',
        'Carreiras, Manuel; Lopez, Jorge; Rivero, Francisco; Corina, David (2005). "Linguistic perception: Neural processing of a whistled language." Nature 433(7021): 31–32.',
        'Meyer, Julien (2015). Whistled Languages: A Worldwide Inquiry on Human Whistled Speech. Springer.',
        'Batista Rodríguez, José Juan; Morera Pérez, Marcial (coords.) (2007). El silbo gomero: 125 años de estudios lingüísticos y etnográficos. Academia Canaria de la Lengua.',
        { text: 'UNESCO: Whistled language of the island of La Gomera (Silbo Gomero)', url: 'https://ich.unesco.org/en/RL/whistled-language-of-the-island-of-la-gomera-silbo-gomero-00172' },
        { text: 'Glottolog: Spanish (stan1288)', url: 'https://glottolog.org/resource/languoid/id/stan1288' },
      ],
    },
    {
      id: 'taa-most-consonants',
      icon: '🔊',
      tags: ['clicks', 'phonology', 'africa', 'extreme'],
      title: {
        en: 'Taa (!Xóõ) — counting one of the largest consonant inventories',
        ja: 'タア語（!Xóõ）— 世界一子音が多い言語',
      },
      summary: {
        en: 'Taa is spoken by about 2,500 people near the Botswana–Namibia border. Depending on how complex clicks are analysed, descriptions count roughly 120 consonants or more.',
        ja: 'ボツワナとナミビアの国境地帯にわずか2500人ほどの話者しか残っていないタア語は、120を超える子音と5系統の吸着音を含む約160の音素をひとつの体系に詰め込んでいる。記述されたなかで最大級の音体系である。',
      },
      body: {
        en: `
  <p>English gets by on 24 distinct consonants. <strong>Taa</strong>, also written <em>!Xóõ</em>, has so many that linguists cannot agree on how to count them. Anthony Traill's monumental 1985 study of the East ǃXoon dialect yields at least <strong>58 phonemic consonants</strong> on the most conservative reckoning, and the later DoBeS description of West ǃXoon at least <strong>87</strong>, but those minima come from treating the most complex clicks as consonant clusters. Count each complex click as a single segment instead and the inventory climbs to around <strong>130</strong> consonants on Traill's material and <strong>122</strong> on DoBeS's. The World Atlas of Language Structures, working from Traill's data, also gives <strong>122</strong>, the highest consonant count in its sample. On the conservative count Taa is merely very large, so whether it holds the world record depends on how you count.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="nmn" data-zoom="5">🌍 Show Taa on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-22" data-lng="20" data-zoom="5">🗺️ Fly to the Taa heartland</button>
  </div>
  
  <p>Taa is a <strong>Tuu language</strong> (formerly grouped with the now-discredited "Southern Khoisan" family) spoken in scattered villages of the southwestern Kalahari, mostly in Botswana with a smaller community in Namibia. In 2011 there were around <strong>2,500 speakers</strong>, a few hundred of them on the Namibian side. In Botswana, Taa children are schooled in Setswana and English, two languages that are not their own.</p>
  
  <p>The phonological extravagance has three layers:</p>
  
  <ul>
    <li><strong>Five primary click types.</strong> Dental <em>|</em>, lateral <em>||</em>, alveolar <em>!</em>, palatal <em>ǂ</em> and bilabial <em>ʘ</em>. Bilabial clicks — made with a kiss-like pop — survive in only a handful of languages worldwide; Taa is one of them.</li>
    <li><strong>Around 19 click accompaniments.</strong> Traill sorts the clicks into nineteen series by what comes with them: voicing, aspiration, glottal closure, nasalisation, and uvular or ejective releases. Not every combination occurs, but even the leanest count gives at least <strong>83 click sounds</strong>. Hawaiian makes do with eight consonants in total.</li>
    <li><strong>A separate non-click consonant series</strong> almost as large as a normal language's whole inventory, with rare contrasts like uvular ejective affricates <em>q'χ</em>.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="nmn,naq,xh,zu">🗣 Compare click languages (Taa, Khoekhoe, Xhosa, Zulu)</button>
  </div>
  
  <p>The South African linguist <strong>Anthony Traill</strong> spent more than thirty years documenting Taa, beginning with PhD fieldwork in the 1970s and culminating in his 1994 dictionary, <em>A !Xóõ Dictionary</em>. Traill measured these sounds with instruments: palatography to see where the tongue touches the roof of the mouth, airflow and pressure readings, and X-ray film. Every click needs two closures at once. One is at the front, made with the tip or blade of the tongue. The other is at the back, at the velum or uvula, and the air trapped between them is what makes the pop. He also demonstrated that a single Taa click can recruit <em>all three of the airstream mechanisms available to human speech</em>: the ingressive lingual airstream of the click itself, an egressive pulmonic airstream for the voicing that leads into it, and a glottalic one for the ejective release that follows — while a further series lowers the velum to add nasalisation.</p>
  
  <p>Clicks are not a rare extra in Taa. They are ordinary consonants, and they are actually the <em>usual</em> way to begin a word — by one count <strong>82% of basic vocabulary items</strong> start with a click, a far higher rate than for any non-click series.</p>
  
  <p>Linguists disagree about <em>why</em> Taa got so loud. One hypothesis comes from genetics. In 2003 <strong>Alec Knight, Peter Underhill and colleagues</strong> found that two click-using peoples, the Hadza of Tanzania and the Juǀʼhoan of the Kalahari, are among the most deeply separated populations in Africa. They suggested that clicks might therefore go back to a very early stage of human language. Specialists on the languages themselves are far more sceptical: <strong>Bonny Sands</strong> and <strong>Tom Güldemann</strong> have argued that clicks are not relics of an ancestral mother tongue, that there is no special linguistic conservatism to be found in the region, and that the spread of clicks belongs to the relatively recent human past rather than to the dawn of language. Whichever side is right, Taa is a useful check on the idea that languages always drift toward simpler sound systems: it shows how large a sound system a language can carry.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-23.5" data-lng="21.5" data-zoom="6">🌵 Zoom into the Kalahari</button>
  </div>
  
  <p>The Endangered Languages Project lists Taa as <strong>threatened</strong>, and Botswana researchers call it acutely endangered. They point to the relocation of San communities, pressure from larger Bantu-speaking groups, and schooling only in Setswana and English. A break in transmission would end the daily use of the language and remove an important source of evidence for how complex a consonant inventory can become.</p>
        `,
        ja: `
  <p>英語の子音は24個。<strong>タア語</strong>（原綴り <em>!Xóõ</em>）は、その子音をどう数えるかすら言語学者の合意が得られないほど多い。アンソニー・トレイルの記念碑的記述（1985年、東ǃXoon方言）では、もっとも控えめに数えて音素子音は<strong>58個</strong>以上、のちのDoBeSによる西ǃXoon方言の記述では<strong>87個</strong>以上。ただしこれは複雑な吸着音を子音連続とみなした最小値である。複雑な吸着音をそれぞれ一つの分節音として数えれば、トレイルの資料で約<strong>130個</strong>、DoBeSで<strong>122個</strong>まで膨らむ。『世界言語構造地図』（WALS）もトレイルの資料をもとに<strong>122</strong>としており、これはそのサンプルで最多の子音数だ。控えめな数え方ならタア語は「非常に多い」にとどまるので、世界記録かどうかは数え方しだいである。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="nmn" data-zoom="5">🌍 地図でタア語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-22" data-lng="20" data-zoom="5">🗺️ タア語の故地へ飛ぶ</button>
  </div>
  
  <p>タア語は<strong>トゥー語族</strong>に属する（かつての「南コイサン」分類は現在は否定されている）。南西カラハリの村々で話され、大半はボツワナ、少数がナミビアに住む。2011年の話者数は約<strong>2500人</strong>で、そのうち数百人がナミビア側に住む。ボツワナでは、タア語の子どもたちは、自分たちのものではない二つの言語、ツワナ語と英語で学校教育を受けている。</p>
  
  <p>音体系の異常な豊富さには三層ある。</p>
  
  <ul>
    <li><strong>5系統の吸着音。</strong> 歯音 <em>|</em>、側面 <em>||</em>、歯茎 <em>!</em>、硬口蓋 <em>ǂ</em>、そして両唇 <em>ʘ</em>。両唇吸着音──キスのようなポップ音──は世界でも数言語にしか残っておらず、タア語はその一つである。</li>
    <li><strong>約19の付随特徴。</strong> トレイルは吸着音を、何が伴うか──有声、有気、声門閉鎖、鼻音化、口蓋垂や放出音の解放──によって19の系列に分けている。すべての組み合わせが現れるわけではないが、もっとも切り詰めた数え方でも、吸着音は少なくとも<strong>83種</strong>にのぼる。ハワイ語の子音は、全部で8つしかない。</li>
    <li><strong>吸着音とは別の通常子音系列</strong>もあり、口蓋垂放出破擦音 <em>q'χ</em> のような珍しい対立まで含まれる。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="nmn,naq,xh,zu">🗣 吸着音言語を比べる（タア・コエコエ・コサ・ズールー）</button>
  </div>
  
  <p>南アフリカの言語学者<strong>アンソニー・トレイル</strong>は1970年代から30年以上タア語を記録し、1994年には『!Xóõ辞典』を完成させた。彼はこれらの音を機器で測定した。舌が口蓋のどこに触れるかを見るパラトグラフィ、気流と気圧の計測、そしてX線映像である。吸着音はどれも、<strong>二か所の閉鎖を同時に</strong>必要とする。ひとつは前方で、舌先か舌端で作る。もうひとつは後方、軟口蓋か口蓋垂で作り、そのあいだに閉じ込められた空気がポンという音を生むのだ。トレイルが示したように、タア語の吸着音のなかには、人間の言語に存在する<em>3つの気流機構すべて</em>をひとつの子音に動員するものがある。吸着音そのものを生む舌の吸気、それに先立つ有声部を支える肺の呼気、そして直後の放出音を生む声門の気流である。さらに別系列では、軟口蓋を下げて鼻音化が加わる。</p>
  
  <p>タア語の吸着音は、まれなおまけではない。ごく普通の子音であり、しかも語頭では、むしろ吸着音で始まるのが<em>ふつう</em>なのだ。ある調査では基礎語彙の<strong>82%</strong>が吸着音で始まっており、その比率はどの非吸着音系列よりもはるかに高い。</p>
  
  <p>なぜタア語はここまで「音だくさん」になったのか。ひとつの仮説は遺伝学から来た。2003年、<strong>アレック・ナイト、ピーター・アンダーヒル</strong>らは、吸着音を使う二つの民族、タンザニアのハッザとカラハリのジュホアンが、アフリカでもっとも深く分かれた集団に属することを見いだし、それゆえ吸着音は人類の言語のごく初期の段階にまでさかのぼるのかもしれない、と示唆した。ただし言語そのものの専門家はこれに懐疑的で、ボニー・サンズとトム・ギュルデマンは、吸着音は祖語の遺物ではなく、この地域に特別な言語的保守性があるわけでもない、吸着音の広がりは「言語の始まり」ではなくかなり新しい時代の出来事だ、と論じている。どちらが正しいにせよ、言語の音体系はいつも単純な方へ流れていく、という考えに対して、タア語はよい歯止めになる。ひとつの言語がどれほど大きな音体系を担えるかを示しているからだ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-23.5" data-lng="21.5" data-zoom="6">🌵 カラハリ砂漠を拡大</button>
  </div>
  
<p>危機言語プロジェクト（Endangered Languages Project）はタア語を<strong>危機にある</strong>言語としており、ボツワナの研究者たちは深刻な危機にあると言う。サン族の共同体の移住、より大きなバントゥー系集団からの圧力、そしてツワナ語と英語だけによる学校教育が、その理由として挙げられている。次世代への継承が途切れれば、共同体の日常語が失われると同時に、複雑な子音体系がどのように成立し機能するかを示す重要な資料も失われる。</p>
        `,
      },
      sources: [
        { text: "Moumakwa, Tshiamiso V.; Monaka, Kemmonye C. (2017). \"Speakers living and languages dying: The endangerment of !Xóõ and øHua in Botswana.\" JULACE: Journal of the University of Namibia Language Centre 2(1): 71–92.", url: "https://journals.unam.edu.na/index.php/JULACE/article/view/1308" },
        { text: "Endangered Languages Project: Taa (archived 2022)", url: "https://web.archive.org/web/20220621130234/https://www.endangeredlanguages.com/lang/593" },
        { text: "Knight, A., Underhill, P. A., Mortensen, H. M., et al. (2003). \"African Y chromosome and mtDNA divergence provides insight into the history of click languages.\" Current Biology 13(6): 464–473.", url: "https://doi.org/10.1016/S0960-9822(03)00130-1" },
        'Traill, Anthony (1985). Phonetic and Phonological Studies of !Xóõ Bushman. Helmut Buske Verlag.',
        'Traill, Anthony (1994). A !Xóõ Dictionary. Quellen zur Khoisan-Forschung 9. Rüdiger Köppe Verlag.',
        'Maddieson, Ian (1984). Patterns of Sounds. Cambridge University Press.',
        'Sands, Bonny; Güldemann, Tom (2009). "What click languages can and can\'t tell us about language origins." In R. Botha & C. Knight (eds.), The Cradle of Language. Oxford University Press, pp. 204–218.',
        'Nakagawa, Hirosi (2006). "Aspects of the Phonetic and Phonological Structure of the G|ui Language." PhD dissertation, University of the Witwatersrand.',
        { text: 'Glottolog: Taa (taaa1242)', url: 'https://glottolog.org/resource/languoid/id/taaa1242' },
        { text: 'WALS: Consonant Inventories', url: 'https://wals.info/chapter/1' },
      ],
    },
    {
      id: 'rotokas-fewest-sounds',
      icon: '🤫',
      tags: ['phonology', 'papua-new-guinea', 'extreme', 'minimal'],
      title: {
        en: 'Rotokas — an eleven-phoneme sound system',
        ja: 'ロトカス語 — 世界一音が少ないとされる言語',
      },
      summary: {
        en: 'The central dialect of Rotokas, spoken on Bougainville, has been analysed with six consonants and five vowels, placing it at the low end of documented phoneme inventories.',
        ja: 'カカオの島ブーゲンビルで話されるロトカス語の中央方言は、音素がわずか11個（子音6、母音5）。世界最小級の音体系として知られる。',
      },
      body: {
        en: `
  <p>If Taa is the maximalist's paradise, <strong>Rotokas</strong> is the minimalist's. Spoken by about 4,300 people (a 1981 figure) in the mountainous interior of <strong>Bougainville</strong>, an island that politically belongs to Papua New Guinea but geographically to the Solomons chain, the central dialect of Rotokas has just <strong>eleven distinct phonemes</strong>: six consonants — <em>p, t, k, β, ɾ, ɡ</em> — and five vowels <em>a, e, i, o, u</em>, each of which can be short or long.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="roo" data-zoom="7">📍 Open Rotokas on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-6.30" data-lng="155.20" data-zoom="6">🗺️ Fly to Bougainville</button>
  </div>

  <p>Hawaiian — at thirteen phonemes — is sometimes cited as a competitor for the record, and the <strong>Pirahã</strong> women's register may dip even lower; but the count that linguists usually reach for is Rotokas, based on the careful 1969 description by SIL missionary linguists <strong>Irwin and Jacqueline Firchow</strong> in <em>Anthropological Linguistics</em>. They identified three places of articulation, no nasal consonants at all, and no consonant clusters.</p>
  
  <ul>
    <li><strong>No nasals.</strong> The central dialect of Rotokas is one of the very rare cases where <em>m, n, ng</em> are <strong>entirely absent as phonemes</strong> — though the Aita dialect nearby does have them. Nasal sounds do surface, but only as free variants of the voiced series <em>b, d, g</em> and only in marginal contexts — misused when trying to pronounce English words (<em>bye-bye</em> comes out [maemae]), or when mimicking a foreigner speaking Rotokas — never as separate units.</li>
    <li><strong>Tiny consonant inventory.</strong> <em>p</em> and <em>β</em> (a soft bilabial fricative similar to Spanish <em>b</em> between vowels), <em>t</em> and <em>ɾ</em> (a tap), <em>k</em> and <em>ɡ</em> — three voiceless and three voiced, paired symmetrically across the mouth.</li>
    <li><strong>Simple syllables.</strong> A syllable is at most one consonant plus a vowel, and many have no consonant at all, so long vowels and strings of vowels are everywhere: <em>uukoa</em> "water", <em>aio</em> "eat".</li>
  </ul>
  
  <p>One immediate consequence is that Rotokas words tend to be <strong>longer</strong> than words in phonologically rich languages — a small vocabulary of sounds requires more combinations to keep words apart. Body-part words give the flavour: <em>uvareoua</em> "ear", <em>iruvaoto</em> "nose", <em>arevuoto</em> "tongue". Simple syllables, repeated patterns, almost songlike.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="roo,haw,mi">🗣 Compare Rotokas, Hawaiian and Māori</button>
  </div>
  
  <p>Rotokas belongs to the <strong>North Bougainville</strong> family, one of two tiny non-Austronesian (Papuan) families on the island. Genealogically it is unrelated to the surrounding Oceanic Austronesian languages of the coast, and to its southern Bougainville neighbours. It is tempting to credit that isolation for the stripped-down phonology, but community size explains little on its own: Taa, with one of the largest sound systems known, has even fewer speakers, about 2,500 in 2011. The Aita dialect next door shows how the system shrank. It still has <em>m</em> and <em>n</em> (Aita <em>emaoto</em> "tree" is central <em>ebaoto</em>), so central Rotokas seems to have merged its nasals into the voiced stops.</p>
  
  <p>In Maddieson's UPSID survey — the 317-language sample behind <em>Patterns of Sounds</em> (1984) — segment inventories run from 11 at the low end, in Rotokas and Pirahã, to 141 at the high end, in !Xũ. Rotokas shares the very bottom of that range.</p>
  
  <p>Bougainville has had a difficult late-20th-century history: civil war from 1988 to 1998, the closure of the Panguna mine, and ongoing negotiations toward independence from Papua New Guinea after the 2019 referendum. Rotokas came through it with a written tradition in place: an alphabet of just 12 letters and a New Testament, <em>Airepa Vae Reo Ovoi</em>, printed in 1982. Rotokas remains the everyday language for many adults, but younger people increasingly use Tok Pisin or English.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-6.20" data-lng="155.30" data-zoom="8" data-tiles="terrain">🌋 Zoom into the Crown Prince Range</button>
  </div>
  
  <p>A small phoneme inventory does not make a language "easier": Rotokas children acquire their language as children elsewhere acquire theirs. Rotokas and Taa instead show the range that spoken-language sound systems can occupy, from about eleven contrastive sounds to well over one hundred.</p>
        `,
        ja: `
  <p>タア語がマキシマリストの楽園なら、<strong>ロトカス語</strong>はミニマリストの聖地である。パプアニューギニア東端の<strong>ブーゲンビル島</strong>──地理的にはソロモン諸島の延長線上にある火山島──の山間部で約4300人（1981年の数字）に話される。その中央方言の音素はわずか<strong>11個</strong>。子音6（<em>p, t, k, β, ɾ, ɡ</em>）、母音5（<em>a, e, i, o, u</em>。それぞれ長短対立を持つ）。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="roo" data-zoom="7">📍 地図でロトカス語を開く</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-6.30" data-lng="155.20" data-zoom="6">🗺️ ブーゲンビル島へ飛ぶ</button>
  </div>

  <p>13音素のハワイ語が最小記録を競うことがあり、<strong>ピダハン語</strong>の女性レジスターはさらに低い可能性もあるが、引き合いに出されるのは多くの場合ロトカス語だ。SIL（夏期言語学研究所）所属の宣教師言語学者夫妻<strong>アーウィン＆ジャクリーン・ファーチョウ</strong>が1969年に学術誌『Anthropological Linguistics』で発表した記述が基準となっている。彼らが確認したのは、調音位置は3つ、鼻音ゼロ、子音連続なしという、極端にミニマルな体系だった。</p>
  
  <ul>
    <li><strong>鼻音がない。</strong> 中央方言では <em>m, n, ng</em> が音素として<strong>完全に欠如</strong>している、世界でも稀な例。ただし近隣のアイタ方言には鼻音がある。鼻音が現れるのは、英語の単語を発音しようとするとき（<em>bye-bye</em> が [maemae] になるなど）や、外国人のロトカス語をまねるときといった周辺的な場面に限られる。それも <em>b, d, g</em> の自由変異であって、独立した音素ではない。</li>
    <li><strong>極小子音体系。</strong> <em>p</em> と <em>β</em>（母音間のスペイン語 b に似た弱い両唇摩擦音）、<em>t</em> と <em>ɾ</em>（はじき音）、<em>k</em> と <em>ɡ</em>。無声3、有声3が対称に並ぶ。</li>
    <li><strong>単純な音節。</strong> 音節はせいぜい「子音1＋母音1」で、子音のない音節も多い。そのため長母音や母音の連なりがいたるところに現れる。<em>uukoa</em>「水」、<em>aio</em>「食べる」といった具合だ。</li>
  </ul>
  
  <p>当然の帰結として、ロトカス語の単語は他言語より<strong>長くなる傾向</strong>がある。音の種類が少ない以上、組み合わせで区別をつけるほかない。体の部位の名前を見ると雰囲気がつかめる。<em>uvareoua</em>「耳」、<em>iruvaoto</em>「鼻」、<em>arevuoto</em>「舌」。単純な音節の反復が、歌のようなリズムを生む。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="roo,haw,mi">🗣 ロトカス・ハワイ・マオリを比べる</button>
  </div>
  
  <p>ロトカス語は<strong>北ブーゲンビル語族</strong>に属する。島の周囲を取り囲むオーストロネシア語族の海岸諸語とも、南ブーゲンビル諸語とも血縁関係はない。この孤立性が音体系の徹底的な簡素化を招いた、と考えたくなるところだが、共同体の規模だけではほとんど説明がつかない。知られている中で最大級の音体系を持つタア語は、話者がさらに少なく、2011年で約2500人なのだ。簡素化の道筋は、隣のアイタ方言が教えてくれる。アイタ方言にはいまも <em>m</em> と <em>n</em> があり（アイタ方言の <em>emaoto</em>「木」は中央方言では <em>ebaoto</em>）、中央ロトカス語は鼻音を有声破裂音に合流させたらしい。</p>
  
  <p>マディソンのUPSID調査──『音のパターン』（1984年）の基礎となった317言語のサンプル──では、音素目録の規模は最少11（ロトカス語とピダハン語）から最多141（!Xũ語）まで広がる。ロトカス語はその最下端に並んでいる。</p>
  
  <p>ブーゲンビルは1988〜1998年の内戦、パングナ鉱山の閉鎖、2019年独立住民投票後の交渉と、激動の20世紀末を経た。それでもロトカス語は、書き言葉の伝統を手にしたまま乗り越えた。わずか12文字のアルファベットと、1982年に刊行された新約聖書『<em>Airepa Vae Reo Ovoi</em>』である。いまも多くの大人にとってロトカス語は日常の言葉だが、若い世代ではトクピシン語や英語を使うことが増えている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-6.20" data-lng="155.30" data-zoom="8" data-tiles="terrain">🌋 クラウン・プリンス山脈を拡大</button>
  </div>
  
  <p>音素目録が小さいことは、言語習得が必ず容易になることを意味しない。ロトカス語とタア語の記述を比較すると、人間言語で確認されている音素目録の幅が非常に大きいことが分かる。</p>
        `,
      },
      sources: [
        { text: "eBible.org: Rotokas New Testament (Airepa Vae Reo Ovoi)", url: "https://ebible.org/bible/details.php?id=roo" },
        { text: "Wikipedia: Rotokas language", url: "https://en.wikipedia.org/wiki/Rotokas_language" },
        'Firchow, Irwin B.; Firchow, Jacqueline (1969). "An Abbreviated Phoneme Inventory." Anthropological Linguistics 11(9): 271–276.',
        'Robinson, Stuart (2006). "The Phoneme Inventory of the Aita Dialect of Rotokas." Oceanic Linguistics 45(1): 206–209.',
        'Maddieson, Ian (1984). Patterns of Sounds. Cambridge University Press.',
        'Allen, Jerry; Hurd, Conrad (1963). Languages of the Bougainville District. Department of Information and Extension Services, Port Moresby.',
        { text: 'Glottolog: Rotokas (roto1249)', url: 'https://glottolog.org/resource/languoid/id/roto1249' },
        { text: 'WALS: Rotokas', url: 'https://wals.info/languoid/lect/wals_code_rtk' },
      ],
    },
    {
      id: 'ubykh-last-speaker',
      icon: '🕯️',
      tags: ['extinct', 'caucasian', 'phonology', 'language-death'],
      title: {
        en: 'Ubykh — documenting a language with about 84 consonants',
        ja: 'ウビフ語 — 子音84個の言語が消えた日',
      },
      summary: {
        en: 'Ubykh, a Northwest Caucasian language with about 84 consonants and two phonemic vowels, lost its last fully fluent speaker when Tevfik Esenç died in 1992. Georges Dumézil and other scholars recorded it over several decades.',
        ja: '1992年10月7日、テヴフィク・エセンチがトルコの村で世を去り、子音84・母音2のウビフ語も彼とともに消えた。半世紀にわたりこの言語を記録し続けたのは、フランスの碩学ジョルジュ・デュメジルだった。',
      },
      body: {
        en: `
  <p>The exact moment a language dies is rarely datable. <strong>Ubykh</strong> is the exception. On <strong>7 October 1992</strong>, in the Turkish village of <strong>Hacıosman</strong> south of the Sea of Marmara, an 88-year-old former village headman and retired civil servant named <strong>Tevfik Esenç</strong> died in the night. He was the last fully fluent speaker of a language that had, until little more than a century earlier, been the everyday tongue of tens of thousands of people on the Black Sea coast of the Caucasus.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="uby" data-zoom="6">🌍 Show Ubykh on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="43.60" data-lng="39.70" data-zoom="6" data-label="Sochi">🗺️ Fly to Ubykh's lost homeland (Sochi)</button>
  </div>
  
  <p>Ubykh belonged to the <strong>Northwest Caucasian</strong> family, alongside Abkhaz, Abaza, Adyghe and Kabardian. Its homeland was the strip of coast around what is now the Russian resort city of <strong>Sochi</strong>. After Imperial Russia's conquest of the Caucasus in the 1860s, almost the entire Ubykh population was forcibly deported across the Black Sea to Ottoman territory — a tragedy now remembered as the <em>muhajir</em> exile. Settled in scattered villages in Anatolia, the community switched, generation by generation, to Turkish and to Circassian. Ubykh retreated first into the home, then to the oldest villagers, until only a few elderly speakers were left for linguists to find.</p>
  
  <p>Ubykh is especially well known for its phoneme inventory:</p>
  
  <ul>
    <li><strong>84 phonemic consonants.</strong> Pharyngealised, labialised, palatalised, ejective — every parameter that can multiply a consonant series, Ubykh used. Published counts range from about 80 to 84, depending on whether four consonants found only in loanwords and sound-words are included. Even 84 is a record only among languages without clicks: Guinness once listed Ubykh as the world record holder, but since 2017 it has credited !Xóõ (Taa) of southern Africa, with about 130.</li>
    <li><strong>Two or three vowels.</strong> The classic analysis has just <em>/ə/</em> and <em>/a/</em>, and some linguists reduce even that to one vowel whose colour comes from the consonants around it. Rhona Fenwick's 2011 grammar argues for a third (Dumézil's long <em>aa</em>), citing a minimal triplet: <em>ɐsʃɨn</em> "I milk it", <em>ɐsʃɜn</em> "I reap it", <em>ɐsʃɐn</em> "I milk them / I reap them". Either way, the consonants carry almost all the load.</li>
    <li><strong>Polypersonal verb morphology.</strong> A single Ubykh verb can encode subject, direct object, indirect object, location, direction, instrument and benefactive arguments in one tightly stacked word — a structural feature shared with its Northwest Caucasian cousins.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="ab,ady,kbd">🗣 Compare Ubykh's surviving cousins (Abkhaz, Adyghe, Kabardian)</button>
  </div>
  
  <p>Almost everything we know about Ubykh in the 20th century we owe to the French Indo-Europeanist and comparative mythologist <strong>Georges Dumézil</strong>. Dumézil first recorded Ubykh in Turkey in 1930 (the same year the Hungarian linguist Julius von Mészáros took the notes that founded Ubykh linguistics) and kept returning to it for the rest of his long career. He produced a series of grammatical descriptions and text collections, including the <em>Documents anatoliens sur les langues et les traditions du Caucase</em> series (vol. III: <em>Nouvelles études oubykhs</em>, 1965) — that remain foundational. Esenç, who by then worked in Istanbul, became Dumézil's principal consultant, and the two worked together until Dumézil's death in 1986. Dumézil regarded Esenç's careful, purist Ubykh as the closest thing the language had to a literary standard.</p>
  
  <blockquote>"Tevfik Esenç — recite a Fatiha for his soul — who immortalised the Ubykh language, the last Ubykh who could write and speak this language." — the Turkish epitaph on Esenç's gravestone</blockquote>
  
  <p>Esenç understood his role with unusual clarity. He memorised proverbs, songs, prayers, place names and folktales specifically so that they could be recorded. The stone that carries those words stands in the village cemetery at Hacıosman, and they are cut in Turkish — not in the language they commemorate. Norwegian linguist <strong>Hans Vogt</strong> produced the standard dictionary, <em>Dictionnaire de la langue oubykh</em> (1963), whose errors Dumézil later corrected. Dumézil's associate <strong>Georges Charachidzé</strong> worked with Esenç to the very end, and George Hewitt recorded him in Istanbul in 1974. Together with Dumézil's text editions, their work left thousands of pages and hours of audio, enough for Rhona Fenwick to write a full grammar of the language in 2011, nineteen years after it fell silent.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="40.50" data-lng="29.20" data-zoom="7">🕯️ Zoom into Hacıosman, Turkey</button>
  </div>
  
  <p>Today there are small groups of ethnic Ubykh in Turkey, Jordan and the United States who study the recordings, attempt limited revitalisation, and maintain a sense of identity through Circassian solidarity organisations. But no one has learned to speak it fluently again, with its 84 consonants and its densely packed verbs, and it is unlikely anyone will. Ubykh remains the textbook case of a language that was <strong>caught and described just in time</strong>, and then lost anyway.</p>
        `,
        ja: `
  <p>言語の死を正確な日付で言える例は少ない。<strong>ウビフ語</strong>はその例外だ。<strong>1992年10月7日</strong>、トルコ・マルマラ海南方の村<strong>ハジオスマン</strong>で、元村長で、退職した公務員でもあった88歳の<strong>テヴフィク・エセンチ</strong>が、夜のうちに息を引き取った。彼はウビフ語の最後の完全な話者だった。1世紀あまり前まで、コーカサスの黒海沿岸で数万人が日常的に話していた言語が、その瞬間に消えた。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="uby" data-zoom="6">🌍 地図でウビフ語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="43.60" data-lng="39.70" data-zoom="6" data-label="ソチ">🗺️ ウビフ族の失われた故郷（ソチ）へ</button>
  </div>
  
  <p>ウビフ語は<strong>北西コーカサス語族</strong>に属し、アブハズ語、アバザ語、アディゲ語、カバルド語と姉妹関係にある。本来の故地は、いまロシアのリゾート都市となっている<strong>ソチ</strong>周辺の細い海岸帯だった。1860年代の帝政ロシアによるコーカサス征服の結果、ウビフ族はほぼ全員が黒海の対岸オスマン領へ強制移住させられた──<em>ムハジル</em>（亡命者）と呼ばれる悲劇である。アナトリアの散在する村々に落ち着いた彼らは、世代ごとにトルコ語とチェルケス語へ切り替えていった。ウビフ語はまず家庭の中へ、次いで村のいちばんの年寄りたちの間へと退き、ついには言語学者が探し当てられるのは数人の老いた話者だけになった。</p>
  
  <p>音韻論の観点でウビフ語を異形にしているのは、その音素体系だ。</p>
  
  <ul>
    <li><strong>子音音素84個。</strong> 咽頭化・唇音化・口蓋化・放出音──子音系列を増やす要素はすべて使われている。研究者によって80前後から84まで数え方は揺れる。外来語や擬音語にしか現れない4つの子音を含めるかどうかの違いだ。しかも84でさえ、記録と言えるのは吸着音を持たない言語の中での話である。ギネスはかつてウビフ語を世界記録保持者としていたが、2017年からは約130の子音を持つ南部アフリカの!Xóõ語（タア語）を認定している。</li>
    <li><strong>母音は2つか3つ。</strong> 古典的な分析では <em>/ə/</em> と <em>/a/</em> の2つだけで、それすら、前後の子音で色合いが決まる1つの母音にまとめる言語学者もいる。ロナ・フェンウィックの2011年の文法書は3つ目の母音（デュメジルの長い <em>aa</em>）を認め、最小三つ組を挙げている。<em>ɐsʃɨn</em>「私はそれの乳を搾る」、<em>ɐsʃɜn</em>「私はそれを刈る」、<em>ɐsʃɐn</em>「私はそれらの乳を搾る／それらを刈る」。いずれにせよ、重荷のほとんどは子音が背負っている。</li>
    <li><strong>多人称動詞形態。</strong> 一語のウビフ語動詞に主語・直接目的語・間接目的語・場所・方向・道具・受益者を同時に詰め込める。これは北西コーカサス諸語に共通する特徴である。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="ab,ady,kbd">🗣 ウビフ語の生き残った姉妹語を比べる</button>
  </div>
  
  <p>20世紀のウビフ語に関する知識のほとんどは、フランスの印欧語学者で比較神話学者の<strong>ジョルジュ・デュメジル</strong>に負っている。デュメジルが初めてトルコでウビフ語を記録したのは1930年のこと（同じ年、ハンガリーの言語学者ユリウス・フォン・メーサーロシュが、ウビフ語研究の礎となるノートを取っている）。以後、長い研究生活の最後まで、彼は繰り返しこの言語に立ち返った。文法記述とテキスト集を次々に発表し、なかでも『コーカサスの言語と伝承に関するアナトリア文書』第3巻『ウビフ語新研究』（<em>Nouvelles études oubykhs</em>、1965年）は今日も基礎文献であり続けている。当時イスタンブールで働いていたエセンチがデュメジルの主要なインフォーマントとなり、二人は1986年のデュメジルの死まで協働した。デュメジルは、エセンチの丁寧で純正なウビフ語を、この言語にとって文語の標準にもっとも近いものとみなしていた。</p>
  
  <blockquote>「テヴフィク・エセンチ──その魂にファーティハを──ウビフ語を不滅にした人、この言語を書き、話すことのできた最後のウビフ人」── エセンチの墓石に刻まれたトルコ語の墓碑銘</blockquote>
  
  <p>エセンチは自らの役割を異例の明晰さで理解していた。ことわざ、歌、祈り、地名、民話を意図的に記憶し、録音されるべき形で残した。その言葉を刻んだ石はハジオスマン村の墓地に立つ。彫られているのはウビフ語ではなく、トルコ語である。ノルウェーの言語学者<strong>ハンス・フォクト</strong>は標準的な辞典『ウビフ語辞典』（<em>Dictionnaire de la langue oubykh</em>、1963年）を編み、その誤りはのちにデュメジルが訂正した。デュメジルの協力者<strong>ジョルジュ・シャラシゼ</strong>は最後の最後までエセンチとともに仕事をし、ジョージ・ヒューイットは1974年にイスタンブールでエセンチを録音した。デュメジルのテキスト校訂と併せ、彼らの仕事は何千ページもの資料と何時間もの音声を残した。それがあったからこそ、ロナ・フェンウィックは、この言語が沈黙してから19年後の2011年に、ウビフ語の本格的な文法書を書き上げることができたのである。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="40.50" data-lng="29.20" data-zoom="7">🕯️ ハジオスマン村へズーム</button>
  </div>
  
  <p>現在もトルコ、ヨルダン、アメリカに少数のウビフ系住民がおり、録音を学びチェルケス連帯運動を通じてアイデンティティを保っている。だが84の子音とぎっしり詰まった動詞を持つこの言語を、再び流暢に話せるようになった人はおらず、これからもまず現れないだろう。ウビフ語は<strong>「ぎりぎり間に合って記述され、それでも失われた言語」</strong>の教科書的事例である。</p>
        `,
      },
      sources: [
        { text: "Guinness World Records: Language with most consonants", url: "https://www.guinnessworldrecords.com/world-records/67421-language-with-most-consonants" },
        { text: "Wikipedia: Tevfik Esenç", url: "https://en.wikipedia.org/wiki/Tevfik_Esenç" },
        'Dumézil, Georges (1965). Documents anatoliens sur les langues et les traditions du Caucase, III: Nouvelles études oubykhs. Institut d\'Ethnologie, Paris (Travaux et Mémoires de l\'Institut d\'Ethnologie, 71).',
        'Vogt, Hans (1963). Dictionnaire de la langue oubykh. Universitetsforlaget, Oslo.',
        'Charachidzé, Georges (1989). "Ubykh." In B. G. Hewitt (ed.), The Indigenous Languages of the Caucasus, vol. 2: The North West Caucasian Languages. Caravan Books, pp. 357–459.',
        'Hewitt, B. George (2005). "North West Caucasian." Lingua 115(1–2): 91–145.',
        'Fenwick, Rohan S. H. (2011). A Grammar of Ubykh. LINCOM Europa.',
        { text: 'Glottolog: Ubykh (ubyk1235)', url: 'https://glottolog.org/resource/languoid/id/ubyk1235' },
        { text: 'Endangered Languages Project: Ubykh', url: 'https://www.endangeredlanguages.com/lang/1842' },
      ],
    },
    {
      id: 'damin-secret-language',
      icon: '🔒',
      tags: ['ritual', 'australia', 'secret-language', 'phonology'],
      title: {
        en: 'Damin — a ceremonial register with clicks and ingressive sounds',
        ja: 'ダミン語 — オーストラリアの音韻常識を破った男性秘密言語',
      },
      summary: {
        en: 'Damin was used by initiated Lardil men on Mornington Island. Its small vocabulary and use of clicks, ingressive laterals and ejectives set it apart from neighbouring Australian sound systems.',
        ja: 'モーニントン島で成人儀礼を経た男性のみが用いたダミン語は、ラーディル語の語彙を約200語に圧縮し、吸気側面音や放出音など「オーストラリアにあり得ない音」を体系的に持っていた。',
      },
      body: {
        en: `
  <p>More than 250 Indigenous languages of Australia share a broadly similar set of speech sounds: stops at four to six places of articulation, usually with no voicing contrast,, matching nasals, a few laterals, two rhotics, and no clicks, ejectives, implosives, or ingressive sounds. <strong>Damin</strong> differs sharply from that pattern.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="lbz_damin" data-zoom="6">🌍 Show Damin on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-16.6" data-lng="139.5" data-zoom="6">🗺️ Fly to Mornington Island</button>
  </div>
  
  <p>Damin (sometimes spelled <em>Demiin</em>) was the <strong>secret auxiliary register</strong> of the <strong>Lardil</strong> and neighbouring <strong>Yangkaal</strong> peoples of Mornington Island and Forsyth Island, in the southern Gulf of Carpentaria. It was taught only to men who had passed through the second stage of the <em>Warama</em> initiation ceremony, and was used in the ritual seclusion period immediately after. Outside that ceremonial context it was, at least in principle, forbidden to speak. By the time the language was first systematically recorded — by the American linguist <strong>Kenneth Hale</strong> in the 1960s — the last <em>warama</em> ceremony had been held in the 1950s, and only a handful of older men still remembered the system.</p>
  
  <p>Hale found that Damin was not a separate language: it retained Lardil grammar almost wholesale. It did, however, have its own vocabulary of <strong>roughly 200 lexical items</strong>. A rule of semantic compression mapped each item onto a class of Lardil words. <em>n!aa</em>, for example, covered ego and ego's own group, while <em>n!uu</em> covered everyone else; Lardil's nineteen pronouns were thus reduced to two. A speaker who knew the 200 Damin items could in principle express anything that Lardil could express, at a more abstract level. Anything more specific had to be paraphrased: a sandpiper became a "person-burning creature", and opposites were made with <em>kurri-</em> "not", so <em>j2iwu</em> "small" gave <em>kurrij2iwu</em> "large".</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="lbz,nny">🗣 Compare Lardil and Yangkaal</button>
  </div>
  
  <p>The phonology, though, was where Damin broke continental norms. It contained:</p>
  
  <ul>
    <li><strong>Nasal clicks</strong> at four places of articulation, among them a bilabial click <em>ʘ</em>, which is otherwise a regular consonant only in a few Khoisan languages of southern Africa. No other Australian language has clicks, and Damin is the only language outside Africa known to have used them as ordinary speech sounds.</li>
    <li><strong>An ingressive lateral fricative</strong>, articulated by sucking air inward over the sides of the tongue. Outside interjections and paralinguistic noises, speech sounds made on an in-breath are almost unknown: the only other well-documented case is Taa (ǃXóõ), whose nasal clicks can carry ingressive airflow, and no other language is known to have an ingressive fricative like Damin's.</li>
    <li><strong>Two ejectives</strong>, <em>p'</em> and <em>k'</em> — the first of them produced with velaric rather than laryngeal pressure — again unparalleled in the rest of Australia.</li>
    <li><strong>A bilabial trill</strong> (the lip-buzz of a shivering "brrr") and a bilabial "spurt" of air pushed out by the tongue: noises that elsewhere are play or rudeness, here pressed into linguistic service.</li>
  </ul>
  
  <blockquote>Damin's phonology was a deliberate departure from Lardil's, not a segment-by-segment recoding of it: alongside ordinary Australian stops — and the plain Lardil consonants that survive mainly in its grammatical suffixes — Damin used nasal clicks, a velar ejective <em>k'</em>, a bilabial trill and an ingressive lateral fricative, sounds attested nowhere else on the continent. — summarising Hale &amp; Nash, "Damin and Lardil phonotactics" (1997)</blockquote>
  
  <p>Damin bears on a broader question about Australian phonology. The familiar "Australian" profile is not an articulatory or biological limit: Lardil speakers, whose everyday sound system resembled those of neighbouring languages, could produce and teach this very different ritual register to teenage initiates. The relative uniformity of sound systems across the continent therefore calls for a cultural and sociolinguistic explanation, rather than an articulatory or cognitive one.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-16.55" data-lng="139.45" data-zoom="9">🪨 Zoom into Mornington Island</button>
  </div>
  
  <p>Damin is no longer in use. A Lardil cultural revival has brought back the first-stage <em>luruku</em> ceremony, but whether the <em>warama</em>, and with it Damin, will return is for the community to decide: a sacred register taught only to initiates cannot simply be "revived" from recordings. What remains is Hale's fieldnotes and a small body of follow-up work by <strong>Norvin Richards</strong> and others. Those records have made Damin an important case in discussions of phonology, despite its vocabulary of only about 200 words.</p>
        `,
        ja: `
  <p>オーストラリア大陸の250以上の先住民言語は、驚くほど似た音体系を共有している──4〜6箇所で調音される破裂音（ふつう有声・無声の対立はない）、対応する鼻音、いくつかの側面音、2種のR音。吸着音もなく、放出音もなく、吸気音もない。ところが<strong>ダミン語</strong>はそのすべてを破ってしまう。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="lbz_damin" data-zoom="6">🌍 地図でダミン語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-16.6" data-lng="139.5" data-zoom="6">🗺️ モーニントン島へ飛ぶ</button>
  </div>
  
  <p>ダミン語（<em>Demiin</em> とも）は、カーペンタリア湾南部のモーニントン島・フォーサイス島の<strong>ラーディル族</strong>および隣接する<strong>ヤンカール族</strong>が用いた<strong>儀礼用の秘密レジスター</strong>である。<em>ワラマ</em>成人儀礼の第二段階を経た男性のみに伝授され、儀礼後の隔離期間中に用いられた。それ以外の場面で話すことは原則として禁じられていた。アメリカの言語学者<strong>ケネス・ヘイル</strong>が1960年代に初めて体系的に記録したときには、最後の<em>ワラマ</em>儀礼が行われたのはすでに1950年代のことで、覚えている老人は数人しかいなかった。</p>
  
<p>ヘイルの分析では、ダミン語はラーディル語と別の文法を持つ言語ではなく、文法の大部分を共有する特殊なレジスターである。一方、独自の語彙は<strong>約200項目</strong>で、各項目がラーディル語の語彙クラスを広く覆う。たとえば <em>n!aa</em> は「自分と自分の側の人間」、<em>n!uu</em> は「それ以外のすべて」を指し、ラーディル語の19の代名詞に対応する領域を2語で表す。理屈の上では、ダミン語の200項目さえ知っていれば、ラーディル語で言えることは何でも、より抽象的なレベルで表現できた。それより具体的なことは言い換えるしかない。シギは「人を焼く生き物」になり、反対語は <em>kurri-</em>「〜でない」をつけて作った。<em>j2iwu</em>「小さい」から <em>kurrij2iwu</em>「大きい」、という具合である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="lbz,nny">🗣 ラーディル語とヤンカール語を比べる</button>
  </div>
  
  <p>大陸の常識を破ったのは音韻のほうだった。ダミン語は次のような音を持っていた。</p>
  
  <ul>
    <li><strong>鼻音吸着音（クリック）。</strong> 4つの調音位置にわたり、両唇吸着音 <em>ʘ</em> も含む。両唇吸着音を正規の子音として使うのは、ほかには南部アフリカのごく一部のコイサン系言語だけだ。オーストラリアの他の言語に吸着音はなく、アフリカの外で吸着音を普通の言語音として用いたことが知られているのはダミン語だけである。</li>
    <li><strong>吸気側面摩擦音。</strong> 舌の両側から空気を吸い込む音で、間投詞やパラ言語的な音を除けば、吸気で作る言語音はほとんど知られていない。ほかによく記述された例はタア語（!Xóõ）だけで、その鼻音吸着音が吸気を伴うことがある。ダミン語のような吸気の摩擦音を持つ言語は、ほかに一つも知られていない。</li>
    <li><strong>放出音は2つ</strong>、<em>p'</em> と <em>k'</em>。前者は喉頭ではなく軟口蓋の気流圧で作られる。これもオーストラリアでは他に例がない。</li>
    <li><strong>両唇震え音</strong>（寒さに震えて「ブルルッ」と言うときの唇の震え）と、舌で唇から空気を押し出す「噴出音」。よそでは遊びや無作法でしかない音を、言語の要素として取り込んだ例である。</li>
  </ul>
  
  <blockquote>ダミン語の音韻は、ラーディル語の音を一つずつ置き換えたものではなく、意図的な逸脱だった。オーストラリアでありふれた破裂音――そして主に文法接辞に残るラーディル語そのままの子音――に加え、ダミン語は鼻音吸着音、軟口蓋放出音 <em>k'</em>、両唇震え音、吸気側面摩擦音を用いた。いずれも大陸の他のどこにも見られない音である。── ヘイル&amp;ナッシュ「Damin and Lardil phonotactics」（1997年）の要約</blockquote>
  
  <p>ここから言語学者が引き出した結論は不穏かつ高揚的だ。<strong>「オーストラリアらしい音体系」は生物学的必然ではない</strong>。ラーディル語話者は、日常では他言語と変わらぬ素朴な音体系を使いながら、儀礼が要求すれば、吸着音や放出音を含む異様な音体系を作り出し、成人儀礼を経た十代の若者たちに、儀礼のたびに当然のこととして教え込んでいたのだ。何千キロにわたるオーストラリアの音体系の均一性を支えているのは、調音器官でも認知能力でもなく、<strong>文化と社会言語学</strong>である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-16.55" data-lng="139.45" data-zoom="9">🪨 モーニントン島を拡大</button>
  </div>
  
  <p>ダミン語はもう使われていない。ラーディルの文化復興によって成人儀礼の第一段階<em>ルルク</em>は復活したが、<em>ワラマ</em>が、そしてそれとともにダミン語が戻ってくるかどうかは、共同体自身が決めることだ。成人儀礼を経た者だけに授けられる聖なるレジスターは、録音から気軽に「復活」させられるものではない。残されたのはヘイルのフィールドノート、<strong>ノービン・リチャーズ</strong>らによるその後の研究、そして言語学の想像力に与えた巨大な影響だけだ。語彙わずか200のレジスターが、これほどまでに音韻論を揺さぶった例は他にない。</p>
        `,
      },
      sources: [
        { text: "Wikipedia: Damin", url: "https://en.wikipedia.org/wiki/Damin" },
        'Hale, Kenneth (1973). "Deep–surface canonical disparities in relation to analysis and change: An Australian example." In T. A. Sebeok (ed.), Current Trends in Linguistics 11: Diachronic, Areal, and Typological Linguistics. Mouton, pp. 401–458.',
        'Hale, Kenneth; Nash, David (1997). "Damin and Lardil phonotactics." In D. Tryon & M. Walsh (eds.), Boundary Rider: Essays in Honour of Geoffrey O\'Grady. Pacific Linguistics, pp. 247–259.',
        'McKnight, David (1999). People, Countries, and the Rainbow Serpent: Systems of Classification among the Lardil of Mornington Island. Oxford University Press.',
        'Evans, Nicholas (1995). A Grammar of Kayardild, with Historical-Comparative Notes on Tangkic. Mouton de Gruyter.',
        'Hale, Kenneth (1971). "A note on a Walbiri tradition of antonymy." In D. Steinberg & L. Jakobovits (eds.), Semantics. Cambridge University Press, pp. 472–482.',
        { text: 'Glottolog: Lardil (lard1243)', url: 'https://glottolog.org/resource/languoid/id/lard1243' },
        { text: 'AIATSIS: Lardil collection', url: 'https://collection.aiatsis.gov.au/austlang/language/g38' },
      ],
    },
    {
      id: 'khoisan-clicks',
      icon: '👅',
      tags: ['clicks', 'phonology', 'africa', 'isolate'],
      title: {
        en: 'Click consonants — the sounds that jumped between language families',
        ja: '吸着音 — 語族の壁を飛び越えた音',
      },
      summary: {
        en: 'Dental, lateral, alveolar, palatal and bilabial clicks occur across several southern African language families. Contact with Khoe-speaking communities also introduced clicks into Bantu languages including Zulu and Xhosa.',
        ja: '5系統の吸着音──歯音・側面・歯茎・硬口蓋・両唇──は南部アフリカのコエ語族・トゥー語族とハッザ語に発生し、コエコエ系民族との数百年にわたる接触を経てズールー語・コサ語などバントゥー諸語にも飛び移った。',
      },
      body: {
        en: `
  <p>English speakers click all the time — the "tut-tut" of disapproval, the cluck that urges on a horse, the smack of a blown kiss — but only <em>paralinguistically</em>: as noises around speech, never as consonants inside words. In <strong>southern Africa</strong>, by contrast, several language families have made clicks into real consonants: building blocks of ordinary words, indistinguishable in status from <em>p</em> and <em>t</em> in English.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="hts" data-zoom="6">🌍 Show Hadza on the map</button>
  </div>
  
  <p>The traditional cluster of "click languages" comprises three completely unrelated lineages:</p>
  
  <ul>
    <li><strong>Khoe</strong> — the family that includes Khoekhoegowab (Nama–Damara) of Namibia, Naro and Gǀui of Botswana, and several smaller languages of the Kalahari fringe.</li>
    <li><strong>Tuu</strong> — the southern group that includes <em>Taa (!Xóõ)</em>, the consonant-record holder featured elsewhere in this trivia collection, plus the moribund N|uu of South Africa.</li>
    <li><strong>Kx'a</strong> — a small family containing Juǀ'hoan and ǂHoan, with elaborate click inventories of their own.</li>
  </ul>
  
  <p>To these three families one usually adds <strong>two isolates of East Africa</strong>: <strong>Hadza</strong>, spoken by perhaps a thousand hunter-gatherers around Lake Eyasi in Tanzania, and <strong>Sandawe</strong>, about 150 km to the south in the rocky uplands of Dodoma Region. Both have clicks, but they sit differently: <strong>Hadza</strong> has no demonstrated relatives anywhere, while <strong>Sandawe</strong> may be a distant relative of the Khoe family — a link Tom Güldemann and Edward Elderkin have argued on lexical and pronominal evidence is promising, though short of proven. The old umbrella term "Khoisan" lumped all five together, but Güldemann and others have argued — convincingly — that <strong>Khoisan is an areal grouping, not a genetic family</strong>.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="hts,sad,naq,xh,zu">🗣 Compare Hadza, Sandawe, Khoekhoe, Xhosa, Zulu</button>
  </div>
  
  <p>Phoneticians distinguish <strong>five primary click types</strong> by where the front closure is made:</p>
  
  <ul>
    <li><strong>Bilabial</strong> <em>ʘ</em> — a kiss-like pop made with the lips. Rarest of all: a regular consonant only in a few Tuu languages such as Taa and Nǀuu, in ǂʼAmkoe (ǂHoan), and in the Australian ritual register Damin.</li>
    <li><strong>Dental</strong> <em>|</em> — the sound English speakers make as "tut-tut".</li>
    <li><strong>Alveolar</strong> <em>!</em> — a sharp pop made by snapping the tongue from the alveolar ridge, rather like a cork leaving a bottle; written <em>q</em> in Xhosa and Zulu.</li>
    <li><strong>Palatal</strong> <em>ǂ</em> — the flat tongue is pulled sharply back off the hard palate, giving a crisp crack like snapped fingers. Like the alveolar click it has an abrupt release; the bilabial, dental and lateral clicks are noisier, more drawn-out sounds.</li>
    <li><strong>Lateral</strong> <em>||</em> — a side-of-tongue click sometimes used by English speakers to urge a horse on; this is the click in <em>Xhosa</em>'s own name, written <em>xh</em>.</li>
  </ul>
  
  <p>Each click can then be <em>accompanied</em> by voicing, aspiration, nasalisation, glottalisation, and combined with uvular or ejective releases. Multiplying the parameters out gives some Khoe and Tuu languages click inventories larger than the entire consonant systems of well-known languages elsewhere.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="naq" data-zoom="6">🌍 Show Khoekhoe (Nama)</button>
  </div>
  
  <p>The most striking sociolinguistic fact about clicks is that they <strong>jumped families</strong>. The Bantu languages <strong>Zulu</strong>, <strong>Xhosa</strong>, <strong>Southern Sotho</strong> and <strong>Swati</strong> all have phonemic clicks — three click types in Zulu and Xhosa, a single one in Southern Sotho and Swati — even though the vast majority of Bantu languages have none. (A second, separate cluster of Bantu click languages, among them Yeyi, Fwe and Mbukushu, lies far to the north-west around the Okavango and Zambezi.) The explanation, pieced together by linguists such as <strong>Anthony Traill</strong> and <strong>Rainer Vossen</strong>, runs roughly as follows: as Bantu-speaking farmers spread into what is now South Africa (pioneers had reached the KwaZulu-Natal coast by about 300 CE), they encountered, intermarried with and partly absorbed Khoe and San communities. The bilingual generations who grew up in mixed households brought clicks across the family boundary, especially in respectful and ritual vocabulary. The name <em>isiXhosa</em> carries one itself: straight after the noun-class prefix, the <em>xh</em> is an aspirated lateral click. And it happened early: comparing the Nguni languages, Hilde Gunnink (2022) reconstructs a whole set of clicks for Proto-Nguni, the common ancestor of Zulu and Xhosa, including a palatal click that no living Nguni language still uses as such.</p>

  <p style="background:rgba(255,237,190,0.55);border-left:3px solid #b8860b;padding:10px 14px;font-style:italic;border-radius:0 6px 6px 0">If you click <strong>Compare</strong> above, you'll notice how rarely one of this map's everyday basic words actually <em>contains</em> a click in Xhosa or Zulu. That's the second half of the story: clicks in Bantu live almost entirely in <strong>cultural and respectful vocabulary</strong> — names (<em>iXhosa</em>, <em>uXamu</em>), animals (<em>iqaqa</em> "polecat", <em>ixoxo</em> "frog"), greetings, taboo replacements in <em>hlonipha</em> avoidance speech, and Khoekhoe loans (Xhosa <em>icawa</em> "church", also "Sunday"). Inherited Bantu words for water / fire / sun / hand / eye remain click-free — though <em>iqanda</em> "egg" carries one in both languages, and so does Zulu <em>iqhwa</em> "snow".</p>

  <p>The mechanism is now reasonably well reconstructed. Pakendorf, Gunnink, Sands and Bostoen (2017), combining linguistic and genetic evidence, conclude that the copying of clicks accompanied large-scale inmarriage of Khoisan women into Bantu-speaking communities, at a time when Khoisan communities may have had relatively high prestige. An earlier study of Bantu click languages near the Okavango (Gunnink and colleagues, 2015) adds that Khoisan speakers who shifted to a Bantu language probably carried some of their own sounds and structures with them. On that account clicks did not arrive the way a casual loanword arrives: they came through households in which children grew up hearing both languages, and once a generation had them, they were simply native consonants.</p>
  
  <p>Beyond southern Africa, robust documented cases are the East African isolates <strong>Hadza</strong> and <strong>Sandawe</strong>, the Cushitic language <strong>Dahalo</strong> of coastal Kenya, plus the special ritual register <strong>Damin</strong> in Australia — used by initiated men of Mornington Island rather than as an ordinary spoken language. Dahalo is the odd one out: its clicks survive in only about forty words, several of them basic vocabulary, and are generally read as a substrate relic left behind when its speakers shifted to Cushitic. In southern Africa, clicks have been kept for thousands of years in the three Khoisan families, and for well over a thousand they have also been passing into a fourth, Bantu.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-25" data-lng="22" data-zoom="4">🌍 Survey the click belt of southern Africa</button>
  </div>
  
  <p>Whether clicks are an archaic feature inherited from very early African populations, a regional innovation strengthened through contact, or a combination of both remains debated. Their status as <strong>fully functional phonemes</strong> does not: children acquire them as part of their ordinary sound system, as they acquire any other consonant.</p>
        `,
        ja: `
  <p>英語話者だって、舌や唇はしょっちゅう鳴らしている──非難の「チッチッ」、馬を急かす舌鼓、投げキッスの「チュッ」。だがそれはあくまで<em>パラ言語的</em>な音、つまり話の周りで鳴る音であって、単語の中の子音になることは決してない。これに対し<strong>南部アフリカ</strong>の複数の言語族では、吸着音は正真正銘の子音である。英語の <em>p</em> や <em>t</em> と同じ資格で普通の単語の中に組み込まれている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="hts" data-zoom="6">🌍 ハッザ語を地図で見る</button>
  </div>
  
  <p>従来「クリック言語」と総称されてきたのは、互いに系統関係のない3つの語族である。</p>
  
  <ul>
    <li><strong>コエ語族</strong>──ナミビアのコエコエゴワブ語（ナマ＝ダマラ語）、ボツワナのナロ語・グイ語（Gǀui）、カラハリ縁辺のいくつかの言語。</li>
    <li><strong>トゥー語族</strong>──子音の数で世界記録を持つタア語（!Xóõ）や、瀕死状態の南アフリカのンウー語（N|uu）など。</li>
    <li><strong>クサ語族</strong>──ジュホアン語、ホアン語など。豊富な吸着音体系を持つ。</li>
  </ul>
  
  <p>これに東アフリカの2つの<strong>孤立言語</strong>──タンザニアのエヤシ湖周辺で約千人の狩猟採集民に話される<strong>ハッザ語</strong>、その南方約150キロ、ドドマ州の岩がちな高地の<strong>サンダウェ語</strong>──を加える。両者とも吸着音を持つが、立場は異なる。ハッザ語には系統関係の立証された親戚がどこにもない。一方サンダウェ語はコエ語族の遠縁である可能性があり、トム・ギュルデマンとエドワード・エルダーキンは語彙と代名詞体系の証拠からこれを有望な仮説だと論じている（ただし証明には至っていない）。古い総称「コイサン語族」は5系統をひとくくりにしていたが、ギュルデマンらの研究により、近年は<strong>「地域的グループ化であって系統的な語族ではない」</strong>と結論されている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="hts,sad,naq,xh,zu">🗣 ハッザ・サンダウェ・コエコエ・コサ・ズールーを比較</button>
  </div>
  
  <p>音声学的には<strong>5系統の主要吸着音</strong>が区別される。</p>
  
  <ul>
    <li><strong>両唇吸着音</strong> <em>ʘ</em>──キスのような破裂音。もっとも珍しい吸着音で、正規の子音として使うのはタア語やンウー語（N|uu）など一部のトゥー語族の言語、ǂʼアムコエ語（ホアン語）、そしてオーストラリアの儀礼レジスターであるダミン語だけだ。</li>
    <li><strong>歯音</strong> <em>|</em>──英語話者が「ちっ」と舌打ちする音。</li>
    <li><strong>歯茎</strong> <em>!</em>──舌を歯茎から鋭く離す、瓶からコルクを抜くような破裂音。コサ語・ズールー語では <em>q</em> と綴る。</li>
    <li><strong>硬口蓋</strong> <em>ǂ</em>──平らにした舌を硬口蓋から鋭く引きはがす音で、指をパチンと鳴らしたような乾いた破裂音になる。歯茎吸着音と同じく解放が一瞬で終わるのに対し、両唇・歯音・側面の吸着音は、もっと雑音まじりで尾を引く音である。</li>
    <li><strong>側面</strong> <em>||</em>──舌側面を弾く音。英語話者が馬を急かす際に使う音。民族名 <em>Xhosa</em> の <em>xh</em> がこれである。</li>
  </ul>
  
  <p>各吸着音はさらに有声・有気・鼻音化・声門化、口蓋垂・放出と組み合わせて分化する。コエ語族・トゥー語族のいくつかでは、吸着音だけで他言語の全子音体系を上回る。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="naq" data-zoom="6">🌍 コエコエ（ナマ）語を表示</button>
  </div>
  
  <p>社会言語学的にもっとも興味深いのは、吸着音が<strong>語族を飛び越えた</strong>事実だ。バントゥー諸語の<strong>ズールー語</strong>、<strong>コサ語</strong>、<strong>南ソト語</strong>、<strong>スワティ語</strong>も吸着音を音素として持つ。ズールー語とコサ語は3種、南ソト語とスワティ語は1種だけだが、バントゥー諸語の大多数には吸着音などまったくないのだから、これは際立っている（なお、これとは別系統のバントゥー系吸着音言語の一群──イェイ語、フウェ語、ムブクシュ語など──が、はるか北西のオカヴァンゴ川・ザンベジ川流域にある）。アンソニー・トレイルやライナー・フォッセンら言語学者が組み立ててきた説明は、おおよそこうだ──バントゥー系農耕民が現在の南アフリカへと広がっていく過程で（先駆けの集団は紀元300年ごろまでにクワズール・ナタール沿岸に達していた）、コエ系・サン系の人々と混血・統合し、混合家庭で育ったバイリンガル世代が、敬語や儀礼語彙を中心に吸着音を持ち込んだのである。民族名 <em>isiXhosa</em> にもそれは残っている──接頭辞のすぐあとの <em>xh</em> が有気の側面吸着音である。しかも、この移入は早い時期に起きていた。ヒルデ・グンニンク（2022）はングニ諸語を比較し、ズールー語とコサ語の共通祖先であるングニ祖語に吸着音のひとそろいを再構している。そこには、現存するどのングニ系言語でももはや本来の形では使われていない硬口蓋吸着音まで含まれる。</p>

  <p style="background:rgba(255,237,190,0.55);border-left:3px solid #b8860b;padding:10px 14px;font-style:italic;border-radius:0 6px 6px 0">上の「比較」ボタンを押すと、コサ語・ズールー語では、この地図の基本語彙で吸着音を含む語はごくわずかしかないことに気づくはずだ──両語の「卵」<em>iqanda</em>、そしてズールー語の「雪」<em>iqhwa</em>、ほぼそれだけである。これがもう一つのポイント。バントゥー語族における吸着音は<strong>文化・敬語・儀礼の語彙</strong>にほぼ集中している──民族名（<em>iXhosa</em>、<em>uXamu</em>）、動物名（<em>iqaqa</em>「ケナガイタチ」、<em>ixoxo</em>「カエル」）、挨拶、義母などへの婉曲語（<em>hlonipha</em> 回避語法）、コエコエ語からの借用語（コサ語の <em>icawa</em>「教会」、「日曜日」の意味にも）など。「水・火・太陽・手・目」といったバントゥー祖語から継承された基本語彙には吸着音は出てこない。</p>

  <p>この移入の経路は、いまではかなり明確に再構されている。Pakendorf・Gunnink・Sands・Bostoen (2017) は言語学と遺伝学の証拠を突き合わせ、吸着音の取り込みは、コイサン系の女性がバントゥー系共同体へ大規模に嫁入りした過程に伴うもので、当時はコイサン系共同体のほうが比較的高い威信を持っていた可能性があると結論づけている。オカヴァンゴ周辺のバントゥー系吸着音言語を扱ったそれ以前の研究（グンニンクら、2015）も、バントゥー語へ言語交替したコイサン系の話者が、自分たちの音や構造の一部をおそらく一緒に持ち込んだのだろうと補足している。つまり吸着音は、ふつうの借用語のように入ってきたのではない。二つの言語が飛び交う家庭で子どもが育ち、その世代が身につけてしまえば、それはもう外来の音ではなく母語の子音だった、ということである。</p>
  
<p>南部アフリカ以外で吸着音が確認されるのは、東アフリカの<strong>ハッザ</strong>・<strong>サンダウェ</strong>、ケニア沿岸のクシ系言語<strong>ダハロ語</strong>、オーストラリアの儀礼レジスター<strong>ダミン語</strong>などである。ダハロ語では吸着音が残るのは40語ほどで、話者がクシ系言語へ言語交替した際の基層の名残と見る分析がある。南部アフリカでは、吸着音はコイサン系の3つの語族で数千年にわたって受け継がれ、さらに千年をゆうに超える昔から、4つ目の語族であるバントゥー語族にも流れ込み続けている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-25" data-lng="22" data-zoom="4">🌍 南部アフリカの吸着音圏を俯瞰</button>
  </div>
  
  <p>吸着音が古代アフリカ人口に由来する古特徴なのか、接触によって増幅された地域革新なのか、両者の合成なのかはまだ議論中である。だが一つ確かなのは、吸着音は<strong>正真正銘の音素</strong>であり、現地の子どもたちは他のどの子音と同じ容易さで習得するという事実だ。「異国的」に見えるかどうかは、自分がたまたまどこで育ったかの問題にすぎない。</p>
        `,
      },
      sources: [
        { text: "Gunnink, Hilde; Sands, Bonny; Pakendorf, Brigitte; Bostoen, Koen (2015). \"Prehistoric language contact in the Kavango-Zambezi transfrontier area: Khoisan influence on southwestern Bantu languages.\" Journal of African Languages and Linguistics 36(2).", url: "https://doi.org/10.1515/jall-2015-0009" },
        { text: "Gunnink, Hilde (2022). \"The early history of clicks in Nguni.\" Diachronica 39(3): 311–368.", url: "https://doi.org/10.1075/dia.19061.gun" },
        'Traill, Anthony (1995). "The Khoesan languages of southern Africa." In R. Mesthrie (ed.), Language and Social History: Studies in South African Sociolinguistics. David Philip, pp. 1–18.',
        'Güldemann, Tom (2014). "\'Khoisan\' linguistic classification today." In T. Güldemann & A.-M. Fehn (eds.), Beyond \'Khoisan\': Historical Relations in the Kalahari Basin. John Benjamins, pp. 1–40.',
        'Vossen, Rainer (ed.) (2013). The Khoesan Languages. Routledge.',
        'Sands, Bonny (1998). Eastern and Southern African Khoisan: Evaluating Claims of Distant Linguistic Relationships. Rüdiger Köppe Verlag.',
        'Miller, Amanda L. (2011). "The representation of clicks." In M. van Oostendorp et al. (eds.), The Blackwell Companion to Phonology. Wiley-Blackwell, pp. 416–439.',
        'Pakendorf, Brigitte; Gunnink, Hilde; Sands, Bonny; Bostoen, Koen (2017). "Prehistoric Bantu–Khoisan language contact: A cross-disciplinary approach." Language Dynamics and Change 7(1): 1–46.',
        { text: 'Glottolog: Hadza (hadz1240)', url: 'https://glottolog.org/resource/languoid/id/hadz1240' },
        { text: 'WALS: Presence of Uncommon Consonants', url: 'https://wals.info/chapter/19' },
      ],
    },
    {
      id: 'basque-isolate',
      icon: '⛰️',
      tags: ['isolate', 'europe', 'prehistory', 'pre-indo-european'],
      title: {
        en: 'Basque — a language isolate of the western Pyrenees',
        ja: 'ヨーロッパが置き換え損ねた言語、バスク語',
      },
      summary: {
        en: 'Basque is spoken by about 810,000 people aged 16 and over in the western Pyrenees (2021). It is the only surviving language of Western Europe known to predate the region\'s Indo-European languages, with no demonstrated living relative.',
        ja: '西ヨーロッパで唯一生き残った印欧語以前の言語。ピレネー山中で16歳以上の約81万人（2021年）が話す、地球上のどの言語とも親縁関係のない孤立言語。',
      },
      body: {
        en: `
  <p>When the Romans marched into Hispania in 218 BCE, they encountered dozens of languages. Within four hundred years, almost every one had been replaced by Latin — the seed of Spanish, Portuguese, Catalan, French, and the rest of Romance Europe. Almost every one. In the western Pyrenees, one language refused to die. Its speakers still call themselves <em>euskaldunak</em> — literally "those who have Basque", and their language, <strong>Euskara</strong>, is the last living survivor of a Europe that existed before the Indo-Europeans arrived.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="eu" data-zoom="7">🌍 Show Basque on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="43.17" data-lng="-2.47" data-zoom="8">⛰️ Fly to the Basque Country</button>
  </div>
  
  <p>The 2021 sociolinguistic survey counted about <strong>810,000 speakers</strong> aged 16 and over, and another 430,000 who understand Basque but speak it less well. Younger children are not counted, so the real total is higher. They live in four provinces in Spain (Bizkaia, Gipuzkoa, Araba and Navarra) and three in France (Labourd, Lower Navarre, Soule). Genetically, the language is a true <strong>isolate</strong>: no proven relatives. Linguists have spent two centuries trying to connect it to Iberian, Berber, Caucasian, Etruscan, Pictish, Burushaski, and even Ainu, and none of these proposals has won acceptance among specialists.</p>
  
  <p>The most serious historical link is to <strong>Aquitanian</strong>, known from some 200 personal names and about 60 names of gods carved on Roman-era stones in southwestern Gaul. The forms look strikingly Basque: <em>NESCATO</em> matches modern <em>neskato</em> "girl"; <em>CISON</em> matches <em>gizon</em> "man"; <em>SEMBE-</em> matches <em>seme</em> "son". Specialists agree the two are related but not on how closely. Trask saw Aquitanian as a near-direct ancestor, others as a sister language. Either way, the link ends up pushing the language's documented history back at least 2,000 years. Whether Basque also descends from a wider <strong>Vasconic substrate</strong> that once blanketed Western Europe — as proposed by Theo Vennemann — is far more controversial.</p>
  
  <ul>
    <li><strong>Ergative-absolutive alignment.</strong> Basque marks the subject of a transitive verb (the "agent") with a special suffix <em>-k</em>, while the object and the subject of an intransitive verb go unmarked. This is rare in Europe but common worldwide.</li>
    <li><strong>Polypersonal agreement.</strong> A single Basque verb form can encode the person and number of the subject, the direct object, <em>and</em> the indirect object simultaneously: <em>dakarkiot</em> = "I bring it to him".</li>
    <li><strong>Vigesimal counting.</strong> Numbers are built on 20: <em>hogei</em> "20", <em>berrogei</em> "40" (lit. "two-twenty"), <em>hirurogei</em> "60". French <em>quatre-vingts</em> "80" ("four twenties") counts the same way. Some have suggested a Basque influence, though a Celtic origin is proposed more often.</li>
    <li><strong>No grammatical gender, with one twist.</strong> Like Finnish and Turkish, Basque has no masculine/feminine distinction in nouns or pronouns. But when friends use the intimate pronoun <em>hi</em>, the verb marks whether you are talking to a man or a woman, even if the sentence has nothing to do with either. "I am Amaia" is <em>Amaia nauk</em> to a man and <em>Amaia naun</em> to a woman.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="eu">💧 See Basque "Water"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="eu">🔢 See Basque "One"</button>
  </div>
  
  <p>Basque came close to extinction in the 20th century. Under Francisco Franco's dictatorship (1939–1975), Basque was shut out of schools and public life, teachers who taught regional languages were punished, and from 1938 newborns could not be registered under names in languages other than Spanish. The standardization effort, <strong>Euskara Batua</strong> ("Unified Basque"), was launched under Franco — at the Arantzazu congress of 1968 — by the Basque language academy <em>Euskaltzaindia</em> and the linguist <strong>Koldo Mitxelena</strong>. It pulled together divergent dialects — Bizkaian, Gipuzkoan, Navarrese, Lapurdian, Zuberoan — into a written standard. Unofficial Basque-medium schools, the <em>ikastolak</em>, were already teaching in Basque before Franco died, but only after 1975 could the language be used in state schools and government.</p>
  
  <blockquote>"Hizkuntza bat ez da galtzen ez dakitenek ikasten ez dutelako, dakitenek hitz egiten ez dutelako baizik."<br>"A language is not lost because those who don't know it fail to learn it — it is lost because those who know it stop speaking it." — Joxean Artze</blockquote>
  
  <p>That revival has worked. In 1991 only 24% of people aged 16 and over in the Basque Autonomous Community spoke Basque; by 2021 it was 36%, and among 16-to-24-year-olds it was 74.5%. Basque is now co-official with Spanish in the Basque Autonomous Community, taught throughout the school system in three immersion models (A, B, D), and used on television, in literature, and online. It remains, as it has been for thousands of years, the stubborn pre-Indo-European voice of the western Pyrenees — a linguistic time capsule from a Europe we will never otherwise hear.</p>
        `,
        ja: `
  <p>紀元前218年、ローマ軍がイベリア半島に進軍した時、そこには数十の言語が話されていた。400年後、そのほとんどはラテン語に置き換わり、やがてスペイン語、ポルトガル語、カタルーニャ語、フランス語といったロマンス諸語の母胎となった。──ただ一つの言語を除いて。西ピレネーの山岳地帯で、ある言語はラテン化を拒んだ。話者は自らを <em>euskaldunak</em>（「バスク語を持つ者」）と呼び、その言語<strong>エウスカラ（Euskara）</strong>は、印欧語族が到来する以前のヨーロッパから生き残った最後の話し言葉である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="eu" data-zoom="7">🌍 地図でバスク語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="43.17" data-lng="-2.47" data-zoom="8">⛰️ バスク地方へ飛ぶ</button>
  </div>
  
  <p>2021年の社会言語学調査では、16歳以上の話者は約<strong>81万人</strong>、さらにバスク語を理解はできるが話すのはそれほど得意でない人が43万人いた。幼い子どもは数に入っていないので、実際の総数はもっと多い。話者はスペイン側のビスカヤ、ギプスコア、アラバ、ナバラと、フランス側のラブール、下ナバラ、スールに分布する。系統的には完全な<strong>孤立言語</strong>で、イベリア語、ベルベル語、コーカサス諸語、エトルリア語、ピクト語、ブルシャスキー語、果てはアイヌ語との関連説まで提示されてきたが、いずれも専門家の間で受け入れられていない。</p>
  
  <p>もっとも有力な歴史的つながりは、ガリア南西部のローマ期の石碑に刻まれた約200の人名と約60の神名から知られる<strong>アクィタニア語</strong>である。<em>NESCATO</em> は現代バスク語の <em>neskato</em>「少女」、<em>CISON</em> は <em>gizon</em>「男」、<em>SEMBE-</em> は <em>seme</em>「息子」と驚くほどよく対応する。両者が近縁であることに専門家の異論はないが、どれほど近いかについては意見が分かれる。トラスクはアクィタニア語をほぼ直系の祖先とみなし、姉妹言語とみる研究者もいる。いずれにせよ、このつながりによってバスク語の文献記録は少なくとも2000年遡る。さらに広い<strong>ヴァスコン基層</strong>がかつて西欧全体を覆っていた、というテオ・フェネマン説は依然として論争中である。</p>
  
  <ul>
    <li><strong>能格・絶対格体系。</strong> 他動詞の主語に <em>-k</em> という接辞をつけ、目的語や自動詞の主語は無標で表す。ヨーロッパでは稀だが世界的には珍しくない類型。</li>
    <li><strong>多人称一致。</strong> 一つの動詞形に主語・直接目的語・間接目的語の人称数すべてが包み込まれる。<em>dakarkiot</em>「私はそれを彼に持っていく」。</li>
    <li><strong>20進法。</strong> <em>hogei</em>「20」、<em>berrogei</em>「40（2×20）」、<em>hirurogei</em>「60」。フランス語の <em>quatre-vingts</em>「80」（「4つの20」）も同じ数え方をする。バスク語の影響を考える人もいるが、ケルト起源説のほうがよく唱えられる。</li>
    <li><strong>文法性なし──ただし一ひねりあり。</strong> フィンランド語やトルコ語と同じく、名詞・代名詞に男性／女性の区別がない。ところが親しい間柄で使う代名詞 <em>hi</em> で話すときは、文の内容が男女とまったく関係なくても、相手が男性か女性かを動詞が標示する。「私はアマイアです」は、男性に向かってなら <em>Amaia nauk</em>、女性に向かってなら <em>Amaia naun</em> だ。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="eu">💧 バスク語の「水」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="eu">🔢 バスク語の「一」</button>
  </div>
  
  <p>バスク語は20世紀に消滅の危機に瀕した。フランコ独裁政権下（1939–1975）では、バスク語は学校や公の場から締め出され、地域言語を教えた教師は処罰され、1938年からはスペイン語以外の言語の名前で新生児を登録することができなくなった。標準化運動<strong>エウスカラ・バトゥア</strong>（「統一バスク語」）が始まったのはフランコ政権下、1968年のアランツァツ会議である。バスク語アカデミー <em>Euskaltzaindia</em> と言語学者<strong>コルド・ミチェレナ</strong>が主導し、ビスカヤ、ギプスコア、ナバラ、ラプルディ、スベロアといった分岐方言を一つの書記標準にまとめあげた。フランコの死より前から、非公式のバスク語学校<em>イカストラ</em>がバスク語で授業をしていたが、公立学校や行政でこの言語を使えるようになったのは1975年以降のことである。</p>
  
  <blockquote>「言語は、知らない者が学ばないから失われるのではない。知っている者が話さなくなるから失われるのだ」── ホシェアン・アルツェ</blockquote>
  
<p>その復興は実を結んだ。1991年、バスク自治州の16歳以上でバスク語を話せる人は24%にすぎなかったが、2021年には36%となり、16〜24歳では74.5%に達している。バスク語はバスク自治州でスペイン語と並ぶ公用語となり、A・B・D の三つのモデルで学校教育に組み込まれ、テレビ・文学・インターネットでも使われている。現代まで継承された語彙と地名は、西ヨーロッパで印欧語が広がる以前の言語史を考える資料になっている。</p>
        `,
      },
      sources: [
        { text: "Basque Government (2023). VII Encuesta Sociolingüística 2021: Euskal Herria.", url: "https://euskadi.eus/contenidos/informacion/eas_ikerketak/es_def/adjuntos/VII_Encuesta_sociolinguistica_2021.pdf" },
        'Trask, R. L. (1997). The History of Basque. Routledge.',
        'Mitxelena, Koldo (1961). Fonética Histórica Vasca. Diputación Foral de Guipúzcoa.',
        'Gorrochategui, Joaquín (1984). Estudio sobre la onomástica indígena de Aquitania. Universidad del País Vasco.',
        'Hualde, José Ignacio; Ortiz de Urbina, Jon (eds.) (2003). A Grammar of Basque. Mouton de Gruyter.',
        'Vennemann, Theo (2003). Europa Vasconica – Europa Semitica. Mouton de Gruyter.',
        { text: 'Glottolog: Basque (basq1248)', url: 'https://glottolog.org/resource/languoid/id/basq1248' },
        { text: 'WALS Online: Basque', url: 'https://wals.info/languoid/lect/wals_code_bsq' },
      ],
    },
    {
      id: 'sumerian-first-writing',
      icon: '𒀭',
      tags: ['isolate', 'mesopotamia', 'writing', 'ancient'],
      title: {
        en: 'Sumerian — among the earliest languages ever written down',
        ja: '人類最古級の文字言語、シュメール語',
      },
      summary: {
        en: 'Among the earliest extensively attested written languages: a Mesopotamian isolate recorded on clay from ~3200 BCE, and kept alive as a scholarly tongue for 2,000 years after its last native speaker died.',
        ja: '人類最古級の文字言語の一つ。紀元前3200年頃にメソポタミアの粘土板に大量に刻まれ、最後の母語話者が死んでから2000年もの間、学術言語として生き続けた孤立言語。',
      },
      body: {
        en: `
  <p>Around 3200 BCE, in the southern Mesopotamian city of <strong>Uruk</strong>, somebody pressed the end of a reed stylus into wet clay and wrote down a quantity of barley. That clay tablet, and thousands like it, are among the first times human language was caught and held outside the speaker. Egypt developed writing at about the same time; China did so independently some two thousand years later, and Mesoamerica later still. The language being recorded was <strong>Sumerian</strong> (<em>eme-gir</em>, usually translated "the native tongue"), and more than five thousand years later we are still reading it.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="sux" data-zoom="6">🌍 Show Sumerian on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="31.32" data-lng="45.64" data-zoom="7" data-label="Uruk">𒀭 Fly to Uruk</button>
  </div>
  
  <p>Sumerian is a <strong>language isolate</strong>. Despite a century of effort, no proven relatives have been found — not in Semitic (its much later neighbour Akkadian), not in Indo-European, not in Dravidian, not in any of the Caucasian families. It is also <strong>agglutinative</strong> and largely <strong>ergative</strong>: meaning is built by stacking morphemes onto a verbal root in fixed slots, and the agent of a transitive verb takes a special case ending. A typical verbal chain looks like:</p>
  
  <blockquote><em>mu-na-(n)-dù</em> — "he built (it) for him" (literally: ventive <em>mu-</em> + "for him" <em>-na-</em> + "he" <em>-n-</em> + "build" <em>dù</em>), the closing formula of many royal building inscriptions, where a king records the temple he built for his god</blockquote>
  
  <p>Writing began as accountancy. The earliest tablets — the so-called <strong>proto-cuneiform</strong> of Uruk IV (c. 3200 BCE) — are receipts and ration lists: pictographs for sheep, beer, oil, with numbers counted in several systems, one of them sexagesimal (base 60), the ancestor of our 60-minute hour. Over the following centuries the pictographs were simplified into wedge-shaped impressions (and at some point turned 90 degrees on the tablet), and gained a phonetic dimension via the <strong>rebus principle</strong>: a sign for an object came to also stand for the sound of its name. Once a writing system can spell sounds, it can spell anything, and by 2600 BCE Sumerian scribes were writing literature, law, and prayer.</p>
  
  <ul>
    <li><strong>The Kish tablet</strong> (sometimes dated as early as c. 3500 BCE, but now usually placed in the Late Uruk period, c. 3200–3000 BCE) and the accounting tablet W 9578,a from Uruk (Uruk IV, c. 3350–3200 BCE) are among the earliest known examples of writing.</li>
    <li><strong>The Instructions of Shuruppak</strong> (c. 2500 BCE) are among the oldest surviving works of literature.</li>
    <li><strong>The Code of Ur-Nammu</strong> (c. 2100 BCE), the oldest known law code, predates Hammurabi by three centuries, and was written in Sumerian.</li>
    <li><strong>Enheduanna</strong> (c. 2285 BCE), an Akkadian princess and high priestess of the moon god Nanna, is traditionally counted the earliest named author in human history — though the Sumerian hymns to Inanna that bear her name survive only in copies made some five centuries later, and Assyriologists remain divided over whether she composed them.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="sux">💧 See Sumerian "Water"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="house" data-code="sux">🏠 See Sumerian "House"</button>
  </div>
  
  <p>By around 2000 BCE, after the fall of the Third Dynasty of Ur, Sumerian appears to have died out as anybody's mother tongue, displaced by the Semitic Akkadian of their northern neighbours. But it didn't stop being written. For nearly two thousand more years, Sumerian was kept alive in scribal schools (the <em>edubba</em>, "tablet house") as the prestige language of religion, scholarship, divination, and astronomy — the cuneiform world's Latin. Babylonian and Assyrian scribes copied Sumerian texts down into the 1st century BCE, the last datable Sumerian-language tablets postdating Alexander the Great.</p>
  
  <p>The language was forgotten entirely after the death of cuneiform itself, around the 1st century CE. It re-entered human memory only in the 19th century, when <strong>Henry Rawlinson</strong>, <strong>Edward Hincks</strong> and <strong>Jules Oppert</strong> — three of the decipherers of cuneiform — realized that the bilingual lexical lists they were reading recorded not just Akkadian but an older, non-Semitic language behind it. Oppert proposed the name "Sumerian" in January 1869, taking it from the Akkadian royal title "King of Sumer and Akkad". (The Sumerians' own name for their land was <em>ki-en-gi(-r)</em>.)</p>
  
  <p>Not everyone was convinced. From 1874 the orientalist <strong>Joseph Halévy</strong> argued that "Sumerian" was no language at all but a secret code invented by Babylonian priests, and leading Assyriologists argued over it for years. Friedrich Delitzsch backed Halévy from 1885 and abandoned the idea only in 1897.</p>
  
  <p>Today the <strong>electronic Pennsylvania Sumerian Dictionary</strong> (ePSD) and the <strong>Electronic Text Corpus of Sumerian Literature</strong> (ETCSL, Oxford) make it possible to read the world's oldest poetry on a phone. The <strong>Epic of Gilgamesh</strong>, in its Sumerian-language predecessors like "Gilgamesh and the Bull of Heaven", is among the oldest stories humanity ever wrote down, and it is still being translated.</p>
        `,
        ja: `
  <p>紀元前3200年頃、メソポタミア南部の都市<strong>ウルク</strong>で、誰かが葦のスタイラスの先を湿った粘土に押しつけ、大麦の数量を記録した。その粘土板と、それに続く何千枚もの板は、人類の言語が、話し手の外にとらえられ、とどめられた最初の例のひとつである。エジプトでもほぼ同じ頃に文字が生まれた。中国が独自に文字を生んだのはおよそ2000年後、メソアメリカはさらに後のことだ。記録された言語は<strong>シュメール語</strong>（<em>eme-gir</em>、ふつう「土地の言葉」と訳される）──5000年以上を経た今も読み続けられている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="sux" data-zoom="6">🌍 地図でシュメール語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="31.32" data-lng="45.64" data-zoom="7" data-label="ウルク">𒀭 ウルクへ飛ぶ</button>
  </div>
  
  <p>シュメール語は<strong>孤立言語</strong>であり、1世紀以上の研究にもかかわらず親縁関係が証明された言語は一つもない。隣接していたセム系アッカド語ともインド・ヨーロッパ語族ともドラヴィダ語族ともコーカサス諸語とも結びつかない。型としては<strong>膠着語</strong>かつおおむね<strong>能格</strong>で、動詞語根の前後に決まったスロットで形態素を積み重ねて意味を作る。たとえば <em>mu-na-(n)-dù</em>「彼は（それを）彼のために建てた」は、方向の <em>mu-</em>＋「彼のために」<em>-na-</em>＋「彼が」<em>-n-</em>＋「建てる」<em>dù</em> と分析される。王が神のために建てた神殿を記録する、数多くの王の建築碑文を締めくくる決まり文句だ。</p>
  
  <p>文字は<strong>会計</strong>として始まった。最古層の粘土板（ウルクIV期、紀元前3200年頃）の<strong>原楔形文字</strong>は、羊・ビール・油を表す絵文字と、いくつもの数え方の体系で数を記した領収書や配給簿である。その一つが60進法で、現在の「1時間＝60分」の祖先にあたる。その後の数世紀で絵文字は楔形の刻印へと簡略化され（どこかの時点で、粘土板の上で90度回転もした）、<strong>レブス原理</strong>（絵が表す物の音価で他の語を綴る）によって表音的次元を獲得した。音を綴れるようになった文字は、何でも書ける──紀元前2600年頃には、シュメールの書記は文学・法・祈りを記し始めた。</p>
  
  <ul>
    <li><strong>キシュ板</strong>（紀元前3500年頃とされることもあるが、現在ではふつうウルク後期、紀元前3200〜3000年頃に置かれる）と、ウルク出土の会計板 W 9578,a（ウルクIV期、紀元前3350〜3200年頃）は、知られている最古の文字資料に属する。</li>
    <li><strong>『シュルッパクの教訓』</strong>（紀元前2500年頃）は、現存最古の文学のひとつ。</li>
    <li><strong>『ウル・ナンム法典』</strong>（紀元前2100年頃）は、ハンムラビ法典より300年古い世界最古の法典で、シュメール語で書かれた。</li>
    <li><strong>エンヘドゥアンナ</strong>（紀元前2285年頃）はアッカドの王女・月神ナンナの高位巫女で、伝統的に「人類史で名前の残る最古の著者」とされる。ただし彼女の名を冠する女神イナンナへのシュメール語讃歌はおよそ5世紀後に作られた写本でしか伝わらず、本人の作かどうかはアッシリア学者の間で今も議論が分かれている。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="sux">💧 シュメール語の「水」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="house" data-code="sux">🏠 シュメール語の「家」</button>
  </div>
  
  <p>紀元前2000年頃、ウル第三王朝の崩壊後、シュメール語は母語としては消滅し、北方のセム系アッカド語に取って代わられた。だが書かれることはやめなかった。続く約2000年間、シュメール語は書記学校 <em>edubba</em>（「粘土板の家」）で教えられ、宗教・学問・占い・天文の威信言語──楔形文字世界のラテン語──として生き続けた。バビロニア人やアッシリア人の書記は紀元前1世紀までシュメール語文書を書写し、確実な年代を持つ最後のシュメール語板はアレクサンドロス大王より後にまで及ぶ。</p>
  
  <p>楔形文字そのものが紀元1世紀頃に絶えると、シュメール語も人類の記憶から完全に消えた。再発見されたのは19世紀、楔形文字解読者の<strong>ヘンリー・ロウリンソン</strong>、<strong>エドワード・ヒンクス</strong>、<strong>ジュール・オペール</strong>が、バイリンガル語彙表の背後にアッカド語ではない、より古い非セム系言語があると気づいた時である。1869年1月、オペールは王号「シュメールとアッカドの王」に含まれるアッカド語の地名から「Sumerian（シュメール語）」という名を提案した。シュメール人自身は自分たちの土地を <em>ki-en-gi(-r)</em> と呼んでいた。</p>

  <p>誰もが納得したわけではない。1874年から東洋学者<strong>ジョゼフ・アレヴィ</strong>は、「シュメール語」など言語ではなく、バビロニアの神官が発明した秘密の暗号だと主張し、名だたるアッシリア学者たちが何年にもわたって論争した。フリードリヒ・デーリッチュは1885年からアレヴィを支持し、その説を捨てたのはようやく1897年のことだった。</p>
  
  <p>現代では、電子版ペンシルバニア・シュメール語辞典（ePSD） と、オックスフォードの<strong>シュメール文学電子テキスト・コーパス</strong>（ETCSL）により、人類最古の詩をスマートフォンで読める。シュメール語版『ギルガメシュと天の牡牛』など、後の『ギルガメシュ叙事詩』の祖型は、人類が書き残した最古級の物語のひとつであり、いまも翻訳が続いている。</p>
        `,
      },
      sources: [
        'Jagersma, Bram (2010). A Descriptive Grammar of Sumerian. PhD Thesis, Leiden University.',
        'Edzard, Dietz Otto (2003). Sumerian Grammar. Handbook of Oriental Studies, Brill.',
        'Michalowski, Piotr (2004). "Sumerian." In Roger D. Woodard (ed.), The Cambridge Encyclopedia of the World\'s Ancient Languages, pp. 19–59. Cambridge University Press.',
        'Black, Jeremy; Cunningham, Graham; Robson, Eleanor; Zólyomi, Gábor (2004). The Literature of Ancient Sumer. Oxford University Press.',
        'Schmandt-Besserat, Denise (1996). How Writing Came About. University of Texas Press.',
        { text: 'Electronic Text Corpus of Sumerian Literature (ETCSL), Oxford', url: 'https://etcsl.orinst.ox.ac.uk/' },
        { text: 'Glottolog: Sumerian (sume1241)', url: 'https://glottolog.org/resource/languoid/id/sume1241' },
      ],
    },
    {
      id: 'etruscan-mystery',
      icon: '𐌀',
      tags: ['undeciphered', 'italy', 'ancient', 'isolate'],
      title: {
        en: 'Etruscan — the language we can read but can\'t understand',
        ja: '読めるのに分からない言語、エトルリア語',
      },
      summary: {
        en: 'Pre-Roman Italy\'s dominant language: 13,000 surviving inscriptions in a Greek-derived alphabet, fully phonetically readable, and still only partly translated.',
        ja: 'ローマ以前のイタリアを支配した言語。ギリシア由来のアルファベットで書かれた約13,000の碑文が残り、音は完全に読めるのに、意味はいまだ部分的にしか解読されていない。',
      },
      body: {
        en: `
  <p>Before Rome was Rome, the dominant power in central Italy was the <strong>Etruscan</strong> civilization: by tradition a league of twelve cities between the Arno and the Tiber, home to master metalworkers and sea-traders. Roman writers credited them with the toga, the triumph and much of Rome's religious ritual. They also left behind one of archaeology's strangest gifts: a language we can <em>read aloud</em> letter for letter, but only partially understand.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ett" data-zoom="6">🌍 Show Etruscan on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="42.4" data-lng="11.9" data-zoom="7">𐌀 Fly to Etruria</button>
  </div>
  
  <p>Etruscan is written in an <strong>alphabet borrowed from Euboean Greek</strong> around 700 BCE — the very same western Greek alphabet that, passed through Etruscan hands to the Romans, gave the world the Latin letters you are reading right now. The Etruscan detour left a fingerprint: Etruscan had no b, d or g sounds, so the Greek gamma came to be used for a k-sound, which is why Latin C stands for /k/. Early Latin wrote both /k/ and /g/ with C, a habit still visible in the abbreviation C. for the name Gaius. Because the script is alphabetic and well understood, every inscription can be phonetically transcribed. The trouble is the <strong>language behind the script</strong>: Etruscan is not Indo-European, not Semitic, not Italic, not anything else with living relatives. The only widely-accepted relatives are two heavily fragmentary languages — <strong>Raetic</strong> (in the Alps) and <strong>Lemnian</strong> (on the Aegean island of Lemnos, attested in the 6th century BCE stele of Kaminia) — together forming the small <strong>Tyrsenian</strong> family.</p>
  
  <p>Roughly <strong>13,000 inscriptions</strong> are known, the great majority short and funerary: who is buried here, how old they were, who their parents and spouse were. Repetitive formulae like <em>mi larthia</em> "I am of Larth" are easy. Anything beyond name, family, and number is hard. A handful of longer texts are the keys to whatever we do understand:</p>
  
  <ul>
    <li><strong>The Liber Linteus</strong> (Linen Book), the longest surviving Etruscan text. It is a ritual calendar of about 1,200 readable words (which have yielded only about 50 vocabulary items), hand-copied onto linen in the 3rd century BCE, then cut up in Ptolemaic Egypt and used to wrap a female mummy now in the Zagreb Archaeological Museum.</li>
    <li><strong>The Tabula Capuana</strong>, a terracotta tile with about 390 words of ritual instructions (c. 470 BCE).</li>
    <li><strong>The Pyrgi Tablets</strong> (c. 500 BCE), three thin sheets of gold from the port of Pyrgi, two in Etruscan and one in Phoenician, a near-bilingual dedication to the goddess Uni / Astarte, discovered in 1964. It confirmed much of what scholars had already guessed, but yielded just one new word: <em>ci</em>, "three".</li>
    <li><strong>The Tabula Cortonensis</strong>, a 200-word bronze tablet recording what looks like a land sale, found near Cortona in 1992.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="ett">🔢 See Etruscan "One"</button>
  </div>
  
  <p>What we <em>do</em> know is surprising. Etruscan has the numerals <em>thu, zal, ci, huth, mach, śa</em> for 1–6 — though scholars still argue over which word is 4 and which is 6. The clue is a lone pair of ivory dice from Tuscania in northern Lazio that write the numbers as words instead of dots, with <em>thu</em> opposite <em>huth</em>, <em>zal</em> opposite <em>mach</em>, and <em>ci</em> opposite <em>śa</em>. A 2011 study of 91 Etruscan dice found 3 and 4 always on opposite faces, so if <em>ci</em> is 3, <em>śa</em> should be 4 and <em>huth</em> 6. Etruscan declines nouns by case (genitive in <em>-s</em> or <em>-l</em>, ablative in <em>-is</em>), conjugates verbs for past and present (<em>-ce</em> past, <em>-e</em> present), and has a striking system of <strong>nominal phrase suffixes that stack</strong>: a noun marked for genitive can take a second genitive on top. Only a few hundred words are understood with any confidence (the exact count depends on how forms and expressions are counted); the rest of the lexicon, including most of the Liber Linteus's ritual technical terms, is contextual guesswork.</p>
  
  <p>Modern Etruscan studies were essentially founded by the Italian archaeologist <strong>Massimo Pallottino</strong> (1909–1995), whose <em>Etruscologia</em> (first published 1942, revised through a seventh edition in 1984) reset the field. Instead of hunting for a long-lost relative and translating by sound-alike words, Pallottino combined every kind of evidence: patterns within the Etruscan texts themselves, bilinguals, the pictures that accompany inscriptions, and the glosses of Roman writers. Progress would come one inscription at a time.</p>
  

<p>By the 1st century CE, Etruscan was dying. The emperor Claudius (10 BCE–54 CE), whose first wife Plautia Urgulanilla came from an Etruscan family, wrote a now-lost 20-volume history of the Etruscans, the <em>Tyrrhenika</em>, and may have been among the last Romans able to read the language. Within a few generations it had slipped out of living memory. A few words survive in our own mouths: Latin <em>persona</em> "mask", the ancestor of English <em>person</em>, probably comes from Etruscan <em>phersu</em>. For the rest we have 13,000 inscriptions and one ritually-wrapped mummy as the field notebook of a civilization that taught Rome how to be Rome.</p>
        `,
        ja: `
<p>ローマが勢力を拡大する以前、中部イタリアの覇者は<strong>エトルリア</strong>文明だった。伝承によればアルノ川とテヴェレ川のあいだに広がる12都市の同盟で、優れた金属工芸と海上交易で知られる。ローマの著述家たちは、トーガも凱旋式も、ローマの宗教儀礼の多くも、エトルリア人から受け継いだものだと考えていた。エトルリア語の文字と音価はおおむね読めるが、語彙と文法の理解は現在も部分的である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ett" data-zoom="6">🌍 地図でエトルリア語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="42.4" data-lng="11.9" data-zoom="7">𐌀 エトルリアへ飛ぶ</button>
  </div>
  
  <p>エトルリア語は、紀元前700年頃に<strong>エウボイア式ギリシア文字</strong>を借りて表記された。これがエトルリア人を経由してローマに伝わり、今あなたが読んでいるラテン文字の元になる。エトルリア経由の回り道は、指紋を残した。エトルリア語には b・d・g の音がなかったため、ギリシア文字のガンマが k の音に使われるようになったのだ。ラテン文字の C が /k/ を表すのはそのためである。初期のラテン語は /k/ も /g/ も C で書いており、その名残は、人名ガイウスを C. と略す習慣に今も見られる。アルファベットは完全に解読されているので、どんな碑文も音声化できる。問題は文字の<strong>背後にある言語</strong>のほうだ──エトルリア語は印欧語族でも、セム語族でも、イタリック語派でもない。広く認められている近縁言語は、アルプスの<strong>ラエティア語</strong>とエーゲ海レムノス島で紀元前6世紀のカミニア碑文に残る<strong>レムノス語</strong>のみで、これらを合わせて<strong>テュルセノイ語族</strong>と呼ばれる。</p>
  
  <p>現存碑文は約<strong>13,000点</strong>、その大半は短い墓碑で、「ここに誰が葬られている」「何歳だった」「親と配偶者は誰か」を記すだけだ。<em>mi larthia</em>「私はラルトのものだ」のような決まり文句は分かる。だが名前・家系・数を超えると途端に難しくなる。長文資料はわずかしかなく、それが解読の鍵を握る:</p>
  
  <ul>
    <li><strong>『リーベル・リンテウス』</strong>（亜麻布の書）── 現存最長のエトルリア語テキスト。約1,200語（そこから得られた語彙はわずか50語ほど）の儀礼暦が紀元前3世紀に亜麻布に手書きされ、後にプトレマイオス朝エジプトで切り刻まれて女性のミイラの布として再利用された。現在ザグレブ考古博物館蔵。</li>
    <li><strong>『カプア板』</strong>── テラコッタ板に約390語の儀礼指示（紀元前470年頃）。</li>
    <li><strong>『ピュルギ金板』</strong>（紀元前500年頃）── ピュルギ港から出土した3枚の金薄板。エトルリア語2枚・フェニキア語1枚で、女神ウニ／アスタルテへのほぼ二言語の奉献文で、1964年に発見された。学者たちがすでに推測していたことの多くを裏づけたが、新たにわかった語はたった一つ、<em>ci</em>「3」だけだった。</li>
    <li><strong>『コルトナ板』</strong>── 1992年にコルトナ近郊で発見された約200語の青銅板。土地売買契約と見られる。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="ett">🔢 エトルリア語の「一」</button>
  </div>
  
  <p>分かっている部分も意外と多い。1から6を表す数詞 <em>thu, zal, ci, huth, mach, śa</em> は知られているが、どれが4でどれが6かをめぐって、学者の意見はいまも割れている。手がかりは、ラツィオ州北部のトゥスカニアで出土した唯一の象牙のサイコロ一対だ。数を点ではなく語で書いており、<em>thu</em> の裏が <em>huth</em>、<em>zal</em> の裏が <em>mach</em>、<em>ci</em> の裏が <em>śa</em> になっている。2011年に91個のエトルリアのサイコロを調べた研究では、3と4は必ず向かい合う面にあった。だとすれば、<em>ci</em> が3なら <em>śa</em> は4、<em>huth</em> は6ということになる。エトルリア語は名詞を格変化させ（属格 <em>-s/-l</em>、奪格 <em>-is</em>）、動詞を時制変化させ（過去 <em>-ce</em>、現在 <em>-e</em>）、名詞句接辞を<strong>積み重ねる</strong>独特な体系を持つ──属格に属格をさらにつけられる。ある程度の確信をもって意味がわかる語は数百語ほど（正確な数は語形や表現の数え方による）で、それ以外、特にリーベル・リンテウスの儀礼専門用語の大半は文脈推定に頼っている。</p>
  
  <p>現代エトルリア学を実質的に確立したのはイタリアの考古学者<strong>マッシモ・パッロッティーノ</strong>（1909–1995）である。1942年初版、1984年の第7版まで改訂を重ねた著書『Etruscologia』で、この分野を仕切り直した。失われた親戚言語を探し、音の似た語を頼りに訳すのではなく、パッロッティーノはあらゆる種類の証拠を組み合わせた。エトルリア語テキスト内部のパターン、二言語碑文、碑文に添えられた絵、そしてローマの著述家たちが書き残した語釈。進歩は、碑文を一つずつ積み重ねることでしか得られない、というわけだ。</p>
  
  
  
  <p>紀元1世紀にはエトルリア語は絶滅へ向かっていた。最初の妻プラウティア・ウルグラニッラがエトルリア系の家の出だった皇帝クラウディウス（紀元前10–紀元54）は、エトルリア史20巻『テュッレーニカ』（散逸）を著した。彼はこの言語を読めた最後のローマ人の一人だったかもしれない。それから数世代のうちに、言語は人々の記憶から消えた。わずかな語は今も私たちの口に残っている。英語 <em>person</em> の祖先であるラテン語 <em>persona</em>「仮面」は、おそらくエトルリア語の <em>phersu</em> に由来する。それ以外に残されたのは、ローマに「ローマであること」を教えた文明のフィールドノートとして、13,000の碑文と一つの巻かれたミイラだけだ。</p>
        `,
      },
      sources: [
        { text: "Wikipedia: Etruscan language", url: "https://en.wikipedia.org/wiki/Etruscan_language" },
        { text: "Wikipedia: Etruscan numerals (Tuscania dice; Artioli et al. 2011)", url: "https://en.wikipedia.org/wiki/Etruscan_numerals" },
        'Pallottino, Massimo (1975). The Etruscans (English translation of Etruscologia, 6th edition). Indiana University Press.',
        'Bonfante, Giuliano; Bonfante, Larissa (2002). The Etruscan Language: An Introduction (2nd ed.). Manchester University Press.',
        'Wallace, Rex E. (2008). Zikh Rasna: A Manual of the Etruscan Language and Inscriptions. Beech Stave Press.',
        'Steinbauer, Dieter H. (1999). Neues Handbuch des Etruskischen. Scripta Mercaturae Verlag.',
        'Rix, Helmut (ed.) (1991). Etruskische Texte: Editio minor. Gunter Narr Verlag.',
        { text: 'Glottolog: Etruscan (etru1241)', url: 'https://glottolog.org/resource/languoid/id/etru1241' },
        { text: 'Liber Linteus, Archaeological Museum in Zagreb', url: 'https://www.amz.hr/en/collections/egyptian-collection/zagreb-mummy/' },
      ],
    },
    {
      id: 'sentinelese-unknown',
      icon: '🏝️',
      tags: ['unknown', 'isolated', 'andamanese', 'uncontacted'],
      title: {
        en: 'Sentinelese — an unrecorded language of North Sentinel Island',
        ja: '一度も録音されたことのない言語、センチネル語',
      },
      summary: {
        en: 'The language of North Sentinel Island has no usable public recording or transcription. With sustained contact prohibited, its relationship to other Andamanese languages remains unconfirmed.',
        ja: 'ベンガル湾の60平方キロの島で、地域における人類最古の定住層に連なるとされる人々が話す言語。外部の誰も聞いたことも記録したこともない。',
      },
      body: {
        en: `
  <p>About 1,200 km east of mainland India, in the Bay of Bengal, lies a small forested island of roughly 60 square kilometres. It is called <strong>North Sentinel Island</strong>, and somewhere inside it live a few dozen to a few hundred people (Indian census estimates have ranged from 15 to about 100, all counted from offshore) who have resisted sustained contact from outsiders. No usable recording or transcription of their language is publicly available, and it has not been classified with confidence.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="11.55" data-lng="92.24" data-zoom="8">🗺️ Fly to North Sentinel Island</button>
  </div>
  
  <p>The Sentinelese are one of the <strong>Andamanese</strong> peoples — believed to descend from one of the earliest <em>Out of Africa</em> human dispersals that may have reached the Andamans tens of thousands of years ago. No Sentinelese has ever given a DNA sample; but genetic studies of their neighbours the Onge and Jarawa place those groups among the most long-isolated populations on the planet, and the Sentinelese are presumed to share that history. Their neighbours on the wider archipelago — the Great Andamanese, the Onge of Little Andaman, and the Jarawa of South and Middle Andaman — speak languages that fall into <strong>two unrelated families</strong>: Great Andamanese, and the smaller Ongan family (Onge + Jarawa). Because their canoes, bows and material culture resemble those of the Onge and Jarawa, Sentinelese is usually presumed to be an Ongan language. Attempts to actually talk, though, have found no common ground. In the 1880s Portman's Onge companion Tomiti said the Sentinelese spoke a language he could not understand; Onge visitors on later expeditions recognised nothing either; and in 2001 census enumerators tried out Jarawa words, which met no response. Whatever its relatives, it is not understood by speakers of any known Andamanese language.</p>
  
  <p>Every documented attempt at contact has either failed or ended in violence:</p>
  
  <ul>
    <li><strong>1880</strong>: British colonial officer <strong>Maurice Vidal Portman</strong> landed with a search party, captured an elderly couple and four children, and brought them to Port Blair. The adults soon fell ill and died, probably of infections to which the islanders had no immunity. The children were returned to the island with gifts. No vocabulary from the captives appears to have survived.</li>
    <li><strong>1974</strong>: A film crew making the documentary <em>Man in Search of Man</em>, with National Geographic, left gifts on the beach, including a live pig, a doll and a toy car. The islanders answered with arrows, and the director was hit in the thigh. The archer reportedly sat down in the shade and laughed, while others speared and buried the pig and the doll and kept the coconuts and aluminium pots.</li>
    <li><strong>1991</strong>: On 4 January, a 13-member Indian team led by the anthropologist Triloknath Pandit made the first peaceful contact, floating coconuts from a boat until the Sentinelese waded out unarmed to collect them. The team's anthropologist, <strong>Madhumala Chattopadhyay</strong>, got into the water and handed the coconuts over herself — the first woman from the outside world known to have met them. A few words shouted by the islanders while they gathered coconuts, such as <em>liya</em> and <em>luwa</em>, have been tentatively compared by the linguist M. Sreenathan with Jarawa words for "near" and "far". The visits ended in 1997 over disease-transmission concerns.</li>
    <li><strong>2004 tsunami</strong>: A Coast Guard helicopter flew over the island days after the 2004 Indian Ocean tsunami to check for survivors. It was met with arrows, which at least showed that people had survived.</li>
    <li><strong>2006</strong>: Two fishermen poaching crabs nearby drifted ashore when their makeshift anchor failed in the night; they were killed.</li>
    <li><strong>2018</strong>: American missionary <strong>John Allen Chau</strong> was killed attempting to evangelize the Sentinelese, having paid local fishermen to ferry him there illegally. His notes described the language as having a "lot of high pitched sounds", one of the very few impressions of it any outsider has written down.</li>
  </ul>
  
  <p>Under the Indian government's <strong>Andaman and Nicobar Islands Protection of Aboriginal Tribes Regulation</strong> (1956, amended several times since), it is illegal for anyone to enter the exclusion zone around North Sentinel Island (reported as 5 nautical miles; some sources say 5 km). Indian Coast Guard and Navy vessels patrol the waters. The official approach since the 1990s, often summed up as <strong>"eyes on, hands off"</strong>, is: monitor the population from a distance, do not contact, do not interfere.</p>
  
  <blockquote>"The tribes of the islands do not need outsiders to protect them, what they need is to be left alone." — Madhumala Chattopadhyay, interviewed by Fehmida Zakeer for National Geographic, December 2018</blockquote>
  
  <p>What little we suspect about how Sentinelese works comes by analogy with its neighbours. Andamanese languages divide the world up by the human body: nouns and adjectives take a prefix chosen by the body part a thing is associated with, by shape or by function, and words for body parts and kin cannot be said without a possessor ("my head", "her mother", never just "head"). It is plausible, but unprovable, that Sentinelese works similarly. The Ethnologue, ISO 639-3, and Glottolog list it (code <em>std</em>, languoid <em>sent1241</em>), but they have almost nothing to put in it. The only word ever attributed to the language, and that tentatively, is a personal name, <em>Dāūwacho-chégálé-bāī</em>, which Portman noted in the 1880s for a Sentinelese man said to have left the island by canoe years before.</p>
  
  <p>It is the rarest of linguistic situations: a living, breathing human language, used every day, that we have agreed as a species not to study. Whether that agreement will survive the 21st century is uncertain. For now, the Sentinelese remain the people who will not be interviewed. Their language is the one tongue in this collection that we describe not because we know it, but because we know we don't.</p>
        `,
        ja: `
  <p>インド本土から東に約1,200km、ベンガル湾の中に、面積60平方キロほどの森林に覆われた小島がある。<strong>北センチネル島</strong>と呼ばれるその島に、数十人から数百人の人々が住んでいる（インドの国勢調査の推計は15人から約100人までと幅があり、いずれも沖合から数えたものだ）。彼らは外部との継続的な接触を拒み続けてきた。彼らこそ<strong>センチネル族</strong>であり、その言語は、一度も録音されず、一度も書き取られず、系統さえ確定していない──地球上にごくわずかしか存在しないそうした人類言語の一つであり、その中で群を抜いて知られた存在である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="11.55" data-lng="92.24" data-zoom="8">🗺️ 北センチネル島へ飛ぶ</button>
  </div>
  
  <p>センチネル族は<strong>アンダマン諸族</strong>の一支族であり、「出アフリカ」の初期の波の一つに連なる人々が数万年前にアンダマン諸島へ到達したものと考えられている。センチネル族がDNA試料を提供したことは一度もない。だが近隣のオンゲ族とジャラワ族の遺伝学的研究によれば、この二つの集団は地球上でもっとも長く孤立してきた人々に数えられ、センチネル族もその歴史を共有していると推定されている。同じ諸島の隣人──大アンダマン人、リトル・アンダマンのオンゲ族、南／中アンダマンのジャラワ族──が話す言語は、互いに無関係な<strong>大アンダマン語族</strong>と<strong>オンガン語族</strong>（オンゲ語＋ジャラワ語）の二つに分類される。カヌーや弓などの物質文化がオンゲ族・ジャラワ族のものに似ていることから、センチネル語はふつうオンガン語族の一員と推定されている。だが実際に言葉を交わそうとした試みでは、通じ合うものは何ひとつ見つからなかった。1880年代、ポートマンに同行したオンゲ族のトミティは、センチネル族は自分にはわからない言葉を話していると言った。その後の探検に加わったオンゲ族の人々も何も聞き分けられず、2001年には国勢調査員がジャラワ語の単語を試してみたが、反応はなかった。系統がどうであれ、既知のどのアンダマン語の話者にも通じない言語なのである。</p>
  
  <p>記録に残る接触の試みは、いずれも失敗するか流血で終わった:</p>
  
  <ul>
    <li><strong>1880年</strong>: イギリス植民地官 <strong>モーリス・V・ポートマン</strong>が探検隊で上陸、高齢の夫婦と子供4人を拘束し、ポート・ブレアに連行した。夫婦はほどなく病に倒れて死亡した。おそらく島民に免疫のない感染症によるものだ。子供たちは贈り物と共に島に返された。捕虜たちから得た語彙は、何ひとつ残っていないようだ。</li>
    <li><strong>1974年</strong>: ナショナル・ジオグラフィックと組んでドキュメンタリー『Man in Search of Man』を撮影していた一行が、生きたブタ、人形、おもちゃの車などの贈り物を浜に置いた。島民は矢で応え、監督が太ももを射抜かれた。射手は木陰に座って笑っていたといい、ほかの者たちはブタと人形を槍で突いて埋め、ココナッツとアルミ鍋は持ち去った。</li>
    <li><strong>1991年</strong>: 1月4日、人類学者トリロクナート・パンディット率いるインドの13人の調査団が、ボートからココナッツを海に浮かべて流し、初めて平和的な接触に成功。センチネル族は武器を持たずに海へ入り、ココナッツを拾い集めた。団の人類学者<strong>マドゥマラ・チャットパディヤイ</strong>は自ら海に入ってココナッツを手渡し、外部世界の女性として、知られる限り初めて彼らと対面した。ココナッツを集めながら島民が叫んだ <em>liya</em>、<em>luwa</em> といったいくつかの語は、言語学者M・スリーナタンによって、ジャラワ語の「近い」「遠い」と暫定的に比較されている。訪問は感染症のリスクから1997年に打ち切られた。</li>
    <li><strong>2004年のスマトラ沖津波</strong>: 沿岸警備隊のヘリが生存確認に飛んだが、矢で迎え撃たれた。少なくとも、人々が生き延びたことだけはそれでわかった。</li>
    <li><strong>2006年</strong>: 近くでカニを密漁していた漁師2人が、夜のうちに即席の錨が外れて島に流れ着き、殺害された。</li>
    <li><strong>2018年</strong>: アメリカ人宣教師<strong>ジョン・アレン・チャウ</strong>が、地元の漁師に金を払って違法に島まで運ばせ、上陸を試みて殺害された。彼のメモには、この言語には「甲高い音がたくさんある」と書かれていた。外部の人間が書き留めた、この言語のごく数少ない印象のひとつである。</li>
  </ul>
  
  <p>インド政府の<strong>アンダマン・ニコバル諸島原住民保護規則</strong>（1956年制定、その後数次改正）により、北センチネル島周辺の立入禁止区域（5海里と報じられるが、5キロとする資料もある）に入ることは違法とされる。インドの沿岸警備隊と海軍の艦艇が周辺海域を巡視している。1990年代以降の公式の方針は、しばしば<strong>「見るが触れず」</strong>とまとめられる──遠くから人口を観察するのみで、接触も干渉もしない、というものだ。</p>
  
  <blockquote>「島の部族は、外部の者に守ってもらう必要などない。彼らに必要なのは、そっとしておかれることだ」── マドゥマラ・チャットパディヤイ（ナショナル・ジオグラフィック、2018年12月、フェミダ・ザキールによるインタビュー）</blockquote>
  
  <p>センチネル語の仕組みについて推測できることは、近隣の言語からの類推に頼るしかない。アンダマン諸語は世界を人間の体で切り分ける。名詞や形容詞には、そのものが形や働きの上で結びつく体の部位に応じて選ばれた接頭辞がつき、体の部位や親族を表す語は持ち主なしには言えない（「私の頭」「彼女の母」とは言えても、ただの「頭」とは言えない）。センチネル語も同じような仕組みである可能性は十分あるが、証明する手段はない。Ethnologue、ISO 639-3、Glottolog はセンチネル語を「<em>std</em>／sent1241」として登録しているが、そこに書き込めることはほとんどない。この言語のものとされる唯一の語も、あくまで暫定的にだが、ある人名にすぎない。<em>Dāūwacho-chégálé-bāī</em>──何年も前にカヌーで島を去ったとされるセンチネル族の男性の名として、ポートマンが1880年代に書き留めたものだ。</p>
  
<p>インド政府は接触を禁じ、感染症や外部からの暴力から共同体を守る方針を採っている。そのため、センチネル語には公開された実用的な録音・転写資料がなく、近隣のアンダマン諸語との関係も確認されていない。資料の欠如は研究上の空白であると同時に、接触を試みないという保護方針の結果でもある。今のところ、センチネル族はインタビューに応じない人々であり続けている。その言語は、この記事集の中で、知っているからではなく、知らないとわかっているからこそ紹介する、ただひとつの言語である。</p>
        `,
      },
      sources: [
        { text: "Zakeer, Fehmida (2018). \"Meet the first woman to contact one of the world's most isolated tribes.\" National Geographic, 7 December 2018.", url: "https://web.archive.org/web/20200410190413/https://api.nationalgeographic.com/distribution/public/amp/culture/2018/12/first-woman-chattopadhyay-contact-sentinelese-andaman" },
        { text: "Sreenathan, M. & Devy, G. N. (2020). The Languages of Andaman and Nicobar Islands. ISBN 978-9390122301, pp. 33–34.", url: "" },
        'Pandit, T. N. (1990). The Sentinelese. Seagull Books, Calcutta.',
        'Goodheart, Adam (2000). "The Last Island of the Savages." The American Scholar 69(4): 13–44.',
        'Abbi, Anvita (2006). Endangered Languages of the Andaman Islands. LINCOM Europa.',
        'Blevins, Juliette (2007). "A Long Lost Sister of Proto-Austronesian? Proto-Ongan, Mother of Jarawa and Onge of the Andaman Islands." Oceanic Linguistics 46(1): 154–198.',
        'Chattopadhyay, Madhumala (2001). Tribes of Car Nicobar. Sarup & Sons, New Delhi. (Background on the author\'s Andaman & Nicobar fieldwork; does not treat the Sentinelese.)',
        { text: 'Glottolog: Sentinelese (sent1241)', url: 'https://glottolog.org/resource/languoid/id/sent1241' },
        { text: 'Survival International — The Sentinelese', url: 'https://www.survivalinternational.org/tribes/sentinelese' },
      ],
    },
    {
      id: 'modern-hebrew-revival',
      icon: '✡️',
      tags: ['revival', 'hebrew', 'israel', 'liturgical'],
      title: {
        en: 'Hebrew — an ancient language brought back to everyday life',
        ja: '日常語として蘇った古代言語、ヘブライ語',
      },
      summary: {
        en: 'For many centuries Hebrew continued mainly as a liturgical and literary language rather than a community vernacular. It returned to everyday speech from the late nineteenth century and is now used natively by millions of people.',
        ja: 'ヘブライ語は長く典礼・文献を中心に使われ、共同体の日常語ではなくなっていた。19世紀末以降に日常使用と世代間継承が広がり、現在は数百万人が母語として話している。',
      },
      body: {
        en: `
  <p>Somewhere around the <strong>third century CE</strong>, the last households in Roman Palestine in which children grew up hearing Hebrew at the dinner table fell silent. The Mishnah, compiled around 200 CE, is written in a Hebrew that most scholars now think was still a living, spoken language in Judea; but in the following century or two Aramaic replaced it in daily life, and Greek was the language of the cities. For the next 1,700 years, Hebrew survived as the language of the synagogue, the prayer book, the Torah scroll, and the letter from one rabbi to another — a written language used by literate adults, but no child's first words. Then, somehow, that changed. Today Hebrew is spoken by <strong>more than ten million people</strong>, counting fluent and partial speakers, and over six million of them learned it as babies. Smaller-scale revivals exist (Cornish, Manx, Wampanoag), but Hebrew remains the largest-scale and most thoroughly documented case of a language that had ceased to be anyone's mother tongue being brought back to daily community use.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="he" data-zoom="7">🌍 Show Hebrew on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="31.78" data-lng="35.22" data-zoom="9">✡️ Fly to Jerusalem</button>
  </div>
  
  <p>The single person most associated with the revival is <strong>Eliezer Ben-Yehuda</strong> (1858–1922), born Eliezer Perlman in Luzhki, a Yiddish-speaking village in the Russian Empire's Vilna province (now in Belarus), who emigrated to Ottoman Palestine in 1881 with one obsession: that Jews would only become a nation again if they spoke Hebrew. He made his own household the first laboratory. His son <strong>Itamar Ben-Avi</strong>, born in Jerusalem in 1882, is generally regarded as the <strong>first native speaker of Modern Hebrew in roughly 1,700 years</strong>. Ben-Yehuda forbade any other language in the home; his wife, who didn't speak Hebrew when they married, learned it on the job. Itamar reportedly spoke no language at all until he was around four. Neighbours warned the boy would grow up an idiot, and pious Jews were scandalised that the holy tongue was being used for household chores. Ben-Yehuda didn't relent.</p>
  
  <p>Ben-Yehuda also waged a vocabulary war. Biblical Hebrew has perhaps 8,000 lemmas — fine for prayer, hopeless for buying a newspaper. So Ben-Yehuda invented words, and so did the writers around him. Many are now plain everyday Israeli speech:</p>
  
  <ul>
    <li><strong>milon</strong> (מילון) — "dictionary", from <em>milah</em> "word".</li>
    <li><strong>iton</strong> (עיתון) — "newspaper", from <em>et</em> "time".</li>
    <li><strong>ofnayim</strong> (אופניים) — "bicycle", literally "a pair of wheels", the dual form of <em>ofan</em> "wheel"; first seen in 1899 (as <em>afnayim</em>) in a book by Micha Josef Berdyczewski, and published by Ben-Yehuda in 1903 as <em>ofanayim</em>, the standard form today.</li>
    <li><strong>glida</strong> (גלידה) — "ice cream", from a root meaning "to freeze".</li>
    <li><strong>chashmal</strong> (חשמל) — "electricity", a mysterious shining substance in Ezekiel's vision, put to modern use around 1880 by the poet Judah Leib Gordon. The choice was apt: the Greek word behind "electric" means amber, and <em>chashmal</em> has long been read as "amber" too.</li>
  </ul>
  
  <p>He began the gigantic <em>Complete Dictionary of Ancient and Modern Hebrew</em>, 17 volumes in the end, which his widow Hemda, his son Ehud and the scholars they recruited, finally Naftali Herz Tur-Sinai, only completed in 1959, 37 years after his death,, and helped found the <strong>Va'ad ha-Lashon ha-Ivrit</strong> (Hebrew Language Committee, 1890), which became today's <strong>Academy of the Hebrew Language</strong> — still the official Israeli body that coins new vocabulary: <em>machshev</em> "computer" (from the root for "think, calculate"), and in 2016 <em>tag hakbatsa</em> for "hashtag".</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="he">👋 See Hebrew "Hello"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="he">💧 See Hebrew "Water"</button>
  </div>
  
  <p>Modern historians of Hebrew (Ghil'ad Zuckermann, Bernard Spolsky and others) are quick to add nuance. Ben-Yehuda was not alone; he was the loudest voice in a wave of teachers, especially the Hebrew-in-Hebrew schoolteachers from the 1890s onward, organized from 1903 in the <strong>Union of Hebrew Teachers</strong>, who switched their classrooms from Yiddish and Russian to Hebrew, building the first generation of fluent users one schoolroom at a time. Zuckermann has argued, controversially, that what was actually born is not strictly "revived Hebrew" but a hybrid he calls <em>Israeli</em>: Hebrew words and word-building on the surface, with much of the sound system and sentence patterns shaped by the revivers' own mother tongues, above all Yiddish, along with Polish, Russian and others. You can hear it in the everyday Israeli "r", pronounced in the throat as in French or German rather than tapped or trilled as in older pronunciations. On his view, native Israelis are heirs both to the Bible and to Yiddish-speaking Eastern Europe.</p>
  
  <blockquote>"The Jews did not manage to revive the language of Isaiah. It is simply impossible to revive a language as it used to be." — Ghil'ad Zuckermann, quoted by Alex Rawlings in BBC Future, March 2019</blockquote>
  
  <p>By 1922, when Ben-Yehuda died, Hebrew was one of the three official languages of British Mandate Palestine. By 1948 it was the principal language of the newly-founded State of Israel. Today it is used in schools, literature, cinema, technology, shops and playgrounds. No other language is known to have gone from having no native speakers to millions of them. Itamar Ben-Avi, the boy who was not allowed to hear any other language, grew up to edit Hebrew newspapers. Within a lifetime, the language of the prayer book had become the language of playground arguments.</p>
        `,
        ja: `
  <p>西暦<strong>3世紀</strong>頃のどこかで、ローマ領パレスチナで子供が食卓のヘブライ語を聞きながら育つ家庭は、ついに途絶えた。200年頃に編纂されたミシュナーのヘブライ語は、当時のユダヤ地方ではまだ生きた話し言葉だったと、今では多くの学者が考えている。だがその後の1〜2世紀のうちに、日々の暮らしではアラム語がこれに取って代わり、都市ではギリシア語が使われていた。その後の1,700年間、ヘブライ語はシナゴーグの祈り、トーラーの巻物、ラビ同士の書簡──つまり「読み書きできる大人の言語」として生き延びたが、誰一人として赤ん坊として習得することはなかった。それがなぜか、変わった。今やヘブライ語を話す人は、流暢な話者と部分的な話者を合わせて<strong>1000万人を超え</strong>、そのうち600万人以上が赤ん坊のときに覚えた人々だ。コーンウォール語、マン島語、ワンパノアグ語といった小規模な復興例もあるが、母語話者が絶えた言語が共同体の日常語として戻ってきた事例としては、ヘブライ語が最大規模であり、もっとも詳しく記録されている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="he" data-zoom="7">🌍 地図でヘブライ語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="31.78" data-lng="35.22" data-zoom="9">✡️ エルサレムへ飛ぶ</button>
  </div>
  
  <p>復興の象徴的人物は<strong>エリエゼル・ベン＝イェフダー</strong>（1858–1922）。ロシア帝国ヴィリナ県（現ベラルーシ）の、イディッシュ語を話す村ルシュキでエリエゼル・ペルルマンとして生まれ、1881年にオスマン領パレスチナへ移住し、ただ一つの信念に取り憑かれていた──「ユダヤ人が再び一つの民族となるためには、ヘブライ語を話さねばならない」。最初の実験場は自分の家庭だった。1882年エルサレム生まれの息子<strong>イタマル・ベン＝アヴィ</strong>は、約1,700年ぶりに<strong>ヘブライ語を母語として育った最初の人間</strong>と一般にみなされる。父は家庭内の他言語を厳禁し、結婚時にヘブライ語を話せなかった妻も家事のかたわら学ばされた。イタマルは4歳近くまで何ひとつ言葉を話さなかったという。近所の人々はこの子はまともに育たないと警告し、敬虔なユダヤ教徒たちは聖なる言葉が家事に使われていることに憤慨した。それでもベン＝イェフダーは折れなかった。</p>
  
  <p>ベン＝イェフダーは語彙戦争も戦った。聖書ヘブライ語とミシュナー・ヘブライ語を合わせても語彙は約8,000語、祈りには十分でも、新聞を買うことすらできない。そこで彼は新語を作り、周りの書き手たちも作った。その多くは、今ではごく当たり前のイスラエルの日常語だ:</p>
  
  <ul>
    <li><strong>milon</strong>（מילון）「辞書」── <em>milah</em>「言葉」より。</li>
    <li><strong>iton</strong>（עיתון）「新聞」── <em>et</em>「時」より。</li>
    <li><strong>ofnayim</strong>（אופניים）「自転車」── 直訳すれば「一対の車輪」で、<em>ofan</em>「車輪」の双数形。1899年にミハ・ヨセフ・ベルディチェフスキの本に（<em>afnayim</em> として）初めて現れ、1903年にベン＝イェフダーが今日の標準形 <em>ofanayim</em> として発表した。</li>
    <li><strong>glida</strong>（גלידה）「アイスクリーム」──「凍る」を意味する語根から。</li>
    <li><strong>chashmal</strong>（חשמל）「電気」── エゼキエルの幻に出てくる、謎めいた輝く物質の名。1880年ごろ、詩人ユダ・レイブ・ゴルドンが現代の意味に転用した。うまい選択だった。「電気（electric）」のもとになったギリシャ語は「琥珀」を意味し、<em>chashmal</em> もまた古くから「琥珀」と解されてきたのだ。</li>
  </ul>
  
  <p>彼は、最終的に全17巻に及ぶ『古代および現代ヘブライ語完全辞典』に着手し（未亡人ヘムダと息子エフド、そして二人が集めた学者たちが仕事を引き継ぎ、最後はナフタリ・ヘルツ・トゥル＝シナイの手で完成したのは、彼の死から37年後の1959年だった）、1890年に<strong>ヘブライ語委員会</strong>（Va'ad ha-Lashon）を共同創設した。これが今日の<strong>ヘブライ語アカデミー</strong>に発展し、今も公式に新語を造っている。「考える・計算する」の語根から作った <em>machshev</em>「コンピュータ」や、2016年に「ハッシュタグ」の訳語として定めた <em>tag hakbatsa</em> などだ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="he">👋 ヘブライ語の「こんにちは」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="he">💧 ヘブライ語の「水」</button>
  </div>
  
  <p>現代の歴史家たち（ギルアド・ツッカーマン、バーナード・スポルスキーら）は補正を加えるのを忘れない。ベン＝イェフダーは独力ではなく、1890年代以降に教室でイディッシュ語やロシア語からヘブライ語へ切り替え、1903年に<strong>ヘブライ語教師組合</strong>を結成した教師たちの波が、第一世代の流暢な話者を学校単位で育てた。さらにツッカーマンは、議論を呼ぶ主張として、生まれたのは厳密には「復活ヘブライ語」ではなく、彼が <em>イスラエル語</em> と呼ぶハイブリッドだと論じている。表面はヘブライ語の単語と造語法だが、音体系や文のパターンの多くは、復興の担い手たち自身の母語──とりわけイディッシュ語、そしてポーランド語やロシア語など──によって形づくられている、というのだ。それはイスラエル人の日常の「r」にも聞き取れる。古い発音のように舌先ではじいたり震わせたりせず、フランス語やドイツ語のように喉の奥で発音するのである。彼の見方では、現代のイスラエル人の母語話者は、聖書の継承者であると同時に、イディッシュ語を話した東欧の継承者でもある。</p>
  
  <blockquote>「ユダヤ人はイザヤの言語を復活させられたわけではない。言語をかつてのままに復活させることは、そもそも不可能なのだ」── ギルアド・ツッカーマン（BBC Future、2019年3月、アレックス・ローリングスによる記事より）</blockquote>
  
  <p>1922年のベン＝イェフダー死去時、ヘブライ語はイギリス委任統治領パレスチナの公用語の一つとなっていた。1948年に建国されたイスラエル国家の主言語となり、今日では学校・映画・ハイテク産業・スーパーの売場・公園の遊具で生きている。母語話者がひとりもいない状態から、何百万人もの母語話者を持つに至った言語は、ほかに知られていない。ほかの言語を一切聞かせてもらえなかった少年イタマル・ベン＝アヴィは、長じてヘブライ語新聞の編集者になった。人ひとりの一生のうちに、祈祷書の言葉は、公園で子どもたちが口げんかする言葉になったのだ。</p>
        `,
      },
      sources: [
        { text: "Rawlings, Alex (2019). \"The man bringing dead languages back to life.\" BBC Future, March 2019.", url: "https://www.bbc.com/future/article/20190320-the-man-bringing-dead-languages-back-to-life" },
        'Sáenz-Badillos, Angel (1993). A History of the Hebrew Language. Cambridge University Press.',
        'Fellman, Jack (1973). The Revival of a Classical Tongue: Eliezer Ben Yehuda and the Modern Hebrew Language. Mouton.',
        'Spolsky, Bernard (1991). "Hebrew Language Revitalization within a General Theory of Second Language Learning." In R. L. Cooper & B. Spolsky (eds.), The Influence of Language on Culture and Thought. Mouton de Gruyter.',
        'Zuckermann, Ghil\'ad (2003). Language Contact and Lexical Enrichment in Israeli Hebrew. Palgrave Macmillan.',
        'Harshav, Benjamin (1993). Language in Time of Revolution. University of California Press.',
        { text: 'Glottolog: Modern Hebrew (hebr1245)', url: 'https://glottolog.org/resource/languoid/id/hebr1245' },
        { text: 'Academy of the Hebrew Language', url: 'https://hebrew-academy.org.il/' },
      ],
    },
    {
      id: 'sanskrit-panini',
      icon: '🕉️',
      tags: ['sanskrit', 'grammar', 'ancient', 'india', 'panini'],
      title: {
        en: 'Pāṇini — formal rules in an ancient Sanskrit grammar',
        ja: '計算機科学を2,400年先取りしたサンスクリット文法家、パーニニ',
      },
      summary: {
        en: 'Around 500–400 BCE, Pāṇini described Sanskrit in nearly 4,000 rules totalling fewer than 10,000 words. Linguists and computer scientists still compare his machinery with modern formal grammars.',
        ja: '紀元前500〜400年頃、パーニニは4,000近い規則、総語数1万語足らずでサンスクリットを記述した。その仕組みは今も、言語学者や計算機科学者によって現代の形式文法と比べられ続けている。',
      },
      body: {
        en: `
  <p>Composed in what is now northwestern Pakistan around <strong>500–400 BCE</strong>, the <strong>Aṣṭādhyāyī</strong> — the "Eight Chapters" of <strong>Pāṇini</strong> — gives a generative description of Sanskrit in just under <strong>4,000 sūtras</strong> (terse aphoristic rules). By Paul Kiparsky's count the whole grammar is 3,981 rules totalling fewer than 10,000 words (editions divide a few rules differently). Linguists including Leonard Bloomfield, Paul Kiparsky, and Noam Chomsky have discussed its formal analysis in relation to later work in linguistics and computer science.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="sa" data-zoom="7">🌍 Show Sanskrit on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="34.0" data-lng="72.0" data-zoom="6">🕉️ Fly to Pāṇini's Gandhāra</button>
  </div>
  
  <p>We know almost nothing about Pāṇini the person. Later tradition places his home at Śalātura: an 8th-century copper-plate inscription calls him Śālāturīya, "the man from Śalātura", and the 7th-century Chinese pilgrim Xuanzang reported his birthplace as a town on the Indus. Śalātura is usually identified with modern Lahor (Lahur), near Attock in northwestern Pakistan, not the major Punjabi city of Lahore. He probably worked in the 5th or 4th century BCE, and his grammar was designed to be <strong>memorized aloud</strong>. The Aṣṭādhyāyī was preserved by recitation for centuries before being written down. To keep the text as short as possible, Pāṇini built an entire <strong>technical metalanguage</strong>: marker letters tagged onto words and affixes to signal how they behave; the <strong>Śiva sūtras</strong>, 14 short lines listing the sounds of Sanskrit in a fixed order, so that any class of sounds can be named by its first member plus a closing marker (<em>ac</em> = every vowel, <em>hal</em> = every consonant); conventions for "context-sensitive" rule application, anuvṛtti (rule inheritance from a previous line that need not be re-stated), and a precedence system for resolving which rule applies when two rules conflict.</p>
  
  <p>To a modern eye the result looks uncannily like the context-sensitive rewrite rules of modern phonology. Pāṇini uses no arrows, though: he marks each part of a rule with a grammatical case. The genitive names what is replaced, the nominative its replacement, the ablative the sound before it and the locative the sound after it. In modern notation:</p>
  
  <blockquote><em>A → B / X _ Y</em><br>"A becomes B in the context where it is preceded by X and followed by Y" — the format that Chomsky and Halle's <em>The Sound Pattern of English</em> (1968) made standard in generative phonology.</blockquote>
  
  <p>Rule 6.1.77 is just three words: <em>iko yaṇ aci</em>, "in place of <em>ik</em> [i, u, ṛ, ḷ], <em>yaṇ</em> [y, v, r, l], before <em>ac</em> [any vowel]". That single line is why <em>dadhi</em> "curd" + <em>atra</em> "here" becomes <em>dadhy atra</em>.</p>
  
  <p>Examples of what Pāṇini's machinery does:</p>
  
  <ul>
    <li><strong>Sandhi.</strong> Sanskrit is famous for assimilating sounds across word boundaries (<em>tat + ca → tac ca</em>, <em>tat + na → tan na</em>). Pāṇini covers it with a compact set of rules, many placed in the <em>tripādī</em>, the grammar's final three sections. Rule 8.2.1 declares every rule there "not yet in effect" (<em>asiddha</em>) for the rules before it, so they apply strictly one after another, as in classical generative phonology. Kiparsky shows that this one device handles what phonologists now call opaque rule interactions.</li>
    <li><strong>Verbal morphology.</strong> A single Sanskrit verb root yields hundreds of forms: ten sets of tenses and moods, each with three persons, three numbers and up to two voices, before you count participles and derived verbs. Pāṇini generates them from a list of about two thousand roots (the <em>Dhātupāṭha</em>) and affix rules arranged from general to specific, where a more specific rule automatically overrides a general one wherever both could apply. Kiparsky brought a narrower version of this principle into generative grammar in the early 1970s as the <em>Elsewhere Condition</em>.</li>
    <li><strong>Kāraka theory.</strong> Pāṇini analyses verbs not in terms of "subject" and "object" but in terms of <em>kārakas</em> — semantic roles like agent (<em>kartṛ</em>), patient (<em>karman</em>), instrument (<em>karaṇa</em>), recipient (<em>sampradāna</em>), source (<em>apādāna</em>), and locus (<em>adhikaraṇa</em>). These closely parallel the semantic roles of <strong>thematic role theory</strong> and Charles Fillmore's "case grammar" (1968), more than two millennia earlier; Nicholas Ostler's 1979 dissertation drew the connection explicitly.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="sa">👩 See Sanskrit "Mother"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="fire" data-code="sa">🔥 See Sanskrit "Fire"</button>
  </div>
  
  <p>Pāṇini's influence can be traced directly in later scholarship. <strong>Leonard Bloomfield</strong> (1887–1949), one of the founders of American structural linguistics, studied Pāṇini closely (his 1927 paper "On Some Rules of Pāṇini" is one result), and his grammar of Menomini, an Algonquian language, is built on Pāṇini's model, with layers of rules that apply in sequence. The Dutch Indologist <strong>Frits Staal</strong> argued in "Euclid and Pāṇini" (1965) that Pāṇini's grammar is a formal system of the same order as Euclid's geometry; two years later the computer scientist <strong>Peter Zilahy Ingerman</strong>, in a letter to <em>Communications of the ACM</em>, proposed renaming Backus normal form the "Pāṇini-Backus form" in Pāṇini's honour. In 1985 <strong>Rick Briggs</strong>, of the Research Institute for Advanced Computer Science at NASA Ames, argued in <em>AI Magazine</em> that the way later Sanskrit grammarians analysed sentence meaning closely parallels the semantic networks used in artificial intelligence. (The popular claim that "NASA declared Sanskrit the best language for computers" is a distortion of this paper.) In the preface to his 1965 <em>Aspects of the Theory of Syntax</em>, <strong>Noam Chomsky</strong> wrote that "even Pāṇini's grammar can be interpreted as a fragment of such a 'generative grammar,' in essentially the contemporary sense of this term."</p>
  
  <blockquote>"This grammar … is one of the greatest monuments of human intelligence. It describes, with the minutest detail, every inflection, derivation, and composition, and every syntactic usage of its author's speech. No other language, to this day, has been so perfectly described." — Leonard Bloomfield, <em>Language</em> (1933)</blockquote>
  
  <p>Pāṇini was describing a living language: the standard spoken Sanskrit of his time, a stage between Vedic and Classical Sanskrit. (The name itself, <em>saṃskṛta-</em>, means "polished, refined".) Afterwards the relationship reversed. With the commentaries of Kātyāyana and Patañjali, his rules became the yardstick of correct Sanskrit, and, as Bloomfield suggested, this codification may be part of why Sanskrit lived on as the learned language of India long after it stopped being anyone's mother tongue. A grammar written to describe a language ended up keeping it alive.</p>
        `,
        ja: `
<p><strong>パーニニ</strong>の『<strong>アシュターディヤーイー</strong>』（八章篇）は、紀元前500〜400年頃に現在のパキスタン北西部で成立した。<strong>約4,000のスートラ</strong>（圧縮された規則）を組み合わせてサンスクリット語の形を導出し。ポール・キパルスキーの数え方では、文法全体は3,981の規則からなり、総語数は1万語に満たない（いくつかの規則の区切り方は版によって異なる）。後代の言語学者は、その規則体系と適用順序を形式文法との関連で論じてきた。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="sa" data-zoom="7">🌍 地図でサンスクリットを見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="34.0" data-lng="72.0" data-zoom="6">🕉️ パーニニのガンダーラへ飛ぶ</button>
  </div>
  
  <p>パーニニという人物については、ほとんど何も分かっていない。後世の伝承は彼の故郷をシャラートゥラとしている。8世紀の銅板碑文は彼を「シャラートゥラの人」（Śālāturīya）と呼び、7世紀の中国の巡礼僧・玄奘は、彼の生地をインダス川沿いの町と伝えている。シャラートゥラはふつう、パキスタン北西部アトック近郊の現在のラホール（Lahor／Lahur）に比定される。パンジャーブ州の大都市ラホールとは別の場所だ。活動したのはおそらく紀元前5〜4世紀で、その文法は<strong>暗唱前提</strong>で設計されていた。アシュターディヤーイーは、文字に書き留められるまでの何世紀ものあいだ、口承によって伝えられた。テキストをできるかぎり短くするために、パーニニは<strong>独自の専門メタ言語</strong>をまるごと組み上げた。語や接辞に付けてその振る舞いを示す標識文字。サンスクリットの音を決まった順に並べた14の短い行<strong>シヴァ・スートラ</strong>──これを使えば、どんな音のクラスも最初の音と締めくくりの標識だけで名指しできる（<em>ac</em> ＝すべての母音、<em>hal</em> ＝すべての子音）。さらに、前の規則の条件を引き継ぐ <em>anuvṛtti</em>、規則どうしの衝突を解く優先順位の体系。現代の目には、その結果は現代音韻論の文脈依存書き換え規則に驚くほどよく似て見える。</p>
  
  <p>ただしパーニニは矢印を使わない。規則の各部分を文法上の格で示すのだ。属格は置き換えられるもの、主格はその置き換え先、奪格は直前の音、処格は直後の音を表す。現代の記法で書けばこうなる:</p>
  
  <blockquote><em>A → B / X _ Y</em><br>「A は、X の後・Y の前という文脈で B になる」──チョムスキーとハレの『英語の音型』（1968年）が生成音韻論の標準にした形式である。</blockquote>

  <p>規則6.1.77はわずか3語、<em>iko yaṇ aci</em>──「<em>ik</em>［i, u, ṛ, ḷ］の代わりに、<em>ac</em>［あらゆる母音］の前では <em>yaṇ</em>［y, v, r, l］」。<em>dadhi</em>「凝乳」＋ <em>atra</em>「ここに」が <em>dadhy atra</em> になるのは、この一行のおかげだ。</p>
  
  <p>パーニニの装置が扱う問題の例:</p>
  
  <ul>
    <li><strong>サンディ。</strong> サンスクリットは語境界で音が同化する（<em>tat + ca → tac ca</em>、<em>tat + na → tan na</em>）。パーニニはこれを簡潔な一組の規則で扱い、その多くを文法の最後の3節 <em>tripādī</em> に置いた。規則8.2.1は、そこにある規則はすべて、それより前の規則にとって「まだ効力を持たない」（<em>asiddha</em>）と宣言する。そのためこれらの規則は、古典的な生成音韻論のように厳密に一つずつ順番に適用される。キパルスキーは、このたった一つの仕掛けで、今日の音韻論者が「不透明な規則の相互作用」と呼ぶものが処理できることを示している。</li>
    <li><strong>動詞形態論。</strong> サンスクリットでは一つの動詞語根から何百もの形が生まれる。時制・法が10組あり、それぞれに3つの人称、3つの数、最大2つの態がある。分詞や派生動詞を数える前から、この数だ。パーニニはこれを、約2,000の語根の一覧（<em>Dhātupāṭha</em>）と、一般的なものから特殊なものへと並べた接辞規則から生成する。両方が当てはまる場面では、より特殊な規則が自動的に一般的な規則に優先するのだ。キパルスキーは1970年代初め、この原理を絞り込んだ形で「他則条件」（Elsewhere Condition）として生成文法に持ち込んだ。</li>
    <li><strong>カーラカ理論。</strong> パーニニは動詞を「主語・目的語」ではなく <em>kāraka</em>──動作主 <em>kartṛ</em>、被動者 <em>karman</em>、道具 <em>karaṇa</em>、受領者 <em>sampradāna</em>、起点 <em>apādāna</em>、場所 <em>adhikaraṇa</em>──の意味役割で分析する。これは<strong>意味役割理論</strong>やチャールズ・フィルモアの「格文法」（1968年）の意味役割に、2千年以上も前の時点でぴったり重なる。ニコラス・オストラーの1979年の博士論文は、このつながりをはっきりと論じた。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="sa">👩 サンスクリット語の「母」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="fire" data-code="sa">🔥 サンスクリット語の「火」</button>
  </div>
  
  <p>パーニニの影響は比喩ではなく直接的である。アメリカ構造主義言語学の創始者の一人<strong>レナード・ブルームフィールド</strong>（1887–1949）はパーニニを丹念に研究し（1927年の論文「パーニニのいくつかの規則について」はその成果のひとつ）、アルゴンキン語族のメノミニ語の文法を、順番に適用される何層もの規則からなるパーニニの模型に基づいて組み立てた。オランダのインド学者<strong>フリッツ・スタール</strong>は1965年の論文「エウクレイデスとパーニニ」で、パーニニの文法はユークリッド幾何学と同格の形式体系だと論じた。その2年後、計算機科学者<strong>ピーター・ジラヒ・インガーマン</strong>は『Communications of the ACM』誌への投書で、バッカス標準形をパーニニに敬意を表して<strong>「パーニニ＝バッカス記法」</strong>と改称するよう提案している。1985年には、NASAエイムズ研究センターの先端計算機科学研究所に所属する<strong>リック・ブリッグス</strong>が『AI Magazine』で、後代のサンスクリット文法家による文の意味の分析は、人工知能で使われる意味ネットワークとよく似ていると論じた。（「NASAがサンスクリットをコンピュータに最適な言語と認定した」という俗説は、この論文を歪めたものだ。）そして<strong>ノーム・チョムスキー</strong>は1965年の『統辞理論の諸相』序文で、「パーニニの文法でさえ、現代的な意味での『生成文法』の一断片として解釈しうるように思われる」と述べている。</p>
  
  <blockquote>「この文法は……人類知性の最大の記念碑の一つである。著者の言葉のあらゆる屈折、派生、複合、あらゆる統語的用法を、微に入り細を穿って記述している。今日に至るまで、これほど完璧に記述された言語は他にない」── レナード・ブルームフィールド『Language』（1933年）</blockquote>
  
<p>パーニニが記述したのは生きた言語、つまり彼の時代に話されていた標準的なサンスクリットで、ヴェーダ語と古典サンスクリットの中間の段階にあたる（<em>saṃskṛta-</em> という名自体が「磨き上げられた、洗練された」を意味する）。その後、両者の関係は逆転した。カーティヤーヤナとパタンジャリの注釈を経て、パーニニの規則は正しいサンスクリットの物差しとなった。ブルームフィールドが示唆したように、この成文化こそ、サンスクリットが誰の母語でもなくなったはるか後まで、インドの学問の言語として生き続けた理由のひとつかもしれない。言語を記述するために書かれた文法が、結局はその言語を生かし続けたのである。</p>
        `,
      },
      sources: [
        { text: "Bloomfield, Leonard (1933). Language. New York: Henry Holt. Ch. 1.", url: "https://archive.org/details/jFEc_language-leonard-bloomfield" },
        { text: "Kiparsky, Paul. \"Pāṇini.\" Handbook chapter on the history of phonology (Stanford).", url: "https://web.stanford.edu/~kiparsky/Papers/panini_hist_of_phon_handbook.pdf" },
        'Cardona, George (1997). Pāṇini: A Survey of Research. Motilal Banarsidass.',
        'Kiparsky, Paul (1979). Pāṇini as a Variationist. MIT Press / Poona University Press.',
        'Staal, Frits (1965). "Euclid and Pāṇini." Philosophy East and West 15(2): 99–116.',
        'Bloomfield, Leonard (1927). "On Some Rules of Pāṇini." Journal of the American Oriental Society 47: 61–70.',
        'Briggs, Rick (1985). "Knowledge Representation in Sanskrit and Artificial Intelligence." AI Magazine 6(1): 32–39.',
        'Joshi, S. D.; Roodbergen, J. A. F. (1991–2009). The Aṣṭādhyāyī of Pāṇini, with translation and commentary (multi-volume). Sahitya Akademi.',
        { text: 'Glottolog: Sanskrit (sans1269)', url: 'https://glottolog.org/resource/languoid/id/sans1269' },
      ],
    },
    {
      id: 'esperanto-zamenhof',
      icon: '🟢',
      tags: ['conlang', 'esperanto', 'auxlang', 'zamenhof'],
      title: {
        en: 'Esperanto — from an 1887 booklet to an international community',
        ja: 'エスペラント──本当に話されるようになった人工言語',
      },
      summary: {
        en: 'L. L. Zamenhof launched Esperanto in a slim 1887 booklet. Nearly 140 years on it has a worldwide community, its own literature and a small group of native speakers. No other invented language has as many.',
        ja: 'L・L・ザメンホフが1887年、薄い小冊子で世に出した人工言語。それから140年近く、世界に広がる話者共同体と独自の文学を持ち、少数ながら母語話者もいる。その数は、ほかのどの人工言語よりも多い。',
      },
      body: {
        en: `
  <p>On 26 July 1887, a young eye doctor in Warsaw published a slim booklet in Russian, paid for with money from his fiancée's family, under the pseudonym <em>Doktoro Esperanto</em> — "Doctor One-Who-Hopes". It was titled simply <strong>International Language</strong> (<em>Lingvo Internacia</em>); Esperantists call it the <em>Unua Libro</em>, the "First Book". Early speakers took to calling the language after the pseudonym, and the name stuck. <strong>L. L. Zamenhof</strong> had done something no language inventor had managed for long: Volapük had boomed a few years earlier and then collapsed, with many of its clubs switching to Esperanto. Zamenhof built a language that ordinary people kept on wanting to speak.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="eo" data-zoom="4">🌍 Show Esperanto on map</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="eo">👋 See Esperanto "Hello"</button>
  </div>
  
  <p>Zamenhof grew up in Białystok, a multi-ethnic town under Russian rule where Jews, Poles, Germans, Russians and Belarusians lived side by side and frequently in mutual distrust. He later wrote that as a boy he had concluded the linguistic Babel was the root cause of human hatred, and that a neutral common tongue might give people a shared, equal footing. The political project was as important to him as the grammatical one.</p>
  
  <p>The design is famously simple. The <em>Unua Libro</em> set out the whole grammar as <strong>16 rules</strong>, presented as having no exceptions, and the 1905 <strong>Fundamento de Esperanto</strong> fixed them as the language's permanent base. The same booklet listed just 917 roots, from which tens of thousands of words can be built:</p>
  
  <ul>
    <li>All nouns end in <strong>-o</strong>, adjectives in <strong>-a</strong>, adverbs in <strong>-e</strong>, infinitives in <strong>-i</strong>.</li>
    <li>Plural is always <strong>-j</strong>; the direct object always takes <strong>-n</strong>.</li>
    <li>Stress always falls on the penultimate syllable.</li>
    <li>Verbs do not conjugate for person or number — only for tense (<em>-as, -is, -os</em>) and mood (<em>-us, -u</em>).</li>
    <li>Words are built agglutinatively from roots plus a small inventory of affixes: <em>mal-</em> reverses meaning (<em>bona</em> good → <em>malbona</em> bad), <em>-ej-</em> marks a place (<em>lerni</em> learn → <em>lernejo</em> school), <em>-in-</em> marks female.</li>
  </ul>
  
  <p>The vocabulary is mostly Romance with a Germanic, Greek and Slavic seasoning: about 80% of the roots come from Romance languages. This was a deliberate compromise, European but not tied to any single major power.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="love" data-code="eo">❤️ "Love" — <em>amo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="eo">💧 "Water" — <em>akvo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="eo">1️⃣ "One" — <em>unu</em></button>
  </div>
  
  <p>Getting started was slow. Zamenhof asked readers to sign a pledge to learn the language once ten million others had signed; about a thousand replied. Yet by 1905 the first <strong>World Esperanto Congress</strong> met in Boulogne-sur-Mer, where 688 Esperanto speakers of 20 nationalities talked together in it. In the early 1920s, when Iran proposed at the League of Nations that Esperanto be adopted for international relations, the French delegate Gabriel Hanotaux blocked it, seeing a threat to French as the language of diplomacy. Today Vatican Radio publishes in Esperanto, and Google Translate added it in February 2012.</p>
  
  <blockquote>"En Bjelostoko la loĝantaro konsistas el kvar diversaj elementoj: rusoj, poloj, germanoj kaj hebreoj; ĉiuj el tiuj ĉi elementoj parolas apartan lingvon kaj neamike rilatas la aliajn elementojn." ("In Białystok the population consists of four different elements: Russians, Poles, Germans and Jews; every one of these elements speaks its own language and is on unfriendly terms with the others.") — Zamenhof, letter to Nikolai Borovko, 1895 (written in Russian; Esperanto text from Vladimir Gernet's 1896 translation)</blockquote>
  
  <p>Twentieth-century history was cruel to Esperantists. Hitler condemned the language in <em>Mein Kampf</em> as a Jewish conspiracy; Zamenhof's three children were murdered in the Holocaust. In the Soviet Union, where the language had first enjoyed official favour, Stalin's Great Purge from 1937 sent Esperantists to execution or the Gulag, often on charges of belonging to an international spy organisation. The movement survived both.</p>
  
  <p>How many people speak it today is disputed. The often-quoted <strong>two million</strong> goes back to one researcher's estimate, rounded to the nearest million; other counts put it far lower, at roughly <strong>60,000–100,000</strong>. There are also somewhere between <strong>1,000 and 2,000 native speakers</strong>, the <em>denaskuloj</em> ("people from birth"), usually children of international couples whose shared language is Esperanto. Duolingo's course for English speakers had passed 1.36 million learners by 2018. No other constructed language has a sizeable native-speaking population.</p>
  
  <p>Zamenhof never claimed Esperanto would replace anyone's mother tongue. He wanted a <em>dua lingvo</em> — a second language — equally foreign to everyone, so that no native speaker would ever have the upper hand at the negotiating table. Nearly a century and a half later, the project is small, but it is still alive, still neutral, and still hopeful — exactly as its founder, <em>Doktoro Esperanto</em>, signed his name.</p>
        `,
        ja: `
  <p>1887年7月26日、ワルシャワに住む若い眼科医が、婚約者の実家が出してくれたお金で、ロシア語の薄い小冊子を出した。ペンネームは<em>Doktoro Esperanto</em>──「希望する者という名の博士」。書名はそっけなく<strong>『国際語』</strong>（<em>Lingvo Internacia</em>）。エスペランチストはこれを<em>Unua Libro</em>、「第一の書」と呼んでいる。初期の話者たちがこの言語をペンネームで呼ぶようになり、その名が定着した。<strong>L・L・ザメンホフ</strong>は、それまでどの言語考案者も長くは保てなかったものを手にした。数年前に大流行したヴォラピュクはあっけなく崩壊し、そのクラブの多くがエスペラントに鞍替えしたほどだ。ザメンホフが作ったのは、普通の人々が「話したい」と思い続ける言語だった。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="eo" data-zoom="4">🌍 地図でエスペラントを見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="eo">👋 エスペラント語の「こんにちは」</button>
  </div>
  
  <p>ザメンホフが育ったビャウィストクは、ロシア統治下の多民族都市で、ユダヤ人・ポーランド人・ドイツ人・ロシア人・ベラルーシ人が隣り合い、互いに不信を抱きながら暮らしていた。彼は後に「人類の憎悪の根は言語の混乱（バベル）にある」と確信し、中立の共通語があれば人々は対等な立場に立てるのではないか、と書いている。彼にとって文法設計は、政治的理想と切り離せない営みだった。</p>
  
  <p>設計はきわめてシンプルだ。<em>Unua Libro</em>は文法のすべてを、例外なしとうたう<strong>16条の規則</strong>にまとめ、1905年の<strong>『エスペラントの基礎』</strong>（<em>Fundamento de Esperanto</em>）がそれを言語の不変の土台として定めた。同じ小冊子に載った語根はわずか917個だが、そこから何万もの語を組み立てられる。</p>
  
  <ul>
    <li>名詞は必ず<strong>-o</strong>、形容詞は<strong>-a</strong>、副詞は<strong>-e</strong>、不定詞は<strong>-i</strong>で終わる。</li>
    <li>複数は常に<strong>-j</strong>、直接目的語は常に<strong>-n</strong>を取る。</li>
    <li>アクセントは必ず後ろから2音節目。</li>
    <li>動詞は人称・数によらず、時制（<em>-as / -is / -os</em>）と法（<em>-us / -u</em>）だけで変化する。</li>
    <li>語は語根＋接辞の膠着で作る。<em>mal-</em>は反意（bona「良い」→malbona「悪い」）、<em>-ej-</em>は場所（lerni「学ぶ」→lernejo「学校」）、<em>-in-</em>は女性を表す。</li>
  </ul>
  
  <p>語彙はロマンス系が中心で、そこにゲルマン語・ギリシャ語・スラブ語が少しずつ混ざる。語根の約80%はロマンス諸語に由来する。これは「ヨーロッパ系だが、特定の大国に偏らない」意図的な配合だ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="love" data-code="eo">❤️ 「愛」は<em>amo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="eo">💧 「水」は<em>akvo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="eo">1️⃣ 「1」は<em>unu</em></button>
  </div>
  
  <p>滑り出しは鈍かった。ザメンホフは読者に「ほかに1000万人が署名したらこの言語を学ぶ」という誓約への署名を呼びかけたが、返ってきたのは1000通ほど。それでも1905年には、フランスのブローニュ＝シュル＝メールで第1回<strong>世界エスペラント大会</strong>が開かれ、20の国籍の688人のエスペランチストがこの言語で語り合った。1920年代初め、イランが国際連盟で国際関係にエスペラントを採用するよう提案したときには、フランス代表ガブリエル・アノトーが外交言語としてのフランス語への脅威とみて、これを阻んだ。現在、バチカン放送はエスペラントで発信しており、Google翻訳は2012年2月に対応言語に加えた。</p>
  
  <blockquote>「ビャウィストクの住民は四つの異なる要素から成っている。ロシア人、ポーランド人、ドイツ人、そしてユダヤ人である。そのいずれもが別々の言語を話し、互いに敵意をもって接していた」──ザメンホフがニコライ・ボロフコに宛てた1895年の手紙より（原文はロシア語、エスペラント訳は1896年のウラジーミル・ゲルネットによる）</blockquote>
  
  <p>20世紀の歴史はエスペランチストに過酷だった。ヒトラーは『我が闘争』でエスペラントを「ユダヤの陰謀」と非難し、ザメンホフの3人の子はホロコーストで殺された。当初はエスペラントが公式に優遇されていたソ連でも、1937年に始まるスターリンの大粛清で、エスペランチストたちは処刑されたり強制収容所に送られたりした。罪状はしばしば「国際スパイ組織への所属」だった。それでも運動は生き延びた。</p>
  
  <p>現在の話者数には諸説ある。よく引かれる<strong>200万人</strong>は、ある研究者の推計を100万単位で丸めた数字にさかのぼるもので、ほかの集計ではずっと少なく、<strong>6万〜10万人</strong>ほどとされる。さらに<strong>1000〜2000人の母語話者</strong>もいる。<em>denaskuloj</em>（「生まれながらの人」）と呼ばれ、たいていはエスペラントを共通語とする国際結婚の夫婦の子どもたちだ。英語話者向けのDuolingoのコースは、2018年までに学習者136万人を突破した。母語話者人口と呼べるほどの規模を持つ人工言語は、ほかにない。</p>
  
  <p>ザメンホフは「母語を置き換える」とは決して言わなかった。彼が望んだのは<em>dua lingvo</em>──第二言語──であり、誰にとっても等しく「外国語」であることで、交渉の場で誰も母語話者特権を持たないようにする、という発想だった。140年経った今も、運動は小さいが、中立で、希望に満ちている。創始者が署名した名のとおり、いまも<em>Doktoro Esperanto</em>──「希望する者」──のままだ。</p>
        `,
      },
      sources: [
        { text: "Wikipedia: History of Esperanto", url: "https://en.wikipedia.org/wiki/History_of_Esperanto" },
        { text: "Wikipedia: Esperanto (speaker estimates, native speakers, vocabulary)", url: "https://en.wikipedia.org/wiki/Esperanto" },
        'Zamenhof, L. L. (1887). Lingvo Internacia: Antaŭparolo kaj Plena Lernolibro. Warsaw: Kelter.',
        'Janton, Pierre (1993). Esperanto: Language, Literature, and Community. Albany: SUNY Press.',
        'Lindstedt, Jouko (2006). "Native Esperanto as a Test Case for Natural Language." SKY Journal of Linguistics 19: 47–55.',
        'Garvía, Roberto (2015). Esperanto and Its Rivals: The Struggle for an International Language. University of Pennsylvania Press.',
        'Okrent, Arika (2009). In the Land of Invented Languages. Spiegel & Grau.',
        { text: 'Glottolog: Esperanto (espe1235)', url: 'https://glottolog.org/resource/languoid/id/espe1235' },
        { text: 'Universala Esperanto-Asocio', url: 'https://uea.org/' },
      ],
    },
    {
      id: 'toki-pona-minimalism',
      icon: '🌱',
      tags: ['conlang', 'minimalism', 'toki-pona', 'sonja-lang'],
      title: {
        en: 'Toki Pona — can you say everything with 120 words?',
        ja: 'トキポナ──120語で世界を語れるか',
      },
      summary: {
        en: 'Sonja Lang designed Toki Pona around a vocabulary of roughly 120 words and about 14 sounds. Its speakers use compounding and context to express meanings beyond that small lexicon.',
        ja: 'カナダの言語学者が、約120語・約14音という極小の語彙体系を、道家思想の実験として設計した。20年後、世界中で数千人が話し、「世界の見え方が変わった」と語っている。',
      },
      body: {
        en: `
  <p>In 2001, a Canadian linguist and translator named <strong>Sonja Lang</strong> (born Sonja Elen Kisa) was struggling with depression. As part of her recovery she began experimenting with a deliberately minimal language — one that would force her to express ideas using only what was truly essential. She called it <strong>Toki Pona</strong>, "the language of good", or more literally "good speech / simple speech".</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="tok" data-zoom="4">🌍 Show Toki Pona on map</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="tok">👋 "Hello" — <em>toki!</em></button>
  </div>
  
  <p>The first sketches appeared online in 2001. The canonical reference, <em>Toki Pona: The Language of Good</em>, finally appeared in 2014. Between those dates the language quietly grew a community without any institutional backing, advertising or commercial product. The 2014 book lists <strong>120 core words</strong> (with <em>kin</em>, <em>namako</em> and <em>oko</em> given there only as synonyms); the 2021 dictionary <em>ku</em> then folded in the words the community had actually adopted, and states on its back cover a total of <strong>137 essential words</strong> — <em>nimi ku suli</em> — which is the count most fluent speakers work from today.</p>
  
  <p>The phonology is just as minimal:</p>
  
  <ul>
    <li><strong>9 consonants</strong>: <em>p, t, k, s, m, n, l, j, w</em>.</li>
    <li><strong>5 vowels</strong>: <em>a, e, i, o, u</em>.</li>
    <li>Syllables are (C)V(n). No consonant clusters, no tones, no length contrasts.</li>
    <li>Stress is always on the first syllable.</li>
  </ul>
  
  <p>That gives only about <strong>14 phonemes</strong> in total — far fewer than English's ~44, and a sound inventory so widespread cross-linguistically that almost any human can pronounce Toki Pona on first hearing.</p>
  
  <p>So how do you say anything with so few words? <strong>Composition.</strong> Toki Pona has no word for "friend", "computer" or "library". Instead you describe:</p>
  
  <ul>
    <li><em>jan pona</em> — "good person" → friend</li>
    <li><em>ilo sona</em> — "knowledge tool" → computer</li>
    <li><em>tomo pi lipu mute</em> — "house of many documents" → library</li>
    <li><em>telo nasa</em> — "weird water" → alcohol</li>
    <li><em>tomo tawa</em> — "moving room" → car, though Lang's own book uses this very phrase as a warning against freezing descriptions into fixed words: to the driver, a car might be <em>ilo tawa</em>, a "moving tool"</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="tok">💧 "Water" — <em>telo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="tok">☀️ "Sun" — <em>suno</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="love" data-code="tok">❤️ "Love" — <em>olin</em></button>
  </div>
  
  <p>The same expression can mean different things in different contexts. <em>jan pona</em> usually means "friend", but literally it is any good person, and speakers who want to be specific about friendship reach for other phrases; <em>kili</em> covers any fruit or vegetable. Lang's design philosophy, influenced by Taoism, the radical simplicity of pidgins, and the Sapir–Whorf hypothesis, was that <strong>forcing simplicity in expression forces simplicity in thought</strong>:</p>
  
  <blockquote>"If you can express yourself in a simple way, then you really understand what you're talking about, and that's good. If something is too complicated, that's bad. You're putting too much noise into the equation. That belief is kind of hardwired into the language." — Sonja Lang, interviewed by Roc Morin, <em>The Atlantic</em> (2015)</blockquote>
  
  <p>Critics call it impractical: you cannot do tax law in Toki Pona, and even basic arithmetic is awkward (the basic system counts <em>wan</em>, <em>tu</em>, <em>mute</em>: "one, two, many". Lang's 2014 book adds a tally-stick system in which <em>luka</em> "hand" is 5, <em>mute</em> is 20 and <em>ale</em> "all" is 100, so 78 comes out as <em>mute mute mute luka luka luka tu wan</em>).</p>
  
  <p>Yet the community keeps growing. Nobody has a reliable head count, but in January 2022 the language received its own ISO 639-3 code, <em>tok</em>, on its third application. It has a dedicated subreddit, the <em>ma pona pi toki pona</em> Discord server (whose polls Lang used to compile the 2021 dictionary), a 2022 translation of Hesse's <em>Siddhartha</em>, original poetry, music albums, and even a constructed script — <em>sitelen pona</em> — where each glyph is a tiny pictogram of one core word. Whether Toki Pona makes you wiser is debatable. But some speakers say it makes them <em>think harder about what they actually mean</em>; one told <em>The Atlantic</em> it had made him more honest.</p>
        `,
        ja: `
  <p>2001年、カナダの言語学者・翻訳家<strong>ソーニャ・ラング</strong>（Sonja Elen Kisa）は鬱に苦しんでいた。回復の過程で、彼女は「本当に必要なものだけで表現を強いる」極小設計の言語を考案しはじめる。それが<strong>トキポナ（toki pona）</strong>──「良い言葉／単純な言葉」だった。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="tok" data-zoom="4">🌍 地図でトキポナを見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="tok">👋 「こんにちは」──<em>toki!</em></button>
  </div>
  
  <p>最初のスケッチが2001年にネット上で公開され、決定版の参考書『Toki Pona: The Language of Good』は2014年に出版された。その間、トキポナは広告も商品も組織もなしに、静かに世界中へ広まった。2014年版の公式語彙は<strong>120語</strong>（<em>kin</em>・<em>namako</em>・<em>oko</em> は同義語扱いで別掲）。2021年の辞典『ku』はコミュニティで定着した語を取り込み、裏表紙に総数<strong>137語</strong>──<em>nimi ku suli</em>（主要語）──と記す。今日の流暢な話者が基準とするのは、この137語だ。</p>
  
  <p>音韻も同じく極小である。</p>
  
  <ul>
    <li><strong>子音9個</strong>：<em>p, t, k, s, m, n, l, j, w</em></li>
    <li><strong>母音5個</strong>：<em>a, e, i, o, u</em></li>
    <li>音節は (C)V(n)。子音連続も声調も長短対立もない。</li>
    <li>強勢は常に第一音節。</li>
  </ul>
  
  <p>合計<strong>14音素</strong>程度──英語の約44音素に比べて圧倒的に少なく、世界中ほとんどの言語の話者が初見で発音できる。</p>
  
  <p>では、これほど少ない語でどうやって何でも言うのか。答えは<strong>合成</strong>だ。トキポナには「友人」「コンピュータ」「図書館」という語がない。記述で表す。</p>
  
  <ul>
    <li><em>jan pona</em>「良い人」→ 友人</li>
    <li><em>ilo sona</em>「知識の道具」→ コンピュータ</li>
    <li><em>tomo pi lipu mute</em>「多くの紙の家」→ 図書館</li>
    <li><em>telo nasa</em>「変な水」→ 酒</li>
    <li><em>tomo tawa</em>「動く部屋」→ 車。ただしラング自身の本は、まさにこの表現を例に、描写を固定した単語にしてしまうなと戒めている。運転する人にとって車は <em>ilo tawa</em>「動く道具」かもしれないのだ</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="tok">💧 「水」は<em>telo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="tok">☀️ 「太陽」は<em>suno</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="love" data-code="tok">❤️ 「愛」は<em>olin</em></button>
  </div>
  
  <p>同じ表現が文脈で別の意味になる。<em>jan pona</em>はふつう「友達」の意味だが、字義どおりには「良い人」なら誰でもよく、友情をはっきり言いたい話者は別の言い回しを使う。<em>kili</em>はあらゆる果物・野菜の総称だ。ラングが影響を受けたのは道家思想、ピジン言語の徹底した簡素さ、そしてサピア＝ウォーフ仮説で、<strong>表現の単純化は思考の単純化を強いる</strong>という直観に基づく。</p>
  
  <blockquote>「単純に言い表せるなら、自分が何を語っているのかを本当に理解しているということで、それは良いことです。複雑すぎるなら、それは悪いこと。式に雑音を入れすぎているのです。その信念は、この言語にいわば組み込まれています」──ソーニャ・ラング（ロック・モーリンによるインタビュー、『ジ・アトランティック』2015年）</blockquote>
  
  <p>批判もある。トキポナで税法を扱うのは不可能だし、基本の数え方は <em>wan</em>, <em>tu</em>, <em>mute</em>、つまり「1、2、たくさん」だけだ（ラングの2014年の本は、<em>luka</em>「手」を5、<em>mute</em>を20、<em>ale</em>「すべて」を100とする刻み目式の体系を加えていて、78なら <em>mute mute mute luka luka luka tu wan</em> となる）。それでもコミュニティは成長を続けている。確かな話者数は誰にもわからないが、2022年1月には3度目の申請で独自のISO 639-3コード <em>tok</em> を獲得した。専用のサブレディットがあり、Discordサーバー <em>ma pona pi toki pona</em>（ラングはここでのアンケートをもとに2021年の辞典を編んだ）があり、2022年にはヘッセ『シッダールタ』の翻訳も出た。詩・音楽・独自表意文字<em>sitelen pona</em>（一語一絵文字）まで生まれている。トキポナで賢くなれるかは議論の余地がある。だが話者の中には、<em>自分が本当に何を言いたいのか</em>を前より深く考えるようになったと語る人もいる。『ジ・アトランティック』の取材に、おかげで前より正直になったと答えた話者もいた。</p>
        `,
      },
      sources: [
        { text: "sona.pona.la: Common lexicalizations", url: "https://sona.pona.la/wiki/Common_lexicalizations" },
        { text: "Wikipedia: Toki Pona", url: "https://en.wikipedia.org/wiki/Toki_Pona" },
        { text: "Morin, Roc (2015). \"How to Say (Almost) Everything in a Hundred-Word Language.\" The Atlantic, July 2015.", url: "https://www.theatlantic.com/technology/archive/2015/07/toki-pona-smallest-language/398363/" },
        'Lang, Sonja (2014). Toki Pona: The Language of Good. Tawhid.',
        'Lang, Sonja (2021). Toki Pona Dictionary (ku). Illustrated edition.',
        'Roberts, Siobhan (2007). "Canadian has people talking about her invented language." The Globe and Mail, 9 July 2007.',
        'Blahuš, Marek (2011). "Toki Pona: eine minimalistische Plansprache." In Sabine Fiedler (ed.), Interlinguistische Informationen, Beiheft 18. Berlin, pp. 51–55.',
        'Okrent, Arika (2009). In the Land of Invented Languages. Spiegel & Grau, ch. on micro-languages.',
        { text: 'Official Toki Pona site', url: 'https://tokipona.org/' },
        { text: 'Glottolog: Toki Pona (toki1239)', url: 'https://glottolog.org/resource/languoid/id/toki1239' },
      ],
    },
    {
      id: 'ithkuil-complexity',
      icon: '🧬',
      tags: ['conlang', 'ithkuil', 'engelang', 'complexity'],
      title: {
        en: 'Ithkuil — the conlang so dense its inventor cannot speak it',
        ja: 'イスクイル──作者自身がすらすら話せない人工言語',
      },
      summary: {
        en: 'John Quijada spent four decades designing a language meant to express maximum precision in minimum space. The first version had 82 phonemes, a later one 96 grammatical cases, and two words of it can carry a whole English sentence.',
        ja: 'ジョン・キハダが40年かけて設計した「精密さの極限」言語。音素は初版で82、のちの版では文法格が96。たった2語で英文一文をまるごと運べる。本人ですら流暢には話せない。',
      },
      body: {
        en: `
  <p>Most constructed languages aim to be <em>easy</em>. <strong>Ithkuil</strong> is the opposite: it is an <em>engineered language</em> (an "engelang") whose explicit goal is to express, in the fewest possible morphemes, the maximum possible amount of cognitive information — to be, as its creator puts it, "an idealized linguistic engineering experiment".</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="40" data-lng="0" data-zoom="3">🗺️ Fly to Ithkuil's home (nowhere)</button>
  </div>
  
  <p>The creator is <strong>John Quijada</strong>, an amateur linguist from Los Angeles who studied linguistics at Cal State Fullerton but could not afford to go on, and went to work for the California Department of Motor Vehicles. He began what would become Ithkuil in the late 1970s, after earlier inventions: Mbozo, made at fifteen, and Pskeoj, whose vocabulary he pounded out at random on a typewriter. He published the first complete version in 2004 on his personal site, then a simplified reworking called <strong>Ilaksh</strong> in 2007, then reverted and expanded it as Ithkuil III ("Ithkuil 2011") in 2011, refining that through 2020, and in February 2023 he replaced it outright with a successor language, <strong>New Ithkuil</strong> (TNIL, "The New Ithkuilic Language"), which cuts the sound system to 31 consonants and 9 vowels. He has never claimed Ithkuil should be a community language. He calls it a thought experiment.</p>
  
  <p>Some of the design parameters are vertigo-inducing:</p>
  
  <ul>
    <li>The 2004 phonology used <strong>82 phonemes</strong> — 65 consonants and 17 vowels — including ejectives, uvulars, pharyngeals, tone, and length contrasts. The 2011 revision trimmed it to 45 consonants and 13 vowels — far more than most languages, though not a world record: Taa (ǃXóõ) of Botswana is credited with 58 to 87 consonants and 20 to 31 vowels, depending on the analysis.</li>
    <li>The 2011 version has <strong>96 grammatical cases</strong> (the 2004 original had 81), against Hungarian's 18 or Finnish's 15.</li>
    <li>Every word encodes simultaneously: <em>configuration</em>, <em>affiliation</em>, <em>perspective</em>, <em>essence</em>, <em>extension</em>, <em>context</em> and several other categories that have no real equivalent in English.</li>
    <li>Verbs carry obligatory marking for <em>validation</em> — how the speaker knows the information (direct observation, inference, hearsay, intuition, etc.) — in a system more elaborate than most natural evidential systems.</li>
  </ul>
  
  <p>A famous example sentence from Quijada's grammar:</p>
  
  <blockquote><em>Tram-mļöi hhâsmařpţuktôx.</em><br>"On the contrary, I think it may turn out that this rugged mountain range trails off at some point."</blockquote>
  
  <p>Two words. A full English sentence. That density is the entire point.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="34" data-lng="-118" data-zoom="4">🗺️ Fly to California (Quijada's home)</button>
  </div>
  
  <p>Ithkuil shot to wider fame in <strong>December 2012</strong>, when Joshua Foer published a feature in <em>The New Yorker</em> titled "Utopian for Beginners". Foer reported that a Russian-speaking following had grown up around the language among adherents of "psychonetics", a self-development movement: Quijada was flown out to a conference in Elista, capital of the Russian republic of Kalmykia, in July 2010, and to a second one in Kiev in May 2011. At the Kiev conference, Oleg Bakhtiyarov — the psychologist who led the movement and directed a small private institution called the University of Effective Development, and no linguist — announced that from the following semester Ithkuil would be a mandatory part of that school's curriculum in Kiev and at three satellite campuses. Quijada, increasingly unnerved by the group, declined Bakhtiyarov's next invitation.</p>
  
  <p>Quijada himself <strong>does not speak Ithkuil fluently</strong>. Every word requires consciously choosing among dozens of grammatical categories before opening one's mouth. Foer watched him translate the English verb "gawk": for fifteen minutes he paged back and forth through his spiral-bound manuscript, adding an affix for surprise, another for social impropriety, a stem for "non-volitional physiological response", until he emerged with one short word, <em>apq'uxasiu</em>.</p>
  
  <p>Is Ithkuil a failure? Only if you measure conlangs by community size. As a piece of <em>linguistic architecture</em>, a decades-long demonstration of how much meaning a few seconds of speech can be made to carry, few projects come close. It is to Esperanto what a Saturn V rocket is to a bicycle: nobody commutes on it, but it shows what is physically possible.</p>
        `,
        ja: `
  <p>たいていの人工言語は「学びやすさ」を目指す。<strong>イスクイル（Ithkuil）</strong>はその真逆だ。これは<em>工学言語</em>（engelang）と呼ばれる種類で、設計目的が明示的に「最小の形態素で最大の認知情報を運ぶこと」、すなわち作者の言葉でいう「理想化された言語工学の実験」である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="40" data-lng="0" data-zoom="3">🗺️ イスクイルの「故郷」（どこにもない）へ飛ぶ</button>
  </div>
  
  <p>作者は<strong>ジョン・キハダ</strong>（John Quijada）。ロサンゼルス出身のアマチュア言語学者で、カリフォルニア州立大学フラトン校で言語学を学んだものの、学業を続ける余裕がなく、カリフォルニア州車両管理局に就職した。15歳で作った<em>Mbozo</em>、タイプライターをでたらめに叩いて語彙をこしらえた<em>Pskeoj</em>といった習作を経て、1970年代後半に後のイスクイルとなる言語に着手し、2004年に最初の完成版を個人サイトで公開、2007年には音韻を簡略化した改作<strong>Ilaksh</strong>（イラクシュ）を出し、2011年にはそれを撤回・拡張した第3版「Ithkuil 2011」を発表して2020年まで改訂を続けた。そして2023年2月、後継言語<strong>New Ithkuil</strong>（TNIL＝The New Ithkuilic Language）に置き換えた。こちらは音体系を子音31・母音9にまで絞り込んでいる。彼自身、イスクイルをコミュニティ言語にすべきだと主張したことは一度もない。あくまで思考実験だ。</p>
  
  <p>設計指標はめまいがするほど過剰だ。</p>
  
  <ul>
    <li>2004年版の音素は<strong>82個</strong>（子音65・母音17）。放出音、口蓋垂音、咽頭音、声調、長短対立まで含む。2011年版では子音45・母音13に削減された。大半の言語よりはるかに多いが、世界一というわけではない。ボツワナのタア語（ǃXóõ）は分析次第で子音58〜87、母音20〜31を数える。</li>
    <li>2011年版の文法格は<strong>96</strong>（2004年の初版では81）。ハンガリー語の18、フィンランド語の15と比べてみてほしい。</li>
    <li>全語が同時に<em>configuration（構成）</em>、<em>affiliation（成員間の目的関係）</em>、<em>perspective（視座）</em>、<em>essence（本質）</em>、<em>extension（拡張）</em>、<em>context（文脈）</em>などを符号化する。英語に対応概念のないカテゴリーが多い。</li>
    <li>動詞には<em>validation（情報源タイプ）</em>──直接観察か、推論か、伝聞か、直観か──を表す義務的標識がある。たいていの自然言語の証拠性体系より精密だ。</li>
  </ul>
  
  <p>有名な例文を引こう。</p>
  
  <blockquote><em>Tram-mļöi hhâsmařpţuktôx.</em><br>「だが私としては、この険しい山脈は、どこかの時点でなだらかに消えていくのかもしれない、と思う。」</blockquote>
  
  <p>2語で英文一文。これがイスクイルの本領だ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="34" data-lng="-118" data-zoom="4">🗺️ キハダの拠点カリフォルニアへ</button>
  </div>
  
  <p>2012年12月、ジョシュア・フォアが<em>『ザ・ニューヨーカー』</em>に「Utopian for Beginners（初心者のためのユートピア）」と題する長編記事を発表し、イスクイルは一気に世間に知られた。記事によれば、ロシア語圏では「プシコネチカ（psychonetics）」という自己開発運動の信奉者たちがイスクイルに熱狂しており、キハダは2010年7月にカルムイク共和国の首都エリスタで、2011年5月にはキエフで開かれた大会に招かれた。キエフの会場では、この運動を率いる心理学者オレグ・バフチヤロフ（言語学者ではない）が、自身の主宰する私立校「効果的発展大学」のキエフ本校と三つの分校で、次学期からイスクイルを必修科目にすると宣言した。だがキハダは彼らの奇矯さに戸惑い、次の招待は辞退している。</p>
  
  <p>キハダ自身、<strong>イスクイルを流暢には話せない</strong>。一語ごとに、口を開く前に数十の文法カテゴリーから意識的に選ばなければならないのだ。フォアは、キハダが英語の動詞 "gawk"（ぽかんと見とれる）を訳すところを見ている。キハダはらせん綴じの原稿を15分にわたって行きつ戻りつめくり、驚きを表す接辞を足し、社会的な不作法を表す接辞を足し、「意図しない生理的反応」を表す語幹を選び、ようやく短い一語 <em>apq'uxasiu</em> にたどり着いた。</p>
  
  <p>イスクイルは失敗作だろうか。コミュニティ規模で測ればそうかもしれない。だが、ほんの数秒の発話にどれだけの意味を詰め込めるのか──それを何十年もかけて示してみせた<em>言語建築</em>として、これに迫るプロジェクトはほとんどない。エスペラントが自転車なら、イスクイルはサターンV型ロケットだ。誰も通勤には使わない。だが、何が物理的に可能かを示すものとして、これは紛れもなく偉業である。</p>
        `,
      },
      sources: [
        { text: "Wikipedia: Ithkuil", url: "https://en.wikipedia.org/wiki/Ithkuil" },
        'Quijada, John (2011). A Grammar of the Ithkuil Language. Self-published, ithkuil.net.',
        'Foer, Joshua (2012). "Utopian for Beginners: An amateur linguist loses control of the language he invented." The New Yorker, 24 December 2012.',
        'Quijada, John (2004). Ithkuil: A Philosophical Design for a Hypothetical Language. ithkuil.net (archive).',
        'Schreyer, Christine (2015). "The digital fandom of Na\'vi speakers." Transformative Works and Cultures 18.',
        'Sapir, Edward (1921). Language: An Introduction to the Study of Speech. Harcourt — referenced as historical background to engelang projects.',
        { text: 'Official Ithkuil website (Quijada)', url: 'https://ithkuil.net/' },
        { text: 'The New Yorker — Utopian for Beginners', url: 'https://www.newyorker.com/magazine/2012/12/24/utopian-for-beginners' },
      ],
    },
    {
      id: 'hangul-scientific-script',
      icon: '🇰🇷',
      tags: ['hangul', 'korean', 'script', 'sejong', 'featural'],
      title: {
        en: 'Hangul — the design principles of the Korean alphabet',
        ja: 'ハングル──王が「実験室」で設計した文字',
      },
      summary: {
        en: 'In 1443 King Sejong introduced a Korean alphabet whose basic consonant shapes represent positions of the speech organs. Elite opposition and later restrictions did not prevent it from becoming Korea\'s principal script.',
        ja: '1443年に世宗が創製した朝鮮語の文字体系。基本子音字は調音器官の形を表し、母音字は天・地・人という設計原理に基づく。',
      },
      body: {
        en: `
  <p>Most alphabets evolved. They drift over centuries from pictographs to abstractions, no one quite remembers why a "B" looks the way it does. <strong>Hangul</strong> is not like that. Hangul has a birthday, more or less: South Korea celebrates it on <strong>9 October</strong>, a best estimate for when its explanatory handbook, the <em>Hunminjeongeum Haerye</em>, came out in the ninth lunar month of 1446 (the book is dated only to the first ten days of that month). And it has a named inventor: <strong>King Sejong the Great</strong> (世宗大王, r. 1418–1450) of Joseon Korea, working with the scholars of his Hall of Worthies (集賢殿, <em>Jiphyeonjeon</em>).</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ko" data-zoom="6">🌍 Show Korean on map</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="ko">👋 "Hello" — <em>안녕하세요</em></button>
  </div>
  
  <p>Sejong's motivation is set out in the project's preface:</p>
  
  <blockquote>"The speech of our country is different from that of China and does not match the Chinese characters. Therefore, even if the ignorant want to communicate, many of them cannot express themselves. Thinking of this with pity, I have newly designed twenty-eight letters, wishing only that everyone may easily learn them and use them in their daily life." — King Sejong, <em>Hunminjeongeum</em> preface, 1446</blockquote>
  
  <p>Before Hangul, Koreans wrote in <em>Hanja</em> (Chinese characters), usually in Classical Chinese, a system so demanding that full literacy was largely confined to the male aristocratic <em>yangban</em> class. The new script was meant to be the opposite. The handbook's closing essay, by the scholar Jeong In-ji, boasts that a clever person could master it before the morning was out, and even a slow one within ten days.</p>
  
  <p>What he and his scholars produced is the most-cited example of a <strong>featural alphabet</strong> — a category proposed by Geoffrey Sampson in 1985 and not accepted by every scholar, John DeFrancis among the dissenters — meaning the shapes of the letters reflect the phonetic features of the sounds they represent:</p>
  
  <ul>
    <li><strong>ㄱ</strong> (g/k) is a side view of the back of the tongue rising to block air at the soft palate.</li>
    <li><strong>ㄴ</strong> (n) shows the tip of the tongue touching the alveolar ridge behind the teeth.</li>
    <li><strong>ㅁ</strong> (m) is a closed mouth.</li>
    <li><strong>ㅅ</strong> (s) is shaped like a tooth — the constriction is at the teeth.</li>
    <li><strong>ㅇ</strong> (ng / silent) is a round, open throat.</li>
    <li>The aspirated version of each consonant is formed by adding a stroke (ㄱ → ㅋ, ㄷ → ㅌ, ㅂ → ㅍ); the tense version is formed by doubling the letter outright (ㄱ → ㄲ). Either way, the graphical complexity tracks the phonetic complexity.</li>
  </ul>
  
  <p>The vowels are even more conceptual. They are built from three primitives: a horizontal line ─ (earth), a vertical line │ (man), and a dot · (heaven, later flattened into a short stroke). Combinations of these three Confucian elements give every Korean vowel: ㅏ, ㅓ, ㅗ, ㅜ, and so on.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="ko">1️⃣ "One" — <em>하나</em> / <em>일</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="ko">🌙 "Moon" — <em>달</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="ko">💧 "Water" — <em>물</em></button>
  </div>
  
  <p>The Korean Confucian elite hated it. Choe Manri, deputy head of the Hall of Worthies itself, led a group of its scholars in a famous 1444 memorial calling Hangul "Mongol- or barbarian-like" and warning that adopting a vernacular script would sever Korea from civilized (i.e. Chinese) learning. Sejong overruled him. Even so, after Sejong's death in 1450, Hangul was sidelined; King Yeonsangun banned it outright in 1504 after anonymous Hangul leaflets criticized him. For most of the next four centuries it survived as a "women's script" (<em>amkeul</em>) and a tool of popular literature, while serious scholarship continued in Hanja.</p>
  
  <p>Hangul's comeback began in the 1890s. In 1894 the Joseon court made it the preferred script for official documents, and the grammarian Ju Si-gyeong and his circle studied it systematically and gave it its modern name, <em>Hangeul</em>, which appears in the early 1910s and can be read as "Korean script" or "great script". Under Japanese colonial rule (1910–1945) Korean language and writing were increasingly suppressed, especially from the late 1930s; in 1942 members of the Korean Language Society were arrested en masse. That same society had founded Hangul Day (한글날) in 1926. Independent South Korea made it a public holiday in 1949, demoted it in 1990 to save working days, and restored the day off in 2012. North Korea calls the script <em>Chosŏn'gŭl</em> and keeps its own holiday on 15 January, apparently marking the 1443 announcement rather than the 1446 publication. Adult literacy in South Korea is now among the highest in the world.</p>
  
  <p>The linguist Geoffrey Sampson described Hangul in 1985 as "perhaps the most scientific system of writing in general use in any country". Its basic letter shapes can be learned quickly, although full reading and writing fluency still takes years. The <em>Hunminjeongeum Haerye</em> preserves an unusually detailed contemporary account of the script's design principles and intended use.</p>
        `,
        ja: `
  <p>たいていの文字体系は「進化」する。何百年もかけて絵文字から抽象記号へ漂流し、誰も「なぜBはこの形なのか」を覚えていない。<strong>ハングル</strong>はそうではない。ハングルには誕生日がある──だいたいのところは。韓国では<strong>10月9日</strong>に祝うが、これは解説書『<em>訓民正音解例本</em>』が1446年の陰暦9月に刊行された時期を推定した日付だ（本そのものには「9月上旬」としか記されていない）。そして名前のある発明者がいる。朝鮮王朝第4代国王、<strong>世宗大王</strong>（在位1418〜1450）と、彼の集賢殿（<em>チピョンジョン</em>）の学者たちである。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ko" data-zoom="6">🌍 地図で朝鮮語を見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="ko">👋 「こんにちは」──<em>안녕하세요</em></button>
  </div>
  
<p>序文では、新しい文字を作った目的が次のように説明されている。</p>
  
  <blockquote>「国の言葉は中国と異なり、漢字とは通じ合わない。それゆえ無学な民が言いたいことがあっても、ついに己の思いを述べることができない者が多い。これを憐れんで、新たに二十八字を作る。誰もが容易に習い、日々の暮らしに役立てんことを願うのみである」──世宗『訓民正音』序、1446年</blockquote>
  
  <p>ハングル以前の朝鮮では、文章は<em>漢字（ハンジャ）</em>で、たいていは漢文で書かれ、その習得負担ゆえに十分な読み書きができるのはほぼ男性の両班（ヤンバン）階級に限られていた。新しい文字はその正反対を目指した。解説書の巻末に学者・鄭麟趾が寄せた文章は、賢い者なら朝のうちに、愚かな者でも十日あれば覚えられる、と胸を張っている。</p>
  
  <p>その結果生まれた文字は、<strong>featural alphabet（素性文字）</strong>のもっとも代表的な例とされる。ジェフリー・サンプソンが1985年に提唱した分類で、ジョン・ドフランシスをはじめ異を唱える研究者もいる。文字の形が、その音の調音特徴を直接表しているのだ。</p>
  
  <ul>
    <li><strong>ㄱ</strong>（g/k）は、舌の奥が軟口蓋に向かって上がる側面図。</li>
    <li><strong>ㄴ</strong>（n）は舌先が歯茎に触れる形。</li>
    <li><strong>ㅁ</strong>（m）は閉じた口。</li>
    <li><strong>ㅅ</strong>（s）は歯の形──摩擦が起きる位置。</li>
    <li><strong>ㅇ</strong>（ng／無音）は開いた喉。</li>
    <li>激音は元の字に画を足して作り（加画：ㄱ → ㅋ、ㄷ → ㅌ、ㅂ → ㅍ）、濃音は同じ字を二つ並べて作る（各自並書：ㄱ → ㄲ）。いずれも視覚的複雑さが音声的複雑さに対応する。</li>
  </ul>
  
  <p>母音はさらに思想的だ。基本要素は三つ──横線 ─（地）、縦線 │（人）、点 ·（天、後に短線に）。儒教的三才のこの三要素の組み合わせで、すべての母音 ㅏ・ㅓ・ㅗ・ㅜ などが生み出される。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="ko">1️⃣ 「1」は<em>하나</em>／<em>일</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="ko">🌙 「月」は<em>달</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="ko">💧 「水」は<em>물</em></button>
  </div>
  
  <p>儒教官僚はこれを嫌った。集賢殿の副長官にあたる崔萬里は1444年、殿内の学者たちを率いて出した有名な反対上疏で「ハングルはモンゴル・夷狄の文字に似ており、これを採用すれば中華の学問から遠ざかる」と警告した。世宗は退けたが、1450年の死後ハングルは冷遇され、1504年には燕山君が、自らを批判する匿名のハングルの貼り紙を理由に正式に禁止する。以後400年近く、ハングルは<em>암클</em>（女文字）、または民衆文学の道具として生き延びる一方、正格の学問は漢字で続いた。</p>
  
  <p>復権は1890年代に始まった。1894年、朝鮮王朝は公文書にハングルを優先して用いることを定め、文法学者の周時経とその周辺の人々がハングルを体系的に研究し、今の名<em>ハングル</em>を与えた。この名は1910年代初めに現れ、「韓の文字」とも「偉大な文字」とも読める。日本統治期（1910〜1945年）には朝鮮語とその文字は次第に抑圧され、1930年代後半からはそれが一段と強まった。1942年には朝鮮語学会の会員が大量に検挙されている。その朝鮮語学会こそ、1926年に「ハングルの日（한글날）」を始めた団体だった。独立後の韓国は1949年にこれを公休日としたが、1990年に労働日確保のため公休日から外し、2012年に再び休日に戻した。北朝鮮はこの文字を<em>チョソングル</em>と呼び、独自の記念日を1月15日に置いている。1446年の刊行ではなく、1443年の創製の発表を記念したものらしい。今日の韓国の成人識字率は世界でも最高水準にある。</p>
  
<p>言語学者ジェフリー・サンプソンは1985年、ハングルを「世界で使われている文字体系のうち、おそらく最も科学的なもの」と評した。基本字母は比較的短期間で覚えられるが、読み書きの習熟には他の文字と同じく時間がかかる。『訓民正音解例』には字形の設計原理と使用目的が同時代の資料として詳しく残されている。</p>
        `,
      },
      sources: [
        { text: "Wikipedia: Hangul (history, featural script debate)", url: "https://en.wikipedia.org/wiki/Hangul" },
        { text: "Wikipedia: Hangul Day", url: "https://en.wikipedia.org/wiki/Hangul_Day" },
        'Sejong (1446). Hunminjeongeum Haerye (訓民正音解例本). Reprinted facsimile, Korean Cultural Heritage Administration.',
        'Sampson, Geoffrey (1985). Writing Systems: A Linguistic Introduction. Stanford University Press.',
        'Lee, Iksop & Ramsey, S. Robert (2000). The Korean Language. SUNY Press.',
        'Ledyard, Gari K. (1998). The Korean Language Reform of 1446. Seoul: Singu Munhwasa.',
        'King, Ross (1996). "Korean Writing." In The World\'s Writing Systems, ed. Daniels & Bright, Oxford University Press, pp. 218–227.',
        { text: 'Glottolog: Korean (kore1280)', url: 'https://glottolog.org/resource/languoid/id/kore1280' },
        { text: 'UNESCO Memory of the World — Hunminjeongeum Haerye', url: 'https://en.unesco.org/memoryoftheworld/registry/85' },
      ],
    },
    {
      id: 'cherokee-sequoyah',
      icon: '✍️',
      tags: ['syllabary', 'cherokee', 'sequoyah', 'north-america', 'invention'],
      title: {
        en: 'Sequoyah and the creation of the Cherokee syllabary',
        ja: 'シクウォイア──文字を知らぬまま文字を発明した男',
      },
      summary: {
        en: 'In 1821 a Cherokee silversmith who could not read English unveiled a syllabary of 86 characters — 85 of which are still in use today — that he had built alone over 12 years. Within a decade, contemporary observers reported that Cherokee literacy rivaled or exceeded that of the surrounding white settlers.',
        ja: '1821年、英語の読み書きができなかったチェロキー族の銀細工師シクウォイアが、12年かけて独力で完成させた86文字（うち85文字が現在も使われる）の音節文字を披露した。10年後、チェロキー族の識字率は周囲の白人入植者を上回っていた。',
      },
      body: {
        en: `
  <p><strong>Sequoyah</strong> (also written ᏍᏏᏉᏯ <em>Ssiquoya</em>, or in English George Guess, c. 1770–1843) did something almost no one in recorded history has done: he could not read or write any language, yet he invented a complete, working writing system for his own. A few nineteenth-century writers doubted that he did it unaided, but the syllabary itself, and how fast the Cherokee took it up, are well documented.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="chr" data-zoom="5">🌍 Show Cherokee on map</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="chr">👋 "Hello" — <em>ᎣᏏᏲ (osiyo)</em></button>
  </div>
  
  <p>Sequoyah was a silversmith, lame since early life (whether from a wound, a hunting accident or illness is not known), who fought with the Cherokee Regiment under Andrew Jackson in the Creek War of 1813–14. He spoke no English and had had no formal schooling. But he had seen English-speaking soldiers reading and writing letters during the war — what the Cherokee called "talking leaves", and he became convinced that this was not magic but a technology, and that his own people deserved it too.</p>
  
  <p>From around 1809 he worked obsessively on the problem. His first attempt was logographic: one picture-like symbol per word. It soon became clear that no one could memorise that many signs. His neighbours thought he had lost his mind, and his wife is said to have burned his early work as witchcraft. He started again.</p>
  
  <p>The breakthrough was the realisation that Cherokee, like Japanese, has a fairly small inventory of distinct syllables — about 85. A <strong>syllabary</strong>, not an alphabet, was the natural fit. He assigned one symbol to each syllable. By his own account he first had about two hundred characters and, with his daughter's help, whittled them down to eighty-six. Many were borrowed shapes: he is thought to have copied letters from printed English (and possibly Greek) texts he could not read, plus shapes of his own, treating each as a blank token to be matched to a Cherokee sound. The result has letters that look familiar but mean nothing of what their European counterparts mean:</p>
  
  <ul>
    <li><strong>D</strong> in Cherokee is <em>a</em></li>
    <li><strong>R</strong> in Cherokee is <em>e</em></li>
    <li><strong>T</strong> in Cherokee is <em>i</em></li>
    <li><strong>L</strong> in Cherokee is <em>tle</em></li>
    <li><strong>Ꮁ</strong> looks like Greek gamma (Γ) but is the Cherokee syllable <em>hu</em></li>
  </ul>
  
  <p>Around 1821 he demonstrated the system to Cherokee leaders. His six-year-old daughter <em>Ayoka</em> was sent out of earshot while the men named words for him to write down; then she was called back and read them aloud. The leaders were amazed but suspected sorcery. So Sequoyah asked them to pick some bright young men to learn the system. After several months of training the pupils were separated and tested with messages chosen by sceptics, and they passed. Once people saw it worked, the syllabary spread from town to town at astonishing speed: a fluent Cherokee speaker had only to learn 86 signs, not to spell.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="chr">💧 "Water" — <em>ᎠᎹ (ama)</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="fire" data-code="chr">🔥 "Fire" — <em>ᎠᏥᎳ (atsila)</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="chr">🌙 "Moon" — <em>ᏅᏓ ᏒᏃᏱ (nvda svnoyi)</em></button>
  </div>
  
  <p>What happened next has few parallels in the history of literacy. The Cherokee Nation adopted the syllabary officially in 1825, and by then, according to the historian William McLoughlin, most Cherokees could already read and write in it. By 1828 they had begun publishing <em>Tsalagi Tsulehisanvhi / Cherokee Phoenix</em>, the first Native American newspaper, printed bilingually in Cherokee and English on a custom-cast syllabary type. Within roughly ten years of Sequoyah's 1821 demonstration, contemporary observers — including American missionaries — estimated that <strong>Cherokee literacy in their own script exceeded the literacy rate of surrounding white settlers in English</strong>.</p>
  
  <blockquote>"The tribes watched the youths for several months with anxiety; and when they offered themselves for examination, the feelings of all were wrought up to the highest pitch." — Samuel Lorenzo Knapp, <em>Lectures on American Literature</em>, 1829, describing the test of Sequoyah's first pupils</blockquote>
  
  <p>The triumph was followed by tragedy. In 1838–1839, despite the Cherokee Nation's literate, constitutional, newspaper-publishing modern state, President Martin Van Buren's administration — executing the removal treaty Andrew Jackson had secured — forced them westward on the <strong>Trail of Tears</strong>; an estimated 4,000 of 16,000 Cherokee died. The syllabary went with them. Sequoyah himself died in 1843 in Mexico, searching for a rumoured separated band of Cherokee.</p>
  
  <p>Today the Cherokee syllabary is taught in immersion schools in Tahlequah, Oklahoma and Cherokee, North Carolina. It is in Unicode — the original block at U+13A0–U+13FF, joined in 2015 by a Cherokee Supplement block for the lowercase letters — supported by Apple and Google operating systems, and has been used to write everything from translations of the Bible to modern social-media posts. The California coast redwood <em>Sequoia sempervirens</em> is traditionally said to be named after him, though how Endlicher arrived at the name in 1847 is still argued over.</p>
  
  <p>His idea also travelled far beyond the Cherokee. Missionaries and local inventors who heard of it went on to create syllabaries of their own; the linguist Peter Unseth counts 21 scripts, used for more than 65 languages in North America, Africa and Asia, that trace back to Sequoyah's example. The man could not read English. He gave a nation a script, and showed the world it could be done.</p>
        `,
        ja: `
<p><strong>シクウォイア</strong>（ᏍᏏᏉᏯ、英語名 George Guess、約1770〜1843）は、記録に残る歴史の中でほとんど誰も成し遂げていないことをやってのけた。どの言語の読み書きもできないまま、自分の言語のために、完全に機能する文字体系をまるごと発明したのだ。19世紀には独力でできたはずがないと疑う書き手も少しはいたが、音節文字そのものと、チェロキーの人々がそれを驚くほどの速さで受け入れた経緯は、しっかり記録に残っている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="chr" data-zoom="5">🌍 地図でチェロキー語を見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="chr">👋 「こんにちは」──<em>ᎣᏏᏲ (osiyo)</em></button>
  </div>
  
  <p>シクウォイアは銀細工師で、若いころから足が不自由だった（傷によるものか、狩りの事故か、病気かはわかっていない）。1813〜14年のクリーク戦争では、アンドリュー・ジャクソン将軍麾下のチェロキー連隊で戦った。英語は話せず、学校教育も受けていない。しかし戦地で、英語話者の兵士が手紙を読み書きする様子──チェロキー族が「話す葉（talking leaves）」と呼んだもの──を目にし、これは魔法ではなく技術であり、同胞も持つべきだと確信した。</p>
  
  <p>1809年ごろから彼は取り憑かれたように作業した。最初の試みは表語的、すなわち単語ごとに絵のような記号を1つずつ当てるものだった。だが、それほど多くの記号は誰にも覚えきれないことがすぐに明らかになる。近所の人々は彼の気が触れたと思い、妻は初期の原稿を妖術だとして焼いてしまった、という逸話まで残る。彼はゼロから始め直した。</p>
  
  <p>突破口は、チェロキー語は日本語と同じく、明確な音節の種類が比較的少ない──約85──という洞察だった。アルファベットではなく<strong>音節文字（syllabary）</strong>こそが最適である。彼は1音節に1記号を割り振った。本人の話では、最初はおよそ200字あったものを、娘の手を借りて86字まで絞り込んだという。字形の多くは借り物だ。読めもしない英語の（もしかするとギリシャ語の）印刷物から文字を写し取ったと考えられており、そこに自作の形も加えて、それぞれを意味のない白紙の記号としてチェロキー語の音に当てはめていった。結果、ヨーロッパ文字に似ているが意味は全く違う字体が並ぶ。</p>
  
  <ul>
    <li><strong>D</strong> はチェロキーでは <em>a</em></li>
    <li><strong>R</strong> はチェロキーでは <em>e</em></li>
    <li><strong>T</strong> はチェロキーでは <em>i</em></li>
    <li><strong>L</strong> はチェロキーでは <em>tle</em></li>
    <li><strong>Ꮁ</strong> はギリシャ文字のガンマ（Γ）に見えるがチェロキーの <em>hu</em></li>
  </ul>
  
  <p>1821年ごろ、彼はチェロキーの指導者たちの前でこの文字を実演してみせた。6歳の娘<em>アヨカ</em>を声の届かない場所へ下がらせ、男たちが挙げた言葉を彼が書き留める。それから娘を呼び戻し、読み上げさせたのだ。指導者たちは驚嘆したが、妖術ではないかと疑った。そこでシクウォイアは、利発な若者を何人か選んでこの文字を学ばせてほしいと頼んだ。数か月の訓練ののち、若者たちは別々にされ、疑い深い人々が選んだ文面で試されたが、見事に合格した。本当に使えるとわかると、音節文字は町から町へ驚くべき速さで広まった。チェロキー語を流暢に話す人なら、86の記号を覚えるだけでよく、綴りを学ぶ必要はなかったのである。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="chr">💧 「水」は<em>ᎠᎹ (ama)</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="fire" data-code="chr">🔥 「火」は<em>ᎠᏥᎳ (atsila)</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="chr">🌙 「月」は<em>ᏅᏓ ᏒᏃᏱ (nvda svnoyi)</em></button>
  </div>
  
  <p>そこから先は、識字の歴史でもほとんど類例のない展開となる。チェロキー国は1825年、シラバリーを公式に採用したが、歴史家ウィリアム・マクローリンによれば、その頃にはすでにチェロキーの大半がこの文字で読み書きできた。1828年には全米初の先住民新聞<em>『Tsalagi Tsulehisanvhi / チェロキー・フェニックス』</em>がチェロキー語・英語併載で刊行された。シクウォイアの実証から10年程度の間に、宣教師を含む同時代の観察者は「<strong>チェロキー族のチェロキー文字識字率は、周囲の白人入植者の英語識字率を上回っている</strong>」と報告するに至る。</p>
  
  <blockquote>「部族は数か月のあいだ不安を抱えたままその若者たちを見守った。そして彼らが試験に臨んだとき、一同の感情は極限にまで高まった」── S・L・ナップ『アメリカ文学講義』1829年。シクウォイアの最初の生徒たちの試験を描いた一節</blockquote>
  
  <p>しかし栄光のあとに悲劇が待っていた。1838〜1839年、識字率も憲法も新聞も持つ近代国家であったにもかかわらず、ヴァン・ビューレン政権は──ジャクソンが取り付けた移住条約を執行する形で──チェロキーを西方へ強制移住させた。<strong>「涙の道（Trail of Tears）」</strong>である。1万6千人のうち約4千人が死んだ。シラバリーは彼らとともに西へ運ばれた。シクウォイア自身は1843年、「西に分かれた同胞がいる」という噂を追ってメキシコ領内で客死した。</p>
  
  <p>今日、チェロキー文字はオクラホマ州タレクワやノースカロライナ州チェロキーのイマージョン学校で教えられている。Unicode（U+13A0〜U+13FF）に収録され、Apple・Googleが標準対応する。聖書翻訳から現代のSNS投稿まで使われている。カリフォルニアのセコイアメスギ（<em>Sequoia sempervirens</em>、コーストレッドウッド）は彼にちなむと伝統的に言われてきたが、エンドリッヒャーが1847年にこの名をどう思いついたかは今も議論が続いている。</p>

  <p>彼のアイデアはチェロキーをはるかに越えて旅をした。その話を耳にした宣教師や各地の考案者たちが、独自の音節文字を次々に生み出したのだ。言語学者ピーター・アンセスは、シクウォイアの先例にさかのぼる文字を21種数えている。北米・アフリカ・アジアの65を超える言語で使われてきた文字である。英語を読めなかった男が、一つの民族に文字を与え、そしてそれが可能なのだと世界に示したのだ。</p>
        `,
      },
      sources: [
        { text: "Knapp, Samuel L. (1829). Lectures on American Literature (full text, Internet Archive)", url: "https://archive.org/details/lecturesonameric00knap" },
        { text: "Unseth, Peter (2016). \"The international impact of Sequoyah's Cherokee syllabary.\" Written Language & Literacy 19(1): 75–93.", url: "https://doi.org/10.1075/wll.19.1.03uns" },
        'Foreman, Grant (1938). Sequoyah. Norman: University of Oklahoma Press.',
        'Cushman, Ellen (2011). The Cherokee Syllabary: Writing the People\'s Perseverance. University of Oklahoma Press.',
        'Walker, Willard & Sarbaugh, James (1993). "The Early History of the Cherokee Syllabary." Ethnohistory 40(1): 70–94.',
        'Bender, Margaret (2002). Signs of Cherokee Culture: Sequoyah\'s Syllabary in Eastern Cherokee Life. University of North Carolina Press.',
        'Knapp, Samuel L. (1829). Lectures on American Literature. New York: Elam Bliss.',
        { text: 'Glottolog: Cherokee (cher1273)', url: 'https://glottolog.org/resource/languoid/id/cher1273' },
        { text: 'Unicode block: Cherokee (U+13A0–U+13FF)', url: 'https://www.unicode.org/charts/PDF/U13A0.pdf' },
      ],
    },
    {
      id: 'vai-dream-script',
      icon: '💭',
      tags: ['syllabary', 'vai', 'liberia', 'west-africa', 'dream-script'],
      title: {
        en: 'Vai — the West African script that came in a dream',
        ja: 'ヴァイ文字──夢から生まれた西アフリカの音節文字',
      },
      summary: {
        en: 'In the early 1830s a Vai man named Momolu Duwalu Bukele dreamt that a tall white stranger brought him a book. He and five relatives then built a script for their own language, and today that script is on smartphones.',
        ja: '1830年代初め、ヴァイ族のモモル・ドゥワル・ブケレは、背の高い白人の見知らぬ男が本を持ってくる夢を見た。彼は5人の親族とともに自分たちの言語のための文字を作り上げ、今ではその文字がスマートフォンにも収録されている。',
      },
      body: {
        en: `
  <p>Several script inventors have said that they received their characters in a dream or vision. The <strong>Vai syllabary</strong> of Liberia is one of the best-documented cases. It appeared around 1832–33 and is one of the earliest scripts invented in modern West Africa.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="vai" data-zoom="6">🌍 Show Vai on map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="6.5" data-lng="-11" data-zoom="6">🗺️ Fly to coastal Liberia</button>
  </div>
  
  <p>The inventor was <strong>Mɔmɔlu Duwalu Bukɛlɛ</strong> (variously transcribed Momolu Duwalu Bukele; Koelle wrote <em>Doalu Bukara</em>) of the Vai people, who live along the coast of what is now Liberia and Sierra Leone. In 1849 the German missionary <strong>S. W. Koelle</strong> travelled into Vai country, met him ("now about forty years old"), and published his account that same year in <em>Narrative of an Expedition into the Vy Country</em>. Bukele told him that "about fifteen years ago" he had had a dream:</p>
  
  <blockquote>"I had a dream, in which a tall, venerable looking white man appeared to me, saying, 'I am sent to you by other white men.' ... 'I bring you a book.'" — Bukele's account, as recorded by Koelle, <em>Narrative</em> (1849), pp. 21–22</blockquote>
  
  <p>In the dream the messenger taught him to read on the spot. Retelling it to Koelle, Bukele traced the signs on the ground with his finger: this sign means <em>i</em>, this one <em>na</em>, now read them together: <em>ina</em>, "come here!" But when Bukele woke, he could not remember the signs. So, in his own words as Koelle reports them, he and his friends "had to put their heads together, in order to make new ones."</p>
  
  <p>Those friends were his brother Dshara Barakora and four cousins, Dshara Kali, Kali Bara, Fa Gbasi and So Tabaku, all between twenty and thirty years old. To win the king's support they presented him with a hundred sticks of salt. He ordered them to teach the new script, and they opened a school in their town, Dshondu, where boys, girls, men and even some women learned to read. About eighteen months later the town was burned in a war, and the books burned with it. The script survived anyway. A committee at the University of Liberia standardised it in 1962, and the modern set is usually given as about <strong>212 characters</strong>.</p>
  
  <p>Vai is a Mande language, like Mandinka and Bambara, with a clear (C)V(N) syllable structure and seven vowels that also carry contrastive tone. The syllabary maps that structure closely: each character represents one consonant + vowel unit, with a syllable-final nasal added as a separate sign (ꘋ). What it does not write is tone. Vai is a tonal language, but no tone marks appear on the page, and readers work them out from context. Koelle thought a few signs began as pictures, among them <em>dshi</em>, "water" (written ꕀ), but noted that they are used for their sound just as often as the rest.</p>
  
  <ul>
    <li>Koelle traced Bukele's spark to his years carrying letters for coastal traders. When his master read in a letter what mischief he had got up to in a distant town, Bukele wondered why his own people had no such thing "by which we could speak with each other, though separated by a large space of land."</li>
    <li>By 1849, Koelle reported, nearly every grown man in Bukele's new town of Bandakoro could "more or less" read and write the script, and he quoted from a book written in it by Kali Bara, one of the original six.</li>
    <li>The script survived the Liberian civil wars (1989–2003) and the 2014 Ebola outbreak.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="vai">💧 "Water" — <em>ꕀ (ji)</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="vai">👋 See Vai "Hello"</button>
  </div>
  
  <p>Vai literacy became the subject of a famous <strong>1981 study by Sylvia Scribner and Michael Cole</strong>, <em>The Psychology of Literacy</em>. Vai society was — and to some extent still is — a natural laboratory: many adults are literate in one, two or three scripts (Vai, Arabic, Latin), each acquired in a different setting (Vai informally from kin, Arabic in Quran schools, Latin in colonial-style schools). Scribner and Cole compared the cognitive effects of each and concluded that the "intellectual benefits of literacy" famously claimed by earlier scholars were largely <em>specific to schooling</em>, not to literacy as such. Vai script literacy, learned informally, did not by itself transform thinking. It was an enormously influential finding in education research.</p>
  
  <p>Vai script was added to <strong>Unicode 5.1 in 2008</strong> (block U+A500–U+A63F), and is now available on Android, iOS and major Linux distributions. There are Vai keyboard layouts and a small online community. Almost 200 years after Bukele's dream, a phone can send a message in the syllabary that six young men started in the 1830s.</p>
  
  <p>Some historians have asked whether Bukele had seen the Cherokee syllabary, since a Cherokee settler, Austin Curtis, had married into a leading Vai family. Whatever lay behind the dream, Bukele saw something many Europeans of his day missed: writing is not magic, and any people who want it can make it.</p>
        `,
        ja: `
  <p>文字の発明者が、夢や幻視を創案の契機として語る例がある。リベリアの<strong>ヴァイ文字</strong>は、そのもっともよく記録された例のひとつだ。1832〜33年ごろに生まれ、近代西アフリカで発明された最初期の文字のひとつに数えられる。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="vai" data-zoom="6">🌍 地図でヴァイ語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="6.5" data-lng="-11" data-zoom="6">🗺️ リベリア沿岸へ飛ぶ</button>
  </div>
  
  <p>発明者は<strong>モモル・ドゥワル・ブケレ</strong>（Mɔmɔlu Duwalu Bukɛlɛ。ケーレは <em>Doalu Bukara</em> と書いた）。現在のリベリア・シエラレオネ沿岸に住むヴァイ族の人物だ。1849年、ドイツ人宣教師<strong>S・W・ケーレ</strong>はヴァイの地を訪れて彼に会い（「いま40歳ほど」）、同じ年に『ヴァイ地方探検記』（<em>Narrative of an Expedition into the Vy Country</em>）でその話を公刊した。ブケレは「15年ほど前」に夢を見たと語ったという。</p>
  
  <blockquote>「私は夢を見た。背の高い、威厳ある白人の老人が現れ、こう言った。『私は他の白人たちから遣わされた』……『あなたに本を持ってきた』」──ブケレの証言、ケーレ『探検記』（1849年）21〜22ページ</blockquote>

  <p>夢の中で、使者はその場で彼に読み方を教えた。ケーレに夢の話をしながら、ブケレは指で地面に記号をなぞってみせた。この記号は <em>i</em>、これは <em>na</em>、続けて読むと <em>ina</em>、「こっちへ来い！」。ところが目覚めると、ブケレは記号を思い出せなかった。そこで、ケーレが伝える本人の言葉によれば、彼と仲間たちは「新しい記号を作るために、知恵を寄せ合わねばならなかった」のである。</p>
  
  <p>その仲間とは、弟のジャラ・バラコラと4人のいとこ、ジャラ・カリ、カリ・バラ、ファ・グバシ、ソ・タバクで、みな20歳から30歳だった。王の後ろ盾を得るため、彼らは塩の棒100本を献上した。王は新しい文字を教えるよう命じ、彼らは自分たちの町ジョンドゥに学校を開いた。そこでは少年も少女も、大人の男たちも、さらには一部の女性まで読み方を学んだ。ところが1年半ほど後、町は戦で焼かれ、書物もろとも灰になった。それでも文字は生き延びた。1962年にリベリア大学の委員会が標準化し、現行の字数はふつう約<strong>212字</strong>とされる。</p>
  
  <p>ヴァイ語はマンディンカ語やバンバラ語と同じマンデ語族で、明確な (C)V(N) 音節構造と7母音、そして弁別的な声調を持つ。シラバリーはこの構造にほぼ対応しており、各文字が「子音＋母音」の組を表し、末尾の鼻音は別の鼻音字（ꘋ）を添えて書く。ただし声調だけは表記されない。ヴァイ語は声調言語だが、紙の上に声調記号は現れず、読み手が文脈から判断する。ケーレは、いくつかの字は絵から始まったと考えた。「水」を表す <em>dshi</em>（ꕀ）もその一つだが、ほかの字と同じように音のためだけにもよく使われる、と彼は記している。</p>
  
  <ul>
    <li>ケーレは、ブケレのひらめきの源を、沿岸の商人の手紙を運んでいた日々にたどっている。遠くの町で彼がしでかしたいたずらを、主人が手紙で読み知ったとき、ブケレは不思議に思った。なぜ自分たちの民には、「広い土地を隔てていても互いに話ができる」こういうものがないのだろう、と。</li>
    <li>1849年には、ブケレの新しい町バンダコロの成人男性のほぼ全員が、この文字を「多かれ少なかれ」読み書きできた、とケーレは報告している。彼は、最初の6人のひとりカリ・バラがこの文字で書いた本からの引用も載せている。</li>
    <li>1989〜2003年のリベリア内戦、2014年のエボラ流行も生き延びた。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="vai">💧 「水」は<em>ꕀ (ji)</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="vai">👋 ヴァイ語の「こんにちは」</button>
  </div>
  
  <p>ヴァイ族の識字は教育学史でも有名な事例となった。<strong>シルヴィア・スクリブナーとマイケル・コールの1981年の研究『The Psychology of Literacy』</strong>がそれだ。ヴァイ社会では多くの成人が1〜3種の文字（ヴァイ／アラビア／ラテン）に通じ、それぞれ異なる場（親族から非公式に／クルアーン学校で／植民地式学校で）で習得していた。スクリブナーとコールは認知効果を比較し、過去の研究者が主張してきた「識字の知的恩恵」は、実は<em>学校教育に特有のもの</em>であって識字そのものの効果ではない、と結論づけた。家庭で習うヴァイ文字識字は思考様式を変容させていなかった。この知見は教育研究に絶大な影響を与えた。</p>
  
  <p>ヴァイ文字は<strong>2008年のUnicode 5.1</strong>に収録され（U+A500〜U+A63F）、Android・iOS・主要なLinuxディストリビューションが対応する。ヴァイ文字のキーボード配列も、小さなオンラインコミュニティもある。ブケレの夢から200年近くたった今、6人の若者が1830年代に始めた音節文字で、スマートフォンからメッセージを送ることができるのだ。</p>
  
  <p>ブケレはチェロキー文字を目にしていたのではないか、と問う歴史家もいる。チェロキーの入植者オースティン・カーティスが、ヴァイの有力な一族に婿入りしていたからだ。夢の背後に何があったにせよ、ブケレは、同時代の多くのヨーロッパ人が見落としていたことを見抜いていた。文字は魔法ではなく、欲する民族ならどこでも自分の手で作れる、ということを。</p>
        `,
      },
      sources: [
        { text: "Wikipedia: Vai syllabary", url: "https://en.wikipedia.org/wiki/Vai_syllabary" },
        { text: "Koelle, S. W. (1849). Narrative of an Expedition into the Vy Country of West Africa, and the Discovery of a System of Syllabic Writing. London: Seeleys.", url: "https://archive.org/details/narrativeofexped00koeliala" },
        'Koelle, S. W. (1854). Outlines of a Grammar of the Vei Language, Together with a Vei-English Vocabulary, and an Account of the Discovery and Nature of the Vei Mode of Syllabic Writing. London: Church Missionary House.',
        'Scribner, Sylvia & Cole, Michael (1981). The Psychology of Literacy. Cambridge, MA: Harvard University Press.',
        'Tuchscherer, Konrad & Hair, P. E. H. (2002). "Cherokee and West Africa: Examining the Origins of the Vai Script." History in Africa 29: 427–486.',
        'Dalby, David (1967). "A Survey of the Indigenous Scripts of Liberia and Sierra Leone: Vai, Mende, Loma, Kpelle and Bassa." African Language Studies 8: 1–51.',
        'Singler, John Victor (1996). "Scripts of West Africa." In The World\'s Writing Systems, ed. Daniels & Bright, Oxford University Press, pp. 593–598.',
        { text: 'Glottolog: Vai (vaii1241)', url: 'https://glottolog.org/resource/languoid/id/vaii1241' },
        { text: 'Unicode block: Vai (U+A500–U+A63F)', url: 'https://www.unicode.org/charts/PDF/UA500.pdf' },
      ],
    },
    {
      id: 'tangut-deciphered',
      icon: '🈯',
      tags: ['tangut', 'dead-language', 'xixia', 'decipherment', 'sino-tibetan'],
      title: {
        en: 'Tangut — reconstructing the script of Western Xia',
        ja: '失われた王朝の文字、西夏文',
      },
      summary: {
        en: 'Western Xia used some 6,000 Tangut characters for a Sino-Tibetan language. Manuscripts rediscovered around 1900 enabled twentieth-century scholars to reconstruct much of the script and language.',
        ja: '1036年に皇帝の命令で作られた約6000字の表意文字。400年眠った西夏文を、ロシア人言語学者ネフスキーが甦らせた。',
      },
      body: {
        en: `
  <p>In 1036 CE, the emperor <strong>Li Yuanhao</strong> of the <strong>Western Xia</strong> (Xixia / 西夏) dynasty decreed a writing system for the Tangut language. His scholar Yeli Renrong is said to have invented the script in a matter of years: roughly <strong>6,000 logographs</strong>, each a new design that resembles Chinese characters without borrowing from them. The result is <strong>Tangut (西夏文)</strong>, a script with dense, square, multi-part characters.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="txg" data-zoom="5">🌍 Show Tangut on map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="38.5" data-lng="106" data-zoom="5">🗺️ Fly to the Xixia heartland</button>
  </div>
  
  <p>The Western Xia empire, centred on what is now Ningxia and Gansu in north-west China, lasted nearly two centuries — long enough to produce a Buddhist canon translated from Chinese and Tibetan, dictionaries, a law code, government schools that taught the script, and a bureaucracy that wrote in it. Then in <strong>1227</strong> the Mongols under Genghis Khan razed it. Tangut outlived its empire by centuries. Communities scattered east kept writing it as a liturgical and scholarly language, and the last datable Tangut texts are two Buddhist dhāraṇī pillars raised at Baoding in Hebei — some 800 km east of the old Xixia capital — in <strong>1502</strong>, the middle of the Ming. After that the script vanished from active use, and for three centuries nobody could even name it. In 1804 the Chinese scholar Zhang Shu noticed that a two-language stele in a Wuwei temple carried a Western Xia era date beside its Chinese text, and realised that the strange characters on the other face must be the lost Xixia script.</p>
  
  <p>What linguists eventually rediscovered was a <strong>Sino-Tibetan</strong> language whose closest living relatives seem to be the <strong>Gyalrongic</strong> languages of western Sichuan (often grouped under Qiangic). Its syllables were simple, a consonant plus a vowel, and each carried one of two tones, level (平聲) or rising (上聲); the complexity lay instead in its 105 rhymes. The script was built just as unusually: the Tangut dictionary <em>Sea of Characters</em> explains each character as assembled from pieces of other Tangut characters, not from any Chinese ancestor. About 5,900 distinct characters are known today.</p>
  
  <ul>
    <li><strong>Created, not evolved.</strong> Unlike Chinese, whose characters grew organically over millennia, the core of the Tangut script was designed deliberately, in a few years, by a team working under imperial order. That makes it one of the very few large-scale "constructed" scripts in human history.</li>
    <li><strong>Phonology by table.</strong> Because no native speaker survives, Tangut sounds are pieced together from the Tangut's own dictionaries. The <em>Wénhǎi</em> (文海, "Sea of Characters") and <em>Tóngyīn</em> (同音, "Homophones") are monolingual: they sort characters by initial, rhyme and (in the <em>Wénhǎi</em>) tone, so they show which characters sounded alike without saying how. The key that turns those patterns into actual sounds is the <em>Pearl in the Palm</em> (1190), a Tangut–Chinese phrasebook that spells each Tangut word with Chinese characters, and each Chinese word with Tangut ones.</li>
    <li><strong>A Buddhist library underground.</strong> In 1908 the Russian explorer <strong>Pyotr Kozlov</strong> reached the ruined city of Khara-Khoto, won permission to dig with a dinner and the gift of a gramophone to the local Mongol lord, and sent ten chests of finds home. Returning in 1909, he opened a stupa about 400 metres outside the walls and found it packed with books: in all, more than 2,000 Tangut books, scrolls and manuscripts went to St Petersburg, still the world's largest collection.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="txg">🌙 See Tangut "Moon"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="txg">💧 See Tangut "Water"</button>
  </div>
  
  <p>The scholar who did most to crack it was <strong>Nikolai Nevsky</strong> (1892–1937), a Russian Japanologist who spent the 1920s in Japan and Taiwan. He took up the Khara-Khoto hoard in 1925, while still living in Japan, and after returning to Leningrad in 1929 he spent the following decade working out its phonological structure and compiling the first Tangut–Chinese–English–Russian dictionary. His masterpiece, <em>Tangutskaya Filologiya</em>, was published posthumously in 1960 — Nevsky himself had been shot in Stalin's Great Purge in 1937. He was awarded the Lenin Prize in 1962, a quarter-century after the state that honoured him had shot him. Some of the manuscripts he had at home when he was arrested went missing, and resurfaced at the institute only in 1991, in unexplained circumstances.</p>
  
  <p>In 2016, nearly a thousand years after Yeli Renrong drew them, 6,125 Tangut characters were added to Unicode, with 755 components in a block of their own, so the script can now be typed and searched.</p>
  
  <p>Later <strong>Mikhail Sofronov</strong> refined the phonological reconstruction in the 1960s; <strong>Ksenia Kepping</strong> worked on grammar and ritual texts; Gong Hwang-cherng in Taipei, Nishida Tatsuo in Kyoto and Li Fanwen in Ningxia built much of the modern framework; today researchers in Beijing, Kyoto, Taipei and St Petersburg continue to publish editions of newly catalogued manuscripts. Significant questions remain — the exact tone system, the deeper genetic position within Sino-Tibetan, the meaning of dozens of rare characters that occur only once or twice in the corpus.</p>
  
  <p>Tangut was invented in a few years, written for nearly five centuries, then forgotten for four. Its revival is a scholarly one: no one will speak Tangut again, but thanks to a phrasebook, a hoard in a stupa and a Japanologist who did not live to see his work in print, people can read it.</p>
        `,
        ja: `
  <p>西暦1036年、<strong>西夏（Xixia）</strong>王朝の初代皇帝<strong>李元昊（り・げんこう）</strong>は、自らの民タングート族にふさわしい文字を持つよう命じた。学者・野利仁栄がわずか数年で<strong>約6000字</strong>の表意文字を一気に設計したとされる。漢字に似ているが漢字から借りていない、完全に新設計の文字体系──それが<strong>西夏文（Tangut script）</strong>である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="txg" data-zoom="5">🌍 地図で西夏語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="38.5" data-lng="106" data-zoom="5">🗺️ 西夏の中心地へ飛ぶ</button>
  </div>
  
  <p>現在の寧夏・甘粛を中心に約200年続いた西夏王朝は、漢文やチベット語から訳した仏典、辞書、法典を残し、西夏文を教える官立学校を設け、役所の文書もこの文字で書いた。だが<strong>1227年</strong>、チンギス・ハーン率いるモンゴル軍によって滅亡。それでも西夏文は王朝より長く生き延びた。東へ散ったタングートの人々が仏典・学問の文字として使い続け、年代の確かな最後の西夏文資料は、旧都から東へ約800km離れた河北・保定に<strong>1502年</strong>――明代の半ば――建てられた2基の仏教陀羅尼経幢である。その後、この文字は使われなくなり、3世紀にわたって、その名を言い当てられる者さえいなくなった。1804年、中国の学者・張澍は、武威の寺にある二言語の石碑の漢文の側に西夏の年号が刻まれていることに気づき、もう一方の面の奇妙な文字こそ失われた西夏文字に違いないと悟った。</p>
  
  <p>やがて言語学者たちが再発見したのは、<strong>シナ・チベット語族</strong>に属し、現存する最も近い親戚が四川西部の<strong>ギャロン語群</strong>（しばしばチャン語派に含められる）らしい言語だった。音節は子音＋母音という単純なもので、それぞれが平声（平聲）か上声（上聲）の二つの声調のどちらかを持つ。複雑さはむしろ105に及ぶ韻のほうにあった。文字の作りも負けず劣らず独特だ。西夏の字書『文海』は、各字を中国の祖先からではなく、<em>ほかの西夏文字の部品</em>を組み合わせたものとして説明している。現在知られている字種は約5900である。</p>
  
  <ul>
    <li><strong>進化ではなく設計。</strong> 漢字が数千年かけて自然発生したのに対し、西夏文の中核は、皇帝の命を受けたチームによって、わずか数年のうちに意図的に設計された。人類史でも稀な、大規模な「人工文字」のひとつである。</li>
    <li><strong>韻書から音を復元。</strong> 母語話者は1人も残っていない。音は西夏人自身の字書からつなぎ合わせて復元する。『文海』と『同音』は単一言語の字書で、字を声母・韻、そして（『文海』では）声調によって分類しているため、どの字が似た音だったかはわかるが、どう発音したかまでは教えてくれない。そのパターンを実際の音に変える鍵が、1190年の『番漢合時掌中珠』だ。西夏語と漢語の対訳語彙集で、西夏語の語には漢字で、漢語の語には西夏文字で読みが添えてある。</li>
    <li><strong>地下の仏教図書館。</strong> 1908年、ロシアの探検家コズロフがカラ・ホト遺跡に到達した。地元のモンゴル王公を晩餐でもてなし、蓄音機を贈って発掘の許可を取りつけ、出土品を10箱本国へ送った。1909年に再訪すると、城壁の外およそ400メートルにある仏塔を開き、中に書物がぎっしり詰まっているのを見つけた。サンクトペテルブルクへ運ばれた西夏の書物・巻子・写本は、合わせて2000点を超える。今も世界最大のコレクションである。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="txg">🌙 西夏語の「月」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="txg">💧 西夏語の「水」</button>
  </div>
  
  <p>解読を決定的に前進させたのは<strong>ニコライ・ネフスキー</strong>（1892–1937）。1920年代を日本と台湾で過ごしたロシアの日本学者。まだ日本にいた1925年にカラ・ホト文書へ着手し、1929年にレニングラードへ戻ってからの十年を、音韻構造の解明と初の西夏語・漢語・英語・ロシア語辞書の編纂に費やした。代表作『西夏文献学』は没後1960年刊──ネフスキー自身は1937年、スターリンの大粛清で銃殺されていた。1962年にはレーニン賞が贈られた。彼を顕彰したその国家が、彼を銃殺してから四半世紀後のことである。逮捕されたとき自宅にあった写本の一部は行方不明になり、1991年になって、いきさつもわからぬまま研究所に再び姿を現した。</p>
  
  <p>2016年、野利仁栄が筆を執ってから千年近くを経て、6125の西夏文字がUnicodeに収録された。755の構成要素も専用のブロックに入り、今ではこの文字を入力することも検索することもできる。</p>
  
  <p>その後<strong>ミハイル・ソフロノフ</strong>が音韻復元を精緻化し、<strong>クセニア・ケッピング</strong>が文法と儀礼文献を整備、台北の龔煌城、京都の西田龍雄、寧夏の李範文らが現代の研究の枠組みの多くを築き、現在は北京・京都・台北・サンクトペテルブルクの研究者たちが新出写本の校訂を続けている。声調体系の細部、シナ・チベット語族内の正確な位置、コーパス中に一・二回しか現れない希少字の意味──未解明の問いはまだ多い。</p>
  
  <p>西夏文は数年で発明され、5世紀近く書き継がれ、そして4世紀にわたって忘れられた。その復活は学問の上でのものだ。西夏語を再び話す人はいないだろう。だが一冊の対訳語彙集と、仏塔に眠っていた書物の山と、自分の仕事が活字になるのを見ることなく逝った一人の日本学者のおかげで、人々はこの文字を読むことができる。</p>
        `,
      },
      sources: [
        'Nevsky, Nikolai A. (1960). Tangutskaya Filologiya: Issledovaniya i Slovar (2 vols.). Moscow: Izdatelstvo Vostochnoi Literatury.',
        'Sofronov, Mikhail V. (1968). Grammatika tangutskogo yazyka (2 vols.). Moscow: Nauka.',
        'Kepping, Ksenia B. (1985). Tangutskij yazyk: Morfologiya. Moscow: Nauka.',
        'Kychanov, Evgenij I. (1999). Catalogue of Tangut Buddhist Texts. Kyoto: Faculty of Letters, Kyoto University.',
        'Gong, Hwang-cherng (2017). "Tangut." In Graham Thurgood & Randy J. LaPolla (eds.), The Sino-Tibetan Languages (2nd ed.), Routledge: 805–822.',
        { text: 'Glottolog: Tangut (tang1334)', url: 'https://glottolog.org/resource/languoid/id/tang1334' },
        { text: 'ISO 639-3: txg', url: 'https://iso639-3.sil.org/code/txg' },
      ],
    },
    {
      id: 'linear-a-undeciphered',
      icon: '🏺',
      tags: ['undeciphered', 'minoan', 'crete', 'bronze-age', 'script'],
      title: {
        en: 'Linear A — the script we can read but cannot understand',
        ja: '読めるのに分からない文字、線文字A',
      },
      summary: {
        en: 'About 1,400 Bronze Age inscriptions from Minoan Crete. We can sound out most of the syllable signs, yet after more than a century of effort we understand only a handful of its words.',
        ja: '青銅器時代クレタ島の約1400点の刻文。音節記号の大半は音に置き換えられるのに、1世紀を超える研究を経ても、意味がわかる語はほんの一握りしかない。',
      },
      body: {
        en: `
  <p>Between roughly <strong>1800 and 1450 BCE</strong>, the Minoan civilisation of Crete kept its palace accounts, dedications and labels in a syllabic script we now call <strong>Linear A</strong>. About <strong>1,400 inscriptions</strong> survive — most of them brief, scratched onto clay tablets, libation tables, and bronze double-axes from sites like Knossos, Phaistos, Hagia Triada, and Zakros.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.30" data-lng="25.15" data-zoom="7">🗺️ Fly to Minoan Crete</button>
  </div>
  
  <p>Here is the strange situation. In 1952, the young English architect <strong>Michael Ventris</strong>, working with classicist John Chadwick, deciphered a sister script called <strong>Linear B</strong>. He showed, to almost everyone's astonishment (including his own: he had long suspected a language related to Etruscan), that Linear B encoded an <em>early form of Greek</em> — the language of the Mycenaeans who took over Crete around 1450 BCE. Linear B uses many of the same syllabic signs as Linear A, just with slight stylistic differences. So we can pick up a Linear A tablet, look at each sign, and assign it the Linear B sound value with reasonable confidence: <em>ku, ro, pi, te, da</em>…</p>
  
  <p>And then the trail goes cold. The strings of syllables that emerge are <strong>not Greek</strong>. They are not Semitic in any recognisable way. Scholars have chased parallels with Luwian, Lycian, Phoenician and Ugaritic, but none adds up to a convincing match, and even a real resemblance could be the result of contact rather than kinship. They are simply the <strong>Minoan language</strong>, and we have no living relative, no bilingual Rosetta-style key, and no idea where the Minoans came from or what family their tongue belonged to.</p>
  
  <ul>
    <li><strong>The reading problem is mostly solved, with a catch.</strong> Most of the syllable signs have clear Linear B look-alikes, so we can transliterate most tablets, on the assumption that the sounds stayed the same. The word-signs (logograms) are another story: about 80% of Linear A's have no Linear B counterpart.</li>
    <li><strong>The translation problem is essentially untouched.</strong> We can read <em>ku-ro</em> (which probably means "total", since it appears at the bottom of numerical lists), <em>ja-sa-sa-ra-me</em> (part of a recurrent libation formula, possibly a divine name), and a handful of place names that survive into later Greek, such as <em>su-ki-ri-ta</em>, the town later called Sybrita. A few words leak through in other ways: the sign for wool is built from <em>ma</em> + <em>ru</em>, and Greek later had <em>mallós</em> "wool", probably a Minoan loan. Beyond that, almost nothing.</li>
    <li><strong>1,400 inscriptions sounds like a lot. It is not.</strong> Most are one or two words long: a name, a number, a commodity. The whole corpus runs to about 7,400 sign tokens — a few thousand words, no longer than a short story — and most of it is bookkeeping.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.05" data-lng="24.81" data-zoom="9">🏛️ Hagia Triada (about half of all Linear A)</button>
  </div>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.40" data-lng="25.16" data-zoom="9">🏛️ Knossos palace site</button>
  </div>
  
  <p>Many decipherment claims have been published — that Minoan is Semitic, Anatolian, Tyrrhenian, Indo-European, even Proto-Basque. None has convinced the field. The main obstacles are (1) the small and repetitive corpus, (2) the absence of any bilingual text at all, and (3) the suspicion that Minoan may simply be an <strong>isolate</strong> — a language with no surviving relatives anywhere.</p>
  

<p>Compare the situation with the still-undeciphered <strong>Cypro-Minoan</strong> script of Bronze Age Cyprus, or the even older <strong>Cretan hieroglyphs</strong> on which Linear A itself appears to be based. Bronze Age Aegean writing is a small forest of related scripts encoding at least two and possibly three or four different languages, and only one of them, the latecomer Linear B, has yielded.</p>
  
  <p>The hope is that excavations at sites like Zominthos or Petras will eventually yield a long bilingual inscription — perhaps Minoan paired with Egyptian or Akkadian — or simply a Linear A tablet long enough for statistical and morphological analysis to gain traction. Until then, Linear A remains the great unread book of European prehistory, hiding in plain sight on clay tablets we have been holding for more than a century.</p>
        `,
        ja: `
  <p>紀元前<strong>1800〜1450年</strong>頃、クレタ島のミノア文明は宮殿の会計記録や奉納銘文を音節文字で残した。これを<strong>線文字A（Linear A）</strong>と呼ぶ。クノッソス、ファイストス、アギア・トリアダ、ザクロスなどから出土した<strong>約1400点</strong>の刻文が現存し、その大半は粘土板に刻まれた短い帳簿や奉納銘である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.30" data-lng="25.15" data-zoom="7">🗺️ ミノア時代のクレタ島へ飛ぶ</button>
  </div>
  
  <p>ここに奇妙な状況がある。1952年、若き英国の建築家<strong>マイケル・ヴェントリス</strong>と古典学者ジョン・チャドウィックは、姉妹文字<strong>線文字B</strong>を解読し、その背後にあるのが<em>初期ギリシア語</em>──紀元前1450年頃にクレタを支配したミケーネ人の言語──であることを示した。ほとんど誰にとっても──ヴェントリス自身にとってさえ──驚きの結果だった。彼は長いあいだ、エトルリア語に近縁の言語を想定していたのである。線文字Aと線文字Bは音節記号の大半を共有するため、線文字Aの記号一つ一つに線文字Bの音価をかなりの確度で当てはめられる。<em>ku, ro, pi, te, da</em>──そう、読める。</p>
  
  <p>しかし、そこで道が途切れる。読み上げた音節列は<strong>ギリシア語ではない</strong>。研究者たちはルウィ語、リュキア語、フェニキア語、ウガリト語との類似を追いかけてきたが、どれも説得力のある一致には至っていない。それに、本当に似ていたとしても、それは親族関係ではなく接触の結果かもしれない。ただの<strong>「ミノア語」</strong>であり、現存する親縁言語もなく、ロゼッタ石のような対訳もなく、ミノア人がどこから来たのか、その言語がどの語族に属するのかさえ分からない。</p>
  
  <ul>
    <li><strong>「読む」問題はほぼ解けている──ただし条件つきで。</strong> 音節記号の大半には線文字Bにはっきりした似姿があるので、音が変わっていないと仮定すれば、ほとんどの粘土板は転写できる。表語記号のほうは事情が違い、線文字Aの表語記号の約80%には線文字Bに対応するものがない。</li>
    <li><strong>「訳す」問題には手も足も出ない。</strong> 数値表の末尾に現れる <em>ku-ro</em>（おそらく「合計」）、繰り返し現れる献酒の定型句の一部 <em>ja-sa-sa-ra-me</em>（神名か？）、そして後代ギリシア語に残った一握りの地名、たとえばのちにシブリタと呼ばれる町の <em>su-ki-ri-ta</em>。別の経路から漏れ出てくる語もある。羊毛を表す記号は <em>ma</em> と <em>ru</em> を組み合わせてできており、後のギリシア語には <em>mallós</em>「羊毛」という語がある。おそらくミノア語からの借用だ。分かっているのはその程度である。</li>
    <li><strong>1400点は多そうで多くない。</strong> ほとんどは1〜2語の短い記録（人名、数量、品目）であり、コーパス全体でも記号にして約7400字、単語にすれば数千語──短篇小説1冊程度でしかない。しかもその大半は会計帳簿である。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.05" data-lng="24.81" data-zoom="9">🏛️ 最大の出土地アギア・トリアダへ</button>
  </div>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.40" data-lng="25.16" data-zoom="9">🏛️ クノッソス宮殿跡へ</button>
  </div>
  
  <p>セム語説、アナトリア語説、エトルリア語と同源説、印欧語説、果てはバスク語説まで、解読を主張する論文は数多い。だがどれも学界の合意は得ていない。障害は3つ──(1)コーパスが小さく定型的すぎる、(2)対訳テキストがそもそもひとつもない、(3)ミノア語そのものが<strong>孤立言語</strong>で、地上のどこにも親戚が残っていない可能性がある、ということだ。</p>
  
  
  
  <p>同じ青銅器時代エーゲ海には、未解読の<strong>キプロ・ミノア文字</strong>や、線文字A自身が派生したと見られる<strong>クレタ聖刻文字</strong>もある。少なくとも2つ、おそらく3〜4の異なる言語を記す関連文字群が広がっていて、解読されているのは最も新しい線文字Bだけなのだ。</p>
  
  <p>ゾミントスやペトラスの発掘で長文の対訳銘文が出るか、あるいは統計と形態論の手法に耐えうる長い線文字A粘土板が見つかれば、状況は変わる。それまで線文字Aは、ヨーロッパ先史時代最大の「読めるのに読めない本」として、私たちが100年前から手に取り続けている粘土板の上に黙って横たわっている。</p>
        `,
      },
      sources: [
        'Chadwick, John (1958). The Decipherment of Linear B. Cambridge University Press.',
        'Godart, Louis; Olivier, Jean-Pierre (1976–1985). Recueil des inscriptions en linéaire A (GORILA), 5 vols. École française d\'Athènes.',
        'Schoep, Ilse (2002). The Administration of Neopalatial Crete: A Critical Assessment of the Linear A Tablets. Salamanca: Universidad de Salamanca.',
        'Davis, Brent (2014). Minoan Stone Vessels with Linear A Inscriptions. Peeters.',
        'Salgarella, Ester (2020). Aegean Linear Script(s): Rethinking the Relationship between Linear A and Linear B. Cambridge University Press.',
        { text: 'Linear A corpus (SigLA database)', url: 'https://sigla.phis.me/' },
        { text: 'Wikipedia: Linear A', url: 'https://en.wikipedia.org/wiki/Linear_A' },
      ],
    },
    {
      id: 'aymara-time-reversed',
      icon: '⏳',
      tags: ['aymara', 'andes', 'metaphor', 'time', 'cognitive-linguistics'],
      title: {
        en: 'Aymara — the language where the past is in front of you',
        ja: '過去が前にある言語、アイマラ語',
      },
      summary: {
        en: 'In Aymara, the past lies in front (where you can see it) and the future is behind (unseen). Speakers gesture forward for "yesterday" and over the shoulder for "next year".',
        ja: 'アイマラ語では「過去＝見える前方」「未来＝見えない後方」。話者は「昨日」を前方に、「来年」を肩越し後方に指す。',
      },
      body: {
        en: `
  <p>If you ask an English speaker what is "ahead", they will tell you about meetings <em>next week</em>, deadlines <em>up ahead</em>, futures <em>to look forward to</em>. The future is in front; the past is behind. Almost every Indo-European language packages time this way, and it was widely assumed that this was close to a universal of human thought.</p>
  
  <p>Then in 2006, building on earlier descriptions by Andrew Miracle and Juan de Dios Yapita, Rafael Núñez and Eve Sweetser published a careful study of <strong>Aymara</strong>, spoken by <strong>roughly two and a half million people</strong> in the high Andes of Bolivia, Peru and northern Chile, and found exactly the opposite mapping.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ay" data-zoom="6">🌍 Show Aymara on map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-16.5" data-lng="-68.15" data-zoom="6">🗺️ Fly to La Paz</button>
  </div>
  
  <p>In Aymara, the basic word for "front" is <em>nayra</em>, which also means <strong>"eye"</strong> and <strong>"sight"</strong>. The basic word for "behind" is <em>qhipa</em>, which also means <strong>"back"</strong>. These spatial roots are reused for time, and the alignment is:</p>
  
  <ul>
    <li><strong><em>nayra mara</em></strong> — literally "eye/front year", meaning <strong>last year</strong>.</li>
    <li><strong><em>nayra pacha</em></strong> — "eye/front time", meaning <strong>the past</strong>, <strong>ancient times</strong>.</li>
    <li><strong><em>qhipüru</em></strong> — from "back day", meaning <strong>tomorrow / a future day</strong>.</li>
    <li><strong><em>qhipa mara</em></strong> — "back year", meaning <strong>next year</strong>.</li>
  </ul>
  
  <p>The logic, repeatedly given by Aymara speakers when asked, is beautifully consistent: <em>the past is what you have already seen, so it must be in front of you, where eyes look. The future is unseen, unknown, so it lies behind your back, where you cannot see.</em></p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="ay">☀️ See Aymara "Sun"</button>
  </div>
  
  <p>Because word meanings alone can mislead, Núñez recorded about 20 hours of conversation with 30 Aymara adults in northern Chile and watched their hands. When describing past events, speakers gestured <strong>forward, into the visual field in front of them</strong>: close to the body for the recent past, out to the full length of the arm for ancient times. When describing the future, they gestured backward, sometimes with a thumb thrown over the shoulder.</p>
  
  <p>The pattern was strongest among older speakers who spoke little Spanish. Younger speakers fluent in Spanish mostly gestured the Spanish way, future in front, a sign that contact with Spanish is eroding the older mapping. Aymara is not quite alone: its neighbour Quechua appears to share the front-facing past, and Toba in the Gran Chaco has been described in similar terms.</p>
  

<p>The Aymara findings are often discussed alongside George Lakoff's work on conceptual metaphor and Lera Boroditsky's experiments on time and language. They provide evidence that <strong>spatial metaphors for abstract domains are not universal</strong> and can vary with linguistic and cultural convention.</p>
  
  <p>Other work on Aymara includes Iván Guzmán de Rojas's disputed 1980s proposal that its grammar reflects a <em>three-valued logic</em>, research on its obligatory evidential system, and a growing body of indigenous-language publishing. The front-facing past remains the feature most often discussed in cognitive-linguistic research.</p>
        `,
        ja: `
  <p>英語話者に「先（ahead）」とは何かと聞けば、来週の会議、迫る締切、楽しみな未来──と答えるだろう。未来は前、過去は後ろ。印欧諸語のほぼすべてが時間をこの向きで切り取っており、これは人類の思考にほぼ普遍の比喩だと広く考えられていた。</p>
  
  <p>その前提に正面から穴を開けたのが、2006年にラファエル・ヌニェスとイヴ・スウィーツァーが発表した綿密な研究である。アンドリュー・ミラクルとフアン・デ・ディオス・ヤピタによる先行の記述を土台に、二人は<strong>アイマラ語</strong>──ボリビア・ペルー・チリ北部の高地で<strong>約250万人</strong>が話す言語──を調べ、まさに正反対の対応関係を見いだした。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ay" data-zoom="6">🌍 地図でアイマラ語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-16.5" data-lng="-68.15" data-zoom="6">🗺️ ラパスへ飛ぶ</button>
  </div>
  
  <p>アイマラ語で「前」を表す基本語は <em>nayra</em>。これは同時に<strong>「目」「視覚」</strong>を意味する。「後ろ」は <em>qhipa</em>、これは「背中」でもある。この空間語彙が時間に拡張されたとき、次のような対応関係が生まれる。</p>
  
  <ul>
    <li><strong><em>nayra mara</em></strong>（直訳「目／前の年」）＝<strong>去年</strong></li>
    <li><strong><em>nayra pacha</em></strong>（「目／前の時」）＝<strong>過去・古代</strong></li>
    <li><strong><em>qhipüru</em></strong>（「背中の日」）＝<strong>明日・将来の日</strong></li>
    <li><strong><em>qhipa mara</em></strong>（「背中の年」）＝<strong>来年</strong></li>
  </ul>
  
  <p>話者が繰り返し説明する論理は美しい：<em>過去は自分の目で見たもの──だから目の前にある。未来はまだ見えない・分からない──だから自分の背中側にあるしかない。</em></p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="ay">☀️ アイマラ語の「太陽」</button>
  </div>
  
  <p>語の意味だけでは判断を誤ることもある。そこでヌニェスは、チリ北部で30人のアイマラ語話者の大人と約20時間の会話を録画し、その手の動きを観察した。過去の出来事を語るとき、話者は<strong>体の前方、視野の中</strong>を指し示した。最近の過去なら体の近く、太古の昔なら腕をいっぱいに伸ばした先。未来を語るときは後ろを指し、ときには肩越しに親指を放り投げるようにした。</p>
  
  <p>このパターンがもっともはっきり出たのは、スペイン語をほとんど話さない年配の話者だった。スペイン語に堪能な若い世代は、たいていスペイン語式に、未来を前にして身振りをした。スペイン語との接触によって、古い対応関係が崩れつつあるしるしだ。とはいえアイマラ語はまったくの孤立例ではない。隣のケチュア語も「過去が前」の見方を共有しているらしく、グラン・チャコのトバ語にも似たような記述がある。</p>
  

<p>この発見は、ジョージ・レイコフの概念メタファー研究やレラ・ボロディツキーの時間言語実験とあわせて論じられてきた。抽象概念を空間で表す方法がすべての言語で同じではなく、言語的・文化的な慣習によって異なることを示す資料である。</p>
  
  <p>アイマラ語にはほかにも興味深い特徴が多い──1980年代にイバン・グスマン・デ・ロハスらが提唱した「アイマラ文法には三値論理が反映されている」とする説（現在も言語学者の間で議論が続く論争的な主張）、トゥユカ語に似た義務的な証拠性、活発な先住民出版文化。だが、「目の前に過去がある」というこの一点は、今も認知科学への最大の贈り物として語り継がれている。</p>
        `,
      },
      sources: [
        { text: "Wikipedia: Aymara language", url: "https://en.wikipedia.org/wiki/Aymara_language" },
        { text: "ScienceDaily, 13 June 2006: report on Núñez & Sweetser's Aymara study", url: "https://www.sciencedaily.com/releases/2006/06/060613185239.htm" },
        'Núñez, Rafael E.; Sweetser, Eve (2006). "With the Future Behind Them: Convergent Evidence From Aymara Language and Gesture in the Crosslinguistic Comparison of Spatial Construals of Time." Cognitive Science 30(3): 401–450.',
        'Hardman, Martha J. (2001). Aymara. Munich: Lincom Europa.',
        'Miracle, Andrew W.; Yapita Moya, Juan de Dios (1981). "Time and Space in Aymara." In M. J. Hardman (ed.), The Aymara Language in Its Social and Cultural Context. University of Florida Press: 33–56.',
        'Boroditsky, Lera (2011). "How Language Shapes Thought." Scientific American 304(2): 62–65.',
        'Klein, Harriet E. Manelis (1987). "The Future Precedes the Past: Time in Toba." Word 38(3): 173–185.',
        { text: 'Glottolog: Central Aymara (cent2142)', url: 'https://glottolog.org/resource/languoid/id/cent2142' },
        { text: 'Ethnologue: Aymara', url: 'https://www.ethnologue.com/language/ayr/' },
      ],
    },
    {
      id: 'tuyuca-evidentials',
      icon: '👁️',
      tags: ['evidentiality', 'tukanoan', 'amazon', 'grammar', 'obligatory'],
      title: {
        en: 'Tuyuca — the language in which you must reveal how you know',
        ja: '「どう知ったか」を必ず明かす言語、トゥユカ語',
      },
      summary: {
        en: 'In Tuyuca of the NW Amazon, every finite verb obligatorily marks evidence: did you see it, hear it, infer it, assume it, or were you told? You cannot say "John played soccer" without specifying which.',
        ja: 'アマゾン北西部のトゥユカ語では、全ての定動詞に「どう知ったか」を義務的に付ける。見た／聞いた／推論した／推測した／伝聞、を選ばずに「ジョンがサッカーをした」とは言えない。',
      },
      body: {
        en: `
  <p>Imagine you have to recount a small event — say, that John played soccer yesterday. In English you can simply say "John played soccer", and your listener has no idea whether you were on the touchline, heard cheering from the next street, deduced it from his muddy boots, or were told by a friend. Languages of Europe leave the <em>source</em> of information almost entirely unmarked.</p>
  
  <p>In <strong>Tuyuca</strong> — an <strong>Eastern Tukanoan</strong> language with roughly <strong>1,000 to 1,400 speakers</strong> in the Vaupés region on the Brazil–Colombia border — you simply cannot. A statement's main verb must carry an ending that shows <em>how you know what you are claiming</em>. There is no neutral form to fall back on.</p>
  
  <p>The Vaupés is unusual in another way too. Among the Tukanoan peoples of the region, custom says you marry someone whose language is different from your own, so many children grow up hearing several languages at home.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="tue" data-zoom="6">🌍 Show Tuyuca on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="0.5" data-lng="-69" data-zoom="6">🗺️ Fly to the Vaupés region</button>
  </div>
  
  <p>The pioneering description is Janet Barnes's 1984 paper. She catalogued <strong>five evidential categories</strong> in Tuyuca, each realised as a different verbal ending:</p>
  
  <ul>
    <li><strong>Visual</strong> — the speaker saw the event with their own eyes. Tuyuca: <em>díiga apé-wi</em> "he played soccer (I saw it)".</li>
    <li><strong>Non-visual sensory</strong> — the speaker heard, smelled, or felt the event but did not see it. <em>díiga apé-ti</em> "he played soccer (I heard them)".</li>
    <li><strong>Inferential</strong> — the speaker did not perceive the event but saw physical traces. <em>díiga apé-yi</em> "he played soccer (I see the muddy field)".</li>
    <li><strong>Assumed</strong> — the speaker reasons from general knowledge: e.g. he always plays on Saturdays. <em>díiga apé-hĩyi</em>.</li>
    <li><strong>Reported</strong> — the speaker was told. <em>díiga apé-yigi</em> "he played soccer (so they say)".</li>
  </ul>
  
  <p>Each ending does several jobs at once. The <em>-wi</em> in <em>apé-wi</em> means "he", "in the past" and "I saw it", all in one syllable. The system also has gaps, as real grammar often does: the "so they say" ending exists only in the past tense, and you cannot use the "I see the traces" ending to describe what you yourself are doing right now.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="eye" data-code="tue">👁️ See Tuyuca "Eye"</button>
  </div>
  
  <p>Tuyuca is not unique. <strong>Evidentiality</strong> as a grammatical category is found across the Tukanoan family, in Quechua, Aymara, Turkish (the famous <em>-miş</em>), Bulgarian, Korean, many Tibeto-Burman languages, and across Amazonia. <strong>Alexandra Aikhenvald</strong>'s typological survey (2004) drew on grammars of more than 500 languages, and found that roughly a quarter of the world's languages mark information source obligatorily. But Tuyuca stands out for the <em>granularity</em> of its system — five distinctions where most languages make two or three — and for being among the very first to be carefully described.</p>
  

<p>The implications for cognition are debated. Aikhenvald and others have suggested that having to mark your source in every statement may make speakers more attentive to evidence and rumour. Others point out that English speakers can say all the same things ("I saw", "apparently", "they say") — they just are not <em>forced</em> to. What nobody claims is that speakers of other languages cannot make these distinctions.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="drink" data-code="tue">🥤 See Tuyuca "Drink" (sĩdĩ)</button>
  </div>
  
  <p>What is clear is that Tuyuca exposes a hidden assumption of much Western philosophy of language: that statements are by default unmarked claims of "fact". For a Tuyuca speaker there is no such default. Every sentence is, in effect, prefaced with the epistemic equivalent of <em>"I saw"</em>, <em>"I heard"</em>, or <em>"I was told"</em>. A grammar of provenance is built into every verb.</p>
        `,
        ja: `
  <p>たとえば「ジョンが昨日サッカーをした」と話すとき、英語話者はそれだけで会話を成り立たせられる。聞き手は、話者がグラウンドで見たのか、隣の通りから歓声を聞いたのか、泥だらけのスパイクから推測したのか、友人から聞いたのか──何も知らされない。ヨーロッパ諸語では<em>情報源</em>はほぼ表に出ない。</p>
  
  <p>ところが<strong>トゥユカ語（Tuyuca）</strong>──ブラジル＝コロンビア国境のヴァウペス川流域で<strong>約1000〜1400人</strong>が話す<strong>東トゥカノ語派</strong>の言語──では、それが許されない。平叙文の主動詞には、「どう知ったか」を示す語尾が必ず付く。逃げ込める中立形はないのだ。</p>

  <p>ヴァウペスには、もうひとつ変わったところがある。この地域のトゥカノ系の民族のあいだでは、自分とは違う言語を話す相手と結婚するのが習わしで、多くの子どもが家庭で複数の言語を聞きながら育つ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="tue" data-zoom="6">🌍 地図でトゥユカ語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="0.5" data-lng="-69" data-zoom="6">🗺️ ヴァウペス川流域へ飛ぶ</button>
  </div>
  
  <p>古典的記述はジャネット・バーンズの1984年論文で、トゥユカ語には<strong>5種類の証拠性</strong>が動詞接尾辞として体系的に存在することが示された。</p>
  
  <ul>
    <li><strong>視覚</strong>──話者が自分の目で見た。<em>díiga apé-wi</em>「ジョンはサッカーをした（私はそれを見た）」</li>
    <li><strong>非視覚知覚</strong>──見てはいないが聞いた・嗅いだ・感じた。<em>díiga apé-ti</em>「（声が聞こえた）」</li>
    <li><strong>推論</strong>──現場は見ていないが物的痕跡を見た。<em>díiga apé-yi</em>「（泥だらけのグラウンドが見える）」</li>
    <li><strong>推測</strong>──一般知識からの推断。<em>díiga apé-hĩyi</em>「（土曜日だから当然）」</li>
    <li><strong>伝聞</strong>──人づてに聞いた。<em>díiga apé-yigi</em>「（そう聞いた）」</li>
  </ul>
  
  <p>一つの語尾が、いくつもの仕事を同時にこなす。<em>apé-wi</em> の <em>-wi</em> は、たった1音節で「彼が」「過去に」「私は見た」を表している。そして本物の文法によくあるように、この体系には穴もある。「〜だそうだ」の語尾は過去時制にしかなく、「痕跡が見える」の語尾を、自分が今まさにしていることの描写に使うことはできない。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="eye" data-code="tue">👁️ トゥユカ語の「目」</button>
  </div>
  
  <p>トゥユカ語だけが特殊なわけではない。<strong>証拠性</strong>はトゥカノ語族全体、ケチュア語、アイマラ語、トルコ語（有名な <em>-miş</em>）、ブルガリア語、韓国語、多くのチベット＝ビルマ系言語、アマゾン諸語に広く文法カテゴリーとして存在する。<strong>アレクサンドラ・アイヘンヴァルト</strong>の類型論的研究（2004）は文法化された証拠性を持つ言語を500近く集めている。ただ、トゥユカ語は「5段階」というきめ細かさと、最初に詳細に記述された言語の一つであることで際立っている。</p>
  
  
  
  <p>認知への含意は議論が続く。アイヘンヴァルトらは、あらゆる発言で情報源を示さなければならないことで、話者は根拠や噂により敏感になるのかもしれない、と示唆している。一方で、英語話者だって同じことは全部言える（「見たよ」「どうやら」「だそうだ」）──ただ<em>強制</em>されていないだけだ、と指摘する人もいる。ほかの言語の話者にはこうした区別ができない、と主張する人は誰もいない。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="drink" data-code="tue">🥤 トゥユカ語の「飲む」（sĩdĩ）</button>
  </div>
  
  <p>はっきりしているのは、トゥユカ語が西欧言語哲学の暗黙の前提──「平叙文の既定値は無印の事実主張である」──をあぶり出していることだ。トゥユカ語にそんな既定値はない。すべての文の動詞には、認識論的に言えば「私は見た」「私は聞いた」「人から聞いた」が刻まれている。<strong>情報源の文法</strong>が、動詞そのものに織り込まれているのである。</p>
        `,
      },
      sources: [
        { text: "Jackson, Jean E. (1983). The Fish People: Linguistic Exogamy and Tukanoan Identity in Northwest Amazonia. Cambridge University Press.", url: "https://en.wikipedia.org/wiki/Linguistic_exogamy" },
        'Barnes, Janet (1984). "Evidentials in the Tuyuca Verb." International Journal of American Linguistics 50(3): 255–271.',
        'Aikhenvald, Alexandra Y. (2004). Evidentiality. Oxford University Press.',
        'Malone, Terrell (1988). "The Origin and Development of Tuyuca Evidentials." International Journal of American Linguistics 54(2): 119–140.',
        'Aikhenvald, Alexandra Y.; Dixon, R. M. W. (eds.) (2003). Studies in Evidentiality. Amsterdam: John Benjamins.',
        'Stenzel, Kristine (2008). "Evidentials and Clause Modality in Wanano." Studies in Language 32(2): 405–445.',
        { text: 'Glottolog: Tuyuca (tuyu1244)', url: 'https://glottolog.org/resource/languoid/id/tuyu1244' },
        { text: 'WALS Feature 77A: Semantic Distinctions of Evidentiality', url: 'https://wals.info/feature/77A' },
      ],
    },
    {
      id: 'guugu-yimithirr-cardinal',
      icon: '🧭',
      tags: ['guugu-yimithirr', 'australia', 'cardinal', 'spatial', 'cognitive'],
      title: {
        en: 'Guugu Yimithirr — an absolute-direction spatial system',
        ja: '「左」も「右」も使わない言語、グーグ・イミディル語',
      },
      summary: {
        en: 'An Australian Aboriginal language of Far North Queensland that describes where things are by north, south, east and west rather than left and right, even for objects on a table. Its older speakers keep track of the compass with startling accuracy.',
        ja: 'クィーンズランド州極北のアボリジニ言語。物のありかを「左」「右」ではなく「北」「南」「東」「西」で言い表し、それは卓上の物でも変わらない。年配の話者は、驚くほど正確に方位を把握し続けている。',
      },
      body: {
        en: `
  <p>If you sit down at a table with a speaker of English and they want you to pass them a cup, they will say "the cup on your left" or "the cup in front of you". The reference frame is <strong>egocentric</strong> — anchored to your body. Almost every European language works this way.</p>
  
  <p>A speaker of <strong>Guugu Yimithirr</strong> — a <strong>Pama-Nyungan</strong> language of Cape York Peninsula in far north Queensland, Australia — may instead say, in effect, "the cup north of you" or "the cup to your east". The language does have words for the left and right hand, but it never uses them to say where things are. For that, it reaches for the compass.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="kky" data-zoom="6">🌍 Show Guugu Yimithirr on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-15.5" data-lng="145.25" data-zoom="6">🗺️ Fly to Hopevale, Cape York</button>
  </div>
  
  <p>The system has four core terms — though as Stephen Levinson's careful fieldwork in the 1980s and 1990s showed, they are not quite "north/south/east/west" in the English sense:</p>
  
  <ul>
    <li><strong><em>gungga</em></strong> ≈ <strong>north</strong> (the whole four-term system sits rotated slightly clockwise from true north)</li>
    <li><strong><em>jiba</em></strong> ≈ <strong>south</strong></li>
    <li><strong><em>naga</em></strong> ≈ <strong>east</strong> (towards sunrise)</li>
    <li><strong><em>guwa</em></strong> ≈ <strong>west</strong> (towards sunset)</li>
  </ul>
  
  <p>An ordinary noun has one ending for "at/to" and one for "from". Each of the four direction words has seven. From <em>naga</em> "east" you get <em>nagaar</em> "to a point east", <em>nagaalu</em> "east, beyond some landmark", <em>naganun</em> "from the east to here", and more. They are everywhere: in John Haviland's corpus of Guugu Yimithirr conversation, about one word in 55 is a form of a direction term.</p><p>The directions stick to memories, too. Stephen Levinson filmed the storyteller Jack Bambi telling how he was shipwrecked and swam miles to shore through sharks. Haviland had filmed the same story two years earlier. Jack faced west the first time and north the second, yet frame by frame the details of how the boat turned over, who jumped out where and where the big shark was matched in compass directions, not in left and right.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="hand" data-code="kky">✋ See Guugu Yimithirr "Hand"</button>
  </div>
  
  <p>The cognitive consequence, documented by Levinson, John Haviland and colleagues at the Max Planck Institute, is striking. Speakers of Guugu Yimithirr maintain an unbroken <strong>dead-reckoning</strong> sense of their orientation. In Levinson's tests, Hopevale speakers asked to point at unseen places, some of them hundreds of kilometres away, pointed with remarkable accuracy. Once, after a day-long trek through dense forest to some ancient cave paintings, Levinson, sitting disoriented at the cave mouth, asked his companion Dan to point back to base. Dan did so without hesitation, straight through the hillside, and the compass and maps later showed he was spot on.</p>
  
  <p>This is not a special skill of a few elders. Among the older, most fluent speakers it is a <strong>property of the whole speech community</strong>, picked up in childhood. Children take the system on gradually rather than all at once: Lourdes de León's fieldwork with young speakers at Hopevale, reported by Haviland, tentatively traces a path from hearing a term like <em>naga</em> as a vague "over there", to tying it to particular places such as the beach, to a region, and only finally to an abstract four-way directional contrast. One man in his late twenties told Haviland he had thought for years that <em>yarra naga</em> just meant "over there, look!", whatever the direction. The system is changing fast: younger Hopevale speakers mix in English devices, and older speakers tease them for it.</p>
  

<p>Comparable absolute-frame systems are now known from <strong>Tzeltal Mayan</strong> in Mexico (uphill/downhill axes), <strong>Marshallese</strong> in Micronesia (seaward/landward), <strong>Balinese</strong> (mountainward/seaward), and numerous Aboriginal Australian languages — Kuuk Thaayorre, Warlpiri and Arrernte among them. Whether language drives this way of thinking, or the other way round, is still debated, and so is the interpretation of the experiments: Peggy Li and Lila Gleitman argued in 2002 that the test setting itself can push English speakers towards absolute answers, and Levinson's team replied the same year that the two studies were measuring different things. What is well documented is that speakers of absolute-frame languages tend to solve non-verbal orientation tasks differently from speakers of left-right languages.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="kky">☀️ See Guugu Yimithirr "Sun"</button>
  </div>
  
  <p>Guugu Yimithirr also has another claim to fame: it is the language from which English borrowed the word <strong>"kangaroo"</strong>. In 1770, while the <em>Endeavour</em> was being repaired near today's Cooktown, James Cook's crew wrote down <em>gangurru</em>, the name of a large dark-coloured kangaroo, making Guugu Yimithirr the first Australian language ever recorded. The same list gave English <em>quoll</em>, from <em>dhigul</em>. (The story that "kangaroo" meant "I don't know" is a myth; Haviland confirmed the real word with speakers in the 1970s.) The 2021 Australian census counted about 800 speakers, mostly at Hopevale, but the language's lessons about space have travelled much further.</p>
        `,
        ja: `
  <p>英語話者の隣に座って「そのコップを取って」と頼みたいとき、私たちは「あなたの<em>左</em>のコップ」「あなたの<em>前</em>のコップ」と言う。基準は<strong>自己中心的</strong>──体に固定された軸である。ヨーロッパ系のほぼ全ての言語はこの方式を取る。</p>
  
  <p>ところがオーストラリア北部ケープ・ヨーク半島の<strong>グーグ・イミディル語（Guugu Yimithirr）</strong>──<strong>パマ・ニュンガン語族</strong>のアボリジニ言語──では、同じ場面で「あなたの<em>北</em>側のコップ」「あなたの<em>東</em>のコップ」と言う。グーグ・イミディル語にも左手・右手を表す語はある。だがそれを<strong>物のありかを言うのに使うことは決してない</strong>。そのために持ち出すのは、方位なのだ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="kky" data-zoom="6">🌍 地図でグーグ・イミディル語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-15.5" data-lng="145.25" data-zoom="6">🗺️ ホープヴェール（ケープ・ヨーク）へ飛ぶ</button>
  </div>
  
  <p>1980〜90年代のスティーヴン・レヴィンソンによる現地調査により、基本方位語は4つあると明らかになった（英語の東西南北とぴったり同じではなく、4語からなる体系全体が真北からわずかに時計回りにずれている）。</p>
  
  <ul>
    <li><strong><em>gungga</em></strong>：北</li>
    <li><strong><em>jiba</em></strong>：南</li>
    <li><strong><em>naga</em></strong>：東（日の出方向）</li>
    <li><strong><em>guwa</em></strong>：西（日の入り方向）</li>
  </ul>
  
  <p>普通の名詞には「〜で／〜へ」の語尾と「〜から」の語尾が1つずつしかない。ところが4つの方位語には、それぞれ7つもある。<em>naga</em>「東」からは、<em>nagaar</em>「東の地点へ」、<em>nagaalu</em>「（何かの目印の）向こうの東で」、<em>naganun</em>「東からこちらへ」などが生まれる。しかも方位語はいたるところに現れる。ジョン・ハヴィランドが集めたグーグ・イミディル語の会話資料では、およそ55語に1語が方位語の何らかの形なのだ。</p><p>方位は記憶にも貼りついている。スティーヴン・レヴィンソンは、語り部ジャック・バンビが、船が難破してサメのいる海を何キロも泳いで岸にたどり着いた話をするところを撮影した。その2年前には、ハヴィランドが同じ話を撮影していた。ジャックは1回目は西を向き、2回目は北を向いて話していたのに、船がどうひっくり返ったか、誰がどこに飛び込んだか、大きなサメがどこにいたか──細部はコマ単位で、左右ではなく方位のほうで一致していた。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="hand" data-code="kky">✋ グーグ・イミディル語の「手」</button>
  </div>
  
  <p>レヴィンソン、ジョン・ハヴィランドらマックス・プランク研究所のチームが示した認知への含意は鮮烈だ。グーグ・イミディル語話者は常に<strong>推測航法</strong>的に自分の方位を把握し続けている。レヴィンソンの実験で、見えない場所──数百キロ離れたところもある──を指さすよう頼まれたホープヴェールの話者たちは、驚くほど正確に指し示した。あるとき、古代の洞窟壁画を見に、うっそうとした森を丸一日歩いたあと、方向感覚をすっかり失って洞窟の入り口に座り込んだレヴィンソンは、同行していたダンに、拠点の方向を指してくれと頼んだ。ダンはためらいもなく、山肌を突き抜けるようにまっすぐ指さした。後でコンパスと地図で確かめると、まさにぴったりだった。</p>
  
  <p>これは長老の特殊な能力ではない。かつての最も流暢な世代にとっては<strong>話者集団全体に共通する性質</strong>で、子どもの頃に身についたものだった。ただし一息に身につくわけではない。ホープヴェールで子どもの習得を調べたロルデス・デ・レオンの報告（ハヴィランド 1998 による）では、<em>naga</em> のような語はまず漠然とした「あっち」として理解され、やがて浜辺など特定の場所と結びつき、次にその一帯の領域を指すようになり、最後に四方位の抽象的な対立として把握される、という順に進むとみられる。20代後半のある男性はハヴィランドに、何年ものあいだ <em>yarra naga</em> は方角に関係なく「ほら、あっち！」という意味だと思っていた、と打ち明けている。この体系は急速に変わりつつある。ホープヴェールの若い話者は英語流の言い方を混ぜるようになり、年配の話者はそれをからかうのだ。</p>
  
  
  
  <p>同種の絶対基準系は、メキシコの<strong>ツェルタル・マヤ語</strong>（上り／下り）、ミクロネシアの<strong>マーシャル語</strong>（海側／陸側）、<strong>バリ語</strong>（山側／海側）、そしてオーストラリアの多くのアボリジニ諸語──クーク・タヨレ、ワルピリ、アレント──にも見られる。言語がこうした考え方を駆動するのか、それとも逆なのかは今も議論が続いており、実験の解釈も争われている。ペギー・リーとライラ・グライトマンは2002年、実験の状況そのものが英語話者を絶対方位の答えへ誘導しうると論じ、レヴィンソンのチームは同じ年に、二つの研究は別々のものを測っていると反論した。しっかり裏づけられているのは、絶対基準系言語の話者は、言葉を使わない方位課題を、左右の言語の話者とは違うやり方で解く傾向がある、ということだ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="kky">☀️ グーグ・イミディル語の「日」</button>
  </div>
  
  <p>余談として、英語の <strong>kangaroo</strong> はこのグーグ・イミディル語から借りた語である。1770年、現在のクックタウン近くで<em>エンデバー</em>号を修理していたジェームズ・クック隊が、大型で黒っぽい色のカンガルーの名として <em>gangurru</em> を書き留めた。これによってグーグ・イミディル語は、記録された最初のオーストラリアの言語となった。同じ語彙リストからは、英語の <em>quoll</em>（フクロネコ）も生まれている（<em>dhigul</em> から）。（「カンガルー」は「わからない」という意味だった、という話は俗説で、ハヴィランドが1970年代に話者に確かめて本当の語だと確認している。）2021年のオーストラリア国勢調査では話者は約800人で、その多くはホープヴェールに住む。だがこの言語が空間について教えてくれたことは、はるか遠くまで旅をしている。</p>
        `,
      },
      sources: [
        { text: "Levinson (2003), Space in Language and Cognition, ch. 1 (sample)", url: "https://assets.cambridge.org/97805218/12627/sample/9780521812627ws.pdf" },
        { text: "Haviland, John B. (1998). Guugu Yimithirr Cardinal Directions. Ethos 26(1): 25–47.", url: "https://pages.ucsd.edu/~jhaviland/Publications/ETHOSw.Diags.pdf" },
        'Haviland, John B. (1993). "Anchoring, Iconicity, and Orientation in Guugu Yimithirr Pointing Gestures." Journal of Linguistic Anthropology 3(1): 3–45.',
        'Levinson, Stephen C. (1997). "Language and Cognition: The Cognitive Consequences of Spatial Description in Guugu Yimithirr." Journal of Linguistic Anthropology 7(1): 98–131.',
        'Levinson, Stephen C. (2003). Space in Language and Cognition: Explorations in Cognitive Diversity. Cambridge University Press.',
        'Haviland, John B. (1979). "Guugu Yimidhirr." In R. M. W. Dixon & B. J. Blake (eds.), Handbook of Australian Languages, vol. 1: 26–180. ANU Press.',
        'Majid, Asifa; Bowerman, Melissa; Kita, Sotaro; Haun, Daniel B. M.; Levinson, Stephen C. (2004). "Can Language Restructure Cognition? The Case for Space." Trends in Cognitive Sciences 8(3): 108–114.',
        { text: 'Glottolog: Guugu Yimidhirr (gugu1255)', url: 'https://glottolog.org/resource/languoid/id/gugu1255' },
        { text: 'AIATSIS: Guugu Yimithirr', url: 'https://collection.aiatsis.gov.au/austlang/language/y82' },
      ],
    },
    {
      id: 'mohawk-polysynthesis',
      icon: '🧩',
      tags: ['mohawk', 'polysynthesis', 'iroquoian', 'north-america', 'morphology'],
      title: {
        en: 'Mohawk — when one word is a whole sentence',
        ja: '一語が一文になる言語、モホーク語',
      },
      summary: {
        en: 'Mohawk, an Iroquoian language of the northeast woodlands, is polysynthetic — a single verb form can encode subject, object, beneficiary, tense, aspect, mood, and even an incorporated noun, doing the work of an entire English sentence.',
        ja: 'モホーク語（イロコイ語族）は多総合的言語。1個の動詞形式に主語・目的語・受益者・時制・相・法・取り込み名詞までが詰め込まれ、英語の一文ぶんを丸ごと表せる。',
      },
      body: {
        en: `
  <p><strong>Mohawk</strong> (<em>Kanien'kéha</em>, "language of the Flint People") is one of the six languages of the Haudenosaunee Confederacy, spoken in communities in southern Quebec, Ontario, and upstate New York. It is the most-spoken member of the <strong>Iroquoian</strong> family, with roughly 3,500 speakers by a 2011 estimate (many of the most fluent first-language speakers are elderly) and a vigorous immersion-school revitalisation movement led by communities like Kahnawà:ke and Akwesasne.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="moh" data-zoom="6">🌍 Show Mohawk on map</button>
  </div>
  
  <p>Linguistically Mohawk is the textbook example of a <strong>polysynthetic language</strong> — a type in which a single verb form is built up from a long chain of obligatory and optional affixes, often expressing an entire English clause inside one word. A textbook favourite, popularised by Mark Baker in <em>The Atoms of Language</em> (2001):</p>
  
  <blockquote><em>washakotya'tawitsherahetkvhta'se'</em><br>
  "he ruined her dress"; literally, "he made the thing one puts on the body ugly for her"</blockquote>
  
  <p>Pulling that single word apart yields roughly:</p>
  
  <ul>
    <li><em>wa-</em> — factual / past-tense prefix</li>
    <li><em>shako-</em> — masculine-singular-subject acting on feminine-singular-object ("he … her")</li>
    <li><em>-ya't-</em> — "body" — the first half of the incorporated noun below, not a separate element</li>
    <li><em>-awitshera-</em> — <em>-awi-</em> "put on" plus the nominaliser <em>-tsher-</em>; with the preceding <em>-ya't-</em> this is the incorporated noun <em>-ya'tawitshera-</em> "dress, garment", literally "the thing one puts on the body" (cf. Kanien'kéha <em>atià:tawi</em> "shirt, jacket, dress")</li>
    <li><em>-hetkv-</em> — verb root: "be ugly, be bad"</li>
    <li><em>-ht-</em> — causative ("make X")</li>
    <li><em>-a's-</em> — benefactive ("for her")</li>
    <li><em>-e'</em> — punctual aspect (a single completed event)</li>
  </ul>
  
  <p>The argument structure of a whole English sentence is packed into the morphology of one verb. Mohawk also exhibits <strong>noun incorporation</strong>: a generic object noun (here, "dress") moves inside the verb stem rather than appearing as a separate word. Marianne Mithun has shown that incorporation follows discourse-level choices — incorporated nouns are typically backgrounded, while independent nouns highlight a referent.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="house" data-code="moh">🏠 See Mohawk "House"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="moh">👨 See Mohawk "Father"</button>
  </div>
  
  <p>Mohawk verbs also obligatorily mark a complex <strong>pronominal prefix</strong> that fuses the person, number and gender of subject and object into one portmanteau morpheme. There are <strong>58</strong> such prefixes in the paradigm, distinguishing for instance "I → you (sg)" from "I → you (pl)" from "you (sg) → me"; some are a single consonant, while others, like <em>shako-</em> "he → her", run to two syllables. Learning the prefix table is widely regarded as the steepest climb in the language.</p>
  
  <p>Polysynthesis also complicates cross-linguistic definitions of a "word". Mark Baker, in <em>The Polysynthesis Parameter</em> (1996), a book built largely on Mohawk data, argued that polysynthetic languages obey their own syntactic constraints — for example, independent pronoun arguments need not appear because the verb already carries them — and that they represent a parametric setting different from languages like English. Others, including Mithun, prefer to describe Mohawk on its own terms rather than fit it into a universalist parameter.</p>
  

<p>The revival movement matters here. Kanien'kéha immersion schools — the Kahnawà:ke Survival School and the Akwesasne Freedom School are the best known — have produced a new generation of speakers who handle that 58-cell pronominal table fluently. Mohawk shows that polysynthesis is not a fossil of the past; it is a living grammatical strategy, just as expressive as any analytic one, and now consciously rebuilt by communities determined that <em>Kanien'kéha</em> will continue.</p>
  
  <p>Other classic polysynthetic languages — Inuktitut, Central Siberian Yupik, Chukchi, Ainu, Sora — confirm that the pattern is recurrent across continents. Mohawk, with its tightly fused verbs and productive noun incorporation, remains one of the examples textbooks reach for first.</p>
        `,
        ja: `
  <p><strong>モホーク語</strong>（<em>Kanien'kéha</em>「火打石の民の言葉」）は、ハウデノサウニー連邦の6言語のひとつで、ケベック南部、オンタリオ、ニューヨーク州北部のコミュニティで話される。<strong>イロコイ語族</strong>最大の言語で、話者は2011年の推計で約3500人（第一言語として最も流暢に話す人の多くは高齢者だ）、カナワケ、アクウェサスネといった共同体ではイマージョン教育による復興運動が活発である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="moh" data-zoom="6">🌍 地図でモホーク語を見る</button>
  </div>
  
  <p>言語学的にはモホーク語は<strong>多総合的言語（polysynthetic language）</strong>の代表例だ。動詞1つの内部に多数の義務的・任意的接辞が連結し、英語の1文丸ごとに相当する情報が詰め込まれる。マーク・ベイカーが『The Atoms of Language』（2001）で広め、教科書の定番となった例：</p>
  
  <blockquote><em>washakotya'tawitsherahetkvhta'se'</em><br>「彼は彼女のドレスを台無しにした」、直訳すれば「彼は彼女のために、体に着けるものを醜くした」</blockquote>
  
  <p>分解すると：</p>
  
  <ul>
    <li><em>wa-</em> 事実／過去接頭辞</li>
    <li><em>shako-</em> 男性単数主語＋女性単数目的語（「彼が彼女に」）</li>
    <li><em>-ya't-</em>「体」。独立した要素ではなく、次の取り込み名詞の前半</li>
    <li><em>-awitshera-</em>「着ける」の <em>-awi-</em> ＋ 名詞化辞 <em>-tsher-</em>。前の <em>-ya't-</em>「体」と合わせて取り込み名詞 <em>-ya'tawitshera-</em>「ドレス・衣服」、直訳すれば「体につけるもの」（cf. カニエンケハ語 <em>atià:tawi</em>「シャツ・上着・ドレス」）</li>
    <li><em>-hetkv-</em> 動詞語根「醜い・悪い」</li>
    <li><em>-ht-</em> 使役（〜にする）</li>
    <li><em>-a's-</em> 受益（〜のために）</li>
    <li><em>-e'</em> 瞬間相（一回で完結する出来事）</li>
  </ul>
  
  <p>英語1文ぶんの項構造がそのまま1個の動詞形態に圧縮されている。さらに「ドレス」のような一般的目的語が動詞の中に組み込まれる<strong>名詞抱合</strong>の現象も顕著だ。マリアンヌ・ミスンが示したところでは、抱合するかどうかは談話レベルの選択で決まり、抱合された名詞は背景化され、独立名詞は前景化される。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="house" data-code="moh">🏠 モホーク語の「家」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="moh">👨 モホーク語の「父」</button>
  </div>
  
  <p>動詞は<strong>代名詞接頭辞</strong>も義務的に取る。主語・目的語の人称・数・性がひとつに融合した形態素で表され、その総数は<strong>58</strong>に及ぶ。「私→君」「私→君たち」「君→私」がそれぞれ別の接頭辞になるのだ。子音1つだけのものもあれば、<em>shako-</em>「彼→彼女」のように2音節に及ぶものもある。学習者にとっては最大の関門だ。</p>
  
<p>多総合性は、言語間で「単語」をどう定義するかという問題に関わる。マーク・ベイカーは、主にモホーク語のデータをもとに書いた『The Polysynthesis Parameter』（1996）で、多総合的言語は固有の統語制約に従うパラメータ設定だと主張した。ミスンらは、普遍的パラメータに当てはめるよりモホーク語固有の構造として記述すべきだと論じている。</p>
  
  
  
  <p>カナワケ・サバイバル・スクールやアクウェサスネ・フリーダム・スクールなどのイマージョン校では、複雑な代名詞体系を実際の会話の中で教えており、58マスの代名詞表を流暢に使いこなす新しい世代の話者が育っている。多総合性は歴史資料だけの特徴ではなく、現在も共同体で使われ、次世代へ伝えられている文法体系である。</p>
  
  <p>他の代表的多総合的言語──イヌクティトゥット、中央シベリア・ユピック、チュクチ、アイヌ、ソラ──を見ても、この類型は大陸を越えて繰り返し現れる。なかでも、動詞が緊密に融合し、名詞抱合も生産的なモホーク語は、今も教科書が真っ先に取り上げる例のひとつである。</p>
        `,
      },
      sources: [
        'Mithun, Marianne (1984). "The Evolution of Noun Incorporation." Language 60(4): 847–894.',
        'Mithun, Marianne (1999). The Languages of Native North America. Cambridge University Press.',
        'Baker, Mark C. (1996). The Polysynthesis Parameter. Oxford University Press.',
        'Chafe, Wallace L. (1970). A Semantically Based Sketch of Onondaga. Indiana University Publications in Anthropology and Linguistics, Memoir 25.',
        'Bonvillain, Nancy (1973). A Grammar of Akwesasne Mohawk. National Museum of Man, Mercury Series, Ethnology Division Paper No. 8.',
        'Deering, Nora; Delisle, Helga Harries (1976). Mohawk: A Teaching Grammar. Kahnawake: Thunderbird Press.',
        { text: 'Glottolog: Mohawk (moha1258)', url: 'https://glottolog.org/resource/languoid/id/moha1258' },
        { text: 'Kanien\'kéha at Kanehsatà:ke', url: 'https://www.kanehsatakevoices.com/' },
      ],
    },
    {
      id: 'nuxalk-vowelless',
      icon: '🗿',
      tags: ['nuxalk', 'salishan', 'phonology', 'vowelless', 'canada'],
      title: {
        en: 'Nuxalk — words with no vowels at all',
        ja: '母音ゼロの言語、ヌハルク語',
      },
      summary: {
        en: 'Some Nuxalk words and utterances can be analysed without a vowel segment, raising questions about syllable structure and the role of sonorant consonants.',
        ja: 'カナダ・ブリティッシュコロンビアの沿岸で話されるサリシュ語族の言語。子音だけで構成された「母音ゼロ」の語が存在し、音節核とは何かを根底から問い直す。',
      },
      body: {
        en: `
  <p>On the rugged inlets of central British Columbia, a few dozen people still speak <strong>Nuxalk</strong> (also called <em>Bella Coola</em>). Descriptions of this Salishan language include <strong>words analysed without any vowel segment</strong>, a long-running subject of phonological research.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="blc" data-zoom="6">🌍 Show Nuxalk on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="52.40" data-lng="-126.75" data-zoom="6">🗺️ Fly to the Bella Coola valley</button>
  </div>
  
  <p>In 1955 the American linguist Charles Hockett told how a paper on this language by Franz Boas had reportedly been turned down by a German journal editor because, as "everyone knows," it is impossible to have words without vowels. The textbook case, from <strong>Hank Nater</strong>'s 1984 grammar, is:</p>
  
  <blockquote><em>xłp̓x̣ʷłtłpłłskʷc̓</em><br>"then he had had in his possession a bunchberry plant"</blockquote>
  
  <p>Read that again. There is not a single <em>a</em>, <em>e</em>, <em>i</em>, <em>o</em>, or <em>u</em> — not even a schwa. Yet Nuxalk speakers pronounce it as a fluent, unbroken word. Other classics include <em>p̓x̣ʷłt</em> ("bunchberry"), <em>cktskʷc</em> ("he arrived"), <em>łxʷtłcxʷ</em> ("you spat on me"), <em>t̓xt</em> ("stone"), <em>st̓s</em> ("salt") and <em>sps</em> ("northeast wind").</p>
  
  <p>How is this possible? In most languages, every syllable is built around a <strong>vowel</strong> — an open, sonorous nucleus that carries the breath. Nuxalk seems to break this rule. Linguists have answered in three main ways:</p>
  
  <ul>
    <li><strong>No syllables at all.</strong> Stanley Newman put it bluntly in 1947: "There are no syllables in Bella Coola." Nater still defends that view and concluded in 2024 that the language is "essentially non-syllabic."</li>
    <li><strong>Consonants as syllable nuclei.</strong> <strong>James E. Hoard</strong> (1978) argued that even stops and fricatives can serve as the heart of a syllable, so that a word like <em>sps</em> can contain syllables with no vowel at all.</li>
    <li><strong>Syllables, but not everywhere.</strong> In an influential 1991 article Bruce Bagemihl argued that Nuxalk does have syllables, built in the usual way around vowels and sonorants, but that many consonants are left outside any syllable, attached only to units of timing called <strong>moras</strong>.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="blc">💧 See Nuxalk "water" (qla)</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="blc">☀️ See Nuxalk "sun" (snx)</button>
  </div>
  
  <p>Native speakers themselves do not perceive a "missing vowel". They do not feel they are inserting a covert schwa to make the word pronounceable — the descriptive record, from Newman's 1947 phonology to Nater's fieldwork and recordings, finds no hidden vowel slipped in between the consonants. To the speaker, <em>xłp̓x̣ʷłtłpłłskʷc̓</em> is just a word. Speed does change it, though: Hoard noted that <em>łxʷtłcxʷ</em> "you spat on me" has every consonant carrying its own beat in careful speech, squeezed into about three beats when spoken fast.</p>
  
  <p>The implications go far beyond Nuxalk. If a language can build words from pure obstruent strings, then the universal claim that <em>every syllable needs a vowel</em> cannot stand in its strongest form. Phonologists now distinguish more carefully between <strong>sonority</strong> (the acoustic property) and <strong>nucleus-hood</strong> (the structural role), and Nuxalk is the example everyone teaches, alongside Tashlhiyt Berber in Morocco, where Rachid Ridouane's 2008 study used acoustic and imaging data to show that consonant-only syllables have no hidden vowel.</p>
  
  <p>The First Peoples' Cultural Council counts 21 fluent speakers of Nuxalk, 44 semi-speakers and 249 learners, out of a population of 1,762. Nater put the number of native speakers at just three in 2022. The Nuxalk Nation runs immersion programs and a language-house initiative; recordings made by Nater in the 1970s, and more recent documentation supported by the First Peoples' Cultural Council, are racing to record a phonology unlike any other.</p>
        `,
        ja: `
  <p>カナダ・ブリティッシュコロンビア州中央部では、数十人が<strong>ヌハルク語（Nuxalk、別名 Bella Coola）</strong>を使用している。サリシュ語族に属し、<strong>母音を含まないと分析される単語</strong>があることで音韻論の研究対象となってきた。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="blc" data-zoom="6">🌍 地図でヌハルク語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="52.40" data-lng="-126.75" data-zoom="6">🗺️ ベラクーラ渓谷へ飛ぶ</button>
  </div>
  
  <p>1955年、アメリカの言語学者チャールズ・ホケットは、この言語についてのフランツ・ボアズの論文が、ドイツの学術誌の編集者に突き返されたという話を紹介している。「誰もが知っている」とおり、母音のない語などありえない、というのが理由だったという。教科書の定番は、<strong>ハンク・ネイター</strong>の1984年の文法書から採った次の語だ：</p>
  
  <blockquote><em>xłp̓x̣ʷłtłpłłskʷc̓</em><br>「そのとき彼はゴゼンタチバナの株を所有していた」</blockquote>
  
  <p>もう一度見てほしい──a も e も i も o も u もない。曖昧母音シュワーすら入っていない。それでも話者はこれを一つの流暢な単語として発音する。ほかにも、<em>p̓x̣ʷłt</em>「ゴゼンタチバナ」、<em>cktskʷc</em>「彼が着いた」、<em>łxʷtłcxʷ</em>「お前は私に唾を吐いた」、<em>t̓xt</em>「石」、<em>st̓s</em>「塩」、<em>sps</em>「北東風」といった定番の例がある。</p>
  
  <p>なぜ可能なのか。多くの言語で、音節は<strong>母音</strong>という響きの核を中心に組み立てられる。ヌハルク語はこの原則を破っているように見える。言語学者の答えは、大きく三つに分かれる：</p>
  
  <ul>
    <li><strong>そもそも音節がない。</strong> スタンリー・ニューマンは1947年、「ベラクーラ語に音節はない」と言い切った。ネイターは今もこの見方を擁護しており、2024年には、この言語は「本質的に非音節的」だと結論している。</li>
    <li><strong>子音が音節核になる。</strong> <strong>ジェイムズ・E・ホード</strong>（1978年）は、破裂音や摩擦音でさえ音節核になりうると論じた。だから <em>sps</em> のような語には、母音がまったくない音節が含まれうる、というのである。</li>
    <li><strong>音節はあるが、どこにでもあるわけではない。</strong> 1991年の影響力ある論文で、ブルース・バゲミールは、ヌハルク語にも母音や鳴音を核としてふつうに組み立てられる音節はあるが、多くの子音はどの音節にも属さず、<strong>モーラ</strong>と呼ばれるタイミングの単位にだけ結びついている、と論じた。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="blc">💧 ヌハルク語の「水」（qla）</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="blc">☀️ ヌハルク語の「太陽」（snx）</button>
  </div>
  
  <p>ヌハルク語の母語話者自身は、「母音が抜けている」感覚を持たない。ニューマンの1947年の音韻記述からネイターの現地調査と録音にいたるまで、記述研究は、子音と子音のあいだにこっそり母音が入り込んでいるとは認めていない。話者にとって <em>xłp̓x̣ʷłtłpłłskʷc̓</em> は「ふつうの一語」だ。ただし速さによって変わることはある。ホードによれば、<em>łxʷtłcxʷ</em>「お前は私に唾を吐いた」は、丁寧に発音すると子音一つ一つが自分の拍を持つが、速く言うと3拍ほどに詰め込まれるという。</p>
  
  <p>影響はヌハルク語にとどまらない。「すべての音節には母音が必要」という普遍仮説は、その最強の形では維持できなくなった。現在の音韻論は<strong>響度（音響的性質）</strong>と<strong>核となる役割（構造的性質）</strong>を慎重に区別する──そのきっかけとなった例こそヌハルク語であり、今では誰もが教える定番の例だ。並んで挙げられるのがモロッコのタシュリヒート・ベルベル語で、ラシード・リドゥアーヌの2008年の研究は、音響データと画像データを用いて、子音だけの音節に隠れた母音がないことを示している。</p>
  
  <p>ブリティッシュコロンビア州先住民族文化評議会の集計では、人口1,762人のうち、流暢な話者は21人、準話者が44人、学習者が249人。ネイターは2022年、母語話者はわずか3人だとしている。ヌハルク・ネイションはイマージョン教育と「言語ハウス」運動を進め、ネイターの1970年代の録音、ブリティッシュコロンビア州先住民族文化評議会の支援による近年の記録活動が、世界に二つとない音韻体系を残そうと走り続けている。</p>
        `,
      },
      sources: [
        { text: "Nater, Hank (2024). \"Whispered Words in Bella Coola: Fact vs Fiction.\" Journal of Language Research 1(2): 1–12.", url: "https://openaccesspub.org/language-research/article/2118" },
        'Nater, Hank F. (1984). The Bella Coola Language. National Museums of Canada, Mercury Series, Canadian Ethnology Service Paper No. 92.',
        'Bagemihl, Bruce (1991). "Syllable structure in Bella Coola." Linguistic Inquiry 22(4): 589–646.',
        'Newman, Stanley (1947). "Bella Coola I: Phonology." International Journal of American Linguistics 13(3): 129–134.',
        'Hoard, James E. (1978). "Obstruent clusters in Bella Coola." In Mohammad Ali Jazayery et al. (eds.), Linguistic and Literary Studies in Honor of Archibald A. Hill, Vol. 2: 113–117. Mouton.',
        { text: 'Glottolog: Bella Coola (bell1243)', url: 'https://glottolog.org/resource/languoid/id/bell1243' },
        { text: 'First Peoples\' Cultural Council: Nuxalk', url: 'https://maps.fpcc.ca/languages/nuxalk' },
      ],
    },
    {
      id: 'hawaiian-13-phonemes',
      icon: '🌺',
      tags: ['hawaiian', 'polynesian', 'revival', 'minimal-phonemes', 'hawaii'],
      title: {
        en: 'Hawaiian — 13 sounds and language revitalization',
        ja: '13の音素とハワイ語復興運動',
      },
      summary: {
        en: 'Hawaiian has a 13-phoneme inventory and was once close to losing intergenerational transmission. Revitalization programs now support its use in education and community life.',
        ja: 'ハワイ語は13音素の体系を持ち、かつて世代間継承が途絶えかけた。現在は就学前教育から大学まで、ハワイ語による教育が行われている。',
      },
      body: {
        en: `
  <p><strong>ʻŌlelo Hawaiʻi</strong> — the Hawaiian language — has a small sound inventory for a living language: <strong>13 phonemes</strong>, with 8 consonants (<em>p, k, ʻ, h, m, n, l, w</em>) and 5 vowels (<em>a, e, i, o, u</em>), each of which can be short or long. Its orthography uses the glottal stop <em>ʻokina</em> and the long-vowel mark <em>kahakō</em>.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="haw" data-zoom="5">🌍 Show Hawaiian on the map</button>
  </div>
  
  <p>Its small phoneme inventory produces many vowel-rich words, including <em>humuhumunukunukuāpuaʻa</em> (the reef triggerfish, Hawaiʻi's state fish), <em>pāhoehoe</em> and <em>ʻaʻā</em> (smooth and jagged lava — both terms borrowed into geology worldwide), and <em>aloha</em>, which can mean hello, goodbye, love, and compassion.</p>
  
  <p>Hawaiian descends from <strong>Proto-Polynesian</strong>, brought by voyagers from the Marquesas and Society Islands. High-precision radiocarbon dating has pushed that arrival far later than older textbooks assumed — current estimates cluster between roughly <strong>AD 1000 and 1300</strong>, so barely a thousand years ago. The closest living relatives are Marquesan, Tahitian, and Māori, and the historical correspondences are so regular that a Māori speaker can often guess a Hawaiian cognate at a glance (Māori <em>tangata</em> ↔ Hawaiian <em>kanaka</em>, "person"; Māori <em>ika</em> ↔ Hawaiian <em>iʻa</em>, "fish": Hawaiian turned old <em>t</em> into <em>k</em> and old <em>k</em> into the glottal stop ʻ).</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="haw">☀️ See Hawaiian "sun"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="haw">👋 See Hawaiian "Hello"</button>
  </div>
  
  <p>Then came the collapse. The <strong>1893 overthrow of the Hawaiian Kingdom</strong> and the 1898 U.S. annexation set off a generation of cultural repression. In 1896 the Republic of Hawaiʻi passed <strong>Act 57</strong>, requiring English as the sole medium of instruction in schools. Many elders later recalled being punished as children for speaking Hawaiian at school. By 1983 the native speakers left were mostly elders over 70, plus the small community on the island of Niʻihau, and fewer than 50 children under 18 still spoke Hawaiian.</p>
  
  <p>Inspired by Māori <em>Kōhanga Reo</em> ("language nests") in New Zealand, educators including <strong>Larry Kimura</strong>, <strong>William H. "Pila" Wilson</strong>, and <strong>Kauanoe Kamanā</strong> founded <strong>ʻAha Pūnana Leo</strong> in 1983 — Hawaiian-only preschools where elders spoke Hawaiian to toddlers. In 1986, the 90-year ban on Hawaiian-medium schooling was repealed. By 1987 the first <strong>Kula Kaiapuni</strong> Hawaiian-immersion public schools opened. The University of Hawaiʻi at Hilo's <strong>Ka Haka ʻUla O Keʻelikōlani</strong> College of Hawaiian Language runs Hawaiian-medium education from preschool to graduate school, and in 2006 it launched the world's first doctorate specifically in Indigenous language and culture revitalization.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="19.72" data-lng="-155.08" data-zoom="7">🌋 Fly to Hilo, the heart of the revival</button>
  </div>
  
  <p>A 2016 State of Hawaiʻi report counted <strong>~18,400 people</strong> speaking Hawaiian at home; by 2024 the Office of Hawaiian Affairs put that figure at <strong>27,338</strong> (Census survey data for 2018–2022), a rise of nearly 50% in under a decade, with about 32,700 people speaking Hawaiian at home across the United States. Outside Niʻihau, where the language was never lost, children are once again growing up with Hawaiian as a first language. The phoneme inventory is still 13. The future, however, has expanded immeasurably.</p>
        `,
        ja: `
  <p><strong>ʻŌlelo Hawaiʻi</strong>──ハワイ語は、現在話されている言語のなかで最少クラスの音素体系を持つ。<strong>音素はたった13個</strong>。子音8つ（<em>p, k, ʻ, h, m, n, l, w</em>）と母音5つ（<em>a, e, i, o, u</em>）、それぞれに短音と長音がある。それだけだ。声門閉鎖音「ʻokina」、長音符「kahakō」まで含めても、アルファベットは午後ひとつで覚えられる。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="haw" data-zoom="5">🌍 地図でハワイ語を見る</button>
  </div>
  
  <p>少数の音素を組み合わせるため、ハワイ語には母音の連続する語が多い。例として <em>humuhumunukunukuāpuaʻa</em>（ハワイ州の魚）、地質学にも借用された <em>pāhoehoe</em> と <em>ʻaʻā</em>、文脈により挨拶・別れ・愛・思いやりを表す <em>aloha</em> がある。</p>
  
  <p>ハワイ語は<strong>祖ポリネシア語</strong>に遡り、マルキーズ・ソシエテ諸島から航海者によってもたらされた。高精度の放射性炭素年代測定により、その到達時期は旧来の説より大幅に新しく見直されており、現在の推定はおおむね<strong>西暦1000〜1300年</strong>に集中している──せいぜい千年ほど前のことである。近縁言語はマルキーズ語、タヒチ語、マオリ語で、音対応が非常に規則的なため、マオリ語話者はハワイ語の同根語をしばしば即座に推測できる（マオリ<em>tangata</em>↔ハワイ<em>kanaka</em>「人」、マオリ<em>ika</em>↔ハワイ<em>iʻa</em>「魚」。ハワイ語では古い <em>t</em> が <em>k</em> に、古い <em>k</em> が声門閉鎖音 ʻ に変わった）。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="haw">☀️ ハワイ語の「太陽」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="haw">👋 「アロハ」を見る</button>
  </div>
  
  <p>そして崩壊が訪れる。<strong>1893年のハワイ王国転覆</strong>と1898年の米国併合により、文化弾圧の一世代が始まった。1896年、ハワイ共和国は<strong>第57号法</strong>を制定し、学校の指導言語を英語に限定。のちに多くの長老が、子どものころ学校でハワイ語を話して罰を受けた記憶を語っている。1983年には、残る母語話者は70歳を超える長老がほとんどで、ほかにはニイハウ島の小さな共同体があるだけ。ハワイ語を話す18歳未満の子どもは50人にも満たなかった。</p>
  
  <p>そこから始まったのが、現代社会言語学の金字塔である。ニュージーランドのマオリ「Kōhanga Reo（言語の巣）」に学び、<strong>ラリー・キムラ</strong>、<strong>ピラ・ウィルソン</strong>、<strong>カウアノエ・カマナー</strong>らが1983年に<strong>ʻAha Pūnana Leo</strong>を設立──長老たちがハワイ語だけで幼児に話しかける、ハワイ語専用幼稚園である。1986年、90年続いたハワイ語教育禁止令がついに廃止。1987年には公立の<strong>Kula Kaiapuni</strong>イマージョン校が開校した。ハワイ大学ヒロ校のハワイ語カレッジ<strong>Ka Haka ʻUla O Keʻelikōlani</strong>は、就学前から大学院までハワイ語による教育を担い、2006年には先住民の言語・文化の再活性化に特化した、世界初の博士課程を開設した。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="19.72" data-lng="-155.08" data-zoom="7">🌋 復興の中心地ヒロへ飛ぶ</button>
  </div>
  
  <p>2016年のハワイ州報告書では、家庭でハワイ語を話す人は<strong>約18,400人</strong>。2024年のハワイ人問題局（OHA）の報告ではこれが<strong>27,338人</strong>（2018〜2022年の国勢調査局の調査データ）となり、10年足らずで5割近く増えた（家庭でハワイ語を話す人は全米で約32,700人）。言葉が一度も途絶えなかったニイハウ島の外でも、ハワイ語を第一言語として育つ子どもたちが再び現れている。音素は13個のまま──しかし、その未来は計り知れないほど大きくなった。</p>
        `,
      },
      sources: [
        { text: "Rawlins, Nāmaka (2022). Testimony of ʻAha Pūnana Leo, U.S. Senate Committee on Indian Affairs.", url: "https://www.indian.senate.gov/wp-content/uploads/FINAL.Rawlins.Testimony%202%20June%202022%20SCIA.pdf" },
        'Pukui, Mary Kawena; Elbert, Samuel H. (1986). Hawaiian Dictionary, Revised and Enlarged Edition. University of Hawaiʻi Press.',
        'Schütz, Albert J. (1994). The Voices of Eden: A History of Hawaiian Language Studies. University of Hawaiʻi Press.',
        'Wilson, William H.; Kamanā, Kauanoe (2001). "Mai Loko Mai O Ka ʻIʻini: Proceeding from a Dream — The ʻAha Pūnana Leo Connection in Hawaiian Language Revitalization." In Hinton & Hale (eds.), The Green Book of Language Revitalization in Practice, pp. 147–176. Academic Press.',
        'Warner, Sam L. Noʻeau (2001). "The Movement to Revitalize Hawaiian Language and Culture." In Hinton & Hale (eds.), The Green Book of Language Revitalization in Practice, pp. 133–146.',
        { text: 'Glottolog: Hawaiian (hawa1245)', url: 'https://glottolog.org/resource/languoid/id/hawa1245' },
        { text: 'ʻAha Pūnana Leo', url: 'https://www.ahapunanaleo.org/' },
        { text: 'Ethnologue: Hawaiian (haw)', url: 'https://www.ethnologue.com/language/haw/' },
      ],
    },
    {
      id: 'nicaraguan-sign-language',
      icon: '🤟',
      tags: ['sign-language', 'nicaragua', 'emergence', 'isn', 'kegl', 'deaf'],
      title: {
        en: 'Nicaraguan Sign Language — change observed across cohorts',
        ja: 'ニカラグア手話──研究者の目の前で誕生した言語',
      },
      summary: {
        en: 'Nicaraguan Sign Language emerged among deaf children brought together in Managua from the late 1970s. Recordings of successive cohorts document how its shared lexicon and grammar developed.',
        ja: '1970年代末からマナグアに集まったろう児たちの間でニカラグア手話が成立した。世代ごとの記録から、共有語彙と文法が発達する過程を追うことができる。',
      },
      body: {
        en: `
  <p>Imagine being a linguist and getting to watch a brand-new human language take shape in real time — not creolised from an existing spoken language, but generated by children in a single generation, starting largely from their own home-sign systems and gestures. That is roughly what happened in Managua, Nicaragua, between 1977 and the early 1990s, producing what we now call <strong>Idioma de Señas de Nicaragua (ISN)</strong>, Nicaraguan Sign Language. Other young or village sign languages (Al-Sayyid Bedouin Sign Language in Israel, Kata Kolok in Bali) have been studied too, but ISN remains the best-documented case for cohort-by-cohort emergence.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ncs" data-zoom="7">🌍 Show Nicaraguan Sign Language on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="12.13" data-lng="-86.25" data-zoom="7">🗺️ Fly to Managua</button>
  </div>
  
  <p>Before 1977, deaf Nicaraguans were isolated. Each family invented its own "<strong>home signs</strong>" — small idiolectal gesture systems used between a deaf child and immediate relatives — but the country had no deaf community, no sign language, and almost no education for deaf children. Then, in 1977, the new <strong>Centro Nacional de Educación Especial</strong> opened in Managua, followed by a vocational school in Villa Libertad in 1980. Enrolment grew from 50 children in 1977 to more than 400 across the two schools by 1983: for the first time, hundreds of deaf children were brought together daily.</p>
  
  <p>The schools taught in spoken Spanish with lip-reading and finger-spelling. Officially, signing was discouraged. The children, however, did what humans always do when forced into proximity: <strong>they communicated</strong>. On the playground and on the school buses, they combined their home signs, invented new ones, and within a few years had built a shared <strong>pidgin sign system</strong>, now called <em>Lenguaje de Signos Nicaragüense (LSN)</em>.</p>
  
  <p>Then the little ones arrived. When younger children — preschoolers and early primary kids — entered the system in the mid-1980s, they took the older kids' pidgin as input and did something only children can do: <strong>they grammaticalised it</strong>. They added consistent spatial agreement, verb morphology, and discourse markers. By the early 1990s the younger cohort was signing a richer, more systematic language, ISN, whose spatial grammar many of the older signers never fully mastered.</p>

  <p>The American linguist <strong>Judy Kegl</strong> was invited to study the situation in 1986. She quickly realised what she was seeing was unprecedented. Together with <strong>Ann Senghas</strong>, <strong>Marie Coppola</strong>, and others, she has documented the language across cohorts ever since. Their landmark finding:</p>
  
  <blockquote>"We found that in their initial creation of the language, children analyzed complex events into basic elements and sequenced these elements into hierarchically structured expressions according to principles not observed in gestures accompanying speech in the surrounding language. Successive cohorts of learners extended this procedure, transforming Nicaraguan signing from its early gestural form into a linguistic system." — Senghas, Kita & Özyürek, <em>Science</em> 2004</blockquote>
  
  <p>The study documents how children in successive cohorts introduced features such as decomposing motion events into "path" and "manner" components, so that "rolling down" became one sign for rolling followed by another for descending, where hearing Nicaraguans' gestures showed both at once. These patterns are also documented in other established sign languages.</p>
  
  <p>ISN is now used by a few thousand signers and a Deaf community organised through <em>Asociación Nacional de Sordos de Nicaragua</em>. The first cohort's early signing had to be reconstructed from those signers as adults, but from 1986 onward successive cohorts were recorded on camera and described in linguistic fieldnotes. Those records make changes in the language observable across generations.</p>
        `,
        ja: `
<p>1977年以降、ニカラグアの首都マナグアで、それまで家庭ごとのホームサインを使っていたろう児たちが学校に集まった。子どもたちの交流から共有の手話が形成され、1980年代以降に入学した世代が語彙と文法を発達させた。この言語が<strong>Idioma de Señas de Nicaragua（ISN、ニカラグア手話）</strong>である。1986年以降の記録により、世代ごとの変化を比較できる。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ncs" data-zoom="7">🌍 地図でニカラグア手話を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="12.13" data-lng="-86.25" data-zoom="7">🗺️ マナグアへ飛ぶ</button>
  </div>
  
  <p>1977年以前、ニカラグアのろう者は孤立していた。各家庭でろう児と家族のあいだだけに通じる<strong>「ホームサイン」</strong>が断片的に成立してはいたが、国全体のろうコミュニティも、共通の手話も、ろう児向け教育もほぼ皆無だった。1977年、マナグアに<strong>国立特殊教育センター（Centro Nacional de Educación Especial）</strong>が開校し、1980年にはビジャ・リベルタの職業学校が続く。生徒数は1977年の50人から、1983年には2校合わせて400人を超えた。何百人ものろう児が、初めて毎日同じ空間に集ったのである。</p>
  
  <p>学校は口話法と指文字で指導した。公式には手話の使用は推奨されていなかった。しかし、子どもたちは強制的に近接させられた人間がいつもすることをした──<strong>彼らは伝え合った</strong>。校庭やスクールバスで、各自のホームサインを混ぜ、新しいサインを発明し、数年のうちに共有された<strong>ピジン手話</strong>（後に LSN, Lenguaje de Signos Nicaragüense と呼ばれる）を作り上げた。</p>
  
  <p>そこへ、小さな子どもたちがやってきた。より幼い世代──幼稚園・小学校低学年──が1980年代半ばに合流したのだ。彼らは年長児のピジンを入力として受け取り、子どもにしかできないことをした──<strong>それを文法化した</strong>のである。空間的一致、動詞形態論、談話標識が一貫して導入された。1990年代初頭には、若年層はより豊かで体系的な言語──ISN──で手話をしていた。年長の手話者の多くは、その空間文法を最後まで完全には身につけられなかった。</p>

  <p>米国の言語学者<strong>ジュディ・ケグル</strong>は1986年に調査を依頼され、目の前で起きていることが前例のない出来事だと即座に気づいた。以後、<strong>アン・センガス</strong>、<strong>マリー・コッポラ</strong>らとともに世代別記録を続けている。彼らの代表的な発見はこうだ：</p>
  
  <blockquote>「私たちが見いだしたのは、この言語を最初に作り出す過程で、子どもたちが複雑な出来事を基本的な要素へと分析し、それらの要素を、周囲の言語で発話に伴う身振りには見られない原理に従って、階層的に構造化された表現へと並べたということである。後続の世代の学習者たちはこの手続きを拡張し、ニカラグアの手話を初期の身振り的な形態から言語体系へと変えていった」── センガス、喜多、オズユレク, <em>Science</em>誌, 2004年</blockquote>
  
  <p>後続世代では、移動事象を「経路」と「様態」に分けて表す構造が広がった。「転がり落ちる」なら、転がることを表す手話のあとに下ることを表す手話を続ける。聞こえるニカラグア人の身振りでは、この二つが一度に表されていた。イスラエルのアル＝サイイド・ベドウィン手話やバリ島のカタ・コロクなど、ほかの若い手話や村落手話も研究されており、子ども同士の伝達が文法の形成に果たす役割を検討する資料となっている。</p>
  
<p>現在、ISNは数千人の手話者に使われており、<em>Asociación Nacional de Sordos de Nicaragua</em>を中心にろうコミュニティが形成されている。最初の世代の初期段階は成人後の手話から遡って再構する必要があるが、1986年以降は各世代が映像・論文・フィールドノートに記録されている。</p>
        `,
      },
      sources: [
        'Kegl, Judy; Senghas, Ann; Coppola, Marie (1999). "Creation through contact: Sign language emergence and sign language change in Nicaragua." In Michel DeGraff (ed.), Language Creation and Language Change: Creolization, Diachrony, and Development, pp. 179–237. MIT Press.',
        'Senghas, Ann; Kita, Sotaro; Özyürek, Aslı (2004). "Children Creating Core Properties of Language: Evidence from an Emerging Sign Language in Nicaragua." Science 305(5691): 1779–1782.',
        'Senghas, Ann; Coppola, Marie (2001). "Children Creating Language: How Nicaraguan Sign Language Acquired a Spatial Grammar." Psychological Science 12(4): 323–328.',
        'Polich, Laura (2005). The Emergence of the Deaf Community in Nicaragua: "With Sign Language You Can Learn So Much." Gallaudet University Press.',
        'Pyers, Jennie E.; Senghas, Ann (2009). "Language Promotes False-Belief Understanding: Evidence From Learners of a New Sign Language." Psychological Science 20(7): 805–812.',
        { text: 'Glottolog: Nicaraguan Sign Language (nica1238)', url: 'https://glottolog.org/resource/languoid/id/nica1238' },
      ],
    },
    {
      id: 'mama-papa-universals',
      icon: '👶',
      tags: ['mama-papa', 'universals', 'jakobson', 'baby-talk', 'kinship'],
      title: {
        en: 'Why “mama” and “papa” recur across unrelated languages',
        ja: 'なぜ世界中で母は「ママ」なのか',
      },
      summary: {
        en: 'Forms such as mama, papa and baba recur in unrelated languages. Roman Jakobson connected the pattern to early infant babbling and adults\' interpretation of those sounds.',
        ja: '英語 mama、中国語 māma、スワヒリ語 mama、ケチュア語 mama、ナバホ語 amá──血縁関係のない言語が同じ語形に収束する。1960年、ローマン・ヤコブソンが理由を解き明かした。共通祖先のせいではない。',
      },
      body: {
        en: `
  <p>Pick any language at random. Ask how it says "mother". The odds are uncomfortably high that the word is built on a nasal sound, usually <strong>m</strong>, plus an <em>a</em>: English <em>mama</em>, Mandarin <em>māma</em>, Swahili <em>mama</em>, Quechua <em>mama</em>, Navajo <em>amá</em>, Welsh <em>mam</em>, Hebrew <em>imá</em>, Tagalog <em>nanay</em> / <em>mama</em>, Hindi <em>mā</em>, Malayalam <em>amma</em>, and even Hawaiian, where the native <em>makuahine</em> now shares the job with <em>māmā</em>. Now ask how it says "father". Across an equally vast sample you get <strong>papa, baba, tata, dada, abba, atta</strong> — a labial or coronal stop plus <em>a</em>.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="ja,ko,zh,en,eu,ar,hi,sw" data-word="mother">🗣 Compare "mother" across 8 unrelated languages</button>
  </div>
  
  <p>The pattern is too widespread to be explained by a single shared ancestor. In 1959 the Yale anthropologist <strong>George P. Murdock</strong> tallied the words for "mother" and "father" across his World Ethnographic Sample, which covers societies on every continent and in dozens of unrelated families. Syllables like <em>ma</em> and <em>na</em> turned up for "mother", and syllables like <em>pa</em> and <em>ta</em> for "father", far more often than chance would allow.</p>
  
  <p>The classical explanation was given a year later by the Russian-American linguist <strong>Roman Jakobson</strong>, in a slim, beautiful 1960 paper titled <em>"Why 'Mama' and 'Papa'?"</em>. His argument runs as follows:</p>
  
  <ul>
    <li>When babies start to babble, around six months, among the first consonants they produce are <strong>bilabial nasals</strong> [m] and <strong>bilabial stops</strong> [p, b]. These require only that the lips close and open; no tongue control needed. The default vowel that emerges from a slightly open mouth is <strong>[a]</strong>.</li>
    <li>The very first proto-syllables a baby makes are therefore <em>ma</em>, <em>pa</em>, <em>ba</em>, repeated: <em>mama</em>, <em>papa</em>, <em>baba</em>.</li>
    <li>Why should <em>m</em> go with mother? Jakobson's answer is the most memorable part of the paper. A nursing baby, lips pressed to the breast or bottle and mouth full, can make only one sound: a soft nasal hum, <em>mmm</em>. That hum later becomes a signal of wanting food, then of wanting the person who brings it. Adults hear the babbled <em>mama</em> as addressed to the mother; the stop syllables <em>papa</em>, <em>tata</em>, <em>baba</em> are left for the father.</li>
    <li>The adults <strong>reinforce</strong> the babble by responding to it, so the form <em>sticks</em> as the conventional word in that language — even though nothing in the structure of the language required it.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="en">👩 See "mother" worldwide</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="en">👨 See "father" worldwide</button>
  </div>
  
  <p>Jakobson's account elegantly explains the exceptions, too. <strong>Georgian</strong> famously swaps the pair: <em>mama</em> means "father" and <em>deda</em> means "mother". This is no embarrassment to the theory — Jakobson's point was that <em>mama</em> is the easiest first word, not that it must mean "mother". Georgian just attached the easiest form to the slightly less expected referent. Tulu, a Dravidian language of south-west India, does the same: <em>appe</em> is "mother" and <em>amme</em> "father". Likewise, in <strong>Old Japanese</strong> "mother" was <em>papa</em> (spelled with p-row man'yōgana; modern <em>haha</em>, by the regular change of p to h), and "father" was <em>titi</em>, today's <em>chichi</em>.</p>
  
  <p>So when an English baby says <em>mama</em>, a Mandarin baby says <em>māma</em>, and a Swahili baby says <em>mama</em>, no shared ancestor is needed. The same easy sounds meet the same caregiver, and the same word is born, independently, again and again, on every continent. That is also why linguists throw out <em>mama</em> and <em>papa</em> when they hunt for long-lost language families: a resemblance that babies create anew in every generation proves nothing about common ancestry.</p>
        `,
        ja: `
  <p>世界の言語からランダムに一つ選び、「母」をどう言うか聞いてみよう。鼻音──たいていは<strong>m</strong>──に<em>a</em>を組み合わせた語にぶつかる確率は、不気味なほど高い。英語<em>mama</em>、中国語<em>māma</em>、スワヒリ語<em>mama</em>、ケチュア語<em>mama</em>、ナバホ語<em>amá</em>、ウェールズ語<em>mam</em>、ヘブライ語<em>imá</em>、タガログ語<em>nanay</em>/<em>mama</em>、ヒンディー語<em>mā</em>、マラヤーラム語<em>amma</em>、そしてハワイ語でさえ、固有の<em>makuahine</em>が今では<em>māmā</em>と役目を分け合っている。次に「父」を尋ねると、<strong>papa, baba, tata, dada, abba, atta</strong>──唇音または歯茎閉鎖音 + <em>a</em>がやはり並ぶ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="ja,ko,zh,en,eu,ar,hi,sw" data-word="mother">🗣 系統の異なる8言語の「母」を地図で見る</button>
  </div>
  
  <p>これは偶然ではない。1959年、エール大学の人類学者<strong>ジョージ・P・マードック</strong>は、あらゆる大陸の社会と何十もの互いに無関係な語族を網羅した「世界民族誌標本」について、「母」と「父」を表す語を集計した。すると「母」には <em>ma</em> や <em>na</em> のような音節が、「父」には <em>pa</em> や <em>ta</em> のような音節が、偶然では説明がつかないほど頻繁に現れたのである。共通祖先で説明することは不可能だ。</p>
  
  <p>その翌1960年、ロシア出身の言語学者<strong>ローマン・ヤコブソン</strong>は『なぜ「ママ」と「パパ」なのか』という美しい短論文で古典的説明を与えた。論旨はこうだ：</p>
  
  <ul>
    <li>生後6か月ごろに喃語が始まると、乳児が最初に出す子音の中に<strong>両唇鼻音 [m]</strong> と<strong>両唇閉鎖音 [p, b]</strong>がある。唇を閉じて開くだけでよく、舌の制御を必要としない。わずかに開いた口から自然に出る母音は<strong>[a]</strong>だ。</li>
    <li>したがって乳児の最初の原音節は <em>ma, pa, ba</em> となり、反復されて <em>mama, papa, baba</em> になる。</li>
    <li>では、なぜ <em>m</em> が母と結びつくのか。ヤコブソンの答えは、この論文でいちばん印象に残る部分だ。乳房や哺乳瓶に唇を押し当て、口がいっぱいの乳児に出せる音はひとつしかない。鼻にかかった柔らかなハミング、<em>mmm</em> である。このハミングがやがて「食べ物がほしい」という合図になり、さらに「食べ物をくれる人にいてほしい」という合図になる。大人は喃語の <em>mama</em> を母親への呼びかけと受け取り、閉鎖音の音節 <em>papa</em>、<em>tata</em>、<em>baba</em> は父親に回される。</li>
    <li>大人が反応することで赤ん坊の発音は<strong>強化</strong>され、その語形が言語の慣習語として<strong>定着</strong>する──言語構造上はそうなる必然はなかったのに。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="en">👩 世界の「母」を見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="en">👨 世界の「父」を見る</button>
  </div>
  
  <p>例外もうまく説明できる。<strong>ジョージア語</strong>では<em>mama</em>が「父」、<em>deda</em>が「母」だが、これは理論への反証にはならない。ヤコブソンの主張は「<em>mama</em>は乳児にとって最も発音しやすい語である」というだけで、必ず「母」を指すとは言っていない。ジョージア語ではたまたま「父」に最易形が割り当てられただけだ。南西インドのドラヴィダ系言語<strong>トゥル語</strong>も同じで、<em>appe</em> が「母」、<em>amme</em> が「父」だ。また<strong>上代日本語</strong>では、「母」は<em>papa</em>（p音を表すハ行の万葉仮名で書かれ、規則的な p→h の変化を経て現代の「はは」になった）、「父」は<em>titi</em>、つまり今の「ちち」だった。</p>
  
  <p>英語の赤ん坊が<em>mama</em>、中国語の赤ん坊が<em>māma</em>、スワヒリ語の赤ん坊が<em>mama</em>と言うとき、共通祖語は必要ない。同じ調音の容易さが同じ介護者と出会い、同じ語が独立に何度も生まれ続ける──あらゆる大陸で。だからこそ、失われた語族を探す言語学者は <em>mama</em> と <em>papa</em> を証拠から外す。赤ん坊が世代ごとに新しく作り出す類似は、共通の祖先について何ひとつ証明しないからだ。</p>
        `,
      },
      sources: [
        'Jakobson, Roman (1962 [1960]). "Why \'Mama\' and \'Papa\'?" Originally in B. Kaplan & S. Wapner (eds.), Perspectives in Psychological Theory: Essays in Honor of Heinz Werner. New York: International Universities Press. Reprinted in Selected Writings I: Phonological Studies, pp. 538–545. Mouton.',
        'Murdock, George P. (1959). "Cross-Language Parallels in Parental Kin Terms." Anthropological Linguistics 1(9): 1–5.',
        'Bancel, Pierre J.; Matthey de l\'Etang, Alain (2002). "Tracing the Ancestral Kinship System: The Global Etymon KAKA. Part I: A Linguistic Study." Mother Tongue 7: 209–243.',
        'Locke, John L. (1985). "The role of phonetic factors in parent reference." Journal of Child Language 12(1): 215–220.',
        'Goldman, Herbert I. (2001). "Parental reports of \'MAMA\' sounds in infants: An exploratory study." Journal of Child Language 28(2): 497–506.',
        { text: 'WALS Feature 136B: M in First Person Singular', url: 'https://wals.info/feature/136B' },
        { text: 'Wiktionary: Reconstruction of \'mama\' across language families', url: 'https://en.wiktionary.org/wiki/mama' },
      ],
    },
    {
      id: 'pie-reconstruction',
      icon: '🌳',
      tags: ['pie', 'proto-indo-european', 'reconstruction', 'comparative-method'],
      title: {
        en: 'Proto-Indo-European — reconstruction through regular sound correspondences',
        ja: '誰も書き残さなかった言語、印欧祖語',
      },
      summary: {
        en: 'Proto-Indo-European left no direct texts. Linguists reconstruct its vocabulary and grammar by comparing regular correspondences among its descendant languages.',
        ja: '世界人口の半数が話す言語の祖先──しかし文字資料はゼロ。約6,000年前に話されていた印欧祖語を、言語学者は比較方法で一語ずつ復元してきた。そして「あるはずだ」と予言した音が、後に実在することが確認されたのだ。',
      },
      body: {
        en: `
  <p>More than two in five people alive today speak, as their first language, a language descended from a single prehistoric ancestor: <strong>Proto-Indo-European</strong> (PIE). English, Spanish, Hindi, Russian, Persian, Bengali, German, French, Greek, Italian, Polish, Punjabi, Marathi — all of them, plus dozens of extinct languages like Latin, Sanskrit, Hittite, Tocharian, and Gothic — descend from a language spoken roughly <strong>6,000 years ago</strong>. Most specialists place it on the Pontic-Caspian steppe north of the Black and Caspian Seas: the steppe hypothesis, which <strong>Marija Gimbutas</strong> formulated in the 1950s as the Kurgan hypothesis and David Anthony later developed. The main rival, Colin Renfrew's theory, puts it in Anatolia with the first farmers. Ancient DNA has strengthened the steppe case: a 2025 study in <em>Nature</em> (Lazaridis, Anthony and colleagues) found that people from the Caucasus and lower Volga supplied about four-fifths of the ancestry of the Yamnaya herders, the likeliest PIE speakers, and at least a tenth of the ancestry of the Hittite-speaking Bronze Age Anatolians.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="p_ine" data-zoom="3">🌍 Show the Indo-European family</button>
  </div>
  
  <p>No one ever wrote PIE down. Yet linguists confidently quote PIE words: <em>*ph₂tḗr</em> "father", <em>*méh₂tēr</em> "mother", <em>*wódr̥</em> "water", <em>*ǵneh₃- </em> "to know", <em>*kʷékʷlos</em> "wheel". How can they?</p>
  
  <p>Others had noticed resemblances before, but the famous statement came in 1786, when the British judge <strong>Sir William Jones</strong> announced before the Asiatic Society of Bengal that Sanskrit, Greek, and Latin showed a relationship "so strong indeed, that no philologer could examine them all three, without believing them to have sprung from some common source, which, perhaps, no longer exists." Over the next century, <strong>Franz Bopp</strong>, <strong>Rasmus Rask</strong>, <strong>Jacob Grimm</strong>, and <strong>August Schleicher</strong> developed the <strong>comparative method</strong>: align cognate words across daughter languages, identify regular sound correspondences, and project them back to a reconstructed parent.</p>
  
  <p>The most famous example is <strong>Grimm's Law</strong>, noticed by Rask in 1818 and set out by Grimm in 1822, which describes the systematic shift of stop consonants in the ancestor of Germanic. PIE <em>*p</em> became Germanic <em>*f</em>: hence Latin <em>pater</em> ↔ English <em>father</em>, Latin <em>piscis</em> ↔ English <em>fish</em>, Latin <em>pēs</em> ↔ English <em>foot</em>. PIE <em>*t</em> became <em>*þ</em> (the <em>th</em> sound): Latin <em>trēs</em> ↔ English <em>three</em>. Grimm's law had exceptions, but later rules explained most of them. In 1875 the Dane Karl Verner showed why Gothic has <em>fadar</em> "father" with a <em>d</em> but <em>brōþar</em> "brother" with a <em>þ</em>: the shift depended on where the stress fell in PIE (*ph₂tḗr was stressed after the <em>t</em>, *bʰréh₂tēr before it). Success like this convinced the "Neogrammarians" of the 1870s that sound laws admit no exceptions, the principle the comparative method still rests on.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="en">👨 See "father" across Indo-European</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="en">💧 See English "Water"</button>
  </div>
  
  <p>Then comes the moment that, for many linguists, settled the question of whether reconstruction is real science. In 1879, the young Swiss linguist <strong>Ferdinand de Saussure</strong> — twenty-one years old, and decades away from the lectures that made him famous as the founder of modern structural linguistics — published <em>Mémoire sur le système primitif des voyelles dans les langues indo-européennes</em>. To make PIE vowel alternations work out cleanly, he proposed that PIE had contained mysterious additional <em>coefficients sonantiques</em> that had since disappeared in every known daughter language — sounds we now call <strong>laryngeals</strong> (<em>*h₁, *h₂, *h₃</em>).</p>
  
  <blockquote><em>*péh₂wr̥</em> "fire" → Greek <em>pûr</em>, English <em>fire</em> … and Hittite <em>paḫḫur</em>, where the lost consonant <em>*h₂</em> still shows up as <em>ḫḫ</em></blockquote>
  
  <p>Saussure's proposal initially rested on internal reconstruction rather than direct attestation. After Bedřich Hrozný deciphered <strong>Hittite</strong> in 1915, the Polish linguist <strong>Jerzy Kuryłowicz</strong> argued in 1927 that the Hittite consonant written <em>ḫ</em> occurred in positions corresponding to some of the coefficients Saussure had proposed. A sound reconstructed purely on paper, half a century earlier, had turned up in a newly deciphered language. For many linguists this is the clearest proof that the comparative method works.</p>
  
  <p>Today PIE reconstruction includes hundreds of well-established roots, a grammar conventionally reconstructed with eight cases and three genders, ablaut alternations, and inherited poetic formulas — phrases like <em>*ḱléwos n̥dʰgʷʰitóm</em> "imperishable fame", reflected in both Homeric Greek (<em>kléos áphthiton</em>) and Vedic Sanskrit (<em>śrávas ákṣitam</em>). The reconstruction remains a model rather than a recorded text, and individual forms continue to be revised as the evidence is reassessed.</p>
        `,
        ja: `
  <p>今を生きる人類の5人に2人以上が、同じひとつの先史言語の子孫を第一言語として話している──<strong>印欧祖語（Proto-Indo-European、PIE）</strong>である。英語、スペイン語、ヒンディー語、ロシア語、ペルシア語、ベンガル語、ドイツ語、フランス語、ギリシア語、イタリア語、ポーランド語、パンジャブ語、マラーティー語、そしてラテン語、サンスクリット、ヒッタイト、トカラ語、ゴート語──すべて、約<strong>6,000年前</strong>に話されていた一つの言語の末裔である。専門家の多くは、その故地を黒海・カスピ海の北に広がるポントス・カスピ海ステップに置く。<strong>マリヤ・ギンブタス</strong>が1950年代にクルガン仮説として定式化し、のちにデイヴィッド・アンソニーが発展させた「ステップ仮説」だ。主な対抗説はコリン・レンフルーの説で、最初の農耕民とともにアナトリアに置く。古代DNAはステップ説を後押ししている。2025年に『ネイチャー』に載った研究（ラザリディス、アンソニーら）は、印欧祖語の話者として最有力なヤムナヤ文化の牧畜民の祖先の約5分の4を、そしてヒッタイト語を話した青銅器時代のアナトリアの人々の祖先の少なくとも10分の1を、コーカサスとヴォルガ川下流の人々が占めていたことを明らかにした。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="p_ine" data-zoom="3">🌍 印欧語族を地図で見る</button>
  </div>
  
  <p>誰もPIEを書き残さなかった。それでも言語学者はPIEの単語を堂々と引用する──<em>*ph₂tḗr</em>「父」、<em>*méh₂tēr</em>「母」、<em>*wódr̥</em>「水」、<em>*ǵneh₃-</em>「知る」、<em>*kʷékʷlos</em>「車輪」。なぜそんなことが可能なのか。</p>
  
  <p>類似に気づいた人はそれ以前にもいたが、有名な宣言は1786年に訪れる。英国の判事<strong>サー・ウィリアム・ジョーンズ</strong>がベンガル・アジア協会で、サンスクリット・ギリシア語・ラテン語の類似は「実に強く、いかなる文献学者もこの三言語を比較すれば、もはや現存しないかもしれない共通の源泉から生じたと信ぜざるをえない」と宣言した。続く一世紀で、<strong>フランツ・ボップ</strong>、<strong>ラスムス・ラスク</strong>、<strong>ヤーコプ・グリム</strong>、<strong>アウグスト・シュライヒャー</strong>が<strong>比較方法</strong>を完成させた──子孫言語の同根語を並べ、規則的な音対応を見出し、祖語形に投影する技法である。</p>
  
  <p>もっとも有名な例が、1818年にラスクが気づき、1822年にグリムが定式化した<strong>グリムの法則</strong>だ。PIEの<em>*p</em>はゲルマン語で<em>*f</em>になった──ラテン語<em>pater</em>↔英語<em>father</em>、ラテン語<em>piscis</em>↔英語<em>fish</em>、ラテン語<em>pēs</em>↔英語<em>foot</em>。PIEの<em>*t</em>は<em>*þ</em>（th音）になった──ラテン語<em>trēs</em>↔英語<em>three</em>。グリムの法則には例外もあったが、その多くはのちの規則で説明された。1875年、デンマークのカール・ヴェルナーは、ゴート語でなぜ「父」が <em>d</em> の <em>fadar</em> で、「兄弟」が <em>þ</em> の <em>brōþar</em> なのかを明らかにした。子音の変化は、印欧祖語で強勢がどこにあったかで決まっていたのだ（*ph₂tḗr は <em>t</em> の後に、*bʰréh₂tēr はその前に強勢があった）。こうした成功が1870年代の「青年文法学派」に、音韻法則に例外はないと確信させた。比較方法は今もこの原則の上に立っている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="en">👨 印欧諸語の「父」を見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="en">💧 英語の「水」</button>
  </div>
  
<p>1879年、当時21歳、現代構造言語学の創始者として名を馳せることになる講義はまだ数十年先という、スイスの言語学者<strong>フェルディナン・ド・ソシュール</strong>が『印欧諸語における母音原始体系に関する覚書』を発表した。PIEの母音交替を説明するため、当時知られていた子孫言語には直接残っていない追加要素 <em>coefficients sonantiques</em> を仮定した。これが現在<strong>喉音（laryngeals、<em>*h₁, *h₂, *h₃</em>）</strong>と呼ばれる音である。</p>
  
  <blockquote><em>*péh₂wr̥</em>「火」→ ギリシア語 <em>pûr</em>、英語 <em>fire</em>……そしてヒッタイト語 <em>paḫḫur</em>。失われた子音 <em>*h₂</em> が、ここでは <em>ḫḫ</em> としてまだ姿を見せている</blockquote>
  
  <p>直接証拠はゼロの、純粋な理論的演繹だった。以後ほぼ半世紀、多くの印欧語学者はこれを「優雅な思弁」とみなした。ところが1915年、チェコの学者ベドジヒ・フロズニーが<strong>ヒッタイト語</strong>──3000年間アナトリアの地下に埋もれていた青銅器時代の印欧語──を解読する。1927年、ポーランドの言語学者<strong>イェジー・クリウォヴィチ</strong>は、ヒッタイト語に<em>ḫ</em>で書かれる子音が<strong>ソシュールが「あるはずだ」と予言したまさにその位置</strong>に保存されていることを発見した。ソシュールはすでに14年前に没していた。半世紀前に紙の上だけで再構された音が、新たに解読された言語の中に姿を現したのだ。多くの言語学者にとって、これこそ比較方法が機能することのもっとも明快な証明である。</p>
  
<p>現在のPIE再構には、数百の語根、格・性の体系、母音交替、継承された詩的定型が含まれる。たとえばホメロスのギリシア語 <em>kléos áphthiton</em> とヴェーダ・サンスクリットの <em>śrávas ákṣitam</em> は、共通する「不滅の名声」という表現に遡ると分析される。再建形は録音や文献そのものではなく、比較資料に基づくモデルであり、個々の形は研究の進展に応じて改訂される。</p>
        `,
      },
      sources: [
        'Saussure, Ferdinand de (1879). Mémoire sur le système primitif des voyelles dans les langues indo-européennes. Teubner, Leipzig.',
        'Kuryłowicz, Jerzy (1927). "ə indo-européen et ḫ hittite." In Symbolae grammaticae in honorem Ioannis Rozwadowski, Vol. 1, pp. 95–104. Kraków.',
        'Mallory, J. P.; Adams, Douglas Q. (2006). The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World. Oxford University Press.',
        'Fortson, Benjamin W. IV (2010). Indo-European Language and Culture: An Introduction, 2nd edition. Wiley-Blackwell.',
        'Anthony, David W. (2007). The Horse, the Wheel, and Language: How Bronze-Age Riders from the Eurasian Steppes Shaped the Modern World. Princeton University Press.',
        'Watkins, Calvert (1995). How to Kill a Dragon: Aspects of Indo-European Poetics. Oxford University Press.',
        { text: 'Glottolog: Indo-European (indo1319)', url: 'https://glottolog.org/resource/languoid/id/indo1319' },
      ],
    },
];

// Expose to global so wordmap.html can read it whether this file
// is loaded as a classic <script> or future-bundled.
if (typeof window !== 'undefined') {
  window.TRIVIA_ARTICLES = TRIVIA_ARTICLES;
}
