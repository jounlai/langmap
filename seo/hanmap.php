<?php
/**
 * seo/hanmap.php — renders a single Han Map language page or the index.
 */

declare(strict_types=1);

/** A gloss that is just the character again, its simplified / shinjitai form, or a digit (r24). */
function hm_gloss_is_echo(string $ch, string $g): bool
{
    static $var = ['鐵'=>'鐵铁鉄','龍'=>'龍龙竜','馬'=>'馬马','雞'=>'雞鸡鶏','豬'=>'豬猪','貓'=>'貓猫','鳥'=>'鳥鸟','魚'=>'魚鱼','頭'=>'頭头','兒'=>'兒儿児','門'=>'門门','飯'=>'飯饭','錢'=>'錢钱銭','來'=>'來来','飛'=>'飛飞','見'=>'見见','聞'=>'聞闻','飲'=>'飲饮','紅'=>'紅红','黃'=>'黃黄','綠'=>'綠绿緑','長'=>'長长','遠'=>'遠远','熱'=>'熱热','東'=>'東东','無'=>'無无','個'=>'個个箇','気'=>'気氣','黑'=>'黑黒'];
    if ($g === '' ) return false;
    if (preg_match('/^\d+$/', $g) || $g === $ch) return true;
    if (mb_strlen($g) !== 1) return false;
    foreach ($var as $k => $set) if ($k === $ch || mb_strpos($set, $ch) !== false) return mb_strpos($set, $g) !== false;
    return false;
}

/** Speaker chip value: the prose as is in ja, else its first figure in the UI's number style (r24). */
function hm_speakers_value(string $ui, string $raw): string
{
    // A value with no figure ("(no published count)") is shown only where it
    // has a translation; ja used to print the English as is (rally r30 a2#8).
    if (!preg_match('/\d/u', $raw)) {
        if ($ui === 'ja' && preg_match('/[\x{3041}-\x{30FA}\x{3400}-\x{9FFF}]/u', $raw)) return $raw;   // 歴史言語 / 現代話者なし
        $tr = seo_meta_value($ui, $raw);
        return ($tr !== $raw && $ui !== 'en') ? $tr : '';
    }
    if ($ui === 'ja') return seo_meta_value($ui, $raw);
    $tr = seo_meta_value($ui, $raw);
    if ($tr !== $raw && !preg_match('/[\x{3041}-\x{30FA}\x{3400}-\x{9FFF}]/u', $tr)) return $tr;   // a real translation exists
    if (!preg_match('/(\d[\d,]*(?:\.\d+)?)\s*(億|万)?人/u', $raw, $m)) return '';
    $n = (float) str_replace(',', '', $m[1]) * (($m[2] ?? '') === '億' ? 1e8 : (($m[2] ?? '') === '万' ? 1e4 : 1));
    if ($n < 1) return '';
    $more = preg_match('/以上/u', $raw) ? '+' : '';
    $trim = function (float $v, int $p, string $dec = '.'): string {
        $t = number_format($v, $p, '.', '');
        if ($p > 0) $t = rtrim(rtrim($t, '0'), '.');   // "300" must keep its zeros (r25)
        return str_replace('.', $dec, $t);
    };
    if ($ui === 'ko' || $ui === 'zh' || $ui === 'yue') {
        $wan = $ui === 'ko' ? '만' : ($ui === 'yue' ? '萬' : '万'); $yi = $ui === 'ko' ? '억' : ($ui === 'yue' ? '億' : '亿');
        $t = $n >= 1e8 ? $trim($n / 1e8, 2) . $yi : ($n >= 1e4 ? $trim($n / 1e4, 1) . $wan : number_format($n));
        return '~' . $t . $more;
    }
    $comma = in_array($ui, ['de', 'fr', 'it', 'es', 'pt', 'ru', 'uk', 'id', 'vi'], true);
    $dec = $comma ? ',' : '.';
    $M = ['de' => ' Mio.', 'fr' => ' M', 'it' => ' Mln', 'es' => ' M', 'pt' => ' mi', 'ru' => ' млн', 'uk' => ' млн', 'id' => ' jt', 'vi' => ' tr',
          'ar' => ' مليون', 'he' => ' מיליון', 'th' => ' ล้าน', 'hi' => ' मिलियन', 'sw' => ' milioni'][$ui] ?? 'M';
    $B = ['de' => ' Mrd.', 'fr' => ' Md', 'it' => ' Mrd', 'es' => ' mil M', 'pt' => ' bi', 'ru' => ' млрд', 'uk' => ' млрд', 'id' => ' M', 'vi' => ' tỷ',
          'ar' => ' مليار', 'he' => ' מיליארד', 'th' => ' พันล้าน', 'hi' => ' अरब', 'sw' => ' bilioni'][$ui] ?? 'B';
    $K = ['de' => ' Tsd.', 'fr' => ' k', 'it' => ' mila', 'es' => ' mil', 'pt' => ' mil', 'ru' => ' тыс.', 'uk' => ' тис.', 'id' => ' rb', 'vi' => ' N',
          'ar' => ' ألف', 'he' => ' אלף', 'th' => ' พัน', 'hi' => ' हज़ार', 'sw' => ' elfu'][$ui] ?? 'K';
    if ($ui === 'sw') {   // Swahili puts the unit first: "milioni 86" (r25)
        if ($n >= 1e9) return '~bilioni ' . $trim($n / 1e9, 2) . $more;
        if ($n >= 1e6) return '~milioni ' . $trim($n / 1e6, 1) . $more;
        if ($n >= 1e4) return '~elfu ' . $trim($n / 1e3, 0) . $more;
    }
    if ($n >= 1e9)      $t = $trim($n / 1e9, 2, $dec) . $B;
    elseif ($n >= 1e6)  $t = $trim($n / 1e6, 1, $dec) . $M;
    elseif ($n >= 1e4)  $t = $trim($n / 1e3, 0, $dec) . $K;
    else                $t = number_format($n, 0, $dec, $comma ? '.' : ',');
    return '~' . $t . $more;
}

