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
      en: 'Pirahã: the language said to have no numbers',
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
        en: 'Silbo Gomero: a whistled Spanish that crosses canyons',
        ja: 'シルボ・ゴメロ：峡谷を越える口笛のスペイン語',
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
        en: 'Taa (!Xóõ): counting one of the largest consonant inventories',
        ja: 'タア語（!Xóõ）：世界一子音が多い言語',
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
        en: 'Rotokas: an eleven-phoneme sound system',
        ja: 'ロトカス語：世界一音が少ないとされる言語',
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
        en: 'Ubykh: documenting a language with about 84 consonants',
        ja: 'ウビフ語：子音84個の言語が消えた日',
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
    <button type="button" class="trivia-action" data-action="panto" data-lat="39.99" data-lng="27.81" data-zoom="7">🕯️ Zoom into Hacıosman, Turkey</button>
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
    <button type="button" class="trivia-action" data-action="panto" data-lat="39.99" data-lng="27.81" data-zoom="7">🕯️ ハジオスマン村へズーム</button>
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
        en: 'Damin: a ceremonial register with clicks and ingressive sounds',
        ja: 'ダミン語：オーストラリアの音韻常識を破った男性秘密言語',
      },
      summary: {
        en: 'Damin was used by initiated Lardil men on Mornington Island. Its small vocabulary and use of clicks, ingressive laterals and ejectives set it apart from neighbouring Australian sound systems.',
        ja: 'モーニントン島で成人儀礼を経た男性のみが用いたダミン語は、ラーディル語の語彙を約200語に圧縮し、吸気側面音や放出音など「オーストラリアにあり得ない音」を体系的に持っていた。',
      },
      body: {
        en: `
  <p>More than 250 Indigenous languages of Australia share a broadly similar set of speech sounds: stops at four to six places of articulation, usually with no voicing contrast, matching nasals, a few laterals, two rhotics, and no clicks, ejectives, implosives, or ingressive sounds. <strong>Damin</strong> differs sharply from that pattern.</p>
  
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
  
  <p>As Hale and Nash (1997) describe it, Damin's phonology was a deliberate departure from Lardil's, not a segment-by-segment recoding of it: alongside ordinary Australian stops — and the plain Lardil consonants that survive mainly in its grammatical suffixes — it used nasal clicks, a velar ejective <em>k'</em>, a bilabial trill and an ingressive lateral fricative, sounds attested nowhere else on the continent.</p>
  
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
  
  <p>ヘイルとナッシュ（1997年）によれば、ダミン語の音韻は、ラーディル語の音を一つずつ置き換えたものではなく、意図的な逸脱だった。オーストラリアでありふれた破裂音――そして主に文法接辞に残るラーディル語そのままの子音――に加え、ダミン語は鼻音吸着音、軟口蓋放出音 <em>k'</em>、両唇震え音、吸気側面摩擦音を用いた。いずれも大陸の他のどこにも見られない音である。</p>
  
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
        en: 'Click consonants: the sounds that jumped between language families',
        ja: '吸着音：語族の壁を飛び越えた音',
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
    <li><strong>Khoe</strong>: the family that includes Khoekhoegowab (Nama–Damara) of Namibia, Naro and Gǀui of Botswana, and several smaller languages of the Kalahari fringe.</li>
    <li><strong>Tuu</strong>: the southern group that includes <em>Taa (!Xóõ)</em>, the consonant-record holder featured elsewhere in this trivia collection, plus the moribund N|uu of South Africa.</li>
    <li><strong>Kx'a</strong>: a small family containing Juǀ'hoan and ǂHoan, with elaborate click inventories of their own.</li>
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
  
  <p>Sociolinguistically, the clicks <strong>jumped families</strong>. The Bantu languages <strong>Zulu</strong>, <strong>Xhosa</strong>, <strong>Southern Sotho</strong> and <strong>Swati</strong> all have phonemic clicks — three click types in Zulu and Xhosa, a single one in Southern Sotho and Swati — even though the vast majority of Bantu languages have none. (A second, separate cluster of Bantu click languages, among them Yeyi, Fwe and Mbukushu, lies far to the north-west around the Okavango and Zambezi.) The explanation, pieced together by linguists such as <strong>Anthony Traill</strong> and <strong>Rainer Vossen</strong>, runs roughly as follows: as Bantu-speaking farmers spread into what is now South Africa (pioneers had reached the KwaZulu-Natal coast by about 300 CE), they encountered, intermarried with and partly absorbed Khoe and San communities. The bilingual generations who grew up in mixed households brought clicks across the family boundary, especially in respectful and ritual vocabulary. The name <em>isiXhosa</em> carries one itself: straight after the noun-class prefix, the <em>xh</em> is an aspirated lateral click. And it happened early: comparing the Nguni languages, Hilde Gunnink (2022) reconstructs a whole set of clicks for Proto-Nguni, the common ancestor of Zulu and Xhosa, including a palatal click that no living Nguni language still uses as such.</p>

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
  
  <p>社会言語学の面では、吸着音は<strong>語族を飛び越えた</strong>。バントゥー諸語の<strong>ズールー語</strong>、<strong>コサ語</strong>、<strong>南ソト語</strong>、<strong>スワティ語</strong>も吸着音を音素として持つ。ズールー語とコサ語は3種、南ソト語とスワティ語は1種だけだが、バントゥー諸語の大多数には吸着音などまったくないのだから、これは際立っている（なお、これとは別系統のバントゥー系吸着音言語の一群──イェイ語、フウェ語、ムブクシュ語など──が、はるか北西のオカヴァンゴ川・ザンベジ川流域にある）。アンソニー・トレイルやライナー・フォッセンら言語学者が組み立ててきた説明は、おおよそこうだ──バントゥー系農耕民が現在の南アフリカへと広がっていく過程で（先駆けの集団は紀元300年ごろまでにクワズール・ナタール沿岸に達していた）、コエ系・サン系の人々と混血・統合し、混合家庭で育ったバイリンガル世代が、敬語や儀礼語彙を中心に吸着音を持ち込んだのである。民族名 <em>isiXhosa</em> にもそれは残っている──接頭辞のすぐあとの <em>xh</em> が有気の側面吸着音である。しかも、この移入は早い時期に起きていた。ヒルデ・グンニンク（2022）はングニ諸語を比較し、ズールー語とコサ語の共通祖先であるングニ祖語に吸着音のひとそろいを再構している。そこには、現存するどのングニ系言語でももはや本来の形では使われていない硬口蓋吸着音まで含まれる。</p>

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
        en: 'Basque: a language isolate of the western Pyrenees',
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
        en: 'Sumerian: among the earliest languages ever written down',
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
        en: 'Etruscan: the language we can read but can\'t understand',
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
        en: 'Sentinelese: an unrecorded language of North Sentinel Island',
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
    <li><strong>1880年</strong>：イギリス植民地官 <strong>モーリス・V・ポートマン</strong>が探検隊で上陸、高齢の夫婦と子供4人を拘束し、ポート・ブレアに連行した。夫婦はほどなく病に倒れて死亡した。おそらく島民に免疫のない感染症によるものだ。子供たちは贈り物と共に島に返された。捕虜たちから得た語彙は、何ひとつ残っていないようだ。</li>
    <li><strong>1974年</strong>：ナショナル・ジオグラフィックと組んでドキュメンタリー『Man in Search of Man』を撮影していた一行が、生きたブタ、人形、おもちゃの車などの贈り物を浜に置いた。島民は矢で応え、監督が太ももを射抜かれた。射手は木陰に座って笑っていたといい、ほかの者たちはブタと人形を槍で突いて埋め、ココナッツとアルミ鍋は持ち去った。</li>
    <li><strong>1991年</strong>：1月4日、人類学者トリロクナート・パンディット率いるインドの13人の調査団が、ボートからココナッツを海に浮かべて流し、初めて平和的な接触に成功。センチネル族は武器を持たずに海へ入り、ココナッツを拾い集めた。団の人類学者<strong>マドゥマラ・チャットパディヤイ</strong>は自ら海に入ってココナッツを手渡し、外部世界の女性として、知られる限り初めて彼らと対面した。ココナッツを集めながら島民が叫んだ <em>liya</em>、<em>luwa</em> といったいくつかの語は、言語学者M・スリーナタンによって、ジャラワ語の「近い」「遠い」と暫定的に比較されている。訪問は感染症のリスクから1997年に打ち切られた。</li>
    <li><strong>2004年のスマトラ沖津波</strong>：沿岸警備隊のヘリが生存確認に飛んだが、矢で迎え撃たれた。少なくとも、人々が生き延びたことだけはそれでわかった。</li>
    <li><strong>2006年</strong>：近くでカニを密漁していた漁師2人が、夜のうちに即席の錨が外れて島に流れ着き、殺害された。</li>
    <li><strong>2018年</strong>：アメリカ人宣教師<strong>ジョン・アレン・チャウ</strong>が、地元の漁師に金を払って違法に島まで運ばせ、上陸を試みて殺害された。彼のメモには、この言語には「甲高い音がたくさんある」と書かれていた。外部の人間が書き留めた、この言語のごく数少ない印象のひとつである。</li>
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
        en: 'Hebrew: an ancient language brought back to everyday life',
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
  
  <p>He began the gigantic <em>Complete Dictionary of Ancient and Modern Hebrew</em>, 17 volumes in the end, which his widow Hemda, his son Ehud and the scholars they recruited, finally Naftali Herz Tur-Sinai, only completed in 1959, 37 years after his death, and helped found the <strong>Va'ad ha-Lashon ha-Ivrit</strong> (Hebrew Language Committee, 1890), which became today's <strong>Academy of the Hebrew Language</strong> — still the official Israeli body that coins new vocabulary: <em>machshev</em> "computer" (from the root for "think, calculate"), and in 2016 <em>tag hakbatsa</em> for "hashtag".</p>
  
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
        en: 'Pāṇini: formal rules in an ancient Sanskrit grammar',
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
        en: 'Esperanto: from an 1887 booklet to an international community',
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
        en: 'Toki Pona: can you say everything with 120 words?',
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
        en: 'Ithkuil: the conlang so dense its inventor cannot speak it',
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
        en: 'Hangul: the design principles of the Korean alphabet',
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
  
  <p>Hangul's comeback began in the 1890s. In 1894 the Joseon court made it the preferred script for official documents, and the grammarian Ju Si-gyeong and his circle studied it systematically and gave it its modern name, <em>Hangeul</em>, which appears in the early 1910s and can be read as "Korean script" or "great script". Under Japanese colonial rule (1910–1945) Korean language and writing were increasingly suppressed, especially from the late 1930s; in 1942 members of the Korean Language Society were arrested en masse. That same society had founded Hangul Day (한글날) in 1926. Independent South Korea made it a public holiday in 1949, demoted it in 1990 to save working days, and restored the day off in 2013. North Korea calls the script <em>Chosŏn'gŭl</em> and keeps its own holiday on 15 January, apparently marking the 1443 announcement rather than the 1446 publication. Adult literacy in South Korea is now among the highest in the world.</p>
  
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
  
  <p>復権は1890年代に始まった。1894年、朝鮮王朝は公文書にハングルを優先して用いることを定め、文法学者の周時経とその周辺の人々がハングルを体系的に研究し、今の名<em>ハングル</em>を与えた。この名は1910年代初めに現れ、「韓の文字」とも「偉大な文字」とも読める。日本統治期（1910〜1945年）には朝鮮語とその文字は次第に抑圧され、1930年代後半からはそれが一段と強まった。1942年には朝鮮語学会の会員が大量に検挙されている。その朝鮮語学会こそ、1926年に「ハングルの日（한글날）」を始めた団体だった。独立後の韓国は1949年にこれを公休日としたが、1990年に労働日確保のため公休日から外し、2013年に再び休日に戻した。北朝鮮はこの文字を<em>チョソングル</em>と呼び、独自の記念日を1月15日に置いている。1446年の刊行ではなく、1443年の創製の発表を記念したものらしい。今日の韓国の成人識字率は世界でも最高水準にある。</p>
  
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
        en: 'Vai: the West African script that came in a dream',
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
        en: 'Tangut: reconstructing the script of Western Xia',
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
        en: 'Linear A: the script we can read but cannot understand',
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
        en: 'Aymara: the language where the past is in front of you',
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
  
  <p>Other work on Aymara includes Iván Guzmán de Rojas's disputed 1980s proposal that its grammar reflects a <em>three-valued logic</em>, research on its obligatory evidential system, and a growing body of indigenous-language publishing. The front-facing past — the seen past ahead, the unseen future behind the back — is the feature that broke the assumption of a universal time-metaphor.</p>
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
  
  <p>アイマラ語にはほかにも興味深い特徴が多い──1980年代にイバン・グスマン・デ・ロハスらが提唱した「アイマラ文法には三値論理が反映されている」とする説（現在も言語学者の間で議論が続く論争的な主張）、トゥユカ語に似た義務的な証拠性、活発な先住民出版文化。なかでも、見えている過去を前に、見えない未来を背後に置くこの配置こそが、時間のメタファーはどの言語でも同じだという前提を崩した。</p>
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
        en: 'Tuyuca: the language in which you must reveal how you know',
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
    <li><strong>Visual</strong>: the speaker saw the event with their own eyes. Tuyuca: <em>díiga apé-wi</em> "he played soccer (I saw it)".</li>
    <li><strong>Non-visual sensory</strong>: the speaker heard, smelled, or felt the event but did not see it. <em>díiga apé-ti</em> "he played soccer (I heard them)".</li>
    <li><strong>Inferential</strong>: the speaker did not perceive the event but saw physical traces. <em>díiga apé-yi</em> "he played soccer (I see the muddy field)".</li>
    <li><strong>Assumed</strong>: the speaker reasons from general knowledge: e.g. he always plays on Saturdays. <em>díiga apé-hĩyi</em>.</li>
    <li><strong>Reported</strong>: the speaker was told. <em>díiga apé-yigi</em> "he played soccer (so they say)".</li>
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
        en: 'Guugu Yimithirr: an absolute-direction spatial system',
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
  
  <p>The cognitive consequence was documented by Levinson, John Haviland and colleagues at the Max Planck Institute. Speakers of Guugu Yimithirr maintain an unbroken <strong>dead-reckoning</strong> sense of their orientation. In Levinson's tests, Hopevale speakers asked to point at unseen places, some of them hundreds of kilometres away, pointed with remarkable accuracy. Once, after a day-long trek through dense forest to some ancient cave paintings, Levinson, sitting disoriented at the cave mouth, asked his companion Dan to point back to base. Dan did so without hesitation, straight through the hillside, and the compass and maps later showed he was spot on.</p>
  
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
  
  <p>その認知面での帰結を、レヴィンソン、ジョン・ハヴィランドらマックス・プランク研究所のチームが記録している。グーグ・イミディル語話者は常に<strong>推測航法</strong>的に自分の方位を把握し続けている。レヴィンソンの実験で、見えない場所──数百キロ離れたところもある──を指さすよう頼まれたホープヴェールの話者たちは、驚くほど正確に指し示した。あるとき、古代の洞窟壁画を見に、うっそうとした森を丸一日歩いたあと、方向感覚をすっかり失って洞窟の入り口に座り込んだレヴィンソンは、同行していたダンに、拠点の方向を指してくれと頼んだ。ダンはためらいもなく、山肌を突き抜けるようにまっすぐ指さした。後でコンパスと地図で確かめると、まさにぴったりだった。</p>
  
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
        en: 'Mohawk: when one word is a whole sentence',
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
        en: 'Nuxalk: words with no vowels at all',
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
    <li><strong>No syllables at all.</strong> Stanley Newman argued in 1947 that Bella Coola has no syllable structure at all. Nater still defends that view and concluded in 2024 that the language is "essentially non-syllabic."</li>
    <li><strong>Consonants as syllable nuclei.</strong> <strong>James E. Hoard</strong> (1978) argued that even stops and fricatives can serve as the heart of a syllable, so that a word like <em>sps</em> can contain syllables with no vowel at all.</li>
    <li><strong>Syllables, but not everywhere.</strong> In an influential 1991 article Bruce Bagemihl argued that Nuxalk does have syllables, built in the usual way around vowels and sonorants, but that many consonants are left outside any syllable, attached only to units of timing called <strong>moras</strong>.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="blc">💧 See Nuxalk "water" (qla)</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="blc">☀️ See Nuxalk "sun" (snx)</button>
  </div>
  
  <p>Native speakers themselves do not perceive a "missing vowel". They do not feel they are inserting a covert schwa to make the word pronounceable — the descriptive record, from Newman's 1947 phonology to Nater's fieldwork and recordings, finds no hidden vowel slipped in between the consonants. To the speaker, <em>xłp̓x̣ʷłtłpłłskʷc̓</em> is just a word. Speed does change it, though: Hoard noted that <em>łxʷtłcxʷ</em> "you spat on me" has every consonant carrying its own beat in careful speech, squeezed into about three beats when spoken fast.</p>
  
  <p>The implications go far beyond Nuxalk. If a language can build words from pure obstruent strings, then the universal claim that <em>every syllable needs a vowel</em> cannot stand in its strongest form. Phonologists now distinguish more carefully between <strong>sonority</strong> (the acoustic property) and <strong>nucleus-hood</strong> (the structural role), and Nuxalk is the example everyone teaches, alongside Tashlhiyt Berber in Morocco, where Rachid Ridouane's 2008 study used acoustic and imaging data to show that consonant-only syllables have no hidden vowel.</p>
  
  <p>The First Peoples' Cultural Council counts 21 fluent speakers of Nuxalk, 44 semi-speakers and 249 learners, out of a population of 1,762. Nater put the number of native speakers at just three in 2022. The Nuxalk Nation runs immersion programs and a language-house initiative; recordings made by Nater in the 1970s, and more recent documentation supported by the First Peoples' Cultural Council, are racing to document it while its last native speakers remain.</p>
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
    <li><strong>そもそも音節がない。</strong> スタンリー・ニューマンは1947年、ベラクーラ語にはそもそも音節構造がないと論じた。ネイターは今もこの見方を擁護しており、2024年には、この言語は「本質的に非音節的」だと結論している。</li>
    <li><strong>子音が音節核になる。</strong> <strong>ジェイムズ・E・ホード</strong>（1978年）は、破裂音や摩擦音でさえ音節核になりうると論じた。だから <em>sps</em> のような語には、母音がまったくない音節が含まれうる、というのである。</li>
    <li><strong>音節はあるが、どこにでもあるわけではない。</strong> 1991年の影響力ある論文で、ブルース・バゲミールは、ヌハルク語にも母音や鳴音を核としてふつうに組み立てられる音節はあるが、多くの子音はどの音節にも属さず、<strong>モーラ</strong>と呼ばれるタイミングの単位にだけ結びついている、と論じた。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="blc">💧 ヌハルク語の「水」（qla）</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="blc">☀️ ヌハルク語の「太陽」（snx）</button>
  </div>
  
  <p>ヌハルク語の母語話者自身は、「母音が抜けている」感覚を持たない。ニューマンの1947年の音韻記述からネイターの現地調査と録音にいたるまで、記述研究は、子音と子音のあいだにこっそり母音が入り込んでいるとは認めていない。話者にとって <em>xłp̓x̣ʷłtłpłłskʷc̓</em> は「ふつうの一語」だ。ただし速さによって変わることはある。ホードによれば、<em>łxʷtłcxʷ</em>「お前は私に唾を吐いた」は、丁寧に発音すると子音一つ一つが自分の拍を持つが、速く言うと3拍ほどに詰め込まれるという。</p>
  
  <p>影響はヌハルク語にとどまらない。「すべての音節には母音が必要」という普遍仮説は、その最強の形では維持できなくなった。現在の音韻論は<strong>響度（音響的性質）</strong>と<strong>核となる役割（構造的性質）</strong>を慎重に区別する──そのきっかけとなった例こそヌハルク語であり、今では誰もが教える定番の例だ。並んで挙げられるのがモロッコのタシュリヒート・ベルベル語で、ラシード・リドゥアーヌの2008年の研究は、音響データと画像データを用いて、子音だけの音節に隠れた母音がないことを示している。</p>
  
  <p>ブリティッシュコロンビア州先住民族文化評議会の集計では、人口1,762人のうち、流暢な話者は21人、準話者が44人、学習者が249人。ネイターは2022年、母語話者はわずか3人だとしている。ヌハルク・ネイションはイマージョン教育と「言語ハウス」運動を進め、ネイターの1970年代の録音、ブリティッシュコロンビア州先住民族文化評議会の支援による近年の記録活動が、最後の母語話者がいるうちにこの言語を記録しようと急いでいる。</p>
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
        en: 'Hawaiian: 13 sounds and language revitalization',
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
  
  <p>A 2016 State of Hawaiʻi report counted <strong>~18,400 people</strong> speaking Hawaiian at home; by 2024 the Office of Hawaiian Affairs put that figure at <strong>27,338</strong> (Census survey data for 2018–2022), a rise of nearly 50% in under a decade, with about 32,700 people speaking Hawaiian at home across the United States. Outside Niʻihau, where the language was never lost, children are once again growing up with Hawaiian as a first language. The phoneme inventory is still 13; the number of people speaking it is not.</p>
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
  
  <p>2016年のハワイ州報告書では、家庭でハワイ語を話す人は<strong>約18,400人</strong>。2024年のハワイ人問題局（OHA）の報告ではこれが<strong>27,338人</strong>（2018〜2022年の国勢調査局の調査データ）となり、10年足らずで5割近く増えた（家庭でハワイ語を話す人は全米で約32,700人）。言葉が一度も途絶えなかったニイハウ島の外でも、ハワイ語を第一言語として育つ子どもたちが再び現れている。音素は今も13個のまま。だが、それを話す人の数はもう同じではない。</p>
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
        en: 'Nicaraguan Sign Language: change observed across cohorts',
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
    <li>Why should <em>m</em> go with mother? A nursing baby, lips pressed to the breast or bottle and mouth full, can make only one sound: a soft nasal hum, <em>mmm</em>. That hum later becomes a signal of wanting food, then of wanting the person who brings it. Adults hear the babbled <em>mama</em> as addressed to the mother; the stop syllables <em>papa</em>, <em>tata</em>, <em>baba</em> are left for the father.</li>
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
    <li>では、なぜ <em>m</em> が母と結びつくのか。乳房や哺乳瓶に唇を押し当て、口がいっぱいの乳児に出せる音はひとつしかない。鼻にかかった柔らかなハミング、<em>mmm</em> である。このハミングがやがて「食べ物がほしい」という合図になり、さらに「食べ物をくれる人にいてほしい」という合図になる。大人は喃語の <em>mama</em> を母親への呼びかけと受け取り、閉鎖音の音節 <em>papa</em>、<em>tata</em>、<em>baba</em> は父親に回される。</li>
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
        en: 'Proto-Indo-European: reconstruction through regular sound correspondences',
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
  {
    "id": "archi-million-verb-forms",
    "icon": "🏔️",
    "tags": [
      "northeast-caucasian",
      "morphology",
      "dagestan",
      "verb-paradigm",
      "agreement"
    ],
    "title": {
      "en": "Archi: the verb with 1.5 million forms",
      "ja": "150万通りに活用する動詞：アルチ語"
    },
    "summary": {
      "en": "Archi, a Lezgic language of about 1,200 speakers in a Dagestani mountain village, has a verb whose paradigm runs to 1,502,839 forms by Kibrik's count — tense, mood, four gender classes, case and an indirect-speech form all stacked together.",
      "ja": "ダゲスタンの山村で約1200人が話すレズギ語派の言語アルチ語。その動詞はキブリクの計算で1,502,839通りの形を持つ。時制・法・4つの性クラス・格、そして間接話法用の形がすべて積み重なった結果だ。"
    },
    "body": {
      "en": "<p>In the village of <strong>Archib</strong>, high in the mountains of southern Dagestan, roughly 1,200 people — 1,712 at the 2020 Russian census — speak <strong>Archi</strong>, a language of the Lezgic branch of the Northeast Caucasian family. In the 1998 <em>Handbook of Morphology</em>, the Russian linguist <strong>Aleksandr Kibrik</strong> calculated that a single Archi verb root can in principle produce <strong>1,502,839</strong> distinct forms (pp. 466–468).</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"aqc\" data-zoom=\"7\">📍 Show Archi on the map</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"42.18\" data-lng=\"46.73\" data-zoom=\"6\">🏔️ Fly to the Dagestan highlands</button>\n</div>\n\n<p>The figure is not an estimate; it is multiplied up stage by stage, and Greville Corbett reproduced Kibrik's arithmetic in a 2013 paper. Start with the tense/aspect/mood forms. Add the related gerunds, participles and masdars (verbal nouns) and the running total is already <strong>12,405</strong>, some periphrastic combinations included. Fold in the gender and number distinctions and the case-marked forms, and it rises to <strong>188,463</strong>.</p>\n\n<p>The last leap comes from one corner of the grammar. Archi has a <em>commentative</em>, a form used for indirect speech that can be built from every personal form and also from the <em>admirative</em> (the mood of surprise), and the commentative itself carries participles on top of it. Counted with case but without gender and number, the commentative series adds <strong>94,673</strong> forms, for a combined total of <strong>107,078</strong>. Once gender and number are stacked on as well, the commentative forms alone reach <strong>1,314,376</strong>. Added to the 188,463 already counted, the total is <strong>1,502,839</strong>.</p>\n\n<p>Several layers stack to get there. An agreeing Archi verb (about a third of the verbs in the Archi dictionary) marks its argument's <strong>gender class</strong> (one of four) and number. The noun itself carries no gender marking, so the class shows only on agreeing words: verbs, adjectives, pronouns, a few adverbs and one postposition. On top of that sit the tense/aspect/mood choices, the non-finite forms (participle, gerund, masdar), the evidential-like commentative, and the case endings that attach to the deverbal forms. Multiply the independent choices and the paradigm balloons.</p>\n\n<p>Two cautions keep the number honest. It is a combinatorial ceiling — what a single verb could produce in principle — and it counts periphrastic (multi-word) forms alongside single-word ones, so no speaker ever utters anything close to all of them. And Corbett's own point in 2013 was that the headline million is the <em>easy</em> part: the genuinely hard problem sits in the small part of the paradigm that expresses gender and number in their interaction with person, whose shape resists a tidy analysis even though it has only a handful of cells.</p>\n\n<p>Archi had no writing system of its own until the <strong>Surrey Morphology Group</strong> devised a Cyrillic orthography in 2006, based on the alphabet of neighbouring Avar. The same group built an online Archi–Russian–English dictionary with sound files, and in 2016 published <em>Archi: Complexities of Agreement in Cross-Theoretical Perspective</em>. The village that anchors all of this sits at about 2,000 metres, and the four-volume grammar that first recorded the verb — Kibrik and colleagues, 1977 — remains the foundation every later count is built on.</p>",
      "ja": "<p>ダゲスタン南部の山あい、標高およそ2000メートルの<strong>アルチブ村</strong>で、およそ1200人（2020年のロシア国勢調査では1712人）が<strong>アルチ語</strong>を話している。北東コーカサス語族レズギ語派に属する言語だ。1998年刊行の『形態論ハンドブック（The Handbook of Morphology）』で、ロシアの言語学者<strong>アレクサンドル・キブリク</strong>は、アルチ語の動詞語根ひとつから原理上<strong>1,502,839通り</strong>の形が作れると計算してみせた（466〜468頁）。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"aqc\" data-zoom=\"7\">📍 地図でアルチ語を見る</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"42.18\" data-lng=\"46.73\" data-zoom=\"6\">🏔️ ダゲスタンの高地へ飛ぶ</button>\n</div>\n\n<p>この数字は当て推量ではなく、段階を踏んで掛け合わせて得られたものだ。グレヴィル・コーベットは2013年の論文でキブリクの計算を再現している。まず時制・相・法（テンス・アスペクト・ムード）の形がある。これに動名詞・分詞・マスダル（動詞的名詞）を加えると、合計はすでに<strong>12,405</strong>（一部、迂言的な複合形を含む）。さらに性・数の区別と格のついた形を織り込むと<strong>188,463</strong>に跳ね上がる。</p>\n\n<p>最後の飛躍は、文法のある一角から来る。アルチ語には<em>コメンタティブ（commentative）</em>という間接話法用の形があり、あらゆる人称形からも、驚きを表す<em>アドミラティブ（admirative、感嘆法）</em>からも作れる。しかもこのコメンタティブ自体に、さらに分詞が積み重なる。格は数えるが性・数は数えない段階で、コメンタティブの系列が加える形は<strong>94,673</strong>形、先の形と合わせた合計は<strong>107,078</strong>形になる。さらに性・数まで重ねると、コメンタティブの形だけで<strong>1,314,376</strong>形に達する。先の188,463を足して、総計<strong>1,502,839</strong>というわけだ。</p>\n\n<p>この数にたどり着くには、いくつもの層が積み重なる。一致するアルチ語の動詞（アルチ語辞書に載る動詞のおよそ3分の1）は、項の<strong>性クラス</strong>（4つのうちのひとつ）と数を標示する。名詞そのものには性の標識がないため、クラスが表に現れるのは一致する語、つまり動詞・形容詞・代名詞・一部の副詞・ひとつの後置詞の上だけだ。その上に、時制・相・法の選択、非定形（分詞・動名詞・マスダル）、証拠性に近いコメンタティブ、そして動詞派生形につく格語尾が乗る。独立した選択肢を掛け合わせれば、パラダイムはふくれあがる。</p>\n\n<p>ただし、この数字には二つの但し書きがいる。これはあくまで組み合わせ上の上限で、ひとつの動詞が原理上つくりうる形の数にすぎない。しかも一語からなる形だけでなく、迂言的な（複数語からなる）形も数に入れている。実際にこれほどの形を口にする話者はいない。そしてコーベットが2013年に強調したのは、見出しの「150万」はむしろ<em>やさしい</em>部分だということだった。本当に厄介なのは、性と数を人称との絡み合いのなかで表す、パラダイムの小さな一角だ。ごくわずかなセルしか持たないのに、その形はきれいな分析を拒み続けている。</p>\n\n<p>アルチ語には長らく独自の文字がなく、<strong>サリー形態論研究グループ（Surrey Morphology Group）</strong>が2006年に、隣接するアヴァル語の文字をもとにキリル文字の正書法を作った。同グループは音声付きのアルチ語・ロシア語・英語オンライン辞書を構築し、2016年には論集『Archi: Complexities of Agreement in Cross-Theoretical Perspective』を刊行している。すべての起点となった村は標高およそ2000メートルにあり、動詞をはじめて記録した全4巻の文法書（キブリクほか、1977年）は、のちのあらゆる計算がよりどころとする土台であり続けている。</p>"
    },
    "sources": [
      {
        "text": "Corbett, Greville G. (2013). \"The Unique Challenge of the Archi Paradigm.\" Proceedings of the 37th Annual Meeting of the Berkeley Linguistics Society: 52–67.",
        "url": "https://escholarship.org/uc/item/3wz490mf"
      },
      {
        "text": "Kibrik, Aleksandr E. (1998). \"Archi.\" In Andrew Spencer & Arnold M. Zwicky (eds.), The Handbook of Morphology, 455–476 (figure on pp. 466–468). Oxford: Blackwell."
      },
      {
        "text": "Surrey Morphology Group — Archi language project (online Archi–Russian–English dictionary; 2006 Cyrillic orthography).",
        "url": "https://www.smg.surrey.ac.uk/languages/archi/"
      },
      {
        "text": "Bond, Oliver, Corbett, Greville G., Chumakina, Marina & Brown, Dunstan (eds.) (2016). Archi: Complexities of Agreement in Cross-Theoretical Perspective. Oxford University Press.",
        "url": "https://global.oup.com/academic/product/archi-9780198747291"
      }
    ]
  },
  {
    "id": "dyirbal-noun-classes",
    "icon": "🔥",
    "tags": [
      "australia",
      "noun-class",
      "dixon",
      "categorization",
      "endangered"
    ],
    "title": {
      "en": "Dyirbal: women, fire, and dangerous things",
      "ja": "ディルバル語：女・火・危険なもの"
    },
    "summary": {
      "en": "In Dyirbal, one of four noun-class markers precedes every noun. The class that groups women, fire, water and fighting — the one Lakoff named a book after — follows a real logic, not a random one.",
      "ja": "ディルバル語では、四つの名詞クラス標示のひとつがすべての名詞に付く。女性・火・水・戦いを一括りにする——レイコフが著書の題に選んだ——クラスにも、でたらめではない論理がある。"
    },
    "body": {
      "en": "<p>In the rainforest of northeast Queensland, every noun in <strong>Dyirbal</strong> takes one of four small words in front of it — <em>bayi</em>, <em>balan</em>, <em>balam</em> or <em>bala</em> — that sort the whole vocabulary into four classes. R. M. W. Dixon worked the system out in the field and published it in <em>The Dyirbal Language of North Queensland</em> (Cambridge University Press, 1972).</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"-17.6\" data-lng=\"145.8\" data-zoom=\"6\">🌏 Fly to the Queensland rainforest</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"fire\" data-code=\"dbl\">🔥 See Dyirbal \"fire\"</button>\n</div>\n\n<p>Class II, marked by <em>balan</em>, is the one people remember. Its members include women, water, fire and fighting, along with the sun and stars, most birds, fireflies, scorpions, the stinging caterpillar known in local English as the hairy mary grub, and a set of dangerous fish. George Lakoff took the list for the title of his 1987 book <em>Women, Fire, and Dangerous Things</em>, where he used it to argue that human categories are not tidy logical sets.</p>\n\n<p>The list reads as arbitrary. It is not. Dixon showed four plain domains sitting under it: <em>bayi</em> covers human males and most animals, <em>balan</em> covers human females together with water, fire and fighting, <em>balam</em> covers edible non-flesh food — fruit, tubers, honey — and <em>bala</em> is everything left over. By that core rule a woman is <em>balan</em> and a kangaroo is <em>bayi</em>, with no myth required.</p>\n\n<p>The surprising members arrive by a second rule: if a thing is tied by belief to one of the domains, it joins that domain's class even against the basic rule. Birds are animals and should be <em>bayi</em>, but Dyirbal tradition holds that birds are the spirits of dead human women, so most birds are <em>balan</em>. In the mythology the moon and the sun are a married couple — the moon is a man and goes in <em>bayi</em>, the sun is his wife and goes in <em>balan</em>. Fire, water and fighting need no story: in Dixon's account they are part of <em>balan</em>'s core. Lakoff went a step further and guessed that fire is there because it belongs with the sun, and that dangerous things followed fire. He flagged this as an outsider's speculation that Dyirbal speakers had never offered Dixon. The hairy mary grub earns its place the same way: its sting is said to feel like sunburn, which links it to the sun.</p>\n\n<p>A third rule splits a class when a subset carries an important property, usually harmfulness. Fish are animals and generally <em>bayi</em>, but the stonefish and the garfish are dangerous, so they move to <em>balan</em>. The danger is what the grammar marks.</p>\n\n<p>How much of the system the myths really explain is still argued. In a 2007 paper titled \"Women are not dangerous things\", Keith Plaster and Maria Polinsky reworked Dixon's data and argued that a few common semantic features, together with the sound shape of nouns and how often they occur, account for the class assignments without the elaborate chains of myth and association.</p>\n\n<p>The living evidence is thinning. The 2021 Australian census recorded 24 Dyirbal speakers. Annette Schmidt, recording younger speakers in the early 1980s, found the system coming apart in stages. Speakers of a middle generation kept the mythic links: the sun, the stars and birds stayed in <em>balan</em>. But they began to lose the links for fishing and for danger. In the \"Young Dyirbal\" of the youngest speakers only three classes were left: <em>bayi</em> for males and other animates, <em>balan</em> for females and <em>bala</em> for everything else. By then <em>balan</em>, the class that once held women, fire, water, birds, stars and stonefish, had shrunk to its centre: women, and nothing else.</p>",
      "ja": "<p>オーストラリア北東部クイーンズランドの熱帯雨林で話される<strong>ディルバル語（Dyirbal）</strong>では、どの名詞も <em>bayi</em>・<em>balan</em>・<em>balam</em>・<em>bala</em> という四つの小さな語のいずれかを前に伴い、語彙全体が四つの名詞クラスに振り分けられる。この体系を現地調査でまとめ上げたのが言語学者 R・M・W・ディクソンで、『The Dyirbal Language of North Queensland』（ケンブリッジ大学出版局、1972年）として刊行した。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"-17.6\" data-lng=\"145.8\" data-zoom=\"6\">🌏 クイーンズランドの熱帯雨林へ飛ぶ</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"fire\" data-code=\"dbl\">🔥 ディルバル語の「火」</button>\n</div>\n\n<p>人々の記憶に残るのは、<em>balan</em> で標示される第2クラスだ。その成員には、女性・水・火・戦い、そして太陽と星、ほとんどの鳥、ホタル、サソリ、地元の英語で「hairy mary grub」と呼ばれる刺す毛虫、さらに危険な魚の一群が含まれる。ジョージ・レイコフはこのリストから1987年の著書『女・火・危険なもの（Women, Fire, and Dangerous Things）』の題名を取り、人間のカテゴリーがきれいな論理的集合ではないことの例として用いた。</p>\n\n<p>一覧は一見でたらめに映る。だが、そうではない。ディクソンは、その下に四つの素朴な領域が横たわっていることを示した。<em>bayi</em> は人間の男性と大半の動物、<em>balan</em> は人間の女性に加えて水・火・戦い、<em>balam</em> は果実・芋・蜂蜜といった肉以外の食べ物、そして <em>bala</em> は残りすべて、である。この基本規則だけで、女性は <em>balan</em>、カンガルーは <em>bayi</em> になる。神話は要らない。</p>\n\n<p>意外な成員は第二の規則で入ってくる。あるものが信仰によってどれかの領域と結びついていれば、基本規則に反してでもその領域のクラスに加わるのだ。鳥は動物だから本来 <em>bayi</em> のはずだが、ディルバルの伝承では鳥は死んだ女性の霊だとされるため、ほとんどの鳥は <em>balan</em> に入る。神話の中で月と太陽は夫婦であり、月は男なので <em>bayi</em>、太陽はその妻なので <em>balan</em>。火・水・戦いには物語は要らない。ディクソンの記述では、これらはもともと <em>balan</em> の中核に属している。レイコフはさらに一歩踏み込み、火がここにあるのは太陽と同じ領域に属するからで、危険なものは火に引き寄せられて加わったのだろうと推測した。ただし彼自身、これは部外者の憶測にすぎず、ディルバル語の話者がディクソンにそう語ったことはないと断っている。先の刺す毛虫も同じ理屈で居場所を得る。その刺し傷が日焼けのように感じられ、太陽と結びつくからだ。</p>\n\n<p>第三の規則は、ある部分集合が重要な性質——たいていは危険性——を帯びるとき、クラスを分ける。魚は動物でふつう <em>bayi</em> だが、オニダルマオコゼやダツは危険なので <em>balan</em> に移る。文法が標示しているのは、その危険さなのだ。</p>\n\n<p>この体系のどこまでを神話が本当に説明しているのかは、今も議論が続く。2007年、キース・プラスターとマリア・ポリンスキーは「女は危険なものではない（Women are not dangerous things）」と題した論文でディクソンのデータを組み直し、少数のありふれた意味特徴に、名詞の音の形と使用頻度を組み合わせれば、神話と連想の込み入った連鎖を持ち出さなくてもクラスの振り分けを説明できると論じた。</p>\n\n<p>生きた証拠は細りつつある。2021年のオーストラリア国勢調査が記録したディルバル語話者は24人。1980年代初めに若い世代を記録したアネット・シュミットは、体系が段階を追ってほどけていく様子を見いだした。中間の世代の話者は神話によるつながりを保っており、太陽や星や鳥は <em>balan</em> にとどまっていた。だが、漁や危険によるつながりは失われはじめていた。最も若い話者の「若者のディルバル語（Young Dyirbal）」では、クラスは三つしか残っていなかった。男性とその他の有生物の <em>bayi</em>、女性の <em>balan</em>、そして残りすべての <em>bala</em> である。かつて女性・火・水・鳥・星・オニダルマオコゼを抱えていた <em>balan</em> は、このときには中心だけに縮んでいた。女性、ただそれだけに。</p>"
    },
    "sources": [
      {
        "text": "Dixon, R. M. W. (1972). The Dyirbal Language of North Queensland. Cambridge University Press.",
        "url": "https://www.cambridge.org/core/books/dyirbal-language-of-north-queensland/"
      },
      {
        "text": "Lakoff, George (1987). Women, Fire, and Dangerous Things: What Categories Reveal About the Mind. University of Chicago Press (see pp. 92–96 on the Dyirbal classes).",
        "url": "https://press.uchicago.edu/ucp/books/book/chicago/W/bo3684838.html"
      },
      {
        "text": "Plaster, Keith; Polinsky, Maria (2007). \"Women are not dangerous things: Gender and categorization.\" Harvard Working Papers in Linguistics.",
        "url": "https://dash.harvard.edu/bitstream/handle/1/3209556/Women%20are%20not%20dangerous%20things%20-%20Pol,%20M.pdf"
      },
      {
        "text": "Schmidt, Annette (1985). Young People's Dyirbal: An Example of Language Death from Australia. Cambridge University Press. (2021 speaker figure: Australian Bureau of Statistics 2021 Census.)",
        "url": "https://glottolog.org/resource/languoid/id/dyir1250"
      }
    ]
  },
  {
    "id": "nushu-women-script",
    "icon": "🀄",
    "tags": [
      "syllabary",
      "china",
      "women",
      "endangered",
      "writing-system"
    ],
    "title": {
      "en": "Nüshu: the script only women read",
      "ja": "女だけが読んだ文字、女書"
    },
    "summary": {
      "en": "In one county of rural Hunan, women wrote their own syllabic script for a local Chinese dialect. Its last fluent writer died in 2004, and most of what women had written in it had already been burned or buried with them.",
      "ja": "湖南省の一つの県で、女性たちは地元の中国語方言を書くための独自の音節文字を使っていた。最後の書き手は2004年に世を去り、女性たちがこの文字で書いたものの大半は、すでに焼かれるか、持ち主とともに埋葬されていた。"
    },
    "body": {
      "en": "<p>In <strong>Jiangyong County</strong> in southern Hunan, along the Xiao and Yongming rivers, women wrote a script that the men around them did not read. They called it <strong>Nüshu</strong>, \"women's writing.\" It recorded <em>Xiangnan Tuhua</em>, the local Chinese dialect spoken in the district, in a set of about <strong>600 to 700 characters</strong>, each standing for a syllable. Roughly 130 phonetic values cover the language, and a single Nüshu character is used on average for about ten words that sound the same.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"25.27\" data-lng=\"111.34\" data-zoom=\"7\">🗺️ Fly to Jiangyong</button>\n</div>\n\n<p>About half of the characters are Chinese characters, reshaped. In around a hundred of them the square frame of a Chinese character was skewed into a <strong>rhomboid</strong>, sometimes mirrored, with strokes cut down to four basic kinds — dots, horizontals, slanting lines and arcs. Fine, threadlike strokes counted as good penmanship. Unlike the logographic Chinese writing the women could not use, Nüshu is phonetic: it writes the sound of the dialect, not the meaning. It was brushed or embroidered onto fans, handkerchiefs and cloth booklets, written in vertical columns.</p>\n\n<p>Girls learned it from each other, not in school — formal schooling was closed to them. \"Upstairs girls\" picked it up while embroidering and singing together, and the bonds that carried it were female ones: sworn sisters (<em>jiebai</em>) and <em>laotong</em>, paired sworn companions matched for life. The best-known use was the <strong><em>sanzhaoshu</em>, the \"third-day missive\"</strong> — a cloth-bound booklet delivered to a bride on the third day after her wedding, carrying songs of consolation from her mother and sworn sisters, and left mostly blank so she could write her own sorrows into it.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"mother\">👩 See \"mother\" across languages</button>\n</div>\n\n<p>Almost none of this survives from before the twentieth century. By custom, a woman's Nüshu writings were burned or buried with her, so she could read them in the next world; the humid climate destroyed the rest. The first clear outside reference dates only to <strong>1931</strong>, and most manuscripts that exist were written in the 1980s. During the <strong>Cultural Revolution (1966–1976)</strong> the script was treated as occult and suppressed, and texts were destroyed.</p>\n\n<p>It was pulled back into view in the 1980s. <strong>Zhou Shuoyi</strong>, a worker at the Jiangyong county cultural centre, had learned the script in the 1950s and compiled a dictionary of its characters. In <strong>1982</strong> the Wuhan University scholar <strong>Gong Zhebing</strong> brought Nüshu to academic attention; sceptics doubted a writing system used only by the women of one county could be real, and his case was not widely accepted in Beijing until 1985. A museum opened on Puwei Island in Jiangyong in 2002, and China listed Nüshu as national intangible cultural heritage in 2006. <strong>Yang Huanyi</strong>, held to be the last woman who had learned the script in the old way, died on <strong>20 September 2004</strong>, aged 98.</p>\n\n<p>In June 2017, Unicode 10.0 gave Nüshu a block of its own, encoding <strong>396 characters</strong>; a Nüshu iteration mark was added separately, in the Ideographic Symbols and Punctuation block. The women who grew up with it are gone, and the manuscripts that reached scholars are few, so the standardised set now taught to designated \"transmitters\" and fixed in Unicode is a reconstruction drawn from a small, late corpus — how closely it matches what the sworn sisters actually wrote is a question the burned booklets took with them.</p>",
      "ja": "<p>湖南省南部の<strong>江永県</strong>、瀟水と永明河の流れる一帯で、女性たちは周囲の男たちには読めない文字を書いていた。彼女たちはそれを<strong>女書（ニュウシュウ）</strong>、「女の文字」と呼んだ。書き記されたのは地元で話される中国語方言<em>湘南土話</em>で、使われる文字は<strong>およそ600〜700字</strong>、その一つ一つが音節を表す。方言全体はおよそ130の音価でおおわれ、一つの女書の字は、平均して同じ音の約10語に用いられた。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"25.27\" data-lng=\"111.34\" data-zoom=\"7\">🗺️ 江永県へ飛ぶ</button>\n</div>\n\n<p>文字のおよそ半分は、漢字を作りかえたものだ。そのうち百字ほどは、漢字の正方形の枠を<strong>菱形</strong>にゆがめ、ときに左右を反転させ、画も点・横棒・斜め線・弧という四種類ほどに切り詰めてある。糸のように細い線が、美しい筆跡とされた。女性たちが使えなかった表語文字である漢字とは違い、女書は表音文字である。意味ではなく、方言の音を書く。扇や手ぬぐい、布綴じの冊子に、筆で書かれ、あるいは刺繍され、縦の列に連ねられた。</p>\n\n<p>少女たちはこれを学校ではなく互いから学んだ。正式な教育は彼女たちに閉ざされていたからだ。「楼上の娘」たちは刺繍をし歌を歌いながらこれを覚え、その伝承を担ったのは女どうしの絆だった──義姉妹（<em>結拝</em>）や、一生の相手として結ばれた盟友<em>老同</em>である。もっともよく知られた用途が<strong><em>三朝書</em>、「三日目の便り」</strong>だ。婚礼から三日目に花嫁へ届けられる布綴じの冊子で、母や義姉妹からの慰めの歌がしたためられ、多くの頁はあえて空白のまま残された──花嫁が自らの悲しみを書き込めるように。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"mother\">👩 各言語の「母」を見る</button>\n</div>\n\n<p>20世紀より前のものは、ほとんど残っていない。しきたりでは、女性の女書は本人とともに焼かれるか埋められた。あの世でも読めるようにである。残りは湿潤な気候が朽ちさせた。外部からの明確な言及は<strong>1931年</strong>までしかさかのぼれず、現存する写本の多くは1980年代に書かれたものだ。<strong>文化大革命（1966〜1976年）</strong>の間、この文字は迷信・妖術とみなされて抑圧され、文献は破棄された。</p>\n\n<p>再び表舞台に戻されたのは1980年代である。江永県文化館の職員<strong>周碩沂</strong>は1950年代にこの文字を学んでおり、その字を集めた字典を編んだ。<strong>1982年</strong>、武漢大学の研究者<strong>宮哲兵</strong>が女書を学界に紹介した。一つの県の女性だけが使う文字が本物の文字体系でありうるのかと懐疑的な声もあり、彼の主張が北京で広く受け入れられたのは1985年のことだった。2002年には江永の浦尾島に博物館が開かれ、2006年に中国は女書を国家級非物質文化遺産に指定した。古いやり方でこの文字を習得した最後の女性とされる<strong>陽煥宜</strong>は、<strong>2004年9月20日</strong>、98歳で世を去った。</p>\n\n<p>2017年6月、Unicode 10.0は女書に独立したブロックを与え、<strong>396字</strong>を収めた。女書の反復記号はこれとは別に、表意文字記号及び句読点（Ideographic Symbols and Punctuation）ブロックに追加されている。これとともに育った女性たちはもういない。研究者のもとに届いた写本も少ない。したがって、いま「伝承者」に教えられ、Unicodeに固定された標準字形は、小さく、しかも時代の新しい資料から組み立てられた再構成である──それが義姉妹たちの実際に書いたものとどれほど一致するのかは、焼かれた冊子がそのまま持ち去った問いなのだ。</p>"
    },
    "sources": [
      {
        "text": "Nüshu (Wikipedia), character count, structure, Xiangnan Tuhua, sanzhaoshu, Cultural Revolution, Unicode 10.0 (396 syllabograms, U+1B170–U+1B2FF).",
        "url": "https://en.wikipedia.org/wiki/N%C3%BCshu"
      },
      {
        "text": "Yang Huanyi (Wikipedia), last proficient writer, died 20 September 2004, aged 98.",
        "url": "https://en.wikipedia.org/wiki/Yang_Huanyi"
      },
      {
        "text": "China National Body (2007), \"Reply to WG2N3322 – UC Berkeley's comments on Nüshu\" (ISO/IEC JTC1/SC2/WG2 N3337).",
        "url": "https://www.unicode.org/wg2/docs/n3337.pdf"
      },
      {
        "text": "Liying Zhang, The Graduate Institute Geneva (2025), \"Nüshu: the Resistance of Chinese Peasant Women Against Patriarchy?\" — Gong Zhebing's 1982 attention, sworn sisters and laotong.",
        "url": "https://www.graduateinstitute.ch/communications/news/nushu-resistance-chinese-peasant-women-against-patriarchy"
      }
    ]
  },
  {
    "id": "kuskoy-whistled-turkish",
    "icon": "🐦",
    "tags": [
      "whistled",
      "turkish",
      "unesco",
      "neuroscience",
      "register"
    ],
    "title": {
      "en": "Kuşköy bird language: a whistled Turkish of the Black Sea",
      "ja": "クシュキョイの鳥言語：黒海に響く口笛のトルコ語"
    },
    "summary": {
      "en": "In a Black Sea village, Turkish is held across steep valleys by whistling. UNESCO put it on the Urgent Safeguarding list in 2017, and a 2015 study found it engages both brain hemispheres where spoken Turkish favours the left.",
      "ja": "黒海沿岸の村では、急峻な谷をはさんで口笛でトルコ語の会話が交わされる。2017年にユネスコの緊急保護リストに登録され、2015年の研究では、話すトルコ語が左脳優位なのに対し、口笛版は左右の脳をほぼ均等に使うことが示された。"
    },
    "body": {
      "en": "<p>In <strong>Kuşköy</strong> — \"bird village\" — in Giresun Province on Turkey's Black Sea coast, people hold conversations by whistling. The local name is <em>kuş dili</em>, \"bird language\": a whistled register of everyday Turkish used across the steep Pontic valleys, where a neighbour on the opposite slope is within earshot but an hour's walk away. A whistled call carries far better than a shout — several kilometres in the right terrain.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"40.7\" data-lng=\"38.4\" data-zoom=\"6\">🐦 Fly to the Black Sea coast</button>\n</div>\n\n<p>It is not a code or a fixed set of signal-calls. <em>Kuş dili</em> renders the full Turkish vocabulary and grammar: any sentence a person can speak, they can in principle whistle. The compression is severe. Turkish has eight vowels and twenty-one consonants, while a whistle offers only pitch, loudness, and the way the pitch moves. In Julien Meyer's 2007 acoustic study, vowels map onto steady whistle frequencies and consonants onto <em>modulations</em> — rises, falls and brief interruptions of the pitch as the tongue and jaw move. The voice's rich spectrum is reduced to a single narrow band of whistled frequency, and in a non-tonal language like Turkish that pitch follows each vowel's timbre, the formant cues that tell vowels apart in speech.</p>\n\n<p>The comparison with <strong>Silbo Gomero</strong>, the whistled Spanish of La Gomera, is close but not exact. Both take a non-tonal spoken language and recast its vowels and consonants as pitched gestures — there is no lexical tone to copy, so the whistle encodes timbre instead. Their official fates differ. UNESCO placed Silbo on its Representative List in 2009, and it is a compulsory school subject on La Gomera. Whistled Turkish was inscribed in 2017 (element No. 00658) on the List of Intangible Cultural Heritage in Need of Urgent Safeguarding — the list for traditions judged at risk.</p>\n\n<p>The risk is real. Kuşköy has held an annual whistling festival since 1997, where competitors whistle instructions in front of a panel of judges, and the local district began teaching <em>kuş dili</em> in primary school in 2014. But estimates put current whistlers at around 10,000, down from a tradition once spread across the provinces of Trabzon, Rize, Ordu, Artvin and Bayburt. UNESCO names mobile phones as one of the key threats: they remove the reason to learn the whistle, much as emigration, roads and telephones did on La Gomera from the 1950s on.</p>\n\n<p>The two whistles have also handed neuroscience apparently opposite results. In 2005 Manuel Carreiras's team reported in <em>Nature</em> that trained <em>silbadores</em> process Silbo in the same left-hemisphere language areas as spoken Spanish. In 2015 Onur Güntürkün, Monika Güntürkün and Constanze Hahn tested 31 Kuşköy residents with a dichotic-listening task — different syllables (pa, ba, ta, da, ka, ga) played into the two ears at once. For spoken Turkish, listeners reported the right-ear syllable about twice as often as the left-ear one (63.9 against 29.9 identifications on average), the signature of left-hemisphere dominance. For the same syllables whistled, that advantage vanished: the two hemispheres contributed almost equally.</p>\n\n<p>Güntürkün's explanation is that whistling pushes a language's information into pitch and melody, which the right hemisphere handles, so the brain spreads the load. Why whistled Turkish and Silbo point in different directions is unsettled: the studies used different methods — dichotic syllables versus fMRI during comprehension — and different tasks, and the 2015 group planned EEG studies to look more closely at the brain processes. What a village of whistlers has shown so far is that the physical shape of a signal, not only its meaning, helps decide which half of the brain does the work.</p>",
      "ja": "<p>トルコ黒海沿岸、ギレスン県の<strong>クシュキョイ</strong>（「鳥の村」の意）では、人々が口笛で会話を交わす。土地の呼び名は <em>kuş dili</em>（クシュ・ディリ、「鳥言語」）。急峻なポントス山脈の谷をはさんで使われる、日常トルコ語の口笛版だ。向かいの斜面にいる隣人は声は届く距離にいても、歩けば一時間かかる。口笛は叫び声よりはるかに遠くまで届き、地形がよければ数キロメートル先まで通る。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"40.7\" data-lng=\"38.4\" data-zoom=\"6\">🐦 黒海沿岸へ飛ぶ</button>\n</div>\n\n<p>これは暗号でも、決まった合図の寄せ集めでもない。<em>kuş dili</em> はトルコ語の語彙と文法をまるごと写し取る。口に出せる文は、原理的にはすべて口笛で吹ける。ただし圧縮は激しい。トルコ語には母音が8つ、子音が21あるが、口笛にあるのは高さ（ピッチ）と大きさ、そしてピッチの動かし方だけだ。ジュリアン・メイエの2007年の音響研究によれば、母音は一定の口笛周波数に、子音は<em>変調</em>——舌とあごの動きにともなうピッチの上昇・下降・短い途切れ——に対応づけられる。声の豊かなスペクトルは、口笛ではひとすじの狭い周波数帯に絞り込まれる。トルコ語のように声調を持たない言語では、その高さが各母音の音色、つまり話し言葉で母音どうしを聞き分ける手がかりとなるフォルマントを追いかける。</p>\n\n<p>ラ・ゴメラ島の口笛スペイン語<strong>シルボ・ゴメロ</strong>との比較は、近いが完全には重ならない。どちらも声調を持たない言語の母音と子音を、ピッチの身ぶりに置き換える。写し取るべき語の声調がないため、口笛は代わりに音色を符号化する。だが制度上の扱いは異なる。シルボは2009年にユネスコの代表リストに登録され、ラ・ゴメラ島では学校の必修科目になっている。一方、口笛トルコ語が登録されたのは2017年、しかも「緊急に保護する必要がある無形文化遺産のリスト」（登録番号00658）——危機にあると判断された伝統のためのリストだった。</p>\n\n<p>危機は現実のものだ。クシュキョイでは1997年から毎年口笛の祭りが開かれ、出場者は審査員の前で指示を口笛で吹いて競う。地元の郡は2014年から小学校で <em>kuş dili</em> を教え始めた。それでも現在の口笛話者は約1万人と推定され、かつてトラブゾン、リゼ、オルドゥ、アルトヴィン、バイブルトの各県に広がっていた伝統から大きく縮んだ。ユネスコは携帯電話を主要な脅威の一つに挙げている。携帯電話があれば、口笛を覚える理由はなくなる。ラ・ゴメラ島で1950年代以降、移民の流出や道路、電話の普及が同じ役割を果たしたように。</p>\n\n<p>この二つの口笛は、神経科学には一見正反対の結果をもたらしてもいる。2005年、マヌエル・カレイラスらは『Nature』で、熟練した<em>シルバドール</em>がシルボを、話すスペイン語と同じ左脳の言語野で処理すると報告した。2015年、オヌル・ギュントゥルキュン、モニカ・ギュントゥルキュン、コンスタンツェ・ハーンは、クシュキョイの住民31人を両耳分離聴取課題で調べた——左右の耳に別々の音節（pa, ba, ta, da, ka, ga）を同時に流す方法だ。話すトルコ語では、聞き手は右耳の音節を左耳の約2倍の頻度で答えた（平均の同定回数は右耳63.9回、左耳29.9回）。左脳優位のしるしである。ところが同じ音節を口笛にすると、その優位は消え、左右の脳がほぼ均等に働いた。</p>\n\n<p>ギュントゥルキュンの説明はこうだ。口笛は言語の情報をピッチと旋律に押し込む。それを担うのは右脳なので、脳は負荷を分散させる。口笛トルコ語とシルボがなぜ逆向きの結果を指すのかは、まだ決着していない。両研究は手法（両耳分離聴取と、理解中のfMRI）も課題も異なり、2015年のチームは、脳の処理過程をさらに詳しく調べるため、EEGを用いた研究を計画していた。口笛の村がこれまでに示したのは、信号の意味だけでなくその物理的な形もまた、脳のどちら側が仕事をするかの決定に関わっている、ということである。</p>"
    },
    "sources": [
      {
        "text": "UNESCO: Whistled language (Türkiye), inscribed 2017 on the List of Intangible Cultural Heritage in Need of Urgent Safeguarding, element no. 00658.",
        "url": "https://ich.unesco.org/en/USL/whistled-language-00658"
      },
      {
        "text": "Meyer, Julien (2007). \"Whistled Turkish: Statistical Analysis of Vowel Distribution and Consonant Modulations.\" Proceedings of the 16th International Congress of Phonetic Sciences (ICPhS XVI), Saarbrücken.",
        "url": "https://icphs2007.de/conference/Papers/1286/index.html"
      },
      {
        "text": "Güntürkün, Onur; Güntürkün, Monika; Hahn, Constanze (2015). \"Whistled Turkish alters language asymmetries.\" Current Biology 25(16): R706–R708.",
        "url": "https://doi.org/10.1016/j.cub.2015.06.067"
      },
      {
        "text": "Carreiras, Manuel; Lopez, Jorge; Rivero, Francisco; Corina, David (2005). \"Linguistic perception: Neural processing of a whistled language.\" Nature 433(7021): 31–32.",
        "url": "https://doi.org/10.1038/433031a"
      }
    ]
  },
  {
    "id": "ogham-tree-alphabet",
    "icon": "🪨",
    "tags": [
      "writing",
      "celtic",
      "ireland",
      "primitive-irish",
      "ancient"
    ],
    "title": {
      "en": "Ogham: the alphabet carved up the edge of a stone",
      "ja": "石の角に刻む文字、オガム"
    },
    "summary": {
      "en": "Ogham is an early-medieval script of strokes cut across the squared edge of a standing stone, read from the bottom up. Its roughly 380 surviving orthodox inscriptions record Primitive Irish names and lineages from the 4th to 6th centuries.",
      "ja": "直立した石の角に刻まれた線を下から上へ読む、中世初期の文字。現存する約380の正統碑文は、4〜6世紀の原アイルランド語の人名と血統を今に伝える。"
    },
    "body": {
      "en": "<p>Most alphabets want a flat surface. <strong>Ogham</strong> wanted an edge. The letters are groups of one to five straight strokes cut to one side of a line, to the other side, or straight across it — and on an orthodox inscription that line is the squared vertical <strong>arris</strong> (the Irish <em>droim</em>, \"ridge\") of a standing stone. You read from the bottom of the left edge upward, over the top, and down the right for a long text. Damian McManus's 1991 catalogue counts <strong>382</strong> such monuments, carved in <strong>Primitive Irish</strong> between about the 4th and 6th centuries AD.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"52.14\" data-lng=\"-10.27\" data-zoom=\"7\" data-label=\"Corcu Duibne\">🪨 Fly to the Dingle Peninsula</button>\n</div>\n\n<p>The system has <strong>20 letters in four groups of five</strong>, each group (an <em>aicme</em>) named after its first letter: the B-group (<em>aicme beithe</em>), H-group, M-group and A-group. One to five strokes on one side of the stemline give b, l, v/f, s, n; the same strokes on the other side give h, d, t, c, q; strokes cut diagonally across give m, g, ng, z, r; and notches on the line itself are the vowels a, o, u, e, i. The alphabet's own name, <em>beith-luis-nin</em>, is simply its first few letters strung together, the way we say \"ABC\". Five extra signs, the <em>forfeda</em>, were added later, mostly on the page rather than the stone, for 25 in all.</p>\n\n<p>The \"tree alphabet\" tag comes from the names of the letters — <em>beith</em> birch, <em>dair</em> oak, <em>sail</em> willow, <em>coll</em> hazel — glossed as trees and shrubs in the medieval scholars' primer, the <strong>Auraicept na nÉces</strong>, and illustrated on folio 170r of the Book of Ballymote (1390). That botanical layer is a later teaching device; the stone carvers left no trees. Medieval tradition credited the invention to <strong>Ogma</strong>, a god whom the Ogam Tract describes as skilled in speech and poetry, or in a rival story to the Scythian king Fenius Farsa after the fall of Babel.</p>\n\n<p>What the orthodox stones actually record is names and descent. A memorial gives the dead man's name in the genitive, then <em>MAQI</em> / <em>MAQQI</em> (\"of the son\"), then the father; <em>AVI</em> is \"of the grandson\" and <em>MUCOI</em> \"of the sept.\" The Burnham East stone in Co. Kerry (CIIC 175) reads <em>MAQQI-ERCCIA MAQQI MUCOI DOVINIA</em> — (the stone) of Maqqi-Erccia, son of the tribe of Dovinia. The distribution is lopsided: more than 300 stones in Ireland, <strong>121 in Kerry and 81 in Cork</strong> alone — those two Munster counties hold about 60% of the Irish stones — thinning out in an arc across the Irish Sea to some 40 in Wales and about 30 in Scotland.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"name\">📛 See \"name\" across languages</button>\n</div>\n\n<p>Because the inscriptions are short, repetitive, and dated, they are a controlled sample of a language caught just before it changed shape. Primitive Irish still wrote out the full endings that <strong>Old Irish</strong> would swallow between about 500 AD and the mid-6th century, when unstressed final and then internal syllables fell away. The genitive of \"poet\" is <em>velitas</em> on stone and <em>filed</em> in Old Irish; the people called <em>Corcu Duibne</em> appear as <em>Dovinias</em>. A 5th-century Leinster king known in later annals as Mac Caírthinn Uí Enechglaiss stands on his stone as <em>MAQI CAIRATINI AVI INEQAGLAS</em> — four syllables in each name, which Old Irish cut to two in Caírthinn and three in Enechglaiss.</p>\n\n<p>The change is visible mid-corpus. The Ratass church stone in Kerry, placed in the 6th century, reads <em>ANM SILLANN MAQ VATTILLOGG</em> — \"the name of Sílán son of Fáithloga\" — where the old <em>MAQI</em> has already lost its vowel to <em>MAQ</em> and the sentence opens with <em>anm</em>, an Irish word, not a bare genitive. The Ogham in 3D project is laser-scanning the surviving stones one by one, and new ones still turn up in field walls and churchyards, so the count of 382 is a floor, not a total.</p>",
      "ja": "<p>たいていの文字は平らな面を欲しがる。<strong>オガム</strong>が欲しがったのは角だった。文字は1〜5本の直線の組で、一本の基準線の片側、反対側、あるいは線を横切るように刻まれる──そして正統碑文では、その線とは直立した石の垂直な稜（アイルランド語で <em>droim</em>「背」、英語で arris）そのものだ。長文なら左の角の下から上へ、天辺を越え、右の角を下りながら読む。ダミアン・マクマナスの1991年の目録は、こうした石碑を<strong>382基</strong>数える。いずれも紀元後およそ4〜6世紀の<strong>原アイルランド語（Primitive Irish）</strong>で刻まれている。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"52.14\" data-lng=\"-10.27\" data-zoom=\"7\" data-label=\"コルク・ディブネ\">🪨 ディングル半島へ飛ぶ</button>\n</div>\n\n<p>体系は<strong>5文字ずつ4群、計20文字</strong>からなり、各群（<em>aicme</em>）は最初の文字にちなんで呼ばれる──B群（<em>aicme beithe</em>）、H群、M群、A群。基準線の片側に1〜5本で b, l, v/f, s, n、反対側で h, d, t, c, q、線を斜めに横切って m, g, ng, z, r、線上の刻みが母音 a, o, u, e, i。文字体系の名 <em>beith-luis-nin</em> 自体、冒頭の数文字を並べただけで、「ABC」と呼ぶのと同じ発想だ。のちに補助記号 <em>forfeda</em> が5つ加わり（多くは石ではなく写本の上で）、総数25となった。</p>\n\n<p>「樹木文字（tree alphabet）」という呼び名は、文字の名に由来する──<em>beith</em> カバ、<em>dair</em> オーク、<em>sail</em> ヤナギ、<em>coll</em> ハシバミ。これらは中世の学僧向け入門書<strong>『アウラケプト・ナ・ネーケス』（Auraicept na nÉces）</strong>で樹木や灌木として注解され、『バリモート書』（1390年）の葉170表に図解された。この植物の層は後世の学習装置であって、石を刻んだ者は樹木を残していない。中世の伝承は発明を、オガム論が弁舌と詩に長けた者として描く神<strong>オグマ</strong>に、あるいは別伝ではバベルの塔崩壊後のスキタイ王フェニウス・ファルサに帰した。</p>\n\n<p>正統碑文が実際に記録するのは、名と血統である。記念碑は故人の名を属格で掲げ、続いて <em>MAQI</em> / <em>MAQQI</em>（「〜の息子の」）、そして父の名を置く。<em>AVI</em> は「〜の孫の」、<em>MUCOI</em> は「〜の氏族の」だ。ケリー州のバーナム・イースト石碑（CIIC 175）には <em>MAQQI-ERCCIA MAQQI MUCOI DOVINIA</em> と刻まれる。ドヴィニア族の子マッキ・エルキアの（石）、という意味だ。分布は大きく偏る。アイルランドに300基超、うち<strong>ケリー州だけで121基、コーク州で81基</strong>──マンスター地方のこの2州で、アイルランドの石の約6割を占める──そこからアイリッシュ海を越える弧を描いて細り、ウェールズに約40基、スコットランドに約30基が点在する。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"name\">📛 各言語の「名前」を見る</button>\n</div>\n\n<p>碑文は短く、定型的で、年代もおおむね定まる。だからこそ、姿を変える直前の言語をとらえた「管理された標本」になる。原アイルランド語は、<strong>古アイルランド語</strong>が紀元500年頃から6世紀半ばにかけて飲み込んでしまう語尾をまだ書き切っていた──この間に、強勢のない末尾の音節が、続いて語中の音節が脱落する。「詩人」の属格は石の上では <em>velitas</em>、古アイルランド語では <em>filed</em>。<em>Corcu Duibne</em> と呼ばれた民は <em>Dovinias</em> として現れる。後代の年代記で Mac Caírthinn Uí Enechglaiss として知られる5世紀レンスターの王は、その石の上では <em>MAQI CAIRATINI AVI INEQAGLAS</em>──どちらの名も4音節だが、古アイルランド語では Caírthinn が2音節、Enechglaiss が3音節に縮んだ。</p>\n\n<p>その変化は、碑文群の途中で目に見える。6世紀に置かれたケリーのラタス教会石碑は <em>ANM SILLANN MAQ VATTILLOGG</em>──「ファートロガの子シーランの名」──と読め、古い <em>MAQI</em> はすでに母音を失って <em>MAQ</em> となり、文は裸の属格ではなくアイルランド語 <em>anm</em>（名）で始まっている。Ogham in 3D プロジェクトは現存する石碑を一基ずつレーザースキャンし、畑の石垣や教会墓地から新たな石が今も見つかる。382という数は到達点ではなく、下限である。</p>"
    },
    "sources": [
      {
        "text": "McManus, Damian (1991). A Guide to Ogam. Maynooth Monographs 4. An Sagart, Maynooth.",
        "url": ""
      },
      {
        "text": "Wikipedia: Ogham (letter count, aicmí, Auraicept na nÉces, reading order, corpus size)",
        "url": "https://en.wikipedia.org/wiki/Ogham"
      },
      {
        "text": "Wikipedia: Primitive Irish (dates, inscription counts, MAQI/AVI/MUCOI, sound changes, example names)",
        "url": "https://en.wikipedia.org/wiki/Primitive_Irish"
      },
      {
        "text": "Ogham in 3D, Dublin Institute for Advanced Studies — searchable database and 3D models of ogham stones",
        "url": "https://ogham.celt.dias.ie/"
      }
    ]
  },
  {
    "id": "rongorongo-easter-island",
    "icon": "🗿",
    "tags": [
      "undeciphered",
      "rapa-nui",
      "easter-island",
      "script",
      "boustrophedon"
    ],
    "title": {
      "en": "Rongorongo: the talking boards of Rapa Nui no one can read",
      "ja": "読み手を失ったラパ・ヌイの『語る板』、ロンゴロンゴ"
    },
    "summary": {
      "en": "Easter Island left about two dozen wooden objects carved with a glyph script. We know how the lines were read — the reader flipped the board upside-down between them — but not what a single sentence says.",
      "ja": "イースター島は、文字らしき図像を刻んだ木製品を20数点だけ残した。行の読み方──板を一行ごとに上下逆さにひっくり返す──は分かっているのに、一文の意味すら読めない。"
    },
    "body": {
      "en": "<p>On <strong>Rapa Nui (Easter Island)</strong>, a glyph script called <strong>rongorongo</strong> was carved into wood — driftwood, Pacific rosewood, and even imported South African yellowwood and European ash — in rows of figures each about a centimetre tall: birds, fish, crescents, plants, and seated human forms. About <strong>two dozen</strong> inscribed objects survive, carrying 26 texts in the standard count, and only half are in good condition and authentic beyond doubt. None are still on the island. Most are flat tablets, but the set also includes a chief's staff, two <em>reimiro</em> breast ornaments, a birdman (<em>tangata manu</em>) figurine, and a snuffbox cut down from an older tablet. The whole corpus runs to roughly <strong>15,000 glyphs</strong>.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"rap\" data-zoom=\"6\">📍 Show Rapa Nui on the map</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"-27.12\" data-lng=\"-109.36\" data-zoom=\"4\">🗿 Fly to Easter Island</button>\n</div>\n\n<p>The reading direction is settled even though the meaning is not. Rongorongo runs in <strong>reverse boustrophedon</strong>: you start at the bottom-left corner, read the line left to right, and then <strong>rotate the whole tablet 180°</strong> to read the next line, which was carved upside-down relative to the one before. Every second line is inverted, so a reader worked through the board turning it end over end, like winding a wheel.</p>\n\n<p>No European reported the script before the French lay brother <strong>Eugène Eyraud</strong> saw tablets in <strong>1864</strong>. In 1868 Bishop <strong>Tepano Jaussen</strong> received one wound in a cord of human hair and tried to have the texts read, but by then the island's population had collapsed and no one could reliably explain them. That silence fed a theory that rongorongo was invented only after islanders watched Spanish officers write at the 1770 annexation. A February <strong>2024</strong> radiocarbon study led by Silvia Ferrara dated four tablets held in Rome: three to between the late 17th and the 19th centuries, but one to <strong>1493–1509</strong> — more than two centuries before Jacob Roggeveen's ships arrived in 1722. The date is for the wood, not the carving, and the tree, an African yellowwood (<em>Podocarpus</em>), never grew on the island and probably arrived as driftwood, so it narrows rather than closes the question of when the script was made.</p>\n\n<p>The reference catalogue is <strong>Thomas Barthel</strong>'s <em>Grundlagen zur Entzifferung der Osterinselschrift</em> (1958), which lettered the texts A through X and assigned <strong>600 numeric sign codes</strong>; Barthel later argued these reduced to about <strong>120 basic glyphs</strong>. The one passage read with broad agreement is the lunar calendar on the <strong>Mamari tablet (Text C)</strong>, a 29 cm rosewood board. Barthel spotted it in 1958 and Jacques Guy worked it out in 1990: a run of crescent glyphs lists the <strong>nights of the lunar month</strong>, with a full-moon glyph showing the Man in the Moon of Oceanic myth in the middle and small fish turned up or down to mark the waxing and waning halves.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"moon\" data-code=\"rap\">🌙 See \"moon\" across languages</button>\n</div>\n\n<p>Everything beyond the calendar is contested. In <strong>1995 Steven Roger Fischer</strong> announced a decipherment of the Santiago Staff, reading its text as creation chants built on a repeating triad — <em>X copulated with Y; there issued forth Z</em> — with one sign (Barthel's 76), which occurs 564 times on the Staff, read as \"copulate\". Jacques Guy replied in 1998 that the same sign works better as a patronymic marker, which would turn the Staff almost entirely into a list of personal names, and Andrew Robinson (2002) found that at most 63 of the Staff's 113 sequences fully follow the triad. Fischer's reading has not been accepted by the field.</p>\n\n<p>Konstantin and Igor Pozdniakov's 2007 frequency analysis found the script turns on a core of about <strong>52 recurring signs</strong> — close to what a syllabary for the Rapa Nui language would need, though the texts are short and repetitive enough that some researchers doubt they record continuous language at all, as against chant-prompts or a mnemonic device. With no bilingual text, some 15,000 glyphs on texts only half of which are in good condition and beyond doubt, and a living Rapa Nui reading tradition broken in the 1860s, the moon-count on Mamari is still the only stretch of rongorongo anyone can confidently read.</p>",
      "ja": "<p><strong>ラパ・ヌイ（イースター島）</strong>には、<strong>ロンゴロンゴ（rongorongo）</strong>と呼ばれる図像文字が、流木や太平洋ローズウッド、さらには島外から持ち込まれた南アフリカ産イエローウッドやヨーロッパ産トネリコといった木に刻まれて残る。鳥・魚・三日月・植物・座った人影といった、高さ1センチほどの図像が列をなす。文字を刻んだ品は<strong>約20数点</strong>が現存し、標準的な数え方で26のテキストを載せるが、保存状態がよく真正さに疑いがないのはその半数にとどまる。島内にはもう1点も残っていない。大半は平たい板だが、首長の杖、2点の胸飾り（<em>reimiro</em>）、鳥人（<em>tangata manu</em>）の小像、古い板を削り直した嗅ぎタバコ入れも含まれる。コーパス全体でも図像はおよそ<strong>15,000字</strong>にすぎない。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"rap\" data-zoom=\"6\">📍 地図でラパ・ヌイ語を見る</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"-27.12\" data-lng=\"-109.36\" data-zoom=\"4\">🗿 イースター島へ飛ぶ</button>\n</div>\n\n<p>意味は不明でも、読む向きは確定している。ロンゴロンゴは<strong>逆行牛耕式（リバース・ブストロフェドン）</strong>で書かれる。板の左下の隅から始めて左から右へ1行読み、次の行を読むには<strong>板全体を180度回す</strong>。隣り合う行は互いに上下逆に刻まれているため、読み手は板を端から端へひっくり返しながら、車輪を巻くように進んでいった。</p>\n\n<p>1864年にフランス人修道士<strong>ウジェーヌ・エロー</strong>が板を見るまで、ヨーロッパ人の記録にロンゴロンゴは一度も現れない。1868年、司教<strong>テパノ・ジョーサン</strong>は人毛の紐を巻いた板を受け取り、文を読ませようとしたが、その頃には島の人口は激減し、確かに説明できる者はいなかった。この空白から、「文字は1770年のスペインによる併合でスペイン人の署名を見た後に発明された」という説が生まれた。<strong>2024年</strong>2月、シルビア・フェラーラらの放射性炭素年代測定が、ローマに所蔵される4点の板を調べた。3点は17世紀後半から19世紀のあいだだが、1点は<strong>1493〜1509年</strong>──ヤーコプ・ロッヘフェーンの船が訪れた1722年より200年以上前だった。ただし測られたのは木材であって刻んだ時期ではない。しかもその木はアフリカ産のイエローウッド（<em>Podocarpus</em>）で、島に生えたことはなく、おそらく流木として流れ着いたものだ。問いを狭めはしても、閉じはしない。</p>\n\n<p>基準となる目録はトマス・バルテルの『<em>Grundlagen zur Entzifferung der Osterinselschrift</em>（解読の基礎）』（1958年）で、テキストにAからXまでの記号を与え、<strong>600個の図像番号</strong>を割り当てた。バルテルはのちに、それらは約<strong>120の基本字</strong>に還元できると論じた。広い合意を得て読める唯一の箇所は、<strong>ママリ板（テキストC、29センチのローズウッド板）</strong>の月の暦である。バルテルが1958年に気づき、ジャック・ギーが1990年に読み解いた。三日月状の図像の連なりが<strong>月の各夜</strong>を並べ、中央にはオセアニア神話の月の中の人物を描いた満月の図像が置かれ、小さな魚が上向き・下向きになって満ちと欠けの半月ずつを示す。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"moon\" data-code=\"rap\">🌙 各言語の「月」を見る</button>\n</div>\n\n<p>暦の外側はすべて論争の的だ。<strong>1995年、スティーヴン・ロジャー・フィッシャー</strong>はサンティアゴの杖の解読を発表し、その文を「XがYと交わり、Zが生まれた」という定型句を繰り返す創世の詠唱だと読んだ。杖の上に564回現れる1つの記号（バルテル番号76）を「交わる」と読んだのである。ジャック・ギーは1998年、同じ記号はむしろ父称の標識と見た方がよく、そうなると杖はほぼ全体が人名の一覧になると反論した。アンドルー・ロビンソン（2002年）も、杖にある113の連なりのうち、この定型に完全に従うのは多くても63にすぎないと指摘した。フィッシャーの読みは学界に受け入れられていない。</p>\n\n<p>コンスタンチンとイーゴリ・ポズドニャコフの2007年の頻度分析によれば、この文字は約<strong>52の反復する記号</strong>を軸に回っている。ラパ・ヌイ語の音節文字に必要な数に近いが、テキストは短く反復的で、連続した言語を記録したものではなく詠唱の手がかりや記憶補助ではないか、と疑う研究者もいる。対訳テキストはなく、約15,000字を載せるテキストも、保存状態がよく真正さに疑いがないのは半数にすぎず、生きたラパ・ヌイの読誦の伝承は1860年代に断たれた。その中で、ママリ板の月数えだけが、いまも誰もが自信をもって読める唯一のロンゴロンゴの一節であり続けている。</p>"
    },
    "sources": [
      {
        "text": "Ferrara, Silvia; et al. (2024). \"The invention of writing on Rapa Nui (Easter Island). New radiocarbon dates on the Rongorongo script.\" Scientific Reports 14: 2794.",
        "url": "https://doi.org/10.1038/s41598-024-53063-7"
      },
      {
        "text": "Barthel, Thomas S. (1958). Grundlagen zur Entzifferung der Osterinselschrift. Hamburg: Cram, de Gruyter.",
        "url": ""
      },
      {
        "text": "Guy, Jacques B. M. (1990). \"On the Lunar Calendar of Tablet Mamari.\" Journal de la Société des Océanistes 91(2): 135–149.",
        "url": ""
      },
      {
        "text": "Wikipedia: Rongorongo",
        "url": "https://en.wikipedia.org/wiki/Rongorongo"
      }
    ]
  },
  {
    "id": "alphabet-single-origin",
    "icon": "🔤",
    "tags": [
      "writing-system",
      "alphabet",
      "proto-sinaitic",
      "phoenician",
      "history"
    ],
    "title": {
      "en": "The alphabet's single ancestor: from an ox head to A",
      "ja": "アルファベットの祖先は一つ：牛の頭から生まれたA"
    },
    "summary": {
      "en": "Nearly every alphabet in use today traces back to a couple of dozen signs that Semitic speakers in Egypt and the Sinai adapted from Egyptian hieroglyphs early in the second millennium BCE; among them, an ox head became A.",
      "ja": "今日使われているほぼすべてのアルファベットは、紀元前2千年紀の初め、エジプトとシナイ半島のセム語話者がエジプトの聖刻文字をもとに作り出した二十数個の記号にさかのぼる。そのうち、牛の頭がAになった。"
    },
    "body": {
      "en": "<p>The signs scratched into the rock at <strong>Serabit el-Khadim</strong>, a turquoise-mining site in the Sinai with a temple to the Egyptian goddess Hathor, are among the oldest alphabetic writing known. Flinders Petrie recorded them in 1905, and in 1916 Alan Gardiner argued in the <em>Journal of Egyptian Archaeology</em> that they spelled a Semitic language: about two dozen signs, each borrowed from an Egyptian picture but used for a single sound.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"29.04\" data-lng=\"33.46\" data-zoom=\"6\">🌍 Fly to Serabit el-Khadim</button>\n</div>\n\n<p>The device that turned pictures into letters is <strong>acrophony</strong>: a sign takes the first sound of the name of the thing it draws. An ox head is <em>ʾalp</em> \"ox\", so it writes the consonant it begins with; a house plan is <em>bayt</em> \"house\", so it writes <em>b</em>. Rotate the ox head and it is our <strong>A</strong>; the house, by way of Greek <em>beta</em>, is our <strong>B</strong>. The Phoenician, Hebrew and Greek letter-names — aleph, bet, gimel; alpha, beta, gamma — still carry the Canaanite words for ox, house and throwing-stick, long after anyone drew the pictures.</p>\n\n<p>Who invented it, and when, is the open question. In 2006 Orly Goldwasser argued that illiterate Canaanite workers at the Sinai mines, surrounded by hieroglyphs they could not read, took a handful of pictures and assigned them Semitic sounds, inventing the alphabet around the 19th century BCE. The same year Gordon Hamilton published <em>The Origins of the West Semitic Alphabet in Egyptian Scripts</em>, tracing each early letter to a hieroglyphic or hieratic model and placing the invention in the late Twelfth or early Thirteenth Dynasty.</p>\n\n<p>The dating firmed up with a second find. In the 1990s John and Deborah Darnell recorded two short alphabetic inscriptions in the <strong>Wadi el-Hol</strong>, a valley on the desert road north-west of Thebes; they were announced in 1999 and published in 2005. The Theban Desert Road Survey dates them to the reign of Amenemhat III, roughly 1830–1786 BCE, placing alphabetic writing inside Egypt proper in the early second millennium.</p>\n\n<p>From those scratched signs a single line runs forward. The Canaanite letters became the <strong>Phoenician</strong> abjad — 22 consonant signs, with vowels left unwritten — which traders carried around the Mediterranean.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"phn\">🔤 See Phoenician on the map</button>\n</div>\n\n<p>Greek speakers borrowed it around the 8th century BCE and made one decisive change: Phoenician letters for consonants Greek did not use — <em>ʾaleph</em>, <em>he</em>, <em>ʿayin</em> — were spare, so they were turned into vowels, giving <em>alpha, epsilon, omicron</em>. That reworked alphabet became Latin and Cyrillic. The other branch went east: Aramaic, the chancery script of the Persian Empire, is the parent of the Hebrew, Syriac and Arabic scripts, and Arabic reached its form through a Nabataean cursive.</p>\n\n<p>The chain reaches India too, but that link is the shakiest. Britannica treats Aramaic as the probable prototype of Brahmi, the ancestor of most scripts of South and Southeast Asia; a 2023 study by Karan Damodaram Pillai argues that no one has demonstrated a clean letter-by-letter derivation, and that Brahmi may be a hybrid drawing on Aramaic, Phoenician and Greek at once. Either way the Indian line runs back through Aramaic and Phoenician to the same two dozen scratched signs; what is still argued is whether Brahmi took them from one parent script or from several at once.</p>",
      "ja": "<p>エジプトの女神ハトホルを祀る神殿があったシナイのトルコ石採掘地、<strong>セラービト・エル・ハーディム</strong>。その岩に刻まれた記号は、知られているなかで最も古いアルファベット書記の一つである。フリンダーズ・ピートリーが1905年に記録し、1916年にはアラン・ガーディナーが『Journal of Egyptian Archaeology』誌で、これはセム語を綴ったものだと論じた。二十数個の記号は、どれもエジプトの絵文字から借りてきながら、一つの音を表すために使われていた。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"29.04\" data-lng=\"33.46\" data-zoom=\"6\">🌍 セラービト・エル・ハーディムへ飛ぶ</button>\n</div>\n\n<p>絵を文字へと変えた仕掛けが<strong>アクロフォニー（頭音法）</strong>だ。記号は、それが描く物の名前の最初の音を表す。牛の頭は <em>ʾalp</em>（牛）だから、その語頭の子音を表す。家の見取り図は <em>bayt</em>（家）だから <em>b</em> を表す。牛の頭を回転させれば、それが私たちの <strong>A</strong> になり、家はギリシア語の <em>beta</em> を経て <strong>B</strong> になる。フェニキア語・ヘブライ語・ギリシア語の文字名 ― アレフ、ベート、ギメル、アルファ、ベータ、ガンマ ― は、絵を描く者がいなくなって久しい今も、牛・家・投げ棒を指すカナン語をそのまま背負っている。</p>\n\n<p>誰が、いつ発明したのかは、いまだ開かれた問いである。2006年、オルリー・ゴールドワッサーは、読めない聖刻文字に囲まれたシナイ鉱山の無文字のカナン人労働者が、いくつかの絵を選んでセム語の音を割り当て、紀元前19世紀ごろにアルファベットを生み出したと論じた。同じ年、ゴードン・ハミルトンは『The Origins of the West Semitic Alphabet in Egyptian Scripts』を刊行し、初期の各文字を聖刻文字や神官文字の原型までたどったうえで、発明の時期を第12王朝末から第13王朝初頭に置いた。</p>\n\n<p>年代の見当は、第二の発見で固まった。1990年代、ジョンとデボラのダーネル夫妻が、テーベ北西の砂漠の道沿いにある谷<strong>ワディ・エル・ホル</strong>で、二つの短いアルファベット碑文を記録した。1999年に発表され、2005年に刊行されたこの碑文を、テーベ砂漠道調査隊はアメンエムハト3世の治世、おおよそ紀元前1830〜1786年のものとした。アルファベットによる書記が、紀元前2千年紀前半のエジプト本土にまでさかのぼったのである。</p>\n\n<p>この刻まれた記号から、一本の線が前へと伸びていく。カナンの文字は<strong>フェニキア</strong>のアブジャド ― 子音だけ22個、母音は書かれない ― となり、商人たちが地中海一帯に運んだ。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"phn\">🔤 地図でフェニキア語を見る</button>\n</div>\n\n<p>ギリシア人は紀元前8世紀ごろこれを借り受け、決定的な変更を一つ加えた。ギリシア語が使わない子音のための文字 ― <em>ʾaleph</em>、<em>he</em>、<em>ʿayin</em> ― が余ったので、それらを母音に転用し、<em>alpha, epsilon, omicron</em> が生まれた。作り直されたこのアルファベットがラテン文字とキリル文字になった。もう一方の枝は東へ向かう。ペルシア帝国の公文書の文字だったアラム文字が、ヘブライ文字・シリア文字・アラビア文字の親であり、アラビア文字はナバテア人の筆記体を経て今の形に至った。</p>\n\n<p>鎖はインドにも届く。ただしその結び目がいちばん心もとない。ブリタニカはアラム文字を、南アジア・東南アジアの大半の文字の祖であるブラーフミー文字の有力な原型とみなす。だが2023年のカラン・ダモダラム・ピライの研究は、文字ごとのきれいな派生を示せた者は誰もいないとし、ブラーフミー文字はアラム・フェニキア・ギリシアの文字を同時に取り込んだ混成物かもしれないと論じる。いずれにせよ、インドへの系統もアラム文字とフェニキア文字を経て、あの二十数個の刻まれた記号にまでさかのぼる。いまも議論が続いているのは、ブラーフミー文字がそれを一つの親文字から受け継いだのか、それとも複数の文字から同時に取り込んだのかという点である。</p>"
    },
    "sources": [
      {
        "text": "Gardiner, Alan H. (1916). \"The Egyptian Origin of the Semitic Alphabet.\" Journal of Egyptian Archaeology 3: 1–16."
      },
      {
        "text": "Hamilton, Gordon J. (2006). The Origins of the West Semitic Alphabet in Egyptian Scripts. Catholic Biblical Quarterly Monograph Series 40. Catholic Biblical Association of America.",
        "url": "https://mitpressbookstore.mit.edu/book/9780915170395"
      },
      {
        "text": "\"Wadi el-Hol inscriptions\" — discovery, dating (reign of Amenemhat III) and the Darnell et al. 2005 publication.",
        "url": "https://en.wikipedia.org/wiki/Wadi_el-Hol_inscriptions"
      },
      {
        "text": "\"Development and diffusion of alphabets.\" Encyclopædia Britannica.",
        "url": "https://www.britannica.com/topic/alphabet-writing/Development-and-diffusion-of-alphabets"
      },
      {
        "text": "Pillai, Karan Damodaram (2023). On the origin of the Brāhmī script. Indialogs vol. 10, p. 93.",
        "url": "https://ddd.uab.cat/pub/indialogs/indialogs_a2023v10/indialogs_a2023v10p93.pdf"
      }
    ]
  },
  {
    "id": "png-840-languages",
    "icon": "🏝️",
    "tags": [
      "diversity",
      "papua-new-guinea",
      "tok-pisin",
      "language-families",
      "creole"
    ],
    "title": {
      "en": "Papua New Guinea: 840 languages in one country",
      "ja": "パプアニューギニア──一国に840の言語"
    },
    "summary": {
      "en": "Ethnologue counts about 840 living languages in Papua New Guinea — more than a tenth of the world's total — and the reasons lie in deep time, rough terrain, and the absence of any single conquering tongue.",
      "ja": "エスノローグはパプアニューギニアに約840の現用言語を数える。世界の1割以上がこの一国に集まる理由は、5万年の時間、険しい地形、そして島全体を覆う唯一の言語がついに現れなかったことにある。"
    },
    "body": {
      "en": "<p>Ethnologue's 22nd edition (2019) counts <strong>840 living languages</strong> in Papua New Guinea; the current country page lists 839 indigenous languages plus English. Either figure is more than a tenth of the roughly 7,000 languages spoken on Earth, inside a country of about 10 million people. The nearest rivals are far behind: Ethnologue puts Indonesia second with 715 living languages and Nigeria third with 527.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"-6\" data-lng=\"144\" data-zoom=\"5\">🏝️ Fly to the New Guinea highlands</button>\n</div>\n\n<p>Andrew Pawley and Harald Hammarström, writing in 2018, tie the density to time and terrain. New Guinea has been settled for roughly <strong>50,000 years</strong> by people organised into small kin-based groups without overarching political structures, dispersed across rugged mountains and swampy lowlands, and given to quite frequent population movements. No empire, trade league or state religion ever imposed one language across the island, so neighbouring valleys drifted apart and stayed apart.</p>\n\n<p>The result is not one big family but many small ones. Pawley and Hammarström count at least <strong>18 language families</strong> that cannot be shown to be related, plus several isolates. The largest is <strong>Trans–New Guinea</strong>, by some counts the third-largest family in the world by number of languages, though its membership is estimated only loosely at between 300 and 500 languages and its outer boundary is still argued over. Along the coasts and islands sit Austronesian languages, carried in by seafarers thousands of years after the interior was first peopled.</p>\n\n<p>Most of these languages are small. The majority are spoken by fewer than 1,000 people, and many by only a few hundred, usually in a single cluster of villages. A language spoken by 150 people a day's walk from the next valley has no economic pressure to merge with its neighbour, which is part of why so many have survived.</p>\n\n<p>The bridge across all of them is <strong>Tok Pisin</strong>, an English-lexified creole that grew on 19th-century plantations and is now an official language alongside Hiri Motu, English and (since 2015) PNG Sign Language. It has perhaps 130,000 native speakers but several million second-language users; by one estimate at least half the population has a working command of it. A Papua New Guinean may grow up speaking a village language of a few hundred people, pick up Tok Pisin for the market and the road, and meet English only at school.</p>\n\n<p>How the 840 relate to one another is still largely open. Most of New Guinea's Papuan languages are still poorly documented, so the family tree — including the edges of Trans–New Guinea — keeps being redrawn as more are described.</p>",
      "ja": "<p>エスノローグ第22版（2019年）は、パプアニューギニアに<strong>840の現用言語</strong>があると数える。現在の国別ページでは先住言語839に英語を加えた形だ。どちらの数字をとっても、世界で話されるおよそ7,000言語の1割以上が、人口約1,000万人のこの一国に集まっていることになる。2位以下は大きく離れ、エスノローグはインドネシアを715言語で2位、ナイジェリアを527言語で3位に置く。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"-6\" data-lng=\"144\" data-zoom=\"5\">🏝️ ニューギニア高地へ飛ぶ</button>\n</div>\n\n<p>アンドルー・ポーリーとハラルド・ハンマーストレムは2018年の論考で、この密度を「時間」と「地形」に帰している。ニューギニアにはおよそ<strong>5万年</strong>前から人が住み、血縁を軸にした小さな集団が、全体をまとめる政治的な枠組みを持たないまま、険しい山々と湿地の低地に散らばって暮らし、人々の移動もかなり頻繁に起きてきた。帝国も、交易同盟も、国家宗教も、島全体に一つの言語を押しつけることはなかった。だから隣り合う谷の言葉はしだいに離れ、離れたまま固定した。</p>\n\n<p>できあがったのは一つの大きな語族ではなく、多数の小さな語族だった。ポーリーとハンマーストレムは、互いの親縁関係を証明できない語族を少なくとも<strong>18</strong>数え、さらにいくつかの孤立言語を挙げる。最大のものは<strong>トランス・ニューギニア語族</strong>で、言語数では世界で3番目に大きい語族とも言われるが、所属言語は300〜500とおおまかにしか見積もれず、外縁がどこまでかは今も論争が続く。海岸部や島々にはオーストロネシア語族の言語が並ぶ。内陸に人が住みついてから数千年も後に、海を渡ってきた人々がもたらしたものだ。</p>\n\n<p>これらの言語の多くは小さい。大半は話者1,000人未満で、数百人しかいない言語も珍しくなく、たいていは一続きの村々だけで話される。隣の谷まで歩いて一日かかる場所で150人が話す言葉には、隣の言語と融合する経済的な圧力がない。これほど多くが生き残ってきた理由の一つがそこにある。</p>\n\n<p>それらすべてを橋渡しするのが<strong>トク・ピシン</strong>だ。19世紀のプランテーションで育った英語語彙基盤のクレオールで、いまはヒリモツ語・英語、そして（2015年からは）パプアニューギニア手話と並ぶ公用語になっている。母語話者はおそらく13万人ほどだが、第二言語として使う人は数百万人にのぼり、ある推計では人口の少なくとも半数が実用的に使えるという。パプアニューギニアの人は、数百人規模の村の言語を母語に育ち、市場や街道のためにトク・ピシンを覚え、英語には学校で初めて出会う、ということがありうる。</p>\n\n<p>この840の言語が互いにどうつながるのかは、まだ大部分が未解明のままだ。ニューギニアのパプア諸語の大半は、いまも記録が乏しい。だから系統樹は──トランス・ニューギニア語族の縁も含めて──新たな記述が増えるたびに描き直され続けている。</p>"
    },
    "sources": [
      {
        "text": "Ethnologue (SIL International). \"Which countries have the most languages?\" (Ethnologue FAQ).",
        "url": "https://www.ethnologue.com/faq/countries-most-languages"
      },
      {
        "text": "Our World in Data (2025). \"Papua New Guinea has more living languages than any other country\" (drawing on Ethnologue, 22nd ed.).",
        "url": "https://ourworldindata.org/data-insights/papua-new-guinea-has-more-living-languages-than-any-other-country"
      },
      {
        "text": "Pawley, Andrew; Hammarström, Harald (2018). \"The Trans New Guinea family.\" In Bill Palmer (ed.), The Languages and Linguistics of the New Guinea Area: A Comprehensive Guide. Berlin: De Gruyter Mouton, pp. 21–196.",
        "url": "https://doi.org/10.1515/9783110295252-002"
      },
      {
        "text": "APiCS Online — Survey chapter: Tok Pisin (contribution 22). Smith, Geoff P. & Jeff Siegel (2013).",
        "url": "https://apics-online.info/contributions/22"
      }
    ]
  },
  {
    "id": "michif-mixed-language",
    "icon": "🧬",
    "tags": [
      "mixed-language",
      "metis",
      "cree",
      "french",
      "canada"
    ],
    "title": {
      "en": "Michif: French nouns, Cree verbs, two grammars at once",
      "ja": "ミチフ語：名詞はフランス語、動詞はクリー語"
    },
    "summary": {
      "en": "Michif, the language of the Canadian Métis, takes its nouns from French and its verbs from Plains Cree, and each half keeps its own grammar inside the same sentence.",
      "ja": "カナダのメティスが話すミチフ語は、名詞をフランス語から、動詞をクリー語から受け継ぎ、一つの文の中で二つの文法がそのまま並び立つ。言語接触研究の定番例だ。"
    },
    "body": {
      "en": "<p><strong>Michif</strong> is spoken by the Métis of the Canadian Prairies — Manitoba, Saskatchewan and Alberta — and across the border in North Dakota, mostly on the Turtle Mountain Reservation. The 2021 Canadian census counted 1,845 Indigenous people able to speak it, and fluent speakers number fewer than 1,000, most of them elderly; its ISO code is <em>crg</em>. It is a standard example in the study of language contact for one reason: its nouns come from French and its verbs from Plains Cree, and each half keeps its own grammar.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"49.9\" data-lng=\"-97.1\" data-zoom=\"4\">🌍 Fly to the Red River country</button>\n</div>\n\n<p>Take a sentence constructed and glossed by the linguist <strong>Peter Bakker</strong> for his survey of Michif in the Atlas of Pidgin and Creole Language Structures: <em>Namoya, niya mun peer kaapeekiyokeet</em> — \"No, it was my father who came to visit.\" <em>Namoya</em> \"no\" and <em>niya</em> \"I\" are Plains Cree. <em>Mun peer</em> is French <em>mon père</em>, \"my father\", carried in whole with its possessive. The verb <em>kaa-pee-kiyokee-t</em> \"came to visit\" is Cree to the core — the complementizer prefix <em>kaa-</em>, the preverb <em>pee-</em> \"come\" and the third-person suffix <em>-t</em> all follow Cree morphology, which is polysynthetic and marks whether the object is animate or inanimate.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"father\">👨 See \"father\" across languages</button>\n</div>\n\n<p>The division runs along a clean line. From Métis French come the nouns — by one count 83 to 94 percent of them — along with the articles, adjectives, numerals and prepositions. From Plains Cree come the verbs, 88 to 99 percent of them, together with the demonstratives, question words, personal pronouns and postpositions. French noun phrases arrive with the article already fused on: <em>aen meezoñ</em> \"a house\" (from <em>une maison</em>), <em>dilo</em> \"water\" (<em>de l'eau</em>), <em>lom</em> \"man\" (<em>l'homme</em>), <em>li garsoñ</em> \"the boy\", <em>lii kutu</em> \"the knives\". They also keep French grammatical gender: an adjective placed before the noun agrees with it, one placed after it does not.</p>\n\n<p>The two systems do not blend into a simpler average — each stays intact. A Michif speaker runs French nasal vowels and gender agreement inside the noun phrase and Cree polysynthesis in the verb, so a single sentence carries two phonologies and two morphologies. Even a borrowed French verb is forced through the Cree machinery: <em>broder</em> \"to embroider\" survives only as the root <em>brod</em>, wrapped front and back in Cree affixes, as in <em>ni-miyeeht-een ee-li-brod-ii-yaan</em>.</p>\n\n<p>The language took shape in the first decades of the 1800s around the Red River settlement and the buffalo-hunt camps of the northern plains, in Métis households where the fathers spoke French and fur-trade languages and the mothers spoke Cree. In <em>A Language of Our Own</em> (1997) Bakker argued that Michif did not arise from anyone learning a second language imperfectly: its first speakers were already fluent in both French and Cree, and the mixed code served as a badge of a distinct Métis identity. Bakker and Maarten Mous had earlier grouped it with a short list of \"intertwined\" languages, in which the vocabulary of one source sits inside the grammar of another.</p>\n\n<p>How a stable grammar settled on exactly this division — French noun phrase, Cree verb phrase — is not recorded. The Métis who made it left no account of the moment, and Bakker reconstructs the process from the structure itself. With most fluent speakers now elderly, Métis organizations in Manitoba and Saskatchewan run Michif documentation and teaching programs, recording the remaining speakers while the two grammars can still be heard side by side in everyday speech.</p>",
      "ja": "<p><strong>ミチフ語（Michif）</strong>は、カナダ中西部の草原地帯——マニトバ、サスカチュワン、アルバータ——と、国境を越えた米国ノースダコタ州、主にタートルマウンテン居留地に暮らす<strong>メティス</strong>の言語である。2021年カナダ国勢調査では、ミチフ語を話せる先住民は1,845人、流暢な話者は1,000人を下回り、その多くが高齢者だ。ISO コードは <em>crg</em>。言語接触研究で定番の例とされるのには、はっきりした理由がある——名詞はフランス語から、動詞は平原クリー語から来ており、そのそれぞれが自前の文法を保ったままなのだ。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"49.9\" data-lng=\"-97.1\" data-zoom=\"4\">🌍 レッドリバー地方へ飛ぶ</button>\n</div>\n\n<p>言語学者<strong>ピーター・バッカー</strong>が『ピジン・クレオール言語構造地図』（APiCS）のミチフ語の概説のために作例し、グロス（逐語注）を付けた一文を見てみよう。<em>Namoya, niya mun peer kaapeekiyokeet</em>——「いや、訪ねてきたのは私の父だよ」。<em>Namoya</em>「いいえ」も <em>niya</em>「私」も平原クリー語だ。<em>mun peer</em> はフランス語の <em>mon père</em>「私の父」で、所有の表現ごとそっくり取り込まれている。動詞 <em>kaa-pee-kiyokee-t</em>「訪ねてきた」は芯までクリー語だ——補文標識の接頭辞 <em>kaa-</em> も、「来る」を表す前動詞 <em>pee-</em> も、三人称接尾辞 <em>-t</em> も、すべてクリー語の形態法に従う。クリー語の動詞は複統合的で、しかも目的語が有生か無生かを区別する。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"father\">👨 各言語の「父」を見る</button>\n</div>\n\n<p>線引きははっきりしている。メティス・フランス語からは名詞——ある数え方では全体の83〜94%——に加えて、冠詞・形容詞・数詞・前置詞が来る。平原クリー語からは動詞（88〜99%）に加えて、指示詞・疑問詞・人称代名詞・後置詞が来る。フランス語由来の名詞句は、冠詞が溶け込んだ形で入ってくる。<em>aen meezoñ</em>「家」（<em>une maison</em> から）、<em>dilo</em>「水」（<em>de l'eau</em>）、<em>lom</em>「男」（<em>l'homme</em>）、<em>li garsoñ</em>「少年」、<em>lii kutu</em>「ナイフ（複数）」。フランス語の文法性も保たれていて、名詞の前に置かれた形容詞は性に一致するが、後ろに置かれた形容詞は一致しない。</p>\n\n<p>二つの体系は、より単純な平均へと混ざり合うのではなく、それぞれがそのまま残る。ミチフ語の話者は、名詞句の中ではフランス語の鼻母音と性の一致を、動詞ではクリー語の複統合をそれぞれ動かす。つまり一つの文の中に二つの音韻体系と二つの形態法が同居しているのだ。借用されたフランス語の動詞すら、クリー語の仕組みを通される。<em>broder</em>「刺繍する」は語根 <em>brod</em> としてだけ生き残り、前後をクリー語の接辞で包まれる——<em>ni-miyeeht-een ee-li-brod-ii-yaan</em> のように。</p>\n\n<p>この言語がかたちを得たのは1800年代の最初の数十年、レッドリバー植民地と北部平原のバッファロー狩りの野営地のあたりでのことだ。父親はフランス語と毛皮交易の言語を、母親はクリー語を話すメティスの家庭の中で生まれた。バッカーは『A Language of Our Own』（1997年）で、ミチフ語は誰かが第二言語を不完全に習得したことから生まれたのではないと論じた。最初の話者たちはすでにフランス語とクリー語の両方に流暢で、混成の言語は独自のメティス・アイデンティティの標識として機能した——というのだ。バッカーとマールテン・マウスはそれ以前に、ミチフ語を、ある出所の語彙が別の出所の文法の中に収まる「インターワイニング（混織）」言語という短いリストに加えていた。</p>\n\n<p>安定した文法がなぜちょうどこの線——名詞句はフランス語、動詞句はクリー語——で落ち着いたのか、それを記した記録はない。それを作ったメティスの人々は、その瞬間の証言を残さなかった。バッカーは構造そのものから過程を再構成している。流暢な話者の多くが高齢となったいま、マニトバとサスカチュワンのメティス団体はミチフ語の記録と教育の事業を進めており、二つの文法が日々の話し言葉の中でまだ並んで聞こえるうちに、残る話者たちの声を録音している。</p>"
    },
    "sources": [
      {
        "text": "Bakker, Peter (1997). A Language of Our Own: The Genesis of Michif, the Mixed Cree-French Language of the Canadian Métis. Oxford University Press.",
        "url": "https://doi.org/10.1093/oso/9780195097115.001.0001"
      },
      {
        "text": "Bakker, Peter. \"Michif\" (survey chapter). Atlas of Pidgin and Creole Language Structures Online (APiCS), 2013.",
        "url": "https://apics-online.info/contributions/75"
      },
      {
        "text": "Bakker, Peter; Papen, Robert A. (2003). \"Michif and Other Languages of the Canadian Métis.\" Gabriel Dumont Institute / Virtual Museum of Métis History and Culture.",
        "url": "https://www.metismuseum.ca/resource.php/00735"
      },
      {
        "text": "Glottolog: Michif (mich1243)",
        "url": "https://glottolog.org/resource/languoid/id/mich1243"
      }
    ]
  },
  {
    "id": "kusunda-isolate-nepal",
    "icon": "⛰️",
    "tags": [
      "isolate",
      "nepal",
      "endangered",
      "revitalization",
      "negation"
    ],
    "title": {
      "en": "Kusunda: the Nepali isolate being woken, not revived",
      "ja": "クスンダ語：蘇生ではなく「目覚め」を待つネパールの孤立言語"
    },
    "summary": {
      "en": "Kusunda, a language isolate in western Nepal with no proven relatives, is down to one fluent speaker — and is being taught from scratch to learners who never grew up hearing it.",
      "ja": "親縁関係の証明されない孤立言語、ネパール西部のクスンダ語。流暢な話者はただ一人になり、いまは一度も耳にして育たなかった若者たちへ、ゼロから教えられている。"
    },
    "body": {
      "en": "<p>In the hills of western Nepal, a few dozen people have some command of <strong>Kusunda</strong>, a language isolate with no demonstrated relatives anywhere. Nepal's 2021 census counted 253 ethnic Kusunda and 23 self-reported native speakers; the one person able to sustain a conversation in it is <strong>Kamala Sen Khatri</strong>, whose elder sister held that position before her.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"kgg\" data-zoom=\"6\">📍 Show Kusunda on the map</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"28.1\" data-lng=\"82.4\" data-zoom=\"7\">⛰️ Fly to western Nepal</button>\n</div>\n\n<p>The Kusunda were forest foragers, called <em>Ban Raja</em> (\"kings of the forest\") in Nepali; their own name for themselves is recorded variously as Mihaq, Myahq or Gemyehak. The language was twice presumed dead. After settlement and intermarriage scattered the community, it resurfaced in 2004, when three Kusunda who had travelled to Kathmandu for citizenship papers turned out to include a fluent speaker from Sakhi, in Rolpa district. By 2005 seven or eight fluent speakers were known, the youngest in her thirties. Rajamama Kusunda died on 19 April 2018, and the language was again presumed extinct, although the sisters Gyani Maiya and Kamala were still alive and fluent; <strong>Gyani Maiya Sen Kusunda</strong>, who had helped relaunch interest in it, died on 25 January 2020 at 85.</p>\n\n<p>Its isolation has drawn a long list of rejected matches. B. K. Rana argued in 2002 that Kusunda was Tibeto-Burman, like most of its neighbours; Watters's 2005–2006 grammatical description concluded it is none of them. Others have tried to attach it to Nihali (Whitehouse 1997), to the Yeniseian languages of central Siberia (Gurov 1989), to Burushaski and the Caucasian families (Reinhard and Toba 1970), and — in a 2014 proposal by George van Driem — to Yeniseian and Burushaski together. None of these has been demonstrated.</p>\n\n<p>Part of why is that Kusunda does not sound or work like what surrounds it. It has <strong>uvular consonants</strong>, which no other language in the region uses, and it lacks the retroflex consonants that are everywhere in South Asia. Its case system is nominative–accusative with no ergativity, again unlike its Tibeto-Burman neighbours. In a 2014 reanalysis, Mark Donohue, Bhoj Raj Gautam and Madhav Pokharel found that ordinary declarative clauses have <em>no unambiguous way to mark negation</em>: the irrealis suffix <em>-u</em> can carry either a positive or a negative reading, and speakers lean on a separate negative existential to say that something is not so.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"water\" data-code=\"kgg\">💧 See \"water\" across languages</button>\n</div>\n\n<p>Since 2019 the researcher <strong>Uday Raj Aaley</strong> has run Kusunda classes with Kamala Sen Khatri as resource person and support from Nepal's Language Commission. Four residential sessions — 2019, 2021, 2022 and a final one in March 2023 — came to about 270 hours of teaching; the first drew 20 students in grades four to twelve, three of them not Kusunda at all. Aaley and Timotheus Bodt call the work an <em>awakening</em>: the language had been essentially dormant for 50 to 60 years, and with no living speech community to join, every learner starts from zero.</p>\n\n<p>The obstacles are concrete. There is no settled orthography — the uvular sounds are hard to render in Devanagari — and no textbook, audio or video teaching materials; Aaley is still writing a first book of everyday words and phrases. Everyone in the community now speaks Nepali, and intermarriage means no child is acquiring Kusunda at home. Whether a language learned deliberately, as a heritage subject, can be carried to a generation that speaks it without thinking is the question the classrooms in Dang are now testing.</p>",
      "ja": "<p>ネパール西部の丘陵地で、数十人が<strong>クスンダ語（Kusunda）</strong>をいくらか解する。親縁関係がどこにも証明されていない孤立言語である。2021年のネパール国勢調査では、民族としてのクスンダは253人、母語話者と自己申告したのは23人だった。会話を続けられる唯一の人物は<strong>カマラ・セン・カトリ</strong>で、その役割を前に担っていたのは彼女の姉だった。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"kgg\" data-zoom=\"6\">📍 地図でクスンダ語を見る</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"28.1\" data-lng=\"82.4\" data-zoom=\"7\">⛰️ ネパール西部へ飛ぶ</button>\n</div>\n\n<p>クスンダの人々はかつて森の狩猟採集民で、ネパール語では<em>バン・ラジャ</em>（「森の王」）と呼ばれた。自称はミハク（Mihaq）、ミャハ（Myahq）、ゲミェハク（Gemyehak）などと一定しない。言語は二度、死んだものと見なされた。定住化と他民族との婚姻で共同体が散らばったあと、2004年に再発見される。市民権の書類のためカトマンズを訪れた三人のクスンダの中に、ロルパ郡サキ出身の流暢な話者がいたのだ。2005年の時点では、7〜8人の流暢な話者が知られていた。最も若い人で30代だった。2018年4月19日にラジャママ・クスンダが亡くなると、言語は再び絶滅とされた——実際には、ギャニ・マヤとカマラの姉妹がまだ存命で、流暢に話せたのだが。関心の再燃に力を貸した<strong>ギャニ・マヤ・セン・クスンダ</strong>も、2020年1月25日に85歳で世を去った。</p>\n\n<p>孤立しているため、系統づけの試みは却下の連続だった。B・K・ラナは2002年、クスンダ語は周囲の多くと同じくチベット・ビルマ系だと論じたが、ワッターズの2005〜2006年の文法記述は、そのいずれでもないと結論づけた。ほかにもニハリ語（ホワイトハウス1997年）、中央シベリアのエニセイ諸語（グーロフ1989年）、ブルシャスキー語やカフカース諸語（ラインハルト＆トバ1970年）、さらに2014年のジョージ・ヴァン・ドリームの提案ではエニセイ語とブルシャスキー語の両方と結びつけられた。どれも証明されていない。</p>\n\n<p>その一因は、クスンダ語が周囲とは響きも仕組みも違うことにある。この地域のどの言語も使わない<strong>口蓋垂音（uvular）</strong>を持ち、南アジアに遍在するそり舌音は欠く。格体系は能格性のない主格・対格型で、これもチベット・ビルマ系の隣人とは異なる。2014年にマーク・ドナヒュー、ボジ・ラジ・ガウタム、マダブ・ポカレルが行った再分析によれば、普通の平叙文には<em>否定を明示する手段がない</em>という。非現実法の接尾辞 <em>-u</em> は肯定にも否定にも読めてしまい、話者は「そうではない」と言うために別の否定存在表現に頼る。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"water\" data-code=\"kgg\">💧 各言語の「水」を見る</button>\n</div>\n\n<p>2019年以来、研究者の<strong>ウダイ・ラジ・アーレイ</strong>が、カマラ・セン・カトリを資料提供者とし、ネパール言語委員会の支援を受けてクスンダ語教室を開いてきた。2019年、2021年、2022年、そして2023年3月に締めくくられた合宿形式の全4回は、合わせて約270時間の授業になった。最初の回には4年生から12年生まで20人が集まり、うち3人はクスンダですらなかった。アーレイとティモテウス・ボットは、この営みを<em>目覚めさせること</em>と呼ぶ。言語は50〜60年にわたって事実上眠っていたうえ、加わるべき生きた話者共同体ももう存在せず、学ぶ者は誰もがゼロから始めるからだ。</p>\n\n<p>障害は具体的だ。正書法が定まっていない——口蓋垂音をデーヴァナーガリーで書き表しにくい——し、教科書も音声・映像の教材もない。アーレイは日常の単語や言い回しをまとめた最初の本を、いまも執筆中だ。共同体の全員がいまやネパール語を話し、他民族との結婚により、家庭でクスンダ語を身につける子どもは一人もいない。意識的に、継承語という「科目」として学ばれた言語が、考えずに話す世代へと手渡せるのか。ダンの教室が、いま試しているのはその問いである。</p>"
    },
    "sources": [
      {
        "text": "Aaley, Uday Raj & Bodt, Timotheus A. (2023). Living Languages / Lenguas Vivas / Línguas Vivas 2(1), University of Massachusetts Amherst — documentation and awakening of Kusunda.",
        "url": "https://openpublishing.library.umass.edu/livinglanguages/article/id/1859"
      },
      {
        "text": "Watters, David E. (2006). \"Notes on Kusunda Grammar: A Language Isolate of Nepal.\" Himalayan Linguistics Archive 3.",
        "url": "https://escholarship.org/uc/item/83v8d1wv"
      },
      {
        "text": "\"What does it take to revitalize a dying language?\" Global Voices, 3 April 2023.",
        "url": "https://globalvoices.org/2023/04/03/what-does-it-take-to-revitalize-a-dying-language/"
      },
      {
        "text": "\"Kusunda language\" and \"Kusunda people\", Wikipedia (2021 census figures, classification history, phonology, and the Donohue, Gautam & Pokharel 2014 reanalysis of negation).",
        "url": "https://en.wikipedia.org/wiki/Kusunda_language"
      }
    ]
  },
  {
    "id": "yeli-dnye-rossel-island",
    "icon": "🐚",
    "tags": [
      "phonology",
      "double-articulation",
      "papua-new-guinea",
      "language-isolate"
    ],
    "title": {
      "en": "Yélî Dnye: 90 phonemes on one island off New Guinea",
      "ja": "イェリ・ドニェ語：ニューギニア沖の島の90音素"
    },
    "summary": {
      "en": "About 5,000 people on Rossel Island, Papua New Guinea, speak Yélî Dnye, a language isolate with 56 consonants and 34 vowels. Among them are stops made with the lips and the front of the tongue at the same moment, which no other language is known to use systematically.",
      "ja": "パプアニューギニアのロッセル島で約5,000人が話すイェリ・ドニェ語は、どの語族にも属さない孤立言語で、子音56・母音34を持つ。その中には、唇と舌の前部で同時に口を閉じる閉鎖音があり、これを体系的に使う言語はほかに知られていない。"
    },
    "body": {
      "en": "<p><strong>Rossel Island</strong> (Yela) is the easternmost island of the Louisiade Archipelago, about 450 km off the mainland of Papua New Guinea and roughly 35 km by 10 km in size. Its 5,000 or so inhabitants all speak <strong>Yélî Dnye</strong> (ISO <em>yle</em>; also spelled Yele or Yeletnye). The language has no demonstrated relative. Malcolm Ross has tentatively grouped it with Anêm of New Britain, while Stephen Levinson's 2022 grammar treats it as an isolate. The Austronesian languages around it have left traces through contact, but no shared ancestry has been shown.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"yle\">🔍 Open Yélî Dnye</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"rain\" data-code=\"yle\">💬 \"Rain\" in Yélî Dnye (tp)</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"sleep\" data-code=\"yle\">💬 \"Sleep\" in Yélî Dnye (dp)</button>\n</div>\n\n<h3>56 consonants, 34 vowels</h3>\n\n<p>Levinson counts <strong>90 distinctive segments</strong>: 56 consonants and 34 vowels. It is not a world record: Taa (ǃXóõ) in Botswana and Namibia has more consonants. The inventory goes back to the missionary linguist <strong>James Henderson</strong>, whose <em>Phonology and Grammar of Yele</em> (Pacific Linguistics, 1995) was the fullest description before Levinson's. Levinson adopted it with minor changes and checked it phonetically with Ian Maddieson.</p>\n\n<p>The vowels come from a simple multiplication. There are ten oral vowel qualities (<em>i, ɯ, u, e, ə, o, ɛ, ɔ, æ, ɑ</em>), and seven of them also have a nasal counterpart. Each of those 17 vowels can be short or long, which gives 34. The practical orthography writes a long vowel double and marks a nasal vowel with a colon before it: <em>w:ââ</em> \"dog\" has a long nasal [ɑ̃ː].</p>\n\n<h3>Lips and front of the tongue together</h3>\n\n<p>A doubly articulated stop closes the mouth in two places at once. The usual kind is <strong>labial-velar</strong>, as in the <em>gb</em> and <em>kp</em> of Yoruba or Ewe in West Africa, and Yélî Dnye has these too (<em>kp</em>, <em>ngm</em>). It also has two more series in which the lips close together with the front of the tongue: <strong>labial-dental</strong> (written <em>tp</em>, <em>ńm</em>) and <strong>labial-postalveolar</strong> (written <em>dp</em>, <em>nm</em>). The spelling always puts the labial second. Ladefoged and Maddieson's <em>The Sounds of the World's Languages</em> (1996), which call the labial-dental series labial-alveolar, set out three-way contrasts at these places: /t̪͡pənə/ \"lung\", /ʈ͡pənə/ \"horn\", /k͡pene/ \"coconut bag\", and among the nasals /n̪͡mo/ \"bird\", /ɳ͡mo/ \"we\", /ŋ͡mo/ \"breast\".</p>\n\n<p>Similar sounds have been reported elsewhere. In Chadic languages such as Margi in Nigeria, closer study found sequences like /tp/ and /db/ rather than single consonants. Some Setswana dialects have labial-postalveolar sounds, but whether they are truly doubly articulated is disputed. No other language is known to have systematic labial-coronal double articulations, let alone at two coronal places.</p>\n\n<h3>Nasals before, nasals after</h3>\n\n<p>The consonant count keeps rising because each place of articulation comes in several versions. There are plain stops, prenasalized stops, nasally released stops in which the nasal follows the closure (<em>dny</em>, as in the language's own name), and palatalized and labialized forms of many of these. The two kinds of nasal stop even combine with double articulation: Ladefoged and Maddieson list /ŋ͡mɡ͡bo/ \"fog\" and /ɳ͡mɖ͡boo/ \"many\".</p>\n\n<p>On the map, <em>tpii</em> \"rain\" begins with the labial-dental stop and <em>dpî</em> \"sleep\" with the labial-postalveolar one. The words for \"bird\" (<em>ńmê</em>, also <em>ńmo</em>), \"we\" (<em>nmo</em>) and \"milk\" (<em>ngmo</em>, the same word as \"breast\") give the three double nasals side by side.</p>",
      "ja": "<p><strong>ロッセル島</strong>（現地名ヤラ）は、パプアニューギニア本土から約450 km沖にあるルイジアード諸島の最東端の島で、大きさはおよそ35 km×10 km。約5,000人の島民はみな<strong>イェリ・ドニェ語</strong>（Yélî Dnye、ISO <em>yle</em>。Yele、Yeletnye とも表記）を話す。系統関係が証明された言語は一つもない。マルコム・ロスはニューブリテン島のアネム語と結びつける仮説を出しているが、スティーヴン・レヴィンソンの2022年の文法書は孤立言語として扱っている。周囲のオーストロネシア系言語は接触による痕跡を残しているが、共通の祖先は示されていない。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"yle\">🔍 イェリ・ドニェ語を開く</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"rain\" data-code=\"yle\">💬 イェリ・ドニェ語の「雨」（tp）</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"sleep\" data-code=\"yle\">💬 イェリ・ドニェ語の「眠る」（dp）</button>\n</div>\n\n<h3>子音56、母音34</h3>\n\n<p>レヴィンソンの数えでは、弁別的な分節音は<strong>90</strong>。内訳は子音56、母音34だ。ただし世界一ではない。ボツワナとナミビアのター語（ǃXóõ）は子音だけでこれより多い。この音素目録の土台は、宣教師で言語学者の<strong>ジェイムズ・ヘンダーソン</strong>が『Phonology and Grammar of Yele』（Pacific Linguistics、1995年）で示したもので、レヴィンソン以前ではもっとも詳しい記述だった。レヴィンソンはこれを小さな修正を加えて引き継ぎ、イアン・マディソンと共同で音声学的に検証している。</p>\n\n<p>母音の数は単純な掛け算で出てくる。口母音が10種類（<em>i, ɯ, u, e, ə, o, ɛ, ɔ, æ, ɑ</em>）あり、そのうち7つには鼻母音の対がある。この17の母音それぞれに短と長の区別があるので、合わせて34になる。実用正書法では長母音を2文字重ねて書き、鼻母音は直前にコロンを置いて示す。たとえば <em>w:ââ</em>「犬」の母音は長い鼻母音 [ɑ̃ː] だ。</p>\n\n<h3>唇と舌の前部で同時に閉じる</h3>\n\n<p>二重調音の閉鎖音とは、口の中の二か所を同時に閉じて出す音である。よくあるのは<strong>両唇軟口蓋音</strong>で、西アフリカのヨルバ語やエウェ語の <em>gb</em>・<em>kp</em> がそれにあたる。イェリ・ドニェ語にもこれはある（<em>kp</em>、<em>ngm</em>）。そのうえ、唇と舌の前部を同時に閉じる系列がさらに二つある。<strong>両唇・歯音</strong>（綴りは <em>tp</em>、<em>ńm</em>）と<strong>両唇・後部歯茎音</strong>（綴りは <em>dp</em>、<em>nm</em>）だ。綴りでは常に唇の音を後ろに書く。ラディフォギッドとマディソンの『The Sounds of the World's Languages』（1996年）は、両唇・歯音の系列を両唇・歯茎音と呼び、三つの位置での対立を並べている。/t̪͡pənə/「肺」、/ʈ͡pənə/「角」、/k͡pene/「ココナツの袋」。鼻音では /n̪͡mo/「鳥」、/ɳ͡mo/「私たち」、/ŋ͡mo/「乳房」となる。</p>\n\n<p>似た音の報告はほかにもある。ナイジェリアのマルギ語などチャド諸語では、詳しく調べると一つの子音ではなく /tp/ や /db/ のような連続だとわかった。セツワナ語の一部の方言には両唇・後部歯茎音があるが、本当に二重調音なのかは議論が分かれている。唇と舌の前部による二重調音を体系的に持つ言語は、しかも二つの位置で持つ言語は、ほかに知られていない。</p>\n\n<h3>前にも後ろにも鼻音</h3>\n\n<p>子音の数がここまで増えるのは、一つの調音位置に何通りもの変種があるからだ。普通の閉鎖音のほかに、鼻音が先に来る前鼻音化閉鎖音、閉鎖のあとに鼻音が続く鼻腔開放の閉鎖音（言語名にも入っている <em>dny</em>）があり、その多くにさらに口蓋化形と円唇化形がある。鼻音の要素は二重調音とも組み合わさる。ラディフォギッドとマディソンは /ŋ͡mɡ͡bo/「霧」、/ɳ͡mɖ͡boo/「たくさん」を挙げている。</p>\n\n<p>地図では、<em>tpii</em>「雨」が両唇・歯の閉鎖音で、<em>dpî</em>「眠る」が両唇・後部歯茎の閉鎖音で始まる。「鳥」の <em>ńmê</em>（<em>ńmo</em> とも）、「私たち」の <em>nmo</em>、「乳」の <em>ngmo</em>（「乳房」と同じ語）を見比べれば、三種類の二重鼻音が並ぶ。</p>"
    },
    "sources": [
      {
        "text": "Levinson, Stephen C. (2022). A Grammar of Yélî Dnye: The Papuan Language of Rossel Island. Pacific Linguistics 666. De Gruyter Mouton (open access).",
        "url": "https://doi.org/10.1515/9783110733853"
      },
      {
        "text": "Levinson, Stephen C.; Majid, Asifa (2013). \"The Island of Time: Yélî Dnye, the Language of Rossel Island.\" Frontiers in Psychology 4: 61.",
        "url": "https://doi.org/10.3389/fpsyg.2013.00061"
      },
      {
        "text": "Henderson, James (1995). Phonology and Grammar of Yele, Papua New Guinea. Pacific Linguistics B-112. Canberra: Australian National University.",
        "url": "https://glottolog.org/resource/reference/id/16589"
      },
      {
        "text": "Ladefoged, Peter; Maddieson, Ian (1996). The Sounds of the World's Languages. Oxford: Blackwell (Yélî Dnye labial-coronals, p. 344; link is Wikipedia's summary citing this page).",
        "url": "https://en.wikipedia.org/wiki/Labial%E2%80%93coronal_consonant"
      }
    ]
  },
  {
    "id": "kayardild-case-stacking",
    "icon": "🦀",
    "tags": [
      "case",
      "morphology",
      "australia",
      "tangkic",
      "endangered-languages"
    ],
    "title": {
      "en": "Kayardild: four case endings on one noun, and tense on nouns",
      "ja": "カヤルディルド語：一つの名詞に格が四つ、名詞に時制も"
    },
    "summary": {
      "en": "Kayardild, the language of Bentinck Island in Queensland's Gulf of Carpentaria, lets a single noun carry up to four case suffixes, and marks the tense of the clause on its nouns as well as its verb.",
      "ja": "クイーンズランド州カーペンタリア湾のベンティンク島の言語カヤルディルド語では、一つの名詞に格接尾辞が最大四つまで重なり、文の時制は動詞だけでなく名詞にも付く。"
    },
    "body": {
      "en": "<p><strong>Kayardild</strong> was spoken on the South Wellesley Islands in the Gulf of Carpentaria: Bentinck Island, Sweers Island and a few smaller islands off the Queensland coast. It belongs to the small <strong>Tangkic</strong> family. The family also includes Lardil on neighbouring Mornington Island, Yukulta (Ganggalida) on the mainland coast, and Yangkaal, which Nicholas Evans treats as close enough to count as a Kayardild dialect. Evans's <em>A Grammar of Kayardild</em> (Mouton de Gruyter, 1995) describes a language that is entirely suffixing, with free word order and a case system that does work most languages leave to the verb.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"-17.05\" data-lng=\"139.45\" data-zoom=\"7\">🌍 Fly to Bentinck Island</button>\n</div>\n\n<h3>Cases on top of cases</h3>\n\n<p>Evans counts thirteen nominal cases, among them locative <em>-kiya</em>, ablative <em>-kinaba</em>, proprietive <em>-kuru</em>, genitive <em>-karra(n)-</em> and instrumental <em>-nguni-</em>. A noun does not stop at one. When a possessor sits inside a phrase that already has a case, it keeps its own possessive ending and then adds the case of the whole phrase. Evans's example (3-21) is <em>dan-kinaba-nguni dangka-naba-nguni mirra-nguni walbu-nguni</em>, \"with this man's good raft\": <em>dangka</em> \"man\" takes the ablative (here marking possession) and then the instrumental, because the raft is the instrument.</p>\n\n<p>A sentence cited by Marcus Kracht in <em>The Mathematics of Language</em> (2003) goes further: <em>maku-ntha yalawu-jarra-ntha yakuri-naa-ntha dangka-karra-nguni-naa-ntha mijil-nguni-naa-ntha</em>, \"The woman must have caught fish with the man's net.\" The word for \"man\" here is <em>dangka-karra-nguni-naa-ntha</em>: genitive, instrumental, modal ablative, oblique. That is four suffixes on one noun, the maximum Evans's grammar allows. The outer <em>-ntha</em> runs over every word in the clause, the verb <em>yalawu-jarra</em> \"caught\" included.</p>\n\n<h3>Tense on the noun</h3>\n\n<p>The <em>-naa</em> in that sentence is what Evans calls <strong>modal case</strong>. In Kayardild, every noun phrase except the subject carries an ending that agrees with the tense or mood of the clause. In a past-tense clause the objects and other non-subject phrases take the modal ablative; in a future one they take the modal proprietive <em>-ku</em>. Evans describes modal case as unique to the insular Tangkic languages.</p>\n\n<p>Kayardild also has <strong>verbal cases</strong>, which turn a noun into a grammatical verb that then inflects for tense, mood and polarity like any verb. Evans gives three versions of \"I go to that cave\":</p>\n<ul>\n  <li><em>ngada warra-jarra dathin-kiiwa-tharra ngilirr-iiwa-tharr</em>: \"I went to that cave\" (past)</li>\n  <li><em>ngada warra-ju dathin-kiiwa-thu ngilirr-iiwa-thu</em>: \"I will go to that cave\" (potential)</li>\n  <li><em>ngada warra-nangku dathin-kiiwa-nangku ngilirr-iiwa-nangku</em>: \"I will not go to that cave\" (negative potential)</li>\n</ul>\n<p><em>Ngilirr</em> \"cave\" takes the past ending <em>-tharr</em>, the potential (future) <em>-thu</em> and even the negative <em>-nangku</em>, matching the verb <em>warra-</em> \"go\" each time. With the ordinary allative instead, the future sentence becomes <em>ngada warra-ju dathin-kiring-ku ngilirr-iring-ku</em>, where the modal proprietive <em>-ku</em> carries the future on \"that\" and \"cave\".</p>\n\n<h3>Who still speaks it</h3>\n\n<p>The Kaiadilt people remained on their islands until the 1940s. After a drought and a cyclonic tidal surge, the Queensland government moved many of them to the Presbyterian mission on Mornington Island in 1947 and 1948; its own community history records about 50 people removed by 1947 and notes that some had to be \"induced\" to leave. At the mission, children were kept in dormitories, which were not closed until 1954, and they grew up speaking English. Evans wrote in 1995 that less than forty-five years after substantial European contact there were no fully fluent speakers under the age of fifty. Around fifty native speakers were known in 1981. The 2016 Australian census counted eight; the 2021 census figure recorded in AIATSIS's AustLang database is 43.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"lbz,nny\">⚖️ Compare its Tangkic neighbours Lardil and Yangkaal</button>\n</div>",
      "ja": "<p><strong>カヤルディルド語（Kayardild）</strong>は、カーペンタリア湾に浮かぶ南ウェルズリー諸島、つまりクイーンズランド州沖のベンティンク島、スウィアーズ島と周辺の小島で話されてきた。系統は小さな<strong>タンキック語族</strong>に属する。同じ語族には、隣のモーニントン島のラルディル語、本土沿岸のユクルタ語（ガンガリダ語）、そしてヤンカール語がある。ヤンカール語はカヤルディルド語にきわめて近く、ニコラス・エヴァンズはこれをカヤルディルド語の方言として扱っている。エヴァンズの『A Grammar of Kayardild』（Mouton de Gruyter、1995年）によれば、この言語は接尾辞だけで語を組み立て、語順は自由だ。そして多くの言語なら動詞にさせる仕事を、格の体系が引き受けている。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"-17.05\" data-lng=\"139.45\" data-zoom=\"7\">🌍 ベンティンク島へ飛ぶ</button>\n</div>\n\n<h3>格の上に格を重ねる</h3>\n\n<p>エヴァンズが数える名詞の格は13種類ある。処格 <em>-kiya</em>、奪格 <em>-kinaba</em>、具有格（proprietive）<em>-kuru</em>、属格 <em>-karra(n)-</em>、具格 <em>-nguni-</em> などだ。しかも一つの名詞に付く格は一つとは限らない。すでに格を持つ句の中に所有者が入ると、その所有者は自分の所有を表す語尾を保ったまま、句全体の格をさらに後ろに付け足す。エヴァンズの例（3-21）<em>dan-kinaba-nguni dangka-naba-nguni mirra-nguni walbu-nguni</em> は「この男の良い筏で」という意味になる。<em>dangka</em>「男」は所有を表す奪格を取り、さらに筏が道具なので具格を重ねている。</p>\n\n<p>マルクス・クラハトが『The Mathematics of Language』（2003年）で引いた文はもっと長い。<em>maku-ntha yalawu-jarra-ntha yakuri-naa-ntha dangka-karra-nguni-naa-ntha mijil-nguni-naa-ntha</em>、意味は「女は男の網で魚を獲ったに違いない」。ここでの「男」は <em>dangka-karra-nguni-naa-ntha</em>、つまり属格・具格・様態奪格・斜格の四つが連なる。一つの名詞に四つの格接尾辞が付いており、これはエヴァンズの文法が認める上限にあたる。いちばん外側の <em>-ntha</em> は節のすべての語に付き、「獲った」を表す動詞 <em>yalawu-jarra</em> も例外ではない。</p>\n\n<h3>名詞に付く時制</h3>\n\n<p>この文の <em>-naa</em> を、エヴァンズは<strong>様態格（modal case）</strong>と呼ぶ。カヤルディルド語では、主語以外のすべての名詞句が、節の時制や法に合わせた語尾を取る。過去の節では目的語など主語以外の句が様態奪格になり、未来の節では様態具有格 <em>-ku</em> になる。エヴァンズは、様態格を島嶼部のタンキック諸語にしか見られない現象だとしている。</p>\n\n<p>カヤルディルド語には<strong>動詞格（verbal case）</strong>というものもある。これを付けた名詞は文法上の動詞になり、ふつうの動詞と同じように時制・法・肯否で活用する。エヴァンズは「私はあの洞窟へ行く」を三通りに示している。</p>\n<ul>\n  <li><em>ngada warra-jarra dathin-kiiwa-tharra ngilirr-iiwa-tharr</em>：「私はあの洞窟へ行った」（過去）</li>\n  <li><em>ngada warra-ju dathin-kiiwa-thu ngilirr-iiwa-thu</em>：「私はあの洞窟へ行くだろう」（可能・未来）</li>\n  <li><em>ngada warra-nangku dathin-kiiwa-nangku ngilirr-iiwa-nangku</em>：「私はあの洞窟へは行かないだろう」（否定可能）</li>\n</ul>\n<p>「洞窟」<em>ngilirr</em> には過去の <em>-tharr</em>、可能（未来）の <em>-thu</em>、さらに否定の <em>-nangku</em> まで付き、そのたびに動詞 <em>warra-</em>「行く」とそろう。動詞格の代わりにふつうの向格を使うと、未来の文は <em>ngada warra-ju dathin-kiring-ku ngilirr-iring-ku</em> となり、「あの」と「洞窟」の上で様態具有格 <em>-ku</em> が未来を表す。</p>\n\n<h3>話し手はいま</h3>\n\n<p>カイアディルト（Kaiadilt）の人々は1940年代まで自分たちの島で暮らしていた。干ばつとサイクロンによる高潮のあと、クイーンズランド州政府は1947年と1948年に、その多くをモーニントン島の長老派教会ミッションへ移した。州政府自身の地域史には、1947年までに約50人が移されたこと、島を離れるよう「誘導」しなければならない人もいたことが記されている。ミッションでは子どもたちが寄宿舎に入れられ（寄宿舎の閉鎖は1954年）、英語で育った。エヴァンズは1995年に、本格的なヨーロッパ人との接触から45年足らずで、50歳未満には完全に流暢な話者がいなくなったと書いている。1981年に知られていた母語話者は50人ほどだった。2016年のオーストラリア国勢調査が数えた話者は8人、AIATSISのAustLangデータベースが記録する2021年国勢調査の数字は43人である。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"lbz,nny\">⚖️ 同じタンキック語族のラルディル語とヤンカール語を比べる</button>\n</div>"
    },
    "sources": [
      {
        "text": "Evans, Nicholas (1995). A Grammar of Kayardild: With Historical-Comparative Notes on Tangkic. Berlin: Mouton de Gruyter (Mouton Grammar Library 15).",
        "url": "https://doi.org/10.1515/9783110873733"
      },
      {
        "text": "Tiberius, Carole, in consultation with Nicholas Evans. Kayardild Language Report. Surrey Database of Agreement, Surrey Morphology Group (13 nominal cases, up to four stacked case suffixes, modal case unique to insular Tangkic, examples 3-21 and 4-105 to 4-108, the fluency observation citing Evans 1995:43).",
        "url": "https://www.smg.surrey.ac.uk/Agreement/Reports/Kayardild.pdf"
      },
      {
        "text": "Queensland Government. Community histories: Mornington Island (Kaiadilt relocation 1947-48; about 50 removed by 1947; Presbyterian mission 1914; dormitories closed 1954).",
        "url": "https://www.qld.gov.au/atsi/cultural-awareness-heritage-arts/community-histories-mornington-island/"
      },
      {
        "text": "Wikipedia. Suffixaufnahme (the four-suffix 'net' sentence as cited from Kracht, Marcus (2003), The Mathematics of Language, Mouton de Gruyter, p. 37).",
        "url": "https://en.wikipedia.org/wiki/Suffixaufnahme"
      }
    ]
  },
  {
    "id": "ket-dene-yeniseian",
    "icon": "🏹",
    "tags": [
      "ket",
      "yeniseian",
      "na-dene",
      "language-families",
      "siberia"
    ],
    "title": {
      "en": "Ket and Dene–Yeniseian: a Siberian language and its proposed relatives in North America",
      "ja": "ケット語とデネ・エニセイ仮説：北米に親戚を持つかもしれないシベリアの言語"
    },
    "summary": {
      "en": "Ket, spoken by about 150 people on the Yenisei River, is the last Yeniseian language. In 2008 Edward Vajda argued that it is related to Navajo, Tlingit and the other Na-Dene languages, and specialists still disagree about the claim.",
      "ja": "エニセイ川流域で約150人が話すケット語は、エニセイ語族で最後に残った言語だ。2008年、エドワード・ヴァイダはこの言語がナバホ語やトリンギット語などナ・デネ語族とつながると主張した。この説をめぐる評価は、専門家の間でいまも分かれている。"
    },
    "body": {
      "en": "<p><strong>Ket</strong> (ISO 639-3 <em>ket</em>) is spoken along the middle Yenisei River in Russia's Krasnoyarsk Krai, and native speakers now remain only in the villages of Kellog, Surgutikha and Maduyka. In 1926, 1,225 Kets spoke the language natively. By 1989 the figure was 537. Russia's 2020 census, carried out in 2021, counted 1,088 ethnic Kets, and 153 of them reported speaking Ket. Reports from field linguists put fluent speakers below 30 by 2024. Ket has prefixing verbs with noun incorporation and SOV word order, and it has neither /p/ nor /ɡ/. Descriptions of its tone range from no tone at all to eight contrastive tones.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ket\">🔍 Open Ket</button>\n</div>\n\n<p>Ket is the last living member of the <strong>Yeniseian</strong> family. Its closest relative, Yugh, died out in the 1970s. Kott, Arin, Assan and Pumpokol, which were spoken further south and recorded in 18th- and 19th-century wordlists, had disappeared earlier still. Before 2008 the family had no demonstrated relatives anywhere, and proposals linking it to Burushaski, Sino-Tibetan or North Caucasian never found general acceptance.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ket,yug\">⚖️ Compare Ket and Yugh</button>\n</div>\n\n<h3>The 2008 proposal</h3>\n\n<p>At a symposium at the University of Alaska Fairbanks on 26–27 February 2008, <strong>Edward Vajda</strong> of Western Washington University presented about ten years of work. He argued that Yeniseian is related to <strong>Na-Dene</strong>: Tlingit, the extinct Eyak, and the Athabaskan family, which runs from Koyukon and Gwich'in in Alaska to Navajo and Apache in the US Southwest. His evidence was mainly morphological. Vajda lined up about ten matching prefix and suffix positions in the Ket and Proto-Na-Dene verb templates. He also proposed more than 110 cognate morphemes and a set of sound correspondences. One of these explains Yeniseian tone: in his account, Ket's tonal contrasts arose from glottalized consonants at the end of the syllable, and Na-Dene languages still have such consonants.</p>\n\n<p>Michael Krauss, Jeff Leer and James Kari, all Na-Dene specialists, responded favourably. So did the historical linguists Eric Hamp and Johanna Nichols, and Bernard Comrie endorsed the method. The symposium summary also placed Haida outside the family, although Haida had sometimes been grouped with Na-Dene. The papers were published in 2010 as <em>The Dene–Yeniseian Connection</em>, edited by Kari and Ben Potter (Anthropological Papers of the University of Alaska, new series 5).</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ket,nv,koy,chp,hai\">⚖️ Compare Ket, Navajo, Koyukon, Chipewyan and Haida</button>\n</div>\n\n<h3>The objections</h3>\n\n<p>The symposium's press release was headlined \"Linguists demonstrate Siberian-North American link\". The specialists who reviewed the 2010 volume did not treat the question as settled. <strong>Lyle Campbell</strong>, writing in the <em>International Journal of American Linguistics</em> in 2011, concluded that the connection could not yet be accepted. In later work he has remained doubtful. In 2012 <strong>George Starostin</strong> examined the data in the <em>Journal of Language Relationship</em>. He found that many of Vajda's correspondences were not regular in the strict comparative sense, but he concluded that something in the comparison should not be abandoned. In his reply in the same issue, Vajda described Dene–Yeniseian as a hypothesis that the families are related, not yet a worked-out family tree.</p>\n\n<p>Genetics does not decide the question. Most Ket men sampled in genetic studies carry Y-chromosome haplogroup Q, which is also common among Native Americans. That shows a shared ancestry between populations, but a population can change languages, so it is not evidence about the language family.</p>\n\n<h3>Which way did the migration go?</h3>\n\n<p>In 2014 Mark Sicoli and Gary Holton ran a Bayesian phylogenetic analysis in <em>PLoS ONE</em>. They used Ket, Kott, 37 Na-Dene languages and Haida as an outgroup, coded for 116 phonological and morphological features, of which 90 were informative. Models that set Yeniseian apart from a Na-Dene clade fit the data significantly worse. From this they argued for a spread out of Beringia, with the ancestors of the Kets moving back into Siberia. In 2020 Igor Yanovich argued that the study was methodologically flawed: its typological data were too few to produce a tree that did not depend on the model's prior assumptions, so the direction of migration does not follow from it. If the hypothesis holds, it links languages a long way apart. Measured between the map's points, Ket is about 4,900 km from Koyukon and about 8,900 km from Navajo.</p>",
      "ja": "<p><strong>ケット語</strong>（ISO 639-3 <em>ket</em>）は、ロシア・クラスノヤルスク地方のエニセイ川中流域で話されている。母語話者が残っているのは、ケロッグ、スルグティハ、マドゥイカの三つの村だけだ。1926年にはケット人1,225人がこの言語を母語としていたが、1989年には537人に減った。2021年に実施されたロシアの2020年国勢調査では、ケット人1,088人のうち、ケット語を話すと答えたのは153人だった。現地で調査する言語学者の報告では、2024年の時点で流暢な話者は30人を下回る。動詞は接頭辞をとり、名詞を動詞に抱合する。語順はSOVで、/p/ と /ɡ/ の音素を持たない。声調については、声調はないとする記述から、八つの声調を区別するという記述まで、研究者によって見方が大きく分かれる。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ket\">🔍 ケット語を開く</button>\n</div>\n\n<p>ケット語は<strong>エニセイ語族</strong>で唯一いまも話されている言語だ。いちばん近い親戚のユグ語は1970年代に消滅した。さらに南で話され、18〜19世紀の語彙集に記録が残るコット語、アリン語、アッサン語、プンポコル語は、それより前に姿を消している。2008年まで、この語族の親戚であると証明された言語はどこにもなかった。ブルシャスキー語、シナ・チベット語族、北コーカサス諸語と結びつける説はあったが、どれも広く受け入れられてはいない。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ket,yug\">⚖️ ケット語とユグ語を比べる</button>\n</div>\n\n<h3>2008年の提案</h3>\n\n<p>2008年2月26〜27日、アラスカ大学フェアバンクス校で開かれたシンポジウムで、西ワシントン大学の<strong>エドワード・ヴァイダ</strong>が約10年にわたる研究を発表した。エニセイ語族が<strong>ナ・デネ語族</strong>と系統的につながるという主張である。ナ・デネ語族には、トリンギット語、消滅したイヤック語、そしてアサバスカ諸語が含まれる。アサバスカ諸語は、アラスカのコユコン語やグウィッチン語から、米国南西部のナバホ語やアパッチ語にまで分布する。ヴァイダが示した証拠の中心は形態論だった。ケット語の動詞と、再建されたナ・デネ祖語の動詞では、接頭辞と接尾辞が並ぶ位置がおよそ10か所で対応するという。彼はこのほかに、110を超える同源形態素と、一連の音対応も提示した。その一つが声調の起源の説明である。ヴァイダによれば、ケット語の声調の対立は、音節末にあった声門化子音から生じた。ナ・デネ諸語には、その声門化子音がいまも残っている。</p>\n\n<p>ナ・デネ語の専門家であるマイケル・クラウス、ジェフ・リア、ジェームズ・カーリは、この提案に好意的な反応を示した。歴史言語学者のエリック・ハンプとジョアンナ・ニコルズも支持を表明し、バーナード・コムリーは方法論を評価した。シンポジウムの総括では、ハイダ語はこの語族に含まれないとされた。ハイダ語はそれまで、ナ・デネ語族と一括りにされることがあった言語である。シンポジウムの論文は2010年、カーリとベン・ポッターの編集による論集『The Dene–Yeniseian Connection』（Anthropological Papers of the University of Alaska, new series 5）として刊行された。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ket,nv,koy,chp,hai\">⚖️ ケット語・ナバホ語・コユコン語・チペワイアン語・ハイダ語を比べる</button>\n</div>\n\n<h3>反論</h3>\n\n<p>シンポジウムのプレスリリースには、「Linguists demonstrate Siberian-North American link」（言語学者がシベリアと北米の言語のつながりを実証）という見出しが付いていた。しかし、2010年の論集を書評した専門家たちは、決着がついたとは見ていない。<strong>ライル・キャンベル</strong>は2011年、『International Journal of American Linguistics』誌の書評で、現時点ではこの系統関係を受け入れられないと結論づけた。その後の著作でも、彼は懐疑的な立場を変えていない。<strong>ゲオルギー・スタロスティン</strong>は2012年、『Journal of Language Relationship』誌でデータを検証した。ヴァイダの音対応の多くは、比較言語学の厳密な意味での規則的な対応になっていないと指摘した。ただし、この比較には捨てるべきでない何かが残るとも結論している。ヴァイダは同じ号に寄せた応答で、デネ・エニセイ仮説は二つの語族の類縁関係についての仮説であり、系統樹として完成した分類案ではまだないと述べた。</p>\n\n<p>遺伝学からは、この問題に答えは出ない。遺伝学の調査で試料を提供したケット人男性の多くは、Y染色体ハプログループQを持つ。このハプログループは、アメリカ先住民にも多い。とはいえ、これが示すのは集団どうしの祖先のつながりである。集団は言語を乗り換えることがあるので、語族を判定する証拠にはならない。</p>\n\n<h3>移動はどちら向きだったのか</h3>\n\n<p>2014年、マーク・シコリとゲーリー・ホルトンは『PLoS ONE』誌に、ベイズ系統解析の結果を発表した。対象はケット語、コット語、ナ・デネ諸語37言語で、ハイダ語を外群とした。音韻と形態にかかわる116の特徴をコード化し、そのうち情報量のある90項目を解析に使った。エニセイ語族をナ・デネ語族とは別系統に置くモデルは、データとの適合度が有意に低かった。二人はこの結果から、言語はベーリンジアから広がり、ケット人の祖先はそこからシベリアへ逆戻りしたと論じた。これに対しイーゴリ・ヤノヴィチは2020年、この研究には方法上の欠陥があると反論した。類型論データが少なすぎて、モデルの事前仮定に左右されない系統樹は得られず、移動の方向もそこからは導けないという。仮説が正しければ、ずいぶん遠く離れた言語どうしが結ばれることになる。地図上の地点で測ると、ケット語からコユコン語まで約4,900 km、ナバホ語までは約8,900 kmある。</p>"
    },
    "sources": [
      {
        "text": "Kari, James & Ben A. Potter (eds.), 2010. The Dene–Yeniseian Connection. Anthropological Papers of the University of Alaska, new series 5 (1–2). UAF Dept. of Anthropology & Alaska Native Language Center.",
        "url": "https://uaf.edu/news/archives/news-archives-2010-2021/new-book-chronicles-asia-north-america-language-link.php"
      },
      {
        "text": "Nichols, Johanna, 2008. Dene-Yeniseic Symposium Summary / press release \"Linguists demonstrate Siberian-North American link\" (28 Feb 2008). Alaska Native Language Center, University of Alaska Fairbanks.",
        "url": "https://www.uaf.edu/anlc/docs/dy2008summary.pdf"
      },
      {
        "text": "Starostin, George, 2012. Dene-Yeniseian: a critical assessment. Journal of Language Relationship 8: 117–152 (with Vajda's reply in the same issue).",
        "url": "https://cyberleninka.ru/article/n/dene-yeniseian-a-critical-assessment-1"
      },
      {
        "text": "Sicoli, Mark A. & Gary Holton, 2014. Linguistic Phylogenies Support Back-Migration from Beringia to Asia. PLoS ONE 9(3): e91722.",
        "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0091722"
      }
    ]
  },
  {
    "id": "manx-revival",
    "icon": "🐈",
    "tags": [
      "manx",
      "language-revival",
      "celtic",
      "isle-of-man",
      "endangered-languages"
    ],
    "title": {
      "en": "Manx after Ned Maddrell: 26 acetate discs and a school in St John's",
      "ja": "ネッド・マドレル以後のマン島語：26枚の録音盤とセント・ジョンズの小学校"
    },
    "summary": {
      "en": "The last person to have spoken Manx from childhood died in 1974. Recordings made in 1948 and in the 1950s, adult learners, and a Manx-medium primary school opened in 2001 kept the language in use, and in 2009 UNESCO withdrew the label 'extinct'.",
      "ja": "子どもの頃からマン島語を話していた最後の人物は1974年に亡くなった。1948年と1950年代の録音、大人の学習者、そして2001年に開校したマン島語で授業を行う小学校が言語を使われ続けるものにし、2009年にはユネスコが「消滅」の分類を撤回した。"
    },
    "body": {
      "en": "<p><strong>Edward \"Ned\" Maddrell</strong> was born on 20 August 1877 at Corvalley, near the village of Cregneash at the southern tip of the Isle of Man. He spoke English first, and learned Manx after he moved to Cregneash to live with relatives, among them a great-aunt, Margaret Taubman, who spoke no English. At 14 he became a cook on a fishing boat that sailed from Port St Mary after the herring to Kinsale and Shetland. After Sage Kinvig died in 1962, Maddrell was the only person left who had spoken Manx from childhood. He died on 27 December 1974, aged 97.</p>\n\n<p>Manx (<em>Gaelg</em>, ISO code <em>gv</em>) is a Goidelic language, a sister of Irish and Scottish Gaelic. Its decline can be followed in figures. In 1874 Henry Jenner counted 12,340 habitual speakers in a population of 41,084, about 30 percent. The 1901 census found 4,419. By then the church and the courts were the last places Manx was used in public, and parents were steering their children towards English.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"gv\">🔍 Open Manx on the map</button>\n</div>\n\n<h3>Recording the last speakers</h3>\n\n<p>In the summer of 1947 the Irish leader Éamon de Valera visited the island and met Maddrell at Harry Kelly's cottage in Cregneash. The Manx Museum had no equipment or money to record the remaining speakers, so de Valera arranged for the Irish Folklore Commission to do it. Its collector <strong>Kevin Danaher</strong> (Caoimhín Ó Danachair) worked on the island from 22 April to 5 May 1948 with a mobile disc-cutting unit. A small team of Manx-language students, among them Leslie Quirk, Tommy Braide and Chalse Craine, helped him. The result was 26 double-sided acetate discs, just over four hours of stories, conversation, hymns, song fragments and versions of the Lord's Prayer from eight native speakers, five men and three women, among them Maddrell, John Kneen and Harry Boyd. The discs were later restored and published with transcriptions and translations as <em>Skeealyn Vannin / Stories of Mann</em>.</p>\n\n<p>The revival did not begin from silence after 1974. The Manx Language Society, <em>Yn Çheshaght Ghailckagh</em>, had been founded in 1899. In the 1950s its members, among them Doug Fargher, made their own recordings of the elderly speakers, and the schoolboy <strong>Brian Stowell</strong> (1936–2019), who had learned Manx from the society's members, went with them. Stowell became the island's Manx Language Officer in 1991. Christopher Moseley, writing in 2014, describes the written language as canonical for the revival movement \"along with old sound recordings as a guide to correct pronunciation\".</p>\n\n<p>The written language has its own history. Manx spelling was set by clergy working from English conventions, from Bishop John Phillips's Book of Common Prayer translation of 1610 to the Bible and prayer book translations begun under Bishop Thomas Wilson (bishop 1698–1755) and completed under his successor, Mark Hildesley. The result looks unlike its sisters: \"water\" is <em>ushtey</em> in Manx, <em>uisce</em> in Irish and <em>uisge</em> in Scottish Gaelic.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"gv,ga,gd\" data-word=\"water\">⚖️ Compare Manx, Irish and Scottish Gaelic</button>\n</div>\n\n<h3>A school, and a correction from UNESCO</h3>\n\n<p>After a parents' group, Sheshaght ny Paarantyn, formed in 1999 and asked the Department of Education for a school, the <strong>Bunscoill Ghaelgagh</strong> opened in September 2001 as a single class sharing the premises of Ballacottier School in Douglas. In January 2003 it moved into the old school building in St John's. It is the only primary school on the island that teaches entirely in Manx, and it had 67 pupils in 2016.</p>\n\n<p>On 21 February 2009 UNESCO published the third edition of its <em>Atlas of the World's Languages in Danger</em> and listed Manx as extinct, a category for languages no one speaks or remembers. Pupils of the Bunscoill wrote to UNESCO pointing out that they were writing to it in the language, and Chief Minister Tony Brown sent a formal protest. UNESCO's Assistant Director-General for Culture replied that the classification would be changed to \"critically endangered\". Moseley, the Atlas's editor-in-chief, wrote in 2014 that \"the term 'extinct' had hit a nerve, and that the term had been a blunt and unsubtle instrument\", and that the editors refined the categories to take account of revival and revitalization. In the 2021 census, 2,223 residents of the island reported some knowledge of Manx.</p>",
      "ja": "<p><strong>エドワード（ネッド）・マドレル</strong>は1877年8月20日、マン島南端の村クレグニーシュに近いコーヴァリーで生まれた。最初に覚えた言葉は英語で、マン島語はクレグニーシュの親類のもとに移り住んでから身につけた。そこには英語をまったく話さない大おば、マーガレット・トーブマンがいた。14歳で漁船の炊事係となり、ポート・セント・メアリーからニシンを追ってアイルランドのキンセールやシェトランド諸島まで航海した。1962年にセージ・キンヴィグが亡くなると、子どもの頃からマン島語を話してきた人間はマドレルひとりになった。彼は1974年12月27日、97歳で世を去った。</p>\n\n<p>マン島語（<em>Gaelg</em>、ISOコード <em>gv</em>）はゲール語派の言語で、アイルランド語やスコットランド・ゲール語の姉妹にあたる。その衰退は数字で追うことができる。1874年、ヘンリー・ジェンナーは人口41,084人のうち日常的な話者を12,340人、約30%と数えた。1901年の国勢調査では4,419人。この頃にはマン島語が公の場で使われるのは教会と法廷くらいになっており、親たちも子どもに英語を身につけさせようとしていた。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"gv\">🔍 地図でマン島語を開く</button>\n</div>\n\n<h3>最後の話者たちの声を録る</h3>\n\n<p>1947年夏、アイルランドの指導者エイモン・デ・ヴァレラがマン島を訪れ、クレグニーシュのハリー・ケリーの家でマドレルに会った。マン島博物館には残る話者を録音する機材も資金もなかったため、デ・ヴァレラはアイルランド民俗学委員会にその仕事を手配した。委員会の収集員<strong>ケヴィン・ダナハー</strong>（カヴィーン・オ・ダナハル）は移動式の円盤録音装置を携え、1948年4月22日から5月5日まで島で作業した。レスリー・クワーク、トミー・ブレイド、チャルス・クレインらマン島語を学ぶ若者の小さなチームが彼を手伝った。こうして両面アセテート盤26枚、4時間あまりの録音が残った。昔話、会話、賛美歌、歌の断片、主の祈りなどを語ったのは、男性5人・女性3人の母語話者8人で、マドレル、ジョン・ニーン、ハリー・ボイドらが含まれる。録音盤はのちに修復され、書き起こしと翻訳を付けて『Skeealyn Vannin / Stories of Mann』として刊行された。</p>\n\n<p>復興は1974年の沈黙から始まったわけではない。マン島語協会（<em>Yn Çheshaght Ghailckagh</em>）は1899年に創立されている。1950年代にはダグ・ファーガーら会員たちが、高齢の話者たちを独自に録音した。協会の会員からマン島語を学んだ高校生<strong>ブライアン・ストーウェル</strong>（1936〜2019）もこれに同行し、1991年に島のマン島語担当官となる。クリストファー・モーズリーは2014年の論文で、書き言葉が復興運動の規範となり、古い録音が「正しい発音の手引き」（along with old sound recordings as a guide to correct pronunciation）として併用されていると書いている。</p>\n\n<p>書き言葉にも独自の歴史がある。マン島語の綴りは、英語の綴り方をもとに聖職者たちが定めた。1610年のジョン・フィリップス主教による祈祷書の翻訳に始まり、18世紀にはトマス・ウィルソン主教（在任1698〜1755）のもとで聖書と祈祷書の翻訳が始まり、後任のマーク・ヒルデスリー主教のもとで完成した。そのため見た目は姉妹言語とまるで違う。「水」はマン島語で <em>ushtey</em>、アイルランド語で <em>uisce</em>、スコットランド・ゲール語で <em>uisge</em> と書く。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"gv,ga,gd\" data-word=\"water\">⚖️ マン島語・アイルランド語・スコットランド・ゲール語を比べる</button>\n</div>\n\n<h3>小学校と、ユネスコの訂正</h3>\n\n<p>1999年に保護者の会シェシャグト・ナ・パーランティンが結成され、教育省に学校の設立を求めた。こうして<strong>ブンスコイル・ガールガグ</strong>（Bunscoill Ghaelgagh）が2001年9月、ダグラスのバラコッティア小学校の校舎を間借りする1学級として開校した。2003年1月にはセント・ジョンズの旧校舎へ移転。授業をすべてマン島語で行う島で唯一の小学校で、2016年の児童数は67人だった。</p>\n\n<p>2009年2月21日、ユネスコは『消滅の危機にある世界の言語地図』第3版を公開し、マン島語を「消滅」（話す人も覚えている人もいない言語）に分類した。ブンスコイルの児童たちは、まさにその言語で手紙を書いてユネスコに送り、首席大臣トニー・ブラウンも正式に抗議した。ユネスコの文化担当事務局長補は、分類を「極めて深刻な危機」に改めると回答した。地図の編集主幹だったモーズリーは2014年、「『消滅』という語は神経に触れた。あれは鈍く、粗雑な道具だった」（the term 'extinct' had hit a nerve, and that the term had been a blunt and unsubtle instrument）と書き、編集陣が復活・再活性化を考慮して分類を見直したと述べている。2021年の国勢調査では、島の住民2,223人がマン島語をある程度知っていると回答した。</p>"
    },
    "sources": [
      {
        "text": "Moseley, Christopher (2014). \"Livonian – the most endangered language in Europe?\" Eesti ja soome-ugri keeleteaduse ajakiri / Journal of Estonian and Finno-Ugric Linguistics (ESUKA–JEFUL) 5(1): 61–75.",
        "url": "https://doi.org/10.12697/jeful.2014.5.1.04"
      },
      {
        "text": "van der Heide, Ailbe (2022). \"Mie Mannin, Mie Nerin / Good for Mann, Good for Ireland.\" National Folklore Collection, UCD Cultural Heritage Collections blog, 21 July 2022.",
        "url": "https://ucdculturalheritagecollections.com/2022/07/21/mie-mannin-mie-nerin-good-for-mann-good-for-ireland/"
      },
      {
        "text": "\"Bunscoill Ghaelgagh.\" Wikipedia (founding, premises, pupil numbers; UNESCO letters citing Sarah Whitehead, The Guardian, 2 April 2015).",
        "url": "https://en.wikipedia.org/wiki/Bunscoill_Ghaelgagh"
      },
      {
        "text": "\"Ned Maddrell.\" Wikipedia (birth, upbringing in Cregneash, fishing voyages, Sage Kinvig, de Valera's 1947 visit).",
        "url": "https://en.wikipedia.org/wiki/Ned_Maddrell"
      }
    ]
  },
  {
    "id": "cornish-revival",
    "icon": "⛏️",
    "tags": [
      "cornish",
      "language-revival",
      "orthography",
      "celtic",
      "endangered-languages"
    ],
    "title": {
      "en": "Cornish: the 'last speaker' of 1777 and the language that came back",
      "ja": "コーンウォール語：1777年の「最後の話者」と、戻ってきた言語"
    },
    "summary": {
      "en": "Dolly Pentreath of Mousehole, who died in 1777, is remembered as the last speaker of Cornish. She spoke English as well, and other speakers outlived her. The language was revived from Henry Jenner's 1904 Handbook, went through four rival spellings, and was moved off UNESCO's extinct list in 2010.",
      "ja": "1777年に没したマウスホールのドリー・ペントリースは、コーンウォール語の「最後の話者」として語り継がれている。だが彼女は英語も話し、彼女より長く生きた話者もいた。言語は1904年のヘンリー・ジェナー『ハンドブック』から復興し、四つの正書法の対立を経て、2010年にユネスコの「消滅言語」リストから外された。"
    },
    "body": {
      "en": "<p><strong>Cornish</strong> (<em>Kernewek</em>) is a Brythonic Celtic language, a close relative of Welsh and Breton. Once spoken across Cornwall, it had retreated by 1700 to the fishing and farming parishes of the far west, around Mount's Bay and the Penwith peninsula. The usual story says it ended in one person, on one date: <strong>Dorothy “Dolly” Pentreath</strong>, a fish seller of Mousehole, who was baptised on 16 May 1692 and died in December 1777.</p>\n\n<h3>Dolly Pentreath and the people after her</h3>\n\n<p>The story starts with the antiquary <strong>Daines Barrington</strong>. In 1768 he went looking for Cornish speakers, found Pentreath in Mousehole, and in 1775 reported his search in the Society of Antiquaries' journal <em>Archaeologia</em> under the title “On the Expiration of the Cornish Language”. In 1860 Prince Louis Lucien Bonaparte, a nephew of Napoleon and a collector of dialects, and John Garrett, the vicar of Paul, put a memorial stone in the churchyard wall at Paul. It describes her as “said to have been the last person who conversed in the ancient Cornish”.</p>\n\n<p>The evidence does not support “last speaker” in the plain sense. Pentreath was not a monoglot: Barrington's own account shows she spoke English, and in 1797 a Mousehole fisherman told the historian Richard Polwhele that “both Dolly and himself could talk in English”. The last person on record who spoke only Cornish was <strong>Chesten Marchant</strong> of Gwithian, who died in 1676, a century earlier. Pentreath was not the last fluent speaker either. On 3 July 1776 <strong>William Bodinar</strong>, a Mousehole fisherman, wrote a letter in Cornish with an English translation, which Barrington published in <em>Archaeologia</em> in 1779. In it he said that four or five people in his town could still speak Cornish, all of them about eighty years old. Barrington also heard of John Nancarrow of Marazion, aged 40 in 1779, who spoke it. In the 19th century fragments were still being passed on: <strong>John Davey</strong> of Boswednack in Zennor, who died in 1891, recited the Cranken Rhyme, but how much Cornish he actually knew is disputed. A language with no recordings does not stop on a single date. Pentreath's death is the date the story settled on, not the date the last speaker died.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"kw\">🔍 Open Cornish on the map</button>\n</div>\n\n<h3>Jenner's handbook</h3>\n\n<p>The revival dates from <strong>Henry Jenner</strong> (1848–1934) and his <em>A Handbook of the Cornish Language, chiefly in its latest stages</em>, published in London by David Nutt in 1904. Jenner wrote that Pentreath was “popularly, but erroneously, supposed to have been the last person who spoke the language”, and he based his grammar on the Cornish of the 17th and 18th centuries. His preface asked: “Why should Cornishmen learn Cornish? There is no money in it, it serves no practical purpose, and the literature is scanty and of no great originality or value. The question is a fair one, the answer is simple. Because they are Cornishmen.”</p>\n\n<h3>Four spellings, then one</h3>\n\n<p>Jenner's successor <strong>Robert Morton Nance</strong> went back further. His <em>Unified Cornish</em> of 1929 was built on the Middle Cornish of the medieval religious plays, and it served as the standard for most of the century. In 1986 Ken George published a study of Cornish pronunciation, and from it he devised <em>Kernewek Kemmyn</em> (“Common Cornish”), a spelling designed so that each sound is written one way. The Cornish Language Board adopted it in 1987. Richard Gendall's <em>Modern Cornish</em> returned to the Late Cornish that Jenner had used. In his 1995 book <em>Cornish Today</em>, Nicholas Williams attacked Kemmyn and proposed <em>Unified Cornish Revised</em>. That made four spellings for one small community of speakers.</p>\n\n<p>Official recognition forced a settlement. In 2002 the UK recognised Cornish under Part II of the European Charter for Regional or Minority Languages, and in 2005 the Cornish Language Partnership was set up to spend public money on it, which required a single spelling for schools and signs. After two years of negotiation the <strong>Standard Written Form</strong> was agreed in May 2008, and Gorsedh Kernow adopted it in June 2009. The older systems are still in use alongside it. Words on the map such as <em>tas</em> “father”, <em>dowr</em> “water” and <em>chi</em> “house” sit next to their Welsh and Breton cognates: <em>tad</em>, <em>dŵr</em>/<em>dour</em> and <em>tŷ</em>/<em>ti</em>.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"kw,cy,br\" data-word=\"father\">⚖️ Compare Cornish, Welsh and Breton</button>\n</div>\n\n<h3>Off the extinct list</h3>\n\n<p>In February 2009 UNESCO's <em>Atlas of the World's Languages in Danger</em> listed Cornish as extinct. The Cornish Language Partnership objected, and in the December 2010 edition the Atlas moved Cornish to “critically endangered”. The 2011 census in England and Wales recorded 557 people who gave Cornish as their main language, 464 of them in Cornwall. The 2021 census recorded 567, 471 of them in Cornwall. The question asks for a main language only, so speakers who use English most of the day are not counted.</p>",
      "ja": "<p><strong>コーンウォール語</strong>（<em>Kernewek</em>）はケルト語派ブリソン諸語の言語で、ウェールズ語やブルトン語と近い関係にある。かつてはコーンウォール全域で話されていたが、1700年ごろにはマウンツ湾とペンウィス半島の周辺、つまり西端の漁村と農村にまで後退していた。よく知られた話では、この言語は一人の人物の死とともに途絶えたことになっている。マウスホールの魚売り、<strong>ドロシー（ドリー）・ペントリース</strong>である。1692年5月16日に洗礼を受け、1777年12月に世を去った。</p>\n\n<h3>ドリー・ペントリースと、その後の人々</h3>\n\n<p>話の出どころは好古家の<strong>デインズ・バリントン</strong>だ。彼は1768年にコーンウォール語の話者を探して回り、マウスホールでペントリースに会った。その調査は1775年、ロンドン古物協会の紀要『アーキオロジア』に「コーンウォール語の消滅について」という題で発表された。1860年には、ナポレオンの甥で方言の収集家でもあったルイ・リュシアン・ボナパルト公と、ポール教区の牧師ジョン・ギャレットが、ポール教会墓地の塀に記念碑を据えた。碑文は彼女を「古きコーンウォール語で会話した最後の人物とされる」と記している。</p>\n\n<p>だが文字どおりの意味での「最後の話者」は、史料からは支持されない。まず、ペントリースは単一言語話者ではなかった。バリントン自身の記述から英語も話せたことがわかるし、1797年には、マウスホールのある漁師が歴史家リチャード・ポルウィールに「ドリーも彼自身も英語で話ができた」と語っている。記録に残る最後の単一言語話者は、それより1世紀前の1676年にグウィジアンで亡くなった<strong>チェステン・マーチャント</strong>である。最後の流暢な話者でもなかった。1776年7月3日、マウスホールの漁師<strong>ウィリアム・ボディナー</strong>が英訳を添えたコーンウォール語の手紙を書き、バリントンが1779年に『アーキオロジア』でそれを公表した。町でまだコーンウォール語を話せるのは4〜5人で、みな80歳ほどの老人だという内容だった。バリントンは、1779年の時点で40歳だったマラザイオンのジョン・ナンキャロウも話せると聞いている。19世紀になっても断片は受け継がれていた。1891年に没したゼナー教区ボズウェドナックの<strong>ジョン・デイヴィー</strong>は「クランケン・ライム」という韻文を暗誦できたが、実際にどこまでコーンウォール語を知っていたかは意見が分かれる。録音の残っていない言語が、ある一日を境に消えるわけではない。ペントリースの死は、物語が結びついた日付であって、最後の話者が亡くなった日ではない。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"kw\">🔍 地図でコーンウォール語を開く</button>\n</div>\n\n<h3>ジェナーのハンドブック</h3>\n\n<p>復興の起点とされるのは<strong>ヘンリー・ジェナー</strong>（1848〜1934年）の著書『コーンウォール語ハンドブック——主にその最終段階について』（<em>A Handbook of the Cornish Language, chiefly in its latest stages</em>）で、1904年にロンドンのデイヴィッド・ナット社から出た。ジェナーはペントリースについて「一般には、誤って、この言語を話した最後の人物と考えられている」（popularly, but erroneously, supposed to have been the last person who spoke the language）と書き、17〜18世紀のコーンウォール語をもとに文法をまとめた。序文には次の問答がある。「なぜコーンウォール人はコーンウォール語を学ぶべきなのか。金にはならないし、実用の役にも立たない。文学は乏しく、独創性や価値の点でも大したものではない。もっともな問いだが、答えは簡単だ。彼らがコーンウォール人だからである」（Why should Cornishmen learn Cornish? There is no money in it, it serves no practical purpose, and the literature is scanty and of no great originality or value. The question is a fair one, the answer is simple. Because they are Cornishmen.）</p>\n\n<h3>四つの綴り方から一つへ</h3>\n\n<p>ジェナーの後継者<strong>ロバート・モートン・ナンス</strong>は、さらに古い時代に拠りどころを求めた。1929年の<em>統一コーンウォール語</em>（Unified Cornish）は中世の宗教劇に見られる中期コーンウォール語を土台にしたもので、20世紀の大半を通じて標準の役割を果たした。1986年、ケン・ジョージがコーンウォール語の発音に関する研究を発表し、それをもとに、一つの音を一通りに書くことを目指した綴り<em>ケルネウェク・ケミン</em>（「共通コーンウォール語」）を考案した。コーンウォール語委員会は1987年にこれを採用した。リチャード・ジェンダルの<em>近代コーンウォール語</em>（Modern Cornish）は、ジェナーが用いた後期コーンウォール語に立ち返った。ニコラス・ウィリアムズは1995年の著書『コーニッシュ・トゥデイ』でケミンを批判し、<em>改訂統一コーンウォール語</em>（Unified Cornish Revised）を提案した。こうして、小さな話者共同体の中に四つの綴り方が並び立つことになった。</p>\n\n<p>決着を迫ったのは公的な承認だった。2002年、英国は欧州地域言語・少数言語憲章の第2部のもとでコーンウォール語を承認し、2005年には公的資金を扱うコーンウォール語パートナーシップが設立された。学校教育や標識に使うには、綴りを一本化する必要があった。2年間の交渉を経て、2008年5月に<strong>標準書記形</strong>（Standard Written Form）が合意され、2009年6月にはゴルセズ・ケルノウもこれを採用した。旧来の綴りも、それと並んで今も使われている。地図上のコーンウォール語 <em>tas</em>「父」、<em>dowr</em>「水」、<em>chi</em>「家」は、ウェールズ語・ブルトン語の同源語 <em>tad</em>、<em>dŵr</em>／<em>dour</em>、<em>tŷ</em>／<em>ti</em> と並べて見ることができる。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"kw,cy,br\" data-word=\"father\">⚖️ コーンウォール語・ウェールズ語・ブルトン語を比べる</button>\n</div>\n\n<h3>「消滅言語」リストから外れて</h3>\n\n<p>2009年2月、ユネスコの『消滅の危機にある世界の言語地図』はコーンウォール語を「消滅」に分類した。コーンウォール語パートナーシップはこれに異議を唱え、2010年12月の版で地図はコーンウォール語を「極めて深刻な危機」に移した。2011年のイングランド・ウェールズ国勢調査では、コーンウォール語を主要言語と答えた人は557人（うちコーンウォール在住464人）だった。2021年の国勢調査では567人（同471人）である。この設問は主要言語を一つだけ尋ねるため、ふだん英語を主に使う話者は数に入らない。</p>"
    },
    "sources": [
      {
        "text": "Jenner, Henry (1904). A Handbook of the Cornish Language, chiefly in its latest stages, with some account of its history and literature. London: David Nutt. (Project Gutenberg edition)",
        "url": "https://www.gutenberg.org/ebooks/26192"
      },
      {
        "text": "Barrington, Daines (1779). \"On some additional information relative to the continuance of the Cornish language\" (includes William Bodinar's 1776 letter). Archaeologia 5, Society of Antiquaries of London.",
        "url": "https://www.cambridge.org/core/journals/archaeologia/article/iii-mr-barrington-on-some-additional-information-relative-to-the-continuance-of-the-cornish-language-in-a-letter-to-john-lloyd-esq-fas/FF268F98D2B62BF1A65C30E28AAD323D"
      },
      {
        "text": "UK Government (2023). Sixth Periodical Report on the European Charter for Regional or Minority Languages, United Kingdom (Cornish census figures 2011 and 2021). Council of Europe.",
        "url": "https://rm.coe.int/ukpr6-en/1680ac30bb"
      },
      {
        "text": "Wikipedia contributors. \"Cornish language revival\" (orthographies, SWF 2008, Gorsedh Kernow adoption 17 June 2009, UNESCO). Wikipedia, accessed 2026.",
        "url": "https://en.wikipedia.org/wiki/Cornish_language_revival"
      }
    ]
  },
  {
    "id": "ainu-language",
    "icon": "🐻",
    "tags": [
      "isolate",
      "ainu",
      "japan",
      "endangered",
      "revitalization"
    ],
    "title": {
      "en": "Ainu: a language isolate, Kayano Shigeru, and the 0.7%",
      "ja": "アイヌ語：孤立言語と萱野茂、そして0.7%"
    },
    "summary": {
      "en": "Ainu, once spoken across Hokkaido, southern Sakhalin and the Kurils, has no proven relatives. Kayano Shigeru took it into the Diet in 1994. Japan recognised the Ainu as an indigenous people in a 2008 resolution and a 2019 law, and a 2017 survey found 0.7% of Ainu respondents could hold a conversation in it.",
      "ja": "かつて北海道・南樺太・千島で話されたアイヌ語には、系統関係の証明された言語がない。萱野茂は1994年にこの言葉を国会に持ち込んだ。2008年の決議と2019年の法律でアイヌは先住民族と位置づけられたが、2017年の調査でアイヌ語で会話ができると答えたのは回答者の0.7%だった。"
    },
    "body": {
      "en": "<p>In Ainu, <em>aynu</em> means \"human being\", and the language is <em>aynu itak</em>, \"human speech\". It was spoken in three main varieties: on Hokkaido, in the southern half of Sakhalin, and in small communities on the Kuril Islands. Sakhalin Ainu ended with <strong>Asai Take</strong> (Ainu name Tahkonanna), born on 5 April 1902 on Sakhalin's west coast. She died in a Sapporo hospital on 30 April 1994, and Hokkaido Ainu is now the only variety left.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ain\">🔍 Show Ainu on the map</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"person\" data-codes=\"ain,ja,niv\">💬 Compare \"person\" in Ainu, Japanese and Nivkh</button>\n</div>\n\n<h3>No proven relatives</h3>\n<p>Ainu is a <strong>language isolate</strong>. Japanese to the south and Nivkh across the strait on Sakhalin are its neighbours, and it is related to neither. The map shows that Ainu <em>aynu</em> and Nivkh <em>nivx</em> both name the people and also mean \"person\", while Japanese has <em>hito</em>. Researchers have tried to link Ainu to other families. James Patrie (1982) argued that it belonged with the \"Altaic\" languages, and most specialists have since rejected that. In 1993 Alexander Vovin reconstructed Proto-Ainu and put forward a possible link to Austroasiatic, which he himself called preliminary. No relationship has been demonstrated.</p>\n\n<p>Ainu is polysynthetic, building long words by incorporating nouns into verbs, and it has five vowels: <em>i e a o u</em>. Its word for the bear differs by region. Sakhalin Ainu has <em>iso</em>. In Hokkaido the bear is <em>kamuy</em> \"god\" or <em>kimun kamuy</em> \"god of the mountains\", and the map shows <em>kimun kamuy</em>. Ordinary katakana cannot write a syllable-final consonant, so Ainu katakana has small letters for them (<em>ㇰ ㇱ ㇳ ㇻ</em>), encoded in Unicode at U+31F0–31FF.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"bear\" data-code=\"ain\">💬 See the word for \"bear\"</button>\n</div>\n\n<h3>Kayano Shigeru</h3>\n<p><strong>Kayano Shigeru</strong> (萱野茂) was born on 15 June 1926 in Nibutani (二風谷), in the town of Biratori in Hokkaido's Saru district. In 1972 he opened the Nibutani Ainu Culture Museum to house the objects he had collected, and in 2002 1,121 of them were designated an Important Tangible Folk Cultural Property. He founded an Ainu language school in Nibutani in 1983, and in October 1987 he began an Ainu course on STV Radio named after the greeting <em>irankarapte</em>. Sanseido published his dictionary, <em>Kayano Shigeru no Ainu-go Jiten</em>, in 1996.</p>\n\n<p>In August 1994 Kayano took a Japan Socialist Party seat in the House of Councillors that had fallen vacant when Matsumoto Eiichi died. He was the first Ainu member of the Diet. On 24 November 1994 he asked his questions in the Councillors' Cabinet Committee, and through the committee's directors he had arranged to speak part of his time in Ainu. In 1993 he had also sued over the land expropriated for the Nibutani Dam. In March 1997 the Sapporo District Court declined to cancel the order because the dam was already finished, but it found the expropriation unlawful, held that the state had neglected Ainu culture, and recognised the Ainu as an indigenous people.</p>\n\n<h3>From \"former aborigines\" to an indigenous people</h3>\n<p>The Hokkaido Former Aborigines Protection Act of 1899 remained in force until 1997, when the Ainu Culture Promotion Act replaced it. On 6 June 2008 both houses of the Diet unanimously passed a resolution asking the government to recognise the Ainu as an indigenous people of the northern Japanese archipelago, especially Hokkaido, with their own language, religion and culture. That day Chief Cabinet Secretary Machimura Nobutaka said the government recognised the Ainu as indigenous. The law enacted on 19 April 2019 put this into statute. Article 1 calls the Ainu the indigenous people of the northern Japanese archipelago, especially Hokkaido, and Article 2 lists the Ainu language first in its definition of Ainu culture. In July 2020 the national centre Upopoy opened in Shiraoi.</p>\n\n<h3>How many speakers</h3>\n<p>Hokkaido's 2017 survey counted 13,118 Ainu in the prefecture. Of the 671 Ainu who answered the questionnaire, 0.7% (about five people) said they could hold a conversation in Ainu. When the government answered a question from Councillor Kami Tomoko in December 2020, it cited that figure and said it does not know how many people speak the language.</p>",
      "ja": "<p>アイヌ語で<em>アイヌ</em>（aynu）は「人間」を意味し、言語は<em>アイヌ・イタㇰ</em>（aynu itak）、「人間の言葉」と呼ばれる。おもな方言は三つあり、北海道、樺太（サハリン）南部、千島列島の小さな集落で話されていた。樺太方言の最後の話者は<strong>浅井タケ</strong>（アイヌ名タㇵコナンナ）だった。1902年4月5日に樺太西海岸で生まれ、1994年4月30日に札幌の病院で亡くなった。現在残っているのは北海道方言だけである。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ain\">🔍 地図でアイヌ語を見る</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"person\" data-codes=\"ain,ja,niv\">💬 アイヌ語・日本語・ニヴフ語の「人」を比べる</button>\n</div>\n\n<h3>証明された親戚はいない</h3>\n<p>アイヌ語は<strong>孤立言語</strong>である。南の日本語とも、海峡を挟んで樺太にいるニヴフ語とも隣り合っているが、どちらとも系統関係はない。地図を見ると、アイヌ語の <em>aynu</em> もニヴフ語の <em>nivx</em> も民族名であると同時に「人」という意味の語で、日本語は <em>hito</em> である。ほかの語族と結びつける説も出されてきた。ジェームズ・パトリー（1982年）はアイヌ語を「アルタイ諸語」に含めたが、今ではほとんどの専門家がこれを退けている。アレキサンダー・ボビン（1993年）はアイヌ祖語を再建し、オーストロアジア語族との関係を示唆したが、本人もまだ仮説の段階だとしていた。系統関係はいまも証明されていない。</p>\n\n<p>アイヌ語は名詞を動詞に取り込んで長い語を作る抱合語で、母音は <em>i e a o u</em> の五つである。クマを指す語は地域によって違う。樺太方言では<em>イソ</em>（iso）という。北海道ではクマを<em>カムイ</em>「神」や<em>キムンカムイ</em>「山の神」と呼び、地図に出るのは<em>キムンカムイ</em>である。普通のカタカナでは音節末の子音を書けないため、アイヌ語には <em>ㇰ ㇱ ㇳ ㇻ</em> のような小書きの仮名があり、Unicode では U+31F0–31FF に収録されている。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"bear\" data-code=\"ain\">💬 「クマ」を表す語を見る</button>\n</div>\n\n<h3>萱野茂</h3>\n<p><strong>萱野茂</strong>（かやの・しげる）は1926年6月15日、北海道沙流郡平取町の二風谷（にぶたに）に生まれた。1972年、集めた民具を展示するために二風谷アイヌ文化資料館を開き、その収集品のうち1,121点は2002年に重要有形民俗文化財に指定された。1983年に二風谷アイヌ語塾を開き、1987年10月にはSTVラジオで、あいさつの言葉から名を取ったアイヌ語講座「イランカラプテ」を始めた。1996年には三省堂から『萱野茂のアイヌ語辞典』が出ている。</p>\n\n<p>1994年8月、萱野は松本英一議員の死去で空いた日本社会党の参議院議席に繰り上げ当選した。アイヌ民族として初めての国会議員である。同年11月24日、参議院内閣委員会で質問に立ち、理事会を通じて申し入れたうえで、持ち時間の一部をアイヌ語で話した。これより前の1993年には、二風谷ダム建設のための土地収用をめぐって裁判を起こしていた。1997年3月、札幌地裁はダムがすでに完成していることを理由に収用裁決を取り消さなかったが、収用を違法とし、国がアイヌ文化への配慮を怠ったと認め、アイヌ民族を先住民族と判断した。</p>\n\n<h3>「旧土人」から先住民族へ</h3>\n<p>1899年の北海道旧土人保護法は、1997年にアイヌ文化振興法に置き換えられるまで効力を持っていた。2008年6月6日、衆参両院はそれぞれ全会一致で「アイヌ民族を先住民族とすることを求める決議」を採択した。アイヌを日本列島北部周辺、とりわけ北海道に先住し、独自の言語・宗教・文化を持つ先住民族として認めるよう政府に求める内容で、同じ日に町村信孝官房長官が、政府としてアイヌを先住民族と認識するとの見解を示した。2019年4月19日に成立したアイヌ施策推進法は、これを法律の条文にした。第1条はアイヌの人々を「日本列島北部周辺、とりわけ北海道の先住民族」と明記し、第2条はアイヌ文化の定義の筆頭にアイヌ語を挙げている。2020年7月には白老町に民族共生象徴空間ウポポイが開業した。</p>\n\n<h3>話者は何人いるのか</h3>\n<p>北海道の2017年の生活実態調査によると、道内のアイヌの人口は13,118人だった。アンケートに答えた671人のうち、アイヌ語で「会話ができる」と答えたのは0.7%、およそ5人である。2020年12月、紙智子参議院議員の質問主意書への答弁書で、政府はこの数字を引用し、アイヌ語話者の人数は把握していないと答えた。</p>"
    },
    "sources": [
      {
        "text": "House of Councillors (2008). アイヌ民族を先住民族とすることを求める決議 (Resolution calling for recognition of the Ainu as an indigenous people), adopted 6 June 2008.",
        "url": "https://www.sangiin.go.jp/japanese/gianjoho/ketsugi/169/080606-2.html"
      },
      {
        "text": "Cabinet of Japan (2020). 答弁書 内閣参質二〇三第二七号 (reply to Councillor Kami Tomoko on Ainu-language speakers, citing the 2017 Hokkaido Ainu Living Conditions Survey), 15 December 2020.",
        "url": "https://www.sangiin.go.jp/japanese/joho1/kousei/syuisyo/203/touh/t203027.htm"
      },
      {
        "text": "National Diet Library, Diet minutes: House of Councillors Cabinet Committee, 131st Diet, No. 7, 24 November 1994 (Kayano Shigeru's questions).",
        "url": "https://kokkai.ndl.go.jp/txt/113114889X00719941124"
      },
      {
        "text": "e-Gov Laws (2019). アイヌの人々の誇りが尊重される社会を実現するための施策の推進に関する法律 (Act No. 16 of 2019), Articles 1–2.",
        "url": "https://laws.e-gov.go.jp/law/431AC0000000016"
      }
    ]
  },
  {
    "id": "arabic-diglossia",
    "icon": "🕌",
    "tags": [
      "arabic",
      "diglossia",
      "sociolinguistics",
      "dialects"
    ],
    "title": {
      "en": "Two Arabics in one mouth: Ferguson's diglossia",
      "ja": "一人の話し手に二つのアラビア語：ファーガソンの「ダイグロシア」"
    },
    "summary": {
      "en": "A news anchor in Cairo says 'tomorrow' as ghadan and goes home to say bukra. In 1959 Charles Ferguson used Arabic as a core case for a split he called diglossia: one variety for writing and formal speech that nobody learns at home, and another that everyone speaks.",
      "ja": "カイロのニュースキャスターは放送で「明日」をガダンと言い、家に帰るとブクラと言う。1959年、チャールズ・ファーガソンはアラビア語を中心例に挙げ、この使い分けを「ダイグロシア」と呼んだ。書き言葉と改まった場で使い、家庭では誰も身につけない変種と、誰もが日常で話す変種の二本立てである。"
    },
    "body": {
      "en": "<p>On the evening news in Cairo, 'tomorrow' is <em>ghadan</em> (غدًا). In the same newsreader's kitchen it is <em>bukra</em>. In Baghdad the kitchen word is <em>bāchir</em>, and in Rabat it is <em>ghadda</em>. Every Arabic-speaking child grows up speaking a local variety at home and learns Modern Standard Arabic (MSA) at school. MSA is the language of newspapers, sermons, laws and broadcast news. Nobody acquires it as a mother tongue.</p><h3>Ferguson's four cases</h3><p>The American linguist Charles A. Ferguson described this arrangement in an article titled simply 'Diglossia', published in the journal <em>Word</em> in 1959 (vol. 15, pp. 325–340). He built the concept on four speech communities: Arabic (Classical/Standard vs. the colloquials), Modern Greek (Katharevousa vs. Dimotiki), Swiss German (Standard German vs. Schwyzertüütsch) and Haiti (French vs. Haitian Creole). He called the formal variety H (high) and the everyday one L (low). He defined diglossia as \"a relatively stable language situation\" in which the H variety is learned through formal education and used for writing and formal speech, but not for ordinary conversation by any part of the community.</p><p>Ferguson did not invent the word. The Greek writer Emmanuel Rhoides used <em>diglōssía</em> in this sense in 1885, the Greek-French linguist Ioannis Psycharis turned it into French as <em>diglossie</em>, and the Arabist William Marçais applied it to Arabic in a 1930 article, 'La diglossie arabe'. What Ferguson added was a comparative framework: what H and L each do, how they are learned, and why the arrangement can last for centuries.</p><h3>Paired words</h3><p>One of Ferguson's markers of diglossia is a set of paired words for everyday ideas, where choosing one member marks the whole sentence as H or L. His Arabic example for 'see' was H <em>raʾā</em> versus L <em>šāf</em>. The question words and time words that people use most often show the same split across the region:</p><ul><li><strong>'what'</strong>: MSA <em>mādhā</em> / <em>mā</em>; Egyptian <em>ʾēh</em>; Levantine <em>šū</em>; Iraqi <em>šinu</em>; Moroccan <em>āš</em> or <em>šnu</em></li><li><strong>'now'</strong>: MSA <em>al-ʾān</em>; Egyptian <em>dilwaʾti</em>; Levantine <em>halla(ʾ)</em>; Gulf <em>alḥīn</em>; Moroccan <em>dāba</em>; Tunisian <em>tawwa</em></li></ul><p>The map shows the same pattern for basic vocabulary. 'Good' is <em>jayyid</em> in MSA but <em>kwayyis</em> in Egypt, <em>mnīḥ</em> in the Levant, <em>zēn</em> in Iraq and the Gulf, and <em>mzyān</em> in Morocco. 'Two' is <em>ithnān</em> in MSA, <em>itnēn</em> in Cairo, but <em>jūj</em> in Morocco and <em>zūz</em> in Tunisia.</p><h3>Not broken Classical</h3><p>In Ferguson's account, speakers regard H as superior and L as a corrupted form of it. The forms above show regular development instead. Maghrebi <em>jūj</em>/<em>zūz</em> continue Classical <em>zawj</em> 'pair'. Egyptian and Levantine <em>bukra</em> comes from <em>bukra</em> 'early morning', and Iraqi and Gulf <em>bāchir</em> from <em>bākir</em> 'early', with the same <em>k</em>→<em>ch</em> shift that turns <em>kalb</em> 'dog' into Gulf <em>chalb</em>. Ferguson also reported that educated Arabs may insist they never use L, although direct observation shows they use it constantly in ordinary conversation.</p><p>The two-level model has also been refined. In 1973 the Egyptian linguist El-Said Badawi described five levels in Egypt: the Classical Arabic of the religious heritage (<em>fuṣḥā al-turāth</em>), contemporary standard Arabic (<em>fuṣḥā al-ʿaṣr</em>), the colloquial of the educated (<em>ʿāmmiyyat al-muthaqqafīn</em>), the colloquial of the literate (<em>ʿāmmiyyat al-mutanawwirīn</em>) and the colloquial of the illiterate (<em>ʿāmmiyyat al-ummiyyīn</em>). Maltese shows what happens without an H variety on top. It descends from medieval Siculo-Arabic, has been written in Latin letters with its own standard, and has no MSA above it: 'two' is <em>tnejn</em> and 'yesterday' is <em>lbieraħ</em>, words that exist in writing only in Maltese's Latin spelling, never in Arabic script.</p><div class=\"trivia-actions\"><button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ar,ar_eg,ar_iq,ar_ma,ar_tn\" data-word=\"tomorrow\">⚖️ Compare 'tomorrow': Standard, Egyptian, Iraqi, Moroccan, Tunisian</button><button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ar,ar_eg,ar_lev,ar_gulf,ar_ma\" data-word=\"good\">⚖️ Compare 'good' across five Arabics</button><button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ar,ar_eg,ar_ma,ar_tn,mt\" data-word=\"two\">⚖️ Compare 'two', from ithnān to zūz</button></div>",
      "ja": "<p>カイロの夜のニュースでは、「明日」は<em>ガダン</em>（غدًا）と言う。ところが同じキャスターが自宅の台所で使う言葉は<em>ブクラ</em>だ。バグダードの台所なら<em>バーチル</em>、ラバトなら<em>ガッダ</em>になる。アラビア語圏の子どもは家庭で地元の口語を話して育ち、学校で現代標準アラビア語（MSA）を学ぶ。新聞、説教、法律、放送ニュースで使われるのはMSAだが、これを母語として身につける人はいない。</p><h3>ファーガソンの四つの事例</h3><p>この状況を記述したのが、アメリカの言語学者チャールズ・A・ファーガソンである。論文の題はそのまま「Diglossia」で、1959年に学術誌『Word』に掲載された（第15巻、325〜340頁）。ファーガソンは四つの言語共同体をもとにこの概念を組み立てた。アラビア語（古典語・標準語と各地の口語）、現代ギリシャ語（カサレヴサとディモティキ）、スイスドイツ語（標準ドイツ語とスイスドイツ語）、ハイチ（フランス語とハイチ・クレオール語）である。改まった変種をH（高位）、日常の変種をL（低位）と呼び、ダイグロシアを\"a relatively stable language situation\"（比較的安定した言語状況）と定義した。H変種は学校教育で習得され、書き言葉や改まった話し言葉に使われるが、共同体のどの層も日常会話には使わない、というものである。</p><p>この語を作ったのはファーガソンではない。ギリシャの作家エマヌイル・ロイディスが1885年に<em>diglōssía</em>をこの意味で使い、ギリシャ出身でフランスで活動した言語学者イオアニス・プシハリスがフランス語の<em>diglossie</em>とした。アラビア語に当てはめたのはアラビア学者ウィリアム・マルセで、1930年の論文「La diglossie arabe」においてである。ファーガソンが加えたのは比較の枠組みだった。HとLがそれぞれ何に使われ、どう習得されるのか、そしてこの二本立てがなぜ何世紀も続きうるのかを整理したのである。</p><h3>対になる単語</h3><p>ファーガソンはダイグロシアの目印の一つに、身近な概念を表す単語の対を挙げた。どちらを選ぶかで、文全体がHかLかが決まってしまう。アラビア語の例として示したのが「見る」で、Hでは<em>ラアー</em>（raʾā）、Lでは<em>シャーフ</em>（šāf）である。よく使う疑問詞や時の言葉にも、地域全体で同じ分かれ方が見られる。</p><ul><li><strong>「何」</strong>：MSA <em>マーザー</em>／<em>マー</em>、エジプト <em>エー</em>（ʾēh）、レバント <em>シュー</em>、イラク <em>シヌ</em>、モロッコ <em>アーシュ</em>または<em>シュヌ</em></li><li><strong>「今」</strong>：MSA <em>アルアーン</em>、エジプト <em>ディルワッティ</em>、レバント <em>ハッラ</em>、湾岸 <em>アルヒーン</em>、モロッコ <em>ダーバ</em>、チュニジア <em>タウワ</em></li></ul><p>地図上の基礎語彙にも同じ傾向が出ている。「良い」はMSAでは<em>ジャイイド</em>だが、エジプトでは<em>クワイイス</em>、レバントでは<em>ムニーフ</em>、イラクと湾岸では<em>ゼーン</em>、モロッコでは<em>ムズヤーン</em>になる。「二」はMSAが<em>イスナーン</em>、カイロが<em>イトネーン</em>なのに対し、モロッコでは<em>ジュージュ</em>、チュニジアでは<em>ズーズ</em>と言う。</p><h3>「崩れた古典語」ではない</h3><p>ファーガソンの記述では、話し手はHを優れたものとみなし、Lをその崩れた形と考えている。しかし上の語形をたどると、規則的な変化の結果であることがわかる。マグリブの<em>ジュージュ</em>／<em>ズーズ</em>は古典語の<em>ザウジュ</em>（「対」）の後継形だ。エジプトやレバントの<em>ブクラ</em>は「早朝」を意味する<em>ブクラ</em>に由来する。イラクと湾岸の<em>バーチル</em>は「早い」の<em>バーキル</em>から来ており、ここで起きたk→chの変化は、湾岸で「犬」<em>カルブ</em>が<em>チャルブ</em>になったのと同じものである。ファーガソンはまた、教養あるアラブ人がLなど一切使わないと言い張ることがあるが、実際に観察すると日常会話でいつも使っている、と報告している。</p><p>二層モデル自体もその後精密になった。1973年、エジプトの言語学者サイード・バダウィはエジプトのアラビア語に五つの層を認めた。宗教的伝統の古典アラビア語（<em>フスハー・アッ＝トゥラース</em>）、現代の標準語（<em>フスハー・アル＝アスル</em>）、教養人の口語（<em>アーンミーヤト・アル＝ムサッカフィーン</em>）、識字層の口語（<em>アーンミーヤト・アル＝ムタナウウィリーン</em>）、非識字層の口語（<em>アーンミーヤト・アル＝ウンミーイーン</em>）である。上にH変種を持たない場合の例がマルタ語である。マルタ語は中世のシチリア・アラビア語の流れをくみ、ラテン文字による独自の標準を持ち、上位にMSAがない。「二」は<em>トネイン</em>（tnejn）、「昨日」は<em>リビーラハ</em>（lbieraħ）で、これらの語はマルタ語のラテン文字表記でのみ書かれ、アラビア文字で書かれることはない。</p><div class=\"trivia-actions\"><button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ar,ar_eg,ar_iq,ar_ma,ar_tn\" data-word=\"tomorrow\">⚖️ 「明日」を比較：標準語・エジプト・イラク・モロッコ・チュニジア</button><button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ar,ar_eg,ar_lev,ar_gulf,ar_ma\" data-word=\"good\">⚖️ 五つのアラビア語で「良い」を比較</button><button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ar,ar_eg,ar_ma,ar_tn,mt\" data-word=\"two\">⚖️ 「二」を比較：イスナーンからズーズまで</button></div>"
    },
    "sources": [
      {
        "text": "Charles A. Ferguson (1959), 'Diglossia', Word 15(2): 325–340 (Taylor & Francis), doi:10.1080/00437956.1959.11659702",
        "url": "https://www.tandfonline.com/doi/abs/10.1080/00437956.1959.11659702"
      },
      {
        "text": "Wikipedia, 'Diglossia' (history of the term: Rhoides 1885 in the prologue to Parerga, Psycharis's French diglossie, Marçais 1930, Ferguson 1959; Ferguson's four cases)",
        "url": "https://en.wikipedia.org/wiki/Diglossia"
      },
      {
        "text": "Wikipédia (fr), 'Diglossie' (citing William Marçais (1930), 'La diglossie arabe', L'Enseignement public – Revue pédagogique 104(12): 401–409)",
        "url": "https://fr.wikipedia.org/wiki/Diglossie"
      },
      {
        "text": "El-Said Badawi (1973), Mustawayāt al-ʿarabiyya al-muʿāṣira fī Miṣr: baḥth fī ʿalāqat al-lugha bi-l-ḥaḍāra (Levels of Contemporary Arabic in Egypt), Cairo: Dār al-Maʿārif; see Wikipedia, 'El-Said Badawi' (five levels of Egyptian Arabic)",
        "url": "https://en.wikipedia.org/wiki/El-Said_Badawi"
      }
    ]
  },
  {
    "id": "greek-language-question",
    "icon": "🏛️",
    "tags": [
      "greek",
      "diglossia",
      "language-policy",
      "standardization",
      "orthography"
    ],
    "title": {
      "en": "Katharevousa and Demotic: the Greek language question",
      "ja": "カサレヴサとディモティキ：ギリシャの「言語問題」"
    },
    "summary": {
      "en": "For 150 years Greece wrote one Greek and spoke another. A Gospel translation set off riots in 1901 in which at least eight people died, a staged Aeschylus caused more in 1903, and the dispute ended only with a 1976 education law and a 1982 reform that took away most of the accent marks.",
      "ja": "ギリシャでは150年にわたり、書くギリシャ語と話すギリシャ語が別物だった。1901年には福音書の口語訳をめぐる暴動で少なくとも8人が死亡し、1903年にはアイスキュロスの上演で再び衝突が起きた。この争いが決着したのは1976年の教育法と、アクセント記号の大半を廃した1982年の改革によってである。"
    },
    "body": {
      "en": "<p>Ask a Greek shop for water and you say <strong>νερό</strong> (<em>neró</em>). Until 1976 a water-supply notice, a court ruling or a school textbook would have used <strong>ὕδωρ</strong> (<em>hýdōr</em>), the word Plato used. Modern Greek had two written standards. <strong>Dimotikí</strong> (Demotic) was the language people spoke. <strong>Katharévousa</strong> (\"the purifying one\") was a learned register that put back ancient endings, ancient vocabulary and the full system of accents and breathings. Both were pronounced as Modern Greek, so the ancient-looking ὕδωρ was read [ˈiðor].</p>\n<h3>A compromise that became a camp</h3>\n<p>The idea goes back to Adamantios Korais (1748–1833), a Paris-based scholar. He wanted to correct the vernacular toward its ancient roots without reviving Ancient Greek itself. After independence the new state adopted the purified style for law, administration, the press and the university, and the gap hardened into what Charles Ferguson would cite in 1959 as one of his four textbook cases of <em>diglossia</em>. The demoticist side gained a manifesto in 1888 with Yannis Psycharis's <em>Το ταξίδι μου</em> (<em>My Journey</em>), a travel book written entirely in the spoken language.</p>\n<h3>1901: the Gospel riots</h3>\n<p>On 9 September 1901 (Julian calendar) the Athens newspaper <em>Akropolis</em> began serialising a Demotic translation of the Gospel of Matthew by Alexandros Pallis, a Liverpool-based follower of Psycharis. Queen Olga had already published a Gospel translation in a more conservative Modern Greek in February of that year, without the approval of the Holy Synod. Conservative papers called Pallis's version blasphemy, and in early November students stormed the <em>Akropolis</em> offices. On 8 November (21 November in the Gregorian calendar), remembered as \"Black Thursday\", troops fired on demonstrators and <strong>at least eight people were killed</strong>; some accounts give eleven. Prime Minister Georgios Theotokis's government resigned, and Metropolitan Prokopios of Athens was forced out. The Church then banned translations of the Bible into Demotic. The current Constitution of 1975 still forbids an official translation of Scripture without the approval of the Church of Greece and the Patriarchate of Constantinople (Article 3, paragraph 3).</p>\n<h3>1903: the Oresteia riots</h3>\n<p>In November 1903 the Royal Theatre in Athens staged Aeschylus's <em>Oresteia</em> in a modernised prose translation by Georgios Sotiriadis. Students led by Georgios Mistriotis, a professor at the University of Athens, rallied to stop the performances. Accounts of the toll differ: the Archive of Performances of Greek and Roman Drama at Oxford records one young demonstrator killed and several wounded, while Greek histories give two dead and seven injured when soldiers fired on the crowd on 8 November.</p>\n<p>In 1911 the revised constitution added Article 107: \"Επίσημος γλώσσα του Κράτους είναι εκείνη, εις την οποίαν συντάσσονται το πολίτευμα και της ελληνικής νομοθεσίας τα κείμενα· πάσα προς παραφθοράν ταύτης επέμβασις απαγορεύεται.\" In English: the official language is the one the constitution and the laws are written in, and any interference aimed at corrupting it is forbidden. For the next 65 years school policy kept changing with the government. Venizelos's 1917 reform brought Demotic into primary schools, the 1964 Papandreou reform extended it, and the 1967–1974 military junta restored Katharevousa in the classroom.</p>\n<h3>1976 and 1982</h3>\n<p>Law 309 of 30 April 1976, passed under education minister Georgios Rallis, made Demotic the language of education at every level. The law itself was still drafted in Katharevousa, and it defined Demotic as Modern Greek \"without regionalisms and extremes\". In January 1982 parliament passed an amendment, proposed by education minister Lefteris Verivakis, that replaced the polytonic script, with its three accents and two breathings, with the <strong>monotonic</strong> system: one accent mark, the <em>tónos</em>, and, with a few exceptions such as ή \"or\", nothing on one-syllable words.</p>\n<p>The map keeps the three layers side by side. Ancient Greek and Katharevousa share ἰχθύς \"fish\", οἶνος \"wine\" and ὀφθαλμός \"eye\", but read them with different sounds: [ikʰtʰy̌ːs] in the ancient language and [ixˈθis] in Katharevousa. Demotic says ψάρι, κρασί and μάτι. Words that never diverged, such as δύο \"two\" and γάλα \"milk\", are spelled the same in all three, apart from the accent marks.</p>\n<div class=\"trivia-actions\"><button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"el_grc,el_kath,el\" data-word=\"water\">⚖️ Compare Ancient Greek, Katharevousa and Demotic</button><button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"fish\" data-code=\"el_kath\">💬 Show \"fish\": ἰχθύς or ψάρι</button><button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"el_kath\">🔍 Open Katharevousa</button></div>",
      "ja": "<p>ギリシャの店で水を頼むなら<strong>νερό</strong>（ネロ）と言う。ところが1976年までは、水道の告知も判決文も教科書も<strong>ὕδωρ</strong>（ヒュドール）と書いていた。プラトンが使ったのと同じ語である。近代ギリシャ語には書き言葉の規範が二つあった。一つは人々が実際に話す<strong>ディモティキ</strong>（民衆語）。もう一つは<strong>カサレヴサ</strong>（「純正語」）で、古典の語尾と語彙を復活させ、アクセント記号と気息記号もすべてそろえた学識語だった。どちらも発音は近代ギリシャ語なので、古代風のὕδωρも[ˈiðor]と読まれた。</p>\n<h3>折衷案から党派へ</h3>\n<p>発想の源はパリで活動した学者アダマンティオス・コライス（1748–1833）にある。古代ギリシャ語そのものを復活させるのではなく、口語を古代の語源に沿って正すという構想だった。独立後の国家はこの純正体を法律・行政・新聞・大学の言葉として採用し、二つの言葉の溝は固定化した。1959年にチャールズ・ファーガソンが「ダイグロシア（二言語変種併用）」の典型例として挙げた四つの事例の一つがこのギリシャ語である。民衆語派は1888年、ヤニス・プシハリスの旅行記『わが旅』（<em>Το ταξίδι μου</em>）を得る。全編を話し言葉で書き通した、いわば宣言書だった。</p>\n<h3>1901年：福音書暴動</h3>\n<p>1901年9月9日（ユリウス暦）、アテネの新聞『アクロポリス』が、プシハリスの信奉者でリヴァプールに住む実業家アレクサンドロス・パリスによるマタイ福音書の民衆語訳の連載を始めた。同じ年の2月にはオルガ王妃も、聖シノドの承認を得ないまま、より保守的な近代ギリシャ語による福音書訳を出版していた。保守系の新聞はパリス訳を冒涜と攻撃し、11月初めには学生が『アクロポリス』の社屋に押し寄せた。11月8日（グレゴリオ暦では21日）、「黒い木曜日」と呼ばれる日に軍がデモ隊へ発砲し、<strong>少なくとも8人が死亡した</strong>（11人とする資料もある）。ゲオルギオス・セオトキス首相の内閣は総辞職し、アテネ府主教プロコピオスも辞任に追い込まれた。教会はその後、聖書の民衆語訳を禁じた。現行の1975年憲法も第3条第3項で、ギリシャ正教会とコンスタンティノープル総主教庁の承認なしに聖書を公式に翻訳することを禁じている。</p>\n<h3>1903年：オレステイア暴動</h3>\n<p>1903年11月、アテネの王立劇場がゲオルギオス・ソティリアディスによる現代語の散文訳でアイスキュロスの『オレステイア』を上演した。アテネ大学教授ゲオルギオス・ミストリオティスに率いられた学生たちが、上演阻止を叫んで集会を開いた。犠牲者の数は資料によって異なる。オックスフォード大学のギリシャ・ローマ劇上演アーカイブ（APGRD）は若いデモ参加者1人の死亡と数人の負傷を記録し、ギリシャ側の史書は11月8日に兵士が群衆に発砲して2人が死亡、7人が負傷したとしている。</p>\n<p>1911年の憲法改正では第107条が加わった。「Επίσημος γλώσσα του Κράτους είναι εκείνη, εις την οποίαν συντάσσονται το πολίτευμα και της ελληνικής νομοθεσίας τα κείμενα· πάσα προς παραφθοράν ταύτης επέμβασις απαγορεύεται.」国家の公用語は憲法と法令が書かれている言語であり、それを崩そうとする介入は一切禁じる、という趣旨である。その後65年間、学校の言語は政権が替わるたびに揺れ動いた。1917年のヴェニゼロス改革で小学校に民衆語が入り、1964年のパパンドレウ改革でその範囲が広がったが、1967〜1974年の軍事政権が教室にカサレヴサを戻した。</p>\n<h3>1976年と1982年</h3>\n<p>1976年4月30日の法律第309号は、ゲオルギオス・ラリス教育相のもとで成立し、民衆語をあらゆる段階の教育の言語と定めた。法律の条文そのものはまだカサレヴサで書かれており、民衆語を「地方的な語法と極端さを排した」近代ギリシャ語と規定している。1982年1月には、レフテリス・ヴェリヴァキス教育相が提案した修正条項が議会で可決され、三種のアクセントと二種の気息記号を持つ多調式表記が<strong>単調式</strong>に切り替えられた。記号はアクセント符号（トノス）一つだけで、「または」のήなど少数の例外を除き、一音節語には付けない。</p>\n<p>地図では三つの層を並べて見られる。古代ギリシャ語とカサレヴサは「魚」のἰχθύς、「ワイン」のοἶνος、「目」のὀφθαλμόςを共有しているが、読み方が違う。古代語では[ikʰtʰy̌ːs]、カサレヴサでは[ixˈθis]である。民衆語ではψάρι、κρασί、μάτιと言う。「二」のδύοや「乳」のγάλαのように一度も分かれなかった語は、アクセント記号を除けば三つとも同じ綴りになる。</p>\n<div class=\"trivia-actions\"><button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"el_grc,el_kath,el\" data-word=\"water\">⚖️ 古代ギリシャ語・カサレヴサ・民衆語を比べる</button><button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"fish\" data-code=\"el_kath\">💬 「魚」を表示：ἰχθύςかψάριか</button><button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"el_kath\">🔍 カサレヴサを開く</button></div>"
    },
    "sources": [
      {
        "text": "Peter Mackridge (2009), Language and National Identity in Greece, 1766–1976, Oxford University Press",
        "url": "https://global.oup.com/academic/product/language-and-national-identity-in-greece-1766-1976-9780199599059"
      },
      {
        "text": "Philip Carabott (1993), \"Politics, Orthodoxy and the Language Question in Greece: The Gospel Riots of November 1901\", Journal of Mediterranean Studies 3(1): 117–138"
      },
      {
        "text": "Centre for the Greek Language / Portal for the Greek Language, text of Article 107 of the 1911 Constitution",
        "url": "https://www.greek-language.gr/greekLang/studies/history/thema_18/pop40.html"
      },
      {
        "text": "Archive of Performances of Greek and Roman Drama (APGRD), University of Oxford, \"Oresteia (1903)\", Royal Theatre, Athens",
        "url": "https://www.apgrd.ox.ac.uk/productions/production/506"
      }
    ]
  },
  {
    "id": "haitian-creole",
    "icon": "🇭🇹",
    "tags": [
      "creole",
      "haiti",
      "french",
      "tense-aspect",
      "orthography"
    ],
    "title": {
      "en": "Haitian Creole: French words on a grammar French does not have",
      "ja": "ハイチ・クレオール語：フランス語の単語、フランス語にない文法"
    },
    "summary": {
      "en": "Most Haitian Creole words come from French, but its tenses are built from small particles like te, ap and pral, and its articles come after the noun. Since 1987 it has been an official language of Haiti alongside French.",
      "ja": "ハイチ・クレオール語の語彙はほとんどがフランス語由来だが、時制は te・ap・pral といった小さな助詞で表し、冠詞は名詞の後ろに置く。1987年からはフランス語と並ぶハイチの公用語である。"
    },
    "body": {
      "en": "<p><strong>Haitian Creole</strong> (<em>Kreyòl ayisyen</em>) is the first language of nearly everyone born in Haiti. In her survey for the Atlas of Pidgin and Creole Language Structures (2013), Dominique Fattier counted about 9.5 million speakers in Haiti and some 2 million more in the diaspora, mainly in the United States, Canada (above all Quebec), the Dominican Republic and France's overseas territories in the Lesser Antilles and Guiana. With Haiti's population now near 12 million, the total is about 12 million or more. French, the other official language, is spoken by a minority educated in it: Fattier puts the share of Haitians bilingual in French at about 7%.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ht\">🔍 Open Haitian Creole</button>\n</div>\n\n<h3>French words, reshaped</h3>\n\n<p>Most of the vocabulary goes back to the French of colonial Saint-Domingue, but the words were taken from speech, not spelling, and often with the article stuck on. <em>Dlo</em> \"water\" is <em>de l'eau</em>, <em>dife</em> \"fire\" is <em>du feu</em>, <em>lalin</em> \"moon\" is <em>la lune</em>, <em>lapli</em> \"rain\" is <em>la pluie</em>, <em>lanmou</em> \"love\" is <em>l'amour</em>. Front rounded vowels became unrounded, so <em>lune</em> /lyn/ gives <em>-lin</em> and <em>deux</em> /dø/ gives <em>de</em>. The other French-lexifier creoles of the Caribbean and the Indian Ocean fused the same articles on: the map has <em>lalin</em> in Guadeloupean Creole and <em>lalinn</em> in Mauritian, against French <em>lune</em>.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"fr,ht,gcf,mfe\" data-word=\"moon\">⚖️ Compare \"moon\" in French and three creoles</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"rain\" data-code=\"ht\">💬 See \"rain\" across languages</button>\n</div>\n\n<h3>A grammar of particles</h3>\n\n<p>The verb never changes form. Where French conjugates <em>manger</em> through dozens of endings, Haitian has one form, <em>manje</em>, and places markers before it:</p>\n\n<ul>\n<li><em>Mwen manje</em> — \"I ate / I have eaten\" (a bare action verb reads as completed)</li>\n<li><em>Mwen te manje</em> — \"I had eaten\" (<em>te</em>, anterior)</li>\n<li><em>M ap manje</em> — \"I am eating\" or \"I will eat\" (<em>ap</em>, progressive and future)</li>\n<li><em>M pral manje</em> — \"I am going to eat\" (<em>pral</em>, a contraction ending in <em>al</em> \"go\", usually traced to French <em>pour aller</em>)</li>\n<li><em>M t ap manje</em> — \"I was eating\" (<em>te</em> + <em>ap</em>)</li>\n</ul>\n\n<p>The markers come from French words — <em>te</em> from <em>été</em>, <em>ap</em> from <em>après</em> as in regional French <em>être après faire</em> \"be in the middle of doing\", and the future marker <em>va</em> / <em>a</em> from <em>va</em> \"goes\" (some derive <em>a</em> from <em>avoir à</em>) — but the system they form, with free-standing particles in a fixed order, has no counterpart in French. With an adjective no verb \"to be\" is needed: <em>Li malad</em> \"he/she is sick\", <em>Li te malad</em> \"he/she was sick\". The pronoun <em>li</em> covers \"he\", \"she\" and \"it\". The definite article follows the noun: <em>kay la</em> \"the house\", <em>chen an</em> \"the dog\" (the article takes a nasal form after a nasal), and <em>kay yo</em> \"the houses\", where <em>yo</em> is also the word for \"they\". Possessors follow too: <em>kay mwen</em> \"my house\".</p>\n\n<h3>Where the grammar came from</h3>\n\n<p>Linguists disagree about this. Claire Lefebvre, in <em>Creole Genesis and the Acquisition of Grammar</em> (1998), argued that enslaved speakers of <strong>Fon</strong> and related Gbe languages of present-day Benin relexified their own grammar with French words, and she matched Haitian constructions to Fon ones, including the postposed determiner. Michel DeGraff rejects relexification and, in a 2005 paper in <em>Language in Society</em>, argued against any view that treats creoles as a separate, exceptional class of language, such as John McWhorter's 2001 proposal that creole grammars are the world's simplest. The common description of Haitian as \"broken French\" fits neither side: the particle system above is stable and rule-governed, and French speakers who have not learned it do not follow ordinary Haitian speech.</p>\n\n<h3>Spelling and status</h3>\n\n<p>Before the current system, two others were tried: the McConnell–Laubach orthography of the 1940s and the Faublas–Pressoir orthography, which grew out of Charles-Fernand Pressoir's proposal of 1947. The spelling now used was developed for the Institut Pédagogique National (IPN) and made official in 1979, during the education reform led by minister Joseph C. Bernard; a law of 18 September 1979 allowed Creole to be used as a language of teaching in schools. The IPN spelling has one letter or digraph per sound and no silent letters: <em>ch</em> is /ʃ/, the grave accent marks open <em>è</em> and <em>ò</em>, and French <em>oiseau</em> is written <em>zwazo</em>. Article 5 of the 1987 Constitution reads, in its English translation, \"All Haitians are united by a common language: Creole. Creole and French are the official languages of the Republic.\" Article 213 of the same constitution provided for a Haitian academy to fix the language, and the <em>Akademi Kreyòl Ayisyen</em> was set up in 2014.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ht,fr,fon\">⚖️ Compare Haitian Creole, French and Fon</button>\n</div>",
      "ja": "<p><strong>ハイチ・クレオール語</strong>（<em>Kreyòl ayisyen</em>）は、ハイチに生まれたほぼすべての人の母語である。ドミニク・ファティエは『ピジン・クレオール言語構造地図』（APiCS、2013年）の概説で、ハイチ国内の話者を約950万人、在外話者をさらに約200万人と見積もった。在外話者が多いのは米国、カナダ（とくにケベック）、ドミニカ共和国、そして小アンティル諸島とギアナのフランス海外領である。ハイチの人口はいまや1,200万人近くに達しており、話者の総数は約1,200万人かそれ以上になる。もう一つの公用語であるフランス語を話すのは、フランス語で教育を受けた少数の人々で、ファティエはフランス語との二言語話者をハイチ人の約7％としている。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ht\">🔍 ハイチ・クレオール語を開く</button>\n</div>\n\n<h3>形を変えたフランス語の単語</h3>\n\n<p>語彙の大半は植民地時代のサン＝ドマングで話されていたフランス語にさかのぼる。ただし単語は綴りからではなく話し言葉から取り込まれ、冠詞ごとくっついた形で入ったものも多い。<em>dlo</em>「水」は <em>de l'eau</em>、<em>dife</em>「火」は <em>du feu</em>、<em>lalin</em>「月」は <em>la lune</em>、<em>lapli</em>「雨」は <em>la pluie</em>、<em>lanmou</em>「愛」は <em>l'amour</em> から来ている。円唇の前舌母音は円唇性を失い、<em>lune</em> /lyn/ は <em>-lin</em> に、<em>deux</em> /dø/ は <em>de</em> になった。カリブ海とインド洋のほかのフランス語系クレオールも同じように冠詞を取り込んでいる。マップでもフランス語の <em>lune</em> に対し、グアドループ・クレオール語は <em>lalin</em>、モーリシャス・クレオール語は <em>lalinn</em> だ。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"fr,ht,gcf,mfe\" data-word=\"moon\">⚖️ フランス語と3つのクレオールで「月」を比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"rain\" data-code=\"ht\">💬 各言語の「雨」を見る</button>\n</div>\n\n<h3>助詞で組み立てる文法</h3>\n\n<p>動詞の形は一切変わらない。フランス語の <em>manger</em> は何十もの語尾で活用するが、ハイチ語では <em>manje</em> の一形だけで、その前に標識を置く。</p>\n\n<ul>\n<li><em>Mwen manje</em>——「私は食べた／食べてしまった」（動作動詞は裸のままだと完了の意味になる）</li>\n<li><em>Mwen te manje</em>——「私は（その時までに）もう食べていた」（<em>te</em>：前時）</li>\n<li><em>M ap manje</em>——「私は食べている」または「食べるつもりだ」（<em>ap</em>：進行・未来）</li>\n<li><em>M pral manje</em>——「私はこれから食べる」（<em>pral</em>：<em>al</em>「行く」で終わる縮約形で、ふつうフランス語の <em>pour aller</em> にさかのぼるとされる）</li>\n<li><em>M t ap manje</em>——「私は食べているところだった」（<em>te</em>＋<em>ap</em>）</li>\n</ul>\n\n<p>標識そのものはフランス語の単語に由来する。<em>te</em> は <em>été</em>、<em>ap</em> は地方フランス語の <em>être après faire</em>「〜している最中だ」の <em>après</em>、未来の <em>va</em>／<em>a</em> は「行く」の <em>va</em> から来た（<em>a</em> を <em>avoir à</em> から導く説もある）。しかし、独立した助詞が決まった順に並ぶというこの仕組みは、フランス語には存在しない。形容詞の文にはbe動詞がいらない。<em>Li malad</em>「彼（彼女）は病気だ」、<em>Li te malad</em>「彼（彼女）は病気だった」。代名詞 <em>li</em> は「彼」「彼女」「それ」をすべて兼ねる。定冠詞は名詞の後ろに来る。<em>kay la</em>「その家」、<em>chen an</em>「その犬」（鼻音の後では冠詞も鼻音形になる）、そして <em>kay yo</em>「それらの家」。この <em>yo</em> は「彼ら」という代名詞でもある。所有者も後ろに置き、<em>kay mwen</em> で「私の家」となる。</p>\n\n<h3>文法はどこから来たのか</h3>\n\n<p>この点で言語学者の見解は分かれている。クレール・ルフェーヴルは『Creole Genesis and the Acquisition of Grammar』（1998年）で、現在のベナンにあたる地域から連れてこられた<strong>フォン語</strong>などグベ諸語の話者が、自分たちの文法にフランス語の単語をはめ込んだ（再語彙化した）と論じ、後置される限定詞を含め、ハイチ語の構文をフォン語の構文と一つずつ対応させた。ミシェル・デグラフは再語彙化説を退け、2005年に『Language in Society』誌に発表した論文で、クレオールを例外的な別種の言語として扱う見方全般を批判した。その批判の対象には、クレオールの文法は世界で最も単純だというジョン・マクウォーターの2001年の主張も含まれる。ハイチ語を「崩れたフランス語」とする俗説は、どちらの立場とも合わない。上で見た助詞の体系は安定した規則に従っており、この言語を学んだことのないフランス語話者には、ふつうのハイチ語の会話は聞き取れない。</p>\n\n<h3>正書法と公用語化</h3>\n\n<p>現在の綴りの前に、二つの正書法が試された。1940年代のマコネル＝ラウバック式と、シャルル＝フェルナン・プレソワールが1947年に出した案から生まれたフォーブラ＝プレソワール式である。いま使われている綴りは国立教育研究所（IPN）のために作られたもので、教育相ジョゼフ・C・ベルナールによる教育改革のさなかの1979年に公式のものとされた。1979年9月18日の法律によって、学校でクレオール語を教授言語として使うことが認められた。IPN式は一つの音に一つの文字か二重字を当て、黙字を持たない。<em>ch</em> は /ʃ/ を表し、開いた <em>è</em>・<em>ò</em> は抑音符で示す。フランス語の <em>oiseau</em>「鳥」は <em>zwazo</em> と書く。1987年憲法の第5条は「すべてのハイチ人は一つの共通の言語、クレオール語によって結ばれる。クレオール語とフランス語は共和国の公用語である」と定めた（英訳からの訳）。同じ憲法の第213条はクレオール語を規範化するアカデミーの設立を定め、2014年に <em>Akademi Kreyòl Ayisyen</em>（ハイチ・クレオール語アカデミー）が発足した。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ht,fr,fon\">⚖️ ハイチ・クレオール語、フランス語、フォン語を比べる</button>\n</div>"
    },
    "sources": [
      {
        "text": "Fattier, Dominique (2013). \"Haitian Creole\" (survey chapter). In Michaelis, Maurer, Haspelmath & Huber (eds.), Atlas of Pidgin and Creole Language Structures Online (APiCS). Max Planck Institute for Evolutionary Anthropology.",
        "url": "https://apics-online.info/contributions/49"
      },
      {
        "text": "Lefebvre, Claire (1998). Creole Genesis and the Acquisition of Grammar: The Case of Haitian Creole. Cambridge University Press.",
        "url": "https://doi.org/10.1017/CBO9780511519819"
      },
      {
        "text": "DeGraff, Michel (2005). \"Linguists' most dangerous myth: The fallacy of Creole Exceptionalism.\" Language in Society 34(4): 533–591.",
        "url": "https://doi.org/10.1017/S0047404505050207"
      },
      {
        "text": "Constitution of Haïti (1987), Articles 5 and 213 (English translation). Wikisource.",
        "url": "https://en.wikisource.org/wiki/Constitution_of_Ha%C3%AFti_(1987)"
      }
    ]
  },
  {
    "id": "afrikaans-from-dutch",
    "icon": "🦓",
    "tags": [
      "afrikaans",
      "dutch",
      "language contact",
      "south africa",
      "negation"
    ],
    "title": {
      "en": "Afrikaans: how the Dutch of the Cape became a language of its own",
      "ja": "アフリカーンス語：ケープのオランダ語が独立した言語になるまで"
    },
    "summary": {
      "en": "Afrikaans grew out of the Dutch brought to the Cape in 1652, shaped by Malay, Portuguese and Khoekhoe speakers. It was first written in Arabic script by Cape Muslims, became an official language in 1925, and says \"not\" twice.",
      "ja": "1652年にケープへ持ち込まれたオランダ語から生まれ、マレー語・ポルトガル語・コイコイ語の話し手によって形づくられた言語。最初はケープのムスリムがアラビア文字で書き、1925年に公用語となった。否定の「nie」を二度言う言語でもある。"
    },
    "body": {
      "en": "<p>In 1652 Jan van Riebeeck set up a supply station for the Dutch East India Company at Table Bay. The settlers spoke 17th-century Dutch, mostly from Holland. Within a few generations the colony also held Khoekhoe herders, enslaved people from Indonesia, India, Madagascar and East Africa, and a trade jargon of Malay and Portuguese. The result, <strong>Afrikaans</strong>, is now the language spoken most often at home by 10.6 percent of South Africans (2022 census), and in the 2011 census more of its home speakers were classified as Coloured than as white.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"af,nl,nl_be\">⚖️ Compare Afrikaans with Dutch and Belgian Dutch</button>\n</div>\n\n<h3>Dutch words, worn down</h3>\n<p>Most of the vocabulary is Dutch, but the sounds have moved. Final <em>-t</em> after a consonant dropped: Dutch <em>nacht</em> \"night\" is Afrikaans <em>nag</em>. A <em>g</em> or <em>d</em> between vowels disappeared: <em>regen</em> \"rain\" became <em>reën</em>, <em>vogel</em> \"bird\" became <em>voël</em>. Some meanings shifted too: the everyday word for \"stone\" is <em>klip</em>, which in Dutch means a cliff or rock face, and the ordinary word for \"head\" is <em>kop</em>, which in Dutch is the word for an animal's head and the informal word for a person's, beside formal <em>hoofd</em>.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"rain\" data-code=\"af\">💬 See \"rain\": Dutch regen, Afrikaans reën</button>\n</div>\n\n<p>The other languages of the Cape left their own layer. From Malay come <em>piesang</em> \"banana\" (Malay <em>pisang</em>) and <em>baadjie</em> \"jacket\" (<em>baju</em>); from Portuguese, <em>kraal</em> \"livestock pen\" (<em>curral</em>); from Khoekhoe, <em>gogga</em> \"insect\" and <em>kwagga</em>, the striped zebra that English borrowed as <em>quagga</em>. The last quagga died in Amsterdam's Artis zoo in 1883.</p>\n\n<h3>One verb form for every person</h3>\n<p>Dutch conjugates <em>ik ben, jij bent, hij is, wij zijn</em>. Afrikaans says <em>ek is, jy is, hy is, ons is</em>: one form for every person and number. The pronoun \"we\" is itself <em>ons</em>, which in Dutch is the object form \"us\". The simple past is almost gone; \"I saw\" is <em>ek het gesien</em>, literally \"I have seen\", and only a handful of verbs keep an old past form, among them <em>was</em>, <em>kon</em>, <em>wou</em>, <em>sou</em> and <em>moes</em>. The infinitive lost its ending as well: Dutch <em>eten</em> \"to eat\", Afrikaans <em>eet</em>.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"we\" data-code=\"af\">💬 See \"we\" across languages</button>\n</div>\n\n<h3>Saying \"not\" twice</h3>\n<p>Afrikaans negation brackets the clause: <em>Ek is <strong>nie</strong> moeg <strong>nie</strong></em> \"I am not tired\", <em>Hy het <strong>nie</strong> gekom <strong>nie</strong></em> \"He did not come\". When the two would stand side by side they merge into one, so \"I don't smoke\" is just <em>Ek rook nie</em>. Standard Dutch has a single <em>niet</em>. Where the second <em>nie</em> came from is disputed. Paul Roberge (2000) traced it to the reanalysis of an emphatic Dutch pattern during language shift by Khoekhoe and enslaved speakers; Arthur Bell, in a 2000 conference paper, argued for direct Khoesan interference.</p>\n\n<h3>First written in Arabic letters</h3>\n<p>The first texts written in the new language were not Dutch-spelled at all. Muslim teachers in Cape Town wrote Afrikaans in a modified Arabic script for religious instruction. The earliest reported text, <em>Hidāyat al-Islām</em>, is dated 1845, but its manuscript is lost; the oldest surviving manuscript dates from 1868. Abu Bakr Effendi, a scholar sent by the Ottoman sultan Abdülaziz who reached the Cape in January 1863, wrote <em>Bayān al-Dīn</em> (\"Exposition of the Religion\"), which the Ottoman Ministry of Education printed in Istanbul in 1877. Seventy-four Arabic-Afrikaans texts survive.</p>\n\n<p>The Latin-script movement started in Paarl in 1875 with the Genootskap van Regte Afrikaners, whose newspaper <em>Die Afrikaanse Patriot</em> appeared from 1876. The Official Languages of the Union Act of 1925 declared that the word \"Dutch\" in the 1909 South Africa Act included Afrikaans, backdated to 1910. A full Afrikaans Bible followed in 1933, and the 1961 constitution named English and Afrikaans as the official languages.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"af\">🔍 Open Afrikaans</button>\n</div>",
      "ja": "<p>1652年、ヤン・ファン・リーベックがオランダ東インド会社の補給基地をテーブル湾に築いた。入植者が話していたのは、おもにホラント地方の17世紀オランダ語である。数世代のうちに植民地にはコイコイ人の牧畜民、インドネシア・インド・マダガスカル・東アフリカから連れてこられた奴隷が加わり、マレー語とポルトガル語の交易用ことばも使われていた。こうして生まれた<strong>アフリカーンス語</strong>は、2022年の国勢調査で南アフリカ人の10.6%が家庭で最もよく使う言語と答えている。2011年の国勢調査では、家庭言語とする人のうち「カラード」に分類された人のほうが白人より多かった。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"af,nl,nl_be\">⚖️ アフリカーンス語をオランダ語・ベルギーのオランダ語と比べる</button>\n</div>\n\n<h3>すり減ったオランダ語の単語</h3>\n<p>語彙の大部分はオランダ語由来だが、音が変わっている。子音のあとの語末の<em>-t</em>が落ち、オランダ語<em>nacht</em>「夜」はアフリカーンス語で<em>nag</em>になった。母音にはさまれた<em>g</em>や<em>d</em>も消え、<em>regen</em>「雨」は<em>reën</em>、<em>vogel</em>「鳥」は<em>voël</em>になった。意味がずれた語もある。「石」を表す日常語<em>klip</em>はオランダ語では崖や岩壁のことだ。「頭」を表すふつうの語<em>kop</em>は、オランダ語では動物の頭を指し、人の頭についてはくだけた言い方で、改まった語は<em>hoofd</em>である。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"rain\" data-code=\"af\">💬 「雨」を見る：オランダ語regen、アフリカーンス語reën</button>\n</div>\n\n<p>ケープのほかの言語も、それぞれ語彙の層を残した。マレー語からは<em>piesang</em>「バナナ」（マレー語<em>pisang</em>）や<em>baadjie</em>「上着」（<em>baju</em>）、ポルトガル語からは<em>kraal</em>「家畜の囲い」（<em>curral</em>）、コイコイ語からは<em>gogga</em>「虫」や、英語が<em>quagga</em>として借りたシマウマの一種<em>kwagga</em>が入った。最後のクアッガは1883年、アムステルダムのアルティス動物園で死んだ。</p>\n\n<h3>人称を問わない一つの動詞形</h3>\n<p>オランダ語は<em>ik ben, jij bent, hij is, wij zijn</em>と活用する。アフリカーンス語では<em>ek is, jy is, hy is, ons is</em>で、人称・数にかかわらず形は一つだ。「私たち」の<em>ons</em>自体、オランダ語では目的格「私たちを」の形である。単純過去もほぼ消え、「私は見た」は<em>ek het gesien</em>（英語の I have seen にあたる完了形）と言う。古い過去形を保つのは<em>was</em>、<em>kon</em>、<em>wou</em>、<em>sou</em>、<em>moes</em>など一握りの動詞だけだ。不定詞の語尾もなくなり、オランダ語<em>eten</em>「食べる」はアフリカーンス語で<em>eet</em>である。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"we\" data-code=\"af\">💬 「私たち」を各言語で見る</button>\n</div>\n\n<h3>「ない」を二度言う</h3>\n<p>アフリカーンス語の否定は節を前後からはさむ。<em>Ek is <strong>nie</strong> moeg <strong>nie</strong></em>「私は疲れていない」、<em>Hy het <strong>nie</strong> gekom <strong>nie</strong></em>「彼は来なかった」。二つが隣り合う場合は一つにまとまり、「私はたばこを吸わない」は<em>Ek rook nie</em>だけになる。標準オランダ語の否定は<em>niet</em>一つである。二つ目の<em>nie</em>の起源には異論がある。ポール・ロバージ（2000年）は、コイコイ人や奴隷の話し手が言語を乗り換える過程で、オランダ語の強調表現が再解釈されたものとした。アーサー・ベルは2000年の学会発表で、コイサン諸語の直接の干渉を主張した。</p>\n\n<h3>最初はアラビア文字で書かれた</h3>\n<p>この新しい言語で書かれた最初の文書は、オランダ語式のつづりではなかった。ケープタウンのムスリムの教師たちが宗教教育のため、改変したアラビア文字でアフリカーンス語を書いたのである。記録上最古の文書『ヒダーヤト・アル＝イスラーム』は1845年の日付をもつが、写本は失われており、現存する最古の写本は1868年のものだ。オスマン帝国のスルタン、アブデュルアズィズが派遣し、1863年1月にケープに着いた学者アブー・バクル・エフェンディは『バヤーン・アッ＝ディーン』（宗教の解説）を著し、同書は1877年にオスマン帝国の教育省によってイスタンブールで印刷された。アラビア文字のアフリカーンス語文書は74点が現存している。</p>\n\n<p>ラテン文字での運動は、1875年にパールで結成された「真のアフリカーナー協会」（Genootskap van Regte Afrikaners）に始まり、1876年から機関紙『ディ・アフリカーンセ・パトリオット』が出た。1925年の連邦公用語法は、1909年南アフリカ法にいう「オランダ語」にはアフリカーンス語が含まれると定め、これを1910年にさかのぼって適用した。アフリカーンス語訳の聖書全巻は1933年に出版され、1961年の憲法は英語とアフリカーンス語を公用語とした。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"af\">🔍 アフリカーンス語を開く</button>\n</div>"
    },
    "sources": [
      {
        "text": "Roberge, Paul T. (2000). \"Etymological opacity, hybridization, and the Afrikaans brace negation.\" American Journal of Germanic Linguistics and Literatures 12(1): 101–176. Cambridge University Press.",
        "url": "https://www.cambridge.org/core/journals/journal-of-germanic-linguistics/article/etymological-opacity-hybridization-and-the-afrikaans-brace-negation/6F17412A1A4BFEB3A39F85AB7B774FD6"
      },
      {
        "text": "Official Languages of the Union Act, No. 8 of 1925 (Union of South Africa), full text. Wikisource.",
        "url": "https://en.wikisource.org/wiki/Official_Languages_of_the_Union_Act,_1925"
      },
      {
        "text": "\"Arabic Afrikaans\" (Wikipedia, citing Achmat Davids, The Arabic-Afrikaans Writing Tradition 1815–1915, and A. van Selms, ed., Abu Bakr se 'Uiteensetting van die Godsdiens', 1979).",
        "url": "https://en.wikipedia.org/wiki/Arabic_Afrikaans"
      },
      {
        "text": "Daily Maverick (10 October 2023). \"62,027,503 and counting: a visual gauge of the Census 2022 data\" (Statistics South Africa, Census 2022 language results).",
        "url": "https://www.dailymaverick.co.za/article/2023-10-10-62027503-and-counting-a-visual-gauge-of-the-census-2022-data/"
      }
    ]
  },
  {
    "id": "romani-indian-origins",
    "icon": "🎻",
    "tags": [
      "romani",
      "indo-aryan",
      "historical-linguistics",
      "language-contact",
      "greek"
    ],
    "title": {
      "en": "Romani: An Indian Language That Counts to Seven in Greek",
      "ja": "ロマニ語：「七」をギリシア語で数えるインドの言語"
    },
    "summary": {
      "en": "In 1782 Johann Rüdiger set Romani beside Hindustani and showed that the language of Europe's Roma came from India. The basic vocabulary still matches Hindi, and a layer of Byzantine Greek loanwords records where the language spent its early centuries.",
      "ja": "1782年、ヨハン・リューディガーはロマニ語をヒンドゥスターニー語と並べ、ヨーロッパのロマの言語がインドから来たことを示した。基礎語彙はいまもヒンディー語と対応し、ビザンツ期のギリシア語借用語が、この言語が初期の数世紀を過ごした場所を記録している。"
    },
    "body": {
      "en": "<p>Count from one to five in <strong>Romani</strong>: <em>jekh, duj, trin, štar, pandž</em>. In Hindi the same numbers are <em>ek, do, tīn, cār, pā̃c</em>. Romani is an <strong>Indo-Aryan</strong> language, a sister of Hindi and Punjabi. Its speakers, the Roma, have lived in Europe for centuries, from Spain and Finland to the Balkans and Russia. The match between the two lists is no coincidence. It runs through the basic vocabulary: <em>pani</em> \"water\" against Hindi <em>pānī</em>, <em>nakh</em> \"nose\" against <em>nāk</em>, <em>dand</em> \"tooth\" against <em>dā̃t</em>, <em>šel</em> \"hundred\" against Sanskrit <em>śatam</em>.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"rom,rmy,hi,sa\" data-word=\"five\">⚖️ Compare Romani, Vlax Romani, Hindi and Sanskrit</button>\n</div>\n\n<h3>Who made the connection</h3>\n\n<p>Before the 18th century, Europeans explained the Roma with legends. The English word <em>Gypsy</em> comes from \"Egyptian\", and the German <em>Zigeuner</em> and French <em>tsigane</em> go back to the Byzantine Greek <em>Atsinganoi</em>. The evidence against both stories came from the language. In 1777 <strong>Johann Christian Christoph Rüdiger</strong>, a scholar in Halle, wrote to his colleague Hartwig Bacmeister that Romani looked related to the languages of India. In 1782 he published an essay whose title means \"On the Indic language and origin of the Gypsies\". He had worked with a Sinti speaker, Barbara Makelin, and checked her forms against published grammars of Hindustani. As Yaron Matras has shown, this was the first grammatical outline of any Romani variety.</p>\n\n<p>One year later, in 1783, <strong>Heinrich Moritz Gottlieb Grellmann</strong> of Göttingen published <em>Die Zigeuner</em>. The book was translated into English and French, and its chapter on language took much of its material from Rüdiger without giving him credit. That is why Grellmann is usually named as the discoverer. Another story is told even more often: a Hungarian student, István Vályi, is said to have heard students from Malabar at Leiden and recognised their words. It got into print in 1776, in a Vienna periodical, but it cannot be confirmed. Ian Hancock found no record of Vályi at Leiden, the word list has never turned up, and the language of Malabar, Malayalam, is Dravidian and not related to Romani.</p>\n\n<h3>Same roots, regular changes</h3>\n\n<p>The correspondences are regular, and that is what makes them evidence. In Romani the old voiced aspirates <em>bh, dh, gh</em> became voiceless <em>ph, th, kh</em>. So Hindi <em>dūdh</em> \"milk\" matches Romani <em>thud</em>, and Hindi <em>ghar</em> \"house\" matches <em>kher</em>. Romani also keeps some consonant clusters that Hindi lost: <em>trin</em> \"three\" still has the <em>tr</em> of Sanskrit <em>trīṇi</em>, where Hindi has <em>tīn</em>. In 1926 Ralph Turner argued from such features that Romani began in central India and later moved to the northwest, where it picked up further changes before it left the subcontinent.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"rom,hi,sa\" data-word=\"milk\">⚖️ Compare \"milk\": thud and dūdh</button>\n</div>\n\n<h3>The route, in loanwords</h3>\n\n<p>Romani also carries words from the places it passed through. From Persian or Kurdish come <em>baxt</em> \"luck\" and <em>zor</em> \"strength\". From Armenian come <em>grast</em> \"horse\" and <em>bov</em> \"oven\". The largest layer is Greek. It includes <em>drom</em> \"road\" (from <em>drómos</em>), <em>kókalo</em> \"bone\", <em>fóros</em> \"town\" and <em>luludi</em> \"flower\". In many dialects the numerals seven, eight and nine are Greek too: <em>eftá, oxtó, enjá</em>. Of the Indic numerals, Romani keeps one to six, ten (<em>deš</em>), twenty (<em>biš</em>) and a hundred (<em>šel</em>). Romani also took Greek grammar. It borrowed endings such as <em>-os</em> for loan nouns and <em>-iz-</em> for loan verbs, and it put a definite article before the noun.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"rom,el,hi\" data-word=\"bone\">⚖️ Compare \"bone\": kokalo, κόκαλο and haḍḍī</button>\n</div>\n\n<p>Dialects as far apart as Welsh Romani and the Romani of the Balkans share these Greek words. That means the borrowing happened before the speakers split up, when they were living together in the Greek-speaking Byzantine Empire. Franz Miklosich drew this conclusion in the 1870s, and current work places this stage, called Early Romani, in Anatolia and the Balkans from about the 10th century CE. Exactly when the ancestors of the Roma left India is still open, because no record from India mentions their departure. The dating rests on the sound changes they share with, or lack from, the Indo-Aryan languages that stayed behind.</p>",
      "ja": "<p><strong>ロマニ語</strong>で一から五まで数えると、<em>jekh, duj, trin, štar, pandž</em>。ヒンディー語では <em>ek, do, tīn, cār, pā̃c</em> だ。ロマニ語は<strong>インド・アーリア語派</strong>の言語で、ヒンディー語やパンジャーブ語の姉妹にあたる。話し手のロマはスペインからフィンランド、バルカン半島、ロシアまで、ヨーロッパに何世紀も前から暮らしてきた。二つの数詞が似ているのは偶然ではなく、同じ対応が基礎語彙全体に見られる。「水」は <em>pani</em> とヒンディー語 <em>pānī</em>、「鼻」は <em>nakh</em> と <em>nāk</em>、「歯」は <em>dand</em> と <em>dā̃t</em>、「百」は <em>šel</em> とサンスクリット語 <em>śatam</em>。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"rom,rmy,hi,sa\" data-word=\"five\">⚖️ ロマニ語・ヴラフ系ロマニ語・ヒンディー語・サンスクリット語を比べる</button>\n</div>\n\n<h3>インドとのつながりに気づいた人々</h3>\n\n<p>18世紀まで、ヨーロッパの人々はロマの出自を伝説で説明していた。英語の <em>Gypsy</em> は「エジプト人」に由来し、ドイツ語の <em>Zigeuner</em> やフランス語の <em>tsigane</em> はビザンツ期のギリシア語 <em>Atsinganoi</em> にさかのぼる。どちらの説にも反する証拠は、言語のほうにあった。1777年、ハレの学者<strong>ヨハン・クリスティアン・クリストフ・リューディガー</strong>は、同僚のハルトヴィヒ・バクマイスターへの手紙に、ロマニ語はインドの言語と系統が同じらしいと書いた。1782年には「ジプシーのインド系の言語と起源について」という意味の題の論考を発表する。シンティの話者バルバラ・マケリンから語形を聞き取り、刊行されていたヒンドゥスターニー語の文法書と照らし合わせたものだった。ヤロン・マトラスが明らかにしたように、これはロマニ語のどの変種についても初めての文法概説である。</p>\n\n<p>翌1783年、ゲッティンゲンの<strong>ハインリヒ・モーリッツ・ゴットリープ・グレルマン</strong>が『ツィゴイナー』（<em>Die Zigeuner</em>）を出版した。この本は英語やフランス語にも訳されたが、言語を扱う章はリューディガーの論考から出典を示さずに材料を借りている。発見者としてグレルマンの名が挙がりがちなのはそのためだ。さらによく語られる話もある。ハンガリーの学生ヴァーリ・イシュトヴァーンが、ライデンでマラバール出身の学生たちの言葉を聞き、ロマの言葉だと気づいたというものだ。この話は1776年にウィーンの定期刊行物で活字になったが、裏づけは取れていない。イアン・ハンコックはヴァーリがライデンに在籍した記録を見つけられなかったし、その単語表も見つかっていない。そもそもマラバールの言語マラヤーラム語はドラヴィダ語族で、ロマニ語とは系統が違う。</p>\n\n<h3>同じ語根と規則的な音の変化</h3>\n\n<p>対応には規則性があり、だからこそ証拠になる。ロマニ語では、古い有声有気音 <em>bh, dh, gh</em> が無声有気音 <em>ph, th, kh</em> に変わった。そのためヒンディー語の <em>dūdh</em>「乳」にはロマニ語の <em>thud</em> が、<em>ghar</em>「家」には <em>kher</em> が対応する。また、ヒンディー語が失った子音連続をロマニ語は一部保っている。「三」の <em>trin</em> にはサンスクリット語 <em>trīṇi</em> の <em>tr</em> が残っているが、ヒンディー語では <em>tīn</em> になった。1926年、ラルフ・ターナーはこうした特徴をもとに、ロマニ語はインド中部で生まれ、のちに北西部へ移ってさらに変化を受けてから亜大陸を出た、と論じた。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"rom,hi,sa\" data-word=\"milk\">⚖️ 「乳」を比べる——thud と dūdh</button>\n</div>\n\n<h3>借用語でたどる道筋</h3>\n\n<p>ロマニ語には、通ってきた土地の言葉も入っている。ペルシア語かクルド語からは <em>baxt</em>「運」や <em>zor</em>「力」、アルメニア語からは <em>grast</em>「馬」や <em>bov</em>「かまど」。最も大きいのはギリシア語の層で、<em>drom</em>「道」（<em>drómos</em> から）、<em>kókalo</em>「骨」、<em>fóros</em>「町」、<em>luludi</em>「花」などがある。多くの方言では七・八・九もギリシア語で、<em>eftá, oxtó, enjá</em> という。インド系の数詞として残るのは一から六までと、十（<em>deš</em>）、二十（<em>biš</em>）、百（<em>šel</em>）である。ギリシア語からは文法も入った。借用名詞の語尾 <em>-os</em> や借用動詞の接辞 <em>-iz-</em> を取り入れ、定冠詞を名詞の前に置くようになった。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"rom,el,hi\" data-word=\"bone\">⚖️ 「骨」を比べる——kokalo・κόκαλο・haḍḍī</button>\n</div>\n\n<p>これらのギリシア語は、ウェールズのロマニ語からバルカンのロマニ語まで、遠く離れた方言に共通している。つまり借用が起きたのは話し手たちが分かれる前、ギリシア語圏のビザンツ帝国でまとまって暮らしていた時期だ。フランツ・ミクロシチは1870年代にこの結論を出しており、現在の研究では、初期ロマニ語と呼ばれるこの段階を10世紀ごろ以降のアナトリアとバルカンに置いている。ロマの祖先がいつインドを出たのかはまだ決着していない。その出立を記したインド側の記録がないからだ。年代の推定は、インドに残ったインド・アーリア諸語と共有する音変化、あるいは共有しない音変化を手がかりにしている。</p>"
    },
    "sources": [
      {
        "text": "Matras, Yaron (1999). \"Johann Rüdiger and the study of Romani in 18th century Germany.\" Journal of the Gypsy Lore Society, 5th series, 9: 89–116.",
        "url": "https://www.kratylos.org/~raphael/romani/downloads/2/Matras_Ruediger.pdf"
      },
      {
        "text": "Romani Project, University of Manchester. \"History of Romani Linguistics\" (Rüdiger 1777/1782, Grellmann 1783, Pott 1844–45, Miklosich 1872–80, Turner 1926).",
        "url": "https://www.kratylos.org/~raphael/romani/whatis/linguistics/history.html"
      },
      {
        "text": "Romani Project, University of Manchester. \"Early Romani\" (Iranian, Armenian and Greek loanwords; Greek numerals and morphology).",
        "url": "https://www.kratylos.org/~raphael/romani/whatis/language/earlyromani.html"
      },
      {
        "text": "Hancock, Ian (2009). \"Mind the Doors! The Contribution of Linguistics.\" In T. Acton & D. Le Bas (eds.), All Change! Romani Studies Through Romani Eyes. University of Hertfordshire Press.",
        "url": "https://eriac.org/wp-content/uploads/2021/12/Hancock-Ian-2009-Mind-the-Doors-The-Contribution-of-Linguistics.-in-Acton-T.-A.-Le-Bas-D.-eds.-All-Change-Romani-Studies-Through-Romani-Eyes-Papers-given-at-a-seminar-at-the-University-of-Greenwich-June.pdf"
      }
    ]
  },
  {
    "id": "yiddish",
    "icon": "📜",
    "tags": [
      "yiddish",
      "germanic",
      "hebrew-script",
      "jewish-languages",
      "language-contact"
    ],
    "title": {
      "en": "Yiddish: a Germanic language in Hebrew letters",
      "ja": "イディッシュ語：ヘブライ文字で書くゲルマン語"
    },
    "summary": {
      "en": "Yiddish has German grammar, Hebrew-Aramaic and Slavic vocabulary, and the Hebrew alphabet. It had an estimated 11–13 million speakers on the eve of the Second World War, and today lives mainly in Haredi communities.",
      "ja": "文法はドイツ語、語彙にはヘブライ語・アラム語とスラヴ語、文字はヘブライ文字。第二次世界大戦の直前には1,100万〜1,300万人が話していたと推定され、いまの話者は主にハレーディー（超正統派）の共同体にいる。"
    },
    "body": {
      "en": "<p><strong>Yiddish</strong> (ייִדיש, <em>yidish</em>, literally \"Jewish\") is the language of the Ashkenazi Jews. Its grammar and most of its basic vocabulary are Germanic: <em>vaser</em> \"water\", <em>hunt</em> \"dog\" and <em>esn</em> \"to eat\" match German <em>Wasser</em>, <em>Hund</em> and <em>essen</em>. It is written right to left in the Hebrew alphabet, and the oldest dated Yiddish sentence is a rhymed blessing in the Worms Mahzor of 1272. In <em>Yiddish: A Linguistic Introduction</em> (Cambridge, 2005), Neil G. Jacobs puts the number of speakers just before the Second World War at 11 to 13 million.</p>\n\n<h3>Four components</h3>\n<p>Max Weinreich's <em>History of the Yiddish Language</em> (Yiddish original 1973) treats Yiddish as a fusion of four components. The German component supplies most of the grammar. The Hebrew-Aramaic component, <em>loshn-koydesh</em> (\"the holy tongue\"), gives <em>shabes</em> \"Sabbath\", <em>emes</em> \"truth\" and <em>khokhme</em> \"wisdom\". A small Romance layer, which Weinreich traced to Jews who had spoken varieties of French and Italian, survives in <em>bentshn</em> \"to bless\" (Latin <em>benedicere</em>) and <em>leyenen</em> \"to read\" (Latin <em>legere</em>). The Slavic component came in as speakers moved east into Poland and Lithuania: <em>khreyn</em> \"horseradish\" (Polish <em>chrzan</em>), <em>nudnik</em> \"a bore\", <em>bobe</em> \"grandmother\" (Slavic <em>baba</em>).</p>\n<p>Where the German component came from is still argued over. Weinreich put the beginnings in the Rhineland. Other scholars argue for a Bavarian and Danubian base. Dovid Katz proposes contact between German speakers and Aramaic-speaking Jews from the Middle East. Paul Wexler's 1991 proposal, that Eastern Yiddish is a Slavic language whose vocabulary was swapped for German words, has found little support.</p>\n<p>The components also mix inside single words. The Hebrew plural <em>-im</em> goes onto German stems: <em>poyer</em> \"peasant\" (German <em>Bauer</em>) becomes <em>poyerim</em>, and <em>doktor</em> becomes <em>doktoyrim</em>. Hebrew words take Ashkenazi stress on the second-to-last syllable, so the toast \"to life\" is <em>lekhayim</em> [ləˈχaɪ̯əm] in Yiddish and [leχaˈjim] in Israeli Hebrew.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"yi,de,pl\" data-word=\"grandmother\">⚖️ Compare \"grandmother\" in Yiddish, German and Polish</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"yi,he\" data-word=\"cheers\">⚖️ Compare the toast in Yiddish and Hebrew</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"hello\" data-code=\"yi\">💬 Show the Yiddish greeting</button>\n</div>\n\n<h3>Two ways of spelling</h3>\n<p>Words of Germanic and Slavic origin are spelled by sound, and letters that are consonants in Hebrew serve as vowels: ע (ayin) is <em>e</em>, so עסן is <em>esn</em>; אָ is <em>o</em>; יי is <em>ey</em>. Words from Hebrew and Aramaic keep their Hebrew spelling, with consonants only: שבת <em>shabes</em>, אמת <em>emes</em>. Soviet authorities abolished this etymological spelling in 1920 and spelled Hebrew words by sound as well. In Soviet editions the pen name שלום־עליכם, Sholem Aleichem, became שאָלעמ־אלײכעמ. YIVO's spelling rules, first published in 1935 and now in a sixth edition of 1999, kept the Hebrew spellings. The map's Yiddish greeting is the same phrase as the pen name: <em>sholem-aleykhem</em>, \"peace be upon you\".</p>\n\n<h3>YIVO and the army-and-navy line</h3>\n<p>YIVO, the Yiddish Scientific Institute, was set up in 1925 on a proposal by Nokhem Shtif. A meeting in Vilna (then Wilno, Poland) approved it in March, and a conference in Berlin founded it formally in August. Max Weinreich directed its philological section, and its first office was a room in his Vilna apartment. Weinreich was in Denmark when war broke out in 1939. He reached New York in March 1940 and re-established YIVO there.</p>\n<p>In a speech of 5 January 1945, printed in <em>YIVO Bleter</em>, Weinreich recalled that a Bronx high-school teacher who attended his lectures had given him a definition: <em>a shprakh iz a dyalekt mit an armey un flot</em>, \"a language is a dialect with an army and navy\". The line is usually credited to Weinreich himself. By his own account, he was passing on what someone else had said.</p>\n\n<h3>Speakers today</h3>\n<p>Rutgers University's Jewish Studies department estimates that there are about 250,000 Yiddish speakers in the United States, about as many in Israel, and another 100,000 or so in the rest of the world. In 2014 YIVO said that most people who speak Yiddish in daily life are Hasidim and other Haredim. LangMap pins its Yiddish marker in New York City, where the Hasidic neighbourhoods of Williamsburg and Borough Park in Brooklyn use the language every day.</p>",
      "ja": "<p><strong>イディッシュ語</strong>（ייִדיש、<em>yidish</em>。字義は「ユダヤの」）は、アシュケナジム（中東欧系ユダヤ人）の言語である。文法と基礎語彙の大半はゲルマン系で、<em>vaser</em>「水」、<em>hunt</em>「犬」、<em>esn</em>「食べる」はドイツ語の <em>Wasser</em>、<em>Hund</em>、<em>essen</em> にそのまま対応する。書くときはヘブライ文字を右から左へ並べる。年代のわかる最古のイディッシュ語の一文は、1272年の「ヴォルムス・マハゾール」（祈祷書）に書き込まれた韻文の祝福だ。ニール・G・ジェイコブズは『Yiddish: A Linguistic Introduction』（ケンブリッジ大学出版局、2005年）で、第二次世界大戦直前の話者数を1,100万〜1,300万人と見積もっている。</p>\n\n<h3>四つの成分</h3>\n<p>マックス・ヴァインライヒは『イディッシュ語の歴史』（イディッシュ語原著1973年）で、イディッシュ語を四つの成分が融合したものとして扱った。文法の大部分はドイツ語成分から来ている。ヘブライ語・アラム語成分は <em>loshn-koydesh</em>（「聖なる言葉」）と呼ばれ、<em>shabes</em>「安息日」、<em>emes</em>「真実」、<em>khokhme</em>「知恵」などがこれにあたる。ロマンス語成分はわずかで、ヴァインライヒはフランス語系・イタリア語系の言葉を話していたユダヤ人にさかのぼるとした。<em>bentshn</em>「祝福する」（ラテン語 <em>benedicere</em>）や <em>leyenen</em>「読む」（ラテン語 <em>legere</em>）がその名残だ。スラヴ語成分は、話者がポーランドやリトアニアへ東進するなかで加わった。<em>khreyn</em>「西洋わさび」（ポーランド語 <em>chrzan</em>）、<em>nudnik</em>「うんざりさせる人」、<em>bobe</em>「祖母」（スラヴ語 <em>baba</em>）などである。</p>\n<p>ドイツ語成分がどこで生まれたかは、いまも決着していない。ヴァインライヒは起点をライン地方に置いた。バイエルンやドナウ流域を基盤とみる研究者もいる。ドヴィド・カッツは、ドイツ語話者と中東から来たアラム語話者のユダヤ人との接触を想定する。東イディッシュ語はもとはスラヴ語で、語彙だけがドイツ語に置き換わったとするポール・ウェクスラーの1991年の説は、ほとんど支持されていない。</p>\n<p>成分は一つの単語の中でも混ざる。ヘブライ語の複数語尾 <em>-im</em> がドイツ語の語幹にも付き、<em>poyer</em>「農民」（ドイツ語 <em>Bauer</em>）の複数は <em>poyerim</em>、<em>doktor</em>「医者」は <em>doktoyrim</em> になる。ヘブライ語由来の語はアシュケナジ式に後ろから二つ目の音節に強勢を置くので、乾杯の「命に」はイディッシュ語で <em>lekhayim</em> [ləˈχaɪ̯əm]、イスラエルのヘブライ語では [leχaˈjim] となる。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"yi,de,pl\" data-word=\"grandmother\">⚖️ 「祖母」をイディッシュ語・ドイツ語・ポーランド語で比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"yi,he\" data-word=\"cheers\">⚖️ 乾杯の言葉をイディッシュ語とヘブライ語で比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"hello\" data-code=\"yi\">💬 イディッシュ語のあいさつを表示</button>\n</div>\n\n<h3>二通りのつづり</h3>\n<p>ゲルマン系やスラヴ系の語は発音どおりにつづる。ヘブライ語では子音字である文字を母音字に使い、ע（アイン）は <em>e</em> なので עסן は <em>esn</em>、אָ は <em>o</em>、יי は <em>ey</em> を表す。一方、ヘブライ語・アラム語から来た語はヘブライ語のつづりを保ち、子音字だけで書く。שבת <em>shabes</em>、אמת <em>emes</em> がその例だ。ソヴィエト政権は1920年にこの語源的つづりを廃止し、ヘブライ語由来の語も発音どおりに書かせた。ソ連の刊本では、作家ショレム・アレイヘムの筆名 שלום־עליכם が שאָלעמ־אלײכעמ と書き換えられている。YIVO のつづり規則は1935年に初版が出て、現行は1999年の第6版だが、ヘブライ語のつづりを残した。地図に載っているイディッシュ語のあいさつも、この筆名と同じ <em>sholem-aleykhem</em>「あなたに平安を」である。</p>\n\n<h3>YIVO と「陸軍と海軍」の一言</h3>\n<p>YIVO（イディッシュ学術研究所）は、ノフム・シュティフの提案をもとに1925年に設立された。3月にヴィルナ（当時はポーランド領ヴィルノ）での会合が設立を承認し、8月にベルリンでの会議で正式に発足した。マックス・ヴァインライヒは言語部門を率い、最初の事務所はヴィルナにあった彼の自宅の一室だった。1939年に戦争が始まったとき、ヴァインライヒはデンマークにいた。1940年3月にニューヨークに着き、そこで YIVO を立て直した。</p>\n<p>1945年1月5日に行い『YIVO Bleter』に掲載された講演で、ヴァインライヒは、自分の講義に来ていたブロンクスの高校教師からある定義を聞かされたと振り返っている。<em>a shprakh iz a dyalekt mit an armey un flot</em>、「言語とは陸軍と海軍をもつ方言である」。この一言はふつうヴァインライヒ本人の言葉とされるが、彼自身の説明では、他人の言葉を伝えたにすぎない。</p>\n\n<h3>いまの話者</h3>\n<p>ラトガース大学ユダヤ学部の推計では、イディッシュ語の話者はアメリカに約25万人、イスラエルにほぼ同数、その他の地域に10万人ほどいる。YIVO は2014年に、日常生活でイディッシュ語を話す人の大半はハシディームをはじめとするハレーディーだと述べている。LangMap ではイディッシュ語のマーカーをニューヨーク市に置いている。ブルックリンのウィリアムズバーグやボロー・パークのハシディーム地区では、この言語が毎日使われている。</p>"
    },
    "sources": [
      {
        "text": "Jacobs, Neil G. (2005). Yiddish: A Linguistic Introduction. Cambridge University Press.",
        "url": "https://doi.org/10.1017/CBO9780511486555"
      },
      {
        "text": "Weinreich, Max (2008). History of the Yiddish Language, ed. Paul Glasser, trans. Shlomo Noble. YIVO Institute / Yale University Press (Yiddish original 1973).",
        "url": "https://yalebooks.yale.edu/book/9780300108873/history-of-the-yiddish-language/"
      },
      {
        "text": "Estraikh, Gennady (1999). Soviet Yiddish: Language Planning and Linguistic Development. Oxford University Press.",
        "url": "https://academic.oup.com/book/10811"
      },
      {
        "text": "Rutgers University, Department of Jewish Studies. \"Yiddish FAQs\".",
        "url": "https://jewishstudies.rutgers.edu/component/content/article/159-yiddish-faqs"
      }
    ]
  },
  {
    "id": "maltese-semitic-latin",
    "icon": "🇲🇹",
    "tags": [
      "maltese",
      "arabic",
      "semitic",
      "orthography",
      "language-contact"
    ],
    "title": {
      "en": "Maltese: Arabic grammar in Latin letters",
      "ja": "マルタ語：ラテン文字で書くアラビア語の文法"
    },
    "summary": {
      "en": "Maltese is the only Semitic language with official status in the European Union and the only one standardised in the Latin alphabet. Its grammar and core words come from medieval Sicilian-North African Arabic, and most of its dictionary from Sicily, Italy and England.",
      "ja": "マルタ語はEUの公用語で唯一のセム語であり、ラテン文字で標準化された唯一のセム語でもある。文法と基礎語彙は中世シチリア・北アフリカのアラビア語から来ているが、辞書の見出し語の多くはシチリア語・イタリア語・英語から入った。"
    },
    "body": {
      "en": "<p>On 1 May 2004, when Malta joined the European Union, <strong>Maltese</strong> became an official EU language. It is the only Semitic language with that status, and the only Semitic language whose standard form is written in the Latin alphabet. The alphabet has 30 letters, among them <em>ċ</em>, <em>ġ</em>, <em>ħ</em>, <em>ż</em>, the digraph <em>għ</em> and <em>ie</em>. Its modern spelling was set out in 1924 by the Għaqda tal-Kittieba tal-Malti, the Maltese writers' association. In 1934 Maltese replaced Italian as an official language of the colony, alongside English, and the 1964 independence constitution named it the national language.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"mt\">🔍 Open Maltese on the map</button>\n</div>\n\n<h3>Arabic underneath</h3>\n\n<p>The Aghlabid emirate of Ifriqiya took Malta in 870. The historian Joseph Brincat, reading the geographer al-Ḥimyarī, places a resettlement of the island from Sicily around 1048–49, so the Arabic that took root was the Arabic of Muslim Sicily and the Maghreb. The Norman count Roger I invaded in 1091, the island came under direct Norman rule in 1127, and Muslims had been expelled by 1249. After that the language survived only as a spoken vernacular among Christians, and it was written in Latin or Sicilian. The oldest known text in Maltese, Pietru Caxaro's poem <em>Il-Kantilena</em>, dates from before his death in 1485. Mikiel Fsadni found it in 1966 in the register of the notary Brandan Caxaro, and he and Godfrey Wettinger published it in 1968.</p>\n\n<p>The numbers on the map show the descent: <em>wieħed, tnejn, tlieta, erbgħa, ħamsa</em> against Modern Standard Arabic <em>wāḥid, ithnān, thalātha, arbaʿa, khamsa</em>, and <em>mija</em> \"hundred\" against <em>miʾa</em>. The spelling keeps the Arabic consonants that speech has worn down. <em>Q</em> is a glottal stop, so <em>qalb</em> \"heart\" is pronounced [ʔalp]. <em>Għ</em>, the old pharyngeal ʿayn, is now mostly silent and lengthens the vowel next to it: <em>għajn</em> \"eye\" is [ajn], Arabic <em>ʿayn</em>. Maltese <em>ħ</em> covers both Arabic <em>ḥ</em> and <em>kh</em>, which is why \"five\" is <em>ħamsa</em>.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"five\" data-codes=\"mt,ar,ar_tn\">⚖️ Compare Maltese, Standard Arabic and Tunisian Arabic</button>\n</div>\n\n<p>Some everyday words match North Africa rather than the standard language. \"Fish\" is <em>ħuta</em> in Maltese and <em>ḥūta</em> in Tunisian Arabic, where Standard Arabic has <em>samaka</em>. \"Cat\" is <em>qattus</em>, Tunisian <em>qaṭṭūs</em>. \"House\" is <em>dar</em>, as in Tunis and Morocco, not Standard Arabic <em>bayt</em>. In 2016 Slavomír Čéplö and colleagues published a pilot study in <em>Folia Linguistica</em> that tested how well the languages are understood across the gap, with 24 respondents in Malta, Tunis and Benghazi. Tunisian and Libyan speakers understood about 40 percent of spoken Maltese. Maltese speakers understood about 30 percent of the two Arabic varieties.</p>\n\n<h3>A Romance and English dictionary</h3>\n\n<p>Brincat counted the etymologies in Joseph Aquilina's <em>Maltese-English Dictionary</em>, which has about 41,000 entries. About 32 percent were Semitic, about 52 percent Sicilian and Italian, and about 6 percent English. <em>Grazzi</em> \"thanks\" is the Sicilian word unchanged, <em>rota</em> \"wheel\" matches Sicilian <em>rota</em>, and <em>kompjuter</em> is English respelled. Even <em>missier</em> \"father\" goes back to older Sicilian <em>misseri</em> \"sir\", not to Arabic. A dictionary count understates the Arabic share of running text, though, because pronouns, prepositions, numbers and basic verbs such as <em>kiel</em> \"ate\" and <em>xorob</em> \"drank\" are Semitic and they recur in every sentence.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"thanks\" data-code=\"mt\">💬 See \"thanks\" across languages</button>\n</div>\n\n<h3>The Phoenician theory</h3>\n\n<p>In the 18th century, Giovanni Pietro Francesco Agius de Soldanis and later Mikiel Anton Vassalli argued that Maltese descended from Punic, the Phoenician language of ancient Carthage. The idea is still repeated in Malta. The evidence does not support it. Maltese sound changes, verb patterns and vocabulary line up with medieval Maghrebi Arabic, and no feature has been shown to come from Punic rather than from Arabic, which is a closely related Semitic language. The Punic inscriptions found on the islands, among them the two Melqart cippi of the 2nd century BC, are many centuries older than the Aghlabid conquest.</p>",
      "ja": "<p>2004年5月1日、マルタのEU加盟とともに<strong>マルタ語</strong>はEUの公用語になった。EU公用語の中でセム語はマルタ語だけで、標準語をラテン文字で書くセム語もマルタ語だけである。アルファベットは30文字で、<em>ċ</em>・<em>ġ</em>・<em>ħ</em>・<em>ż</em>、二重字の<em>għ</em>と<em>ie</em>を含む。現行の正書法は1924年にマルタ語作家協会（Għaqda tal-Kittieba tal-Malti）が定めた。1934年にはイタリア語に代わって英語と並ぶ植民地の公用語となり、1964年の独立憲法で国語と定められた。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"mt\">🔍 地図でマルタ語を開く</button>\n</div>\n\n<h3>土台はアラビア語</h3>\n\n<p>870年、イフリーキヤのアグラブ朝がマルタを奪った。歴史家ジョゼフ・ブリンカットは地理学者ヒムヤリーの記述をもとに、1048〜49年ごろシチリアからの再入植があったと見ている。したがって根づいたのは、イスラーム期シチリアとマグリブのアラビア語だった。1091年にノルマンのルッジェーロ1世が島に侵攻し、1127年に島はノルマンの直接支配下に入り、1249年までにムスリムは追放された。以後この言語はキリスト教徒の話し言葉としてだけ残り、文書はラテン語かシチリア語で書かれた。現存最古のマルタ語テキストは、1485年に没したピエトル・カシャロが生前に書いた詩『イル・カンティレーナ』である。1966年、ミキエル・フサドニが公証人ブランダン・カシャロの記録簿の中から見つけ、1968年にゴドフリー・ウェッティンガーとともに公表した。</p>\n\n<p>地図の数詞を見れば系統はわかる。<em>wieħed, tnejn, tlieta, erbgħa, ħamsa</em>（1〜5）は、現代標準アラビア語の <em>wāḥid, ithnān, thalātha, arbaʿa, khamsa</em> に対応する。「100」も <em>mija</em> と <em>miʾa</em> だ。綴りには、発音では弱まったアラビア語の子音が残っている。<em>q</em> は声門閉鎖音で、<em>qalb</em>「心臓」は [ʔalp] と読む。<em>għ</em> はもとの咽頭音アインで、いまはほぼ無音になり、隣の母音を長くする。<em>għajn</em>「目」は [ajn] で、アラビア語の <em>ʿayn</em> にあたる。マルタ語の <em>ħ</em> はアラビア語の <em>ḥ</em> と <em>kh</em> の両方を引き継いでいるため、「5」は <em>ħamsa</em> になる。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"five\" data-codes=\"mt,ar,ar_tn\">⚖️ マルタ語・標準アラビア語・チュニジア語を比べる</button>\n</div>\n\n<p>日常語の中には、標準語ではなく北アフリカの方言と一致するものがある。「魚」はマルタ語で <em>ħuta</em>、チュニジア・アラビア語で <em>ḥūta</em> だが、標準アラビア語では <em>samaka</em> だ。「猫」は <em>qattus</em> で、チュニジアの <em>qaṭṭūs</em> と同じ。「家」の <em>dar</em> も、標準語の <em>bayt</em> ではなくチュニスやモロッコの語と一致する。2016年、スラヴォミール・チェープロらは『Folia Linguistica』に予備調査を発表し、マルタ・チュニス・ベンガジの回答者24人で相互理解度を実地に測った。チュニジアとリビアの話者は話されたマルタ語の約40%を理解し、マルタ語話者が理解できたのは両方言の約30%だった。</p>\n\n<h3>辞書はロマンス語と英語</h3>\n\n<p>ブリンカットは、約4万1千語を収めたジョゼフ・アクイリーナの『マルタ語英語辞典』の語源を数えた。セム系は約32%、シチリア語・イタリア語系は約52%、英語系は約6%だった。<em>grazzi</em>「ありがとう」はシチリア語そのままで、<em>rota</em>「車輪」もシチリア語の <em>rota</em> と同じ形、<em>kompjuter</em> は英語を綴り直したものだ。「父」の <em>missier</em> でさえ、アラビア語ではなく古いシチリア語の <em>misseri</em>「旦那」に由来する。ただし辞書の数え方では、実際の文章でのアラビア語の比重は過小に出る。代名詞、前置詞、数詞、<em>kiel</em>「食べた」や <em>xorob</em>「飲んだ」のような基本動詞はセム系で、どの文にも繰り返し現れるからだ。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"thanks\" data-code=\"mt\">💬 各言語の「ありがとう」を見る</button>\n</div>\n\n<h3>フェニキア語起源説</h3>\n\n<p>18世紀、ジョヴァンニ・ピエトロ・フランチェスコ・アジウス・デ・ソルダニス、続いてミキエル・アントン・ヴァッサッリが、マルタ語は古代カルタゴのフェニキア語、つまりポエニ語の子孫だと主張した。この説はいまもマルタで語られる。だが証拠はこれを支持しない。マルタ語の音変化・動詞の型・語彙は中世マグリブのアラビア語と対応している。同じセム語で近縁のアラビア語ではなくポエニ語から来たと示せた特徴は一つもない。島で見つかるポエニ語碑文は、前2世紀の2本のメルカルト石柱を含め、アグラブ朝の征服より何世紀も前のものだ。</p>"
    },
    "sources": [
      {
        "text": "Čéplö, S., Bátora, J., Benkato, A., Milička, J., Pereira, C. & Zemánek, P. (2016). Mutual intelligibility of spoken Maltese, Libyan Arabic, and Tunisian Arabic functionally tested: A pilot study. Folia Linguistica 50(2). De Gruyter.",
        "url": "https://www.degruyterbrill.com/document/doi/10.1515/flin-2016-0021/html"
      },
      {
        "text": "Brincat, Joseph M. (2006). Languages and varieties in use in Malta today: Maltese, English, Italian, Maltese English and Maltaliano. In Lepschy & Tosi (eds.), Rethinking Languages in Contact: The Case of Italian, pp. 152-159. London: Legenda.",
        "url": "https://um.edu.mt/library/oar/handle/123456789/60201"
      },
      {
        "text": "Heritage Malta (2024). Exhibition showcases the Maltese language's long road towards official recognition (1934, 1964, 2004 milestones; Akkademja tal-Malti).",
        "url": "https://heritagemalta.mt/news/exhibition-showcases-the-maltese-languages-long-road-towards-official-recognition/"
      },
      {
        "text": "Wikipedia. Pietru Caxaro (Il-Kantilena; found by Mikiel Fsadni on 22 September 1966 in the deeds of notary Brandan Caxaro; presented with Godfrey Wettinger in 1968).",
        "url": "https://en.wikipedia.org/wiki/Pietru_Caxaro"
      }
    ]
  },
  {
    "id": "georgian-consonant-clusters",
    "icon": "🍇",
    "tags": [
      "georgian",
      "kartvelian",
      "phonotactics",
      "consonant-clusters",
      "writing-systems"
    ],
    "title": {
      "en": "Gvprtskvni, eight consonants before the first vowel in Georgian",
      "ja": "グヴプルツクヴニ：母音までに子音が八つ並ぶジョージア語"
    },
    "summary": {
      "en": "Georgian verbs such as gvprtskvni 'you peel us' start with eight consonants. Many of its two-consonant clusters share voicing, aspiration or ejection. It is written in Mkhedruli, a script with no letter case, and its all-caps Mtavruli letters were encoded in Unicode only in 2018.",
      "ja": "ジョージア語の動詞 gvprtskvni（「君は私たちの皮をむく」）は、最初の母音までに子音が八つ続く。二つの子音が有声・有気・放出音のどれかでそろう「調和的子音連続」があり、表記には大文字・小文字の区別がないムヘドルリ文字を使う。見出し用の大文字体ムタヴルリがUnicodeに入ったのは2018年のことだ。"
    },
    "body": {
      "en": "<p><strong>Georgian</strong> (ქართული, about 3.8 million speakers) is the largest of the four Kartvelian languages of the South Caucasus. It lets consonants pile up at the start of a word. The standard showpiece is <em>gvprtskvni</em> (გვფრცქვნი), \"you peel us\": eight consonants, <em>g-v-p-r-ts-k-v-n</em>, and then a single vowel. Georgian spells <em>ts</em> with one letter, ც, so the word has nine letters and eight consonants.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ka\">🔍 Open Georgian</button>\n</div>\n\n<h3>Where the consonants come from</h3>\n\n<p>The cluster is built by the grammar, not stored in the root. The verb root for peeling is <em>prtskvn-</em> (its verbal noun is <em>prtskvna</em>, ფრცქვნა). Add the first-person subject prefix <em>v-</em> and the present-tense <em>-i</em> and you get <em>v-prtskvn-i</em>, \"I peel it\". Replace <em>v-</em> with the first-person plural object prefix <em>gv-</em> and leave the second-person singular subject unmarked, as Georgian does, and the result is <em>gv-prtskvn-i</em>, \"you peel us\". The same pattern gives <em>gvts'vrtni</em> (გვწვრთნი), \"you train us\", with seven consonants. The noun formed from that root, <em>mts'vrtneli</em> (მწვრთნელი) \"trainer\" (<em>m-</em> + <em>ts'vrtn</em> + <em>-el-i</em>), opens with six.</p>\n\n<h3>Harmonic clusters</h3>\n\n<p>Georgian stops and affricates come in three series: voiced (<em>b, d, g</em>), aspirated (<em>pʰ, tʰ, kʰ</em>) and ejective (<em>p', t', k'</em>). A set of two-consonant clusters called <strong>harmonic clusters</strong> pairs a front consonant (labial, dental or palato-alveolar) with a back one (velar or uvular) from the same series. Examples are <em>bg</em> in <em>bgera</em> (ბგერა) \"sound\", <em>tsʰx</em> in <em>tsʰxovreba</em> (ცხოვრება) \"life\", and the doubly ejective <em>ts'q'</em> in <em>ts'q'ali</em> (წყალი) \"water\". The order is fixed front-to-back: <em>bg</em> occurs as a harmonic cluster, <em>gb</em> does not.</p>\n\n<p>Because they behave so regularly, harmonic clusters have been analysed as single complex segments. Ioana Chitoran tested this acoustically in <em>Phonology</em> (1998). She found audible release bursts between the two members, and the data did not support the single-segment analysis. In a magnetometer study published in <em>Papers in Laboratory Phonology 7</em> (2002), Chitoran, Louis Goldstein and Dani Byrd found that front-to-back stop sequences overlap more than back-to-front ones. Their explanation: when the second stop is further back, it can overlap the first without hiding the first one's release.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ka,xmf,lzz,sva,pkar\" data-word=\"water\">⚖️ Compare \"water\" across the Kartvelian languages</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"fire\" data-code=\"ka\">💬 See \"fire\": Georgian tsʰetsʰxli</button>\n</div>\n\n<p>The map shows how far back the \"water\" cluster goes. Mingrelian has წყარი with the same <em>ts'q'</em>, Laz has წკარი with a velar in place of the uvular, and the Proto-Kartvelian reconstruction is <em>*c̣q̇al-</em>. Svan uses an unrelated word, ლიც. Georgian \"fire\", <em>tsʰetsʰxli</em> (ცეცხლი), contains the aspirated harmonic pair <em>tsʰx</em>.</p>\n\n<h3>A script without case</h3>\n\n<p>All of these words are written in <strong>Mkhedruli</strong>, which first appears in the 10th century and has 33 letters in modern use. It has no capital letters: sentences and names begin with the same letterforms as everything else. The older Asomtavruli script, attested from the 5th century, survives in church use. In the late 19th and early 20th centuries some writers, following Latin and Cyrillic practice, capitalized proper nouns and sentence-initial words with <strong>Mtavruli</strong> forms, but the practice did not last. Today Mtavruli is used for all-caps headings, signs and inscriptions, never for an initial capital.</p>\n\n<p>The change in the 2010s was in encoding, not in how Georgians write. <strong>Unicode 11.0</strong>, released on 5 June 2018, added 46 Mtavruli capitals and gave every Mkhedruli letter an uppercase mapping, so software set to all-caps now turns ქართული into ᲥᲐᲠᲗᲣᲚᲘ. Unicode specifies no titlecase mapping from Mkhedruli to Mtavruli, so \"capitalize the first letter\" leaves a Georgian word unchanged. In 2016 UNESCO inscribed the living culture of the three Georgian scripts on its Intangible Cultural Heritage list.</p>",
      "ja": "<p><strong>ジョージア語</strong>（ქართული、話者約380万人）は南コーカサスのカルトヴェリ語族4言語のうち最大の言語で、語頭に子音を何重にも重ねることができる。よく例に挙がるのが <em>gvprtskvni</em>（გვფრცქვნი）「君は私たちの皮をむく」だ。<em>g-v-p-r-ts-k-v-n</em> と子音が八つ続き、母音はそのあとの一つだけ。<em>ts</em> はジョージア文字では ც の一字で書くので、この語は9文字で子音8個になる。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ka\">🔍 ジョージア語を開く</button>\n</div>\n\n<h3>子音はどこから来るのか</h3>\n\n<p>この長い子音連続は語根にはじめからあるのではなく、文法が組み立てたものだ。「皮をむく」の語根は <em>prtskvn-</em>（動名詞は <em>prtskvna</em> ფრცქვნა）。一人称主語の接頭辞 <em>v-</em> と現在形の <em>-i</em> を付けると <em>v-prtskvn-i</em>「私はそれの皮をむく」になる。<em>v-</em> を一人称複数目的語の接頭辞 <em>gv-</em> に替え、二人称単数の主語は無標識のままにすると、<em>gv-prtskvn-i</em>「君は私たちの皮をむく」ができる。同じ型で <em>gvts'vrtni</em>（გვწვრთნი）「君は私たちを鍛える」は子音7連続になる。同じ語根から作った名詞 <em>mts'vrtneli</em>（მწვრთნელი）「トレーナー」（<em>m-</em> + <em>ts'vrtn</em> + <em>-el-i</em>）は、語頭に子音が六つ並ぶ。</p>\n\n<h3>調和的子音連続</h3>\n\n<p>ジョージア語の閉鎖音と破擦音には、有声（<em>b, d, g</em>）・有気（<em>pʰ, tʰ, kʰ</em>）・放出音（<em>p', t', k'</em>）の3系列がある。<strong>調和的子音連続</strong>は、前寄りの子音（唇音・歯音・後部歯茎音）と後ろ寄りの子音（軟口蓋音・口蓋垂音）を同じ系列からとって組み合わせた二子音連続だ。<em>bgera</em>（ბგერა）「音」の <em>bg</em>、<em>tsʰxovreba</em>（ცხოვრება）「生活」の <em>tsʰx</em>、放出音どうしの <em>ts'q'ali</em>（წყალი）「水」の <em>ts'q'</em> がその例になる。順序は前から後ろに決まっていて、<em>bg</em> は調和的連続になるが <em>gb</em> はならない。</p>\n\n<p>規則正しく振る舞うことから、調和的連続を一つの複合分節音とみる分析もある。イオアナ・キトランは1998年の『Phonology』誌でこれを音響的に検証し、二つの子音のあいだに聞き取れる破裂を確認した。データは単一分節音説を支持しなかった。2002年の『Papers in Laboratory Phonology 7』では、キトラン、ルイス・ゴールドスタイン、ダニ・バードが磁気センサーで調音を測り、前→後ろの閉鎖音連続は後ろ→前より重なりが大きいことを示した。二つ目の閉鎖音がより奥にあれば、重なっても一つ目の破裂は隠れない、というのが彼らの説明だ。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ka,xmf,lzz,sva,pkar\" data-word=\"water\">⚖️ カルトヴェリ諸語の「水」を比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"fire\" data-code=\"ka\">💬 「火」を見る：ジョージア語 tsʰetsʰxli</button>\n</div>\n\n<p>地図を見ると、「水」の子音連続がどこまでさかのぼるかがわかる。メグレル語 წყარი も同じ <em>ts'q'</em> を持ち、ラズ語 წკარი では口蓋垂音が軟口蓋音に替わっている。祖カルトヴェリ語の再建形は <em>*c̣q̇al-</em> だ。スヴァン語は別系統の語 ლიც を使う。ジョージア語の「火」<em>tsʰetsʰxli</em>（ცეცხლი）には、有気の調和的連続 <em>tsʰx</em> が入っている。</p>\n\n<h3>大文字のない文字</h3>\n\n<p>ここまでの語はすべて<strong>ムヘドルリ</strong>で書かれる。10世紀に初めて現れた文字で、現代の字母は33字。大文字がなく、文頭も固有名詞もほかと同じ字形で書き始める。5世紀から確認できるより古いアソムタヴルリは、教会で今も使われている。19世紀末から20世紀初めには、ラテン文字やキリル文字にならって固有名詞や文頭を<strong>ムタヴルリ</strong>の字形で大書きする書き手もいたが、定着しなかった。現在のムタヴルリは見出しや看板、碑文の全部大文字表記に使い、語頭だけの大文字には使わない。</p>\n\n<p>2010年代に変わったのは書き方ではなく文字コードだ。2018年6月5日公開の<strong>Unicode 11.0</strong>はムタヴルリ大文字46字を追加し、ムヘドルリの各字に大文字への対応を与えた。そのため全部大文字に設定したソフトウェアでは ქართული が ᲥᲐᲠᲗᲣᲚᲘ になる。一方でムヘドルリからムタヴルリへのタイトルケースの対応は定められていないので、「先頭だけ大文字に」と指定しても語の見た目は変わらない。2016年にはユネスコが、ジョージア文字の3書体の生きた文化を無形文化遺産に登録している。</p>"
    },
    "sources": [
      {
        "text": "Chitoran, Ioana (1998). \"Georgian harmonic clusters: phonetic cues to phonological representation.\" Phonology 15(2): 121–141. Cambridge University Press.",
        "url": "https://doi.org/10.1017/S0952675798003558"
      },
      {
        "text": "Chitoran, Ioana; Goldstein, Louis; Byrd, Dani (2002). \"Gestural overlap and recoverability: Articulatory evidence from Georgian.\" In C. Gussenhoven & N. Warner (eds.), Papers in Laboratory Phonology 7, 419–447. Mouton de Gruyter.",
        "url": "https://doi.org/10.1515/9783110197105.2.419"
      },
      {
        "text": "Unicode Consortium (2018). Unicode 11.0.0 release notes (Georgian Mtavruli capitals and case mappings).",
        "url": "https://www.unicode.org/versions/Unicode11.0.0/"
      },
      {
        "text": "UNESCO Intangible Cultural Heritage (2016). \"Living culture of three writing systems of the Georgian alphabet.\"",
        "url": "https://ich.unesco.org/en/RL/living-culture-of-three-writing-systems-of-the-georgian-alphabet-01205"
      }
    ]
  },
  {
    "id": "yoruba-talking-drums",
    "icon": "🥁",
    "tags": [
      "tone",
      "yoruba",
      "speech-surrogate",
      "drumming",
      "nigeria"
    ],
    "title": {
      "en": "The dùndún: how a Yoruba drum speaks in three tones",
      "ja": "ドゥンドゥン：三つの声調で「話す」ヨルバの太鼓"
    },
    "summary": {
      "en": "Yoruba distinguishes words by three level tones. The hourglass-shaped dùndún drum reproduces those tones and the syllable count of speech by squeezing its tension cords, so drummers can play praise poetry and proverbs that listeners hear as words.",
      "ja": "ヨルバ語は高・中・低の三つの声調で語を区別する。砂時計形の太鼓ドゥンドゥンは、張り紐を締める強さでその声調と音節の数を写し取り、聞き手が言葉として聞き取れる賛辞や諺を打ち出す。"
    },
    "body": {
      "en": "<p>In Yoruba, spoken by tens of millions of people in southwestern Nigeria and Benin, <em>rá</em> means \"disappear\", <em>ra</em> \"rub\" and <em>rà</em> \"buy\". The consonant and vowel are the same in all three. Only the pitch differs: high, mid or low. The standard orthography writes the high tone with an acute accent, the low tone with a grave, and leaves the mid tone unmarked. A word such as <em>bàbá</em> \"father\" is therefore low-high, and <em>omi</em> \"water\" is mid-mid.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"yo\">🔍 Open Yoruba</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"father\" data-code=\"yo\">💬 Show \"father\" (bàbá, low-high)</button>\n</div>\n\n<h3>An hourglass that changes pitch</h3>\n\n<p>The <strong>dùndún</strong> is a family of Yoruba drums. Apart from the small kettle-shaped <em>gúdúgúdú</em>, they are hourglass-shaped pressure drums: a wooden body, traditionally carved from <em>igi ọ̀mọ̀</em> (<em>Cordia alliodora</em>), with a membrane at each end and the two membranes laced together by tension cords. The drummer slings the drum over one shoulder so that it hangs under the opposite arm, squeezes the cords between arm and body, and strikes with a curved stick. Squeezing tightens both membranes and raises the pitch. Akin Euba's 1990 study of the tradition lists the ensemble as the lead drum <em>ìyáàlù</em> (\"mother drum\"), <em>ìsáájú</em>, <em>kẹríkẹrì</em>, <em>gúdúgúdú</em> and <em>ìkẹ́yìn</em>; the smaller <em>gángan</em> belongs to the same family.</p>\n\n<p>Samuel Akinbo recorded five drummers at the Diamond FM radio station, University of Ibadan, and filmed how they played the <em>rá / ra / rà</em> set. For the high-tone word they compressed the cords tightly before striking, for the mid-tone word loosely, and for the low-tone word not at all. In his acoustic sample, taken from three of the drummers with 12 tokens per tone, the three drum tones averaged 172, 125 and 61 Hz, and for the two test utterances the drum pitch correlated with the spoken pitch at R ≥ 0.98. One strike corresponds to one syllable, so the drum also carries the rhythm and length of the word. The glide that Yoruba speakers produce on the second syllable of a high-low or low-high sequence appears on the drum too. Akinbo's proposed explanation, which he says still needs testing, is that the drummer holds the first compression until after striking the second syllable.</p>\n\n<h3>Not a code</h3>\n\n<p>The drum does not spell words or use a set of conventional signals, as in a Morse-style code. It copies the tonal and rhythmic shape of Yoruba speech, which is why the tradition is called speech surrogacy. Akinbo cites the scholar Eluyefa (2011, p. 76): \"the dùndún drum does not have a language of its own; it is the drummer who speaks through the drum\". Akinbo argues, citing reports of drummers doing so, that a drummer who speaks English could drum English phrases the same way, and leaves non-tonal languages as a topic for future research.</p>\n\n<p>Copying leaves out the consonants and vowels, so many words come out identical on the drum. Listeners make up for this with a shared repertoire. Mariano González and Olupemi Oludare, recording in Lagos in February 2020, note that most performances draw on traditional texts: <strong>oríkì</strong> (praise poetry, including the praise names of families, towns and deities) and <strong>òwe</strong> (proverbs). Drummers can still play new sentences. One of the twelve test sentences the authors used, <em>Bàbá àgbàlagbà kaán jókòó lórí àga pupa</em> (\"There is an old man sitting on a red chair\"), was unknown to the drummers in advance. The same authors report that the language of the <strong>bàtá</strong> drums is considered hard to understand even among Yoruba insiders, and that a single bàtá communicates less efficiently than a single dùndún. The bàtá's membranes are fixed, so its lead drum cannot glide between tones the way the dùndún can.</p>\n\n<h3>Talking mode and dancing mode</h3>\n\n<p>Euba (1990) described a speech mode, a song form and a \"musical speech\" mode of dùndún playing. A 2021 acoustic study by Cecilia Durojaye and colleagues split the playing into four modes and measured how far each follows the voice. Three Yoruba vocal performers recorded spoken and sung lines, and three professional drummers played matching versions; 175 recordings went into the analysis. When drummers talked directly on the drum, the timing of their strokes correlated with the timing of the syllables at r = 0.72. In the more performative talking mode it dropped to r = 0.37, and drummed song against sung lines gave r = 0.25. Even in direct talking, pitch matched less closely than timing (r = 0.32). The fourth mode, dance rhythm, was purely rhythmic and matched no vocal line.</p>",
      "ja": "<p>ナイジェリア南西部とベナンで数千万人が話すヨルバ語では、<em>rá</em> は「消える」、<em>ra</em> は「こする」、<em>rà</em> は「買う」を意味する。子音も母音も同じで、違うのは音の高さ、つまり高・中・低の声調だけだ。正書法では高声調に鋭アクセント、低声調に重アクセントを付け、中声調には何も付けない。だから <em>bàbá</em>（父）は低・高、<em>omi</em>（水）は中・中と読む。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"yo\">🔍 ヨルバ語を開く</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"father\" data-code=\"yo\">💬 「父」を表示（bàbá、低・高）</button>\n</div>\n\n<h3>音程を変える砂時計</h3>\n\n<p><strong>ドゥンドゥン</strong>（dùndún）はヨルバの太鼓の一群を指す。小さな釜形の <em>グドゥグドゥ</em>（gúdúgúdú）を除けば、いずれも砂時計形の締め太鼓だ。胴は伝統的に <em>igi ọ̀mọ̀</em>（<em>Cordia alliodora</em>）の木をくり抜いて作り、両端に皮を張って、二枚の皮を張り紐でつなぐ。奏者は太鼓を片方の肩に掛けて反対側の腕の下に下げ、腕と脇腹で紐を挟んで締め、曲がったばちで打つ。紐を締めると両面の皮が張り、音が高くなる。アキン・エウバが1990年にまとめたこの伝統の研究によると、合奏はリーダー役の <em>イヤーアル</em>（ìyáàlù、「母なる太鼓」）、<em>イサージュ</em>（ìsáájú）、<em>ケリケリ</em>（kẹríkẹrì）、<em>グドゥグドゥ</em>、<em>イケーイン</em>（ìkẹ́yìn）からなる。小型の <em>ガンガン</em>（gángan）も同じ一群に属する。</p>\n\n<p>サミュエル・アキンボはイバダン大学のラジオ局Diamond FMで5人の奏者を録音し、<em>rá / ra / rà</em> の三語をどう打つかを撮影した。高声調の語では紐を強く締めてから打ち、中声調では軽く締め、低声調ではまったく締めない。うち3人の奏者から各声調12例をとった音響分析では、三つの太鼓の音の平均がそれぞれ172、125、61ヘルツとなり、二つの試験発話で太鼓の音程と話し言葉の音程の相関は R ≥ 0.98 だった。一打ちが一音節に当たるので、太鼓は語のリズムと長さも伝える。高・低や低・高の並びで話し手が二つ目の音節に付ける滑らかな音程の移りも、太鼓に現れる。アキンボはその仕組みを、最初の締めを二つ目の音節を打ち終えるまで保つためだと考えているが、これはまだ検証が必要な仮説だと本人が述べている。</p>\n\n<h3>暗号ではない</h3>\n\n<p>この太鼓は、モールス信号のように語を一文字ずつ綴るわけでも、取り決めた合図を並べるわけでもない。ヨルバ語の話し言葉が持つ声調とリズムの形をそのまま写す。だからこの伝統は「発話代替」（speech surrogacy）と呼ばれる。アキンボは研究者エルイェファ（2011年、76ページ）の一文を引いている。「the dùndún drum does not have a language of its own; it is the drummer who speaks through the drum」（ドゥンドゥンは自分の言語を持たない。太鼓を通して話すのは奏者である）。さらにアキンボは、実際にそうした奏者がいるという報告を挙げて、英語を話す奏者なら同じやり方で英語の句も打てると論じ、声調のない言語については今後の研究課題としている。</p>\n\n<p>写し取るのは声調とリズムだけで子音と母音は落ちるので、太鼓の上では多くの語が同じ形になる。聞き手はそれを、皆が知っているレパートリーで補う。2020年2月にラゴスで録音したマリアノ・ゴンサレスとオルペミ・オルダレによれば、演奏の大半は伝統的な詞章によっている。家・町・神々の称え名を含む賛辞詩 <strong>オリキ</strong>（oríkì）と、諺 <strong>オウェ</strong>（òwe）である。それでも奏者は新しい文も打てる。二人が使った12の試験文の一つ <em>Bàbá àgbàlagbà kaán jókòó lórí àga pupa</em>（赤い椅子に老人が座っている）は、奏者には事前に知られていなかった。二人はまた、太鼓 <strong>バタ</strong>（bàtá）の言葉はヨルバ文化の内部の人にとっても聞き取りにくいとされ、バタ一つではドゥンドゥン一つほど効率よく伝えられないと述べている。バタの皮は張りが固定されているので、その主奏太鼓はドゥンドゥンのように声調の間を滑らかに移れない。</p>\n\n<h3>「話す」打ち方と「踊らせる」打ち方</h3>\n\n<p>エウバ（1990年）はドゥンドゥンの打ち方に、話す様式、歌の形式、「音楽的な話し」の様式があると記した。セシリア・ドゥロジャイェらの2021年の音響研究は、打ち方を四つの様式に分け、それぞれがどこまで声に沿うかを測っている。ヨルバ語の歌い手・語り手3人が話した句と歌った句を録音し、プロの奏者3人が同じ句を太鼓で打った。分析に使った録音は175本である。奏者が太鼓でそのまま話すように打つと、打音のタイミングと音節のタイミングの相関は r = 0.72 だった。聞かせる演奏としての話す打ち方では r = 0.37 に下がり、歌を太鼓で打った場合と歌声との相関は r = 0.25 だった。そのまま話す打ち方でも、音程の一致はタイミングより低い（r = 0.32）。四つ目の踊りのリズムの様式は純粋にリズムだけで、対応する声の句はなかった。</p>"
    },
    "sources": [
      {
        "text": "Akinbo, Samuel Kayode (2021). \"The Language of Gángan, A Yorùbá Talking Drum.\" Frontiers in Communication 6. doi:10.3389/fcomm.2021.650382 (corrigendum 10.3389/fcomm.2021.773156).",
        "url": "https://doi.org/10.3389/fcomm.2021.650382"
      },
      {
        "text": "Akinbo, Samuel (2019). \"Representation of Yorùbá Tones by a Talking Drum: An Acoustic Analysis.\" Linguistique et Langues Africaines 5. Preprint lingbuzz/004884.",
        "url": "https://ling.auf.net/lingbuzz/004884"
      },
      {
        "text": "González, Mariano & Oludare, Olupemi (2022). \"The Speech Surrogacy Systems of the Yoruba Dùndún and Bàtá Drums: On the Interface Between Organology and Phonology.\" Frontiers in Communication 6. doi:10.3389/fcomm.2021.652542",
        "url": "https://doi.org/10.3389/fcomm.2021.652542"
      },
      {
        "text": "Durojaye, Cecilia; Knowles, Kristina L.; Patten, K. Jakob; Garcia, Mordecai J.; McBeath, Michael K. (2021). \"When Music Speaks: An Acoustic Study of the Speech Surrogacy of the Nigerian Dùndún Talking Drum.\" Frontiers in Communication 6. doi:10.3389/fcomm.2021.652690",
        "url": "https://doi.org/10.3389/fcomm.2021.652690"
      }
    ]
  },
  {
    "id": "marthas-vineyard-sign",
    "icon": "🌊",
    "tags": [
      "sign-language",
      "deaf",
      "massachusetts",
      "asl",
      "extinct"
    ],
    "title": {
      "en": "Martha's Vineyard Sign Language: the town where hearing people signed",
      "ja": "マーサズ・ヴィニヤード手話──聞こえる人も手話で話した町"
    },
    "summary": {
      "en": "In Chilmark, on an island off Massachusetts, hereditary deafness was common enough in the 19th century that hearing neighbours signed as well. Research from 2024 revises the community's start date, its supposed English roots and its role in American Sign Language.",
      "ja": "マサチューセッツ沖の島にあるチルマークでは、19世紀に遺伝性のろうが多く、聞こえる住民も手話を使った。2024年の研究は、この共同体の始まりの年代、イングランド起源説、アメリカ手話への寄与という三つの通説を見直している。"
    },
    "body": {
      "en": "\n<p>In the town of <strong>Chilmark</strong>, at the western end of Martha's Vineyard off the coast of Massachusetts, about <strong>1 in 25</strong> people were deaf during the 19th century, and in the Squibnocket neighbourhood the figure reached about 1 in 4. Those are the figures the anthropologist <strong>Nora Ellen Groce</strong> gave in her 1985 book <em>Everyone Here Spoke Sign Language</em>. She put the rate for the whole island at 1 in 155, against a national rate of about 1 in 5,728. The deafness was hereditary and recessive. It spread through a small group of families who married within the island for generations.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"41.34\" data-lng=\"-70.75\" data-zoom=\"10\">🌍 Fly to Chilmark, Martha's Vineyard</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"41.76\" data-lng=\"-72.69\" data-zoom=\"7\">🏫 Fly to Hartford, home of the American School for the Deaf</button>\n</div>\n\n<h3>A language shared by deaf and hearing islanders</h3>\n<p>Because deaf people were so common, the hearing farmers and fishermen of Chilmark signed as well, both with deaf neighbours and among themselves. Groce interviewed elderly islanders in the late 1970s and early 1980s, and they remembered which neighbours had been deaf only after a pause, because signing had been so ordinary. Oliver Sacks visited after reading the book and described old islanders slipping into sign mid-conversation in <em>Seeing Voices</em> (1989).</p>\n\n<h3>When it started, and where it came from</h3>\n<p>Groce traced the island's deaf families back to the <strong>Weald of Kent</strong> in England, and she suggested that a Kentish sign language had crossed the Atlantic with Puritan settlers. In her account the community began when the Lumbert family arrived around 1692; Jonathan Lumbert and two of his children were deaf. In 2024 <strong>Justin Power and Richard Meier</strong> published a reconstruction from historical, demographic and genealogical evidence covering 1692 to 2008, and it disputes both points. In the century after the Lumberts arrived, they find deafness infrequent, and the few deaf islanders lived scattered across the island. They date the signing community to the birth of Benjamin Mayhew Jr. in Chilmark in February <strong>1785</strong>, 93 years later than the earlier account; from 1785 to 1818 all seven deaf residents of Chilmark lived in Squibnocket. They also call it a new signing community with no connection to earlier signing communities in Kent.</p>\n<p>Their counts are also lower. Groce gave a peak of 45 deaf islanders in the 1840s. Power and Meier count 53 deaf residents across 1692 to 1998, with a peak of 28 in 1857.</p>\n\n<h3>The link to American Sign Language</h3>\n<p>A common claim is that Vineyard sign was one of the parents of <strong>American Sign Language</strong>. The American School for the Deaf opened in Hartford, Connecticut, in 1817, with Laurent Clerc teaching in French Sign Language. The first islanders to enrol were Lovey Mayhew and the sisters Sally and Mary Smith, on 25 October 1825, eight years after the school opened. Over the following decades 25 island-born students attended it. Groce suggested that Vineyard signing may have contributed to ASL. Power and Meier find stronger evidence for influence the other way: they judge it likely that many deaf islanders shifted from Vineyard sign towards ASL during the 19th century, and ASL fingerspelling, which hearing islanders learned too, became a channel between the two groups. On their reading, the island had about 40 years of independent development before it joined the New England signing community.</p>\n\n<h3>The end of the community</h3>\n<p>Deaf islanders who studied in Hartford often married deaf partners from the mainland. Their deafness had different genetic causes, so few of their children were born deaf, and the island's deaf population shrank: fewer than 10 by 1926 and fewer than five from 1946. The last deaf residents of Chilmark died in the 1950s. <strong>Katie West</strong>, the person most often named as the last deaf native signer, died in 1952. In 1953 the town bought her house, and since 1956 it has been the Chilmark Free Public Library.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ncs\">🔍 Compare with a younger sign language: Nicaraguan Sign Language</button>\n</div>\n",
      "ja": "\n<p>マサチューセッツ州沖の島マーサズ・ヴィニヤードの西端にある町<strong>チルマーク</strong>では、19世紀に住民の<strong>約25人に1人</strong>がろう者だった。スクイブノケット地区ではおよそ4人に1人に達した。この数字は人類学者<strong>ノーラ・エレン・グロース</strong>が1985年の著書『みんなが手話で話した島』（<em>Everyone Here Spoke Sign Language</em>）で示したものだ。島全体では155人に1人で、全米平均の約5,728人に1人と比べて桁違いに多い。ろうは劣性遺伝によるもので、何代にもわたって島内で結婚を重ねた少数の家系に広がっていた。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"41.34\" data-lng=\"-70.75\" data-zoom=\"10\">🌍 マーサズ・ヴィニヤードのチルマークへ飛ぶ</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"41.76\" data-lng=\"-72.69\" data-zoom=\"7\">🏫 アメリカろう学校のあるハートフォードへ飛ぶ</button>\n</div>\n\n<h3>ろう者と聴者が共有した言語</h3>\n<p>ろう者があまりに身近だったので、チルマークの聞こえる農民や漁師も手話を使った。ろうの隣人と話すときだけでなく、聴者どうしのあいだでも使った。グロースは1970年代末から1980年代初めに島の高齢者から聞き取りをしたが、彼らは誰がろう者だったかを、少し考えないと思い出せなかったという。手話がそれほど当たり前だったのである。この本を読んで島を訪れたオリヴァー・サックスは、老人たちが会話の途中で手話に切り替える様子を『手話の世界へ』（<em>Seeing Voices</em>、1989年）に書いている。</p>\n\n<h3>いつ、どこから始まったのか</h3>\n<p>グロースは島のろうの家系をイングランドの<strong>ケント州ウィールド地方</strong>までさかのぼり、ケントの手話がピューリタン移民とともに大西洋を渡ったという説を立てた。共同体の起点は、1692年ごろのランバート家の入植に置かれた。ジョナサン・ランバートと2人の子がろう者だった。これに対し、<strong>ジャスティン・パワーとリチャード・マイヤー</strong>は2024年に、1692年から2008年までの歴史・人口動態・系譜の資料にもとづく再構成を発表し、二つの点に異を唱えた。ランバート家の到着から約1世紀のあいだ、ろうはまれで、数少ないろう者も島のあちこちに散らばって暮らしていた。二人は手話共同体の成立を、チルマークでベンジャミン・メイヒュー・ジュニアが生まれた<strong>1785年</strong>2月とみる。従来説より93年遅い。1785年から1818年まで、チルマークのろうの住民7人は全員スクイブノケットに住んでいた。さらに、この共同体はケントにあった先行の手話共同体とは無関係に、島で新たに生まれたものだとしている。</p>\n<p>人数の見積もりも小さい。グロースは1840年代のピークを45人としたが、パワーとマイヤーの数えでは、1692年から1998年までに島に住んだろう者は計53人、ピークは1857年の28人である。</p>\n\n<h3>アメリカ手話とのつながり</h3>\n<p>ヴィニヤード手話は<strong>アメリカ手話（ASL）</strong>の源流の一つだ、とよく言われる。コネチカット州ハートフォードにアメリカろう学校が開校したのは1817年で、ローラン・クレールがフランス手話で教えた。島から最初に入学したのはラヴィ・メイヒューと、サリー、メアリーのスミス姉妹の3人で、1825年10月25日のこと。開校から8年が過ぎていた。その後、島生まれの生徒は合わせて25人がこの学校に通った。グロースはヴィニヤード手話がASLの形成に寄与した可能性を指摘したが、パワーとマイヤーが見いだしたのは、むしろ逆方向の影響を示す証拠である。19世紀のうちに多くのろうの島民がヴィニヤード手話からASLへ移っていった可能性が高いとし、聴者の島民も覚えたASLの指文字が、両者をつなぐ手段になったと述べている。二人の見方では、島の手話が独自に発達したのは約40年で、その後はニューイングランドの手話共同体に合流した。</p>\n\n<h3>共同体の終わり</h3>\n<p>ハートフォードで学んだ島のろう者は、本土出身のろう者と結婚することが多かった。ろうの遺伝的原因が互いに異なるため、生まれる子どもがろうになることは少なく、島のろう人口は減っていった。1926年には10人を切り、1946年以降は5人未満になった。チルマーク最後のろうの住民たちは1950年代に亡くなった。島の手話を母語とした最後のろう者としてよく名前が挙がる<strong>ケイティ・ウエスト</strong>は、1952年に亡くなった。町は1953年に彼女の家を買い取り、1956年からはチルマーク公共図書館として使っている。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ncs\">🔍 もっと新しい手話、ニカラグア手話と比べる</button>\n</div>\n"
    },
    "sources": [
      {
        "text": "Groce, Nora Ellen (1985). Everyone Here Spoke Sign Language: Hereditary Deafness on Martha's Vineyard. Harvard University Press.",
        "url": "https://www.hup.harvard.edu/books/9780674270411"
      },
      {
        "text": "Power, Justin M.; Meier, Richard P. (2024). \"The historical demography of the Martha's Vineyard signing community.\" Journal of Deaf Studies and Deaf Education 29(3): 295–321. doi:10.1093/deafed/enad058",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11195467/"
      },
      {
        "text": "Humphrey, Thomas (2024). \"Research Potentially Widens Scope of Vineyard's Historic Deaf Community.\" Vineyard Gazette, 19 February 2024.",
        "url": "https://vineyardgazette.com/news/2024/02/19/new-research-potentially-widens-scope-vineyards-deaf-community"
      },
      {
        "text": "Kusters, Annelies (2010). \"Deaf Utopias? Reviewing the Sociocultural Literature on the World's 'Martha's Vineyard Situations'.\" Journal of Deaf Studies and Deaf Education 15(1): 3–16.",
        "url": "https://academic.oup.com/jdsde/article/15/1/3/2333620"
      }
    ]
  },
  {
    "id": "ayapaneco-myth",
    "icon": "🤐",
    "tags": [
      "endangered-languages",
      "mixe-zoque",
      "mexico",
      "myth",
      "language-revitalization"
    ],
    "title": {
      "en": "Ayapaneco: the last two speakers who were neither the last nor two",
      "ja": "アヤパネコ語：「口をきかない最後の二人」は最後でも二人でもなかった"
    },
    "summary": {
      "en": "In 2011 a story went round the world that Ayapaneco, a Zoquean language of Tabasco, Mexico, would die because its last two speakers refused to talk to each other. The linguists working in Ayapa found more speakers, no feud, and a town already teaching the language.",
      "ja": "2011年、メキシコ・タバスコ州のソケ系言語アヤパネコ語は「最後の話者二人が互いに口をきかないせいで消える」という話が世界中に広まった。実際にアヤパで調査していた研究者が見たのは、もっと多くの話者と、確執のない二人の老人と、すでに言語を教え始めていた町だった。"
    },
    "body": {
      "en": "<p><strong>Ayapaneco</strong> is spoken in Ayapa, a town in the municipality of Jalpa de Méndez in Tabasco, Mexico, about 10 km southeast of Comalcalco. Its speakers call it <em>Nuumte Oote</em>, \"true voice\". It belongs to the Gulf Zoquean branch of the Mixe-Zoquean family, alongside Sierra Popoluca and Texistepec Popoluca in neighbouring Veracruz, and its ISO 639-3 code is <em>zoq</em>. In Tabasco it is surrounded by Spanish and by languages of other families, among them Chontal (Yokot'an), a Mayan language. Spanish-language schooling reached the town in the mid-20th century, and speakers stopped passing the language on to children; from the 1970s urbanisation and migration broke up the remaining group of speakers.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"18.2\" data-lng=\"-93.1\" data-zoom=\"6\">🌍 Fly to Ayapa, Tabasco</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"chf\">🔍 Tabasco Chontal, a Mayan neighbour</button>\n</div>\n\n<h3>The story</h3>\n<p>On 13 April 2011 <em>The Guardian</em> ran a report by Jo Tuckman under the premise that Ayapaneco had two fluent speakers left, <strong>Manuel Segovia</strong>, 75, and <strong>Isidro Velázquez</strong>, 69, who lived 500 metres apart and did not talk to each other. The headline version — the last two speakers of a dying language refuse to speak — was then repeated by news sites and blogs around the world. The idea was not new in 2011: the anthropologist Daniel Suslak traces it to 2006–07, when Mexico's National Institute of Indigenous Languages (INALI) publicised the two men's case and international news outlets and broadcast media picked it up.</p>\n\n<h3>What the linguist said</h3>\n<p>Suslak, of Indiana University, had been working in Ayapa on a dictionary, and he was the expert quoted in the Guardian piece. His words there describe temperament, not a quarrel: \"They don't have a lot in common,\" he said, calling Segovia \"a little prickly\" and Velázquez \"more stoic.\" The same article reported that Segovia's wife and son understood him, though they could say only a few words themselves, and that he had spoken the language with his brother until the brother died about a decade earlier. In 2014 Suslak told <em>Indian Country Today</em> that the two men were not the only speakers left — Velázquez's brothers and sister and a cousin of Segovia's also spoke it — and that several speakers he had met had since died. \"The narrative of the last two speakers who don't speak to each other is a powerful one,\" he said. \"It just happens to not be quite true.\"</p>\n\n<p>Suslak's academic account appeared as \"Ayapan Echoes: Linguistic Persistence and Loss in Tabasco, Mexico\" in <em>American Anthropologist</em> 113(4), December 2011. It treats the feud story itself as an object of study: how it circulated, and what it did to the two men and to the town once journalists and visitors began to arrive.</p>\n\n<h3>How many speakers</h3>\n<p>The count depends on what is counted, and when. In his 2019 doctoral thesis at INALCO in Paris, the linguist <strong>Jhonnatan Rangel</strong> put the number of speakers at about 11, aged 69 to 95; a 2017 conference paper of his had counted about 15, aged 66 to 90, and a 2020 paper about nine elders. Around them are people who understand the language, or speak some of it, without full command — the semi-speakers that a two-person headline erases. In a 2017 article in <em>Histoire Épistémologie Langage</em>, \"Les derniers locuteurs\", Rangel used his Ayapa fieldwork to argue that the media figure of the \"last speaker\" rests on speaker typologies that force linguists to say what linguistic competence actually is.</p>\n\n<h3>What Ayapa did</h3>\n<p>The town did not wait for the story to end. By 2014 Segovia's son, also named Manuel, was running an Ayapaneco school in the village, and the community was preparing its second annual Ayapaneco language festival. Speakers had worked with the Mexican anthropologist Denisse Rebeca Gómez Ramírez on a book of Ayapaneco terms for parts of the body, which led Suslak to remark: \"you could say that they aren't the last speakers of Ayapaneco – they are the first writers!\" He had also submitted a new dictionary to INALI for printing, and in 2020 Rangel described the first practical spelling system for the language, designed for a community programme teaching heritage and new speakers.</p>",
      "ja": "<p><strong>アヤパネコ語</strong>は、メキシコ・タバスコ州ハルパ・デ・メンデス郡の町アヤパで話される言語で、コマルカルコの南東約10kmに位置する。話者自身は <em>Nuumte Oote</em>（「真の声」）と呼ぶ。ミヘ・ソケ語族のメキシコ湾ソケ語派に属し、隣のベラクルス州のシエラ・ポポルカ語やテシステペク・ポポルカ語と同じ枝にある。ISO 639-3 コードは <em>zoq</em>。タバスコでは周囲をスペイン語と、マヤ語族のチョンタル語（ヨコタン語）など系統の異なる言語に囲まれている。20世紀半ばにスペイン語による学校教育が町に及ぶと、子どもへの継承は途絶えた。1970年代以降は都市化と人口流出が、残った話者の集まりをばらばらにした。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"18.2\" data-lng=\"-93.1\" data-zoom=\"6\">🌍 タバスコ州アヤパへ飛ぶ</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"chf\">🔍 隣のマヤ系言語、タバスコ・チョンタル語</button>\n</div>\n\n<h3>広まった話</h3>\n<p>2011年4月13日、英紙『ガーディアン』はジョー・タックマンの記事を掲載した。アヤパネコ語の流暢な話者は<strong>マヌエル・セゴビア</strong>（75歳）と<strong>イシドロ・ベラスケス</strong>（69歳）の二人だけで、500メートルしか離れていない家に住みながら互いに話をしない、という筋立てである。その後「消えゆく言語の最後の話者二人が口をきかない」という見出しが世界中のニュースサイトやブログで繰り返された。ただしこの話は2011年に始まったものではない。人類学者ダニエル・スーザックによれば、2006〜07年にメキシコ国立先住民言語研究所（INALI）が二人のことを広報し、国際的な報道機関や放送メディアがそれを取り上げたのが発端だった。</p>\n\n<h3>研究者は何と言ったか</h3>\n<p>インディアナ大学のスーザックはアヤパで辞書づくりを進めており、ガーディアンの記事で専門家として登場したのも彼だった。そこでの彼の言葉は性格の違いを述べたもので、確執の話ではない。「二人にはあまり共通点がない（They don't have a lot in common）」と語り、セゴビアを「少々気難しい（a little prickly）」、ベラスケスを「もっと我慢強い（more stoic）」と評している。同じ記事は、セゴビアの妻と息子は彼の話す言葉を理解できるが自分ではわずかな単語しか話せないこと、セゴビアは約10年前に兄弟が亡くなるまでその兄弟とアヤパネコ語で話していたことも伝えていた。2014年、スーザックは『インディアン・カントリー・トゥデイ』に対し、二人は最後の話者ではないと述べた。ベラスケスの兄弟と姉妹、セゴビアのいとこも話すことができ、彼が会った話者のうち何人かはその後亡くなったという。「口をきかない最後の二人という物語には強い力がある（The narrative of the last two speakers who don't speak to each other is a powerful one）」と彼は言い、「ただ、それはあまり本当ではないというだけだ（It just happens to not be quite true）」と続けた。</p>\n\n<p>スーザックの学術的な報告は、2011年12月の『American Anthropologist』113巻4号に「Ayapan Echoes: Linguistic Persistence and Loss in Tabasco, Mexico」として掲載された。この論文は確執の物語そのものを研究対象とし、それがどう流通したか、記者や訪問者が押し寄せるようになって二人の老人と町に何が起きたかを論じている。</p>\n\n<h3>話者は何人か</h3>\n<p>数は何を、いつ数えるかで変わる。言語学者<strong>ジョナタン・ランヘル</strong>は2019年にパリのINALCOに提出した博士論文で、話者を69〜95歳の約11人としている。2017年の学会発表では66〜90歳の約15人、2020年の論文では高齢の話者約9人と数えていた。その周りには、言葉を理解はできる人、一部なら話せるが完全には操れない人がいる。「二人」という見出しが消してしまう半話者（セミスピーカー）たちだ。ランヘルは2017年に『Histoire Épistémologie Langage』誌に発表した論文「Les derniers locuteurs（最後の話者たち）」で、アヤパでの調査をもとに、メディアがつくる「最後の話者」像は話者類型の問題につながり、言語学者に言語能力とは何かを問い直させると論じた。</p>\n\n<h3>アヤパの取り組み</h3>\n<p>町は物語の結末を待ってはいなかった。2014年には、セゴビアの同名の息子マヌエルが村でアヤパネコ語の学校を運営し、地域は第2回アヤパネコ語祭りの準備を進めていた。話者たちはメキシコの人類学者デニセ・レベカ・ゴメス・ラミレスとともに、身体部位を表すアヤパネコ語の語彙集をまとめている。これを受けてスーザックは「彼らはアヤパネコ語の最後の話者ではなく、最初の書き手なのだと言ってもいい（you could say that they aren't the last speakers of Ayapaneco – they are the first writers!）」と述べた。彼は新しい辞書も印刷のためINALIに提出していた。2020年にはランヘルが、継承話者と新しい学習者に教える地域の言語プログラムのために設計した、この言語初の実用的な正書法について報告している。</p>"
    },
    "sources": [
      {
        "text": "Tuckman, Jo (13 April 2011). \"Mexican language on brink of extinction as last speakers refuse to talk.\" The Guardian; reprinted 6 May 2011 as \"Language at Risk of Dying Out – the Last Two Speakers Aren't Talking\", Indian Country Today.",
        "url": "https://ictnews.org/archive/language-at-risk-of-dying-out-the-last-two-speakers-arent-talking"
      },
      {
        "text": "Suslak, Daniel F. (2011). \"Ayapan Echoes: Linguistic Persistence and Loss in Tabasco, Mexico.\" American Anthropologist 113(4): 569–581.",
        "url": "https://doi.org/10.1111/j.1548-1433.2011.01370.x"
      },
      {
        "text": "Kearns, Rick (14 April 2014). \"Fighting Off Extinction: The Story of Indigenous Mexican Languages.\" Indian Country Today.",
        "url": "https://ictnews.org/archive/fighting-off-extinction-the-story-of-indigenous-mexican-languages/"
      },
      {
        "text": "Rangel, Jhonnatan (2019). Variations linguistiques et langue en danger. Le cas du numte ʔoote ou zoque ayapaneco dans l'état de Tabasco, Mexique. PhD thesis, INALCO (supervisor Claudine Chamoreau); see also Rangel (2017), \"Les derniers locuteurs : au croisement des typologies des locuteurs de langues en danger\", Histoire Épistémologie Langage 39(1): 107–133.",
        "url": "https://theses.hal.science/tel-02989501v1"
      }
    ]
  },
  {
    "id": "eskimo-snow-words",
    "icon": "❄️",
    "tags": [
      "snow",
      "inuit",
      "yupik",
      "linguistic-relativity",
      "myths"
    ],
    "title": {
      "en": "How Many Words for Snow? Four Roots, a Hundred Claims, and a Hundred Words for Ice",
      "ja": "「雪」を表す言葉はいくつあるのか：4つの語根、100語という主張、100の氷の語"
    },
    "summary": {
      "en": "Franz Boas listed four Inuit snow roots in 1911; by 1984 the New York Times had them at one hundred. Laura Martin and Geoffrey Pullum traced how the figure grew, and later fieldwork on Yupik and Inuit sea-ice vocabulary showed what the inflated version had hidden.",
      "ja": "1911年にフランツ・ボアズが挙げたイヌイット語の雪の語根は4つだった。それが1984年のニューヨーク・タイムズでは100語になっていた。数字が膨らんでいった経緯はローラ・マーティンとジェフリー・プラムが跡づけた。その後、ユピック語とイヌイット語の海氷語彙の現地調査によって、誇張の陰に埋もれていた本当の豊かさが明らかになった。"
    },
    "body": {
      "en": "<p>The claim begins with four words. In the introduction to his <em>Handbook of American Indian Languages</em> (1911), <strong>Franz Boas</strong> gave an Inuit example: <em>aput</em> \"snow on the ground\", <em>qana</em> \"falling snow\", <em>piqsirpoq</em> \"drifting snow\" and <em>qimuqsuq</em> \"a snowdrift\". His point was about word roots, not perception. English uses unrelated words for forms of water (<em>lake</em>, <em>river</em>, <em>brook</em>, <em>rain</em>, <em>dew</em>, <em>foam</em>) where it could have derived them from one stem, and Inuit does the same with snow. Boas had wintered among the Inuit of Baffin Island in 1883–84 and knew the vocabulary first-hand.</p>\n\n<h3>From four to one hundred</h3>\n\n<p>In April 1940 <strong>Benjamin Lee Whorf</strong> published \"Science and Linguistics\" in MIT's <em>Technology Review</em> (vol. 42, no. 6). He listed falling snow, snow on the ground, snow packed hard like ice, slushy snow and wind-driven flying snow as things an Eskimo language names separately, and claimed that English uses one word for all of them. As later critics counted it, that turned Boas's four roots into at least seven, and it passed over English <em>slush</em>, <em>sleet</em> and <em>blizzard</em>. Later popular books kept raising the number. On 9 February 1984 an unsigned <em>New York Times</em> editorial put it at one hundred.</p>\n\n<p>The anthropologist <strong>Laura Martin</strong> traced this history in \"'Eskimo Words for Snow': A Case Study in the Genesis and Decay of an Anthropological Example\" (<em>American Anthropologist</em> 88:2, 1986). She showed that each retelling cited the previous one instead of a dictionary. In 1989 <strong>Geoffrey K. Pullum</strong> brought her findings to a wider audience with \"The Great Eskimo Vocabulary Hoax\" (<em>Natural Language and Linguistic Theory</em> 7:2), later the title essay of a 1991 book. Pullum argued that Eskimo languages and English have roughly the same number of snow roots.</p>\n\n<h3>What the dictionaries hold</h3>\n\n<p>Part of the confusion is about what counts as a word. Inuit and Yupik languages are polysynthetic: suffixes stack on a root to make words that English renders as whole sentences. On that definition the number of snow \"words\" has no upper limit, and the same holds for any other noun. Counting roots gives a much smaller figure. In 1991 <strong>Anthony Woodbury</strong> went through Steven Jacobson's 1984 Central Alaskan Yup'ik dictionary and found 15 snow-related meanings expressed by about 33 forms. They include <em>qanuk</em> \"snowflake\", <em>qanikcaq</em> \"snow on the ground\", <em>muruaneq</em> \"soft, deep snow\", <em>nutaryuk</em> \"fresh snow\" and <em>qanisqineq</em> \"snow floating on water\". His English comparison list for the same purpose ran to 22 terms.</p>\n\n<p>The map shows three snow roots that the <em>Comparative Eskimo Dictionary</em> (2nd ed., 2010) reconstructs for Proto-Eskimo: <em>*apun</em> \"snow on the ground\" (Greenlandic and Inuktitut <em>aput</em>, Iñupiaq <em>apun</em>), <em>*qaniɣ</em> \"falling snow\" (behind Yup'ik <em>qanikcaq</em>) and <em>*aniɣu</em> \"fallen snow\" (Central Siberian Yupik <em>анигу</em>). The basic snow word differs between neighbouring languages because each picked a different root out of that shared set.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"kl,iu,ik,esu,ess\" data-word=\"snow\">⚖️ Compare \"snow\" across five Inuit and Yupik languages</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"snow\">💬 See \"snow\" around the world</button>\n</div>\n\n<h3>Where the real richness is</h3>\n\n<p>Debunking the snow figure did not mean these languages lacked specialised vocabulary. The anthropologist <strong>Igor Krupnik</strong> of the Smithsonian helped lead the SIKU (Sea Ice Knowledge and Use) project during the International Polar Year of 2007–2008, which recorded ice and snow terms with hunters in about ten Inuit and Yupik dialects. As David Robson reported in <em>New Scientist</em> in 2012, the Nunavik dialect of Inuktitut in Quebec has at least 53 snow terms. They include <em>matsaaruti</em>, wet snow used to ice sled runners, and <em>pukak</em>, crystalline powder snow that looks like salt. Central Siberian Yupik has about 40. The Iñupiaq of Wales, Alaska, has about 70 terms for ice, including <em>utuqaq</em> for ice that lasts year after year and <em>auniq</em> for ice full of holes.</p>\n\n<p>On St. Lawrence Island, the Yupik hunter Conrad Oozeva wrote down nearly 100 sea-ice terms in 1986 for school language classes. The Smithsonian published them in 2004 as an illustrated dictionary in <em>Watching Ice and Weather Our Way</em>. In the SIKU volume (2010), Krupnik and Ludger Müller-Wille went back to Boas's Baffin Island diaries and field notes. They argued that the hoax debate had misread Boas: he had used four terms to make a point about grammar, and never claimed to be listing the whole vocabulary. The large inventories are mostly about ice, and they sort it by age, thickness and whether it will hold a person or a boat.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ess\">🔍 Open Central Siberian Yupik</button>\n</div>",
      "ja": "<p>話の出発点は4つの単語だ。<strong>フランツ・ボアズ</strong>は『アメリカ・インディアン諸語ハンドブック』（1911年）の序論で、イヌイット語から <em>aput</em>「積もった雪」、<em>qana</em>「降る雪」、<em>piqsirpoq</em>「吹き流される雪」、<em>qimuqsuq</em>「吹きだまり」を例に挙げた。ボアズが論じたのは語根の作り方で、知覚の違いではない。英語は水のさまざまな姿を一つの語幹から派生させずに、<em>lake</em>、<em>river</em>、<em>brook</em>、<em>rain</em>、<em>dew</em>、<em>foam</em> と別々の語で呼ぶ。イヌイット語は雪について同じことをしている、という指摘だった。ボアズは1883〜84年にバフィン島のイヌイットのもとで冬を越しており、これらの語を自分の耳で知っていた。</p>\n\n<h3>4語から100語へ</h3>\n\n<p>1940年4月、<strong>ベンジャミン・リー・ウォーフ</strong>がMITの『テクノロジー・レビュー』（42巻6号）に「科学と言語学」を発表した。ウォーフは、降る雪、積もった雪、氷のように固く締まった雪、ぬかるんだ雪、風に舞う雪をエスキモーの言語は別々の語で呼び分けると書き、英語はそのすべてを一語で済ませると主張した。のちの批判者の数え方では、これでボアズの4語は少なくとも7語に増えた。しかも英語の <em>slush</em>、<em>sleet</em>、<em>blizzard</em> は勘定から外されていた。その後も一般向けの本が数を上げていき、1984年2月9日の『ニューヨーク・タイムズ』の無署名社説では100語になっていた。</p>\n\n<p>この経緯を跡づけたのは人類学者の<strong>ローラ・マーティン</strong>で、論文は「『エスキモーの雪の語』――人類学的事例の発生と劣化をめぐる事例研究」（『アメリカン・アンソロポロジスト』88巻2号、1986年）。マーティンは、紹介されるたびに辞書ではなく前の紹介が引かれていたことを示した。1989年には<strong>ジェフリー・K・プラム</strong>が「エスキモー語彙大捏造事件（The Great Eskimo Vocabulary Hoax）」（『ナチュラル・ランゲージ・アンド・リングイスティック・セオリー』7巻2号）でこの成果を広く知らせ、この文章は1991年に同名の論集の表題作となった。プラムは、雪を表す語根の数はエスキモー諸語と英語でほぼ変わらないと論じた。</p>\n\n<h3>辞書に載っているもの</h3>\n\n<p>混乱の一因は「単語」の数え方にある。イヌイット語やユピック語は抱合的な言語で、語根に接尾辞を次々に重ね、英語なら一文になる内容を一語で表す。この意味での単語なら雪の「語」の数に上限はないが、それはほかのどの名詞でも同じだ。語根で数えれば数字はずっと小さくなる。<strong>アンソニー・ウッドベリー</strong>は1991年、スティーヴン・ジェイコブソンの『中央アラスカ・ユピック語辞典』（1984年）を調べ、雪にかかわる意味が15、それを表す形が約33あることを示した。<em>qanuk</em>「雪片」、<em>qanikcaq</em>「積もった雪」、<em>muruaneq</em>「柔らかく深い雪」、<em>nutaryuk</em>「新雪」、<em>qanisqineq</em>「水面に浮かぶ雪」などである。同じ目的で彼が作った英語の比較リストは22語だった。</p>\n\n<p>地図では、『比較エスキモー語辞典』（第2版、2010年）が祖エスキモー語に再建する雪の語根のうち3つが見られる。<em>*apun</em>「積もった雪」はグリーンランド語とイヌクティトゥット語の <em>aput</em>、イヌピアック語の <em>apun</em> に、<em>*qaniɣ</em>「降る雪」はユピック語の <em>qanikcaq</em> に、<em>*aniɣu</em>「降り積もった雪」は中央シベリア・ユピック語の <em>анигу</em> に続いている。隣り合う言語で基本の「雪」が違うのは、共通の語根のうちどれを選んだかが言語ごとに異なるからだ。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"kl,iu,ik,esu,ess\" data-word=\"snow\">⚖️ イヌイット語・ユピック語5言語の「雪」を比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"snow\">💬 世界の「雪」を見る</button>\n</div>\n\n<h3>本当の豊かさはどこにあるか</h3>\n\n<p>雪の数字が誇張だったからといって、これらの言語に専門的な語彙がないわけではない。スミソニアン協会の人類学者<strong>イーゴリ・クルプニク</strong>は、2007〜2008年の国際極年にSIKU（海氷の知識と利用）プロジェクトの中心となり、約10のイヌイット・ユピック方言について猟師たちと氷や雪の語を記録した。2012年に『ニュー・サイエンティスト』のデイヴィッド・ロブソンが伝えたところでは、ケベック州ヌナヴィクのイヌクティトゥット語には雪の語が少なくとも53ある。橇の滑走面に氷を張るのに使う湿った雪 <em>matsaaruti</em> や、塩のような結晶状の粉雪 <em>pukak</em> がその例だ。中央シベリア・ユピック語は約40語。アラスカ州ウェールズのイヌピアック語には氷を表す語が約70あり、何年も解けずに残る氷を <em>utuqaq</em>、穴だらけになった氷を <em>auniq</em> と呼ぶ。</p>\n\n<p>セントローレンス島では、ユピックの猟師コンラッド・オゼヴァが1986年、学校の言語の授業のために100近い海氷の語を書き留めた。スミソニアン協会はこれを2004年、『われらのやり方で氷と天気を見る（Watching Ice and Weather Our Way）』の中で図解辞典として刊行している。クルプニクとルートヴィヒ・ミュラー＝ヴィレはSIKUの論集（2010年）で、ボアズのバフィン島での日記やフィールドノートを読み直した。そして「捏造」論争はボアズを読み違えていると論じた。ボアズは文法の話をするために4語を挙げただけで、語彙を網羅したと言ったことはない。大きな語彙目録の中身は大半が氷で、氷の古さ、厚さ、人や舟が乗れるかどうかで細かく分けられている。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ess\">🔍 中央シベリア・ユピック語を開く</button>\n</div>"
    },
    "sources": [
      {
        "text": "Pullum, Geoffrey K. (1989). \"Topic…Comment: The Great Eskimo Vocabulary Hoax.\" Natural Language and Linguistic Theory 7(2): 275–281.",
        "url": "https://doi.org/10.1007/BF00138079"
      },
      {
        "text": "Krupnik, Igor; Müller-Wille, Ludger (2010). \"Franz Boas and Inuktitut Terminology for Ice and Snow: From the Emergence of the Field to the 'Great Eskimo Vocabulary Hoax'.\" In SIKU: Knowing Our Ice, Springer, pp. 377–400.",
        "url": "https://doi.org/10.1007/978-90-481-8587-0_16"
      },
      {
        "text": "Woodbury, Anthony C. (1991). \"Counting Eskimo Words for Snow: A Citizen's Guide.\" University of Texas at Austin (based on Jacobson 1984, Yup'ik Eskimo Dictionary).",
        "url": "https://www-users.york.ac.uk/~ss44/books/pages/_misc/woodbury.htm"
      },
      {
        "text": "Robson, David (2012). \"Are there really 50 Eskimo words for snow?\" New Scientist, no. 2896, 18 December 2012.",
        "url": "https://www.newscientist.com/article/mg21628962-800-are-there-really-50-eskimo-words-for-snow/"
      }
    ]
  },
  {
    "id": "hopi-time-whorf",
    "icon": "⏳",
    "tags": [
      "linguistic-relativity",
      "uto-aztecan",
      "controversy",
      "time",
      "myth"
    ],
    "title": {
      "en": "Does Hopi have no time? Whorf's claim and Malotki's 677 pages",
      "ja": "ホピ語に「時間」はないのか：ウォーフの主張とマロトキの677ページ"
    },
    "summary": {
      "en": "Benjamin Lee Whorf wrote that Hopi has no words or grammatical forms that refer to time. In 1983 Ekkehart Malotki answered with a 677-page book of Hopi time expressions. Linguists still disagree about what Whorf actually claimed.",
      "ja": "ベンジャミン・リー・ウォーフは、ホピ語には時間を指す語も文法形式もないと書いた。1983年、エッケハルト・マロトキはホピ語の時間表現を集めた677ページの本でそれに答えた。ただ、ウォーフが実際に何を主張していたのかについては、いまも意見が分かれている。"
    },
    "body": {
      "en": "<p><strong>Hopi</strong> (<em>Hopílavayi</em>) is a Uto-Aztecan language of the Hopi villages on and around three mesas in northeastern Arizona. It is best known outside the Southwest for a single sentence by <strong>Benjamin Lee Whorf</strong>, a fire-prevention engineer at the Hartford Fire Insurance Company who studied linguistics on the side. In \"An American Indian Model of the Universe\", dated 1936 and first published in 1956, fifteen years after his death in 1941, he wrote that Hopi contains no words, grammatical forms or expressions \"that refer directly to what we call 'time'\", nor to past, present or future.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"hop\">🔍 Open Hopi on the map</button>\n</div>\n\n<h3>Where Whorf's Hopi came from</h3>\n<p>Most of Whorf's Hopi came from <strong>Ernest Naquayouma</strong>, a speaker from the village of Toreva who was living in Manhattan. Whorf's own fieldwork in Arizona was one short trip in 1938, to Mishongnovi on Second Mesa. In a 1939 essay, \"The Relation of Habitual Thought and Behavior to Language\" (published 1941), he added a narrower claim about counting: Hopi puts plurals and cardinal numbers only on things that can be seen together, so a length of time is reckoned by ordinal days, as in staying until a particular day, and not as a quantity of days.</p>\n\n<h3>Malotki's answer</h3>\n<p>In 1983 <strong>Ekkehart Malotki</strong>, a German-born linguist at Northern Arizona University, published <em>Hopi Time: A Linguistic Analysis of the Temporal Concepts in the Hopi Language</em> (Mouton, Trends in Linguistics 20): xxii + 677 pages, built on recordings with Hopi speakers. Its chapters cover spatial words reused for time, units of time from the day to the year, reading the hour from the sun's position on the horizon, the stars, the ceremonial calendar, devices such as knotted strings and notched sticks for counting off the days before a ceremony, the <em>pluralization and quantification</em> of time expressions, and temporal particles. The book opens with a Hopi sentence that translates as \"Then indeed, the following day, quite early in the morning at the hour when people pray to the sun…\".</p>\n\n<p>The words are ordinary ones. The map has Hopi <em>qaavo</em> \"tomorrow\" and <em>taavok</em> \"yesterday\". For the verb, Malotki argued that Hopi has a tense system that divides future from non-future: the suffix <em>-ni</em> marks what is to come, and an unmarked verb covers the past and the present together. English draws its tense line in a different place, between past and non-past. Bernard Comrie, reviewing the book in 1984, accepted that the evidence showed Hopi speakers have a concept of time but questioned the tense analysis, suggesting that <em>-ni</em> may be a marker of modality, not of tense.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"tomorrow\" data-code=\"hop\">💬 See \"tomorrow\" (Hopi qaavo)</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"yesterday\" data-code=\"hop\">💬 See \"yesterday\" (Hopi taavok)</button>\n</div>\n\n<h3>What exactly was refuted</h3>\n<p>The popular version of the story, that \"the Hopi have no concept of time\", is false: Malotki's data leave no doubt that Hopi speakers talk about past, present, future, durations and dates. Whether Malotki refuted Whorf himself is still argued. John Lucy (1996) points out that Whorf put \"time\" in quotation marks after the qualifier \"what we call\", and reads him as describing the absence of the specifically Western picture of time as a uniform, countable flow. John Leavitt (2011) likewise argues that Malotki took Whorf to deny the Hopi any concept of time at all. On that reading Malotki answered a broader claim than the one Whorf made. Leanne Hinton (1988) criticized Malotki for reading temporal meaning into Hopi sentences from their English translations, as when a form meaning \"three repetitions\" is rendered \"three times\". David Dinwoodie (2006) faulted Malotki's methods and presentation of data, and described Hopi speakers who distinguish traditional, ritual-linked time from clock time and school time.</p>\n\n<h3>Strong and weak relativity</h3>\n<p>The <strong>strong</strong> form of linguistic relativity, that a language fixes which thoughts its speakers can have, has no experimental support. The <strong>weak</strong> form, that a language's habitual distinctions affect performance on some tasks, does. In a 2007 <em>PNAS</em> study by Jonathan Winawer, Lera Boroditsky and colleagues, Russian speakers, whose language requires a choice between <em>goluboy</em> (light blue) and <em>siniy</em> (dark blue), told apart two blues across that boundary faster than two blues within one category. English speakers showed no such advantage, and a verbal interference task removed the Russian advantage while a spatial one did not. The effect is measured in fractions of a second.</p>",
      "ja": "<p><strong>ホピ語</strong>（<em>Hopílavayi</em>）は、アリゾナ州北東部の三つのメサ（台地）とその周辺に点在するホピの村々で話されるユト・アステカ語族の言語である。米国南西部の外では、ほぼ一つの文のおかげで名前を知られている。書いたのは<strong>ベンジャミン・リー・ウォーフ</strong>。ハートフォード火災保険会社で防火技師として働きながら、余暇に言語学を研究した人物だ。1936年の日付をもち、1941年の彼の死から15年後の1956年に初めて発表された論文「アメリカ・インディアンの宇宙モデル」で、ウォーフはホピ語には「われわれが『時間』と呼ぶものを直接指す（that refer directly to what we call 'time'）」語も文法形式も表現もなく、過去・現在・未来を指すものもないと述べた。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"hop\">🔍 地図でホピ語を開く</button>\n</div>\n\n<h3>ウォーフのホピ語はどこから来たか</h3>\n<p>ウォーフのホピ語の知識の大半は、マンハッタンに住んでいたトレバ村出身の話者<strong>アーネスト・ナクアユーマ</strong>から得たものだった。アリゾナでの現地調査は、1938年に第二メサのミションノビ村を短期間訪れた一度きりである。1939年に書いた論文「習慣的思考および行動と言語との関係」（1941年刊）では、数え方についてもっと限定的な主張を加えている。ホピ語で複数形や基数詞をつけるのは同時に目に見えるものだけで、時間の長さは日数という量ではなく、「何日目まで滞在した」のように序数の日で数える、というものだ。</p>\n\n<h3>マロトキの反論</h3>\n<p>1983年、ドイツ生まれでノーザンアリゾナ大学に勤めていた言語学者<strong>エッケハルト・マロトキ</strong>は、『Hopi Time: A Linguistic Analysis of the Temporal Concepts in the Hopi Language』（ムートン社、Trends in Linguistics 第20巻）を出版した。序論部分22ページに本文677ページ、ホピ語話者との録音にもとづく一冊である。章立ては、時間に転用される空間語、日から年までの時間単位、地平線上の太陽の位置で時刻を読む方法、星、儀礼暦、結び目をつけた紐や刻み目を入れた棒で儀式までの日数を数える道具、時間表現の<em>複数化と数量化</em>、時間の小辞と続く。巻頭に掲げられたホピ語の一文は、訳せば「そしてまさに、その翌日、朝ごく早く、人々が太陽に祈る時刻に……」となる。</p>\n\n<p>使われているのはありふれた語だ。この地図にもホピ語の <em>qaavo</em>「明日」と <em>taavok</em>「昨日」が載っている。動詞について、マロトキはホピ語の時制が未来と非未来の対立だと論じた。接尾辞 <em>-ni</em> がこれから起こることを表し、何もつかない動詞が過去と現在をまとめて受け持つ。英語は時制の線を別の場所、つまり過去と非過去のあいだに引いている。1984年にこの本を書評したバーナード・コムリーは、ホピ語の話者に時間の概念があることは証拠から認めたものの、時制の分析には疑問を示し、<em>-ni</em> は時制ではなくモダリティ（法）の標識かもしれないと指摘した。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"tomorrow\" data-code=\"hop\">💬 「明日」を見る（ホピ語 qaavo）</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"yesterday\" data-code=\"hop\">💬 「昨日」を見る（ホピ語 taavok）</button>\n</div>\n\n<h3>何が論駁されたのか</h3>\n<p>「ホピ族には時間の概念がない」という俗説は誤りだ。マロトキのデータを見れば、ホピ語の話者が過去・現在・未来や、期間や日付について語っていることは疑いようがない。一方、マロトキがウォーフ本人を論駁したのかどうかは、いまも議論が続いている。ジョン・ルーシー（1996年）は、ウォーフが「われわれが～と呼ぶもの（what we call）」という限定をつけたうえで「時間」に引用符をつけていたことを指摘し、ウォーフが言っていたのは、時間を均質で数えられる流れとみなす西洋に特有の時間像がホピ語にはない、ということだったと読む。ジョン・レヴィット（2011年）も同様に、マロトキはウォーフがホピ族に時間の概念そのものがないと主張したと受け取った、と論じている。この読み方に立てば、マロトキが反論したのは、ウォーフが実際に述べたよりも広い主張だったことになる。リアン・ヒントン（1988年）は、「三回の繰り返し」を意味する形を「three times（三回）」と訳す例のように、マロトキが英語訳を手がかりにホピ語の文に時間の意味を読み込んでいると批判した。デイヴィッド・ディンウッディ（2006年）はマロトキの方法とデータの示し方を批判し、伝統的で儀礼と結びついた時間を、時計の時間や学校の時間と区別して語るホピ語話者の姿を記述した。</p>\n\n<h3>強い相対論と弱い相対論</h3>\n<p>言語相対論の<strong>強い</strong>形、つまり言語が話者に可能な思考を決めてしまうという説は、実験による裏づけがない。<strong>弱い</strong>形、つまり言語がふだん区別しているものが一部の課題の成績に影響するという説には、裏づけがある。ジョナサン・ウィナワー、レラ・ボロディツキーらが2007年に『PNAS』に発表した研究では、<em>goluboy</em>（水色）と <em>siniy</em>（紺色）の言い分けが必須のロシア語の話者が、この境界をまたぐ二つの青を、同じカテゴリー内の二つの青より速く見分けた。英語話者にはこの差が出なかった。また、言語的な妨害課題を課すとロシア語話者の優位は消えたが、空間的な妨害課題では消えなかった。差は1秒にも満たない時間で測られている。</p>"
    },
    "sources": [
      {
        "text": "Malotki, Ekkehart (1983). Hopi Time: A Linguistic Analysis of the Temporal Concepts in the Hopi Language. Trends in Linguistics: Studies and Monographs 20. Berlin: Mouton (De Gruyter). xxii + 677 pp.",
        "url": "https://doi.org/10.1515/9783110822816"
      },
      {
        "text": "Whorf, Benjamin Lee (1941). 'The Relation of Habitual Thought and Behavior to Language.' Reprinted with 'An American Indian Model of the Universe' (c. 1936, first published here, p. 57) in Language, Thought, and Reality: Selected Writings, ed. John B. Carroll (1956). Cambridge, MA: MIT Press.",
        "url": "https://archive.org/details/whorf-1941-relation"
      },
      {
        "text": "Winawer, Jonathan; Witthoft, Nathan; Frank, Michael C.; Wu, Lisa; Wade, Alex R.; Boroditsky, Lera (2007). 'Russian blues reveal effects of language on color discrimination.' PNAS 104(19): 7780–7785.",
        "url": "https://doi.org/10.1073/pnas.0701644104"
      },
      {
        "text": "Wikipedia: Hopi time controversy (summary of Whorf, Malotki, Comrie 1984, Hinton 1988, Lucy 1996, Dinwoodie 2006, Leavitt 2011).",
        "url": "https://en.wikipedia.org/wiki/Hopi_time_controversy"
      }
    ]
  },
  {
    "id": "linear-b-ventris",
    "icon": "🏺",
    "tags": [
      "decipherment",
      "mycenaean-greek",
      "linear-b",
      "writing-systems",
      "aegean"
    ],
    "title": {
      "en": "Linear B: how an architect showed the Mycenaeans wrote Greek",
      "ja": "線文字B：建築家ヴェントリスが読み解いた「最古のギリシア語」"
    },
    "summary": {
      "en": "In 1952 Michael Ventris, an architect, showed that the clay tablets of Knossos and Pylos record an early form of Greek. He built on Alice Kober's analysis of word endings, worked with John Chadwick, and in 1953 a tablet listing tripods and jars from Pylos supplied the test.",
      "ja": "1952年、建築家マイケル・ヴェントリスは、クノッソスとピュロスの粘土板に書かれているのが初期のギリシア語だと示した。下地にはアリス・コーバーによる語尾の分析があり、ジョン・チャドウィックが協力者となった。1953年には、ピュロスから出た三脚鼎と壺の目録の粘土板が検証の場になった。"
    },
    "body": {
      "en": "<p>In 1900 Arthur Evans began digging at <strong>Knossos</strong> on Crete and found thousands of clay tablets written in a script he named <strong>Linear B</strong>. In 1939 Carl Blegen found a second archive at <strong>Pylos</strong> in the western Peloponnese, on the first day of his excavation. The script has about 90 syllabic signs plus logograms, which are pictures of the thing being counted: horses, chariot wheels, tripods, jars of wine and oil. For half a century nobody could say what language the syllables spelled. Evans took it for granted that it was the unknown language of the Minoans.</p>\n\n<h3>Kober's endings</h3>\n<p><strong>Alice Kober</strong>, a classicist at Brooklyn College, published her key paper in 1946, \"Inflection in Linear Class B\". She worked without assigning a single sound value. She noticed groups of three related words, later called <em>Kober's triplets</em>, that shared a stem and differed only in their final signs. From these she argued that the language had inflectional endings. She also showed that some signs had to share a consonant while differing in vowel. Her 'bridging' signs became the raw material for a grid of consonants and vowels. Kober died in May 1950, aged 43, two years before the decipherment.</p>\n\n<h3>Ventris's grid</h3>\n<p><strong>Michael Ventris</strong> was 14 when he heard Evans lecture in London in 1936. He trained as an architect and served in the war as an RAF navigator, not as a codebreaker. He believed for years that the language was related to Etruscan, and he said so in print in 1940, at 18. In 1951 Emmett Bennett published a standard sign list for the Pylos tablets. Using it, Ventris filled in a grid of signs sorted by shared consonant and shared vowel. He then guessed that certain words found only on the Cretan tablets were Cretan place names: <em>ko-no-so</em> Knossos, <em>a-mi-ni-so</em> Amnisos, <em>tu-ri-so</em> Tulissos. Once he put those values into the grid, other words came out as recognisable Greek: <em>po-me</em> 'shepherd', <em>ko-wo</em> 'boy'. Kober's triplets turned out to be place names alongside their masculine and feminine adjectives, such as <em>a-mi-ni-so</em> next to <em>a-mi-ni-si-jo</em> and <em>a-mi-ni-si-ja</em>.</p>\n<p>Ventris circulated Work Note 20 on 1 June 1952 under the title \"Are the Knossos and Pylos tablets written in Greek?\" On 1 July he announced in a BBC radio talk that they were. John Chadwick, a Cambridge philologist, heard the broadcast and wrote to him. Their joint paper, \"Evidence for Greek Dialect in the Mycenaean Archives\", appeared in the <em>Journal of Hellenic Studies</em> in 1953.</p>\n\n<h3>The tripod tablet</h3>\n<p>Blegen had dug up tablet <strong>PY Ta 641</strong> at Pylos in June 1952, but it was not cleaned well enough to read until 1953. The tablet is about 15 cm long. Read with Ventris's values, the first word is <em>ti-ri-po-de</em>, Greek <em>tripode</em> 'two tripods', and the entry ends with a tripod logogram and the numeral 2. Further along, <em>di-pa me-zo-e qe-to-ro-we</em> 'a larger vessel, four-handled' is drawn with four handles, <em>ti-ri-o-we-e</em> 'three-handled' with three, and <em>a-no-we</em> 'handleless' with none. On 16 May 1953 Blegen sent Ventris a copy and wrote: \"All this seems too good to be true. Is coincidence excluded?\" The Scottish classicist Arthur Beattie claimed that the match was chance, and later that Ventris had seen the tablet in advance. Blegen replied that the tablet had been kept in a locked box until late July 1952, after Ventris had announced his result, and stayed illegible until the next year. The objection found little support.</p>\n\n<h3>What the tablets say, and what they do not</h3>\n<p>The Greek is some five centuries older than Homer. It keeps the labiovelar <em>kʷ</em>, as in <em>i-qo</em> <em>ikkʷos</em> 'horse', later <em>hippos</em>, and the <em>w</em> sound that later Greek lost, as in <em>wa-na-ka</em> <em>wanaks</em> 'king', later <em>anax</em>. The texts themselves are inventories: rations, livestock, land holdings, offerings. None of them is literary. Ventris and Chadwick's <em>Documents in Mycenaean Greek</em> came out in 1956, a few weeks after Ventris died in a car crash at 34. Linear A, the older Cretan script from which Linear B borrowed most of its signs, can be sounded out with the same values. The words that result match no known language, so the Minoan language Evans was looking for is still unread.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"gmy,el_grc,el\" data-word=\"horse\">⚖️ Compare 'horse' in Mycenaean, Ancient and Modern Greek</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"four\" data-code=\"gmy\">💬 qe-to-ro- 'four', as in the tripod tablet</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"37.03\" data-lng=\"21.70\" data-zoom=\"7\">🌍 Go to the Palace of Nestor at Pylos</button>\n</div>",
      "ja": "<p>1900年、アーサー・エヴァンズはクレタ島の<strong>クノッソス</strong>で発掘を始め、数千枚の粘土板を見つけた。そこに刻まれていた文字を彼は<strong>線文字B</strong>と名づけた。1939年にはカール・ブレーゲンが、ペロポネソス半島西部の<strong>ピュロス</strong>で第二の文書庫を発掘初日に掘り当てた。線文字Bは約90の音節記号と表語記号でできている。表語記号は数える対象そのものの絵で、馬、戦車の車輪、三脚鼎、ワインや油の壺などがある。音節記号がどの言語を綴っているのかは、半世紀にわたって誰にも分からなかった。エヴァンズは、未知のミノア人の言語だと決めてかかっていた。</p>\n\n<h3>コーバーが見つけた語尾</h3>\n<p>ブルックリン・カレッジの古典学者<strong>アリス・コーバー</strong>は、1946年に鍵となる論文「線文字B類における屈折」を発表した。彼女は記号に音価をひとつも当てずに分析を進めた。語幹が同じで末尾の記号だけが異なる三語の組がいくつもあることに気づき、そこからこの言語には屈折語尾があると論じた。この三語組は後に「コーバーの三つ組」と呼ばれる。さらに、子音は共通で母音だけが違うはずの記号の組を示した。この「橋渡し」の記号が、子音と母音の表を作るための素材になった。コーバーは1950年5月、43歳で亡くなった。解読の2年前である。</p>\n\n<h3>ヴェントリスの格子表</h3>\n<p><strong>マイケル・ヴェントリス</strong>は1936年、14歳のときにロンドンでエヴァンズの講演を聴いた。建築を学び、戦時中は英空軍で航法士を務めた。暗号解読の任務には就いていない。彼は長いあいだ、この言語をエトルリア語の親戚だと考えていた。1940年、18歳のときにはその説を論文にもしている。1951年にエメット・ベネットがピュロス粘土板の標準記号表を刊行すると、ヴェントリスはそれを使い、子音が共通する記号と母音が共通する記号を縦横に並べた格子表を埋めていった。次に、クレタ出土の粘土板にしか現れない語をクレタの地名だと推測し、<em>ko-no-so</em> をクノッソス、<em>a-mi-ni-so</em> をアムニソス、<em>tu-ri-so</em> をテュリッソスと読んだ。この音価を格子表に入れると、ほかの語も見覚えのあるギリシア語として現れた。<em>po-me</em> は「羊飼い」、<em>ko-wo</em> は「少年」である。コーバーの三つ組は、地名とその男性形・女性形の形容詞だったことも分かった。たとえば <em>a-mi-ni-so</em> の横に <em>a-mi-ni-si-jo</em> と <em>a-mi-ni-si-ja</em> が並ぶ。</p>\n<p>1952年6月1日、ヴェントリスは「クノッソスとピュロスの粘土板はギリシア語で書かれているか」と題した作業メモ第20号を仲間に回覧した。7月1日にはBBCのラジオで、そうだと発表した。放送を聴いたケンブリッジの言語学者<strong>ジョン・チャドウィック</strong>が手紙を書き、二人は共同研究を始めた。1953年には共著論文「ミケーネ文書に見られるギリシア語方言の証拠」が『ジャーナル・オブ・ヘレニック・スタディーズ』に載った。</p>\n\n<h3>三脚鼎の粘土板</h3>\n<p>粘土板 <strong>PY Ta 641</strong> は1952年6月にブレーゲンがピュロスで掘り出した。ただし、読めるほどに洗浄されたのは1953年になってからである。長さは約15cm。ヴェントリスの音価で読むと、最初の語は <em>ti-ri-po-de</em>、ギリシア語の <em>tripode</em>「三脚鼎2つ」になり、その記載の末尾には三脚鼎の絵と数字2がある。続く <em>di-pa me-zo-e qe-to-ro-we</em>「大きめの器、把手4つ」には把手が4つの壺の絵が添えられている。<em>ti-ri-o-we-e</em>「把手3つ」には3つ、<em>a-no-we</em>「把手なし」には把手のない壺が描かれている。1953年5月16日、ブレーゲンは写しをヴェントリスに送り、\"All this seems too good to be true. Is coincidence excluded?\"（話がうますぎるようにも思える。偶然の可能性は排除できるのか）と書き添えた。スコットランドの古典学者アーサー・ビーティーは、一致は偶然だと主張した。後には、ヴェントリスが事前にこの粘土板を見ていたとまで言い出した。これに対しブレーゲンは、粘土板は1952年7月下旬まで施錠した箱に保管されており、それはヴェントリスが結論を発表した後であること、しかも翌年まで判読できない状態だったことを示して反論した。ビーティーの異論に賛同する者はほとんどいなかった。</p>\n\n<h3>粘土板に書かれていること、いないこと</h3>\n<p>粘土板のギリシア語はホメロスより約500年古い。唇軟口蓋音 <em>kʷ</em> が残っていて、「馬」は <em>i-qo</em> <em>ikkʷos</em> と書かれる。後のギリシア語では <em>hippos</em> である。後代に失われた <em>w</em> の音も残っており、「王」は <em>wa-na-ka</em> <em>wanaks</em> と書かれる。後のギリシア語では <em>anax</em> である。文書そのものは配給、家畜、土地保有、奉納品の目録ばかりで、文学作品はひとつもない。ヴェントリスとチャドウィックの共著『ミケーネ・ギリシア語文書』は1956年に出版された。その数週間前に、ヴェントリスは34歳で自動車事故により亡くなっていた。線文字Bの記号の大半は、クレタのより古い文字である線文字Aから借りたものだ。そのため線文字Aにも同じ音価を当てて発音することはできる。しかし、そうして得られる語はどの既知の言語とも一致しない。エヴァンズが探していたミノア人の言語は、今も読まれていない。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"gmy,el_grc,el\" data-word=\"horse\">⚖️ 「馬」をミケーネ・古代・現代ギリシア語で比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"four\" data-code=\"gmy\">💬 三脚鼎の粘土板にも出てくる「4」qe-to-ro-</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"37.03\" data-lng=\"21.70\" data-zoom=\"7\">🌍 ピュロスの「ネストル宮殿」へ移動</button>\n</div>"
    },
    "sources": [
      {
        "text": "Chadwick, John (1958). The Decipherment of Linear B. Cambridge University Press.",
        "url": "https://www.cambridge.org/core/books/decipherment-of-linear-b/"
      },
      {
        "text": "Ventris, Michael & Chadwick, John (1953). Evidence for Greek Dialect in the Mycenaean Archives. Journal of Hellenic Studies 73: 84-103.",
        "url": "https://doi.org/10.2307/628239"
      },
      {
        "text": "Palaima, Thomas G. (2020). Commemorating John Chadwick's 100th Birthday. PASP, University of Texas at Austin.",
        "url": "https://sites.utexas.edu/scripts/2020/06/05/commemorating-john-chadwicks-100th-birthday-by-tom-palaima/"
      },
      {
        "text": "Fox, Margalit (2013). The Riddle of the Labyrinth: The Quest to Crack an Ancient Code. Ecco/HarperCollins.",
        "url": "https://www.harpercollins.com/products/the-riddle-of-the-labyrinth-margalit-fox"
      }
    ]
  },
  {
    "id": "rosetta-champollion",
    "icon": "🪨",
    "tags": [
      "ancient egyptian",
      "coptic",
      "decipherment",
      "writing systems",
      "hieroglyphs"
    ],
    "title": {
      "en": "The Rosetta Stone and Champollion: how hieroglyphs were read again",
      "ja": "ロゼッタ・ストーンとシャンポリオン：ヒエログリフはどう読み解かれたか"
    },
    "summary": {
      "en": "One decree of 196 BCE in three scripts gave Young and Champollion a starting point. Champollion's 1822–1824 breakthrough was that hieroglyphs mix sound signs with word signs, and Coptic, the last stage of Egyptian, supplied the sounds.",
      "ja": "紀元前196年の一つの布告が、三つの文字で刻まれていた。それを手がかりにヤングとシャンポリオンが挑み、シャンポリオンは1822〜1824年に、ヒエログリフが音を表す記号と語を表す記号の混合であることを示した。その音を教えたのは、エジプト語の最終段階であるコプト語だった。"
    },
    "body": {
      "en": "<p>In July 1799 French soldiers rebuilding a fort near Rashid (Rosetta) in the Nile Delta found a broken slab of granodiorite. The officer in charge, Pierre-François Bouchard, saw that it carried three blocks of text. The stone weighs about 760 kg and stands 112 cm high. It records one decree, issued by a council of priests at Memphis in 196 BCE in honour of the boy-king Ptolemy V, written three times: 14 surviving lines of hieroglyphs at the top, 32 lines of Demotic (the cursive script of everyday documents) in the middle, and 54 lines of Greek at the bottom. When the French army in Egypt capitulated in 1801, the stone passed to Britain, and it has been in the British Museum since 1802.</p>\n\n<p>The Greek could be read at once, so scholars knew what the other two texts said, but not how they said it. Silvestre de Sacy and the Swedish diplomat Johan David Åkerblad worked on the Demotic first. In 1802 Åkerblad picked out Greek personal names in it and published a Demotic alphabet of 29 letters, more than half of them correct.</p>\n\n<h3>Thomas Young's partial reading</h3>\n\n<p>The English physician Thomas Young took up the stone in 1814. His long article \"Egypt\", published unsigned in a 1819 supplement to the <em>Encyclopaedia Britannica</em>, matched about 80 hieroglyphic signs with Demotic ones and showed that Demotic descended from the hieroglyphs. He also took the oval rings called cartouches to hold royal names. In the cartouche of Ptolemy he got p, t, m and i right and s half right (he read it <em>os</em>); he read the lion as <em>ole</em> and took another sign to be superfluous. For the queen's name Berenice he got only n. Young held that sound-spelling was a device kept for foreign names like these, and that native Egyptian words were written with symbols.</p>\n\n<h3>Champollion and Coptic</h3>\n\n<p>Jean-François Champollion, born in Figeac in 1790, came at the problem through Coptic. Coptic is the last stage of the Egyptian language, written from the early centuries CE in the Greek alphabet plus six or seven letters taken from Demotic (ϣ, ϥ, ϧ, ϩ, ϫ, ϭ, ϯ), and it is still the liturgical language of the Coptic Church. He had begun it from books as a schoolboy in Grenoble; in Paris he also studied it with a Coptic priest, Youhanna Chiftichi, at the church of Saint-Roch. Coptic gave him something the stone could not: the sounds of Egyptian words, vowels included.</p>\n\n<p>In 1822 he added the cartouche of Cleopatra from an obelisk at Philae to Ptolemy's, and the shared signs for p, l and o checked each other. On 27 September 1822 he read his <em>Lettre à M. Dacier</em> to the Académie des Inscriptions et Belles-Lettres in Paris, with Young in the audience. Its full title limits its claim to an alphabet of phonetic hieroglyphs used for \"the titles, names and surnames of the Greek and Roman sovereigns\".</p>\n\n<p>The step past Young came with names of native pharaohs. In one cartouche copied at Abu Simbel, Champollion read the disc as the sun, Coptic <em>rē</em>. The next sign he linked to Coptic <em>mise</em> \"to give birth\", since it stood where the Greek text of the Rosetta decree spoke of the king's birthday, and the last sign was the s already known from Ptolemy: <em>Ra-mes-s</em>, Ramesses. An ibis, the bird of the god Thoth, gave Thutmose the same way. Sound-signs were spelling an Egyptian name, from the time before Greek rule.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"sun\" data-codes=\"egy,cop,el_grc\">💬 See \"sun\" in Ancient Egyptian, Coptic and Ancient Greek</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"cop\">🔍 Open Coptic</button>\n</div>\n\n<h3>Pictures that are also sounds</h3>\n\n<p>His <em>Précis du système hiéroglyphique</em> of 1824 set out the full system, calling it \"une écriture tout-à-la-fois figurative, symbolique et phonétique\": a script that is figurative, symbolic and phonetic at once. One word could combine signs that spell consonants, signs that stand for whole words, and unpronounced signs that mark the meaning class. The map shows the principle in a single sign: 𓂋, a mouth, is the word <em>rꜣ</em> \"mouth\" (Coptic <em>ro</em>), and the same picture is the letter r in <em>rn</em> \"name\", Coptic <em>ran</em>. Vowels were left unwritten, which is why Egyptologists still pronounce the language by convention and why Coptic remains the main evidence for its vowels.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"mouth\" data-code=\"egy\">💬 See \"mouth\" in Ancient Egyptian</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"name\" data-code=\"egy\">💬 See \"name\" in Ancient Egyptian</button>\n</div>\n\n<p>The story that the Rosetta Stone alone unlocked the hieroglyphs leaves out most of the evidence. Its hieroglyphic block is the most damaged of the three and contains only one royal name, Ptolemy's. The decisive readings came from cartouches at Philae and Abu Simbel and from a language the stone does not contain. Champollion also leaned on Coptic too hard: the two stand thousands of years apart, and some of his transcriptions read later Coptic forms back into much older Egyptian.</p>",
      "ja": "<p>1799年7月、ナイル・デルタのラシード（ロゼッタ）近郊で砦を改修していたフランス兵が、割れた花崗閃緑岩の石板を掘り出した。指揮していた士官ピエール＝フランソワ・ブシャールは、そこに三段の文章が刻まれていることに気づく。石の重さは約760kg、高さは112cm。刻まれているのは、紀元前196年にメンフィスの神官会議が少年王プトレマイオス5世を称えて出した一つの布告で、同じ内容が三度書かれている。上段はヒエログリフで14行が残り、中段は日常の文書に使われた草書体のデモティックで32行、下段はギリシア語で54行。1801年にエジプトのフランス軍が降伏すると石はイギリスに渡り、1802年から大英博物館にある。</p>\n\n<p>ギリシア語はすぐに読めた。だから他の二つの文章の内容はわかった。わからなかったのは、それがどう書かれているかだった。最初に手をつけたのはデモティックで、シルヴェストル・ド・サシと、スウェーデンの外交官ヨハン・ダーヴィド・オーケルブラードが取り組んだ。オーケルブラードは1802年、デモティックの中からギリシア人の人名を拾い出し、29文字のデモティック・アルファベットを発表した。その半分以上が正しかった。</p>\n\n<h3>トマス・ヤングの部分的な解読</h3>\n\n<p>イギリスの医師トマス・ヤングがこの石に取り組んだのは1814年。1819年に『ブリタニカ百科事典』の補遺に無署名で載せた長い項目「エジプト」では、約80のヒエログリフをデモティックの字形と対応づけ、デモティックがヒエログリフから派生したことを示した。カルトゥーシュと呼ばれる楕円の枠には王名が入っているとも考えた。プトレマイオスのカルトゥーシュでは、p・t・m・iの音価を正しく当て、sは半分だけ当たっていた（彼はosと読んだ）。ライオンはoleと読み、別の一つの記号は余分なものと見なした。王妃ベレニケの名で当たったのはnだけだった。ヤングは、音で綴るのはこうした外国人の名前に限った工夫で、エジプト固有の語は象徴で書かれていると考えていた。</p>\n\n<h3>シャンポリオンとコプト語</h3>\n\n<p>1790年にフィジャックで生まれたジャン＝フランソワ・シャンポリオンは、コプト語を足がかりにした。コプト語はエジプト語の最終段階にあたる言語で、紀元後の最初の数世紀から、ギリシア文字にデモティック由来の6〜7文字（ϣ, ϥ, ϧ, ϩ, ϫ, ϭ, ϯ）を足して書かれてきた。今もコプト教会の典礼語として使われている。シャンポリオンはグルノーブルの学生時代に本でこの言語を学び始め、パリではサン＝ロック教会のコプト人司祭ユハンナ・シフティシのもとでも学んだ。コプト語は、石からは得られないものを彼に与えた。母音まで含めた、エジプト語の単語の音である。</p>\n\n<p>1822年、彼はプトレマイオスのカルトゥーシュに、フィラエのオベリスクにあったクレオパトラのカルトゥーシュを並べた。両方に出てくるp・l・oの記号が、互いの読みを裏づけた。同年9月27日、パリの碑文・文芸アカデミーで『ダシエ氏への書簡』を読み上げる。聴衆の中にはヤングもいた。正式な題名のとおり、この書簡が扱ったのは、ギリシア人・ローマ人の君主の称号と名前を記すのに使われた表音ヒエログリフのアルファベットまでだった。</p>\n\n<p>ヤングの先へ進めたのは、エジプト土着のファラオの名前だった。アブ・シンベルで写し取られたあるカルトゥーシュで、シャンポリオンは円盤を太陽と読んだ。コプト語でrēである。次の記号は、ロゼッタの布告のギリシア語で王の誕生日に触れた箇所に対応していたことから、コプト語のmise「産む」と結びつけた。最後の記号はプトレマイオスで既に知られていたsだった。こうしてRa-mes-s、ラムセスが読めた。トト神の鳥であるトキからは、同じやり方でトトメスが読めた。ギリシア人の支配より前の時代のエジプト人の名前が、音を表す記号で綴られていたのである。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"sun\" data-codes=\"egy,cop,el_grc\">💬 古代エジプト語・コプト語・古代ギリシア語の「太陽」を見る</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"cop\">🔍 コプト語を開く</button>\n</div>\n\n<h3>絵であり、音でもある記号</h3>\n\n<p>1824年の『ヒエログリフ体系概説』で、シャンポリオンは体系の全体を示し、それを「une écriture tout-à-la-fois figurative, symbolique et phonétique」と呼んだ。具象的でも象徴的でも表音的でもある文字、という意味だ。一つの単語の中に、子音を綴る記号と、語をまるごと表す記号と、発音せずに意味の分類を示す記号が並びうる。地図では、この原理が一つの記号に表れている。口を描いた𓂋は、それだけで「口」を意味する語rꜣ（コプト語ではro）だが、同じ絵が「名前」を意味するrn（コプト語ran）ではrという文字として働いている。母音は書かれなかった。エジプト学者が今も約束事の読み方でこの言語を発音しているのも、母音の主な手がかりがいまだにコプト語であるのも、そのためだ。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"mouth\" data-code=\"egy\">💬 古代エジプト語の「口」を見る</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"name\" data-code=\"egy\">💬 古代エジプト語の「名前」を見る</button>\n</div>\n\n<p>ロゼッタ・ストーン一つでヒエログリフが解けた、という話は、証拠の大半を落としている。この石のヒエログリフ部分は三段のうちいちばん破損がひどく、王の名前もプトレマイオス一人分しかない。決め手になった読みは、フィラエとアブ・シンベルのカルトゥーシュと、石には刻まれていない一つの言語から来た。もっともシャンポリオンはコプト語に頼りすぎてもいた。二つの言語は数千年隔たっており、彼の転写の一部は、後世のコプト語の形をはるかに古いエジプト語に読み込んでいる。</p>"
    },
    "sources": [
      {
        "text": "British Museum, Collection Online: The Rosetta Stone, EA24 (granodiorite stela, 196 BC; hieroglyphic 14 lines, Demotic 32, Greek 54)",
        "url": "https://www.britishmuseum.org/collection/object/Y_EA24"
      },
      {
        "text": "Wikipedia, \"Decipherment of ancient Egyptian scripts\" (Young's 1819 Britannica article, ~80 signs; Lettre à M. Dacier read 27 Sept 1822 with Young present; Ramesses/mise reading; Champollion's overestimate of Coptic)",
        "url": "https://en.wikipedia.org/wiki/Decipherment_of_ancient_Egyptian_scripts"
      },
      {
        "text": "Wikipedia, \"Rosetta Stone\" (find July 1799, Bouchard, ~760 kg, 112.3 cm, Capitulation of Alexandria 1801, Åkerblad's 29-letter Demotic alphabet 1802)",
        "url": "https://en.wikipedia.org/wiki/Rosetta_Stone"
      },
      {
        "text": "J.-F. Champollion, Précis du système hiéroglyphique des anciens Égyptiens (Paris, 1824), digitised copy (source of the 'figurative, symbolique et phonétique' passage)",
        "url": "https://archive.org/details/bub_gb_pLwsXWaDDv0C"
      }
    ]
  },
  {
    "id": "behistun-cuneiform",
    "icon": "🏔️",
    "tags": [
      "cuneiform",
      "decipherment",
      "old-persian",
      "akkadian",
      "elamite"
    ],
    "title": {
      "en": "Behistun: one cliff, three cuneiform languages, and the sealed-envelope test of 1857",
      "ja": "ベヒストゥン碑文：三つの楔形文字を刻んだ断崖と、1857年の「封印答案」"
    },
    "summary": {
      "en": "Darius I had his account of his rise carved on a cliff in western Iran in Old Persian, Elamite and Babylonian. Rawlinson copied it between 1835 and 1847, but the reading of Akkadian was proved somewhere else: in 1857 four scholars translated an Assyrian text independently and sent their versions in sealed envelopes.",
      "ja": "ダレイオス1世は、自らの即位の経緯をイラン西部の断崖に古代ペルシア語・エラム語・バビロニア語で刻ませた。ローリンソンは1835〜47年にこれを写し取ったが、アッカド語が読めることの証明は別の場所でなされた。1857年、4人の学者がアッシリアの一つの文書をそれぞれ単独で訳し、封をして提出したのである。"
    },
    "body": {
      "en": "<p>Darius I had his own account of how he took the Persian throne carved into a limestone cliff at <strong>Bisotun</strong> (Behistun), about 100 metres above the ground. The cliff stands on the old road from Babylon to Ecbatana, in what is now Kermanshah province in western Iran. The relief shows Darius with his foot on Gaumāta, the man he says seized power in 522 BCE, facing a line of rebel kings bound at the neck. Around the relief the same story is written three times, in three languages, all of them in wedge-shaped signs: <strong>Old Persian</strong>, an Indo-European language; <strong>Elamite</strong>, an isolate; and <strong>Babylonian</strong>, a dialect of Semitic Akkadian. The site was added to the UNESCO World Heritage List in 2006.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"34.39\" data-lng=\"47.44\" data-zoom=\"6\">🌍 Fly to Bisotun</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"peo,elx,akk\" data-word=\"name\">⚖️ Compare \"name\" in the three languages of the inscription</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"akk\">🔍 Open Akkadian</button>\n</div>\n\n<h3>Three versions, carved in stages</h3>\n<p>The Elamite text was carved first. Elamite was the main written language of the Achaemenid administration: the Persepolis Fortification tablets of 509–493 BCE are mostly in Elamite. The Babylonian and Old Persian versions were added later. After Darius's campaign of 520–519 BCE a figure of the Saka chief Skunkha was added to the end of the line of captives. It was cut straight into the first Elamite text, so the Elamite was copied out again to the left of the Old Persian. In a badly damaged passage of the fourth Old Persian column (§70), Darius says he made a form of writing in <em>ariyā</em>, \"Aryan\", that had not existed before. This is read as a claim that the Old Persian script was created on his orders. The surviving lines are hard to make out on the rock, published readings differ, and two new studies of the passage appeared in 2024, one by Marco Fattori and one by Saber Amiri Parian and Keyvan Mahmoudi.</p>\n\n<h3>Copying the rock</h3>\n<p><strong>Henry Creswicke Rawlinson</strong>, an East India Company officer posted to Kermanshah, worked on the monument from 1835 to 1847. He began copying the Old Persian text in the 1830s, and in 1844 he went back, recopied the Old Persian and copied the Elamite. Old Persian was the way in, because its script has only about 36 sound signs plus a word divider. Georg Friedrich Grotefend had already picked out the names Darius, Xerxes and Hystaspes in inscriptions from Persepolis in 1802. Rawlinson published the Old Persian text with a translation in the <em>Journal of the Royal Asiatic Society</em> in 1846–47, and Edwin Norris published the Elamite version in 1855. The three languages have almost nothing in common: the word for \"name\" is <em>nāma</em> in Old Persian, <em>hiš</em> in Elamite and <em>šumu</em> in Akkadian.</p>\n\n<p>The Babylonian text is on a separate block to the left of the relief, and it cannot be reached from the ledge. Rawlinson's own report, printed in <em>Archaeologia</em> in 1851, says the local climbers declared that block unapproachable, until in the autumn of 1847 \"a wild Kurdish boy, who had come from a distance, volunteered to make the attempt\". The boy squeezed his way up a cleft in the rock, fixed ropes, and took paper squeezes of the signs while hanging in front of the cliff face.</p>\n\n<h3>Not the key to Akkadian</h3>\n<p>Behistun is called the Rosetta Stone of cuneiform, but for Akkadian the label overstates its part. Rawlinson's copy of the main Babylonian text was not published until the end of 1851. By then <strong>Edward Hincks</strong>, rector of Killyleagh in County Down, Ireland, had already worked from other Assyrian and Babylonian inscriptions. In 1846 he showed that the Babylonian script spelled out syllables and that its language had much in common with the Semitic languages. In 1847 he published a list of 76 sign values, and in 1850 he explained logograms and the use of several signs for the same sound. Kevin Cathcart concluded in 2011 that the Behistun Babylonian played no part in the first stage of the decipherment of Akkadian.</p>\n\n<h3>Four sealed envelopes, 1857</h3>\n<p>The test that settled the question was made on a different text. In March 1857 <strong>William Henry Fox Talbot</strong>, one of the inventors of photography, sent the Royal Asiatic Society his translation of a newly lithographed inscription in a sealed packet. The inscription was the clay-prism text of the Assyrian king Tiglath-Pileser I (reigned about 1114–1076 BCE), from Ashur. Rawlinson was already at work on his own translation. At his suggestion the Society's secretary, Edwin Norris, asked Hincks to make one as well, and the Paris-based <strong>Julius Oppert</strong> offered to try too; each worked without seeing the others' versions. On 20 April 1857 Norris wrote to Hincks that the translations would stay sealed until they were opened at the May meeting. In late May a committee that included the historian George Grote, William Whewell of Trinity College, Cambridge, and the Egyptologist Sir Gardner Wilkinson compared the four. Hincks and Oppert had had less time and sent shorter versions, but where the translations covered the same passages they largely agreed. The Society took this as proof that Akkadian could be read, and the four translations were printed side by side that year.</p>\n\n<p>The Babylonian version on the rock is badly damaged, and the records of it have not lasted either. Rawlinson's squeezes from 1844 and 1847 were already decaying when Leonard King and Reginald Campbell Thompson climbed back up to the inscription in 1904, and they have since disintegrated. Elizabeth von Voigtlander's 1978 edition was based mainly on latex squeezes that George Cameron made in 1957, and those have deteriorated too. Johannes Hackl went back over the evidence in 2025. He concludes that her additional readings cannot be verified and that about two-thirds of the Babylonian text should be considered lost.</p>",
      "ja": "<p>ダレイオス1世は、自分がペルシアの王位に就いた経緯を、<strong>ビーソトゥーン</strong>（ベヒストゥン）の石灰岩の断崖、地上およそ100メートルの高さに刻ませた。場所はバビロンからエクバタナへ向かう古い街道沿いで、現在のイラン西部ケルマーンシャー州にあたる。浮き彫りでは、ダレイオスが足でガウマータを踏みつけている。ガウマータは前522年に王位を奪ったとダレイオスが主張する人物で、その前には首を縄でつながれた反乱王たちが並ぶ。浮き彫りの周りには同じ物語が三つの言語で三回書かれており、文字はどれも楔形である。インド・ヨーロッパ語族の<strong>古代ペルシア語</strong>、系統不明の孤立言語<strong>エラム語</strong>、そしてセム語族アッカド語の一方言である<strong>バビロニア語</strong>だ。2006年にユネスコ世界遺産に登録された。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"34.39\" data-lng=\"47.44\" data-zoom=\"6\">🌍 ビーソトゥーンへ移動</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"peo,elx,akk\" data-word=\"name\">⚖️ 碑文の3言語で「名前」を比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"akk\">🔍 アッカド語を開く</button>\n</div>\n\n<h3>三つの版は段階的に刻まれた</h3>\n<p>最初に刻まれたのはエラム語版である。エラム語はアケメネス朝の行政で主に使われた書き言葉で、前509〜493年のペルセポリス城砦文書もほとんどがエラム語で書かれている。バビロニア語版と古代ペルシア語版はそのあとに加えられた。前520〜519年の遠征のあと、捕虜の列の最後にサカ族の首長スクンカの像が付け足された。像は最初のエラム語版の上にじかに彫り込まれたため、エラム語版は古代ペルシア語版の左側にあらためて写し直された。古代ペルシア語版第4欄の、ひどく傷んだ一節（§70）で、ダレイオスは<em>ariyā</em>（「アーリヤの」）書式をつくった、それは以前にはなかった、と述べている。これは古代ペルシア文字そのものが王の命で作られたという主張として読まれている。ただし岩の上の文字は判読が難しく、刊本ごとに読みが異なる。2024年にはこの箇所の新しい研究が二つ出た。マルコ・ファットーリによるものと、サーベル・アミーリー・パリヤーンとキーヴァン・マフムーディーによるものである。</p>\n\n<h3>断崖を写し取る</h3>\n<p>ケルマーンシャーに駐在していた東インド会社の軍人<strong>ヘンリー・クレズウィック・ローリンソン</strong>は、1835年から1847年までこの碑文に取り組んだ。古代ペルシア語版を写し始めたのは1830年代で、1844年に再び現地を訪れ、古代ペルシア語を写し直し、エラム語版も写し取った。突破口は古代ペルシア語だった。この文字には音を表す字が36ほどと語の区切り記号しかないからだ。さらに1802年には、ゲオルク・フリードリヒ・グローテフェントがペルセポリスの碑文からダレイオス、クセルクセス、ヒュスタスペスの名を読み当てていた。ローリンソンは1846〜47年に『王立アジア協会誌』で古代ペルシア語版の本文と翻訳を発表し、エラム語版は1855年にエドウィン・ノリスが公刊した。三つの言語にはほとんど共通点がない。「名前」は古代ペルシア語で<em>nāma</em>、エラム語で<em>hiš</em>、アッカド語で<em>šumu</em>である。</p>\n\n<p>バビロニア語版は浮き彫りの左にある別の岩塊に刻まれていて、岩棚からは手が届かない。1851年に『アルケオロギア』誌に載ったローリンソン本人の報告によれば、地元の登り手たちはこの岩塊には近づけないと言った。ところが1847年の秋、\"a wild Kurdish boy, who had come from a distance, volunteered to make the attempt\"（遠方から来た荒っぽいクルド人の少年が、やってみると名乗り出た）。少年は岩の割れ目を体を押し込むようにして登ってロープを張り、崖の前に宙づりになりながら文字の紙拓（湿らせた紙を押し当てて型を取るもの）を取った。</p>\n\n<h3>アッカド語解読の「鍵」ではなかった</h3>\n<p>ベヒストゥン碑文は楔形文字の「ロゼッタ・ストーン」と呼ばれるが、アッカド語についてはこの呼び名は役割を大きく見積もりすぎている。ローリンソンによるバビロニア語本文の写しが公刊されたのは1851年の末だった。その時点で、アイルランド・ダウン州キリリーの教区牧師<strong>エドワード・ヒンクス</strong>は、すでに別のアッシリア・バビロニア碑文から研究を進めていた。1846年には、バビロニアの文字が音節を書き表すこと、その言語がセム語と多くの共通点を持つことを示している。1847年には76の字音の一覧を出し、1850年には表語文字の働きや、同じ音を複数の字で書く現象を説明した。ケヴィン・キャスカートは2011年に、ベヒストゥンのバビロニア語版はアッカド語解読の最初の段階には何の役割も果たさなかったと結論づけている。</p>\n\n<h3>封印された4通の訳文：1857年</h3>\n<p>決着をつけた試験は、別の文書を使って行われた。1857年3月、写真術の発明者の一人である<strong>ウィリアム・ヘンリー・フォックス・タルボット</strong>が、石版刷りで出たばかりの碑文の翻訳を封をして王立アジア協会に送った。碑文はアッシュル出土のアッシリア王ティグラト・ピレセル1世（在位前1114〜1076年ごろ）の粘土角柱の銘文である。ローリンソンはすでに自分の訳に取りかかっていた。その提案で協会の書記エドウィン・ノリスはヒンクスにも訳を依頼し、パリの<strong>ジュリウス・オッペール</strong>も自ら訳してみると申し出た。4人はそれぞれ、他の訳を見ないまま作業した。1857年4月20日付のヒンクス宛ての手紙で、ノリスは訳文は5月の例会で開封するまで封をしておくと伝えている。5月下旬、歴史家ジョージ・グロート、ケンブリッジ大学トリニティ・カレッジのウィリアム・ヒューウェル、エジプト学者サー・ガードナー・ウィルキンソンらの委員会が4通を突き合わせた。ヒンクスとオッペールは時間が短く訳も短かったが、同じ箇所を訳した部分では4人の訳がおおむね一致した。協会はこれをアッカド語が読める証拠と認め、4通の訳はその年のうちに並べて印刷された。</p>\n\n<p>岩に残るバビロニア語版はひどく傷んでおり、それを写した記録も残らなかった。1904年にレナード・キングとレジナルド・キャンベル・トンプソンが再び碑文まで登ったとき、ローリンソンが1844年と1847年に取った紙拓はすでに傷み始めており、その後ばらばらに崩れてしまった。エリザベス・フォン・フォイクトランダーの1978年の校訂本は、主にジョージ・キャメロンが1957年に取ったラテックスの型をもとにしているが、その型も劣化した。2025年にヨハネス・ハックルが資料を洗い直し、彼女が新たに加えた読みは確かめようがなく、バビロニア語版のおよそ3分の2は失われたものとみなすべきだと結論づけている。</p>"
    },
    "sources": [
      {
        "text": "Hackl, Johannes (2025). \"On the Rocks: The Unfinished Story of the Babylonian Version of the Bīsotūn (Behistun) Inscription (DB Bab.).\" Iraq 87: 143–162. Cambridge University Press / British Institute for the Study of Iraq.",
        "url": "https://www.cambridge.org/core/product/9060DE36551D7123391F7267B616099F/core-reader"
      },
      {
        "text": "Cathcart, Kevin J. (2011). \"The Earliest Contributions to the Decipherment of Sumerian and Akkadian.\" Cuneiform Digital Library Journal 2011:1.",
        "url": "https://cdli.earth/articles/cdlj/2011-1"
      },
      {
        "text": "Royal Asiatic Society Archives, GOV4/410: Letter from Edwin Norris to Rev. Edward Hincks, 20 April 1857 (and related letters GOV4/411, 418, 419 on the Tiglath-Pileser translations).",
        "url": "https://www.royalasiaticarchives.org/index.php/letter-from-edwin-norris-to-rev-edward-hincks-20-april-1857"
      },
      {
        "text": "Lendering, Jona. \"Behistun (Bisotun).\" Livius.org.",
        "url": "https://www.livius.org/articles/place/behistun/"
      }
    ]
  },
  {
    "id": "runes-futhark",
    "icon": "ᚠ",
    "tags": [
      "runes",
      "writing systems",
      "old norse",
      "germanic",
      "epigraphy"
    ],
    "title": {
      "en": "Runes: 24 letters, then 16, for a language that needed more",
      "ja": "ルーン文字：24字から16字へ、音が増えた言語で文字は減った"
    },
    "summary": {
      "en": "The Germanic runic alphabet began with 24 letters. In Viking-age Scandinavia it was cut to 16 while Old Norse was gaining vowels, so King Gorm's name came out as kurmʀ. The English went the other way and added runes.",
      "ja": "ゲルマン人のルーン文字は24字で始まった。ところがヴァイキング時代のスカンディナヴィアでは、古ノルド語の母音が増えていく一方で文字は16字に削られ、ゴーム王の名は kurmʀ と綴られた。イングランドでは逆に文字が足されていった。"
    },
    "body": {
      "en": "<p>The oldest securely dated runic inscription is a single word, <em>harja</em>, cut into a bone comb from the Vimose bog on Funen, Denmark, around 160 CE. In 2023 the University of Oslo's Museum of Cultural History presented a rival: the <strong>Svingerud stone</strong>, excavated in 2021 from a cremation grave at Svingerud in Hole, Ringerike, Norway, and radiocarbon-dated by the burnt bone and charcoal around it to between 1 and 250 CE. Its legible runes read <em>idiberug</em>, and nobody has settled what that means. The alphabet behind these finds is the <strong>Elder Futhark</strong>, named, like the English word <em>alphabet</em>, after its first letters: ᚠ f, ᚢ u, ᚦ þ, ᚨ a, ᚱ r, ᚲ k. It had 24 runes and was used from about the 2nd to the 8th century. Most runologists derive it from one of the alphabets of northern Italy, though the exact model is disputed.</p>\n\n<p>The full row survives because people carved it out as a list. The <strong>Kylver stone</strong>, a limestone slab found in 1903 in a cemetery at Kylver in Stånga parish, Gotland, and dated to about 400, carries all 24 runes in order. It was found lying face down as the lid of a grave, so the futhark faced the dead. After the row comes a tree-shaped sign and the palindrome <em>sueus</em>, whose meaning is also unknown. Gold bracteates of the 6th century, such as the one from Vadstena in Sweden, give the row split into three groups of eight, the grouping later Icelandic tradition calls <em>ættir</em>.</p>\n\n<h3>Sixteen runes in the north</h3>\n\n<p>Between about 650 and 800 the Scandinavians cut the row down to 16, and the reduction was complete by the late 8th century. At the same time Old Norse was gaining sounds. Umlaut had produced the new vowels <em>y</em>, <em>ø</em>, <em>æ</em> and <em>ǫ</em>, yet the <strong>Younger Futhark</strong> had only four vowel runes. One rune, ᚢ, now stood for u, o, ø, y and w; ᚴ covered k, g and ng; ᛏ covered t and d; ᛒ covered b and p. Vowel length went unwritten. The row came in two shapes: long-branch runes in Denmark and short-twig runes in Sweden and Norway.</p>\n\n<p>The <strong>Jelling stones</strong> in Jutland, inscribed together on UNESCO's World Heritage List in 1994, show what this meant in practice. On the smaller stone King Gorm the Old commemorates his wife Thyra, and his own name is spelled <em>kurmʀ kunukʀ</em> for <em>Gormr konungr</em>: k for g, u for o. On the larger stone, usually dated to about 965, his son writes <em>haraltr kunukʀ</em> for <em>Haraldr konungr</em> and <em>tanmaurk</em> for Denmark, with t for both d's. The text ends with Harald \"who won for himself all of Denmark and Norway and made the Danes Christian\" (<em>ok dani gerði kristna</em>, written <em>auk tani karþi kristno</em>).</p>\n\n<h3>The English went the other way</h3>\n\n<p>In Frisia and England the row grew instead. Old English and Old Frisian had split the old <em>a</em> into separate vowels, and the single <em>a</em> rune split with them into ᚪ <em>āc</em>, ᚫ <em>æsc</em> and ᚩ <em>ōs</em>. The fourth letter became ᚩ o, which is why the English row is called the <strong>futhorc</strong>. It started with 26 runes, settled at 28, and by the 9th century had grown to 33. Its best-known inscriptions are 8th-century: the Franks Casket, with a riddle in runes, and the Ruthwell Cross in Dumfriesshire. Latin letters brought by missionaries from the end of the 6th century replaced it, and runes were rare in England by the 11th century.</p>\n\n<h3>Shopping lists in Bergen</h3>\n\n<p>Scandinavia kept writing runes after it converted. Medieval scribes put the lost distinctions back with dots: a dotted ᚴ for g, a dotted ᛏ for d, a dotted ᛁ for e. After a fire burned nearly half of the Bryggen wharf in Bergen in July 1955, excavators recovered about 670 runic inscriptions, mostly on pine sticks, many from the 12th to 14th centuries. B001 reads <em>Eysteinn á mik</em>, \"Eysteinn owns me\", an owner's tag. B017 reads <em>Ást min, kyss mik</em>, \"My love, kiss me\". B149 reads <em>Gyða segir at þú gakk heim</em>, \"Gyða says you should go home\". Others carry <em>Ave Maria</em> in Latin. In Dalarna, Sweden, a local runic alphabet mixed with Latin letters stayed in use from the 16th century into the 20th.</p>\n\n<p>Modern rune-casting sets are a different matter. The meanings sold with them come from the rune names in medieval rune poems: an Old English one, a Norwegian one of about the 13th century and an Icelandic one of the 15th. The Elder Futhark names are reconstructed back from these poems. The \"blank rune\" in many sets first appeared in Ralph Blum's <em>The Book of Runes</em> in 1982. Tacitus, writing his <em>Germania</em> in 98 CE, does describe Germans casting lots with marks cut on strips of fruit-tree wood, but he does not say the marks were letters, and no inscription from the runic period records divination with runes.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"non,ang,got,is,da\" data-word=\"stone\">⚖️ Compare \"stone\" in Old Norse, Old English, Gothic, Icelandic and Danish</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"non\">🔍 Open Old Norse</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"55.76\" data-lng=\"9.42\" data-zoom=\"5\">🌍 Fly to Jelling</button>\n</div>",
      "ja": "<p>年代が確実にわかる最古のルーン銘文は、たった一語だ。デンマーク・フュン島のヴィモーセ湿地で見つかった骨製の櫛に刻まれた <em>harja</em> で、160年ごろのものとされる。2023年には、オスロ大学文化史博物館がこれに並ぶ候補を発表した。2021年にノルウェー・リンゲリーケ地方ホーレのスヴィンゲルーで火葬墓から掘り出された<strong>スヴィンゲルー石</strong>で、周囲の焼けた骨と木炭の放射性炭素年代から紀元1〜250年とされる。読み取れるルーンは <em>idiberug</em> だが、意味はまだ定まっていない。これらの文字は<strong>古フサルク</strong>と呼ばれる。英語の alphabet と同じく最初の文字から付いた名で、ᚠ f、ᚢ u、ᚦ þ、ᚨ a、ᚱ r、ᚲ k と並ぶ。字数は24で、おおよそ2世紀から8世紀まで使われた。多くのルーン学者は北イタリアのアルファベットのどれかを手本とみるが、どれだったかについては意見が分かれている。</p>\n\n<p>24字の全体が残っているのは、文字を一覧として刻んだ人々がいたからだ。<strong>キュルヴェル石</strong>はゴットランド島スタンガ教区キュルヴェルの墓地で1903年に見つかった石灰岩の板で、400年ごろのものとされ、24字が順番どおりに刻まれている。墓の蓋として面を下に向けた状態で見つかったので、文字は死者のほうを向いていたことになる。列の後ろには樹のような記号と、前後どちらから読んでも同じ <em>sueus</em> という語が続くが、これも意味はわかっていない。6世紀の金のブラクテアート（メダル状の装身具）、たとえばスウェーデンのヴァドステーナ出土のものでは、列が8字ずつ三つに区切られている。後のアイスランドの伝統で <em>ættir</em>（族）と呼ばれる区分だ。</p>\n\n<h3>北欧では16字に</h3>\n\n<p>650年ごろから800年ごろにかけて、スカンディナヴィアの人々は字数を16にまで減らし、8世紀の終わりにはこの縮小が完了した。ところが同じ時期、古ノルド語では音が増えていた。ウムラウトによって <em>y</em>、<em>ø</em>、<em>æ</em>、<em>ǫ</em> という新しい母音が生まれていたのに、<strong>新フサルク</strong>の母音字は四つしかない。ᚢ 一字が u・o・ø・y・w を、ᚴ が k・g・ng を、ᛏ が t・d を、ᛒ が b・p を受け持ち、母音の長短も書き分けられなくなった。字形にはデンマークの長枝ルーンと、スウェーデン・ノルウェーの短枝ルーンの2系統がある。</p>\n\n<p>それが実際にどう書かれたかは、ユトランド半島の<strong>イェリング石碑</strong>を見るとわかる。1994年にユネスコ世界遺産に登録された2基の石碑だ。小さいほうの石は老ゴーム王が妃テューラを記念して建てたもので、王自身の名 <em>Gormr konungr</em>（ゴーム王）は <em>kurmʀ kunukʀ</em> と綴られている。g を k で、o を u で書いているわけだ。大きいほうの石は一般に965年ごろとされ、息子ハーラルが <em>Haraldr konungr</em> を <em>haraltr kunukʀ</em>、デンマークを <em>tanmaurk</em> と書いた。二つの d がどちらも t になっている。碑文は、ハーラルが「デンマークとノルウェーの全土を手に入れ、デーン人をキリスト教徒にした」と結ばれる（<em>ok dani gerði kristna</em>、ルーンでは <em>auk tani karþi kristno</em>）。</p>\n\n<h3>イングランドでは逆に増えた</h3>\n\n<p>フリジアとイングランドでは、字数は逆に増えた。古英語と古フリジア語では古い <em>a</em> がいくつかの母音に分かれていたので、<em>a</em> のルーンもそれに合わせて ᚪ <em>āc</em>、ᚫ <em>æsc</em>、ᚩ <em>ōs</em> の三つに分かれた。4番目の文字が ᚩ o になったため、英語のルーン列は<strong>フソルク</strong>（futhorc）と呼ばれる。初めは26字、標準形で28字、9世紀には33字にまで増えた。よく知られた銘文は8世紀のもので、ルーンで謎かけを刻んだフランクスの小箱や、ダンフリーズシャーのラスウェル十字架がある。6世紀末から宣教師がラテン文字を持ち込むとルーンは押しのけられ、11世紀のイングランドではもう珍しいものになっていた。</p>\n\n<h3>ベルゲンの木札に残った伝言</h3>\n\n<p>スカンディナヴィアではキリスト教化の後もルーンが書き続けられた。中世の書き手は、失われた区別を点を打って取り戻した。点付きの ᚴ が g、点付きの ᛏ が d、点付きの ᛁ が e を表す。1955年7月の火災でベルゲンの埠頭地区ブリッゲンのほぼ半分が焼けたあと、発掘で約670点のルーン銘文が見つかった。大半はマツの木札で、多くは12〜14世紀のものだ。B001 は <em>Eysteinn á mik</em>「エイステインの物」という持ち主の名札、B017 は <em>Ást min, kyss mik</em>「愛しい人、キスして」、B149 は <em>Gyða segir at þú gakk heim</em>「ギューザが、うちに帰ってこいって」。ラテン語の <em>Ave Maria</em> を刻んだものもある。スウェーデンのダーラナ地方では、ラテン文字を交えた地元のルーン文字が16世紀から20世紀まで使われていた。</p>\n\n<p>現代の占い用ルーンセットは、これとは別物だ。セットに付いてくる各文字の意味は、中世のルーン詩に出てくる文字の名から取られている。ルーン詩には古英語のもの、13世紀ごろのノルウェーのもの、15世紀のアイスランドのものがあり、古フサルクの文字名はこれらの詩からさかのぼって再建されたものだ。多くのセットに入っている「白紙のルーン」は、1982年のラルフ・ブラム『ルーンの書』（<em>The Book of Runes</em>）で初めて登場した。98年に『ゲルマニア』を書いたタキトゥスは、ゲルマン人が果樹の枝を切った札に印を刻んでくじを引くさまを記しているが、その印が文字だったとは書いていない。ルーンが使われていた時代の銘文にも、ルーンで占いをしたという記録はない。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"non,ang,got,is,da\" data-word=\"stone\">⚖️ 古ノルド語・古英語・ゴート語・アイスランド語・デンマーク語の「石」を比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"non\">🔍 古ノルド語を開く</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"panto\" data-lat=\"55.76\" data-lng=\"9.42\" data-zoom=\"5\">🌍 イェリングへ移動</button>\n</div>"
    },
    "sources": [
      {
        "text": "Michael P. Barnes, Runes: A Handbook (Boydell Press, 2012)",
        "url": "https://boydellandbrewer.com/9781843837787/runes/"
      },
      {
        "text": "Jelling stones (DR 41, DR 42): runic transliterations and normalizations from Rundata; UNESCO World Heritage 1994 — Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Jelling_stones"
      },
      {
        "text": "Bryggen inscriptions (B001, B017, B149; about 670 inscriptions found since 1955) — Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Bryggen_inscriptions"
      },
      {
        "text": "CNN, 'World's oldest dated runestone discovered in Norway' (Svingerud stone, Museum of Cultural History, University of Oslo), 18 January 2023",
        "url": "https://edition.cnn.com/style/article/worlds-oldest-runestone-norway-intl-scli-scn"
      }
    ]
  },
  {
    "id": "cree-syllabics",
    "icon": "🔺",
    "tags": [
      "writing-systems",
      "cree",
      "inuktitut",
      "canada",
      "syllabics"
    ],
    "title": {
      "en": "Cree syllabics: one shape, four turns",
      "ja": "クリー音節文字：形が子音、向きが母音"
    },
    "summary": {
      "en": "In Canadian Aboriginal syllabics the shape of a sign gives the consonant and the direction it faces gives the vowel. Printed by James Evans at Norway House in 1841, the script went on to carry Inuktitut, Ojibwe, Blackfoot and Dene languages, and has official status in Nunavut today.",
      "ja": "カナダ先住民音節文字では、記号の形で子音が決まり、その向きで母音が決まる。1841年にジェームズ・エヴァンズがノルウェー・ハウスで印刷したこの文字は、イヌクティトゥット語・オジブウェ語・ブラックフット語・デネ諸語に広がり、現在はヌナヴト準州で公的な地位をもつ。"
    },
    "body": {
      "en": "<p>Take the Plains Cree sign <strong>ᐱ</strong>. It reads <em>pi</em>. Turn it upside down and it becomes <strong>ᐯ</strong> <em>pê</em>; point it right and it is <strong>ᐳ</strong> <em>po</em>; point it left and it is <strong>ᐸ</strong> <em>pa</em>. The same four turns apply to every consonant: <strong>ᑎ ᑌ ᑐ ᑕ</strong> are <em>ti tê to ta</em>, <strong>ᑭ ᑫ ᑯ ᑲ</strong> are <em>ki kê ko ka</em>. The bare triangle with no consonant gives the vowels alone: <strong>ᐃ ᐁ ᐅ ᐊ</strong>, <em>i ê o a</em>. A dot above marks a long vowel (<strong>ᐲ</strong> <em>pî</em>), and small raised signs write a consonant that has no vowel after it.</p>\n\n<p>The Cree word for \"dog\" on the map, <strong>ᐊᑎᒼ</strong> <em>atim</em>, uses all three parts: the vowel ᐊ <em>a</em>, the syllable ᑎ <em>ti</em>, and the small final ᒼ <em>m</em>. \"Fire\", <strong>ᐃᐢᑯᑌᐤ</strong> <em>iskotêw</em>, reads <em>i–s–ko–tê–w</em>, with two finals. A reader who has learned about a dozen shapes and four directions can sound out any Cree word, and the Dictionary of Canadian Biography records that the script spread rapidly among Cree communities after 1840.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"dog\" data-code=\"cr\">💬 See \"dog\" in Cree syllabics</button>\n</div>\n\n<h3>Who made it</h3>\n\n<p>The documentary record credits <strong>James Evans</strong>, a Methodist missionary who learned Ojibwe at Rice Lake, Ontario, from 1828 and had devised an Ojibwe syllabary by 1836. Moved to Norway House, in what is now Manitoba, in 1840, he adapted the system to Cree. In 1841 he printed a Cree hymn book there on a converted fur press, with type cast from the lead linings of tea chests and from bullets; a print run of about 100 copies is recorded, and three are known to survive. Evans worked with Indigenous translators and assistants, among them Henry Bird Steinhauer (an Ojibwe), Sophia Mason and John Sinclair. Accounts of his models point to Pitman shorthand and Devanagari, and he knew of Sequoyah's Cherokee syllabary.</p>\n\n<p>Cree oral tradition gives a different origin. In an article in <em>Oral History Forum</em> (1999–2000), Winona Stevenson (now Winona Wheeler), of Fisher River Cree Nation, set out accounts in which the syllabary was received by <strong>Calling Badger</strong> (Mistanaskowêw) and was in use among Cree before Evans arrived, so that the missionaries learned it from the Cree. No written document from before 1840 has been found, and some scholars argue the accounts arose after Evans; the question remains open.</p>\n\n<h3>From Cree to the Arctic</h3>\n\n<p>Anglican missionaries E. A. Watkins and John Horden brought the script to Inuit on the east coast of Hudson Bay in the 1850s: Watkins prepared gospel selections in Inuktitut syllabics, which Horden printed at Moose Factory in 1855–56. From 1876 Edmund Peck spread a revised version across the eastern Arctic. Inuktitut has three vowels, not four, so the down-pointing orientation was used for the diphthong <em>ai</em>, and new series were added for sounds Cree lacks, such as <strong>ᕿ</strong> <em>qi</em>. On the map, Inuktitut <strong>ᕿᒻᒥᖅ</strong> <em>qimmiq</em> \"dog\" is <em>qi–m–mi–q</em>. In 1976 the Inuit Cultural Institute set a standard with a one-to-one match between syllabics and Roman letters, dropping the <em>ai</em> series. It remains the standard in Nunavut, where syllabics have official status alongside Roman letters; Nunavik in Quebec has since restored the <em>ai</em> series, while Inuinnaqtun communities in western Nunavut write in Roman letters.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"dog\" data-codes=\"cr,iu,oj,chp,crx\">⚖️ Compare Cree, Inuktitut, Ojibwe, Chipewyan and Carrier</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"iu\">🔍 Open Inuktitut</button>\n</div>\n\n<h3>Other branches</h3>\n\n<p>Oblate priest Émile Petitot made syllabaries for several Athabaskan (Dene) languages, and Adrien-Gabriel Morice created a separate Carrier version in 1885, with six vowels marked by rotation, flipping and a centre stroke or dot. John William Tims produced Blackfoot syllabics around 1888–1890, partly reusing Cree shapes with different sound values and partly drawing new ones from Latin letters. Ojibwe syllabics are still written in northwestern Ontario. The map shows Ojibwe, Chipewyan and Carrier in Roman spelling (<em>animosh</em>, <em>łį</em>, <em>lhi</em> for \"dog\"), the form most in print for them today.</p>\n\n<p>Unicode encoded the scripts together as \"Unified Canadian Aboriginal Syllabics\", block U+1400–U+167F, in version 3.0 (1999), with extension blocks added later for further Cree, Ojibwe and Dene characters. One code point serves several languages: ᐊ is <em>a</em> in Cree and Inuktitut alike.</p>",
      "ja": "<p>平原クリー語の記号 <strong>ᐱ</strong> は <em>pi</em> と読む。これを上下逆さにすると <strong>ᐯ</strong> <em>pê</em>、右に向けると <strong>ᐳ</strong> <em>po</em>、左に向けると <strong>ᐸ</strong> <em>pa</em> になる。この四つの向きはどの子音にも共通で、<strong>ᑎ ᑌ ᑐ ᑕ</strong> は <em>ti tê to ta</em>、<strong>ᑭ ᑫ ᑯ ᑲ</strong> は <em>ki kê ko ka</em> だ。子音のない素の三角形は母音だけを表し、<strong>ᐃ ᐁ ᐅ ᐊ</strong> が <em>i ê o a</em> となる。上に点を打てば長母音（<strong>ᐲ</strong> <em>pî</em>）、小さく右上に添えた記号は後ろに母音のない子音を表す。</p>\n\n<p>マップに載っているクリー語の「犬」<strong>ᐊᑎᒼ</strong> <em>atim</em> は、この三種類をすべて使っている。母音の ᐊ <em>a</em>、音節の ᑎ <em>ti</em>、小さな末子音 ᒼ <em>m</em> だ。「火」<strong>ᐃᐢᑯᑌᐤ</strong> <em>iskotêw</em> は <em>i–s–ko–tê–w</em> と読み、末子音が二つ入る。十数個の形と四つの向きを覚えればどんなクリー語の単語でも音にでき、『カナダ人名事典』（Dictionary of Canadian Biography）は、1840年以降この文字がクリーの共同体のあいだに急速に広まったと記している。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"dog\" data-code=\"cr\">💬 クリー音節文字で「犬」を見る</button>\n</div>\n\n<h3>誰が作ったのか</h3>\n\n<p>文書記録が作者とするのは、メソジスト派の宣教師<strong>ジェームズ・エヴァンズ</strong>である。1828年からオンタリオ州ライス湖でオジブウェ語を学び、1836年までにオジブウェ語の音節文字を考案していた。1840年に現在のマニトバ州ノルウェー・ハウスへ移ると、これをクリー語に合わせて作り直した。1841年、毛皮用の圧縮機を改造した印刷機で、茶箱の内張りの鉛と銃弾を溶かして鋳造した活字を使い、クリー語の賛美歌集を刷っている。部数は約100部と記録され、現存が確認されているのは3部である。翻訳と印刷には、ヘンリー・バード・スタインハウアー（オジブウェ人）、ソフィア・メイソン、ジョン・シンクレアら先住民の協力者が加わった。手本についてはピットマン式速記とデーヴァナーガリーが挙げられ、エヴァンズはセコイアのチェロキー音節文字のことも知っていた。</p>\n\n<p>クリーの口承は別の起源を伝える。フィッシャー・リバー・クリー・ネーションのウィノナ・スティーヴンソン（現姓ウィーラー）は『Oral History Forum』誌（1999–2000年）の論文で、音節文字は<strong>コーリング・バジャー</strong>（Mistanaskowêw）が授かったもので、エヴァンズが来る前からクリーの間で使われており、宣教師のほうがクリーから習ったのだという伝承をまとめた。1840年以前の文字資料は見つかっておらず、伝承はエヴァンズ以後に生まれたとする研究者もいて、決着はついていない。</p>\n\n<h3>クリーから北極圏へ</h3>\n\n<p>1850年代、聖公会の宣教師E・A・ワトキンスとジョン・ホーデンがハドソン湾東岸のイヌイットにこの文字を伝えた。ワトキンスがイヌクティトゥット語の音節文字で福音書の抜粋を用意し、ホーデンが1855〜56年にムース・ファクトリーで印刷している。1876年からはエドマンド・ペックが改訂版を東部北極圏に広めた。イヌクティトゥット語の母音は四つではなく三つなので、下向きの記号は二重母音 <em>ai</em> に充てられ、<strong>ᕿ</strong> <em>qi</em> のようにクリー語にない音のための系列が加えられた。マップのイヌクティトゥット語「犬」<strong>ᕿᒻᒥᖅ</strong> <em>qimmiq</em> は <em>qi–m–mi–q</em> と読む。1976年にはイヌイット文化研究所が、音節文字とローマ字が一対一で対応する標準表記を定め、<em>ai</em> の系列を廃した。この標準はいまもヌナヴト準州で使われ、同準州では音節文字がローマ字と並んで公的な地位をもつ。一方、ケベック州のヌナヴィクはその後 <em>ai</em> の系列を復活させ、ヌナヴト西部のイヌインナクトゥン語の地域はローマ字で書く。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"dog\" data-codes=\"cr,iu,oj,chp,crx\">⚖️ クリー語・イヌクティトゥット語・オジブウェ語・チペワイアン語・キャリア語を比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"iu\">🔍 イヌクティトゥット語を開く</button>\n</div>\n\n<h3>ほかの枝分かれ</h3>\n\n<p>オブレート会の神父エミール・プティトはアサバスカ（デネ）系の複数の言語に音節文字を作り、アドリアン＝ガブリエル・モリスは1885年にキャリア語専用の版を考案した。こちらは母音が六つあり、回転・反転に加えて中央の線や点で区別する。ジョン・ウィリアム・ティムズは1888〜1890年ごろにブラックフット語の音節文字を作った。クリー式の形の一部を別の音価で借り、残りはラテン文字をもとに新しく作っている。オジブウェ語の音節文字はオンタリオ州北西部で今も書かれている。なおマップでは、オジブウェ語・チペワイアン語・キャリア語は現在いちばん広く印刷されているローマ字表記で載っている（「犬」は <em>animosh</em>、<em>łį</em>、<em>lhi</em>）。</p>\n\n<p>Unicode はこれらをまとめて「統合カナダ先住民音節文字」（U+1400–U+167F）として、1999年のバージョン3.0で収録し、その後クリー語・オジブウェ語・デネ諸語の追加文字のために拡張ブロックを設けた。一つの符号位置が複数の言語で共有され、ᐊ はクリー語でもイヌクティトゥット語でも <em>a</em> である。</p>"
    },
    "sources": [
      {
        "text": "Stevenson (Wheeler), Winona (1999–2000). \"Calling Badger and the Symbols of the Spirit Languages: The Cree Origins of the Syllabic System.\" Oral History Forum 19–20, pp. 19–24.",
        "url": "https://gladue.drc.usask.ca/node/6324"
      },
      {
        "text": "Hutchinson, Gerald M. \"Evans, James.\" Dictionary of Canadian Biography, vol. 7, University of Toronto / Université Laval, 1988.",
        "url": "https://www.biographi.ca/en/bio/evans_james_7E.html"
      },
      {
        "text": "Evans, James (1841). Cree Syllabic Hymn Book. Norway House: Rossville Mission Press; facsimile edition with introduction, Bibliographical Society of Canada, 1954.",
        "url": "https://archive.org/details/P000209"
      },
      {
        "text": "Pirurvik Centre / Government of Nunavut. \"Writing the Inuit Language.\" Inuktut Tusaalanga.",
        "url": "https://tusaalanga.ca/node/2505"
      }
    ]
  },
  {
    "id": "welsh-mutations",
    "icon": "🐉",
    "tags": [
      "welsh",
      "celtic",
      "mutation",
      "morphology",
      "sound-change"
    ],
    "title": {
      "en": "Cath, gath, chath, nghath: the Welsh word that changes its first letter",
      "ja": "cath・gath・chath・nghath：語頭が変わるウェールズ語"
    },
    "summary": {
      "en": "In Welsh the first consonant of a word changes with the word in front of it: cath 'cat' becomes ei gath 'his cat', ei chath 'her cat' and fy nghath 'my cat'. The three mutations are what is left of sounds that Brittonic lost around the sixth century.",
      "ja": "ウェールズ語では、前に来る語によって語頭の子音が変わる。cath「猫」が ei gath「彼の猫」、ei chath「彼女の猫」、fy nghath「私の猫」になる。この三種の変異は、6世紀ごろのブリトン語で消えた語末の音の名残だ。"
    },
    "body": {
      "en": "<p>The Welsh word for \"cat\" is <em>cath</em>. \"His cat\" is <em>ei gath</em>, \"her cat\" is <em>ei chath</em>, and \"my cat\" is <em>fy nghath</em>. The possessives <em>ei</em> \"his\" and <em>ei</em> \"her\" are spelled and pronounced the same. The only thing that tells them apart is what happens to the first consonant of the next word. Welsh grammar calls these changes <strong>mutations</strong> (<em>treigladau</em>), and it has three main ones: the <strong>soft</strong> mutation (<em>treiglad meddal</em>), the <strong>nasal</strong> (<em>trwynol</em>) and the <strong>aspirate</strong> (<em>llaes</em>).</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"cy\">🔍 Open Welsh</button>\n</div>\n\n<h3>Three sets of changes</h3>\n\n<p>Each mutation changes a fixed set of consonants:</p>\n<ul>\n<li><strong>Soft:</strong> p→b, t→d, c→g, b→f, d→dd, m→f, ll→l, rh→r, and g is dropped altogether. <em>Tad</em> \"father\" → <em>ei dad</em> \"his father\". <em>Gardd</em> \"garden\" → <em>yr ardd</em> \"the garden\".</li>\n<li><strong>Nasal:</strong> p→mh, t→nh, c→ngh, b→m, d→n, g→ng. <em>Fy nhad</em> \"my father\", <em>fy ngwely</em> \"my bed\".</li>\n<li><strong>Aspirate:</strong> only p→ph, t→th, c→ch. <em>Ei thad</em> \"her father\", <em>ei phen</em> \"her head\" (from <em>pen</em>).</li>\n</ul>\n<p>The word <em>pen</em> \"head\" goes through all of them: <em>ei ben</em> \"his head\", <em>ei phen</em> \"her head\", <em>fy mhen</em> \"my head\". When the next word starts with a vowel, \"her\" adds an h instead: <em>ei enw</em> is \"his name\", <em>ei henw</em> \"her name\".</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"father\" data-code=\"cy\">💬 See \"father\" (tad) across languages</button>\n</div>\n\n<h3>What sets them off</h3>\n\n<p>The trigger is the word in front, or the grammar it belongs to. A feminine singular noun softens after the article <em>y</em> \"the\", so <em>cath</em> becomes <em>y gath</em> \"the cat\". An adjective softens after a feminine singular noun: <em>cath fawr</em> \"a big cat\", from <em>mawr</em>. The plural <em>y merched mawr</em> \"the big girls\" has no mutation. The preposition <em>yn</em> \"in\" takes the nasal mutation and changes shape to match: <em>Cymru</em> \"Wales\" → <em>yng Nghymru</em> \"in Wales\", <em>ym Mangor</em> \"in Bangor\", <em>yng Nghaerdydd</em> \"in Cardiff\". The aspirate follows <em>a</em> \"and\" (<em>coffi a theisen</em>, \"coffee and cake\"), <em>â</em> \"with\", <em>tri</em> \"three\" and <em>chwe</em> \"six\": <em>tri chi</em> \"three dogs\", <em>chwe phlentyn</em> \"six children\". Gender is involved here too. <em>Tri</em> is only used with masculine nouns, and a feminine noun like <em>cath</em> takes <em>tair</em>, which does not mutate: <em>tair cath</em>, but <em>dwy gath</em> \"two cats\", because \"two\" softens.</p>\n\n<h3>Where they came from</h3>\n\n<p>The soft mutation began as <strong>lenition</strong>, a sound change that weakened consonants between vowels: Latin <em>securus</em> was borrowed as Welsh <em>segur</em>, and <em>superbus</em> as <em>syberw</em>. In Brittonic, the ancestor of Welsh, this weakening also happened across a word boundary when the word in front ended in a vowel. Then, according to Gareth Morgan's <em>Reading Middle Welsh</em>, Welsh lost its final syllables around the early sixth century AD. Once the vowel that caused the change was gone, the weakened consonant was left as a marker of grammar. Morgan's example is <em>*oina brigantinissa</em>, which became <em>un frenhines</em> \"one queen\". <em>Oina</em> is the feminine form of \"one\"; in Brittonic most feminine nouns and adjectives ended in <em>-a</em>, which is why a feminine singular noun still softens the word after it. The nasal mutation comes from words that once ended in a nasal: <em>fy</em> goes back to Proto-Brythonic <em>*mɨn</em>. For the aspirate mutation, Kenneth Jackson's <em>Language and History in Early Britain</em> (1953) proposed doubled voiceless stops (pp, tt, cc) that became the fricatives ph, th, ch. David Greene, Patrick Sims-Williams and others have argued for a different sequence of changes, and Graham Isaac defended Jackson's route in 2004. On either account the trigger words once ended in a consonant. The conjunction <em>a</em> once had the form <em>*ak</em>, and that lost final consonant is what still changes <em>teisen</em> to <em>theisen</em>.</p>\n\n<p>The other Celtic languages have related systems, built on different sounds. In Breton, \"cat\" is <em>kazh</em>, \"his cat\" is <em>e gazh</em> and \"my cat\" is <em>ma c'hazh</em>. Irish has <em>a chat</em> \"his cat\" with lenition, <em>a cat</em> \"her cat\" with no change, and <em>ár gcat</em> \"our cat\" with eclipsis, the Irish form of nasal mutation. Where Welsh marks \"her\" with an aspirate, Irish leaves the consonant alone.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"cy,br,kw,ga,gd\" data-word=\"cat\">⚖️ Compare \"cat\" in five Celtic languages</button>\n</div>",
      "ja": "<p>ウェールズ語で「猫」は <em>cath</em> という。ところが「彼の猫」は <em>ei gath</em>、「彼女の猫」は <em>ei chath</em>、「私の猫」は <em>fy nghath</em> になる。「彼の」も「彼女の」も綴りは同じ <em>ei</em> で、発音も変わらない。どちらの意味かは、次の語の頭の子音がどう変わるかで決まる。ウェールズ語の文法ではこの交替を<strong>変異</strong>（<em>treigladau</em>、英語で mutation）と呼ぶ。主なものは三つあり、<strong>軟音変異</strong>（<em>treiglad meddal</em>）、<strong>鼻音変異</strong>（<em>trwynol</em>）、<strong>帯気音変異</strong>（<em>llaes</em>）という。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"cy\">🔍 ウェールズ語を開く</button>\n</div>\n\n<h3>三通りの変わり方</h3>\n\n<p>どの変異でも、どの子音が何に変わるかは決まっている。</p>\n<ul>\n<li><strong>軟音変異：</strong>p→b、t→d、c→g、b→f、d→dd、m→f、ll→l、rh→r。g は消える。<em>tad</em>「父」→ <em>ei dad</em>「彼の父」、<em>gardd</em>「庭」→ <em>yr ardd</em>「その庭」。</li>\n<li><strong>鼻音変異：</strong>p→mh、t→nh、c→ngh、b→m、d→n、g→ng。<em>fy nhad</em>「私の父」、<em>fy ngwely</em>「私のベッド」。</li>\n<li><strong>帯気音変異：</strong>変わるのは p→ph、t→th、c→ch の三つだけ。<em>ei thad</em>「彼女の父」、<em>ei phen</em>「彼女の頭」（<em>pen</em> から）。</li>\n</ul>\n<p><em>pen</em>「頭」は三通りすべてに変わる。<em>ei ben</em>「彼の頭」、<em>ei phen</em>「彼女の頭」、<em>fy mhen</em>「私の頭」。次の語が母音で始まる場合、「彼女の」は h を足す。<em>ei enw</em> は「彼の名前」、<em>ei henw</em> は「彼女の名前」だ。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"father\" data-code=\"cy\">💬 各言語の「父」（tad）を見る</button>\n</div>\n\n<h3>何が変異を起こすか</h3>\n\n<p>変異を起こすのは直前の語や、それが属する文法の型だ。女性単数名詞は冠詞 <em>y</em> の後で軟音化し、<em>cath</em> は <em>y gath</em>「その猫」になる。女性単数名詞の後に来る形容詞も軟音化する。<em>cath fawr</em>「大きな猫」の <em>fawr</em> は <em>mawr</em> が変わった形だ。複数の <em>y merched mawr</em>「大きな娘たち」では変異しない。前置詞 <em>yn</em>「〜で」は鼻音変異を起こし、自分も次の音に合わせて形を変える。<em>Cymru</em>「ウェールズ」→ <em>yng Nghymru</em>「ウェールズで」、<em>ym Mangor</em>「バンガーで」、<em>yng Nghaerdydd</em>「カーディフで」。帯気音変異は <em>a</em>「と」（<em>coffi a theisen</em>「コーヒーとケーキ」）、<em>â</em>「〜と、〜で」、<em>tri</em>「3」、<em>chwe</em>「6」の後に起こる。<em>tri chi</em>「3匹の犬」、<em>chwe phlentyn</em>「6人の子ども」。ここにも性の区別がからむ。<em>tri</em> は男性名詞専用で、女性名詞の <em>cath</em> には変異を起こさない <em>tair</em> を使って <em>tair cath</em> と言う。「2」は軟音化を起こすので <em>dwy gath</em>「2匹の猫」になる。</p>\n\n<h3>どこから来たのか</h3>\n\n<p>軟音変異のもとは<strong>レニション</strong>（弱化）で、母音にはさまれた子音を弱める音変化だった。ラテン語 <em>securus</em> はウェールズ語に入って <em>segur</em> に、<em>superbus</em> は <em>syberw</em> になった。ウェールズ語の祖先であるブリトン語では、前の語が母音で終わっていれば、語の境目を越えて同じ弱化が起きた。ガレス・モーガンの『中期ウェールズ語を読む』（<em>Reading Middle Welsh</em>）によれば、その後6世紀初めごろにウェールズ語は語末の音節を失った。原因の母音が消えても子音の弱化は残り、文法の目印として働くようになった。モーガンが挙げる例は、<em>*oina brigantinissa</em> が <em>un frenhines</em>「一人の女王」になった変化だ。<em>oina</em> は「1」の女性形で、ブリトン語では女性名詞・形容詞の多くが <em>-a</em> で終わっていた。女性単数名詞がいまも後ろの語を軟音化させるのはそのためだ。鼻音変異は、かつて鼻音で終わっていた語に由来する。<em>fy</em> はブリトン祖語の <em>*mɨn</em> にさかのぼる。帯気音変異については、ケネス・ジャクソンが『初期ブリテンの言語と歴史』（<em>Language and History in Early Britain</em>、1953年）で、無声閉鎖音が重なった pp・tt・cc が摩擦音 ph・th・ch に変わったものと説明した。デイヴィッド・グリーンやパトリック・シムズ＝ウィリアムズらは別の順序の変化を主張し、2004年にはグレアム・アイザックがジャクソンの説を擁護している。どちらの説でも、変異を起こす語がかつて子音で終わっていた点は変わらない。接続詞 <em>a</em> の古い形は <em>*ak</em> で、今は消えたこの語末の子音が、いまも <em>teisen</em> を <em>theisen</em> に変えている。</p>\n\n<p>ほかのケルト系言語にも似た仕組みがあるが、使う音が違う。ブルトン語では「猫」が <em>kazh</em>、「彼の猫」が <em>e gazh</em>、「私の猫」が <em>ma c'hazh</em> になる。アイルランド語の「彼の猫」は軟音化した <em>a chat</em>、「彼女の猫」は変化しない <em>a cat</em>、「私たちの猫」は暗音化（エクリプシス）した <em>ár gcat</em> だ。ウェールズ語なら帯気音で示す「彼女の」を、アイルランド語は子音をそのままにして示す。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"cy,br,kw,ga,gd\" data-word=\"cat\">⚖️ ケルト系5言語の「猫」を比べる</button>\n</div>"
    },
    "sources": [
      {
        "text": "Gareth Morgan, Reading Middle Welsh, ch. 6 'Lenition' (1996; online edition by Daniel Morgan, MIT, 2001)",
        "url": "https://web.mit.edu/~dfm/www/canol/chap06.html"
      },
      {
        "text": "Wikipedia, 'Colloquial Welsh morphology', section on initial consonant mutation (triggers and examples)",
        "url": "https://en.wikipedia.org/wiki/Colloquial_Welsh_morphology"
      },
      {
        "text": "Wikipedia, 'Consonant mutation', Welsh and Celtic sections: ei dad / ei thad, Breton kazh / e gazh, Irish a chat / a cat, and the origin of a 'and' from *ak",
        "url": "https://en.wikipedia.org/wiki/Consonant_mutation"
      },
      {
        "text": "Graham R. Isaac, 'The chronology of the development of Brittonic stops and the spirant mutation', Journal of Celtic Linguistics 8 (2004): 49-85 (defends Jackson 1953 against Greene, Harvey, Thomas and Sims-Williams)",
        "url": "https://codecs.vanhamel.nl/Isaac_(G._R.)_2004a"
      }
    ]
  },
  {
    "id": "icelandic-purism",
    "icon": "🌋",
    "tags": [
      "icelandic",
      "purism",
      "neologisms",
      "old-norse",
      "language-planning"
    ],
    "title": {
      "en": "Tölva and sími: how Icelandic builds new words from old ones",
      "ja": "トルヴァとシーミ：古い言葉から新語をつくるアイスランド語"
    },
    "summary": {
      "en": "Icelandic calls a computer tölva, a 1965 blend of 'number' and 'prophetess', and a telephone sími, an Old Norse word for a cord. A state committee, a nineteenth-century magazine and saga editions in normalized spelling sit behind the habit.",
      "ja": "アイスランド語ではコンピューターを tölva（「数」と「巫女」を合わせた1965年の造語）、電話を sími（古ノルド語で「紐」）と呼ぶ。この習慣の背後には、19世紀の雑誌、国の言語委員会、そして綴りを整えたサガの校訂本がある。"
    },
    "body": {
      "en": "<p>The University of Iceland's first computer was an IBM 1620, leased for teaching in 1963 and bought in 1964, when the University Computing Centre was founded around it. In 1965 the literary scholar <strong>Sigurður Nordal</strong>, born in 1886, proposed a name for it: <em>tölva</em>, a blend of <em>tala</em> \"number\" and <em>völva</em> \"prophetess, seeress\". The <em>völva</em> is the speaker of <em>Völuspá</em>, the opening poem of the Poetic Edda, so the machine became a fortune-teller of numbers. The word took the declension of <em>völva</em>, giving the plural <em>tölvur</em>, and was in print by November 1966, when the newspaper <em>Vísir</em> wrote that <em>tölva Háskólans</em>, \"the University's computer\", had arrived with a memory of 40,000 digits.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"is,fo,sv,no,da\" data-word=\"computer\">⚖️ Compare the Nordic words for \"computer\"</button>\n</div>\n\n<p>The neighbours chose differently. Danish says <em>computer</em>, Swedish <em>dator</em> and Norwegian <em>datamaskin</em> \"data machine\". Faroese followed Iceland: in 1984 the linguist Jóhan Hendrik Winther Poulsen coined <em>telda</em> from <em>tal</em> \"number\", inspired by <em>tölva</em>, to replace the earlier <em>roknari</em> and <em>dátutól</em>.</p>\n\n<h3>Old words with new jobs</h3>\n\n<p>The telephone got an older word. Old Norse <em>sími</em> meant \"cord, rope\"; Geir Zoëga's 1910 dictionary of Old Icelandic glosses it exactly that way. When telephone lines were first planned it competed with <em>málþráður</em> \"speech-thread\", and the wire itself reached Iceland with the submarine cable landed at Seyðisfjörður in 1906. Compounds then sorted out the technologies: <em>ritsími</em> \"writing-wire\" for the telegraph, <em>talsími</em> \"speaking-wire\" for the telephone, and today <em>farsími</em> \"travelling-wire\" for a mobile phone. Other coinages follow the same two routes — compounding native roots or reviving dead ones: <em>sjónvarp</em> \"sight-casting\" for television, <em>útvarp</em> \"out-casting\" for radio, <em>þota</em> \"jet\" from the verb <em>þjóta</em> \"to rush\".</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"mobilephone\" data-code=\"is\">💬 See \"mobile phone\" in Icelandic and other languages</button>\n</div>\n\n<h3>Who coins the words</h3>\n\n<p>The habit predates any committee. The magazine <em>Fjölnir</em>, published in Copenhagen in 1835–39 and 1844–47, campaigned against the Danish words then common in written Icelandic. One of its founders, the poet <strong>Jónas Hallgrímsson</strong>, translated an astronomy textbook as <em>Stjörnufræði</em> (1842) and coined <em>sjónauki</em> \"telescope\" and <em>aðdráttarafl</em> \"gravity\" for it. His birthday, 16 November, has been Icelandic Language Day since 1996. The state body came in the 1960s: <strong>Íslensk málnefnd</strong>, the Icelandic Language Committee, set up under the Ministry of Education in 1964–65, given a permanent secretariat by law in 1984, and since 2006 served by the Árni Magnússon Institute for Icelandic Studies. Specialist word committees, starting with the Association of Engineers' in 1918, supply terms for their own fields.</p>\n\n<p>The policy is not total. <em>Bíll</em> \"car\" came in through Danish <em>bil</em>, short for <em>automobil</em>, and stayed. For AIDS, <em>eyðni</em> — built on <em>eyða</em> \"to destroy\" and chosen to echo the English sound — competes with the fully native <em>alnæmi</em> \"all-susceptibility\".</p>\n\n<h3>Reading the sagas</h3>\n\n<p>Icelanders are said to read the medieval sagas with ease, and the vocabulary and grammar do make that possible. The spelling helps more than it shows: most readers use editions that are normalized, as in the <em>Íslenzk fornrit</em> series that Sigurður Nordal began editing in 1933, or rewritten in modern orthography with footnotes. The sound of the language has moved further. In the Middle Icelandic period, roughly 1350–1550, the long vowels /aː eː ɛː oː/ became diphthongs, so <em>bók</em> \"book\", pronounced [boːk] in Old Norse, is [pouːk] in Icelandic today — the same letters, a different word to the ear.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"non,is,fo\" data-word=\"book\">⚖️ Compare \"book\" in Old Norse, Icelandic and Faroese</button>\n</div>",
      "ja": "<p>アイスランド大学最初のコンピューターは IBM 1620 で、1963年に教育用として借り受け、1964年に買い取った。大学計算センターはこの購入のときに設立されている。1965年、1886年生まれの文学者<strong>シグルズル・ノルダル</strong>がこの機械の名を提案した。<em>tölva</em>（トルヴァ）——<em>tala</em>「数」と <em>völva</em>「巫女、女予言者」を合わせた造語である。<em>völva</em> は『詩のエッダ』冒頭の詩『巫女の予言（Völuspá）』の語り手で、機械は「数の予言者」になった。語形変化も <em>völva</em> に倣い、複数形は <em>tölvur</em>。1966年11月には新聞『ヴィースィル』が、「<em>tölva Háskólans</em>（大学のトルヴァ）」は4万桁の記憶装置を備えて到着した、と書いている。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"is,fo,sv,no,da\" data-word=\"computer\">⚖️ 北欧諸語の「コンピューター」を比べる</button>\n</div>\n\n<p>近隣の言語は別の道を選んだ。デンマーク語は <em>computer</em>、スウェーデン語は <em>dator</em>、ノルウェー語は <em>datamaskin</em>「データ機械」。フェロー語はアイスランドに続いた。1984年、言語学者ヨハン・ヘンドリク・ウィンター・ポウルセンが <em>tölva</em> に着想を得て <em>tal</em>「数」から <em>telda</em> を造り、それまでの <em>roknari</em> や <em>dátutól</em> に代えた。</p>\n\n<h3>古い言葉に新しい仕事を</h3>\n\n<p>電話には古語が充てられた。古ノルド語の <em>sími</em> は「紐、綱」の意で、ゲイル・ソーエガの1910年の古アイスランド語辞典もそう記している。電話線の敷設が最初に計画された頃は <em>málþráður</em>「言葉の糸」と競い合い、線そのものは1906年にセイジスフィヨルズルに陸揚げされた海底ケーブルとともにやって来た。その後、複合語で役割が分けられた。電信は <em>ritsími</em>「書く線」、電話は <em>talsími</em>「話す線」、そして今の携帯電話は <em>farsími</em>「旅する線」。ほかの新語も同じ二つの方法——固有の語根を組み合わせるか、使われなくなった語を呼び戻すか——で作られている。テレビは <em>sjónvarp</em>「視覚を投げるもの」、ラジオは <em>útvarp</em>「外へ投げるもの」、ジェット機は動詞 <em>þjóta</em>「突進する」から <em>þota</em>。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"mobilephone\" data-code=\"is\">💬 アイスランド語などの「携帯電話」を見る</button>\n</div>\n\n<h3>新語を作るのは誰か</h3>\n\n<p>この習慣は委員会より古い。1835〜39年と1844〜47年にコペンハーゲンで刊行された雑誌『フィヨルニル』は、当時の書き言葉に多かったデンマーク語の借用に反対する論陣を張った。創刊者の一人である詩人<strong>ヨーナス・ハットルグリームソン</strong>は天文学の教科書を『星の学（Stjörnufræði）』（1842年）として訳し、その際に <em>sjónauki</em>「望遠鏡」（「視覚を増すもの」）や <em>aðdráttarafl</em>「引力」（「引き寄せる力」）を造った。彼の誕生日11月16日は、1996年から「アイスランド語の日」になっている。国の機関ができたのは1960年代で、<strong>アイスランド言語委員会（Íslensk málnefnd）</strong>が1964〜65年に教育省のもとで発足し、1984年の法律で常設の事務局を得た。2006年からはアルニ・マグヌッソン・アイスランド研究所がその事務を担う。各分野の専門用語は、1918年の技術者協会を皮切りに、分野ごとの用語委員会が作っている。</p>\n\n<p>とはいえ、借用を完全に締め出しているわけではない。「車」の <em>bíll</em> はデンマーク語 <em>bil</em>（<em>automobil</em> の短縮形）から入ってそのまま定着した。エイズを表す語では、<em>eyða</em>「破壊する」から作り英語の音にも寄せた <em>eyðni</em> と、純粋な固有語の <em>alnæmi</em>「全面的な感染しやすさ」がいまも並び立っている。</p>\n\n<h3>サガを読むということ</h3>\n\n<p>アイスランド人は中世のサガを苦もなく読める、とよく言われる。語彙と文法の面では、確かにそれが可能だ。ただし綴りの助けは見た目以上に大きい。多くの読者が手にするのは、シグルズル・ノルダルが1933年に編集を始めた叢書『イースレンスク・フォルンリト（Íslenzk fornrit）』のように綴りを標準化した校訂本か、現代正書法に直して注を付けた版である。音のほうはもっと大きく変わった。中期アイスランド語の時代（およそ1350〜1550年）に長母音 /aː eː ɛː oː/ が二重母音になり、古ノルド語で [boːk] だった <em>bók</em>「本」は、今のアイスランド語では [pouːk] と発音される。文字は同じでも、耳には別の語に聞こえる。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"non,is,fo\" data-word=\"book\">⚖️ 古ノルド語・アイスランド語・フェロー語の「本」を比べる</button>\n</div>"
    },
    "sources": [
      {
        "text": "Wiktionary (accessed 2026), entries \"tölva\" (coined 1965 by Sigurður Nordal from tala + völva; Vísir, 21 November 1966, p. 15) and \"telda\" (Faroese, coined 1984 by Jóhan Hendrik Winther Poulsen, inspired by tölva)",
        "url": "https://en.wiktionary.org/wiki/t%C3%B6lva"
      },
      {
        "text": "Geir T. Zoëga (1910), A Concise Dictionary of Old Icelandic, entry \"sími\" ('cord, rope')",
        "url": "https://old-icelandic.vercel.app/word/simi"
      },
      {
        "text": "Wikipedia, \"Linguistic purism in Icelandic\" (Fjölnir 1835–39 and 1844–47; Jónas Hallgrímsson's Stjörnufræði 1842; Association of Engineers 1918; Íslensk málnefnd 1965 decree; 1984 law and Íslensk málstöð; merger into the Árni Magnússon Institute 2006; bíll, eyðni/alnæmi), citing Halldór Halldórsson (1979), \"Icelandic Purism and Its History\", Word 30: 76–86",
        "url": "https://en.wikipedia.org/wiki/Linguistic_purism_in_Icelandic"
      },
      {
        "text": "Wikipedia, \"History of Icelandic\" (sagas read with modern spelling and footnotes; long vowels /aː eː ɛː oː/ became diphthongs in Middle Icelandic, 1350–1550); Icelandic Wikipedia, \"Reiknistofnun Háskóla Íslands\" (IBM 1620 leased 1963, bought 1964)",
        "url": "https://en.wikipedia.org/wiki/History_of_Icelandic"
      }
    ]
  },
  {
    "id": "grimms-law",
    "icon": "📚",
    "tags": [
      "sound-change",
      "germanic",
      "indo-european",
      "historical-linguistics"
    ],
    "title": {
      "en": "Grimm's Law: why Latin pater is English father",
      "ja": "グリムの法則：ラテン語の pater が英語で father になるわけ"
    },
    "summary": {
      "en": "Latin pater, trēs, centum against English father, three, hundred: the Germanic consonant shift worked out by Rask (1818) and Grimm (1822), and the accent rule Karl Verner found in 1875 to explain its exceptions.",
      "ja": "ラテン語の pater・trēs・centum と英語の father・three・hundred。ラスク（1818年）とグリム（1822年）が体系化したゲルマン語の子音推移と、その例外をカール・ヴェルネルが1875年にアクセントで説明した話。"
    },
    "body": {
      "en": "<p>Latin <em>pater</em>, <em>trēs</em> and <em>centum</em> line up with English <em>father</em>, <em>three</em> and <em>hundred</em> one consonant at a time: <em>p</em> against <em>f</em>, <em>t</em> against <em>th</em>, and <em>c</em> (pronounced [k]) against <em>h</em>. Latin is not the ancestor of English. Both descend from Proto-Indo-European, and in these consonants Latin, Greek and Sanskrit kept the inherited stops, while the ancestor of the Germanic languages changed them. That change is called <strong>Grimm's Law</strong>, or the First Germanic Sound Shift.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"father\" data-codes=\"la,el_grc,h_vedic,ang,en\">⚖️ Compare \"father\" in Latin, Greek, Vedic, Old English and English</button>\n</div>\n\n<h3>Rask in 1818, Grimm in 1822</h3>\n<p>Friedrich von Schlegel pointed out the match between Latin <em>p</em> and Germanic <em>f</em> in 1806. The Danish linguist <strong>Rasmus Rask</strong> worked out the full set of correspondences in an essay he wrote in Iceland in 1814 for a prize offered by the Danish Academy of Sciences. The essay won and was printed in Copenhagen in 1818 as <em>Undersøgelse om det gamle Nordiske eller Islandske Sprogs Oprindelse</em> (Investigation of the Origin of the Old Norse or Icelandic Language). <strong>Jacob Grimm</strong>, who also collected fairy tales with his brother Wilhelm, set them out as a system in the 1822 second edition of the first volume of his <em>Deutsche Grammatik</em>, and added the later shift that sets High German apart from the other Germanic languages. Rask published first, but the name that stuck is Grimm's.</p>\n\n<h3>Three steps in a chain</h3>\n<ul>\n<li>Voiceless stops became fricatives: *p → f, *t → þ (th), *k → h. Latin <em>pēs</em>, English <em>foot</em>; Latin <em>trēs</em>, Old English <em>þrī</em>; Latin <em>cor</em>, English <em>heart</em>.</li>\n<li>Voiced stops became voiceless: *d → t, *g → k. Latin <em>dēns</em>, English <em>tooth</em>; Latin <em>duo</em>, English <em>two</em>; Latin <em>genu</em>, English <em>knee</em>.</li>\n<li>Breathy-voiced (\"aspirated\") stops lost their breathiness: *bʰ → b, *dʰ → d, *gʰ → g. Sanskrit <em>bhrātā</em>, English <em>brother</em>.</li>\n</ul>\n<p>The first two steps cannot have happened the other way round. If *d had become t before the old *t moved on to þ, the two sounds would have merged, and they did not. Either the first step came first, or the two moved together as one chain. The shift also skipped a stop that came right after s. Gothic <em>fisks</em> \"fish\" keeps the k of the cluster sk, the same k as Latin <em>piscis</em>, even though the first p of the word became f. No inscription dates the shift. It is placed in the first millennium BCE, before the earliest Germanic records.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"three\" data-codes=\"la,el_grc,got,ang,en\">⚖️ Compare \"three\" in Latin, Greek, Gothic, Old English and English</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"fish\" data-codes=\"la,got,non,ang,en\">⚖️ Compare \"fish\": p becomes f, but sk stays</button>\n</div>\n\n<h3>Verner in 1875: the exceptions</h3>\n<p>The law did not cover every word. If PIE *t became þ, Old English should say <em>*fæþer</em>, but it says <em>fæder</em>, while <em>brōþor</em> \"brother\" has the expected þ. The Danish linguist <strong>Karl Verner</strong> found the reason in 1875. His article \"Eine Ausnahme der ersten Lautverschiebung\" (An exception to the first sound shift) appeared in volume 23 of the <em>Zeitschrift für vergleichende Sprachforschung</em>, pages 97–130, which references date anywhere from 1875 to 1877. The reason was the accent, which Vedic Sanskrit and Greek preserve. Sanskrit <em>pitā́</em> \"father\" is stressed on the second syllable and <em>bhrā́tā</em> \"brother\" on the first. Inside a word, the fricatives f, þ, h and the inherited s became voiced unless the syllable just before them carried the PIE accent. So *ph₂tḗr gave Proto-Germanic *fadēr, while *bʰréh₂tēr gave *brōþēr. <em>Mother</em> followed <em>father</em>: Sanskrit <em>mātā́</em>, Old English <em>mōdor</em>.</p>\n\n<p>The same rule explains the d in <em>hundred</em>. PIE *ḱm̥tóm (Sanskrit <em>śatám</em>) is accented on its last syllable. Its t became þ under Grimm's Law and was then voiced under Verner's, which gives Gothic and Old English <em>hund</em>. Germanic later moved the stress to the first syllable of every word, so the voiced and voiceless variants were left side by side inside verb paradigms. Old English has <em>cēosan</em> \"choose\" beside the past participle <em>coren</em>, and English has <em>was</em> beside <em>were</em>. In both pairs the voiced s turned into r.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"hundred\" data-codes=\"la,h_vedic,got,ang,en\">⚖️ Compare \"hundred\" in Latin, Vedic, Gothic, Old English and English</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"mother\" data-codes=\"la,h_vedic,ang,enm,en\">⚖️ Compare \"mother\" from Vedic to English</button>\n</div>\n\n<h3>What came later</h3>\n<p>The <em>th</em> in modern <em>father</em> and <em>mother</em> is not the old þ. Old and Middle English wrote <em>fæder</em>, <em>fader</em>, <em>mōdor</em> and <em>moder</em>, and the d before -er only became [ð] in the 15th and 16th centuries. Gothic is no help with \"father\" either. Its everyday word is <em>atta</em>, and that is the form the map shows. <em>Fadar</em> occurs only once in the surviving texts, in Galatians 4:6, where it translates the Aramaic <em>abba</em>. In the south, Old High German shifted some consonants a second time: <em>zwei</em>, <em>zand</em> and <em>herza</em> stand where English has <em>two</em>, <em>tooth</em> and <em>heart</em>. This is the second shift that Grimm described in 1822.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"tooth\" data-codes=\"la,got,ang,goh,de\">⚖️ Compare \"tooth\": the first and second shifts</button>\n</div>",
      "ja": "<p>ラテン語の <em>pater</em>・<em>trēs</em>・<em>centum</em> と英語の <em>father</em>・<em>three</em>・<em>hundred</em> を並べると、子音が一つずつ対応している。<em>p</em> には <em>f</em>、<em>t</em> には <em>th</em>、<em>c</em>（[k] と読む）には <em>h</em> が対応する。ただし、ラテン語は英語の祖先ではない。どちらも印欧祖語の子孫で、これらの子音については、ラテン語・ギリシア語・サンスクリットが受け継いだ閉鎖音をそのまま残し、ゲルマン語の祖先のほうが変えてしまった。この変化を<strong>グリムの法則</strong>、または第一次ゲルマン語子音推移と呼ぶ。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"father\" data-codes=\"la,el_grc,h_vedic,ang,en\">⚖️ 「父」をラテン語・古典ギリシア語・ヴェーダ語・古英語・英語で比べる</button>\n</div>\n\n<h3>1818年のラスク、1822年のグリム</h3>\n<p>ラテン語の <em>p</em> とゲルマン語の <em>f</em> の対応には、1806年にフリードリヒ・フォン・シュレーゲルがすでに気づいていた。対応を全体にわたって整理したのはデンマークの言語学者<strong>ラスムス・ラスク</strong>である。デンマーク王立科学アカデミーの懸賞に応募するため、1814年にアイスランドで論文を書いた。論文は入賞し、1818年にコペンハーゲンで『古ノルド語またはアイスランド語の起源に関する研究』（<em>Undersøgelse om det gamle Nordiske eller Islandske Sprogs Oprindelse</em>）として出版された。これを一つの体系として示したのが<strong>ヤーコプ・グリム</strong>で、弟ヴィルヘルムと昔話を集めたあのグリムである。1822年の『ドイツ語文法』（<em>Deutsche Grammatik</em>）第1巻第2版に載せ、高地ドイツ語だけを他のゲルマン語から分けた、もう一段あとの推移も加えた。先に発表したのはラスクだったが、名前はグリムのものとして定着した。</p>\n\n<h3>鎖のようにつながる三段階</h3>\n<ul>\n<li>無声閉鎖音が摩擦音になった：*p → f、*t → þ（th）、*k → h。ラテン語 <em>pēs</em> と英語 <em>foot</em>、ラテン語 <em>trēs</em> と古英語 <em>þrī</em>、ラテン語 <em>cor</em> と英語 <em>heart</em>。</li>\n<li>有声閉鎖音が無声になった：*d → t、*g → k。ラテン語 <em>dēns</em> と英語 <em>tooth</em>、ラテン語 <em>duo</em> と英語 <em>two</em>、ラテン語 <em>genu</em> と英語 <em>knee</em>。</li>\n<li>息漏れを伴う有声閉鎖音（「有気音」）が息漏れを失った：*bʰ → b、*dʰ → d、*gʰ → g。サンスクリット <em>bhrātā</em> と英語 <em>brother</em>。</li>\n</ul>\n<p>最初の二段階は、逆の順では起こりえない。もし元の *t が þ に変わるより先に *d が t になっていたら、二つの音は合流していたはずだが、実際には合流していない。第一段階が先に起きたか、二つが一続きの連鎖として同時に動いたかのどちらかである。また、s の直後の閉鎖音は推移しなかった。ゴート語の「魚」<em>fisks</em> は、語頭の p は f になったのに、sk の k はラテン語 <em>piscis</em> と同じく k のまま残している。推移の年代を示す碑文はない。ゲルマン語の最古の記録よりも前、紀元前1千年紀のこととされる。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"three\" data-codes=\"la,el_grc,got,ang,en\">⚖️ 「3」をラテン語・古典ギリシア語・ゴート語・古英語・英語で比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"fish\" data-codes=\"la,got,non,ang,en\">⚖️ 「魚」を比べる：p は f になり、sk は残る</button>\n</div>\n\n<h3>1875年のヴェルネル：例外の正体</h3>\n<p>この法則に合わない語もあった。印欧祖語の *t が þ になったのなら、古英語の「父」は <em>*fæþer</em> になるはずだが、実際は <em>fæder</em> である。一方、<em>brōþor</em>「兄弟」は予想どおり þ を持つ。理由を見つけたのはデンマークの言語学者<strong>カール・ヴェルネル</strong>で、1875年のことだった。論文「第一次子音推移の一例外」（<em>Eine Ausnahme der ersten Lautverschiebung</em>）は『比較言語研究誌』（<em>Zeitschrift für vergleichende Sprachforschung</em>）第23巻97〜130ページに載ったが、刊行年は文献によって1875年から1877年までばらつく。理由はアクセントにあった。印欧祖語のアクセントの位置はヴェーダ語とギリシア語に残っている。サンスクリットの <em>pitā́</em>「父」は第2音節に、<em>bhrā́tā</em>「兄弟」は第1音節にアクセントがある。語中の摩擦音 f・þ・h と、もとからあった s は、直前の音節に印欧祖語のアクセントがない限り有声になった。だから *ph₂tḗr はゲルマン祖語 *fadēr になり、*bʰréh₂tēr は *brōþēr になった。「母」も「父」と同じ道をたどり、サンスクリット <em>mātā́</em> に対して古英語は <em>mōdor</em> となる。</p>\n\n<p><em>hundred</em> の d も同じ規則で説明できる。印欧祖語 *ḱm̥tóm（サンスクリット <em>śatám</em>）は最後の音節にアクセントがある。t はグリムの法則で þ になり、さらにヴェルネルの法則で有声化して、ゴート語と古英語の <em>hund</em> になった。のちにゲルマン語はアクセントをすべての語の第1音節に移したため、有声と無声の交替は動詞の活用の中にそのまま取り残された。古英語の <em>cēosan</em>「選ぶ」と過去分詞 <em>coren</em>、英語の <em>was</em> と <em>were</em> がその例で、どちらも有声化した s が r に変わっている。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"hundred\" data-codes=\"la,h_vedic,got,ang,en\">⚖️ 「100」をラテン語・ヴェーダ語・ゴート語・古英語・英語で比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"mother\" data-codes=\"la,h_vedic,ang,enm,en\">⚖️ 「母」をヴェーダ語から英語までたどる</button>\n</div>\n\n<h3>その後の変化</h3>\n<p>現代英語の <em>father</em> や <em>mother</em> の <em>th</em> は、古い þ ではない。古英語と中英語では <em>fæder</em>・<em>fader</em>・<em>mōdor</em>・<em>moder</em> と書かれていて、-er の前の d が [ð] になったのは15〜16世紀のことだ。「父」についてはゴート語も手がかりにならない。ふだん使われる語は <em>atta</em> で、地図に出ているのもこの形である。<em>fadar</em> は現存する文献に一度しか出てこない。ガラテヤ書4章6節で、アラム語の <em>abba</em> の訳として現れる。南では古高ドイツ語が一部の子音をもう一度ずらした。英語の <em>two</em>・<em>tooth</em>・<em>heart</em> に当たる語が、古高ドイツ語では <em>zwei</em>・<em>zand</em>・<em>herza</em> になる。これがグリムが1822年に記述した第二次推移である。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-word=\"tooth\" data-codes=\"la,got,ang,goh,de\">⚖️ 「歯」を比べる：第一次推移と第二次推移</button>\n</div>"
    },
    "sources": [
      {
        "text": "Verner, Karl. \"An Exception to the First Sound Shift\" (trans. of \"Eine Ausnahme der ersten Lautverschiebung\", Zeitschrift für vergleichende Sprachforschung 23, 97–130). In W. P. Lehmann (ed.), A Reader in Nineteenth Century Historical Indo-European Linguistics, Indiana University Press 1967; online at Linguistics Research Center, University of Texas at Austin.",
        "url": "https://lrc.la.utexas.edu/books/reader/11-k-verner"
      },
      {
        "text": "Rask, Rasmus. Undersøgelse om det gamle Nordiske eller Islandske Sprogs Oprindelse (Copenhagen, 1818), excerpt in W. P. Lehmann (ed.), A Reader in Nineteenth Century Historical Indo-European Linguistics, Indiana University Press 1967; online at Linguistics Research Center, University of Texas at Austin.",
        "url": "https://lrc.la.utexas.edu/books/reader/3-r-rask"
      },
      {
        "text": "Encyclopaedia Britannica. \"Verner's law.\"",
        "url": "https://www.britannica.com/topic/Verners-law"
      },
      {
        "text": "Project Wulfila (University of Antwerp). Gothic lemma \"fadar\" (sole occurrence, Galatians 4:6).",
        "url": "https://wulfila.be/gothic/browse/lemma/0709.html"
      }
    ]
  },
  {
    "id": "great-vowel-shift",
    "icon": "🔔",
    "tags": [
      "english",
      "sound-change",
      "spelling",
      "vowels",
      "scots"
    ],
    "title": {
      "en": "The Great Vowel Shift: why English \"i\" says /aɪ/",
      "ja": "大母音推移：英語の i はなぜ「アイ」と読むのか"
    },
    "summary": {
      "en": "Between about 1400 and 1700 every long vowel of southern English moved: bite /biːt/ became /baɪt/, house /huːs/ became /haʊs/, name /naːm/ became /neɪm/. The spelling stayed where it was.",
      "ja": "1400年頃から1700年頃にかけて、南イングランドの英語では長母音がすべて動いた。bite /biːt/ は /baɪt/ に、house /huːs/ は /haʊs/ に、name /naːm/ は /neɪm/ に。綴りは元のまま残った。"
    },
    "body": {
      "en": "<p>When Chaucer died in 1400, a Londoner said <em>bite</em> as /biːtə/, <em>house</em> as /huːs/, <em>name</em> as /naːmə/ and <em>boot</em> as /boːt/. Those values match the Latin values of the letters, the ones German and Italian still use. By about 1700 every one of these long vowels had moved: /iː/ and /uː/ had become diphthongs, and the vowels below them had each risen a step. The Danish linguist <strong>Otto Jespersen</strong> named the series the <em>Great Vowel Shift</em> in 1909, in Part I of <em>A Modern English Grammar on Historical Principles</em>, and drew the first diagram of it.</p>\n\n<h3>Seven long vowels</h3>\n\n<ul>\n<li>/iː/ → /aɪ/: <em>bite</em>, <em>five</em>, <em>wine</em></li>\n<li>/uː/ → /aʊ/: <em>house</em>, <em>mouth</em>, <em>out</em></li>\n<li>/eː/ → /iː/: <em>meet</em></li>\n<li>/oː/ → /uː/: <em>boot</em>, <em>moon</em></li>\n<li>/ɛː/ → /eː/, later /iː/: <em>meat</em>, <em>sea</em></li>\n<li>/aː/ → /eɪ/: <em>name</em>, <em>mate</em></li>\n<li>/ɔː/ → /oʊ/: <em>boat</em>, <em>stone</em></li>\n</ul>\n\n<p>The high vowels did not jump straight to /aɪ/ and /aʊ/. Roger Lass reconstructs a sequence /iː/ → /ei/ → /ɛi/ → /əi/ → /aɪ/, starting around 1500, using the descriptions of sixteenth- and seventeenth-century spelling reformers and grammarians, beginning with John Hart's <em>An Orthographie</em> of 1569. The map's Early Modern English row records <em>five</em> as /fəiv/ and <em>wine</em> as /wəin/, the half-way stage of Shakespeare's time. <em>Meet</em> and <em>meat</em> stayed apart through the shift and merged only afterwards; <em>great</em>, <em>break</em> and <em>steak</em> kept the older value and now rhyme with <em>mate</em>.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ang,enm,en_em,en\" data-word=\"five\">⚖️ Follow \"five\" from Old English to today</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"en,sco,en_geordie,de,nl\" data-word=\"house\">⚖️ Compare \"house\" in English, Scots, Geordie, German and Dutch</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"en,de,nl\" data-word=\"name\">⚖️ Compare \"name\" in English, German and Dutch</button>\n</div>\n\n<h3>The spelling stayed behind</h3>\n\n<p>English spelling settled during the same centuries. William Caxton set up the first press in England at Westminster in 1476, and printers kept spellings that went back to Middle English pronunciation. That is why <em>i</em> in <em>bite</em> spells /aɪ/ and <em>a</em> in <em>name</em> spells /eɪ/. The names of the letters moved too: the letter A was called /aː/ in Middle English and is now /eɪ/, E went from /eː/ to /iː/, I from /iː/ to /aɪ/.</p>\n\n<h3>Not unique, and not everywhere</h3>\n\n<p>English was not alone in breaking up its high vowels. German diphthongized /iː/ and /uː/ slightly earlier — Middle High German <em>bīzen</em> and <em>hūs</em> became <em>beißen</em> and <em>Haus</em> — and Dutch made <em>wijn</em> and <em>huis</em> out of the same Germanic long vowels (<em>huis</em> by way of an earlier fronted /yː/). German, however, adjusted its spelling, and it did not raise its mid and low vowels: German <em>Name</em> is still /ˈnaːmə/ and Dutch <em>naam</em> /naːm/, beside English /neɪm/.</p>\n\n<p>The shift also stopped short of the north. Northern Middle English and Scots had already fronted /oː/ before the shift began, so there was no vowel moving up behind /uː/, and /uː/ stayed. The map records Scots <em>hoose</em> and Geordie <em>house</em> both as /huːs/, while Scots <em>muin</em> /mɪn/ \"moon\" and <em>tuith</em> /tɪθ/ \"tooth\" continue that earlier fronted vowel.</p>\n\n<p>Whether this was one event is disputed. The push-chain account has /eː/ and /oː/ rising and forcing the high vowels out; the drag-chain account has /iː/ and /uː/ diphthongizing first and leaving space behind. Robert Stockwell and Donka Minkova, in a 1988 chapter in <em>Luick Revisited</em>, argued that the changes are structurally independent and spread over too long a period to count as a single chain. What is not disputed is the outcome: the seven long vowels of Chaucer's London became the vowels of <em>bite</em>, <em>house</em>, <em>meet</em>, <em>boot</em>, <em>sea</em>, <em>name</em> and <em>stone</em>.</p>",
      "ja": "<p>チョーサーが没した1400年、ロンドンの人は <em>bite</em> を /biːtə/、<em>house</em> を /huːs/、<em>name</em> を /naːmə/、<em>boot</em> を /boːt/ と発音していた。これは文字のラテン語式の読み、つまりドイツ語やイタリア語がいまも使っている読み方と一致する。1700年頃までに、これらの長母音はひとつ残らず位置を変えた。/iː/ と /uː/ は二重母音になり、その下の母音はそれぞれ一段ずつ上がった。この一連の変化を「<em>大母音推移</em>（Great Vowel Shift）」と名づけたのはデンマークの言語学者<strong>オットー・イェスペルセン</strong>で、1909年の『歴史的原理に基づく近代英文法』第1部でのことだ。最初の図解を描いたのも彼である。</p>\n\n<h3>七つの長母音</h3>\n\n<ul>\n<li>/iː/ → /aɪ/：<em>bite</em>、<em>five</em>、<em>wine</em></li>\n<li>/uː/ → /aʊ/：<em>house</em>、<em>mouth</em>、<em>out</em></li>\n<li>/eː/ → /iː/：<em>meet</em></li>\n<li>/oː/ → /uː/：<em>boot</em>、<em>moon</em></li>\n<li>/ɛː/ → /eː/、のちに /iː/：<em>meat</em>、<em>sea</em></li>\n<li>/aː/ → /eɪ/：<em>name</em>、<em>mate</em></li>\n<li>/ɔː/ → /oʊ/：<em>boat</em>、<em>stone</em></li>\n</ul>\n\n<p>高母音は一気に /aɪ/・/aʊ/ になったわけではない。ロジャー・ラスは、1569年のジョン・ハート『正書法』（<em>An Orthographie</em>）をはじめとする16〜17世紀の綴り字改革者や文法家の記述をもとに、1500年頃に始まる /iː/ → /ei/ → /ɛi/ → /əi/ → /aɪ/ という段階を再建している。マップの初期近代英語の行では <em>five</em> が /fəiv/、<em>wine</em> が /wəin/ となっていて、シェイクスピアの時代の中間段階にあたる。<em>meet</em> と <em>meat</em> は推移のあいだは別々の母音のままで、合流したのはその後だ。<em>great</em>、<em>break</em>、<em>steak</em> は古いほうの値にとどまり、いまは <em>mate</em> と韻を踏む。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ang,enm,en_em,en\" data-word=\"five\">⚖️ 古英語から現代まで「5」をたどる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"en,sco,en_geordie,de,nl\" data-word=\"house\">⚖️ 英語・スコットランド語・ジョーディー・ドイツ語・オランダ語の「家」を比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"en,de,nl\" data-word=\"name\">⚖️ 英語・ドイツ語・オランダ語の「名前」を比べる</button>\n</div>\n\n<h3>綴りは取り残された</h3>\n\n<p>英語の綴りが固まったのも、ちょうど同じ数世紀のあいだだった。ウィリアム・キャクストンが1476年にウェストミンスターでイングランド初の印刷所を開き、印刷業者たちは中英語の発音にさかのぼる綴りを使い続けた。<em>bite</em> の <em>i</em> が /aɪ/、<em>name</em> の <em>a</em> が /eɪ/ を表すのはそのためだ。文字の名前も一緒に動いた。A は中英語では /aː/ と呼ばれていたのがいまは /eɪ/、E は /eː/ から /iː/ へ、I は /iː/ から /aɪ/ へ変わった。</p>\n\n<h3>英語だけではなく、全土でもない</h3>\n\n<p>高母音を二重母音化したのは英語だけではない。ドイツ語は英語より少し早く /iː/ と /uː/ を二重母音にした。中高ドイツ語の <em>bīzen</em>「噛む」と <em>hūs</em>「家」が、<em>beißen</em> と <em>Haus</em> になったのがそれだ。オランダ語も同じゲルマン語の長母音から <em>wijn</em>「ワイン」や <em>huis</em>「家」を生んでいる（<em>huis</em> は、いったん前舌化した /yː/ を経ている）。ただしドイツ語は綴りのほうを発音に合わせて改め、中母音や低母音を押し上げることもなかった。英語の /neɪm/ に対し、ドイツ語の <em>Name</em> はいまも /ˈnaːmə/、オランダ語の <em>naam</em> は /naːm/ である。</p>\n\n<p>北部にはこの推移が及ばなかった。北部中英語とスコットランド語では、推移が始まる前に /oː/ がすでに前舌化していた。/uː/ を後ろから押し上げる母音がなかったため、/uː/ はそのまま残った。マップではスコットランド語の <em>hoose</em> もジョーディーの <em>house</em> もともに /huːs/ だ。スコットランド語の <em>muin</em> /mɪn/「月」や <em>tuith</em> /tɪθ/「歯」は、その早い時期に前舌化した母音の続きである。</p>\n\n<p>これが一つの出来事だったのかどうかは議論が分かれている。「押し上げ連鎖」説では /eː/ と /oː/ が上がって高母音を押し出したとし、「引き込み連鎖」説では /iː/ と /uː/ が先に二重母音化して空いた場所に下の母音が入ったとする。ロバート・ストックウェルとドンカ・ミンコヴァは1988年の論集 <em>Luick Revisited</em> 所収の論文で、個々の変化は構造的に互いに独立しており、期間も長すぎて一本の連鎖とは見なせないと論じた。争いがないのは結果のほうだ。チョーサーのロンドンにあった七つの長母音は、<em>bite</em>、<em>house</em>、<em>meet</em>、<em>boot</em>、<em>sea</em>、<em>name</em>、<em>stone</em> の母音になった。</p>"
    },
    "sources": [
      {
        "text": "Jespersen, Otto (1909). A Modern English Grammar on Historical Principles, Part I: Sounds and Spellings. Heidelberg: Carl Winter.",
        "url": "https://en.wikipedia.org/wiki/A_Modern_English_Grammar_on_Historical_Principles"
      },
      {
        "text": "Stockwell, Robert P.; Minkova, Donka (1988). \"The English Vowel Shift: Problems of coherence and explanation.\" In D. Kastovsky, G. Bauer & J. Fisiak (eds.), Luick Revisited, 355-394. Tübingen: Gunter Narr."
      },
      {
        "text": "Smith, Jeremy J. (2007). Sound Change and the History of English. Oxford University Press.",
        "url": "https://academic.oup.com/book/4263"
      },
      {
        "text": "Wikipedia: Great Vowel Shift (vowel table, Lass's stages, northern English and Scots, push/drag chain, German parallels).",
        "url": "https://en.wikipedia.org/wiki/Great_Vowel_Shift"
      }
    ]
  },
  {
    "id": "turkish-alphabet-reform",
    "icon": "🔡",
    "tags": [
      "turkish",
      "alphabet-reform",
      "ottoman",
      "script",
      "language-planning"
    ],
    "title": {
      "en": "1928: Turkish changes alphabet in three months",
      "ja": "1928年、トルコ語は三か月で文字を替えた"
    },
    "summary": {
      "en": "On 1 November 1928 Turkey's parliament replaced the Arabic-based Ottoman script with a 29-letter Latin alphabet. Newspapers had to switch within a month, adult literacy schools opened in January 1929, and from 1932 the Turkish Language Association went after the Arabic and Persian vocabulary as well.",
      "ja": "1928年11月1日、トルコ大国民議会はアラビア文字によるオスマン文字を廃し、29文字のラテン・アルファベットを採用した。新聞は1か月で切り替えを命じられ、1929年1月には成人向けの「国民学校」が開校。1932年からはトルコ言語協会がアラビア語・ペルシア語の語彙そのものにも手をつけた。"
    },
    "body": {
      "en": "<p>On <strong>1 November 1928</strong> the Grand National Assembly of Turkey passed Law No. 1353, \"on the adoption and application of the Turkish letters\". It was published in the <em>Resmî Gazete</em> on 3 November and took effect that day. From then on, state offices, companies and associations had to use the new letters in their writing. Under Article 4, newspapers, signs and advertisements had to be printed in them from <strong>1 December 1928</strong>. Petitions in the old script were accepted until 1 June 1929. Earlier that year a Language Commission (<em>Dil Encümeni</em>) had proposed a transition of at least five years, and Mustafa Kemal (Atatürk) shortened it to a few months. On the night of 9 August 1928, at a party gala in Gülhane Park in Istanbul, he presented the alphabet in public himself.</p>\n\n<h3>What the Arabic script left out</h3>\n<p>Ottoman Turkish was written in Arabic letters with Persian additions. That script marks consonants fully, but its only vowel letters are <em>elif</em>, <em>vav</em> and <em>ye</em>. Turkish has eight vowels, and vowel harmony makes the difference between them grammatical. The single letter و (<em>vav</em>) stood for o, ö, u and ü, and ك (<em>kef</em>) could stand for k, g or the old nasal ñ. Ottoman spelled \"sun\" كونش, and the vowels of <em>güneş</em> had to be supplied by a reader who already knew the word. Arabic loans, by contrast, were written in their Arabic spelling: كتاب is <em>kitap</em> \"book\". So the script handled the borrowed layer of the vocabulary better than the native one.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ota,tr,az,gag\" data-word=\"sun\">⚖️ Compare \"sun\" in Ottoman, Turkish, Azerbaijani and Gagauz</button>\n</div>\n\n<h3>Twenty-nine letters</h3>\n<p>The new alphabet has 29 letters: 8 vowels and 21 consonants. Seven are modified Latin letters: <strong>ç ğ ı İ ö ş ü</strong>. The dotted and dotless i split one Latin letter into two vowels: <em>ı</em> /ɯ/ and <em>i</em>, each with its own capital (<em>I</em> and <em>İ</em>). <em>Ğ</em>, the \"soft g\", never occurs at the start of a word; in standard speech it usually lengthens the vowel before it. Q, W and X were left out. A circumflex on â, î and û marks long vowels in some Arabic and Persian loans and tells <em>kâr</em> \"profit\" apart from <em>kar</em> \"snow\".</p>\n\n<p>Turkey was not the first Turkic country to use Latin letters. Soviet Azerbaijan had adopted a Latin alphabet in the 1920s, and the 1926 Turkological Congress in Baku pushed Latinization across the Soviet Turkic languages. In the Ottoman Empire itself, reformers had been proposing script changes since Münif Pasha in 1862.</p>\n\n<h3>The Alphabet Mobilization</h3>\n<p>A regulation approved on 11 November 1928 and published on 24 November set up the <strong>Millet Mektepleri</strong> (\"Nation's Schools\"). These were evening and seasonal classes for adults, and they opened on 1 January 1929. The same regulation named Atatürk the schools' <em>Başöğretmen</em> (\"Head Teacher\"), and Turkey's Teachers' Day, 24 November, marks its publication. The figure that literacy jumped \"from 10 to 90 percent\" right after the reform squeezes several generations into one: by World Bank figures, adult literacy in Turkey first passed 90 percent in 2009.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ota\">🔍 Open Ottoman Turkish</button>\n</div>\n\n<h3>From letters to words</h3>\n<p>On 12 July 1932 Atatürk founded the <em>Türk Dili Tetkik Cemiyeti</em> (Society for the Study of the Turkish Language). It was renamed in 1934 and has been the <strong>Türk Dil Kurumu</strong> since 1936. The society collected words from dialects and Old Turkic texts and coined others from Turkic roots to replace Arabic and Persian vocabulary. Some of the coinages became standard: <em>okul</em> for <em>mektep</em> \"school\", <em>uçak</em> for <em>tayyare</em> \"aeroplane\", <em>sınav</em> for <em>imtihan</em> \"examination\", <em>yanıt</em> for <em>cevap</em> \"answer\". In 1935–36 the campaign slowed under the Sun Language Theory, which claimed that all languages descend from Turkish. On that view a loanword was a Turkish word coming home and did not need to be purged. In <em>The Turkish Language Reform: A Catastrophic Success</em> (Oxford, 1999), Geoffrey Lewis argued that the result cut readers off from Ottoman literature written only a few decades earlier.</p>\n\n<p>The purge was never complete. Everyday thanks in Turkey is still <em>teşekkürler</em>, from Arabic <em>teşekkür</em>, and the usual greeting is <em>merhaba</em>, also Arabic. The Ottoman form تشكر ایدرم and the modern <em>teşekkür ederim</em> are the same words, written in two different alphabets.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"thanks\" data-code=\"tr\">💬 See \"thanks\" across languages</button>\n</div>",
      "ja": "<p><strong>1928年11月1日</strong>、トルコ大国民議会は第1353号法「トルコ文字の採用と施行に関する法律」を可決した。法律は11月3日に官報（<em>Resmî Gazete</em>）に掲載され、その日に施行された。官庁も会社も団体も、この日から文書を新しい文字で書かなければならなくなった。第4条により、新聞・看板・広告は<strong>1928年12月1日</strong>から新文字で印刷することが義務づけられた。旧文字による請願書の受付は1929年6月1日までとされた。同じ年の早い時期に、言語委員会（<em>Dil Encümeni</em>）は少なくとも5年の移行期間を提案していたが、ムスタファ・ケマル（アタテュルク）はこれを数か月に縮めた。1928年8月9日の夜には、イスタンブルのギュルハネ公園で開かれた党の祝宴で、新しいアルファベットを自ら人々の前で披露している。</p>\n\n<h3>アラビア文字に書けなかったもの</h3>\n<p>オスマン・トルコ語は、ペルシア語式の文字を加えたアラビア文字で書かれていた。この文字は子音を細かく書き分けるが、母音を表す文字は<em>エリフ</em>・<em>ヴァヴ</em>・<em>イェ</em>の三つしかない。ところがトルコ語には母音が8つあり、母音調和があるため母音の違いが文法そのものに関わる。و（ヴァヴ）一字が o・ö・u・ü の四つを兼ね、ك（ケフ）は k にも g にも古い鼻音 ñ にも使われた。「太陽」はオスマン文字で كونش と書かれ、<em>güneş</em> の母音は、その単語を知っている読み手が補うしかなかった。一方、アラビア語からの借用語はアラビア語の綴りのまま書かれる。كتاب が <em>kitap</em>「本」である。この文字は、借りてきた語彙のほうを固有の語彙よりうまく書き表せたのである。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"ota,tr,az,gag\" data-word=\"sun\">⚖️ 「太陽」をオスマン語・トルコ語・アゼルバイジャン語・ガガウズ語で比べる</button>\n</div>\n\n<h3>29の文字</h3>\n<p>新しいアルファベットは29文字で、母音字が8つ、子音字が21ある。そのうち7文字はラテン文字に手を加えたもので、<strong>ç ğ ı İ ö ş ü</strong> がそれにあたる。点のある i と点のない ı は、ラテン文字一字を二つの母音に分けたものだ。<em>ı</em> は /ɯ/ を表し、大文字も <em>I</em> と <em>İ</em> で別々になる。「柔らかい g」と呼ばれる <em>ğ</em> は語頭には決して現れず、標準的な発音ではたいてい直前の母音を長くする。Q・W・X は採用されなかった。â・î・û の曲折アクセントは一部のアラビア語・ペルシア語借用語で長母音を示し、<em>kâr</em>「利益」と <em>kar</em>「雪」を書き分ける。</p>\n\n<p>テュルク系の言語でラテン文字を採ったのは、トルコが最初ではない。ソ連のアゼルバイジャンは1920年代にラテン文字を採用しており、1926年にバクーで開かれたテュルク学大会は、ソ連のテュルク系諸語全体にラテン文字化を広げる後押しをした。オスマン帝国の内部でも、1862年のミュニーフ・パシャ以来、文字改革の提案は繰り返し出されていた。</p>\n\n<h3>「文字動員」</h3>\n<p>1928年11月11日に承認され、11月24日に公布された規則によって<strong>国民学校（Millet Mektepleri）</strong>が設けられた。成人向けの夜間・季節講座で、1929年1月1日に開校した。同じ規則でアタテュルクはこの学校の「校長先生（<em>Başöğretmen</em>）」とされ、トルコの「教師の日」である11月24日は、この規則の公布日にちなむ。「改革直後に識字率が10%から90%に跳ね上がった」という話は、何世代分もの変化を一度に押し込んだものだ。世界銀行の統計では、トルコの成人識字率が初めて90%を超えたのは2009年である。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"ota\">🔍 オスマン・トルコ語を開く</button>\n</div>\n\n<h3>文字の次は語彙</h3>\n<p>1932年7月12日、アタテュルクは「トルコ語研究協会（<em>Türk Dili Tetkik Cemiyeti</em>）」を設立した。協会は1934年に改称され、1936年からは<strong>トルコ言語協会（Türk Dil Kurumu）</strong>を名乗っている。協会は方言や古テュルク語の文献から語を集め、テュルク語の語根から新しい語も作って、アラビア語・ペルシア語の語彙を置き換えようとした。そうした造語のいくつかは標準語になった。「学校」は <em>mektep</em> から <em>okul</em> へ、「飛行機」は <em>tayyare</em> から <em>uçak</em> へ、「試験」は <em>imtihan</em> から <em>sınav</em> へ、「答え」は <em>cevap</em> から <em>yanıt</em> へと替わった。1935〜36年には、あらゆる言語はトルコ語から生まれたとする「太陽言語理論」が唱えられ、運動は勢いを失う。この理論に従えば、借用語はトルコ語に里帰りした語にすぎず、排除する理由がなくなるからだ。ジェフリー・ルイスは『トルコ語改革――破滅的な成功』（オックスフォード大学出版局、1999年）で、この改革の結果、読者はわずか数十年前に書かれたオスマン文学を読めなくなったと論じている。</p>\n\n<p>それでも、追い出しきれなかった語は多い。トルコで日常的に使うお礼の言葉は今も <em>teşekkürler</em> で、これはアラビア語の <em>teşekkür</em> から来ている。いちばん普通のあいさつ <em>merhaba</em> もアラビア語由来だ。オスマン文字の تشكر ایدرم と現代の <em>teşekkür ederim</em> は、同じ言葉を二つのアルファベットで書いたものにすぎない。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"setword\" data-word=\"thanks\" data-code=\"tr\">💬 各言語の「ありがとう」を見る</button>\n</div>"
    },
    "sources": [
      {
        "text": "Jacques Leclerc, Université Laval (CEFAN), 'Turquie: Loi sur l'adoption et l'application de l'alphabet turc (1928)' — French translation of Law No. 1353 (adopted 1 Nov 1928, Resmî Gazete 3 Nov 1928)",
        "url": "https://axl.cefan.ulaval.ca/asie/turquie-loi-1928.htm"
      },
      {
        "text": "TDV İslâm Ansiklopedisi, 'Türk Dil Kurumu' (founding as Türk Dili Tetkik Cemiyeti, 12 July 1932; renamings 1934 and 1936; Sun Language Theory 1935-36)",
        "url": "https://islamansiklopedisi.org.tr/turk-dil-kurumu"
      },
      {
        "text": "World Bank, World Development Indicators: Literacy rate, adult total (% of people ages 15 and above) - Türkiye (SE.ADT.LITR.ZS)",
        "url": "https://data.worldbank.org/indicator/SE.ADT.LITR.ZS?locations=TR"
      },
      {
        "text": "Geoffrey Lewis, The Turkish Language Reform: A Catastrophic Success, Oxford University Press, 1999 (WorldCat record)",
        "url": "https://search.worldcat.org/title/The-Turkish-language-reform-:-a-catastrophic-success/oclc/41137543"
      }
    ]
  },
  {
    "id": "nko-script",
    "icon": "✒️",
    "tags": [
      "writing systems",
      "script invention",
      "manding",
      "west africa",
      "tone"
    ],
    "title": {
      "en": "N'Ko: an alphabet built for tone",
      "ja": "ンコ文字：声調を書くためにつくられたアルファベット"
    },
    "summary": {
      "en": "In 1949 Solomana Kanté, a Guinean merchant schooled in Arabic, finished an alphabet for the Manding languages. It runs right to left and marks every vowel's tone, and it spread through teaching from one learner to the next, not through schools.",
      "ja": "1949年、アラビア語の教育を受けたギニアの商人ソロマナ・カンテが、マンデ系マンディング諸語のためのアルファベットを完成させた。右から左に書き、母音ごとに声調を記す。この文字は学校ではなく、学んだ人が次の人に教える形で広まった。"
    },
    "body": {
      "en": "<p><strong>N'Ko</strong> is an alphabet for the Manding languages of West Africa: Maninka in Guinea, Bambara in Mali, Jula in Côte d'Ivoire and Burkina Faso, and Mandinka in the Gambia and Senegal. It is written <strong>right to left</strong>, and its letters join in a cursive line, as in Arabic. The name is a phrase found in all of these languages: <em>n ko</em>, \"I say\". The script's traditional birthday is <strong>14 April 1949</strong>, now kept as N'Ko Alphabet Day. Tradition places the invention in Bingerville, near Abidjan, which had been the capital of the French colony of Côte d'Ivoire until 1934.</p>\n\n<h3>Two borrowed scripts, then a new one</h3>\n\n<p>Its inventor, <strong>Solomana Kanté</strong> (also written Souleymane Kanté, 1922–1987), was born in Soumankoyin, about 13 kilometres from Kankan in Upper Guinea. His father, Amara Kanté, ran a Qur'anic school. After his father died in 1941, Kanté moved to Côte d'Ivoire, where he traded and taught himself. The historian Dianne White Oyler, who interviewed N'Ko users and others in Guinea and Côte d'Ivoire in 1993–94, gives the story as the movement tells it. In 1944 Kanté read a claim by the Lebanese journalist Kamal Marwa (also spelled Kamel Mrowa), printed in the Arabic-language publication <em>Nahnu fi Afrikiya</em> (\"We are in Africa\"), that African languages were like birdsong and could not be written down. Kanté took this as a challenge. From 1945 to 1949 he tried writing Maninka first in Arabic script and then in the Latin alphabet. Neither could show the tones, so he designed new letters. Oyler's 2001 article gives only the year, 1949. The exact day, 14 April, is the date the N'Ko movement celebrates.</p>\n\n<h3>What the letters encode</h3>\n\n<p>The 2004 proposal to add N'Ko to Unicode, by Michael Everson with the N'Ko teachers Mamady Doumbouya, Baba Mamadi Diané and Karamo Kaba Jammeh, describes the core system as <strong>7 vowels and 19 consonants</strong>. Any vowel can carry one of <strong>seven diacritics</strong>. Together with the unmarked vowel, these give four tones (high, low, rising, falling), each in a short and a long form. A separate mark below the vowel shows nasalization, and a syllabic <em>n</em> stands outside both classes. The proposal also describes a spelling convention meant to bridge dialects. Bambara says <em>tɔgɔ</em> for \"name\" and Maninka says <em>tɔɔ</em>, but both write the word the same way in N'Ko, and each reader pronounces it in their own dialect.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"emk,bm,dyu,mnk\" data-word=\"name\">⚖️ Compare \"name\" in four Manding languages</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"emk\">🔍 Eastern Maninka, around Kankan</button>\n</div>\n\n<h3>Contrast with Vai</h3>\n\n<p>The <strong>Vai syllabary</strong> of Liberia, made in the early 1830s for another Mande language, took a different route. Each of its characters stands for a whole syllable, and it writes no tone, so readers supply tone from context. Kanté went the other way: separate letters for consonants and vowels, with tone marked on every vowel. The two scripts were also encoded at different times. Vai entered Unicode 5.1 in 2008. N'Ko was added two years earlier, in <strong>Unicode 5.0 (July 2006)</strong>, at U+07C0–U+07FF, and three more characters followed in Unicode 11.0 in 2018.</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"vai\">🔍 Vai, the syllabary next door</button>\n</div>\n\n<h3>Spread without the state</h3>\n\n<p>N'Ko spread through markets, family compounds and private homes. In Oyler's account, Kanté asked each learner to teach at least seven others. A course lasted about four months, teachers were mostly unpaid, and students copied texts out by hand. Kanté himself wrote textbooks and a dictionary, and translated religious and secular texts. After independence in 1958, Guinea under Sékou Touré promoted its national languages in Latin-based spellings. That programme ran in schools from 1968 until 1984, when Lansana Conté's government dropped it and went back to French. N'Ko had never been part of it.</p>\n\n<p>A 1994 literacy survey of Kankan, covering more than 128,000 residents aged five and over, shows how this played out. It found that <strong>8.8 percent</strong> could read and write N'Ko. Only 3.1 percent were literate in the state's Latin-script national language, 8.5 percent could read Arabic and 14.1 percent could read French. Kanté died in Conakry on 23 November 1987. In the mid-2000s N'Ko was used mainly in Guinea and Côte d'Ivoire, with an active readership among Bambara speakers in Mali.</p>",
      "ja": "<p><strong>ンコ文字</strong>（N'Ko）は、西アフリカのマンディング諸語を書くためのアルファベットである。対象となるのは、ギニアのマニンカ語、マリのバンバラ語、コートジボワールとブルキナファソのジュラ語、ガンビアとセネガルのマンディンカ語などだ。<strong>右から左へ</strong>書き、アラビア文字と同じように字と字をつなげて続け書きする。「ンコ」は、これらの言語のどれにも共通する言い回し <em>n ko</em>「わたしは言う」から取られた。伝統的な誕生日は<strong>1949年4月14日</strong>で、現在は「ンコ文字の日」として祝われている。伝承では、考案の地はアビジャン近郊のバンジェルヴィルとされる。バンジェルヴィルは1934年までフランス領コートジボワール植民地の首都だった町である。</p>\n\n<h3>借りた二つの文字、そして新しい文字</h3>\n\n<p>考案者の<strong>ソロマナ・カンテ</strong>（スレイマン・カンテとも。1922–1987）は、上ギニアのカンカンから約13キロのスマンコイン村に生まれた。父アマラ・カンテはクルアーン学校の教師だった。1941年に父が亡くなると、カンテはコートジボワールに移り、商売をしながら独学を続けた。1993年から94年にかけてギニアとコートジボワールで、ンコ文字の使い手とそれ以外の人々から聞き取りをした歴史家ダイアン・ホワイト・オイラーは、運動の内部で語られてきた経緯を記録している。それによると、1944年、カンテはレバノン人ジャーナリストのカマール・マルワ（Kamel Mrowa とも綴る）がアラビア語の刊行物『ナハヌ・フィー・アフリーキヤ』（「われらはアフリカにあり」）に書いた主張を読んだ。アフリカの言語は鳥のさえずりのようなもので、文字には写せないという内容である。カンテはこれを挑戦と受け止めた。1945年から1949年にかけて、マニンカ語をまずアラビア文字で、次にラテン文字で書こうと試みたが、どちらでも声調を表せなかった。そこで新しい文字をつくることにした。なおオイラーの2001年の論文が記すのは1949年という年だけで、4月14日という日付は、ンコ文字の運動が祝っている日である。</p>\n\n<h3>文字が書き分けるもの</h3>\n\n<p>2004年にンコ文字をUnicodeに収録するよう求めた提案書がある。マイケル・エヴァーソンが、ンコ文字教師のママディ・ドゥンブヤ、ババ・ママディ・ディアネ、カラモ・カバ・ジャメと共同で出したものだ。それによると、基本の体系は<strong>母音7字と子音19字</strong>から成る。どの母音にも<strong>7種類の補助記号</strong>のうち一つを付けられる。記号のない形と合わせると、高・低・上昇・下降の4つの声調を、それぞれ短母音と長母音で書き分けることになる。母音の下には鼻音化を示す別の記号を付け、音節をなす <em>n</em> は母音とも子音とも別の字として扱う。提案書は、方言の違いを越えるための綴りの慣習も紹介している。「名前」はバンバラ語で <em>tɔgɔ</em>、マニンカ語で <em>tɔɔ</em> と言うが、ンコ文字ではどちらも同じ綴りで書き、読み手はそれぞれ自分の方言で発音する。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"compare\" data-codes=\"emk,bm,dyu,mnk\" data-word=\"name\">⚖️ マンディング系4言語の「名前」を比べる</button>\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"emk\">🔍 カンカン周辺の東マニンカ語を見る</button>\n</div>\n\n<h3>ヴァイ文字との違い</h3>\n\n<p>リベリアの<strong>ヴァイ文字</strong>も、1830年代初めに別のマンデ系言語のために生まれた文字だが、設計の方向が違う。一字一字が一つの音節全体を表す音節文字で、声調は書かず、読み手が文脈から補う。カンテはその逆を選んだ。子音と母音に別々の字を当て、すべての母音に声調を記す方式である。Unicodeへの収録時期も異なる。ヴァイ文字が入ったのは2008年のUnicode 5.1だが、ンコ文字はその2年前、<strong>2006年7月のUnicode 5.0</strong>でU+07C0–U+07FFに収録された。2018年のUnicode 11.0では3文字が追加されている。</p>\n\n<div class=\"trivia-actions\">\n  <button type=\"button\" class=\"trivia-action\" data-action=\"focus\" data-code=\"vai\">🔍 隣のヴァイ語と音節文字を見る</button>\n</div>\n\n<h3>国家に頼らずに広まった文字</h3>\n\n<p>ンコ文字は、市場や家族の住む屋敷、個人の家で教えられて広まった。オイラーの記録では、カンテは学んだ者一人ひとりに、少なくとも7人に教えるよう求めたという。講習は4か月ほどで、教師の多くは無報酬、生徒は教材を手で書き写した。カンテ自身も教科書や辞書を書き、宗教書や一般書を翻訳した。一方、1958年に独立したギニアでは、セク・トゥーレ政権が国語をラテン文字の正書法で普及させる政策をとった。この国語教育は1968年から1984年まで学校で続いたが、ランサナ・コンテ政権がこれを打ち切り、フランス語に戻した。ンコ文字はこの国の計画には一度も組み込まれていない。</p>\n\n<p>その結果は数字に表れている。1994年、カンカン市の5歳以上の住民12万8千人あまりを対象に識字調査が行われた。ンコ文字の読み書きができた人は<strong>8.8%</strong>で、国がラテン文字で教えた国語で読み書きできた人は3.1%にとどまった。アラビア文字を読める人は8.5%、フランス語を読み書きできる人は14.1%だった。カンテは1987年11月23日にコナクリで亡くなった。2000年代半ばの時点で、ンコ文字は主にギニアとコートジボワールで使われ、マリのバンバラ語話者の間にも活発な読者層があった。</p>"
    },
    "sources": [
      {
        "text": "Michael Everson, Mamady Doumbouya, Baba Mamadi Diané & Karamo Kaba Jammeh (2004), Proposal to add the N'Ko script to the BMP of the UCS, ISO/IEC JTC1/SC2/WG2 N2765 (L2/04-172)",
        "url": "https://www.unicode.org/L2/L2004/04172-n2765-nko.pdf"
      },
      {
        "text": "Dianne White Oyler (2001), A Cultural Revolution in Africa: Literacy in the Republic of Guinea since Independence, International Journal of African Historical Studies 34(3) (web copy)",
        "url": "https://fakoli.net/kanjamadi/n'koliteracy&guinea.html"
      },
      {
        "text": "Coleman Donaldson (2019), Solomana Kanté, the inventor of the N'ko alphabet: a map of his life, An ka taa blog",
        "url": "https://www.ankataa.com/blog/2019/6/3/solomana-kante-nko-map"
      },
      {
        "text": "Unicode Consortium, The Unicode Standard, Chapter 19 (Africa): Vai and N'Ko",
        "url": "https://www.unicode.org/versions/Unicode18.0.0/core-spec/chapter-19/"
      }
    ]
  },
];

// Expose to global so wordmap.html can read it whether this file
// is loaded as a classic <script> or future-bundled.
if (typeof window !== 'undefined') {
  window.TRIVIA_ARTICLES = TRIVIA_ARTICLES;
}
