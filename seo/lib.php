<?php
/**
 * seo/lib.php — shared helpers + data loading for the SSR SEO pages.
 *
 * Data comes from the JSON emitted by `node tools/export_seo_data.js`
 * (data/wordmap_seo.json, data/hanmap_seo.json). The JS files remain the
 * single source of truth; regenerate the JSON when they change.
 */

declare(strict_types=1);

// --- mbstring polyfill: a fresh `php-cli` install may lack ext-mbstring,
//     which would fatal on the mb_* calls below. Proper multibyte handling
//     (CJK / Arabic / IPA) is best with the real extension — install it via
//     `apt-get install php-mbstring` — but these pure-PHP fallbacks keep the
//     pages rendering on a minimal PHP. Skipped entirely when mbstring loads.
if (!function_exists('mb_strlen')) {
    function mb_strlen(?string $s, ?string $enc = null): int {
        return (int) preg_match_all('/./us', (string) $s);
    }
}
if (!function_exists('mb_substr')) {
    function mb_substr(?string $s, int $start, ?int $length = null, ?string $enc = null): string {
        $chars = preg_split('//u', (string) $s, -1, PREG_SPLIT_NO_EMPTY);
        $slice = $length === null ? array_slice($chars, $start) : array_slice($chars, $start, $length);
        return implode('', $slice);
    }
}
if (!function_exists('mb_strrpos')) {
    function mb_strrpos(?string $haystack, string $needle, int $offset = 0, ?string $enc = null) {
        $chars = preg_split('//u', (string) $haystack, -1, PREG_SPLIT_NO_EMPTY);
        $needleChars = preg_split('//u', $needle, -1, PREG_SPLIT_NO_EMPTY);
        $nlen = count($needleChars);
        if ($nlen === 0) {
            return false;
        }
        for ($i = count($chars) - $nlen; $i >= $offset; $i--) {
            if (array_slice($chars, $i, $nlen) === $needleChars) {
                return $i;
            }
        }
        return false;
    }
}

const SEO_SITE = 'https://langmap.heuron.com';
const SEO_DATA_DIR = __DIR__ . '/../data';

// UI languages with multilingual text, mirroring the export.
const SEO_UI_LANGS = ['en', 'ja', 'ko', 'zh', 'yue', 'vi', 'th', 'id', 'hi',
    'de', 'fr', 'it', 'es', 'pt', 'ru', 'uk', 'ar', 'he', 'sw'];

// RTL UI languages (affects og:locale / dir attribute on multilingual text).
const SEO_RTL = ['ar', 'he'];

// og:locale value per UI lang.
const SEO_OG_LOCALE = [
    'en' => 'en_US', 'ja' => 'ja_JP', 'ko' => 'ko_KR', 'zh' => 'zh_CN',
    'yue' => 'zh_HK', 'vi' => 'vi_VN', 'th' => 'th_TH', 'id' => 'id_ID',
    'hi' => 'hi_IN', 'de' => 'de_DE', 'fr' => 'fr_FR', 'it' => 'it_IT',
    'es' => 'es_ES', 'pt' => 'pt_PT', 'ru' => 'ru_RU', 'uk' => 'uk_UA',
    'ar' => 'ar_001', 'he' => 'he_IL', 'sw' => 'sw_KE',
];

/** Validate / normalise a UI-lang segment. Returns null if not a UI lang. */
function seo_ui_norm(string $ui): ?string
{
    $ui = strtolower($ui);
    return in_array($ui, SEO_UI_LANGS, true) ? $ui : null;
}

/** True if the UI lang is RTL. */
function seo_is_rtl(string $ui): bool
{
    return in_array($ui, SEO_RTL, true);
}

/** og:locale for a UI lang (fallback en_US). */
function seo_locale(string $ui): string
{
    return SEO_OG_LOCALE[$ui] ?? 'en_US';
}

/** Endonym (日本語 / 한국어 / …) for a UI lang from the export. */
function seo_ui_endonym(array $data, string $ui): string
{
    $n = $data['uiLangNames'][$ui] ?? null;
    return $n ?: $ui;
}

/**
 * SEO_T[ui][key] — short UI-chrome strings. First-pass translations; the
 * user may refine. Falls back to 'en' per-key via seo_t().
 * Placeholders: {name}, {family}, {map}.
 */