/**
 * Descriptive romanization labels in the reader's language (rally r30 a2#8:
 * "Jyutping-style respelling", "MCPDict IPA with Chao tone numbers" were
 * English in every UI). System names (MCPDict, Jyutping, Hanyu Pinyin,
 * Wiktionary) stay Latin. Labels that are only a system's own name (Tâi-lô,
 * Wugniu, RTGS, Möllendorff …) are returned unchanged, tagged lang="en".
 * Returns [text, translated?].
 */
function hm_romanization_label(string $ui, string $raw): array
{
    if ($ui === 'en') return [$raw, true];
    static $EXACT = [
        'MCPDict IPA with Chao tone numbers' => [
            'ja' => 'MCPDict の IPA（趙元任の五度声調数字）', 'ko' => 'MCPDict IPA(자오위안런 5도 성조 숫자)', 'zh' => 'MCPDict 国际音标（赵元任五度调值数字）', 'yue' => 'MCPDict 國際音標（趙元任五度調值數字）',
            'vi' => 'IPA theo MCPDict, kèm số thanh điệu Chao', 'th' => 'IPA ตาม MCPDict พร้อมตัวเลขระดับเสียงแบบเจ้าหยวนเริ่น', 'id' => 'IPA MCPDict dengan angka nada Chao', 'hi' => 'MCPDict IPA, चाओ स्वर-अंकों के साथ',
            'de' => 'MCPDict-IPA mit Chao-Tonziffern', 'fr' => 'API de MCPDict avec chiffres de ton de Chao', 'it' => 'IPA di MCPDict con cifre tonali di Chao', 'es' => 'AFI de MCPDict con números tonales de Chao', 'pt' => 'AFI do MCPDict com números tonais de Chao',
            'ru' => 'МФА по MCPDict с тоновыми цифрами Чжао Юаньжэня', 'uk' => 'МФА за MCPDict із тоновими цифрами Чжао Юаньженя', 'ar' => 'الأبجدية الصوتية الدولية من MCPDict مع أرقام نغمات تشاو', 'he' => 'IPA לפי MCPDict עם ספרות טונים של צ\'או', 'sw' => 'IPA ya MCPDict pamoja na tarakimu za toni za Chao'],
        'IPA with Chao tone numbers' => [
            'ja' => 'IPA（趙元任の五度声調数字）', 'ko' => 'IPA(자오위안런 5도 성조 숫자)', 'zh' => '国际音标（赵元任五度调值数字）', 'yue' => '國際音標（趙元任五度調值數字）',
            'vi' => 'IPA kèm số thanh điệu Chao', 'th' => 'IPA พร้อมตัวเลขระดับเสียงแบบเจ้าหยวนเริ่น', 'id' => 'IPA dengan angka nada Chao', 'hi' => 'IPA, चाओ स्वर-अंकों के साथ',
            'de' => 'IPA mit Chao-Tonziffern', 'fr' => 'API avec chiffres de ton de Chao', 'it' => 'IPA con cifre tonali di Chao', 'es' => 'AFI con números tonales de Chao', 'pt' => 'AFI com números tonais de Chao',
            'ru' => 'МФА с тоновыми цифрами Чжао Юаньжэня', 'uk' => 'МФА з тоновими цифрами Чжао Юаньженя', 'ar' => 'الأبجدية الصوتية الدولية مع أرقام نغمات تشاو', 'he' => 'IPA עם ספרות טונים של צ\'או', 'sw' => 'IPA pamoja na tarakimu za toni za Chao'],
        'IPA with tone-category digit (MCPDict notation)' => [
            'ja' => 'IPA＋調類番号（MCPDict 方式）', 'ko' => 'IPA와 성조 부류 숫자(MCPDict 방식)', 'zh' => '国际音标加调类数字（MCPDict 记法）', 'yue' => '國際音標加調類數字（MCPDict 記法）',
            'vi' => 'IPA kèm số loại thanh (cách ghi của MCPDict)', 'th' => 'IPA พร้อมตัวเลขหมวดวรรณยุกต์ (ตามระบบ MCPDict)', 'id' => 'IPA dengan angka kategori nada (notasi MCPDict)', 'hi' => 'IPA, स्वर-वर्ग अंक के साथ (MCPDict पद्धति)',
            'de' => 'IPA mit Tonkategorie-Ziffer (MCPDict-Notation)', 'fr' => 'API avec chiffre de catégorie tonale (notation MCPDict)', 'it' => 'IPA con cifra della categoria tonale (notazione MCPDict)', 'es' => 'AFI con dígito de categoría tonal (notación de MCPDict)', 'pt' => 'AFI com dígito de categoria tonal (notação do MCPDict)',
            'ru' => 'МФА с цифрой тонового класса (нотация MCPDict)', 'uk' => 'МФА з цифрою тонового класу (нотація MCPDict)', 'ar' => 'الأبجدية الصوتية الدولية مع رقم فئة النغمة (ترميز MCPDict)', 'he' => 'IPA עם ספרת קטגוריית טון (סימון MCPDict)', 'sw' => 'IPA pamoja na tarakimu ya kundi la toni (mtindo wa MCPDict)'],
        'MCPDict IPA' => [
            'ja' => 'MCPDict の IPA', 'ko' => 'MCPDict IPA 표기', 'zh' => 'MCPDict 国际音标', 'yue' => 'MCPDict 國際音標', 'vi' => 'IPA theo MCPDict', 'th' => 'IPA ตาม MCPDict', 'id' => 'IPA MCPDict', 'hi' => 'MCPDict के अनुसार IPA',
            'de' => 'MCPDict-IPA', 'fr' => 'API de MCPDict', 'it' => 'IPA di MCPDict', 'es' => 'AFI de MCPDict', 'pt' => 'AFI do MCPDict', 'ru' => 'МФА по MCPDict', 'uk' => 'МФА за MCPDict', 'ar' => 'الأبجدية الصوتية الدولية من MCPDict', 'he' => 'IPA לפי MCPDict', 'sw' => 'IPA ya MCPDict'],
        'Jyutping-style respelling' => [
            'ja' => 'Jyutping（粤拼）式の表記', 'ko' => 'Jyutping(월병)식 표기', 'zh' => '仿 Jyutping（粤拼）拼写', 'yue' => '仿 Jyutping（粵拼）拼寫', 'vi' => 'cách viết theo kiểu Jyutping', 'th' => 'การสะกดแบบ Jyutping', 'id' => 'ejaan bergaya Jyutping', 'hi' => 'Jyutping-शैली की वर्तनी',
            'de' => 'Schreibung nach Art von Jyutping', 'fr' => 'graphie de type Jyutping', 'it' => 'grafia sul modello Jyutping', 'es' => 'grafía al estilo Jyutping', 'pt' => 'grafia ao estilo Jyutping', 'ru' => 'запись в стиле Jyutping', 'uk' => 'запис у стилі Jyutping', 'ar' => 'كتابة على نمط Jyutping', 'he' => 'כתיב בסגנון Jyutping', 'sw' => 'tahajia ya mtindo wa Jyutping'],
        'Hanyu Pinyin with Kaifeng tone numbers' => [
            'ja' => 'Hanyu Pinyin＋開封方言の声調数字', 'ko' => 'Hanyu Pinyin과 카이펑 방언 성조 숫자', 'zh' => '汉语拼音加开封话调值数字', 'yue' => '漢語拼音加開封話調值數字', 'vi' => 'Hanyu Pinyin kèm số thanh điệu tiếng Khai Phong', 'th' => 'Hanyu Pinyin พร้อมตัวเลขวรรณยุกต์สำเนียงไคเฟิง', 'id' => 'Hanyu Pinyin dengan angka nada dialek Kaifeng', 'hi' => 'Hanyu Pinyin, काइफ़ेंग बोली के स्वर-अंकों के साथ',
            'de' => 'Hanyu Pinyin mit Tonziffern des Kaifeng-Dialekts', 'fr' => 'Hanyu Pinyin avec chiffres tonals du parler de Kaifeng', 'it' => 'Hanyu Pinyin con cifre tonali del dialetto di Kaifeng', 'es' => 'Hanyu Pinyin con números tonales del habla de Kaifeng', 'pt' => 'Hanyu Pinyin com números tonais da fala de Kaifeng', 'ru' => 'Hanyu Pinyin с тоновыми цифрами кайфэнского говора', 'uk' => 'Hanyu Pinyin з тоновими цифрами кайфенської говірки', 'ar' => 'Hanyu Pinyin مع أرقام نغمات لهجة كايفنغ', 'he' => 'Hanyu Pinyin עם ספרות הטונים של הדיבור בקאיפנג', 'sw' => 'Hanyu Pinyin pamoja na tarakimu za toni za lahaja ya Kaifeng'],
        "Xi'an Pinyin-style spelling with Chao tone numbers" => [
            'ja' => 'Pinyin 式の西安方言表記（趙元任の五度声調数字）', 'ko' => 'Pinyin식 시안 방언 표기(자오위안런 5도 성조 숫자)', 'zh' => '仿拼音的西安话拼写（赵元任五度调值数字）', 'yue' => '仿拼音嘅西安話拼寫（趙元任五度調值數字）', 'vi' => 'cách viết kiểu Pinyin cho tiếng Tây An, kèm số thanh điệu Chao', 'th' => 'การสะกดแบบ Pinyin สำหรับสำเนียงซีอาน พร้อมตัวเลขระดับเสียงแบบเจ้าหยวนเริ่น', 'id' => "ejaan bergaya Pinyin untuk dialek Xi'an dengan angka nada Chao", 'hi' => 'शीआन बोली की Pinyin-शैली वर्तनी, चाओ स्वर-अंकों के साथ',
            'de' => "Pinyin-artige Schreibung des Xi'an-Dialekts mit Chao-Tonziffern", 'fr' => "graphie de type Pinyin pour le parler de Xi'an, avec chiffres de ton de Chao", 'it' => "grafia sul modello Pinyin per il dialetto di Xi'an, con cifre tonali di Chao", 'es' => "grafía al estilo Pinyin para el habla de Xi'an, con números tonales de Chao", 'pt' => "grafia ao estilo Pinyin para a fala de Xi'an, com números tonais de Chao", 'ru' => 'запись в стиле Pinyin для сианьского говора с тоновыми цифрами Чжао Юаньжэня', 'uk' => 'запис у стилі Pinyin для сіаньської говірки з тоновими цифрами Чжао Юаньженя', 'ar' => 'كتابة على نمط Pinyin للهجة شيآن مع أرقام نغمات تشاو', 'he' => 'כתיב בסגנון Pinyin לדיבור של שיאן, עם ספרות טונים של צ\'או', 'sw' => "tahajia ya mtindo wa Pinyin kwa lahaja ya Xi'an pamoja na tarakimu za toni za Chao"],
        'Taiyuan Pinyin-style romanization (Wiktionary)' => [
            'ja' => 'Pinyin 式の太原方言ローマ字（Wiktionary）', 'ko' => 'Pinyin식 타이위안 방언 로마자 표기(Wiktionary)', 'zh' => '仿拼音的太原话罗马字（Wiktionary）', 'yue' => '仿拼音嘅太原話羅馬字（Wiktionary）', 'vi' => 'chữ La-tinh kiểu Pinyin cho tiếng Thái Nguyên (Wiktionary)', 'th' => 'อักษรโรมันแบบ Pinyin สำหรับสำเนียงไท่หยวน (Wiktionary)', 'id' => 'romanisasi bergaya Pinyin untuk dialek Taiyuan (Wiktionary)', 'hi' => 'ताइयुआन बोली का Pinyin-शैली रोमनकरण (Wiktionary)',
            'de' => 'Pinyin-artige Umschrift des Taiyuan-Dialekts (Wiktionary)', 'fr' => 'romanisation de type Pinyin pour le parler de Taiyuan (Wiktionary)', 'it' => 'romanizzazione sul modello Pinyin per il dialetto di Taiyuan (Wiktionary)', 'es' => 'romanización al estilo Pinyin para el habla de Taiyuan (Wiktionary)', 'pt' => 'romanização ao estilo Pinyin para a fala de Taiyuan (Wiktionary)', 'ru' => 'латинизация в стиле Pinyin для тайюаньского говора (Wiktionary)', 'uk' => 'латинізація в стилі Pinyin для тайюаньської говірки (Wiktionary)', 'ar' => 'كتابة لاتينية على نمط Pinyin للهجة تاييوان (Wiktionary)', 'he' => 'תעתיק לטיני בסגנון Pinyin לדיבור של טאייואן (Wiktionary)', 'sw' => 'uandishi wa Kilatini wa mtindo wa Pinyin kwa lahaja ya Taiyuan (Wiktionary)'],
        'Changsha romanization (Wiktionary, old style)' => [
            'ja' => '長沙方言ローマ字（Wiktionary・旧方式）', 'ko' => '창사 방언 로마자 표기(Wiktionary 구식)', 'zh' => '长沙话罗马字（Wiktionary 旧式）', 'yue' => '長沙話羅馬字（Wiktionary 舊式）', 'vi' => 'chữ La-tinh tiếng Trường Sa (Wiktionary, kiểu cũ)', 'th' => 'อักษรโรมันสำเนียงฉางชา (Wiktionary แบบเก่า)', 'id' => 'romanisasi dialek Changsha (Wiktionary, gaya lama)', 'hi' => 'छांगशा बोली का रोमनकरण (Wiktionary, पुरानी शैली)',
            'de' => 'Umschrift des Changsha-Dialekts (Wiktionary, alte Form)', 'fr' => 'romanisation du parler de Changsha (Wiktionary, ancien style)', 'it' => 'romanizzazione del dialetto di Changsha (Wiktionary, vecchio stile)', 'es' => 'romanización del habla de Changsha (Wiktionary, estilo antiguo)', 'pt' => 'romanização da fala de Changsha (Wiktionary, estilo antigo)', 'ru' => 'латинизация чаншаского говора (Wiktionary, старый вариант)', 'uk' => 'латинізація чаншаської говірки (Wiktionary, старий варіант)', 'ar' => 'كتابة لاتينية للهجة تشانغشا (Wiktionary، النمط القديم)', 'he' => 'תעתיק לטיני לדיבור של צ\'אנגשה (Wiktionary, סגנון ישן)', 'sw' => 'uandishi wa Kilatini wa lahaja ya Changsha (Wiktionary, mtindo wa zamani)'],
    ];
    if (isset($EXACT[$raw][$ui])) return [$EXACT[$raw][$ui], true];
    // "Hanyu Pinyin with tone-contour superscripts (成都音)" — 12 Mandarin rows.
    if (preg_match('/^Hanyu Pinyin with tone-contour superscripts \((\p{Han}+)\)$/u', $raw, $m)) {
        $T = [
            'ja' => 'Hanyu Pinyin＋声調曲線の上付き数字（%s）', 'ko' => 'Hanyu Pinyin과 성조 곡선 위첨자(%s)', 'zh' => '汉语拼音加调值上标（%s）', 'yue' => '漢語拼音加調值上標（%s）', 'vi' => 'Hanyu Pinyin kèm chỉ số trên ghi đường nét thanh điệu (%s)', 'th' => 'Hanyu Pinyin พร้อมตัวยกแสดงระดับเสียง (%s)', 'id' => 'Hanyu Pinyin dengan superskrip kontur nada (%s)', 'hi' => 'Hanyu Pinyin, स्वर-रेखा के सुपरस्क्रिप्ट अंकों के साथ (%s)',
            'de' => 'Hanyu Pinyin mit hochgestellten Tonverlaufsziffern (%s)', 'fr' => 'Hanyu Pinyin avec exposants de contour tonal (%s)', 'it' => 'Hanyu Pinyin con apici del profilo tonale (%s)', 'es' => 'Hanyu Pinyin con superíndices de contorno tonal (%s)', 'pt' => 'Hanyu Pinyin com sobrescritos de contorno tonal (%s)', 'ru' => 'Hanyu Pinyin с надстрочными цифрами тонального контура (%s)', 'uk' => 'Hanyu Pinyin із надрядковими цифрами тонального контуру (%s)', 'ar' => 'Hanyu Pinyin مع أرقام علوية لمسار النغمة (%s)', 'he' => 'Hanyu Pinyin עם ספרות עיליות של קו הטון (%s)', 'sw' => 'Hanyu Pinyin pamoja na tarakimu za juu za mwenendo wa toni (%s)',
        ];
        if (isset($T[$ui])) return [sprintf($T[$ui], $m[1]), true];
    }
    // "Loudi romanization", "Jinhua romanization (調值 tone-value)", Wenzhou.
    if (preg_match('/^(Loudi|Jinhua|Wenzhou) romanization( \(調值 tone-value\))?$/u', $raw, $m)) {
        $C = [
            'Loudi'   => ['ja' => '婁底', 'ko' => '러우디', 'zh' => '娄底', 'yue' => '婁底', 'vi' => 'Lâu Để', 'th' => 'โหลวตี่', 'hi' => 'लोउदी', 'ru' => 'лоудиского', 'uk' => 'лоудіської', 'ar' => 'لوودي', 'he' => 'לואודי'],
            'Jinhua'  => ['ja' => '金華', 'ko' => '진화', 'zh' => '金华', 'yue' => '金華', 'vi' => 'Kim Hoa', 'th' => 'จินหัว', 'hi' => 'जिनहुआ', 'ru' => 'цзиньхуаского', 'uk' => 'цзіньхуаської', 'ar' => 'جينهوا', 'he' => 'ג\'ינחואה'],
            'Wenzhou' => ['ja' => '温州', 'ko' => '원저우', 'zh' => '温州', 'yue' => '溫州', 'vi' => 'Ôn Châu', 'th' => 'เวินโจว', 'hi' => 'वेनझोउ', 'ru' => 'вэньчжоуского', 'uk' => 'веньчжоуської', 'ar' => 'ونتشو', 'he' => 'ונג\'ואו'],
        ];
        $c = $C[$m[1]][$ui] ?? $m[1];
        $T = [
            'ja' => '%s方言ローマ字', 'ko' => '%s 방언 로마자 표기', 'zh' => '%s话罗马字', 'yue' => '%s話羅馬字', 'vi' => 'chữ La-tinh tiếng %s', 'th' => 'อักษรโรมันสำเนียง%s', 'id' => 'romanisasi dialek %s', 'hi' => '%s बोली का रोमनकरण',
            'de' => 'Umschrift des %s-Dialekts', 'fr' => 'romanisation du parler de %s', 'it' => 'romanizzazione del dialetto di %s', 'es' => 'romanización del habla de %s', 'pt' => 'romanização da fala de %s', 'ru' => 'латинизация %s говора', 'uk' => 'латинізація %s говірки', 'ar' => 'كتابة لاتينية للهجة %s', 'he' => 'תעתיק לטיני לדיבור של %s', 'sw' => 'uandishi wa Kilatini wa lahaja ya %s',
        ];
        $V = [
            'ja' => '（調値表記）', 'ko' => '(성조값 표기)', 'zh' => '（调值标记）', 'yue' => '（調值標記）', 'vi' => ' (ghi giá trị thanh điệu)', 'th' => ' (ระบุค่าระดับเสียง)', 'id' => ' (dengan nilai nada)', 'hi' => ' (स्वर-मान सहित)',
            'de' => ' (mit Tonwerten)', 'fr' => ' (avec valeurs tonales)', 'it' => ' (con valori tonali)', 'es' => ' (con valores tonales)', 'pt' => ' (com valores tonais)', 'ru' => ' (с тоновыми значениями)', 'uk' => ' (з тоновими значеннями)', 'ar' => ' (بقيم النغمات)', 'he' => ' (עם ערכי טון)', 'sw' => ' (pamoja na thamani za toni)',
        ];
        if (isset($T[$ui])) return [sprintf($T[$ui], $c) . (!empty($m[2]) ? $V[$ui] : ''), true];
    }
    return [$raw, false];
}

