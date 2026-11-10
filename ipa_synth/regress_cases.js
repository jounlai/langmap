/**
 * ipa_synth/regress_cases.js — every word the owner reported as sounding wrong, with what
 * was wrong and what was changed. Read by ipa_synth/check.html (listen again) and by
 * tools/ipa_synth_regress.js (check_all: the fix must still be in the plan).
 * Add a case here whenever a new report is fixed.
 */
(function (root, data) {
    if (typeof module === 'object' && module.exports) module.exports = data;
    else root.IPA_REGRESS = data;
})(typeof self !== 'undefined' ? self : this, [
    { id: 'adams', ipa: 'ædəmz æpəl', date: '2026-11-10', heard: 'Adam’s apple に聞こえない', fix: '強勢のない句で各語の最初の母音を強く、ə を短く、強い音節で音程の山' },
    { id: 'bursts', ipa: 'pʰa tʰa kʰa', date: '2026-11-10', heard: '破裂音がスパイク音すぎる', fix: '破裂を14 msに延ばし、約7 dB弱く、なだらかに減衰' },
    { id: 'apan', ipa: 'apan', date: '2026-11-10', heard: 'bapan に聞こえる', fix: '無音のあいだも最初の母音の構えで待ち、声をゆっくり立ち上げる' },
    { id: 'shui', ipa: 'ʂweɪ̯˧˩˧', date: '2026-11-10', heard: '発音がおかしい（e が長い）', fix: '二重母音の前半を4割弱にし、後半で滑らかに移る' },
    { id: 'siang', ipa: 'siəŋ˨˩˧', date: '2026-11-10', heard: '発音がおかしい（2音節に聞こえる）', fix: '声調音節の中の母音の連続は1音節：最も広い母音が中心、他はわたり音' },
    { id: 'lei', ipa: 'lei˧˥', date: '2026-11-10', heard: '二重母音の最初の音が長い', fix: '二重母音の前半を短く（38%）' },
    { id: 'neutral', ipa: 'pjɛn˥˩ pjɛn', date: '2026-11-10', heard: '軽声が中間の高さ', fix: '軽声は前の声調で高さが決まる（下降の後は低い）、短め' },
    { id: 'j', ipa: 'ja aja', date: '2026-11-10', heard: 'j が l に聞こえる（ゆっくりなら j、普通の速さだと l）', fix: 'j・w・ɥ を i・u・y と同じくっきりした共鳴のわたり音に。後ろの母音へ約95 msかけてゆっくり移る' },
    { id: 'xue', ipa: 'xuə˥˥', date: '2026-11-10', heard: 'khule に聞こえる', fix: 'u を止まらず通過するわたり音に、x の摩擦を強く長く' },
    { id: 'korean', ipa: 'soɾɯm / tak̚s͈al', date: '2026-11-10', heard: '소름 / 닭살 の最初しか読まない', fix: '「/」「~」「;」で区切られた語を全部、間を置いて読む' },
    { id: 'gamma', ipa: 'jaː˥ ɣaː˦˨', date: '2026-11-10', heard: 'la la → 雑音がきつい → ya dha（ð）→ va に聞こえる', fix: '雑音を第2・第3共鳴に通す（並列フォルマント）。有声の後ろの摩擦音は、声をぼかしつつ軟口蓋の共鳴のくびれは残し、雑音をその高さにまとめる' },
    { id: 'burmese', ipa: 'tɕɛʔθéɪɴtʰa̰', date: '2026-11-10', heard: 'éɪ の é が長い', fix: '声調記号の付いた母音を中心に、続く母音はわたり音' },
    { id: 'palatal', ipa: 'ɡʲɯːɲɯː', date: '2026-11-10', heard: 'ʲ と ɲ のあとに「イ」がはっきりしない', fix: 'ʲ の後に50 ms、ɲ c ɟ ʎ の後に40 msのはっきりした j' },
    { id: 'capital', ipa: '*dAk', date: '2026-11-10', heard: 'dAk の母音が再生されない', fix: '再構形の大文字（A, C, N, R, S, V …）を想定音に読み替え（A→a, C→ts, N→ʎ, R→ʀ …）' },
    { id: 'glottal', ipa: 'ʔiɕi', date: '2026-11-10', heard: 'ʔ が表現できている？', fix: '声の急な立ち上がりと短いきしみ声で ʔ を聞かせる（母音の後は閉鎖の前にもきしみ）' },
    { id: 'klox', ipa: 'klox', date: '2026-11-10', heard: 'x がのどからではなく口笛のように聞こえる', fix: '後ろの摩擦音（x χ ħ ɣ ʁ）は雑音の帯を広げ、音量を不規則に揺らしてのどの粗さを出す' },
    { id: 'into_ja', ipa: 'mizɯ', lang: 'ja', date: '2026-11-10', heard: 'イントネーションが全然ない（各言語の特徴を）', fix: '日本語（標準語）：最初の拍が低く2拍目から高い（平板型。アクセント核のデータはない）' },
    { id: 'into_fr', ipa: 'ʃɛʁ də pul', lang: 'fr', date: '2026-11-10', heard: '同上', fix: 'フランス語：各語の最後の音節に山、句の途中は上がり、文末は下がる' },
    { id: 'into_ko', ipa: 'tʰaŋ', lang: 'ko', date: '2026-11-10', heard: '同上', fix: '韓国語（ソウル）：激音・濃音・s・h で始まる語は高く、それ以外は低く始まる' },
    { id: 'into_zh', ipa: 'ni˨˩˦ xaʊ̯˨˩˦', lang: 'zh', date: '2026-11-10', heard: '同上', fix: '中国語：3声＋3声は前が2声（35）、3声＋他は半3声（21）' },
    { id: 'into_tr', ipa: 'kaɾdaʃ', lang: 'tr', date: '2026-11-10', heard: '同上', fix: '強勢記号のない語は、言語ごとの位置に強勢（フィンランド語は語頭、ポーランド語は後ろから2番目、トルコ語は語末 …）' },
    { id: 'natural', ipa: 'ˈpata', lang: 'en', date: '2026-11-10', heard: '機械音っぽさを和らげて（論文調査）', fix: 'LF/Rd声帯波形、声門周期に同期した息の雑音、flutter・jitter・shimmer、弱音節と文末の息もれ、マイクロプロソディ' },
    { id: 'velar', ipa: 'ka ta', date: '2026-11-10', heard: 'k が t に聞こえる → fofoge・ボイパの口笛', fix: '破裂の雑音を軟口蓋のくびれ（第2・第3共鳴）に通す、揺らしなし、22 ms。旧: 軟口蓋・口蓋垂の破裂を長く（26 ms）強く帯域を絞り、細かく途切れさせる。破裂後の息も長く' },
    { id: 'clear_u', ipa: 'ɡʲɯːɲɯː', lang: 'ja', date: '2026-11-10', heard: 'ɯ をもっとはっきりした母音に（2回）', fix: 'ɯ の第1共鳴を少し上げる（約310 Hz）。母音の共鳴を鋭く、わたり音からの移りは母音の4割まで、文末の息もれを弱く' },
    { id: 'staccato', ipa: 'kɵkɵˈɡe', date: '2026-11-10', heard: 'k がスタッカートのよう（機械音の理由かも）', fix: '母音のあとの閉鎖では声を約25 msかけて減衰、母音間の閉鎖は短め（50 ms）、破裂後の声は約16 msで立ち上げ' },
    { id: 'xwo', ipa: 'xwo˧˩˧', lang: 'zh', date: '2026-11-10', heard: 'x が sh → fwo に聞こえる（のどの奥の音に）', fix: '奥の子音の雑音を声道の第2・第3共鳴に直接通す（並列フォルマント）。中国語の x は口蓋垂寄り [χ]、第2共鳴中心（約1.1〜1.3 kHz）。旧: x の雑音の高さを後ろの母音に合わせる（o・u の前は約1 kHz）、帯は中くらい（1.2 kHz）' },
    { id: 'voicing_zh', ipa: 'ta˥˩ mu˧˩˧ ʈʂɨ˧˩˧', lang: 'zh', date: '2026-11-10', heard: 'ʈʂɨ は実際には有声化しているのに破裂音のまま → ta mu ni に聞こえる', fix: '母音などにはさまれた無気の破裂音・破擦音は有声（中国語・広東語・韓国語）。有声の破擦音は声をぼかし摩擦を残す。中国語の -i（ɨ）は舌尖母音 ʅ/ɿ' },
    { id: 'gamma_par', ipa: 'jaː˥ ɣaː˦˨', date: '2026-11-10', heard: 'ɣa が va に聞こえる', fix: 'ɣ の雑音も第2・第3共鳴に通す（並列フォルマント）' },
    { id: 'rise', ipa: 'tʰaɪ̯˥˩ jɑŋ˧˥', lang: 'zh', date: '2026-11-10', heard: 'jɑŋ˧˥ が上がらず高いままに聞こえる', fix: '上昇調は始めにわずかに沈み、後半で急に上がる形（Xu 1997）。前の声調からの戻りは音節の頭で済ませる' },
    { id: 'medial', ipa: 'miŋ˧˥ tʰjɛn˥', lang: 'zh', date: '2026-11-10', heard: 'j がちょっと長い', fix: '子音の後の j・w（介音）は約35 msの速いわたり。単独の j（ja, aja）は65 msのまま' },
    { id: 'snau', ipa: 'ɕi̯ɑʊ̯˨˩˦', lang: 'zh', date: '2026-11-10', heard: 'ɕi̯ɑʊ̯ が snau、ɕɥɛ が sne に聞こえる', fix: '声の高域を持ち上げる（狭い母音・わたり音の第2・第3共鳴が第1共鳴より35 dB弱く、こもって n のようだった → 約25 dB）。子音の後の i̯ u̯ は止まらず通過' },
    { id: 'tabako', ipa: 'taˈbako', date: '2026-11-10', heard: '子音の雑音が「ザ・音声合成」のようにはっきりしすぎ', fix: '無気の p t k は破裂を短く弱く（t 9 ms・k 14 ms、約5 dB弱く）、破裂後の息もごく弱く。有気音（ʰ）は従来どおり' },
    { id: 'implosive', ipa: 'ɗɨk˧˥', lang: 'vi', date: '2026-11-10', heard: 'Đức の入破音（吸気音）があいまい → k がはっきり詰まらない、ɨ が長い', fix: '語末の開放しない閉鎖は声をぷつっと止め声門も閉じる。その音節の母音は短く（105 ms以下）。閉鎖中に声がだんだん強くなる（喉頭が下がる）、破裂の雑音はほぼなし、母音の出だしに軽いきしみ。語末の破裂音はベトナム語・広東語・タイ語・韓国語などでは開放しない' },
    { id: 'tuan', ipa: 'twən˨˩', lang: 'vi', date: '2026-11-10', heard: 'tuần が nuan, uan に聞こえる', fix: '語末判定の誤り（次が子音なら語末としていた）で t の破裂が消えていた → 直前が母音で後ろに母音が来ない時だけ語末。無気音を弱くするのは母音の間だけ' },
    { id: 'anh', ipa: 'aɲ˧', lang: 'vi', date: '2026-11-10', heard: 'anh が an に聞こえる（ayn のように）', fix: '音節末の ɲ の前で母音を i の方向へ滑らせる（[ajŋ] に近い）' },
]);