const SEO_T = [
    'en' => [
        'family' => 'Family', 'speakers' => 'Speakers', 'script' => 'Script',
        'region' => 'Region', 'countries' => 'Countries', 'official' => 'Official in',
        'reading' => 'Reading',
        'th_char' => 'Character', 'th_gloss' => 'Meaning', 'th_read' => 'Reading', 'th_form' => 'Form',
        'where' => 'Where it is spoken',
        'open_app' => 'Open {name} in the interactive map →',
        'open_app_wm' => 'Open the interactive Word Map →',
        'open_app_hm' => 'Open the interactive Han Map →',
        'related' => 'Related languages & comparisons',
        'cmp_major' => 'Compare with major languages',
        'cmp_related' => 'Compare with related {family} languages',
        'cmp_note' => 'Comparisons are of word form & pronunciation (not word order).',
        'same_family' => 'Same family',
        'crossmap_wm' => 'View {name} in the Word Map',
        'crossmap_hm' => 'View {name} in the Han Map',
        'picker' => 'Language', 'switch' => 'Switch', 'stay' => 'Stay',
        'switch_to' => 'Switch to {name}?',
        'sources' => 'Sources', 'languages' => 'Languages',
        'hidden' => 'Historical & hidden varieties',
        'foot' => 'Part of LangMap — a linguistic visualization project. This is a static, crawlable summary; the interactive maps offer pronunciation audio, filters, and a globe view.',
        'words_heading' => '20 core words in {name}',
        'chars_heading' => 'Han character readings in {name}',
        'hidden_tag' => 'historical / hidden variety',
        'wm_lang_title' => '20 words & pronunciations',
        'hm_lang_title' => 'Han character readings',
        'wm_lang_meta' => 'Pronunciations of 20 core words in {name}, with IPA and native forms, on the LangMap Word Map.',
        'hm_lang_meta' => 'Readings of Han characters in {name} on the LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 core words across {n} languages',
        'wm_index_desc' => 'Browse pronunciations of 20 core words (water, fire, sun, moon, mother, …) with IPA and native forms across {n} languages and varieties on the LangMap Word Map.',
        'hm_index_title' => 'Han Map — Han character readings across {n} languages',
        'hm_index_desc' => 'Compare readings of {c} core Han characters (一 二 三 日 月 山 水 …) across {n} Sinitic, Japonic, Koreanic and Vietic varieties on the LangMap Han Map.',
        'wm_index_sub' => '20 core words in {n} languages and varieties — native forms with IPA pronunciation.',
        'hm_index_sub' => '{c} core Han characters across {n} languages and varieties — surface forms with IPA / romanized readings.',
        'see_also' => 'See also',
        'home' => 'LangMap home',
        'hub_title' => 'LangMap — Word Map & Han Map (text index)',
        'hub_desc' => 'Crawlable text index of the LangMap Word Map and Han Map: core-word pronunciations and Han-character readings per language.',
        'hub_h1' => 'LangMap text index',
        'hub_sub' => 'Server-rendered, crawlable summaries of each language.',
        'maps' => 'Maps',
        'wm_link' => 'Word Map — 20 core words',
        'hm_link' => 'Han Map — Han character readings',
        'nf_title' => 'Not found',
        'nf_wm' => 'Word Map index',
        'nf_hm' => 'Han Map index',
    ],
    'ja' => [
        'family' => '語族', 'speakers' => '話者数', 'script' => '文字',
        'region' => '地域', 'countries' => '国', 'official' => '公用語',
        'reading' => '読み',
        'th_char' => '漢字', 'th_gloss' => '意味', 'th_read' => '発音区分', 'th_form' => '表記',
        'where' => '話される地域',
        'open_app' => '{name}をインタラクティブマップで開く →',
        'open_app_wm' => 'インタラクティブな Word Map を開く →',
        'open_app_hm' => 'インタラクティブな Han Map を開く →',
        'related' => '関連言語・比較',
        'cmp_major' => '主要言語と比較',
        'cmp_related' => '{family}系の言語と比較',
        'cmp_note' => '比較は語形・発音の比較です（語順の比較ではありません）。',
        'same_family' => '同じ語族',
        'crossmap_wm' => '{name}を Word Map で見る',
        'crossmap_hm' => '{name}を Han Map で見る',
        'picker' => '言語', 'switch' => '切り替える', 'stay' => 'このまま',
        'switch_to' => '{name}に切り替えますか？',
        'sources' => '出典', 'languages' => '言語',
        'hidden' => '歴史的・非表示の変種',
        'foot' => 'LangMap — 言語の可視化プロジェクトの一部です。これは静的でクロール可能な要約です。インタラクティブマップでは発音音声・フィルター・地球儀ビューを利用できます。',
        'words_heading' => '{name}の基本20語',
        'chars_heading' => '{name}の漢字の読み',
        'hidden_tag' => '歴史的・非表示の変種',
        'wm_lang_title' => '20語と発音',
        'hm_lang_title' => '漢字の読み',
        'wm_lang_meta' => 'LangMap Word Map での、{name}の基本20語の発音（IPA・現地表記つき）。',
        'hm_lang_meta' => 'LangMap Han Map での、{name}の漢字の読み。',
        'wm_index_title' => 'Word Map — {n}言語の基本20語',
        'wm_index_desc' => 'LangMap Word Map で、{n}の言語・変種にわたる基本20語（水・火・太陽・月・母…）の発音をIPA・現地表記つきで閲覧できます。',
        'hm_index_title' => 'Han Map — {n}言語の漢字の読み',
        'hm_index_desc' => 'LangMap Han Map で、{n}の漢語・日本語・朝鮮語・ベトナム語系の変種にわたる{c}の基本漢字（一 二 三 日 月 山 水…）の読みを比較できます。',
        'wm_index_sub' => '{n}の言語・変種における基本20語 — 現地表記とIPA発音。',
        'hm_index_sub' => '{n}の言語・変種にわたる{c}の基本漢字 — 表記とIPA／ローマ字読み。',
        'see_also' => '関連',
        'home' => 'LangMap ホーム',
        'hub_title' => 'LangMap — Word Map と Han Map（テキスト索引）',
        'hub_desc' => 'LangMap の Word Map と Han Map のクロール可能なテキスト索引。言語ごとの基本語の発音と漢字の読み。',
        'hub_h1' => 'LangMap テキスト索引',
        'hub_sub' => 'サーバーレンダリングされた、各言語のクロール可能な要約。',
        'maps' => 'マップ',
        'wm_link' => 'Word Map — 基本20語',
        'hm_link' => 'Han Map — 漢字の読み',
        'nf_title' => '見つかりません',
        'nf_wm' => 'Word Map 索引',
        'nf_hm' => 'Han Map 索引',
    ],
    'ko' => [
        'family' => '어족', 'speakers' => '사용자', 'script' => '문자',
        'region' => '지역', 'countries' => '국가', 'official' => '공용어',
        'reading' => '독음',
        'th_char' => '한자', 'th_gloss' => '뜻', 'th_read' => '독음', 'th_form' => '표기',
        'where' => '사용 지역',
        'open_app' => '{name}을(를) 인터랙티브 지도에서 열기 →',
        'open_app_wm' => '인터랙티브 Word Map 열기 →',
        'open_app_hm' => '인터랙티브 Han Map 열기 →',
        'related' => '관련 언어 및 비교',
        'cmp_major' => '주요 언어와 비교',
        'cmp_related' => '{family} 계열 언어와 비교',
        'cmp_note' => '비교는 어형·발음 비교입니다(어순 비교가 아닙니다).',
        'same_family' => '같은 어족',
        'crossmap_wm' => '{name}을(를) Word Map에서 보기',
        'crossmap_hm' => '{name}을(를) Han Map에서 보기',
        'picker' => '언어', 'switch' => '전환', 'stay' => '유지',
        'switch_to' => '{name}(으)로 전환할까요?',
        'sources' => '출처', 'languages' => '언어',
        'hidden' => '역사적·숨겨진 변종',
        'foot' => 'LangMap — 언어 시각화 프로젝트의 일부입니다. 정적이고 크롤링 가능한 요약이며, 인터랙티브 지도에서는 발음 음성, 필터, 지구본 보기를 제공합니다.',
        'words_heading' => '{name}의 핵심 단어 20개',
        'chars_heading' => '{name}의 한자 독음',
        'hidden_tag' => '역사적·숨겨진 변종',
        'wm_lang_title' => '단어 20개와 발음',
        'hm_lang_title' => '한자 독음',
        'wm_lang_meta' => 'LangMap Word Map에서 {name}의 핵심 단어 20개 발음(IPA·고유 표기 포함).',
        'hm_lang_meta' => 'LangMap Han Map에서 {name}의 한자 독음.',
        'wm_index_title' => 'Word Map — {n}개 언어의 핵심 단어 20개',
        'wm_index_desc' => 'LangMap Word Map에서 {n}개 언어 및 변종에 걸친 핵심 단어 20개(물, 불, 해, 달, 어머니…)의 발음을 IPA·고유 표기와 함께 둘러보세요.',
        'hm_index_title' => 'Han Map — {n}개 언어의 한자 독음',
        'hm_index_desc' => 'LangMap Han Map에서 {n}개 한어·일본어·한국어·베트남어 변종에 걸친 {c}개 핵심 한자(一 二 三 日 月 山 水…)의 독음을 비교하세요.',
        'wm_index_sub' => '{n}개 언어 및 변종의 핵심 단어 20개 — 고유 표기와 IPA 발음.',
        'hm_index_sub' => '{n}개 언어 및 변종에 걸친 {c}개 핵심 한자 — 표기와 IPA／로마자 독음.',
        'see_also' => '함께 보기',
        'home' => 'LangMap 홈',
        'hub_title' => 'LangMap — Word Map과 Han Map(텍스트 색인)',
        'hub_desc' => 'LangMap Word Map과 Han Map의 크롤링 가능한 텍스트 색인. 언어별 핵심 단어 발음과 한자 독음.',
        'hub_h1' => 'LangMap 텍스트 색인',
        'hub_sub' => '서버에서 렌더링된, 각 언어의 크롤링 가능한 요약.',
        'maps' => '지도',
        'wm_link' => 'Word Map — 핵심 단어 20개',
        'hm_link' => 'Han Map — 한자 독음',
        'nf_title' => '찾을 수 없음',
        'nf_wm' => 'Word Map 색인',
        'nf_hm' => 'Han Map 색인',
    ],
    'zh' => [
        'family' => '语系', 'speakers' => '使用者', 'script' => '文字',
        'region' => '地区', 'countries' => '国家', 'official' => '官方语言',
        'reading' => '读音',
        'th_char' => '汉字', 'th_gloss' => '含义', 'th_read' => '读音', 'th_form' => '写法',
        'where' => '使用地区',
        'open_app' => '在交互式地图中打开{name} →',
        'open_app_wm' => '打开交互式 Word Map →',
        'open_app_hm' => '打开交互式 Han Map →',
        'related' => '相关语言与比较',
        'cmp_major' => '与主要语言比较',
        'cmp_related' => '与{family}语言比较',
        'cmp_note' => '比较的是词形与发音（非语序）。',
        'same_family' => '同一语系',
        'crossmap_wm' => '在 Word Map 中查看{name}',
        'crossmap_hm' => '在 Han Map 中查看{name}',
        'picker' => '语言', 'switch' => '切换', 'stay' => '保持',
        'switch_to' => '切换到{name}？',
        'sources' => '来源', 'languages' => '语言',
        'hidden' => '历史与隐藏变体',
        'foot' => 'LangMap — 语言可视化项目的一部分。这是静态、可抓取的摘要；交互式地图提供发音音频、筛选和地球视图。',
        'words_heading' => '{name}的20个核心词',
        'chars_heading' => '{name}的汉字读音',
        'hidden_tag' => '历史／隐藏变体',
        'wm_lang_title' => '20个词与发音',
        'hm_lang_title' => '汉字读音',
        'wm_lang_meta' => '在 LangMap Word Map 上，{name}的20个核心词发音（含IPA与本地写法）。',
        'hm_lang_meta' => '在 LangMap Han Map 上，{name}的汉字读音。',
        'wm_index_title' => 'Word Map — {n}种语言的20个核心词',
        'wm_index_desc' => '在 LangMap Word Map 上浏览{n}种语言及变体的20个核心词（水、火、太阳、月亮、母亲…）的发音，含IPA与本地写法。',
        'hm_index_title' => 'Han Map — {n}种语言的汉字读音',
        'hm_index_desc' => '在 LangMap Han Map 上比较{n}种汉语、日语、韩语及越语变体中{c}个核心汉字（一 二 三 日 月 山 水…）的读音。',
        'wm_index_sub' => '{n}种语言及变体的20个核心词 — 本地写法与IPA发音。',
        'hm_index_sub' => '{n}种语言及变体中的{c}个核心汉字 — 字形与IPA／罗马字读音。',
        'see_also' => '另见',
        'home' => 'LangMap 主页',
        'hub_title' => 'LangMap — Word Map 与 Han Map（文本索引）',
        'hub_desc' => 'LangMap Word Map 与 Han Map 的可抓取文本索引。各语言的核心词发音与汉字读音。',
        'hub_h1' => 'LangMap 文本索引',
        'hub_sub' => '服务器渲染的、可抓取的各语言摘要。',
        'maps' => '地图',
        'wm_link' => 'Word Map — 20个核心词',
        'hm_link' => 'Han Map — 汉字读音',
        'nf_title' => '未找到',
        'nf_wm' => 'Word Map 索引',
        'nf_hm' => 'Han Map 索引',
    ],
    'yue' => [
        'family' => '語系', 'speakers' => '使用者', 'script' => '文字',
        'region' => '地區', 'countries' => '國家', 'official' => '官方語言',
        'reading' => '讀音',
        'th_char' => '漢字', 'th_gloss' => '意思', 'th_read' => '讀音', 'th_form' => '寫法',
        'where' => '使用地區',
        'open_app' => '喺互動地圖打開{name} →',
        'open_app_wm' => '打開互動 Word Map →',
        'open_app_hm' => '打開互動 Han Map →',
        'related' => '相關語言同比較',
        'cmp_major' => '同主要語言比較',
        'cmp_related' => '同{family}語言比較',
        'cmp_note' => '比較嘅係詞形同發音（唔係語序）。',
        'same_family' => '同一語系',
        'crossmap_wm' => '喺 Word Map 睇{name}',
        'crossmap_hm' => '喺 Han Map 睇{name}',
        'picker' => '語言', 'switch' => '切換', 'stay' => '保持',
        'switch_to' => '切換去{name}？',
        'sources' => '來源', 'languages' => '語言',
        'hidden' => '歷史同隱藏變體',
        'foot' => 'LangMap — 語言視覺化項目嘅一部分。呢個係靜態、可抓取嘅摘要；互動地圖提供發音音頻、篩選同地球視圖。',
        'words_heading' => '{name}嘅20個核心詞',
        'chars_heading' => '{name}嘅漢字讀音',
        'hidden_tag' => '歷史／隱藏變體',
        'wm_lang_title' => '20個詞同發音',
        'hm_lang_title' => '漢字讀音',
        'wm_lang_meta' => '喺 LangMap Word Map 上，{name}嘅20個核心詞發音（連IPA同本地寫法）。',
        'hm_lang_meta' => '喺 LangMap Han Map 上，{name}嘅漢字讀音。',
        'wm_index_title' => 'Word Map — {n}種語言嘅20個核心詞',
        'wm_index_desc' => '喺 LangMap Word Map 上瀏覽{n}種語言同變體嘅20個核心詞（水、火、太陽、月亮、母親…）發音，連IPA同本地寫法。',
        'hm_index_title' => 'Han Map — {n}種語言嘅漢字讀音',
        'hm_index_desc' => '喺 LangMap Han Map 上比較{n}種漢語、日語、韓語同越語變體中{c}個核心漢字（一 二 三 日 月 山 水…）嘅讀音。',
        'wm_index_sub' => '{n}種語言同變體嘅20個核心詞 — 本地寫法同IPA發音。',
        'hm_index_sub' => '{n}種語言同變體中嘅{c}個核心漢字 — 字形同IPA／羅馬字讀音。',
        'see_also' => '另見',
        'home' => 'LangMap 主頁',
        'hub_title' => 'LangMap — Word Map 同 Han Map（文本索引）',
        'hub_desc' => 'LangMap Word Map 同 Han Map 嘅可抓取文本索引。各語言嘅核心詞發音同漢字讀音。',
        'hub_h1' => 'LangMap 文本索引',
        'hub_sub' => '伺服器渲染嘅、可抓取嘅各語言摘要。',
        'maps' => '地圖',
        'wm_link' => 'Word Map — 20個核心詞',
        'hm_link' => 'Han Map — 漢字讀音',
        'nf_title' => '搵唔到',
        'nf_wm' => 'Word Map 索引',
        'nf_hm' => 'Han Map 索引',
    ],
    'vi' => [
        'family' => 'Ngữ hệ', 'speakers' => 'Người nói', 'script' => 'Chữ viết',
        'region' => 'Khu vực', 'countries' => 'Quốc gia', 'official' => 'Ngôn ngữ chính thức',
        'reading' => 'Cách đọc',
        'th_char' => 'Chữ Hán', 'th_gloss' => 'Nghĩa', 'th_read' => 'Âm đọc', 'th_form' => 'Dạng viết',
        'where' => 'Nơi được sử dụng',
        'open_app' => 'Mở {name} trong bản đồ tương tác →',
        'open_app_wm' => 'Mở Word Map tương tác →',
        'open_app_hm' => 'Mở Han Map tương tác →',
        'related' => 'Ngôn ngữ liên quan & so sánh',
        'cmp_major' => 'So sánh với các ngôn ngữ lớn',
        'cmp_related' => 'So sánh với các ngôn ngữ {family}',
        'cmp_note' => 'So sánh về hình thức từ & cách phát âm (không phải trật tự từ).',
        'same_family' => 'Cùng ngữ hệ',
        'crossmap_wm' => 'Xem {name} trong Word Map',
        'crossmap_hm' => 'Xem {name} trong Han Map',
        'picker' => 'Ngôn ngữ', 'switch' => 'Chuyển', 'stay' => 'Giữ nguyên',
        'switch_to' => 'Chuyển sang {name}?',
        'sources' => 'Nguồn', 'languages' => 'Ngôn ngữ',
        'hidden' => 'Biến thể lịch sử & ẩn',
        'foot' => 'Một phần của LangMap — dự án trực quan hóa ngôn ngữ. Đây là bản tóm tắt tĩnh, có thể thu thập; bản đồ tương tác cung cấp âm thanh phát âm, bộ lọc và chế độ xem địa cầu.',
        'words_heading' => '20 từ cốt lõi trong {name}',
        'chars_heading' => 'Cách đọc chữ Hán trong {name}',
        'hidden_tag' => 'biến thể lịch sử / ẩn',
        'wm_lang_title' => '20 từ & cách phát âm',
        'hm_lang_title' => 'Cách đọc chữ Hán',
        'wm_lang_meta' => 'Cách phát âm 20 từ cốt lõi trong {name}, kèm IPA và dạng bản địa, trên LangMap Word Map.',
        'hm_lang_meta' => 'Cách đọc các chữ Hán trong {name} trên LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 từ cốt lõi qua {n} ngôn ngữ',
        'wm_index_desc' => 'Duyệt cách phát âm của 20 từ cốt lõi (nước, lửa, mặt trời, mặt trăng, mẹ…) kèm IPA và dạng bản địa qua {n} ngôn ngữ và biến thể trên LangMap Word Map.',
        'hm_index_title' => 'Han Map — Cách đọc chữ Hán qua {n} ngôn ngữ',
        'hm_index_desc' => 'So sánh cách đọc {c} chữ Hán cốt lõi (一 二 三 日 月 山 水…) qua {n} biến thể Hán, Nhật, Hàn và Việt trên LangMap Han Map.',
        'wm_index_sub' => '20 từ cốt lõi trong {n} ngôn ngữ và biến thể — dạng bản địa với cách phát âm IPA.',
        'hm_index_sub' => '{c} chữ Hán cốt lõi qua {n} ngôn ngữ và biến thể — dạng chữ với cách đọc IPA / La-tinh hóa.',
        'see_also' => 'Xem thêm',
        'home' => 'Trang chủ LangMap',
        'hub_title' => 'LangMap — Word Map & Han Map (chỉ mục văn bản)',
        'hub_desc' => 'Chỉ mục văn bản có thể thu thập của LangMap Word Map và Han Map: cách phát âm từ cốt lõi và cách đọc chữ Hán theo từng ngôn ngữ.',
        'hub_h1' => 'Chỉ mục văn bản LangMap',
        'hub_sub' => 'Bản tóm tắt từng ngôn ngữ, kết xuất phía máy chủ, có thể thu thập.',
        'maps' => 'Bản đồ',
        'wm_link' => 'Word Map — 20 từ cốt lõi',
        'hm_link' => 'Han Map — Cách đọc chữ Hán',
        'nf_title' => 'Không tìm thấy',
        'nf_wm' => 'Chỉ mục Word Map',
        'nf_hm' => 'Chỉ mục Han Map',
    ],
    'th' => [
        'family' => 'ตระกูลภาษา', 'speakers' => 'ผู้พูด', 'script' => 'อักษร',
        'region' => 'ภูมิภาค', 'countries' => 'ประเทศ', 'official' => 'ภาษาราชการ',
        'reading' => 'การอ่าน',
        'th_char' => 'อักษร', 'th_gloss' => 'ความหมาย', 'th_read' => 'การอ่าน', 'th_form' => 'รูปเขียน',
        'where' => 'พื้นที่ที่ใช้',
        'open_app' => 'เปิด {name} ในแผนที่แบบโต้ตอบ →',
        'open_app_wm' => 'เปิด Word Map แบบโต้ตอบ →',
        'open_app_hm' => 'เปิด Han Map แบบโต้ตอบ →',
        'related' => 'ภาษาที่เกี่ยวข้องและการเปรียบเทียบ',
        'cmp_major' => 'เปรียบเทียบกับภาษาหลัก',
        'cmp_related' => 'เปรียบเทียบกับภาษาตระกูล {family}',
        'cmp_note' => 'การเปรียบเทียบเป็นเรื่องรูปคำและการออกเสียง (ไม่ใช่ลำดับคำ)',
        'same_family' => 'ตระกูลเดียวกัน',
        'crossmap_wm' => 'ดู {name} ใน Word Map',
        'crossmap_hm' => 'ดู {name} ใน Han Map',
        'picker' => 'ภาษา', 'switch' => 'สลับ', 'stay' => 'คงไว้',
        'switch_to' => 'สลับเป็น {name} ไหม?',
        'sources' => 'แหล่งข้อมูล', 'languages' => 'ภาษา',
        'hidden' => 'รูปแบบทางประวัติศาสตร์และที่ซ่อน',
        'foot' => 'ส่วนหนึ่งของ LangMap — โครงการแสดงภาพทางภาษาศาสตร์ นี่คือสรุปแบบสถิตที่ค้นเก็บได้ แผนที่แบบโต้ตอบมีเสียงการออกเสียง ตัวกรอง และมุมมองลูกโลก',
        'words_heading' => '20 คำหลักใน {name}',
        'chars_heading' => 'การอ่านอักษรจีนใน {name}',
        'hidden_tag' => 'รูปแบบทางประวัติศาสตร์ / ที่ซ่อน',
        'wm_lang_title' => '20 คำและการออกเสียง',
        'hm_lang_title' => 'การอ่านอักษรจีน',
        'wm_lang_meta' => 'การออกเสียง 20 คำหลักใน {name} พร้อม IPA และรูปท้องถิ่น บน LangMap Word Map',
        'hm_lang_meta' => 'การอ่านอักษรจีนใน {name} บน LangMap Han Map',
        'wm_index_title' => 'Word Map — 20 คำหลักใน {n} ภาษา',
        'wm_index_desc' => 'เรียกดูการออกเสียงของ 20 คำหลัก (น้ำ ไฟ ดวงอาทิตย์ ดวงจันทร์ แม่…) พร้อม IPA และรูปท้องถิ่นใน {n} ภาษาและรูปแบบ บน LangMap Word Map',
        'hm_index_title' => 'Han Map — การอ่านอักษรจีนใน {n} ภาษา',
        'hm_index_desc' => 'เปรียบเทียบการอ่าน {c} อักษรจีนหลัก (一 二 三 日 月 山 水…) ใน {n} รูปแบบจีน ญี่ปุ่น เกาหลี และเวียดนาม บน LangMap Han Map',
        'wm_index_sub' => '20 คำหลักใน {n} ภาษาและรูปแบบ — รูปท้องถิ่นพร้อมการออกเสียง IPA',
        'hm_index_sub' => '{c} อักษรจีนหลักใน {n} ภาษาและรูปแบบ — รูปอักษรพร้อมการอ่าน IPA / อักษรโรมัน',
        'see_also' => 'ดูเพิ่มเติม',
        'home' => 'หน้าแรก LangMap',
        'hub_title' => 'LangMap — Word Map และ Han Map (ดัชนีข้อความ)',
        'hub_desc' => 'ดัชนีข้อความที่ค้นเก็บได้ของ LangMap Word Map และ Han Map: การออกเสียงคำหลักและการอ่านอักษรจีนต่อภาษา',
        'hub_h1' => 'ดัชนีข้อความ LangMap',
        'hub_sub' => 'สรุปแต่ละภาษาที่เรนเดอร์ฝั่งเซิร์ฟเวอร์และค้นเก็บได้',
        'maps' => 'แผนที่',
        'wm_link' => 'Word Map — 20 คำหลัก',
        'hm_link' => 'Han Map — การอ่านอักษรจีน',
        'nf_title' => 'ไม่พบ',
        'nf_wm' => 'ดัชนี Word Map',
        'nf_hm' => 'ดัชนี Han Map',
    ],
    'id' => [
        'family' => 'Rumpun bahasa', 'speakers' => 'Penutur', 'script' => 'Aksara',
        'region' => 'Wilayah', 'countries' => 'Negara', 'official' => 'Bahasa resmi',
        'reading' => 'Bacaan',
        'th_char' => 'Aksara', 'th_gloss' => 'Arti', 'th_read' => 'Bacaan', 'th_form' => 'Bentuk',
        'where' => 'Tempat dituturkan',
        'open_app' => 'Buka {name} di peta interaktif →',
        'open_app_wm' => 'Buka Word Map interaktif →',
        'open_app_hm' => 'Buka Han Map interaktif →',
        'related' => 'Bahasa terkait & perbandingan',
        'cmp_major' => 'Bandingkan dengan bahasa utama',
        'cmp_related' => 'Bandingkan dengan bahasa {family}',
        'cmp_note' => 'Perbandingan adalah bentuk kata & pelafalan (bukan urutan kata).',
        'same_family' => 'Rumpun yang sama',
        'crossmap_wm' => 'Lihat {name} di Word Map',
        'crossmap_hm' => 'Lihat {name} di Han Map',
        'picker' => 'Bahasa', 'switch' => 'Ganti', 'stay' => 'Tetap',
        'switch_to' => 'Ganti ke {name}?',
        'sources' => 'Sumber', 'languages' => 'Bahasa',
        'hidden' => 'Varietas historis & tersembunyi',
        'foot' => 'Bagian dari LangMap — proyek visualisasi linguistik. Ini ringkasan statis yang dapat dirayapi; peta interaktif menyediakan audio pelafalan, filter, dan tampilan globe.',
        'words_heading' => '20 kata inti dalam {name}',
        'chars_heading' => 'Bacaan aksara Han dalam {name}',
        'hidden_tag' => 'varietas historis / tersembunyi',
        'wm_lang_title' => '20 kata & pelafalan',
        'hm_lang_title' => 'Bacaan aksara Han',
        'wm_lang_meta' => 'Pelafalan 20 kata inti dalam {name}, dengan IPA dan bentuk lokal, di LangMap Word Map.',
        'hm_lang_meta' => 'Bacaan aksara Han dalam {name} di LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 kata inti di {n} bahasa',
        'wm_index_desc' => 'Jelajahi pelafalan 20 kata inti (air, api, matahari, bulan, ibu…) dengan IPA dan bentuk lokal di {n} bahasa dan varietas di LangMap Word Map.',
        'hm_index_title' => 'Han Map — Bacaan aksara Han di {n} bahasa',
        'hm_index_desc' => 'Bandingkan bacaan {c} aksara Han inti (一 二 三 日 月 山 水…) di {n} varietas Sinitik, Japonik, Koreanik, dan Vietik di LangMap Han Map.',
        'wm_index_sub' => '20 kata inti di {n} bahasa dan varietas — bentuk lokal dengan pelafalan IPA.',
        'hm_index_sub' => '{c} aksara Han inti di {n} bahasa dan varietas — bentuk aksara dengan bacaan IPA / Latin.',
        'see_also' => 'Lihat juga',
        'home' => 'Beranda LangMap',
        'hub_title' => 'LangMap — Word Map & Han Map (indeks teks)',
        'hub_desc' => 'Indeks teks yang dapat dirayapi dari LangMap Word Map dan Han Map: pelafalan kata inti dan bacaan aksara Han per bahasa.',
        'hub_h1' => 'Indeks teks LangMap',
        'hub_sub' => 'Ringkasan tiap bahasa yang dirender di server dan dapat dirayapi.',
        'maps' => 'Peta',
        'wm_link' => 'Word Map — 20 kata inti',
        'hm_link' => 'Han Map — Bacaan aksara Han',
        'nf_title' => 'Tidak ditemukan',
        'nf_wm' => 'Indeks Word Map',
        'nf_hm' => 'Indeks Han Map',
    ],
    'hi' => [
        'family' => 'भाषा परिवार', 'speakers' => 'वक्ता', 'script' => 'लिपि',
        'region' => 'क्षेत्र', 'countries' => 'देश', 'official' => 'आधिकारिक भाषा',
        'reading' => 'पठन',
        'th_char' => 'अक्षर', 'th_gloss' => 'अर्थ', 'th_read' => 'उच्चारण', 'th_form' => 'रूप',
        'where' => 'कहाँ बोली जाती है',
        'open_app' => '{name} को इंटरैक्टिव मानचित्र में खोलें →',
        'open_app_wm' => 'इंटरैक्टिव Word Map खोलें →',
        'open_app_hm' => 'इंटरैक्टिव Han Map खोलें →',
        'related' => 'संबंधित भाषाएँ और तुलना',
        'cmp_major' => 'प्रमुख भाषाओं से तुलना करें',
        'cmp_related' => '{family} भाषाओं से तुलना करें',
        'cmp_note' => 'तुलना शब्द-रूप और उच्चारण की है (शब्द-क्रम की नहीं)।',
        'same_family' => 'समान परिवार',
        'crossmap_wm' => '{name} को Word Map में देखें',
        'crossmap_hm' => '{name} को Han Map में देखें',
        'picker' => 'भाषा', 'switch' => 'बदलें', 'stay' => 'बने रहें',
        'switch_to' => '{name} पर स्विच करें?',
        'sources' => 'स्रोत', 'languages' => 'भाषाएँ',
        'hidden' => 'ऐतिहासिक और छिपी किस्में',
        'foot' => 'LangMap का हिस्सा — एक भाषाई विज़ुअलाइज़ेशन परियोजना। यह एक स्थिर, क्रॉल-योग्य सारांश है; इंटरैक्टिव मानचित्र उच्चारण ऑडियो, फ़िल्टर और ग्लोब दृश्य प्रदान करते हैं।',
        'words_heading' => '{name} में 20 मूल शब्द',
        'chars_heading' => '{name} में हान वर्णों की पठन',
        'hidden_tag' => 'ऐतिहासिक / छिपी किस्म',
        'wm_lang_title' => '20 शब्द और उच्चारण',
        'hm_lang_title' => 'हान वर्णों की पठन',
        'wm_lang_meta' => 'LangMap Word Map पर {name} में 20 मूल शब्दों के उच्चारण, IPA और मूल रूपों सहित।',
        'hm_lang_meta' => 'LangMap Han Map पर {name} में हान वर्णों की पठन।',
        'wm_index_title' => 'Word Map — {n} भाषाओं में 20 मूल शब्द',
        'wm_index_desc' => 'LangMap Word Map पर {n} भाषाओं और किस्मों में 20 मूल शब्दों (पानी, आग, सूर्य, चंद्रमा, माँ…) के उच्चारण IPA और मूल रूपों सहित देखें।',
        'hm_index_title' => 'Han Map — {n} भाषाओं में हान वर्णों की पठन',
        'hm_index_desc' => 'LangMap Han Map पर {n} सिनिटिक, जापोनिक, कोरियाई और वियतनामी किस्मों में {c} मूल हान वर्णों (一 二 三 日 月 山 水…) की पठन की तुलना करें।',
        'wm_index_sub' => '{n} भाषाओं और किस्मों में 20 मूल शब्द — IPA उच्चारण सहित मूल रूप।',
        'hm_index_sub' => '{n} भाषाओं और किस्मों में {c} मूल हान वर्ण — IPA / रोमन पठन सहित वर्ण रूप।',
        'see_also' => 'यह भी देखें',
        'home' => 'LangMap होम',
        'hub_title' => 'LangMap — Word Map और Han Map (पाठ सूचकांक)',
        'hub_desc' => 'LangMap Word Map और Han Map का क्रॉल-योग्य पाठ सूचकांक: प्रति भाषा मूल-शब्द उच्चारण और हान-वर्ण पठन।',
        'hub_h1' => 'LangMap पाठ सूचकांक',
        'hub_sub' => 'सर्वर-रेंडर किए गए, प्रत्येक भाषा के क्रॉल-योग्य सारांश।',
        'maps' => 'मानचित्र',
        'wm_link' => 'Word Map — 20 मूल शब्द',
        'hm_link' => 'Han Map — हान वर्णों की पठन',
        'nf_title' => 'नहीं मिला',
        'nf_wm' => 'Word Map सूचकांक',
        'nf_hm' => 'Han Map सूचकांक',
    ],
    'de' => [
        'family' => 'Sprachfamilie', 'speakers' => 'Sprecher', 'script' => 'Schrift',
        'region' => 'Region', 'countries' => 'Länder', 'official' => 'Amtssprache in',
        'reading' => 'Lesung',
        'th_char' => 'Schriftzeichen', 'th_gloss' => 'Bedeutung', 'th_read' => 'Lesung', 'th_form' => 'Form',
        'where' => 'Wo es gesprochen wird',
        'open_app' => '{name} in der interaktiven Karte öffnen →',
        'open_app_wm' => 'Interaktive Word Map öffnen →',
        'open_app_hm' => 'Interaktive Han Map öffnen →',
        'related' => 'Verwandte Sprachen & Vergleiche',
        'cmp_major' => 'Mit großen Sprachen vergleichen',
        'cmp_related' => 'Mit {family}-Sprachen vergleichen',
        'cmp_note' => 'Verglichen werden Wortform & Aussprache (nicht die Wortstellung).',
        'same_family' => 'Gleiche Familie',
        'crossmap_wm' => '{name} in der Word Map ansehen',
        'crossmap_hm' => '{name} in der Han Map ansehen',
        'picker' => 'Sprache', 'switch' => 'Wechseln', 'stay' => 'Bleiben',
        'switch_to' => 'Zu {name} wechseln?',
        'sources' => 'Quellen', 'languages' => 'Sprachen',
        'hidden' => 'Historische & verborgene Varietäten',
        'foot' => 'Teil von LangMap — einem Projekt zur Sprachvisualisierung. Dies ist eine statische, crawlbare Zusammenfassung; die interaktiven Karten bieten Ausspracheaudio, Filter und eine Globusansicht.',
        'words_heading' => '20 Kernwörter in {name}',
        'chars_heading' => 'Lesungen der Han-Zeichen in {name}',
        'hidden_tag' => 'historische / verborgene Varietät',
        'wm_lang_title' => '20 Wörter & Aussprache',
        'hm_lang_title' => 'Lesungen der Han-Zeichen',
        'wm_lang_meta' => 'Aussprache von 20 Kernwörtern in {name}, mit IPA und einheimischen Formen, auf der LangMap Word Map.',
        'hm_lang_meta' => 'Lesungen der Han-Zeichen in {name} auf der LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 Kernwörter in {n} Sprachen',
        'wm_index_desc' => 'Durchstöbern Sie die Aussprache von 20 Kernwörtern (Wasser, Feuer, Sonne, Mond, Mutter…) mit IPA und einheimischen Formen in {n} Sprachen und Varietäten auf der LangMap Word Map.',
        'hm_index_title' => 'Han Map — Lesungen der Han-Zeichen in {n} Sprachen',
        'hm_index_desc' => 'Vergleichen Sie die Lesungen von {c} Kern-Han-Zeichen (一 二 三 日 月 山 水…) in {n} sinitischen, japonischen, koreanischen und vietischen Varietäten auf der LangMap Han Map.',
        'wm_index_sub' => '20 Kernwörter in {n} Sprachen und Varietäten — einheimische Formen mit IPA-Aussprache.',
        'hm_index_sub' => '{c} Kern-Han-Zeichen in {n} Sprachen und Varietäten — Schriftformen mit IPA- / romanisierten Lesungen.',
        'see_also' => 'Siehe auch',
        'home' => 'LangMap Startseite',
        'hub_title' => 'LangMap — Word Map & Han Map (Textindex)',
        'hub_desc' => 'Crawlbarer Textindex der LangMap Word Map und Han Map: Aussprache von Kernwörtern und Lesungen der Han-Zeichen pro Sprache.',
        'hub_h1' => 'LangMap Textindex',
        'hub_sub' => 'Serverseitig gerenderte, crawlbare Zusammenfassungen jeder Sprache.',
        'maps' => 'Karten',
        'wm_link' => 'Word Map — 20 Kernwörter',
        'hm_link' => 'Han Map — Lesungen der Han-Zeichen',
        'nf_title' => 'Nicht gefunden',
        'nf_wm' => 'Word-Map-Index',
        'nf_hm' => 'Han-Map-Index',
    ],
    'fr' => [
        'family' => 'Famille', 'speakers' => 'Locuteurs', 'script' => 'Écriture',
        'region' => 'Région', 'countries' => 'Pays', 'official' => 'Langue officielle',
        'reading' => 'Lecture',
        'th_char' => 'Caractère', 'th_gloss' => 'Sens', 'th_read' => 'Lecture', 'th_form' => 'Forme',
        'where' => 'Où elle est parlée',
        'open_app' => 'Ouvrir {name} dans la carte interactive →',
        'open_app_wm' => 'Ouvrir la Word Map interactive →',
        'open_app_hm' => 'Ouvrir la Han Map interactive →',
        'related' => 'Langues apparentées & comparaisons',
        'cmp_major' => 'Comparer aux grandes langues',
        'cmp_related' => 'Comparer aux langues {family}',
        'cmp_note' => 'Les comparaisons portent sur la forme et la prononciation (pas l’ordre des mots).',
        'same_family' => 'Même famille',
        'crossmap_wm' => 'Voir {name} dans la Word Map',
        'crossmap_hm' => 'Voir {name} dans la Han Map',
        'picker' => 'Langue', 'switch' => 'Changer', 'stay' => 'Rester',
        'switch_to' => 'Passer à {name} ?',
        'sources' => 'Sources', 'languages' => 'Langues',
        'hidden' => 'Variétés historiques & masquées',
        'foot' => 'Fait partie de LangMap — un projet de visualisation linguistique. Ceci est un résumé statique et explorable ; les cartes interactives offrent l’audio de prononciation, des filtres et une vue globe.',
        'words_heading' => '20 mots essentiels en {name}',
        'chars_heading' => 'Lectures des caractères han en {name}',
        'hidden_tag' => 'variété historique / masquée',
        'wm_lang_title' => '20 mots & prononciations',
        'hm_lang_title' => 'Lectures des caractères han',
        'wm_lang_meta' => 'Prononciations de 20 mots essentiels en {name}, avec API et formes natives, sur la LangMap Word Map.',
        'hm_lang_meta' => 'Lectures des caractères han en {name} sur la LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 mots essentiels dans {n} langues',
        'wm_index_desc' => 'Parcourez les prononciations de 20 mots essentiels (eau, feu, soleil, lune, mère…) avec API et formes natives dans {n} langues et variétés sur la LangMap Word Map.',
        'hm_index_title' => 'Han Map — Lectures des caractères han dans {n} langues',
        'hm_index_desc' => 'Comparez les lectures de {c} caractères han essentiels (一 二 三 日 月 山 水…) dans {n} variétés sinitiques, japoniques, coréaniques et viétiques sur la LangMap Han Map.',
        'wm_index_sub' => '20 mots essentiels dans {n} langues et variétés — formes natives avec prononciation API.',
        'hm_index_sub' => '{c} caractères han essentiels dans {n} langues et variétés — formes écrites avec lectures API / romanisées.',
        'see_also' => 'Voir aussi',
        'home' => 'Accueil LangMap',
        'hub_title' => 'LangMap — Word Map & Han Map (index texte)',
        'hub_desc' => 'Index texte explorable de la LangMap Word Map et Han Map : prononciations des mots essentiels et lectures des caractères han par langue.',
        'hub_h1' => 'Index texte LangMap',
        'hub_sub' => 'Résumés de chaque langue, rendus côté serveur et explorables.',
        'maps' => 'Cartes',
        'wm_link' => 'Word Map — 20 mots essentiels',
        'hm_link' => 'Han Map — Lectures des caractères han',
        'nf_title' => 'Introuvable',
        'nf_wm' => 'Index Word Map',
        'nf_hm' => 'Index Han Map',
    ],
    'it' => [
        'family' => 'Famiglia', 'speakers' => 'Parlanti', 'script' => 'Scrittura',
        'region' => 'Regione', 'countries' => 'Paesi', 'official' => 'Lingua ufficiale',
        'reading' => 'Lettura',
        'th_char' => 'Carattere', 'th_gloss' => 'Significato', 'th_read' => 'Lettura', 'th_form' => 'Forma',
        'where' => 'Dove si parla',
        'open_app' => 'Apri {name} nella mappa interattiva →',
        'open_app_wm' => 'Apri la Word Map interattiva →',
        'open_app_hm' => 'Apri la Han Map interattiva →',
        'related' => 'Lingue correlate & confronti',
        'cmp_major' => 'Confronta con le lingue principali',
        'cmp_related' => 'Confronta con le lingue {family}',
        'cmp_note' => 'I confronti riguardano forma e pronuncia (non l’ordine delle parole).',
        'same_family' => 'Stessa famiglia',
        'crossmap_wm' => 'Vedi {name} nella Word Map',
        'crossmap_hm' => 'Vedi {name} nella Han Map',
        'picker' => 'Lingua', 'switch' => 'Cambia', 'stay' => 'Resta',
        'switch_to' => 'Passare a {name}?',
        'sources' => 'Fonti', 'languages' => 'Lingue',
        'hidden' => 'Varietà storiche & nascoste',
        'foot' => 'Parte di LangMap — un progetto di visualizzazione linguistica. Questo è un riepilogo statico e scansionabile; le mappe interattive offrono audio di pronuncia, filtri e una vista globo.',
        'words_heading' => '20 parole essenziali in {name}',
        'chars_heading' => 'Letture dei caratteri han in {name}',
        'hidden_tag' => 'varietà storica / nascosta',
        'wm_lang_title' => '20 parole & pronunce',
        'hm_lang_title' => 'Letture dei caratteri han',
        'wm_lang_meta' => 'Pronunce di 20 parole essenziali in {name}, con IPA e forme native, sulla LangMap Word Map.',
        'hm_lang_meta' => 'Letture dei caratteri han in {name} sulla LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 parole essenziali in {n} lingue',
        'wm_index_desc' => 'Sfoglia le pronunce di 20 parole essenziali (acqua, fuoco, sole, luna, madre…) con IPA e forme native in {n} lingue e varietà sulla LangMap Word Map.',
        'hm_index_title' => 'Han Map — Letture dei caratteri han in {n} lingue',
        'hm_index_desc' => 'Confronta le letture di {c} caratteri han essenziali (一 二 三 日 月 山 水…) in {n} varietà sinitiche, giapponiche, coreaniche e vietiche sulla LangMap Han Map.',
        'wm_index_sub' => '20 parole essenziali in {n} lingue e varietà — forme native con pronuncia IPA.',
        'hm_index_sub' => '{c} caratteri han essenziali in {n} lingue e varietà — forme scritte con letture IPA / romanizzate.',
        'see_also' => 'Vedi anche',
        'home' => 'Home LangMap',
        'hub_title' => 'LangMap — Word Map & Han Map (indice testuale)',
        'hub_desc' => 'Indice testuale scansionabile della LangMap Word Map e Han Map: pronunce delle parole essenziali e letture dei caratteri han per lingua.',
        'hub_h1' => 'Indice testuale LangMap',
        'hub_sub' => 'Riepiloghi di ciascuna lingua, resi lato server e scansionabili.',
        'maps' => 'Mappe',
        'wm_link' => 'Word Map — 20 parole essenziali',
        'hm_link' => 'Han Map — Letture dei caratteri han',
        'nf_title' => 'Non trovato',
        'nf_wm' => 'Indice Word Map',
        'nf_hm' => 'Indice Han Map',
    ],
    'es' => [
        'family' => 'Familia', 'speakers' => 'Hablantes', 'script' => 'Escritura',
        'region' => 'Región', 'countries' => 'Países', 'official' => 'Lengua oficial',
        'reading' => 'Lectura',
        'th_char' => 'Carácter', 'th_gloss' => 'Significado', 'th_read' => 'Lectura', 'th_form' => 'Forma',
        'where' => 'Dónde se habla',
        'open_app' => 'Abrir {name} en el mapa interactivo →',
        'open_app_wm' => 'Abrir el Word Map interactivo →',
        'open_app_hm' => 'Abrir el Han Map interactivo →',
        'related' => 'Lenguas relacionadas y comparaciones',
        'cmp_major' => 'Comparar con lenguas principales',
        'cmp_related' => 'Comparar con lenguas {family}',
        'cmp_note' => 'Las comparaciones son de forma y pronunciación (no de orden de palabras).',
        'same_family' => 'Misma familia',
        'crossmap_wm' => 'Ver {name} en el Word Map',
        'crossmap_hm' => 'Ver {name} en el Han Map',
        'picker' => 'Idioma', 'switch' => 'Cambiar', 'stay' => 'Quedarse',
        'switch_to' => '¿Cambiar a {name}?',
        'sources' => 'Fuentes', 'languages' => 'Lenguas',
        'hidden' => 'Variedades históricas y ocultas',
        'foot' => 'Parte de LangMap — un proyecto de visualización lingüística. Este es un resumen estático y rastreable; los mapas interactivos ofrecen audio de pronunciación, filtros y una vista de globo.',
        'words_heading' => '20 palabras esenciales en {name}',
        'chars_heading' => 'Lecturas de caracteres han en {name}',
        'hidden_tag' => 'variedad histórica / oculta',
        'wm_lang_title' => '20 palabras y pronunciaciones',
        'hm_lang_title' => 'Lecturas de caracteres han',
        'wm_lang_meta' => 'Pronunciaciones de 20 palabras esenciales en {name}, con AFI y formas nativas, en el LangMap Word Map.',
        'hm_lang_meta' => 'Lecturas de caracteres han en {name} en el LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 palabras esenciales en {n} lenguas',
        'wm_index_desc' => 'Explora las pronunciaciones de 20 palabras esenciales (agua, fuego, sol, luna, madre…) con AFI y formas nativas en {n} lenguas y variedades en el LangMap Word Map.',
        'hm_index_title' => 'Han Map — Lecturas de caracteres han en {n} lenguas',
        'hm_index_desc' => 'Compara las lecturas de {c} caracteres han esenciales (一 二 三 日 月 山 水…) en {n} variedades siníticas, japónicas, coreánicas y vieticas en el LangMap Han Map.',
        'wm_index_sub' => '20 palabras esenciales en {n} lenguas y variedades — formas nativas con pronunciación AFI.',
        'hm_index_sub' => '{c} caracteres han esenciales en {n} lenguas y variedades — formas escritas con lecturas AFI / romanizadas.',
        'see_also' => 'Véase también',
        'home' => 'Inicio de LangMap',
        'hub_title' => 'LangMap — Word Map y Han Map (índice de texto)',
        'hub_desc' => 'Índice de texto rastreable del LangMap Word Map y Han Map: pronunciaciones de palabras esenciales y lecturas de caracteres han por lengua.',
        'hub_h1' => 'Índice de texto LangMap',
        'hub_sub' => 'Resúmenes de cada lengua, renderizados en el servidor y rastreables.',
        'maps' => 'Mapas',
        'wm_link' => 'Word Map — 20 palabras esenciales',
        'hm_link' => 'Han Map — Lecturas de caracteres han',
        'nf_title' => 'No encontrado',
        'nf_wm' => 'Índice Word Map',
        'nf_hm' => 'Índice Han Map',
    ],
    'pt' => [
        'family' => 'Família', 'speakers' => 'Falantes', 'script' => 'Escrita',
        'region' => 'Região', 'countries' => 'Países', 'official' => 'Língua oficial',
        'reading' => 'Leitura',
        'th_char' => 'Caractere', 'th_gloss' => 'Significado', 'th_read' => 'Leitura', 'th_form' => 'Forma',
        'where' => 'Onde é falada',
        'open_app' => 'Abrir {name} no mapa interativo →',
        'open_app_wm' => 'Abrir o Word Map interativo →',
        'open_app_hm' => 'Abrir o Han Map interativo →',
        'related' => 'Línguas relacionadas e comparações',
        'cmp_major' => 'Comparar com línguas principais',
        'cmp_related' => 'Comparar com línguas {family}',
        'cmp_note' => 'As comparações são de forma e pronúncia (não de ordem das palavras).',
        'same_family' => 'Mesma família',
        'crossmap_wm' => 'Ver {name} no Word Map',
        'crossmap_hm' => 'Ver {name} no Han Map',
        'picker' => 'Idioma', 'switch' => 'Trocar', 'stay' => 'Ficar',
        'switch_to' => 'Trocar para {name}?',
        'sources' => 'Fontes', 'languages' => 'Línguas',
        'hidden' => 'Variedades históricas e ocultas',
        'foot' => 'Parte do LangMap — um projeto de visualização linguística. Este é um resumo estático e rastreável; os mapas interativos oferecem áudio de pronúncia, filtros e uma vista de globo.',
        'words_heading' => '20 palavras essenciais em {name}',
        'chars_heading' => 'Leituras de caracteres han em {name}',
        'hidden_tag' => 'variedade histórica / oculta',
        'wm_lang_title' => '20 palavras e pronúncias',
        'hm_lang_title' => 'Leituras de caracteres han',
        'wm_lang_meta' => 'Pronúncias de 20 palavras essenciais em {name}, com AFI e formas nativas, no LangMap Word Map.',
        'hm_lang_meta' => 'Leituras de caracteres han em {name} no LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 palavras essenciais em {n} línguas',
        'wm_index_desc' => 'Navegue pelas pronúncias de 20 palavras essenciais (água, fogo, sol, lua, mãe…) com AFI e formas nativas em {n} línguas e variedades no LangMap Word Map.',
        'hm_index_title' => 'Han Map — Leituras de caracteres han em {n} línguas',
        'hm_index_desc' => 'Compare as leituras de {c} caracteres han essenciais (一 二 三 日 月 山 水…) em {n} variedades siníticas, japónicas, coreânicas e viéticas no LangMap Han Map.',
        'wm_index_sub' => '20 palavras essenciais em {n} línguas e variedades — formas nativas com pronúncia AFI.',
        'hm_index_sub' => '{c} caracteres han essenciais em {n} línguas e variedades — formas escritas com leituras AFI / romanizadas.',
        'see_also' => 'Veja também',
        'home' => 'Início do LangMap',
        'hub_title' => 'LangMap — Word Map e Han Map (índice de texto)',
        'hub_desc' => 'Índice de texto rastreável do LangMap Word Map e Han Map: pronúncias de palavras essenciais e leituras de caracteres han por língua.',
        'hub_h1' => 'Índice de texto LangMap',
        'hub_sub' => 'Resumos de cada língua, renderizados no servidor e rastreáveis.',
        'maps' => 'Mapas',
        'wm_link' => 'Word Map — 20 palavras essenciais',
        'hm_link' => 'Han Map — Leituras de caracteres han',
        'nf_title' => 'Não encontrado',
        'nf_wm' => 'Índice Word Map',
        'nf_hm' => 'Índice Han Map',
    ],
    'ru' => [
        'family' => 'Семья', 'speakers' => 'Носители', 'script' => 'Письмо',
        'region' => 'Регион', 'countries' => 'Страны', 'official' => 'Официальный язык',
        'reading' => 'Чтение',
        'th_char' => 'Иероглиф', 'th_gloss' => 'Значение', 'th_read' => 'Чтение', 'th_form' => 'Форма',
        'where' => 'Где на нём говорят',
        'open_app' => 'Открыть {name} на интерактивной карте →',
        'open_app_wm' => 'Открыть интерактивную Word Map →',
        'open_app_hm' => 'Открыть интерактивную Han Map →',
        'related' => 'Родственные языки и сравнения',
        'cmp_major' => 'Сравнить с основными языками',
        'cmp_related' => 'Сравнить с языками {family}',
        'cmp_note' => 'Сравнение по форме слова и произношению (не по порядку слов).',
        'same_family' => 'Та же семья',
        'crossmap_wm' => 'Смотреть {name} в Word Map',
        'crossmap_hm' => 'Смотреть {name} в Han Map',
        'picker' => 'Язык', 'switch' => 'Переключить', 'stay' => 'Остаться',
        'switch_to' => 'Переключиться на {name}?',
        'sources' => 'Источники', 'languages' => 'Языки',
        'hidden' => 'Исторические и скрытые разновидности',
        'foot' => 'Часть LangMap — проекта визуализации языков. Это статическое, индексируемое резюме; интерактивные карты предлагают аудио произношения, фильтры и вид глобуса.',
        'words_heading' => '20 основных слов на языке {name}',
        'chars_heading' => 'Чтения ханьских иероглифов на языке {name}',
        'hidden_tag' => 'историческая / скрытая разновидность',
        'wm_lang_title' => '20 слов и произношение',
        'hm_lang_title' => 'Чтения ханьских иероглифов',
        'wm_lang_meta' => 'Произношение 20 основных слов на языке {name}, с МФА и исконными формами, на LangMap Word Map.',
        'hm_lang_meta' => 'Чтения ханьских иероглифов на языке {name} на LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 основных слов в {n} языках',
        'wm_index_desc' => 'Просматривайте произношение 20 основных слов (вода, огонь, солнце, луна, мать…) с МФА и исконными формами в {n} языках и разновидностях на LangMap Word Map.',
        'hm_index_title' => 'Han Map — Чтения ханьских иероглифов в {n} языках',
        'hm_index_desc' => 'Сравните чтения {c} основных ханьских иероглифов (一 二 三 日 月 山 水…) в {n} синитских, японских, корейских и вьетских разновидностях на LangMap Han Map.',
        'wm_index_sub' => '20 основных слов в {n} языках и разновидностях — исконные формы с произношением МФА.',
        'hm_index_sub' => '{c} основных ханьских иероглифов в {n} языках и разновидностях — формы письма с чтениями МФА / латиницей.',
        'see_also' => 'См. также',
        'home' => 'Главная LangMap',
        'hub_title' => 'LangMap — Word Map и Han Map (текстовый указатель)',
        'hub_desc' => 'Индексируемый текстовый указатель LangMap Word Map и Han Map: произношение основных слов и чтения ханьских иероглифов по языкам.',
        'hub_h1' => 'Текстовый указатель LangMap',
        'hub_sub' => 'Отрендеренные на сервере, индексируемые сводки по каждому языку.',
        'maps' => 'Карты',
        'wm_link' => 'Word Map — 20 основных слов',
        'hm_link' => 'Han Map — Чтения ханьских иероглифов',
        'nf_title' => 'Не найдено',
        'nf_wm' => 'Указатель Word Map',
        'nf_hm' => 'Указатель Han Map',
    ],
    'uk' => [
        'family' => 'Сім’я', 'speakers' => 'Носії', 'script' => 'Письмо',
        'region' => 'Регіон', 'countries' => 'Країни', 'official' => 'Офіційна мова',
        'reading' => 'Читання',
        'th_char' => 'Ієрогліф', 'th_gloss' => 'Значення', 'th_read' => 'Читання', 'th_form' => 'Форма',
        'where' => 'Де нею розмовляють',
        'open_app' => 'Відкрити {name} на інтерактивній карті →',
        'open_app_wm' => 'Відкрити інтерактивну Word Map →',
        'open_app_hm' => 'Відкрити інтерактивну Han Map →',
        'related' => 'Споріднені мови та порівняння',
        'cmp_major' => 'Порівняти з основними мовами',
        'cmp_related' => 'Порівняти з мовами {family}',
        'cmp_note' => 'Порівняння за формою слова та вимовою (не за порядком слів).',
        'same_family' => 'Та сама сім’я',
        'crossmap_wm' => 'Дивитися {name} у Word Map',
        'crossmap_hm' => 'Дивитися {name} у Han Map',
        'picker' => 'Мова', 'switch' => 'Перемкнути', 'stay' => 'Залишитися',
        'switch_to' => 'Перемкнути на {name}?',
        'sources' => 'Джерела', 'languages' => 'Мови',
        'hidden' => 'Історичні та приховані різновиди',
        'foot' => 'Частина LangMap — проєкту візуалізації мов. Це статичне, індексоване резюме; інтерактивні карти пропонують аудіо вимови, фільтри та вигляд глобуса.',
        'words_heading' => '20 основних слів мовою {name}',
        'chars_heading' => 'Читання ханьських ієрогліфів мовою {name}',
        'hidden_tag' => 'історичний / прихований різновид',
        'wm_lang_title' => '20 слів і вимова',
        'hm_lang_title' => 'Читання ханьських ієрогліфів',
        'wm_lang_meta' => 'Вимова 20 основних слів мовою {name}, з МФА та питомими формами, на LangMap Word Map.',
        'hm_lang_meta' => 'Читання ханьських ієрогліфів мовою {name} на LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 основних слів у {n} мовах',
        'wm_index_desc' => 'Переглядайте вимову 20 основних слів (вода, вогонь, сонце, місяць, мати…) з МФА та питомими формами у {n} мовах і різновидах на LangMap Word Map.',
        'hm_index_title' => 'Han Map — Читання ханьських ієрогліфів у {n} мовах',
        'hm_index_desc' => 'Порівняйте читання {c} основних ханьських ієрогліфів (一 二 三 日 月 山 水…) у {n} синітських, японських, корейських і в’єтських різновидах на LangMap Han Map.',
        'wm_index_sub' => '20 основних слів у {n} мовах і різновидах — питомі форми з вимовою МФА.',
        'hm_index_sub' => '{c} основних ханьських ієрогліфів у {n} мовах і різновидах — форми письма з читаннями МФА / латиницею.',
        'see_also' => 'Див. також',
        'home' => 'Головна LangMap',
        'hub_title' => 'LangMap — Word Map і Han Map (текстовий покажчик)',
        'hub_desc' => 'Індексований текстовий покажчик LangMap Word Map і Han Map: вимова основних слів і читання ханьських ієрогліфів за мовами.',
        'hub_h1' => 'Текстовий покажчик LangMap',
        'hub_sub' => 'Відрендерені на сервері, індексовані зведення кожної мови.',
        'maps' => 'Карти',
        'wm_link' => 'Word Map — 20 основних слів',
        'hm_link' => 'Han Map — Читання ханьських ієрогліфів',
        'nf_title' => 'Не знайдено',
        'nf_wm' => 'Покажчик Word Map',
        'nf_hm' => 'Покажчик Han Map',
    ],
    'ar' => [
        'family' => 'العائلة', 'speakers' => 'المتحدثون', 'script' => 'الكتابة',
        'region' => 'المنطقة', 'countries' => 'البلدان', 'official' => 'لغة رسمية في',
        'reading' => 'القراءة',
        'th_char' => 'الحرف', 'th_gloss' => 'المعنى', 'th_read' => 'القراءة', 'th_form' => 'الشكل',
        'where' => 'أين تُستخدم',
        'open_app' => 'فتح {name} في الخريطة التفاعلية →',
        'open_app_wm' => 'فتح Word Map التفاعلية →',
        'open_app_hm' => 'فتح Han Map التفاعلية →',
        'related' => 'لغات ذات صلة ومقارنات',
        'cmp_major' => 'قارن باللغات الكبرى',
        'cmp_related' => 'قارن بلغات {family}',
        'cmp_note' => 'المقارنات تتعلق بشكل الكلمة والنطق (وليس ترتيب الكلمات).',
        'same_family' => 'العائلة نفسها',
        'crossmap_wm' => 'عرض {name} في Word Map',
        'crossmap_hm' => 'عرض {name} في Han Map',
        'picker' => 'اللغة', 'switch' => 'تبديل', 'stay' => 'البقاء',
        'switch_to' => 'التبديل إلى {name}؟',
        'sources' => 'المصادر', 'languages' => 'اللغات',
        'hidden' => 'أنواع تاريخية ومخفية',
        'foot' => 'جزء من LangMap — مشروع لتصور اللغات. هذا ملخص ثابت قابل للفهرسة؛ توفر الخرائط التفاعلية صوت النطق والمرشحات وعرض الكرة الأرضية.',
        'words_heading' => '20 كلمة أساسية في {name}',
        'chars_heading' => 'قراءات الحروف الهانية في {name}',
        'hidden_tag' => 'نوع تاريخي / مخفي',
        'wm_lang_title' => '20 كلمة والنطق',
        'hm_lang_title' => 'قراءات الحروف الهانية',
        'wm_lang_meta' => 'نطق 20 كلمة أساسية في {name}، مع الأبجدية الصوتية الدولية والأشكال المحلية، على LangMap Word Map.',
        'hm_lang_meta' => 'قراءات الحروف الهانية في {name} على LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 كلمة أساسية عبر {n} لغة',
        'wm_index_desc' => 'تصفّح نطق 20 كلمة أساسية (ماء، نار، شمس، قمر، أم…) مع الأبجدية الصوتية الدولية والأشكال المحلية عبر {n} لغة ولهجة على LangMap Word Map.',
        'hm_index_title' => 'Han Map — قراءات الحروف الهانية عبر {n} لغة',
        'hm_index_desc' => 'قارن قراءات {c} حرفًا هانيًا أساسيًا (一 二 三 日 月 山 水…) عبر {n} لهجة صينية ويابانية وكورية وفيتنامية على LangMap Han Map.',
        'wm_index_sub' => '20 كلمة أساسية عبر {n} لغة ولهجة — أشكال محلية مع نطق الأبجدية الصوتية الدولية.',
        'hm_index_sub' => '{c} حرفًا هانيًا أساسيًا عبر {n} لغة ولهجة — أشكال مكتوبة مع قراءات الأبجدية الصوتية الدولية / رومنة.',
        'see_also' => 'انظر أيضًا',
        'home' => 'الصفحة الرئيسية LangMap',
        'hub_title' => 'LangMap — Word Map و Han Map (فهرس نصي)',
        'hub_desc' => 'فهرس نصي قابل للفهرسة لـ LangMap Word Map و Han Map: نطق الكلمات الأساسية وقراءات الحروف الهانية لكل لغة.',
        'hub_h1' => 'فهرس LangMap النصي',
        'hub_sub' => 'ملخصات لكل لغة، معروضة من الخادم وقابلة للفهرسة.',
        'maps' => 'الخرائط',
        'wm_link' => 'Word Map — 20 كلمة أساسية',
        'hm_link' => 'Han Map — قراءات الحروف الهانية',
        'nf_title' => 'غير موجود',
        'nf_wm' => 'فهرس Word Map',
        'nf_hm' => 'فهرس Han Map',
    ],
    'he' => [
        'family' => 'משפחה', 'speakers' => 'דוברים', 'script' => 'כתב',
        'region' => 'אזור', 'countries' => 'מדינות', 'official' => 'שפה רשמית',
        'reading' => 'קריאה',
        'th_char' => 'תו', 'th_gloss' => 'משמעות', 'th_read' => 'קריאה', 'th_form' => 'צורה',
        'where' => 'היכן מדוברת',
        'open_app' => 'פתח את {name} במפה האינטראקטיבית →',
        'open_app_wm' => 'פתח את Word Map האינטראקטיבית →',
        'open_app_hm' => 'פתח את Han Map האינטראקטיבית →',
        'related' => 'שפות קשורות והשוואות',
        'cmp_major' => 'השווה לשפות מרכזיות',
        'cmp_related' => 'השווה לשפות {family}',
        'cmp_note' => 'ההשוואות הן של צורת המילה וההגייה (לא של סדר המילים).',
        'same_family' => 'אותה משפחה',
        'crossmap_wm' => 'צפה ב{name} ב-Word Map',
        'crossmap_hm' => 'צפה ב{name} ב-Han Map',
        'picker' => 'שפה', 'switch' => 'החלף', 'stay' => 'הישאר',
        'switch_to' => 'לעבור ל{name}?',
        'sources' => 'מקורות', 'languages' => 'שפות',
        'hidden' => 'גרסאות היסטוריות ומוסתרות',
        'foot' => 'חלק מ-LangMap — פרויקט להמחשת שפות. זהו סיכום סטטי הניתן לסריקה; המפות האינטראקטיביות מציעות שמע הגייה, מסננים ותצוגת גלובוס.',
        'words_heading' => '20 מילים בסיסיות ב{name}',
        'chars_heading' => 'קריאות תווי האן ב{name}',
        'hidden_tag' => 'גרסה היסטורית / מוסתרת',
        'wm_lang_title' => '20 מילים והגייה',
        'hm_lang_title' => 'קריאות תווי האן',
        'wm_lang_meta' => 'הגיית 20 מילים בסיסיות ב{name}, עם IPA וצורות מקומיות, ב-LangMap Word Map.',
        'hm_lang_meta' => 'קריאות תווי האן ב{name} ב-LangMap Han Map.',
        'wm_index_title' => 'Word Map — 20 מילים בסיסיות ב-{n} שפות',
        'wm_index_desc' => 'עיינו בהגייה של 20 מילים בסיסיות (מים, אש, שמש, ירח, אם…) עם IPA וצורות מקומיות ב-{n} שפות וגרסאות ב-LangMap Word Map.',
        'hm_index_title' => 'Han Map — קריאות תווי האן ב-{n} שפות',
        'hm_index_desc' => 'השוו את קריאות {c} תווי האן הבסיסיים (一 二 三 日 月 山 水…) ב-{n} גרסאות סיניות, יפניות, קוריאניות ווייטנאמיות ב-LangMap Han Map.',
        'wm_index_sub' => '20 מילים בסיסיות ב-{n} שפות וגרסאות — צורות מקומיות עם הגיית IPA.',
        'hm_index_sub' => '{c} תווי האן בסיסיים ב-{n} שפות וגרסאות — צורות כתב עם קריאות IPA / לטיניות.',
        'see_also' => 'ראו גם',
        'home' => 'דף הבית של LangMap',
        'hub_title' => 'LangMap — Word Map ו-Han Map (אינדקס טקסט)',
        'hub_desc' => 'אינדקס טקסט הניתן לסריקה של LangMap Word Map ו-Han Map: הגיית מילים בסיסיות וקריאות תווי האן לכל שפה.',
        'hub_h1' => 'אינדקס הטקסט של LangMap',
        'hub_sub' => 'סיכומים של כל שפה, מעובדים בצד השרת וניתנים לסריקה.',
        'maps' => 'מפות',
        'wm_link' => 'Word Map — 20 מילים בסיסיות',
        'hm_link' => 'Han Map — קריאות תווי האן',
        'nf_title' => 'לא נמצא',
        'nf_wm' => 'אינדקס Word Map',
        'nf_hm' => 'אינדקס Han Map',
    ],
    'sw' => [
        'family' => 'Familia', 'speakers' => 'Wasemaji', 'script' => 'Hati',
        'region' => 'Eneo', 'countries' => 'Nchi', 'official' => 'Lugha rasmi',
        'reading' => 'Usomaji',
        'th_char' => 'Herufi', 'th_gloss' => 'Maana', 'th_read' => 'Usomaji', 'th_form' => 'Umbo',
        'where' => 'Inakozungumzwa',
        'open_app' => 'Fungua {name} kwenye ramani shirikishi →',
        'open_app_wm' => 'Fungua Word Map shirikishi →',
        'open_app_hm' => 'Fungua Han Map shirikishi →',
        'related' => 'Lugha zinazohusiana & kulinganisha',
        'cmp_major' => 'Linganisha na lugha kuu',
        'cmp_related' => 'Linganisha na lugha za {family}',
        'cmp_note' => 'Ulinganishaji ni wa umbo la neno na matamshi (si mpangilio wa maneno).',
        'same_family' => 'Familia moja',
        'crossmap_wm' => 'Tazama {name} kwenye Word Map',
        'crossmap_hm' => 'Tazama {name} kwenye Han Map',
        'picker' => 'Lugha', 'switch' => 'Badilisha', 'stay' => 'Baki',
        'switch_to' => 'Badilisha hadi {name}?',
        'sources' => 'Vyanzo', 'languages' => 'Lugha',
        'hidden' => 'Aina za kihistoria & zilizofichwa',
        'foot' => 'Sehemu ya LangMap — mradi wa kuonyesha lugha kwa picha. Huu ni muhtasari tuli unaoweza kutambaliwa; ramani shirikishi hutoa sauti ya matamshi, vichujio, na mwonekano wa dunia.',
        'words_heading' => 'Maneno 20 ya msingi katika {name}',
        'chars_heading' => 'Usomaji wa herufi za Han katika {name}',
        'hidden_tag' => 'aina ya kihistoria / iliyofichwa',
        'wm_lang_title' => 'Maneno 20 na matamshi',
        'hm_lang_title' => 'Usomaji wa herufi za Han',
        'wm_lang_meta' => 'Matamshi ya maneno 20 ya msingi katika {name}, yenye IPA na maumbo asilia, kwenye LangMap Word Map.',
        'hm_lang_meta' => 'Usomaji wa herufi za Han katika {name} kwenye LangMap Han Map.',
        'wm_index_title' => 'Word Map — Maneno 20 ya msingi katika lugha {n}',
        'wm_index_desc' => 'Vinjari matamshi ya maneno 20 ya msingi (maji, moto, jua, mwezi, mama…) yenye IPA na maumbo asilia katika lugha na aina {n} kwenye LangMap Word Map.',
        'hm_index_title' => 'Han Map — Usomaji wa herufi za Han katika lugha {n}',
        'hm_index_desc' => 'Linganisha usomaji wa herufi {c} za msingi za Han (一 二 三 日 月 山 水…) katika aina {n} za Kisiniti, Kijaponi, Kikorea na Kivieti kwenye LangMap Han Map.',
        'wm_index_sub' => 'Maneno 20 ya msingi katika lugha na aina {n} — maumbo asilia yenye matamshi ya IPA.',
        'hm_index_sub' => 'Herufi {c} za msingi za Han katika lugha na aina {n} — maumbo ya maandishi yenye usomaji wa IPA / Kilatini.',
        'see_also' => 'Tazama pia',
        'home' => 'Mwanzo wa LangMap',
        'hub_title' => 'LangMap — Word Map na Han Map (faharasa ya maandishi)',
        'hub_desc' => 'Faharasa ya maandishi inayoweza kutambaliwa ya LangMap Word Map na Han Map: matamshi ya maneno ya msingi na usomaji wa herufi za Han kwa kila lugha.',
        'hub_h1' => 'Faharasa ya maandishi ya LangMap',
        'hub_sub' => 'Muhtasari wa kila lugha, uliotolewa upande wa seva na unaoweza kutambaliwa.',
        'maps' => 'Ramani',
        'wm_link' => 'Word Map — Maneno 20 ya msingi',
        'hm_link' => 'Han Map — Usomaji wa herufi za Han',
        'nf_title' => 'Haikupatikana',
        'nf_wm' => 'Faharasa ya Word Map',
        'nf_hm' => 'Faharasa ya Han Map',
    ],
];