require_once __DIR__ . '/lib.php';

/** @var string $seo_id */
/** @var string $seo_ui */
$seo_id = $seo_id ?? '';
$seo_ui = seo_ui_norm($seo_ui ?? 'en') ?? 'en';
$data = seo_data('hanmap');

if (empty($data['langs'])) {
    seo_404('Han Map data not built. Run: node tools/export_seo_data.js', $seo_ui);
    return;
}

if ($seo_id === '') {
    seo_render_hanmap_index($data, $seo_ui);
    return;
}

if (!isset($data['langs'][$seo_id])) {
    // A code this map no longer uses may have moved; the other map may
    // still use it, which is why this runs after the lookup, not before.
    if (seo_redirect_if_renamed('hanmap', $seo_id, $seo_ui)) return;
    seo_404("Unknown Han Map language: " . $seo_id, $seo_ui);
    return;
}

seo_render_hanmap_lang($data, $seo_id, $seo_ui);


/**
 * Readings of a few common characters for the search snippet ("山＝サン、
 * 水＝スイ …"). The snippet used to be the row's description alone, which for
 * Japanese opened mid-history on 漢音 and showed no reading at all.
 */
function seo_hanmap_samples(array $lang): array
{
    $out = [];
    foreach (['人', '山', '水', '心', '日', '月'] as $ch) {
        $r = $lang['readings'][$ch][0] ?? null;
        if (!$r) {
            continue;
        }
        $nat = trim((string) ($r['native'] ?? ''));
        $sur = trim((string) ($r['surface'] ?? ''));
        $read = ($nat !== '' && $nat !== $ch && !preg_match('/^[\x{4E00}-\x{9FFF}]+$/u', $nat)) ? $nat : $sur;
        if ($read === '' || preg_match('/^[\s\x{2014}\x{2013}\-?]*$/u', $read)) {
            continue;
        }
        $out[] = [$ch, $read];
        if (count($out) >= 4) {
            break;
        }
    }
    return $out;
}

