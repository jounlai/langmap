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
      en: 'A tiny Amazonian isolate that allegedly lacks number words, basic colour terms, and grammatical recursion — and shook a 60-year-old theory of language.',
      ja: 'アマゾン奥地の孤立言語。数詞も基本色名も再帰文法もないとされ、半世紀続いた言語理論を揺さぶった。',
    },
    body: {
      en: `
<p>Deep in the Brazilian Amazon, fewer than 800 people speak <strong>Pirahã</strong> (pronounced roughly <em>pee-da-HAN</em>). It is a language isolate — no proven relatives anywhere on Earth — and has become one of the most fiercely debated cases in modern linguistics.</p>

<div class="trivia-actions">
  <button type="button" class="trivia-action" data-action="focus" data-code="myp" data-zoom="6">📍 Show Pirahã on the map</button>
  <button type="button" class="trivia-action" data-action="panto" data-lat="-5" data-lng="-62" data-zoom="4" data-codes="myp">🌳 Fly to the Amazon basin</button>
</div>

<p>The fieldworker who triggered the storm is <strong>Daniel Everett</strong>, a missionary-turned-linguist who lived with the Pirahã for years. According to his reports, the language is missing several things that 20th-century linguists had argued were universal in human language:</p>

<ul>
  <li><strong>No exact number words.</strong> The community uses only <em>hói</em> ("a small amount") and <em>hoí</em> ("a larger amount") — a contrast of quantity, not of count. In experiments, Pirahã speakers cannot reliably match piles of 4 vs 5 objects, even when motivated to.</li>
  <li><strong>No basic colour vocabulary.</strong> Colours are described compositionally — "like blood", "unripe", "dirty" — rather than with fixed labels like "red" or "green".</li>
  <li><strong>No grammatical recursion.</strong> Sentences cannot be embedded inside other sentences. This directly challenges <strong>Noam Chomsky's</strong> claim that recursion is <em>the</em> defining feature that separates human language from animal communication. If Everett is right, Pirahã breaks the theory.</li>
  <li><strong>No creation myths, no fiction, no stories about ancestors no living person knew.</strong> A strong cultural norm — Everett calls it the "immediacy of experience" principle — restricts speech to what the speaker or a living interlocutor has personally witnessed.</li>
</ul>

<div class="trivia-actions">
  <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="myp">🔢 See "one" across languages</button>
  <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="myp">👩 See Pirahã "Mother"</button>
</div>

<p>Stranger still, Pirahã is one of a small handful of languages that can be transmitted across <em>four parallel channels</em>: it can be <strong>spoken, whistled, hummed, or shouted</strong>. Because Pirahã has only three vowels and eight consonants, its prosody (pitch and rhythm) carries an unusually heavy informational load — enough that mothers can hum entire sentences to babies without articulating a single consonant.</p>

<blockquote>"Tones, stress, and syllable length are far more important than vowels and consonants in carrying the message in Pirahã." — Daniel Everett</blockquote>

<p>Everett's claims are <strong>hotly contested</strong>. Later researchers, including Andrew Nevins, David Pesetsky and Cilene Rodrigues, have argued that Pirahã does have recursion — just rarely used — and that the number facts can be explained without exotic cognitive consequences. Everett has fired back; the debate is still open.</p>

<p>Less controversial, though still discussed, are the cultural norm restricting speech to directly-experienced events and Pirahã's striking multi-channel transmission. Whichever side wins the recursion war, Pirahã has done what very few languages ever do: forced linguists to ask, once again, whether language shapes thought — or thought shapes language.</p>
      `,
      ja: `
<p>ブラジル・アマゾンの奥地に、話者わずか700〜800人の<strong>ピダハン語（Pirahã）</strong>がある。世界のどの言語とも親縁関係が証明されていない孤立言語で、現代言語学でもっとも激しい論争を呼んでいる言語のひとつだ。</p>

<div class="trivia-actions">
  <button type="button" class="trivia-action" data-action="focus" data-code="myp" data-zoom="6">📍 地図でピダハン語を見る</button>
  <button type="button" class="trivia-action" data-action="panto" data-lat="-5" data-lng="-62" data-zoom="4" data-codes="myp">🌳 アマゾン流域へ飛ぶ</button>
</div>

<p>論争に火をつけたのは、伝道師から言語学者に転じ、長年ピダハン社会に住み込んだ<strong>ダニエル・エヴェレット</strong>である。彼の報告によれば、ピダハン語には、20世紀の言語学が「人類言語の普遍要素」と考えてきたものがいくつも欠けているという。</p>

<ul>
  <li><strong>正確な数詞がない。</strong> 使われるのは <em>hói</em>（少し）と <em>hoí</em>（多め）の二語だけで、これは数ではなく<strong>量の対比</strong>にすぎない。実験では、ピダハン語話者は動機づけがあっても 4 個と 5 個の山を正確に対応づけられない。</li>
  <li><strong>基本色名がない。</strong> 色は「血のような」「熟れていない」「汚れた」などと比喩的に説明されるだけで、「赤」「緑」のような固定ラベルは存在しない。</li>
  <li><strong>再帰がない。</strong> 文を文の中に埋め込む構造を持たない。これは<strong>ノーム・チョムスキー</strong>の主張──「再帰こそが人間言語を動物の伝達と隔てる唯一にして本質的特徴である」──を真っ向から揺さぶる発見だった。エヴェレットが正しければ、チョムスキー理論はピダハン語ひとつで崩れることになる。</li>
  <li><strong>創世神話も、虚構も、誰も会ったことのない祖先の物語もない。</strong> エヴェレットが「経験の直接性」原理と呼ぶ強い文化規範があり、話し手か、あるいは生きている誰かが実際に見た出来事しか語ってはならない、とされる。</li>
</ul>

<div class="trivia-actions">
  <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="myp">🔢 ピダハン語の「一」</button>
  <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="myp">👩 ピダハン語の「母」</button>
</div>

<p>さらに不思議なのは、ピダハン語が世界的にも珍しい<em>四つの並列チャネル</em>で伝達できる言語であることだ。<strong>普通に話す・口笛で吹く・ハミングする・叫ぶ</strong>──そのいずれでも完全な文を伝えられる。母音が3つ、子音がわずか8つしかないため、声調・強勢・音節長といった韻律情報が極端に重い役割を担い、母親は子音を一つも発音せずにメロディだけで赤ん坊にピダハン語を語りかけることができる。</p>

<blockquote>「ピダハン語では、声調・強勢・音節の長さこそが、母音や子音よりはるかに重要に意味を運んでいる」── ダニエル・エヴェレット</blockquote>

<p>エヴェレットの主張は<strong>学界で激しく争われている</strong>。アンドリュー・ネヴィンス、デイヴィッド・ペセツキー、シレーネ・ロドリゲスらは「ピダハン語にも再帰はある、ただ頻度が低いだけだ」「数詞の事実は奇抜な認知含意なしに説明できる」と反論し、エヴェレットも応戦している。論争はまだ決着していない。</p>

<p>論争の少ない、しかしなお議論の余地のある事柄として──「経験していないことは語らない」という文化規範と、口笛・ハミング・叫びによる多チャネル伝達がある。再帰論争の勝者がどちらになるにせよ、ピダハン語は「言語が思考を形作るのか、それとも思考が言語を形作るのか」──サピア＝ウォーフ以来60年来の問いを、もう一度言語学の中心に押し戻した、稀有な言語なのだ。</p>
      `,
    },
    sources: [
      'Everett, Daniel L. (2005). "Cultural Constraints on Grammar and Cognition in Pirahã: Another Look at the Design Features of Human Language." Current Anthropology 46(4): 621–646.',
      'Everett, Daniel L. (2008). Don\'t Sleep, There Are Snakes: Life and Language in the Amazonian Jungle. Pantheon Books.',
      'Nevins, Andrew; Pesetsky, David; Rodrigues, Cilene (2009). "Pirahã Exceptionality: A Reassessment." Language 85(2): 355–404.',
      'Frank, Michael C.; Everett, Daniel L.; Fedorenko, Evelina; Gibson, Edward (2008). "Number as a cognitive technology: Evidence from Pirahã language and cognition." Cognition 108(3): 819–824.',
      { text: 'Glottolog: Pirahã (pira1253)', url: 'https://glottolog.org/resource/languoid/id/pira1253' },
      { text: 'WALS Online: Pirahã', url: 'https://wals.info/languoid/lect/wals_code_pir' },
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
        en: 'On a tiny volcanic island in the Atlantic, shepherds re-encoded Spanish into pure whistle and could converse across ravines two kilometres wide. UNESCO listed it in 2009; today it is taught in every primary school on La Gomera.',
        ja: '大西洋に浮かぶ小さな火山島で、羊飼いたちはスペイン語をまるごと口笛に置き換え、2キロ以上離れた谷越しに会話していた。2009年にユネスコ無形文化遺産となり、現在は島の全小学校で必修科目になっている。',
      },
      body: {
        en: `
  <p>The island of <strong>La Gomera</strong> in the Canary Islands is carved by deep, near-vertical barrancos — ravines so steep that a neighbour visible across the gully might be an hour's walk away. Long before mobile phones, Gomerans solved this with one of the world's most elaborate <strong>whistled languages</strong>: <em>Silbo Gomero</em>, "the Gomeran whistle".</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="28.10" data-lng="-17.20" data-zoom="7">🗺️ Fly to La Gomera</button>
  </div>
  
  <p>Silbo is not a code or a set of signals. It is a fully <strong>articulated register of Spanish</strong>: every Spanish word can in principle be whistled, and a fluent silbador can carry on an open-ended conversation about the weather, livestock prices or last night's football match. The trick is that the whistle reduces the full vowel and consonant inventory of Spanish to a much smaller set of <em>pitched gestures</em>:</p>
  
  <ul>
    <li><strong>Two "vowels"</strong> distinguished by pitch — a higher tone covering Spanish <em>/i, e/</em> and a lower tone covering <em>/a, o, u/</em>.</li>
    <li><strong>Four "consonants"</strong> distinguished by whether the whistle is interrupted or continuous, and whether the pitch rises or falls into the following vowel.</li>
    <li>Rhythm, stress and intonation are preserved more faithfully than segmental information — listeners reconstruct missing detail from context, exactly the way phone calls survive low-bandwidth lines.</li>
  </ul>
  
  <p>The technique pre-dates Spanish itself. The original inhabitants of the Canaries, the <strong>Guanches</strong>, already used a whistled register of their own (Berber-related) language; when Castilian Spanish displaced Guanche after the 15th-century conquest, the whistle was simply re-fitted to the new vocabulary. Anthropologist <strong>Ramón Trujillo</strong> documented this continuity in his 1978 monograph <em>El silbo gomero: análisis lingüístico</em>, which remains the canonical reference.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="es,kab,shi">🗣 Compare Spanish, Berber and Kabyle</button>
  </div>
  
  <p>By the 1980s Silbo was nearly extinct: emigration, paved roads and telephones had hollowed out the shepherding economy that sustained it. The Cabildo Insular de La Gomera responded with a radical move — in 1999 they made <strong>Silbo Gomero a compulsory subject in every public primary school on the island</strong>. Children now spend roughly 25 minutes a week learning to whistle, and tens of thousands of pupils have passed through the programme.</p>
  
  <blockquote>"It is the only whistled language fully developed and practised by a sizeable community… an exceptional example of the cultural creativity of humanity." — UNESCO inscription text, 2009</blockquote>
  
  <p>Neuroscientists have taken notice. A 2005 fMRI study by <strong>Manuel Carreiras</strong> and colleagues at the University of La Laguna showed that experienced silbadores process Silbo using <em>the same left-hemisphere language areas</em> normally reserved for spoken speech — not the right-hemisphere music-and-melody networks that activate when non-silbadores hear the same whistles. In other words, the brain treats Silbo as a language, not as music or birdsong. That single result moved Silbo from "folk curiosity" to a genuine probe of how flexible the human language faculty really is.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="28.10" data-lng="-17.20" data-zoom="9" data-tiles="terrain">🌋 Zoom into the barrancos</button>
  </div>
  
  <p>Silbo is not the only surviving whistled register — Kuşköy in Turkey, Hmong courtship whistles, the Mazatec whistled Spanish of Oaxaca and the Akha whistled tones of Yunnan all coexist with their spoken parents — but it is the most institutionalised, the best documented, and the only one that has been formally protected as Intangible Cultural Heritage. The next time you stand on a ridge in La Gomera and hear what sounds like a very chatty bird, listen again: it might be someone telling their cousin what to pick up from the shop.</p>
        `,
        ja: `
  <p>カナリア諸島の<strong>ラ・ゴメラ島</strong>は、ほぼ垂直に切り立った深い渓谷（バランコ）に幾筋にも刻まれている。目の前に見える隣人の家まで歩けば1時間以上。携帯電話が普及するはるか以前、ゴメラの羊飼いたちはこの地形を世界でもっとも洗練された<strong>口笛言語</strong>──<em>シルボ・ゴメロ</em>で乗り越えてきた。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="28.10" data-lng="-17.20" data-zoom="7">🗺️ ラ・ゴメラ島へ飛ぶ</button>
  </div>
  
  <p>シルボはモールス信号のような暗号ではない。スペイン語そのものをまるごと口笛に置き換えた<strong>「音声レジスター」</strong>であり、熟達した話者（シルバドール）は天気・家畜の値段・昨夜のサッカーまで自由に会話できる。仕組みは、スペイン語の母音と子音を、はるかに少数の<em>ピッチ・ジェスチャー</em>に圧縮することにある。</p>
  
  <ul>
    <li><strong>母音は2つ。</strong> 高音が <em>/i, e/</em>、低音が <em>/a, o, u/</em> に対応する。</li>
    <li><strong>子音は4つ。</strong> 口笛が途切れるか連続するか、母音への移行で音程が上がるか下がるかで区別される。</li>
    <li>分節音より、強勢・リズム・抑揚のほうが正確に伝わる。聞き手は文脈で欠けた情報を補う──電話回線が貧弱でも会話が成立するのと同じ原理だ。</li>
  </ul>
  
  <p>口笛文化はスペイン語より古い。先住民<strong>グアンチェ族</strong>（ベルベル系）はすでに自分たちの言語の口笛版を持っていた。15世紀のカスティーリャによる征服でグアンチェ語自体は消滅したが、口笛の<em>方式</em>だけは生き残り、新たな言語であるスペイン語に被せ直された。言語学者<strong>ラモン・トルヒージョ</strong>の1978年の研究書がいまも基本文献となっている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="es,kab,shi">🗣 スペイン語・ベルベル語・カビル語を比べる</button>
  </div>
  
  <p>1980年代、シルボはほぼ絶滅寸前まで衰えた。離島からの人口流出と舗装道路、そして電話の普及が、口笛を必要としていた牧畜経済を崩したのだ。島政府は1999年、思いきった一手を打つ──<strong>島内すべての公立小学校でシルボ・ゴメロを必修科目化</strong>。子どもたちは週25分ほど口笛を学び、これまでに数万人がこの授業を通過した。</p>
  
  <blockquote>「相当規模の共同体によって完全に発達し、実践されている唯一の口笛言語であり、人類の文化的創造性を示す例外的な例である」── ユネスコ無形文化遺産登録文（2009年）</blockquote>
  
  <p>脳科学者も注目した。ラ・ラグナ大学の<strong>マヌエル・カレイラス</strong>らによる2005年のfMRI研究では、熟達したシルバドールは口笛を聞くとき<em>左半球の言語野</em>を活性化させていた──同じ口笛を非話者が聞いたときに反応する「右半球の音楽処理野」ではなく。脳はシルボを<strong>音楽でも鳥のさえずりでもなく、言語そのもの</strong>として処理しているのだ。この一本の論文によって、シルボは「民俗的な珍奇例」から「人間の言語能力の柔軟性を測る格好の実験対象」へと格上げされた。</p>

  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="28.10" data-lng="-17.20" data-zoom="9" data-tiles="terrain">🌋 バランコ（峡谷地形）にズーム</button>
  </div>

  <p>世界には他にも口笛言語が残っている──トルコのクシュキョイ、メキシコ・オアハカのマサテコ口笛、雲南のアカ族の口笛声調など。しかしシルボ・ゴメロほど制度化され、記録され、文化遺産として保護されている口笛は他にない。ラ・ゴメラの尾根道で、よくしゃべる鳥のような音が聞こえたら、もう一度耳を澄ましてほしい。それは誰かが従姉妹に「帰りにパンを買ってきて」と頼んでいる声かもしれない。</p>
        `,
      },
      sources: [
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
        en: 'Taa (!Xóõ) — the language with more consonants than any other',
        ja: 'タア語（!Xóõ）— 世界一子音が多い言語',
      },
      summary: {
        en: 'Spoken by perhaps 2,500 people on the Botswana–Namibia border, Taa packs around 160 distinct consonants, including five fully developed click types, into a single phonemic inventory — by some measures the largest sound system ever described.',
        ja: 'ボツワナとナミビアの国境地帯にわずか2500人ほどの話者しか残っていないタア語は、5系統の吸着音を含む約160の子音をひとつの音素体系に詰め込んでいる。記述されたなかで最大級の音体系である。',
      },
      body: {
        en: `
  <p>If you took every distinct consonant in English — all 24 of them — and stacked them on top of every distinct consonant in French, German, Russian, Arabic and Mandarin, you would still fall short of <strong>Taa</strong>, also written <em>!Xóõ</em>. By the count in Anthony Traill's monumental 1985 grammar, Taa has somewhere between <strong>83 and 164 phonemic consonants</strong> depending on how you slice contour clicks and click accompaniments — and either figure is a world record.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="nmn" data-zoom="5">🌍 Show Taa on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-22" data-lng="20" data-zoom="5">🗺️ Fly to the Taa heartland</button>
  </div>
  
  <p>Taa is a <strong>Tuu language</strong> (formerly grouped with the now-discredited "Southern Khoisan" family) spoken in scattered villages of the southwestern Kalahari, mostly in Botswana with a smaller community in Namibia. Estimates put the speaker community at around <strong>2,500 people</strong>, all of whom are bilingual in Tswana, Afrikaans or Khoekhoegowab — so although the language is not yet moribund, every generational hand-off is a coin flip.</p>
  
  <p>The phonological extravagance has three layers:</p>
  
  <ul>
    <li><strong>Five primary click types.</strong> Dental <em>|</em>, lateral <em>||</em>, alveolar <em>!</em>, palatal <em>ǂ</em> and bilabial <em>ʘ</em>. Bilabial clicks — made with a kiss-like pop — survive in only a handful of languages worldwide; Taa is one of them.</li>
    <li><strong>Roughly 17 click accompaniments.</strong> Each click can be voiced, voiceless, aspirated, glottalised, nasalised, prenasalised, breathy-voiced or combined with uvular and ejective releases. Multiply 5 × 17 and the click inventory alone outnumbers the entire consonant system of Hawaiian several times over.</li>
    <li><strong>A separate non-click consonant series</strong> almost as large as a normal language's whole inventory, with rare contrasts like uvular ejective affricates <em>q'χ</em>.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="nmn,naq,xh,zu">🗣 Compare click languages (Taa, Khoekhoe, Xhosa, Zulu)</button>
  </div>
  
  <p>The South African linguist <strong>Anthony Traill</strong> spent more than thirty years documenting Taa, beginning with PhD fieldwork in the 1970s and culminating in his 1994 dictionary, <em>A !Xóõ Dictionary</em>. Traill's instrumental work — using fibre-optic laryngoscopy and ultrasound — showed that what early visitors had dismissed as "accidental noises" were in fact <strong>fully voluntary articulations</strong> with distinct closures at the velum, the uvula and the epiglottis. He demonstrated that a single click word can involve <em>four simultaneous airstream mechanisms</em>: an ingressive lingual airstream for the click itself, an egressive pulmonic airstream for voicing, a closed glottis for ejective release, and a lowered velum for nasalisation.</p>
  
  <blockquote>"It is no longer respectable to write off clicks as paralinguistic noise. They are the consonants of the language." — Anthony Traill, 1985</blockquote>
  
  <p>Linguists disagree about <em>why</em> Taa got so loud. One hypothesis, advanced by <strong>Bonny Sands</strong> and others, is that the Kalahari Tuu area has been a refuge zone since at least the late Pleistocene; the phonological extravagance may be an extremely old accumulation, possibly mirroring the soundscape of much earlier hunter-gatherer languages now lost. Whether or not that is true, Taa offers a sobering counter to the idea that human languages "tend toward economy": when geography and demography allow it, phonology can spiral upward almost indefinitely.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-23.5" data-lng="21.5" data-zoom="6">🌵 Zoom into the Kalahari</button>
  </div>
  
  <p>Taa is generally described as <strong>severely endangered</strong>. The few hundred children who still acquire it grow up alongside Tswana-medium schooling and increasingly mobile lifestyles. If Taa goes silent in the next generation, the world loses not only a community's heritage but the single richest natural laboratory the science of phonetics has ever had.</p>
        `,
        ja: `
  <p>英語の子音は24個。それにフランス語、ドイツ語、ロシア語、アラビア語、北京官話の子音を全部足しても、まだ<strong>タア語</strong>（原綴り <em>!Xóõ</em>）には届かない。アンソニー・トレイルの記念碑的記述（1985年）によれば、タア語の音素子音は<strong>83〜164個</strong>──吸着音の付随特徴をどう数えるかで揺れる──いずれにせよ世界記録である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="nmn" data-zoom="5">🌍 地図でタア語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-22" data-lng="20" data-zoom="5">🗺️ タア語の故地へ飛ぶ</button>
  </div>
  
  <p>タア語は<strong>トゥー語族</strong>に属する（かつての「南コイサン」分類は現在は否定されている）。南西カラハリの村々で話され、大半はボツワナ、少数がナミビアに住む。話者数は約<strong>2500人</strong>。全員がツワナ語・アフリカーンス語・コエコエ語のいずれかとのバイリンガルで、世代交代のたびに継承は綱渡りになる。</p>
  
  <p>音体系の異常な豊富さには三層ある。</p>
  
  <ul>
    <li><strong>5系統の吸着音。</strong> 歯音 <em>|</em>、側面 <em>||</em>、歯茎 <em>!</em>、硬口蓋 <em>ǂ</em>、そして両唇 <em>ʘ</em>。両唇吸着音──キスのようなポップ音──は世界でも数言語にしか残っておらず、タア語はその一つである。</li>
    <li><strong>約17の付随特徴。</strong> 各吸着音は有声・無声・有気・声門化・鼻音化・前鼻音化・気息音化、さらに口蓋垂や放出音と組み合わせられる。5×17で、吸着音だけでハワイ語の全子音体系の数倍に達する。</li>
    <li><strong>吸着音とは別の通常子音系列</strong>もあり、口蓋垂放出破擦音 <em>q'χ</em> のような珍しい対立まで含まれる。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="nmn,naq,xh,zu">🗣 吸着音言語を比べる（タア・コエコエ・コサ・ズールー）</button>
  </div>
  
  <p>南アフリカの言語学者<strong>アンソニー・トレイル</strong>は1970年代から30年以上タア語を記録し、1994年には『!Xóõ辞典』を完成させた。彼はファイバー喉頭鏡と超音波を駆使し、初期の探検家が「偶然の雑音」と切り捨てた音が、実は軟口蓋・口蓋垂・喉頭蓋で<strong>意図的に閉鎖を作る完全な調音動作</strong>であることを示した。たった一語のタア語が、<em>同時に4つの気流機構</em>──舌の吸気・肺の呼気・声門閉鎖による放出・軟口蓋下降による鼻音化──を使って発音されることもある。</p>
  
  <blockquote>「吸着音を周辺音とみなすのはもう許されない。これは紛れもなく言語の子音である」── アンソニー・トレイル（1985年）</blockquote>
  
  <p>なぜタア語はここまで「音だくさん」になったのか。ボニー・サンズらは、カラハリのトゥー語圏が後期更新世以来の「言語避難所」であり、現存しない狩猟採集民言語の古い音体系の名残を保存している可能性を指摘する。真偽はともかく、「言語は経済性へ向かう」という通念に、タア語は強烈な反例を突きつけている。地理と人口さえ許せば、音体系は限りなく膨張しうるのだ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-23.5" data-lng="21.5" data-zoom="6">🌵 カラハリ砂漠を拡大</button>
  </div>
  
  <p>ユネスコはタア語を「重度の危機」と分類している。次世代でこの言語が沈黙すれば、共同体の遺産だけでなく、音声学が手にした「もっとも豊かな天然実験室」そのものが失われる。</p>
        `,
      },
      sources: [
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
        en: 'Rotokas — the language with (almost) the fewest sounds',
        ja: 'ロトカス語 — 世界一音が少ないとされる言語',
      },
      summary: {
        en: 'On the cocoa-growing island of Bougainville, the central dialect of Rotokas is famous for having only eleven phonemes — six consonants and five vowels — once cited as the smallest phoneme inventory in the world.',
        ja: 'カカオの島ブーゲンビルで話されるロトカス語の中央方言は、音素がわずか11個（子音6、母音5）。世界最小級の音体系として知られる。',
      },
      body: {
        en: `
  <p>If Taa is the maximalist's paradise, <strong>Rotokas</strong> is the minimalist's. Spoken by roughly 4,000 people in the mountainous interior of <strong>Bougainville</strong>, an island that politically belongs to Papua New Guinea but geographically to the Solomons chain, the central dialect of Rotokas has just <strong>eleven distinct phonemes</strong>: six consonants — <em>p, t, k, β, ɾ, ɡ</em> — and five vowels <em>a, e, i, o, u</em>, each of which can be short or long.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="roo" data-zoom="7">📍 Open Rotokas on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-6.30" data-lng="155.20" data-zoom="6">🗺️ Fly to Bougainville</button>
  </div>

  <p>Hawaiian — at thirteen phonemes — is sometimes cited as a competitor for the record, and the <strong>Pirahã</strong> male register may dip even lower; but the count that linguists usually reach for is Rotokas, based on the careful 1973 description by Australian missionary linguists <strong>Stuart and Janice Firchow</strong> for the Summer Institute of Linguistics. They identified three places of articulation, no nasal consonants at all, and no consonant clusters beyond a brief glide.</p>
  
  <ul>
    <li><strong>No nasals.</strong> The Rotokas language family is one of the very rare cases where <em>m, n, ng</em> are <strong>entirely absent as phonemes</strong>. When older speakers do produce nasal sounds, they tend to appear as free variants of <em>b, d, g</em> in expressive or whispered speech, not as separate units.</li>
    <li><strong>Tiny consonant inventory.</strong> <em>p</em> and <em>β</em> (a soft bilabial fricative similar to Spanish <em>b</em> between vowels), <em>t</em> and <em>ɾ</em> (a tap), <em>k</em> and <em>ɡ</em> — three voiceless and three voiced, paired symmetrically across the mouth.</li>
    <li><strong>Strictly CV syllables.</strong> Every syllable is a single consonant followed by a single vowel. Long vowels and vowel sequences carry whatever extra prosody the language needs.</li>
  </ul>
  
  <p>One immediate consequence is that Rotokas words tend to be <strong>longer</strong> than words in phonologically rich languages — a small vocabulary of sounds requires more combinations to keep words apart. Place names like <em>Rotokas</em>, <em>Pipipaia</em>, <em>Togarao</em> and <em>Keriaka</em> give the flavour: simple syllables, repeated patterns, almost songlike.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="roo,haw,mi">🗣 Compare Rotokas, Hawaiian and Māori</button>
  </div>
  
  <p>Rotokas belongs to the <strong>North Bougainville</strong> family, one of two tiny non-Austronesian (Papuan) families on the island. Genealogically it is unrelated to the surrounding Oceanic Austronesian languages of the coast, and to its southern Bougainville neighbours. That isolation may help explain its drift toward such a stripped-down phonology: small, tight-knit speech communities sometimes simplify rather than elaborate, the mirror image of the Kalahari pattern.</p>
  
  <blockquote>"Rotokas seems to refute the long-standing assumption that the lower limit on phoneme inventories is around fifteen." — Ian Maddieson, <em>Patterns of Sounds</em>, 1984</blockquote>
  
  <p>Bougainville has had a difficult late-20th-century history: civil war from 1988 to 1998, the closure of the Panguna mine, and ongoing negotiations toward independence from Papua New Guinea after the 2019 referendum. Rotokas weathered all of it. Today the language is taught in some Tok-Pisin-medium schools alongside English, and a small but active <strong>vernacular literacy programme</strong> has produced storybooks and Bible translations in the language. Speaker numbers are stable, though younger speakers are increasingly bilingual in Tok Pisin.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-6.20" data-lng="155.30" data-zoom="8" data-tiles="terrain">🌋 Zoom into the Crown Prince Range</button>
  </div>
  
  <p>The lesson of Rotokas is not that simpler languages are "easier" — every Rotokas child still acquires native fluency with the same effort any baby anywhere puts into language learning. It is, rather, that <strong>the human language faculty has remarkable headroom in both directions</strong>. From eleven sounds to one hundred and sixty-four, the underlying system is the same.</p>
        `,
        ja: `
  <p>タア語がマキシマリストの楽園なら、<strong>ロトカス語</strong>はミニマリストの聖地である。パプアニューギニア東端の<strong>ブーゲンビル島</strong>──地理的にはソロモン諸島の延長線上にある火山島──の山間部で約4000人に話される。その中央方言の音素はわずか<strong>11個</strong>。子音6（<em>p, t, k, β, ɾ, ɡ</em>）、母音5（<em>a, e, i, o, u</em>。それぞれ長短対立を持つ）。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="roo" data-zoom="7">📍 地図でロトカス語を開く</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-6.30" data-lng="155.20" data-zoom="6">🗺️ ブーゲンビル島へ飛ぶ</button>
  </div>

  <p>13音素のハワイ語が最小記録を競うことがあり、<strong>ピダハン語</strong>の男性レジスターはさらに低い可能性もあるが、引き合いに出されるのは多くの場合ロトカス語だ。SIL（夏期言語学研究所）所属のオーストラリア人言語学者夫妻<strong>スチュアート＆ジャニス・ファーチョウ</strong>が1973年に発表した記述が基準となっている。彼らは3つの調音位置・鼻音ゼロ・子音連続なしという、極端なミニマル体系を確認した。</p>
  
  <ul>
    <li><strong>鼻音がない。</strong> <em>m, n, ng</em> が音素として<strong>完全に欠如</strong>している、世界でも稀な例。年配の話者がささやき声などで鼻音を発することはあるが、それは <em>b, d, g</em> の自由変異であって独立音素ではない。</li>
    <li><strong>極小子音体系。</strong> <em>p</em> と <em>β</em>（母音間のスペイン語 b に似た弱い両唇摩擦音）、<em>t</em> と <em>ɾ</em>（はじき音）、<em>k</em> と <em>ɡ</em>。無声3、有声3が対称に並ぶ。</li>
    <li><strong>厳格なCV音節。</strong> すべての音節が「子音1＋母音1」。長母音と母音連続が韻律情報を担う。</li>
  </ul>
  
  <p>当然の帰結として、ロトカス語の単語は他言語より<strong>長くなる傾向</strong>がある。音の種類が少ない以上、組み合わせで区別をつけるほかない。地名 <em>Rotokas</em>、<em>Pipipaia</em>、<em>Togarao</em>、<em>Keriaka</em> など、単純な音節の反復が歌のようなリズムを生む。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="roo,haw,mi">🗣 ロトカス・ハワイ・マオリを比べる</button>
  </div>
  
  <p>ロトカス語は<strong>北ブーゲンビル語族</strong>に属する。島の周囲を取り囲むオーストロネシア語族の海岸諸語とも、南ブーゲンビル諸語とも血縁関係はない。この孤立性が、音体系の徹底的な簡素化を支えた可能性は十分にある──小さく密な共同体は、ときに音を増やすのではなく削ぐ方向に進化する。</p>
  
  <blockquote>「ロトカスは、音素体系の下限はおよそ15という長年の前提を覆すように見える」── イアン・マディソン『音のパターン』（1984年）</blockquote>
  
  <p>ブーゲンビルは1988〜1998年の内戦、パングナ鉱山の閉鎖、2019年独立住民投票後の交渉と、激動の20世紀末を経た。それでもロトカス語は途絶えなかった。現在はトクピシン語と英語を介して学校で教えられ、聖書翻訳や物語集を出す小規模ながら活発な<strong>母語識字運動</strong>がある。話者数は安定だが、若い世代はトクピシン語との二言語使用が増えている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-6.20" data-lng="155.30" data-zoom="8" data-tiles="terrain">🌋 クラウン・プリンス山脈を拡大</button>
  </div>
  
  <p>ロトカス語が教えてくれるのは「音が少ない言語は習得が楽」という単純な話ではない。ロトカスの子どもも、世界中の他の子どもと同じ労力で母語を獲得していく。重要なのは、<strong>人類の言語能力は上にも下にも驚くほど余白がある</strong>ということだ。11音から164音まで、根底のシステムは同じなのだ。</p>
        `,
      },
      sources: [
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
        en: 'Ubykh — the day a language with 84 consonants died',
        ja: 'ウビフ語 — 子音84個の言語が消えた日',
      },
      summary: {
        en: 'On 7 October 1992, Tevfik Esenç died in a Turkish village and took the Ubykh language with him: a Northwest Caucasian tongue with 84 consonants and just two phonemic vowels, recorded across decades by the French scholar Georges Dumézil.',
        ja: '1992年10月7日、テヴフィク・エセンチがトルコの村で世を去り、子音84・母音2のウビフ語も彼とともに消えた。半世紀にわたりこの言語を記録し続けたのは、フランスの碩学ジョルジュ・デュメジルだった。',
      },
      body: {
        en: `
  <p>The exact moment a language dies is rarely datable. <strong>Ubykh</strong> is the exception. On <strong>7 October 1992</strong>, in the Turkish village of <strong>Hacıosman</strong> south of the Sea of Marmara, an 88-year-old farmer named <strong>Tevfik Esenç</strong> went to sleep and did not wake up. He was the last fully fluent speaker of a language that had, until two centuries earlier, been the everyday tongue of tens of thousands of people on the Black Sea coast of the Caucasus.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="uby" data-zoom="6">🌍 Show Ubykh on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="43.60" data-lng="39.70" data-zoom="6" data-label="Sochi">🗺️ Fly to Ubykh's lost homeland (Sochi)</button>
  </div>
  
  <p>Ubykh belonged to the <strong>Northwest Caucasian</strong> family, alongside Abkhaz, Abaza, Adyghe and Kabardian. Its homeland was the strip of coast around what is now the Russian resort city of <strong>Sochi</strong>. After Imperial Russia's conquest of the Caucasus in the 1860s, almost the entire Ubykh population was forcibly deported across the Black Sea to Ottoman territory — a tragedy now remembered as the <em>muhajir</em> exile. Settled in scattered villages in Anatolia, the community switched, generation by generation, to Turkish and to Circassian. By 1900 Ubykh was already a domestic relic; by 1950 it was the speech of a handful of old men.</p>
  
  <p>What makes Ubykh extraordinary in linguistic terms is its phoneme inventory:</p>
  
  <ul>
    <li><strong>84 phonemic consonants.</strong> Pharyngealised, labialised, palatalised, ejective — every parameter that can multiply a consonant series, Ubykh used. Some published counts go as high as 81, others 83 or 84; even the lowest figure is higher than any non-Khoisan language.</li>
    <li><strong>Two phonemic vowels.</strong> Just <em>/ə/</em> and <em>/a/</em>, sometimes analysed as a single underlying vowel whose colour is determined by surrounding consonants. The contrast between vowels essentially does no work; the consonants do everything.</li>
    <li><strong>Polypersonal verb morphology.</strong> A single Ubykh verb can encode subject, direct object, indirect object, location, direction, instrument and benefactive arguments in one tightly stacked word — a structural feature shared with its Northwest Caucasian cousins.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="ab,ady,kbd">🗣 Compare Ubykh's surviving cousins (Abkhaz, Adyghe, Kabardian)</button>
  </div>
  
  <p>Almost everything we know about Ubykh in the 20th century we owe to the French Indo-Europeanist and comparative mythologist <strong>Georges Dumézil</strong>. Beginning in 1930, Dumézil made repeated trips to Anatolia to record the dwindling community, returning year after year for nearly six decades. He produced a series of grammatical descriptions and text collections — including the <em>Documents anatoliens sur les langues et les traditions du Caucase</em> series (vol. IV: <em>Récits oubykh</em>, 1965) — that remain foundational. Esenç became Dumézil's principal consultant in the 1960s; the two corresponded and worked together until Dumézil's death in 1986.</p>
  
  <blockquote>"He knew that he was the last. He carried the language as one carries a candle in a sealed room: alone, attentive, and aware that the air would not last." — paraphrased recollection of Dumézil's collaborators</blockquote>
  
  <p>Esenç understood his role with unusual clarity. He memorised proverbs, songs, prayers, place names and folktales specifically so that they could be recorded. He insisted on being buried under a headstone naming him, in Ubykh, as "the last speaker", a phrase he himself dictated. Norwegian phonetician <strong>Hans Vogt</strong> produced the standard reference dictionary, <em>Dictionnaire de la langue oubykh</em> (1963), and Dutch linguist <strong>Rieks Smeets</strong> continued the documentation through the late 20th century; together with Dumézil's text editions, their work forms the documentary bedrock for the language.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="40.50" data-lng="29.20" data-zoom="7">🕯️ Zoom into Hacıosman, Turkey</button>
  </div>
  
  <p>Today there are small groups of ethnic Ubykh in Turkey, Jordan and the United States who study the recordings, attempt limited revitalisation, and maintain a sense of identity through Circassian solidarity organisations. But functional fluency, with its 84 consonants and its bristling verb morphology, has not returned and most likely will not. Ubykh remains the textbook case of a language that was <strong>caught and described just in time</strong> — and then lost anyway.</p>
        `,
        ja: `
  <p>言語の死を正確な日付で言える例は少ない。<strong>ウビフ語</strong>はその例外だ。<strong>1992年10月7日</strong>、トルコ・マルマラ海南方の村<strong>ハジオスマン</strong>で、88歳の農夫<strong>テヴフィク・エセンチ</strong>が眠りについたまま目を覚まさなかった。彼はウビフ語の最後の完全な話者だった。200年前まで、コーカサスの黒海沿岸で数万人が日常的に話していた言語が、その瞬間に消えた。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="uby" data-zoom="6">🌍 地図でウビフ語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="43.60" data-lng="39.70" data-zoom="6" data-label="ソチ">🗺️ ウビフ族の失われた故郷（ソチ）へ</button>
  </div>
  
  <p>ウビフ語は<strong>北西コーカサス語族</strong>に属し、アブハズ語、アバザ語、アディゲ語、カバルド語と姉妹関係にある。本来の故地は、いまロシアのリゾート都市となっている<strong>ソチ</strong>周辺の細い海岸帯だった。1860年代の帝政ロシアによるコーカサス征服の結果、ウビフ族はほぼ全員が黒海の対岸オスマン領へ強制移住させられた──<em>ムハジル</em>（亡命者）と呼ばれる悲劇である。アナトリアの散在する村々に落ち着いた彼らは、世代ごとにトルコ語とチェルケス語へ切り替えていった。1900年にはすでに家庭内の遺物となり、1950年には数人の老人の言葉に縮んでいた。</p>
  
  <p>音韻論の観点でウビフ語を異形にしているのは、その音素体系だ。</p>
  
  <ul>
    <li><strong>子音音素84個。</strong> 咽頭化・唇音化・口蓋化・放出音──子音系列を増やす要素はすべて使われている。研究者によって81、83、84と数え方は揺れるが、最低数でもコイサン以外のあらゆる言語を上回る。</li>
    <li><strong>母音音素はわずか2個。</strong> <em>/ə/</em> と <em>/a/</em> のみ。分析によっては「実質的に1母音」とされ、母音の色合いは前後の子音で決まる。母音の対立はほぼ仕事をしておらず、すべてを子音が背負っている。</li>
    <li><strong>多人称動詞形態。</strong> 一語のウビフ語動詞に主語・直接目的語・間接目的語・場所・方向・道具・受益者を同時に詰め込める。これは北西コーカサス諸語に共通する特徴である。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="ab,ady,kbd">🗣 ウビフ語の生き残った姉妹語を比べる</button>
  </div>
  
  <p>20世紀のウビフ語に関する知識のほとんどは、フランスの印欧語学者で比較神話学者の<strong>ジョルジュ・デュメジル</strong>に負っている。1930年から半世紀以上にわたり、彼はアナトリアを何度も訪れ、消えゆく共同体を記録し続けた。文法書、テキスト集、そして決定的著作『ウビフ語辞典』（1965年）を残した。1960年代以降の主要なインフォーマントがエセンチであり、二人は1986年のデュメジル死去まで協働した。</p>
  
  <blockquote>「彼は自分が最後であると知っていた。密閉された部屋でろうそくを持つように、独り、注意深く、空気の残量を意識しながら、彼はその言語を運んでいた」── デュメジルの共同研究者の回想（要約）</blockquote>
  
  <p>エセンチは自らの役割を異例の明晰さで理解していた。ことわざ、歌、祈り、地名、民話を意図的に記憶し、録音されるべき形で残した。墓石にはウビフ語で「最後の話者」と刻むよう自ら口述した。デュメジル没後はオランダの言語学者<strong>リークス・スメーツ</strong>とノルウェーの音声学者<strong>ハンス・フォクト</strong>が記述を引き継いだ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="40.50" data-lng="29.20" data-zoom="7">🕯️ ハジオスマン村へズーム</button>
  </div>
  
  <p>現在もトルコ、ヨルダン、アメリカに少数のウビフ系住民がおり、録音を学びチェルケス連帯運動を通じてアイデンティティを保っている。だが84子音と複雑な動詞形態を持つ実用言語としてのウビフ語が戻る可能性はほぼない。ウビフ語は<strong>「ぎりぎり間に合って記述され、それでも失われた言語」</strong>の教科書的事例である。</p>
        `,
      },
      sources: [
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
        en: 'Damin — the secret men\'s register that broke Australia\'s phonological rules',
        ja: 'ダミン語 — オーストラリアの音韻常識を破った男性秘密言語',
      },
      summary: {
        en: 'Used only by initiated men on Mornington Island, Damin compressed the whole Lardil vocabulary into about 200 words — and broke every Australian sound rule, with click stops, ingressive laterals and ejectives found nowhere else on the continent.',
        ja: 'モーニントン島で成人儀礼を経た男性のみが用いたダミン語は、ラーディル語の語彙を約200語に圧縮し、吸気側面音や放出音など「オーストラリアにあり得ない音」を体系的に持っていた。',
      },
      body: {
        en: `
  <p>Across the continent of Australia, more than 250 indigenous languages share, with surprising consistency, a small palette of speech sounds: voiceless stops at four or five places of articulation, matching nasals, a couple of laterals, two rhotics — and absolutely no clicks, no ejectives, no implosives, no ingressive sounds. Then comes <strong>Damin</strong>, and the rules break.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="lbz_damin" data-zoom="6">🌍 Show Damin on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-16.6" data-lng="139.5" data-zoom="6">🗺️ Fly to Mornington Island</button>
  </div>
  
  <p>Damin (sometimes spelled <em>Demiin</em>) was the <strong>secret auxiliary register</strong> of the <strong>Lardil</strong> and neighbouring <strong>Yangkaal</strong> peoples of Mornington Island and Forsyth Island, in the southern Gulf of Carpentaria. It was taught only to men who had passed through the second stage of the <em>Warama</em> initiation ceremony, and was used in the ritual seclusion period immediately after. Outside that ceremonial context it was, at least in principle, forbidden to speak. By the time the language was first systematically recorded — by the American linguist <strong>Kenneth Hale</strong> in the 1960s — the last initiations had stopped, and only a handful of older men still remembered the system.</p>
  
  <p>What Hale found was extraordinary. Damin was not a separate language: it shared Lardil's grammar more or less wholesale. But it had its own vocabulary of <strong>roughly 200 lexical items</strong>, each one mapping by a clever rule of semantic compression onto a whole class of Lardil words. <em>n!aa</em>, for example, covered every kin term referring to a man of one's own moiety, and <em>didi</em> covered everyone of the opposite moiety. A speaker who knew the 200 Damin items could in principle express anything that Lardil could express — just more abstractly.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="lbz,nny">🗣 Compare Lardil and Yangkaal</button>
  </div>
  
  <p>The phonology, though, was where Damin broke continental norms. It contained:</p>
  
  <ul>
    <li><strong>Click stops</strong> — including a bilabial click <em>ʘ</em>, which is otherwise found only in southern African Khoisan languages and a handful of ritual registers worldwide. No other Australian language has clicks.</li>
    <li><strong>An ingressive lateral fricative</strong>, articulated by sucking air inward over the sides of the tongue. This sound is, as far as anyone has documented, <strong>unique to Damin</strong> in the world's languages.</li>
    <li><strong>An ejective</strong> <em>t'</em> and possibly other glottalic sounds, again unparalleled in the rest of Australia.</li>
    <li><strong>A nasalised egressive labio-lingual trill</strong> ("Bronx cheer") — a deliberately rude noise pressed into linguistic service.</li>
  </ul>
  
  <blockquote>"Damin is a deliberate invention, designed to be different. Where Lardil has p, Damin has a click; where Lardil has t, Damin has an ejective. The contrast itself is part of the meaning of the register." — Ken Hale, 1973</blockquote>
  
  <p>The conclusion most linguists draw from Damin is unsettling and exhilarating in equal measure. <strong>The "Australian" phonological profile is not biologically inevitable.</strong> Speakers of Lardil — who in everyday life used a sound system as plain as any of their neighbours — could, when ritual demanded, produce and routinely teach a wildly exotic phonology to teenage initiates. Whatever keeps the surface sound systems of Australian languages so uniform across thousands of kilometres is therefore <strong>cultural and sociolinguistic, not articulatory or cognitive</strong>.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-16.55" data-lng="139.45" data-zoom="9">🪨 Zoom into Mornington Island</button>
  </div>
  
  <p>Damin is no longer transmitted. The last initiated speakers died in the 1980s, and the secrecy taboos surrounding the register meant that the Lardil community itself could not simply "revive" it from recordings without violating its sacred function. What survives is Hale's fieldnotes, a small body of follow-up work by <strong>Norvin Richards</strong> and others, and an outsized place in the world's phonological imagination. For a language with only 200 words, Damin's footprint in linguistic theory is enormous.</p>
        `,
        ja: `
  <p>オーストラリア大陸の250以上の先住民言語は、驚くほど似た音体系を共有している──4〜5箇所の無声破裂音、対応する鼻音、いくつかの側面音、2種の流音。吸着音もなく、放出音もなく、吸気音もない。ところが<strong>ダミン語</strong>はそのすべてを破ってしまう。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="lbz_damin" data-zoom="6">🌍 地図でダミン語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-16.6" data-lng="139.5" data-zoom="6">🗺️ モーニントン島へ飛ぶ</button>
  </div>
  
  <p>ダミン語（<em>Demiin</em> とも）は、カーペンタリア湾南部のモーニントン島・フォーサイス島の<strong>ラーディル族</strong>および隣接する<strong>ヤンカール族</strong>が用いた<strong>儀礼用の秘密レジスター</strong>である。<em>ワラマ</em>成人儀礼の第二段階を経た男性のみに伝授され、儀礼後の隔離期間中に用いられた。それ以外の場面で話すことは原則として禁じられていた。アメリカの言語学者<strong>ケネス・ヘイル</strong>が1960年代に初めて体系的に記録したときには、すでに成人儀礼は途絶え、覚えている老人は数人しかいなかった。</p>
  
  <p>ヘイルが見出したのは驚くべき体系だった。ダミン語はラーディル語とは別言語ではない──文法はほぼまるごと共有している。だが語彙だけは独自で、<strong>約200項目</strong>しかない。各項目はラーディル語の語彙クラスをまるごと一語で覆う巧妙な意味圧縮になっている。たとえば <em>n!aa</em> は「自分と同じ半族の男性親族すべて」、<em>didi</em> は「反対半族の人間すべて」を指す。200語を知る者は理屈の上ではラーディル語と同じだけのことを語れる──ただし、より抽象的に。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="lbz,nny">🗣 ラーディル語とヤンカール語を比べる</button>
  </div>
  
  <p>大陸の常識を破ったのは音韻のほうだった。ダミン語は次のような音を持っていた。</p>
  
  <ul>
    <li><strong>吸着音（クリック）。</strong> 両唇吸着音 <em>ʘ</em> を含む。両唇吸着音は南部アフリカのコイサン諸語と世界の数少ない儀礼レジスターにしか見られない。オーストラリアの他の言語に吸着音はない。</li>
    <li><strong>吸気側面摩擦音。</strong> 舌の両側から空気を吸い込む音で、記述された限りでは<strong>世界でダミン語のみ</strong>に存在する。</li>
    <li><strong>放出音</strong> <em>t'</em> など。これもオーストラリアでは他に例がない。</li>
    <li><strong>鼻音化された唇舌震え音</strong>（いわゆる「ブロンクス・チア」）。意図的に「下品な音」を言語要素に組み込んだ例。</li>
  </ul>
  
  <blockquote>「ダミン語は意図的に発明された言語であり、ラーディル語と<em>異なるよう</em>に設計されている。ラーディルの p に対しダミンには吸着音、ラーディルの t に対し放出音。その対比そのものがレジスターの意味の一部である」── ケン・ヘイル（1973年）</blockquote>
  
  <p>ここから言語学者が引き出した結論は不穏かつ高揚的だ。<strong>「オーストラリアらしい音体系」は生物学的必然ではない</strong>。ラーディル語話者は、日常では他言語と変わらぬ素朴な音体系を使いながら、儀礼が要求すれば、思春期の初心者にも吸着音や放出音を仕込めたのだ。何千キロにわたるオーストラリアの音体系の均一性を支えているのは、調音器官でも認知能力でもなく、<strong>文化と社会言語学</strong>である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-16.55" data-lng="139.45" data-zoom="9">🪨 モーニントン島を拡大</button>
  </div>
  
  <p>ダミン語はもう伝承されていない。最後の正式な話者は1980年代に世を去り、儀礼的秘匿の禁忌があるため、ラーディル共同体自身も録音から単純に「復活」させることはできない。残されたのはヘイルのフィールドノート、<strong>ノービン・リチャーズ</strong>らによるその後の研究、そして言語学の想像力に与えた巨大な影響だけだ。語彙わずか200のレジスターが、これほどまでに音韻論を揺さぶった例は他にない。</p>
        `,
      },
      sources: [
        'Hale, Kenneth (1973). "Deep–surface canonical disparities in relation to analysis and change: An Australian example." In T. A. Sebeok (ed.), Current Trends in Linguistics 11: Diachronic, Areal, and Typological Linguistics. Mouton, pp. 401–458.',
        'Hale, Kenneth; Nash, David (1997). "Damin and Lardil phonotactics." In D. Tryon & M. Walsh (eds.), Boundary Rider: Essays in Honour of Geoffrey O\'Grady. Pacific Linguistics, pp. 247–259.',
        'McKnight, David (1999). People, Countries, and the Rainbow Serpent: Systems of Classification among the Lardil of Mornington Island. Oxford University Press.',
        'Evans, Nicholas (1995). A Grammar of Kayardild, with Historical-Comparative Notes on Tangkic. Mouton de Gruyter.',
        'Hale, Kenneth (1971). "A note on a Walbiri tradition of antonymy." In D. Steinberg & L. Jakobovits (eds.), Semantics. Cambridge University Press, pp. 472–482.',
        { text: 'Glottolog: Lardil (lard1244)', url: 'https://glottolog.org/resource/languoid/id/lard1244' },
        { text: 'AIATSIS: Lardil collection', url: 'https://collection.aiatsis.gov.au/austlang/language/g34' },
      ],
    },
    {
      id: 'khoisan-clicks',
      icon: '👅',
      tags: ['clicks', 'phonology', 'africa', 'isolate'],
      title: {
        en: 'Click consonants — five families of sound that crossed borders',
        ja: '吸着音 — 国境を越えた5系統の音',
      },
      summary: {
        en: 'Five kinds of click — dental, lateral, alveolar, palatal and bilabial — emerged in the languages of southern Africa\'s Khoe and Tuu families and the isolate Hadza, then leapt into Bantu Zulu and Xhosa via centuries of contact with Khoekhoe-speaking neighbours.',
        ja: '5系統の吸着音──歯音・側面・歯茎・硬口蓋・両唇──は南部アフリカのコエ語族・トゥー語族とハッザ語に発生し、コエコエ系民族との数百年にわたる接触を経てズールー語・コサ語などバントゥー諸語にも飛び移った。',
      },
      body: {
        en: `
  <p>Most languages that English speakers have heard "use" clicks — the lips-smack of an irritated parent, the tongue-cluck of disapproval — but use them <em>paralinguistically</em>, outside the phoneme inventory. In <strong>southern Africa</strong>, by contrast, several language families have made clicks into real consonants: building blocks of ordinary words, indistinguishable in status from <em>p</em> and <em>t</em> in English.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="hts" data-zoom="6">🌍 Show Hadza on the map</button>
  </div>
  
  <p>The traditional cluster of "click languages" comprises three completely unrelated lineages:</p>
  
  <ul>
    <li><strong>Khoe</strong> — the family that includes Khoekhoegowab (Nama–Damara) of Namibia, ǂ'Amkoe and Naro of Botswana, and several smaller languages of the Kalahari fringe.</li>
    <li><strong>Tuu</strong> — the southern group that includes <em>Taa (!Xóõ)</em>, the consonant-record holder featured elsewhere in this trivia collection, plus the moribund N|uu of South Africa.</li>
    <li><strong>Kx'a</strong> — a small family containing Juǀ'hoan and ǂHoan, with elaborate click inventories of their own.</li>
  </ul>
  
  <p>To these three families one usually adds <strong>two isolates of East Africa</strong>: <strong>Hadza</strong>, spoken by perhaps a thousand hunter-gatherers around Lake Eyasi in Tanzania, and <strong>Sandawe</strong>, a few hundred kilometres to the north. Both have clicks; neither has been shown to be related to the southern groups in any way that withstands close scrutiny. The old umbrella term "Khoisan" lumped all five together, but Tom Güldemann and others have spent the last twenty years arguing — convincingly — that <strong>Khoisan is an areal grouping, not a genetic family</strong>.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="hts,sad,naq,xh,zu">🗣 Compare Hadza, Sandawe, Khoekhoe, Xhosa, Zulu</button>
  </div>
  
  <p>Phoneticians distinguish <strong>five primary click types</strong> by where the front closure is made:</p>
  
  <ul>
    <li><strong>Bilabial</strong> <em>ʘ</em> — a kiss-like pop made with the lips. Rarest of all; survives mainly in Taa and a few neighbouring varieties.</li>
    <li><strong>Dental</strong> <em>|</em> — the sound English speakers make as "tut-tut".</li>
    <li><strong>Alveolar</strong> <em>!</em> — a sharp pop made by snapping the tongue from the alveolar ridge; the click in <em>Xhosa</em>'s name.</li>
    <li><strong>Palatal</strong> <em>ǂ</em> — a softer release further back on the palate.</li>
    <li><strong>Lateral</strong> <em>||</em> — a side-of-tongue click sometimes used by English speakers to urge a horse on.</li>
  </ul>
  
  <p>Each click can then be <em>accompanied</em> by voicing, aspiration, nasalisation, glottalisation, and combined with uvular or ejective releases. Multiplying the parameters out gives some Khoe and Tuu languages click inventories larger than the entire consonant systems of well-known languages elsewhere.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="naq" data-zoom="6">🌍 Show Khoekhoe (Nama)</button>
  </div>
  
  <p>The most striking sociolinguistic fact about clicks is that they <strong>jumped families</strong>. The Bantu languages <strong>Zulu</strong>, <strong>Xhosa</strong>, <strong>Southern Sotho</strong> and <strong>Swati</strong> all have phonemic clicks — three to five of them — even though their nearest Bantu relatives further north have none whatsoever. The explanation, worked out in detail by historians and linguists from <strong>Anthony Traill</strong> to <strong>Rainer Vossen</strong>, runs roughly as follows: as Bantu-speaking farmers moved south of the Limpopo in the second millennium CE, they encountered, intermarried with and partly absorbed Khoe and San communities. The bilingual generations who grew up in mixed households brought clicks across the family boundary, especially in respectful and ritual vocabulary. The Xhosa word <em>iXhosa</em> itself begins with an alveolar click.</p>

  <p style="background:rgba(255,237,190,0.55);border-left:3px solid #b8860b;padding:10px 14px;font-style:italic;border-radius:0 6px 6px 0">If you click <strong>Compare</strong> above, you'll notice that none of the twenty basic Swadesh-100 words in Xhosa or Zulu actually <em>contain</em> a click. That's the second half of the story: clicks in Bantu live almost entirely in <strong>cultural and respectful vocabulary</strong> — names (<em>iXhosa</em>, <em>uXamu</em>), animals (<em>iqaqa</em> "polecat", <em>ixoxo</em> "frog"), greetings, taboo replacements in <em>hlonipha</em> avoidance speech, and Khoekhoe loans (<em>iCawa</em> "Sunday"). Inherited Bantu words for water / fire / sun / hand / eye remain click-free.</p>

  <blockquote>"Clicks are not borrowed sounds in the way loanwords are borrowed. They are inherited features of bilingual childhood — and once they are in the lexicon of a single generation, they become native." — Anthony Traill, 1995 (paraphrased)</blockquote>
  
  <p>Beyond southern Africa, robust documented cases are the East African isolates <strong>Hadza</strong> and <strong>Sandawe</strong>, plus the special ritual register <strong>Damin</strong> in Australia — used by initiated men of Mornington Island rather than as an ordinary spoken language. (Reports of click-like sounds in the ceremonial register of El Molo exist but are not well established.) That makes the southern African click area one of the world's tightest linguistic regions — a place where one extraordinary feature has been maintained, elaborated and traded across four families for at least several thousand years.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-25" data-lng="22" data-zoom="4">🌍 Survey the click belt of southern Africa</button>
  </div>
  
  <p>Whether clicks are an archaic feature inherited from extremely ancient African populations, a regional invention amplified by contact, or some combination of both, remains debated. What is not debated is that they are <strong>fully functional phonemes</strong>, learned by children with the same ease as any other consonant — a reminder that the "exotic" is just a matter of where you happen to grow up.</p>
        `,
        ja: `
  <p>英語話者の多くも「クリック音」は出せる──いらいらした親の唇打ち、舌打ちによる否定。だがそれらは<em>パラ言語的</em>な音であり、音素ではない。これに対し<strong>南部アフリカ</strong>の複数の言語族では、吸着音は正真正銘の子音である。英語の <em>p</em> や <em>t</em> と同じ資格で普通の単語の中に組み込まれている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="hts" data-zoom="6">🌍 ハッザ語を地図で見る</button>
  </div>
  
  <p>従来「クリック言語」と総称されてきたのは、互いに系統関係のない3つの語族である。</p>
  
  <ul>
    <li><strong>コエ語族</strong>──ナミビアのコエコエゴワブ語（ナマ＝ダマラ語）、ボツワナのナロ語、カラハリ縁辺のいくつかの言語。</li>
    <li><strong>トゥー語族</strong>──子音記録のタア語（!Xóõ）や、瀕死状態の南アフリカのンウー語（N|uu）など。</li>
    <li><strong>クサ語族</strong>──ジュホアン語、ホアン語など。豊富な吸着音体系を持つ。</li>
  </ul>
  
  <p>これに東アフリカの2つの<strong>孤立言語</strong>──タンザニアのエヤシ湖周辺で約千人の狩猟採集民に話される<strong>ハッザ語</strong>、その北方の<strong>サンダウェ語</strong>──を加える。両者にも吸着音はあるが、南部アフリカの語族との系統関係は厳密な検証に耐えていない。古い総称「コイサン語族」は5系統をひとくくりにしていたが、トム・ギュルデマンらの研究により、近年は<strong>「地域的グループ化であって遺伝的語族ではない」</strong>と結論されている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="hts,sad,naq,xh,zu">🗣 ハッザ・サンダウェ・コエコエ・コサ・ズールーを比較</button>
  </div>
  
  <p>音声学的には<strong>5系統の主要吸着音</strong>が区別される。</p>
  
  <ul>
    <li><strong>両唇吸着音</strong> <em>ʘ</em>──キスのような破裂音。タア語など少数言語のみ。</li>
    <li><strong>歯音</strong> <em>|</em>──英語話者が「ちっ」と舌打ちする音。</li>
    <li><strong>歯茎</strong> <em>!</em>──舌を歯茎から鋭く離す破裂音。コサ語の <em>Xhosa</em> 自身の頭音。</li>
    <li><strong>硬口蓋</strong> <em>ǂ</em>──口蓋のやや奥で柔らかく弾く音。</li>
    <li><strong>側面</strong> <em>||</em>──舌側面を弾く音。英語話者が馬を急かす際に使う音。</li>
  </ul>
  
  <p>各吸着音はさらに有声・有気・鼻音化・声門化、口蓋垂・放出と組み合わせて分化する。コエ語族・トゥー語族のいくつかでは、吸着音だけで他言語の全子音体系を上回る。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="naq" data-zoom="6">🌍 コエコエ（ナマ）語を表示</button>
  </div>
  
  <p>社会言語学的にもっとも興味深いのは、吸着音が<strong>語族を飛び越えた</strong>事実だ。バントゥー諸語の<strong>ズールー語</strong>、<strong>コサ語</strong>、<strong>南ソト語</strong>、<strong>スワティ語</strong>は3〜5種の吸着音を音素として持つが、北方の近縁バントゥー諸語にはまったくない。歴史言語学者ら（アンソニー・トレイル、ライナー・フォッセンほか）の説明はこうだ──第二千年紀、バントゥー系農耕民がリンポポ川以南に進出する過程でコエ系・サン系の人々と混血・統合し、混合家庭で育ったバイリンガル世代が、敬語や儀礼語彙を中心に吸着音を持ち込んだのである。「コサ」という民族名の頭音そのものが歯茎吸着音である。</p>

  <p style="background:rgba(255,237,190,0.55);border-left:3px solid #b8860b;padding:10px 14px;font-style:italic;border-radius:0 6px 6px 0">上の「比較」ボタンを押すと、コサ語・ズールー語の20の基本語彙には吸着音が一つも入っていないことに気づくはずだ。これがもう一つのポイント。バントゥー語族における吸着音は<strong>文化・敬語・儀礼の語彙</strong>にほぼ集中している──民族名（<em>iXhosa</em>、<em>uXamu</em>）、動物名（<em>iqaqa</em>「ケナガイタチ」、<em>ixoxo</em>「カエル」）、挨拶、義母などへの婉曲語（<em>hlonipha</em> 回避語法）、コエコエ語からの借用語（<em>iCawa</em>「日曜日」）など。「水・火・太陽・手・目」といったバントゥー祖語から継承された基本語彙には吸着音は出てこない。</p>

  <blockquote>「吸着音は借用語のように借りられたのではない。バイリンガルな幼少期に受け継がれた要素であり、ひとたび一世代の語彙に入れば、それは母語の音になる」── アンソニー・トレイル（1995年、要約）</blockquote>
  
  <p>南部アフリカ以外で吸着音が生きているのは、東アフリカの<strong>ハッザ</strong>・<strong>サンダウェ</strong>、オーストラリアの儀礼レジスター<strong>ダミン語</strong>など、ごくわずか。南部アフリカの吸着音圏は、4つの語族にわたって少なくとも数千年にわたり一つの特異な音特徴を維持・拡大・交換してきた、世界でもっとも「タイトな」言語地帯のひとつである。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="-25" data-lng="22" data-zoom="4">🌍 南部アフリカの吸着音圏を俯瞰</button>
  </div>
  
  <p>吸着音が古代アフリカ人口に由来する古特徴なのか、接触によって増幅された地域革新なのか、両者の合成なのかはまだ議論中である。だが一つ確かなのは、吸着音は<strong>正真正銘の音素</strong>であり、現地の子どもたちは他のどの子音と同じ容易さで習得するという事実だ。「異常」とは、自分がどこに生まれたかの偶然にすぎない。</p>
        `,
      },
      sources: [
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
        en: 'Basque — the language Europe forgot to replace',
        ja: 'ヨーロッパが置き換え損ねた言語、バスク語',
      },
      summary: {
        en: 'Western Europe\'s only surviving pre-Indo-European language, spoken in the Pyrenees by ~750,000 people — and unrelated to anything else on Earth.',
        ja: '西ヨーロッパで唯一生き残った印欧語以前の言語。ピレネー山中で約75万人が話す、地球上のどの言語とも親縁関係のない孤立言語。',
      },
      body: {
        en: `
  <p>When the Romans marched into Hispania in the 2nd century BCE, they encountered dozens of languages. Within four hundred years, almost every one had been replaced by Latin — the seed of Spanish, Portuguese, Catalan, French, and the rest of Romance Europe. Almost every one. In the western Pyrenees, one language refused to die. Its speakers still call themselves <em>euskaldunak</em> — literally "those who have Basque" — and their language, <strong>Euskara</strong>, is the last living survivor of a Europe that existed before the Indo-Europeans arrived.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="eu" data-zoom="7">🌍 Show Basque on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="43.17" data-lng="-2.47" data-zoom="8">⛰️ Fly to the Basque Country</button>
  </div>
  
  <p>Roughly 750,000 people speak Basque today, split between three provinces in Spain (Bizkaia, Gipuzkoa, Araba and Navarra) and three in France (Labourd, Lower Navarre, Soule). Genetically, the language is a true <strong>isolate</strong>: no proven relatives. Linguists have spent two centuries trying to connect it to Iberian, Berber, Caucasian, Etruscan, Pictish, Burushaski, and even Ainu — and not one proposal has survived peer review.</p>
  
  <p>The most serious historical link is to <strong>Aquitanian</strong>, attested in roughly 500 personal and divine names carved on Roman-era votive stones in southwestern Gaul. The forms look strikingly Basque: <em>NESCATO</em> matches modern <em>neskato</em> "girl"; <em>CISON</em> matches <em>gizon</em> "man"; <em>SEMBE-</em> matches <em>seme</em> "son". Most specialists now treat Aquitanian as an older cousin or direct ancestor of Basque, pushing the language's documented history back at least 2,000 years. Whether Basque also descends from a wider <strong>Vasconic substrate</strong> that once blanketed Western Europe — as proposed by Theo Vennemann — is far more controversial.</p>
  
  <ul>
    <li><strong>Ergative-absolutive alignment.</strong> Basque marks the subject of a transitive verb (the "agent") with a special suffix <em>-k</em>, while the object and the subject of an intransitive verb go unmarked. This is rare in Europe but common worldwide.</li>
    <li><strong>Polypersonal agreement.</strong> A single Basque verb form can encode the person and number of the subject, the direct object, <em>and</em> the indirect object simultaneously: <em>dakarkiot</em> = "I bring it to him".</li>
    <li><strong>Vigesimal counting.</strong> Numbers are built on 20: <em>hogei</em> "20", <em>berrogei</em> "40" (lit. "two-twenty"), <em>hirurogei</em> "60". The same base survives in French <em>quatre-vingts</em> "80" — a possible Basque substrate trace.</li>
    <li><strong>No grammatical gender.</strong> Like Finnish and Turkish, Basque has no masculine/feminine distinction in nouns or pronouns.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="eu">💧 See Basque "Water"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="eu">🔢 See Basque "One"</button>
  </div>
  
  <p>Basque came close to extinction in the 20th century. Under Francisco Franco's dictatorship (1939–1975), speaking Basque in public was punished, the language was banned from schools and church, and parents were fined for giving their children Basque names. The post-Franco standardization effort, <strong>Euskara Batua</strong> ("Unified Basque"), was led from the 1960s by the Basque language academy <em>Euskaltzaindia</em> and the linguist <strong>Koldo Mitxelena</strong>. It pulled together divergent dialects — Bizkaian, Gipuzkoan, Navarrese, Lapurdian, Zuberoan — into a written standard usable in schools, newspapers, and government.</p>
  
  <blockquote>"Hizkuntza bat ez da galtzen ez dakitenek ikasten ez dutelako, dakitenek hitz egiten ez dutelako baizik."<br>"A language is not lost because those who don't know it fail to learn it — it is lost because those who know it stop speaking it." — Joxean Artze</blockquote>
  
  <p>That revival has worked: Basque is now co-official with Spanish in the Basque Autonomous Community, taught throughout the school system in three immersion models (A, B, D), and used on television, in literature, and online. It remains, as it has been for thousands of years, the stubborn pre-Indo-European voice of the western Pyrenees — a linguistic time capsule from a Europe we will never otherwise hear.</p>
        `,
        ja: `
  <p>紀元前2世紀、ローマ軍がイベリア半島に進軍した時、そこには数十の言語が話されていた。400年後、そのほとんどはラテン語に置き換わり、やがてスペイン語、ポルトガル語、カタルーニャ語、フランス語といったロマンス諸語の母胎となった。──ただ一つの言語を除いて。西ピレネーの山岳地帯で、ある言語はラテン化を拒んだ。話者は自らを <em>euskaldunak</em>（「バスク語を持つ者」）と呼び、その言語<strong>エウスカラ（Euskara）</strong>は、印欧語族が到来する以前のヨーロッパから生き残った最後の話し言葉である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="eu" data-zoom="7">🌍 地図でバスク語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="43.17" data-lng="-2.47" data-zoom="8">⛰️ バスク地方へ飛ぶ</button>
  </div>
  
  <p>現在、バスク語話者は約75万人。スペイン側のビスカヤ、ギプスコア、アラバ、ナバラと、フランス側のラブール、下ナバラ、スールに分布する。系統的には完全な<strong>孤立言語</strong>で、イベリア語、ベルベル語、コーカサス諸語、エトルリア語、ピクト語、ブルシャスキー語、果てはアイヌ語との関連説まで提示されてきたが、いずれも学界の検証を通過していない。</p>
  
  <p>もっとも有力な歴史的つながりは、ガリア南西部のローマ期奉納碑文に約500語残る<strong>アクィタニア語</strong>である。<em>NESCATO</em> は現代バスク語の <em>neskato</em>「少女」、<em>CISON</em> は <em>gizon</em>「男」、<em>SEMBE-</em> は <em>seme</em>「息子」と驚くほどよく対応する。現在では多くの専門家がアクィタニア語をバスク語の祖先または近縁の姉妹言語とみなしており、これによりバスク語の文献記録は少なくとも2000年遡る。さらに広い<strong>ヴァスコン基層</strong>がかつて西欧全体を覆っていた、というテオ・フェネマン説は依然として論争中である。</p>
  
  <ul>
    <li><strong>能格・絶対格体系。</strong> 他動詞の主語に <em>-k</em> という接辞をつけ、目的語や自動詞の主語は無標で表す。ヨーロッパでは稀だが世界的には珍しくない類型。</li>
    <li><strong>多人称一致。</strong> 一つの動詞形に主語・直接目的語・間接目的語の人称数すべてが包み込まれる。<em>dakarkiot</em>「私はそれを彼に持っていく」。</li>
    <li><strong>20進法。</strong> <em>hogei</em>「20」、<em>berrogei</em>「40（2×20）」、<em>hirurogei</em>「60」。フランス語の <em>quatre-vingts</em>「80」にもバスク基層の痕跡が疑われる。</li>
    <li><strong>文法性なし。</strong> フィンランド語やトルコ語と同じく、名詞・代名詞に男性／女性の区別がない。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="eu">💧 バスク語の「水」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="eu">🔢 バスク語の「一」</button>
  </div>
  
  <p>バスク語は20世紀に消滅の危機に瀕した。フランコ独裁政権下（1939–1975）では公の場での使用が処罰され、学校・教会から追放され、子にバスク名をつけた親には罰金が科された。フランコ没後の標準化運動<strong>エウスカラ・バトゥア</strong>（「統一バスク語」）は、1960年代以降、バスク語アカデミー <em>Euskaltzaindia</em> と言語学者<strong>コルド・ミチェレナ</strong>が主導し、ビスカヤ、ギプスコア、ナバラ、ラプルディ、スベロアといった分岐方言を、学校・新聞・行政で使える一つの書記標準にまとめあげた。</p>
  
  <blockquote>「言語は、知らない者が学ばないから失われるのではない。知っている者が話さなくなるから失われるのだ」── ホシェアン・アルツェ</blockquote>
  
  <p>復興は実を結んだ。バスク語はバスク自治州でスペイン語と並ぶ公用語となり、A・B・D の三つのモデルで学校教育に組み込まれ、テレビ・文学・インターネット上で日々使われている。バスク語は数千年来そうであったように、西ピレネーから響き続ける頑固な「印欧語以前の声」であり、私たちが他の方法では決して聞くことのできない、古代ヨーロッパの生きたタイムカプセルである。</p>
        `,
      },
      sources: [
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
  <p>Around 3200 BCE, in the southern Mesopotamian city of <strong>Uruk</strong>, somebody pressed the end of a reed stylus into wet clay and wrote down a quantity of barley. That clay tablet, and thousands like it, are among the earliest moments human language escaped the breath that carried it — alongside parallel developments in early dynastic Egypt and, somewhat later, in the Indus Valley and China. The language being recorded was <strong>Sumerian</strong> (<em>eme-gir</em>, "the native tongue") — and 5,200 years later we are still reading it.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="sux" data-zoom="6">🌍 Show Sumerian on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="31.32" data-lng="45.64" data-zoom="7" data-label="Uruk">𒀭 Fly to Uruk</button>
  </div>
  
  <p>Sumerian is a <strong>language isolate</strong>. Despite a century of effort, no proven relatives have been found — not in Semitic (its much later neighbour Akkadian), not in Indo-European, not in Dravidian, not in any of the Caucasian families. It is also <strong>agglutinative</strong> and largely <strong>ergative</strong>: meaning is built by stacking morphemes onto a verbal root in fixed slots, and the agent of a transitive verb takes a special case ending. A typical verbal chain looks like:</p>
  
  <blockquote><em>i-mu-na-an-šúm</em> — "he gave it to him" (literally: aspect-ventive-3sg.dative-3sg.agent-give)</blockquote>
  
  <p>Writing began as accountancy. The earliest tablets — the so-called <strong>proto-cuneiform</strong> of Uruk IV (c. 3200 BCE) — are receipts and ration lists: pictographs for sheep, beer, oil, with numbers in a sexagesimal (base-60) system that survives in our 60-minute hour. Over the following four centuries the pictographs were rotated 90 degrees, stylized into wedge-shaped impressions, and gained a phonetic dimension via the <strong>rebus principle</strong>: a sign for an object came to also stand for the sound of its name. Once a writing system can spell sounds, it can spell anything — and by 2600 BCE Sumerian scribes were writing literature, law, and prayer.</p>
  
  <ul>
    <li><strong>The Kish tablet</strong> (c. 3500 BCE) and Uruk tablet W 9578a are among the earliest known writing.</li>
    <li><strong>The Instructions of Shuruppak</strong> (c. 2500 BCE) are among the oldest surviving works of literature.</li>
    <li><strong>The Code of Ur-Nammu</strong> (c. 2100 BCE), the oldest known law code, predates Hammurabi by three centuries — and was written in Sumerian.</li>
    <li><strong>Enheduanna</strong> (c. 2285 BCE), an Akkadian princess and high priestess of the moon god Nanna, composed Sumerian hymns to Inanna and is the earliest named author in human history.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="sux">💧 See Sumerian "Water"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="house" data-code="sux">🏠 See Sumerian "House"</button>
  </div>
  
  <p>By around 2000 BCE, after the fall of the Third Dynasty of Ur, Sumerian appears to have died out as anybody's mother tongue, displaced by the Semitic Akkadian of their northern neighbours. But it didn't stop being written. For nearly two thousand more years, Sumerian was kept alive in scribal schools (the <em>edubba</em>) as the prestige language of religion, scholarship, divination, and astronomy — the cuneiform world's Latin. Babylonian and Assyrian scribes copied Sumerian texts down into the 1st century BCE, the last datable Sumerian-language tablets postdating Alexander the Great.</p>
  
  <p>The language was forgotten entirely after the death of cuneiform itself, around the 1st century CE. It re-entered human memory only in the 19th century, when <strong>Henry Rawlinson</strong>, <strong>Edward Hincks</strong> and <strong>Jules Oppert</strong> — three of the decipherers of cuneiform — realized that the bilingual lexical lists they were reading recorded not just Akkadian but an older, non-Semitic language behind it. Oppert proposed the name "Sumerian" in 1869, after the term <em>kengir</em> "Sumer" used by Sumerians themselves.</p>
  
  <p>Today the <strong>Pennsylvania Sumerian Dictionary</strong> and the <strong>Electronic Text Corpus of Sumerian Literature</strong> (ETCSL, Oxford) make it possible to read the world's oldest poetry on a phone. The <strong>Epic of Gilgamesh</strong>, in its Sumerian-language predecessors like "Gilgamesh and the Bull of Heaven", was the first literature humanity ever wrote — and it is still being translated.</p>
        `,
        ja: `
  <p>紀元前3200年頃、メソポタミア南部の都市<strong>ウルク</strong>で、誰かが葦のスタイラスの先を湿った粘土に押しつけ、大麦の数量を記録した。その粘土板と、それに続く何千枚もの板は、人類の言語が初めて「息」から解放され、物質に刻まれた瞬間を示す。記録された言語は<strong>シュメール語</strong>（<em>eme-gir</em>「土地の言葉」）──5200年後の今も読み続けられている。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="sux" data-zoom="6">🌍 地図でシュメール語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="31.32" data-lng="45.64" data-zoom="7" data-label="ウルク">𒀭 ウルクへ飛ぶ</button>
  </div>
  
  <p>シュメール語は<strong>孤立言語</strong>であり、1世紀以上の研究にもかかわらず親縁関係が証明された言語は一つもない。隣接していたセム系アッカド語ともインド・ヨーロッパ語族ともドラヴィダ語族ともコーカサス諸語とも結びつかない。型としては<strong>膠着語</strong>かつおおむね<strong>能格</strong>で、動詞語根の前後に決まったスロットで形態素を積み重ねて意味を作る。たとえば <em>i-mu-na-an-šúm</em>「彼はそれを彼に与えた」は、相＋方向＋3単与格＋3単能格＋「与える」と分析される。</p>
  
  <p>文字は<strong>会計</strong>として始まった。最古層の粘土板（ウルクIV期、紀元前3200年頃）の<strong>原楔形文字</strong>は、羊・ビール・油を表す絵文字と、現在の「1時間＝60分」に残る60進法の数字で書かれた領収書や配給簿である。400年かけて絵文字は90度回転して楔形に様式化され、<strong>レブス原理</strong>（絵が表す物の音価で他の語を綴る）によって表音的次元を獲得した。音を綴れるようになった文字は、何でも書ける──紀元前2600年頃には、シュメールの書記は文学・法・祈りを記し始めた。</p>
  
  <ul>
    <li><strong>キシュ板</strong>（紀元前3500年頃）とウルク W 9578a 板は、人類最古の文字資料に属する。</li>
    <li><strong>『シュルッパクの教訓』</strong>（紀元前2500年頃）は、現存最古の文学のひとつ。</li>
    <li><strong>『ウル・ナンム法典』</strong>（紀元前2100年頃）は、ハンムラビ法典より300年古い世界最古の法典で、シュメール語で書かれた。</li>
    <li><strong>エンヘドゥアンナ</strong>（紀元前2285年頃）はアッカドの王女・月神ナンナの高位巫女で、女神イナンナへのシュメール語讃歌の作者であり、人類史で名前の残る最古の著者である。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="sux">💧 シュメール語の「水」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="house" data-code="sux">🏠 シュメール語の「家」</button>
  </div>
  
  <p>紀元前2000年頃、ウル第三王朝の崩壊後、シュメール語は母語としては消滅し、北方のセム系アッカド語に取って代わられた。だが書かれることはやめなかった。続く約2000年間、シュメール語は書記学校 <em>edubba</em> で教えられ、宗教・学問・占い・天文の威信言語──楔形文字世界のラテン語──として生き続けた。バビロニア人やアッシリア人の書記は紀元前1世紀までシュメール語文書を書写し、確実な年代を持つ最後のシュメール語板はアレクサンドロス大王より後にまで及ぶ。</p>
  
  <p>楔形文字そのものが紀元1世紀頃に絶えると、シュメール語も人類の記憶から完全に消えた。再発見されたのは19世紀、楔形文字解読者の<strong>ヘンリー・ロウリンソン</strong>、<strong>エドワード・ヒンクス</strong>、<strong>ジュール・オペール</strong>が、バイリンガル語彙表の背後にアッカド語ではない、より古い非セム系言語があると気づいた時である。1869年、オペールが自称 <em>kengir</em>「シュメール」に由来する「Sumerian」の名を提案した。</p>
  
  <p>現代では、ペンシルバニア大学のシュメール語辞典 PSD と、オックスフォードの<strong>シュメール文学電子テキスト・コーパス</strong>（ETCSL）により、人類最古の詩をスマートフォンで読める。シュメール語版『ギルガメシュと天の牡牛』など、後の『ギルガメシュ叙事詩』の祖型は、人類が初めて書き残した文学であり、いまも翻訳が続いている。</p>
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
        en: 'Pre-Roman Italy\'s dominant language: 13,000 surviving inscriptions in a Greek-derived alphabet, fully phonetically readable — and still only partly translated.',
        ja: 'ローマ以前のイタリアを支配した言語。ギリシア由来のアルファベットで書かれた約13,000の碑文が残り、音は完全に読めるのに、意味は半分しか分かっていない。',
      },
      body: {
        en: `
  <p>Before Rome was Rome, the dominant power in central Italy was the <strong>Etruscan</strong> civilization — twelve city-states stretched from the Arno to the Tiber, master metalworkers, sea-traders, and the people who taught the Romans how to drape a toga, build an arch, and stage a gladiator fight. They also left behind one of archaeology's strangest gifts: a language we can <em>read aloud</em> letter for letter, but only partially understand.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ett" data-zoom="6">🌍 Show Etruscan on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="42.4" data-lng="11.9" data-zoom="7">𐌀 Fly to Etruria</button>
  </div>
  
  <p>Etruscan is written in an <strong>alphabet borrowed from Euboean Greek</strong> around 700 BCE — the very same west-Greek alphabet that, passed through Etruscan hands to the Romans, gave the world the Latin letters you are reading right now. Because the script is alphabetic and well understood, every inscription can be phonetically transcribed. The trouble is the <strong>language behind the script</strong>: Etruscan is not Indo-European, not Semitic, not Italic, not anything else with living relatives. The only widely-accepted relatives are two heavily fragmentary languages — <strong>Raetic</strong> (in the Alps) and <strong>Lemnian</strong> (on the Aegean island of Lemnos, attested in the 6th century BCE stele of Kaminia) — together forming the small <strong>Tyrsenian</strong> family.</p>
  
  <p>Roughly <strong>13,000 inscriptions</strong> are known, the great majority short and funerary: who is buried here, how old they were, who their parents and spouse were. Repetitive formulae like <em>mi larthia</em> "I am of Larth" are easy. Anything beyond name, family, and number is hard. A handful of longer texts are the keys to whatever we do understand:</p>
  
  <ul>
    <li><strong>The Liber Linteus</strong> (Linen Book), the longest surviving Etruscan text. It is a ritual calendar of about 1,200 readable words, hand-copied onto linen in the 3rd century BCE, then cut up in Roman Egypt and used to wrap a female mummy now in the Zagreb Archaeological Museum.</li>
    <li><strong>The Tabula Capuana</strong>, a terracotta tile with about 390 words of ritual instructions (c. 470 BCE).</li>
    <li><strong>The Pyrgi Tablets</strong> (c. 500 BCE), three thin sheets of gold from the port of Pyrgi, two in Etruscan and one in Phoenician — a near-bilingual dedication to the goddess Uni / Astarte. Discovered in 1964 and crucial for confirming vocabulary.</li>
    <li><strong>The Tabula Cortonensis</strong>, a 200-word bronze tablet recording what looks like a land sale, found near Cortona in 1992.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="ett">🔢 See Etruscan "One"</button>
  </div>
  
  <p>What we <em>do</em> know is surprising. Etruscan has the numerals <em>thu, zal, ci, huth, mach, śa</em> for 1–6 — though scholars still argue over which numeral pairs with which, partly because four ivory dice found in Tuscany write the numbers out as words rather than dots. Etruscan declines nouns by case (genitive in <em>-s</em> or <em>-l</em>, ablative in <em>-is</em>), conjugates verbs for past and present (<em>-ce</em> past, <em>-e</em> present), and has a striking system of <strong>nominal phrase suffixes that stack</strong>: a noun marked for genitive can take a second genitive on top. The vocabulary that has been securely extracted is around 250 words; the rest of the lexicon, including most of the Liber Linteus's ritual technical terms, is contextual guesswork.</p>
  
  <p>Modern Etruscan studies were essentially founded by the Italian archaeologist <strong>Massimo Pallottino</strong> (1909–1995), whose <em>Etruscologia</em> (first published 1942, eight editions) reset the field on the "combinatorial method": match patterns within Etruscan itself, treat Greek and Roman classical sources as background noise rather than direct translation aids, and accept that we will progress one inscription at a time.</p>
  
  <blockquote>"Etruscan is no longer a mystery, but it remains a problem." — Massimo Pallottino, paraphrased from <em>Etruscologia</em></blockquote>
  
  <p>By the 1st century CE, Etruscan was dying. The emperor Claudius (10 BCE–54 CE) wrote a now-lost 20-volume history of the Etruscans, the <em>Tyrrhenika</em>, and tried to preserve the language; he is sometimes called the last man who could read it. With his death the language slipped out of living memory — leaving us 13,000 inscriptions and one ritually-wrapped mummy as the field notebook of a civilization that taught Rome how to be Rome.</p>
        `,
        ja: `
  <p>ローマがローマになる前、中部イタリアを支配していたのは<strong>エトルリア人</strong>だった。アルノ川からティベル川まで広がる12都市国家の連合体で、金属加工と海上交易に長け、トーガの巻き方、アーチの架け方、剣闘士試合の演出までローマ人に教えた民族である。彼らはまた、考古学に最も奇妙な贈り物の一つを残した──<em>声に出して読めるのに、意味の半分しか分からない</em>言語、<strong>エトルリア語</strong>である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ett" data-zoom="6">🌍 地図でエトルリア語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="42.4" data-lng="11.9" data-zoom="7">𐌀 エトルリアへ飛ぶ</button>
  </div>
  
  <p>エトルリア語は、紀元前700年頃に<strong>エウボイア式ギリシア文字</strong>を借りて表記された。これがエトルリア人を経由してローマに伝わり、今あなたが読んでいるラテン文字の元になる。アルファベットは完全に解読されているので、どんな碑文も音声化できる。問題は文字の<strong>背後にある言語</strong>のほうだ──エトルリア語は印欧語族でも、セム語族でも、イタリック語派でもない。広く認められている近縁言語は、アルプスの<strong>ラエティア語</strong>とエーゲ海レムノス島で紀元前6世紀のカミニア碑文に残る<strong>レムノス語</strong>のみで、これらを合わせて<strong>テュルセノイ語族</strong>と呼ばれる。</p>
  
  <p>現存碑文は約<strong>13,000点</strong>、その大半は短い墓碑で、「ここに誰が葬られている」「何歳だった」「親と配偶者は誰か」を記すだけだ。<em>mi larthia</em>「私はラルスのものだ」のような決まり文句は分かる。だが名前・家系・数を超えると途端に難しくなる。長文資料はわずかしかなく、それが解読の鍵を握る:</p>
  
  <ul>
    <li><strong>『リーベル・リンテウス』</strong>（亜麻布の書）── 現存最長のエトルリア語テキスト。約1,200語の儀礼暦が紀元前3世紀に亜麻布に手書きされ、後にローマ期エジプトで切り刻まれて女性のミイラの布として再利用された。現在ザグレブ考古博物館蔵。</li>
    <li><strong>『カプア板』</strong>── テラコッタ板に約390語の儀礼指示（紀元前470年頃）。</li>
    <li><strong>『ピュルギ金板』</strong>（紀元前500年頃）── ピュルギ港から出土した3枚の金薄板。エトルリア語2枚・フェニキア語1枚で、女神ウニ／アスタルテへの奉献文。1964年発見、語彙確認の決定的資料。</li>
    <li><strong>『コルトナ板』</strong>── 1992年にコルトナ近郊で発見された約200語の青銅板。土地売買契約と見られる。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="ett">🔢 エトルリア語の「一」</button>
  </div>
  
  <p>分かっている部分も意外と多い。1から6を表す数詞 <em>thu, zal, ci, huth, mach, śa</em> は知られているが、トスカーナで出土した4個の象牙のサイコロが数字を点ではなく語で書いているため、どの語がどの数字に対応するかをめぐって学者の意見はいまも割れている。エトルリア語は名詞を格変化させ（属格 <em>-s/-l</em>、奪格 <em>-is</em>）、動詞を時制変化させ（過去 <em>-ce</em>、現在 <em>-e</em>）、名詞句接辞を<strong>積み重ねる</strong>独特な体系を持つ──属格に属格をさらにつけられる。確実に解明された語彙は約250語、それ以外、特にリーベル・リンテウスの儀礼専門用語の大半は文脈推定に頼っている。</p>
  
  <p>現代エトルリア学を実質的に確立したのはイタリアの考古学者<strong>マッシモ・パッロッティーノ</strong>（1909–1995）である。1942年初版・8版を重ねた著書『Etruscologia』で、ギリシア・ローマ古典資料を直接の翻訳補助としては使わず、エトルリア語内部のパターン照合（組合せ法）によって一歩ずつ進む方針を確立した。</p>
  
  <blockquote>「エトルリア語はもはや謎ではない。だが依然として問題である」── パッロッティーノ『Etruscologia』より要約</blockquote>
  
  <p>紀元1世紀にはエトルリア語は絶滅へ向かっていた。皇帝クラウディウス（紀元前10–紀元54）はエトルリア史20巻『テュッレーニカ』（散逸）を著して言語の保存を試みた最後の知識人で、「最後にエトルリア語を読めた人物」と呼ばれることもある。彼の死とともに言語は記憶から消え、ローマに「ローマであること」を教えた文明のフィールドノートとして、13,000の碑文と一つの巻かれたミイラだけが残された。</p>
        `,
      },
      sources: [
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
        en: 'Sentinelese — the language we have never recorded',
        ja: '一度も録音されたことのない言語、センチネル語',
      },
      summary: {
        en: 'On a 60 km² island in the Bay of Bengal lives a people whose ancestors may belong to one of the earliest layers of human settlement in the region — and whose language no outsider has ever heard, let alone documented.',
        ja: 'ベンガル湾の60平方キロの島で、地域における人類最古の定住層に連なるとされる人々が話す言語。外部の誰も聞いたことも記録したこともない。',
      },
      body: {
        en: `
  <p>About 1,200 km east of mainland India, in the Bay of Bengal, lies a small forested island of roughly 60 square kilometres. It is called <strong>North Sentinel Island</strong>, and somewhere inside it live perhaps fifty to several hundred people — nobody knows the real number — who have rejected every single attempt to talk to them. They are the <strong>Sentinelese</strong>, and theirs is the only human language on Earth that has never been recorded, never been transcribed, and never even been confidently classified.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="11.55" data-lng="92.24" data-zoom="8">🗺️ Fly to North Sentinel Island</button>
  </div>
  
  <p>The Sentinelese are one of the <strong>Andamanese</strong> peoples — believed to descend from one of the earliest <em>Out of Africa</em> human dispersals that may have reached the Andamans tens of thousands of years ago. Genetic evidence places them among the most long-isolated populations on the planet, though the precise duration and continuity of their isolation cannot be stated with certainty. Their neighbours on the wider archipelago — the Great Andamanese, the Onge of Little Andaman, and the Jarawa of South and Middle Andaman — speak languages that fall into <strong>two unrelated families</strong>: Great Andamanese, and the smaller Ongan family (Onge + Jarawa). Sentinelese is suspected to be a third sister, possibly closest to Ongan, but no one has ever heard enough words to confirm it.</p>
  
  <p>Every documented attempt at contact has either failed or ended in violence:</p>
  
  <ul>
    <li><strong>1880</strong>: British colonial officer <strong>Maurice Vidal Portman</strong> landed with a search party, captured an elderly couple and four children, and brought them to Port Blair. The adults died within days, almost certainly of common infections to which Sentinelese have no immunity. The children were returned to the island with gifts. Whatever Portman recorded of their speech survives only as fragments and second-hand notes.</li>
    <li><strong>1974</strong>: A National Geographic film team was driven back by arrows. The director took an 8-foot arrow in his thigh.</li>
    <li><strong>1991</strong>: Indian anthropologist <strong>Madhumala Chattopadhyay</strong> led a series of "gift drops" of coconuts that achieved the only known peaceful contact — Sentinelese wading out to the boats unarmed to collect coconuts. The visits were halted in 1996 over disease-transmission concerns.</li>
    <li><strong>2004 tsunami</strong>: A Coast Guard helicopter flew over the island days after the 2004 Indian Ocean tsunami to check for survivors. It was met with arrows. The islanders had moved to higher ground and were unharmed.</li>
    <li><strong>2006</strong>: Two fishermen who drifted ashore were killed.</li>
    <li><strong>2018</strong>: American missionary <strong>John Allen Chau</strong> was killed attempting to evangelize the Sentinelese, having illegally bribed local fishermen to take him there.</li>
  </ul>
  
  <p>Under the Indian government's <strong>Andaman and Nicobar Islands Protection of Aboriginal Tribes Regulation</strong> (1956, amended several times since), it is illegal for anyone to approach within 5 nautical miles of North Sentinel Island. The Indian Navy patrols a buffer zone. The official policy, in place since the late 1990s and reinforced after Chau's death, is one of <strong>"eyes-on, hands-off"</strong>: monitor the population from a distance, do not contact, do not interfere.</p>
  
  <blockquote>"It is not we who are isolating them. They have decided to be left alone, and we are obliged to respect that." — Madhumala Chattopadhyay, paraphrasing the long-standing policy stance</blockquote>
  
  <p>What little we suspect about Sentinelese linguistic typology comes by analogy: Ongan languages have a small phoneme inventory, possessive prefixes on body-part and kinship terms, and a system of body-part-based deictics (e.g. one suffix for "of the head", another for "of the back"). It is plausible — but unprovable — that Sentinelese works similarly. The Ethnologue, ISO 639-3, and Glottolog list it (code <em>std</em>, languoid <em>sent1241</em>), but every field on the entry that asks for actual data reads "no information available" or "unknown".</p>
  
  <p>It is the rarest of linguistic situations: a living, breathing human language, used every day, that we have agreed as a species not to study. Whether that agreement will survive the 21st century is uncertain. For now, the Sentinelese remain the people who will not be interviewed — and their language, the one tongue on the Wordmap that we listed not because we know it, but because we know we don't.</p>
        `,
        ja: `
  <p>インド本土から東に約1,200km、ベンガル湾の中に、面積60平方キロほどの森林に覆われた小島がある。<strong>北センチネル島</strong>と呼ばれるその島に、おそらく数十人から数百人──正確な数は誰も知らない──の人々が住んでいる。彼らは外部とのあらゆる接触を拒絶してきた。彼らこそ<strong>センチネル族</strong>であり、その言語は地球上で唯一、一度も録音されず、一度も書き取られず、そして系統さえ確定していない人類言語である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="11.55" data-lng="92.24" data-zoom="8">🗺️ 北センチネル島へ飛ぶ</button>
  </div>
  
  <p>センチネル族は、約6万年前に「出アフリカ」の初期の波でアンダマン諸島に到達し、それ以降ほぼ完全な孤立を保ってきた<strong>アンダマン諸族</strong>の一支族である。遺伝学的に見て、地球上で最も古くから連続的に孤立し続けてきた人類集団の一つとされる。同じ諸島の隣人──大アンダマン人、リトル・アンダマンのオンゲ族、南／中アンダマンのジャラワ族──が話す言語は、互いに無関係な<strong>大アンダマン語族</strong>と<strong>オンガン語族</strong>（オンゲ語＋ジャラワ語）の二つに分類される。センチネル語はその第三の姉妹、おそらくオンガン語に最も近い、と推測されているが、語彙を確認するに足る言語データが存在しない以上、誰にも証明できない。</p>
  
  <p>記録に残る接触の試みは、いずれも失敗するか流血で終わった:</p>
  
  <ul>
    <li><strong>1880年</strong>: イギリス植民地官 <strong>モーリス・V・ポートマン</strong>が探検隊で上陸、高齢の夫婦と子供4人を拘束し、ポート・ブレアに連行した。夫婦は免疫のない感染症で数日のうちに死亡、子供たちは贈り物と共に島に返された。ポートマンが記した語彙断片だけが、外部に残る唯一の「センチネル語の痕跡」とされる。</li>
    <li><strong>1974年</strong>: ナショナル・ジオグラフィックの撮影隊が矢で撃退され、ディレクターは大腿に2.4mの矢を受けた。</li>
    <li><strong>1991年</strong>: インドの人類学者<strong>マドゥマラ・チャットパディヤイ</strong>が率いた「ココナッツ贈与計画」が、史上唯一の平和的接触に成功。センチネル族が武器を持たずボートまで歩いて来てココナッツを受け取った。だが感染症リスクから1996年に中止された。</li>
    <li><strong>2004年のスマトラ沖津波</strong>: 沿岸警備隊のヘリが生存確認に飛んだが、矢で迎え撃たれた。住民は高地に避難し無事だった。</li>
    <li><strong>2006年</strong>: 漂着した漁師2人が殺害された。</li>
    <li><strong>2018年</strong>: アメリカ人宣教師<strong>ジョン・アレン・チャウ</strong>が、地元漁師を違法に買収して上陸を試み、殺害された。</li>
  </ul>
  
  <p>インド政府の<strong>アンダマン・ニコバル諸島原住民保護規則</strong>（1956年制定、その後数次改正）により、北センチネル島の5海里以内への接近は違法とされる。インド海軍が緩衝水域を巡視し、1990年代後半以降、チャウ事件後さらに強化された方針は<strong>「見るが触れず」</strong>──遠くから人口を観察するのみで、接触も干渉もしない、というものだ。</p>
  
  <blockquote>「孤立させているのは我々ではない。彼らがそうしてくれと決めたのであり、我々はそれを尊重する義務がある」── マドゥマラ・チャットパディヤイ（長年の方針を要約）</blockquote>
  
  <p>センチネル語の類型について推測できるのは、姉妹言語の類推からだけだ。オンガン語は音素目録が小さく、身体部位や親族名詞に所有接頭辞をつけ、「頭の」「背の」など身体部位に基づく指示体系を持つ。センチネル語も同様の構造を持つ可能性は高いが、検証する手段がない。Ethnologue、ISO 639-3、Glottolog はセンチネル語を「<em>std</em>／sent1241」として登録しているが、実データの欄はすべて「情報なし／不明」である。</p>
  
  <p>これは言語学上もっとも稀な状況──日々現役で話されている生きた人類言語を、我々人類が「研究しない」と合意した、というものだ。21世紀の間その合意が保たれるかどうかは分からない。今のところセンチネル族は「インタビューを受けない人々」であり、その言語は Wordmap 上で唯一、「知っているから載せた」のではなく「知らないと知っているから載せた」言語として存在している。</p>
        `,
      },
      sources: [
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
        en: 'For nearly 1,700 years, Hebrew survived as a liturgical and literary language but no child grew up speaking it. Today it is the mother tongue of nine million people — the largest-scale and most successful revival of a language that had ceased to be a community vernacular.',
        ja: '約1,700年にわたりヘブライ語は典礼・文献の言語として残り続けたが、母語として育つ子供はいなかった。今やそれは900万人の母語となっている──共同体の日常語として途絶えた言語を再び生活語として復活させた、もっとも大規模で成功した事例。',
      },
      body: {
        en: `
  <p>Sometime around the year <strong>200 CE</strong>, the last household in Roman Palestine in which children grew up hearing Hebrew at the dinner table fell silent. Aramaic had already taken over the streets; Greek dominated the cities; the Mishnah was being compiled in a Hebrew that scholars wrote but increasingly did not <em>speak</em>. For the next 1,700 years, Hebrew survived as the language of the synagogue, the prayer book, the Torah scroll, and the letter from one rabbi to another — a written language used by literate adults, but no child's first words. Then, somehow, that changed. Hebrew is now the everyday spoken language of about <strong>nine million people</strong>, around half of them native speakers who learned it as babies. Smaller-scale revivals exist (Cornish, Manx, Wampanoag), but Hebrew remains the largest-scale and most thoroughly documented case of a language that had ceased to be anyone's mother tongue being brought back to daily community use.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="he" data-zoom="7">🌍 Show Hebrew on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="31.78" data-lng="35.22" data-zoom="9">✡️ Fly to Jerusalem</button>
  </div>
  
  <p>The single person most associated with the revival is <strong>Eliezer Ben-Yehuda</strong> (1858–1922), a Lithuanian-born Jewish scholar who emigrated to Ottoman Palestine in 1881 with one obsession: that Jews would only become a nation again if they spoke Hebrew. He made his own household the first laboratory. His son <strong>Itamar Ben-Avi</strong>, born in Jerusalem in 1882, is generally regarded as the <strong>first native speaker of Modern Hebrew in roughly 1,700 years</strong>. Ben-Yehuda forbade any other language in the home; his wife, who didn't speak Hebrew when they married, learned it on the job. Itamar reportedly spoke no language at all until he was around four, and worried family members urged Ben-Yehuda to relent. He didn't.</p>
  
  <p>Ben-Yehuda also waged a vocabulary war. Biblical and Mishnaic Hebrew between them have perhaps 8,000 lemmas — fine for prayer, hopeless for buying a newspaper. So Ben-Yehuda invented words. Some are still everyday Israeli speech:</p>
  
  <ul>
    <li><strong>milon</strong> (מילון) — "dictionary", from <em>milah</em> "word".</li>
    <li><strong>iton</strong> (עיתון) — "newspaper", from <em>et</em> "time".</li>
    <li><strong>ofnayim</strong> (אופניים) — "bicycle", dual form of <em>ofan</em> "wheel".</li>
    <li><strong>glida</strong> (גלידה) — "ice cream", from a root meaning "to freeze".</li>
    <li><strong>chashmal</strong> (חשמל) — "electricity", repurposing a mysterious Biblical word from Ezekiel.</li>
  </ul>
  
  <p>He compiled the gigantic <em>Complete Dictionary of Ancient and Modern Hebrew</em> in 17 volumes (continued and completed after his death by his son and others), and helped found the <strong>Va'ad ha-Lashon ha-Ivrit</strong> (Hebrew Language Committee, 1890), which became today's <strong>Academy of the Hebrew Language</strong> — still the official Israeli body that coins new technical vocabulary (<em>machshev</em> "computer", <em>klikim</em> "clicks", <em>siyumon</em> "app").</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="he">👋 See Hebrew "Hello"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="he">💧 See Hebrew "Water"</button>
  </div>
  
  <p>Modern historians of Hebrew (Ghil'ad Zuckermann, Bernard Spolsky and others) are quick to add nuance. Ben-Yehuda was not alone; he was the loudest voice in a wave of teachers, especially the <strong>Hebrew Teachers Association</strong> from the 1890s onward, who switched their classrooms from Yiddish and Russian to Hebrew, building the first generation of fluent users one schoolroom at a time. Zuckermann has argued that what was actually born is not strictly "revived Hebrew" but a hybrid he calls <em>Israeli</em> — a Semitic surface layer (the morphology, much vocabulary) over a deeply European (especially Yiddish and Slavic) syntactic and phonetic substrate. By that view, native Israeli speakers are heirs both to King David and to the Tsarist-era Vilna yeshiva.</p>
  
  <blockquote>"Even though it is impossible to revive a language one hundred percent, what Hebrew speakers have managed to do is nothing short of miraculous." — Ghil'ad Zuckermann</blockquote>
  
  <p>By 1922, when Ben-Yehuda died, Hebrew was one of the three official languages of British Mandate Palestine. By 1948 it was the principal language of the newly-founded State of Israel. Today it is the school language of millions, the language of Nobel laureates (S. Y. Agnon, 1966), of cinema and high tech, of the supermarket and the playground. The last child to learn Hebrew as a baby before 200 CE and the first child to learn it as a baby in 1882 are separated by about 70 generations of Jewish life in which the language was carried but not cradled — and it is the only language on Earth that has done so and come back.</p>
        `,
        ja: `
  <p>西暦<strong>200年</strong>頃のある時点で、ローマ領パレスチナで子供がヘブライ語を聞きながら育つ家庭はついに途絶えた。街路ではすでにアラム語が、都市ではギリシア語が優勢になり、ミシュナーの編纂者たちは書けるが日常で<em>話さない</em>ヘブライ語で文書を綴っていた。その後の1,700年間、ヘブライ語はシナゴーグの祈り、トーラーの巻物、ラビ同士の書簡──つまり「読み書きできる大人の言語」として生き延びたが、誰一人として赤ん坊として習得することはなかった。それがなぜか、変わった。今やヘブライ語は約<strong>900万人</strong>の日常の話し言葉であり、そのおよそ半数が赤ん坊として習得した母語話者である。人類史上、完全に死んだ言語が日常の母語として蘇った、唯一の確かな事例だ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="he" data-zoom="7">🌍 地図でヘブライ語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="31.78" data-lng="35.22" data-zoom="9">✡️ エルサレムへ飛ぶ</button>
  </div>
  
  <p>復興の象徴的人物は<strong>エリエゼル・ベン＝イェフダー</strong>（1858–1922）。リトアニア生まれのユダヤ人学者で、1881年にオスマン領パレスチナへ移住し、ただ一つの信念に取り憑かれていた──「ユダヤ人が再び一つの民族となるためには、ヘブライ語を話さねばならない」。最初の実験場は自分の家庭だった。1882年エルサレム生まれの息子<strong>イタマル・ベン＝アヴィ</strong>は、約1,700年ぶりに<strong>ヘブライ語を母語として育った最初の人間</strong>と一般にみなされる。父は家庭内の他言語を厳禁し、結婚時にヘブライ語を話せなかった妻も家事のかたわら学ばされた。イタマルは4歳近くまでほとんど発話せず、心配した親族が父に妥協を迫ったが、彼は折れなかった。</p>
  
  <p>ベン＝イェフダーは語彙戦争も戦った。聖書ヘブライ語とミシュナー・ヘブライ語を合わせても語彙は約8,000語、祈りには十分でも、新聞を買うことすらできない。そこで彼は新語を作った。多くは現代イスラエル人の口にいまも残る:</p>
  
  <ul>
    <li><strong>milon</strong>（מילון）「辞書」── <em>milah</em>「言葉」より。</li>
    <li><strong>iton</strong>（עיתון）「新聞」── <em>et</em>「時」より。</li>
    <li><strong>ofnayim</strong>（אופניים）「自転車」── <em>ofan</em>「車輪」の双数形。</li>
    <li><strong>glida</strong>（גלידה）「アイスクリーム」──「凍る」を意味する語根から。</li>
    <li><strong>chashmal</strong>（חשמל）「電気」── エゼキエル書の謎の語を転用。</li>
  </ul>
  
  <p>彼は『古代および現代ヘブライ語完全辞典』全17巻を編み（彼の死後、息子らが完成）、1890年に<strong>ヘブライ語委員会</strong>（Va'ad ha-Lashon）を共同創設した。これが今日の<strong>ヘブライ語アカデミー</strong>に発展し、<em>machshev</em>「コンピュータ」、<em>klikim</em>「クリック」、<em>siyumon</em>「アプリ」といった専門語を今も公式に造語している。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="he">👋 ヘブライ語の「こんにちは」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="he">💧 ヘブライ語の「水」</button>
  </div>
  
  <p>現代の歴史家たち（ギルアド・ツッカーマン、バーナード・スポルスキーら）は補正を加えるのを忘れない。ベン＝イェフダーは独力ではなく、1890年代以降に教室でイディッシュ語やロシア語からヘブライ語へ切り替えた<strong>ヘブライ語教師組合</strong>の波が、第一世代の流暢な話者を学校単位で育てた。さらにツッカーマンは、生まれたのは厳密には「復活ヘブライ語」ではなく、彼が <em>イスラエル語</em> と呼ぶハイブリッド──セム的な表層（形態論・語彙の多く）の下に、深いヨーロッパ的（特にイディッシュ語・スラヴ語）統語と音韻基層を持つ言語──だと主張する。その視点に立てば、現代の母語話者はダビデ王の継承者であると同時に、帝政ロシア期のヴィルナのイェシバの継承者でもある。</p>
  
  <blockquote>「言語を100％蘇生させることは不可能だ。それでもヘブライ語話者が成し遂げたことは、奇跡と呼ぶほかない」── ギルアド・ツッカーマン</blockquote>
  
  <p>1922年のベン＝イェフダー死去時、ヘブライ語はイギリス委任統治領パレスチナの公用語の一つとなっていた。1948年に建国されたイスラエル国家の主言語となり、今日では学校・映画・ハイテク産業・スーパーの売場・公園の遊具で生きている。紀元200年頃に最後の母語話者となった子と、1882年に最初の母語話者となったイタマルの間には、約70世代分の「読み書きはするが揺りかごでは語られない」時間が横たわる──そして地球上でただひとつ、その時間を渡って戻ってきた言語が、ヘブライ語である。</p>
        `,
      },
      sources: [
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
        en: 'Pāṇini — the Sanskrit grammarian who anticipated computer science by 2,400 years',
        ja: '計算機科学を2,400年先取りしたサンスクリット文法家、パーニニ',
      },
      summary: {
        en: 'Around 500 BCE, an Indian scholar wrote a 4,000-rule formal grammar of Sanskrit so rigorous that 20th-century linguists called it "the most complete description of any language until modern times" — and a direct ancestor of how compilers parse code today.',
        ja: '紀元前500年頃、インドの一学者が4,000規則からなるサンスクリットの形式文法を著した。20世紀の言語学者が「近代以前に人類が書いた最も完璧な言語記述」と呼び、現代のコンパイラ理論の直接の祖先となった書である。',
      },
      body: {
        en: `
  <p>If you had to pick a single book to send back in a time machine to confound a 20th-century computer scientist, it would be hard to do better than the <strong>Aṣṭādhyāyī</strong> — the "Eight Chapters" of <strong>Pāṇini</strong>. Composed in what is now northwestern Pakistan around <strong>500–400 BCE</strong>, the Aṣṭādhyāyī is a complete generative description of Sanskrit in just under <strong>4,000 sūtras</strong> (terse aphoristic rules), packed so densely that the entire grammar fits in roughly 35 modern printed pages. Modern linguists, from Leonard Bloomfield to Paul Kiparsky and Noam Chomsky, have all called it the most sophisticated formal grammar of any language ever produced before the 20th century.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="sa" data-zoom="7">🌍 Show Sanskrit on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="34.0" data-lng="72.0" data-zoom="6">🕉️ Fly to Pāṇini's Gandhāra</button>
  </div>
  
  <p>We know almost nothing about Pāṇini the person — only that he was from the village of Śalātura (modern Lahor / Lahur, sometimes called "Little Lahore", near Attock in northwestern Pakistan — not to be confused with the major Punjabi city of Lahore), probably worked in the 5th or 4th century BCE, and that everything he produced was apparently designed to be <strong>memorized aloud</strong>. The Aṣṭādhyāyī was preserved by recitation for centuries before being written down. To save syllables — and therefore breath — Pāṇini invented an entire <strong>technical metalanguage</strong>: a system of single-letter abbreviations, ordered phoneme lists called the <strong>Śiva sūtras</strong>, conventions for "context-sensitive" rule application, anuvṛtti (rule inheritance from a previous line that need not be re-stated), and a precedence system for resolving which rule applies when two rules conflict.</p>
  
  <p>The result reads, to a modern eye, uncannily like the production rules of a context-free grammar — only more powerful. Pāṇini's rule format is essentially:</p>
  
  <blockquote><em>A → B / X _ Y</em><br>"A becomes B in the context where it is preceded by X and followed by Y" — a notation that linguistics independently rediscovered in 1968.</blockquote>
  
  <p>Examples of what Pāṇini's machinery does:</p>
  
  <ul>
    <li><strong>Sandhi.</strong> Sanskrit is famous for assimilating sounds across word boundaries (<em>tat + ca → tac ca</em>, <em>tat + na → tan na</em>). Pāṇini reduces this entire system to a small ordered set of phonological rules that operate cyclically — the same idea reinvented as <em>cyclic phonology</em> in the 1970s.</li>
    <li><strong>Verbal morphology.</strong> A Sanskrit verb can have around <em>2,000 inflected forms</em>. Pāṇini handles this with a finite stem inventory, a few hundred affix rules, and an ordering principle (the <em>tripādī</em>) such that later rules block earlier ones — anticipating Elsewhere Conditions in modern morphology.</li>
    <li><strong>Kāraka theory.</strong> Pāṇini analyses verbs not in terms of "subject" and "object" but in terms of <em>kārakas</em> — semantic roles like agent (<em>kartṛ</em>), patient (<em>karman</em>), instrument (<em>karaṇa</em>), recipient (<em>sampradāna</em>), source (<em>apādāna</em>), and locus (<em>adhikaraṇa</em>). This is essentially <strong>thematic role theory</strong> (Charles Fillmore's "case grammar", 1968), 2,400 years early.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="sa">👩 See Sanskrit "Mother"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="fire" data-code="sa">🔥 See Sanskrit "Fire"</button>
  </div>
  
  <p>Pāṇini's influence is direct, and not just metaphorical. <strong>Leonard Bloomfield</strong> (1887–1949), one of the founders of American structural linguistics, wrote his 1929 essay "On Some Rules of Pāṇini" in part to import Pāṇinian rule-ordering into Western grammatical theory. The Dutch logician <strong>Frits Staal</strong> argued in <em>The Science of Language</em> (1965) that Pāṇini's metalanguage anticipates the Backus-Naur form used to define programming languages. The Indian-American computer scientist <strong>Rick Briggs</strong>, working at NASA Ames in the 1980s, proposed Sanskrit-style kāraka representations as a natural intermediate language for AI knowledge representation. And in his 1965 <em>Aspects of the Theory of Syntax</em>, <strong>Noam Chomsky</strong> credited Pāṇini and his commentators as the first generative grammarians in history.</p>
  
  <blockquote>"The descriptive grammar of Sanskrit which Pāṇini brought to its perfection is one of the greatest monuments of human intelligence." — Leonard Bloomfield, <em>Language</em> (1933)</blockquote>
  
  <p>Sanskrit itself (<em>saṃskṛta-</em>, "polished, refined") was already a literary and ritual standard, not a vernacular, by Pāṇini's day. After him it became, formally, what Pāṇini said it was: a language whose every well-formed sentence is, in principle, derivable from his 4,000 sūtras. Two and a half thousand years later, that is also exactly what we ask of a parser. The Aṣṭādhyāyī did not just describe Sanskrit. It pushed the idea of generative, formal description of language to a degree of precision unmatched in antiquity — and arguably until 20th-century formal linguistics rediscovered the same ideas independently.</p>
        `,
        ja: `
  <p>20世紀の計算機科学者をタイムマシンで困惑させる一冊を選ぶとしたら、<strong>パーニニ</strong>の『<strong>アシュターディヤーイー</strong>』（八章篇）以上の候補を挙げるのは難しい。紀元前500〜400年頃、現在のパキスタン北西部で書かれたこの書は、わずか<strong>約4,000のスートラ</strong>（極度に圧縮された規則）で、サンスクリット語の生成的記述を完全に与える。全文が現代の活字でわずか35ページほどに収まるほど密度が高い。レナード・ブルームフィールドからポール・キパルスキー、ノーム・チョムスキーに至るまで、近現代の言語学者がこぞって「20世紀以前に書かれた、最も完成度の高い言語の形式記述」と呼ぶ書物である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="sa" data-zoom="7">🌍 地図でサンスクリットを見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="34.0" data-lng="72.0" data-zoom="6">🕉️ パーニニのガンダーラへ飛ぶ</button>
  </div>
  
  <p>パーニニ個人については、シャラートゥラ村（現パキスタン北西部、アトック近郊の Lahor／Lahur、いわゆる Little Lahore。パンジャーブ州の大都市 Lahore とは別の小村）出身、紀元前5〜4世紀活動という以外ほとんど何も分かっていない。確実に言えるのは、彼の書が<strong>暗唱前提</strong>で設計されていたことだ。アシュターディヤーイーは記述後も何世紀ものあいだ口承で伝えられた。音節を──つまり呼吸を──節約するためにパーニニは、<strong>独自の専門メタ言語</strong>を発明した。一文字省略、シヴァ・スートラと呼ばれる音素整列表、文脈依存規則の表記法、前行の規則条件を継承する <em>anuvṛtti</em>、規則衝突を解消する優先度システム──現代の文脈自由文法の生成規則と驚くほど似た形式である。</p>
  
  <p>パーニニの規則は、近代言語学が1968年に独立に「再発見」した記法と本質的に等価だ:</p>
  
  <blockquote><em>A → B / X _ Y</em><br>「A は、X の後・Y の前という文脈で B になる」</blockquote>
  
  <p>パーニニの装置が扱う問題の例:</p>
  
  <ul>
    <li><strong>サンディ。</strong> サンスクリットは語境界で音が同化する（<em>tat + ca → tac ca</em>、<em>tat + na → tan na</em>）。パーニニはこの全体系を、循環的に適用される少数の音韻規則に還元する──1970年代に「循環音韻論」として再発見される考え方の先取り。</li>
    <li><strong>動詞形態論。</strong> サンスクリットの動詞は約2,000形に屈折する。パーニニは有限の語幹目録、数百の接辞規則、後の規則が先の規則を阻止する <em>tripādī</em> 順序原理でこれを処理する──現代形態論の「他則条件」の先取り。</li>
    <li><strong>カーラカ理論。</strong> パーニニは動詞を「主語・目的語」ではなく <em>kāraka</em>──動作主 <em>kartṛ</em>、被動者 <em>karman</em>、道具 <em>karaṇa</em>、与格 <em>sampradāna</em>、起点 <em>apādāna</em>、場所 <em>adhikaraṇa</em>──の意味役割で分析する。これは事実上、チャールズ・フィルモアの「格文法」（1968年）の<strong>意味役割理論</strong>を2,400年先取りしている。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="sa">👩 サンスクリット語の「母」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="fire" data-code="sa">🔥 サンスクリット語の「火」</button>
  </div>
  
  <p>パーニニの影響は比喩ではなく直接的である。アメリカ構造主義言語学の創始者の一人<strong>レナード・ブルームフィールド</strong>（1887–1949）は1929年の論文「パーニニのいくつかの規則について」で、パーニニ的な規則順序を西洋言語理論に持ち込んだ。オランダの論理学者<strong>フリッツ・スタール</strong>は1965年の『言語の科学』で、パーニニのメタ言語がプログラミング言語の定義に使われる<strong>バッカス＝ナウア記法</strong>を先取りしていると論じた。NASA エイムズ研究所の<strong>リック・ブリッグス</strong>は1980年代、サンスクリット風カーラカ表現を人工知能の知識表現の中間言語として提案した。そして<strong>ノーム・チョムスキー</strong>は1965年の『統辞理論の諸相』で、パーニニとその注釈者たちを「人類最初の生成文法家」と明記した。</p>
  
  <blockquote>「パーニニが完成させたサンスクリットの記述文法は、人類知性の最大の記念碑の一つである」── レナード・ブルームフィールド『言語』（1933年）</blockquote>
  
  <p>サンスクリット（<em>saṃskṛta-</em>「磨き上げられた、洗練された」）は、パーニニの時代にはすでに日常語ではなく、文学・祭祀の威信標準だった。だが彼以後、サンスクリットは形式的に「パーニニが書いた通りの言語」となった──正しい全文がパーニニの4,000スートラから原理的に導出可能な言語、である。これは2500年後、現代のパーサに対して我々が要求するのとまったく同じ性質だ。アシュターディヤーイーはサンスクリットを記述したのではない。それは「言語というものは記述しうる」というアイデアそのものを、人類史で初めて発明した書物なのである。</p>
        `,
      },
      sources: [
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
        en: 'Esperanto — the conlang that actually worked',
        ja: 'エスペラント──本当に話されるようになった人工言語',
      },
      summary: {
        en: 'A Polish-Jewish ophthalmologist published a 40-page booklet in 1887. Today his language has up to two million speakers, around a thousand of them native — the only constructed language to truly take root.',
        ja: '1887年、ポーランドのユダヤ系眼科医が出した40ページの小冊子から始まった人工言語。話者は最大で200万人、母語話者（denaskuloj）も約1000人を数える、世界で唯一「定着した」人工言語だ。',
      },
      body: {
        en: `
  <p>In July 1887, a young eye doctor in Warsaw published a slim booklet at his own expense under the pseudonym <em>Doktoro Esperanto</em> — "Doctor One-Who-Hopes". The book was titled <strong>Lingvo Internacia</strong> ("International Language"). Within a generation, the pseudonym had become the name of the language itself, and <strong>L. L. Zamenhof</strong> had achieved something no constructed-language designer had managed before or has matched since: he had built a language that ordinary people actually wanted to speak.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="eo" data-zoom="4">🌍 Show Esperanto on map</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="eo">👋 See Esperanto "Hello"</button>
  </div>
  
  <p>Zamenhof grew up in Białystok, a multi-ethnic town under Russian rule where Jews, Poles, Germans, Russians and Belarusians lived side by side and frequently in mutual distrust. He later wrote that as a boy he had concluded the linguistic Babel was the root cause of human hatred, and that a neutral common tongue might give people a shared, equal footing. The political project was as important to him as the grammatical one.</p>
  
  <p>The design is famously simple. Esperanto's grammar fits on a postcard — the "<strong>Fundamento</strong>" reduces it to <strong>16 rules with no exceptions</strong>:</p>
  
  <ul>
    <li>All nouns end in <strong>-o</strong>, adjectives in <strong>-a</strong>, adverbs in <strong>-e</strong>, infinitives in <strong>-i</strong>.</li>
    <li>Plural is always <strong>-j</strong>; the direct object always takes <strong>-n</strong>.</li>
    <li>Stress always falls on the penultimate syllable.</li>
    <li>Verbs do not conjugate for person or number — only for tense (<em>-as, -is, -os</em>) and mood (<em>-us, -u</em>).</li>
    <li>Words are built agglutinatively from roots plus a small inventory of affixes: <em>mal-</em> reverses meaning (<em>bona</em> good → <em>malbona</em> bad), <em>-ej-</em> marks a place (<em>lerni</em> learn → <em>lernejo</em> school), <em>-in-</em> marks female.</li>
  </ul>
  
  <p>The vocabulary is mostly Romance with a Germanic and Slavic seasoning — roughly 75% Romance, 20% Germanic, 5% Slavic and Greek. This is a deliberate compromise: European but not nationally aligned with any single major power.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="love" data-code="eo">❤️ "Love" — <em>amo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="eo">💧 "Water" — <em>akvo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="eo">1️⃣ "One" — <em>unu</em></button>
  </div>
  
  <p>By 1905 the first <strong>World Esperanto Congress</strong> met in Boulogne-sur-Mer; 688 delegates from 20 countries discovered they could understand each other immediately. By the 1920s the League of Nations seriously debated adopting Esperanto as a working language — vetoed by France, which feared losing the prestige of French diplomacy. The Vatican broadcasts in Esperanto. Google Translate added it in 2012.</p>
  
  <blockquote>"Mi ne scias kio estas la lingvo, sed mi scias ke ĝi devas esti facila, neŭtrala kaj viva." ("I don't know what the language will be, but I know it must be easy, neutral and alive.") — attributed to Zamenhof, in a letter to Nikolai Borovko, 1895</blockquote>
  
  <p>Twentieth-century history was cruel to Esperantists. Hitler condemned the language in <em>Mein Kampf</em> as a Jewish conspiracy; Zamenhof's three children were murdered in the Holocaust. Stalin imprisoned and executed Soviet Esperantists in the 1937–38 purges as "cosmopolitan spies". The movement survived both.</p>
  
  <p>Today Esperanto has perhaps <strong>two million speakers</strong> at varying levels, and around <strong>a thousand native speakers</strong> known as <em>denaskuloj</em>, raised in bilingual households where Esperanto is one of the home languages. Duolingo's Esperanto course alone has enrolled over a million learners. By any measure — sustained community, breadth of literature, native-speaker population — Esperanto is by far the most successful constructed language ever attempted.</p>
  
  <p>Zamenhof never claimed Esperanto would replace anyone's mother tongue. He wanted a <em>dua lingvo</em> — a second language — equally foreign to everyone, so that no native speaker would ever have the upper hand at the negotiating table. A century and a half later, the project is small, but it is still alive, still neutral, and still hopeful — exactly as its founder, <em>Doktoro Esperanto</em>, signed his name.</p>
        `,
        ja: `
  <p>1887年7月、ワルシャワに住む若い眼科医が、自費で40ページの小冊子を出した。ペンネームは<em>Doktoro Esperanto</em>──「希望する者という名の博士」。書名は<strong>Lingvo Internacia</strong>（国際語）。やがてこのペンネームは言語そのものの名となり、<strong>L・L・ザメンホフ</strong>は、それまで誰も成し遂げられず今も誰も並ぶことのない偉業を達成した。普通の人々が「実際に話したい」と思う人工言語を作り上げたのだ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="eo" data-zoom="4">🌍 地図でエスペラントを見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="eo">👋 エスペラント語の「こんにちは」</button>
  </div>
  
  <p>ザメンホフが育ったビャウィストクは、ロシア統治下の多民族都市で、ユダヤ人・ポーランド人・ドイツ人・ロシア人・ベラルーシ人が隣り合い、互いに不信を抱きながら暮らしていた。彼は後に「人類の憎悪の根は言語の混乱（バベル）にある」と確信し、中立の共通語があれば人々は対等な立場に立てるのではないか、と書いている。彼にとって文法設計は、政治的理想と切り離せない営みだった。</p>
  
  <p>設計はきわめてシンプルだ。エスペラントの文法は<strong>16条の例外なき規則</strong>に収まり、葉書一枚に収まると言われる。</p>
  
  <ul>
    <li>名詞は必ず<strong>-o</strong>、形容詞は<strong>-a</strong>、副詞は<strong>-e</strong>、不定詞は<strong>-i</strong>で終わる。</li>
    <li>複数は常に<strong>-j</strong>、直接目的語は常に<strong>-n</strong>を取る。</li>
    <li>アクセントは必ず後ろから2音節目。</li>
    <li>動詞は人称・数によらず、時制（<em>-as / -is / -os</em>）と法（<em>-us / -u</em>）だけで変化する。</li>
    <li>語は語根＋接辞の膠着で作る。<em>mal-</em>は反意（bona「良い」→malbona「悪い」）、<em>-ej-</em>は場所（lerni「学ぶ」→lernejo「学校」）、<em>-in-</em>は女性を表す。</li>
  </ul>
  
  <p>語彙は約75%がロマンス系、20%がゲルマン系、残りがスラブ語とギリシャ語。これは「ヨーロッパ系だが、特定の大国に偏らない」意図的な配合だ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="love" data-code="eo">❤️ 「愛」は<em>amo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="eo">💧 「水」は<em>akvo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="eo">1️⃣ 「1」は<em>unu</em></button>
  </div>
  
  <p>1905年、フランスのブローニュ＝シュル＝メールで第1回<strong>世界エスペラント大会</strong>が開かれ、20カ国から集まった688人の代表は初対面で互いに理解しあった。1920年代には国際連盟が公用語化を真剣に議論し、フランスの拒否権で否決された。ローマ教皇庁はエスペラントで放送し、Google翻訳は2012年に対応言語に加えた。</p>
  
  <blockquote>「どんな言語になるかはわからない。だがそれは、易しく、中立で、生きている言語でなくてはならない」──ザメンホフがニコライ・ボロフコに宛てた1895年の手紙より（伝）</blockquote>
  
  <p>20世紀の歴史はエスペランチストに過酷だった。ヒトラーは『我が闘争』でエスペラントを「ユダヤの陰謀」と非難し、ザメンホフの3人の子はホロコーストで殺された。スターリンは1937〜38年の大粛清でソ連のエスペランチストを「コスモポリタンのスパイ」として銃殺・収監した。それでも運動は生き延びた。</p>
  
  <p>現在、エスペラント話者は推計<strong>約200万人</strong>、そして人工言語としては唯一<strong>約1000人の母語話者</strong>──<em>denaskuloj</em>と呼ばれる、家庭でエスペラントを母語のひとつとして育った人々──を持つ。Duolingoのコースだけで100万人以上が学習している。世代を超えて伝承された人工言語は、エスペラント以外に存在しない。</p>
  
  <p>ザメンホフは「母語を置き換える」とは決して言わなかった。彼が望んだのは<em>dua lingvo</em>──第二言語──であり、誰にとっても等しく「外国語」であることで、交渉の場で誰も母語話者特権を持たないようにする、という発想だった。140年経った今も、運動は小さいが、中立で、希望に満ちている。発音どおりに署名すれば、いまも<em>Doktoro Esperanto</em>──「希望する者」のままだ。</p>
        `,
      },
      sources: [
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
        en: 'A Canadian linguist designed a language with only ~120 words and ~14 sounds, partly as a Taoist thought experiment. Two decades later, thousands of people speak it — and many say it changed how they think.',
        ja: 'カナダの言語学者が、約120語・約14音という極小の語彙体系を、道家思想の実験として設計した。20年後、世界中で数千人が話し、「世界の見え方が変わった」と語っている。',
      },
      body: {
        en: `
  <p>In 2001, a Canadian linguist and translator named <strong>Sonja Lang</strong> (born Sonja Elen Kisa) was struggling with depression. As part of her recovery she began experimenting with a deliberately minimal language — one that would force her to express ideas using only what was truly essential. She called it <strong>Toki Pona</strong>, "the language of good", or more literally "good speech / simple speech".</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="tok" data-zoom="4">🌍 Show Toki Pona on map</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="tok">👋 "Hello" — <em>toki!</em></button>
  </div>
  
  <p>The first sketches appeared online in 2001. The canonical reference, <em>Toki Pona: The Language of Good</em>, finally appeared in 2014. Between those dates the language quietly grew a community without any institutional backing, advertising or commercial product. The 2014 book lists <strong>120 core words</strong> (a later 2021 dictionary, <em>ku</em>, added a small extended set); most fluent speakers consider the count to be around <strong>123 essential words</strong>.</p>
  
  <p>The phonology is just as minimal:</p>
  
  <ul>
    <li><strong>9 consonants</strong>: <em>p, t, k, s, m, n, l, j, w</em>.</li>
    <li><strong>5 vowels</strong>: <em>a, e, i, o, u</em>.</li>
    <li>Syllables are (C)V(n). No consonant clusters, no tones, no length contrasts.</li>
    <li>Stress is always on the first syllable.</li>
  </ul>
  
  <p>That gives only about <strong>14 phonemes</strong> in total — far fewer than English's ~44 — and a sound inventory so widespread cross-linguistically that almost any human can pronounce Toki Pona on first hearing.</p>
  
  <p>So how do you say anything with 120 words? <strong>Composition.</strong> Toki Pona has no word for "friend", "computer" or "library". Instead you describe:</p>
  
  <ul>
    <li><em>jan pona</em> — "good person" → friend</li>
    <li><em>ilo sona</em> — "knowledge tool" → computer</li>
    <li><em>tomo pi lipu mute</em> — "house of many documents" → library</li>
    <li><em>telo nasa</em> — "weird water" → alcohol</li>
    <li><em>kala lawa</em> — "head fish" → boss-fish, i.e. shark, or metaphorically your boss</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="tok">💧 "Water" — <em>telo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="tok">☀️ "Sun" — <em>suno</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="love" data-code="tok">❤️ "Love" — <em>olin</em></button>
  </div>
  
  <p>The same expression can mean different things in different contexts. <em>jan pona</em> is "friend", but in a courtroom it might mean "a good citizen"; <em>kili</em> covers any fruit or vegetable. Lang's design philosophy, influenced by Taoism, the simplicity-cult of GTD (Getting Things Done), and the Sapir–Whorf hypothesis, was that <strong>forcing simplicity in expression forces simplicity in thought</strong>:</p>
  
  <blockquote>"Toki Pona is the language of good. It is the simple way of life." — Sonja Lang, Toki Pona: The Language of Good (2014)</blockquote>
  
  <p>Critics call it impractical: you cannot do tax law in Toki Pona, and even basic arithmetic is awkward (the language famously had no native words for numbers above two; later the system <em>wan, tu, luka, mute, ale</em> gave 1, 2, 5, 20, 100/many, in a tally-stick style).</p>
  
  <p>Yet the community keeps growing. Today there are estimated to be <strong>several thousand active speakers</strong>, a dedicated subreddit, a <em>ma pona pi toki pona</em> Discord with tens of thousands of members, original poetry, music albums, and even a constructed script — <em>sitelen pona</em> — where each glyph is a tiny pictogram of one core word. Whether Toki Pona makes you wiser is debatable; that it makes its speakers <em>think harder about what they actually mean</em> is not.</p>
        `,
        ja: `
  <p>2001年、カナダの言語学者・翻訳家<strong>ソーニャ・ラング</strong>（Sonja Elen Kisa）は鬱に苦しんでいた。回復の過程で、彼女は「本当に必要なものだけで表現を強いる」極小設計の言語を考案しはじめる。それが<strong>トキポナ（toki pona）</strong>──「良い言葉／単純な言葉」だった。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="tok" data-zoom="4">🌍 地図でトキポナを見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="tok">👋 「こんにちは」──<em>toki!</em></button>
  </div>
  
  <p>最初のスケッチが2001年にネット上で公開され、決定版の参考書『Toki Pona: The Language of Good』は2014年に出版された。その間、トキポナは広告も商品も組織もなしに、静かに世界中へ広まった。2014年版で公式語彙は<strong>120語</strong>、2021年の補遺辞典『ku』を含めても<strong>約123語</strong>が中核だ。</p>
  
  <p>音韻も同じく極小である。</p>
  
  <ul>
    <li><strong>子音9個</strong>：<em>p, t, k, s, m, n, l, j, w</em></li>
    <li><strong>母音5個</strong>：<em>a, e, i, o, u</em></li>
    <li>音節は (C)V(n)。子音連続も声調も長短対立もない。</li>
    <li>強勢は常に第一音節。</li>
  </ul>
  
  <p>合計<strong>14音素</strong>程度──英語の約44音素に比べて圧倒的に少なく、世界中ほとんどの言語の話者が初見で発音できる。</p>
  
  <p>では120語で何でも言えるのか。答えは<strong>合成</strong>だ。トキポナには「友人」「コンピュータ」「図書館」という語がない。記述で表す。</p>
  
  <ul>
    <li><em>jan pona</em>「良い人」→ 友人</li>
    <li><em>ilo sona</em>「知識の道具」→ コンピュータ</li>
    <li><em>tomo pi lipu mute</em>「多くの紙の家」→ 図書館</li>
    <li><em>telo nasa</em>「変な水」→ 酒</li>
    <li><em>kala lawa</em>「頭の魚」→ サメ／（比喩で）上司</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="tok">💧 「水」は<em>telo</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="tok">☀️ 「太陽」は<em>suno</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="love" data-code="tok">❤️ 「愛」は<em>olin</em></button>
  </div>
  
  <p>同じ表現が文脈で別の意味になる。<em>jan pona</em>は「友達」だが、法廷では「善き市民」になりうる。<em>kili</em>はあらゆる果物・野菜の総称だ。ラングが影響を受けたのは道家思想、GTD（Getting Things Done）の簡素化哲学、そしてサピア＝ウォーフ仮説で、<strong>表現の単純化は思考の単純化を強いる</strong>という直観に基づく。</p>
  
  <blockquote>「トキポナは『良きこと』の言葉。シンプルに生きる方法である」──ソーニャ・ラング『Toki Pona: The Language of Good』（2014）</blockquote>
  
  <p>批判もある。トキポナで税法を扱うのは不可能だし、初期は2以上の数を表す語がなかった（後に<em>wan, tu, luka, mute, ale</em>＝1, 2, 5, 20, 100／多、というタリー的体系が広まった）。それでもコミュニティは成長を続け、現在<strong>アクティブ話者は数千人</strong>規模、Discordサーバー <em>ma pona pi toki pona</em>には数万人が参加し、詩・音楽・独自表意文字<em>sitelen pona</em>（一語一絵文字）まで生まれている。トキポナで賢くなれるかは議論があるが、「自分が本当に何を言いたいのか」を考え直させる力があることだけは、誰も否定しない。</p>
        `,
      },
      sources: [
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
        en: 'John Quijada spent four decades designing a language meant to express maximum precision in minimum space. The result has around 92 phonemes, dozens of cases, and a sentence so dense one word can translate as a paragraph.',
        ja: 'ジョン・キハダが40年かけて設計した「精密さの極限」言語。音素は約92、格は数十、たった一語が英文の段落に相当することもある。本人ですら流暢には話せない。',
      },
      body: {
        en: `
  <p>Most constructed languages aim to be <em>easy</em>. <strong>Ithkuil</strong> is the opposite: it is an <em>engineered language</em> (an "engelang") whose explicit goal is to express, in the fewest possible morphemes, the maximum possible amount of cognitive information — to be, as its creator puts it, "an idealized linguistic engineering experiment".</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="40" data-lng="0" data-zoom="3">🗺️ Fly to Ithkuil's home (nowhere)</button>
  </div>
  
  <p>The creator is <strong>John Quijada</strong>, an American linguist and former DMV employee in California, who began sketching what would become Ithkuil — originally <em>Tikəlh Khəi</em>, "TKE" — in 1978. He published the first complete version in 2004 on his personal site, then a revised <strong>TNIL</strong> (Ithkuil III / "Ithkuil 2011") in 2011, and continued refining it through 2020. He has never claimed Ithkuil should be a community language. He calls it a thought experiment.</p>
  
  <p>Some of the design parameters are vertigo-inducing:</p>
  
  <ul>
    <li>The 2004 phonology used up to <strong>92 phonemes</strong>, including ejectives, uvulars, pharyngeals, tone, and length contrasts. The 2011 revision trimmed it but is still well above any natural language.</li>
    <li>Nouns inflect for around <strong>96 cases</strong> in some counts (versus Hungarian's 18 or Finnish's 15).</li>
    <li>Every word encodes simultaneously: <em>configuration</em>, <em>affiliation</em>, <em>perspective</em>, <em>essence</em>, <em>extension</em>, <em>context</em> and several other categories that have no real equivalent in English.</li>
    <li>Verbs carry obligatory marking for <em>validation</em> — how the speaker knows the information (direct observation, inference, hearsay, intuition, etc.) — in a system far more elaborate than any natural evidentiality system.</li>
  </ul>
  
  <p>A famous example sentence from Quijada's grammar:</p>
  
  <blockquote><em>Tram-mļöi hhâsmařpţuktôx.</em><br>"On the contrary, I think it may turn out that this rugged mountain range trails off at some point."</blockquote>
  
  <p>Two words. A full English sentence. That density is the entire point.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="34" data-lng="-118" data-zoom="4">🗺️ Fly to California (Quijada's home)</button>
  </div>
  
  <p>Ithkuil shot to wider fame in <strong>December 2012</strong>, when Joshua Foer published a feature in <em>The New Yorker</em> titled "Utopian for Beginners". Foer reported that a Russian fan community had organized symposia, that students were having tattoos done in the constructed script, and that two Kalmyk linguists had even tried to make Ithkuil an official curriculum subject in the Republic of Kalmykia (the project foundered).</p>
  
  <p>Quijada himself has admitted that <strong>he cannot speak Ithkuil fluently</strong>. Generating a single sentence in real time requires consciously choosing among dozens of grammatical categories before opening one's mouth. He has said in interviews that even after thirty years he sometimes needs minutes to compose a single sentence in his own language.</p>
  
  <p>Is Ithkuil a failure? Only if you measure conlangs by community size. As a piece of <em>linguistic architecture</em> — a sustained, decades-long demonstration of how much meaning the human articulatory tract can be made to carry per second of speech — it has no peer. It is to Esperanto what a Saturn V rocket is to a bicycle: nobody commutes on it, but it shows what is physically possible.</p>
        `,
        ja: `
  <p>たいていの人工言語は「学びやすさ」を目指す。<strong>イスクイル（Ithkuil）</strong>はその真逆だ。これは<em>工学言語</em>（engelang）と呼ばれる種類で、設計目的が明示的に「最小の形態素で最大の認知情報を運ぶこと」、すなわち作者の言葉でいう「理想化された言語工学の実験」である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="40" data-lng="0" data-zoom="3">🗺️ イスクイルの「故郷」（どこにもない）へ飛ぶ</button>
  </div>
  
  <p>作者は<strong>ジョン・キハダ</strong>（John Quijada）。カリフォルニア州車両管理局の元職員で、アメリカの独学言語学者だ。彼は1978年に原型<em>Tikəlh Khəi</em>（TKE）を構想しはじめ、2004年に最初の完成版を個人サイトで公開、2011年に大改訂版<strong>TNIL</strong>を出し、2020年まで改訂を続けた。彼自身は「コミュニティ言語にするつもりはない」と明言している。あくまで思考実験だ。</p>
  
  <p>設計指標はめまいがするほど過剰だ。</p>
  
  <ul>
    <li>2004年版の音素は最大で<strong>92個</strong>。放出音、口蓋垂音、咽頭音、声調、長短対立まで含む。2011年版で削減されたがそれでも自然言語を凌駕する。</li>
    <li>名詞の格は数え方によって<strong>約96格</strong>（ハンガリー語18、フィンランド語15と比較されたい）。</li>
    <li>全語が同時に<em>configuration（構成）</em>、<em>affiliation（提携）</em>、<em>perspective（視座）</em>、<em>essence（本質）</em>、<em>extension（拡張）</em>、<em>context（文脈）</em>などを符号化する。英語に対応概念のないカテゴリーが多い。</li>
    <li>動詞には<em>validation（情報源タイプ）</em>──直接観察か、推論か、伝聞か、直観か──を表す義務的標識がある。自然言語の証拠性体系より精密だ。</li>
  </ul>
  
  <p>有名な例文を引こう。</p>
  
  <blockquote><em>Tram-mļöi hhâsmařpţuktôx.</em><br>「だが私としては、この険しい山脈は、どこかの時点でなだらかに消えていくのかもしれない、と思う。」</blockquote>
  
  <p>2語で英文一文。これがイスクイルの本領だ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="34" data-lng="-118" data-zoom="4">🗺️ キハダの拠点カリフォルニアへ</button>
  </div>
  
  <p>2012年12月、ジョシュア・フォアが<em>『ザ・ニューヨーカー』</em>に「Utopian for Beginners（初心者のためのユートピア）」と題する長編記事を発表し、イスクイルは一気に世間に知られた。記事ではロシアにファンサークルがあり、シンポジウムが開かれ、構成文字でタトゥーを彫る学生もいると報じられた。さらにカルムイク共和国の言語学者がイスクイルを公式カリキュラム科目にしようとした、という顛末まで紹介されている（計画は頓挫した）。</p>
  
  <p>キハダは<strong>自分でもイスクイルを流暢には話せない</strong>と認めている。一文を即興で発するためには、口を開く前に数十の文法カテゴリーから意識的に選択を行わねばならない。30年経った今でも、自分の作った言語で一文を組み立てるのに数分かかることがあると、彼はインタビューで語っている。</p>
  
  <p>イスクイルは失敗作だろうか。コミュニティ規模で測ればそうかもしれない。だが、人間の発声器官が1秒あたりに運べる意味量の限界はどこか──それを40年かけて探究した<em>言語建築</em>として、肩を並べる存在はない。エスペラントが自転車なら、イスクイルはサターンV型ロケットだ。誰も通勤には使わない。だが、何が物理的に可能かを示すものとして、これは紛れもなく偉業である。</p>
        `,
      },
      sources: [
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
        en: 'Hangul — the alphabet a king designed in a laboratory',
        ja: 'ハングル──王が「実験室」で設計した文字',
      },
      summary: {
        en: 'In 1443 King Sejong the Great unveiled a new Korean alphabet whose letter shapes literally diagram the vocal tract. Linguists call it the most scientifically designed writing system on Earth — and it was almost banned twice.',
        ja: '1443年、朝鮮王朝の世宗大王が発表した新しい朝鮮文字。子音字は発音器官の形を、母音字は天・地・人を模した、世界でもっとも科学的に設計された文字体系。だが、二度も廃止されかけた。',
      },
      body: {
        en: `
  <p>Most alphabets evolved. They drift over centuries from pictographs to abstractions, no one quite remembers why a "B" looks the way it does. <strong>Hangul</strong> is not like that. Hangul has a birthday — <strong>9 October 1446</strong>, the date its accompanying explanation, the <em>Hunminjeongeum Haerye</em>, was published. And it has a single, named inventor: <strong>King Sejong the Great</strong> (世宗大王, r. 1418–1450) of Joseon Korea, working with the scholars of his Hall of Worthies (集賢殿, <em>Jiphyeonjeon</em>).</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ko" data-zoom="6">🌍 Show Korean on map</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="ko">👋 "Hello" — <em>안녕하세요</em></button>
  </div>
  
  <p>Sejong's motivation, set out in the project's preface, is one of the most touching openings in any writing-system history:</p>
  
  <blockquote>"The speech of our country is different from that of China and does not match the Chinese characters. Therefore, even if the ignorant want to communicate, many of them cannot express themselves. Thinking of this with pity, I have newly designed twenty-eight letters, wishing only that everyone may easily learn them and use them in their daily life." — King Sejong, <em>Hunminjeongeum</em> preface, 1446</blockquote>
  
  <p>Before Hangul, Koreans wrote in <em>Hanja</em> (classical Chinese characters), a system so demanding that literacy was effectively restricted to the male aristocratic <em>yangban</em> class. Sejong wanted a script the unlettered could learn in a single morning.</p>
  
  <p>What he and his scholars produced is, by linguistic consensus, the only <strong>featural alphabet</strong> in active use today — meaning the shapes of the letters reflect the phonetic features of the sounds they represent:</p>
  
  <ul>
    <li><strong>ㄱ</strong> (g/k) is a side view of the back of the tongue rising to block air at the soft palate.</li>
    <li><strong>ㄴ</strong> (n) shows the tip of the tongue touching the alveolar ridge behind the teeth.</li>
    <li><strong>ㅁ</strong> (m) is a closed mouth.</li>
    <li><strong>ㅅ</strong> (s) is shaped like a tooth — the constriction is at the teeth.</li>
    <li><strong>ㅇ</strong> (ng / silent) is a round, open throat.</li>
    <li>The aspirated and tense versions of each consonant are formed by adding strokes: ㄱ → ㅋ → ㄲ. The graphical complexity tracks the phonetic complexity.</li>
  </ul>
  
  <p>The vowels are even more conceptual. They are built from three primitives: a horizontal line ─ (earth), a vertical line │ (man), and a dot · (heaven, later flattened into a short stroke). Combinations of these three Confucian elements give every Korean vowel: ㅏ, ㅓ, ㅗ, ㅜ, and so on.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="ko">1️⃣ "One" — <em>하나</em> / <em>일</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="ko">🌙 "Moon" — <em>달</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="ko">💧 "Water" — <em>물</em></button>
  </div>
  
  <p>The Korean Confucian elite hated it. The Hall of Worthies scholar Choe Manri submitted a famous 1444 memorial calling Hangul "Mongol- or barbarian-like" and warning that adopting a vernacular script would sever Korea from civilized (i.e. Chinese) learning. Sejong overruled him. Even so, after Sejong's death in 1450, Hangul was sidelined; King Yeonsangun banned it outright in 1504 after anonymous Hangul leaflets criticized him. For most of the next four centuries it survived as a "women's script" (<em>amkeul</em>) and a tool of popular literature, while serious scholarship continued in Hanja.</p>
  
  <p>Hangul's true rehabilitation came at the end of the 19th century with reformer Ju Si-gyeong, who systematized its name (<em>han-geul</em>, "great script") and its modern orthography. After the Japanese colonial period — during which Hangul was again banned, this time by an outside power — South Korea declared Hangul Day (한글날) a national holiday. North Korea calls it <em>Chosŏn'gŭl</em> and observes its own holiday on 15 January. Modern Korean literacy is functionally 100%.</p>
  
  <p>The linguist Geoffrey Sampson described Hangul in 1985 as "perhaps the most scientific system of writing in general use in any country". The basic letter shapes are famously quick to memorize — Korean children can grasp the alphabet in a single sitting, though full reading and writing fluency takes the usual years. It is the world's only major script with both a known designer and a documented design rationale — a 600-year-old laboratory experiment that worked.</p>
        `,
        ja: `
  <p>たいていの文字体系は「進化」する。何百年もかけて絵文字から抽象記号へ漂流し、誰も「なぜBはこの形なのか」を覚えていない。<strong>ハングル</strong>はそうではない。ハングルには誕生日がある──<strong>1446年10月9日</strong>、解説書『<em>訓民正音解例本</em>』が頒布された日だ。そして名前のある単独の発明者がいる。朝鮮王朝第4代国王、<strong>世宗大王</strong>（재위 1418〜1450）と、彼の集賢殿（<em>チピョンジョン</em>）の学者たちである。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ko" data-zoom="6">🌍 地図で朝鮮語を見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="ko">👋 「こんにちは」──<em>안녕하세요</em></button>
  </div>
  
  <p>序文の冒頭は、文字史上もっとも胸を打つ一節とされる。</p>
  
  <blockquote>「国の言葉は中国と異なり、漢字とは通じ合わない。それゆえ無学な民が言いたいことがあっても、ついに己の思いを述べることができない者が多い。これを憐れんで、新たに二十八字を作る。誰もが容易に習い、日々の暮らしに役立てんことを願うのみである」──世宗『訓民正音』序、1446年</blockquote>
  
  <p>ハングル以前の朝鮮では、文章は<em>漢字（ハンジャ）</em>で書かれ、その習得負担ゆえに識字は事実上、男性の両班（ヤンバン）階級だけのものだった。世宗は「無学の民が一朝で覚えられる文字」を望んだ。</p>
  
  <p>その結果生まれた文字は、言語学のコンセンサスによれば、今日も現役の唯一の<strong>featural alphabet（音声特徴文字）</strong>である。文字の形が、その音の調音特徴を直接表しているのだ。</p>
  
  <ul>
    <li><strong>ㄱ</strong>（g/k）は、舌の奥が軟口蓋に向かって上がる側面図。</li>
    <li><strong>ㄴ</strong>（n）は舌先が歯茎に触れる形。</li>
    <li><strong>ㅁ</strong>（m）は閉じた口。</li>
    <li><strong>ㅅ</strong>（s）は歯の形──摩擦が起きる位置。</li>
    <li><strong>ㅇ</strong>（ng／無音）は開いた喉。</li>
    <li>激音・濃音は同じ字形に画を足して作る：ㄱ → ㅋ → ㄲ。視覚的複雑さが音響的複雑さに対応する。</li>
  </ul>
  
  <p>母音はさらに思想的だ。基本要素は三つ──横線 ─（地）、縦線 │（人）、点 ·（天、後に短線に）。儒教的三才のこの三要素の組み合わせで、すべての母音 ㅏ・ㅓ・ㅗ・ㅜ などが生み出される。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="one" data-code="ko">1️⃣ 「1」は<em>하나</em>／<em>일</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="ko">🌙 「月」は<em>달</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="ko">💧 「水」は<em>물</em></button>
  </div>
  
  <p>儒教官僚はこれを嫌った。集賢殿の崔萬里は1444年、有名な反対上疏で「ハングルはモンゴル・夷狄の文字に似ており、これを採用すれば中華の学問から遠ざかる」と警告した。世宗は退けたが、1450年の死後ハングルは冷遇され、1504年には燕山君が匿名のハングル流言を理由に正式に禁止する。以後400年近く、ハングルは<em>암클</em>（女文字）、または民衆文学の道具として生き延びる一方、正格の学問は漢字で続いた。</p>
  
  <p>本格的復権は19世紀末、改革者・周時経が来た時だ。彼が<em>han-geul</em>（偉大な文字）という名と現代正書法を整えた。日本統治期にハングルは再び禁止されるが、解放後の韓国は10月9日を「ハングルの日（한글날）」として国民の祝日にした。北朝鮮は<em>チョソングル</em>と呼び、1月15日に祝う。今日の朝鮮語識字率は事実上100%である。</p>
  
  <p>言語学者ジェフリー・サンプソンは1985年、ハングルを「世界で使われている文字体系のうち、おそらく最も科学的なもの」と評した。子どもはおよそ1時間で読めるようになる。発明者と設計理念が両方とも史料で裏付けられる、世界で唯一の大規模文字体系──ハングルは600年前に成功した「言語学の実験」なのだ。</p>
        `,
      },
      sources: [
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
        en: 'Sequoyah — the illiterate genius who invented a writing system from scratch',
        ja: 'シクウォイア──文字を知らぬまま文字を発明した男',
      },
      summary: {
        en: 'In 1821 a Cherokee silversmith who could not read English unveiled an 85-character syllabary he had built alone over 12 years. Within a decade, contemporary observers reported that Cherokee literacy rivaled or exceeded that of the surrounding white settlers.',
        ja: '1821年、英語の読み書きができなかったチェロキー族の銀細工師シクウォイアが、12年かけて独力で完成させた85文字の音節文字を披露した。10年後、チェロキー族の識字率は周囲の白人入植者を上回っていた。',
      },
      body: {
        en: `
  <p><strong>Sequoyah</strong> (also written ᏍᏏᏉᏯ <em>Ssiquoya</em>, or in English George Guess, c. 1770–1843) is one of the only people in recorded history known to have invented a fully functional writing system from nothing, while being personally illiterate in any language. The story is so improbable that 19th-century commentators kept trying to explain it away. It happened anyway.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="chr" data-zoom="5">🌍 Show Cherokee on map</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="chr">👋 "Hello" — <em>ᎣᏏᏲ (osiyo)</em></button>
  </div>
  
  <p>Sequoyah was a silversmith and disabled veteran of the Cherokee Regiment under Andrew Jackson in the Creek War. He spoke no English and had had no formal schooling. But he had seen English-speaking soldiers reading and writing letters during the war — what the Cherokee called "talking leaves" — and he became convinced that this was not magic but a technology, and that his own people deserved it too.</p>
  
  <p>From around 1809 he worked obsessively on the problem. His first attempt was logographic — one symbol per word — and he reportedly drew over a thousand symbols before realising the system would be unlearnable. His wife is said to have burned his work in frustration at one point. He started again.</p>
  
  <p>The breakthrough was the realisation that Cherokee, like Japanese, has a fairly small inventory of distinct syllables — about 85. A <strong>syllabary</strong>, not an alphabet, was the natural fit. He assigned one symbol to each syllable. For inspiration he drew on Latin, Greek and Cyrillic letterforms (which he could not read) plus original shapes, treating each as a meaningless visual token to be matched to a Cherokee sound. The result has letters that look familiar but mean nothing of what their European counterparts mean:</p>
  
  <ul>
    <li><strong>D</strong> in Cherokee is <em>a</em></li>
    <li><strong>R</strong> in Cherokee is <em>e</em></li>
    <li><strong>T</strong> in Cherokee is <em>i</em></li>
    <li><strong>L</strong> in Cherokee is <em>tle</em></li>
    <li><strong>Ꮳ</strong> looks Greek but is the Cherokee syllable <em>tsa</em></li>
  </ul>
  
  <p>In 1821 he demonstrated the system, famously, by separating his six-year-old daughter <em>Ayoka</em> from the audience and having her transcribe and then read back messages dictated to him. The Cherokee Nation Council was unconvinced this was anything but a trick — until they tested it themselves and found that adults could become functionally literate in <strong>days, not years</strong>.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="chr">💧 "Water" — <em>ᎠᎹ (ama)</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="fire" data-code="chr">🔥 "Fire" — <em>ᎠᏥᎳ (atsila)</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="chr">🌙 "Moon" — <em>ᏃᏓ (nvda)</em></button>
  </div>
  
  <p>What happened next is unprecedented in the history of literacy. The Cherokee Nation adopted the syllabary by official decree in 1825. By 1828 they had begun publishing <em>Tsalagi Tsulehisanvhi / Cherokee Phoenix</em>, the first Native American newspaper, printed bilingually in Cherokee and English on a custom-cast syllabary type. Within roughly ten years of Sequoyah's 1821 demonstration, contemporary observers — including American missionaries — estimated that <strong>Cherokee literacy in their own script exceeded the literacy rate of surrounding white settlers in English</strong>.</p>
  
  <blockquote>"In a few months he had completed his system... and the whole nation was electrified with the discovery." — Samuel Lorenzo Knapp, <em>Lectures on American Literature</em>, 1829</blockquote>
  
  <p>The triumph was followed by tragedy. In 1838–1839, despite the Cherokee Nation's literate, constitutional, newspaper-publishing modern state, President Andrew Jackson's administration forced their removal westward on the <strong>Trail of Tears</strong>; an estimated 4,000 of 16,000 Cherokee died. The syllabary went with them. Sequoyah himself died in 1843 in Mexico, searching for a rumoured separated band of Cherokee.</p>
  
  <p>Today the Cherokee syllabary is taught in immersion schools in Tahlequah, Oklahoma and Cherokee, North Carolina. It is in Unicode (U+13A0–U+13FF), supported by Apple and Google operating systems, and has been used to write everything from translations of the Bible to modern social-media posts. The giant California redwood tree <em>Sequoia sempervirens</em> is named after him. The man could not read. He gave a nation a script.</p>
        `,
        ja: `
  <p><strong>シクウォイア</strong>（ᏍᏏᏉᏯ、英語名 George Guess、約1770〜1843）は、記録の残る歴史の中で、いかなる言語の読み書きもできないまま、完全に機能する文字体系を独力で発明した、ほぼ唯一の人物である。あまりに奇跡的なため、19世紀の論者たちは「どこかから盗用したに違いない」と説明しようとし続けた。だが、それは本当に起きたのだ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="chr" data-zoom="5">🌍 地図でチェロキー語を見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="chr">👋 「こんにちは」──<em>ᎣᏏᏲ (osiyo)</em></button>
  </div>
  
  <p>シクウォイアは銀細工師であり、クリーク戦争でアンドリュー・ジャクソン将軍麾下のチェロキー連隊に従軍した負傷兵だった。英語は話せず、学校教育も受けていない。しかし戦地で、英語話者の兵士が手紙を読み書きする様子──チェロキー族が「話す葉（talking leaves）」と呼んだもの──を目にし、これは魔法ではなく技術であり、同胞も持つべきだと確信した。</p>
  
  <p>1809年ごろから彼は取り憑かれたように作業した。最初の試みは表語的、すなわち単語ごとに1記号で、1000を超える記号を描いたが学習不可能と悟って放棄したという。妻が業を煮やして原稿を焼いた、という逸話まで残る。彼はゼロから始め直した。</p>
  
  <p>突破口は、チェロキー語は日本語と同じく、明確な音節の種類が比較的少ない──約85──という洞察だった。アルファベットではなく<strong>音節文字（syllabary）</strong>こそが最適である。彼は1音節1記号を割り振り、字形のインスピレーションをラテン文字・ギリシャ文字・キリル文字（彼には読めない記号）から得、それを「意味のない視覚マーク」としてチェロキー音に再割当てした。結果、ヨーロッパ文字に似ているが意味は全く違う字体が並ぶ。</p>
  
  <ul>
    <li><strong>D</strong> はチェロキーでは <em>a</em></li>
    <li><strong>R</strong> はチェロキーでは <em>e</em></li>
    <li><strong>T</strong> はチェロキーでは <em>i</em></li>
    <li><strong>L</strong> はチェロキーでは <em>tle</em></li>
    <li><strong>Ꮳ</strong> はギリシャ文字に見えるがチェロキーの <em>tsa</em></li>
  </ul>
  
  <p>1821年、彼は有名な公開実証を行う。6歳の娘<em>アヨカ</em>を聴衆から隔離し、聴衆が口述した文を彼が書き留め、それを娘に読み上げさせるという形だ。チェロキー国民議会は最初「奇術ではないか」と疑ったが、自分たちで試してみると、<strong>大人が数日で実用的に読み書きできるようになる</strong>ことが分かった。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="chr">💧 「水」は<em>ᎠᎹ (ama)</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="fire" data-code="chr">🔥 「火」は<em>ᎠᏥᎳ (atsila)</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="chr">🌙 「月」は<em>ᏃᏓ (nvda)</em></button>
  </div>
  
  <p>そこから先は識字史上類を見ない事態が起きた。チェロキー国は1825年、シラバリーを公式採用。1828年には全米初の先住民新聞<em>『Tsalagi Tsulehisanvhi / チェロキー・フェニックス』</em>がチェロキー語・英語併載で刊行された。シクウォイアの実証から10年程度の間に、宣教師を含む同時代の観察者は「<strong>チェロキー族のチェロキー文字識字率は、周囲の白人入植者の英語識字率を上回っている</strong>」と報告するに至る。</p>
  
  <blockquote>「数か月で彼は体系を完成させ……国民全体がその発見に電撃のように震えた」── S・L・ナップ『アメリカ文学講義』1829年</blockquote>
  
  <p>しかし栄光のあとに悲劇が待っていた。1838〜1839年、識字率も憲法も新聞も持つ近代国家であったにもかかわらず、ジャクソン政権はチェロキーを西方へ強制移住させた。<strong>「涙の道（Trail of Tears）」</strong>である。1万6千人のうち約4千人が死んだ。シラバリーは彼らとともに西へ運ばれた。シクウォイア自身は1843年、「西に分かれた同胞がいる」という噂を追ってメキシコ領内で客死した。</p>
  
  <p>今日、チェロキー文字はオクラホマ州タレクワやノースカロライナ州チェロキーのイマージョン学校で教えられている。Unicode（U+13A0〜U+13FF）に収録され、Apple・Googleが標準対応する。聖書翻訳から現代のSNS投稿まで使われている。カリフォルニアの巨木<em>セコイア</em>（Sequoia sempervirens）は彼にちなんで命名された。読み書きを知らぬ男が、一つの民族に文字を与えたのだ。</p>
        `,
      },
      sources: [
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
        en: 'Around 1832 a Liberian man named Momolu Duwalu Bukele said an unknown stranger appeared to him in a dream and taught him a script for his own Vai language. Two centuries later, that script is on smartphones.',
        ja: '1832年ごろ、リベリアのモモル・ドゥワル・ブケレは「夢の中で見知らぬ男が現れ、自分の言語のための文字を教えてくれた」と語った。約200年後、その文字はスマートフォンにも収録されている。',
      },
      body: {
        en: `
  <p>The history of writing has a small but striking subgenre: scripts whose inventors claim they received them in a dream or vision. The <strong>Vai syllabary</strong> of Liberia is the most famous and the best-documented of them — and it became, in 1834, one of the first independent inventions of writing in modern West Africa.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="vai" data-zoom="6">🌍 Show Vai on map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="6.5" data-lng="-11" data-zoom="6">🗺️ Fly to coastal Liberia</button>
  </div>
  
  <p>The inventor was <strong>Mɔmɔlu Duwalu Bukɛlɛ</strong> (variously transcribed Momolu Duwalu Bukele, c. 1810–1850s) of the Vai people, who live along the coast of what is now Liberia and Sierra Leone. According to interviews recorded by the German missionary <strong>S. W. Koelle</strong> in 1849 — and published in his 1854 monograph <em>Outlines of a Grammar of the Vei Language</em> — Bukele said the script came to him around 1832–1833 in a dream:</p>
  
  <blockquote>"A tall, venerable-looking white man, in a long coat, appeared and said: 'I am sent to you by other white men ... I bring you a book.' [The visitor] then showed me many signs upon paper, but I did not understand them. ... When I woke, I called my friends together, and we set to work, and after some time we made our book." — Bukɛlɛ's account, as recorded by Koelle, 1849</blockquote>
  
  <p>Bukele did not invent the script entirely alone; he convened a small group of fellow Vai men — Wonu Wulen, Maule, and others — and the syllabary was completed collectively. The first version had roughly <strong>200 characters</strong>, one per Vai syllable plus a handful of logograms. A standardised modern set, codified in the mid-20th century, has <strong>212 characters</strong>.</p>
  
  <p>Vai is a Mande language, like Mandinka and Bambara, with a clear (C)V(N) syllable structure and seven vowels with tone. The syllabary fits this structure exactly: each character represents one consonant + vowel + tone unit. A few characters are pictographic in origin (the symbol for <em>fa</em>, "father", was originally based on a beard), but most are arbitrary geometric shapes.</p>
  
  <ul>
    <li>Within a decade of its 1834 unveiling, Vai script was being used for personal letters, commercial accounts, court records and Quranic glosses.</li>
    <li>Vai men in the 19th century routinely wrote each other letters in three scripts depending on addressee: <em>Vai</em> for fellow Vai, <em>Arabic</em> for Muslims of other groups, and <em>Latin</em> for Europeans.</li>
    <li>The script survived the Liberian civil wars (1989–2003) and the 2014 Ebola outbreak.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="vai">💧 "Water" — <em>ꕕ (ja)</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="vai">👋 See Vai "Hello"</button>
  </div>
  
  <p>Vai literacy became the subject of a famous <strong>1981 study by Sylvia Scribner and Michael Cole</strong>, <em>The Psychology of Literacy</em>. Vai society was — and to some extent still is — a natural laboratory: many adults are literate in one, two or three scripts (Vai, Arabic, Latin), each acquired in a different setting (Vai informally from kin, Arabic in Quran schools, Latin in colonial-style schools). Scribner and Cole compared the cognitive effects of each and concluded that the "intellectual benefits of literacy" famously claimed by earlier scholars were largely <em>specific to schooling</em>, not to literacy as such. Vai script literacy, learned informally, did not by itself transform thinking. It was an enormously influential finding in education research.</p>
  
  <p>Vai script was added to <strong>Unicode 5.1 in 2008</strong> (block U+A500–U+A63F), and is now available on Android, iOS and major Linux distributions. There are Vai-language Wikipedia stubs, Vai keyboard layouts, and a small but persistent online community. The Vai people themselves never lost their script; today, almost 200 years after Bukele's dream, a Vai grandmother can WhatsApp her grandchild in the same syllabary that a young man in 1834 wrote on his first sheet of imported paper.</p>
  
  <p>Whether the dream was metaphor or memory, Bukele understood the social technology better than many of his European contemporaries: writing is not magic, and any people who want it can have it.</p>
        `,
        ja: `
  <p>文字史には小さいが強烈なサブジャンルがある──「発明者が夢や幻視で授かったと語る文字体系」だ。リベリアの<strong>ヴァイ文字</strong>はその中でも最も有名かつ最も史料の残る例で、1834年、近代西アフリカで最初に独立発明された文字体系のひとつとなった。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="vai" data-zoom="6">🌍 地図でヴァイ語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="6.5" data-lng="-11" data-zoom="6">🗺️ リベリア沿岸へ飛ぶ</button>
  </div>
  
  <p>発明者は<strong>モモル・ドゥワル・ブケレ</strong>（Mɔmɔlu Duwalu Bukɛlɛ、約1810〜1850年代）。現在のリベリア・シエラレオネ沿岸に住むヴァイ族の人物だ。ドイツ人宣教師<strong>S・W・ケーレ</strong>が1849年に行った聞き取りを基にした1854年の文典『Outlines of a Grammar of the Vei Language』によれば、ブケレは1832〜1833年ごろ夢で文字を授かったと語った。</p>
  
  <blockquote>「長いコートを着た、背の高い白人の長老のような人が現れ、こう言った──『私は他の白人たちから遣わされた……あなたに本を持ってきた』。彼は紙の上の沢山の記号を見せたが、私には分からなかった……目覚めると私は仲間を集め、共に作業を始め、しばらくして我々の本ができた」──ブケレの証言、ケーレ1849年記録</blockquote>
  
  <p>ブケレは独力で完成させたわけではない。ウォヌ・ウレン、マウレらヴァイ族の同志を集め、共同で音節文字を完成させた。初期版は約<strong>200文字</strong>──ヴァイ語の音節ごとに一文字、それに少数の表語記号を加えたものだった。20世紀中頃に標準化された現行版は<strong>212文字</strong>を持つ。</p>
  
  <p>ヴァイ語はマンディンカ語やバンバラ語と同じマンデ語族で、明確な (C)V(N) 音節構造と7母音＋声調を持つ。シラバリーはこの構造にぴったり対応している。各文字が「子音＋母音＋声調」の組を表す。一部の文字は絵文字起源（<em>fa</em>「父」はかつて顎髭の絵だったとされる）が、多くは恣意的な幾何形だ。</p>
  
  <ul>
    <li>1834年の披露からわずか10年で、ヴァイ文字は私信、商業帳簿、裁判記録、クルアーン注釈に使われた。</li>
    <li>19世紀のヴァイ人男性は、相手によって3種の文字を使い分けた──同族にはヴァイ文字、他のムスリムにはアラビア文字、ヨーロッパ人にはラテン文字。</li>
    <li>1989〜2003年のリベリア内戦、2014年のエボラ流行も生き延びた。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="vai">💧 「水」は<em>ja</em></button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="vai">👋 ヴァイ語の「こんにちは」</button>
  </div>
  
  <p>ヴァイ族の識字は教育学史でも有名な事例となった。<strong>シルヴィア・スクリブナーとマイケル・コールの1981年の研究『The Psychology of Literacy』</strong>がそれだ。ヴァイ社会では多くの成人が1〜3種の文字（ヴァイ／アラビア／ラテン）に通じ、それぞれ異なる場（親族から非公式に／クルアーン学校で／植民地式学校で）で習得していた。スクリブナーとコールは認知効果を比較し、過去の研究者が主張してきた「識字の知的恩恵」は、実は<em>学校教育に特有のもの</em>であって識字そのものの効果ではない、と結論づけた。家庭で習うヴァイ文字識字は思考様式を変容させていなかった。この知見は教育研究に絶大な影響を与えた。</p>
  
  <p>ヴァイ文字は<strong>2008年のUnicode 5.1</strong>に収録され（U+A500〜U+A63F）、Android・iOS・主要なLinuxディストリビューションが対応する。ヴァイ語版Wikipediaのスタブ、ヴァイ文字キーボード、小さいが持続するオンラインコミュニティが存在する。ヴァイ族は一度も自分たちの文字を失わなかった。ブケレの夢から約200年経った今、ヴァイの祖母は1834年に若者が輸入紙の上に初めて書いたのと同じ音節文字で、孫にWhatsAppを送ることができる。</p>
  
  <p>あの夢が比喩だったのか記憶だったのかは分からない。だがブケレは、多くの同時代ヨーロッパ人より文字という社会技術の本質をよく理解していた──文字は魔法ではなく、欲する民族はどこでもそれを持つことができる、と。</p>
        `,
      },
      sources: [
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
        en: 'Tangut — the lost script of a forgotten empire',
        ja: '失われた王朝の文字、西夏文',
      },
      summary: {
        en: 'A Sino-Tibetan language written in some 6,000 hand-built logographs, invented by imperial decree in 1036 and forgotten for 700 years — until a Russian linguist dragged it back from the dead.',
        ja: '1036年に皇帝の命令で作られた約6000字の表意文字。700年眠った西夏文を、ロシア人言語学者ネフスキーが甦らせた。',
      },
      body: {
        en: `
  <p>In 1036 CE, the emperor <strong>Li Yuanhao</strong> of the <strong>Western Xia</strong> (Xixia / 西夏) dynasty decreed that his people, the Tangut, must have a writing system worthy of their own. His scholar Yeli Renrong is said to have invented the entire script in a matter of years — roughly <strong>6,000 logographs</strong>, every one a fresh design, deliberately resembling but not borrowing from Chinese. The result is <strong>Tangut (西夏文)</strong>: one of the most visually dense writing systems ever created.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="txg" data-zoom="5">🌍 Show Tangut on map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="38.5" data-lng="106" data-zoom="5">🗺️ Fly to the Xixia heartland</button>
  </div>
  
  <p>The Western Xia empire, centred on what is now Ningxia and Gansu in north-west China, lasted nearly two centuries — long enough to produce Buddhist canons, dictionaries, law codes, dynastic histories, and a vast bureaucracy, all in Tangut. Then in <strong>1227</strong> the Mongols under Genghis Khan razed it. Tangut survived a little longer as a liturgical and scholarly language, but by the Ming dynasty no one could read it. The script vanished from active use.</p>
  
  <p>What linguists eventually rediscovered was a <strong>Sino-Tibetan</strong> language — most likely on the <strong>Qiangic</strong> branch — with rich tonal contrasts, complex initial consonant clusters reconstructed from rhyme tables, and a fondness for compound logographs in which radicals are <em>borrowed from one another</em> rather than from any Chinese ancestor. A typical Tangut character has 15–20 strokes; some have over 30.</p>
  
  <ul>
    <li><strong>Created, not evolved.</strong> Unlike Chinese, whose characters grew organically over millennia, every Tangut logograph was designed at once, in a single imperial workshop. This is one of the very few large-scale "constructed" scripts in human history.</li>
    <li><strong>Phonology by table.</strong> Because no native speaker survives, all Tangut sound reconstruction depends on bilingual rhyme dictionaries — especially the <em>Wénhǎi</em> (文海) and <em>Tóngyīn</em> (同音), which group characters by initial, rhyme and tone.</li>
    <li><strong>A Buddhist library underground.</strong> In 1908 the Russian explorer <strong>Pyotr Kozlov</strong> excavated the ruined city of Khara-Khoto and shipped thousands of Tangut manuscripts to St Petersburg — still the world's largest collection.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="txg">🌙 See Tangut "Moon"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="txg">💧 See Tangut "Water"</button>
  </div>
  
  <p>The decipherer was <strong>Nikolai Nevsky</strong> (1892–1937), a Russian Japanologist who spent the 1920s in Japan and Taiwan and turned his attention to the Khara-Khoto hoard upon returning to Leningrad. By 1929 Nevsky had cracked the basic phonological structure and built the first working Tangut–Russian dictionary. His masterpiece, <em>Tangutskaya Filologiya</em>, was published posthumously in 1960 — Nevsky himself had been shot in Stalin's Great Purge in 1937. He was awarded the Lenin Prize after death.</p>
  
  <blockquote>"Each Tangut character is a small architectural problem: the strokes do not just spell a sound, they tile a square." — paraphrased from M. V. Sofronov</blockquote>
  
  <p>Later <strong>Mikhail Sofronov</strong> refined the phonological reconstruction in the 1960s; <strong>Ksenia Kepping</strong> worked on grammar and ritual texts; today researchers in Beijing, Kyoto, Taipei and St Petersburg continue to publish editions of newly catalogued manuscripts. Significant questions remain — the exact tone system, the deeper genetic position within Sino-Tibetan, the meaning of dozens of rare characters that occur only once or twice in the corpus.</p>
  
  <p>Tangut is a reminder that "dead language" is rarely a final verdict. A script invented in a single decade, used by millions, forgotten for seven centuries, can still be coaxed back into speech — provided someone is stubborn enough to spend a lifetime on rhyme tables.</p>
        `,
        ja: `
  <p>西暦1036年、<strong>西夏（Xixia）</strong>王朝の初代皇帝<strong>李元昊（り・げんこう）</strong>は、自らの民タングート族にふさわしい文字を持つよう命じた。学者・野利仁栄がわずか数年で<strong>約6000字</strong>の表意文字を一気に設計したとされる。漢字に似ているが漢字から借りていない、完全に新設計の文字体系──それが<strong>西夏文（Tangut script）</strong>である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="txg" data-zoom="5">🌍 地図で西夏語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="38.5" data-lng="106" data-zoom="5">🗺️ 西夏の中心地へ飛ぶ</button>
  </div>
  
  <p>現在の寧夏・甘粛を中心に約200年続いた西夏王朝は、仏典・辞書・法典・正史・行政文書をことごとく西夏文で残した。だが<strong>1227年</strong>、チンギス・ハーン率いるモンゴル軍によって滅亡。明代までには誰一人この文字を読めなくなり、西夏文は完全に「死字」となる。</p>
  
  <p>後に判明したのは、西夏語が<strong>シナ・チベット語族</strong>のチャン語派に属する声調言語で、複雑な子音連続を持ち、文字内部の偏旁が<em>西夏文どうしで互いに借り合う</em>独特の構造を取っていることだった。1字あたり平均15〜20画、30画超の字も珍しくない。</p>
  
  <ul>
    <li><strong>進化ではなく設計。</strong> 漢字が数千年かけて自然発生したのに対し、西夏文は単一の宮廷工房で一斉に生み出された、人類史でも稀な大規模「人工文字」である。</li>
    <li><strong>韻書から音を復元。</strong> 母語話者は1人も残っていない。音韻は『文海』『同音』など西夏自身の韻書を頼りに、声母・韻母・声調から逆算するしかない。</li>
    <li><strong>地下の仏教図書館。</strong> 1908年、ロシアの探検家コズロフがカラ・ホト遺跡で数千点の西夏文献を発掘し、サンクトペテルブルクへ持ち帰った。今も世界最大のコレクションである。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="moon" data-code="txg">🌙 西夏語の「月」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="txg">💧 西夏語の「水」</button>
  </div>
  
  <p>解読の英雄は<strong>ニコライ・ネフスキー</strong>（1892–1937）。1920年代を日本と台湾で過ごしたロシアの日本学者で、レニングラードに戻ってカラ・ホト文書に着手し、1929年には音韻構造の基礎を解明、最初の西夏語＝ロシア語辞書を完成させる。代表作『西夏文献学』は没後1960年刊──ネフスキー自身は1937年、スターリンの大粛清で銃殺されていた。死後にレーニン賞を受賞している。</p>
  
  <blockquote>「西夏文字はひとつひとつが小さな建築である──筆画が音を綴るだけでなく、正方形を敷きつめる」──ソフロノフによる西夏文評（要約）</blockquote>
  
  <p>その後<strong>ミハイル・ソフロノフ</strong>が音韻復元を精緻化し、<strong>クセニア・ケッピング</strong>が文法と儀礼文献を整備、現在は北京・京都・台北・サンクトペテルブルクの研究者たちが新出写本の校訂を続けている。声調体系の細部、シナ・チベット語族内の正確な位置、コーパス中に一・二回しか現れない希少字の意味──未解明の問いはまだ多い。</p>
  
  <p>「死語」は最終判決ではない。十数年で発明され、数百万人に使われ、700年眠った文字でも、韻書に半生を捧げる人間がいれば、もう一度声を取り戻せる──西夏文はそれを教えてくれる。</p>
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
        en: 'About 1,400 Bronze Age inscriptions from Minoan Crete. We can sound out almost every sign — yet the language behind them remains, after a century of effort, completely unknown.',
        ja: '青銅器時代クレタ島の約1400点の刻文。記号の音価はほぼ読めるのに、背後の言語そのものは1世紀の研究を経てもなお正体不明である。',
      },
      body: {
        en: `
  <p>Between roughly <strong>1800 and 1450 BCE</strong>, the Minoan civilisation of Crete kept its palace accounts, dedications and labels in a syllabic script we now call <strong>Linear A</strong>. About <strong>1,400 inscriptions</strong> survive — most of them brief, scratched onto clay tablets, libation tables, and bronze double-axes from sites like Knossos, Phaistos, Hagia Triada, and Zakros.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.30" data-lng="25.15" data-zoom="7">🗺️ Fly to Minoan Crete</button>
  </div>
  
  <p>Here is the strange situation. In 1952, the young English architect <strong>Michael Ventris</strong>, working with classicist John Chadwick, deciphered a sister script called <strong>Linear B</strong>. He showed, to almost everyone's astonishment, that Linear B encoded an <em>early form of Greek</em> — the language of the Mycenaeans who took over Crete around 1450 BCE. Linear B uses many of the same syllabic signs as Linear A, just with slight stylistic differences. So we can pick up a Linear A tablet, look at each sign, and assign it the Linear B sound value with reasonable confidence: <em>ku, ro, pi, te, da</em>…</p>
  
  <p>And then the trail goes cold. The strings of syllables that emerge are <strong>not Greek</strong>. They are not Semitic in any recognisable way. They do not match Hittite, Luwian, Hurrian, Egyptian, or any other attested Bronze Age language of the region. They are simply the <strong>Minoan language</strong> — and we have no living relative, no bilingual Rosetta-style key, and no idea where the Minoans came from or what family their tongue belonged to.</p>
  
  <ul>
    <li><strong>The reading problem is almost solved.</strong> Roughly 70–80% of Linear A signs have agreed Linear B equivalents. We can transliterate most tablets.</li>
    <li><strong>The translation problem is essentially untouched.</strong> We can read <em>ku-ro</em> (which probably means "total", since it appears at the bottom of numerical lists), <em>ja-sa-sa-ra</em> (a recurrent libation formula, possibly a divine name), and a handful of place names that survive into later Greek. Beyond that, almost nothing.</li>
    <li><strong>1,400 inscriptions sounds like a lot. It is not.</strong> Most are one or two words long: a name, a number, a commodity. The corpus is roughly the size of a short novel — and most of it is bookkeeping.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.05" data-lng="24.81" data-zoom="9">🏛️ Hagia Triada (richest find)</button>
  </div>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.40" data-lng="25.16" data-zoom="9">🏛️ Knossos palace site</button>
  </div>
  
  <p>Many decipherment claims have been published — that Minoan is Semitic, Anatolian, Tyrrhenian, Indo-European, even Proto-Basque. None has convinced the field. The main obstacles are (1) the small and repetitive corpus, (2) the absence of any bilingual text long enough to bootstrap a grammar, and (3) the suspicion that Minoan may simply be an <strong>isolate</strong> — a language with no surviving relatives anywhere.</p>
  
  <blockquote>"We can pronounce the words of the Minoans. We just do not know what they mean." — paraphrased from John Chadwick, The Decipherment of Linear B</blockquote>
  
  <p>Compare the situation with the still-undeciphered <strong>Cypro-Minoan</strong> script of Bronze Age Cyprus, or the even older <strong>Cretan hieroglyphs</strong> on which Linear A itself appears to be based. Bronze Age Aegean writing is a small forest of related scripts encoding at least two and possibly three or four different languages — and only one of them, the latecomer Linear B, has yielded.</p>
  
  <p>The hope is that excavations at sites like Zominthos or Petras will eventually yield a long bilingual inscription — perhaps Minoan paired with Egyptian or Akkadian — or simply a Linear A tablet long enough for statistical and morphological analysis to gain traction. Until then, Linear A remains the great unread book of European prehistory, hiding in plain sight on clay tablets we have been holding for a hundred years.</p>
        `,
        ja: `
  <p>紀元前<strong>1800〜1450年</strong>頃、クレタ島のミノア文明は宮殿の会計記録や奉納銘文を音節文字で残した。これを<strong>線文字A（Linear A）</strong>と呼ぶ。クノッソス、ファイストス、アギア・トリアダ、ザクロスなどから出土した<strong>約1400点</strong>の刻文が現存し、その大半は粘土板に刻まれた短い帳簿や奉納銘である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.30" data-lng="25.15" data-zoom="7">🗺️ ミノア時代のクレタ島へ飛ぶ</button>
  </div>
  
  <p>ここに奇妙な状況がある。1952年、若き英国の建築家<strong>マイケル・ヴェントリス</strong>と古典学者ジョン・チャドウィックは、姉妹文字<strong>線文字B</strong>を解読し、その背後にあるのが<em>初期ギリシア語</em>──紀元前1450年頃にクレタを支配したミケーネ人の言語──であることを示した。線文字Aと線文字Bは音節記号の大半を共有するため、線文字Aの記号一つ一つに線文字Bの音価をかなりの確度で当てはめられる。<em>ku, ro, pi, te, da</em>──そう、読める。</p>
  
  <p>しかし、そこで道が途切れる。読み上げた音節列は<strong>ギリシア語ではない</strong>。セム語族のどれにも一致せず、ヒッタイト・ルウィ・フルリ・エジプト──同時代のどの言語にも当てはまらない。ただの<strong>「ミノア語」</strong>であり、現存する親縁言語もなく、ロゼッタ石のような対訳もなく、ミノア人がどこから来たのか、その言語がどの語族に属するのかさえ分からない。</p>
  
  <ul>
    <li><strong>「読む」問題はほぼ解けている。</strong> 線文字Aの記号の70〜80%は線文字Bと対応関係があり、ほとんどの粘土板は転写できる。</li>
    <li><strong>「訳す」問題には手も足も出ない。</strong> 数値表の末尾に現れる <em>ku-ro</em>（おそらく「合計」）、奉納定型句の <em>ja-sa-sa-ra</em>（神名か？）、後代ギリシア語に残った地名──分かっているのはその程度である。</li>
    <li><strong>1400点は多そうで多くない。</strong> ほとんどは1〜2語の短い記録（人名、数量、品目）であり、コーパス全体でも短篇小説1冊程度。しかもその大半は会計帳簿である。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.05" data-lng="24.81" data-zoom="9">🏛️ 最大の出土地アギア・トリアダへ</button>
  </div>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="35.40" data-lng="25.16" data-zoom="9">🏛️ クノッソス宮殿跡へ</button>
  </div>
  
  <p>セム語説、アナトリア語説、エトルリア語と同源説、印欧語説、果てはバスク語説まで、解読を主張する論文は数多い。だがどれも学界の合意は得ていない。障害は3つ──(1)コーパスが小さく定型的すぎる、(2)文法を組み立てられるほど長い対訳テキストがない、(3)ミノア語そのものが<strong>孤立言語</strong>で、地上のどこにも親戚が残っていない可能性がある、ということだ。</p>
  
  <blockquote>「ミノア人の言葉を発音することはできる。ただ、それが何を意味しているのか分からないだけだ」──チャドウィック『線文字Bの解読』より大意</blockquote>
  
  <p>同じ青銅器時代エーゲ海には、未解読の<strong>キプロ・ミノア文字</strong>や、線文字A自身が派生したと見られる<strong>クレタ聖刻文字</strong>もある。少なくとも2つ、おそらく3〜4の異なる言語を記す関連文字群が広がっていて、解読されているのは最も新しい線文字Bだけなのだ。</p>
  
  <p>ザコロスやペトラスの発掘で長文の対訳銘文が出るか、あるいは統計と形態論の手法に耐えうる長い線文字A粘土板が見つかれば、状況は変わる。それまで線文字Aは、ヨーロッパ先史時代最大の「読めるのに読めない本」として、私たちが100年前から手に取り続けている粘土板の上に黙って横たわっている。</p>
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
  <p>If you ask an English speaker what is "ahead", they will tell you about meetings <em>next week</em>, deadlines <em>up ahead</em>, futures <em>to look forward to</em>. The future is in front; the past is behind. Almost every Indo-European language packages time this way, and most cognitive scientists assumed for decades that the metaphor was a near-universal of human thought.</p>
  
  <p>Then in 2006, Rafael Núñez and Eve Sweetser published a careful fieldwork study of <strong>Aymara</strong>, a language spoken by roughly <strong>2–3 million people</strong> in the high Andes of Bolivia, Peru and northern Chile — and found exactly the opposite mapping.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ay" data-zoom="6">🌍 Show Aymara on map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-16.5" data-lng="-68.15" data-zoom="6">🗺️ Fly to La Paz</button>
  </div>
  
  <p>In Aymara, the basic word for "front" is <em>nayra</em> — which also means <strong>"eye"</strong> and <strong>"sight"</strong>. The basic word for "behind" is <em>qhipa</em>, which also means <strong>"back"</strong>. These spatial roots are reused for time, and the alignment is:</p>
  
  <ul>
    <li><strong><em>nayra mara</em></strong> — literally "eye/front year", meaning <strong>last year</strong>.</li>
    <li><strong><em>nayra pacha</em></strong> — "eye/front time", meaning <strong>the past</strong>, <strong>ancient times</strong>.</li>
    <li><strong><em>qhipüru</em></strong> — from "back day", meaning <strong>tomorrow / a future day</strong>.</li>
    <li><strong><em>qhipa mara</em></strong> — "back year", meaning <strong>next year</strong>.</li>
  </ul>
  
  <p>The logic, repeatedly given by Aymara speakers when asked, is beautifully consistent: <em>the past is what you have already seen, so it must be in front of you, where eyes look. The future is unseen, unknown — so it lies behind your back, where you cannot see.</em></p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="ay">☀️ See Aymara "Sun"</button>
  </div>
  
  <p>Núñez and Sweetser did not just rely on lexical glosses, which can mislead. They filmed elderly Aymara speakers as they talked about events from many decades back and decades into the future. The gestures are unambiguous: when describing past events, speakers gesture <strong>forward, into the visual field in front of them</strong> — sometimes with a sweep, sometimes pointing at a specific imagined location. When describing future events, they gesture backward, sometimes with a thumb thrown over the shoulder. The further back in time, the further forward the gesture. The further into the future, the further behind.</p>
  
  <p>Interestingly, younger bilingual Aymara–Spanish speakers gesture more in the Spanish pattern (future forward), suggesting the older spatial mapping is gradually being overwritten by contact with Indo-European languages of wider exchange. Aymara may turn out to be one of the last reservoirs of a metaphor that other Andean and Amazonian languages used to share.</p>
  
  <blockquote>"What you have seen with your own eyes you can place in front of you; what you have not seen has to stay at your back." — paraphrase of an Aymara elder, in Núñez & Sweetser 2006</blockquote>
  
  <p>The finding mattered far beyond Andean linguistics. Together with George Lakoff's work on conceptual metaphor and Lera Boroditsky's experiments on time and language, the Aymara case became a cornerstone of the modern argument that <strong>basic spatial metaphors for abstract domains are not universal</strong> — they are deeply shaped by culture and embodied experience. Time, the most relentless abstraction we have, may not even point the same way for everyone.</p>
  
  <p>Aymara is also remarkable in other ways: a much-debated proposal — most prominently by Iván Guzmán de Rojas in the 1980s — that its grammar reflects a <em>three-valued logic</em> (a claim still disputed among linguists), an obligatory evidential system not unlike Tuyuca's, and a vibrant indigenous-language publishing scene. But the front-facing past remains its most famous gift to cognitive science.</p>
        `,
        ja: `
  <p>英語話者に「先（ahead）」とは何かと聞けば、来週の会議、迫る締切、楽しみな未来──と答えるだろう。未来は前、過去は後ろ。印欧諸語のほぼすべてが時間をこの向きで切り取っており、認知科学者たちは長らく「これは人類の思考に普遍の比喩だ」と考えていた。</p>
  
  <p>その前提に正面から穴を開けたのが、2006年にラファエル・ヌニェスとイヴ・スウィーツァーが発表したアンデスでの現地調査である。対象は<strong>アイマラ語</strong>──ボリビア・ペルー・チリ北部の高地で<strong>約200〜300万人</strong>が話す言語だ。</p>
  
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
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="ay">☀️ アイマラ語の「日」</button>
  </div>
  
  <p>ヌニェスらは語義だけに頼らず、高齢のアイマラ語話者がインタビューで身振りを伴いながら時間について語る場面をビデオで分析した。結果は明快だ。過去の出来事を語るとき、話者は<strong>体の前方、視野の中</strong>を指差す──ときに大きく払うように、ときに具体的な位置を示すように。未来の出来事を語るときは、肩越しに親指を後ろへ放り投げるように指す。遠い過去ほど前方深く、遠い未来ほど後方遠く。</p>
  
  <p>興味深いことに、若いアイマラ＝スペイン語バイリンガル世代は、スペイン語式（未来が前）に近い身振りを混ぜるようになっている。アンデス・アマゾン地域でかつて共有されていた「過去＝前」比喩は、印欧諸語との接触で少しずつ書き換えられている最中なのかもしれない。</p>
  
  <blockquote>「自分の目で見たものは前に置ける。見ていないものは背中に置くしかない」──アイマラ古老の発言の意訳（Núñez & Sweetser 2006）</blockquote>
  
  <p>この発見はアンデス研究の枠を超えて重要だった。ジョージ・レイコフの概念メタファー研究、レラ・ボロディツキーの時間言語実験と並んで、「抽象概念の空間メタファーは人類普遍ではなく、文化と身体経験に深く規定される」という現代的主張の中核となっている。最も逃れがたい抽象である<strong>時間</strong>でさえ、全人類で同じ向きを指してはいないのである。</p>
  
  <p>アイマラ語にはほかにも興味深い特徴が多い──1980年代にイバン・グスマン・デ・ロハスらが提唱した「アイマラ文法には三値論理が反映されている」とする説（現在も言語学者の間で議論が続く論争的な主張）、トゥユカ語に似た義務的な証拠性、活発な先住民出版文化。だが、「目の前に過去がある」というこの一点は、今も認知科学への最大の贈り物として語り継がれている。</p>
        `,
      },
      sources: [
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
  
  <p>In <strong>Tuyuca</strong> — an <strong>Eastern Tukanoan</strong> language with about <strong>1,000 speakers</strong> in the Vaupés region on the Brazil–Colombia border — you simply cannot. Every finite verb must carry a small suffix indicating <em>how you know what you are claiming</em>. There is no neutral form. Speak without an evidential and you have not spoken a grammatical sentence.</p>
  
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
  
  <p>The system is more than a politeness convention. It is a hard grammatical constraint, learned early by children, and respected even in casual conversation. A Tuyuca speaker recounting a quarrel is required to flag — every clause — whether they witnessed it, overheard it, or had it reported. To omit the marker is to produce an ill-formed sentence, like saying <em>"yesterday he go store"</em> in English.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="eye" data-code="tue">👁️ See Tuyuca "Eye"</button>
  </div>
  
  <p>Tuyuca is not unique. <strong>Evidentiality</strong> as a grammatical category is found across the Tukanoan family, in Quechua, Aymara, Turkish (the famous <em>-miş</em>), Bulgarian, Korean, many Tibeto-Burman languages, and across Amazonia. <strong>Alexandra Aikhenvald</strong>'s typological survey (2004) collected nearly 500 languages with grammaticalised evidentials. But Tuyuca stands out for the <em>granularity</em> of its system — five distinctions where most languages make two or three — and for being among the very first to be carefully described.</p>
  
  <blockquote>"In Tuyuca, you cannot lie comfortably. Every claim wears the signature of how it was acquired." — paraphrase of Aikhenvald 2004</blockquote>
  
  <p>The implications for cognition are debated. Some researchers, including Lev Vygotsky's intellectual heirs and Aikhenvald herself, argue that habitually marking the source of information cultivates a different orientation to evidence and rumour. Others note that English speakers can express the same distinctions — they just are not <em>forced</em> to. The current consensus is somewhere in between: obligatory grammaticalisation makes a category cognitively salient, but does not make speakers of other languages incapable of the same distinctions.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="drink" data-code="tue">🥤 See Tuyuca "Drink" (sĩdĩ)</button>
  </div>
  
  <p>What is clear is that Tuyuca exposes a hidden assumption of much Western philosophy of language: that statements are by default unmarked claims of "fact". For a Tuyuca speaker there is no such default. Every sentence is, in effect, prefaced with the epistemic equivalent of <em>"I saw"</em>, <em>"I heard"</em>, or <em>"I was told"</em>. A grammar of provenance is built into every verb.</p>
        `,
        ja: `
  <p>たとえば「ジョンが昨日サッカーをした」と話すとき、英語話者はそれだけで会話を成り立たせられる。聞き手は、話者がグラウンドで見たのか、隣の通りから歓声を聞いたのか、泥だらけのスパイクから推測したのか、友人から聞いたのか──何も知らされない。ヨーロッパ諸語では<em>情報源</em>はほぼ表に出ない。</p>
  
  <p>ところが<strong>トゥユカ語（Tuyuca）</strong>──ブラジル＝コロンビア国境のヴァウペス川流域で<strong>約1000人</strong>が話す<strong>東トゥカノ語派</strong>の言語──では、それが文法的に許されない。定動詞には必ず「どう知ったか」を示す接尾辞が付き、無印の中立形は存在しない。証拠性なしで動詞を発すれば、それは非文である。</p>
  
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
  
  <p>これは礼儀作法ではなく硬い文法制約だ。子どもは幼少期からこの体系を獲得し、雑談でも厳密に守る。喧嘩を伝え聞いて再話するとき、話者は節ごとに「自分が見たのか／又聞きか」を明示しなければならない。証拠性接辞を落とすことは、英語で「<em>yesterday he go store</em>」と言うのと同じくらい異常な発話になる。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="eye" data-code="tue">👁️ トゥユカ語の「目」</button>
  </div>
  
  <p>トゥユカ語だけが特殊なわけではない。<strong>証拠性</strong>はトゥカノ語族全体、ケチュア語、アイマラ語、トルコ語（有名な <em>-miş</em>）、ブルガリア語、韓国語、多くのチベット＝ビルマ系言語、アマゾン諸語に広く文法カテゴリーとして存在する。<strong>アレクサンドラ・アイヘンヴァルト</strong>の類型論的研究（2004）は文法化された証拠性を持つ言語を500近く集めている。ただ、トゥユカ語は「5段階」というきめ細かさと、最初に詳細に記述された言語の一つであることで際立っている。</p>
  
  <blockquote>「トゥユカ語では気軽に嘘をつけない。すべての主張に『どう手に入れた情報か』の署名が付くからだ」──アイヘンヴァルト 2004 の要約</blockquote>
  
  <p>認知への含意は議論が続く。「情報源を毎回明示する習慣は、噂や根拠への姿勢を根本から変える」と主張する研究者もいれば、「英語話者も同じ区別を表現できる──ただ義務ではないだけだ」と反論する研究者もいる。現在の合意点はおそらくその中間──義務的な文法化はその概念を認知的に目立たせるが、他言語話者が同じ区別をできなくなるわけではない、というところだ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="drink" data-code="tue">🥤 トゥユカ語の「飲む」（sĩdĩ）</button>
  </div>
  
  <p>はっきりしているのは、トゥユカ語が西欧言語哲学の暗黙の前提──「平叙文の既定値は無印の事実主張である」──をあぶり出していることだ。トゥユカ語にそんな既定値はない。すべての文の動詞には、認識論的に言えば「私は見た」「私は聞いた」「人から聞いた」が刻まれている。<strong>情報源の文法</strong>が、動詞そのものに織り込まれているのである。</p>
        `,
      },
      sources: [
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
        en: 'Guugu Yimithirr — the language with no left or right',
        ja: '「左」も「右」も使わない言語、グーグ・イミディル語',
      },
      summary: {
        en: 'An Australian Aboriginal language of Far North Queensland that uses only absolute cardinal directions — north, south, east, west — even for objects on a table. Speakers maintain dead-reckoning orientation at all times.',
        ja: 'クィーンズランド州極北のアボリジニ言語。卓上の物にも「北」「南」「東」「西」しか使わず、話者は常に絶対方位を意識し続けている。',
      },
      body: {
        en: `
  <p>If you sit down at a table with a speaker of English and they want you to pass them a cup, they will say "the cup on your left" or "the cup in front of you". The reference frame is <strong>egocentric</strong> — anchored to your body. Almost every European language works this way.</p>
  
  <p>If you sit down with a speaker of <strong>Guugu Yimithirr</strong> — a <strong>Pama-Nyungan</strong> language of Cape York Peninsula in far north Queensland, Australia — they will instead say, in effect, "the cup north of you" or "the cup to your east". Guugu Yimithirr does not just <em>prefer</em> cardinal directions. It has <strong>no productive vocabulary for left or right at all</strong> when describing the location of external objects. The body-relative axes simply are not used in the basic spatial system.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="kky" data-zoom="6">🌍 Show Guugu Yimithirr on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-15.5" data-lng="145.25" data-zoom="6">🗺️ Fly to Hopevale, Cape York</button>
  </div>
  
  <p>The system has four core terms — though as Stephen Levinson's careful fieldwork in the 1980s and 1990s showed, they are not quite "north/south/east/west" in the English sense:</p>
  
  <ul>
    <li><strong><em>gungga</em></strong> ≈ <strong>north</strong> (with axis rotated about 10–15° east of true north)</li>
    <li><strong><em>jiba</em></strong> ≈ <strong>south</strong></li>
    <li><strong><em>naga</em></strong> ≈ <strong>east</strong> (towards sunrise)</li>
    <li><strong><em>guwa</em></strong> ≈ <strong>west</strong> (towards sunset)</li>
  </ul>
  
  <p>These terms combine freely with verbs, postpositions, and even motion morphemes. You can say "I dropped it <em>nagaalu</em>" — meaning "I dropped it on the east side". A man telling a story about a fight does not say "he punched him in the face"; he says "he punched him in the north-side cheek" — and crucially, that "north" is the real-world compass north at the time of the fight, not at the time of telling.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="hand" data-code="kky">✋ See Guugu Yimithirr "Hand"</button>
  </div>
  
  <p>The cognitive consequence, documented by Levinson, John Haviland and colleagues at the Max Planck Institute, is striking. Speakers of Guugu Yimithirr maintain an unbroken <strong>dead-reckoning</strong> sense of their orientation. In experiments, they can point accurately to distant places (the sea, a neighbouring settlement, a relative's house hundreds of kilometres away) regardless of whether they are sitting in a windowless room, blindfolded, after being driven around in circles, or at the bottom of a cave. Their cardinal compass simply does not switch off.</p>
  
  <p>This is not a special skill of a few elders. It is a <strong>universal property of fluent speakers</strong>, learned in early childhood. Three-year-olds gesture cardinally. The mental machinery is constructed by the language and constantly exercised by the demand to talk about it.</p>
  
  <blockquote>"You cannot speak Guugu Yimithirr without always knowing where north is." — paraphrase of Stephen Levinson, 1997</blockquote>
  
  <p>Comparable absolute-frame systems are now known from <strong>Tzeltal Mayan</strong> in Mexico (uphill/downhill axes), <strong>Marshallese</strong> in Micronesia (seaward/landward), <strong>Balinese</strong> (mountainward/seaward), and numerous Aboriginal Australian languages — Kuuk Thaayorre, Warlpiri and Arrernte among them. The Sapir–Whorf-flavoured debate over whether language drives the spatial cognition or vice versa remains live, but the empirical fact is undisputed: speakers of absolute-frame languages perform on non-verbal orientation tasks in a measurably different way from speakers of egocentric-frame languages.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="kky">☀️ See Guugu Yimithirr "Sun"</button>
  </div>
  
  <p>Guugu Yimithirr also has another claim to fame: it is the language from which English borrowed the word <strong>"kangaroo"</strong>. James Cook's crew recorded <em>gangurru</em> in 1770 as the name of a particular large grey kangaroo species — and the word travelled the world. The language now has fewer than 1,000 fluent speakers, but its cognitive lessons have reached far further.</p>
        `,
        ja: `
  <p>英語話者の隣に座って「そのコップを取って」と頼みたいとき、私たちは「あなたの<em>左</em>のコップ」「あなたの<em>前</em>のコップ」と言う。基準は<strong>自己中心的</strong>──体に固定された軸である。ヨーロッパ系のほぼ全ての言語はこの方式を取る。</p>
  
  <p>ところがオーストラリア北部ケープ・ヨーク半島の<strong>グーグ・イミディル語（Guugu Yimithirr）</strong>──<strong>パマ・ニュンガン語族</strong>のアボリジニ言語──では、同じ場面で「あなたの<em>北</em>側のコップ」「あなたの<em>東</em>のコップ」と言う。単に絶対方位を「好む」のではない。グーグ・イミディル語には、外部の物の位置を述べるための<strong>「左／右」に相当する生産的な語彙そのものが存在しない</strong>のだ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="kky" data-zoom="6">🌍 地図でグーグ・イミディル語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="-15.5" data-lng="145.25" data-zoom="6">🗺️ ホープヴェール（ケープ・ヨーク）へ飛ぶ</button>
  </div>
  
  <p>1980〜90年代のスティーヴン・レヴィンソンによる現地調査により、基本方位語は4つあると明らかになった（英語の東西南北とぴったり同じではなく、軸が真北から10〜15度ほど東にずれている）。</p>
  
  <ul>
    <li><strong><em>gungga</em></strong>：北</li>
    <li><strong><em>jiba</em></strong>：南</li>
    <li><strong><em>naga</em></strong>：東（日の出方向）</li>
    <li><strong><em>guwa</em></strong>：西（日の入り方向）</li>
  </ul>
  
  <p>これらの語は動詞・後置詞・移動形態素と自由に結合し、「東側に落とした」「南側へ走った」のように使われる。話者が喧嘩を再話するとき、「彼は彼の顔を殴った」ではなく「彼は彼の<em>北側の頬</em>を殴った」と言う──しかもその「北」は喧嘩が起きた現場の絶対方位であって、再話している場所の方位ではない。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="hand" data-code="kky">✋ グーグ・イミディル語の「手」</button>
  </div>
  
  <p>レヴィンソン、ジョン・ハヴィランドらマックス・プランク研究所のチームが示した認知への含意は鮮烈だ。グーグ・イミディル語話者は常に<strong>推測航法</strong>的に自分の方位を把握し続けている。窓のない部屋で目隠しをされても、車でぐるぐる回された後でも、洞窟の奥に降ろされても、彼らは数百キロ離れた海や親族の家を正確に指し示すことができる。彼らの体内コンパスは決して止まらない。</p>
  
  <p>これは長老の特殊な能力ではない。<strong>流暢な話者全員に共通する性質</strong>で、幼児期に習得される。3歳児でも身振りに東西南北が現れる。言語が常に方位言及を要求し続けることで、認知的な装置が幼児期から鍛え上げられているのだ。</p>
  
  <blockquote>「北がどちらか分からなければ、グーグ・イミディル語は話せない」──スティーヴン・レヴィンソン 1997 の要約</blockquote>
  
  <p>同種の絶対基準系は、メキシコの<strong>ツェルタル・マヤ語</strong>（上り／下り）、ミクロネシアの<strong>マーシャル語</strong>（海側／陸側）、<strong>バリ語</strong>（山側／海側）、そしてオーストラリアの多くのアボリジニ諸語──クーク・タヨレ、ワルピリ、アレント──にも見られる。サピア＝ウォーフ的な「言語が空間認知を駆動するのか、逆か」の論争は今も続いているが、絶対基準系言語の話者は非言語的方位課題でも測定可能な差を示す、という事実だけは動かない。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="kky">☀️ グーグ・イミディル語の「日」</button>
  </div>
  
  <p>余談として、英語の <strong>kangaroo</strong> はこのグーグ・イミディル語から借りた語である。1770年、ジェームズ・クック隊が大型の灰色カンガルーの名として <em>gangurru</em> を記録し、世界中に広まった。現在の流暢な話者は1000人未満だが、この言語が認知科学に残した教訓ははるかに広く届いている。</p>
        `,
      },
      sources: [
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
  <p><strong>Mohawk</strong> (<em>Kanien'kéha</em>, "language of the Flint People") is one of the six languages of the Haudenosaunee Confederacy, spoken in communities in southern Quebec, Ontario, and upstate New York. It is the most-spoken member of the <strong>Iroquoian</strong> family, with roughly 3,500 speakers and a vigorous immersion-school revitalisation movement led by communities like Kahnawà:ke and Akwesasne.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="moh" data-zoom="6">🌍 Show Mohawk on map</button>
  </div>
  
  <p>Linguistically Mohawk is the textbook example of a <strong>polysynthetic language</strong> — a type in which a single verb form is built up from a long chain of obligatory and optional affixes, often expressing an entire English clause inside one word. A classic illustration, frequently cited by Marianne Mithun:</p>
  
  <blockquote><em>washakotya'tawitsherahetkvhta'se'</em><br>
  "he ruined her dress for her"</blockquote>
  
  <p>Pulling that single word apart yields roughly:</p>
  
  <ul>
    <li><em>wa-</em> — factual / past-tense prefix</li>
    <li><em>shako-</em> — masculine-singular-subject acting on feminine-singular-object ("he … her")</li>
    <li><em>-ya't-</em> — body / self reference</li>
    <li><em>-awitshera-</em> — incorporated noun root: "dress, clothing"</li>
    <li><em>-hetkv-</em> — verb root: "be bad, ruin"</li>
    <li><em>-ht-</em> — causative ("make X")</li>
    <li><em>-a's-</em> — benefactive ("for her")</li>
    <li><em>-e'</em> — punctual aspect (a single completed event)</li>
  </ul>
  
  <p>The argument structure of a whole English sentence is packed into the morphology of one verb. Mohawk also exhibits <strong>noun incorporation</strong>: a generic object noun (here, "dress") moves inside the verb stem rather than appearing as a separate word. Wallace Chafe and Mithun have shown that incorporation is governed by discourse-level rules — incorporated nouns are typically backgrounded, while independent nouns highlight a referent.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="house" data-code="moh">🏠 See Mohawk "House"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="moh">👨 See Mohawk "Father"</button>
  </div>
  
  <p>Mohawk verbs also obligatorily mark a complex <strong>pronominal prefix</strong> that fuses the person, number and gender of subject and object into one portmanteau morpheme. There are over <strong>60</strong> such prefixes in the paradigm, distinguishing for instance "I → you (sg)" from "I → you (pl)" from "you (sg) → me" — each a single syllable. Learning the prefix table is widely regarded as the steepest climb in the language.</p>
  
  <p>Polysynthesis raises a deep question for linguistic typology. Is a Mohawk "word" the same kind of unit as an English "word"? Mark Baker, in his influential <em>The Polysynthesis Parameter</em> (1996), argued that polysynthetic languages obey their own syntactic constraints — for example, no independent pronoun arguments are required because the verb already carries them — and that they represent a parametric setting alternative to languages like English. Others, including Mithun, prefer to describe Mohawk on its own terms rather than fit it into a universalist parameter.</p>
  
  <blockquote>"In Mohawk, the verb is a small theatre. The actors enter before the curtain rises and rarely leave the stage." — paraphrase of Marianne Mithun, 1999</blockquote>
  
  <p>The revival movement matters here. Kanien'kéha immersion schools — the Kahnawà:ke Survival School and the Akwesasne Freedom School are the best known — have produced a new generation of speakers who handle that 60-cell pronominal table with native fluency. Mohawk shows that polysynthesis is not a fossil of the past; it is a living grammatical strategy, just as expressive as any analytic one, and now consciously rebuilt by communities determined that <em>Kanien'kéha</em> will continue.</p>
  
  <p>Other classic polysynthetic languages — Inuktitut, Central Siberian Yupik, Chukchi, Ainu, Sora — confirm that the pattern is recurrent across continents. But for sheer density of grammatical information per word, the Iroquoian languages, and Mohawk in particular, are still the prototype the textbooks reach for first.</p>
        `,
        ja: `
  <p><strong>モホーク語</strong>（<em>Kanien'kéha</em>「火打石の民の言葉」）は、ハウデノサウニー連邦の6言語のひとつで、ケベック南部、オンタリオ、ニューヨーク州北部のコミュニティで話される。<strong>イロコイ語族</strong>最大の言語で、流暢な話者は約3500人、カナワケ、アクウェサスネといった共同体ではイマージョン教育による復興運動が活発である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="moh" data-zoom="6">🌍 地図でモホーク語を見る</button>
  </div>
  
  <p>言語学的にはモホーク語は<strong>多総合的言語（polysynthetic language）</strong>の代表例だ。動詞1つの内部に多数の義務的・任意的接辞が連結し、英語の1文丸ごとに相当する情報が詰め込まれる。マリアンヌ・ミスンが繰り返し引く例：</p>
  
  <blockquote><em>washakotya'tawitsherahetkvhta'se'</em><br>「彼は彼女のためにドレスを台無しにした」</blockquote>
  
  <p>分解すると：</p>
  
  <ul>
    <li><em>wa-</em> 事実／過去接頭辞</li>
    <li><em>shako-</em> 男性単数主語＋女性単数目的語（「彼が彼女に」）</li>
    <li><em>-ya't-</em> 身体・自己</li>
    <li><em>-awitshera-</em> 取り込み名詞「ドレス・衣服」</li>
    <li><em>-hetkv-</em> 動詞語根「悪い・台無し」</li>
    <li><em>-ht-</em> 使役（〜にする）</li>
    <li><em>-a's-</em> 受益（〜のために）</li>
    <li><em>-e'</em> 完了相</li>
  </ul>
  
  <p>英語1文ぶんの項構造がそのまま1個の動詞形態に圧縮されている。さらに「ドレス」のような一般的目的語が動詞の中に組み込まれる<strong>名詞抱合</strong>の現象も顕著だ。ウォーレス・チェイフとミスンの研究によれば、抱合の有無は談話レベルの規則に従い、抱合された名詞は背景化され、独立名詞は前景化される。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="house" data-code="moh">🏠 モホーク語の「家」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="moh">👨 モホーク語の「父」</button>
  </div>
  
  <p>動詞は<strong>代名詞接頭辞</strong>も義務的に取る。主語・目的語の人称・数・性が1音節の融合形態素として表現され、その総数は<strong>60を超える</strong>。「私→君」「私→君たち」「君→私」がそれぞれ別の1音節接頭辞となる、というわけで、学習者にとっては最大の関門だ。</p>
  
  <p>多総合性は類型論にとって深い問いを投げかける。モホーク語の「単語」は英語の「単語」と同じ単位なのか？ マーク・ベイカーは『The Polysynthesis Parameter』（1996）で、多総合的言語は固有の統語制約に従う独立したパラメータ設定だと主張した（独立代名詞項が不要なのは、動詞に既に取り込まれているからだ、等）。ミスンらは普遍的パラメータに押し込めるよりモホーク語をその固有の論理で記述すべきだと反論する。</p>
  
  <blockquote>「モホーク語の動詞は小さな劇場である。役者は幕が上がる前から舞台に立ち、ほとんど舞台を降りない」──ミスン 1999 の要約</blockquote>
  
  <p>復興運動はこの言語学的重要性と切り離せない。カナワケ・サバイバル・スクール、アクウェサスネ・フリーダム・スクールといったイマージョン校は、60超の代名詞接頭辞表を母語並みに操る新世代の話者を育てている。多総合性は化石ではない。今も生きている文法戦略で、分析的言語と同じく豊かに表現でき、<em>Kanien'kéha</em> を絶やすまいとする共同体の意志によって、現代に意識的に再建されつつあるのだ。</p>
  
  <p>他の代表的多総合的言語──イヌクティトゥット、中央シベリア・ユピック、チュクチ、アイヌ、ソラ──を見ても、この類型は大陸を越えて繰り返し現れる。だが1単語あたりの文法情報密度の高さでは、イロコイ諸語、とりわけモホーク語が、教科書が真っ先に挙げる原型であり続けている。</p>
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
        { text: 'Kanien\'kéha at Kanehsatà:ke', url: 'https://www.kanehsatake.com/language/' },
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
        en: 'A Salishan language of coastal British Columbia whose words can be entirely consonantal — whole utterances with not a single vowel.',
        ja: 'カナダ・ブリティッシュコロンビアの沿岸で話されるサリシュ語族の言語。子音だけで構成された「母音ゼロ」の語が存在し、音節核とは何かを根底から問い直す。',
      },
      body: {
        en: `
  <p>On the rugged inlets of central British Columbia, a few dozen people still speak <strong>Nuxalk</strong> (also called <em>Bella Coola</em>), a Salishan language whose phonology has astonished linguists for more than half a century. Its claim to fame: <strong>words that contain no vowels whatsoever</strong>.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="blc" data-zoom="6">🌍 Show Nuxalk on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="52.40" data-lng="-126.75" data-zoom="6">🗺️ Fly to the Bella Coola valley</button>
  </div>
  
  <p>The textbook example, first reported by <strong>Hank Nater</strong> in his 1984 grammar, is:</p>
  
  <blockquote><em>xłp̓x̣ʷłtłpłłskʷc̓</em><br>"then he had had in his possession a bunchberry plant"</blockquote>
  
  <p>Read that again. There is not a single <em>a</em>, <em>e</em>, <em>i</em>, <em>o</em>, or <em>u</em> — not even a schwa. Yet Nuxalk speakers pronounce it as a fluent, unbroken word. Other classics include <em>clhp̓xʷłtłpłłs</em> ("he had had a bunchberry plant"), <em>tłk̓ʷixʷ</em> ("you spat on me"), and even single-word sentences like <em>sps</em> ("northeast wind").</p>
  
  <p>How is this possible? In most languages, every syllable is built around a <strong>vowel</strong> — an open, sonorous nucleus that carries the breath. Nuxalk seems to break this rule. Two main analyses have been proposed:</p>
  
  <ul>
    <li><strong>Obstruents as syllabic nuclei.</strong> Nater, and later <strong>Eung-Do Cook</strong> and <strong>Bruce Bagemihl</strong>, argued that even non-sonorant consonants — stops and fricatives — can serve as the heart of a syllable in Nuxalk. The <em>s</em> in <em>sps</em> simply <em>is</em> the syllable.</li>
    <li><strong>No syllables at all.</strong> Bagemihl's influential 1991 dissertation went further and proposed that Nuxalk words are organised not into syllables but directly into <strong>moraic timing slots</strong>, making the notion of "syllable nucleus" irrelevant.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="blc">💧 See Nuxalk "water" (qla)</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="blc">☀️ See Nuxalk "sun" (snx)</button>
  </div>
  
  <p>Native speakers themselves do not perceive a "missing vowel". They do not feel they are inserting a covert schwa to make the word pronounceable — recordings and electropalatographic studies confirm the consonants run together with no measurable vocalic transition between them. The word <em>xłp̓x̣ʷłtłpłłskʷc̓</em> takes about a second to pronounce and is, to the speaker, just a word.</p>
  
  <p>The implications go far beyond Nuxalk. If a language can build words from pure obstruent strings, then the universal claim that <em>every syllable needs a vowel</em> cannot stand in its strongest form. Phonologists now distinguish more carefully between <strong>sonority</strong> (the acoustic property) and <strong>nucleus-hood</strong> (the structural role) — and Nuxalk is the example everyone teaches.</p>
  
  <p>Today fewer than 20 fluent first-language speakers of Nuxalk remain, almost all elders in Bella Coola. The Nuxalk Nation runs immersion programs and a language-house initiative; recordings made by Nater in the 1970s, and more recent work by <strong>Suzanne Gessner</strong> and the First Peoples' Cultural Council, are racing to document a phonology unlike any other.</p>
        `,
        ja: `
  <p>カナダ・ブリティッシュコロンビア州中央部の入り組んだ入江に、いまも数十人の話者を残す<strong>ヌハルク語（Nuxalk、別名 Bella Coola）</strong>がある。サリシュ語族に属するこの言語は、半世紀にわたって音韻論者を驚かせ続けてきた。最大の特徴は、<strong>母音をひとつも含まない単語</strong>が存在することだ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="blc" data-zoom="6">🌍 地図でヌハルク語を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="52.40" data-lng="-126.75" data-zoom="6">🗺️ ベラクーラ渓谷へ飛ぶ</button>
  </div>
  
  <p>もっとも有名な例は、<strong>ハンク・ネイター</strong>が1984年の文法書で報告した次の語である：</p>
  
  <blockquote><em>xłp̓x̣ʷłtłpłłskʷc̓</em><br>「そのとき彼はゴゼンタチバナの株を所有していた」</blockquote>
  
  <p>もう一度見てほしい──a も e も i も o も u もない。曖昧母音シュワーすら入っていない。それでも話者はこれを一つの流暢な単語として発音する。<em>tłk̓ʷixʷ</em>「お前は私に唾を吐いた」、<em>sps</em>「北東風」など、子音だけで完結する一語文すら存在する。</p>
  
  <p>なぜ可能なのか。多くの言語で、音節は<strong>母音</strong>という響きの核を中心に組み立てられる。ヌハルク語はこの原則を破っているように見える。研究者は大きく二つの説明を提示してきた：</p>
  
  <ul>
    <li><strong>阻害音が音節核になる。</strong> ネイター、続いて<strong>ウンド・クック</strong>と<strong>ブルース・バゲミール</strong>は、破裂音や摩擦音といった非鳴音子音すら音節核になりうると論じた。<em>sps</em> の <em>s</em> がそのまま音節そのものだ、というのである。</li>
    <li><strong>そもそも音節がない。</strong> バゲミールの1991年学位論文はさらに踏み込み、ヌハルク語の語は音節ではなく<strong>モーラ的タイミング枠</strong>に直接組織されているとした。音節核という概念自体が不要だと主張したのである。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="blc">💧 ヌハルク語の「水」（qla）</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="blc">☀️ ヌハルク語の「太陽」（snx）</button>
  </div>
  
  <p>ヌハルク語の母語話者自身は、「母音が抜けている」感覚を持たない。話者意識でも音響計測でも、子音と子音のあいだに母音的な区間は検出されない。<em>xłp̓x̣ʷłtłpłłskʷc̓</em> は約1秒で発音され、話者にとっては「ふつうの一語」である。</p>
  
  <p>影響はヌハルク語にとどまらない。「すべての音節には母音が必要」という普遍仮説は、その最強の形では維持できなくなった。現在の音韻論は<strong>響度（音響的性質）</strong>と<strong>核となる役割（構造的性質）</strong>を慎重に区別する──そのきっかけとなった例こそヌハルク語である。</p>
  
  <p>第一言語としての流暢な話者は20名を切り、ほぼ全員がベラクーラの長老世代である。ヌハルク・ネイションはイマージョン教育と「言語ハウス」運動を進め、ネイターの1970年代の録音、スザンヌ・ゲスナーらとブリティッシュコロンビア州先住民族文化評議会の近年の記録活動が、世界に二つとない音韻体系を残そうと走り続けている。</p>
        `,
      },
      sources: [
        'Nater, Hank F. (1984). The Bella Coola Language. National Museums of Canada, Mercury Series, Canadian Ethnology Service Paper No. 92.',
        'Bagemihl, Bruce (1991). "Syllable structure in Bella Coola." Linguistic Inquiry 22(4): 589–646.',
        'Newman, Stanley (1947). "Bella Coola I: Phonology." International Journal of American Linguistics 13(3): 129–134.',
        'Hoard, James E. (1978). "Obstruent clusters in Bella Coola." In Mohammad Ali Jazayery et al. (eds.), Linguistic and Literary Studies in Honor of Archibald A. Hill, Vol. 2: 113–117. Mouton.',
        { text: 'Glottolog: Bella Coola (bell1243)', url: 'https://glottolog.org/resource/languoid/id/bell1243' },
        { text: 'First Peoples\' Cultural Council: Nuxalk', url: 'https://fpcc.ca/language/nuxalk/' },
      ],
    },
    {
      id: 'hawaiian-13-phonemes',
      icon: '🌺',
      tags: ['hawaiian', 'polynesian', 'revival', 'minimal-phonemes', 'hawaii'],
      title: {
        en: 'Hawaiian — only 13 sounds, and a stunning revival',
        ja: 'たった13音──奇跡の復興を遂げたハワイ語',
      },
      summary: {
        en: 'Hawaiian has one of the smallest phoneme inventories on Earth — just 13 sounds — and was once on the edge of extinction. Today it is one of the most successful indigenous-language revivals ever recorded.',
        ja: 'ハワイ語の音素はわずか13個──世界でも屈指の少なさ。一度は消滅寸前まで追い込まれながら、近代でもっとも成功した先住民言語復興の事例として知られる。',
      },
      body: {
        en: `
  <p><strong>ʻŌlelo Hawaiʻi</strong> — the Hawaiian language — has one of the smallest sound inventories of any living language. <strong>Just 13 phonemes</strong>: 8 consonants (<em>p, k, ʻ, h, m, n, l, w</em>) and 5 vowels (<em>a, e, i, o, u</em>), each of which can be short or long. That's it. You can learn the entire alphabet, including the glottal stop <em>ʻokina</em> and the long-vowel mark <em>kahakō</em>, in an afternoon.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="haw" data-zoom="5">🌍 Show Hawaiian on the map</button>
  </div>
  
  <p>With so few building blocks, words are necessarily long and rich in vowels. The result is one of the most musical languages on Earth: <em>humuhumunukunukuapuaʻa</em> (the reef triggerfish, Hawaiʻi's state fish), <em>pāhoehoe</em> and <em>ʻaʻā</em> (smooth and jagged lava — both terms borrowed straight into geology worldwide), and the everyday <em>aloha</em>, which simultaneously means hello, goodbye, love, and compassion.</p>
  
  <p>Hawaiian descends from <strong>Proto-Polynesian</strong>, brought by voyagers from the Marquesas and Society Islands roughly 1,000–1,500 years ago. The closest living relatives are Marquesan, Tahitian, and Māori — and the historical correspondences are so regular that a Māori speaker can often guess a Hawaiian cognate at a glance (Māori <em>tangata</em> ↔ Hawaiian <em>kanaka</em>, "person"; Māori <em>whetū</em> ↔ Hawaiian <em>hōkū</em>, "star").</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="haw">☀️ See Hawaiian "sun"</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="haw">👋 See Hawaiian "Hello"</button>
  </div>
  
  <p>Then came the collapse. The <strong>1893 overthrow of the Hawaiian Kingdom</strong> and the 1898 U.S. annexation set off a generation of cultural repression. In 1896 the Republic of Hawaiʻi passed <strong>Act 57</strong>, requiring English as the sole medium of instruction in schools. Children caught speaking Hawaiian were physically punished. By 1980, fewer than 2,000 native speakers remained, almost all elderly. Linguists wrote it off as moribund.</p>
  
  <p>What happened next is one of the great stories in modern sociolinguistics. Inspired by Māori <em>Kōhanga Reo</em> ("language nests") in New Zealand, a group of educators including <strong>Larry Kimura</strong>, <strong>William H. "Pila" Wilson</strong>, and <strong>Kauanoe Kamanā</strong> founded <strong>ʻAha Pūnana Leo</strong> in 1983 — Hawaiian-only preschools where elders spoke nothing but Hawaiian to toddlers. In 1986, the 90-year ban on Hawaiian-medium schooling was finally repealed. By 1987 the first <strong>Kula Kaiapuni</strong> Hawaiian-immersion public schools opened. The University of Hawaiʻi at Hilo's <strong>Ka Haka ʻUla O Keʻelikōlani</strong> college now offers PhD coursework conducted entirely in Hawaiian — the first indigenous language in the United States to reach that level.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="19.72" data-lng="-155.08" data-zoom="7">🌋 Fly to Hilo, the heart of the revival</button>
  </div>
  
  <p>The 2016 U.S. Census estimated <strong>~18,000 Hawaiian speakers</strong>; the state's own surveys put the number near 24,000 and rising. For the first time in over a century, the language has children as native speakers again. The phoneme inventory is still 13. The future, however, has expanded immeasurably.</p>
        `,
        ja: `
  <p><strong>ʻŌlelo Hawaiʻi</strong>──ハワイ語は、現在話されている言語のなかで最少クラスの音素体系を持つ。<strong>音素はたった13個</strong>。子音8つ（<em>p, k, ʻ, h, m, n, l, w</em>）と母音5つ（<em>a, e, i, o, u</em>）、それぞれに短音と長音がある。それだけだ。声門閉鎖音「ʻokina」、長音符「kahakō」まで含めても、アルファベットは午後ひとつで覚えられる。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="haw" data-zoom="5">🌍 地図でハワイ語を見る</button>
  </div>
  
  <p>素材が少ない分、語は長く、母音が豊かに連なる。結果として世界でもっとも音楽的な言語のひとつになった──<em>humuhumunukunukuapuaʻa</em>（ハワイ州の魚）、<em>pāhoehoe</em>と<em>ʻaʻā</em>（なめらかな溶岩・ごつごつした溶岩。地質学用語として世界中に借用されている）、そしてあいさつ・別れ・愛・思いやりすべてを意味する<em>aloha</em>。</p>
  
  <p>ハワイ語は<strong>祖ポリネシア語</strong>に遡り、約1000〜1500年前にマルキーズ・ソシエテ諸島から航海者によってもたらされた。近縁言語はマルキーズ語、タヒチ語、マオリ語で、音対応が非常に規則的なため、マオリ語話者はハワイ語の同根語をしばしば即座に推測できる（マオリ<em>tangata</em>↔ハワイ<em>kanaka</em>「人」、マオリ<em>whetū</em>↔ハワイ<em>hōkū</em>「星」）。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="sun" data-code="haw">☀️ ハワイ語の「太陽」</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="hello" data-code="haw">👋 「アロハ」を見る</button>
  </div>
  
  <p>そして崩壊が訪れる。<strong>1893年のハワイ王国転覆</strong>と1898年の米国併合により、文化弾圧の一世代が始まった。1896年、ハワイ共和国は<strong>第57号法</strong>を制定し、学校の指導言語を英語に限定。校内でハワイ語を話した子どもには体罰が科された。1980年には母語話者は2000人を切り、その大半が高齢者だった。言語学者の多くは「もう手遅れだ」と書いた。</p>
  
  <p>そこから始まったのが、現代社会言語学の金字塔である。ニュージーランドのマオリ「Kōhanga Reo（言語の巣）」に学び、<strong>ラリー・キムラ</strong>、<strong>ピラ・ウィルソン</strong>、<strong>カウアノエ・カマナー</strong>らが1983年に<strong>ʻAha Pūnana Leo</strong>を設立──長老たちがハワイ語だけで幼児に話しかける、ハワイ語専用幼稚園である。1986年、90年続いたハワイ語教育禁止令がついに廃止。1987年には公立の<strong>Kula Kaiapuni</strong>イマージョン校が開校した。ハワイ大学ヒロ校の<strong>Ka Haka ʻUla O Keʻelikōlani</strong>カレッジでは、現在ハワイ語のみで博士課程を履修できる──米国の先住民言語でこのレベルに到達したのはハワイ語が初である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="panto" data-lat="19.72" data-lng="-155.08" data-zoom="7">🌋 復興の中心地ヒロへ飛ぶ</button>
  </div>
  
  <p>2016年の米国国勢調査ではハワイ語話者は<strong>約18,000人</strong>、州独自調査では24,000人以上にまで増えている。1世紀以上ぶりに、ハワイ語は再び母語話者の子どもたちを持つ言語となった。音素は13個のまま──しかし、その未来は計り知れないほど大きくなった。</p>
        `,
      },
      sources: [
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
        en: 'Nicaraguan Sign Language — a language born in real time',
        ja: 'ニカラグア手話──研究者の目の前で誕生した言語',
      },
      summary: {
        en: 'One of the best-documented cases of a new natural human language taking shape in real time — emerging among deaf Nicaraguan children when they were finally brought together in the 1970s and 80s.',
        ja: '人類言語が「ゼロから自然に生まれる」瞬間を研究者がリアルタイムで観察した、史上唯一の記録。1970〜80年代のニカラグアで、ろう児たちが集まったときに自然発生した。',
      },
      body: {
        en: `
  <p>Imagine being a linguist and getting to watch a brand-new human language take shape in real time — not creolised from an existing spoken language, but generated by children in a single generation, starting largely from their own home-sign systems and gestures. That is roughly what happened in Managua, Nicaragua, between 1977 and the early 1990s, producing what we now call <strong>Idioma de Señas de Nicaragua (ISN)</strong>, Nicaraguan Sign Language. Other recently-formed sign languages (Al-Sayyid Bedouin Sign Language in Israel, Kata Kolok in Bali) have since been studied, but ISN remains the best-documented case for cohort-by-cohort emergence.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ncs" data-zoom="7">🌍 Show Nicaraguan Sign Language on the map</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="12.13" data-lng="-86.25" data-zoom="7">🗺️ Fly to Managua</button>
  </div>
  
  <p>Before 1977, deaf Nicaraguans were isolated. Each family invented its own "<strong>home signs</strong>" — small idiolectal gesture systems used between a deaf child and immediate relatives — but the country had no deaf community, no sign language, and almost no education for deaf children. Then, in 1977, the new <strong>Centro Nacional de Educación Especial</strong> opened in Managua, followed by a vocational school in Villa Libertad in 1981. For the first time, hundreds of deaf children were brought together daily.</p>
  
  <p>The schools taught in spoken Spanish with lip-reading and finger-spelling. Officially, signing was discouraged. The children, however, did what humans always do when forced into proximity: <strong>they communicated</strong>. On the playground and on the school buses, they combined their home signs, invented new ones, and within a few years had built a shared <strong>pidgin sign system</strong>, now called <em>Lenguaje de Signos Nicaragüense (LSN)</em>.</p>
  
  <p>Then came the revolution. When younger children — preschoolers and early primary kids — entered the system in the mid-1980s, they took the older kids' pidgin as input and did something only children can do: <strong>they grammaticalised it</strong>. They added consistent spatial agreement, verb morphology, and discourse markers. By the early 1990s, the younger cohort was signing a fully grammatical, fully natural language — ISN — that the older cohort could only partly follow.</p>

  <p>The American linguist <strong>Judy Kegl</strong> was invited to study the situation in 1986. She quickly realised what she was seeing was unprecedented. Together with <strong>Ann Senghas</strong>, <strong>Marie Coppola</strong>, and others, she has documented the language across cohorts ever since. Their landmark finding:</p>
  
  <blockquote>"The children who arrived younger and in larger numbers signed in ways that were systematically more complex and more grammatical than the signing of the older first-generation cohort who provided their input." — Senghas, Kita & Özyürek, <em>Science</em> 2004</blockquote>
  
  <p>This is direct empirical support for the idea that <strong>language is a creative output of the child's mind</strong>, not just a passive recording of the input. Children in successive cohorts independently invented features — like decomposing motion events into "path" and "manner" components — that no adult had given them, and that look remarkably like features documented in other established sign languages.</p>
  
  <p>Today ISN has perhaps 3,000 signers and a robust Deaf community organised through <em>Asociación Nacional de Sordos de Nicaragua</em>. It is the youngest fully natural language on Earth — and the only one whose entire birth was caught on camera, on paper, and in linguistic fieldnotes.</p>
        `,
        ja: `
  <p>言語学者として、新しい人間言語が生まれる瞬間に立ち会えるとしたら──。借用でもクレオール化でもなく、ひと世代の子どもたちがゼロから生み出した「初期化された言語」を、リアルタイムで観察できるとしたら。1977年から1990年代初頭にかけて、ニカラグアの首都マナグアで、まさにそれが起きた。生まれたのが<strong>Idioma de Señas de Nicaragua（ISN、ニカラグア手話）</strong>である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="ncs" data-zoom="7">🌍 地図でニカラグア手話を見る</button>
    <button type="button" class="trivia-action" data-action="panto" data-lat="12.13" data-lng="-86.25" data-zoom="7">🗺️ マナグアへ飛ぶ</button>
  </div>
  
  <p>1977年以前、ニカラグアのろう者は孤立していた。各家庭でろう児と家族のあいだだけに通じる<strong>「ホームサイン」</strong>が断片的に成立してはいたが、国全体のろうコミュニティも、共通の手話も、ろう児向け教育もほぼ皆無だった。1977年、マナグアに<strong>国立特殊教育センター（Centro Nacional de Educación Especial）</strong>が開校し、1981年にはビジャ・リベルタの職業学校が続く。何百人ものろう児が初めて毎日同じ空間に集った。</p>
  
  <p>学校は口話法と指文字で指導した。手話の使用は事実上抑圧されていた。しかし、子どもたちは強制的に近接させられた人間がいつもすることをした──<strong>彼らは伝え合った</strong>。校庭やスクールバスで、各自のホームサインを混ぜ、新しいサインを発明し、数年のうちに共有された<strong>ピジン手話</strong>（後に LSN, Lenguaje de Signos Nicaragüense と呼ばれる）を作り上げた。</p>
  
  <p>真の転機は、より幼い世代──幼稚園・小学校低学年──が1980年代半ばに合流したときに起きた。彼らは年長児のピジンを入力として受け取り、子どもにしかできないことをした──<strong>それを文法化した</strong>のである。空間的一致、動詞形態論、談話標識が一貫して導入された。1990年代初頭には、若年層は完全に文法化された自然言語──ISN──を手話していた。皮肉なことに、年長の第一世代にはその一部しか理解できなかった。</p>

  <p>米国の言語学者<strong>ジュディ・ケグル</strong>は1986年に調査を依頼され、目の前で起きていることが前例のない出来事だと即座に気づいた。以後、<strong>アン・センガス</strong>、<strong>マリー・コッポラ</strong>らとともに世代別記録を続けている。彼らの代表的な発見はこうだ：</p>
  
  <blockquote>「より早期に、より多人数で合流した子どもたちは、入力を提供した年長の第一世代より、体系的により複雑で、より文法的な手話を行った」── センガス、北、オジュレク, <em>Science</em>誌, 2004年</blockquote>
  
  <p>これは「言語は子どもの心が能動的に生み出す創造的出力であり、入力の受動的な複写ではない」という主張の直接的な実証である。後続世代は、誰も教えていない特徴──たとえば移動事象を「経路」と「様態」に分解する手話特有の構造──を独立に発明し、それは世界の他の自然手話に観察される特徴と驚くほど一致した。</p>
  
  <p>現在、ISNの話者は約3,000人。<em>Asociación Nacional de Sordos de Nicaragua</em>を中心に堅固なろうコミュニティが形成されている。地球上でもっとも若い完全自然言語であり、その誕生の全過程がビデオ・論文・フィールドノートに記録された、唯一の言語である。</p>
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
        en: 'Why almost every language calls mother "mama"',
        ja: 'なぜ世界中で母は「ママ」なのか',
      },
      summary: {
        en: 'From English mama to Mandarin māma, Swahili mama, Quechua mama, and Navajo amá — unrelated languages converge on the same baby word. Roman Jakobson explained why in 1959, and it has nothing to do with shared ancestry.',
        ja: '英語 mama、中国語 māma、スワヒリ語 mama、ケチュア語 mama、ナバホ語 amá──血縁関係のない言語が同じ語形に収束する。1959年、ローマン・ヤコブソンが理由を解き明かした。共通祖先のせいではない。',
      },
      body: {
        en: `
  <p>Pick any language at random. Ask how it says "mother". The odds are uncomfortably high that the word begins with <strong>m</strong> and contains an <em>a</em>: English <em>mama</em>, Mandarin <em>māma</em>, Swahili <em>mama</em>, Quechua <em>mama</em>, Navajo <em>amá</em>, Welsh <em>mam</em>, Hebrew <em>imá</em>, Tagalog <em>nanay</em> / <em>mama</em>, Hindi <em>mā</em>, Malayalam <em>amma</em>, Hawaiian <em>makuahine</em> / <em>māmā</em>. Now ask how it says "father". Across an equally vast sample you get <strong>papa, baba, tata, dada, abba, atta</strong> — a labial or coronal stop plus <em>a</em>.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="ja,ko,zh,en,eu,ar,hi,sw" data-word="mother">🗣 Compare "mother" across 8 unrelated languages</button>
  </div>
  
  <p>This is not chance. The Yale anthropologist <strong>George P. Murdock</strong> assembled a 1959 cross-cultural dataset of 1,072 kin terms from 470 languages and found that words of the <em>mama</em> type were used for "mother" in 52% of the sample, and <em>papa</em>/<em>tata</em>/<em>baba</em>-type words for "father" in 55%. The languages span every family on Earth — Indo-European, Sino-Tibetan, Niger-Congo, Austronesian, Uto-Aztecan, Pama-Nyungan. They cannot all share a common ancestor.</p>
  
  <p>The classical explanation was given the same year by the Russian-American linguist <strong>Roman Jakobson</strong>, in a slim, beautiful paper titled <em>"Why 'Mama' and 'Papa'?"</em>. His argument runs as follows:</p>
  
  <ul>
    <li>The earliest sounds a baby produces — once the random crying phase ends — are <strong>bilabial nasals</strong> [m] and <strong>bilabial stops</strong> [p, b]. These require only that the lips close and open; no tongue control needed. The default vowel that emerges from a slightly open mouth is <strong>[a]</strong>.</li>
    <li>The very first proto-syllables a baby makes are therefore <em>ma</em>, <em>pa</em>, <em>ba</em>, repeated: <em>mama</em>, <em>papa</em>, <em>baba</em>.</li>
    <li>Adults overhearing this babble assume the baby is addressing them. Since the person almost always present when a baby vocalises is its mother, <em>mama</em> gets interpreted as "mother". The father, slightly more distant in traditional caregiving, gets <em>papa</em>.</li>
    <li>The adults <strong>reinforce</strong> the babble by responding to it, so the form <em>sticks</em> as the conventional word in that language — even though nothing in the structure of the language required it.</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="en">👩 See "mother" worldwide</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="en">👨 See "father" worldwide</button>
  </div>
  
  <p>Jakobson's account elegantly explains the exceptions, too. <strong>Georgian</strong> famously swaps the pair: <em>mama</em> means "father" and <em>deda</em> means "mother". This is no embarrassment to the theory — Jakobson's point was that <em>mama</em> is the easiest first word, not that it must mean "mother". Georgian just attached the easiest form to the slightly less expected referent. Likewise, in <strong>Old Japanese</strong>, "mother" was reconstructed as <em>papa</em> (modern <em>haha</em>, with /p/ → /h/ regular sound change), and "father" was <em>titi</em>.</p>
  
  <p>So when an English baby says <em>mama</em>, a Mandarin baby says <em>māma</em>, and a Swahili baby says <em>mama</em>, no shared ancestor is needed. The same articulatory ease meets the same caregiver, and the same word is born — independently, again and again, across every continent of human history.</p>
        `,
        ja: `
  <p>世界の言語からランダムに一つ選び、「母」をどう言うか聞いてみよう。<strong>m</strong>で始まり<em>a</em>を含む語にぶつかる確率は、不気味なほど高い。英語<em>mama</em>、中国語<em>māma</em>、スワヒリ語<em>mama</em>、ケチュア語<em>mama</em>、ナバホ語<em>amá</em>、ウェールズ語<em>mam</em>、ヘブライ語<em>imá</em>、タガログ語<em>nanay</em>/<em>mama</em>、ヒンディー語<em>mā</em>、マラヤーラム語<em>amma</em>、ハワイ語<em>makuahine</em>/<em>māmā</em>。次に「父」を尋ねると、<strong>papa, baba, tata, dada, abba, atta</strong>──唇音または歯茎閉鎖音 + <em>a</em>がやはり並ぶ。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="compare" data-codes="ja,ko,zh,en,eu,ar,hi,sw" data-word="mother">🗣 系統の異なる8言語の「母」を地図で見る</button>
  </div>
  
  <p>これは偶然ではない。エール大学の人類学者<strong>ジョージ・P・マードック</strong>は1959年に470言語1,072件の親族語彙を集計し、<em>mama</em>型が「母」の語として52%、<em>papa/tata/baba</em>型が「父」として55%の言語に現れることを示した。インド・ヨーロッパ、シナ・チベット、ニジェール・コンゴ、オーストロネシア、ユト・アステカ、パマ・ニュンガン──地球上のあらゆる語族にまたがる。共通祖先で説明することは不可能だ。</p>
  
  <p>同じ年、ロシア出身の言語学者<strong>ローマン・ヤコブソン</strong>は『なぜ「ママ」と「パパ」なのか』という美しい短論文で古典的説明を与えた。論旨はこうだ：</p>
  
  <ul>
    <li>乳児が「ランダムな泣き」の段階を抜けて最初に作る音は、<strong>両唇鼻音 [m]</strong> と<strong>両唇閉鎖音 [p, b]</strong>である。唇を閉じて開くだけでよく、舌の制御を必要としない。わずかに開いた口から自然に出る母音は<strong>[a]</strong>だ。</li>
    <li>したがって乳児の最初の原音節は <em>ma, pa, ba</em> となり、反復されて <em>mama, papa, baba</em> になる。</li>
    <li>これを聞いた大人は、赤ん坊が自分に呼びかけたと解釈する。乳児が発声するとき近くにいるのは通常母親なので、<em>mama</em> は「母」と意味づけられる。育児にやや遅れて関与する父親に <em>papa</em> が残る。</li>
    <li>大人が反応することで赤ん坊の発音は<strong>強化</strong>され、その語形が言語の慣習語として<strong>定着</strong>する──言語構造上はそうなる必然はなかったのに。</li>
  </ul>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="mother" data-code="en">👩 世界の「母」を見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="en">👨 世界の「父」を見る</button>
  </div>
  
  <p>例外もうまく説明できる。<strong>ジョージア語</strong>では<em>mama</em>が「父」、<em>deda</em>が「母」だが、これは理論への反証にはならない。ヤコブソンの主張は「<em>mama</em>は乳児にとって最も発音しやすい語である」というだけで、必ず「母」を指すとは言っていない。ジョージア語ではたまたま「父」に最易形が割り当てられただけだ。<strong>上代日本語</strong>では「母」は<em>papa</em>（規則的な p→h 変化で現代の「はは」）、「父」は<em>titi</em>だったと再構される。</p>
  
  <p>英語の赤ん坊が<em>mama</em>、中国語の赤ん坊が<em>māma</em>、スワヒリ語の赤ん坊が<em>mama</em>と言うとき、共通祖語は必要ない。同じ調音の容易さが同じ介護者と出会い、同じ語が独立に何度も生まれ続ける──人類史のあらゆる大陸で。</p>
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
        en: 'Proto-Indo-European — the language nobody ever wrote down',
        ja: '誰も書き残さなかった言語、印欧祖語',
      },
      summary: {
        en: 'Half the world\'s population speaks a descendant of Proto-Indo-European — a language spoken roughly 6,000 years ago that left no texts. Linguists have rebuilt it word by word using the comparative method, and even predicted sounds that turned out to be real.',
        ja: '世界人口の半数が話す言語の祖先──しかし文字資料はゼロ。約6,000年前に話されていた印欧祖語を、言語学者は比較方法で一語ずつ復元してきた。そして「あるはずだ」と予言した音が、後に実在することが確認されたのだ。',
      },
      body: {
        en: `
  <p>Half the people alive today speak a language descended from a single prehistoric ancestor: <strong>Proto-Indo-European</strong> (PIE). English, Spanish, Hindi, Russian, Persian, Bengali, German, French, Greek, Italian, Polish, Punjabi, Marathi — all of them, plus dozens of extinct languages like Latin, Sanskrit, Hittite, Tocharian, and Gothic — descend from a language spoken roughly <strong>6,000 years ago</strong> on the Pontic-Caspian steppe (according to the dominant Kurgan hypothesis of <strong>Marija Gimbutas</strong> and David Anthony) or, in a competing theory, in Anatolia.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="p_ine" data-zoom="3">🌍 Show the Indo-European family</button>
  </div>
  
  <p>No one ever wrote PIE down. Yet linguists confidently quote PIE words: <em>*ph₂tḗr</em> "father", <em>*méh₂tēr</em> "mother", <em>*wódr̥</em> "water", <em>*ǵneh₃- </em> "to know", <em>*kʷékʷlos</em> "wheel". How can they?</p>
  
  <p>The breakthrough came in 1786, when the British judge <strong>Sir William Jones</strong> announced before the Asiatic Society of Bengal that Sanskrit, Greek, and Latin showed a relationship "so strong, that no philologer could examine them all three, without believing them to have sprung from some common source, which, perhaps, no longer exists." Over the next century, <strong>Franz Bopp</strong>, <strong>Rasmus Rask</strong>, <strong>Jacob Grimm</strong>, and <strong>August Schleicher</strong> developed the <strong>comparative method</strong>: align cognate words across daughter languages, identify regular sound correspondences, and project them back to a reconstructed parent.</p>
  
  <p>The most famous example is <strong>Grimm's Law</strong>, formulated in 1822, which describes the systematic shift of stop consonants in the ancestor of Germanic. PIE <em>*p</em> became Germanic <em>*f</em>: hence Latin <em>pater</em> ↔ English <em>father</em>, Latin <em>piscis</em> ↔ English <em>fish</em>, Latin <em>pēs</em> ↔ English <em>foot</em>. PIE <em>*t</em> became <em>*þ</em> (the <em>th</em> sound): Latin <em>trēs</em> ↔ English <em>three</em>. The correspondences are exception-free once secondary rules (Verner's Law, 1875) are added.</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="en">👨 See "father" across Indo-European</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="en">💧 See English "Water"</button>
  </div>
  
  <p>Then comes the moment that, for many linguists, settled the question of whether reconstruction is real science. In 1879, the young Swiss linguist <strong>Ferdinand de Saussure</strong> — twenty-one years old and not yet famous as the founder of modern semiotics — published <em>Mémoire sur le système primitif des voyelles dans les langues indo-européennes</em>. To make PIE vowel alternations work out cleanly, he proposed that PIE had contained mysterious additional <em>coefficients sonantiques</em> that had since disappeared in every known daughter language — sounds we now call <strong>laryngeals</strong> (<em>*h₁, *h₂, *h₃</em>).</p>
  
  <blockquote>"There must once have existed in Indo-European a phoneme A which has left no direct trace in the historical languages..." — Saussure, 1879</blockquote>
  
  <p>It was a brilliant deduction with zero direct evidence. For almost fifty years, most Indo-Europeanists thought it was elegant speculation. Then, in 1915, the Czech scholar Bedřich Hrozný deciphered <strong>Hittite</strong> — an Indo-European language from the Bronze Age that had been buried under Anatolia for three thousand years. By 1927, the Polish linguist <strong>Jerzy Kuryłowicz</strong> noticed that Hittite preserved a consonant, written <em>ḫ</em>, in <strong>exactly the positions where Saussure had predicted his missing sound</strong>. Saussure had been dead for fourteen years. His ghosts had been real all along.</p>
  
  <p>Today PIE reconstruction has hundreds of well-established roots, a sophisticated grammar with eight cases and three genders, ablaut alternations, and even reconstructed poetry — phrases like <em>*ḱléwos n̥dʰgʷʰitóm</em> "imperishable fame", attested in both Homeric Greek (<em>kléos áphthiton</em>) and Vedic Sanskrit (<em>śrávas ákṣitam</em>). The language nobody ever wrote down may be the best-studied unwritten language in history.</p>
        `,
        ja: `
  <p>今を生きる人類の約半数が、同じひとつの先史言語の子孫を話している──<strong>印欧祖語（Proto-Indo-European、PIE）</strong>である。英語、スペイン語、ヒンディー語、ロシア語、ペルシア語、ベンガル語、ドイツ語、フランス語、ギリシア語、イタリア語、ポーランド語、パンジャブ語、マラーティー語、そしてラテン語、サンスクリット、ヒッタイト、トカラ語、ゴート語──すべて、約<strong>6,000年前</strong>のポントス・カスピ海ステップ（<strong>マリヤ・ギンブタス</strong>とデイヴィッド・アンソニーが提唱した有力なクルガン仮説）あるいは対立仮説ではアナトリアで話されていた、一つの言語の末裔である。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="focus" data-code="p_ine" data-zoom="3">🌍 印欧語族を地図で見る</button>
  </div>
  
  <p>誰もPIEを書き残さなかった。それでも言語学者はPIEの単語を堂々と引用する──<em>*ph₂tḗr</em>「父」、<em>*méh₂tēr</em>「母」、<em>*wódr̥</em>「水」、<em>*ǵneh₃-</em>「知る」、<em>*kʷékʷlos</em>「車輪」。なぜそんなことが可能なのか。</p>
  
  <p>転機は1786年。英国の判事<strong>サー・ウィリアム・ジョーンズ</strong>がベンガル・アジア協会で、サンスクリット・ギリシア語・ラテン語の類似は「いかなる文献学者もこの三言語を比較すれば、もはや現存しないかもしれない共通の源泉から生じたと信ぜざるをえない」と宣言した。続く一世紀で、<strong>フランツ・ボップ</strong>、<strong>ラスムス・ラスク</strong>、<strong>ヤーコプ・グリム</strong>、<strong>アウグスト・シュライヒャー</strong>が<strong>比較方法</strong>を完成させた──子孫言語の同根語を並べ、規則的な音対応を見出し、祖語形に投影する技法である。</p>
  
  <p>もっとも有名な例が1822年に定式化された<strong>グリムの法則</strong>。PIEの<em>*p</em>はゲルマン語で<em>*f</em>になった──ラテン語<em>pater</em>↔英語<em>father</em>、ラテン語<em>piscis</em>↔英語<em>fish</em>、ラテン語<em>pēs</em>↔英語<em>foot</em>。PIEの<em>*t</em>は<em>*þ</em>（th音）になった──ラテン語<em>trēs</em>↔英語<em>three</em>。例外と見えたものもヴェルナーの法則（1875）の追加で残らず説明され、対応は完全に規則的になった。</p>
  
  <div class="trivia-actions">
    <button type="button" class="trivia-action" data-action="setword" data-word="father" data-code="en">👨 印欧諸語の「父」を見る</button>
    <button type="button" class="trivia-action" data-action="setword" data-word="water" data-code="en">💧 英語の「水」</button>
  </div>
  
  <p>そして、比較方法が単なる類推ではなく「予測能力を持つ科学」であることが決定的に示される瞬間が訪れる。1879年、若きスイスの言語学者<strong>フェルディナン・ド・ソシュール</strong>──まだ21歳、現代記号学の創始者として有名になる前──は『印欧諸語における母音原始体系に関する覚書』を発表した。PIEの母音交替を整合的に説明するため、子孫言語すべてから消滅した謎の追加音素<em>coefficients sonantiques</em>の存在を仮定した。これが現在<strong>喉音（laryngeals、<em>*h₁, *h₂, *h₃</em>）</strong>と呼ばれる音である。</p>
  
  <blockquote>「印欧祖語にはかつて、歴史時代の諸言語にいかなる直接的痕跡も残していない音素Aが存在したに違いない……」── ソシュール、1879年</blockquote>
  
  <p>直接証拠はゼロの、純粋な理論的演繹だった。以後ほぼ半世紀、多くの印欧語学者はこれを「優雅な思弁」とみなした。ところが1915年、チェコの学者ベドジヒ・フロズニーが<strong>ヒッタイト語</strong>──3000年間アナトリアの地下に埋もれていた青銅器時代の印欧語──を解読する。1927年、ポーランドの言語学者<strong>イェジー・クリウォヴィチ</strong>は、ヒッタイト語に<em>ḫ</em>で書かれる子音が<strong>ソシュールが「あるはずだ」と予言したまさにその位置</strong>に保存されていることを発見した。ソシュールはすでに14年前に没していた。彼の「幽霊」は、初めから実在していたのである。</p>
  
  <p>現在、PIE再構は何百もの確立された語根、8格3性の精緻な文法、母音交替体系、さらには再構された詩句──ホメロスのギリシア語<em>kléos áphthiton</em>とヴェーダ・サンスクリットの<em>śrávas ákṣitam</em>に共通する<em>*ḱléwos n̥dʰgʷʰitóm</em>「不滅の名声」──まで含む。誰も書き残さなかった言語は、人類史上もっとも詳細に研究された無文字言語かもしれない。</p>
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