/** Look up a SEO_T string with {placeholder} substitution; falls back to en. */
function seo_t(string $ui, string $key, array $vars = []): string
{
    $s = SEO_T[$ui][$key] ?? (SEO_T['en'][$key] ?? $key);
    if ($vars) {
        $repl = [];
        foreach ($vars as $k => $v) {
            $repl['{' . $k . '}'] = $v;
        }
        $s = strtr($s, $repl);
    }
    return $s;
}

/** Build a path: ('en','') => /en/ ; ('en','wordmap') => /en/wordmap/ ;
 *  ('en','wordmap','cjy') => /en/wordmap/cjy */
function seo_path(string $ui, string $map, string $code = ''): string
{
    if ($map === '') {
        return '/' . $ui . '/';
    }
    $p = '/' . $ui . '/' . $map . '/';
    if ($code !== '') {
        $p .= rawurlencode($code);
    }
    return $p;
}

/** Load + cache a JSON data file. Returns [] if missing. */
function seo_data(string $which): array
{
    static $cache = [];
    if (isset($cache[$which])) {
        return $cache[$which];
    }
    $path = SEO_DATA_DIR . '/' . $which . '_seo.json';
    if (!is_file($path)) {
        return $cache[$which] = [];
    }
    $raw = file_get_contents($path);
    $data = json_decode($raw, true);
    return $cache[$which] = is_array($data) ? $data : [];
}