function seo_render_hanmap_lang(array $data, string $code, string $ui): void
{
    $lang = $data['langs'][$code];
    $chars = $data['chars'];

    $name = seo_pick($lang['names'] ?? [], $ui) ?: ($lang['name'] ?? $code);
    $native = $lang['native'] ?? '';
    // Proto rows: the export already drops their Japanese row label (r31 a2#6).
    if (strpos((string) ($lang['family'] ?? ''), '(proto)') !== false) $native = '';
    $desc = seo_pick($lang['description'] ?? [], $ui);
    $readingType = seo_pick($lang['readingType'] ?? [], $ui);

    $canonical = SEO_SITE . seo_path($ui, 'hanmap', $code);
    $altPath = '/hanmap/' . rawurlencode($code);
    // Search title (r28): the searched name, one alias, the native form, and what
    // the page answers — "Shanghai Wu (Shanghainese, 上海话): how 104 Chinese
    // characters are read | LangMap".
    $aliases = seo_lang_aliases($ui, $code, $name, (string) $native);
    // A proto row's `native` is a Japanese scholarly label (原始タイ語), not a
    // name the reader's search uses: kept in the hero, left out of title and
    // snippet (r29).
    $tNative = (!seo_native_redundant($name, (string) $native) && strpos((string) ($lang['family'] ?? ''), '(proto)') === false) ? $native : '';
    $paren = array_values(array_filter([seo_title_alias($aliases), $tNative]));
    $kind = seo_hanmap_kind($code, $lang);
    $title = seo_t($ui, $kind === 'reading' ? 'hm_t2' : 'hm_t2_' . $kind, ['name' => $name . ($paren ? ' (' . implode(', ', $paren) . ')' : ''), 'n' => (string) count($lang['readings'] ?? [])]) . ' | LangMap';
    $metaDesc = seo_lang_meta_lead(
        seo_hanmap_samples($lang),
        $desc !== '' ? $desc : seo_t($ui, 'hm_lang_meta', ['name' => $name . ($tNative !== '' ? " ($tNative)" : '')]),
        $ui
    );

    seo_head([
        'title' => $title,
        'description' => $metaDesc,
        'canonical' => $canonical,
        'image' => SEO_SITE . '/ogp-hanmap.png',
        'ui' => $ui,
        'altpath' => $altPath,
    ]);
    ?>
<nav class="seo-crumbs" aria-label="<?= e(seo_t($ui, 'crumbs')) ?>"><a href="<?= e(seo_path($ui, 'hanmap')) ?>">Han Map</a> <?= seo_crumb_sep($ui) ?> <?= e($name) ?></nav>
<?= seo_breadcrumb_ld([['Han Map', seo_path($ui, 'hanmap')], [$name, null]]) ?>

<header class="seo-hero">
  <?php if ($native && $native !== $name): ?>
    <?php $nl = seo_lang_attr($code); ?>
    <?php if ($nl !== ''): ?>
    <p class="native" lang="<?= e($nl) ?>"><?= e($native) ?></p>
    <?php else: // Proto-* rows: Japanese labels (原始漢蔵語), pko adds a Korean one ?>
    <p class="native"><?php foreach (explode(' / ', (string) $native) as $i => $part): ?><?= $i ? ' / ' : '' ?><span lang="<?= preg_match('/\p{Hangul}/u', $part) ? 'ko' : 'ja' ?>"><?= e($part) ?></span><?php endforeach; ?></p>
    <?php endif; ?>
  <?php endif; ?>
  <h1><?= e($name) ?></h1>
  <?php if (!empty($aliases)): ?><p class="sub aka"><?= e(seo_t($ui, 'aka', ['list' => implode($ui === 'ja' || $ui === 'zh' || $ui === 'yue' ? '、' : ', ', $aliases)])) ?></p><?php endif; ?>
  <?php if (!empty($lang['family'])): ?>
    <p class="sub"><?= seo_chip_value(seo_meta_value($ui, $lang['family']), seo_meta_value_lang($ui, (string) $lang['family'])) ?></p>
  <?php endif; ?>
</header>

<?php
    $chips = [];
    // Values, not just labels, are translated — see seo_meta_value().
    if (!empty($lang['family']))      $chips[seo_t($ui, 'family')]   = seo_meta_value($ui, $lang['family']);
    // HAN_LANG_META.speakers is Japanese prose (約400万人 (台山語・四邑片)); other
    // UIs get the figure in their own number style, or no chip (r24).
    $spkV = !empty($lang['speakers']) ? hm_speakers_value($ui, (string) $lang['speakers']) : '';
    if ($spkV !== '')                 $chips[seo_t($ui, 'speakers')] = $spkV;
    if (!empty($lang['region']))      $chips[seo_t($ui, 'region')]   = seo_meta_value($ui, $lang['region']);
    [$romV, $romTr] = !empty($lang['romanization']) ? hm_romanization_label($ui, (string) $lang['romanization']) : ['', false];
    if ($romV !== '')                 $chips[seo_t($ui, 'romanization')] = $romV;
    if ($readingType !== '')          $chips[seo_t($ui, 'reading')]  = $readingType;
    $chipLang = [];
    foreach (['family','speakers','region'] as $f)
        if (!empty($lang[$f])) $chipLang[seo_t($ui, $f)] = seo_meta_value_lang($ui, (string) $lang[$f]);
    if ($spkV !== '' && $ui !== 'ja') unset($chipLang[seo_t($ui, 'speakers')]);   // formatted in the page language
    if ($romV !== '' && !$romTr && $ui !== 'en') $chipLang[seo_t($ui, 'romanization')] = 'en';
    if ($chips): ?>
<div class="seo-meta">
  <?php foreach ($chips as $k => $v): ?>
    <span class="chip"><b><?= e($k) ?></b> <?= seo_chip_value((string) $v, $chipLang[$k] ?? '') ?></span>
  <?php endforeach; ?>
</div>
<?php endif; ?>

<?php if ($desc !== ''): ?>
<p class="seo-desc"><?= e($desc) ?></p>
<?php endif; ?>

<?php
    $lat = $lang['lat'] ?? null;
    $lng = $lang['lng'] ?? null;
    $embed = seo_map_embed(
        is_numeric($lat) ? (float) $lat : null,
        is_numeric($lng) ? (float) $lng : null,
        $name . (!seo_native_redundant($name, (string) $native) ? " ($native)" : ''),
        5,
        $ui
    );
    if ($embed !== ''):
?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'where')) ?></h2>
  <?= $embed ?>
