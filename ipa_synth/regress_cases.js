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
    { id: 'gamma', ipa: 'jaː˥ ɣaː˦˨', date: '2026-11-10', heard: 'la la に聞こえる → 直したら雑音がきつい', fix: '有声摩擦音は声を低いブーという成分だけにし、雑音は中くらい' },
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
]);