/** Escape for HTML text/attribute context. */
function e($s): string
{
    return htmlspecialchars((string) $s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * Pick the best string from a multilingual { en, ja, ... } map.
 * Falls back en -> first available -> ''.
 */
function seo_pick(?array $map, string $prefer = 'en'): string
{
    if (!$map) {
        return '';
    }
    if (!empty($map[$prefer])) {
        return (string) $map[$prefer];
    }
    if (!empty($map['en'])) {
        return (string) $map['en'];
    }
    foreach ($map as $v) {
        if ($v !== '' && $v !== null) {
            return (string) $v;
        }
    }
    return '';
}

/** Truncate a string to a meta-description-friendly length on a word boundary. */
function seo_clip(string $s, int $max = 160): string
{
    $s = trim(preg_replace('/\s+/u', ' ', $s));
    if (mb_strlen($s, 'UTF-8') <= $max) {
        return $s;
    }
    $cut = mb_substr($s, 0, $max - 1, 'UTF-8');
    $sp = mb_strrpos($cut, ' ', 0, 'UTF-8');
    if ($sp !== false && $sp > $max * 0.6) {
        $cut = mb_substr($cut, 0, $sp, 'UTF-8');
    }
    return $cut . '…';
}

/** Send a 404 and render a minimal page. */
function seo_404(string $msg = 'Page not found', string $ui = 'en'): void
{
    http_response_code(404);
    header('Content-Type: text/html; charset=utf-8');
    $rtl = seo_is_rtl($ui);
    echo "<!doctype html><html lang=\"" . e($ui) . "\"" . ($rtl ? ' dir="rtl"' : '') . "><head><meta charset=\"utf-8\">"
        . "<title>404 — " . e(seo_t($ui, 'nf_title')) . "</title>"
        . "<meta name=\"robots\" content=\"noindex\">"
        . "<style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem}</style>"
        . "</head><body><h1>404</h1><p>" . e($msg) . "</p>"
        . "<p><a href=\"/" . e($ui) . "/wordmap/\">" . e(seo_t($ui, 'nf_wm')) . "</a> · <a href=\"/" . e($ui) . "/hanmap/\">" . e(seo_t($ui, 'nf_hm')) . "</a></p>"
        . "</body></html>";
}

/**
 * Build a Leaflet embed (minimal, self-contained) centered on a coordinate.
 * Returns HTML. If coords are missing, returns an empty string.
 */
function seo_map_embed(?float $lat, ?float $lng, string $label, int $zoom = 5): string
{
    if ($lat === null || $lng === null) {
        return '';
    }
    $lat = (float) $lat;
    $lng = (float) $lng;
    $jsLabel = json_encode($label, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT);
    $id = 'seo-map';
    return <<<HTML
<div class="seo-map-wrap">
  <div id="{$id}" class="seo-map" role="img" aria-label="Map centered on {$jsLabel}"></div>
</div>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" defer></script>
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (typeof L === 'undefined') {
    // Leaflet still loading (defer); poll briefly.
    var tries = 0, t = setInterval(function () {
      if (typeof L !== 'undefined' || tries++ > 50) { clearInterval(t); init(); }
    }, 100);
  } else { init(); }
  function init() {
    if (typeof L === 'undefined') return;
    var el = document.getElementById('{$id}');
    if (!el) return;
    var map = L.map(el, { scrollWheelZoom: false, attributionControl: true })
      .setView([{$lat}, {$lng}], {$zoom});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([{$lat}, {$lng}]).addTo(map).bindPopup({$jsLabel});
  }
});
</script>
HTML;
}