</section>
<?php endif; ?>

<section class="seo-section">
  <?php /* The heading follows the title's $kind: native words and early loans are not "readings" (r31 a2#5). */ ?>
  <h2 id="seo-chars-h"><?= e(seo_t($ui, $kind === 'reading' ? 'chars_heading' : 'chars_heading_' . $kind, ['name' => $name])) ?></h2>
<?php
    // The table is cut into ~30-row tables (whole characters, so rowspans
    // stay inside one table). Each table after the first sits in a
    // content-visibility wrapper and is laid out only near the viewport: the
    // single 190-row table was laid out at load (mobile TBT). Separate tables
    // cannot share auto column widths, so all use table-layout:fixed and one
    // colgroup whose widths come from the longest strings printed in them.
    $romLang = (function (string $t): string { return ($t === '' || $t === 'vi') ? '' : $t . '-Latn'; })(seo_lang_attr($code));
    $groups = []; $wLabel = 0; $wIpa = 0;
    foreach ($chars as $c) {
        $readings = $lang['readings'][$c['key']] ?? null;
        if (!$readings) continue;
        $readings = array_values(array_filter($readings, fn($r) =>
            ($r['surface'] ?? '') !== '' || ($r['ipa'] ?? '') !== '' || ($r['native'] ?? '') !== ''));
        if (!$readings) continue;
        $n = count($readings); $html = ''; $tall = 0;
        foreach ($readings as $i => $r) {
            $native = $r['native'] ?? ''; $surface = $r['surface'] ?? ''; $ipa = $r['ipa'] ?? ''; $label = $r['label'] ?? '';
            if ($native === $surface) $native = '';
            if ($native !== '') $tall++;
            if ($n > 1 && $label !== '') $wLabel = max($wLabel, mb_strwidth($label));
            if ($ipa !== '') $wIpa = max($wIpa, mb_strlen($ipa) + 2);
            $wForm = max($wForm ?? 0, mb_strwidth($native) * 0.8, mb_strwidth($surface) * 0.55);   // 1.5rem native (Manchu broke mid-word at .62)
            $html .= '<tr' . ($i === 0 ? ' class="char-start"' : '') . '>';
            if ($i === 0) {
                // The meaning sits under the character, not in a column of its own:
                // the extra column pushed the readings off a phone screen (r21).
                $glT = (string) (($c['glosses'] ?? [])[$ui] ?? '');   // r22: translated meanings
                if (hm_gloss_is_echo((string) $c['char'], $glT)) $glT = '-';   // the character again (or its simplified / shinjitai form) or a digit (r24)
                $gl = $glT === '-' ? '' : ($glT !== '' ? $glT : (string) ($c['gloss'] ?? ''));
                $html .= '<td class="c-char" rowspan="' . $n . '"><span lang="zh">' . e($c['char']) . '</span>'
                       . ($gl !== '' ? '<span class="c-gl"' . ($ui !== 'en' && $glT === '' ? ' lang="en"' : '') . '>' . e($gl) . '</span>' : '') . '</td>';
            }
            $html .= '<td class="c-read">' . (($n > 1 && $label !== '') ? '<span class="rlabel">' . seo_reading_label($ui, $label) . '</span>' : '') . '</td>'
                   . '<td class="c-form" lang="' . e(seo_lang_attr($code)) . '">'
                   . ($native !== '' ? '<span class="c-native">' . e($native) . '</span>' : '')
                   . ($surface !== '' ? '<span class="c-rom"' . (($native !== '' && $romLang !== '') ? ' lang="' . e($romLang) . '"' : '') . '>' . e($surface) . '</span>' : '')
                   . '</td><td class="c-ipa">' . ($ipa !== '' ? '<bdi dir="ltr">/' . e($ipa) . '/</bdi>' : '') . '</td></tr>';
        }
        $groups[] = ['html' => $html, 'rows' => $n, 'tall' => $tall];
    }
    $chunks = []; $cur = []; $rows = 0;
    foreach ($groups as $g) {
        $cur[] = $g; $rows += $g['rows'];
        if ($rows >= 30) { $chunks[] = $cur; $cur = []; $rows = 0; }
    }
    if ($cur) $chunks[] = $cur;
    // No reading labels in this row at all (mnc, pst, th …): drop the empty
    // Reading column, which took a phone's width and pushed Form off-screen.
    $hasRead = $wLabel > 0;
    if (!$hasRead) foreach ($chunks as &$chR) foreach ($chR as &$gR) $gR['html'] = str_replace('<td class="c-read"></td>', '', $gR['html']);
    unset($chR, $gR);
    $th = [seo_t($ui, 'th_char'), seo_t($ui, 'th_read'), seo_t($ui, 'th_form'), 'IPA'];
    $hdr = fn(string $s): float => mb_strwidth($s) * 0.7 + 1.8;          // .8rem caps + .04em letter-spacing + padding (0.5 broke "CHARACT/ER")
    $wC = max(5.2, $hdr($th[0]));                                       // char + its gloss underneath (wraps)
    $wR = $hasRead ? min(9, max($hdr($th[1]), $wLabel * 0.36 + 2.5)) : 0;   // .68rem chip; long labels wrap
    $wI = max($hdr($th[3]), min(14, $wIpa * 0.52 + 1.7));               // .9rem IPA
    $wF = max(8, $hdr($th[2]), min(16, ($wForm ?? 0) + 1.7));           // form: room for the longest form (+ .85rem padding x2)
    $tw = $wC + $wR + $wI + $wF;
    $colgroup = '<colgroup>' . sprintf('<col style="width:%.1frem">', $wC)
        . ($hasRead ? sprintf('<col style="width:%.1frem">', $wR) : '') . sprintf('<col><col style="width:%.1frem"></colgroup>', $wI);
    $thead = '<thead><tr>'
        . '<th class="c-char" scope="col">' . e($th[0]) . '</th>'
        . ($hasRead ? '<th class="c-read" scope="col">' . e($th[1]) . '</th>' : '') . '<th class="c-form" scope="col">' . e($th[2]) . '</th>'
        . '<th class="c-ipa" scope="col">IPA</th></tr></thead>';
    // Later chunks: the header names for screen readers (aria-label) and for
    // print (data-h, drawn by CSS), but no text that find-in-page would hit.
    $cls = ['c-char', 'c-read', 'c-form', 'c-ipa'];
    $theadQuiet = '<thead><tr>';
    foreach ($th as $i => $h) { if ($i === 1 && !$hasRead) continue; $theadQuiet .= '<th class="' . $cls[$i] . '" scope="col" aria-label="' . e($h) . '" data-h="' . e($h) . '"></th>'; }
    $theadQuiet .= '</tr></thead>';
?>
  <div class="seo-chartable-wrap" tabindex="0" role="region" aria-labelledby="seo-chars-h" style="--tw:<?= sprintf('%.1f', $tw) ?>rem">
  <?php foreach ($chunks as $k => $ch):
      $body = implode('', array_column($ch, 'html'));
      $table = '<table class="seo-chartable" aria-labelledby="seo-chars-h">' . $colgroup . ($k === 0 ? $thead : $theadQuiet) . '<tbody>' . $body . '</tbody></table>';
      if ($k === 0): echo $table, "\n";
      else: ?>
  <div class="seo-chartable-chunk" style="--r:<?= array_sum(array_column($ch, 'rows')) ?>;--n:<?= array_sum(array_column($ch, 'tall')) ?>"><?= $table ?></div>
  <?php endif; endforeach; ?>
  </div>
</section>

<?php $sources = $lang['sources'] ?? []; if ($sources): ?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'sources')) ?></h2>
  <ul class="seo-sources">
    <?php foreach ($sources as $s):
        $st = $s['title'] ?? ''; $su = $s['url'] ?? '';
        if ($st === '') continue; ?>
      <?php $sl = seo_src_lang($st, $ui); ?>
      <li<?= $sl !== '' ? ' lang="' . $sl . '"' : '' ?>><?php if ($su): ?><a href="<?= e($su) ?>" rel="nofollow noopener"><?= e($st) ?></a><?php else: ?><?= e($st) ?><?php endif; ?></li>
    <?php endforeach; ?>
  </ul>