/**
 * Emit hreflang alternates for all 19 UI langs + x-default.
 * $altPath = the path part after /{ui} for this page, with a leading slash and
 * no UI prefix, e.g. "/wordmap/cjy" or "/hanmap/" or "/".
 */
function seo_hreflang(string $altPath): void
{
    foreach (SEO_UI_LANGS as $ui) {
        $href = SEO_SITE . '/' . $ui . $altPath;
        echo '<link rel="alternate" hreflang="' . e($ui) . '" href="' . e($href) . "\">\n";
    }
    echo '<link rel="alternate" hreflang="x-default" href="'
        . e(SEO_SITE . '/en' . $altPath) . "\">\n";
}

/** Shared <head> + page chrome opening. */
function seo_head(array $opts): void
{
    $title = $opts['title'] ?? 'LangMap';
    $desc = $opts['description'] ?? '';
    $canonical = $opts['canonical'] ?? SEO_SITE;
    $ui = $opts['ui'] ?? 'en';
    $locale = $opts['locale'] ?? seo_locale($ui);
    $ogImage = $opts['image'] ?? (SEO_SITE . '/ogp-wordmap.png');
    $robots = $opts['robots'] ?? 'index,follow';
    $lang = $opts['lang'] ?? $ui;
    $altPath = $opts['altpath'] ?? '/';   // path after /{ui}, leading slash
    $rtl = seo_is_rtl($ui);
    ?>
<!doctype html>
<html lang="<?= e($lang) ?>"<?= $rtl ? ' dir="rtl"' : '' ?>>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php /* Linguistic + CJK serif webfonts (same as the interactive map) so romanized
         diacritics (POJ tone marks, ǔ) and Han glyphs render cleanly everywhere. */ ?>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gentium+Plus:wght@400;700&family=Charis+SIL:wght@400;700&family=Noto+Serif:wght@400;700&family=Noto+Serif+JP:wght@400;700&family=Noto+Serif+SC:wght@400;700&family=Noto+Serif+TC:wght@400;700&family=Noto+Serif+KR:wght@400;700&display=swap">
<title><?= e($title) ?></title>
<meta name="description" content="<?= e(seo_clip($desc)) ?>">
<meta name="robots" content="<?= e($robots) ?>">
<link rel="canonical" href="<?= e($canonical) ?>">
<?php seo_hreflang($altPath); ?>
<meta property="og:type" content="article">
<meta property="og:title" content="<?= e($title) ?>">
<meta property="og:description" content="<?= e(seo_clip($desc)) ?>">
<meta property="og:url" content="<?= e($canonical) ?>">
<meta property="og:locale" content="<?= e($locale) ?>">
<meta property="og:image" content="<?= e($ogImage) ?>">
<meta property="og:site_name" content="LangMap">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= e($title) ?>">
<meta name="twitter:description" content="<?= e(seo_clip($desc)) ?>">
<style>
:root { --fg:#1a1a2e; --muted:#5c5c72; --bg:#fafafe; --accent:#4178bc; --card:#fff; --line:#e6e6ef; }
* { box-sizing: border-box; }
body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--fg); background: var(--bg); margin: 0; line-height: 1.5; }
.seo-wrap { max-width: 60rem; margin: 0 auto; padding: 1.5rem 1.25rem 4rem; }
.seo-crumbs { font-size: .95rem; color: var(--muted); margin: 0 0 1rem; }
.seo-crumbs a { color: var(--accent); text-decoration: none; }
.seo-crumbs a:hover { text-decoration: underline; }
.seo-hero h1 { font-size: clamp(2.4rem, 7vw, 4.5rem); line-height: 1.05;
  margin: .2rem 0 .3rem; letter-spacing: -.01em; }
.seo-hero .native { font-size: clamp(1.6rem, 5vw, 3rem); color: var(--accent);
  margin: 0 0 .4rem; font-weight: 600; }
.seo-hero .sub { font-size: 1.1rem; color: var(--muted); margin: 0 0 1rem; }
.seo-meta { display: flex; flex-wrap: wrap; gap: .5rem .75rem; margin: 1rem 0 1.5rem; }
.seo-meta .chip { background: var(--card); border: 1px solid var(--line);
  border-radius: 999px; padding: .3rem .85rem; font-size: .95rem; }
.seo-meta .chip b { color: var(--muted); font-weight: 600; margin-right: .35rem; }
.seo-desc { font-size: 1.15rem; max-width: 50rem; margin: 0 0 2rem; }
.seo-section h2 { font-size: 1.6rem; margin: 2.5rem 0 1rem; border-bottom: 2px solid var(--line);
  padding-bottom: .35rem; }
.seo-words { display: grid; grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: .9rem; }
.seo-word { background: var(--card); border: 1px solid var(--line); border-radius: .7rem;
  padding: .85rem 1rem; }
.seo-word .label { font-size: .8rem; text-transform: uppercase; letter-spacing: .04em;
  color: var(--muted); margin: 0 0 .25rem; }
.seo-word .surface { font-size: 2rem; line-height: 1.15; margin: 0; word-break: break-word; }
.seo-word .ipa { font-size: 1.1rem; color: var(--accent); margin: .2rem 0 0; }
/* Han-character readings as an aligned dictionary table (文白異讀 / 呉音漢音 etc.). */
.seo-chartable-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0; }
.seo-chartable { width: 100%; border-collapse: collapse; font-size: 1rem; }
.seo-chartable thead th { text-align: left; font-size: .8rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: .04em; color: var(--muted);
  padding: .5rem .85rem; border-bottom: 2px solid var(--line); white-space: nowrap; }