</section>
<?php endif; ?>

<div class="seo-applink">
  <a href="/hanmap.html#lang=<?= e(rawurlencode($code)) ?>&amp;ui=<?= e($ui) ?>"><?= e(seo_t($ui, 'open_app', ['name' => $name])) ?></a>
</div>
<?php
    $wm = seo_data('wordmap');
    seo_comparisons(
        'hanmap', $code, $ui,
        $wm, $data,
        $data['wordorder'][$code] ?? []
    );
    seo_related_links('hanmap', $code, $name, $data['langs'], $wm['langs'] ?? [], $ui);
    seo_foot($ui);
}


function seo_render_hanmap_index(array $data, string $ui): void
{
    $langs = $data['langs'];
    $rows = [];
    foreach ($langs as $code => $l) {
        $name = seo_pick($l['names'] ?? [], $ui) ?: ($l['name'] ?? $code);
        $rows[] = ['code' => $code, 'name' => $name];
    }
    usort($rows, fn($a, $b) => strcasecmp($a['name'], $b['name']));

    seo_head([
        'title' => seo_t($ui, 'hm_index_title', ['n' => (string) count($langs)]) . ' | LangMap',
        'description' => seo_t($ui, 'hm_index_desc', [
            'c' => (string) count($data['chars']),
            'n' => (string) count($langs),
        ]),
        'canonical' => SEO_SITE . seo_path($ui, 'hanmap'),
        'image' => SEO_SITE . '/ogp-hanmap.png',
        'ui' => $ui,
        'altpath' => '/hanmap/',
    ]);
    ?>
<nav class="seo-crumbs" aria-label="<?= e(seo_t($ui, 'crumbs')) ?>"><a href="<?= e(seo_path($ui, '')) ?>">LangMap</a> <?= seo_crumb_sep($ui) ?> Han Map</nav>
<header class="seo-hero">
  <h1>Han Map</h1>
  <p class="sub"><?= e(seo_t($ui, 'hm_index_sub', ['c' => (string) count($data['chars']), 'n' => (string) count($langs)])) ?></p>
</header>
<div class="seo-applink">
  <a href="/hanmap.html"><?= e(seo_t($ui, 'open_app_hm')) ?></a>
</div>
<p class="seo-crumbs"><?= e(seo_t($ui, 'see_also')) ?>: <a href="<?= e(seo_path($ui, 'wordmap')) ?>"><?= e(seo_t($ui, 'wm_link')) ?></a> · <a href="<?= e(seo_path($ui, 'trivia')) ?>"><?= e(seo_t($ui, 'tri_link')) ?></a> · <a href="<?= e(seo_path($ui, '')) ?>"><?= e(seo_t($ui, 'home')) ?></a></p>

<section class="seo-section">
  <h2><?= e(seo_t($ui, 'languages')) ?> (<?= count($rows) ?>)</h2>
  <ul class="seo-index-list">
    <?php foreach ($rows as $r): ?>
      <li><a href="<?= e(seo_path($ui, 'hanmap', $r['code'])) ?>"><?= e($r['name']) ?></a>
        <span class="code"><?= e($r['code']) ?></span></li>
    <?php endforeach; ?>
  </ul>
</section>
<?php
    seo_foot($ui);
}