.seo-chartable thead th.c-char { text-align: center; }
/* Horizontal rule between characters, but not between a char's own reading rows. */
.seo-chartable tbody tr.char-start td { border-top: 1px solid var(--line); }
.seo-chartable tbody tr:first-child td { border-top: none; }
.seo-chartable td { padding: .55rem .85rem; vertical-align: middle; }
.seo-chartable td.c-char { text-align: center; vertical-align: middle;
  font-size: 1.6rem; line-height: 1; white-space: nowrap; }
.seo-chartable td.c-gloss { color: var(--muted); font-size: .8rem; vertical-align: middle;
  max-width: 14rem; }
.seo-chartable td.c-read { white-space: nowrap; }
.seo-chartable td.c-read .rlabel { display: inline-block; font-size: .68rem; color: var(--muted);
  border: 1px solid var(--line); border-radius: .5rem; padding: 0 .4rem; line-height: 1.5; }
.seo-chartable td.c-form { font-size: 1.05rem; word-break: break-word; }
.seo-chartable td.c-ipa { color: var(--accent); font-size: .9rem; white-space: nowrap; }
/* Serif for Han glyphs & surface forms (Mincho/Song for CJK); IPA stays sans.
   Body cells only (td) so the thead row keeps the uniform sans UI font.
   Broad CJK serif stack + generic `serif` so individual Han glyphs reliably
   fall back to a Mincho/Song face instead of a per-glyph sans gap. */
.seo-words,
.seo-chartable td.c-char,
.seo-chartable td.c-form {
  /* Same chain as the interactive map: Gentium Plus / Charis SIL render the
     romanized diacritics (POJ tone marks, ǔ) cleanly; Noto Serif CJK + platform
     Mincho/Song fonts cover the Han glyphs. */
  font-family: "Gentium Plus", "Charis SIL", "Noto Serif", "Noto Serif JP",
    "Noto Serif SC", "Noto Serif TC", "Noto Serif KR", "Source Han Serif",
    "Songti SC", "STSong", "SimSun", "Hiragino Mincho ProN", "Yu Mincho",
    "MS Mincho", Georgia, "Times New Roman", serif;
}
.seo-map-wrap { margin: 1rem 0 2rem; }
.seo-map { height: 360px; border-radius: .7rem; border: 1px solid var(--line); }
.seo-sources { font-size: .95rem; padding-left: 1.2rem; }
.seo-sources a { color: var(--accent); }
.seo-index-list { columns: 2 16rem; gap: 2rem; padding: 0; list-style: none; }
.seo-index-list li { break-inside: avoid; margin: 0 0 .35rem; }
.seo-index-list a { color: var(--accent); text-decoration: none; }
.seo-index-list a:hover { text-decoration: underline; }
.seo-index-list .code { color: var(--muted); font-size: .85rem; }
.seo-applink { margin: 2rem 0; }
.seo-applink a { display: inline-block; background: var(--accent); color: #fff;
  padding: .7rem 1.3rem; border-radius: .6rem; text-decoration: none; font-weight: 600; }
.seo-foot { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--line);
  color: var(--muted); font-size: .9rem; }
.seo-foot a { color: var(--accent); }
.seo-related { margin: 2.5rem 0 0; }
.seo-related h2 { font-size: 1.6rem; margin: 2.5rem 0 1rem; border-bottom: 2px solid var(--line);
  padding-bottom: .35rem; }
.seo-related .crossmap a { display: inline-block; background: var(--card);
  border: 1px solid var(--accent); color: var(--accent); padding: .55rem 1.1rem;
  border-radius: .6rem; text-decoration: none; font-weight: 600; margin: 0 0 1rem; }
.seo-related .crossmap a:hover { background: var(--accent); color: #fff; }
.seo-related .seo-cmp { display: flex; flex-wrap: wrap; gap: .6rem; margin: 0 0 1.25rem; }
.seo-related .seo-cmp a { display: inline-block; background: var(--card);
  border: 1px solid var(--line); color: var(--accent); padding: .5rem .95rem;
  border-radius: .6rem; text-decoration: none; }
.seo-related .seo-cmp a:hover { border-color: var(--accent); }
.seo-related .seo-cmp .note { color: var(--muted); font-size: .85rem; align-self: center; }
.seo-related .seo-siblings { columns: 2 14rem; gap: 2rem; padding: 0; list-style: none; margin: .5rem 0 0; }
.seo-related .seo-siblings li { break-inside: avoid; margin: 0 0 .35rem; }
.seo-related .seo-siblings a { color: var(--accent); text-decoration: none; }
.seo-related .seo-siblings a:hover { text-decoration: underline; }
.seo-related .seo-siblings .code { color: var(--muted); font-size: .85rem; }
[dir="rtl"] { text-align: right; }
.seo-langbar { display: flex; justify-content: flex-end; align-items: center;
  gap: .5rem; margin: 0 0 .5rem; font-size: .9rem; color: var(--muted); }
.seo-langbar select { font: inherit; padding: .25rem .5rem; border: 1px solid var(--line);
  border-radius: .4rem; background: var(--card); color: var(--fg); }
.seo-langpop { position: fixed; left: 1rem; bottom: 1rem; max-width: 22rem; z-index: 9999;
  background: var(--card); border: 1px solid var(--line); border-radius: .7rem;
  box-shadow: 0 6px 24px rgba(0,0,0,.15); padding: .9rem 1rem; }
[dir="rtl"] .seo-langpop { left: auto; right: 1rem; }
.seo-langpop p { margin: 0 0 .6rem; }
.seo-langpop .btns { display: flex; gap: .5rem; }
.seo-langpop button { font: inherit; cursor: pointer; padding: .4rem .9rem;
  border-radius: .4rem; border: 1px solid var(--line); background: var(--card); color: var(--fg); }
.seo-langpop button.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
</style>
</head>
<body>
<?php seo_lang_ui($ui, $altPath); ?>
<main class="seo-wrap">
<?php seo_lang_picker($ui, $altPath); ?>
<?php
}

/** A header <select> UI-language picker (option labels = endonyms). */
function seo_lang_picker(string $ui, string $altPath): void
{
    // Endonyms come from either data file (both carry uiLangNames).
    $names = seo_data('wordmap')['uiLangNames'] ?? [];
    if (!$names) {
        $names = seo_data('hanmap')['uiLangNames'] ?? [];
    }
    $label = seo_t($ui, 'picker');
    ?>
<div class="seo-langbar">
  <label for="seo-lang-pick"><?= e($label) ?></label>
  <select id="seo-lang-pick" data-altpath="<?= e($altPath) ?>" aria-label="<?= e($label) ?>">
    <?php foreach (SEO_UI_LANGS as $u):
        $endo = $names[$u] ?? $u; ?>
      <option value="<?= e($u) ?>"<?= $u === $ui ? ' selected' : '' ?>><?= e($endo) ?></option>
    <?php endforeach; ?>
  </select>
</div>
<?php
}

/**
 * Inject the client-side language switch popup + auto-redirect + picker JS.
 * Runs on every SEO page. State is persisted in localStorage[langmap_ui_pref].
 */
function seo_lang_ui(string $ui, string $altPath): void
{
    $names = seo_data('wordmap')['uiLangNames'] ?? [];
    if (!$names) {
        $names = seo_data('hanmap')['uiLangNames'] ?? [];
    }
    $cfg = [
        'pageUi'   => $ui,
        'altPath'  => $altPath,
        'site'     => SEO_SITE,
        'supported'=> array_values(SEO_UI_LANGS),
        'names'    => (object) $names,
        // Localized popup strings keyed by ui (computed at the target ui).
        't' => [
            'switch_tpl' => array_map(fn($u) => SEO_T[$u]['switch_to'] ?? SEO_T['en']['switch_to'], array_combine(SEO_UI_LANGS, SEO_UI_LANGS)),
            'switch'     => array_map(fn($u) => SEO_T[$u]['switch'] ?? SEO_T['en']['switch'], array_combine(SEO_UI_LANGS, SEO_UI_LANGS)),
            'stay'       => array_map(fn($u) => SEO_T[$u]['stay'] ?? SEO_T['en']['stay'], array_combine(SEO_UI_LANGS, SEO_UI_LANGS)),
        ],
    ];
    $json = json_encode($cfg, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
    ?>
<script>
(function () {
  var C = <?= $json ?>;
  var KEY = 'langmap_ui_pref';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function supported(u) { return C.supported.indexOf(u) !== -1; }
  function urlFor(u) { return '/' + u + C.altPath; }
  function go(u) { location.replace(urlFor(u)); }

  // Detect the browser UI lang against the supported set: full tag then primary.
  function detectBrowser() {
    var cands = [];
    if (navigator.languages && navigator.languages.length) cands = cands.concat(navigator.languages);
    if (navigator.language) cands.push(navigator.language);
    for (var i = 0; i < cands.length; i++) {
      var tag = (cands[i] || '').toLowerCase();
      if (!tag) continue;
      if (supported(tag)) return tag;
      var primary = tag.split('-')[0];
      if (supported(primary)) return primary;
    }
    return null;
  }

  function showPopup(targetUi) {
    var endo = C.names[targetUi] || targetUi;
    var t = C.t;
    var text = (t.switch_tpl[targetUi] || t.switch_tpl.en).replace('{name}', endo);
    var box = document.createElement('div');
    box.className = 'seo-langpop';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    var p = document.createElement('p'); p.textContent = text; box.appendChild(p);
    var btns = document.createElement('div'); btns.className = 'btns';
    var bSwitch = document.createElement('button');
    bSwitch.className = 'primary';
    bSwitch.textContent = t.switch[targetUi] || t.switch.en;
    bSwitch.onclick = function () { set(targetUi); go(targetUi); };
    var bStay = document.createElement('button');
    bStay.textContent = t.stay[targetUi] || t.stay.en;
    bStay.onclick = function () { set(C.pageUi); if (box.parentNode) box.parentNode.removeChild(box); };
    btns.appendChild(bSwitch); btns.appendChild(bStay); box.appendChild(btns);
    document.body.appendChild(box);
  }

  function init() {
    // Wire the picker pulldown.
    var sel = document.getElementById('seo-lang-pick');
    if (sel) sel.addEventListener('change', function () {
      var u = sel.value;
      if (!supported(u)) return;
      set(u);
      if (u !== C.pageUi) go(u);
    });

    var pref = get();
    if (pref && supported(pref)) {
      // Returning visitor: auto-redirect if needed (guard against loop).
      if (pref !== C.pageUi) go(pref);
      return;
    }
    // First visit: no (valid) pref yet.
    var browserUi = detectBrowser();
    if (browserUi && browserUi !== C.pageUi) {
      showPopup(browserUi);
    } else {
      set(C.pageUi); // browser matches page or unsupported: remember silently.
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
</script>
<?php
}

/** Localized display name for a code in a given map's langs array (fallback en). */
function seo_lang_name(array $langs, string $code, string $ui = 'en'): string
{
    $l = $langs[$code] ?? null;
    if (!$l) {
        return $code;
    }
    return seo_pick($l['names'] ?? [], $ui) ?: ($l['name'] ?? $code);
}

/** The family string for a code, normalising the two map shapes. */
function seo_lang_family(array $lang): string
{
    // WordMap nests under meta; HanMap has it top-level.
    if (!empty($lang['meta']['family'])) {
        return (string) $lang['meta']['family'];
    }
    return (string) ($lang['family'] ?? '');
}

/** Codes in $langs sharing $family, excluding $self, sorted by localized name. */
function seo_siblings(array $langs, string $family, string $self, string $ui = 'en'): array
{
    if ($family === '') {
        return [];
    }
    $out = [];
    foreach ($langs as $code => $l) {
        if ($code === $self) {
            continue;
        }
        if (seo_lang_family($l) === $family) {
            $out[] = $code;
        }
    }
    usort($out, fn($a, $b) => strcasecmp(seo_lang_name($langs, $a, $ui), seo_lang_name($langs, $b, $ui)));
    return $out;
}

/**
 * Render the "related links" block for a single language page.
 *
 * $map     = 'wordmap' | 'hanmap'  (the map THIS page belongs to)
 * $code    = the page's language code
 * $name    = the page's display name (English-ish)
 * $langs   = this map's langs array
 * $other   = the other map's langs array (for the cross-map link)
 * $ui      = the UI language for chrome strings / sibling links
 */
function seo_related_links(string $map, string $code, string $name, array $langs, array $other, string $ui = 'en'): void
{
    $self = $langs[$code] ?? [];
    $family = seo_lang_family($self);
    $siblings = seo_siblings($langs, $family, $code, $ui);

    $appPage = $map . '.html';            // wordmap.html / hanmap.html

    // Cross-map link target.
    $otherMap = $map === 'wordmap' ? 'hanmap' : 'wordmap';
    $hasCross = isset($other[$code]);
    // Localized name in the OTHER map (fall back to this page's name).
    $otherName = $hasCross ? seo_lang_name($other, $code, $ui) : $name;
    $crossKey = $otherMap === 'hanmap' ? 'crossmap_hm' : 'crossmap_wm';

    // Major world languages present in THIS map, excluding the page itself.
    $majorPool = ['en', 'zh', 'es', 'ar', 'hi'];
    $majors = [];
    foreach ($majorPool as $mc) {
        if ($mc !== $code && isset($langs[$mc])) {
            $majors[] = $mc;
        }
    }
    $majors = array_slice($majors, 0, 4); // keep ≤4 others (≤5 incl. self)

    ?>
<section class="seo-related">
  <h2><?= e(seo_t($ui, 'related')) ?></h2>

  <?php if ($hasCross): ?>
  <div class="crossmap">
    <a href="<?= e(seo_path($ui, $otherMap, $code)) ?>"><?= e(seo_t($ui, $crossKey, ['name' => $otherName])) ?> →</a>
  </div>
  <?php endif; ?>

  <div class="seo-cmp">
    <?php if ($majors): ?>
    <a href="/<?= e($appPage) ?>#cmp=<?= e(rawurlencode($code . ',' . implode(',', $majors))) ?>"><?= e(seo_t($ui, 'cmp_major')) ?> (<?= e($name) ?> · <?= e(implode(' · ', array_map(fn($c) => seo_lang_name($langs, $c, $ui), $majors))) ?>)</a>
    <?php endif; ?>
    <?php if ($siblings):
        $sibCmp = array_slice($siblings, 0, 3);
    ?>
    <a href="/<?= e($appPage) ?>#cmp=<?= e(rawurlencode($code . ',' . implode(',', $sibCmp))) ?>"><?= e(seo_t($ui, 'cmp_related', ['family' => $family])) ?></a>
    <?php endif; ?>
    <span class="note"><?= e(seo_t($ui, 'cmp_note')) ?></span>
  </div>

  <?php if ($siblings):
      $sibList = array_slice($siblings, 0, 12);
  ?>
  <h2><?= e(seo_t($ui, 'same_family')) ?>: <?= e($family) ?></h2>
  <ul class="seo-siblings">
    <?php foreach ($sibList as $sc): ?>
      <li><a href="<?= e(seo_path($ui, $map, $sc)) ?>"><?= e(seo_lang_name($langs, $sc, $ui)) ?></a>
        <span class="code"><?= e($sc) ?></span></li>
    <?php endforeach; ?>
  </ul>
  <?php endif; ?>
</section>
<?php
}

function seo_foot(string $ui = 'en'): void
{
    ?>
<div class="seo-foot">
  <p><?= e(seo_t($ui, 'foot')) ?></p>
</div>
</main>
</body>
</html>
<?php
}
